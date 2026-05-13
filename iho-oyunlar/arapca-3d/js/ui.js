// UI — menü, modaller, ekran geçişleri
(function (global) {
  'use strict';

  const UI = {};

  function el(id) { return document.getElementById(id); }

  // CSS'te #oyun-ekrani { display: none } olduğundan inline 'block', menü için
  // CSS'te .menu varsayılan flex → inline temizleyince geri gelir.
  function ekraniGoster() {
    const me = el('menu-ekrani');
    if (me) me.style.display = 'none';
    const o = el('oyun-ekrani');
    if (o) o.style.display = 'block';
    // Canvas, sayfa açılışında display:none altında 0x0 buffer'lı kaldı —
    // ekran görünür hale gelince yeniden ölçüp DPR'a göre buffer ayarla.
    if (Game.resize) Game.resize();
  }

  UI.menuyeDon = function () {
    const o = el('oyun-ekrani');
    if (o) o.style.display = 'none';
    const m = el('sonuc-modal');
    if (m) m.style.display = 'none';
    const me = el('menu-ekrani');
    if (me) me.style.display = ''; // CSS varsayılan = flex
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  };

  UI.sahneAc = function (sahneId) {
    ekraniGoster();
    Game.setMode('oyun');
    Game.sahneAc(sahneId);
    const sahne = Data.SAHNELER[sahneId];
    const bas = el('sahne-baslik');
    if (bas) bas.textContent = sahne.ad + ' — ' + sahne.ar;
    const ss = el('soru-sayac');
    if (ss) ss.style.display = 'none';
  };

  UI.sinavBaslat = function () {
    ekraniGoster();
    const bas = el('sahne-baslik');
    if (bas) bas.textContent = 'Sınav Modu — الاِخْتِبَار';
    Game.sinavBaslat();
  };

  UI.sinavSonucGoster = function (dogru, toplam, yuzde) {
    const m = el('sonuc-modal');
    if (!m) return;
    el('sonuc-yuzde').textContent = yuzde;
    el('sonuc-dogru').textContent = dogru;
    el('sonuc-toplam').textContent = toplam;
    el('sonuc-mesaj').textContent =
      yuzde >= 90 ? 'Harika! Çok iyi biliyorsun! ✨' :
      yuzde >= 70 ? 'Aferin! Çok güzel bir performans.' :
      yuzde >= 50 ? 'Güzel başlangıç, tekrar denersen daha iyi olur.' :
      'Endişelenme, biraz daha alıştırma yap.';
    m.style.display = 'flex';
  };

  UI.kelimeSesle = function () {
    if (Game.hedefKelime) {
      TTS.speakArabic(Game.hedefKelime.ar);
    }
  };

  UI.ipucu = function () {
    if (!Game.hedefKelime) return;
    for (const n of Game.nesneler) {
      if (n.kelime.id === Game.hedefKelime.id) {
        n.anim.zip = 1;
        n.anim.vurgu = 'rgba(255, 215, 0, 0.8)';
        n.anim.baslangic = performance.now();
        break;
      }
    }
  };

  global.UI = UI;
})(window);
