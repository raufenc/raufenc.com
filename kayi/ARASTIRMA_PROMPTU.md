# Kayı Serisi — Kitap Analiz ve Veri Çıkarma Promptu

Bu promptu her kitabın PDF'i ile birlikte kullanın. Çıktı olarak site için gereken tüm JavaScript veri yapıları hazır gelecektir.

---

## PROMPT (Aşağıdaki metni kopyalayıp PDF ile birlikte gönderin)

---

Sen bir Osmanlı tarihi araştırmacısısın. Sana verilen PDF, Prof. Dr. Ahmet Şimşirgil'in **Kayı** serisinin bir cildidir. Bu kitabı baştan sona analiz edip aşağıdaki veri yapılarını **JavaScript dizisi (array)** formatında çıkar. Her veri yapısı `const` ile tanımlanmalı. Türkçe karakterleri koru. Sayfa numaralarını kitaptaki gerçek sayfa numaralarına göre yaz.

**ÖNEMLİ KURALLAR:**
- Sadece kitapta geçen bilgileri kullan, dışarıdan bilgi ekleme.
- Sayfa numaralarını doğru ver (s. 45-52 gibi).
- Koordinatları (lat/lng) tarihî mekânların günümüz konumlarına göre ver.
- Olayları kronolojik sırala.
- Kişilerin tam unvanlarını yaz.
- Her veri en az 1 sayfa referansı içermeli.

---

### 1. KİTAP KÜNYESİ (BOOK_INFO)

```javascript
const BOOK_INFO = {
  series: "Kayı",
  volume: [CİLT NUMARASI — Romen rakamıyla],
  title: "[Kitabın Alt Başlığı]",
  fullTitle: "Kayı [NUMARA] — [Alt Başlık]",
  author: "Prof. Dr. Ahmet Şimşirgil",
  publisher: "Timaş Yayınları",
  isbn: "[ISBN numarası — varsa arka kapaktan]",
  pages: [toplam sayfa sayısı],
  period: "[Kapsadığı tarih aralığı, ör: 1421-1512]",
  periodStart: [başlangıç yılı],
  periodEnd: [bitiş yılı]
};
```

---

### 2. HÜKÜMDARLAR (RULERS)

Kitapta ana konu olarak işlenen her padişah/hükümdar için:

```javascript
const RULERS = [
  {
    id: "[kısa-id, ör: mehmed2]",
    name: "[Tam unvanı, ör: Sultan Mehmed Han (Fatih)]",
    shortName: "[Kısa adı, ör: Fatih Sultan Mehmed]",
    epithet: "[Lakabı, ör: Fatih, Yavuz, Kanuni]",
    chapter: [kaçıncı bölümde işlendiği],
    birth: "[Doğum tarihi ve yeri]",
    death: "[Vefat tarihi ve yeri]",
    accession: "[Tahta çıkış tarihi]",
    rule: "[Saltanat dönemi, ör: 1451-1481]",
    ruleYears: [saltanat süresi yıl olarak],
    parentage: "[Babası ve annesi]",
    pages: "[Sayfa aralığı, ör: 45-180]",
    summary: "[3-4 cümlelik özet — kitaptaki anlatıma sadık kalarak]",
    keyEvents: ["olay1_id", "olay2_id"],
    keyAchievements: [
      "Başarı 1",
      "Başarı 2",
      "Başarı 3"
    ]
  }
];
```

---

### 3. OLAYLAR / ZAMAN ÇİZELGESİ (TIMELINE_EVENTS)

Kitapta geçen her önemli olay (savaş, fetih, antlaşma, tahta geçiş, isyan, reform, ölüm vb.):

```javascript
const TIMELINE_EVENTS = [
  {
    id: [sıra numarası, 1'den başla],
    name: "[Olayın adı]",
    ruler: "[Hangi hükümdar döneminde]",
    date: "[Tarih, ör: 29 Mayıs 1453]",
    year: [yıl, sayısal],
    location: "[Mekân adı]",
    type: "[Aşağıdaki tiplerden biri]",
    summary: "[2-3 cümle özet — kitaptaki anlatıma göre]",
    pages: "[Sayfa referansı]",
    relatedPersons: ["kişi_adı1", "kişi_adı2"],
    significance: "[Olayın tarihî önemi — 1 cümle]"
  }
];
```

**Olay tipleri (type):**
- `succession` — Tahta geçiş
- `battle` — Meydan muharebesi
- `siege` — Kuşatma
- `conquest` — Fetih
- `treaty` — Antlaşma / barış
- `rebellion` — İsyan / ayaklanma
- `institutional_reform` — Devlet teşkilatı reformu
- `construction` — İmar / inşa faaliyeti
- `diplomacy` — Diplomatik olay
- `death` — Önemli vefat
- `cultural` — Kültürel / ilmî gelişme
- `military_campaign` — Sefer
- `naval` — Deniz seferi / savaşı
- `migration` — Göç / yerleşim
- `economic` — İktisadî olay
- `religious` — Dinî olay / gelişme

---

### 4. TARİHÎ KİŞİLER (PERSONS)

Kitapta adı geçen her önemli şahsiyet (padişah ailesi, vezirler, komutanlar, âlimler, düşman liderler vb.):

```javascript
const PERSONS = [
  {
    name: "[Tam adı ve unvanı]",
    role: "[Görevi/sıfatı, ör: Sadrazam, Kaptan-ı Derya, Şeyhülislam]",
    desc: "[2-3 cümle tanım — kitapta anlatıldığı şekliyle]",
    context: "[Hangi hükümdar döneminde, hangi olaylarla ilişkili]",
    aliases: "[Varsa diğer adları / lakapları]",
    pages: "[Sayfa referansları]",
    category: "[Aşağıdaki kategorilerden biri]"
  }
];
```

**Kişi kategorileri (category):**
- `sultan` — Padişah
- `dynasty` — Hanedan üyesi (şehzade, valide sultan, haseki vb.)
- `vizier` — Vezir / Sadrazam
- `military` — Askerî komutan (beylerbeyi, sancakbeyi, kaptan-ı derya)
- `religious` — Dinî şahsiyet (şeyhülislam, kadı, müderris, mutasavvıf)
- `scholar` — Âlim / bilgin / şair
- `foreign` — Yabancı lider / devlet adamı
- `other` — Diğer

---

### 5. MEKÂNLAR (PLACES)

Kitapta geçen her önemli yer (şehir, kale, savaş alanı, saray, cami vb.):

```javascript
const PLACES = [
  {
    id: [sıra numarası],
    name: "[Osmanlıca/dönemin adı]",
    modernName: "[Günümüzdeki adı, farklıysa]",
    type: "[Aşağıdaki tiplerden biri]",
    description: "[1-2 cümle açıklama — kitaba göre]",
    pages: "[Sayfa referansı]",
    lat: [enlem — ondalık derece],
    lng: [boylam — ondalık derece],
    relatedEvents: ["olay_adı1", "olay_adı2"]
  }
];
```

**Mekân tipleri (type):**
- `capital` — Başkent
- `city` — Şehir / kasaba
- `fortress` — Kale / hisar
- `battlefield` — Savaş alanı
- `palace` — Saray
- `mosque` — Cami / mescid
- `madrasa` — Medrese
- `tomb` — Türbe
- `region` — Bölge / eyalet
- `port` — Liman
- `pass` — Geçit / derbend
- `other` — Diğer

---

### 6. KAVRAMLAR (CONCEPTS)

Kitapta açıklanan Osmanlı devlet, askerî, hukukî, dinî ve kültürel kavramlar:

```javascript
const CONCEPTS = [
  {
    name: "[Kavramın adı]",
    type: "[Kategori: askerî / idarî / hukukî / dinî / iktisadî / kültürel / sosyal]",
    description: "[2-3 cümle açıklama — kitapta anlatıldığı şekliyle]",
    pages: "[Sayfa referansı]"
  }
];
```

---

### 7. İÇİNDEKİLER / BÖLÜMLER (SECTIONS)

Kitabın tam içindekiler tablosu:

```javascript
const SECTIONS = [
  {
    ch: [bölüm numarası — 0: ön kısım],
    type: "[section veya front]",
    title: "[Başlık]",
    start: [başlangıç sayfası],
    end: [bitiş sayfası],
    ruler: "[İlgili hükümdar adı, varsa]",
    summary: "[1-2 cümle özet]"
  }
];
```

---

### 8. KAYNAKÇA (BIBLIOGRAPHY)

Kitabın kaynakçasındaki tüm eserler:

```javascript
const BIBLIOGRAPHY = [
  {
    author: "[Yazar adı]",
    year: "[Yayın yılı]",
    entry: "[Tam kaynakça girişi — kitapta yazıldığı şekliyle]"
  }
];
```

---

### 9. HANEDAN İLİŞKİLERİ (DYNASTY_RELATIONS)

Kitapta geçen hanedan üyeleri arasındaki ilişkiler:

```javascript
const DYNASTY_RELATIONS = [
  {
    source: "[Kişi 1 adı]",
    target: "[Kişi 2 adı]",
    relation: "[İlişki tipi: father/mother/son/daughter/spouse/sibling/grandchild]"
  }
];
```

---

### 10. SAVAŞ KOORDİNATLARI (BATTLE_COORDS)

Savaş/muharebe olan ama PLACES dizisinde bulunmayan mekânlar için yedek koordinatlar:

```javascript
const BATTLE_COORDS = {
  "[Savaş mekânı adı]": { lat: [enlem], lng: [boylam] }
};
```

---

### 11. DİZİN (INDEX_ENTRIES)

Kitapta geçen ama yukarıdaki dizilerde yer almayan önemli terimler, yer adları, kişi adları:

```javascript
const INDEX_EXTRA = [
  { term: "[Terim]", type: "[kişi/yer/kavram/olay/eser]", pages: "[sayfa numaraları]" }
];
```

---

## ÇIKTI FORMATI

1. Tüm veri yapılarını tek bir JavaScript dosyası olarak ver.
2. Dosyanın başına kitap bilgisi yorumu ekle:
```javascript
// ============================================
// KAYI [CİLT] — [ALT BAŞLIK]
// Prof. Dr. Ahmet Şimşirgil
// Veri çıkarma tarihi: [bugünün tarihi]
// ============================================
```
3. Her dizinin eleman sayısını dizinin üstüne yorum olarak yaz:
```javascript
// 23 olay
const TIMELINE_EVENTS = [ ... ];
```
4. Eksik bilgi varsa `null` yaz, uydurma.
5. Koordinatları Google Maps'ten doğrulayarak yaz.

---

## KALİTE KONTROL

Tüm verileri çıkardıktan sonra şu kontrolleri yap ve sonuçları raporla:

- [ ] Toplam hükümdar sayısı
- [ ] Toplam olay sayısı
- [ ] Toplam kişi sayısı
- [ ] Toplam mekân sayısı (koordinatlı / koordinatsız)
- [ ] Toplam kavram sayısı
- [ ] Toplam bölüm/alt başlık sayısı
- [ ] Toplam kaynakça maddesi sayısı
- [ ] Toplam dizin maddesi sayısı
- [ ] Tarih aralığı tutarlılığı (ilk olay yılı — son olay yılı)
- [ ] Her olayın en az 1 mekânla eşleşip eşleşmediği
- [ ] Her hükümdarın en az 1 olayla eşleşip eşleşmediği

---

## CİLT BİLGİLERİ (referans)

| Cilt | Alt Başlık | Tahmini Dönem |
|------|-----------|---------------|
| I | Ertuğrul'un Ocağı | 1230-1421 |
| II | Cihan Devleti | 1421-1512 |
| III | Haremeyn Hizmetinde | 1512-1574 |
| IV | Ufukların Sultanı Kanuni | 1520-1566 |
| V | Kudret ve Azamet Yılları | 1566-1603 |
| VI | İmparatorluğun Zirvesi ve Dönüş | 1603-1656 |
| VII | Kutsal İttifaka Karşı | 1656-1718 |
| VIII | Islahat, Darbe ve Devlet | 1718-1808 |
| IX | Sonun Başlangıcı | 1808-1876 |
| X | II. Abdülhamid Han | 1876-1909 |
| XI | Elveda Vahideddin Han | 1909-1922 |
