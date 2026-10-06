// Diyardan Diyara — çekimler (masaüstü d-*, mobil m-*)
//
// 1) Açılış ekranı.
// 2) Gerçek bir sefer (1 insan + 3 bot, Aile modu): Devir kartı → gizli Yol kartı seçimi →
//    "Kartlar açılıyor" → haritada hedef seçip yürüme → Fetih: Berat'a yıl yazıp Mühürleme →
//    Berat'ın arka yüzü (Mühür +1 CP).
// 3) Geç oyun: sitenin kendi otomatik kipiyle (?otomatik=1&dur=9) botlar 9. devre kadar oynar,
//    sonra Elif (insan) 9. devri gerçekten oynar; 10. devirde Kanûnî'nin Devir kartı açılır,
//    ardından bütün haritanın göründüğü tahta.
// Kurulum tohumu Math.random'dan gelir; tekrar üretilebilir olsun diye sayfa içinde tohumlanır.
import fs from 'node:fs';
import path from 'node:path';
import { withStudio } from '../../lib/capture.mjs';

const SEED = 11;          // gerçek seferin kurulum tohumu (Math.random)
const GEC_TOHUM = 1;      // otomatik kipin tohumu (geç oyun tahtası)

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, dir }) => {
  const marksFile = path.join(dir, 'shots', 'marks.json');
  // Harita düğümünün merkezi (etiket hariç) → marks.json
  async function markNode(p, shotName, name, id) {
    const r = await p.evaluate((id) => {
      const c = document.querySelector(`#harita .dg[data-id="${id}"] .dg-halka`);
      if (!c) return null;
      const b = c.getBoundingClientRect();
      return { x: (b.left + b.width / 2) / innerWidth, y: (b.top + b.height / 2) / innerHeight, w: b.width / innerWidth, h: b.height / innerHeight };
    }, id);
    let all = {};
    try { all = JSON.parse(fs.readFileSync(marksFile, 'utf8')); } catch {}
    all[shotName] = Object.assign(all[shotName] || {}, { [name]: r });
    fs.writeFileSync(marksFile, JSON.stringify(all, null, 2));
    if (!r) console.warn('[markNode] yok', shotName, id);
  }
  const durum = (p) => p.evaluate(() => {
    const d = window.__dd && window.__dd.durum();
    return d && { asama: d.asama, devir: d.devir, hamle: d.hamleAsama, sira: d.sira, si: d.siraIndeks, konum: d.oyuncular.map((o) => o.konum), test: !!window.__dd.S().test };
  });
  const benimSiram = (p, hamle) => p.waitForFunction((hamle) => {
    const d = window.__dd && window.__dd.durum();
    return d && d.asama === 'HAMLE' && d.sira[d.siraIndeks] === 0 && d.hamleAsama === hamle && !document.querySelector('#katman .acilis-sahne, #katman .devir-sahne');
  }, hamle, { timeout: 45000 });
  const gorselBekle = (p) => p.evaluate(async () => {
    const imgs = [...document.querySelectorAll('#katman img')];
    await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  });

  for (const [pre, open] of [['d', desktop], ['m', mobile]]) {
    const isM = pre === 'm';
    const dokun = (p, sel) => (isM ? p.tap(sel) : p.click(sel));
    const dugumeDokun = async (p, id) => {
      const pt = await p.evaluate((id) => {
        const c = document.querySelector(`#harita .dg[data-id="${id}"] .dg-halka`).getBoundingClientRect();
        return { x: c.left + c.width / 2, y: c.top + c.height / 2 };
      }, id);
      if (isM) await p.touchscreen.tap(pt.x, pt.y); else await p.mouse.click(pt.x, pt.y);
    };

    // ── 1. Açılış ──
    let p = await open('/diyardan-diyara/');
    await p.waitForTimeout(3200);
    await shot(p, `${pre}-acilis.jpg`);
    if (!isM) {
      // Simge: açılıştaki şemse madalyonu, saydam arka planla
      await p.addStyleTag({ content: `html,body,#ekran-acilis,#ekran-acilis *{background:transparent!important;box-shadow:none!important;border-color:transparent!important}
        #ekran-acilis::before,#ekran-acilis::after,#ekran-acilis *::before,#ekran-acilis *::after{display:none!important}
        .acilis-zemin{display:none!important} .acilis-icerik>*:not(.acilis-semse){opacity:0!important}
        .acilis-semse{width:200px!important;height:200px!important}` });
      await p.waitForTimeout(300);
      await p.locator('.acilis-semse').screenshot({ path: path.join(dir, 'shots', 'logo.png'), omitBackground: true, type: 'png' });
      p = await open('/diyardan-diyara/');
      await p.waitForTimeout(1200);
    }

    // ── 2. Gerçek sefer ──
    await p.evaluate((seed) => {
      let a = seed >>> 0;
      Math.random = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    }, SEED);
    await dokun(p, '#d-yeni');
    await p.waitForTimeout(900);
    await p.evaluate(() => { const c = document.querySelector('#k-rehber'); if (c && c.checked) c.click(); });
    await dokun(p, '#d-basla');
    await p.waitForSelector('#d-sefere', { state: 'visible', timeout: 20000 });
    await p.waitForTimeout(1600);
    await shot(p, `${pre}-devir1.jpg`);
    await dokun(p, '#d-sefere');
    await p.waitForSelector('#yol-el .yol-kart[data-v="2"]:not([disabled])', { timeout: 20000 });
    await p.waitForTimeout(1500);
    await dokun(p, '#yol-el .yol-kart[data-v="2"]');
    await p.waitForTimeout(1100);
    await shot(p, `${pre}-kart.jpg`);
    const onaySel = isM ? '#eylem-cubugu button' : '#d-kart-onay';
    await mark(p, `${pre}-kart.jpg`, { onay: onaySel, kart: '#yol-el .yol-kart[data-v="2"]' });
    // Açılış sahnesini yavaşlat (hiz çarpanı), kartlar dönmüş ve sıralanmış hâlde çek
    await p.evaluate(() => { window.DD_HIZ = 2.4; });
    await dokun(p, onaySel);
    await p.waitForFunction(() => { const k = document.querySelectorAll('#katman .acilis-sahne .as-kart.sirali'); return k.length === 4; }, null, { timeout: 20000 });
    await p.waitForTimeout(1500);
    await shot(p, `${pre}-acilan.jpg`);
    await p.evaluate(() => { window.DD_HIZ = 1; });

    await benimSiram(p, 'yuru');
    await p.waitForTimeout(1600);
    const hedef = await p.evaluate(() => { const c = document.querySelector('.hc-cip[data-hedef]'); return c && c.dataset.hedef; });
    console.log(pre, 'durum', JSON.stringify(await durum(p)), 'hedef', hedef);
    if (!hedef) throw new Error('açık hedef yok — SEED değiştir');
    await dugumeDokun(p, hedef);
    await p.waitForTimeout(1400);
    // Eylem paneli kaydırılabilir; hedef bilgisi yapışkan düğmelerin altında kalmasın diye en alta kaydır
    await p.evaluate(() => { const e = document.querySelector('#eylem-ic'); if (e) e.scrollTop = e.scrollHeight; });
    await p.waitForTimeout(400);
    await shot(p, `${pre}-hedef.jpg`);
    await markNode(p, `${pre}-hedef.jpg`, 'hedef', hedef);
    await mark(p, `${pre}-hedef.jpg`, { yuru: isM ? '#eylem-cubugu button' : '#d-yuru' });
    await dugumeDokun(p, hedef);
    await benimSiram(p, 'eylem');
    await p.waitForSelector('#d-fetih', { state: 'visible', timeout: 20000 });
    await p.waitForTimeout(1200);
    await shot(p, `${pre}-eylem.jpg`);
    await mark(p, `${pre}-eylem.jpg`, { fetih: '#d-fetih' });
    await dokun(p, '#d-fetih');
    await p.waitForSelector('#muhur-yil', { state: 'visible', timeout: 20000 });
    const yil = await p.evaluate((id) => {
      // Mühür için şehrin kayıttaki katılış yılı (motor verisi: katilis.muhurAralik)
      const V = window.DiyarMotor.veri();
      const dg = V.dugumler.find((x) => x.id === id);
      const d = window.__dd.durum().devir;
      const k = dg.katilis.find((x) => x.devir === d) || dg.katilis[0];
      const m = String(k.yil).match(/\d{4}/); // kartta görünen yıl ("1299 civarı" → 1299)
      return m ? m[0] : String(k.muhurAralik[0]);
    }, hedef);
    await gorselBekle(p);
    await p.waitForTimeout(900);
    await p.fill('#muhur-yil', yil);
    await p.waitForTimeout(500);
    await shot(p, `${pre}-berat.jpg`);
    await mark(p, `${pre}-berat.jpg`, { muhurle: '#d-muhurle', yil: '#muhur-yil' });
    await dokun(p, '#d-muhurle');
    await p.waitForSelector('#d-deftere', { state: 'visible', timeout: 20000 });
    await p.waitForSelector('.bk-muhur.basildi', { timeout: 20000 });
    await p.waitForTimeout(1800);
    await shot(p, `${pre}-arka.jpg`);
    await mark(p, `${pre}-arka.jpg`, { muhur: '.bk-muhur', kart: '.bk-arka' });
    console.log(pre, 'fetih', hedef, yil);

    // ── 3. Geç oyun: 9. devri oyna, 10. devrin kartı ve tahta ──
    p = await open(`/diyardan-diyara/?otomatik=1&n=4&tohum=${GEC_TOHUM}&dur=9`);
    await p.waitForFunction(() => { const d = window.__dd && window.__dd.durum(); return d && d.devir === 9 && d.asama === 'SECIM' && !window.__dd.S().test; }, null, { timeout: 90000 });
    await p.waitForTimeout(1800);
    await shot(p, `${pre}-devir9.jpg`);
    // 9. devir: Elif Kışlak oynar (yürümez), sonra eylemsiz geçer
    await dokun(p, '#yol-el .yol-kart[data-v="0"]');
    await p.waitForTimeout(700);
    await dokun(p, onaySel);
    for (let i = 0; i < 200; i++) {
      const s = await p.evaluate(() => {
        const d = window.__dd.durum();
        const k = document.querySelector('#katman');
        return {
          devir: d.devir, asama: d.asama, hamle: d.hamleAsama, ben: d.asama === 'HAMLE' && d.sira[d.siraIndeks] === 0,
          sefere: !!document.querySelector('#d-sefere'), kal: !!document.querySelector('#d-kal'), pas: !!document.querySelector('#d-pas'),
          deftere: !!document.querySelector('#d-deftere'), modal: k ? k.innerText.replace(/\s+/g, ' ').slice(0, 120) : '',
        };
      });
      if (s.devir === 10 && s.sefere) break;
      if (s.deftere) await p.click('#d-deftere').catch(() => {});
      else if (s.ben && s.hamle === 'yuru' && s.kal) await dokun(p, '#d-kal').catch(() => {});
      else if (s.ben && s.hamle === 'eylem' && s.pas) await dokun(p, '#d-pas').catch(() => {});
      else if (s.devir === 9 && s.asama === 'SECIM' && s.modal === '') {
        // 9. devrin ikinci seferi yok; yine de güvenlik için
        const b = await p.$('#yol-el .yol-kart:not([disabled])');
        if (b) { await b.click(); await p.waitForTimeout(400); await p.click(onaySel).catch(() => {}); }
      }
      await p.waitForTimeout(450);
      if (i === 199) throw new Error('10. devre geçilemedi: ' + JSON.stringify(s));
    }
    await p.waitForTimeout(1700);
    await shot(p, `${pre}-devir10.jpg`);
    await mark(p, `${pre}-devir10.jpg`, { sefere: '#d-sefere', kart: '.devir-buyuk', sehirler: '.db-sehirler' });
    await dokun(p, '#d-sefere');
    await p.waitForSelector('#yol-el .yol-kart[data-v="3"]:not([disabled])', { timeout: 20000 });
    await p.waitForTimeout(1300);
    await dokun(p, '#yol-el .yol-kart[data-v="3"]');
    await p.waitForTimeout(700);
    if (isM) { await dokun(p, '.sekme[data-s="puan"]'); await p.waitForTimeout(700); }
    await dokun(p, '#d-sigdir');
    await p.waitForTimeout(1800);
    await shot(p, `${pre}-tahta.jpg`);
    await mark(p, `${pre}-tahta.jpg`, { harita: '#harita-kap' });
    for (const id of ['belgrad', 'budin', 'bagdat', 'istanbul', 'rodos']) await markNode(p, `${pre}-tahta.jpg`, id, id);
    console.log(pre, 'tahta', JSON.stringify(await durum(p)));
  }
});
