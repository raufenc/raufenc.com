// Fâilâtün — Aruz Atölyesi — çekimler (masaüstü d-*, mobil m-*)
// Söz Meydanı (kayıp kelime → hâline beyit → ritmi kur), Beyit Atölyesi (hece hece taktî).
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, hide }) => {
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const SAFE = 48; // mobilde dynamic island için güvenli alan (başlık adın üstüne binmesin)
    const head = pre === 'd' ? 92 : 78 + SAFE; // yapışkan başlık yüksekliği
    // Öğeyi başlığın hemen altına getir
    const top = (p, sel, gap = 14) => p.evaluate(({ sel, off }) => {
      const e = document.querySelector(sel); if (!e) return;
      window.scrollTo(0, e.getBoundingClientRect().top + scrollY - off);
    }, { sel, off: head + gap });
    const calm = (p) => p.evaluate(() => document.activeElement?.blur()).then(() => p.mouse.move(1, 300));
    const prep = async (p) => {
      await hide(p);
      await p.emulateMedia({ reducedMotion: 'reduce' });
      await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}.toast{display:none!important}.masthead{background:#11151d!important;backdrop-filter:none!important}' });
      if (pre === 'm') await p.addStyleTag({ content: `.masthead{padding-top:${SAFE}px!important}` });
    };

    // 1) Karşılama
    const watch = (p) => p.on('response', (r) => { if (r.status() >= 400) console.warn(pre, 'HTTP', r.status(), r.url()); });
    let p = await open('/aruz/');
    watch(p);
    await prep(p); await p.waitForTimeout(1800);
    await shot(p, `${pre}-hero.jpg`);
    await p.close();

    // 2) Söz Meydanı · Muhibbî (Kanûnî)
    p = await open('/aruz/?meydan=muhibbi#oyna'); watch(p);
    await prep(p); await p.waitForTimeout(1200);
    // mobil: tablo başlığın hemen altında, üstteki giriş metni başlığın arkasında kalsın
    await top(p, '.play-table', pre === 'd' ? 18 : -8); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-kelime.jpg`);
    await mark(p, `${pre}-kelime.jpg`, { word: '[data-play-word="sıhhat"]', gap: '.play-gap' });
    await p.click('[data-play-word="sıhhat"]'); await p.waitForTimeout(500);
    // mobil: geri bildirim + 'Beyti yakala' düğmesi alt gezinmenin üstünde kalsın
    if (pre === 'd') await top(p, '.play-table', 18); else await top(p, '.play-trail', -18);
    await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-kelime-ok.jpg`);
    await mark(p, `${pre}-kelime-ok.jpg`, { gap: '.play-gap', fb: '.play-feedback' });

    // Tur 2: hâline bir beyit
    await p.click('#playNext'); await p.waitForTimeout(500);
    const sahneTop = () => pre === 'd' ? top(p, '.play-table', 18) : top(p, '.play-kicker', -6);
    await sahneTop(); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-sahne.jpg`);
    await mark(p, `${pre}-sahne.jpg`, { b: '[data-play-scene="muhibbi"]' });
    await p.click('[data-play-scene="muhibbi"]'); await p.waitForTimeout(500);
    await sahneTop(); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-sahne-ok.jpg`);
    await mark(p, `${pre}-sahne-ok.jpg`, { b: '[data-play-scene="muhibbi"]', fb: '.play-feedback' });

    // Tur 3: ritmi kur (işaretleri aç → Düm / De)
    await p.click('#playNext'); await p.waitForTimeout(500);
    await p.click('#showPlayPattern'); await p.waitForTimeout(400);
    const pattern = await p.evaluate(() => [...document.querySelectorAll('#tapTrack span')].length);
    await top(p, '#playTitle', pre === 'd' ? 70 : 36); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-ritim.jpg`);
    await mark(p, `${pre}-ritim.jpg`, { dum: '[data-play-tap="L"]', de: '[data-play-tap="S"]', track: '#tapTrack' });
    // Fâilâtün: — ⏑ — —
    // Her dokunuştan sonra ara çekim: vuruş izi adım adım dolsun
    for (const [i, t] of ['L', 'S', 'L'].entries()) {
      await p.click(`[data-play-tap="${t}"]`); await p.waitForTimeout(450);
      await top(p, '#playTitle', pre === 'd' ? 70 : 36); await p.waitForTimeout(300);
      await calm(p); await shot(p, `${pre}-ritim-${i + 1}.jpg`);
      await mark(p, `${pre}-ritim-${i + 1}.jpg`, { dum: '[data-play-tap="L"]', de: '[data-play-tap="S"]', track: '#tapTrack' });
    }
    await p.click('[data-play-tap="L"]'); await p.waitForTimeout(600);
    await top(p, '.play-rhythm-model', pre === 'd' ? 24 : 12); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-ritim-ok.jpg`);
    await mark(p, `${pre}-ritim-ok.jpg`, { next: '#playNext', fb: '#rhythmFeedback' });
    console.log(pre, 'ritim vuruşu', pattern);

    // Ödül: beyit deftere
    await p.click('#playNext'); await p.waitForTimeout(700);
    await top(p, '.play-table', pre === 'd' ? 18 : 10); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-odul.jpg`);
    await p.close();

    // 3) Beyit Atölyesi · Ritmi izle → heceye dokun
    p = await open('/aruz/#meclis'); watch(p);
    await prep(p); await p.waitForTimeout(1200);
    await p.click('[data-step="2"]'); await p.waitForTimeout(600);
    // mobil: parça seçimi yerinde değişsin (hece-1 ile aynı kaydırma), not alt gezinmenin üstünde
    const heceTop = () => pre === 'd' ? top(p, '#journeyBody', 10) : top(p, '.journey-foot-tabs', -10);
    await heceTop(); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-hece.jpg`);
    await mark(p, `${pre}-hece.jpg`, { foot1: '[data-journey-foot="0"]', heces: '.journey-heces' });
    await p.click('[data-journey-foot="0"]'); await p.waitForTimeout(500);
    // mobil: parçalar + heceler + not birlikte, not alt gezinmenin tamamen üstünde
    await heceTop(); await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-hece-1.jpg`);
    await mark(p, `${pre}-hece-1.jpg`, { syl: '[data-journey-syllable="1"]', heces: '.journey-heces', note: '#journeySyllableNote' });
    console.log(pre, 'not/gezinme', await p.evaluate(() => [document.querySelector('#journeySyllableNote').getBoundingClientRect().bottom, document.querySelector('.masthead nav').getBoundingClientRect().top]));
    await p.click('[data-journey-syllable="1"]'); await p.waitForTimeout(500);
    // mobil: not ekranın ortasına gelsin (heceler başlığın altında) — üçüncü çekimde görünür kaydırma
    if (pre === 'd') await heceTop(); else await top(p, '.journey-heces', 18);
    await p.waitForTimeout(300);
    await calm(p); await shot(p, `${pre}-hece-not.jpg`);
    await mark(p, `${pre}-hece-not.jpg`, { syl: '[data-journey-syllable="1"]', note: '#journeySyllableNote', heces: '.journey-heces' });
    console.log(pre, await p.evaluate(() => document.querySelector('#journeySyllableNote')?.innerText));
    await p.close();

    // Ritimler (sayım)
    p = await open('/aruz/#ritimler'); watch(p);
    await prep(p); await p.waitForTimeout(900);
    console.log(pre, 'ritim kalıbı', await p.evaluate(() => document.querySelectorAll('[data-rhythm]').length));
    await p.close();
  }
});
