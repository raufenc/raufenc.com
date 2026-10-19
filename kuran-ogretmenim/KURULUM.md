# Kur'an Öğretmenim — giriş sitesi

Bu klasör, kuranogretmenim.com'daki Flutter uygulamasının önüne konacak
giriş (tanıtım) sitesidir. Tamamen statiktir: `index.html`, `stil.css`,
`site.js` ve `assets/`. Hiçbir derleme adımı yoktur.

Şu an `raufenc.com/kuran-ogretmenim/` adresinde yayınlanır; uygulamanın
derlenmiş kopyası da `app/` altında aynı pakette gelir
(`raufenc.com/kuran-ogretmenim/app/`). Nihai yeri `kuranogretmenim.com`
kök dizinidir.

## Paket içeriği

- `index.html`, `stil.css`, `site.js`, `assets/` — giriş sitesi (3,7 MB)
- `dersler/` — 16 elifba dersinin kendi sayfası (sesli anlatım, dokun-dinle
  kartları). `sinif/` — akıllı tahta için Sınıf Modu: aynı kartlar büyük,
  sırayla okutma, tam ekran. Veri `sinif/dersler.json` (uygulamanın ders
  listelerinden çıkarıldı; sesler `app/` altındaki dosyalardır).
- `kuran/` — sesli Kur'ân-ı Kerîm okuyucusu: dizin + 114 sûre sayfası.
  Metin ve üç meâl `kuran/veri/*.json` içindedir (4,4 MB, uygulamanın
  kendi verisinden). Sesli okuma everyayah.com'dan âyet âyet çekilir
  (çevrimiçi gerekir); `okuyucu.js` içindeki `SES_KOK` değiştirilerek
  kendi sunucunuza alınabilir (dosya adı düzeni `SSSAAA.mp3`).
- `dualar/` — 13 namaz duası; metin, okunuş, meâl ve satır zamanlamaları
  `dualar/veri.json` içinde. Sesler `app/.../sounds/dualar/`.
- `tecvid/` — 4 bölüm, 17 kural sayfası; örnek sesleri `app/.../sounds/tecvidler/`.
  Üreten betikteki metinler uygulamadan çıkarılıp sadeleştirildi.
- `oyunlar/` — üç tarayıcı oyunu; `sinif/dersler.json` verisini kullanır.
- Sayfalar statik üretilmiştir (Python betikleri bu pakette değildir;
  içerik değişikliği doğrudan HTML'de yapılır). Tüm sayfalar aynı
  `stil.css` ve üst menüyü kullanır; tasarım değişkenleri `stil.css`
  başındaki `:root` bloğundadır.
- `sw.js`, `site.webmanifest` — çevrimdışı çalışma ve "ana ekrana ekle".
  Giriş sitesi, sınıf modu ve uygulama çekirdeği ilk açılışta cihazda
  saklanır; sesler ilk dinlendiğinde kalır. Sürüm değişince `sw.js`
  içindeki `SURUM` değeri artırılır.
- `app/` — kuranogretmenim.com'daki Flutter web derlemesinin birebir
  kopyası (52 MB). `app/index.html` içinde `<base href>`, logolu açılış
  ekranı ve service worker kaydı; `app/manifest.json` içinde `start_url`
  bu yola göre değiştirildi. `app/logo.png` 1,1 MB'tan 86 KB'a indirildi.
- Vercel için gerekli başlıklar (içerik güvenlik politikası, önbellek) ve
  yönlendirmeler depo kökündeki `vercel.json` dosyasında
  `/kuran-ogretmenim/...` kurallarıdır.

## kuranogretmenim.com'a taşıma (3 adım)

1. **Flutter uygulamasını `/app/` altına alın.**
   `flutter build web --base-href /app/` ile derleyin; çıktıyı deponun
   `app/` klasörüne koyun. Böylece uygulama `kuranogretmenim.com/app/`
   adresinde çalışır.
2. **Bu klasörün içeriğini deponun köküne kopyalayın** (`index.html`,
   `stil.css`, `site.js`, `assets/`).
3. **Adresleri güncelleyin.** Bütün sayfalarda arama-değiştirme yeterlidir:
   - `https://raufenc.com/kuran-ogretmenim/` → `https://kuranogretmenim.com/`
     (canonical, og:url, og:image, JSON-LD; `index.html`, `kuran/`, `dualar/`,
     `tecvid/`, `oyunlar/`, `dersler/`, `sinif/` altındaki HTML dosyaları)
   - `sw.js` içindeki `KOK = '/kuran-ogretmenim/'` → `'/'`;
     `site.webmanifest` içindeki `start_url` ve `scope` da `/` olur.
   - Sayfa içi `./app/`, `../app/` bağlantıları göreli olduğundan değişmez.

Ardından köke `robots.txt` ekleyin ve bu depodaki `sitemap.xml` içinden
`/kuran-ogretmenim/` ile başlayan adresleri (toplam 154) yeni alan adıyla
kendi `sitemap.xml` dosyanıza taşıyın:

```
# robots.txt
User-agent: *
Allow: /
Sitemap: https://kuranogretmenim.com/sitemap.xml
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://kuranogretmenim.com/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://kuranogretmenim.com/app/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>
```

## Eksik sesler bu pakette tamamlandı

Orijinal sunucuda adında Türkçe karakter ya da boşluk olan 150 dosya yoktu
(liste: `eksik-dosyalar.txt`). Bunların uygulama kodunda gerçekten
çağrılan 102'si bu pakette yeniden üretildi ve `app/main.dart.js`
içindeki yollar ASCII adlara çevrildi (ör. `üstün aciklamasi.mp3` →
`uestuen_aciklamasi.mp3`). Kaynaklar:

- 15 ders anlatımı: Türkçe metinler yeniden yazılıp seslendirildi
  (`app/assets/assets/sounds/aciklamalar/`).
- 77 harf, hece, kelime ve alıştırma okunuşu: Arapça metinden
  seslendirildi.
- 10 tecvid örneği: Mahmud Halil el-Husarî kıraatinden ilgili âyet-i
  kerîme kesitleri (everyayah.com). Bakara 8, 11, 173 ve 225'te kesit,
  âyetin tamamına yakın.

Kodda hiç çağrılmayan 45 dosya üretilmedi; uygulama bunları
kullanmıyor. Kaynak kod gelirse `ses-eslestirme.json` dosyasındaki
eski→yeni ad tablosu ile Dart tarafı güncellenir.

## Varlıklar

- `assets/video/tanitim.mp4|webm` — uygulamanın gerçek ekranından
  kaydedilmiş 40 saniyelik tur (720×1558). Yeniden üretmek için
  Playwright üzerinden 2× ekran görüntüsü dizisi olarak alınıp donuk kareler kısaltılmıştır.
- `assets/ekran/*.webp` — uygulamadan 2× ekran görüntüleri.
- `assets/img/hero-*.webp`, `mushaf`, `cami`, `cocuklar`, `aile`, `desen` —
  üretilmiş görseller (gerçek kişi veya yer değildir).
- `assets/img/og.jpg` — paylaşım görseli 1200×630.
