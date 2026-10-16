#!/usr/bin/env python3
"""Ders Odası — slayt destesini (pptx veya görsel klasörü) sisteme ders olarak aktarır.

Ne yapar:
  1. Slayt görsellerini 1600×900 WebP'ye çevirir  → dersler/<id>/slayt/NN.webp
  2. Video verilirse her video karesini en yakın slayta eşler, slayt sürelerini
     çıkarır ve anlatım sesini slayt slayt keser    → dersler/<id>/ses/NN.mp3
  3. Transkript (Whisper JSON) verilirse her slayta altyazı + öğretmen notu yazar
  4. ders.js iskeletini üretir ve dersler/katalog.js'e ekler

Oyunlar/etkinlikler elle (veya yapay zekâ ile) ders.js'e eklenir; araç onları ezmez:
var olan bir ders.js'te "elle: true" işaretli bloklar korunur.

Örnekler:
  python3 scripts/ders-odasi/ice-aktar.py --id adab-08 --ad "Sofra Edebi" \\
      --seri "Âdâb-ı Muâşeret" --pptx 08-sofra-edebi.pptx
  python3 scripts/ders-odasi/ice-aktar.py --id fikih-3 --ad "Müstehap ve Mübah" \\
      --seri "Fıkıh Dersleri" --gorseller FIKIH-3/ --video "Fıkıh 3.mp4" \\
      --ses mustehab_mubah.mp3 --transkript fikih3.json

Gereken: Python 3.9+, Pillow, ffmpeg.
"""
import argparse, json, os, re, subprocess, sys, zipfile
from xml.etree import ElementTree as ET

try:
    from PIL import Image
except ImportError:
    sys.exit('Pillow gerekli: pip install pillow')

KOK = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..', 'ders-odasi', 'dersler'))
GEN, YUK = 1600, 900
KUCUK = (48, 27)  # video karesi ↔ slayt karşılaştırma boyutu
BURADA = os.path.dirname(os.path.abspath(__file__))


# ---------------------------------------------------------------- yardımcılar
def calistir(komut, **k):
    return subprocess.run(komut, check=True, capture_output=True, **k)


def sure(dosya):
    r = calistir(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', dosya], text=True)
    return float(r.stdout.strip())


def kapla(im, gen=GEN, yuk=YUK):
    """Görseli 16:9 alana taşmadan kırparak sığdırır."""
    im = im.convert('RGB')
    oran = max(gen / im.width, yuk / im.height)
    im = im.resize((round(im.width * oran), round(im.height * oran)), Image.LANCZOS)
    x, y = (im.width - gen) // 2, (im.height - yuk) // 2
    return im.crop((x, y, x + gen, y + yuk))


def duzelt(metin, ciftler):
    for a, b in ciftler:
        metin = re.sub(a, lambda m, b=b: re.sub(r'\$(\d)', lambda g: m.group(int(g.group(1))) or '', b), metin)
    return re.sub(r'\s+', ' ', metin).strip()


def js_dizgi(s):
    return json.dumps(s, ensure_ascii=False)


# ---------------------------------------------------------------- slayt kaynakları
def pptx_slaytlari(yol):
    """pptx içinden her slaydın en büyük görselini, metnini ve konuşmacı notunu çıkarır."""
    ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
    z = zipfile.ZipFile(yol)
    adlar = [n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', n)]
    adlar.sort(key=lambda n: int(re.search(r'(\d+)\.xml$', n).group(1)))
    # presentation.xml sırası esas (slaytlar yeniden sıralanmış olabilir)
    try:
        pres = ET.fromstring(z.read('ppt/presentation.xml'))
        rels = ET.fromstring(z.read('ppt/_rels/presentation.xml.rels'))
        hedef = {r.get('Id'): 'ppt/' + r.get('Target').lstrip('/').replace('ppt/', '') for r in rels}
        sira = [hedef[s.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')]
                for s in pres.iter('{http://schemas.openxmlformats.org/presentationml/2006/main}sldId')]
        if all(s in adlar for s in sira):
            adlar = sira
    except Exception:
        pass
    sonuc = []
    for ad in adlar:
        x = ET.fromstring(z.read(ad))
        metin = ' '.join(t.text or '' for t in x.iter('{%s}t' % ns['a'])).strip()
        rel = ad.replace('slides/', 'slides/_rels/') + '.rels'
        gorsel, notlar = None, ''
        if rel in z.namelist():
            for r in ET.fromstring(z.read(rel)):
                t = r.get('Target')
                p = t.lstrip('/') if t.startswith('/') else os.path.normpath(os.path.join('ppt/slides', t)).replace('\\', '/')
                if '/media/' in p and p in z.namelist():
                    if gorsel is None or z.getinfo(p).file_size > z.getinfo(gorsel).file_size:
                        gorsel = p
                if 'notesSlide' in t and p in z.namelist():
                    nx = ET.fromstring(z.read(p))
                    notlar = ' '.join(tt.text or '' for tt in nx.iter('{%s}t' % ns['a'])).strip()
        sonuc.append({'veri': z.read(gorsel) if gorsel else None, 'metin': metin, 'not': notlar})
    return sonuc


def klasor_slaytlari(yol):
    dosyalar = sorted(f for f in os.listdir(yol) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not f.startswith('.'))
    return [{'dosya': os.path.join(yol, f), 'ad': f, 'metin': '', 'not': ''} for f in dosyalar]


# ---------------------------------------------------------------- video → slayt eşleme
def video_eslestir(video, kucukler, fps=4):
    """Videonun her karesini en çok benzeyen slayta eşler; [(slayt, bas, son)] döner."""
    w, h = KUCUK
    r = calistir(['ffmpeg', '-v', 'error', '-i', video, '-vf', f'fps={fps},scale={w}:{h}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'])
    ham = r.stdout
    adim = w * h
    kareler = [ham[i:i + adim] for i in range(0, len(ham) - adim + 1, adim)]
    secim = []
    for k in kareler:
        en, eni = None, -1
        for si, s in enumerate(kucukler):
            fark = sum((a - b) * (a - b) for a, b in zip(k, s))
            if en is None or fark < en:
                en, eni = fark, si
        secim.append(eni)
    # gürültüyü azalt: 5 karelik çoğunluk
    yumusak = []
    for i in range(len(secim)):
        pencere = secim[max(0, i - 2): i + 3]
        yumusak.append(max(set(pencere), key=pencere.count))
    parcalar = []
    for i, s in enumerate(yumusak):
        t = i / fps
        if parcalar and parcalar[-1][0] == s:
            parcalar[-1][2] = t + 1 / fps
        else:
            parcalar.append([s, t, t + 1 / fps])
    # çok kısa (geçiş) parçaları komşuya kat
    temiz = []
    for p in parcalar:
        if p[2] - p[1] < 0.9 and temiz:
            temiz[-1][2] = p[2]
        elif temiz and temiz[-1][0] == p[0]:
            temiz[-1][2] = p[2]
        else:
            temiz.append(p)
    return [tuple(p) for p in temiz]


def sinirlari_oturt(parcalar, transkript, toplam):
    """Slayt geçişlerini, konuşmanın cümle aralarına oturtur (ses cümle ortasında kesilmesin)."""
    if not transkript:
        return parcalar
    aralar = [0.0] + [(transkript[i]['end'] + transkript[i + 1]['start']) / 2 for i in range(len(transkript) - 1)] + [toplam]
    yeni = []
    for i, (s, bas, son) in enumerate(parcalar):
        if i > 0:
            yakin = min(aralar, key=lambda a: abs(a - bas))
            if abs(yakin - bas) < 2.0:
                bas = yakin
                yeni[-1][2] = bas
        yeni.append([s, bas, son])
    yeni[-1][2] = toplam
    return [tuple(p) for p in yeni if p[2] - p[1] > 0.3]


# ---------------------------------------------------------------- katalog
def katalog_guncelle(kayit):
    yol = os.path.join(KOK, 'katalog.js')
    liste = []
    if os.path.exists(yol):
        m = re.search(r'DO\.katalogKaydet\((\[.*\])\);', open(yol, encoding='utf-8').read(), re.S)
        if m:
            liste = json.loads(m.group(1))
    liste = [k for k in liste if k['id'] != kayit['id']] + [kayit]
    sira = {'tam': 0, 'oyunlu': 1, 'taslak': 2}
    liste.sort(key=lambda k: (sira.get(k.get('durum'), 2), k.get('seri', ''), k.get('id')))
    with open(yol, 'w', encoding='utf-8') as f:
        f.write('/* Ders Odası — ders kataloğu. scripts/ders-odasi/ice-aktar.py günceller. */\n')
        f.write('DO.katalogKaydet(' + json.dumps(liste, ensure_ascii=False, indent=1) + ');\n')


# ---------------------------------------------------------------- ana akış
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--id', required=True, help='ders kimliği (küçük harf, tire): adab-08')
    ap.add_argument('--ad', required=True)
    ap.add_argument('--seri', default='Dersler')
    ap.add_argument('--kisa', help='HUD için kısa ad (Fıkıh 3)')
    ap.add_argument('--renk', default='#4f7a3a')
    ap.add_argument('--yas', default='10-15 yaş')
    ap.add_argument('--pptx')
    ap.add_argument('--gorseller')
    ap.add_argument('--haric', nargs='*', default=[], help='alınmayacak görsel dosya adları')
    ap.add_argument('--video')
    ap.add_argument('--ses', help='ayrı anlatım sesi (yoksa videonun sesi kullanılır)')
    ap.add_argument('--transkript', help='Whisper JSON: [{start,end,text}]')
    ap.add_argument('--video-ekle', action='store_true', help='tüm ders videosunu sona blok olarak ekle')
    ap.add_argument('--kalite', type=int, default=78)
    a = ap.parse_args()

    if not re.match(r'^[a-z0-9-]+$', a.id):
        sys.exit('--id yalnızca küçük harf, rakam ve tire içermeli')
    hedef = os.path.join(KOK, a.id)
    for alt in ('slayt', 'ses', 'video'):
        os.makedirs(os.path.join(hedef, alt), exist_ok=True)

    duzeltmeler = json.load(open(os.path.join(BURADA, 'duzeltmeler.json'), encoding='utf-8'))

    # 1) slaytlar
    if a.pptx:
        kaynak = pptx_slaytlari(a.pptx)
        gorseller = []
        for s in kaynak:
            if s['veri'] is None:
                continue
            from io import BytesIO
            gorseller.append((Image.open(BytesIO(s['veri'])), s))
    elif a.gorseller:
        kaynak = [s for s in klasor_slaytlari(a.gorseller) if s['ad'] not in a.haric]
        gorseller = [(Image.open(s['dosya']), s) for s in kaynak]
    else:
        sys.exit('--pptx veya --gorseller gerekli')
    kucukler = []
    for i, (im, s) in enumerate(gorseller, 1):
        k = kapla(im)
        k.save(os.path.join(hedef, 'slayt', f'{i:02d}.webp'), 'WEBP', quality=a.kalite, method=6)
        kucukler.append(k.convert('L').resize(KUCUK).tobytes())
    print(f'{len(gorseller)} slayt yazıldı')

    # 2) video eşleme ve slayt slayt anlatım
    transkript = json.load(open(a.transkript, encoding='utf-8')) if a.transkript else []
    for t in transkript:
        t['text'] = duzelt(t['text'], duzeltmeler)
    akis = []  # [(slayt_no, bas, son)]
    if a.video:
        toplam = sure(a.ses or a.video)
        akis = sinirlari_oturt(video_eslestir(a.video, kucukler), transkript, toplam)
        ses_kaynak = a.ses or a.video
        for i, (s, bas, son) in enumerate(akis, 1):
            calistir(['ffmpeg', '-v', 'error', '-y', '-ss', f'{bas:.2f}', '-to', f'{son:.2f}', '-i', ses_kaynak,
                      '-vn', '-ac', '1', '-b:a', '64k', os.path.join(hedef, 'ses', f'{i:02d}.mp3')])
        print(f'video {len(akis)} slayt parçasına ayrıldı')
        kullanilan = {s for s, _, _ in akis}
        for i in range(len(gorseller)):
            if i not in kullanilan:
                os.remove(os.path.join(hedef, 'slayt', f'{i + 1:02d}.webp'))
                print('  videoda kullanılmayan slayt atlandı:', gorseller[i][1].get('ad', i + 1))
        if a.video_ekle:
            calistir(['ffmpeg', '-v', 'error', '-y', '-i', a.video, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'slow',
                      '-crf', '30', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '80k', '-ac', '1', '-movflags', '+faststart',
                      os.path.join(hedef, 'video', 'tam.mp4')])
            calistir(['ffmpeg', '-v', 'error', '-y', '-ss', '2', '-i', os.path.join(hedef, 'video', 'tam.mp4'), '-frames:v', '1',
                      '-vf', 'scale=960:-1', os.path.join(hedef, 'video', 'tam.jpg')])
    else:
        akis = [(i, None, None) for i in range(len(gorseller))]

    # 3) bloklar
    bloklar = []
    bloklar.append({'id': 'giris', 'tur': 'bolum', 'numara': a.seri, 'baslik': a.ad, 'alt': '', 'ikon': 'kitap', 'renk': a.renk})
    for i, (s, bas, son) in enumerate(akis, 1):
        blok = {'id': f's{i:02d}', 'tur': 'slayt', 'gorsel': f'slayt/{s + 1:02d}.webp'}
        if bas is not None:
            blok['ses'] = f'ses/{i:02d}.mp3'
            metin = ' '.join(t['text'] for t in transkript if bas - 0.2 <= (t['start'] + t['end']) / 2 < son + 0.2)
            if metin:
                blok['metin'] = metin
                blok['not'] = 'Otomatik transkript; yayından önce gözden geçirin.'
        else:
            kay = gorseller[s][1]
            if kay.get('metin'):
                blok['metin'] = duzelt(kay['metin'], duzeltmeler)
            if kay.get('not'):
                blok['not'] = duzelt(kay['not'], duzeltmeler)
        bloklar.append(blok)
    if a.video_ekle and a.video:
        altyazi = [{'bas': round(t['start'], 2), 'son': round(t['end'], 2), 'metin': t['text']} for t in transkript]
        bloklar.append({'id': 'tam-video', 'tur': 'video', 'baslik': a.ad + ' — ders videosu', 'video': 'video/tam.mp4',
                        'poster': 'video/tam.jpg', 'altyazilar': altyazi, 'duraklar': [], 'zorunlu': False})
    bloklar.append({'id': 'son', 'tur': 'kapanis', 'baslik': 'Ders tamamlandı', 'maddeler': [], 'dua': 'Elhamdülillah.'})

    # Var olan ders.js'teki elle eklenmiş blokları koru
    js_yol = os.path.join(hedef, 'ders.js')
    if os.path.exists(js_yol):
        eski = open(js_yol, encoding='utf-8').read()
        if '"elle": true' in eski or 'elle: true' in eski:
            print('UYARI: ders.js elle düzenlenmiş; üzerine yazılmadı. Yeni iskelet ders.iskelet.js olarak kaydedildi.')
            js_yol = os.path.join(hedef, 'ders.iskelet.js')
    ders = {
        'id': a.id, 'ad': a.ad, 'kisaAd': a.kisa or a.ad, 'seri': a.seri, 'yas': a.yas, 'taslak': True,
        'ozet': f'{len(akis)} slayt' + (' · sesli anlatım ve altyazı' if a.video else '') + '. Etkinlikler eklenecek.',
        'kapakGorseli': 'slayt/01.webp', 'basariEsigi': 0.6,
        'bolumler': [{'id': 'ders', 'ad': a.kisa or a.ad, 'renk': a.renk, 'bloklar': bloklar}]
    }
    with open(js_yol, 'w', encoding='utf-8') as f:
        f.write(f'/* {a.ad} — scripts/ders-odasi/ice-aktar.py ile üretildi (taslak). */\n')
        f.write('DO.dersKaydet(' + json.dumps(ders, ensure_ascii=False, indent=1) + ');\n')
    katalog_guncelle({'id': a.id, 'ad': a.ad, 'seri': a.seri, 'kisaAd': a.kisa or a.ad, 'durum': 'taslak',
                      'kapak': f'dersler/{a.id}/slayt/01.webp', 'slayt': len(akis), 'video': bool(a.video),
                      'ozet': ders['ozet'], 'yas': a.yas})
    print('yazıldı:', js_yol)


if __name__ == '__main__':
    main()
