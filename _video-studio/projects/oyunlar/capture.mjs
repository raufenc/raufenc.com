// Değer Oyunları — çekimler (masaüstü d-*, mobil m-*)
// Üç oyun gerçekten oynanır: Vicdan (kart kaydırma), Zaman Yolcusu (5 yıl sonrası),
// Vicdan Mahkemesi (ifade → delil → hüküm).
import { withStudio } from '../../lib/capture.mjs';

// Vicdan destesi karıştırılır; iki biçimde aynı kartlar gelsin diye Math.random tohumlanır.
const SEED = `(() => { let s = ${process.env.SEED || 7}; Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; })();`;

const SAFE = 48; // mobilde Dynamic Island'ın altında kalacak üst boşluk

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, origin }) => {
  const open = async (fn, url, seed = false) => {
    const p = await fn(null);
    if (seed) await p.addInitScript(SEED);
    await p.goto(origin + url, { waitUntil: 'load' });
    await p.addStyleTag({ content: '#rauf-nav{display:none!important}' });
    await p.waitForTimeout(1200);
    return p;
  };
  const vis = (p, sel) => p.locator(sel).filter({ visible: true });

  for (const [pre, fn] of [['d', desktop], ['m', mobile]]) {
    // ---------- Vitrin ----------
    let p = await open(fn, '/oyunlar/');
    await p.waitForTimeout(900); // kart belirme animasyonu bitsin
    await shot(p, `${pre}-hero.jpg`);
    // Oyun kartları görünür olacak şekilde kaydır
    await p.evaluate(() => document.querySelector('main.oyunlar').scrollIntoView({ block: innerWidth > 700 ? 'center' : 'start' }));
    await p.waitForTimeout(700);
    await shot(p, `${pre}-kartlar.jpg`);

    // ---------- Vicdan ----------
    p = await open(fn, '/oyunlar/vicdan/', true);
    // Masaüstünde kart yakınlaştırılır; köşedeki sabit geri/ses düğmeleri kadraj kenarında yarım kalmasın
    if (pre === 'd') await p.addStyleTag({ content: '.geri,.ses-dugme{visibility:hidden!important}' });
    await p.click('#btn-basla'); await p.waitForTimeout(800);
    await p.click('#btn-bolum-basla'); await p.waitForTimeout(1000);
    // Üç kartı gerçekten oyna (göstergeler hareketlensin)
    for (const side of ['#btn-sag', '#btn-sag', '#btn-sol']) {
      await p.click(side); await p.waitForTimeout(500);
      await p.evaluate(() => { const k = document.getElementById('gerekce-katman'); if (k && !k.classList.contains('gizli')) k.querySelector('[data-gerekce=vicdan]').click(); });
      await p.waitForTimeout(400);
      await p.evaluate(() => document.querySelector('.toast-devam')?.click());
      await p.waitForTimeout(900);
    }
    await p.waitForTimeout(500);
    await shot(p, `${pre}-vicdan-kart.jpg`);
    await mark(p, `${pre}-vicdan-kart.jpg`, { kart: '#kart-alan .kart', sag: '#btn-sag', sol: '#btn-sol' });
    // Kartı sağa sürükle (bırakmadan): eğilen kart + etiket + etkilenecek göstergeler
    const kb = await p.locator('#kart-alan .kart').boundingBox();
    const cx = kb.x + kb.width / 2, cy = kb.y + kb.height * 0.45;
    await p.mouse.move(cx, cy); await p.mouse.down();
    for (let i = 1; i <= 8; i++) { await p.mouse.move(cx + (kb.width * (pre === 'm' ? 0.10 : 0.27)) * i / 8, cy + 6 * i / 8); await p.waitForTimeout(30); }
    await p.waitForTimeout(400);
    await shot(p, `${pre}-vicdan-surukle.jpg`);
    await p.mouse.move(cx, cy); await p.waitForTimeout(100); await p.mouse.up();
    await p.waitForTimeout(600);

    // ---------- Zaman Yolcusu ----------
    p = await open(fn, '/oyunlar/zaman-yolcusu/');
    if (pre === 'm') await p.addStyleTag({ content: `header{padding-top:${SAFE}px!important}` }); // Dynamic Island güvenli alanı
    await p.click('#btnBasla'); await p.waitForTimeout(1300);
    await shot(p, `${pre}-zaman-secim.jpg`);
    await mark(p, `${pre}-zaman-secim.jpg`, { b: '#secB', a: '#secA' });
    await p.click('#secB'); await p.waitForTimeout(1300);
    await p.click('#btnIleri'); await p.waitForTimeout(330);
    await shot(p, `${pre}-zaman-gecis.jpg`);
    await p.waitForTimeout(3200);
    await p.evaluate(() => scrollTo(0, 0));
    await shot(p, `${pre}-zaman-gelecek.jpg`);

    // ---------- Vicdan Mahkemesi ----------
    p = await open(fn, '/oyunlar/vicdan-mahkemesi/');
    if (pre === 'm') await p.addStyleTag({ content: `header.ust{padding-top:${SAFE}px!important}` }); // Dynamic Island güvenli alanı
    const c = async (sel) => { await vis(p, sel).last().click(); await p.waitForTimeout(600); };
    await c('[data-eylem=basla]'); await c('[data-eylem=dosya-ac]');
    await c('[data-eylem=adim][data-adim=ifadeler]');
    await p.click('[data-eylem=karakter][data-id=hademe]'); await p.waitForTimeout(300);
    for (const k of ['hademe']) for (let j = 0; j < 2; j++) { await p.click(`[data-eylem=soru][data-karakter=${k}][data-i="${j}"]`); await p.waitForTimeout(300); }
    for (const k of ['selim', 'zeynep']) {
      await p.click(`[data-eylem=karakter][data-id=${k}]`); await p.waitForTimeout(300);
      for (let j = 0; j < 2; j++) { await p.click(`[data-eylem=soru][data-karakter=${k}][data-i="${j}"]`); await p.waitForTimeout(300); }
    }
    // Ramazan Amca'nın ifadesini aç bırak
    await p.click('[data-eylem=karakter][data-id=hademe]'); await p.waitForTimeout(500);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    await shot(p, `${pre}-mahkeme-ifade.jpg`);
    await c('[data-eylem=adim][data-adim=deliller]');
    for (let j = 0; j < 3; j++) {
      await p.click(`[data-eylem=delil][data-i="${j}"]`); await p.waitForTimeout(700);
      if (j === 0) await shot(p, `${pre}-mahkeme-delil.jpg`);
      const b = vis(p, '#modal-butonlar button');
      if (await b.count()) { await b.first().click(); await p.waitForTimeout(500); }
    }
    await c('[data-eylem=adim][data-adim=hukum]');
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
    await shot(p, `${pre}-mahkeme-hukum.jpg`);
    await mark(p, `${pre}-mahkeme-hukum.jpg`, { sucsuz: '[data-eylem=hukum-sec][data-hukum=sucsuz]' });
    await c('[data-eylem=hukum-sec][data-hukum=sucsuz]');
    await p.waitForTimeout(2200);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    await shot(p, `${pre}-mahkeme-sonuc.jpg`);
  }
});
