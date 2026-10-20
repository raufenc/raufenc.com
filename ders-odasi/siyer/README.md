# Siyer Yolculuğu — 60 × 10 dakika

Ortaokul 5–8. sınıflar için, siyerin ana kronolojisini çocukluk ve gençlikten vefata kadar ele alan 60 bölümlük öğretim paketi. Son altı bölüm ahlâk ve genel tekrar içindir. Toplam rehberli süre 600 dakika; haftada üç bölümle 20 hafta.

## Kullanım

- Bağımsız alan: `/ders-odasi/siyer/`
- Öğretmen: `/ders-odasi/siyer/?mod=ogretmen#teacher`
- Belirli bölüm: `/ders-odasi/siyer/#ders-27`
- Gömülü görünüm: `/ders-odasi/siyer/?embed=1`
- Yerel motor: `/ders-odasi/ders.html?d=siyer-01` (01–60)
- Yerel motor öğretmen modu: `?d=siyer-01&rol=ogretmen&oda=SECILENKOD`; öğrenci aynı ders/oda ile `rol=ogrenci`.

`index.html` bütün CSS, JavaScript ve ders verisini kendi içinde taşır. Haricî kütüphane, görsel veya ağ isteği gerektirmez. Öğretmen alanındaki “Bağımsız HTML paketini indir” düğmesi kişisel notları içermeyen, yerel dosya olarak açılabilen HTML verir. Kaynak bağlantıları, Türkçe ses hizmeti ve Ders Odası canlı motoru internet/kurulum gerektirebilir. Sesli okuma tarayıcı sesidir; kaydedilmiş profesyonel ses/video içermez.

## İçerik ve pedagojik akış

Her bölüm: kazanım, yaklaşık tarih, üç özgün bilgi/sunum ekranı, özgün uygulama, üç seçenekli değerlendirme ve çıkış bileti. 180 SVG sunum, 60 soru, 60 uygulama; ayrıca zaman sıralama, kavram eşleştirme, 10 ünite için altışar soruluk tekrar.

- 0–1 dakika: ön bilgi ve kazanım
- 1–4 dakika: üç bilgi; öğretmen açıklaması ve öğrencinin kendi cümlesi
- 4–7 dakika: uygulama
- 7–9 dakika: değerlendirme ve gerekçe
- 9–10 dakika: çıkış cümlesi ve davranış bağlantısı

Süre bir öğretim planıdır; otomatik 10 dakikalık ses kaydı veya zorunlu bekleme yoktur. Kâğıt/harita/kart gerektiren açık uçlu etkinlikler öğretmenle veya kâğıt üzerinde yapılır; uygulamadaki deftere sonuç yazılır. Her açık uçlu görevin otomatik puanlandığı iddia edilmez.

Peygamber Efendimiz (sallallahü aleyhi ve sellem) ve sahâbe tasvirleri, rol yaptırma ve tarihî kişilere uydurma konuşma yoktur. Tarihî olayların savaş oyunu yapılmasına yer verilmez. Kaynak farklılıkları kesin tarih ezberine çevrilmez. Hitaplar kök CLAUDE.md ile uyumludur.

## Entegrasyon

Aynı kökende:
```html
<iframe src="/ders-odasi/siyer/?embed=1"
        title="Siyer Yolculuğu"
        style="width:100%;height:850px;border:0"
        allow="fullscreen"></iframe>
```

Mevcut `vercel.json`, `frame-ancestors 'self'` ve `X-Frame-Options: SAMEORIGIN` kullanır. Başka LMS alan adına gömme için bağımsız HTML'yi o sistemde barındırın; mevcut siteye dış köken izni ayrıca tanımlanmalıdır. Bu değişiklik güvenlik başlıklarını değiştirmez.

`dersler/siyer-01/ders.js` … `siyer-60/ders.js` mevcut DO.dersKaydet şemasındadır. Ders kataloğuna 60 kayıt eklenmiştir. Mevcut motorun kayıt/canlı/SCORM/xAPI özelliklerini kullanır. Motor değiştirilmemiştir; yeni içerikle gerçek LMS ve çok cihazlı canlı test yapılmamıştır. Firebase köken kısıtı nedeniyle Vercel önizlemesindeki canlı oturum, üretim raufenc.com oturumu ile eşdeğer değildir. Görüntülü görüşme haricî Zoom/Meet üzerinden yürütülür.

Bağımsız HTML tarayıcı yerel deposunu kullanır; merkezi kullanıcı hesabı/veritabanı sağlamaz. JSON yedek dışa/içe aktarılır. Bağımsız alan ve DO motoru kayıtları birbirinden ayrıdır. Bağımsız HTML doğrudan SCORM paketi değildir. Yerel motor için depodaki `scripts/ders-odasi/scorm-paketle.py` kullanılabilir; bu çalışmada SCORM ZIP üretilmemiştir.

## Kaynak ve inceleme

Her bölümün kaynakları `curriculum.json` içinde ve öğrenci ekranında bağlantılıdır. TDV İslâm Ansiklopedisi ve Diyanet Hadislerle İslâm temel başvuru kaynaklarıdır. Etkinlikler özgün pedagojik örneklerdir. Bu sürüm hoca/alan uzmanı incelemesine açık taslaktır. Depodaki MIMARI.md, yeni içeriklerin yayından önce Hocalarımız tarafından incelenmesini ister; bu nedenle ayrı dal ve önizleme hazırlanmıştır.

## Doğrulama sınırları

JavaScript sözdizimi, ders sayısı/kimliği, soru cevap indeksleri, kaynak eşlemeleri, DO şeması, SVG XML içeriği ve dosya referansları programatik olarak kontrol edilir. Bağımsız durum ve render fonksiyonları bellek içi DOM dublörüyle sınanır. Yerel çalışma ortamı açılamadığı ve bağlı tarayıcı aracı bulunmadığı için gerçek tarayıcı/mobil ekran, ses, dosya indirme, yazdırma ve çok cihazlı canlı oturum uçtan uca denenememiştir. Önizleme HTTP yanıtları ayrıca kontrol edilir.

## Dosya yapısı

- `siyer/index.html`: tam bağımsız arayüz, içerik ve oyunlar
- `siyer/curriculum.json`: 60 ders ve kaynaklar
- `siyer/README.md`: kurulum ve doğrulama açıklaması
- `dersler/siyer-NN/ders.js`: mevcut motor için ders
- `dersler/siyer-NN/slayt/01.svg` … `03.svg`: 16:9 sunum ekranları

## İçeriği güncelleme

Ders metinleri ve kaynakları curriculum.json üzerinden düzenlenir. Ardından `node ders-odasi/siyer/sync-content.mjs` ile bağımsız HTML içindeki veri, 60 yerel ders dosyası, 180 SVG ve katalog birlikte yenilenir. `node ders-odasi/siyer/verify.mjs` veri ve dosya tutarlılığını kontrol eder. Betikler yalnızca Node.js standart kitaplığını kullanır.
