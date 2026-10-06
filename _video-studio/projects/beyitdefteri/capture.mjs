// Beyit Defteri — çekimler (masaüstü d-*, mobil m-*)
// Gündüz teması (site varsayılanı). Okuma alanı kendi içinde kayar (#reader).
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { withStudio } from '../../lib/capture.mjs';

const POEM = 'mektup-35';          // Gül Solar, Sevgi Solmasın (Mektûbât, 6 beyit, 7 kelimelik sözlük; 'huzur' aramasında çıkar)
const SIIR = 'mektup-31';          // Ayna, Asıl Değildir (intro: okuma ekranı)
const AHENK = 'mektup-24';         // Sevdiğinle (aruz: tef'ileler)
const KOL = 'yapayin-zekasi', KOL_POEM = 'aklini-uyandir';
const ARA = 'huzur';               // 7 sonuç, mektup-35 dahil
// Telefon çerçevesindeki çentik site başlığını örtmesin: mobil görünüm 790 px, üstüne 54 px durum çubuğu payı
const SAFE_TOP = 54, M_VIEW = { width: 390, height: 844 - SAFE_TOP };

await withStudio(import.meta.url, async ({ desktop, mobile: mob, shot, mark, hide, dir }) => {
  const mobile = (u) => mob(u, { viewport: M_VIEW });
  const prep = async (p) => {
    await hide(p, ['#rauf-nav', '.toast', '.skip']);
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.waitForFunction(() => document.documentElement.dataset.ready === 'true', null, { timeout: 15000 }).catch(() => {});
    await p.waitForTimeout(500);
  };
  const blur = (p) => p.evaluate(() => document.activeElement?.blur());
  // #reader içinde öğeyi üstten `off` piksel boşlukla göster
  const scrollReader = (p, sel, off = 0, back = 0) => p.evaluate(({ sel, off, back }) => {
    const r = document.querySelector('#reader'); const all = document.querySelectorAll(sel); const e = all[Math.max(0, all.length - 1 - back)];
    if (!r || !e) return;
    r.scrollTop = e.getBoundingClientRect().top - r.getBoundingClientRect().top + r.scrollTop - off;
  }, { sel, off, back });

  // ---------- MASAÜSTÜ ----------
  {
    // Açılış: bütün defter, ilk şiir
    let p = await desktop('/beyitdefteri/');
    await prep(p);
    await shot(p, 'd-hero.jpg');
    await mark(p, 'd-hero.jpg', { kol: `[data-collection="${KOL}"]` });

    // Koleksiyona dokun → fihrist süzülür → şiire dokun → okuma
    await p.click(`[data-collection="${KOL}"]`);
    await p.waitForTimeout(500);
    await shot(p, 'd-kol.jpg');
    await mark(p, 'd-kol.jpg', { poem: `.poem-link[data-poem="${KOL_POEM}"]` });
    await p.click(`.poem-link[data-poem="${KOL_POEM}"]`);
    await p.waitForTimeout(700); await blur(p);
    await shot(p, 'd-koleksiyon.jpg');
    await mark(p, 'd-koleksiyon.jpg', { verses: '.verses' });

    // Gazel → mahlas beyti → tef'ileleri göster
    p = await desktop(`/beyitdefteri/siir/${SIIR}/`);
    await prep(p);
    await shot(p, 'd-siir.jpg');
    p = await desktop(`/beyitdefteri/siir/${AHENK}/`);
    await prep(p);
    await scrollReader(p, '.couplet', 14, 1);
    await p.waitForTimeout(300);
    await shot(p, 'd-ahenk0.jpg');
    await mark(p, 'd-ahenk0.jpg', { scan: '.scan-details summary' });
    await p.click('.scan-details summary');
    await p.waitForTimeout(400); await blur(p);
    await scrollReader(p, '.scan-details', 24);
    await p.waitForTimeout(300);
    await shot(p, 'd-ahenk.jpg');
    await mark(p, 'd-ahenk.jpg', { feet: '.scan-verse .feet' });

    // Arama → sonuca dokun → küçük sözlük
    p = await desktop('/beyitdefteri/');
    await prep(p);
    await p.fill('#search', ARA);
    await p.waitForTimeout(500); await blur(p);
    await shot(p, 'd-ara.jpg');
    await mark(p, 'd-ara.jpg', { search: '#search', poem: `.poem-link[data-poem="${POEM}"]` });
    await p.click(`.poem-link[data-poem="${POEM}"]`);
    await p.waitForTimeout(700);
    await p.evaluate(() => { const d = [...document.querySelectorAll('details.annotation')].find(x => x.querySelector('.glossary')); if (d) d.open = true; });
    await p.waitForTimeout(300); await blur(p);
    await scrollReader(p, 'details.annotation:has(.glossary)', 24);
    await p.waitForTimeout(300);
    await shot(p, 'd-sozluk.jpg');
    await mark(p, 'd-sozluk.jpg', { glossary: '.glossary' });
  }

  // ---------- MOBİL ----------
  {
    let p = await mobile('/beyitdefteri/');
    await prep(p);
    await shot(p, 'm-hero.jpg');
    await mark(p, 'm-hero.jpg', { fihrist: 'button.mobile-index' });

    // Fihrist → koleksiyon seçili → şiire dokun
    await p.click('button.mobile-index');
    await p.waitForTimeout(500); await blur(p);
    await shot(p, 'm-fihrist.jpg');
    await mark(p, 'm-fihrist.jpg', { select: '#collection-select' });
    await p.selectOption('#collection-select', KOL);
    await p.waitForTimeout(400); await blur(p);
    await shot(p, 'm-kol.jpg');
    await mark(p, 'm-kol.jpg', { poem: `.poem-link[data-poem="${KOL_POEM}"]` });
    await p.click(`.poem-link[data-poem="${KOL_POEM}"]`);
    await p.waitForTimeout(700); await blur(p);
    await shot(p, 'm-koleksiyon.jpg');

    // Gazel → mahlas beyti → tef'ileler
    p = await mobile(`/beyitdefteri/siir/${SIIR}/`);
    await prep(p);
    await shot(p, 'm-siir.jpg');
    p = await mobile(`/beyitdefteri/siir/${AHENK}/`);
    await prep(p);
    await scrollReader(p, '.couplet', 20);
    await p.waitForTimeout(300);
    await shot(p, 'm-ahenk0.jpg');
    await mark(p, 'm-ahenk0.jpg', { scan: '.scan-details summary' });
    await p.click('.scan-details summary');
    await p.waitForTimeout(400); await blur(p);
    await scrollReader(p, '.scan-details', 10);
    await p.waitForTimeout(300);
    await shot(p, 'm-ahenk.jpg');
    await mark(p, 'm-ahenk.jpg', { feet: '.scan-verse .feet' });

    // Fihristte arama → sonuca dokun → sözlük
    p = await mobile('/beyitdefteri/');
    await prep(p);
    await p.click('button.mobile-index');
    await p.waitForTimeout(400);
    await p.fill('#search', ARA);
    await p.waitForTimeout(500); await blur(p);
    await shot(p, 'm-ara.jpg');
    await mark(p, 'm-ara.jpg', { search: '#search', poem: `.poem-link[data-poem="${POEM}"]` });
    await p.click(`.poem-link[data-poem="${POEM}"]`);
    await p.waitForTimeout(700);
    await p.evaluate(() => { const d = [...document.querySelectorAll('details.annotation')].find(x => x.querySelector('.glossary')); if (d) d.open = true; });
    await p.waitForTimeout(300); await blur(p);
    await scrollReader(p, '.scan-details', 16);
    await p.waitForTimeout(300);
    await shot(p, 'm-sozluk.jpg');
  }

  // Mobil çekimlere durum çubuğu payı (üst satırın rengiyle) ve işaretleri yeni yüksekliğe kaydır
  const phoneShots = fs.readdirSync(`${dir}/shots`).filter((f) => /^m-.*\.jpg$/.test(f));
  const r = spawnSync('python3', ['-c', `
import sys
from PIL import Image
pad = int(sys.argv[1])
for f in sys.argv[2:]:
    im = Image.open(f).convert('RGB'); w, h = im.size; s = w / 390; ph = round(pad * s)
    if abs(h / s - 844) < 2: continue
    row = im.crop((0, 0, w, 3)).resize((1, 1), Image.BILINEAR).getpixel((0, 0))
    out = Image.new('RGB', (w, h + ph), row); out.paste(im, (0, ph)); out.save(f, quality=90)
`, String(SAFE_TOP), ...phoneShots.map((f) => `${dir}/shots/${f}`)], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('durum çubuğu payı eklenemedi');
  const marksFile = `${dir}/shots/marks.json`;
  const all = JSON.parse(fs.readFileSync(marksFile, 'utf8'));
  for (const f of phoneShots) for (const v of Object.values(all[f] || {})) {
    if (!v || v._safe) continue;
    v.y = (SAFE_TOP + v.y * M_VIEW.height) / 844; v.h = v.h * M_VIEW.height / 844; v._safe = 1;
  }
  fs.writeFileSync(marksFile, JSON.stringify(all, null, 2));
});
