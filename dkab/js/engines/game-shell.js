// ===== GameShell: Ortak Oyun Altyapisi =====
// Timer, can (hearts), skor, combo, durdurma, sonuc ekrani
// Her yeni motor (E25-E36) bu kabuyu kullanir.

import { store } from '../store.js?v=13';
import { showConfetti, showXpPopup, playSound } from '../components/effects.js?v=13';

const STAR_THRESHOLDS = [0.9, 0.7, 0.5]; // 3, 2, 1 yildiz

export class GameShell {
    /**
     * @param {HTMLElement} container - Oyunun renderlanacagi DOM konteyner
     * @param {Object} opts
     * @param {Object} opts.game - oyun_bankasi'ndan gelen oyun objesi
     * @param {Object} opts.data - { grade, unitId, chapterId }
     * @param {Object} opts.app - uygulama referansi
     * @param {Object} opts.config
     * @param {boolean} opts.config.hasTimer
     * @param {number}  opts.config.timerSeconds
     * @param {boolean} opts.config.hasLives
     * @param {number}  opts.config.maxLives
     * @param {boolean} opts.config.hasCombo
     * @param {boolean} opts.config.hasPause
     */
    constructor(container, { game, data, app, config = {} }) {
        this.container = container;
        this.game = game;
        this.data = data;
        this.app = app;

        // Config defaults
        this.hasTimer = config.hasTimer ?? false;
        this.timerSeconds = config.timerSeconds ?? 60;
        this.hasLives = config.hasLives ?? true;
        this.maxLives = config.maxLives ?? 3;
        this.hasCombo = config.hasCombo ?? true;
        this.hasPause = config.hasPause ?? true;

        // State
        this.score = 0;
        this.lives = this.maxLives;
        this.combo = 0;
        this.maxCombo = 0;
        this.correct = 0;
        this.wrong = 0;
        this.timeLeft = this.timerSeconds;
        this.paused = false;
        this.finished = false;
        this._timerInterval = null;
        this._destroyed = false;

        // Track engine
        store.trackEngine(game.motor_id || 'E99');

        // HUD element
        this.hudEl = null;
        // Game area element (motor bunu kullanir)
        this.gameArea = null;
    }

    // ---- HUD ----

    renderShell() {
        this.container.innerHTML = '';

        // HUD
        this.hudEl = document.createElement('div');
        this.hudEl.className = 'game-hud';
        this.hudEl.style.cssText = `
            display:flex; align-items:center; justify-content:space-between;
            padding:0.6rem 1rem; background:white; border-radius:14px;
            box-shadow:0 2px 12px rgba(0,0,0,0.08); margin-bottom:1rem;
            font-weight:600; font-size:0.9rem; gap:0.5rem; flex-wrap:wrap;
            position:sticky; top:60px; z-index:10;
        `;
        this.container.appendChild(this.hudEl);

        // Game area
        this.gameArea = document.createElement('div');
        this.gameArea.className = 'game-area anim-fade-in-up';
        this.container.appendChild(this.gameArea);

        this._updateHUD();

        // Start timer
        if (this.hasTimer) this._startTimer();
    }

    _updateHUD() {
        if (!this.hudEl || this._destroyed) return;
        const parts = [];

        // Lives
        if (this.hasLives) {
            const hearts = '\u2764\uFE0F'.repeat(this.lives) + '\uD83D\uDDA4'.repeat(Math.max(0, this.maxLives - this.lives));
            parts.push(`<span style="letter-spacing:2px;">${hearts}</span>`);
        }

        // Score
        parts.push(`<span style="color:#6C63FF;">\u2B50 ${this.score}</span>`);

        // Combo
        if (this.hasCombo && this.combo >= 2) {
            parts.push(`<span style="color:#FF9F43; font-size:0.85rem;">\uD83D\uDD25 x${this.combo}</span>`);
        }

        // Timer
        if (this.hasTimer) {
            const color = this.timeLeft <= 10 ? '#FF6B6B' : this.timeLeft <= 30 ? '#FECA57' : '#1DD1A1';
            parts.push(`<span style="color:${color};">\u23F1\uFE0F ${this.timeLeft}s</span>`);
        }

        // Pause
        if (this.hasPause) {
            parts.push(`<button class="game-pause-btn" style="
                background:none; border:1px solid #ddd; border-radius:8px;
                padding:0.25rem 0.6rem; cursor:pointer; font-size:0.85rem;
            ">${this.paused ? '\u25B6\uFE0F' : '\u23F8\uFE0F'}</button>`);
        }

        this.hudEl.innerHTML = parts.join('');

        // Pause button binding
        const pauseBtn = this.hudEl.querySelector('.game-pause-btn');
        if (pauseBtn) {
            pauseBtn.onclick = () => this.togglePause();
        }
    }

    // ---- Timer ----

    _startTimer() {
        this._timerInterval = setInterval(() => {
            if (this.paused || this.finished) return;
            this.timeLeft--;
            this._updateHUD();
            if (this.timeLeft <= 10) playSound('click');
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    timeUp() {
        clearInterval(this._timerInterval);
        if (this.finished) return;
        this.finished = true;
        // Motor'un onTimeUp callback'i varsa cagir
        if (this.onTimeUp) {
            this.onTimeUp();
        } else {
            this.gameOver();
        }
    }

    // ---- Score & Lives ----

    addScore(points) {
        const multiplier = this.hasCombo ? Math.max(1, this.combo) : 1;
        this.score += Math.round(points * multiplier);
        this._updateHUD();
    }

    correctAnswer(points = 10) {
        this.correct++;
        this.combo++;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        this.addScore(points);
        playSound('correct');
        this._flashBorder('#1DD1A1');
    }

    wrongAnswer() {
        this.wrong++;
        this.combo = 0;
        if (this.hasLives) {
            this.lives--;
            this._updateHUD();
            if (this.lives <= 0) {
                playSound('wrong');
                this.gameOver();
                return true; // game ended
            }
        }
        playSound('wrong');
        this._flashBorder('#FF6B6B');
        this._updateHUD();
        return false; // game continues
    }

    loseLife() {
        return this.wrongAnswer();
    }

    _flashBorder(color) {
        if (!this.gameArea) return;
        this.gameArea.style.boxShadow = `inset 0 0 0 3px ${color}`;
        setTimeout(() => {
            if (this.gameArea) this.gameArea.style.boxShadow = '';
        }, 400);
    }

    // ---- Pause ----

    togglePause() {
        this.paused = !this.paused;
        this._updateHUD();
        if (this.paused && this.gameArea) {
            // Overlay
            const overlay = document.createElement('div');
            overlay.className = 'game-pause-overlay';
            overlay.style.cssText = `
                position:absolute; inset:0; background:rgba(0,0,0,0.6);
                display:flex; align-items:center; justify-content:center;
                border-radius:16px; z-index:20;
            `;
            overlay.innerHTML = `
                <div style="text-align:center; color:white;">
                    <div style="font-size:3rem;">\u23F8\uFE0F</div>
                    <div style="font-size:1.2rem; margin-top:0.5rem; font-weight:700;">Duraklatildi</div>
                    <button class="game-resume-btn" style="
                        margin-top:1rem; padding:0.6rem 2rem; background:#6C63FF;
                        color:white; border:none; border-radius:12px; font-size:1rem;
                        font-weight:600; cursor:pointer;
                    ">Devam Et</button>
                </div>
            `;
            this.gameArea.style.position = 'relative';
            this.gameArea.appendChild(overlay);
            overlay.querySelector('.game-resume-btn').onclick = () => this.togglePause();
        } else {
            const overlay = this.gameArea?.querySelector('.game-pause-overlay');
            if (overlay) overlay.remove();
        }
    }

    // ---- End Screens ----

    _calcStars() {
        const total = this.correct + this.wrong;
        if (total === 0) return 0;
        const ratio = this.correct / total;
        if (ratio >= STAR_THRESHOLDS[0]) return 3;
        if (ratio >= STAR_THRESHOLDS[1]) return 2;
        if (ratio >= STAR_THRESHOLDS[2]) return 1;
        return 0;
    }

    gameWin() {
        if (this.finished && !this._calledOnce) return;
        this._calledOnce = true;
        this.finished = true;
        clearInterval(this._timerInterval);

        const stars = this._calcStars();
        const xp = stars > 0 ? this.score : 0;

        // Store'a kaydet
        if (xp > 0) {
            store.completeChapter(this.data.grade, this.data.unitId, this.data.chapterId, xp, stars);
        }

        // Efektler
        if (stars >= 2) showConfetti();
        if (xp > 0) showXpPopup(xp);
        playSound('complete');

        const msgs = [
            '', // 0 yildiz
            'Fena degil! Biraz daha pratik yaparsan daha iyi olacak.',
            'Harika is cikardinn! Devam et!',
            'MUHTESEM! Tam isabet!'
        ];

        this.container.innerHTML = `
            <div class="quiz-result card anim-bounce-in text-center" style="padding:2.5rem 1.5rem;">
                <div style="font-size:4rem; margin-bottom:0.5rem;">
                    ${stars === 3 ? '\uD83C\uDFC6' : stars === 2 ? '\u2B50' : stars === 1 ? '\uD83D\uDCAA' : '\uD83D\uDE14'}
                </div>
                <h2 style="margin:0.5rem 0;">${stars > 0 ? 'Tebrikler!' : 'Tekrar Dene!'}</h2>
                <p class="text-muted" style="margin:0.5rem 0;">${msgs[stars]}</p>

                <div style="font-size:2.5rem; margin:1rem 0; letter-spacing:4px;">
                    ${'\u2B50'.repeat(stars)}${'\u2606'.repeat(3 - stars)}
                </div>

                <div style="display:flex; justify-content:center; gap:2rem; margin:1rem 0;">
                    <div style="text-align:center;">
                        <div style="font-size:1.5rem; font-weight:800; color:#6C63FF;">${this.score}</div>
                        <div class="text-muted" style="font-size:0.8rem;">Puan</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:1.5rem; font-weight:800; color:#1DD1A1;">${this.correct}</div>
                        <div class="text-muted" style="font-size:0.8rem;">Dogru</div>
                    </div>
                    ${this.maxCombo >= 2 ? `
                    <div style="text-align:center;">
                        <div style="font-size:1.5rem; font-weight:800; color:#FF9F43;">${this.maxCombo}x</div>
                        <div class="text-muted" style="font-size:0.8rem;">Max Combo</div>
                    </div>
                    ` : ''}
                </div>

                ${xp > 0 ? `<p style="font-size:1.2rem; font-weight:700; color:#6C63FF; margin:0.5rem 0;">+${xp} XP</p>` : ''}

                <div style="display:flex; gap:0.75rem; justify-content:center; margin-top:1.5rem;">
                    <button class="btn btn-secondary game-replay-btn" style="padding:0.6rem 1.5rem; border-radius:12px;">
                        \uD83D\uDD04 Tekrar
                    </button>
                    <button class="btn btn-primary game-back-btn" style="padding:0.6rem 1.5rem; border-radius:12px;">
                        Devam \u2192
                    </button>
                </div>
            </div>
        `;

        this.container.querySelector('.game-replay-btn')?.addEventListener('click', () => {
            if (this.onReplay) this.onReplay();
        });
        this.container.querySelector('.game-back-btn')?.addEventListener('click', () => {
            window.history.back();
        });
    }

    gameOver() {
        this.finished = true;
        clearInterval(this._timerInterval);
        playSound('wrong');

        this.container.innerHTML = `
            <div class="quiz-result card anim-bounce-in text-center" style="padding:2.5rem 1.5rem;">
                <div style="font-size:4rem; margin-bottom:0.5rem;">\uD83D\uDE1E</div>
                <h2 style="margin:0.5rem 0;">Oyun Bitti!</h2>
                <p class="text-muted">${this.hasLives && this.lives <= 0 ? 'Canlar\u0131n bitti.' : 'Sure doldu!'}</p>

                <div style="display:flex; justify-content:center; gap:2rem; margin:1.5rem 0;">
                    <div style="text-align:center;">
                        <div style="font-size:1.5rem; font-weight:800; color:#6C63FF;">${this.score}</div>
                        <div class="text-muted" style="font-size:0.8rem;">Puan</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:1.5rem; font-weight:800; color:#1DD1A1;">${this.correct}</div>
                        <div class="text-muted" style="font-size:0.8rem;">Dogru</div>
                    </div>
                </div>

                <div style="display:flex; gap:0.75rem; justify-content:center; margin-top:1.5rem;">
                    <button class="btn btn-primary game-replay-btn" style="padding:0.6rem 1.5rem; border-radius:12px;">
                        \uD83D\uDD04 Tekrar Dene
                    </button>
                    <button class="btn btn-secondary game-back-btn" style="padding:0.6rem 1.5rem; border-radius:12px;">
                        \u2190 Geri
                    </button>
                </div>
            </div>
        `;

        this.container.querySelector('.game-replay-btn')?.addEventListener('click', () => {
            if (this.onReplay) this.onReplay();
        });
        this.container.querySelector('.game-back-btn')?.addEventListener('click', () => {
            window.history.back();
        });
    }

    // ---- Cleanup ----

    destroy() {
        this._destroyed = true;
        this.finished = true;
        clearInterval(this._timerInterval);
    }
}
