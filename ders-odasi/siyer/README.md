# Siyer Yolculuğu — tam ders paketi, sürüm 2

Ortaokul için Peygamber Efendimiz (sallallahü aleyhi ve sellem) hayatını çocukluk, gençlik, Mekke, hicret, Medine, son yıllar ve hayatımıza taşıyacağımız örneklerle ele alan 60 ders. Her dersin temel akışı yaklaşık 10 dakikadır; sınıfın cevaplarına göre süre değişebilir. Ünite sonlarındaki 10 kısa tekrar filmi isteğe bağlı ek içeriktir ve bu 10 dakikaya dahil değildir.

## Kullanım

- Katalog: https://raufenc.com/ders-odasi/siyer/
- İlk tam ders: https://raufenc.com/ders-odasi/ders.html?d=siyer-01
- Son tam ders: https://raufenc.com/ders-odasi/ders.html?d=siyer-60
- Paket: https://raufenc.com/ders-odasi/siyer/indir/siyer-ders-paketi.zip

Her ders sitenin mevcut Ders Odası motorunda açılır. Başlangıç anketi, dört sesli görsel, sıralama/sınıflandırma/eşleştirme oyunu, gerekçeli karar etkinliği, üç soruluk değerlendirme ve çıkış cümlesi bulunur. Eşleştirmelerin açıklamaları çevrilen kartlarla sunulur. Öğretmen notları, kaynaklar ve sınıf düzeyine göre uyarlamalar dersle birlikte gelir.

Öğretmen görünümünden canlı oda açılır. Sitenin mevcut Firebase ve Ders Odası canlı bağlantı ayarları kullanılır; görüntülü görüşme ayrıca kullanılan toplantı uygulamasında yürütülür. Bağımsız yerel pakette bireysel çalışma kullanılabilir; canlı bağlantı için sunucu ve kendi Firebase ayarları gerekir. Öğrenci cevapları ve tamamlamalar mevcut motorun yerel kayıt/SCORM/xAPI özelliklerini kullanır. Katalogdaki ilerleme bu tarayıcıya aittir; bulut hesabı veya cihazlar arası eşitleme vaadi verilmez.

## Gömme

```html
<iframe src="https://raufenc.com/ders-odasi/siyer/" title="Siyer Yolculuğu"
  width="100%" height="900" allow="fullscreen; autoplay" allowfullscreen
  style="border:0;border-radius:16px"></iframe>
```

Tek ders için iframe kaynağını `https://raufenc.com/ders-odasi/ders.html?d=siyer-01` yapın. İlerleme mesajları mevcut motorun `kaynak: "ders-odasi"` sözleşmesini kullanır; mesaj kaynağı ve origin denetlenmeden işlenmemelidir. Bağımsız LMS puan aktarımı için yalnız iframe gömmek yeterli değildir; LMS'nin SCORM/xAPI destek ve ayarları kullanılmalıdır.

## İçerik ve yöntem

240 özgün anlatım karesi; 60 ısınma, 60 konu oyunu, 60 karar etkinliği ve 180 açıklamalı değerlendirme sorusu. İnsan ve tarihî şahıs tasviri kullanılmaz. Harita ve mimari çizimler şematiktir. Tarihî bilgi ile bugünkü sınıf örnekleri ayrılır; tarihî şahıslara söz uydurulmaz. Vefat dersinde coşkulu ödül sesi ve konfeti kapalıdır.

Her dersin kaynak bağlantıları `content-v2.json` ve öğretmen görünümündedir. TDV İslâm Ansiklopedisi ve Diyanet'in ilgili maddeleri esas alınmıştır. Rivayet ve tarihlendirme farklarında kesin olmayan ayrıntı kesin bilgi gibi verilmez. Alan uzmanı ve öğretmen incelemesi için ders metni, yanlış seçenek gerekçeleri ve kaynaklar açık tutulmuştur.

Türkçe kayıtlar genel amaçlı bir yapay anlatım sesiyle üretilmiştir; belirli bir kişinin sesini taklit etmez. Aynı metin ekranda okunabilir. Tekrar filmlerinin altyazı zamanları sözcük ağırlığıyla yaklaşık hesaplanır.

## Bakım ve doğrulama

Tek içerik kaynağı `content-v2.json`; `content-v2.js` yerel dosya kullanımını sağlar. `sync.mjs`, `compile-lesson.mjs` ve `render-frames.mjs` 60 native ders ve 240 SVG'yi üretir. Kontrol: `node ders-odasi/siyer/sync.mjs --check`.

GitHub Actions `siyer-media.yml` kayıtlı MP3'leri ve filmleri üretir, 60 dersin bütün bloklarını gerçek motorla JSDOM içinde çalıştırır, temel etkileşim/puan/kayıt testlerini yapar ve ZIP paketini hazırlar. Bu testler tarayıcı görseli, insan tarafından dinleme veya iki gerçek cihazla canlı sınıf testi değildir. Görsellerin PNG önizlemeleri `qa/` dizinindedir. Media ve paket doğrulama sonuçları ilgili manifestlere yazılır.
