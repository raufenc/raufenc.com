# Video Stüdyosu — Proje Tanıtım Videoları

Her proje için **tek storyboard → iki doğal video**: yatay `1920×1080` ve dikey `1080×1920`.
Dikey sürüm yataydan kırpılmaz; motor aynı zaman çizelgesini dikey için yeniden yerleştirir
(metin üstte, telefon çerçevesinde mobil arayüz altta). Bu yüzden her sahne için hem masaüstü
(`d-*.jpg`) hem mobil (`m-*.jpg`) çekim sağlanır.

```
_video-studio/
  engine/            kompozisyon motoru (index.html, engine.js, engine.css, fontlar)
  lib/capture.mjs    çekim araç takımı (yerel site, CDN/karo yönlendirme, işaretler)
  lib/server.mjs     yerel statik sunucu (vercel.json rewrites dahil)
  lib/tiles.py       çevrimdışı harita karoları (Natural Earth)
  lib/audio.py       çalgısız efekt izi (geçiş, dokunma, sayaç, çan)
  render.mjs         storyboard → kontrol kareleri (--stills) ya da mp4
  projeler.json      slug ↔ proje bilgisi (data/projeler.js'ten)
  projects/<slug>/
    capture.mjs      çekim betiği (depoda tutulur, yeniden üretilebilir)
    storyboard.json  sahne metni ve çekim atamaları
    shots/           çekimler + marks.json (depoya girmez, capture.mjs ile üretilir)
    stills/          kontrol kareleri + temas sayfaları (depoya girmez)
videolar/<slug>/     yatay.mp4, dikey.mp4, kart.mp4 (sessiz önizleme), yatay.jpg, dikey.jpg
```

## Komutlar

```bash
cd _video-studio
node projects/<slug>/capture.mjs          # çekimleri al (shots/)
node render.mjs <slug> --stills           # kontrol kareleri: stills/_sayfa-h.jpg, _sayfa-v.jpg
node render.mjs <slug> --stills --fmt v --times 4.2,9.8   # belirli anlar
node render.mjs <slug>                    # tam video (yatay+dikey+kart+afiş) → ../videolar/<slug>/
node render.mjs --all --jobs 2 --skip-existing
```

## Sahne akışı (varsayılan süreler)

1. **hook** (2.7 sn) — merak uyandıran soru/iddia, büyük serif yazı, kelime kelime.
2. **intro** (3.1 sn) — simge, etiket(ler), proje adı, tek cümlelik vaat; cihaz girer.
3. **features** ×2–4 (her biri 2.9 sn) — numara, başlık, kısa açıklama; cihaz içinde gerçek ekran.
   Birden çok çekim verilirse sahne içinde sırayla geçer (dokunma → yeni ekran = etkileşim hissi).
4. **stats** (2.7 sn, isteğe bağlı) — 2–3 büyük sayaç; cihaz geri çekilir.
5. **cta** (3.6 sn) — simge, kapanış cümlesi, URL yazılarak belirir, kısa çipler.

Toplam ~18–23 sn. Son 0.55 sn arka plana kararır → kesintisiz döngü.

## storyboard.json şeması

```jsonc
{
  "slug": "islam-bilim-yildizlari",
  "title": "İslam Bilim Yıldızları",            // CTA üstündeki küçük başlık + intro varsayılanı
  "url": "raufenc.com/islam-bilim-yildizlari",   // tarayıcı adres çubuğu ve CTA
  "category": "Tarih & Medeniyet",               // sağ üst etiket (projeler.json → category)
  "emoji": "🌟",                                  // simge karosu (ya da "icon": "shots/logo.png")
  "tag": "Oyun",                                  // intro etiketi (projeler.json → tag)
  "accent": "#7c6cf0",                            // projenin kendi ana rengi (açık ton, L>45%)
  "accent2": "#c8a46e",                           // isteğe bağlı ikinci kürenin rengi
  "hook": { "kicker": "Biliyor muydun?", "lines": ["Krank milini", "ilk kim *kullandı?*"], "sub": "isteğe bağlı" },
  "intro": {
    "title": "İslam Bilim Yıldızları",            // "\n" ile satır bölünebilir; yoksa dengeli bölünür
    "tag2": "Ücretsiz",                           // isteğe bağlı ikinci etiket
    "tagline": "Endülüs'ten Orta Asya'ya **126 âlim** …",
    "shot": { "h": "shots/d-hero.jpg", "v": "shots/m-hero.jpg" },
    "phone": { "h": "shots/m-hero.jpg" }         // yalnız yatayda, tarayıcının yanında ikinci telefon
  },
  "features": [
    {
      "kicker": "3 oyun",                         // isteğe bağlı, numaranın yanında küçük etiket
      "title": "Bu Kim? İpucundan bul",
      "text": "İpuçlarından âlimi tahmin et …",
      "dur": 3.4,                                 // isteğe bağlı
      "shot": {
        "h": [ { "src": "shots/d-sinav.jpg", "taps": [ { "mark": "bukim", "t": 0.7 } ] },
               { "src": "shots/d-bukim.jpg", "zoom": { "x": 0.5, "y": 0.25, "s": 1.6, "s0": 1.45 } } ],
        "v": [ { "src": "shots/m-sinav.jpg", "taps": [ { "mark": "bukim", "t": 0.7 } ] },
               { "src": "shots/m-bukim.jpg" } ]
      },
      "zoom":   { "h": { "mark": "map", "s": 1.35 } },        // tek çekimli sahnede kısa yol
      "scroll": { "v": [0, 0.55] },                            // uzun (tallShot) çekimde kaydırma oranı
      "callout": { "h": { "text": "39 âlim · Irak / Bağdat", "emoji": "📍", "x": 0.3, "y": 0.2 } }
    }
  ],
  "stats": { "kicker": "Rakamlarla", "items": [ { "value": 126, "label": "Âlim" }, { "value": "7–19", "label": "Yüzyıl" } ] },
  "cta": { "lines": ["İlmin yıldızlarını", "*keşfet*"], "chips": ["Ücretsiz", "Kayıt gerekmez"] },
  "_kaynak": { "126 âlim": "islam-bilim-yildizlari/data/bilginler.js (BILGINLER.length)" }
}
```

Biçim farkı: herhangi bir alan `{ "h": …, "v": … }` olarak verilebilir. `shot`, `zoom`, `scroll`,
`taps`, `lines`, `text`, `tagline` diğer biçime düşer; `phone` ve `callout` düşmez (yalnız verildiği biçimde).

Metin işaretleri: `*vurgu*` → altın italik, `**kalın**` → beyaz kalın.

Çekim öğesi alanları: `src`, `taps: [{x,y,t} | {mark,t,dx,dy}]` (t: öğe süresinin oranı),
`zoom: {x,y,s,s0,from,to} | {mark,s}`, `scroll: [başlangıç, bitiş]` (0..1, uzun çekimde),
`frame: "browser"|"phone"|"card"` (varsayılan: en-boy oranı ≥1 → tarayıcı, değilse telefon;
`card` = çerçevesiz yuvarlak kart, öğe/bileşen çekimleri için), `fit: "contain"`, `alignX`, `alignY`.

Callout konumu cihazın kendisine göredir (`x`,`y` 0..1, merkez noktası).

## Çekim araç takımı

```js
import { withStudio } from '../../lib/capture.mjs';
await withStudio(import.meta.url, async ({ desktop, mobile, tablet, shot, tallShot, mark, hide, settle, origin }) => {
  const p = await desktop('/islam-bilim-yildizlari/');   // 1440×900 @2x, koyu tema, tr-TR
  await hide(p);                                          // #rauf-nav'ı gizle (varsayılan)
  await shot(p, 'd-hero.jpg');                            // shots/d-hero.jpg
  await mark(p, 'd-hero.jpg', { start: '.btn-primary' }); // shots/marks.json'a öğe merkezi
  await p.click('.btn-primary'); await p.waitForTimeout(600);
  await shot(p, 'd-oyun.jpg');
  const m = await mobile('/islam-bilim-yildizlari/');     // 390×844 @2x, dokunmatik, iPhone UA
  await tallShot(m, 'm-uzun.jpg', { maxScreens: 3 });     // kaydırma sahnesi için uzun çekim
});
```

- Site yerel sunucudan açılır. Engelli CDN'ler (unpkg/leaflet, d3, fuse, firebase, pdfmake, tailwind)
  yerel kopyalardan, harita karoları yerel karo sunucusundan, muallimo görselleri raw.githubusercontent
  üzerinden gelir. Google Fonts çalışır. `/api/*` (Gemini vb.) **çevrimdışıdır** → yapay zekâ yanıtı
  gerektiren ekranları gösterme; Firebase'e bağlı canlı veriler de gelmez.
- Sayfalar `colorScheme: dark` ile açılır; site temasını `localStorage` ile değiştirmek gerekirse
  `p.evaluate(() => localStorage.setItem(...))` + `p.reload()` kullan.
- Oyunlarda gerçek etkileşim yap (tıkla, seç, cevapla) ve ara durumları çek. Rastgelelik varsa
  makul bir duruma gelene kadar dene. Gerekirse `p.emulateMedia({ reducedMotion: 'reduce' })`.

## Kalite çıtası (zorunlu)

**Metin**
- Türkçe, doğru imla ve şapkalar (âlim, İslâm/İslam — sitenin kullandığı yazımı izle), doğal ve vurucu.
- Kanca: soru ya da şaşırtıcı iddia; satır başına ≤ 3–4 kelime, en çok 3 satır.
- Özellik başlığı ≤ ~28 karakter; açıklama ≤ ~110 karakter, tek cümle.
- **Her sayı ve iddia projenin kendi kaynağından doğrulanır** (veri dosyası, kod, sayfadaki sayaç).
  `data/projeler.js` açıklamaları eskimiş olabilir (ör. "85 âlim" yazıyor, gerçek veri 126) — gerçeği kullan.
  Doğrulama yolunu `_kaynak` alanına yaz.
- Abartı ve doğrulanamayan nitelik yok ("en iyi", "binlerce kullanıcı", "yapay zekâ destekli" — gerçekse olur).
- Dinî içerikte saygılı dil; sitenin kullandığı hitap ve yazımlar (Hz. Peygamber (s.a.v.) vb.);
  âyet/hadis anlamını değiştirme, uydurma alıntı yapma.

**Görüntü**
- Çekimlerde: yükleniyor ekranı, boş durum, hata, kırık görsel, yarım animasyon, imleç, çerez/izin
  bandı, üst üste binen gezinme düğmesi olmasın. Her çekimi `Read` ile aç ve gözle kontrol et.
- Mobil çekimde yatay taşma (sağdan kesilen metin) varsa o ekranı kullanma; durumu raporla.
- Kontrol karelerinde: yazı taşması/kesilmesi, cihazla metin çakışması, okunmaz ekran, yanlış yere
  düşen dokunma halkası, önemli içeriği örten callout olmamalı. Hem `_sayfa-h.jpg` hem `_sayfa-v.jpg`.
- Sahne başına en az bir "canlı" an: dokunma → yeni ekran, yakınlaştırma ya da kaydırma.
- `accent` projenin kendi arayüz rengi olmalı; çok koyu renkleri açık tonuna çek.

## Yapma
- Proje dosyalarını (site kodu) değiştirme. Yalnız `_video-studio/projects/<slug>/` altında çalış.
- Motoru/kitaplığı değiştirme; ihtiyaç varsa raporla.
- Tam video render etme (toplu render ayrıca yapılır); yalnız `--stills`.

## Seslendirme (Higgsfield · Rauf Enç'in kendi sesi)

Ses: **"Rauf Enç (stüdyo)"** — `voice_type: "element"`, `voice_id: "07dc6e06-fe1a-45a1-9664-ed2d1bde3d65"`,
model **`elevenlabs_v4`**, `stability: 0.35`. Cümle başına bir üretim (cümle süresi sahne süresini belirler).
Pilot: `projects/islam-bilim-yildizlari/vo.json`.

**vo.json** satırları sahne sırasıyla: `hook`, `intro`, `feature` (i: 0,1,2…), varsa `stats`, `cta`.
Yazım kuralları:
- Konuşma dili; ekrandaki yazının kopyası değil, onu tamamlayan tek cümle. Sahne başına 2–4 sn
  (≈ 25–50 karakter; intro en çok ~70). Toplam konuşma ≤ ~24 sn.
- Sayılar **yazıyla** ("yüz yirmi altı"), kısaltmalar açık ("Hazreti", "yapay zekâ"), adres
  "Rauf Enç nokta kom" (ör. CTA: "… keşfet: Rauf Enç nokta kom.").
- Noktalama ritmi belirler: virgül kısa duraklama, nokta/soru işareti cümle sonu.
- Dinî içerikte saygılı hitap; âyet/hadis meali uydurma.

**Üretim** (MCP araçları):
```
generate_audio_batch  requests[i].params = { model: "elevenlabs_v4", stability: 0.35,
  dialogue: [{ text, voice_type: "element", voice_id: "07dc6e06-fe1a-45a1-9664-ed2d1bde3d65" }],
  prompt: "<slug>-<n>" }          # aynı anda en çok 4 istek; 429 alırsan bekleyip tekrar dene
jobs_wait → result_url
```
**Denetim:** `sandbox_exec` içinde (internet var) faster-whisper ile yazıya dök, metinle karşılaştır;
anlamı bozulan, yutulan ya da yanlış vurgulanan cümleyi yeniden üret (en çok 3 deneme):
```
curl -sfL -o a.mp3 <url> && python3 -c "from faster_whisper import WhisperModel; m=WhisperModel('small',device='cpu',compute_type='int8'); print(' '.join(s.text for s in m.transcribe('a.mp3',language='tr')[0]))"
```
**Kayıt:** sonuçları `[{slug,n,job,url}]` olarak bir JSON dosyasına yaz →
`node vo.mjs isle <dosya>` → `node vo.mjs indir <slug>` (kırpar, süreyi yazar) →
`node render.mjs <slug> --stills` ile zamanlamayı kontrol et.
