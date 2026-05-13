// Arapça kelime veri tabanı
// Her kelime: id (modeller ile eşleşir), ar (Arapça yazım+harekeli), tr (Türkçe), translit (okunuş)
(function (global) {
  'use strict';

  const KELIMELER = {
    // === MEYVELER === (fiyat = TL/adet)
    elma:      { id: 'elma',      model: 'elma',      ar: 'تُفَّاحَة',   tr: 'elma',      translit: 'tüffaha',   fiyat: 5,  emoji: '🍎' },
    portakal:  { id: 'portakal',  model: 'portakal',  ar: 'بُرْتُقَالَة', tr: 'portakal',  translit: 'burtukâle', fiyat: 6,  emoji: '🍊' },
    muz:       { id: 'muz',       model: 'muz',       ar: 'مَوْزَة',     tr: 'muz',       translit: 'mevze',     fiyat: 4,  emoji: '🍌' },
    uzum:      { id: 'uzum',      model: 'uzum',      ar: 'عِنَب',      tr: 'üzüm',      translit: 'ineb',      fiyat: 12, emoji: '🍇' },
    cilek:     { id: 'cilek',     model: 'cilek',     ar: 'فَرَاوْلَة',   tr: 'çilek',     translit: 'feravle',   fiyat: 10, emoji: '🍓' },
    karpuz:    { id: 'karpuz',    model: 'karpuz',    ar: 'بِطِّيخ',     tr: 'karpuz',    translit: 'bittîh',    fiyat: 30, emoji: '🍉' },

    // === SEBZELER ===
    domates:   { id: 'domates',   model: 'domates',   ar: 'طَمَاطِم',    tr: 'domates',   translit: 'tamâtim',   fiyat: 3,  emoji: '🍅' },
    salatalik: { id: 'salatalik', model: 'salatalik', ar: 'خِيَار',     tr: 'salatalık', translit: 'hıyâr',     fiyat: 3,  emoji: '🥒' },
    havuc:     { id: 'havuc',     model: 'havuc',     ar: 'جَزَر',      tr: 'havuç',     translit: 'cezer',     fiyat: 2,  emoji: '🥕' },
    patates:   { id: 'patates',   model: 'patates',   ar: 'بَطَاطِس',    tr: 'patates',   translit: 'batâtis',   fiyat: 4,  emoji: '🥔' },

    // === ARAÇLAR ===
    araba:     { id: 'araba',     model: 'araba',     ar: 'سَيَّارَة',    tr: 'araba',     translit: 'seyyâra' },
    ucak:      { id: 'ucak',      model: 'ucak',      ar: 'طَائِرَة',    tr: 'uçak',      translit: 'tâira' },
    gemi:      { id: 'gemi',      model: 'gemi',      ar: 'سَفِينَة',    tr: 'gemi',      translit: 'sefîne' },
    bisiklet:  { id: 'bisiklet',  model: 'bisiklet',  ar: 'دَرَّاجَة',    tr: 'bisiklet',  translit: 'derrâca' },
    otobus:    { id: 'otobus',    model: 'otobus',    ar: 'حَافِلَة',    tr: 'otobüs',    translit: 'hâfile' },
    tren:      { id: 'tren',      model: 'tren',      ar: 'قِطَار',     tr: 'tren',      translit: 'kıtâr' },

    // === HAYVANLAR ===
    kedi:      { id: 'kedi',      model: 'kedi',      ar: 'قِطَّة',      tr: 'kedi',      translit: 'kıtta' },
    kopek:     { id: 'kopek',     model: 'kopek',     ar: 'كَلْب',       tr: 'köpek',     translit: 'kelb' },
    kus:       { id: 'kus',       model: 'kus',       ar: 'عُصْفُور',    tr: 'kuş',       translit: 'usfûr' },
    aslan:     { id: 'aslan',     model: 'aslan',     ar: 'أَسَد',       tr: 'aslan',     translit: 'esed' },
    balik:     { id: 'balik',     model: 'balik',     ar: 'سَمَكَة',     tr: 'balık',     translit: 'semeke' },
    inek:      { id: 'inek',      model: 'inek',      ar: 'بَقَرَة',     tr: 'inek',      translit: 'bakara' },
    tavsan:    { id: 'tavsan',    model: 'tavsan',    ar: 'أَرْنَب',     tr: 'tavşan',    translit: 'erneb' }
  };

  // Sahnelere göre gruplandırma
  const SAHNELER = {
    manav: {
      ad: 'Manav',
      ar: 'البَقَّال',
      icon: 'apple',
      renk: '#10b981',
      kelimeler: ['elma', 'portakal', 'muz', 'uzum', 'cilek', 'karpuz', 'domates', 'salatalik', 'havuc', 'patates'],
      arkaplan: 'manav'
    },
    araclar: {
      ad: 'Araçlar',
      ar: 'المَرْكَبَات',
      icon: 'car',
      renk: '#3b82f6',
      kelimeler: ['araba', 'ucak', 'gemi', 'bisiklet', 'otobus', 'tren'],
      arkaplan: 'sehir'
    },
    hayvanlar: {
      ad: 'Hayvanlar',
      ar: 'الحَيَوَانَات',
      icon: 'lion',
      renk: '#f59e0b',
      kelimeler: ['kedi', 'kopek', 'kus', 'aslan', 'balik', 'inek', 'tavsan'],
      arkaplan: 'cayir'
    }
  };

  global.Data = { KELIMELER, SAHNELER };
})(window);
