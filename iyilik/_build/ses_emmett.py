#!/usr/bin/env python3
"""İyiliklerle Büyüyorum v4 — Emmett sesi (Higgsfield text2speech_v2 · ElevenLabs).

Bir "çekim" = birkaç ses biriminin (title, intro, learn0…) arka arkaya tek istekte okunması.
Üretim Higgsfield MCP aracıyla yapılır (bu betik yalnız istek hazırlar ve sonucu işler):

  ses_emmett.py plan                 → _build/emmett/plan.json (çekimler, karakter ve tahmini kredi)
  ses_emmett.py istek [N] [--grup G] → generate_audio_batch için hazır `requests` (en çok N=5 eksik çekim)
  ses_emmett.py indir INDEX URL [JOB]→ ham mp3'ü indirir, defter.json'a kaydeder
  ses_emmett.py isle [CEKIM ...]     → whisper ile kelime zamanı, birimlere kesme, loudnorm, mp3 + ses/<konu>.json
  ses_emmett.py durum                → üretilen / eksik çekimler

Ham sesler ve whisper çıktısı: /tmp/iyilik-work/emmett (depoya girmez). Defter (iş kimliği, karakter): _build/emmett/defter.json
"""
import sys, os, re, json, subprocess, pathlib, unicodedata, difflib
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / '_build' / 'emmett'; B.mkdir(parents=True, exist_ok=True)
HAM = pathlib.Path('/tmp/iyilik-work/emmett'); HAM.mkdir(parents=True, exist_ok=True)
SES = ROOT / 'ses'
FFMPEG = '/Users/raufenc/pinokio/bin/miniconda/bin/ffmpeg'
VOICE = '3c7d32be-0182-5c5e-aa6a-663409bfbb26'  # Emmett
SR = 24000
sys.path.insert(0, str(ROOT / '_build'))
from metinler import UI, TEBRIK, lesson_units, say, split_sentences  # noqa: E402

# ---------- plan ----------
P2 = ['title', 'intro', 'learn0', 'learn1', 'learn2', 'task']  # öncelik 2
P3 = ['story', 'sopt0', 'sopt1', 'sopt2', 'sfb0', 'sfb1', 'sfb2']
P4 = ['game', 'deeper0', 'deeper1']


def spoken(s):
    t = say(s)
    if not re.search(r'[.!?…][”"’)]?$', t):
        t += '.'
    return t


def kid_units(l):
    """Çocuğa okunan kısa metin (kid alanı) -> {birim: [(gösterilen, seslendirilen, tür)]}"""
    k = l.get('kid') or {}
    mk = lambda ss: [(s, say(s), 's') for s in ss]
    U = {'title': mk([k.get('title') or l['title']]), 'intro': mk(split_sentences(k.get('intro') or l['intro']))}
    st = k.get('story') or l['story']
    U['story'] = mk(split_sentences(st['scene']) + split_sentences(st['question']))
    for i, o in enumerate(st['options']):
        U[f'sopt{i}'] = mk([o['text']]); U[f'sfb{i}'] = mk(split_sentences(o['feedback']))
    U['game'] = mk(split_sentences((k.get('game') or l['game'])['instruction']))
    for i, p in enumerate(l['game'].get('pairs') or []):
        U[f'ga{i}'] = mk([p['a']]); U[f'gb{i}'] = mk([p['b']])
    for i, it in enumerate(l['game'].get('items') or []):
        U[f'go{i}'] = mk([it])
    U['task'] = mk(split_sentences(k.get('task') or l['task']))
    return U


def emmett_units():
    """Önceki Emmett çekimlerinden üretilmiş birimler: {(hedef, birim)}"""
    v1 = B / 'plan-v1.json'; d = defter(); out = set()
    for pl in [v1, B / 'plan-v2.json', B / 'plan-v3.json', B / 'plan.json']:
        if pl.exists():
            for t in json.load(open(pl)):
                if t['id'] in d and have(t['id']):
                    out |= {(t['hedef'], n) for n, _ in t['birimler']}
    return out


def build_plan():
    takes = []
    ui_keys = [k for k in UI if not re.fullmatch(r'r\d|sayfa\d+', k)] + list(TEBRIK)
    allui = {**UI, **TEBRIK}
    takes.append({'id': 'ui-a', 'grup': 1, 'hedef': 'ui', 'birimler': [[k, [[allui[k], spoken(allui[k])]]] for k in ui_keys]})
    sayi = [k for k in UI if re.fullmatch(r'r\d|sayfa\d+', k)]
    takes.append({'id': 'ui-b', 'grup': 1, 'hedef': 'ui', 'birimler': [[k, [[UI[k], spoken(UI[k])]]] for k in sayi]})
    em = emmett_units(); reused = 0
    for b in [1, 2, 3]:
        for l in json.load(open(ROOT / f'data/book{b}.json')):
            U = kid_units(l)
            idxp = SES / f"{l['id']}.json"; idx = json.load(open(idxp)) if idxp.exists() else {}
            bl = []
            for k, segs in U.items():
                if (l['id'], k) in em and k in idx and [c['t'] for c in idx[k]['s']] == [d for d, _, _ in segs]:
                    reused += len(' '.join(sp for _, sp, _ in segs)); continue  # aynı metin zaten Emmett ile var
                bl.append([k, [[d, spoken(sp)] for d, sp, kind in segs]])
            if bl:
                takes.append({'id': f"{l['id']}-k", 'grup': 2, 'hedef': l['id'], 'birimler': bl})
    print('yeniden kullanılan (tekrar üretilmeyen) harf:', reused)
    for t in takes:
        t['metin'] = prompt_of(t)
        t['kar'] = len(t['metin'])
    return takes


def needed_units(l):
    return list(kid_units(l))


def prompt_of(t):
    return '\n\n'.join(' '.join(sp for _, sp in segs) for _, segs in t['birimler'])


def load_plan():
    p = json.load(open(B / 'plan.json')); ids = {t['id'] for t in p}
    for extra in ['plan-v3.json']:  # tek birimlik düzeltme çekimleri (sona eklenir; plan.json sırası bozulmaz)
        if (B / extra).exists(): p += [t for t in json.load(open(B / extra)) if t['id'] not in ids]
    return p


def defter():
    p = B / 'defter.json'
    return json.load(open(p)) if p.exists() else {}


def ham(tid):
    return HAM / f'{tid}.mp3'


def have(tid):
    p = ham(tid); return p.exists() and p.stat().st_size > 4000


# ---------- işleme ----------
def norm(w):
    w = unicodedata.normalize('NFKD', w.lower().replace('ı', 'i'))
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in w if not unicodedata.combining(c)))


def decode(path):
    raw = subprocess.run([FFMPEG, '-v', 'error', '-i', str(path), '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768


_model = None


def whisper_words(path, hint):
    global _model
    cache = path.with_suffix('.words.json')
    if cache.exists():
        return json.load(open(cache))
    if _model is None:
        from faster_whisper import WhisperModel
        _model = WhisperModel('small', device='cpu', compute_type='int8')
    segs, _ = _model.transcribe(str(path), language='tr', word_timestamps=True, beam_size=5,
                                initial_prompt=hint[:800], vad_filter=False, condition_on_previous_text=True)
    out = [[w.word.strip(), round(w.start, 3), round(w.end, 3)] for s in segs for w in s.words]
    json.dump(out, open(cache, 'w'), ensure_ascii=False)
    return out


def align(exp_words, got):
    """exp_words: beklenen kelimeler; got: [[kelime,a,b]] → her beklenen kelime için (a,b) (eksikler ara değerle)."""
    A = [norm(w) for w in exp_words]
    Bn = [norm(g[0]) for g in got]
    T = [None] * len(A)
    sm = difflib.SequenceMatcher(None, A, Bn, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            for k in range(i2 - i1):
                T[i1 + k] = (got[j1 + k][1], got[j1 + k][2])
        elif tag == 'replace' and j2 > j1:
            # bölge içinde orantılı dağıt
            a0, b0 = got[j1][1], got[j2 - 1][2]
            L = [max(1, len(x)) for x in A[i1:i2]]; tot = sum(L); acc = 0
            for k, n in enumerate(L):
                s = a0 + (b0 - a0) * acc / tot; acc += n
                T[i1 + k] = (s, a0 + (b0 - a0) * acc / tot)
    # boşlukları doldur
    n = len(T)
    for i in range(n):
        if T[i] is None:
            pa = next((T[j][1] for j in range(i - 1, -1, -1) if T[j]), 0.0)
            j2 = next((j for j in range(i + 1, n) if T[j]), None)
            nb = T[j2][0] if j2 is not None else pa + 0.4
            gap = [k for k in range(i, j2 if j2 is not None else n)]
            L = [max(1, len(A[k])) for k in gap]; tot = sum(L); acc = 0
            for k, ln in zip(gap, L):
                s = pa + (nb - pa) * acc / tot; acc += ln
                T[k] = (s, pa + (nb - pa) * acc / tot)
    return T


def quiet_point(x, a, b):
    """a..b (sn) arasında en sessiz 20 ms'nin ortası"""
    ia, ib = int(a * SR), int(b * SR)
    if ib - ia < int(0.03 * SR):
        return (a + b) / 2
    seg = np.abs(x[ia:ib]); w = int(0.02 * SR)
    e = np.convolve(seg, np.ones(w) / w, mode='valid')
    return (ia + int(np.argmin(e)) + w // 2) / SR


def loud_gain(x):
    """-18 LUFS'a doğrusal kazanç (ffmpeg ebur128 ölçümü), tepe −1,5 dBTP sınırı"""
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()
    r = subprocess.run([FFMPEG, '-hide_banner', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                        '-af', 'loudnorm=I=-18:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'],
                       input=pcm, capture_output=True)
    err = r.stderr.decode(); j = json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', err).group(0))
    g = 10 ** ((-18 - float(j['input_i'])) / 20)
    peak = np.max(np.abs(x)) * g
    lim = 10 ** (-1.5 / 20)
    return g if peak <= lim else g * lim / peak


def enc(x, out):
    out.parent.mkdir(parents=True, exist_ok=True)
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()
    subprocess.run([FFMPEG, '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                    '-c:a', 'libmp3lame', '-b:a', '40k', '-ar', str(SR), str(out)], input=pcm, check=True)


def process(t):
    x = decode(ham(t['id']))
    # beklenen kelimeler (seslendirilen biçim), birim/cümle eşlemesi
    flat, where = [], []  # where[k] = (birim_i, cümle_i, kelime_i)
    for ui, (_, segs) in enumerate(t['birimler']):
        for si, (_, sp) in enumerate(segs):
            for wi, w in enumerate(sp.split()):
                flat.append(w); where.append((ui, si, wi))
    got = whisper_words(ham(t['id']), t['metin'])
    T = align(flat, got)
    ratio = difflib.SequenceMatcher(None, [norm(w) for w in flat], [norm(g[0]) for g in got], autojunk=False).ratio()
    g = loud_gain(x); x = x * g
    dur = len(x) / SR
    # cümle başlarını yakındaki sessizliğe oturt (whisper'ın kaçırdığı kısa cümleler için)
    fr = int(0.02 * SR); nfr = len(x) // fr
    rms = np.sqrt((x[:nfr * fr].reshape(nfr, fr) ** 2).mean(1) + 1e-12)
    quiet = 20 * np.log10(rms) < -42
    runs, i = [], 0
    while i < nfr:
        if quiet[i]:
            j = i
            while j < nfr and quiet[j]: j += 1
            if j - i >= 12: runs.append((i * 0.02, j * 0.02))
            i = j
        else: i += 1
    starts = [k for k in range(len(flat)) if where[k][2] == 0]
    for pk, k in zip(starts, starts[1:]):
        t0 = T[k][0]; ps = T[pk][0]
        cand = [r for r in runs if r[0] - 1.2 <= t0 <= r[1] + 0.7 and r[0] > ps + 0.3]
        if not cand: continue
        r = min(cand, key=lambda r: abs(r[1] - t0))
        ns = r[1] - 0.03
        T[k] = (ns, max(ns + 0.1, T[k][1]))
        if T[k - 1][1] > r[0] + 0.05: T[k - 1] = (min(T[k - 1][0], r[0]), r[0] + 0.05)
    # birim sınırları
    nb = len(t['birimler'])
    first = [min(T[k][0] for k in range(len(flat)) if where[k][0] == u) for u in range(nb)]
    last = [max(T[k][1] for k in range(len(flat)) if where[k][0] == u) for u in range(nb)]
    cuts = [max(0.0, first[0] - 0.12)]
    for u in range(nb - 1):
        cuts.append(quiet_point(x, last[u], max(last[u] + 0.02, first[u + 1])))
    cuts.append(min(dur, last[-1] + 0.35))
    res = {}
    for u, (name, segs) in enumerate(t['birimler']):
        a0 = cuts[u]; b0 = cuts[u + 1]
        # kenar sessizliği kırp: ilk kelimeden 60 ms önce, son kelimeden 180 ms sonra
        a = max(a0, first[u] - 0.06); b = min(b0, last[u] + 0.18)
        seg = x[int(a * SR):int(b * SR)].copy()
        f = int(0.012 * SR); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
        cues = []
        for si, (disp, sp) in enumerate(segs):
            ks = [k for k in range(len(flat)) if where[k][0] == u and where[k][1] == si]
            sa_abs = T[ks[0]][0]; sb_abs = max(T[k][1] for k in ks)
            nxt = ks[-1] + 1
            if nxt < len(flat) and where[nxt][0] == u:  # sonraki cümleden önceki sessizliğe kadar uzat
                pre = [r for r in runs if abs(r[1] - 0.03 - T[nxt][0]) < 0.011]
                if pre: sb_abs = max(sb_abs, pre[0][0] + 0.05)
            wt = [T[k] for k in ks]
            mono = all(wt[i][0] <= wt[i + 1][0] + 1e-6 for i in range(len(wt) - 1)) and all(x[0] >= sa_abs - 0.01 for x in wt)
            span = sb_abs - sa_abs
            if not mono or (wt[-1][1] - wt[0][0]) < 0.5 * span:  # güvenilmez: harf sayısına göre dağıt
                L = [len(flat[k]) + 1 for k in ks]; tot = sum(L); acc = 0; wt = []
                for n in L:
                    s0 = sa_abs + span * acc / tot; acc += n; wt.append((s0, sa_abs + span * acc / tot))
            sa = max(0.0, sa_abs - a); sb = min(b - a, sb_abs - a)
            ws = [[round(max(0, w0 - a), 2), round(w1 - a, 2)] for w0, w1 in wt]
            dw = disp.split()
            if len(dw) != len(ws):  # gösterilen metnin kelime sayısı farklıysa orantılı eşle
                ws = [ws[min(len(ws) - 1, int(i * len(ws) / len(dw)))] for i in range(len(dw))]
            c = {'t': disp, 'a': round(sa, 2), 'b': round(sb, 2), 'w': ws}
            cues.append(c)
        res[name] = {'pcm': seg, 'd': round(len(seg) / SR, 2), 's': cues}
    return res, ratio


def write(t, res):
    if t['hedef'] == 'ui':
        idxp = SES / 'ui.json'
        idx = json.load(open(idxp)) if idxp.exists() else {}
        for name, r in res.items():
            enc(r['pcm'], SES / 'ui' / f'{name}.mp3')
            idx[name] = {'f': f'ui/{name}.mp3', 'd': r['d']}
        json.dump(idx, open(idxp, 'w'), ensure_ascii=False, separators=(',', ':'))
        return
    L = t['hedef']
    idxp = SES / f'{L}.json'
    idx = json.load(open(idxp)) if idxp.exists() else {}
    for name, r in res.items():
        enc(r['pcm'], SES / L / f'{name}.mp3')
        idx[name] = {'f': f'{name}.mp3', 'd': r['d'], 's': r['s']}
    json.dump(idx, open(idxp, 'w'), ensure_ascii=False, separators=(',', ':'))


def main():
    a = sys.argv[1:]
    if not a:
        print(__doc__); return
    if a[0] == 'plan':
        takes = build_plan()
        json.dump(takes, open(B / 'plan.json', 'w'), ensure_ascii=False, indent=0)
        d = defter()
        for g in [1, 2]:
            gs = [t for t in takes if t['grup'] == g and t['id'] not in d]
            k = sum(t['kar'] for t in gs)
            print(f'grup {g}: {len(gs)} üretilecek çekim, {k} harf, ≈ {k * 0.00306:.1f} kredi')
    elif a[0] == 'istek':
        n = int(a[1]) if len(a) > 1 and a[1].isdigit() else 5
        grup = int(a[a.index('--grup') + 1]) if '--grup' in a else None
        takes = load_plan(); d = defter()
        todo = [(i, t) for i, t in enumerate(takes) if (grup is None or t['grup'] == grup) and not have(t['id']) and t['id'] not in d]
        req = [{'index': i, 'params': {'model': 'text2speech_v2', 'variant': 'elevenlabs', 'voice_type': 'preset',
                                       'voice_id': VOICE, 'prompt': t['metin']}} for i, t in todo[:n]]
        print(json.dumps(req, ensure_ascii=False))
    elif a[0] == 'indir':
        takes = load_plan(); i = int(a[1]); url = a[2]; t = takes[i]
        subprocess.run(['curl', '-s', '-L', '-o', str(ham(t['id'])), url], check=True)
        d = defter(); d[t['id']] = {'url': url, 'job': a[3] if len(a) > 3 else '', 'kar': t['kar']}
        json.dump(d, open(B / 'defter.json', 'w'), ensure_ascii=False, indent=1)
        print(t['id'], ham(t['id']).stat().st_size, 'bayt')
    elif a[0] == 'toplu':  # stdin: jobs_wait çıktısı (JSON) → tamamlananları indir
        takes = load_plan(); d = defter()
        if len(a) > 1:  # toplu IDX:JOBID:ZAMAN ... (url = cloudfront/hf_ZAMAN_JOBID.mp3)
            CF = 'https://d8j0ntlcm91z4.cloudfront.net/user_2vdaoGEYGLXcuFQZuiarJ8a4dBD/hf_'
            j = [{'index': int(x.split(':')[0]), 'job_id': x.split(':')[1], 'status': 'completed',
                  'result_url': f"{CF}{x.split(':')[2]}_{x.split(':')[1]}.mp3"} for x in a[1:]]
        else:
            j = json.load(sys.stdin)
        for x in (j['jobs'] if isinstance(j, dict) else j):
            if x.get('status') == 'completed' and x.get('result_url'):
                t = takes[x['index']]
                subprocess.run(['curl', '-s', '-L', '-o', str(ham(t['id'])), x['result_url']], check=True)
                d[t['id']] = {'url': x['result_url'], 'job': x['job_id'], 'kar': t['kar']}
                print(t['id'], ham(t['id']).stat().st_size)
        json.dump(d, open(B / 'defter.json', 'w'), ensure_ascii=False, indent=1)
    elif a[0] == 'isle':
        takes = load_plan()
        sel = [t for t in takes if have(t['id']) and (len(a) == 1 or t['id'] in a[1:])]
        rep = json.load(open(B / 'denetim.json')) if (B / 'denetim.json').exists() else {}
        for t in sel:
            res, ratio = process(t)
            write(t, res)
            rep[t['id']] = {'uyum': round(ratio, 3), 'sure': round(sum(r['d'] for r in res.values()), 1)}
            print(t['id'], 'uyum', round(ratio, 3), 'süre', rep[t['id']]['sure'], flush=True)
            json.dump(rep, open(B / 'denetim.json', 'w'), ensure_ascii=False, indent=1)
    elif a[0] == 'durum':
        takes = load_plan(); d = defter()
        for g in [1, 2]:
            gs = [t for t in takes if t['grup'] == g]
            print(f'grup {g}: {sum(have(t["id"]) for t in gs)}/{len(gs)} indirildi, karakter {sum(t["kar"] for t in gs if t["id"] in d)}')


if __name__ == '__main__':
    main()
