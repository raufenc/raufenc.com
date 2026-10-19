/* Kur'an Öğretmenim — giriş sitesi betiği */
(function () {
  'use strict';

  /* ── Tema ── */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('ko-theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) { /* depolama kapalı olabilir */ }

  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ko-theme', next); } catch (e) { /* yok say */ }
    });
  }

  /* ── Mobil menü ── */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ── Elifba: dokun ve dinle ──
     Sesler uygulamanın kendi kayıtlarıdır. Uygulama ile aynı alan adına
     taşındığında SES_KOKU değeri "/assets/assets/sounds/harfler/" olur. */
  var SES_KOKU = './app/assets/assets/sounds/harfler/';
  var HARFLER = [
    ['ا', 'Elif', 'elif'], ['ب', 'Be', 'be'], ['ت', 'Te', 'te'], ['ث', 'Se', 'se'],
    ['ج', 'Cim', 'cim'], ['ح', 'Ha', 'ha'], ['خ', 'Hı', 'haaa'], ['د', 'Dal', 'dal'],
    ['ذ', 'Zel', 'zalp'], ['ر', 'Ra', 'ra'], ['ز', 'Ze', 'ze'], ['س', 'Sin', 'sin'],
    ['ش', 'Şın', null], ['ص', 'Sad', 'sadd'], ['ض', 'Dad', 'dadd'], ['ط', 'Tı', null],
    ['ظ', 'Zı', null], ['ع', 'Ayn', 'ayn'], ['غ', 'Gayn', null], ['ف', 'Fe', 'fe'],
    ['ق', 'Kaf', 'kaf'], ['ك', 'Kef', 'kef'], ['ل', 'Lam', 'lam'], ['م', 'Mim', 'mim'],
    ['ن', 'Nun', 'nun'], ['هـ', 'He', 'he'], ['و', 'Vav', 'vav'], ['ي', 'Ye', 'ye'],
    ['لا', 'Lamelif', 'lamelif']
  ];
  var grid = document.getElementById('elifba');
  var durum = document.getElementById('elifbaDurum');
  var player = null;
  var current = null;

  function sesCal(btn, dosya) {
    if (!player) { player = new Audio(); player.preload = 'none'; }
    if (current) current.classList.remove('playing');
    current = btn; btn.classList.add('playing');
    player.pause();
    player.src = SES_KOKU + encodeURIComponent(dosya) + '.mp3';
    var p = player.play();
    if (p && p.catch) {
      p.catch(function () {
        btn.classList.remove('playing');
        if (durum) durum.textContent = 'Ses çalınamadı. Lütfen tekrar dokunun; bağlantınız kesilmiş olabilir.';
      });
    }
    player.onended = function () { btn.classList.remove('playing'); };
    player.onerror = function () {
      btn.classList.remove('playing');
      if (durum) durum.textContent = 'Bu harfin sesi şu an yüklenemedi.';
    };
  }

  if (grid) {
    var frag = document.createDocumentFragment();
    HARFLER.forEach(function (h) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'harf';
      b.setAttribute('aria-label', h[1] + ' harfini dinle');
      b.innerHTML = '<span class="ar" aria-hidden="true">' + h[0] + '</span><small>' + h[1] + '</small>';
      if (!h[2]) b.classList.add('sessiz');
      b.addEventListener('click', function () {
        if (!h[2]) {
          if (durum) durum.textContent = h[1] + ' harfinin ses kaydı uygulamada hazırlanıyor; diğer harfleri dinleyebilirsiniz.';
          return;
        }
        if (durum) durum.textContent = h[1] + ' harfi çalınıyor.';
        sesCal(b, h[2]);
      });
      frag.appendChild(b);
    });
    grid.appendChild(frag);
  }

  /* ── Video: bölüm düğmeleri ── */
  var video = document.getElementById('tanitimVideo');
  var heroVideo = document.getElementById('heroVideo');
  document.querySelectorAll('[data-seek]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!video) return;
      video.currentTime = parseFloat(btn.getAttribute('data-seek')) || 0;
      video.muted = false;
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* kullanıcı etkileşimi bekleniyor */ });
    });
  });
  // Sessiz giriş videosu görünür değilken durur (pil ve veri için)
  if ('IntersectionObserver' in window) {
    [heroVideo, video].forEach(function (v) {
      if (!v) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { if (v.autoplay || v === heroVideo) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
          else { v.pause(); }
        });
      }, { threshold: 0.25 });
      io.observe(v);
    });
  }

  /* ── Belirme ── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(function (el) { el.classList.add('pending'); });
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('pending'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
    // Emniyet: 2,5 sn sonra hepsi görünür olsun
    setTimeout(function () { revealEls.forEach(function (el) { el.classList.remove('pending'); }); }, 2500);
  }

  /* ── Yıl ── */
  var yil = document.getElementById('yil');
  if (yil) yil.textContent = String(new Date().getFullYear());
})();
