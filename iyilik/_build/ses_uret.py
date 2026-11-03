#!/usr/bin/env python3
"""İyiliklerle Büyüyorum — sesli anlatım üretimi (OpenAI gpt-4o-mini-tts).

Her konunun çocuğa dönük metni cümlelere bölünür; her cümle ayrı seslendirilir
(kesin cümle zamanlaması için), sessizlikleri kırpılır, bölüm başına tek mp3'te birleştirilir.

  python3 -I ses_uret.py --say            # yalnız karakter/maliyet hesabı
  python3 -I ses_uret.py --kitap 1        # yalnız 1. cilt + arayüz
  python3 -I ses_uret.py                  # hepsi

Anahtar ~/.openai/api-key dosyasından okunur; hiçbir yere yazılmaz, günlüğe basılmaz.
Cümle önbelleği: /tmp/iyilik-work/tts-cache (yeniden çalıştırma ücretsiz).
"""
import sys, os, re, json, hashlib, subprocess, pathlib, time, argparse
from concurrent.futures import ThreadPoolExecutor
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = pathlib.Path('/tmp/iyilik-work/tts-cache'); CACHE.mkdir(parents=True, exist_ok=True)
SES = ROOT / 'ses'
FFMPEG = '/Users/raufenc/pinokio/bin/miniconda/bin/ffmpeg'
MODEL = 'gpt-4o-mini-tts'
VOICE = 'coral'
INSTR = ('Türkçe konuş. 5-7 yaşındaki bir çocuğa anlatan sıcak, sakin, sevecen bir anlatıcı gibi, '
         'yavaş ve net oku. Kelimeleri açık telaffuz et, cümleler arasında kısa nefes al. '
         'Allahü teâlâ, sallallahu aleyhi ve sellem gibi ifadeleri saygıyla ve yavaşça söyle.')
SR = 24000
GAP = 0.38  # sn, cümleler arası

UI = {
    'hos': 'Merhaba! Önce kitabını seç. Sonra kitabında kaçıncı sayfada olduğunu yaz.',
    'kitap1': 'Birinci kitap. Rabbimi ve İbadetlerimi Seviyorum.',
    'kitap2': 'İkinci kitap. Güzel Ahlaklı Oluyorum.',
    'kitap3': 'Üçüncü kitap. Günlük Hayatımda Dinimi Yaşıyorum.',
    'tuslar': 'Kitabında kaçıncı sayfadasın? Sayılara dokun, sonra yeşil düğmeye bas.',
    'sayfa-yok': 'Kitapta böyle bir sayfa yok. Bir ile kırk sekiz arasında bir sayı yaz.',
    'sayfa-konusuz': 'Bu sayfayı boyayabilirsin.',
    'konu': 'Dinlemek için büyük düğmeye dokun. Aşağı kaydırarak diğer kartları da gör.',
    'konular': 'Bir konu seç. Resme dokununca konu açılır.',
    'boya': 'Bir renk seç, sonra resimde bir yere dokun. Boyadığın resim kendiliğinden saklanır.',
    'boyalar': 'Boyamak istediğin sayfayı seç.',
    'defter': 'Burası keşif defterin. Her konuyu bitirince bir damga kazanırsın.',
    'buyuk': 'Büyükler bölümüne girmek için bir büyüğünle birlikte ol. Düğmeyi üç saniye basılı tut.',
    'esles': 'Eşleştirmek için önce bir kartın üstüne, sonra karşısındaki karta dokun.',
    'sirala': 'Kartlara doğru sırayla dokun.',
    'dogru': 'Harika, doğru buldun!',
    'tekrar': 'Bir daha bakalım. Acele yok.',
    'damga': 'Yeni bir damga kazandın! Keşif defterine eklendi.',
    'bitti': 'Aferin! Bu konuyu tamamladın.',
    'kaydet': 'Resmin kaydedildi.',
    'sil': 'Resmi baştan boyamak istiyor musun?',
}
for i, w in enumerate(['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz']):
    UI[f'r{i}'] = w + '.'
for n in range(1, 49):
    UI[f'sayfa{n}'] = f'Sayfa {n}.'

ABBR = {'Hz', 'Dr', 'Prof', 'Bkz', 'vb', 'vs', 'yy', 'Doç', 'Müh'}
SPLIT = re.compile(r'(?<=[.!?…])\s+(?=[A-ZÇĞİÖŞÜÂÎÛ"“‘(])')


def split_sentences(text):
    text = re.sub(r'\s+', ' ', text.strip())
    out, cur = [], ''
    for part in SPLIT.split(text):
        if cur:
            cur += ' ' + part
        else:
            cur = part
        last = re.findall(r'(\S+)[.!?…]$', cur)
        word = last[0] if last else ''
        if word in ABBR:
            continue
        out.append(cur); cur = ''
    if cur:
        out.append(cur)
    return out


def say(text):
    """Seslendirilecek biçim: parantezleri kaldır, tırnak biçimlerini düzelt."""
    t = text.replace('(', ', ').replace(')', ',').replace(' ,', ',').replace(',,', ',')
    t = re.sub(r',\s*([.!?])', r'\1', t)
    return re.sub(r'\s+', ' ', t).strip()


ORD = ['Birinci', 'İkinci', 'Üçüncü', 'Dördüncü']


def lesson_units(l):
    """-> {birim_adı: [(gösterilen_metin, seslendirilen_metin, tür)]}"""
    U = {}
    mk = lambda ss, k='s': [(s, say(s), k) for s in ss]
    U['title'] = mk([l['title']])
    U['intro'] = mk(split_sentences(l['intro']))
    for i, c in enumerate(l['learn']):
        U[f'learn{i}'] = mk([c['title']] + split_sentences(c['text']))
    for i, c in enumerate(l['deeper']):
        U[f'deeper{i}'] = mk([c['q']] + split_sentences(c['a']))
    st = l['story']
    U['story'] = mk(split_sentences(st['scene']) + split_sentences(st['question']))
    for i, o in enumerate(st['options']):
        U[f'sopt{i}'] = mk([o['text']])
        U[f'sfb{i}'] = mk(split_sentences(o['feedback']))
    for i, q in enumerate(l['quiz']):
        segs = mk(split_sentences(q['question']))
        for j, o in enumerate(q['options']):
            segs.append((o, f'{ORD[j]}: ' + say(o), 'o'))
        U[f'q{i}'] = segs
        U[f'qx{i}'] = mk(split_sentences(q['explanation']))
    U['game'] = mk(split_sentences(l['game']['instruction']))
    for i, p in enumerate(l['game'].get('pairs') or []):
        U[f'ga{i}'] = mk([p['a']])
        U[f'gb{i}'] = mk([p['b']])
    for i, it in enumerate(l['game'].get('items') or []):
        U[f'go{i}'] = mk([it])
    U['task'] = mk(split_sentences(l['task']))
    return U


def cache_path(text):
    h = hashlib.sha1(f'{MODEL}|{VOICE}|{INSTR}|{text}'.encode()).hexdigest()
    return CACHE / f'{h}.mp3'


def tts(text):
    p = cache_path(text)
    if p.exists() and p.stat().st_size > 800:
        return p
    body = json.dumps({'model': MODEL, 'voice': VOICE, 'input': text, 'instructions': INSTR,
                       'response_format': 'mp3'}, ensure_ascii=False)
    key = open(os.path.expanduser('~/.openai/api-key')).read().strip()
    for attempt in range(6):
        r = subprocess.run(['curl', '-s', '-o', str(p) + '.tmp', '-w', '%{http_code}',
                            'https://api.openai.com/v1/audio/speech', '-H', '@-',
                            '-H', 'Content-Type: application/json', '--data-binary', body],
                           input=f'Authorization: Bearer {key}\n', capture_output=True, text=True)
        code = r.stdout.strip()
        if code == '200' and os.path.getsize(str(p) + '.tmp') > 800:
            os.replace(str(p) + '.tmp', p)
            return p
        time.sleep(2 + attempt * 3)
    raise RuntimeError(f'TTS başarısız ({code}) metin: {text[:40]}')


def decode(path):
    raw = subprocess.run([FFMPEG, '-v', 'error', '-i', str(path), '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(raw, dtype=np.int16)
    idx = np.where(np.abs(a) > 350)[0]
    if len(idx) == 0:
        return a
    s = max(0, idx[0] - int(0.05 * SR)); e = min(len(a), idx[-1] + int(0.14 * SR))
    return a[s:e]


def assemble(segs, out_mp3):
    chunks, cues, t = [], [], 0.0
    gap = np.zeros(int(GAP * SR), np.int16)
    for i, (disp, spoken, kind) in enumerate(segs):
        a = decode(cache_path(spoken))
        d = len(a) / SR
        cues.append({'t': disp, 'a': round(t, 2), 'b': round(t + d, 2), **({'k': kind} if kind != 's' else {})})
        chunks.append(a); t += d
        if i < len(segs) - 1:
            chunks.append(gap); t += GAP
    pcm = np.concatenate(chunks).astype(np.int16).tobytes()
    out_mp3.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([FFMPEG, '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                    '-c:a', 'libmp3lame', '-b:a', '24k', '-ar', str(SR), str(out_mp3)], input=pcm, check=True)
    return cues, t


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--say', action='store_true')
    ap.add_argument('--kitap', type=int, default=0)
    ap.add_argument('--sadece-ui', action='store_true')
    args = ap.parse_args()
    books = [args.kitap] if args.kitap else [1, 2, 3]
    plan = {}  # dosya -> {birim: segs}
    for b in books:
        for l in json.load(open(ROOT / f'data/book{b}.json')):
            plan[l['id']] = lesson_units(l)
    ui_segs = {k: [(v, say(v), 's')] for k, v in UI.items()}
    texts = {}
    if not args.sadece_ui:
        for L, units in plan.items():
            for segs in units.values():
                for _, sp, _ in segs:
                    texts[sp] = 1
    for segs in ui_segs.values():
        for _, sp, _ in segs:
            texts[sp] = 1
    chars = sum(len(t) for t in texts)
    print(f'benzersiz cümle: {len(texts)}  karakter: {chars}')
    if args.say:
        est = chars / 11.6 / 60 * 0.015
        print(f'tahmini süre {chars/11.6/60:.0f} dk, tahmini maliyet ≈ ${est:.2f}')
        return
    todo = [t for t in texts if not (cache_path(t).exists() and cache_path(t).stat().st_size > 800)]
    print('üretilecek cümle:', len(todo), flush=True)
    done = 0
    with ThreadPoolExecutor(6) as ex:
        for _ in ex.map(tts, todo):
            done += 1
            if done % 100 == 0:
                print(' ', done, '/', len(todo), flush=True)
    total_sec = 0.0
    # arayüz
    ui_idx = {}
    for k, segs in ui_segs.items():
        cues, d = assemble(segs, SES / 'ui' / f'{k}.mp3')
        ui_idx[k] = {'f': f'ui/{k}.mp3', 'd': round(d, 2)}
        total_sec += d
    json.dump(ui_idx, open(SES / 'ui.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    if not args.sadece_ui:
        for L, units in plan.items():
            idx = {}
            for name, segs in units.items():
                cues, d = assemble(segs, SES / L / f'{name}.mp3')
                idx[name] = {'f': f'{name}.mp3', 'd': round(d, 2), 's': cues}
                total_sec += d
            json.dump(idx, open(SES / f'{L}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    print(f'bitti. toplam ses: {total_sec/60:.1f} dk, tahmini ≈ ${total_sec/60*0.015:.2f}')


if __name__ == '__main__':
    main()
