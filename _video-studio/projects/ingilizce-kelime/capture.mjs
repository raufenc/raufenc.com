// İngilizce Kelime Kartları — çekimler (masaüstü d-*, mobil m-*)
//
//  hero       : Arama sekmesi → "Karıştır" → 237 kartlık renkli ızgara (karışık)
//  ara → kart : aramaya "zürafa" yaz (Türkçe anlamda da arar) → Giraffe kartına dokun → büyük kart
//  kategoriler → hayvan : 9 kategori → "Hayvanlar"a dokun → tam ekran akış (1 / 16, Bear)
//  kesfet → akis-1/2/3  : "Keşfetmeye Başla" → karışık akış, kart kart kaydırma (1 / 237 → 3 / 237)
//  elma       : "Yiyecek & İçecek" akışının ilk kartı (yatayda yan telefon)
//
// Karıştırma Math.random ile yapılıyor → çekimler yeniden üretilebilsin diye sabit tohumlu üreteç.
import { spawnSync } from 'node:child_process';
import { withStudio } from '../../lib/capture.mjs';

const BASE = '/ingilizce-kelime/';
const SEED = (seed) => { let a = seed >>> 0; Math.random = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const SEED_GRID = Number(process.env.SEED_GRID || 16);
const SEED_FEED = Number(process.env.SEED_FEED || 22);

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark, settle, origin, out }) => {
  const prep = (p) => p.addStyleTag({ content: '#rauf-nav{display:none!important}' });
  const open = async (dev, seed) => {
    const p = await dev(null);
    if (seed != null) await p.addInitScript(SEED, seed);
    await p.goto(origin + BASE, { waitUntil: 'domcontentloaded' });
    await settle(p);
    await prep(p);
    await p.waitForTimeout(900); // fadeUp / cardPop girişleri bitsin
    return p;
  };
  // görünen (ya da tüm) görseller yüklensin
  const waitImgs = (p, sel = 'img', all = false) => p.waitForFunction(({ sel, all }) => {
    const ims = [...document.querySelectorAll(sel)].filter((i) => {
      if (all) return true;
      const r = i.getBoundingClientRect();
      return r.width > 0 && r.bottom > 0 && r.top < innerHeight;
    });
    return ims.length && ims.every((i) => i.complete && i.naturalWidth > 0);
  }, { sel, all }, { timeout: 30000 }).then(() => p.waitForTimeout(400));
  const away = (p, pre) => (pre === 'd' ? p.mouse.move(1430, 890).catch(() => {}) : Promise.resolve());
  const feedImgs = (p) => p.waitForFunction(() => {
    const f = document.getElementById('kesfet-feed');
    const idx = Math.round(f.scrollTop / f.clientHeight);
    const s = document.querySelector(`.feed-slide[data-index="${idx}"] img`);
    return s && s.complete && s.naturalWidth > 0;
  }, null, { timeout: 30000 }).then(() => p.waitForTimeout(500));

  for (const [pre, dev] of [['d', desktop], ['m', mobile]]) {
    // ── 1) Kahraman: Arama → Karıştır (renkli kart ızgarası) ──
    let p = await open(dev, SEED_GRID);
    await p.click('.tab[data-tab="arama"]');
    await p.waitForTimeout(300);
    await p.click('.shuffle-btn');
    await away(p, pre);
    await p.waitForTimeout(1200);
    console.log(pre, 'ızgara:', await p.evaluate(() => [...document.querySelectorAll('#grid .card-img')].slice(0, 8).map((i) => i.alt).join(', ')));
    await p.evaluate(() => document.activeElement && document.activeElement.blur());
    await waitImgs(p, '#grid img');
    await shot(p, `${pre}-hero.jpg`);
    if (pre === 'm') {
      // kaydırma sahnesi için uzun çekim: tembel görselleri önceden yükle
      await p.evaluate(() => document.querySelectorAll('#grid img').forEach((i, k) => { if (k < 16) i.loading = 'eager'; }));
      await p.evaluate(async () => { for (let y = 0; y < 2600; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); });
      await p.waitForTimeout(600);
      await p.waitForFunction(() => [...document.querySelectorAll('#grid img')].slice(0, 10).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 30000 });
      await p.waitForTimeout(400);
      await tallShot(p, 'm-hero-uzun.jpg', { maxScreens: 2 });
    }

    // ── 2) Arama: "zürafa" → Giraffe → büyük kart ──
    p = await open(dev);
    await p.click('.tab[data-tab="arama"]');
    await p.waitForTimeout(400);
    await p.click('#search');
    await p.type('#search', 'zürafa', { delay: 60 });
    await p.waitForTimeout(900);
    await away(p, pre);
    await waitImgs(p, '#grid img');
    console.log(pre, 'arama:', await p.evaluate(() => document.getElementById('results-text').textContent));
    await mark(p, `${pre}-ara.jpg`, { kart: '#grid .card', ara: '#search', sonuc: '#results-text' });
    await shot(p, `${pre}-ara.jpg`);
    await p.click('#grid .card');
    await p.waitForTimeout(700);
    await waitImgs(p, '#lb-img');
    await away(p, pre);
    await p.waitForTimeout(300);
    await mark(p, `${pre}-kart.jpg`, { gorsel: '#lb-img', ses: '.lb-play', icerik: '.lb-content' });
    await shot(p, `${pre}-kart.jpg`);

    // ── 3) Kategoriler → Hayvanlar → akış ──
    p = await open(dev);
    await away(p, pre);
    await p.waitForTimeout(400);
    await mark(p, `${pre}-kategoriler.jpg`, { hayvan: '.kat-card:nth-child(4)', zit: '.kat-card:nth-child(9)', grid: '.kat-grid' });
    await shot(p, `${pre}-kategoriler.jpg`);
    await p.click('.kat-card:nth-child(4)');
    await p.waitForTimeout(500);
    await feedImgs(p);
    await away(p, pre);
    console.log(pre, 'hayvan akışı:', await p.evaluate(() => document.getElementById('feed-counter').textContent));
    await mark(p, `${pre}-hayvan.jpg`, { kart: '.feed-slide[data-index="0"] img', ses: '#feed-sound-btn' });
    await shot(p, `${pre}-hayvan.jpg`);

    // ── 4) Keşfet → karışık akış, kaydırma ──
    p = await open(dev, SEED_FEED);
    await p.click('.tab[data-tab="kesfet"]');
    await p.waitForTimeout(600);
    await away(p, pre);
    await mark(p, `${pre}-kesfet.jpg`, { basla: '.kesfet-start-btn' });
    await shot(p, `${pre}-kesfet.jpg`);
    await p.click('.kesfet-start-btn');
    await p.waitForTimeout(500);
    await feedImgs(p);
    await away(p, pre);
    console.log(pre, 'akış:', await p.evaluate(() => [...document.querySelectorAll('.feed-slide img')].slice(0, 4).map((i) => i.alt).join(', ')));
    await shot(p, `${pre}-akis-1.jpg`);
    for (const n of [2, 3]) {
      await p.evaluate((n) => { const f = document.getElementById('kesfet-feed'); f.scrollTo({ top: f.clientHeight * (n - 1), behavior: 'auto' }); }, n);
      await p.waitForTimeout(700);
      await feedImgs(p);
      console.log(pre, 'sayaç:', await p.evaluate(() => document.getElementById('feed-counter').textContent));
      await shot(p, `${pre}-akis-${n}.jpg`);
    }

    // ── 5) Yiyecek & İçecek akışı (yan telefon / ek kart) ──
    p = await open(dev);
    await p.click('.kat-card:nth-child(8)');
    await p.waitForTimeout(500);
    await feedImgs(p);
    await away(p, pre);
    await shot(p, `${pre}-elma.jpg`);
  }

  // Mobil kaydırma şeridi: akış 1 → 2 (tek kaydırma; her kart kendi sayacıyla) → shots/m-akis.jpg
  // (3. kart ayrı çekim olarak sahnede itme geçişiyle gelir)
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
