// Canlanan sayfa: kitabın gerçek çizgi resmi "çiziliyormuş gibi" açılır, bölgeler yumuşakça renklenir,
// çevre (gökyüzü/su/ışık) çok hafif canlanır; sayfanın kendi metni sesli okunur. Video değil: kodla çalışır.
// Karakter bölgelerine hareket uygulanmaz; çizgiler her zaman asıl raster çizgidir.
import { state, save } from './store.js';
import { icon } from './icons.js';

const LINE_T = 10.5;       // sn: çizgilerin çizilmesi
const COLOR_AT = 8.0;      // sn: renklenme başlar (çizim bitmeden)
const COLOR_T = 12.0;      // sn: renklenme süresi
const FADE = 0.9;          // sn: bir bölgenin yumuşak dolması
const TAIL = 1.6;          // sn: son bekleme (düğme belirir)
const T_END = COLOR_AT + COLOR_T + TAIL;
const PEN_UP = 20;         // kalem kaldırma maliyeti (çizim hızında piksel eşdeğeri)
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('resim')); i.src = src; });
const getJSON = async u => { const r = await fetch(u); if (!r.ok) throw new Error(r.status); return r.json(); };
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const smooth = x => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

let readyPromise;
/** Hangi sayfaların canlanışı üretildi: sayfa/canlan.json -> Set */
export function canlanHazir() {
  return readyPromise ||= getJSON('sayfa/canlan.json').then(a => new Set(a)).catch(() => new Set());
}

export async function openCanlan(host, { b, p, toast }) {
  const id = `b${b}-${String(p).padStart(2, '0')}`, base = `sayfa/${id}`;
  host.innerHTML = `
  <div class="cn" data-book="${b}">
    <div class="st-top">
      <a class="ibtn" href="#sayfa/${b}/${p}" aria-label="Sayfa ekranına dön">${icon('back')}</a>
      <div class="st-title">Sayfa ${p}</div>
      <button class="ibtn" data-act="snd" aria-label="Sesi aç/kapat">${icon(state.sound ? 'speaker' : 'mute')}</button>
    </div>
    <div class="cn-stage" id="cnstage">
      <div class="cn-paper" id="cnpaper"><div class="cn-zoom" id="cnzoom">
        <canvas class="cn-col" id="cncol"></canvas><div class="cn-fx cn-fxa" id="fxa"></div><div class="cn-fx cn-fxb" id="fxb"></div>
        <canvas class="cn-lines" id="cnlines"></canvas></div></div>
      <div class="cn-load" id="cnload">Sayfa canlanıyor…</div>
      <button class="cn-unmute" id="cnunmute" hidden>${icon('speaker')} Sesle izle</button>
    </div>
    <div class="cn-cap" id="cncap" aria-live="off"></div>
    <div class="cn-dock">
      <div class="cn-ctl" id="cnctl">
        <button class="ibtn" data-act="pp" aria-label="Duraklat">${icon('pause')}</button>
        <button class="ibtn" data-act="redo" aria-label="Baştan izle">${icon('redo')}</button>
        <button class="ibtn" data-act="skip" aria-label="Sona atla">${icon('next')}</button>
      </div>
      <a class="btn cn-cta" id="cncta" href="#boya/${b}/${p}" tabindex="-1" aria-hidden="true">${icon('paint')} Şimdi sen boya!</a>
    </div>
  </div>`;
  document.body.classList.add('studio-on');
  const $ = s => host.querySelector(s);
  const stage = $('#cnstage'), zoom = $('#cnzoom'), cap = $('#cncap'), cta = $('#cncta'), ctl = $('#cnctl');
  const col = $('#cncol'), lc = $('#cnlines');
  let destroyed = false, raf = 0, zoomAnim = null;
  const audios = [];
  const rm = () => { destroyed = true; cancelAnimationFrame(raf); audios.forEach(a => a.el.pause()); zoomAnim?.cancel(); };

  let yol, renk, linesImg, labImg;
  try {
    [yol, renk, linesImg, labImg] = await Promise.all([getJSON(`${base}-yol.json`), getJSON(`${base}-renk.json`), loadImg(`${base}-c.webp`), loadImg(`${base}-b.webp`)]);
  } catch {
    if (destroyed) return { destroy: rm };
    $('#cnload').innerHTML = `Bu sayfanın canlanışı henüz hazır değil.<br><a class="btn" style="margin-top:12px" href="#boya/${b}/${p}">${icon('paint')} Bu sayfayı boya</a>`;
    return { destroy: rm };
  }
  const W = renk.w, H = renk.h;
  for (const c of [col, lc]) { c.width = W; c.height = H; }
  const cx = col.getContext('2d'), lx = lc.getContext('2d');
  const mask = document.createElement('canvas'); mask.width = W; mask.height = H;
  const mx = mask.getContext('2d'); mx.lineCap = 'round'; mx.lineJoin = 'round'; mx.strokeStyle = '#000';

  // ---- bölge haritası: bölge başına piksel listesi ----
  const probe = document.createElement('canvas'); probe.width = W; probe.height = H;
  const px = probe.getContext('2d', { willReadFrequently: true }); px.drawImage(labImg, 0, 0);
  const rgba = px.getImageData(0, 0, W, H).data, N = renk.e.length;
  const cnt = new Uint32Array(N + 2), lab = new Uint16Array(W * H);
  for (let i = 0, j = 0; i < lab.length; i++, j += 4) { const v = rgba[j] | (rgba[j + 1] << 8); lab[i] = v; cnt[v]++; }
  const start = new Uint32Array(N + 2); for (let i = 1; i <= N + 1; i++) start[i] = start[i - 1] + cnt[i - 1];
  const fillp = start.slice(), list = new Uint32Array(W * H);
  const bb = new Int32Array((N + 1) * 4); for (let i = 0; i <= N; i++) { bb[i * 4] = W; bb[i * 4 + 1] = H; bb[i * 4 + 2] = -1; bb[i * 4 + 3] = -1; }
  for (let i = 0; i < lab.length; i++) {
    const v = lab[i]; list[fillp[v]++] = i;
    const x = i % W, y = (i / W) | 0, o = v * 4;
    if (x < bb[o]) bb[o] = x; if (y < bb[o + 1]) bb[o + 1] = y; if (x > bb[o + 2]) bb[o + 2] = x; if (y > bb[o + 3]) bb[o + 3] = y;
  }
  const img = cx.createImageData(W, H), u32 = new Uint32Array(img.data.buffer);

  // ---- renk zamanlaması: nesne grupları sırayla, grup içinde yukarıdan aşağı ----
  const acts = []; // {id, st, rgb}
  const G = renk.g.filter(g => g.length), nG = G.length;
  G.forEach((g, k) => {
    const g0 = COLOR_AT + (COLOR_T - FADE - 0.7) * (nG > 1 ? k / (nG - 1) : 0);
    g.forEach((rid, j) => { const c = renk.e[rid - 1]?.[1]; if (c) acts.push({ id: rid, st: g0 + 0.7 * (j / g.length), rgb: hex(c), a: 0 }); });
  });
  acts.sort((a, b) => a.st - b.st);

  // ---- çizim zamanlaması ----
  const edges = yol.e.map(e => {
    const pts = []; for (let i = 1; i + 2 < e.length; i += 3) pts.push([e[i], e[i + 1], e[i + 2]]);
    let len = 0; const cum = [0];
    for (let i = 1; i < pts.length; i++) { len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); cum.push(len); }
    return { pts, len, cum, w: len + PEN_UP };
  });
  const totalW = edges.reduce((a, e) => a + e.w, 0);
  let drawnS = 0;       // ağırlık ekseninde çizilen
  let dirty = null;
  const mark = (x0, y0, x1, y1, r) => {
    const a = Math.max(0, Math.floor(Math.min(x0, x1) - r - 2)), b2 = Math.max(0, Math.floor(Math.min(y0, y1) - r - 2));
    const c = Math.min(W, Math.ceil(Math.max(x0, x1) + r + 2)), d = Math.min(H, Math.ceil(Math.max(y0, y1) + r + 2));
    dirty = dirty ? [Math.min(dirty[0], a), Math.min(dirty[1], b2), Math.max(dirty[2], c), Math.max(dirty[3], d)] : [a, b2, c, d];
  };
  function strokePart(e, a, b2) { // polyline'ın [a,b] uzunluk aralığı
    const { pts, cum } = e;
    if (pts.length === 1) { const [x, y, r] = pts[0]; mx.beginPath(); mx.arc(x, y, r, 0, 7); mx.fill(); mark(x, y, x, y, r); return; }
    for (let i = 1; i < pts.length; i++) {
      const s0 = cum[i - 1], s1 = cum[i];
      if (s1 <= a || s0 >= b2) continue;
      const t0 = Math.max(0, (a - s0) / (s1 - s0 || 1)), t1 = Math.min(1, (b2 - s0) / (s1 - s0 || 1));
      const [xa, ya, ra] = pts[i - 1], [xb, yb, rb] = pts[i];
      const X0 = xa + (xb - xa) * t0, Y0 = ya + (yb - ya) * t0, X1 = xa + (xb - xa) * t1, Y1 = ya + (yb - ya) * t1;
      const r = (ra + rb) / 2; mx.lineWidth = r * 2;
      mx.beginPath(); mx.moveTo(X0, Y0); mx.lineTo(X1, Y1); mx.stroke(); mark(X0, Y0, X1, Y1, r);
    }
  }
  let ei = 0, eoff = 0, accW = 0; // sıradaki kenar, o kenarda çizilmiş uzunluk, önceki kenarların ağırlığı
  function resetLines() { mx.clearRect(0, 0, W, H); lx.clearRect(0, 0, W, H); ei = 0; eoff = 0; accW = 0; drawnS = 0; dirty = null; }
  function advanceLines(s) {
    mx.fillStyle = '#000';
    while (ei < edges.length) {
      const e = edges[ei], want = s - accW;
      if (want <= 0) break;
      const upto = want >= e.w ? e.len : Math.max(0, want - PEN_UP);
      if (upto > eoff) { strokePart(e, eoff, upto); eoff = upto; }
      if (want >= e.w) { accW += e.w; ei++; eoff = 0; } else break;
    }
    drawnS = s;
    if (dirty) {
      const [a, b2, c, d] = dirty, w = c - a, h = d - b2;
      lx.save(); lx.beginPath(); lx.rect(a, b2, w, h); lx.clip(); // destination-in tüm tuvali etkiler: kırpmazsak eski çizgiler silinir
      lx.globalCompositeOperation = 'source-over'; lx.clearRect(a, b2, w, h); lx.drawImage(linesImg, 0, 0);
      lx.globalCompositeOperation = 'destination-in'; lx.drawImage(mask, 0, 0);
      lx.restore(); dirty = null;
    }
  }
  function showAllLines() { lx.globalCompositeOperation = 'source-over'; lx.clearRect(0, 0, W, H); lx.drawImage(linesImg, 0, 0); ei = edges.length; drawnS = totalW; }

  // ---- renk güncelleme ----
  let colAt = 0; // acts[colAt'a kadar] tamamlandı
  function resetColors() { u32.fill(0); cx.clearRect(0, 0, W, H); acts.forEach(a => a.a = 0); colAt = 0; }
  function paintColors(t) {
    let x0 = W, y0 = H, x1 = -1, y1 = -1, any = false;
    for (let k = colAt; k < acts.length; k++) {
      const a = acts[k];
      if (a.st > t) break;
      const al = Math.round(smooth((t - a.st) / FADE) * 255);
      if (al !== a.a) {
        a.a = al;
        const v = ((al << 24) | (a.rgb[2] << 16) | (a.rgb[1] << 8) | a.rgb[0]) >>> 0;
        for (let i = start[a.id], e = start[a.id + 1]; i < e; i++) u32[list[i]] = v;
        const o = a.id * 4; x0 = Math.min(x0, bb[o]); y0 = Math.min(y0, bb[o + 1]); x1 = Math.max(x1, bb[o + 2]); y1 = Math.max(y1, bb[o + 3]); any = true;
      }
      if (al === 255 && k === colAt) colAt++;
    }
    if (any) cx.putImageData(img, 0, 0, x0, y0, x1 - x0 + 1, y1 - y0 + 1);
  }

  // ---- çevre: yalnız gökyüzü/su/güneş/ışık bölgelerinde çok hafif hareket (CSS, maske ile) ----
  const maskUrls = [];
  async function ambient() {
    const mk = async (ids, el) => {
      if (!ids.length) { el.hidden = true; return; }
      const set = new Uint8Array(N + 1); ids.forEach(i => set[i] = 1);
      const sw = 416, sh = Math.round(416 * H / W), c = document.createElement('canvas'); c.width = sw; c.height = sh;
      const g = c.getContext('2d'), d = g.createImageData(sw, sh);
      for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) if (set[lab[((y * 2) | 0) * W + ((x * 2) | 0)]]) d.data[(y * sw + x) * 4 + 3] = 255;
      g.putImageData(d, 0, 0);
      const blob = await new Promise(r => c.toBlob(r, 'image/png')); const u = URL.createObjectURL(blob); maskUrls.push(u);
      el.style.webkitMaskImage = el.style.maskImage = `url(${u})`;
    };
    await mk(renk.ortam || [], $('#fxa')); await mk(renk.isik || [], $('#fxb'));
  }

  // ---- ses ----
  const tNarr = {
    giris: 0.6,
    yonerge: Math.max((renk.ses?.giris ? 0.6 + renk.ses.giris.d : 0) + 0.8, COLOR_AT + COLOR_T - (renk.ses?.yonerge?.d || 0) - 0.3),
  };
  for (const k of ['giris', 'yonerge']) {
    const s = renk.ses?.[k]; if (!s) continue;
    const el = new Audio(`ses/${s.f}`); el.preload = 'auto';
    audios.push({ k, el, at: tNarr[k], end: tNarr[k] + s.d, cues: s.s, started: false });
  }
  const sndOn = () => state.sound;
  let blocked = false;
  function audioTick(t) {
    for (const a of audios) {
      if (!a.started && t >= a.at && t < a.end - 0.2 && sndOn()) {
        a.started = true; a.el.currentTime = Math.max(0, t - a.at);
        a.el.play().catch(() => { blocked = true; a.started = false; $('#cnunmute').hidden = false; });
      }
    }
    // altyazı (ses kapalıyken de metin görünür)
    let txt = '';
    for (const a of audios) for (const c of a.cues || []) if (t >= a.at + c.a && t < a.at + c.b + 0.3) txt = c.t;
    if (cap.textContent !== txt) cap.textContent = txt;
  }
  function stopAudio() { audios.forEach(a => { a.el.pause(); a.started = false; }); }

  // ---- zaman çizelgesi ----
  let t = 0, playing = false, last = 0, finished = false;
  const fxOn = !reduce;
  const fxa = $('#fxa'), fxb = $('#fxb');
  function render(tt) {
    const s = Math.min(1, tt / LINE_T) * totalW;
    if (s >= totalW) { if (ei < edges.length || drawnS < totalW) showAllLines(); } else if (s > drawnS) advanceLines(s);
    paintColors(tt);
    if (fxOn) { const o = smooth((tt - (COLOR_AT + COLOR_T - 3)) / 3); fxa.style.opacity = fxb.style.opacity = o; }
    if (zoomAnim) zoomAnim.currentTime = tt * 1000;
    const done = tt >= T_END - TAIL + 0.5;
    cta.classList.toggle('off', !done); cta.tabIndex = done ? 0 : -1; cta.setAttribute('aria-hidden', done ? 'false' : 'true');
  }
  function seek(tt) { // geri sarma gerekiyorsa sıfırdan
    if (tt < t || tt === 0) { resetLines(); resetColors(); cta.classList.add('off'); }
    t = tt; render(t);
  }
  function frame(now) {
    if (destroyed) return; raf = requestAnimationFrame(frame);
    if (!playing) { last = now; return; }
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    t = Math.min(T_END, t + dt); render(t); audioTick(t);
    if (t >= T_END) setPlaying(false, true);
  }
  function setPlaying(v, end) {
    playing = v; finished = !!end;
    const pb = $('[data-act=pp]');
    pb.innerHTML = icon(v ? 'pause' : 'play'); pb.setAttribute('aria-label', v ? 'Duraklat' : (end ? 'Yeniden oynat' : 'Devam et'));
    host.querySelector('.cn').classList.toggle('paused', !v && !end); // bitişte çevre hafif canlı kalır
    if (!v) audios.forEach(a => a.el.pause()); else audios.forEach(a => { if (a.started && a.el.paused && t < a.end) a.el.play().catch(() => {}); });
  }
  function restart() { stopAudio(); seek(0); zoomAnim?.cancel(); mkZoom(); $('#cnunmute').hidden = true; blocked = false; last = performance.now(); setPlaying(true); }
  function skip() { stopAudio(); seek(T_END); cap.textContent = ''; setPlaying(false, true); }
  function mkZoom() { if (reduce) return; zoomAnim = zoom.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.07)' }], { duration: T_END * 1000, fill: 'both', easing: 'linear' }); zoomAnim.pause(); }

  host.addEventListener('click', ev => {
    const act = ev.target.closest('[data-act]')?.dataset.act;
    if (act === 'pp') { if (finished) restart(); else { last = performance.now(); setPlaying(!playing); } }
    else if (act === 'redo') restart();
    else if (act === 'skip') skip();
    else if (act === 'snd') {
      state.sound = !state.sound; save();
      ev.target.closest('button').innerHTML = icon(state.sound ? 'speaker' : 'mute');
      if (!state.sound) { stopAudio(); } toast?.(state.sound ? 'Ses açık' : 'Ses kapalı');
    } else if (ev.target.closest('#cnunmute')) { state.sound = true; save(); restart(); }
  });
  const onKey = e => { if (e.key === ' ' && !e.target.closest('button,a')) { e.preventDefault(); $('[data-act=pp]').click(); } };
  addEventListener('keydown', onKey);

  await ambient();
  if (destroyed) return { destroy: rm };
  $('#cnload').hidden = true;
  if (reduce) { // hareket istemeyen için: renkli son kare
    showAllLines(); t = T_END; acts.forEach(a => a.st = -10); paintColors(T_END); cta.classList.remove('off'); cta.tabIndex = 0; cta.removeAttribute('aria-hidden'); ctl.hidden = true;
    const lis = document.createElement('button'); lis.className = 'btn ghost'; lis.innerHTML = `${icon('speaker')} Dinle`;
    lis.onclick = () => { stopAudio(); audios.forEach((a, i) => setTimeout(() => a.el.play().catch(() => {}), i ? (audios[0].end - audios[0].at + 0.5) * 1000 : 0)); };
    if (audios.length) $('.cn-dock').prepend(lis);
    return { destroy() { removeEventListener('keydown', onKey); maskUrls.forEach(URL.revokeObjectURL); rm(); } };
  }
  mkZoom();
  last = performance.now(); setPlaying(true); raf = requestAnimationFrame(frame);
  render(0);
  return {
    destroy() { removeEventListener('keydown', onKey); maskUrls.forEach(URL.revokeObjectURL); rm(); },
    _debug: { seek, get t() { return t; }, T_END },
  };
}
