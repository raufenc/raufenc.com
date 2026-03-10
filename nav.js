/* nav.js — Rauf Lab Global Navigation
 * Her sayfaya <script src="/nav.js"></script> ekle, gerisini bu halleder.
 * Otomatik olarak lab.raufenc.com → raufenc.com breadcrumb'ı oluşturur.
 */
(function () {
  const PATH  = window.location.pathname.replace(/\/index\.html$/, '/');
  const isLabHome = PATH === '/' || PATH === '';
  const RAUFENC   = 'https://raufenc.com';
  const LAB       = '/';

  /* Sayfa başlığını kısa tut */
  const rawTitle  = document.title || '';
  const pageTitle = rawTitle.split(/\s*[—–\-|]\s*/)[0].trim() || 'Sayfa';

  /* İkonlar */
  const iconHome = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>`;

  const iconFlask = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M9 3h6M9 3v7L4.5 18A1 1 0 0 0 5.4 20h13.2a1 1 0 0 0 .9-2L15 10V3"/>
  </svg>`;

  /* İçerik */
  let inner;
  if (isLabHome) {
    inner = `<a href="${RAUFENC}" class="rn-a" title="raufenc.com ana sayfası">${iconHome} <span>raufenc.com</span></a>`;
  } else {
    inner = `
      <a href="${RAUFENC}" class="rn-a" title="raufenc.com">${iconHome}</a>
      <span class="rn-sep">›</span>
      <a href="${LAB}" class="rn-a" title="Lab ana sayfası">${iconFlask} <span>Lab</span></a>
      <span class="rn-sep">›</span>
      <span class="rn-cur">${pageTitle}</span>`;
  }

  /* DOM elementi */
  const nav = document.createElement('div');
  nav.id = 'rauf-nav';
  nav.setAttribute('aria-label', 'Site navigasyonu');
  nav.innerHTML = inner;

  /* Stiller */
  const style = document.createElement('style');
  style.id   = 'rauf-nav-css';
  style.textContent = `
    #rauf-nav {
      position: fixed;
      top: 12px;
      left: 14px;
      z-index: 400;
      display: flex;
      align-items: center;
      gap: 3px;
      padding: 5px 11px 5px 8px;
      background: rgba(8, 8, 14, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 100px;
      font-size: 0.7rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.2s;
      pointer-events: auto;
    }
    #rauf-nav:hover { opacity: 1; }

    #rauf-nav .rn-a {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      padding: 2px 4px;
      border-radius: 6px;
      transition: color 0.15s, background 0.15s;
    }
    #rauf-nav .rn-a:hover {
      color: #fff;
      background: rgba(255,255,255,0.07);
    }
    #rauf-nav .rn-sep {
      color: rgba(255,255,255,0.16);
      font-size: 0.8rem;
      padding: 0 1px;
    }
    #rauf-nav .rn-cur {
      color: rgba(255,255,255,0.28);
      padding: 2px 4px;
      max-width: 110px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Küçük ekranda sayfa adını gizle, sadece ikonlar kalsın */
    @media (max-width: 380px) {
      #rauf-nav .rn-cur { display: none; }
      #rauf-nav .rn-a span { display: none; }
    }
  `;

  /* Enjeksiyon */
  function inject() {
    if (!document.getElementById('rauf-nav-css')) {
      document.head.appendChild(style);
    }
    if (!document.getElementById('rauf-nav') && document.body) {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  if (document.body) { inject(); }
  else { document.addEventListener('DOMContentLoaded', inject); }
})();
