// ===== E25: Kelime Tahmin (Adam Asmaca) =====
// Gizli kelimeyi tahmin et. Her harf tıklaması ile deneme yap.
// 6 yanlış hakkın dolunca oyun biter.

import { GameShell } from './game-shell.js';
import { playGameSound } from './sound-fx.js';
import { getGameDifficulty } from './difficulty.js';

const MAX_WRONG = 6;

// Adam asmaca parçaları (SVG path komutları)
const HANGMAN_PARTS = [
    // Gövde
    { tag: 'line', attrs: 'x1="60" y1="40" x2="60" y2="100" stroke="var(--text-primary)" stroke-width="3" stroke-linecap="round"' },
    // Sol kol
    { tag: 'line', attrs: 'x1="60" y1="60" x2="40" y2="80" stroke="var(--text-primary)" stroke-width="3" stroke-linecap="round"' },
    // Sag kol
    { tag: 'line', attrs: 'x1="60" y1="60" x2="80" y2="80" stroke="var(--text-primary)" stroke-width="3" stroke-linecap="round"' },
    // Sol bacak
    { tag: 'line', attrs: 'x1="60" y1="100" x2="40" y2="125" stroke="var(--text-primary)" stroke-width="3" stroke-linecap="round"' },
    // Sag bacak
    { tag: 'line', attrs: 'x1="60" y1="100" x2="80" y2="125" stroke="var(--text-primary)" stroke-width="3" stroke-linecap="round"' },
    // Bas
    { tag: 'circle', attrs: 'cx="60" cy="32" r="12" stroke="var(--text-primary)" stroke-width="3" fill="none"' },
];

export function renderHangman(container, game, data, app) {
    let words = game.veri?.kelimeler || [];

    // Fallback: kavram_kartlari formatindan donustur
    if (words.length === 0 && game.veri?.kavramlar) {
        words = game.veri.kavramlar.map(k => ({
            kelime: k.terim?.toUpperCase() || '',
            ipucu: k.tanim || k.kategori || '',
            kategori: k.kategori || ''
        }));
    }

    // MCQ formatindan donustur
    if (words.length === 0 && game.veri?.sorular) {
        words = game.veri.sorular
            .filter(s => s.dogru_cevap)
            .map(s => ({
                kelime: (s.dogru_cevap.replace(/^[A-D]\)\s*/, '')).toUpperCase(),
                ipucu: s.soru,
                kategori: ''
            }))
            .filter(w => w.kelime.length >= 3 && w.kelime.length <= 15 && /^[A-ZÇĞIİÖŞÜ\s]+$/.test(w.kelime));
    }

    if (words.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p>Bu oyun icin veri bulunamadi.</p></div>';
        return;
    }

    const diff = getGameDifficulty(data.grade, 'E25');

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

    let wordIndex = 0;
    let wrongCount = 0;
    let guessedLetters = new Set();
    let currentWord = '';
    let currentHint = '';

    function startGame() {
        shell.renderShell();
        nextWord();
    }

    function nextWord() {
        if (wordIndex >= words.length) {
            shell.gameWin();
            return;
        }
        if (shell.finished) return;

        const entry = words[wordIndex];
        currentWord = (entry.kelime || '').toUpperCase().replace(/İ/g, 'İ').replace(/I/g, 'I');
        currentHint = entry.ipucu || entry.kategori || '';
        wrongCount = 0;
        guessedLetters = new Set();
        renderRound();
    }

    function renderRound() {
        shell.gameArea.innerHTML = '';

        const wrap = document.createElement('div');
        wrap.style.cssText = 'padding: 0.5rem;';

        // Ipucu
        const hintDiv = document.createElement('div');
        hintDiv.style.cssText = 'text-align:center; font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem; padding: 0.5rem 1rem; background:var(--bg-secondary); border-radius:12px;';
        hintDiv.innerHTML = `<strong>İpucu:</strong> ${currentHint}`;
        wrap.appendChild(hintDiv);

        // Progress
        const progDiv = document.createElement('div');
        progDiv.style.cssText = 'text-align:center; font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem;';
        progDiv.textContent = `Kelime ${wordIndex + 1} / ${words.length}`;
        wrap.appendChild(progDiv);

        // Adam + Daraga SVG
        const svgDiv = document.createElement('div');
        svgDiv.style.cssText = 'text-align:center; margin-bottom:0.75rem;';
        svgDiv.innerHTML = `
        <svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
            <!-- Daraga -->
            <line x1="10" y1="145" x2="110" y2="145" stroke="var(--text-secondary)" stroke-width="3"/>
            <line x1="30" y1="145" x2="30" y2="5" stroke="var(--text-secondary)" stroke-width="3"/>
            <line x1="30" y1="5" x2="60" y2="5" stroke="var(--text-secondary)" stroke-width="3"/>
            <line x1="60" y1="5" x2="60" y2="20" stroke="var(--text-secondary)" stroke-width="3"/>
            ${HANGMAN_PARTS.slice(0, wrongCount).map(p => `<${p.tag} ${p.attrs}/>`).join('')}
        </svg>`;
        wrap.appendChild(svgDiv);

        // Yanlis saydac
        const wrongDiv = document.createElement('div');
        wrongDiv.style.cssText = 'text-align:center; font-size:0.85rem; margin-bottom:1rem;';
        const hearts = Array.from({length: MAX_WRONG}, (_, i) =>
            `<span style="opacity:${i < wrongCount ? 0.2 : 1};">💀</span>`
        ).join('');
        wrongDiv.innerHTML = `${hearts} <span style="color:var(--text-muted); font-size:0.75rem;">${MAX_WRONG - wrongCount} hak kaldi</span>`;
        wrap.appendChild(wrongDiv);

        // Kelime bosluklari
        const wordDiv = document.createElement('div');
        wordDiv.id = 'hangman-word';
        wordDiv.style.cssText = 'display:flex; justify-content:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:1.5rem;';
        wordDiv.innerHTML = currentWord.split('').map(letter => {
            if (letter === ' ') return '<span style="width:16px; display:inline-block;"></span>';
            const revealed = guessedLetters.has(letter);
            return `<span style="
                display:inline-flex; align-items:center; justify-content:center;
                width:32px; height:40px; border-bottom:3px solid var(--primary);
                font-size:1.2rem; font-weight:700; color:var(--text-primary);
                transition:all 0.3s;
            ">${revealed ? letter : ''}</span>`;
        }).join('');
        wrap.appendChild(wordDiv);

        // Klavye
        const keyboard = document.createElement('div');
        keyboard.id = 'hangman-keyboard';
        keyboard.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; gap:0.3rem; max-width:360px; margin:0 auto;';

        const turkishLetters = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
        turkishLetters.forEach(letter => {
            const btn = document.createElement('button');
            btn.textContent = letter;
            btn.style.cssText = `
                width:36px; height:36px; border:1px solid var(--border);
                background:var(--bg-card); border-radius:8px;
                font-size:0.85rem; font-weight:600; cursor:pointer;
                transition:all 0.15s;
            `;
            if (guessedLetters.has(letter)) {
                const isInWord = currentWord.includes(letter);
                btn.style.background = isInWord ? 'var(--success)' : 'var(--bg-secondary)';
                btn.style.color = isInWord ? 'white' : 'var(--text-muted)';
                btn.style.opacity = '0.5';
                btn.disabled = true;
            }
            btn.addEventListener('click', () => handleLetter(letter));
            keyboard.appendChild(btn);
        });
        wrap.appendChild(keyboard);

        shell.gameArea.appendChild(wrap);
    }

    function handleLetter(letter) {
        if (guessedLetters.has(letter) || shell.finished || shell.paused) return;
        guessedLetters.add(letter);

        if (currentWord.includes(letter)) {
            // Dogru tahmin
            playGameSound('letter');
            shell.correctAnswer(diff.pointsPerCorrect);

            // Kelime tamamlandi mi?
            const allRevealed = currentWord.split('').every(l => l === ' ' || guessedLetters.has(l));
            if (allRevealed) {
                playGameSound('word_found');
                setTimeout(() => {
                    wordIndex++;
                    nextWord();
                }, 700);
                return;
            }
        } else {
            // Yanlis tahmin
            wrongCount++;
            playGameSound('miss');

            if (wrongCount >= MAX_WRONG) {
                // Oyun bitti: bu kelimede yenildi
                const ended = shell.wrongAnswer();
                if (ended) return;
                // Sonraki kelimeye gec
                setTimeout(() => {
                    wordIndex++;
                    nextWord();
                }, 1200);
                return;
            }
        }

        renderRound();
    }

    shell.onReplay = () => {
        wordIndex = 0;
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
