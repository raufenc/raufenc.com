#!/usr/bin/env python3
"""Build the self-contained, 60-lesson Siyer web package (standard library only).

Run from any directory:
    python scripts/ders-odasi/siyer-package.py
    python scripts/ders-odasi/siyer-package.py --repo /path/to/checkout

Source files are never rewritten. Only the ZIP and its JSON manifest are output.
The archive is deliberately limited to Siyer and its actual player dependencies.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import posixpath
import re
import sys
import tempfile
import zipfile
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree

IDS = tuple(f"siyer-{n:02d}" for n in range(1, 61))
SIYER = "ders-odasi/siyer/"
MOTOR = "ders-odasi/motor/"
HUB_FILES = (
    "index.html", "content-v2.json", "styles-v2.css", "hub-v2.js",
    "lesson-theme.css", "assets/atlas-cover.png", "assets/video-manifest.json",
)
MOTOR_FILES = (
    "cekirdek.js", "kayit.js", "canli.js", "oynatici.js",
    "bloklar-temel.js", "bloklar-oyun.js", "bloklar-eglence.js",
    "bloklar-ibre.js", "bloklar-ibre2.js", "deneme-ogrenci.js",
    "qrcode.js", "stil.css", "ibre.css", "ibre2.css",
)
MEDIA_EXT = {".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif",
             ".mp3", ".ogg", ".wav", ".mp4", ".webm", ".vtt",
             ".woff", ".woff2"}
LESSON_EXT = MEDIA_EXT | {".json"}
TEXT_EXT = {".html", ".css", ".js", ".json", ".svg", ".vtt", ".md"}
MAX_ARCHIVE = 95_000_000
MAX_RAW = 180_000_000
MAX_FILE = 32_000_000
DEFAULT_OUTPUT = SIYER + "indir/siyer-ders-paketi.zip"
ASSET_LITERAL = re.compile(
    r"""["'(]((?:\.\./)*(?:/?ders-odasi/siyer/)?assets/[^"'()\s<>]+)["')]"""
)
CSS_URL = re.compile(r"""url\(\s*["']?([^"')\s]+)["']?\s*\)""", re.I)

README = """SİYER DERS PAKETİ — 60 DERS
===========================

Peygamber Efendimiz (sallallahü aleyhi ve sellem)'in hayatını 5–8. sınıflar
için öğreten 60 ders bulunur. Her ders yaklaşık 10 dakikalık öğretim akışıdır.
Öğrencinin okuma, oyun ve konuşma süresi toplamı değiştirebilir.

BAŞLAMA
1. ZIP dosyasını tamamen bir klasöre çıkarın.
2. BASLA.html dosyasını Chrome, Edge, Firefox veya Safari ile açın.
3. Katalogdan bir ders seçip Bireysel düğmesiyle başlayın.
4. Anlatım sesi için derse başladıktan sonra ses düğmesini kullanın.
   Tarayıcılar ilk kullanıcı etkileşiminden önce sesi engelleyebilir.

Derslerin metinleri, SVG sahneleri, MP3 anlatımları, oyunları ve mevcut video
özetleri paketin içindedir. Bireysel kullanım internet gerektirmez. Kaynak
bağlantıları ve farklı cihazlar arasındaki canlı ders internet gerektirir.
Bazı tarayıcılar file:// altında kalıcı depolamayı veya video altyazısını
sınırlayabilir. İçerikler yine okunabilir; güvenilir kayıt ve bütün tarayıcı
özellikleri için paketi aşağıdaki gibi yerel ya da HTTPS sunucusunda açın.

YEREL SUNUCU
Python kurulu bir bilgisayarda paketin bulunduğu klasörde:
    python -m http.server 8000
Ardından:
    http://localhost:8000/

Kayıtlar kullanılan tarayıcının yerel deposunda tutulur. Aynı cihazda bile
başka tarayıcıya veya başka adrese geçince aynı kayıt görünmeyebilir.
Ders raporları: ders-odasi/rapor.html
Rapor ekranı sonuçları dışa aktarabilir. iframe ile gömmek tek başına LMS
not defterine otomatik bağlanma sağlamaz; aşağıdaki kayıt arayüzleri kullanılır.

LMS / WEB SİTESİNE EKLEME
Paketin bütün dosyalarını aynı dizin yapısıyla kendi sitenize yükleyin.
Örnek: https://okul.example/icerikler/siyer-paketi/
Bir dersin doğrudan adresi:
    ders-odasi/ders.html?d=siyer-01&rol=bireysel

Katalog iframe örneği (paketin okul sitenizdeki yolunu değiştirin):
    <iframe
      src="/icerikler/siyer-paketi/ders-odasi/siyer/index.html?embed=1"
      title="Siyer dersleri"
      style="width:100%;height:900px;border:0"
      allow="fullscreen; autoplay"
      allowfullscreen>
    </iframe>

Tek ders iframe örneği:
    <iframe
      src="/icerikler/siyer-paketi/ders-odasi/ders.html?d=siyer-01&rol=bireysel"
      title="Siyer dersi 1"
      style="width:100%;aspect-ratio:16/9;border:0"
      allow="fullscreen; autoplay"
      allowfullscreen>
    </iframe>

iframe üst sayfası mesaj alacaksa ders URL'sine URL-encoded host parametresi
ekleyin; örneğin &host=https%3A%2F%2Fokul.example. Motor postMessage ile
kaynak:'ders-odasi', tur:'hazir'|'ifade'|'durum'|'kapandi' mesajları gönderir.
Alıcı yalnız beklenen origin ve iframe.contentWindow kaynaklarını kabul
etmelidir. Puanın LMS'ye kaydedilmesi alıcı sistemin bu mesajları işlemesini
gerektirir. Motor erişilebilir SCORM 1.2/2004 API'sini de algılar; bu ZIP
web/iframe içerik paketi olarak hazırlanmıştır. LMS'nin SCORM içe aktarma
ekranında kullanmak için ayrıca o LMS'ye uygun manifest gerekir.

CANLI DERS
Katalogdaki öğretmen/öğrenci rolleri aynı ders ve oda koduyla kullanılır.
Farklı cihazların eşleşmesi için paketi HTTPS üzerinde barındırın ve kendi
canlı bağlantınızı kurun. İndirilen paketin ayarlar.js dosyasında Firebase
yapılandırması boş bırakılmıştır. Üretim sitesinin Firebase hesabı paketle
başka sunuculara taşınmaz. Kendi Firebase Realtime Database projenizde anonim
girişi, yetkili alan adlarını ve uygun erişim kurallarını yapılandırdıktan
sonra ders-odasi/ayarlar.js içindeki örnek alanları doldurun. Motor Firebase
istemcisini internetten yükler. Alternatif olarak motorun WebSocket veya LMS
postMessage canlı köprüsünü kullanabilirsiniz. Yayın öncesinde iki ayrı
cihazda öğretmen/öğrenci eşleşmesini deneyin. Aynı tarayıcı sekmeleri arasındaki
yerel deneme uzaktaki öğrencinin bağlandığını göstermez.
Yalnız ekran paylaşımıyla online anlatım için bireysel modu açıp ders ekranını
toplantı uygulamasında paylaşmak yeterlidir.

KLASÖRLER
- ders-odasi/siyer/: katalog, içerik metinleri, tema ve ortak görseller
- ders-odasi/dersler/siyer-01 ... siyer-60/: dersler ve yerel medya
- ders-odasi/motor/: Ders Odası oynatıcısı ve etkileşim motoru
- ders-odasi/rapor.html: yerel sonuçları görüntüleme
- paket-manifest.json: dosyaların byte boyutları ve SHA-256 özetleri

Bütün klasörü birlikte taşıyın. Dosya adlarını veya göreli yolları değiştirmek
görsellerin ve seslerin bulunamamasına neden olur. Bu ZIP kendi içinde ikinci
bir ZIP taşımaz; katalogdaki paket bağlantısı bu kullanım belgesini açar.

KAYNAKLAR VE KULLANIM
Her dersin kaynakları içerik dosyasında ve öğretmen görünümünde bulunur.
Kaynak sayfaları internet bağlantısıyla açılır. Kendi okulunuza ait öğrenci
verileri yerel raporlarla birlikte paylaşılmamalıdır.
"""


class PackageError(RuntimeError):
    pass


def fail(message: str):
    raise PackageError(message)


def canonical(path: str) -> str:
    path = posixpath.normpath(path.replace("\\", "/"))
    if path.startswith("/") or path == ".." or path.startswith("../"):
        fail(f"Paket dışına çıkan yol: {path}")
    return path


def local_target(owner: str, url: str) -> str | None:
    url = html.unescape(url.strip())
    if not url or url.startswith(("#", "data:", "blob:", "mailto:", "javascript:")):
        return None
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path)
    if not path:
        return None
    if path.startswith("/"):
        return canonical(path.lstrip("/"))
    return canonical(posixpath.join(posixpath.dirname(owner), path))


def read_source(repo: Path, rel: str) -> bytes:
    rel = canonical(rel)
    target = repo / rel
    # Reject symlinks in every component, not just the final file.
    cursor = repo
    for part in PurePosixPath(rel).parts:
        cursor = cursor / part
        if cursor.is_symlink():
            fail(f"Sembolik bağlantı pakete alınamaz: {rel}")
    if not target.is_file():
        fail(f"Gerekli dosya bulunamadı: {rel}")
    if target.stat().st_size > MAX_FILE:
        fail(f"Tek dosya sınırını ({MAX_FILE:,} byte) aşıyor: {rel}")
    data = target.read_bytes()
    if not data:
        fail(f"Boş dosya: {rel}")
    return data


def plain_json(data) -> bytes:
    return (json.dumps(data, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def read_native(data: bytes, path: str) -> dict:
    text = data.decode("utf-8-sig")
    marker = "DO.dersKaydet("
    start = text.find(marker)
    if start < 0:
        fail(f"Ders kaydı bulunamadı: {path}")
    try:
        obj, _ = json.JSONDecoder().raw_decode(text[start + len(marker):].lstrip())
    except (ValueError, TypeError) as exc:
        fail(f"Ders verisi JSON olarak çözülemedi ({path}): {exc}")
    if not isinstance(obj, dict):
        fail(f"Ders kaydı nesne olmalı: {path}")
    return obj


def walk_strings(obj):
    if isinstance(obj, dict):
        for value in obj.values():
            yield from walk_strings(value)
    elif isinstance(obj, list):
        for value in obj:
            yield from walk_strings(value)
    elif isinstance(obj, str):
        yield obj


def media_refs(owner: str, obj):
    for value in walk_strings(obj):
        # Only complete filename values, not prose containing an example.
        if "\n" in value or "<" in value or len(value) > 1000:
            continue
        parsed = urlsplit(value)
        if PurePosixPath(parsed.path).suffix.lower() in MEDIA_EXT:
            target = local_target(owner, value)
            if target:
                yield target


class BrowserRefs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.remote = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        values = []
        if tag in {"script", "img", "audio", "video", "source", "track", "iframe"}:
            if attrs.get("src"):
                values.append(attrs["src"])
        if tag == "video" and attrs.get("poster"):
            values.append(attrs["poster"])
        if tag == "link" and attrs.get("rel") in {"stylesheet", "icon", "preload"}:
            if attrs.get("href"):
                values.append(attrs["href"])
        for value in values:
            if urlsplit(value).scheme in {"http", "https"} or value.startswith("//"):
                self.remote.append(value)
            elif not value.startswith(("data:", "blob:")):
                self.refs.append(value)


def strip_remote_links(text: str) -> str:
    # Fonts and favicon are cosmetic; all package typography has local fallbacks.
    return re.sub(
        r"<link\b[^>]*(?:https?://[^>]*|href\s*=\s*['\"]/favicon[^>]*)>",
        "", text, flags=re.I
    )


def relative_root_urls(text: str, owner: str) -> str:
    parent = posixpath.dirname(owner) or "."
    def replace(match):
        target = match.group(2).lstrip("/")
        return match.group(1) + posixpath.relpath(target, parent)
    return re.sub(r"""(["'(])(/ders-odasi/[^"'()\s<>]*)""", replace, text)


def patch_player(text: str) -> str:
    text = strip_remote_links(text).replace("'fikih-2'", "'siyer-01'")
    text = text.replace("/^[a-z0-9-]+$/", "/^siyer-(0[1-9]|[1-5][0-9]|60)$/")
    text = text.replace('href="index.html"', 'href="siyer/index.html"')
    # Make the series theme available even when the native wrapper changes.
    if 'href="siyer/lesson-theme.css"' not in text:
        text = text.replace("</head>", '<link rel="stylesheet" href="siyer/lesson-theme.css">\n</head>')
    return text


def offline_settings() -> str:
    return """/* Bağımsız siyer paketi. Bireysel kullanım çevrimdışı çalışır.
Canlı ders için kendi Firebase projenizin web ayarlarını aşağıya ekleyin.
Kurulum ve canlı bağlantı seçenekleri: ../README.html */
window.DO_AYAR = window.DO_AYAR || {
  firebase: null
  /* firebase: {
    apiKey: 'KENDI_WEB_API_ANAHTARINIZ',
    authDomain: 'PROJENIZ.firebaseapp.com',
    databaseURL: 'https://PROJENIZ-default-rtdb.REGION.firebasedatabase.app',
    projectId: 'PROJENIZ',
    appId: 'KENDI_WEB_APP_ID'
  } */
};
"""


def start_page() -> str:
    return """<!doctype html><html lang="tr"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Siyer derslerine başla</title>
<meta http-equiv="refresh" content="0;url=ders-odasi/siyer/index.html">
<body style="font:18px system-ui;padding:3rem;line-height:1.7">
<h1>Siyer dersleri</h1><p><a href="ders-odasi/siyer/index.html">60 dersi aç</a></p>
<p><a href="README.html">Kullanım ve LMS'ye ekleme</a></p></body></html>"""


def build(repo: Path, output: Path) -> dict:
    files: dict[str, bytes] = {}
    def add(rel: str):
        rel = canonical(rel)
        if rel not in files:
            files[rel] = read_source(repo, rel)

    for name in HUB_FILES:
        add(SIYER + name)
    for name in MOTOR_FILES:
        add(MOTOR + name)
    for name in ("ders.html", "rapor.html", "defterim.html", "ayarlar.js"):
        add("ders-odasi/" + name)

    content = json.loads(files[SIYER + "content-v2.json"].decode("utf-8-sig"))
    lessons = content if isinstance(content, list) else content.get("lessons", content.get("dersler", []))
    if not isinstance(lessons, list) or len(lessons) != 60:
        fail("content-v2.json tam 60 ders içermelidir.")
    content_ids = [f"siyer-{int(lesson['id']):02d}" if str(lesson.get("id", "")).isdigit() else lesson.get("id") for lesson in lessons]
    if len(set(content_ids)) != 60 or set(content_ids) != set(IDS):
        fail("İçerik kimlikleri siyer-01...siyer-60 olmalıdır.")

    native = {}
    lesson_stats = []
    referenced = set()
    for lesson_id in IDS:
        folder = f"ders-odasi/dersler/{lesson_id}"
        native_path = folder + "/ders.js"
        add(native_path)
        obj = read_native(files[native_path], native_path)
        if obj.get("id") != lesson_id:
            fail(f"Ders kimliği klasörle eşleşmiyor: {native_path}")
        blocks = [b for section in obj.get("bolumler", [])
                  for b in section.get("bloklar", [])]
        slides = [b for b in blocks if b.get("tur") == "slayt"]
        narrated = [b for b in slides if b.get("gorsel") and b.get("ses")]
        if len(narrated) < 4:
            fail(f"{lesson_id}: en az dört sesli SVG anlatım sahnesi bekleniyor.")
        native[lesson_id] = obj
        for path in sorted((repo / folder).rglob("*")):
            if path.is_symlink():
                fail(f"Ders klasöründe sembolik bağlantı: {path}")
            if path.is_file() and path.suffix.lower() in LESSON_EXT:
                add(path.relative_to(repo).as_posix())
        refs = set(media_refs(native_path, obj))
        referenced.update(refs)
        lesson_stats.append({
            "id": lesson_id, "title": obj.get("ad", lesson_id),
            "blocks": len(blocks), "narrated_slides": len(narrated),
            "media_references": sorted(refs),
        })

    # Shared visuals referenced by the hub/stylesheet: never include the whole repo.
    for name in list(files):
        if name.startswith(SIYER) and PurePosixPath(name).suffix in {".html", ".css", ".js", ".json"}:
            text = files[name].decode("utf-8-sig")
            for match in ASSET_LITERAL.finditer(text):
                target = local_target(name, match.group(1))
                if target and target.startswith(SIYER + "assets/"):
                    referenced.add(target)
    for target in sorted(referenced):
        if target.startswith(SIYER + "assets/") and PurePosixPath(target).suffix.lower() in MEDIA_EXT:
            add(target)
        elif target not in files:
            fail(f"Ders medyası pakette bulunamadı: {target}")

    # No fetch is needed on file://. The hub reads this global before network fetch.
    embedded = json.dumps(content, ensure_ascii=False, separators=(",", ":"))
    embedded = embedded.replace("\u2028", "\\u2028").replace("\u2029", "\\u2029").replace("</", "<\\/")
    files[SIYER + "content-v2.js"] = (
        "window.__SIYER_PACKAGE__=true;\nwindow.SIYER_CONTENT_V2=" + embedded + ";\n"
    ).encode("utf-8")
    hub = strip_remote_links(files[SIYER + "index.html"].decode("utf-8-sig"))
    if not re.search(r"""<script\b[^>]*src=["'](?:\./)?content-v2\.js(?:[?"'])""", hub):
        # The data script must precede all hub code, including deferred scripts.
        hub = re.sub(r"<head(\s[^>]*)?>", lambda m: m.group(0) +
                     '\n<script src="content-v2.js"></script>', hub, count=1, flags=re.I)
    files[SIYER + "index.html"] = hub.encode("utf-8")
    files["ders-odasi/ders.html"] = patch_player(
        files["ders-odasi/ders.html"].decode("utf-8-sig")).encode("utf-8")
    files["ders-odasi/defterim.html"] = strip_remote_links(files["ders-odasi/defterim.html"].decode("utf-8-sig")).encode("utf-8")
    files["ders-odasi/rapor.html"] = strip_remote_links(
        files["ders-odasi/rapor.html"].decode("utf-8-sig")).replace(
        'href="index.html"', 'href="siyer/index.html"').encode("utf-8")
    files["ders-odasi/ayarlar.js"] = offline_settings().encode("utf-8")

    mini_catalog = [{"id": lesson_id, "ad": native[lesson_id].get("ad", lesson_id),
                     "seri": "Siyer", "sure": 10,
                     "kapak": f"dersler/{lesson_id}/slayt/01.svg"}
                    for lesson_id in IDS]
    files["ders-odasi/dersler/katalog.js"] = (
        "DO.katalogKaydet(" + json.dumps(mini_catalog, ensure_ascii=False) + ");\n"
    ).encode("utf-8")
    files["index.html"] = files["BASLA.html"] = start_page().encode("utf-8")
    files["README.md"] = README.encode("utf-8")
    files["README.html"] = (
        '<!doctype html><html lang="tr"><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>Siyer paketi kullanım kılavuzu</title>'
        '<style>body{max-width:850px;margin:40px auto;padding:0 20px;'
        'font:17px/1.6 system-ui;color:#183b35;background:#fffdf7}'
        'pre{white-space:pre-wrap;font:inherit}a{color:#166650}</style>'
        '<a href="ders-odasi/siyer/index.html">← Siyer derslerini aç</a>'
        '<pre id="paket">' + html.escape(README) + '</pre></html>'
    ).encode("utf-8")
    # The motor has a few generic index links; retain a useful local destination.
    files["ders-odasi/index.html"] = (
        '<!doctype html><html lang="tr"><meta charset="utf-8">'
        '<meta http-equiv="refresh" content="0;url=siyer/index.html">'
        '<title>Siyer</title><a href="siyer/index.html">Siyer derslerini aç</a></html>'
    ).encode("utf-8")

    for name, data in list(files.items()):
        if PurePosixPath(name).suffix in {".html", ".css", ".js"}:
            text = data.decode("utf-8-sig")
            text = relative_root_urls(text, name)
            if name.startswith(SIYER):
                text = text.replace("indir/siyer-ders-paketi.zip", "../../README.html#paket")
            files[name] = text.encode("utf-8")

    # Fail on absent browser-loaded dependencies and online-only presentation assets.
    for name, data in files.items():
        suffix = PurePosixPath(name).suffix.lower()
        refs = []
        if suffix == ".html":
            parser = BrowserRefs()
            parser.feed(data.decode("utf-8"))
            if parser.remote:
                fail(f"Çevrimdışı HTML uzaktan varlık istiyor: {name}: {parser.remote}")
            refs = parser.refs
        elif suffix == ".css":
            css = data.decode("utf-8")
            if re.search(r"@import\b", css, re.I):
                fail(f"CSS import bağımlılığı açıkça pakete alınmalı: {name}")
            refs = CSS_URL.findall(css)
        for ref in refs:
            if ref.startswith(("data:", "blob:", "#")):
                continue
            target = local_target(name, ref)
            if target is None:
                fail(f"Çevrimdışı varlık için uzak adres: {name}: {ref}")
            if target not in files:
                fail(f"HTML/CSS bağımlılığı eksik: {name} -> {target}")
        if suffix == ".svg":
            try:
                root = ElementTree.fromstring(data)
                if root.tag.rsplit("}", 1)[-1] != "svg":
                    fail(f"SVG kök etiketi geçersiz: {name}")
            except ElementTree.ParseError as exc:
                fail(f"SVG çözülemedi: {name}: {exc}")
        elif suffix == ".mp3":
            if len(data) < 256 or not (data.startswith(b"ID3") or
                    (data[0] == 255 and data[1] & 224 == 224)):
                fail(f"MP3 başlığı/uzunluğu geçersiz: {name}")
        elif suffix == ".mp4" and b"ftyp" not in data[:64]:
            fail(f"MP4 başlığı geçersiz: {name}")
        elif suffix == ".json":
            try:
                json.loads(data.decode("utf-8-sig"))
            except (ValueError, UnicodeDecodeError) as exc:
                fail(f"JSON çözülemedi: {name}: {exc}")

    for item in lesson_stats:
        prefix = f"ders-odasi/dersler/{item['id']}/"
        own = {p: b for p, b in files.items() if p.startswith(prefix)}
        counts = Counter(PurePosixPath(p).suffix.lower() for p in own)
        if counts[".svg"] < 4 or counts[".mp3"] < 4:
            fail(f"{item['id']}: dört SVG ve dört MP3 eksiksiz olmalıdır.")
        item["files"] = len(own)
        item["bytes"] = sum(len(b) for b in own.values())
        item["svg"] = counts[".svg"]
        item["mp3"] = counts[".mp3"]
        item["mp4"] = counts[".mp4"]

    if sum(len(data) for data in files.values()) > MAX_RAW:
        fail(f"Açılmış paket {MAX_RAW:,} byte sınırını aşıyor; medya boyutlarını düşürün.")
    inventory = [{"path": name, "bytes": len(files[name]),
                  "sha256": hashlib.sha256(files[name]).hexdigest()}
                 for name in sorted(files)]
    manifest = {
        "format": "siyer-web-package-v1", "lesson_count": 60,
        "entrypoint": "BASLA.html", "offline": "individual",
        "live": "HTTPS and configured realtime transport required",
        "archive_limit_bytes": MAX_ARCHIVE,
        "total_uncompressed_bytes": sum(item["bytes"] for item in inventory),
        "manifest_excludes_itself": True,
        "media_counts": dict(Counter(PurePosixPath(p).suffix.lower()
                                    for p in files if PurePosixPath(p).suffix.lower() in MEDIA_EXT)),
        "lessons": lesson_stats, "files": inventory,
    }
    files["paket-manifest.json"] = plain_json(manifest)

    output.parent.mkdir(parents=True, exist_ok=True)
    handle, temporary_name = tempfile.mkstemp(prefix=".siyer-package-", suffix=".zip",
                                             dir=output.parent)
    os.close(handle)
    temporary = Path(temporary_name)
    try:
        with zipfile.ZipFile(temporary, "w", compression=zipfile.ZIP_DEFLATED,
                             compresslevel=9, allowZip64=False) as archive:
            for name in sorted(files):
                info = zipfile.ZipInfo(name, (2026, 1, 1, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o100644 << 16
                archive.writestr(info, files[name], compresslevel=9)
        size = temporary.stat().st_size
        if size >= MAX_ARCHIVE:
            largest = sorted(((len(b), p) for p, b in files.items()), reverse=True)[:8]
            details = "; ".join(f"{p}: {n:,}" for n, p in largest)
            fail(f"ZIP {size:,} byte; {MAX_ARCHIVE:,} sınırından küçük olmalı. "
                 f"En büyük dosyalar: {details}")
        # Verify CRC, entry inventory, byte counts and hashes before replacing output.
        with zipfile.ZipFile(temporary) as archive:
            bad = archive.testzip()
            if bad:
                fail(f"ZIP CRC kontrolü başarısız: {bad}")
            if set(archive.namelist()) != set(files):
                fail("ZIP dosya listesi beklenen envanterle eşleşmiyor.")
            for record in inventory:
                data = archive.read(record["path"])
                if len(data) != record["bytes"] or hashlib.sha256(data).hexdigest() != record["sha256"]:
                    fail(f"ZIP bütünlük kontrolü başarısız: {record['path']}")
        archive_sha = hashlib.sha256(temporary.read_bytes()).hexdigest()
        os.replace(temporary, output)
    finally:
        if temporary.exists():
            temporary.unlink()

    summary = dict(manifest)
    summary["archive"] = {"name": output.name, "bytes": size, "sha256": archive_sha,
                          "entries": len(files)}
    manifest_path = output.with_name(output.stem + "-manifest.json")
    manifest_path.write_bytes(plain_json(summary))
    return {"zip": str(output), "manifest": str(manifest_path),
            "bytes": size, "sha256": archive_sha, "files": len(files),
            "lessons": 60, "media_counts": manifest["media_counts"]}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path(__file__).resolve().parents[2],
                        help="Repository root (default: script location)")
    parser.add_argument("--output", type=Path, help="Output ZIP path (relative to repo if relative)")
    args = parser.parse_args()
    repo = args.repo.resolve()
    output = args.output or Path(DEFAULT_OUTPUT)
    if not output.is_absolute():
        output = repo / output
    try:
        result = build(repo, output.resolve())
    except (PackageError, OSError, ValueError, UnicodeDecodeError) as exc:
        print(f"Siyer paketi oluşturulamadı: {exc}", file=sys.stderr)
        return 1
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
