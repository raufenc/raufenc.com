// Safsata Dedektifi — çekimler (masaüstü d-*, mobil m-*)
// Akış: giriş → Özet galerisi (karta dokun) → Keşfet slaytı (Seçici Kanıt)
//       → Dedektif Modu: 5 senaryonun hepsi gerçek tıklamalarla doğru çözülür → sonuç ekranı.
import fs from 'node:fs';
import path from 'node:path';
import { withStudio } from '../../lib/capture.mjs';

// Masaüstü 1200×750: 960 px'lik içerik sütunu tarayıcı çerçevesini daha iyi doldurur (oran 1040×650 ile aynı).
const D_VIEW = { width: 1200, height: 750 };

await withStudio(import.meta.url, async ({ desktop, mobile, shot: rawShot, mark, hide, dir }) => {
  // her çekimden önce imleci boş köşeye çek (dokunulan düğmede :hover izi kalmasın)
  const shot = async (p, name, o) => {
    const v = p.viewportSize();
    await p.mouse.move(v.width - 2, v.height - 2);
    await p.waitForTimeout(180);
    return rawShot(p, name, o);
  };
  // kırpılmış (clip) çekimler için işaret: koordinatlar çekim yüksekliğine göre
  const markClip = async (p, name, sels, clipH, clipR) => {
    const res = await p.evaluate(({ sels, clipH, clipR }) => {
      const c = clipR || { x: 0, y: 0, width: innerWidth, height: clipH };
      const o = {};
      for (const [k, sel] of Object.entries(sels)) {
        const e = document.querySelector(sel);
        if (!e) { o[k] = null; continue; }
        const r = e.getBoundingClientRect();
        o[k] = { x: (r.left + r.width / 2 - c.x) / c.width, y: (r.top + r.height / 2 - c.y) / c.height, w: r.width / c.width, h: r.height / c.height };
      }
      return o;
    }, { sels, clipH, clipR });
    const f = path.join(dir, 'shots', 'marks.json');
    let all = {}; try { all = JSON.parse(fs.readFileSync(f, 'utf8')); } catch {}
    all[name] = Object.assign(all[name] || {}, res);
    fs.writeFileSync(f, JSON.stringify(all, null, 2));
  };
  for (const [pre, open] of [['d', (u) => desktop(u, { viewport: D_VIEW })], ['m', mobile]]) {
    const p = await open('/sunumlar/safsatalar/');
    await hide(p);
    const VH = p.viewportSize().height, VW = p.viewportSize().width;
    await p.waitForTimeout(1400); // kahraman bölümü fadeUp animasyonları
    const tabsTop = () => p.evaluate(() => { const h = document.querySelector('.hero'); return h.offsetTop + h.offsetHeight; });
    const toTabs = async () => {
      await p.waitForTimeout(80);
      const y = await tabsTop();
      await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
      await p.waitForTimeout(120);
    };
    const scrollToPicker = async () => {
      await p.evaluate(() => {
        const tb = document.querySelector('.tabs-bar').getBoundingClientRect().height;
        const m = document.querySelector('.picker-modal').getBoundingClientRect();
        window.scrollTo({ top: m.top + scrollY - tb - 14, behavior: 'instant' });
      });
      await p.waitForTimeout(200);
    };
    // Mobil: telefon çerçevesindeki Dynamic Island sekme etiketlerini örtmesin diye sekme çubuğuna
    // iOS'taki safe-area-inset-top gibi üst dolgu ver (yalnız çekim oturumunda; site koduna dokunulmaz).
    const SAFE = 60;
    const addSafeArea = () => p.addStyleTag({ content: `.tabs-bar{padding-top:${SAFE}px !important}` });
    // Masaüstü: seçici modal sayfanın soluna satır içi düştüğü için (site hatası) yalnız modalı kırp
    const modalClip = () => p.evaluate(() => {
      const r = document.querySelector('.picker-modal').getBoundingClientRect();
      const pad = 18;
      return { x: Math.max(0, Math.floor(r.left)), y: Math.max(0, Math.floor(r.top - pad)), width: Math.ceil(r.width), height: Math.ceil(r.height + pad * 2) };
    });
    const imgsReady = () => p.waitForFunction(() => [...document.images].filter((i) => {
      const r = i.getBoundingClientRect();
      return r.bottom > 0 && r.top < innerHeight && r.width > 0;
    }).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 8000 }).catch(() => console.warn('[görsel] bekleme zaman aşımı'));

    // 1) Giriş ekranı
    await imgsReady();
    await shot(p, `${pre}-hero.jpg`);
    if (pre === 'm') { await addSafeArea(); await p.waitForTimeout(100); }

    // 2) Keşfet — ilk slayt (yan telefon / yedek)
    await p.click('.tab-btn[data-tab="kesf"]');
    await toTabs(); await imgsReady(); await p.waitForTimeout(900);
    await shot(p, `${pre}-kesf1.jpg`);

    // 3) Özet galerisi → Seçici Kanıt kartına dokun
    await p.click('.tab-btn[data-tab="ozet"]');
    await toTabs();
    if (pre === 'm') {
      // mobilde galeriyi kullanıcı gibi kaydır: 7. kart (Seçici Kanıt) sabit sekme çubuğunun altında ortada
      // (uzun çekim + motor kaydırması yapışkan sekme çubuğunu da kaydırıp Dynamic Island altına sokuyordu)
      await p.evaluate(() => {
        const tb = document.querySelector('.tabs-bar').getBoundingClientRect().height;
        const c = document.querySelector('.ozet-card:nth-child(7)').getBoundingClientRect();
        window.scrollTo({ top: c.top + scrollY - tb - (innerHeight - tb - c.height) / 2, behavior: 'instant' });
      });
      await p.waitForTimeout(300);
    }
    await imgsReady(); await p.waitForTimeout(700);
    await shot(p, `${pre}-ozet.jpg`);
    await mark(p, `${pre}-ozet.jpg`, { secici: '.ozet-card:nth-child(7)', secici_img: '.ozet-card:nth-child(7) .ozet-card-img', grid: '.ozet-grid' });

    await p.click('.ozet-card:nth-child(7)');
    await toTabs(); await imgsReady(); await p.waitForTimeout(1100);
    await shot(p, `${pre}-kesf7.jpg`);
    await mark(p, `${pre}-kesf7.jpg`, {
      badge: '.safsata-badge', dialog: '.diyalog-box', text: '.slide-text-panel', img: '#slide-img', next: '#next-btn', wrap: '.slide-wrap',
    });
    // 4) Dedektif Modu — tüm senaryoları gerçek tıklamalarla çöz
    await p.click('.tab-btn[data-tab="oyun"]');
    await toTabs(); await p.waitForTimeout(500);
    for (let sc = 0; sc < 5; sc++) {
      await toTabs(); await p.waitForTimeout(300);
      if (sc === 1) {
        await shot(p, `${pre}-oyun.jpg`);
        await mark(p, `${pre}-oyun.jpg`, { sus: '.sus:not(.revealed)', card: '.scenario-card', score: '.score-box' });
      }
      let k = 0;
      while (await p.locator('.sus:not(.revealed)').count()) {
        const el = p.locator('.sus:not(.revealed)').first();
        const dogru = Number(await el.getAttribute('data-dogru'));
        await el.click();
        await p.waitForTimeout(550);
        if (sc === 1 && k === 0) {
          // NOT: #picker-overlay öğesinde .picker-overlay sınıfı yok → seçici modal ortada açılmaz,
          // sayfanın sonuna (senaryonun altına) satır içi düşer. Kullanıcı gibi ona kaydırıyoruz.
          await scrollToPicker();
          const pmarks = { dogru: `.picker-btn:nth-child(${dogru + 1})`, modal: '.picker-modal', grid: '.picker-grid', quote: '#picker-quote' };
          if (pre === 'd') {
            const c = await modalClip();
            await shot(p, `${pre}-picker.jpg`, { clip: c });
            await markClip(p, `${pre}-picker.jpg`, pmarks, 0, c);
          } else {
            await shot(p, `${pre}-picker.jpg`);
            await mark(p, `${pre}-picker.jpg`, pmarks);
          }
        }
        await p.locator('.picker-btn').nth(dogru).click();
        await p.waitForTimeout(300);
        if (sc === 1 && k === 0) {
          if (pre === 'm') {
            // mobilde geri bildirimle modal uzar; modal max-height:90vh olduğundan kendi içinde kayar.
            // Kullanıcı gibi: sayfayı modalın altı ekrana oturacak kadar kaydır, sonra modalı içten en alta kaydır
            // → yeşil doğru cevap + "Doğru! +10 puan" geri bildirimi aynı ekranda; sekmeler sabit kalır.
            await p.evaluate(() => {
              const m = document.querySelector('.picker-modal');
              const r = m.getBoundingClientRect();
              window.scrollTo({ top: r.bottom + scrollY - innerHeight + 14, behavior: 'instant' });
              m.scrollTop = m.scrollHeight;
            });
            await p.waitForTimeout(250);
            await shot(p, `${pre}-dogru.jpg`);
            await mark(p, `${pre}-dogru.jpg`, { fb: '#picker-feedback', modal: '.picker-modal', dogru: '.picker-btn.correct' });
          } else {
            const c = await modalClip();
            await shot(p, `${pre}-dogru.jpg`, { clip: c });
            await markClip(p, `${pre}-dogru.jpg`, { fb: '#picker-feedback', modal: '.picker-modal', dogru: '.picker-btn.correct' }, 0, c);
          }
        }
        // Doğru cevapta modal 2,2 sn sonra kendiliğinden kapanır. "Devam →" ile erken kapatıp hemen
        // sonraki ifadeye dokunulursa eski zamanlayıcı yeni açılan seçiciyi de kapatıyor (site hatası) →
        // kendiliğinden kapanmasını bekle.
        await p.waitForFunction(() => document.getElementById('picker-overlay').style.display === 'none', null, { timeout: 5000 });
        await p.waitForTimeout(300);
        k++;
      }
      await toTabs(); await p.waitForTimeout(300);
      if (sc === 4) {
        await shot(p, `${pre}-son.jpg`);
        await mark(p, `${pre}-son.jpg`, { next: '.next-scenario-btn', card: '.scenario-card', score: '.score-box' });
      }
      await p.click('.next-scenario-btn');
      await p.waitForTimeout(400);
    }
    await toTabs(); await p.waitForTimeout(900);
    await shot(p, `${pre}-sonuc.jpg`);
    await mark(p, `${pre}-sonuc.jpg`, { result: '.result-screen', rank: '.result-rank', score: '.result-score' });
    console.log(pre, 'puan:', await p.textContent('#score-display'), await p.textContent('.result-rank'), await p.textContent('.result-score'));
  }
});
