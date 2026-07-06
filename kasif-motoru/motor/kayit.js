/* ============================================================
   Kâşif Motoru — kayit.js
   İlerleme kaydı (localStorage). SCORM'un lesson_location eşdeğeri.
   LMS varsa SCORM da yazılır (sahne.js), LMS yoksa yalnız localStorage
   → PWA/offline'da da kaldığı Diyar'dan devam çalışır.
   ============================================================ */
window.KM = window.KM || {};

KM.Kayit = (function () {
  "use strict";
  function anahtar(paketId) { return 'km_ilerleme_' + paketId; }

  function oku(paketId) {
    try {
      var ham = localStorage.getItem(anahtar(paketId));
      return ham ? JSON.parse(ham) : { sonBolum: 0, skorlar: {}, hatalar: {} };
    } catch (e) {
      return { sonBolum: 0, skorlar: {}, hatalar: {} };
    }
  }

  function yaz(paketId, veri) {
    try { localStorage.setItem(anahtar(paketId), JSON.stringify(veri)); } catch (e) {}
  }

  function bolumBitir(paketId, bolumIndex, skor, hataHaritasi) {
    var v = oku(paketId);
    if (bolumIndex + 1 > v.sonBolum) v.sonBolum = bolumIndex + 1;
    v.skorlar['b' + bolumIndex] = skor;
    // kazanım bazlı hata sayacı birikir (öğretmen paneli okur)
    for (var k in hataHaritasi) {
      if (!hataHaritasi.hasOwnProperty(k)) continue;
      v.hatalar[k] = (v.hatalar[k] || 0) + hataHaritasi[k];
    }
    yaz(paketId, v);
    return v;
  }

  function sifirla(paketId) {
    try { localStorage.removeItem(anahtar(paketId)); } catch (e) {}
  }

  return { oku: oku, yaz: yaz, bolumBitir: bolumBitir, sifirla: sifirla };
})();
