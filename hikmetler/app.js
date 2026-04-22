/* Hikmetler — SPA Router + Render + Share
 * Path-based routing with history.pushState
 * Views: home, category, detail
 */
(() => {
  const DATA = window.HIKMETLER_DATA;
  if (!DATA) { console.error('HIKMETLER_DATA missing'); return; }

  const { categories, cards } = DATA;
  const SITE = 'https://raufenc.com';
  const app = document.getElementById('app');

  /* ── Data Maps ─────────────────────────────── */
  const catById    = new Map(categories.map(c => [c.id, c]));
  const catBySlug  = new Map(categories.map(c => [c.slug, c]));
  const cardsByCat = new Map(categories.map(c => [c.id, []]));
  cards.forEach(k => cardsByCat.get(k.cat).push(k));
  cardsByCat.forEach(arr => arr.sort((a, b) => a.n - b.n));

  /* ── URL & Asset Helpers ───────────────────── */
  const pad2 = n => String(n).padStart(2, '0');
  const assetPath = (catId, n, size) => `/hikmetler/assets/${catId}/${n}-${size}.webp`;
  const catUrl    = c => `/hikmetler/${c.slug}/`;
  const cardUrl   = k => {
    const c = catById.get(k.cat);
    return `/hikmetler/${c.slug}/${pad2(k.n)}-${k.slug}/`;
  };

  const esc = s => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  /* ── Route Parsing ─────────────────────────── */
  function parseRoute(path) {
    path = path.replace(/\/index\.html$/, '');
    if (!path.endsWith('/')) path += '/';
    if (path === '/hikmetler/') return { view: 'home' };

    const m = path.match(/^\/hikmetler\/([^\/]+)\/(?:(\d+)-[^\/]+\/)?$/);
    if (!m) return { view: 'home' };

    const catSlug = m[1];
    const n = m[2] ? parseInt(m[2], 10) : null;
    if (!catBySlug.has(catSlug)) return { view: 'home' };
    if (n === null) return { view: 'category', catSlug };
    return { view: 'detail', catSlug, n };
  }

  /* ── Meta Tag Updates ──────────────────────── */
  function setMeta(title, description, url, image) {
    document.title = title;
    const set = (sel, val) => {
      let el = document.querySelector(sel);
      if (el) el.setAttribute(sel.includes('property') ? 'content' : sel.includes('name') ? 'content' : 'content', val);
    };
    const setProp = (prop, val) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    const setName = (name, val) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    const setLink = (rel, val) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', val);
    };
    setName('description', description);
    setProp('og:title', title);
    setProp('og:description', description);
    setProp('og:url', url);
    setProp('og:image', image);
    setName('twitter:title', title);
    setName('twitter:description', description);
    setName('twitter:image', image);
    setLink('canonical', url);
  }

  /* ── SVG İkon kütüphanesi ─────────────────── */
  const ICONS = {
    search:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    arrow:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    arrowR:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    dice:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1" fill="currentColor"/></svg>',
    share:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    link:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    download:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    whatsapp:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.71-8.25 8.25-8.25M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z"/></svg>',
    twitter: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    telegram:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.54 4.72 2.72 12.06c-1.34.52-1.33 1.24-.24 1.57l4.82 1.51 11.17-7.05c.52-.32 1-.15.61.21l-9.05 8.16-.35 5.22c.52 0 .74-.24 1.03-.52l2.44-2.37 5.08 3.75c.93.52 1.6.25 1.84-.86l3.33-15.72c.35-1.37-.51-1.98-1.41-1.56z"/></svg>',
    heart:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  };

  /* ── Image Element Helper ──────────────────── */
  function imgEl(card, size, classes = '') {
    const cat = catById.get(card.cat);
    const src = assetPath(cat.id, card.n, size);
    return `<img src="${src}" alt="${esc(card.title)}" loading="lazy" decoding="async"
              class="${classes}" width="${card.w}" height="${card.h}"
              onload="this.classList.add('loaded')">`;
  }

  function cardThumb(card, withBlur = true) {
    const blur = withBlur && card.blur
      ? `<div class="blur" style="background-image:url(${card.blur})"></div>`
      : '';
    return `
      <a class="hk-card" href="${cardUrl(card)}" aria-label="${esc(card.title)}">
        ${blur}
        ${imgEl(card, 'medium')}
        <span class="num">${pad2(card.n)}</span>
        <span class="title">${esc(card.title)}</span>
      </a>`;
  }

  /* ── HOME View ─────────────────────────────── */
  function renderHome() {
    setMeta(
      'Hikmetler — Rauf Enç',
      'İslâmî usul, akıl ve ahlâka dair 337 hikmet kartı, 20 temada.',
      `${SITE}/hikmetler/`,
      `${SITE}/hikmetler/og-cover.webp`
    );

    const today = cardOfTheDay();
    const todayCat = catById.get(today.cat);

    const catMozaics = categories.map(cat => {
      const first4 = cardsByCat.get(cat.id).slice(0, 4);
      const thumbs = first4.map(k => `<img src="${assetPath(cat.id, k.n, 'thumb')}" alt="" loading="lazy">`).join('');
      return `
        <a class="hk-cat-card" href="${catUrl(cat)}">
          <div class="hk-cat-mozaic">${thumbs}</div>
          <div class="hk-cat-body">
            <div class="hk-cat-num">Tema ${pad2(cat.id)}</div>
            <h3>${esc(cat.title)}</h3>
            <p class="hk-cat-lead">${esc(cat.lead || '')}</p>
            <div class="hk-cat-meta">
              <span>${cat.count} kart</span>
              <span>${ICONS.arrowR}</span>
            </div>
          </div>
        </a>`;
    }).join('');

    app.innerHTML = `
      <section class="hk-hero">
        <h1>Hikmetler</h1>
        <p>İslâmî usul, akıl ve ahlâka dair hikmetler; temiz bir arşiv, hızlı paylaşım.</p>
        <div class="hk-stats">
          <span><b>${cards.length}</b> kart</span>
          <span><b>${categories.length}</b> tema</span>
        </div>
      </section>

      <div class="hk-search">
        <span class="hk-search-icon">${ICONS.search}</span>
        <input type="search" id="hk-search-input" placeholder="Başlık ara…" autocomplete="off">
        <div class="hk-search-results" id="hk-search-results"></div>
      </div>

      <section class="hk-today">
        <div>
          <div class="hk-today-label">Bugünün Hikmeti</div>
          <h2>${esc(today.title)}</h2>
          <div class="hk-today-meta">${esc(todayCat.title)} · Kart ${today.id}</div>
          <a class="hk-today-cta" href="${cardUrl(today)}">Tam bak ${ICONS.arrowR}</a>
        </div>
        <a class="hk-today-image" href="${cardUrl(today)}" aria-hidden="true">
          ${imgEl(today, 'medium')}
        </a>
      </section>

      <div class="hk-section-title">
        <span>20 Tema</span>
        <span class="count">${cards.length} hikmet</span>
      </div>
      <div class="hk-cat-grid">
        ${catMozaics}
      </div>

      <div class="hk-actions">
        <button class="hk-btn primary" id="hk-random">${ICONS.dice} Rastgele Keşfet</button>
      </div>
    `;

    wireSearch();
    document.getElementById('hk-random').addEventListener('click', () => {
      const k = cards[Math.floor(Math.random() * cards.length)];
      navigate(cardUrl(k));
    });
  }

  /* ── CATEGORY View ─────────────────────────── */
  function renderCategory(catSlug) {
    const cat = catBySlug.get(catSlug);
    if (!cat) return renderHome();

    const list = cardsByCat.get(cat.id);
    const firstCard = list[0];
    setMeta(
      `${cat.title} — Hikmetler`,
      `${cat.lead || cat.title} — ${cat.count} hikmet kartı.`,
      `${SITE}${catUrl(cat)}`,
      `${SITE}${assetPath(cat.id, firstCard.n, 'full')}`
    );

    app.innerHTML = `
      <div class="hk-cat-header">
        <div class="hk-breadcrumb">
          <a href="/hikmetler/">Hikmetler</a> · Tema ${pad2(cat.id)}
        </div>
        <h1>${esc(cat.title)}</h1>
        <p class="lead">${esc(cat.lead || '')}</p>
        <span class="meta">${cat.count} kart</span>
      </div>
      <div class="hk-card-grid">
        ${list.map(k => cardThumb(k)).join('')}
      </div>
    `;
  }

  /* ── DETAIL View ───────────────────────────── */
  function renderDetail(catSlug, n) {
    const cat = catBySlug.get(catSlug);
    if (!cat) return renderHome();
    const list = cardsByCat.get(cat.id);
    const idx  = list.findIndex(k => k.n === n);
    if (idx === -1) return renderCategory(catSlug);
    const card = list[idx];
    const prev = idx > 0 ? list[idx - 1] : null;
    const next = idx < list.length - 1 ? list[idx + 1] : null;

    const fullUrl = `${SITE}${cardUrl(card)}`;
    const imageUrl = `${SITE}${assetPath(cat.id, card.n, 'full')}`;
    setMeta(
      `${card.title} — Hikmetler`,
      `${cat.title} · Kart ${pad2(card.n)}/${cat.count}`,
      fullUrl,
      imageUrl
    );

    app.innerHTML = `
      <div class="hk-detail">
        <div class="hk-detail-header">
          <a class="hk-back" href="${catUrl(cat)}">${ICONS.arrow} ${esc(cat.title)}</a>
          <span class="hk-progress">Kart ${pad2(card.n)} / ${cat.count}</span>
        </div>

        <div class="hk-detail-image" id="hk-zoom-trigger">
          ${card.blur ? `<div class="blur" style="background-image:url(${card.blur})"></div>` : ''}
          <img src="${assetPath(cat.id, card.n, 'full')}"
               alt="${esc(card.title)}"
               width="${card.w}" height="${card.h}"
               decoding="async"
               onload="this.classList.add('loaded')">
        </div>

        <h1 class="hk-detail-title">${esc(card.title)}</h1>

        <div class="hk-share" role="group" aria-label="Paylaş">
          <button class="hk-share-btn" id="hk-share-native" title="Paylaş" aria-label="Paylaş">${ICONS.share}</button>
          <a class="hk-share-btn" href="https://wa.me/?text=${encodeURIComponent(card.title + '\n\n' + fullUrl)}" target="_blank" rel="noopener" title="WhatsApp">${ICONS.whatsapp}</a>
          <a class="hk-share-btn" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(card.title)}" target="_blank" rel="noopener" title="X (Twitter)">${ICONS.twitter}</a>
          <a class="hk-share-btn" href="https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(card.title)}" target="_blank" rel="noopener" title="Telegram">${ICONS.telegram}</a>
          <button class="hk-share-btn" id="hk-copy-link" title="Bağlantıyı Kopyala" aria-label="Bağlantıyı Kopyala">${ICONS.link}</button>
          <button class="hk-share-btn with-label" id="hk-download" title="İndir" aria-label="İndir">${ICONS.download} <span>İndir</span></button>
        </div>

        <div class="hk-detail-nav">
          <a class="hk-nav-btn ${prev ? '' : 'disabled'}" href="${prev ? cardUrl(prev) : '#'}">
            ${ICONS.arrow}
            <div>
              <div class="dir">Önceki</div>
              <span class="ttl">${prev ? esc(prev.title) : '—'}</span>
            </div>
          </a>
          <a class="hk-nav-btn next ${next ? '' : 'disabled'}" href="${next ? cardUrl(next) : '#'}">
            <div>
              <div class="dir">Sonraki</div>
              <span class="ttl">${next ? esc(next.title) : '—'}</span>
            </div>
            ${ICONS.arrowR}
          </a>
        </div>
      </div>
    `;

    wireDetailHandlers(card, cat, fullUrl);
  }

  /* ── Share Handlers ────────────────────────── */
  function wireDetailHandlers(card, cat, fullUrl) {
    const nativeBtn = document.getElementById('hk-share-native');
    if (navigator.share) {
      nativeBtn.addEventListener('click', () => {
        navigator.share({
          title: card.title,
          text: card.title,
          url: fullUrl
        }).catch(() => {});
      });
    } else {
      nativeBtn.style.display = 'none';
    }

    document.getElementById('hk-copy-link').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(fullUrl);
        toast('Bağlantı kopyalandı');
      } catch {
        toast('Kopyalanamadı');
      }
    });

    document.getElementById('hk-download').addEventListener('click', () => {
      showDownloadMenu(card, cat);
    });

    // Fullscreen zoom
    const zoomTrigger = document.getElementById('hk-zoom-trigger');
    zoomTrigger.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'hk-zoom-overlay open';
      overlay.innerHTML = `<img src="${assetPath(cat.id, card.n, 'full')}" alt="${esc(card.title)}">`;
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });

    // Swipe (mobile)
    let touchX = null;
    const imgArea = document.querySelector('.hk-detail-image');
    imgArea.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    imgArea.addEventListener('touchend', e => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 50) return;
      const list = cardsByCat.get(cat.id);
      const idx = list.findIndex(k => k.n === card.n);
      if (dx < 0 && idx < list.length - 1) navigate(cardUrl(list[idx + 1]));
      else if (dx > 0 && idx > 0) navigate(cardUrl(list[idx - 1]));
    }, { passive: true });

    // Preload neighbors
    const list = cardsByCat.get(cat.id);
    const idx = list.findIndex(k => k.n === card.n);
    [list[idx - 1], list[idx + 1]].filter(Boolean).forEach(k => {
      const i = new Image();
      i.src = assetPath(cat.id, k.n, 'medium');
    });
  }

  function showDownloadMenu(card, cat) {
    // Simple menu: PNG or WebP
    const existing = document.getElementById('hk-dl-menu');
    if (existing) { existing.remove(); return; }
    const menu = document.createElement('div');
    menu.id = 'hk-dl-menu';
    menu.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-md);box-shadow:var(--shadow-lg);padding:8px;display:flex;flex-direction:column;gap:4px;z-index:999;min-width:220px;';
    menu.innerHTML = `
      <button data-fmt="png" style="padding:10px 14px;background:transparent;border:none;color:var(--text);font-family:inherit;cursor:pointer;text-align:left;border-radius:8px;font-size:.9rem;">PNG olarak indir</button>
      <button data-fmt="webp" style="padding:10px 14px;background:transparent;border:none;color:var(--text);font-family:inherit;cursor:pointer;text-align:left;border-radius:8px;font-size:.9rem;">WebP olarak indir (küçük)</button>
    `;
    document.body.appendChild(menu);
    menu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.background = 'var(--surface-hover)');
      btn.addEventListener('mouseleave', () => btn.style.background = 'transparent');
      btn.addEventListener('click', async () => {
        menu.remove();
        await downloadCard(card, cat, btn.dataset.fmt);
      });
    });
    setTimeout(() => {
      const close = e => { if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('click', close); } };
      document.addEventListener('click', close);
    }, 0);
  }

  async function downloadCard(card, cat, fmt) {
    const src = assetPath(cat.id, card.n, 'full');
    const safe = card.slug || card.id;
    toast('Hazırlanıyor…');

    if (fmt === 'webp') {
      // Simple direct download
      const a = document.createElement('a');
      a.href = src;
      a.download = `${pad2(card.cat)}-${pad2(card.n)}-${safe}.webp`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast('İndirildi');
      return;
    }

    try {
      const img = await loadImage(src);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (!blob) { toast('PNG dönüşümü başarısız'); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${pad2(card.cat)}-${pad2(card.n)}-${safe}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast('İndirildi');
      }, 'image/png');
    } catch (e) {
      toast('İndirme başarısız');
      console.error(e);
    }
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function toast(msg) {
    let t = document.querySelector('.hk-toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'hk-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(t._hide);
    t._hide = setTimeout(() => t.classList.remove('show'), 1800);
  }

  /* ── Search ────────────────────────────────── */
  function normalize(s) {
    return s.toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
      .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[âà]/g, 'a').replace(/[îï]/g, 'i').replace(/[ûü]/g, 'u')
      .replace(/[êë]/g, 'e').replace(/[ôö]/g, 'o');
  }

  function searchCards(query, limit = 10) {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    const results = [];
    for (const card of cards) {
      const hay = normalize(card.title);
      const i = hay.indexOf(q);
      if (i === -1) continue;
      results.push({ card, score: i === 0 ? 0 : 1, pos: i });
    }
    results.sort((a, b) => a.score - b.score || a.pos - b.pos);
    return results.slice(0, limit).map(r => r.card);
  }

  function wireSearch() {
    const input = document.getElementById('hk-search-input');
    const results = document.getElementById('hk-search-results');
    if (!input || !results) return;

    const render = () => {
      const q = input.value;
      if (q.trim().length < 2) {
        results.classList.remove('open');
        return;
      }
      const list = searchCards(q);
      if (list.length === 0) {
        results.innerHTML = `<div class="hk-search-empty">Sonuç bulunamadı</div>`;
      } else {
        results.innerHTML = list.map(k => `
          <a class="hk-search-result" href="${cardUrl(k)}">
            <span class="badge">${k.id}</span>
            <span class="title">${esc(k.title)}</span>
          </a>
        `).join('');
      }
      results.classList.add('open');
    };

    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('blur', () => setTimeout(() => results.classList.remove('open'), 150));
  }

  /* ── Daily deterministic hash ──────────────── */
  function cardOfTheDay() {
    const today = new Date().toISOString().slice(0, 10);
    let h = 0;
    for (let i = 0; i < today.length; i++) h = ((h << 5) - h + today.charCodeAt(i)) | 0;
    return cards[Math.abs(h) % cards.length];
  }

  /* ── Navigation ────────────────────────────── */
  function navigate(url, push = true) {
    if (push) history.pushState(null, '', url);
    route();
    window.scrollTo(0, 0);
  }

  function route() {
    const r = parseRoute(location.pathname);
    document.body.dataset.view = r.view;
    if (r.view === 'home') return renderHome();
    if (r.view === 'category') return renderCategory(r.catSlug);
    if (r.view === 'detail')   return renderDetail(r.catSlug, r.n);
  }

  /* ── Global Event Bindings ─────────────────── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('/hikmetler/')) return;
    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigate(href);
  });

  window.addEventListener('popstate', () => route());

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.key === 'Escape') e.target.blur();
      return;
    }

    if (e.key === '/') {
      const input = document.getElementById('hk-search-input');
      if (input) { e.preventDefault(); input.focus(); }
      return;
    }

    const r = parseRoute(location.pathname);
    if (r.view === 'detail') {
      const cat = catBySlug.get(r.catSlug);
      const list = cardsByCat.get(cat.id);
      const idx = list.findIndex(k => k.n === r.n);
      if (e.key === 'ArrowLeft' && idx > 0) {
        navigate(cardUrl(list[idx - 1]));
      } else if (e.key === 'ArrowRight' && idx < list.length - 1) {
        navigate(cardUrl(list[idx + 1]));
      } else if (e.key === 'Escape') {
        navigate(catUrl(cat));
      }
    }
  });

  /* ── Init ──────────────────────────────────── */
  route();
})();
