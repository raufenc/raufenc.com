#!/usr/bin/env python3
"""Her ses biriminin mp3'ünü whisper ile yazıya döker, beklenen (seslendirilen) metinle kelime kelime karşılaştırır.
Yanlış okunan / eksik / fazladan kelime şüphesini listeler: _build/emmett/kelime-denetim.json"""
import sys, json, pathlib, difflib
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / '_build'))
import ses_emmett as E  # noqa: E402
from faster_whisper import WhisperModel
m = WhisperModel('small', device='cpu', compute_type='int8')
out = {}
ids = sys.argv[1:]
for b in (1, 2, 3):
    for l in json.load(open(ROOT / f'data/book{b}.json')):
        if ids and l['id'] not in ids: continue
        idx = json.load(open(ROOT / f"ses/{l['id']}.json"))
        for u, segs in E.kid_units(l).items():
            if u not in idx: continue
            exp = ' '.join(E.spoken(sp) for _, sp, _ in segs)
            seg, _ = m.transcribe(str(ROOT / 'ses' / l['id'] / idx[u]['f']), language='tr', beam_size=5, vad_filter=False)
            got = ' '.join(s.text.strip() for s in seg)
            A = [E.norm(w) for w in exp.split()]; Bn = [E.norm(w) for w in got.split()]
            r = difflib.SequenceMatcher(None, A, Bn, autojunk=False).ratio()
            if r < 0.8:
                out[f"{l['id']}/{u}"] = {'oran': round(r, 2), 'beklenen': exp, 'duyulan': got}
        print(l['id'], len([k for k in out if k.startswith(l['id'])]), flush=True)
json.dump(out, open(E.B / 'kelime-denetim.json', 'w'), ensure_ascii=False, indent=1)
print('şüpheli birim:', len(out))
