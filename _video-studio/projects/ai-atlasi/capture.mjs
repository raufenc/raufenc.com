// Yapay Zekâ Araç Atlası — çekimler (masaüstü d-*, mobil m-*)
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, hide }) => {
  // Öğeyi görünümde y=off (CSS px) konumuna getir; yumuşak kaydırmayı kapat
  const scrollTo = (p, sel, off = 0) => p.evaluate(({ sel, off }) => {
    document.documentElement.style.scrollBehavior = 'auto';
    const e = document.querySelector(sel);
    window.scrollTo({ top: e.getBoundingClientRect().top + scrollY - off, behavior: 'instant' });
  }, { sel, off });
  const open = async (fn) => {
    const p = await fn('/ai-atlasi/');
    await hide(p);
    await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await p.waitForTimeout(1200);
    return p;
  };

  for (const [pre, dev] of [['d', desktop], ['m', mobile]]) {
    const D = pre === 'd';
    // 1) Kahraman
    let p = await open(dev);
    await shot(p, `${pre}-hero.jpg`);

    // 2) Kategori seç → katalog süzülür
    await scrollTo(p, '#kategoriler', D ? -10 : 60);
    await p.waitForTimeout(500);
    await shot(p, `${pre}-kategori.jpg`);
    await mark(p, `${pre}-kategori.jpg`, { ses: '.cat-card[data-cat="Ses & Müzik"]' });
    await p.click('.cat-card[data-cat="Ses & Müzik"]');
    await p.waitForTimeout(900);
    await scrollTo(p, D ? '#toolbar' : '#katalog .section-header', D ? 70 : 64);
    await p.waitForTimeout(1300);
    await shot(p, `${pre}-ses.jpg`);

    // 3) Araç kartı: puanlar → Artılar & Eksiler
    p = await open(dev);
    const sum = '#toolGrid .tool-card:nth-child(2) .tool-details summary';
    if (D) await scrollTo(p, sum, 496); else await scrollTo(p, '#toolGrid .tool-card:nth-child(2)', 24);
    await p.waitForTimeout(1000);
    await shot(p, `${pre}-kart.jpg`);
    await mark(p, `${pre}-kart.jpg`, { artilar: sum, kart: '#toolGrid .tool-card:nth-child(2)' });
    if (D) await p.click(sum); else await p.evaluate((s) => document.querySelector(s).click(), sum);
    await p.waitForTimeout(500);
    if (!D) { await scrollTo(p, sum, 56); await p.waitForTimeout(400); }
    await shot(p, `${pre}-artilar.jpg`);
    await mark(p, `${pre}-artilar.jpg`, { pc: '#toolGrid .tool-card:nth-child(2) .pros-cons' });

    // 4) Başlangıç setleri → atölye akışı
    await scrollTo(p, '#setler', D ? -10 : 0);
    await p.waitForTimeout(800);
    await shot(p, `${pre}-setler.jpg`);
    await scrollTo(p, '#atolye', D ? -10 : 0);
    await p.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('visible')));
    await p.waitForTimeout(1500);
    if (D) await shot(p, 'd-atolye.jpg');
    else {
      // Mobilde modüller uzun → kaydırma sahnesi için 2.6 ekranlık çekim; üstte 64 px güvenli alan (dinamik ada)
      const top = await p.evaluate(() => document.getElementById('atolye').getBoundingClientRect().top + scrollY);
      await shot(p, 'm-atolye.jpg', { fullPage: true, clip: { x: 0, y: Math.max(0, top - 64), width: 390, height: Math.round(844 * 2.6) }, quality: 88 });
    }
  }
});
