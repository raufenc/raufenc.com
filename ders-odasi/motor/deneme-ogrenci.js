/* Ders Odası — deneme öğrencisi (hayalî)
   Hocamızın deneme dersinde köşedeki küçük pencerede çalışır. Gerçek bir çocuk gibi
   birkaç saniye düşünüp ekrandaki oyuna bir hamle yapar; arada bir yanılır.
   Yalnızca ?bot=1 ile açılan öğrenci sayfasında yüklenir. */
(function () {
  'use strict';
  var DO = window.DO, O = DO.Oynatici;
  DO.sesAcik = false;                         // iki ayrı yerden ses gelmesin
  var sonraki = Date.now() + 3000, yakalaZaman = null;

  function q(s) { return document.querySelector('.icerik ' + s); }
  function qa(s) { return Array.prototype.slice.call(document.querySelectorAll('.icerik ' + s)); }
  function tikla(e) { if (e && !e.disabled) { e.click(); return true; } return false; }
  function yanilsin() { return Math.random() < 0.2; }
  function rastgele(dizi) { return dizi[Math.floor(Math.random() * dizi.length)]; }

  function hamle() {
    var b = O.sira[O.i]; if (!b) return false;
    if (q('.oyun-sonu')) return false;
    var devam = q('.oyun-govde .devam:not(:disabled), .dy-geri .dug, .hy-devam'); if (devam) return tikla(devam);
    switch (b.tur) {
      case 'anket': return tikla(rastgele(qa('.anket-secenek .secenek:not(.secili)')));
      case 'coktan': {
        var h = q('.soru-metin'); if (!h) return false;
        var s = b.sorular.find(function (x) { return x.metin === h.textContent; });
        var i = yanilsin() ? (s.dogru + 1) % s.secenekler.length : s.dogru;
        return tikla(q('.secenek-izgara [data-i="' + i + '"]'));
      }
      case 'dogruYanlis': {
        var t = q('.dy-kart:not(.arka):not(.ucuyor) p'); if (!t) return false;
        var d = b.ifadeler.find(function (x) { return x.metin === t.textContent; }).dogru;
        if (yanilsin()) d = !d;
        return tikla(q(d ? '.dy-dug.d' : '.dy-dug.y'));
      }
      case 'siniflandir': {
        var k = q('.sinif-tepsi .sinif-kart'); if (!k) return false;
        var c = b.kartlar.find(function (x) { return x.id === k.dataset.id; });
        var alan = yanilsin() ? (b.alanlar.find(function (a) { return a.id !== c.alan; }) || {}).id : c.alan;
        k.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        return tikla(q('.sinif-alan[data-alan="' + alan + '"] .alan-bas'));
      }
      case 'eslestir': {
        var sol = qa('.esle-sutun.sol .esle-oge:not(.bitti)')[0]; if (!sol) return false;
        if (!sol.classList.contains('secili')) return tikla(sol);
        var sag = qa('.esle-sutun.sag .esle-oge:not(.bitti)');
        return tikla(yanilsin() ? rastgele(sag) : sag.find(function (x) { return x._c.id === sol._c.id; }));
      }
      case 'hafiza': {
        var ks = qa('.hafiza-kart');
        var acik = ks.filter(function (x) { return x.classList.contains('acik') && !x.classList.contains('bulundu'); });
        var kapali = ks.filter(function (x) { return !x.classList.contains('acik') && !x.classList.contains('bulundu'); });
        if (acik.length === 1) {
          var es = kapali.find(function (x) { return x._c.id === acik[0]._c.id; });
          return tikla(yanilsin() ? rastgele(kapali) : es);
        }
        return tikla(rastgele(kapali));
      }
      case 'yol': {
        var hy = q('.yol-soru h3'); if (!hy) return false;
        var a = b.adimlar.find(function (x) { return x.soru === hy.textContent; });
        var acikSec = qa('.yol-secenek .secenek:not(:disabled)');
        return tikla(yanilsin() ? rastgele(acikSec) : q('.yol-secenek [data-i="' + a.dogru + '"]'));
      }
      case 'gosterge': case 'kilit': {
        var hg = q('.gosterge-kart h3, .kilit-kart h3'); if (!hg) return false;
        var du = b.durumlar.find(function (x) { return x.metin === hg.textContent; });
        var sec = b.tur === 'gosterge' ? q('.gosterge-dug [data-d="' + du.cevap + '"]') : q('.kilit-dug [data-id="' + du.cevap + '"]');
        if (yanilsin()) sec = rastgele(qa('.gosterge-dug .secenek:not(:disabled), .kilit-dug .secenek:not(:disabled)'));
        return tikla(sec);
      }
      case 'sirala': {
        var n = qa('.sr-durak.tamam').length, ad = b.adimlar[n]; if (!ad) return false;
        return tikla(yanilsin() ? rastgele(qa('.sr-kart:not(:disabled)')) : q('.sr-kart[data-id="' + ad.id + '"]'));
      }
      case 'hikaye': {
        var sy = q('.hy-sayfa'); if (!sy) return false;
        var sh = b.sahneler[parseInt(sy.textContent, 10) - 1]; if (!sh || !sh.secenekler) return false;
        var iyi = sh.secenekler.findIndex(function (o) { return o.iyi; });
        return tikla(yanilsin() ? rastgele(qa('.hy-sec:not(:disabled)')) : q('.hy-sec[data-i="' + iyi + '"]'));
      }
      case 'cark': {
        var hc = q('.cark-kart h3');
        if (hc && q('.cark-secenekler .secenek:not(:disabled)')) {
          var dl = b.dilimler.find(function (x) { return x.soru === hc.textContent; });
          return tikla(q('.cark-secenekler [data-i="' + (yanilsin() ? (dl.dogru + 1) % dl.secenekler.length : dl.dogru) + '"]'));
        }
        return tikla(q('.cark-dug'));
      }
      case 'hataBul': {
        var dolu = qa('.hb-yuva.dolu').length, hb = b.hatalar.filter(function (x, j) { return j >= dolu; })[0]; if (!hb) return false;
        var kutu = q('.hb-kutu'), r = kutu.getBoundingClientRect(), iska = yanilsin();
        var x = iska ? 40 + Math.random() * 300 : hb.x, y = iska ? 700 : hb.y;
        kutu.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: r.left + x / 1600 * r.width, clientY: r.top + y / 900 * r.height }));
        return true;
      }
      case 'hizTuru': {
        var hh = q('.hiz-kart h3'); if (!hh || !q('.hiz-dug .secenek:not(:disabled)')) return false;
        var hs = b.sorular.find(function (x) { return x.metin === hh.textContent; });
        var hd = qa('.hiz-dug .secenek');
        return tikla(hd[yanilsin() ? (hs.dogru + 1) % hd.length : hs.dogru]);
      }
      case 'dusun': {
        if (!q('.cip.secili')) return tikla(rastgele(qa('.cip')));
        return tikla(q('.dusun-form > .dug'));
      }
    }
    return false;
  }

  /* Bereket sepeti: sepeti güzel davranışlara doğru götürür */
  function sepetiYonet() {
    var b = O.sira[O.i], sahne = document.querySelector('.yk-sahne');
    if (!b || b.tur !== 'yakala' || !sahne) return;
    var iyi = {}; (b.iyiler || []).forEach(function (o) { iyi[o.metin] = true; });
    var r = sahne.getBoundingClientRect(), en = null;
    document.querySelectorAll('.yk-oge').forEach(function (o) {
      var or = o.getBoundingClientRect();
      if (iyi[o.querySelector('span').textContent] && (!en || or.top > en.top)) en = or;
    });
    if (en) sahne.dispatchEvent(new PointerEvent('pointermove', { clientX: en.left + en.width / 2, clientY: r.bottom - 40, bubbles: true }));
  }

  setInterval(function () {
    if (!DO.Canli.acik || !DO.Canli.ogretmenVar() || !O.sira[O.i]) return;
    if (O.sira[O.i].tur === 'yakala') { if (!yakalaZaman) yakalaZaman = setInterval(sepetiYonet, 90); return; }
    if (yakalaZaman) { clearInterval(yakalaZaman); yakalaZaman = null; }
    if (Date.now() < sonraki) return;
    hamle();
    sonraki = Date.now() + 2200 + Math.random() * 1800;   // düşünme süresi
  }, 400);
})();
