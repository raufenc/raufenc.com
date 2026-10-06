# Sitede görülen sorunlar (video çekimleri sırasında)

Ajanlar her projeyi gerçekten kullanırken bunları fark etti; videolar için site koduna dokunulmadı.

## İHO 7. Sınıf Arapça Oyunları (`/7sinif/`)

- 7sinif/index.html: Ünite I kartında '11 oyun' yazıyor, oysa /7sinif/1/ sayfasında 12 oyun kutusu var ve başlık da '12 oyun' diyor. Bu yüzden ana sayfaya göre toplam 44 çıkıyor, gerçekte 45. data/projeler.js açıklamasındaki '44 oyun' da buna dayanıyor.
- oyunlar/unit1/flappy.html: 1280×720 tuval CSS'te width/height 100% ile pencereye geriliyor. Dikey telefonda (390×844) kapılar ve kuş dikine uzayıp bozuluyor, HUD (kelime paneli, Seviye/Yeniden başlat düğmeleri) kapıların üstüne biniyor. 16:10 masaüstünde de daireler hafif oval görünüyor. Mobil çekim kullanılamadı.
- /7sinif/1/ mobil: kök öğe 100dvh yüksekliğinde kaldığı için body arka plan gradyanı her ekran yüksekliğinde tekrarlanıyor; kaydırınca yatay bir ek yeri bandı görünüyor. Konfeti noktaları da alt başlık metninin üstüne düşüyor ("keli•me").
- oyunlar2/games/g002-bakkal-eslestir.html mobilde (390 px) tek-ekran sığdırma ölçeklemesi yüzünden dar bir sütuna küçülüyor; yazılar okunmayacak kadar küçük.
- oyunlar/unit1/ka.html#g1 mobil: 'القائمة' geri düğmesi oyun başlığı 'لُعْبَة المُفْرَدات'ın üstüne biniyor.
- oyunlar/eba-etkilesim/activities.js baş yorumunda '15 etkinlik' yazıyor, veride 14 etkinlik var (ana sayfadaki '14 video' doğru).
- 7sinif/index.html (yaklaşık satır 158): Ana sayfadaki Ünite I kartında '11 oyun' yazıyor, ama ünite sayfasında 12 oyun var (toplam 45, kartlara göre 44). Bu kart intro'da ve 01. sahnede görünüyor.
- data/projeler.js / _video-studio/projeler.json: 7sinif açıklamasında '44 oyun' yazıyor; bu eskimiş, gerçek sayı 45.
- 7sinif/1/index.html: Masaüstü ızgarasında üç boş 'قريبا · Yeni oyun' yer tutucusu duruyor (5×3 ızgaranın 3 hücresi). Çekimde CSS ile gizlendi; site değiştirilmedi.
- 7sinif/index.html line 158: the Ünite I card on the home page says '11 oyun', but the Unit 1 page has 12 linked games and 1/index.html itself says '12 oyun'. Adding up the home page cards gives 44, while the real total is 45.
- projects.json: the '44 oyun' figure in the 7sinif description is out of date; it should be 45.
- The Unit I card in 7sinif/index.html says '11 oyun', so the cards add up to 44. The unit page actually has 12 game tiles (total 45). It is small but visible in the video's intro and the first half of 01. Suggestion: change it to '12 oyun'.
- The 7sinif description in projeler.json / data/projeler.js still says '44 oyun'. It should be 45.

## Yapay Zekâ Araç Atlası (`/ai-atlasi/`)

- The tool-card texts mix 'yapay zeka' (no circumflex) and English words ('Free plan var', 'AI') into Turkish copy, e.g. the Canva card's price note. The site itself uses 'Yapay Zekâ'.
- On the page, the 'ort. başlangıç' figure appears as '$15/ay' (the real value is 15.36, rounded). It is not used in the video.
- On mobile, the hover glow stays on the card that was tapped (ElevenLabs/NotebookLM). This is harmless and was left in the shots.

## Arapça Kelime Kartları (`/arapca-kelime/`)

- images/168.webp ve 169.webp (Sayma & Sayılar): levhalardaki Arapça sayılar soldan sağa dizilmiş. Sağdan okununca sıra 3-2-1 / 5-4 çıkıyor (ثلاثة، اثنان، واحد … ve تسعة، ثمانية …); doğru sıra واحد، اثنان، ثلاثة، أربعة، خمسة olmalı.
- images/23.webp: veri.js'te kelime "Kedileri sevmem", ama görseldeki Arapça "انا أحب القطط" (kedileri severim) ve görselde "KEDİLERİ SEVERİM" etiketi var. Anlam ters; ayrıca انا'da hemze eksik.
- veri.js'te iki öğenin kelime alanı çift tırnak içeriyor ("\"Bir, iki, üç, dört, beş\"", "\"Altı, yedi, sekiz, dokuz, on\""). app.js bunu alt="${item.kelime}" ile basınca HTML özniteliği bozuluyor (alt boş kalıyor). 169 numaralı öğenin ses alanı da yok.
- Bazı görsellerdeki Türkçe yazı veri.js'teki kelimeyle uyuşmuyor: 15 'Güle güle' → görselde 'Hoşça kal'; 154 'Bir mola istiyorum' → 'Mola yapmam gerek'; 76 'Hava sıcak' → 'Sıcak'; 82 'Ay’ı görüyorum' → görselde kesme işareti olmadan 'Ayı görüyorum' (ayı hayvanı gibi okunuyor).
- Küçük Arapça kusurları: 12 اِعْذِرْنِي (اعْذُرْنِي olmalı); 17 إِسْمِي (hemzetü'l-vasl, hemzesiz اسمي olmalı); 33 'Ayakta dur' için isim hâli الوقوف; 8 ve 9 numaralı görsellerde harekeler harflerden kopuk duruyor. 62, 110, 127, 156, 166 ve 210 numaralı görsellerde levhada başıboş nokta lekeleri var.
- Kategori adı veri.js'te "İzin İstemeler (Sınıf   Ev)" olarak geçiyor (büyük olasılıkla 'Sınıf / Ev' idi); sayfada boşluklar birleşip "(Sınıf Ev)" görünüyor.
- data/projeler.js açıklaması "Selam vermekten alışveriş yapmaya" diyor; alışverişle ilgili tek kart yok. 224 sayısı doğru.
- Uyku vakti, Dışarı çıkabilir miyim? ve İçeri girebilir miyim? ikişer kez var; 224 kartta 221 benzersiz Türkçe ifade.
- Masaüstü tam ekran akışta 'KAYDIR' ipucu (#feed-hint) kartın altındaki Arapça levhanın üstüne biniyor. Masaüstü akış çekimlerinde bu yüzden gizlendi; mobilde levhanın altında kaldığı için duruyor.
- Arama kutusunda tarayıcının biçimlendirilmemiş mavi temizleme '×' simgesi, sayıyla yan yana görünüyor (mobil çekimde de var; m-ara.jpg).

## Fâilâtün — Aruz Atölyesi (`/aruz/`)

- aruz/academy.js (ARUZ_DATA.chapters) içindeki Yahyâ beytinin ilk mısraı 'Handân ol gönül ki visâl ihtimâli var' biçiminde, 'ey' eksik. corpus.json'da 'Handân ol ey gönül ki…' yazıyor. İkinci mısra da academy.js'de 'kemâle erdi kemâlin', corpus.json'da 'kemâle irdi kemâlüñ'. Nâbî beytinde de 'Hudâ’dır' ile 'Hudâ’dur' farkı var. Söz Meydanı corpus metnini kullanıyor; academy metnini gösteren ekranlarda (arşiv, meclis) iki yazım arasında tutarsızlık olabilir. Videoda bu beyitler alıntılanmadı.
- Masaüstü masthead yarı saydam (#11151df2 + blur). Kaydırılmış ekranlarda alttaki metin başlığın arkasından silik görünüyor. Çekimlerde yalnız çekim sırasında eklenen CSS ile opak yapıldı; site koduna dokunulmadı.
- Mobil sitede yapışkan başlık (.masthead) ekranın en üstüne yapışıyor ve safe-area-inset-top boşluğu bırakmıyor. Çentikli ya da dynamic island'lı gerçek bir iPhone'da standalone/tam ekran kipinde marka adı island'ın altında kalabilir. Videoda bunu yalnız çekim tarafında boşluk enjekte ederek çözdüm.

## Beyin ↔ Yapay Zekâ (`/beyin-ve-yapay-zeka/`)

- Genel Bakış'taki sayılar veriyle uyuşmuyor. Sitede 20 doğrudan tarihsel ilham, 14 paralel keşif ve alan dağılımı 32/7/6/3 yazıyor. DATA'da ise sırasıyla 19, 17 ve 35 Nörobilim / 6 Bilişsel Psikoloji / 7 Matematik / 2 Dilbilim var.
- Hero'da '120 yıllık tarih' yazıyor, oysa veri 1861 ile 2022 arasını (161 yıl) kapsıyor. 'Ort. gecikme 33' değeri hesapla 33,96 çıkıyor. Videoda bu sayılar kullanılmadı.
- Bazı kayıtlarda gec alanı yıl farkıyla tutmuyor. Örneğin #10'da 2015 − 1998 = 17 ama gec 27 yazıyor. Videoda gecikme sayısı kullanılmadı.
- Mobilde üst menü bağlantıları yatay kayıyor ve sağdan kesik görünüyor ('Aileler' yerine 'Ail'). Çekimlerde .nav-links gizlendi.
- Mobilde SVG diyagramlar (Nöron, Dikkat, Dopamin) 390 px genişlikte okunamayacak kadar küçük kalıyor.
- Masaüstü kronolojide sola-sağa dizilen kartlar ile noktalar hizasız. Sayfa çok boş görünüyor, kartlar arasında büyük boşluklar var.
- Sağ alttaki kayan 'Keşif Puanı' rozeti içeriğin üstüne biniyor. Çekimlerde gizlendi.
- beyin-ve-yapay-zeka: üst menü (.nav) yarı saydam (rgba .92 ve blur), arkasından kayan metin soluk biçimde sızıyor. Çekimde CSS ile opak yapıldı; sitede değiştirilmedi.
- beyin-ve-yapay-zeka: hero sayacı '120 Yıllık Tarih' diyor, ama veri 1861'den 2022'ye uzanıyor (161 yıl). Sitenin kendi içinde küçük bir tutarsızlık; videoda sitenin ifadesi kullanıldı ve yıl aralığı verilmedi.
- beyin-ve-yapay-zeka (mobil): .nav-links yatay kayıyor ve sağdan kesik görünüyor. Çekimde gizlendi.
- The beyin-ve-yapay-zeka hero's '120 Yıllık Tarih' counter and the .hero-sub text '120 yıllık …' don't match the data: the span is 1861–2022, which is 161 years. Not fixed.
- m-kesif: the search box placeholder text is cut off ('dopar') because the site's box is too narrow on mobile. Not fixed.
- index.html:429 .hero-sub says '120 yıllık', index.html:432 counter shows '120 Yıllık Tarih', and index.html:782 timeline description says '120 yıllık'; the data spans 1861→2022 (161 years).
- index.html:434 hero counter 'Ort. Gecikme (Yıl) 33': the true average of gec over DATA is 33.96 (rounds to 34).
- Neural network canvas (#neuralCanvas, index.html:47 and :1458): a canvas with position:absolute; inset:0 keeps its default 300×150 size, so offsetWidth/offsetHeight are 300×150 and the animation only draws in the hero's top-left corner instead of across the full hero.
- Desktop .nav: in d-kesif-acik, visibility:hidden on .nav hid the logo but the menu links stayed visible; display:none was used instead in capture.

## Beyit Defteri (`/beyitdefteri/`)

- Önemli bir site hatası görülmedi. Çekim sırasında yükleme hatası, yatay taşma ya da boş durum çıkmadı.
- projeler.json açıklaması 'elli gazel' derken doğru; ama defterin geneli 90 şiir ve sürüm, 460 beyit. Karttaki açıklama bu toplamları vermiyor (eskimiş değil, sadece eksik).

## Beylikten Cihana (`/beylikten-cihana/`)

- İmar paneli (Şehirlerin ve tapuların → İmar) bir yapı kurulduktan sonra bütün 'X yap / Yapı sat' düğmelerini devre dışı ('Şu an yapılamaz') çiziyor. Sebep: sahnele() içindeki yenileyicileriCalistir(), eylemGonder() O.mesgul=false yapmadan önce çalışıyor; ciz() de mesgul iken g=[] alıyor. Kullanıcı aynı elde ikinci imarı yapmak için sekmeye dokunmak ya da paneli kapatıp açmak zorunda kalıyor (index.html: mulkYonetimi/ciz, eylemGonder, sahnele). Çekimde sekmeye dokunarak aşıldı, kod değiştirilmedi.
- Kapak alt yazısı 'Dokuz padişahın izinde' ve baskı sayfasındaki '9 padişah seti' ifadesi, oyunun kendi verisiyle çelişiyor: S1 notunda 'Ertuğrul Gazi padişah sayılmaz' yazıyor. projeler.json açıklamasındaki 'Söğüt'ten İstanbul'a dokuz padişah' de eskimiş; oyun Haremeyn/Basra'ya kadar gidiyor. Videoda 'dokuz padişah' iddiası kullanılmadı.
- 'Bilgi ile Fethet' düğmesi '%25 indirim' diyor, ama Bursa'da 1.300 → 1.000 gerçekte yaklaşık %23 (50'nin katına yuvarlama yüzünden). Küçük bir tutarsızlık.
- beylikten-cihana/icerik.js ve oyun.js eski v1 dosyaları. index.html bunları yüklemiyor (veri ve motor index.html'e gömülü), klasörde kullanılmadan duruyorlar.

## Çıraktan Pîre (`/ciraktan-pire/`)

- turuBitir içindeki günlük iletisi "Tur limiti doldu! En zengin medeniyet kazanır." Beylikten Cihana'dan kalmış; bu oyunda 'esnaf' olmalı.
- imarYap uyarısı "İmar koşulu sağlanmadı." eski 'imar' terimini kullanıyor; oyun bu kavrama 'rütbe' diyor.
- Koltuk Sen ↔ Bot düğmesi, adı varsayılan 'Sen' olan koltuk insana geçince deftere "Sen artık Sen." yazıyor; tuhaf okunuyor.
- Telefonda Rütbe penceresinde .imar-row satırları kırılıyor: dükkân adı sağa kayıyor, düğme alt satıra iniyor (yatay taşma yok ama dağınık görünüyor).
- Kare verisindeki grupKey değerleri ('kurulus', 'samcezire' …) OYUN_VERISI.gruplar anahtarlarıyla ('gida', 'maden' …) uyuşmuyor; görünür bir sonucu yok, iç tutarsızlık.
- Telefonda iniş (dükkân) kartı ekrana sığmıyor; 'Dükkân Aç / Bilgiyle Aç / Vazgeç' düğmeleri ancak kart içinde aşağı kaydırınca görünüyor. Çekimde kart sonuna kaydırıldı.
- projeler.js açıklamasındaki '7. sınıf müfredatına uygun' iddiası kaynakta doğrulanamadı (yalnız bir Yol Kartında 'Ahiliği okulda 7. sınıf sosyal bilgiler dersinde öğrenirsin' geçiyor); videoda kullanılmadı.

## Davet Mektubu (`https://davetmektubu.com/`)

- generateCanvas() (square share image): in the bottom strip, 'davetmektubu.com' overlaps '→ Bu soruyu sor'. The width is measured with ctx.measureText('davetmektubu.com') after the font has already been switched to 22px, while the URL was drawn at bold 32px, so urlW comes out too small. This happens in every browser.
- Story (9:16) share format is broken: switchFormat('story') shows a preview whose body text is cut off after two lines ('…hayata izin veren dar'). generateStoryCanvas and several other functions (getFavs, toggleFav, isFav, handleSearch, mektupLinkKopyala) are defined twice, and the second definition overrides the first.
- Reading time on the letter list (renderListe) always shows '~1 dk okuma': the template literal uses split(/\\s+/), which splits on a literal backslash-s. The letter page shows the correct time, e.g. ~2 dk · 471 kelime.
- The hero counter says '27 meslek', but the data has 28 distinct professions ('Bilim İnsanı' exists only for agnostik). The 27 matches the per-position count for ateist and deist only.
- The position-card icons (⚛ ✦ ∿) on the home page and the nav logo ✉ inherit the button's default color and render nearly black on the dark theme, so they are almost invisible.
- The share window's format tabs (Kare/Story) look unstyled, like a checkbox. On mobile the 3-column position cards are cramped and their descriptions wrap word by word ('Madde her / şeyi / açıklar mı?').
- Letter images load from davetmektubu.com/wp-content (external domain). If that domain fails they show as broken images with alt text.
- The bottom strip of the share image generated by generateCanvas() shows 'davetmektubu.com' and '→ Bu soruyu sor' on top of each other. This is visible in the 'Soruyu Paylaş' preview on both desktop and mobile. The video avoids it by making the preview box 5:4 so the strip stays outside the box; the site still needs to fix it.
- The profession list says '~1 dk okuma' on every card (Fizikçi included), but the Fizikçi letter page says '~2 dk · 471 kelime'. The reading-time calculations disagree.
- projeler.json and the home page / og:description say '27 meslek', but the source has 28 different professions (agnostik adds 'Bilim İnsanı'). The video does not give a profession count, so it is not affected.
- On the desktop share window (d-paylas), the modal box runs past the bottom of the 900px viewport, so the bottom edge is cut off. The video is not affected.

## Diyardan Diyara (`/diyardan-diyara/`)

- Yürüyüş paneli (1440×900 masaüstü ve 390×844 mobil): hedef seçilince açılan hedef bilgi kutusu (şehir görseli, ad, CP) yapışkan 'X'e yürü / Yerinde kal' düğmelerinin altında kalıyor; kaydırmadan görünmüyor. Çekimde #eylem-ic en alta kaydırılarak çözüldü.
- Mobil, 1. devir yürüyüş başı: alt şeritteki 'Açık hedef' çipleri sağdan kesik görünüyor ('Yenişehir (' gibi). Kaydırma ya da solma işareti yok.
- Masaüstü 1440×900, 9. devir: Eylem panelinde 'Bu devirde açık' listesi 8 şehirle üç satıra çıkıyor ve üçüncü satır (Şam, Gazze, Kahire) 'Kartı onayla' düğmesinin üstünde yarım kalıyor.
- Mobil 'El' sekmesi: elde 3 Eser kartı varken üçüncü kart sağdan kesik (yatay kaydırmalı şerit). Bu yüzden m-tahta çekimi 'Puan' sekmesiyle alındı.
- Olası tutarsızlık: baski/index.html '157 kart' diyor, oyun verisinde ise sayilar.kartToplam = 145 (12 devir + 36 yol + 59 berat + 32 eser + 6 yardım). Matbaa setindeki ek kartlardan kaynaklanıyor olabilir; doğrulanmalı.
- Süre bilgisi farklı: açılışta '4 kişide 40–65 dakika', baskı sayfasında '30–60 dk' yazıyor. Videoda süre kullanılmadı.

## Doğru Taraf (`/dogru-taraf/`)

- Zor-level question pools are very small in some categories (content.js): Temizlik ve Abdest Zor has 1 question, Namaz 3, Hac ve Kurban 4, İmanın Esasları 5, Kur'an 5. In those categories a Serbest Zor round is only 1–5 cards. Not fixed.
- Serbest/Kolay is 10 cards in every category, but in Hac ve Kurban Kolay the pool is exactly 10, so every round asks the same 10 questions (only the order changes). Not fixed.
- Minor mismatch: the site favicon is 🕌 while projeler.json uses 🕋 for the emoji. Not fixed.
- In the mobile drag shot the side label at the card edge (etiket-sol/sag) leaves the screen as the card moves, because of how the card is placed. This is not a visual bug: the label sits at the card edge and goes off-screen as the card shifts. The ghost text in the blank stays visible.
- Seviye Seç ekranında (mobil) içerik yalnız üst yarıyı kaplıyor, alt yarı boş lacivert kalıyor. Sitenin gerçek yerleşimi bu; hafif zoom ile biraz dengelendi ama tamamen giderilemedi.
- Kart sürüklenirken sitenin yön etiketi ('vaciptir') kartın 'HAC VE KURBAN' kategori etiketinin üstüne biniyor. Sitenin gerçek davranışı, kabul edildi.
- Render sırasında konsolda tek bir 404 (kaynak yüklenemedi) hatası görünüyor; karelerde görünür bir etkisi yok.
- Sürükleme damgası (.etiket-sol) kartın sol üstünde, kategori etiketiyle aynı yerde duruyor (left:10px, top:14px). Sola sürüklemede iki öğe her zaman üst üste biniyor. Çekimde doğru şık sağdayken sağa sürüklenerek bu durumdan kaçınıldı.

## Özbekistan Evliyaları ve Âlimleri (`/evliyalar/`)

- Koyu tema (sitenin varsayılanı) okunmuyor: panel kartlarındaki isimler, pencere başlığı, zaman çizelgesi isimleri ve bölüm başlıkları --primary #1a4a5e renginde, koyu zemin üstünde. Bu yüzden çekimlerde sitenin kendi açık teması kullanıldı.
- Zaman Çizelgesi: yuvarlak .century-dot, .century-label yazısının üstüne biniyor ('7. yy' → '7. y●'). Hem masaüstünde hem mobilde var; bu yüzden zaman çizelgesi videoda kullanılmadı.
- Haritadaki 'Diğer' (9 kişi) işareti Özbekistan'ın ortasında gerçek olmayan bir noktada (40.5, 66) duruyor ve Semerkant işaretiyle kısmen üst üste biniyor.
- Arama kutusu yazarken veya büyük/küçük harf duyarlı aramada şapkaya bakıyor: 'Buhar' yazan kullanıcı 'Buhârî'yi bulamaz (eşleşme name.includes(q)).
- Şehir panelindeki kartların simgesi isimlerin ilk harfi olduğundan Buhara listesinde hepsi 'A' görünüyor (Abdülhâlık, Alâeddîn, Ali…).
- Masaüstünde şehir paneli açılınca harita 8. yakınlığa uçuyor; o yakınlıkta karo ayrıntısı az, harita boş görünüyor.
- Hero rozeti 'Istanbul İslami İlimler Akademisi' noktasız I ile yazılmış; altbilgide ise 'İstanbul'.
- Kusem b. Abbâs'ın sınıfı 'sahabe', ama metnin geri kalanıyla tutarlı yazım 'sahâbe' olabilir (küçük imla notu).
- evliyalar/css/style.css @media (max-width:768px): '.search-box input:focus { width:180px }'. 390px genişlikte arama kutusu odaklanınca başlık sığmıyor ve ☰ menü düğmesi ekranın dışına itiliyor (mobil yatay taşma). Çekimde kutudan odak kaldırılarak taşmasız durum kullanıldı; site kodu değiştirilmedi.
- evliyalar/js/app.js initSilsile(): 12 düğümlük Nakşibendî zinciri Kâdı Muhammed Zâhid'den doğrudan Hâce Muhammed İmkenegî'ye geçiyor. Oysa scholars.json'daki İmkenegî biyografisine göre aradaki halka babası Derviş Muhammed ve bu isim zincirde yok. Videoda sayı verilmedi.
- Mobilde arama sonuç listesi kutu genişliğinde (140px) kalıyor; 'Behâeddîn Buhârî (Şâh-ı Nakşibend)' adı üç satıra bölünüyor (kozmetik).
- evliyalar/index.html'de favicon bağlantısı yok; tarayıcı kökteki /favicon.ico'ya düşüyor. Çekimlere etkisi yok.
- 390 px genişlikte odaktaki arama kutusu genişleyip ☰ düğmesini ekran dışına itiyor (önceki turda görüldü). Çekimde sorgu yazıldıktan sonra odak bırakılarak taşma önlendi.

## Hızlı Hafız (`/hizli-hafiz/`)

- hizli-hafiz/index.html: Tek kişi kipinde sabit ipucu panelinin (.ipucu) 'BİLGİ KARTI' etiketi (.et, top:-11px) yarıdan kesiliyor. Sebep: panelde overflow:auto var. Çekimde .ipucu için overflow:visible enjekte edildi.
- hizli-hafiz/index.html: 'Aferin' ve 'N. Oyuncu ✓' pencerelerindeki 'Devam' düğmesi sola yaslı kalıyor, pencerenin sağı boş görünüyor. Sebep: <button> display:flex olduğu hâlde tam genişliğe yayılmıyor, .modal içinde ortalanmıyor. Çekimde '.modal .btn{margin:auto}' ile ortalandı.
- hizli-hafiz/index.html: Sayfa koyu temada (colorScheme dark) da krem renkli açılıyor; hata değil, bilgi notu.
- hizli-hafiz/yazdir.html (basılabilir deste) sitede hiçbir yerden bağlantı almıyor; bu yüzden videoda gösterilmedi.
- data/projeler.js açıklamasındaki '72 âyet kaynaklı bilgi kartı' ifadesi tam doğru değil: 72 bilgi kartından 59'unda âyet kaynağı var.

## İngilizce Kelime Kartları (`/ingilizce-kelime/`)

- Sayı tutarsızlığı: index.html meta/og/twitter açıklamaları ve data/projeler.js '238 kelime kartı' diyor, oysa veri.js 237 kart içeriyor (sayfanın kendi sayacı da 237 gösteriyor). Benzersiz kelime sayısı 236, çünkü 'Water' hem Ev hem Yiyecek & İçecek kategorisinde var.
- veri.js'te 'Baby' kartının (İnsanlar) 'ses' alanı yok: bu kartta ses düğmesi çıkmıyor ve akışta ses çalmıyor. sounds/ klasöründe Baby.wav da bulunmuyor.
- Mobilde global #rauf-nav ('Ana Sayfa' + tema düğmesi), başlıktaki 'LAB'A DÖN' bağlantısının üstüne biniyor. Tam ekran Keşfet akışında da sayaç ve kapatma düğmesinin yanında görünür kalıyor. Çekimlerde gizlendi.
- Tam ekran akışta .feed-counter (top:16px) ve .feed-close (top:14px) safe-area-inset kullanmıyor; viewport-fit=cover açıkken çentikli ya da Dynamic Island'lı iPhone'larda '1 / 237' sayacı adanın altında kalır.
- lib/kelime-app/app.js'teki kategori içi ızgara kodu (currentKategori !== null dalı) hiç çalışmıyor; kategori kartına dokununca doğrudan akış açılıyor. Ölü kod, kullanıcıya etkisi yok.
- projeler.json and the index.html meta description say 238 cards; the real data has 237 (236 unique words, because Water appears in both Ev and Yiyecek & İçecek). The 'Baby' card has no sound field, so 236 cards have sound.

## İslam Bilim Yıldızları (`/islam-bilim-yildizlari/`)

- index.html + js/shared.js animateCounters(): parseInt('7-19') gives 7, so the hero 'YÜZYIL' card shows '7' (subtitle says '13 yüzyıl'). In the capture the text was set to '7–19' afterwards; the site code is unchanged.
- alimler.html: heading 'Kesfet' (should be Keşfet) and '126 Islam bilginini filtrele, ara ve tani' are missing Turkish characters; the harita.html subtitle has 'Alimlerin' without the circumflex.
- Duplicate filter chips from inconsistent data: Astronomi/astronomi, Matematik/matematik, Tıp/tıp (inconsistent upper/lower case in bilginler.js alanlar).
- Mobile (≤700px): .site-nav is meant to be position:fixed; bottom:0, but .site-header's backdrop-filter becomes its containing block, so the tab bar shows at the top of the page instead of the bottom.
- alim.html on mobile: hook box, summary and works text overflow to the right (horizontal overflow); for this reason the m-alim shot was not used.
- alim.html: the 'İlk Adım — 10 XP' achievement toast covers page content on first visit.
- Map: region chips (bolgeler.js: Irak/Bağdat 39, Endülüs 29) do not match the cluster numbers built from map coordinates (Bağdat ~23, Endülüs 22), which can confuse users.
- bilginler.js id 26 (Cezerî): donem '13. yy' ve ipuclari[0] '13. yy döneminde yaşayan', oysa dogum 1136 ve vefat 1206; hayatı neredeyse tamamen 12. yüzyılda geçiyor. alanlar ['astronomi','tarih','mekanik'] de şüpheli (alanBirincil 'astronomi'; Cezerî mühendis/mucit olarak biliniyor). Ayrıca katkilar[0] 'Krank-biyel mekanizmasını icat etti' diyor; daha önceki krank-biyel sistemleri bilindiği için (ör. Roma dönemi Hierapolis bıçkı değirmeni) bu ifade tartışmalı. ozet, hook ve ipucu 'ilk kullanan' diyor. Site sahibine iletilmeli.
- index.html hero sayacı data-count='7-19' parseInt yüzünden '7' gösteriyor (capture.mjs çekimde metni '7–19' yapıyor; önceki turdan bilinen sorun).

## İyilik Akademi (`/iyilikakademi/`)

- Ana sayfa hero'sundaki "Hemen Başla →" düğmesinin yazısı okunmuyor: düğmenin '!bg-white !text-primary-dark' sınıfları işlemiyor ve kırmızı zemin üstünde koyu kırmızı yazı kalıyor. Hem açık hem koyu temada, masaüstünde ve mobilde aynı. Bu yüzden hero çekimi kullanılmadı.
- Koyu temada ana sayfa sayaç kartındaki sayılar (40+, 240+, 8) koyu zeminde neredeyse görünmüyor. Meydan Okuma soru kartındaki ders etiketi de çok soluk.
- Bazı yazılar Türkçe karakter kullanmıyor: "Hiz Yarisi", "10 soruyu en hizli sekilde yanitla!", "zaman siniri", "kazansin", "Cik", "Dogru", "Eglenceye Donusturuyoruz", "oncesinde/sonrasinda bilgiyi olcen, aninda", "Video Ici Sorular", "DERS KUTUPHANESI". "Hiz Yarisi" ve "Cik/Dogru" videodaki çekimlerde görünüyor.
- 240 quiz sorusunun hepsinde doğru cevap ilk şık (correct:0) ve şıklar karıştırılmıyor; doğru cevap hep A.
- Mobilde "Ana Ekrana Ekle" (PWA) penceresi sayfa içeriğinin üstünü kapatıyor. Çekimlerde sessionStorage 'pwa-dismissed' ile kapatıldı.
- Ana sayfadaki "8 Rozet" sayacı ders içeriğiyle çelişiyor gibi: ders verisinde 38 ayrı kazanilanRozet var. Videoda bu sayı kullanılmadı.
- Ders 10 (Tevekkül – Devamı) için zengin içerik (sh nesnesi: kavramlar, interaktif duraklamalar, haftanın görevi) yok; 40 dersin 39'unda var.
- Sıralama sayfası çevrimdışı ortamda boş durumda ("Henüz kimse yok"); Firebase bağlantısıyla ilgili, kullanılmadı.
- Missing Turkish characters in the interface: 'Hiz Yarisi', '10 soruyu en hizli sekilde yanitla!', 'zaman siniri', 'kazansin', 'Cik', 'Dogru', the daily theme 'Sabir ve Sükür', and on the home page 'Öğrenmeyi Eglenceye Donusturuyoruz' and 'oncesinde… olcen, aninda… ogrenmeyi pekistirin' (assets/index-89OofQM9.js). They cannot be fixed in the video; the 'Özellikler' heading was kept out of frame.
- All 240 questions have correct:0, so the right answer is always option A. Meydan Okuma shuffles the question order but not the options (qd() is applied only to the question list).
- On the home page the 'Hemen Başla' button's '!bg-white' class does not override the 'bg-gradient-to-r' background-image, so dark-red text sits on a red background and is nearly unreadable. capture.mjs adds '.\!bg-white{background-image:none}' to restore the white background the class intends; the site itself should be fixed.
- .glass (sticky top bar) has only -webkit-backdrop-filter and no unprefixed backdrop-filter. In Chromium/Firefox the content behind the bar shows through unblurred (only Safari blurs it). capture.mjs adds 'backdrop-filter:blur(20px)' to match the iPhone look.
- The desktop side menu is 'lg:static', so it scrolls away with the page and leaves an empty white column on the left. For this reason the desktop home page shot is taken at the top of the page.
- Dark theme: the home page counters cannot be read (noted in the previous round), so the shots use the light theme.

## Kalbinin Haritası (`/kalbinin-haritasi/`)

- Test results are saved to history only when the /api/gemini stream finishes successfully. If the AI call fails (offline or API error), the result is never written to localStorage: 'Ahlak Haritam' stays empty, the start screen gets no ✓, and later retakes have no 'Önceki' comparison (fetchGemini catch path, index.html ~line 1044).
- The options in all 185 questions always appear in puan 5→4→3→2→1 order, so the balanced (fazilet) answer is always the 3rd option. Nothing shuffles them, which makes the test predictable and biases the answers.
- On mobile, the fixed 👤 (auth) and ☀️ (theme) buttons in the top-right overlap the 'Ahlak Pusulası' heading on the start screen, the quiz progress bar and the top edge of the result card. They were hidden for the shots.
- With the AI offline, the result screen shows 'Bir hata oluştu. Lütfen tekrar deneyin.' in red about 2.2 s after the result, and the 'PDF İndir' button stays disabled.
- On mobile, the 'Önceki: ↑ %47' line under the result bars wraps onto two lines (cosmetic).
- The static fallback content (loading state, noscript, SEO) has no Turkish characters: 'Kalbinin Haritasi', 'Ahlak Pusulasi', 'farkli ahlak testinde kendini tani…', 'Uygulama yukleniyor...'.
- Typo in the about screen text: 'Geçen ayki halimle bugünem arasında' (should be 'bugünüm'), index.html line 688.
- The projeler.json description says 'Yapay zeka destekli nefs muhasebesi', but the AI is an optional layer; the core value is deterministic scoring (the site itself says this).
- Sağ üstteki sabit #auth-btn (👤) ve #theme-toggle (☀️) düğmeleri mobilde başlıkların ve ilerleme çubuğunun üstüne biniyor. Çekimlerde CSS ile gizlendi.
- Sonuç geçmişe yalnız /api/gemini akışı başarıyla bitince kaydediliyor. Yapay zekâ çevrimdışıyken çözülen test 'Ahlak Haritam'a işlenmiyor. Çekimde /api/gemini boş bir akışla ('data: [DONE]') yanıtlanarak sitenin kendi kayıt yolu çalıştırıldı; hiçbir yapay zekâ metni gösterilmedi.

## Kayı I — Ertuğrul'un Ocağı (`/kayi/`)

- Mobilde (390px) sayfa yatay taşıyor: documentElement.scrollWidth = 595px. Kaynağı #dynastyTree soy ağacı; Alaaddin Paşa ve Murad-ı Hüdâvendigâr düğümleri ekrandan kesiliyor. Bu taşma yüzünden innerWidth/innerHeight da şişiyor.
- Mobilde ayrıntı pencereleri (.modal; padişah ve kişi) sağdan kesiliyor, metin yarım kalıyor. .modal için width:100% ile margin:1rem birlikte kullanılmış ve taşma da sürüyor; bu yüzden mobil videoda pencere gösterilmedi.
- Mobil haritada 'Sefer Modu', 'Seferi Bitir' ve 'Devam' düğmeleri ile hız denetimleri 'Memâlik-i Osmâniyye' kartuşunun üstüne biniyor.
- Sayfadaki bazı sayılar veriyle uyuşmuyor: 'Bölüm Bölüm Keşfet' 88 bölüm diyor, SECTIONS 84 kayıt; Bibliyografya 70 kaynak diyor, BIBLIOGRAPHY 22 kayıt; Dizin 1176 madde diyor, arama dizini yalnız kişi, mekân, kavram ve yaklaşık 50 ek maddeden oluşuyor. Bu sayılar videoda kullanılmadı.
- Mobilde hamburger menü düğmesi üst çubukta görünmüyor; muhtemelen yatay taşmadan kaynaklanıyor.
- Atlas sayfası (/kayi/atlas/) ana sayfadan hiçbir yerde bağlanmamış; videoda kullanılmadı.
- Mobilde (390px) harita üstündeki kontroller üst üste biniyor: '⚔ Sefer Modu', '✖ Seferi Bitir', '▶ Devam/Duraklat' ve 'Hız' düğmeleri 'MEMÂLİK-İ OSMÂNİYYE' kartuşunun üstüne biniyor (.map-cartouche ile .campaign-controls, ikisi de z-index 1000 ve mutlak konumlu). Çekimde kartuş gizlenip sayfa kaydırılarak çözüldü, site kodu değiştirilmedi.
- Sefer Modu kartı (#campaignCard) haritanın lejantının (.map-legend) üstüne biniyor; lejant kartın altından taşıp görünüyor. Çekimde lejant gizlendi.
- Leaflet zoom düğmeleri ve harita çerçevesi z-index olarak sabit üst çubuğun (.nav, z-index 1000) üstünde kalıyor. Sayfa kaydırılınca üst çubuğun üzerinde görünüyorlar.
- Mobilde Padişah ayrıntı penceresi yatay taşıyor (önceki turdan; mobilde uzun kaydırma çekimi kullanıldı).
- Render raporunda iki biçimde de 1 adet 404 konsol hatası var (büyük olasılıkla favicon ya da /_vercel/insights betiği). Hiçbir karede kırık görsel yok.

## Kelime Aileleri (`/kelime-aileleri/`)

- After a correct answer in Gizli Bağ (and the other quiz games), the 'Puan' badge at the top stays 0 until the next question, even though XP updates right away. In motor.js soruAkisi() the header is drawn only once per question.
- On the answer screen of the quiz games, the correct option also gets the .pasif class (opacity .55), so the green 'doğru' highlight looks faded.

## Program Rehberim (`/maarif/#/rehber`)

- rehber.js arayüz metinlerinde Türkçe karakter yok: 'Ogretmen El Kitabi', 'Ders Secin', '10. Sinif', 'unite', 'Ac →', 'DERS ONCESI', 'GIRIS / ISINMA', 'Ogrenme Ciktilari', 'Hizli Erisim', 'Teknikler Kutuphanesi' vb. Bu metinler videodaki ekranlarda da böyle görünüyor.
- getCurrentWeek() için üst sınır yok: 2025-26 dönemi dışında (ör. bugün, Ekim 2026) pano 'Bu Hafta (53. Hafta)' gösteriyor ve içerik olarak sessizce 1. haftaya dönüyor (weeks.find bulamayınca weeks[0]). Çekimde saat sabitlenerek aşıldı.
- findTeknik() tekniği bütün derslerin kütüphanesinde, veri yüklenme sırasına göre arıyor (Promise.all, Object.entries ekleme sırası ağ zamanlamasına bağlı). Bu yüzden Fıkıh ders akışında teknik penceresi bazen TDB kaydını açıyor ('Kullanildigi Ciktilar: TDB.9.3.2'). capture.mjs, Fıkıh kaydı gelene kadar sayfayı yeniden yüklüyor.
- FKH.10.3.1 ders akışındaki ilk teknik 'soru cevap tekniği' kütüphanede eşleşmiyor; karta tıklayınca hiçbir şey olmuyor (pencere açılmıyor), ama kartta 'Detayli bilgi icin tiklayin' yazıyor.
- Veri tutarsızlığı: 13. hafta detayında kitap 'Sayfa 74-78', aynı çıktının ders akışında 'Kitap s.76-87' yazıyor.
- Materyal başlıkları cümle ortasında kesik ('Görsel 3.1 - İslam'da farz kılınan', 'Grafik Bilgi 1.3 - Fıkıh usulünün', 'Görsel 1.1 - İstihdam sağladığı için'); açıklamalar da bunları 'başlıklı görsel' diye tekrarlıyor.
- Mobilde materyal filtre sekme şeridi yatay kaydırmalı ve kenarlardan kesik görünüyor ('tablo (7'). Mobil çekimde bu şerit kadraja alınmadı.
- projeler.js açıklamasındaki '202 materyal' yalnız Fıkıh'ın sayısı; dört dersin toplamı 627.
- Turkish characters are missing in the site's own UI (ASCII): 'Ogretmen El Kitabi … ders akislari … olcme araclari', 'Ders Secin', 'Fikih', '10. Sinif', 'unite', 'Imam', 'Ac →', 'Teknikler Kutuphanesi', 'farkli teknik, toplam 40 kullanim', 'Nasil Uygulanir', 'Kullanildigi Yerler', 'GIRIS / ISINMA', 'OGRETIM', 'Surec Bilesenleri', 'Ders Kitabi', 'PDF Indir', 'Tumu', 'Tiklayin, ilgili kitap sayfasi acilsin' (maarif/js/app.js:138, maarif/js/rehber.js COURSES and render functions). Recommendation: fix the site text first, then re-run capture.mjs to reshoot.
- Technique names in the library are lowercase, and techniques with a different spelling (e.g. 'çıkış kartı', 'soru cevap tekniği', 'beyin fırtınası tekniği') do not match their library entry, so their duration and description are not shown (renderTeknikler libEntry exact-match lookup).
- findTeknik() searches every course's library in data-load order, so the technique popup can sometimes open another course's record.
- 'Bu Hafta' is computed from the date: outside the term it shows meaningless values such as '53. Hafta' (the capture pins the clock to 9 Dec 2025).
- raufenc.com/maarif goes to the Maarif Modeli platform home page; the guide is one click further (/maarif/#/rehber).

## Dokuz Tip Mizaç Testi (`/mizac/`)

- Mobile start screen (≤620px): the 9 type-chip dots are squashed into left-aligned ellipses. .type-chip is 28px wide with padding 2px, and it keeps gap:6px plus a text node whose font-size is 0 (style.css lines 385–387), so the 24px .dot shrinks to about 22×24. This appears in m-giris.jpg as it is (not fixed in the capture).
- Mobile: the test screen shows the keyboard tip 'İpucu: 1–5 tuşlarıyla da cevaplayabilirsin', which means nothing on a touch screen.
- The desktop map legend's 'Kanatlar' entry is meant to be an outlined box but appears as a thin colored bar because the i element is 3px tall.
- Mobilde (dokunmatik cihazda) soru ekranında 'İpucu: 1–5 tuşlarıyla da cevaplayabilirsin' klavye ipucu gösteriliyor (mizac/index.html .kbd-hint). Dokunmatik ekranda anlamsız; videoda yalnız mobil çekimde CSS ile gizlendi, site kodu değiştirilmedi.
- Bir kaynaktan dönen 404 konsol hatası tüm projelerde ortak, mizaca özgü değil; görüntüye etkisi yok.

## MUALLİMO — Resim Kartları (`/muallimo/`)

- Card count mismatch: the hero, meta description and data/projeler.js all say 2,199 cards, but the VERİ lists contain 2,197 images. 'Beslenme Kartları' has kart_sayisi 99 but its list has 98, and the reader counter shows '1 / 98' while the header says '99 kart'. 'Karikatürler – 1' has kart_sayisi 100 but its list has 99.
- Mobile horizontal overflow at 390px: once the book grid ('Küçük' view) is open, the header (crumb 'Seri › Kitap' + ← Lab + 🏠 + ← Geri) widens the page to scrollWidth 417–462px. '← Geri' ends up off-screen and 🏠 is cut. Because of this overflow the lightbox image also shifts right and gets clipped. That screen wasn't used on mobile.
- The Okuryazarlık series screen on mobile also overflows by 17px (scrollWidth 407), so the mobile shots use the Sağlık series instead.
- Cramped mobile header on series screens: the '← Geri' button wraps onto two lines (arrow above 'Geri') and long series names such as 'Fen Bilimleri' wrap in the crumb.
- When a series is opened from a scrolled home page, the page does not scroll back to the top: on mobile the series screen opened at scrollY=173. The shots were taken after window.scrollTo(0,0).
- nav.js loads in <head>, before document.body exists, so the body's data-nav-skip='true' check does nothing. The #rauf-nav ('Ana Sayfa' + theme toggle) is injected and sits on top of the MUALLİMO logo (hidden in the shots).
- Content note: the Berilyum (Be) card in Kimya Elementleri has a typo, 'onrez zehirlidir', which should read 'ancak/oldukça zehirlidir'. The card wasn't used in the video.

## 4-7-8 Nefes Egzersizi (`/nefes/`)

- /nefes/index.html: HTML'deki done-overlay süre yer tutucusu '1:16'. Gerçek seansta 3 sn'lik hazırlık süreye ekleniyor ve 4 döngüde '1:19–1:20' görünüyor. Bu bir hata değil, yalnız yer tutucu yanıltıcı.
- nefes/index.html, mobile: while the orb grows during inhale and hold, the rotated petal layer (.petals inset -12%, translate/rotate) pushes the page wider than the viewport. On a 390 px mobile view the layout width grows to about 420 css px (scrollWidth 420), and the fixed .sheet-backdrop and #done-overlay stretch with it, so the page zooms out slightly. body{overflow-x:hidden} does not stop it. The capture uses '.hero{overflow-x:clip}' as a workaround, but the site needs a real fix (for example overflow-x:clip on .hero or on html).
- nefes/index.html: the phase loop catches the end of a phase only on the next frame and resets phaseStart to performance.now() in beginPhase. The delay adds up over the 13 transitions, so on a slow device the session can show 1:20–1:21 instead of 1:19 (seen in headless runs with sound and heavy visuals on).
- The vibration row (#row-haptics) is hidden in browsers without navigator.vibrate, such as iOS Safari. The mobile capture hides it to match iOS, and the video no longer claims vibration.
- nefes/index.html .petals: on mobile, while the petal ring grows during a phase, the page width stretches to about 420 css px and causes horizontal overflow. capture.mjs hides this with .hero{overflow-x:clip}; the site itself needs a fix (e.g. overflow:hidden/clip on .hero or the stage).

## NöroTerbiye (`/noroterbiye/`)

- Mobile homepage hero (≤640px): the .nt-stats row (131 Kavram / 16 Test / 13 Oyun / 19 Araç) is cut off on both sides and cannot be scrolled; the first and last cards are partly invisible. Cause: .nt-hero is a flex column with align-items:center, so the nowrap row gets max-content width, overflow-x:auto never applies, and .nt-hero has overflow:hidden (css/noroterbiye.css @media (max-width:640px) .nt-stats). Because of this the mobile homepage was not used in the video.
- Homepage stat says '19 Araç' and ARACLAR_DATA has 19 records, but only 14 tools have a page and appear in the araclar/index.html slugMap (AP09, AP10, AP12, AP16, AP18 have no page). The video does not state a tool count.
- Mobile homepage wallpaper section: css/wallpaper-entry.css hides <br> with display:none at ≤680px but no space is left, so the heading renders as 'Her bakıştabir hatırlayış.' and the paragraph as 'resimler.Kaydır'.
- Inconsistency: the homepage 'Keşfet' card says 'Kitap Haritası — 5 ana kısım', while kitap-haritasi/index.html says '4 ana kısım'.
- The question counts in data/testler.js are stale: TS01 lists 24 questions, but the page has 12 (and says '12 soru, 3 dakika'); most other test pages have 10 questions against 12–21 listed. These counts are not shown on the site; only the data is wrong.
- Minor: clicking a region in the brain map draws a white rectangular focus outline around the region group (label + dot) via the SVG <g> :focus. The capture removed it with blur.
- noroterbiye/js/test-engine.js:115 shows the result as `${pct}%` ('65%'). In Turkish it should be '%65'. The canvas share card (line 272) already uses the correct '%' + pct form.
- noroterbiye/index.html:126 hero counter shows 'data-count="19"' as '19 Araç', but there are 14 tool folders under noroterbiye/araclar/. The counter should be checked (the video makes no claim about tool count, but the number is visible on screen in the intro).
- On mobile, the counter row in the noroterbiye home hero (131/16/13/19) overflows on both sides (noted in the previous round). That is why the mobile intro uses the test list instead of the home page.
- A 404 resource error appears in the console during the still render (rapor.json consoleErrors). It does not affect the shots.

## Nöroterbiye — Duvar Kâğıtları (`/noroterbiye/duvar-kagitlari/`)

- "Tümü" ızgarası bozuk: wallpapers.js grid() küçük resimlere img.height = 1844 (item.dikey.height) veriyor. Bu öznitelik CSS'teki `.thumb img{aspect-ratio:9/19.5}` kuralını eziyor; her küçük resim yaklaşık 1844 CSS px uzunlukta çıkıyor, görünen alan boş koyu kutulardan ibaret kalıyor (masaüstü ve mobil). Önerilen düzeltme: `.thumb img{height:auto}` ya da height özniteliğini vermemek. Bu yüzden ızgara videoda kullanılmadı.
- Küçük tutarsızlık: "Kitaptaki izi" penceresindeki kaynak satırında "Nöroterbiye" yazıyor, arayüzün geri kalanında "NöroTerbiye".
- The thumbnails in the 'Tümü' grid look empty and stretched to ~1844 px. The height=1844 attribute overrides aspect-ratio (reported in the previous round, not fixed). The grid screen is not used in the video.
- There is a single 404 console error, most likely the favicon. It appears in 29 of the 32 projects, so it is not specific to this project. All images load.

## Osmanlı Padişahları Kart Seti (`/osmanli-kartlari/`)

- Header logo: the markup is 'OSMANLI <span>KARTLARl</span>'. 'KARTLARl' ends in a lowercase L (typo for 'KARTLARI'), and the span does not render at all because the parent's gradient text is transparent and does not carry over to the child, so only 'OSMANLI' is visible.
- Koleksiyon screen (both desktop and mobile): the .kart-wrap width rule min(340px,85vw) overrides the .kol-grid cell size, so the cards overlap and names and dates are cut off. Not used in the video.
- Jeopardy on mobile: the 5-column board falls into 3 columns, so the 'Islahatlar' and 'Lakaplar' headers drop into the second row and the board is misaligned. Not used.
- Kim Bu Sultan? on mobile: the input and 'Cevapla' button row reaches the right edge of the screen (overflow risk). Not used.
- On the mobile header, the '← Geri' button and the rank badge ('Yeniçeri') wrap onto two lines.
- Period mismatch between data and card art: data.js gives Osman Gazi 1299–1326 and Orhan Gazi 1326–1362, but the card images read 1281–1326 and 1326–1360.
- The sultan profile does not show the biliyorMuydun field even though it exists for all 36 sultans in data.js (the .profil-fun CSS exists but is never rendered).

## Osmanlıca Lügat (`/osmanlica/`)

- Data–image mismatch in veri.js (31 records): from MA'LUM to MAZLUM the img fields are shifted by one (MA'LUM→maraz.jpg … MAVNA→mazlum.jpg, MAZLUM→ma_lum.jpg); SEHNAME→sefkat.jpg … SERBET(1)→sepetci.jpg are shifted by one; HAT-I HUMAYUN↔HATTAT and SER'IYYE SICILI↔SERVI are swapped. Example: searching "mazlum" shows the MALÛM card, and searching "maraz" shows the MARAZİ card.
- The ŞEFKAT term is missing from the data even though kitap/sefkat.jpg exists; SERBET appears twice instead. PAYITAHT (2) and SANCAK (3) are also repeated.
- Data words are ASCII-only (SERBET, HUMAYUN, …), so Turkish-letter searches such as "şerbet" or "hümayun" find nothing, and many meanings are missing Turkish letters ("goz acıp", "yeryuzu")
- In the Fihrist bar the Ç, Ö, Ş, Ü and İ buttons are always disabled, because words starting with Ş or Ç (Şehname, Çarık …) are filed under S or C
- The site promises "hat görselleri", but most images are Latin-script miniature-style picture cards rather than Ottoman-script calligraphy (the video does not make the "hat" claim)
- In the desktop Keşfet feed the "Kaydır" hint falls on the bottom edge of the card
- Some card images contain spelling or content errors (e.g. "DOLMABAHÇHE" on dolmabahce.jpg, a computer/ECG screen on kalp.jpg); none of them appear in the video

## Değer Oyunları (`/oyunlar/`)

- Vicdan (mobile, 390px): when the card is dragged, the label that appears on it (e.g. 'Elif çekti derim') runs off the right edge of the screen and gets cut off. It happens because the card fills almost the whole width. I kept the drag in the shot short, so the cut is small.
- Vicdan: right after a choice, the result toast shows on top of an empty card back, which looks unfinished. I did not use this screen in the video.

## Sevgili Peygamberim (`/sevgili-peygamberim/`)

- The closed table-of-contents panel (.toc-panel, translateX(-100%)) still casts its box-shadow (4px 0 20px) onto the left edge of the page, so a grey band shows on the left in light-background sections (hidden with CSS in the captures).
- Mobile (390px): the chapter name in the nav (.nav-ch, e.g. 'MEHAZLAR - KAYNAKLAR') sits on top of the search/A-/A+/theme buttons. On desktop it also shows a wrong chapter name in sections after the book (Kişiler, Quiz) (hidden in the captures).
- Map: at zoom 8 the labels around Medîne (Uhud, Hendek, Benî Kureyzâ, Medîne-i Münevvere) and Bedr / Küçük Bedr overlap and cannot be read. The 'Hayber'in Fethi' battle label also collides with the 'Hayber' place label.
- Map: on the narrow mobile map (380px tall), the Mekke-i Mükerreme place card (4 chapter buttons) slides under the zoom/fullscreen controls. On mobile the right-hand labels are cut off by the edge in the initial view.
- Map popup chapter buttons are cut with substring(0,30), which leaves broken labels like 'KÂİNATIN SULTÂNI PEYGAMBER EFE'.
- book-data.js full_text: footnotes are mixed into the body text (e.g. in 'Kâinatın Sultânı geliyor': '…“sallalla ; Ebû Ya’la, Müsned, I, 107. Tevbe: 9/108.' and 'mescid”134').
- On touch devices :hover stays stuck, so the quiz option at the previous tap position shows a gold frame.
- Mobile map: the Mekke-i Mükerreme place card (4 chapter buttons) opens under the zoom and full-screen buttons and the left part of the card is hidden (shots/m-harita-mekke.jpg). That is why the vertical version uses the Mekke'nin Fethi battle card.
- Mekke'nin Fethi (BATTLES) has exactly the same coordinates as the Mekke star (PLACES), so the battle marker is mostly hidden under the star and is hard to tap on mobile.
- The chapter buttons in the desktop Mekke card are cut off ('KÂİNATIN SULTÂNI PEYGAMBER EFE', 'MEKKE-İ MÜKERREME DEVRİ-DÜNYÂY'). I lowered the zoom so this stands out less.
- The mobile nav bar's 'Sevgili Peygamberim' text sits partly under the phone's camera island at the top edge in the intro. This comes from the site and I did not change it.
- index.html:663 cuts each chapter name on the map place card to 30 characters with substring(0,30), with no ellipsis. The first button on the Mekke-i Mükerreme card reads 'KÂİNATIN SULTÂNI PEYGAMBER EFE' and the second 'MEKKE-İ MÜKERREME DEVRİ-DÜNYÂ'. A cut-off form of address for Hz. Peygamber (s.a.v.) should not appear on the site itself either; truncating at word boundaries or with CSS text-overflow is recommended.
- The Mekke'nin Fethi battle marker (21.43,39.83) sits right under the Mekke-i Mükerreme star (zIndex 800 > 500), so it cannot be clicked. The red edge visible on the right side of the star is actually the Huneyn marker.
- On a narrow screen, tapping the 9-battle cluster flies the map to Medine at zoom 8, where the labels (Hendek, Benî Kureyzâ, Medîne-i Münevvere, Uhud) pile up on top of each other.
- On mobile, with all places shown, the Medîne/Mekke labels get cut off at the right edge of the map for some map positions, and the Mekke card ends up under the zoom and fullscreen buttons.

## Bilim Nedir, Ne Değildir? (`/sunumlar/bilim/`)

- nav.js runs inside <head>, where document.body is still null, so the data-nav-skip check (body[data-nav-skip='true']) never takes effect. The global #rauf-nav ('← Ana Sayfa' + theme button) is injected anyway and sits on top of the presentation's own top bar: on desktop it covers '← lab.raufenc.com / raufenc.com', and on mobile it covers '🔬 Bilim Nedir?' and the '58 / 64' counter. It was hidden with hide() for the shots.
- Image and caption do not match on most slides in Bölüm 3–5 (data-i 24–54). Examples: data-i 24 'Paradigma' shows the 'Kaos mu? Nizâm mı?' image, 26 'Popper ve Yanlışlanabilirlik' shows 'Merkür ve Quine-Duhem', 28 'Hume ve Tümevarım Sorunu' shows 'Paradigma: Bildiğin doğruların mafyası', 46 'Doğrulama Önyargısı' shows the 'Tanrı mı bilim mi? Ama uzaylı olabilir!' image, 53 'Dunning-Kruger' shows 'Natüralizm bir inançtır'. The captions and the TOC appear to be out of step with the images.
- Some slide images have typos or broken lettering: slide-51 'verememessi'; slide-13 'BILIMCILERIN', 'Gercekten başladiysa'; slide-07 'GÖRDÜGÜN'; slide-12 'BAŞLAN(GIÇ'; slide-14 'TEORİ MI' (no question mark). These were not used in the video.
- The Heisenberg quote on slide data-i 62 ('The first gulp from the glass of natural sciences…') is widely regarded as misattributed and has no source; it was not used in the video.
- On mobile the presentation's top bar is cramped: '🔬 Bilim Nedir?' wraps onto two lines (there is no horizontal overflow). The nav link text reads '← lab.raufenc.com' (an old domain).
- sunumlar/bilim: nav.js runs inside <head>, so it cannot see data-nav-skip. #rauf-nav sits on top of the presentation's own top bar; it was hidden during capture (reported in the first round).
- The slide-53 (data-i 59) image has the caption '...der ama içme ya da iç kararını vermez.', which reads a little awkwardly ('iç ya da içme' would be more natural). It is part of the image and was not changed; the zoom does not center on this line.
- The slide-52 image (data-i 57) has a spelling error, 'verememessi', so that slide was not used in the video.

## Safsata Dedektifi (`/sunumlar/safsatalar/`)

- Dedektif seçicisi (#picker-overlay) modal gibi açılmıyor: öğe yalnız inline style='display:none' taşıyor, .picker-overlay sınıfı hiç atanmamış. Bu yüzden konum/karartma/ortalama CSS'i uygulanmıyor; seçici sayfa sonuna, senaryonun altına satır içi düşüyor. Masaüstünde sol kenara yapışık ve görünür alanın dışında kalıyor, kullanıcı ona kaydırmak zorunda. Çözüm: <div id="picker-overlay" class="picker-overlay" ...>.
- Zamanlayıcı yarışı: doğru cevaptan sonra selectFallacy() 2,2 sn'lik bir setTimeout(closePicker + renderGame) kuruyor. Kullanıcı 'Devam →' ile erken kapatıp hemen sonraki ifadeye dokunursa eski zamanlayıcı yeni açılan seçiciyi de kapatıyor. Çekimde bu yüzden kendiliğinden kapanmayı bekledim.
- nav.js <head> içinde çalıştığından document.body henüz yok; body[data-nav-skip='true'] kontrolü işlemiyor ve #rauf-nav (Ana Sayfa + tema düğmesi) yine ekleniyor. Mobilde sekme çubuğunun üstüne biniyor. Çekimde hide() ile gizlendi.
- Keşfet slaytında görsel paneli metin panelinden kısa kaldığı için masaüstünde illüstrasyonun üstünde ve altında geniş siyah bantlar var (object-fit: contain + grid satır yüksekliği). Bu sitenin gerçek görünümü; çekimlerde olduğu gibi bırakıldı.
- Dedektif sayfası kısa olduğu için sekme çubuğu en üste kaydırılamıyor; masaüstü senaryo çekimlerinin üst kenarında kahraman bölümünün düğmeleri görünüyor (yakınlaştırmayla büyük ölçüde kırpıldı).
- sunumlar/safsatalar/index.html: #picker-overlay öğesinde .picker-overlay sınıfı yok. Bu yüzden seçici modal ortada açılmıyor, sayfanın altına sol tarafa satır içi düşüyor. Videoda masaüstü için yalnız modal kırpılarak gösterildi.
- sunumlar/safsatalar/index.html: .picker-modal{max-height:90vh;overflow-y:auto} kuralı yüzünden 844 px yüksekliğindeki telefonda geri bildirim kutusu modalın içinde kalıyor; görmek için modalın içini kaydırmak gerekiyor.
- Doğru cevaptan sonra 'Devam →' ile modal erkenden kapatılıp hemen sonraki ifadeye dokunulursa eski 2,2 sn'lik zamanlayıcı yeni açılan seçiciyi de kapatıyor.
- Konsolda tek bir 404 hatası var, büyük olasılıkla favicon; projeye özgü değil.

## Yol Haritan (`/yol-haritan/`)

- The share card image ('🖼️ Kart Görseli', shareCard in app.js) draws the interest-code line ('AIS · Sanatçı · Araştırmacı · Yardımsever', 800 64px Sora) wider than the 1080 px canvas, so the text is cut off on both sides of the downloaded PNG. The font size should shrink to fit with measureText. That is why this screen is not in the video.
- The section intro screen (showTurnIntro) shows the counter at top right as '0 / 0'. #qCounter is only updated in renderItem, so the first section's intro screen and the screen after 'Teste Başla' show the wrong counter (desktop and mobile). The screen is not in the video.
- On mobile, every new question card enters with qIn translateX(28px). This temporarily makes the layout viewport 398 px instead of 390 (documentElement.scrollWidth = 398; .bg/.stars become 398 px), and it stays that way until the next tap, which can allow a slight sideways scroll. The screenshots show no text cut off; overflow-x:hidden on html/body would fix it.
- Family chat card: the first question reads 'Sonuç Üretkenlik diyor'. {guc1} is filled with the first strength chip ('Üretkenlik'), which can look inconsistent with an Özgün Kâşif / Sanatçı result (this is the site's own content).
- The 'Kart Görseli' PNG card is not shot: the interest-code line overflows the 1080 px canvas (carried over from the previous round).
- During render one resource returns 404 (consoleErrors in rapor.json); it does not affect the frames.
