# DKAB 11. Sınıf Site Paketi

- Sınıf: 11
- Kitap Adı: Din Kültürü ve Ahlak Bilgisi 11. Sınıf
- Toplam Sayfa: 159
- Ünite Sayısı: 5
- Bölüm Sayısı: 31
- Terim Sayısı: 138
- Cümle Sayısı: 2482
- Soru Sayısı: 75
- Oyun Sayısı: 93
- Görsel Prompt Sayısı: 36

Bu paket, Millî Eğitim Bakanlığı 11. Sınıf Din Kültürü ve Ahlak Bilgisi ders kitabının sayfa bazlı metinlerini, ünite-bölüm yapısını, terim sözlüğünü, etkinliklerini, oyunlaştırılmış içeriklerini ve ölçme-değerlendirme varlıklarını tek klasörde toplar.

Not: Ders kitabında ünite cevap anahtarına karekod yönlendirmesi bulunduğundan, bu paketteki `cevap_anahtari.json` dosyası `soru_bankasi.json` ile uyumlu olacak şekilde içerik temelli olarak üretilmiştir.

## Son Kontrol
- [x] Hiçbir yerde "Hazret-i" kuralına aykırı "Hz." kısaltması geçmiyor
- [x] Hiçbir yerde "Kuran" veya "Kur'an" geçmiyor ("Kur'ân-ı Kerîm" yerine)
- [x] Hiçbir yerde "(s.a.v.)" veya "(a.s.)" kısaltması geçmiyor
- [x] Her ünite için en az 15 soru üretilmiş
- [x] Her bölüm için en az 3 oyun üretilmiş (farklı motorlarla)
- [x] Her bölüm için en az 1 görsel prompt üretilmiş
- [x] Dua/sûre bankasında Arapça metin harekeli + okunuş + anlam mevcut
- [x] oyun_bankasi.json'daki her oyunun `veri` alanı gerçek, kullanılabilir veri içeriyor (placeholder yok)
- [x] MANIFEST.json'da tüm dosyalar listelenmiş
- [x] Tüm JSON dosyaları geçerli JSON formatında