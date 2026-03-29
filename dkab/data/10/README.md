# DKAB 10. Sınıf Site Paketi

Bu paket, **10. Sınıf Din Kültürü ve Ahlak Bilgisi** ders kitabı esas alınarak hazırlanmış standart site veritabanı paketidir. Amaç, kitaptaki içeriklerden tek HTML'lik interaktif bir öğretim sitesi üretmek isteyen geliştiriciye doğrudan kullanılabilir, tutarlı ve makine-okur veri sağlamaktır.

## Paket Özeti

- **Sınıf:** 10
- **Kitap adı:** 10. Sınıf Din Kültürü ve Ahlak Bilgisi
- **Toplam sayfa:** 182
- **Ünite sayısı:** 5
- **Bölüm sayısı:** 27
- **Terim sayısı:** 192
- **Cümle sayısı:** 3414
- **Soru sayısı:** 75
- **Oyun sayısı:** 81
- **Görsel prompt sayısı:** 32

## Ünite Başlıkları

1. İslam'da Varlık ve Bilgi  
2. Allah'ı Tanımak  
3. İslam'ın Evrensel Mesajları  
4. Din, Çevre ve Teknoloji  
5. İslam Düşüncesinde İtikadî-Siyasî ve Fıkhî Yorumlar

## Klasörler

- **01_metin/**: Tam metin, sayfa metinleri, cümle bankası ve kelime dizini
- **02_yapi/**: Ünite-bölüm haritası, kapsama matrisi ve yapısal dosyalar
- **03_terimler/**: Sözlük ve bölüm bazlı kavram kartları
- **04_etkinlik_ve_oyun/**: Kitaptaki etkinlikler, oyun bankası, performans görevleri ve motor kataloğu
- **05_olcme_degerlendirme/**: Soru bankası, cevap anahtarı ve ünite değerlendirmeleri
- **06_dua_ve_sure/**: Âyet-i kerîme ve sûre bankası
- **07_gorsel_plani/**: Görsel üretim prompt listesi

## Kaynak ve Kapsam

Paket, ders kitabının ilk 182 sayfasındaki içerikler esas alınarak hazırlanmıştır. Ön kapak, arka kapak ve baskı artığı niteliğindeki fazlalık sayfalar veri kapsamı dışında bırakılmıştır. Metinler sayfa bazında ayrıştırılmış; ünite, bölüm, terim, etkinlik, ölçme ve görsel planı düzeylerinde yapılandırılmıştır.

## Son Kontrol

- [x] Hiçbir yerde "Hz." kısaltması geçmiyor
- [x] Hiçbir yerde "Kuran" veya "Kur'an" geçmiyor ("Kur'ân-ı Kerîm" yerine)
- [x] Hiçbir yerde "(s.a.v.)" veya "(a.s.)" kısaltması geçmiyor
- [x] Her ünite için en az 15 soru üretilmiş
- [x] Her bölüm için en az 3 oyun üretilmiş (farklı motorlarla)
- [x] Her bölüm için en az 1 görsel prompt üretilmiş
- [x] Dua/sure bankasında Arapça metin harekeli + okunuş + anlam mevcut
- [x] oyun_bankasi.json'daki her oyunun `veri` alanı gerçek, kullanılabilir veri içeriyor (placeholder yok)
- [x] MANIFEST.json'da tüm dosyalar listelenmiş
- [x] Tüm JSON dosyaları geçerli JSON formatında
