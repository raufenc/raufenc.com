// ===== SoundFX: Oyun Ses Efektleri (Web Audio API) =====
// Mevcut effects.js'deki playSound pattern'ini genisletir.
// Tum sesler synthesized — MP3 dosyasi yok.

let _ctx = null;
function getCtx() {
    if (!_ctx) {
        _ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return _ctx;
}

function osc(freq, type, duration, startTime = 0, gain = 0.12) {
    const ctx = getCtx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime + startTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
    o.connect(g).connect(ctx.destination);
    o.start(ctx.currentTime + startTime);
    o.stop(ctx.currentTime + startTime + duration);
}

function noise(duration, gain = 0.05) {
    const ctx = getCtx();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.connect(g).connect(ctx.destination);
    source.start();
}

export function playGameSound(type) {
    try {
        switch (type) {
            case 'shoot':
                // Lazer/atis sesi
                osc(800, 'square', 0.08, 0, 0.08);
                osc(400, 'square', 0.06, 0.04, 0.06);
                break;

            case 'pop':
                // Balon patlama
                noise(0.1, 0.1);
                osc(600, 'sine', 0.1, 0, 0.1);
                osc(300, 'sine', 0.08, 0.05, 0.06);
                break;

            case 'catch':
                // Yakalama (olumlu)
                osc(523, 'sine', 0.1, 0, 0.1);
                osc(659, 'sine', 0.1, 0.05, 0.1);
                break;

            case 'miss':
                // Kacirma (olumsuz)
                osc(250, 'sawtooth', 0.15, 0, 0.08);
                osc(200, 'sawtooth', 0.1, 0.08, 0.06);
                break;

            case 'tick':
                // Saat tiklamasi
                osc(1000, 'square', 0.03, 0, 0.04);
                break;

            case 'spin':
                // Cark donme
                osc(440, 'triangle', 0.05, 0, 0.06);
                osc(550, 'triangle', 0.05, 0.06, 0.06);
                osc(660, 'triangle', 0.05, 0.12, 0.06);
                break;

            case 'reveal':
                // Kutu acma / gizem acma
                osc(330, 'sine', 0.1, 0, 0.08);
                osc(440, 'sine', 0.1, 0.08, 0.08);
                osc(550, 'sine', 0.1, 0.16, 0.1);
                osc(660, 'sine', 0.15, 0.24, 0.12);
                break;

            case 'drag':
                // Surukle
                osc(200, 'sine', 0.05, 0, 0.04);
                break;

            case 'drop_ok':
                // Dogru yere birak
                osc(523, 'sine', 0.08, 0, 0.08);
                osc(784, 'sine', 0.12, 0.06, 0.1);
                break;

            case 'drop_fail':
                // Yanlis yere birak
                osc(300, 'square', 0.12, 0, 0.06);
                osc(250, 'square', 0.1, 0.08, 0.04);
                break;

            case 'combo':
                // Combo artiyor
                osc(523, 'triangle', 0.06, 0, 0.08);
                osc(659, 'triangle', 0.06, 0.04, 0.08);
                osc(784, 'triangle', 0.08, 0.08, 0.1);
                break;

            case 'explosion':
                // Patlama
                noise(0.25, 0.12);
                osc(150, 'sawtooth', 0.2, 0, 0.08);
                osc(80, 'sawtooth', 0.15, 0.1, 0.06);
                break;

            case 'letter':
                // Harf tiklamasi (kelime oyunlari)
                osc(700 + Math.random() * 200, 'sine', 0.06, 0, 0.06);
                break;

            case 'word_found':
                // Kelime bulundu
                const notes = [523, 587, 659, 784];
                notes.forEach((n, i) => osc(n, 'sine', 0.1, i * 0.06, 0.08));
                break;

            case 'countdown':
                // 3-2-1 geri sayim
                osc(440, 'square', 0.2, 0, 0.06);
                break;

            case 'go':
                // Basla!
                osc(523, 'triangle', 0.1, 0, 0.1);
                osc(659, 'triangle', 0.1, 0.1, 0.1);
                osc(784, 'triangle', 0.15, 0.2, 0.12);
                osc(1047, 'triangle', 0.2, 0.35, 0.15);
                break;
        }
    } catch (e) {
        // Web Audio API desteklenmiyorsa sessiz devam et
    }
}
