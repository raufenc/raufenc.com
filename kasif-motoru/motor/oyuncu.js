/* ============================================================
   Kâşif Motoru — oyuncu.js
   KANDİL: elinde kandil taşıyan ilim çırağı.
   Can barı DEĞİL "ışık barı": doğru bilgiyle büyür, düşüş/yanlışta azalır.
   Tek "oyuncu" sınıfı; kahraman kimliği içerikte seçilir (şimdilik prosedürel çizim).
   Coyote-time + jump-buffer ile çocuk-dostu affedici zıplama.
   ============================================================ */
window.KM = window.KM || {};

KM.Oyuncu = function (x, y) {
  this.x = x; this.y = y;
  this.w = 28; this.h = 44;
  this.vx = 0; this.vy = 0;
  this.yerde = false;
  this.yon = 1;              // baktığı yön (1 sağ / -1 sol)
  this.hiz = 250;           // yatay hız px/s
  this.ziplaV = 820;        // zıplama ilk hızı
  this.coyote = 0;          // platform kenarından düştükten sonra hâlâ zıplayabilme
  this.animFaz = 0;         // koşu animasyonu fazı
  this.isik = 100;          // ışık barı (0-100)
  this.parlama = 0;         // doğru cevapta kısa altın parıltı
};

KM.Oyuncu.prototype.guncelle = function (dt, girdi, solids) {
  var COYOTE = 0.10;

  // --- yatay ---
  var yon = girdi.yon;
  if (yon !== 0) { this.yon = yon; }
  // hedefe doğru yumuşak ivme (kaygan değil, ama ani de değil)
  var hedefVx = yon * this.hiz;
  this.vx += (hedefVx - this.vx) * Math.min(1, dt * 18);

  // --- zıplama (coyote + buffer) ---
  if (this.yerde) this.coyote = COYOTE;
  else if (this.coyote > 0) this.coyote -= dt;

  if (girdi.ziplaKuyruk > 0 && this.coyote > 0) {
    this.vy = -this.ziplaV;
    this.yerde = false;
    this.coyote = 0;
    girdi.kuyrukTemizle();
    if (KM.Ses) KM.Ses.zipla();
  }
  // zıpla tuşu erken bırakılırsa kısa zıplama (değişken yükseklik)
  if (!girdi.zipla && this.vy < -300) this.vy = -300;

  // --- fizik ---
  KM.Fizik.hareketEt(this, solids, dt);

  // --- animasyon / parıltı ---
  if (this.yerde && Math.abs(this.vx) > 20) this.animFaz += dt * Math.abs(this.vx) * 0.03;
  else this.animFaz += dt * 2;
  if (this.parlama > 0) this.parlama -= dt;
  if (this.isik > 100) this.isik = 100;
  if (this.isik < 0) this.isik = 0;
};

// Işık barı 0-100 → alev boyutu 0.5-1.4
KM.Oyuncu.prototype.alevOlcek = function () {
  return 0.5 + (this.isik / 100) * 0.9 + (this.parlama > 0 ? 0.3 : 0);
};

// Dünya koordinatlarında çizim (ctx zaten kameraya göre ötelenmiş çağrılır)
KM.Oyuncu.prototype.ciz = function (ctx) {
  var x = this.x, y = this.y, w = this.w, h = this.h;
  var cx = x + w / 2;
  var bob = this.yerde ? Math.sin(this.animFaz) * 2 : -1;   // koşarken hafif zıplama
  var bacak = this.yerde ? Math.sin(this.animFaz) * 4 : 3;
  var yatik = this.yon;

  ctx.save();

  // --- kandil ışığı (radyal parıltı) ---
  var alev = this.alevOlcek();
  var lampX = cx + yatik * 15;
  var lampY = y + 20;
  var glowR = 46 * alev;
  var grad = ctx.createRadialGradient(lampX, lampY, 2, lampX, lampY, glowR);
  grad.addColorStop(0, 'rgba(232,176,74,0.55)');
  grad.addColorStop(0.4, 'rgba(232,176,74,0.22)');
  grad.addColorStop(1, 'rgba(232,176,74,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(lampX, lampY, glowR, 0, Math.PI * 2);
  ctx.fill();

  // --- bacaklar ---
  ctx.strokeStyle = '#3a2c1a';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 4, y + h - 8 + bob);
  ctx.lineTo(cx - 4 - bacak, y + h + bob);
  ctx.moveTo(cx + 4, y + h - 8 + bob);
  ctx.lineTo(cx + 4 + bacak, y + h + bob);
  ctx.stroke();

  // --- kaftan/gövde (yelek) ---
  ctx.fillStyle = '#8a5a2b';
  ctx.beginPath();
  ctx.moveTo(cx - 9, y + 18 + bob);
  ctx.lineTo(cx + 9, y + 18 + bob);
  ctx.lineTo(cx + 11, y + h - 8 + bob);
  ctx.lineTo(cx - 11, y + h - 8 + bob);
  ctx.closePath();
  ctx.fill();
  // iç tunik (krem)
  ctx.fillStyle = '#e9d3a6';
  ctx.beginPath();
  ctx.moveTo(cx - 4, y + 18 + bob);
  ctx.lineTo(cx + 4, y + 18 + bob);
  ctx.lineTo(cx + 5, y + h - 9 + bob);
  ctx.lineTo(cx - 5, y + h - 9 + bob);
  ctx.closePath();
  ctx.fill();

  // --- kol (kandili tutan) ---
  ctx.strokeStyle = '#c8a46e';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(cx + yatik * 4, y + 22 + bob);
  ctx.lineTo(lampX, lampY - 3 + bob);
  ctx.stroke();

  // --- baş + keçe külah ---
  var hy = y + 10 + bob;
  ctx.fillStyle = '#f0d9b5';                 // ten
  ctx.beginPath();
  ctx.arc(cx, hy, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#7a4f22';                 // külah
  ctx.beginPath();
  ctx.moveTo(cx - 8, hy - 3);
  ctx.lineTo(cx + 8, hy - 3);
  ctx.lineTo(cx + yatik * 3, hy - 14);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#c8a46e';
  ctx.fillRect(cx - 8, hy - 4, 16, 3);       // külah bandı

  // --- kandil + alev ---
  ctx.fillStyle = '#b8860b';
  ctx.beginPath();
  ctx.ellipse(lampX, lampY, 5, 4, 0, 0, Math.PI * 2);   // kandil gövdesi
  ctx.fill();
  ctx.fillStyle = '#6b4a12';
  ctx.fillRect(lampX - 5, lampY + 2, 10, 2);
  // alev
  var aH = 9 * alev;
  var alevGrad = ctx.createLinearGradient(lampX, lampY - aH, lampX, lampY);
  alevGrad.addColorStop(0, '#fff3c4');
  alevGrad.addColorStop(0.5, '#f5b942');
  alevGrad.addColorStop(1, '#e8730f');
  ctx.fillStyle = alevGrad;
  ctx.beginPath();
  ctx.moveTo(lampX, lampY - 3 - aH);
  ctx.quadraticCurveTo(lampX + 4, lampY - 3 - aH * 0.4, lampX, lampY - 2);
  ctx.quadraticCurveTo(lampX - 4, lampY - 3 - aH * 0.4, lampX, lampY - 3 - aH);
  ctx.fill();

  ctx.restore();
};
