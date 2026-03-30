// ===== Sprite Renderer =====
// Emoji render helper + platform fallback
// Canvas'ta emoji render tutarsizligini cozer

const EMOJI_CACHE = new Map();

/**
 * Canvas'a emoji ciz (cachelenmis offscreen canvas ile)
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} emoji
 * @param {number} x - merkez x
 * @param {number} y - merkez y
 * @param {number} size - piksel boyutu
 */
export function drawSprite(ctx, emoji, x, y, size = 32) {
    const key = `${emoji}_${size}`;
    if (!EMOJI_CACHE.has(key)) {
        // Offscreen canvas'a render et ve cachele
        const off = document.createElement('canvas');
        const s = Math.ceil(size * 1.3);
        off.width = s;
        off.height = s;
        const offCtx = off.getContext('2d');
        offCtx.font = `${size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", serif`;
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillText(emoji, s / 2, s / 2);
        EMOJI_CACHE.set(key, off);
    }
    const cached = EMOJI_CACHE.get(key);
    ctx.drawImage(cached, x - cached.width / 2, y - cached.height / 2);
}

/**
 * Renkli daire + metin label (emoji fallback)
 * Emoji desteklenmezse veya okunakli metin gerekirse kullan
 */
export function drawLabelBubble(ctx, text, x, y, { radius = 30, fill = '#6C63FF', textColor = 'white', fontSize = 12 } = {}) {
    // Daire
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();

    // Kenarlık
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Metin (otomatik satir kirma)
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Uzun metni kirp
    const maxLen = Math.floor(radius * 2 / (fontSize * 0.6));
    const display = text.length > maxLen ? text.substring(0, maxLen - 1) + '\u2026' : text;
    ctx.fillText(display, x, y, radius * 1.8);
}

/**
 * Balon ciz (oyunlarda kullanilir)
 */
export function drawBalloon(ctx, x, y, radius, { color = '#FF6B6B', text = '', emoji, textColor = 'white' } = {}) {
    // Balon govdesi
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Parlaklik efekti
    ctx.beginPath();
    ctx.arc(x - radius * 0.25, y - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fill();

    // Ip
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.quadraticCurveTo(x + 5, y + radius + 15, x, y + radius + 25);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Icerik
    if (emoji) {
        drawSprite(ctx, emoji, x, y, radius * 0.8);
    } else if (text) {
        ctx.fillStyle = textColor;
        const fontSize = Math.min(radius * 0.5, 14);
        ctx.font = `bold ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y, radius * 1.6);
    }
}

// Balon renk paleti
export const BALLOON_COLORS = [
    '#FF6B6B', // kirmizi
    '#48DBFB', // cyan
    '#1DD1A1', // yesil
    '#FECA57', // sari
    '#FF9FF3', // pembe
    '#54A0FF', // mavi
    '#FF9F43', // turuncu
    '#5F27CD', // mor
];

// Oyun objesi emoji seti
export const GAME_EMOJIS = {
    player: '\uD83D\uDE80',    // roket
    enemy: '\uD83D\uDC7E',     // uzayli
    star: '\u2B50',             // yildiz
    heart: '\u2764\uFE0F',     // kalp
    fire: '\uD83D\uDD25',      // ates
    balloon: '\uD83C\uDF88',   // balon
    explosion: '\uD83D\uDCA5', // patlama
    trophy: '\uD83C\uDFC6',    // kupa
    basket: '\uD83E\uDDFA',    // sepet
    frog: '\uD83D\uDC38',      // kurbaga
    catcher: '\uD83E\uDDF2',   // miknatisRobotLine
    check: '\u2705',            // tik
    cross: '\u274C',            // carpi
    gift: '\uD83C\uDF81',      // hediye
    lock: '\uD83D\uDD12',      // kilit
    key: '\uD83D\uDD11',       // anahtar
};
