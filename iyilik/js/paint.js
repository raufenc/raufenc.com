// Dokun-boya stüdyosu: kitabın gerçek sayfası, önceden hesaplanmış bölge haritasıyla anında doldurma.
import { getPaint, putPaint, delPaint } from './store.js';
import { icon } from './icons.js';
import { sfx } from './sfx.js';
import { celebrate } from './cele.js';

export const PALETTE = ['#e53935', '#ff7043', '#ffb300', '#fdd835', '#c0ca33', '#7cb342', '#2e9e55', '#00897b',
  '#26c6da', '#42a5f5', '#1e5fd0', '#5c4bc4', '#9c27b0', '#ec407a', '#ffd9bd', '#e2ad80', '#a86b43', '#6d4326',
  '#b8b8b8', '#2b3a42', '#ffffff'];
const SIZES = [8, 18, 36];
const MAXUNDO = 12;
const names = { bucket: 'Kova', brush: 'Fırça', eraser: 'Silgi', hand: 'Kaydır' };
const toolAria = { bucket: 'Boya kovası: bir bölgeye dokununca doldurur', brush: 'Fırça', eraser: 'Silgi', hand: 'Kaydır: resmi parmakla taşı' };

export async function openStudio(host, { b, p, toast, say, onDone }) {
  const id = `b${b}-${String(p).padStart(2, '0')}`;
  const base = `sayfa/${id}`;
  host.innerHTML = `
  <div class="studio" data-book="${b}">
    <div class="st-top">
      <a class="ibtn" href="#boya/${b}" aria-label="Boyama sayfalarına dön">${icon('back')}</a>
      <div class="st-title">Sayfa ${p}</div>
      <button class="ibtn" data-act="undo" aria-label="Geri al" disabled>${icon('undo')}</button>
      <button class="ibtn" data-act="redo" aria-label="Yinele" disabled>${icon('redo')}</button>
      <button class="ibtn save" data-act="save" aria-label="Resmimi kaydet">${icon('save')}<span>Kaydet</span></button>
      <button class="ibtn" data-act="clear" aria-label="Baştan başla">${icon('trash')}</button>
      <button class="ibtn done" data-act="done" aria-label="Bitti, resmimi duvarıma as">${icon('check')}<span>Bitti</span></button>
    </div>
    <div class="st-stage" id="stage" role="application" aria-label="Boyama alanı. Bir renk seçip resme dokun.">
      <div class="paper" id="paper" style="background-image:url(${base}-t.webp)">
        <canvas class="paint" id="paint"></canvas><img class="lines" id="lines" alt="" draggable="false">
      </div>
      <div class="st-zoom"><button class="ibtn" data-act="zin" aria-label="Yakınlaştır">${icon('plus')}</button>
        <button class="ibtn" data-act="zout" aria-label="Uzaklaştır">${icon('minus')}</button>
        <button class="ibtn" data-act="fit" aria-label="Sığdır">${icon('fit')}</button></div>
<div class="st-sizes" id="sizes" role="radiogroup" aria-label="Kalınlık">${SIZES.map((s, i) => `<button role="radio" data-size="${i}" aria-label="${['İnce', 'Orta', 'Kalın'][i]} uç" aria-checked="false"><i style="width:${8 + i * 7}px;height:${8 + i * 7}px"></i></button>`).join('')}</div>
      <div class="st-loading" id="stload">Sayfa açılıyor…</div>
    </div>
    <div class="st-dock">
      <div class="st-tools" role="radiogroup" aria-label="Araç">
        ${['bucket', 'brush', 'eraser', 'hand'].map(t => `<button class="tool" role="radio" data-tool="${t}" aria-label="${toolAria[t]}" aria-checked="false">${icon(t)}<span>${names[t]}</span></button>`).join('')}
      </div>
      <div class="st-palette" role="radiogroup" aria-label="Renkler">${PALETTE.map((c, i) => `<button class="sw" role="radio" data-c="${c}" aria-label="Renk ${i + 1}" aria-checked="false" style="--c:${c}"></button>`).join('')}</div>
    </div>
    <div class="st-sheet" id="sheet" hidden><div role="alertdialog" aria-labelledby="sheet-t"><p id="sheet-t">Resmi baştan boyamak istiyor musun? Şimdiki boyaman silinir.</p>
      <button class="btn" data-act="clear-yes">Evet, temizle</button><button class="btn ghost" data-act="clear-no">Vazgeç</button></div></div>
  </div>`;

  const $ = s => host.querySelector(s);
  const stage = $('#stage'), paper = $('#paper'), cv = $('#paint'), linesImg = $('#lines');
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  let W = 0, H = 0, labels, minx, miny, maxx, maxy;
  let tool = 'bucket', color = PALETTE[0], size = 1;
  let imgData, u32, stale = true, painted = false, dirtyTimer = 0, destroyed = false, stopCele = null;
  const used = new Set();
  const undo = [], redo = [];
  let z = 1, tx = 0, ty = 0, bs = 1;

  // ---- yükleme ----
  const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  let labImg;
  try {
    [labImg] = await Promise.all([loadImg(`${base}-b.webp`), new Promise((res, rej) => { linesImg.onload = res; linesImg.onerror = rej; linesImg.src = `${base}-c.webp`; })]);
  } catch {
    $('#stload').textContent = 'Bu sayfa şu an açılamadı. İnternet bağlantını kontrol edip tekrar dene.';
    return { destroy() {} };
  }
  if (destroyed) return { destroy() {} };
  W = linesImg.naturalWidth; H = linesImg.naturalHeight;
  cv.width = W; cv.height = H; paper.style.width = W + 'px'; paper.style.height = H + 'px';
  paper.style.backgroundImage = 'none';
  {
    const lc = document.createElement('canvas'); lc.width = W; lc.height = H;
    const lx = lc.getContext('2d', { willReadFrequently: true }); lx.drawImage(labImg, 0, 0);
    const d = lx.getImageData(0, 0, W, H).data;
    labels = new Uint16Array(W * H); let n = 0;
    for (let i = 0, j = 0; i < labels.length; i++, j += 4) { const v = d[j] | (d[j + 1] << 8); labels[i] = v; if (v > n) n = v; }
    minx = new Int16Array(n + 1).fill(W); miny = new Int16Array(n + 1).fill(H); maxx = new Int16Array(n + 1).fill(-1); maxy = new Int16Array(n + 1).fill(-1);
    for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i++) { const v = labels[i]; if (x < minx[v]) minx[v] = x; if (x > maxx[v]) maxx[v] = x; if (y < miny[v]) miny[v] = y; if (y > maxy[v]) maxy[v] = y; }
  }
  const saved = await getPaint(id);
  if (saved?.blob) {
    try {
      if (window.createImageBitmap) ctx.drawImage(await createImageBitmap(saved.blob), 0, 0);
      else { const u = URL.createObjectURL(saved.blob); ctx.drawImage(await loadImg(u), 0, 0); URL.revokeObjectURL(u); }
      painted = true;
    } catch {}
  }
  $('#stload').remove();
  layout(); setTool('bucket'); setColor(color); setSize(1);

  // ---- yardımcılar ----
  function sync() { if (stale) { imgData = ctx.getImageData(0, 0, W, H); u32 = new Uint32Array(imgData.data.buffer); stale = false; } }
  const px = ev => { const r = paper.getBoundingClientRect(); return [Math.floor((ev.clientX - r.left) / r.width * W), Math.floor((ev.clientY - r.top) / r.height * H)]; };
  const inside = (x, y) => x >= 0 && y >= 0 && x < W && y < H;
  const c32 = () => { const n = parseInt(color.slice(1), 16); return (255 << 24) | ((n & 255) << 16) | (((n >> 8) & 255) << 8) | (n >> 16); };
  function crop(src, sw, bx, by, w, h) { // ImageData parçası kopyala
    const out = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) out.data.set(src.subarray(((by + y) * sw + bx) * 4, ((by + y) * sw + bx + w) * 4), y * w * 4);
    return out;
  }
  function pushUndo(e) { undo.push(e); if (undo.length > MAXUNDO) undo.shift(); redo.length = 0; markDirty(); }
  function updButtons() { $('[data-act=undo]').disabled = !undo.length; $('[data-act=redo]').disabled = !redo.length; }

  function fillAt(x, y) {
    sync();
    const L = labels[y * W + x], bx = minx[L], by = miny[L], w = maxx[L] - bx + 1, h = maxy[L] - by + 1;
    const col = c32(); if (u32[y * W + x] === col && regionIs(L, col)) return;
    const before = ctx.getImageData(bx, by, w, h);
    for (let yy = by; yy < by + h; yy++) { const row = yy * W; for (let xx = bx; xx < bx + w; xx++) if (labels[row + xx] === L) u32[row + xx] = col; }
    ctx.putImageData(imgData, 0, 0, bx, by, w, h);
    painted = true; used.add(color); pushUndo({ bx, by, w, h, data: before }); navigator.vibrate?.(8); sfx.fill();
  }
  function regionIs(L, col) { for (let yy = miny[L]; yy <= maxy[L]; yy++) for (let xx = minx[L]; xx <= maxx[L]; xx++) if (labels[yy * W + xx] === L && u32[yy * W + xx] !== col) return false; return true; }

  // ---- fırça / silgi ----
  let stroke = null;
  function startStroke(x, y) {
    sync();
    stroke = { snap: ctx.getImageData(0, 0, W, H), lx: x, ly: y, x0: x, y0: y, x1: x, y1: y };
    ctx.lineCap = ctx.lineJoin = 'round'; ctx.lineWidth = SIZES[size]; ctx.strokeStyle = ctx.fillStyle = color;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.beginPath(); ctx.arc(x, y, SIZES[size] / 2, 0, 7); ctx.fill();
    stale = true;
  }
  function moveStroke(x, y) {
    ctx.beginPath(); ctx.moveTo(stroke.lx, stroke.ly); ctx.lineTo(x, y); ctx.stroke();
    stroke.lx = x; stroke.ly = y; stroke.x0 = Math.min(stroke.x0, x); stroke.x1 = Math.max(stroke.x1, x); stroke.y0 = Math.min(stroke.y0, y); stroke.y1 = Math.max(stroke.y1, y);
  }
  function endStroke(commit) {
    if (!stroke) return;
    ctx.globalCompositeOperation = 'source-over';
    const s = stroke; stroke = null;
    if (!commit) { ctx.putImageData(s.snap, 0, 0); stale = true; return; }
    const r = SIZES[size] / 2 + 2;
    const bx = Math.max(0, Math.floor(s.x0 - r)), by = Math.max(0, Math.floor(s.y0 - r));
    const w = Math.min(W, Math.ceil(s.x1 + r)) - bx, h = Math.min(H, Math.ceil(s.y1 + r)) - by;
    painted = true; if (tool === 'brush') used.add(color); pushUndo({ bx, by, w, h, data: crop(s.snap.data, W, bx, by, w, h) });
    updButtons();
  }
  function step(from, to) {
    const e = from.pop(); if (!e) return;
    const now = ctx.getImageData(e.bx, e.by, e.w, e.h);
    ctx.putImageData(e.data, e.bx, e.by); stale = true;
    to.push({ ...e, data: now }); updButtons(); markDirty();
  }

  // ---- yakınlaştır / kaydır ----
  function clamp() {
    const r = stage.getBoundingClientRect(), cw = W * bs * z, ch = H * bs * z, m = 60;
    tx = cw <= r.width ? (r.width - cw) / 2 : Math.min(m, Math.max(r.width - cw - m, tx));
    ty = ch <= r.height ? (r.height - ch) / 2 : Math.min(m, Math.max(r.height - ch - m, ty));
  }
  function apply() { paper.style.transform = `translate(${tx}px,${ty}px) scale(${bs * z})`; }
  function layout() { const r = stage.getBoundingClientRect(); bs = Math.min(r.width / W, r.height / H) * 0.97; clamp(); apply(); }
  function zoomAt(f, cx, cy) {
    const nz = Math.min(8, Math.max(1, z * f)), k = nz / z;
    tx = cx - (cx - tx) * k; ty = cy - (cy - ty) * k; z = nz; clamp(); apply();
  }
  const ro = new ResizeObserver(() => W && layout()); ro.observe(stage);

  // ---- işaretçi ----
  const ptrs = new Map(); let mode = null, pinch = null, moved = 0, t0 = 0;
  const rel = ev => { const r = stage.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
  stage.addEventListener('pointerdown', ev => {
    if (ev.button > 0 || ev.target.closest('button')) return;
    stage.setPointerCapture(ev.pointerId);
    ptrs.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (ptrs.size === 2) {
      endStroke(false); mode = 'pinch';
      const [a, b2] = [...ptrs.values()];
      pinch = { d: Math.hypot(a.x - b2.x, a.y - b2.y), z0: z, cx: (a.x + b2.x) / 2, cy: (a.y + b2.y) / 2 };
      return;
    }
    if (ptrs.size > 2) return;
    moved = 0; t0 = performance.now();
    if (tool === 'hand') mode = 'pan';
    else if (tool === 'bucket') mode = 'tap';
    else { const [x, y] = px(ev); if (inside(x, y)) { mode = 'stroke'; startStroke(x, y); } else mode = null; }
  });
  stage.addEventListener('pointermove', ev => {
    const q = ptrs.get(ev.pointerId); if (!q) return;
    const dx = ev.clientX - q.x, dy = ev.clientY - q.y; q.x = ev.clientX; q.y = ev.clientY;
    if (mode === 'pinch' && ptrs.size === 2) {
      const [a, b2] = [...ptrs.values()], d = Math.hypot(a.x - b2.x, a.y - b2.y), cx = (a.x + b2.x) / 2, cy = (a.y + b2.y) / 2;
      const r = stage.getBoundingClientRect();
      tx += cx - pinch.cx; ty += cy - pinch.cy; pinch.cx = cx; pinch.cy = cy;
      zoomAt(Math.min(8, Math.max(1, pinch.z0 * d / pinch.d)) / z, cx - r.left, cy - r.top);
      return;
    }
    moved += Math.abs(dx) + Math.abs(dy);
    if (mode === 'tap' && moved > 10) mode = 'pan';
    if (mode === 'pan') { tx += dx; ty += dy; clamp(); apply(); }
    else if (mode === 'stroke' && stroke) {
      const evs = ev.getCoalescedEvents?.() || [ev];
      for (const e of evs) { const [x, y] = px(e); moveStroke(x, y); }
    }
  });
  const up = ev => {
    if (!ptrs.has(ev.pointerId)) return;
    ptrs.delete(ev.pointerId);
    if (mode === 'tap' && ev.type === 'pointerup' && moved <= 10 && performance.now() - t0 < 800) { const [x, y] = px(ev); if (inside(x, y)) fillAt(x, y); updButtons(); }
    else if (mode === 'stroke') endStroke(ev.type === 'pointerup');
    if (ptrs.size === 0) { mode = null; pinch = null; } else if (mode !== 'pinch') mode = null;
  };
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
  stage.addEventListener('wheel', ev => { ev.preventDefault(); const r = stage.getBoundingClientRect(); zoomAt(Math.exp(-ev.deltaY * 0.0018), ev.clientX - r.left, ev.clientY - r.top); }, { passive: false });
  stage.addEventListener('contextmenu', ev => ev.preventDefault());

  // ---- araç çubuğu ----
  function setTool(t) {
    tool = t;
    host.querySelectorAll('.tool').forEach(b2 => { const on = b2.dataset.tool === t; b2.classList.toggle('on', on); b2.setAttribute('aria-checked', on); });
    $('#sizes').hidden = !(t === 'brush' || t === 'eraser');
    stage.dataset.tool = t;
  }
  function setColor(c) {
    color = c;
    host.querySelectorAll('.sw').forEach(b2 => { const on = b2.dataset.c === c; b2.classList.toggle('on', on); b2.setAttribute('aria-checked', on); });
    host.querySelectorAll('.tool i, .st-sizes i').forEach(i => i.style.background = '');
    host.style.setProperty('--pick', c);
  }
  function setSize(i) { size = i; host.querySelectorAll('[data-size]').forEach(b2 => { const on = +b2.dataset.size === i; b2.classList.toggle('on', on); b2.setAttribute('aria-checked', on); }); }

  // ---- kaydetme ----
  function markDirty() { updButtons(); clearTimeout(dirtyTimer); dirtyTimer = setTimeout(persist, 900); }
  async function persist() {
    clearTimeout(dirtyTimer);
    const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
    const tc = document.createElement('canvas'); tc.width = 260; tc.height = Math.round(260 * H / W);
    const tx2 = tc.getContext('2d'); tx2.fillStyle = '#fff'; tx2.fillRect(0, 0, tc.width, tc.height);
    tx2.drawImage(cv, 0, 0, tc.width, tc.height); tx2.drawImage(linesImg, 0, 0, tc.width, tc.height);
    const thumb = await new Promise(r => tc.toBlob(r, 'image/jpeg', 0.7));
    if (!blob) return;
    const ok = await putPaint(id, { blob, thumb, t: Date.now() });
    if (ok === false) toast('Resmin bu cihazda saklanamadı. “Kaydet” ile indirebilirsin.');
  }
  function hasPaint() { sync(); for (let i = 0; i < u32.length; i++) if (u32[i] >>> 24) return true; return false; }
  function coverage() { sync(); let n = 0, k = 0; for (let i = 0; i < u32.length; i += 7) { k++; if (u32[i] >>> 24) n++; } return n / k; }
  async function finish() {
    $('.bravo')?.remove(); stopCele?.();
    if (coverage() < 0.05) { toast('Biraz daha boyamak ister misin? Sonra yine “Bitti”ye dokun.'); say?.('az'); sfx.soft(); return; }
    await persist();
    const said = onDone?.() || {};
    stopCele = celebrate({ stage, paper, colors: [...used], text: said.text }); sfx.chime();
    stage.insertAdjacentHTML('beforeend', `<div class="bravo" role="status"><div class="seal">${icon('star')}</div><p>${said.text || 'Mâşallah, ne güzel boyamışsın!'}</p>
      <div class="row"><a class="btn small" href="#resimler/yeni/${id}">${icon('star')} Duvarıma bak</a><button class="btn small ghost" data-act="keep">Boyamaya devam</button></div></div>`);
  }
  async function exportPNG() {
    if (!hasPaint()) { toast('Önce biraz boya, sonra kaydedebilirsin.'); return; }
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(cv, 0, 0); x.drawImage(linesImg, 0, 0);
    const blob = await new Promise(r => c.toBlob(r, 'image/png'));
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = `iyilik-kitap${b}-sayfa${p}-resmim.png`; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 15000);
    toast('Resmin kaydedildi.');
  }

  const onClick = async ev => {
    const t = ev.target.closest('button'); if (!t) return;
    sfx.tap();
    if (t.dataset.tool) return setTool(t.dataset.tool);
    if (t.dataset.c) { setColor(t.dataset.c); if (tool === 'hand' || tool === 'eraser') setTool('bucket'); return; }
    if (t.dataset.size) return setSize(+t.dataset.size);
    const r = stage.getBoundingClientRect(), act = t.dataset.act;
    if (act === 'undo') step(undo, redo);
    else if (act === 'redo') step(redo, undo);
    else if (act === 'zin') zoomAt(1.5, r.width / 2, r.height / 2);
    else if (act === 'zout') zoomAt(1 / 1.5, r.width / 2, r.height / 2);
    else if (act === 'fit') { z = 1; clamp(); apply(); }
    else if (act === 'save') exportPNG();
    else if (act === 'done') finish();
    else if (act === 'keep') { $('.bravo')?.remove(); }
    else if (act === 'clear') { $('#sheet').hidden = false; $('[data-act=clear-no]').focus(); }
    else if (act === 'clear-no') $('#sheet').hidden = true;
    else if (act === 'clear-yes') {
      $('#sheet').hidden = true;
      const before = ctx.getImageData(0, 0, W, H); ctx.clearRect(0, 0, W, H); stale = true; painted = false;
      pushUndo({ bx: 0, by: 0, w: W, h: H, data: before });
      clearTimeout(dirtyTimer); await delPaint(id);
    }
  };
  host.addEventListener('click', onClick);
  const onHide = () => { if (document.visibilityState === 'hidden' && painted) persist(); };
  document.addEventListener('visibilitychange', onHide);
  return {
    destroy() {
      destroyed = true; stopCele?.(); ro.disconnect(); host.removeEventListener('click', onClick); document.removeEventListener('visibilitychange', onHide);
      if (dirtyTimer && painted) persist();
    },
  };
}
