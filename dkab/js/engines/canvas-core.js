// ===== CanvasGame: Canvas 2D Oyun Altyapisi =====
// requestAnimationFrame dongusu, DPI-aware canvas, input, carpisme, parcacik

export class CanvasGame {
    /**
     * @param {HTMLElement} parentEl - Canvas'in eklencegi eleman
     * @param {Object} opts
     * @param {number} opts.width - Mantiksal genislik (px)
     * @param {number} opts.height - Mantiksal yukseklik (px)
     * @param {string} opts.bgColor - Arka plan rengi
     */
    constructor(parentEl, { width = 400, height = 600, bgColor = '#0d1117' } = {}) {
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.running = false;
        this._rafId = null;
        this._lastTime = 0;

        // Canvas olustur
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            width:100%; max-width:${width}px; height:auto;
            border-radius:16px; display:block; margin:0 auto;
            touch-action:none; user-select:none;
        `;
        // DPI
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
        this.dpr = dpr;

        parentEl.appendChild(this.canvas);

        // Input state
        this.pointer = { x: width / 2, y: height / 2, down: false };
        this.keys = {};
        this._particles = [];

        this._bindInput();
    }

    // ---- Input ----

    _bindInput() {
        const rect = () => this.canvas.getBoundingClientRect();
        const scaleX = () => this.width / rect().width;
        const scaleY = () => this.height / rect().height;

        // Pointer (mouse + touch)
        const onMove = (e) => {
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            const r = rect();
            this.pointer.x = (touch.clientX - r.left) * scaleX();
            this.pointer.y = (touch.clientY - r.top) * scaleY();
        };
        const onDown = (e) => { onMove(e); this.pointer.down = true; };
        const onUp = () => { this.pointer.down = false; };

        this.canvas.addEventListener('pointermove', onMove, { passive: false });
        this.canvas.addEventListener('pointerdown', onDown, { passive: false });
        this.canvas.addEventListener('pointerup', onUp);
        this.canvas.addEventListener('pointerleave', onUp);

        // Touch fallback
        this.canvas.addEventListener('touchmove', onMove, { passive: false });
        this.canvas.addEventListener('touchstart', onDown, { passive: false });
        this.canvas.addEventListener('touchend', onUp);

        // Keyboard
        const onKeyDown = (e) => { this.keys[e.code] = true; };
        const onKeyUp = (e) => { this.keys[e.code] = false; };
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        this._cleanup = () => {
            this.canvas.removeEventListener('pointermove', onMove);
            this.canvas.removeEventListener('pointerdown', onDown);
            this.canvas.removeEventListener('pointerup', onUp);
            this.canvas.removeEventListener('pointerleave', onUp);
            this.canvas.removeEventListener('touchmove', onMove);
            this.canvas.removeEventListener('touchstart', onDown);
            this.canvas.removeEventListener('touchend', onUp);
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        };
    }

    // ---- Game Loop ----

    start(updateFn, drawFn) {
        this._updateFn = updateFn;
        this._drawFn = drawFn;
        this.running = true;
        this._lastTime = performance.now();
        this._loop();
    }

    _loop() {
        if (!this.running) return;
        this._rafId = requestAnimationFrame((now) => {
            const dt = Math.min((now - this._lastTime) / 1000, 0.05); // cap at 50ms
            this._lastTime = now;

            // Update
            this._updateFn(dt);
            this._updateParticles(dt);

            // Draw
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this._drawFn(this.ctx, dt);
            this._drawParticles(this.ctx);

            this._loop();
        });
    }

    stop() {
        this.running = false;
        if (this._rafId) cancelAnimationFrame(this._rafId);
    }

    destroy() {
        this.stop();
        if (this._cleanup) this._cleanup();
        this.canvas.remove();
    }

    // ---- Drawing Helpers ----

    drawEmoji(emoji, x, y, size = 32) {
        this.ctx.font = `${size}px serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(emoji, x, y);
    }

    drawText(text, x, y, { color = 'white', size = 16, align = 'center', bold = false, maxWidth } = {}) {
        this.ctx.font = `${bold ? 'bold ' : ''}${size}px Inter, sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'middle';
        if (maxWidth) {
            this.ctx.fillText(text, x, y, maxWidth);
        } else {
            this.ctx.fillText(text, x, y);
        }
    }

    drawRoundRect(x, y, w, h, r, { fill, stroke, alpha = 1 } = {}) {
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, w, h, r);
        if (fill) { this.ctx.fillStyle = fill; this.ctx.fill(); }
        if (stroke) { this.ctx.strokeStyle = stroke; this.ctx.lineWidth = 2; this.ctx.stroke(); }
        this.ctx.globalAlpha = 1;
    }

    drawCircle(x, y, radius, { fill, stroke, alpha = 1 } = {}) {
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (fill) { this.ctx.fillStyle = fill; this.ctx.fill(); }
        if (stroke) { this.ctx.strokeStyle = stroke; this.ctx.lineWidth = 2; this.ctx.stroke(); }
        this.ctx.globalAlpha = 1;
    }

    // ---- Collision ----

    static collides(a, b) {
        // AABB collision: { x, y, w, h }
        return a.x < b.x + b.w && a.x + a.w > b.x &&
               a.y < b.y + b.h && a.y + a.h > b.y;
    }

    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    static pointInRect(px, py, rect) {
        return px >= rect.x && px <= rect.x + rect.w &&
               py >= rect.y && py <= rect.y + rect.h;
    }

    // ---- Particles ----

    spawnParticles(x, y, { count = 12, colors = ['#FF6B6B', '#FECA57', '#1DD1A1', '#48DBFB'], emoji, speed = 150, life = 0.8 } = {}) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const spd = speed * (0.5 + Math.random() * 0.5);
            this._particles.push({
                x, y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life,
                maxLife: life,
                color: colors[i % colors.length],
                emoji: emoji || null,
                size: emoji ? 16 + Math.random() * 8 : 4 + Math.random() * 4,
            });
        }
    }

    _updateParticles(dt) {
        for (let i = this._particles.length - 1; i >= 0; i--) {
            const p = this._particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 300 * dt; // gravity
            p.life -= dt;
            if (p.life <= 0) this._particles.splice(i, 1);
        }
    }

    _drawParticles(ctx) {
        for (const p of this._particles) {
            const alpha = Math.max(0, p.life / p.maxLife);
            ctx.globalAlpha = alpha;
            if (p.emoji) {
                ctx.font = `${p.size}px serif`;
                ctx.textAlign = 'center';
                ctx.fillText(p.emoji, p.x, p.y);
            } else {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1;
    }
}
