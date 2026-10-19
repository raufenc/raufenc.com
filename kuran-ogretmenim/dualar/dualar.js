/* Dualar — satır satır vurgulu sesli okuma, satır satır bekleme, tekrar */
(function () {
  'use strict';
  var kok = document.getElementById('dualar'); if (!kok) return;
  var SES = '../app/assets/assets/sounds/dualar/';
  var dualar = Array.prototype.slice.call(kok.querySelectorAll('.dua'));
  var calar = document.getElementById('calar'), calanAyet = document.getElementById('calanAyet'), calanDurum = document.getElementById('calanDurum');
  var modSec = document.getElementById('mod'), tekrarSec = document.getElementById('tekrar'), hizSec = document.getElementById('hiz'), gosterSec = document.getElementById('goster');
  var azalt = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function oku(k, v) { try { var x = localStorage.getItem('ko.dua.' + k); return x === null ? v : x; } catch (e) { return v; } }
  function yaz(k, v) { try { localStorage.setItem('ko.dua.' + k, v); } catch (e) {} }
  function secimYukle(sel, k) { var v = oku(k, ''); if (v && sel.querySelector('option[value="' + v + '"]')) sel.value = v; sel.addEventListener('change', function () { yaz(k, sel.value); }); }
  secimYukle(modSec, 'mod'); secimYukle(tekrarSec, 'tekrar'); secimYukle(hizSec, 'hiz'); secimYukle(gosterSec, 'goster');

  var BOYUTLAR = [1.5, 1.8, 2.1, 2.4, 2.8, 3.2, 3.6]; var boyutI = parseInt(oku('boyut', '2'), 10);
  function boyutUygula() { kok.style.setProperty('--ar-boyut', BOYUTLAR[boyutI] + 'rem'); }
  document.getElementById('kucult').addEventListener('click', function () { boyutI = Math.max(0, boyutI - 1); yaz('boyut', boyutI); boyutUygula(); });
  document.getElementById('buyut').addEventListener('click', function () { boyutI = Math.min(BOYUTLAR.length - 1, boyutI + 1); yaz('boyut', boyutI); boyutUygula(); });
  boyutUygula();
  function gosterUygula() { kok.classList.toggle('yalniz-ar', gosterSec.value === 'ar'); kok.classList.toggle('ar-oku', gosterSec.value === 'oku'); }
  gosterSec.addEventListener('change', gosterUygula); gosterUygula();

  var ses = new Audio(); ses.preload = 'auto'; window.koSes = ses;
  var dua = null, satirlar = [], satirI = -1, kalanTekrar = 1, aktif = false, sirali = false, satirBekle = false, hedefBit = null;
  function hiz() { var h = parseFloat(hizSec.value); return isFinite(h) ? h : 1; }
  function durum(t) { calanDurum.textContent = t; }
  function zamanli() { return satirlar.length && satirlar[0].hasAttribute('data-bas'); }
  function gorunur(el) { var r = el.getBoundingClientRect(); var ust = 140, alt = window.innerHeight - 130; if (r.top < ust || r.bottom > alt) window.scrollTo({ top: window.scrollY + r.top - Math.max(ust, (window.innerHeight - r.height) / 2), behavior: azalt ? 'auto' : 'smooth' }); }
  function vurgula(i) {
    satirlar.forEach(function (s, j) { s.classList.toggle('calan', zamanli() ? j === i : true); });
    if (i >= 0 && zamanli()) gorunur(satirlar[i]);
    calanAyet.textContent = dua.querySelector('h2').textContent + (zamanli() && i >= 0 ? ' · ' + (i + 1) + '. satır' : '');
  }
  function duaSec(el) {
    if (dua === el) return;
    dualar.forEach(function (d) { d.classList.remove('calan-dua'); d.querySelectorAll('.satir').forEach(function (s) { s.classList.remove('calan'); }); });
    dua = el; dua.classList.add('calan-dua');
    satirlar = Array.prototype.slice.call(dua.querySelectorAll('.satir'));
    ses.src = SES + dua.getAttribute('data-ses') + '.mp3';
  }
  function cal(el, i, tekrarSifirla) {
    duaSec(el);
    if (tekrarSifirla !== false) kalanTekrar = parseInt(tekrarSec.value, 10) || 1;
    satirBekle = modSec.value === 'satir' && zamanli();
    aktif = true; calar.hidden = false; document.body.classList.add('calar-acik');
    if (zamanli() && i >= 0) { satirI = i; ses.currentTime = parseFloat(satirlar[i].getAttribute('data-bas')); hedefBit = satirBekle ? parseFloat(satirlar[i].getAttribute('data-bit')) : null; }
    else { satirI = -1; ses.currentTime = 0; hedefBit = null; }
    ses.playbackRate = hiz(); vurgula(satirI); durum('Yükleniyor…');
    var p = ses.play(); if (p && p.catch) p.catch(function () { durum('Dinlemek için oynat düğmesine basın'); calar.classList.remove('oynuyor'); });
    if (!zamanli()) gorunur(dua);
  }
  function satirBul(t) { for (var i = satirlar.length - 1; i >= 0; i--) { if (t >= parseFloat(satirlar[i].getAttribute('data-bas'))) return i; } return 0; }
  ses.addEventListener('timeupdate', function () {
    if (!dua || !aktif) return;
    var t = ses.currentTime;
    if (hedefBit !== null && t >= hedefBit - 0.05) {  // satır satır: bu satırın sonu
      if (kalanTekrar > 1) { kalanTekrar--; ses.currentTime = parseFloat(satirlar[satirI].getAttribute('data-bas')); durum('Okunuyor · ' + kalanTekrar + ' tekrar kaldı'); return; }
      ses.pause(); durum('Satır bitti · tekrar edin, sonra devam için oynat'); return;
    }
    if (zamanli()) { var i = satirBul(t); if (i !== satirI) { satirI = i; vurgula(i); } }
  });
  ses.addEventListener('playing', function () { calar.classList.add('oynuyor'); durum('Okunuyor' + (kalanTekrar > 1 ? ' · ' + kalanTekrar + ' tekrar kaldı' : '')); });
  ses.addEventListener('pause', function () { if (!ses.ended) { calar.classList.remove('oynuyor'); if (aktif && hedefBit === null) durum('Duraklatıldı'); } });
  ses.addEventListener('ended', function () {
    if (!aktif) return;
    if (kalanTekrar > 1 && !satirBekle) { kalanTekrar--; ses.currentTime = 0; ses.play(); return; }
    var sonraki = dualar[dualar.indexOf(dua) + 1];
    if (sirali && sonraki) { cal(sonraki, zamanli() ? 0 : -1); return; }
    aktif = false; calar.classList.remove('oynuyor'); durum('Dua tamamlandı'); satirlar.forEach(function (s) { s.classList.remove('calan'); });
  });
  ses.addEventListener('error', function () { calar.classList.remove('oynuyor'); aktif = false; durum('Ses alınamadı, tekrar deneyin'); });

  function oynatDuraklat() {
    if (!dua) { sirali = false; cal(dualar[0], 0); return; }
    if (ses.paused) {
      if (hedefBit !== null && ses.currentTime >= hedefBit - 0.06) { // satır satır: sonraki satıra geç
        if (satirI + 1 < satirlar.length) cal(dua, satirI + 1); else { var sonraki = dualar[dualar.indexOf(dua) + 1]; if (sirali && sonraki) cal(sonraki, 0); else durum('Dua tamamlandı'); }
        return;
      }
      aktif = true; ses.playbackRate = hiz(); ses.play();
    } else ses.pause();
  }
  document.getElementById('oynat').addEventListener('click', oynatDuraklat);
  document.getElementById('onceki').addEventListener('click', function () { if (dua && zamanli()) cal(dua, Math.max(0, satirI - 1)); });
  document.getElementById('sonraki').addEventListener('click', function () { if (dua && zamanli() && satirI + 1 < satirlar.length) cal(dua, satirI + 1); });
  document.getElementById('kapat').addEventListener('click', function () { aktif = false; sirali = false; ses.pause(); calar.hidden = true; document.body.classList.remove('calar-acik'); satirlar.forEach(function (s) { s.classList.remove('calan'); }); if (dua) dua.classList.remove('calan-dua'); });
  document.getElementById('hepsi').addEventListener('click', function () { sirali = true; cal(dualar[0], 0); });
  kok.addEventListener('click', function (e) {
    var b = e.target.closest('.dua-cal');
    if (b) { var d = b.closest('.dua'); if (d === dua && !ses.paused) { ses.pause(); return; } sirali = false; cal(d, d.querySelector('.satir[data-bas]') ? 0 : -1); return; }
    var s = e.target.closest('.satir[data-bas]');
    if (s) { var el = s.closest('.dua'); sirali = false; cal(el, Array.prototype.indexOf.call(el.querySelectorAll('.satir'), s)); }
  });
  hizSec.addEventListener('change', function () { ses.playbackRate = hiz(); });
  document.addEventListener('keydown', function (e) {
    var t = e.target; if (t && /^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(t.tagName)) return;
    if (calar.hidden) return;
    if (e.key === ' ') { e.preventDefault(); oynatDuraklat(); }
    else if (e.key === 'ArrowRight') document.getElementById('sonraki').click();
    else if (e.key === 'ArrowLeft') document.getElementById('onceki').click();
    else if (e.key === 'Escape') document.getElementById('kapat').click();
  });
  if ('mediaSession' in navigator) { try {
    ses.addEventListener('play', function () { navigator.mediaSession.metadata = new MediaMetadata({ title: dua ? dua.querySelector('h2').textContent : 'Dua', artist: "Kur'an Öğretmenim", album: 'Namaz duaları' }); });
    navigator.mediaSession.setActionHandler('play', oynatDuraklat); navigator.mediaSession.setActionHandler('pause', function () { ses.pause(); });
  } catch (e) {} }
})();
