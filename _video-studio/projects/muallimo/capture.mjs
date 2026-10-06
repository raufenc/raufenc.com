// MUALLİMO — Resim Kartları — çekimler (masaüstü d-*, mobil m-*)
// Akış: anasayfa → seriler (Okuryazarlık / Sağlık) → seri ekranı (kitaplar)
//       → Fen Bilimleri → Kimya Elementleri → tam ekran kaydırmalı okuyucu (kapak → H → He → Li)
//       → Mantık Kartları "Küçük" ızgara → 5. kart büyütülür (lightbox).
// Notlar:
//  - Kart görselleri jsDelivr (raufenc/muallimo-images) → araç takımı raw.githubusercontent'e yönlendirir.
//  - Mobilde (390 px) kitap ızgarası açıkken başlık çubuğu yatay taşar (← Geri ekran dışı, 🏠 kesik);
//    bu yüzden lightbox da sağa kayar. Mobil ızgara/lightbox ekranı KULLANILMADI (site hatası, raporlandı).
//    Dikey sürümün ızgara sahnesi masaüstü ızgaranın/lightbox'ın kırpılmış bileşen çekimleriyle (card) yapılır.
//  - Okuryazarlık seri ekranı da mobilde 17 px taşar → mobilde Sağlık serisi kullanıldı.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { withStudio } from '../../lib/capture.mjs';

const BASE = '/muallimo/';
const CDN = 'https://cdn.jsdelivr.net/gh/raufenc/muallimo-images@main/WEBP_Final/';

// Görünür alandaki tüm görseller yüklensin (lazy görseller dahil)
async function waitImgs(p, sel = 'img') {
  await p.waitForFunction((sel) => {
    const vis = [...document.querySelectorAll(sel)].filter((i) => {
      const r = i.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      if (r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth) return false;
      let e = i; while (e) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return false; e = e.parentElement; }
      return true;
    });
    return vis.length > 0 && vis.every((i) => i.complete && i.naturalWidth > 0);
  }, sel, { timeout: 60000 });
  await p.evaluate(() => Promise.all([...document.images].filter((i) => i.complete && i.naturalWidth).map((i) => i.decode().catch(() => {}))));
  await p.waitForTimeout(400);
}
// Kartları önceden tarayıcı önbelleğine al (okuyucudaki "↓ Kaydır" ipucu sönmeden çekebilmek için)
async function warm(p, slug, ci, n = 5) {
  await p.evaluate(({ slug, ci, n, CDN }) => Promise.all(VERİ[slug].ciltler[ci].kartlar.slice(0, n).map((k) => new Promise((r) => {
    const im = new Image(); im.onload = im.onerror = r; im.src = CDN + k;
  }))), { slug, ci, n, CDN });
}
// Tam ekran okuyucuda i. karta (0 tabanlı) kaydır
async function slideTo(p, i) {
  await p.evaluate((i) => { const sc = document.getElementById('scroll-container'); sc.scrollTo({ top: sc.clientHeight * i, behavior: 'instant' }); }, i);
  await p.waitForTimeout(500);
  await waitImgs(p, '#scroll-container img');
}
// Mobil çekimlerde iPhone durum çubuğu payı: sayfa 390×790 açılır, üstüne 54 px şerit eklenir (→ 390×844).
// Motorun telefon çerçevesindeki Dynamic Island böylece sayfa başlığını/sayaçları örtmez (gerçek Safari'deki gibi).
const SAFE_TOP = 54, M_VIEW = { width: 390, height: 844 - SAFE_TOP };
const noScroll = (p) => p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, hide, dir }) => {
  const marksFile = `${dir}/shots/marks.json`;
  // Kırpılmış (clip) çekim için işaretler: clip'e göre 0..1
  async function markClip(p, name, selectors, clip) {
    const res = await p.evaluate(({ selectors, clip }) => {
      const out = {};
      for (const [k, sel] of Object.entries(selectors)) {
        const e = document.querySelector(sel);
        if (!e) { out[k] = null; continue; }
        const r = e.getBoundingClientRect();
        const x = r.left + scrollX, y = r.top + scrollY;
        out[k] = { x: (x + r.width / 2 - clip.x) / clip.width, y: (y + r.height / 2 - clip.y) / clip.height, w: r.width / clip.width, h: r.height / clip.height };
      }
      return out;
    }, { selectors, clip });
    let all = {};
    try { all = JSON.parse(fs.readFileSync(marksFile, 'utf8')); } catch {}
    all[name] = Object.assign(all[name] || {}, res);
    fs.writeFileSync(marksFile, JSON.stringify(all, null, 2));
    for (const [k, v] of Object.entries(res)) if (!v) console.warn(`[markClip] bulunamadı: ${name} → ${k}`);
  }
  const rect = (p, sel) => p.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; }, sel);

  for (const [pre, open] of [['d', desktop], ['m', (u) => mobile(u, { viewport: M_VIEW })]]) {
    const isM = pre === 'm';
    const seriSlug = isM ? 'saglik' : 'okuryazarlik';
    const seriIdx = isM ? 2 : 1; // .seri-kart sırası (1 tabanlı)

    // 1) Anasayfa (kahraman)
    let p = await open(BASE);
    await hide(p);
    await p.waitForTimeout(600);
    await shot(p, `${pre}-hero.jpg`);

    // 2) Seriler bölümü → seriye dokun
    const top = await p.evaluate(() => document.querySelector('.section').getBoundingClientRect().top + scrollY);
    await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, top - (isM ? 76 : 96)));
    await p.waitForTimeout(400);
    if (!isM) { await p.hover(`.seri-kart:nth-child(${seriIdx})`); await p.waitForTimeout(500); }
    await mark(p, `${pre}-seriler.jpg`, { seri: `.seri-kart:nth-child(${seriIdx})`, fen: '.seri-kart:nth-child(6)' });
    await shot(p, `${pre}-seriler.jpg`);
    await p.click(`.seri-kart:nth-child(${seriIdx})`);
    await p.waitForTimeout(300);
    console.log(pre, 'seri ekranı açılınca scrollY =', await p.evaluate(() => scrollY));
    await noScroll(p);
    await p.mouse.move(5, 890);
    await waitImgs(p, '.cilt-onizleme img');
    await mark(p, `${pre}-seri.jpg`, { grid: '#cilt-grid', ilk: '.cilt-kart:nth-child(1)' });
    await shot(p, `${pre}-seri.jpg`);
    console.log(pre, 'seri scrollWidth', await p.evaluate(() => document.documentElement.scrollWidth));

    // 3) Fen Bilimleri → Kimya Elementleri → tam ekran okuyucu
    p = await open(BASE);
    await hide(p);
    await p.evaluate(() => seriAc('fen-bilimleri'));
    await noScroll(p);
    await waitImgs(p, '.cilt-onizleme img');
    if (!isM) { await p.hover('.cilt-kart:nth-child(1)'); await p.waitForTimeout(500); }
    await mark(p, `${pre}-fen.jpg`, { kimya: '.cilt-kart:nth-child(1)', kimya_img: '.cilt-kart:nth-child(1) .cilt-onizleme' });
    await shot(p, `${pre}-fen.jpg`);
    console.log(pre, 'fen scrollWidth', await p.evaluate(() => document.documentElement.scrollWidth));
    await warm(p, 'fen-bilimleri', 0, 5);
    await p.click('.cilt-kart:nth-child(1)');
    await p.mouse.move(5, 5);
    await waitImgs(p, '#scroll-container img');
    await mark(p, `${pre}-kimya-1.jpg`, { grid: '#sc-grid-btn', shuffle: '#sc-shuffle-btn', img: '.scroll-slide:nth-child(1) .scroll-img' });
    await shot(p, `${pre}-kimya-1.jpg`);
    for (const i of [1, 2, 3]) {
      await slideTo(p, i);
      await mark(p, `${pre}-kimya-${i + 1}.jpg`, { grid: '#sc-grid-btn', shuffle: '#sc-shuffle-btn', img: `.scroll-slide:nth-child(${i + 1}) .scroll-img` });
      await shot(p, `${pre}-kimya-${i + 1}.jpg`);
    }

    // 4) Mantık Kartları → "Küçük" ızgara → 5. kartı büyüt
    p = await open(BASE);
    await hide(p);
    await p.evaluate(() => { ciltAc('okuryazarlik', 0); kapatScrollView('grid'); });
    await noScroll(p);
    await p.waitForTimeout(300);
    await waitImgs(p, '#mini-grid img');
    if (isM) {
      // Mobil ızgara: başlık çubuğu taşıyor → yalnız ızgara bölgesini (başlıksız) kırp; arka plan/yedek için
      const g = await rect(p, '#reader-header');
      const clip = { x: 0, y: g.y, width: 390, height: M_VIEW.height - g.y };
      await shot(p, 'm-grid-kirp.jpg', { clip });
      console.log(pre, 'grid scrollWidth', await p.evaluate(() => document.documentElement.scrollWidth));
      continue;
    }
    await p.hover('.mini-kart:nth-child(5)');
    await p.waitForTimeout(500);
    await mark(p, 'd-grid.jpg', { k5: '.mini-kart:nth-child(5)', kucuk: '#btn-grid' });
    await shot(p, 'd-grid.jpg');
    // dikey için bileşen kırpması: 4.–6. sütun × 3 satır (kartlar 4–6, 11–13, 18–20); lightbox kırpması aynı oranda
    let ratio;
    {
      const a = await rect(p, '.mini-kart:nth-child(4)');
      const b = await rect(p, '.mini-kart:nth-child(20)');
      const pad = 6; // ızgara aralığı 8 px → komşu kartlar görünmesin
      const clip = { x: Math.round(a.x - pad), y: Math.round(a.y - pad), width: Math.round(b.x + b.w - a.x + pad * 2), height: Math.round(b.y + b.h - a.y + pad * 2) };
      ratio = clip.width / clip.height;
      await markClip(p, 'd-grid-kirp.jpg', { k5: '.mini-kart:nth-child(5)' }, clip);
      await shot(p, 'd-grid-kirp.jpg', { clip, fullPage: true });
      console.log('grid kırpma', JSON.stringify(clip), ratio.toFixed(3));
    }
    await p.click('.mini-kart:nth-child(5)');
    await p.mouse.move(5, 450);
    await waitImgs(p, '#lb-img');
    await mark(p, 'd-lb.jpg', { img: '#lb-img', next: '#lb-next', counter: '#lb-counter' });
    await shot(p, 'd-lb.jpg');
    {
      const im = await rect(p, '#lb-img');
      const nav = await rect(p, '#lb-nav');
      const y0 = im.y - 24, y1 = nav.y + nav.h - 8;
      const height = y1 - y0, width = Math.round(height * ratio);
      const clip = { x: Math.round(im.x + im.w / 2 - width / 2), y: Math.round(y0), width, height: Math.round(height) };
      await markClip(p, 'd-lb-kirp.jpg', { next: '#lb-next', img: '#lb-img' }, clip);
      await shot(p, 'd-lb-kirp.jpg', { clip });
      console.log('lb kırpma', JSON.stringify(clip));
    }
  }
  // Mobil çekimlere durum çubuğu payı ekle (üst satırın rengiyle) ve işaretleri yeni yüksekliğe göre kaydır
  const phoneShots = fs.readdirSync(`${dir}/shots`).filter((f) => /^m-.*\.jpg$/.test(f) && f !== 'm-grid-kirp.jpg');
  const r = spawnSync('python3', ['-c', `
import sys
from PIL import Image
pad = int(sys.argv[1])
for f in sys.argv[2:]:
    im = Image.open(f).convert('RGB'); w, h = im.size; s = w / 390; ph = round(pad * s)
    if abs(h / s - 844) < 2: continue  # zaten işlenmiş
    row = im.crop((0, 0, w, 3)).resize((1, 1), Image.BILINEAR).getpixel((0, 0))
    out = Image.new('RGB', (w, h + ph), row); out.paste(im, (0, ph)); out.save(f, quality=90)
`, String(SAFE_TOP), ...phoneShots.map((f) => `${dir}/shots/${f}`)], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('durum çubuğu payı eklenemedi');
  const all = JSON.parse(fs.readFileSync(marksFile, 'utf8'));
  for (const f of phoneShots) {
    for (const v of Object.values(all[f] || {})) {
      if (!v || v._safe) continue;
      v.y = (SAFE_TOP + v.y * M_VIEW.height) / 844; v.h = v.h * M_VIEW.height / 844; v._safe = 1;
    }
  }
  fs.writeFileSync(marksFile, JSON.stringify(all, null, 2));
});
