// ===== E36: Kelime Avı (Word Search) =====
// Harf tablosunda gizlenmiş dini terimleri bul.
// Parmakla/fare ile harflerin üzerinden geçerek seç.

import { GameShell } from './game-shell.js';
import { CanvasGame } from './canvas-core.js';
import { playGameSound } from './sound-fx.js';
import { getGameDifficulty } from './difficulty.js';
import { getCorrectText } from './engine-utils.js';

const TURKISH_LETTERS = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';

export function renderWordSearch(container, game, data, app) {
    let kelimeler = game.veri?.kelimeler || [];
    const gridBoyut = game.veri?.grid_boyut || 8;

    // Fallback: kavram listesinden
    if (kelimeler.length === 0 && game.veri?.kavramlar) {
        kelimeler = game.veri.kavramlar.slice(0, 8).map(k => ({
            kelime: (k.terim || '').toUpperCase(),
            ipucu: k.tanim || k.kategori || ''
        }));
    }

    // Fallback: soru cevaplarından
    if (kelimeler.length === 0 && game.veri?.sorular) {
        kelimeler = game.veri.sorular
            .filter(s => s.dogru_cevap)
            .slice(0, 8)
            .map(s => ({
                kelime: getCorrectText(s).toUpperCase(),
                ipucu: s.soru
            }))
            .filter(k => k.kelime.length >= 3 && k.kelime.length <= gridBoyut - 1);
    }

    kelimeler = kelimeler.filter(k => k.kelime && k.kelime.length >= 3 && k.kelime.length <= gridBoyut);

    if (kelimeler.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E36');

    const shell = new GameShell(container, {
        game, data, app,
        config: {
            hasTimer: true,
            timerSeconds: diff.timerSeconds,
            hasLives: false,
            hasCombo: false,
            hasPause: true,
        }
    });

    // Grid oluştur
    const N = gridBoyut;
    let grid = Array.from({ length: N }, () => Array(N).fill(''));
    const placedWords = [];
    const foundWords = new Set();

    function buildGrid() {
        // Her kelimeyi yerleştir
        const directions = [
            [0, 1], [1, 0], [1, 1], // yatay, dikey, çapraz
        ];

        for (const k of kelimeler) {
            const word = k.kelime.replace(/\s+/g, '').toUpperCase();
            if (!word) continue;
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 50) {
                attempts++;
                const dir = directions[Math.floor(Math.random() * directions.length)];
                const maxRow = N - dir[0] * (word.length - 1);
                const maxCol = N - dir[1] * (word.length - 1);
                if (maxRow <= 0 || maxCol <= 0) continue;
                const row = Math.floor(Math.random() * maxRow);
                const col = Math.floor(Math.random() * maxCol);

                // Çakışma kontrolü
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    const r = row + dir[0] * i;
                    const c = col + dir[1] * i;
                    if (grid[r][c] && grid[r][c] !== word[i]) {
                        canPlace = false;
                        break;
                    }
                }

                if (canPlace) {
                    const cells = [];
                    for (let i = 0; i < word.length; i++) {
                        const r = row + dir[0] * i;
                        const c = col + dir[1] * i;
                        grid[r][c] = word[i];
                        cells.push([r, c]);
                    }
                    placedWords.push({ kelime: word, cells, ipucu: k.ipucu });
                    placed = true;
                }
            }
        }

        // Boşları doldur
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (!grid[r][c]) {
                    grid[r][c] = TURKISH_LETTERS[Math.floor(Math.random() * TURKISH_LETTERS.length)];
                }
            }
        }
    }

    buildGrid();

    function startGame() {
        shell.renderShell();
        renderWordSearchGame();
    }

    function renderWordSearchGame() {
        shell.gameArea.innerHTML = '';

        // Kelime listesi
        const wordListDiv = document.createElement('div');
        wordListDiv.id = 'word-list';
        wordListDiv.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.3rem; margin-bottom:0.75rem;';
        updateWordList(wordListDiv);
        shell.gameArea.appendChild(wordListDiv);

        const canvasWrap = document.createElement('div');
        canvasWrap.style.cssText = 'position:relative;';
        shell.gameArea.appendChild(canvasWrap);

        // Canvas boyutu: responsive
        const maxW = Math.min(container.clientWidth - 32, 380);
        const cellSize = Math.floor(maxW / N);
        const W = cellSize * N;
        const H = cellSize * N;

        const canvas = new CanvasGame(canvasWrap, { width: W, height: H, bgColor: '#1a1a2e' });

        // Seçim durumu
        let selecting = false;
        let selStart = null;
        let selEnd = null;
        let selCells = [];
        const highlightedRanges = []; // { cells, color }

        const FOUND_COLORS = ['#FF6B6B', '#48DBFB', '#1DD1A1', '#FECA57', '#FF9FF3', '#54A0FF'];

        function getCellFromPos(x, y) {
            const col = Math.floor(x / cellSize);
            const row = Math.floor(y / cellSize);
            if (row < 0 || row >= N || col < 0 || col >= N) return null;
            return [row, col];
        }

        function getCellsBetween(start, end) {
            if (!start || !end) return [];
            const dr = Math.sign(end[0] - start[0]);
            const dc = Math.sign(end[1] - start[1]);
            const cells = [];
            let r = start[0], c = start[1];
            // Sadece yatay, dikey veya çapraz
            const rowDiff = Math.abs(end[0] - start[0]);
            const colDiff = Math.abs(end[1] - start[1]);
            if (dr !== 0 && dc !== 0 && rowDiff !== colDiff) {
                // Diagonal ama eşit değil - sadece dominant yön
                if (rowDiff > colDiff) {
                    // Dikey
                    for (let i = 0; i <= rowDiff; i++) cells.push([start[0] + dr*i, start[1]]);
                } else {
                    // Yatay
                    for (let i = 0; i <= colDiff; i++) cells.push([start[0], start[1] + dc*i]);
                }
                return cells;
            }
            const steps = Math.max(rowDiff, colDiff);
            for (let i = 0; i <= steps; i++) {
                cells.push([r + dr*i, c + dc*i]);
            }
            return cells;
        }

        function checkWord(cells) {
            const word = cells.map(([r, c]) => grid[r][c]).join('');
            const revWord = [...word].reverse().join('');
            for (const pw of placedWords) {
                if (foundWords.has(pw.kelime)) continue;
                if (pw.kelime === word || pw.kelime === revWord) {
                    return pw;
                }
            }
            return null;
        }

        canvas.start(
            (dt) => {
                if (shell.paused) return;

                const px = canvas.pointer.x;
                const py = canvas.pointer.y;

                if (canvas.pointer.down) {
                    canvas.pointer.down = false;
                    selStart = getCellFromPos(px, py);
                    selEnd = selStart;
                    selecting = true;
                    selCells = selStart ? [selStart] : [];
                }

                if (selecting && canvas.pointer.held) {
                    selEnd = getCellFromPos(px, py);
                    selCells = getCellsBetween(selStart, selEnd);
                }

                if (selecting && !canvas.pointer.held && selCells.length > 0) {
                    selecting = false;
                    const found = checkWord(selCells);
                    if (found) {
                        foundWords.add(found.kelime);
                        highlightedRanges.push({
                            cells: [...selCells],
                            color: FOUND_COLORS[foundWords.size % FOUND_COLORS.length]
                        });
                        shell.correctAnswer(diff.pointsPerCorrect * 2);
                        playGameSound('word_found');

                        // Kelime listesini güncelle
                        const wl = document.getElementById('word-list');
                        if (wl) updateWordList(wl);

                        // Hepsi bulundu mu?
                        if (foundWords.size >= placedWords.length) {
                            setTimeout(() => { shell.gameWin(); }, 800);
                        }
                    }
                    selCells = [];
                    selStart = null;
                    selEnd = null;
                }
            },
            (ctx) => {
                // Grid arkaplanı
                ctx.fillStyle = '#1a1a2e';
                ctx.fillRect(0, 0, W, H);

                // Bulunan kelimeleri vurgula
                for (const range of highlightedRanges) {
                    ctx.fillStyle = range.color + '50';
                    for (const [r, c] of range.cells) {
                        ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
                    }
                }

                // Aktif seçim
                if (selCells.length > 0) {
                    ctx.fillStyle = '#FECA5760';
                    for (const [r, c] of selCells) {
                        ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
                    }
                }

                // Izgara çizgiler
                ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                ctx.lineWidth = 0.5;
                for (let i = 0; i <= N; i++) {
                    ctx.beginPath();
                    ctx.moveTo(i * cellSize, 0); ctx.lineTo(i * cellSize, H);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(0, i * cellSize); ctx.lineTo(W, i * cellSize);
                    ctx.stroke();
                }

                // Harfler
                const fontSize = Math.max(10, Math.min(cellSize * 0.55, 18));
                ctx.font = `bold ${fontSize}px Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                for (let r = 0; r < N; r++) {
                    for (let c = 0; c < N; c++) {
                        const letter = grid[r][c];
                        if (!letter) continue;

                        // Bulunan harf mi?
                        const isFound = highlightedRanges.some(range =>
                            range.cells.some(([fr, fc]) => fr === r && fc === c)
                        );
                        const isSelected = selCells.some(([sr, sc]) => sr === r && sc === c);

                        ctx.fillStyle = isFound ? 'white' : isSelected ? '#FFD700' : 'rgba(255,255,255,0.7)';
                        ctx.fillText(letter, c * cellSize + cellSize/2, r * cellSize + cellSize/2);
                    }
                }
            }
        );
    }

    function updateWordList(div) {
        div.innerHTML = placedWords.map(pw => {
            const found = foundWords.has(pw.kelime);
            return `<span style="
                padding:0.2rem 0.5rem; border-radius:20px; font-size:0.75rem;
                background:${found ? '#1DD1A1' : 'var(--bg-secondary)'};
                color:${found ? 'white' : 'var(--text-secondary)'};
                text-decoration:${found ? 'line-through' : 'none'};
                transition:all 0.3s; font-weight:500;
            " title="${pw.ipucu || ''}">${found ? '✓' : '○'} ${pw.kelime}</span>`;
        }).join('');
    }

    shell.onReplay = () => {
        foundWords.clear();
        shell.score = 0;
        shell.correct = 0;
        shell.wrong = 0;
        shell.timeLeft = shell.timerSeconds;
        shell.finished = false;
        shell.paused = false;
        startGame();
    };

    shell.onTimeUp = () => { shell.gameWin(); };

    startGame();
}
