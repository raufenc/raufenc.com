# İHO Arapça 7. Sınıf — Ünite 2 Oyun + Database Paketi

Bu paket **Ünite 2: وَقْتُ التَّسَوُّق / Alışveriş Zamanı** için hazırlanmış veri tabanı, JSON veri seti, oyun bankaları ve bağımsız JavaScript oyun motorlarını içerir.

## İçerik özeti

- **98 kelime/ifade**: bakkal ürünleri, meyveler, sebzeler, miktar-fiyat sözleri, fiiller, soru edatları, karşılaştırma sıfatları.
- **22 cümle kalıbı**: ihtiyaç belirtme, ürün isteme, fiyat sorma, miktar sorma, ucuz/pahalı/büyük/küçük/ağır/hafif karşılaştırmaları, rol oyunları.
- **71 örnek cümle** ve **5 diyalog**.
- **16 oyun konfigürasyonu**: flashcard, eşleştirme, sınıflandırma, alışveriş listesi, fiyat quiz, karşılaştırma, boşluk doldurma, cümle sıralama, diyalog sıralama, kelime avı, hafıza, farklı olanı bulma, rol oyunu, dinle-seç yer tutucusu.
- **SQLite DB** ve **CSV export**.
- Görsel/ses zorunlu değildir; emoji ve `audio_key` alanları sonraki site entegrasyonu için yer tutucudur.

## Dosya yapısı

```text
data/
  unit2_all.json                # Tüm veri seti
  unit2_all.js                  # Browser'da doğrudan script olarak kullanılabilir
  unit2_vocabulary.json         # Kelimeler
  unit2_patterns.json           # Cümle kalıpları
  unit2_sentences.json          # Örnek cümleler
  unit2_dialogues.json          # Diyaloglar
  unit2_game_banks.json         # Oyun bankaları ve konfigürasyonlar
  audio_manifest.json           # Ses dosyası bağlamak için audio_key listesi
  unit2_legacy_vocab_patch.js   # Eski Ünite 1 oyunlarındaki VOCAB yapısına yakın yama
  csv/                          # CSV exportlar

db/
  iho_unit2.sqlite              # Hazır SQLite veritabanı
  schema.sql                    # DB şeması

src/
  gameEngines.umd.js            # Browser global: window.IHOGameEngines
  gameEngines.mjs               # ES module wrapper

demo/
  index.html                    # Basit test paneli
  app.js
  style.css

scripts/
  build_db.py                   # JSON'dan SQLite'ı tekrar üretir
  validate_data.py              # Referans ve sayım kontrolü
```

## Demo çalıştırma

`demo/index.html` dosyası normal tarayıcıda açılabilir. JSON'u doğrudan fetch etmediği için yerel sunucu şart değildir; `data/unit2_all.js` script olarak yüklenir.

Daha düzenli test için paket klasöründe şu komutu kullanabilirsiniz:

```bash
python3 -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000/demo/` açılır.

## Site entegrasyonu

Browser script kullanımı:

```html
<script src="data/unit2_all.js"></script>
<script src="src/gameEngines.umd.js"></script>
<script>
  const data = window.IHO_UNIT2_DATA;
  const gameMeta = data.games.find(g => g.id === 'g005_price_quiz');
  const game = window.IHOGameEngines.createGame(gameMeta, data, { seed: 'sinif-7A' });
  console.log(game.questions);
</script>
```

ES module kullanımı:

```js
import Engine from './src/gameEngines.mjs';
const data = await fetch('./data/unit2_all.json').then(r => r.json());
const game = Engine.createGame(data.games[0], data, { seed: 'demo' });
```

## SQLite örnek sorgular

```sql
-- Meyve ve sebze kelimeleri
SELECT ar, tr, category FROM vocabulary
WHERE category IN ('fruit', 'vegetable')
ORDER BY category, id;

-- Fiyat sorma ve karşılaştırma kalıpları
SELECT title_tr, pattern_ar, pattern_tr FROM patterns
WHERE tags_json LIKE '%price%' OR tags_json LIKE '%comparison%';

-- Bir diyaloğun satırları
SELECT line_no, speaker, ar, tr FROM dialogue_lines
WHERE dialogue_id = 'd003'
ORDER BY line_no;
```

## Mevcut Ünite 1 oyunlarına veri uyarlama

Yüklediğiniz eski HTML oyunların çoğunda `VOCAB.foods`, `VOCAB.verbs`, `VOCAB.times` benzeri yapılar kullanılıyor. Bu paket içinde `data/unit2_legacy_vocab_patch.js` dosyası aynı mantıkta bir geçiş verisi verir:

- `foods`: bakkal + meyve + sebze ürünleri
- `verbs`: alışveriş fiilleri ve günlük ifadeler
- `times`: miktar, fiyat, soru ve karşılaştırma parçaları

Bu dosya birebir otomatik dönüştürücü değildir; eski oyunlara gömülü değişkenleri değiştirirken hızlı kaynak olarak kullanılabilir.

## Veri notu

Arapça metinlerde harekeli biçim (`ar`) ve arama/karşılaştırma için sadeleştirilmiş biçim (`ar_clean`) birlikte verildi. Oyunlarda doğru cevabı kontrol ederken `normalizeArabic()` fonksiyonu hareke, tatvîl ve bazı elif/te merbuta farklarını yumuşatır.

## İçerik kapsamı

Ünite 2, alışveriş bağlamında bakkal/pazar, meyve-sebze, fiyat sorma, miktar belirtme ve karşılaştırma kalıplarını hedefler. Paket, kitap sayfalarındaki diyalog, görsel kelimeler ve alıştırma kalıplarını site/oyun verisine dönüştürür.
