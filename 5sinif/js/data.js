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
        slug: 'dogal-sayilar', name: 'Doğal Sayıları Okuma ve Yazma', hedef: 'Büyük doğal sayıları okuyup yazabilme',
        videoId: 'I108YUUtwmU',
        checkpoints: [
          { saniye: 60, soru: '47.358 sayısını doğru okuyan hangisidir?', secenekler: ['Dört yüz yetmiş üç bin elli sekiz', 'Kırk yedi bin üç yüz elli sekiz', 'Dört yedi üç beş sekiz', 'Kırk yedi milyon üç yüz elli sekiz'], dogru: 1, ipucu: 'Basamak değerlerine dikkat et: on binler, binler, yüzler, onlar, birler.' },
          { saniye: 120, soru: 'Bir milyon sayısı rakamla nasıl yazılır?', secenekler: ['10.000', '100.000', '1.000.000', '10.000.000'], dogru: 2, ipucu: 'Milyon, 6 sıfır içerir.' },
          { saniye: 180, soru: '250.000\'in 10\'da biri kaçtır?', secenekler: ['2.500', '25.000', '250', '2.500.000'], dogru: 1, ipucu: '10\'da biri bulmak için 10\'a böl.' },
        ]
      },
      {
        slug: 'kesirler', name: 'Kesirler', hedef: 'Kesirleri anlama, karşılaştırma ve işlem yapma',
        videoId: '5ZNxjyxT2hM',
        checkpoints: [
          { saniye: 60, soru: '3/4 kesrinde pay kaçtır?', secenekler: ['4', '3', '7', '1'], dogru: 1, ipucu: 'Kesirde pay çizginin üstündeki sayıdır.' },
          { saniye: 120, soru: '1/2 + 1/4 işleminin sonucu nedir?', secenekler: ['2/6', '3/4', '2/4', '1/6'], dogru: 1, ipucu: 'Önce paydaları eşitle: 1/2 = 2/4 olur.' },
          { saniye: 180, soru: 'Pizza 8 eşit parçaya bölündü, 3 parça yendi. Kalan kesir nedir?', secenekler: ['3/8', '5/8', '4/8', '6/8'], dogru: 1, ipucu: 'Bütün = 8/8, yenen 3/8\'i çıkar: 8/8 - 3/8 = ?' },
        ]
      },
      {
        slug: 'carpma-bolme', name: 'Çarpma ve Bölme Problemleri', hedef: 'Çarpma ve bölme işlemleri içeren problemleri çözme',
        videoId: 'YJKpdPBgJmU',
        checkpoints: [
          { saniye: 60, soru: '12 × 15 işleminin sonucu kaçtır?', secenekler: ['170', '180', '190', '175'], dogru: 1, ipucu: '12 × 15 = 12 × 10 + 12 × 5 şeklinde düşün.' },
          { saniye: 120, soru: '144 ÷ 12 işleminin sonucu kaçtır?', secenekler: ['11', '13', '12', '14'], dogru: 2, ipucu: '12 × ? = 144 sorusunu sor.' },
          { saniye: 180, soru: 'Ali\'nin 5 defteri var. Her defterde 24 sayfa var. Toplam kaç sayfa var?', secenekler: ['100', '110', '120', '115'], dogru: 2, ipucu: '5 × 24 = ?' },
        ]
      },
      {
        slug: 'alan-cevre', name: 'Alan ve Çevre', hedef: 'Dikdörtgen ve karenin alan ve çevresini hesaplama',
        videoId: 'WKbrSAJ6oiI',
        checkpoints: [
          { saniye: 60, soru: 'Dikdörtgenin alanı nasıl hesaplanır?', secenekler: ['En + Boy', 'En × Boy', '2 × (En + Boy)', 'En ÷ Boy'], dogru: 1, ipucu: 'Alan = uzunluk × genişlik.' },
          { saniye: 120, soru: 'En 6 cm, boy 4 cm olan dikdörtgenin alanı kaçtır?', secenekler: ['20 cm²', '24 cm²', '10 cm²', '48 cm²'], dogru: 1, ipucu: 'Alan = 6 × 4 = ?' },
        ]
      },
      {
        slug: 'geometri', name: 'Geometrik Şekiller (Üçgenler)', hedef: 'Üçgenlerin özelliklerini öğrenme',
        videoId: 'NZQCvqCBt5g',
        checkpoints: [
          { saniye: 60, soru: 'Üçgenin iç açıları toplamı kaç derecedir?', secenekler: ['90°', '180°', '270°', '360°'], dogru: 1, ipucu: 'Bu kural tüm üçgenler için geçerlidir.' },
          { saniye: 120, soru: 'Eşkenar üçgende tüm kenarlar nasıldır?', secenekler: ['Farklı uzunluktadır', 'Biri diğerinin iki katıdır', 'Birbirine eşittir', 'İki tanesi eşittir'], dogru: 2, ipucu: '"Eşkenar" kelimesinin anlamı tüm kenarların eşit olduğunu söylüyor.' },
        ]
      },
      {
        slug: 'zaman-olcme', name: 'Zaman Ölçme', hedef: 'Zaman birimlerini öğrenme ve dönüşüm yapma',
        videoId: 'euQgzldoUck',
        checkpoints: [
          { saniye: 60, soru: '1 saat kaç dakikadır?', secenekler: ['30', '50', '60', '100'], dogru: 2, ipucu: 'Saatin kadranda 60 çizgi var.' },
          { saniye: 120, soru: '3 saat 20 dakika toplamda kaç dakika eder?', secenekler: ['180', '200', '220', '320'], dogru: 1, ipucu: '3 saat = 3 × 60 = 180 dakika, üstüne 20 ekle.' },
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
        slug: 'gunes', name: 'Güneş ve Güneş Sistemi', hedef: 'Güneş\'in yapısı ve özelliklerini öğrenme',
        videoId: 'LoAG7HHVxtM',
        checkpoints: [
          { saniye: 60, soru: 'Güneş ne tür bir gök cismidir?', secenekler: ['Gezegen', 'Yıldız', 'Uydu', 'Asteroid'], dogru: 1, ipucu: 'Güneş kendi ışığını ve ısısını üretir.' },
          { saniye: 120, soru: 'Güneş\'ten Dünya\'ya ışık yaklaşık ne kadar sürede ulaşır?', secenekler: ['8 saniye', '8 dakika', '8 saat', '8 gün'], dogru: 1, ipucu: 'Işık çok hızlıdır ama mesafe çok büyüktür.' },
          { saniye: 180, soru: 'Dünya\'nın Güneş etrafında dönüşü ne kadar sürer?', secenekler: ['1 gün', '1 ay', '1 yıl', '365 saat'], dogru: 2, ipucu: 'Bu dönüş mevsimlerin oluşmasını sağlar.' },
        ]
      },
      {
        slug: 'ay-evreleri', name: 'Ay ve Ay\'ın Evreleri', hedef: 'Ay\'ın evrelerini ve özelliklerini öğrenme',
        videoId: 'smkx-o2txNI',
        checkpoints: [
          { saniye: 60, soru: 'Ay kendi ışığını üretir mi?', secenekler: ['Evet, kendi ışığı var', 'Hayır, Güneş\'ten yansıtır', 'Evet ama çok azdır', 'Sadece geceleri üretir'], dogru: 1, ipucu: 'Ay bir uydu, yıldız değil — ışık üretemez.' },
          { saniye: 120, soru: 'Ay\'ın bir tam evresi yaklaşık kaç günde tamamlanır?', secenekler: ['7 gün', '14 gün', '29,5 gün', '365 gün'], dogru: 2, ipucu: 'Takvimimizdeki "ay" kelimesi buradan gelir.' },
        ]
      },
      {
        slug: 'kuvvet', name: 'Kuvveti Tanıyalım', hedef: 'Kuvvetin ne olduğunu ve etkilerini öğrenme',
        videoId: 'QOqTFJdp_88',
        checkpoints: [
          { saniye: 60, soru: 'Kuvvetin birimi nedir?', secenekler: ['Kilogram', 'Newton', 'Metre', 'Amper'], dogru: 1, ipucu: 'Bilim insanı Isaac Newton\'dan adını alır.' },
          { saniye: 120, soru: 'Kuvvet bir cisme nasıl etki edebilir?', secenekler: ['Yalnızca hareket ettirir', 'Yalnızca şeklini değiştirir', 'Şeklini, hızını veya yönünü değiştirir', 'Hiçbir şey değişmez'], dogru: 2, ipucu: 'Kuvvet birden fazla şekilde etki edebilir.' },
        ]
      },
      {
        slug: 'surtunme', name: 'Sürtünme Kuvveti', hedef: 'Sürtünme kuvvetini ve etkilerini anlama',
        videoId: 'auQui6S956o',
        checkpoints: [
          { saniye: 60, soru: 'Sürtünme kuvveti hareketi nasıl etkiler?', secenekler: ['Hızlandırır', 'Yavaşlatır', 'Değiştirmez', 'Ortadan kaldırır'], dogru: 1, ipucu: 'Bisikletten el çekince giderek yavaşlar.' },
          { saniye: 120, soru: 'Buz üzerindeki sürtünme, kuru zemine göre nasıldır?', secenekler: ['Daha fazladır', 'Aynıdır', 'Daha azdır', 'Belirsizdir'], dogru: 2, ipucu: 'Buz üzerinde kaymak daha kolaydır...' },
        ]
      },
      {
        slug: 'madde-tanecikli', name: 'Maddenin Tanecikli Yapısı', hedef: 'Maddenin tanecikli yapısını öğrenme',
        videoId: '7hVI_SD_Ciw',
        checkpoints: [
          { saniye: 60, soru: 'Tüm maddeler neyin bir araya gelmesinden oluşur?', secenekler: ['Hücreler', 'Tanecikler (atom/molekül)', 'Damarlar', 'Lifler'], dogru: 1, ipucu: 'Gözle görülemeyen çok küçük parçacıklardır.' },
          { saniye: 120, soru: 'Katı maddelerde tanecikler birbirine nasıl bağlıdır?', secenekler: ['Çok uzak ve serbesttirler', 'Birbirine yakın ama serbesttirler', 'Sıkıca bağlıdırlar', 'Rastgele dağılmışlardır'], dogru: 2, ipucu: 'Bu yüzden katılar belirli bir şekil korur.' },
        ]
      },
      {
        slug: 'madde-isi', name: 'Madde ve Isı', hedef: 'Isının madde üzerindeki etkilerini anlama',
        videoId: '8muTsgbr18g',
        checkpoints: [
          { saniye: 60, soru: 'Isı verilince çoğu madde ne olur?', secenekler: ['Büzülür', 'Genleşir', 'Değişmez', 'Erir'], dogru: 1, ipucu: 'Sıcak havalarda demir köprüler daha uzundur.' },
          { saniye: 120, soru: 'Sıcaklık hangi alet ile ölçülür?', secenekler: ['Cetvel', 'Terazi', 'Termometre', 'Barometre'], dogru: 2, ipucu: 'Ateşimiz çıktığında ne kullanırız?' },
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
        slug: 'sozcukte-anlam', name: 'Sözcükte Anlam', hedef: 'Sözcüklerin gerçek, mecaz ve terim anlamları',
        videoId: 'pm3cO8SmOZ4',
        checkpoints: [
          { saniye: 60, soru: '"Güzel" kelimesinin eş anlamlısı hangisidir?', secenekler: ['Çirkin', 'Hoş', 'Kötü', 'Zor'], dogru: 1, ipucu: 'Aynı anlama gelen sözcük arıyoruz.' },
          { saniye: 120, soru: '"Sıcak" kelimesinin zıt anlamlısı nedir?', secenekler: ['Ilık', 'Soğuk', 'Serin', 'Ateşli'], dogru: 1, ipucu: 'Tam karşıt anlam taşıyan sözcük hangisi?' },
          { saniye: 180, soru: 'Bir sözcüğün hem gerçek hem mecaz anlamı olabilir mi?', secenekler: ['Hayır, yalnızca biri olur', 'Evet, olabilir', 'Sadece isimler için geçerli', 'Sadece fiiller için geçerli'], dogru: 1, ipucu: '"Soğuk hava" gerçek, "soğuk davranış" mecaz anlamdır.' },
        ]
      },
      {
        slug: 'atasozleri-deyimler', name: 'Atasözleri ve Deyimler', hedef: 'Atasözlerini ve deyimleri anlama ve kullanma',
        videoId: 'lbpRQLXb8hw',
        checkpoints: [
          { saniye: 60, soru: 'Atasözleri neyi yansıtır?', secenekler: ['Bireysel düşünceleri', 'Halkın deneyim ve bilgeliğini', 'Bilimsel gerçekleri', 'Devlet kurallarını'], dogru: 1, ipucu: 'Kuşaktan kuşağa aktarılan öğütler ve gözlemlerdir.' },
          { saniye: 120, soru: '"Damlaya damlaya göl olur" atasözü ne anlama gelir?', secenekler: ['Yağmurlar gölü doldurur', 'Küçük birikimlerin zamanla büyüyeceği', 'Göller her zaman dolar', 'Su akar taş oyar'], dogru: 1, ipucu: 'Az az biriktirilen şeyin zamanla çoğalması...' },
        ]
      },
      {
        slug: 'cumle-bilgisi', name: 'Cümlede Kavramlar', hedef: 'Cümle ögeleri ve cümle türlerini öğrenme',
        videoId: 'br54-02-bK4',
        checkpoints: [
          { saniye: 60, soru: 'Cümlede yüklemi bulmak için hangi soru sorulur?', secenekler: ['Kim?', 'Ne yapıyor / Ne?', 'Nerede?', 'Ne zaman?'], dogru: 1, ipucu: 'Yüklem, cümledeki temel eylemi veya durumu bildirir.' },
          { saniye: 120, soru: '"Ali okula gitti." cümlesinde özne kimdir?', secenekler: ['Okul', 'Ali', 'Gitti', 'Okula'], dogru: 1, ipucu: 'İşi yapan ya da hakkında konuşulan kişiyi bul.' },
        ]
      },
      {
        slug: 'yazim-kurallari', name: 'Yazım Kuralları ve Noktalama', hedef: 'Büyük harf kullanımı ve noktalama işaretleri',
        videoId: 'u3pKU_JN6cs',
        checkpoints: [
          { saniye: 60, soru: 'Hangi durumlarda büyük harf kullanılır?', secenekler: ['Yalnızca cümle başında', 'Cümle başı ve özel isimlerde', 'Sadece isim tamlamalarında', 'Hiçbir zaman gerekmez'], dogru: 1, ipucu: 'Kişi adları, şehir adları, ülke adları büyük harfle başlar.' },
          { saniye: 120, soru: 'Cümlenin sonuna hangi noktalama işareti konur?', secenekler: ['Virgül', 'İki nokta', 'Nokta', 'Tire'], dogru: 2, ipucu: 'Tamamlanmış düşüncenin ardından...' },
        ]
      },
      {
        slug: 'metin-turleri', name: 'Hikayenin Unsurları', hedef: 'Öykü ve hikaye yapısını tanıma',
        videoId: 'BFWZGxvgTS0',
        checkpoints: [
          { saniye: 60, soru: 'Bir hikayede mutlaka bulunması gereken unsurlar nelerdir?', secenekler: ['Yalnızca olay', 'Olay, yer, zaman ve kişi', 'Yalnızca kişiler', 'Şiir ve uyak'], dogru: 1, ipucu: 'Hikaye = kim, nerede, ne zaman, ne yaptı?' },
          { saniye: 120, soru: 'Hikayede olayların yaşandığı yer ve zamana ne denir?', secenekler: ['Tema', 'Olay örgüsü', 'Mekân ve zaman', 'Kişi kadrosu'], dogru: 2, ipucu: 'Biri nerede, diğeri ne zaman sorusunu yanıtlar.' },
        ]
      },
      {
        slug: 'paragraf', name: 'Paragrafta Konu ve Ana Fikir', hedef: 'Paragrafın konusunu ve ana fikrini bulma',
        videoId: 'jIIS5FPDCEc',
        checkpoints: [
          { saniye: 60, soru: 'Paragrafın konusu ile ana fikri arasındaki fark nedir?', secenekler: ['Fark yoktur', 'Konu ne hakkında, ana fikir ne söylüyor', 'Konu daha uzundur', 'Ana fikir her zaman başta yer alır'], dogru: 1, ipucu: 'Konu: Arkadaşlık. Ana fikir: İyi arkadaş seçmek önemlidir.' },
          { saniye: 120, soru: 'Uygun paragraf başlığı nasıl olmalıdır?', secenekler: ['Çok uzun ve ayrıntılı', 'Kısa ama konuyu özetler nitelikte', 'Paragrafın ilk cümlesi', 'Rasgele seçilmiş'], dogru: 1, ipucu: 'Başlık, okuyucuya paragrafın ne hakkında olduğunu kısaca söyler.' },
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
        slug: 'gruplar-roller', name: 'Gruplar ve Rollerimiz', hedef: 'Toplumsal gruplar ve bireysel rolleri anlama',
        videoId: 'UCGDuU_lEkY',
        checkpoints: [
          { saniye: 60, soru: 'Aile, sınıf ve spor takımı neye örnek gösterilebilir?', secenekler: ['Devlet kurumlarına', 'Toplumsal gruplara', 'Ekonomik birimlere', 'Siyasi partilere'], dogru: 1, ipucu: 'Ortak amaçlarla bir araya gelen insanlar...' },
          { saniye: 120, soru: 'Her bireyin toplumda üstlendiği görev ve davranış biçimine ne denir?', secenekler: ['Hak', 'Rol', 'Özgürlük', 'Yetki'], dogru: 1, ipucu: 'Öğrenci, evlat, arkadaş... hepsi birer rol.' },
        ]
      },
      {
        slug: 'kulturel-zenginlik', name: 'Kültürel Zenginliklerin Katkısı', hedef: 'Kültürel çeşitliliğin ortak yaşama katkısını anlama',
        videoId: '3F9edAIuVzI',
        checkpoints: [
          { saniye: 60, soru: 'Kültürel zenginlikler toplumun birlikte yaşamasına nasıl katkı sağlar?', secenekler: ['Ayrılığa yol açar', 'Ortak değerler oluşturur', 'Ekonomiyi bozar', 'Sadece geçmişe aittir'], dogru: 1, ipucu: 'Farklı gelenekler, sanatlar ve diller zenginlik oluşturur.' },
          { saniye: 120, soru: 'Yöresel yemekler, müzik ve gelenekler neyin parçasıdır?', secenekler: ['Ekonomi', 'Kültür mirası', 'Siyaset', 'Teknoloji'], dogru: 1, ipucu: 'Kuşaktan kuşağa aktarılan maddi ve manevi değerler...' },
        ]
      },
      {
        slug: 'ilimizin-konumu', name: 'İlimizin Konumu', hedef: 'Harita okuma ve göreceli konum kavramı',
        videoId: 'gCdFpGQtNcA',
        checkpoints: [
          { saniye: 60, soru: 'Haritada yönleri bulmak için hangi sembol kullanılır?', secenekler: ['Ölçek', 'Pusula gülü', 'Lejant', 'Koordinat'], dogru: 1, ipucu: 'Kuzey, güney, doğu ve batıyı gösteren simge...' },
          { saniye: 120, soru: 'İki yer arasındaki konumu tarif ederken hangi kavramı kullanırız?', secenekler: ['Mutlak konum', 'Göreceli konum', 'Harita projeksiyonu', 'Meridyen'], dogru: 1, ipucu: '"Ankara\'nın güneyinde" gibi başka bir yere göre belirtme...' },
        ]
      },
      {
        slug: 'kultur-miras', name: 'Ortak Kültürel Mirasımız', hedef: 'Türkiye\'nin kültürel miras zenginliklerini tanıma',
        videoId: 'Hlv-Y2rGZ4o',
        checkpoints: [
          { saniye: 60, soru: 'Kültürel miras kavramı neyi kapsar?', secenekler: ['Yalnızca tarihi yapıları', 'Maddi ve manevi tüm değerleri', 'Yalnızca yiyecekleri', 'Yalnızca dil ve müziği'], dogru: 1, ipucu: 'Tarihi yapılar, gelenekler, dil, sanat... hepsi dahil.' },
        ]
      },
      {
        slug: 'etkin-vatandaslik', name: 'Etkin Vatandaşlık', hedef: 'Etkin vatandaşın nitelikleri ve sorumlulukları',
        videoId: 'ot516YDjf8o',
        checkpoints: [
          { saniye: 60, soru: 'Etkin bir vatandaş nasıl davranır?', secenekler: ['Yalnızca oy kullanır', 'Haklarını kullanır ve sorumluluklarını yerine getirir', 'Sadece vergi öder', 'Toplumla ilgilenmez'], dogru: 1, ipucu: 'Hem hak, hem sorumluluk.' },
          { saniye: 120, soru: 'Demokratik toplumda bireyler hangi yolla yönetime katılır?', secenekler: ['Atanarak', 'Seçimle oy kullanarak', 'Kurayla', 'Güç göstererek'], dogru: 1, ipucu: 'Halkın iradesini yansıtan temel demokratik yöntem...' },
        ]
      },
      {
        slug: 'demokrasi', name: 'Demokrasi ve Cumhuriyet', hedef: 'Demokratik yönetim ve Cumhuriyetin temel nitelikleri',
        videoId: 'ZRex1rmWFwA',
        checkpoints: [
          { saniye: 60, soru: 'Demokraside yöneticiler nasıl belirlenir?', secenekler: ['Atanarak', 'Seçimle', 'Kurayla', 'Miras yoluyla'], dogru: 1, ipucu: 'Halkın iradesi esastır.' },
          { saniye: 120, soru: 'Türkiye Cumhuriyeti\'nde yönetim biçimi nedir?', secenekler: ['Monarşi', 'Teokrasi', 'Cumhuriyet', 'Oligarşi'], dogru: 2, ipucu: '29 Ekim 1923\'te ilan edildi.' },
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
        slug: 'hello', name: 'Hello!', hedef: 'Selamlaşma ve kendini tanıtma',
        videoId: 'yAGRyOA2kqE',
        checkpoints: [
          { saniye: 60, soru: '"Merhaba, benim adım Ali." cümlesinin İngilizcesi nedir?', secenekler: ['Hello, my name is Ali.', 'Goodbye Ali.', 'How are you Ali?', 'Thank you Ali.'], dogru: 0, ipucu: '"My name is" = "Benim adım"' },
          { saniye: 120, soru: '"How are you?" sorusunun Türkçesi nedir?', secenekler: ['Adın ne?', 'Nasılsın?', 'Nerelisin?', 'Kaç yaşındasın?'], dogru: 1, ipucu: '"How" = nasıl, "are you" = siz/sen misiniz' },
          { saniye: 180, soru: '"Nice to meet you." ne demektir?', secenekler: ['Görüşürüz.', 'Tanıştığıma memnun oldum.', 'Teşekkür ederim.', 'İyi geceler.'], dogru: 1, ipucu: '"Nice" = güzel/hoş, "meet" = tanışmak' },
        ]
      },
      {
        slug: 'my-town', name: 'My Town', hedef: 'Şehirdeki yerleri ve yön tariflerini öğrenme',
        videoId: 'tccjcPJovCE',
        checkpoints: [
          { saniye: 60, soru: '"Where is the hospital?" ne demektir?', secenekler: ['Hastane ne zaman?', 'Hastane nerede?', 'Hastane nasıl?', 'Hastane var mı?'], dogru: 1, ipucu: '"Where" = nerede' },
          { saniye: 120, soru: '"Turn left at the park." ne demektir?', secenekler: ['Parka git.', 'Parkta dur.', 'Parkta sola dön.', 'Parkın sağına git.'], dogru: 2, ipucu: '"Turn left" = sola dön, "at the park" = parkta' },
        ]
      },
      {
        slug: 'games-hobbies', name: 'Games and Hobbies', hedef: 'Oyunlar ve hobileri anlatma',
        videoId: 'FYSdqEcdOYY',
        checkpoints: [
          { saniye: 60, soru: '"I like playing football." ne demektir?', secenekler: ['Futbol oynamayı seviyorum.', 'Futbol oynuyorum.', 'Futbol izliyorum.', 'Futbol oynamıyorum.'], dogru: 0, ipucu: '"I like" = seviyorum, "playing football" = futbol oynamayı' },
          { saniye: 120, soru: '"What is your hobby?" ne demektir?', secenekler: ['Hobiniz nerede?', 'Hobiniz ne?', 'Hobilerin var mı?', 'Hobi nedir?'], dogru: 1, ipucu: '"What" = ne, "your hobby" = senin hobin' },
        ]
      },
      {
        slug: 'my-daily-routine', name: 'My Daily Routine', hedef: 'Günlük rutini ve saatleri anlatma',
        videoId: '2eHNj1EUB7I',
        checkpoints: [
          { saniye: 60, soru: '"I wake up at 7 o\'clock." ne demektir?', secenekler: ['Saat 7\'de uyurum.', 'Saat 7\'de uyanırım.', 'Saat 7\'de okula giderim.', 'Saat 7\'de kahvaltı yaparım.'], dogru: 1, ipucu: '"Wake up" = uyanmak' },
          { saniye: 120, soru: '"I go to school by bus." ne demektir?', secenekler: ['Otobüste okul var.', 'Okula otobüsle giderim.', 'Otobüs okula gider.', 'Okula yürüyerek giderim.'], dogru: 1, ipucu: '"go to school" = okula gitmek, "by bus" = otobüsle' },
        ]
      },
      {
        slug: 'health', name: 'Health', hedef: 'Sağlık ve hastalıkları anlatma',
        videoId: 'gyBTOthrUOA',
        checkpoints: [
          { saniye: 60, soru: '"I have a headache." ne demektir?', secenekler: ['Karnım ağrıyor.', 'Başım ağrıyor.', 'Kolum ağrıyor.', 'Gözüm ağrıyor.'], dogru: 1, ipucu: '"Head" = baş, "ache" = ağrı' },
          { saniye: 120, soru: '"You should see a doctor." ne demektir?', secenekler: ['Doktoru görmelisin.', 'Doktor seni görüyor.', 'Doktora gitme.', 'Doktor nerede?'], dogru: 0, ipucu: '"Should" = -malı/-meli, "see a doctor" = doktora gitmek' },
        ]
      },
      {
        slug: 'health-2', name: 'Health (İleri)', hedef: 'Sağlık konularını daha ileri düzeyde anlama',
        videoId: 'AGuZyYZDoWY',
        checkpoints: [
          { saniye: 60, soru: '"What\'s the matter?" ne demektir?', secenekler: ['Ne zaman?', 'Neden?', 'Sorun nedir / Neyin var?', 'Nereye?'], dogru: 2, ipucu: '"Matter" burada "sorun, mesele" anlamındadır.' },
          { saniye: 120, soru: '"I have a fever." ne demektir?', secenekler: ['Üşüyorum.', 'Ateşim var.', 'Yorgunum.', 'Midem bulunuyor.'], dogru: 1, ipucu: '"Fever" = ateş (hastalık belirtisi)' },
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
