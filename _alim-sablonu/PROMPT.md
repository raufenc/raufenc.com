# Âlim Sayfası Üretim Talimatı

Aşağıdaki makaleyi oku. Bu makaleyi kullanarak interaktif bir âlim sayfası için **3 dosya** üret.

Dosyalar `raufenc.com/KLASOR_ADI/` altına konulacak. Klasör adını âlimin isminden türet (örn: `imam-azam`, `imam-muslim`, `abdulkadir-geylani`).

Aynı klasöre `_alim-sablonu/` dizininden `index.html`, `styles.css`, `engine.js` kopyalanacak — sen bunlara dokunma. Sadece aşağıdaki 3 dosyayı üret.

---

## Dosya 1: `config.js`

```js
const SCHOLAR = {
  id: 'klasor-adi',           // URL-safe slug
  name: 'Görünen İsim',       // Örn: "İmam-ı A'zam Ebû Hanîfe"
  subtitle: 'Kısa Lakap',     // Örn: "Fıkıh İlminin Güneşi"
  fullName: 'Tam İsim Zinciri',
  honorific: 'rahmetullâhi aleyh',  // veya uygun ifade
  logoLetter: 'A',            // İsmin baş harfi
  birthAH: 80,                // Hicrî doğum
  deathAH: 150,
  birthCE: 699,               // Milâdî doğum
  deathCE: 767,
  description: 'Hero altındaki 1-2 cümlelik tanıtım.',
  mapCenter: [33, 44],        // Haritanın açılış merkezi [lat, lon]
  mapZoom: 5,                 // Açılış zoom seviyesi (3-6 arası)
  stats: [
    // 3-6 adet istatistik. target sayı, suffix opsiyonel ('+' gibi)
    { target: 15, label: 'Şehir' },
    { target: 1000, suffix: '+', label: 'Talebe' }
  ],
  sections: {
    map:      { title: 'Seyahat Haritası', desc: 'Kısa açıklama' },
    timeline: { title: 'Zaman Çizelgesi', desc: 'Kısa açıklama' },
    content:  { title: 'Hayâtı ve İlmi',  desc: 'Kaynak: ...' },
    hadith:   { title: 'Hadîs-i Şerîfler / Sözleri', desc: 'Kısa açıklama' }
  },
  source: {
    name: 'Kaynak adı — Yayınevi',
    url: 'https://...'  // Orijinal makale linki
  },
  journeyEnd: {
    year: 'AH H / CE M',
    title: 'Yolculuk Tamamlandı',
    desc: 'Vefat bilgisi — 1-2 cümle.'
  },
  routeDetails: {
    // Her rota label'ı için 1-2 cümle açıklama
    'Rota Adı': 'Açıklama metni...'
  }
};
```

### Kurallar:
- `birthAH` doğum hicrî yılı olmalı — seyahat animasyonunda `route.ah_year - birthAH` ile yaş hesaplanır
- `mapCenter` âlimin en çok bulunduğu bölgeyi ortalasın
- `routeDetails` içindeki key'ler, `locations.json` routes dizisindeki `label` değerleriyle birebir eşleşmeli
- `honorific` genelde "rahmetullâhi aleyh" olacak

---

## Dosya 2: `book-data.js`

```js
const BOOK = [
  {
    id: 'giris',
    title: 'Bölüm Başlığı',
    color: 'gold',   // gold|green|blue|purple|orange|red|teal
    subs: [
      { title: 'Alt Başlık', text: 'İçerik metni...' },
      { title: 'Hadîs', text: 'Hadîs metni...', hadith: true }  // hadîs kartı
    ]
  },
  // ... diğer bölümler
  {
    id: 'hadisler',   // SON bölüm — bu ID sabit olmalı
    title: 'Hadîs-i Şerîfler',
    color: 'gold',
    subs: [
      { title: 'Hadîs Başlığı', text: 'Hadîs metni...', hadith: true }
    ]
  }
];

const TIMELINE = [
  { year: 'AH H / CE M', title: 'Olay', loc: 'lokasyon_id', period: 'donem_id', desc: 'Açıklama' },
  // ... kronolojik sırada 10-20 ana olay
];

const PERIOD_COLORS = {
  donem_id: '#renk_kodu',
  // ...
};

const PERIOD_LABELS = {
  donem_id: 'Dönem Adı',
  // ...
};
```

### Kurallar:
- Makaledeki TÜM metni dahil et — hiçbir paragraf atlanmamalı
- Bölüm sayısı makaleye göre değişir (genelde 8-15 arası)
- Son bölüm her zaman `id: 'hadisler'` olmalı — engine bunu ayrı render eder
- `color` değerleri: gold (giriş/ana), green (eğitim), blue (seyahat), purple (hocalar), orange (hâfıza/menkıbe), teal (talebeler), red (vefat/son dönem)
- Hadîs-i şerîfler varsa `hadith: true` ekle — altın kenarlıklı kart olarak gösterilir
- Eğer âlimin hadîsi yoksa, sözlerini veya kerâmetlerini hadîsler bölümüne koy
- TIMELINE loc değerleri locations.json'daki id'lerle eşleşmeli
- TIMELINE kronolojik sırada olmalı (küçük yıldan büyüğe)
- Peygamber Efendimiz sallallâhü aleyhi ve sellem — tam yazılacak, kısaltma yok
- Kur'ân-ı Kerîm — tam yazılacak
- radıyallâhü anh/anhâ — tam yazılacak
- rahmetullâhi aleyh — tam yazılacak

---

## Dosya 3: `data/locations.json`

```json
{
  "locations": [
    {
      "id": "sehir_id",
      "name": "Şehir Adı",
      "modern_name": "Günümüz adı, Ülke",
      "lat": 39.77,
      "lon": 64.42,
      "significance": "major",
      "precision": "kesin",
      "periods": ["donem_id"],
      "order": 1,
      "detail_text": "3-4 cümle şehir hakkında detay...",
      "events": [
        {
          "ah_year": 194,
          "ce_year": 810,
          "title": "Olay Başlığı",
          "description": "Olay açıklaması",
          "period": "donem_id"
        }
      ]
    }
  ],
  "routes": [
    {
      "from": "sehir_id",
      "to": "sehir_id",
      "period": "donem_id",
      "ah_year": 210,
      "label": "Rota Adı",
      "waypoints": [[lat1,lon1],[lat2,lon2],[lat3,lon3]]
    }
  ],
  "periods": [
    {
      "id": "donem_id",
      "label": "Dönem Adı",
      "color": "#22c55e",
      "start_ah": 80,
      "end_ah": 100
    }
  ],
  "timeline_events": [
    {
      "ah_year": 80,
      "ce_year": 699,
      "title": "Olay",
      "location": "sehir_id",
      "period": "donem_id",
      "description": "Açıklama",
      "icon": "star"
    }
  ]
}
```

### Kurallar:
- `significance`: "major" (büyük dot, kalıcı etiket), "standard" (orta dot, kalıcı etiket), "minor" (küçük dot, etiketsiz)
- `precision`: "kesin" (düz çizgi kenarlık) veya "yaklasik" (kesikli kenarlık)
- Waypoints: Rotalar düz çizgi değil, gerçekçi kara yolu güzergahını takip etmeli. Her rota en az 3-4 waypoint içermeli. Deniz üzerinden geçmesin — kıyı boyunca kara rotası çiz.
- **Routes KRONOLOJİK SIRADA olmalı** — ah_year küçükten büyüğe. Seyahat animasyonu bu sırayı takip eder, geriye gitmemeli.
- `modern_name` alanında İsrail yazmayın, "Filistin" veya "Filistin bölgesi" yazın
- Dönem renkleri: yeşil=#22c55e (çocukluk), altın=#d4a853 (ana dönem), mavi=#3b82f6, mor=#a855f7, turuncu=#f97316, kırmızı=#ef4444
- icon değerleri: star, heart, eye, book, brain, kaaba, pen, trophy, scroll, travel, mosque, check, people, exile, moon (veya uygun başka)

---

## Kurulum

Dosyaları ürettikten sonra klasöre kopyala:
```
raufenc.com/KLASOR_ADI/
├── index.html      ← _alim-sablonu/index.html kopyası
├── styles.css      ← _alim-sablonu/styles.css kopyası
├── engine.js       ← _alim-sablonu/engine.js kopyası
├── config.js       ← SEN ÜRET
├── book-data.js    ← SEN ÜRET
└── data/
    └── locations.json  ← SEN ÜRET
```

## Doğrulama Kontrol Listesi

- [ ] config.js'teki routeDetails key'leri locations.json routes label'larıyla eşleşiyor
- [ ] TIMELINE kronolojik sırada (yıl artan)
- [ ] Routes kronolojik sırada (ah_year artan, asla geriye gitmiyor)
- [ ] TIMELINE loc değerleri locations.json id'leriyle eşleşiyor
- [ ] book-data.js periods, locations.json periods ile tutarlı
- [ ] Makaledeki hiçbir paragraf atlanmamış
- [ ] Honorific'ler tam yazılmış (kısaltma yok)
- [ ] modern_name'lerde "İsrail" yok
- [ ] Waypoints kara rotası (deniz üstünden geçmiyor)
- [ ] Son BOOK bölümü id:'hadisler'

---

## Makale

[BURAYA MAKALE METNİNİ YAPIŞTIR VEYA LİNK VER]
