/* ============================================================
   BOŞ İÇERİK ŞABLONU — yeni bir Diyar (ders) eklemek için buradan başla.
   1) Bu dosyayı kopyala:  icerik/<ders-adi>.js
   2) Aşağıdaki alanları doldur (motor dosyalarına DOKUNMA).
   3) index.html'i şu adresle aç:  ?paket=<ders-adi>
   ------------------------------------------------------------
   Segment tipleri:
     kosu        → düz koşu + ışık taneleri (öğrenme yok, ritim)
     dogruGecit  → 2-3 levhadan doğru cevaba zıpla, kapı açılır
     kelimeKopru → harf/hece taşlarına DOĞRU SIRAYLA basarak köprü kur
     isikKapisi  → doğru feneri yak, bölüm biter (bölüm kilidi/checkpoint)
   Her öğrenme-segmentine bir kanonId yaz (öğretmen raporu izlenebilirliği).
   ============================================================ */
window.PAKET = {
  meta: {
    id: "ornek-diyar",              // SCORM/URL kimliği (klasör-güvenli)
    ad: "Örnek Diyar",              // HUD başlığı
    ders: "Ders adı", sinif: "5-8", unite: "Ünite X",
    surum: "1.0.0",
    kahraman: "kandil",             // kandil | (ileride: alperen | katip | nur | timur)
    kok: "",                        // ses/atlas yolu ön eki, ör. "varliklar/ornek-diyar/"
    gecmeEsigi: 70                  // passed eşiği (%)
  },

  bolumler: [
    {
      id: "b0", ad: "Bölüm adı",
      kazanim: "DERS.SINIF.NO — kazanım metni",
      segmentler: [
        { tip: "kosu", uzunluk: 600, jetonlar: [
          { x: 160, deger: "kelime1" }, { x: 380, deger: "kelime2" }
        ] },

        { tip: "dogruGecit",
          soru: { metin: "Soru?", ses: null },     // ses: "ses/soru.mp3" (kok ile birleşir)
          secenekler: [
            { etiket: "Doğru",   dogru: true,  kanonId: "K-001" },
            { etiket: "Yanlış1", dogru: false, kanonId: "K-002" },
            { etiket: "Yanlış2", dogru: false, kanonId: "K-003" }
          ] },

        { tip: "kelimeKopru",
          hedef: { kelime: "HEDEF", anlam: "anlamı", ses: null },
          taslar: ["A", "B", "C"],                 // doğru sıra = bu sıra
          celeldirici: ["X", "Y"],                 // yanlış taşlar
          kanonId: "K-010" },

        { tip: "isikKapisi",
          soru: { metin: "Bölümü bitiren soru?", ses: null },
          fenerler: [
            { etiket: "Doğru",   dogru: true,  kanonId: "K-020" },
            { etiket: "Yanlış1", dogru: false, kanonId: "K-021" },
            { etiket: "Yanlış2", dogru: false, kanonId: "K-022" }
          ] }
      ]
    }
    // b1, b2 ... her biri bir kazanım
  ]
};
