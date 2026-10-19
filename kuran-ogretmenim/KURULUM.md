# Kur'an Öğretmenim — giriş sitesi

Bu klasör, kuranogretmenim.com'daki Flutter uygulamasının önüne konacak
giriş (tanıtım) sitesidir. Tamamen statiktir: `index.html`, `stil.css`,
`site.js` ve `assets/`. Hiçbir derleme adımı yoktur.

Şu an `raufenc.com/kuran-ogretmenim/` adresinde yayınlanır. Nihai yeri
`kuranogretmenim.com` kök dizinidir.

## kuranogretmenim.com'a taşıma (3 adım)

1. **Flutter uygulamasını `/app/` altına alın.**
   `flutter build web --base-href /app/` ile derleyin; çıktıyı deponun
   `app/` klasörüne koyun. Böylece uygulama `kuranogretmenim.com/app/`
   adresinde çalışır.
2. **Bu klasörün içeriğini deponun köküne kopyalayın** (`index.html`,
   `stil.css`, `site.js`, `assets/`).
3. **Adresleri güncelleyin.** Üç dosyada arama-değiştirme yeterlidir:
   - `index.html`: `https://raufenc.com/kuran-ogretmenim/` → `https://kuranogretmenim.com/`
     (canonical, og:url, og:image, twitter:image, JSON-LD image)
   - `index.html`: `https://kuranogretmenim.com/` olan uygulama bağlantıları
     (`Uygulamayı Aç`, `Hemen Başla`, modül kartları) → `/app/`
   - `site.js`: `SES_KOKU` → `/app/assets/assets/sounds/harfler/`

Ardından köke şu iki dosyayı ekleyin:

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

## Uygulamada düzeltilmesi gereken, bu sitede fark edilen eksik

Sunucuda Türkçe karakterli dört ses dosyası yok (muhtemelen derleme
sırasında dosya adları bozuldu): `ğayn.mp3`, `şin.mp3`, `tıy.mp3`,
`zıy.mp3`. Uygulamada da bu dört harfin sesi çalmaz. Dosyaları ASCII
adla (`gayn`, `sin2`, `tiy`, `ziy`) yeniden ekleyip Dart tarafındaki
yolları güncellemek yeterli. Düzelince `site.js` içindeki `HARFLER`
dizisinde `null` olan dört girdiye yeni dosya adları yazılır.

## Varlıklar

- `assets/video/tanitim.mp4|webm` — uygulamanın gerçek ekranından
  kaydedilmiş 50 saniyelik tur (720×1558). Yeniden üretmek için
  Playwright üzerinden 2× ekran görüntüsü dizisi olarak alınıp donuk kareler kısaltılmıştır.
- `assets/ekran/*.webp` — uygulamadan 2× ekran görüntüleri.
- `assets/img/hero-*.webp`, `mushaf`, `cami`, `cocuklar`, `aile`, `desen` —
  üretilmiş görseller (gerçek kişi veya yer değildir).
- `assets/img/og.jpg` — paylaşım görseli 1200×630.
