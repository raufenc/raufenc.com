// ===== E33: Bilgi Çarkı (Çarkıfelek) =====
// Canvas çark döner. Durulan kategoriden soru gelir.
// DOM soru paneli ile birlikte çalışır.

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { getGameDifficulty } from './difficulty.js';

const DEFAULT_COLORS = ['#FF6B6B','#48DBFB','#1DD1A1','#FECA57','#FF9FF3','#54A0FF','#FF9F43','#5F27CD'];

export function renderSpinWheel(container, game, data, app) {
    let dilimler = game.veri?.dilimler || [];
    let sorularMap = game.veri?.sorular || {};
    const hakSayisi = game.veri?.hak ?? 8;

    // Fallback: MCQ sorulardan çark oluştur
    if (dilimler.length === 0 && game.veri?.sorular_listesi) {
        // sorular_listesi: [{soru, secenekler, dogru_cevap, kategori}]
    }
    if (dilimler.length === 0 && game.veri?.sorular && Array.isArray(game.veri.sorular)) {
        const questions = game.veri.sorular;
        // Kategorileri çıkar
        const cats = [...new Set(questions.map(q => q.kategori || 'Genel'))].slice(0, 6);
        dilimler = cats.map((cat, i) => ({
            kategori: cat,
            renk: DEFAULT_COLORS[i % DEFAULT_COLORS.length],
            puan: (i + 1) * 50
        }));
        // Her kategoriye soru ata
        sorularMap = {};
        cats.forEach(cat => {
            sorularMap[cat] = questions.filter(q => (q.kategori || 'Genel') === cat);
        });
        // Eğer hepsi 'Genel' ise tüm soruları böl
        if (cats.length === 1 && cats[0] === 'Genel') {
            const chunkSize = Math.ceil(questions.length / 4);
            dilimler = [
                { kategori: 'Kolay', renk: '#1DD1A1', puan: 50 },
                { kategori: 'Orta', renk: '#FECA57', puan: 100 },
                { kategori: 'Zor', renk: '#FF6B6B', puan: 150 },
                { kategori: 'Bonus', renk: '#5F27CD', puan: 200 },
                { kategori: 'İflasss!', renk: '#636e72', puan: -50 },
                { kategori: 'Ekstra', renk: '#48DBFB', puan: 75 },
            ];
            sorularMap = {
                'Kolay': questions.slice(0, chunkSize),
                'Orta': questions.slice(chunkSize, chunkSize*2),
                'Zor': questions.slice(chunkSize*2, chunkSize*3),
                'Bonus': questions.slice(chunkSize*3),
                'İflasss!': [],
                'Ekstra': questions.slice(0, chunkSize),
            };
        }
    }

    if (dilimler.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E33');

    const shell = new GameShell(container, {
        game, data, app,
        config: {
            hasTimer: false,
            hasLives: false,
            hasCombo: false,
            hasPause: false,
        }
    });

    let hakLeft = hakSayisi;
    let spinning = false;
    let currentAngle = 0;
    let targetAngle = 0;
    let spinVelocity = 0;
    let landedIndex = -1;
    let canvasRef = null;

    function startGame() {
        shell.renderShell();
        renderWheel();
    }

    function renderWheel() {
        if (shell.finished) return;
        shell.gameArea.innerHTML = '';

        // Hak sayacı
        const hakDiv = document.createElement('div');
        hakDiv.style.cssText = 'text-align:center; margin-bottom:0.5rem; font-size:0.85rem;';
        hakDiv.innerHTML = `Kalan Hak: <strong>${hakLeft}</strong> / ${hakSayisi}`;
        shell.gameArea.appendChild(hakDiv);

        const canvasWrap = document.createElement('div');
        canvasWrap.style.cssText = 'position:relative;';
        shell.gameArea.appendChild(canvasWrap);

        const W = 300, H = 300;
        canvasRef = new CanvasGame(canvasWrap, { width: W, height: H, bgColor: 'transparent' });

        const CX = W/2, CY = H/2, R = 120;
        const sliceAngle = (Math.PI * 2) / dilimler.length;

        canvasRef.start(
            (dt) => {
                if (spinning) {
                    spinVelocity *= 0.97;
                    currentAngle += spinVelocity * dt;

                    if (spinVelocity < 0.5) {
                        spinning = false;
                        spinVelocity = 0;
                        // Hangi dilimde durdu?
                        const normalized = ((-currentAngle % (Math.PI*2)) + Math.PI*2) % (Math.PI*2);
                        landedIndex = Math.floor(normalized / sliceAngle) % dilimler.length;
                        playGameSound('reveal');
                        setTimeout(() => { showQuestion(landedIndex); }, 500);
                    }
                }

                // Tıklama → çevir
                if (canvasRef.pointer.down && !spinning) {
                    canvasRef.pointer.down = false;
                    if (hakLeft > 0) {
                        spinVelocity = 15 + Math.random() * 10;
                        spinning = true;
                        playGameSound('spin');
                    }
                }
            },
            (ctx) => {
                // Çark dilimler
                dilimler.forEach((d, i) => {
                    const startA = i * sliceAngle + currentAngle;
                    const endA = startA + sliceAngle;

                    ctx.beginPath();
                    ctx.moveTo(CX, CY);
                    ctx.arc(CX, CY, R, startA, endA);
                    ctx.closePath();
                    ctx.fillStyle = d.renk;
                    ctx.fill();
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Metin
                    ctx.save();
                    ctx.translate(CX, CY);
                    ctx.rotate(startA + sliceAngle / 2);
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 9px Inter, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';
                    const label = d.kategori.length > 9 ? d.kategori.slice(0,8)+'…' : d.kategori;
                    ctx.fillText(label, R - 8, 0);
                    if (d.puan > 0) {
                        ctx.font = '8px Inter, sans-serif';
                        ctx.fillStyle = 'rgba(255,255,255,0.8)';
                        ctx.fillText(`+${d.puan}`, R - 8, 10);
                    }
                    ctx.restore();
                });

                // Merkez çember
                ctx.beginPath();
                ctx.arc(CX, CY, 18, 0, Math.PI*2);
                ctx.fillStyle = '#2d3436';
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Merkez ikon
                ctx.fillStyle = 'white';
                ctx.font = spinning ? '14px serif' : 'bold 14px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(spinning ? '🌀' : '▶', CX, CY);

                // Gösterge (üst ok)
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.moveTo(CX, CY - R - 5);
                ctx.lineTo(CX - 10, CY - R - 22);
                ctx.lineTo(CX + 10, CY - R - 22);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#e17055';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Alt bilgi
                ctx.fillStyle = spinning ? '#74b9ff' : (hakLeft > 0 ? '#1dd1a1' : '#ff6b6b');
                ctx.font = 'bold 12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    spinning ? '🌀 Dönüyor...' : (hakLeft > 0 ? '👆 Çarka tıkla!' : '🏁 Bitti!'),
                    CX, H - 12
                );
            }
        );

        // Soru alanı (canvas altında)
        const qArea = document.createElement('div');
        qArea.id = 'wheel-q-area';
        qArea.style.cssText = 'margin-top:0.5rem; padding:0 0.25rem; min-height:60px;';
        shell.gameArea.appendChild(qArea);
    }

    function showQuestion(idx) {
        if (shell.finished) return;

        const dilim = dilimler[idx];
        hakLeft--;

        // İflas?
        if ((dilim.puan || 0) < 0 || dilim.kategori.toLowerCase().includes('iflas')) {
            shell.score = Math.max(0, shell.score - Math.abs(dilim.puan || 50));
            shell._updateHUD?.();
            const qArea = document.getElementById('wheel-q-area');
            if (qArea) {
                qArea.innerHTML = `<div style="text-align:center; padding:1rem; background:#ff6b6b22; border-radius:12px;">
                    <div style="font-size:2rem;">💸</div>
                    <div style="font-weight:600; color:#ff6b6b;">İflas! ${dilim.puan} puan</div>
                </div>`;
            }
            if (hakLeft <= 0) setTimeout(() => { shell.gameWin(); }, 1200);
            return;
        }

        // Kategori soruları
        const catSorular = sorularMap[dilim.kategori] || [];
        if (catSorular.length === 0) {
            const qArea = document.getElementById('wheel-q-area');
            if (qArea) {
                qArea.innerHTML = `<div style="text-align:center; padding:1rem; background:${dilim.renk}22; border-radius:12px;">
                    <div style="font-size:1rem; font-weight:600;">${dilim.kategori}: +${dilim.puan} Bonus Puan!</div>
                </div>`;
                shell.correctAnswer(dilim.puan);
            }
            if (hakLeft <= 0) setTimeout(() => { shell.gameWin(); }, 1200);
            return;
        }

        const q = catSorular[Math.floor(Math.random() * catSorular.length)];
        const correct = (q.dogru_cevap || '').replace(/^[A-D]\)\s*/, '');
        const opts = shuffle([correct, ...(q.secenekler || [])
            .map(o => o.replace(/^[A-D]\)\s*/, ''))
            .filter(o => o !== correct)
            .slice(0, 3)
        ]);

        const qArea = document.getElementById('wheel-q-area');
        if (!qArea) return;

        qArea.innerHTML = `
        <div style="background:${dilim.renk}22; border:2px solid ${dilim.renk}; border-radius:12px; padding:0.75rem;">
            <div style="font-size:0.75rem; font-weight:700; color:${dilim.renk}; margin-bottom:0.25rem;">${dilim.kategori} — ${dilim.puan} PUAN</div>
            <div style="font-size:0.9rem; font-weight:600; margin-bottom:0.75rem;">${q.soru}</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.35rem;">
                ${opts.map(opt => `
                    <button class="wheel-opt" data-opt="${opt}" style="
                        padding:0.45rem; border-radius:8px; border:1px solid ${dilim.renk}40;
                        background:var(--bg-card); cursor:pointer; font-size:0.8rem;
                        min-height:40px; transition:all 0.15s;
                    ">${opt}</button>
                `).join('')}
            </div>
        </div>`;

        qArea.querySelectorAll('.wheel-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                const chosen = btn.dataset.opt;
                const isCorrect = chosen === correct;

                qArea.querySelectorAll('.wheel-opt').forEach(b => {
                    b.disabled = true;
                    if (b.dataset.opt === correct) b.style.background = '#1dd1a1';
                    else if (b === btn && !isCorrect) b.style.background = '#ff6b6b';
                });

                if (isCorrect) {
                    shell.correctAnswer(dilim.puan);
                    playGameSound('catch');
                } else {
                    playGameSound('miss');
                }

                if (hakLeft <= 0) {
                    setTimeout(() => { shell.gameWin(); }, 1200);
                } else {
                    // Devam et: soru alanını temizle
                    setTimeout(() => {
                        if (qArea) qArea.innerHTML = `<div style="text-align:center; color:var(--text-muted); font-size:0.85rem; padding:0.75rem;">👆 Tekrar çevir!</div>`;
                    }, 1200);
                }
            });
        });
    }

    shell.onReplay = () => {
        hakLeft = hakSayisi;
        spinning = false;
        currentAngle = 0;
        spinVelocity = 0;
        shell.score = 0;
        shell.correct = 0;
        shell.wrong = 0;
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
