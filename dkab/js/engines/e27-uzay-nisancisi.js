// ===== E27: Uzay Nişancısı =====
// Soru ekranın üstünde büyük gösterilir.
// Uzayda yüzen hedeflere tıkla — doğru cevabı vur!
//
// ⛔ İÇERİK KISITLAMASI: Allah'ın isimleri, kutsal lafızlar, ayet metinleri
//   hedef olarak KULLANILAMAZ. Yalnızca tarafsız kavram/bilgi içeriği kullanın.

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { drawSprite } from './sprite-renderer.js';
import { getGameDifficulty } from './difficulty.js';
import { soruToWave, shuffle } from './engine-utils.js';

export function renderSpaceShooter(container, game, data, app) {
    let waves = game.veri?.dalgalar || [];

    // Fallback: MCQ sorulardan dalga oluştur
    if (waves.length === 0 && game.veri?.sorular) {
        waves = game.veri.sorular.map(soruToWave);
    }

    // Temizle: boş soruları çıkar
    waves = waves.filter(w => w.soru && w.dogru);

    if (waves.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun için veri bulunamadı.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E27');

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

    let waveIndex = 0;

    function startGame() {
        shell.renderShell();
        startWave();
    }

    function startWave() {
        if (waveIndex >= waves.length) { shell.gameWin(); return; }
        if (shell.finished) return;

        const wave = waves[waveIndex];
        const allAnswers = shuffle([wave.dogru, ...(wave.yanlis || [])]).slice(0, 4);

        shell.gameArea.innerHTML = '';

        // ── Soru kutusu (büyük, net) ──────────────────────────────────
        const qBox = document.createElement('div');
        qBox.style.cssText = `
            background: linear-gradient(135deg, #4834d4ee, #6C63FFee);
            border-radius: 16px; padding: 1rem 1.25rem; margin-bottom: 0.5rem;
            text-align: center; color: white;
        `;
        qBox.innerHTML = `
            <div style="font-size:0.7rem; opacity:0.8; margin-bottom:0.3rem; letter-spacing:0.05em; text-transform:uppercase;">
                Soru ${waveIndex + 1} / ${waves.length} &nbsp;·&nbsp; Doğru hedefe tıkla!
            </div>
            <div style="font-size:1rem; font-weight:700; line-height:1.4;">${wave.soru}</div>
        `;
        shell.gameArea.appendChild(qBox);

        // ── Canvas ───────────────────────────────────────────────────
        const canvasWrap = document.createElement('div');
        shell.gameArea.appendChild(canvasWrap);

        const W = 360, H = 300;
        const canvas = new CanvasGame(canvasWrap, { width: W, height: H, bgColor: '#050d1a' });

        // Hedef konumları: 2×2 grid + hafif rastgele offset
        const positions = [
            { x: W * 0.25, y: H * 0.3 },
            { x: W * 0.75, y: H * 0.3 },
            { x: W * 0.25, y: H * 0.72 },
            { x: W * 0.75, y: H * 0.72 },
        ];

        const COLORS = ['#FF6B6B', '#48DBFB', '#1DD1A1', '#FECA57'];
        const targets = allAnswers.map((text, i) => ({
            text,
            correct: text === wave.dogru,
            x: positions[i].x + (Math.random() - 0.5) * 30,
            y: positions[i].y + (Math.random() - 0.5) * 20,
            r: 44,
            color: COLORS[i],
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.8 + Math.random() * 0.4,
            alive: true,
            hitAnim: 0, // 0 = none, >0 = animating
        }));

        let answered = false;
        let resultMsg = '';
        let resultTimer = 0;

        canvas.start(
            (dt) => {
                if (shell.paused || answered) {
                    if (answered) {
                        resultTimer += dt;
                        if (resultTimer > 1.4) {
                            canvas.destroy();
                            waveIndex++;
                            startWave();
                        }
                    }
                    return;
                }

                // Hedef salınımı
                for (const t of targets) {
                    if (!t.alive) continue;
                    t.wobble += dt * t.wobbleSpeed;
                    // Yavaş yatay drift
                    t.x += Math.sin(t.wobble * 0.7) * 0.4;
                    t.y += Math.cos(t.wobble * 0.5) * 0.25;
                    // Sınır koru
                    t.x = Math.max(t.r + 5, Math.min(W - t.r - 5, t.x));
                    t.y = Math.max(t.r + 5, Math.min(H - t.r - 5, t.y));

                    if (t.hitAnim > 0) t.hitAnim -= dt * 3;
                }

                // Tıklama
                if (canvas.pointer.down && !answered) {
                    canvas.pointer.down = false;
                    for (const t of targets) {
                        if (!t.alive) continue;
                        const d = CanvasGame.distance({ x: canvas.pointer.x, y: canvas.pointer.y }, { x: t.x, y: t.y });
                        if (d <= t.r + 8) {
                            answered = true;
                            t.alive = false;
                            t.hitAnim = 1;

                            if (t.correct) {
                                shell.correctAnswer(diff.pointsPerCorrect);
                                playGameSound('pop');
                                canvas.spawnParticles(t.x, t.y, { count: 16, colors: [t.color, '#FFD700', 'white'], speed: 120 });
                                resultMsg = '✅ Doğru!';
                            } else {
                                const ended = shell.wrongAnswer();
                                playGameSound('miss');
                                resultMsg = `❌ Yanlış! Doğru: "${wave.dogru}"`;
                                // Doğru hedefi vurgula
                                targets.find(x => x.correct && x.alive)?.(() => {});
                                if (ended) { canvas.destroy(); return; }
                            }
                            resultTimer = 0;
                            break;
                        }
                    }
                }
            },
            (ctx) => {
                // Yıldız alanı
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                for (let i = 0; i < 60; i++) {
                    const sx = (i * 113 + 7) % W;
                    const sy = (i * 79 + 19) % H;
                    const br = Math.sin(Date.now() * 0.001 + i) * 0.3 + 0.7;
                    ctx.globalAlpha = br * 0.6;
                    ctx.fillRect(sx, sy, 1.5, 1.5);
                }
                ctx.globalAlpha = 1;

                // Hedefler
                for (const t of targets) {
                    if (!t.alive && t.hitAnim <= 0) continue;
                    const alpha = t.alive ? 1 : t.hitAnim;
                    ctx.globalAlpha = alpha;

                    // Dış halka
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, t.r + 4, 0, Math.PI * 2);
                    ctx.strokeStyle = t.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Gövde
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
                    ctx.fillStyle = t.color + '33';
                    ctx.fill();

                    // Emoji (uzaylı)
                    drawSprite(ctx, '👾', t.x, t.y - 10, 28);

                    // Cevap metni
                    ctx.fillStyle = 'white';
                    const fontSize = t.text.length > 12 ? 9 : t.text.length > 8 ? 11 : 13;
                    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const display = t.text.length > 16 ? t.text.slice(0, 15) + '…' : t.text;
                    ctx.fillText(display, t.x, t.y + 18, t.r * 1.7);

                    ctx.globalAlpha = 1;
                }

                // Doğru hedefi (yanıt verilince) yeşil vurgula
                if (answered) {
                    const correct = targets.find(t => t.correct && t.alive);
                    if (correct) {
                        ctx.strokeStyle = '#1DD1A1';
                        ctx.lineWidth = 4;
                        ctx.beginPath();
                        ctx.arc(correct.x, correct.y, correct.r + 8, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }

                // Sonuç mesajı
                if (answered && resultMsg) {
                    const isCorrect = resultMsg.startsWith('✅');
                    ctx.fillStyle = isCorrect ? 'rgba(29,209,161,0.9)' : 'rgba(255,71,87,0.9)';
                    const boxW = Math.min(W - 20, 320);
                    const boxH = 44;
                    const bx = (W - boxW) / 2;
                    const by = H / 2 - boxH / 2;
                    ctx.beginPath();
                    if (ctx.roundRect) ctx.roundRect(bx, by, boxW, boxH, 12);
                    else ctx.rect(bx, by, boxW, boxH);
                    ctx.fill();

                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 13px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(resultMsg, W / 2, H / 2, boxW - 16);
                }

                // Alt kılavuz metni
                if (!answered) {
                    ctx.fillStyle = 'rgba(255,255,255,0.35)';
                    ctx.font = '11px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText('👆 Doğru cevabı tıkla', W / 2, H - 6);
                }
            }
        );
    }

    shell.onReplay = () => {
        waveIndex = 0;
        shell.score = 0; shell.correct = 0; shell.wrong = 0;
        shell.combo = 0; shell.lives = shell.maxLives;
        shell.timeLeft = shell.timerSeconds;
        shell.finished = false; shell.paused = false;
        startGame();
    };
    shell.onTimeUp = () => { shell.gameWin(); };

    startGame();
}
