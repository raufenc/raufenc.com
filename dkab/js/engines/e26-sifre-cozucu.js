// ===== E26: Şifre Çözücü =====
// Her harf bir sembol/rakama karşılık gelir.
// İpuçlarından harfleri çözerek gizli mesajı tamamla.

import { GameShell } from './game-shell.js';
import { playGameSound } from './sound-fx.js';
import { getGameDifficulty } from './difficulty.js';

// Şifre karakterleri
const CIPHER_SYMBOLS = ['★', '♦', '●', '▲', '■', '◆', '♠', '♣',
    '✦', '❋', '✿', '❀', '⬡', '⬢', '⬟', '⬠',
    '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

function buildCipher(text) {
    const uniqueLetters = [...new Set(text.toUpperCase().replace(/[^A-ZÇĞIİÖŞÜ]/g, '').split(''))];
    const cipher = {};
    uniqueLetters.forEach((letter, i) => {
        cipher[letter] = CIPHER_SYMBOLS[i % CIPHER_SYMBOLS.length];
    });
    return cipher;
}

export function renderCipherBreaker(container, game, data, app) {
    let puzzles = game.veri?.sifreler || [];

    // Fallback: MCQ sorularından şifre üret
    if (puzzles.length === 0 && game.veri?.sorular) {
        puzzles = game.veri.sorular
            .filter(s => s.dogru_cevap)
            .slice(0, 5)
            .map(s => ({
                sifreli_metin: s.dogru_cevap.replace(/^[A-D]\)\s*/, '').toUpperCase(),
                harf_ipuclari: [],
                cozum: s.dogru_cevap.replace(/^[A-D]\)\s*/, ''),
                soru: s.soru
            }));
    }

    // Fallback: kavram listesinden
    if (puzzles.length === 0 && game.veri?.kavramlar) {
        puzzles = game.veri.kavramlar.slice(0, 5).map(k => ({
            sifreli_metin: k.terim?.toUpperCase() || '',
            harf_ipuclari: [],
            cozum: k.terim,
            soru: k.tanim
        }));
    }

    if (puzzles.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E26');

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

    let puzzleIndex = 0;

    function startGame() {
        shell.renderShell();
        nextPuzzle();
    }

    function nextPuzzle() {
        if (puzzleIndex >= puzzles.length) {
            shell.gameWin();
            return;
        }
        if (shell.finished) return;

        const puzzle = puzzles[puzzleIndex];
        const text = puzzle.sifreli_metin.toUpperCase();
        const cipher = buildCipher(text);
        const revCipher = Object.fromEntries(Object.entries(cipher).map(([k, v]) => [v, k]));

        // Başlangıçta verilen ipucu harfleri
        const revealed = new Set((puzzle.harf_ipuclari || []).map(h => h.harf?.toUpperCase() || h));
        // İlk harfi daima ver
        if (text.length > 0) revealed.add(text[0]);

        shell.gameArea.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.style.cssText = 'padding:0.5rem;';

        // Başlık
        const title = document.createElement('div');
        title.style.cssText = 'text-align:center; margin-bottom:1rem;';
        title.innerHTML = `
            <div class="text-muted" style="font-size:0.75rem;">Şifre ${puzzleIndex + 1} / ${puzzles.length}</div>
            ${puzzle.soru ? `<div style="font-size:0.9rem; font-weight:600; margin-top:0.25rem;">${puzzle.soru}</div>` : ''}
        `;
        wrap.appendChild(title);

        // Şifreli metin gösterimi
        const cipherDiv = document.createElement('div');
        cipherDiv.id = 'cipher-display';
        cipherDiv.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; gap:0.5rem; margin-bottom:1.25rem; min-height:80px;';

        function renderCipherDisplay() {
            cipherDiv.innerHTML = text.split('').map(ch => {
                if (ch === ' ') return '<span style="width:20px; display:inline-block;"></span>';
                const symbol = cipher[ch] || ch;
                const isRevealed = revealed.has(ch);
                return `
                <div style="text-align:center; min-width:36px;">
                    <div style="
                        font-size:1.2rem; font-weight:700; height:40px; line-height:40px;
                        border-bottom:3px solid ${isRevealed ? 'var(--success)' : 'var(--primary)'};
                        color:${isRevealed ? 'var(--success)' : 'var(--text-primary)'};
                    ">${isRevealed ? ch : ''}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">${symbol}</div>
                </div>`;
            }).join('');
        }
        renderCipherDisplay();
        wrap.appendChild(cipherDiv);

        // İpucu tablosu (verilen ipuçları)
        if (puzzle.harf_ipuclari && puzzle.harf_ipuclari.length > 0) {
            const hintTable = document.createElement('div');
            hintTable.style.cssText = 'background:var(--bg-secondary); border-radius:12px; padding:0.75rem; margin-bottom:1rem;';
            hintTable.innerHTML = `<div style="font-size:0.75rem; font-weight:600; color:var(--text-muted); margin-bottom:0.5rem;">İPUÇLARI:</div>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            ${(puzzle.harf_ipuclari || []).map(h => {
                const harf = typeof h === 'object' ? h.harf : h;
                const ipucu = typeof h === 'object' ? h.ipucu : '';
                const sym = cipher[harf?.toUpperCase()] || '?';
                return `<div style="background:var(--bg-card); border-radius:8px; padding:0.3rem 0.6rem; font-size:0.8rem;">
                    <strong>${sym}</strong> = ${harf?.toUpperCase() || '?'} ${ipucu ? `<span class="text-muted">(${ipucu})</span>` : ''}
                </div>`;
            }).join('')}
            </div>`;
            wrap.appendChild(hintTable);
        }

        // Cevap butonu grid: harfler
        const answerLabel = document.createElement('div');
        answerLabel.style.cssText = 'font-size:0.8rem; font-weight:600; color:var(--text-muted); margin-bottom:0.5rem; text-align:center;';
        answerLabel.textContent = 'Harflere tıklayarak şifreyi çöz:';
        wrap.appendChild(answerLabel);

        const letterGrid = document.createElement('div');
        letterGrid.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; gap:0.3rem;';

        // Şifrede geçen unique semboller için buton oluştur
        const uniqueSymbols = [...new Set(text.replace(/ /g, '').split('').map(ch => ({ ch, sym: cipher[ch] }))
            .filter(o => !revealed.has(o.ch))
            .map(o => o.sym))];

        if (uniqueSymbols.length === 0) {
            // Tümü çözüldü
            setTimeout(() => {
                puzzleIndex++;
                nextPuzzle();
            }, 500);
            return;
        }

        uniqueSymbols.forEach(sym => {
            const ch = revCipher[sym];
            const btn = document.createElement('button');
            btn.innerHTML = `<div style="font-size:1.1rem;">${sym}</div><div style="font-size:0.65rem; margin-top:2px;">?</div>`;
            btn.style.cssText = `
                width:52px; height:52px; border:2px solid var(--border);
                background:var(--bg-card); border-radius:10px;
                font-size:0.8rem; cursor:pointer; transition:all 0.15s;
                display:flex; flex-direction:column; align-items:center; justify-content:center;
            `;
            btn.addEventListener('click', () => {
                if (revealed.has(ch)) return;
                // Harf her zaman dogru: oyuncu sembolden harfi öğreniyor
                revealed.add(ch);
                playGameSound('letter');
                shell.correctAnswer(diff.pointsPerCorrect);
                btn.style.background = 'var(--success)';
                btn.style.color = 'white';
                btn.style.borderColor = 'var(--success)';
                btn.querySelector('div:last-child').textContent = ch;
                btn.disabled = true;
                renderCipherDisplay();

                // Hepsi mi cozuldu?
                const allDone = text.replace(/ /g, '').split('').every(c => revealed.has(c));
                if (allDone) {
                    playGameSound('word_found');
                    setTimeout(() => {
                        puzzleIndex++;
                        nextPuzzle();
                    }, 900);
                }
            });
            letterGrid.appendChild(btn);
        });
        wrap.appendChild(letterGrid);
        shell.gameArea.appendChild(wrap);
    }

    shell.onReplay = () => {
        puzzleIndex = 0;
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
