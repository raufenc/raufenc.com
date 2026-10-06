// Bilim Nedir, Ne Değildir? — çekimler (masaüstü d-*, mobil m-*)
// Sunum: /sunumlar/bilim/ — hero ekranı, slayt geçişleri (↓ ok), Bölümler menüsü, bilgi testi.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { withStudio } from '../../lib/capture.mjs';

// Motorun telefon çerçevesindeki "dynamic island" ekranın üst ~44 px'ini örtüyor; sunumun üst
// çubuğu (sayaç, Quiz, Bölümler) bunun altında kalıyordu. Gerçek iPhone'daki gibi: sayfa 390×797
// görüntü alanında açılır, üstüne 47 px'lik durum çubuğu payı (sayfanın üst rengiyle) eklenir →
// sonuç yine 390×844 (@2x 780×1688). İşaretler buna göre yeniden ölçeklenir.
const SB = 47, MH = 844;
function addStatusBar(shotsDir) {
  const py = `
import sys, glob, os
from PIL import Image
d, inset = sys.argv[1], int(sys.argv[2])
for f in sorted(glob.glob(os.path.join(d, 'm-*.jpg'))):
    im = Image.open(f).convert('RGB')
    w, h = im.size
    k = w // 390
    if h != (${MH} - inset) * k: continue  # zaten işlenmiş
    c = im.getpixel((6 * k, 2 * k))
    out = Image.new('RGB', (w, h + inset * k), c)
    out.paste(im, (0, inset * k))
    out.save(f, quality=90)
`;
  const r = spawnSync('python3', ['-c', py, shotsDir, String(SB)], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('durum çubuğu eklenemedi');
  const mf = path.join(shotsDir, 'marks.json');
  const marks = JSON.parse(fs.readFileSync(mf, 'utf8'));
  const vh = MH - SB;
  for (const [name, set] of Object.entries(marks)) {
    if (!name.startsWith('m-')) continue;
    for (const v of Object.values(set)) if (v) { v.y = (SB + v.y * vh) / MH; v.h = (v.h * vh) / MH; }
  }
  fs.writeFileSync(mf, JSON.stringify(marks, null, 2));
}

// Bir slayda git, IntersectionObserver .vis versin, görsel yüklensin, geçiş animasyonları bitsin.
async function gotoSlide(p, i) {
  await p.evaluate((i) => goTo(i), i);
  await waitSlide(p, i);
}
async function waitSlide(p, i) {
  await p.waitForFunction((i) => {
    const s = document.querySelectorAll('.slide')[i];
    if (!s || !s.classList.contains('vis') || cur !== i) return false;
    const img = s.querySelector('img');
    return !img || (img.complete && img.naturalWidth > 0);
  }, i, { timeout: 15000 });
  await p.waitForTimeout(1100); // .img-wrap / .caption geçişleri (0.6 sn + gecikme)
}
// Hero ekranını kapat (Sunuma Başla düğmesinin yaptığı gibi) ve bekle.
async function skipHero(p) {
  await p.evaluate(() => startPresentation(0));
  await p.waitForTimeout(900);
}

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, hide, dir }) => {
  fs.rmSync(path.join(dir, 'shots', 'marks.json'), { force: true }); // eski işaretler kalmasın
  const mobileSafe = (u) => mobile(u, { viewport: { width: 390, height: MH - SB } });
  for (const [pre, open] of [['d', desktop], ['m', mobileSafe]]) {
    // 1) Hero
    let p = await open('/sunumlar/bilim/');
    // nav.js <head> içinde çalıştığı için data-nav-skip'i göremiyor → #rauf-nav sunumun kendi
    // üst çubuğunun üstüne biniyor (site sorunu, raporlandı). Çekimde gizle.
    await hide(p);
    await p.waitForTimeout(1500);
    const ov = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, nav: document.querySelector('.nav').scrollWidth }));
    console.log(pre, 'taşma', ov);
    await shot(p, `${pre}-hero.jpg`);
    await mark(p, `${pre}-hero.jpg`, { start: '.hero-btn-primary', quiz: '.hero-btn-secondary', b6: '.hero-ch-chip:nth-child(6)' });

    // 2) Slayt geçişi: 58 → ↓ (gerçek ok tıklaması) → 59
    //    (57. slaydın görselinde "verememessi" yazım hatası var; temiz metinli 58–59 seçildi)
    await skipHero(p);
    await gotoSlide(p, 58);
    await shot(p, `${pre}-s58.jpg`);
    await mark(p, `${pre}-s58.jpg`, { next: '#nextBtn', img: '.slide[data-i="58"] .img-wrap' });
    await p.click('#nextBtn');
    await waitSlide(p, 59);
    await shot(p, `${pre}-s59.jpg`);
    await mark(p, `${pre}-s59.jpg`, { img: '.slide[data-i="59"] .img-wrap' });

    // 3) Bölümler menüsü: slayt 34 → ☰ Bölümler → menüyü Bölüm 3'e kaydır → "Teori Yüklü Gözlem" → slayt 23
    await gotoSlide(p, 34);
    await shot(p, `${pre}-s34.jpg`);
    await mark(p, `${pre}-s34.jpg`, { toc: '#tocBtn', img: '.slide[data-i="34"] .img-wrap' });
    await p.click('#tocBtn');
    await p.waitForTimeout(500);
    await p.evaluate(() => {
      const toc = document.getElementById('toc');
      const sec = [...toc.querySelectorAll('.toc-section')].find((e) => e.textContent.includes('Bölüm 3'));
      toc.scrollTop = sec.offsetTop;
    });
    await p.waitForTimeout(500);
    await shot(p, `${pre}-toc.jpg`);
    await mark(p, `${pre}-toc.jpg`, { teori: '.toc-item[data-g="23"]', aktif: '.toc-item[data-g="34"]', toc: '#toc' });
    await p.click('.toc-item[data-g="23"]');
    await waitSlide(p, 23);
    await shot(p, `${pre}-s23.jpg`);
    await mark(p, `${pre}-s23.jpg`, { img: '.slide[data-i="23"] .img-wrap' });

    // 4) Bilgi testi: ilk 4 soruyu doğru cevapla → Soru 5 → doğru şık → geri bildirim → sonuç
    await p.evaluate(() => openQuiz());
    await p.waitForTimeout(400);
    for (let q = 0; q < 4; q++) {
      await p.evaluate(() => { answerQuiz(QUIZ[quizQIndex].ans); nextQuestion(); });
    }
    await p.waitForTimeout(600);
    await shot(p, `${pre}-quiz.jpg`);
    const ans = await p.evaluate(() => QUIZ[quizQIndex].ans);
    await mark(p, `${pre}-quiz.jpg`, { ok: `.quiz-opt[data-idx="${ans}"]`, q: '.quiz-question' });
    await p.click(`.quiz-opt[data-idx="${ans}"]`);
    await p.waitForTimeout(600);
    await shot(p, `${pre}-quiz-ok.jpg`);
    await mark(p, `${pre}-quiz-ok.jpg`, { ok: `.quiz-opt[data-idx="${ans}"]`, fb: '#qFeedback', next: '#qNext' });
    await p.evaluate(() => {
      nextQuestion();
      while (quizQIndex < QUIZ.length) { answerQuiz(QUIZ[quizQIndex].ans); nextQuestion(); }
    });
    await p.waitForTimeout(700);
    await shot(p, `${pre}-quiz-son.jpg`);
    await mark(p, `${pre}-quiz-son.jpg`, { score: '.quiz-score-num', level: '.quiz-level' });
  }
  addStatusBar(path.join(dir, 'shots'));
});
