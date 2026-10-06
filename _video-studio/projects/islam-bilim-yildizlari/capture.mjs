// İslam Bilim Yıldızları — çekimler (masaüstü d-*, mobil m-*)
// Düzeltme turu 1:
//  - mobilde üstte 47px güvenli alan (Dynamic Island sekme çubuğunu örtmesin)
//  - hero: sitenin '7-19' sayacı parseInt yüzünden '7' yazıyor → sayaç bitince '7–19' yazılır
//  - alimler: uzun çekim (filtrelerden kartlara kaydırma)
//  - harita: Endülüs dahil görünüm + Endülüs kümesine dokunma → yakın görünüm
//  - Bu Kim?: ilk tur Cezerî (kancadaki sorunun cevabı), ipuçları açılır, doğru cevap seçilir
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark }) => {
  const prep = (p, pre) => p.addStyleTag({
    content: '#rauf-nav{display:none!important}' +
      (pre === 'm' ? '.site-header{padding-top:47px!important}' : ''),
  });

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    // ── ana sayfa ──
    let p = await open('/islam-bilim-yildizlari/');
    await prep(p, pre); await p.waitForTimeout(2200);
    await p.evaluate(() => {
      const e = document.querySelector('[data-count="7-19"]');
      if (e) e.textContent = '7–19';
    });
    await p.waitForTimeout(200);
    await shot(p, `${pre}-hero.jpg`);

    // ── keşfet (uzun çekim: başlık+filtreler → kartlar) ──
    p = await open('/islam-bilim-yildizlari/alimler.html');
    await prep(p, pre); await p.waitForTimeout(900);
    await tallShot(p, `${pre}-alimler.jpg`, { maxScreens: pre === 'd' ? 2 : 3 });

    // ── harita ──
    p = await open('/islam-bilim-yildizlari/harita.html');
    await prep(p, pre); await p.waitForTimeout(1200);
    await p.evaluate((pre) => {
      if (pre === 'd') map.setView([35, 29], 4, { animate: false });
      else { map.options.zoomSnap = 0.1; map.setView([35.5, 18], 2.9, { animate: false }); }
    }, pre);
    await p.waitForTimeout(2500);
    // en batıdaki küme = Endülüs
    await p.evaluate(() => {
      const box = document.querySelector('#map-container').getBoundingClientRect();
      const cl = [...document.querySelectorAll('.marker-cluster')]
        .map((e) => [e, e.getBoundingClientRect()])
        .filter(([, r]) => r.left >= box.left && r.right <= box.right && r.top >= box.top && r.bottom <= box.bottom)
        .sort((a, b) => a[1].left - b[1].left);
      if (cl[0]) cl[0][0].id = 'endulus-cl';
    });
    await shot(p, `${pre}-harita.jpg`);
    await mark(p, `${pre}-harita.jpg`, { map: '#map-container', endulus: '#endulus-cl', chip: '.map-stat' });
    // Endülüs kümesinin üzerinde yakınlaştır (tekerlek/çimdik yakınlaştırması gibi)
    await p.evaluate((pre) => {
      const r = document.querySelector('#endulus-cl').getBoundingClientRect();
      const c = map.getContainer().getBoundingClientRect();
      const ll = map.containerPointToLatLng([r.left + r.width / 2 - c.left, r.top + r.height / 2 - c.top]);
      map.options.zoomSnap = 1;
      map.setView([ll.lat + 0.3, ll.lng + (pre === 'd' ? 0.2 : 0.7)], 6, { animate: false });
    }, pre);
    await p.waitForTimeout(2600);
    await shot(p, `${pre}-harita2.jpg`);
    await p.evaluate(() => { const cs = [...document.querySelectorAll('.marker-cluster')].filter((e) => e.textContent.trim() === '6'); if (cs[0]) cs[0].id = 'kurtuba-cl'; });
    await mark(p, `${pre}-harita2.jpg`, { map: '#map-container', kurtuba: '#kurtuba-cl' });

    // ── sınav → Bu Kim? (Cezerî turu) ──
    p = await open('/islam-bilim-yildizlari/sinav.html');
    await prep(p, pre); await p.waitForTimeout(900);
    await shot(p, `${pre}-sinav.jpg`);
    await mark(p, `${pre}-sinav.jpg`, { bukim: '.game-card' });
    await p.locator('.game-card').first().click();
    await p.waitForTimeout(500);
    await p.evaluate(() => {
      const c = BILGINLER.find((b) => b.id === 26);
      bkScholars = [c, ...bkScholars.filter((b) => b.id !== 26)].slice(0, 10);
      bkRound = 0; bkScore = 0;
      nextBkRound();
    });
    await p.waitForTimeout(400);
    await p.click('#bk-reveal'); await p.waitForTimeout(450);
    await p.click('#bk-reveal'); await p.waitForTimeout(700);
    await p.evaluate(() => {
      const b = [...document.querySelectorAll('#bk-options .option-btn')].find((x) => x.textContent.trim() === 'Cezerî');
      if (b) b.id = 'opt-cezeri';
    });
    await shot(p, `${pre}-bukim.jpg`);
    await mark(p, `${pre}-bukim.jpg`, { cezeri: '#opt-cezeri', clue3: '#clue-2' });
    await p.click('#opt-cezeri');
    await p.waitForTimeout(450);
    await shot(p, `${pre}-bukim2.jpg`);
    await mark(p, `${pre}-bukim2.jpg`, { cezeri: '#opt-cezeri', clue3: '#clue-2' });
  }
});
