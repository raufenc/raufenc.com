// Yol Haritan — çekimler (masaüstü d-*, mobil m-*)
// Akış: karşılama → "Teste Başla" → Bölüm 1 girişi → soru (likert) → emoji tepki sorusu →
// senaryo sorusu → … 59 zorunlu + 12 bonus soru GERÇEKTEN tıklanarak çözülür → sonuç:
// arketip kartı, RIASEC radar + çubuklar, Beş Faktör çubukları, bölüm önerileri (eğitim düzeyi
// filtresi), sohbet kartları (Kendine / Ailenle / Rehberinle), paylaşılabilir kart görseli (PNG).
//
// Notlar
// - Puanlama sitenin kendi app.js'iyle cihazda yapılır; aşağıdaki cevap tablosu yalnız tıklanan seçenektir.
// - prefers-reduced-motion: reduce → otomatik geçiş kapalı, "Devam ›" ile ilerlenir; sonuç ekranındaki
//   çubuk/radar/sayaç animasyonları anında son hâline gelir (yarım animasyon çekilmez).
// - Hesaplama ekranı ("Yol haritan çiziliyor…") bir bekleme ekranıdır → çekilmez.
import fs from 'node:fs';
import path from 'node:path';
import { withStudio } from '../../lib/capture.mjs';

// Tıklanan cevaplar (1..5; senaryolarda seçenek sırası 0..3)
const ANS = {
  // Bölüm 1 — Atölye & Laboratuvar (R + I)
  R1: 2, I1: 4, R2: 3, I2: 4, R3: 2, I3: 5, R4: 3, I4: 5, R5: 2, I5: 3, R6: 1, I6: 4,
  SJT1: 2, // 🎨 Yeni bir şey tasarlamak / içerik üretmek
  // Bölüm 2 — Stüdyo & Topluluk (A + S)
  A1: 5, S1: 4, A2: 5, S2: 4, A3: 4, S3: 3, A4: 5, S4: 3, A5: 5, S5: 3, A6: 4, S6: 4,
  SJT2: 2, // 💡 Yepyeni bir sunum fikri bulurum
  // Bölüm 3 — Sahne & Düzen Masası (E + C)
  E1: 3, C1: 2, E2: 4, C2: 1, E3: 4, C3: 2, E4: 3, C4: 2, E5: 2, C5: 1, E6: 3, C6: 2,
  SJT3: 2, // 🔬 Araştırmacı — bilgiyi toplarım
  // Bölüm 4 — İçindeki Sen (Beş Faktör)
  E_1: 4, C_1: 3, O_1: 5, A_1: 5, N_1: 2, E_3: 2, C_2: 3, O_2: 5, A_3: 1, N_3: 4,
  E_2: 3, C_3: 3, O_3: 5, A_2: 4, N_2: 3, E_4: 3, C_4: 3, N_4: 4, O_4: 2, A_4: 4,
  // Bölüm 5 — Yön (bonus, değerler)
  V_AC1: 5, V_AC2: 5, V_IN1: 4, V_IN2: 5, V_RE1: 3, V_RE2: 3, V_RL1: 4, V_RL2: 4,
  V_SU1: 3, V_SU2: 3, V_WC1: 3, V_WC2: 4,
};

const CSS = [
  'html{scroll-behavior:auto!important}',
  '#rauf-nav{display:none!important}',
].join('\n');

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, origin, out }) => {
  const log = {};
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await open(null);
    await p.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
    await p.goto(origin + '/yol-haritan/', { waitUntil: 'domcontentloaded' });
    await p.waitForLoadState('networkidle').catch(() => {});
    // Mobilde telefon çerçevesinin "ada"sı (ekranın üst ~48 px'i) ürün adını örtmesin diye güvenli üst boşluk
    await p.addStyleTag({ content: CSS + (pre === 'm' ? '\n.topbar{padding-top:56px!important}\n.screen{overflow-x:clip}' : '') });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(900);

    const idle = async (ms = 450) => {
      if (pre === 'd') await p.mouse.move(2, 2);
      await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
      await p.waitForTimeout(ms);
    };
    const vp = [];
    const vpInfo = () => p.evaluate(() => ({ iw: innerWidth, vw: visualViewport.width, sw: document.documentElement.scrollWidth }));
    const cur = () => p.evaluate(() => {
      const t = document.querySelector('#qContainer .q__text');
      if (!t) return null;
      const it = YH.items.find((i) => i.text === t.textContent);
      return it ? { id: it.id, format: it.format, turn: it.turn } : { id: '?' };
    });
    const optSel = (q) => q.format === 'scenario'
      ? `.choice__opt[data-idx="${ANS[q.id]}"]`
      : `.scale__opt[data-v="${ANS[q.id]}"]`;
    // Mevcut soruyu cevapla ve ilerle; isteğe bağlı olarak cevaptan önce/sonra çekim al
    const answer = async (q, { before, after } = {}) => {
      if (ANS[q.id] == null) throw new Error('cevap yok: ' + q.id);
      const sel = optSel(q);
      if (before) {
        // Soru kartının giriş kayması bitsin (mobilde geçici yatay taşma: innerWidth 398 ≠ 390)
        await p.waitForFunction(() => document.documentElement.scrollWidth <= Math.round(visualViewport.width) && innerWidth === Math.round(visualViewport.width)
          && document.getAnimations().every((a) => a.effect?.getTiming().iterations === Infinity || a.playState !== 'running'), null, { timeout: 4000 }).catch(() => {});
        await idle(); await shot(p, before); vp.push([before, await vpInfo()]); }
      await p.locator(sel).click();
      await idle();
      // İşaretler tıklamadan SONRA alınır: mobilde yeni soru kartının giriş kayması (translateX)
      // innerWidth'i geçici olarak ~398 px'e çıkarıyor; yerleşim iki durumda aynıdır.
      if (before) await mark(p, before, { opt: sel, lbl: sel + ' .lbl, ' + sel + ' .t', emo: sel + ' .emoji', next: '#nextBtn' });
      if (after) { await shot(p, after); await mark(p, after, { opt: sel, lbl: sel + ' .lbl, ' + sel + ' .t', emo: sel + ' .emoji', next: '#nextBtn' }); vp.push([after, await vpInfo()]); }
      await p.locator('#nextBtn').click();
      await p.waitForTimeout(60);
    };

    // ── 1) karşılama ──
    await idle(300);
    await shot(p, `${pre}-hero.jpg`);
    await mark(p, `${pre}-hero.jpg`, { start: '#startBtn', title: '#introTitle' });
    await p.evaluate(() => scrollTo(0, document.querySelector('.feature-grid').getBoundingClientRect().top + scrollY - 140));
    await idle(300);
    await shot(p, `${pre}-hero-alt.jpg`);
    await p.evaluate(() => scrollTo(0, 0));

    // ── 2) teste başla → bölüm girişi ──
    await p.click('#startBtn');
    await p.waitForSelector('#turnGo');
    await idle();
    await shot(p, `${pre}-bolum1.jpg`);
    await mark(p, `${pre}-bolum1.jpg`, { go: '#turnGo' });
    await p.click('#turnGo');
    await p.waitForSelector('#qContainer .q__text');

    // ── 3) soruları tek tek çöz ──
    const seen = new Set();
    for (let guard = 0; guard < 120; guard++) {
      // ara ekranlar
      if (await p.locator('#contBtn').count()) {
        const h = await p.locator('#qContainer h2').textContent();
        if (h.includes('Atölye')) { await idle(); await shot(p, `${pre}-ara1.jpg`); await mark(p, `${pre}-ara1.jpg`, { cont: '#contBtn' }); }
        await p.click('#contBtn');
        await p.waitForTimeout(60);
        continue;
      }
      if (await p.locator('#doVals').count()) {
        await idle(); await shot(p, `${pre}-bonus.jpg`);
        await mark(p, `${pre}-bonus.jpg`, { doVals: '#doVals', skip: '#skipVals' });
        await p.click('#doVals');
        await p.waitForTimeout(60);
        continue;
      }
      if (await p.locator('#screen-calc.is-active, #screen-result.is-active').count()) break;
      const q = await cur();
      if (!q || q.id === '?') { await p.waitForTimeout(100); continue; }
      if (seen.has(q.id)) throw new Error('ilerleyemedi: ' + q.id);
      seen.add(q.id);
      const o = {};
      if (q.id === 'I1') { o.before = `${pre}-soru.jpg`; o.after = `${pre}-soru-sec.jpg`; }
      if (q.id === 'A2') { o.before = `${pre}-emoji.jpg`; o.after = `${pre}-emoji-sec.jpg`; }
      if (q.id === 'SJT2') { o.before = `${pre}-senaryo.jpg`; o.after = `${pre}-senaryo-sec.jpg`; }
      if (q.id === 'O_3') { o.before = `${pre}-karakter.jpg`; o.after = `${pre}-karakter-sec.jpg`; }
      await answer(q, o);
    }
    log[pre] = { answered: seen.size, vp };

    // ── 4) sonuç ──
    await p.waitForSelector('#screen-result.is-active', { timeout: 10000 });
    await p.waitForSelector('.arche-name');
    await idle(900);
    log[pre].result = await p.evaluate(() => ({
      arche: document.querySelector('.arche-name').textContent,
      code: document.querySelector('.arche-code').textContent,
      bars: [...document.querySelectorAll('#sec-ilgi .rbar')].map((r) => r.querySelector('.blabel').textContent + ' ' + r.querySelector('.count').textContent),
      traits: [...document.querySelectorAll('.trait')].map((r) => r.querySelector('.tname').textContent + ' ' + r.querySelector('.count').textContent),
      careers: [...document.querySelectorAll('#careersList .career')].map((c) => c.querySelector('.cmatch').textContent + ' · ' + c.querySelector('.cname').textContent),
      strengths: [...document.querySelectorAll('.chip')].map((c) => c.textContent),
    }));
    await shot(p, `${pre}-sonuc.jpg`);
    await mark(p, `${pre}-sonuc.jpg`, { hero: '.result-hero', emoji: '.arche-emoji', name: '.arche-name', ilgi: '#toc .toc-chip[href="#sec-ilgi"]', why: '.why-result summary' });

    // Bölüm başlığını üste al. Mobilde çekimin üst ~56 px'i telefon çerçevesinin "ada"sının altında kalır:
    // bu bantta hiç görünür metin olmayacak (önceki bölümden yarım kalan çip/başlık görünmeyecek) ve
    // başlık adanın altında kalacak şekilde, istenen paya (76) en yakın pay seçilir.
    const scrollTo = async (sel, dy = 0) => {
      const used = await p.evaluate(({ sel, dy, mob }) => {
        const e = document.querySelector(sel);
        let top = e.getBoundingClientRect().top + scrollY;
        let pick = dy, extra = 0;
        if (mob) {
          const rects = [];
          const root = document.querySelector('#screen-result');
          const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          for (let n; (n = w.nextNode());) {
            if (!n.textContent.trim()) continue;
            const r = document.createRange(); r.selectNodeContents(n);
            for (const q of r.getClientRects()) if (q.height > 0 && q.width > 0) rects.push([q.top + scrollY, q.bottom + scrollY]);
          }
          root.querySelectorAll('img,svg,canvas').forEach((x) => { const q = x.getBoundingClientRect(); if (q.height > 0) rects.push([q.top + scrollY, q.bottom + scrollY]); });
          const clear = (d) => { const Y0 = top - d; return !rects.some(([a, b]) => a < Y0 + 58 && b > Y0 - 1 && b <= top); };
          pick = null;
          const cand = []; for (let d = 60; d <= 110; d += 2) cand.push(d);
          cand.sort((a, b) => Math.abs(a - dy) - Math.abs(b - dy));
          for (const d of cand) if (clear(d)) { pick = d; break; }
          if (pick == null) {
            // Önceki bölümle başlık arasındaki boşluk adaya yetmiyor: bölümün üst boşluğu (30 px) yalnız
            // bu çekim için büyütülür, böylece önceki bölümün son satırı kadrajın tamamen dışında kalır.
            const Y0 = top - dy;
            const B = Math.max(...rects.filter(([a, b]) => a < Y0 + 58 && b > Y0 - 1 && b <= top).map(([, b]) => b));
            extra = Math.ceil(B + 2 - Y0);
            e.style.marginTop = (parseFloat(getComputedStyle(e).marginTop) + extra) + 'px';
            top += extra; pick = dy;
          }
        }
        scrollTo(0, top - pick);
        return { pick, extra };
      }, { sel, dy, mob: pre === 'm' });
      (log[pre].pad ||= {})[sel] = used;
      await idle(350);
    };
    await scrollTo('#sec-ilgi', pre === 'd' ? 40 : 76);
    await shot(p, `${pre}-radar.jpg`);
    await mark(p, `${pre}-radar.jpg`, { radar: '.radar-svg', bars: '.radar-card .bars', card: '.radar-card' });

    await scrollTo('#sec-karakter', pre === 'd' ? 40 : 76);
    await shot(p, `${pre}-karakter-sonuc.jpg`);
    await mark(p, `${pre}-karakter-sonuc.jpg`, { card: '#sec-karakter .card' });

    await scrollTo('#sec-meslek', pre === 'd' ? 40 : 76);
    await shot(p, `${pre}-meslek.jpg`);
    await mark(p, `${pre}-meslek.jpg`, { lisans: '#zonePick .zbtn[data-z="4"]', kisa: '#zonePick .zbtn[data-z="3"]', onlisans: '#zonePick .zbtn[data-z="2"]', list: '#careersList' });
    await p.click('#zonePick .zbtn[data-z="2"]');
    await idle(350);
    log[pre].onlisans = await p.evaluate(() => [...document.querySelectorAll('#careersList .career .cname')].map((c) => c.textContent));
    await shot(p, `${pre}-meslek-onlisans.jpg`);
    await mark(p, `${pre}-meslek-onlisans.jpg`, { list: '#careersList' });
    await p.click('#zonePick .zbtn[data-z="5"]');
    await idle(200);

    await scrollTo('#sec-sohbet', pre === 'd' ? 40 : 76);
    await shot(p, `${pre}-sohbet.jpg`);
    await mark(p, `${pre}-sohbet.jpg`, { family: '#tab-family', counselor: '#tab-counselor', body: '#tabBody' });
    await p.click('#tab-family');
    await idle(350);
    await shot(p, `${pre}-sohbet-aile.jpg`);
    await mark(p, `${pre}-sohbet-aile.jpg`, { body: '#tabBody' });

    // Not: "Kart Görseli" (Canvas → PNG) çekilmez — ilgi kodu satırı 1080 px tuvalden taşıyor (bkz. rapor).
  }
  fs.writeFileSync(path.join(path.dirname(out('x')), 'log.json'), JSON.stringify(log, null, 2));
  console.log(JSON.stringify(log, null, 2));
});
