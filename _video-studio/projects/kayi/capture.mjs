// Kayı I — Ertuğrul'un Ocağı — çekimler (masaüstü d-*, mobil m-*)
import fs from 'node:fs';
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark: rawMark, out }) => {
  // Mobilde sayfa yatay taşdığı için (soy ağacı, ~595px) innerWidth/innerHeight şişiyor ve
  // mark() oranları kayıyor. Kaydedilen değerleri gerçek görüntü alanına (390×844) göre düzelt.
  const mark = async (p, name, sels) => {
    const r = await rawMark(p, name, sels);
    const vp = p.viewportSize();
    const { iw, ih } = await p.evaluate(() => ({ iw: innerWidth, ih: innerHeight }));
    const fx = iw / vp.width, fy = ih / vp.height;
    if (Math.abs(fx - 1) < 0.01 && Math.abs(fy - 1) < 0.01) return r;
    const file = out('marks.json');
    const all = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const k of Object.keys(sels)) {
      const v = all[name][k]; if (!v) continue;
      all[name][k] = { x: v.x * fx, y: v.y * fy, w: v.w * fx, h: v.h * fy };
    }
    fs.writeFileSync(file, JSON.stringify(all, null, 2));
    return all[name];
  };
  // Gezinme ve yüzen "yukarı" düğmesini gizle; .reveal animasyonlarını anında tamamla.
  const prep = (p) => p.addStyleTag({ content: `
    #rauf-nav,#backToTop,.back-to-top,.skip-link{display:none!important}
    .reveal{opacity:1!important;transform:none!important;transition:none!important}
    .nav{background:#0d0d0d!important}   /* yarı saydam üst çubuğun ardındaki hayalet metin görünmesin */
  ` });
  // Bölümü sabit üst çubuğun hemen altına getir
  const goto = async (p, sel, extra = 0) => {
    await p.evaluate(({ sel, extra }) => {
      const e = document.querySelector(sel);
      const nav = document.getElementById('navbar');
      const nh = nav ? nav.getBoundingClientRect().height : 0;
      window.scrollTo(0, e.getBoundingClientRect().top + scrollY - nh - 8 + extra);
    }, { sel, extra });
    await p.waitForTimeout(1200);
  };

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const D = pre === 'd';
    let p = await open('/kayi/');
    await prep(p); await p.waitForTimeout(2800);   // sayaç animasyonu bitsin
    await shot(p, `${pre}-hero.jpg`);

    // 1) Beş padişah → Osman Gazi kartına dokun → ayrıntı penceresi
    await goto(p, D ? '#rulers' : '#rulersGrid', D ? 40 : -10);
    await shot(p, `${pre}-rulers.jpg`);
    await mark(p, `${pre}-rulers.jpg`, { osman: '.ruler-card' });
    if (D) {
      await p.locator('.ruler-card').first().click();
      await p.waitForTimeout(900);
      await shot(p, `${pre}-ruler-modal.jpg`);
      await p.evaluate(() => closeModal());
      await p.waitForTimeout(500);
    } else {
      // Mobilde ayrıntı penceresi yatay taşıyor (site sorunu) → beş kartı uzun çekimle kaydır
      const top = await p.evaluate(() => document.getElementById('rulersGrid').getBoundingClientRect().top + scrollY - 40);
      await shot(p, 'm-rulers-tall.jpg', { fullPage: true, clip: { x: 0, y: top, width: 390, height: 844 * 2.6 }, quality: 88 });
    }

    // 2) Harita → Sefer Modu
    // Mobilde başlık kartuşu düğmelerin altında kalıp üst üste biniyor → çekimde gizle
    if (!D) await p.addStyleTag({ content: '.map-cartouche{display:none!important}' });
    await goto(p, '#mapContainer', D ? -20 : -10);
    if (!D) {   // Rumeli soldan kesilmesin: Gelibolu/Edirne'den Konya'ya
      await p.evaluate(() => map.setView([40.2, 28.6], 6, { animate: false }));
      await p.waitForTimeout(1500);
    }
    await shot(p, `${pre}-map.jpg`);
    await mark(p, `${pre}-map.jpg`, { sefer: '#campaignStartBtn', map: '#mapContainer' });
    await p.click('#campaignStartBtn');
    await p.waitForTimeout(1600);
    await goto(p, '#mapContainer', D ? -20 : -10);
    await p.click('#speed3').catch(() => {});
    // Kosova Meydan Muharebesi adımına kadar ilerlet
    for (let i = 0; i < 160; i++) {
      const t = await p.textContent('#campaignTitle');
      if (/^I\. Kosova/.test(t || '')) break;
      await p.waitForTimeout(300);
    }
    // Bir sonraki adımı durdur ama "Duraklat" görünümünü koru (oynuyor izlenimi)
    await p.evaluate(() => clearTimeout(campaignTimer));
    await p.waitForTimeout(1800);
    // Mobilde üst üste binen kontrol kümesi (Seferi Bitir · Duraklat · Hız) kadrajın üstünde kalsın
    await goto(p, '#mapContainer', D ? -20 : 185);
    await p.waitForTimeout(600);           // uçuş ve kart animasyonu tamamlansın
    const leg = await p.addStyleTag({ content: '.map-legend{visibility:hidden!important}' });
    await p.waitForTimeout(200);
    await shot(p, `${pre}-sefer.jpg`);
    await leg.evaluate((e) => e.remove());
    await mark(p, `${pre}-sefer.jpg`, { card: '#campaignCard' });
    console.log(pre, 'sefer', await p.textContent('#campaignProgressLabel'), await p.textContent('#campaignTitle'));
    await p.click('#campaignStartBtn');     // seferi bitir
    await p.waitForTimeout(1500);

    // 3) Kişiler → ara "Edebali" → karta dokun → pencere
    await goto(p, '#persons', D ? 0 : 0);
    await shot(p, `${pre}-persons.jpg`);
    await mark(p, `${pre}-persons.jpg`, { search: '#personSearch' });
    await p.fill('#personSearch', 'Edebali');
    await p.waitForTimeout(800);
    await shot(p, `${pre}-persons-q.jpg`);
    await mark(p, `${pre}-persons-q.jpg`, { card: '.person-card' });
    await p.locator('.person-card').first().click();
    await p.waitForTimeout(900);
    await shot(p, `${pre}-person-modal.jpg`);
    await p.evaluate(() => closeModal());
    await p.waitForTimeout(400);

    // 4) Zaman çizelgesi → Yıldırım Bayezid süzgeci
    await goto(p, '#timelineControls', -20);
    await shot(p, `${pre}-timeline.jpg`);
    const bay = '.timeline-filter[data-ruler="Sultan Yıldırım Bayezid Han"]';
    await mark(p, `${pre}-timeline.jpg`, { bayezid: bay });
    await p.click(bay);
    await p.waitForTimeout(900);
    await shot(p, `${pre}-timeline-f.jpg`);
  }
});
