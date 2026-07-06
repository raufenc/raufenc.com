/* ============================================================
   Mekanik: IŞIK KAPISI  (bölüm kilidi / checkpoint)
   Kilitli kapının önünde dönen fenerler; her fenerde bir cevap.
   Doğru fenere zıplayıp KANDİL'in aleviyle "yak" → kapı açılır, bölüm biter.
   Yanlış fener → duman + ışık azalır, tekrar dene. Puan = ilk deneme doğru mu.
   Ortak sözleşme: {genislik, platformlar, guncelle, cizVer, sonuc, bolumKapisi:true}
   ============================================================ */
window.KM = window.KM || {};
KM.Mekanikler = KM.Mekanikler || {};

KM.Mekanikler.isikKapisi = function (veri, x0, S) {
  var zy = S.ZEMIN_UST;
  var fenerler = veri.fenerler || [];
  var n = fenerler.length;
  var W = 170 + n * 152 + 150;
  var dogruEtiket = '';
  for (var q = 0; q < fenerler.length; q++) if (fenerler[q].dogru) dogruEtiket = fenerler[q].etiket;

  var inst = {
    tip: 'isikKapisi', x0: x0, x1: x0 + W, genislik: W, bolumKapisi: true,
    soru: (veri.soru && veri.soru.metin) || 'Doğru feneri yak',
    ses: (veri.soru && veri.soru.ses) || null,
    ipucu: 'Doğru fenere zıpla, kapı açılsın',
    bitti: false, ilkDeneme: true, dogruMu: null, kararSayisi: 1, hataKanon: {},
    platformlar: [], jetonlar: [],
    _fen: [], _kapi: null, _cozuldu: false, _girdi: false, _t: 0
  };

  inst.platformlar.push({ x: x0, y: zy, w: W, h: S.ZEMIN_KAL, tur: 'zemin' });

  for (var i = 0; i < n; i++) {
    var cx = x0 + 170 + i * 152;
    var cy = zy - 152;
    inst._fen.push({
      cx: cx, cy: cy, _sec: fenerler[i], _yanik: false, _puf: 0, _dokunuyor: false,
      hit: { x: cx - 36, y: cy - 40, w: 72, h: 84 }
    });
  }

  inst._kapi = { x: x0 + W - 60, y: zy - 210, w: 28, h: 210, tur: 'duvar', pasif: false };
  inst.platformlar.push(inst._kapi);

  inst.guncelle = function (dt, o, dunya) {
    this._t += dt;
    for (var f = 0; f < this._fen.length; f++) if (this._fen[f]._puf > 0) this._fen[f]._puf -= dt;

    if (!this._girdi && o.x + o.w > this.x0 + 40) {
      this._girdi = true;
      if (this.ses) KM.Ses.calMp3(veri._kok ? veri._kok + this.ses : this.ses);
    }
    if (this._cozuldu) return;

    for (var k = 0; k < this._fen.length; k++) {
      var fe = this._fen[k];
      var dokun = KM.Fizik.aabb(o, fe.hit);
      if (dokun && !fe._dokunuyor) {
        // taze temas
        if (fe._sec.dogru) {
          fe._yanik = true;
          this._cozuldu = true; this.bitti = true;
          if (this.ilkDeneme) this.dogruMu = true;
          this._kapi.pasif = true;
          o.parlama = 1.0; o.isik = Math.min(100, o.isik + 12);
          KM.Ses.kapi();
          dunya.part(fe.cx, fe.cy, '#f5b942', 26);
          dunya.checkpoint(this._kapi.x + 40, zy - 46);
          dunya.mesaj('Kapı açıldı!', 1.3);
        } else {
          if (this.ilkDeneme) this.dogruMu = false;
          this.ilkDeneme = false;
          var kid = fe._sec.kanonId || 'fener';
          this.hataKanon[kid] = (this.hataKanon[kid] || 0) + 1;
          fe._puf = 0.6;
          o.isik = Math.max(0, o.isik - 12);
          KM.Ses.yanlis();
          dunya.part(fe.cx, fe.cy, '#5a5a6a', 12);
          dunya.hatirlatma('Doğru cevap: ' + dogruEtiket);
        }
      }
      fe._dokunuyor = dokun;
    }
  };

  inst.cizVer = function (ctx) {
    KM.Ciz.kapi(ctx, this._kapi.x, this._kapi.y, this._kapi.w, this._kapi.h, this._cozuldu);
    for (var f = 0; f < this._fen.length; f++) {
      var fe = this._fen[f];
      var salinim = Math.sin(this._t * 2 + f) * 4;
      KM.Ciz.fener(ctx, fe.cx + salinim, fe.cy, fe._sec.etiket, {
        yanik: fe._yanik, puf: fe._puf > 0
      });
    }
  };

  inst.sonuc = function () {
    return { dogru: this.dogruMu === true, karar: 1, hata: this.hataKanon };
  };

  return inst;
};
