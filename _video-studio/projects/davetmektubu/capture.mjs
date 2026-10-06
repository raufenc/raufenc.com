// Davet Mektubu — çekimler (masaüstü d-*, mobil m-*)
// Yerel kopya: /davetmektubu/index.html (canlıda davetmektubu.com)
import { withStudio } from '../../lib/capture.mjs';

const PAGE = '/davetmektubu/index.html';
// Kaydırma ile görünen blokları baştan görünür yap (uzun çekim için), imleç/odak halkası yok
// Mektup görselleri davetmektubu.com/wp-content'ten gelir; çevrimdışı çekimde erişilemez → kırık görsel yerine gizle
const CSS = `.reveal{opacity:1!important;transform:none!important;transition:none!important}
  .m-img{display:none!important}
  *:focus,*:focus-visible{outline:none!important}`;
// Dikey videoda telefon çerçevesinin çentiği (dynamic island) üst şeridi örtüyor →
// mobil çekimlerde sabit başlığa ve içeriğe üst güvenli alan boşluğu ekle (7sinif SAFE_TOP yöntemi)
const SAFE_TOP = 48;
const SAFE_CSS = `nav{height:${54 + SAFE_TOP}px!important;padding-top:${SAFE_TOP}px!important}
  #app{padding-top:${54 + SAFE_TOP}px!important}`;

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark }) => {
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await open(PAGE);
    await p.evaluate(() => localStorage.clear());
    await p.reload({ waitUntil: 'load' });
    await p.addStyleTag({ content: CSS });
    if (pre === 'm') await p.addStyleTag({ content: SAFE_CSS });
    await p.waitForTimeout(2200);
    await p.mouse.move(-10, -10);
    await shot(p, `${pre}-hero.jpg`);

    // 1) Pozisyon kartları → Ateist dokun → meslek listesi
    await p.evaluate((off) => { const e = document.getElementById('poz-section'); window.scrollTo({ top: e.getBoundingClientRect().top + scrollY - off, behavior: 'instant' }); }, pre === 'm' ? 70 + SAFE_TOP : 70);
    await p.waitForTimeout(1200);
    await shot(p, `${pre}-poz.jpg`);
    await mark(p, `${pre}-poz.jpg`, { ateist: '#poz-section button.glow-card' });
    await p.locator('#poz-section button.glow-card').first().click();
    await p.waitForTimeout(1100);
    await p.mouse.move(-10, -10);
    await p.addStyleTag({ content: CSS });
    await shot(p, `${pre}-liste.jpg`);
    await mark(p, `${pre}-liste.jpg`, { fizikci: '.meslek-row', grid: '.mektup-grid' });

    // 2) Fizikçi mektubu
    await p.locator('.meslek-row').first().click();
    await p.waitForTimeout(1100);
    await p.mouse.move(-10, -10);
    await p.addStyleTag({ content: CSS });
    await shot(p, `${pre}-mektup.jpg`);
    await mark(p, `${pre}-mektup.jpg`, { header: '.m-header' });
    await tallShot(p, `${pre}-mektup-uzun.jpg`, { maxScreens: 3 });

    // 3) Sorular → kategori → paylaşım kartı
    await p.evaluate(() => navigate({ screen: 'sorular', soruI: 0, kat: null }));
    await p.waitForTimeout(1000);
    await p.mouse.move(-10, -10);
    await shot(p, `${pre}-soru.jpg`);
    await mark(p, `${pre}-soru.jpg`, { kat: '.kat-chip:nth-child(4)', paylas: 'button[onclick="acPaylas()"]', kart: '.soru-kart' });
    await p.locator('.kat-chip').nth(3).click();
    await p.waitForTimeout(1000);
    await p.mouse.move(-10, -10);
    await shot(p, `${pre}-soru-kat.jpg`);
    await mark(p, `${pre}-soru-kat.jpg`, { paylas: 'button[onclick="acPaylas()"]', kart: '.soru-kart' });
    await p.locator('button[onclick="acPaylas()"]').click();
    await p.waitForTimeout(900);
    // Paylaşım önizlemesi sitenin generateCanvas() çıktısıdır. Görselin alt şeridinde "davetmektubu.com"
    // ile "→ Bu soruyu sor" üst üste biniyor (sitede hata, rapora yazıldı) → önizleme kutusu 5:4 yapılıp
    // görsel üste hizalanır; alt %20'lik şerit kutunun dışında kalır (görselin kendisi değişmez).
    await p.addStyleTag({ content: '.modal-preview{aspect-ratio:5/4!important;align-items:flex-start!important}' });
    await p.waitForTimeout(500);
    await p.mouse.move(-10, -10);
    await shot(p, `${pre}-paylas.jpg`);
    await mark(p, `${pre}-paylas.jpg`, { onizleme: '#previewImg', wa: 'button[onclick^="shareWithAPI"]' });
  }
});
