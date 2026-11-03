#!/usr/bin/env python3
"""Projeler listesi kartı için kapak görseli: üç kitap kapağı yan yana (mevcut görseller, yeni görsel üretilmez)."""
import pathlib
from PIL import Image, ImageDraw, ImageFilter
R = pathlib.Path(__file__).resolve().parent.parent
def sahne(w, h):
    bg = Image.new('RGB', (w, h), '#fff7e3')
    d = ImageDraw.Draw(bg)
    for y in range(h):  # yumuşak dikey geçiş
        t = y / h; d.line([(0, y), (w, y)], fill=(int(255 - 22 * t), int(247 - 6 * t), int(227 - 20 * t)))
    covers = [Image.open(R / f'assets/book{i}.webp').convert('RGBA') for i in (1, 2, 3)]
    ch = int(h * 0.76); out = bg.convert('RGBA')
    spec = [(-5, -0.5, 0.03), (0, 0.0, -0.015), (5, 0.5, 0.03)]
    for c, (rot, dx, dy) in zip(covers, spec):
        cw = int(c.width * ch / c.height); c = c.resize((cw, ch), Image.LANCZOS)
        card = Image.new('RGBA', (cw + 40, ch + 40), (0, 0, 0, 0))
        sh = Image.new('RGBA', card.size, (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle((14, 20, cw + 14, ch + 20), 8, fill=(35, 76, 60, 90))
        card = Image.alpha_composite(card, sh.filter(ImageFilter.GaussianBlur(10))); card.alpha_composite(c, (20, 14))
        card = card.rotate(rot, expand=True, resample=Image.BICUBIC)
        x = int(w / 2 + dx * w * 0.62 - card.width / 2); y = int(h / 2 + dy * h - card.height / 2)
        out.alpha_composite(card, (x, y))
    return out.convert('RGB')
for w, h, name, fmt in [(480, 268, 'iyilik-480', 'webp'), (960, 536, 'iyilik-960', 'webp'), (1200, 630, 'iyilik-og', 'jpg')]:
    im = sahne(w, h)
    if fmt == 'webp': im.save(R / 'vitrin' / f'{name}.webp', quality=82, method=6)
    else: im.save(R / 'vitrin' / f'{name}.jpg', quality=86)
for w, h, name in [(480, 268, 'iyilik-480'), (960, 536, 'iyilik-960')]:
    try: sahne(w, h).save(R / 'vitrin' / f'{name}.avif', quality=55)
    except Exception as e: print('avif yok:', e); break
