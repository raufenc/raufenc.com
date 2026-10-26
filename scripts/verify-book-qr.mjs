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

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    verifyBookQr(JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')));
    console.log('NöroTerbiye: 3 basılı QR adresi ve son eğik çizgili karşılıkları korundu.');
  } catch (error) {
    console.error(`Yayın durduruldu: ${error.message}`);
    process.exitCode = 1;
  }
}
