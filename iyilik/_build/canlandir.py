#!/usr/bin/env python3
"""İyiliklerle Büyüyorum — "canlanan sayfa" varlıkları.

Her kitap sayfası için üretir (sayfa/ klasörüne):
  <id>-yol.json   çizim sırası: çizgi resminin iskeletinden çıkan yollar (x,y,fırça yarıçapı)
  <id>-renk.json  bölge başına {etiket, renk, nesne}, boyama sırası, sayfa metni, ses işaretleri
  ses/canlan/<id>-giris.mp3, <id>-yonerge.mp3   sayfanın kendi metni (coral sesi, ses_uret önbelleği)

Çizgiler asıl raster çizgidir (-c.webp); yollar yalnız "fırçanın" gideceği yeri söyler.

Kullanım (Python 3.13 çerçeve sürümü; numpy/scipy/PIL/cv2 gerekir):
  python3 -I canlandir.py --sayfa 1-12 2-7 3-30   # kitap-sayfa çiftleri
  python3 -I canlandir.py --hepsi                 # 144 sayfa
  python3 -I canlandir.py --say --hepsi           # yalnız tahmini maliyet (Claude çağrısı yok)
  seçenekler: --yol-yalniz  (Claude/ses çağrısı yapma)   --model claude-sonnet-5-5   --yeniden (önbelleği yok say)

Anahtarlar ~/.claude-api/api-key ve ~/.openai/api-key dosyalarından okunur; `curl -H @-` ile stdin'den verilir,
hiçbir yere yazılmaz. Claude yanıt önbelleği: /tmp/iyilik-work/claude-cache (yeniden çalıştırma ücretsiz).
"""
import sys, os, re, json, base64, hashlib, subprocess, pathlib, argparse, io, math, time
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as ndi
import cv2

ROOT = pathlib.Path(__file__).resolve().parent.parent
SAYFA = ROOT / 'sayfa'
SES = ROOT / 'ses' / 'canlan'
CACHE = pathlib.Path('/tmp/iyilik-work/claude-cache'); CACHE.mkdir(parents=True, exist_ok=True)
MODEL = 'claude-haiku-5-5'
YENIDEN = False

# ---- sabit çocuk paleti (boyama stüdyosundaki renkler + kapaklardan örneklenen ten/saç tonları) ----
PALET = {
    'kirmizi': '#e53935', 'turuncu': '#ff7043', 'amber': '#ffb300', 'sari': '#fdd835', 'limon': '#c0ca33',
    'acik_yesil': '#7cb342', 'yesil': '#2e9e55', 'petrol': '#00897b', 'turkuaz': '#26c6da', 'acik_mavi': '#42a5f5',
    'mavi': '#1e5fd0', 'mor': '#5c4bc4', 'eflatun': '#9c27b0', 'pembe': '#ec407a',
    'ten': '#f6c196',            # kapak: yüz tonu (247,187,135) biraz açıldı
    'sac_kahve': '#6b3a14',      # kapak: saç tonu
    'acik_kahve': '#d9a066', 'kahve': '#a86b43', 'koyu_kahve': '#6d4326',
    'gri': '#b8b8b8', 'lacivert': '#2b3a42', 'beyaz': '#ffffff',
    'gok': '#9fd8f5', 'krem': '#f6e6c4', 'acik_sari': '#fff1a6', 'acik_pembe': '#f8bfd0', 'acik_yesil2': '#b5dd84',
}
ETIKET = {
    'gokyuzu': 'gökyüzü', 'bulut': 'bulut', 'gunes': 'güneş', 'isik': 'cam/pencere ışığı/lamba parlaması',
    'su': 'su/havuz/yağmur', 'cimen': 'çimen/yeşil bitki örtüsü', 'toprak': 'toprak/yol/kum', 'zemin': 'iç mekân zemini/halı/kilim',
    'duvar': 'duvar/çit/arka plan yüzeyi', 'agac': 'ağaç gövdesi/dal', 'yaprak': 'yaprak/çalı', 'cicek': 'çiçek',
    'esya': 'eşya/oyuncak/mobilya/kap/kitap', 'giysi': 'giysi/başörtüsü/ayakkabı', 'ten': 'ten (yüz, el, kol, bacak)',
    'sac': 'saç', 'goz': 'göz akı/diş/ağız içi gibi küçük yüz ayrıntısı', 'bina': 'bina/çatı/pencere çerçevesi',
    'yazi': 'yazı harfi ve harf içleri (boyanmaz)', 'arka': 'sayfa kenarı/boş çerçeve dışı (boyanmaz)', 'diger': 'diğer',
}
# renklendirme sırası: önce geniş fon, sonra nesneler, en sonda insan ayrıntıları
ONCELIK = {'gokyuzu': 0, 'bulut': 0, 'gunes': 1, 'isik': 1, 'duvar': 2, 'bina': 2, 'zemin': 3, 'cimen': 3, 'toprak': 3, 'su': 3,
           'agac': 4, 'yaprak': 5, 'cicek': 6, 'esya': 7, 'giysi': 8, 'ten': 9, 'sac': 9, 'goz': 10, 'diger': 7}
ORTAM = {'gokyuzu', 'bulut', 'su'}      # hafif ışıltı / bulut kayması
ISIK = {'gunes', 'isik'}                 # hafif parlama

# ============================================================ 1) ÇİZİM YOLLARI
def zhang_suen(ink):
    """Vektörleştirilmiş Zhang-Suen inceltme (skimage/ximgproc gerekmez)."""
    im = ink.astype(np.uint8)
    while True:
        changed = False
        for step in (0, 1):
            p = np.pad(im, 1)
            P2, P3, P4, P5 = p[:-2, 1:-1], p[:-2, 2:], p[1:-1, 2:], p[2:, 2:]
            P6, P7, P8, P9 = p[2:, 1:-1], p[2:, :-2], p[1:-1, :-2], p[:-2, :-2]
            B = P2 + P3 + P4 + P5 + P6 + P7 + P8 + P9
            seq = [P2, P3, P4, P5, P6, P7, P8, P9, P2]
            A = sum(((seq[i] == 0) & (seq[i + 1] == 1)).astype(np.uint8) for i in range(8))
            if step == 0:
                c = (P2 * P4 * P6 == 0) & (P4 * P6 * P8 == 0)
            else:
                c = (P2 * P4 * P8 == 0) & (P2 * P6 * P8 == 0)
            rm = (im == 1) & (B >= 2) & (B <= 6) & (A == 1) & c
            if rm.any():
                im[rm] = 0; changed = True
        if not changed:
            return im.astype(bool)


NB = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def grafik_yollar(sk):
    """İskeleti düğümler arası zincirlere (kenarlara) ayırır -> [[(y,x),...], ...]"""
    h, w = sk.shape
    pad = np.pad(sk, 1)
    deg = np.zeros(sk.shape, np.int16)
    for dy, dx in NB:
        deg += pad[1 + dy:1 + dy + h, 1 + dx:1 + dx + w]
    deg = np.where(sk, deg, 0)
    ys, xs = np.nonzero(sk)
    pix = set(zip(ys.tolist(), xs.tolist()))
    def nbrs(p):
        y, x = p
        return [(y + dy, x + dx) for dy, dx in NB if (y + dy, x + dx) in pix]
    # düğüm tanımı: komşu "grupları" sayısı (geçiş sayısı); merdiven köşelerindeki yedek komşu düğüm yapmaz
    def gecis(p):
        y, x = p
        ring = [(y - 1, x), (y - 1, x + 1), (y, x + 1), (y + 1, x + 1), (y + 1, x), (y + 1, x - 1), (y, x - 1), (y - 1, x - 1)]
        v = [r in pix for r in ring]
        return sum(1 for i in range(8) if not v[i] and v[(i + 1) % 8]) or (1 if any(v) and all(v) else 0)
    D = {p: gecis(p) for p in pix}
    D = {p: (d if d != 2 else 2) for p, d in D.items()}
    node = {p for p, d in D.items() if d != 2 and d > 0}
    seen = set(); edges = []
    for n in node:
        for q in nbrs(n):
            if q in node:
                if n < q:
                    edges.append([n, q])
                continue
            if q in seen:
                continue
            path = [n, q]; seen.add(q); prev, cur = n, q
            while True:
                nxt = [r for r in nbrs(cur) if r != prev and (r in node or r not in seen)]
                if not nxt:
                    break
                r = nxt[0]
                path.append(r)
                if r in node:
                    break
                seen.add(r); prev, cur = cur, r
            edges.append(path)
    for p in list(pix):  # düğümsüz kapalı halkalar (ör. "o" harfi)
        if p in node or p in seen:
            continue
        path = [p]; seen.add(p); prev, cur = None, p
        while True:
            nxt = [r for r in nbrs(cur) if r != prev and r not in seen]
            if not nxt:
                break
            prev, cur = cur, nxt[0]; path.append(cur); seen.add(cur)
        path.append(p)
        edges.append(path)
    return edges, D


def uzunluk(path):
    a = np.array(path, float)
    return float(np.sqrt((np.diff(a, axis=0) ** 2).sum(1)).sum())


def yol_uret(lines_rgba):
    alpha = np.array(lines_rgba)[..., 3]
    ink = alpha > 110
    h, w = ink.shape
    dt = ndi.distance_transform_edt(ink)
    sk = zhang_suen(ink)
    edges, D = grafik_yollar(sk)
    out = []
    for e in edges:
        L = uzunluk(e)
        # kısa sivri uçlar (iskelet dikenleri): bir ucu serbest uç, kısa -> at
        if L < 3 or (L < 6 and (D.get(e[0], 2) == 1 or D.get(e[-1], 2) == 1)):
            continue
        arr = np.array(e, np.int32)[:, ::-1]  # (x,y)
        if len(arr) > 2:
            approx = cv2.approxPolyDP(arr.reshape(-1, 1, 2), 1.1, False).reshape(-1, 2)
        else:
            approx = arr
        r = [max(3, int(round(dt[y, x])) + 4) for x, y in approx]
        out.append((L, [(int(x), int(y), rr) for (x, y), rr in zip(approx, r)]))
    # fırçanın örtmediği küçük mürekkep parçaları (harf noktaları/üst işaretleri, sivri uçlar): tek noktalık "dokunuşlar"
    m = np.zeros(ink.shape, np.uint8)
    for _, pts in out:
        for (x0, y0, r0), (x1, y1, r1) in zip(pts, pts[1:]):
            cv2.line(m, (x0, y0), (x1, y1), 255, int(r0 + r1))
        if len(pts) == 1:
            cv2.circle(m, pts[0][:2], pts[0][2], 255, -1)
    kal, kn = ndi.label(ink & (m == 0), structure=np.ones((3, 3)))
    if kn:
        alan = np.bincount(kal.ravel(), minlength=kn + 1)
        for i, (cy, cx) in enumerate(ndi.center_of_mass(ink & (m == 0), kal, range(1, kn + 1)), 1):
            if alan[i] >= 6:
                yy, xx = np.nonzero(kal == i) if alan[i] < 4000 else (None, None)
                if yy is None:
                    continue
                r = int(math.ceil(math.sqrt(alan[i] / math.pi) + (yy.max() - yy.min() + xx.max() - xx.min()) / 4)) + 2
                out.append((3, [(int(round(cx)), int(round(cy)), min(r, 14))]))
    # sıra: büyükten küçüğe (uzunluk basamağı), basamak içinde yukarıdan aşağıya
    def key(it):
        L, pts = it
        tier = int(math.log2(max(L, 2)))
        return (-tier, sum(p[1] for p in pts) / len(pts))
    out.sort(key=key)
    ordered, last = [], None
    for L, pts in out:  # kalem önceki yolun bittiği uca yakın uçtan başlasın
        if last is not None:
            d0 = (pts[0][0] - last[0]) ** 2 + (pts[0][1] - last[1]) ** 2
            d1 = (pts[-1][0] - last[0]) ** 2 + (pts[-1][1] - last[1]) ** 2
            if d1 < d0:
                pts = pts[::-1]
        last = (pts[-1][0], pts[-1][1])
        ordered.append([round(L)] + [v for p in pts for v in p])
    return {'w': w, 'h': h, 'e': ordered}


# ============================================================ 2) BÖLGE ETİKETLEME (Claude görsel)
def bolge_haritasi(name):
    a = np.array(Image.open(SAYFA / f'{name}-b.webp').convert('RGB')).astype(np.int32)
    return a[..., 0] | (a[..., 1] << 8)


def bolge_bilgisi(lab):
    n = int(lab.max())
    h, w = lab.shape
    info = {}
    objs = ndi.find_objects(lab)
    for i, sl in enumerate(objs, 1):
        if sl is None:
            continue
        m = (lab[sl] == i)
        dtm = ndi.distance_transform_edt(np.pad(m, 1))[1:-1, 1:-1]
        k = np.unravel_index(np.argmax(dtm), dtm.shape)
        info[i] = dict(y0=sl[0].start, y1=sl[0].stop, area=int(m.sum()), cy=sl[0].start + k[0], cx=sl[1].start + k[1], r=float(dtm.max()),
                       bx=(sl[1].start + sl[1].stop) / 2 / w, by=(sl[0].start + sl[0].stop) / 2 / h)
    return info


def font(sz):
    for f in ('/System/Library/Fonts/Supplemental/Arial Bold.ttf', '/System/Library/Fonts/Helvetica.ttc',
              '/Library/Fonts/Arial Unicode.ttf'):
        if os.path.exists(f):
            return ImageFont.truetype(f, sz)
    return ImageFont.load_default()


def bindirme(name, lab, info, scale=1.3):
    lines = Image.open(SAYFA / f'{name}-c.webp').convert('RGBA')
    h, w = lab.shape
    pastel = np.array([[255, 205, 205], [205, 230, 255], [210, 245, 205], [255, 240, 190], [235, 215, 255], [255, 218, 185],
                       [200, 245, 240], [250, 205, 235], [225, 235, 190], [215, 215, 255], [255, 225, 225], [200, 225, 200]], np.uint8)
    rgb = pastel[(lab * 7) % len(pastel)]
    base = Image.fromarray(rgb, 'RGB').convert('RGBA')
    base.alpha_composite(lines)
    plain = Image.new('RGBA', lines.size, (255, 255, 255, 255)); plain.alpha_composite(lines)
    size = (round(w * scale), round(h * scale))
    base = base.convert('RGB').resize(size, Image.LANCZOS); plain = plain.convert('RGB').resize(size, Image.LANCZOS)
    d = ImageDraw.Draw(base)
    for i, v in info.items():
        sz = int(min(24, max(10, v['r'] * 2 * scale * 0.9)))
        f = font(sz)
        d.text((v['cx'] * scale, v['cy'] * scale), str(i), font=f, fill=(0, 0, 0), anchor='mm', stroke_width=2, stroke_fill=(255, 255, 255))
    return plain, base


def png_b64(im, jpeg=False):
    b = io.BytesIO(); im.save(b, 'JPEG', quality=88) if jpeg else im.save(b, 'PNG', optimize=True)
    return base64.b64encode(b.getvalue()).decode()


def istek_metni(info):
    pal = ', '.join(f'{k}' for k in PALET)
    et = '; '.join(f'{k} = {v}' for k, v in ETIKET.items())
    liste = '\n'.join(f'{i}: alan %{v["area"] / (832 * 1196) * 100:.1f}, merkez ({v["bx"] * 100:.0f}%,{v["by"] * 100:.0f}%)' for i, v in info.items())
    return f'''Bu, 5-7 yaş çocuk boyama kitabının bir sayfasıdır. İlk görüntü sayfanın kendisi; ikinci görüntü aynı sayfada her bölgenin pastel zemin ve numarayla gösterildiği hâli.
Görev: HER numaralı bölge için (1) ne olduğunu gösteren etiket, (2) sabit paletten bir renk, (3) kısa nesne adı ver; ayrıca sayfadaki yazıları kaydet.

ETİKETLER: {et}
PALET (yalnız bu adlar): {pal}

Kurallar:
- Renkler doğal ve çocuk resmine yakışır olsun: gökyüzü gok/acik_mavi, çimen acik_yesil/yesil, ağaç gövdesi kahve, güneş sari, duvar krem/acik_sari gibi. Bir nesnenin TÜM parçaları (ör. sepetin bütün gözleri ve gövdesi, perdenin bütün kıvrımları, halının bütün halkaları) AYNI renk ve AYNI nesne adını alsın; gökkuşağı gibi farklı renkler verme. Yalnız doğal olarak iki renkli şeylerde (top: beyaz + lacivert/siyah parçalar, çiçek: orta + taç yaprak, havlunun şeritleri) en çok iki renk kullan. Çevre nesnelerde sıcak ve ferah renkler seç.
- Doğal renk kuralı: yapraklar/çalılar yeşil tonları, gökyüzü gok/acik_mavi, bulut beyaz, çimen yeşil, ağaç gövdesi/tahta/hasır kahve tonları (acik_kahve, kahve), güneş sari, su acik_mavi/turkuaz. Oyuncak ayı kahve tonları. lacivert ve koyu_kahve yalnız küçük ayrıntılarda; büyük alanlarda açık/orta tonlar kullan.
- İnsan teni için YALNIZ "ten", saç için "sac_kahve". Göz akı/diş için "beyaz". Giysi ve başörtüsü için canlı ama yumuşak renkler seç.
- Yazı harfleri, harf içleri ve sayfa numarası etiketi "yazi", renk null; sayfa kenarındaki boş/çerçeve dışı alan "arka", renk null. Boyanmayacak bölgeler için renk null yaz.
- Her bölge için mutlaka bir giriş ver; hiçbirini atlama. Nesne adı 1-2 sözcük, Türkçe, küçük harf (ör. "top", "sepet", "perde", "gökyüzü").
- Sayfada basılı yazı varsa aynen kaydet (yazım ve noktalama dâhil): baslik (büyük başlık), alt (başlığın altındaki cümle), yonerge (sayfa altındaki boyama yönergesi). Olmayanı "" bırak. Yazı uydurma.

Bölgeler (sayı: alan, merkez konumu):
{liste}

YALNIZ şu JSON'u döndür (başka metin yok):
{{"yazi": {{"baslik": "", "alt": "", "yonerge": ""}}, "bolgeler": {{"1": ["etiket", "renk_adi_veya_null", "nesne"], ...}}}}'''


def claude(prompt, imgs, model):
    key_ = hashlib.sha1((model + prompt + ''.join(i[:200] + str(len(i)) for i in imgs)).encode()).hexdigest()
    cp = CACHE / f'{key_}.json'
    if cp.exists() and not YENIDEN:
        return json.load(open(cp))
    content = [{'type': 'image', 'source': {'type': 'base64', 'media_type': 'image/jpeg', 'data': i}} for i in imgs]
    content.append({'type': 'text', 'text': prompt})
    body = json.dumps({'model': model, 'max_tokens': 16000, 'thinking': {'type': 'disabled'}, 'messages': [{'role': 'user', 'content': content}]}, ensure_ascii=False)
    key = open(os.path.expanduser('~/.claude-api/api-key')).read().strip()
    last = ''
    # Anahtar yalnız stdin'den (-H @-) gider; gövde (anahtarsız) geçici dosyadan.
    tmp = CACHE / f'{key_}.req'
    tmp.write_text(body)
    try:
        for attempt in range(4):
            r = subprocess.run(['curl', '-s', '-m', '300', 'https://api.anthropic.com/v1/messages', '-H', '@-',
                                '-H', 'anthropic-version: 2023-06-01', '-H', 'content-type: application/json',
                                '--data-binary', f'@{tmp}'], input=f'x-api-key: {key}\n'.encode(), capture_output=True)
            try:
                j = json.loads(r.stdout)
            except Exception:
                j = {'error': 'çözümlenemedi'}
            if 'content' in j:
                json.dump(j, open(cp, 'w'))
                return j
            last = str(j.get('error', j))[:200]
            time.sleep(3 + attempt * 5)
    finally:
        tmp.unlink(missing_ok=True)
    raise RuntimeError('Claude çağrısı başarısız: ' + last)


def ayikla(text):
    m = re.search(r'\{.*\}', text, re.S)
    return json.loads(m.group(0))


# ============================================================ 3) SES
def ses_uret(name, yazi):
    """Sayfanın kendi metni: giriş (başlık + alt cümle), yönerge. ses_uret.py önbelleği ve işlevleri kullanılır."""
    import ses_uret as su
    out = {}
    SES.mkdir(parents=True, exist_ok=True)
    for k, parts in (('giris', [yazi.get('baslik', ''), yazi.get('alt', '')]), ('yonerge', [yazi.get('yonerge', '')])):
        segs = [(t, su.say(t), 's') for t in parts if t.strip()]
        if not segs:
            continue
        for _, sp, _ in segs:
            su.tts(sp)
        cues, d = su.assemble(segs, SES / f'{name}-{k}.mp3')
        out[k] = {'f': f'canlan/{name}-{k}.mp3', 'd': round(d, 2), 's': cues}
    return out


# ============================================================ 4) SIRA + BİRLEŞTİRME
DOGAL = {'gokyuzu': ['gok', 'acik_mavi'], 'bulut': ['beyaz', 'gok'], 'gunes': ['sari', 'amber', 'acik_sari'],
         'cimen': ['acik_yesil', 'yesil', 'acik_yesil2'], 'yaprak': ['yesil', 'acik_yesil', 'acik_yesil2', 'petrol', 'limon'],
         'agac': ['kahve', 'koyu_kahve', 'acik_kahve'], 'ten': ['ten'], 'sac': ['sac_kahve', 'koyu_kahve', 'kahve'],
         'goz': ['beyaz'], 'su': ['acik_mavi', 'turkuaz', 'gok', 'mavi'], 'toprak': ['acik_kahve', 'kahve', 'krem'],
         'isik': ['acik_sari', 'sari', 'beyaz']}
KOYU = {'lacivert', 'koyu_kahve'}


def dogallastir(bolge, info):
    """Doğal olması gereken etiketlerde palet dışı/uyumsuz renk gelirse etiketin ilk doğal rengi; büyük alanda koyu renk açılır."""
    for i, v in bolge.items():
        et, rk, ns = v
        if rk is None:
            continue
        if et in DOGAL and rk not in DOGAL[et]:
            v[1] = DOGAL[et][0]
        if v[1] in KOYU and et not in ('sac', 'goz') and info[i]['area'] > 2500:
            v[1] = 'acik_kahve'


def uyumlastir(bolge, info):
    """Aynı nesne adlı bölgeler 3+ farklı renk almışsa (gökkuşağı etkisi) en çok alanı kaplayan renge toplanır."""
    grup = {}
    for i, (et, rk, ns) in bolge.items():
        if rk is not None and et not in ('goz', 'gunes', 'isik'):
            grup.setdefault(ns, []).append(i)
    for ns, ids in grup.items():
        alan = {}
        for i in ids:
            alan[bolge[i][1]] = alan.get(bolge[i][1], 0) + info[i]['area']
        if len(alan) >= 3:
            ana = max(alan, key=alan.get)
            for i in ids:
                bolge[i][1] = ana


def yazi_once(yol, bolge, info, pay=30):
    """Sayfadaki yazı satırlarındaki yollar (etiket: yazi bölgelerinin bulunduğu bantlar) en başa, satır satır soldan sağa alınır:
    başlık/yönerge el yazısı gibi belirir."""
    ys = sorted((info[i]['y0'], info[i]['y1']) for i, v in bolge.items() if v[0] == 'yazi')
    bands = []
    for y0, y1 in ys:
        if bands and y0 <= bands[-1][1] + 25:
            bands[-1][1] = max(bands[-1][1], y1)
        else:
            bands.append([y0, y1])
    bands = [(a - pay - 16, b + pay) for a, b in bands]  # üstte i/ü noktaları ve üst işaretler için ek pay
    first, rest = [], []
    for e in yol['e']:
        xs, ys_ = e[1::3], e[2::3]
        k = next((bi for bi, (a, b) in enumerate(bands) if a <= min(ys_) and max(ys_) <= b), None)
        (first if k is not None else rest).append((k, min(xs), e))
    first.sort(key=lambda t: (t[0], t[1]))
    yol['e'] = [t[2] for t in first] + [t[2] for t in rest]
    return len(first)


def renk_sirasi(bolge, info):
    """nesne bazlı: önce geniş fon, sonra nesneler; her nesnenin bölgeleri yukarıdan aşağı."""
    objs = {}
    for i, (et, rk, ns) in bolge.items():
        if rk is None:
            continue
        o = objs.setdefault(ns, {'ids': [], 'pri': ONCELIK.get(et, 7), 'area': 0})
        o['ids'].append(i); o['area'] += info[i]['area']
        o['pri'] = min(o['pri'], ONCELIK.get(et, 7))
    sirali = sorted(objs.values(), key=lambda o: (o['pri'], -o['area']))
    gruplar = []
    for o in sirali:
        o['ids'].sort(key=lambda i: (info[i]['cy'], info[i]['cx']))
        gruplar.append(o['ids'])
    return gruplar


def sayfa_uret(b, p, args):
    name = f'b{b}-{p:02d}'
    t0 = time.time()
    lines = Image.open(SAYFA / f'{name}-c.webp').convert('RGBA')
    yol = yol_uret(lines)
    def yol_yaz():
        json.dump(yol, open(SAYFA / f'{name}-yol.json', 'w'), separators=(',', ':'))
        print(f'{name}: yol {len(yol["e"])} kenar, {os.path.getsize(SAYFA / f"{name}-yol.json") // 1024} KB, {time.time() - t0:.1f} sn', flush=True)
    if args.yol_yalniz:
        yol_yaz(); return {}
    lab = bolge_haritasi(name)
    info = bolge_bilgisi(lab)
    plain, over = bindirme(name, lab, info)
    if args.debug:
        over.save(f'/tmp/iyilik-v3/{name}-bindirme.jpg', quality=85)
    prompt = istek_metni(info)
    j = claude(prompt, [png_b64(plain, True), png_b64(over, True)], args.model)
    u = j.get('usage', {})
    d = ayikla(''.join(c.get('text', '') for c in j['content'] if c.get('type') == 'text'))
    yazi = {k: (d.get('yazi', {}).get(k) or '').strip() for k in ('baslik', 'alt', 'yonerge')}
    bolge = {}
    eksik = 0
    for i in info:
        v = d['bolgeler'].get(str(i))
        if not v or len(v) < 3:
            eksik += 1; v = ['diger', None, 'diger']
        et, rk, ns = v[0], v[1], v[2]
        if et not in ETIKET: et = 'diger'
        if rk not in PALET: rk = None if (rk in (None, 'null') or et in ('yazi', 'arka')) else 'beyaz'
        if et in ('yazi', 'arka'): rk = None
        bolge[i] = [et, rk, str(ns)]
    dogallastir(bolge, info)
    uyumlastir(bolge, info)
    dogallastir(bolge, info)
    n_yazi = yazi_once(yol, bolge, info); yol_yaz(); print(f'{name}: yazı yolu öne alındı: {n_yazi}')
    gr = renk_sirasi(bolge, info)
    ses = ses_uret(name, yazi) if not args.sessiz else {}
    renk = {'v': 1, 'id': name, 'w': lab.shape[1], 'h': lab.shape[0], 'yazi': yazi,
            'ses': ses,
            'e': [[bolge[i][0], PALET[bolge[i][1]] if bolge[i][1] else None, bolge[i][2]] for i in range(1, int(lab.max()) + 1)],
            'g': gr,
            'ortam': [i for i in bolge if bolge[i][0] in ORTAM], 'isik': [i for i in bolge if bolge[i][0] in ISIK]}
    json.dump(renk, open(SAYFA / f'{name}-renk.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    print(f'{name}: renk {len(bolge)} bölge (eksik {eksik}), {len(gr)} nesne grubu, token girdi {u.get("input_tokens")} çıktı {u.get("output_tokens")}', flush=True)
    return {'in': u.get('input_tokens', 0), 'out': u.get('output_tokens', 0), 'model': args.model}


def liste_yaz():
    """sayfa/canlan.json: canlanışı hazır sayfalar (arayüz "Canlandır" düğmesini yalnız bunlarda gösterir)."""
    ids = sorted(f.name[:-len('-renk.json')] for f in SAYFA.glob('b?-??-renk.json') if (SAYFA / (f.name[:-len('-renk.json')] + '-yol.json')).exists())
    json.dump(ids, open(SAYFA / 'canlan.json', 'w'), separators=(',', ':'))
    print('canlan.json:', len(ids), 'sayfa')


def tum_sayfalar():
    return [(b, p) for b in (1, 2, 3) for p in range(1, 49)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--sayfa', nargs='*', default=[], help='kitap-sayfa çiftleri: 1-12 2-7')
    ap.add_argument('--hepsi', action='store_true')
    ap.add_argument('--say', action='store_true', help='yalnız tahmini maliyeti yaz')
    ap.add_argument('--yol-yalniz', action='store_true')
    ap.add_argument('--sessiz', action='store_true', help='ses üretme')
    ap.add_argument('--debug', action='store_true')
    ap.add_argument('--model', default=MODEL)
    ap.add_argument('--yeniden', action='store_true')
    ap.add_argument('--is-sayisi', type=int, default=3, help='paralel sayfa sayısı')
    args = ap.parse_args()
    global YENIDEN; YENIDEN = args.yeniden
    todo = tum_sayfalar() if args.hepsi else [tuple(map(int, s.split('-'))) for s in args.sayfa]
    if not todo:
        ap.error('--sayfa b-p ... ya da --hepsi ver')
    if args.say:
        tahmin(todo); return
    top = {'in': 0, 'out': 0}
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max(1, args.is_sayisi)) as ex:  # Claude/ses çağrıları ağ bekler: sayfalar paralel
        for r in ex.map(lambda bp: sayfa_uret(bp[0], bp[1], args), todo):
            top['in'] += r.get('in', 0); top['out'] += r.get('out', 0)
    liste_yaz()
    print('toplam Claude token: girdi', top['in'], 'çıktı', top['out'])


def tahmin(todo, fiyat_in=1.0, fiyat_out=5.0):
    """Ölçülmüş örnek token ortalamalarıyla tahmin (varsayılan fiyat $/MTok: girdi 1, çıktı 5 — panelden doğrula)."""
    ort_in, ort_out = 9400, 3800  # 3 örnek sayfada ölçüldü (düşünme kapalı)
    n = len(todo)
    dk = n * 9 / 60  # örnek sayfalarda giriş+yönerge ≈ 8-10 sn
    print(f'{n} sayfa: Claude ≈ {n * ort_in / 1e6 * fiyat_in + n * ort_out / 1e6 * fiyat_out:.2f} $ '
          f'(haiku varsayımı; sonnet ≈ 3 katı); yeni ses ≈ {dk:.0f} dk ≈ {dk * 0.015:.2f} $')

if __name__ == '__main__':
    main()
