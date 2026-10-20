#!/usr/bin/env node
/**
 * Ana sayfa, videolar ve vitrin sayfalarının <head>'ine yazı tipi ön yüklemesini ve
 * tasarım sistemi CSS'ini (fonts.css + tokens.css [+ animations.css]) satır içi yazar.
 * Böylece ilk boyama için ayrı CSS isteği beklenmez.
 *
 * lib/fonts/fonts.css, lib/design-system/tokens.css veya animations.css değişince:
 *   node scripts/tasarim-inline.mjs            → sayfaları günceller
 *   node scripts/tasarim-inline.mjs --kontrol  → güncel değilse 1 ile çıkar
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const BAS = '<!-- tasarim:bas — scripts/tasarim-inline.mjs üretir, elle düzenlemeyin -->';
const SON = '<!-- tasarim:son -->';
const ONYUKLE = ['inter-latin', 'inter-latin-ext', 'fraunces-normal-latin', 'fraunces-normal-latin-ext'];
const TAM = ['lib/fonts/fonts.css', 'lib/design-system/tokens.css', 'lib/design-system/animations.css'];

const vitrinler = readdirSync(join(KOK, 'vitrin'), { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => `vitrin/${d.name}/index.html`);

const HEDEFLER = [
  { dosya: 'index.html', parcalar: TAM },
  { dosya: 'videolar/index.html', parcalar: TAM.slice(0, 2) },
  ...vitrinler.map(dosya => ({ dosya, parcalar: TAM })),
];

// Yorumları atar, boşlukları daraltır. ':' çevresine dokunmaz (seçicilerde anlam taşır).
function kucult(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function blok(parcalar, girinti) {
  const css = parcalar.map(p => kucult(readFileSync(join(KOK, p), 'utf8'))).join('');
  const satirlar = [
    BAS,
    ...ONYUKLE.map(ad => `<link rel="preload" href="/lib/fonts/${ad}.woff2" as="font" type="font/woff2" crossorigin />`),
    `<style id="tasarim">${css}</style>`,
    SON,
  ];
  return satirlar.join('\n' + girinti);
}

// İlk geçiş: Google Fonts ve tasarım sistemi bağlantılarını kaldırıp yerine bloğu koyar.
const ESKI = [
  /^\s*<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\s*$/,
  /^\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?family=Fraunces[^>]*>\s*$/,
  /^\s*<link rel="stylesheet" href="\/lib\/design-system\/(tokens|animations)\.css"\s*\/?>\s*$/,
  /^\s*<!-- Fontlar -->\s*$/,
];

function isle(html, parcalar) {
  const b = html.indexOf(BAS);
  if (b !== -1) {
    const s = html.indexOf(SON, b);
    const satirBasi = html.lastIndexOf('\n', b) + 1;
    const girinti = html.slice(satirBasi, b);
    return html.slice(0, b) + blok(parcalar, girinti) + html.slice(s + SON.length);
  }
  const satirlar = html.split('\n');
  let yer = -1;
  const kalan = [];
  satirlar.forEach(satir => {
    if (ESKI.some(r => r.test(satir))) {
      if (yer === -1) yer = kalan.length;
      return;
    }
    kalan.push(satir);
  });
  if (yer === -1) throw new Error('Tasarım bağlantıları bulunamadı');
  const girinti = (satirlar.find(s => /design-system\/tokens\.css/.test(s)) || '  ').match(/^\s*/)[0];
  kalan.splice(yer, 0, girinti + blok(parcalar, girinti));
  return kalan.join('\n');
}

const kontrol = process.argv.includes('--kontrol');
let eskimis = 0;
for (const { dosya, parcalar } of HEDEFLER) {
  const yol = join(KOK, dosya);
  const once = readFileSync(yol, 'utf8');
  const sonra = isle(once, parcalar);
  if (once === sonra) continue;
  eskimis++;
  if (kontrol) console.log('güncel değil:', dosya);
  else { writeFileSync(yol, sonra); console.log('yazıldı:', dosya); }
}
if (kontrol && eskimis) process.exit(1);
if (!eskimis) console.log('Tüm sayfalar güncel.');
