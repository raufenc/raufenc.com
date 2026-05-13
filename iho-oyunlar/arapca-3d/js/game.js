// Ana oyun motoru — sahneler arası geçiş, çizim döngüsü, etkileşim
(function (global) {
  'use strict';

  const Game = {
    canvas: null,
    ctx: null,
    dpr: 1,
    width: 0,
    height: 0,
    cameraX: 0,
    cameraY: 0,
    cameraZoom: 1,
    nesneler: [],         // {kelime, model, voxels, bounds, ekranX, ekranY, anim:{ ... }}
    aktifSahne: null,     // 'manav' | 'araclar' | 'hayvanlar' | 'sinav'
    hedefKelime: null,    // şu an aranan kelime
    skor: 0,
    toplamSoru: 0,
    dogruSayisi: 0,
    yanlisSayisi: 0,
    kalanSorular: [],
    modu: 'oyun',         // 'oyun' (sınırsız) | 'sinav' (10 soru)
    feedback: null,        // { tip, sure, baslangic }
    floatingTexts: [],    // ekranda yüzen ses dalgaları/yıldızlar
    bulutlar: [],
    son: 0
  };

  function resize() {
    const c = Game.canvas;
    if (!c) return;
    const cssW = c.clientWidth || window.innerWidth;
    const cssH = c.clientHeight || window.innerHeight;
    Game.dpr = window.devicePixelRatio || 1;
    c.width = cssW * Game.dpr;
    c.height = cssH * Game.dpr;
    Game.width = cssW;
    Game.height = cssH;
    Game.ctx.setTransform(Game.dpr, 0, 0, Game.dpr, 0, 0);

    // Mobilde daha fazla zoom-out
    Game.cameraZoom = cssW < 700 ? 0.7 : 1;
  }

  // Sahne kur
  function sahneAc(sahneId) {
    Game.aktifSahne = sahneId;
    Game.feedback = null;
    Game.floatingTexts = [];

    const sahne = Data.SAHNELER[sahneId];
    if (!sahne) return;

    const yapi = Scenes.olustur(sahneId, sahne.kelimeler);
    Game.nesneler = [];

    for (const slot of yapi.yerlesim) {
      const kelime = Data.KELIMELER[slot.kelimeId];
      if (!kelime || !Models[kelime.model]) continue;
      const voxels = Models[kelime.model]();
      Game.nesneler.push({
        kelime,
        voxels,
        gridX: slot.gridX,
        gridZ: slot.gridZ,
        scale: slot.scale || 1,
        anim: { zip: 0, vurgu: null, baslangic: 0 }
      });
    }

    Game.arkaplan = yapi.arkaplan;
    Game.bulutlar = bulutOlustur();

    rasgeleHedef();
    updateHUD();
  }

  // Sınav modunu başlat
  function sinavBaslat() {
    Game.modu = 'sinav';
    Game.skor = 0;
    Game.dogruSayisi = 0;
    Game.yanlisSayisi = 0;

    // Tüm sahnelerden 10 rastgele kelime
    const havuz = [];
    for (const sid of Object.keys(Data.SAHNELER)) {
      for (const kid of Data.SAHNELER[sid].kelimeler) {
        havuz.push({ kid, sid });
      }
    }
    karistir(havuz);
    Game.kalanSorular = havuz.slice(0, 10);
    Game.toplamSoru = Game.kalanSorular.length;

    sonrakiSoru();
  }

  // Klasik sahne oyunu (sınırsız mod) — bir kelime ipucusu göster, doğru gelene kadar
  function rasgeleHedef() {
    if (!Game.nesneler.length) return;
    const i = Math.floor(Math.random() * Game.nesneler.length);
    Game.hedefKelime = Game.nesneler[i].kelime;
    ipucuGoster();
  }

  function ipucuGoster() {
    if (!Game.hedefKelime) return;
    const k = Game.hedefKelime;
    const ipucuEl = document.getElementById('ipucu-arapca');
    const trEl = document.getElementById('ipucu-translit');
    if (ipucuEl) ipucuEl.textContent = k.ar;
    if (trEl) trEl.textContent = '(' + k.translit + ')';
    // Otomatik sesli okuma
    setTimeout(() => TTS.speakArabic(k.ar), 300);
  }

  function sonrakiSoru() {
    if (!Game.kalanSorular.length) {
      sinavBitir();
      return;
    }
    const next = Game.kalanSorular.shift();
    const kelime = Data.KELIMELER[next.kid];
    const sahneId = next.sid;
    Game.hedefKelime = kelime;

    // Sahneyi yükle ama sınav modunda
    Game.aktifSahne = sahneId;
    const sahne = Data.SAHNELER[sahneId];
    const yapi = Scenes.olustur(sahneId, sahne.kelimeler);
    Game.nesneler = [];
    for (const slot of yapi.yerlesim) {
      const k = Data.KELIMELER[slot.kelimeId];
      if (!k || !Models[k.model]) continue;
      Game.nesneler.push({
        kelime: k,
        voxels: Models[k.model](),
        gridX: slot.gridX,
        gridZ: slot.gridZ,
        scale: slot.scale || 1,
        anim: { zip: 0, vurgu: null, baslangic: 0 }
      });
    }
    Game.arkaplan = yapi.arkaplan;
    Game.bulutlar = bulutOlustur();
    Game.feedback = null;
    Game.floatingTexts = [];

    ipucuGoster();
    updateHUD();
  }

  function sinavBitir() {
    Game.modu = 'oyun';
    const yuzde = Math.round((Game.dogruSayisi / Game.toplamSoru) * 100);
    SFX.basari();
    SCORM.setScore(yuzde, 100, 0);
    SCORM.setStatus(yuzde >= 60 ? 'passed' : 'failed');
    UI.sinavSonucGoster(Game.dogruSayisi, Game.toplamSoru, yuzde);
  }

  function bulutOlustur() {
    const out = [];
    for (let i = 0; i < 4; i++) {
      out.push({
        x: -20 + i * 12 + Math.random() * 4,
        y: 6 + Math.random() * 2,
        z: -10 - Math.random() * 4,
        hiz: 0.005 + Math.random() * 0.01
      });
    }
    return out;
  }

  function karistir(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // === Çizim ===
  function ciz(t) {
    const ctx = Game.ctx;
    if (!ctx) return;
    const dt = (t - Game.son) || 16;
    Game.son = t;

    ctx.clearRect(0, 0, Game.width, Game.height);

    // Gökyüzü gradyan
    const ark = Game.arkaplan || {};
    const grad = ctx.createLinearGradient(0, 0, 0, Game.height);
    grad.addColorStop(0, ark.renk1 || '#bce8ff');
    grad.addColorStop(1, ark.renk2 || '#e8f4ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, Game.width, Game.height);

    // Kamera merkezi
    const cx = Game.width / 2;
    const cy = Game.height / 2 + 80;
    const zoom = Game.cameraZoom;

    // Bulutlar
    for (const b of Game.bulutlar) {
      b.x += b.hiz * dt * 0.03;
      if (b.x > 18) b.x = -22;
      const px = cx + (b.x - b.z) * Voxel.CUBE * 0.866 * zoom * 0.6;
      const py = cy + ((b.x + b.z) * Voxel.CUBE * 0.5 - b.y * Voxel.CUBE) * zoom * 0.6;
      Voxel.drawVoxels(ctx, Models.bulut(), px, py, { scale: zoom * 0.9 });
    }

    // Zemin / yol / çayır
    cizArkaplan(ctx, cx, cy, zoom, ark.dekor);

    // Dekor: manav iki sepet (orta hat boyunca)
    if (ark.dekor === 'manav') {
      const noktalar = [[-12, 0], [12, 0]];
      for (const [gx, gz] of noktalar) {
        const p = isoNoktasi(cx, cy, gx, gz, zoom);
        Voxel.drawVoxels(ctx, Models.sepet(), p.x, p.y, { scale: zoom });
      }
    }
    if (ark.dekor === 'cayir') {
      // Birkaç ağaç
      const noktalar = [[-12, -6], [12, -6], [-10, 8], [11, 8]];
      for (const [gx, gz] of noktalar) {
        const p = isoNoktasi(cx, cy, gx, gz, zoom);
        Voxel.drawVoxels(ctx, Models.agac(), p.x, p.y, { scale: zoom });
      }
    }
    if (ark.dekor === 'sehir') {
      // Trafik çizgileri zemin üstünde — zemin çiziminde halloluyor
    }

    // Nesneler — derinlik sırasına göre
    const sorted = Game.nesneler.slice().sort((a, b) => (a.gridZ + a.gridX * 0.1) - (b.gridZ + b.gridX * 0.1));
    for (const n of sorted) {
      const p = isoNoktasi(cx, cy, n.gridX, n.gridZ, zoom);
      n.ekranX = p.x;
      n.ekranY = p.y;
      const opts = { scale: zoom * n.scale };

      // Vurgu (doğru/yanlış)
      if (n.anim.vurgu) {
        const yas = (t - n.anim.baslangic);
        if (yas < 700) {
          const a = 0.55 - yas / 1500;
          opts.tint = { color: n.anim.vurgu, a: Math.max(0, a) };
        } else {
          n.anim.vurgu = null;
        }
      }
      // Zıplama
      if (n.anim.zip > 0) {
        n.anim.zip = Math.max(0, n.anim.zip - dt * 0.005);
        opts.lift = Math.sin((1 - n.anim.zip) * Math.PI) * 18 * zoom;
      }

      // Doğru tahmin parlatma (hedef ise hafif salınım)
      if (Game.hedefKelime && n.kelime.id === Game.hedefKelime.id && !n.anim.vurgu) {
        // Subtle bounce + halka (sınav modu hariç)
        if (Game.modu === 'oyun') {
          opts.lift = (Math.sin(t * 0.003) * 3 + 3) * zoom;
        }
      }

      Voxel.drawVoxels(ctx, n.voxels, p.x, p.y, opts);

      // Ekran AABB güncelle
      n.bounds = Voxel.computeBounds(n.voxels, p.x, p.y, zoom * n.scale);
    }

    // Yüzen efekt (yıldız/ses dalgası)
    for (let i = Game.floatingTexts.length - 1; i >= 0; i--) {
      const ft = Game.floatingTexts[i];
      ft.t += dt;
      if (ft.t > ft.sure) {
        Game.floatingTexts.splice(i, 1);
        continue;
      }
      const p = ft.t / ft.sure;
      ctx.save();
      ctx.globalAlpha = 1 - p;
      ctx.fillStyle = ft.renk;
      ctx.font = 'bold ' + (28 + p * 12) + 'px ui-rounded, "SF Pro Rounded", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y - p * 60);
      ctx.restore();
    }

    requestAnimationFrame(ciz);
  }

  function isoNoktasi(cx, cy, gx, gz, zoom) {
    return {
      x: cx + (gx - gz) * Voxel.CUBE * 0.866 * zoom,
      y: cy + (gx + gz) * Voxel.CUBE * 0.5 * zoom
    };
  }

  function cizArkaplan(ctx, cx, cy, zoom, dekor) {
    // Geniş izometrik zemin (taban yüzeyi)
    const yer1 = (Game.arkaplan && Game.arkaplan.yer1) || '#7ec96a';
    const yer2 = (Game.arkaplan && Game.arkaplan.yer2) || '#5fb050';
    const w = 16, h = 12;
    const cube = Voxel.CUBE;
    const isoX = cube * 0.866 * zoom;
    const isoY = cube * 0.5 * zoom;
    for (let i = -w; i <= w; i++) {
      for (let j = -h; j <= h; j++) {
        const sx = cx + (i - j) * isoX;
        const sy = cy + (i + j) * isoY;
        // Karo
        let c = ((i + j) % 2 === 0) ? yer1 : yer2;
        // Şehir dekoru için orta hat = yol
        if (dekor === 'sehir' && Math.abs(j) <= 0) {
          c = '#3a3a3a';
        }
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + isoX, sy + isoY);
        ctx.lineTo(sx, sy + 2 * isoY);
        ctx.lineTo(sx - isoX, sy + isoY);
        ctx.closePath();
        ctx.fillStyle = c;
        ctx.fill();
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = 'rgba(0,0,0,0.10)';
        ctx.stroke();
        // Şehirde yol çizgileri
        if (dekor === 'sehir' && Math.abs(j) === 0 && i % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(sx - isoX * 0.4, sy + isoY);
          ctx.lineTo(sx + isoX * 0.4, sy + isoY);
          ctx.strokeStyle = '#f5d000';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }
  }

  // === Etkileşim ===
  function tikla(ekranX, ekranY) {
    // En üst nesneden geri doğru (derinlik tersine) — küçük öne çık
    const sorted = Game.nesneler.slice().sort((a, b) => (b.gridZ + b.gridX * 0.1) - (a.gridZ + a.gridX * 0.1));
    for (const n of sorted) {
      const b = n.bounds;
      if (!b) continue;
      if (ekranX >= b.x && ekranX <= b.x + b.w && ekranY >= b.y && ekranY <= b.y + b.h) {
        SFX.tiklama();
        n.anim.zip = 1;
        n.anim.baslangic = performance.now();
        const t = performance.now();
        if (Game.hedefKelime && n.kelime.id === Game.hedefKelime.id) {
          n.anim.vurgu = 'rgba(70, 220, 100, 1)';
          n.anim.baslangic = t;
          dogruTahmin(n);
        } else {
          n.anim.vurgu = 'rgba(230, 70, 70, 1)';
          n.anim.baslangic = t;
          yanlisTahmin(n);
        }
        return;
      }
    }
  }

  function dogruTahmin(n) {
    SFX.dogru();
    Game.skor += 10;
    Game.dogruSayisi++;
    Game.floatingTexts.push({
      text: '✓ ' + n.kelime.tr,
      x: n.ekranX,
      y: n.ekranY - 40,
      renk: '#1aaa3a',
      t: 0,
      sure: 1200
    });
    updateHUD();
    SCORM.setScore(Math.min(100, Game.skor), 100, 0);
    if (Game.modu === 'sinav') {
      setTimeout(sonrakiSoru, 1100);
    } else {
      setTimeout(() => {
        // Aynı sahnede yeni hedef
        if (Game.aktifSahne !== 'sinav') rasgeleHedef();
      }, 800);
    }
  }

  function yanlisTahmin(n) {
    SFX.yanlis();
    Game.yanlisSayisi++;
    Game.floatingTexts.push({
      text: 'Tekrar dene',
      x: n.ekranX,
      y: n.ekranY - 40,
      renk: '#cc2a2a',
      t: 0,
      sure: 900
    });
    updateHUD();
    if (Game.modu === 'sinav') {
      // Sınavda yanlış da soruyu kapatır
      setTimeout(sonrakiSoru, 900);
    }
  }

  function updateHUD() {
    const s = document.getElementById('skor');
    const d = document.getElementById('dogru');
    const y = document.getElementById('yanlis');
    const sayac = document.getElementById('soru-sayac');
    if (s) s.textContent = Game.skor;
    if (d) d.textContent = Game.dogruSayisi;
    if (y) y.textContent = Game.yanlisSayisi;
    if (sayac) {
      if (Game.modu === 'sinav') {
        const kalan = Game.kalanSorular.length;
        const cevaplanan = Game.toplamSoru - kalan;
        sayac.textContent = (cevaplanan + 1) + ' / ' + Game.toplamSoru;
        sayac.style.display = '';
      } else {
        sayac.style.display = 'none';
      }
    }
  }

  // === Başlat ===
  function baslat(canvasEl) {
    Game.canvas = canvasEl;
    Game.ctx = canvasEl.getContext('2d');
    resize();
    window.addEventListener('resize', resize);

    canvasEl.addEventListener('click', (e) => {
      const rect = canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tikla(x, y);
    });
    canvasEl.addEventListener('touchstart', (e) => {
      if (!e.touches.length) return;
      const rect = canvasEl.getBoundingClientRect();
      const t = e.touches[0];
      tikla(t.clientX - rect.left, t.clientY - rect.top);
      e.preventDefault();
    }, { passive: false });

    requestAnimationFrame(ciz);
  }

  global.Game = Object.assign(Game, {
    baslat,
    sahneAc,
    sinavBaslat,
    sonrakiSoru,
    ipucuGoster,
    resize,
    setMode: (m) => { Game.modu = m; updateHUD(); },
    updateHUD
  });
})(window);
