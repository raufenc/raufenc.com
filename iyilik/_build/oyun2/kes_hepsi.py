#!/usr/bin/env python3
"""Her tabakanın seçilen (yoksa en son) denemesini keser. secim.json: {"3": 1} gibi tabaka→deneme."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from tabaka import sheets, WORK
from kes import kes
HERE = pathlib.Path(__file__).parent
sec = json.loads((HERE / 'secim.json').read_text()) if (HERE / 'secim.json').exists() else {}
only = set(sys.argv[1:])
for n, ids in enumerate(sheets()):
    if only and str(n) not in only: continue
    c = sorted(WORK.glob(f'{n:02d}-*.png'), key=lambda p: int(p.stem.split('-')[1]))
    if not c: print(n, 'yok'); continue
    p = WORK / f'{n:02d}-{sec[str(n)]}.png' if str(n) in sec else c[-1]
    kes(p, ids)
# Düzeltme tabakaları (gözle denetimde geri çevrilen ikonların yeniden çizimi) her zaman en son uygulanır.
DUZELTME = [('21-0.png', ['rekat-kiyam', 'agza-su', 'burna-su'])]
for f, ids in DUZELTME:
    if not only or 'd' in only:
        kes(WORK / f, ids)
