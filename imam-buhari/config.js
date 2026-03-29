/* ═══════════ Âlim Yapılandırması ═══════════ */
const SCHOLAR = {
  id: 'imam-buhari',
  name: 'İmam-ı Buharî',
  subtitle: 'Hadîs İlminin Güneşi',
  fullName: 'Muhammed bin İsmâîl bin İbrâhîm el-Buhârî',
  honorific: 'rahmetullâhi aleyh',
  logoLetter: 'B',
  birthAH: 194,
  deathAH: 256,
  birthCE: 810,
  deathCE: 870,
  description: 'Hadîs âlimlerinin en büyüğü. Kur\'ân-ı Kerîm\'den sonra dünyânın en kıymetli kitabı olan Sahîh-i Buhârî\'nin müellifi. İslâm coğrafyasını dolaşarak binden fazla hocadan 600.000 hadîs-i şerîf topladı.',
  mapCenter: [34, 52],
  mapZoom: 4,
  stats: [
    { target: 19, label: 'Şehir' },
    { target: 600000, suffix: '+', label: 'Hadîs Ezberi' },
    { target: 7275, label: 'Sahîh Hadîs' },
    { target: 16, label: 'Yıl Tasnîf' },
    { target: 1080, suffix: '+', label: 'Hoca' }
  ],
  sections: {
    map: { title: 'Seyahat Haritası', desc: 'Buhârâ\'dan Hartenk\'e — 46 yıllık ilim yolculuğu' },
    timeline: { title: 'Zaman Çizelgesi', desc: 'Buhârâ\'dan Hartenk\'e, 62 yıllık bereketli ömür' },
    content: { title: 'Hayâtı ve İlmi', desc: 'Kaynak: İslâm Âlimleri Ansiklopedisi, Türkiye Gazetesi Yayınları' },
    ozel: { title: 'Hadîs-i Şerîflerden Seçmeler', desc: 'İmâm-ı Buhârî hazretlerinin rivâyet ettiği hadîs-i şerîfler', navLabel: 'Hadîsler', icon: '☪', cardLabel: 'Hadîs-i Şerîf' }
  },
  source: {
    name: 'İslâm Âlimleri Ansiklopedisi — Türkiye Gazetesi Yayınları',
    url: 'https://www.turkiyegazetesi.com.tr/bizim-sayfa/biyografi/rehber-insanlar/imam-i-buhari'
  },
  journeyEnd: {
    year: '256 H / 870 M',
    title: 'Yolculuk Tamamlandı',
    desc: 'Ramazan bayramı gecesi, 62 yaşında Hartenk köyünde Hakk\'ın rahmetine kavuştu. Kabr-i şerîfinden günlerce misk kokusu yayıldı.'
  },
  routeDetails: {
    'Hacca Çıkış': 'Annesi ve ağabeyi Ahmed ile birlikte Buhârâ\'dan hacca çıktı. Hac farîzasını yaptıktan sonra ailesi Buhârâ\'ya döndü, kendisi Mekke\'de kalıp hadîs-i şerîf toplamaya başladı.',
    'Medîne\'ye Geçiş': 'Mekke\'den Medîne-i Münevvere\'ye geçti. Peygamber Efendimiz sallallâhü aleyhi ve sellemin kabr-i şerîfi başında, geceleri ay ışığında Târîhü\'l-Kebîr\'i yazdı.',
    'Irak Seyahati': 'Hadîs ilminin en önemli merkezlerinden Bağdat\'a gitti. Burada 100 hadîs âliminin karıştırdığı isnâdları tek tek düzelterek eşsiz hâfızasını ispatladı.',
    'Basra\'ya': 'Basra\'da 1.000 kişilik ilim meclisinde hadîs-i şerîf yazdırdı. Basralı râvîlerin rivâyet zincirlerini tek tek saydı.',
    'Kûfe\'ye': 'Hz. Ali radıyallâhü anh döneminden beri önemli bir ilim merkezi olan Kûfe\'de hadîs meclislerine katıldı.',
    'Vâsıt\'a': 'Bağdat ile Basra arasındaki önemli konaklama noktası. Hadîs âlimleriyle görüştü.',
    'Mısır\'a İlk Seyahat': 'Hadîs tahsîli için Mısır\'a ilk seyahatini yaptı. Saîd bin Ebû Meryem ve Abdullah bin Sâlih\'ten hadîs aldı.',
    'Filistin\'e': 'Akdeniz kıyısındaki Askalân\'da Filistin bölgesinin hadîs râvîlerinden rivâyet topladı.',
    'Şam\'a': 'Emevîler döneminden beri İslâm dünyâsının en önemli ilim merkezlerinden Dımaşk\'ta hadîs tahsîl etti.',
    'Humus\'a': 'Sahâbe-i kirâmdan pek çok zâtın yerleştiği Humus şehrinde hadîs âlimleriyle görüştü.',
    'Horasan\'a Dönüş': 'Uzun seyahatlerinden sonra doğduğu bölge olan Horasan\'a döndü. Ahmed bin Hanbel: "Horasan onun gibisini çıkarmamıştır."',
    'Nîşâbur\'a': 'Nîşâbur\'a geldiğinde 4.000 kişi tarafından karşılandı. İmâm-ı Müslim alnından öpüp "Ey üstâtların üstâdı!" dedi.',
    'Merv\'e': 'İpek Yolu\'nun en önemli duraklarından Merv\'de hadîs meclislerine katıldı.',
    'Belh\'e': 'İslâm medeniyetinin doğu sınırındaki en önemli ilim merkezlerinden Belh\'te hadîs meclisi kurdu.',
    'Rey\'e': 'Günümüzde Tahran\'ın bir mahallesi olan Rey, o dönemde bağımsız ve önemli bir ilim merkeziydi.',
    'Sürgün Sonrası': 'Vâli Hâlid bin Ahmed\'in özel ders talebini reddetti: "İlmi sultânın kapısına götürüp zelîl etmem." Buhârâ\'dan sürgün edildi.',
    'Hartenk\'e Yerleşme': 'Semerkantlılar dâvet etti ama farklı görüşler olduğunu öğrenince Hartenk\'te akrabâlarının yanına yerleşti.'
  }
};
