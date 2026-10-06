/* Rauf Enç — Tanıtım Videosu Kompozisyon Motoru
 * Tek storyboard → iki doğal yerleşim (fmt=h 1920×1080, fmt=v 1080×1920).
 * Tüm görünüm yalnızca t'nin fonksiyonudur: STUDIO.seek(t) deterministiktir.
 * URL: engine/index.html?sb=<storyboard.json yolu>&fmt=h|v[&t=saniye][&play=1]
 */
(function () {
  'use strict';
  const Q = new URLSearchParams(location.search);
  const FMT = Q.get('fmt') === 'v' ? 'v' : 'h';
  const W = FMT === 'h' ? 1920 : 1080;
  const H = FMT === 'h' ? 1080 : 1920;
  document.documentElement.dataset.fmt = FMT;

  // ── yardımcılar ──
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const E = {
    lin: (t) => t,
    out: (t) => 1 - Math.pow(1 - t, 3),
    out4: (t) => 1 - Math.pow(1 - t, 4),
    in: (t) => t * t * t,
    io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    expo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    back: (t) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    sine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  };
  const P = (t, t0, d) => clamp((t - t0) / d);
  const el = (tag, cls, parent, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // *vurgu* → <em>, **kalın** → <b>
  const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  const pick = (v) => (v && typeof v === 'object' && !Array.isArray(v) && ('h' in v || 'v' in v) ? (v[FMT] !== undefined ? v[FMT] : v.h !== undefined ? v.h : v.v) : v);
  // katı seçim: {h,v} nesnesinde yalnızca bu biçimin anahtarı (diğerine düşmez)
  const pickStrict = (v) => (v && typeof v === 'object' && !Array.isArray(v) && ('h' in v || 'v' in v) ? v[FMT] : v);
  const hexRgb = (hex) => {
    const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex || '');
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [99, 102, 241];
  };
  const fmtNum = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const set = (e, o, tf) => { e.style.opacity = o; if (tf !== undefined) e.style.transform = tf; e.style.visibility = o <= 0.001 ? 'hidden' : 'visible'; };

  // Kelimeleri satır maskesi içinde böl. lines: string[] (vurgu destekli)
  function wordLines(parent, lines, cls) {
    const words = [];
    lines.forEach((ln) => {
      const L = el('span', 'line ' + (cls || ''), parent);
      // vurguyu kelime düzeyine taşı
      const tokens = [];
      let emph = false;
      String(ln).split(/(\*)/).forEach((part) => {
        if (part === '*') { emph = !emph; return; }
        part.split(/(\s+)/).forEach((w) => { if (w) tokens.push({ w, emph }); });
      });
      tokens.forEach((tk) => {
        if (/^\s+$/.test(tk.w)) { L.appendChild(document.createTextNode(' ')); return; }
        const s = el('span', 'w' + (tk.emph ? ' em' : ''), L);
        s.textContent = tk.w;
        words.push(s);
      });
    });
    return words;
  }
  function animWords(words, t, t0, stagger = 0.06, dur = 0.7) {
    words.forEach((w, i) => {
      const p = E.out4(P(t, t0 + i * stagger, dur));
      w.style.transform = `translate3d(0, ${(1 - p) * 140}%, 0) rotate(${(1 - p) * 4}deg)`;
      w.style.opacity = clamp(p * 1.6);
    });
  }

  // Satırları kutuya sığdır (yazı boyutunu küçült)
  function fitLines(container, maxW, minScale = 0.5) {
    const lines = [...container.querySelectorAll('.line')];
    if (!lines.length) return 1;
    const base = parseFloat(getComputedStyle(container).fontSize);
    let widest = 0;
    lines.forEach((l) => { l.style.display = 'inline-block'; widest = Math.max(widest, l.getBoundingClientRect().width); l.style.display = ''; });
    const s = clamp(maxW / widest, minScale, 1);
    if (s < 1) container.style.fontSize = base * s + 'px';
    return s;
  }
  // Tek satırlık başlığı gerekirse dengeli iki satıra böl
  function splitBalanced(text, measureEl, maxW) {
    if (String(text).includes('\n')) return String(text).split('\n');
    measureEl.textContent = String(text).replace(/\*/g, '');
    measureEl.style.display = 'inline-block';
    const w = measureEl.getBoundingClientRect().width;
    measureEl.textContent = '';
    if (w <= maxW) return [text];
    const words = String(text).split(' ');
    if (words.length < 2) return [text];
    let best = null;
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
      // vurgu işaretlerini parçalar arasında bölme
      const ca = (a.match(/\*/g) || []).length;
      if (ca % 2) continue;
      measureEl.textContent = a.replace(/\*/g, ''); const wa = measureEl.getBoundingClientRect().width;
      measureEl.textContent = b.replace(/\*/g, ''); const wb = measureEl.getBoundingClientRect().width;
      const score = Math.max(wa, wb);
      if (!best || score < best.score) best = { score, lines: [a, b] };
    }
    measureEl.textContent = '';
    return best ? best.lines : [text];
  }
  function shrinkToHeight(elm, maxH, minPx = 18) {
    let fs = parseFloat(getComputedStyle(elm).fontSize);
    let guard = 0;
    while (elm.getBoundingClientRect().height > maxH && fs > minPx && guard++ < 40) {
      fs *= 0.95; elm.style.fontSize = fs + 'px';
    }
  }

  // ── yerleşim sabitleri ──
  const L = FMT === 'h'
    ? {
      browser: { sw: 1040, sh: 650, bar: 46 },
      phone: { sw: 372 }, phone2: { sw: 236 },
      card: { maxW: 940, maxH: 780, cx: 1345, cy: 560 },
      pose: {
        browser: { x: 1372, y: 552, s: 1, rx: 2, ry: -9, rz: 0 },
        browserWith2: { x: 1300, y: 526, s: 0.97, rx: 2, ry: -8, rz: 0 },
        phone: { x: 1345, y: 548, s: 1, rx: 0, ry: -10, rz: 0 },
        phone2: { x: 1712, y: 640, s: 1, rx: 0, ry: -14, rz: 2 },
        card: { x: 1335, y: 560, s: 1, rx: 0, ry: -6, rz: 0 },
      },
      textMax: 660, hookMax: 1640, titleMax: 640, ftitleMax: 660, statsMax: 1660, ctaMax: 1600,
      shift: { x: 260, y: 0 }, enter: { x: 520, y: 40, ry: -32, rz: 0 },
    }
    : {
      browser: { sw: 960, sh: 600, bar: 46 },
      phone: { sw: 536 }, phone2: { sw: 262 },
      card: { maxW: 960, maxH: 980, cx: 540, cy: 1300 },
      pose: {
        browser: { x: 540, y: 1180, s: 1, rx: 4, ry: 0, rz: 0 },
        browserWith2: { x: 512, y: 1120, s: 0.98, rx: 3, ry: 0, rz: 0 },
        phone: { x: 540, y: 1338, s: 1, rx: 6, ry: 0, rz: 0 },
        phone2: { x: 842, y: 1470, s: 1, rx: 0, ry: -10, rz: 3 },
        card: { x: 540, y: 1260, s: 1, rx: 3, ry: 0, rz: 0 },
      },
      textMax: 952, hookMax: 960, titleMax: 952, ftitleMax: 952, statsMax: 952, ctaMax: 960,
      shift: { x: 0, y: 360 }, enter: { x: 0, y: 900, ry: 0, rz: 6 },
      textMaxH: 540,
    };

  const STUDIO = (window.STUDIO = { fmt: FMT, width: W, height: H, fps: 30, cues: [], duration: 0 });
  let resolveReady;
  STUDIO.ready = new Promise((r) => (resolveReady = r));

  async function main() {
    const sbUrl = Q.get('sb');
    const SB = await fetch(sbUrl, { cache: 'no-store' }).then((r) => r.json());
    const BASE = new URL('.', new URL(sbUrl, location.href)).href;
    const asset = (p) => (/^(https?:|data:|\/)/.test(p) ? p : new URL(p, BASE).href);
    STUDIO.storyboard = SB;
    STUDIO.warnings = [];
    await Promise.all([
      '600 100px Fraunces', 'italic 600 100px Fraunces', 'italic 700 100px Fraunces', '650 100px Fraunces', '700 100px Fraunces',
      '400 30px Inter', '450 30px Inter', '600 30px Inter', '650 30px Inter', '700 30px Inter', '700 30px "JetBrains Mono"',
    ].map((f) => document.fonts.load(f, 'AaİıŞşĞğÜüÖöÇçÂâÎî0123456789')));
    await document.fonts.ready;

    // tema
    const root = document.documentElement.style;
    const acc = SB.accent || '#6366f1';
    root.setProperty('--accent', acc);
    root.setProperty('--accent-rgb', hexRgb(acc).join(','));
    if (SB.accent2) root.setProperty('--accent2-rgb', hexRgb(SB.accent2).join(','));
    if (SB.warm) { root.setProperty('--warm', SB.warm); }

    const stage = document.getElementById('stage');

    // ── arka plan ──
    const bg = el('div', '', stage); bg.id = 'bg';
    const orbA = el('div', 'orb a', bg), orbB = el('div', 'orb b', bg), orbC = el('div', 'orb c', bg);
    const OR = FMT === 'h' ? 1500 : 1700;
    [orbA, orbB].forEach((o) => { o.style.width = o.style.height = OR + 'px'; });
    orbC.style.width = orbC.style.height = OR * 0.8 + 'px';
    const beam = el('div', 'beam', bg);
    const gm = el('div', 'girih-mask', bg);
    const girih = el('div', 'girih', gm);
    girih.style.backgroundImage = `url("${girihSvg(SB.pattern || 'star8')}")`;
    const backdrop = el('div', 'backdrop', bg);
    const grain = el('div', 'grain', bg);
    grain.style.backgroundImage = `url(${noiseTile()})`;
    el('div', 'vignette', bg);

    // ── üst bant ──
    const chrome = el('div', '', stage); chrome.id = 'chrome';
    const prog = el('div', 'progress', chrome);
    const brand = el('div', 'brand', chrome, '<span class="mono">R</span><span><span class="b1">Rauf</span> <span class="b2">Enç</span></span>');
    const cat = el('div', 'cat', chrome, `<i></i>${esc(SB.category || '')}`);
    if (!SB.category) cat.style.display = 'none';

    // ── sahne listesi ──
    const T = Object.assign({ hook: 2.7, intro: 3.1, feature: 2.9, stats: 2.7, cta: 3.6, tr: 0.75 }, SB.timing || {});
    // seslendirme: vo.json varsa her sahne kendi cümlesinin süresine göre uzar
    let VO = null;
    if (Q.get('vo') !== '0') {
      try { const r = await fetch(asset('vo.json'), { cache: 'no-store' }); if (r.ok) VO = await r.json(); } catch (e) { VO = null; }
      if (VO && !(VO.lines || []).some((l) => l.file && l.dur)) VO = null;
    }
    const VO_LEAD = { hook: 0.25, intro: 0.45, feature: 0.4, stats: 0.4, cta: 0.85 };
    const VO_TAIL = { hook: 0.4, intro: 0.4, feature: 0.4, stats: 0.4, cta: 1.05 };
    const voLine = (type, i) => VO && (VO.lines || []).find((l) => l.scene === type && (type !== 'feature' || l.i === i) && l.file && l.dur);
    const scenes = [];
    let cursor = 0;
    STUDIO.vo = [];
    const add = (type, dur, data) => {
      const ln = voLine(type, data && data.i);
      if (ln) {
        dur = Math.max(dur, VO_LEAD[type] + ln.dur + VO_TAIL[type]);
        STUDIO.vo.push({ t: +(cursor + VO_LEAD[type]).toFixed(3), dur: ln.dur, file: new URL(ln.file, BASE).pathname, text: ln.text });
      }
      scenes.push({ type, start: cursor, dur, data, idx: scenes.length });
      cursor += dur;
    };
    add('hook', (SB.hook && SB.hook.dur) || T.hook, SB.hook || {});
    add('intro', (SB.intro && SB.intro.dur) || T.intro, SB.intro || {});
    (SB.features || []).forEach((f, i) => add('feature', f.dur || T.feature, Object.assign({ i }, f)));
    if (SB.stats && (SB.stats.items || SB.stats).length) add('stats', SB.stats.dur || T.stats, Array.isArray(SB.stats) ? { items: SB.stats } : SB.stats);
    add('cta', (SB.cta && SB.cta.dur) || T.cta, SB.cta || {});
    STUDIO.duration = cursor;
    STUDIO.scenes = scenes.map((s) => ({ type: s.type, start: s.start, dur: s.dur }));
    const segs = scenes.map(() => el('div', 'fill', el('div', 'seg', prog)));

    const cue = (t, type, extra) => STUDIO.cues.push(Object.assign({ t: +t.toFixed(3), type }, extra || {}));

    // ── cihazlar ──
    const devLayer = el('div', '', stage); devLayer.style.cssText = 'position:absolute;inset:0;perspective:2400px;';
    const textLayer = el('div', '', stage); textLayer.style.cssText = 'position:absolute;inset:0;';
    const devices = {};
    function makeBrowser() {
      const b = L.browser;
      const root = el('div', 'dev', devLayer);
      const glow = el('div', 'devglow', root);
      const fr = el('div', 'browser', root);
      fr.style.width = b.sw + 'px';
      const bar = el('div', 'bar', fr, '<i></i><i></i><i></i>');
      bar.style.height = b.bar + 'px';
      el('div', 'addr', bar, `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span>${esc(SB.url || 'raufenc.com')}</span>`);
      const sc = el('div', 'screen', fr);
      sc.style.width = b.sw + 'px'; sc.style.height = b.sh + 'px';
      const w = b.sw, h = b.sh + b.bar;
      root.style.width = w + 'px'; root.style.height = h + 'px';
      glow.style.cssText = `left:${-w * 0.35}px;top:${-h * 0.35}px;width:${w * 1.7}px;height:${h * 1.7}px;opacity:.55`;
      return { kind: 'browser', root, screen: sc, sw: b.sw, sh: b.sh, w, h, glow };
    }
    function makePhone(sw, name) {
      const sh = Math.round(sw * 844 / 390);
      const bez = Math.round(sw * 0.035) + 4;
      const w = sw + bez * 2, h = sh + bez * 2;
      const root = el('div', 'dev', devLayer);
      const glow = el('div', 'devglow', root);
      const fr = el('div', 'phone', root);
      fr.style.width = w + 'px'; fr.style.height = h + 'px'; fr.style.borderRadius = Math.round(w * 0.15) + 'px';
      const sc = el('div', 'screen', fr);
      sc.style.cssText = `left:${bez}px;top:${bez}px;width:${sw}px;height:${sh}px;border-radius:${Math.round(w * 0.15) - bez}px`;
      const isl = el('div', 'island', fr);
      isl.style.cssText += `top:${bez + Math.round(sw * 0.028)}px;width:${Math.round(sw * 0.3)}px;height:${Math.round(sw * 0.085)}px`;
      [[0.18, 0.06], [0.27, 0.1], [0.4, 0.1]].forEach(([y, hh], i) => {
        const b = el('div', 'btn', fr);
        b.style.cssText += `${i ? 'left' : 'right'}:-4px;top:${Math.round(h * y)}px;height:${Math.round(h * hh)}px`;
      });
      root.style.width = w + 'px'; root.style.height = h + 'px';
      glow.style.cssText = `left:${-w * 0.6}px;top:${-h * 0.3}px;width:${w * 2.2}px;height:${h * 1.6}px;opacity:.55`;
      return { kind: name, root, screen: sc, sw, sh, w, h, glow };
    }
    function makeCard() {
      const root = el('div', 'dev', devLayer);
      const glow = el('div', 'devglow', root);
      const fr = el('div', 'browser', root);
      fr.style.borderRadius = '26px';
      const sc = el('div', 'screen', fr);
      return { kind: 'card', root, screen: sc, frame: fr, sw: 0, sh: 0, w: 0, h: 0, glow };
    }
    devices.browser = makeBrowser();
    devices.phone = makePhone(L.phone.sw, 'phone');
    devices.phone2 = makePhone(L.phone2.sw, 'phone2');
    devices.card = makeCard();
    Object.values(devices).forEach((d) => {
      d.dim = el('div', 'dim', d.screen);
      d.glare = el('div', 'glare', d.screen);
      d.dim.style.zIndex = 4; d.glare.style.zIndex = 4;
      d.segments = []; // {scene, t0, t1, item, img, nat}
      d.taps = [];
    });

    // ── görselleri önceden yükle ──
    const imgCache = new Map();
    function loadImg(src) {
      const url = asset(src);
      if (!imgCache.has(url)) {
        imgCache.set(url, new Promise((res) => {
          const im = new Image();
          im.decoding = 'sync';
          im.onload = () => im.decode().catch(() => {}).then(() => res({ url, w: im.naturalWidth, h: im.naturalHeight }));
          im.onerror = () => { STUDIO.warnings.push('görsel yüklenemedi: ' + src); res({ url, w: 1440, h: 900, missing: true }); };
          im.src = url;
        }));
      }
      return imgCache.get(url);
    }
    // sahnelere ait çekim listelerini normalize et
    function normItems(spec, scene) {
      let v = pick(spec);
      if (!v) return [];
      if (!Array.isArray(v)) v = [v];
      const sceneScroll = pick(scene.scroll), sceneZoom = pick(scene.zoom), sceneTaps = pick(scene.taps);
      return v.map((it, i) => {
        const o = typeof it === 'string' ? { src: it } : Object.assign({}, it);
        if (o.scroll === undefined && v.length === 1) o.scroll = sceneScroll;
        if (o.zoom === undefined && v.length === 1) o.zoom = sceneZoom;
        if (o.taps === undefined && v.length === 1) o.taps = sceneTaps;
        o.scroll = pick(o.scroll); o.zoom = pick(o.zoom); o.taps = pick(o.taps) || [];
        return o;
      });
    }
    // işaretler: shots/marks.json → {mark:"ad"} başvurularını çöz
    let MARKS = {};
    try { MARKS = await fetch(asset('shots/marks.json'), { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {})); } catch (e) { MARKS = {}; }
    function resolveMarks(it) {
      const key = String(it.src).split('/').pop();
      const m = MARKS[key] || {};
      const res = (o) => {
        if (!o || !o.mark) return o;
        const mk = m[o.mark];
        if (!mk) { STUDIO.warnings.push(`işaret yok: ${key} → ${o.mark}`); return Object.assign({ x: 0.5, y: 0.5 }, o); }
        return Object.assign({}, o, { x: mk.x + (o.dx || 0), y: mk.y + (o.dy || 0) });
      };
      it.taps = (it.taps || []).map(res);
      if (it.zoom) it.zoom = res(it.zoom);
      return it;
    }
    const sceneShots = [];
    for (const sc of scenes) {
      const d = sc.data;
      if (sc.type === 'intro' || sc.type === 'feature') {
        const items = normItems(d.shot, d);
        for (const it of items) { Object.assign(it, { nat: await loadImg(it.src) }); resolveMarks(it); }
        let side = null;
        const ph = pickStrict(d.phone);
        if (ph) side = Object.assign(typeof ph === 'string' ? { src: ph } : ph, {});
        if (side) { side.scroll = pick(side.scroll); side.zoom = pick(side.zoom); side.taps = pick(side.taps) || []; side.nat = await loadImg(side.src); resolveMarks(side); }
        sceneShots.push({ sc, items, side });
      }
    }

    // cihaz türü: çerçeve belirtilmemişse en-boy oranına göre
    const frameOf = (it) => it.frame || (it.nat.w / it.nat.h >= 1 ? 'browser' : 'phone');

    // sahne → cihaz pozları
    const scenePose = scenes.map(() => ({}));
    for (const { sc, items, side } of sceneShots) {
      if (!items.length) continue;
      const fr = frameOf(items[0]);
      const k = sc.idx;
      const alt = sc.type === 'feature' ? (sc.data.i % 2 ? -1 : 1) : 0;
      if (fr === 'browser') {
        const base = side ? L.pose.browserWith2 : L.pose.browser;
        scenePose[k].browser = Object.assign({}, base, sc.type === 'intro' ? { ry: base.ry * 1.6, rx: base.rx * 2, s: base.s * 1.02 } : { ry: base.ry + alt * (FMT === 'h' ? 3 : 0), rz: alt * (FMT === 'v' ? -0.6 : 0) });
      } else if (fr === 'phone') {
        const base = L.pose.phone;
        scenePose[k].phone = Object.assign({}, base, sc.type === 'intro' ? { ry: base.ry * 1.5, rz: FMT === 'v' ? -2.5 : 2 } : { ry: base.ry + alt * (FMT === 'h' ? 4 : 0), rz: alt * (FMT === 'v' ? -1.2 : 0.8) });
      } else {
        scenePose[k].card = Object.assign({}, L.pose.card);
      }
      if (side) scenePose[k].phone2 = Object.assign({}, L.pose.phone2);
      // segmentler
      const devName = fr;
      const n = items.length;
      items.forEach((it, j) => {
        devices[devName].segments.push({ k, t0: sc.start + (sc.dur / n) * j, t1: sc.start + (sc.dur / n) * (j + 1), item: it, first: j === 0 });
        if (j > 0) cue(sc.start + (sc.dur / n) * j, 'swish');
      });
      if (side) devices.phone2.segments.push({ k, t0: sc.start, t1: sc.start + sc.dur, item: side, first: true });
    }
    // istatistik sahnesi: son görünen cihazlar geri çekilir
    const statsScene = scenes.find((s) => s.type === 'stats');
    if (statsScene) {
      const prev = scenePose[statsScene.idx - 1] || {};
      for (const [name, p] of Object.entries(prev)) {
        scenePose[statsScene.idx][name] = Object.assign({}, p, {
          x: p.x + L.shift.x, y: p.y + L.shift.y, s: p.s * (FMT === 'h' ? 0.84 : 0.9), o: 0.42, dim: 0.5, ry: FMT === 'h' ? -18 : 0, rx: FMT === 'v' ? 14 : p.rx,
        });
      }
    }
    // kart çerçevesi boyutları: ilk segmentin oranına göre
    function sizeCard(it) {
      const d = devices.card;
      const ar = it.nat.w / it.nat.h;
      let w = L.card.maxW, h = w / ar;
      if (h > L.card.maxH) { h = L.card.maxH; w = h * ar; }
      d.sw = Math.round(w); d.sh = Math.round(h); d.w = d.sw; d.h = d.sh;
      d.root.style.width = d.w + 'px'; d.root.style.height = d.h + 'px';
      d.frame.style.width = d.w + 'px'; d.frame.style.height = d.h + 'px';
      d.screen.style.width = d.w + 'px'; d.screen.style.height = d.h + 'px';
      d.glow.style.cssText = `left:${-d.w * 0.35}px;top:${-d.h * 0.35}px;width:${d.w * 1.7}px;height:${d.h * 1.7}px;opacity:.5`;
    }

    // segment görsellerini oluştur
    Object.values(devices).forEach((d) => {
      d.segments.forEach((s) => {
        const im = el('img', 'shot', d.screen);
        im.src = s.item.nat.url;
        im.decoding = 'sync';
        s.img = im;
        s.tapEls = (s.item.taps || []).map((tp) => {
          const g = el('div', 'tap', d.screen);
          const ring = el('div', 'ring', g), dot = el('div', 'dot', g);
          const T0 = s.t0 + (s.t1 - s.t0) * (tp.t != null ? tp.t : 0.6);
          cue(T0, 'tap');
          return { g, ring, dot, T0, tp };
        });
      });
    });

    // kanca arka planı (bulanık, karartılmış ekran görüntüsü)
    {
      const src = pick((SB.hook && SB.hook.backdrop) || (SB.intro && SB.intro.shot));
      const first = Array.isArray(src) ? src[0] : src;
      const srcUrl = first && (typeof first === 'string' ? first : first.src);
      if (srcUrl && !(SB.hook && SB.hook.backdrop === false)) {
        const nat = await loadImg(srcUrl);
        const im = new Image(); im.src = nat.url; await im.decode().catch(() => {});
        const cw = Math.round(W / 2), chh = Math.round(H / 2);
        const cv = document.createElement('canvas'); cv.width = cw; cv.height = chh;
        const g = cv.getContext('2d');
        const sc = Math.max(cw / nat.w, chh / nat.h) * 1.15;
        g.filter = 'blur(18px) saturate(1.25)';
        g.drawImage(im, (cw - nat.w * sc) / 2, (chh - nat.h * sc) * 0.3, nat.w * sc, nat.h * sc);
        backdrop.style.backgroundImage = `url(${cv.toDataURL('image/jpeg', 0.9)})`;
        backdrop.dataset.on = '1';
      }
    }

    // ── metin sahneleri ──
    const sceneEls = [];
    const measure = el('span', '', stage);
    measure.style.cssText = 'position:absolute;left:-9999px;top:0;white-space:nowrap;visibility:hidden;';

    for (const sc of scenes) {
      const d = sc.data;
      const o = { sc };
      if (sc.type === 'hook') {
        const box = el('div', 'hook', textLayer);
        if (d.kicker) o.kicker = el('div', 'kicker', box, rich(d.kicker));
        const hl = el('div', 'hl', box);
        const lines = pick(d.lines) || [d.text || ''];
        o.words = wordLines(hl, lines);
        fitLines(hl, L.hookMax);
        if (d.sub) o.sub = el('div', 'sub', box, rich(pick(d.sub)));
        o.box = box;
        cue(sc.start + 0.02, 'impact');
      } else if (sc.type === 'intro') {
        const box = el('div', 'block', textLayer);
        const row = el('div', 'iconrow', box);
        o.icon = el('div', 'icon', row, SB.icon ? `<img src="${asset(SB.icon)}" alt="">` : esc(SB.emoji || '✦'));
        if (d.tag || SB.tag) o.tag = el('div', 'tag', row, esc(d.tag || SB.tag));
        if (d.tag2) o.tag2 = el('div', 'tag tag2', row, esc(d.tag2));
        const tt = el('div', 'title', box);
        measure.style.font = getComputedStyle(tt).font;
        const tlines = pick(d.titleLines) || splitBalanced(d.title || SB.title || '', measure, L.titleMax);
        o.words = wordLines(tt, tlines);
        fitLines(tt, L.titleMax, 0.45);
        if (d.tagline) o.tl = el('div', 'tagline', box, rich(pick(d.tagline)));
        if (FMT === 'v') shrinkToHeight(box, L.textMaxH);
        o.box = box;
        cue(sc.start, 'whoosh');
      } else if (sc.type === 'feature') {
        const box = el('div', 'block', textLayer);
        o.num = el('div', 'num', box, `${String(d.i + 1).padStart(2, '0')}${d.kicker ? `<small>${esc(d.kicker)}</small>` : ''}`);
        if (FMT === 'v') { o.num.style.fontSize = '84px'; o.num.style.marginBottom = '16px'; }
        const ft = el('div', 'ftitle', box);
        measure.style.font = getComputedStyle(ft).font;
        const flines = pick(d.titleLines) || splitBalanced(d.title || '', measure, L.ftitleMax);
        o.words = wordLines(ft, flines);
        fitLines(ft, L.ftitleMax, 0.5);
        o.bar = el('div', 'fbar', box);
        if (d.text) o.tx = el('div', 'ftext', box, rich(pick(d.text)));
        if (FMT === 'v') shrinkToHeight(box, L.textMaxH);
        o.box = box;
        if (d.callout) {
          const c = pickStrict(d.callout);
          if (c && c.text) {
            o.callout = el('div', 'callout', stage, `${c.emoji ? `<span class="ce">${esc(c.emoji)}</span>` : ''}<span>${rich(c.text)}</span>`);
            o.calloutAt = c;
          }
        }
        cue(sc.start, 'whoosh');
      } else if (sc.type === 'stats') {
        const box = el('div', 'stats', textLayer);
        if (d.kicker) o.kick = el('div', 'kick', box, rich(d.kicker));
        const row = el('div', 'row', box);
        o.items = (d.items || []).slice(0, 4).map((it) => {
          const st = el('div', 'stat', row);
          const sv = el('div', 'sv', st);
          const sl = el('div', 'sl', st, rich(it.label || ''));
          const bar = el('div', 'sbar', st);
          const isNum = typeof it.value === 'number';
          sv.textContent = (it.prefix || '') + (isNum ? fmtNum(it.value) : it.value) + (it.suffix || '');
          return { st, sv, sl, bar, it, isNum };
        });
        // genişliğe sığdır
        if (FMT === 'h') {
          const tot = row.getBoundingClientRect().width;
          if (tot > L.statsMax) { const s = L.statsMax / tot; o.items.forEach((x) => { x.sv.style.fontSize = parseFloat(getComputedStyle(x.sv).fontSize) * s + 'px'; }); }
        } else {
          o.items.forEach((x) => {
            const w = x.st.getBoundingClientRect().width;
            if (w > L.statsMax) { const s = L.statsMax / w; x.sv.style.fontSize = parseFloat(getComputedStyle(x.sv).fontSize) * s + 'px'; x.sl.style.fontSize = parseFloat(getComputedStyle(x.sl).fontSize) * Math.max(s, 0.8) + 'px'; }
          });
        }
        o.box = box;
        cue(sc.start, 'whoosh');
        o.items.forEach((x, i) => { if (x.isNum) { cue(sc.start + 0.35 + i * 0.18, 'count', { dur: 1.1 }); } });
        cue(sc.start + 1.65, 'ding');
      } else if (sc.type === 'cta') {
        const box = el('div', 'cta', textLayer);
        o.icon = el('div', 'icon', box, SB.icon ? `<img src="${asset(SB.icon)}" alt="">` : esc(SB.emoji || '✦'));
        if (d.ctitle !== false) o.ctitle = el('div', 'ctitle', box, rich(d.ctitle || SB.title || ''));
        const ch = el('div', 'ch', box);
        const lines = pick(d.lines) || [d.headline || 'Hemen *keşfet*'];
        o.words = wordLines(ch, lines);
        fitLines(ch, L.ctaMax, 0.5);
        const url = (d.url || SB.url || 'raufenc.com').replace(/^https?:\/\//, '');
        const slash = url.indexOf('/');
        const host = slash < 0 ? url : url.slice(0, slash), path = slash < 0 ? '' : url.slice(slash);
        o.url = el('div', 'url', box, `<svg class="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.8 3 2.8 16 0 19M12 2.5c-2.8 3-2.8 16 0 19"/></svg><span class="txt"></span><span class="caret"></span>`);
        o.urlTxt = o.url.querySelector('.txt'); o.caret = o.url.querySelector('.caret');
        o.host = host; o.path = path;
        // URL genişliğini sabitle (yazılırken kutu titremesin)
        o.urlTxt.innerHTML = `<span class="host">${esc(host)}</span><span class="path">${esc(path)}</span>`;
        const uw = o.url.getBoundingClientRect().width;
        const maxU = FMT === 'h' ? 1500 : 980;
        if (uw > maxU) o.url.style.fontSize = parseFloat(getComputedStyle(o.url).fontSize) * (maxU / uw) + 'px';
        o.url.style.width = Math.min(uw, maxU) + 'px';
        o.url.style.justifyContent = 'flex-start';
        const chips = pick(d.chips) || [];
        if (chips.length) { o.chips = el('div', 'chips', box); o.chipEls = chips.map((c) => el('div', 'chip', o.chips, rich(c))); }
        o.sig = el('div', 'sig', textLayer, d.sig ? rich(d.sig) : 'raufenc.com · <b>@raufenc</b> · Dijital Atölye');
        o.box = box;
        cue(sc.start, 'whoosh');
        const typeStart = sc.start + 0.9, n = url.length;
        o.typeStart = typeStart; o.typeDur = Math.min(1.1, 0.045 * n);
        for (let i = 0; i < n; i += 2) cue(typeStart + (o.typeDur * i) / n, 'type');
        cue(typeStart + o.typeDur + 0.05, 'chime');
      }
      sceneEls.push(o);
    }
    measure.remove();

    const fade = el('div', '', stage); fade.id = 'fade';
    const flash = el('div', '', stage); flash.id = 'flash';

    // ── görsel/zaman yardımcıları ──
    function coverScale(nat, sw, sh) { return Math.max(sw / nat.w, sh / nat.h); }
    function placeImg(seg, d, lp) {
      // lp: segment içi ilerleme 0..1 (kaydırma/yakınlaştırma)
      const it = seg.item, nat = it.nat;
      const sw = d.sw, sh = d.sh;
      const sc = (it.fit === 'contain') ? Math.min(sw / nat.w, sh / nat.h) : (nat.w / nat.h < sw / sh ? sw / nat.w : coverScale(nat, sw, sh));
      const iw = nat.w * sc, ih = nat.h * sc;
      const ease = E.io(lp);
      let offY = 0, offX = Math.max(0, iw - sw) * (it.alignX != null ? it.alignX : 0.5);
      if (ih > sh) {
        const sr = it.scroll || [it.alignY != null ? it.alignY : 0, it.alignY != null ? it.alignY : 0];
        offY = lerp(sr[0], sr[1], ease) * (ih - sh);
      } else offY = -(sh - ih) / 2; // contain: dikeyde ortala
      if (it.fit === 'contain' && iw < sw) offX = -(sw - iw) / 2;
      let z = 1, fx = sw / 2, fy = sh / 2;
      if (it.zoom) {
        const zz = it.zoom;
        const zs = zz.s || 1.35;
        const zt = E.io(clamp((lp - (zz.from || 0)) / ((zz.to || 1) - (zz.from || 0))));
        z = lerp(zz.s0 || 1, zs, zt);
        fx = clamp(zz.x * iw - offX, 0, sw); fy = clamp(zz.y * ih - offY, 0, sh);
      }
      const tx = fx * (1 - z) - z * offX, ty = fy * (1 - z) - z * offY;
      return { iw, ih, z, tx, ty, map: (u, v) => [tx + z * u * iw, ty + z * v * ih] };
    }

    const a0 = (v) => (v == null ? 1 : v);
    function poseAt(name, t) {
      // geçerli sahne
      let k = scenes.findIndex((s) => t >= s.start && t < s.start + s.dur);
      if (k < 0) k = t < 0 ? 0 : scenes.length - 1;
      const sc = scenes[k];
      const lt = t - sc.start;
      const cur = scenePose[k][name] || null;
      const prev = k > 0 ? scenePose[k - 1][name] || null : null;
      if (!cur && !prev) return null;
      const hiddenFrom = (p, first) => {
        if (first) return Object.assign({}, p, { x: p.x + L.enter.x, y: p.y + L.enter.y, ry: (p.ry || 0) + L.enter.ry, rz: (p.rz || 0) + L.enter.rz, s: p.s * 0.92, o: 0 });
        return Object.assign({}, p, { x: p.x + (FMT === 'h' ? 120 : 0), y: p.y + (FMT === 'v' ? 160 : 40), s: p.s * 0.94, o: 0 });
      };
      const firstAppear = !prev && !scenePose.slice(0, k).some((sp) => sp[name]);
      const from = prev || hiddenFrom(cur, firstAppear);
      const to = cur || (sc.type === 'cta'
        ? Object.assign({}, prev, { y: prev.y + (FMT === 'v' ? 260 : 80), s: prev.s * 0.88, o: 0 })
        : hiddenFrom(prev, false));
      const dur = firstAppear ? 1.0 : (sc.type === 'cta' ? 0.6 : T.tr);
      const e = (firstAppear ? E.out4 : E.io)(P(lt, 0, dur));
      const r = {};
      for (const key of ['x', 'y', 's', 'rx', 'ry', 'rz', 'o', 'dim']) {
        const a = from[key] != null ? from[key] : key === 's' || key === 'o' ? 1 : 0;
        const b = to[key] != null ? to[key] : key === 's' || key === 'o' ? 1 : 0;
        r[key] = lerp(a, b, e);
      }
      // cihaz değişiminde üst üste binmeyi azalt: çıkan hızlı söner, giren biraz gecikir
      if (!cur && prev) r.o = lerp(a0(prev.o), 0, E.out(P(lt, 0, dur * 0.45)));
      else if (cur && !prev && !firstAppear) r.o = lerp(0, a0(cur.o), E.out(P(lt, dur * 0.3, dur * 0.7)));
      // sahne içi süzülme (Ken Burns)
      if (cur && cur.o !== 0) {
        const drift = E.sine(P(lt, 0, sc.dur));
        r.s *= 1 + 0.025 * drift;
        r.y += (FMT === 'h' ? -10 : -16) * drift;
        r.ry += (FMT === 'h' ? 2.5 : 0) * drift;
      }
      return r;
    }

    function applyDevice(name, t) {
      const d = devices[name];
      const p = poseAt(name, t);
      if (!p || p.o <= 0.002) { d.root.style.display = 'none'; return null; }
      d.root.style.display = '';
      if (name === 'card') {
        const seg = d.segments.find((s) => t >= s.t0 - 1 && t < s.t1 + 1) || d.segments[0];
        if (seg && d._sized !== seg) { sizeCard(seg.item); d._sized = seg; }
      }
      d.root.style.opacity = p.o.toFixed(4);
      d.root.style.transform = `translate3d(${p.x - d.w / 2}px, ${p.y - d.h / 2}px, 0) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg) scale(${p.s})`;
      d.dim.style.opacity = (p.dim || 0).toFixed(3);
      d.glare.style.transform = `translateX(${(p.ry || 0) * 6}px)`;
      // içerik
      const segs = d.segments;
      let ai = -1;
      for (let i = 0; i < segs.length; i++) if (t >= segs[i].t0) ai = i;
      if (ai < 0) ai = 0;
      const PUSH = 0.5;
      segs.forEach((s, i) => {
        if (i !== ai && i !== ai - 1) { s.img.style.visibility = 'hidden'; s.tapEls.forEach((x) => (x.g.style.visibility = 'hidden')); return; }
        const lp = clamp((t - s.t0) / (s.t1 - s.t0));
        const pl = placeImg(s, d, lp);
        let o = 1, dy = 0, sc = 1;
        const cur = segs[ai];
        const pushing = ai > 0 && t - cur.t0 < PUSH && segs[ai - 1].t1 >= cur.t0 - 0.01 && segs[ai - 1].k >= cur.k - 1;
        if (i === ai && pushing) {
          const e = E.out4(P(t, cur.t0, PUSH));
          o = e; dy = (1 - e) * d.sh * 0.14; sc = 1 + (1 - e) * 0.04;
        } else if (i === ai - 1) {
          if (!pushing) { s.img.style.visibility = 'hidden'; s.tapEls.forEach((x) => (x.g.style.visibility = 'hidden')); return; }
          const e = E.io(P(t, cur.t0, PUSH));
          o = 1 - e; dy = -e * d.sh * 0.06; sc = 1 - e * 0.03;
        }
        s.img.style.visibility = 'visible';
        s.img.style.width = pl.iw + 'px'; s.img.style.height = pl.ih + 'px';
        s.img.style.opacity = o.toFixed(4);
        s.img.style.transform = `translate3d(0, ${dy}px, 0) translate(${d.sw / 2}px, ${d.sh / 2}px) scale(${sc}) translate(${-d.sw / 2}px, ${-d.sh / 2}px) translate(${pl.tx}px, ${pl.ty}px) scale(${pl.z})`;
        s.img.style.zIndex = i === ai ? 2 : 1;
        // dokunuşlar
        s.tapEls.forEach((x) => {
          const rel = t - x.T0;
          if (rel < -0.35 || rel > 0.75 || i !== ai) { x.g.style.visibility = 'hidden'; return; }
          const [px, py] = pl.map(x.tp.x, x.tp.y);
          x.g.style.visibility = 'visible';
          x.g.style.transform = `translate(${px}px, ${py + dy}px)`;
          const U = d.sw / 10; // dokunma ölçüsü ekran genişliğine göre
          const dotIn = E.out(P(rel, -0.35, 0.3));
          const press = rel < 0 ? 1 : rel < 0.12 ? lerp(1, 0.78, rel / 0.12) : lerp(0.78, 1, clamp((rel - 0.12) / 0.2));
          const dotOut = 1 - P(rel, 0.25, 0.3);
          const ds = U * 0.95;
          x.dot.style.cssText = `width:${ds}px;height:${ds}px;left:${-ds / 2}px;top:${-ds / 2}px;opacity:${(dotIn * dotOut * 0.92).toFixed(3)};transform:scale(${(press * (0.6 + 0.4 * dotIn)).toFixed(3)})`;
          const rp = P(rel, 0, 0.6);
          const rs = U * lerp(0.6, 2.4, E.out(rp));
          x.ring.style.cssText = `width:${rs}px;height:${rs}px;left:${-rs / 2}px;top:${-rs / 2}px;opacity:${(rel < 0 ? 0 : (1 - rp) * 0.95).toFixed(3)}`;
        });
      });
      return p;
    }

    function textInOut(o, lt, dur, delay = 0) {
      const inP = E.out4(P(lt, delay, 0.6));
      const outP = E.in(P(lt, dur - 0.38, 0.38));
      return { o: Math.min(inP * 1.2, 1) * (1 - outP), dy: (1 - inP) * 30 - outP * 26, outP, inP };
    }

    // ── seek ──
    let frameNo = 0;
    function seek(t) {
      t = Math.max(0, Math.min(t, STUDIO.duration - 1e-4));
      frameNo = Math.round(t * STUDIO.fps);
      const D = STUDIO.duration;

      // arka plan
      const k = t / D;
      orbA.style.transform = `translate3d(${(FMT === 'h' ? 1250 : 700) + Math.sin(t * 0.35) * 160 - OR / 2}px, ${(FMT === 'h' ? 300 : 620) + Math.cos(t * 0.29) * 120 - OR / 2}px, 0)`;
      orbB.style.transform = `translate3d(${(FMT === 'h' ? 380 : 240) + Math.cos(t * 0.31) * 150 - OR / 2}px, ${(FMT === 'h' ? 860 : 1500) + Math.sin(t * 0.27) * 120 - OR / 2}px, 0)`;
      orbC.style.transform = `translate3d(${W / 2 - OR * 0.4 + Math.sin(t * 0.5) * 80}px, ${H * 0.42 - OR * 0.4}px, 0)`;
      girih.style.transform = `rotate(${t * 1.6}deg) scale(${1.08 + 0.04 * Math.sin(t * 0.4)})`;
      // gren sabit: kare başına kaydırmak sıkıştırmayı bozar
      void frameNo;
      beam.style.top = `${H * (0.15 + 0.7 * ((t * 0.045) % 1))}px`;
      beam.style.transform = `rotate(${FMT === 'h' ? -12 : -24}deg)`;
      beam.style.opacity = 0.6;
      if (backdrop.dataset.on) {
        const hk = scenes[0];
        const bo = 0.5 * E.out(P(t, 0, 0.8)) * (1 - E.io(P(t, hk.start + hk.dur - 0.5, 1.1)));
        backdrop.style.opacity = bo.toFixed(3);
        backdrop.style.display = bo > 0.002 ? '' : 'none';
        backdrop.style.transform = `scale(${1.08 + t * 0.02})`;
      }

      // üst bant
      scenes.forEach((s, i) => { segs[i].style.width = (clamp((t - s.start) / s.dur) * 100).toFixed(2) + '%'; });
      const chromeIn = E.out(P(t, 0.1, 0.6));
      prog.style.opacity = chromeIn;
      brand.style.opacity = chromeIn; brand.style.transform = `translateY(${(1 - chromeIn) * -12}px)`;
      cat.style.opacity = chromeIn * 0.95; cat.style.transform = `translateY(${(1 - chromeIn) * -12}px)`;

      // cihazlar
      const pose = {};
      for (const name of ['browser', 'phone', 'card', 'phone2']) pose[name] = applyDevice(name, t);

      // metin sahneleri
      sceneEls.forEach((o) => {
        const sc = o.sc, lt = t - sc.start;
        const visible = lt > -0.05 && lt < sc.dur + 0.05;
        if (!visible) {
          if (o.box) o.box.style.visibility = 'hidden';
          if (o.callout) o.callout.style.visibility = 'hidden';
          if (o.sig) o.sig.style.visibility = 'hidden';
          return;
        }
        o.box.style.visibility = 'visible';
        if (sc.type === 'hook') {
          const out = E.in(P(lt, sc.dur - 0.45, 0.45));
          if (o.kicker) { const p = E.out(P(lt, 0.05, 0.6)); o.kicker.style.opacity = p * (1 - out); o.kicker.style.letterSpacing = `${lerp(0.6, FMT === 'h' ? 0.34 : 0.28, p)}em`; }
          animWords(o.words, lt, 0.22, 0.075, 0.75);
          if (o.sub) { const p = E.out(P(lt, 0.9, 0.6)); o.sub.style.opacity = p * (1 - out); o.sub.style.transform = `translateY(${(1 - p) * 20}px)`; }
          o.box.style.opacity = 1 - out;
          o.box.style.transform = `scale(${1 + out * 0.06}) translateY(${-out * 30}px)`;
          o.box.style.filter = out > 0.01 ? `blur(${out * 10}px)` : 'none';
        } else if (sc.type === 'intro' || sc.type === 'feature') {
          const io = textInOut(o, lt, sc.dur);
          o.box.style.opacity = io.o;
          o.box.style.transform = `translateY(${io.dy}px)`;
          animWords(o.words, lt, sc.type === 'intro' ? 0.3 : 0.22, 0.06, 0.7);
          if (o.icon) { const p = E.back(P(lt, 0.1, 0.7)); o.icon.style.transform = `scale(${clamp(p, 0, 1.2)}) rotate(${(1 - clamp(p)) * -14}deg)`; o.icon.style.opacity = clamp(p * 2); }
          if (o.tag) { const p = E.out(P(lt, 0.35, 0.5)); o.tag.style.opacity = p; o.tag.style.transform = `translateX(${(1 - p) * -20}px)`; }
          if (o.tag2) { const p = E.out(P(lt, 0.5, 0.5)); o.tag2.style.opacity = p; o.tag2.style.transform = `translateX(${(1 - p) * -20}px)`; }
          if (o.tl) { const p = E.out(P(lt, 0.75, 0.6)); o.tl.style.opacity = p; o.tl.style.transform = `translateY(${(1 - p) * 18}px)`; }
          if (o.num) { const p = E.out4(P(lt, 0.05, 0.7)); o.num.style.opacity = p; o.num.style.transform = `translateX(${(1 - p) * -40}px)`; }
          if (o.bar) { const p = E.out4(P(lt, 0.45, 0.6)); o.bar.style.transform = `scaleX(${p})`; }
          if (o.tx) { const p = E.out(P(lt, 0.6, 0.6)); o.tx.style.opacity = p; o.tx.style.transform = `translateY(${(1 - p) * 18}px)`; }
          if (o.callout) {
            const c = o.calloutAt;
            const dp = pose.browser || pose.phone || pose.card;
            const dname = pose.browser ? 'browser' : pose.phone ? 'phone' : 'card';
            const dv = devices[dname];
            if (dp) {
              const pIn = E.back(P(lt, c.at != null ? c.at : 0.9, 0.55));
              const pOut = E.in(P(lt, sc.dur - 0.4, 0.35));
              const cx = dp.x + ((c.x != null ? c.x : 0.15) - 0.5) * dv.w * dp.s;
              const cy = dp.y + ((c.y != null ? c.y : 0.2) - 0.5) * dv.h * dp.s;
              // dönüşümden bağımsız boyut (önceki karenin ölçeğine bağlı kalmasın)
              const bw = o.callout.offsetWidth, bh = o.callout.offsetHeight;
              const x = clamp(cx - bw / 2, 40, W - bw - 40), y = clamp(cy - bh / 2, 140, H - bh - 40);
              const s = clamp(pIn, 0, 1.15) * (1 - pOut * 0.2);
              o.callout.style.visibility = s > 0.01 ? 'visible' : 'hidden';
              o.callout.style.opacity = clamp(pIn * 1.5) * (1 - pOut);
              o.callout.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
              o.callout.style.transformOrigin = 'center';
            }
          }
        } else if (sc.type === 'stats') {
          const io = textInOut(o, lt, sc.dur);
          o.box.style.opacity = io.o; o.box.style.transform = `translateY(${io.dy}px)`;
          if (o.kick) { const p = E.out(P(lt, 0.05, 0.5)); o.kick.style.opacity = p; }
          o.items.forEach((x, i) => {
            const t0 = 0.2 + i * 0.18;
            const p = E.out4(P(lt, t0, 0.7));
            x.st.style.opacity = p;
            x.st.style.transform = `translateY(${(1 - p) * 50}px)`;
            if (x.isNum) {
              const cp = E.expo(P(lt, t0 + 0.15, 1.15));
              x.sv.textContent = (x.it.prefix || '') + fmtNum(x.it.value * cp) + (x.it.suffix || '');
            }
            x.bar.style.transform = `scaleX(${E.out4(P(lt, t0 + 0.3, 0.9))})`;
          });
        } else if (sc.type === 'cta') {
          const inP = E.out4(P(lt, 0, 0.7));
          o.box.style.opacity = 1;
          o.box.style.transform = 'none';
          { const p = E.back(P(lt, 0.05, 0.75)); o.icon.style.transform = `scale(${clamp(p, 0, 1.2)}) rotate(${(1 - clamp(p)) * 18}deg)`; o.icon.style.opacity = clamp(p * 2); }
          if (o.ctitle) { const p = E.out(P(lt, 0.2, 0.6)); o.ctitle.style.opacity = p; o.ctitle.style.transform = `translateY(${(1 - p) * 16}px)`; }
          animWords(o.words, lt, 0.3, 0.08, 0.75);
          { const p = E.out4(P(lt, 0.7, 0.6)); o.url.style.opacity = p; o.url.style.transform = `translateY(${(1 - p) * 30}px) scale(${0.94 + 0.06 * p})`; }
          const full = o.host + o.path;
          const nShow = Math.round(clamp((t - o.typeStart) / o.typeDur) * full.length);
          const hs = full.slice(0, Math.min(nShow, o.host.length)), ps = nShow > o.host.length ? full.slice(o.host.length, nShow) : '';
          o.urlTxt.innerHTML = `<span class="host">${esc(hs)}</span><span class="path">${esc(ps)}</span>`;
          o.caret.style.opacity = (Math.floor(lt * 2.4) % 2 === 0 || (t > o.typeStart && t < o.typeStart + o.typeDur)) ? 1 : 0;
          if (o.chipEls) o.chipEls.forEach((c, i) => { const p = E.out4(P(lt, 1.5 + i * 0.12, 0.55)); c.style.opacity = p; c.style.transform = `translateY(${(1 - p) * 22}px)`; });
          if (o.sig) { o.sig.style.visibility = 'visible'; const p = E.out(P(lt, 1.2, 0.8)); o.sig.style.opacity = p; }
          // URL parıltısı
          const glowP = E.sine(P(lt, o.typeStart - sc.start + o.typeDur, 0.9));
          o.url.style.boxShadow = `0 0 0 ${8 + glowP * 10}px rgba(var(--accent-rgb), ${0.08 + 0.1 * (1 - Math.abs(glowP - 0.5) * 2)}), 0 20px 60px rgba(var(--accent-rgb), .30), inset 0 1px 0 rgba(255,255,255,.12)`;
          void inP;
        }
      });

      // sahne geçiş parlaması
      let fl = 0;
      scenes.forEach((s, i) => { if (i > 0 && s.type !== 'cta') fl = Math.max(fl, 1 - Math.abs(t - s.start) / 0.22); });
      flash.style.opacity = (clamp(fl) * 0.55).toFixed(3);

      // döngü için sona karartma
      const endFade = E.io(P(t, D - 0.55, 0.55));
      fade.style.opacity = endFade.toFixed(3);
    }

    STUDIO.seek = seek;
    STUDIO.cues.sort((a, b) => a.t - b.t);
    await document.fonts.ready;
    seek(0);
    // tüm görseller çözülsün
    await Promise.all([...document.images].map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => { i.onload = i.onerror = r; }))));
    const tq = Q.get('t');
    if (tq != null) seek(parseFloat(tq));
    if (Q.get('play')) {
      const t0 = performance.now();
      const loop = () => { seek(((performance.now() - t0) / 1000) % STUDIO.duration); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
    resolveReady(true);
  }

  // ── desen ve gren ──
  function girihSvg(kind) {
    const S = 168, c = S / 2;
    const star = (cx, cy, R, r, rot = 0) => {
      let d = '';
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI / 8) * i + rot;
        const rr = i % 2 ? r : R;
        d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(2) + ' ' + (cy + rr * Math.sin(a)).toFixed(2);
      }
      return d + 'Z';
    };
    const R = 34, r = 16;
    let paths = '';
    [[c, c], [0, 0], [S, 0], [0, S], [S, S]].forEach(([x, y]) => { paths += `<path d="${star(x, y, R, r, Math.PI / 8)}"/>`; });
    // köşegen bağlantılar (yıldız uçlarından komşu yıldızlara)
    const k = R * Math.cos(Math.PI / 8) / Math.SQRT2 + 2;
    paths += `<path d="M${c - k} ${c - k}L${k} ${k}M${c + k} ${c - k}L${S - k} ${k}M${c - k} ${c + k}L${k} ${S - k}M${c + k} ${c + k}L${S - k} ${S - k}"/>`;
    paths += `<path d="M${c} ${c - R - 6}V${R + 6 - 0}M${c} ${c + R + 6}V${S - R - 6}M${c - R - 6} ${c}H${R + 6}M${c + R + 6} ${c}H${S - R - 6}" opacity=".55"/>`;
    paths += `<circle cx="${c}" cy="${c}" r="7"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}"><g fill="none" stroke="#c8a46e" stroke-width="1.3" stroke-linejoin="round">${paths}</g></svg>`;
    void kind;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  function noiseTile() {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d'); const id = g.createImageData(256, 256);
    let s = 1234567;
    const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    for (let i = 0; i < id.data.length; i += 4) { const v = Math.floor(rnd() * 255); id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; }
    g.putImageData(id, 0, 0);
    return c.toDataURL('image/png');
  }

  main().catch((e) => { STUDIO.error = String(e && e.stack || e); console.error(e); resolveReady(false); });
})();
