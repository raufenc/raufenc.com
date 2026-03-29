// 5. Sinif ders verileri ve playlist whitelist
const DERSLER = [
  {
    slug: 'matematik',
    name: 'Matematik',
    icon: '📐',
    color: '#4A90D9',
    colorLight: '#E8F0FE',
    uniteler: [
      { slug: 'dogal-sayilar', name: 'Doğal Sayılar', hedef: 'Doğal sayılarla işlemler yapabilme' },
      { slug: 'kesirler', name: 'Kesirler', hedef: 'Kesirleri anlama ve işlem yapma' },
      { slug: 'ondalik-gosterim', name: 'Ondalık Gösterim', hedef: 'Ondalık sayıları kavrama' },
      { slug: 'yuzdeler', name: 'Yüzdeler', hedef: 'Yüzde kavramını anlama' },
      { slug: 'geometri', name: 'Geometri', hedef: 'Temel geometrik şekiller ve ölçme' },
      { slug: 'veri-isleme', name: 'Veri İşleme', hedef: 'Tablo ve grafik okuma, yorumlama' },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pRw6UsxkdnIdzdpW5B_dI6i', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWLwyQUu5RPuYb5OoIvQ9CKt', kullanim: 'Derin anlatım' },
      { tier: 'B', kanal: 'tonguç', id: 'PLKv4_2b0wypV4_OdzEBxphOp_GOadSfLM', kullanim: 'Enerjik tekrar' },
    ]
  },
  {
    slug: 'fen',
    name: 'Fen Bilimleri',
    icon: '🔬',
    color: '#43A047',
    colorLight: '#E8F5E9',
    uniteler: [
      { slug: 'gunes', name: 'Güneş, Dünya ve Ay', hedef: 'Güneş sistemini ve Ay\'ın evrelerini öğrenme' },
      { slug: 'canlilar', name: 'Canlılar Dünyası', hedef: 'Canlıların sınıflandırılması' },
      { slug: 'kuvvet', name: 'Kuvvet ve Hareket', hedef: 'Kuvvetin ölçülmesi ve etkileri' },
      { slug: 'madde', name: 'Madde ve Değişim', hedef: 'Maddenin halleri ve hal değişimleri' },
      { slug: 'isi-sicaklik', name: 'Isı ve Sıcaklık', hedef: 'Isı-sıcaklık farkı ve ölçme' },
      { slug: 'elektrik', name: 'Elektrik', hedef: 'Basit elektrik devreleri' },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQmONRNbSycsnBQqgRMzpun', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'A', kanal: 'Konuyu Kap', id: 'PLn1NUdDfo3GOmxj56jqWmh1mrdMfU0gGm', kullanim: 'Mikro yedek' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWIZt11pMwDrfdeuREY7F92f', kullanim: 'Derin anlatım' },
      { tier: 'B', kanal: 'tonguç', id: 'PLKv4_2b0wypVU-1ZNRxfBXzNjQzJj-SyL', kullanim: 'Enerjik tekrar' },
    ]
  },
  {
    slug: 'turkce',
    name: 'Türkçe',
    icon: '📖',
    color: '#E53935',
    colorLight: '#FFEBEE',
    uniteler: [
      { slug: 'sozcukte-anlam', name: 'Sözcükte Anlam', hedef: 'Eş anlamlı, zıt anlamlı sözcükler' },
      { slug: 'cumle-bilgisi', name: 'Cümle Bilgisi', hedef: 'Cümle ögeleri ve türleri' },
      { slug: 'yazim-kurallari', name: 'Yazım Kuralları', hedef: 'Büyük harf, noktalama, yazım' },
      { slug: 'anlatimsallar', name: 'Anlatım Bozuklukları', hedef: 'Anlatım bozukluklarını bulma ve düzeltme' },
      { slug: 'metin-turleri', name: 'Metin Türleri', hedef: 'Farklı metin türlerini tanıma' },
      { slug: 'dinleme', name: 'Dinleme ve Okuma', hedef: 'Dinleme ve okuduğunu anlama' },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQahebWos9BnH_dRnDqYYEU', kullanim: 'Ana dilbilgisi' },
      { tier: 'A', kanal: 'Cemal Hoca', id: 'PLW8dj_CXfnGEAh2JOahjXb75G5hCCn9U_', kullanim: 'Tema uyumlu ek' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWJwOQA4BL_zGOnGpFC5IG4d', kullanim: 'Derin anlatım' },
    ]
  },
  {
    slug: 'sosyal',
    name: 'Sosyal Bilgiler',
    icon: '🌍',
    color: '#FF9800',
    colorLight: '#FFF3E0',
    uniteler: [
      { slug: 'birey-toplum', name: 'Birey ve Toplum', hedef: 'Gruplar, roller, haklar ve sorumluluklar' },
      { slug: 'kultur', name: 'Kültür ve Miras', hedef: 'Kültürel zenginlikler ve ortak yaşam' },
      { slug: 'insanlar-yerler', name: 'İnsanlar, Yerler ve Çevreler', hedef: 'Haritalar, coğrafi ögeler' },
      { slug: 'bilim-teknoloji', name: 'Bilim, Teknoloji ve Toplum', hedef: 'Bilimsel gelişmelerin topluma etkisi' },
      { slug: 'uretim-tuketim', name: 'Üretim, Dağıtım ve Tüketim', hedef: 'Ekonomi temelleri' },
      { slug: 'etkin-vatandaslik', name: 'Etkin Vatandaşlık', hedef: 'Demokrasi ve yönetim biçimleri' },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQay3pMGxFF_psduAqUR_7n', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'A', kanal: 'Konuyu Kap', id: 'PLn1NUdDfo3GNwJ_GAk0689nQHnAMXTTUP', kullanim: 'Mikro yedek' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWJp_rYB9Cp9AfN5GyisxdsF', kullanim: 'Derin anlatım' },
      { tier: 'B', kanal: 'tonguç', id: 'PLKv4_2b0wypV5mvO1UTmyKxliheilweaE', kullanim: 'Enerjik tekrar' },
    ]
  },
  {
    slug: 'ingilizce',
    name: 'İngilizce',
    icon: '🇬🇧',
    color: '#7B1FA2',
    colorLight: '#F3E5F5',
    uniteler: [
      { slug: 'hello', name: 'Hello!', hedef: 'Selamlaşma ve tanışma' },
      { slug: 'my-town', name: 'My Town', hedef: 'Şehir ve yönler' },
      { slug: 'games-hobbies', name: 'Games and Hobbies', hedef: 'Oyunlar, hobiler ve serbest zaman' },
      { slug: 'my-daily-routine', name: 'My Daily Routine', hedef: 'Günlük rutin ve saatler' },
      { slug: 'health', name: 'Health', hedef: 'Sağlık ve hastalıklar' },
      { slug: 'movies', name: 'Movies', hedef: 'Filmler ve tercihler' },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQrXpuwUgTjmWubpvEwC6TH', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'B', kanal: 'MEB Dinleme', id: 'PLY5F4Y-Xf8wv5o8vx0crPkw1-dYayYbcH', kullanim: 'Dinleme / warm-up' },
      { tier: 'B', kanal: 'Digital Stories', id: 'PLK-z_FjFeNn6Wnw2q_zcQPPS-j_cEH-31', kullanim: 'Dijital hikaye' },
    ]
  }
];

// Ornek sorular (V1 demo) - her unite icin 3-5 soru
const SORULAR = {
  'matematik': {
    'dogal-sayilar': [
      { soru: '245 + 378 işleminin sonucu kaçtır?', secenekler: ['613', '623', '633', '523'], dogru: 0, ipucu: 'Birler basamağından başla: 5+8=13, 1 elde var.' },
      { soru: 'Hangi sayı 500\'den büyük ve 600\'den küçüktür?', secenekler: ['489', '550', '601', '500'], dogru: 1, ipucu: '500 < ? < 600 aralığına bak.' },
      { soru: '1000 - 347 = ?', secenekler: ['653', '753', '663', '647'], dogru: 0, ipucu: '1000\'den çıkarma yaparken her basamaktan ödünç alabilirsin.' },
    ],
    'kesirler': [
      { soru: '1/4 + 2/4 işleminin sonucu nedir?', secenekler: ['3/4', '3/8', '1/2', '2/4'], dogru: 0, ipucu: 'Paydalar aynıysa sadece payları topla.' },
      { soru: 'Hangi kesir 1/2\'den büyüktür?', secenekler: ['1/3', '2/5', '3/4', '1/4'], dogru: 2, ipucu: '1/2 = 2/4 olduğunu hatırla.' },
      { soru: 'Bir pizzanın 3/8\'i yenmiş. Kalan kaçtır?', secenekler: ['5/8', '3/8', '4/8', '6/8'], dogru: 0, ipucu: 'Bütün = 8/8, yenen kısmı çıkar.' },
    ],
    'geometri': [
      { soru: 'Üçgenin iç açıları toplamı kaç derecedir?', secenekler: ['180°', '360°', '90°', '270°'], dogru: 0, ipucu: 'Tüm üçgenlerde bu toplam aynıdır.' },
      { soru: 'Karenin kaç kenarı eşittir?', secenekler: ['2', '3', '4', '1'], dogru: 2, ipucu: 'Kare özel bir dikdörtgendir, tüm kenarları...' },
    ],
  },
  'fen': {
    'gunes': [
      { soru: 'Ay\'ın kendi ışığı var mıdır?', secenekler: ['Evet', 'Hayır'], dogru: 1, ipucu: 'Ay, Güneş\'ten aldığı ışığı yansıtır.' },
      { soru: 'Dünya\'nın Güneş etrafındaki dönüşü ne kadar sürer?', secenekler: ['1 gün', '1 ay', '1 yıl', '1 hafta'], dogru: 2, ipucu: 'Bu dönüş mevsimlerle ilgilidir.' },
      { soru: 'Ay\'ın evreleri kaç günde tamamlanır?', secenekler: ['Yaklaşık 7 gün', 'Yaklaşık 15 gün', 'Yaklaşık 29,5 gün', 'Yaklaşık 365 gün'], dogru: 2, ipucu: 'Bir ayın uzunluğu buradan gelir.' },
    ],
    'kuvvet': [
      { soru: 'Kuvvetin birimi nedir?', secenekler: ['Kilogram', 'Newton', 'Metre', 'Litre'], dogru: 1, ipucu: 'Isaac Newton\'dan adını alır.' },
      { soru: 'Sürtünme kuvveti hareketi nasıl etkiler?', secenekler: ['Hızlandırır', 'Yavaşlatır', 'Değiştirmez', 'Yön verir'], dogru: 1, ipucu: 'Buz üzerinde kayarken sürtünme azdır...' },
    ],
  },
  'turkce': {
    'sozcukte-anlam': [
      { soru: '"Güzel" kelimesinin eş anlamlısı hangisidir?', secenekler: ['Çirkin', 'Hoş', 'Kötü', 'Zor'], dogru: 1, ipucu: 'Aynı anlama gelen sözcük arıyoruz.' },
      { soru: '"Sıcak" kelimesinin zıt anlamlısı nedir?', secenekler: ['Ilık', 'Soğuk', 'Serin', 'Ateşli'], dogru: 1, ipucu: 'Tam karşıt anlam taşıyan sözcük hangisi?' },
      { soru: '"Ayağa kalkmak" ne tür bir söz öbeğidir?', secenekler: ['Atasözü', 'Deyim', 'Özdeyiş', 'Tekerleme'], dogru: 1, ipucu: 'Gerçek anlamından farklı bir anlam taşıyan kalıplaşmış söz grubudur.' },
    ],
    'cumle-bilgisi': [
      { soru: 'Cümlede yüklemi bulmak için hangi soru sorulur?', secenekler: ['Kim?', 'Ne yapıyor?', 'Nerede?', 'Ne zaman?'], dogru: 1, ipucu: 'Yüklem, cümledeki eylemi veya durumu bildirir.' },
      { soru: '"Ali okula gitti." cümlesinde özne kimdir?', secenekler: ['Okul', 'Ali', 'Gitti', 'Okula'], dogru: 1, ipucu: 'İşi yapan kişiyi bul.' },
    ],
  },
  'sosyal': {
    'birey-toplum': [
      { soru: 'Aile, okul ve arkadaş çevresi neye örnektir?', secenekler: ['Toplumsal grup', 'Devlet', 'Kurum', 'Şirket'], dogru: 0, ipucu: 'İnsanların bir arada bulunduğu yapılardır.' },
      { soru: 'Her bireyin toplumda üstlendiği görevlere ne denir?', secenekler: ['Hak', 'Rol', 'Sorumluluk', 'Özgürlük'], dogru: 1, ipucu: 'Öğrenci, evlat, arkadaş bunların örnekleridir.' },
    ],
    'kultur': [
      { soru: 'Yöresel yemekler, kıyafetler ve gelenekler neyin parçasıdır?', secenekler: ['Ekonomi', 'Kültür', 'Siyaset', 'Bilim'], dogru: 1, ipucu: 'Bir toplumun yaşam biçimini yansıtır.' },
    ],
  },
  'ingilizce': {
    'hello': [
      { soru: '"Merhaba, benim adım Ali." cümlesinin İngilizcesi nedir?', secenekler: ['Hello, my name is Ali.', 'Goodbye Ali.', 'How are you Ali?', 'Thank you Ali.'], dogru: 0, ipucu: '"My name is" = "Benim adım"' },
      { soru: '"How are you?" sorusunun Türkçesi nedir?', secenekler: ['Adın ne?', 'Nasılsın?', 'Nerelisin?', 'Kaç yaşındasın?'], dogru: 1, ipucu: '"How" = "Nasıl"' },
    ],
    'health': [
      { soru: '"I have a headache" ne demektir?', secenekler: ['Karnım ağrıyor', 'Başım ağrıyor', 'Kolum ağrıyor', 'Gözüm ağrıyor'], dogru: 1, ipucu: '"Head" = "baş", "ache" = "ağrı"' },
    ],
  },
};

const MODLAR = [
  { id: 'hizli', name: 'Hızlı', icon: '⚡', desc: 'Kısa ve hızlı dersler, az checkpoint', color: '#FF6B35' },
  { id: 'normal', name: 'Normal', icon: '📚', desc: 'Standart ders akışı', color: '#4A90D9' },
  { id: 'destekli', name: 'Destekli', icon: '🤝', desc: 'Daha fazla ipucu ve açıklama', color: '#43A047' },
  { id: 'sakin', name: 'Sakin', icon: '🌿', desc: 'Yavaş tempo, az animasyon', color: '#7B1FA2' },
];

function getEmbedUrl(playlistId) {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&enablejsapi=1&rel=0`;
}

function getDers(slug) {
  return DERSLER.find(d => d.slug === slug);
}

function getUnite(dersSlug, uniteSlug) {
  const ders = getDers(dersSlug);
  if (!ders) return null;
  return ders.uniteler.find(u => u.slug === uniteSlug);
}

function getSorular(dersSlug, uniteSlug) {
  return SORULAR[dersSlug]?.[uniteSlug] || [];
}

window.DERSLER = DERSLER;
window.MODLAR = MODLAR;
window.SORULAR = SORULAR;
window.getEmbedUrl = getEmbedUrl;
window.getDers = getDers;
window.getUnite = getUnite;
window.getSorular = getSorular;
