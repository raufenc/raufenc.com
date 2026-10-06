// NöroTerbiye — çekimler (masaüstü d-*, mobil m-*)
// Sahneler: ana sayfa → beyin haritası (bölgeye dokun) → Hile Risk Radarı testi
// (soru → açıklama → sonuç) → Nefs Gemisi oyunu (fırtınada seçim → denge değişir).
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark }) => {
  // site üst çubuğu (#rauf-nav) ve NöroTerbiye "Menü" düğmesi (.nt-nav) çekimde görünmesin
  const prep = (p) => p.addStyleTag({ content: '#rauf-nav,.nt-nav,.nt-skip-link{display:none!important} html{scroll-behavior:auto!important}' });
  // odak çerçevesi ve imleç üzerindeki "hover" vurgusu çekimde görünmesin
  const blur = async (p) => {
    await p.mouse.move(2, 2);
    await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
  };

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    // ── 1) ana sayfa kahraman bölümü ──
    // Not: mobilde kahramandaki sayaç satırı (131/16/13/19) iki yandan taşıyor (site hatası);
    // bu yüzden mobil ana sayfa kullanılmıyor, mobilde test listesi çekiliyor.
    let p;
    if (pre === 'd') {
      p = await open('/noroterbiye/');
      await prep(p);
      await p.waitForTimeout(2600); // giriş animasyonları + sayaçlar
      await p.evaluate(() => scrollTo(0, 56));
      await p.waitForTimeout(500);
      await shot(p, 'd-hero.jpg');
    } else {
      p = await open('/noroterbiye/testler/');
      await prep(p);
      await p.waitForTimeout(1500);
      await shot(p, 'm-testler.jpg');
    }

    // ── 2) beyin haritası: Nucleus Accumbens'e dokun → bilgi paneli ──
    p = await open('/noroterbiye/gorseller/beyin-haritasi/');
    await prep(p);
    await p.waitForTimeout(1600);
    const nac = '.region-group[data-region="nac"] .region-dot-core';
    await shot(p, `${pre}-beyin.jpg`);
    await mark(p, `${pre}-beyin.jpg`, { nac, brain: '.brain-svg' });
    await p.locator(nac).click();
    await blur(p); // odak çerçevesi görünmesin
    await p.waitForTimeout(1000);
    await shot(p, `${pre}-beyin-nac.jpg`);
    await mark(p, `${pre}-beyin-nac.jpg`, { panel: '#infoPanel', nac });

    // ── 3) Modern Hile Risk Radarı: 8. soru → cevap + açıklama → sonuç ──
    p = await open('/noroterbiye/testler/hile-risk-radari/');
    await prep(p);
    await p.waitForTimeout(1000);
    // gerçekçi bir yanıt dizisi (toplam 17/48 puan → %65 "Bazı Alanlar Hassas")
    const answers = [3, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2];
    const answerQ = async (i) => {
      await p.locator('#options .nt-quiz-option').nth(answers[i]).click();
      await p.waitForFunction((n) => TestEngine.state.current === n, i + 1, { timeout: 5000 });
      await p.waitForTimeout(250);
    };
    for (let i = 0; i < 7; i++) await answerQ(i);
    await blur(p);
    await p.waitForTimeout(400);
    await shot(p, `${pre}-test-soru.jpg`);
    await mark(p, `${pre}-test-soru.jpg`, { secim: `#options .nt-quiz-option:nth-of-type(${answers[7] + 1})`, kart: '#test-area' });
    await p.locator('#options .nt-quiz-option').nth(answers[7]).click();
    await p.waitForTimeout(380); // seçili + açıklama görünür, sonraki soruya geçmeden
    await blur(p);
    // mobilde açıklama ekranın altına taşıyor: kartı üste hizala
    // (alt başlığın son satırı yarım görünmesin diye tam altından kes)
    if (pre === 'm') await p.evaluate(() => scrollTo({ top: document.querySelector('.nt-subtitle').getBoundingClientRect().bottom + scrollY + 2, behavior: 'instant' }));
    // açıklama 1,5 sn sonra kayboluyor: önce işaretle, sonra çek
    await mark(p, `${pre}-test-aciklama.jpg`, { aciklama: '.nt-quiz-explanation', secim: '.nt-quiz-option.selected' });
    await shot(p, `${pre}-test-aciklama.jpg`);
    await p.waitForFunction(() => TestEngine.state.current === 8, null, { timeout: 5000 });
    await p.waitForTimeout(250);
    for (let i = 8; i < 12; i++) await answerQ(i);
    await p.waitForSelector('.nt-result-score');
    await blur(p);
    await p.evaluate(() => scrollTo(0, 0));
    await p.waitForTimeout(700);
    await shot(p, `${pre}-test-sonuc.jpg`);
    await mark(p, `${pre}-test-sonuc.jpg`, { skor: '.nt-result-score', etiket: '.nt-result-label' });
    console.log(pre, 'test sonucu:', await p.textContent('.nt-result-score'), await p.textContent('.nt-result-label'));

    // ── 4) Nefs Gemisi: 3. etapta "Öfke Şimşeği" gelene kadar dene, iki etap oyna ──
    p = await open('/noroterbiye/oyunlar/nefs-gemisi/');
    await prep(p);
    // Oyuncu ilk etapta nefsine uyar, ikincide hikmetli seçer; üçüncü etap "Öfke Şimşeği".
    // Göstergeler ne tavana (100) ne dibe vursun ki "Beyaz bayrak" seçiminin etkisi görünsün.
    let plan = null;
    for (let tries = 0; tries < 200 && !plan; tries++) {
      if (tries) { await p.reload({ waitUntil: 'domcontentloaded' }); await prep(p); }
      await p.waitForTimeout(200);
      await p.click('text=Yelken Aç!');
      plan = await p.evaluate(() => {
        if (!shuffled[2].title.includes('Öfke')) return null;
        const v = { kalp: 70, akil: 70, nefs: 70, cevre: 70 };
        const apply = (fx) => { for (const k in v) v[k] = Math.max(0, Math.min(100, v[k] + fx[k])); };
        const wise = (c) => c.fx.kalp + c.fx.akil + c.fx.cevre;
        const c0 = shuffled[0].choices, c1 = shuffled[1].choices;
        const i0 = c0.reduce((b, c, i) => (c.fx.nefs > c0[b].fx.nefs ? i : b), 0);
        const i1 = c1.reduce((b, c, i) => (wise(c) > wise(c1[b]) ? i : b), 0);
        apply(c0[i0].fx); apply(c1[i1].fx);
        const pre = { ...v };
        apply(shuffled[2].choices[2].fx);
        const ok = Object.values(pre).every((x) => x >= 45 && x <= 85) && Object.values(v).every((x) => x >= 40 && x <= 95);
        return ok ? { picks: [i0, i1], pre, post: { ...v }, titles: [shuffled[0].title, shuffled[1].title] } : null;
      });
    }
    if (!plan) throw new Error('Nefs Gemisi: uygun sıra bulunamadı');
    console.log(pre, 'gemi planı:', JSON.stringify(plan));
    for (const pick of plan.picks) {
      await p.locator('.storm-choice').nth(pick).click();
      await p.waitForTimeout(300);
      await p.click('text=Sonraki Etap →');
      await p.waitForTimeout(300);
    }
    // Önce "Beyaz bayrak" seçilip sonuç ekranı için kaydırma konumu S hesaplanır, sonra etap
    // oyunun kendi durumuyla (vals/round + showStorm) geri yüklenir. Seçim öncesi ve sonrası
    // çekimler AYNI kaydırma konumunda alınır → geçişte göstergeler ve kartlar sıçramaz.
    //  d: S = sonuç kutusu + "Sonraki Etap" düğmesi ekrana sığacak kadar.
    //  m: S = "Beyaz bayrak" kartı ekranın ~%62–70'ine gelecek kadar (alttaki Reels bölgesinden uzak);
    //     göstergeler çentiğin altında, "Sonraki Etap" düğmesi ekranda kalsın.
    // Sayfanın alt sınırı S'yi kısmasın diye altbilginin altına görünmez boşluk eklenir.
    await p.addStyleTag({ content: 'body{padding-bottom:600px!important}' });
    await p.evaluate(() => { window.__save = { vals: { ...vals }, round }; });
    await p.locator('.storm-choice').nth(2).click();
    await p.waitForTimeout(300);
    const S = await p.evaluate((mob) => {
      const vh = innerHeight;
      const btn = document.querySelector('#consequence .nt-btn').getBoundingClientRect();
      const bey = document.querySelectorAll('.storm-choice')[2].getBoundingClientRect();
      const btnBottom = btn.bottom + scrollY;
      if (!mob) return Math.max(0, Math.round(btnBottom + 40 - vh));
      // göstergeler telefon çerçevesindeki çentiğin altında kalsın (üstten ≥ 64 px)
      const gTop = document.querySelector('.crew-gauges').getBoundingClientRect().top + scrollY;
      let s = Math.min(bey.top + bey.height / 2 + scrollY - 0.62 * vh, gTop - 64);
      s = Math.max(s, btnBottom + 24 - vh);
      return Math.max(0, Math.round(s));
    }, pre === 'm');
    await p.evaluate(() => { vals = { ...window.__save.vals }; round = window.__save.round; showStorm(); });
    await blur(p);
    await p.evaluate((y) => scrollTo(0, y), S);
    await p.waitForTimeout(1000); // gösterge geçişleri (0.5 sn)
    console.log(pre, 'gemi kaydırma S =', S, 'gerçek', await p.evaluate(() => scrollY));
    const beyaz = '.storm-choice:nth-of-type(3)';
    await shot(p, `${pre}-gemi.jpg`);
    await mark(p, `${pre}-gemi.jpg`, { beyaz, kart: '#storm-card', gosterge: '.crew-gauges' });
    await p.locator('.storm-choice').nth(2).click(); // "Beyaz bayrak çek, diyalog kur"
    await blur(p);
    await p.evaluate((y) => scrollTo(0, y), S);
    await p.waitForTimeout(1000); // gösterge geçişleri (0.5 sn)
    console.log(pre, 'gemi sonrası scrollY', await p.evaluate(() => scrollY));
    await shot(p, `${pre}-gemi-sonuc.jpg`);
    await mark(p, `${pre}-gemi-sonuc.jpg`, { sonuc: '#consequence', gosterge: '.crew-gauges' });
    console.log(pre, 'gemi:', JSON.stringify(await p.evaluate(() => ({ vals, round, titles: shuffled.map((s) => s.title) }))));
  }
});
