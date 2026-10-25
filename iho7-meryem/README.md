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
| `scorm-legacy.js` | Gün Yayı ve Klasik için ortak, düzeltilmiş SCORM bağlantısı |
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

Ekranlar `setScreen` ile aynı sahne içinde değiştirilir. `state` kalıcı bireysel ilerlemeyi, `session` yalnızca açık etkinliğin anlık seçimlerini tutar. Haritadaki noktalar yüzde koordinatlarıyla resme bağlanır. Dikey telefon görselleri ve nokta koordinatları medya sorgusuyla birlikte değişir; `fitScenes` yeniden boyutlandırmada noktaları görünür tutar.

Eşleştirmede bir ifade ve bir mekân seçilir. Sıralamada seçilen mekânlar bir diziye eklenir; SVG çizgi bu diziden oluşur. Videodan alınan kareler zaman çizgisinde kullanılır. Özgün video bittikten sonra soru ekranı açılır. Yanlış cevaptan sonra yeniden deneme yapılabilir, ilk deneme puanı değişmez. İki kişilik oyunda iki seçim de yapılmadan cevap açıklanmaz.

`localStorage` anahtarı `arapca-kesif-s013-v1` önceki ilerlemelerle uyumludur. `scorm.js` LMS mevcutsa SCORM kaydını, yoksa bağımsız çalışmayı destekler. Bireysel değerlendirme beş sorunun ilk cevabından hesaplanır.

### Gün Yayı — `gun-yayi/app.js`, `art.js`, `data.js`

`content.js` soruları, `data.js` yalnızca görsel/etkileşim üstverisini sağlar. Her sorunun `story` değeri gün içindeki konumu, `type` değeri etkileşimi belirler: `dial` güneşi yay üzerinde seçme/sürükleme, `town` bina seçme, `cards` kart seçmedir. `art.js` günün renklerini ve vektör çizimlerini üretir. Web Audio sesleri kodla üretilir; harici ses hizmeti kullanılmaz.

Akış: özgün videoyu oynat → videoyu küçültüp etkileşimi göster → cevabı seç → cevabı videodan tekrar dinlet. İki kişilik modda şıklar ayrı ayrı karıştırılır; hız puanı ve kişisel doğru sayısı ayrı tutulur. Arayüzün kendi görsel tasarımı korunmuştur.

### Klasik — `klasik/game.js`

İlk paketin görünümü ve soru akışı korunur. Tek kişilik modda video altına seçenekler açılır; iki kişilik modda aynı videoya bağlı iki cevap alanı bulunur. İlk doğru seçenin hız puanı ile her oyuncunun doğru sayısı ayrı tutulur. Ortak içerik/medya yolları ve giriş sayfasına dönüş dışında motor değiştirilmemiştir.

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

## Doğrulama sınırı

Kaynak bütünlüğü ve gerçek tarayıcı akışları kontrol edilir. Yeni birleşik SCORM manifestinin gerçek EBA/LMS içe aktarma testi ve fiziksel iOS/Android testi ayrıca yapılmalıdır. Gün Yayı ve Klasik sistemin SCORM bağlantısında iki parametreli LMS yazımı, sıfır puan kaydı, tekrar kapanış ve farklı kaynaktaki üst pencereye erişim hataları düzeltildi. Ekrandaki puanlama kuralları korunur.
