#!/usr/bin/env python3
"""
Hikmetler — Metadata + blur placeholder üretici.
Kaynak PNG'leri okur, data.js dosyasını oluşturur.
"""
import io
import json
import os
import re
import base64
import unicodedata
from pathlib import Path
from PIL import Image

SOURCE_ROOT = Path("/Users/raufenc/Library/Mobile Documents/com~apple~CloudDocs/Muhtelif/Claude/hikmetler")
OUTPUT_DIR = Path(__file__).resolve().parent.parent
OUTPUT_FILE = OUTPUT_DIR / "data.js"

TR_MAP = str.maketrans({
    "ı": "i", "İ": "i", "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u",
    "ş": "s", "Ş": "s", "ö": "o", "Ö": "o", "ç": "c", "Ç": "c",
    "â": "a", "Â": "a", "î": "i", "Î": "i", "û": "u", "Û": "u",
    "ê": "e", "Ê": "e", "ô": "o", "Ô": "o", "á": "a", "Á": "a",
    "é": "e", "É": "e", "ñ": "n", "Ñ": "n",
})

APOSTROPHES = "'\u2018\u2019\u201B\u2032`´"
QUOTES = '"\u201C\u201D\u201E\u2033'

def slugify(text: str) -> str:
    text = text.translate(TR_MAP)
    for ch in APOSTROPHES + QUOTES:
        text = text.replace(ch, "")
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

CATEGORY_LEADS = {
    1:  "İmânın altı esasına dair hikmetler.",
    2:  "Şeriatın hakikati ve yanlış algılar.",
    3:  "Kadının İslâm'daki izzeti ve hukuku.",
    4:  "Cihadın hakiki manası ve sulh esası.",
    5:  "Aklın ve ilmin İslâm'daki yeri.",
    6:  "Diğer dinlere İslâm'ın bakışı.",
    7:  "İfade, inanç ve hayat özgürlüğü.",
    8:  "Tarihî yanlış anlamalara cevaplar.",
    9:  "Helâl-haram ve ahlâkî düstur.",
    10: "Din, devlet ve toplum düzeni.",
    11: "Esmâ ve sıfâtın hikmeti.",
    12: "İmtihan, acı ve ilâhî hikmet.",
    13: "Vahiy, Kur'ân ve nübüvvet delilleri.",
    14: "Yaratılış meselesi ve evrim iddiaları.",
    15: "Kozmolojik, gâî ve aklî deliller.",
    16: "İnancın psikolojik izahının reddi.",
    17: "Günümüz meseleleri ve İslâmî çerçeve.",
    18: "Âhiret, ruh ve dirilişin hakikati.",
    19: "Kur'ân-ı kerîmi anlama usûlü.",
    20: "Tarih metodolojisi ve İslâm tarihi.",
}

def parse_category_folder(name: str):
    """Parse '1 Müslüman Ne'ye İnanır?' → (1, 'Müslüman Ne'ye İnanır?')."""
    m = re.match(r"^(\d+)\s+(.+?)\s*$", name)
    if not m:
        return None, None
    return int(m.group(1)), m.group(2).strip()

def parse_card_filename(name: str):
    """Parse '1.01 Allahü teâlâ'nın Rahmeti....png' → (1, 1, title)."""
    m = re.match(r"^(\d+)\.(\d+)\s+(.+?)\.(png|PNG)$", name)
    if not m:
        return None, None, None
    return int(m.group(1)), int(m.group(2)), m.group(3).strip()

def make_blur_base64(img: Image.Image) -> str:
    """Generate tiny 24x14 WebP as data: URI for blur placeholder."""
    small = img.copy()
    small.thumbnail((24, 24), Image.LANCZOS)
    buf = io.BytesIO()
    small.save(buf, format="WEBP", quality=30, method=6)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return f"data:image/webp;base64,{b64}"

def main():
    categories = []
    cards = []

    # Kategori klasörlerini topla
    cat_dirs = []
    for entry in sorted(SOURCE_ROOT.iterdir()):
        if not entry.is_dir():
            continue
        cat_id, cat_title = parse_category_folder(entry.name)
        if cat_id is None:
            continue
        cat_dirs.append((cat_id, cat_title, entry))

    cat_dirs.sort(key=lambda x: x[0])

    for cat_id, cat_title, cat_dir in cat_dirs:
        # PNG'leri topla ve sırala
        pngs = sorted([p for p in cat_dir.iterdir() if p.suffix.lower() == ".png"])

        cat_slug = slugify(cat_title)
        cat_cards = []

        for png in pngs:
            parsed_cat, n, title = parse_card_filename(png.name)
            if parsed_cat is None or parsed_cat != cat_id:
                print(f"  ⚠ Atlandı (parse edilemedi): {png.name}")
                continue

            print(f"  [{cat_id:02d}.{n:02d}] {title[:60]}")

            # Resmi aç, boyut + blur al
            with Image.open(png) as img:
                w, h = img.size
                blur = make_blur_base64(img.convert("RGB"))

            card_slug = slugify(title)

            card = {
                "id": f"{cat_id}.{n:02d}",
                "cat": cat_id,
                "n": n,
                "slug": card_slug,
                "title": title,
                "w": w,
                "h": h,
                "blur": blur,
            }
            cat_cards.append(card)
            cards.append(card)

        categories.append({
            "id": cat_id,
            "slug": cat_slug,
            "title": cat_title,
            "lead": CATEGORY_LEADS.get(cat_id, ""),
            "count": len(cat_cards),
        })
        print(f"✓ Kategori {cat_id}: {cat_title} — {len(cat_cards)} kart")

    # Çıktıyı yaz
    payload = {"categories": categories, "cards": cards}
    js = "window.HIKMETLER_DATA = " + json.dumps(payload, ensure_ascii=False, indent=0) + ";\n"
    OUTPUT_FILE.write_text(js, encoding="utf-8")

    size_kb = OUTPUT_FILE.stat().st_size / 1024
    print(f"\n✓ data.js yazıldı: {OUTPUT_FILE}")
    print(f"  {len(categories)} kategori, {len(cards)} kart, {size_kb:.1f} KB")

if __name__ == "__main__":
    main()
