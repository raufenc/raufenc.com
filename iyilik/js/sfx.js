// Çok hafif dokunma sesleri: dosya yok, tarayıcıda üretilir (Web Audio). Büyükler bölümünden kapatılabilir.
import { state } from './store.js';
let ac = null, master = null;
function ctx() {
  if (ac) return ac;
  const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
  ac = new C(); master = ac.createGain(); master.gain.value = 0.5; master.connect(ac.destination);
  return ac;
}
function tone(f0, f1, dur, vol, type = 'sine', at = 0) {
  const a = ctx(); if (!a) return;
  if (a.state === 'suspended') a.resume();
  const t = a.currentTime + at, o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
}
const on = () => state.sfx !== false;
export const sfx = {
  tap() { if (on()) tone(720, 520, 0.07, 0.05); },             // yumuşak "tık"
  key() { if (on()) tone(560, 420, 0.06, 0.06, 'triangle'); },   // tuş takımı
  fill() { if (on()) tone(380, 820, 0.11, 0.06); },              // boya kovası: kabarcık
  good() { if (on()) { tone(660, 660, 0.16, 0.05); tone(990, 990, 0.22, 0.045, 'sine', 0.09); } },
  soft() { if (on()) tone(330, 260, 0.12, 0.04, 'triangle'); },  // "bir daha bakalım": sert değil
  chime() { if (on()) [784, 988, 1175, 1568].forEach((f, i) => tone(f, f, 0.5, 0.035, 'sine', i * 0.09)); },
};
