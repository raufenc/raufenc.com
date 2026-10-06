// Çıraktan Pîre — çekimler (masaüstü d-*, mobil m-*)
//
// Oyun gerçekten oynanır. Rastgelelik tohumlanır (Math.random → mulberry32), böylece çekimler
// her çalıştırmada aynı çıkar; ses kapatılır (gürültü üreteci Math.random dizisini bozmasın).
//  A) Yeni oyun (tohum 2440443): kurulum → tahta → Yol Kartı "Üç Öğüt" (3 ilerle) → Helvacı'ya
//     iniş → "Bilgiyle Aç" → bilgi sorusu (şed) → doğru → dükkân %25 indirimle → botlar oynar →
//     2. tur Yol Kartı (4 ilerle) → Fütüvvet karesi → "Komşum Siftah Etmedi".
//  B) Oyun ortası (tohum 1): dört koltuk bot, Playwright sahte saatiyle hızlı oynatılır. "Sen" koltuğu
//     Gıda Esnafı sektörünü (Fırıncı + Helvacı) tamamlayıp Kalfa'ya ulaştığı turda, iniş çözülüp
//     "serbest" aşamaya gelinince (bot rütbe almadan önce) oyunun kendi Sen ↔ Bot düğmesiyle koltuk
//     insana geçer → "Rütbe Yükselt" → Usta → Ahi Baba (iki dükkân).
//  Telefonda oyunun kendi "Tüm Tahta" + "3B Masa" düğmeleri kullanılır; Ahi Baba sonrası "Yakın"
//  görünümde Gıda Esnafı karelerine kaydırılır. Çalıştırma: ONLY=A|B, FORMS=d|m ile parça seçilebilir.
import { withStudio } from '../../lib/capture.mjs';

const ONLY = process.env.ONLY || 'AB';
const FORMS = (process.env.FORMS || 'dm').split('');

function tohum(seed) {
  let a = seed >>> 0;
  Math.random = function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hazirlik() {
  try { localStorage.setItem('cihan.ses', 'kapali'); localStorage.removeItem('cp_kayit'); localStorage.removeItem('cp_hiz'); } catch (e) {}
}

await withStudio(import.meta.url, async ({ desktop, mobile, shot, mark, hide, origin }) => {
  const cssTemel = '#rauf-nav{display:none!important} *{caret-color:transparent!important} :focus{outline:none!important} :focus-visible{outline:none!important}';
  // Masaüstünde sağ panel (üst çerçeve) ile alttaki Duraklat/3B Masa sırası 900 px'e sığmıyor (904 px);
  // %97 tarayıcı yakınlaştırması ile ikisi de kenar boşluğuyla kadraja girer.
  const cssFor = (pre) => cssTemel + (pre === 'd' ? ' html{zoom:0.97}' : '');
  async function bekleKosul(p, fn, arg, ms = 30000) {
    await p.waitForFunction(fn, arg, { timeout: ms, polling: 100 });
  }
  async function kaydir(p, pre) {
    // Masaüstünde tahta, panelin üst çerçevesi ve alt düğme sırası görünür (≈13 px pay);
    // telefonda başlık üstte kalır, tahta + aksiyon kartı görünür
    await p.evaluate((y) => window.scrollTo(0, y), pre === 'd' ? 166 : 158);
    await p.waitForTimeout(250);
  }
  // Telefon: "Tüm Tahta" + "3B Masa" (oyunun kendi düğmeleri)
  async function masaGorunumu(p) {
    await p.click('#yakin-btn'); await p.waitForTimeout(500);
    await p.click('#d3-btn'); await p.waitForTimeout(800);
  }
  async function ac(open, pre) {
    const p = await open(null);
    await p.addInitScript(hazirlik);
    await p.goto(origin + '/ciraktan-pire/', { waitUntil: 'load' });
    await p.addStyleTag({ content: cssFor(pre) });
    await p.waitForTimeout(1200);
    return p;
  }

  for (const pre of FORMS) {
    const open = pre === 'd' ? desktop : mobile;

    // ───────── A) yeni oyun ─────────
    if (ONLY.includes('A')) {
      const p = await ac(open, pre);
      await shot(p, `${pre}-kurulum.jpg`);
      await mark(p, `${pre}-kurulum.jpg`, { basla: '#basla', kapak: '.kapak-cer' });
      // tohum: desteler oyunBaslat'ta karıştırılır
      await p.evaluate(tohum, 2440443);
      await p.click('#basla');
      await p.waitForTimeout(1500);
      if (pre === 'm') await masaGorunumu(p);
      await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await kaydir(p, pre);
      await shot(p, `${pre}-tahta.jpg`);
      await mark(p, `${pre}-tahta.jpg`, { cek: '#aksiyon-bar .btn-ana', tahta: '#tahta', merkez: '.merkez', esnaf: '#oyuncular' });

      // Yol Kartı çek
      await p.click('#aksiyon-bar .btn-ana');
      await p.waitForTimeout(1600);
      await shot(p, `${pre}-yolkarti.jpg`);
      await mark(p, `${pre}-yolkarti.jpg`, { ilerle: '#m-ilerle', no: '.yk-no', baslik: '.yk-baslik', ogren: '.kart-ogren' });
      await p.click('#m-ilerle');
      // iniş modalı (boş dükkân)
      await bekleKosul(p, () => !!document.querySelector('#m-bilgi'));
      await p.waitForTimeout(900);
      // telefonda iniş kartı uzun: düğmeler görünsün diye kart sonuna kaydırılır (kullanıcı gibi)
      await p.evaluate(() => { const m = document.querySelector('.modal-kutu'); if (m) m.scrollTop = m.scrollHeight; });
      await p.waitForTimeout(300);
      await shot(p, `${pre}-inis.jpg`);
      await mark(p, `${pre}-inis.jpg`, { bilgi: '#m-bilgi', al: '#m-al', baslik: '.modal-kutu h2' });
      await p.click('#m-bilgi');
      await p.waitForTimeout(900);
      await shot(p, `${pre}-soru.jpg`);
      const dogru = await p.evaluate(() => { const b = [...document.querySelectorAll('.sik')]; return b.findIndex((x) => /Şed/.test(x.textContent)); });
      await mark(p, `${pre}-soru.jpg`, { dogru: `.sik[data-i="${dogru}"]`, soru: '.soru-metin' });
      await p.click(`.sik[data-i="${dogru}"]`);
      await p.waitForTimeout(900);
      await shot(p, `${pre}-dogru.jpg`);
      await mark(p, `${pre}-dogru.jpg`, { sonuc: '#soru-sonuc', devam: '#m-devam', soru: '.soru-metin' });
      await p.click('#m-devam');
      await p.waitForTimeout(1200);
      await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await kaydir(p, pre);
      await shot(p, `${pre}-alindi.jpg`);
      await mark(p, `${pre}-alindi.jpg`, { bitir: '#aksiyon-bar .btn-ana', helvaci: '.kare[data-pos="3"]', tahta: '#tahta' });
      // turu bitir → botlar oynar → yeniden Sen
      await p.click('#aksiyon-bar .btn-ana');
      await bekleKosul(p, () => BC.oyun.sira === 0 && BC.oyun.asama === 'bekle' && document.getElementById('modal').style.display !== 'flex', null, 60000);
      await p.waitForTimeout(900);
      await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await kaydir(p, pre);
      await shot(p, `${pre}-tur2.jpg`);
      await mark(p, `${pre}-tur2.jpg`, { cek: '#aksiyon-bar .btn-ana', tahta: '#tahta', esnaf: '#oyuncular', log: '#log' });
      await p.click('#aksiyon-bar .btn-ana');
      await p.waitForTimeout(1600);
      await shot(p, `${pre}-yolkarti2.jpg`);
      await p.click('#m-ilerle');
      await bekleKosul(p, () => !!document.querySelector('#m-uygula'));
      await p.waitForTimeout(1600);
      await shot(p, `${pre}-futuvvet.jpg`);
      await mark(p, `${pre}-futuvvet.jpg`, { uygula: '#m-uygula', etki: '.ok-etki', baslik: '.yk-baslik', ogren: '.kart-ogren' });
      await p.click('#m-uygula');
      await p.waitForTimeout(1200);
      await kaydir(p, pre);
      await shot(p, `${pre}-futuvvet-sonra.jpg`);
      console.log(pre, 'A tamam', await p.evaluate(() => BC.oyun.oyuncular.map((o) => [o.ad, o.para, o.pos, o.mulkler])));
      await p.context().close();
    }

    // ───────── B) oyun ortası: rütbe ─────────
    if (ONLY.includes('B')) {
      const p = await open(null);
      await p.addInitScript(hazirlik);
      await p.clock.install();
      await p.goto(origin + '/ciraktan-pire/', { waitUntil: 'load' });
      await p.addStyleTag({ content: cssFor(pre) });
      await p.waitForTimeout(1000);
      // dört koltuk da bot (ilk koltuğun adı "Sen" kalır)
      await p.locator('#kurulum-oyuncular .kur-row').first().locator('button[data-tip="bot"]').click();
      await p.evaluate(tohum, 1);
      await p.click('#basla');
      if (pre === 'm') await masaGorunumu(p);
      // Sen'in turunda, iniş çözülüp "serbest" aşamaya gelindiğinde (bot rütbe almadan önce) koltuk Sen'e geçer
      await p.evaluate(() => {
        window.__iv = setInterval(() => {
          const g = BC.oyun, K = BC.K;
          if (!g || g.sira !== 0 || g.asama !== 'serbest' || document.getElementById('modal').style.display === 'flex') return;
          const gida = K.filter((k) => k.tip === 'sehir' && k.grupKey === K[1].grupKey);
          const sen = g.oyuncular[0];
          if (!gida.every((k) => k.sahip === 0) || Math.max(...gida.map((k) => k.imar)) < 3 || Math.max(...gida.map((k) => k.imar)) >= 5 || sen.para < 2200) return;
          clearInterval(window.__iv);
          document.querySelector('.koltuk-btn[data-id="0"]').click();
          window.__hit = { tur: Math.floor(g.elGecti / g.oyuncular.length) + 1, imar: gida.map((k) => k.imar), para: sen.para };
        }, 40);
      });
      let hit = null;
      for (let i = 0; i < 300 && !hit; i++) {
        await p.clock.runFor(2000);
        hit = await p.evaluate(() => window.__hit || null);
      }
      if (!hit) throw new Error('B: koşul oluşmadı');
      console.log(pre, 'B devralındı', JSON.stringify(hit));
      await p.waitForTimeout(1500);
      await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await kaydir(p, pre);
      const rutbeBtn = '#aksiyon-bar button:has(use[href="#cs-ui-imar"])';
      await shot(p, `${pre}-orta.jpg`);
      await mark(p, `${pre}-orta.jpg`, { rutbe: rutbeBtn, tahta: '#tahta', esnaf: '#oyuncular', gida: '.kare[data-pos="1"]', helvaci: '.kare[data-pos="3"]', log: '#log' });
      await p.click(rutbeBtn);
      await p.waitForTimeout(900);
      await shot(p, `${pre}-rutbe.jpg`);
      const ilk = await p.evaluate(() => { const b = document.querySelector('.imbtn:not([disabled])'); return b && b.dataset.pos; });
      await mark(p, `${pre}-rutbe.jpg`, { btn: `.imbtn[data-pos="${ilk}"]`, dizi: '.rutbe-dizi', liste: '.imar-liste' });
      // Ahi Baba'ya kadar yükselt (dengeli: en düşük kademeden)
      for (let k = 0; k < 4; k++) {
        const pos = await p.evaluate(() => { const b = [...document.querySelectorAll('.imbtn:not([disabled])')]; return b.length ? b[0].dataset.pos : null; });
        if (!pos) break;
        await p.click(`.imbtn[data-pos="${pos}"]`);
        await p.waitForTimeout(700);
        await shot(p, `${pre}-rutbe-${k + 1}.jpg`);
        await mark(p, `${pre}-rutbe-${k + 1}.jpg`, { liste: '.imar-liste', dizi: '.rutbe-dizi' });
      }
      await p.click('#m-kapat');
      await p.waitForTimeout(500);
      await p.evaluate(() => document.activeElement && document.activeElement.blur());
      await kaydir(p, pre);
      await shot(p, `${pre}-ahibaba.jpg`);
      await mark(p, `${pre}-ahibaba.jpg`, { gida: '.kare[data-pos="1"]', helvaci: '.kare[data-pos="3"]', tahta: '#tahta', log: '#log', esnaf: '#oyuncular' });
      if (pre === 'm') {
        // yakın görünüm: tahtayı Gıda Esnafı dükkânlarına kaydır (parmakla kaydırır gibi)
        await p.click('#yakin-btn'); await p.waitForTimeout(900);
        await p.evaluate(() => {
          const sar = document.querySelector('.tahta-saran'), c = document.querySelector('.kare[data-pos="2"]');
          const sb = sar.getBoundingClientRect(), cb = c.getBoundingClientRect();
          sar.scrollLeft += cb.left - sb.left + cb.width / 2 - sar.clientWidth / 2;
          sar.scrollTop += cb.top - sb.top + cb.height / 2 - sar.clientHeight * 0.62;
        });
        await p.waitForTimeout(500);
        await kaydir(p, pre);
        await shot(p, `${pre}-ahibaba-yakin.jpg`);
        await mark(p, `${pre}-ahibaba-yakin.jpg`, { gida: '.kare[data-pos="1"]', helvaci: '.kare[data-pos="3"]', tahta: '.tahta-saran' });
        await p.click('#yakin-btn'); await p.waitForTimeout(600);
      }
      // servet sıralaması
      await p.click('#skor-btn');
      await p.waitForTimeout(800);
      await shot(p, `${pre}-servet.jpg`);
      await p.click('#m-kapat');
      console.log(pre, 'B tamam', await p.evaluate(() => [BC.K[1].imar, BC.K[3].imar, BC.oyun.oyuncular.map((o) => [o.ad, o.para, o.mulkler.length])]));
      await p.context().close();
    }
  }
});
