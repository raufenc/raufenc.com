/* ============================================================
   Mekanik: KELİME KÖPRÜSÜ
   Uçurumun karşısına, harf/hece taşlarına DOĞRU SIRAYLA basarak geç.
   Her sütunda bir doğru taş + bir çeldirici; doğru taşlar kelimeyi yazar.
   Yanlış taş → taş düşer, oyuncu geri döner (affedici), sıra sıfırlanır.
   Puan = hiç hata yapmadan (ilk deneme) tamamladı mı.
   Ortak sözleşme: {genislik, platformlar, guncelle, cizVer, sonuc}
   ============================================================ */
window.KM = window.KM || {};
KM.Mekanikler = KM.Mekanikler || {};

KM.Mekanikler.kelimeKopru = function (veri, x0, S) {
  var zy = S.ZEMIN_UST;
  var taslar = veri.taslar || [];
  var celel = veri.celeldirici || [];
  var K = taslar.length;
  var APPR = 190, KOLON = 132, FAR = 150;
  var W = APPR + K * KOLON + FAR;

  var hedefKelime = (veri.hedef && veri.hedef.kelime) || '';
  var kanon = veri.kanonId || 'kopru';

  var inst = {
    tip: 'kelimeKopru', x0: x0, x1: x0 + W, genislik: W,
    soru: 'Köprüyü doğru sırayla kur: ' + hedefKelime,
    ipucu: 'Harfleri soldan sağa doğru sırayla bas',
    bitti: false, ilkDeneme: true, dogruMu: null, kararSayisi: 1, hataKanon: {},
    platformlar: [], jetonlar: [],
    _tas: [], _sira: 0, _sonTas: null, _appX: x0 + 40, _appY: zy - 46, _cozuldu: false
  };

  // yaklaşma zemini + karşı zemin (aradaki boşluk = uçurum)
  inst.platformlar.push({ x: x0, y: zy, w: APPR, h: S.ZEMIN_KAL, tur: 'zemin' });
  inst.platformlar.push({ x: x0 + APPR + K * KOLON, y: zy, w: FAR, h: S.ZEMIN_KAL, tur: 'zemin' });

  // sütunlar: her sütunda doğru taş + çeldirici (yükseklikleri değişir → okumaya zorlar)
  var yAlt = zy - 66, yUst = zy - 138;
  for (var j = 0; j < K; j++) {
    var cx = x0 + APPR + 66 + j * KOLON;
    var dogruUstte = (j % 2 === 1);
    var yD = dogruUstte ? yUst : yAlt;
    var yC = dogruUstte ? yAlt : yUst;
    var dogruTas = { x: cx - 34, y: yD, w: 68, h: 15, tur: 'ustten',
                     _harf: taslar[j], _dogru: true, _kolon: j, _yanik: false, _dus: 0, pasif: false };
    inst._tas.push(dogruTas); inst.platformlar.push(dogruTas);
    if (celel.length) {
      var cTas = { x: cx - 34, y: yC, w: 68, h: 15, tur: 'ustten',
                   _harf: celel[j % celel.length], _dogru: false, _kolon: j, _yanik: false, _dus: 0, pasif: false };
      inst._tas.push(cTas); inst.platformlar.push(cTas);
    }
  }

  function ustundeMi(o, p) {
    return o.yerde && !p.pasif &&
      o.x < p.x + p.w && o.x + o.w > p.x &&
      Math.abs((o.y + o.h) - p.y) < 8;
  }

  function sifirla() {
    inst._sira = 0;
    for (var t = 0; t < inst._tas.length; t++) {
      inst._tas[t]._yanik = false;
      inst._tas[t].pasif = false;
      inst._tas[t]._dus = 0;
    }
  }

  inst.guncelle = function (dt, o, dunya) {
    // düşen taş animasyonu
    for (var t = 0; t < this._tas.length; t++) {
      if (this._tas[t]._dus > 0) { this._tas[t]._dus -= dt; }
    }
    if (this._cozuldu) return;

    var duruyor = null, k;
    for (k = 0; k < this._tas.length; k++) if (ustundeMi(o, this._tas[k])) duruyor = this._tas[k];

    if (duruyor && duruyor !== this._sonTas) {
      if (duruyor._dogru && duruyor._kolon === this._sira) {
        duruyor._yanik = true;
        this._sira++;
        o.parlama = 0.4; o.isik = Math.min(100, o.isik + 3);
        KM.Ses.jeton();
        dunya.part(duruyor.x + duruyor.w / 2, duruyor.y, '#f5b942', 8);
        if (this._sira >= K) {
          this._cozuldu = true; this.bitti = true;
          if (this.ilkDeneme) this.dogruMu = true;
          KM.Ses.kapi(); o.parlama = 0.8;
          dunya.mesaj('Köprü tamam: ' + hedefKelime, 1.4);
          if (veri.hedef && veri.hedef.ses) KM.Ses.calMp3(veri._kok ? veri._kok + veri.hedef.ses : veri.hedef.ses);
        }
      } else {
        if (this.ilkDeneme) this.dogruMu = false;
        this.ilkDeneme = false;
        this.hataKanon[kanon] = (this.hataKanon[kanon] || 0) + 1;
        duruyor.pasif = true; duruyor._dus = 0.5;
        o.isik = Math.max(0, o.isik - 10);
        KM.Ses.yanlis(); KM.Ses.dus();
        dunya.part(duruyor.x + duruyor.w / 2, duruyor.y, '#c4574a', 10);
        dunya.hatirlatma('Doğru sıra: ' + taslar.join(' '));
        dunya.respawn(this._appX, this._appY);
        sifirla();
      }
    }
    this._sonTas = duruyor;
  };

  inst.cizVer = function (ctx) {
    for (var t = 0; t < this._tas.length; t++) {
      var s = this._tas[t];
      var dy = s._dus > 0 ? (0.5 - s._dus) * 240 : 0;
      KM.Ciz.tas(ctx, s.x, s.y + dy, s.w, s.h, s._harf, { yanik: s._yanik, dusuyor: s._dus > 0 });
    }
  };

  inst.sonuc = function () {
    return { dogru: this.dogruMu === true, karar: 1, hata: this.hataKanon };
  };

  return inst;
};
