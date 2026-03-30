// ===== E32: Bilgi Yarışması (Jeopardy Panosu) =====
// 5 kategori × 4 puan seviyesi. Her hücre bir soru.
// Tamamlayınca bonus soru!

import { GameShell } from './game-shell.js';
import { playGameSound } from './sound-fx.js';
import { getGameDifficulty } from './difficulty.js';

const PUAN_SEVIYELERI = [100, 200, 300, 400];

export function renderJeopardy(container, game, data, app) {
    let kategoriler = game.veri?.kategoriler || [];

    // Fallback: MCQ sorulardan Jeopardy üret
    if (kategoriler.length === 0 && game.veri?.sorular) {
        const sorular = game.veri.sorular;
        const perCat = Math.ceil(sorular.length / 4);
        kategoriler = [
            { ad: 'Sorular', sorular: sorular.slice(0, perCat).map((s, i) => ({
                puan: PUAN_SEVIYELERI[i] || 100,
                soru: s.soru,
                secenekler: s.secenekler || [],
                dogru_cevap: s.dogru_cevap || ''
            })) }
        ];
        // Doldur
        if (sorular.length > perCat) {
            kategoriler.push({ ad: 'Kavramlar', sorular: sorular.slice(perCat, perCat*2).map((s, i) => ({
                puan: PUAN_SEVIYELERI[i] || 100,
                soru: s.soru,
                secenekler: s.secenekler || [],
                dogru_cevap: s.dogru_cevap || ''
            })) });
        }
    }

    if (kategoriler.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E32');

    const shell = new GameShell(container, {
        game, data, app,
        config: {
            hasTimer: true,
            timerSeconds: diff.timerSeconds + 60,
            hasLives: true,
            maxLives: diff.lives,
            hasCombo: false,
            hasPause: true,
        }
    });

    // Her hücre durumu
    const answered = {};
    let activeCell = null;

    function startGame() {
        shell.renderShell();
        renderBoard();
    }

    function renderBoard() {
        if (shell.finished) return;
        shell.gameArea.innerHTML = '';

        const boardDiv = document.createElement('div');
        boardDiv.style.cssText = 'overflow-x:auto;';

        const table = document.createElement('div');
        table.style.cssText = `
            display:grid;
            grid-template-columns: repeat(${kategoriler.length}, 1fr);
            gap: 4px;
            min-width: ${kategoriler.length * 80}px;
        `;

        // Başlık satırı
        kategoriler.forEach(kat => {
            const head = document.createElement('div');
            head.style.cssText = `
                background: linear-gradient(135deg, #4834d4, #686de0);
                color:white; padding:0.5rem 0.25rem;
                text-align:center; border-radius:8px;
                font-size:0.7rem; font-weight:700; min-height:40px;
                display:flex; align-items:center; justify-content:center;
            `;
            head.textContent = kat.ad;
            table.appendChild(head);
        });

        // Puan satırları
        PUAN_SEVIYELERI.forEach(puan => {
            kategoriler.forEach((kat, ki) => {
                const soruIdx = kat.sorular?.findIndex(s => s.puan === puan);
                const soru = soruIdx >= 0 ? kat.sorular[soruIdx] : null;
                const cellId = `${ki}_${puan}`;
                const isDone = answered[cellId];

                const cell = document.createElement('button');
                cell.style.cssText = `
                    background: ${isDone ? 'var(--bg-secondary)' : 'linear-gradient(135deg, #0f3460, #16213e)'};
                    color: ${isDone ? 'var(--text-muted)' : '#FFD700'};
                    border: none; padding:0.6rem 0.25rem;
                    text-align:center; border-radius:8px;
                    font-size:${isDone ? '1rem' : '1.1rem'}; font-weight:800;
                    cursor:${isDone || !soru ? 'default' : 'pointer'};
                    transition:all 0.15s; min-height:48px;
                    ${!isDone && soru ? 'box-shadow:0 2px 8px rgba(0,0,0,0.3);' : ''}
                `;
                cell.textContent = isDone ? '✓' : (soru ? `${puan}` : '-');

                if (!isDone && soru) {
                    cell.addEventListener('click', () => showQuestion(cellId, soru, puan));
                }
                table.appendChild(cell);
            });
        });

        boardDiv.appendChild(table);
        shell.gameArea.appendChild(boardDiv);

        // Toplam puan gösterimi
        const totalPossible = kategoriler.reduce((sum, k) => sum + (k.sorular || []).reduce((s, q) => s + (q.puan || 0), 0), 0);
        const pct = totalPossible > 0 ? Math.round((shell.score / totalPossible) * 100) : 0;
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = 'text-align:center; margin-top:0.75rem; font-size:0.8rem; color:var(--text-muted);';
        infoDiv.textContent = `Puan: ${shell.score} / ${totalPossible} (${pct}%)`;
        shell.gameArea.appendChild(infoDiv);

        // Tüm sorular yanıtlandı mı?
        const totalCells = kategoriler.reduce((sum, k) => sum + (k.sorular || []).length, 0);
        if (Object.keys(answered).length >= totalCells) {
            setTimeout(() => { shell.gameWin(); }, 600);
        }
    }

    function showQuestion(cellId, soru, puan) {
        if (shell.finished || shell.paused) return;
        activeCell = cellId;
        shell.gameArea.innerHTML = '';

        const correct = (soru.dogru_cevap || '').replace(/^[A-D]\)\s*/, '');
        const opts = shuffle([correct, ...(soru.secenekler || [])
            .map(o => o.replace(/^[A-D]\)\s*/, ''))
            .filter(o => o !== correct)
            .slice(0, 3)
        ]);

        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'padding: 0.5rem;';
        questionDiv.innerHTML = `
        <div style="
            background:linear-gradient(135deg,#4834d4,#686de0);
            color:white; padding:1rem; border-radius:12px;
            text-align:center; margin-bottom:1rem;
        ">
            <div style="font-size:1.5rem; font-weight:800; color:#FFD700; margin-bottom:0.25rem;">${puan} PUAN</div>
            <div style="font-size:0.95rem; line-height:1.5;">${soru.soru}</div>
        </div>
        <div id="jeopardy-opts" style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            ${opts.map(opt => `
                <button class="jeopardy-opt" data-opt="${opt}" style="
                    padding:0.65rem 0.5rem; border-radius:10px;
                    border:2px solid var(--border); background:var(--bg-card);
                    cursor:pointer; font-size:0.85rem; min-height:50px;
                    transition:all 0.2s; font-weight:500;
                ">${opt}</button>
            `).join('')}
        </div>
        <button id="jeopardy-back" style="
            margin-top:0.75rem; width:100%; padding:0.5rem;
            background:var(--bg-secondary); border:none; border-radius:10px;
            cursor:pointer; font-size:0.85rem; color:var(--text-muted);
        ">← Panoya Dön</button>`;

        shell.gameArea.appendChild(questionDiv);

        shell.gameArea.querySelectorAll('.jeopardy-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                const chosen = btn.dataset.opt;
                const isCorrect = chosen === correct;

                shell.gameArea.querySelectorAll('.jeopardy-opt').forEach(b => {
                    b.disabled = true;
                    if (b.dataset.opt === correct) b.style.background = '#1dd1a1';
                    else if (b === btn && !isCorrect) b.style.background = '#ff6b6b';
                });

                answered[cellId] = true;

                if (isCorrect) {
                    shell.correctAnswer(puan);
                    playGameSound('catch');
                } else {
                    shell.wrongAnswer();
                    playGameSound('miss');
                }

                setTimeout(() => { renderBoard(); }, 1200);
            });
        });

        document.getElementById('jeopardy-back')?.addEventListener('click', () => {
            answered[cellId] = true; // Cevapsız bırakıldı = geçildi
            renderBoard();
        });
    }

    shell.onReplay = () => {
        Object.keys(answered).forEach(k => delete answered[k]);
        shell.score = 0;
        shell.correct = 0;
        shell.wrong = 0;
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
