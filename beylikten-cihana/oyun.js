/* BEYLİKTEN CİHANA — oyun motoru (zarsız Sefer Kartı, botlar, animasyonlar) */
(function () {
  "use strict";

  var V = window.OYUN_VERISI;
  var K = V.kareler;

  var RENKLER = [
    { ad: "Yeşil Sancak", renk: "#1e8449" },
    { ad: "Al Bayrak", renk: "#c0392b" },
    { ad: "Mavi Tuğra", renk: "#2471a3" },
    { ad: "Altın Hilal", renk: "#b7950b" },
  ];
  var BINA_IKON = ["🏨", "♨️", "🏫", "🕌", "🏛️"]; // Han, Hamam, Medrese, Cami, Külliye

  var SEFER = (V.ilerlemeKartlari && V.ilerlemeKartlari.length) ? V.ilerlemeKartlari : yedekSefer();
  function yedekSefer() { var a = [], i; for (i = 1; i <= 12; i++) { a.push({ sayi: i, baslik: "Sefer (" + i + ")", bilgi: i + " kare ilerle." }); a.push({ sayi: i, baslik: "Sefer (" + i + ")", bilgi: i + " kare ilerle." }); } return a; }

  var oyun = null;
  var BOT_HIZ = 1; // gecikme çarpanı

  // ---------- yardımcılar ----------
  function $(s) { return document.querySelector(s); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function fmt(n) { return n.toLocaleString("tr-TR") + " akçe"; }
  function aktif() { return oyun.oyuncular[oyun.sira]; }
  function bekle(fn, ms) { return setTimeout(fn, ms * BOT_HIZ); }
  function gridYeri(pos) {
    if (pos === 0) return { r: 11, c: 11 };
    if (pos < 10) return { r: 11, c: 11 - pos };
    if (pos === 10) return { r: 11, c: 1 };
    if (pos < 20) return { r: 11 - (pos - 10), c: 1 };
    if (pos === 20) return { r: 1, c: 1 };
    if (pos < 30) return { r: 1, c: 1 + (pos - 20) };
    if (pos === 30) return { r: 1, c: 11 };
    return { r: 1 + (pos - 30), c: 11 };
  }
  function sahipOyuncu(id) { for (var i = 0; i < oyun.oyuncular.length; i++) if (oyun.oyuncular[i].id === id) return oyun.oyuncular[i]; return null; }
  function karistir(n) { var a = [], i, j, t; for (i = 0; i < n; i++) a.push(i); for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function logla(msg, sinif) { var box = $("#log"); box.insertBefore(el("div", "log-satir" + (sinif ? " " + sinif : ""), msg), box.firstChild); }

  // ---------- kurulum ----------
  function kurulumEkrani() {
    var s = $("#kurulum-oyuncular"); s.innerHTML = "";
    var n = parseInt($("#oyuncu-sayisi").value, 10);
    for (var i = 0; i < n; i++) {
      var row = el("div", "kur-row");
      var sw = el("span", "kur-sw"); sw.style.background = RENKLER[i].renk;
      var inp = el("input"); inp.type = "text"; inp.maxLength = 16; inp.value = i === 0 ? "Sen" : "Bot " + i;
      inp.dataset.i = i;
      var tog = el("div", "tip-toggle");
      var bSen = el("button", i === 0 ? "sec" : "", "👤 Sen"); bSen.dataset.tip = "insan";
      var bBot = el("button", i === 0 ? "" : "sec", "🤖 Bot"); bBot.dataset.tip = "bot";
      tog.dataset.bot = i === 0 ? "0" : "1";
      bSen.addEventListener("click", function (e) { var t = e.target.parentNode; t.dataset.bot = "0"; t.children[0].classList.add("sec"); t.children[1].classList.remove("sec"); });
      bBot.addEventListener("click", function (e) { var t = e.target.parentNode; t.dataset.bot = "1"; t.children[1].classList.add("sec"); t.children[0].classList.remove("sec"); });
      tog.appendChild(bSen); tog.appendChild(bBot);
      row.appendChild(sw); row.appendChild(inp); row.appendChild(tog);
      s.appendChild(row);
    }
  }

  function oyunBaslat() {
    var n = parseInt($("#oyuncu-sayisi").value, 10);
    var rows = document.querySelectorAll("#kurulum-oyuncular .kur-row");
    var oyuncular = [];
    for (var i = 0; i < n; i++) {
      var bot = rows[i].querySelector(".tip-toggle").dataset.bot === "1";
      oyuncular.push({
        id: i, ad: rows[i].querySelector("input").value.trim() || (bot ? "Bot " + i : "Oyuncu " + (i + 1)),
        renk: RENKLER[i].renk, sancak: RENKLER[i].ad, bot: bot,
        para: V.ayarlar.baslangicPara, pos: 0, esaret: false, esaretTur: 0, esaretKarti: 0, iflas: false, mulkler: [],
      });
    }
    K.forEach(function (k) { if (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") { k.sahip = null; k.imar = 0; k.ipotekli = false; } });
    oyun = {
      oyuncular: oyuncular, sira: 0, hareketYapildi: false, sonHareket: 0, hareketEden: null, _para: {}, _yeniImar: -1,
      seferDeste: karistir(SEFER.length), si: 0, fermanDeste: karistir(V.ferman.length), fi: 0,
      vakcaDeste: karistir(V.vakca.length), vi: 0, bitti: false,
    };
    $("#kurulum").classList.add("gizli"); $("#oyun").classList.remove("gizli");
    tahtaKur(); render();
    logla("<b>Oyun başladı!</b> " + oyuncular.map(function (o) { return o.ad + (o.bot ? " 🤖" : ""); }).join(", ") + ". Hayırlı seferler!", "vurgu");
    if (aktif().bot) bekle(botTuru, 900);
  }

  // ---------- tahta DOM ----------
  function tahtaKur() {
    var t = $("#tahta"); t.innerHTML = "";
    var merkez = el("div", "merkez");
    merkez.innerHTML =
      '<div class="merkez-ic"><div class="logo-ust">BEYLİKTEN</div><div class="logo-orta">CİHANA</div>' +
      '<div class="logo-alt">Türk-İslam Medeniyeti Strateji Oyunu</div>' +
      '<div class="deste-kutu"><div class="sefer-mini" id="sefer-mini"><div class="sm-no" id="sefer-no">?</div><div class="sm-et">SEFER<br>KARTI</div></div>' +
      '<div class="deste deste-ferman">FERMAN</div><div class="deste deste-vakca">VAK\'A</div></div></div>';
    t.appendChild(merkez);
    K.forEach(function (k) {
      var g = gridYeri(k.pos);
      var c = el("div", "kare kare-" + k.tip);
      c.style.gridRow = g.r; c.style.gridColumn = g.c; c.dataset.pos = k.pos;
      if ([0, 10, 20, 30].indexOf(k.pos) >= 0) c.classList.add("kose");
      c.appendChild(kareIc(k));
      var pl = el("div", "pawnlar"); pl.dataset.pawn = k.pos; c.appendChild(pl);
      c.addEventListener("click", function () { kareBilgiModal(k.pos); });
      t.appendChild(c);
    });
  }
  function kareIc(k) {
    var ic = el("div", "kare-ic");
    if (k.tip === "sehir") ic.innerHTML = '<div class="serit" style="background:' + k.grup.renk + '"></div><div class="kare-ad">' + k.ad + '</div><div class="imar-rozet" data-imar="' + k.pos + '"></div><div class="kare-fiyat" data-fiyat="' + k.pos + '">' + k.fiyat + '</div>';
    else if (k.tip === "liman") ic.innerHTML = '<div class="kare-ikon">⚓</div><div class="kare-ad">' + k.kisa + '</div><div class="kare-fiyat" data-fiyat="' + k.pos + '">' + k.fiyat + '</div>';
    else if (k.tip === "utility") ic.innerHTML = '<div class="kare-ikon">' + (k.ad === "Darphane" ? "🪙" : "🕌") + '</div><div class="kare-ad">' + k.ad + '</div><div class="kare-fiyat" data-fiyat="' + k.pos + '">' + k.fiyat + '</div>';
    else if (k.tip === "vergi") ic.innerHTML = '<div class="kare-ikon">💰</div><div class="kare-ad">' + k.ad + '</div><div class="kare-fiyat">' + k.tutar + '</div>';
    else if (k.tip === "ferman") ic.innerHTML = '<div class="kare-ikon">📜</div><div class="kare-ad">Ferman</div>';
    else if (k.tip === "vakca") ic.innerHTML = '<div class="kare-ikon">✴️</div><div class="kare-ad">Vak\'a</div>';
    else if (k.tip === "baslangic") ic.innerHTML = '<div class="kare-ikon">🏇</div><div class="kare-ad">Sefer<br>Meydanı</div>';
    else if (k.tip === "esaret") ic.innerHTML = '<div class="kare-ikon">⛓️</div><div class="kare-ad">Esaret<br>Yedikule</div>';
    else if (k.tip === "kervansaray") ic.innerHTML = '<div class="kare-ikon">🏕️</div><div class="kare-ad">Kervansaray</div>';
    else if (k.tip === "surgun") ic.innerHTML = '<div class="kare-ikon">🚷</div><div class="kare-ad">Sürgün</div>';
    return ic;
  }

  // ---------- render ----------
  function render() {
    var pano = $("#oyuncular"); pano.innerHTML = "";
    oyun.oyuncular.forEach(function (o) {
      var d = el("div", "oyuncu-kart" + (o.id === oyun.sira ? " aktif" : "") + (o.iflas ? " iflas" : ""));
      d.style.borderColor = o.renk;
      var degisti = oyun._para[o.id] != null && oyun._para[o.id] !== o.para;
      var yon = degisti ? (o.para > oyun._para[o.id] ? " arti" : " eksi") : "";
      d.innerHTML =
        '<div class="ok-bas"><span class="ok-sw" style="background:' + o.renk + '"></span><span class="ok-ad">' + o.ad + (o.bot ? " 🤖" : "") + (o.iflas ? " (iflas)" : "") + '</span></div>' +
        '<div class="ok-para' + yon + '">' + fmt(o.para) + '</div>' +
        '<div class="ok-alt">' + o.mulkler.length + ' mülk' + (o.esaret ? ' · ⛓️ esaret' : '') + (o.esaretKarti ? ' · 📜×' + o.esaretKarti : '') + '</div>';
      pano.appendChild(d);
      oyun._para[o.id] = o.para;
    });
    K.forEach(function (k) {
      if (k.tip !== "sehir" && k.tip !== "liman" && k.tip !== "utility") return;
      var cell = document.querySelector('.kare[data-pos="' + k.pos + '"]'); if (!cell) return;
      cell.classList.toggle("sahipli", k.sahip != null);
      cell.classList.toggle("ipotekli", !!k.ipotekli);
      var sahip = k.sahip != null ? sahipOyuncu(k.sahip) : null;
      cell.style.boxShadow = sahip ? "inset 0 0 0 3px " + sahip.renk : "";
      var fiyatEl = cell.querySelector("[data-fiyat]");
      if (fiyatEl) fiyatEl.textContent = sahip ? (k.ipotekli ? "ipotek" : (sahip.ad.length > 9 ? sahip.ad.slice(0, 9) : sahip.ad)) : k.fiyat;
      if (k.tip === "sehir") {
        var rozet = cell.querySelector("[data-imar]");
        if (rozet) {
          if (k.imar > 0) rozet.innerHTML = '<span class="imar-bina' + (k.imar >= 5 ? " kulliye" : "") + (k.pos === oyun._yeniImar ? " imar-yeni" : "") + '">' + BINA_IKON[k.imar - 1] + '</span>';
          else rozet.innerHTML = "";
        }
      }
    });
    oyun._yeniImar = -1;
    document.querySelectorAll(".pawnlar").forEach(function (p) { p.innerHTML = ""; });
    oyun.oyuncular.forEach(function (o) {
      if (o.iflas) return;
      var layer = document.querySelector('.pawnlar[data-pawn="' + o.pos + '"]');
      if (layer) { var pw = el("span", "pawn" + (o.bot ? " bot" : "") + (o.id === oyun.hareketEden ? " pawn-hareket" : "")); pw.style.background = o.renk; pw.title = o.ad; layer.appendChild(pw); }
    });
    var sn = $("#sefer-no"); if (sn) sn.textContent = oyun.sonHareket || "?";
    butonlariGuncelle();
  }
  function vurgulaKare(pos) {
    var c = document.querySelector('.kare[data-pos="' + pos + '"]');
    if (c) { c.classList.remove("vurgu"); void c.offsetWidth; c.classList.add("vurgu"); setTimeout(function () { c.classList.remove("vurgu"); }, 1200); }
  }

  function butonlariGuncelle() {
    var o = aktif(), k = K[o.pos], bar = $("#aksiyon-bar"); bar.innerHTML = "";
    $("#sira-bilgi").innerHTML = '<span class="sw" style="background:' + o.renk + '"></span> Sıra: <b>' + o.ad + '</b>' + (o.bot ? '<span class="bot-rozet">BOT</span>' : '') + ' · ' + fmt(o.para);
    if (oyun.bitti) { bar.appendChild(btn("🔄 Yeni Oyun", "btn-ana", function () { location.reload(); })); return; }
    if (o.bot) { bar.appendChild(el("div", "bot-oynuyor", '<span class="bot-spinner"></span>🤖 ' + o.ad + ' oynuyor…')); return; }

    if (o.esaret) {
      if (!oyun.hareketYapildi) {
        if (o.para >= V.ayarlar.esaretCikisBedeli) bar.appendChild(btn("💰 Fidye Öde (" + V.ayarlar.esaretCikisBedeli + ")", "btn-ana", function () { fidyeOde(); }));
        if (o.esaretKarti > 0) bar.appendChild(btn("📜 Ferman Kullan", "", fermanCikis));
        bar.appendChild(btn("📚 Bilgiyle Çık", "", function () { soruModal("esaret"); }));
        bar.appendChild(btn("⏭️ Bu Turu Geç", "", function () { esaretGec(); }));
      } else bar.appendChild(btn("➡️ Turu Bitir", "btn-ana", turuBitir));
      return;
    }
    if (!oyun.hareketYapildi) {
      bar.appendChild(btn("📜 Sefer Kartı Çek", "btn-ana", function () { seferKartiCek(); }));
      bar.appendChild(btn("🏛️ Mülklerim", "", mulklerModal));
      return;
    }
    var alinabilir = (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") && k.sahip == null && !k.ipotekli;
    if (alinabilir && o.para >= k.fiyat) {
      bar.appendChild(btn("🏰 Fethet (" + fmt(k.fiyat) + ")", "btn-ana", function () { satinAl(k.pos, 1); }));
      bar.appendChild(btn("📚 Bilgiyle Fethet (-%25)", "", function () { soruModal("fetih"); }));
    } else if (alinabilir) bar.appendChild(btn("🏰 Param yetmiyor", "btn-pasif", null, true));
    if (imarYapilabilirVarMi(o)) bar.appendChild(btn("🏗️ İmar Yap", "", imarModal));
    if (o.mulkler.length) bar.appendChild(btn("🏛️ Mülklerim", "", mulklerModal));
    bar.appendChild(btn("➡️ Turu Bitir", "btn-ana", turuBitir));
  }
  function btn(text, cls, fn, pasif) { var b = el("button", "akbtn " + (cls || ""), text); if (pasif) b.disabled = true; if (fn) b.addEventListener("click", fn); return b; }

  // ---------- Sefer Kartı ----------
  function seferKartiCek(bitince) {
    if (oyun.si >= oyun.seferDeste.length) { oyun.seferDeste = karistir(SEFER.length); oyun.si = 0; }
    var kart = SEFER[oyun.seferDeste[oyun.si]]; oyun.si++;
    seferModal(kart, bitince);
  }
  function seferModal(kart, bitince) {
    var o = aktif();
    modalAc('<div class="kart-ust" style="background:#7a5b1a">🏇 SEFER KARTI</div>' +
      '<div class="sefer-buyuk"><div class="sb-no">' + kart.sayi + '</div><div class="sb-alt">kare ilerle</div></div>' +
      '<h2 style="text-align:center;margin:.3em 0">' + kart.baslik + '</h2>' +
      '<div class="kart-ogren">💡 ' + kart.bilgi + '</div>' +
      '<div class="m-btnlar"><button class="akbtn btn-ana" id="m-ilerle">➡️ ' + kart.sayi + ' kare ilerle</button></div>');
    $("#m-ilerle").onclick = function () {
      modalKapat(); oyun.hareketYapildi = true; oyun.sonHareket = kart.sayi;
      logla("🏇 " + o.ad + " <b>" + kart.sayi + "</b> ilerledi — " + kart.baslik, "");
      ilerle(o, kart.sayi, true, bitince);
    };
    if (o.bot) bekle(function () { var b = $("#m-ilerle"); if (b) b.click(); }, 1500);
  }

  function ilerle(o, adim, maasVar, bitince) {
    oyun.hareketEden = o.id;
    var kalan = adim;
    (function adimAt() {
      o.pos = (o.pos + 1) % 40;
      if (o.pos === 0 && maasVar) { o.para += V.ayarlar.maas; logla("💰 " + o.ad + " Sefer Meydanı'ndan geçti: +" + fmt(V.ayarlar.maas) + " ulûfe.", "iyi"); }
      render();
      if (--kalan > 0) setTimeout(adimAt, 135);
      else { oyun.hareketEden = null; render(); setTimeout(function () { kareyeDus(o, bitince); }, 220); }
    })();
  }

  function kareyeDus(o, bitince) {
    var k = K[o.pos]; vurgulaKare(o.pos);
    setTimeout(function () {
      var bot = !!bitince;
      if (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") {
        if (k.sahip == null) {
          kareBilgiModal(o.pos, true);
          if (bot) bekle(function () { botAlKarar(o, k); bekle(bitince, 800); }, 1300);
        } else if (k.sahip !== o.id && !k.ipotekli) { kiraOde(o, k); render(); if (bot) bekle(bitince, 600); }
        else { render(); if (bot) bekle(bitince, 300); }
      } else if (k.tip === "vergi") {
        odeVeyaIflas(o, k.tutar, null, "💸 " + o.ad + " " + k.ad + " ödedi: -" + fmt(k.tutar)); render(); if (bot) bekle(bitince, 600);
      } else if (k.tip === "ferman") { kartCek("ferman", o, bitince); }
      else if (k.tip === "vakca") { kartCek("vakca", o, bitince); }
      else if (k.tip === "surgun") { logla("🚷 " + o.ad + " sürgün edildi!", "kotu"); esareteGonder(o); render(); if (bot) bekle(bitince, 600); }
      else { render(); if (bot) bekle(bitince, 300); }
    }, 280);
  }

  function esareteGonder(o) { o.pos = 10; o.esaret = true; o.esaretTur = 0; render(); }

  // ---------- kira & para ----------
  function kiraOde(o, k) { var sahip = sahipOyuncu(k.sahip), m = kiraHesap(k, sahip); odeVeyaIflas(o, m, sahip, "🏰 " + o.ad + ", " + sahip.ad + "'in " + k.ad + " şehrine düştü: -" + fmt(m)); render(); }
  function kiraHesap(k, sahip) {
    if (k.tip === "sehir") { if (k.imar > 0) return k.kira[k.imar]; return grupTamMi(k.grupKey, sahip.id) ? k.kira[0] * 2 : k.kira[0]; }
    if (k.tip === "liman") return k.kira[Math.max(0, sahipLimanSayisi(sahip.id) - 1)];
    if (k.tip === "utility") return (oyun.sonHareket || 6) * k.carpan[Math.min(1, sahipUtilSayisi(sahip.id) - 1)];
    return 0;
  }
  function odeVeyaIflas(o, miktar, alacakli, mesaj) {
    if (o.para >= miktar) { o.para -= miktar; if (alacakli) alacakli.para += miktar; logla(mesaj, alacakli ? "" : "kotu"); }
    else { logla(mesaj + " — fakat parası yetmedi!", "kotu"); iflasEt(o, alacakli); }
  }
  function iflasEt(o, alacakli) {
    o.iflas = true;
    o.mulkler.forEach(function (pos) { var k = K[pos]; k.sahip = alacakli ? alacakli.id : null; k.imar = 0; k.ipotekli = false; if (alacakli) alacakli.mulkler.push(pos); });
    if (alacakli) alacakli.para += Math.max(0, o.para);
    o.mulkler = []; o.para = 0;
    logla("🏳️ <b>" + o.ad + " iflas etti!</b> Mülkleri " + (alacakli ? alacakli.ad + "'e geçti." : "hazineye döndü."), "kotu");
    galibiyetKontrol();
  }
  function satinAl(pos, oran) {
    var o = aktif(), k = K[pos], fiyat = Math.round(k.fiyat * oran);
    if (o.para < fiyat) { logla("Yetersiz akçe.", "kotu"); return; }
    o.para -= fiyat; k.sahip = o.id; o.mulkler.push(pos); o.mulkler.sort(function (a, b) { return a - b; });
    logla("🏰 " + o.ad + ", <b>" + k.ad + "</b> şehrini fethetti: -" + fmt(fiyat) + (oran < 1 ? " (bilgi indirimi!)" : ""), "iyi");
    modalKapat(); render();
  }

  // ---------- imar ----------
  function grupKareler(key) { return K.filter(function (k) { return k.tip === "sehir" && k.grupKey === key; }); }
  function grupTamMi(key, id) { return grupKareler(key).every(function (k) { return k.sahip === id && !k.ipotekli; }); }
  function sahipLimanSayisi(id) { return K.filter(function (k) { return k.tip === "liman" && k.sahip === id; }).length; }
  function sahipUtilSayisi(id) { return K.filter(function (k) { return k.tip === "utility" && k.sahip === id; }).length; }
  function imarYapilabilirVarMi(o) { return K.some(function (k) { return k.tip === "sehir" && k.sahip === o.id && grupTamMi(k.grupKey, o.id) && k.imar < 5 && o.para >= k.imarBedeli && imarDengeli(k, 1); }); }
  function imarDengeli(k, art) { var g = grupKareler(k.grupKey), min = Math.min.apply(null, g.map(function (x) { return x.imar; })); return (k.imar + art) - min <= 1; }
  function imarYap(pos) {
    var o = aktif(), k = K[pos];
    if (!grupTamMi(k.grupKey, o.id) || k.imar >= 5 || !imarDengeli(k, 1) || o.para < k.imarBedeli) { logla("İmar koşulu sağlanmadı.", "kotu"); return; }
    o.para -= k.imarBedeli; k.imar++; oyun._yeniImar = pos;
    logla("🏗️ " + o.ad + ", " + k.ad + "'e <b>" + V.imarKademeleri[k.imar - 1].ad + "</b> yaptırdı: -" + fmt(k.imarBedeli), "iyi");
    render(); imarModal();
  }

  // ---------- olay kartları ----------
  function kartCek(tur, o, bitince) {
    var deste = tur === "ferman" ? V.ferman : V.vakca, sira = tur === "ferman" ? oyun.fermanDeste : oyun.vakcaDeste, ref = tur === "ferman" ? "fi" : "vi";
    if (oyun[ref] >= sira.length) oyun[ref] = 0;
    var kart = deste[sira[oyun[ref]]]; oyun[ref]++;
    kartModal(tur, kart, o, bitince);
  }
  function imarToplam(id) { return K.filter(function (k) { return k.tip === "sehir" && k.sahip === id; }).reduce(function (s, k) { return s + k.imar; }, 0); }
  function kartUygula(kart, o, bitince) {
    var e = kart.etki, n;
    switch (e.tur) {
      case "para_al": o.para += e.deger; logla("📜 " + o.ad + ": +" + fmt(e.deger), "iyi"); break;
      case "para_ver": odeVeyaIflas(o, e.deger, null, "📜 " + o.ad + ": -" + fmt(e.deger)); break;
      case "mulk_basina_al": n = o.mulkler.length * e.deger; o.para += n; logla("📜 " + o.ad + " " + o.mulkler.length + " mülkünden +" + fmt(n), "iyi"); break;
      case "mulk_basina_ver": n = o.mulkler.length * e.deger; odeVeyaIflas(o, n, null, "📜 " + o.ad + " " + o.mulkler.length + " mülkü için: -" + fmt(n)); break;
      case "imar_basina_al": n = imarToplam(o.id) * e.deger; o.para += n; logla("📜 " + o.ad + " " + imarToplam(o.id) + " imardan +" + fmt(n), "iyi"); break;
      case "imar_basina_ver": n = imarToplam(o.id) * e.deger; odeVeyaIflas(o, n, null, "📜 " + o.ad + " " + imarToplam(o.id) + " imar yapısı için: -" + fmt(n)); break;
      case "liman_basina_al": n = sahipLimanSayisi(o.id) * e.deger; o.para += n; logla("📜 " + o.ad + " " + sahipLimanSayisi(o.id) + " limandan +" + fmt(n), "iyi"); break;
      case "liman_basina_ver": n = sahipLimanSayisi(o.id) * e.deger; odeVeyaIflas(o, n, null, "📜 " + o.ad + " limanları için: -" + fmt(n)); break;
      case "en_degerli_imar_yik":
        var h = null; K.forEach(function (k) { if (k.tip === "sehir" && k.sahip === o.id && k.imar > 0 && (!h || k.imar > h.imar || (k.imar === h.imar && k.fiyat > h.fiyat))) h = k; });
        if (h) { h.imar--; oyun._yeniImar = -1; logla("📜 " + o.ad + " — " + h.ad + "'de bir yapı yıkıldı.", "kotu"); } else logla("📜 " + o.ad + " — yıkılacak imar yok, etkisiz.", ""); break;
      case "herkesten_al": oyun.oyuncular.forEach(function (p) { if (p.id !== o.id && !p.iflas) { var m = Math.min(p.para, e.deger); p.para -= m; o.para += m; } }); logla("📜 " + o.ad + " herkesten " + e.deger + " akçe topladı.", "iyi"); break;
      case "herkese_ver": oyun.oyuncular.forEach(function (p) { if (p.id !== o.id && !p.iflas) odeVeyaIflas(o, e.deger, p, "📜 " + o.ad + " → " + p.ad + ": " + e.deger); }); break;
      case "basa_git_maas_al": o.pos = 0; o.para += V.ayarlar.maas; logla("📜 " + o.ad + " Sefer Meydanı'na döndü: +" + fmt(V.ayarlar.maas), "iyi"); break;
      case "esarete_git": esareteGonder(o); logla("📜 " + o.ad + " esarete düştü.", "kotu"); break;
      case "esaretten_cik_karti": o.esaretKarti++; logla("📜 " + o.ad + " bir 'Esaretten Çıkış' fermanı aldı.", "iyi"); break;
      case "ilerle_kareye": o.pos = ((e.deger % 40) + 40) % 40; modalKapat(); render(); kareyeDus(o, bitince); return;
    }
    modalKapat(); render(); if (bitince) bekle(bitince, 600);
  }
  function kartModal(tur, kart, o, bitince) {
    var renk = tur === "ferman" ? "#7d2b2b" : "#1f5c4d", etiket = tur === "ferman" ? "FERMAN" : "VAK'A";
    var etki = etkiOzet(kart.etki);
    modalAc('<div class="kart-ust" style="background:' + renk + '">' + (tur === "ferman" ? "📜 " : "✴️ ") + etiket + '</div><h2>' + kart.baslik + '</h2><p class="m-bilgi">' + kart.metin + '</p>' +
      (etki ? '<div class="m-eko" style="text-align:center;font-weight:700">▶ ' + etki + '</div>' : '') +
      '<div class="kart-ogren">💡 ' + kart.ogren + '</div><div class="m-btnlar"><button class="akbtn btn-ana" id="m-uygula">Uygula</button></div>');
    $("#m-uygula").onclick = function () { kartUygula(kart, o, bitince); };
    if (o.bot) bekle(function () { var b = $("#m-uygula"); if (b) b.click(); }, 1600);
  }
  function etkiOzet(e) {
    var t = { mulk_basina_al: "Her mülkün için al", mulk_basina_ver: "Her mülkün için öde", imar_basina_al: "Her imar yapın için al", imar_basina_ver: "Her imar yapın için öde", liman_basina_al: "Her limanın için al", liman_basina_ver: "Her limanın için öde", en_degerli_imar_yik: "En değerli yapın yıkılır", para_al: "Hazineden al", para_ver: "Hazineye öde", herkesten_al: "Herkesten al", herkese_ver: "Herkese ver" }[e.tur];
    if (!t) return "";
    return e.deger ? t + " · " + fmt(e.deger) : t;
  }

  // ---------- esaret ----------
  function fidyeOde(zorunlu) { var o = aktif(); odeVeyaIflas(o, V.ayarlar.esaretCikisBedeli, null, "💰 " + o.ad + " fidye ödedi (" + fmt(V.ayarlar.esaretCikisBedeli) + "), serbest."); o.esaret = false; render(); }
  function fermanCikis() { var o = aktif(); o.esaretKarti--; o.esaret = false; logla("📜 " + o.ad + " fermanla esaretten çıktı.", "iyi"); render(); }
  function esaretGec() {
    var o = aktif(); o.esaretTur++;
    if (o.esaretTur >= 3 && o.para >= V.ayarlar.esaretCikisBedeli) { logla(o.ad + " 3. turda fidye ödemek zorunda kaldı.", "kotu"); fidyeOde(true); o.esaret = false; }
    else logla("⛓️ " + o.ad + " esarette bekliyor (" + o.esaretTur + "/3).", "");
    oyun.hareketYapildi = true; render();
  }

  // ---------- BOTLAR ----------
  function botRezerv(o) { return 2500; }
  function botTuru() {
    var o = aktif(); if (!o || !o.bot || oyun.bitti) return;
    if (o.esaret) { bekle(botEsaret, 900); return; }
    bekle(function () { seferKartiCek(botCozum); }, 700);
  }
  function botEsaret() {
    var o = aktif();
    if (o.esaretKarti > 0) { fermanCikis(); bekle(function () { seferKartiCek(botCozum); }, 800); }
    else if (o.para >= V.ayarlar.esaretCikisBedeli + 1500) { fidyeOde(); bekle(function () { seferKartiCek(botCozum); }, 800); }
    else { esaretGec(); bekle(turuBitir, 800); }
  }
  function botAlKarar(o, k) {
    if (o.para - k.fiyat >= botRezerv(o)) satinAl(o.pos, 1);
    else { modalKapat(); render(); logla("🤖 " + o.ad + ", " + k.ad + "'i almadı (akçe biriktiriyor).", ""); }
  }
  function botCozum() {
    bekle(function () {
      var o = aktif();
      var sayac = 0;
      while (sayac < 4) {
        var aday = null;
        K.forEach(function (k) { if (k.tip === "sehir" && k.sahip === o.id && grupTamMi(k.grupKey, o.id) && k.imar < 5 && imarDengeli(k, 1) && o.para - k.imarBedeli >= botRezerv(o)) { if (!aday || k.imarBedeli < aday.imarBedeli) aday = k; } });
        if (!aday) break;
        o.para -= aday.imarBedeli; aday.imar++; oyun._yeniImar = aday.pos;
        logla("🏗️ " + o.ad + ", " + aday.ad + "'e " + V.imarKademeleri[aday.imar - 1].ad + " yaptırdı.", "iyi");
        sayac++;
      }
      render();
      bekle(turuBitir, 650);
    }, 500);
  }

  // ---------- tur ----------
  function turuBitir() {
    var n = oyun.oyuncular.length, sayac = 0;
    do { oyun.sira = (oyun.sira + 1) % n; sayac++; } while (oyun.oyuncular[oyun.sira].iflas && sayac <= n);
    oyun.hareketYapildi = false; oyun.sonHareket = 0; render();
    if (!oyun.bitti && aktif().bot) bekle(botTuru, 650);
  }
  function galibiyetKontrol() {
    var ayakta = oyun.oyuncular.filter(function (o) { return !o.iflas; });
    if (ayakta.length <= 1 && oyun.oyuncular.length > 1) { oyun.bitti = true; sonucModal(ayakta[0]); }
  }
  function servet(o) { var s = o.para; o.mulkler.forEach(function (pos) { var k = K[pos]; s += k.ipotekli ? k.ipotek : k.fiyat; if (k.tip === "sehir") s += k.imar * k.imarBedeli; }); return s; }

  // ---------- modallar ----------
  function modalAc(html, genis) { var ov = $("#modal"); ov.innerHTML = '<div class="modal-kutu' + (genis ? " genis" : "") + '">' + html + '</div>'; ov.style.display = "flex"; }
  function modalKapat() { $("#modal").style.display = "none"; $("#modal").innerHTML = ""; }

  function kiraTablosu(k) {
    var r = "";
    for (var i = 0; i < 5; i++) r += '<div class="bina-satir"><span>' + BINA_IKON[i] + ' ' + V.imarKademeleri[i].ad + '</span><b>' + k.kira[i + 1] + '</b></div>';
    return '<div class="bina-satir"><span>Boş arsa</span><b>' + k.kira[0] + '</b></div>' + r;
  }
  function kareBilgiModal(pos, dustu) {
    var k = K[pos], html = "", o = aktif();
    if (k.tip === "sehir") {
      html = '<div class="m-serit" style="background:' + k.grup.renk + '"></div><div class="m-bolge">' + k.grup.ad + '</div><h2>' + k.ad + '</h2><div class="m-tarih">🗓️ ' + (k.tarih || "") + '</div><p class="m-bilgi">' + (k.bilgi || "") + '</p>' +
        '<div class="m-eko"><b>Fiyat:</b> ' + fmt(k.fiyat) + ' · İmar/kademe: ' + fmt(k.imarBedeli) + '<br><div style="margin-top:6px"><b>Vergi (kira):</b>' + kiraTablosu(k) + '</div></div>';
    } else if (k.tip === "liman") {
      html = '<div class="m-ikon">⚓</div><h2>' + k.ad + '</h2><p class="m-bilgi">' + k.bilgi + '</p><div class="m-eko"><b>Fiyat:</b> ' + fmt(k.fiyat) + '<br>Kira (liman sayısına göre): ' + k.kira.join(" / ") + '</div>';
    } else if (k.tip === "utility") {
      html = '<div class="m-ikon">' + (k.ad === "Darphane" ? "🪙" : "🕌") + '</div><h2>' + k.ad + '</h2><p class="m-bilgi">' + k.bilgi + '</p><div class="m-eko"><b>Fiyat:</b> ' + fmt(k.fiyat) + '<br>Kira = son Sefer sayısı × ' + k.carpan[0] + ' (tek) / ×' + k.carpan[1] + ' (iki tesis)</div>';
    } else html = '<div class="m-ikon">' + ({ baslangic: "🏇", esaret: "⛓️", kervansaray: "🏕️", surgun: "🚷", ferman: "📜", vakca: "✴️", vergi: "💰" }[k.tip] || "") + '</div><h2>' + k.ad + '</h2><p class="m-bilgi">' + (k.aciklama || "") + '</p>' + (k.kural ? '<div class="m-eko">' + k.kural + '</div>' : '');
    var alt = '<div class="m-btnlar">';
    if (dustu && (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") && k.sahip == null) {
      if (o.para >= k.fiyat) alt += '<button class="akbtn btn-ana" id="m-al">🏰 Fethet (' + fmt(k.fiyat) + ')</button>';
      if (!o.bot) alt += '<button class="akbtn" id="m-bilgi">📚 Bilgiyle Fethet (-%25)</button><button class="akbtn btn-pasif" id="m-vazgec">Vazgeç</button>';
    } else alt += '<button class="akbtn btn-ana" id="m-kapat">Kapat</button>';
    alt += '</div>'; modalAc(html + alt);
    var b;
    if ((b = $("#m-al"))) b.onclick = function () { satinAl(pos, 1); };
    if ((b = $("#m-bilgi"))) b.onclick = function () { soruModal("fetih"); };
    if ((b = $("#m-vazgec"))) b.onclick = function () { modalKapat(); render(); };
    if ((b = $("#m-kapat"))) b.onclick = function () { modalKapat(); render(); };
  }

  function soruModal(amac) {
    var s = V.sorular[Math.floor(Math.random() * V.sorular.length)];
    var siklar = s.secenekler.map(function (sk, i) { return '<button class="sik" data-i="' + i + '">' + String.fromCharCode(65 + i) + ') ' + sk + '</button>'; }).join("");
    modalAc('<div class="kart-ust" style="background:#5b3a8a">📚 BİLGİ SORUSU <span class="sev sev-' + s.seviye + '">' + s.seviye + '</span></div><p class="soru-metin">' + s.soru + '</p><div class="siklar">' + siklar + '</div><div id="soru-sonuc"></div>');
    document.querySelectorAll(".sik").forEach(function (b) {
      b.onclick = function () {
        var i = parseInt(b.dataset.i, 10), dogru = (i === s.dogru);
        document.querySelectorAll(".sik").forEach(function (x) { x.disabled = true; });
        document.querySelectorAll(".sik")[s.dogru].classList.add("dogru");
        if (!dogru) b.classList.add("yanlis");
        $("#soru-sonuc").innerHTML = '<div class="soru-acik ' + (dogru ? "iyi" : "kotu") + '">' + (dogru ? "✓ Doğru! " : "✗ Yanlış. ") + s.aciklama + '</div><div class="m-btnlar"><button class="akbtn btn-ana" id="m-devam">Devam</button></div>';
        $("#m-devam").onclick = function () { soruSonuc(amac, dogru); };
      };
    });
  }
  function soruSonuc(amac, dogru) {
    var o = aktif();
    if (amac === "fetih") { var k = K[o.pos]; if (dogru) { logla("📚✓ " + o.ad + " doğru cevapladı, " + k.ad + " %25 indirimli!", "iyi"); satinAl(o.pos, 0.75); } else { logla("📚✗ Yanlış. " + k.ad + " tam fiyattan alınabilir.", "kotu"); modalKapat(); render(); } }
    else if (amac === "esaret") { if (dogru) { o.esaret = false; logla("📚✓ " + o.ad + " bilgiyle esaretten çıktı!", "iyi"); } else { o.esaretTur++; logla("📚✗ Yanlış, esaret sürüyor.", "kotu"); } modalKapat(); render(); }
  }

  function imarModal() {
    var o = aktif();
    var sh = K.filter(function (k) { return k.tip === "sehir" && k.sahip === o.id && grupTamMi(k.grupKey, o.id); });
    var liste = sh.map(function (k) {
      var ust = k.imar >= 5, sonraki = ust ? "—" : (BINA_IKON[k.imar] + " " + V.imarKademeleri[k.imar].ad), ok = !ust && imarDengeli(k, 1) && o.para >= k.imarBedeli;
      var simdi = k.imar > 0 ? BINA_IKON[k.imar - 1] + " " + V.imarKademeleri[k.imar - 1].ad : "boş arsa";
      return '<div class="imar-row"><span><b>' + k.ad + '</b> · ' + simdi + '</span>' + (ust ? '<span class="bitti-rozet">Külliye ★</span>' : '<button class="akbtn imbtn" data-pos="' + k.pos + '"' + (ok ? "" : " disabled") + '>+ ' + sonraki + ' (' + fmt(k.imarBedeli) + ')</button>') + '</div>';
    }).join("") || "<p>İmar için bir bölgenin tamamına sahip olmalısın.</p>";
    modalAc('<div class="kart-ust" style="background:#6b4d1f">🏗️ İMAR</div><p class="m-bilgi">Bölgenin tüm şehirleri sendeyse: Han🏨→Hamam♨️→Medrese🏫→Cami🕌→Külliye🏛️.</p><div class="imar-liste">' + liste + '</div><div class="m-btnlar"><button class="akbtn btn-ana" id="m-kapat">Kapat</button></div>');
    document.querySelectorAll(".imbtn").forEach(function (b) { b.onclick = function () { imarYap(parseInt(b.dataset.pos, 10)); }; });
    $("#m-kapat").onclick = function () { modalKapat(); render(); };
  }
  function mulklerModal() {
    var o = aktif();
    var liste = o.mulkler.map(function (pos) {
      var k = K[pos], durum = k.ipotekli ? '<span class="ipt">ipotekli</span>' : "", bt = k.ipotekli ? "İpoteği Kaldır (" + fmt(Math.round(k.ipotek * 1.1)) + ")" : "İpotek Et (+" + fmt(k.ipotek) + ")";
      var serit = '<span class="msw" style="background:' + (k.tip === "sehir" ? k.grup.renk : "#888") + '"></span>';
      return '<div class="imar-row">' + serit + '<span><b>' + k.ad + '</b> ' + durum + (k.tip === "sehir" && k.imar ? " · " + BINA_IKON[k.imar - 1] : "") + '</span><button class="akbtn imbtn" data-pos="' + pos + '"' + (k.tip === "sehir" && k.imar > 0 ? " disabled" : "") + '>' + bt + '</button></div>';
    }).join("") || "<p>Henüz mülkün yok.</p>";
    modalAc('<div class="kart-ust" style="background:#34495e">🏛️ MÜLKLERİM</div><div class="imar-liste">' + liste + '</div><div class="m-btnlar"><button class="akbtn btn-ana" id="m-kapat">Kapat</button></div>');
    document.querySelectorAll(".imbtn").forEach(function (b) { b.onclick = function () { ipotekDegistir(parseInt(b.dataset.pos, 10)); }; });
    $("#m-kapat").onclick = function () { modalKapat(); render(); };
  }
  function ipotekDegistir(pos) {
    var o = aktif(), k = K[pos];
    if (!k.ipotekli) { k.ipotekli = true; o.para += k.ipotek; logla("🏦 " + k.ad + " ipotek edildi: +" + fmt(k.ipotek), ""); }
    else { var bedel = Math.round(k.ipotek * 1.1); if (o.para < bedel) { logla("İpoteği kaldıracak akçe yok.", "kotu"); return; } o.para -= bedel; k.ipotekli = false; logla("🏦 " + k.ad + " ipoteği kaldırıldı: -" + fmt(bedel), ""); }
    render(); mulklerModal();
  }
  function sonucModal(g) {
    var s = oyun.oyuncular.slice().sort(function (a, b) { return servet(b) - servet(a); });
    var liste = s.map(function (o, i) { return '<div class="imar-row"><span>' + (i + 1) + '. <b style="color:' + o.renk + '">' + o.ad + '</b>' + (o.bot ? " 🤖" : "") + (o.iflas ? " (iflas)" : "") + '</span><span>' + fmt(servet(o)) + '</span></div>'; }).join("");
    modalAc('<div class="kart-ust" style="background:#b7950b">🏆 CİHANA ULAŞAN</div><h2 style="text-align:center">' + (g ? g.ad : "—") + '</h2><p class="m-bilgi" style="text-align:center">Beylikten cihana giden yolda zafer senin! Servet sıralaması:</p><div class="imar-liste">' + liste + '</div><div class="m-btnlar"><button class="akbtn btn-ana" onclick="location.reload()">🔄 Yeni Oyun</button></div>', true);
  }
  function skorGoster() {
    var s = oyun.oyuncular.slice().sort(function (a, b) { return servet(b) - servet(a); });
    var liste = s.map(function (o, i) { return '<div class="imar-row"><span>' + (i + 1) + '. <b style="color:' + o.renk + '">' + o.ad + '</b>' + (o.bot ? " 🤖" : "") + '</span><span>' + fmt(servet(o)) + '</span></div>'; }).join("");
    modalAc('<div class="kart-ust" style="background:#34495e">📊 SERVET DURUMU</div><div class="imar-liste">' + liste + '</div><div class="m-btnlar"><button class="akbtn btn-ana" id="m-kapat">Kapat</button></div>');
    $("#m-kapat").onclick = modalKapat;
  }

  window.addEventListener("DOMContentLoaded", function () {
    $("#oyuncu-sayisi").addEventListener("change", kurulumEkrani);
    $("#basla").addEventListener("click", oyunBaslat);
    $("#skor-btn").addEventListener("click", skorGoster);
    $("#kurallar-btn").addEventListener("click", function () { $("#kurallar-modal").style.display = "flex"; });
    $("#kurallar-kapat").addEventListener("click", function () { $("#kurallar-modal").style.display = "none"; });
    kurulumEkrani();
  });
  window.BC = { get oyun() { return oyun; }, botTuru: function () { botTuru(); } };
})();
