/* Tecvid — örnek sesleri, alıştırmalar, tamamlanan kurallar */
(function () {
  'use strict';
  var KOK = document.querySelector('[data-kural]') ? '../../app/assets/assets/' : '../app/assets/assets/';
  var ses = new Audio(); var aktifBtn = null;
  function cal(yol, btn) {
    if (aktifBtn) aktifBtn.classList.remove('caliyor');
    if (btn === aktifBtn && !ses.paused) { ses.pause(); aktifBtn = null; return; }
    ses.src = KOK + yol; aktifBtn = btn || null; if (btn) btn.classList.add('caliyor');
    var p = ses.play(); if (p && p.catch) p.catch(function () { if (btn) btn.classList.remove('caliyor'); });
  }
  ses.addEventListener('ended', function () { if (aktifBtn) aktifBtn.classList.remove('caliyor'); aktifBtn = null; });
  ses.addEventListener('error', function () { if (aktifBtn) aktifBtn.classList.remove('caliyor'); aktifBtn = null; });
  document.addEventListener('click', function (e) { var b = e.target.closest('.cal[data-ses]'); if (b) cal(b.getAttribute('data-ses'), b); });

  function oku(k) { try { return localStorage.getItem('ko.tecvid.' + k); } catch (e) { return null; } }
  function yaz(k, v) { try { localStorage.setItem('ko.tecvid.' + k, v); } catch (e) {} }

  // dizin: tamamlananlar
  document.querySelectorAll('.kural-kart[data-kural]').forEach(function (a) { if (oku(a.getAttribute('data-kural')) === '1') a.classList.add('tamam'); });

  var ana = document.querySelector('main[data-kural]'); if (!ana) return;
  var kural = ana.getAttribute('data-kural');
  var alistirmalar = Array.prototype.slice.call(ana.querySelectorAll('.alistirma'));
  function bitti(al) {
    al.classList.add('bitti'); var s = al.querySelector('.alistirma-sonuc'); s.textContent = al.getAttribute('data-tebrik'); s.classList.add('tamam');
    cal(al.getAttribute('data-ses') || 'sounds/efektler/dogru.mp3', null);
    if (alistirmalar.every(function (a) { return a.classList.contains('bitti'); })) yaz(kural, '1');
  }
  function yanlis(al, el) {
    el.classList.remove('yanlis'); void el.offsetWidth; el.classList.add('yanlis');
    al.querySelector('.alistirma-sonuc').textContent = 'Bu değil; tekrar deneyin.'; cal('sounds/efektler/yanlis.mp3', null);
  }
  alistirmalar.forEach(function (al) {
    var tip = al.getAttribute('data-tip');
    al.addEventListener('click', function (e) {
      if (al.classList.contains('bitti')) return;
      if (tip === 'findLetter') { var p = e.target.closest('.parca'); if (!p) return; if (p.getAttribute('data-dogru') === '1') { p.classList.add('dogru'); bitti(al); } else yanlis(al, p); }
      else if (tip === 'multipleChoice') { var s = e.target.closest('.secenek'); if (!s) return; if (s.getAttribute('data-i') === al.getAttribute('data-dogru')) { s.classList.add('dogru'); bitti(al); } else yanlis(al, s); }
      else {
        var k = e.target.closest('.kutu'); if (k) { k.setAttribute('aria-pressed', k.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); return; }
        if (e.target.closest('.kontrol')) {
          var kutular = al.querySelectorAll('.kutu'), hata = 0;
          kutular.forEach(function (x) { var secili = x.getAttribute('aria-pressed') === 'true', d = x.getAttribute('data-dogru') === '1'; x.classList.remove('yanlis'); if (secili !== d) { hata++; x.classList.add('yanlis'); } });
          if (hata) { al.querySelector('.alistirma-sonuc').textContent = hata + ' kelime yanlış yerde; işaretli olanları gözden geçirin.'; cal('sounds/efektler/yanlis.mp3', null); }
          else { kutular.forEach(function (x) { if (x.getAttribute('data-dogru') === '1') x.classList.add('dogru'); }); bitti(al); }
        }
      }
    });
  });
})();
