// ===== E28: Balon Patlatma =====
// İki mod:
//   "kavram" modu (varsayılan): üstte tanım göster → doğru terimi patlat
//   "soru" modu: üstte soru göster → doğru cevabı patlat
//
// ⛔ DİKKAT — İÇERİK KISITLAMASI:
//   Bu oyun motoru; Allah'ın isimleri (Esmâü'l-Hüsnâ), kutsal lafızlar
//   (Bismillah, Elhamdülillah, vb.), Kur'an-ı Kerim ayetleri veya sureleri
//   içerik olarak KULLANILAMAZ. Bu tür kutsal içerikler için E03 (eşleştirme)
//   veya E02 (kart) motorlarını kullanın.

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { drawBalloon, BALLOON_COLORS } from './sprite-renderer.js';
import { getGameDifficulty } from './difficulty.js';
import { soruToWave, getCorrectText, getWrongTexts, shuffle } from './engine-utils.js';

export function renderBalloonPop(container, game, data, app) {
    let rounds = [];

    // ── 1. Kavram modu: {kavramlar: [{terim, tanim, ...}]} ──────────
    if (game.veri?.kavramlar?.length > 0) {
        const kvs = game.veri.kavramlar;
        rounds = kvs.map(k => {
            const dogru = k.terim || '';
            const pool = shuffle(kvs.filter(x => x.terim !== dogru)).slice(0, 3).map(x => x.terim);
            return {
                prompt: k.tanim || k.aciklama || '',
                prompt_label: k.kaynak ? `📖 ${k.kaynak}` : '💡 Tanım',
                dogru_balon: dogru,
                diger_balonlar: pool,
                aciklama: k.ornek || ''
            };
        });
    }

    // ── 2. Hazır tur formatı: {turlar: [{soru, dogru_balon, ...}]} ──
    if (rounds.length === 0 && game.veri?.turlar?.length > 0) {
        rounds = game.veri.turlar.map(t => ({
            prompt: t.soru || t.prompt || '',
            prompt_label: t.prompt_label || '❓ Soru',
            dogru_balon: t.dogru_balon || '',
            diger_balonlar: t.diger_balonlar || [],
            aciklama: t.aciklama || ''
        }));
    }

    // ── 3. MCQ fallback ─────────────────────────────────────────────
    if (rounds.length === 0 && game.veri?.sorular?.length > 0) {
        rounds = game.veri.sorular.map(s => {
            const dogru = getCorrectText(s);
            return {
                prompt: s.soru_metni || s.soru || '',
                prompt_label: '❓ Soru',
                dogru_balon: dogru,
                diger_balonlar: getWrongTexts(s, dogru),
                aciklama: s.aciklama || ''
            };
        });
    }

    rounds = rounds.filter(r => r.prompt && r.dogru_balon);

    if (rounds.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun için veri bulunamadı.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E28');

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
        if (currentRound >= rounds.length) { shell.gameWin(); return; }
        if (shell.finished) return;

        const round = rounds[currentRound];
        const answers = shuffle([round.dogru_balon, ...(round.diger_balonlar || [])]).slice(0, 4);

        shell.gameArea.innerHTML = '';

        // ── Prompt kutusu ────────────────────────────────────────────
        const promptDiv = document.createElement('div');
        promptDiv.style.cssText = `
            background: linear-gradient(135deg, #2d1b69, #11998e);
            border-radius: 16px; padding: 1rem 1.25rem; margin-bottom: 0.5rem;
            text-align: center; color: white;
            box-shadow: 0 4px 20px rgba(17,153,142,0.3);
        `;
        promptDiv.innerHTML = `
            <div style="font-size:0.7rem; opacity:0.75; margin-bottom:0.3rem; text-transform:uppercase; letter-spacing:0.06em;">
                ${round.prompt_label || '💡 Tanım'} &nbsp;·&nbsp; ${currentRound + 1} / ${rounds.length}
            </div>
            <div style="font-size:1rem; font-weight:700; line-height:1.5;">${round.prompt}</div>
        `;
        shell.gameArea.appendChild(promptDiv);

        // ── Canvas ───────────────────────────────────────────────────
        const canvasContainer = document.createElement('div');
        shell.gameArea.appendChild(canvasContainer);

        const W = 360, H = 330;
        const canvas = new CanvasGame(canvasContainer, { width: W, height: H, bgColor: '#0d1b2a' });

        const balloons = answers.map((text, i) => ({
            text,
            correct: text === round.dogru_balon,
            x: (W / (answers.length + 1)) * (i + 1),
            y: H + 50 + Math.random() * 60,
            targetY: 70 + Math.random() * 120,
            radius: Math.min(44, Math.max(34, 80 / Math.max(text.length, 4))),
            color: BALLOON_COLORS[i % BALLOON_COLORS.length],
            popped: false,
            wobble: Math.random() * Math.PI * 2,
            speed: 55 + Math.random() * 35,
        }));

        let answered = false;
        let showExp = false;
        let expTimer = 0;

        canvas.start(
            (dt) => {
                if (shell.paused || answered) {
                    if (showExp) {
                        expTimer += dt;
                        if (expTimer > 2.0) {
                            canvas.destroy();
                            currentRound++;
                            startRound();
                        }
                    }
                    return;
                }

                for (const b of balloons) {
                    if (b.popped) continue;
                    if (b.y > b.targetY) b.y -= b.speed * dt;
                    b.wobble += dt * 1.5;
                    b.x += Math.sin(b.wobble * 0.8) * 0.4;
                    b.x = Math.max(b.radius + 4, Math.min(W - b.radius - 4, b.x));
                }

                if (canvas.pointer.down && !answered) {
                    canvas.pointer.down = false;
                    for (const b of balloons) {
                        if (b.popped) continue;
                        const d = CanvasGame.distance(
                            { x: canvas.pointer.x, y: canvas.pointer.y }, { x: b.x, y: b.y }
                        );
                        if (d <= b.radius + 8) {
                            answered = true;
                            b.popped = true;

                            if (b.correct) {
                                shell.correctAnswer(diff.pointsPerCorrect);
                                playGameSound('pop');
                                canvas.spawnParticles(b.x, b.y, {
                                    count: 18, colors: [b.color, '#FFD700', 'white'], speed: 130
                                });
                            } else {
                                const ended = shell.wrongAnswer();
                                playGameSound('miss');
                                if (ended) { canvas.destroy(); return; }
                            }

                            if (round.aciklama) {
                                showExp = true;
                                expTimer = 0;
                            } else {
                                setTimeout(() => { canvas.destroy(); currentRound++; startRound(); }, 700);
                            }
                            break;
                        }
                    }
                }
            },
            (ctx) => {
                // Yıldızlar
                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                for (let i = 0; i < 30; i++) {
                    ctx.fillRect((i*97+11)%W, (i*67+23)%H, 1.5, 1.5);
                }

                // Balonlar
                for (const b of balloons) {
                    if (b.popped) continue;
                    drawBalloon(ctx, b.x, b.y, b.radius, {
                        color: b.color,
                        text: b.text,
                        textColor: 'white'
                    });
                }

                // Açıklama overlay
                if (showExp && round.aciklama) {
                    ctx.fillStyle = 'rgba(0,0,0,0.82)';
                    ctx.fillRect(0, H - 90, W, 90);
                    // Başlık satırı
                    ctx.fillStyle = '#1DD1A1';
                    ctx.font = 'bold 12px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('✅ ' + round.dogru_balon, W/2, H - 68, W - 20);
                    // Açıklama
                    ctx.fillStyle = 'rgba(255,255,255,0.88)';
                    ctx.font = '11px Inter, sans-serif';
                    const maxLen = 80;
                    const txt = round.aciklama.length > maxLen
                        ? round.aciklama.slice(0, maxLen) + '…'
                        : round.aciklama;
                    ctx.fillText(txt, W/2, H - 42, W - 20);
                    // Alt kılavuz
                    ctx.fillStyle = 'rgba(255,255,255,0.4)';
                    ctx.font = '10px Inter, sans-serif';
                    ctx.fillText('Sonraki tura geçiliyor…', W/2, H - 18);
                }

                // Kılavuz
                if (!answered) {
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.font = '11px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText('👆 Doğru balon tıkla', W/2, H - 5);
                }
            }
        );
    }

    shell.onReplay = () => {
        currentRound = 0;
        shell.score = 0; shell.correct = 0; shell.wrong = 0;
        shell.combo = 0; shell.lives = shell.maxLives;
        shell.timeLeft = shell.timerSeconds;
        shell.finished = false; shell.paused = false;
        startGame();
    };

    shell.onTimeUp = () => { shell.gameWin(); };

    startGame();
}
