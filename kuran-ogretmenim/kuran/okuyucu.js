/* Kur'ân-ı Kerîm okuyucu — âyet âyet sesli okuma, meâl seçimi, tekrar, kaldığı yer */
(function () {
  'use strict';
  var kok = document.getElementById('ayetler');
  if (!kok) return;
  var SURE = parseInt(kok.getAttribute('data-sure'), 10);
  var ID = kok.getAttribute('data-id');
  var ADET = parseInt(kok.getAttribute('data-ayet'), 10);
  var SURE_AD = document.querySelector('.sure-bas h1').textContent.trim();
  var SES_KOK = 'https://everyayah.com/data/';
  var ayetler = Array.prototype.slice.call(kok.querySelectorAll('.ayet'));
  var besmele = document.querySelector('.besmele');
  var calar = document.getElementById('calar');
  var oynatBtn = document.getElementById('oynat');
  var calanAyet = document.getElementById('calanAyet');
  var calanDurum = document.getElementById('calanDurum');
  var kariSec = document.getElementById('kari');
  var mealSec = document.getElementById('mealSec');
  var tekrarSec = document.getElementById('tekrar');
  var hizSec = document.getElementById('hiz');
  var sureSec = document.getElementById('sureSec');
  var azalt = navigator.userAgent && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function oku(k, v) { try { var x = localStorage.getItem('ko.' + k); return x === null ? v : x; } catch (e) { return v; } }
  function yaz(k, v) { try { localStorage.setItem('ko.' + k, v); } catch (e) {} }
  function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }
  function sesUrl(sure, ayet) { return SES_KOK + kariSec.value + '/' + pad(sure, 3) + pad(ayet, 3) + '.mp3'; }

  /* ── ayarlar ── */
  var BOYUTLAR = [1.5, 1.8, 2.1, 2.4, 2.8, 3.2, 3.6];
  var boyutI = parseInt(oku('boyut', '-1'), 10);
  function boyutUygula() {
    if (boyutI >= 0) kok.style.setProperty('--ar-boyut', BOYUTLAR[boyutI] + 'rem');
    else kok.style.removeProperty('--ar-boyut');
  }
  function boyutDegis(d) {
    if (boyutI < 0) { var mevcut = parseFloat(getComputedStyle(kok).getPropertyValue('--ar-boyut')) || 2.1; boyutI = 0; for (var i = 0; i < BOYUTLAR.length; i++) if (Math.abs(BOYUTLAR[i] - mevcut) < .16) boyutI = i; }
    boyutI = Math.max(0, Math.min(BOYUTLAR.length - 1, boyutI + d));
    yaz('boyut', boyutI); boyutUygula();
  }
  document.getElementById('kucult').addEventListener('click', function () { boyutDegis(-1); });
  document.getElementById('buyut').addEventListener('click', function () { boyutDegis(1); });
  boyutUygula();

  function secimYukle(sel, k) { var v = oku(k, ''); if (v && sel.querySelector('option[value="' + v + '"]')) sel.value = v; sel.addEventListener('change', function () { yaz(k, sel.value); }); }
  secimYukle(kariSec, 'kari'); secimYukle(tekrarSec, 'tekrar'); secimYukle(hizSec, 'hiz'); secimYukle(mealSec, 'meal');

  /* ── meâl ── */
  var veri = null, veriIstek = null;
  function veriAl() {
    if (veri) return Promise.resolve(veri);
    if (!veriIstek) veriIstek = fetch('../veri/' + ID + '.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) { veri = d; return d; });
    return veriIstek;
  }
  function mealUygula() {
    var m = mealSec.value;
    kok.classList.toggle('mealsiz', m === 'yok');
    if (m === 'yok') return;
    veriAl().then(function (d) {
      var map = {}; d.ayetler.forEach(function (a) { map[a.no] = a; });
      ayetler.forEach(function (el) { var a = map[el.getAttribute('data-no')]; if (a && a[m]) el.querySelector('.meal').textContent = a[m]; });
    }).catch(function () { /* çevrimdışı: sayfadaki meâl kalır */ });
  }
  mealSec.addEventListener('change', mealUygula);
  if (mealSec.value !== 'di') mealUygula();

  sureSec.addEventListener('change', function () { if (sureSec.value && sureSec.value !== ID) location.href = '../' + sureSec.value + '/'; });

  /* ── çalıcı ── */
  var ses = new Audio();
  ses.preload = 'auto';
  var simdiki = 0;          // 0 = besmele, 1..ADET = âyet
  var kalanTekrar = 0;
  var aktif = false;        // sıralı okuma sürüyor mu
  var simdikiUrl = '';

  function hiz() { var h = parseFloat(hizSec.value); return isFinite(h) ? h : 1; }
  function durum(t) { calanDurum.textContent = t; }
  function etiket(n) { return n === 0 ? 'Besmele-i şerîfe' : SURE_AD + ' · ' + n + '. âyet'; }

  function vurgula(n) {
    ayetler.forEach(function (el) { el.classList.toggle('calan', parseInt(el.getAttribute('data-no'), 10) === n); });
    if (besmele) besmele.classList.toggle('calan', n === 0);
    var el = n === 0 ? besmele : ayetler[n - 1];
    if (el) {
      var r = el.getBoundingClientRect();
      var ust = 140, alt = window.innerHeight - 130;
      if (r.top < ust || r.bottom > alt) {
        var y = window.scrollY + r.top - Math.max(ust, (window.innerHeight - r.height) / 2);
        window.scrollTo({ top: y, behavior: azalt ? 'auto' : 'smooth' });
      }
    }
    calanAyet.textContent = etiket(n);
  }

  var onYukleyici = null;
  function onYukle(n) {
    if (n < 1 || n > ADET) return;
    try { onYukleyici = new Audio(); onYukleyici.preload = 'auto'; onYukleyici.src = sesUrl(SURE, n); } catch (e) {}
  }

  function cal(n, tekrarSifirla) {
    if (n > ADET) { bitir(); return; }
    if (n < 0) n = 0;
    if (n === 0 && (!besmele || SURE === 1)) n = 1;
    simdiki = n;
    if (tekrarSifirla !== false) kalanTekrar = parseInt(tekrarSec.value, 10) || 1;
    aktif = true;
    var url = n === 0 ? sesUrl(1, 1) : sesUrl(SURE, n);
    if (simdikiUrl !== url) { simdikiUrl = url; ses.src = url; }
    else ses.currentTime = 0;
    ses.playbackRate = hiz();
    calar.hidden = false; document.body.classList.add('calar-acik');
    vurgula(n);
    durum('Yükleniyor…');
    var p = ses.play();
    if (p && p.catch) p.catch(function () { durum('Dinlemek için oynat düğmesine basın'); calar.classList.remove('oynuyor'); });
    if (n >= 1) { yaz('son.' + ID, n); yaz('sonSure', ID + '|' + n + '|' + SURE_AD); }
    onYukle(n + 1);
  }

  function bitir() {
    aktif = false; ses.pause();
    calar.classList.remove('oynuyor');
    durum('Sûre tamamlandı');
    ayetler.forEach(function (el) { el.classList.remove('calan'); });
    if (besmele) besmele.classList.remove('calan');
    var son = document.querySelector('.ders-nav a:last-child');
    if (son && /→/.test(son.textContent)) { durum('Sûre tamamlandı · sonraki: ' + son.textContent.replace('→', '').trim()); }
  }

  ses.addEventListener('playing', function () { calar.classList.add('oynuyor'); durum('Okunuyor' + (kalanTekrar > 1 ? ' · ' + kalanTekrar + ' tekrar kaldı' : '')); });
  ses.addEventListener('pause', function () { if (!ses.ended) { calar.classList.remove('oynuyor'); if (aktif) durum('Duraklatıldı'); } });
  ses.addEventListener('waiting', function () { durum('Yükleniyor…'); });
  ses.addEventListener('ended', function () {
    if (!aktif) return;
    if (kalanTekrar > 1) { kalanTekrar--; ses.currentTime = 0; ses.play(); return; }
    cal(simdiki + 1);
  });
  ses.addEventListener('error', function () {
    calar.classList.remove('oynuyor'); aktif = false;
    durum(navigator.onLine === false ? 'Çevrimdışısınız; sesli okuma için bağlantı gerekir' : 'Ses alınamadı, tekrar deneyin');
  });

  function oynatDuraklat() {
    if (!ses.src) { cal(1); return; }
    if (ses.paused) { aktif = true; ses.playbackRate = hiz(); ses.play(); }
    else { ses.pause(); }
  }
  oynatBtn.addEventListener('click', oynatDuraklat);
  document.getElementById('onceki').addEventListener('click', function () { cal(Math.max(simdiki - 1, (besmele && SURE !== 1) ? 0 : 1)); });
  document.getElementById('sonraki').addEventListener('click', function () { if (simdiki < ADET) cal(simdiki + 1); });
  document.getElementById('kapat').addEventListener('click', function () {
    aktif = false; ses.pause(); calar.hidden = true; document.body.classList.remove('calar-acik');
    ayetler.forEach(function (el) { el.classList.remove('calan'); }); if (besmele) besmele.classList.remove('calan');
  });
  document.getElementById('hepsi').addEventListener('click', function () { cal(0); });
  kok.addEventListener('click', function (e) {
    var b = e.target.closest('.ayet-cal'); if (!b) return;
    var n = parseInt(b.getAttribute('data-no'), 10);
    if (n === simdiki && !ses.paused) { ses.pause(); return; }
    cal(n);
  });
  if (besmele) { besmele.setAttribute('role', 'button'); besmele.setAttribute('tabindex', '0'); besmele.setAttribute('aria-label', 'Besmele-i şerîfeyi dinle');
    besmele.addEventListener('click', function () { cal(0); });
    besmele.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cal(0); } }); }
  kariSec.addEventListener('change', function () { if (aktif && ses.src) { var n = simdiki; simdikiUrl = ''; cal(n, false); } });
  hizSec.addEventListener('change', function () { ses.playbackRate = hiz(); });

  document.addEventListener('keydown', function (e) {
    var t = e.target; if (t && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) return;
    if (e.key === ' ' && calar && !calar.hidden) { e.preventDefault(); oynatDuraklat(); }
    else if (e.key === 'ArrowRight' && !calar.hidden) { if (simdiki < ADET) cal(simdiki + 1); }
    else if (e.key === 'ArrowLeft' && !calar.hidden) { cal(Math.max(simdiki - 1, 1)); }
    else if (e.key === 'Escape' && !calar.hidden) { document.getElementById('kapat').click(); }
  });

  if ('mediaSession' in navigator) {
    try {
      ses.addEventListener('play', function () {
        navigator.mediaSession.metadata = new MediaMetadata({ title: etiket(simdiki), artist: kariSec.options[kariSec.selectedIndex].textContent, album: "Kur'an Öğretmenim" });
      });
      navigator.mediaSession.setActionHandler('play', function () { oynatDuraklat(); });
      navigator.mediaSession.setActionHandler('pause', function () { ses.pause(); });
      navigator.mediaSession.setActionHandler('nexttrack', function () { if (simdiki < ADET) cal(simdiki + 1); });
      navigator.mediaSession.setActionHandler('previoustrack', function () { cal(Math.max(simdiki - 1, 1)); });
    } catch (e) {}
  }

  /* ── kaldığı yer ── */
  var son = parseInt(oku('son.' + ID, '0'), 10);
  if (son > 1 && son <= ADET && !location.hash) {
    var d = document.createElement('div'); d.className = 'devam';
    d.innerHTML = '<span>Kaldığınız yer: <strong>' + son + '. âyet</strong></span><button type="button" class="btn btn--emerald" id="devamBtn">Oradan dinle</button>';
    kok.parentNode.insertBefore(d, besmele || kok);
    d.querySelector('#devamBtn').addEventListener('click', function () { cal(son); d.remove(); });
  }
  if (location.hash && /^#a\d+$/.test(location.hash)) {
    var h = ayetler[parseInt(location.hash.slice(2), 10) - 1];
    if (h) { h.classList.add('calan'); setTimeout(function () { h.classList.remove('calan'); }, 2500); }
  }
})();
