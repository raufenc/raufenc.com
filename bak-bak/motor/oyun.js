/* ============================================================
   Bak Bak — oyun motoru.  BB.Tahta = tek bir oyun tahtası.
   Aynı sınıf hem "Tek Kişi" (bir tahta) hem "İki Kişi" (iki tahta,
   biri 180° dönük) modunda kullanılır. Motor içeriği BİLMEZ —
   tüm terimler/görseller içerik paketinden (window.PAKET) gelir.

   Akış:
     her tur → bir hedef öğe seçilir, ızgara doldurulur (1 hedef + çeldiriciler)
     doğru dokunuş → hedef kelimeden bir harf kazanılır (BAK BAK...)
     kelime tamamlanınca → onTamam(sonuc)
   ============================================================ */
window.BB = window.BB || {};
(function () {
  "use strict";

  function karistir(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function rastgele(a) { return a[Math.floor(Math.random() * a.length)]; }
  function harfSay(kelime) { return kelime.replace(/ /g, "").length; }

  /* ---- Tahta ---- */
  function Tahta(kap, ayar) {
    this.kap = kap;
    this.ogeler = ayar.ogeler;
    this.kok = ayar.kok || "";
    this.hedefKelime = (ayar.hedefKelime || "BAK BAK").toLocaleUpperCase("tr");
    this.soruModu = ayar.soruModu || "karisik";        // resim | kelime | karisik
    this.seviyeler = (ayar.seviyeler && ayar.seviyeler.length) ? ayar.seviyeler : [{ adet: 9 }, { adet: 16 }, { adet: 25 }];
    this.donuk = !!ayar.donuk;                          // İki kişi modunda üstteki oyuncu için 180°
    this.mod = ayar.mod || "izgara";                    // izgara | tahta (sahne görseli + hotspot)
    this.tahtalar = ayar.tahtalar || {};                // tahta modunda: {kartX: "kartX.jpg"}
    this.onDogru = ayar.onDogru || function () {};
    this.onYanlis = ayar.onYanlis || function () {};
    this.onTamam = ayar.onTamam || function () {};

    this.dogru = 0; this.yanlis = 0; this.turIndex = 0;
    this.kilit = true; this.bitti = false; this.sonHedefId = null; this.baslangicT = 0;
    this._kur();
  }

  Tahta.prototype._kur = function () {
    this.kap.innerHTML = "";
    this.kap.classList.add("bb-tahta");
    if (this.donuk) this.kap.classList.add("bb-donuk");
    this.elIlerleme = document.createElement("div"); this.elIlerleme.className = "bb-ilerleme";
    this.elHedef = document.createElement("div"); this.elHedef.className = "bb-hedef";
    this.elIzgara = document.createElement("div"); this.elIzgara.className = "bb-izgara";
    this.kap.appendChild(this.elIlerleme);
    this.kap.appendChild(this.elHedef);
    this.kap.appendChild(this.elIzgara);
    this._ilerlemeCiz();
  };

  Tahta.prototype.basla = function () {
    this.dogru = 0; this.yanlis = 0; this.turIndex = 0; this.bitti = false; this._iptal = false;
    this.gorulen = [];                                  // bu oyunda karşılaşılan hedefler (bitiş özeti)
    this.baslangicT = performance.now();
    this._ilerlemeCiz();
    this.yeniTur();
  };

  Tahta.prototype._seviye = function () {
    return this.seviyeler[Math.min(this.turIndex, this.seviyeler.length - 1)];
  };

  Tahta.prototype.yeniTur = function () {
    if (this.mod === "tahta") return this._yeniTurTahta();
    if (this.mod === "orta") return this._yeniTurOrta();
    var self = this;
    var adet = this._seviye().adet || 9;

    // hedef seç (üst üste aynı olmasın)
    var havuz = this.ogeler.filter(function (o) { return o.id !== self.sonHedefId; });
    if (!havuz.length) havuz = this.ogeler;
    this.hedef = rastgele(havuz);
    this.sonHedefId = this.hedef.id;

    // soru modu (karışıkta sırayla değişir)
    var mod = this.soruModu;
    if (mod === "karisik") mod = ["bilgi", "resim", "kelime"][this.turIndex % 3];
    if (mod === "bilgi" && !this.hedef.bilgi) mod = "kelime";   // ipucu yoksa isme düş
    this.aktifMod = mod;

    // ızgara: 1 hedef + (adet-1) çeldirici (tekrar serbest, hedef benzersiz)
    var celdirici = this.ogeler.filter(function (o) { return o.id !== self.hedef.id; });
    var hucreler = [this.hedef];
    for (var i = 0; i < adet - 1; i++) hucreler.push(rastgele(celdirici));
    hucreler = karistir(hucreler);

    this._promptCiz(mod);
    this._izgaraCiz(hucreler, adet);
    this.kilit = false;
  };

  /* ---- TAHTA MODU: bir sahne (kart) göster, üstüne görünmez hotspot'lar koy ---- */
  Tahta.prototype._yeniTurTahta = function () {
    var self = this;
    var havuz = this.ogeler.filter(function (o) { return o.id !== self.sonHedefId; });
    if (!havuz.length) havuz = this.ogeler;
    this.hedef = rastgele(havuz);
    this.sonHedefId = this.hedef.id;
    this.aktifMod = "bilgi";
    var board = this.hedef.tahta;
    var adaylar = this.ogeler.filter(function (o) { return o.tahta === board; });
    this._promptCiz("bilgi");
    this._sahneCiz(adaylar, board);
    this.kilit = false;
  };

  Tahta.prototype._sahneCiz = function (adaylar, board) {
    var self = this;
    this.elIzgara.className = "bb-sahne";
    this.elIzgara.style.removeProperty("--sut");
    this.elIzgara.innerHTML = '<img class="bb-sahne-img" src="' + this.kok + (this.tahtalar[board] || "") + '" alt="" draggable="false">';
    adaylar.forEach(function (o) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "bb-nokta";
      b.style.left = o.x + "%"; b.style.top = o.y + "%";
      b.style.width = o.w + "%"; b.style.height = o.h + "%";
      b.title = o.ad; b.setAttribute("aria-label", o.ad);
      b.addEventListener("click", function () { self._tikla(o, b); });
      self.elIzgara.appendChild(b);
    });
  };

  /* ---- ORTA MODU: 3x3 ızgara, MERKEZ hücre bilgi kartı, çevrede 8 tek görsel ---- */
  Tahta.prototype._yeniTurOrta = function () {
    var self = this;
    var havuz = this.ogeler.filter(function (o) { return o.id !== self.sonHedefId; });
    if (!havuz.length) havuz = this.ogeler;
    this.hedef = rastgele(havuz);
    this.sonHedefId = this.hedef.id;
    this.aktifMod = "bilgi";
    // 1 hedef + 7 benzersiz çeldirici, karıştır
    var celdirici = karistir(this.ogeler.filter(function (o) { return o.id !== self.hedef.id; })).slice(0, 7);
    var gorseller = karistir([this.hedef].concat(celdirici));
    this.elHedef.style.display = "none";       // orta modda üst prompt yok; ipucu merkezde
    this._ortaCiz(gorseller);
    this.kilit = false;
  };

  Tahta.prototype._ortaCiz = function (gorseller) {
    var self = this;
    this.elIzgara.className = "bb-izgara bb-izgara--orta";
    this.elIzgara.style.setProperty("--sut", 3);
    this.elIzgara.innerHTML = "";
    var gi = 0;
    for (var pos = 0; pos < 9; pos++) {
      if (pos === 4) {
        var c = document.createElement("div");
        c.className = "bb-orta";
        c.setAttribute("role", "status");        // ipucu ekran okuyucuya duyurulsun
        c.setAttribute("aria-live", "polite");
        c.innerHTML = '<span class="bb-orta-et">İpucu</span>' +
                      '<span class="bb-orta-metin">' + (this.hedef.bilgi || this.hedef.ad) + "</span>";
        this.elMerkez = c;
        this.elIzgara.appendChild(c);
      } else {
        (function (oge) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "bb-hucre";
          b.innerHTML = self._gorselHTML(oge, "bb-hucre-gorsel");
          b.addEventListener("click", function () { self._tikla(oge, b); });
          self.elIzgara.appendChild(b);
        })(gorseller[gi++]);
      }
    }
    this._ipucuSigdir();
  };

  /* İpucu metnini merkez karta TAM SIĞDIR — asla kırpma.
     Oyunun kalbi ipucu; kırpılırsa soru çözülemez. Kart kare (aspect-ratio:1) kalsın diye
     kutuyu büyütmüyoruz, fontu düşürüyoruz. Ölçüm hilesi: .bb-orta-metin overflow:hidden
     olduğu için flex içindeki otomatik alt sınırı 0'a düşer → taşınca clientHeight kısılır,
     scrollHeight > clientHeight olur. Font, sığana kadar 0.5px adımlarla azaltılır.
     Üst sınır kart genişliğine bağlı (küçük ekranda küçük, büyük ekranda büyük font). */
  Tahta.prototype._ipucuSigdir = function () {
    var kutu = this.elMerkez;
    if (!kutu) return;
    var m = kutu.querySelector(".bb-orta-metin");
    if (!m) return;
    var en = kutu.clientWidth || 0;
    if (!en) return;

    // Punto oyun boyunca SABİT kalmalı: her tur değişen punto amatör durur.
    // Bu yüzden ölçüyü EN UZUN ipucuna göre bir kez hesaplayıp önbelleğe alıyoruz;
    // en uzun metin sığıyorsa hepsi sığar. Kart genişliği değişirse (döndürme) yeniden hesaplanır.
    if (this._puntoEn !== en) {
      var asil = m.textContent;
      m.textContent = this._enUzunBilgi();
      var fs = Math.max(10, Math.min(18, en * 0.115)), guard = 0;
      m.style.fontSize = fs.toFixed(1) + "px";
      while (fs > 8 && m.scrollHeight > m.clientHeight + 0.5 && guard++ < 48) {
        fs -= 0.5;
        m.style.fontSize = fs.toFixed(1) + "px";
      }
      this._punto = fs;
      this._puntoEn = en;
      m.textContent = asil;
    }
    m.style.fontSize = this._punto.toFixed(1) + "px";
  };

  Tahta.prototype._enUzunBilgi = function () {
    if (this._enUzun == null) {
      this._enUzun = "";
      for (var i = 0; i < this.ogeler.length; i++) {
        var b = this.ogeler[i].bilgi || this.ogeler[i].ad || "";
        if (b.length > this._enUzun.length) this._enUzun = b;
      }
    }
    return this._enUzun;
  };

  /* Görsel öğe: <img> + emoji yedeği (PNG yüklenmezse emoji gösterir) */
  Tahta.prototype._gorselHTML = function (oge, cls) {
    var emoji = oge.emoji || "❓";
    if (oge.gorsel) {
      var src = this.kok + oge.gorsel;
      return '<span class="' + cls + '"><img src="' + src + '" alt="' + oge.ad + '" draggable="false" decoding="async" ' +
        "onerror=\"this.parentNode.classList.add('bb-emoji');this.parentNode.textContent='" + emoji + "';\"></span>";
    }
    return '<span class="' + cls + ' bb-emoji">' + emoji + "</span>";
  };

  Tahta.prototype._promptCiz = function (mod) {
    var h = this.hedef;
    if (mod === "bilgi") {
      this.elHedef.className = "bb-hedef bb-hedef--bilgi";
      this.elHedef.innerHTML =
        '<span class="bb-hedef-etiket">Bilgi kartı</span>' +
        '<span class="bb-hedef-bilgi">' + (h.bilgi || h.ad) + "</span>";
    } else if (mod === "kelime") {
      this.elHedef.className = "bb-hedef bb-hedef--kelime";
      this.elHedef.innerHTML =
        '<span class="bb-hedef-etiket">Bunu bul</span>' +
        '<span class="bb-hedef-kelime">' + h.ad + "</span>" +
        (h.arapca ? '<span class="bb-hedef-arap">' + h.arapca + "</span>" : "");
    } else {
      this.elHedef.className = "bb-hedef bb-hedef--resim";
      this.elHedef.innerHTML =
        '<span class="bb-hedef-etiket">Bunu bul</span>' +
        this._gorselHTML(h, "bb-hedef-gorsel");
    }
  };

  /* Doğru bulunca cevabı (ad + görsel + arapça) kısa süre gösterir → ipucu öğretici olur */
  Tahta.prototype._cevabiGoster = function () {
    var h = this.hedef;
    if (this.mod === "orta" && this.elMerkez) {           // orta modda cevap merkez kartta gösterilir
      this.elMerkez.className = "bb-orta bb-orta--cevap";
      this.elMerkez.innerHTML = '<span class="bb-orta-et bb-orta-et--ok">✓ ' + h.ad + "</span>" +
                                this._gorselHTML(h, "bb-orta-gorsel");
      return;
    }
    this.elHedef.className = "bb-hedef bb-hedef--cevap";
    this.elHedef.innerHTML =
      '<span class="bb-hedef-etiket bb-cevap-et">✓ ' + h.ad + "</span>" +
      this._gorselHTML(h, "bb-hedef-gorsel") +
      (h.arapca ? '<span class="bb-hedef-arap">' + h.arapca + "</span>" : "");
  };

  Tahta.prototype._izgaraCiz = function (hucreler, adet) {
    var self = this;
    var sut = Math.ceil(Math.sqrt(adet));
    this.elIzgara.style.setProperty("--sut", sut);
    this.elIzgara.innerHTML = "";
    hucreler.forEach(function (oge) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "bb-hucre";
      b.innerHTML = self._gorselHTML(oge, "bb-hucre-gorsel");
      b.addEventListener("click", function () { self._tikla(oge, b); });
      self.elIzgara.appendChild(b);
    });
  };

  Tahta.prototype._tikla = function (oge, el) {
    if (this.kilit || this.bitti) return;
    var self = this;
    if (oge.id === this.hedef.id) {
      this.kilit = true; this.dogru++; this.turIndex++;
      this.gorulen.push(this.hedef);
      el.classList.add("bb-dogru");
      BB.Ses.dogru();
      this._ilerlemeArtir();
      this.onDogru({ oge: oge, dogru: this.dogru, yanlis: this.yanlis });
      if (this.dogru >= harfSay(this.hedefKelime)) {
        this.bitti = true;
        var sonuc = { dogru: this.dogru, yanlis: this.yanlis, sureMs: performance.now() - this.baslangicT, kelime: this.hedefKelime, gorulenler: this.gorulen };
        BB.Ses.kazandi();
        this._zaman(function () { self.onTamam(sonuc); }, 450);
      } else {
        this._cevabiGoster();                              // cevabı kısa süre göster (öğrenme pekiştirme)
        this._zaman(function () { self.yeniTur(); }, this.mod === "tahta" ? 1000 : 720);
      }
    } else {
      this.yanlis++;
      el.classList.add("bb-yanlis");
      BB.Ses.yanlis();
      this.onYanlis({ oge: oge, dogru: this.dogru, yanlis: this.yanlis });
      this.kilit = true;
      this._zaman(function () { el.classList.remove("bb-yanlis"); if (!self.bitti) self.kilit = false; }, 420);
    }
  };

  Tahta.prototype._ilerlemeCiz = function () {
    var hf = this.hedefKelime.split(""), html = "", idx = 0;
    for (var i = 0; i < hf.length; i++) {
      if (hf[i] === " ") html += '<span class="bb-bosluk"></span>';
      else { html += '<span class="bb-harf" data-i="' + idx + '">' + hf[i] + "</span>"; idx++; }
    }
    this.elIlerleme.innerHTML = html;
  };

  Tahta.prototype._ilerlemeArtir = function () {
    var self = this;
    var harfEl = this.elIlerleme.querySelectorAll(".bb-harf");
    for (var i = 0; i < harfEl.length; i++) if (i < this.dogru) harfEl[i].classList.add("dolu");
    var yeni = harfEl[this.dogru - 1];
    if (yeni) { yeni.classList.add("yeni"); self._zaman(function () { yeni.classList.remove("yeni"); }, 400); }
  };

  /* Zamanlayıcı kaydı: durdur() bekleyen TÜM setTimeout'ları iptal eder.
     Yoksa "↻ Baştan"a basınca eski tahtanın bekleyen onTamam'ı yeni oyunu bitiriyordu. */
  Tahta.prototype._zaman = function (fn, ms) {
    var self = this;
    if (!this._timers) this._timers = [];
    var id = setTimeout(function () {
      self._timers = self._timers.filter(function (t) { return t !== id; });
      if (self._iptal) return;
      fn();
    }, ms);
    this._timers.push(id);
    return id;
  };

  Tahta.prototype.durdur = function () {
    this.kilit = true; this.bitti = true; this._iptal = true;
    (this._timers || []).forEach(clearTimeout);
    this._timers = [];
  };

  BB.Tahta = Tahta;
  BB.util = { karistir: karistir, harfSay: harfSay };
})();
