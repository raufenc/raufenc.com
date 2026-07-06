/* ============================================================
   Kâşif Motoru — loop.js
   Sabit-adımlı (fixed timestep) oyun döngüsü.
   Fizik 60Hz determinist çalışır; ekran ne verirse render olur.
   "Spiral of death" koruması: kare başına en fazla 5 fizik adımı.
   ============================================================ */
window.KM = window.KM || {};

KM.Loop = (function () {
  "use strict";
  var STEP = 1 / 60;      // fizik adımı (saniye)
  var acc = 0, last = 0, raf = null, calisiyor = false;
  var guncelleFn = null, cizFn = null;

  function tik(now) {
    if (!calisiyor) return;
    var dt = (now - last) / 1000;
    last = now;
    if (dt > 0.25) dt = 0.25;   // sekme koruması (sekme arka plana alındıysa)
    acc += dt;

    var n = 0;
    while (acc >= STEP && n < 5) {
      guncelleFn(STEP);
      acc -= STEP;
      n++;
    }
    if (n >= 5) acc = 0;        // birikimi sıfırla — yavaşlamayı önle

    cizFn();
    raf = requestAnimationFrame(tik);
  }

  function baslat(guncelle, ciz) {
    guncelleFn = guncelle;
    cizFn = ciz;
    calisiyor = true;
    last = performance.now();
    raf = requestAnimationFrame(tik);
  }

  function dur() {
    calisiyor = false;
    if (raf) cancelAnimationFrame(raf);
  }

  return { baslat: baslat, dur: dur, STEP: STEP };
})();
