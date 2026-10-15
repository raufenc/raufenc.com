/* Ders Odası — canlı ders eşlemesi (1 öğretmen + 1-3 öğrenci)
   Mesajlar üç taşıyıcıdan biri/birkaçı ile gider:
     • BroadcastChannel : aynı tarayıcıdaki sekmeler (deneme ve tek cihaz)
     • platform köprüsü : ana platform postMessage ile alır ve diğer
                          katılımcılara iletir (platformun kendi gerçek zamanlı kanalı)
     • WebSocket        : ?ws=wss://… verilirse doğrudan bir oda sunucusu
   Mesaj zarfı: { k:'ders-odasi', oda, gonderen:{id,ad,rol}, tur, veri, t } */
(function () {
  'use strict';
  var DO = window.DO;

  var Canli = DO.Canli = {
    acik: false, oda: null, ben: null,
    katilimcilar: {},     // id -> {id, ad, rol, son, blok, puan, el}
    olay: DO.yayin(),
    tasiyicilar: []
  };

  Canli.baslat = function (o) {
    if (!o.oda) return false;
    Canli.oda = o.oda;
    Canli.ben = { id: o.id, ad: o.ad, rol: o.rol };
    Canli.acik = true;

    if ('BroadcastChannel' in window) {
      var kanal = new BroadcastChannel('ders-odasi-' + o.oda);
      kanal.onmessage = function (e) { al(e.data); };
      Canli.tasiyicilar.push({ ad: 'sekme', gonder: function (m) { kanal.postMessage(m); } });
    }
    if (window.parent !== window) {
      var koken = DO.param('host');
      if (!koken) { try { koken = new URL(document.referrer).origin; } catch (e) { koken = null; } }
      if (koken) {
        window.addEventListener('message', function (e) {
          if (e.origin !== koken || !e.data || e.data.kaynak !== 'ders-odasi-platform') return;
          al(e.data.mesaj);
        });
        Canli.tasiyicilar.push({ ad: 'platform', gonder: function (m) { window.parent.postMessage({ kaynak: 'ders-odasi', tur: 'canli', veri: m }, koken); } });
      }
    }
    var ws = DO.param('ws');
    if (ws) wsBagla(ws);

    Canli.gonder('merhaba', { blok: o.blok || 0 });
    setInterval(function () { Canli.gonder('nabiz', {}); temizle(); }, 5000);
    window.addEventListener('pagehide', function () { Canli.gonder('ayrildi', {}); });
    return true;
  };

  function wsBagla(adres) {
    var soket, sira = [];
    function ac() {
      try { soket = new WebSocket(adres + (adres.indexOf('?') > 0 ? '&' : '?') + 'oda=' + encodeURIComponent(Canli.oda)); } catch (e) { return; }
      soket.onopen = function () { sira.splice(0).forEach(function (m) { soket.send(m); }); };
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
    var m = { k: 'ders-odasi', oda: Canli.oda, gonderen: Canli.ben, tur: tur, veri: veri || {}, kime: kime || null, t: Date.now() };
    Canli.tasiyicilar.forEach(function (t) { try { t.gonder(m); } catch (e) { /* yok */ } });
  };

  function al(m) {
    if (!m || m.k !== 'ders-odasi' || m.oda !== Canli.oda || !m.gonderen) return;
    if (m.gonderen.id === Canli.ben.id) return;
    if (m.kime && m.kime !== Canli.ben.id) return;
    var g = m.gonderen;
    var kat = Canli.katilimcilar[g.id] || (Canli.katilimcilar[g.id] = { id: g.id, ad: g.ad, rol: g.rol, puan: 0, max: 0 });
    kat.ad = g.ad; kat.rol = g.rol; kat.son = Date.now();
    if (m.tur === 'merhaba') {
      kat.blok = m.veri.blok;
      // Yeni gelen herkese kendimizi tanıtalım
      Canli.gonder('tanit', { blok: Canli.benimBlok || 0 }, g.id);
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

  Canli.ogrenciler = function () {
    return Object.keys(Canli.katilimcilar).map(function (k) { return Canli.katilimcilar[k]; })
      .filter(function (k) { return k.rol === 'ogrenci'; });
  };
  Canli.ogretmenVar = function () {
    return Object.keys(Canli.katilimcilar).some(function (k) { return Canli.katilimcilar[k].rol === 'ogretmen'; });
  };
})();
