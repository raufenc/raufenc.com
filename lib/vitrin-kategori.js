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

  // Sayfa başlığı
  document.title = kategori.name + ' — Rauf Enç';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = kategori.desc;
  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = 'https://raufenc.com/vitrin/' + slug + '/';

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

  // ── KART RENDERLAYICI ──
  var TAG_BG = {
    'Uygulama': 'rgba(99,102,241,0.1)',
    'Ansiklopedi': 'rgba(168,85,247,0.1)',
    'Oyun': 'rgba(16,185,129,0.1)',
    'Sunum': 'rgba(236,72,153,0.1)',
    'Rehber': 'rgba(139,92,246,0.1)'
  };
  function tagClass(tag) {
    var map = {
      'Oyun': 'tag-oyun', 'Uygulama': 'tag-uygulama',
      'Yarışma': 'tag-yarışma', 'Alıştırma': 'tag-alıştırma',
      'Sunum': 'tag-sunum', 'Yazı': 'tag-yazı',
      'Ansiklopedi': 'tag-ansiklopedi',
      'Rehber': 'tag-rehber'
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
      '<div class="card-icon-wrap" style="background:' + (TAG_BG[p.tag] || 'var(--surface2)') + '">' + p.emoji + '</div>' +
      '<div class="card-title">' + p.title + '</div>' +
      '<div class="card-desc">' + p.desc + '</div>' +
      '<div class="card-footer">' +
        '<span class="card-tag ' + tagClass(p.tag) + '">' + p.tag + '</span>' +
        '<svg class="card-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
          '<path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>' +
        '</svg>' +
      '</div>';
    return a;
  }

  var grid = document.getElementById('kategori-grid');
  if (grid) {
    projeler.forEach(function(p, i) { grid.appendChild(createCard(p, i)); });
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
