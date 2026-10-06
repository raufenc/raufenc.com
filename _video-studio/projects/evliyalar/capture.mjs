// Özbekistan Evliyaları ve Âlimleri — çekimler (masaüstü d-*, mobil m-*)
//
// Sitenin kendi açık teması kullanılır (koyu temada isimler koyu zemin üstünde okunmuyor).
// 1) Açılış (hero).
// 2) Harita: Buhara işaretine dokunma → şehir paneli (25 âlim ve evliya).
// 3) Arama: "Buhâr" yazılır → sonuçlar → Behâeddîn Buhârî penceresi (Hayatı) → Kerâmetleri sekmesi.
// 4) Nakşibendî silsilesi: sitenin çizdiği zincirin uzun çekimi (kaydırma, son halkaya kadar).
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark, settle }) => {
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const isM = pre === 'm';
    const dokun = (p, sel) => (isM ? p.tap(sel) : p.click(sel));
    const ac = async () => {
      const p = await open('/evliyalar/');
      await p.evaluate(() => localStorage.setItem('rauf-theme', 'light'));
      await p.reload({ waitUntil: 'domcontentloaded' });
      await settle(p);
      await p.addStyleTag({ content: 'html{scroll-behavior:auto!important} #rauf-nav{display:none!important} .fade-in{opacity:1!important;transform:none!important}' });
      await p.waitForTimeout(1200);
      return p;
    };
    const kaydir = (p, sel, off = 0) => p.evaluate(({ sel, off }) => {
      const e = document.querySelector(sel);
      window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 64 + off);
    }, { sel, off });

    // ── 1. Açılış ──
    let p = await ac();
    await p.waitForTimeout(800);
    await shot(p, `${pre}-hero.jpg`);

    // ── 2. Harita → Buhara paneli ──
    if (isM) await kaydir(p, '#map', -16); else await kaydir(p, '#map-section', 20);
    await p.waitForTimeout(1500);
    await p.evaluate(() => { cityMarkers.bukhara.getElement().id = 'mk-buhara'; });
    await shot(p, `${pre}-harita.jpg`);
    await mark(p, `${pre}-harita.jpg`, { buhara: '#mk-buhara .marker-inner', map: '#map' });
    await dokun(p, '#mk-buhara .marker-inner');
    await p.waitForTimeout(2200);
    if (isM) {
      // panelin altı ekranın altına otursun; üstte Buhara'ya uçmuş harita görünsün
      await p.evaluate(() => {
        const r = document.querySelector('#city-panel').getBoundingClientRect();
        window.scrollTo(0, r.bottom + scrollY - innerHeight + 12);
      });
      await p.waitForTimeout(600);
      // Buhara işaretçisi görünen harita şeridinin ortasına insin (parmakla haritayı aşağı sürüklemenin eşdeğeri);
      // böylece dikey videoda işaretçi telefonun üst kenarına / Dynamic Island'ın altına sıkışmaz.
      await p.evaluate(() => {
        const mr = document.querySelector('#map').getBoundingClientRect();
        const pr = document.querySelector('#city-panel').getBoundingClientRect();
        const top = Math.max(mr.top, 64), bot = Math.min(mr.bottom, pr.top);
        const k = cityMarkers.bukhara.getElement().getBoundingClientRect();
        const dy = (top + bot) / 2 - (k.top + k.height / 2);
        map.panBy([0, -dy], { animate: false });
      });
      await p.waitForTimeout(1200);
    }
    await shot(p, `${pre}-panel.jpg`);
    await mark(p, `${pre}-panel.jpg`, { panel: '#city-panel', liste: '#panel-scholars' });

    // ── 3. Arama → pencere → kerâmetler ──
    p = await ac();
    await kaydir(p, '#map-section', isM ? 10 : 20);
    await p.waitForTimeout(1200);
    await dokun(p, '#search-input');
    await p.type('#search-input', 'Buhâr', { delay: 60 });
    await p.waitForTimeout(600);
    if (isM) {
      // 390 genişlikte odaktaki kutu 180px'e büyüyüp ☰ düğmesini ekran dışına itiyor (site taşması).
      // Sorgu yazıldıktan sonra odak bırakılır: kutu 140px'e döner, sonuç listesi açık kalır, taşma olmaz.
      await p.evaluate(() => document.getElementById('search-input').blur());
      await p.waitForTimeout(500);
    }
    await p.evaluate(() => {
      const it = [...document.querySelectorAll('.search-result-item')].find((e) => e.dataset.id === 'behaeddin-buhari-sah-i-naksibend');
      if (it) it.id = 'sr-behaeddin';
    });
    await shot(p, `${pre}-arama.jpg`);
    await mark(p, `${pre}-arama.jpg`, { sonuc: '#sr-behaeddin', kutu: '#search-input', liste: '#search-results' });
    await dokun(p, '#sr-behaeddin');
    await p.waitForTimeout(900);
    await shot(p, `${pre}-hayati.jpg`);
    await mark(p, `${pre}-hayati.jpg`, { keramet: '.tab[data-tab="miracles"]', baslik: '.modal-header', pencere: '.modal-content' });
    await dokun(p, '.tab[data-tab="miracles"]');
    await p.waitForTimeout(600);
    await shot(p, `${pre}-keramet.jpg`);
    await mark(p, `${pre}-keramet.jpg`, { baslik: '.modal-header', pencere: '.modal-content', metin: '#modal-miracles' });

    // ── 4. Silsile (uzun çekim: yalnız silsile bölümü) ──
    p = await ac();
    await p.addStyleTag({ content: '#hero,#map-section,#timeline-section,#about-section{display:none!important} #silsile-section{padding-top:110px!important}' });
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(800);
    await tallShot(p, `${pre}-silsile.jpg`, { maxScreens: isM ? 3 : 2 });
  }
});
