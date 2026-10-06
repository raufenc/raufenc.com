// Program Rehberim (maarif/#/rehber) — çekimler (masaüstü d-*, mobil m-*)
// Sitenin "Bu Hafta" kartı tarihe göre hesaplanır (dönem 8 Eylül 2025'te başlar, 36 hafta);
// dönem dışı bir tarihte "53. Hafta" gibi anlamsız bir değer gösterdiği için sayfa saati
// dönem içindeki bir güne (9 Aralık 2025 → 13. öğretim haftası: İbadetler) sabitlenir.
import { withStudio, settle } from '../../lib/capture.mjs';

const FAKE_NOW = new Date('2025-12-09T10:00:00+03:00');

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark, origin }) => {
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await open('');
    await p.clock.setFixedTime(FAKE_NOW);
    await p.goto(origin + '/maarif/#/rehber', { waitUntil: 'domcontentloaded' });
    const css = '#rauf-nav{display:none!important} html{scroll-behavior:auto!important}';
    await p.addStyleTag({ content: css });
    const go = async (hash, ms = 900) => {
      await p.evaluate((h) => { location.hash = h; }, hash);
      await p.waitForTimeout(ms); await settle(p, 300);
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(150);
    };
    await p.waitForSelector('.card-grid a.card', { timeout: 15000 });
    await settle(p, 500);

    // 1) Ana sayfa: ders seçimi
    await shot(p, `${pre}-home.jpg`);
    await mark(p, `${pre}-home.jpg`, { fikih: 'a.card[href="#/rehber/fkh"]' });
    if (pre === 'm') {
      // Ders listesi: dört dersin kartı birlikte (yatay intro yan telefonu + dikey intro)
      await p.evaluate(() => {
        const g = document.querySelector('.card-grid');
        const h = g.previousElementSibling || g;
        const hb = document.querySelector('header, .navbar, nav')?.getBoundingClientRect().bottom || 56;
        scrollBy(0, h.getBoundingClientRect().top - hb - 10);
      });
      await p.waitForTimeout(250);
      await shot(p, 'm-dersler.jpg');
      await p.evaluate(() => scrollTo(0, 0));
    }

    // 2) Fıkıh panosu: "Bu Hafta" kartı
    await go('#/rehber/fkh');
    await shot(p, `${pre}-dash.jpg`);
    await mark(p, `${pre}-dash.jpg`, { detay: 'a[href="#/rehber/fkh/haftalik/13"]', buhafta: '#app > .card' });

    // 3) Hafta detayı (13. hafta)
    await go('#/rehber/fkh/haftalik/13');
    await shot(p, `${pre}-hafta.jpg`);
    await mark(p, `${pre}-hafta.jpg`, { akis: 'a[href*="/cikti/FKH.10.3.1"]' });

    // 4) Ders akışı (FKH.10.3.1) — uzun çekim, kaydırma sahnesi
    await go('#/rehber/fkh/unite/3/cikti/FKH.10.3.1', 1200);
    await tallShot(p, `${pre}-akis-uzun.jpg`, { maxScreens: pre === 'd' ? 2.4 : 3 });

    // 5) Teknikler kütüphanesi (#/rehber/fkh/teknikler, rehber.js renderTeknikler) →
    //    "anlam çözümleme tablosu" kartına dokun → kart açılır (adımlar, uygun durumlar,
    //    materyal, kullanıldığı ders akışları)
    await go('#/rehber/fkh/teknikler', 1000);
    await p.waitForSelector('[data-tech-toggle]', { timeout: 15000 });
    const TT = '[data-tech-toggle="0"]';
    const first = await p.locator(TT).innerText();
    if (!/anlam çözümleme tablosu/i.test(first)) throw new Error('ilk teknik beklenen değil: ' + first);
    await p.mouse.move(2, 2); await p.waitForTimeout(200);
    await shot(p, `${pre}-teknikler.jpg`);
    await mark(p, `${pre}-teknikler.jpg`, { teknik: TT });
    await p.click(TT); await p.waitForTimeout(400);
    if (pre === 'm') {
      // açılan kartı yapışkan üst çubuğun hemen altına al (masaüstünde kart ekrana sığar)
      await p.evaluate((sel) => {
        const c = document.querySelector(sel).closest('.card');
        const hb = document.querySelector('header, .navbar, nav')?.getBoundingClientRect().bottom || 56;
        scrollBy(0, c.getBoundingClientRect().top - hb - 12);
      }, TT);
    }
    await p.mouse.move(2, 2); await p.waitForTimeout(300);
    await shot(p, `${pre}-teknik-acik.jpg`);
    await mark(p, `${pre}-teknik-acik.jpg`, { kart: '[data-tech-body="0"]' });

    // 6) Materyaller → görsel filtresi → kitap sayfası
    await go('#/rehber/fkh/materyaller');
    await shot(p, `${pre}-mat.jpg`);
    await mark(p, `${pre}-mat.jpg`, { filtre: '#matFilterTabs .tab[data-filter="gorsel"]' });
    await p.locator('#matFilterTabs .tab[data-filter="gorsel"]').scrollIntoViewIfNeeded();
    await p.click('#matFilterTabs .tab[data-filter="gorsel"]'); await p.waitForTimeout(400);
    // Mobilde sekme şeridi yatay kaydırmalı (kenarlardan kesik görünür) → kartlara kaydır
    await p.evaluate((m) => {
      scrollTo(0, 0);
      if (m) { const c = document.querySelector('.mat-card[data-type="gorsel"]'); scrollBy(0, c.getBoundingClientRect().top - 72); }
    }, pre === 'm');
    await p.mouse.move(2, 2); await p.waitForTimeout(250);
    await shot(p, `${pre}-mat-gorsel.jpg`);
    const target = '.mat-card[data-type="gorsel"][href$="/kitap/77"]';
    await mark(p, `${pre}-mat-gorsel.jpg`, { kart: target });
    const href = await p.locator(target).first().getAttribute('href');
    await go(href, 1200);
    await p.waitForFunction(() => { const i = document.getElementById('pageImg'); return i && i.complete && i.naturalWidth > 0; }, null, { timeout: 10000 });
    await p.waitForTimeout(300);
    await shot(p, `${pre}-kitap.jpg`);
    await mark(p, `${pre}-kitap.jpg`, { sayfa: '#pageImg' });
    // Okumaya geçiş: sayfa görselini üst çubuğun altına kaydır (denetim satırı kadraj dışı)
    await p.evaluate(() => {
      const i = document.getElementById('pageImg');
      const hb = document.querySelector('header, .navbar, nav')?.getBoundingClientRect().bottom || 56;
      scrollBy(0, i.getBoundingClientRect().top - hb - 8);
    });
    await p.waitForTimeout(250);
    await shot(p, `${pre}-kitap-oku.jpg`);
    console.log(pre, 'kitap', href);
  }
});
