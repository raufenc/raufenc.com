// ===== E35: Sürpriz Kutu =====
// Hediye kutularından birini seç. Kapak CSS 3D ile açılır.
// İçinden soru, bonus XP veya joker çıkabilir!

import { GameShell } from './game-shell.js';
import { playGameSound } from './sound-fx.js';
import { getGameDifficulty } from './difficulty.js';
import { getCorrectText, getWrongTexts, shuffle } from './engine-utils.js';

export function renderSurpriseBox(container, game, data, app) {
    let kutular = game.veri?.kutular || [];

    // Fallback: MCQ sorulardan kutu oluştur
    if (kutular.length === 0 && game.veri?.sorular) {
        const sorular = shuffle([...game.veri.sorular]).slice(0, 8);
        kutular = sorular.map((s, i) => ({
            tip: i === 0 ? 'bonus' : i === 1 ? 'joker' : 'soru',
            icerik: i === 0 ? { bonus_xp: 25 }
                : i === 1 ? { yardim: 'İki yanlış seçenek elenir' }
                : {
                    soru: s.soru,
                    secenekler: s.secenekler || [],
                    dogru_cevap: s.dogru_cevap || ''
                }
        }));
    }

    if (kutular.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E35');

    const shell = new GameShell(container, {
        game, data, app,
        config: {
            hasTimer: false,
            hasLives: true,
            maxLives: diff.lives,
            hasCombo: true,
            hasPause: false,
        }
    });

    let kutularState = kutular.map((k, i) => ({ ...k, id: i, opened: false }));
    let jokerUsed = false;

    function startGame() {
        shell.renderShell();
        renderGrid();
    }

    function renderGrid() {
        if (shell.finished) return;
        shell.gameArea.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.style.cssText = 'padding:0.5rem;';

        const title = document.createElement('div');
        title.style.cssText = 'text-align:center; font-size:0.9rem; font-weight:600; margin-bottom:1rem; color:var(--text-secondary);';
        const remaining = kutularState.filter(k => !k.opened).length;
        title.innerHTML = `🎁 Bir kutu seç! <span style="color:var(--text-muted); font-size:0.8rem;">(${remaining} kutu kaldı)</span>`;
        wrap.appendChild(title);

        const grid = document.createElement('div');
        grid.style.cssText = `
            display:grid;
            grid-template-columns:repeat(3, 1fr);
            gap:0.75rem;
            max-width:320px; margin:0 auto;
        `;

        const BOX_EMOJIS = ['🎁', '🎀', '🎊', '🎉', '📦', '🎈', '💝', '🎁', '🎀'];

        kutularState.forEach((kutu, i) => {
            const cardWrap = document.createElement('div');
            cardWrap.style.cssText = 'perspective:600px;';

            const card = document.createElement('div');
            card.style.cssText = `
                width:100%; aspect-ratio:1; position:relative;
                transform-style:preserve-3d; transition:transform 0.6s ease;
                cursor:${kutu.opened ? 'default' : 'pointer'};
            `;

            // Ön yüz (kapalı kutu)
            const front = document.createElement('div');
            front.style.cssText = `
                position:absolute; inset:0; backface-visibility:hidden;
                background:${kutu.opened ? 'var(--bg-secondary)' : 'linear-gradient(135deg,#6C63FF,#ff6584)'};
                border-radius:16px;
                display:flex; align-items:center; justify-content:center;
                flex-direction:column; gap:0.2rem;
                box-shadow:${kutu.opened ? 'none' : '0 4px 15px rgba(108,99,255,0.3)'};
                transition:all 0.3s;
            `;
            front.innerHTML = kutu.opened
                ? `<span style="font-size:1.5rem; opacity:0.3;">✓</span>`
                : `<span style="font-size:2rem;">${BOX_EMOJIS[i % BOX_EMOJIS.length]}</span>
                   <span style="font-size:0.7rem; color:rgba(255,255,255,0.8);">${i+1}. Kutu</span>`;

            // Arka yüz (içerik)
            const back = document.createElement('div');
            back.style.cssText = `
                position:absolute; inset:0; backface-visibility:hidden;
                transform:rotateY(180deg);
                background:linear-gradient(135deg,#FECA57,#FF9F43);
                border-radius:16px;
                display:flex; align-items:center; justify-content:center;
                font-size:1.5rem;
            `;
            back.innerHTML = kutu.tip === 'bonus' ? '⭐' : kutu.tip === 'joker' ? '🃏' : '❓';

            card.appendChild(front);
            card.appendChild(back);
            cardWrap.appendChild(card);

            if (!kutu.opened) {
                cardWrap.addEventListener('click', () => {
                    // 3D flip animasyonu
                    card.style.transform = 'rotateY(180deg)';
                    playGameSound('reveal');
                    kutu.opened = true;

                    setTimeout(() => {
                        handleKutu(kutu, cardWrap);
                    }, 700);
                });
            }

            grid.appendChild(cardWrap);
        });

        wrap.appendChild(grid);
        shell.gameArea.appendChild(wrap);

        // Soru alanı
        const qArea = document.createElement('div');
        qArea.id = 'surpriz-q-area';
        qArea.style.cssText = 'margin-top:1rem; padding:0 0.25rem;';
        shell.gameArea.appendChild(qArea);

        if (kutularState.every(k => k.opened)) {
            setTimeout(() => { shell.gameWin(); }, 800);
        }
    }

    function handleKutu(kutu, cardWrap) {
        if (shell.finished) return;
        const qArea = document.getElementById('surpriz-q-area');

        if (kutu.tip === 'bonus') {
            const bonusXP = kutu.icerik?.bonus_xp || 20;
            shell.correctAnswer(bonusXP);
            playGameSound('combo');
            if (qArea) {
                qArea.innerHTML = `
                <div style="text-align:center; padding:1.5rem; background:linear-gradient(135deg,#FECA57,#FF9F43); border-radius:16px; color:white;">
                    <div style="font-size:2.5rem;">⭐</div>
                    <div style="font-size:1.2rem; font-weight:800; margin-top:0.5rem;">+${bonusXP} Bonus Puan!</div>
                </div>`;
            }
            checkAllOpened();

        } else if (kutu.tip === 'joker') {
            if (qArea) {
                qArea.innerHTML = `
                <div style="text-align:center; padding:1.5rem; background:linear-gradient(135deg,#6C63FF,#ff6584); border-radius:16px; color:white;">
                    <div style="font-size:2.5rem;">🃏</div>
                    <div style="font-size:1rem; font-weight:700; margin-top:0.5rem;">Joker kazandın!</div>
                    <div style="font-size:0.85rem; opacity:0.9; margin-top:0.25rem;">${kutu.icerik?.yardim || 'Bir sonraki soruda yardım alırsın!'}</div>
                    <button id="joker-devam" style="margin-top:0.75rem; background:white; color:#6C63FF; border:none; padding:0.5rem 1.5rem; border-radius:20px; font-weight:700; cursor:pointer;">Devam Et →</button>
                </div>`;
            }
            document.getElementById('joker-devam')?.addEventListener('click', () => {
                jokerUsed = true;
                if (qArea) qArea.innerHTML = '';
                checkAllOpened();
            });

        } else {
            // Soru tipi
            const icerik = kutu.icerik || {};
            const correct = getCorrectText(icerik);
            let opts = shuffle([correct, ...getWrongTexts(icerik, correct)
                .slice(0, 3)
            ]);

            // Joker: 2 yanlış seçenek elenir
            if (jokerUsed) {
                const wrongOpts = opts.filter(o => o !== correct);
                const eliminate = shuffle(wrongOpts).slice(0, 2);
                opts = opts.filter(o => !eliminate.includes(o) || o === correct);
                jokerUsed = false;
            }

            if (qArea) {
                qArea.innerHTML = `
                <div style="background:var(--bg-secondary); border-radius:14px; padding:0.75rem;">
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">🎁 Kutu Sorusu</div>
                    <div style="font-size:0.9rem; font-weight:600; margin-bottom:0.75rem;">${icerik.soru || '?'}</div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.35rem;">
                        ${opts.map(opt => `
                            <button class="surpriz-opt" data-opt="${opt}" style="
                                padding:0.5rem; border-radius:9px; border:2px solid var(--border);
                                background:var(--bg-card); cursor:pointer; font-size:0.82rem;
                                min-height:44px; transition:all 0.15s;
                            ">${opt}</button>
                        `).join('')}
                    </div>
                </div>`;

                qArea.querySelectorAll('.surpriz-opt').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const chosen = btn.dataset.opt;
                        const isCorrect = chosen === correct;

                        qArea.querySelectorAll('.surpriz-opt').forEach(b => {
                            b.disabled = true;
                            if (b.dataset.opt === correct) b.style.background = '#1dd1a1';
                            else if (b === btn && !isCorrect) b.style.background = '#ff6b6b';
                        });

                        if (isCorrect) {
                            shell.correctAnswer(diff.pointsPerCorrect);
                            playGameSound('catch');
                        } else {
                            const ended = shell.wrongAnswer();
                            playGameSound('miss');
                            if (ended) return;
                        }

                        setTimeout(() => {
                            if (qArea) qArea.innerHTML = '';
                            checkAllOpened();
                        }, 1000);
                    });
                });
            }
        }
    }

    function checkAllOpened() {
        if (kutularState.every(k => k.opened)) {
            setTimeout(() => { shell.gameWin(); }, 800);
        }
    }

    shell.onReplay = () => {
        kutularState = kutular.map((k, i) => ({ ...k, id: i, opened: false }));
        jokerUsed = false;
        shell.score = 0;
        shell.correct = 0;
        shell.wrong = 0;
        shell.combo = 0;
        shell.lives = shell.maxLives;
        shell.finished = false;
        shell.paused = false;
        startGame();
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
