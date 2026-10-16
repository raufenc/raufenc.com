/* Ders Odası — çekirdek yardımcılar
   Bütün motor dosyaları window.DO (Ders Odası) ad alanını paylaşır. */
(function () {
  'use strict';
  var DO = window.DO = window.DO || {};

  /* ---------- DOM ---------- */
  DO.el = function (etiket, ozellik, cocuklar) {
    var e = document.createElement(etiket);
    if (ozellik) for (var k in ozellik) {
      var v = ozellik[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'style' && typeof v === 'object') {
        for (var sk in v) { if (sk.slice(0, 2) === '--') e.style.setProperty(sk, v[sk]); else e.style[sk] = v[sk]; }
      }
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    DO.ekle(e, cocuklar);
    return e;
  };
  DO.ekle = function (ana, cocuklar) {
    if (cocuklar == null) return ana;
    if (!Array.isArray(cocuklar)) cocuklar = [cocuklar];
    cocuklar.forEach(function (c) {
      if (c == null || c === false) return;
      ana.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return ana;
  };
  var SVGNS = 'http://www.w3.org/2000/svg';
  DO.svg = function (etiket, ozellik, cocuklar) {
    var e = document.createElementNS(SVGNS, etiket);
    if (ozellik) for (var k in ozellik) {
      if (ozellik[k] == null) continue;
      if (k === 'text') e.textContent = ozellik[k];
      else if (k.slice(0, 2) === 'on' && typeof ozellik[k] === 'function') e.addEventListener(k.slice(2), ozellik[k]);
      else e.setAttribute(k, ozellik[k]);
    }
    DO.ekle(e, cocuklar);
    return e;
  };
  DO.kacis = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- Genel ---------- */
  DO.karistir = function (dizi) {
    var a = dizi.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  /* Tohumlu karıştırma: canlı derste herkes aynı sırayı görsün */
  DO.tohum = function (metin) {
    var h = 1779033703 ^ metin.length;
    for (var i = 0; i < metin.length; i++) { h = Math.imul(h ^ metin.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
    return function () {
      h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  };
  DO.tohumluKaristir = function (dizi, tohumMetni) {
    var r = DO.tohum(tohumMetni), a = dizi.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  DO.uuid = function () {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  };
  DO.odaKodu = function () {
    var h = 'ABCDEFGHJKLMNPRSTUVYZ23456789', s = '';
    for (var i = 0; i < 5; i++) s += h[Math.floor(Math.random() * h.length)];
    return s;
  };
  DO.bekle = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  DO.param = function (ad, vars) {
    var v = new URLSearchParams(location.search).get(ad);
    return v == null ? vars : v;
  };
  /* ISO 8601 süre (xAPI ve SCORM 2004) */
  DO.isoSure = function (ms) {
    var s = Math.max(0, ms) / 1000, h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60);
    var sn = Math.round((s % 60) * 100) / 100;
    return 'PT' + (h ? h + 'H' : '') + (m ? m + 'M' : '') + sn + 'S';
  };
  /* SCORM 1.2 süre: HHHH:MM:SS.SS */
  DO.scorm12Sure = function (ms) {
    var s = Math.max(0, ms) / 1000, h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sn = (s % 60).toFixed(2);
    return String(h).padStart(4, '0') + ':' + String(m).padStart(2, '0') + ':' + sn.padStart(5, '0');
  };
  DO.sureYazi = function (ms) {
    var s = Math.round(ms / 1000), m = Math.floor(s / 60);
    return m ? m + ' dk ' + (s % 60) + ' sn' : s + ' sn';
  };
  DO.depo = {
    oku: function (k, vars) {
      try { var v = localStorage.getItem(k); return v == null ? vars : JSON.parse(v); } catch (e) { return vars; }
    },
    yaz: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
    },
    sil: function (k) { try { localStorage.removeItem(k); } catch (e) { /* yok */ } }
  };

  /* ---------- Olay yayını ---------- */
  DO.yayin = function () {
    var dinleyiciler = {};
    return {
      on: function (ad, fn) { (dinleyiciler[ad] = dinleyiciler[ad] || []).push(fn); },
      off: function (ad, fn) { dinleyiciler[ad] = (dinleyiciler[ad] || []).filter(function (f) { return f !== fn; }); },
      emit: function (ad, veri) { (dinleyiciler[ad] || []).slice().forEach(function (f) { try { f(veri); } catch (e) { console.error(e); } }); }
    };
  };

  /* ---------- Ses efektleri (WebAudio, dosya gerektirmez) ---------- */
  var ctx = null;
  DO.sesAcik = DO.depo.oku('do:efekt', true);
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function ton(frek, sure, tur, gecikme, ses) {
    var c = ac(); if (!c || !DO.sesAcik) return;
    var t = c.currentTime + (gecikme || 0), o = c.createOscillator(), g = c.createGain();
    o.type = tur || 'sine'; o.frequency.setValueAtTime(frek, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(ses || 0.18, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + sure + 0.05);
  }
  DO.efekt = {
    dogru: function () { ton(660, 0.18, 'sine'); ton(880, 0.28, 'sine', 0.1); },
    yanlis: function () { ton(220, 0.25, 'triangle', 0, 0.14); ton(180, 0.3, 'triangle', 0.12, 0.12); },
    tik: function () { ton(1200, 0.05, 'square', 0, 0.04); },
    gecis: function () { ton(520, 0.12, 'sine', 0, 0.06); },
    zafer: function () { [523, 659, 784, 1046].forEach(function (f, i) { ton(f, 0.35, 'sine', i * 0.12, 0.16); }); },
    kilit: function () { ton(300, 0.08, 'square', 0, 0.08); ton(900, 0.12, 'sine', 0.06, 0.1); }
  };

  /* ---------- Konfeti ---------- */
  DO.konfeti = function (kap, adet) {
    var renk = ['#4f7a3a', '#e8962e', '#c0392b', '#2f4a6b', '#e9c46a', '#7fb069'];
    var k = DO.el('div', { class: 'konfeti' });
    for (var i = 0; i < (adet || 70); i++) {
      var p = DO.el('i', {
        style: {
          left: (Math.random() * 100) + '%', background: renk[i % renk.length],
          animationDelay: (Math.random() * 0.6) + 's', animationDuration: (1.8 + Math.random() * 1.4) + 's',
          transform: 'rotate(' + (Math.random() * 360) + 'deg)', width: (8 + Math.random() * 10) + 'px'
        }
      });
      k.appendChild(p);
    }
    kap.appendChild(k);
    setTimeout(function () { k.remove(); }, 3600);
  };
})();
