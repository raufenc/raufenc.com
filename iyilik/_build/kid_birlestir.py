#!/usr/bin/env python3
"""Çocuk için kısa metinleri (kid alanı) data/bookN.json'a işler. Asıl metin olduğu gibi kalır (Büyükler bölümü).
Kaynak: /tmp/iyilik-work/kid/bookN.json (konu başına title, intro, story, game.instruction, task) + aşağıdaki el düzeltmeleri.
Denetim: alan sınırları, seçenek sayısı, hürmet yazımı."""
import json, pathlib, sys, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = pathlib.Path('/tmp/iyilik-work/kid')
# el düzeltmeleri (anlamı asıl metne daha yakın tutmak için)
DUZ = {
    ('b3-08', 'opt', 2, 'text'): 'İstersen oturarak oynayalım, desin.',
    ('b3-13', 'opt', 0, 'text'): 'Evde sakin oynayıp zıplamayı uygun yerde yapsın.',
    ('b1-05', 'game'): 'Hazırlık planını sıraya koy. Bu, farzların listesi değildir.',
    ('b1-08', 'game'): 'Hanefî abdestin dört temelini hareketle eşleştir.',
    ('b1-17', 'game'): 'Oruç gününün zaman yolunu sıraya koy. Niyet de orucun temelidir.',
    ('b3-11', 'task'): 'Beş küçük pencere çiz ve boya. Altlarına vakit isimlerini bir büyüğünle sırayla yaz.',
}
YASAK = re.compile(r'\b(şans\w*|talih\w*|uğur\w*|sihir\w*|büyü|büyücü\w*|büyüsü|mucize\w*|kumar\w*|zar|zarı)\b', re.I)
bad = 0
for b in (1, 2, 3):
    kf = SRC / f'book{b}.json'
    if not kf.exists():
        print('yok', kf); continue
    kid = json.load(open(kf))
    path = ROOT / f'data/book{b}.json'
    data = json.load(open(path))
    tot = 0
    for l in data:
        k = kid[l['id']]
        for key, val in DUZ.items():
            if key[0] != l['id']: continue
            if key[1] == 'opt': k['story']['options'][key[2]][key[3]] = val
            elif key[1] == 'game': k['game']['instruction'] = val
            else: k[key[1]] = val
        assert len(k['story']['options']) == len(l['story']['options']), l['id']
        k['story']['options'] = [{'text': o['text'], 'feedback': o['feedback']} for o in k['story']['options']]
        k = {'title': k['title'], 'intro': k['intro'], 'story': k['story'], 'game': {'instruction': k['game']['instruction']}, 'task': k['task']}
        flat = ' '.join([k['title'], k['intro'], k['story']['scene'], k['story']['question'], k['game']['instruction'], k['task']] + [o['text'] + ' ' + o['feedback'] for o in k['story']['options']])
        if 'Peygamber Efendimiz' in flat and 'sallallahü aleyhi ve sellem' not in flat: print('HÜRMET', l['id']); bad += 1
        if YASAK.search(flat): print('YASAK KELİME', l['id'], YASAK.search(flat).group(0)); bad += 1
        n = len(flat); tot += n
        if n > 800: print('UZUN', l['id'], n); bad += 1
        l['kid'] = k
    json.dump(data, open(path, 'w'), ensure_ascii=False, indent=2)
    print(f'kitap {b}: {len(data)} konu, kısa metin {tot} harf')
sys.exit(1 if bad else 0)
