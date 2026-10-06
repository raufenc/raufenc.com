// Arapça Kelime Kartları — çekimler (masaüstü d-*, mobil m-*)
//
//  hero        : Arama sekmesi → "Karıştır" → 224 kartlık ızgara (karışık; her görselin altında harekeli Arapça)
//  ara → kart  : aramaya "günaydın" yaz → Günaydın kartına dokun → büyük kart (صَبَاحُ الخَيْرِ)
//  kategoriler → duygu : 18 kategori → "Duygular & Haller"a dokun → tam ekran akış (1 / 26)
//  kesfet → akis-1/2/3 : "Keşfetmeye Başla" → karışık akış, kart kart kaydırma (1 / 224 → 3 / 224)
//                        tohum 10 → Dişlerini fırçala · Öğrenebiliriz · Kar yağıyor (Arapçaları gözle denetlendi)
//  yan         : "Selamlaşma & Nezaket" akışının 6. kartı (Teşekkür ederim · شُكْرًا لَكَ) — yatayda yan telefon (yalnız mobil)
//
// Masaüstü akışta "Kaydır" ipucu (#feed-hint) kartın altındaki Arapça levhanın üstüne biniyor → masaüstü
// akış çekimlerinde gizlenir (ipucu ilk kaydırmada zaten kayboluyor). Mobilde levhanın altında kaldığı için durur.
//
// Keşfet kaydırma şeridi (akis-1 + akis-2 alt alta) sabit katmanları içerikle birlikte kaydırırdı → akis-1/2/3
// çekimlerinde sabit katmanlar (sayaç, ses, kapat, ipucu) gizlenir; şerit ve sonraki kart aynı temiz görünümde.
// Masaüstü d-duygu'da ✕ ve 🔊 karttan çok uzakta, ekranın sağ kıyısında kalıyor ve motorun eğik tarayıcı
// çerçevesinde kesik görünüyordu → yalnız masaüstünde gizlenir (sayaç "1 / 26" kalır). Mobil m-duygu olduğu gibi.
//
// Karıştırma Math.random ile yapılıyor → çekimler yeniden üretilebilsin diye sabit tohumlu üreteç.
// Arapça yazılar kart görsellerinin içinde; seçilen tohumlarla gelen kartların yazıları tek tek gözle denetlendi.
import { spawnSync } from 'node:child_process';
import { withStudio } from '../../lib/capture.mjs';

const BASE = '/arapca-kelime/';
const SEED = (seed) => { let a = seed >>> 0; Math.random = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const SEED_GRID = Number(process.env.SEED_GRID || 16);
const SEED_FEED = Number(process.env.SEED_FEED || 10);
const ONLY = process.env.ONLY || '';           // ör. ONLY=hero,kesfet → yalnız bu bölümler
const want = (k) => !ONLY || ONLY.split(',').includes(k);

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
  const noChrome = (p) => p.addStyleTag({ content: '#feed-counter,#feed-sound-btn,.feed-close,#feed-hint{visibility:hidden!important}' });
  const noSide = (p, pre) => (pre === 'd' ? p.addStyleTag({ content: '#feed-sound-btn,.feed-close{visibility:hidden!important}' }) : Promise.resolve());
  const noHint = (p, pre) => (pre === 'd' ? p.addStyleTag({ content: '#feed-hint{display:none!important}' }) : Promise.resolve());
  const katNth = (p, title) => p.evaluate((t) => [...document.querySelectorAll('.kat-card .kat-title')].findIndex((e) => e.textContent.trim() === t) + 1, title);

  for (const [pre, dev] of [['d', desktop], ['m', mobile]]) {
    // ── 1) Kahraman: Arama → Karıştır (resimli kart ızgarası) ──
    if (want('hero')) {
      const p = await open(dev, SEED_GRID);
      await p.click('.tab[data-tab="arama"]');
      await p.waitForTimeout(300);
      await p.click('.shuffle-btn');
      await away(p, pre);
      await p.waitForTimeout(1200);
      console.log(pre, 'ızgara:', await p.evaluate(() => [...document.querySelectorAll('#grid .card-img')].slice(0, 12).map((i) => `${i.alt} [${i.getAttribute('src')}]`).join(', ')));
      await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await waitImgs(p, '#grid img');
      await shot(p, `${pre}-hero.jpg`);
      if (pre === 'm') {
        await p.evaluate(() => document.querySelectorAll('#grid img').forEach((i, k) => { if (k < 16) i.loading = 'eager'; }));
        await p.evaluate(async () => { for (let y = 0; y < 2600; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); });
        await p.waitForTimeout(600);
        await p.waitForFunction(() => [...document.querySelectorAll('#grid img')].slice(0, 10).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 30000 });
        await p.waitForTimeout(400);
        await tallShot(p, 'm-hero-uzun.jpg', { maxScreens: 2 });
      }
    }

    // ── 2) Arama: "günaydın" → Günaydın → büyük kart ──
    if (want('ara')) {
      const p = await open(dev);
      await p.click('.tab[data-tab="arama"]');
      await p.waitForTimeout(400);
      await p.click('#search');
      await p.type('#search', 'günaydın', { delay: 60 });
      await p.waitForTimeout(900);
      await away(p, pre);
      await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await p.waitForTimeout(200);
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
    }

    // ── 3) Kategoriler → Duygular & Haller → akış ──
    if (want('kat')) {
      const p = await open(dev);
      await away(p, pre);
      await p.waitForTimeout(400);
      const n = await katNth(p, 'Duygular & Haller');
      await mark(p, `${pre}-kategoriler.jpg`, { duygu: `.kat-card:nth-child(${n})`, grid: '.kat-grid' });
      await shot(p, `${pre}-kategoriler.jpg`);
      await noHint(p, pre);
      await noSide(p, pre);
      await p.click(`.kat-card:nth-child(${n})`);
      await p.waitForTimeout(500);
      await feedImgs(p);
      await away(p, pre);
      console.log(pre, 'duygu akışı:', await p.evaluate(() => document.getElementById('feed-counter').textContent));
      await mark(p, `${pre}-duygu.jpg`, pre === 'm' ? { kart: '.feed-slide[data-index="0"] img', ses: '#feed-sound-btn' } : { kart: '.feed-slide[data-index="0"] img' });
      await shot(p, `${pre}-duygu.jpg`);
    }

    // ── 4) Keşfet → karışık akış, kaydırma ──
    if (want('kesfet')) {
      const p = await open(dev, SEED_FEED);
      await p.click('.tab[data-tab="kesfet"]');
      await p.waitForTimeout(600);
      await away(p, pre);
      await mark(p, `${pre}-kesfet.jpg`, { basla: '.kesfet-start-btn' });
      await shot(p, `${pre}-kesfet.jpg`);
      await noChrome(p);
      await p.click('.kesfet-start-btn');
      await p.waitForTimeout(500);
      await feedImgs(p);
      await away(p, pre);
      console.log(pre, 'akış:', await p.evaluate(() => [...document.querySelectorAll('.feed-slide img')].slice(0, 4).map((i) => `${i.alt} [${i.getAttribute('src')}]`).join(', ')));
      await shot(p, `${pre}-akis-1.jpg`);
      for (const k of [2, 3]) {
        await p.evaluate((k) => { const f = document.getElementById('kesfet-feed'); f.scrollTo({ top: f.clientHeight * (k - 1), behavior: 'auto' }); }, k);
        await p.waitForTimeout(700);
        await feedImgs(p);
        console.log(pre, 'sayaç:', await p.evaluate(() => document.getElementById('feed-counter').textContent));
        await shot(p, `${pre}-akis-${k}.jpg`);
      }
    }

    // ── 5) Selamlaşma akışı, 6. kart: Teşekkür ederim (yan telefon / ek kart) ──
    if (want('yan') && pre === 'm') {
      const p = await open(dev);
      const n = await katNth(p, 'Selamlaşma & Nezaket');
      await p.click(`.kat-card:nth-child(${n})`);
      await p.waitForTimeout(500);
      await p.evaluate(() => { const f = document.getElementById('kesfet-feed'); f.scrollTo({ top: f.clientHeight * 5, behavior: 'auto' }); });
      await p.waitForTimeout(800);
      await feedImgs(p);
      await away(p, pre);
      console.log(pre, 'yan:', await p.evaluate(() => document.getElementById('feed-counter').textContent));
      await shot(p, `${pre}-yan.jpg`);
    }
  }

  // Kaydırma şeritleri: akış 1 → 2 → shots/m-akis.jpg ve shots/d-akis.jpg (3. kart ayrı çekim olarak gelir)
  if (want('kesfet')) {
    for (const pre of ['m', 'd']) {
      const r = spawnSync('python3', ['-c', `
import sys
from PIL import Image
fs=sys.argv[2:]; ims=[Image.open(f).convert('RGB') for f in fs]; w,h=ims[0].size
S=Image.new('RGB',(w,h*len(ims)))
for i,im in enumerate(ims): S.paste(im,(0,h*i))
S.save(sys.argv[1],quality=90)
`, out(`${pre}-akis.jpg`), out(`${pre}-akis-1.jpg`), out(`${pre}-akis-2.jpg`)], { stdio: 'inherit' });
      if (r.status !== 0) throw new Error('şerit birleştirilemedi');
    }
  }
});
