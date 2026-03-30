#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
E25-E36 motorları için tüm sınıflara veri üretir.
Soru bankası formatını normalize eder (soru_metni/soru, dogru_cevap B→metin).
"""

import json, os, re, random

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRADES = ['04', '05', '06', '07', '08', '09', '10', '11', '12']


def load_json(path):
    if not os.path.exists(path):
        return None
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  ✓ {os.path.relpath(path, BASE)}")


def strip_prefix(text):
    """'A) Metin' → 'Metin'"""
    return re.sub(r'^[A-D]\)\s*', '', (text or '').strip())


def get_correct_text(soru):
    """dogru_cevap 'B' gibi index ise secenekler'den metni bul."""
    raw = (soru.get('dogru_cevap') or '').strip()
    secenekler = soru.get('secenekler') or []
    if re.match(r'^[A-D]$', raw, re.IGNORECASE):
        idx = 'ABCD'.upper().index(raw.upper())
        if idx < len(secenekler):
            return strip_prefix(secenekler[idx])
        return ''
    return strip_prefix(raw)


def get_wrong_texts(soru, correct):
    """Yanlış seçeneklerin metinlerini döndür."""
    return [
        strip_prefix(o) for o in (soru.get('secenekler') or [])
        if strip_prefix(o) and strip_prefix(o) != correct
    ][:3]


def normalize_soru(s):
    """Farklı formatlardaki soru objesini standart formata çevir."""
    soru_text = (s.get('soru_metni') or s.get('soru') or '').strip()
    dogru = get_correct_text(s)
    yanlis = get_wrong_texts(s, dogru)
    opts = [dogru] + yanlis
    random.shuffle(opts)
    return {
        'soru': soru_text,
        'dogru_cevap': dogru,
        'secenekler': opts
    }


def get_kavram_sample(kavramlar, n=8):
    k = [c for c in (kavramlar or [])
         if c.get('terim') and 3 <= len(c.get('terim', '')) <= 12]
    random.shuffle(k)
    return k[:n]


def generate_grade_games(grade):
    bank_path = os.path.join(BASE, 'data', grade, '04_etkinlik_ve_oyun', 'oyun_bankasi.json')
    bank = load_json(bank_path)
    if bank is None:
        print(f"  ⚠ {grade}: oyun_bankasi.json bulunamadı")
        return

    # Mevcut yeni motorları sil — temiz yeniden üret
    bank = [g for g in bank if g.get('motor_id', '') not in
            ['E25','E26','E27','E28_new','E29','E30','E31','E32','E33','E34','E35','E36']]
    existing_ids = {g['oyun_id'] for g in bank}

    # Soru bankası
    soru_path = os.path.join(BASE, 'data', grade, '05_olcme_degerlendirme', 'soru_bankasi.json')
    sorular_raw = load_json(soru_path) or []
    sorular = [normalize_soru(s) for s in sorular_raw if s.get('soru_metni') or s.get('soru')]
    sorular = [s for s in sorular if s['soru'] and s['dogru_cevap']]

    # Kavram kartları
    kavram_path = os.path.join(BASE, 'data', grade, '03_terimler', 'kavram_kartlari.json')
    kavramlar = load_json(kavram_path) or []

    grade_num = int(grade)
    ai_str = 0.4 if grade_num <= 6 else (0.65 if grade_num <= 9 else 0.85)
    diff_key = 'easy' if grade_num <= 6 else ('medium' if grade_num <= 9 else 'hard')

    iyi_ahlak = {
        'easy': [
            {"metin": "Dürüstlük", "emoji": "💚", "puan": 10},
            {"metin": "Paylaşmak", "emoji": "🤝", "puan": 10},
            {"metin": "Saygı", "emoji": "🙏", "puan": 10},
            {"metin": "Yardım", "emoji": "❤️", "puan": 15},
            {"metin": "Sabır", "emoji": "⏳", "puan": 10},
        ],
        'medium': [
            {"metin": "Adalet", "emoji": "⚖️", "puan": 15},
            {"metin": "İffet", "emoji": "🌸", "puan": 15},
            {"metin": "Tevekkül", "emoji": "🕊️", "puan": 15},
            {"metin": "Şükür", "emoji": "🙏", "puan": 10},
            {"metin": "Merhamet", "emoji": "💝", "puan": 15},
        ],
        'hard': [
            {"metin": "Takva", "emoji": "🌟", "puan": 20},
            {"metin": "Tevazu", "emoji": "🌱", "puan": 15},
            {"metin": "İhsan", "emoji": "✨", "puan": 20},
            {"metin": "Zühd", "emoji": "🌙", "puan": 20},
            {"metin": "Verâ", "emoji": "💎", "puan": 20},
        ]
    }
    kotu_ahlak = {
        'easy': [
            {"metin": "Yalan", "emoji": "🤥", "ceza": 8},
            {"metin": "Hırsızlık", "emoji": "😈", "ceza": 10},
            {"metin": "Kıskançlık", "emoji": "😒", "ceza": 8},
        ],
        'medium': [
            {"metin": "Riya", "emoji": "🎭", "ceza": 10},
            {"metin": "Kibir", "emoji": "😤", "ceza": 12},
            {"metin": "Haset", "emoji": "😒", "ceza": 10},
        ],
        'hard': [
            {"metin": "Nifak", "emoji": "🐍", "ceza": 15},
            {"metin": "Şirk", "emoji": "⚠️", "ceza": 20},
            {"metin": "Fesad", "emoji": "💀", "ceza": 15},
        ]
    }

    new_games = []

    def add(oyun):
        if oyun['oyun_id'] not in existing_ids:
            new_games.append(oyun)

    sample8 = sorular[:8]
    sample6 = sorular[:6]
    kavram_sample = get_kavram_sample(kavramlar, 8)

    # ── E25: Adam Asmaca ──────────────────────────────────────────────
    if kavram_sample:
        kelimeleri = [
            {"kelime": k['terim'].upper()[:12], "ipucu": (k.get('tanim') or k.get('aciklama') or '')[:80], "kategori": k.get('kategori', '')}
            for k in kavram_sample
            if 3 <= len(k.get('terim', '')) <= 12 and re.match(r'^[A-ZÇĞIİÖŞÜa-zçğıiöşü\s]+$', k.get('terim', ''))
        ][:6]
        if kelimeleri:
            add({
                "oyun_id": "U1_B1_E25", "bolum_id": "U1_B1", "unite": "1. Ünite",
                "baslik": "Adam Asmaca: Dini Kavramlar", "motor_id": "E25",
                "motor_adi": "Kelime Tahmin",
                "hedef": "Dini kavramları harflerden tahmin ederek pekiştirmek",
                "veri": {"kelimeler": kelimeleri}
            })
    elif sample6:
        # Soru cevaplarından kelime üret
        kelimeleri = [
            {"kelime": s['dogru_cevap'].upper()[:12], "ipucu": s['soru'][:80], "kategori": ""}
            for s in sample6
            if 3 <= len(s['dogru_cevap']) <= 12
        ][:5]
        if kelimeleri:
            add({
                "oyun_id": "U1_B1_E25", "bolum_id": "U1_B1", "unite": "1. Ünite",
                "baslik": "Adam Asmaca: Konu Kavramları", "motor_id": "E25",
                "motor_adi": "Kelime Tahmin",
                "hedef": "Konu kavramlarını harflerden tahmin et",
                "veri": {"kelimeler": kelimeleri}
            })

    # ── E27: Uzay Nişancısı ───────────────────────────────────────────
    if sample8:
        dalgalar = []
        for s in sample8[:6]:
            yanlis = [o for o in s['secenekler'] if o != s['dogru_cevap']][:3]
            if s['soru'] and s['dogru_cevap'] and yanlis:
                dalgalar.append({
                    "soru": s['soru'],
                    "dogru": s['dogru_cevap'],
                    "yanlis": yanlis,
                    "hiz": random.randint(1, 2)
                })
        if dalgalar:
            add({
                "oyun_id": "U1_B1_E27", "bolum_id": "U1_B1", "unite": "1. Ünite",
                "baslik": "Uzay Nişancısı: Konu Soruları", "motor_id": "E27",
                "motor_adi": "Uzay Nişancısı",
                "hedef": "Soruları doğru cevaplarken uzay gemisi kullan",
                "veri": {"dalgalar": dalgalar}
            })

    # ── E29: Yarış ────────────────────────────────────────────────────
    if sample8:
        add({
            "oyun_id": "U1_B1_E29", "bolum_id": "U1_B1", "unite": "1. Ünite",
            "baslik": "Yarış: Konu Soruları", "motor_id": "E29",
            "motor_adi": "Yarış",
            "hedef": "Sorulara hızlı cevap vererek rakibi geç",
            "veri": {"rakip_zorlugu": ai_str, "sorular": sample8}
        })

    # ── E30: Halat Çekme ──────────────────────────────────────────────
    if sample8:
        add({
            "oyun_id": "U1_B1_E30", "bolum_id": "U1_B1", "unite": "1. Ünite",
            "baslik": "Halat Çekme: Bilgi Yarışması", "motor_id": "E30",
            "motor_adi": "Halat Çekme",
            "hedef": "Doğru cevap vererek bilgi tarafını güçlendir",
            "veri": {"cekme_gucu": 1, "sorular": sample8}
        })

    # ── E31: Yakalayıcı ───────────────────────────────────────────────
    add({
        "oyun_id": "U1_B1_E31", "bolum_id": "U1_B1", "unite": "1. Ünite",
        "baslik": "Yakalayıcı: İyi ve Kötü Ahlak", "motor_id": "E31",
        "motor_adi": "Yakalayıcı",
        "hedef": "İyi kavramları yakala, kötülerden kaç",
        "veri": {"sure": 60, "hiz": 1, "iyi": iyi_ahlak[diff_key], "kotu": kotu_ahlak[diff_key]}
    })

    # ── E32: Jeopardy ─────────────────────────────────────────────────
    if len(sorular) >= 8:
        PUAN_SEVIYELERI = [100, 200, 300, 400]
        chunk = len(sorular) // 3
        cats = []
        for i, (ad, sl) in enumerate([
            ("Konu 1", sorular[:chunk]),
            ("Konu 2", sorular[chunk:chunk*2]),
            ("Konu 3", sorular[chunk*2:chunk*3]),
        ]):
            if sl:
                cats.append({
                    "ad": ad,
                    "sorular": [
                        {**s, "puan": PUAN_SEVIYELERI[j % 4]}
                        for j, s in enumerate(sl[:4])
                    ]
                })
        if cats:
            add({
                "oyun_id": "U1_B1_E32", "bolum_id": "U1_B1", "unite": "1. Ünite",
                "baslik": "Bilgi Yarışması: Konu Panosu", "motor_id": "E32",
                "motor_adi": "Bilgi Yarışması",
                "hedef": "Jeopardy panosunda soruları çöz",
                "veri": {"kategoriler": cats}
            })

    # ── E33: Çark ─────────────────────────────────────────────────────
    if len(sorular) >= 6:
        COLORS = ['#1DD1A1','#FECA57','#54A0FF','#FF9F43','#FF6B6B','#5F27CD']
        chunks = [sorular[i::4] for i in range(4)]
        dilimler = [
            {"kategori": f"Konu {i+1}", "renk": COLORS[i], "puan": (i+1)*50}
            for i in range(4)
        ]
        dilimler.append({"kategori": "İflasss!", "renk": "#636e72", "puan": -50})
        dilimler.append({"kategori": "Bonus", "renk": "#5F27CD", "puan": 150})
        sorular_map = {f"Konu {i+1}": chunks[i][:4] for i in range(4)}
        sorular_map["İflasss!"] = []
        sorular_map["Bonus"] = []
        add({
            "oyun_id": "U1_B1_E33", "bolum_id": "U1_B1", "unite": "1. Ünite",
            "baslik": "Bilgi Çarkı: Konu Soruları", "motor_id": "E33",
            "motor_adi": "Bilgi Çarkı",
            "hedef": "Çark çevirerek soruları çöz",
            "veri": {"hak": 8, "dilimler": dilimler, "sorular": sorular_map}
        })

    # ── E34: Sürükle Sınıfla ─────────────────────────────────────────
    if kavram_sample and len(kavram_sample) >= 4:
        cats_set = list(dict.fromkeys([k.get('kategori', 'Genel') for k in kavram_sample if k.get('kategori')]))[:3]
        if len(cats_set) < 2:
            cats_set = ['İbadet', 'Ahlak']
        cats = [{"ad": c, "renk": ["#1DD1A1","#FF9F43","#6C63FF"][i%3]} for i, c in enumerate(cats_set)]
        kartlar = [
            {"metin": k['terim'], "dogru_kategori": k.get('kategori', cats_set[0])}
            for k in kavram_sample[:10]
            if k.get('terim') and k.get('kategori') in cats_set
        ]
        if kartlar:
            add({
                "oyun_id": "U1_B1_E34", "bolum_id": "U1_B1", "unite": "1. Ünite",
                "baslik": "Sürükle Sınıfla: Kavramlar", "motor_id": "E34",
                "motor_adi": "Sürükle & Sınıfla",
                "hedef": "Kavramları doğru kategorilere yerleştir",
                "veri": {"kategoriler": cats, "kartlar": kartlar}
            })

    # ── E35: Sürpriz Kutu ─────────────────────────────────────────────
    if sample6:
        kutular = [
            {"tip": "bonus", "icerik": {"bonus_xp": 25}},
            {"tip": "joker", "icerik": {"yardim": "İki yanlış seçenek elenir!"}},
        ]
        for s in sample6:
            kutular.append({
                "tip": "soru",
                "icerik": {
                    "soru": s['soru'],
                    "secenekler": s['secenekler'],
                    "dogru_cevap": s['dogru_cevap']
                }
            })
        add({
            "oyun_id": "U1_B1_E35", "bolum_id": "U1_B1", "unite": "1. Ünite",
            "baslik": "Sürpriz Kutu: Konu Soruları", "motor_id": "E35",
            "motor_adi": "Sürpriz Kutu",
            "hedef": "Sürpriz kutulardan çıkan soruları çöz",
            "veri": {"kutular": kutular}
        })

    # ── E36: Kelime Avı ───────────────────────────────────────────────
    if kavram_sample:
        kelimeleri = [
            {"kelime": k['terim'].upper()[:9], "ipucu": (k.get('tanim') or '')[:60]}
            for k in kavram_sample
            if 3 <= len(k.get('terim', '')) <= 9
               and re.match(r'^[A-ZÇĞIİÖŞÜa-zçğıiöşü]+$', k.get('terim', '').replace('İ','I'))
        ][:7]
        if kelimeleri:
            add({
                "oyun_id": "U1_B1_E36", "bolum_id": "U1_B1", "unite": "1. Ünite",
                "baslik": "Kelime Avı: Dini Terimler", "motor_id": "E36",
                "motor_adi": "Kelime Avı",
                "hedef": "Harf tablosunda gizli dini terimleri bul",
                "veri": {"grid_boyut": 9, "kelimeler": kelimeleri}
            })

    if new_games:
        bank.extend(new_games)
        save_json(bank_path, bank)
        print(f"    → {grade}: {len(new_games)} oyun eklendi ({', '.join(g['motor_id'] for g in new_games)})")
    else:
        print(f"    → {grade}: ekleme yapılmadı (veri yetersiz)")


def main():
    print("=" * 55)
    print("DKAB Akademi — E25-E36 Veri Üretimi (v2)")
    print("=" * 55)
    for grade in GRADES:
        if grade == '04':
            print(f"\n  Sınıf 04: elle eklendi, atlanıyor")
            continue
        print(f"\n  Sınıf {grade}:")
        generate_grade_games(grade)
    print("\n✅ Tamamlandı!")


if __name__ == '__main__':
    main()
