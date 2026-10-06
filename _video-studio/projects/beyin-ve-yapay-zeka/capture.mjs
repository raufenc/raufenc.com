// Beyin ↔ Yapay Zekâ — çekimler (masaüstü d-*, mobil m-*)
// Sahneler: kahraman → 50 keşif (ara "dopamin" → kartı aç) → görsel diyagramlar
// → kronoloji (kaydırma) → quiz (doğru cevaba dokun).
import { withStudio } from '../../lib/capture.mjs';

const BASE = '/beyin-ve-yapay-zeka/';
// Kaydırma animasyonu kapalı; kayan "Keşif Puanı" rozeti içeriği örtmesin.
// Mobilde üst menü bağlantıları yatay kayıyor ve sağdan kesik görünüyor → yalnız logo kalsın.
// Üst menü yarı saydam (rgba .92 + blur) → arkasından soluk metin sızıyor; çekimde opak yap.
const CSS = 'html{scroll-behavior:auto!important}.progress-float{display:none!important}'
  + '.nav{background:#060612!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}';
const CSS_M = '.nav-links{display:none!important}';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark }) => {
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const openP = async () => {
      const p = await open(BASE);
      await p.addStyleTag({ content: CSS + (pre === 'm' ? CSS_M : '') });
      await p.evaluate(() => document.querySelectorAll('.fade-up').forEach((e) => e.classList.add('vis')));
      return p;
    };
    const blur = async (p) => {
      await p.mouse.move(2, 2);
      await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
    };
    const scrollToEl = async (p, sel, off) => {
      await p.evaluate(([s, o]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - o); }, [sel, off]);
      await p.waitForTimeout(700);
    };
    // Belirli bölümün üstündeki her şeyi gizle (uzun çekim o bölümden başlasın)
    // Mobilde sabit menü de gizlenir: kaydırmada menü yukarı kayıp kesik görünmesin; bölümün kendi
    // üst boşluğu dinamik adaya pay bırakır.
    const hideAbove = (p, keepId, extra = '') => p.addStyleTag({
      content: `body>section{display:none!important} #${keepId}{display:block!important} ${pre === 'm' ? '.nav{display:none!important}' : ''} ${extra}`,
    });

    // ── 1) kahraman ──
    let p = await openP();
    await p.waitForTimeout(1800); // nöron ağı tuvali dolsun
    // Sitenin "120 yıllık" alt metni ve "120 Yıllık Tarih" sayacı veriyle (1861→2022 = 161 yıl)
    // uyuşmuyor; videonun "1861'den 2022'ye" anlatımıyla çelişmesin diye yalnız bu çekimde gizle.
    const heroTmp = await p.addStyleTag({ content: '.hero-sub,.hero-stats{display:none!important}' });
    await p.waitForTimeout(300);
    await shot(p, `${pre}-hero.jpg`);
    await heroTmp.evaluate((e) => e.remove());

    // ── 2) 50 keşif listesi → arama "dopamin" → kartı aç ──
    await scrollToEl(p, '#kesifler .sh', pre === 'd' ? 70 : 60);
    await blur(p);
    await shot(p, `${pre}-kesif.jpg`);
    await mark(p, `${pre}-kesif.jpg`, { ara: '#searchInput', liste: '#cardsContainer' });
    await p.fill('#searchInput', 'dopamin');
    await p.waitForTimeout(400);
    await p.locator('#cardsContainer .card-head').first().click();
    await p.waitForTimeout(900);
    await blur(p);
    await scrollToEl(p, '#kesifler .cards-toolbar', pre === 'd' ? 80 : 66);
    // altta yarım görünen sonraki bölüm başlığı ("Keşif Aileleri") yakınlaştırmada kesik kalmasın
    // masaüstünde sabit üst menü yakınlaştırmada adres çubuğunun altında yarım kalıyor → bu çekimde gizle
    const tmp = await p.addStyleTag({ content: '#kesifler ~ section{visibility:hidden!important}'
      + (pre === 'd' ? '.nav{display:none!important}#kesifler .sh{visibility:hidden!important}' : '') });
    await shot(p, `${pre}-kesif-acik.jpg`);
    await mark(p, `${pre}-kesif-acik.jpg`, { kart: '#cardsContainer .card-item', ilke: '#cardsContainer .card-principle' });
    await tmp.evaluate((e) => e.remove());

    // ── 3) görsel diyagramlar ──
    if (pre === 'd') {
      // bölüm başlığı kadraja girmesin: ilk diyagram kartı menünün (54px) ~20px altında başlasın
      await scrollToEl(p, '#diyagramlar .diagram-card', 74);
      // altta yarım görünen sonraki diyagram (Hebb ↔ Backprop) yakınlaştırmada kesik şerit bırakmasın
      const dTmp = await p.addStyleTag({ content: '#diyagramlar .diagram-card ~ .diagram-card,#diyagramlar ~ section{visibility:hidden!important}' });
      await p.waitForTimeout(200);
      await shot(p, 'd-diyagram.jpg');
      await mark(p, 'd-diyagram.jpg', { noron: '#diyagramlar .diagram-card svg', kart: '#diyagramlar .diagram-card' });
      await dTmp.evaluate((e) => e.remove());
    } else {
      // mobilde SVG diyagramlar çok küçük kalıyor → okunur HTML diyagram (Hebb ↔ Backprop)
      const q = await openP();
      // bölüm açıklaması kaydırmada dinamik adanın arkasında kesilmesin → uzun çekim ilk karttan başlasın
      await hideAbove(q, 'diyagramlar', '#diyagramlar .sh{display:none!important}');
      await q.evaluate(() => { document.querySelector('#diyagramlar .diagram-card').style.display = 'none'; });
      await q.waitForTimeout(500);
      await tallShot(q, 'm-diyagram-uzun.jpg', { maxScreens: 2 });
      await q.close();
    }

    // ── 4) kronoloji (uzun çekim, kaydırma) ──
    {
      const q = await openP();
      // bölüm açıklaması "120 yıllık…" diyor (veri: 1861→2022) → gizle; başlık ve "Tümü (100)" kalsın
      await hideAbove(q, 'kronoloji', '#kronoloji .sh p{display:none!important}');
      await q.waitForTimeout(500);
      await tallShot(q, `${pre}-kronoloji-uzun.jpg`, { maxScreens: 3 });
      await q.close();
    }

    // ── 5) quiz: anlaşılır bir "YZ karşılığı" sorusu gelene kadar yeniden başlat ──
    // mobilde doğru cevabın açıklaması ekrana sığsın diye oyun sekmelerinden başla
    // masaüstünde yakınlaştırmada sabit üst menü adres çubuğunun altında yarım kalıyor → quiz çekimlerinde gizle
    if (pre === 'd') { await p.addStyleTag({ content: '.nav{display:none!important}' }); await scrollToEl(p, '#oyun .sh', 64); }
    else await scrollToEl(p, '#oyun .game-tabs', 66);
    const want = pre === 'd' ? 'Dikkat Işığı' : 'Ayna Nöronları';
    for (let i = 0; i < 4000; i++) {
      const ok = await p.evaluate((w) => {
        startQuiz();
        const q = quizQuestions[0];
        return q.q.includes(`"${w}"`) && q.q.includes('yapay zekâdaki karşılığı nedir');
      }, want);
      if (ok) break;
      if (i === 3999) throw new Error('istenen quiz sorusu gelmedi');
    }
    await p.waitForTimeout(300);
    await blur(p);
    const correctIdx = await p.evaluate(() => [...document.querySelectorAll('.quiz-opt')].findIndex((o) => o.dataset.val === quizQuestions[0].answer));
    await shot(p, `${pre}-quiz.jpg`);
    await mark(p, `${pre}-quiz.jpg`, { dogru: `.quiz-opt:nth-child(${correctIdx + 1})`, kart: '#quizCard' });
    await p.locator('.quiz-opt').nth(correctIdx).click();
    await p.waitForTimeout(600);
    await blur(p);
    await shot(p, `${pre}-quiz-dogru.jpg`);
    await mark(p, `${pre}-quiz-dogru.jpg`, { aciklama: '#quizExplain', kart: '#quizCard' });
  }
});
