/* ============================================================
   Kâşif Motoru — physics.js
   Basit ama çocuk-dostu 2D platformer fiziği.
   - AABB (eksene hizalı kutu) çarpışma
   - Yerçekimi + alt-adımlı (substep) düşüş → tünelleme (platformdan geçme) engeli
   - Katı platform: her yönden bloklar.  "ustten" platform: yalnızca üstten basılır (tek yönlü).
   Kütüphane YOK — ~120 satır, npm gerektirmez.
   ============================================================ */
window.KM = window.KM || {};

KM.Fizik = (function () {
  "use strict";
  var YERCEKIMI = 2200;   // px/s^2
  var MAX_DUSME = 1500;   // uç hız

  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // o: {x,y,w,h,vx,vy}  solids: [{x,y,w,h,tur?,pasif?,onLand?}]
  // tur === 'ustten' → tek yönlü (aşağıdan geçilir, üstüne basılır)
  function hareketEt(o, solids, dt) {
    o.yerde = false;
    var i, s;

    // ---- X ekseni ----
    o.x += o.vx * dt;
    for (i = 0; i < solids.length; i++) {
      s = solids[i];
      if (s.pasif || s.tur === 'ustten') continue;   // tek yönlü platform yatayda bloklamaz
      if (aabb(o, s)) {
        if (o.vx > 0) o.x = s.x - o.w;
        else if (o.vx < 0) o.x = s.x + s.w;
        o.vx = 0;
      }
    }

    // ---- Y ekseni (alt-adımlı: hızlı düşüşte tünellemeyi önler) ----
    o.vy += YERCEKIMI * dt;
    if (o.vy > MAX_DUSME) o.vy = MAX_DUSME;
    var dy = o.vy * dt;
    var adim = Math.max(1, Math.ceil(Math.abs(dy) / 8));
    var par = dy / adim;

    for (var k = 0; k < adim; k++) {
      var oncekiAlt = o.y + o.h;   // adımdan önceki ayak hizası
      o.y += par;
      for (i = 0; i < solids.length; i++) {
        s = solids[i];
        if (s.pasif) continue;
        if (!aabb(o, s)) continue;

        if (par > 0) {
          // Düşüyor → üstüne kon. Tek yönlü platformda: ayak önceden üstteyse kon.
          if (s.tur === 'ustten' && oncekiAlt > s.y + 2) continue;
          o.y = s.y - o.h;
          o.vy = 0;
          o.yerde = true;
          if (typeof s.onLand === 'function') s.onLand(o, s);
        } else if (par < 0) {
          // Yükseliyor → kafa çarpması (tek yönlüde geç)
          if (s.tur === 'ustten') continue;
          o.y = s.y + s.h;
          o.vy = 0;
        }
      }
    }
  }

  return { aabb: aabb, hareketEt: hareketEt, YERCEKIMI: YERCEKIMI };
})();
