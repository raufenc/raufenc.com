// ===== E30: Halat Çekme (Tug of War) =====
// Ortada bir halat. Doğru cevap → sola çekiyor (bilgi).
// Yanlış → sağa çekiyor (cehalet). 10 soruda halat nerede?

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { drawSprite } from './sprite-renderer.js';
import { getGameDifficulty } from './difficulty.js';

export function renderTugOfWar(container, game, data, app) {
    let questions = game.veri?.sorular || [];
    const gücü = game.veri?.cekme_gucu || 1;

    if (questions.length === 0 && game.veri?.turlar) {
        questions = game.veri.turlar.map(t => ({
            soru: t.soru,
            secenekler: [t.dogru_balon, ...(t.diger_balonlar || [])],
            dogru_cevap: t.dogru_balon
        }));
    }

    if (questions.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E30');

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
    // ropeOffset: -1.0 (sol/bilgi) → 0 (orta) → 1.0 (sağ/cehalet)
    let ropeOffset = 0;
    const MAX_OFFSET = 1.0;
    const STEP = 0.2 * gücü;
    let waitingAnswer = false;
    let flashMsg = '';
    let flashTimer = 0;

    function startGame() {
        shell.renderShell();
        renderTugScene();
        showQuestion();
    }

    function renderTugScene() {
        shell.gameArea.innerHTML = '';

        const canvasWrap = document.createElement('div');
        canvasWrap.id = 'tug-canvas-wrap';
        shell.gameArea.appendChild(canvasWrap);

        const W = 340, H = 180;
        const canvas = new CanvasGame(canvasWrap, { width: W, height: H, bgColor: '#2d1b69' });

        canvas.start(
            (dt) => {
                if (shell.paused) return;
                if (flashMsg && (flashTimer += dt) > 0.8) flashMsg = '';
            },
            (ctx) => {
                const CX = W / 2 + ropeOffset * (W * 0.35);

                // Zemin
                ctx.fillStyle = '#1a0d40';
                ctx.fillRect(0, H * 0.6, W, H * 0.4);

                // Orta sınır çizgisi
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 3;
                ctx.setLineDash([6, 4]);
                ctx.beginPath();
                ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H);
                ctx.stroke();
                ctx.setLineDash([]);

                // "Bilgi" / "Cehalet" etiketler
                ctx.fillStyle = '#1dd1a1';
                ctx.font = 'bold 11px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('📚 BİLGİ', W * 0.2, 14);

                ctx.fillStyle = '#ff6b6b';
                ctx.fillText('🌑 CEHALET', W * 0.8, 14);

                // Halat
                const ropeY = H * 0.52;
                ctx.strokeStyle = '#c8a96e';
                ctx.lineWidth = 8;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(0, ropeY);
                ctx.lineTo(W, ropeY);
                ctx.stroke();

                // Halat orta işareti (kırmızı bez)
                ctx.fillStyle = '#ff4757';
                ctx.fillRect(CX - 6, ropeY - 12, 12, 24);

                // Sol karakter (bilgi tarafı)
                drawSprite(ctx, '🧕', CX - 60, ropeY - 16, 32);
                // Sag karakter (cehalet tarafı)
                drawSprite(ctx, '😈', CX + 60, ropeY - 16, 32);

                // Denge göstergesi
                const pct = (ropeOffset + 1) / 2; // 0=bilgi kazanıyor, 1=cehalet
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(W/2 - 60, H - 20, 120, 10, 5);
                else ctx.rect(W/2 - 60, H - 20, 120, 10);
                ctx.fill();

                const barColor = pct < 0.4 ? '#1dd1a1' : pct > 0.6 ? '#ff6b6b' : '#FECA57';
                ctx.fillStyle = barColor;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(W/2 - 60, H - 20, 120 * pct, 10, 5);
                else ctx.rect(W/2 - 60, H - 20, 120 * pct, 10);
                ctx.fill();

                // Flaş mesajı
                if (flashMsg) {
                    ctx.fillStyle = flashMsg.startsWith('✅') ? '#1dd1a150' : '#ff6b6b50';
                    ctx.beginPath();
                    if (ctx.roundRect) ctx.roundRect(W/2 - 80, H/2 - 16, 160, 32, 8);
                    else ctx.rect(W/2 - 80, H/2 - 16, 160, 32);
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 13px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(flashMsg, W/2, H/2, 155);
                }
            }
        );

        const qArea = document.createElement('div');
        qArea.id = 'tug-q-area';
        qArea.style.cssText = 'margin-top:0.75rem; padding:0 0.25rem;';
        shell.gameArea.appendChild(qArea);
    }

    function showQuestion() {
        if (qIndex >= questions.length || shell.finished) {
            shell.gameWin();
            return;
        }

        const q = questions[qIndex];
        const correct = (q.dogru_cevap || '').replace(/^[A-D]\)\s*/, '');
        const opts = shuffle([correct, ...(q.secenekler || [])
            .map(o => o.replace(/^[A-D]\)\s*/, ''))
            .filter(o => o !== correct)
            .slice(0, 3)
        ]);

        const qArea = document.getElementById('tug-q-area');
        if (!qArea) return;

        qArea.innerHTML = `
        <div style="font-size:0.85rem; font-weight:600; text-align:center; margin-bottom:0.5rem; padding:0.5rem; background:var(--bg-secondary); border-radius:10px;">
            <span style="color:var(--text-muted); font-size:0.75rem;">Soru ${qIndex+1}/${questions.length} — </span>${q.soru}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.35rem;">
            ${opts.map(opt => `
                <button class="tug-opt-btn" data-opt="${opt}" style="
                    padding:0.45rem 0.4rem; border-radius:9px; border:2px solid var(--border);
                    background:var(--bg-card); cursor:pointer; font-size:0.8rem;
                    transition:all 0.15s; min-height:40px;
                ">${opt}</button>
            `).join('')}
        </div>`;

        qArea.querySelectorAll('.tug-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (waitingAnswer) return;
                waitingAnswer = true;
                const chosen = btn.dataset.opt;
                const isCorrect = chosen === correct;

                qArea.querySelectorAll('.tug-opt-btn').forEach(b => {
                    b.disabled = true;
                    if (b.dataset.opt === correct) b.style.background = '#1dd1a1';
                    else if (b === btn && !isCorrect) b.style.background = '#ff6b6b';
                });

                if (isCorrect) {
                    ropeOffset = Math.max(-MAX_OFFSET, ropeOffset - STEP);
                    shell.correctAnswer(diff.pointsPerCorrect);
                    playGameSound('catch');
                    flashMsg = '✅ Çekiyorsun!';
                } else {
                    ropeOffset = Math.min(MAX_OFFSET, ropeOffset + STEP);
                    shell.wrongAnswer();
                    playGameSound('miss');
                    flashMsg = `❌ ${correct}`;
                }
                flashTimer = 0;

                // Kazanma/kaybetme
                if (ropeOffset <= -MAX_OFFSET) {
                    setTimeout(() => { shell.gameWin(); }, 800);
                    return;
                }
                if (ropeOffset >= MAX_OFFSET) {
                    setTimeout(() => { shell.gameWin(); }, 800);
                    return;
                }

                qIndex++;
                setTimeout(() => {
                    waitingAnswer = false;
                    showQuestion();
                }, 1000);
            });
        });
    }

    shell.onReplay = () => {
        qIndex = 0;
        ropeOffset = 0;
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
