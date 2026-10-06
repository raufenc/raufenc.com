/**
 * Tanıtım videoları — ortak modül
 * Proje kartlarına video önizlemesi, reels rafı ve tam ekran oynatıcı ekler.
 * Videolar /videolar/<slug>/ altında: yatay.mp4 (16:9), dikey.mp4 (9:16),
 * kart.mp4 + kart.jpg (sessiz önizleme), kart-dikey.mp4 + kart-dikey.jpg.
 * Proje kaydında video: '<slug>' alanı varsa video vardır (data/projeler.js).
 *
 * Kullanım:
 *   VideoTanitim.ac(proje, liste)          oynatıcıyı aç (liste: ileri/geri için)
 *   VideoTanitim.kartaEkle(hucre, kart, p) kart üstüne önizleme + oynat düğmesi
 *   VideoTanitim.raf(kap, projeler)        dikey video rafı
 */
(function () {
  'use strict';
  if (window.VideoTanitim) return;

  var KOK = '/videolar/';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var bildirge = null;
  var bildirgeSozu = null;

  function yol(slug, dosya) { return KOK + slug + '/' + dosya; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function duzMetin(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent || ''; }
  function sureYaz(sn) { if (!sn) return ''; sn = Math.round(sn); return Math.floor(sn / 60) + ':' + ('0' + (sn % 60)).slice(-2); }
  function kategoriAdi(p) {
    if (typeof KATEGORILER === 'undefined') return '';
    for (var i = 0; i < KATEGORILER.length; i++) if (KATEGORILER[i].slug === p.kategori) return KATEGORILER[i].name;
    return '';
  }
  function olay(ad, veri) { try { if (window.gtag) window.gtag('event', ad, veri); } catch (e) {} }

  // Süre bilgisi için bildirgeyi bir kez getir
  function bildirgeYukle() {
    if (bildirgeSozu) return bildirgeSozu;
    bildirgeSozu = fetch(KOK + 'index.json')
      .then(function (r) { return r.ok ? r.json() : { videolar: [] }; })
      .then(function (j) { bildirge = {}; (j.videolar || []).forEach(function (v) { bildirge[v.slug] = v; }); return bildirge; })
      .catch(function () { bildirge = {}; return bildirge; });
    return bildirgeSozu;
  }

  // ── Stil ──
  var CSS = [
    '.vt-cell{position:relative;display:flex;flex-direction:column;min-width:0}',
    '.vt-cell>.card{flex:1}',
    '.vt-media{position:relative;aspect-ratio:16/9;border-radius:11px;overflow:hidden;background:#0a0a0f;border:1px solid var(--border,#222230);margin-bottom:4px;flex:none}',
    '.vt-media img,.vt-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}',
    '.vt-media video{opacity:0;transition:opacity .35s ease}',
    '.vt-media.playing video{opacity:1}',
    '.vt-media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.35));pointer-events:none}',
    '.vt-play{position:absolute;z-index:3;top:calc(var(--vt-pad,22px) + 10px);right:calc(var(--vt-pad,22px) + 10px);display:inline-flex;align-items:center;gap:7px;padding:6px 12px 6px 9px;border-radius:99px;border:1px solid rgba(255,255,255,.22);background:rgba(10,10,15,.62);color:#fff;font:600 11.5px/1 var(--font-sans,Inter,system-ui,sans-serif);letter-spacing:.02em;cursor:pointer;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:transform .3s cubic-bezier(.2,.8,.2,1),background .2s,border-color .2s;box-shadow:0 4px 14px rgba(0,0,0,.3)}',
    '.vt-play svg{width:14px;height:14px;flex:none}',
    '.vt-play:hover,.vt-play:focus-visible{background:var(--warm,#c8a46e);border-color:var(--warm,#c8a46e);color:#0a0a0f}',
    '.vt-cell:hover .vt-play{transform:translateY(-5px)}',
    '@media (prefers-reduced-motion:reduce){.vt-cell:hover .vt-play{transform:none}}',

    /* raf */
    '.vt-raf-wrap{position:relative}',
    '.vt-raf{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 2px 18px;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}',
    '.vt-raf::-webkit-scrollbar{display:none}',
    '.vt-reel{position:relative;flex:none;width:clamp(150px,42vw,206px);aspect-ratio:9/16;border-radius:18px;overflow:hidden;scroll-snap-align:start;border:1px solid var(--border,#222230);background:#0a0a0f;padding:0;cursor:pointer;color:#fff;text-align:left;font-family:var(--font-sans,Inter,system-ui,sans-serif);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .25s,box-shadow .35s}',
    '.vt-reel:hover,.vt-reel:focus-visible{transform:translateY(-6px);border-color:var(--warm,#c8a46e);box-shadow:0 18px 40px rgba(0,0,0,.35),0 0 0 1px rgba(200,164,110,.25)}',
    '.vt-reel img,.vt-reel video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '.vt-reel video{opacity:0;transition:opacity .35s}',
    '.vt-reel.playing video{opacity:1}',
    '.vt-reel .vt-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35) 0%,transparent 28%,transparent 55%,rgba(0,0,0,.82) 100%)}',
    '.vt-reel .vt-cat{position:absolute;top:12px;left:12px;right:12px;font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.8)}',
    '.vt-reel .vt-ttl{position:absolute;left:12px;right:12px;bottom:34px;font-family:var(--font-display,Fraunces,Georgia,serif);font-size:17px;font-weight:700;line-height:1.15;letter-spacing:-.01em}',
    '.vt-reel .vt-meta{position:absolute;left:12px;bottom:13px;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:rgba(255,255,255,.75)}',
    '.vt-reel .vt-meta svg{width:12px;height:12px}',
    '.vt-raf-nav{position:absolute;top:calc(50% - 28px);width:40px;height:40px;border-radius:50%;border:1px solid var(--border,#222230);background:var(--surface,#111118);color:var(--text,#e8e8f0);display:none;place-items:center;cursor:pointer;z-index:2;box-shadow:0 6px 18px rgba(0,0,0,.3)}',
    '.vt-raf-nav:hover{border-color:var(--warm,#c8a46e);color:var(--warm,#c8a46e)}',
    '.vt-raf-nav.prev{left:-18px}.vt-raf-nav.next{right:-18px}',
    '@media (hover:hover) and (min-width:760px){.vt-raf-nav{display:grid}}',

    /* oynatıcı */
    '.vt-modal{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease}',
    '.vt-modal.open{opacity:1}',
    '.vt-back{position:absolute;inset:0;background:rgba(5,5,10,.88);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}',
    '.vt-panel{position:relative;display:flex;flex-direction:column;gap:12px;max-width:94vw;transform:translateY(14px) scale(.985);transition:transform .35s cubic-bezier(.16,1,.3,1)}',
    '.vt-modal.open .vt-panel{transform:none}',
    '.vt-panel.yatay{width:min(94vw,calc((100vh - 150px) * 16 / 9));width:min(94vw,calc((100dvh - 150px) * 16 / 9))}',
    '.vt-panel.dikey{width:min(94vw,calc((100vh - 130px) * 9 / 16));width:min(94vw,calc((100dvh - 130px) * 9 / 16))}',
    '.vt-stage{position:relative;border-radius:16px;overflow:hidden;background:#000;box-shadow:0 30px 90px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08)}',
    '.vt-panel.yatay .vt-stage{aspect-ratio:16/9}.vt-panel.dikey .vt-stage{aspect-ratio:9/16}',
    '.vt-stage video{position:absolute;inset:0;width:100%;height:100%;background:#000;display:block}',
    '.vt-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;color:#f2f1f7;font-family:var(--font-sans,Inter,system-ui,sans-serif)}',
    '.vt-info{min-width:0;display:flex;flex-direction:column;gap:2px}',
    '.vt-title{font-family:var(--font-display,Fraunces,Georgia,serif);font-size:20px;font-weight:700;letter-spacing:-.01em;line-height:1.2}',
    '.vt-sub{font-size:12px;color:rgba(255,255,255,.6);font-weight:500;letter-spacing:.02em}',
    '.vt-actions{display:flex;flex-wrap:wrap;gap:8px}',
    '.vt-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#fff;font:600 12.5px/1 var(--font-sans,Inter,system-ui,sans-serif);text-decoration:none;cursor:pointer;transition:background .2s,border-color .2s,color .2s}',
    '.vt-btn svg{width:15px;height:15px;flex:none}',
    '.vt-btn:hover,.vt-btn:focus-visible{border-color:var(--warm,#c8a46e);color:var(--warm,#c8a46e)}',
    '.vt-btn.primary{background:var(--warm,#c8a46e);border-color:var(--warm,#c8a46e);color:#0a0a0f}',
    '.vt-btn.primary:hover,.vt-btn.primary:focus-visible{background:#e0c08a;color:#0a0a0f}',
    '.vt-btn[hidden]{display:none}',
    '.vt-x{position:absolute;top:-14px;right:-14px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:#15151d;color:#fff;display:grid;place-items:center;cursor:pointer;z-index:3}',
    '.vt-x:hover{border-color:var(--warm,#c8a46e);color:var(--warm,#c8a46e)}',
    '.vt-x svg{width:18px;height:18px}',
    '.vt-nav{position:fixed;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:rgba(20,20,28,.7);color:#fff;display:grid;place-items:center;cursor:pointer;z-index:3}',
    '.vt-nav:hover{border-color:var(--warm,#c8a46e);color:var(--warm,#c8a46e)}',
    '.vt-nav svg{width:22px;height:22px}',
    '.vt-nav.prev{left:18px}.vt-nav.next{right:18px}',
    '.vt-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#15151d;color:#fff;border:1px solid rgba(255,255,255,.18);padding:10px 16px;border-radius:12px;font:600 13px/1.2 var(--font-sans,Inter,system-ui,sans-serif);z-index:2100;opacity:0;transition:opacity .25s}',
    '.vt-toast.show{opacity:1}',
    '@media (max-width:760px){.vt-nav{display:none}}',
    /* telefon dikey: tam ekran; video üstte (kırpmadan), bant altta */
    '@media (max-width:640px) and (orientation:portrait){',
    '.vt-panel.dikey{width:100vw;max-width:100vw;height:100vh;height:100dvh;gap:0;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)}',
    '.vt-panel.dikey .vt-stage{flex:1;min-height:0;aspect-ratio:auto;border-radius:0;box-shadow:none}',
    '.vt-panel.dikey .vt-stage video{object-fit:contain}',
    '.vt-panel.dikey .vt-bar{padding:12px 14px 14px;gap:10px}',
    '.vt-panel.dikey .vt-x{top:calc(10px + env(safe-area-inset-top));right:10px;background:rgba(20,20,28,.7)}',
    '.vt-panel.yatay .vt-x{top:-52px;right:0}',
    '.vt-actions{width:100%;flex-wrap:nowrap}',
    '.vt-btn{padding:10px 12px}',
    '.vt-btn:not(.primary) span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
    '.vt-btn.primary{margin-left:auto}',
    '.vt-title{font-size:18px}',
    '}',
    'html.vt-lock,html.vt-lock body{overflow:hidden!important}',
  ].join('\n');

  function stilEkle() {
    if (document.getElementById('vt-css')) return;
    var s = document.createElement('style');
    s.id = 'vt-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  var IKON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    sol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    sag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    indir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 19h16"/></svg>',
    paylas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    cevir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M9 3.5h6"/></svg>',
    cevirD: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3.5 9v6"/></svg>',
    git: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>',
  };

  function bildir(metin) {
    var t = document.createElement('div');
    t.className = 'vt-toast';
    t.setAttribute('role', 'status');
    t.textContent = metin;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 2200);
  }

  function paylas(p) {
    var url = location.origin + KOK + '#' + p.video;
    var veri = { title: duzMetin(p.title) + ' — Tanıtım', text: duzMetin(p.desc || ''), url: url };
    olay('tanitim_paylas', { video: p.video });
    if (navigator.share) { navigator.share(veri).catch(function () {}); return; }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () { bildir('Bağlantı kopyalandı'); }, function () { bildir(url); });
    } else { bildir(url); }
  }

  // ── Oynatıcı ──
  var M = null; // açık oynatıcı durumu
  function dikeyMi() { return window.innerHeight > window.innerWidth; }

  function ac(p, liste, secenek) {
    if (!p || !p.video) return;
    stilEkle();
    secenek = secenek || {};
    liste = (liste || [p]).filter(function (x) { return x && x.video; });
    var idx = Math.max(0, liste.indexOf(p));
    if (M) kapat(true);
    var onceki = document.activeElement;
    var kok = document.createElement('div');
    kok.className = 'vt-modal';
    kok.setAttribute('role', 'dialog');
    kok.setAttribute('aria-modal', 'true');
    kok.innerHTML =
      '<div class="vt-back"></div>' +
      (liste.length > 1 ? '<button class="vt-nav prev" type="button" aria-label="Önceki video">' + IKON.sol + '</button><button class="vt-nav next" type="button" aria-label="Sonraki video">' + IKON.sag + '</button>' : '') +
      '<div class="vt-panel">' +
        '<button class="vt-x" type="button" aria-label="Kapat">' + IKON.x + '</button>' +
        '<div class="vt-stage"><video playsinline controls preload="auto" controlslist="nodownload"></video></div>' +
        '<div class="vt-bar">' +
          '<div class="vt-info"><span class="vt-title"></span><span class="vt-sub"></span></div>' +
          '<div class="vt-actions">' +
            '<button class="vt-btn vt-fmt" type="button"></button>' +
            '<a class="vt-btn vt-dl" href="#" download>' + IKON.indir + '<span>İndir</span></a>' +
            '<button class="vt-btn vt-share" type="button">' + IKON.paylas + '<span>Paylaş</span></button>' +
            '<a class="vt-btn primary vt-go" href="#">' + '<span>Projeye git</span>' + IKON.git + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(kok);
    document.documentElement.classList.add('vt-lock');
    var panel = kok.querySelector('.vt-panel');
    var video = kok.querySelector('video');
    M = { kok: kok, panel: panel, video: video, liste: liste, idx: idx, onceki: onceki, bicim: secenek.bicim || (dikeyMi() ? 'dikey' : 'yatay'), secenek: secenek };

    function yukle(oran) {
      var q = M.liste[M.idx];
      var b = M.bicim;
      panel.className = 'vt-panel ' + b;
      kok.setAttribute('aria-label', 'Tanıtım videosu: ' + duzMetin(q.title));
      kok.querySelector('.vt-title').textContent = duzMetin(q.title);
      var alt = [kategoriAdi(q), q.tag].filter(Boolean).join(' · ');
      var bil = bildirge && bildirge[q.video];
      if (bil && bil.sure) alt += (alt ? ' · ' : '') + sureYaz(bil.sure);
      kok.querySelector('.vt-sub').textContent = alt;
      var fmt = kok.querySelector('.vt-fmt');
      fmt.innerHTML = (b === 'yatay' ? IKON.cevirD + '<span>Dikey</span>' : IKON.cevir + '<span>Yatay</span>');
      fmt.setAttribute('aria-label', b === 'yatay' ? 'Dikey sürüme geç' : 'Yatay sürüme geç');
      var dl = kok.querySelector('.vt-dl');
      dl.href = yol(q.video, b + '.mp4');
      dl.setAttribute('download', 'raufenc-' + q.video + '-' + b + '.mp4');
      var go = kok.querySelector('.vt-go');
      go.hidden = !!M.secenek.gitGizle;
      go.href = q.href;
      if (/^https?:/.test(q.href)) { go.target = '_blank'; go.rel = 'noopener'; } else { go.removeAttribute('target'); go.removeAttribute('rel'); }
      video.poster = yol(q.video, b + '.jpg');
      [].forEach.call(video.querySelectorAll('track'), function (t) { t.remove(); });
      var bm = bildirge && bildirge[q.video];
      if (bm && bm.altyazi) {
        var tr = document.createElement('track');
        tr.kind = 'captions'; tr.srclang = 'tr'; tr.label = 'Türkçe'; tr.src = yol(q.video, 'altyazi.vtt');
        video.appendChild(tr);
      }
      video.src = yol(q.video, b + '.mp4');
      video.muted = false;
      if (oran) video.addEventListener('loadedmetadata', function o() { video.removeEventListener('loadedmetadata', o); try { video.currentTime = oran * video.duration; } catch (e) {} });
      var pr = video.play();
      if (pr && pr.catch) pr.catch(function () { video.muted = true; video.play().catch(function () {}); });
      olay('tanitim_izle', { video: q.video, bicim: b });
      if (M.secenek.hash) history.replaceState(null, '', '#' + q.video);
    }
    M.yukle = yukle;

    kok.querySelector('.vt-back').addEventListener('click', function () { kapat(); });
    kok.querySelector('.vt-x').addEventListener('click', function () { kapat(); });
    kok.querySelector('.vt-fmt').addEventListener('click', function () {
      var oran = video.duration ? video.currentTime / video.duration : 0;
      M.bicim = M.bicim === 'yatay' ? 'dikey' : 'yatay';
      yukle(oran);
    });
    kok.querySelector('.vt-share').addEventListener('click', function () { paylas(M.liste[M.idx]); });
    kok.querySelector('.vt-dl').addEventListener('click', function () { olay('tanitim_indir', { video: M.liste[M.idx].video, bicim: M.bicim }); });
    var prev = kok.querySelector('.vt-nav.prev'), next = kok.querySelector('.vt-nav.next');
    if (prev) prev.addEventListener('click', function () { git(-1); });
    if (next) next.addEventListener('click', function () { git(1); });
    // telefonda yana kaydırarak geç
    var tx = null, ty = null;
    panel.addEventListener('touchstart', function (e) { if (e.touches.length === 1) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } }, { passive: true });
    panel.addEventListener('touchend', function (e) {
      if (tx == null) return;
      var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      tx = null;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5 && M.liste.length > 1) git(dx < 0 ? 1 : -1);
    });
    video.addEventListener('ended', function () { if (M && M.liste.length > 1 && M.secenek.otomatikSonraki !== false) git(1); else video.play().catch(function () {}); });
    document.addEventListener('keydown', tusla, true);
    bildirgeYukle().then(function () {
      if (!M || M.kok !== kok) return;
      var q = M.liste[M.idx], b = bildirge[q.video];
      if (b && b.sure) { var s = kok.querySelector('.vt-sub'); if (s.textContent.indexOf(':') < 0) s.textContent += (s.textContent ? ' · ' : '') + sureYaz(b.sure); }
      if (b && b.altyazi && !video.querySelector('track')) {
        var tr = document.createElement('track');
        tr.kind = 'captions'; tr.srclang = 'tr'; tr.label = 'Türkçe'; tr.src = yol(q.video, 'altyazi.vtt');
        video.appendChild(tr);
      }
    });

    yukle(0);
    requestAnimationFrame(function () { kok.classList.add('open'); kok.querySelector('.vt-x').focus({ preventScroll: true }); });
  }

  function git(d) {
    if (!M) return;
    M.idx = (M.idx + d + M.liste.length) % M.liste.length;
    M.yukle(0);
  }

  function tusla(e) {
    if (!M) return;
    if (e.key === 'Escape') { e.preventDefault(); kapat(); return; }
    if (e.key === 'ArrowRight' && M.liste.length > 1 && e.target.tagName !== 'VIDEO') { e.preventDefault(); git(1); return; }
    if (e.key === 'ArrowLeft' && M.liste.length > 1 && e.target.tagName !== 'VIDEO') { e.preventDefault(); git(-1); return; }
    if (e.key === 'Tab') {
      if (!M.kok.contains(document.activeElement)) { e.preventDefault(); M.kok.querySelector('.vt-x').focus(); return; }
      var odak = [].slice.call(M.kok.querySelectorAll('button, a[href], video')).filter(function (x) { return !x.hidden && x.getClientRects().length > 0; });
      if (!odak.length) return;
      var ilk = odak[0], son = odak[odak.length - 1];
      if (e.shiftKey && document.activeElement === ilk) { e.preventDefault(); son.focus(); }
      else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
    }
  }

  function kapat(hemen) {
    if (!M) return;
    var m = M;
    M = null;
    document.removeEventListener('keydown', tusla, true);
    try { m.video.pause(); m.video.removeAttribute('src'); m.video.load(); } catch (e) {}
    document.documentElement.classList.remove('vt-lock');
    if (m.secenek.hash && location.hash) history.replaceState(null, '', location.pathname + location.search);
    if (m.secenek.kapaninca) m.secenek.kapaninca();
    if (hemen) { m.kok.remove(); return; }
    m.kok.classList.remove('open');
    setTimeout(function () { m.kok.remove(); }, 260);
    if (m.onceki && m.onceki.focus) m.onceki.focus({ preventScroll: true });
  }

  // ── Kart önizlemesi ──
  // hucre: kartı saran kap (position:relative), kart: <a class="card">, p: proje
  function kartaEkle(hucre, kart, p, liste) {
    if (!p || !p.video) return;
    stilEkle();
    hucre.classList.add('vt-cell');
    var pad = parseFloat(getComputedStyle(kart).paddingTop);
    if (pad) hucre.style.setProperty('--vt-pad', pad + 'px');
    var medya = document.createElement('div');
    medya.className = 'vt-media';
    medya.setAttribute('aria-hidden', 'true');
    medya.innerHTML = '<img src="' + yol(p.video, 'kart.jpg') + '" alt="" loading="lazy" decoding="async" width="640" height="360">';
    kart.insertBefore(medya, kart.firstChild);
    var dugme = document.createElement('button');
    dugme.type = 'button';
    dugme.className = 'vt-play';
    dugme.innerHTML = IKON.play + '<span>Tanıtım</span>';
    dugme.setAttribute('aria-label', duzMetin(p.title) + ' — tanıtım videosunu izle');
    dugme.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); if (vid) { vid.pause(); medya.classList.remove('playing'); } ac(p, liste); });
    hucre.appendChild(dugme);
    bildirgeYukle().then(function () { var b = bildirge[p.video]; if (b && b.sure) dugme.querySelector('span').textContent = 'Tanıtım · ' + sureYaz(b.sure); });

    if (!finePointer || reduceMotion || saveData) return;
    var vid = null, zaman = null;
    hucre.addEventListener('mouseenter', function () {
      zaman = setTimeout(function () {
        if (!vid) {
          vid = document.createElement('video');
          vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = 'auto';
          vid.setAttribute('muted', ''); vid.setAttribute('playsinline', '');
          vid.src = yol(p.video, 'kart.mp4');
          medya.appendChild(vid);
          vid.addEventListener('playing', function () { medya.classList.add('playing'); });
        }
        vid.play().catch(function () {});
      }, 140);
    });
    hucre.addEventListener('mouseleave', function () {
      clearTimeout(zaman);
      if (vid) { vid.pause(); medya.classList.remove('playing'); try { vid.currentTime = 0; } catch (e) {} }
    });
  }

  // ── Reels rafı ──
  function raf(kap, projeler) {
    stilEkle();
    var liste = projeler.filter(function (p) { return p && p.video; });
    if (!liste.length) return null;
    var sarg = document.createElement('div');
    sarg.className = 'vt-raf-wrap';
    var r = document.createElement('div');
    r.className = 'vt-raf';
    r.setAttribute('role', 'list');
    liste.forEach(function (p) {
      var li = document.createElement('div');
      li.setAttribute('role', 'listitem');
      li.style.cssText = 'flex:none;scroll-snap-align:start';
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'vt-reel';
      b.setAttribute('aria-label', duzMetin(p.title) + ' — tanıtım videosunu izle');
      b.innerHTML =
        '<img src="' + yol(p.video, 'kart-dikey.jpg') + '" alt="" loading="lazy" decoding="async" width="360" height="640">' +
        '<span class="vt-shade"></span>' +
        '<span class="vt-cat">' + esc(kategoriAdi(p)) + '</span>' +
        '<span class="vt-ttl">' + esc(duzMetin(p.title)) + '</span>' +
        '<span class="vt-meta">' + IKON.play + '<span class="vt-dur">İzle</span></span>';
      b.addEventListener('click', function () { tumunuDurdur(); ac(p, liste); });
      b._p = p;
      li.appendChild(b);
      r.appendChild(li);
    });
    sarg.appendChild(r);
    var pv = document.createElement('button'), nx = document.createElement('button');
    pv.className = 'vt-raf-nav prev'; nx.className = 'vt-raf-nav next';
    pv.type = nx.type = 'button';
    pv.innerHTML = IKON.sol; nx.innerHTML = IKON.sag;
    pv.setAttribute('aria-label', 'Önceki videolar'); nx.setAttribute('aria-label', 'Sonraki videolar');
    pv.addEventListener('click', function () { r.scrollBy({ left: -r.clientWidth * 0.8, behavior: 'smooth' }); });
    nx.addEventListener('click', function () { r.scrollBy({ left: r.clientWidth * 0.8, behavior: 'smooth' }); });
    sarg.appendChild(pv); sarg.appendChild(nx);
    kap.appendChild(sarg);
    var reels = [].slice.call(r.querySelectorAll('.vt-reel'));
    bildirgeYukle().then(function () {
      reels.forEach(function (b) { var m = bildirge[b._p.video]; if (m && m.sure) b.querySelector('.vt-dur').textContent = sureYaz(m.sure); });
    });
    function tumunuDurdur() { reels.forEach(function (b) { onizle(b, false, true); }); }

    if (reduceMotion || saveData) return sarg;
    // tumunuDurdur yukarıda tanımlı; önizleme yoksa da güvenli
    function onizle(b, ac2, birak) {
      var v = b.querySelector('video');
      if (ac2) {
        if (!v) {
          v = document.createElement('video');
          v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
          v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
          v.src = yol(b._p.video, 'kart-dikey.mp4');
          b.insertBefore(v, b.querySelector('.vt-shade'));
          v.addEventListener('playing', function () { b.classList.add('playing'); });
        }
        v.play().catch(function () {});
      } else if (v) {
        v.pause(); b.classList.remove('playing');
        if (birak) { v.removeAttribute('src'); v.load(); v.remove(); }
      }
    }
    if (finePointer) {
      reels.forEach(function (b) {
        b.addEventListener('mouseenter', function () { onizle(b, true); });
        b.addEventListener('mouseleave', function () { onizle(b, false); });
      });
    } else if ('IntersectionObserver' in window) {
      // dokunmatik: görüntü alanında (sayfa + raf) tam görünen tek kart oynar; çıkınca kaynak bırakılır
      var aktif = null;
      var io = new IntersectionObserver(function (girdiler) {
        girdiler.forEach(function (g) {
          if (g.intersectionRatio >= 0.85) { if (aktif && aktif !== g.target) onizle(aktif, false, true); aktif = g.target; onizle(g.target, true); }
          else if (g.target === aktif && g.intersectionRatio < 0.5) { onizle(g.target, false, true); aktif = null; }
        });
      }, { root: null, threshold: [0.5, 0.85] });
      reels.forEach(function (b) { io.observe(b); });
    }
    return sarg;
  }

  window.VideoTanitim = { KOK: KOK, yol: yol, ac: ac, kapat: kapat, kartaEkle: kartaEkle, raf: raf, bildirge: bildirgeYukle, kategoriAdi: kategoriAdi, paylas: paylas, stilEkle: stilEkle };
})();
