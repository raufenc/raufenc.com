/* ============================================================
   Google Analytics 4 (GA4)
   ============================================================ */
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-GCXS5700TP';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-GCXS5700TP');
})();

/* ============================================================
   Rauf Enç — Tema Yöneticisi
   Dark/Light tema toggle + localStorage persistence.
   ============================================================ */
(function () {
  var STORAGE_KEY = 'rauf-theme';

  function getPreferred() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  }

  function apply(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem(STORAGE_KEY, theme);
    // Toggle buton ikonunu güncelle
    updateIcon(theme);
    // Event dispatch et (canvas'lar vs dinleyebilsin)
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: theme } }));
  }

  function toggle() {
    var current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    apply(current === 'light' ? 'dark' : 'light');
  }

  function updateIcon(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // Güneş (light modda göster → dark'a geçmek için)
    // Ay (dark modda göster → light'a geçmek için)
    btn.innerHTML = theme === 'light'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    btn.setAttribute('aria-label', theme === 'light' ? 'Gece moduna geç' : 'Gündüz moduna geç');
  }

  // Sayfa yüklenmeden önce uygula (flash önleme)
  apply(getPreferred());

  // Global API
  window.RaufTheme = {
    toggle: toggle,
    get: function () { return document.documentElement.classList.contains('light') ? 'light' : 'dark'; },
    set: apply
  };
})();

/* ============================================================
   GA4 Event Tracking — CTA, arama, dış link, form
   ============================================================ */
(function() {
  function trackEvent(action, category, label) {
    if (window.gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href') || '';

    // Dış linkler
    if (href.indexOf('http') === 0 && href.indexOf('raufenc.com') === -1) {
      trackEvent('click', 'outbound', href);
    }

    // Satın alma linkleri
    if (href.indexOf('ktbkitap') !== -1 || href.indexOf('kitapyurdu') !== -1 ||
        href.indexOf('trendyol') !== -1 || href.indexOf('hepsiburada') !== -1) {
      trackEvent('click', 'purchase', href);
    }

    // CTA butonları
    if (link.classList.contains('btn-warm') || link.classList.contains('nt-btn-primary')) {
      trackEvent('click', 'cta', link.textContent.trim());
    }

    // Proje kartları
    if (link.classList.contains('card') || link.classList.contains('featured-card')) {
      trackEvent('click', 'project', link.querySelector('.card-title,.featured-title')
        ? link.querySelector('.card-title,.featured-title').textContent : href);
    }
  });

  // Form gönderimi
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (form.classList.contains('contact-form')) {
      trackEvent('submit', 'contact_form', 'iletisim');
    }
  });

  // Arama kullanımı (debounced)
  var searchTimeout;
  document.addEventListener('input', function(e) {
    if (e.target.id === 'search') {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function() {
        if (e.target.value.length >= 3) {
          trackEvent('search', 'project_search', e.target.value);
        }
      }, 1000);
    }
  });
})();
