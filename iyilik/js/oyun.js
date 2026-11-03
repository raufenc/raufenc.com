// İyiliklerle Büyüyorum v5 — resimli oyunlar (az yazı, çok resim). Veri: her konunun `game2` alanı.
// Türler: pairs (resim↔resim), pick (eşini seç), listen (dinle, resmi bul), memory (hafıza kartları), order (sırala).
// Dokunarak ve sürükleyerek oynanır. Yanlışta ceza yok: kart hafifçe sallanır, iki denemeden sonra doğru kart parlar.
import * as au from './audio.js';
import { sfx } from './sfx.js';
import { icon } from './icons.js';

const { esc } = au;
const $$ = (s, r) => [...r.querySelectorAll(s)];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** tür → [kısa yönerge, arayüz sesi] */
export const MODES = {
  pairs: ['Resme dokun, sonra eşine.', 'esles2'],
  pick: ['Resme bak, eşini seç.', 'sec'],
  listen: ['Dinle ve doğru resmi bul.', 'dinlesec'],
  memory: ['Kartları çevir, eşlerini bul.', 'hafiza'],
  order: ['Resimleri sırayla yerleştir.', 'sirala2'],
};
export const ikonlar = g => !g ? [] : [...new Set((g.pairs || []).flatMap(p => [p.a?.i, p.b?.i]).concat((g.items || []).map(x => x.i)).filter(Boolean))];

const img = i => `<img src="ikon/${i}.webp" alt="" draggable="false" width="192" height="192" decoding="async">`;
/** resimli kart; aria-label ve gizli cümle eski yazılı oyundaki metindir (ekran okuyucu ve cihaz sesi yedeği) */
const card = (c, cls, attrs, text) => `<button class="pc ${cls}" ${attrs} aria-label="${esc(text)}">${img(c.i)}${c.l ? `<span class="lb">${esc(c.l)}</span>` : ''}<span class="sr-only" data-i="0">${esc(text)}</span></button>`;

/** sürükle-bırak: hareket 10 px'i geçince kartın hayaleti parmağı izler; bırakınca hedef öğe onDrop'a verilir */
function dragger(box, sel, onDrop, hover) {
  let d = null, block = 0;
  const end = e => {
    if (!d) return;
    const g = d.g, c = d.c; d = null;
    $$('.over', box).forEach(x => x.classList.remove('over'));
    if (!g) return;
    g.remove(); c.classList.remove('lift'); block = Date.now();
    if (e && e.type === 'pointerup') onDrop(c, document.elementFromPoint(e.clientX, e.clientY));
  };
  box.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    const c = e.target.closest(sel); if (!c || c.classList.contains('done') || c.disabled) return;
    d = { c, x: e.clientX, y: e.clientY, id: e.pointerId, g: null };
  });
  const move = e => {
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.g) {
      if (Math.hypot(dx, dy) < 10) return;
      const r = d.c.getBoundingClientRect();
      d.g = d.c.cloneNode(true); d.g.classList.add('ghost'); d.g.removeAttribute('aria-label');
      Object.assign(d.g.style, { width: r.width + 'px', height: r.height + 'px', left: r.left + 'px', top: r.top + 'px' });
      document.body.appendChild(d.g); d.c.classList.add('lift'); sfx.tap();
    }
    d.g.style.transform = `translate(${dx}px,${dy}px) scale(1.06) rotate(${Math.max(-6, Math.min(6, dx / 30))}deg)`;
    const t = document.elementFromPoint(e.clientX, e.clientY)?.closest(hover);
    $$('.over', box).forEach(x => x !== t && x.classList.remove('over'));
    if (t && box.contains(t) && t !== d.c) t.classList.add('over');
    e.preventDefault();
  };
  addEventListener('pointermove', move, { passive: false }); addEventListener('pointerup', end); addEventListener('pointercancel', end);
  return { recent: () => Date.now() - block < 220, off: () => { d?.g?.remove(); removeEventListener('pointermove', move); removeEventListener('pointerup', end); removeEventListener('pointercancel', end); } };
}

/**
 * box: oyun kutusu · g: game2 · ctx: { id, A, old (eski yazılı oyun), voice (ilk sesli yönerge çalınsın mı), done() }
 * dönüş: temizleme işlevi
 */
export function playGame(box, g, ctx) {
  const { id, A, old } = ctx;
  const unitSrc = u => A?.[u] ? `ses/${id}/${A[u].f}` : null;
  const item = (u, root) => ({ src: unitSrc(u), cues: null, root: root || null });
  const say = (u, root) => au.play([item(u, root)]);
  const dur = u => (A?.[u]?.d || 1.6) * 1000;
  const txt = (side, i) => side === 'o' ? old.items?.[i] : old.pairs?.[i]?.[side] || '';
  const intro = (...more) => { if (ctx.voice) au.sayUI(MODES[g.mode][1], ...more); else if (more.length) au.play(more); };
  const nudge = el => { el.classList.remove('try'); void el.offsetWidth; el.classList.add('try'); later(() => el.classList.remove('try'), 450); };
  const timers = [];
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  let drag = null, won = false;
  const win = () => { if (won) return; won = true; box.querySelector('.deck')?.setAttribute('hidden', ''); later(ctx.done, 700); };
  box.className = `g2 g2-${g.mode}`;

  if (g.mode === 'pairs') {
    const P = g.pairs, as = shuffle(P.map((p, i) => [i, p.a])), bs = shuffle(P.map((p, i) => [i, p.b]));
    box.innerHTML = `<div class="pairs"><div class="col">${as.map(([i, c]) => card(c, 'a', `data-side="a" data-p="${i}" data-unit="ga${i}"`, txt('a', i))).join('')}</div>
      <div class="col">${bs.map(([i, c]) => card(c, 'b', `data-side="b" data-p="${i}" data-unit="gb${i}"`, txt('b', i))).join('')}</div></div>`;
    let sel = null, left = P.length, miss = 0;
    const hintFor = x => { const o = box.querySelector(`.pc[data-side="${x.dataset.side === 'a' ? 'b' : 'a'}"][data-p="${x.dataset.p}"]`); o?.classList.add('hint'); };
    const tryMatch = (x, y) => {
      if (x.dataset.side === y.dataset.side) return false;
      $$('.hint', box).forEach(h => h.classList.remove('hint'));
      if (x.dataset.p === y.dataset.p) {
        [x, y].forEach(e => { e.classList.remove('sel'); e.classList.add('done', 'pop'); e.disabled = true; });
        sfx.good(); miss = 0; sel = null;
        const b = x.dataset.side === 'b' ? x : y; say(b.dataset.unit, b);
        if (--left === 0) later(win, Math.min(2600, dur(b.dataset.unit)));
      } else {
        [x, y].forEach(e => { e.classList.remove('sel'); nudge(e); }); sel = null; sfx.soft();
        if (++miss >= 2) hintFor(x.dataset.side === 'a' ? x : y), miss = 0;
        later(() => au.sayUI('tekrar'), 450);
      }
      return true;
    };
    box.onclick = ev => {
      const b = ev.target.closest('.pc'); if (!b || b.classList.contains('done') || drag.recent()) return;
      sfx.tap();
      if (!sel || sel.dataset.side === b.dataset.side) { sel?.classList.remove('sel'); sel = b; b.classList.add('sel'); say(b.dataset.unit, b); return; }
      tryMatch(sel, b);
    };
    later(() => { if (box.getBoundingClientRect().bottom > innerHeight - 90) box.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' }); }, 300);
    drag = dragger(box, '.pc', (c, t) => { const y = t?.closest('.pc'); if (y && box.contains(y) && y !== c && !y.classList.contains('done')) { sel?.classList.remove('sel'); sel = null; tryMatch(c, y); } }, '.pc');
    intro();
  }

  else if (g.mode === 'pick' || g.mode === 'listen') {
    const P = g.pairs, ord = shuffle(P.map((_, i) => i)); let k = 0, miss = 0;
    const listen = g.mode === 'listen';
    const render = first => {
      const i = ord[k], p = P[i];
      let opts;
      if (listen) opts = shuffle(P.map((q, j) => [j, q.a]));
      else {
        const others = shuffle(P.map((q, j) => [j, q.b]).filter(([j, c]) => j !== i && c.i !== p.b.i)).slice(0, 2);
        opts = shuffle([[i, p.b], ...others]);
      }
      const dots = `<div class="dots" aria-hidden="true">${P.map((_, j) => `<i class="${j < k ? 'ok' : j === k ? 'now' : ''}"></i>`).join('')}</div>`;
      const q = listen
        ? `<button class="qsay" data-unit="ga${i}" aria-label="${esc(txt('a', i))}"><span class="spk">${icon('speaker')}</span><span class="lb">${esc(p.a.l || '')}</span><span class="sr-only" data-i="0">${esc(txt('a', i))}</span></button>`
        : card(p.a, 'q', `data-unit="ga${i}"`, txt('a', i));
      box.innerHTML = `${dots}<div class="qwrap">${q}</div><div class="arrowd" aria-hidden="true">${icon('next')}</div>
        <div class="opts n${opts.length}">${opts.map(([j, c]) => card(listen ? { i: c.i } : c, 'o', `data-p="${j}" data-unit="gb${j}"`, listen ? txt('a', j) : txt('b', j))).join('')}</div>`;
      const qe = box.querySelector('[data-unit^="ga"]');
      if (first) intro(item(`ga${i}`, qe)); else say(`ga${i}`, qe);
      box.querySelector('.qwrap').animate?.([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: reduce ? 0 : 320, easing: 'ease-out' });
    };
    const choose = b => {
      if (box.dataset.busy) return;
      const i = ord[k];
      if (+b.dataset.p === i) {
        box.dataset.busy = 1; miss = 0;
        b.classList.add('good', 'pop'); $$('.pc.o', box).forEach(x => x !== b && x.classList.add('fade'));
        sfx.good(); say(`gb${i}`, b);
        later(() => { delete box.dataset.busy; if (++k >= P.length) { box.querySelector('.dots i.now')?.classList.add('ok'); win(); } else render(); }, Math.max(1300, Math.min(4200, dur(`gb${i}`) + 350)));
      } else {
        nudge(b); sfx.soft(); au.sayUI('tekrar');
        if (++miss >= 2) box.querySelector(`.pc.o[data-p="${i}"]`)?.classList.add('hint');
      }
    };
    box.onclick = ev => {
      const s = ev.target.closest('[data-unit^="ga"]'); if (s) { sfx.tap(); say(s.dataset.unit, s); return; }
      const b = ev.target.closest('.pc.o'); if (b && !drag.recent()) choose(b);
    };
    drag = dragger(box, '.pc.o', (c, t) => { if (t?.closest('.qwrap')) choose(c); }, '.qwrap');
    render(true);
  }

  else if (g.mode === 'memory') {
    const P = g.pairs, cards = shuffle(P.flatMap((p, i) => [[i, 'a', p.a], [i, 'b', p.b]]));
    box.innerHTML = `<div class="mem">${cards.map(([i, s, c]) => `<button class="mc" data-p="${i}" data-unit="g${s}${i}" aria-label="Kapalı kart"><span class="in"><span class="bk">${icon('star')}</span><span class="fr">${img(c.i)}<span class="sr-only" data-i="0">${esc(txt(s, i))}</span></span></span></button>`).join('')}</div>`;
    let open = [], left = P.length, lock = false;
    box.onclick = ev => {
      const b = ev.target.closest('.mc'); if (!b || lock || b.classList.contains('up')) return;
      b.classList.add('up'); b.setAttribute('aria-label', txt(b.dataset.unit[1], +b.dataset.p)); sfx.tap(); say(b.dataset.unit, b);
      open.push(b);
      if (open.length < 2) return;
      const [x, y] = open; open = [];
      if (x.dataset.p === y.dataset.p) {
        later(() => { [x, y].forEach(e => e.classList.add('done', 'pop')); sfx.good(); }, 350);
        if (--left === 0) later(win, 1500);
      } else {
        lock = true;
        later(() => { [x, y].forEach(e => { e.classList.remove('up'); e.setAttribute('aria-label', 'Kapalı kart'); }); sfx.soft(); lock = false; }, 1300);
      }
    };
    intro();
  }

  else { // order
    const items = g.items, n = items.length, deck = shuffle(items.map((c, i) => [i, c])); let nxt = 0, miss = 0;
    box.innerHTML = `<div class="slots n${n}">${items.map((_, i) => `<div class="slot" data-s="${i}"><span class="num">${i + 1}</span></div>`).join('')}</div>
      <div class="deck n${n}">${deck.map(([i, c]) => card(c, 'o', `data-p="${i}" data-unit="go${i}"`, txt('o', i))).join('')}</div>`;
    box.querySelector('.slot').classList.add('next');
    const place = b => {
      if (b.classList.contains('done')) return;
      if (+b.dataset.p === nxt) {
        const s = box.querySelector(`.slot[data-s="${nxt}"]`), i = nxt;
        s.classList.remove('next'); s.classList.add('full', 'pop'); s.innerHTML = `${img(items[i].i)}<span class="num">${i + 1}</span>`;
        b.classList.add('done'); b.disabled = true; $$('.hint', box).forEach(h => h.classList.remove('hint')); miss = 0;
        sfx.good(); say(b.dataset.unit, b);
        if (++nxt === n) later(win, Math.min(2600, dur(`go${i}`)));
        else box.querySelector(`.slot[data-s="${nxt}"]`).classList.add('next');
      } else {
        nudge(b); sfx.soft(); au.sayUI('tekrar');
        if (++miss >= 2) box.querySelector(`.pc.o[data-p="${nxt}"]`)?.classList.add('hint');
      }
    };
    box.onclick = ev => { const b = ev.target.closest('.pc.o'); if (b && !drag.recent()) place(b); };
    drag = dragger(box, '.pc.o', (c, t) => { if (t?.closest('.slots')) place(c); }, '.slot.next');
    intro();
  }
  return () => { timers.forEach(clearTimeout); drag?.off(); };
}

/** Büyükler rehberi için resimli oyunun yazılı karşılığı */
export function oldGameHTML(gm) {
  if (!gm) return '';
  return `<p>${esc(gm.instruction)}</p>` + (gm.type === 'match'
    ? `<ul>${gm.pairs.map(p => `<li>${esc(p.a)} → ${esc(p.b)}</li>`).join('')}</ul>`
    : `<ol>${gm.items.map(t => `<li>${esc(t)}</li>`).join('')}</ol>`);
}
