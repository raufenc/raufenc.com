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

// Printed in "Şair Ne Demek İstedi?" (Hayati İnanç; eski adı Bir Beyit, Bir Âlem).
// Arka kapak karekodu → raufenc.com/52beyit/ ; s.108 karekodu → raufenc.com/aruz/?kitap (Rauf, 2026-11-25).
// Deneme baskısı ve 106 sayfalık eski baskı → raufenc.com/bir-beyit-bir-alem → vercel.json ile /52beyit/'e yönlenir.
// Bu adresler basılı; asla kaldırılmaz.
export function verifyBirBeyitPage(root = new URL('..', import.meta.url)) {
  const read = (file) => {
    try {
      return readFileSync(new URL(file, root), 'utf8');
    } catch {
      throw new Error(`Basılı Şair Ne Demek İstedi? karekod sayfası eksik: /${file}`);
    }
  };
  const html = read('52beyit/index.html');
  assert.ok(html.includes('app.js'), '52beyit sayfası beyitleri yükleyen app.js dosyasını çağırmalı.');
  read('52beyit/app.js');
  const data = JSON.parse(read('52beyit/beyitler.json'));
  const numbers = (data.poems || []).map(poem => poem.number).sort((a, b) => a - b);
  assert.deepEqual(numbers, Array.from({ length: 52 }, (_, i) => i + 1),
    '52beyit: beyitler.json kitaptaki 52 beytin hepsini 1–52 sırasıyla taşımalı.');
  const vercel = JSON.parse(read('vercel.json'));
  const yon = (vercel.redirects || []).find(r => r.source === '/bir-beyit-bir-alem/:yol*');
  const kok = (vercel.redirects || []).find(r => r.source === '/bir-beyit-bir-alem/');
  assert.ok(kok && kok.destination === '/52beyit/', 'Basılı karekodun kendisi /bir-beyit-bir-alem/ → /52beyit/ yönlenmeli (:yol* boş yolu yakalamıyor).');
  assert.ok(yon && yon.destination === '/52beyit/:yol*', 'Eski basılı adres /bir-beyit-bir-alem/ → /52beyit/ yönlendirmesi vercel.json\'da olmalı.');
  assert.ok(read('aruz/index.html').includes('failatun.js'), 'Kitabın iç karekodu /aruz/ sayfasına gider; sayfa yerinde olmalı.');
}

// Printed in Pedagojik Masallar (seven film QR codes → raufenc.com/masal/1 … /masal/7). 2026-11-18:
// these pages are the book's QR targets; never move or delete them. The film behind a page may change
// (the redirect lives inside the page), the address may not.
export function verifyMasalPages(root = new URL('..', import.meta.url)) {
  const read = (file) => {
    try {
      return readFileSync(new URL(file, root), 'utf8');
    } catch {
      throw new Error(`Basılı Pedagojik Masallar karekod sayfası eksik: /${file.replace(/index\.html$/, '')}`);
    }
  };
  read('masal/index.html');
  for (let n = 1; n <= 7; n += 1) {
    const html = read(`masal/${n}/index.html`);
    assert.ok(html.includes(`data-kapi="${n}"`), `/masal/${n}/ sayfası ${n}. kapıyı açmalı.`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    verifyBookQr(JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')));
    console.log('NöroTerbiye: 3 basılı QR adresi ve son eğik çizgili karşılıkları korundu.');
    verifyIyilikPages();
    console.log('İyiliklerle Büyüyorum: /iyilik/ ve 3 basılı kitap adresi yerinde.');
    verifyBirBeyitPage();
    console.log('Şair Ne Demek İstedi?: /52beyit/ (dış karekod), /aruz/ (iç karekod) ve eski adres yönlendirmesi yerinde.');
    verifyMasalPages();
    console.log('Pedagojik Masallar: /masal/ ve 7 basılı karekod adresi yerinde.');
  } catch (error) {
    console.error(`Yayın durduruldu: ${error.message}`);
    process.exitCode = 1;
  }
}
