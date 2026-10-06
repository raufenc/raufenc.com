// İHO 7. Sınıf Arapça Oyunları — çekimler (masaüstü d-*, mobil m-*, kart c-*)
//
//  home   : ana sayfa (4 ünite + etkileşimli videolar) → Ünite 1'e dokun → 12 oyunluk ızgara
//  flappy : "طائر الكلمات" — gerçek oyun, otomatik pilotla oynanır; kuş doğru resmin kapısına uçar.
//           Tuval tam ekrana gerilir (1280×720 → pencere), bu yüzden masaüstü 16:9 (1600×900) açılır;
//           dikey telefonda tuval bozuk görünür → dikey için masaüstü çekimden kare kırpım (c-*.jpg, card).
//  yol    : "إِلى المُسْتَشْفى" — iki kişilik mod: soru → 1. oyuncu doğruyu seçer → 2. oyuncu seçer → sonuç.
import { withStudio } from '../../lib/capture.mjs';

const CORRECT = 'اِمْشِ إِلى الأَمام قَليلًا';     // 1. adımın doğru cevabı (STEPS[0].correct)
const WRONG = 'اِنْزِلْ أَمام المُسْتَشْفى';       // 2. oyuncunun (yanlış) seçimi
const CARD = { x: 340, y: 0, width: 880, height: 900 };  // dikey kart kırpımı (≈kare: kelime paneli + kapı + kuş; sağdaki dekoratif ay dairesi x≈1240+ dışarıda)
const BIRD_X = 530;   // kuşu tuvalde sağa al (oyun 180) → doğru kapı geçişte görüntünün ~%33'ünde kalır
// Telefon çerçevesinin dinamik adası üst ~50 px'i örter → mobil çekimlerde üstte güvenli boşluk
const SAFE_TOP = 56;

// Oyunlar Math.random ile karıştırıyor → çekimler yeniden üretilebilsin diye sabit tohumlu üreteç
const SEED = (seed) => { let a = seed >>> 0; Math.random = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, settle, origin }) => {
  const openSeeded = async (open, url, seed, extra) => {
    const p = await open(null, extra);
    await p.addInitScript(SEED, seed);
    await p.goto(origin + url, { waitUntil: 'domcontentloaded' });
    await settle(p);
    return p;
  };
  const away = (p, pre) => p.mouse.move(pre === 'd' ? 1435 : 385, pre === 'd' ? 6 : 840).catch(() => {});

  // ── 1) Ana sayfa → Ünite 1 ──
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await open('/7sinif/');
    await p.waitForTimeout(1600);                       // fadeUp girişleri bitsin
    await shot(p, `${pre}-home.jpg`);
    await mark(p, `${pre}-home.jpg`, { u1: '.unit.u1 .unit-ar' });
    await p.click('.unit.u1');
    await p.waitForURL('**/7sinif/1/');
    await p.waitForTimeout(1500);
    // mobil: üst etiket adanın altında kalmasın; masaüstü: 3 boş 'قريبا · Yeni oyun' yer tutucusu kadraja girmesin
    if (pre === 'm') await p.evaluate((px) => { document.body.style.paddingTop = px + 'px'; }, SAFE_TOP);
    else await p.addStyleTag({ content: '.tile.soon{visibility:hidden}' });
    await p.waitForTimeout(300);
    await away(p, pre);
    await p.waitForTimeout(400);
    // (mobilde uzun çekim yerine ilk ekran: sayfa arka planı 100dvh'de tekrarlanıp ek yeri görünüyor)
    await shot(p, `${pre}-unite1.jpg`);
    await mark(p, `${pre}-unite1.jpg`, { grid: '.grid', flappy: 'a[href$="flappy.html"]', t1: '.tile:nth-child(1)' });
  }

  // ── 2) Kelime kuşu (flappy) ──
  {
    const p = await openSeeded(desktop, '/7sinif/oyunlar/unit1/flappy.html', 7, { viewport: { width: 1600, height: 900 } });
    await p.waitForTimeout(900);
    await p.click('.level-btn[data-level="normal"]');
    await p.waitForTimeout(200);
    await p.click('#startBtn');
    // otomatik pilot + dondurma: oyun döngüsünü (requestAnimationFrame) koşul sağlanınca durdur
    await p.evaluate((BX) => {
      const raf = window.requestAnimationFrame.bind(window);
      window.__pending = []; window.__frozen = false; window.__cond = null;
      window.requestAnimationFrame = (cb) => raf((t) => {
        if (window.__frozen) { window.__pending.push(cb); return; }
        cb(t);
        if (window.__cond && window.__cond()) { window.__frozen = true; window.__cond = null; window.__res && window.__res(); }
      });
      window.__freezeWhen = (fn) => new Promise((res) => { window.__res = res; window.__cond = fn; });
      window.__resume = () => { window.__frozen = false; const q = window.__pending; window.__pending = []; q.forEach((cb) => raf(cb)); };
      const pilot = () => {
        const o = currentObstacle();
        if (state.running) state.bird.x = BX;
        if (o && state.running) { const y = laneCenters()[o.correctIndex]; state.bird.velocity = 0; state.bird.y += (y - state.bird.y) * 0.12; }
        requestAnimationFrame(pilot);
      };
      pilot();
    }, BIRD_X);
    // A: üçüncü kapıya girerken (puan 2), kuş doğru şeritte; bir önceki kapı ekran dışında
    await p.evaluate((BX) => window.__freezeWhen(() => { const o = currentObstacle(); return state.score >= 2 && o && o.x < BX + 130 && o.x > BX + 80 && Math.abs(state.bird.y - laneCenters()[o.correctIndex]) < 6; }), BIRD_X);
    await p.waitForTimeout(150);
    await shot(p, 'd-flappy-a.jpg');
    await shot(p, 'c-flappy-a.jpg', { clip: CARD });
    // B: kapıdan geçtiği kare → yeşil "الصحيح" parlaması, puan 3.
    // Oyun aynı karede kelime kutusunu sıradaki kelimeye geçirir; kutu bu tek kare için geçilen kapının
    // kelimesini göstersin (bir önceki karede ekranda olan kelime) → resim ile kelime eşleşir.
    await p.evaluate(() => { window.__resume(); return window.__freezeWhen(() => state.score >= 3 && state.obstacles.some((o) => o.checked && o.flash > 0.9)); });
    await p.evaluate(() => {
      const o = state.obstacles.filter((x) => x.checked && x.flash > 0.8).pop();
      document.querySelector('#currentWord').textContent = o.target.word;
      window.__passed = { word: o.target.word, x: o.x / 1280, y: laneCenters()[o.correctIndex] / 720 };
    });
    await p.waitForTimeout(150);
    await shot(p, 'd-flappy-b.jpg');
    await shot(p, 'c-flappy-b.jpg', { clip: CARD });
    console.log('flappy:', await p.evaluate(() => ({ score: state.score, word: document.querySelector('#currentWord').textContent, passed: window.__passed })));
  }

  // ── 3) Hastaneye yolculuk — iki kişi ──
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await openSeeded(open, '/7sinif/3/hastaneye-yolculuk/', 3);
    await p.waitForTimeout(900);
    // mobil: skor kutuları adanın altında kalmasın; #app 100dvh esnek sütun → sahne kendiliğinden kısalır
    if (pre === 'm') await p.addStyleTag({ content: `#app{box-sizing:border-box;padding-top:${SAFE_TOP}px;padding-bottom:64px}` });
    await p.click('.big-btn[data-mode="2"]');
    // giriş klibi bu tarayıcıda (H.264 yok) hata verip atlanır → 1. adım poster + seçenekler
    await p.waitForSelector('#grid1 .popt', { timeout: 15000 });
    await p.waitForTimeout(1200);
    await away(p, pre);
    const idx = await p.evaluate(({ c, w }) => {
      const t = (sel) => [...document.querySelectorAll(sel)].map((b) => b.textContent);
      return { c1: t('#grid1 .popt').indexOf(c), w2: t('#grid2 .popt').indexOf(w) };
    }, { c: CORRECT, w: WRONG });
    const s1 = `#grid1 .popt:nth-child(${idx.c1 + 1})`, s2 = `#grid2 .popt:nth-child(${idx.w2 + 1})`;
    await shot(p, `${pre}-yol-a.jpg`);
    await mark(p, `${pre}-yol-a.jpg`, { p1: s1, p2: s2, poster: '#stage' });
    await p.click(s1);
    await p.waitForTimeout(450);
    await away(p, pre);
    await p.waitForTimeout(150);
    await shot(p, `${pre}-yol-b.jpg`);
    await mark(p, `${pre}-yol-b.jpg`, { p1: s1, p2: s2 });
    await p.click(s2);
    await p.waitForTimeout(600);                         // doğru iki tarafta yeşil + "اللّاعِب ١ ✓"
    await away(p, pre);
    await p.waitForTimeout(100);
    await shot(p, `${pre}-yol-c.jpg`);
    await mark(p, `${pre}-yol-c.jpg`, { fb: '#fb', stage: '#stage' });
  }
});
