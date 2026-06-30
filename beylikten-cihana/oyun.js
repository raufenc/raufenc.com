/* BEYLİKTEN CİHANA — oyun motoru (zarsız Sefer Kartı, botlar, animasyonlar) */
(function () {
  "use strict";

  var V = window.OYUN_VERISI;
  var K = V.kareler;

  var RENKLER = [
    { ad: "Yeşil Sancak", renk: "#1e8449", amblem: "🐎" },
    { ad: "Al Bayrak", renk: "#b8332b", amblem: "🦅" },
    { ad: "Mavi Tuğra", renk: "#2471a3", amblem: "🌙" },
    { ad: "Altın Hilal", renk: "#b7950b", amblem: "⚔️" },
  ];
  var BINA_IKON = ["🏨", "♨️", "🏫", "🕌", "🏛️"]; // Han, Hamam, Medrese, Cami, Külliye

  var SEFER = (V.ilerlemeKartlari && V.ilerlemeKartlari.length) ? V.ilerlemeKartlari : yedekSefer();
  function yedekSefer() { var a = [], i; for (i = 1; i <= 12; i++) { a.push({ sayi: i, baslik: "Sefer (" + i + ")", bilgi: i + " kare ilerle." }); a.push({ sayi: i, baslik: "Sefer (" + i + ")", bilgi: i + " kare ilerle." }); } return a; }

  var oyun = null;
  var BOT_HIZ = 1; // gecikme çarpanı

  // ---------- ses (WebAudio, dosyasız) ----------
  var Ses = (function () {
    var ctx = null, kapali = false;
    function ac() { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } } if (ctx && ctx.state === "suspended") ctx.resume(); return ctx; }
    function ton(f, dur, tip, vol, kayma) {
      if (kapali) return; var c = ac(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
      o.type = tip || "sine"; o.frequency.setValueAtTime(f, t);
      if (kayma) o.frequency.exponentialRampToValueAtTime(kayma, t + dur);
      g.gain.setValueAtTime(vol || 0.1, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur);
    }
    function dizi(ns) { ns.forEach(function (n, i) { setTimeout(function () { ton(n.f, n.d || 0.14, n.t || "triangle", n.v || 0.1, n.k); }, i * (n.gap || 110)); }); }
    return {
      init: function () { ac(); }, sustur: function (v) { kapali = v; }, kapaliMi: function () { return kapali; },
      cek: function () { ton(300, 0.2, "triangle", 0.09, 720); },
      adim: function () { ton(200, 0.045, "square", 0.03); },
      kart: function () { ton(520, 0.07, "sine", 0.06, 320); },
      al: function () { dizi([{ f: 523 }, { f: 784, d: 0.18, gap: 95 }]); },
      ode: function () { ton(200, 0.24, "sawtooth", 0.08, 110); },
      imar: function () { dizi([{ f: 440, t: "square", v: 0.07 }, { f: 660, d: 0.13, gap: 75 }]); },
      esaret: function () { ton(150, 0.32, "sawtooth", 0.1, 80); },
      kazan: function () { dizi([{ f: 523, gap: 150 }, { f: 659, gap: 150 }, { f: 784, gap: 150 }, { f: 1046, d: 0.34, v: 0.13, gap: 150 }]); },
    };
  })();

  // ---------- Osmanlı geometrik deseni (SVG) ----------
  function desen(bg, stroke, op) {
    stroke = stroke || "#dcbb63"; op = op || "0.5";
    var m = "<rect x='12' y='12' width='40' height='40'/><path d='M32 12 L52 32 L32 52 L12 32 Z'/><circle cx='32' cy='32' r='6'/><rect x='-20' y='-20' width='40' height='40'/><path d='M0 -20 L20 0 L0 20 L-20 0 Z'/><rect x='44' y='-20' width='40' height='40'/><path d='M64 -20 L84 0 L64 20 L44 0 Z'/><rect x='-20' y='44' width='40' height='40'/><path d='M0 44 L20 64 L0 84 L-20 64 Z'/><rect x='44' y='44' width='40' height='40'/><path d='M64 44 L84 64 L64 84 L44 64 Z'/>";
    var id = "om" + bg.replace("#", "");
    return "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' viewBox='0 0 256 270'><defs><pattern id='" + id + "' width='64' height='64' patternUnits='userSpaceOnUse'><g fill='none' stroke='" + stroke + "' stroke-width='1.5' opacity='" + op + "'>" + m + "</g></pattern></defs><rect width='256' height='270' fill='" + bg + "'/><rect width='256' height='270' fill='url(#" + id + ")'/></svg>";
  }

  function desenKaro(stroke, op) {
    var m = "<rect x='12' y='12' width='40' height='40'/><path d='M32 12 L52 32 L32 52 L12 32 Z'/><circle cx='32' cy='32' r='6'/><rect x='-20' y='-20' width='40' height='40'/><path d='M0 -20 L20 0 L0 20 L-20 0 Z'/><rect x='44' y='-20' width='40' height='40'/><path d='M64 -20 L84 0 L64 20 L44 0 Z'/><rect x='-20' y='44' width='40' height='40'/><path d='M0 44 L20 64 L0 84 L-20 64 Z'/><rect x='44' y='44' width='40' height='40'/><path d='M64 44 L84 64 L64 84 L44 64 Z'/>";
    return "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><g fill='none' stroke='" + stroke + "' stroke-width='1.6' opacity='" + op + "'>" + m + "</g></svg>";
  }
  function desenUygula() {
    function setBg(sel, grad, stroke, op) {
      var e = document.querySelector(sel); if (!e) return;
      var uri = "data:image/svg+xml;utf8," + encodeURIComponent(desenKaro(stroke, op || "0.5"));
      e.style.backgroundImage = "url(\"" + uri + "\"), " + grad;
      e.style.backgroundSize = "30px 30px, cover"; e.style.backgroundRepeat = "repeat, no-repeat";
    }
    setBg(".deste-ferman", "linear-gradient(180deg,#a64141,#732424)", "#e7c98a");
    setBg(".deste-vakca", "linear-gradient(180deg,#2f8870,#175040)", "#bfe0d2");
    setBg("#sefer-mini", "linear-gradient(180deg,#f8ecc8,#e6cf94)", "#b7950b", "0.42");
  }

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
  function slug(s) { var t = { "İ": "i", "I": "i", "ı": "i", "Ş": "s", "ş": "s", "Ç": "c", "ç": "c", "Ğ": "g", "ğ": "g", "Ö": "o", "ö": "o", "Ü": "u", "ü": "u" }; return s.split("").map(function (c) { return t[c] || c; }).join("").toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function gorselImg(ad, cls) { return '<img class="' + (cls || "m-gorsel") + '" src="img/' + slug(ad) + '.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'">'; }
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
        renk: RENKLER[i].renk, sancak: RENKLER[i].ad, amblem: RENKLER[i].amblem, bot: bot,
        para: V.ayarlar.baslangicPara, pos: 0, esaret: false, esaretTur: 0, esaretKarti: 0, iflas: false, mulkler: [],
      });
    }
    K.forEach(function (k) { if (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") { k.sahip = null; k.imar = 0; k.ipotekli = false; } });
    oyun = {
      oyuncular: oyuncular, sira: 0, hareketYapildi: false, sonHareket: 0, hareketEden: null, _para: {}, _yeniImar: -1,
      seferDeste: karistir(SEFER.length), si: 0, fermanDeste: karistir(V.ferman.length), fi: 0,
      vakcaDeste: karistir(V.vakca.length), vi: 0, bitti: false,
      botZorluk: ($("#bot-zorluk") ? $("#bot-zorluk").value : "orta"),
      hazine: 0, tekrarHak: false, tekrarSayac: 0, elGecti: 0,
      turLimiti: ($("#tur-limiti") ? parseInt($("#tur-limiti").value, 10) : 0),
    };
    Ses.init();
    $("#kurulum").classList.add("gizli"); $("#oyun").classList.remove("gizli");
    tahtaKur(); desenUygula(); render();
    logla("<b>Oyun başladı!</b> " + oyuncular.map(function (o) { return o.ad + (o.bot ? " 🤖" : ""); }).join(", ") + ". Hayırlı seferler!", "vurgu");
    if (aktif().bot) bekle(botTuru, 900);
  }

  // ---------- kaydet / devam ----------
  function kaydet() {
    try {
      if (!oyun || oyun.bitti) return;
      var kareDurum = K.map(function (k) { return (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") ? { s: k.sahip, i: k.imar || 0, p: !!k.ipotekli } : null; });
      localStorage.setItem("bc_kayit", JSON.stringify({ oyun: oyun, kd: kareDurum, t: 1 }));
    } catch (e) {}
  }
  function kayitVarMi() { try { return !!localStorage.getItem("bc_kayit"); } catch (e) { return false; } }
  function temizleKayit() { try { localStorage.removeItem("bc_kayit"); } catch (e) {} }
  function yukle() {
    try {
      var snap = JSON.parse(localStorage.getItem("bc_kayit"));
      if (!snap || !snap.oyun) return false;
      oyun = snap.oyun;
      snap.kd.forEach(function (d, i) { if (d) { K[i].sahip = d.s; K[i].imar = d.i; K[i].ipotekli = d.p; } });
      oyun.hareketEden = null; oyun._para = {}; oyun._yeniImar = -1;
      Ses.init();
      $("#kurulum").classList.add("gizli"); $("#oyun").classList.remove("gizli");
      tahtaKur(); desenUygula(); render();
      logla("▶️ Kayıtlı oyuna devam ediliyor.", "vurgu");
      if (!oyun.bitti && aktif().bot) bekle(botTuru, 800);
      return true;
    } catch (e) { return false; }
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
    else if (k.tip === "utility") ic.innerHTML = '<div class="kare-ikon">' + (k.ad === "Darphane" ? "🪙" : "💠") + '</div><div class="kare-ad">' + k.ad + '</div><div class="kare-fiyat" data-fiyat="' + k.pos + '">' + k.fiyat + '</div>';
    else if (k.tip === "vergi") ic.innerHTML = '<div class="kare-ikon">💰</div><div class="kare-ad">' + k.ad + '</div><div class="kare-fiyat">' + k.tutar + '</div>';
    else if (k.tip === "ferman") ic.innerHTML = '<div class="kare-ikon">📜</div><div class="kare-ad">Ferman</div>';
    else if (k.tip === "vakca") ic.innerHTML = '<div class="kare-ikon">✴️</div><div class="kare-ad">Vak\'a</div>';
    else if (k.tip === "baslangic") ic.innerHTML = '<div class="kare-ikon">🏇</div><div class="kare-ad">Sefer<br>Meydanı</div>';
    else if (k.tip === "esaret") ic.innerHTML = '<div class="kare-ikon">⛓️</div><div class="kare-ad">Esaret<br>Yedikule</div>';
    else if (k.tip === "kervansaray") ic.innerHTML = '<div class="kare-ikon">🏕️</div><div class="kare-ad">Kervansaray</div><div class="kare-fiyat" data-hazine style="color:#1e8449;font-weight:800"></div>';
    else if (k.tip === "surgun") ic.innerHTML = '<div class="kare-ikon">🚷</div><div class="kare-ad">Sürgün</div>';
    else if (k.tip === "seref") ic.innerHTML = '<div class="kare-ikon" style="color:#b7950b">❖</div><div class="kare-ad">' + k.ad + '</div><div class="kare-fiyat" style="color:#b7950b;font-weight:700">Şeref</div>';
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
        '<div class="ok-bas"><span class="ok-sw" style="background:' + o.renk + '">' + (o.amblem || "") + '</span><span class="ok-ad">' + o.ad + (o.bot ? " 🤖" : "") + (o.id === hunkarId() ? " 👑" : "") + (o.iflas ? " (iflas)" : "") + '</span></div>' +
        '<div class="ok-para' + yon + '">' + fmt(o.para) + '</div>' +
        '<div class="ok-alt">' + o.mulkler.length + ' mülk' + (o.seref ? ' · ❖' + o.seref : '') + (o.esaret ? ' · ⛓️ esaret' : '') + (o.esaretKarti ? ' · 📜×' + o.esaretKarti : '') + '</div>';
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
      if (layer) { var pw = el("span", "pawn" + (o.id === oyun.hareketEden ? " pawn-hareket" : ""), o.amblem || ""); pw.style.background = o.renk; pw.title = o.ad; layer.appendChild(pw); }
    });
    var sn = $("#sefer-no"); if (sn) sn.textContent = oyun.sonHareket || "?";
    var hz = document.querySelector("[data-hazine]"); if (hz) hz.textContent = oyun.hazine > 0 ? "💰" + oyun.hazine : "";
    butonlariGuncelle();
  }
  function vurgulaKare(pos) {
    var c = document.querySelector('.kare[data-pos="' + pos + '"]');
    if (c) { c.classList.remove("vurgu"); void c.offsetWidth; c.classList.add("vurgu"); setTimeout(function () { c.classList.remove("vurgu"); }, 1200); }
  }

  function butonlariGuncelle() {
    var o = aktif(), k = K[o.pos], bar = $("#aksiyon-bar"); bar.innerHTML = "";
    $("#sira-bilgi").innerHTML = '<span class="sw" style="background:' + o.renk + '"></span> Sıra: <b>' + o.ad + '</b>' + (o.bot ? '<span class="bot-rozet">BOT</span>' : '') + (o.id === hunkarId() ? ' 👑' : '') + ' · ' + fmt(o.para) +
      (oyun.turLimiti ? ' · ⏳ Tur ' + (Math.floor(oyun.elGecti / oyun.oyuncular.length) + 1) + '/' + oyun.turLimiti : '') +
      (oyun.hazine > 0 ? ' · 🏕️ ' + fmt(oyun.hazine) : '');
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
      if (rakipVar(o)) bar.appendChild(btn("🤝 Takas", "", takasModal));
      bar.appendChild(btn("🏛️ Mülklerim", "", mulklerModal));
      return;
    }
    var alinabilir = (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") && k.sahip == null && !k.ipotekli;
    if (alinabilir && o.para >= k.fiyat) {
      bar.appendChild(btn("🏰 Fethet (" + fmt(k.fiyat) + ")", "btn-ana", function () { satinAl(k.pos, 1); }));
      bar.appendChild(btn("📚 Bilgiyle Fethet (-%25)", "", function () { soruModal("fetih"); }));
    } else if (alinabilir) bar.appendChild(btn("🏰 Param yetmiyor", "btn-pasif", null, true));
    if (imarYapilabilirVarMi(o)) bar.appendChild(btn("🏗️ İmar Yap", "", imarModal));
    if (rakipVar(o)) bar.appendChild(btn("🤝 Takas", "", takasModal));
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
    var oz = kart.ozel, bigNo = kart.sayi, altYazi = "kare ilerle", btnLbl = "➡️ " + kart.sayi + " kare ilerle", renk = "#5e4216";
    if (oz) {
      if (oz.tur === "tekrar") { altYazi = "ilerle + 🔁 TEKRAR"; btnLbl = "🔁 " + kart.sayi + " ilerle ve tekrar çek"; renk = "#1f6b4f"; }
      else if (oz.tur === "geri") { bigNo = "−" + kart.sayi; altYazi = "kare GERİ"; btnLbl = "↩️ " + kart.sayi + " kare geri git"; renk = "#7d2b2b"; }
      else if (oz.tur === "isinla") { bigNo = "➜"; altYazi = "ışınlan"; btnLbl = "✨ Işınlan"; renk = "#5b3a8a"; }
      else if (oz.tur === "sakaci") { bigNo = "✦"; altYazi = "özel olay"; btnLbl = "✦ Uygula"; renk = "#8a5a13"; }
    }
    modalAc('<div class="kart-ust" style="background:' + (oz ? renk : "#7a5b1a") + '">🏇 SEFER KARTI</div>' +
      '<div class="sefer-buyuk"><div class="sb-no">' + bigNo + '</div><div class="sb-alt">' + altYazi + '</div></div>' +
      '<h2 style="text-align:center;margin:.3em 0">' + kart.baslik + '</h2>' +
      '<div class="kart-ogren">💡 ' + kart.bilgi + '</div>' +
      '<div class="m-btnlar"><button class="akbtn btn-ana" id="m-ilerle">' + btnLbl + '</button></div>');
    Ses.cek();
    $("#m-ilerle").onclick = function () {
      modalKapat(); oyun.hareketYapildi = true;
      logla("🏇 " + o.ad + " — " + kart.baslik, "");
      if (oz) seferOzel(kart, o, bitince);
      else { oyun.sonHareket = kart.sayi; ilerle(o, kart.sayi, true, bitince); }
    };
    if (o.bot) bekle(function () { var b = $("#m-ilerle"); if (b) b.click(); }, 1800);
  }
  function enYakinLiman(pos) { var L = [5, 15, 25, 35], i; for (i = 0; i < L.length; i++) if (L[i] > pos) return L[i]; return L[0]; }
  function seferOzel(kart, o, bitince) {
    var e = kart.ozel;
    if (e.tur === "tekrar") { oyun.tekrarHak = true; oyun.sonHareket = kart.sayi; ilerle(o, kart.sayi, true, bitince); return; }
    if (e.tur === "geri") { oyun.sonHareket = kart.sayi; ilerle(o, -kart.sayi, false, bitince); return; }
    if (e.tur === "isinla") {
      var hedef = (e.hedef === "liman") ? enYakinLiman(o.pos) : e.hedef;
      var adim = (((hedef - o.pos) % 40) + 40) % 40;
      if (adim === 0) { render(); kareyeDus(o, bitince); } else { oyun.sonHareket = adim; ilerle(o, adim, true, bitince); }
      return;
    }
    if (e.tur === "sakaci") {
      if (e.alt === "yer_degis") {
        var en = null, az = 99;
        oyun.oyuncular.forEach(function (p) { if (p.id !== o.id && !p.iflas) { var d = (((p.pos - o.pos) % 40) + 40) % 40; if (d > 0 && d < az) { az = d; en = p; } } });
        if (en) { var t = o.pos; o.pos = en.pos; en.pos = t; logla("🕵️ " + o.ad + " ile " + en.ad + " yer değiştirdi!", "vurgu"); render(); kareyeDus(o, bitince); return; }
        logla("🕵️ Yer değişecek rakip yok.", "");
      } else if (e.alt === "yakindan_al") {
        var en2 = null, az2 = 99;
        oyun.oyuncular.forEach(function (p) { if (p.id !== o.id && !p.iflas) { var d = Math.min((((p.pos - o.pos) % 40) + 40) % 40, (((o.pos - p.pos) % 40) + 40) % 40); if (d < az2) { az2 = d; en2 = p; } } });
        if (en2) { var m = Math.min(en2.para, e.deger); en2.para -= m; o.para += m; logla("⚔️ " + o.ad + ", " + en2.ad + "'den " + fmt(m) + " ganimet aldı.", "iyi"); }
      } else if (e.alt === "herkesten") {
        oyun.oyuncular.forEach(function (p) { if (p.id !== o.id && !p.iflas) { var m = Math.min(p.para, e.deger); p.para -= m; o.para += m; } });
        logla("🎉 " + o.ad + " herkesten " + e.deger + " akçe ihsan topladı.", "iyi");
      }
      render(); if (bitince) bekle(bitince, 700);
      return;
    }
  }

  function ilerle(o, adim, maasVar, bitince) {
    oyun.hareketEden = o.id;
    var yon = adim >= 0 ? 1 : -1, kalan = Math.abs(adim);
    if (kalan === 0) { oyun.hareketEden = null; setTimeout(function () { kareyeDus(o, bitince); }, 120); return; }
    (function adimAt() {
      o.pos = (((o.pos + yon) % 40) + 40) % 40; Ses.adim();
      if (yon > 0 && o.pos === 0 && maasVar) { var ul = V.ayarlar.maas + (isHunkar(o) ? 500 : 0); o.para += ul; logla("💰 " + o.ad + " Sefer Meydanı'ndan geçti: +" + fmt(ul) + " ulûfe" + (isHunkar(o) ? " (👑 Hünkâr +500)" : "") + ".", "iyi"); }
      render();
      if (--kalan > 0) setTimeout(adimAt, 135);
      else { oyun.hareketEden = null; render(); setTimeout(function () { kareyeDus(o, bitince); }, 220); }
    })();
  }
  function hunkarId() {
    var ayakta = oyun.oyuncular.filter(function (p) { return !p.iflas; });
    if (ayakta.length < 2) return null;
    var en = ayakta[0]; ayakta.forEach(function (p) { if (servet(p) > servet(en)) en = p; });
    return en.id;
  }
  function isHunkar(o) { return o.id === hunkarId(); }

  function kareyeDus(o, bitince) {
    var k = K[o.pos]; vurgulaKare(o.pos);
    setTimeout(function () {
      var bot = !!bitince;
      if (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") {
        if (k.sahip == null) {
          kareBilgiModal(o.pos, true);
          if (bot) bekle(function () { botAlKarar(o, k, bitince); }, 1300);
        } else if (k.sahip !== o.id && !k.ipotekli) { kiraOde(o, k); render(); if (bot) bekle(bitince, 600); }
        else { render(); if (bot) bekle(bitince, 300); }
      } else if (k.tip === "vergi") {
        odeVeyaIflas(o, k.tutar, null, "💸 " + o.ad + " " + k.ad + " ödedi: -" + fmt(k.tutar)); oyun.hazine += k.tutar; render(); if (bot) bekle(bitince, 600);
      } else if (k.tip === "kervansaray") {
        if (oyun.hazine > 0) { var h = oyun.hazine; o.para += h; oyun.hazine = 0; logla("🏕️ " + o.ad + " Kervansaray Hazinesini topladı: +" + fmt(h) + "!", "iyi"); Ses.al(); }
        else logla("🏕️ " + o.ad + " kervansarayda dinlendi.", "");
        render(); if (bot) bekle(bitince, 500);
      } else if (k.tip === "ferman") { kartCek("ferman", o, bitince); }
      else if (k.tip === "vakca") { kartCek("vakca", o, bitince); }
      else if (k.tip === "surgun") { logla("🚷 " + o.ad + " sürgün edildi!", "kotu"); esareteGonder(o); render(); if (bot) bekle(bitince, 600); }
      else if (k.tip === "seref") { serefKare(o); if (bot) bekle(function () { modalKapat(); bitince(); }, 1200); }
      else { render(); if (bot) bekle(bitince, 300); }
    }, 280);
  }

  function serefKare(o) {
    var k = K[o.pos];
    var bereket = (k.ad === "Haremeyn") ? 500 : 200;
    o.para += bereket; o.seref = (o.seref || 0) + 1;
    logla("❖ " + o.ad + ", " + k.ad + "'e saygıyla uğradı — bankadan <b>+" + fmt(bereket) + "</b> hizmet bereketi.", "iyi");
    Ses.al(); render();
    modalAc(gorselImg(k.ad) + '<div class="m-bolge" style="color:#b7950b">❖ ŞEREF · KUTSAL BELDE</div><h2>' + k.ad + '</h2>' +
      '<div class="seref-bereket">🏦 Bankadan <b>+' + fmt(bereket) + '</b> hizmet bereketi aldın</div>' +
      '<p class="m-bilgi">' + (k.bilgi || "") + '</p>' +
      '<div class="m-btnlar"><button class="akbtn btn-ana" id="m-kapat">Âmin 🤲</button></div>');
    $("#m-kapat").onclick = function () { modalKapat(); render(); };
  }
  function esareteGonder(o) { o.pos = 10; o.esaret = true; o.esaretTur = 0; Ses.esaret(); render(); }

  // ---------- kira & para ----------
  function kiraOde(o, k) { var sahip = sahipOyuncu(k.sahip), m = kiraHesap(k, sahip); odeVeyaIflas(o, m, sahip, "🏰 " + o.ad + ", " + sahip.ad + "'in " + k.ad + " şehrine düştü: -" + fmt(m)); render(); }
  function kiraHesap(k, sahip) {
    if (k.tip === "sehir") { if (k.imar > 0) return k.kira[k.imar]; return grupTamMi(k.grupKey, sahip.id) ? k.kira[0] * 2 : k.kira[0]; }
    if (k.tip === "liman") return k.kira[Math.max(0, sahipLimanSayisi(sahip.id) - 1)];
    if (k.tip === "utility") return (oyun.sonHareket || 6) * k.carpan[Math.min(1, sahipUtilSayisi(sahip.id) - 1)];
    return 0;
  }
  function odeVeyaIflas(o, miktar, alacakli, mesaj) {
    if (o.para >= miktar) { o.para -= miktar; if (alacakli) alacakli.para += miktar; logla(mesaj, alacakli ? "" : "kotu"); if (miktar > 0) Ses.ode(); return; }
    if (o.bot) {
      botLikidite(o, miktar);
      if (o.para >= miktar) { o.para -= miktar; if (alacakli) alacakli.para += miktar; logla(mesaj + " (mülk satarak ödedi)", ""); Ses.ode(); }
      else { logla(mesaj + " — ödeyemedi, iflas!", "kotu"); iflasEt(o, alacakli); }
      return;
    }
    logla(mesaj + " — nakit yetersiz, mülk satıp ödeyebilirsin.", "kotu");
    borcModal(o, miktar, alacakli);
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
    Ses.al(); modalKapat(); render();
  }

  // ---------- açık artırma (mezat) ----------
  function grupTamamlarMi(k, p) {
    if (k.tip === "sehir") return grupKareler(k.grupKey).every(function (g) { return g.pos === k.pos || g.sahip === p.id; });
    if (k.tip === "liman") return sahipLimanSayisi(p.id) >= 1;
    return false;
  }
  function mezat(pos, bitince) {
    var k = K[pos];
    var ayakta = oyun.oyuncular.filter(function (p) { return !p.iflas; });
    if (!ayakta.length) { if (bitince) bekle(bitince, 300); return; }
    var d = { pos: pos, yuksek: 0, yuksekId: null, aktif: ayakta.map(function (p) { return p.id; }), step: Math.max(50, Math.round(k.fiyat * 0.1)), sira: 0, bitince: bitince };
    logla("🔨 <b>" + k.ad + "</b> açık artırmaya çıktı!", "vurgu");
    mezatTur(d);
  }
  function mezatTur(d) {
    if (d.aktif.length <= 1) { mezatBitir(d); return; }
    if (d.sira >= d.aktif.length) d.sira = 0;
    var id = d.aktif[d.sira];
    if (id === d.yuksekId) { d.sira++; mezatTur(d); return; }
    var p = sahipOyuncu(id), k = K[d.pos], yeni = d.yuksek + d.step;
    if (p.bot) {
      var maks = Math.round(k.fiyat * (grupTamamlarMi(k, p) ? 1.4 : 0.85));
      if (yeni <= maks && yeni <= p.para) { d.yuksek = yeni; d.yuksekId = id; logla("🔨 " + p.ad + " teklif: " + fmt(yeni)); d.sira++; bekle(function () { mezatTur(d); }, 650); }
      else { d.aktif.splice(d.sira, 1); logla("🔨 " + p.ad + " çekildi.", ""); bekle(function () { mezatTur(d); }, 450); }
    } else mezatModal(d, p, yeni);
  }
  function mezatModal(d, p, yeni) {
    var k = K[d.pos], verebilir = yeni <= p.para;
    modalAc('<div class="kart-ust" style="background:#6b4d1f">🔨 AÇIK ARTIRMA — ' + k.ad + '</div>' +
      (k.tip === "sehir" ? gorselImg(k.ad) : '') +
      '<p class="m-bilgi">Liste fiyatı <b>' + fmt(k.fiyat) + '</b>. En yüksek teklif: <b>' + (d.yuksek ? fmt(d.yuksek) + " (" + sahipOyuncu(d.yuksekId).ad + ")" : "yok") + '</b><br>Sıra sende — nakdin: <b>' + fmt(p.para) + '</b></p>' +
      '<div class="m-btnlar">' +
      (verebilir ? '<button class="akbtn btn-ana" id="mz-teklif">🔨 Teklif Ver (' + fmt(yeni) + ')</button>' : '<button class="akbtn btn-pasif" disabled>Nakit yetmez</button>') +
      '<button class="akbtn" id="mz-cekil">🚪 Çekil</button></div>', true);
    var b;
    if ((b = $("#mz-teklif"))) b.onclick = function () { d.yuksek = yeni; d.yuksekId = p.id; logla("🔨 " + p.ad + " teklif: " + fmt(yeni)); modalKapat(); d.sira++; mezatTur(d); };
    $("#mz-cekil").onclick = function () { var i = d.aktif.indexOf(p.id); if (i >= 0) d.aktif.splice(i, 1); logla("🔨 " + p.ad + " çekildi.", ""); modalKapat(); mezatTur(d); };
  }
  function mezatBitir(d) {
    var k = K[d.pos];
    if (d.yuksekId != null && d.yuksek > 0) {
      var p = sahipOyuncu(d.yuksekId);
      p.para -= d.yuksek; k.sahip = p.id; p.mulkler.push(d.pos); p.mulkler.sort(function (a, b) { return a - b; });
      logla("🔨 <b>" + k.ad + "</b>, " + fmt(d.yuksek) + " ile " + p.ad + "'e satıldı!", "iyi"); Ses.al();
    } else logla("🔨 " + k.ad + " alıcı bulamadı, boş kaldı.", "");
    modalKapat(); render(); if (d.bitince) bekle(d.bitince, 400);
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
    Ses.imar(); render(); imarModal();
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
      case "para_ver": odeVeyaIflas(o, e.deger, null, "📜 " + o.ad + ": -" + fmt(e.deger)); oyun.hazine += e.deger; break;
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
  function botRezerv() { return { kolay: 4500, orta: 2500, zor: 1200 }[oyun.botZorluk] || 2500; }
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
  function botAlKarar(o, k, bitince) {
    var iste = o.para - k.fiyat >= botRezerv();
    if (iste && oyun.botZorluk === "kolay" && Math.random() < 0.3) iste = false;
    if (iste) { satinAl(o.pos, 1); if (bitince) bekle(bitince, 700); }
    else { modalKapat(); render(); logla("🤖 " + o.ad + ", " + k.ad + "'i almadı — açık artırmaya!", ""); mezat(o.pos, bitince); }
  }
  function botCozum() {
    bekle(function () {
      var o = aktif();
      var limit = { kolay: 1, orta: 3, zor: 6 }[oyun.botZorluk] || 3, sayac = 0;
      while (sayac < limit) {
        var aday = null;
        K.forEach(function (k) { if (k.tip === "sehir" && k.sahip === o.id && grupTamMi(k.grupKey, o.id) && k.imar < 5 && imarDengeli(k, 1) && o.para - k.imarBedeli >= botRezerv()) { if (!aday || k.imarBedeli < aday.imarBedeli) aday = k; } });
        if (!aday) break;
        o.para -= aday.imarBedeli; aday.imar++; oyun._yeniImar = aday.pos;
        logla("🏗️ " + o.ad + ", " + aday.ad + "'e " + V.imarKademeleri[aday.imar - 1].ad + " yaptırdı.", "iyi");
        sayac++;
      }
      if (sayac > 0) Ses.imar();
      render();
      var devam = function () { render(); bekle(turuBitir, 650); };
      if (!botTakasDene(o, devam)) devam();
    }, 500);
  }

  // ---------- tur ----------
  function turuBitir() {
    if (oyun.tekrarHak && !aktif().iflas) {
      oyun.tekrarHak = false; oyun.tekrarSayac = (oyun.tekrarSayac || 0) + 1;
      if (oyun.tekrarSayac >= 3) { oyun.tekrarSayac = 0; logla("🔁 " + aktif().ad + " üst üste 3 tekrar — yorgun düşüp esarete uğradı!", "kotu"); esareteGonder(aktif()); }
      else { oyun.hareketYapildi = false; oyun.sonHareket = 0; logla("🔁 " + aktif().ad + " tekrar sefere çıkıyor!", "vurgu"); kaydet(); render(); if (aktif().bot) bekle(botTuru, 650); return; }
    } else oyun.tekrarSayac = 0;
    oyun.elGecti = (oyun.elGecti || 0) + 1;
    if (oyun.turLimiti && Math.floor(oyun.elGecti / oyun.oyuncular.length) >= oyun.turLimiti) {
      oyun.bitti = true; temizleKayit(); logla("⏳ Tur limiti doldu! En zengin medeniyet kazanır.", "vurgu"); sonucModal(null); return;
    }
    var n = oyun.oyuncular.length, sayac = 0;
    do { oyun.sira = (oyun.sira + 1) % n; sayac++; } while (oyun.oyuncular[oyun.sira].iflas && sayac <= n);
    oyun.hareketYapildi = false; oyun.sonHareket = 0; kaydet(); render();
    if (!oyun.bitti && aktif().bot) bekle(botTuru, 650);
  }
  function galibiyetKontrol() {
    var ayakta = oyun.oyuncular.filter(function (o) { return !o.iflas; });
    if (ayakta.length <= 1 && oyun.oyuncular.length > 1) { oyun.bitti = true; temizleKayit(); sonucModal(ayakta[0]); }
  }
  function servet(o) { var s = o.para; o.mulkler.forEach(function (pos) { var k = K[pos]; s += k.ipotekli ? k.ipotek : k.fiyat; if (k.tip === "sehir") s += k.imar * k.imarBedeli; }); return s; }

  // ---------- TAKAS ----------
  function rakipVar(o) { return oyun.oyuncular.some(function (p) { return p.id !== o.id && !p.iflas; }); }
  function arrCikar(a, x) { var i = a.indexOf(x); if (i >= 0) a.splice(i, 1); }
  function takasEdilebilir(k) {
    if (k.sahip == null || k.ipotekli) return false;
    if (k.tip === "sehir") { if (k.imar > 0) return false; return grupKareler(k.grupKey).every(function (g) { return g.imar === 0; }); }
    return k.tip === "liman" || k.tip === "utility";
  }
  function oyuncuMulkleri(id) { return K.filter(function (k) { return (k.tip === "sehir" || k.tip === "liman" || k.tip === "utility") && k.sahip === id && takasEdilebilir(k); }); }
  function takasDeger(poslar) { return poslar.reduce(function (s, pos) { return s + (K[pos].ipotekli ? K[pos].ipotek : K[pos].fiyat); }, 0); }

  function takasModal() {
    var o = aktif();
    var rakipler = oyun.oyuncular.filter(function (p) { return p.id !== o.id && !p.iflas; });
    if (!rakipler.length) return;
    takasCiz(o, rakipler, rakipler[0].id);
  }
  function takasCiz(o, rakipler, hedefId) {
    var T = sahipOyuncu(hedefId);
    function mulkListe(p, taraf) {
      var liste = oyuncuMulkleri(p.id);
      if (!liste.length) return '<div class="takas-bos">(takasa uygun mülk yok)</div>';
      return liste.map(function (k) {
        var renk = k.tip === "sehir" ? k.grup.renk : "#888";
        return '<label class="takas-mulk"><input type="checkbox" data-taraf="' + taraf + '" data-pos="' + k.pos + '"><span class="msw" style="background:' + renk + '"></span>' + k.ad + ' <span class="takas-fy">' + k.fiyat + '</span></label>';
      }).join("");
    }
    var rakipSec = rakipler.length > 1
      ? '<select id="takas-hedef">' + rakipler.map(function (r) { return '<option value="' + r.id + '"' + (r.id === hedefId ? " selected" : "") + '>' + r.ad + (r.bot ? " 🤖" : "") + '</option>'; }).join("") + '</select>'
      : '<b>' + T.ad + (T.bot ? " 🤖" : "") + '</b>';
    var html = '<div class="kart-ust" style="background:#34495e">🤝 TAKAS TEKLİFİ</div>' +
      '<div class="takas-grid">' +
        '<div class="takas-col"><div class="takas-bas" style="color:' + o.renk + '">SEN verirsin</div>' + mulkListe(o, "ver") +
          '<div class="takas-para">💰 <input type="number" id="ver-akce" min="0" max="' + o.para + '" value="0"> akçe</div>' +
          (o.esaretKarti > 0 ? '<div class="takas-para">📜 <input type="number" id="ver-ferman" min="0" max="' + o.esaretKarti + '" value="0"> ferman</div>' : "") +
        '</div>' +
        '<div class="takas-col"><div class="takas-bas">' + rakipSec + ' verir</div>' + mulkListe(T, "al") +
          '<div class="takas-para">💰 <input type="number" id="al-akce" min="0" max="' + T.para + '" value="0"> akçe</div>' +
          (T.esaretKarti > 0 ? '<div class="takas-para">📜 <input type="number" id="al-ferman" min="0" max="' + T.esaretKarti + '" value="0"> ferman</div>' : "") +
        '</div>' +
      '</div>' +
      '<div class="m-btnlar"><button class="akbtn" id="takas-iptal">Vazgeç</button><button class="akbtn btn-ana" id="takas-gonder">Teklifi Gönder</button></div>';
    modalAc(html, true);
    if ($("#takas-hedef")) $("#takas-hedef").onchange = function () { takasCiz(o, rakipler, parseInt(this.value, 10)); };
    $("#takas-iptal").onclick = function () { modalKapat(); render(); };
    $("#takas-gonder").onclick = function () {
      var teklif = takasTopla(o, T);
      if (teklif.ver.mulkler.length + teklif.al.mulkler.length + teklif.ver.akce + teklif.al.akce + teklif.ver.ferman + teklif.al.ferman === 0) { logla("Boş teklif gönderilemez.", "kotu"); return; }
      takasGonder(teklif);
    };
  }
  function takasTopla(o, T) {
    function sel(taraf) { return [].slice.call(document.querySelectorAll('input[data-taraf="' + taraf + '"]:checked')).map(function (c) { return parseInt(c.dataset.pos, 10); }); }
    function num(id) { var e = $("#" + id); return e ? Math.max(0, parseInt(e.value, 10) || 0) : 0; }
    return { verenId: o.id, alanId: T.id,
      ver: { mulkler: sel("ver"), akce: Math.min(num("ver-akce"), o.para), ferman: Math.min(num("ver-ferman"), o.esaretKarti) },
      al: { mulkler: sel("al"), akce: Math.min(num("al-akce"), T.para), ferman: Math.min(num("al-ferman"), T.esaretKarti) } };
  }
  function takasOzet(teklif) {
    var V1 = sahipOyuncu(teklif.verenId), A = sahipOyuncu(teklif.alanId);
    function liste(t) { var p = []; t.mulkler.forEach(function (pos) { p.push(K[pos].ad); }); if (t.akce) p.push(fmt(t.akce)); if (t.ferman) p.push("📜×" + t.ferman); return p.length ? p.join(", ") : "—"; }
    return '<div class="takas-ozet"><b style="color:' + V1.renk + '">' + V1.ad + '</b> verir: ' + liste(teklif.ver) + '<br><b style="color:' + A.renk + '">' + A.ad + '</b> verir: ' + liste(teklif.al) + '</div>';
  }
  function takasGonder(teklif) {
    var A = sahipOyuncu(teklif.alanId);
    if (A.bot) takasSonucModal(teklif, takasDegerlendir(teklif, A));
    else takasOnayModal(teklif, null);
  }
  function takasOnayModal(teklif, devam) {
    var A = sahipOyuncu(teklif.alanId), V1 = sahipOyuncu(teklif.verenId);
    modalAc('<div class="kart-ust" style="background:#34495e">🤝 TAKAS TEKLİFİ</div><p class="m-bilgi"><b>' + V1.ad + '</b> takas teklif ediyor:</p>' + takasOzet(teklif) + '<p class="m-bilgi" style="margin-top:10px"><b style="color:' + A.renk + '">' + A.ad + '</b>, kabul ediyor musun?</p><div class="m-btnlar"><button class="akbtn" id="takas-ret">✗ Ret</button><button class="akbtn btn-ana" id="takas-kabul">✓ Kabul</button></div>', true);
    $("#takas-kabul").onclick = function () { takasUygula(teklif); logla("🤝 " + A.ad + " takası kabul etti.", "iyi"); modalKapat(); if (devam) devam(); else render(); };
    $("#takas-ret").onclick = function () { logla("🤝 " + A.ad + " takası reddetti.", ""); modalKapat(); if (devam) devam(); else render(); };
  }
  function takasSonucModal(teklif, kabul) {
    var A = sahipOyuncu(teklif.alanId);
    if (kabul) takasUygula(teklif);
    modalAc('<div class="kart-ust" style="background:' + (kabul ? "#1f6b4f" : "#7d2b2b") + '">🤝 TAKAS</div>' + takasOzet(teklif) + '<p class="m-bilgi" style="text-align:center;margin-top:12px">' + (kabul ? "✓ <b>" + A.ad + "</b> teklifi kabul etti!" : "✗ <b>" + A.ad + "</b> teklifi reddetti.") + '</p><div class="m-btnlar"><button class="akbtn btn-ana" id="m-kapat">Tamam</button></div>');
    $("#m-kapat").onclick = function () { modalKapat(); render(); };
  }
  function takasUygula(teklif) {
    var V1 = sahipOyuncu(teklif.verenId), A = sahipOyuncu(teklif.alanId);
    teklif.ver.mulkler.forEach(function (pos) { K[pos].sahip = A.id; arrCikar(V1.mulkler, pos); A.mulkler.push(pos); });
    teklif.al.mulkler.forEach(function (pos) { K[pos].sahip = V1.id; arrCikar(A.mulkler, pos); V1.mulkler.push(pos); });
    V1.para += teklif.al.akce - teklif.ver.akce; A.para += teklif.ver.akce - teklif.al.akce;
    V1.esaretKarti += teklif.al.ferman - teklif.ver.ferman; A.esaretKarti += teklif.ver.ferman - teklif.al.ferman;
    V1.mulkler.sort(function (a, b) { return a - b; }); A.mulkler.sort(function (a, b) { return a - b; });
    Ses.al();
  }
  function takasDegerlendir(teklif, bot) {
    if (teklif.al.akce > bot.para - 300) return false;
    var alinan = takasDeger(teklif.ver.mulkler) + teklif.ver.akce + teklif.ver.ferman * 500;
    var verilen = takasDeger(teklif.al.mulkler) + teklif.al.akce + teklif.al.ferman * 500;
    var bonus = 0, ceza = 0;
    teklif.ver.mulkler.forEach(function (pos) {
      var k = K[pos]; if (k.tip !== "sehir") return;
      var grup = grupKareler(k.grupKey);
      if (grup.every(function (g) { return g.pos === pos || g.sahip === bot.id; })) bonus += takasDeger(grup.map(function (g) { return g.pos; })) * 0.8;
    });
    teklif.al.mulkler.forEach(function (pos) {
      var k = K[pos]; if (k.tip === "sehir" && grupTamMi(k.grupKey, bot.id)) ceza += takasDeger(grupKareler(k.grupKey).map(function (g) { return g.pos; })) * 0.8;
    });
    return (alinan + bonus) - (verilen + ceza) >= 0;
  }
  function botTakasDene(o, devam) {
    var hedef = null;
    var anahtarlar = Object.keys(V.gruplar);
    for (var i = 0; i < anahtarlar.length; i++) {
      var grup = grupKareler(anahtarlar[i]); if (!grup.length) continue;
      var benim = grup.filter(function (g) { return g.sahip === o.id; }).length;
      if (benim === grup.length - 1) {
        var eksik = null; grup.forEach(function (g) { if (g.sahip !== o.id) eksik = g; });
        if (eksik && eksik.sahip != null && !eksik.ipotekli && eksik.imar === 0) {
          var fiyat = Math.round(eksik.fiyat * 1.4);
          if (o.para - fiyat >= 1500) { hedef = { X: eksik, T: sahipOyuncu(eksik.sahip), fiyat: fiyat }; break; }
        }
      }
    }
    if (!hedef) return false;
    var teklif = { verenId: o.id, alanId: hedef.T.id, ver: { mulkler: [], akce: hedef.fiyat, ferman: 0 }, al: { mulkler: [hedef.X.pos], akce: 0, ferman: 0 } };
    if (hedef.T.bot) {
      if (takasDegerlendir(teklif, hedef.T)) { takasUygula(teklif); logla("🤝 " + o.ad + ", " + hedef.T.ad + " ile takas yaptı: " + hedef.X.ad + " ↔ " + fmt(hedef.fiyat), "iyi"); }
      else logla("🤝 " + hedef.T.ad + ", " + o.ad + "'in " + hedef.X.ad + " teklifini reddetti.", "");
      return false;
    }
    logla("🤝 " + o.ad + " sana " + hedef.X.ad + " için " + fmt(hedef.fiyat) + " teklif ediyor!", "vurgu");
    takasOnayModal(teklif, devam);
    return true;
  }

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
      html = gorselImg(k.ad) + '<div class="m-serit" style="background:' + k.grup.renk + '"></div><div class="m-bolge">' + k.grup.ad + '</div><h2>' + k.ad + '</h2><div class="m-tarih">🗓️ ' + (k.tarih || "") + '</div><p class="m-bilgi">' + (k.bilgi || "") + '</p>' +
        '<div class="m-eko"><b>Fiyat:</b> ' + fmt(k.fiyat) + ' · İmar/kademe: ' + fmt(k.imarBedeli) + '<br><div style="margin-top:6px"><b>Vergi (kira):</b>' + kiraTablosu(k) + '</div></div>';
    } else if (k.tip === "liman") {
      html = '<div class="m-ikon">⚓</div><h2>' + k.ad + '</h2><p class="m-bilgi">' + k.bilgi + '</p><div class="m-eko"><b>Fiyat:</b> ' + fmt(k.fiyat) + '<br>Kira (liman sayısına göre): ' + k.kira.join(" / ") + '</div>';
    } else if (k.tip === "utility") {
      html = '<div class="m-ikon">' + (k.ad === "Darphane" ? "🪙" : "💠") + '</div><h2>' + k.ad + '</h2><p class="m-bilgi">' + k.bilgi + '</p><div class="m-eko"><b>Fiyat:</b> ' + fmt(k.fiyat) + '<br>Kira = son Sefer sayısı × ' + k.carpan[0] + ' (tek) / ×' + k.carpan[1] + ' (iki tesis)</div>';
    } else if (k.tip === "seref") {
      html = gorselImg(k.ad) + '<div class="m-bolge" style="color:#b7950b">❖ ŞEREF · KUTSAL BELDE</div><h2>' + k.ad + '</h2><div class="m-tarih">🗓️ ' + (k.tarih || "") + '</div><p class="m-bilgi">' + (k.bilgi || "") + '</p><div class="m-eko">' + (k.kural || "") + '</div>';
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
    if ((b = $("#m-vazgec"))) b.onclick = function () { modalKapat(); render(); mezat(pos, null); };
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
  // ---------- varlık yönetimi (yapı sat / ipotek) ----------
  function imarSatBir(pos) {
    var o = aktif(), k = K[pos];
    if (k.tip !== "sehir" || k.imar <= 0) return;
    var maxi = Math.max.apply(null, grupKareler(k.grupKey).map(function (g) { return g.imar; }));
    if (k.imar < maxi) { logla("Önce daha çok imarlı şehirden sat (dengeli).", "kotu"); return; }
    var geri = Math.round(k.imarBedeli / 2); k.imar--; o.para += geri;
    logla("🏚️ " + o.ad + ", " + k.ad + "'deki yapıyı sattı: +" + fmt(geri), ""); render();
  }
  function ipotekEt(pos) {
    var o = aktif(), k = K[pos];
    if (k.ipotekli) return;
    if (k.tip === "sehir" && grupKareler(k.grupKey).some(function (g) { return g.imar > 0; })) { logla("Önce bu bölgedeki yapıları sat.", "kotu"); return; }
    k.ipotekli = true; o.para += k.ipotek; logla("🏦 " + k.ad + " ipotek edildi: +" + fmt(k.ipotek), ""); render();
  }
  function ipotekKaldir(pos) {
    var o = aktif(), k = K[pos], bedel = Math.round(k.ipotek * 1.1);
    if (o.para < bedel) { logla("İpoteği kaldıracak akçe yok.", "kotu"); return; }
    o.para -= bedel; k.ipotekli = false; logla("🏦 " + k.ad + " ipoteği kaldırıldı: -" + fmt(bedel), ""); render();
  }
  function nakdeCevrilebilir(o) {
    var t = 0;
    K.forEach(function (k) {
      if (k.sahip !== o.id) return;
      if (k.tip === "sehir") t += k.imar * Math.round(k.imarBedeli / 2);
      if (!k.ipotekli) t += k.ipotek;
    });
    return t;
  }
  function varlikSatir(o) {
    if (!o.mulkler.length) return "<p>Mülkün yok — satacak bir şeyin yok.</p>";
    return o.mulkler.map(function (pos) {
      var k = K[pos];
      var serit = '<span class="msw" style="background:' + (k.tip === "sehir" ? k.grup.renk : "#888") + '"></span>';
      var btn;
      if (k.tip === "sehir" && k.imar > 0) btn = '<button class="akbtn imbtn" data-act="sat" data-pos="' + pos + '">🏚️ Yapı Sat (+' + fmt(Math.round(k.imarBedeli / 2)) + ')</button>';
      else if (!k.ipotekli) btn = '<button class="akbtn imbtn" data-act="ipotek" data-pos="' + pos + '">🏦 İpotek (+' + fmt(k.ipotek) + ')</button>';
      else btn = '<button class="akbtn imbtn" data-act="kaldir" data-pos="' + pos + '">İpotek Kaldır (' + fmt(Math.round(k.ipotek * 1.1)) + ')</button>';
      var durum = k.ipotekli ? ' <span class="ipt">ipotekli</span>' : (k.tip === "sehir" && k.imar ? ' · ' + BINA_IKON[k.imar - 1] : '');
      return '<div class="imar-row">' + serit + '<span><b>' + k.ad + '</b>' + durum + '</span>' + btn + '</div>';
    }).join("");
  }
  function varlikBind(yenidenCiz) {
    document.querySelectorAll(".imbtn").forEach(function (b) {
      b.onclick = function () {
        var pos = parseInt(b.dataset.pos, 10), act = b.dataset.act;
        if (act === "sat") imarSatBir(pos); else if (act === "ipotek") ipotekEt(pos); else if (act === "kaldir") ipotekKaldir(pos);
        yenidenCiz();
      };
    });
  }
  function mulklerModal() {
    var o = aktif();
    modalAc('<div class="kart-ust" style="background:#34495e">🏛️ MÜLKLERİM · ' + fmt(o.para) + '</div><p class="m-bilgi" style="font-size:13.5px">Yapı satabilir (yarı fiyat) veya şehir ipotek edebilirsin. İpotek için önce bölgenin yapıları satılır.</p><div class="imar-liste">' + varlikSatir(o) + '</div><div class="m-btnlar"><button class="akbtn btn-ana" id="m-kapat">Kapat</button></div>');
    varlikBind(mulklerModal);
    $("#m-kapat").onclick = function () { modalKapat(); render(); };
  }
  function borcModal(o, miktar, alacakli) {
    function ciz() {
      var yeter = o.para >= miktar;
      modalAc('<div class="kart-ust" style="background:#7d2b2b">⚠️ BORÇ · ' + fmt(miktar) + '</div>' +
        '<p class="m-bilgi">Ödemen gereken <b>' + fmt(miktar) + '</b>, nakdin <b style="color:' + (yeter ? "#1c6b41" : "#9a3b3b") + '">' + fmt(o.para) + '</b>. Yapı satıp şehirlerini ipotek ederek nakit topla, sonra <b>borcu öde</b>.</p>' +
        '<div class="imar-liste">' + varlikSatir(o) + '</div>' +
        '<div class="m-btnlar">' +
        (yeter ? '<button class="akbtn btn-ana" id="b-ode">💰 Borcu Öde (' + fmt(miktar) + ')</button>' : '<button class="akbtn btn-pasif" disabled>Nakit yetersiz</button>') +
        '<button class="akbtn" id="b-teslim">🏳️ Teslim Ol</button></div>', true);
      varlikBind(ciz);
      var b;
      if ((b = $("#b-ode"))) b.onclick = function () { o.para -= miktar; if (alacakli) alacakli.para += miktar; logla("💸 " + o.ad + " borcunu ödedi: -" + fmt(miktar), alacakli ? "" : "kotu"); Ses.ode(); modalKapat(); render(); galibiyetKontrol(); };
      $("#b-teslim").onclick = function () { logla("🏳️ " + o.ad + " borcu ödeyemedi, teslim oldu.", "kotu"); modalKapat(); iflasEt(o, alacakli); render(); };
    }
    ciz();
  }
  function botLikidite(o, hedef) {
    var guard = 0;
    while (o.para < hedef && guard++ < 80) {
      var yapi = null;
      K.forEach(function (x) { if (x.tip === "sehir" && x.sahip === o.id && x.imar > 0) { var maxi = Math.max.apply(null, grupKareler(x.grupKey).map(function (g) { return g.imar; })); if (x.imar >= maxi && (!yapi || x.imar > yapi.imar)) yapi = x; } });
      if (yapi) { o.para += Math.round(yapi.imarBedeli / 2); yapi.imar--; continue; }
      var m = null;
      K.forEach(function (x) { if ((x.tip === "sehir" || x.tip === "liman" || x.tip === "utility") && x.sahip === o.id && !x.ipotekli && (x.tip !== "sehir" || x.imar === 0) && !m) m = x; });
      if (m) { m.ipotekli = true; o.para += m.ipotek; continue; }
      break;
    }
  }
  function siralamaSatir(sirali, vurgu) {
    return sirali.map(function (o, i) {
      var madalya = ["🥇", "🥈", "🥉"][i] || (i + 1) + ".";
      return '<div class="sira-row' + (vurgu && i === 0 ? " kazanan" : "") + (o.iflas ? " iflas" : "") + '">' +
        '<span class="sr-rank">' + madalya + '</span>' +
        '<span class="sr-amblem" style="background:' + o.renk + '">' + (o.amblem || "") + '</span>' +
        '<span class="sr-ad">' + o.ad + (o.bot ? " 🤖" : "") + (o.iflas ? " · iflas" : "") + '</span>' +
        '<span class="sr-servet">' + fmt(servet(o)) + '</span></div>';
    }).join("");
  }
  function sonucModal(g) {
    Ses.kazan(); temizleKayit();
    var sirali = oyun.oyuncular.slice().sort(function (a, b) { if (a.iflas !== b.iflas) return a.iflas ? 1 : -1; return servet(b) - servet(a); });
    var kz = g || sirali[0];
    var enSehir = oyun.oyuncular.slice().sort(function (a, b) { return b.mulkler.length - a.mulkler.length; })[0];
    var enSeref = oyun.oyuncular.slice().sort(function (a, b) { return (b.seref || 0) - (a.seref || 0); })[0];
    var ozet = '<div class="ozet-kutu">📜 ' + (oyun.elGecti ? '<b>' + Math.ceil(oyun.elGecti / oyun.oyuncular.length) + '</b> tur · ' : '') +
      'en çok şehir: <b>' + enSehir.ad + '</b> (' + enSehir.mulkler.length + ')' +
      (enSeref && enSeref.seref ? ' · en çok kutsal ziyaret: <b>' + enSeref.ad + '</b> (❖' + enSeref.seref + ')' : '') + '</div>';
    modalAc('<div class="zafer">' + gorselImg("kapak", "zafer-bg") + '<div class="zafer-perde"></div>' +
      '<div class="zafer-ic"><div class="zafer-amblem" style="background:' + (kz ? kz.renk : "#888") + '">' + (kz ? (kz.amblem || "🏆") : "🏆") + '</div>' +
      '<div class="zafer-ust">🏆 CİHANA ULAŞAN</div><div class="zafer-ad">' + (kz ? kz.ad : "—") + '</div>' +
      '<div class="zafer-alt">Beylikten cihana giden yolda zafer senindir!</div></div></div>' +
      '<div class="sira-liste">' + siralamaSatir(sirali, true) + '</div>' + ozet +
      '<div class="m-btnlar"><button class="akbtn" id="m-kapat">👁️ Tahtayı Gör</button><button class="akbtn btn-ana" onclick="location.reload()">🔄 Yeni Oyun</button></div>', true);
    $("#m-kapat").onclick = modalKapat;
  }
  function skorGoster() {
    var sirali = oyun.oyuncular.slice().sort(function (a, b) { if (a.iflas !== b.iflas) return a.iflas ? 1 : -1; return servet(b) - servet(a); });
    modalAc('<div class="kart-ust" style="background:#34495e">📊 SERVET SIRALAMASI</div><p class="m-bilgi" style="font-size:13.5px">Servet = nakit + mülk değeri + imar yapıları.</p><div class="sira-liste">' + siralamaSatir(sirali, false) + '</div><div class="m-btnlar"><button class="akbtn btn-ana" id="m-kapat">Kapat</button></div>');
    $("#m-kapat").onclick = modalKapat;
  }

  window.addEventListener("DOMContentLoaded", function () {
    $("#oyuncu-sayisi").addEventListener("change", kurulumEkrani);
    $("#basla").addEventListener("click", oyunBaslat);
    $("#skor-btn").addEventListener("click", skorGoster);
    $("#ses-btn").addEventListener("click", function () { var k = !Ses.kapaliMi(); Ses.sustur(k); this.textContent = k ? "🔇 Ses" : "🔊 Ses"; if (!k) Ses.init(); });
    $("#kurallar-btn").addEventListener("click", function () { $("#kurallar-modal").style.display = "flex"; });
    $("#kurallar-kapat").addEventListener("click", function () { $("#kurallar-modal").style.display = "none"; });
    var dv = $("#devam-btn");
    if (dv && kayitVarMi()) { dv.classList.remove("gizli"); dv.addEventListener("click", function () { yukle(); }); }
    kurulumEkrani();
    var sr = $("#surum-rozet"); if (sr) sr.textContent = "v5 ✓ hazır";
  });
  window.BC = { get oyun() { return oyun; }, botTuru: function () { botTuru(); } };
})();
