/* Ders Odası — canlı ders eşlemesi (1 öğretmen + 1-3 öğrenci)
   Mesajlar şu taşıyıcıların biri/birkaçı ile gider:
     • Firebase         : ayarlar.js'te firebase ayarı varsa farklı cihazlar arası (önerilen)
     • BroadcastChannel : aynı tarayıcıdaki sekmeler (deneme ve tek cihaz)
     • platform köprüsü : ana platform postMessage ile alır ve diğer
                          katılımcılara iletir (platformun kendi gerçek zamanlı kanalı)
     • WebSocket        : ?ws=wss://… verilirse doğrudan bir oda sunucusu
   Mesaj zarfı: { k:'ders-odasi', oda, mid, gonderen:{id,ad,rol}, tur, veri, kime, t } */
(function () {
  'use strict';
  var DO = window.DO;

  var Canli = DO.Canli = {
    acik: false, oda: null, ben: null,
    katilimcilar: {},     // id -> {id, ad, rol, son, blok, puan, el}
    olay: DO.yayin(),
    tasiyicilar: [],
    baglanti: {}          // taşıyıcı adı -> 'hazir' | 'baglaniyor' | 'hata'
  };
  var gorulen = {}, gorulenSira = [];   // aynı mesaj iki taşıyıcıdan gelirse bir kez işlenir

  Canli.baslat = function (o) {
    if (!o.oda) return false;
    Canli.oda = o.oda;
    Canli.ben = { id: o.id, ad: o.ad, rol: o.rol };
    Canli.acik = true;

    if ('BroadcastChannel' in window) {
      var kanal = new BroadcastChannel('ders-odasi-' + o.oda);
      kanal.onmessage = function (e) { al(e.data); };
      Canli.tasiyicilar.push({ ad: 'sekme', gonder: function (m) { kanal.postMessage(m); } });
      Canli.baglanti.sekme = 'hazir';
    }
    var fb = (window.DO_AYAR || {}).firebase;
    if (fb && fb.databaseURL) firebaseBagla(fb);
    if (window.parent !== window) {
      var koken = DO.param('host');
      if (!koken) { try { koken = new URL(document.referrer).origin; } catch (e) { koken = null; } }
      if (koken) {
        window.addEventListener('message', function (e) {
          if (e.origin !== koken || !e.data || e.data.kaynak !== 'ders-odasi-platform') return;
          al(e.data.mesaj);
        });
        Canli.tasiyicilar.push({ ad: 'platform', gonder: function (m) { window.parent.postMessage({ kaynak: 'ders-odasi', tur: 'canli', veri: m }, koken); } });
        Canli.baglanti.platform = 'hazir';
      }
    }
    var ws = DO.param('ws');
    if (ws) wsBagla(ws);

    Canli.gonder('merhaba', { blok: o.blok || 0 });
    Canli.gonder('nabiz', {});
    setInterval(function () { Canli.gonder('nabiz', {}); temizle(); }, 5000);
    window.addEventListener('pagehide', function () { Canli.gonder('ayrildi', {}); });
    return true;
  };

  function wsBagla(adres) {
    var soket, sira = [];
    function ac() {
      try { soket = new WebSocket(adres + (adres.indexOf('?') > 0 ? '&' : '?') + 'oda=' + encodeURIComponent(Canli.oda)); } catch (e) { return; }
      soket.onopen = function () { Canli.baglanti.websocket = 'hazir'; sira.splice(0).forEach(function (m) { soket.send(m); }); };
      soket.onmessage = function (e) { try { al(JSON.parse(e.data)); } catch (x) { /* bozuk */ } };
      soket.onclose = function () { setTimeout(ac, 2500); };
    }
    ac();
    Canli.tasiyicilar.push({
      ad: 'websocket', gonder: function (m) {
        var s = JSON.stringify(m);
        if (soket && soket.readyState === 1) soket.send(s); else sira.push(s);
      }
    });
  }

  Canli.gonder = function (tur, veri, kime) {
    if (!Canli.acik) return;
    var m = { k: 'ders-odasi', oda: Canli.oda, mid: DO.uuid(), gonderen: Canli.ben, tur: tur, veri: veri || {}, kime: kime || null, t: Date.now() };
    Canli.tasiyicilar.forEach(function (t) { try { t.gonder(m); } catch (e) { /* yok */ } });
  };

  function al(m) {
    if (!m || m.k !== 'ders-odasi' || m.oda !== Canli.oda || !m.gonderen) return;
    if (m.gonderen.id === Canli.ben.id) return;
    if (m.kime && m.kime !== Canli.ben.id) return;
    if (m.mid) {
      if (gorulen[m.mid]) return;
      gorulen[m.mid] = 1; gorulenSira.push(m.mid);
      if (gorulenSira.length > 2000) delete gorulen[gorulenSira.shift()];
    }
    var g = m.gonderen;
    var kat = Canli.katilimcilar[g.id] || (Canli.katilimcilar[g.id] = { id: g.id, ad: g.ad, rol: g.rol, puan: 0, max: 0 });
    kat.ad = g.ad; kat.rol = g.rol; kat.son = Date.now();
    if (m.tur === 'merhaba') {
      kat.blok = m.veri.blok;
      // Yeni gelen herkese kendimizi tanıtalım
      Canli.gonder('tanit', { blok: Canli.benimBlok || 0, oda: Canli.odaDurumu ? Canli.odaDurumu() : null }, g.id);
      Canli.olay.emit('katilim', kat);
    }
    if (m.tur === 'tanit') { kat.blok = m.veri.blok; Canli.olay.emit('katilim', kat); }
    if (m.tur === 'ayrildi') { delete Canli.katilimcilar[g.id]; Canli.olay.emit('katilim', null); }
    if (m.tur === 'konum') kat.blok = m.veri.blok;
    if (m.tur === 'puan') { kat.puan = m.veri.puan; kat.max = m.veri.max; }
    if (m.tur === 'el') kat.el = m.veri.kalkik;
    Canli.olay.emit(m.tur, { veri: m.veri, gonderen: kat, ham: m });
    Canli.olay.emit('herhangi', m);
  }

  function temizle() {
    var simdi = Date.now(), degisti = false;
    for (var id in Canli.katilimcilar) {
      if (simdi - (Canli.katilimcilar[id].son || 0) > 16000) { delete Canli.katilimcilar[id]; degisti = true; }
    }
    if (degisti) Canli.olay.emit('katilim', null);
  }

  /* ---------------------------------------------------------------------
     FIREBASE REALTIME DATABASE
     do-odalar/<oda>/mesajlar/<push>  : olay mesajları (merhaba, git, cevap, ifade…)
     do-odalar/<oda>/kisiler/<kişi>   : nabız (bağlantı kopunca kendiliğinden silinir)
     do-odalar/<oda>/isaret           : lazer işaretçi (üzerine yazılır, birikmez)
     --------------------------------------------------------------------- */
  var FB_SURUM = '10.12.2';
  function betikYukle(src) {
    return new Promise(function (tamam, hata) {
      var s = document.createElement('script'); s.src = src; s.onload = tamam; s.onerror = hata;
      document.head.appendChild(s);
    });
  }
  function anahtar(s) { return String(s).replace(/[.#$\[\]\/]/g, '_'); }
  function firebaseBagla(ayar) {
    var sira = [], hazir = false, oda = null, sapma = 0;
    Canli.baglanti.firebase = 'baglaniyor';
    var tas = {
      ad: 'firebase',
      gonder: function (m) { if (hazir) yaz(m); else sira.push(m); }
    };
    Canli.tasiyicilar.push(tas);
    var kok = 'https://www.gstatic.com/firebasejs/' + FB_SURUM + '/';
    var yukle = window.firebase && window.firebase.database ? Promise.resolve() :
      betikYukle(kok + 'firebase-app-compat.js')
        .then(function () { return betikYukle(kok + 'firebase-auth-compat.js'); })
        .then(function () { return betikYukle(kok + 'firebase-database-compat.js'); });
    yukle.then(function () {
      var app = firebase.apps.filter(function (a) { return a.name === 'ders-odasi'; })[0] || firebase.initializeApp(ayar, 'ders-odasi');
      var auth = app.auth(), db = app.database();
      if (ayar.emulator) { db.useEmulator(ayar.emulator.host, ayar.emulator.db); auth.useEmulator('http://' + ayar.emulator.host + ':' + ayar.emulator.auth); }
      return auth.signInAnonymously().then(function () { return db; });
    }).then(function (db) {
      oda = db.ref('do-odalar/' + anahtar(Canli.oda));
      db.ref('.info/serverTimeOffset').on('value', function (s) { sapma = s.val() || 0; });
      var baslangic = Date.now() + sapma - 4000;
      // Odadaki yeni mesajlar
      oda.child('mesajlar').orderByChild('t').startAt(baslangic).on('child_added', function (s) {
        var v = s.val(); if (!v || !v.m) return;
        try { al(JSON.parse(v.m)); } catch (e) { /* bozuk */ }
      });
      oda.child('kisiler').on('child_added', kisi);
      oda.child('kisiler').on('child_changed', kisi);
      function kisi(s) { var v = s.val(); if (v && v.m) { try { al(JSON.parse(v.m)); } catch (e) { /* bozuk */ } } }
      oda.child('isaret').on('value', function (s) { var v = s.val(); if (v && v.m) { try { al(JSON.parse(v.m)); } catch (e) { /* bozuk */ } } });
      // Kopunca: nabzı sil, "ayrıldı" bırak
      var ben = oda.child('kisiler/' + anahtar(Canli.ben.id));
      ben.onDisconnect().remove();
      var veda = { k: 'ders-odasi', oda: Canli.oda, mid: DO.uuid(), gonderen: Canli.ben, tur: 'ayrildi', veri: {}, kime: null, t: Date.now() };
      oda.child('mesajlar').push().onDisconnect().set({ m: JSON.stringify(veda), t: firebase.database.ServerValue.TIMESTAMP });
      // Öğretmen eski (6 saatten eski) mesajları temizler
      if (Canli.ben.rol === 'ogretmen') {
        oda.child('mesajlar').orderByChild('t').endAt(Date.now() + sapma - 6 * 3600e3).limitToFirst(500).once('value', function (s) {
          s.forEach(function (c) { c.ref.remove().catch(function () { /* izin yok */ }); });
        });
      }
      hazir = true;
      Canli.baglanti.firebase = 'hazir';
      Canli.olay.emit('baglanti', Canli.baglanti);
      sira.splice(0).forEach(yaz);
    }).catch(function (e) {
      console.warn('Firebase bağlantısı kurulamadı:', e);
      Canli.baglanti.firebase = 'hata';
      Canli.olay.emit('baglanti', Canli.baglanti);
    });
    function yaz(m) {
      var kayit = { m: JSON.stringify(m), t: firebase.database.ServerValue.TIMESTAMP };
      var is;
      if (m.tur === 'nabiz') is = oda.child('kisiler/' + anahtar(m.gonderen.id)).set(kayit);
      else if (m.tur === 'isaret') is = oda.child('isaret').set(kayit);
      else is = oda.child('mesajlar').push(kayit);
      if (is && is.catch) is.catch(function (e) { console.warn('Firebase yazılamadı', m.tur, e); });
    }
  }
  Canli.uzaktanBagli = function () { return Canli.baglanti.firebase === 'hazir' || Canli.baglanti.websocket === 'hazir' || !!Canli.baglanti.platform; };

  Canli.ogrenciler = function () {
    return Object.keys(Canli.katilimcilar).map(function (k) { return Canli.katilimcilar[k]; })
      .filter(function (k) { return k.rol === 'ogrenci'; });
  };
  Canli.ogretmenVar = function () {
    return Object.keys(Canli.katilimcilar).some(function (k) { return Canli.katilimcilar[k].rol === 'ogretmen'; });
  };
})();
