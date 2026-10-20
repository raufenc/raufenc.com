/* Ses kontrol — dinle, karar ver, kararları kopyala */
(function () {
  'use strict';
  var KOK = '../app/assets/assets/'; var ses = new Audio(); var aktif = null; var sira = null;
  var satirlar = Array.prototype.slice.call(document.querySelectorAll('.ses-tablo tbody tr'));
  function oku(k) { try { return localStorage.getItem('ko.seskontrol.' + k) || ''; } catch (e) { return ''; } }
  function yaz(k, v) { try { if (v) localStorage.setItem('ko.seskontrol.' + k, v); else localStorage.removeItem('ko.seskontrol.' + k); } catch (e) {} }
  function cal(tr) {
    if (aktif) aktif.classList.remove('caliyor');
    aktif = tr; tr.classList.add('caliyor'); ses.src = KOK + tr.getAttribute('data-dosya');
    var p = ses.play(); if (p && p.catch) p.catch(function () { tr.classList.remove('caliyor'); });
    tr.scrollIntoView({ block: 'nearest' });
  }
  ses.addEventListener('ended', function () {
    if (aktif) aktif.classList.remove('caliyor');
    if (sira !== null) { var gorunur = satirlar.filter(function (r) { return !r.hidden; }); var i = gorunur.indexOf(aktif); if (i >= 0 && i + 1 < gorunur.length) { setTimeout(function () { cal(gorunur[i + 1]); }, 500); return; } sira = null; }
    aktif = null;
  });
  document.addEventListener('click', function (e) { var b = e.target.closest('.cal[data-ses]'); if (b) { sira = null; cal(b.closest('tr')); } });
  document.getElementById('sirayla').addEventListener('click', function () { var g = satirlar.filter(function (r) { return !r.hidden; }); if (g.length) { sira = true; cal(g[0]); } });
  var suzgec = document.getElementById('suzgec');
  suzgec.addEventListener('change', function () { satirlar.forEach(function (r) { r.hidden = !!suzgec.value && r.getAttribute('data-sinif') !== suzgec.value; }); });
  function kararMetni() {
    var s = [];
    satirlar.forEach(function (r) { var v = r.querySelector('.karar').value; if (v) s.push(r.getAttribute('data-dosya').replace('sounds/', '') + ' — ' + r.querySelector('.karar option:checked').textContent + ' — ' + r.children[1].textContent.trim()); });
    document.getElementById('kararMetni').textContent = s.length ? s.join('\n') : 'Henüz karar yok.';
  }
  satirlar.forEach(function (r) { var sel = r.querySelector('.karar'); sel.value = oku(r.getAttribute('data-dosya')); sel.addEventListener('change', function () { yaz(r.getAttribute('data-dosya'), sel.value); kararMetni(); }); });
  kararMetni();
  document.getElementById('kopyala').addEventListener('click', function () { var t = document.getElementById('kararMetni').textContent; if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { document.getElementById('kopyala').textContent = 'Kopyalandı'; }); });
  document.getElementById('temizle').addEventListener('click', function () { satirlar.forEach(function (r) { yaz(r.getAttribute('data-dosya'), ''); r.querySelector('.karar').value = ''; }); kararMetni(); });
})();
