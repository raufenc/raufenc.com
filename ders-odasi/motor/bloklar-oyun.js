/* Ders Odası — oyun blokları
   coktan · dogruYanlis · siniflandir · eslestir · hafiza · yol · gosterge · kilit · hizTuru
   Puanlama: her öge ilk denemede doğruysa 10 puan (hız turunda hız bonusu ile). */
(function () {
  'use strict';
  var DO = window.DO, el = DO.el, B = DO.Bloklar;

  function onAdet(n) { return function (b) { return (b[n] || []).length * 10; }; }
  function geriBildirim(kap, dogru, metin) {
    var g = el('div', { class: 'geri-bildirim ' + (dogru ? 'd' : 'y') }, [
      el('b', { text: dogru ? '✓ Doğru' : '✗ Bir daha bakalım' }),
      metin ? el('span', { text: metin }) : null
    ]);
    kap.appendChild(g);
    return g;
  }
  function noktalar(adet) {
    var k = el('div', { class: 'ilerleme-nokta' });
    for (var i = 0; i < adet; i++) k.appendChild(el('i'));
    k.isaretle = function (i, durum) { if (k.children[i]) k.children[i].className = durum; };
    return k;
  }

  /* =====================================================================
     ÇOKTAN SEÇMELİ — soru seti
     ===================================================================== */
  B.coktan = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('sorular'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: b.rozet || 'Soru', sinif: 'oyun-coktan' });
      var sira = 0, puan = 0, nk = noktalar(b.sorular.length);
      k.ust.appendChild(nk);
      function goster() {
        if (sira >= b.sorular.length) { ctx.tamamla({ puan: puan }); DO.oyunSonu(ctx, k.govde, { puan: puan, max: b.sorular.length * 10, tekrar: tekrar }); return; }
        var s = b.sorular[sira], bas = Date.now(), cevaplandi = false;
        k.govde.innerHTML = '';
        var kart = el('div', { class: 'soru-kart' }, [
          el('span', { class: 'soru-no', text: (sira + 1) + '. soru' }),
          s.gorsel ? el('img', { class: 'soru-gorsel', src: ctx.yol(s.gorsel), alt: '' }) : null,
          el('h3', { class: 'soru-metin', text: s.metin })
        ]);
        var harf = 'ABCD';
        var secenekler = DO.karistir(s.secenekler.map(function (m, i) { return { m: m, i: i }; }));
        var izgara = el('div', { class: 'secenek-izgara' + (secenekler.length > 2 ? ' dort' : '') });
        secenekler.forEach(function (o, j) {
          izgara.appendChild(el('button', { class: 'secenek', style: { animationDelay: (j * 0.08) + 's' }, html: '<i>' + harf[j] + '</i><span>' + DO.kacis(o.m) + '</span>', onclick: function () {
            if (cevaplandi) return; cevaplandi = true;
            var dogru = o.i === s.dogru;
            izgara.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
            this.classList.add(dogru ? 'dogru' : 'yanlis');
            if (!dogru) izgara.children[secenekler.findIndex(function (x) { return x.i === s.dogru; })].classList.add('dogru');
            (dogru ? DO.efekt.dogru : DO.efekt.yanlis)();
            var p = dogru ? 10 : 0; puan += p;
            nk.isaretle(sira, dogru ? 'd' : 'y');
            ctx.cevap({ oge: s.id || ('s' + sira), ad: s.metin, yanit: o.m, dogru: dogru, dogruYanit: s.secenekler[s.dogru], puan: p, max: 10, sureMs: Date.now() - bas });
            geriBildirim(kart, dogru, s.aciklama);
            kart.appendChild(el('button', { class: 'dug ana devam', text: sira < b.sorular.length - 1 ? 'Sonraki soru →' : 'Bitir', onclick: function () { sira++; goster(); } }));
          } }));
        });
        kart.appendChild(izgara);
        k.govde.appendChild(kart);
      }
      function tekrar() { sira = 0; puan = 0; nk.querySelectorAll('i').forEach(function (i) { i.className = ''; }); goster(); }
      goster();
      return {};
    }
  };

  /* =====================================================================
     DOĞRU / YANLIŞ — kartı sağa (doğru) veya sola (yanlış) kaydır
     ===================================================================== */
  B.dogruYanlis = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('ifadeler'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: 'Doğru mu?', sinif: 'oyun-dy', yonerge: b.yonerge || 'Kartı sağa kaydır: Doğru · Sola kaydır: Yanlış' });
      var sira = 0, puan = 0, liste = DO.karistir(b.ifadeler), nk = noktalar(liste.length);
      k.ust.appendChild(nk);
      var masa = el('div', { class: 'dy-masa' });
      var yanlisDug = el('button', { class: 'dy-dug y', html: '<b>✗</b><span>Yanlış</span>', onclick: function () { karar(false); } });
      var dogruDug = el('button', { class: 'dy-dug d', html: '<b>✓</b><span>Doğru</span>', onclick: function () { karar(true); } });
      var deste = el('div', { class: 'dy-deste' });
      masa.appendChild(yanlisDug); masa.appendChild(deste); masa.appendChild(dogruDug);
      k.govde.appendChild(masa);
      var aktif = null, bas = 0, kilitli = false;

      function kartCiz() {
        if (sira >= liste.length) { ctx.tamamla({ puan: puan }); DO.oyunSonu(ctx, k.govde, { puan: puan, max: liste.length * 10, tekrar: function () { liste = DO.karistir(b.ifadeler); sira = 0; puan = 0; k.govde.innerHTML = ''; k.govde.appendChild(masa); nk.querySelectorAll('i').forEach(function (i) { i.className = ''; }); kartCiz(); } }); return; }
        deste.innerHTML = '';
        var s = liste[sira];
        aktif = el('div', { class: 'dy-kart' }, [el('span', { class: 'dy-no', text: (sira + 1) + ' / ' + liste.length }), el('p', { text: s.metin })]);
        deste.appendChild(aktif);
        if (sira + 1 < liste.length) deste.insertBefore(el('div', { class: 'dy-kart arka' }), aktif);
        bas = Date.now(); kilitli = false;
        surukle(aktif);
      }
      function surukle(kart) {
        var x0 = null, dx = 0;
        kart.addEventListener('pointerdown', function (e) { if (kilitli) return; x0 = e.clientX; dx = 0; kart.setPointerCapture(e.pointerId); kart.classList.add('tutuluyor'); });
        kart.addEventListener('pointermove', function (e) {
          if (x0 == null) return;
          dx = (e.clientX - x0) / ctx.oynatici.olcek;
          kart.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 18) + 'deg)';
          kart.classList.toggle('egim-d', dx > 60); kart.classList.toggle('egim-y', dx < -60);
        });
        function birak() {
          if (x0 == null) return; x0 = null; kart.classList.remove('tutuluyor');
          if (Math.abs(dx) > 160) karar(dx > 0); else { kart.style.transform = ''; kart.classList.remove('egim-d', 'egim-y'); }
        }
        kart.addEventListener('pointerup', birak); kart.addEventListener('pointercancel', birak);
      }
      function karar(secim) {
        if (kilitli || !aktif) return; kilitli = true;
        var s = liste[sira], dogru = secim === s.dogru, p = dogru ? 10 : 0;
        puan += p;
        nk.isaretle(sira, dogru ? 'd' : 'y');
        (dogru ? DO.efekt.dogru : DO.efekt.yanlis)();
        ctx.cevap({ oge: s.id, ad: s.metin, yanit: secim ? 'Doğru' : 'Yanlış', dogru: dogru, dogruYanit: s.dogru ? 'Doğru' : 'Yanlış', puan: p, max: 10, sureMs: Date.now() - bas, etkilesim: 'true-false' });
        aktif.style.transform = 'translateX(' + (secim ? 900 : -900) + 'px) rotate(' + (secim ? 30 : -30) + 'deg)';
        aktif.classList.add('ucuyor');
        var gb = el('div', { class: 'dy-geri ' + (dogru ? 'd' : 'y') }, [
          el('b', { text: dogru ? '✓ Doğru bildin' : '✗ Bu ifade ' + (s.dogru ? 'doğru' : 'yanlış') }),
          el('p', { text: s.aciklama || '' }),
          el('button', { class: 'dug ana', text: 'Devam', onclick: function () { gb.remove(); sira++; kartCiz(); } })
        ]);
        ctx.zaman(function () { deste.appendChild(gb); }, 260);
      }
      kartCiz();
      return {};
    }
  };

  /* =====================================================================
     SINIFLANDIR — kartları doğru kutuya sürükle (veya dokun-seç)
     ===================================================================== */
  B.siniflandir = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('kartlar'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: 'Yerleştir', sinif: 'oyun-sinif' });
      var puan = 0, yerlesen = 0, hatalar = {}, secili = null;
      var tepsi = el('div', { class: 'sinif-tepsi' });
      var alanlar = el('div', { class: 'sinif-alanlar', style: { '--adet': b.alanlar.length } });
      var alanEl = {};
      b.alanlar.forEach(function (a) {
        var liste = el('div', { class: 'alan-liste' });
        var kutu = el('div', { class: 'sinif-alan', style: { '--r': a.renk }, 'data-alan': a.id }, [
          el('div', { class: 'alan-bas' }, [
            el('span', { class: 'alan-ikon', html: a.gorsel ? '<img src="' + DO.kacis(ctx.yol(a.gorsel)) + '" alt="">' : DO.ikonSvg(a.ikon, a.renk, 54) }),
            el('div', {}, [el('b', { text: a.ad }), a.aciklama ? el('small', { text: a.aciklama }) : null])
          ]),
          liste
        ]);
        kutu.addEventListener('click', function () { if (secili) birak(secili, a.id); });
        alanEl[a.id] = { kutu: kutu, liste: liste };
        alanlar.appendChild(kutu);
      });
      DO.karistir(b.kartlar).forEach(function (c, i) {
        var kart = el('div', { class: 'sinif-kart', tabindex: 0, style: { animationDelay: (i * 0.05) + 's' }, text: c.metin });
        kart._veri = c;
        kart._bas = Date.now();
        surukleBagla(kart);
        tepsi.appendChild(kart);
      });
      k.govde.appendChild(tepsi);
      k.govde.appendChild(alanlar);

      function surukleBagla(kart) {
        var bas = null, tasindi = false;
        kart.addEventListener('pointerdown', function (e) {
          if (kart.classList.contains('yerlesti')) return;
          bas = { x: e.clientX, y: e.clientY }; tasindi = false;
          kart.setPointerCapture(e.pointerId);
        });
        kart.addEventListener('pointermove', function (e) {
          if (!bas) return;
          var dx = (e.clientX - bas.x) / ctx.oynatici.olcek, dy = (e.clientY - bas.y) / ctx.oynatici.olcek;
          if (!tasindi && Math.abs(dx) + Math.abs(dy) < 8) return;
          tasindi = true;
          kart.classList.add('tasiniyor');
          kart.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (dx / 40) + 'deg)';
          var hedef = alanBul(e.clientX, e.clientY);
          for (var id in alanEl) alanEl[id].kutu.classList.toggle('uzerinde', id === hedef);
        });
        function son(e) {
          if (!bas) return;
          bas = null;
          kart.classList.remove('tasiniyor');
          for (var id in alanEl) alanEl[id].kutu.classList.remove('uzerinde');
          if (!tasindi) { sec(kart); return; }
          var hedef = alanBul(e.clientX, e.clientY);
          kart.style.transform = '';
          if (hedef) birak(kart, hedef);
        }
        kart.addEventListener('pointerup', son);
        kart.addEventListener('pointercancel', function () { bas = null; kart.style.transform = ''; kart.classList.remove('tasiniyor'); });
        kart.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec(kart); } });
      }
      function sec(kart) {
        if (kart.classList.contains('yerlesti')) return;
        if (secili) secili.classList.remove('secili');
        secili = secili === kart ? null : kart;
        if (secili) { secili.classList.add('secili'); ctx.bildir('Şimdi doğru kutuya dokun', 'bilgi'); }
        DO.efekt.tik();
      }
      function alanBul(x, y) {
        for (var id in alanEl) {
          var r = alanEl[id].kutu.getBoundingClientRect();
          if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return id;
        }
        return null;
      }
      function birak(kart, alanId) {
        var c = kart._veri, dogru = c.alan === alanId;
        var alan = b.alanlar.find(function (a) { return a.id === alanId; });
        var dogruAlan = b.alanlar.find(function (a) { return a.id === c.alan; });
        var ilk = !hatalar[c.id];
        ctx.cevap({ oge: c.id, ad: c.metin, yanit: alan.ad, dogru: dogru, dogruYanit: dogruAlan.ad, puan: dogru && ilk ? 10 : 0, max: 10, deneme: (hatalar[c.id] || 0) + 1, sureMs: Date.now() - kart._bas, etkilesim: 'matching' });
        if (secili) { secili.classList.remove('secili'); secili = null; }
        if (dogru) {
          if (ilk) puan += 10;
          DO.efekt.dogru();
          kart.classList.add('yerlesti');
          kart.style.transform = '';
          alanEl[alanId].liste.appendChild(kart);
          alanEl[alanId].kutu.classList.add('parla');
          setTimeout(function () { alanEl[alanId].kutu.classList.remove('parla'); }, 600);
          if (c.aciklama) ctx.bildir('✓ ' + c.aciklama, 'puan');
          yerlesen++;
          if (yerlesen === b.kartlar.length) ctx.zaman(function () {
            ctx.tamamla({ puan: puan });
            DO.oyunSonu(ctx, k.govde, { puan: puan, max: b.kartlar.length * 10, metin: b.sonMetin });
          }, 900);
        } else {
          hatalar[c.id] = (hatalar[c.id] || 0) + 1;
          DO.efekt.yanlis();
          alanEl[alanId].kutu.classList.add('ret');
          kart.classList.add('salla');
          setTimeout(function () { alanEl[alanId].kutu.classList.remove('ret'); kart.classList.remove('salla'); }, 550);
          ctx.bildir(c.ipucu || ('“' + c.metin + '” bu kutuya ait değil. Bir daha düşün.'), 'uyari');
        }
      }
      return {};
    }
  };

  /* =====================================================================
     EŞLEŞTİR — soldakini sağdaki anlamıyla çizgiyle bağla
     ===================================================================== */
  B.eslestir = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('ciftler'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: 'Eşleştir', sinif: 'oyun-eslestir', yonerge: b.yonerge || 'Soldan bir kavram, sağdan anlamını seç.' });
      var puan = 0, biten = 0, hata = {}, secSol = null, bas = Date.now();
      var alan = el('div', { class: 'esle-alan' });
      var cizgi = DO.svg('svg', { class: 'esle-svg' });
      var sol = el('div', { class: 'esle-sutun sol' }), sag = el('div', { class: 'esle-sutun sag' });
      DO.karistir(b.ciftler).forEach(function (c) {
        var d = el('button', { class: 'esle-oge', text: c.sol }); d._c = c;
        d.onclick = function () {
          if (d.classList.contains('bitti')) return;
          sol.querySelectorAll('.secili').forEach(function (x) { x.classList.remove('secili'); });
          secSol = d; d.classList.add('secili'); DO.efekt.tik();
        };
        sol.appendChild(d);
      });
      DO.karistir(b.ciftler).forEach(function (c) {
        var d = el('button', { class: 'esle-oge anlam', text: c.sag }); d._c = c;
        d.onclick = function () {
          if (!secSol || d.classList.contains('bitti')) { if (!secSol) ctx.bildir('Önce soldan bir kavram seç', 'bilgi'); return; }
          var dogru = secSol._c.id === c.id, sc = secSol._c, ilk = !hata[sc.id];
          ctx.cevap({ oge: sc.id, ad: sc.sol, yanit: c.sag, dogru: dogru, dogruYanit: sc.sag, puan: dogru && ilk ? 10 : 0, max: 10, sureMs: Date.now() - bas, etkilesim: 'matching' });
          bas = Date.now();
          var cz = cizgiCiz(secSol, d, dogru);
          if (dogru) {
            if (ilk) puan += 10;
            DO.efekt.dogru();
            secSol.classList.remove('secili'); secSol.classList.add('bitti'); d.classList.add('bitti');
            secSol = null; biten++;
            if (biten === b.ciftler.length) ctx.zaman(function () { ctx.tamamla({ puan: puan }); DO.oyunSonu(ctx, k.govde, { puan: puan, max: b.ciftler.length * 10 }); }, 900);
          } else {
            hata[sc.id] = (hata[sc.id] || 0) + 1;
            DO.efekt.yanlis();
            d.classList.add('salla');
            setTimeout(function () { d.classList.remove('salla'); cz.remove(); }, 650);
          }
        };
        sag.appendChild(d);
      });
      alan.appendChild(sol); alan.appendChild(cizgi); alan.appendChild(sag);
      k.govde.appendChild(alan);
      function cizgiCiz(a, bb, dogru) {
        var r0 = alan.getBoundingClientRect(), s = ctx.oynatici.olcek;
        var ra = a.getBoundingClientRect(), rb = bb.getBoundingClientRect();
        var x1 = (ra.right - r0.left) / s, y1 = (ra.top + ra.height / 2 - r0.top) / s;
        var x2 = (rb.left - r0.left) / s, y2 = (rb.top + rb.height / 2 - r0.top) / s;
        var mx = (x1 + x2) / 2;
        var p = DO.svg('path', { d: 'M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2, class: 'esle-cizgi ' + (dogru ? 'd' : 'y') });
        cizgi.appendChild(p);
        return p;
      }
      return {};
    }
  };

  /* =====================================================================
     HAFIZA — eşini bul
     ===================================================================== */
  B.hafiza = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('ciftler'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: 'Hafıza', sinif: 'oyun-hafiza', yonerge: b.yonerge || 'Kartları çevir, kavramı anlamıyla eşleştir.' });
      var kartlar = [];
      b.ciftler.forEach(function (c) {
        kartlar.push({ id: c.id, yuz: c.a, tur: 'a', renk: c.renk }); kartlar.push({ id: c.id, yuz: c.b, tur: 'b', renk: c.renk });
      });
      kartlar = DO.karistir(kartlar);
      var acik = [], bulunan = 0, yanlisHamle = 0, hamle = 0, kilit = false;
      var sayac = el('div', { class: 'hafiza-sayac', text: 'Hamle: 0' });
      k.ust.appendChild(sayac);
      var izgara = el('div', { class: 'hafiza-izgara', style: { '--sutun': Math.ceil(kartlar.length / 3) } });
      kartlar.forEach(function (c, i) {
        var d = el('button', { class: 'hafiza-kart', style: { '--r': c.renk || '#4f7a3a', animationDelay: (i * 0.04) + 's' }, 'aria-label': 'Kapalı kart' }, [
          el('div', { class: 'hk-ic' }, [
            el('div', { class: 'hk-arka', html: '<svg viewBox="0 0 100 100" width="70" height="70"><path d="M50 8 61 39 92 50 61 61 50 92 39 61 8 50 39 39z" fill="none" stroke="#e9b949" stroke-width="4"/><circle cx="50" cy="50" r="10" fill="#e9b949"/></svg>' }),
            el('div', { class: 'hk-on ' + c.tur, text: c.yuz })
          ])
        ]);
        d._c = c;
        d.onclick = function () {
          if (kilit || d.classList.contains('acik') || d.classList.contains('bulundu')) return;
          d.classList.add('acik'); DO.efekt.tik(); acik.push(d);
          if (acik.length === 2) {
            hamle++; sayac.textContent = 'Hamle: ' + hamle;
            var a = acik[0], bb = acik[1], esit = a._c.id === bb._c.id && a._c.tur !== bb._c.tur;
            ctx.cevap({ oge: 'hamle-' + hamle, ad: a._c.yuz + ' ↔ ' + bb._c.yuz, yanit: esit ? 'eşleşti' : 'eşleşmedi', dogru: esit, etkilesim: 'matching' });
            if (esit) {
              DO.efekt.dogru();
              a.classList.add('bulundu'); bb.classList.add('bulundu'); acik = []; bulunan++;
              if (bulunan === b.ciftler.length) {
                var max = b.ciftler.length * 10;
                var puan = Math.max(Math.round(max * 0.4), max - yanlisHamle * 3);
                ctx.zaman(function () { ctx.tamamla({ puan: puan }); DO.oyunSonu(ctx, k.govde, { puan: puan, max: max, metin: hamle + ' hamlede bitirdin.' }); }, 800);
              }
            } else {
              yanlisHamle++; kilit = true;
              setTimeout(function () { a.classList.remove('acik'); bb.classList.remove('acik'); acik = []; kilit = false; }, 950);
            }
          }
        };
        izgara.appendChild(d);
      });
      k.govde.appendChild(izgara);
      return {};
    }
  };

  /* =====================================================================
     YOL — her doğru cevapta yolcu bir taş ilerler (SVG yol animasyonu)
     ===================================================================== */
  B.yol = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('adimlar'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: b.rozet || 'Yol', sinif: 'oyun-yol' });
      var n = b.adimlar.length, sira = 0, puan = 0, hata = {};
      var d = 'M120 760 C 330 760, 300 600, 520 610 S 760 760, 930 650 S 1080 470, 1260 500 S 1400 420, 1440 330';
      var svg = DO.svg('svg', { class: 'yol-svg', viewBox: '0 0 1600 900', preserveAspectRatio: 'none' });
      svg.innerHTML =
        '<defs><linearGradient id="yolR" x1="0" x2="1"><stop offset="0" stop-color="#e9c46a"/><stop offset="1" stop-color="#f4d58d"/></linearGradient>' +
        '<radialGradient id="parilti"><stop offset="0" stop-color="#fff6c9"/><stop offset="1" stop-color="#fff6c9" stop-opacity="0"/></radialGradient></defs>' +
        '<path d="M0 640 C 300 560, 500 700, 800 620 S 1300 540, 1600 600 V900 H0z" fill="#dfe8c8"/>' +
        '<path d="M0 760 C 400 700, 700 820, 1000 760 S 1400 700, 1600 740 V900 H0z" fill="#cbdcae"/>' +
        '<path class="yol-zemin" d="' + d + '" fill="none" stroke="#d9b45a" stroke-width="64" stroke-linecap="round"/>' +
        '<path class="yol-ana" d="' + d + '" fill="none" stroke="url(#yolR)" stroke-width="52" stroke-linecap="round"/>' +
        '<path class="yol-dolu" d="' + d + '" fill="none" stroke="#7fb069" stroke-width="14" stroke-linecap="round" stroke-dasharray="6 18"/>' +
        '<g class="yol-hedef" transform="translate(1440 290)"><circle r="120" fill="url(#parilti)"/><rect x="-120" y="-120" width="240" height="84" rx="16" fill="#fffaf0" stroke="#b9852b" stroke-width="5"/>' +
        '<text y="-82" text-anchor="middle" class="yol-hedef-yazi">' + DO.kacis(b.hedef || 'GÜZEL YOL') + '</text><text y="-52" text-anchor="middle" class="yol-hedef-alt">' + DO.kacis(b.hedefAlt || '') + '</text><rect x="-6" y="-36" width="12" height="70" fill="#8a6a3a"/></g>';
      var yolPath = svg.querySelector('.yol-ana'), dolu = svg.querySelector('.yol-dolu');
      var uz = 0;
      var taslar = DO.svg('g'), cicekler = DO.svg('g');
      var yolcu = DO.svg('g', { class: 'yolcu' });
      yolcu.innerHTML = '<ellipse cx="0" cy="34" rx="26" ry="8" fill="#000" opacity=".15"/><path d="M-22 30c0-30 10-46 22-46s22 16 22 46z" fill="#4f7a3a"/><circle cy="-30" r="20" fill="#f2c9a0"/><path d="M-20 -36c4-16 36-16 40 0-8-6-32-6-40 0z" fill="#fffaf0"/><circle cx="-7" cy="-30" r="2.6" fill="#3b2710"/><circle cx="7" cy="-30" r="2.6" fill="#3b2710"/><path d="M-6 -21q6 5 12 0" stroke="#3b2710" stroke-width="2" fill="none" stroke-linecap="round"/>';
      svg.appendChild(taslar); svg.appendChild(cicekler); svg.appendChild(yolcu);
      var sahne = el('div', { class: 'yol-sahne' }, svg);
      var panel = el('div', { class: 'yol-panel' });
      k.govde.appendChild(sahne); k.govde.appendChild(panel);
      requestAnimationFrame(function () {
        uz = yolPath.getTotalLength();
        dolu.style.strokeDasharray = '0 ' + uz; dolu.dataset.uz = uz;
        for (var i = 0; i <= n; i++) {
          var p = yolPath.getPointAtLength(uz * (i / (n + 0.6)));
          taslar.appendChild(DO.svg('ellipse', { cx: p.x, cy: p.y + 6, rx: 34, ry: 16, class: 'yol-tas', 'data-i': i }));
          if (i > 0) taslar.appendChild(DO.svg('text', { x: p.x, y: p.y + 13, 'text-anchor': 'middle', class: 'yol-tas-no', text: i }));
        }
        konum(0, false);
        soru();
      });
      function nokta(i) { return yolPath.getPointAtLength(uz * (i / (n + 0.6))); }
      function konum(i, anim) {
        if (!anim) { var p = nokta(i); yolcu.setAttribute('transform', 'translate(' + p.x + ' ' + (p.y - 30) + ')'); return; }
        var bas = performance.now(), sure = 900, a = (i - 1) / (n + 0.6), son = i / (n + 0.6);
        (function adim(t) {
          var o = Math.min(1, (t - bas) / sure), e = o < .5 ? 2 * o * o : 1 - Math.pow(-2 * o + 2, 2) / 2;
          var L = uz * (a + (son - a) * e), p = yolPath.getPointAtLength(L);
          var zip = Math.sin(o * Math.PI * 3) * 10;
          yolcu.setAttribute('transform', 'translate(' + p.x + ' ' + (p.y - 30 - Math.abs(zip)) + ')');
          dolu.style.strokeDasharray = L + ' ' + uz;
          if (o < 1) requestAnimationFrame(adim);
          else cicek(p);
        })(bas);
      }
      function cicek(p) {
        var g = DO.svg('g', { class: 'yol-cicek', transform: 'translate(' + (p.x + 40) + ' ' + (p.y - 20) + ')' });
        var renk = ['#e76f51', '#e9c46a', '#f4a6c1', '#fff'][sira % 4];
        for (var j = 0; j < 5; j++) g.appendChild(DO.svg('ellipse', { cx: 0, cy: -12, rx: 8, ry: 13, fill: renk, transform: 'rotate(' + (j * 72) + ')' }));
        g.appendChild(DO.svg('circle', { r: 6, fill: '#b9852b' }));
        cicekler.appendChild(g);
        var t = taslar.querySelector('[data-i="' + sira + '"]'); if (t) t.classList.add('gecildi');
      }
      function soru() {
        panel.innerHTML = '';
        if (sira >= n) {
          svg.querySelector('.yol-hedef').classList.add('ulasti');
          ctx.tamamla({ puan: puan });
          ctx.zaman(function () { DO.oyunSonu(ctx, panel, { puan: puan, max: n * 10, baslik: b.sonBaslik || 'Güzel yolun sonuna ulaştın!', metin: b.sonMetin }); }, 700);
          return;
        }
        var s = b.adimlar[sira], bas = Date.now();
        var kart = el('div', { class: 'yol-soru' }, [el('span', { class: 'soru-no', text: (sira + 1) + '. taş' }), el('h3', { text: s.soru })]);
        var sec = el('div', { class: 'yol-secenek' });
        DO.karistir(s.secenekler.map(function (m, i) { return { m: m, i: i }; })).forEach(function (o) {
          sec.appendChild(el('button', { class: 'secenek', text: o.m, onclick: function () {
            var dogru = o.i === s.dogru, ilk = !hata[sira];
            ctx.cevap({ oge: s.id || ('adim' + sira), ad: s.soru, yanit: o.m, dogru: dogru, dogruYanit: s.secenekler[s.dogru], puan: dogru && ilk ? 10 : 0, max: 10, sureMs: Date.now() - bas, deneme: (hata[sira] || 0) + 1 });
            if (dogru) {
              if (ilk) puan += 10;
              DO.efekt.dogru();
              this.classList.add('dogru');
              sec.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
              kart.appendChild(el('p', { class: 'yol-aciklama', text: s.aciklama || '' }));
              sira++;
              konum(sira, true);
              ctx.zaman(soru, 1900);
            } else {
              hata[sira] = (hata[sira] || 0) + 1;
              DO.efekt.yanlis();
              this.classList.add('yanlis'); this.disabled = true;
              yolcu.classList.add('salla'); setTimeout(function () { yolcu.classList.remove('salla'); }, 500);
              ctx.bildir(s.ipucu || 'Yol bu taraftan değil; bir daha düşün.', 'uyari');
            }
          } }));
        });
        kart.appendChild(sec);
        panel.appendChild(kart);
      }
      return {};
    }
  };

  /* =====================================================================
     GÖSTERGE — huşû/sevap göstergesi: doğru kararla ibre yükselir
     ===================================================================== */
  B.gosterge = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('durumlar'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: b.rozet || 'Gösterge', sinif: 'oyun-gosterge' });
      var liste = DO.karistir(b.durumlar), sira = 0, puan = 0, deger = 60;
      var svg = DO.svg('svg', { class: 'gosterge-svg', viewBox: '0 0 600 360' });
      var dilim = '', renkler = ['#c0392b', '#e8962e', '#e9c46a', '#a7c957', '#4f7a3a'];
      for (var i = 0; i < 5; i++) {
        var a0 = Math.PI + i * Math.PI / 5, a1 = Math.PI + (i + 1) * Math.PI / 5;
        dilim += '<path d="M' + (300 + Math.cos(a0) * 250) + ' ' + (300 + Math.sin(a0) * 250) + ' A250 250 0 0 1 ' + (300 + Math.cos(a1) * 250) + ' ' + (300 + Math.sin(a1) * 250) +
          ' L' + (300 + Math.cos(a1) * 170) + ' ' + (300 + Math.sin(a1) * 170) + ' A170 170 0 0 0 ' + (300 + Math.cos(a0) * 170) + ' ' + (300 + Math.sin(a0) * 170) + 'z" fill="' + renkler[i] + '"/>';
      }
      svg.innerHTML = '<path d="M40 300 A260 260 0 0 1 560 300" fill="none" stroke="#fffaf0" stroke-width="30" stroke-linecap="round"/>' + dilim +
        '<g class="ibre"><path d="M300 300 L294 300 L300 90 L306 300z" fill="#3b2710"/><circle cx="300" cy="300" r="22" fill="#3b2710"/><circle cx="300" cy="300" r="8" fill="#e9b949"/></g>' +
        '<text x="300" y="350" text-anchor="middle" class="gosterge-ad">' + DO.kacis(b.gosterge || 'Huşû') + '</text>';
      var ibre = svg.querySelector('.ibre');
      var sol = el('div', { class: 'gosterge-sol' }, [svg, el('div', { class: 'gosterge-deger' })]);
      var sag = el('div', { class: 'gosterge-sag' });
      k.govde.appendChild(sol); k.govde.appendChild(sag);
      function ibreYaz() {
        var aci = -90 + deger / 100 * 180;
        ibre.style.transform = 'rotate(' + aci + 'deg)';
        sol.querySelector('.gosterge-deger').textContent = (b.gosterge || 'Huşû') + ': %' + Math.round(deger);
      }
      ibreYaz();
      function kart() {
        sag.innerHTML = '';
        if (sira >= liste.length) {
          ctx.tamamla({ puan: puan });
          DO.oyunSonu(ctx, sag, { puan: puan, max: liste.length * 10, metin: b.sonMetin });
          return;
        }
        var s = liste[sira], bas = Date.now();
        var kk = el('div', { class: 'gosterge-kart' }, [
          el('span', { class: 'soru-no', text: (sira + 1) + ' / ' + liste.length }),
          el('h3', { text: s.metin })
        ]);
        var dug = el('div', { class: 'gosterge-dug' });
        b.secenekler.forEach(function (o) {
          dug.appendChild(el('button', { class: 'secenek ' + (o.sinif || ''), html: (o.ikon || '') + '<span>' + DO.kacis(o.ad) + '</span>', onclick: function () {
            var dogru = o.deger === s.cevap, p = dogru ? 10 : 0;
            puan += p;
            deger = Math.max(5, Math.min(100, deger + (dogru ? 9 : -18)));
            ibreYaz();
            (dogru ? DO.efekt.dogru : DO.efekt.yanlis)();
            if (!dogru) { svg.classList.add('salla'); setTimeout(function () { svg.classList.remove('salla'); }, 500); }
            var dogruSec = b.secenekler.find(function (x) { return x.deger === s.cevap; });
            ctx.cevap({ oge: s.id, ad: s.metin, yanit: o.ad, dogru: dogru, dogruYanit: dogruSec.ad, puan: p, max: 10, sureMs: Date.now() - bas });
            dug.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
            this.classList.add(dogru ? 'dogru' : 'yanlis');
            geriBildirim(kk, dogru, s.aciklama);
            kk.appendChild(el('button', { class: 'dug ana devam', text: 'Sonraki →', onclick: function () { sira++; kart(); } }));
          } }));
        });
        kk.appendChild(dug);
        sag.appendChild(kk);
      }
      kart();
      return {};
    }
  };

  /* =====================================================================
     KİLİT — her doğru kararla kilidin bir dişi açılır
     ===================================================================== */
  B.kilit = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('durumlar'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: b.rozet || 'Kilit', sinif: 'oyun-kilit' });
      var liste = DO.karistir(b.durumlar), n = liste.length, sira = 0, puan = 0, hata = {};
      var svg = DO.svg('svg', { class: 'kilit-svg', viewBox: '0 0 400 480' });
      var disler = '';
      for (var i = 0; i < n; i++) {
        var a = Math.PI * (0.15 + 0.7 * i / Math.max(1, n - 1));
        disler += '<circle class="dis" data-i="' + i + '" cx="' + (200 - Math.cos(a) * 110).toFixed(1) + '" cy="' + (330 + Math.sin(a) * 55 - 30).toFixed(1) + '" r="17"/>';
      }
      svg.innerHTML =
        '<path class="kilit-kanca" d="M110 220 V140 a90 90 0 0 1 180 0 V220" fill="none" stroke="#8d7b66" stroke-width="34" stroke-linecap="round"/>' +
        '<path class="kilit-kanca-ic" d="M110 220 V140 a90 90 0 0 1 180 0 V220" fill="none" stroke="#b8a68f" stroke-width="12" stroke-linecap="round"/>' +
        '<rect x="40" y="200" width="320" height="250" rx="40" fill="#c0392b"/><rect x="40" y="200" width="320" height="250" rx="40" fill="url(#kilitParilti)"/>' +
        '<defs><linearGradient id="kilitParilti" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient></defs>' +
        '<circle cx="200" cy="300" r="34" fill="#7a1f16"/><rect x="190" y="300" width="20" height="60" rx="8" fill="#7a1f16"/>' + disler;
      var sol = el('div', { class: 'kilit-sol' }, [svg, el('p', { class: 'kilit-durum', text: '0 / ' + n + ' diş açıldı' })]);
      var sag = el('div', { class: 'kilit-sag' });
      k.govde.appendChild(sol); k.govde.appendChild(sag);
      function kart() {
        sag.innerHTML = '';
        if (sira >= n) {
          svg.classList.add('acildi'); DO.efekt.kilit();
          ctx.tamamla({ puan: puan });
          ctx.zaman(function () { DO.oyunSonu(ctx, sag, { puan: puan, max: n * 10, baslik: b.sonBaslik || 'Kilit açıldı!', metin: b.sonMetin }); }, 900);
          return;
        }
        var s = liste[sira], bas = Date.now();
        var kk = el('div', { class: 'kilit-kart' }, [el('span', { class: 'soru-no', text: 'Durum ' + (sira + 1) + ' / ' + n }), el('h3', { text: s.metin })]);
        var dug = el('div', { class: 'kilit-dug' });
        b.secenekler.forEach(function (o) {
          dug.appendChild(el('button', { class: 'secenek karar', style: { '--r': o.renk }, html: '<b>' + DO.kacis(o.ad) + '</b><small>' + DO.kacis(o.alt || '') + '</small>', onclick: function () {
            var dogru = o.id === s.cevap, ilk = !hata[sira];
            var dogruSec = b.secenekler.find(function (x) { return x.id === s.cevap; });
            ctx.cevap({ oge: s.id, ad: s.metin, yanit: o.ad + ' (' + (o.alt || '') + ')', dogru: dogru, dogruYanit: dogruSec.ad, puan: dogru && ilk ? 10 : 0, max: 10, sureMs: Date.now() - bas, deneme: (hata[sira] || 0) + 1 });
            var dis = svg.querySelector('.dis[data-i="' + sira + '"]');
            if (dogru) {
              if (ilk) puan += 10;
              DO.efekt.kilit();
              dis.classList.add('acik');
              dug.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
              this.classList.add('dogru');
              sol.querySelector('.kilit-durum').textContent = (sira + 1) + ' / ' + n + ' diş açıldı';
              geriBildirim(kk, true, s.aciklama);
              kk.appendChild(el('button', { class: 'dug ana devam', text: 'Sonraki →', onclick: function () { sira++; kart(); } }));
            } else {
              hata[sira] = (hata[sira] || 0) + 1;
              DO.efekt.yanlis();
              this.classList.add('yanlis'); this.disabled = true;
              dis.classList.add('hata'); svg.classList.add('salla');
              setTimeout(function () { dis.classList.remove('hata'); svg.classList.remove('salla'); }, 600);
              ctx.bildir(s.ipucu || 'Bu durumda ibadete ne olur? Bir daha düşün.', 'uyari');
            }
          } }));
        });
        kk.appendChild(dug);
        sag.appendChild(kk);
      }
      kart();
      return {};
    }
  };

  /* =====================================================================
     HIZ TURU — süreli tekrar; canlı derste sınıf sıralaması
     ===================================================================== */
  B.hizTuru = {
    zorunlu: true, xapiTur: 'assessment', max: onAdet('sorular'),
    ciz: function (ctx) {
      var b = ctx.blok, k = DO.oyunKabuk(ctx, { rozet: '⏱ Hız turu', sinif: 'oyun-hiz' });
      var sure = b.sure || 10, sira = 0, puan = 0, liste = DO.karistir(b.sorular), zaman = null;
      var skorlar = {}; // ad -> puan (canlı)
      var sahne = el('div', { class: 'hiz-sahne' });
      var tablo = el('div', { class: 'hiz-tablo' });
      k.govde.appendChild(sahne); k.govde.appendChild(tablo);
      ctx.dinle('cevap', function (m) {
        if (m.veri.blok !== b.id) return;
        skorlar[m.gonderen.ad] = (skorlar[m.gonderen.ad] || 0) + (m.veri.puan || 0);
        tabloYaz();
      });
      function tabloYaz() {
        var satirlar = Object.keys(skorlar).map(function (ad) { return { ad: ad, p: skorlar[ad] }; });
        if (ctx.rol !== 'ogretmen') satirlar.push({ ad: (DO.Kayit.ogrenci.ad || 'Ben') + ' (sen)', p: puan, ben: true });
        satirlar.sort(function (a, c) { return c.p - a.p; });
        tablo.innerHTML = '';
        tablo.appendChild(el('h4', { text: DO.Canli.acik ? 'Sınıf sıralaması' : 'Puanın' }));
        satirlar.forEach(function (s, i) {
          tablo.appendChild(el('div', { class: 'hiz-satir' + (s.ben ? ' ben' : '') }, [el('span', { text: (i + 1) + '. ' + s.ad }), el('b', { text: s.p })]));
        });
      }
      function giris() {
        sahne.innerHTML = '';
        var g = el('div', { class: 'hiz-giris' }, [
          el('h3', { text: liste.length + ' soru · her biri ' + sure + ' saniye' }),
          el('p', { text: 'Hızlı ve doğru cevap daha çok puan getirir.' }),
          el('button', { class: 'dug ana buyuk', text: 'Hazırım, başlat!', onclick: geriSayim })
        ]);
        sahne.appendChild(g);
        tabloYaz();
      }
      function geriSayim() {
        var n = 3; sahne.innerHTML = '';
        var s = el('div', { class: 'hiz-sayim', text: n }); sahne.appendChild(s);
        DO.efekt.tik();
        var t = ctx.aralik(function () {
          n--;
          if (n > 0) { s.textContent = n; s.classList.remove('vur'); void s.offsetWidth; s.classList.add('vur'); DO.efekt.tik(); }
          else { clearInterval(t); soru(); }
        }, 800);
      }
      function soru() {
        clearInterval(zaman);
        if (sira >= liste.length) {
          ctx.tamamla({ puan: puan });
          tabloYaz();
          DO.oyunSonu(ctx, sahne, { puan: puan, max: liste.length * 10, metin: 'Hız turunu bitirdin.', tekrar: function () { sira = 0; puan = 0; liste = DO.karistir(b.sorular); giris(); } });
          return;
        }
        var s = liste[sira], bas = Date.now(), bitti = false;
        sahne.innerHTML = '';
        var halka = DO.svg('svg', { class: 'hiz-halka', viewBox: '0 0 120 120' });
        halka.innerHTML = '<circle cx="60" cy="60" r="52" fill="#fffaf0" stroke="#eadfc8" stroke-width="10"/><circle class="hiz-iz" cx="60" cy="60" r="52" fill="none" stroke="#4f7a3a" stroke-width="10" stroke-linecap="round" stroke-dasharray="327" stroke-dashoffset="0" transform="rotate(-90 60 60)"/><text x="60" y="72" text-anchor="middle" class="hiz-kalan">' + sure + '</text>';
        var kart = el('div', { class: 'hiz-kart' }, [el('div', { class: 'hiz-ust' }, [el('span', { class: 'soru-no', text: (sira + 1) + ' / ' + liste.length }), halka]), el('h3', { text: s.metin })]);
        var dug = el('div', { class: 'hiz-dug' });
        s.secenekler.forEach(function (o, i) {
          dug.appendChild(el('button', { class: 'secenek hiz-sec s' + i, text: o, onclick: function () { cevap(i, this); } }));
        });
        kart.appendChild(dug);
        sahne.appendChild(kart);
        var iz = halka.querySelector('.hiz-iz'), yazi = halka.querySelector('.hiz-kalan');
        zaman = ctx.aralik(function () {
          var kalan = Math.max(0, sure - (Date.now() - bas) / 1000);
          iz.style.strokeDashoffset = (327 * (1 - kalan / sure)).toFixed(1);
          iz.style.stroke = kalan < sure * 0.3 ? '#c0392b' : kalan < sure * 0.6 ? '#e8962e' : '#4f7a3a';
          yazi.textContent = Math.ceil(kalan);
          if (kalan <= 0) cevap(-1, null);
        }, 100);
        function cevap(i, dugme) {
          if (bitti) return; bitti = true; clearInterval(zaman);
          var dogru = i === s.dogru, gecen = (Date.now() - bas) / 1000;
          var p = dogru ? Math.round(5 + 5 * Math.max(0, sure - gecen) / sure) : 0;
          puan += p;
          (dogru ? DO.efekt.dogru : DO.efekt.yanlis)();
          dug.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
          if (dugme) dugme.classList.add(dogru ? 'dogru' : 'yanlis');
          dug.children[s.dogru].classList.add('dogru');
          ctx.cevap({ oge: s.id || ('h' + sira), ad: s.metin, yanit: i < 0 ? '(süre doldu)' : s.secenekler[i], dogru: dogru, dogruYanit: s.secenekler[s.dogru], puan: p, max: 10, sureMs: Date.now() - bas });
          tabloYaz();
          kart.appendChild(el('p', { class: 'hiz-sonuc ' + (dogru ? 'd' : 'y'), text: dogru ? '+' + p + ' puan' : (i < 0 ? 'Süre doldu' : 'Yanlış') + ' — doğrusu: ' + s.secenekler[s.dogru] }));
          ctx.zaman(function () { sira++; soru(); }, dogru ? 1100 : 2000);
        }
      }
      giris();
      return { temizle: function () { clearInterval(zaman); } };
    }
  };
})();
