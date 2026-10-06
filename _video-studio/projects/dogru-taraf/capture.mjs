// Doğru Taraf — çekimler (masaüstü d-*, mobil m-*)
//
// Hepsi tek sayfalık oyunun gerçek ekranları; geçişler gerçek tıklama ve sürüklemeyle yapılır.
//   A) Açılış (4 mod)
//   B) Serbest → Kategori ızgarası → Hac ve Kurban → Kolay seviye: 10 kart gerçekten oynanır
//      → sonuç "10/10 · Sonraki seviye açıldı" → seviye listesi (Orta açık, Zor kilitli)
//   C) Orta seviye: "Kurban kesmek … ______" kartı gelene kadar oynanır; kart sürüklenir
//      (yön etiketi + boşluğa hayalet dolum), bırakılınca doğru → sıradaki kartta yanlış şık
//      → açıklama katmanı
//   D) Seri / Rekor: iki yanlış (tek can kalır), sonra 14 doğru (×3 çarpan) → son canda yanlış → rekor
//   E) Sınıf modu (?sinif=1): projeksiyon düzeni
import fs from 'node:fs';
import { withStudio } from '../../lib/capture.mjs';

const G = '/dogru-taraf/';
const KURBAN = 'HAC-2-018';   // "Hanefi mezhebine göre kurban kesmek … ______." → vaciptir / farzdır

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, hide, out }) => {
  fs.rmSync(out('marks.json'), { force: true });

  const sayfa = async (pre, url = G, tohum = 0) => {
    const p = pre === 'd' ? await desktop(url, { viewport: { width: 1280, height: 800 } }) : await mobile(url);
    // isteğe bağlı sabit tohum: masaüstü ve mobil aynı desteyi görsün (yalnız çekim için, site kodu değişmez)
    if (tohum) await p.addInitScript((t) => { let s = t >>> 0; Math.random = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }, tohum);
    await p.evaluate(() => { Object.keys(localStorage).filter((k) => k.startsWith('dogrutaraf_')).forEach((k) => localStorage.removeItem(k)); });
    await p.reload({ waitUntil: 'load' });
    await hide(p);
    await p.waitForTimeout(900);
    return p;
  };
  // Ekrandaki kartın sorusu ve doğru tarafı (DOM + ICERIK'ten okunur)
  const kart = (p) => p.evaluate(() => {
    const cumle = document.querySelector('.kart-cumle').textContent;
    const sol = document.getElementById('btn-sol').textContent, sag = document.getElementById('btn-sag').textContent;
    const s = ICERIK.sorular.find((q) => { const [a] = q.govde.split('______'); return cumle.startsWith(a) && [sol, sag].includes(q.dogru) && [sol, sag].includes(q.yanlis); });
    return { id: s.id, dogru: s.dogru === sol ? 'sol' : 'sag', yanlis: s.dogru === sol ? 'sag' : 'sol' };
  });
  const resimler = (p) => p.evaluate(async () => {
    await Promise.all([...document.images].map((i) => (i.loading = 'eager', i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
  const oyunda = (p) => p.evaluate(() => document.getElementById('ekran-oyun').classList.contains('aktif'));
  const cevapla = async (p, yon) => { await p.click('#btn-' + yon); await p.waitForTimeout(700); };
  const aciklamaKapat = async (p) => { await p.click('#btn-aciklama-devam'); await p.waitForTimeout(600); };
  const hazir = async (p, ms = 700) => { await p.mouse.move(4, 4); await resimler(p); await p.waitForTimeout(ms); };   // imleç köşeye: hover vurgusu kalmasın

  for (const pre of ['d', 'm']) {
    // A) açılış
    let p = await sayfa(pre, G, 7);   // sabit tohum: iki biçimde aynı kart sırası
    await hazir(p, 600);
    await shot(p, `${pre}-acilis.jpg`);
    await mark(p, `${pre}-acilis.jpg`, { serbest: '#btn-mod-serbest', seri: '#btn-mod-seri' });

    // B) kategori → Hac → Kolay
    await p.click('#btn-mod-serbest');
    await hazir(p, 900);
    await shot(p, `${pre}-kategori.jpg`);
    const hacSel = '#kategori-izgara .kategori-kart:nth-child(7)';
    await mark(p, `${pre}-kategori.jpg`, { hac: hacSel });
    await p.click(hacSel);
    await p.waitForTimeout(700);
    await p.locator('.seviye-kart').first().click();
    await hazir(p);
    for (let i = 0; i < 20 && (await oyunda(p)); i++) await cevapla(p, (await kart(p)).dogru);
    await p.waitForTimeout(1300);          // sayaç (0.7 sn) bitsin
    await hazir(p, 300);
    await shot(p, `${pre}-sonuc.jpg`);
    await mark(p, `${pre}-sonuc.jpg`, { blok: '#sonuc-blok', rozet: '.sonuc-rozet' });

    // seviye listesi: Kolay ★★★, Orta açık, Zor kilitli
    await p.click('#btn-sonuc-anamenu'); await p.waitForTimeout(600);
    await p.click('#btn-mod-serbest'); await p.waitForTimeout(700);
    await p.click(hacSel); await hazir(p, 800);
    await shot(p, `${pre}-seviye.jpg`);
    await mark(p, `${pre}-seviye.jpg`, { orta: '.seviye-kart:nth-child(2)', liste: '#seviye-liste' });

    // C) Orta: kurban kartı gelene kadar oyna
    // Doğru şık (vaciptir) SAĞDA çıkana kadar: sağa sürüklemede "vaciptir" damgası kartın sağ üstüne düşer,
    // soldaki "HAC VE KURBAN" etiketinin üstüne binmez. Solda gelirse doğru cevaplanır, tur yeniden oynanır.
    let bulundu = false;
    for (let tur = 0; tur < 40 && !bulundu; tur++) {
      if (!(await oyunda(p))) {
        if (await p.evaluate(() => document.getElementById('ekran-sonuc').classList.contains('aktif'))) {
          await p.click('#btn-sonuc-tekrar').catch(() => {});
          await p.waitForTimeout(500);
          if (!(await oyunda(p))) { await p.click('#btn-sonuc-anamenu'); await p.waitForTimeout(400); await p.click('#btn-mod-serbest'); await p.waitForTimeout(500); await p.click(hacSel); await p.waitForTimeout(500); }
        }
        if (!(await oyunda(p))) { await p.locator('.seviye-kart').nth(1).click(); await p.waitForTimeout(600); }
      }
      for (let i = 0; i < 12 && (await oyunda(p)); i++) {
        const k = await kart(p);
        const sonKart = await p.evaluate(() => { const m = (document.getElementById('hud-ilerleme') || {}).textContent?.match(/(\d+) \/ (\d+)/); return m ? +m[1] >= +m[2] : false; });
        if (k.id === KURBAN && k.dogru === 'sag' && !sonKart) { bulundu = true; break; }
        await cevapla(p, k.dogru);
      }
    }
    if (!bulundu) throw new Error('kurban kartı gelmedi');
    await hazir(p, 700);
    await shot(p, `${pre}-kart.jpg`);
    const kk = await kart(p);
    await mark(p, `${pre}-kart.jpg`, { kart: '.kart', dogruBtn: '#btn-' + kk.dogru, yanlisBtn: '#btn-' + kk.yanlis, slot: '.slot' });

    // sürükle: doğru tarafa, eşiğe yakın, basılı tutarak
    const box = await p.locator('.kart').boundingBox();
    const cx = box.x + box.width / 2, cy = box.y + box.height * 0.45;
    const isaret = kk.dogru === 'sag' ? 1 : -1;
    // mobilde kart ekranı neredeyse dolduruyor: daha kısa sürükleme → damga ekran kenarında kesilmez
    const oran = pre === 'd' ? 0.2 : 0.11;
    await p.mouse.move(cx, cy); await p.mouse.down();
    for (let i = 1; i <= 12; i++) { await p.mouse.move(cx + isaret * box.width * oran * (i / 12), cy + 10 * (i / 12)); await p.waitForTimeout(16); }
    await p.waitForTimeout(250);
    await shot(p, `${pre}-surukle.jpg`);
    await mark(p, `${pre}-surukle.jpg`, { kart: '.kart', etiket: kk.dogru === 'sag' ? '.etiket-sag' : '.etiket-sol', slot: '.slot' });
    // eşiği geçip bırak → doğru: kart yeşil parlayıp uçar, sıradaki kart gelir
    for (let i = 1; i <= 6; i++) { await p.mouse.move(cx + isaret * box.width * (oran + (0.42 - oran) * i / 6), cy + 14); await p.waitForTimeout(16); }
    await p.mouse.up();
    await p.waitForTimeout(1000);

    // sıradaki kartta yanlış şık → açıklama katmanı
    if (!(await oyunda(p))) throw new Error('kurban kartından sonra kart kalmadı');
    await hazir(p, 500);
    const k2 = await kart(p);
    await shot(p, `${pre}-kart2.jpg`);
    await mark(p, `${pre}-kart2.jpg`, { yanlisBtn: '#btn-' + k2.yanlis, dogruBtn: '#btn-' + k2.dogru, kart: '.kart' });
    await p.click('#btn-' + k2.yanlis);
    await p.waitForTimeout(1100);
    await hazir(p, 300);
    await shot(p, `${pre}-aciklama.jpg`);
    await mark(p, `${pre}-aciklama.jpg`, { kutu: '.aciklama-kutu', devam: '#btn-aciklama-devam' });
    console.log(pre, 'yanlış kartı:', k2.id);

    // D) Seri / Rekor (sabit tohum → iki biçimde aynı kart)
    p = await sayfa(pre, G, 20261006);
    await p.click('#btn-mod-seri');
    await hazir(p, 600);
    // iki yanlış → tek can kalır (❤️💔💔); sonra 14 doğru → seri 14, çarpan ×3
    for (let i = 0; i < 2; i++) { await cevapla(p, (await kart(p)).yanlis); await aciklamaKapat(p); }
    for (let i = 0; i < 14; i++) await cevapla(p, (await kart(p)).dogru);
    // son tıklanan düğmenin hover/odak vurgusu kalmasın (doğru şıkkı ele vermesin)
    await p.mouse.move(4, 4); await p.evaluate(() => document.activeElement && document.activeElement.blur());
    await hazir(p, 700);
    const ks = await kart(p);
    console.log(pre, 'seri kartı:', ks.id, 'can:', await p.evaluate(() => document.getElementById('hud-can').textContent));
    await shot(p, `${pre}-seri.jpg`);
    await mark(p, `${pre}-seri.jpg`, { hud: '#hud', can: '#hud-can', combo: '#hud-combo', kart: '.kart', dogruBtn: '#btn-' + ks.dogru, yanlisBtn: '#btn-' + ks.yanlis });
    // son can: yanlış şık → açıklama → Can Bitti
    await cevapla(p, ks.yanlis); await aciklamaKapat(p);
    await p.waitForTimeout(1300);
    await hazir(p, 300);
    await shot(p, `${pre}-rekor.jpg`);
    await mark(p, `${pre}-rekor.jpg`, { blok: '#sonuc-blok' });

    // E) Sınıf modu
    p = await sayfa(pre, G + '?sinif=1');
    await p.click('#btn-mod-serbest'); await p.waitForTimeout(700);
    await p.click('#kategori-izgara .kategori-kart:nth-child(4)');   // Namaz
    await p.waitForTimeout(600);
    await p.locator('.seviye-kart').first().click();
    await hazir(p, 900);
    await shot(p, `${pre}-sinif.jpg`);
    await mark(p, `${pre}-sinif.jpg`, { kart: '.kart', ipucu: '.sinif-ipucu', secim: '#secimler-kutu' });
  }
});
