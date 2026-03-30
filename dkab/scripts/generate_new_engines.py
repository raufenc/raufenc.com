#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
E25-E36 motorları için tüm sınıflara veri üretir.
- motor_katalogu.json'u tüm sınıflara kopyalar
- Her sınıfın oyun_bankasi.json'una yeni motor örnekleri ekler
"""

import json
import os
import copy
import random

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRADES = ['04', '05', '06', '07', '08', '09', '10', '11', '12']

# Sınıf 04'ün motor_katalogu.json'unu kaynak olarak kullan
KATALOG_SOURCE = os.path.join(BASE, 'data', '04', '04_etkinlik_ve_oyun', 'motor_katalogu.json')


def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  ✓ {os.path.relpath(path, BASE)}")


def copy_motor_katalogu():
    """motor_katalogu.json'u tüm sınıflara kopyala"""
    katalog = load_json(KATALOG_SOURCE)
    for grade in GRADES:
        if grade == '04':
            continue  # zaten güncellendi
        path = os.path.join(BASE, 'data', grade, '04_etkinlik_ve_oyun', 'motor_katalogu.json')
        if os.path.exists(path):
            existing = load_json(path)
            # Mevcut IDs
            existing_ids = {m['motor_id'] for m in existing}
            # Yeni motorları ekle
            added = [m for m in katalog if m['motor_id'] not in existing_ids]
            if added:
                existing.extend(added)
                save_json(path, existing)
                print(f"  → {len(added)} yeni motor eklendi: {grade}")
            else:
                print(f"  → {grade}: zaten güncel")


def generate_grade_games(grade):
    """Bir sınıf için yeni motor örnekleri üret"""
    bank_path = os.path.join(BASE, 'data', grade, '04_etkinlik_ve_oyun', 'oyun_bankasi.json')
    if not os.path.exists(bank_path):
        print(f"  ⚠ {grade}: oyun_bankasi.json bulunamadı")
        return

    bank = load_json(bank_path)
    existing_ids = {g['oyun_id'] for g in bank}
    new_games = []

    # Soru bankasından veri al
    soru_path = os.path.join(BASE, 'data', grade, '05_olcme_degerlendirme', 'soru_bankasi.json')
    sorular_all = []
    if os.path.exists(soru_path):
        sorular_all = load_json(soru_path)

    # Kavram kartları
    kavram_path = os.path.join(BASE, 'data', grade, '03_terimler', 'kavram_kartlari.json')
    kavramlar_all = []
    if os.path.exists(kavram_path):
        kavramlar_all = load_json(kavram_path)

    # Her sınıf için U1_B1 temelli örnek oyunlar ekle (eğer yoksa)
    grade_num = int(grade)

    def make_questions_sample(n=8):
        """n adet soru örneği al"""
        s = [q for q in sorular_all if q.get('dogru_cevap') and q.get('secenekler')]
        random.shuffle(s)
        return s[:n]

    def make_kavram_sample(n=8):
        """n adet kavram örneği al"""
        k = [c for c in kavramlar_all if c.get('terim') and len(c.get('terim', '')) >= 3]
        random.shuffle(k)
        return k[:n]

    sorular = make_questions_sample(10)
    kavramlar = make_kavram_sample(8)

    # İyi/kötü ahlak kavramları (sınıfa göre)
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
    diff_key = 'easy' if grade_num <= 6 else ('medium' if grade_num <= 9 else 'hard')

    # --- E25: Kelime Tahmin ---
    eid = f'U1_B1_E25'
    if eid not in existing_ids and kavramlar:
        kelimeleri = [
            {"kelime": k['terim'].upper()[:15], "ipucu": k.get('tanim', '')[:80], "kategori": k.get('kategori', '')}
            for k in kavramlar[:6] if len(k.get('terim', '')) >= 3
        ]
        if kelimeleri:
            new_games.append({
                "oyun_id": eid,
                "bolum_id": "U1_B1",
                "unite": "1. Ünite",
                "baslik": "Adam Asmaca: Dini Kavramlar",
                "motor_id": "E25",
                "motor_adi": "Kelime Tahmin",
                "hedef": "Dini kavramları harflerden tahmin ederek pekiştirmek",
                "veri": {"kelimeler": kelimeleri}
            })

    # --- E27: Uzay Nişancısı ---
    eid = f'U1_B1_E27'
    if eid not in existing_ids and sorular:
        dalgalar = []
        for s in sorular[:6]:
            c = (s.get('dogru_cevap', '') or '').replace(r'^[A-D]\)\s*', '')
            opts = [(o or '').replace(r'^[A-D]\)\s*', '') for o in (s.get('secenekler') or [])]
            yanlis = [o for o in opts if o != c][:3]
            if c and yanlis:
                dalgalar.append({
                    "soru": s.get('soru', ''),
                    "dogru": c,
                    "yanlis": yanlis,
                    "hiz": random.randint(1, 3)
                })
        if dalgalar:
            new_games.append({
                "oyun_id": eid,
                "bolum_id": "U1_B1",
                "unite": "1. Ünite",
                "baslik": "Uzay Nişancısı: Konu Soruları",
                "motor_id": "E27",
                "motor_adi": "Uzay Nişancısı",
                "hedef": "Soruları doğru cevaplarken uzay gemisi kullanmak",
                "veri": {"dalgalar": dalgalar}
            })

    # --- E29: Yarış ---
    eid = f'U1_B1_E29'
    if eid not in existing_ids and sorular:
        ai_str = 0.4 if grade_num <= 6 else (0.65 if grade_num <= 9 else 0.85)
        new_games.append({
            "oyun_id": eid,
            "bolum_id": "U1_B1",
            "unite": "1. Ünite",
            "baslik": "Yarış: Konu Soruları",
            "motor_id": "E29",
            "motor_adi": "Yarış",
            "hedef": "Sorulara hızlı cevap vererek rakibi geçmek",
            "veri": {
                "rakip_zorlugu": ai_str,
                "sorular": [
                    {
                        "soru": s.get('soru', ''),
                        "secenekler": [(o or '').replace(r'^[A-D]\)\s*', '') for o in (s.get('secenekler') or [])],
                        "dogru_cevap": (s.get('dogru_cevap', '') or '').replace(r'^[A-D]\)\s*', '')
                    }
                    for s in sorular[:8] if s.get('soru')
                ]
            }
        })

    # --- E30: Halat Çekme ---
    eid = f'U1_B1_E30'
    if eid not in existing_ids and sorular:
        new_games.append({
            "oyun_id": eid,
            "bolum_id": "U1_B1",
            "unite": "1. Ünite",
            "baslik": "Halat Çekme: Doğru mu Yanlış mı?",
            "motor_id": "E30",
            "motor_adi": "Halat Çekme",
            "hedef": "Doğru cevap vererek bilgi tarafını güçlendirmek",
            "veri": {
                "cekme_gucu": 1,
                "sorular": [
                    {
                        "soru": s.get('soru', ''),
                        "secenekler": [(o or '').replace(r'^[A-D]\)\s*', '') for o in (s.get('secenekler') or [])],
                        "dogru_cevap": (s.get('dogru_cevap', '') or '').replace(r'^[A-D]\)\s*', '')
                    }
                    for s in sorular[:8] if s.get('soru')
                ]
            }
        })

    # --- E31: Yakalayıcı ---
    eid = f'U1_B1_E31'
    if eid not in existing_ids:
        iyi = iyi_ahlak[diff_key]
        kotu = kotu_ahlak[diff_key]
        new_games.append({
            "oyun_id": eid,
            "bolum_id": "U1_B1",
            "unite": "1. Ünite",
            "baslik": "Yakalayıcı: İyi ve Kötü Ahlak",
            "motor_id": "E31",
            "motor_adi": "Yakalayıcı",
            "hedef": "İyi ve kötü ahlak kavramlarını ayırt etmek",
            "veri": {"sure": 60, "hiz": 1, "iyi": iyi, "kotu": kotu}
        })

    # --- E34: Sürükle Sınıfla ---
    eid = f'U1_B1_E34'
    if eid not in existing_ids and sorular:
        # Kavramları iki kategoriye böl
        if kavramlar and len(kavramlar) >= 4:
            cats_set = list(set([k.get('kategori', 'Genel') for k in kavramlar if k.get('kategori')]))[:3]
            if len(cats_set) < 2:
                cats_set = ['İbadet', 'Ahlak']
            cats = [{"ad": c, "renk": ["#1DD1A1", "#FF9F43", "#6C63FF"][i % 3]} for i, c in enumerate(cats_set)]
            kartlar = [
                {"metin": k['terim'], "dogru_kategori": k.get('kategori', cats_set[0])}
                for k in kavramlar[:10]
                if k.get('terim') and k.get('kategori') in cats_set
            ]
            if kartlar:
                new_games.append({
                    "oyun_id": eid,
                    "bolum_id": "U1_B1",
                    "unite": "1. Ünite",
                    "baslik": "Sürükle Sınıfla: Kavramlar",
                    "motor_id": "E34",
                    "motor_adi": "Sürükle & Sınıfla",
                    "hedef": "Kavramları doğru kategorilerine yerleştirmek",
                    "veri": {"kategoriler": cats, "kartlar": kartlar}
                })

    # --- E35: Sürpriz Kutu ---
    eid = f'U1_B1_E35'
    if eid not in existing_ids and sorular:
        kutular = []
        kutular.append({"tip": "bonus", "icerik": {"bonus_xp": 25}})
        kutular.append({"tip": "joker", "icerik": {"yardim": "İki yanlış seçenek elenir!"}})
        for s in sorular[:6]:
            c = (s.get('dogru_cevap', '') or '').replace(r'^[A-D]\)\s*', '')
            opts = [(o or '').replace(r'^[A-D]\)\s*', '') for o in (s.get('secenekler') or [])]
            if c and opts:
                kutular.append({
                    "tip": "soru",
                    "icerik": {
                        "soru": s.get('soru', ''),
                        "secenekler": opts,
                        "dogru_cevap": c
                    }
                })
        if kutular:
            new_games.append({
                "oyun_id": eid,
                "bolum_id": "U1_B1",
                "unite": "1. Ünite",
                "baslik": "Sürpriz Kutu: Konu Soruları",
                "motor_id": "E35",
                "motor_adi": "Sürpriz Kutu",
                "hedef": "Sürpriz kutulardan çıkan soruları çözmek",
                "veri": {"kutular": kutular}
            })

    # --- E36: Kelime Avı ---
    eid = f'U1_B1_E36'
    if eid not in existing_ids and kavramlar:
        kelimeleri = [
            {"kelime": k['terim'].upper()[:10], "ipucu": k.get('tanim', '')[:60]}
            for k in kavramlar[:8]
            if 3 <= len(k.get('terim', '')) <= 9 and all(c.isalpha() or c == 'İ' for c in k.get('terim', ''))
        ]
        if kelimeleri:
            new_games.append({
                "oyun_id": eid,
                "bolum_id": "U1_B1",
                "unite": "1. Ünite",
                "baslik": "Kelime Avı: Dini Terimler",
                "motor_id": "E36",
                "motor_adi": "Kelime Avı",
                "hedef": "Harf tablosunda gizli dini terimleri bulmak",
                "veri": {"grid_boyut": 9, "kelimeler": kelimeleri}
            })

    if new_games:
        bank.extend(new_games)
        save_json(bank_path, bank)
        print(f"  → {grade}: {len(new_games)} yeni oyun eklendi")
    else:
        print(f"  → {grade}: ekleme yapılmadı (zaten var veya veri yok)")


def main():
    print("=" * 50)
    print("DKAB Akademi — E25-E36 Veri Üretimi")
    print("=" * 50)

    print("\n1. Motor kataloğu güncelleniyor...")
    copy_motor_katalogu()

    print("\n2. Oyun bankası güncelleniyor (her sınıf)...")
    for grade in GRADES:
        print(f"\n  Sınıf {grade}:")
        if grade == '04':
            print("  → 04: zaten elle eklendi")
            continue
        generate_grade_games(grade)

    print("\n✅ Tamamlandı!")


if __name__ == '__main__':
    main()
