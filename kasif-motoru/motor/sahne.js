/* ============================================================
   Kâşif Motoru — sahne.js
   - KM.Sabit : dünya sabitleri
   - KM.Ciz   : paylaşılan çizim yardımcıları (levha, kapı, fener, taş, arka plan)
   - KM.Sahne : içerik paketini segmentlere çevirir, mekanik registry'sini
                kurar, ilerleme + skor + SCORM'u yönetir.
   Motor İÇERİĞİ BİLMEZ; her segmentin 'tip'i registry'de bir mekaniği seçer.
   ============================================================ */
window.KM = window.KM || {};

KM.Sabit = {
  GEN: 800, YUK: 460,
  ZEMIN_UST: 360, ZEMIN_KAL: 120,
  RENK: {
    gece: '#16233F', gece2: '#1f2f52', ufuk: '#3a4a78',
    altin: '#c8a46e', altinAcik: '#f0c169', alev: '#e8b04a',
    kagit: '#f5ede0', krem: '#e7d6b0', murekkep: '#2b2118',
    kiremit: '#c4574a', yesil: '#4a7c59', tas: '#5b6472', tasKoyu: '#3c4453'
  }
};

/* ---------------- Çizim yardımcıları ---------------- */
KM.Ciz = (function () {
  var R = KM.Sabit.RENK;
  function arapMi(s) { return /[؀-ۿ]/.test(String(s)); }
  function font(s, size, bold) {
    var f = arapMi(s) ? "'Amiri', 'Times New Roman', serif" : "'Inter', system-ui, sans-serif";
    return (bold ? 'bold ' : '') + size + "px " + f;
  }
  function metin(ctx, str, x, y, size, renk, align, bold) {
    ctx.font = font(str, size, bold);
    ctx.fillStyle = renk || R.murekkep;
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(str, x, y);
  }

  // Cevap levhası (üstten basılan platform + tabela)
  function levha(ctx, x, y, w, h, str, o) {
    o = o || {};
    // platform gövdesi (taş)
    ctx.fillStyle = o.yesil ? R.yesil : (o.kirmizi ? R.kiremit : R.tas);
    ctx.beginPath(); ctx.roundRect(x, y, w, h + 8, 5); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(x + 3, y + 2, w - 6, 3);
    // tabela (krem tablet, platformun üstünde)
    var tw = Math.max(w - 8, 44), tx = x + (w - tw) / 2, ty = y - 42, th = 34;
    ctx.fillStyle = R.kagit;
    ctx.strokeStyle = o.kirmizi ? R.kiremit : (o.yesil ? R.yesil : R.altin);
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(tx, ty, tw, th, 7); ctx.fill(); ctx.stroke();
    // direk
    ctx.strokeStyle = R.altin; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x + w / 2, ty + th); ctx.lineTo(x + w / 2, y); ctx.stroke();
    metin(ctx, str, tx + tw / 2, ty + th / 2, tw < 70 ? 18 : 15, R.murekkep, 'center', true);
  }

  // Ornat kapı (kilitli/açık)
  function kapi(ctx, x, y, w, h, acik) {
    ctx.save();
    // sütun
    ctx.fillStyle = acik ? 'rgba(120,140,110,0.5)' : R.tasKoyu;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = R.altin;
    ctx.fillRect(x - 4, y, w + 8, 8);              // üst pervaz
    // kemer taçı
    ctx.beginPath();
    ctx.moveTo(x - 6, y); ctx.lineTo(x + w / 2, y - 22); ctx.lineTo(x + w + 6, y);
    ctx.closePath(); ctx.fillStyle = R.altin; ctx.fill();
    if (!acik) {
      // kafes
      ctx.strokeStyle = 'rgba(240,193,105,0.6)'; ctx.lineWidth = 2;
      for (var i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x, y + h * i / 5); ctx.lineTo(x + w, y + h * i / 5); ctx.stroke(); }
    } else {
      // açık ışıması
      ctx.fillStyle = 'rgba(245,185,66,0.25)';
      ctx.fillRect(x - 2, y, w + 4, h);
    }
    ctx.restore();
  }

  // Fener (dönen; yanık/sönük) + etiket
  function fener(ctx, cx, cy, str, o) {
    o = o || {};
    ctx.save();
    // ip
    ctx.strokeStyle = R.altin; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy - 46); ctx.lineTo(cx, cy - 26); ctx.stroke();
    // gövde
    var yanik = o.yanik;
    if (yanik) {
      var g = ctx.createRadialGradient(cx, cy - 8, 3, cx, cy - 8, 40);
      g.addColorStop(0, 'rgba(245,185,66,0.55)'); g.addColorStop(1, 'rgba(245,185,66,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy - 8, 40, 0, 6.29); ctx.fill();
    }
    ctx.fillStyle = R.altin;
    ctx.beginPath(); ctx.moveTo(cx - 8, cy - 26); ctx.lineTo(cx + 8, cy - 26); ctx.lineTo(cx + 5, cy - 30); ctx.lineTo(cx - 5, cy - 30); ctx.closePath(); ctx.fill();
    ctx.fillStyle = yanik ? '#3a2f18' : '#2a2f3a';
    ctx.beginPath(); ctx.roundRect(cx - 11, cy - 26, 22, 30, 4); ctx.fill();
    ctx.strokeStyle = R.altin; ctx.lineWidth = 2; ctx.stroke();
    // cam / alev
    ctx.fillStyle = yanik ? '#ffe9a8' : '#4a5266';
    ctx.beginPath(); ctx.roundRect(cx - 7, cy - 22, 14, 22, 3); ctx.fill();
    if (yanik) {
      ctx.fillStyle = R.alev;
      ctx.beginPath(); ctx.moveTo(cx, cy - 20); ctx.quadraticCurveTo(cx + 4, cy - 12, cx, cy - 4);
      ctx.quadraticCurveTo(cx - 4, cy - 12, cx, cy - 20); ctx.fill();
    }
    if (o.puf) {
      ctx.fillStyle = 'rgba(120,120,140,0.5)';
      ctx.beginPath(); ctx.arc(cx, cy - 30, 12, 0, 6.29); ctx.fill();
    }
    // etiket
    var lw = Math.max(ctx.measureText ? 0 : 0, 54);
    ctx.font = font(str, 15, true);
    var mw = ctx.measureText(str).width + 16;
    ctx.fillStyle = R.kagit; ctx.strokeStyle = R.altin; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(cx - mw / 2, cy + 8, mw, 26, 6); ctx.fill(); ctx.stroke();
    metin(ctx, str, cx, cy + 21, 15, R.murekkep, 'center', true);
    ctx.restore();
  }

  // Harf taşı (kelime köprüsü)
  function tas(ctx, x, y, w, h, harf, o) {
    o = o || {};
    ctx.save();
    if (o.dusuyor) ctx.globalAlpha = 0.6;
    ctx.fillStyle = o.yanik ? R.altin : R.tas;
    ctx.beginPath(); ctx.roundRect(x, y, w, h + 10, 6); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(x + 3, y + 2, w - 6, 3);
    if (o.yanik) {
      var g = ctx.createRadialGradient(x + w / 2, y, 2, x + w / 2, y, 30);
      g.addColorStop(0, 'rgba(245,185,66,0.5)'); g.addColorStop(1, 'rgba(245,185,66,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + w / 2, y, 30, 0, 6.29); ctx.fill();
    }
    metin(ctx, harf, x + w / 2, y - 12, 20, o.yanik ? '#4a2f0a' : R.kagit, 'center', true);
    ctx.restore();
  }

  // Işık tanesi (toplanabilir)
  function jeton(ctx, cx, cy, t) {
    var g = ctx.createRadialGradient(cx, cy, 1, cx, cy, 16);
    g.addColorStop(0, 'rgba(245,185,66,0.9)'); g.addColorStop(1, 'rgba(245,185,66,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, 6.29); ctx.fill();
    ctx.fillStyle = KM.Sabit.RENK.altinAcik;
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 6.29); ctx.fill();
  }

  // Zemin / kutu bloğu
  function zemin(ctx, p) {
    var R2 = KM.Sabit.RENK;
    ctx.fillStyle = p.tur === 'kutu' ? '#8a5a2b' : R2.tasKoyu;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = p.tur === 'kutu' ? '#a06a33' : R2.tas;
    ctx.fillRect(p.x, p.y, p.w, 10);
    ctx.fillStyle = 'rgba(200,164,110,0.5)';
    ctx.fillRect(p.x, p.y, p.w, 3);
    // dikey derz
    ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 1;
    for (var sx = p.x + 40; sx < p.x + p.w; sx += 40) {
      ctx.beginPath(); ctx.moveTo(sx, p.y + 10); ctx.lineTo(sx, p.y + p.h); ctx.stroke();
    }
  }

  // Paralaks arka plan (Osmanlı silüeti)
  function arkaPlan(ctx, cam, S) {
    var R2 = S.RENK;
    var g = ctx.createLinearGradient(0, 0, 0, S.YUK);
    g.addColorStop(0, R2.gece); g.addColorStop(0.6, R2.gece2); g.addColorStop(1, R2.ufuk);
    ctx.fillStyle = g; ctx.fillRect(0, 0, S.GEN, S.YUK);
    // yıldızlar
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (var i = 0; i < 30; i++) {
      var sx = (i * 137 - cam.x * 0.1) % (S.GEN + 40); if (sx < 0) sx += S.GEN + 40;
      var sy = (i * 53) % 160;
      ctx.globalAlpha = 0.3 + 0.4 * ((i % 3) / 3);
      ctx.fillRect(sx, sy, 2, 2);
    }
    ctx.globalAlpha = 1;
    // uzak kubbeler
    kubbeSirasi(ctx, cam.x * 0.25, S.ZEMIN_UST + 30, 150, 70, '#22345c');
    // yakın kubbe/minare
    kubbeSirasi(ctx, cam.x * 0.5, S.ZEMIN_UST + 40, 200, 110, '#2a3d68');
    // ufuk sıcak ışıması
    var hg = ctx.createLinearGradient(0, S.ZEMIN_UST - 60, 0, S.ZEMIN_UST + 20);
    hg.addColorStop(0, 'rgba(232,176,74,0)'); hg.addColorStop(1, 'rgba(232,176,74,0.12)');
    ctx.fillStyle = hg; ctx.fillRect(0, S.ZEMIN_UST - 60, S.GEN, 80);
  }
  function kubbeSirasi(ctx, off, taban, aralik, yuk, renk) {
    ctx.fillStyle = renk;
    var S = KM.Sabit;
    var basla = -(off % aralik);
    for (var x = basla; x < S.GEN + aralik; x += aralik) {
      var cx = x + aralik / 2;
      ctx.fillRect(x + aralik * 0.2, taban - yuk * 0.55, aralik * 0.6, yuk * 0.55);
      ctx.beginPath(); ctx.arc(cx, taban - yuk * 0.55, aralik * 0.3, Math.PI, 0); ctx.fill();
      // minare
      ctx.fillRect(cx - 4, taban - yuk, 8, yuk);
      ctx.beginPath(); ctx.moveTo(cx - 6, taban - yuk); ctx.lineTo(cx, taban - yuk - 14); ctx.lineTo(cx + 6, taban - yuk); ctx.closePath(); ctx.fill();
    }
  }

  return { metin: metin, levha: levha, kapi: kapi, fener: fener, tas: tas, jeton: jeton, zemin: zemin, arkaPlan: arkaPlan };
})();

/* ---------------- Sahne yöneticisi ---------------- */
KM.Sahne = function (paket, bolumIndex) {
  var S = KM.Sabit;
  this.S = S;
  this.paket = paket;
  this.bolumIndex = bolumIndex || 0;
  this.bolum = paket.bolumler[this.bolumIndex];
  this.kok = (paket.meta && paket.meta.kok) || '';   // varlık yolu ön eki

  this.platformlar = [];
  this.jetonlar = [];
  this.mekanikler = [];
  this.parcaciklar = [];
  this.kamera = { x: 0, y: 0 };

  // HUD durumları
  this.aktifSoru = null; this.aktifIpucu = null;
  this.hatirlatmaMetin = ''; this.hatirlatmaT = 0;
  this.mesajMetin = ''; this.mesajT = 0;
  this.durum = 'oyun';        // 'oyun' | 'bolumBitti'
  this.sonSkor = 0; this.sonStatus = '';
  this.onBolumBitti = null;

  this._insaEt();

  var basX = 60, basY = S.ZEMIN_UST - 46;
  this.oyuncu = new KM.Oyuncu(basX, basY);
  this.checkpoint = { x: basX, y: basY };
  this.dunyaGen = this.platformlar.reduce(function (m, p) { return Math.max(m, p.x + p.w); }, 0);

  var self = this;
  this.dunya = {
    oyuncu: this.oyuncu,
    part: function (x, y, renk, n) { self.part(x, y, renk, n); },
    hatirlatma: function (m) { self.hatirlatmaMetin = m; self.hatirlatmaT = 1.4; },
    mesaj: function (m, s) { self.mesajMetin = m; self.mesajT = s || 1.1; },
    checkpoint: function (x, y) { self.checkpoint = { x: x, y: y }; },
    respawn: function (x, y) { self.oyuncu.x = x; self.oyuncu.y = y; self.oyuncu.vx = 0; self.oyuncu.vy = 0; }
  };
};

KM.Sahne.prototype._insaEt = function () {
  var S = this.S, imlec = 0;
  // başlangıç pisti
  this.platformlar.push({ x: -40, y: S.ZEMIN_UST, w: 200, h: S.ZEMIN_KAL, tur: 'zemin' });
  imlec = 160;

  var segs = this.bolum.segmentler || [];
  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    if (seg.tip === 'kosu') {
      var L = seg.uzunluk || 640;
      this.platformlar.push({ x: imlec, y: S.ZEMIN_UST, w: L, h: S.ZEMIN_KAL, tur: 'zemin' });
      // ışık taneleri
      var js = seg.jetonlar || [];
      if (js.length) {
        for (var j = 0; j < js.length; j++) {
          var jx = imlec + (js[j].x != null ? js[j].x : 120 + j * 160);
          this.jetonlar.push({ x: jx, y: S.ZEMIN_UST - 92, w: 22, h: 22, deger: js[j].deger, alindi: false });
        }
      } else {
        for (var k = 1; k <= 3; k++) this.jetonlar.push({ x: imlec + k * (L / 4), y: S.ZEMIN_UST - 92, w: 22, h: 22, alindi: false });
      }
      // ritim için 1 kutu
      this.platformlar.push({ x: imlec + L * 0.5, y: S.ZEMIN_UST - 54, w: 56, h: 54, tur: 'kutu' });
      imlec += L;
    } else if (KM.Mekanikler[seg.tip]) {
      seg._kok = this.kok;                       // varlık yolu ön eki
      var mek = KM.Mekanikler[seg.tip](seg, imlec, S);
      for (var p = 0; p < mek.platformlar.length; p++) this.platformlar.push(mek.platformlar[p]);
      for (var q = 0; q < mek.jetonlar.length; q++) this.jetonlar.push(mek.jetonlar[q]);
      this.mekanikler.push(mek);
      imlec = mek.x1;
    } else {
      console.warn('Bilinmeyen segment tipi:', seg.tip);
    }
  }
  // bitiş pisti
  this.platformlar.push({ x: imlec, y: S.ZEMIN_UST, w: 240, h: S.ZEMIN_KAL, tur: 'zemin' });
};

KM.Sahne.prototype.part = function (x, y, renk, n) {
  n = n || 10;
  for (var i = 0; i < n; i++) {
    var a = Math.PI * 2 * i / n + Math.random() * 0.5;
    var sp = 60 + Math.random() * 140;
    this.parcaciklar.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, omur: 0.6, renk: renk || '#f5b942' });
  }
};

KM.Sahne.prototype.guncelle = function (dt) {
  if (this.durum !== 'oyun') return;
  var S = this.S, o = this.oyuncu;

  KM.Girdi.ilerle(dt);
  o.guncelle(dt, KM.Girdi, this.platformlar);

  // mekanikler (yakındakiler)
  for (var i = 0; i < this.mekanikler.length; i++) {
    var m = this.mekanikler[i];
    if (o.x > m.x0 - 900 && o.x < m.x1 + 900) m.guncelle(dt, o, this.dunya);
  }

  // ışık taneleri
  for (var t = 0; t < this.jetonlar.length; t++) {
    var je = this.jetonlar[t];
    if (je.alindi) continue;
    if (KM.Fizik.aabb(o, je)) {
      je.alindi = true; o.isik = Math.min(100, o.isik + 3); o.parlama = 0.3;
      KM.Ses.jeton(); this.part(je.x + 11, je.y + 11, '#f0c169', 6);
    }
  }

  // parçacıklar
  for (var p = this.parcaciklar.length - 1; p >= 0; p--) {
    var pt = this.parcaciklar[p];
    pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vy += 300 * dt; pt.omur -= dt;
    if (pt.omur <= 0) this.parcaciklar.splice(p, 1);
  }

  // düşme → checkpoint'e dön
  if (o.y > S.YUK + 90) {
    o.x = this.checkpoint.x; o.y = this.checkpoint.y; o.vx = 0; o.vy = 0;
    o.isik = Math.max(0, o.isik - 8);
    if (o.isik <= 0) { o.isik = 45; }
    this.dunya.mesaj('Işığını tazele, tekrar dene', 1.1);
  }
  // ışık biterse checkpoint'e dön
  if (o.isik <= 0) {
    o.x = this.checkpoint.x; o.y = this.checkpoint.y; o.vx = 0; o.vy = 0; o.isik = 45;
    this.dunya.mesaj('Işık söndü — checkpoint', 1.2);
  }

  // kamera
  var hedef = o.x + o.w / 2 - S.GEN * 0.4;
  this.kamera.x += (hedef - this.kamera.x) * Math.min(1, dt * 6);
  if (this.kamera.x < 0) this.kamera.x = 0;
  var maxCam = this.dunyaGen - S.GEN;
  if (this.kamera.x > maxCam) this.kamera.x = maxCam;

  // aktif soru (oyuncunun içinde bulunduğu, bitmemiş mekanik)
  this.aktifSoru = null; this.aktifIpucu = null;
  for (var a = 0; a < this.mekanikler.length; a++) {
    var mk = this.mekanikler[a];
    if (!mk.bitti && o.x + o.w > mk.x0 - 40 && o.x < mk.x1) { this.aktifSoru = mk.soru; this.aktifIpucu = mk.ipucu; break; }
  }

  // HUD zamanlayıcıları
  if (this.hatirlatmaT > 0) this.hatirlatmaT -= dt;
  if (this.mesajT > 0) this.mesajT -= dt;

  // bölüm bitişi (son ışık kapısı çözüldü + kapıdan geçildi)
  for (var b = 0; b < this.mekanikler.length; b++) {
    var mb = this.mekanikler[b];
    if (mb.bolumKapisi && mb.bitti && o.x > mb._kapi.x + 20) { this._bolumBitir(); break; }
  }
};

KM.Sahne.prototype._bolumBitir = function () {
  if (this.durum === 'bolumBitti') return;
  this.durum = 'bolumBitti';

  // skor = ilk denemede doğru karar oranı
  var toplam = 0, dogru = 0, hata = {};
  for (var i = 0; i < this.mekanikler.length; i++) {
    var r = this.mekanikler[i].sonuc();
    toplam += r.karar;
    if (r.dogru) dogru += r.karar;
    for (var k in r.hata) if (r.hata.hasOwnProperty(k)) hata[k] = (hata[k] || 0) + r.hata[k];
  }
  var skor = toplam ? Math.round(dogru / toplam * 100) : 100;
  var esik = (this.paket.meta && this.paket.meta.gecmeEsigi) || 70;
  var status = skor >= esik ? 'passed' : 'completed';
  this.sonSkor = skor; this.sonStatus = status; this.sonHata = hata;

  // SCORM raporla (LMS yoksa no-op)
  try {
    if (window.SCORM) {
      SCORM.setScore(skor, 100, 0);
      SCORM.setStatus(status);
      SCORM.set('cmi.core.lesson_location', 'b' + this.bolumIndex);
      var özet = JSON.stringify(hata);
      if (özet.length <= 4000) SCORM.set('cmi.suspend_data', özet);
    }
  } catch (e) {}

  // yerel kayıt (offline devam)
  try { KM.Kayit.bolumBitir(this.paket.meta.id, this.bolumIndex, skor, hata); } catch (e) {}

  if (this.onBolumBitti) this.onBolumBitti(skor, status);
};

KM.Sahne.prototype.ciz = function (ctx) {
  var S = this.S;
  KM.Ciz.arkaPlan(ctx, this.kamera, S);

  ctx.save();
  ctx.translate(-Math.round(this.kamera.x), -Math.round(this.kamera.y));

  // zemin + kutular
  for (var i = 0; i < this.platformlar.length; i++) {
    var p = this.platformlar[i];
    if (p.pasif) continue;
    if (p.tur === 'zemin' || p.tur === 'kutu') KM.Ciz.zemin(ctx, p);
  }
  // ışık taneleri
  for (var t = 0; t < this.jetonlar.length; t++) {
    var je = this.jetonlar[t];
    if (!je.alindi) KM.Ciz.jeton(ctx, je.x + 11, je.y + 11, je.deger);
  }
  // mekanikler
  for (var m = 0; m < this.mekanikler.length; m++) this.mekanikler[m].cizVer(ctx);
  // parçacıklar
  for (var pr = 0; pr < this.parcaciklar.length; pr++) {
    var pt = this.parcaciklar[pr];
    ctx.globalAlpha = Math.max(0, pt.omur / 0.6);
    ctx.fillStyle = pt.renk;
    ctx.beginPath(); ctx.arc(pt.x, pt.y, 3, 0, 6.29); ctx.fill();
  }
  ctx.globalAlpha = 1;
  // oyuncu
  this.oyuncu.ciz(ctx);

  ctx.restore();
};
