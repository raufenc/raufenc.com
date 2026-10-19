/* Oyunlar — Duyduğunu Seç, Harf Eşleştirme, Balon Patlat */
(function () {
  'use strict';
  var SES = '../app/assets/assets/sounds/';
  var ADLAR = { 'ا': 'Elif', 'ب': 'Be', 'ت': 'Te', 'ث': 'Se', 'ج': 'Cim', 'ح': 'Ha', 'خ': 'Hı', 'د': 'Dal', 'ذ': 'Zel', 'ر': 'Ra', 'ز': 'Ze', 'س': 'Sin', 'ش': 'Şın', 'ص': 'Sad', 'ض': 'Dad', 'ط': 'Tı', 'ظ': 'Zı', 'ع': 'Ayn', 'غ': 'Gayn', 'ف': 'Fe', 'ق': 'Kaf', 'ك': 'Kef', 'ل': 'Lam', 'م': 'Mim', 'ن': 'Nun', 'هـ': 'He', 'ه': 'He', 'و': 'Vav', 'ي': 'Ye', 'لا': 'Lamelif' };
  var efekt = new Audio(), ses = new Audio();
  function cal(a, yol) { a.src = SES + yol + '.mp3'; var p = a.play(); if (p && p.catch) p.catch(function () {}); }
  function ef(ad) { cal(efekt, 'efektler/' + ad); }
  function oku(k, v) { try { var x = localStorage.getItem('ko.oyun.' + k); return x === null ? v : x; } catch (e) { return v; } }
  function yaz(k, v) { try { localStorage.setItem('ko.oyun.' + k, v); } catch (e) {} }
  function karistir(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function rastgele(a) { return a[Math.floor(Math.random() * a.length)]; }
  function yildiz(oran) { var n = oran >= .9 ? 3 : oran >= .7 ? 2 : oran >= .5 ? 1 : 0; return '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n); }
  function metin(el, t) { el.textContent = t; }

  var DERSLER = [];
  fetch('../sinif/dersler.json').then(function (r) { return r.json(); }).then(function (d) {
    DERSLER = d.filter(function (l) { return l.items && l.items.length >= 6 && l.n !== 17; });
    ['duyDers', 'balonDers'].forEach(function (id) {
      var s = document.getElementById(id);
      DERSLER.forEach(function (l) { var o = document.createElement('option'); o.value = l.n; o.textContent = l.n + '. ' + l.title; s.appendChild(o); });
      var k = oku(id, ''); if (k && s.querySelector('option[value="' + k + '"]')) s.value = k;
      s.addEventListener('change', function () { yaz(id, s.value); enIyiGoster(); });
    });
    enIyiGoster();
  }).catch(function () { metin(document.getElementById('duyDurum'), 'Ders verisi yüklenemedi; bağlantınızı kontrol edin.'); });
  function ders(id) { var n = parseInt(document.getElementById(id).value, 10); for (var i = 0; i < DERSLER.length; i++) if (DERSLER[i].n === n) return DERSLER[i]; return DERSLER[0]; }
  function enIyiGoster() {
    var d1 = document.getElementById('duyDers').value, d3 = document.getElementById('balonDers').value;
    var a = oku('duy.' + d1, ''), b = oku('es.' + document.getElementById('esAdet').value, ''), c = oku('balon.' + d3, '');
    metin(document.getElementById('duyEnIyi'), a ? 'En iyi: ' + a + ' / 10' : '');
    metin(document.getElementById('esEnIyi'), b ? 'En az hamle: ' + b : '');
    metin(document.getElementById('balonEnIyi'), c ? 'En iyi: ' + c + ' balon' : '');
  }
  document.getElementById('esAdet').addEventListener('change', enIyiGoster);

  /* ── Duyduğunu Seç ── */
  (function () {
    var alan = document.getElementById('duyAlan'), kartlar = document.getElementById('duyKartlar'), sonuc = document.getElementById('duySonuc'), durum = document.getElementById('duyDurum');
    var sira = [], i = 0, puan = 0, hedef = null, kilit = false, dersAd = '';
    function basla() {
      var d = ders('duyDers'); if (!d) return; dersAd = d.n;
      sira = karistir(d.items).slice(0, 10); i = 0; puan = 0; alan.hidden = false; sonuc.hidden = true; metin(durum, ''); soru();
      alan.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function soru() {
      hedef = sira[i]; kilit = false;
      metin(document.getElementById('duySoru'), 'Soru ' + (i + 1) + ' / 10'); metin(document.getElementById('duyPuan'), 'Puan ' + puan);
      var d = ders('duyDers'); var havuz = d.items.filter(function (x) { return x.ar !== hedef.ar; });
      var secenekler = karistir([hedef].concat(karistir(havuz).slice(0, 3)));
      kartlar.innerHTML = '';
      secenekler.forEach(function (x) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'kart'; b.innerHTML = '<span class="ar" lang="ar"></span>'; b.querySelector('.ar').textContent = x.ar; b.setAttribute('aria-label', 'Seçenek: ' + x.ar);
        b.addEventListener('click', function () { cevap(x, b); }); kartlar.appendChild(b);
      });
      setTimeout(function () { cal(ses, hedef.dir + '/' + hedef.ses); }, 250);
    }
    function cevap(x, b) {
      if (kilit) return;
      if (x.ar === hedef.ar) {
        kilit = true; puan++; b.classList.add('dogru'); ef('dogru'); metin(durum, 'Doğru.');
        Array.prototype.forEach.call(kartlar.children, function (k) { k.disabled = true; });
        setTimeout(function () { i++; if (i < sira.length) soru(); else bitir(); }, 900);
      } else { b.classList.add('yanlis'); b.disabled = true; ef('yanlis'); metin(durum, 'Bu değil; tekrar dinleyip deneyin.'); setTimeout(function () { cal(ses, hedef.dir + '/' + hedef.ses); }, 500); }
    }
    function bitir() {
      alan.hidden = true; sonuc.hidden = false; ef(puan >= 9 ? 'game_win' : 'level_complete');
      var eski = parseInt(oku('duy.' + dersAd, '0'), 10); if (puan > eski) yaz('duy.' + dersAd, puan);
      sonuc.innerHTML = '<strong>' + puan + ' / 10 doğru</strong><span class="yildizlar" aria-label="' + puan + ' puan">' + yildiz(puan / 10) + '</span><span>' + (puan >= 9 ? 'Mâşâallah, çok iyi.' : puan >= 7 ? 'Güzel; biraz daha dinleyince tamam olur.' : 'Dersi bir daha dinleyip yeniden deneyin.') + (puan > eski && eski ? ' Yeni en iyi sonucunuz.' : '') + '</span><button type="button" class="btn btn--emerald" id="duyTekrar">Yeniden oyna</button>';
      document.getElementById('duyTekrar').addEventListener('click', basla); enIyiGoster();
    }
    document.getElementById('duyBasla').addEventListener('click', basla);
    document.getElementById('duyDinle').addEventListener('click', function () { if (hedef) cal(ses, hedef.dir + '/' + hedef.ses); });
  })();

  /* ── Harf Eşleştirme ── */
  (function () {
    var alan = document.getElementById('esAlan'), kartlar = document.getElementById('esKartlar'), sonuc = document.getElementById('esSonuc'), durum = document.getElementById('esDurum');
    var acik = [], hamle = 0, kalan = 0, kilit = false, adet = 8;
    var HARFLER = Object.keys(ADLAR).filter(function (h) { return h !== 'ه'; });
    function sesAdi(ar) { var d = DERSLER[0]; if (d) for (var i = 0; i < d.items.length; i++) if (d.items[i].ar === ar) return d.items[i].dir + '/' + d.items[i].ses; return null; }
    function basla() {
      adet = parseInt(document.getElementById('esAdet').value, 10); hamle = 0; kalan = adet; acik = []; kilit = false;
      var secim = karistir(HARFLER).slice(0, adet); var deste = [];
      secim.forEach(function (h) { deste.push({ h: h, tip: 'ar' }); deste.push({ h: h, tip: 'ad' }); });
      kartlar.innerHTML = ''; alan.hidden = false; sonuc.hidden = true; metin(durum, ''); guncelle();
      karistir(deste).forEach(function (k) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'es-kart'; b.setAttribute('aria-label', 'Kapalı kart');
        b.innerHTML = '<span class="es-ic"><span class="es-on" aria-hidden="true">۞</span><span class="es-arka' + (k.tip === 'ar' ? ' ar" lang="ar' : '') + '"></span></span>';
        b.querySelector('.es-arka').textContent = k.tip === 'ar' ? k.h : ADLAR[k.h];
        b.addEventListener('click', function () { ac(b, k); }); kartlar.appendChild(b);
      });
      alan.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function guncelle() { metin(document.getElementById('esHamle'), 'Hamle ' + hamle); metin(document.getElementById('esKalan'), 'Kalan ' + kalan); }
    function ac(b, k) {
      if (kilit || b.classList.contains('acik') || b.classList.contains('bulundu')) return;
      b.classList.add('acik'); b.setAttribute('aria-label', k.tip === 'ar' ? 'Harf: ' + k.h : 'Ad: ' + ADLAR[k.h]); acik.push({ b: b, k: k });
      if (acik.length < 2) return;
      hamle++; guncelle(); kilit = true;
      var a = acik[0], c = acik[1];
      if (a.k.h === c.k.h && a.k.tip !== c.k.tip) {
        a.b.classList.add('bulundu'); c.b.classList.add('bulundu'); kalan--; guncelle(); var y = sesAdi(a.k.h); if (y) cal(ses, y); else ef('dogru');
        metin(durum, ADLAR[a.k.h] + ' harfi eşleşti.'); acik = []; kilit = false; if (!kalan) bitir();
      } else {
        a.b.classList.add('yanlis'); c.b.classList.add('yanlis'); ef('yanlis');
        setTimeout(function () { [a, c].forEach(function (x) { x.b.classList.remove('acik', 'yanlis'); x.b.setAttribute('aria-label', 'Kapalı kart'); }); acik = []; kilit = false; }, 900);
      }
    }
    function bitir() {
      ef('game_win'); setTimeout(function () { alan.hidden = true; sonuc.hidden = false; }, 700);
      var eski = parseInt(oku('es.' + adet, '0'), 10); if (!eski || hamle < eski) yaz('es.' + adet, hamle);
      var oran = adet / hamle;
      sonuc.innerHTML = '<strong>' + hamle + ' hamlede tamamlandı</strong><span class="yildizlar">' + yildiz(oran >= .7 ? .95 : oran >= .5 ? .75 : .55) + '</span><span>' + (hamle <= adet + 2 ? 'Mâşâallah, hafızanız çok iyi.' : 'Güzel; daha az hamleyle bitirmeyi deneyin.') + '</span><button type="button" class="btn btn--emerald" id="esTekrar">Yeniden oyna</button>';
      document.getElementById('esTekrar').addEventListener('click', basla); enIyiGoster();
    }
    document.getElementById('esBasla').addEventListener('click', basla);
  })();

  /* ── Balon Patlat ── */
  (function () {
    var alan = document.getElementById('balonAlan'), sahne = document.getElementById('balonSahne'), sonuc = document.getElementById('balonSonuc'), durum = document.getElementById('balonDurum');
    var RENKLER = ['#f6c3c3', '#f9dfa8', '#c9e7d4', '#c7dcf4', '#e6d0f2', '#ffe3b3'];
    var hedef = null, puan = 0, kalan = 60, sayac = null, uretici = null, d = null, aktif = false, dersAd = '';
    function basla() {
      d = ders('balonDers'); if (!d) return; dersAd = d.n; puan = 0; kalan = 60; aktif = true;
      alan.hidden = false; sonuc.hidden = true; sahne.innerHTML = '<span class="balon-ipucu" id="balonIpucu">Dinleyin…</span>'; sahne.classList.remove('bitti'); metin(durum, '');
      metin(document.getElementById('balonPuan'), 'Puan 0'); metin(document.getElementById('balonSure'), '60 sn');
      yeniHedef(); clearInterval(sayac); clearInterval(uretici);
      sayac = setInterval(function () { kalan--; metin(document.getElementById('balonSure'), kalan + ' sn'); if (kalan <= 0) bitir(); }, 1000);
      uretici = setInterval(uret, 1100); uret(); setTimeout(uret, 400);
      alan.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function yeniHedef() { hedef = rastgele(d.items); cal(ses, hedef.dir + '/' + hedef.ses); var ip = document.getElementById('balonIpucu'); if (ip) ip.textContent = 'Duyduğunuz harfi patlatın'; }
    function uret() {
      if (!aktif) return;
      var hedefVar = sahne.querySelector('.balon[data-hedef="1"]');
      var x = Math.random() < .35 || !hedefVar ? hedef : rastgele(d.items);
      var b = document.createElement('button'); b.type = 'button'; b.className = 'balon'; b.setAttribute('lang', 'ar'); b.textContent = x.ar; b.setAttribute('aria-label', 'Balon: ' + x.ar);
      if (x.ar === hedef.ar) b.setAttribute('data-hedef', '1');
      var gen = sahne.clientWidth || 600; b.style.left = Math.floor(Math.random() * Math.max(1, gen - 110)) + 'px';
      b.style.background = 'radial-gradient(circle at 35% 30%, #fff 0, ' + rastgele(RENKLER) + ' 55%)';
      b.style.setProperty('--sure', (6 + Math.random() * 4).toFixed(1) + 's'); b.style.setProperty('--yol', (sahne.clientHeight + 180) + 'px');
      b.addEventListener('animationend', function () { b.remove(); });
      b.addEventListener('pointerdown', function (e) { e.preventDefault(); pat(b, x); });
      b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pat(b, x); } });
      sahne.appendChild(b);
    }
    function pat(b, x) {
      if (!aktif || b.classList.contains('pat')) return;
      if (x.ar === hedef.ar) {
        puan++; metin(document.getElementById('balonPuan'), 'Puan ' + puan); ef('balon_patlama'); b.classList.add('pat'); setTimeout(function () { b.remove(); }, 200);
        Array.prototype.forEach.call(sahne.querySelectorAll('.balon[data-hedef="1"]'), function (o) { o.removeAttribute('data-hedef'); });
        metin(durum, 'Doğru: ' + x.ar); setTimeout(yeniHedef, 600);
      } else { ef('yanlis'); b.classList.add('yanlis'); metin(durum, 'Bu değil; sesi tekrar dinleyin.'); }
    }
    function bitir() {
      aktif = false; clearInterval(sayac); clearInterval(uretici); sahne.classList.add('bitti'); ef(puan >= 10 ? 'game_win' : 'oyun_bitti');
      var eski = parseInt(oku('balon.' + dersAd, '0'), 10); if (puan > eski) yaz('balon.' + dersAd, puan);
      sonuc.hidden = false;
      sonuc.innerHTML = '<strong>' + puan + ' balon</strong><span class="yildizlar">' + yildiz(puan >= 14 ? .95 : puan >= 9 ? .75 : puan >= 5 ? .55 : .2) + '</span><span>' + (puan >= 14 ? 'Mâşâallah, kulağınız çok iyi.' : puan >= 9 ? 'Güzel; biraz daha hızlanabilirsiniz.' : 'Sesleri dersten bir daha dinleyip yeniden deneyin.') + (puan > eski && eski ? ' Yeni en iyi sonucunuz.' : '') + '</span><button type="button" class="btn btn--emerald" id="balonTekrar">Yeniden oyna</button>';
      document.getElementById('balonTekrar').addEventListener('click', basla); enIyiGoster();
    }
    document.getElementById('balonBasla').addEventListener('click', basla);
    document.getElementById('balonDinle').addEventListener('click', function () { if (hedef) cal(ses, hedef.dir + '/' + hedef.ses); });
    document.addEventListener('visibilitychange', function () { if (document.hidden && aktif) bitir(); });
  })();
})();
