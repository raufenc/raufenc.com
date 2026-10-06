// Hızlı Hafız — çekimler (masaüstü d-*, mobil m-*, tablet t-*)
// Gerçek oyun: tek kişi turları oynanır (doğru kart → yakınlaştırma → sembol), sonra
// çok-oyunculu "Etrafında" (tablet, 4 kişi) ve "Karşıdan" (akıllı tahta, 4 kişi) kipleri.
import { withStudio } from '../../lib/capture.mjs';

const HEDEF = 'hudhud'; // kanca ile aynı soru: Hüdhüd hangi kartta?

// Sitedeki .ipucu paneli overflow:auto olduğu için "BİLGİ KARTI" etiketi yarıdan kesiliyor
// (siteIssues'a yazıldı). Çekimde yalnız etiket görünür olsun diye panel taşmasına izin ver.
// Aynı şekilde modal içindeki "Devam" düğmesi sola yaslı kalıyor (button display:flex genişlemez);
// çekimde ortalanır (siteIssues).
const CSS = '.ipucu{overflow:visible!important;max-height:none!important}.modal .btn{margin-left:auto;margin-right:auto}';

// Tek kişi turu: doğru kartı aç, doğru sembole dokun, Aferin'i geç
async function turOyna(p) {
  await p.evaluate(() => {
    const ki = Oyun.sidHaritasi[Oyun.hedef][0].ki;
    document.querySelector(`.kart[data-ki="${ki}"]`).click();
  });
  await p.waitForTimeout(250);
  await p.evaluate(() => document.querySelector(`#yakin .yk-h[data-sid="${Oyun.hedef}"]`).click());
  await p.waitForTimeout(800);
  await p.evaluate(() => { Ekran.kapat(); Oyun.yeniTur(); });
  await p.waitForTimeout(150);
}
// Hedefi sabitle (oyunun rastgele seçtiği turun yerine aynı mantıkla belirli sembol)
const hedefKoy = (p, sid) => p.evaluate((sid) => {
  Oyun.hedef = sid; Oyun.sonSid = sid;
  const m = Oyun.veri.semboller[sid].ben;
  document.querySelector('#ipucu-metin').textContent = m;
  document.querySelector('#ip-pop-metin').textContent = m;
  document.querySelector('#ip-ters-metin').textContent = m;
}, sid);

await withStudio(import.meta.url, async ({ desktop, mobile, tablet, shot, mark }) => {
  // ── TEK KİŞİ (masaüstü + mobil) ──
  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const p = await open('/hizli-hafiz/');
    await p.addStyleTag({ content: CSS });
    await p.waitForTimeout(1200);
    await shot(p, `${pre}-giris.jpg`);
    await mark(p, `${pre}-giris.jpg`, { tek: '.menu .btn:nth-child(1)', arkadas: '.menu .btn:nth-child(2)' });

    await p.click('.menu .btn:nth-child(1)');
    await p.waitForTimeout(400);
    for (let i = 0; i < 6; i++) await turOyna(p);   // HIZLI H — 6 harf kazanıldı
    await hedefKoy(p, HEDEF);
    await p.waitForTimeout(5200);                    // sayaç makul bir değere
    await p.evaluate(() => document.querySelectorAll('.kart').forEach((k) => k.blur()));
    await shot(p, `${pre}-tahta.jpg`);
    await mark(p, `${pre}-tahta.jpg`, { kart2: '.kart[data-ki="1"]', ipucu: '#ipucu-panel', harfler: '#ilerleme' });

    await p.click('.kart[data-ki="1"]');
    await p.waitForTimeout(700);
    await shot(p, `${pre}-yakin.jpg`);
    await mark(p, `${pre}-yakin.jpg`, { hudhud: `#yakin .yk-h[data-sid="${HEDEF}"]`, kart: '#yakin .yk-kart' });

    await p.evaluate((sid) => document.querySelector(`#yakin .yk-h[data-sid="${sid}"]`).click(), HEDEF);
    await p.waitForTimeout(200);
    await mark(p, `${pre}-yakin-dogru.jpg`, { hudhud: `#yakin .yk-h[data-sid="${HEDEF}"]` });
    await shot(p, `${pre}-yakin-dogru.jpg`);
    await p.waitForTimeout(700);
    await shot(p, `${pre}-aferin.jpg`);
    await mark(p, `${pre}-aferin.jpg`, { modal: '#perde .modal', ayet: '#perde .ayet', harfler: '#ilerleme' });
  }

  // ── ARKADAŞLARLA: Etrafında (tablet, 4 kişi) ──
  {
    const p = await tablet('/hizli-hafiz/');
    await p.addStyleTag({ content: CSS });
    await p.waitForTimeout(800);
    await p.evaluate(() => { localStorage.setItem('hh_oturma', 'etraf'); });
    await p.evaluate(() => Oyun.basla('cok', 4));
    await hedefKoy(p, 'karinca');
    await p.evaluate(() => Oyun.ipucuPopGoster(Oyun.veri.semboller[Oyun.hedef].ben));
    await p.waitForTimeout(900);
    await shot(p, 't-cok.jpg');
    await mark(p, 't-cok.jpg', { alt: '.kenar.alt', ipucu: '#ipucu-pop .ip-kutu' });
    await p.dispatchEvent('.kenar.alt', 'pointerdown');   // 1. oyuncu (alt kenar) söz hakkı
    await p.waitForTimeout(700);
    await shot(p, 't-soz.jpg');
    await mark(p, 't-soz.jpg', { kart1: '.kart[data-ki="0"]', geri: '#geri span' });
    await p.click('.kart[data-ki="0"]');
    await p.waitForTimeout(600);
    await shot(p, 't-dogru.jpg');
  }

  // ── ARKADAŞLARLA: Karşıdan (akıllı tahta / bilgisayar, 4 kişi) ──
  {
    const p = await desktop('/hizli-hafiz/');
    await p.evaluate(() => localStorage.setItem('hh_oturma', 'karsi'));
    await p.reload(); await p.waitForTimeout(1200);
    await p.addStyleTag({ content: CSS });
    await p.evaluate(() => Oyun.basla('cok', 4));
    // önceki turlardan skor: gerçek turlar oynanır (buzz → doğru kart)
    const skorTur = async (oyuncu) => {
      await p.evaluate((o) => Oyun.buzz(o), oyuncu);
      await p.evaluate(() => { const ki = Oyun.sidHaritasi[Oyun.hedef][0].ki; document.querySelector(`.kart[data-ki="${ki}"]`).click(); });
      await p.waitForTimeout(300);
      await p.evaluate(() => { Ekran.kapat(); Oyun.yeniTur(); });
    };
    for (const o of [0, 2, 1, 2, 3, 2, 0]) await skorTur(o);
    await hedefKoy(p, 'fil');
    await p.evaluate(() => Oyun.ipucuPopGoster(Oyun.veri.semboller[Oyun.hedef].ben));
    await p.waitForTimeout(900);
    await shot(p, 'd-karsi.jpg');
    await mark(p, 'd-karsi.jpg', { bz3: '#buzzbar .bz[data-id="2"]', ipucu: '#ipucu-pop .ip-kutu' });
    await p.keyboard.press('KeyG');                       // 3. oyuncunun tuşu
    await p.waitForTimeout(700);
    await shot(p, 'd-karsi-soz.jpg');
    await mark(p, 'd-karsi-soz.jpg', { kart3: '.kart[data-ki="2"]' });
    await p.click('.kart[data-ki="2"]');
    await p.waitForTimeout(600);
    await shot(p, 'd-karsi-dogru.jpg');
    await mark(p, 'd-karsi-dogru.jpg', { modal: '#perde .modal' });
  }
});
