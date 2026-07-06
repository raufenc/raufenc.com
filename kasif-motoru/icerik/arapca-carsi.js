/* ============================================================
   İÇERİK PAKETİ — Çarşı Diyarı  (İHO 7. Sınıf Arapça · Ünite 3)
   Rauf yeni ders eklerken SADECE bu tür bir dosya yazar; motora dokunmaz.
   Her DİYAR = 1 ünite, her BÖLÜM = 1 kazanım, her öğrenme-segmenti bir kanonId taşır.
   Segment tipleri (motor registry'si): kosu | dogruGecit | kelimeKopru | isikKapisi
   ============================================================ */
window.PAKET = {
  meta: {
    id: "arapca-carsi",
    ad: "Çarşı Diyarı",
    ders: "Arapça", sinif: "İHO 7", unite: "Ünite 3 — Çarşı / Yön / Hastane",
    surum: "1.0.0",
    kahraman: "kandil",
    kok: "",                    // varlık yolu ön eki (ses/atlas). Şimdilik boş.
    gecmeEsigi: 70,             // cmi.core.lesson_status='passed' eşiği (%)
    renkNot: "Sıcak Osmanlı paleti — motor varsayılanı kullanılıyor."
  },

  bolumler: [
    /* ---------- BÖLÜM 0 : Çarşı Sokağı ---------- */
    {
      id: "b0", ad: "Çarşı Sokağı",
      kazanim: "AR.7.3.2 — çarşı kelimelerini tanıma",
      segmentler: [
        { tip: "kosu", uzunluk: 620, jetonlar: [
          { x: 160, deger: "صابون" }, { x: 380, deger: "سوق" }
        ] },
        { tip: "dogruGecit",
          soru: { metin: "صابون = ?", ses: null },
          secenekler: [
            { etiket: "soap",  dogru: true,  kanonId: "AR73-K012" },
            { etiket: "bread", dogru: false, kanonId: "AR73-K045" },
            { etiket: "water", dogru: false, kanonId: "AR73-K031" }
          ] },
        { tip: "kelimeKopru",
          hedef: { kelime: "مكتب", anlam: "yazı masası", ses: null },
          taslar: ["مَ", "كْ", "تَ", "بْ"],
          celeldirici: ["بِ", "سَ", "لْ"],
          kanonId: "AR73-K077" },
        { tip: "kosu", uzunluk: 460 },
        { tip: "isikKapisi",
          soru: { metin: "'okul' hangisi?", ses: null },
          fenerler: [
            { etiket: "مدرسة",  dogru: true,  kanonId: "AR73-K003" },
            { etiket: "مستشفى", dogru: false, kanonId: "AR73-K004" },
            { etiket: "سوق",    dogru: false, kanonId: "AR73-K005" }
          ] }
      ]
    },

    /* ---------- BÖLÜM 1 : Yön Diyarı ---------- */
    {
      id: "b1", ad: "Yön Diyarı",
      kazanim: "AR.7.3.3 — yön ifadelerini kullanma",
      segmentler: [
        { tip: "kosu", uzunluk: 560, jetonlar: [
          { x: 150, deger: "يمين" }, { x: 360, deger: "يسار" }
        ] },
        { tip: "dogruGecit",
          soru: { metin: "sağ = ?", ses: null },
          secenekler: [
            { etiket: "يمين", dogru: true,  kanonId: "AR73-K101" },
            { etiket: "يسار", dogru: false, kanonId: "AR73-K102" },
            { etiket: "أمام", dogru: false, kanonId: "AR73-K103" }
          ] },
        { tip: "dogruGecit",
          soru: { metin: "ön = ?", ses: null },
          secenekler: [
            { etiket: "أمام", dogru: true,  kanonId: "AR73-K103" },
            { etiket: "خلف",  dogru: false, kanonId: "AR73-K104" },
            { etiket: "يمين", dogru: false, kanonId: "AR73-K101" }
          ] },
        { tip: "kelimeKopru",
          hedef: { kelime: "يسار", anlam: "sol", ses: null },
          taslar: ["يَ", "سَ", "ا", "رْ"],
          celeldirici: ["شْ", "لْ", "نْ"],
          kanonId: "AR73-K102" },
        { tip: "isikKapisi",
          soru: { metin: "'arka' hangisi?", ses: null },
          fenerler: [
            { etiket: "خلف",  dogru: true,  kanonId: "AR73-K104" },
            { etiket: "أمام", dogru: false, kanonId: "AR73-K103" },
            { etiket: "يمين", dogru: false, kanonId: "AR73-K101" }
          ] }
      ]
    },

    /* ---------- BÖLÜM 2 : Hastane Yolu ---------- */
    {
      id: "b2", ad: "Hastane Yolu",
      kazanim: "AR.7.3.5 — hastanede sorma-söyleme",
      segmentler: [
        { tip: "kosu", uzunluk: 560, jetonlar: [
          { x: 150, deger: "مستشفى" }, { x: 370, deger: "طبيب" }
        ] },
        { tip: "dogruGecit",
          soru: { metin: "hastane = ?", ses: null },
          secenekler: [
            { etiket: "مستشفى", dogru: true,  kanonId: "AR73-K201" },
            { etiket: "مدرسة",  dogru: false, kanonId: "AR73-K003" },
            { etiket: "سوق",    dogru: false, kanonId: "AR73-K005" }
          ] },
        { tip: "dogruGecit",
          soru: { metin: "doktor = ?", ses: null },
          secenekler: [
            { etiket: "طبيب",    dogru: true,  kanonId: "AR73-K202" },
            { etiket: "صيدلية",  dogru: false, kanonId: "AR73-K203" },
            { etiket: "معلم",    dogru: false, kanonId: "AR73-K204" }
          ] },
        { tip: "kelimeKopru",
          hedef: { kelime: "طبيب", anlam: "doktor", ses: null },
          taslar: ["طَ", "بِ", "يْ", "بْ"],
          celeldirici: ["تَ", "دْ", "ثْ"],
          kanonId: "AR73-K202" },
        { tip: "isikKapisi",
          soru: { metin: "'eczane' hangisi?", ses: null },
          fenerler: [
            { etiket: "صيدلية",  dogru: true,  kanonId: "AR73-K203" },
            { etiket: "مستشفى", dogru: false, kanonId: "AR73-K201" },
            { etiket: "مدرسة",  dogru: false, kanonId: "AR73-K003" }
          ] }
      ]
    }
  ]
};
