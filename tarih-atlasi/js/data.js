/* ============================================================
   Tarih Disiplinleri Web Atlası — Veri Katmanı
   Excel'den dönüştürülmüş yapılandırılmış veri
   ============================================================ */

const ATLAS_DATA = {

  /* ── Disiplin Tanımları ── */
  disciplines: [
    { id: 'kultur',  name: 'Kültür/Din Tarihi',    color: '#c8a46e', icon: '🕌' },
    { id: 'siyasi',  name: 'Siyasi Tarih',          color: '#6366f1', icon: '🏛' },
    { id: 'askeri',  name: 'Askerî Tarih',           color: '#ef4444', icon: '⚔' },
    { id: 'hukuk',   name: 'Hukuk Tarihi',           color: '#22c55e', icon: '⚖' },
    { id: 'iktisat', name: 'İktisat Tarihi',         color: '#f59e0b', icon: '💰' },
    { id: 'bilim',   name: 'Bilim/Teknoloji Tarihi', color: '#06b6d4', icon: '🔬' },
    { id: 'sosyal',  name: 'Sosyal Tarih',           color: '#a855f7', icon: '👥' },
    { id: 'fikir',   name: 'Fikir/Felsefe Tarihi',   color: '#ec4899', icon: '💡' },
    { id: 'sanat',   name: 'Sanat Tarihi',           color: '#f97316', icon: '🎨' }
  ],

  /* ── 16 Tarihî Dönem ── */
  periods: [
    {
      id: 'prehistorik', name: 'Prehistorik Çağ', range: 'MÖ 10000-3000',
      startYear: -10000, endYear: -3000,
      zeitgeist: 'Doğaya Karşı Hayatta Kalma, Ortak Mitler',
      disciplines: { kultur: 45, siyasi: 5, askeri: 5, hukuk: 0, iktisat: 5, bilim: 5, sosyal: 25, fikir: 5, sanat: 5 },
      dominant: 'Kültür/Din', engine: 'Tarım devrimi → yerleşik hayat'
    },
    {
      id: 'ilk-uygarliklar', name: 'İlk Uygarlıklar', range: 'MÖ 3000-800',
      startYear: -3000, endYear: -800,
      zeitgeist: 'Yazı, İlk Şehirler, Tanrısal Meşruiyet',
      disciplines: { kultur: 30, siyasi: 15, askeri: 10, hukuk: 10, iktisat: 5, bilim: 5, sosyal: 10, fikir: 5, sanat: 10 },
      dominant: 'Kültür/Din', engine: 'Yazının icadı → kayıt toplumu'
    },
    {
      id: 'klasik-antikite', name: 'Klasik Antikite', range: 'MÖ 800 – MÖ 30',
      startYear: -800, endYear: -30,
      zeitgeist: 'Polis, Cumhuriyet, Felsefenin Doğuşu',
      disciplines: { kultur: 10, siyasi: 25, askeri: 20, hukuk: 10, iktisat: 5, bilim: 5, sosyal: 5, fikir: 15, sanat: 5 },
      dominant: 'Siyasi Tarih', engine: 'Şehir-devlet → imparatorluk geçişi'
    },
    {
      id: 'roma', name: 'Roma İmparatorluğu', range: 'MÖ 30 – MS 476',
      startYear: -30, endYear: 476,
      zeitgeist: 'Evrensel İmparatorluk, Hukuk Düzeni',
      disciplines: { kultur: 10, siyasi: 25, askeri: 20, hukuk: 15, iktisat: 5, bilim: 5, sosyal: 5, fikir: 10, sanat: 5 },
      dominant: 'Siyasi Tarih', engine: 'Roma hukuku → medeni hukukun temeli'
    },
    {
      id: 'erken-ortacag', name: 'Erken Ortaçağ', range: '476-750',
      startYear: 476, endYear: 750,
      zeitgeist: 'Karanlık Çağ, Kilise Hegemonyası',
      disciplines: { kultur: 40, siyasi: 10, askeri: 15, hukuk: 5, iktisat: 5, bilim: 3, sosyal: 10, fikir: 7, sanat: 5 },
      dominant: 'Kültür/Din', engine: 'Roma çöküşü → dinin yegâne otorite olması'
    },
    {
      id: 'islam-altin-cagi', name: 'İslam Altın Çağı', range: '750-1250',
      startYear: 750, endYear: 1250,
      zeitgeist: 'İlim = İbadet, Adalet = Mîzan, Tercüme Hareketi, Beytü\'l-Hikme',
      disciplines: { kultur: 25, siyasi: 10, askeri: 10, hukuk: 10, iktisat: 5, bilim: 20, sosyal: 5, fikir: 10, sanat: 5 },
      dominant: 'Kültür/Din + Bilim/Teknoloji', engine: 'Tercüme hareketi + vakıf/medrese + şehirleşme → bilgi üretimi kurumsallaştı'
    },
    {
      id: 'yuksek-ortacag', name: 'Yüksek Ortaçağ', range: '1000-1453',
      startYear: 1000, endYear: 1453,
      zeitgeist: 'Haçlı Seferleri, Feodalizm, Skolastik Düşünce',
      disciplines: { kultur: 25, siyasi: 20, askeri: 15, hukuk: 10, iktisat: 5, bilim: 5, sosyal: 5, fikir: 10, sanat: 5 },
      dominant: 'Kültür + Siyasi', engine: 'Doğu-Batı teması → kültürel etkileşim'
    },
    {
      id: 'ronesans', name: 'Rönesans', range: '1400-1600',
      startYear: 1400, endYear: 1600,
      zeitgeist: 'Hümanizm, Bireysel Deha, Estetik Uyanış',
      disciplines: { kultur: 15, siyasi: 15, askeri: 10, hukuk: 5, iktisat: 10, bilim: 10, sosyal: 5, fikir: 15, sanat: 15 },
      dominant: 'Fikir/Felsefe + Sanat', engine: 'Matbaa + şehirli patronaj → insan merkezli estetik ve düşünce'
    },
    {
      id: 'kesifler', name: 'Keşifler & Kolonyalizm', range: '1500-1700',
      startYear: 1500, endYear: 1700,
      zeitgeist: 'Yeni Dünya, Merkantilizm, Deniz Gücü',
      disciplines: { kultur: 10, siyasi: 20, askeri: 15, hukuk: 5, iktisat: 15, bilim: 10, sosyal: 10, fikir: 10, sanat: 5 },
      dominant: 'Siyasi + İktisat', engine: 'Denizcilik + sermaye → küresel ticaret ve sömürge ağları'
    },
    {
      id: 'aydinlanma', name: 'Aydınlanma', range: '1700-1800',
      startYear: 1700, endYear: 1800,
      zeitgeist: 'Aklın Egemenliği, Toplum Sözleşmesi',
      disciplines: { kultur: 5, siyasi: 15, askeri: 10, hukuk: 10, iktisat: 10, bilim: 15, sosyal: 10, fikir: 20, sanat: 5 },
      dominant: 'Fikir/Felsefe', engine: 'Bilimsel devrim → akıl merkezli dünya görüşü'
    },
    {
      id: 'sanayi', name: 'Sanayi Devrimi', range: '1760-1870',
      startYear: 1760, endYear: 1870,
      zeitgeist: 'Buhar, Fabrika, Sınıf Çatışması',
      disciplines: { kultur: 5, siyasi: 15, askeri: 10, hukuk: 5, iktisat: 25, bilim: 20, sosyal: 10, fikir: 5, sanat: 5 },
      dominant: 'İktisat + Bilim', engine: 'Buhar makinesi → üretim ilişkileri değişimi'
    },
    {
      id: 'emperyalizm', name: 'Emperyalizm Çağı', range: '1870-1914',
      startYear: 1870, endYear: 1914,
      zeitgeist: 'Sermaye İhracı, Hammadde Yarışı, Pazar Savaşı',
      disciplines: { kultur: 5, siyasi: 20, askeri: 15, hukuk: 5, iktisat: 25, bilim: 10, sosyal: 10, fikir: 5, sanat: 5 },
      dominant: 'İktisat + Siyasi', engine: '"Bayrak ticareti takip eder" → ekonomi-siyaset füzyonu'
    },
    {
      id: 'dunya-savaslari', name: 'Dünya Savaşları', range: '1914-1945',
      startYear: 1914, endYear: 1945,
      zeitgeist: 'Total Savaş, İdeoloji Çatışması, Yıkım',
      disciplines: { kultur: 3, siyasi: 20, askeri: 30, hukuk: 3, iktisat: 10, bilim: 15, sosyal: 10, fikir: 5, sanat: 4 },
      dominant: 'Askerî Tarih', engine: 'Endüstriyel savaş → devlet-toplum seferberliği'
    },
    {
      id: 'soguk-savas', name: 'Soğuk Savaş', range: '1945-1991',
      startYear: 1945, endYear: 1991,
      zeitgeist: 'Nükleer Denge, İdeolojik Bloklar, Vekâlet Savaşları',
      disciplines: { kultur: 5, siyasi: 25, askeri: 10, hukuk: 5, iktisat: 20, bilim: 15, sosyal: 10, fikir: 5, sanat: 5 },
      dominant: 'Siyasi + İktisat', engine: 'Nükleer denge + kurumlar → siyaset, ekonomi ve teknoloji iç içe geçti'
    },
    {
      id: 'kuresellesme', name: 'Küreselleşme', range: '1991-2010',
      startYear: 1991, endYear: 2010,
      zeitgeist: 'Serbest Piyasa Zaferi, WTO, Finansallaşma',
      disciplines: { kultur: 5, siyasi: 10, askeri: 5, hukuk: 5, iktisat: 30, bilim: 20, sosyal: 15, fikir: 5, sanat: 5 },
      dominant: 'İktisat Tarihi', engine: 'Finansallaşma + ağ ekonomisi → piyasalar küresel zamanın ritmini belirledi'
    },
    {
      id: 'dijital-cag', name: 'Dijital Çağ', range: '2010-bugün',
      startYear: 2010, endYear: 2026,
      zeitgeist: 'Yapay Zekâ, Veri Ekonomisi, İklim Krizi, Pandemi',
      disciplines: { kultur: 5, siyasi: 10, askeri: 3, hukuk: 5, iktisat: 20, bilim: 30, sosyal: 15, fikir: 5, sanat: 7 },
      dominant: 'Bilim/Teknoloji', engine: 'Veri + yapay zekâ + iklim baskısı → teknoloji, sermaye ve devlet yeniden düğümleniyor'
    }
  ],

  /* ── 9 İslam Medeniyeti ── */
  civilizations: [
    {
      id: 'rasidin', name: 'Râşidîn Dönemi', range: '632-661',
      startYear: 632, endYear: 661,
      zeitgeist: 'Cemaatten devlete geçiş; şûrâ, fetih ve kurucu adalet arayışı',
      disciplines: { kultur: 22, siyasi: 20, askeri: 12, hukuk: 15, iktisat: 10, bilim: 4, sosyal: 7, fikir: 6, sanat: 4 },
      dominant: 'Kültür/Din', institutions: 'Şûrâ, beytülmâl, divan nüvesi, kadılık başlangıcı',
      islamicConcept: 'Şûrâ, adalet, emanet'
    },
    {
      id: 'emeviler', name: 'Emevîler', range: '661-750',
      startYear: 661, endYear: 750,
      zeitgeist: 'Merkezîleşme, Arabizasyon, Şam eksenli imparatorluk siyaseti',
      disciplines: { kultur: 14, siyasi: 25, askeri: 18, hukuk: 10, iktisat: 8, bilim: 4, sosyal: 5, fikir: 6, sanat: 10 },
      dominant: 'Siyasi', institutions: 'Arapça idare dili, sikke reformu, eyaletleşme, anıtsal mimari',
      islamicConcept: 'Tedâvül-i eyyâm, mülk, birlik ve düzen'
    },
    {
      id: 'abbasiler', name: 'Abbâsîler / Bağdat', range: '750-1258',
      startYear: 750, endYear: 1258,
      zeitgeist: 'Şehir, tercüme, ticaret ve ilmin aynı merkezde düğümlenmesi',
      disciplines: { kultur: 18, siyasi: 10, askeri: 6, hukuk: 14, iktisat: 12, bilim: 20, sosyal: 5, fikir: 10, sanat: 5 },
      dominant: 'Bilim/Tekn.', institutions: 'Bayt al-Hikmah, vakıf, medrese, pazar ağları, kütüphaneler',
      islamicConcept: 'İlim, mîzan, hikmet'
    },
    {
      id: 'endulus', name: 'Endülüs / Kurtuba-Toledo', range: '756-1492',
      startYear: 756, endYear: 1492,
      zeitgeist: 'Sınır coğrafyasında çoğul şehir kültürü, felsefe ve tercüme dolaşımı',
      disciplines: { kultur: 18, siyasi: 10, askeri: 8, hukuk: 10, iktisat: 10, bilim: 15, sosyal: 8, fikir: 12, sanat: 9 },
      dominant: 'Kültür/Din', institutions: 'Kütüphaneler, şehirli adab, hekimlik, tercüme çevreleri',
      islamicConcept: 'Hikmet, taâruf, ihsan'
    },
    {
      id: 'selcuklu', name: 'Büyük Selçuklu / Nizâmiye', range: '1037-1194',
      startYear: 1037, endYear: 1194,
      zeitgeist: 'Fetih gücünü hukuk, medrese ve vezirlik ile bağlama çabası',
      disciplines: { kultur: 14, siyasi: 20, askeri: 14, hukuk: 18, iktisat: 8, bilim: 8, sosyal: 6, fikir: 8, sanat: 4 },
      dominant: 'Siyasi', institutions: 'Nizâmiye medreseleri, siyasetnâme, iktâ ve vezirlik düzeni',
      islamicConcept: 'Nizâm, maslahat, şerʿî meşruiyet'
    },
    {
      id: 'baburler', name: 'Babürler / Ekberî Denge', range: '1556-1605',
      startYear: 1556, endYear: 1605,
      zeitgeist: 'Çok-etnili imparatorlukta bürokrasi, gelir düzeni ve siyasî entegrasyon',
      disciplines: { kultur: 10, siyasi: 18, askeri: 12, hukuk: 14, iktisat: 16, bilim: 6, sosyal: 8, fikir: 10, sanat: 6 },
      dominant: 'Siyasi', institutions: 'Mansabdari, merkezî maliye, eyalet idaresi, haber ağları',
      islamicConcept: 'Sulh-i küll, adalet, maslahat'
    },
    {
      id: 'memluk', name: 'Memlük Kahiresi', range: '1250-1517',
      startYear: 1250, endYear: 1517,
      zeitgeist: 'Askerî elitin güvenliği, ticareti ve meşruiyeti aynı merkezde toplaması',
      disciplines: { kultur: 10, siyasi: 20, askeri: 25, hukuk: 10, iktisat: 10, bilim: 4, sosyal: 6, fikir: 5, sanat: 10 },
      dominant: 'Askerî', institutions: 'Askerî kölelik, Kahire merkezliliği, medrese ve ticaret himayesi',
      islamicConcept: 'Himaye, cihad, meşruiyet'
    },
    {
      id: 'osmanli-klasik', name: 'Osmanlı Klasik Düzeni', range: '1453-1600',
      startYear: 1453, endYear: 1600,
      zeitgeist: 'Kılıç, defter, kadı ve vakfın aynı siyasal makinede birleşmesi',
      disciplines: { kultur: 12, siyasi: 20, askeri: 16, hukuk: 15, iktisat: 15, bilim: 8, sosyal: 5, fikir: 4, sanat: 5 },
      dominant: 'Siyasi', institutions: 'Timar, devşirme, mukâtaa, medrese, vakıf, kadılık',
      islamicConcept: 'Adalet dairesi, mîzan, emanet'
    },
    {
      id: 'tanzimat', name: 'Tanzimat ve Geç Osmanlı', range: '1839-1908',
      startYear: 1839, endYear: 1908,
      zeitgeist: 'Kriz altında hukuk, bürokrasi, eğitim ve egemenliği yenileme çabası',
      disciplines: { kultur: 5, siyasi: 18, askeri: 6, hukuk: 20, iktisat: 15, bilim: 10, sosyal: 10, fikir: 10, sanat: 6 },
      dominant: 'Hukuk', institutions: 'Kanunlaştırma, nezaretler, meclisler, yeni okullar, merkezîleşme',
      islamicConcept: 'Maslahat, tecdid, adalet'
    }
  ],

  /* ── Coğrafi Düğümler ── */
  nodes: [
    { id: 'city_mecca', title: 'Mekke', type: 'Şehir', lat: 21.3891, lon: 39.8579, startYear: 610, endYear: 632, civilization: 'Kurucu dönem', discipline: 'kultur', role: 'Başlangıç eşiği / dünya görüşü merkezi', zoom: 6, bond: 'Vahiy, kıble, ilk cemaat' },
    { id: 'city_medina', title: 'Medine', type: 'Şehir', lat: 24.4672, lon: 39.6111, startYear: 622, endYear: 661, civilization: 'rasidin', discipline: 'siyasi', role: 'Kurucu şehir / devletleşme laboratuvarı', zoom: 6, bond: 'Cemaatten devlete geçiş, şûrâ, beytülmâl nüvesi' },
    { id: 'city_damascus', title: 'Şam', type: 'Şehir', lat: 33.5138, lon: 36.2765, startYear: 661, endYear: 750, civilization: 'emeviler', discipline: 'siyasi', role: 'İlk büyük imparatorluk başkenti', zoom: 6, bond: 'Merkezîleşme, Arabizasyon, imparatorluk idaresi' },
    { id: 'city_baghdad', title: 'Bağdat', type: 'Şehir', lat: 33.3152, lon: 44.3661, startYear: 762, endYear: 1258, civilization: 'abbasiler', discipline: 'bilim', role: 'Çekirdek bilgi ve iktisat düğümü', zoom: 6, bond: 'Saray, pazar, tercüme ve ilim ağları' },
    { id: 'inst_baytalhikma', title: 'Beytü\'l-Hikme', type: 'Kurum', lat: 33.32, lon: 44.37, startYear: 830, endYear: 1258, civilization: 'abbasiler', discipline: 'bilim', role: 'Kurum / ilim vitrini', zoom: 7, bond: 'Tercüme, kütüphane, saray himayesi' },
    { id: 'inst_nizamiyya_bgd', title: 'Nizamiye Bağdat', type: 'Kurum', lat: 33.31, lon: 44.36, startYear: 1067, endYear: 1258, civilization: 'selcuklu', discipline: 'hukuk', role: 'Kurum / eğitim-hukuk düğümü', zoom: 7, bond: 'Medrese, vezirlik, Sünnî kurumsallaşma' },
    { id: 'city_cordoba', title: 'Kurtuba', type: 'Şehir', lat: 37.8882, lon: -4.7794, startYear: 756, endYear: 1031, civilization: 'endulus', discipline: 'kultur', role: 'Batı İslam merkez düğümü', zoom: 6, bond: 'Şehirleşme, ilim, mimari ve çok katmanlı kültür' },
    { id: 'city_toledo', title: 'Toledo', type: 'Şehir', lat: 39.8628, lon: -4.0273, startYear: 1085, endYear: 1250, civilization: 'endulus', discipline: 'bilim', role: 'Çeviri eşiği / temas şehri', zoom: 7, bond: 'Latince çeviri, aracılık, temas bölgesi' },
    { id: 'city_cairo', title: 'Kahire', type: 'Şehir', lat: 30.0444, lon: 31.2357, startYear: 970, endYear: 1517, civilization: 'memluk', discipline: 'hukuk', role: 'Mısır merkez düğümü', zoom: 6, bond: 'İlim, siyaset, ticaret ve hukuk düğümü' },
    { id: 'inst_alazhar', title: 'el-Ezher', type: 'Kurum', lat: 30.0456, lon: 31.262, startYear: 970, endYear: 1517, civilization: 'memluk', discipline: 'hukuk', role: 'Kurum / eğitim-hukuk düğümü', zoom: 7, bond: 'Medrese-cami, ilim ve meşruiyet' },
    { id: 'city_nishapur', title: 'Nişabur', type: 'Şehir', lat: 36.214, lon: 58.7961, startYear: 1000, endYear: 1150, civilization: 'selcuklu', discipline: 'sosyal', role: 'Doğu ilim kuşağı düğümü', zoom: 6, bond: 'Ulema dolaşımı, Horasan, eğitim çevresi' },
    { id: 'city_isfahan', title: 'İsfahan', type: 'Şehir', lat: 32.6546, lon: 51.668, startYear: 1050, endYear: 1200, civilization: 'selcuklu', discipline: 'siyasi', role: 'Başkent ve estetik yoğunlaşma', zoom: 6, bond: 'Başkentleşme, idare, mimari ve kurumsal yoğunlaşma' },
    { id: 'city_fez', title: 'Fes', type: 'Şehir', lat: 34.0331, lon: -5.0003, startYear: 859, endYear: 1600, civilization: 'endulus', discipline: 'hukuk', role: 'Mağribî ilim düğümü', zoom: 6, bond: 'Şehirleşme, hukuk ve ilim sürekliliği' },
    { id: 'inst_qarawiyyin', title: 'Karaviyyin', type: 'Kurum', lat: 34.0642, lon: -4.9735, startYear: 859, endYear: 1600, civilization: 'endulus', discipline: 'hukuk', role: 'Kurum / batı ilim düğümü', zoom: 7, bond: 'İlim, tedris, şehir kurumsallığı' },
    { id: 'city_delhi', title: 'Delhi', type: 'Şehir', lat: 28.6139, lon: 77.209, startYear: 1206, endYear: 1707, civilization: 'baburler', discipline: 'siyasi', role: 'Hint-İslam siyaset düğümü', zoom: 6, bond: 'Yönetim, seferberlik, çok-etnili siyaset' },
    { id: 'city_agra', title: 'Agra', type: 'Şehir', lat: 27.1767, lon: 78.0081, startYear: 1556, endYear: 1658, civilization: 'baburler', discipline: 'iktisat', role: 'Babür merkez düğümü', zoom: 6, bond: 'Saray, maliye, mansabdari ve imparatorluk entegrasyonu' },
    { id: 'city_istanbul', title: 'İstanbul', type: 'Şehir', lat: 41.0082, lon: 28.9784, startYear: 1453, endYear: 1922, civilization: 'osmanli-klasik', discipline: 'siyasi', role: 'Çok katmanlı başkent düğümü', zoom: 6, bond: 'İmparatorluk merkezi, hukuk, maliye ve sanatın kavşağı' },
    { id: 'inst_suleymaniye', title: 'Süleymaniye Külliyesi', type: 'Kurum', lat: 41.0162, lon: 28.9641, startYear: 1557, endYear: 1922, civilization: 'osmanli-klasik', discipline: 'hukuk', role: 'Kurum / vakıf-medrese düğümü', zoom: 7, bond: 'Külliye, tedris, vakıf, şehir ölçeği' },
    { id: 'inst_darulfunun', title: 'Darülfünun', type: 'Kurum', lat: 41.0128, lon: 28.9587, startYear: 1846, endYear: 1933, civilization: 'tanzimat', discipline: 'bilim', role: 'Reform düğümü / modernleşme eşiği', zoom: 7, bond: 'Modern eğitim, reform, hukuk ve bilim transferi' }
  ],

  /* ── Dönem Geçiş Hikmetleri ── */
  transitions: [
    { from: 'prehistorik', to: 'ilk-uygarliklar', shift: 'Kültür/Din güçlü kalır; Siyasi + Hukuk görünür hale gelir', rupture: 'Hayatta kalma → Düzen kurma', wisdom: 'Tarımın yerleşik üretime dönüşmesiyle nüfus, artı-ürün ve mülkiyet birikti; bunu düzenlemek ilk devlet ve hukuk nüvelerini doğurdu.' },
    { from: 'ilk-uygarliklar', to: 'klasik-antikite', shift: 'Kültür/Din geriler; Siyasi + Askerî tarih yükselir', rupture: 'Tanrısal meşruiyet → Yurttaşlık, cumhuriyet ve imparatorluk', wisdom: 'Yazılı meşruiyetin ve saray merkezli düzenin yanına, yurttaşlık, cumhuriyet, imparatorluk ve felsefî sorgulama eklendi.' },
    { from: 'klasik-antikite', to: 'roma', shift: 'Hukuk tarihi belirgin biçimde yükselir', rupture: 'Çoğul polis → Evrensel imparatorluk hukuku', wisdom: 'Roma, şehir-devlet ötesinde evrensel bir hukuk düzeni kurdu; bu düzen medeni hukukun temelini attı.' },
    { from: 'roma', to: 'erken-ortacag', shift: 'Siyasi/Askerî çözülür; Kültür/Din yeniden omurgaya dönüşür', rupture: 'İmparatorluk düzeni → İlahi ve yerel otorite', wisdom: 'Roma\'nın çözülüşü yalnız bir iktidar değişimi değil; yolların, vergi ağlarının, hukuk sisteminin dağılmasıydı.' },
    { from: 'erken-ortacag', to: 'islam-altin-cagi', shift: 'Bilim/Teknoloji tarihi sıçrar; Kültür/Din ile birlikte ilerler', rupture: 'Teoloji → İlim, tercüme ve şehir uygarlığı', wisdom: 'Bu geçişin ayırt edici yanı, din ile bilimin birbirine rakip değil, çoğu zaman birlikte ilerlemesidir.' },
    { from: 'yuksek-ortacag', to: 'ronesans', shift: 'Fikir + Sanat tarihi bağımsız ağırlık kazanır', rupture: 'Skolastik sentez → Hümanist bakış', wisdom: 'Rönesans\'taki kırılma sadece sanatsal üslup değişimi değildir; insanın dünyaya bakışının yeniden konumlanmasıdır.' },
    { from: 'ronesans', to: 'kesifler', shift: 'İktisat tarihi ilk kez merkezî yükselişe geçer', rupture: 'Hümanizm → Denizcilik, pazar ve maden akışı', wisdom: 'Ufkun genişlemesi, tarihin konusunu da genişletti. Atlas Okyanusu\'nun ticaret omurgası haline gelmesi, iktisadı öne çıkardı.' },
    { from: 'kesifler', to: 'aydinlanma', shift: 'Fikir/Felsefe tarihi zirveye çıkar', rupture: 'Merkantilizm → Aklın meşruiyeti', wisdom: 'Erken modern ticaret ve devlet rekabeti, birikmiş deneyimi aklın ve eleştirinin süzgecine tâbi kıldı.' },
    { from: 'aydinlanma', to: 'sanayi', shift: 'İktisat + Bilim birlikte patlar', rupture: 'Aklın egemenliği → Enerji, makine ve fabrika', wisdom: 'Sanayi devrimi, düşüncenin makineye, kuramın fabrikaya dönüştüğü eşiktir.' },
    { from: 'sanayi', to: 'emperyalizm', shift: 'İktisat belirgin biçimde öne geçer; Siyaset onunla kaynaşır', rupture: 'Fabrika → Hammadde, pazar ve sermaye ihracı', wisdom: 'Sanayileşmiş ekonomiler hammadde, pazar ve yatırım alanı aradıkça iktisat tarihi siyasetle kaynaştı.' },
    { from: 'emperyalizm', to: 'dunya-savaslari', shift: 'Askerî tarih zirveye çıkar; fakat arkasında sanayi ve ideoloji vardır', rupture: 'Pazar rekabeti → Total seferberlik', wisdom: 'Dünya savaşları, 19. yüzyılın ekonomik rekabetini total seferberlik rejimine çevirdi.' },
    { from: 'dunya-savaslari', to: 'soguk-savas', shift: 'Siyasi tarih geri gelir; İktisat ve Teknoloji eşlik eder', rupture: 'Total savaş → Blok siyaseti ve korku dengesi', wisdom: 'Sıcak cephelerden nükleer dengeye geçiş, siyasi tarihin payını yeniden büyüttü.' },
    { from: 'kuresellesme', to: 'dijital-cag', shift: 'Bilim/Teknoloji yükselir; İktisatla ayrılmaz biçimde düğümlenir', rupture: 'Sermaye akışı → Veri, algoritma ve gezegen sınırları', wisdom: 'Dijital çağda bilim/teknoloji tarihi yükselirken iktisat tarihini bütünüyle tahtından indirmedi; ikisi düğümlendi.' }
  ],

  /* ── Düşünürler / Kuramcılar ── */
  thinkers: [
    { id: 'ibn-haldun', name: 'İbn Haldun', concepts: 'Umran, asabiyet, vergi-lüks-devlet çevrimi, tarih metodolojisi', motor: 'Toplumsal dayanışmanın yükselişi, siyasî merkezileşme, vergi baskısı, lüks ve çözülüş döngüsü', link: 'Bu dosyanın merkezî omurgasıdır. Tarihi yalnız vakalar değil; toplumun iç yapısıyla okudu.' },
    { id: 'braudel', name: 'Braudel / Annales', concepts: 'Longue durée, yapı, iklim, demografi, gündelik hayat, ticaret ritimleri', motor: 'Yavaş işleyen yapılar; iklim, coğrafya, fiyatlar, ulaşım, tarım ve gündelik hayat', link: 'İbn Haldun\'un umran fikrine yakın biçimde, olayların arkasındaki uzun süreli katmanları araştırır.' },
    { id: 'marx', name: 'Marx / tarihsel materyalizm', concepts: 'Üretim tarzı, sınıf çatışması, tarihsel materyalizm', motor: 'Ekonomik ilişkiler, sınıf çatışması ve üretim tarzlarının dönüşümü', link: 'İktisat ve emek boyutunu kuvvetle görünür kılar; fakat din, meşruiyet ve sembolik düzeni geri plana iter.' },
    { id: 'weber', name: 'Weber', concepts: 'Meşruiyet tipleri, bürokrasi, rasyonelleşme, otorite', motor: 'Geleneksel, karizmatik ve rasyonel-hukukî otoritenin kurumsallaşması', link: 'İbn Haldun\'un asabiyet ve hanedan döngüsü, Weber ile birlikte okunduğunda karizmatik otorite ve rutinleşme kavramlarıyla daha iyi anlaşılır.' },
    { id: 'tilly', name: 'Tilly', concepts: 'Savaş-devlet yapımı, zorlama, çıkarma (extraction), mali-askerî kapasite', motor: 'Savaşın vergi, bürokrasi ve merkezî devlet kapasitesini büyütmesi', link: 'İbn Haldun\'un fetih-devlet döngüsünü modern devletleşme ve mali-askerî kapasite kavramlarıyla tamamlar.' },
    { id: 'north', name: 'North', concepts: 'Kurumlar, mülkiyet hakları, işlem maliyetleri, belirsizlik', motor: 'Ekonomik performansı şekillendiren yazılı-yazısız kurallar ve teşvik yapıları', link: 'Kur\'an\'daki adalet, ölçü ve emanet vurgusunu iktisadî-kurumsal düzlemde düşünmeye olanak tanır.' }
  ],

  /* ── İslami Çerçeve ── */
  islamicFramework: [
    { theme: 'Tarih yazımı / ibret', quranRef: '12:111; 3:137', link: 'Tarih anlatısı sadece olup biteni dizmez; akıbet, ibret ve öğüt dilidir.' },
    { theme: 'Toplumsal değişim', quranRef: '13:11; 8:53', link: 'Toplumların yükselişi ve çözülüşü yalnız dış şoklarla değil; iç tavır ve yapı değişimiyle başlar.' },
    { theme: 'Adalet ve mîzan', quranRef: '55:7-9; 57:25', link: 'Adalet yalnız hukuk normu değil; toplumsal denge, ölçü ve emanet kavramlarıyla iç içedir.' },
    { theme: 'İlim ve hikmet', quranRef: '96:1-5; 39:9', link: 'İlim, bireysel fazilet ötesinde toplumsal kurumsallaşma ve üretim çarklarıyla desteklenmelidir.' },
    { theme: 'Çoğulluk ve tanışma', quranRef: '49:13', link: 'Çoğulluk sadece gerilim değil tanışma ve karşılıklı anlama fırsatı üretir.' },
    { theme: 'Emanet ve sorumluluk', quranRef: '33:72; 2:30', link: 'İnsanın yeryüzündeki konumu, emanet ve halifelik kavramlarıyla şekillenir.' }
  ],

  /* ── Vaka Analizleri ── */
  cases: [
    { id: 'abbasi-bagdat', title: 'Abbâsî Bağdatı', synthesis: 'Bağdat, ticaret yolları, saray himayesi, tercüme hareketi ve çok-dilli bilginlerin kesişiminde benzersiz bir bilgi üretim merkezi oluşturdu.', islamicLink: 'Alak 96:1-5 ile Zümer 39:9 ekseni — ilmin bireysel faziletten toplumsal kuruma dönüşmesi.', lesson: 'Bilgiyi öven toplum ile bilgiyi kurumsallaştıran toplum aynı şey değildir; fark vakıf, medrese ve himaye altyapısındadır.' },
    { id: 'endulus-toledo', title: 'Endülüs / Kurtuba-Toledo', synthesis: 'Endülüs, sınır coğrafyasının yalnız çatışma alanı olmadığını; çeviri, tıp, felsefe ve şehir estetiğinin çoğulculuktan beslendiğini gösterdi.', islamicLink: 'Hucurât 49:13 çoğulluğu sadece gerilim değil tanışma ve karşılıklı anlama fırsatı olarak sunar.', lesson: 'Medeniyetler bazen en etkili tesirlerini merkezde değil, sınırda üretir.' },
    { id: 'osmanli-klasik', title: 'Osmanlı Klasik Düzeni', synthesis: 'Osmanlı, timar, devşirme, kadılık ve vakıf ile kılıç, defter ve şeriatı aynı siyasal makinede birleştiren nadir bir devlet modelidir.', islamicLink: 'Adalet dairesi kavramı ve mîzan vurgusu.', lesson: 'Kurumsal denge bozulduğunda güç tek başına yetmez; denge sistemin kendisidir.' },
    { id: 'memluk-kahire', title: 'Memlük Kahiresi', synthesis: 'Memlükler, askerî elitin güvenliği, ticareti ve meşruiyeti aynı merkezde toplamasıyla ayırt edilir.', islamicLink: 'Himaye, cihad ve meşruiyet kavramları.', lesson: 'Askerî güç tek başına sürdürülebilir değildir; hukuk, ticaret ve himaye ile desteklenmelidir.' },
    { id: 'tanzimat', title: 'Tanzimat ve Geç Osmanlı', synthesis: 'Tanzimat, kriz altında hukuk, bürokrasi, eğitim ve egemenliği yenileme çabasıdır.', islamicLink: 'Maslahat, tecdid ve adalet kavramları.', lesson: 'Reform yalnız kurumların değişmesi değil; toplumsal sözleşmenin yeniden yazılmasıdır.' }
  ],

  /* ── Makro Hikmetler ── */
  macroWisdoms: [
    'Devlet büyüdükçe siyaset ve hukuk daha görünür olur; çünkü vergi, yazı, kayıt, savaş ve adalet makinesi daha fazla iz bırakır.',
    'Savaş çoğu çağda tek neden değildir; fakat çoğu zaman değişimin hızlandırıcısıdır.',
    'Modern çağda iktisat ile bilim/teknoloji birbirinden ayrıştırılamaz.',
    'Tarih yazımında kimin daha çok arşiv bıraktığı, neyin daha baskın göründüğünü etkiler.',
    'Disiplinlerin yürüyüşü çizgisel değil döngüseldir.',
    'Kur\'an\'ın tarih dili salt kronik değildir; ibret ve sünnetullah dilidir.',
    'İslami çerçevede hukuk tarihi yalnız normlar tarihi değildir; adalet, mîzan ve kamu yararı kavramlarıyla iç içedir.',
    'İbn Haldun\'un en büyük katkısı, dini ve dünyevi olanı birbirini boğan iki alan gibi değil; aynı toplumsal gerçekliğin farklı katmanları olarak okumayı öğretmesidir.'
  ],

  /* ── Harita Hikayeleri ── */
  stories: [
    {
      id: 'ilim-aglari', title: 'İlim Ağları',
      subtitle: 'Mekke\'den Toledo\'ya bilginin yolculuğu',
      steps: [
        { nodeId: 'city_mecca', text: 'Her şey burada başladı. İlk vahiy, "Oku!" emriyle ilmi merkeze koydu.', year: 610 },
        { nodeId: 'city_medina', text: 'Medine, cemaatten devlete geçişin laboratuvarı oldu. Şûrâ, beytülmâl ve kadılık burada doğdu.', year: 622 },
        { nodeId: 'city_baghdad', text: 'Bağdat, tercüme hareketi ve Beytü\'l-Hikme ile dünyanın bilgi başkenti haline geldi.', year: 762 },
        { nodeId: 'inst_baytalhikma', text: 'Beytü\'l-Hikme: Yunan, Fars ve Hint bilimlerinin Arapçaya aktarıldığı merkez.', year: 830 },
        { nodeId: 'city_cordoba', text: 'Kurtuba, Batı İslam dünyasının ilim ve sanat merkezi olarak parladı.', year: 756 },
        { nodeId: 'city_toledo', text: 'Toledo, İslam bilimlerinin Latince\'ye çevrildiği köprü şehir oldu.', year: 1085 }
      ]
    },
    {
      id: 'adalet-dairesi', title: 'Adalet Dairesi',
      subtitle: 'Hukuk ve kurumların yolculuğu',
      steps: [
        { nodeId: 'city_medina', text: 'Râşidîn döneminde kadılık ve beytülmâl nüvesi oluştu.', year: 632 },
        { nodeId: 'inst_nizamiyya_bgd', text: 'Nizamiye medreseleri, Sünnî kurumsallaşmanın ve hukuk eğitiminin merkeziydi.', year: 1067 },
        { nodeId: 'city_cairo', text: 'Kahire, Memlük hukuk ve ticaret düğümü olarak bölgesel güce dönüştü.', year: 1250 },
        { nodeId: 'city_istanbul', text: 'Osmanlı İstanbul\'u, kılıç, defter, kadı ve vakfı aynı makinede birleştirdi.', year: 1453 },
        { nodeId: 'inst_suleymaniye', text: 'Süleymaniye Külliyesi, vakıf-medrese sisteminin en büyük örneği.', year: 1557 },
        { nodeId: 'inst_darulfunun', text: 'Darülfünun, modernleşme ve reform eşiğinde yeni eğitim modelinin başlangıcı.', year: 1846 }
      ]
    },
    {
      id: 'tercume-hareketi', title: 'Tercüme Hareketi',
      subtitle: 'Bilginin dolaşımı ve aktarımı',
      steps: [
        { nodeId: 'city_baghdad', text: 'Abbâsî Bağdatı: Yunan, Fars, Hint bilimlerinin merkezi.', year: 762 },
        { nodeId: 'inst_baytalhikma', text: 'Beytü\'l-Hikme\'de yüzlerce eser tercüme edildi.', year: 830 },
        { nodeId: 'city_cordoba', text: 'Kurtuba kütüphaneleri, İslam bilimlerini batıya taşıdı.', year: 900 },
        { nodeId: 'city_toledo', text: 'Toledo tercüme okulu, İslam bilimlerini Avrupa\'ya açtı.', year: 1085 },
        { nodeId: 'city_fez', text: 'Fes ve Karaviyyin, Mağrib ilim geleneğini sürdürdü.', year: 859 }
      ]
    }
  ]
};
