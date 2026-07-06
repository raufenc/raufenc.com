/* ============================================================
   Kâşif Motoru — audio.js
   Tek AudioContext, ilk dokunuşta lazy init (mevcut "Ses" deseni).
   WebAudio ile üretilen kısa bip'ler + isteğe bağlı kelime .mp3 çalma.
   mp3 dosyası yoksa sessizce geçer — bip yine geri bildirim verir.
   ============================================================ */
window.KM = window.KM || {};

KM.Ses = (function () {
  "use strict";
  var ctx = null, kapali = false;
  var mp3Cache = {};

  function init() {
    try {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx && ctx.state === 'suspended') ctx.resume();
    } catch (e) {}
  }

  function bip(freq, sure, tip, hacim) {
    if (kapali) return;
    init();
    if (!ctx) return;
    try {
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = tip || 'sine';
      o.frequency.value = freq;
      o.connect(g); g.connect(ctx.destination);
      var t = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(hacim || 0.18, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (sure || 0.15));
      o.start(t);
      o.stop(t + (sure || 0.15) + 0.03);
    } catch (e) {}
  }

  function dogru()  { bip(660, 0.10, 'sine'); setTimeout(function () { bip(880, 0.16, 'sine'); }, 90); }
  function yanlis() { bip(190, 0.20, 'square', 0.14); }
  function zipla()  { bip(520, 0.07, 'triangle', 0.10); }
  function jeton()  { bip(1040, 0.06, 'triangle', 0.10); }
  function kapi()   { bip(440, 0.12); setTimeout(function () { bip(660, 0.12); }, 110);
                      setTimeout(function () { bip(880, 0.20); }, 230); }
  function dus()    { bip(320, 0.10, 'sawtooth', 0.10); setTimeout(function(){ bip(240,0.14,'sawtooth',0.10); }, 80); }

  // Kelime seslendirmesi (içerikteki 'ses' alanı). Dosya yoksa sessiz.
  function calMp3(url) {
    if (kapali || !url) return;
    try {
      var a = mp3Cache[url];
      if (!a) { a = new Audio(url); mp3Cache[url] = a; }
      a.currentTime = 0;
      var p = a.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }

  function sustur(v) { kapali = !!v; }

  return {
    init: init, bip: bip,
    dogru: dogru, yanlis: yanlis, zipla: zipla, jeton: jeton, kapi: kapi, dus: dus,
    calMp3: calMp3, sustur: sustur,
    get kapali() { return kapali; }
  };
})();
