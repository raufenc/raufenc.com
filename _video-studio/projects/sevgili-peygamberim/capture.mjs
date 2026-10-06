// Sevgili Peygamberim — çekimler (masaüstü d-*, mobil m-*)
//
// Tek sayfalık kitap keşif platformu; sitenin varsayılan (açık) temasıyla açılır.
//   hero          giriş: Besmele, başlık, 72 / 336 / 705 / 20 sayaçları
//   zaman-uzun    Kronolojik Zaman Çizelgesi (uzun çekim → kaydırma)
//   harita        Etkileşimli Harita → masaüstünde Medîne-i Münevvere işaretine dokun → harita-medine (mekân kartı);
//                 mobilde "Gazâlar" süzgeci → harita-gaza → Tebük Gazâsı işaretine dokun → harita-tebuk (gazâ kartı)
//   kitap         HİCRET bölümü → "Kâinatın Sultânı geliyor" alt başlığına dokun → kitap-acik (tam metin)
//   quiz          "Kendini Dene" → "Mekke-i Mükerreme" şıkkına dokun → quiz-dogru (✓ Doğru! + kaynak)
import { withStudio } from '../../lib/capture.mjs';

// Gizlenenler: site-dışı gezinme, yüzen düğmeler, kapalı içindekiler panelinin sol kenara taşan gölgesi,
// mobilde araç düğmelerinin üstüne binen bölüm adı (.nav-ch).
const CSS = `
  #rauf-nav,#toTop,#tocBtn,.scroll-h,.skip-link,.nav-ch{display:none!important}
  .toc-panel:not(.open){visibility:hidden!important}
  .rv{opacity:1!important;transform:none!important;transition:none!important}
  html,*{scroll-behavior:auto!important}
`;

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, context, out }) => {
  // Simge: sitenin "Kim Kimdir?" kartlarındaki ﷺ rozeti (.pc .pa — yeşil degrade, altın çerçeve, Amiri),
  // saydam zeminde 400×400 olarak yeniden çizilir.
  {
    const ctx = await context('desktop');
    const p = await ctx.newPage();
    await p.setViewportSize({ width: 400, height: 400 });
    await p.setContent(`<!doctype html><html><head>
      <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=block" rel="stylesheet">
      <style>html,body{margin:0;background:transparent}
      .pa{width:376px;height:376px;margin:12px;box-sizing:border-box;border-radius:50%;
        background:linear-gradient(135deg,#0A2E22,#1A5C48);border:14px solid #C9A84C;color:#C9A84C;
        display:flex;align-items:center;justify-content:center;font:700 200px/1 'Amiri',serif}
      </style></head><body><div class="pa"><span style="margin-top:22px">&#xFDFA;</span></div></body></html>`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: out('logo.png'), omitBackground: true });
    await p.close();
  }

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await open('/sevgili-peygamberim/');
    await p.addStyleTag({ content: CSS });
    await p.waitForTimeout(1200);
    const vh = await p.evaluate(() => innerHeight);
    const navH = await p.evaluate(() => document.getElementById('mainNav').getBoundingClientRect().height);

    // Öğeyi görünümün üstüne (nav altına) getir
    const to = async (sel, off = navH + 10) => {
      await p.evaluate(({ sel, off }) => {
        const e = document.querySelector(sel);
        window.scrollTo(0, e.getBoundingClientRect().top + scrollY - off);
        window.dispatchEvent(new Event('scroll'));
      }, { sel, off });
      await p.waitForTimeout(500);
    };

    // 1) Giriş
    await shot(p, `${pre}-hero.jpg`);

    // 2) Zaman çizelgesi — 3 ekranlık uzun çekim (kaydırma sahnesi)
    await to('#zaman-cizelgesi');
    const top = await p.evaluate(() => document.getElementById('zaman-cizelgesi').getBoundingClientRect().top + scrollY);
    const w = await p.evaluate(() => innerWidth);
    // Tam sayfa çekimde sabit gezinme çubuğu ortaya düşer → yalnız bu çekimde gizle
    const navOff = await p.addStyleTag({ content: '#mainNav,#prog{display:none!important}' });
    // Mobilde başlık telefonun kamera adasının altına girmesin: yalnız bu çekimde bölümün üst boşluğunu artır
    const padOld = await p.evaluate((add) => {
      const e = document.getElementById('zaman-cizelgesi'), old = e.style.paddingTop;
      if (add) e.style.paddingTop = (parseFloat(getComputedStyle(e).paddingTop) + add) + 'px';
      return old;
    }, pre === 'm' ? 56 : 0);
    // Kırpma bölümün tam üstünden başlar (üstteki koyu bölümün şeridi girmesin)
    await shot(p, `${pre}-zaman-uzun.jpg`, { fullPage: true, clip: { x: 0, y: top, width: w, height: vh * 3 }, quality: 88 });
    await p.evaluate((old) => { document.getElementById('zaman-cizelgesi').style.paddingTop = old; }, padOld);
    await navOff.evaluate((e) => e.remove());

    // 3) Harita
    //   masaüstü: genel görünüm → Medîne-i Münevvere yıldızına dokun → mekân kartı (4 bölüm düğmesi; adların
    //             hepsi 30 karakterin altında — site adları substring(0,30) ile kestiği için Mekke kartı
    //             "…PEYGAMBER EFE" diye yarım kalıyordu, o kart kullanılmaz)
    //   mobil:    "Gazâlar" süzgeci (yalnız gazâ işaretleri; dar ekranda sağdan kesilen mekân etiketleri yok) →
    //             Tebük Gazâsı işaretine dokun → "📖 Bölüme Git" düğmeli gazâ kartı
    await to('#map-c', pre === 'd' ? navH + 40 : navH + 70);
    await p.waitForTimeout(2500);
    await p.evaluate(() => {
      mapMarkers['medine'].getElement().id = 'sv-medine';
      mapMarkers['tebuk-g'].getElement().id = 'sv-tebuk';
    });
    if (pre === 'd') {
      await shot(p, 'd-harita.jpg');
      await mark(p, 'd-harita.jpg', { medine: '#sv-medine', kume: '.battle-cluster', map: '#map-c' });
      await p.evaluate(() => mapMarkers['medine'].openPopup());
      await p.waitForTimeout(1500);
      await shot(p, 'd-harita-medine.jpg');
      await mark(p, 'd-harita-medine.jpg', { popup: '.leaflet-popup-content-wrapper', map: '#map-c' });
    } else {
      await p.evaluate(() => mapObj.setView([23.6, 41.2], 5, { animate: false }));
      await p.waitForTimeout(1200);
      await p.tap('#harita .map-ctrl-btn:has-text("Gazâlar"), .map-ctrl-btn:has-text("Gazâlar")');
      await p.waitForTimeout(800);
      // Tebük işaretini kartı kontrol düğmelerinin altına sığacak yere getir (kullanıcının sürüklemesine denk)
      await p.evaluate(() => {
        const sz = mapObj.getSize(), cp = mapObj.latLngToContainerPoint(mapMarkers['tebuk-g'].getLatLng());
        mapObj.panBy([cp.x - sz.x * 0.47, cp.y - sz.y * 0.67], { animate: false });
      });
      await p.waitForTimeout(600);
      // Kartın kendi autoPan kaydırmasını önceden uygula → iki çekimde harita aynı yerde kalsın
      await p.evaluate(() => mapMarkers['tebuk-g'].openPopup());
      await p.waitForTimeout(900);
      await p.evaluate(() => mapObj.closePopup());
      await p.waitForTimeout(1500);
      await shot(p, 'm-harita-gaza.jpg');
      await mark(p, 'm-harita-gaza.jpg', { tebuk: '#sv-tebuk', kume: '.battle-cluster', map: '#map-c' });
      await p.evaluate(() => mapMarkers['tebuk-g'].openPopup());
      await p.waitForTimeout(1500);
      await shot(p, 'm-harita-tebuk.jpg');
      await mark(p, 'm-harita-tebuk.jpg', { popup: '.leaflet-popup-content-wrapper', tebuk: '#sv-tebuk', map: '#map-c' });
    }
    // Kartın düğmeleri tam görünmeli (site kesmesin): metinleri denetim için yaz
    console.log(pre, await p.evaluate(() => [...document.querySelectorAll('.leaflet-popup .map-popup-btn')].map((b) => b.textContent)));
    await p.evaluate(() => mapObj.closePopup());
    await p.waitForTimeout(400);

    // 4) Kitap — HİCRET bölümü, alt başlık açılır
    await to('#ch-13', pre === 'd' ? navH + 10 : navH - 40);
    await shot(p, `${pre}-kitap.jpg`);
    const SUB = '.sub-entry[data-idx="13-2"]';
    await mark(p, `${pre}-kitap.jpg`, { alt: `${SUB} .se-title` });
    await p.click(`${SUB} .se-header`);
    await p.waitForTimeout(700);
    await shot(p, `${pre}-kitap-acik.jpg`);

    // 5) Quiz — doğru cevap
    await to('#quiz-s', pre === 'd' ? navH - 40 : navH);
    await p.mouse.move(2, vh - 2);   // önceki dokunuşun kalıcı :hover izini şıkların üstünden çek
    await p.waitForTimeout(300);
    await shot(p, `${pre}-quiz.jpg`);
    await mark(p, `${pre}-quiz.jpg`, { dogru: '#qO .qo:nth-child(2)' });
    await p.click('#qO .qo:nth-child(2)');
    await p.waitForTimeout(700);
    await shot(p, `${pre}-quiz-dogru.jpg`);
  }
});
