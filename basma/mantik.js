/* Basma! — saf hedef hesabı.
   Ekran ve ses oyun.js içindedir. Seviye metinlerini levels.js'ten düzenleyin. */
var BASMA_MANTIK = (function () {
  "use strict";

  var KOSE = { ucgen: 3, kare: 4, besgen: 5, altigen: 6, daire: 0 };

  function ikonlar(seviye) {
    if (!seviye || seviye.ikon == null || seviye.ikon === "") return [];
    return Array.isArray(seviye.ikon) ? seviye.ikon.slice() : [seviye.ikon];
  }

  function esik(n) {
    n = n | 0;
    if (n < 0) n = 0;
    return { min: n, max: n };
  }

  function temel(seviye, bellek) {
    var tur = seviye.tur;
    if (tur === "son") return esik(bellek.sonBas || 0);
    if (tur === "hatirlanan") return esik(bellek.akil == null ? 0 : bellek.akil);
    if (tur === "kelime") {
      var soz = String(seviye.sayilan || "").trim();
      return esik(soz ? soz.split(/\s+/).length : 0);
    }
    if (tur === "kose") {
      var liste = ikonlar(seviye);
      var toplam = 0;
      for (var i = 0; i < liste.length; i++) toplam += KOSE[liste[i]] || 0;
      return esik(toplam);
    }
    if (tur === "saat") return esik(seviye.saat || 0);
    if (tur === "gorulen") {
      var gor = bellek.gorulen || {};
      return esik(gor[seviye.sayIkon] || 0);
    }
    if (typeof seviye.az === "number" && seviye.az > 0) {
      return { min: 0, max: seviye.az - 1 };
    }
    return esik(seviye.tam || 0);
  }

  function hedefCoz(seviye, bellek) {
    var sonuc = temel(seviye, bellek || {});
    var liste = ikonlar(seviye);
    var kurallar = (bellek && bellek.kurallar) || [];
    for (var i = 0; i < kurallar.length; i++) {
      var kural = kurallar[i];
      var adet = 0;
      for (var j = 0; j < liste.length; j++) if (liste[j] === kural.ikon) adet++;
      if (!adet) continue;
      var n = typeof kural.adet === "number" ? kural.adet : 1;
      if (kural.ne === "hep") sonuc = esik(n);
      else if (kural.ne === "asla") sonuc = esik(0);
      else if (kural.ne === "cift") sonuc = adet % 2 === 0 ? esik(n) : esik(0);
      else if (kural.ne === "tek") sonuc = adet % 2 === 1 ? esik(n) : esik(0);
    }
    if (sonuc.min < 0) sonuc.min = 0;
    if (sonuc.max < sonuc.min) sonuc.max = sonuc.min;
    return sonuc;
  }

  function kuralEkle(kurallar, seviye) {
    var gelen = seviye && seviye.yeniKural;
    var liste = (kurallar || []).slice();
    if (!gelen || !gelen.ikon) return liste;
    liste = liste.filter(function (k) { return k.ikon !== gelen.ikon; });
    liste.push({
      ikon: gelen.ikon,
      ne: gelen.ne,
      adet: typeof gelen.adet === "number" ? gelen.adet : 1,
      yazi: gelen.yazi || ""
    });
    return liste;
  }

  return {
    KOSE: KOSE,
    ikonlar: ikonlar,
    hedefCoz: hedefCoz,
    kuralEkle: kuralEkle
  };
})();
