#!/usr/bin/env python3
"""Kitap sayfalarından boyama varlıkları üretir.

Girdi : /tmp/iyilik-work/raw/b{kitap}-{sayfa:02d}.png  (pdftoppm -gray -r 132 -cropbox)
Çıktı : iyilik/sayfa/b{k}-{pp}-c.webp  çizgi katmanı (siyah + alfa, kayıpsız)
        iyilik/sayfa/b{k}-{pp}-b.webp  bölge haritası (R=düşük bayt, G=yüksek bayt, kayıpsız)
        iyilik/sayfa/b{k}-{pp}-t.webp  küçük önizleme (kâğıt üstünde çizgi)
Çalıştırma: /Library/Frameworks/Python.framework/Versions/3.13/bin/python3 -I sayfa_uret.py [b-p ...]
"""
import sys, pathlib, json
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

RAW = pathlib.Path('/tmp/iyilik-work/raw')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'sayfa'
OUT.mkdir(exist_ok=True)
MIN_REGION = 45  # px; bundan küçük bölgeler (antialias kırıntıları) komşuya katılır


def bolgeler(g, dil):
    barrier = g < 150
    barrier = ndi.binary_dilation(barrier, structure=np.ones((3, 3), bool), iterations=dil)
    lab, n = ndi.label(~barrier)
    sizes = np.bincount(lab.ravel(), minlength=n + 1)
    return lab, sizes


def islem(b, p, dil=1):
    g = np.array(Image.open(RAW / f'b{b}-{p:02d}.png').convert('L'))
    h, w = g.shape
    # çizgi katmanı: alfa = koyuluk
    alpha = (255 - g.astype(np.int16))
    alpha = np.clip((alpha - 6) * 1.04, 0, 255).astype(np.uint8)
    lines = np.zeros((h, w, 4), np.uint8)
    lines[..., 3] = alpha
    # bölge haritası
    lab, sizes = bolgeler(g, dil)
    if (sizes[1:] >= MIN_REGION).sum() < 12 and dil == 1:  # çizgide boşluk var (ör. yaprakların sap ucu): daha güçlü kapat
        lab, sizes = bolgeler(g, 3)
    keep = sizes >= MIN_REGION
    keep[0] = False
    lab = np.where(keep[lab], lab, 0)
    # bariyer ve küçük kırıntı piksellerini en yakın bölgeye ata
    idx = ndi.distance_transform_edt(lab == 0, return_distances=False, return_indices=True)
    lab = lab[idx[0], idx[1]]
    uniq, inv = np.unique(lab, return_inverse=True)
    lab = (inv.reshape(lab.shape) + 1).astype(np.uint16)
    count = int(lab.max())
    assert count < 65535
    rgb = np.zeros((h, w, 3), np.uint8)
    rgb[..., 0] = lab & 255
    rgb[..., 1] = lab >> 8
    name = f'b{b}-{p:02d}'
    Image.fromarray(lines, 'RGBA').save(OUT / f'{name}-c.webp', lossless=True, quality=100, method=6)
    Image.fromarray(rgb, 'RGB').save(OUT / f'{name}-b.webp', lossless=True, quality=100, method=6)
    thumb = Image.open(RAW / f'b{b}-{p:02d}.png').convert('L').resize((260, round(260 * h / w)), Image.LANCZOS)
    thumb.save(OUT / f'{name}-t.webp', quality=70, method=6)
    return name, w, h, count


if __name__ == '__main__':
    args = sys.argv[1:]
    todo = [tuple(map(int, a.split('-'))) for a in args] or [(b, p) for b in (1, 2, 3) for p in range(1, 49)]
    meta = {}
    for b, p in todo:
        name, w, h, c = islem(b, p)
        meta[name] = c
        print(name, w, h, 'bölge', c, flush=True)
    if not args:
        json.dump(meta, open(OUT / 'bolge-sayisi.json', 'w'), indent=0)
