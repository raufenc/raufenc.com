"""İyiliklerle Büyüyorum — seslendirilecek metinler (arayüz, tebrik, konu birimleri).
Ekranda hürmet yazımı (CLAUDE.md); seslendirmede okunuş biçimi (say)."""
import re

UI = {
    'hos': 'Hoş geldin! Önce kitabını seç. Sonra kitabında kaçıncı sayfada olduğunu yaz.',
    'kitap1': 'Birinci kitap. Rabbimi ve İbadetlerimi Seviyorum.',
    'kitap2': 'İkinci kitap. Güzel Ahlaklı Oluyorum.',
    'kitap3': 'Üçüncü kitap. Günlük Hayatımda Dinimi Yaşıyorum.',
    'tuslar': 'Kitabında kaçıncı sayfadasın? Sayılara dokun, sonra yeşil düğmeye bas.',
    'sayfa-yok': 'Kitapta böyle bir sayfa yok. Bir ile kırk sekiz arasında bir sayı yaz.',
    'sayfa-konusuz': 'Bu sayfayı boyayabilirsin.',
    'konu': 'Dinlemek için Bana oku düğmesine dokun.',
    'konular': 'Bir konu seç. Resme dokununca konu açılır.',
    'boya': 'Bir renk seç, sonra resimde bir yere dokun. Bitirince Bitti düğmesine bas.',
    'boyalar': 'Boyamak istediğin sayfayı seç.',
    'resimler': 'Burası senin resim duvarın. Boyadığın resimler burada durur.',
    'defter': 'Burası keşif defterin. Her konuyu bitirince bir damga kazanırsın.',
    'buyuk': 'Bu bölüm büyükler içindir. Bir büyüğünü çağır.',
    'esles': 'Eşleştirmek için önce bir karta, sonra onun eşine dokun.',
    'sirala': 'Kartlara doğru sırayla dokun.',
    'dogru': 'Harika, doğru buldun!',
    'tekrar': 'Bir daha bakalım. Acele yok.',
    'damga': 'Yeni bir damga kazandın! Keşif defterine eklendi.',
    'bitti': 'Aferin! Bu konuyu tamamladın.',
    'az': 'Biraz daha boyamak ister misin? Sonra yine Bitti düğmesine dokun.',
}
_SAYI = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz']
_ON = ['', 'on', 'yirmi', 'otuz', 'kırk']
for i, w in enumerate(_SAYI):
    UI[f'r{i}'] = ('İ' + w[1:] if w[0] == 'i' else w.capitalize()) + '.'
for n in range(1, 49):
    UI[f'sayfa{n}'] = 'Sayfa ' + (_ON[n // 10] + (' ' if n // 10 and n % 10 else '') + (_SAYI[n % 10] if n % 10 else '')).strip() + '.'

# Çocuk boyamayı bitirince: kendi emeği kutlanır (sırayla, tekrar etmeden).
TEBRIK = {
    't1': 'Mâşallah, ne güzel boyamışsın!',
    't2': 'Eline sağlık! Renkleri çok güzel seçmişsin.',
    't3': 'Bârekallah! Bu güzel resim senin emeğin.',
    't4': 'Ne kadar özenle boyamışsın. Resmin duvarına asıldı.',
    't5': 'Mâşallah! Sabırla, güzelce boyamışsın.',
    't6': 'Çok güzel olmuş! Bu resmi bir büyüğüne de göster.',
    't7': 'Eline, emeğine sağlık! Resmin Resimlerim duvarında.',
    't8': 'Ne güzel renkler! Her resmin seninle birlikte güzelleşiyor.',
}

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


# Ekranda hürmet yazımı (CLAUDE.md), seste kuralın istediği okunuş: "sallallahu aleyhi ve sellem".
OKUNUS = [('sallallahü', 'sallallahu'), ('Kur’ân-ı Kerîm', 'Kur’an-ı Kerim'), ('Mâşallah', 'Maşallah'), ('Bârekallah', 'Barekallah')]


def say(text):
    """Seslendirilecek biçim: parantezleri kaldır, tırnak biçimlerini düzelt."""
    for yazi, ses in OKUNUS:
        text = text.replace(yazi, ses)
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


