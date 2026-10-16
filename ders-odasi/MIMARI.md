# Ders Odası — fizibilite, mimari ve entegrasyon

Bu belge, Drive'daki ders slaytlarının bire bir / bire üç canlı derslerin işlendiği bir
platforma gömülü, etkileşimli ve her şeyi kaydeden bir ders sistemine dönüştürülmesinin
olurunu ve kurulan sistemi anlatır.

## 1. Kısa cevap: olur

Kaynak malzeme buna çok uygun:

| Klasör | İçerik | Sistemdeki hâli |
|---|---|---|
| Âdâb-ı Muâşeret / Slaytlar | 17 pptx deste, ~140 slayt; her slayt tek bir 16:9 görsel (1672×941), metin görselin içinde | 17 ders, slaytlar içe aktarıldı; oyunlar eklenecek |
| FIKIH-1 | 38 görsel, ders videosu, seslendirme, 5 HTML etkinlik | Slayt + slayt başı anlatım + altyazı + tam video |
| FIKIH-2 | 22 görsel, 3:51 anlatım, ders videosu, 5 LMS etkinliği | **Tam ders (örnek):** 36 ekran, 2 durak sorulu video, 11 oyun |
| FIKIH-3, 5, 6 | 22-25 görsel, video, seslendirme | Slayt + slayt başı anlatım + altyazı + tam video |

Slaytların zaten 16:9 olması, videoların slaytlarla birebir kurgulanmış olması ve
seslendirmelerin temiz olması sayesinde içe aktarma büyük ölçüde otomatik yapılabildi:
araç, video karelerini slaytlarla eşleyip her slayda kendi anlatım parçasını ve altyazısını
bağlıyor. Elle yapılacak iş, her derse oyun/etkinlik eklemek ve otomatik altyazıyı gözden geçirmek.

## 2. Ne kuruldu

```
ders-odasi/
  index.html          Ders kataloğu · "Kendi başına" · "Canlı ders başlat" · "Derse katıl"
  ders.html           16:9 oynatıcı  (?d=<ders>&rol=bireysel|ogrenci|ogretmen&oda=<kod>)
  rapor.html          Öğrenci / oda raporları, CSV ve xAPI JSON dışa aktarma
  motor/
    cekirdek.js       yardımcılar, ses efektleri (WebAudio), konfeti
    kayit.js          kayıt katmanı: yerel + SCORM 1.2/2004 + xAPI + platform köprüsü
    canli.js          canlı ders eşlemesi (sekme, platform köprüsü, WebSocket)
    oynatici.js       sahne, gezinme, puan, öğretmen paneli, lazer işaretçi
    bloklar-temel.js  kapak, bölüm, slayt, video, kartlar, anket, düşün, kapanış
    bloklar-oyun.js   çoktan seçmeli, doğru/yanlış, sınıflandır, eşleştir, hafıza,
                      yol, gösterge, kilit, hız turu
    bloklar-eglence.js bereket sepeti (yakala), sırala, hikâye, soru çarkı, hata bul,
                      söz kartı, bereket sofrası
    stil.css
  dersler/
    katalog.js
    <ders>/ders.js    dersin tamamı (bölümler → bloklar) + slayt/ ses/ video/ ikon/
  paketler/           LMS'e yüklenecek SCORM zip'leri (git'e girmez; scorm-paketle.py üretir)
scripts/ders-odasi/
  ice-aktar.py        pptx / görsel klasörü + video + ses + transkript → ders
  adab-oyunlar.py     Âdâb destelerine altyazı, oyun ve kapanış ekler (tekrar çalıştırılabilir)
  scorm-paketle.py    ders → SCORM 1.2 veya 2004 zip
  duzeltmeler.json    otomatik transkript için yazım/hitap düzeltmeleri
```

Harici kütüphane yok; her şey düz HTML/CSS/JS ve SVG. Sunucu gerektirmez.

### Blok türleri

| Tür | Ne yapar |
|---|---|
| `kapak` | SVG animasyonlu açılış, besmele ile başlama |
| `bolum` | bölüm açılış kartı (çizilen halka, ikon) |
| `slayt` | görsel + slayt başı sesli anlatım + altyazı + dokunulabilir noktalar |
| `video` | araya giren video; belirli saniyede durup soru sorar, ilk izleyişte ileri sarılamaz |
| `kartlar` | çevir-tanı kartları |
| `anket` | doğru cevabı olmayan soru; canlı derste sınıfın dağılımı görünür |
| `dusun` | niyet / kendi cümlesi (açık uçlu, LMS'e metin olarak gider) |
| `coktan`, `dogruYanlis` | soru seti; doğru/yanlış kartı kaydırılarak da cevaplanır |
| `siniflandir` | sürükle-bırak (ya da dokun-seç) ile kutulara yerleştirme |
| `eslestir`, `hafiza` | çizgiyle eşleştirme, eşini bulma |
| `yol` | her doğru cevapta yolcu SVG yolda bir taş ilerler (Sünnet Yolu) |
| `gosterge` | doğru kararla ibre yükselir (Huşû Göstergesi) |
| `kilit` | her doğru kararla kilidin bir dişi açılır (Müfsid Kilidi) |
| `hizTuru` | süreli tekrar, hız bonusu, canlı derste sınıf sıralaması |
| `yakala` | “Bereket sepeti”: yukarıdan düşen güzel davranışları sepete topla, hatalardan kaç; kombo, 3 can, süre. Canlı derste Hocamız başlatır, sınıf sıralaması canlı görünür |
| `sirala` | adımları doğru sıraya diz; her doğru adımda Yusuf SVG yolda bir durak ilerler |
| `hikaye` | resimli, seçimli hikâye; her seçim bir sonuç doğurur, iyi seçim yıldız kazandırır |
| `cark` | soru çarkı: çevir, gelen dilimin sorusunu cevapla (dilim çeviren cihazda seçilir, eylemle herkese aynı gider) |
| `hataBul` | resimdeki yanlışları bul; koordinatlar 1600×900 resim düzleminde, ipucu düğmesi |
| `soz` | hadîs-i şerîf / büyüklerimizin sözü için vakur kart (kaynaklı) |
| `sofra` | dersteki oyunlar bitirildikçe sofraya bir nimet gelir; üç yıldızlı tabak parıldar |
| `kapanis` | rozet, puan özeti, LMS içinde "Dersi bitir" |

Oyun kartlarında resim: `dogruYanlis` ifadesine, `siniflandir` kartına `gorsel`; `hafiza` çiftine
`aGorsel`/`bGorsel`; `kapak` bloğuna `gorsel` (resimli kahraman kapak) verilebilir.

**Öğretmen notu kuralı:** her bloktaki `not` alanı yalnızca öğretmen panelinde görünür; blok
kodları onu sahneye asla basmaz. Öğrenciye gösterilecek açıklama ayrı alanlarda durur
(`aciklama`, `ogrenciNotu`, kartın `not`'u gibi).

Yeni bir oyun türü: `DO.Bloklar.yeniTur = { ciz(ctx), max(blok), zorunlu }` yazmak yeter.
`ctx.cevap()` her cevabı kaydeder ve canlı derste öğretmene iletir, `ctx.tamamla()` puanı yazar.

## 3. Kayıt: "çocuğun sonuçları, hatta bütün etkileşimleri"

Dersin içindeki her olay bir **xAPI ifadesi** olur: ekranı açtı, anlatımı dinledi, noktaya
dokundu, videoyu oynattı/durdurdu/sardı, soruya şu cevabı verdi (doğru mu, kaç saniyede,
kaçıncı denemede), etkinliği şu puanla bitirdi, söz istedi, niyet kartına şunu yazdı…
FIKIH-2 dersinin baştan sona bir oturumu ~190 kayıt üretir.

Aynı ifade, bulunan bütün hedeflere aynı anda yazılır:

| Hedef | Ne zaman açılır | Ne yazılır |
|---|---|---|
| **yerel** | her zaman | tarayıcı deposu; `rapor.html` buradan okur |
| **SCORM 1.2 / 2004** | LMS `API` / `API_1484_11` sağlıyorsa | öğrenci adı LMS'ten alınır; puan, geçti/kaldı, ilerleme, kaldığı yer (`suspend_data`), süre ve **her cevap** `cmi.interactions` olarak |
| **xAPI (LRS)** | `?endpoint=…&auth=…&actor=…` ile açılırsa | ifadelerin tamamı (TinCan başlatma biçimi) |
| **platform köprüsü** | ders bir platformun iframe'inde açılırsa | her ifade `postMessage` ile ana sayfaya |

Bu dört yol sahte LMS ile uçtan uca denendi: SCORM 1.2 ve 2004'te ad, puan, durum,
etkileşimler, süre ve "kaldığım yerden devam et" doğru çalışıyor.

## 4. Canlı ders (1 öğretmen + 1-3 öğrenci)

Öğretmen "Canlı ders başlat" der; oda kodu ve davet bağlantısı çıkar. Öğretmen panelinde:

* öğrencilerin hangi ekranda olduğu, puanı, bu ekrandaki doğru/yanlış sayısı
* gelen cevapların canlı akışı, söz isteyen öğrenci (✋)
* "Öğrenciler beni takip etsin" kilidi: öğretmen ilerledikçe öğrencilerin ekranı da ilerler,
  video oynat/durdur/sar eşlenir
* lazer işaretçi (öğretmenin imleci öğrencinin ekranında kırmızı nokta)
* her ekran için öğretmen notu (seslendirmeden ve pedagojik önerilerden)
* öğrencilere kısa mesaj, ders raporu

Öğrencilerin bütün kayıtları öğretmenin cihazına da gelir; rapor ekranındaki **oda
görünümü** öğrencileri karşılaştırır ve en çok zorlanılan soruları sıralar.

**Farklı cihazlar arasında canlı ders: Firebase (kurulu ve açık).**
Proje: `ders-odasi-raufenc` (raufenc@gmail.com), Realtime Database `europe-west1`, ücretsiz
Spark planı, anonim giriş açık. Web anahtarı yalnızca raufenc.com ve www.raufenc.com kaynaklı
istekleri ve yalnızca veritabanı/kimlik servislerini kabul edecek şekilde kısıtlı (localhost'tan
çalışmaz; yerel denemede tarayıcı raufenc.com adresinde tutulup dosyalar yerelden sunulur).
Kurallar değişirse: Firebase konsolu → Realtime Database → Kurallar'a `firebase-kurallari.json`
yapıştırılır ya da `firebase deploy --only database` çalıştırılır.

Aşağıdaki adımlar başka bir projeye geçmek gerekirse diye duruyor:
`motor/canli.js` Firebase Realtime Database ile çalışır; `ayarlar.js`'e proje ayarı yapıştırılınca
öğretmen ve öğrenciler ayrı cihazlardan aynı odaya bağlanır. Firebase emülatörüyle, birbirini
başka yoldan göremeyen ayrı tarayıcı profillerinde denendi: katılım, öğretmeni takip, canlı
cevaplar, anket dağılımı, söz isteme, video oynat/durdur eşlemesi, lazer işaretçi, öğrenci
kayıtlarının öğretmene gelmesi ve öğrenci çıkınca listeden düşmesi çalışıyor.

Kurulum (bir kez, ~10 dakika, ücretsiz Spark planı yeter):

1. https://console.firebase.google.com → **Proje ekle** (Analytics gerekmez).
2. **Build → Realtime Database → Veritabanı oluştur**; konum olarak `europe-west1` seçin,
   "kilitli modda başlat" deyin.
3. Aynı sayfada **Kurallar** sekmesine `ders-odasi/firebase-kurallari.json` içeriğini yapıştırıp **Yayınla**.
4. **Build → Authentication → Başlayın → Sign-in method → Anonim** girişi etkinleştirin.
5. **Authentication → Ayarlar → Yetkili alan adları**'na `raufenc.com` ekleyin.
6. **Proje ayarları → Uygulamalarınız → Web (</>)** ile bir web uygulaması ekleyin; çıkan
   `firebaseConfig` nesnesini `ders-odasi/ayarlar.js` içindeki `firebase:` alanına yapıştırın.

Bu ayarlar gizli değildir (tarayıcıya zaten gider); erişimi kurallar korur: yalnızca anonim
giriş yapmış ve oda kodunu bilen okuyabilir, mesajlar sonradan değiştirilemez, 6 saatten eski
mesajları öğretmen temizler. Görüntü ve ses (görüntülü görüşme) bu sistemin parçası değildir;
Zoom / Meet / platformun kendi görüşmesi yanında açık tutulur.

**Eşleme modeli (ekranın içi).** Ekran geçişinin yanında ekranın içindeki her anlamlı hareket
de eşlenir. Her blok, hareketlerini "eylem" olarak tanımlar (`ctx.eylemTanimla`) ve yapar
(`ctx.eylem`); aynı işleyici her cihazda aynı şekilde çalışır.

**Temel kural: Hocamızın ekranı ile öğrencinin ekranı her an aynıdır.** Öğrenci ne yaparsa
(cevap, kart, sıralama, çark, hata bulma, video oynat/durdur, durak sorusu, niyet kartına yazı)
Hocamızın ekranında da aynı anda olur; sağdaki panel bunun yanında ek bilgidir.

| Ekran | Canlı derste davranış |
|---|---|
| Kapak, bölüm, slayt, kartlar, video ve durak soruları | **Ortak ekran:** kim dokunursa (Hocamız ya da öğrenci) herkeste aynı anda olur |
| Bütün oyunlar (çoktan seçmeli, doğru/yanlış, sınıflandır, eşleştir, hafıza, yol, gösterge, kilit, sırala, hikâye, çark, hata bul) | Varsayılan **"Birlikte, tek ekran"**: tek oyun tahtası; hamle herkeste görünür ("Zeynep cevapladı"), puan hamleyi yapana yazılır. Hocamız panelden **"Herkes kendi oynasın"** derse her öğrenci kendi ekranında oynar ve Hocamızın ekranı **seçtiği öğrencinin ekranını yansıtır** |
| Hız turu, bereket sepeti | Herkes kendi oynar; **Hocamız herkes için aynı anda başlatır**; Hocamızın ekranı izlenen öğrencinin ekranını yansıtır (sorular, cevaplar, sepet ve düşen nimetler), sıralama canlı |
| Anket, niyet kartı | Herkes kendi cevaplar; öğrencinin seçimi ve yazdığı Hocamızın ekranında da görünür. Anket sonuçlarını öğrencilere **Hocamız açar** |
| Bereket sofrası, puan | Hocamızın ekranında izlenen öğrencinin sofrası ve puanı görünür |

**Yansıtma ("herkes kendi" ekranlarda).** Öğrencinin kendi ekranındaki her hamle `yansi`
mesajıyla Hocamıza da gider; Hocamızın cihazı aynı işleyiciyi çalıştırır (sıralar tohumlu
karıştığı için aynı ekran oluşur). 1+1 derste izlenen tek öğrencidir; 1+3'te Hocamız panelden ya
da ekranın üstündeki şeritten kimin ekranını göreceğini seçer. Hocamız sonradan katılırsa ya da
sayfayı yenilerse öğrenci kendi hamle listesini gönderir, ekran sessizce yeniden kurulur.

Kurallar:

* **Kim dokunabilir:** panelden *Herkes* (varsayılan) / *Yalnız ben* / tek bir öğrenci ("Söz ver").
  Söz isteyen öğrencinin eli (✋) söz verilince iner. Yetkisiz dokunuş hiçbir cihazda etki etmez.
* **Herkes dokunabilirken** hamlelerin sırası öğretmen cihazında tutulur, böylece iki çocuk aynı
  anda dokunsa da bütün ekranlar aynı sonuca varır.
* **Mutlak durum:** "kartı çevir" değil "1. kart açık" gönderilir; hamleler soru/adım numarası
  taşır. Bir geçiş animasyonu sürerken gelen hamle düşmez, önce bekleyen geçiş tamamlanır.
* **Geç katılan / bağlantısı kopup dönen** öğrenci, ekranın o anki hâlini öğretmen cihazından alır
  (ekrandaki hamlelerin kaydı sessizce yeniden oynatılır).
* **Ses tek yerde çalar:** panelden *Bende* (Hocamızın cihazı, görüşmeden öğrencilere gider) ya da
  *Öğrencilerde* (her çocuğun cihazı; Hocamızınki sessiz). Çift ses ve yankı olmaz.
* Öğrenci canlı derste ekranları kendisi ilerletmez; oyun bitince "Hocamız devam ettirecek" yazar.
* Öğretmen notu (`not`) yalnızca öğretmen panelinde görünür.

**Taşıyıcılar.** Mesajlar şu an üç yoldan gidebilir:

0. **Firebase** — yukarıdaki kurulumla farklı cihazlar arası.
1. `BroadcastChannel` — aynı tarayıcıdaki sekmeler arasında (deneme için hazır).
2. **Platform köprüsü** — ders platformun iframe'inde açıkken ana sayfa mesajları alır ve
   kendi gerçek zamanlı kanalıyla (görüntülü görüşme için zaten var olan kanal) diğer
   katılımcılara iletir. Önerilen yol budur.
3. `WebSocket` — `?ws=wss://…` verilirse doğrudan bir oda sunucusuna. Sunucu, aynı odaya
   gelen mesajı odadaki diğer bağlantılara aynen dağıtan ~30 satırlık bir aktarıcıdır.

Aynı mesaj birden çok taşıyıcıdan gelirse bir kez işlenir; taşıyıcılar birlikte açık olabilir.

## 5. Platforma gömme

```html
<iframe src="https://raufenc.com/ders-odasi/ders.html?d=fikih-2&rol=ogrenci&oda=AB12C&host=https://platform.example"
        allow="autoplay; fullscreen" style="aspect-ratio:16/9;width:100%;border:0"></iframe>
```

Ders → platform (`window.parent.postMessage`, hedef köken `host`):

```js
{ kaynak: 'ders-odasi', tur: 'hazir',   veri: { ders, ogrenci, rol } }
{ kaynak: 'ders-odasi', tur: 'ifade',   veri: <xAPI ifadesi> }        // her etkileşim
{ kaynak: 'ders-odasi', tur: 'durum',   veri: { puan, max, tamam, ilerleme, esik } }
{ kaynak: 'ders-odasi', tur: 'canli',   veri: <canlı ders mesajı> }   // diğer katılımcılara ilet
{ kaynak: 'ders-odasi', tur: 'kapandi', veri: { sureMs } }
```

Platform → ders (canlı mesajları geri vermek için):

```js
iframe.contentWindow.postMessage({ kaynak: 'ders-odasi-platform', mesaj: <aynı canlı mesaj> }, 'https://raufenc.com')
```

Platform tarafında yapılacaklar:

1. **Gömme izni.** Site şu an `frame-ancestors 'self'` ile yalnızca kendi içinde gömülebiliyor.
   Platform alan adı belli olunca `vercel.json`'a `/ders-odasi/(.*)` için
   `Content-Security-Policy: frame-ancestors 'self' https://platform-alan-adi` eklenecek.
   (Paket LMS'e yüklenirse bu gerekmez; dosyalar LMS'ten sunulur.)
2. **Kimlik.** Öğrenci adı/kimliği `?host` ile açılan derste giriş ekranında sorulur; platform
   isterse SCORM/xAPI parametreleriyle verebilir (ad kutusu kilitlenir).
3. **Kayıt.** `ifade` mesajlarını kendi veritabanına yazmak ya da bir LRS'e aktarmak.
   Ders dışarıdaki bir LRS'e doğrudan yazacaksa sitenin `connect-src` listesine LRS adresi eklenir.
4. **Canlı kanal.** `canli` mesajlarını odadaki diğer katılımcılara iletmek.

LMS kullanılıyorsa (Moodle, Canvas, TalentLMS, EBA vb.): `scorm-paketle.py` ile üretilen
`ders-odasi/paketler/*.zip` doğrudan yüklenir (depo `*.zip` dosyalarını izlemediği için paketler her seferinde üretilir).

## 6. Yeni ders ekleme akışı

```bash
# 1) Desteyi içe aktar (slayt → WebP, video → slayt eşleme, slayt başı ses, altyazı)
python3 scripts/ders-odasi/ice-aktar.py --id adab-08 --ad "Sofra Edebi" \
    --seri "Âdâb-ı Muâşeret" --pptx 08-sofra-edebi.pptx
python3 scripts/ders-odasi/ice-aktar.py --id fikih-3 --ad "Müstehap ve Mübah" \
    --seri "Fıkıh Dersleri" --gorseller FIKIH-3/ --video "Fıkıh 3.mp4" \
    --transkript fikih3.json --video-ekle

# 2) dersler/<id>/ders.js içine oyunları ekle (örnek: dersler/fikih-2/ders.js)
# 3) LMS paketi
python3 scripts/ders-odasi/scorm-paketle.py fikih-3 --surum 2004
```

Transkript için Whisper (faster-whisper, `medium`, Türkçe) kullanıldı; çıktı çok iyi ama
"seyyiv secdesi → sehiv secdesi" gibi hatalar olabiliyor. Bilinenler `duzeltmeler.json`
ile otomatik düzeltiliyor; hitaplar (Peygamber Efendimiz (sallallahü aleyhi ve sellem),
Allahü teâlâ) da burada sabitleniyor. Otomatik altyazılı her slayta "gözden geçirin" notu düşülür.

## 7. Dikkat edilecekler

* **İçerik doğruluğu.** FIKIH-2 oyunları yalnızca seslendirmede geçen bilgiyi kullanır.
  Yeni derslerde de oyun metinleri kaynak anlatımın dışına çıkmamalı; yayından önce
  Hocalarımızın gözünden geçmeli.
* **Çocuk verisi (KVKK).** Kayıtlar şu an yalnızca öğrencinin/öğretmenin cihazında ve
  (varsa) LMS'tedir. Platform veritabanına yazılacaksa veli açık rızası, yalnızca gereken
  verinin tutulması ve saklama süresi belirlenmeli.
* **Otomatik oynatma.** Tarayıcılar sesi ilk dokunuştan sonra açar; giriş ekranındaki
  "Derse başla" bu dokunuştur. Canlı derste öğrenci tarafında anlatım varsayılan olarak
  kapalıdır (anlatımı Hocamız yapar; yankı olmaz). `&anlatim=1` ile açılır.
* **Video biçimi.** H.264 MP4 her yerde oynar; FIKIH-2'de ayrıca WebM yedeği var.

## 8. Sıradaki adımlar

1. Firebase projesini açıp `ayarlar.js`'e yapıştırmak (farklı cihazlarda canlı ders); platform alan adı belli olunca gömme izni.
2. Âdâb: “Bereketli Sofra” tam ders; diğer 16 desteye ikişer-üçer oyun eklendi
   (`adab-oyunlar.py`). Sıradaki: her desteye hikâye görselleri ve seslendirme.
3. Fıkıh 1, 3, 5, 6'ya FIKIH-2 kalıbında oyunlar (FIKIH-1'in mevcut 5 etkinliği hazır içerik).
4. Öğretmen için toplu rapor (öğrenci bazında haftalar boyu gelişim) — platform veritabanı ile.
5. İsteğe bağlı: cmi5 başlatma desteği, çevrimdışı kullanım (service worker).
