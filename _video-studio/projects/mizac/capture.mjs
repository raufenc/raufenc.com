// Dokuz Tip Mizaç Testi — çekimler (masaüstü d-*, mobil m-*)
//
// Akış: giriş ekranı (Dengeli · 45 soru) → "Teste Başla" → 45 soru kaydırıcı sürüklenerek
// GERÇEKTEN cevaplanır → sitenin kendi puanlaması → sonuç: baskın tip, kanat, okuma güveni,
// enneagram haritası (gelişim/stres okları), dokuz tip dağılımı.
//
// Notlar
// - Cevaplar her soruda kaydırıcının başparmağı sürüklenerek verilir (mouse down → move → up;
//   'change' olayı sitenin answer() akışını tetikler). Sitenin hız denetimi (<850 ms "çok hızlı")
//   tetiklenmesin diye her soruda ~1 sn beklenir → okuma güveni bayraksız çıkar.
// - Cevap planı: 4 (Özgün) güçlü, 5 (Araştırmacı) ikinci, diğerleri dağınık; ters maddeler
//   ters yönde cevaplanır. Sonuç sitenin computeScores() koduyla yerelde hesaplanır.
// - Sohbet bölümü /api/mizac-sohbet ister (çevrimdışı) → hiç kullanılmaz, çekime girmez.
// - Giriş ekranındaki amblem 90 sn'lik dekoratif dönüşte; çizgiler düğümlerle hizalı olsun diye
//   dönüş başlangıç karesinde durdurulur (yalnız çekimde).
// - Mobilde sitenin '1–5 tuşlarıyla da cevaplayabilirsin' klavye ipucu dokunmatik ekranda anlamsız
//   olduğundan yalnız mobil çekimde gizlenir (.kbd-hint).
// - Simge: sitenin kendi uygulama simgesi (mizac/icon-512.png) koyu zemini ayıklanarak shots/logo.png.
import fs from 'node:fs';
import path from 'node:path';
import { withStudio } from '../../lib/capture.mjs';

// hedef katılım yüzdeleri: n = normal maddeler (sırayla), r = ters madde
const PLAN = {
  4: { n: [100, 92, 96, 88], r: 6 },
  5: { n: [82, 70, 78, 64], r: 28 },
  3: { n: [74, 40, 68, 30], r: 52 },
  1: { n: [66, 20, 70, 28], r: 60 },
  6: { n: [55, 18, 64, 24], r: 70 },
  9: { n: [40, 70, 15, 30], r: 76 },
  2: { n: [30, 58, 12, 26], r: 72 },
  7: { n: [20, 45, 8, 36], r: 80 },
  8: { n: [10, 30, 22, 6], r: 88 },
};
const SORU_CEKIM = 22; // 23. soru (Tip 4: "Duygularım derin ve yoğundur…") → %92

const CSS = [
  '#rauf-nav{display:none!important}',
  '.emblem .spin{animation:none!important}',
  'html{scroll-behavior:auto!important}',
].join('\n');

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, dir }) => {
  const shotsDir = path.join(dir, 'shots');
  const marksFile = path.join(shotsDir, 'marks.json');
  const log = {};

  // kaydırıcı başparmağının merkezini işaret olarak yaz (çekimden sonra, sayfa değişmeden)
  async function markThumb(p, shotName, thumbW) {
    const r = await p.evaluate((tw) => {
      const el = document.getElementById('scale-range');
      const b = el.getBoundingClientRect();
      const v = +el.value;
      const x = b.left + tw / 2 + (b.width - tw) * v / 100;
      const y = b.top + b.height / 2;
      return { x: x / innerWidth, y: y / innerHeight, w: tw / innerWidth, h: 42 / innerHeight };
    }, thumbW);
    let all = {};
    try { all = JSON.parse(fs.readFileSync(marksFile, 'utf8')); } catch {}
    all[shotName] = Object.assign(all[shotName] || {}, { thumb: r });
    fs.writeFileSync(marksFile, JSON.stringify(all, null, 2));
  }

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const isM = pre === 'm';
    const thumbW = isM ? 54 : 58;
    const p = await open('/mizac/');
    await p.addStyleTag({ content: CSS });
    // dokunmatik cihazda klavye ipucu anlamsız → yalnız mobil çekimde gizlenir
    if (isM) await p.addStyleTag({ content: '.kbd-hint{display:none!important}' });

    // ── simge (bir kez) ──
    if (!isM) {
      const data = await p.evaluate(async () => {
        const im = new Image(); im.src = '/mizac/icon-512.png'; await im.decode();
        const S = 400, O = 56; // enneagram çemberi + düğümler
        const c = document.createElement('canvas'); c.width = S; c.height = S;
        const g = c.getContext('2d'); g.drawImage(im, -O, -O);
        const d = g.getImageData(0, 0, S, S), a = d.data, bg = [22, 22, 29];
        for (let i = 0; i < a.length; i += 4) {
          const dist = Math.max(Math.abs(a[i] - bg[0]), Math.abs(a[i + 1] - bg[1]), Math.abs(a[i + 2] - bg[2]));
          const al = Math.max(0, Math.min(1, (dist - 8) / 60)) * (a[i + 3] / 255);
          if (al > 0) for (let k = 0; k < 3; k++) a[i + k] = Math.max(0, Math.min(255, (a[i + k] - bg[k] * (1 - al)) / al));
          a[i + 3] = Math.round(al * 255);
        }
        g.putImageData(d, 0, 0);
        return c.toDataURL('image/png');
      });
      fs.writeFileSync(path.join(shotsDir, 'logo.png'), Buffer.from(data.split(',')[1], 'base64'));
    }

    // ── 1) giriş ──
    await p.waitForTimeout(1600); // giriş animasyonları
    await p.mouse.move(1, 1);
    await shot(p, `${pre}-giris.jpg`);
    await mark(p, `${pre}-giris.jpg`, { baslat: '#start-btn', uzunluk: '#len-pick', kimin: '#audience-pick', amblem: '#intro-emblem' });

    // ── 2) test: 45 soruyu sürükleyerek cevapla ──
    if (isM) await p.tap('#start-btn'); else await p.click('#start-btn');
    await p.waitForFunction(() => document.getElementById('test').classList.contains('active'));
    const total = await p.evaluate(() => +document.getElementById('q-tot').textContent);
    log[pre] = { total, answers: [] };
    const used = {};
    for (let i = 0; i < total; i++) {
      await p.waitForFunction((n) => +document.getElementById('q-cur').textContent === n + 1
        && !document.getElementById('q-card').classList.contains('out-l'), i);
      await p.waitForTimeout(950);
      const q = await p.evaluate(() => {
        const s = document.getElementById('q-text').textContent;
        const Q = window.MIZAC.SORULAR.find((x) => x.metin === s);
        return { tip: Q.tip, ters: !!Q.ters, s };
      });
      const pl = PLAN[q.tip]; used[q.tip] = used[q.tip] || 0;
      const pc = q.ters ? pl.r : pl.n[used[q.tip]++];
      const box = await p.locator('#scale-range').boundingBox();
      const cur = await p.evaluate(() => +document.getElementById('scale-range').value);
      const X = (v) => box.x + thumbW / 2 + (box.width - thumbW) * v / 100;
      const y = box.y + box.height / 2;
      await p.mouse.move(X(cur), y);
      await p.mouse.down();
      await p.mouse.move(X(pc), y, { steps: 8 });
      // başparmak genişliği tahmini ±1 sapabilir → bırakmadan önce sürüklemeyi düzelt
      // (masaüstü ve mobil aynı cevap planıyla birebir aynı değerleri versin)
      for (let k = 0, px = X(pc); k < 8; k++) {
        const now = await p.evaluate(() => +document.getElementById('scale-range').value);
        if (now === pc) break;
        px += (pc - now) * (box.width - thumbW) / 100 * 0.6;
        await p.mouse.move(px, y);
      }
      if (i === SORU_CEKIM || i === total - 1) {
        const name = i === SORU_CEKIM ? `${pre}-soru.jpg` : `${pre}-son.jpg`;
        await p.waitForTimeout(350);
        await shot(p, name);
        await markThumb(p, name, thumbW);
        await mark(p, name, { kaydirici: '#scale-shell', soru: '#q-text', ilerleme: '#prog-bar', okuma: '#scale-readout' });
        log[pre][name] = { soru: q.s, okuma: await p.evaluate(() => document.getElementById('scale-readout').textContent) };
      }
      await p.mouse.up();
      const v = await p.evaluate(() => +document.getElementById('scale-range').value);
      log[pre].answers.push([q.tip, q.ters ? 'R' : 'N', pc, v]);
    }

    // ── 3) sonuç ──
    await p.waitForFunction(() => document.getElementById('result').classList.contains('active'), null, { timeout: 15000 });
    await p.mouse.move(1, 1);
    await p.waitForTimeout(2800); // sayı/glif/harita çizimi ve çubuk animasyonları
    await shot(p, `${pre}-sonuc.jpg`);
    await mark(p, `${pre}-sonuc.jpg`, { sayi: '.res-bignum', ad: '#res-name', kahraman: '.res-hero', guven: '.res-read' });

    // ── 4) harita + dağılım (uzun çekim, haritanın üstünden başlar) ──
    const geo = await p.evaluate(() => {
      const r = document.querySelector('.res-map').getBoundingClientRect();
      const prev = document.querySelector('.res-map').previousElementSibling;
      const pb = prev ? prev.getBoundingClientRect().bottom + scrollY : 0;
      return { top: r.top + scrollY, prevBottom: pb, vw: innerWidth, vh: innerHeight, full: document.documentElement.scrollHeight };
    });
    // mobilde üstte ~70 px pay: enneagramın '9' düğümü telefon çerçevesindeki Dynamic Island'ın altında kalmasın
    const y0 = Math.max(0, Math.round(geo.top - (isM ? 70 : 14)), isM ? Math.ceil(geo.prevBottom + 3) : 0); // üstteki kartın kenarı girmesin
    const h = Math.min(geo.full - y0, Math.round(geo.vh * (isM ? 2.0 : 2.6)));
    await shot(p, `${pre}-harita-uzun.jpg`, { fullPage: true, clip: { x: 0, y: y0, width: geo.vw, height: h }, quality: 88 });
    // tek ekranlık harita çekimi (yedek) + işaretler
    await p.evaluate((yy) => window.scrollTo(0, yy), y0);
    await p.waitForTimeout(300);
    await shot(p, `${pre}-harita.jpg`);
    await mark(p, `${pre}-harita.jpg`, { harita: '.res-map svg', dagilim: '#scores' });

    log[pre].sonuc = await p.evaluate(() => JSON.parse(localStorage.getItem('mizac-sonuc')));
    log[pre].hero = await p.evaluate(() => ({
      sayi: document.querySelector('.res-bignum').textContent,
      ad: document.getElementById('res-name').textContent,
      unvan: document.querySelector('.res-unvan').textContent,
      conf: document.querySelector('.res-conf').textContent,
      guven: document.querySelector('.read-score').textContent,
      legend: document.querySelector('.map-legend').textContent,
    }));
    log[pre].overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    log[pre].uzunCekim = { y0, h, mapTop: geo.top, prevBottom: geo.prevBottom };
  }

  // veri doğrulaması (storyboard _kaynak için)
  const v = await (await desktop('/mizac/')).evaluate(() => {
    const M = window.MIZAC;
    return {
      tip: Object.keys(M.TIPLER).length,
      merkez: Object.keys(M.MERKEZLER).length,
      soru: M.SORULAR.length,
      ters: M.SORULAR.filter((q) => q.ters).length,
      uzunluk: [...document.querySelectorAll('#len-pick button')].map((b) => b.textContent.trim()),
      kimin: [...document.querySelectorAll('#audience-pick b')].map((b) => b.textContent),
      meta: document.querySelector('.intro-meta').textContent.trim(),
    };
  });
  log.veri = v;
  fs.writeFileSync(path.join(shotsDir, 'log.json'), JSON.stringify(log, null, 2));
  console.log(JSON.stringify({ veri: v, d: log.d.hero, m: log.m.hero, dOver: log.d.overflow, mOver: log.m.overflow, dSoru: log.d['d-soru.jpg'], mSoru: log.m['m-soru.jpg'], dSon: log.d['d-son.jpg'], mSon: log.m['m-son.jpg'], pctD: log.d.sonuc.scores.pct, pctM: log.m.sonuc.scores.pct, q: log.d.sonuc.scores.quality }, null, 1));
});
