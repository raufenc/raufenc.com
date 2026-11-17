/**
 * Vitrin kategori sayfası dinamik render
 * URL: /vitrin/[slug]/  →  pathname'den slug çıkar, PROJELER'den filtrele, sayfayı doldur.
 */
(function() {
  'use strict';

  // Slug'ı URL path'inden çıkar
  function getSlug() {
    var parts = location.pathname.replace(/\/+$/, '').split('/');
    return parts[parts.length - 1] || '';
  }

  var slug = getSlug();
  var kategori = (KATEGORILER || []).find(function(k) { return k.slug === slug; });
  if (!kategori) {
    document.body.innerHTML = '<div style="padding:80px 24px;text-align:center;color:var(--muted2);">Kategori bulunamadı. <a href="/#vitrin" style="color:var(--warm);">Vitrine dön</a></div>';
    return;
  }

  // <title>, açıklama, canonical ve OG etiketleri sayfada statik
  // (scripts/vitrin-meta.mjs üretir); burada yeniden yazılmaz.
  var projeler = kategoriProjeleri(slug);

  // Hero
  var heroLabel = document.getElementById('kategori-label');
  var heroTitle = document.getElementById('kategori-title');
  var heroDesc  = document.getElementById('kategori-desc');
  var heroCount = document.getElementById('kategori-count');
  if (heroLabel) heroLabel.textContent = 'Vitrin · Kategori';
  if (heroTitle) heroTitle.textContent = kategori.name;
  if (heroDesc)  heroDesc.textContent  = kategori.desc;
  if (heroCount) heroCount.textContent = projeler.length + ' proje';

  // Theme accent
  document.body.classList.add('kat-' + slug);

  // ── KART GÖRÜNÜMÜ ──
  // Ana sayfadaki proje kartlarıyla aynı düzen; yedi kategori sayfası tek yerden beslenir.
  (function() {
    var st = document.createElement('style');
    st.textContent = [
      '#kategori-grid .card{padding:14px 14px 18px;gap:9px;border-radius:18px}',
      '#kategori-grid .card:hover{border-color:rgba(200,164,110,.6);box-shadow:0 2px 4px rgba(0,0,0,.2),0 14px 36px var(--warm-glow,rgba(200,164,110,.2)),0 28px 64px rgba(0,0,0,.25)}',
      'html.light #kategori-grid .card:hover{border-color:rgba(125,95,42,.55);box-shadow:0 2px 4px rgba(0,0,0,.05),0 14px 36px rgba(0,0,0,.08),0 28px 64px rgba(0,0,0,.08)}',
      '#kategori-grid .card-glow{background:radial-gradient(280px circle at var(--px,30%) var(--py,20%),var(--warm-soft,rgba(200,164,110,.1)),transparent 65%)}',
      '#kategori-grid .card-ust{display:flex;align-items:center;margin-top:3px}',
      "#kategori-grid .card-title{font-family:var(--font-display,'Fraunces',Georgia,serif);font-size:18px;font-weight:600;line-height:1.22;letter-spacing:-.01em}",
      '#kategori-grid .card-desc{flex:0 1 auto;line-height:1.6;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}',
      '#kategori-grid .card-footer{margin-top:auto;padding-top:6px;font-size:12px;font-weight:600;letter-spacing:.02em;color:var(--muted2);transition:color .2s}',
      '#kategori-grid .card:hover .card-footer,#kategori-grid .card:hover .card-arrow{color:var(--warm)}',
      '#kategori-grid .card-arrow{color:var(--muted2)}',
      '#kategori-grid .card-kapak{position:relative;flex:none;aspect-ratio:16/9;border-radius:11px;overflow:hidden;border:1px solid var(--border);margin-bottom:4px;padding:14px 16px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;background:radial-gradient(120% 95% at 0% 100%,rgba(200,164,110,.34),transparent 58%),radial-gradient(95% 85% at 100% 0%,rgba(99,102,241,.26),transparent 60%),#0c0c14}',
      "#kategori-grid .card-kapak::after{content:'';position:absolute;right:-34px;bottom:-34px;width:150px;height:150px;border-radius:50%;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 0 22px rgba(255,255,255,.025),0 0 0 46px rgba(255,255,255,.018)}",
      "#kategori-grid .card-kapak-ust{font:700 9.5px/1 var(--font-sans,'Inter',system-ui,sans-serif);letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.62)}",
      "#kategori-grid .card-kapak-ad{position:relative;z-index:1;font-family:var(--font-display,'Fraunces',Georgia,serif);font-size:clamp(20px,2.1vw,25px);font-weight:600;line-height:1.08;letter-spacing:-.01em;max-width:82%}",
      '.tag-koleksiyon{background:rgba(6,182,212,.12);color:#22d3ee}.tag-şiir{background:rgba(200,164,110,.14);color:#e0c08a}',
      'html.light .tag-koleksiyon{color:#0e7490}html.light .tag-şiir{color:#7d5f2a}',
      '@media (max-width:560px){#kategori-grid .card-title{font-size:17px}#kategori-grid .card-kapak-ad{font-size:20px}}'
    ].join('');
    document.head.appendChild(st);
  })();
  function tagClass(tag) {
    var map = {
      'Oyun': 'tag-oyun', 'Uygulama': 'tag-uygulama',
      'Yarışma': 'tag-yarışma', 'Alıştırma': 'tag-alıştırma',
      'Sunum': 'tag-sunum', 'Yazı': 'tag-yazı',
      'Ansiklopedi': 'tag-ansiklopedi',
      'Rehber': 'tag-rehber',
      'Koleksiyon': 'tag-koleksiyon', 'Şiir': 'tag-şiir'
    };
    return map[tag] || 'tag-varsayılan';
  }

  function createCard(p, i) {
    var a = document.createElement('a');
    a.className = 'card';
    a.href = p.href;
    if (p.external) { a.target = '_blank'; a.rel = 'noopener'; }
    a.style.animationDelay = (i * 50) + 'ms';
    a.innerHTML =
      '<div class="card-glow"></div>' +
      (p.video ? '' :
        '<div class="card-kapak" aria-hidden="true">' +
          '<span class="card-kapak-ust">' + p.tag + '</span>' +
          '<span class="card-kapak-ad">' + p.title + '</span>' +
        '</div>') +
      '<div class="card-ust"><span class="card-tag ' + tagClass(p.tag) + '">' + p.tag + '</span></div>' +
      '<div class="card-title">' + p.title + '</div>' +
      '<div class="card-desc">' + p.desc + '</div>' +
      '<div class="card-footer">' +
        '<span>' + (p.external ? 'Siteye git' : 'İncele') + '</span>' +
        '<svg class="card-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
          '<path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>' +
        '</svg>' +
      '</div>';
    return a;
  }

  var grid = document.getElementById('kategori-grid');
  if (grid) {
    var hucreler = projeler.map(function(p, i) {
      var cell = document.createElement('div');
      cell.className = 'card-cell';
      cell.style.cssText = 'display:flex;flex-direction:column;min-width:0;position:relative';
      var card = createCard(p, i);
      card.style.flex = '1';
      cell.appendChild(card);
      grid.appendChild(cell);
      return { cell: cell, card: card, p: p };
    });
    // Tanıtım videoları: kart üstüne önizleme + oynat düğmesi (modül gerektiğinde yüklenir)
    var videolu = projeler.filter(function(p) { return p.video; });
    if (videolu.length) {
      var ekle = function() {
        hucreler.forEach(function(h) { if (h.p.video) VideoTanitim.kartaEkle(h.cell, h.card, h.p, videolu); });
      };
      if (window.VideoTanitim) ekle();
      else {
        var s = document.createElement('script');
        s.src = '/lib/video-tanitim.js?v=20261019';
        s.onload = ekle;
        document.head.appendChild(s);
      }
    }
  }

  // ── DİĞER KATEGORİLER (alt linkler) ──
  var others = document.getElementById('diger-kategoriler');
  if (others) {
    KATEGORILER.filter(function(k) {
      return k.slug !== slug && k.slug !== 'noroterbiye';
    }).forEach(function(k) {
      var a = document.createElement('a');
      a.href = '/vitrin/' + k.slug + '/';
      a.className = 'diger-kat';
      a.innerHTML = '<span class="diger-kat-name">' + k.name + '</span>';
      others.appendChild(a);
    });
  }
})();
