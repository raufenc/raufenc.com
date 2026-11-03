#!/usr/bin/env python3
"""Codex ile 10 ikonluk tabaka üretimi.

  tabaka.py liste                 → tabakalar ve durumları
  tabaka.py uret N [--ref P] [--ek "not"] [--ikon a,b,...]  → N. tabakayı (veya verilen ikonları) üret
Ham tabakalar: /tmp/iyilik-v5/tabaka/NN-<deneme>.png ; defter: _build/oyun2/defter.json
"""
import sys, json, subprocess, pathlib, time, shutil, os
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from plan import ICONS, used_icons

HERE = pathlib.Path(__file__).parent
WORK = pathlib.Path('/tmp/iyilik-v5/tabaka'); WORK.mkdir(parents=True, exist_ok=True)
DEFTER = HERE / 'defter.json'
GEN = pathlib.Path.home() / '.codex' / 'generated_images'
CODEX = str(pathlib.Path.home() / '.local/bin/codex')


def sheets():
    u = used_icons()
    return [u[i:i + 10] for i in range(0, len(u), 10)]


def load():
    return json.loads(DEFTER.read_text()) if DEFTER.exists() else {'cagri': 0, 'tabaka': {}}


def prompt(ids, ek=''):
    cells = '\n'.join(f'{i + 1}. (row {1 if i < 5 else 2}, column {i % 5 + 1}) {ICONS[x]}' for i, x in enumerate(ids))
    ref = ('Match the drawing style of the attached reference image exactly (same line weight, palette, shading and cream background).\n'
           if '--ref' in sys.argv else '')
    return f"""Use your image generation tool to create exactly ONE image. Do not write code, do not edit files, just generate the image.

Image: a landscape sheet of {len(ids)} separate children's sticker icons arranged in a strict grid of 5 columns and 2 rows, equal cells, generous empty space between cells. Plain flat light cream background (#fbf6ec) everywhere, no grid lines, no borders, no frames, no shadows between cells.
{ref}
Style: warm, friendly children's picture-book sticker icons matching a Turkish Islamic kids' book for 5-year-olds: soft rounded shapes, chunky simple outlines in dark green-brown (#20352a), flat gentle colors (leaf green #4f7d3a, warm orange #d9822b, sky blue #3a87a8, gold #f0bd45, soft red #c9573c, cream), very light soft shading, one clear readable object per cell, centered, filling about 70% of its cell, each with a subtle soft drop shadow under it only.

Strict rules for every icon:
- absolutely NO text, letters, numbers, words or calligraphy anywhere (a plain question mark, check mark or X symbol is allowed only where described)
- NO human faces: any person is a faceless simple rounded pictogram with no eyes, no mouth, no facial features; prefer showing only hands
- no religious writing, no holy calligraphy, no halos, no depiction of prophets or angels, no dice, no magic
- animals may be cute

Cells, left to right, top row first:
{cells}
{ek}
""".strip()


def newest_after(t0):
    best = None
    for p in GEN.rglob('*.png'):
        m = p.stat().st_mtime
        if m > t0 and (best is None or m > best[0]):
            best = (m, p)
    return best[1] if best else None


def uret(n, ids, ref=None, ek=''):
    t0 = time.time()
    cmd = [CODEX, 'exec', '--skip-git-repo-check', '-s', 'workspace-write']
    if ref:
        cmd += ['-i', ref]
        sys.argv.append('--ref')
    p = prompt(ids, ek)
    cwd = WORK / f'cwd-{n}'; cwd.mkdir(exist_ok=True)
    r = subprocess.run(cmd, input=p, text=True, capture_output=True, cwd=cwd, timeout=900)
    import re
    m = re.search(r'session id:\s*([0-9a-f-]{36})', r.stdout + r.stderr)
    img = None
    if m and (GEN / m.group(1)).exists():
        c = sorted((GEN / m.group(1)).glob('*.png'), key=lambda x: x.stat().st_mtime)
        img = c[-1] if c else None
    k = len(list(WORK.glob(f'{int(n):02d}-*.png')))
    out = WORK / f'{int(n):02d}-{k}.png'
    if img:
        shutil.copy(img, out)
        print('OK', out, f'{time.time() - t0:.0f}s')
    else:
        print('GÖRSEL YOK', n, r.returncode, (r.stdout + r.stderr)[-800:])
    with open(HERE / 'cagrilar.jsonl', 'a') as f:
        f.write(json.dumps({'n': n, 'ids': ids, 'out': str(out) if img else None, 'sure': round(time.time() - t0), 'ek': ek}, ensure_ascii=False) + '\n')


if __name__ == '__main__':
    a = sys.argv[1:]
    if a[0] == 'liste':
        for i, s in enumerate(sheets()):
            print(i, len(list(WORK.glob(f'{i:02d}-*.png'))), s)
        print('çağrı:', len((HERE / 'cagrilar.jsonl').read_text().splitlines()) if (HERE / 'cagrilar.jsonl').exists() else 0)
    elif a[0] == 'uret':
        n = a[1]
        ref = a[a.index('--ref') + 1] if '--ref' in a else None
        ek = a[a.index('--ek') + 1] if '--ek' in a else ''
        ids = a[a.index('--ikon') + 1].split(',') if '--ikon' in a else sheets()[int(n)]
        if '--ref' in sys.argv:
            sys.argv.remove('--ref')
        uret(n, ids, ref, ek)
