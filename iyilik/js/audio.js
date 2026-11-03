// "Bana oku": önceden üretilmiş cümle zamanlamalı sesler, kelime vurgusu ve cihaz sesi yedeği.
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- ses dizinleri ----
const jsons = new Map();
async function getJSON(url) {
  if (jsons.has(url)) return jsons.get(url);
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    const j = await r.json(); jsons.set(url, j); return j;
  } catch { return null; } // çevrimdışı/eksik: cihaz sesi yedeği devreye girer
}
export const lessonAudio = id => getJSON(`ses/${id}.json`);
const uiIndex = () => getJSON('ses/ui.json');

// ---- metin → vurgulanabilir HTML ----
const ABBR = /\b(Hz|Dr|Prof|Bkz|vb|vs|Doç)\.$/;
export function splitSentences(text) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  const re = /[.!?…]\s+(?=[A-ZÇĞİÖŞÜÂÎÛ"“‘(])/g, out = [];
  let start = 0, m;
  while ((m = re.exec(t))) {
    const piece = t.slice(start, m.index + 1);
    if (ABBR.test(piece)) continue; // kısaltma sonundaki nokta cümle sonu değil
    out.push(piece); start = m.index + m[0].length;
  }
  out.push(t.slice(start));
  return out.filter(Boolean);
}
const words = t => String(t).split(/\s+/).filter(Boolean).map(w => `<span class="w">${esc(w)}</span>`).join(' ');
/** i. cümle tek parça */
export const S = (A, unit, i, fallback) =>
  `<span class="s" data-i="${i}">${words(A?.[unit]?.s?.[i]?.t ?? fallback)}</span>`;
/** from. cümleden (to hariç) başlayarak seçenek olmayan cümleler */
export function SS(A, unit, from, fallbackText, to = Infinity) {
  const cues = A?.[unit]?.s;
  if (cues) return cues.map((c, i) => [c, i]).filter(([c, i]) => c.k !== 'o' && i >= from && i < to)
    .map(([c, i]) => `<span class="s" data-i="${i}">${words(c.t)}</span>`).join(' ');
  return splitSentences(fallbackText).map((t, i) => `<span class="s" data-i="${i + from}">${words(t)}</span>`).join(' ');
}
/** root içinde `data-unit` kapsayıcısına bağlanan kuyruk öğesi */
export const unitItem = (A, id, unit, root) =>
  ({ src: A?.[unit] ? `ses/${id}/${A[unit].f}` : null, cues: A?.[unit]?.s || null, root });

// ---- oynatıcı ----
const el = new Audio(); el.preload = 'auto';
let items = [], idx = 0, state = 'idle', raf = 0, cur = -1, hl = null;
const listeners = new Set();
export const onState = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const setState = s => { state = s; listeners.forEach(f => f(s, items[idx])); };
export const getState = () => state;

function clearHL(root) { root?.querySelectorAll('.on,.now').forEach(n => n.classList.remove('on', 'now')); document.querySelectorAll('.reading').forEach(n => n.classList.remove('reading')); }

function mark(it, c) {
  if (!it.root) return;
  it.root.querySelectorAll('.on,.now').forEach(n => n.classList.remove('on', 'now'));
  hl = null; cur = c;
  if (c < 0) return;
  const s = it.root.querySelector(`[data-i="${c}"]`);
  if (!s) return;
  s.classList.add('on');
  const ws = [...s.querySelectorAll('.w')];
  if (ws.length && it.cues) {
    const wt = ws.map(w => w.textContent.length + (/[,;:]$/.test(w.textContent) ? 2 : 0) + (/[.!?…]$/.test(w.textContent) ? 3 : 0) + 1);
    const total = wt.reduce((a, b) => a + b, 0); let acc = 0;
    hl = { ws, edge: wt.map(x => (acc += x) / total), last: -1 };
  }
  const r = s.getBoundingClientRect();
  if (r.top < 90 || r.bottom > innerHeight - 150) s.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
}

function tick() {
  const it = items[idx];
  if (!it || !it.cues) return;
  const t = el.currentTime, cues = it.cues;
  let c = -1;
  for (let i = 0; i < cues.length; i++) { if (t >= cues[i].a - 0.04) c = i; else break; }
  if (c !== cur) mark(it, c);
  if (hl && c >= 0) {
    const p = Math.min(1, Math.max(0, (t - cues[c].a) / Math.max(0.2, cues[c].b - cues[c].a)));
    let w = hl.edge.findIndex(e => p <= e); if (w < 0) w = hl.ws.length - 1;
    if (w !== hl.last) { hl.ws[hl.last]?.classList.remove('now'); hl.ws[w].classList.add('now'); hl.last = w; }
  }
  raf = requestAnimationFrame(tick);
}

function finish() { cancelAnimationFrame(raf); setState('idle'); items = []; idx = 0; }
function next() {
  cancelAnimationFrame(raf);
  const it = items[idx]; clearHL(it?.root);
  idx++;
  if (idx >= items.length) finish(); else start();
}
function start() {
  const it = items[idx];
  if (!it) return finish();
  cur = -1;
  it.root?.classList.add('reading');
  if (it.src) {
    el.src = it.src;
    el.play().then(() => { setState('playing'); if (it.cues) tick(); })
      .catch(e => { if (e && e.name === 'NotAllowedError') finish(); else if (it.root) fallback(it); else next(); });
  } else fallback(it);
}
el.onended = next;
el.onerror = () => { const it = items[idx]; if (it?.root) fallback(it); else next(); };

// cihazın kendi sesi (ses dosyası yoksa / çevrimdışı ve önbellekte yoksa)
function fallback(it) {
  if (!('speechSynthesis' in window) || !it.root) return next();
  const nodes = [...it.root.querySelectorAll('[data-i]')]; let k = 0;
  setState('playing');
  const go = () => {
    if (state === 'idle' || items[idx] !== it) return;
    if (k >= nodes.length) return next();
    const n = nodes[k];
    it.root.querySelectorAll('.on').forEach(x => x.classList.remove('on')); n.classList.add('on');
    const u = new SpeechSynthesisUtterance(n.textContent); u.lang = 'tr-TR'; u.rate = 0.85;
    u.onend = () => { k++; go(); }; u.onerror = () => { k++; go(); };
    speechSynthesis.speak(u);
  };
  go();
}

export function play(list) {
  stop();
  items = list.filter(Boolean); idx = 0;
  if (!items.length) return;
  setState('loading');
  start();
}
export function toggle() {
  if (state === 'playing') {
    el.pause(); if (speechSynthesis?.speaking) speechSynthesis.pause();
    cancelAnimationFrame(raf); setState('paused');
  } else if (state === 'paused') {
    if (speechSynthesis?.paused) speechSynthesis.resume(); else { el.play(); if (items[idx]?.cues) tick(); }
    setState('playing');
  }
}
export function stop() {
  cancelAnimationFrame(raf);
  el.pause(); try { speechSynthesis?.cancel(); } catch {}
  items.forEach(i => clearHL(i.root));
  items = []; idx = 0; if (state !== 'idle') setState('idle');
}
/** kısa arayüz sesi/ipucu; zincir olarak ek öğeler eklenebilir */
export async function sayUI(key, ...more) {
  const ui = await uiIndex();
  const e = ui?.[key];
  if (!e) return;
  play([{ src: 'ses/' + e.f, cues: null, root: null }, ...more]);
}
export async function sayUIKeys(keys) {
  const ui = await uiIndex(); if (!ui) return;
  play(keys.filter(k => ui[k]).map(k => ({ src: 'ses/' + ui[k].f, cues: null, root: null })));
}
