/* ═══════════ Âlim Yapılandırması ═══════════ */
const SCHOLAR = {
  id: 'fatih-sultan-mehmed',
  name: 'Fâtih Sultan Mehmed Hân',
  subtitle: 'İstanbul Fâtihi',
  fullName: 'Sultan Mehmed bin Murâd bin Mehmed Hân el-Fâtih',
  honorific: 'rahmetullâhi aleyh',
  logoLetter: 'F',
  birthAH: 835,
  deathAH: 886,
  birthCE: 1432,
  deathCE: 1481,
  description: 'İstanbul\'u fethederek çağ kapayıp çağ açan, iki kıtayı ve iki denizi birleştiren, ilim ve medeniyetin hâmisi yedinci Osmanlı Padişâhı.',
  mapCenter: [41.0, 32.0],
  mapZoom: 5,
  stats: [
    { target: 17, label: 'Fethedilen Devlet' },
    { target: 381, label: 'Câmi İnşâsı' },
    { target: 8, label: 'Sahn-ı Semân Medresesi' },
    { target: 6, label: 'Lisan' },
    { target: 2214000, suffix: '+', label: 'km² Toprak' }
  ],
  sections: {
    map: { title: 'Sefer Haritası', desc: 'Edirne\'den İstanbul\'a, Balkanlara ve Anadolu\'ya — 30 yıllık saltanat yolculuğu' },
    timeline: { title: 'Zaman Çizelgesi', desc: 'Edirne\'den ebediyyete — 49 yıllık bereketli ömür' },
    content: { title: 'Hayâtı ve Cihâdı', desc: 'Kaynak: İslâm Âlimleri Ansiklopedisi, Türkiye Gazetesi Yayınları' },
    ozel: {
      title: 'Meşhur Sözleri ve Menkıbeleri',
      desc: 'Fâtih Sultan Mehmed Hân\'ın hikmet dolu sözleri',
      navLabel: 'Sözleri',
      icon: '⚔',
      cardLabel: 'Meşhur Söz'
    }
  },
  source: {
    name: 'İslâm Âlimleri Ansiklopedisi — Türkiye Gazetesi Yayınları',
    url: 'https://www.turkiyegazetesi.com.tr/bizim-sayfa/biyografi/rehber-insanlar/fatihsultanmehmedhan'
  },
  journeyEnd: {
    year: '886 H / 1481 M',
    title: 'Yolculuk Tamamlandı',
    desc: 'Fâtih Sultan Mehmed Hân, 886 (1481) senesinde vefât etti. Cenâze namazını Muhyiddin Ebü\'l-Vefâ hazretleri kıldırdı. İstanbul\'da yaptırdığı Fâtih Câmii\'nin bahçesindeki türbesine defnedildi.'
  },
  routeDetails: {
    'Manisa Sancakbeyliği': 'Şehzâde Mehmed, tahsîli için Manisa\'ya sancakbeyi olarak gönderildi. Akşemseddin hazretlerinin terbiyesinde yetişti.',
    'Edirne\'ye Dönüş': 'Babasının tahtı bırakması üzerine 14 yaşında Edirne\'ye çağrılıp ilk kez pâdişâh oldu.',
    'İstanbul Kuşatması': 'Rumelihisarı\'nı yaptırıp Boğaz\'ı kesen Sultan, 857 (1453) baharında ordusunu İstanbul önlerine çıkardı.',
    'Sırbistan Seferi': 'İstanbul\'dan Edirne üzerinden Balkanlar\'a ilerledi. Sırbistan\'ın pek çok kalesini fethetti.',
    'Mora Seferi': 'Edirne-Selanik güzergâhından Mora Yarımadası\'na inerek Bizans despotluklarına son verdi.',
    'Trabzon Seferi': 'Anadolu\'nun kuzey kıyısı boyunca ilerleyerek Trabzon Rum İmparatorluğu\'nu fethetti.',
    'Bosna Seferi': 'Edirne-Sofya-Niş üzerinden Bosna\'ya ulaşarak krallığı Osmanlı topraklarına kattı.',
    'Karaman Seferi': 'Eskişehir-Konya güzergâhından Karaman Beyliği\'ni ilhâk ederek Anadolu birliğini sağladı.',
    'Otlukbeli Seferi': 'Anadolu\'nun içinden doğuya ilerleyerek Akkoyunlu Uzun Hasan\'ı Erzincan yakınlarında bozguna uğrattı.',
    'Arnavutluk Seferi': 'Edirne-Üsküp güzergâhından Arnavutluk\'a ulaşıp İskender Bey sonrası direniş noktalarını fethetti.',
    'İtalya Seferi': 'Gedik Ahmed Paşa komutasında Adriyatik kıyısından İtalya\'nın Otranto şehrine çıkarma yapıldı.'
  }
};
