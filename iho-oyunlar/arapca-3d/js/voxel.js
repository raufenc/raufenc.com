// Voxel renderer — saf Canvas 2D ile izometrik küp dünyası
// Minecraft tarzı blok görünümü, harici bağımlılık yok.

(function (global) {
  'use strict';

  // İzometrik dönüşüm: bir voksel (vx, vy, vz) -> ekran (sx, sy)
  // y = yukarı, x = sağ-arka, z = sağ-ön (sağ el kuralı).
  // CUBE = blok kenarı (px). TILE_W = 2*CUBE*cos(30), TILE_H = 2*CUBE*sin(30)
  const CUBE = 14;          // blok kenarı (px) — küçükse daha keskin, büyükse daha kalın
  const ISO_X = CUBE * 0.866;   // sqrt(3)/2
  const ISO_Y = CUBE * 0.5;

  // Renk yardımcıları
  function shade(hex, amt) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v + amt))).toString(16).padStart(2, '0');
    return '#' + f(r) + f(g) + f(b);
  }

  // Bir voksel kümesini (array of {x,y,z,c}) izometrik olarak çiz.
  // pivot: dünya konumu (px). highlightColor: vurgulama (varsa yüz boyamasını değiştirir).
  function drawVoxels(ctx, voxels, pivotX, pivotY, opts) {
    opts = opts || {};
    const tint = opts.tint || null;     // {r,g,b,a} ek overlay
    const lift = opts.lift || 0;        // y ekseni offset (zıplama)
    const scale = opts.scale || 1;

    // Derinlik sırası: z+x büyük olan ileride, y küçük olan altta → arkadan öne çiz.
    // Sıralama anahtarı: -y + (x+z)  -- y büyük → yukarı, x+z büyük → ileri
    const sorted = voxels.slice().sort((a, b) => {
      const ka = (a.x + a.z) - a.y * 0.5;
      const kb = (b.x + b.z) - b.y * 0.5;
      return ka - kb;
    });

    for (let i = 0; i < sorted.length; i++) {
      const v = sorted[i];
      // İzometrik projeksiyon
      const sx = pivotX + (v.x - v.z) * ISO_X * scale;
      const sy = pivotY + ((v.x + v.z) * ISO_Y - v.y * CUBE) * scale - lift;
      drawCube(ctx, sx, sy, v.c, CUBE * scale, tint);
    }
  }

  // Tek bir izometrik küp (üst, sol, sağ yüzler)
  function drawCube(ctx, x, y, color, size, tint) {
    const isoX = size * 0.866;
    const isoY = size * 0.5;

    const top    = shade(color,  18);
    const left   = shade(color, -22);
    const right  = shade(color, -8);

    // Üst yüz (eşkenar dörtgen)
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + isoX, y - size + isoY);
    ctx.lineTo(x, y - size + 2 * isoY);
    ctx.lineTo(x - isoX, y - size + isoY);
    ctx.closePath();
    ctx.fillStyle = top;
    ctx.fill();

    // Sol yüz
    ctx.beginPath();
    ctx.moveTo(x - isoX, y - size + isoY);
    ctx.lineTo(x, y - size + 2 * isoY);
    ctx.lineTo(x, y + isoY);
    ctx.lineTo(x - isoX, y);
    ctx.closePath();
    ctx.fillStyle = left;
    ctx.fill();

    // Sağ yüz
    ctx.beginPath();
    ctx.moveTo(x + isoX, y - size + isoY);
    ctx.lineTo(x, y - size + 2 * isoY);
    ctx.lineTo(x, y + isoY);
    ctx.lineTo(x + isoX, y);
    ctx.closePath();
    ctx.fillStyle = right;
    ctx.fill();

    if (tint) {
      ctx.save();
      ctx.globalAlpha = tint.a || 0.35;
      ctx.fillStyle = tint.color;
      // Üst yüz
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + isoX, y - size + isoY);
      ctx.lineTo(x, y - size + 2 * isoY);
      ctx.lineTo(x - isoX, y - size + isoY);
      ctx.closePath();
      ctx.fill();
      // Sol
      ctx.beginPath();
      ctx.moveTo(x - isoX, y - size + isoY);
      ctx.lineTo(x, y - size + 2 * isoY);
      ctx.lineTo(x, y + isoY);
      ctx.lineTo(x - isoX, y);
      ctx.closePath();
      ctx.fill();
      // Sağ
      ctx.beginPath();
      ctx.moveTo(x + isoX, y - size + isoY);
      ctx.lineTo(x, y - size + 2 * isoY);
      ctx.lineTo(x, y + isoY);
      ctx.lineTo(x + isoX, y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // İnce dış çizgi (blok keskinliği)
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + isoX, y - size + isoY);
    ctx.lineTo(x, y - size + 2 * isoY);
    ctx.lineTo(x - isoX, y - size + isoY);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - size + 2 * isoY);
    ctx.lineTo(x, y + isoY);
    ctx.stroke();
  }

  // Bir voksel kümesinin ekran AABB'sini hesapla (tıklama tespiti için)
  function computeBounds(voxels, pivotX, pivotY, scale) {
    scale = scale || 1;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const v of voxels) {
      const sx = pivotX + (v.x - v.z) * ISO_X * scale;
      const sy = pivotY + ((v.x + v.z) * ISO_Y - v.y * CUBE) * scale;
      const half = ISO_X * scale + 1;
      if (sx - half < minX) minX = sx - half;
      if (sx + half > maxX) maxX = sx + half;
      if (sy - CUBE * scale < minY) minY = sy - CUBE * scale;
      if (sy + ISO_Y * scale > maxY) maxY = sy + ISO_Y * scale;
    }
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  // Yer karosu — büyük izometrik zemin için
  function drawFloor(ctx, x, y, w, h, colorA, colorB) {
    const ts = CUBE; // her karo bir bloka denk
    for (let i = -w; i < w; i++) {
      for (let j = -h; j < h; j++) {
        const sx = x + (i - j) * ISO_X;
        const sy = y + (i + j) * ISO_Y;
        const c = ((i + j) % 2 === 0) ? colorA : colorB;
        const top = shade(c, 8);
        ctx.beginPath();
        ctx.moveTo(sx, sy - ts + 2 * ISO_Y);
        ctx.lineTo(sx + ISO_X, sy - ts + ISO_Y + 2 * ISO_Y);
        ctx.lineTo(sx, sy - ts + 4 * ISO_Y);
        ctx.lineTo(sx - ISO_X, sy - ts + ISO_Y + 2 * ISO_Y);
        ctx.closePath();
        ctx.fillStyle = top;
        ctx.fill();
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.stroke();
      }
    }
  }

  global.Voxel = {
    CUBE,
    drawVoxels,
    drawCube,
    drawFloor,
    computeBounds,
    shade
  };
})(window);
