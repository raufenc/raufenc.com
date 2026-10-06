// Kalbinin Haritası — çekimler (masaüstü d-*, mobil m-*)
// Akış: karşılama → test seçimi (Tevazu kartına dokun) → Kibir testi 1. soru →
// son soru (dengeli seçeneğe dokun) → sonuç kartı (önceki denemeyle kıyaslı LED göstergeler) →
// "Ahlak Haritam" (çözülen 6 testin yüzdeleri).
//
// Notlar
// - Testler gerçekten tıklanarak çözülür; yüzdeler sitenin kendi calcAndShow()/pct() koduyla yerelde hesaplanır.
// - Site, sonucu geçmişe yalnız /api/gemini akışı BAŞARIYLA bitince kaydediyor (çevrimdışıyken kayıt yok).
//   Bu yüzden /api/gemini boş bir akışla ("data: [DONE]") yanıtlanır: hiçbir yapay zekâ metni üretilmez,
//   ama sitenin kendi kayıt yolu (S.history + localStorage) çalışır. Yapay zekâ bölümü çekimlerde gizlenir.
// - Sağ üstteki sabit 👤/☀️ düğmeleri mobilde başlıkların ve ilerleme çubuğunun üstüne biniyor → gizlenir.
import { withStudio } from '../../lib/capture.mjs';

// Cevap dizileri (seçilen seçeneğin puanı, 1..5). Puanlama: 1→tefrit+2, 2→tefrit+1, 3→fazilet+2, 4→ifrat+1, 5→ifrat+2
const SEED = [
  ['kibir',     [4, 5, 3, 4, 2, 3, 4, 3, 5, 3, 4]], // ilk deneme: kibre meyilli
  ['cesaret',   [3, 2, 3, 1, 3, 3, 2, 3, 4, 3, 3]],
  ['sabir',     [4, 3, 4, 3, 3, 5, 3, 2, 3, 4, 3]],
  ['comertlik', [3, 3, 2, 3, 3, 3, 4, 3, 3, 2, 3]],
  ['hilm',      [5, 3, 4, 3, 3, 4, 3, 3, 2, 3, 3]],
  ['sukur',     [3, 3, 3, 2, 3, 3, 3, 1, 3, 3, 3]],
];
const RETAKE = [3, 4, 3, 3, 2, 3, 4, 3, 3, 3, 3]; // Kibir testi ikinci deneme

const CSS = [
  '#auth-btn,#theme-toggle{display:none!important}',
  'html{scroll-behavior:auto!important}',
  // çevrimdışı yapay zekâ bölümü ve ona bağlı PDF düğmesi
  '#result-card>.divider,#result-card>h2,#result-card>p,#gemini-box,#next-test-slot{display:none!important}',
  '[data-action="share"]{display:none!important}',
].join('\n');

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark, origin }) => {
  const log = {};
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await open(null);
    await p.route('**/api/gemini', (r) => r.fulfill({ status: 200, contentType: 'text/event-stream', body: 'data: [DONE]\n\n' }));
    log[pre] = {};
    await p.goto(origin + '/kalbinin-haritasi/', { waitUntil: 'domcontentloaded' });
    await p.waitForLoadState('networkidle').catch(() => {});
    await p.addStyleTag({ content: CSS });
    // dikey videoda telefon çerçevesinin Dynamic Island'ı ekranın üst ~50 px'ini örter →
    // yalnız mobil çekimlerde üst güvenli alan boşluğu (başlıklar adanın altından başlasın)
    if (pre === 'm') await p.addStyleTag({ content: 'body{padding-top:56px!important}' });
    await p.evaluate(() => document.fonts.ready);

    const idle = async (ms = 650) => {
      await p.mouse.move(1, 1);
      await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
      await p.waitForTimeout(ms);
    };
    const toStart = async () => { await p.evaluate(() => { S.screen = 'start'; render(); }); await idle(); };
    const answer = async (puan, i) => {
      await p.locator(`.option-label[data-score="${puan}"]`).click();
      await p.waitForFunction((n) => S.qi === n + 1 || S.screen === 'result', i, { timeout: 5000 });
      await p.waitForTimeout(120);
    };
    // bir testi baştan sona tıklayarak çöz, sonuç kaydedilene kadar bekle
    const solve = async (key, answers, { beforeLast } = {}) => {
      await p.locator(`[data-action="startTest"][data-key="${key}"]`).click();
      await p.waitForFunction((k) => S.screen === 'quiz' && S.testKey === k, key);
      await idle(400);
      for (let i = 0; i < answers.length - 1; i++) await answer(answers[i], i);
      if (beforeLast) await beforeLast();
      await p.locator(`.option-label[data-score="${answers.at(-1)}"]`).click();
      await p.waitForFunction(() => S.screen === 'result');
      return p.evaluate(() => ({ scores: S.scores, pct: pct(S.scores), prev: S.previousScores && pct(S.previousScores) }));
    };
    const saved = (key) => p.waitForFunction((k) => S.gemini && !S.gemini.streaming && S.history[k], key, { timeout: 8000 });

    // ── 1) karşılama ──
    await p.waitForTimeout(1600); // fade-in animasyonları
    await idle(200);
    await shot(p, `${pre}-hero.jpg`);

    // ── geçmişi gerçek çözümlerle doldur ──
    for (const [key, ans] of SEED) {
      await toStart();
      const r = await solve(key, ans);
      await saved(key);
      log[pre][key] = r.pct;
    }

    // ── 2) test seçimi: Tevazu kartına dokun ──
    await toStart();
    await shot(p, `${pre}-start.jpg`);
    await mark(p, `${pre}-start.jpg`, {
      tevazu: '[data-action="startTest"][data-key="kibir"]', liste: '.grid',
      kutuplar: '[data-action="startTest"][data-key="kibir"] > .flex.justify-between',
      tevazuYuzde: '[data-action="startTest"][data-key="kibir"] > .mt-3',
    });

    // ── 3) Kibir testi: 1. soru → son soru → sonuç ──
    let r;
    await p.locator('[data-action="startTest"][data-key="kibir"]').click();
    await p.waitForFunction(() => S.screen === 'quiz' && S.testKey === 'kibir');
    await idle(500);
    await shot(p, `${pre}-soru1.jpg`);
    await mark(p, `${pre}-soru1.jpg`, { kart: '.quiz-card', soru: '.quiz-question', dengeli: '.option-label[data-score="3"]' });
    await p.evaluate(() => { S.screen = 'start'; render(); });
    await idle(400);
    r = await solve('kibir', RETAKE, {
      beforeLast: async () => {
        await idle(500);
        await shot(p, `${pre}-soru-son.jpg`);
        await mark(p, `${pre}-soru-son.jpg`, { kart: '.quiz-card', soru: '.quiz-question', dengeli: `.option-label[data-score="${RETAKE.at(-1)}"]` });
      },
    });
    log[pre].kibir2 = r;
    await saved('kibir');
    await p.waitForTimeout(1200); // LED çubukları (1,8 sn) ve sayaçlar oturur
    await idle(300);
    await shot(p, `${pre}-sonuc.jpg`);
    await mark(p, `${pre}-sonuc.jpg`, { barlar: '.led-bars-container', kibir: '#bar-ifrat', tevazu: '#bar-fazilet', baslik: '#result-card h1' });

    // ── 4) Ahlak Haritam ──
    await toStart();
    await p.locator('[data-action="goHistory"]').click();
    await p.waitForFunction(() => S.screen === 'history');
    await idle(700);
    await shot(p, `${pre}-harita.jpg`);
    await mark(p, `${pre}-harita.jpg`, { liste: '.space-y-4', ilk: '.space-y-4 > div:first-child' });
    await tallShot(p, `${pre}-harita-uzun.jpg`, { maxScreens: 3 });
    log[pre].history = await p.evaluate(() => Object.fromEntries(Object.entries(S.history).map(([k, v]) => [k, pct(v.percentages)])));
    log[pre].done = await p.evaluate(() => `${completedCount()}/${Object.keys(TESTS).length}`);
    log[pre].tests = await p.evaluate(() => ({ n: Object.keys(TESTS).length, q: Object.values(TESTS).reduce((a, t) => a + t.questions.length, 0) }));
    log[pre].overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  }
  console.log(JSON.stringify(log, null, 1));
});
