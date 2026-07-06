/* ============================================================
   Kâşif Motoru — input.js
   Birleşik girdi: ekran butonları (mobil) + klavye (masaüstü test).
   Motor tarafına tek soyutlama sunar:
     KM.Girdi.yon      →  -1 (sol) / 0 / +1 (sağ)
     KM.Girdi.zipla    →  o an zıpla tuşu basılı mı (bool)
     KM.Girdi.ziplaKuyruk → zıpla-tamponu (jump buffer) sayacı (sn)
   Zıpla-tamponu ve coyote-time affediciliği oyuncu.js'te kullanılır.
   ============================================================ */
window.KM = window.KM || {};

KM.Girdi = (function () {
  "use strict";
  var st = {
    sol: false, sag: false,
    ziplaBasili: false,
    ziplaKuyruk: 0     // son ~140ms içinde zıpla basıldıysa > 0
  };

  var KUYRUK = 0.14;   // jump buffer süresi

  function ziplaBas() {
    if (!st.ziplaBasili) st.ziplaKuyruk = KUYRUK;
    st.ziplaBasili = true;
    if (KM.Ses) KM.Ses.init();   // ilk dokunuşta AudioContext'i uyandır
  }
  function ziplaBirak() { st.ziplaBasili = false; }

  // Ekran butonlarını bağla (index.html'deki .km-btn öğeleri)
  function baglaButonlar() {
    function tut(el, bas, birak) {
      if (!el) return;
      var enter = function (e) { e.preventDefault(); bas(); };
      var exit  = function (e) { if (e) e.preventDefault(); birak(); };
      el.addEventListener('touchstart', enter, { passive: false });
      el.addEventListener('touchend', exit, { passive: false });
      el.addEventListener('touchcancel', exit, { passive: false });
      el.addEventListener('mousedown', enter);
      el.addEventListener('mouseup', exit);
      el.addEventListener('mouseleave', function () { birak(); });
    }
    tut(document.getElementById('btn-sol'),
        function () { st.sol = true; }, function () { st.sol = false; });
    tut(document.getElementById('btn-sag'),
        function () { st.sag = true; }, function () { st.sag = false; });
    tut(document.getElementById('btn-zipla'), ziplaBas, ziplaBirak);
  }

  // Klavye (masaüstü test): ← → hareket, Space/↑/W zıpla
  function baglaKlavye() {
    document.addEventListener('keydown', function (e) {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') st.sol = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') st.sag = true;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault(); ziplaBas();
      }
    });
    document.addEventListener('keyup', function (e) {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') st.sol = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') st.sag = false;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') ziplaBirak();
    });
  }

  function baglat() { baglaButonlar(); baglaKlavye(); }

  // Her fizik adımında çağrılır: tamponu azalt
  function ilerle(dt) {
    if (st.ziplaKuyruk > 0) st.ziplaKuyruk -= dt;
  }

  return {
    baglat: baglat,
    ilerle: ilerle,
    get yon() { return (st.sag ? 1 : 0) - (st.sol ? 1 : 0); },
    get zipla() { return st.ziplaBasili; },
    get ziplaKuyruk() { return st.ziplaKuyruk; },
    kuyrukTemizle: function () { st.ziplaKuyruk = 0; }
  };
})();
