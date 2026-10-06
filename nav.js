/* nav.js — Rauf Enç Global Navigation v3
 * Her sayfaya <script src="/nav.js"></script> ekle.
 * Ana sayfa: tema toggle
 * Proje sayfaları: ← Ana Sayfa + tema toggle
 * Otomatik olarak theme.js'i yükler.
 */
(function () {
  if (document.body && document.body.getAttribute('data-nav-skip') === 'true') return;

  var PATH   = window.location.pathname.replace(/\/index\.html$/, '/');
  var isHome = PATH === '/' || PATH === '';
  var HOME   = '/';

  /* ── SVG ikonlar ── */
  var arrowSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';
  var sunSvg   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var moonSvg  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  /* ── Nav içeriği ── */
  var inner = '';
  if (!isHome) {
    inner += '<a href="' + HOME + '" class="rn-btn rn-back" title="Ana sayfaya dön">'
           + arrowSvg + ' <span>Ana Sayfa</span></a>';
  }
  inner += '<button id="theme-toggle" class="rn-btn rn-theme" type="button" aria-label="Tema değiştir">'
         + sunSvg + '</button>';

  var nav = document.createElement('div');
  nav.id = 'rauf-nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Site navigasyonu');
  nav.innerHTML = inner;

  /* ── Stiller (CSS var fallback ile geriye uyumlu) ── */
  var style = document.createElement('style');
  style.id = 'rauf-nav-css';
  style.textContent = [
    '#rauf-nav{',
      'position:fixed;top:12px;left:12px;z-index:400;',
      'display:flex;align-items:center;gap:6px;',
      'font-family:var(--font-sans,-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif);',
    '}',
    '.rn-btn{',
      'display:inline-flex;align-items:center;gap:5px;',
      'padding:6px 12px;',
      'background:var(--nav-bg,rgba(8,8,14,.72));',
      'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);',
      'border:1px solid var(--nav-border,rgba(255,255,255,.1));border-radius:100px;',
      'color:var(--nav-text,rgba(255,255,255,.65));text-decoration:none;',
      'font-size:.72rem;font-weight:500;letter-spacing:.01em;',
      'white-space:nowrap;line-height:1;cursor:pointer;',
      'transition:background .15s,color .15s,border-color .15s,opacity .15s;',
      'opacity:.75;',
    '}',
    '.rn-btn:hover{',
      'background:var(--nav-hover,rgba(255,255,255,.1));',
      'border-color:var(--border-hover,rgba(255,255,255,.2));',
      'color:var(--text,#fff);opacity:1;',
    '}',
    'button.rn-btn{font-family:inherit;outline:none;}',
    '.rn-theme{padding:6px 10px;}',
    '@media(max-width:360px){.rn-btn span{display:none}.rn-btn{padding:7px 10px}}',
  ].join('');

  /* ── theme.js'i yükle ── */
  function loadThemeScript() {
    if (window.RaufTheme) return;
    var s = document.createElement('script');
    s.src = '/lib/design-system/theme.js';
    document.head.appendChild(s);
  }

  /* ── Inject ── */
  function inject() {
    if (document.getElementById('rauf-nav')) return;
    if (!document.getElementById('rauf-nav-css')) document.head.appendChild(style);
    document.body.insertBefore(nav, document.body.firstChild);

    // Tema toggle click
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        if (window.RaufTheme) {
          window.RaufTheme.toggle();
        } else {
          // Fallback: theme.js henüz yüklenmediyse
          var isLight = document.documentElement.classList.contains('light');
          if (isLight) {
            document.documentElement.classList.remove('light');
            localStorage.setItem('rauf-theme', 'dark');
          } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('rauf-theme', 'light');
          }
          updateThemeIcon();
        }
      });
    }

    loadThemeScript();
    updateThemeIcon();
  }

  function updateThemeIcon() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var isLight = document.documentElement.classList.contains('light');
    btn.innerHTML = isLight ? moonSvg : sunSvg;
    btn.setAttribute('aria-label', isLight ? 'Gece moduna geç' : 'Gündüz moduna geç');
  }

  /* ── Tanıtım videosu düğmesi (videosu olan proje sayfalarında) ── */
  var playSvg = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z"/></svg>';
  function videoDugmesi() {
    if (isHome || PATH.indexOf('/videolar/') === 0 || !window.fetch) return;
    fetch('/videolar/index.json').then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      if (!j || !j.videolar) return;
      var enIyi = null;
      j.videolar.forEach(function (v) {
        var kok = (v.href || '').split('#')[0];
        if (kok.charAt(0) !== '/' || kok === '/') return;
        if (PATH.indexOf(kok) === 0 && (!enIyi || kok.length > enIyi.kok.length)) enIyi = { v: v, kok: kok };
      });
      var navEl = document.getElementById('rauf-nav');
      if (!enIyi || !navEl || document.getElementById('rn-video')) return;
      var v = enIyi.v;
      var b = document.createElement('button');
      b.id = 'rn-video';
      b.type = 'button';
      b.className = 'rn-btn rn-video';
      b.title = 'Tanıtım videosunu izle';
      b.setAttribute('aria-label', v.title + ' — tanıtım videosunu izle');
      b.innerHTML = playSvg + ' <span>Tanıtım</span>';
      b.addEventListener('click', function () {
        var ac = function () { window.VideoTanitim.ac({ video: v.slug, title: v.title, href: v.href, kategori: v.kategori, desc: '' }, null, { gitGizle: true }); };
        if (window.VideoTanitim) { ac(); return; }
        var s = document.getElementById('vt-js');
        if (s) s.addEventListener('load', ac);
      });
      navEl.appendChild(b);
      if (!window.VideoTanitim && !document.getElementById('vt-js')) {
        var sj = document.createElement('script');
        sj.id = 'vt-js'; sj.src = '/lib/video-tanitim.js'; sj.defer = true;
        document.head.appendChild(sj);
      }
    }).catch(function () {});
  }
  if (document.readyState === 'complete') setTimeout(videoDugmesi, 600);
  else window.addEventListener('load', function () { setTimeout(videoDugmesi, 600); });

  // Tema değişikliğini dinle
  window.addEventListener('theme-changed', function () {
    updateThemeIcon();
  });

  if (document.body) { inject(); }
  else { document.addEventListener('DOMContentLoaded', inject); }
})();
