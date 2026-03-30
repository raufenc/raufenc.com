// ===== E27: Uzay Nişancısı (Space Shooter) =====
// Alt kısımda uzay gemisi. Üstten balonlar/uzaylılar iniyor.
// Her hedefte bir cevap. Doğru olanı vur!

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { drawSprite } from './sprite-renderer.js';
import { getGameDifficulty } from './difficulty.js';

export function renderSpaceShooter(container, game, data, app) {
    let waves = game.veri?.dalgalar || [];

    // Fallback: MCQ sorulardan dalga olustur
    if (waves.length === 0 && game.veri?.sorular) {
        waves = game.veri.sorular.map(s => ({
            soru: s.soru,
            dogru: s.dogru_cevap?.replace(/^[A-D]\)\s*/, '') || '',
            yanlis: (s.secenekler || [])
                .map(o => o.replace(/^[A-D]\)\s*/, ''))
                .filter(o => o !== (s.dogru_cevap?.replace(/^[A-D]\)\s*/, '')))
                .slice(0, 3),
            hiz: 1
        }));
    }

    if (waves.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
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
        if (waveIndex >= waves.length) {
            shell.gameWin();
            return;
        }
        if (shell.finished) return;

        const wave = waves[waveIndex];
        const allAnswers = shuffle([wave.dogru, ...(wave.yanlis || [])]).slice(0, 4);

        shell.gameArea.innerHTML = '';

        // Soru paneli
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = `
            text-align:center; padding:0.75rem 1rem; font-weight:600;
            background:rgba(108,99,255,0.15); border-radius:14px; margin-bottom:0.5rem;
            border:1px solid rgba(108,99,255,0.3);
        `;
        questionDiv.innerHTML = `
            <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.2rem;">
                Dalga ${waveIndex + 1} / ${waves.length} — Dogru hedefe ates et!
            </div>
            <div style="font-size:0.95rem;">${wave.soru}</div>
        `;
        shell.gameArea.appendChild(questionDiv);

        const canvasContainer = document.createElement('div');
        canvasContainer.style.cssText = 'position:relative;';
        shell.gameArea.appendChild(canvasContainer);

        const W = 360, H = 380;
        const canvas = new CanvasGame(canvasContainer, { width: W, height: H, bgColor: '#0a0a1a' });

        // Gemi
        const ship = {
            x: W / 2,
            y: H - 40,
            w: 48,
            h: 40,
            speed: 200,
        };

        // Dusman hedefler
        const speedMult = diff.speed * (1 + (wave.hiz || 1) * 0.2);
        const targets = allAnswers.map((text, i) => ({
            text,
            correct: text === wave.dogru,
            x: (W / (allAnswers.length + 1)) * (i + 1),
            y: -40 - i * 30,
            w: 60,
            h: 30,
            speed: (50 + Math.random() * 30) * speedMult,
            alive: true,
            color: ['#FF6B6B', '#48DBFB', '#FECA57', '#FF9FF3'][i % 4],
        }));

        // Mermiler
        const bullets = [];
        let lastShot = 0;
        let answered = false;
        let resultMsg = '';
        let resultTimer = 0;

        // Otomatik ates: hedef hizasina gelince yavaslayarak dogru olanı vurur
        function autoAim() {
            // Gemi en yakın hedefe dogru gider (kullanici ipucuyla)
        }

        canvas.start(
            (dt) => {
                if (shell.paused || answered) return;

                // Gemi hareketi (sol/sag tuslari veya dokunmatik)
                if (canvas.keys['ArrowLeft'] || canvas.keys['KeyA']) {
                    ship.x = Math.max(ship.w / 2, ship.x - ship.speed * dt);
                }
                if (canvas.keys['ArrowRight'] || canvas.keys['KeyD']) {
                    ship.x = Math.min(W - ship.w / 2, ship.x + ship.speed * dt);
                }

                // Dokunmatik: gemi parmak pozisyonunu takip eder
                if (canvas.pointer.x > 0 && canvas.pointer.held) {
                    ship.x += (canvas.pointer.x - ship.x) * 0.15;
                }

                // Otomatik ates (Space veya tap)
                lastShot += dt;
                if ((canvas.keys['Space'] || canvas.pointer.down) && lastShot > 0.3) {
                    canvas.pointer.down = false;
                    lastShot = 0;
                    bullets.push({ x: ship.x, y: ship.y - 20, speed: 350 });
                    playGameSound('shoot');
                }

                // Mermi hareketi
                for (let i = bullets.length - 1; i >= 0; i--) {
                    bullets[i].y -= bullets[i].speed * dt;
                    if (bullets[i].y < -10) bullets.splice(i, 1);
                }

                // Hedef hareketi
                for (const t of targets) {
                    if (!t.alive) continue;
                    t.y += t.speed * dt;

                    // Ekran dısına cıktı mı?
                    if (t.y > H + 20) {
                        t.alive = false;
                        if (t.correct) {
                            // Doğru hedef kaçtı → can kaybet
                            const ended = shell.wrongAnswer();
                            playGameSound('miss');
                            if (ended) { canvas.destroy(); return; }
                            answered = true;
                            resultMsg = '❌ Kaçırdın!';
                            resultTimer = 0;
                        }
                    }

                    // Mermi çarpışması
                    for (let i = bullets.length - 1; i >= 0; i--) {
                        const b = bullets[i];
                        if (CanvasGame.pointInRect(b.x, b.y, { x: t.x - t.w/2, y: t.y - t.h/2, w: t.w, h: t.h })) {
                            bullets.splice(i, 1);
                            t.alive = false;
                            answered = true;

                            if (t.correct) {
                                shell.correctAnswer(diff.pointsPerCorrect);
                                playGameSound('pop');
                                canvas.spawnParticles(t.x, t.y, { count: 12, colors: ['#FFD700', '#FF6B6B', '#48DBFB'], speed: 100 });
                                resultMsg = '✅ Doğru!';
                            } else {
                                const ended = shell.wrongAnswer();
                                playGameSound('miss');
                                resultMsg = `❌ Yanlış! Doğru: ${wave.dogru}`;
                                if (ended) { canvas.destroy(); return; }
                            }
                            resultTimer = 0;
                            break;
                        }
                    }
                }

                // Tüm hedefler öldü ama cevap verilmedi → hepsini miss
                if (!answered && targets.every(t => !t.alive)) {
                    answered = true;
                    resultMsg = `⏱️ Kaçırdın! Doğru: ${wave.dogru}`;
                }

                // Sonuç mesajı süresi
                if (answered) {
                    resultTimer += dt;
                    if (resultTimer > 1.5) {
                        canvas.destroy();
                        waveIndex++;
                        startWave();
                    }
                }
            },
            (ctx) => {
                // Yıldız alanı
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                for (let i = 0; i < 40; i++) {
                    const sx = (i * 137 + 11) % W;
                    const sy = (i * 79 + 23) % H;
                    ctx.fillRect(sx, sy, 1, 1);
                }

                // Mermiler
                ctx.fillStyle = '#FFD700';
                for (const b of bullets) {
                    ctx.fillRect(b.x - 2, b.y - 8, 4, 12);
                }

                // Hedefler (uzaylı + metin)
                for (const t of targets) {
                    if (!t.alive) continue;

                    // Arka plan kutusu
                    ctx.fillStyle = t.color + '33';
                    ctx.strokeStyle = t.color;
                    ctx.lineWidth = 2;
                    const rx = t.x - t.w/2, ry = t.y - t.h/2;
                    ctx.beginPath();
                    if (ctx.roundRect) ctx.roundRect(rx, ry, t.w, t.h, 8);
                    else ctx.rect(rx, ry, t.w, t.h);
                    ctx.fill();
                    ctx.stroke();

                    // Emoji
                    drawSprite(ctx, '👾', t.x, t.y - 22, 20);

                    // Metin
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 10px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const display = t.text.length > 10 ? t.text.slice(0, 9) + '…' : t.text;
                    ctx.fillText(display, t.x, t.y, t.w - 4);
                }

                // Gemi
                drawSprite(ctx, '🚀', ship.x, ship.y, 36);

                // Motor ateşi
                ctx.fillStyle = `hsl(${Date.now() * 0.3 % 60 + 10}, 100%, 60%)`;
                ctx.beginPath();
                ctx.arc(ship.x, ship.y + 22, 6, 0, Math.PI * 2);
                ctx.fill();

                // Sonuç mesajı
                if (answered && resultMsg) {
                    ctx.fillStyle = 'rgba(0,0,0,0.75)';
                    ctx.beginPath();
                    if (ctx.roundRect) ctx.roundRect(W/2 - 120, H/2 - 24, 240, 48, 12);
                    else ctx.rect(W/2 - 120, H/2 - 24, 240, 48);
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 14px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(resultMsg, W/2, H/2, 230);
                }
            }
        );
    }

    shell.onReplay = () => {
        waveIndex = 0;
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

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
