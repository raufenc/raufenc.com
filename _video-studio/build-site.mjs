#!/usr/bin/env node
// Render edilmiş videoları siteye bağlar (tek kaynak: videolar/index.json):
//  1. data/projeler.js  → videosu olan her projeye  video: '<slug>'  alanı
//  2. videolar/index.html → JSON-LD (ItemList + VideoObject) bloğu
//  3. sitemap.xml        → /videolar/ girdisi + video:video kayıtları
//   node build-site.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { manifest } from './derive.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '..');
const ORIGIN = 'https://raufenc.com';

const vids = manifest();
const bySlug = Object.fromEntries(vids.map((v) => [v.slug, v]));
const slugOf = (h) => h.replace(/^https?:\/\/(www\.)?/, '').replace(/\.com\/?$/, '').replace(/#\/?/g, '').replace(/\/+/g, '-').replace(/^-|-$/g, '');

// 1) projeler.js
const pjPath = path.join(SITE, 'data/projeler.js');
let pj = fs.readFileSync(pjPath, 'utf8');
let eklendi = 0;
pj = pj.split('\n').map((line) => {
  const m = line.match(/["']?href["']?\s*:\s*(["'])([^"']+)\1/);
  if (!m || !/^\s*\{/.test(line)) return line;
  let l = line.replace(/,\s*["']?video["']?\s*:\s*(["'])[^"']*\1/, '');
  const slug = slugOf(m[2]);
  if (bySlug[slug]) {
    const json = /^\s*\{"/.test(l);
    l = l.replace(/\s*\}(\s*,?\s*)$/, (json ? `, "video": "${slug}"}` : `, video: '${slug}' }`) + '$1');
    eklendi++;
  }
  return l;
}).join('\n');
pj = pj.replace(/(\* Son g[uü]ncelleme: )[\d-]+/, `$1${new Date().toISOString().slice(0, 10)}`);
fs.writeFileSync(pjPath, pj);

// projeler.js'i değerlendir (başlık/açıklama için)
const P = new Function(pj + '; return { PROJELER, KATEGORILER };')();
const proj = Object.fromEntries(P.PROJELER.filter((p) => p.video).map((p) => [p.video, p]));
const strip = (s) => String(s || '').replace(/<[^>]+>/g, '');
const iso = (x) => { const sn = Math.round(x); return `PT${Math.floor(sn / 60) ? Math.floor(sn / 60) + 'M' : ''}${sn % 60}S`; };

// 2) JSON-LD
const items = vids.filter((v) => proj[v.slug]).map((v, i) => {
  const p = proj[v.slug];
  return {
    '@type': 'ListItem',
    position: i + 1,
    url: `${ORIGIN}/videolar/#${v.slug}`,
    item: {
      '@type': 'VideoObject',
      name: `${strip(p.title)} — Tanıtım`,
      description: strip(p.desc),
      thumbnailUrl: [`${ORIGIN}/videolar/${v.slug}/yatay.jpg`, `${ORIGIN}/videolar/${v.slug}/dikey.jpg`],
      contentUrl: `${ORIGIN}/videolar/${v.slug}/yatay.mp4`,
      uploadDate: `${v.guncelleme}T09:00:00+03:00`,
      duration: iso(v.sure),
      inLanguage: 'tr',
      author: { '@type': 'Person', name: 'Rauf Enç', url: ORIGIN + '/' },
    },
  };
});
const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Tanıtım Videoları — Rauf Enç', itemListElement: items };
const vlPath = path.join(SITE, 'videolar/index.html');
let vl = fs.readFileSync(vlPath, 'utf8');
vl = vl.replace(/<!-- VIDEO-JSONLD:BASLA -->[\s\S]*?<!-- VIDEO-JSONLD:BITIR -->/,
  `<!-- VIDEO-JSONLD:BASLA -->\n  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n  <!-- VIDEO-JSONLD:BITIR -->`);
fs.writeFileSync(vlPath, vl);

// 3) sitemap.xml
const smPath = path.join(SITE, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8');
if (!sm.includes('xmlns:video=')) sm = sm.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">');
const x = (s) => strip(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const latest = vids.reduce((m, v) => (v.guncelleme > m ? v.guncelleme : m), '2026-01-01');
const block = [
  '  <!-- VIDEOLAR:BASLA -->',
  '  <url>',
  `    <loc>${ORIGIN}/videolar/</loc>`,
  `    <lastmod>${latest}</lastmod>`,
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.8</priority>',
  ...vids.filter((v) => proj[v.slug]).flatMap((v) => {
    const p = proj[v.slug];
    return [
      '    <video:video>',
      `      <video:thumbnail_loc>${ORIGIN}/videolar/${v.slug}/yatay.jpg</video:thumbnail_loc>`,
      `      <video:title>${x(p.title)} — Tanıtım</video:title>`,
      `      <video:description>${x(p.desc)}</video:description>`,
      `      <video:content_loc>${ORIGIN}/videolar/${v.slug}/yatay.mp4</video:content_loc>`,
      `      <video:duration>${Math.round(v.sure)}</video:duration>`,
      `      <video:publication_date>${v.guncelleme}T09:00:00+03:00</video:publication_date>`,
      '      <video:family_friendly>yes</video:family_friendly>',
      '    </video:video>',
    ];
  }),
  '  </url>',
  '  <!-- VIDEOLAR:BITIR -->',
].join('\n');
if (/<!-- VIDEOLAR:BASLA -->[\s\S]*?<!-- VIDEOLAR:BITIR -->/.test(sm)) sm = sm.replace(/  <!-- VIDEOLAR:BASLA -->[\s\S]*?<!-- VIDEOLAR:BITIR -->/, block);
else sm = sm.replace('</urlset>', block + '\n</urlset>');
fs.writeFileSync(smPath, sm);

console.log(`projeler.js: ${eklendi} proje videolu · JSON-LD: ${items.length} · sitemap: ${items.length} video`);
