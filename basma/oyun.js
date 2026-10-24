/* Basma! — oyun akışı. Seviye cümleleri levels.js dosyasındadır. */
(function () {
  "use strict";

  var mantik = window.BASMA_MANTIK;
  var paketler = window.BASMA_PAKETLER || [];
  var DILIM = 28;
  var REKOR_ANAHTAR = "basma-rekor-v1";
  var SES_ANAHTAR = "basma-ses";

  var carpan = 1;
  try {
    var yerel = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    var sorgu = new URLSearchParams(location.search).get("carpan");
    if (yerel && sorgu && /^[1-9]\d?$/.test(sorgu)) {
      var n = parseInt(sorgu, 10);
      if (n <= 20) carpan = n;
    }
  } catch (e) { /* adres okunamazsa normal hız */ }

  var giris = document.getElementById("giris");
  var oyun = document.getElementById("oyun");
  var dugme = document.getElementById("dugme");
  var metin = document.getElementById("metin");
  var sayilan = document.getElementById("sayilan");
  var ikonKutu = document.getElementById("ikonlar");
  var basSay = document.getElementById("bas-say");
  var seviyeEtiket = document.getElementById("seviye-etiket");
  var sureYazi = document.getElementById("sure-yazi");
  var kuralListe = document.getElementById("kural-listesi");
  var kuralNot = document.getElementById("kural-not");
  var ipucu = document.getElementById("ipucu");
  var son = document.getElementById("son");
  var sonBaslik = document.getElementById("son-baslik");
  var sonSayi = document.getElementById("son-sayi");
  var sonMetin = document.getElementById("son-metin");
  var sonRekor = document.getElementById("son-rekor");
  var canli = document.getElementById("canli");
  var halka = document.getElementById("halka");
  var sarmal = document.getElementById("sarmal");
  var rekorSatir = document.getElementById("rekorlar");
  var sesBtn = document.getElementById("ses");

  var paket = null;
  var seviyeler = [];
  var indeks = 0;
  var basilan = 0;
  var hedef = { min: 0, max: 0 };
  var sureMs = 0;
  var kalan = 0;
  var durum = "giris";
  var raf = 0;
  var sonZaman = 0;
  var gosterilenSn = -1;
  var bellek = { sonBas: 0, akil: null, kurallar: [], gorulen: {} };
  var dilimler = [];
  var sesAcik = true;
  var audioCtx = null;
  var sonSayim = -1000;
  var araZaman = 0;

  try {
    sesAcik = localStorage.getItem(SES_ANAHTAR) !== "0";
  } catch (e) { sesAcik = true; }

  function araMs() {
    return carpan > 1 ? 140 : 680;
  }

  function depoOku() {
    try {
      var ham = localStorage.getItem(REKOR_ANAHTAR);
      var veri = ham ? JSON.parse(ham) : {};
      return veri && typeof veri === "object" ? veri : {};
    } catch (e) {
      return {};
    }
  }

  function rekorKaydet(id, ulasilan) {
    var veri = depoOku();
    var once = typeof veri[id] === "number" ? veri[id] : 0;
    if (ulasilan > once) veri[id] = ulasilan;
    try { localStorage.setItem(REKOR_ANAHTAR, JSON.stringify(veri)); } catch (e) { /* gizli pencere */ }
    return typeof veri[id] === "number" ? veri[id] : ulasilan;
  }

  function rekorYazi() {
    var veri = depoOku();
    return paketler.map(function (p) {
      var en = veri[p.id];
      var adet = p.seviyeler.length;
      if (typeof en === "number" && en > 0) return p.ad + " rekorun: " + en + " / " + adet;
      return p.ad + ": henüz rekor yok";
    }).join(" · ");
  }

  function paketDoldur() {
    paketler.forEach(function (p) {
      var adet = document.getElementById("adet-" + p.id);
      if (adet) adet.textContent = p.seviyeler.length + " seviye · " + p.ozet;
    });
    if (rekorSatir) rekorSatir.textContent = rekorYazi();
  }

  function sesBaglam() {
    if (!sesAcik) return null;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function bip(frekans, sure, tur, guc) {
    var ctx = sesBaglam();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var kazanc = ctx.createGain();
    osc.type = tur || "sine";
    osc.frequency.value = frekans;
    kazanc.gain.setValueAtTime(guc || 0.05, ctx.currentTime);
    kazanc.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + sure);
    osc.connect(kazanc);
    kazanc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + sure);
  }

  function basSesi() { bip(540, 0.05, "triangle", 0.045); }
  function dogruSesi() {
    bip(523, 0.09, "sine", 0.05);
    setTimeout(function () { bip(784, 0.12, "sine", 0.04); }, 80);
  }
  function hataSesi() { bip(128, 0.26, "sawtooth", 0.03); }
  function tikSesi() { bip(330, 0.04, "sine", 0.025); }

  function sesEtiket() {
    if (!sesBtn) return;
    sesBtn.setAttribute("aria-pressed", sesAcik ? "true" : "false");
    sesBtn.textContent = sesAcik ? "Ses açık" : "Ses kapalı";
    sesBtn.setAttribute("aria-label", sesAcik ? "Sesi kapat" : "Sesi aç");
  }

  function halkaKur() {
    if (dilimler.length) return;
    var ns = "http://www.w3.org/2000/svg";
    var grup = document.createElementNS(ns, "g");
    grup.setAttribute("transform", "rotate(-90 50 50)");
    var yaricap = 46;
    var cevre = 2 * Math.PI * yaricap;
    var dilim = cevre / DILIM;
    var boy = dilim * 0.56;
    for (var i = 0; i < DILIM; i++) {
      var cember = document.createElementNS(ns, "circle");
      cember.setAttribute("cx", "50");
      cember.setAttribute("cy", "50");
      cember.setAttribute("r", String(yaricap));
      cember.setAttribute("fill", "none");
      cember.setAttribute("stroke-width", "2.7");
      cember.setAttribute("stroke-linecap", "round");
      cember.setAttribute("stroke-dasharray", boy.toFixed(3) + " " + (cevre - boy).toFixed(3));
      cember.setAttribute("stroke-dashoffset", (-i * dilim).toFixed(3));
      cember.setAttribute("class", "dilim dolu");
      grup.appendChild(cember);
    }
    halka.appendChild(grup);
    dilimler = grup.querySelectorAll(".dilim");
  }

  function halkaCiz() {
    var oran = sureMs <= 0 ? 0 : Math.max(0, kalan) / sureMs;
    var gorunen = Math.ceil(oran * DILIM - 1e-9);
    if (gorunen < 0) gorunen = 0;
    if (gorunen > DILIM) gorunen = DILIM;
    var gizlenen = DILIM - gorunen;
    for (var i = 0; i < dilimler.length; i++) {
      dilimler[i].classList.toggle("dolu", i >= gizlenen);
    }
    sarmal.classList.toggle("acil", durum === "oynuyor" && oran > 0 && oran < 0.3);
  }

  function uc(derece, uzun) {
    var rad = (derece - 90) * Math.PI / 180;
    return {
      x: (32 + Math.cos(rad) * uzun).toFixed(1),
      y: (32 + Math.sin(rad) * uzun).toFixed(1)
    };
  }

  function cokgen(kose) {
    var noktalar = [];
    for (var i = 0; i < kose; i++) {
      var aci = -Math.PI / 2 + i * 2 * Math.PI / kose;
      noktalar.push((32 + 18 * Math.cos(aci)).toFixed(1) + "," + (32 + 18 * Math.sin(aci)).toFixed(1));
    }
    return '<polygon points="' + noktalar.join(" ") + '" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>';
  }

  function yildiz() {
    var noktalar = [];
    for (var i = 0; i < 10; i++) {
      var aci = -Math.PI / 2 + i * Math.PI / 5;
      var r = i % 2 === 0 ? 18 : 7.5;
      noktalar.push((32 + r * Math.cos(aci)).toFixed(1) + "," + (32 + r * Math.sin(aci)).toFixed(1));
    }
    return '<polygon points="' + noktalar.join(" ") + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>';
  }

  function saatCiz(saat, dakika) {
    var sa = ((saat || 0) % 12) * 30 + (dakika || 0) * 0.5;
    var dk = (dakika || 0) * 6;
    var tik = "";
    for (var i = 0; i < 12; i++) {
      var dis = uc(i * 30, 21);
      var ic = uc(i * 30, i % 3 === 0 ? 16 : 18);
      tik += '<line x1="' + ic.x + '" y1="' + ic.y + '" x2="' + dis.x + '" y2="' + dis.y + '" stroke="currentColor" stroke-width="' + (i % 3 === 0 ? "2" : "1.2") + '" stroke-linecap="round"/>';
    }
    var akrep = uc(sa, 11);
    var yelkovan = uc(dk, 16);
    return '<circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
      tik +
      '<line x1="32" y1="32" x2="' + akrep.x + '" y2="' + akrep.y + '" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' +
      '<line x1="32" y1="32" x2="' + yelkovan.x + '" y2="' + yelkovan.y + '" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' +
      '<circle cx="32" cy="32" r="2" fill="currentColor"/>';
  }

  var SABIT = {
    kedi: '<path d="M16 30 L20 13 L28 26 L32 16 L36 26 L44 13 L48 30 C54 33 54 50 32 52 C10 50 10 33 16 30Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="26" cy="36" r="1.8" fill="currentColor"/><circle cx="38" cy="36" r="1.8" fill="currentColor"/><path d="M32 40 v3.5 M29 46.5 h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    fare: '<ellipse cx="30" cy="38" rx="15" ry="11" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="16" cy="26" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M44 42 Q58 50 52 30" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="18" cy="36" r="1.4" fill="currentColor"/><circle cx="14" cy="38" r="1.3" fill="currentColor"/>',
    orumcek: '<circle cx="32" cy="28" r="5" fill="none" stroke="currentColor" stroke-width="2.2"/><ellipse cx="32" cy="40" rx="8" ry="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M27 30 L12 18 M27 34 L8 32 M27 38 L12 48 M29 44 L20 56 M37 30 L52 18 M37 34 L56 32 M37 38 L52 48 M35 44 L44 56" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    ucgen: cokgen(3),
    kare: cokgen(4),
    besgen: cokgen(5),
    altigen: cokgen(6),
    daire: '<circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" stroke-width="2.4"/>',
    yildiz: yildiz()
  };

  function svgKap(ad, ic) {
    return '<svg viewBox="0 0 64 64" data-ikon="' + ad + '" aria-hidden="true" focusable="false">' + ic + "</svg>";
  }

  function ikonCiz(seviye) {
    var liste = mantik.ikonlar(seviye);
    var html = "";
    for (var i = 0; i < liste.length; i++) {
      var ad = String(liste[i]).replace(/[^a-z]/g, "");
      if (ad === "saat") html += svgKap("saat", saatCiz(seviye.saat, seviye.dakika));
      else if (SABIT[ad]) html += svgKap(ad, SABIT[ad]);
    }
    ikonKutu.innerHTML = html;
  }

  function kurallariCiz() {
    kuralListe.replaceChildren();
    bellek.kurallar.forEach(function (kural) {
      if (!kural.yazi) return;
      var li = document.createElement("li");
      li.textContent = kural.yazi;
      kuralListe.appendChild(li);
    });
    var varKural = kuralListe.children.length > 0;
    kuralNot.hidden = !varKural;
    kuralListe.hidden = !varKural;
  }

  function basYazi() {
    basSay.textContent = "Basış: " + basilan;
  }

  function duyur(yazi) {
    canli.textContent = "";
    window.setTimeout(function () { canli.textContent = yazi; }, 30);
  }

  function seviyeSure(seviye) {
    var ms = Math.round((seviye.sure || 6) * 1000 / carpan);
    if (carpan > 1 && ms < 450) ms = 450;
    return ms;
  }

  function kareyiTemizle() {
    sarmal.classList.remove("hata", "tamam", "acil");
    dugme.classList.remove("hata", "dogru", "uzun");
    dugme.disabled = false;
  }

  function seviyeBaslat() {
    if (araZaman) {
      clearTimeout(araZaman);
      araZaman = 0;
    }
    var seviye = seviyeler[indeks];
    if (!seviye) return bitir("tamam");
    if (seviye.tur === "hatirla") bellek.akil = seviye.deger;
    bellek.kurallar = mantik.kuralEkle(bellek.kurallar, seviye);
    hedef = mantik.hedefCoz(seviye, bellek);
    basilan = 0;
    sureMs = seviyeSure(seviye);
    kalan = sureMs;
    gosterilenSn = -1;
    sonZaman = 0;
    durum = "oynuyor";
    kareyiTemizle();
    ipucu.hidden = false;
    son.hidden = true;
    oyun.dataset.seviye = String(indeks + 1);
    oyun.dataset.durum = "oynuyor";
    seviyeEtiket.textContent = paket.ad + " · " + (indeks + 1) + " / " + seviyeler.length;
    metin.textContent = seviye.metin || "";
    if (seviye.sayilan) {
      sayilan.hidden = false;
      sayilan.textContent = "« " + seviye.sayilan + " »";
    } else {
      sayilan.hidden = true;
      sayilan.textContent = "";
    }
    dugme.classList.toggle("uzun", (seviye.metin || "").length > 72);
    ikonCiz(seviye);
    kurallariCiz();
    basYazi();
    halkaCiz();
    sureGuncelle(true);
    duyur("Seviye " + (indeks + 1) + ". " + (seviye.metin || "") + (seviye.sayilan ? " " + seviye.sayilan : ""));
    raf = requestAnimationFrame(dongu);
  }

  function sureGuncelle(ilk) {
    var sn = Math.ceil(Math.max(0, kalan) / 1000);
    if (sn !== gosterilenSn) {
      if (!ilk && sn < gosterilenSn && sn > 0 && sn <= 3) tikSesi();
      gosterilenSn = sn;
      sureYazi.textContent = sn + " sn";
    }
    sureYazi.classList.toggle("acil", durum === "oynuyor" && sn <= 3);
  }

  function dongu(simdi) {
    if (durum !== "oynuyor") return;
    if (!sonZaman) {
      sonZaman = simdi;
      raf = requestAnimationFrame(dongu);
      return;
    }
    var gecen = simdi - sonZaman;
    sonZaman = simdi;
    if (gecen < 0) gecen = 0;
    kalan -= gecen;
    if (kalan < 0) kalan = 0;
    halkaCiz();
    sureGuncelle(false);
    if (kalan <= 0) {
      var oldu = basilan >= hedef.min && basilan <= hedef.max;
      if (oldu) basarili();
      else bitir("hata");
      return;
    }
    raf = requestAnimationFrame(dongu);
  }

  function gorulenIsle(seviye) {
    var liste = mantik.ikonlar(seviye);
    for (var i = 0; i < liste.length; i++) {
      var ad = liste[i];
      bellek.gorulen[ad] = (bellek.gorulen[ad] || 0) + 1;
    }
  }

  function basarili() {
    if (durum !== "oynuyor") return;
    durum = "ara";
    oyun.dataset.durum = "ara";
    cancelAnimationFrame(raf);
    bellek.sonBas = basilan;
    gorulenIsle(seviyeler[indeks]);
    dugme.classList.add("dogru");
    sarmal.classList.add("tamam");
    dugme.disabled = true;
    dogruSesi();
    indeks += 1;
    if (indeks >= seviyeler.length) {
      araZaman = setTimeout(function () { bitir("tamam"); }, araMs());
    } else {
      araZaman = setTimeout(seviyeBaslat, araMs());
    }
  }

  function bitir(neden) {
    if (durum === "bitti") return;
    if (durum === "ara" && indeks >= seviyeler.length) neden = "tamam";
    var kazandi = neden === "tamam";
    if (durum === "oynuyor") cancelAnimationFrame(raf);
    durum = "bitti";
    oyun.dataset.durum = kazandi ? "kazandi" : "bitti";
    if (araZaman) {
      clearTimeout(araZaman);
      araZaman = 0;
    }
    var ulasilan = kazandi ? seviyeler.length : indeks + 1;
    var tamamlanan = kazandi ? seviyeler.length : indeks;
    var enIyi = rekorKaydet(paket.id, ulasilan);
    kareyiTemizle();
    dugme.disabled = true;
    if (kazandi) {
      dugme.classList.add("dogru");
      sarmal.classList.add("tamam");
      sonBaslik.textContent = "Tur tamam";
      document.getElementById("son-etiket").textContent = "Tamamlanan seviye";
      sonSayi.textContent = String(seviyeler.length);
      sonMetin.textContent = seviyeler.length + " seviyenin hepsini tamamladın.";
    } else {
      dugme.classList.add("hata");
      sarmal.classList.add("hata");
      halkaCiz();
      if (neden === "hata") hataSesi();
      sonBaslik.textContent = neden === "birak" ? "Turu bıraktın" : "Tur bitti";
      document.getElementById("son-etiket").textContent = "Kaldığın seviye";
      sonSayi.textContent = String(ulasilan);
      var talimat = (seviyeler[indeks] && seviyeler[indeks].metin) || "";
      sonMetin.textContent = ulasilan + ". seviyede kaldın. Talimat: " + talimat + " Tamamlanan: " + tamamlanan + ".";
    }
    sonRekor.textContent = "Bu cihazda en iyi: " + enIyi + " / " + seviyeler.length;
    ipucu.hidden = true;
    son.hidden = false;
    duyur(sonBaslik.textContent + ". " + sonMetin.textContent);
    if (rekorSatir) rekorSatir.textContent = rekorYazi();
  }

  function bas() {
    if (durum !== "oynuyor") return;
    var simdi = performance.now();
    if (simdi - sonSayim < 35) return;
    sonSayim = simdi;
    basilan += 1;
    basYazi();
    basSesi();
    dugme.classList.remove("vurus");
    void dugme.offsetWidth;
    dugme.classList.add("vurus");
    if (basilan > hedef.max) bitir("hata");
  }

  function turAc(id) {
    paket = null;
    for (var i = 0; i < paketler.length; i++) if (paketler[i].id === id) paket = paketler[i];
    if (!paket || !paket.seviyeler.length) return;
    seviyeler = paket.seviyeler;
    indeks = 0;
    bellek = { sonBas: 0, akil: null, kurallar: [], gorulen: {} };
    giris.hidden = true;
    oyun.hidden = false;
    halkaKur();
    seviyeBaslat();
    dugme.focus({ preventScroll: true });
  }

  function basaDon() {
    if (araZaman) clearTimeout(araZaman);
    cancelAnimationFrame(raf);
    durum = "giris";
    oyun.dataset.durum = "giris";
    oyun.hidden = true;
    son.hidden = true;
    giris.hidden = false;
    kareyiTemizle();
    paketDoldur();
    var ilk = document.getElementById("baslat-dikkat");
    if (ilk) ilk.focus({ preventScroll: true });
  }

  dugme.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    e.preventDefault();
    bas();
  });
  dugme.addEventListener("click", function (e) {
    e.preventDefault();
    if (performance.now() - sonSayim < 450) return;
    bas();
  });
  dugme.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  window.addEventListener("keydown", function (e) {
    if (durum !== "oynuyor") return;
    if (e.repeat) return;
    if (e.code !== "Space" && e.code !== "Enter") return;
    var hedefDugme = e.target && e.target.closest ? e.target.closest("button") : null;
    if (hedefDugme && hedefDugme !== dugme) return;
    e.preventDefault();
    bas();
  });

  document.getElementById("baslat-dikkat").addEventListener("click", function () {
    sesBaglam();
    turAc("dikkat");
  });
  document.getElementById("baslat-siyer").addEventListener("click", function () {
    sesBaglam();
    turAc("siyer");
  });
  document.getElementById("basa-don").addEventListener("click", basaDon);
  document.getElementById("birak").addEventListener("click", function () {
    if (durum === "oynuyor" || durum === "ara") bitir("birak");
    else basaDon();
  });
  sesBtn.addEventListener("click", function () {
    sesAcik = !sesAcik;
    try { localStorage.setItem(SES_ANAHTAR, sesAcik ? "1" : "0"); } catch (e) { /* yoksay */ }
    sesEtiket();
  });

  sesEtiket();
  paketDoldur();
  halkaKur();
})();
