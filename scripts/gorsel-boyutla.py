#!/usr/local/bin/python3
"""Ana sayfa ve vitrin görsellerinin boyutlandırılmış WebP/AVIF sürümlerini üretir.

Kullanım (depo kökünde):  /usr/local/bin/python3 scripts/gorsel-boyutla.py
Pillow 11+ (WebP + AVIF desteğiyle) gerekir. Kaynak dosyalara dokunulmaz; her
kaynağın yanına <ad>-<genişlik>.avif / .webp yazılır. Yeniden çalıştırmak güvenlidir.
"""
import os
import sys
from PIL import Image

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# kaynak → üretilecek genişlikler (px). Genişlikler görüntülenme boyutunun 1x ve 2x'i.
HEDEFLER = {
    'images/raufenc.jpeg': [256, 512],
    'images/noroterbiye.webp': [240, 480],
    'images/vitrin/noroterbiye.webp': [360, 720],
    'images/vitrin/cihan-serisi.webp': [480, 960],
    'images/vitrin/video/ai-poster.jpg': [480, 960],
    'images/vitrin/video/dil-poster.jpg': [480, 960],
    'images/vitrin/video/sinif-poster.jpg': [480, 960],
    'images/vitrin/video/tarih-poster.jpg': [480, 960],
    'images/vitrin/video/dusunce-poster.jpg': [360, 720],
    'images/vitrin/video/peygamberim-poster.jpg': [360, 720],
}

# Ek JPEG'ler: paylaşım önizlemesi (OG) ve <picture> yedekleri.
JPEGLER = {
    'images/og-image.png': ('images/og-image.jpg', 1200),
    'images/raufenc.jpeg': ('images/raufenc-512.jpg', 512),
}

# Paylaşım önizlemesi için 1200x630'a ortadan kırpılan görseller (vitrin OG)
OG_KIRP = {
    'images/vitrin/cihan-serisi.webp': 'images/vitrin/cihan-serisi-og.jpg',
}

WEBP_KALITE = 78
AVIF_KALITE = 55


def kucult(im, genislik):
    if im.width <= genislik:
        return im.copy()
    yukseklik = round(im.height * genislik / im.width)
    return im.resize((genislik, yukseklik), Image.LANCZOS)


def yaz(yol, boyut_once):
    boyut = os.path.getsize(yol)
    print(f'  {os.path.relpath(yol, KOK)}  {boyut // 1024} KB  (kaynak {boyut_once // 1024} KB)')


def main():
    for kaynak, genislikler in HEDEFLER.items():
        yol = os.path.join(KOK, kaynak)
        if not os.path.exists(yol):
            sys.exit(f'Bulunamadı: {kaynak}')
        once = os.path.getsize(yol)
        im = Image.open(yol).convert('RGB')
        govde, _ = os.path.splitext(yol)
        print(kaynak, im.size)
        for g in genislikler:
            k = kucult(im, g)
            hedef = f'{govde}-{g}'
            k.save(hedef + '.webp', 'WEBP', quality=WEBP_KALITE, method=6)
            yaz(hedef + '.webp', once)
            k.save(hedef + '.avif', 'AVIF', quality=AVIF_KALITE, speed=4)
            yaz(hedef + '.avif', once)

    for kaynak, (hedef, g) in JPEGLER.items():
        yol = os.path.join(KOK, kaynak)
        once = os.path.getsize(yol)
        im = kucult(Image.open(yol).convert('RGB'), g)
        cikis = os.path.join(KOK, hedef)
        im.save(cikis, 'JPEG', quality=84, optimize=True, progressive=True)
        print(kaynak, '→', hedef)
        yaz(cikis, once)


def og_kirp():
    for kaynak, hedef in OG_KIRP.items():
        yol = os.path.join(KOK, kaynak)
        im = Image.open(yol).convert('RGB')
        oran = 1200 / 630
        if im.width / im.height > oran:
            g = round(im.height * oran)
            im = im.crop(((im.width - g) // 2, 0, (im.width - g) // 2 + g, im.height))
        else:
            y = round(im.width / oran)
            im = im.crop((0, (im.height - y) // 2, im.width, (im.height - y) // 2 + y))
        im = im.resize((1200, 630), Image.LANCZOS)
        cikis = os.path.join(KOK, hedef)
        im.save(cikis, 'JPEG', quality=84, optimize=True, progressive=True)
        print(kaynak, '→', hedef)
        yaz(cikis, os.path.getsize(yol))


if __name__ == '__main__':
    main()
    og_kirp()
