/* ============================================================
   Kayı Tarih Atlası — 172 Konum Veritabanı
   Osmanlı Kuruluş Dönemi (1258–1421)
   ============================================================ */

const LOCATIONS = [

  // ═══════════════════════════════════════════════════════════
  // KAYNAK GÖÇ GÜZERGAHI (Orta Asya → Anadolu)
  // ═══════════════════════════════════════════════════════════

  {
    id: 1, category: "migration", lat: 37.6639, lng: 62.1592,
    name: { tr: "Merv", en: "Merv" },
    historicalNames: ["Marw", "Merv-i Shahican"],
    modernName: { tr: "Mary (harabeleri)", en: "Mary (ruins)" },
    country: { tr: "Turkmenistan", en: "Turkmenistan" },
    significance: {
      tr: "Horasan metropolu; Oguz/Kayi boyunun batiya goc baslangic noktasi",
      en: "Khorasan metropolis; starting point of Oghuz/Kayi westward migration"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 2, category: "migration", lat: 36.2136, lng: 58.7960,
    name: { tr: "Horasan Bolgesi", en: "Khorasan Region" },
    historicalNames: ["Khorasan"],
    modernName: { tr: "Nisapur (merkez)", en: "Nishapur (center)" },
    country: { tr: "Iran", en: "Iran" },
    significance: {
      tr: "Kayi boyunun Mogol baskisi altinda batiya goc ettigi ana bolge",
      en: "Heartland through which Kayi migrated westward under Mongol pressure"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 3, category: "migration", lat: 39.7747, lng: 64.4286,
    name: { tr: "Buhara", en: "Bukhara" },
    historicalNames: ["Buhara"],
    modernName: { tr: "Buhara", en: "Bukhara" },
    country: { tr: "Ozbekistan", en: "Uzbekistan" },
    significance: {
      tr: "Kayi goc guzergahindaki buyuk Islam merkezi",
      en: "Major Islamic center on the Kayi migration route"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 4, category: "migration", lat: 39.6542, lng: 66.9597,
    name: { tr: "Semerkand", en: "Samarkand" },
    historicalNames: ["Semerkand"],
    modernName: { tr: "Semerkand", en: "Samarkand" },
    country: { tr: "Ozbekistan", en: "Uzbekistan" },
    significance: {
      tr: "Timur baskenti, Ipek Yolu kavsaklarinda goc koridoru",
      en: "Timurid capital, Silk Road crossroads on migration corridor"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 5, category: "migration", lat: 38.0802, lng: 46.2919,
    name: { tr: "Tebriz", en: "Tabriz" },
    historicalNames: ["Tebriz"],
    modernName: { tr: "Tebriz", en: "Tabriz" },
    country: { tr: "Iran", en: "Iran" },
    significance: {
      tr: "Ilhanli baskenti; Turkmenlerin Anadolu'ya gecis noktasi",
      en: "Ilkhanid capital; key waypoint for Turkmen transit into Anatolia"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 6, category: "migration", lat: 38.7486, lng: 42.4739,
    name: { tr: "Ahlat", en: "Ahlat" },
    historicalNames: ["Ahlat", "Khilat"],
    modernName: { tr: "Ahlat", en: "Ahlat" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Van Golu kiyisinda Turkmen gecis kapisi; Kayi kis konagi",
      en: "Turkmen gateway on Lake Van; Kayi winter quarter before moving west"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 7, category: "migration", lat: 39.9043, lng: 41.2675,
    name: { tr: "Erzurum", en: "Erzurum" },
    historicalNames: ["Erzen-i Rum", "Theodosiopolis"],
    modernName: { tr: "Erzurum", en: "Erzurum" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Dogu Anadolu kalesi, Kayi goc guzergahi uzerinde",
      en: "Eastern Anatolian stronghold on Kayi migration path"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 8, category: "migration", lat: 39.7500, lng: 39.4880,
    name: { tr: "Erzincan", en: "Erzincan" },
    historicalNames: ["Erzincan", "Eriza"],
    modernName: { tr: "Erzincan", en: "Erzincan" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Dogu ve orta Anadolu arasinda gecis yerlesimi",
      en: "Transitional Kayi settlement between east and central Anatolia"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 9, category: "migration", lat: 36.2021, lng: 37.1343,
    name: { tr: "Halep", en: "Aleppo" },
    historicalNames: ["Haleb"],
    modernName: { tr: "Halep", en: "Aleppo" },
    country: { tr: "Suriye", en: "Syria" },
    significance: {
      tr: "Suleyman Sah'in Firat'i gecerken boguldugu rivayetine yakin bolge",
      en: "Near where Suleyman Shah reportedly drowned crossing the Euphrates"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 10, category: "migration", lat: 35.8975, lng: 38.4808,
    name: { tr: "Caber Kalesi", en: "Qal'at Ja'bar" },
    historicalNames: ["Qal'at Ja'bar", "Dawsar"],
    modernName: { tr: "Caber Kalesi (Esad Golu)", en: "Qal'at Ja'bar (Lake Assad)" },
    country: { tr: "Suriye", en: "Syria" },
    significance: {
      tr: "Suleyman Sah turbesi; 1921-1973 arasi Osmanli anklavesi",
      en: "Traditional site of Suleyman Shah's tomb; Ottoman exclave 1921-1973"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 11, category: "migration", lat: 39.9200, lng: 44.0500,
    name: { tr: "Surmeli Cukur", en: "Surmeli Valley" },
    historicalNames: ["Surmeli Cukuru"],
    modernName: { tr: "Igdir ovasi", en: "Igdir plain" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Aras Vadisi'nde erken Kayi kis konagi",
      en: "Early Kayi wintering ground in the Aras Valley"
    },
    period: "pre-ottoman", year: null
  },
  {
    id: 12, category: "migration", lat: 39.4300, lng: 32.4800,
    name: { tr: "Karacadag", en: "Karacadag" },
    historicalNames: ["Karacadag"],
    modernName: { tr: "Haymana civar (Ankara GB)", en: "Haymana area (SW Ankara)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Sultan Alaeddin'in Ertugrul'a Sogut oncesi tahsis ettigi bolge",
      en: "Region allocated by Sultan Alaeddin to Ertugrul before Sogut"
    },
    period: "ertugrul", year: 1230
  },

  // ═══════════════════════════════════════════════════════════
  // SOGUT-BILECIK CEKIRDEK BOLGE (Osmanli kalbi)
  // ═══════════════════════════════════════════════════════════

  {
    id: 13, category: "core", lat: 40.0333, lng: 30.1833,
    name: { tr: "Sogut", en: "Sogut" },
    historicalNames: ["Sogut", "Thebasion"],
    modernName: { tr: "Sogut", en: "Sogut" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Kayi kis konaklari; Osmanli beyliginin kurulus merkezi; Ertugrul Gazi turbesi",
      en: "Kayi winter quarters; founding seat of Ottoman beylik; Ertugrul's tomb"
    },
    period: "ertugrul", year: 1231
  },
  {
    id: 14, category: "core", lat: 39.8028, lng: 29.6083,
    name: { tr: "Domanic", en: "Domanic" },
    historicalNames: ["Domanic"],
    modernName: { tr: "Domanic", en: "Domanic" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Selcuklu sultaninin verdigi Kayi yaz otlagi (yaylak)",
      en: "Kayi summer pasture (yaylak) granted by Seljuk sultan"
    },
    period: "ertugrul", year: 1231
  },
  {
    id: 15, category: "core", lat: 40.0567, lng: 30.0167,
    name: { tr: "Bilecik", en: "Bilecik" },
    historicalNames: ["Bilecik", "Belekoma"],
    modernName: { tr: "Bilecik", en: "Bilecik" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1299 civarinda Osman'in meshur dugun ziyafeti hilesiyle ele gecirildi",
      en: "Captured c.1299 through Osman's famous wedding-feast ruse"
    },
    period: "osman", year: 1299
  },
  {
    id: 16, category: "core", lat: 39.7400, lng: 30.4700,
    name: { tr: "Karacahisar", en: "Karacahisar" },
    historicalNames: ["Karacahisar"],
    modernName: { tr: "Karacasehir harabeleri (Eskisehir GB)", en: "Karacasehir ruins (SW Eskisehir)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osman'in ele gecirdigi ilk buyuk kale (y.1288); ilk hutbe burada okundu",
      en: "First major fortress captured by Osman (c.1288); first khutba read here"
    },
    period: "osman", year: 1288
  },
  {
    id: 17, category: "core", lat: 40.1500, lng: 29.9500,
    name: { tr: "Yarhisar", en: "Yarhisar" },
    historicalNames: ["Yarhisar"],
    modernName: { tr: "Yarhisar koyu", en: "Yarhisar village" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osman tarafindan ele gecirildi; tekfurun kizi Nilufer, Orhan ile evlendi",
      en: "Captured by Osman; lord's daughter Nilufer married Orhan"
    },
    period: "osman", year: 1299
  },
  {
    id: 18, category: "core", lat: 40.0781, lng: 29.5133,
    name: { tr: "Inegol", en: "Inegol" },
    historicalNames: ["Inegol", "Angelokomos"],
    modernName: { tr: "Inegol", en: "Inegol" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Tekfur Nikola'nin Bizans kalesi; 1299 civarinda Turgut Alp tarafindan fethedildi",
      en: "Byzantine fortress of Tekfur Nikola; conquered c.1299 by Turgut Alp"
    },
    period: "osman", year: 1299
  },
  {
    id: 19, category: "core", lat: 39.7767, lng: 30.5206,
    name: { tr: "Eskisehir", en: "Eskisehir" },
    historicalNames: ["Sultanonu", "Dorylaion"],
    modernName: { tr: "Eskisehir", en: "Eskisehir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Antik Dorylaeum; Karacahisar fethinden sonra Osman'a verildi",
      en: "Ancient Dorylaeum; granted to Osman after Karacahisar capture"
    },
    period: "osman", year: 1289
  },
  {
    id: 20, category: "core", lat: 40.0500, lng: 30.0300,
    name: { tr: "Itburnu", en: "Itburnu" },
    historicalNames: ["Itburnu"],
    modernName: { tr: "Itburnu", en: "Itburnu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Erken Kayi genisleme bolgesinde Bilecik yakininda kucuk yerlesim",
      en: "Minor settlement near Bilecik in early Kayi expansion zone"
    },
    period: "osman", year: 1299
  },
  {
    id: 21, category: "core", lat: 40.0000, lng: 29.7500,
    name: { tr: "Ermeni Beli", en: "Ermeni Beli Pass" },
    historicalNames: ["Ermeni Beli", "Armenokastron"],
    modernName: { tr: "Dag gecidi", en: "Mountain pass" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osman'in ilk savasi (y.1284); yegeni Bayhoca sehit dustu",
      en: "Site of Osman's first battle (c.1284); nephew Bayhoca martyred"
    },
    period: "osman", year: 1284
  },
  {
    id: 22, category: "core", lat: 40.0500, lng: 29.5500,
    name: { tr: "Kulacahisar", en: "Kulacahisar" },
    historicalNames: ["Kulacahisar"],
    modernName: { tr: "Inegol yakininda harabeler", en: "Ruins near Inegol" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osmanlilarin ele gecirdigi ilk kale (1285); Osman'in gece baskini",
      en: "First castle ever captured by the Ottomans (1285); Osman's night raid"
    },
    period: "osman", year: 1285
  },
  {
    id: 23, category: "core", lat: 39.9083, lng: 30.0375,
    name: { tr: "Bozuyuk", en: "Bozuyuk" },
    historicalNames: ["Bozuyuk"],
    modernName: { tr: "Bozuyuk", en: "Bozuyuk" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bilecik-Eskisehir arasindaki Osmanli cekirdek bolgesi kasabasi",
      en: "Town in Ottoman core zone between Bilecik and Eskisehir"
    },
    period: "osman", year: 1299
  },
  {
    id: 24, category: "core", lat: 39.8167, lng: 30.1500,
    name: { tr: "Inonu", en: "Inonu" },
    historicalNames: ["Inonu"],
    modernName: { tr: "Inonu", en: "Inonu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Selcuklu sultani tarafindan Osman'a verildi",
      en: "Granted to Osman by the Seljuk sultan"
    },
    period: "osman", year: 1289
  },
  {
    id: 25, category: "core", lat: 40.6833, lng: 29.4667,
    name: { tr: "Koyunhisar (Bapheus)", en: "Bapheus" },
    historicalNames: ["Bapheus", "Koyunhisar"],
    modernName: { tr: "Yalova (Hersek) yakini", en: "Near Yalova (Hersek)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bapheus Muharebesi 1302 — Osman'in Bizans'a karsi ilk buyuk zaferi",
      en: "Battle of Bapheus 1302 — Osman's first major victory over Byzantium"
    },
    period: "osman", year: 1302
  },
  {
    id: 26, category: "core", lat: 40.2561, lng: 29.6536,
    name: { tr: "Yenisehir", en: "Yenisehir" },
    historicalNames: ["Yenisehir"],
    modernName: { tr: "Yenisehir", en: "Yenisehir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Sogut'ten sonraki erken Osmanli baskenti",
      en: "Early Ottoman capital after Sogut"
    },
    period: "osman", year: 1300
  },
  {
    id: 27, category: "core", lat: 40.0600, lng: 30.0000,
    name: { tr: "Cakirpinar", en: "Cakirpinar" },
    historicalNames: ["Cakirpinar"],
    modernName: { tr: "Cakirpinar", en: "Cakirpinar" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osman'in dugun ziyafetinde tekfurlara pusu kurarak Bilecik'i ele gecirdigi yer",
      en: "Where Osman ambushed tekfurs at a wedding feast, seizing Bilecik"
    },
    period: "osman", year: 1299
  },
  {
    id: 28, category: "core", lat: 40.2200, lng: 30.1200,
    name: { tr: "Harmankaya", en: "Harmankaya" },
    historicalNames: ["Harmankaya", "Khirmenkia"],
    modernName: { tr: "Harmankoy (Inhisar)", en: "Harmankoy (Inhisar)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osman'a iltica edip Islam'a gecen Kose Mihal'in kalesi",
      en: "Fortress of Kose Mihal, who defected to Osman and converted to Islam"
    },
    period: "osman", year: 1290
  },

  // ═══════════════════════════════════════════════════════════
  // BURSA-IZNIK-IZMIT BOLGESI
  // ═══════════════════════════════════════════════════════════

  {
    id: 29, category: "bursa_region", lat: 40.1828, lng: 29.0665,
    name: { tr: "Bursa", en: "Bursa" },
    historicalNames: ["Prusa", "Bursa"],
    modernName: { tr: "Bursa", en: "Bursa" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ilk buyuk Osmanli baskenti (1326-1365); Osman I ve Orhan'in turbeleri",
      en: "First major Ottoman capital (1326-1365); tombs of Osman I and Orhan"
    },
    period: "orhan", year: 1326
  },
  {
    id: 30, category: "bursa_region", lat: 40.4292, lng: 29.7208,
    name: { tr: "Iznik", en: "Nicaea" },
    historicalNames: ["Nikaia", "Nicaea"],
    modernName: { tr: "Iznik", en: "Iznik" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Eski Bizans baskenti; 1331'de Orhan'a teslim oldu",
      en: "Former Byzantine capital; surrendered to Orhan 1331"
    },
    period: "orhan", year: 1331
  },
  {
    id: 31, category: "bursa_region", lat: 40.7656, lng: 29.9408,
    name: { tr: "Izmit", en: "Nicomedia" },
    historicalNames: ["Nicomedia", "Izmit"],
    modernName: { tr: "Izmit", en: "Izmit" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Son Bizans Bithynia kalesi; 1337'de Orhan tarafindan fethedildi",
      en: "Last Byzantine Bithynian stronghold; fell to Orhan 1337"
    },
    period: "orhan", year: 1337
  },
  {
    id: 32, category: "bursa_region", lat: 40.3756, lng: 28.8828,
    name: { tr: "Mudanya", en: "Mudanya" },
    historicalNames: ["Mudanya", "Myrleia"],
    modernName: { tr: "Mudanya", en: "Mudanya" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bursa yakininda Marmara limani",
      en: "Marmara port near Bursa"
    },
    period: "orhan", year: 1326
  },
  {
    id: 33, category: "bursa_region", lat: 40.6550, lng: 29.2750,
    name: { tr: "Yalova", en: "Yalova" },
    historicalNames: ["Yalakova", "Helenopolis"],
    modernName: { tr: "Yalova", en: "Yalova" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bapheus Muharebesi yakini; Osmanli deniz harekati ussu",
      en: "Near Battle of Bapheus; Ottoman maritime staging point"
    },
    period: "osman", year: 1302
  },
  {
    id: 34, category: "bursa_region", lat: 40.4347, lng: 29.1567,
    name: { tr: "Gemlik (Kios)", en: "Gemlik (Kios)" },
    historicalNames: ["Kios", "Gemlik"],
    modernName: { tr: "Gemlik", en: "Gemlik" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Marmara Denizi'ndeki ilk Osmanli limani",
      en: "First Ottoman port on the Sea of Marmara"
    },
    period: "orhan", year: 1330
  },
  {
    id: 35, category: "bursa_region", lat: 40.7692, lng: 29.3750,
    name: { tr: "Darica", en: "Darica" },
    historicalNames: ["Darica"],
    modernName: { tr: "Darica", en: "Darica" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Marmara kiyisindaki Pelekanon savas alanina yakin",
      en: "Near Pelekanon battlefield on Marmara coast"
    },
    period: "orhan", year: 1329
  },
  {
    id: 36, category: "bursa_region", lat: 40.7917, lng: 29.6333,
    name: { tr: "Hereke", en: "Hereke" },
    historicalNames: ["Hereke"],
    modernName: { tr: "Hereke", en: "Hereke" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Kiyi kasabasi; sonradan Osmanli saray hali imalathanesi",
      en: "Coastal town; later famed for Ottoman imperial carpet manufactory"
    },
    period: "orhan", year: 1335
  },
  {
    id: 37, category: "bursa_region", lat: 40.6903, lng: 29.6150,
    name: { tr: "Karamursel", en: "Karamursel" },
    historicalNames: ["Karamursel"],
    modernName: { tr: "Karamursel", en: "Karamursel" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Deniz komutani Karamursel Alp'ten ismini alir; Izmit Korfezi'nde erken dayanak",
      en: "Named after naval commander Karamursel Alp; early Izmit Gulf foothold"
    },
    period: "orhan", year: 1330
  },
  {
    id: 38, category: "bursa_region", lat: 40.5200, lng: 28.8300,
    name: { tr: "Armutlu", en: "Armutlu" },
    historicalNames: ["Armutlu"],
    modernName: { tr: "Armutlu", en: "Armutlu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Erken Osmanli Bithynia bolgesinde Marmara yarimadasi kasabasi",
      en: "Marmara peninsula town in early Ottoman Bithynian zone"
    },
    period: "orhan", year: 1335
  },
  {
    id: 39, category: "bursa_region", lat: 40.1667, lng: 28.6833,
    name: { tr: "Ulubad (Apolyont)", en: "Apolyont" },
    historicalNames: ["Apollonias", "Apolyont"],
    modernName: { tr: "Golyazi / Uluabat Golu", en: "Golyazi / Uluabat Lake" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Marmara ovalarina erisimi kontrol eden gol ve yerlesim",
      en: "Lake and settlement controlling access to Marmara lowlands"
    },
    period: "orhan", year: 1330
  },
  {
    id: 40, category: "bursa_region", lat: 40.2128, lng: 28.3603,
    name: { tr: "Karacabey (Mihalic)", en: "Karacabey (Mihalic)" },
    historicalNames: ["Mihalic", "Karacabey"],
    modernName: { tr: "Karacabey", en: "Karacabey" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Gazi Mihal'in torunlarindan ismini alir; Osmanli saray at ciftligi",
      en: "Named after Gazi Mihal's descendants; Ottoman imperial horse stud"
    },
    period: "orhan", year: 1330
  },
  {
    id: 41, category: "bursa_region", lat: 40.0333, lng: 28.3833,
    name: { tr: "Kirmasti (M.K.Pasa)", en: "Kirmasti" },
    historicalNames: ["Kirmasti"],
    modernName: { tr: "Mustafakemalpasa", en: "Mustafakemalpasa" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bursa guneyinde tarimsal hinterlanddaki Osmanli kasabasi",
      en: "Ottoman town south of Bursa in agricultural hinterland"
    },
    period: "orhan", year: 1330
  },
  {
    id: 42, category: "bursa_region", lat: 40.7700, lng: 29.3700,
    name: { tr: "Pelekanon", en: "Pelekanon" },
    historicalNames: ["Pelekanos", "Pelekanon"],
    modernName: { tr: "Darica/Eskihisar yakini", en: "Near Darica/Eskihisar" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Pelekanon Muharebesi 1329 — Orhan, Imparator III. Andronikos'u yendi",
      en: "Battle of Pelekanon 1329 — Orhan defeated Emperor Andronikos III"
    },
    period: "orhan", year: 1329
  },
  {
    id: 43, category: "bursa_region", lat: 40.9600, lng: 29.2700,
    name: { tr: "Aydos Kalesi", en: "Aydos Castle" },
    historicalNames: ["Aydos"],
    modernName: { tr: "Sultanbeyli (Istanbul)", en: "Sultanbeyli (Istanbul)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bizans tepe kalesi; Istanbul'a dogru genislemede ele gecirildi",
      en: "Byzantine hilltop fortress; captured during expansion toward Constantinople"
    },
    period: "orhan", year: 1330
  },
  {
    id: 44, category: "bursa_region", lat: 40.8000, lng: 29.4200,
    name: { tr: "Eskihisar (Gebze)", en: "Eskihisar (Gebze)" },
    historicalNames: ["Libyssa", "Eskihisar"],
    modernName: { tr: "Eskihisar (Gebze)", en: "Eskihisar (Gebze)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Antik Libyssa (Hannibal'in turbesi); stratejik Marmara kiyisi noktasi",
      en: "Ancient Libyssa (Hannibal's tomb); strategic Marmara coast point"
    },
    period: "orhan", year: 1330
  },
  {
    id: 45, category: "bursa_region", lat: 40.4000, lng: 30.0500,
    name: { tr: "Mekece", en: "Mekece" },
    historicalNames: ["Mekece"],
    modernName: { tr: "Mekece", en: "Mekece" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Sogut-Bilecik'i Iznik'e baglayan Sakarya vadisi guzergahinda",
      en: "On Sakarya valley route connecting Sogut-Bilecik to Iznik"
    },
    period: "orhan", year: 1330
  },
  {
    id: 46, category: "bursa_region", lat: 40.5083, lng: 30.2889,
    name: { tr: "Geyve", en: "Geyve" },
    historicalNames: ["Geyve"],
    modernName: { tr: "Geyve", en: "Geyve" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Izmit'e dogru Sakarya vadisi guzergahi",
      en: "Sakarya valley route toward Izmit"
    },
    period: "orhan", year: 1335
  },
  {
    id: 47, category: "bursa_region", lat: 40.6917, lng: 30.2667,
    name: { tr: "Sapanca", en: "Sapanca" },
    historicalNames: ["Sapanca", "Sophon"],
    modernName: { tr: "Sapanca", en: "Sapanca" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Sakarya ile Izmit koridorlari arasindaki stratejik gecidi kontrol eden gol",
      en: "Lake controlling strategic pass between Sakarya and Izmit corridors"
    },
    period: "orhan", year: 1335
  },
  {
    id: 48, category: "core", lat: 40.3500, lng: 30.0167,
    name: { tr: "Osmaneli (Lefke)", en: "Osmaneli (Lefke)" },
    historicalNames: ["Lefke"],
    modernName: { tr: "Osmaneli", en: "Osmaneli" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Sakarya Nehri uzerinde; Osman tekfuruyla dostane iliskiler surdurudu",
      en: "On the Sakarya River; Osman maintained friendly relations with its tekfur"
    },
    period: "osman", year: 1300
  },

  // ═══════════════════════════════════════════════════════════
  // SAKARYA VADISI VE BOLU BOLGESI
  // ═══════════════════════════════════════════════════════════

  {
    id: 49, category: "bursa_region", lat: 40.9142, lng: 31.1431,
    name: { tr: "Konuralp", en: "Konuralp" },
    historicalNames: ["Prusias ad Hypium", "Uskubu"],
    modernName: { tr: "Konuralp (Duzce)", en: "Konuralp (Duzce)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1323'te Konur Alp tarafindan fethedildi; en erken Osmanli toprak tahsislerinden",
      en: "Conquered 1323 by Konur Alp; one of earliest Ottoman territorial grants"
    },
    period: "orhan", year: 1323
  },
  {
    id: 50, category: "bursa_region", lat: 40.8439, lng: 31.1566,
    name: { tr: "Duzce", en: "Duzce" },
    historicalNames: ["Duzce", "Dousai"],
    modernName: { tr: "Duzce", en: "Duzce" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bithynia siniri ile Karadeniz kiyisi arasindaki stratejik baglanti",
      en: "Strategic link between Bithynian frontier and Black Sea coast"
    },
    period: "orhan", year: 1325
  },
  {
    id: 51, category: "bursa_region", lat: 40.7356, lng: 31.6089,
    name: { tr: "Bolu", en: "Bolu" },
    historicalNames: ["Claudiopolis", "Bithynion"],
    modernName: { tr: "Bolu", en: "Bolu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1320'ler-30'larda fethedildi; onemli dag gecitlerini kontrol eden sancak merkezi",
      en: "Captured 1320s-30s; sanjak center controlling key mountain passes"
    },
    period: "orhan", year: 1325
  },
  {
    id: 52, category: "bursa_region", lat: 40.4725, lng: 31.1681,
    name: { tr: "Mudurnu", en: "Mudurnu" },
    historicalNames: ["Modrene", "Mudurnu"],
    modernName: { tr: "Mudurnu", en: "Mudurnu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bolu bolgesinde erken Osmanli fethi; korunmus Osmanli donemi evleri",
      en: "Early Ottoman conquest in Bolu region; preserved Ottoman-era houses"
    },
    period: "orhan", year: 1325
  },
  {
    id: 53, category: "bursa_region", lat: 40.3947, lng: 30.7925,
    name: { tr: "Goynuk", en: "Goynuk" },
    historicalNames: ["Goynuk"],
    modernName: { tr: "Goynuk", en: "Goynuk" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bolu koridorunda erken Osmanli fethi; onemli turbeler ve camiler",
      en: "Early Ottoman conquest in Bolu corridor; notable tombs and mosques"
    },
    period: "orhan", year: 1325
  },
  {
    id: 54, category: "bursa_region", lat: 40.3925, lng: 30.4908,
    name: { tr: "Tarakli", en: "Tarakli" },
    historicalNames: ["Tarakli", "Dablis"],
    modernName: { tr: "Tarakli", en: "Tarakli" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bolu'nun batisindaki erken genisleme sirasinda fethedildi",
      en: "Conquered during early expansion west of Bolu"
    },
    period: "orhan", year: 1325
  },
  {
    id: 55, category: "bursa_region", lat: 40.7969, lng: 32.1972,
    name: { tr: "Gerede", en: "Gerede" },
    historicalNames: ["Krateia", "Flaviopolis"],
    modernName: { tr: "Gerede", en: "Gerede" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Dogu Bolu siniri; Cankiri'ya giden yol guvence altina alindi",
      en: "Eastern Bolu frontier; secured route toward Cankiri"
    },
    period: "orhan", year: 1335
  },
  {
    id: 56, category: "bursa_region", lat: 41.0847, lng: 31.1142,
    name: { tr: "Akcakoca", en: "Akcakoca" },
    historicalNames: ["Dia Polis", "Akcakoca"],
    modernName: { tr: "Akcakoca", en: "Akcakoca" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osman icin Karadeniz kiyisini fetheden sinir komutani Akcakoca Bey'den ismini alir",
      en: "Named after Akcakoca Bey, frontier commander who conquered the Black Sea coast for Osman"
    },
    period: "osman", year: 1320
  },
  {
    id: 57, category: "bursa_region", lat: 40.9758, lng: 34.8042,
    name: { tr: "Osmancik", en: "Osmancik" },
    historicalNames: ["Osmancik"],
    modernName: { tr: "Osmancik", en: "Osmancik" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bayezid I tarafindan fethedilen Kizilirmak gecisi",
      en: "Kizilirmak crossing conquered by Bayezid I"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 58, category: "bursa_region", lat: 40.6013, lng: 33.6134,
    name: { tr: "Cankiri", en: "Cankiri" },
    historicalNames: ["Gangra", "Germanicopolis"],
    modernName: { tr: "Cankiri", en: "Cankiri" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1390'larda Bayezid I altinda fethedildi; kuzey-orta Anadolu sancak merkezi",
      en: "Conquered 1390s under Bayezid I; north-central Anatolian sanjak center"
    },
    period: "bayezid", year: 1392
  },

  // ═══════════════════════════════════════════════════════════
  // RUMELI / BALKANLAR
  // ═══════════════════════════════════════════════════════════

  {
    id: 59, category: "rumeli", lat: 40.4103, lng: 26.6706,
    name: { tr: "Gelibolu", en: "Gallipoli" },
    historicalNames: ["Kallipolis", "Gallipoli"],
    modernName: { tr: "Gelibolu", en: "Gelibolu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ilk buyuk Osmanli Avrupa ussu (1354); Balkan fetihlerinin hareket noktasi",
      en: "First major Ottoman European base (1354); staging point for Balkan conquests"
    },
    period: "orhan", year: 1354
  },
  {
    id: 60, category: "rumeli", lat: 40.4965, lng: 26.7342,
    name: { tr: "Cimpe Kalesi", en: "Tzympe" },
    historicalNames: ["Tsympe", "Cinbi"],
    modernName: { tr: "Cimpe (harabeler)", en: "Cimpe (ruins)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Avrupa topragindaki ilk Osmanli kalesi (y.1352-1354)",
      en: "First Ottoman-held fortification on European soil (c.1352-1354)"
    },
    period: "orhan", year: 1352
  },
  {
    id: 61, category: "rumeli", lat: 40.5472, lng: 26.7222,
    name: { tr: "Bolayir", en: "Bolayir" },
    historicalNames: ["Plagiarion", "Bolayir"],
    modernName: { tr: "Bolayir", en: "Bolayir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Suleyman Pasa'nin (o.1357) defnedildigi yer",
      en: "Burial site of Suleyman Pasha (d.1357)"
    },
    period: "orhan", year: 1357
  },
  {
    id: 62, category: "rumeli", lat: 41.3514, lng: 26.4972,
    name: { tr: "Dimetoka", en: "Didymoteicho" },
    historicalNames: ["Didymoteicho", "Dimetoka"],
    modernName: { tr: "Didymoteicho", en: "Didymoteicho" },
    country: { tr: "Yunanistan", en: "Greece" },
    significance: {
      tr: "Edirne'den once gecici Osmanli baskenti; Kosovo sonrasi Bayezid I burada tahta cikti",
      en: "Temporary Ottoman capital before Edirne; Bayezid I enthroned here after Kosovo"
    },
    period: "murad", year: 1361
  },
  {
    id: 63, category: "rumeli", lat: 41.6772, lng: 26.5558,
    name: { tr: "Edirne", en: "Edirne" },
    historicalNames: ["Hadrianopolis", "Adrianople"],
    modernName: { tr: "Edirne", en: "Edirne" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ikinci Osmanli baskenti (y.1361/1369-1453); Selimiye Camii",
      en: "Second Ottoman capital (c.1361/1369-1453); Selimiye Mosque"
    },
    period: "murad", year: 1361
  },
  {
    id: 64, category: "rumeli", lat: 41.1592, lng: 27.8003,
    name: { tr: "Corlu", en: "Corlu" },
    historicalNames: ["Tzirallum", "Tzouroulos"],
    modernName: { tr: "Corlu", en: "Corlu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Istanbul-Edirne askeri yolunda kilit garnizon",
      en: "Key garrison on Constantinople-Edirne military road"
    },
    period: "murad", year: 1362
  },
  {
    id: 65, category: "rumeli", lat: 41.4039, lng: 27.3578,
    name: { tr: "Luleburgaz", en: "Luleburgaz" },
    historicalNames: ["Bergule", "Arcadiopolis"],
    modernName: { tr: "Luleburgaz", en: "Luleburgaz" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Istanbul-Edirne yol molasi; Sokollu Mehmed Pasa kulliyesi",
      en: "Istanbul-Edirne road stopover; Sokollu Mehmed Pasha complex"
    },
    period: "murad", year: 1362
  },
  {
    id: 66, category: "rumeli", lat: 41.4325, lng: 27.0933,
    name: { tr: "Babaeski", en: "Babaeski" },
    historicalNames: ["Bulgarophygon", "Babaeski"],
    modernName: { tr: "Babaeski", en: "Babaeski" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Edirne ile Istanbul arasindaki Via Militaris uzerinde menzil",
      en: "Waystation on the Via Militaris between Edirne and Istanbul"
    },
    period: "murad", year: 1362
  },
  {
    id: 67, category: "rumeli", lat: 40.8911, lng: 26.9033,
    name: { tr: "Malkara", en: "Malkara" },
    historicalNames: ["Malkara"],
    modernName: { tr: "Malkara", en: "Malkara" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Guney Trakya'da bolgesel merkez",
      en: "Regional center in southern Thrace"
    },
    period: "murad", year: 1362
  },
  {
    id: 68, category: "rumeli", lat: 40.8544, lng: 26.6378,
    name: { tr: "Kesan", en: "Kesan" },
    historicalNames: ["Kissos", "Kesan"],
    modernName: { tr: "Kesan", en: "Kesan" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1360'lar-70'lerde fethedildi; Gelibolu hinterlandi",
      en: "Captured 1360s-70s; Gelibolu hinterland"
    },
    period: "murad", year: 1362
  },
  {
    id: 69, category: "rumeli", lat: 41.2128, lng: 27.0936,
    name: { tr: "Hayrabolu", en: "Hayrabolu" },
    historicalNames: ["Chariopolis", "Hayrabolu"],
    modernName: { tr: "Hayrabolu", en: "Hayrabolu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Edirne sancaginda ikincil idari kasaba",
      en: "Secondary administrative town in Edirne sanjak"
    },
    period: "murad", year: 1362
  },
  {
    id: 70, category: "rumeli", lat: 40.9219, lng: 26.3822,
    name: { tr: "Ipsala", en: "Ipsala" },
    historicalNames: ["Kypsela", "Ipsala"],
    modernName: { tr: "Ipsala", en: "Ipsala" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Trakya-Makedonya guzergahini kontrol eden Meric gecisi",
      en: "Maritsa crossing controlling Thrace-Macedonia route"
    },
    period: "murad", year: 1365
  },
  {
    id: 71, category: "rumeli", lat: 42.1500, lng: 24.7500,
    name: { tr: "Filibe", en: "Plovdiv" },
    historicalNames: ["Philippopolis", "Filibe"],
    modernName: { tr: "Plovdiv", en: "Plovdiv" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "1363-64 civarinda Lala Sahin Pasa tarafindan fethedildi; onemli Rumeli sancak merkezi",
      en: "Captured c.1363-64 by Lala Shahin Pasha; major Rumeli sanjak center"
    },
    period: "murad", year: 1363
  },
  {
    id: 72, category: "rumeli", lat: 42.6977, lng: 23.3219,
    name: { tr: "Sofya", en: "Sofia" },
    historicalNames: ["Serdica", "Sredets", "Sofya"],
    modernName: { tr: "Sofya", en: "Sofia" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "1382'de fethedildi; Rumeli Beylerbeyliginin baskenti",
      en: "Conquered 1382; capital of Rumeli Beylerbeylik"
    },
    period: "murad", year: 1382
  },
  {
    id: 73, category: "rumeli", lat: 40.6401, lng: 22.9444,
    name: { tr: "Selanik", en: "Thessaloniki" },
    historicalNames: ["Thessalonica", "Solun"],
    modernName: { tr: "Selanik", en: "Thessaloniki" },
    country: { tr: "Yunanistan", en: "Greece" },
    significance: {
      tr: "1387 ve 1430'da fethedildi; en buyuk ikinci Osmanli Avrupa sehri",
      en: "Conquered 1387 and 1430; second-largest Ottoman European city"
    },
    period: "murad", year: 1387
  },
  {
    id: 74, category: "rumeli", lat: 41.0858, lng: 23.5478,
    name: { tr: "Serez", en: "Serres" },
    historicalNames: ["Siroz", "Serrai"],
    modernName: { tr: "Serez", en: "Serres" },
    country: { tr: "Yunanistan", en: "Greece" },
    significance: {
      tr: "1371 Meric Muharebesi sonrasi Osmanli sancak merkezi",
      en: "Ottoman sanjak center after 1371 Battle of Maritsa"
    },
    period: "murad", year: 1371
  },
  {
    id: 75, category: "rumeli", lat: 41.1225, lng: 25.4069,
    name: { tr: "Gumulcine", en: "Komotini" },
    historicalNames: ["Gumulcine", "Komotini"],
    modernName: { tr: "Gumulcine", en: "Komotini" },
    country: { tr: "Yunanistan", en: "Greece" },
    significance: {
      tr: "Bati Trakya'da Osmanli merkezi; gunumuzde hala Musluman nufus",
      en: "Ottoman center in Western Thrace; Muslim population to this day"
    },
    period: "murad", year: 1363
  },
  {
    id: 76, category: "rumeli", lat: 43.7022, lng: 24.8936,
    name: { tr: "Nigbolu", en: "Nicopolis" },
    historicalNames: ["Nicopolis", "Nigbolu"],
    modernName: { tr: "Nikopol", en: "Nikopol" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "Nigbolu Muharebesi 1396 — Bayezid Avrupali Hacli ordusunu ezdi",
      en: "Battle of Nicopolis 1396 — Bayezid crushed European Crusader army"
    },
    period: "bayezid", year: 1396
  },
  {
    id: 77, category: "rumeli", lat: 43.9900, lng: 22.8825,
    name: { tr: "Vidin", en: "Vidin" },
    historicalNames: ["Bdin", "Vidin"],
    modernName: { tr: "Vidin", en: "Vidin" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "Son Bulgar kalesi; 1396'da dustu; Tuna sinir sancagi",
      en: "Last Bulgarian fortress; fell 1396; Danube frontier sanjak"
    },
    period: "bayezid", year: 1396
  },
  {
    id: 78, category: "rumeli", lat: 43.0757, lng: 25.6172,
    name: { tr: "Tirnova", en: "Veliko Tarnovo" },
    historicalNames: ["Tarnovo", "Tirnova"],
    modernName: { tr: "Veliko Tirnova", en: "Veliko Tarnovo" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "1393'te fethedilen Bulgar baskenti; ortacag Bulgar bagimsiziligini sona erdirdi",
      en: "Bulgarian capital captured 1393; ended medieval Bulgarian independence"
    },
    period: "bayezid", year: 1393
  },
  {
    id: 79, category: "rumeli", lat: 44.1167, lng: 27.2667,
    name: { tr: "Silistre", en: "Silistra" },
    historicalNames: ["Dorostol", "Durostorum", "Dristra"],
    modernName: { tr: "Silistre", en: "Silistra" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "1388'de fethedilen kilit Tuna kalesi",
      en: "Key Danube fortress conquered 1388"
    },
    period: "murad", year: 1388
  },
  {
    id: 80, category: "rumeli", lat: 43.2141, lng: 27.9147,
    name: { tr: "Varna", en: "Varna" },
    historicalNames: ["Varna"],
    modernName: { tr: "Varna", en: "Varna" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "1444 Varna Muharebesi; Tuna kiyisi kalesi",
      en: "Site of 1444 Battle of Varna; Danube coast stronghold"
    },
    period: "bayezid", year: 1393
  },
  {
    id: 81, category: "rumeli", lat: 43.3209, lng: 21.8958,
    name: { tr: "Nis", en: "Nis" },
    historicalNames: ["Naissus", "Nis"],
    modernName: { tr: "Nis", en: "Nis" },
    country: { tr: "Sirbistan", en: "Serbia" },
    significance: {
      tr: "I. Murad tarafindan fethedildi (1386); Morava-Vardar koridoru kavsaklari",
      en: "Conquered by Murad I (1386); Morava-Vardar corridor crossroads"
    },
    period: "murad", year: 1386
  },
  {
    id: 82, category: "rumeli", lat: 42.6489, lng: 21.0389,
    name: { tr: "Kosova", en: "Kosovo" },
    historicalNames: ["Kosovo Polje"],
    modernName: { tr: "Kosova ovasi", en: "Kosovo Polje" },
    country: { tr: "Kosova", en: "Kosovo" },
    significance: {
      tr: "Kosova Muharebesi 1389 — I. Murad sehit oldu; Osmanli Balkan hakimiyeti kuruldu",
      en: "Battle of Kosovo 1389 — Murad I killed; Ottoman Balkan hegemony established"
    },
    period: "murad", year: 1389
  },
  {
    id: 83, category: "rumeli", lat: 41.7206, lng: 26.2114,
    name: { tr: "Sirpsindig (Cirmen)", en: "Maritsa (Chernomen)" },
    historicalNames: ["Cirmen", "Chernomen"],
    modernName: { tr: "Ormenio yakini", en: "Near Ormenio" },
    country: { tr: "Yunanistan", en: "Greece" },
    significance: {
      tr: "Meric Muharebesi 1371 — Sirp ordusu imha edildi; Makedonya Osmanlilara acildi",
      en: "Battle of Maritsa 1371 — Serbian army annihilated; Macedonia opened to Ottomans"
    },
    period: "murad", year: 1371
  },
  {
    id: 84, category: "rumeli", lat: 41.9981, lng: 21.4254,
    name: { tr: "Uskup", en: "Skopje" },
    historicalNames: ["Scupi", "Uskup"],
    modernName: { tr: "Uskup", en: "Skopje" },
    country: { tr: "Kuzey Makedonya", en: "North Macedonia" },
    significance: {
      tr: "1392 civarinda fethedildi; en buyuk Vardar Makedonya sehri",
      en: "Conquered c.1392; largest Vardar Macedonia city under Ottoman rule"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 85, category: "rumeli", lat: 41.0297, lng: 21.3292,
    name: { tr: "Manastir", en: "Bitola" },
    historicalNames: ["Monastir", "Manastir"],
    modernName: { tr: "Manastir", en: "Bitola" },
    country: { tr: "Kuzey Makedonya", en: "North Macedonia" },
    significance: {
      tr: "1382-85 arasinda fethedildi; Osmanli idari/askeri merkezi",
      en: "Conquered 1382-85; Ottoman administrative/military center"
    },
    period: "murad", year: 1382
  },
  {
    id: 86, category: "rumeli", lat: 41.3442, lng: 21.5528,
    name: { tr: "Pirlepe", en: "Prilep" },
    historicalNames: ["Pirlepe", "Prilep"],
    modernName: { tr: "Prilep", en: "Prilep" },
    country: { tr: "Kuzey Makedonya", en: "North Macedonia" },
    significance: {
      tr: "Osmanli vasali Kraljevic Marko'nun merkezi",
      en: "Seat of Kraljevic Marko, Ottoman vassal"
    },
    period: "murad", year: 1371
  },
  {
    id: 87, category: "rumeli", lat: 42.6629, lng: 21.1655,
    name: { tr: "Pristine", en: "Pristina" },
    historicalNames: ["Pristine"],
    modernName: { tr: "Pristine", en: "Pristina" },
    country: { tr: "Kosova", en: "Kosovo" },
    significance: {
      tr: "Kosova vilayetinde kilit Osmanli idari merkezi",
      en: "Key Ottoman administrative center in Kosovo vilayet"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 88, category: "rumeli", lat: 42.0793, lng: 22.1802,
    name: { tr: "Kratova", en: "Kratovo" },
    historicalNames: ["Kratova", "Kratovo"],
    modernName: { tr: "Kratovo", en: "Kratovo" },
    country: { tr: "Kuzey Makedonya", en: "North Macedonia" },
    significance: {
      tr: "Osmanli altin/gumus madeni ve darphane merkezi",
      en: "Ottoman gold/silver mining and minting center"
    },
    period: "murad", year: 1380
  },
  {
    id: 89, category: "rumeli", lat: 41.7153, lng: 21.7753,
    name: { tr: "Koprulu", en: "Veles" },
    historicalNames: ["Koprulu", "Veles"],
    modernName: { tr: "Veles", en: "Veles" },
    country: { tr: "Kuzey Makedonya", en: "North Macedonia" },
    significance: {
      tr: "Vardar gecisi; Koprulu Sadrazam ailesinin isim babasi",
      en: "Vardar crossing; namesake of Koprulu Grand Vizier family"
    },
    period: "murad", year: 1380
  },

  // ═══════════════════════════════════════════════════════════
  // ANADOLU BEYLIKLERI VE SEHIRLER
  // ═══════════════════════════════════════════════════════════

  {
    id: 90, category: "beylik", lat: 37.8746, lng: 32.4932,
    name: { tr: "Konya", en: "Konya" },
    historicalNames: ["Iconium"],
    modernName: { tr: "Konya", en: "Konya" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Karamanogullari beylik baskenti; en guclu Osmanli rakibi",
      en: "Karamanid beylik capital; strongest Ottoman rival"
    },
    period: "murad", year: 1387
  },
  {
    id: 91, category: "beylik", lat: 38.7312, lng: 35.4787,
    name: { tr: "Kayseri", en: "Kayseri" },
    historicalNames: ["Caesarea Mazaca"],
    modernName: { tr: "Kayseri", en: "Kayseri" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Eretna, Karamanlilar, Osmanlilar arasinda catisma konusu; Bayezid I fethi (1397)",
      en: "Contested between Eretna, Karamanids, Ottomans; conquered by Bayezid I (1397)"
    },
    period: "bayezid", year: 1397
  },
  {
    id: 92, category: "beylik", lat: 39.7477, lng: 37.0179,
    name: { tr: "Sivas", en: "Sivas" },
    historicalNames: ["Sebasteia"],
    modernName: { tr: "Sivas", en: "Sivas" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Eretna beylik baskenti; Kadi Burhaneddin'in merkezi; Timur tarafindan tahrip edildi (1400)",
      en: "Eretna beylik capital; Kadi Burhaneddin's seat; sacked by Timur (1400)"
    },
    period: "bayezid", year: 1398
  },
  {
    id: 93, category: "beylik", lat: 40.6499, lng: 35.8353,
    name: { tr: "Amasya", en: "Amasya" },
    historicalNames: ["Amaseia"],
    modernName: { tr: "Amasya", en: "Amasya" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Onemli Osmanli sehzade (prens) egitim sehri",
      en: "Major Ottoman shahzade (princely) training city"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 94, category: "beylik", lat: 40.3167, lng: 36.5544,
    name: { tr: "Tokat", en: "Tokat" },
    historicalNames: ["Eudokias"],
    modernName: { tr: "Tokat", en: "Tokat" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ipek Yolu merkezi; Eretna sonra Osmanli hakimiyetinde",
      en: "Silk Road hub; Eretna then Ottoman domain"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 95, category: "beylik", lat: 39.9334, lng: 32.8597,
    name: { tr: "Ankara", en: "Ankara" },
    historicalNames: ["Ancyra", "Angora"],
    modernName: { tr: "Ankara", en: "Ankara" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ankara Muharebesi 1402 — Timur, Bayezid I'i yendi",
      en: "Battle of Ankara 1402 — Timur defeated Bayezid I"
    },
    period: "bayezid", year: 1402
  },
  {
    id: 96, category: "beylik", lat: 41.3887, lng: 33.7827,
    name: { tr: "Kastamonu", en: "Kastamonu" },
    historicalNames: ["Kastamonu"],
    modernName: { tr: "Kastamonu", en: "Kastamonu" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Candarogullari (Isfendiyarogullari) beylik baskenti",
      en: "Candarid (Isfendiyarid) beylik capital"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 97, category: "beylik", lat: 42.0231, lng: 35.1531,
    name: { tr: "Sinop", en: "Sinop" },
    historicalNames: ["Sinope"],
    modernName: { tr: "Sinop", en: "Sinop" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Candarogullari'nin Karadeniz limani; ilhak edilen son beylik (1461)",
      en: "Black Sea port of Candarids; last beylik annexed (1461)"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 98, category: "beylik", lat: 41.2867, lng: 36.3300,
    name: { tr: "Samsun", en: "Samsun" },
    historicalNames: ["Amisos"],
    modernName: { tr: "Samsun", en: "Samsun" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ceneviz ve Turk mahallelerine bolunen Karadeniz limani",
      en: "Black Sea port divided between Genoese and Turkish quarters"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 99, category: "beylik", lat: 39.4167, lng: 29.9833,
    name: { tr: "Kutahya", en: "Kutahya" },
    historicalNames: ["Cotyaeum"],
    modernName: { tr: "Kutahya", en: "Kutahya" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Germiyanogullari baskenti; evlilik ittifakiyla edinildi",
      en: "Germiyanid capital; acquired via marriage alliance"
    },
    period: "murad", year: 1381
  },
  {
    id: 100, category: "beylik", lat: 37.7765, lng: 29.0864,
    name: { tr: "Denizli", en: "Denizli" },
    historicalNames: ["Laodikeia yakini"],
    modernName: { tr: "Denizli", en: "Denizli" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Inancogullari, Germiyan, Osmanlilar arasinda catisma konusu",
      en: "Contested between Inancids, Germiyanids, Ottomans"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 101, category: "beylik", lat: 37.2153, lng: 28.3636,
    name: { tr: "Mugla", en: "Mugla" },
    historicalNames: ["Mobolla"],
    modernName: { tr: "Mugla", en: "Mugla" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Menteseogullari beylik merkezi",
      en: "Menteshid beylik center"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 102, category: "beylik", lat: 37.8560, lng: 27.8416,
    name: { tr: "Aydin", en: "Aydin" },
    historicalNames: ["Tralles", "Guzelhisar"],
    modernName: { tr: "Aydin", en: "Aydin" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Aydinogullari beyliginin kalbi; buyuk deniz akinlari gucu",
      en: "Aydinid beylik heart; major maritime raiding power"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 103, category: "beylik", lat: 38.4237, lng: 27.1428,
    name: { tr: "Izmir", en: "Smyrna" },
    historicalNames: ["Smyrna"],
    modernName: { tr: "Izmir", en: "Izmir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Aydinogullari/Rodos Sovalyeleri; Timur tarafindan ele gecirildi (1402)",
      en: "Aydinids/Knights of Rhodes; taken by Timur (1402)"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 104, category: "beylik", lat: 38.6191, lng: 27.4289,
    name: { tr: "Manisa", en: "Magnesia" },
    historicalNames: ["Magnesia ad Sipylum"],
    modernName: { tr: "Manisa", en: "Manisa" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Saruhanogullari baskenti; sonradan Osmanli sehzade sancagi",
      en: "Saruhanid capital; later Ottoman shahzade sanjak"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 105, category: "beylik", lat: 39.6484, lng: 27.8826,
    name: { tr: "Balikesir", en: "Balikesir" },
    historicalNames: ["Palaeokastron"],
    modernName: { tr: "Balikesir", en: "Balikesir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Karesiogullari merkezi; barissel yolla ilhak edilen ilk beylik (y.1345)",
      en: "Karesid center; first beylik peacefully annexed (c.1345)"
    },
    period: "orhan", year: 1345
  },
  {
    id: 106, category: "beylik", lat: 39.1220, lng: 27.1830,
    name: { tr: "Bergama", en: "Pergamon" },
    historicalNames: ["Pergamon"],
    modernName: { tr: "Bergama", en: "Bergama" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Antik Hellenistik baskent; Karesi beylik bolgesi",
      en: "Ancient Hellenistic capital; Karesid beylik area"
    },
    period: "orhan", year: 1345
  },
  {
    id: 107, category: "beylik", lat: 36.8969, lng: 30.7133,
    name: { tr: "Antalya", en: "Antalya" },
    historicalNames: ["Attaleia", "Adalya"],
    modernName: { tr: "Antalya", en: "Antalya" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Teke/Hamidogullari beylik limani",
      en: "Teke/Hamidid beylik port"
    },
    period: "bayezid", year: 1391
  },
  {
    id: 108, category: "beylik", lat: 37.7167, lng: 30.2833,
    name: { tr: "Burdur", en: "Burdur" },
    historicalNames: ["Burdur"],
    modernName: { tr: "Burdur", en: "Burdur" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Hamidogullari topragi; I. Murad tarafindan satin alindi (1374)",
      en: "Hamidid territory; purchased by Murad I (1374)"
    },
    period: "murad", year: 1374
  },
  {
    id: 109, category: "beylik", lat: 38.3572, lng: 31.4162,
    name: { tr: "Aksehir", en: "Aksehir" },
    historicalNames: ["Philomelion"],
    modernName: { tr: "Aksehir", en: "Aksehir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Karamanid-Osmanli siniri; Nasreddin Hoca'nin defnedildigi yer",
      en: "Karamanid-Ottoman frontier; Nasreddin Hodja's burial site"
    },
    period: "murad", year: 1381
  },
  {
    id: 110, category: "beylik", lat: 37.6776, lng: 31.7251,
    name: { tr: "Beysehir", en: "Beysehir" },
    historicalNames: ["Beysehir"],
    modernName: { tr: "Beysehir", en: "Beysehir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "I. Murad tarafindan satin alinan Hamidogullari topragi",
      en: "Hamidid territory purchased by Murad I"
    },
    period: "murad", year: 1374
  },
  {
    id: 111, category: "beylik", lat: 37.4205, lng: 31.8449,
    name: { tr: "Seydisehir", en: "Seydisehir" },
    historicalNames: ["Seydisehir"],
    modernName: { tr: "Seydisehir", en: "Seydisehir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Hamidogullari/Karamanid siniri, Toros eteklerinde",
      en: "Hamidid/Karamanid frontier in Taurus foothills"
    },
    period: "murad", year: 1381
  },
  {
    id: 112, category: "beylik", lat: 38.7507, lng: 30.5567,
    name: { tr: "Afyon", en: "Afyonkarahisar" },
    historicalNames: ["Akroenos", "Karahisarisahib"],
    modernName: { tr: "Afyonkarahisar", en: "Afyonkarahisar" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Germiyan-Osmanli kavsaklarinda stratejik kale",
      en: "Germiyanid-Ottoman crossroads strategic castle"
    },
    period: "murad", year: 1381
  },
  {
    id: 113, category: "beylik", lat: 39.0883, lng: 28.9778,
    name: { tr: "Simav", en: "Simav" },
    historicalNames: ["Synaus"],
    modernName: { tr: "Simav", en: "Simav" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Germiyan/Kutahya topragi; Osmanli alt bolgesi",
      en: "Germiyanid/Kutahya territory; Ottoman sub-district"
    },
    period: "murad", year: 1381
  },
  {
    id: 114, category: "beylik", lat: 38.2340, lng: 28.1090,
    name: { tr: "Birgi", en: "Birgi" },
    historicalNames: ["Pyrgion"],
    modernName: { tr: "Birgi (Odemis)", en: "Birgi (Odemis)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Erken Aydinogullari baskenti (1308'den itibaren); Ulu Cami (1312)",
      en: "Early Aydinid capital (from 1308); Grand Mosque (1312)"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 115, category: "beylik", lat: 38.0886, lng: 27.7325,
    name: { tr: "Tire", en: "Tire" },
    historicalNames: ["Thyeira"],
    modernName: { tr: "Tire", en: "Tire" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Zengin Aydinogullari ticaret/tekstil kasabasi",
      en: "Prosperous Aydinid commercial/textile town"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 116, category: "beylik", lat: 38.4292, lng: 27.4186,
    name: { tr: "Nif (Kemalpasa)", en: "Nymphaion" },
    historicalNames: ["Nymphaion"],
    modernName: { tr: "Kemalpasa", en: "Kemalpasa" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bizans sarayi; Saruhanogullari sonra Osmanli tarafindan fethedildi",
      en: "Byzantine palace site; conquered by Saruhanids then Ottoman"
    },
    period: "bayezid", year: 1390
  },
  {
    id: 117, category: "beylik", lat: 39.1425, lng: 34.1709,
    name: { tr: "Kirsehir", en: "Kirsehir" },
    historicalNames: ["Kirsehir"],
    modernName: { tr: "Kirsehir", en: "Kirsehir" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ahi Evran onderligi altinda Ahi teskilatinin merkezi; Osmanli devlet insasina yardim etti",
      en: "Center of Ahi brotherhood under Ahi Evran; aided Ottoman state-building"
    },
    period: "murad", year: 1381
  },
  {
    id: 118, category: "beylik", lat: 40.8747, lng: 35.4731,
    name: { tr: "Merzifon", en: "Merzifon" },
    historicalNames: ["Marsovan"],
    modernName: { tr: "Merzifon", en: "Merzifon" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Amasya sancagi; Celebi Sultan Mehmed medresesi",
      en: "Amasya sanjak; Celebi Sultan Mehmed madrasah"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 119, category: "beylik", lat: 40.5922, lng: 36.9535,
    name: { tr: "Niksar", en: "Niksar" },
    historicalNames: ["Neocaesarea"],
    modernName: { tr: "Niksar", en: "Niksar" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Danismendli sonra Eretna sonra Osmanli; Anadolu'nun en eski cami yeri",
      en: "Danishmendid then Eretna then Ottoman; oldest Anatolian mosque site"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 120, category: "beylik", lat: 40.5506, lng: 34.9556,
    name: { tr: "Corum", en: "Corum" },
    historicalNames: ["Corum"],
    modernName: { tr: "Corum", en: "Corum" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Ankara-Amasya guzergahi; Osmanli kuzey-orta sancagi",
      en: "Ankara-Amasya route; Ottoman north-central sanjak"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 121, category: "beylik", lat: 40.9167, lng: 35.9000,
    name: { tr: "Ladik", en: "Ladik" },
    historicalNames: ["Laodikeia Pontica"],
    modernName: { tr: "Ladik (Samsun)", en: "Ladik (Samsun)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Selcuklu mirasi; Osmanli Canik/Samsun idaresi",
      en: "Seljuk heritage; Ottoman Canik/Samsun administration"
    },
    period: "bayezid", year: 1392
  },
  {
    id: 122, category: "beylik", lat: 38.3552, lng: 38.3095,
    name: { tr: "Malatya", en: "Malatya" },
    historicalNames: ["Melitene"],
    modernName: { tr: "Malatya", en: "Malatya" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Dulkadirogullari dogu kalesi; Yavuz Sultan Selim zamaninda Osmanli",
      en: "Dulkadirid eastern fortress; Ottoman from Selim I"
    },
    period: "bayezid", year: 1399
  },

  // ═══════════════════════════════════════════════════════════
  // SAVAS ALANLARI (Kesin koordinatlarla)
  // ═══════════════════════════════════════════════════════════

  {
    id: 123, category: "battle", lat: 39.8100, lng: 29.6100,
    name: { tr: "Ikizce/Domanic Muharebesi", en: "Battle of Ikizce/Domanic" },
    historicalNames: ["Ikizce"],
    modernName: { tr: "Domanic (Kutahya)", en: "Domanic (Kutahya)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Erken Osmanli-Bizans carpismasi (1286); Osman'in kardesi Savci Bey sehit oldu",
      en: "Early Ottoman-Byzantine clash (1286); Osman's brother Savci Bey killed"
    },
    period: "osman", year: 1286
  },
  {
    id: 124, category: "battle", lat: 40.6833, lng: 29.4667,
    name: { tr: "Koyunhisar (Bapheus) Muharebesi", en: "Battle of Bapheus" },
    historicalNames: ["Bapheus", "Koyunhisar"],
    modernName: { tr: "Yalova yakini", en: "Near Yalova" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1302 — Osman'in Bizans sahra ordusuna karsi ilk buyuk zaferi",
      en: "1302 — Osman's first major victory over a Byzantine field army"
    },
    period: "osman", year: 1302
  },
  {
    id: 125, category: "battle", lat: 40.7800, lng: 29.3500,
    name: { tr: "Pelekanon Muharebesi", en: "Battle of Pelekanon" },
    historicalNames: ["Pelekanos"],
    modernName: { tr: "Darica yakini (Kocaeli)", en: "Near Darica (Kocaeli)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1329 — Ilk Osmanli-Imparator savasi; Orhan III. Andronikos'u yendi",
      en: "1329 — First Ottoman-Emperor battle; Orhan defeated Andronikos III"
    },
    period: "orhan", year: 1329
  },
  {
    id: 126, category: "battle", lat: 41.7167, lng: 26.2167,
    name: { tr: "Sirpsindig / Meric Muharebesi", en: "Battle of Maritsa" },
    historicalNames: ["Cirmen", "Chernomen"],
    modernName: { tr: "Ormenio yakini (Yunanistan)", en: "Near Ormenio (Greece)" },
    country: { tr: "Yunanistan", en: "Greece" },
    significance: {
      tr: "1371 — Sirp ordusunun Osmanli imhasi; Makedonya acildi",
      en: "1371 — Ottoman annihilation of Serbian army; Macedonia opened"
    },
    period: "murad", year: 1371
  },
  {
    id: 127, category: "battle", lat: 42.6600, lng: 21.0900,
    name: { tr: "Kosova Meydan Muharebesi", en: "Battle of Kosovo" },
    historicalNames: ["Kosovo Polje"],
    modernName: { tr: "Kosova ovasi", en: "Kosovo Polje (Kosovo)" },
    country: { tr: "Kosova", en: "Kosovo" },
    significance: {
      tr: "1389 — I. Murad Balkan koalisyonunu yendi; savas meydaninda sehit dustu",
      en: "1389 — Murad I defeated Balkan coalition; killed on battlefield"
    },
    period: "murad", year: 1389
  },
  {
    id: 128, category: "battle", lat: 43.7058, lng: 24.8958,
    name: { tr: "Nigbolu Muharebesi", en: "Battle of Nicopolis" },
    historicalNames: ["Nicopolis"],
    modernName: { tr: "Nikopol (Bulgaristan)", en: "Nikopol (Bulgaria)" },
    country: { tr: "Bulgaristan", en: "Bulgaria" },
    significance: {
      tr: "1396 — Bayezid buyuk Avrupali Hacli ordusunu ezdi",
      en: "1396 — Bayezid crushed major European Crusader army"
    },
    period: "bayezid", year: 1396
  },
  {
    id: 129, category: "battle", lat: 40.0500, lng: 32.9800,
    name: { tr: "Ankara (Cubuk) Muharebesi", en: "Battle of Ankara" },
    historicalNames: ["Cubuk ovasi"],
    modernName: { tr: "Cubuk ovasi (Ankara kuzeyi)", en: "Cubuk plain (N of Ankara)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1402 — Timur Bayezid I'i esir aldi; Fetret Devri basladi",
      en: "1402 — Timur captured Bayezid I; triggered Fetret Devri (Interregnum)"
    },
    period: "bayezid", year: 1402
  },

  // ═══════════════════════════════════════════════════════════
  // ISTANBUL VE CEVRES
  // ═══════════════════════════════════════════════════════════

  {
    id: 130, category: "istanbul", lat: 41.0082, lng: 28.9784,
    name: { tr: "Istanbul", en: "Constantinople" },
    historicalNames: ["Constantinople", "Konstantiniyye", "Byzantion"],
    modernName: { tr: "Istanbul", en: "Istanbul" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "1453'ten itibaren Osmanli baskenti; 1394-1453 arasi defalarca kusatildi",
      en: "Ottoman capital from 1453; besieged multiple times 1394-1453"
    },
    period: "bayezid", year: 1394
  },
  {
    id: 131, category: "istanbul", lat: 41.1433, lng: 28.4600,
    name: { tr: "Catalca", en: "Catalca" },
    historicalNames: ["Catalca"],
    modernName: { tr: "Catalca", en: "Catalca" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Istanbul'un bati yaklasimlarini koruyan stratejik savunma hatti",
      en: "Strategic defensive line guarding Constantinople's western approaches"
    },
    period: "bayezid", year: 1394
  },
  {
    id: 132, category: "istanbul", lat: 41.0773, lng: 28.2464,
    name: { tr: "Silivri", en: "Selymbria" },
    historicalNames: ["Selymbria"],
    modernName: { tr: "Silivri", en: "Silivri" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Bizans kiyi kasabasi; Trakya fetihleri sirasinda ele gecirildi",
      en: "Byzantine coastal town; captured during Thracian conquests"
    },
    period: "murad", year: 1370
  },
  {
    id: 133, category: "istanbul", lat: 41.5733, lng: 27.7650,
    name: { tr: "Vize", en: "Bizye" },
    historicalNames: ["Bizye"],
    modernName: { tr: "Vize (Kirklareli)", en: "Vize (Kirklareli)" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Antik Trak/Bizans piskoposlugu; erken Osmanli fethi",
      en: "Ancient Thracian/Byzantine bishopric; early Ottoman conquest"
    },
    period: "murad", year: 1370
  },
  {
    id: 134, category: "istanbul", lat: 40.9781, lng: 27.5115,
    name: { tr: "Tekirdag", en: "Rodosto" },
    historicalNames: ["Rodoscuk", "Rodosto", "Bisanthe"],
    modernName: { tr: "Tekirdag", en: "Tekirdag" },
    country: { tr: "Turkiye", en: "Turkey" },
    significance: {
      tr: "Osmanli limani ve surgun sehri, Marmara kiyisinda",
      en: "Ottoman port and exile city on Marmara coast"
    },
    period: "murad", year: 1362
  }
];

// ═══════════════════════════════════════════════════════════
// KATEGOR TANIMLARI
// ═══════════════════════════════════════════════════════════

const CATEGORIES = {
  migration:     { tr: "Goc Guzergahi",        en: "Migration Route",     color: "#CC8400", icon: "caravan" },
  battle:        { tr: "Savas Alani",           en: "Battle Site",         color: "#DC2626", icon: "swords" },
  core:          { tr: "Osmanli Cekirdek",      en: "Ottoman Core",        color: "#8B0000", icon: "castle" },
  bursa_region:  { tr: "Bursa-Iznik-Izmit",     en: "Bursa-Iznik-Izmit",   color: "#2563EB", icon: "city" },
  rumeli:        { tr: "Rumeli / Balkanlar",     en: "Rumelia / Balkans",   color: "#16A34A", icon: "flag" },
  beylik:        { tr: "Anadolu Beylikleri",    en: "Anatolian Beyliks",   color: "#D97706", icon: "crown" },
  istanbul:      { tr: "Istanbul ve Cevresi",   en: "Istanbul & Environs", color: "#7C3AED", icon: "dome" }
};

// ═══════════════════════════════════════════════════════════
// DONEM TANIMLARI (Timeline icin)
// ═══════════════════════════════════════════════════════════

const PERIODS = [
  { id: "pre-ottoman", tr: "On-Osmanli Donemi",    en: "Pre-Ottoman Period",  start: 1200, end: 1280, color: "#6B7280" },
  { id: "ertugrul",    tr: "Ertugrul Gazi",         en: "Ertugrul Ghazi",      start: 1230, end: 1281, color: "#CC8400" },
  { id: "osman",       tr: "Osman I (Osman Gazi)",  en: "Osman I",             start: 1299, end: 1326, color: "#8B0000" },
  { id: "orhan",       tr: "Orhan Gazi",             en: "Orhan Ghazi",         start: 1326, end: 1362, color: "#2563EB" },
  { id: "murad",       tr: "I. Murad (Hudavendigar)",en: "Murad I",             start: 1362, end: 1389, color: "#16A34A" },
  { id: "bayezid",     tr: "I. Bayezid (Yildirim)",  en: "Bayezid I",           start: 1389, end: 1402, color: "#DC2626" },
  { id: "fetret",      tr: "Fetret Devri",           en: "Interregnum",         start: 1402, end: 1413, color: "#6B7280" },
  { id: "celebi",      tr: "Celebi Mehmed",          en: "Mehmed I",            start: 1413, end: 1421, color: "#7C3AED" }
];
