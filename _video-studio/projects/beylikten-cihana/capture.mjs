// Beylikten Cihana — çekimler (masaüstü d-*, mobil m-*)
//
// Oyun gerçekten oynanır. Kurulum, kapaktaki "Hızlı başla" ile aynıdır (sen + 3 orta bot, Aile, ilk sıra sende);
// yalnız tohum sabittir ki çekim yeniden üretilebilsin. Sayfa ?test ile açılır: oyunun kendi test kancası
// (window.__bc) yeni oyunu sabit tohumla kurar ve tempoyu ayarlar. Çekilmeyen eller hız 0'da gerçek motor ve
// botlarla oynanır (insan oyuncunun kararlarını da oyunun kendi bot politikası verir); çekilen anlar normal
// tempoda gerçek tıklamalarla yapılır.
//
//   A) Kapak
//   B) Tohum 94, 1. tur: Sefer kartı çek → "Yedinci Padişah Fatih" (7) → Bursa → Bilgi ile Fethet → doğru cevap
//   C) Tohum 76, 14. tur: İmar → İzmir, Selanik, Yanya'ya Medrese → Elim bitti → "Cihan!" → zafer seremonisi
import fs from 'node:fs';
import path from 'node:path';
import { withStudio } from '../../lib/capture.mjs';

const GIRIS = '/beylikten-cihana/';

// Sayfa içinde: sabit tohumlu yeni oyun kur, koşul sağlanana dek hız 0'da oyna.
async function surusSayfada({ tohum, kosul, sinir }) {
  const B = window.CihanBotlar, M = window.CihanMotor, bc = window.__bc;
  const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
  const kos = new Function('D', 'M', 'return (' + kosul + ')(D, M);');
  bc.hiz(0);
  bc.yeniOyun({
    mod: 'aile', usta: false, zorluk: 'karisik', ilkOyuncu: 0, tohum: String(tohum),
    oyuncular: [{ ad: 'Oyuncu 1', renk: 'p1' }, { ad: 'Evrenos', bot: 'orta', renk: 'p2' }, { ad: 'Mihaloğlu', bot: 'orta', renk: 'p3' }, { ad: 'Turahan', bot: 'orta', renk: 'p4' }],
  });
  const t0 = Date.now();
  while (Date.now() - t0 < sinir) {
    await bekle(4);
    if (bc.mesgul()) continue;
    const D = bc.durum();
    if (!D) continue;
    if (D.bitti) return 'bitti';
    if (kos(D, M)) return 'tamam';
    const b = D.bekleyen;
    if (!b || b.oyuncu !== 0) continue;           // botların elini oyunun kendisi oynatır
    const e = B.botEylem(D);
    if (e.tur === 'gorev_sec') {
      // Ferman seçimi arayüzden yapılır (tahtadaki vurgu böylece temizlenir)
      const birak = e.birak || b.gorevler.find((g) => e.tut.indexOf(g) < 0);
      let kart = null;
      for (let i = 0; i < 300 && !(kart = document.querySelector('.gorev-sec__oge[data-g="' + birak + '"]')); i++) await bekle(10);
      kart.click(); await bekle(30);
      [...document.querySelectorAll('#katman-modal button.cs-dugme--buyuk')].pop().click();
      await bekle(30);
    } else {
      await bc.gonder(e);
    }
  }
  return 'zaman aşımı';
}

await withStudio(import.meta.url, async ({ context, origin, shot, mark, settle, out }) => {
  // Simge: oyunun kendi rozeti (Sefer Meydanı, favicon.svg)
  fs.copyFileSync(path.resolve(path.dirname(out('x')), '../../../../beylikten-cihana/favicon.svg'), out('logo.svg'));

  const sayfa = async (kind, q = '') => {
    const ctx = await context(kind);
    // İlk oyun rehberini kapalı say (balon ekranı örtmesin); ses tercihi varsayılan
    await ctx.addInitScript(() => { try { localStorage.setItem('bc2.rehber', JSON.stringify({ bitti: 1 })); } catch {} });
    const p = await ctx.newPage();
    p.on('pageerror', (e) => console.warn('[sayfa hatası]', e.message));
    await p.goto(origin + GIRIS + q, { waitUntil: 'domcontentloaded' });
    await settle(p);
    return p;
  };
  const durum = (p) => p.evaluate(() => ({ b: window.__bc.durum().bekleyen, m: window.__bc.mesgul() }));
  const bekleKarar = async (p, tur, ms = 20000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
      const s = await durum(p);
      if (s.b && s.b.oyuncu === 0 && s.b.tur === tur && !s.m) return s.b;
      await p.waitForTimeout(100);
    }
    throw new Error('karar gelmedi: ' + tur);
  };
  const bosta = async (p, ms = 15000) => { const t0 = Date.now(); while (Date.now() - t0 < ms && await p.evaluate(() => window.__bc.mesgul())) await p.waitForTimeout(80); };
  const sur = async (p, tohum, kosul, sinir = 240000) => {
    const r = await p.evaluate(surusSayfada, { tohum, kosul, sinir });
    if (r !== 'tamam') throw new Error(`sürüş (${tohum}): ${r}`);
    await p.evaluate(() => window.__bc.hiz(null));   // normal tempo (tercih: hızlı)
  };
  const imlecUzak = (p) => p.mouse.move(2, 2);
  // Metniyle bulunan düğmeye işaret koy (yalnız mark() için data-vs özniteliği)
  const etiketle = (p, sel, metin, ad) => p.evaluate(({ sel, metin, ad }) => {
    const e = [...document.querySelectorAll(sel)].find((x) => x.textContent.includes(metin));
    if (e) e.setAttribute('data-vs', ad);
  }, { sel, metin, ad });
  const gorunurBekle = async (p, sel, ms = 20000) => { await p.locator(sel).first().waitFor({ state: 'visible', timeout: ms }); };

  for (const [pre, kind] of [['d', 'desktop'], ['m', 'mobile']]) {
    // ── A) Kapak ──
    let p = await sayfa(kind);
    await p.waitForTimeout(1200);
    await shot(p, `${pre}-kapak.jpg`);
    await mark(p, `${pre}-kapak.jpg`, { baslik: '.kapak__baslik', hizli: '[data-e="hizli"]' });
    await p.context().close();

    // ── B) İlk tur: Sefer kartı, Bursa, Bilgi ile Fetih ──
    p = await sayfa(kind, '?test');
    await sur(p, 94, `(D) => D.bekleyen && D.bekleyen.oyuncu === 0 && D.bekleyen.tur === 'sefer'`);
    await imlecUzak(p);
    await p.waitForTimeout(1400);
    await mark(p, `${pre}-sira.jpg`, { cek: '#dock .dock__ana', dock: '#dock' });
    await shot(p, `${pre}-sira.jpg`);

    await p.locator('#dock .dock__ana').click();
    await gorunurBekle(p, '#katman-modal .modal--sefer .cs-kart');
    await imlecUzak(p);
    await p.waitForTimeout(1500);                       // kart çevrilip mühür basılsın
    await mark(p, `${pre}-sefer.jpg`, { kart: '#katman-modal .modal--sefer .cs-kart', sayi: '#katman-modal .cs-sefer__sayi', ilerle: '#katman-modal .modal__eylemler button' });
    await shot(p, `${pre}-sefer.jpg`);

    await p.locator('#katman-modal .modal__eylemler button').first().click();
    const sa = await bekleKarar(p, 'satin_alma');
    if (sa.kare !== 7) throw new Error('beklenen Bursa değil: ' + sa.kare);
    await gorunurBekle(p, '#katman-modal button.dugme--vurgu-firuze');
    await imlecUzak(p);
    await p.waitForTimeout(1100);
    await mark(p, `${pre}-satin.jpg`, { fetih: '#katman-modal button.dugme--vurgu-firuze', al: '#katman-modal button.cs-dugme--zumrut', resim: '#katman-modal .karar-resim' });
    await shot(p, `${pre}-satin.jpg`);

    await p.locator('#katman-modal button.dugme--vurgu-firuze').click();
    const so = await bekleKarar(p, 'soru');
    const dogru = await p.evaluate((id) => window.CihanVeri.desteler.bilgi.find((q) => q.id === id).dogru, so.soru);
    await gorunurBekle(p, `#katman-modal button.sik[data-sik="${dogru}"]`);
    await imlecUzak(p);
    await p.waitForTimeout(1100);
    await mark(p, `${pre}-soru.jpg`, { dogru: `#katman-modal button.sik[data-sik="${dogru}"]`, soru: '#katman-modal .bilgi-soru' });
    await shot(p, `${pre}-soru.jpg`);

    await p.locator(`#katman-modal button.sik[data-sik="${dogru}"]`).click();
    await gorunurBekle(p, '#katman-modal .modal--cevap .cevap--dogru');
    await imlecUzak(p);
    await p.waitForTimeout(1000);
    await mark(p, `${pre}-dogru.jpg`, { muhur: '#katman-modal .cevap__muhur', cevap: '#katman-modal .cevap__dogru' });
    await shot(p, `${pre}-dogru.jpg`);

    await p.context().close();

    // ── C) 14. tur: Medrese, "Cihan!", zafer ──
    p = await sayfa(kind, '?test');
    await sur(p, 76, `(D) => D.adim >= 232 && D.bekleyen && D.bekleyen.oyuncu === 0 && D.bekleyen.tur === 'serbest'`);
    await imlecUzak(p);
    await p.waitForTimeout(1500);

    await p.locator('#dock button', { hasText: 'İmar' }).click();
    await gorunurBekle(p, '#katman-modal button[aria-label="Medrese yap: İzmir"]');
    await imlecUzak(p);
    await p.waitForTimeout(1100);
    await mark(p, `${pre}-imar.jpg`, { medrese: '#katman-modal button[aria-label="Medrese yap: İzmir"]', merdiven: '#katman-modal .imar-merdiven', set: '#katman-modal .tapu-grup' });
    await shot(p, `${pre}-imar.jpg`);

    for (const sehir of ['İzmir', 'Selanik', 'Yanya']) {
      await p.locator(`#katman-modal button[aria-label="Medrese yap: ${sehir}"]`).click();
      // Mobilde panel yapı sırasında çekilir, tahtada şehir parlar (masaüstünde panel yerinde kalır)
      if (sehir === 'İzmir' && pre === 'm') { await p.waitForTimeout(650); await imlecUzak(p); await shot(p, `${pre}-imar-ani.jpg`); }
      await bosta(p);
      await p.waitForTimeout(300);
      // Panel yapıdan sonra düğmeleri kapalı çiziyor (bkz. rapor); sekmeye dokunup yeniden çizdir
      await p.locator('#katman-modal [role="tab"][data-s="imar"]').click();
      await p.waitForTimeout(350);
    }
    await imlecUzak(p);
    await p.waitForTimeout(600);
    await mark(p, `${pre}-imar2.jpg`, { set: '#katman-modal .tapu-grup', nakit: '#katman-modal .nakit-satir' });
    await shot(p, `${pre}-imar2.jpg`);

    await p.locator('#katman-modal .modal__arac button[aria-label="Kapat"]').click();
    await p.waitForTimeout(900);
    await imlecUzak(p);
    await etiketle(p, '#dock button', 'Elim bitti', 'bitti');
    await mark(p, `${pre}-tahta2.jpg`, { bitti: '[data-vs="bitti"]' });
    await shot(p, `${pre}-tahta2.jpg`);

    await p.locator('#dock button', { hasText: 'Elim bitti' }).click();
    await p.locator('.afis--cihan').waitFor({ state: 'visible', timeout: 15000 });
    await p.waitForTimeout(780);                         // madalyon mühürlensin
    await mark(p, `${pre}-cihan.jpg`, { afis: '.afis--cihan .afis__ic' });
    await shot(p, `${pre}-cihan.jpg`);

    // Tur tamamlanır (botlar oynar), seremoni: fermanlar açılır → zafer
    await p.locator('.seremoni').waitFor({ state: 'visible', timeout: 120000 });
    await p.waitForFunction(() => /^Zafer/i.test((document.querySelector('.seremoni__baslik') || {}).textContent || ''), null, { timeout: 60000 });
    await p.waitForTimeout(2200);
    await mark(p, `${pre}-zafer.jpg`, { sahne: '.seremoni__sahne', baslik: '.seremoni__baslik' });
    await shot(p, `${pre}-zafer.jpg`);
    await p.context().close();
  }
});
