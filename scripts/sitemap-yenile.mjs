#!/usr/bin/env node
/**
 * sitemap.xml'i yeniler:
 *  - her <url>'nin <lastmod>'unu sayfanın git geçmişindeki son değişiklik tarihinden yazar
 *    (index.html + aynı klasördeki .js/.css/.json + assets/; ana sayfa ve vitrin için
 *    ayrıca data/projeler.js),
 *  - site dışı ve artık var olmayan adresleri çıkarır, taşınanları yeni adrese çevirir,
 *  - vitrin kategorileri, gizlilik ve projeler.js'teki iç projelerden eksik olanları ekler.
 * Video bölümü (VIDEOLAR:BASLA … BITIR) ve yorumlar korunur.
 *
 *   node scripts/sitemap-yenile.mjs             → yazar
 *   node scripts/sitemap-yenile.mjs --kontrol   → güncel değilse 1 ile çıkar
 * Tarih kaynağı olarak başka bir dal/commit: TARIH_REF=origin/main node scripts/sitemap-yenile.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://raufenc.com';
const GIT = process.env.GIT || 'git';
const REF = process.env.TARIH_REF || 'HEAD';

// Taşınan adresler (eski → yeni). Hedef boşsa adres çıkarılır.
const TASINAN = {
  [`${SITE}/iho-oyunlar/`]: `${SITE}/7sinif/oyunlar/arapca-3d/`,
  [`${SITE}/iho-oyunlar/arapca-3d/`]: `${SITE}/7sinif/oyunlar/arapca-3d/`,
};

function veri() {
  const ctx = {};
  vm.runInNewContext(readFileSync(join(KOK, 'data/projeler.js'), 'utf8') + ';this.P = PROJELER; this.K = KATEGORILER;', ctx);
  return { PROJELER: ctx.P, KATEGORILER: ctx.K };
}

function sayfaDosyasi(loc) {
  const yol = loc.slice(SITE.length + 1);
  return yol === '' || yol.endsWith('/') ? yol + 'index.html' : yol;
}

const tarihOnbellek = {};
function sonDegisiklik(loc) {
  if (loc in tarihOnbellek) return tarihOnbellek[loc];
  const dosya = sayfaDosyasi(loc);
  const klasor = dosya.replace(/index\.html$/, '');
  const yollar = [dosya];
  if (klasor) yollar.push(`:(glob)${klasor}*.js`, `:(glob)${klasor}*.css`, `:(glob)${klasor}*.json`, `:(glob)${klasor}assets/**`);
  if (klasor === '' || klasor.startsWith('vitrin/')) yollar.push('data/projeler.js');
  if (klasor.startsWith('vitrin/')) yollar.push('lib/vitrin-kategori.js');
  const tarih = execFileSync(GIT, ['-C', KOK, 'log', '-1', '--format=%cs', REF, '--', ...yollar], { encoding: 'utf8' }).trim();
  return (tarihOnbellek[loc] = tarih || null);
}

function urlSatiri(loc, sik, oncelik) {
  const t = sonDegisiklik(loc);
  return `  <url><loc>${loc}</loc>${t ? `<lastmod>${t}</lastmod>` : ''}<changefreq>${sik}</changefreq><priority>${oncelik}</priority></url>`;
}

const { PROJELER, KATEGORILER } = veri();
const once = readFileSync(join(KOK, 'sitemap.xml'), 'utf8');
let xml = once;
const gorulen = new Set();

// 1) Var olan bloklar: taşı, ayıkla, lastmod'u yenile
xml = xml.replace(/(\n[ \t]*<!--[^\n]*-->)?(\n[ \t]*)<url>([\s\S]*?)<\/url>/g, (tam, yorum, bosluk, ic) => {
  let loc = (ic.match(/<loc>([^<]+)<\/loc>/) || [])[1];
  if (!loc) return tam;
  if (loc in TASINAN) {
    const yeni = TASINAN[loc];
    ic = ic.replace(`<loc>${loc}</loc>`, `<loc>${yeni}</loc>`);
    loc = yeni;
  }
  const disarida = !loc.startsWith(SITE + '/');
  const yok = !disarida && !existsSync(join(KOK, sayfaDosyasi(loc)));
  if (disarida || yok || gorulen.has(loc)) return '';
  gorulen.add(loc);
  const t = sonDegisiklik(loc);
  if (t) ic = /<lastmod>/.test(ic) ? ic.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${t}</lastmod>`) : ic.replace(/(<\/loc>)/, `$1<lastmod>${t}</lastmod>`);
  return (yorum || '') + bosluk + '<url>' + ic + '</url>';
});

// 2) Eksikleri ekle
const eklenecek = [];
const ekle = (loc, sik, oncelik) => {
  if (gorulen.has(loc) || !existsSync(join(KOK, sayfaDosyasi(loc)))) return;
  gorulen.add(loc);
  eklenecek.push(urlSatiri(loc, sik, oncelik));
};
for (const k of KATEGORILER) ekle(`${SITE}/vitrin/${k.slug}/`, 'weekly', '0.7');
for (const p of PROJELER) if (!p.external) ekle(SITE + p.href.replace(/[#?].*$/, ''), 'monthly', '0.8');
ekle(`${SITE}/gizlilik/`, 'yearly', '0.3');

const ISARET = '  <!-- Vitrin, gizlilik ve projeler.js\'ten eklenenler (scripts/sitemap-yenile.mjs) -->';
if (eklenecek.length) {
  const blok = (xml.includes(ISARET) ? '' : ISARET + '\n') + eklenecek.join('\n') + '\n';
  xml = xml.includes(ISARET)
    ? xml.replace(/<\/urlset>/, blok + '</urlset>')
    : xml.replace(/<\/urlset>/, blok + '</urlset>');
}
xml = xml.replace(/\n{3,}/g, '\n\n');

const kontrol = process.argv.includes('--kontrol');
if (xml === once) { console.log('sitemap.xml güncel.'); process.exit(0); }
if (kontrol) { console.log('sitemap.xml güncel değil'); process.exit(1); }
writeFileSync(join(KOK, 'sitemap.xml'), xml);
console.log(`sitemap.xml yazıldı: ${gorulen.size} adres, ${eklenecek.length} yeni`);
