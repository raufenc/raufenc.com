/* ============================================================
   Bak Bak — ses motoru (WebAudio ile sentezlenir, ses dosyası GEREKMEZ).
   Doğru = iki notalı çınlama · Yanlış = kısa tok vızıltı · Kazandı = arpej.
   LMS/çevrimdışı fark etmeksizin çalışır; hata verirse sessizce susar.
   ============================================================ */
window.BB = window.BB || {};
BB.Ses = (function () {
  "use strict";
  var ctx = null, kapali = false;

  function init() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
  }

  function ton(freq, gecikme, sure, tip, kazanc) {
    if (!ctx || kapali) return;
    try {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = tip || "sine"; o.frequency.value = freq;
      var t = ctx.currentTime + (gecikme || 0);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(kazanc || 0.2, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + sure + 0.03);
    } catch (e) {}
  }

  return {
    init: init,
    get kapali() { return kapali; },
    sustur: function (b) { kapali = !!b; if (!kapali) init(); },
    dogru: function () { init(); ton(660, 0, 0.12, "sine", 0.22); ton(990, 0.09, 0.16, "sine", 0.2); },
    yanlis: function () { init(); ton(180, 0, 0.18, "square", 0.15); ton(130, 0.07, 0.2, "square", 0.13); },
    kazandi: function () { init(); [523, 659, 784, 1046].forEach(function (f, i) { ton(f, i * 0.12, 0.24, "triangle", 0.2); }); },
    tik: function () { init(); ton(440, 0, 0.05, "sine", 0.08); }
  };
})();
