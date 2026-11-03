# İyiliklerle Büyüyorum — dijital site v2 raporu

Dal: `iyilik-v2` (push edilmedi, main'e dokunulmadı). Yalnız `iyilik/` altında çalışıldı.

## Ne yapıldı

Eski site (hash-yönlendirmeli, masaüstü ağırlıklı, ~180 KB sıkıştırılmamış JS/CSS) atıldı; aynı içerik verisi (`data/book{1,2,3}.json`, `*-sources.json`) ile **sıfırdan, çocuk-önce** bir site yazıldı. Düz statik dosya, derleme adımı yok (`outputDirectory: "."` aynen geçerli).

### Zorunlu üç özellik
1. **Sesli anlatım ("Bana oku")**
   - Her konunun çocuğa dönük bütün metni sesli: başlık, giriş, 3 öğrenme kartı, "Merak ediyorum" (2), hikâye (sahne, soru, her seçenek, her geri bildirim), oyun yönergesi ve oyun kartları, 3 soru (soru + seçenekler + açıklama), görev. Menü/yönerge ipuçları da sesli (79 kısa arayüz sesi: ana sayfa, tuş takımı, rakamlar, "Sayfa N", doğru/tekrar, damga…).
   - Büyük, tek dokunuşlu "Bana oku / Duraklat / Devam et" düğmesi (ekranın altında sabit). Okunan **cümle** sarı zeminle, **kelime** koyu sarı ile vurgulanır; ekran kendiliğinden kayar. Her kartın kendi "Dinle" düğmesi de var.
   - Yöntem: her cümle ayrı seslendirildi, baş/son sessizlik kırpıldı, bölüm başına tek mp3'te birleştirildi; kesin cümle zamanları `ses/<konu>.json`'da. Kelime vurgusu cümle içinde harf sayısına orantılı **tahmindir** (cümle sınırı kesindir).
   - Ses dosyası yoksa/çevrimdışı önbellekte yoksa cihazın kendi Türkçe sesi yedeğe girer.
   - Ses: OpenAI `gpt-4o-mini-tts`, ses **coral**, talimat "5–7 yaş çocuğa sakin, sevecen, yavaş, net Türkçe". Üç ses (coral/sage/nova) ve zor ifadeler ("Allahü teâlâ", "sallallahu aleyhi ve sellem", "âyet-i kerîme", "Bismillâhirrahmânirrahîm") üretilip `gpt-4o-transcribe` ile metne çevrilerek denetlendi; üçü de doğru yazıya döndü. Metne dokunulmadı (yalnız seslendirmede parantezler kaldırıldı: "Peygamber Efendimiz (sallallahu aleyhi ve sellem)" → "Peygamber Efendimiz sallallahu aleyhi ve sellem").
   - **Ses harcaması:** 3.877 benzersiz cümle, **190.996 karakter**, toplam **297,9 dakika** ses. Tahmini maliyet ≈ **4,5 $** (≈ 4,47 $ ses çıktısı + ~0,04 $ metin girdisi; dakikada ~0,015 $ varsayımıyla — kesin tutar OpenAI panelinden kontrol edilmeli). 10 $ tavanının altında olduğu için **üç cilt de üretildi**. Anahtar hiçbir dosyaya/loga yazılmadı.
2. **Dokun-boya: kitabın gerçek sayfaları**
   - 3 × 48 = **144 sayfanın hepsi** boyanabilir (kitapta yazı-only sayfa yok; her sayfada çizim var). V31 HD PDF'lerden `pdftoppm -cropbox` ile 132 dpi (832 × 1196 px) gri render → çizgi katmanı (siyah + alfa, kayıpsız WebP, ~100–150 KB) + önceden hesaplanmış **bölge haritası** (her piksel bir bölgeye ait, kayıpsız WebP, ~10 KB) + küçük önizleme.
   - Doldurma anında (bölge haritasından), çizgi kenarında hale/boşluk yok (çizgi pikselleri en yakın bölgeye atandı, çizgi üstte). Çizgideki 2 px'e kadar boşluklar kapatıldı; İyilik Ağacı sayfası (5) için daha güçlü kapatma uygulandı, yoksa yapraklar gövdeyle tek bölge oluyordu.
   - Araçlar: boya kovası, fırça (3 kalınlık), silgi, kaydır, geri al / yinele (12 adım), yakınlaştır/uzaklaştır/sığdır (+ iki parmakla sıkıştır, tekerlek), 21 renk. Resim her işlemden ~1 sn sonra otomatik olarak cihazda (IndexedDB) saklanır; sayfa açılışında geri yüklenir.
   - **"Kaydet"**: yalnız boyanmış resim PNG olarak iner. Hiç boyanmamışsa indirme engellenir ("Önce biraz boya"). Boş sayfa indirme/yazdırma kaldırıldı; yazdırma çıktısı da gizli. Sahnede uzun-basma/sağ tık menüsü kapalı. (Kararlı biri ağ sekmesinden çizgi dosyasını yine alabilir; tam engel mümkün değil.)
   - Boyamaya girişler: Boyama atölyesi (48 sayfa ızgarası), "Sayfa N" ekranı, konunun "Görev" adımı.
3. **Aile köşesi (Büyükler için)**
   - Ebeveyn kapısı: düğmeyi **3 saniye basılı tut** (klavye: Boşluk 3 sn) ya da yazıyla verilen sayıyı (üç/beş/yedi/dokuz) rakamla yaz. Oturum boyunca açık kalır.
   - Konu başına rehber: "Bu sayfada ne konuşulur?", çocuğa 2 soru, evde küçük bir iyilik, kitaptaki görev, dayanak kaynaklar (mevcut aile verisi **olduğu gibi**, metin değişmedi).
   - Hub: kullanım, 60 konu rehberi, **Kitaptaki karekodlar** (sade bilgi kartı: 3 QR + adres, indirme düğmesi yok), çevrimdışı indirme, kaynakça (dış bağlantılar **yalnız burada**), tek paragraf gizlilik, "ilerlemeyi sil".

### Çıta için olanlar
- **Kitapla birebir:** "Kaçıncı sayfadasın?" büyük tuş takımı (rakam seslenir) → "Sayfa N" ekranı (konu başlığı sesli) → Boya / Konuyu dinle. Sayfa 1–5 ve 46–48 konusuz: yalnız boyama. Karekod adresleri (`/iyilik/1/` `/2/` `/3/`) doğrudan o kitabın tuş takımını açar.
- **PWA + çevrimdışı:** `manifest.webmanifest`, `sw.js` (kapsam `/iyilik/`). Çekirdek (HTML/JS/CSS/yazı tipi/kapaklar/veri/tuş sesleri) kurulumda; sayfa görselleri ve sesler ilk kullanımda önbelleğe girer; Ebeveyn bölümünde "N. cildi indir" (resim + ses) var. Ses için Range isteği önbellekten karşılanır (Safari için).
- **Hız:** JS toplamı ~63 KB (gzip ~23 KB), CSS ~21 KB (gzip ~5 KB), yazı tipi (Nunito, kendi sunucumuzda) 74 KB. Yavaş 4G (1,6 Mbps, 150 ms) + 4× CPU yavaşlatma + önbellek/SW kapalı: **boyamaya hazır ≈ 2,4 sn**, ~353 KB aktarım (sıkıştırmasız yerel sunucuda; Vercel'de brotli ile daha az). Hedef (< 2,5 sn) sınırda tutuyor; ölçüm Chrome emülasyonudur, gerçek ucuz telefonda denenmedi.
- **Gizlilik:** hesap yok, çerez yok, analitik yok, dış istek yok (Google Fonts de kaldırıldı). Veri yalnız cihazda.
- **Erişilebilirlik:** 48 px+ hedefler, yüksek kontrast, `prefers-reduced-motion`, `prefers-contrast`, etiketler/`aria-current`/`role=radio`, odak halkası, "içeriğe geç", klavyeyle gezinme (tuş takımı rakam/Enter/Backspace; Boşluk okumayı duraklatır).
- **Tasarım:** kitap kapaklarının yeşil/sarı/mavi paleti (her cilt kendi rengiyle), yuvarlak hatlı Nunito, 390 px ve tablet/masaüstünde yatay taşma yok (11 ekran ölçüldü). Ödül yalnız keşif ve damga; sıralama/puan/zar yok; yanlış cevapta ceza yok ("Bir daha bakalım. Acele yok.").
- **Menüden kaldırıldı:** "Karekod seçenekleri" (ebeveyn bölümünde bilgi kartı oldu).
- **Vitrin kapağı:** `iyilik/vitrin/iyilik-480.webp|avif`, `iyilik-960.webp|avif`, `iyilik-og.jpg` (üç mevcut kitap kapağı yan yana; yeni görsel üretilmedi). `data/projeler.js`'e dokunulmadı.

## Dosya yapısı

```
iyilik/
  index.html, 1/ 2/ 3/index.html   (basılı QR sayfaları: <base href="/iyilik/">, #kitap/N açar)
  manifest.webmanifest, sw.js
  js/   app.js (yönlendirme+ekranlar) audio.js (okuma+vurgu) paint.js (boyama motoru) store.js (localStorage+IndexedDB) icons.js
  css/app.css, font/nunito-*.woff2
  data/ book{1,2,3}.json, *-sources.json   (DEĞİŞMEDİ)
  sayfa/ b{k}-{pp}-c.webp (çizgi) -b.webp (bölge) -t.webp (önizleme)   432 dosya, 20 MB
  ses/   <konu>.json (cümle zamanları), <konu>/<birim>.mp3, ui/*.mp3, ui.json   1.792 mp3, 56 MB
  assets/ kapaklar, QR'lar, simgeler   vitrin/   _build/ (üretim betikleri)
```
`_build/`: `sayfa_uret.py` (görsel+bölge), `ses_uret.py` (TTS; `--say` ile maliyet hesabı, cümle önbelleği sayesinde yeniden çalıştırma ücretsiz), `kabuk.py` (index ve QR sayfalarını şablondan yazar), `vitrin_uret.py`, `dogrula.mjs`.
Silinenler: eski `app.js, coloring.js, passport.js, premium.js, shell.js, qrcodes.js`, 4 CSS, 60 büyük sahne PNG'si (22 MB) ve küçük resimleri, `qr-series.*`, `garden.webp`, `discovery-world.webp`. Klasör 26 MB → 77 MB oldu (ses 56 MB).

İlerleme kaydı: `localStorage` anahtarı `iyilik-dunya-v1` **aynen**; şema yalnızca ekleme aldı (`book`, `sound`, `v:2`), eski `completed/tasks/visits/last` olduğu gibi okunur; göç gerekmedi, kimsenin damgası silinmez. Eski `#ders/ID`, `#boyama/ID`, `#agac`, `#buyukler`… bağlantıları yeni karşılıklarına yönlenir.

## Test sonuçları (hepsi bu oturumda çalıştırıldı)
- `node scripts/verify-book-qr.mjs` → geçti. `node --test tests/book-qr-redirects.test.mjs` → 6/6 geçti. `verifyIyilikPages` gevşetilmedi; 1/2/3 sayfalarının yapısı korundu.
- `python3 -m http.server` + `node iyilik/_build/dogrula.mjs`: 68 JSON geçerli, 6 JS `node --check` temiz, 432 sayfa dosyası + 1.792 mp3 + 79 arayüz sesi diskte tam, **2.328 dosyanın tamamı HTTP 200**, ses zamanları artan sırada. JS ile Python cümle bölücü 1.080 metin biriminde birebir aynı.
- Chrome (headless, 390 × 844, gerçek tarayıcı) ile: tuş takımı → sayfa; geçersiz sayfa uyarısı; QR sayfası `/iyilik/2/` → `#kitap/2`; "Bana oku" (cümle+kelime vurgusu ilerliyor, duraklat/devam); hikâye seçimi; eşleştirme ve sıralama oyunları (yanlışta cezasız sallanma, tamamlanınca "Aferin"); soru; damga kazanma ve `localStorage` kaydı; boyama (kova, fırça, geri al, yakınlaştırma, dokunmatik tek dokunuş doldurma, iki parmak sıkıştırma); yeniden yüklemede resmin geri gelmesi; PNG indirme adı; boş sayfada indirme engeli; ebeveyn kapısı (erken bırakınca açılmıyor, 3 sn sonra açılıyor); **sunucu kapatılarak gerçek çevrimdışı test**: QR sayfası, ana sayfa, önbellekteki boyama ve ses çalışıyor, önbellekte olmayan sayfa anlaşılır mesaj veriyor.

## Bilinen eksikler / dürüst notlar
- **Gerçek telefonda (iOS Safari, ucuz Android) denenmedi.** Chrome emülasyonu dışında doğrulama yok. Özellikle iOS'ta: ilk dokunuştan önce otomatik ses çalmaz (beklenen), PNG indirme davranışı, PWA kurulumu.
- **Sesi kulakla dinlemedim** (bu oturumda ses dinlenemez); telaffuz, metne geri çevirme ile doğrulandı. Rauf kulakla dinlemeli: `ses/b1-01/intro.mp3`, `ses/b1-01/learn1.mp3` ("Tefekkür…"), `ses/b1-02/learn2.mp3`. Memnun kalınmazsa `ses_uret.py` içindeki `VOICE`/`INSTR` değiştirilip yeniden üretilir (~4,5 $).
- Kelime vurgusu tahmindir (kesin değil); cümle vurgusu kesindir.
- Boyama klavyeyle yapılamaz (işaretçi gerektirir); klavye/ekran okuyucu kullanıcıları için boyama dışındaki bütün akışlar erişilebilir. Boyama alanı `role=application` ve etiketli.
- Fırça çizgi dışına taşabilir (çizgiler üstte durur). "Akıllı fırça" (başladığı bölgede kalan) eklenmedi.
- Bazı sayfalarda çizim çok az bölgeli (ör. 34 "Dua ediyorum": eller tek bölge; 8–30 bölge) — çizimin kendi yapısı.
- Eski sitedeki **ilerleme yedekleme/içe aktarma** (passport.js) ve **boş sahne indirme** kaldırıldı (ikincisi bilerek). Yedekleme istenirse eklenebilir.
- Okuma sesleri 56 MB: depo büyüdü. Vercel'de sorun değil; ama git geçmişi şişer (Git LFS veya ayrı ses depolama düşünülebilir). Ebeveyn "cildi indir" bir cilt için ~25–30 MB indirir.
- `Cache-Control`: ses/görsel `vercel.json` kuralıyla 30 gün; içeriği değişirse dosya adı değişmeli (şimdilik adlar sabit).

## Rauf'un karar vermesi gerekenler
1. **Yazım tutarsızlığı (dokunmadım):** `CLAUDE.md` "sallallahü aleyhi ve sellem", "Kur'ân-ı Kerîm", "âyet-i kerîme" yazımını istiyor; mevcut onaylı veri "sallallahu aleyhi ve sellem", "Kur’an-ı Kerim", "âyet" yazıyor. Görev gereği içeriği değiştirmedim; ses de veriye uygun ("sallallahu…"). İsterseniz veride düzeltilip sesler yeniden üretilebilir.
2. Ses 56 MB repo'da kalsın mı, yoksa ayrı depolama mı?
3. Vitrin kartı: `iyilik/vitrin/iyilik-*.{webp,avif,jpg}` dosyalarını `images/vitrin/`e kopyalayıp `data/projeler.js`'e kart eklemek (benim yapmadığım adım).
4. Ses: coral sesi uygun mu, hız yeterince yavaş mı (şu an ~11,6 karakter/sn)?
5. Ebeveyn kapısı "3 sn basılı tut" yeterli mi, yoksa kelime-sayı bilmecesi mi öne çıksın?
6. `index.html`/`1/2/3` kabuğu `_build/kabuk.py` ile üretiliyor; elle düzenleme istenirse betik bırakılabilir.

## Ana oturumun tarayıcıda denemesi gereken akışlar
1. `/iyilik/1/` (ve 2, 3) aç → doğrudan tuş takımı; 1, 7 yaz → ✓ → "Sayfa 17" → "Bu sayfayı boya".
2. Boyama: renk seç → bölgelere dokun (çizgi kenarında hale var mı?) → fırça/silgi → geri al/yinele → iki parmakla yakınlaştır, kaydır → çık, geri gel (resim duruyor mu) → "Kaydet" (PNG iner) → boş sayfada "Kaydet" (engellenmeli). Sayfa 5'te yapraklar tek tek boyanmalı.
3. Konu (ör. `#konu/b1-14`): "Bana oku" → cümle/kelime vurgusu ses ile uyumlu mu; duraklat; Hikâye (seçenek dinle/seç), Oyun (eşleştir/sırala), Soru (yanlış → tekrar; doğru → açıklama sesli), Görev → "damgamı al" → Keşif defterim.
4. Telefonda: menü/alt gezinme, 48 px hedefler, yatay taşma, ses toggle (üst sağ), ekran döndürme.
5. Büyükler için: kapı (3 sn), konu rehberi, kaynak bağlantıları (yalnız burada), karekod kartı, "cildi indir", gizlilik, sil.
6. Uçak modu: siteyi bir kez gezdikten sonra QR sayfası, boyama, ses çalışıyor mu. Eski ilerlemesi olan bir tarayıcıda damgaların durması.
7. Ses kalitesi: yukarıdaki üç mp3'ü dinleyin.
