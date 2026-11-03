#!/usr/bin/env python3
"""Tabakayı 10 ikona keser: zemini saydamlaştırır (yumuşak gölge yarı saydam kalır), kare tuvale ortalar, WebP yazar.

  kes.py TABAKA.png id1,id2,...   → iyilik/ikon/<id>.webp (384 px) ve /tmp/iyilik-v5/onizleme/<tabaka>.png
"""
import sys, pathlib
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / 'ikon'; OUT.mkdir(exist_ok=True)
PRE = pathlib.Path('/tmp/iyilik-v5/onizleme'); PRE.mkdir(parents=True, exist_ok=True)
SIZE = 384


def kes(path, ids, cols=5, rows=2):
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(np.float32)
    H, W, _ = a.shape
    # zemin rengi: kenar şeridinin medyanı
    edge = np.concatenate([a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3), a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)])
    bg = np.median(edge, axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(-1))
    fg = dist > 28  # nesne (gölge değil)
    fg = ndi.binary_closing(fg, iterations=3)
    lab, n = ndi.label(ndi.binary_dilation(fg, iterations=6))
    objs = ndi.find_objects(lab)
    sizes = ndi.sum(fg, lab, range(1, n + 1))
    cells = {}
    for i, sl in enumerate(objs):
        if sizes[i] < 400:
            continue
        cy, cx = (sl[0].start + sl[0].stop) / 2, (sl[1].start + sl[1].stop) / 2
        c = min(int(cx / (W / cols)), cols - 1) + cols * min(int(cy / (H / rows)), rows - 1)
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        if c in cells:
            Y0, Y1, X0, X1 = cells[c]
            cells[c] = (min(Y0, y0), max(Y1, y1), min(X0, x0), max(X1, x1))
        else:
            cells[c] = (y0, y1, x0, x1)
    # saydamlık: zemine bağlı (kenardan taşkın dolgu) ve zemine yakın pikseller
    near = dist < 60
    reach, _ = ndi.label(near)
    border_labels = set(np.unique(np.concatenate([reach[0], reach[-1], reach[:, 0], reach[:, -1]]))) - {0}
    outside = np.isin(reach, list(border_labels))
    alpha = np.where(outside, np.clip((dist - 6) / 40, 0, 1) * 0.85, 1.0)
    alpha = np.where(outside & (dist > 46), 1.0, alpha)
    rgba = np.dstack([a, alpha * 255]).astype(np.uint8)
    full = Image.fromarray(rgba, 'RGBA')
    prev = Image.new('RGBA', (SIZE // 2 * len(ids), SIZE // 2 + 4), (255, 255, 255, 255))
    res = []
    for k, idx in enumerate(ids):
        if k not in cells:
            print('HÜCRE BOŞ', k, idx); continue
        y0, y1, x0, x1 = cells[k]
        pad = 10
        y0, x0 = max(0, y0 - pad), max(0, x0 - pad); y1, x1 = min(H, y1 + pad), min(W, x1 + pad)
        crop = full.crop((x0, y0, x1, y1))
        s = max(crop.size)
        sq = Image.new('RGBA', (s, s), (0, 0, 0, 0))
        sq.paste(crop, ((s - crop.size[0]) // 2, (s - crop.size[1]) // 2))
        sq = sq.resize((SIZE, SIZE), Image.LANCZOS)
        sq.save(OUT / f'{idx}.webp', 'WEBP', quality=84, method=6)
        prev.alpha_composite(sq.resize((SIZE // 2, SIZE // 2), Image.LANCZOS), (k * SIZE // 2, 2))
        res.append(idx)
    p = PRE / (pathlib.Path(path).stem + '.png')
    bgp = Image.new('RGBA', prev.size, (232, 240, 219, 255)); bgp.alpha_composite(prev); bgp.convert('RGB').save(p)
    print('kesildi', len(res), '/', len(ids), '→', p, '| hücre sayısı', len(cells))
    return res


if __name__ == '__main__':
    kes(sys.argv[1], sys.argv[2].split(','))
