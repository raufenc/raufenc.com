# İHO7 · Aynı içerik, üç sunum

Bu klasör üç çalışan sistemi ve tek giriş sayfasını içerir. Ana yayın adresi `https://raufenc.com/iho7-meryem/` adresidir. Kullanıcı arayüzleri Arapçadır; bu belge bakım içindir.

Eski `/iho7-gunyayi/` adresi ve alt yolları kalıcı olarak `/iho7-meryem/` adresine yönlenir. Ana sayfa üç büyük görsel, tek sözcüklü seçenek adları ve küçük sürüm etiketlerinden oluşur.

## Dosya düzeni

| Konum | Görevi |
| --- | --- |
| `index.html`, `portal.css` | Üç büyük görselli seçenek içeren, kaydırma gerektirmeyen giriş |
| `kesif/` | Codex: görsel harita, ev eşleştirme, hikâye sıralama, videolu soru, iki kişilik oyun |
| `gun-yayi/` | Claude: günün saatine göre değişen gökyüzü, güneş yayı, bina ve kart seçimleri, iki kişilik yarış |
| `klasik/` | İlk sistem: video → çoktan seçmeli soru → cevabı yeniden dinleme; tek ve iki kişilik mod |
| `scorm-legacy.js` | Üç sürümün ortak SCORM 1.2 çalışma zamanı |
| `learning-ui.js`, `learning-ui.css` | Medya kontrolleri, tam ekran, hata ve yeniden deneme arayüzü |
| `*/responsive.css` | İframe, dikey telefon, yatay telefon ve tahta düzenleri |
| `tools/build-scorm.py` | Yerel kaynak tesliminde: üç ayrı ZIP üretimi ve XSD doğrulaması |
| `content.js` | Üç sistemin okuduğu tek özgün soru/cevap kaynağı |
| `vid/clips/` | Üç sistemin kullandığı aynı beş özgün MP4; her dosya bir kez saklanır |
| `fonts/` | Ortak Arakom yazı tipleri |
| `posters/` | Gün Yayı sürümünün özgün video kareleri |
| `preview/` | Ana sayfa için çalışan sistemlerden alınan gerçek ekran görüntüleri, WebP |
| `kesif/assets/` | Görsel Keşif sahneleri ve özgün videodan alınan kareler |
| `imsmanifest.xml` | Üç alternatif için SCORM 1.2 girişleri ve ortak dosya bağımlılıkları |

## Kaynaklar ve devralma

- Gün Yayı kaynakları: `raufenc/raufenc.com` GitHub deposu, `8a1bf1d35d3b676c80fff9730ebac7df70e60ee7` commit'indeki `iho7-gunyayi/` klasörü. Başlangıçtaki kodlar ayrıca bu işin `qa/commission-2026-10-25/claude-original-code/` klasöründe korunur.
- Görsel Keşif: bu işte daha önce yayımlanmış sürüm 3; Sites commit'i `a062d3ce36e1b8e5d120d5f9295cecd077be006f`. Referans paket çalışma projesinin kökündeki `web-yayin/dist/` dizinidir. Güncel birleşik web sürümü burada, `kesif/` içindedir.
- Klasik sistem: proje kökündeki değiştirilmemiş `source/` dizini. Özgün iCloud arşivi değiştirilmedi.
- Beş MP4 ve bütün soru/şık/doğru-cevap indeksleri kaynaklarla karşılaştırıldı. Sürümler arasında içerik farkı oluşturulmadı.
- Claude sohbetindeki yayımlanmamış notlar bu teslimin parçası değildir. Aşağıdaki yöntem açıklamaları teslim alınan kaynak kodundan çıkarılmıştır.

## Sistemlerin çalışma yöntemleri

### Görsel Keşif — `kesif/app.js`

Ekranlar `setScreen` ile aynı sahne içinde değiştirilir. `state` yalnızca açık oturumdaki bireysel ilerlemeyi, `session` yalnızca açık etkinliğin anlık seçimlerini tutar. Haritadaki noktalar yüzde koordinatlarıyla resme bağlanır. Dikey telefon görselleri ve nokta koordinatları medya sorgusuyla birlikte değişir; `fitScenes` yeniden boyutlandırmada noktaları görünür tutar.

Eşleştirmede bir ifade ve bir mekân seçilir. Sıralamada seçilen mekânlar bir diziye eklenir; SVG çizgi bu diziden oluşur. Videodan alınan kareler zaman çizgisinde kullanılır. Özgün video bittikten sonra soru ekranı açılır. Yanlış cevaptan sonra yeniden deneme yapılabilir, ilk deneme puanı değişmez. İki kişilik oyunda iki seçim de yapılmadan cevap açıklanmaz.

Yeni açılışta ilerleme sıfırlanır. `localStorage` yalnızca ses/hareket tercihlerini (`arapca-kesif-preferences-v2`) tutar; eski ilerleme okunmaz. `scorm.js`, ortak çalışma zamanına bağlanan küçük adaptördür. Bireysel değerlendirme beş sorunun ilk cevabından hesaplanır. İki kişilik oyun, eşleştirme ve sıralama ek alıştırmalardır; bireysel değerlendirme puanını değiştirmez.

### Gün Yayı — `gun-yayi/app.js`, `art.js`, `data.js`

`content.js` soruları, `data.js` yalnızca görsel/etkileşim üstverisini sağlar. Her sorunun `story` değeri gün içindeki konumu, `type` değeri etkileşimi belirler: `dial` güneşi yay üzerinde seçme/sürükleme, `town` bina seçme, `cards` kart seçmedir. `art.js` günün renklerini ve vektör çizimlerini üretir. Web Audio sesleri kodla üretilir; harici ses hizmeti kullanılmaz.

Akış: özgün videoyu oynat → videoyu küçültüp etkileşimi göster → cevabı seç → cevabı videodan tekrar dinlet. İki kişilik modda şıklar ayrı ayrı karıştırılır; hız puanı ve kişisel doğru sayısı ayrı tutulur. Arayüzün kendi görsel tasarımı korunmuştur. Kısa dikey ekranda oyuncular yan yana, yüksek dikey ekranda üst üste yerleşir. Cevap verilmemiş güneş yayı ekranı döndürülürse okunabilir kartlara dönüşür. Cevap verildikten sonra döndürmek cevabı değiştirmez. Ek ses efektleri başlangıçta kapalıdır.

### Klasik — `klasik/game.js`

İlk paketin görünümü ve soru akışı korunur. Tek kişilik modda video altına seçenekler açılır; iki kişilik modda aynı videoya bağlı iki cevap alanı bulunur. İlk doğru seçenin hız puanı ile her oyuncunun doğru sayısı ayrı tutulur. Soru/cevap sırası korunmuştur. Yatay ekranda video ve sorular yan yana, dikey ekranda alt alta yerleşir. Medya kontrolleri eklendi; kullanıcı videoyu durdururken soruya geçiren zaman aşımı kaldırıldı. Video hatası sessizce geçilmez, yeniden deneme sunulur.

## Güncelleme usulü

1. Metin, şık veya doğru cevap düzeltmesi `content.js` içinde bir kez yapılır. Şık sırası ve `correct` indeksi birlikte korunur.
2. Bir video değişirse `vid/clips/` içindeki ilgili dosya güncellenir. Gerekirse `posters/`, `kesif/assets/frame-*.webp` ve tanıtım görüntüleri de yenilenir.
3. Olayların anlamı veya sırası değişirse Gün Yayı `data.js` üstverisi ve Görsel Keşif `META`/nokta eşlemeleri içerikle birlikte incelenir. Sadece ortak metni değiştirmek farklı bir etkinliğe otomatik uyarlama sağlamaz.
4. Görsel Keşif sahneleri değiştirilirse masaüstü/dikey resimlerdeki noktalar ayrı kontrol edilir. Mevcut görsel üretim komutları proje kökündeki `qa/v3-image-prompts.json` ve `qa/v3-portrait-prompts.json` dosyalarındadır.
5. Üç giriş bağlantısı, üç dönüş bağlantısı, videolar ve her motorun soru akışı tarayıcıda kontrol edilir. Telefon dikey/yatay görünümünde taşma olmamalıdır.
6. Yayın, `raufenc/raufenc.com` deposunun güncel `main` dalı üzerinden Vercel `rauf-lab` projesine yapılır. Sadece `iho7-meryem/` kapsamındaki değişiklikler gönderilir; adres taşımasında kökteki `vercel.json` yönlendirmeleri de güncellenir. Diğer site bölümlerinin yeni commit'leri korunur; zorla push yapılmaz.

## Yerel çalıştırma

Bu işin proje kökündeki `serve.mjs` mevcut Node.js ile çalıştırılır. Birleşik önizleme adresi `http://127.0.0.1:4173/komisyon-web/iho7-meryem/` olur. Sunucu Control+C ile kapanır.

Paket bağımsız taşınacaksa klasörün tamamı bir statik web sunucusuna konur. Giriş dosyası `index.html`'dir. Hesap, API anahtarı, harici veritabanı veya CDN gerekmez.

## SCORM 1.2 teslimi

Kaynak ZIP'i doğrudan LMS'ye yüklenmez. `SCORM_Teslim_2026-10-25/` içindeki üç ZIP ayrı ayrı yüklenir. Her birinin kökünde `imsmanifest.xml` ve XML şemaları, içinde tek SCO ve o sürümün bütün bağımlılıkları bulunur. Giriş sayfası, harici web bağlantısı veya başka bir paketteki medya gerekli değildir. Paket içindeki geri simgesi aynı etkinliği baştan açar; üçlü komisyon ana sayfasına çıkmaz. Web adresini bir EBA iframe'ine koymak SCORM entegrasyonu sağlamaz; ZIP içeriği LMS tarafından sunulmalıdır.

- Yeni açılış: arayüz ve puan sıfırdan başlar, `suspend_data` temizlenir, `exit` boş bırakılır. Ekran döndürme veya boyutlandırma yeni açılış değildir.
- Puan: beş özgün sorunun ilk cevapları × 20. Sonradan doğruya çevirme puanı yükseltmez. Sıfır doğru da 0/100 olarak kaydedilir.
- Durum: beş soru cevaplanana kadar `incomplete`, ardından `completed`. Onaylanmış başarı eşiği olmadığı için geçme/kalma eşiği uydurulmaz.
- İki kişilik mod: ekranda yarış sonucu gösterilir; bireysel LMS puanı veya tamamlanma durumu değiştirilmez. Arayüz bunu Arapça belirtir.
- Destekleyen LMS'lerde her bireysel sorunun seçimi, doğru cevabı, sonucu ve yanıt süresi `cmi.interactions` altında yazılır. Bu isteğe bağlı alanlar desteklenmiyorsa temel puan ve tamamlanma çalışır.
- Oturum süresi, cevapta/anlık ilerlemede, 15 saniyelik aralıklarla, sekme gizlenirken ve kapanışta kaydedilir. Kapanış bir kez yapılır. LMS `browse/review` modunda eski not değiştirilmez.
- LMS yazma veya kaydetme hatası Arapça bildirimle görünür olur; hatalı kayıt başarılı gösterilmez.
- Tarayıcı bağımsız açılışta LMS bağlantısı olmadan da çalışır. Bu kullanım LMS'ye öğrenci notu göndermez.

Kaynak tesliminden tekrar üretmek için Python 3 ve `lxml` kurulu ortamda:

```sh
python3 iho7-meryem/tools/build-scorm.py --output SCORM_Teslim
```

Şema kaynakları ve SHA-256 değerleri `tools/schema-sources.json` içindedir. Eski IMS yardımcı dosyasının geçersiz varsayılan XML ad alanı yerine W3C XML ad alanı şeması kullanılır. Manifest yalnız kullandığı CP ve ADL ad alanlarıyla doğrulanır; LOM üstverisi kullanılmaz. `tools/` yerel üretim kaynağıdır, site deposunun genel ignore kuralı nedeniyle web yayınına dahil edilmez; kaynak ZIP'inde bulunur.

## Doğrulama ve sınırları

25 Ekim 2026 düzeltmesinde yerel SCORM 1.2 oynatıcı benzetiminde üç sürüm ve üç ZIP'in açılmış kopyaları tamamlandı: bir yanlış/dört doğru → 80/100, beş soru kaydı, tamamlanma, kapatıp yeniden açmada sıfırlama. Sıfır puan, tekrar cevap, desteklenmeyen isteğe bağlı alanlar, API bulunamaması, üst pencere erişim hatası, review/browse ve kayıt hatası çalışma zamanı testleriyle denetlendi.

Dikey/yatay boyutlarda 320×568, 390×844, 568×320, 844×390 ve 1280×720 kullanılabilir içerik alanları kontrol edildi; LMS benzeri dış çerçeve içinde de test edildi. İki kişilik beş turun tamamı puanı değiştirmeden bitti. Codex eşleştirme/sıralama tamamlandı; duraklatılan videonun 30 saniye sonra kendiliğinden ilerlemediği kontrol edildi. Küçük dikey Gün Yayı düellosunda bulunan taşma düzeltilip yeniden doğrulandı.

Beş MP4, soru metinleri, şıklar ve doğru cevap indeksleri özgün kaynakla aynıdır. Kanıtlar proje kökündeki `qa/scorm-2026-10-25/`, teslim özeti `SCORM_Teslim_2026-10-25/` içindedir.

**Gerçek EBA/İGYS hesabına içe aktarma ve fiziksel iOS/Android/etkileşimli tahta doğrulaması yapılmadı.** Yerel benzetim ve Chrome boyut testleri bu kontrollerin yerine geçmez; bu teslim resmî EBA veya ADL sertifikası iddiası taşımaz. EBA'nın öğretmen/öğrenci kayıt ekranı, yükleme boyut sınırı ve kullandığı LMS ayarları gerçek hedefte ayrıca doğrulanmalıdır.
