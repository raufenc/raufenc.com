/* ============================================================
   Kâşif Motoru — oyuncu.js
   KANDİL: elinde kandil taşıyan ilim çırağı.
   Can barı DEĞİL "ışık barı": doğru bilgiyle büyür, düşüş/yanlışta azalır.

   OYUN HİSSİ (çocuk-dostu, tutarlı):
   - Zıplama TAM yükseklik (değişken-yükseklik kırpması YOK → kısa dokunuş da tam zıplar).
   - Asimetrik yerçekimi: çıkışta hafif, inişte ağır → snappy, "ağırlıklı" his.
   - Apeks süzülme: zıplamanın tepesinde yerçekimi azalır → havada kısa asılı kalma.
   - Coyote-time + jump-buffer: kenardan düşünce/erken basınca affeder.
   - Squash & stretch: zıplarken uzar, inince ezilir.
   ============================================================ */
window.KM = window.KM || {};

KM.Oyuncu = function (x, y) {
  this.x = x; this.y = y;
  this.w = 28; this.h = 44;
  this.vx = 0; this.vy = 0;
  this.yerde = false;
  this.yon = 1;
  this.hiz = 280;            // yatay hız px/s
  this.ziplaV = 900;        // TAM zıplama ilk hızı (tutarlı)
  this.coyote = 0;
  this.animFaz = 0;
  this.isik = 100;
  this.parlama = 0;
  this.ezil = 0;            // iniş squash zamanlayıcı
  this.geril = 0;          // zıplama stretch zamanlayıcı
  this.kondu = false;      // bu karede sert iniş oldu mu (toz için)
};

// Ayar sabitleri (his buradan ayarlanır)
KM.Oyuncu.AYAR = {
  G_YUKSEL: 1950,   // çıkışta yerçekimi
  G_DUS:    2650,   // inişte yerçekimi (daha ağır = snappy)
  APEKS:    150,    // |vy| bunun altındayken tepede süzül
  APEKS_CARP: 0.55,
  COYOTE:   0.12
};

KM.Oyuncu.prototype.guncelle = function (dt, girdi, solids) {
  var A = KM.Oyuncu.AYAR;
  var oncekiYerde = this.yerde;
  var vOnce = this.vy;

  // --- yatay (snappy: yerde hızlı, havada daha az kontrol) ---
  var yon = girdi.yon;
  if (yon !== 0) this.yon = yon;
  var hedefVx = yon * this.hiz;
  var oran = this.yerde ? (yon !== 0 ? dt * 24 : dt * 30) : dt * 12;
  this.vx += (hedefVx - this.vx) * Math.min(1, oran);
  if (Math.abs(this.vx) < 4) this.vx = 0;

  // --- coyote-time ---
  if (this.yerde) this.coyote = A.COYOTE;
  else if (this.coyote > 0) this.coyote -= dt;

  // --- zıpla (buffer + coyote) — TUTARLI tam yükseklik ---
  if (girdi.ziplaKuyruk > 0 && this.coyote > 0) {
    this.vy = -this.ziplaV;
    this.yerde = false;
    this.coyote = 0;
    this.geril = 0.12;
    girdi.kuyrukTemizle();
    if (KM.Ses) KM.Ses.zipla();
  }

  // --- yerçekimi (asimetrik + apeks süzülme) ---
  var g = this.vy < 0 ? A.G_YUKSEL : A.G_DUS;
  if (!this.yerde && Math.abs(this.vy) < A.APEKS) g *= A.APEKS_CARP;
  this.vy += g * dt;

  // --- fizik (çarpışma + entegrasyon) ---
  KM.Fizik.hareketEt(this, solids, dt);

  // --- iniş squash + toz bayrağı ---
  this.kondu = false;
  if (!oncekiYerde && this.yerde && vOnce > 340) {
    this.ezil = 0.14;
    this.kondu = true;
  }

  // --- animasyon / sayaçlar ---
  if (this.yerde && Math.abs(this.vx) > 20) this.animFaz += dt * Math.abs(this.vx) * 0.033;
  else this.animFaz += dt * 2.2;
  if (this.parlama > 0) this.parlama -= dt;
  if (this.ezil > 0) this.ezil -= dt;
  if (this.geril > 0) this.geril -= dt;
  this.isik = Math.max(0, Math.min(100, this.isik));
};

KM.Oyuncu.prototype.alevOlcek = function () {
  return 0.5 + (this.isik / 100) * 0.9 + (this.parlama > 0 ? 0.3 : 0);
};

// Dünya koordinatlarında çizim (ctx zaten kameraya göre ötelenmiş)
KM.Oyuncu.prototype.ciz = function (ctx) {
  var x = this.x, y = this.y, w = this.w, h = this.h;
  var cx = x + w / 2;
  var bob = this.yerde ? Math.sin(this.animFaz) * 2 : -1;
  var bacak = this.yerde ? Math.sin(this.animFaz) * 4 : 3;
  var yatik = this.yon;

  // --- kandil ışığı (squash'tan etkilenmez) ---
  var alev = this.alevOlcek();
  var lampX = cx + yatik * 15;
  var lampY = y + 20;
  var glowR = 46 * alev;
  var grad = ctx.createRadialGradient(lampX, lampY, 2, lampX, lampY, glowR);
  grad.addColorStop(0, 'rgba(232,176,74,0.55)');
  grad.addColorStop(0.4, 'rgba(232,176,74,0.22)');
  grad.addColorStop(1, 'rgba(232,176,74,0)');
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.arc(lampX, lampY, glowR, 0, Math.PI * 2); ctx.fill();

  // --- squash & stretch (ayak noktasından ölçekle) ---
  var sx = 1, sy = 1, t;
  if (this.ezil > 0) { t = this.ezil / 0.14; sx = 1 + 0.28 * t; sy = 1 - 0.22 * t; }
  else if (this.geril > 0) { t = this.geril / 0.12; sx = 1 - 0.16 * t; sy = 1 + 0.18 * t; }
  else if (!this.yerde) { var st = Math.max(-0.12, Math.min(0.14, this.vy / 3600)); sy = 1 + st; sx = 1 - st * 0.7; }

  ctx.save();
  var ayakY = y + h;
  ctx.translate(cx, ayakY); ctx.scale(sx, sy); ctx.translate(-cx, -ayakY);

  // --- bacaklar ---
  ctx.strokeStyle = '#3a2c1a'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 4, y + h - 8 + bob); ctx.lineTo(cx - 4 - bacak, y + h + bob);
  ctx.moveTo(cx + 4, y + h - 8 + bob); ctx.lineTo(cx + 4 + bacak, y + h + bob);
  ctx.stroke();

  // --- kaftan/gövde (yelek) ---
  ctx.fillStyle = '#8a5a2b';
  ctx.beginPath();
  ctx.moveTo(cx - 9, y + 18 + bob); ctx.lineTo(cx + 9, y + 18 + bob);
  ctx.lineTo(cx + 11, y + h - 8 + bob); ctx.lineTo(cx - 11, y + h - 8 + bob);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e9d3a6';
  ctx.beginPath();
  ctx.moveTo(cx - 4, y + 18 + bob); ctx.lineTo(cx + 4, y + 18 + bob);
  ctx.lineTo(cx + 5, y + h - 9 + bob); ctx.lineTo(cx - 5, y + h - 9 + bob);
  ctx.closePath(); ctx.fill();

  // --- kol (kandili tutan) ---
  ctx.strokeStyle = '#c8a46e'; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(cx + yatik * 4, y + 22 + bob); ctx.lineTo(lampX, lampY - 3 + bob); ctx.stroke();

  // --- baş + keçe külah ---
  var hy = y + 10 + bob;
  ctx.fillStyle = '#f0d9b5';
  ctx.beginPath(); ctx.arc(cx, hy, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#7a4f22';
  ctx.beginPath(); ctx.moveTo(cx - 8, hy - 3); ctx.lineTo(cx + 8, hy - 3); ctx.lineTo(cx + yatik * 3, hy - 14); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#c8a46e'; ctx.fillRect(cx - 8, hy - 4, 16, 3);

  // --- kandil + alev ---
  ctx.fillStyle = '#b8860b';
  ctx.beginPath(); ctx.ellipse(lampX, lampY, 5, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#6b4a12'; ctx.fillRect(lampX - 5, lampY + 2, 10, 2);
  var aH = 9 * alev;
  var alevGrad = ctx.createLinearGradient(lampX, lampY - aH, lampX, lampY);
  alevGrad.addColorStop(0, '#fff3c4'); alevGrad.addColorStop(0.5, '#f5b942'); alevGrad.addColorStop(1, '#e8730f');
  ctx.fillStyle = alevGrad;
  ctx.beginPath();
  ctx.moveTo(lampX, lampY - 3 - aH);
  ctx.quadraticCurveTo(lampX + 4, lampY - 3 - aH * 0.4, lampX, lampY - 2);
  ctx.quadraticCurveTo(lampX - 4, lampY - 3 - aH * 0.4, lampX, lampY - 3 - aH);
  ctx.fill();

  ctx.restore();
};
