// UI — menü, modaller, ekran geçişleri
(function (global) {
  'use strict';

  const UI = {};

  function el(id) { return document.getElementById(id); }

  function show(id) {
    const e = el(id);
    if (e) e.style.display = '';
  }

  function hide(id) {
    const e = el(id);
    if (e) e.style.display = 'none';
  }

  UI.menuyeDon = function () {
    hide('oyun-ekrani');
    hide('sonuc-modal');
    show('menu-ekrani');
  };

  UI.sahneAc = function (sahneId) {
    hide('menu-ekrani');
    show('oyun-ekrani');
    Game.setMode('oyun');
    Game.sahneAc(sahneId);
    // Sahne başlığı
    const sahne = Data.SAHNELER[sahneId];
    const bas = el('sahne-baslik');
    if (bas) bas.textContent = sahne.ad + ' — ' + sahne.ar;
    // Modal başlığını gizle
    el('soru-sayac').style.display = 'none';
  };

  UI.sinavBaslat = function () {
    hide('menu-ekrani');
    show('oyun-ekrani');
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
    m.style.display = '';
  };

  UI.kelimeSesle = function () {
    if (Game.hedefKelime) {
      TTS.speakArabic(Game.hedefKelime.ar);
    }
  };

  UI.ipucu = function () {
    if (!Game.hedefKelime) return;
    // Hedefi 1 saniye yaylama ile öne çıkar
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
