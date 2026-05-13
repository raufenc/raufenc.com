// Basit Web Audio efektleri — harici dosya yok
(function (global) {
  'use strict';

  let ctx = null;
  function ensure() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (C) ctx = new C();
    }
    return ctx;
  }

  function tone(freq, dur, type, vol) {
    const c = ensure();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.value = 0.0001;
    osc.connect(gain).connect(c.destination);
    const t0 = c.currentTime;
    gain.gain.exponentialRampToValueAtTime(vol || 0.2, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function dogru() {
    tone(660, 0.12, 'triangle', 0.25);
    setTimeout(() => tone(880, 0.18, 'triangle', 0.25), 120);
    setTimeout(() => tone(1320, 0.22, 'triangle', 0.22), 280);
  }

  function yanlis() {
    tone(200, 0.18, 'sawtooth', 0.18);
    setTimeout(() => tone(140, 0.25, 'sawtooth', 0.18), 160);
  }

  function tiklama() {
    tone(440, 0.05, 'square', 0.12);
  }

  function basari() {
    tone(523, 0.15, 'triangle', 0.25);
    setTimeout(() => tone(659, 0.15, 'triangle', 0.25), 150);
    setTimeout(() => tone(784, 0.15, 'triangle', 0.25), 300);
    setTimeout(() => tone(1047, 0.3, 'triangle', 0.25), 450);
  }

  global.SFX = { dogru, yanlis, tiklama, basari };
})(window);
