#!/usr/bin/env python3
"""plan.py'deki resimli oyunları data/bookN.json içine `game2` alanı olarak yazar (eski `game` olduğu gibi kalır)."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from plan import GAMES
ROOT = pathlib.Path(__file__).resolve().parents[2]
for b in (1, 2, 3):
    p = ROOT / 'data' / f'book{b}.json'
    raw = p.read_text()
    d = json.loads(raw)
    for t in d:
        mode, its = GAMES[t['id']]
        g = t['game']
        if mode == 'order':
            assert g['type'] == 'order' and len(its) == len(g['items']), t['id']
            t['game2'] = {'mode': mode, 'items': [{'i': i, 'l': l} for i, l in its]}
        else:
            assert g['type'] == 'match' and len(its) == len(g['pairs']), t['id']
            if mode == 'listen':
                t['game2'] = {'mode': mode, 'pairs': [{'a': {'i': i, 'l': l}} for i, l in its]}
            else:
                t['game2'] = {'mode': mode, 'pairs': [{'a': {'i': a, 'l': al}, 'b': {'i': bi, 'l': bl}} for a, al, bi, bl in its]}
    indent = 2 if raw.startswith('[\n') else None
    out = json.dumps(d, ensure_ascii=False, indent=indent, separators=None if indent else (',', ':'))
    p.write_text(out + ('\n' if raw.endswith('\n') else ''))
    print(p.name, 'yazıldı')
