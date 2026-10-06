// İyilik Akademi — çekimler (masaüstü d-*, mobil m-*)
// Açık tema kullanılır: koyu temada ana sayfa sayaçları okunmuyor (bkz. siteIssues).
// Ders akışı (ön quiz → video → son quiz) giriş ister ve Firebase çevrimdışı → yalnız
// herkese açık ekranlar: ana sayfa, ders listesi, Meydan Okuma.
// Mobilde üst çubuğa güvenli alan boşluğu verilir (telefon çerçevesinin dinamik adası
// ay simgesini / "Giriş"i örtmesin, "Kayıt Ol" köşe yuvarlağında kırpılmasın).
// Ana sayfadaki "Hemen Başla" düğmesinde sitenin !bg-white sınıfı bg-gradient'i ezmiyor
// (kırmızı zeminde koyu kırmızı yazı → okunmuyor; bkz. siteIssues). Çekimde yalnız
// sınıfın amaçladığı beyaz zemin geri getirilir. Üst çubuğun .glass sınıfında yalnız
// -webkit-backdrop-filter var: Safari'de (iPhone) bulanıklaşır, Chromium'da arkadaki yazı
// çubuğun içinden okunur. Çekimde iPhone'daki görünüm için ön eksiz backdrop-filter eklenir.
const SAFE_TOP = 47;
const HERO_FIX = '.\\!bg-white{background-image:none!important}.glass{backdrop-filter:blur(20px)}';
import { withStudio } from '../../lib/capture.mjs';

await withStudio(import.meta.url, async ({ desktop, mobile, shot, tallShot, mark }) => {
  const css = (p, isM) => p.addStyleTag({ content: '#rauf-nav{display:none!important}' + HERO_FIX +
    (isM ? `nav.sticky{padding-top:${SAFE_TOP}px!important}` : '') });
  const prep = async (p, wait = 1800, isM = false) => {
    await p.evaluate(() => {
      localStorage.setItem('iyilik-theme', 'light');
      localStorage.setItem('iyilik-sound-enabled', 'false');
      sessionStorage.setItem('pwa-dismissed', '1');
    });
    await p.reload({ waitUntil: 'domcontentloaded' });
    await p.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await css(p, isM);
    await p.waitForTimeout(wait);
    await p.evaluate(() => scrollTo(0, 0)); // geri yüklenen kaydırma konumunu sıfırla
    await p.waitForTimeout(300);
  };

  // Metniyle bulunan n'inci öğeye işaret niteliği koy (mark() için)
  const tag = (p, sel, text, n, name) => p.evaluate(({ sel, text, n, name }) => {
    const el = [...document.querySelectorAll(sel)].filter((e) => e.textContent.trim() === text)[n];
    if (el) el.setAttribute('data-mk', name);
  }, { sel, text, n, name });

  // Meydan Okuma modunu başlat; ilk soru tercih edilen derslerden ve kısa değilse yeniden dene
  const startMode = async (p, n, lessons, isM) => {
    for (let i = 0; i < 60; i++) {
      if (i > 0 || n !== 0) {
        await p.goto(p.url().replace(/\/iyilikakademi\/.*/, '/iyilikakademi/meydan-okuma'));
        await css(p, isM); // goto enjekte edilen stili siler
        await p.waitForTimeout(700);
      }
      await p.getByRole('button', { name: 'Başla' }).nth(n).click();
      if (!isM) await p.mouse.move(1430, 890); // fare şıkların üstünde kalmasın (hover vurgusu)
      await p.waitForTimeout(900);
      const q = await p.evaluate(() => {
        const card = document.querySelector('main h2');
        const ders = card?.previousElementSibling?.textContent.trim();
        const opts = [...document.querySelectorAll('main .space-y-3 button span:last-child')].map((e) => e.textContent.trim());
        return { ders, soru: card?.textContent.trim(), opts };
      });
      const ok = lessons.includes(q.ders) && q.soru.length <= (isM ? 48 : 60) && Math.max(...q.opts.map((o) => o.length)) <= (isM ? 40 : 48);
      if (ok) { console.log(n, i, q.ders, '|', q.soru); return q; }
    }
    console.warn('uygun soru bulunamadı; son soru kullanılıyor');
  };

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const isM = pre === 'm';

    // 1) Ana sayfa: en üstte hero ("İyilik ile Dolu Bir Yolculuğa Hazır mısın?"); masaüstünde
    //    yan menü de görünür (kaydırınca yan menü statik olduğundan sol sütun boş kalıyor).
    //    Mobilde ayrıca yataydaki ikinci telefon için sayaç kartı (m-sayac: 40+ · 240+ · 8 · Ücretsiz);
    //    altındaki "Özellikler" bölümü (imla hatalı başlık) kadraja girmez.
    let p = await open('/iyilikakademi/');
    await prep(p, 1500, isM);
    const geo = await p.evaluate(() => {
      const el = [...document.querySelectorAll('p,span,div')].find((e) => e.textContent.trim() === 'Quiz Sorusu');
      const card = el && el.closest('.rounded-2xl, .rounded-3xl');
      const r = (card || el).getBoundingClientRect();
      const oz = [...document.querySelectorAll('span,p,div')].find((e) => /^özellikler$/i.test(e.textContent.trim()));
      return { bottom: r.bottom + scrollY, oz: oz ? oz.getBoundingClientRect().top + scrollY : null, vh: innerHeight };
    });
    const statsScroll = Math.max(0, Math.round(geo.bottom - geo.vh + 36));
    console.log(pre, 'ana', geo, 'kaydırma', statsScroll, 'özellikler görünür mü:', geo.oz != null && geo.oz < statsScroll + geo.vh);
    if (isM) {
      await p.waitForTimeout(2500);
      await shot(p, 'm-ana.jpg');
      await p.evaluate((y) => scrollTo(0, y), statsScroll);
      await p.waitForTimeout(3500); // sayaç animasyonu bitsin
      await shot(p, 'm-sayac.jpg');
    } else {
      await p.waitForTimeout(2500);
      await shot(p, 'd-ana.jpg');
    }

    // 2) Ders listesi (uzun çekim, kaydırma için)
    p = await open('/iyilikakademi/dersler');
    await prep(p, 1800, isM);
    await shot(p, `${pre}-dersler.jpg`);
    await tallShot(p, `${pre}-dersler-uzun.jpg`, { maxScreens: isM ? 4 : 3 });

    // 3) Meydan Okuma: 3 mod → Hız Yarışı (soru rastgele: okunaklı ve çocuk dostu bir soru gelene kadar yeniden başlat)
    p = await open('/iyilikakademi/meydan-okuma');
    await prep(p, 1800, isM);
    await shot(p, `${pre}-meydan.jpg`);
    await tag(p, 'button', 'Başla', 0, 'hiz');
    await mark(p, `${pre}-meydan.jpg`, { hiz: '[data-mk=hiz]' });
    await startMode(p, 0, ['Empati', 'Sabır', 'İşbirliği', 'Kardeşlik', 'Sevgi', 'İnsana Teşekkür', 'Arkadaşlık ve Dostluk'], isM);
    await p.waitForTimeout(1200); // sayaç birkaç saniye ilerlesin
    await shot(p, `${pre}-hiz.jpg`);

    // 4) Bilgi Maratonu: soru → doğru cevap (anında geri bildirim)
    await startMode(p, 1, ['Doğruluk ve Dürüstlük', 'Çevre Temizliği', 'Hediyeleşmek', 'Yumuşak Huyluluk ve Nezaket', 'Bağışlamak', 'Saygı', 'Adalet', 'Sevgi', 'Empati'], isM);
    await shot(p, `${pre}-soru.jpg`);
    await p.evaluate(() => document.querySelector('main .space-y-3 button span:last-child')?.setAttribute('data-mk', 'cevap'));
    await mark(p, `${pre}-soru.jpg`, { cevap: '[data-mk=cevap]' });
    await p.locator('main .space-y-3 button').first().click();
    if (!isM) await p.mouse.move(1430, 890);
    await p.waitForTimeout(650);
    await shot(p, `${pre}-cevap.jpg`);
    console.log(pre, (await p.evaluate(() => document.querySelector('main').innerText)).replace(/\n+/g, ' | ').slice(0, 300));
  }
});
