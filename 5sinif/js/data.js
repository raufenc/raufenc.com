// 5. Sinif ders verileri, playlist whitelist ve checkpoint sorulari
const DERSLER = [
  {
    slug: 'matematik',
    name: 'Matematik',
    icon: '📐',
    color: '#4A90D9',
    colorLight: '#E8F0FE',
    uniteler: [
      {
        slug: 'dogal-sayilar', name: 'Doğal Sayılar', hedef: 'Doğal sayılarla işlemler yapabilme',
        videoId: null, // playlist'ten ilk video otomatik gelecek
        checkpoints: [
          { saniye: 60, soru: '245 + 378 işleminin sonucu kaçtır?', secenekler: ['613', '623', '633', '523'], dogru: 0, ipucu: 'Birler basamağından başla: 5+8=13, 1 elde var.' },
          { saniye: 120, soru: 'Hangi sayı 500\'den büyük ve 600\'den küçüktür?', secenekler: ['489', '550', '601', '500'], dogru: 1, ipucu: '500 < ? < 600 aralığına bak.' },
          { saniye: 180, soru: '1000 - 347 = ?', secenekler: ['653', '753', '663', '647'], dogru: 0, ipucu: '1000\'den çıkarma yaparken her basamaktan ödünç alabilirsin.' },
        ]
      },
      {
        slug: 'kesirler', name: 'Kesirler', hedef: 'Kesirleri anlama ve işlem yapma',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '1/4 + 2/4 işleminin sonucu nedir?', secenekler: ['3/4', '3/8', '1/2', '2/4'], dogru: 0, ipucu: 'Paydalar aynıysa sadece payları topla.' },
          { saniye: 120, soru: 'Hangi kesir 1/2\'den büyüktür?', secenekler: ['1/3', '2/5', '3/4', '1/4'], dogru: 2, ipucu: '1/2 = 2/4 olduğunu hatırla.' },
          { saniye: 180, soru: 'Bir pizzanın 3/8\'i yenmiş. Kalan kaçtır?', secenekler: ['5/8', '3/8', '4/8', '6/8'], dogru: 0, ipucu: 'Bütün = 8/8, yenen kısmı çıkar.' },
        ]
      },
      {
        slug: 'ondalik-gosterim', name: 'Ondalık Gösterim', hedef: 'Ondalık sayıları kavrama',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '0,5 hangi kesre eşittir?', secenekler: ['1/2', '1/5', '5/10', '1/2 ve 5/10 ikisi de'], dogru: 3, ipucu: '0,5 = 5/10 = 1/2' },
          { saniye: 120, soru: '0,25 + 0,75 = ?', secenekler: ['0,100', '1', '1,00', '0,975'], dogru: 1, ipucu: '25 + 75 = 100, yani 1 tam.' },
        ]
      },
      {
        slug: 'yuzdeler', name: 'Yüzdeler', hedef: 'Yüzde kavramını anlama',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '%50 neye eşittir?', secenekler: ['Yarısına', 'Tamamına', 'Çeyreğine', 'Hiçbiri'], dogru: 0, ipucu: 'Yüzde 50 = 50/100 = 1/2' },
          { saniye: 120, soru: '200\'ün %25\'i kaçtır?', secenekler: ['25', '50', '75', '100'], dogru: 1, ipucu: '%25 = çeyrek. 200\'ün çeyreği...' },
        ]
      },
      {
        slug: 'geometri', name: 'Geometri', hedef: 'Temel geometrik şekiller ve ölçme',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Üçgenin iç açıları toplamı kaç derecedir?', secenekler: ['180°', '360°', '90°', '270°'], dogru: 0, ipucu: 'Tüm üçgenlerde bu toplam aynıdır.' },
          { saniye: 120, soru: 'Karenin kaç kenarı eşittir?', secenekler: ['2', '3', '4', '1'], dogru: 2, ipucu: 'Kare özel bir dikdörtgendir, tüm kenarları...' },
        ]
      },
      {
        slug: 'veri-isleme', name: 'Veri İşleme', hedef: 'Tablo ve grafik okuma, yorumlama',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Sütun grafiğinde en uzun sütun neyi gösterir?', secenekler: ['En büyük değeri', 'En küçük değeri', 'Ortalamayı', 'Toplamı'], dogru: 0, ipucu: 'Sütun ne kadar uzunsa değer o kadar büyüktür.' },
        ]
      },
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
      {
        slug: 'gunes', name: 'Güneş, Dünya ve Ay', hedef: 'Güneş sistemini ve Ay\'ın evrelerini öğrenme',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Ay\'ın kendi ışığı var mıdır?', secenekler: ['Evet', 'Hayır'], dogru: 1, ipucu: 'Ay, Güneş\'ten aldığı ışığı yansıtır.' },
          { saniye: 120, soru: 'Dünya\'nın Güneş etrafındaki dönüşü ne kadar sürer?', secenekler: ['1 gün', '1 ay', '1 yıl', '1 hafta'], dogru: 2, ipucu: 'Bu dönüş mevsimlerle ilgilidir.' },
          { saniye: 180, soru: 'Ay\'ın evreleri kaç günde tamamlanır?', secenekler: ['Yaklaşık 7 gün', 'Yaklaşık 15 gün', 'Yaklaşık 29,5 gün', 'Yaklaşık 365 gün'], dogru: 2, ipucu: 'Bir ayın uzunluğu buradan gelir.' },
        ]
      },
      {
        slug: 'canlilar', name: 'Canlılar Dünyası', hedef: 'Canlıların sınıflandırılması',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Canlıları sınıflandırmak neden önemlidir?', secenekler: ['Düzeni sağlar', 'Gereksizdir', 'Sadece bilim insanları içindir', 'Eğlence amaçlıdır'], dogru: 0, ipucu: 'Milyonlarca canlı türünü tanımak için...' },
          { saniye: 120, soru: 'Bitkiler hangi özellikle hayvanlardan ayrılır?', secenekler: ['Hareket eder', 'Fotosentez yapar', 'Uyur', 'Nefes alır'], dogru: 1, ipucu: 'Güneş ışığını kullanarak besin üretme...' },
        ]
      },
      {
        slug: 'kuvvet', name: 'Kuvvet ve Hareket', hedef: 'Kuvvetin ölçülmesi ve etkileri',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Kuvvetin birimi nedir?', secenekler: ['Kilogram', 'Newton', 'Metre', 'Litre'], dogru: 1, ipucu: 'Isaac Newton\'dan adını alır.' },
          { saniye: 120, soru: 'Sürtünme kuvveti hareketi nasıl etkiler?', secenekler: ['Hızlandırır', 'Yavaşlatır', 'Değiştirmez', 'Yön verir'], dogru: 1, ipucu: 'Buz üzerinde kayarken sürtünme azdır...' },
        ]
      },
      {
        slug: 'madde', name: 'Madde ve Değişim', hedef: 'Maddenin halleri ve hal değişimleri',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Maddenin üç hali nedir?', secenekler: ['Katı, sıvı, gaz', 'Sıcak, soğuk, ılık', 'Büyük, küçük, orta', 'Ağır, hafif, normal'], dogru: 0, ipucu: 'Su; buz, su ve buhar olarak...' },
          { saniye: 120, soru: 'Buharlaşma hangi hal değişimidir?', secenekler: ['Katıdan sıvıya', 'Sıvıdan gaza', 'Gazdan sıvıya', 'Katıdan gaza'], dogru: 1, ipucu: 'Islak çamaşırlar kuruyunca su nereye gider?' },
        ]
      },
      {
        slug: 'isi-sicaklik', name: 'Isı ve Sıcaklık', hedef: 'Isı-sıcaklık farkı ve ölçme',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Sıcaklık neyle ölçülür?', secenekler: ['Cetvel', 'Termometre', 'Terazi', 'Kronometre'], dogru: 1, ipucu: 'Hastalanınca ateşimizi neyle ölçeriz?' },
        ]
      },
      {
        slug: 'elektrik', name: 'Elektrik', hedef: 'Basit elektrik devreleri',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Basit bir elektrik devresinde hangi elemanlar bulunur?', secenekler: ['Pil, kablo, ampul, anahtar', 'Sadece pil', 'Sadece ampul', 'Pil ve su'], dogru: 0, ipucu: 'Elektrik akımı pil\'den çıkar, kablo ile taşınır...' },
        ]
      },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQmONRNbSycsnBQqgRMzpun', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'A', kanal: 'Konuyu Kap', id: 'PLn1NUdDfo3GOmxj56jqWmh1mrdMfU0gGm', kullanim: 'Mikro yedek' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWIZt11pMwDrfdeuREY7F92f', kullanim: 'Derin anlatım' },
    ]
  },
  {
    slug: 'turkce',
    name: 'Türkçe',
    icon: '📖',
    color: '#E53935',
    colorLight: '#FFEBEE',
    uniteler: [
      {
        slug: 'sozcukte-anlam', name: 'Sözcükte Anlam', hedef: 'Eş anlamlı, zıt anlamlı sözcükler',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"Güzel" kelimesinin eş anlamlısı hangisidir?', secenekler: ['Çirkin', 'Hoş', 'Kötü', 'Zor'], dogru: 1, ipucu: 'Aynı anlama gelen sözcük arıyoruz.' },
          { saniye: 120, soru: '"Sıcak" kelimesinin zıt anlamlısı nedir?', secenekler: ['Ilık', 'Soğuk', 'Serin', 'Ateşli'], dogru: 1, ipucu: 'Tam karşıt anlam taşıyan sözcük hangisi?' },
          { saniye: 180, soru: '"Ayağa kalkmak" ne tür bir söz öbeğidir?', secenekler: ['Atasözü', 'Deyim', 'Özdeyiş', 'Tekerleme'], dogru: 1, ipucu: 'Kalıplaşmış, gerçek anlamından farklı anlam taşıyan söz grubudur.' },
        ]
      },
      {
        slug: 'cumle-bilgisi', name: 'Cümle Bilgisi', hedef: 'Cümle ögeleri ve türleri',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Cümlede yüklemi bulmak için hangi soru sorulur?', secenekler: ['Kim?', 'Ne yapıyor?', 'Nerede?', 'Ne zaman?'], dogru: 1, ipucu: 'Yüklem, cümledeki eylemi bildirir.' },
          { saniye: 120, soru: '"Ali okula gitti." cümlesinde özne kimdir?', secenekler: ['Okul', 'Ali', 'Gitti', 'Okula'], dogru: 1, ipucu: 'İşi yapan kişiyi bul.' },
        ]
      },
      {
        slug: 'yazim-kurallari', name: 'Yazım Kuralları', hedef: 'Büyük harf, noktalama, yazım',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Cümlenin sonuna hangi işaret konur?', secenekler: ['Virgül', 'Nokta', 'İki nokta', 'Tire'], dogru: 1, ipucu: 'Cümle tamamlandığında...' },
        ]
      },
      {
        slug: 'anlatimsallar', name: 'Anlatım Bozuklukları', hedef: 'Anlatım bozukluklarını bulma ve düzeltme',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"Hızla koşarak hızlı gitti." cümlesindeki sorun nedir?', secenekler: ['Anlam tekrarı', 'Özne eksik', 'Yüklem yok', 'Doğru cümle'], dogru: 0, ipucu: '"Hızla" ve "hızlı" aynı anlama geliyor.' },
        ]
      },
      {
        slug: 'metin-turleri', name: 'Metin Türleri', hedef: 'Farklı metin türlerini tanıma',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Bir hikâyede olay, yer, zaman ve kişi bulunur. Bu ne tür bir metindir?', secenekler: ['Bilgilendirici', 'Öyküleyici', 'Şiir', 'Deneme'], dogru: 1, ipucu: 'Olayların anlatıldığı metinler...' },
        ]
      },
      {
        slug: 'dinleme', name: 'Dinleme ve Okuma', hedef: 'Dinleme ve okuduğunu anlama',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Okuduğunu anlamak için en etkili yöntem hangisidir?', secenekler: ['Hızlı okumak', 'Not alarak okumak', 'Sesli okumak', 'Atlamak'], dogru: 1, ipucu: 'Anlamaya yardımcı olan aktif bir strateji...' },
        ]
      },
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
      {
        slug: 'birey-toplum', name: 'Birey ve Toplum', hedef: 'Gruplar, roller, haklar ve sorumluluklar',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Aile, okul ve arkadaş çevresi neye örnektir?', secenekler: ['Toplumsal grup', 'Devlet', 'Kurum', 'Şirket'], dogru: 0, ipucu: 'İnsanların bir arada bulunduğu yapılardır.' },
          { saniye: 120, soru: 'Her bireyin toplumda üstlendiği görevlere ne denir?', secenekler: ['Hak', 'Rol', 'Sorumluluk', 'Özgürlük'], dogru: 1, ipucu: 'Öğrenci, evlat, arkadaş...' },
        ]
      },
      {
        slug: 'kultur', name: 'Kültür ve Miras', hedef: 'Kültürel zenginlikler ve ortak yaşam',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Yöresel yemekler, kıyafetler ve gelenekler neyin parçasıdır?', secenekler: ['Ekonomi', 'Kültür', 'Siyaset', 'Bilim'], dogru: 1, ipucu: 'Bir toplumun yaşam biçimini yansıtır.' },
        ]
      },
      {
        slug: 'insanlar-yerler', name: 'İnsanlar, Yerler ve Çevreler', hedef: 'Haritalar, coğrafi ögeler',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Haritada yönleri bulmak için ne kullanılır?', secenekler: ['Ölçek', 'Pusula gülü', 'Lejant', 'Başlık'], dogru: 1, ipucu: 'Kuzey, güney, doğu, batıyı gösteren simge...' },
        ]
      },
      {
        slug: 'bilim-teknoloji', name: 'Bilim, Teknoloji ve Toplum', hedef: 'Bilimsel gelişmelerin topluma etkisi',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Matbaa\'nın icadı toplumu nasıl etkilemiştir?', secenekler: ['Bilgi yayılması kolaylaştı', 'Ulaşım hızlandı', 'Tarım arttı', 'Savaşlar azaldı'], dogru: 0, ipucu: 'Kitapların çoğaltılması ile...' },
        ]
      },
      {
        slug: 'uretim-tuketim', name: 'Üretim, Dağıtım ve Tüketim', hedef: 'Ekonomi temelleri',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'İhtiyaçlarımızı karşılamak için yapılan faaliyetlere ne denir?', secenekler: ['Üretim', 'Tüketim', 'Dağıtım', 'Ekonomi'], dogru: 0, ipucu: 'Buğday yetiştirmek, ekmek yapmak...' },
        ]
      },
      {
        slug: 'etkin-vatandaslik', name: 'Etkin Vatandaşlık', hedef: 'Demokrasi ve yönetim biçimleri',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: 'Demokraside yöneticiler nasıl belirlenir?', secenekler: ['Atanarak', 'Seçimle', 'Kurayla', 'Sırayla'], dogru: 1, ipucu: 'Halkın iradesini yansıtan yöntem...' },
        ]
      },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQay3pMGxFF_psduAqUR_7n', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'A', kanal: 'Konuyu Kap', id: 'PLn1NUdDfo3GNwJ_GAk0689nQHnAMXTTUP', kullanim: 'Mikro yedek' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWJp_rYB9Cp9AfN5GyisxdsF', kullanim: 'Derin anlatım' },
    ]
  },
  {
    slug: 'ingilizce',
    name: 'İngilizce',
    icon: '🇬🇧',
    color: '#7B1FA2',
    colorLight: '#F3E5F5',
    uniteler: [
      {
        slug: 'hello', name: 'Hello!', hedef: 'Selamlaşma ve tanışma',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"Merhaba, benim adım Ali." cümlesinin İngilizcesi nedir?', secenekler: ['Hello, my name is Ali.', 'Goodbye Ali.', 'How are you Ali?', 'Thank you Ali.'], dogru: 0, ipucu: '"My name is" = "Benim adım"' },
          { saniye: 120, soru: '"How are you?" sorusunun Türkçesi nedir?', secenekler: ['Adın ne?', 'Nasılsın?', 'Nerelisin?', 'Kaç yaşındasın?'], dogru: 1, ipucu: '"How" = "Nasıl"' },
        ]
      },
      {
        slug: 'my-town', name: 'My Town', hedef: 'Şehir ve yönler',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"Where is the hospital?" ne demektir?', secenekler: ['Hastane ne zaman?', 'Hastane nerede?', 'Hastane nasıl?', 'Hastane kim?'], dogru: 1, ipucu: '"Where" = "Nerede"' },
        ]
      },
      {
        slug: 'games-hobbies', name: 'Games and Hobbies', hedef: 'Oyunlar, hobiler ve serbest zaman',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"I like playing football." ne demektir?', secenekler: ['Futbol oynamayı seviyorum.', 'Futbol oynuyorum.', 'Futbol izliyorum.', 'Futbol zor.'], dogru: 0, ipucu: '"I like" = "Seviyorum", "playing" = "oynamayı"' },
        ]
      },
      {
        slug: 'my-daily-routine', name: 'My Daily Routine', hedef: 'Günlük rutin ve saatler',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"I wake up at 7 o\'clock." ne demektir?', secenekler: ['Saat 7\'de uyurum.', 'Saat 7\'de uyanırım.', 'Saat 7\'de yerim.', 'Saat 7\'de giderim.'], dogru: 1, ipucu: '"Wake up" = "uyanmak"' },
        ]
      },
      {
        slug: 'health', name: 'Health', hedef: 'Sağlık ve hastalıklar',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"I have a headache" ne demektir?', secenekler: ['Karnım ağrıyor', 'Başım ağrıyor', 'Kolum ağrıyor', 'Gözüm ağrıyor'], dogru: 1, ipucu: '"Head" = "baş", "ache" = "ağrı"' },
        ]
      },
      {
        slug: 'movies', name: 'Movies', hedef: 'Filmler ve tercihler',
        videoId: null,
        checkpoints: [
          { saniye: 60, soru: '"What kind of movies do you like?" ne demektir?', secenekler: ['Hangi filmi izledin?', 'Ne tür filmler seversin?', 'Film ne zaman?', 'Film nerede?'], dogru: 1, ipucu: '"What kind of" = "Ne tür"' },
        ]
      },
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQrXpuwUgTjmWubpvEwC6TH', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'B', kanal: 'MEB Dinleme', id: 'PLY5F4Y-Xf8wv5o8vx0crPkw1-dYayYbcH', kullanim: 'Dinleme / warm-up' },
      { tier: 'B', kanal: 'Digital Stories', id: 'PLK-z_FjFeNn6Wnw2q_zcQPPS-j_cEH-31', kullanim: 'Dijital hikaye' },
    ]
  }
];

const MODLAR = [
  { id: 'hizli', name: 'Hızlı', icon: '⚡', desc: 'Kısa ve hızlı dersler, az checkpoint', color: '#FF6B35' },
  { id: 'normal', name: 'Normal', icon: '📚', desc: 'Standart ders akışı', color: '#4A90D9' },
  { id: 'destekli', name: 'Destekli', icon: '🤝', desc: 'Daha fazla ipucu ve açıklama', color: '#43A047' },
  { id: 'sakin', name: 'Sakin', icon: '🌿', desc: 'Yavaş tempo, az animasyon', color: '#7B1FA2' },
];

function getEmbedUrl(playlistId) {
  return `https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1&rel=0&modestbranding=1`;
}

function getDers(slug) {
  return DERSLER.find(d => d.slug === slug);
}

function getUnite(dersSlug, uniteSlug) {
  const ders = getDers(dersSlug);
  if (!ders) return null;
  return ders.uniteler.find(u => u.slug === uniteSlug);
}

function getCheckpoints(dersSlug, uniteSlug) {
  const unite = getUnite(dersSlug, uniteSlug);
  return unite?.checkpoints || [];
}

window.DERSLER = DERSLER;
window.MODLAR = MODLAR;
window.getEmbedUrl = getEmbedUrl;
window.getDers = getDers;
window.getUnite = getUnite;
window.getCheckpoints = getCheckpoints;
