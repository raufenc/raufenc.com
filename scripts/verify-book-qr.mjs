import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Printed in NöroTerbiye. Rauf's instruction, 2026-10-26: preserve these forever.
// Keep this independent of vercel.json so a removed or changed mapping fails the build.
const bookLinks = [
  ['/neuroterbiye-adalet', 'https://www.youtube.com/watch?v=mZLrfNy2Ia8'],
  ['/neuroterbiye-nasilbuhalegeldik', 'https://www.youtube.com/watch?v=LBsY-GBSQwQ'],
  ['/neuroterbiye-mhrs', 'https://www.mhrs.gov.tr/'],
];

export function verifyBookQr(config) {
  const expected = bookLinks.flatMap(([path, destination]) =>
    [path, `${path}/`].map(source => ({ source, destination, permanent: true }))
  );
  assert.ok(Array.isArray(config.redirects), 'Kitap QR yönlendirmeleri eksik.');
  assert.deepEqual(
    config.redirects.slice(0, expected.length),
    expected,
    'Basılı NöroTerbiye adresleri değiştirilemez. Altı koşulsuz, kalıcı kural listenin başında korunmalı.'
  );
  for (const { source } of expected) {
    assert.equal(
      config.redirects.filter(rule => rule.source === source).length,
      1,
      `Kitap adresi için birden fazla yönlendirme var: ${source}`
    );
  }
  assert.equal(
    config.buildCommand,
    'node scripts/verify-book-qr.mjs',
    'Kitap QR korumasını Vercel yayın adımından kaldırmayın.'
  );
}

// Printed in İyiliklerle Büyüyorum (3 volumes, inside front cover). Rauf's instruction, 2026-11-03:
// the site itself lives at /iyilik/, each volume's QR opens /iyilik/<n>/ directly. Never move or delete these pages.
const iyilikPages = [
  ['iyilik/index.html', null],
  ['iyilik/1/index.html', '#kitap/1'],
  ['iyilik/2/index.html', '#kitap/2'],
  ['iyilik/3/index.html', '#kitap/3'],
];

export function verifyIyilikPages(root = new URL('..', import.meta.url)) {
  for (const [file, route] of iyilikPages) {
    let html;
    try {
      html = readFileSync(new URL(file, root), 'utf8');
    } catch {
      throw new Error(`Basılı İyiliklerle Büyüyorum adresi eksik: /${file.replace(/index\.html$/, '')}`);
    }
    if (route) {
      assert.ok(html.includes('<base href="/iyilik/">') && html.includes(route),
        `/${file.replace(/index\.html$/, '')} doğrudan ${route} kitabını açmalı.`);
    }
  }
}

// Printed in Bir Beyit, Bir Âlem (Hayâtî İnanç, p. 106 QR → raufenc.com/bir-beyit-bir-alem). Rauf's instruction, 2026-11-17:
// this page is the book's QR target; never move or delete it, and keep all 52 couplets with their #beyit-<n> rooms.
export function verifyBirBeyitPage(root = new URL('..', import.meta.url)) {
  const read = (file) => {
    try {
      return readFileSync(new URL(file, root), 'utf8');
    } catch {
      throw new Error(`Basılı Bir Beyit, Bir Âlem karekod sayfası eksik: /${file}`);
    }
  };
  const html = read('bir-beyit-bir-alem/index.html');
  assert.ok(html.includes('app.js'), 'Bir Beyit, Bir Âlem sayfası beyitleri yükleyen app.js dosyasını çağırmalı.');
  read('bir-beyit-bir-alem/app.js');
  const data = JSON.parse(read('bir-beyit-bir-alem/beyitler.json'));
  const numbers = (data.poems || []).map(poem => poem.number).sort((a, b) => a - b);
  assert.deepEqual(numbers, Array.from({ length: 52 }, (_, i) => i + 1),
    'Bir Beyit, Bir Âlem: beyitler.json kitaptaki 52 beytin hepsini 1–52 sırasıyla taşımalı.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    verifyBookQr(JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')));
    console.log('NöroTerbiye: 3 basılı QR adresi ve son eğik çizgili karşılıkları korundu.');
    verifyIyilikPages();
    console.log('İyiliklerle Büyüyorum: /iyilik/ ve 3 basılı kitap adresi yerinde.');
    verifyBirBeyitPage();
    console.log('Bir Beyit, Bir Âlem: /bir-beyit-bir-alem/ karekod sayfası ve 52 beyit yerinde.');
  } catch (error) {
    console.error(`Yayın durduruldu: ${error.message}`);
    process.exitCode = 1;
  }
}
