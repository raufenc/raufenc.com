# Sunum Odası

Adres: https://raufenc.com/sunumlar/

Ana sayfa ve nav.js değiştirilmez. Mevcut bilim, safsatalar ve yapay-zeka-dil-ogretimi sunumları korunur. Oda yalnızca kendi URL'si üzerinden açılır; bu erişim gizlilik veya parola koruması anlamına gelmez.

## Kullanım

- **Sahneyi dene**: araçları deneyin. Sağ/sol ok, boşluk ve PageUp/PageDown ile adım/slayt ilerler.
- **Yeni sunum**: ad ve açıklama; görsel/video seçimi; web sunum bağlantısı; metin slaytı; konuşmacı notları.
- Video slaydını çoğaltıp başlangıç/bitiş saniyesi vererek bölüm bölüm sunabilirsiniz. Aynı File nesnesini kullanan bölümler tek kez yüklenir.
- **Kaydet ve yayımla**: yönetici girişi ve Blob bağlantısı gerektirir. Sunucu eksikse başarı taklidi yapılmaz. Yerel seçilen dosyalar yalnız bu oturumda önizlenir.
- Proje bağlantısı `?proje=<UUID>`; JSON dışa/içe aktarımıyla bağlantılı projeler taşınabilir. JSON dosyasına medya gömülmez.
- Arşivleme proje listesinden kaldırır; medya ve eski manifest sürümleri silinmez. Dosya URL'leri gizli değildir.
- L lazer; P kalem; E temizle; Ctrl/Cmd+Z geri al; B karart; F tam ekran; N notlar; G slayt listesi; R yeniden başlat; K video oynat/duraklat.
- Notlar aynı ekranda görünür; ekran paylaşımında dinleyiciye de görünür. Ayrı sunucu ekranı değildir.
- Gömülü sunum odağı içerideyse kendi klavye kontrollerini kullanır. Pointer açıkken içerikle etkileşmek için pointer'ı kapatın. Tam ekran için dış oynatıcının düğmesini kullanın.

## PowerPoint uyumluluğu

PPTX dosyası kaynak olarak saklanır; genel amaçlı, birebir PPTX renderer veya dönüştürücü yoktur. OneDrive Embed URL'siyle Microsoft web oynatıcısı desteklenir; tüm efektlerin, animation trigger'ların, fontların birebir eşleştiği vaat edilmez. Görüntü eşleşmesi gerektiğinde doğrulanmış video çıktısı veya gerçek oynatım ekran kaydı kullanılır; video bağımsız tıklanabilir PowerPoint nesnelerini yeniden oluşturmaz. Mac PowerPoint video dışa aktarımındaki gömülü medya sınırlamaları nedeniyle çıktı kontrolü gerekir.

HTML sunumları sitede kendi klasörüne kod + varlıklarıyla yayımlanır, ardından bağlantısı eklenir. Rastgele HTML/ZIP yükleme çalıştırılmaz. Aynı kaynak /sunumlar/ HTML ve Microsoft/Google iframe'leri desteklenir. X-Frame-Options/CSP/hesap yetkisi nedeniyle gömmeye kapalı bağlantılar dışarıda açılmalıdır.

## Kalıcı medya deposu

Vercel projesi **rauf-lab**, id `prj_yAsY8JRj5qlITCH23jhaEbmXxnQw`; takım `team_oljixZeMChjLf1vZZt3xQqLq`.

Gerekli: public Vercel Blob deposunu bu projeye bağlayın; `BLOB_READ_WRITE_TOKEN` production/preview ortamında olmalı. Token'ı kaynak koduna yazmayın. Yönetici şifresi `SUNUMLAR_ADMIN_PASSWORD`, tanımlı değilse mevcut `BIA_ADMIN_PASSWORD`. Oturum imzası `SUNUMLAR_SESSION_SECRET`, yoksa `BIA_JWT_SECRET`, yoksa yönetici şifresinden türetilir. Proje mevcut auth değerlerini değiştirmez. Yeni ortam değişkenleri sonraki deployment'ta etkinleşir.

İsteğe bağlı `SUNUMLAR_MAX_FILE_BYTES` uygulama tavanını azaltır. Vercel Blob teknik tavanı tek dosyada 5.000.000.000.000 bayt; hesap kapasitesi, transfer kotası, ücret ve tarayıcı/bağlantı süresi ayrıca sınır oluşturur. Manifest 2 MB, proje başına en fazla 5000 slayt. Kesilen yükleme yeni istekle tekrar başlatılır; sayfa yenilemeleri arasında kaldığı byte'tan devam garantisi yoktur.

Tarayıcı dosyaları multipart olarak doğrudan Blob'a gönderir; Vercel Function dosya içeriğini taşımaz. Yükleme token'ı kimlik doğrulamasıyla verilir. Sunum manifestleri sunucuda doğrulanır, immutable sürümlerle saklanır. Blob'un overwrite cache gecikmesinden kaçınmak için en güncel sürüm lexicographic ters-zaman sırasıyla seçilir. Kayıt eski `updatedAt` ile gelirse 409 verilir. Bu kontrol tek kullanıcı düzenlemesinde eski pencereyi yakalar; Blob veritabanı işlemi olmadığı için eşzamanlı milisaniyelik yazılar için transaction/lock sağlamaz.

## Kontroller

```
npm ci
npm run test:server
npm run build:sunumlar-vendor
node --check sunumlar/room.js
node --check sunumlar/player.js
```

SDK client bundle kaynak paketi `@vercel/blob` 2.8.2, esbuild 0.28.2. Vendor lisans dosyası korunur. Testler gerçek üretim dosyası veya credential kullanmadan auth, Origin/CSRF, upload token, Blob callback signature, pagination, input validation, version/edit/archive ve provider failure davranışını denetler.

## 20 Ekim 2026 kurulum durumu

Vercel connector proje okuma ve GitHub yazma erişimi doğrulandı. Vercel Blob oluşturma ve ortam değişkeni listeleme işlemleri 403 döndü; yerel Vercel CLI girişi mevcut değil. Depo bağlantısı tamamlanmadan gerçek kalıcı upload ve oturum açma uçtan uca doğrulanmış kabul edilmez. Kullanıcıya Vercel paneline giriş isteği gönderildi. Ana sayfa dosyası değiştirilmedi.
