/* ============================================================
   Mekanik: DOĞRU GEÇİT
   Sürekli zeminin üstünde 2-3 "levha platformu"; her birinde bir seçenek.
   Kapı (katı duvar) yolu kapatır; doğru levhaya zıplayınca kapı açılır.
   Yanlış levha → ışık azalır + hatırlatma; oyuncu düşmez, tekrar dener (affedici).
   Puan = İLK denemede doğru mu (sonuc()).
   Ortak sözleşme: {genislik, platformlar, guncelle, cizVer, sonuc}
   ============================================================ */
window.KM = window.KM || {};
KM.Mekanikler = KM.Mekanikler || {};

KM.Mekanikler.dogruGecit = function (veri, x0, S) {
  var zy = S.ZEMIN_UST;
  var W = 640;
  var secenekler = veri.secenekler || [];
  var dogruEtiket = '';
  var i;
  for (i = 0; i < secenekler.length; i++) if (secenekler[i].dogru) dogruEtiket = secenekler[i].etiket;

  var inst = {
    tip: 'dogruGecit', x0: x0, x1: x0 + W, genislik: W,
    soru: (veri.soru && veri.soru.metin) || 'Doğru olanı seç',
    ses: (veri.soru && veri.soru.ses) || null,
    ipucu: 'Doğru cevabın levhasına zıpla',
    bitti: false, ilkDeneme: true, dogruMu: null, kararSayisi: 1, hataKanon: {},
    platformlar: [], jetonlar: [],
    _lev: [], _kapi: null, _cozuldu: false, _girdi: false, _sonPlat: null
  };

  // sürekli zemin
  inst.platformlar.push({ x: x0, y: zy, w: W, h: S.ZEMIN_KAL, tur: 'zemin' });

  // cevap levhaları (üstten basılır) — alçak + geniş = kolay ulaşılır
  var n = secenekler.length;
  var pw = 132, py = zy - 82;
  var basla = x0 + 92, aralik = 162;
  for (i = 0; i < n; i++) {
    var p = { x: basla + i * aralik, y: py, w: pw, h: 16, tur: 'ustten',
              _sec: secenekler[i], _titre: 0, _kirmizi: 0, _yesil: 0 };
    inst._lev.push(p);
    inst.platformlar.push(p);
  }

  // kapı — çözülene kadar katı duvar
  inst._kapi = { x: x0 + W - 64, y: zy - 200, w: 26, h: 200, tur: 'duvar', pasif: false };
  inst.platformlar.push(inst._kapi);

  function ustundeMi(o, p) {
    return o.yerde &&
      o.x < p.x + p.w && o.x + o.w > p.x &&
      Math.abs((o.y + o.h) - p.y) < 11;
  }

  inst.guncelle = function (dt, o, dunya) {
    var j, p;
    for (j = 0; j < this._lev.length; j++) {
      p = this._lev[j];
      if (p._titre > 0) p._titre -= dt;
      if (p._kirmizi > 0) p._kirmizi -= dt;
      if (p._yesil > 0) p._yesil -= dt;
    }

    if (!this._girdi && o.x + o.w > this.x0 + 30) {
      this._girdi = true;
      if (this.ses) KM.Ses.calMp3(veri._kok ? veri._kok + this.ses : this.ses);
    }
    if (this._cozuldu) return;

    // hangi levhada duruyor?
    var duruyor = null;
    for (j = 0; j < this._lev.length; j++) if (ustundeMi(o, this._lev[j])) duruyor = this._lev[j];

    if (duruyor && duruyor !== this._sonPlat) {
      var sec = duruyor._sec;
      if (sec.dogru) {
        this._cozuldu = true; this.bitti = true;
        if (this.ilkDeneme) this.dogruMu = true;
        duruyor._yesil = 0.8;
        this._kapi.pasif = true;
        o.parlama = 0.7; o.isik = Math.min(100, o.isik + 8);
        KM.Ses.dogru();
        dunya.part(duruyor.x + duruyor.w / 2, duruyor.y, '#f5b942', 18);
        dunya.mesaj('Doğru! Kapı açıldı', 1.1);
      } else {
        if (this.ilkDeneme) { this.dogruMu = false; }
        this.ilkDeneme = false;
        var kid = sec.kanonId || 'bilinmeyen';
        this.hataKanon[kid] = (this.hataKanon[kid] || 0) + 1;
        duruyor._titre = 0.5; duruyor._kirmizi = 0.6;
        o.isik = Math.max(0, o.isik - 10);
        // yanlış → zemine geri in (aynı levhada bounce-tekrar tetiklenmesin)
        o.y = zy - o.h; o.vy = 0;
        o.x = Math.max(this.x0 + 12, o.x - 46);
        KM.Ses.yanlis();
        dunya.part(duruyor.x + duruyor.w / 2, duruyor.y, '#c4574a', 12);
        dunya.hatirlatma('Doğru cevap: ' + dogruEtiket);
      }
    }
    this._sonPlat = duruyor;
  };

  inst.cizVer = function (ctx) {
    // kapı
    KM.Ciz.kapi(ctx, this._kapi.x, this._kapi.y, this._kapi.w, this._kapi.h, this._cozuldu);
    // levhalar
    for (var j = 0; j < this._lev.length; j++) {
      var p = this._lev[j];
      var titre = p._titre > 0 ? (Math.sin(p._titre * 60) * 3) : 0;
      KM.Ciz.levha(ctx, p.x + titre, p.y, p.w, p.h, p._sec.etiket, {
        kirmizi: p._kirmizi > 0, yesil: p._yesil > 0
      });
    }
  };

  inst.sonuc = function () {
    return { dogru: this.dogruMu === true, karar: 1, hata: this.hataKanon };
  };

  return inst;
};
