// ====== SES EFEKTLERİ SİSTEMİ (Web Audio API) ======
const AudioFX = {
  _ctx: null,
  _enabled: true,

  init() {
    this._enabled = localStorage.getItem('5sinif_sound') !== 'off';
  },

  _getCtx() {
    if (!this._ctx) {
      try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; }
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  toggle() {
    this._enabled = !this._enabled;
    localStorage.setItem('5sinif_sound', this._enabled ? 'on' : 'off');
    if (this._enabled) this.play('click');
    return this._enabled;
  },

  isEnabled() { return this._enabled; },

  play(name) {
    if (!this._enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = this._getCtx();
    if (!ctx) return;
    const sounds = {
      correct:   { freq: [523, 659, 784], dur: 0.15, type: 'sine', vol: 0.3 },
      wrong:     { freq: [200, 180], dur: 0.2, type: 'square', vol: 0.15 },
      levelup:   { freq: [523, 659, 784, 1047], dur: 0.2, type: 'sine', vol: 0.35 },
      badge:     { freq: [784, 988, 1175], dur: 0.18, type: 'sine', vol: 0.3 },
      complete:  { freq: [523, 659, 784, 1047, 1319], dur: 0.15, type: 'sine', vol: 0.3 },
      click:     { freq: [800], dur: 0.05, type: 'sine', vol: 0.1 },
      streak:    { freq: [440, 554, 659, 880], dur: 0.12, type: 'sawtooth', vol: 0.2 },
      mission:   { freq: [659, 784, 988], dur: 0.15, type: 'sine', vol: 0.25 },
      celebrate: { freq: [523, 659, 784, 1047, 1319, 1568], dur: 0.12, type: 'sine', vol: 0.3 },
    };
    const s = sounds[name];
    if (!s) return;
    const now = ctx.currentTime;
    s.freq.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = s.type;
      osc.frequency.value = f;
      gain.gain.setValueAtTime(s.vol, now + i * s.dur);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * s.dur + s.dur * 1.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * s.dur);
      osc.stop(now + i * s.dur + s.dur * 2);
    });
  }
};

AudioFX.init();
window.AudioFX = AudioFX;
