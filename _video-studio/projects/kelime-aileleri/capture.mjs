// Kelime Aileleri — çekimler (masaüstü d-*, mobil m-*)
// Akış: tanıtım sayfası → Gizli Bağ (komşu → KON-) → Kelime Fabrikası (TELE + FON)
//       → Kart Vitrini (F-K-R kartını çevir) → Kelime Ağacı (ALEP rotası)
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark, hide }) => {
  // imleç / hover izi kalmasın (kenarlık geçişi bitene kadar bekle)
  const away = async (p) => { await p.mouse.move(2, (p.viewportSize()?.height || 800) - 2); await p.waitForTimeout(500); };
  // metne göre öğeye geçici kimlik ver (yalnız işaret için; görünüm değişmez)
  const tagByText = (p, sel, text, id) =>
    p.evaluate(({ sel, text, id }) => {
      const e = [...document.querySelectorAll(sel)].find((x) => x.textContent.trim().startsWith(text));
      if (e) e.id = id;
      return !!e;
    }, { sel, text, id });
  const clickText = async (p, sel, text) => {
    await p.locator(sel).filter({ hasText: text }).first().click();
    await p.waitForTimeout(350);
  };

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    // ── 1. Tanıtım sayfası (dört kutu) ──
    let p = await open('/kelime-aileleri/');
    await hide(p); await p.waitForTimeout(600);
    await shot(p, `${pre}-hero.jpg`);
    if (pre === 'm') await tallShot(p, 'm-hero-uzun.jpg', { maxScreens: 3 });

    // ── 2. Gizli Aileler · Gizli Bağ: "komşu" hangi ailenin çocuğu? ──
    p = await open('/kelime-aileleri/gizli-aileler/');
    await hide(p); await p.waitForTimeout(400);
    let ok = false;
    for (let i = 0; i < 80 && !ok; i++) {
      await p.evaluate(() => KAM.oyun('gizlibag'));
      await p.click('#modTek');
      await p.waitForTimeout(150);
      const w = await p.evaluate(() => {
        const s = document.querySelector('#oyunAlan .kdetay span');
        return s ? s.textContent.trim() : '';
      });
      if (w === 'komşu') ok = true;
      else { await p.evaluate(() => KAM.geri()); await p.waitForTimeout(80); }
    }
    if (!ok) console.warn('komşu sorusu gelmedi');
    await p.waitForTimeout(500); await away(p);
    await tagByText(p, '.sec', 'KON-', 'vs-kon');
    await shot(p, `${pre}-gizli-soru.jpg`);
    await mark(p, `${pre}-gizli-soru.jpg`, { kon: '#vs-kon', soru: '#oyunAlan .kdetay' });
    await p.click('#vs-kon'); await p.waitForTimeout(500); await away(p);
    await shot(p, `${pre}-gizli-cevap.jpg`);
    await mark(p, `${pre}-gizli-cevap.jpg`, { gb: '#gb .geribildirim', kon: '.sec.dogru', soru: '#oyunAlan .kdetay' });

    // ── 3. Kelime Fabrikası: hasta + -HÂNE, sonra TELE + FON ──
    p = await open('/kelime-aileleri/ekler/');
    await hide(p); await p.waitForTimeout(400);
    await p.evaluate(() => KAM.oyun('fabrika'));
    await p.click('#modTek'); await p.waitForTimeout(500);
    await clickText(p, '#p1 .parca', 'hasta');
    await clickText(p, '#p2 .parca', '-HÂNE');
    await p.waitForTimeout(300);
    // ilk ürün (hastane) ve geri bildirimi ekranda; şimdi TELE'ye dokunulacak
    await away(p);
    await tagByText(p, '#p1 .parca', 'TELE', 'vs-tele');
    await shot(p, `${pre}-fabrika-1.jpg`);
    await mark(p, `${pre}-fabrika-1.jpg`, { tele: '#vs-tele', montaj: '.montaj' });
    await p.click('#vs-tele'); await p.waitForTimeout(400); await away(p);
    await tagByText(p, '#p2 .parca', 'FON', 'vs-fon');
    await shot(p, `${pre}-fabrika-2.jpg`);
    await mark(p, `${pre}-fabrika-2.jpg`, { fon: '#vs-fon', montaj: '.montaj' });
    await p.click('#vs-fon'); await p.waitForTimeout(500); await away(p);
    await shot(p, `${pre}-fabrika-3.jpg`);
    await mark(p, `${pre}-fabrika-3.jpg`, { gb: '#gb .geribildirim', montaj: '.montaj' });

    // ── 4. Kök Harfleri · Kart Vitrini: F-K-R kartını çevir ──
    p = await open('/kelime-aileleri/kokler/');
    await hide(p); await p.waitForTimeout(400);
    await p.evaluate(() => KAM.vitrin());
    await p.waitForTimeout(1200); await away(p);
    await shot(p, `${pre}-vitrin.jpg`);
    await mark(p, `${pre}-vitrin.jpg`, { fkr: '.vgrid .kartkutu:nth-child(2)', ktb: '.vgrid .kartkutu:nth-child(1)' });
    await p.click('.vgrid .kartkutu:nth-child(2)');
    await p.waitForTimeout(1100); await away(p);
    await shot(p, `${pre}-vitrin-arka.jpg`);
    await mark(p, `${pre}-vitrin-arka.jpg`, { fkr: '.vgrid .kartkutu:nth-child(2)' });

    // ── 5. Dilden Dile · Kelime Ağacı → ALEP kartının rotası ──
    p = await open('/kelime-aileleri/dilden-dile/');
    await hide(p); await p.waitForTimeout(400);
    await p.evaluate(() => KAM.agac());
    await p.waitForTimeout(700); await away(p);
    await shot(p, `${pre}-agac.jpg`);
    await mark(p, `${pre}-agac.jpg`, { alep: '#ekran-ic .kdetay:nth-child(1)' });
    await p.click('#ekran-ic .kdetay:nth-child(1)');
    await p.waitForTimeout(700); await away(p);
    await shot(p, `${pre}-rota.jpg`);
    await mark(p, `${pre}-rota.jpg`, { rota: '.krota', baslik: '.kdetay .kk', liste: '.klist' });
  }
});
