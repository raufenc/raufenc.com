#!/usr/bin/env python3
"""v4 ses denetimi ve temizlik (dinlemeden yapılabilen teknik denetim).
  ses_denetim.py          → rapor (eksik birim, eski/OpenAI artığı, süre, kenar sessizliği, seviye, metin-ses uyumu)
  ses_denetim.py temizle  → ses/<konu>.json içinde çocuk akışında kullanılmayan birimleri ve sahipsiz mp3'leri siler
Rapor: _build/emmett/denetim-v4.json"""
import sys, json, pathlib, subprocess, re, difflib
import numpy as np
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / '_build'))
import ses_emmett as E  # noqa: E402
SES = ROOT / 'ses'

def lessons():
    for b in (1, 2, 3):
        yield from json.load(open(ROOT / f'data/book{b}.json'))

def level(path):
    x = E.decode(path)
    if not len(x): return None
    fr = int(0.02 * E.SR); n = len(x) // fr
    db = 20 * np.log10(np.sqrt((x[:n * fr].reshape(n, fr) ** 2).mean(1) + 1e-12))
    voiced = np.where(db > -40)[0]
    lead = voiced[0] * 0.02 if len(voiced) else 0; trail = (n - 1 - voiced[-1]) * 0.02 if len(voiced) else 0
    rms = 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
    return {'sure': round(len(x) / E.SR, 2), 'bas': round(lead, 2), 'son': round(trail, 2), 'rms': round(float(rms), 1), 'tepe': round(float(20 * np.log10(np.abs(x).max() + 1e-12)), 1)}

def main():
    em = E.emmett_units()
    rep = {'konu': {}, 'ui': {}, 'sorun': []}
    temizle = len(sys.argv) > 1 and sys.argv[1] == 'temizle'
    for l in lessons():
        need = E.kid_units(l); idxp = SES / f"{l['id']}.json"
        idx = json.load(open(idxp)) if idxp.exists() else {}
        r = {'eksik': [], 'openai': [], 'metin_farki': [], 'fazla': []}
        for u, segs in need.items():
            if u not in idx: r['eksik'].append(u); continue
            if (l['id'], u) not in em: r['openai'].append(u)
            if [c['t'] for c in idx[u]['s']] != [d for d, _, _ in segs]: r['metin_farki'].append(u)
        r['fazla'] = [u for u in idx if u not in need]
        if temizle and r['fazla']:
            for u in r['fazla']:
                f = SES / l['id'] / idx[u]['f']
                if f.exists(): f.unlink()
                del idx[u]
            json.dump(idx, open(idxp, 'w'), ensure_ascii=False, separators=(',', ':'))
            used = {v['f'] for v in idx.values()}
            for f in (SES / l['id']).glob('*.mp3'):
                if f.name not in used: f.unlink()
        lv = [level(SES / l['id'] / idx[u]['f']) for u in need if u in idx]
        r['sure'] = round(sum(v['sure'] for v in lv if v), 1)
        r['sessizlik_uyarisi'] = [u for u, v in zip([u for u in need if u in idx], lv) if v and (v['bas'] > 0.35 or v['son'] > 0.6)]
        r['seviye'] = [min(v['rms'] for v in lv if v), max(v['rms'] for v in lv if v)] if lv else None
        rep['konu'][l['id']] = r
        for k in ('eksik', 'openai', 'metin_farki'):
            if r[k]: rep['sorun'].append(f"{l['id']} {k}: {r[k]}")
    ui = json.load(open(SES / 'ui.json'))
    need_ui = set(E.UI) | set(E.TEBRIK)
    extra = [k for k in ui if k not in need_ui]
    miss = [k for k in need_ui if k not in ui]
    if temizle and extra:
        for k in extra:
            f = SES / ui[k]['f']
            if f.exists(): f.unlink()
            del ui[k]
        json.dump(ui, open(SES / 'ui.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    rep['ui'] = {'eksik': miss, 'fazla': extra, 'adet': len(ui)}
    if miss: rep['sorun'].append(f'ui eksik: {miss}')
    # çekim düzeyinde metin-ses uyumu (whisper)
    den = json.load(open(E.B / 'denetim.json'))
    rep['dusuk_uyum'] = {k: v['uyum'] for k, v in den.items() if v['uyum'] < 0.92}
    tot = sum(r['sure'] for r in rep['konu'].values())
    rep['toplam_sure_dk'] = round(tot / 60, 1)
    size = sum(f.stat().st_size for f in SES.rglob('*.mp3'))
    rep['mp3_mb'] = round(size / 1e6, 1)
    json.dump(rep, open(E.B / 'denetim-v4.json', 'w'), ensure_ascii=False, indent=1)
    print('sorun:', len(rep['sorun'])); [print(' ', s) for s in rep['sorun'][:40]]
    print('ui:', rep['ui']); print('düşük uyum:', rep['dusuk_uyum']); print('toplam süre (dk):', rep['toplam_sure_dk'], '| mp3 MB:', rep['mp3_mb'])
    sw = {k: v['sessizlik_uyarisi'] for k, v in rep['konu'].items() if v['sessizlik_uyarisi']}
    print('kenar sessizliği uyarısı:', sum(len(v) for v in sw.values()), list(sw.items())[:6])
    lvl = [v['seviye'] for v in rep['konu'].values() if v['seviye']]
    print('rms aralığı (dB):', min(a for a, b in lvl), max(b for a, b in lvl))

if __name__ == '__main__':
    main()
