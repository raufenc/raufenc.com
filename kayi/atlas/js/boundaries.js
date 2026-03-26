/* ============================================================
   Kayı Tarih Atlası — Basitleştirilmiş Sınırlar (GeoJSON)
   Osmanlı, Beylik ve Bizans dönem sınırları
   ============================================================ */

const BOUNDARIES = {

  // ── Osmanlı sınırları dönem bazlı ──
  ottoman: [
    {
      period: "osman", year: 1300,
      name: { tr: "Osmanlı Beyliği (1300)", en: "Ottoman Principality (1300)" },
      color: "#8B0000", opacity: 0.2,
      coords: [
        [40.3, 29.4], [40.3, 30.6], [39.7, 30.6], [39.7, 29.4]
      ]
    },
    {
      period: "orhan", year: 1340,
      name: { tr: "Osmanlı Devleti (1340)", en: "Ottoman State (1340)" },
      color: "#8B0000", opacity: 0.2,
      coords: [
        [41.0, 28.5], [41.0, 31.5], [40.5, 31.5], [40.5, 32.0],
        [39.5, 32.0], [39.5, 29.0], [39.7, 28.5], [40.2, 28.0],
        [40.8, 28.3]
      ]
    },
    {
      period: "murad", year: 1380,
      name: { tr: "Osmanlı Devleti (1380)", en: "Ottoman State (1380)" },
      color: "#8B0000", opacity: 0.15,
      coords: [
        // Anadolu
        [41.1, 28.0], [41.1, 32.0], [40.0, 32.0], [39.5, 31.0],
        [39.3, 30.0], [39.5, 28.5], [40.0, 27.5], [40.5, 27.5],
        // Boğaz
        [41.1, 28.0],
        // Rumeli (ayrı polygon olacak, basitleştirilmiş)
      ]
    },
    {
      period: "murad", year: 1385,
      name: { tr: "Osmanlı Rumeli (1385)", en: "Ottoman Rumelia (1385)" },
      color: "#16A34A", opacity: 0.15,
      coords: [
        [40.4, 26.0], [42.5, 24.0], [43.0, 23.0], [42.0, 21.0],
        [41.0, 21.5], [40.5, 23.0], [40.4, 24.5], [40.4, 26.0]
      ]
    },
    {
      period: "bayezid", year: 1400,
      name: { tr: "Osmanlı Devleti (1400)", en: "Ottoman State (1400)" },
      color: "#8B0000", opacity: 0.12,
      coords: [
        // Büyük Anadolu
        [42.0, 27.0], [41.5, 33.0], [41.0, 36.0], [40.0, 37.5],
        [39.0, 38.0], [37.0, 36.0], [36.5, 31.0], [37.0, 28.0],
        [38.0, 27.0], [39.5, 27.5], [40.0, 27.0], [41.0, 27.5]
      ]
    },
    {
      period: "bayezid", year: 1400,
      name: { tr: "Osmanlı Rumeli (1400)", en: "Ottoman Rumelia (1400)" },
      color: "#16A34A", opacity: 0.12,
      coords: [
        [40.4, 26.0], [44.2, 23.0], [44.0, 28.0], [43.5, 28.5],
        [42.5, 27.0], [41.5, 26.0], [40.5, 26.5]
      ]
    }
  ],

  // ── Anadolu Beylikleri ──
  beyliks: [
    {
      id: "karamanid",
      name: { tr: "Karamanoğulları", en: "Karamanids" },
      color: "#EF4444", opacity: 0.15,
      coords: [
        [39.0, 31.5], [38.5, 34.5], [37.0, 34.5], [36.5, 32.0],
        [37.0, 31.0], [38.0, 30.5]
      ],
      active: { start: 1256, end: 1487 }
    },
    {
      id: "germiyanid",
      name: { tr: "Germiyanoğulları", en: "Germiyanids" },
      color: "#8B5CF6", opacity: 0.15,
      coords: [
        [39.8, 29.0], [39.8, 30.5], [38.5, 31.0], [38.0, 29.5],
        [38.5, 28.5]
      ],
      active: { start: 1300, end: 1429 }
    },
    {
      id: "aydinid",
      name: { tr: "Aydınoğulları", en: "Aydinids" },
      color: "#F59E0B", opacity: 0.15,
      coords: [
        [38.5, 27.0], [38.5, 28.5], [37.5, 28.5], [37.5, 27.0]
      ],
      active: { start: 1308, end: 1426 }
    },
    {
      id: "saruhanid",
      name: { tr: "Saruhanoğulları", en: "Saruhanids" },
      color: "#10B981", opacity: 0.15,
      coords: [
        [39.0, 27.0], [39.0, 28.0], [38.5, 28.0], [38.5, 27.0]
      ],
      active: { start: 1313, end: 1410 }
    },
    {
      id: "menteshid",
      name: { tr: "Menteşeoğulları", en: "Menteshids" },
      color: "#06B6D4", opacity: 0.15,
      coords: [
        [37.5, 27.5], [37.5, 29.0], [36.5, 29.0], [36.5, 27.5]
      ],
      active: { start: 1261, end: 1424 }
    },
    {
      id: "karesid",
      name: { tr: "Karesioğulları", en: "Karesids" },
      color: "#EC4899", opacity: 0.15,
      coords: [
        [40.0, 27.0], [40.0, 28.5], [39.0, 28.5], [39.0, 27.0]
      ],
      active: { start: 1297, end: 1360 }
    },
    {
      id: "hamidid",
      name: { tr: "Hamidoğulları", en: "Hamidids" },
      color: "#F97316", opacity: 0.15,
      coords: [
        [38.5, 30.0], [38.0, 31.5], [37.0, 31.5], [36.5, 30.5],
        [37.5, 29.5]
      ],
      active: { start: 1280, end: 1423 }
    },
    {
      id: "candarid",
      name: { tr: "Candaroğulları", en: "Candarids" },
      color: "#84CC16", opacity: 0.15,
      coords: [
        [42.0, 33.0], [42.0, 36.0], [41.0, 36.0], [41.0, 33.0]
      ],
      active: { start: 1292, end: 1461 }
    },
    {
      id: "eretna",
      name: { tr: "Eretna Beyliği", en: "Eretna Beylik" },
      color: "#A855F7", opacity: 0.15,
      coords: [
        [40.5, 35.0], [40.5, 38.0], [38.5, 38.0], [38.5, 35.0]
      ],
      active: { start: 1335, end: 1381 }
    }
  ],

  // ── Bizans İmparatorluğu ──
  byzantine: [
    {
      year: 1300,
      name: { tr: "Bizans İmparatorluğu (1300)", en: "Byzantine Empire (1300)" },
      color: "#6A0DAD", opacity: 0.12,
      coords: [
        // Bithynia
        [41.2, 28.5], [41.2, 30.5], [40.0, 30.5], [40.0, 28.5],
      ]
    },
    {
      year: 1300,
      name: { tr: "Bizans Trakya (1300)", en: "Byzantine Thrace (1300)" },
      color: "#6A0DAD", opacity: 0.12,
      coords: [
        [41.0, 26.0], [42.0, 26.0], [42.0, 29.5], [41.0, 29.5]
      ]
    },
    {
      year: 1350,
      name: { tr: "Bizans İmparatorluğu (1350)", en: "Byzantine Empire (1350)" },
      color: "#6A0DAD", opacity: 0.1,
      coords: [
        // Sadece İstanbul çevresi
        [41.3, 28.5], [41.3, 29.5], [40.8, 29.5], [40.8, 28.5]
      ]
    }
  ]
};
