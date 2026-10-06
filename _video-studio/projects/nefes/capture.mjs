// 4-7-8 Nefes Egzersizi — çekimler (masaüstü d-*, mobil m-*)
// Gerçek seans: Başla → Hazırlan (3 sn) → Nefes al (4) → Tut (7) → Ver (8) × 4 döngü → Seans tamamlandı.
// Her evre, etiket/renk geçişleri (1.4 sn) oturduktan sonra çekilir.
import { withStudio } from '../../lib/capture.mjs';

const label = (p) => p.evaluate(() => document.querySelector('#phase-label').textContent.trim());

// Evreyi renk değişkeninden (--pc) ve sayaçtan bekle; sayaç "pop" animasyonu (0.45 sn) bitince çek.
async function waitPhase(p, key, count, cycleDone = null) {
  await p.waitForFunction(({ key, count, cycleDone }) => {
    if (document.documentElement.style.getPropertyValue('--pc').trim() !== `var(--c-${key})`) return false;
    if (document.querySelector('#count').textContent.trim() !== String(count)) return false;
    if (cycleDone != null && document.querySelectorAll('#cycles-row .cycle-dot.done').length !== cycleDone) return false;
    return true;
  }, { key, count, cycleDone }, { timeout: 120000, polling: 20 });
  await p.waitForTimeout(150);
}

// Masaüstü 2x çekim yavaş: çekim sürerken sayaç değişip "pop" animasyonuna girmesin diye
// rAF'ı geçici olarak beklet (site JS'i durur, CSS geçişleri tamamlanır), sonra kuyruğu bırak.
// Seans zamanı performance.now ile hesaplandığından süre kaymaz.
const freeze = (p) => p.evaluate(() => {
  if (window.__raf0) return;
  window.__raf0 = window.requestAnimationFrame; window.__rafQ = [];
  window.requestAnimationFrame = (cb) => { window.__rafQ.push(cb); return 0; };
});
const unfreeze = (p) => p.evaluate(() => {
  if (!window.__raf0) return;
  window.requestAnimationFrame = window.__raf0; window.__raf0 = null;
  const q = window.__rafQ; window.__rafQ = []; q.forEach((cb) => window.requestAnimationFrame(cb));
});
async function frozenShot(p, shot, name) {
  await freeze(p);
  await p.waitForTimeout(600);
  await shot(p, name);
  await unfreeze(p);
}

// Başsız Chromium (yazılım rasterı) transform: scale() uygulanan .orb-wrap'in box-shadow
// parıltısını katman sınırında kare biçiminde kesiyor (engineIssues). Çekimde aynı ölçeği
// genişlik/yükseklikle uygula: site JS'inin yazdığı scale değeri her karede --os'a kopyalanır.
const ORB_FIX = '.orb-wrap{transform:none!important;width:calc(62% * var(--os,1))!important;height:calc(62% * var(--os,1))!important}';
const orbFix = async (p) => {
  await p.addStyleTag({ content: ORB_FIX });
  await p.evaluate(() => {
    const o = document.querySelector('#orb');
    (function f() { const m = /scale\(([\d.]+)\)/.exec(o.style.transform); o.style.setProperty('--os', m ? m[1] : 1); requestAnimationFrame(f); })();
  });
};

// Mobil: yaprak (petal) halkası evre büyürken sayfa genişliğini ~420 css px'e taşırıyor; mobil
// tarayıcıda yerleşim görünümü genişleyip sayfa hafifçe uzaklaşıyor (siteIssues). Çekimde .hero'yu
// yatayda kırp (görünür alanın dışı zaten görünmez) ve iOS Safari'deki gibi titreşim satırını gizle
// (site navigator.vibrate yoksa #row-haptics'i gizliyor; iPhone'da görünmez).
const MOBILE_FIX = '.hero{overflow-x:clip!important}#row-haptics{display:none!important}';

async function openNefes(open, pre, { light = false } = {}) {
  const p = await open('/nefes/');
  await p.evaluate((light) => {
    try {
      localStorage.removeItem('rauf-nefes-stats');
      // Oturum B: ses/konuşma/titreşim kapalı (başsız tarayıcıda her evre geçişini ~40 ms geciktiriyorlar)
      if (light) localStorage.setItem('rauf-nefes-prefs', JSON.stringify({ cycles: 4, ambient: false, fx: false, voice: false, haptics: false, volume: 0.7 }));
    } catch (e) {}
  }, light);
  await p.reload({ waitUntil: 'domcontentloaded' });
  await p.waitForLoadState('load').catch(() => {});
  await hideNav(p);
  if (light) await p.addStyleTag({ content: LIGHT });
  else await orbFix(p);
  if (pre === 'm') await p.addStyleTag({ content: MOBILE_FIX });
  // Sesli yönlendirme/AudioContext başsız tarayıcıda sessiz çalışır; çekimi etkilemez.
  await p.waitForTimeout(1500);
  return p;
}
let hideNav;
// Oturum B yalnız sonuç ekranı için: site evre bitişini bir sonraki karede yakalar; başsız tarayıcıda
// (ağır görseller + Web Audio/konuşma) her geçiş ~40 ms kayar ve 13 geçişte süre 79 sn'den 80–81 sn'ye çıkar.
// Seans boyunca ağır görselleri ve sesleri kapat (çekilmiyorlar) → geçiş başına ~16 ms, 60 fps cihazdaki gibi
// 1:19. Sonuç kartı açılınca görseller geri getirilir.
const LIGHT = '#stars,.petals,.ring-svg{display:none!important}.orb-core{box-shadow:none!important}*{transition:none!important}';
const unlight = (p) => p.evaluate((css) => { for (const st of document.querySelectorAll('style')) if (st.textContent === css) st.remove(); }, LIGHT);

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, hide }) => {
  hideNav = hide;
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    // ── Oturum A: giriş, ayarlar, nefes evreleri ──
    const p = await openNefes(open, pre);

    // 1) Giriş — boşta küre
    await shot(p, `${pre}-hero.jpg`);
    await mark(p, `${pre}-hero.jpg`, { start: '#btn-start', settings: '#btn-settings', stage: '#stage', title: '.app-title' });

    // 2) Ayarlar paneli
    await p.click('#btn-settings');
    await p.waitForTimeout(800);
    await shot(p, `${pre}-ayarlar.jpg`);
    await mark(p, `${pre}-ayarlar.jpg`, { c6: '#cycle-chips .chip[data-cycles="6"]', sheet: '#sheet', voice: '#tgl-voice', chips: '#cycle-chips' });
    await p.click('#cycle-chips .chip[data-cycles="6"]');
    await p.waitForTimeout(500);
    await shot(p, `${pre}-ayarlar6.jpg`);
    await mark(p, `${pre}-ayarlar6.jpg`, { c6: '#cycle-chips .chip[data-cycles="6"]', sheet: '#sheet', chips: '#cycle-chips' });
    // varsayılana (4 döngü) dön, paneli kapat
    await p.click('#cycle-chips .chip[data-cycles="4"]');
    await p.click('#sheet-close');
    await p.waitForTimeout(700);

    // 3) Seans evreleri
    await p.click('#btn-start');
    await waitPhase(p, 'prep', 2);
    await frozenShot(p, shot, `${pre}-hazirlan.jpg`);

    await waitPhase(p, 'inhale', 2, 0);     // ≈2.2 sn: küre genişliyor, sayaç 2
    await frozenShot(p, shot, `${pre}-al.jpg`);
    await mark(p, `${pre}-al.jpg`, { stage: '#stage', label: '.phase-zone', dots: '#cycles-row' });

    await waitPhase(p, 'hold', 4, 0);       // ≈3.2 sn: küre dolu, sayaç 4
    await frozenShot(p, shot, `${pre}-tut.jpg`);
    await mark(p, `${pre}-tut.jpg`, { stage: '#stage', label: '.phase-zone' });

    await waitPhase(p, 'exhale', 5, 1);     // 2. döngü, ≈3.2 sn: küre küçülüyor, sayaç 5
    await frozenShot(p, shot, `${pre}-ver.jpg`);
    await mark(p, `${pre}-ver.jpg`, { stage: '#stage', label: '.phase-zone', dots: '#cycles-row' });
    console.log(pre, 'görünüm:', await p.evaluate(() => [innerWidth, innerHeight, document.documentElement.scrollWidth].join('×')));
    await p.close();   // A'nın seansı arka planda sürüp B'nin kare zamanlamasını bozmasın

    // ── Oturum B: temiz, kesintisiz 4 döngülük seans (rAF dondurma yok → gerçek süre 3 + 4×19 = 79 sn) ──
    const q = await openNefes(open, pre, { light: true });
    await q.click('#btn-start');
    await q.waitForSelector('#done-overlay.open', { timeout: 120000 });
    await unlight(q);
    await orbFix(q);
    await q.waitForTimeout(1600);
    await shot(q, `${pre}-bitti.jpg`);
    await mark(q, `${pre}-bitti.jpg`, { card: '.done-card', stats: '.done-stats', close: '#btn-close-done', again: '#btn-again' });
    console.log(pre, 'bitti:', await q.evaluate(() => [...document.querySelectorAll('.done-stat')].map((e) => e.innerText.replace(/\n/g, ' ')).join(' | ')));

    await q.click('#btn-close-done');
    await q.waitForTimeout(1600);
    await shot(q, `${pre}-sonra.jpg`);
    await mark(q, `${pre}-sonra.jpg`, { chip: '#stats-chip', start: '#btn-start' });
    console.log(pre, 'chip:', await q.evaluate(() => document.querySelector('#stats-chip').textContent), '| etiket:', await label(q),
      '| saklanan:', await q.evaluate(() => localStorage.getItem('rauf-nefes-stats')));

    // 5) Teknik hakkında
    await q.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('#bilgi').scrollIntoView(); });
    await q.waitForTimeout(800);
    await shot(q, `${pre}-bilgi.jpg`);
  }
});
