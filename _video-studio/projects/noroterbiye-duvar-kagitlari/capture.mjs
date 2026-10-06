// NöroTerbiye — Duvar Kâğıtları — çekimler (masaüstü d-*, mobil m-*)
// Akış: kahraman (01) → dikey akışta kaydırma (12→13→14) → "Kitaptaki izi" (05)
//       → "Yatayını gör" (46) → Temalar (38 → Farklı Nefsler → 21) → sade görünüm (48).
// Not: "Tümü" ızgarası kullanılmadı — küçük resimlerin height özniteliği (1844) aspect-ratio'yu
//      ezdiği için her küçük resim ~1844 px uzunlukta ve boş görünüyor (site hatası, raporlandı).
import { withStudio } from '../../lib/capture.mjs';

const BASE = '/noroterbiye/duvar-kagitlari/';
const ACT = '.wallpaper[aria-current="true"]';

// Etkin karttaki tam çözünürlüklü PNG yüklenene kadar bekle
async function waitArt(p, id) {
  await p.waitForFunction((id) => {
    const c = document.querySelector('.wallpaper[aria-current="true"]');
    const im = c && c.querySelector('.art-image');
    return im && im.dataset.full && im.complete && im.naturalWidth > 0 && (!id || c.getAttribute('aria-label').startsWith(id));
  }, id, { timeout: 30000 });
  await p.evaluate(() => document.querySelector('.wallpaper[aria-current="true"] .art-image').decode().catch(() => {}));
  await p.waitForTimeout(500);
}
// Açık sayfadaki (dialog) görseller yüklensin
async function waitSheet(p) {
  await p.waitForFunction(() => {
    const d = document.querySelector('#sheet');
    if (!d || !d.open) return false;
    const r = d.getBoundingClientRect();
    return [...d.querySelectorAll('img')].filter((i) => { const b = i.getBoundingClientRect(); return b.bottom > r.top && b.top < r.bottom; })
      .every((i) => i.complete && i.naturalWidth > 0);
  }, null, { timeout: 30000 });
  await p.waitForTimeout(700);
}
const blurActive = (p) => p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark }) => {
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const isM = pre === 'm';

    // 1) Kahraman: ilk resim + "Kaydır, sana iyi geleni seç" ipucu (5 sn sonra kaybolur → hemen çek)
    let p = await open(BASE);
    await waitArt(p, '01');
    await shot(p, `${pre}-hero.jpg`);

    // 2) Dikey akış: 12 → 13 → 14
    p = await open(BASE + '?eser=12&gorunum=telefon');
    await waitArt(p, '12');
    if (!isM) await mark(p, `${pre}-akis-12.jpg`, { next: '#next' });
    await shot(p, `${pre}-akis-12.jpg`);
    for (const id of ['13', '14']) {
      if (isM) {
        // dokunmatik kaydırma: akışı bir ekran aşağı kaydır (gerçek scroll-snap akışı)
        await p.evaluate(() => { const f = document.querySelector('.feed'); f.scrollBy({ top: f.clientHeight, behavior: 'smooth' }); });
      } else {
        await p.click('#next');
      }
      await p.waitForTimeout(1200);
      await waitArt(p, id);
      await blurActive(p);
      if (!isM) await mark(p, `${pre}-akis-${id}.jpg`, { next: '#next' });
      await shot(p, `${pre}-akis-${id}.jpg`);
    }

    // 3) Kitaptaki izi: 05 Kaptan Köşkü → kitap sayfası
    p = await open(BASE + '?eser=05&gorunum=telefon');
    await waitArt(p, '05');
    await mark(p, `${pre}-kaptan.jpg`, { trace: `${ACT} .trace`, trace_icon: `${ACT} .trace svg` });
    await shot(p, `${pre}-kaptan.jpg`);
    await p.click(`${ACT} .trace`);
    await waitSheet(p);
    await blurActive(p);
    await mark(p, `${pre}-iz.jpg`, { sheet: '#sheet', question: '#sheet-content p', source: '#sheet-content .source' });
    await shot(p, `${pre}-iz.jpg`);

    // 4) Yatayını gör: 46 Yan Yana → yatay sürüm ve indirme
    p = await open(BASE + '?eser=46&gorunum=telefon');
    await waitArt(p, '46');
    await mark(p, `${pre}-yanyana.jpg`, { yatay: `${ACT} .landscape-option .disc`, indir: `${ACT} .actions a.action .disc` });
    await shot(p, `${pre}-yanyana.jpg`);
    await p.click(`${ACT} .landscape-option`);
    await waitSheet(p);
    await blurActive(p);
    await mark(p, `${pre}-yatay.jpg`, { sheet: '#sheet', preview: '.landscape-preview', indir: '#sheet-content .sheet-link.primary' });
    await shot(p, `${pre}-yatay.jpg`);

    // 5) Temalar: 38 Gecenin Bahçıvanı → tema listesi → "Farklı Nefsler" (21 Aynı Bahçede, 1 / 10)
    p = await open(BASE + '?eser=38&gorunum=telefon');
    await waitArt(p, '38');
    await mark(p, `${pre}-gece.jpg`, { filtre: '#open-filter', sade: `${ACT} .actions .action:last-child .disc` });
    await shot(p, `${pre}-gece.jpg`);
    await p.click('#open-filter');
    await p.waitForTimeout(500);
    await blurActive(p);
    await p.evaluate(() => {
      const b = [...document.querySelectorAll('#sheet-content .sheet-link')].find((x) => x.textContent.trim() === 'Farklı Nefsler');
      b.id = 'tema-farkli';
    });
    await mark(p, `${pre}-temalar.jpg`, { farkli: '#tema-farkli', sheet: '#sheet' });
    await shot(p, `${pre}-temalar.jpg`);
    await p.click('#tema-farkli');
    await p.waitForTimeout(800);
    await waitArt(p, '21');
    await blurActive(p);
    await shot(p, `${pre}-tema.jpg`);

    // 6) Sade gör (48 İz Bırakan — başka sahnede kullanılmayan bir resim): kontroller gizlenir
    p = await open(BASE + '?eser=48&gorunum=telefon');
    await waitArt(p, '48');
    await p.click(`${ACT} .actions .action:last-child`);
    await p.waitForTimeout(600);
    await blurActive(p);
    await shot(p, `${pre}-sade.jpg`);
  }

});
