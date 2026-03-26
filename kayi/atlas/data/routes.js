/* ============================================================
   Kayı Tarih Atlası — Göç & Fetih Güzergahları
   ============================================================ */

const ROUTES = [
  {
    id: "kayi-migration",
    name: { tr: "Kayı Göç Güzergâhı (Orta Asya → Söğüt)", en: "Kayı Migration Route (Central Asia → Söğüt)" },
    color: "#CC8400",
    weight: 3,
    dashArray: "8, 6",
    animated: true,
    points: [
      [37.6639, 62.1592],  // Merv
      [39.7747, 64.4286],  // Buhara
      [39.6542, 66.9597],  // Semerkand
      [36.2136, 58.7960],  // Horasan
      [38.0802, 46.2919],  // Tebriz
      [38.7486, 42.4739],  // Ahlat
      [39.9200, 44.0500],  // Sürmeli Çukur
      [39.9043, 41.2675],  // Erzurum
      [39.7500, 39.4880],  // Erzincan
      [36.2021, 37.1343],  // Halep
      [35.8975, 38.4808],  // Caber Kalesi
      [39.4300, 32.4800],  // Karacadağ
      [40.0333, 30.1833]   // Söğüt
    ]
  },
  {
    id: "anatolian-expansion",
    name: { tr: "Osmanlı Anadolu Genişlemesi", en: "Ottoman Anatolian Expansion" },
    color: "#8B0000",
    weight: 2,
    dashArray: "4, 4",
    animated: false,
    points: [
      [40.0333, 30.1833],  // Söğüt
      [40.1828, 29.0665],  // Bursa
      [40.4292, 29.7208],  // İznik
      [40.7656, 29.9408],  // İzmit
      [40.8439, 31.1566],  // Düzce
      [40.7356, 31.6089],  // Bolu
      [40.6013, 33.6134],  // Çankırı
      [39.9334, 32.8597],  // Ankara
      [39.7477, 37.0179]   // Sivas
    ]
  },
  {
    id: "rumeli-expansion",
    name: { tr: "Osmanlı Rumeli Genişlemesi", en: "Ottoman Rumelian Expansion" },
    color: "#16A34A",
    weight: 2,
    dashArray: "4, 4",
    animated: false,
    points: [
      [40.4103, 26.6706],  // Gelibolu
      [41.3514, 26.4972],  // Dimetoka
      [41.6772, 26.5558],  // Edirne
      [42.1500, 24.7500],  // Filibe
      [42.6977, 23.3219],  // Sofya
      [43.3209, 21.8958],  // Niş
      [42.6489, 21.0389]   // Kosova
    ]
  },
  {
    id: "rumeli-south",
    name: { tr: "Rumeli Güney Hattı", en: "Southern Rumelia Line" },
    color: "#16A34A",
    weight: 2,
    dashArray: "4, 4",
    animated: false,
    points: [
      [41.6772, 26.5558],  // Edirne
      [41.0858, 23.5478],  // Serez
      [40.6401, 22.9444],  // Selanik
      [41.9981, 21.4254]   // Üsküp
    ]
  },
  {
    id: "danube-line",
    name: { tr: "Tuna Hattı", en: "Danube Line" },
    color: "#2563EB",
    weight: 2,
    dashArray: "4, 4",
    animated: false,
    points: [
      [42.6977, 23.3219],  // Sofya
      [43.0757, 25.6172],  // Tırnova
      [44.1167, 27.2667],  // Silistre
      [43.2141, 27.9147],  // Varna
      [43.7022, 24.8936],  // Niğbolu
      [43.9900, 22.8825]   // Vidin
    ]
  }
];
