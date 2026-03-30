// ===== E29: Yarış / Tırmanış =====
// Dikey yol. Doğru cevap = 1 adım ileri. Yanlış = 1 adım geri.
// AI rakip aynı anda tırmanıyor. Önce zirveye ulaş!

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { drawSprite } from './sprite-renderer.js';
import { getGameDifficulty } from './difficulty.js';
import { normalizeSoru, shuffle } from './engine-utils.js';

export function renderRace(container, game, data, app) {
    let questions = (game.veri?.sorular || []).map(normalizeSoru);

    if (questions.length === 0 && game.veri?.turlar) {
        questions = game.veri.turlar.map(t => normalizeSoru({
            soru: t.soru,
            secenekler: [t.dogru_balon, ...(t.diger_balonlar || [])],
            dogru_cevap: t.dogru_balon
        }));
    }

    if (questions.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E29');
    const aiStrength = game.veri?.rakip_zorlugu ?? diff.aiStrength;
    const TOTAL_STEPS = questions.length;

    const shell = new GameShell(container, {
        game, data, app,
        config: {
            hasTimer: true,
            timerSeconds: diff.timerSeconds,
            hasLives: false,
            hasCombo: true,
            hasPause: true,
        }
    });

    let qIndex = 0;
    let playerPos = 0;
    let aiPos = 0;
    let waitingAnswer = false;
    let flashMsg = '';
    let flashTimer = 0;
    let answerBtns = [];

    function startGame() {
        shell.renderShell();
        renderRaceScene();
        showQuestion();
    }

    function renderRaceScene() {
        shell.gameArea.innerHTML = '';

        const canvasWrap = document.createElement('div');
        canvasWrap.id = 'race-canvas-wrap';
        shell.gameArea.appendChild(canvasWrap);

        const W = 340, H = 280;
        const canvas = new CanvasGame(canvasWrap, { width: W, height: H, bgColor: '#1a2744' });

        canvas.start(
            (dt) => {
                if (shell.paused) return;
                if (flashMsg && (flashTimer += dt) > 1.0) {
                    flashMsg = '';
                }
            },
            (ctx) => {
                // Yol
                const roadX = W / 2 - 30;
                const roadW = 60;

                // Zemin
                ctx.fillStyle = '#2d4a1e';
                ctx.fillRect(0, 0, W, H);

                // Yol (dikey şerit)
                ctx.fillStyle = '#555';
                ctx.fillRect(roadX, 0, roadW, H);

                // Şerit çizgileri
                ctx.strokeStyle = 'rgba(255,255,200,0.5)';
                ctx.setLineDash([12, 10]);
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H);
                ctx.stroke();
                ctx.setLineDash([]);

                // Basamak çizgileri
                for (let i = 0; i <= TOTAL_STEPS; i++) {
                    const y = H - (i / TOTAL_STEPS) * (H - 30) - 20;
                    ctx.strokeStyle = i === TOTAL_STEPS ? '#FFD700' : 'rgba(255,255,255,0.15)';
                    ctx.lineWidth = i === TOTAL_STEPS ? 3 : 1;
                    ctx.beginPath();
                    ctx.moveTo(roadX - 10, y);
                    ctx.lineTo(roadX + roadW + 10, y);
                    ctx.stroke();

                    // Basamak numarası
                    if (i > 0 && i <= TOTAL_STEPS) {
                        ctx.fillStyle = i === TOTAL_STEPS ? '#FFD700' : 'rgba(255,255,255,0.4)';
                        ctx.font = '9px Inter, sans-serif';
                        ctx.textAlign = 'right';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(i, roadX - 13, y);
                    }
                }

                // Bayrak (zirve)
                drawSprite(ctx, '🏁', W/2, H - (TOTAL_STEPS / TOTAL_STEPS) * (H - 30) - 20, 28);

                // Oyuncu pozisyonu
                const playerY = H - (playerPos / TOTAL_STEPS) * (H - 30) - 20;
                drawSprite(ctx, '🧑', roadX - 5, playerY, 28);

                // AI pozisyonu
                const aiY = H - (aiPos / TOTAL_STEPS) * (H - 30) - 20;
                drawSprite(ctx, '🤖', roadX + roadW + 5, aiY, 28);

                // Etiketler
                ctx.fillStyle = 'white';
                ctx.font = 'bold 10px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Sen', roadX - 5, playerY + 20);
                ctx.fillText('AI', roadX + roadW + 5, aiY + 20);

                // Flaş mesaj
                if (flashMsg) {
                    ctx.fillStyle = flashMsg.startsWith('✅') ? '#1dd1a1' : '#ff6b6b';
                    ctx.fillStyle += 'dd';
                    ctx.beginPath();
                    if (ctx.roundRect) ctx.roundRect(W/2 - 80, H/2 - 15, 160, 30, 8);
                    else ctx.rect(W/2 - 80, H/2 - 15, 160, 30);
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 13px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(flashMsg, W/2, H/2, 155);
                }
            }
        );

        // Soru alanı
        const qArea = document.createElement('div');
        qArea.id = 'race-q-area';
        qArea.style.cssText = 'margin-top:0.75rem; padding:0 0.25rem;';
        shell.gameArea.appendChild(qArea);
    }

    function showQuestion() {
        if (qIndex >= questions.length) {
            shell.gameWin();
            return;
        }
        if (shell.finished) return;

        const q = questions[qIndex];
        const correct = q.dogru_cevap;
        const options = shuffle([...new Set([correct, ...(q.secenekler || [])].slice(0, 4))]);

        const qArea = document.getElementById('race-q-area');
        if (!qArea) return;

        qArea.innerHTML = `
        <div style="font-size:0.9rem; font-weight:600; text-align:center; margin-bottom:0.75rem; padding:0.5rem; background:var(--bg-secondary); border-radius:10px;">
            ${q.soru}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem;">
            ${options.map((opt, i) => `
                <button class="race-opt-btn" data-opt="${opt}" style="
                    padding:0.5rem 0.5rem; border-radius:10px; border:2px solid var(--border);
                    background:var(--bg-card); cursor:pointer; font-size:0.82rem; font-weight:500;
                    transition:all 0.15s; text-align:center; min-height:44px;
                ">${opt}</button>
            `).join('')}
        </div>`;

        qArea.querySelectorAll('.race-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (waitingAnswer) return;
                waitingAnswer = true;
                const chosen = btn.dataset.opt;
                const isCorrect = chosen === correct;

                // Renklendirme
                qArea.querySelectorAll('.race-opt-btn').forEach(b => {
                    b.disabled = true;
                    if (b.dataset.opt === correct) b.style.background = '#1dd1a1';
                    else if (b === btn && !isCorrect) b.style.background = '#ff6b6b';
                });

                if (isCorrect) {
                    playerPos = Math.min(TOTAL_STEPS, playerPos + 1);
                    shell.correctAnswer(diff.pointsPerCorrect);
                    playGameSound('catch');
                    flashMsg = '✅ +1 Adım!';
                } else {
                    playerPos = Math.max(0, playerPos - 1);
                    shell.wrongAnswer();
                    playGameSound('miss');
                    flashMsg = `❌ ${correct}`;
                }
                flashTimer = 0;

                // AI hareketi
                if (Math.random() < aiStrength) {
                    aiPos = Math.min(TOTAL_STEPS, aiPos + 1);
                }

                // Kazanma kontrolü
                if (playerPos >= TOTAL_STEPS) {
                    setTimeout(() => { shell.gameWin(); }, 1000);
                    return;
                }
                if (aiPos >= TOTAL_STEPS) {
                    setTimeout(() => { shell.gameWin(); }, 1000);
                    return;
                }

                qIndex++;
                setTimeout(() => {
                    waitingAnswer = false;
                    showQuestion();
                }, 1200);
            });
        });
    }

    shell.onReplay = () => {
        qIndex = 0;
        playerPos = 0;
        aiPos = 0;
        shell.score = 0;
        shell.correct = 0;
        shell.wrong = 0;
        shell.combo = 0;
        shell.timeLeft = shell.timerSeconds;
        shell.finished = false;
        shell.paused = false;
        startGame();
    };

    shell.onTimeUp = () => { shell.gameWin(); };

    startGame();
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
