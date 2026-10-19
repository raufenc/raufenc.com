#!/usr/bin/env node
/**
 * vitrin/<slug>/index.html sayfalarına kategoriye özel <title>, açıklama,
 * canonical, Open Graph / Twitter etiketleri ile statik H1, açıklama, proje
 * sayısı ve kapak görselini yazar. Kaynak: data/projeler.js (KATEGORILER + PROJELER).
 *
 * Proje ya da kategori değişince:   node scripts/vitrin-meta.mjs
 * Denetim:                          node scripts/vitrin-meta.mjs --kontrol
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://raufenc.com';
const BAS = '<!-- seo:bas — scripts/vitrin-meta.mjs üretir -->';
const SON = '<!-- seo:son -->';

// Kapak (hero) görseli ve paylaşım görseli. Dikey afişler paylaşımda kötü
// kırpıldığı için onlarda sitenin genel görseli kullanılır.
const GORSEL = {
  dil:            { kapak: '/images/vitrin/video/dil-poster-960.webp',          og: '/images/vitrin/video/dil-poster.jpg', ogB: [960, 540] },
  tarih:          { kapak: '/images/vitrin/video/tarih-poster-960.webp',        og: '/images/vitrin/video/tarih-poster.jpg', ogB: [960, 540] },
  sinif:          { kapak: '/images/vitrin/video/sinif-poster-960.webp',        og: '/images/vitrin/video/sinif-poster.jpg', ogB: [960, 540] },
  ai:             { kapak: '/images/vitrin/video/ai-poster-960.webp',           og: '/images/vitrin/video/ai-poster.jpg', ogB: [960, 540] },
  peygamberim:    { kapak: '/images/vitrin/video/peygamberim-poster-720.webp',  og: '/images/og-image.jpg', ogB: [1200, 630] },
  dusunce:        { kapak: '/images/vitrin/video/dusunce-poster-720.webp',      og: '/images/og-image.jpg', ogB: [1200, 630] },
  'cihan-serisi': { kapak: '/images/vitrin/cihan-serisi-960.webp',              og: '/images/vitrin/cihan-serisi-og.jpg', ogB: [1200, 630] },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function veri() {
  const ctx = {};
  vm.runInNewContext(readFileSync(join(KOK, 'data/projeler.js'), 'utf8') + ';this.P = PROJELER; this.K = KATEGORILER;', ctx);
  return { PROJELER: ctx.P, KATEGORILER: ctx.K };
}

// Arama sonucu açıklaması ~160 karakter: kategori cümlesi + proje adları
function aciklamaYaz(k, projeler) {
  const sinir = 158;
  let metin = `${k.desc} ${projeler.length} proje: `;
  const adlar = projeler.map(p => p.title);
  let eklenen = 0;
  for (const ad of adlar) {
    const aday = metin + (eklenen ? ', ' : '') + ad;
    if (aday.length > sinir - 1) break;
    metin = aday; eklenen++;
  }
  return metin + (eklenen < adlar.length ? '…' : '.');
}

function isle(html, k, projeler) {
  const g = GORSEL[k.slug];
  const url = `${SITE}/vitrin/${k.slug}/`;
  const baslik = `${k.name} · ${projeler.length} proje — Rauf Enç`;
  const ogBaslik = `${k.name} — Rauf Enç`;
  const aciklama = aciklamaYaz(k, projeler);
  const gir = '  ';

  const og = [
    BAS,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(ogBaslik)}" />`,
    `<meta property="og:description" content="${esc(aciklama)}" />`,
    `<meta property="og:image" content="${SITE}${g.og}" />`,
    `<meta property="og:image:width" content="${g.ogB[0]}" />`,
    `<meta property="og:image:height" content="${g.ogB[1]}" />`,
    `<meta property="og:locale" content="tr_TR" />`,
    `<meta property="og:site_name" content="Rauf Enç" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(ogBaslik)}" />`,
    `<meta name="twitter:description" content="${esc(aciklama)}" />`,
    `<meta name="twitter:image" content="${SITE}${g.og}" />`,
    SON,
  ].join('\n' + gir);

  let h = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(baslik)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(aciklama)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);

  if (h.includes(BAS)) {
    h = h.slice(0, h.indexOf(BAS)) + og + h.slice(h.indexOf(SON) + SON.length);
  } else {
    h = h.replace(/(<link rel="canonical" href="[^"]*" \/>)/, `$1\n${gir}${og}`);
  }

  h = h
    .replace(/(<h1 class="kat-title" id="kategori-title">)[\s\S]*?(<\/h1>)/, `$1${esc(k.name)}$2`)
    .replace(/(<p class="kat-desc" id="kategori-desc">)[\s\S]*?(<\/p>)/, `$1${esc(k.desc)}$2`)
    .replace(/(<span class="kat-meta" id="kategori-count">)[\s\S]*?(<\/span>)/, `$1${projeler.length} proje$2`)
    .replace(/<img id="kat-poster"[^>]*>/, `<img id="kat-poster" src="${g.kapak}" alt="" fetchpriority="high" decoding="async" />`);
  return h;
}

const { PROJELER, KATEGORILER } = veri();
const kontrol = process.argv.includes('--kontrol');
let eskimis = 0;
for (const k of KATEGORILER) {
  const dosya = `vitrin/${k.slug}/index.html`;
  const yol = join(KOK, dosya);
  if (!existsSync(yol)) continue; // NöroTerbiye kendi sayfasına gider
  if (!GORSEL[k.slug]) throw new Error(`GORSEL tablosunda yok: ${k.slug}`);
  const projeler = PROJELER.filter(p => p.kategori === k.slug);
  const once = readFileSync(yol, 'utf8');
  const sonra = isle(once, k, projeler);
  if (once === sonra) continue;
  eskimis++;
  if (kontrol) console.log('güncel değil:', dosya);
  else { writeFileSync(yol, sonra); console.log('yazıldı:', dosya, `(${projeler.length} proje)`); }
}
if (kontrol && eskimis) process.exit(1);
if (!eskimis) console.log('Vitrin sayfaları güncel.');
