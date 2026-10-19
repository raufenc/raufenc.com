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
- `app/` — kuranogretmenim.com'daki Flutter web derlemesinin birebir
  kopyası (52 MB). Yalnız `app/index.html` içindeki `<base href>` ve
  `app/manifest.json` içindeki `start_url` bu yola göre değiştirildi.
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
3. **Adresleri güncelleyin.** Üç dosyada arama-değiştirme yeterlidir:
   - `index.html`: `https://raufenc.com/kuran-ogretmenim/` → `https://kuranogretmenim.com/`
     (canonical, og:url, og:image, twitter:image, JSON-LD image)
   - `index.html` ve `site.js` içindeki `./app/` bağlantıları zaten
     göreli olduğundan değişmez.

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

## Uygulamada düzeltilmesi gereken, bu paket hazırlanırken fark edilen eksik

Uygulamanın varlık listesinde 992 dosya var; bunların 152'si canlı
sunucuda yok (hepsi adında Türkçe karakter ya da boşluk olan dosyalar:
ör. `ğayn.mp3`, `şin.mp3`, `tıy.mp3`, `zıy.mp3`, `üstün aciklamasi.mp3`,
`asar aciklama.mp3`, `kırmızı ayakkabı.png`). Bu yüzden canlı uygulamada
dört harfin sesi, ders anlatımlarının tamamı ve bazı alıştırma sesleri
çalmaz. Çözüm: dosya adlarını ASCII yapıp (`gayn`, `ustun_aciklamasi`
gibi) Dart tarafındaki yolları güncellemek ve yeniden derlemek. Eksik
dosyaların tam listesi: `eksik-dosyalar.txt`. Düzelince `site.js`
içindeki `HARFLER` dizisinde `null` olan dört girdiye yeni dosya adları
yazılır.

## Varlıklar

- `assets/video/tanitim.mp4|webm` — uygulamanın gerçek ekranından
  kaydedilmiş 40 saniyelik tur (720×1558). Yeniden üretmek için
  Playwright üzerinden 2× ekran görüntüsü dizisi olarak alınıp donuk kareler kısaltılmıştır.
- `assets/ekran/*.webp` — uygulamadan 2× ekran görüntüleri.
- `assets/img/hero-*.webp`, `mushaf`, `cami`, `cocuklar`, `aile`, `desen` —
  üretilmiş görseller (gerçek kişi veya yer değildir).
- `assets/img/og.jpg` — paylaşım görseli 1200×630.
