// Osmanlı Padişahları Kart Seti — çekimler (masaüstü d-*, mobil m-*)
//
// Hepsi tek sayfalık uygulamanın gerçek ekranları; geçişler gerçek tıklamalarla yapılır.
//   A) Ana sayfa (intro)
//   B) Kart Galerisi → "Yükseliş Dönemi" süzgeci → Fatih kartı → dokun, kart döner (arka yüz)
//   C) Zaman Çizgisi → Fatih'e dokun → padişah profili (iki kart yüzü, biyografi, olaylar)
//   D) Sultan Arenası: iki kart karşı karşıya → doğru cevaba dokun
//   E) Quiz: Kolay seviye, 10 soru gerçekten cevaplanır → sonuç ekranı → Profil (XP, rozetler)
// Masaüstü görünüm 1280×800 (1440×900 ile aynı oran) — içerik çerçevede daha okunur.
import fs from 'node:fs';
import { withStudio } from '../../lib/capture.mjs';

const G = '/osmanli-kartlari/';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark, hide, out }) => {
  fs.rmSync(out('marks.json'), { force: true });   // eski işaretler karışmasın
  const sayfa = async (pre) => {
    const p = pre === 'd' ? await desktop(G, { viewport: { width: 1280, height: 800 } }) : await mobile(G);
    await hide(p);
    // Yalnız uygulamanın kendi kaydı temizlenir: her çekim sıfır ilerlemeyle başlar
    await p.evaluate(() => { localStorage.removeItem('osmanli-kartlari-v1'); });
    // Sabit tohumlu Math.random: oyunun kendi karıştırması yeniden üretilebilir olsun
    await p.context().addInitScript(() => {
      let a = 20260; Math.random = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    });
    await p.reload({ waitUntil: 'load' });
    await hide(p);
    await p.waitForTimeout(900);
    return p;
  };
  const ekran = async (p, id, ms = 900) => { await p.evaluate((id) => showScreen(id), id); await p.waitForTimeout(ms); };
  const toastsiz = (p) => p.evaluate(() => document.querySelectorAll('.toast,.confetti-piece').forEach((e) => e.remove()));
  const resimler = (p) => p.evaluate(async () => {
    await Promise.all([...document.images].map((i) => (i.loading = 'eager', i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
  });

  for (const pre of ['d', 'm']) {
    // A) ana sayfa
    let p = await sayfa(pre);
    await shot(p, `${pre}-home.jpg`);
    await mark(p, `${pre}-home.jpg`, { galeri: '.mod-card:nth-child(1)' });

    // B) kart galerisi
    await ekran(p, 'galeri');
    await resimler(p); await p.waitForTimeout(500);
    await shot(p, `${pre}-galeri.jpg`);
    await mark(p, `${pre}-galeri.jpg`, { yukselis: '.filter-btn[data-d="yukselis"]', kart: '.kart-wrap' });
    await p.click('.filter-btn[data-d="yukselis"]');
    await p.waitForTimeout(400);
    // Yükseliş'in ilk kartı Fatih
    await resimler(p); await p.waitForTimeout(500);
    await shot(p, `${pre}-yukselis.jpg`);
    await mark(p, `${pre}-yukselis.jpg`, { kart: '.kart-wrap', ad: '.kart-wrap .kart-on' });
    await p.locator('.kart-wrap').first().click();
    await p.waitForTimeout(1100);              // dönüş (0.6 sn) tamamlansın
    await shot(p, `${pre}-arka.jpg`);
    await mark(p, `${pre}-arka.jpg`, { kart: '.kart-wrap' });

    // C) zaman çizgisi → profil
    await ekran(p, 'timeline');
    const fatihSel = '.tl-item[onclick*="fatih-sultan-mehmed"]';
    // Fatih satırı çerçevenin ortasına gelsin (alt kenarda yarım kalmasın)
    await p.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: 'center', behavior: 'instant' }), fatihSel);
    await p.mouse.move(2, 2);                    // önceki dokunuşun hover izi Fatih satırında kalmasın
    await p.waitForTimeout(400);
    await shot(p, `${pre}-timeline.jpg`);
    await mark(p, `${pre}-timeline.jpg`, { fatih: fatihSel });
    await p.click(fatihSel);
    await p.waitForTimeout(400);
    await resimler(p); await p.waitForTimeout(400);
    await shot(p, `${pre}-profil.jpg`);
    await mark(p, `${pre}-profil.jpg`, { kartlar: '.profil-img-wrap', bio: '.profil-section' });
    if (pre === 'm') await tallShot(p, 'm-profil-uzun.jpg', { maxScreens: 2.2 });

    // D) Sultan Arenası
    await ekran(p, 'arena', 400);
    await p.evaluate(() => {
      for (let i = 0; i < 20000; i++) {
        arenaState.round = 0; initArena();
        const { a, b, question } = arenaState;
        const ids = [a.id, b.id];
        if (ids.includes('kanuni-sultan-suleyman') && ids.some((x) => ['fatih-sultan-mehmed', 'yavuz-sultan-selim', 'osman-gazi', 'murad-1', 'mehmed-4'].includes(x)) && question.stat === 'saltanatYil') break;
      }
    });
    await resimler(p); await p.waitForTimeout(500);
    await shot(p, `${pre}-arena.jpg`);
    const dogru = await p.evaluate(() => SULTANLAR.find((s) => s.id === arenaState.question.answer).ad);
    const btn = p.locator('#arena-choices .arena-choice', { hasText: dogru });
    await mark(p, `${pre}-arena.jpg`, { dogru: `#arena-choices .arena-choice:nth-child(${(await p.evaluate((d) => [...document.querySelectorAll('#arena-choices .arena-choice')].findIndex((b) => b.textContent === d), dogru)) + 1})`, vs: '.arena-vs' });
    await btn.click();
    await p.waitForTimeout(450);
    await shot(p, `${pre}-arena-dogru.jpg`);
    await mark(p, `${pre}-arena-dogru.jpg`, { vs: '.arena-vs', secim: '#arena-choices' });

    // E) Quiz: Kolay, 10 soru — doğru cevaplarla oynanır
    await toastsiz(p);
    await ekran(p, 'quiz', 500);
    await p.click('.quiz-start-btn');
    await p.waitForTimeout(500);
    for (let i = 0; i < 10; i++) {
      const cevap = await p.evaluate(() => quizState.questions[quizState.current].cevap);
      if (i === 2) {
        await toastsiz(p);
        await p.mouse.move(2, 2);                // önceki dokunuşun hover izi kalmasın
        await p.evaluate(() => document.activeElement && document.activeElement.blur());
        await p.waitForTimeout(200);
        await shot(p, `${pre}-quiz.jpg`);
        const idx = await p.evaluate((c) => [...document.querySelectorAll('.quiz-ans')].findIndex((b) => b.textContent === c), cevap);
        await mark(p, `${pre}-quiz.jpg`, { dogru: `.quiz-answers .quiz-ans:nth-child(${idx + 1})`, soru: '.quiz-question' });
      }
      await p.locator('.quiz-ans', { hasText: cevap }).first().click();
      await p.waitForTimeout(i === 2 ? 350 : 120);
      if (i === 2) {
        await shot(p, `${pre}-quiz-dogru.jpg`);
        await mark(p, `${pre}-quiz-dogru.jpg`, { explain: '#quiz-explain', soru: '.quiz-question' });
      }
      await p.click('#quiz-next');
      await p.waitForTimeout(150);
    }
    await p.waitForTimeout(3400);   // konfeti ve bildirimler bitsin
    await toastsiz(p);
    await shot(p, `${pre}-sonuc.jpg`);
    await mark(p, `${pre}-sonuc.jpg`, { skor: '.quiz-score-circle', xp: '.quiz-xp-gain' });

    await ekran(p, 'profil', 700);
    await toastsiz(p);
    await shot(p, `${pre}-rozet.jpg`);
    await mark(p, `${pre}-rozet.jpg`, { rozet: '.rozet-grid', seviye: '.xp-bar-wrap' });
  }
});
