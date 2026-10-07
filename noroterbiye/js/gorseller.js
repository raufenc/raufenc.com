/* NöroTerbiye — Görsel Keşif ortak modülü
   · Özel çizim çizgi ikonlar (24×24, emoji yok)
   · [data-gv-icon] hydrate, scroll-reveal, "diğer görseller" şeridi */
(function () {
  var I = {
    /* ── arayüz ── */
    'arrow-right': '<path d="M4 12h16M14 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5"/>',
    route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8.2 18H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.8"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    replay: '<path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4.5v4.6h4.6"/>',
    brain: '<path d="M9.5 4A3 3 0 0 0 6.6 6.1 3.2 3.2 0 0 0 4.2 9.6a3.3 3.3 0 0 0 1.2 3.9A3.3 3.3 0 0 0 7 17.6 3 3 0 0 0 12 19.4V6A2.2 2.2 0 0 0 9.5 4z"/><path d="M14.5 4a3 3 0 0 1 2.9 2.1 3.2 3.2 0 0 1 2.4 3.5 3.3 3.3 0 0 1-1.2 3.9 3.3 3.3 0 0 1-1.6 4.1 3 3 0 0 1-5-1.9V6A2.2 2.2 0 0 1 14.5 4z"/><path d="M12 9.5H9.3M12 13.5H9.6M12 11.5h3M12 15.5h2.5"/>',
    triangle: '<path d="M12 3.5L21.5 20h-19L12 3.5z"/><circle cx="12" cy="8.2" r="1.1" fill="currentColor" stroke="none"/><circle cx="6.6" cy="17.2" r="1.1" fill="currentColor" stroke="none"/><circle cx="17.4" cy="17.2" r="1.1" fill="currentColor" stroke="none"/>',
    loop: '<path d="M20 12a8 8 0 0 1-13.6 5.7M4 12a8 8 0 0 1 13.6-5.7"/><path d="M17.6 2.5v4h-4M6.4 21.5v-4h4"/>',
    bars: '<path d="M4 20v-7M10 20V5M16 20v-10M21 20H3"/>',
    microscope: '<path d="M8 21h10M10.5 17.5h5M9 3.5l4 1.5-2.2 6-4-1.5z"/><path d="M13 12.5a5 5 0 1 1-4.6 7"/>',

    /* ── ŞŞG ── */
    flame: '<path d="M12 2.5c1 3.2 5 5.4 5 10.5a5 5 0 0 1-10 0c0-2 .9-3.4 2.1-4.6.2 1.4.9 2.2 1.7 2.5C10.6 7.6 11 5 12 2.5z"/><path d="M12 18c1.3 0 2.1-.9 2.1-2 0-1-.8-1.7-2.1-3.1-1.3 1.4-2.1 2.1-2.1 3.1 0 1.1.8 2 2.1 2z"/>',
    crown: '<path d="M3.5 8l4.2 4 4.3-6.5 4.3 6.5 4.2-4-1.6 10.5H5.1L3.5 8z"/><path d="M5.5 21h13"/><circle cx="3.5" cy="7.6" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="20.5" cy="7.6" r="1" fill="currentColor" stroke="none"/>',
    bolt: '<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z"/>',
    burger: '<path d="M4.5 10.5a7.5 5.5 0 0 1 15 0z"/><path d="M3.5 13.5h17"/><path d="M4 16.2c1.6 1.3 3.2 1.3 4.8 0 1.6 1.3 3.2 1.3 4.8 0 1.6 1.3 3.2 1.3 4.8 0"/><path d="M5 18.7h14a1.5 1.5 0 0 1-1.5 2h-11A1.5 1.5 0 0 1 5 18.7z"/><path d="M9 7.6h.01M12.4 6.6h.01M15.4 8h.01"/>',
    candy: '<circle cx="12" cy="12" r="4.5"/><path d="M7.6 10.3L3 7.5v9l4.6-2.8M16.4 10.3L21 7.5v9l-4.6-2.8M10 9.6l4 4.8"/>',
    gamepad: '<path d="M7 8h10a5 5 0 0 1 4.8 6.4l-.6 2.2a2.5 2.5 0 0 1-4.2 1L15 15.5H9l-2 2.1a2.5 2.5 0 0 1-4.2-1l-.6-2.2A5 5 0 0 1 7 8z"/><path d="M8.5 10.5v3M7 12h3M15.5 11.5h.01M17.5 13.5h.01"/>',
    cart: '<path d="M3 4h2.5l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2"/><circle cx="9.7" cy="19.4" r="1.3"/><circle cx="17" cy="19.4" r="1.3"/>',
    tv: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M8 21.5h8M12 18v3.5M9 2.8l3 2.7 3-2.7"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.6" cy="8.6" r="1" fill="currentColor" stroke="none"/><circle cx="15.4" cy="8.6" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="8.6" cy="15.4" r="1" fill="currentColor" stroke="none"/><circle cx="15.4" cy="15.4" r="1" fill="currentColor" stroke="none"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18.5h3M10 5.5h4"/>',
    heart: '<path d="M12 20.5s-8-4.8-8-10.4A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 8 2.5c0 5.6-8 10.4-8 10.4z"/>',
    hanger: '<path d="M12 9V7.6a2.3 2.3 0 1 0-2.3-2.3"/><path d="M12 9L3.2 15.8A1.2 1.2 0 0 0 4 18h16a1.2 1.2 0 0 0 .8-2.2L12 9z"/>',
    camera: '<path d="M4 8h3l1.6-2.5h6.8L17 8h3a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 8z"/><circle cx="12" cy="13.5" r="3.6"/>',
    trophy: '<path d="M8 4h8v6a4 4 0 0 1-8 0V4z"/><path d="M8 6H4.5a.5.5 0 0 0-.5.5C4 9 5.5 10.5 8 10.5M16 6h3.5a.5.5 0 0 1 .5.5c0 2.5-1.5 4-4 4M12 14v3.5M8.5 20.5h7M9.5 17.5h5"/>',
    gem: '<path d="M6.5 4h11l4 5.2L12 21 2.5 9.2l4-5.2z"/><path d="M2.5 9.2h19M9 4l-1.5 5.2L12 21l4.5-11.8L15 4"/>',
    chat: '<path d="M4 5h16a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 17h-8l-5 4v-4H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 5z"/><path d="M12 8.2v3.2M12 13.7h.01"/>',
    news: '<rect x="3.5" y="4" width="14" height="16" rx="2"/><path d="M17.5 9H20a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2h-1.5M7 8h7M7 12h7M7 16h4"/>',
    flag: '<path d="M5 21V4M5 4h13l-2.5 4.2L18 12.5H5"/>',
    megaphone: '<path d="M3.5 10v4a1 1 0 0 0 1 1H7l9 4.5V4.5L7 9H4.5a1 1 0 0 0-1 1z"/><path d="M19.5 9.5a4 4 0 0 1 0 5M7.5 15l1.2 5h2.4L10 16.5"/>',
    car: '<path d="M4.5 12.5l1.6-4.4A2 2 0 0 1 8 6.8h8a2 2 0 0 1 1.9 1.3l1.6 4.4"/><path d="M3 12.5h18a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3.5a1 1 0 0 1 1-1z"/><circle cx="7" cy="15.2" r=".9" fill="currentColor" stroke="none"/><circle cx="17" cy="15.2" r=".9" fill="currentColor" stroke="none"/><path d="M5 18v2M19 18v2"/>',
    chats: '<path d="M3 6.5A2 2 0 0 1 5 4.5h8a2 2 0 0 1 2 2V10a2 2 0 0 1-2 2H8l-3 2.5V12H5a2 2 0 0 1-2-2V6.5z"/><path d="M17.5 9H19a2 2 0 0 1 2 2v3.5a2 2 0 0 1-2 2h-.2v2.5l-3-2.5H12a2 2 0 0 1-1.7-1"/>',

    /* ── Alışkanlık döngüsü ── */
    bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15L6 16.5z"/><path d="M10 21a2 2 0 0 0 4 0M12 3v2"/>',
    magnet: '<path d="M5 3h5v8a2 2 0 0 0 4 0V3h5v8a7 7 0 0 1-14 0V3z"/><path d="M5 7h5M14 7h5"/>',
    action: '<circle cx="12" cy="12" r="9"/><path d="M10 8.3l5.6 3.7-5.6 3.7z"/>',
    gift: '<path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9z"/><path d="M3 7.5h18V11H3zM12 7.5V21"/><path d="M12 7.5C10 7.5 7.5 6.5 7.5 5S9 3 10.5 3.8 12 7.5 12 7.5zM12 7.5c2 0 4.5-1 4.5-2.5S15 3 13.5 3.8 12 7.5 12 7.5z"/>',
    snack: '<rect x="5" y="3.5" width="14" height="17" rx="2.2"/><path d="M5 9.2h14M5 14.8h14M12 3.5v17"/>',

    /* ── Dopamin ── */
    walk: '<circle cx="13.5" cy="4.5" r="1.8"/><path d="M13 7.2L12 13M12 13l-3 6.5M12 13l3.5 2.5-.5 4.5M13 8.8l3 2.4M13 8.8l-3 2.4"/>',
    meal: '<path d="M6 3v6a3 3 0 0 0 6 0V3M9 3v18"/><path d="M17.5 21V3c-2.4 1.2-3.5 4-3.5 7.5 0 1.7 1 2.5 2.3 2.8h1.2"/>',
    cigarette: '<rect x="2.5" y="14" width="13" height="3.6" rx=".8"/><path d="M6.5 14v3.6M17.5 14H20v3.6h-2.5zM18 11c0-1.5 2-1.5 2-3s-2-1.5-2-3M21.5 11c0-1.2 1.5-1.2 1.5-2.4"/>',
    beer: '<path d="M5 6.5h10V19a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 19V6.5z"/><path d="M15 9h2.5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H15M8.5 10v7M11.5 10v7M5 6.5C5 4.9 6.2 4 7.5 4c.8 0 1.2.4 2.5.4s1.7-.4 2.5-.4C13.8 4 15 4.9 15 6.5"/>',
    flask: '<path d="M9.5 3h5M10.5 3v6L5 18.5A1.8 1.8 0 0 0 6.6 21h10.8a1.8 1.8 0 0 0 1.6-2.5L13.5 9V3M7.8 15h8.4"/>',
    pill: '<g transform="rotate(-45 12 12)"><rect x="2.5" y="8" width="19" height="8" rx="4"/><path d="M12 8v8"/></g>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
    timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4.2l2.8 1.7M9.5 3h5"/>',
    leaf: '<path d="M20 4C10 4 4.5 8.5 4.5 14.5c0 2.6 1.6 5 4.5 5 6 0 11-5.5 11-15.5z"/><path d="M4.5 21c1.5-4.6 5-8.6 10-11"/>',
    receptor: '<circle cx="12" cy="12" r="3.2"/><path d="M12 3v5.8M12 15.2V21M3 12h5.8M15.2 12H21"/>',

    /* ── Beyin bölgeleri ── */
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.8 8.2l-2 5.6-5.6 2 2-5.6 5.6-2z"/>',
    siren: '<path d="M6.5 17.5V13a5.5 5.5 0 0 1 11 0v4.5"/><path d="M4.5 20.5h15v-3h-15zM12 3v2M4.2 6.2l1.5 1.4M19.8 6.2l-1.5 1.4M3 12h2M19 12h2"/>',
    sparkle: '<path d="M12 3l1.8 5.4 5.4 1.8-5.4 1.8L12 17.4l-1.8-5.4-5.4-1.8 5.4-1.8L12 3z"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/>',
    bookmark: '<path d="M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4.2L5.5 21V4.5a1 1 0 0 1 1-1z"/>',
    droplet: '<path d="M12 3C9 7.5 6 10.6 6 14.5a6 6 0 0 0 12 0C18 10.6 15 7.5 12 3z"/><path d="M9.5 15a2.6 2.6 0 0 0 2.5 2.6"/>'
  };

  var NS = 'http://www.w3.org/2000/svg';

  function icon(name, size, cls) {
    var s = size || 24;
    return '<svg class="gv-ic' + (cls ? ' ' + cls : '') + '" width="' + s + '" height="' + s +
      '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (I[name] || '') + '</svg>';
  }

  /* [data-gv-icon="flame"] → ikonu içine basar.
     <svg> (diyagram içi, x/y/width/height ile) ya da herhangi bir HTML elemanı (data-size) */
  function hydrate(root) {
    (root || document).querySelectorAll('[data-gv-icon]').forEach(function (el) {
      var name = el.getAttribute('data-gv-icon');
      if (!I[name] || el.getAttribute('data-gv-done')) return;
      el.setAttribute('data-gv-done', '1');
      if (el.namespaceURI === NS) {
        el.setAttribute('viewBox', '0 0 24 24');
        el.classList.add('gv-ic');
        el.innerHTML = I[name];
      } else {
        el.innerHTML = icon(name, +el.getAttribute('data-size') || 22);
      }
    });
  }

  /* scroll-reveal */
  function reveal() {
    var els = document.querySelectorAll('.gv-reveal');
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  var PAGES = [
    { key: 'beyin-haritasi', icon: 'brain', title: 'Beyin Haritası', desc: 'Her bölge bir hikâye anlatır.', c: '#06b6d4' },
    { key: 'ssg-ucgeni', icon: 'triangle', title: 'ŞŞG Üçgeni', desc: 'Şehvet, Şöhret, Gadab.', c: '#a855f7' },
    { key: 'aliskanlik-dongusu', icon: 'loop', title: 'Alışkanlık Döngüsü', desc: 'Tetik → İstek → Davranış → Ödül.', c: '#f59e0b' },
    { key: 'dopamin-yolu', icon: 'bars', title: 'Dopamin Yolu', desc: 'Doğal ve yapay ödül dengesi.', c: '#10b981' }
  ];

  function moreNav(current, mount) {
    var el = mount || document.getElementById('gvMore');
    if (!el) return;
    var items = PAGES.filter(function (p) { return p.key !== current; });
    el.innerHTML =
      '<div class="gv-more-head"><span class="gv-eyebrow">Keşfetmeye devam et</span></div>' +
      '<div class="gv-more-grid">' + items.map(function (p) {
        return '<a class="gv-more-card" style="--c:' + p.c + '" href="/noroterbiye/gorseller/' + p.key + '/">' +
          '<span class="gv-more-ic">' + icon(p.icon, 24) + '</span>' +
          '<span class="gv-more-tx"><b>' + p.title + '</b><small>' + p.desc + '</small></span>' +
          '<span class="gv-more-go">' + icon('arrow-right', 18) + '</span></a>';
      }).join('') + '</div>' +
      '<a class="gv-more-back" href="/noroterbiye/#gorsel-kesif">' + icon('arrow-left', 16) + ' Tüm görseller</a>';
  }

  window.GV = { icon: icon, glyphs: I, hydrate: hydrate, reveal: reveal, moreNav: moreNav, pages: PAGES };
})();
