# DKAB 7. Sınıf Site Paketi

Bu paket, 7. Sınıf Din Kültürü ve Ahlak Bilgisi ders kitabından çıkarılan tam metin, yapı verisi, terim seti, etkinlikler, oyunlar, ölçme değerlendirme içerikleri, dua-sûre/âyet bankası ve görsel üretim planını içerir.

## Özet bilgiler

- **Sınıf:** 7
- **Kitap adı:** 7. Sınıf Din Kültürü ve Ahlak Bilgisi Ders Kitabı
- **Toplam sayfa:** 158
- **Ünite sayısı:** 5
- **Bölüm sayısı:** 32
- **Terim sayısı:** 328
- **Cümle sayısı:** 2641
- **Soru sayısı:** 75
- **Oyun sayısı:** 96
- **Görsel prompt sayısı:** 32
- **Etkinlik sayısı:** 55
- **Üretim tarihi:** 2026-03-27

## Dosya kapsamı

- `01_metin/`: tam metin, sayfa metinleri, cümle bankası ve kelime dizini
- `02_yapi/`: ünite-bölüm haritası, bölüm listesi ve kapsama matrisi
- `03_terimler/`: sözlük ve kavram kartları
- `04_etkinlik_ve_oyun/`: motor kataloğu, kitap etkinlikleri, oyun bankası ve performans görevleri
- `05_olcme_degerlendirme/`: soru bankası, cevap anahtarı ve ünite değerlendirme eşleşmeleri
- `06_dua_ve_sure/`: Arapça metin, okunuş ve anlam içeren dua/sûre/âyet bankası
- `07_gorsel_plani/`: bölüm bazlı görsel üretim promptları

## Son kontrol

- [x] Peygamber adlarında ve hürmet ifadelerinde kısaltmalı kullanım bulunmuyor
- [x] Kutsal kitabın adı gerekli yerlerde tutarlı biçimde Kur'ân-ı Kerîm olarak verildi
- [x] Kısaltmalı salavat ve dua kalıpları bulunmuyor
- [x] Her ünite için en az 15 soru üretildi ve zorluk dağılımı dengelendi
- [x] Her bölüm için en az 3 oyun üretildi ve farklı motorlar kullanıldı
- [x] Her bölüm için en az 1 görsel prompt ve her ünite için en az 1 ikon üretildi
- [x] Dua-sûre/âyet kayıtlarında Arapça metin, okunuş ve anlam alanları yer alıyor
- [x] Oyun veri alanları boş ya da yer tutucu içerik taşımıyor
- [x] MANIFEST dosyasında tüm çıktı dosyaları listelendi
- [x] Tüm JSON ve JSONL dosyaları doğrulandı

## Not

- Görsel promptlarının tümü aynı stil ekiyle sonlandırıldı.
- Peygamber sahneleri için yüz göstermeme kuralı promptlara eklendi.
