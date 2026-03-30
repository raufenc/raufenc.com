/* ============================================================
   Birlikte İyilik Akademi v1 — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ── Nav scroll ──
  var nav = document.getElementById('siteNav');
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);

    // Active nav link highlight
    highlightNav(y);
    lastScroll = y;
  }, { passive: true });

  // ── Hamburger ──
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('active');
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Active nav highlight ──
  var sections = document.querySelectorAll('section[id]');
  function highlightNav(scrollY) {
    var offset = scrollY + 90;
    sections.forEach(function (sec) {
      var top    = sec.offsetTop;
      var height = sec.offsetHeight;
      var id     = sec.getAttribute('id');
      var link   = document.querySelector('.nav-link[href="#' + id + '"]');
      if (link) {
        link.classList.toggle('active', offset >= top && offset < top + height);
      }
    });
  }

  // ── Fade-in observer ──
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var fadeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function (el) { fadeObs.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ── Articles render ──
  var grid          = document.getElementById('articlesGrid');
  var moreWrap      = document.getElementById('articlesMore');
  var showAllBtn    = document.getElementById('articlesShowAll');
  var ARTICLE_LIMIT = 6;
  var AC_EMOJIS     = ['🌙','📖','🌿','💛','📜','🏛️','🌸'];
  var AC_BG         = ['ac-bg-1','ac-bg-2','ac-bg-3','ac-bg-4','ac-bg-5','ac-bg-6','ac-bg-1'];

  function esc(str) {
    return String(str || '')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function renderArticles(limit) {
    if (!grid || typeof BIAKADEMI_YAZILAR === 'undefined') return;
    var all  = BIAKADEMI_YAZILAR.getAll();
    var show = limit ? all.slice(0, limit) : all;
    grid.innerHTML = '';

    show.forEach(function (yazi, i) {
      var delay = ((i % 3) * 0.08).toFixed(2) + 's';
      var card  = document.createElement('article');
      card.className = 'article-card fade-in';
      card.style.transitionDelay = delay;
      card.setAttribute('data-id', yazi.id);
      card.innerHTML =
        '<div class="article-card-thumb ' + (AC_BG[i % AC_BG.length]) + '">' +
          '<span style="font-size:2.8rem">' + (AC_EMOJIS[i % AC_EMOJIS.length]) + '</span>' +
        '</div>' +
        '<div class="article-card-body">' +
          '<div class="article-card-meta">' +
            '<span class="ac-cat">' + esc(yazi.kategori) + '</span>' +
            '<span class="ac-date">' + esc(yazi.tarihGosterim) + '</span>' +
          '</div>' +
          '<h3>' + esc(yazi.baslik) + '</h3>' +
          '<p>' + esc(yazi.ozet).substring(0, 110) + '…</p>' +
          '<span class="ac-read">Devamını oku →</span>' +
        '</div>';
      card.addEventListener('click', function () { openModal(parseInt(this.getAttribute('data-id'))); });
      grid.appendChild(card);
    });

    // Observe new cards
    grid.querySelectorAll('.fade-in').forEach(function (el) {
      if ('IntersectionObserver' in window && typeof fadeObs !== 'undefined') {
        fadeObs.observe(el);
      } else {
        el.classList.add('visible');
      }
    });

    if (moreWrap) {
      moreWrap.style.display = (limit && all.length > limit) ? 'block' : 'none';
      if (showAllBtn) showAllBtn.textContent = 'Tümünü Göster (' + all.length + ')';
    }
  }

  if (showAllBtn) {
    showAllBtn.addEventListener('click', function () {
      renderArticles(null);
    });
  }

  renderArticles(ARTICLE_LIMIT);

  // ── Modal ──
  var modal      = document.getElementById('articleModal');
  var overlay    = document.getElementById('modalOverlay');
  var closeBtn   = document.getElementById('modalClose');
  var modalTitle = document.getElementById('modalTitle');
  var modalCat   = document.getElementById('modalCat');
  var modalDate  = document.getElementById('modalDate');
  var modalBody  = document.getElementById('modalBody');

  function openModal(id) {
    if (!modal || typeof BIAKADEMI_YAZILAR === 'undefined') return;
    var yazi = BIAKADEMI_YAZILAR.getById(id);
    if (!yazi) return;
    modalTitle.textContent = yazi.baslik;
    modalCat.textContent   = yazi.kategori;
    modalDate.textContent  = yazi.tarihGosterim;
    modalBody.innerHTML    = yazi.icerik;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn)  closeBtn.addEventListener('click', closeModal);
  if (overlay)   overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ── Contact form → WhatsApp ──
  window.submitContactForm = function () {
    var name = document.getElementById('contactName').value.trim();
    var email = document.getElementById('contactEmail').value.trim();
    var msg   = document.getElementById('contactMsg').value.trim();
    if (!name || !msg) { alert('Lütfen adınızı ve mesajınızı doldurun.'); return; }
    var text = encodeURIComponent('Merhaba!\n\nAd: ' + name + '\nE-posta: ' + email + '\n\nMesaj:\n' + msg);
    window.open('https://wa.me/905348117757?text=' + text, '_blank');
  };

  // ── Video placeholder ──
  window.loadVideo = function (btn) {
    var url = 'https://www.youtube.com/@birlikteiyilik';
    window.open(url, '_blank');
  };
});
