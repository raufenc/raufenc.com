// Osmanlıca Lügat — çekimler (masaüstü d-*, mobil m-*)
//
//  hero          : Arama sekmesi → "Karıştır" → 454 resimli kartlık ızgara (karışık; Tuğra, Vilayet, Kalyon …)
//  ara → kart    : aramaya "lahza" yaz → LAHZA kartına dokun → büyük kart (Önceki / Sonraki)
//  fihrist → m   : Fihrist sekmesi (A–Z çubuğu) → "M"ye dokun → "M — 185 terim"
//  kesfet → akis : "Keşfetmeye Başla" → karışık tam ekran akış, kart kart kaydırma (1 / 454 → 3 / 454)
//  yan           : yatay intro'daki yan telefon için tek bir akış kartı (Mehter)
//
// Karıştırma Math.random ile yapılıyor → çekimler yeniden üretilebilsin diye tıklamadan hemen önce
// sayfa içinde sabit tohumlu üreteç kurulur.
import { spawnSync } from 'node:child_process';
import { withStudio } from '../../lib/capture.mjs';

const BASE = '/osmanlica/';
const SEED = (seed) => { let a = seed >>> 0; Math.random = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const SEED_GRID = Number(process.env.SEED_GRID || 21);   // tugra, vilayet, kalyon, meddah, ser_iyye, mahzen, derman, reisu_l_kuttab
const SEED_FEED = Number(process.env.SEED_FEED || 1144); // mehtap, pehlivan, kervansaray
const SEED_SIDE = Number(process.env.SEED_SIDE || 7);    // mehter

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark, settle, origin, out }) => {
  const prep = (p) => p.addStyleTag({ content: '#rauf-nav{display:none!important}' });
  const open = async (dev) => {
    const p = await dev(null);
    await p.goto(origin + BASE, { waitUntil: 'domcontentloaded' });
    await settle(p);
    await prep(p);
    await p.waitForTimeout(1000); // fadeUp / cardPop girişleri bitsin
    return p;
  };
  // görünen (ya da tüm) görseller yüklensin
  const waitImgs = (p, sel = 'img') => p.waitForFunction((sel) => {
    const ims = [...document.querySelectorAll(sel)].filter((i) => {
      const r = i.getBoundingClientRect();
      return r.width > 0 && r.bottom > 0 && r.top < innerHeight;
    });
    return ims.length && ims.every((i) => i.complete && i.naturalWidth > 0);
  }, sel, { timeout: 30000 }).then(() => p.waitForTimeout(400));
  const away = (p, pre) => (pre === 'd' ? p.mouse.move(1435, 895).catch(() => {}) : Promise.resolve());
  const feedImg = (p) => p.waitForFunction(() => {
    const f = document.getElementById('kesfet-feed');
    const idx = Math.round(f.scrollTop / f.clientHeight);
    const s = document.querySelectorAll('.feed-slide img')[idx];
    return s && s.complete && s.naturalWidth > 0;
  }, null, { timeout: 30000 }).then(() => p.waitForTimeout(500));
  const startFeed = async (p, seed) => {
    await p.click('.tab[data-tab="kesfet"]');
    await p.waitForTimeout(500);
    await p.evaluate(SEED, seed);
    await p.click('.kesfet-start-btn');
    await p.waitForTimeout(600);
    await feedImg(p);
  };

  for (const [pre, dev] of [['d', desktop], ['m', mobile]]) {
    // ── 1) Kahraman: Arama → Karıştır (resimli kart ızgarası) ──
    let p = await open(dev);
    await p.evaluate(SEED, SEED_GRID);
    await p.click('.shuffle-btn');
    await away(p, pre);
    await p.waitForTimeout(1300);
    console.log(pre, 'ızgara:', await p.evaluate(() => [...document.querySelectorAll('#grid .card-img')].slice(0, 8).map((i) => i.alt).join(', ')));
    await p.evaluate(() => document.activeElement && document.activeElement.blur());
    await waitImgs(p, '#grid img');
    await shot(p, `${pre}-hero.jpg`);
    if (pre === 'm') {
      // kaydırma sahnesi için uzun çekim: tembel görselleri önceden yükle
      await p.evaluate(() => document.querySelectorAll('#grid img').forEach((i, k) => { if (k < 14) i.loading = 'eager'; }));
      await p.evaluate(async () => { for (let y = 0; y < 2400; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } scrollTo(0, 0); });
      await p.waitForTimeout(600);
      await p.waitForFunction(() => [...document.querySelectorAll('#grid img')].slice(0, 10).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 30000 });
      await p.waitForTimeout(500);
      await tallShot(p, 'm-hero-uzun.jpg', { maxScreens: 2 });
    }

    // ── 2) Arama: "lahza" → LAHZA kartı → büyük kart ──
    p = await open(dev);
    await p.click('#search');
    await p.type('#search', 'lahza', { delay: 70 });
    await p.waitForTimeout(900);
    await away(p, pre);
    await waitImgs(p, '#grid img');
    console.log(pre, 'arama:', await p.evaluate(() => document.getElementById('results-text').textContent + ' · ' + [...document.querySelectorAll('#grid .card-img')].map((i) => i.alt).join(',')));
    await mark(p, `${pre}-ara.jpg`, { kart: '#grid .card', ara: '#search', sonuc: '#results-text' });
    await shot(p, `${pre}-ara.jpg`);
    await p.click('#grid .card');
    await p.waitForTimeout(800);
    await waitImgs(p, '#lb-img');
    await away(p, pre);
    await p.waitForTimeout(300);
    await mark(p, `${pre}-kart.jpg`, { gorsel: '#lb-img', icerik: '.lb-content', sonraki: '.lb-nav-btn:nth-child(2)' });
    await shot(p, `${pre}-kart.jpg`);

    // ── 3) Fihrist → M ──
    p = await open(dev);
    await p.click('.tab[data-tab="fihrist"]');
    await p.waitForTimeout(900);
    await away(p, pre);
    await waitImgs(p, '#fihrist-grid img');
    const mBtn = '#az-bar .az-btn:nth-child(13)';
    console.log(pre, 'harf düğmesi:', await p.evaluate((s) => document.querySelector(s).textContent, mBtn));
    await mark(p, `${pre}-fihrist.jpg`, { m: mBtn, bar: '#az-bar' });
    await shot(p, `${pre}-fihrist.jpg`);
    await p.click(mBtn);
    await p.waitForTimeout(900);
    await away(p, pre);
    await waitImgs(p, '#fihrist-grid img');
    console.log(pre, 'fihrist:', await p.evaluate(() => document.getElementById('fihrist-count').textContent));
    await mark(p, `${pre}-fihrist-m.jpg`, { m: mBtn, sayi: '#fihrist-count', grid: '#fihrist-grid' });
    await shot(p, `${pre}-fihrist-m.jpg`);

    // ── 4) Keşfet → karışık akış, kaydırma ──
    p = await open(dev);
    await p.click('.tab[data-tab="kesfet"]');
    await p.waitForTimeout(700);
    await away(p, pre);
    await mark(p, `${pre}-kesfet.jpg`, { basla: '.kesfet-start-btn' });
    await shot(p, `${pre}-kesfet.jpg`);
    await p.evaluate(SEED, SEED_FEED);
    await p.click('.kesfet-start-btn');
    await p.waitForTimeout(600);
    await feedImg(p);
    await away(p, pre);
    console.log(pre, 'akış:', await p.evaluate(() => [...document.querySelectorAll('.feed-slide img')].slice(0, 4).map((i) => i.alt).join(', ')));
    await shot(p, `${pre}-akis-1.jpg`);
    for (const n of [2, 3]) {
      await p.evaluate((n) => { const f = document.getElementById('kesfet-feed'); f.scrollTo({ top: f.clientHeight * (n - 1), behavior: 'auto' }); }, n);
      await p.waitForTimeout(800);
      await feedImg(p);
      console.log(pre, 'sayaç:', await p.evaluate(() => document.getElementById('feed-counter').textContent));
      await shot(p, `${pre}-akis-${n}.jpg`);
    }

    // ── 5) Yan telefon: tek akış kartı ──
    if (pre === 'm') {
      p = await open(dev);
      await startFeed(p, SEED_SIDE);
      console.log(pre, 'yan:', await p.evaluate(() => document.querySelector('.feed-slide img').alt));
      await shot(p, 'm-yan.jpg');
    }
  }

  // Mobil kaydırma şeridi: akış 1 → 2 (tek kaydırma; her kart kendi sayacıyla) → shots/m-akis.jpg
  const r = spawnSync('python3', ['-c', `
import sys
from PIL import Image
fs=sys.argv[2:]; ims=[Image.open(f).convert('RGB') for f in fs]; w,h=ims[0].size
S=Image.new('RGB',(w,h*len(ims)))
for i,im in enumerate(ims): S.paste(im,(0,h*i))
S.save(sys.argv[1],quality=90)
`, out('m-akis.jpg'), out('m-akis-1.jpg'), out('m-akis-2.jpg')], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('şerit birleştirilemedi');
});
