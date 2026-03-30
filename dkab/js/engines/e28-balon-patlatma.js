// ===== E28: Balon Patlatma (Balloon Pop) =====
// Ekranin altindan balonlar yukselir.
// Her balonda bir kavram/cevap. Ustte soru gosterilir.
// Dogru kavramli balonu tiklayarak patlat!

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { drawBalloon, BALLOON_COLORS } from './sprite-renderer.js';
import { getGameDifficulty } from './difficulty.js';
import { soruToWave } from './engine-utils.js';

export function renderBalloonPop(container, game, data, app) {
    // Veri cek
    let rounds = game.veri?.turlar || [];

    // Fallback: MCQ sorularini tur formatina donustur
    if (rounds.length === 0 && game.veri?.sorular) {
        rounds = game.veri.sorular.map(s => {
            const w = soruToWave(s);
            return {
                soru: w.soru,
                dogru_balon: w.dogru,
                diger_balonlar: w.yanlis,
                aciklama: s.aciklama
            };
        });
    }

    if (rounds.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E28');

    // GameShell kur
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

    let currentRound = 0;

    function startGame() {
        shell.renderShell();
        startRound();
    }

    function startRound() {
        if (currentRound >= rounds.length) {
            shell.gameWin();
            return;
        }
        if (shell.finished) return;

        const round = rounds[currentRound];
        const answers = shuffle([round.dogru_balon, ...(round.diger_balonlar || [])]).slice(0, 4);

        // Soru paneli (DOM, canvas ustunde)
        shell.gameArea.innerHTML = '';

        // Soru
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = `
            text-align:center; padding:1rem; font-weight:600; font-size:1rem;
            background:white; border-radius:14px; margin-bottom:0.75rem;
            box-shadow:0 2px 8px rgba(0,0,0,0.06);
        `;
        questionDiv.innerHTML = `
            <div class="text-muted" style="font-size:0.75rem; margin-bottom:0.25rem;">
                Soru ${currentRound + 1} / ${rounds.length}
            </div>
            <div>${round.soru}</div>
        `;
        shell.gameArea.appendChild(questionDiv);

        // Canvas
        const canvasContainer = document.createElement('div');
        canvasContainer.style.cssText = 'position:relative;';
        shell.gameArea.appendChild(canvasContainer);

        const W = 380, H = 360;
        const canvas = new CanvasGame(canvasContainer, {
            width: W, height: H,
            bgColor: '#1a1a2e'
        });

        // Balonlar
        const balloons = answers.map((text, i) => ({
            text,
            correct: text === round.dogru_balon,
            x: (W / (answers.length + 1)) * (i + 1),
            y: H + 40 + Math.random() * 60,
            targetY: 80 + Math.random() * 100,
            radius: 38,
            color: BALLOON_COLORS[i % BALLOON_COLORS.length],
            popped: false,
            wobble: Math.random() * Math.PI * 2,
            speed: 60 + Math.random() * 40,
        }));

        let answered = false;
        let showExplanation = false;
        let explanationTimer = 0;

        // Oyun dongusu
        canvas.start(
            (dt) => {
                if (shell.paused || answered) return;

                // Balonlari yukari tasi
                for (const b of balloons) {
                    if (b.popped) continue;
                    if (b.y > b.targetY) {
                        b.y -= b.speed * dt;
                    }
                    b.wobble += dt * 2;
                    b.x += Math.sin(b.wobble) * 0.5;
                }

                // Aciklama gosterme suresi
                if (showExplanation) {
                    explanationTimer += dt;
                    if (explanationTimer > 1.8) {
                        canvas.destroy();
                        currentRound++;
                        startRound();
                    }
                }

                // Tiklama kontrolu
                if (canvas.pointer.down && !answered) {
                    canvas.pointer.down = false; // tek tiklama
                    for (const b of balloons) {
                        if (b.popped) continue;
                        const dist = CanvasGame.distance(
                            { x: canvas.pointer.x, y: canvas.pointer.y },
                            { x: b.x, y: b.y }
                        );
                        if (dist <= b.radius + 5) {
                            answered = true;
                            b.popped = true;

                            if (b.correct) {
                                shell.correctAnswer(diff.pointsPerCorrect);
                                playGameSound('pop');
                                canvas.spawnParticles(b.x, b.y, {
                                    count: 16,
                                    emoji: '\uD83C\uDF88',
                                    speed: 120,
                                });
                            } else {
                                const ended = shell.wrongAnswer();
                                playGameSound('miss');
                                if (ended) { canvas.destroy(); return; }
                            }

                            // Aciklama var mi?
                            if (round.aciklama) {
                                showExplanation = true;
                            } else {
                                setTimeout(() => {
                                    canvas.destroy();
                                    currentRound++;
                                    startRound();
                                }, 800);
                            }
                            break;
                        }
                    }
                }
            },
            (ctx) => {
                // Arka plan yildizlari
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                for (let i = 0; i < 20; i++) {
                    const sx = (i * 73 + 17) % W;
                    const sy = (i * 47 + 23) % H;
                    ctx.fillRect(sx, sy, 1.5, 1.5);
                }

                // Balonlari ciz
                for (const b of balloons) {
                    if (b.popped) continue;
                    drawBalloon(ctx, b.x, b.y, b.radius, {
                        color: b.color,
                        text: b.text,
                        textColor: 'white'
                    });
                }

                // Aciklama overlay
                if (showExplanation && round.aciklama) {
                    ctx.fillStyle = 'rgba(0,0,0,0.7)';
                    ctx.fillRect(0, H - 80, W, 80);
                    ctx.fillStyle = 'white';
                    ctx.font = '13px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    // Uzun aciklamayi kirp
                    const maxLen = 60;
                    const txt = round.aciklama.length > maxLen
                        ? round.aciklama.substring(0, maxLen) + '...'
                        : round.aciklama;
                    ctx.fillText(txt, W / 2, H - 40, W - 20);
                }
            }
        );
    }

    // Replay
    shell.onReplay = () => {
        currentRound = 0;
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

    shell.onTimeUp = () => {
        shell.gameWin();
    };

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
