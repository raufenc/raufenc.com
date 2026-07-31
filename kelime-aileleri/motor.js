/* ============================================================
   Kelime Aileleri — ortak oyun motoru
   Dört site bu dosyayı paylaşır. Seriye özgü her şey data.js
   içindeki window.KA nesnesinden gelir.

   Oyunlar tek kişilik ve çok kişilik (tek cihazda sıra sende)
   olarak çalışır; sınıf modu üçüncü bir görünümdür.
   ============================================================ */
(function () {
'use strict';

var KA = window.KA;
var SATINAL = 'https://hediyekitap.com/';

/* ── Durum ────────────────────────────────────────────────── */
var ANAHTAR = 'ka-' + KA.kod;
var D = yukle();

function yukle() {
  var bos = { xp: 0, rozetler: [], oynanan: {}, enIyi: {}, kilitliVeri: null, gunluk: null, gunlukSeri: 0 };
  try {
    var h = JSON.parse(localStorage.getItem(ANAHTAR) || '{}');
    for (var k in bos) if (!(k in h)) h[k] = bos[k];
    return h;
  } catch (e) { return bos; }
}
function kaydet() {
  try { localStorage.setItem(ANAHTAR, JSON.stringify(D)); } catch (e) {}
}

/* ── Yardımcılar ──────────────────────────────────────────── */
var $ = function (s, k) { return (k || document).querySelector(s); };
function el(tag, sinif, ic) {
  var e = document.createElement(tag);
  if (sinif) e.className = sinif;
  if (ic != null) e.innerHTML = ic;
  return e;
}
function kacir(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function karistir(a) {
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function rast(a) { return a[Math.floor(Math.random() * a.length)]; }
function sec(a, n) { return karistir(a).slice(0, n); }

/* Türkçe duyarlı sadeleştirme — yazım denetimi için */
function sade(s) {
  return String(s == null ? '' : s)
    .replace(/[İI]/g, 'i').replace(/[Iı]/g, 'i')
    .toLocaleLowerCase('tr')
    .replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u')
    .replace(/ê/g, 'e').replace(/ô/g, 'o')
    .replace(/[^a-zçğıöşü0-9]/g, '');
}

/* Günlük tohum — tarihe bağlı ama rastgele görünen sayı */
function gunTohum() {
  var d = new Date();
  var s = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  var x = (s * 2654435761) % 4294967296;
  return { anahtar: String(s), deger: x };
}

/* ── Kart havuzu ──────────────────────────────────────────── */
function kartlar() {
  return KA.acik.concat(D.kilitliVeri || []);
}
function kilitAcik() { return !!(D.kilitliVeri && D.kilitliVeri.length); }
function kelimeler() {
  var r = [];
  kartlar().forEach(function (k) {
    k.w.forEach(function (w) { r.push({ kelime: w[0], anlam: w[1], kok: k.t, kart: k }); });
  });
  return r;
}

/* ── XP ve rozetler ───────────────────────────────────────── */
var ROZETLER = [
  { id: 'ilk',      ik: '🌱', ad: 'İlk Adım',        ko: 'İlk oyununu bitir' },
  { id: 'xp250',    ik: '⭐', ad: '250 XP',          ko: '250 puana ulaş' },
  { id: 'xp1000',   ik: '🏆', ad: '1000 XP',         ko: '1000 puana ulaş' },
  { id: 'kilit',    ik: '🔓', ad: 'Kutu Sahibi',     ko: '36 ailenin kilidini aç' },
  { id: 'kusursuz', ik: '💎', ad: 'Kusursuz',        ko: 'Bir oyunu hatasız bitir' },
  { id: 'gunluk3',  ik: '🔥', ad: 'Üç Gün Üst Üste', ko: 'Günün Ailesi’ni 3 gün çöz' },
  { id: 'hepsi',    ik: '👑', ad: 'Usta',            ko: 'Bütün oyunları oyna' }
];

function xpVer(n) {
  D.xp += n;
  if (D.xp >= 250)  rozetVer('xp250');
  if (D.xp >= 1000) rozetVer('xp1000');
  kaydet(); ustGuncelle();
}
function rozetVer(id) {
  if (D.rozetler.indexOf(id) >= 0) return;
  D.rozetler.push(id); kaydet();
  var r = ROZETLER.filter(function (x) { return x.id === id; })[0];
  if (r) mesaj(r.ik + ' Yeni rozet: ' + r.ad);
}
function mesaj(yz) {
  var t = el('div', '', kacir(yz));
  t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);' +
    'background:#2A2320;color:#fff;padding:12px 20px;border-radius:24px;z-index:200;' +
    'font-weight:700;font-size:.88rem;box-shadow:0 6px 24px rgba(0,0,0,.28);max-width:88vw;text-align:center';
  document.body.appendChild(t);
  setTimeout(function () { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; }, 2200);
  setTimeout(function () { t.remove(); }, 2700);
}

/* ── Ekran yönetimi ───────────────────────────────────────── */
var yigin = [];
function goster(id, kur) {
  var hep = document.querySelectorAll('.ekran');
  for (var i = 0; i < hep.length; i++) hep[i].classList.remove('aktif');
  var e = document.getElementById('ekran-' + id);
  if (!e) return;
  if (kur) kur(e);
  e.classList.add('aktif');
  window.scrollTo(0, 0);
  $('#ustGeri').style.display = (id === 'ev') ? 'none' : 'flex';
  $('#ustBaslik').textContent = (id === 'ev') ? KA.baslik : (e.dataset.ad || KA.baslik);
}
function git(id, kur, ad) {
  if (id !== 'ev') yigin.push(ad || id);
  var e = document.getElementById('ekran-' + id);
  if (e && ad) e.dataset.ad = ad;
  goster(id, kur);
}
function geri() {
  sayacDurdur();
  yigin.pop();
  goster('ev');
  evCiz();
}

/* ── Üst çubuk ────────────────────────────────────────────── */
function ustGuncelle() {
  $('#ustXp').textContent = D.xp + ' XP';
  var n = kilitAcik() ? KA.toplam : KA.acik.length;
  $('#ustKart').textContent = n + '/' + KA.toplam;
}

/* ============================================================
   EV EKRANI
   ============================================================ */
function evCiz() {
  var e = $('#ekran-ev');
  var acikSayi = kilitAcik() ? KA.toplam : KA.acik.length;
  var kilitliSayi = KA.toplam - acikSayi;

  var h = '';
  h += '<div class="kahraman">' +
       '<div class="kutuNo">Kutu ' + KA.kutu + ' · ' + kacir(KA.seriAd) + '</div>' +
       '<h1>' + kacir(KA.baslik) + '</h1>' +
       '<p class="alt">' + kacir(KA.altbaslik) + '</p>' +
       '<p class="acik">' + kacir(KA.aciklama) + '</p>' +
       '<div class="sayaclar">' +
         '<div class="sayac"><b>' + acikSayi + '</b><span>Açık aile</span></div>' +
         '<div class="sayac"><b>' + KA.toplam * 5 + '</b><span>Kelime</span></div>' +
         '<div class="sayac"><b>' + D.xp + '</b><span>XP</span></div>' +
       '</div></div>';

  h += '<div class="pad">';

  if (kilitliSayi > 0) {
    h += '<div class="kilitnot">' +
      '<b>🔒 ' + kilitliSayi + ' aile hâlâ kutuda</b>' +
      '<p>Şu an 3 aileyle oynuyorsun. Kutundan iki kart çekip her birinin ' +
      'üç kelimesini yazarsan 36 ailenin tamamı açılır — bütün oyunlar birden büyür.</p>' +
      '<button class="dg" onclick="KAM.kilitAc()">Kutum var, kilidi aç</button>' +
      '</div>';
  }

  h += '<div class="bolum">Keşfet</div><div class="mgrid">' +
    mkart('🃏', 'Kart Vitrini', acikSayi + ' açık kart', "KAM.vitrin()") +
    mkart('🌳', 'Kelime Ağacı', 'Kökten dallara', "KAM.agac()") +
    '</div>';

  h += '<div class="bolum">Oyna</div><div class="mgrid">';
  h += '<button class="mkart imza" onclick="KAM.oyun(\'' + KA.imza + '\')">' +
       '<div class="ik">' + KA.imzaIkon + '</div><div><div class="ad">' + kacir(KA.imzaAd) + '</div>' +
       '<div class="ac">' + kacir(KA.imzaDesc) + '</div></div></button>';
  OYUNLAR.forEach(function (o) {
    if (o.imza) return;
    h += mkart(o.ik, o.ad, o.ac, "KAM.oyun('" + o.id + "')");
  });
  h += '</div>';

  h += '<div class="bolum">İlerleme</div><div class="mgrid">' +
    mkart('👤', 'Profil', D.rozetler.length + '/' + ROZETLER.length + ' rozet', "KAM.profil()") +
    mkart('🏫', 'Sınıf Modu', 'Projeksiyon için', "KAM.sinifMod()") +
    '</div>';

  h += '<a class="satinal" href="' + SATINAL + '" target="_blank" rel="noopener noreferrer">' +
    '<span class="ik">🛒</span><span class="yz"><b>Kelime Aileleri ' + KA.kutu + ' — ' + kacir(KA.seriAd) + '</b>' +
    '<span>36 kart · 180 kelime · 36 sohbet sorusu</span></span><span class="ok">→</span></a>';

  h += '<div class="bolum">Diğer kutular</div><div class="mgrid" id="kardesler"></div>';

  h += '<div class="altbilgi">Kelime Aileleri · Yeni Kök Yayınları<br>' +
       '<a href="/kelime-aileleri/">Dört kutunun tamamı</a></div>';
  h += '</div>';

  e.innerHTML = h;
  kardesCiz();
  ustGuncelle();
}
function mkart(ik, ad, ac, tik) {
  return '<button class="mkart" onclick="' + tik + '"><div class="ik">' + ik + '</div>' +
    '<div class="ad">' + kacir(ad) + '</div><div class="ac">' + kacir(ac) + '</div></button>';
}
var KARDESLER = [
  { s: 'kokler',        n: 'Kök Harfleri',      i: '🔤', k: 1 },
  { s: 'ekler',         n: 'Kelime Fabrikası',  i: '🏭', k: 2 },
  { s: 'gizli-aileler', n: 'Gizli Aileler',     i: '🔍', k: 3 },
  { s: 'dilden-dile',   n: 'Dilden Dile',       i: '🗺️', k: 4 }
];
function kardesCiz() {
  var c = $('#kardesler'); if (!c) return;
  c.innerHTML = KARDESLER.filter(function (x) { return x.s !== KA.slug; }).map(function (x) {
    return '<a class="mkart" style="text-decoration:none;color:inherit" href="/kelime-aileleri/' + x.s + '/">' +
      '<div class="ik">' + x.i + '</div><div class="ad">' + kacir(x.n) + '</div>' +
      '<div class="ac">Kutu ' + x.k + '</div></a>';
  }).join('');
}

/* ============================================================
   VİTRİN
   ============================================================ */
function vitrin() {
  git('ic', function (e) {
    var h = '<div class="pad">';
    h += '<p class="bos" style="padding:6px 0 18px;text-align:left">' +
         'Açık kartların iki yüzünü de görebilirsin — dokun, dönsün. ' +
         'Kilitli kartların yalnızca kök adı görünür.</p>';
    h += '<div class="vgrid">';
    KA.acik.forEach(function (k, i) {
      h += '<div class="kartkutu" onclick="this.classList.toggle(\'donuk\')">' +
        '<div class="kartic">' +
        '<div class="kartyuz"><img src="gorsel/' + k.g + '-on.webp" alt="' + kacir(k.t) + '" loading="lazy"></div>' +
        '<div class="kartyuz arka"><img src="gorsel/' + k.g + '-arka.webp" alt="' + kacir(k.t) + ' arka" loading="lazy"></div>' +
        '</div><span class="cevir">çevir</span></div>';
    });
    var kilitliK = (D.kilitliVeri || []);
    if (kilitliK.length) {
      kilitliK.forEach(function (k, i) {
        h += '<div class="kartkutu" onclick="KAM.kart(' + (KA.acik.length + i) + ')">' +
          '<div class="kilitli" style="border-style:solid">' +
          '<div class="kok" style="opacity:1">' + kacir(k.t) + '</div>' +
          '<div class="not">' + k.w.length + ' kelime</div></div></div>';
      });
    } else {
      KA.kilitliBasliklar.forEach(function (t) {
        h += '<div class="kilitli" onclick="KAM.kilitAc()">' +
          '<div class="as">🔒</div><div class="kok">' + kacir(t) + '</div>' +
          '<div class="not">kutuda</div></div>';
      });
    }
    h += '</div>';
    if (!kilitAcik()) {
      h += '<div class="kilitnot" style="margin-top:22px">' +
        '<b>Bu 33 aile kutunun içinde</b>' +
        '<p>Kökleri görüyorsun ama kelimeleri kutuda. İki kartın üçer kelimesini ' +
        'yazarsan hepsi açılır.</p>' +
        '<button class="dg" onclick="KAM.kilitAc()">Kilidi aç</button></div>';
    }
    h += '</div>';
    e.innerHTML = h;
  }, 'Kart Vitrini');
}

function kartDetay(i) {
  var k = kartlar()[i]; if (!k) return;
  git('ic', function (e) {
    var h = '<div class="pad"><div class="kdetay">';
    h += '<div class="kk">' + kacir(k.t) + '</div>';
    h += '<div class="kkok">' + kacir(k.k) + '</div>';
    if (k.r) h += '<div class="krota">🗺️ ' + kacir(k.r) + '</div>';
    h += '<div class="kety">' + kacir(k.e) + '</div>';
    h += '<ul class="klist">';
    k.w.forEach(function (w) {
      h += '<li><b>' + kacir(w[0]) + '</b><span>' + kacir(w[1]) + '</span></li>';
    });
    h += '</ul>';
    h += '<div class="kcumle">“' + kacir(k.c) + '”</div>';
    h += '<div class="ksoru"><b>Sohbet sorusu</b>' + kacir(k.s) + '</div>';
    h += '</div></div>';
    e.innerHTML = h;
  }, k.t);
}

/* ── Kelime ağacı ─────────────────────────────────────────── */
function agac() {
  git('ic', function (e) {
    var hep = kartlar();
    var h = '<div class="pad">';
    hep.forEach(function (k, i) {
      h += '<div class="kdetay" style="margin-bottom:12px;cursor:pointer" onclick="KAM.kart(' + i + ')">' +
        '<div class="kk" style="font-size:1.35rem">' + kacir(k.t) + '</div>' +
        '<div class="kkok" style="margin-bottom:10px">' + kacir(k.k) + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px">' +
        k.w.map(function (w) {
          return '<span class="jeton" style="pointer-events:none;font-size:.82rem;padding:6px 12px">' +
                 kacir(w[0]) + '</span>';
        }).join('') + '</div></div>';
    });
    if (!kilitAcik()) {
      h += '<div class="kilitnot"><b>33 ağaç daha var</b>' +
        '<p>Kutundaki kartlarla hepsini açabilirsin.</p>' +
        '<button class="dg" onclick="KAM.kilitAc()">Kilidi aç</button></div>';
    }
    h += '</div>';
    e.innerHTML = h;
  }, 'Kelime Ağacı');
}

/* ============================================================
   KİLİT AÇMA
   ============================================================ */
var kilitDurum = { cevaplar: [], kartlar: [], mesgul: false };

function kilitAc() {
  if (kilitAcik()) { mesaj('Kilit zaten açık.'); return; }
  kilitDurum = { cevaplar: [], kartlar: [], mesgul: false };
  kilitCiz();
}
function kilitCiz(not, notTip) {
  var eski = $('.perde'); if (eski) eski.remove();
  var adim = kilitDurum.cevaplar.length;
  var p = el('div', 'perde');
  var h = '<div class="modal">';
  h += '<h3>🔒 Kutundaki kartlar</h3>';
  h += '<p class="mac">Kutundan bir kart çek ve üstündeki <b>beş kelimeden üçünü</b> yaz — ' +
       'aralarına boşluk koyman yeterli. Sonra ikinci bir kartla aynısını yap.</p>';
  h += '<div class="adimlar">' +
       '<div class="adim ' + (adim > 0 ? 'tamam' : 'simdi') + '"></div>' +
       '<div class="adim ' + (adim > 1 ? 'tamam' : (adim === 1 ? 'simdi' : '')) + '"></div></div>';
  /* Yer tutucu asla gerçek bir kartın kelimelerini içermez — yoksa kutusu
     olmayan biri örneği kopyalayıp kilidi açardı. */
  h += '<input type="text" id="kilitGiris" autocomplete="off" autocapitalize="none" ' +
       'placeholder="' + (adim === 0 ? 'Karttaki üç kelime…'
                                     : 'Şimdi başka bir karttan üç kelime…') + '">';
  if (not) h += '<div class="mnot ' + (notTip || 'bilgi') + '">' + kacir(not) + '</div>';
  if (kilitDurum.kartlar.length) {
    h += '<div class="mnot iyi">✓ Doğrulanan: ' + kilitDurum.kartlar.map(kacir).join(' · ') + '</div>';
  }
  h += '<div class="dgsira"><button class="dg" id="kilitGonder">Kontrol et</button>' +
       '<button class="dg ikincil" onclick="KAM.kilitKapat()">Vazgeç</button></div>';
  h += '<div class="mnot bilgi" style="margin-top:14px">Kartın yoksa 3 aileyle oynamaya devam edebilirsin. ' +
       'Kutuyu <a href="' + SATINAL + '" target="_blank" rel="noopener">hediyekitap.com</a>’dan alabilirsin.</div>';
  h += '</div>';
  p.innerHTML = h;
  p.addEventListener('click', function (ev) { if (ev.target === p) kilitKapat(); });
  document.body.appendChild(p);
  var g = $('#kilitGiris');
  g.focus();
  g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') kilitGonder(); });
  $('#kilitGonder').addEventListener('click', kilitGonder);
}
function kilitKapat() { var p = $('.perde'); if (p) p.remove(); }

function kilitGonder() {
  if (kilitDurum.mesgul) return;
  var g = $('#kilitGiris'); if (!g) return;
  var cevap = g.value.trim();
  if (cevap.split(/\s+/).filter(Boolean).length < 3) {
    kilitCiz('Aynı karttan üç kelime yaz, aralarına boşluk koy.', 'kotu'); return;
  }
  kilitDurum.mesgul = true;
  $('#kilitGonder').textContent = 'Kontrol ediliyor…';

  fetch('/api/kelime-ac', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ seri: KA.kod, metin: cevap })
  }).then(function (r) { return r.json(); }).then(function (y) {
    kilitDurum.mesgul = false;
    if (!y.ok) {
      var n = 'Bu kelimeleri bir kartta bulamadım. Üçünün de aynı kartta olduğundan emin ol.';
      if (y.sebep === 'acik')
        n = (y.kart ? y.kart + ' kartı' : 'Bu kart') + ' zaten açık — kilitli kartlardan birini dene.';
      if (y.sebep === 'coklu') n = 'Birden fazla karta uyuyor — bir kelime daha ekle.';
      if (y.sebep === 'kisa')  n = 'Aynı karttan üç kelime yaz, aralarına boşluk koy.';
      if (y.hata === 'yavasla') n = 'Çok hızlı denedin. Bir dakika bekle.';
      kilitCiz(n, 'kotu'); return;
    }
    if (kilitDurum.kartlar.indexOf(y.kart) >= 0) {
      kilitCiz('Bu kartı zaten kullandın — başka bir kart çek.', 'kotu'); return;
    }
    kilitDurum.cevaplar.push(cevap);
    kilitDurum.kartlar.push(y.kart);
    if (kilitDurum.cevaplar.length < 2) { kilitCiz('✓ ' + y.kart + ' kartı doğrulandı. Bir kart daha.', 'iyi'); return; }
    kilitTamamla();
  }).catch(function () {
    kilitDurum.mesgul = false;
    kilitCiz('Bağlantı kurulamadı. Az sonra tekrar dene.', 'kotu');
  });
}
function kilitTamamla() {
  fetch('/api/kelime-ac', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ seri: KA.kod, kanitlar: kilitDurum.cevaplar })
  }).then(function (r) { return r.json(); }).then(function (y) {
    if (!y.ok || !y.kartlar) { kilitCiz('Bir şeyler ters gitti, tekrar dene.', 'kotu'); return; }
    D.kilitliVeri = y.kartlar;
    kaydet(); rozetVer('kilit'); xpVer(100);
    kilitKapat();
    mesaj('🔓 36 ailenin tamamı açıldı!');
    goster('ev'); evCiz();
  }).catch(function () { kilitCiz('Bağlantı kurulamadı.', 'kotu'); });
}

/* ============================================================
   OYUN KABUĞU  —  tek kişi / çok kişi / sınıf
   ============================================================ */
var MP = null;          // çok kişilik durum
var sayacId = null;

function sayacDurdur() { if (sayacId) { clearInterval(sayacId); sayacId = null; } }

function oyunAc(id) {
  var o = OYUNLAR.filter(function (x) { return x.id === id; })[0];
  if (!o) return;
  var yeterli = kartlar().length;
  if (yeterli < (o.min || 2)) { mesaj('Bu oyun için en az ' + (o.min || 2) + ' aile gerekiyor.'); return; }
  modSec(o);
}

/* Mod seçimi + oyuncu kurulumu */
function modSec(o) {
  var p = el('div', 'perde');
  p.innerHTML =
    '<div class="modal"><h3>' + o.ik + ' ' + kacir(o.ad) + '</h3>' +
    '<p class="mac">' + kacir(o.uzun || o.ac) + '</p>' +
    '<div class="dgsira" style="flex-direction:column">' +
    '<button class="dg tam" id="modTek">👤 Tek kişi</button>' +
    '<button class="dg tam ikincil" id="modCok">👥 Çok kişi — sıra sende</button>' +
    '</div></div>';
  p.addEventListener('click', function (e) { if (e.target === p) p.remove(); });
  document.body.appendChild(p);
  $('#modTek').onclick = function () { p.remove(); MP = null; oyunBaslat(o); };
  $('#modCok').onclick = function () { p.remove(); oyuncuKur(o); };
}

function oyuncuKur(o) {
  var sayi = 2;
  var p = el('div', 'perde');
  function ciz() {
    var h = '<div class="modal"><h3>👥 Kim oynuyor?</h3>' +
      '<p class="mac">Tek cihazda sırayla oynanır. Herkes kendi sırasında cevaplar.</p>' +
      '<div class="sayisec">';
    for (var i = 2; i <= 6; i++)
      h += '<button data-n="' + i + '" class="' + (i === sayi ? 'secili' : '') + '">' + i + '</button>';
    h += '</div><div class="oyuncular">';
    for (var j = 0; j < sayi; j++)
      h += '<div class="oyuncusatir"><input type="text" data-i="' + j + '" placeholder="' +
           (j + 1) + '. oyuncu" value="' + (adlar[j] || '') + '"></div>';
    h += '</div><div class="dgsira"><button class="dg tam" id="mpBasla">Başla</button></div></div>';
    p.innerHTML = h;
    p.querySelectorAll('.sayisec button').forEach(function (b) {
      b.onclick = function () { oku(); sayi = +b.dataset.n; ciz(); };
    });
    $('#mpBasla').onclick = function () {
      oku();
      MP = { oyuncular: [], sira: 0, tur: 0 };
      for (var i = 0; i < sayi; i++)
        MP.oyuncular.push({ ad: (adlar[i] || '').trim() || ((i + 1) + '. oyuncu'), puan: 0 });
      p.remove(); oyunBaslat(o);
    };
  }
  var adlar = [];
  function oku() { p.querySelectorAll('.oyuncular input').forEach(function (i) { adlar[+i.dataset.i] = i.value; }); }
  p.addEventListener('click', function (e) { if (e.target === p) p.remove(); });
  document.body.appendChild(p);
  ciz();
}

function oyunBaslat(o) {
  git('oyun', function (e) {
    e.innerHTML = '<div class="pad"><div id="oyunAlan"></div></div>';
    o.kur($('#oyunAlan'), o);
  }, o.ad);
}

/* Çok kişilik: sıra çubuğu */
function siraCubugu() {
  if (!MP) return '';
  var o = MP.oyuncular[MP.sira];
  return '<div class="sirabar"><span class="no">SIRA</span>' + kacir(o.ad) +
         '<span style="margin-left:auto">' + o.puan + ' puan</span></div>';
}
function mpPuan(n) { if (MP) MP.oyuncular[MP.sira].puan += n; }
function mpSonraki() { if (MP) { MP.sira = (MP.sira + 1) % MP.oyuncular.length; if (MP.sira === 0) MP.tur++; } }
function mpBittiMi(turSayisi) { return MP && MP.tur >= turSayisi; }

/* Oyun sonu ekranı */
function oyunSonu(kap, o, veri) {
  sayacDurdur();
  var h = '';
  if (MP) {
    var sirali = MP.oyuncular.slice().sort(function (a, b) { return b.puan - a.puan; });
    h += '<div class="oyunbas"><div class="sol"><h2>🏁 Bitti</h2>' +
         '<div class="ipucu">' + kacir(o.ad) + '</div></div></div>';
    h += '<ul class="skortablo">';
    sirali.forEach(function (p, i) {
      h += '<li class="' + (i === 0 ? 'birinci' : '') + '">' +
        '<span class="sira">' + (i + 1) + '</span><span class="ad">' + kacir(p.ad) + '</span>' +
        '<span class="pn">' + p.puan + '</span></li>';
    });
    h += '</ul>';
  } else {
    var enIyi = D.enIyi[o.id] || 0;
    var yeni = veri.puan > enIyi;
    if (yeni) { D.enIyi[o.id] = veri.puan; }
    h += '<div class="merkez" style="padding:26px 0">' +
      '<div style="font-size:3rem">' + (veri.kusursuz ? '💎' : '🏁') + '</div>' +
      '<h2 style="margin:10px 0 4px;font-size:1.5rem">' + veri.puan + ' puan</h2>' +
      '<p style="color:var(--metin2);margin:0">' +
        (veri.toplam ? veri.dogru + '/' + veri.toplam + ' doğru' : '') +
        (yeni ? ' · <b>yeni rekor!</b>' : (enIyi ? ' · en iyin ' + enIyi : '')) +
      '</p></div>';
  }

  if (!kilitAcik()) {
    h += '<div class="kilitnot"><b>Bu oyun 3 aileyle oynanıyor</b>' +
      '<p>Kutundaki 36 aileyle oynasan soru havuzu on iki katına çıkardı.</p>' +
      '<button class="dg" onclick="KAM.kilitAc()">Kilidi aç</button></div>';
  }

  h += '<div class="dgsira"><button class="dg" id="tekrar">Tekrar oyna</button>' +
       '<button class="dg ikincil" onclick="KAM.geri()">Ana ekran</button></div>';

  kap.innerHTML = h;
  $('#tekrar').onclick = function () { if (MP) { MP.oyuncular.forEach(function (p) { p.puan = 0; }); MP.sira = 0; MP.tur = 0; } o.kur(kap, o); };

  D.oynanan[o.id] = (D.oynanan[o.id] || 0) + 1;
  rozetVer('ilk');
  if (veri.kusursuz) rozetVer('kusursuz');
  if (Object.keys(D.oynanan).length >= OYUNLAR.length) rozetVer('hepsi');
  kaydet();
}

/* ============================================================
   SORU AKIŞI — çoktan seçmeli oyunların ortak iskeleti
   ============================================================ */
function soruAkisi(kap, o, ayar) {
  var toplam = MP ? MP.oyuncular.length * (ayar.tur || 3) : (ayar.toplam || 12);
  var no = 0, dogru = 0, puan = 0, hata = 0;

  function sor() {
    if (no >= toplam) {
      return oyunSonu(kap, o, { puan: puan, dogru: dogru, toplam: toplam, kusursuz: hata === 0 });
    }
    var s = ayar.uret();
    if (!s) { return oyunSonu(kap, o, { puan: puan, dogru: dogru, toplam: no, kusursuz: hata === 0 }); }
    no++;

    var h = '';
    h += '<div class="oyunbas"><div class="sol"><h2>' + o.ik + ' ' + kacir(o.ad) + '</h2>' +
         '<div class="ipucu">' + kacir(s.ipucu || o.ac) + '</div></div>' +
         '<div class="sag"><div class="rozet"><b>' + no + '/' + toplam + '</b><span>Soru</span></div>' +
         (MP ? '' : '<div class="rozet"><b>' + puan + '</b><span>Puan</span></div>') +
         '</div></div>';
    h += siraCubugu();
    h += '<div class="kdetay" style="margin-bottom:14px;text-align:center">' +
         '<div style="font-size:1.3rem;font-weight:750;line-height:1.45">' + s.metin + '</div></div>';
    h += '<div class="secgrid ' + (s.secenekler.length === 2 ? 'iki' : '') + '" id="secler"></div>';
    h += '<div id="gb"></div>';
    kap.innerHTML = h;

    var kutu = $('#secler');
    var dugmeler = [];
    karistir(s.secenekler.map(function (x, i) { return i; })).forEach(function (i) {
      var sc = s.secenekler[i];
      var b = el('button', 'sec', kacir(sc.yz) + (sc.alt ? '<small>' + kacir(sc.alt) + '</small>' : ''));
      dugmeler.push({ dugme: b, sec: sc });
      b.onclick = function () { cevapla(sc, s, dugmeler); };
      kutu.appendChild(b);
    });
  }

  function cevapla(sc, s, dugmeler) {
    dugmeler.forEach(function (d) {
      d.dugme.classList.add('pasif');
      if (d.sec.dogru) d.dugme.classList.add('dogru');
      else if (d.sec === sc) d.dugme.classList.add('yanlis');
    });
    if (sc.dogru) { dogru++; puan += 10; mpPuan(10); xpVer(4); }
    else { hata++; }
    var g = $('#gb');
    g.innerHTML = '<div class="geribildirim ' + (sc.dogru ? 'iyi' : 'kotu') + '">' +
      (sc.dogru ? '✓ Doğru. ' : '✕ ') + (s.aciklama || '') + '</div>' +
      '<div class="dgsira"><button class="dg tam" id="ileri">Devam →</button></div>';
    $('#ileri').onclick = function () { mpSonraki(); sor(); };
    if (MP) { var b = $('.sirabar'); if (b) b.style.opacity = '.5'; }
  }

  sor();
}

/* ============================================================
   OYUN 1 — AİLEYİ TOPLA
   ============================================================ */
function oyunTopla(kap, o) {
  var hep = kartlar();
  var n = Math.min(hep.length, 4);
  var secilen = sec(hep, n);
  var havuz = [];
  secilen.forEach(function (k, ki) {
    k.w.forEach(function (w) { havuz.push({ kelime: w[0], ki: ki }); });
  });
  havuz = karistir(havuz);
  var yerlesen = 0, hata = 0, puan = 0, seciliJeton = null;
  var toplamKelime = havuz.length;

  function ciz() {
    var h = '';
    h += '<div class="oyunbas"><div class="sol"><h2>🗂️ Aileyi Topla</h2>' +
      '<div class="ipucu">Kelimeye dokun, sonra ait olduğu köke dokun</div></div>' +
      '<div class="sag"><div class="rozet"><b>' + yerlesen + '/' + toplamKelime + '</b><span>Yerleşti</span></div>' +
      '<div class="rozet"><b>' + puan + '</b><span>Puan</span></div></div></div>';
    h += siraCubugu();
    h += '<div class="havuz" id="havuz"></div>';
    h += '<div class="sepetler" id="sepetler"></div>';
    h += '<div id="gb"></div>';
    kap.innerHTML = h;

    var hv = $('#havuz');
    havuz.forEach(function (j, i) {
      if (j.bitti) return;
      var b = el('button', 'jeton' + (seciliJeton === i ? ' secili' : ''), kacir(j.kelime));
      b.onclick = function () { seciliJeton = (seciliJeton === i ? null : i); ciz(); };
      hv.appendChild(b);
    });

    var sp = $('#sepetler');
    secilen.forEach(function (k, ki) {
      var icindekiler = havuz.filter(function (j) { return j.bitti && j.ki === ki; });
      var tam = icindekiler.length === k.w.length;
      var d = el('div', 'sepet' + (tam ? ' tam' : ''));
      d.innerHTML = '<div class="sad">' + kacir(k.t) + '</div><div class="sic">' +
        icindekiler.map(function (j) { return '<i>' + kacir(j.kelime) + '</i>'; }).join('') + '</div>';
      d.onclick = function () { birak(ki); };
      sp.appendChild(d);
    });
  }

  function birak(ki) {
    if (seciliJeton == null) { mesaj('Önce bir kelime seç.'); return; }
    var j = havuz[seciliJeton];
    if (j.ki === ki) {
      j.bitti = true; yerlesen++; puan += 10; mpPuan(10); xpVer(3);
      seciliJeton = null;
      if (yerlesen === toplamKelime) {
        if (MP) { mpSonraki(); }
        return oyunSonu(kap, o, { puan: puan, dogru: yerlesen, toplam: toplamKelime, kusursuz: hata === 0 });
      }
      ciz();
    } else {
      hata++; puan = Math.max(0, puan - 3);
      seciliJeton = null;
      ciz();
      $('#gb').innerHTML = '<div class="geribildirim kotu">✕ <b>' + kacir(j.kelime) +
        '</b> bu aileden değil. ' + kacir(secilen[j.ki].k) + '</div>';
      if (MP) { mpSonraki(); setTimeout(ciz, 900); }
    }
  }
  ciz();
}

/* ============================================================
   OYUN 2 — YABANCI KİM?
   ============================================================ */
function oyunYabanci(kap, o) {
  soruAkisi(kap, o, {
    toplam: 12, tur: 3,
    uret: function () {
      var hep = kartlar();
      if (hep.length < 2) return null;
      var iki = sec(hep, 2), a = iki[0], b = iki[1];
      var dortu = sec(a.w, 4).map(function (w) { return w[0]; });
      var yabanci = rast(b.w)[0];
      var liste = karistir(dortu.concat([yabanci]));
      return {
        ipucu: 'Beş kelimeden biri bu aileden değil',
        metin: liste.map(function (w) { return kacir(w); }).join(' · '),
        secenekler: liste.map(function (w) { return { yz: w, dogru: w === yabanci }; }),
        aciklama: '<b>' + kacir(yabanci) + '</b> ' + kacir(b.t) + ' ailesinden. Diğerleri ' +
                  kacir(a.t) + ' — ' + kacir(a.k)
      };
    }
  });
}

/* ============================================================
   OYUN 3 — AKRABA MI, DEĞİL Mİ?
   ============================================================ */
function oyunAkraba(kap, o) {
  soruAkisi(kap, o, {
    toplam: 14, tur: 3,
    uret: function () {
      var hep = kartlar();
      if (hep.length < 2) return null;
      var akraba = Math.random() < 0.5;
      var a, b, k1, k2;
      if (akraba) {
        k1 = k2 = rast(hep);
        var iki = sec(k1.w, 2); a = iki[0][0]; b = iki[1][0];
      } else {
        var ikiK = sec(hep, 2); k1 = ikiK[0]; k2 = ikiK[1];
        a = rast(k1.w)[0]; b = rast(k2.w)[0];
      }
      return {
        ipucu: 'Bu iki kelime aynı kökten mi geliyor?',
        metin: '<span style="color:var(--ana)">' + kacir(a) + '</span>' +
               '<span style="opacity:.4;padding:0 12px">&</span>' +
               '<span style="color:var(--ana)">' + kacir(b) + '</span>',
        secenekler: [
          { yz: '✓ Akraba', dogru: akraba },
          { yz: '✕ Değil',  dogru: !akraba }
        ],
        aciklama: akraba
          ? 'İkisi de <b>' + kacir(k1.t) + '</b> kökünden. ' + kacir(k1.k)
          : '<b>' + kacir(a) + '</b> → ' + kacir(k1.t) + ', <b>' + kacir(b) + '</b> → ' + kacir(k2.t) + '.'
      };
    }
  });
}

/* ============================================================
   OYUN 4 — CÜMLEDEKİ BOŞLUK
   ============================================================ */
function oyunBosluk(kap, o) {
  /* Cümleyi sözcüklere ayırıp Türkçe duyarlı karşılaştırma yapar.
     JavaScript'in /i/ bayrağı İ/i çiftini doğru eşleştirmediği için
     düz düzenli ifade kullanılmaz. */
  function parcala(cumle) {
    return String(cumle).split(/([^0-9A-Za-zÇĞİÖŞÜçğıöşüÂÎÛâîû]+)/);
  }
  function boslukla(cumle, kelime) {
    var p = parcala(cumle), h = sade(kelime), bulundu = false;
    return p.map(function (par) {
      if (!bulundu && sade(par) === h && sade(par)) {
        bulundu = true;
        return '<b style="color:var(--ana)">______</b>';
      }
      return kacir(par);
    }).join('') + (bulundu ? '' : '');
  }
  function varMi(cumle, kelime) {
    var h = sade(kelime);
    return parcala(cumle).some(function (par) { return sade(par) && sade(par) === h; });
  }

  var havuz = [];
  kartlar().forEach(function (k) {
    k.w.forEach(function (w) {
      if (varMi(k.c, w[0])) havuz.push({ kart: k, kelime: w[0], anlam: w[1] });
    });
  });
  havuz = karistir(havuz);
  if (!havuz.length) { mesaj('Bu oyun için yeterli cümle yok.'); return geri(); }
  var i = 0;

  soruAkisi(kap, o, {
    toplam: Math.min(12, havuz.length), tur: 3,
    uret: function () {
      if (i >= havuz.length) i = 0;
      var s = havuz[i++];
      var cumle = boslukla(s.kart.c, s.kelime);
      var yanlislar = [];
      var digerler = kelimeler().filter(function (w) { return w.kelime !== s.kelime; });
      sec(digerler, 3).forEach(function (w) { yanlislar.push(w.kelime); });
      var secenekler = [{ yz: s.kelime, dogru: true }].concat(
        yanlislar.map(function (w) { return { yz: w, dogru: false }; }));
      return {
        ipucu: 'Boşluğa hangi kelime gelmeli?',
        metin: '<span style="font-size:1.05rem;line-height:1.7">' + cumle + '</span>',
        secenekler: secenekler,
        aciklama: '<b>' + kacir(s.kelime) + '</b> — ' + kacir(s.anlam) +
                  ' (' + kacir(s.kart.t) + ' ailesi)'
      };
    }
  });
}

/* ============================================================
   OYUN 5 — ANLAM EŞLE
   ============================================================ */
function oyunEsle(kap, o) {
  var hepKelime = kelimeler();
  var adet = Math.min(6, hepKelime.length);
  var secilen = sec(hepKelime, adet);
  var taslar = karistir(
    secilen.map(function (s, i) { return { tip: 'k', yz: s.kelime, ci: i }; })
      .concat(secilen.map(function (s, i) { return { tip: 'a', yz: s.anlam, ci: i }; }))
  );
  var acik = [], bulunan = 0, hamle = 0, puan = 0, kilit = false;

  function ciz() {
    var h = '<div class="oyunbas"><div class="sol"><h2>🧩 Anlam Eşle</h2>' +
      '<div class="ipucu">Kelimeyi anlamıyla eşleştir</div></div>' +
      '<div class="sag"><div class="rozet"><b>' + bulunan + '/' + adet + '</b><span>Çift</span></div>' +
      '<div class="rozet"><b>' + hamle + '</b><span>Hamle</span></div></div></div>';
    h += siraCubugu();
    h += '<div class="eslegrid" id="tg"></div><div id="gb"></div>';
    kap.innerHTML = h;
    var g = $('#tg');
    taslar.forEach(function (t, i) {
      var sinif = 'esletas' + (t.tip === 'k' ? ' kelime' : '') +
        (t.bitti ? ' tamam' : '') + (acik.indexOf(i) >= 0 ? ' secili' : '');
      var b = el('button', sinif, kacir(t.yz));
      b.onclick = function () { tikla(i); };
      g.appendChild(b);
    });
  }

  function tikla(i) {
    if (kilit || taslar[i].bitti || acik.indexOf(i) >= 0) return;
    acik.push(i); ciz();
    if (acik.length < 2) return;
    hamle++; kilit = true;
    var a = taslar[acik[0]], b = taslar[acik[1]];
    var uydu = (a.ci === b.ci && a.tip !== b.tip);
    setTimeout(function () {
      if (uydu) {
        a.bitti = b.bitti = true; bulunan++; puan += 15; mpPuan(15); xpVer(4);
      } else { puan = Math.max(0, puan - 2); }
      acik = []; kilit = false;
      if (MP && !uydu) mpSonraki();
      if (bulunan === adet)
        return oyunSonu(kap, o, { puan: puan, dogru: bulunan, toplam: adet, kusursuz: hamle === adet });
      ciz();
      if (!uydu) $('#gb').innerHTML = '<div class="geribildirim kotu">Olmadı — tekrar dene.</div>';
    }, uydu ? 380 : 760);
  }
  ciz();
}

/* ============================================================
   OYUN 6 — GÜNÜN AİLESİ  (harf dizme)
   ============================================================ */
function oyunGunluk(kap, o) {
  var hep = kartlar();
  var t = gunTohum();
  var kart = hep[t.deger % hep.length];
  var sira = 0, puan = 0, ipucuKullanildi = 0;

  function ciz() {
    if (sira >= kart.w.length) return bitir();
    var kelime = kart.w[sira][0], anlam = kart.w[sira][1];
    var harfler = karistir(kelime.split(''));
    var kurulan = [];

    function guncelle() {
      var h = '<div class="oyunbas"><div class="sol"><h2>📅 Günün Ailesi</h2>' +
        '<div class="ipucu">' + kacir(kart.t) + ' · ' + (sira + 1) + '/' + kart.w.length + '</div></div>' +
        '<div class="sag"><div class="rozet"><b>' + puan + '</b><span>Puan</span></div></div></div>';
      h += siraCubugu();
      h += '<div class="kdetay" style="margin-bottom:14px;text-align:center">' +
        '<div style="font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--metin3);' +
        'margin-bottom:8px">İpucu</div>' +
        '<div style="font-size:1.05rem;font-weight:650">' + kacir(anlam) + '</div></div>';
      h += '<div class="montaj"><div class="sonuc">' +
        (kurulan.length ? kacir(kurulan.join('')) : '···') + '</div></div>';
      h += '<div class="havuz" id="hv"></div>';
      h += '<div class="dgsira"><button class="dg ikincil" id="sil">← Sil</button>' +
        '<button class="dg ikincil" id="ip">💡 Harf aç</button></div><div id="gb"></div>';
      kap.innerHTML = h;

      var hv = $('#hv');
      harfler.forEach(function (harf, i) {
        if (harf === null) return;
        var b = el('button', 'jeton', kacir(harf));
        b.onclick = function () {
          kurulan.push(harf); harfler[i] = null; guncelle();
          if (kurulan.length === kelime.length) kontrol();
        };
        hv.appendChild(b);
      });
      $('#sil').onclick = function () {
        if (!kurulan.length) return;
        var h2 = kurulan.pop();
        for (var i = 0; i < harfler.length; i++) if (harfler[i] === null) { harfler[i] = h2; break; }
        guncelle();
      };
      $('#ip').onclick = function () {
        var dogruHarf = kelime[kurulan.length];
        if (!dogruHarf) return;
        for (var i = 0; i < harfler.length; i++) {
          if (harfler[i] === dogruHarf) { kurulan.push(dogruHarf); harfler[i] = null; break; }
        }
        ipucuKullanildi++; puan = Math.max(0, puan - 5);
        guncelle();
        if (kurulan.length === kelime.length) kontrol();
      };
    }

    function kontrol() {
      var uydu = sade(kurulan.join('')) === sade(kelime);
      if (uydu) {
        puan += 20; mpPuan(20); xpVer(6);
        $('#gb').innerHTML = '<div class="geribildirim iyi">✓ <b>' + kacir(kelime) + '</b> — ' +
          kacir(anlam) + '</div><div class="dgsira"><button class="dg tam" id="il">Devam →</button></div>';
        $('#il').onclick = function () { sira++; if (MP) mpSonraki(); ciz(); };
      } else {
        $('#gb').innerHTML = '<div class="geribildirim kotu">Harfler doğru sırada değil. ' +
          '<button class="dg ikincil" style="padding:6px 14px;margin-left:6px" id="yeni">Baştan</button></div>';
        $('#yeni').onclick = function () { ciz(); };
      }
    }
    guncelle();
  }

  function bitir() {
    var t2 = gunTohum();
    if (D.gunluk !== t2.anahtar) {
      var dun = new Date(); dun.setDate(dun.getDate() - 1);
      var dunA = String(dun.getFullYear() * 10000 + (dun.getMonth() + 1) * 100 + dun.getDate());
      D.gunlukSeri = (D.gunluk === dunA) ? (D.gunlukSeri + 1) : 1;
      D.gunluk = t2.anahtar;
      if (D.gunlukSeri >= 3) rozetVer('gunluk3');
      kaydet();
    }
    oyunSonu(kap, o, { puan: puan, dogru: kart.w.length, toplam: kart.w.length, kusursuz: ipucuKullanildi === 0 });
  }
  ciz();
}

/* ============================================================
   İMZA 1 — ÜÇ HARFİN SIRRI  (KA01)
   ============================================================ */
function oyunHarf(kap, o) {
  var hep = kartlar();
  var kart = rast(hep);
  var kalanlar = kart.w.map(function (w) { return w[0]; });
  var bulunan = [], puan = 0, hak = 3, ipucu = 0;

  function ciz() {
    var h = '<div class="oyunbas"><div class="sol"><h2>🔤 Üç Harfin Sırrı</h2>' +
      '<div class="ipucu">Bu kökten doğan kelimeleri yaz</div></div>' +
      '<div class="sag"><div class="rozet"><b>' + bulunan.length + '/5</b><span>Bulundu</span></div>' +
      '<div class="rozet"><b>' + '❤'.repeat(hak) + '</b><span>Hak</span></div></div></div>';
    h += siraCubugu();
    h += '<div class="kdetay" style="margin-bottom:14px;text-align:center">' +
      '<div class="kk" style="font-size:2.4rem;margin-bottom:6px">' + kacir(kart.t) + '</div>' +
      '<div class="kkok" style="margin:0">' + kacir(kart.k) + '</div></div>';
    h += '<div class="sepetler" style="grid-template-columns:1fr"><div class="sepet" style="min-height:auto">' +
      '<div class="sic">' + kart.w.map(function (w) {
        var v = bulunan.indexOf(w[0]) >= 0;
        return '<i style="' + (v ? 'background:#EAF5E7;color:#2E6B26' : 'opacity:.45') + '">' +
          (v ? kacir(w[0]) : '· '.repeat(w[0].length).trim()) + '</i>';
      }).join('') + '</div></div></div>';
    h += '<div style="margin-top:14px"><input type="text" id="hg" autocomplete="off" ' +
      'autocapitalize="none" placeholder="Bir kelime yaz…" ' +
      'style="width:100%;border:2px solid var(--cizgi);border-radius:12px;padding:14px;' +
      'font-size:1rem;font-family:inherit;background:var(--krem2);color:var(--metin)"></div>';
    h += '<div class="dgsira"><button class="dg" id="gon">Gönder</button>' +
      '<button class="dg ikincil" id="ip">💡 İpucu</button></div><div id="gb"></div>';
    kap.innerHTML = h;

    var g = $('#hg'); g.focus();
    g.addEventListener('keydown', function (e) { if (e.key === 'Enter') dene(); });
    $('#gon').onclick = dene;
    $('#ip').onclick = function () {
      var kalan = kart.w.filter(function (w) { return bulunan.indexOf(w[0]) < 0; });
      if (!kalan.length) return;
      var s = rast(kalan);
      puan = Math.max(0, puan - 5); ipucu++;
      ciz();
      $('#gb').innerHTML = '<div class="geribildirim">💡 <b>' + kacir(s[1]) + '</b> anlamına gelen kelime.</div>';
    };

    function dene() {
      var v = sade(g.value);
      if (!v) return;
      var uyan = kart.w.filter(function (w) { return sade(w[0]) === v; })[0];
      if (uyan && bulunan.indexOf(uyan[0]) < 0) {
        bulunan.push(uyan[0]); puan += 20; mpPuan(20); xpVer(6);
        if (bulunan.length === kart.w.length) {
          if (MP) mpSonraki();
          return oyunSonu(kap, o, { puan: puan, dogru: 5, toplam: 5, kusursuz: hak === 3 && ipucu === 0 });
        }
        ciz();
        $('#gb').innerHTML = '<div class="geribildirim iyi">✓ <b>' + kacir(uyan[0]) + '</b> — ' + kacir(uyan[1]) + '</div>';
      } else if (uyan) {
        ciz(); $('#gb').innerHTML = '<div class="geribildirim">Bunu zaten buldun.</div>';
      } else {
        hak--;
        if (hak <= 0) {
          if (MP) mpSonraki();
          return oyunSonu(kap, o, { puan: puan, dogru: bulunan.length, toplam: 5, kusursuz: false });
        }
        ciz();
        $('#gb').innerHTML = '<div class="geribildirim kotu">✕ Bu kelime ' + kacir(kart.t) + ' ailesinde yok.</div>';
      }
    }
  }
  ciz();
}

/* ============================================================
   İMZA 2 — KELİME FABRİKASI  (KA02)
   ============================================================ */
function oyunFabrika(kap, o) {
  var F = KA.fabrika || { fars: [], yunan: [] };
  var acikBasliklar = {};
  kartlar().forEach(function (k) { acikBasliklar[k.t] = true; });

  /* Yalnızca açık kartlara ait birleşimler oynanabilir */
  var yunan = F.yunan.filter(function (c) { return acikBasliklar[c[0]] && acikBasliklar[c[1]]; });
  var fars  = F.fars.filter(function (c) { return acikBasliklar[c[1]]; });

  var solParcalar = [], sagParcalar = [], gecerli = {};
  yunan.forEach(function (c) {
    if (solParcalar.indexOf(c[0]) < 0) solParcalar.push(c[0]);
    if (sagParcalar.indexOf(c[1]) < 0) sagParcalar.push(c[1]);
    gecerli[c[0] + '|' + c[1]] = c[2];
  });
  fars.forEach(function (c) {
    if (solParcalar.indexOf(c[0]) < 0) solParcalar.push(c[0]);
    if (sagParcalar.indexOf(c[1]) < 0) sagParcalar.push(c[1]);
    gecerli[c[0] + '|' + c[1]] = c[2];
  });

  var hedef = Object.keys(gecerli).length;
  if (!hedef) { mesaj('Fabrika için yeterli parça yok.'); return geri(); }

  var bulunan = {}, sol = null, sag = null, puan = 0, deneme = 0;

  function ciz() {
    var bs = Object.keys(bulunan).length;
    var h = '<div class="oyunbas"><div class="sol"><h2>🏭 Kelime Fabrikası</h2>' +
      '<div class="ipucu">Soldan ve sağdan birer parça seç</div></div>' +
      '<div class="sag"><div class="rozet"><b>' + bs + '/' + hedef + '</b><span>Üretildi</span></div>' +
      '<div class="rozet"><b>' + puan + '</b><span>Puan</span></div></div></div>';
    h += siraCubugu();
    h += '<div class="montaj">' +
      '<div class="slot' + (sol ? ' dolu' : '') + '">' + (sol ? kacir(sol) : 'parça') + '</div>' +
      '<div class="art">+</div>' +
      '<div class="slot' + (sag ? ' dolu' : '') + '">' + (sag ? kacir(sag) : 'parça') + '</div>' +
      '</div>';
    h += '<div class="tezgah"><div class="tb">Taban</div><div class="parcalar" id="p1"></div></div>';
    h += '<div class="tezgah"><div class="tb">Ek / parça</div><div class="parcalar" id="p2"></div></div>';
    if (bs) {
      h += '<div class="tezgah"><div class="tb">Ürettiklerin</div><div class="parcalar">' +
        Object.keys(bulunan).map(function (k) {
          return '<span class="parca" style="background:#EAF5E7;color:#2E6B26;pointer-events:none">' +
            kacir(bulunan[k]) + '</span>';
        }).join('') + '</div></div>';
    }
    h += '<div id="gb"></div>';
    h += '<div class="dgsira"><button class="dg ikincil" id="bit">Bitir</button></div>';
    kap.innerHTML = h;

    doldur('#p1', solParcalar, sol, function (v) { sol = (sol === v ? null : v); dene(); });
    doldur('#p2', sagParcalar, sag, function (v) { sag = (sag === v ? null : v); dene(); });
    $('#bit').onclick = function () {
      if (MP) mpSonraki();
      oyunSonu(kap, o, { puan: puan, dogru: Object.keys(bulunan).length, toplam: hedef,
                         kusursuz: Object.keys(bulunan).length === hedef && deneme === hedef });
    };
  }
  function doldur(id, liste, secili, tik) {
    var c = $(id);
    liste.forEach(function (v) {
      var b = el('button', 'parca' + (secili === v ? ' secili' : ''), kacir(v));
      b.onclick = function () { tik(v); };
      c.appendChild(b);
    });
  }
  function dene() {
    if (!sol || !sag) { ciz(); return; }
    deneme++;
    var anahtar = sol + '|' + sag, sonuc = gecerli[anahtar];
    if (sonuc && !bulunan[anahtar]) {
      bulunan[anahtar] = sonuc; puan += 25; mpPuan(25); xpVer(8);
      var s1 = sol, s2 = sag; sol = sag = null;
      ciz();
      $('#gb').innerHTML = '<div class="geribildirim iyi">✓ <b>' + kacir(s1) + '</b> + <b>' +
        kacir(s2) + '</b> = <b style="font-size:1.15rem">' + kacir(sonuc) + '</b></div>';
      if (Object.keys(bulunan).length === hedef) {
        setTimeout(function () {
          if (MP) mpSonraki();
          oyunSonu(kap, o, { puan: puan, dogru: hedef, toplam: hedef, kusursuz: deneme === hedef });
        }, 1200);
      }
    } else if (sonuc) {
      sol = sag = null; ciz();
      $('#gb').innerHTML = '<div class="geribildirim">Bunu zaten ürettin.</div>';
    } else {
      var a1 = sol, a2 = sag; sol = sag = null;
      puan = Math.max(0, puan - 3);
      if (MP) mpSonraki();
      ciz();
      var sozde = (a1 + a2).replace(/[-–—\s]/g, '').toLocaleLowerCase('tr');
      $('#gb').innerHTML = '<div class="geribildirim kotu">✕ <b>' + kacir(sozde) +
        '</b> diye bir kelime yok. Başka bir eşleşme dene.</div>';
    }
  }
  ciz();
}

/* ============================================================
   İMZA 3 — GİZLİ BAĞ  (KA03)  kelime → hangi aile?
   ============================================================ */
function oyunGizliBag(kap, o) {
  soruAkisi(kap, o, {
    toplam: 12, tur: 3,
    uret: function () {
      var hep = kartlar();
      if (hep.length < 2) return null;
      var dogruKart = rast(hep);
      var w = rast(dogruKart.w);
      var digerler = sec(hep.filter(function (k) { return k.t !== dogruKart.t; }), Math.min(3, hep.length - 1));
      var secenekler = [{ yz: dogruKart.t, alt: dogruKart.k.split('•')[1] || '', dogru: true }]
        .concat(digerler.map(function (k) {
          return { yz: k.t, alt: (k.k.split('•')[1] || '').trim(), dogru: false };
        }));
      return {
        ipucu: 'Bu kelime hangi ailenin çocuğu?',
        metin: '<span style="font-size:1.7rem;color:var(--ana);font-weight:800">' + kacir(w[0]) + '</span>' +
               '<div style="font-size:.9rem;color:var(--metin2);font-weight:400;margin-top:6px">' +
               kacir(w[1]) + '</div>',
        secenekler: secenekler,
        aciklama: '<b>' + kacir(w[0]) + '</b> → ' + kacir(dogruKart.t) + '. ' + kacir(dogruKart.e)
      };
    }
  });
}

/* ============================================================
   İMZA 4 — ROTA HARİTASI  (KA04)
   ============================================================ */
function dilAyikla(kok) {
  var m = String(kok || '').match(/^\s*([^•]+?)\s*(?:•|$)/);
  var d = m ? m[1].trim() : '';
  return d.replace(/\s+[A-ZÇĞİÖŞÜa-zçğıöşü\-\/]+$/, '').trim() || d;
}
function oyunRota(kap, o) {
  var hep = kartlar();
  soruAkisi(kap, o, {
    toplam: 12, tur: 3,
    uret: function () {
      if (hep.length < 2) return null;
      var kart = rast(hep);
      var dogruDil = (kart.o || dilAyikla(kart.k) || 'Bilinmiyor').trim();
      var diller = [];
      hep.forEach(function (k) {
        var d = (k.o || dilAyikla(k.k) || '').trim();
        if (d && d !== dogruDil && diller.indexOf(d) < 0) diller.push(d);
      });
      ['Latince', 'Eski Yunanca', 'Arapça', 'Farsça', 'Germence'].forEach(function (d) {
        if (d !== dogruDil && diller.indexOf(d) < 0) diller.push(d);
      });
      var secenekler = [{ yz: dogruDil, dogru: true }].concat(
        sec(diller, 3).map(function (d) { return { yz: d, dogru: false }; }));
      var ornek = kart.w.map(function (w) { return w[0]; }).slice(0, 3).join(' · ');
      return {
        ipucu: 'Bu aile hangi dilden yola çıktı?',
        metin: '<span style="font-size:1.6rem;color:var(--ana);font-weight:800">' + kacir(kart.t) + '</span>' +
               '<div style="font-size:.92rem;color:var(--metin2);font-weight:400;margin-top:8px">' +
               kacir(ornek) + '</div>',
        secenekler: secenekler,
        aciklama: (kart.r ? '🗺️ ' + kacir(kart.r) + '<br>' : '') + kacir(kart.e)
      };
    }
  });
}

/* ============================================================
   OYUN LİSTESİ
   ============================================================ */
var IMZALAR = {
  harf:     { ik: '🔤', kur: oyunHarf },
  fabrika:  { ik: '🏭', kur: oyunFabrika },
  gizlibag: { ik: '🔍', kur: oyunGizliBag },
  rota:     { ik: '🗺️', kur: oyunRota }
};

var OYUNLAR = [
  { id: 'topla',   ik: '🗂️', ad: 'Aileyi Topla',    ac: 'Kelimeleri köklerine ayır', min: 2, kur: oyunTopla,
    uzun: 'Karışık kelimeler ekranda. Her birini ait olduğu kökün sepetine yerleştir.' },
  { id: 'yabanci', ik: '🎯', ad: 'Yabancı Kim?',     ac: 'Aileden olmayanı bul', min: 2, kur: oyunYabanci,
    uzun: 'Beş kelimeden dördü aynı aileden, biri değil. Yabancıyı yakala.' },
  { id: 'akraba',  ik: '↔️', ad: 'Akraba mı?',       ac: 'İki kelime, tek karar', min: 2, kur: oyunAkraba,
    uzun: 'İki kelime gelir. Aynı kökten mi geliyorlar, değil mi?' },
  { id: 'bosluk',  ik: '✏️', ad: 'Cümledeki Boşluk', ac: 'Doğru kelimeyi yerleştir', min: 1, kur: oyunBosluk,
    uzun: 'Kart cümlelerinden birinde bir kelime eksik. Hangisi olduğunu bul.' },
  { id: 'esle',    ik: '🧩', ad: 'Anlam Eşle',       ac: 'Kelime ve anlamı', min: 1, kur: oyunEsle,
    uzun: 'Kelimeleri anlamlarıyla eşleştir. Ne kadar az hamle, o kadar iyi.' },
  { id: 'gunluk',  ik: '📅', ad: 'Günün Ailesi',     ac: 'Her gün bir aile', min: 1, kur: oyunGunluk,
    uzun: 'Bugünün ailesi herkes için aynı. Beş kelimeyi harflerinden kur.' }
];

(function imzaEkle() {
  var i = IMZALAR[KA.imza];
  if (!i) return;
  OYUNLAR.push({ id: KA.imza, ik: KA.imzaIkon, ad: KA.imzaAd, ac: KA.imzaDesc,
                 min: 1, imza: true, kur: i.kur, uzun: KA.imzaDesc });
})();

/* ============================================================
   PROFİL
   ============================================================ */
function profil() {
  git('ic', function (e) {
    var h = '<div class="pad">';
    h += '<div class="merkez" style="padding:16px 0 24px">' +
      '<div style="font-size:2.6rem">🎓</div>' +
      '<h2 style="margin:8px 0 2px;font-size:1.6rem">' + D.xp + ' XP</h2>' +
      '<p style="color:var(--metin2);margin:0">' + kacir(KA.baslik) + '</p></div>';

    h += '<div class="bolum">Rozetler</div><div class="rozetgrid">';
    ROZETLER.forEach(function (r) {
      var v = D.rozetler.indexOf(r.id) >= 0;
      h += '<div class="rzt' + (v ? '' : ' kapali') + '"><div class="ri">' + r.ik + '</div>' +
        '<div class="rd">' + kacir(r.ad) + '</div><div class="rk">' + kacir(r.ko) + '</div></div>';
    });
    h += '</div>';

    h += '<div class="bolum">En iyi skorların</div>';
    var varMi = false;
    h += '<div class="mgrid">';
    OYUNLAR.forEach(function (o) {
      var s = D.enIyi[o.id];
      if (!s) return;
      varMi = true;
      h += '<div class="mkart" style="cursor:default"><div class="ik">' + o.ik + '</div>' +
        '<div class="ad">' + s + '</div><div class="ac">' + kacir(o.ad) + '</div></div>';
    });
    h += '</div>';
    if (!varMi) h += '<div class="bos">Henüz skor yok — bir oyun oyna.</div>';

    h += '<div class="dgsira"><button class="dg ikincil" onclick="KAM.sifirla()">İlerlemeyi sıfırla</button></div>';
    h += '</div>';
    e.innerHTML = h;
  }, 'Profil');
}
function sifirla() {
  if (!confirm('Bütün ilerleme ve açılan kartlar silinecek. Emin misin?')) return;
  try { localStorage.removeItem(ANAHTAR); } catch (e) {}
  location.reload();
}

/* ── Sınıf modu ───────────────────────────────────────────── */
function sinifMod() {
  document.body.classList.toggle('sinif');
  var a = document.body.classList.contains('sinif');
  mesaj(a ? '🏫 Sınıf modu açık — büyük punto' : 'Sınıf modu kapandı');
  try { localStorage.setItem(ANAHTAR + '-sinif', a ? '1' : ''); } catch (e) {}
}

/* ============================================================
   BAŞLAT
   ============================================================ */
function baslat() {
  document.documentElement.style.setProperty('--ana',  KA.renk);
  document.documentElement.style.setProperty('--ana2', KA.renk2);
  document.documentElement.style.setProperty('--ana3', KA.renk3);
  try { if (localStorage.getItem(ANAHTAR + '-sinif')) document.body.classList.add('sinif'); } catch (e) {}

  document.body.innerHTML =
    '<div class="ust">' +
      '<button class="geri" id="ustGeri" onclick="KAM.geri()" aria-label="Geri">←</button>' +
      '<div class="baslik" id="ustBaslik"></div>' +
      '<div class="rozetler"><span id="ustKart"></span><span id="ustXp"></span></div>' +
    '</div>' +
    '<main>' +
      '<section class="ekran aktif" id="ekran-ev"></section>' +
      '<section class="ekran" id="ekran-ic"></section>' +
      '<section class="ekran" id="ekran-oyun"></section>' +
    '</main>';

  evCiz();
  goster('ev');
}

/* Dışa açılan arayüz */
window.KAM = {
  geri: geri, vitrin: vitrin, kart: kartDetay, agac: agac,
  oyun: oyunAc, kilitAc: kilitAc, kilitKapat: kilitKapat,
  profil: profil, sinifMod: sinifMod, sifirla: sifirla
};

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', baslat);
else baslat();

})();
