// ===== E31: Yakalayıcı (Catcher) =====
// Üstten nesneler düşüyor. İyi olanları yakala, kötülerden kaç!

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { drawSprite } from './sprite-renderer.js';
import { getGameDifficulty } from './difficulty.js';

export function renderCatcher(container, game, data, app) {
    let goodItems = game.veri?.iyi || [];
    let badItems = game.veri?.kotu || [];

    // Fallback: MCQ sorulardan iyi/kötü üret
    if (goodItems.length === 0 && game.veri?.sorular) {
        game.veri.sorular.forEach(s => {
            const correct = (s.dogru_cevap || '').replace(/^[A-D]\)\s*/, '');
            goodItems.push({ metin: correct, emoji: '✅', puan: 10 });
            (s.secenekler || []).forEach(opt => {
                const o = opt.replace(/^[A-D]\)\s*/, '');
                if (o !== correct) badItems.push({ metin: o, emoji: '❌', ceza: 5 });
            });
        });
    }

    // Fallback genel
    if (goodItems.length === 0) {
        goodItems = [
            { metin: 'Namaz', emoji: '🕌', puan: 10 },
            { metin: 'Oruç', emoji: '🌙', puan: 10 },
            { metin: 'Zekat', emoji: '💝', puan: 15 },
        ];
        badItems = [
            { metin: 'Yalan', emoji: '😈', ceza: 5 },
            { metin: 'Gıybet', emoji: '👄', ceza: 5 },
        ];
    }

    const diff = getGameDifficulty(data.grade, 'E31');
    const gameSpeed = diff.speed * (game.veri?.hiz || 1);
    const gameSure = game.veri?.sure || diff.timerSeconds;

    const shell = new GameShell(container, {
        game, data, app,
        config: {
            hasTimer: true,
            timerSeconds: gameSure,
            hasLives: true,
            maxLives: diff.lives,
            hasCombo: true,
            hasPause: true,
        }
    });

    function startGame() {
        shell.renderShell();
        runCatcher();
    }

    function runCatcher() {
        shell.gameArea.innerHTML = '';

        const W = 360, H = 380;
        const canvas = new CanvasGame(shell.gameArea, { width: W, height: H, bgColor: '#0d1b2a' });

        // Sepet / yakalayıcı
        const basket = {
            x: W / 2,
            y: H - 36,
            w: 70,
            h: 32,
            speed: 280,
        };

        // Düşen nesneler havuzu
        const falling = [];
        let spawnTimer = 0;
        const spawnInterval = 1 / (diff.spawnRate * 0.8);

        function spawnItem() {
            const useGood = Math.random() > diff.distractorRatio;
            const pool = useGood ? goodItems : badItems;
            const item = pool[Math.floor(Math.random() * pool.length)];
            falling.push({
                x: 30 + Math.random() * (W - 60),
                y: -30,
                w: 52,
                h: 52,
                speed: (80 + Math.random() * 60) * gameSpeed,
                emoji: item.emoji || (useGood ? '⭐' : '💀'),
                metin: item.metin,
                isGood: useGood,
                puan: item.puan || 10,
                ceza: item.ceza || 5,
            });
        }

        canvas.start(
            (dt) => {
                if (shell.paused) return;

                // Basket hareketi
                if (canvas.keys['ArrowLeft'] || canvas.keys['KeyA']) {
                    basket.x = Math.max(basket.w/2, basket.x - basket.speed * dt);
                }
                if (canvas.keys['ArrowRight'] || canvas.keys['KeyD']) {
                    basket.x = Math.min(W - basket.w/2, basket.x + basket.speed * dt);
                }
                if (canvas.pointer.held) {
                    basket.x += (canvas.pointer.x - basket.x) * 0.2;
                    basket.x = Math.max(basket.w/2, Math.min(W - basket.w/2, basket.x));
                }

                // Nesne spawn
                spawnTimer += dt;
                if (spawnTimer >= spawnInterval) {
                    spawnTimer = 0;
                    spawnItem();
                }

                // Nesne düşüşü + çarpışma
                for (let i = falling.length - 1; i >= 0; i--) {
                    const f = falling[i];
                    f.y += f.speed * dt;

                    // Yere düştü
                    if (f.y > H + 20) {
                        falling.splice(i, 1);
                        if (f.isGood) {
                            // İyi nesne kaçtı
                            playGameSound('miss');
                        }
                        continue;
                    }

                    // Sepet çarpışması
                    const bx1 = basket.x - basket.w/2;
                    const bx2 = basket.x + basket.w/2;
                    const by = basket.y - basket.h/2;
                    if (f.y + f.h/2 >= by && f.y - f.h/2 <= basket.y + basket.h/2
                        && f.x + f.w/2 >= bx1 && f.x - f.w/2 <= bx2) {

                        falling.splice(i, 1);
                        if (f.isGood) {
                            shell.correctAnswer(f.puan);
                            playGameSound('catch');
                            canvas.spawnParticles(f.x, f.y, { count: 8, colors: ['#1dd1a1', '#FECA57'], speed: 80 });
                        } else {
                            const ended = shell.wrongAnswer();
                            playGameSound('miss');
                            canvas.spawnParticles(f.x, f.y, { count: 6, colors: ['#ff6b6b'], speed: 60 });
                            if (ended) { canvas.destroy(); return; }
                        }
                    }
                }
            },
            (ctx) => {
                // Arka plan: yıldızlar
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                for (let i = 0; i < 30; i++) {
                    ctx.fillRect((i*83+7)%W, (i*67+13)%H, 1.5, 1.5);
                }

                // Düşen nesneler
                for (const f of falling) {
                    // Renk halkası
                    ctx.strokeStyle = f.isGood ? '#1dd1a1' : '#ff6b6b';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(f.x, f.y, f.w/2, 0, Math.PI*2);
                    ctx.stroke();
                    ctx.fillStyle = (f.isGood ? '#1dd1a1' : '#ff6b6b') + '22';
                    ctx.fill();

                    drawSprite(ctx, f.emoji, f.x, f.y - 4, 28);

                    // Metin
                    ctx.fillStyle = 'white';
                    ctx.font = '8px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    const display = f.metin.length > 8 ? f.metin.slice(0,7)+'…' : f.metin;
                    ctx.fillText(display, f.x, f.y + 14, f.w);
                }

                // Sepet
                ctx.fillStyle = '#5f27cd';
                ctx.strokeStyle = '#a29bfe';
                ctx.lineWidth = 2;
                const bx = basket.x - basket.w/2;
                const by = basket.y - basket.h/2;
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(bx, by, basket.w, basket.h, 8);
                else ctx.rect(bx, by, basket.w, basket.h);
                ctx.fill();
                ctx.stroke();

                drawSprite(ctx, '🧺', basket.x, basket.y, 30);
            }
        );
    }

    shell.onReplay = () => {
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
