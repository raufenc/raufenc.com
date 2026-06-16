# raufenc.com — PREMIUM DENETİM RAPORU
**Tarih:** 2026-06-16
**Yöntem:** 86 ajanlı çok-aşamalı denetim (49 tarama birimi → çekişmeli doğrulama → sentez). Salt-okunur.
**Bulgu:** 403 toplam, 32 doğrulanmış hata.

---

Bu denetim raporu için sentez yapacağım. Bulguları tipine ve önceliğe göre gruplandırarak eyleme dönük bir onarım planı hazırlıyorum.

# raufenc.com PREMIUM DENETİM — ONARIM PLANI

*Tüm bölümlerin doğrulanmış bulgularından sentezlenmiştir. Her madde mümkün olduğunca `dosya:satır` ile bağlanmıştır. Denetim salt-okunurdu; hiçbir dosya değiştirilmedi.*

---

## 1. DOĞRULANMIŞ SIFIR-HATA DÜZELTMELERİ (güvenli, mekanik)

Bunlar `confirmed===true` olan, kullanıcıya yansıyan GERÇEK bozukluklardır. Tipe göre gruplanmıştır.

### A) KIRIK LİNK / KIRIK ASSET / 404

| # | Dosya:satır | Sorun | Düzeltme |
|---|---|---|---|
| A1 | `sunumlar/bilim/index.html:442` | Nav-logo `href="/bilim"` → 404 (klasör yok, vercel.json rewrite yok). Canlı `curl /bilim` = 404 doğrulandı. | `href="/sunumlar/bilim/"` yap. |
| A2 | `kayi-atlasi/index.html:42` | Hero arka plan görseli Wikimedia `Tughrul_I_map.svg` → thumb 400, taban 404 (canlı UA ile doğrulandı). | Wikimedia URL'ini CSS'ten kaldır (yalnız gradient bırak) **veya** repoya yerel `kayi-atlasi/hero.jpg` ekle. Uzak kaynağa bağımlı kalma. |
| A3 | `arapca-kelime/sounds/169.wav` (eksik) | `veri.js:1117` `169.wav` referansı var, dosya yok (224 webp / 223 wav). Ses düğmesi sessizce 404. | Eksik `169.wav`'ı diğer kliplerle aynı formatta üret ve ekle. Üretilemezse `veri.js:1117`'deki `ses` alanını sil. |
| A4 | `ingilizce-kelime/sounds/Baby.wav` (eksik) | `veri.js:854` `Baby.wav` dolu, dosya yok → ölü ses düğmesi (404 sessiz yutuluyor). | `Baby.wav` üret ve ekle. Üretilemezse `veri.js:854`'teki `ses` alanını sil. **Paylaşılan `lib/kelime-app/app.js`'e DOKUNMA.** |

### B) CSP İHLALİ

| # | Dosya:satır | Sorun | Düzeltme |
|---|---|---|---|
| B1 | `sinav/index.html:31` | `cdn.jsdelivr.net/npm/qrcode@1.5.3` — jsdelivr allowlist'te DEĞİL. QR kodu canlıda hiç üretilmez. **NOT:** Bu bölüm şu an deploy edilmemiş (canlı 404); yine de deploy edilmeden ÖNCE düzeltilmeli. | En basit allowlist-uyumlu çözüm: satırı `<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.1/qrcode.min.js" defer></script>` yap (cdnjs izinli, aynı UMD `window.QRCode.toCanvas` API'si, 200 + `toCanvas` doğrulandı). jsdelivr `build/qrcode.min.js` artık 404 olduğu için orijinal self-host indirme komutu çalışmaz. |

### C) BOZUK / TANIMSIZ JS (runtime hatası)

| # | Dosya:satır | Sorun | Düzeltme |
|---|---|---|---|
| C1 | `islam-bilim-yildizlari/js/alimler.js:31-33` | `BOLGE_EMOJI` hiç tanımlı değil + `BOLGELER` bir DİZİ olduğu halde obje gibi kullanılıyor → `buildFilters()` ReferenceError fırlatır, `render()` hiç çalışmaz → **Keşfet sayfasında sıfır kart**. | `BOLGELER` dizi şekline geç: `const bolgeler = [...BOLGELER].sort((a,b)=>b.bilginIds.length-a.bilginIds.length)`, butonlar `bo.isim`/`bo.emoji`/`bo.bilginIds.length` ile kur; `render()`'da `const aktifBolge=BOLGELER.find(x=>x.isim===filterBolge); if(filterBolge && !aktifBolge?.bilginIds.includes(b.id)) return false;`. `BOLGE_EMOJI` referansını kaldır. |
| C2 | `islam-bilim-yildizlari/js/harita.js:12-15` | Aynı kök neden → harita karoları görünür ama **hiçbir âlim işaretçisi/cluster eklenmez**. | `const bk=[...BOLGELER].sort((a,b)=>b.bilginIds.length-a.bilginIds.length).slice(0,6)`; `#map-stats` `bo.emoji`/`bo.bilginIds.length`/`bo.isim` ile kur. `BOLGE_EMOJI` kaldır. |
| C3 | `endulus/index.html:970` | `isContinue` dalında `onclick="handleChoice(${JSON.stringify(choices[0])})"` — kaçırılmamış çift tırnak `onclick` attribute'unu kırar; **tek-seçenekli "Devam →" butonları çalışmaz**, oyun ilerleyemez. | `escapeJson(choices[0])` kullan (çok-seçenekli dalla aynı): `onclick="handleChoice(${escapeJson(choices[0])})"`. |
| C4 | `davetmektubu/index.html:3085` | WhatsApp fallback `window.open(\`...${...},"_blank"\`)` — kapanış backtick'i `,"_blank"`'ten sonra; masaüstü paylaşımda bozuk URL açılır. | İkinci argümanı backtick dışına al: `setTimeout(()=>window.open(\`https://wa.me/?text=${encodeURIComponent(text)}\`,"_blank"),500);` |

### D) VERİ ANAHTARI / RENDER SÖZLEŞMESİ UYUŞMAZLIĞI — `/tarih/` (sistemik, yüksek etki)

> `_build` pipeline çıktısı ile runtime renderer'lar arasındaki alan-adı uyuşmazlığı. **En yüksek etkili grup.** Düzeltmeler `caution` çünkü temiz çözüm renderer yamamak yerine pipeline'ı yeniden üretmek olabilir — `app.js` ile yeniden üretilen JSON senkron kalmalı.

| # | Dosya:satır | Sorun | Düzeltme |
|---|---|---|---|
| D1 | `tarih/app.js:568-581` | `renderEntry()` gövdeyi yalnız `body/content/sections[].text/text`'ten kuruyor; 5/6 ansiklopedinin metni başka alanda → **~1360 maddenin gövdesi tamamen boş** (peygamberler→`full_text`, bilim-adamlari→`body_text`, ansiklopedi→`full_text`, kultur/devletler→`article_text`, osmanli-tarihi→`content_text`+`sections[].text`). | Fallback zincirini genişlet; `sections` dalını yalnız bölümler gerçekten metin taşıyorsa (`sections.some(s=>s.text||s.content)`) öncelikli yap, aksi halde `full_text||article_text||body_text||content_text` tam-metnine düş. |
| D2 | `tarih/dynasty-explorer.js:23,139,157` | `dynasty.name`/`dynasty.db` okunuyor ama 88 öğede yalnız `title`/`id` var → **88 boş-isimli hanedan satırı, A-Z sıralama çalışmaz, her link `/tarih/undefined/<slug>` → 404**. | init'te normalize et: `{name:d.title, db:(d.id||'').split('-')[0], slug:d.slug, dates:d.dates, rulers:d.rulers||[]}`. (Tüm id'ler `devletler-` ön ekli, `data/devletler/<slug>.json` mevcut.) **Ruler linkleri ekleme** — ruler nesnelerinde `slug` yok. |
| D3 | `tarih/timeline-engine.js:284` | Link `/tarih/${item.db}/${item.slug}` ama `slug` yok (811/811) → **811 Kronoloji linki kırık**. | Render'da türet: `const slug=item.slug || (item.entry_id||'').replace(new RegExp('^'+item.db+'-'),'')`. (811/811 dosya mevcut doğrulandı.) |
| D4 | `tarih/map-engine.js:191-203` | `place.entries` öğeleri obje sanılıyor ama düz STRING id (`'bilim-adamlari-aksemseddin'`), `place.db` yok → **75 konumda popup linkleri boş metin + `/tarih//undefined`**. | String id'yi ayrıştır — **`split('-')[0]` YANLIŞ** (db'ler tire içerir: `bilim-adamlari`, `osmanli-tarihi`). Bilinen db öneklerine göre eşle: `Object.keys(APP.databases).find(k=>id===k||id.startsWith(k+'-'))`, `slug=id.slice(db.length+1)`, `href=/tarih/${db}/${slug}`. |

### E) İÇERİK/SAYI TUTARSIZLIĞI (statik metin, güvenli)

> Aynı şey için sayfada birden fazla çelişen rakam — hepsi `confirmed===true`. Salt metin düzeltmesi.

| # | Dosya:satır | Yanlış → Doğru |
|---|---|---|
| E1 | `noroterbiye/sozluk/index.html:59,78` | Placeholder kaydı filtresiz render → sahte "Terim" kartı, "Kategori" filtre butonu, sayaç 132. **Düzeltme:** `const REAL = SOZLUK_DATA.filter(t=>t.id!=='ID')` tanımla, tüm `SOZLUK_DATA` kullanımlarını `REAL`'e çevir (kardeş dosya deseni). → 131 |
| E2 | `noroterbiye/kisa-bilgiler/index.html:64,83` | Aynı placeholder sızıntısı (id:'ID'). İKİ yere de `filter(k=>k.id!=='ID')` uygula (tema seti + grid/sayaç). → 85 |
| E3 | `noroterbiye/testler/kavram-quiz/index.html:29-31,41` | Ham `SORU_BANKASI_DATA` init'e geçiyor → ~%10 olasılıkla placeholder "Soru" gösterilir. **En sağlam:** `test-engine.js KavramQuiz.init` başına `sorular.filter(s=>s.id!=='Soru ID' && s.tema!=='Tema')` (4 çağrı noktasını tek yerden korur). |
| E4 | `noroterbiye/js/common.js:105-109` (`getGununKavrami`) | `seed % data.length` placeholder dahil seçim → yılda ~3 gün ana sayfada "Terim/Basit Tanım". Fonksiyon başına `const real=(data||[]).filter(d=>d&&d.id!=='ID'&&d.terim!=='Terim')` ekle, `real`'den döndür. |
| E5 | `beyin-ve-yapay-zeka/index.html:459-481` | "Alan Dağılımı" SVG: Nörobilim 32/%64→**35/%70**; Bilişsel 7→**6**; Matematik 6→**7**; Dilbilim 3→**2**. |
| E6 | `beyin-ve-yapay-zeka/index.html:444-446` | "20 Doğrudan Tarihsel"→**19**; "14 Paralel Keşif"→**17**; "7 Formal" doğru. Hero'ya DOKUNMA (20/14 orada yok). |
| E7 | `beyin-ve-yapay-zeka/index.html:433` | "9 Kategori"→**11** (DATA 11 distinct `kat`, KAT_META 11). |
| E8 | `davetmektubu/index.html:2298` | Hero "81 mektup"→**82** (`MEKTUPLAR`=82, og/twitter/prototip hep 82). |
| E9 | `iho-oyunlar/index.html:9,175` | meta desc "29" / hub-count "31" → her ikisi **33** (gerçek kart sayısı; "4 kategori" doğru). |
| E10 | `kayi-atlasi/index.html:350,393,394` | `loc.not_` → `loc.not` (215/215 kayıtta editoryal not hiç görünmüyor). |
| E11 | `kayi-atlasi/index.html:463` | `DATA.locations.length - 2` → `DATA.locations.length` (sayaç 213 yerine 215). |
| E12 | `kayi-atlasi/index.html:639-655` | `fetch('data.json')` `.catch` yok → veri yüklenmezse sessiz boş sayfa. `r.ok` kontrolü + görünür hata mesajı veren `.catch` ekle. |
| E13 | `ingilizce-kelime/veri.js:984-989` | "Red(1)" çöp kaydı (boş anlam + eksik ses) — tüm nesneyi sil; gerçek "Red" (990-995) kalsın. → "Renkler & Şekiller" 14. |
| E14 | `kayi/index.html:2363-2372,2499,2600` | Hero "51/57/40" → gerçek **48 olay / 44 kişi / 34 mekân**; section-desc "57"/"40" de güncelle. |
| E15 | `muallimo/index.html` hero + meta | "2.199 kart" → gerçek **2.197** (676+443+250+398+130+300). Önce kart sayımını teyit et. |
| E16 | `sunumlar/index.html:157` + `sunumlar/bilim/index.html:7` | "56 slayt" → **64** (deck UI 1/64 kullanıyor). |
| E17 | `islam-bilim-yildizlari/alimler.html:20` + `data/basarimlar.js:5` | "85" → **126** (gerçek âlim sayısı; index.html doğru). |
| E18 | `tarih/app.js:262-269` + `tarih/index.html:9,15,140` | Hardcoded "2.765+" → gerçek **1.844** (67/127/895/178/95/482). Ana sayfa "ansiklopedi 1717" derken index "895" diyor — görünür çelişki. |
| E19 | `islami-egitim/index.html:176-177` | "Kalp ve Nefis 120 (%11.7)" → **%11.8** (120/1021). |
| E20 | `deneme/index.html:2041` | Bento numaraları bozuk (01,02,04,03,05,07,06) → görünür sıraya göre ardışık (01-07). |

---

## 2. ERİŞİLEBİLİRLİK (WCAG AA) — tipe göre

### 2.1 Klavyeyle erişilemez tıklanabilir `<div>` (en yaygın, yüksek etki)
Birincil etkileşim öğelerinin `<div onclick>` olması, `role`/`tabindex`/`keydown` olmadan — klavye ve ekran okuyucu kullanıcıları için kritik. **Ortak çözüm:** `role="button" tabindex="0"` + `keydown(Enter/Space)` delegasyonu (veya gerçek `<button>`/`<a>`).

- `kalbinin-haritasi/index.html:800,751,910` — quiz cevap şıkları + test kartları (testin tek etkileşimi; **high**)
- `islam-alimleri/app.js:139-141,358,392,419` — scholar/timeline/map/popup kartları
- `iho-oyunlar/index.html:202-449` — 33 oyun kartı
- `evliyalar/js/app.js:193-203,265,334` — scholar/timeline/silsile kartları
- `yz-prompt-rehberi/index.html:425,484,494` — chapter/glossary/concept/tool kartları
- `muallimo/index.html:594,638,773` — seri/cilt/grid kartları
- `osmanli-kartlari/index.html:432,667,1193,726` — mod-card/kart-wrap/jp-cell/tl-item
- `5sinif` (zaten kapsamlı), `7sinif/3/adres-sor.html:98` — opt div (ka.html/saat.html `<button>` kullanıyor; tutarsızlık)
- `sevgili-peygamberim/index.html:426,791,824` — tl-content/place-card/pc (`.se-header` doğru kalıbı kullanıyor)
- `ai-atlasi/script.js:79` — cat-card; `dkab/js/components/chapter-view.js:209` — galeri büyütücü
- `kayi-atlasi/index.html:535` — timeline kartları; `maarif/pages.js:32,496` — concept kartları
- `tarih-atlasi`, `hilal-scorm/index.html:666-672` (quiz şıkları, **high**), `scorm-balon` (zaten button + yanlış `role="listitem"`)
- `ogrenim`, `islam-ahlaki`, `kalbinin-haritasi` modalları, `arapca-kelime/index.html` sekmeleri

### 2.2 Etiketsiz form alanları (yalnız placeholder / `<label>` `for` yok)
Placeholder erişilebilir ad değildir (WCAG 1.3.1/4.1.2). **Ortak çözüm:** `aria-label` ekle veya `<label for=id>` bağla.

- İletişim formları: `index.html:2071-2080`, `deneme/index.html:2204`, `dkab/class-selector.js:34`
- Arama input'ları: `beyin-ve-yapay-zeka:722`, `evliyalar:55`, `imam-buhari:70`, `islam-alimleri:51`, `ai-atlasi:87`, `davetmektubu:2554`, `arapca-kelime`, `osmanlica:480`, `lugat`, `tarih/app.js:760`, `mizac/app.js:446`, `maarif`, `yz-prompt-rehberi:129,174`, `islam-bilim-yildizlari/alimler.html:27`, `5sinif/app.js:2787`, `kayi:2603,2677`
- `<select>` etiketleri: `_alim-sablonu:64`, `imam-buhari:65`, `fatih-sultan-mehmed:65`, `tarih-atlasi:165`, `beyin-ve-yapay-zeka:796` (cmpA/cmpB), `5sinif` form `<label for>` (7 etiketin 0'ı bağlı)

### 2.3 İkon-yalnızca buton / emoji buton (erişilebilir ad yok)
**Ortak çözüm:** `aria-label` ekle (title yetersiz); aktif durum için `aria-pressed`.

- Tema butonları (🌙📜☀️): `imam-buhari:35-37`, `fatih-sultan-mehmed:35-37`, `_alim-sablonu:34`, `islam-bilim-yildizlari/shared.js:26`, `lugat:294` (aria-pressed)
- Kapatma/nav (×, ‹›): `osmanlica:510,518`, `muallimo:509,512,514`, `ingilizce-kelime:97`, `tarih-atlasi:128,159`, `fatih-sultan-mehmed:97`, `mizac/app.js:447`, `davetmektubu:2578` (favori, aria-pressed), `kayi/atlas` ikon butonları

### 2.4 Düşük kontrast (AA < 4.5:1) — özellikle açık tema
Birçok bölüm yalnız koyu tema için ayarlanmış; global nav açık tema toggle'ı sunduğu için açık modda metin okunamaz hale geliyor.

- `gizlilik/index.html:18,27,79` — `--warm` açık temada 2.15:1; veri-silme uyarısı `--muted` 2.09:1 (**high**)
- `islam-ahlaki/index.html:118-122` — yeşil/kırmızı feedback yalnız koyu tema (açık 1.29:1/1.71:1)
- `5sinif/style.css:14` — `--text-light #9CA3AF` 2.54:1 (~44 selektör) + `.bnav-item #888`
- `mizac/style.css:168` — `.kbd-hint` `--muted` 2.09/2.58:1 → `--muted2`
- `deneme:1577`, `erdem360/styles.css:611` (status-working amber 3.11:1), `evliyalar`, `sevgili-peygamberim` footer, `islam-alimleri:304`, `tarih/style.css:2164,1686`, `turk-sozluk`, `yz-prompt-rehberi:46`, `osmanli-kartlari` açık tema gold

### 2.5 Modal/dialog erişilebilirliği
`role="dialog"`/`aria-modal`/odak yönetimi/Escape eksik: `kalbinin-haritasi`, `evliyalar:182`, `kayi-atlasi:272`, `lugat` flashcard, `hilal-scorm`, `yz-prompt-rehberi:25` (aria-labelledby), `scorm-balon` (arka plan inert değil)

### 2.6 Başlık hiyerarşisi / lang / dir
- h-atlama: `index.html:1816` (kitap h3→h2), `5sinif`, `deneme`, `_alim-sablonu`, çeşitli araç sayfaları (`noroterbiye/araclar`), `imam-buhari:215`, `tarih-atlasi:42,69`, `yol-haritan:76`, `oku.html` (h1 yok), `turk-sozluk` (h1 yok), `islam-alimleri:47`
- `lang`/`dir`: `evliyalar/js/app.js:35` (TR↔UZ `<html lang>` güncellenmiyor), `7sinif` Arapça başlıklarda `lang="ar" dir="rtl"` yok, `islami-egitim` besmele, `kayi/atlas` dil yeniden-yükleme (bkz. D-benzeri `kayi-1`)

### 2.7 Görünür focus + `prefers-reduced-motion`
Çok yaygın eksik — global bir `:focus-visible` kuralı ve bir `@media (prefers-reduced-motion: reduce)` bloğu önerilir: `endulus`, `ai-atlasi`, `_alim-sablonu`, `imam-buhari`, `fatih-sultan-mehmed`, `hilal-scorm`, `kalbinin-haritasi`, `iho-oyunlar`, `evliyalar`, `kayi`, `sevgili-peygamberim`, `tarih-atlasi`, `noroterbiye`, `islam-bilim-yildizlari`, `ingilizce-kelime` (paylaşılan lib).

---

## 3. SEO

### 3.1 TOPLULAŞTIRILMIŞ: Eksik canonical / OG / Twitter / favicon
> **Bu, sitenin en yaygın tekrar eden eksiği.** Aşağıdaki ~25 bölüm/alt sayfada head meta eksikleri var. **Tek bir kanonik head bloğu** (root index.html veya mizac/ örneği) şablon alınıp her bölüme uyarlanmalı.

- **Favicon + OG + canonical hepsi eksik:** `beyin-ve-yapay-zeka`, `endulus`, `erdem360`, `islam-alimleri`, `islami-egitim`, `kayi-atlasi`, `ogrenim`, `tarih-atlasi`, `_alim-sablonu` (→ tüm âlim sayfaları), `imam-buhari`, `fatih-sultan-mehmed`, `sunumlar/*`, `hilal-scorm`, `iho-oyunlar`, `iho-oyunlar-2`, `7sinif`, `arapca-kelime`, `ai-atlasi`, `evliyalar`, `kalbinin-haritasi`, `osmanli-kartlari`, `osmanlica`, `muallimo`, `5sinif`, `dkab` (canonical), `islam-bilim-yildizlari` (7 sayfa), `noroterbiye` (61 alt sayfa canonical), `kayi/index.html`+`kayi/atlas`, `maarif`, `gizlilik` (og:image+twitter), `sevgili-peygamberim` (og:image:width/height+twitter), `scorm-balon`, `yz-prompt-rehberi/oku.html` (OG)
- **`_alim-sablonu` özel:** Düzeltme ŞABLONDA yapılmalı (yeni âlimlere otomatik geçer) **ve** mevcut `imam-buhari`/`fatih-sultan-mehmed` kopyalarına elle uygulanmalı.

### 3.2 JS-render edilen statik title/description (`_alim-sablonu` türevleri)
`imam-buhari/index.html:6-7` ve `fatih-sultan-mehmed/index.html:6-7`: `<title>Yükleniyor…</title>` + boş description; yalnız JS doldurur. Crawler/önizleme "Yükleniyor…" görür. → Şablona statik gerçek değer yaz.

### 3.3 sitemap.xml tutarsızlıkları
- `sitemap.xml:14` — `/meslek-pusulasi/` (307→`/yol-haritan/`) listeli; gerçek `/yol-haritan/` **hiç yok**. → `<loc>`'u `https://raufenc.com/yol-haritan/` yap.
- Sitemap'te eksik canlı sayfalar: `/mizac/` (`root-2`), `/endulus/`, `/erdem360/`, `/lugat/`, `/kayi/atlas/`, `/imam-buhari/`, `/fatih-sultan-mehmed/`, `islam-alimleri`. → Ekle.
- `vercel.json:29` — `/meslek-pusulasi` redirect'leri `permanent:false`; kalıcı taşınmışsa `true` yap (geri dönüş planlanmıyorsa).

### 3.4 LH-01 (çapraz-alan, orta öncelik)
`davetmektubu.com` sitemap/canonical/og:url üçlü tutarsızlığı + canonical redirect eden URL'yi gösteriyor. → sitemap = canonical = og:url = nihai 200 URL (`https://www.davetmektubu.com/`) hizalanmalı.

### 3.5 Diğer
- `satin-al`/`noroterbiye` h1 eksik (`noroterbiye-6`); `hilal-scorm`/`scorm-balon` meta description eksik; `imam-buhari/teklif.html:6` gizli fiyat belgesi `noindex` eksik (**ekle**); `5sinif`/`erdem360` manifest icons; preconnect `fonts.gstatic.com` eksikleri (`beyin-ve-yapay-zeka:8`, `fatih-sultan-mehmed:10`, `kayi:64`, `kayi-atlasi:9`, `tarih-atlasi:10`, `islam-bilim-yildizlari:10`).

---

## 4. PERFORMANS

### 4.1 Büyük/optimize edilmemiş asset (en yüksek etki)
| Bölüm | Sorun | Düzeltme |
|---|---|---|
| `dkab/assets/images/` | ~265 MB, onlarca >1 MB JPEG; 360px/180px gösterimde 2-4x fazla. | ~1200px, q75 yeniden örnekle; WebP. (**high**) |
| `5sinif/assets/cartoon/` | 200 JPEG, ort 655 KB, toplam 128 MB; <300px gösterim. | ~800px q80/WebP → 4-6x küçülme. (**high**) |
| `arapca-kelime/images/` | 1024×1536, ~45 MB; 200px grid. | ~400px grid varyantı. |
| `osmanlica/kitap/` | 800×1200, 61 MB; ~200px grid + 454 `<img>` tek seferde. | srcset/WebP + IntersectionObserver parça render. |
| `sunumlar/bilim/` (~21 MB) + `safsatalar/` (~9.7 MB) | 1536×1024 / 1376×768; ~860px panel. | ~1280px q75/WebP. |
| `muallimo` jsdelivr WebP | Optimize edilmemiş tam-boy; 832 KB. | Daha küçük türev; eager eşiğini düşür. |
| `images/og-image.png?v=2026yeni` | 590 KB PNG (LH-03). | <150 KB JPG/WebP veya pngquant. |

### 4.2 Render-blocking / büyük inline JS
- `yz-prompt-rehberi/oku.html:317` — ~876 KB inline `YZ_PAGES` (`pages.js` zaten var ama yetim) → `<script defer src="/yz-prompt-rehberi/pages.js">` ile dışarıdan yükle.
- `islami-egitim/index.html:802` — 632 KB `data.js` defer'siz → 3 betiğe `defer` ekle.
- `iyilikakademi` 1.22 MB tek bundle (kaynak proje code-split — `risky`/build-aşaması).
- `kayi/index.html:67` Leaflet senkron → `defer`. `kalbinin-haritasi:23` pdfMake (~2 MB) head'de senkron → dinamik yükle.

### 4.3 CLS — `<img>` width/height yok
Yaygın: `index.html:1809` (kitap kapağı height yok), `deneme:1942/2016`, `dkab/chapter-view.js:180,210`, `iho-oyunlar` (33 kart), `iho-oyunlar-2/hub.js:74`, `davetmektubu:2469`, `5sinif/app.js:870+`, `noroterbiye:94,283` + satin-al, `osmanli-kartlari` (8 şablon), `ingilizce-kelime`, `osmanlica`, `maarif`, `erdem360:66`, `ogrenim`. → width/height veya CSS `aspect-ratio` ekle.

### 4.4 Lazy-load
- `index.html:1863-1983` ve `deneme:2016-2116` — 6 below-fold bento posteri `loading="eager"` → ilki hariç `lazy`.
- `5sinif/app.js` (break/outro/completion mascot), `noroterbiye`, `osmanli-kartlari` arena → `lazy`.

---

## 5. PREMIUM YERİNDE CİLA (köklü redesign DEĞİL)

> Tutarlı, yüksek-etkili, düşük-riskli yerinde iyileştirmeler.

- **Skip-link CSS'leştir:** `index.html:1671` — inline style + onfocus/onblur JS yerine `.skip-link`/`.skip-link:focus` CSS kuralları.
- **theme-color tutarlılığı:** `404.html` (eksik), `erdem360` (HTML `#123c34` vs manifest `#0f6f5f` vs CSS `#0f473d` — tek tona eşitle), eksik bölümlere ekle.
- **Hover/focus geçiş zarafeti:** `erdem360/styles.css:226` — buton `transform: translateY(-1px)` var ama `transition` yok (ani sıçrama); nav-item/week-tab/asset-card/choice-card'a `transition` ekle (reduced-motion altında kapat). `sinav/styles.css` (transition=0), `ogrenim` toast geçişi.
- **Map etiket kontrastı (tema-bağımsız):** `_alim-sablonu:139`, `fatih-sultan-mehmed:146`, `imam-buhari` — koyu/uydu katmanlarda sabit koyu metin kayboluyor → yarı saydam koyu rozet (`background:rgba(0,0,0,.55);color:#fff`).
- **Kavram filtreleri tamamla:** `beyin-ve-yapay-zeka:724-727` — 3 filtre var, veride 7 ilişki türü; 4 tür yalnız "Tümü"de.
- **Galeride detay erişimi:** `osmanli-kartlari` — ana Kart Galerisi yalnız çeviriyor; overlay/profil yönlendirmesi yok (en zengin içerik keşfedilemez).
- **Sözlük metin duvarı:** `islam-alimleri/app.js:267-275` — biyografilerin %59'u tek `<p>` (regex `\s{2,}` veriyle uyuşmuyor); cümle gruplama + `max-width:70ch`.
- **Logo `href="#"` → anlamlı hedef:** `imam-buhari:21`, `fatih-sultan-mehmed:21`, `_alim-sablonu:21`.
- **İki bento numara/sıra, "KARTLARl" yazım hatası** (`osmanli-kartlari:410`), **geçersiz CSS** (`osmanli-kartlari:694` `var(--gold)44`; `osmanlica:130,189` tanımsız `var(--radius)` → `var(--radius-md)`; `iho-oyunlar-2/style.css:22` `--surface:var(--card)` tanımsız → açık temada yüzeyler çöker → `var(--bg-elevated)`).
- **Native confirm/alert → stilize:** `gizlilik` veri silme akışı. **Inter fontu çağrılıp yüklenmiyor:** `5sinif`, `islam-ahlaki`, `ingilizce-kelime`, `ogrenim` (sistem fontuna düşüyor — ya yükle ya stack'ten çıkar).

---

## 6. DİKKAT / RİSKLİ + KARAR BEKLEYEN (DOKUNMA — kullanıcı onayı)

### 6.1 İçerik/yapı kararı
- **`g016 "Dinle-seç"` (`iho-oyunlar-2`)** — sessiz oyun + doğru cevap soru metni olarak görünüyor. Düzeltme `caution`: ya hub'dan gizle (a) ya da TTS renderer ekle (b). Ses üretimi/içerik kararı gerektirir.
- **`iho-oyunlar-2-1`** açık tema `--card` çökmesi `error` ama düzeltme tema sisteminde — görsel doğrulama gerekir.
- **`davetmektubu` dual-domain** (LH-01/davetmektubu-6) — hangi alan kanonik (raufenc.com mı davetmektubu.com mı) kullanıcı kararı.
- **`7sinif` orphan dosyalar** (`1/su3.html`, `2/su1.html`, `3/vasita-sinif.html`) — müşteri ünite ünite onaylıyor, kasıtlı olabilir.
- **`imam-buhari/kayseriyye`** rotaya/timeline'a bağlı değil — içerik kararı.
- **`evliyalar` 18 âlim boş `death_miladi`** — veri eksikliği, içerik kararı.

### 6.2 Riskli (`risk=risky`)
- **iCloud temizliği** — `noroterbiye/tanitim/` ~46.6k çakışma kopyası, `sinav/` 6449 kopya + `sinav 2/`, `iho-oyunlar/` ~462, `images/vitrin/`, `dkab/assets/images/` 12, `kalbinin-haritasi` (.bak/tests_part*/supabase-*), `iyilikakademi/.DS_Store` vb. → **path-scoped commit ŞART** (CLAUDE.md kuralı: bare `git add -A` paralel-ajan WIP'ini süpürür); silme kullanıcı onaylı + manuel.
- **`davetmektubu/prototip.html`**, **`kalbinin-haritasi` ölü dosyalar**, **`iyilikakademi` code-split** — `risky`, onaysız dokunma.
- **`islami-egitim:121` "52 Haftalık Plan" vs 48 ay kartı** — `risky`, etiket/içerik kararı.

### 6.3 Riskli/yan-etkili JS davranış değişiklikleri
- `deneme:336` özel imleç (form caret), `mizac` typeWriter HTML bölme, `islam-alimleri` History API, `ogrenim` çift-etkileşim kart — hepsi `caution`, davranış doğrulaması gerekir.

---

## YANLIŞ POZİTİFLER (`confirmed===false` — DÜZELTME YAPILMAYACAK)

> Gözlem gerçek olabilir ama "error" eşiğini karşılamıyor ya da etki yok.

- **`erdem360-5`** — manifest `icons:[]` boş; gerçek ama "error" değil (dosya eksik değil, sayfa çalışıyor). Yalnız PWA/SEO cilası (opsiyonel: favicon-192/512 ekle, `purpose:"any"`).
- **`hilal-scorm-7`** — YouTube API yüklenemezse fallback yok; gerçek bozukluk değil, dış koşula bağlı dayanıklılık/polish eksiği.
- **`islami-egitim-6`** — standart-dışı `<value>` elemanı (11×); tarayıcı tolere ediyor, runtime hatası yok. Polish/kod-hijyeni (opsiyonel `<div class="modal-value">`).
- **`sinav-1`** — jsdelivr CSP ihlali GERÇEK ama `/sinav/` deploy edilmemiş (canlı 404, git'te yok); hiçbir kullanıcıya yansımıyor. **Deploy ÖNCESİ** düzeltilmeli (Bölüm 1-B1), ama şu an canlı hata değil.

---

## ÖNERİLEN UYGULAMA SIRASI

1. **Bölüm 1-C/D** (runtime/render kırıkları): `islam-bilim-yildizlari` (boş sayfa), `tarih/*` (binlerce boş madde + kırık link), `endulus`, `davetmektubu` WhatsApp.
2. **Bölüm 1-A** kırık linkler/eksik sesler + **1-E** sayı tutarsızlıkları (mekanik, güvenli).
3. **Bölüm 1-B1** sinav QR (deploy öncesi).
4. **Bölüm 2.1/2.2** (klavye erişimi + form etiketleri) — en yaygın a11y, çoğu güvenli/mekanik.
5. **Bölüm 3.1/3.3** topluca head meta + sitemap.
6. **Bölüm 4.1/4.3** ağır asset + CLS.
7. **Bölüm 5** cila; **Bölüm 6** kullanıcı onayı bekler.

**Bütünlük notu (Bölüm 7):** Tüm bölümlerde İslâmî içerik/hareke/honorific kasıtlı denetlenmedi (kural gereği) — ikinci tur içerik denetimi gerekebilir. `_alim-sablonu` türevi (imam-buhari/fatih) ve `lib/kelime-app/*` paylaşılan dosyalar: düzeltmeler ŞABLON/LİB'de yapılırsa tüm türevlere yayılır ama mevcut kopyalara elle de uygulanmalı. `meslek-pusulasi/` klasörü artık yok (→ `yol-haritan/`); tek kalıntı referanslar sitemap+vercel.json. JSON bütünlüğü (4636 dosya), canlı sağlık (55 URL 200), ve çoğu bölümün CSP'si TEMİZ doğrulandı. Paralel-ajan çakışması riski (aynı dosyalar) ve iCloud .git tuzakları nedeniyle deploy daima path-scoped + `pull --rebase` ile yapılmalı.