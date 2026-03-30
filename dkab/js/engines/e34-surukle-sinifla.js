// ===== E34: Sürükle & Sınıfla v2 =====
// Kartları doğru kategoriye sürükle-bırak.
// Pointer Events API ile gerçek drag-drop.

import { GameShell } from './game-shell.js';
import { playGameSound } from './sound-fx.js';
import { getGameDifficulty } from './difficulty.js';

export function renderDragClassify(container, game, data, app) {
    let kategoriler = game.veri?.kategoriler || [];
    let kartlar = game.veri?.kartlar || [];

    // Fallback: MCQ sorulardan sınıflandırma üret
    if (kartlar.length === 0 && game.veri?.sorular) {
        const sorular = game.veri.sorular.slice(0, 8);
        kategoriler = [
            { ad: 'Doğru', renk: '#1dd1a1' },
            { ad: 'Yanlış', renk: '#ff6b6b' },
        ];
        kartlar = sorular.map(s => ({
            metin: s.soru,
            dogru_kategori: 'Doğru'
        }));
    }

    if (kartlar.length === 0 || kategoriler.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E34');

    const shell = new GameShell(container, {
        game, data, app,
        config: {
            hasTimer: true,
            timerSeconds: diff.timerSeconds,
            hasLives: true,
            maxLives: diff.lives,
            hasCombo: true,
            hasPause: true,
        }
    });

    let remaining = [...kartlar].map((k, i) => ({ ...k, id: i }));
    let placed = {};
    let dragItem = null;
    let dragEl = null;
    let dragOffX = 0, dragOffY = 0;
    let animating = new Set();

    function startGame() {
        shell.renderShell();
        renderScene();
    }

    function renderScene() {
        if (shell.finished) return;
        shell.gameArea.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.style.cssText = 'padding:0.25rem; user-select:none;';

        // İlerleme
        const total = kartlar.length;
        const done = Object.keys(placed).length;
        const progress = document.createElement('div');
        progress.style.cssText = 'text-align:center; font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;';
        progress.textContent = `${done} / ${total} kart yerleştirildi`;
        wrap.appendChild(progress);

        // Kategori hedefleri
        const catsDiv = document.createElement('div');
        catsDiv.style.cssText = `display:grid; grid-template-columns:repeat(${Math.min(kategoriler.length,3)}, 1fr); gap:0.5rem; margin-bottom:1rem;`;

        kategoriler.forEach(kat => {
            const zone = document.createElement('div');
            zone.className = 'drop-zone';
            zone.dataset.kategori = kat.ad;
            zone.style.cssText = `
                min-height:80px; border-radius:12px;
                border:2px dashed ${kat.renk}80;
                background:${kat.renk}11;
                padding:0.5rem; text-align:center;
                transition:all 0.2s;
                display:flex; flex-direction:column; align-items:center; gap:0.3rem;
            `;
            zone.innerHTML = `<div style="font-size:0.8rem; font-weight:700; color:${kat.renk};">${kat.ad}</div>`;

            // Yerleştirilen kartları göster
            const placedCards = Object.values(placed).filter(p => p.kategori === kat.ad);
            placedCards.forEach(p => {
                const mini = document.createElement('div');
                mini.style.cssText = `
                    font-size:0.7rem; padding:0.2rem 0.4rem;
                    background:${kat.renk}33; border-radius:6px;
                    color:${kat.renk}; border:1px solid ${kat.renk}55;
                    max-width:100%; overflow:hidden; text-overflow:ellipsis;
                    white-space:nowrap;
                `;
                mini.textContent = p.metin;
                zone.appendChild(mini);
            });

            catsDiv.appendChild(zone);
        });
        wrap.appendChild(catsDiv);

        // Kart havuzu
        const poolDiv = document.createElement('div');
        poolDiv.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center;';

        remaining.forEach(kart => {
            const card = document.createElement('div');
            card.className = 'drag-card';
            card.dataset.id = kart.id;
            card.style.cssText = `
                background:var(--bg-card); border:2px solid var(--border);
                border-radius:10px; padding:0.5rem 0.75rem;
                font-size:0.85rem; font-weight:500; cursor:grab;
                transition:transform 0.15s, box-shadow 0.15s;
                touch-action:none; max-width:180px; text-align:center;
                box-shadow:0 2px 6px rgba(0,0,0,0.1);
            `;
            card.textContent = kart.metin;

            // Pointer events
            card.addEventListener('pointerdown', (e) => {
                if (animating.has(kart.id)) return;
                e.preventDefault();
                dragItem = kart;
                const rect = card.getBoundingClientRect();
                dragOffX = e.clientX - rect.left;
                dragOffY = e.clientY - rect.top;

                dragEl = card.cloneNode(true);
                dragEl.style.cssText += `
                    position:fixed; z-index:9999; pointer-events:none;
                    opacity:0.9; transform:scale(1.05) rotate(3deg);
                    box-shadow:0 8px 24px rgba(0,0,0,0.25);
                    left:${e.clientX - dragOffX}px;
                    top:${e.clientY - dragOffY}px;
                    cursor:grabbing;
                `;
                document.body.appendChild(dragEl);

                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.95)';
                card.setPointerCapture(e.pointerId);
            });

            card.addEventListener('pointermove', (e) => {
                if (!dragEl || dragItem?.id !== kart.id) return;
                dragEl.style.left = `${e.clientX - dragOffX}px`;
                dragEl.style.top = `${e.clientY - dragOffY}px`;

                // Hover efekti
                document.querySelectorAll('.drop-zone').forEach(zone => {
                    const rect = zone.getBoundingClientRect();
                    if (e.clientX >= rect.left && e.clientX <= rect.right &&
                        e.clientY >= rect.top && e.clientY <= rect.bottom) {
                        zone.style.borderStyle = 'solid';
                        zone.style.transform = 'scale(1.02)';
                    } else {
                        zone.style.borderStyle = 'dashed';
                        zone.style.transform = '';
                    }
                });
            });

            card.addEventListener('pointerup', (e) => {
                if (!dragEl || dragItem?.id !== kart.id) return;

                // Drag elementini kaldır
                if (dragEl.parentNode) dragEl.parentNode.removeChild(dragEl);
                dragEl = null;
                card.style.opacity = '1';
                card.style.transform = '';
                document.querySelectorAll('.drop-zone').forEach(z => {
                    z.style.borderStyle = 'dashed';
                    z.style.transform = '';
                });

                // Hangi zone üstüne bırakıldı?
                let targetKat = null;
                document.querySelectorAll('.drop-zone').forEach(zone => {
                    const rect = zone.getBoundingClientRect();
                    if (e.clientX >= rect.left && e.clientX <= rect.right &&
                        e.clientY >= rect.top && e.clientY <= rect.bottom) {
                        targetKat = zone.dataset.kategori;
                    }
                });

                if (!targetKat) { dragItem = null; return; }

                const isCorrect = targetKat === kart.dogru_kategori;
                animating.add(kart.id);

                if (isCorrect) {
                    shell.correctAnswer(diff.pointsPerCorrect);
                    playGameSound('drop_ok');
                    placed[kart.id] = { metin: kart.metin, kategori: targetKat };
                    remaining = remaining.filter(r => r.id !== kart.id);
                } else {
                    shell.wrongAnswer();
                    playGameSound('drop_fail');
                    // Kart geri döner
                    card.style.background = '#ff6b6b22';
                    setTimeout(() => {
                        card.style.background = '';
                        animating.delete(kart.id);
                    }, 600);
                    dragItem = null;
                    return;
                }

                dragItem = null;
                animating.delete(kart.id);

                if (remaining.length === 0) {
                    setTimeout(() => { shell.gameWin(); }, 600);
                } else {
                    renderScene();
                }
            });

            poolDiv.appendChild(card);
        });

        wrap.appendChild(poolDiv);
        shell.gameArea.appendChild(wrap);

        if (remaining.length === 0 && Object.keys(placed).length === kartlar.length) {
            setTimeout(() => { shell.gameWin(); }, 500);
        }
    }

    shell.onReplay = () => {
        remaining = [...kartlar].map((k, i) => ({ ...k, id: i }));
        Object.keys(placed).forEach(k => delete placed[k]);
        shell.score = 0;
        shell.correct = 0;
        shell.wrong = 0;
        shell.combo = 0;
        shell.lives = shell.maxLives;
        shell.timeLeft = shell.timerSeconds;
        shell.finished = false;
        shell.paused = false;
        startGame();
    };

    shell.onTimeUp = () => { shell.gameWin(); };

    startGame();
}
