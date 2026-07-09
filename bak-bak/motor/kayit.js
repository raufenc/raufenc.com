/* ============================================================
   Bak Bak — kayıt (localStorage). En iyi süre + yıldız + oynama sayısı.
   Depolama yoksa sessizce boş döner.
   ============================================================ */
window.BB = window.BB || {};
BB.Kayit = (function () {
  "use strict";
  function anahtar(id) { return "bakbak:" + id; }

  function oku(id) {
    try { return JSON.parse(localStorage.getItem(anahtar(id))) || {}; }
    catch (e) { return {}; }
  }
  function yaz(id, veri) {
    try { localStorage.setItem(anahtar(id), JSON.stringify(veri)); } catch (e) {}
  }
  function enIyiKaydet(id, sureMs, yildiz) {
    var v = oku(id);
    if (v.enIyiSure == null || sureMs < v.enIyiSure) v.enIyiSure = Math.round(sureMs);
    if (v.enIyiYildiz == null || yildiz > v.enIyiYildiz) v.enIyiYildiz = yildiz;
    v.oynama = (v.oynama || 0) + 1;
    yaz(id, v);
    return v;
  }
  return { oku: oku, yaz: yaz, enIyiKaydet: enIyiKaydet };
})();
