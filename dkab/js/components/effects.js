// ===== DKAB Akademi - Gorsel Efektler =====

const CONFETTI_COLORS = ['#FF6B6B', '#4ECB71', '#6C63FF', '#FFB84D', '#FF9FF3', '#48dbfb', '#C0872A'];

export function showConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        piece.style.animationDelay = Math.random() * 1 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.width = (6 + Math.random() * 8) + 'px';
        piece.style.height = (6 + Math.random() * 8) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 4000);
}

export function showXpPopup(xp) {
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.textContent = `+${xp} XP`;
    popup.style.left = '50%';
    popup.style.top = '40%';
    popup.style.transform = 'translateX(-50%)';
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 1600);
}

export function showStarBurst(element) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: starBurst 0.6s ease-out forwards;
    `;
    burst.textContent = '\u2B50';
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 700);
}

// Shared AudioContext - reuse to avoid browser limit
let _audioCtx = null;
function getAudioCtx() {
    if (!_audioCtx || _audioCtx.state === 'closed') {
        _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
}

export function playSound(type) {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.1;

        if (type === 'correct') {
            osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
            osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
            osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.4);
        } else if (type === 'wrong') {
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.setValueAtTime(250, ctx.currentTime + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'complete') {
            osc.frequency.setValueAtTime(523, ctx.currentTime);
            osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12);
            osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24);
            osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.36);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.6);
        } else if (type === 'click') {
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.value = 0.05;
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.05);
        } else if (type === 'levelUp') {
            // Fanfare: C-E-G-C5-E5-G5
            osc.type = 'triangle';
            gain.gain.value = 0.15;
            [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => {
                osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
            });
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.8);
        } else if (type === 'unlock') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.setValueAtTime(600, ctx.currentTime + 0.08);
            osc.frequency.setValueAtTime(800, ctx.currentTime + 0.16);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'badge') {
            osc.type = 'triangle';
            gain.gain.value = 0.12;
            [784, 988, 1175, 1568].forEach((f, i) => {
                osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);
            });
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.6);
        }
    } catch (e) {
        // Audio not supported, silently fail
    }
}

// Seviye atlama kutlamasi
export function showLevelUp(newLevel) {
    // Konfeti
    showConfetti();
    // Ses
    playSound('levelUp');
    // Overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position:fixed; inset:0; z-index:10000; display:flex; flex-direction:column;
        align-items:center; justify-content:center; background:rgba(0,0,0,0.6);
        animation: fadeIn 0.3s ease-out; pointer-events:auto; cursor:pointer;
    `;
    overlay.innerHTML = `
        <div style="font-size:5rem; animation: bounceIn 0.5s ease-out;">&#127881;</div>
        <div style="font-size:2rem; font-weight:800; color:white; margin-top:1rem; animation: bounceIn 0.5s 0.1s ease-out both;">
            Seviye ${newLevel}!
        </div>
        <div style="font-size:1rem; color:rgba(255,255,255,0.8); margin-top:0.5rem; animation: fadeIn 0.5s 0.3s ease-out both;">
            ${getLevelTitle(newLevel)}
        </div>
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 4000);
}

function getLevelTitle(level) {
    if (level >= 25) return 'Usta! Muhtesem bir basari.';
    if (level >= 10) return 'Kalfa! Harika gidiyorsun.';
    if (level >= 5) return 'Cirak! Yolun acik olsun.';
    return 'Devam et, harika gidiyorsun!';
}

export function animateValue(element, start, end, duration = 1000) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(start + range * eased);
        element.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}
