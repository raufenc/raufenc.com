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
    hadith: { title: 'Meşhur Sözleri ve Menkıbeleri', desc: 'Fâtih Sultan Mehmed Hân\'ın hikmet dolu sözleri' }
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
    'Manisa Sancakbeyliği': 'Şehzâde Mehmed, tahsîli için Manisa\'ya sancakbeyi olarak gönderildi. Burada devrin en büyük âlimlerinden ders aldı.',
    'Edirne\'ye Dönüş': 'Babasının tahtı bırakması üzerine 14 yaşında Edirne\'ye çağrılıp ilk kez pâdişâh oldu.',
    'İstanbul Kuşatması': 'Rumelihisarı\'nı yaptırıp Boğaz\'ı kesen Sultan, 857 (1453) baharında ordusunu İstanbul önlerine çıkardı.',
    'Sırbistan Seferi': 'Belgrad\'ı kuşattı. Balkan topraklarında Osmanlı hâkimiyetini pekiştirdi.',
    'Mora Seferi': 'Mora Yarımadası\'ndaki Bizans bakiyyelerini ortadan kaldırarak Yunanistan\'ı fethetti.',
    'Trabzon Seferi': 'Trabzon Rum İmparatorluğu\'na son vererek Karadeniz kıyılarını Osmanlı toprağına kattı.',
    'Otlukbeli Seferi': 'Akkoyunlu hükümdârı Uzun Hasan\'ı Otlukbeli\'nde büyük bir bozguna uğrattı.',
    'Arnavutluk Seferi': 'İskender Bey\'in ölümünden sonra Arnavutluk\'u tamamen Osmanlı topraklarına kattı.',
    'İtalya Seferi': 'Gedik Ahmed Paşa komutasındaki donanma Otranto\'yu fethederek İtalya\'ya ayak bastı.'
  }
};
