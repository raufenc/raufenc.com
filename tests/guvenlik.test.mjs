import test from 'node:test';
import assert from 'node:assert/strict';
import { kokenIzinli, esit, corsKokeni, istekKokeni, govdeOku } from '../lib/guvenlik.js';

const IZINLI = ['https://raufenc.com', 'https://www.raufenc.com'];

test('kokenIzinli: izinli kökenler geçer', () => {
  assert.equal(kokenIzinli('https://raufenc.com', IZINLI), true);
  assert.equal(kokenIzinli('https://www.raufenc.com', IZINLI), true);
  // Referer: yol ve sorgu atılır, köken eşleşir
  assert.equal(kokenIzinli('https://raufenc.com/mizac/?a=1', IZINLI), true);
  assert.equal(kokenIzinli('http://localhost:8084', IZINLI), true);
  assert.equal(kokenIzinli('http://127.0.0.1:3000/x', IZINLI), true);
  // Önizleme: isteğin kendi host'u
  assert.equal(kokenIzinli('https://raufenc-abc123.vercel.app', IZINLI, { sunucu: 'raufenc-abc123.vercel.app' }), true);
});

test('kokenIzinli: önek/benzer kökenler geçmez', () => {
  for (const kotu of [
    'https://raufenc.com.evil.example',
    'https://raufenc.com.evil.example/yol',
    'https://raufenc.comevil.example',
    'https://evil.example/https://raufenc.com',
    'https://evilraufenc.com',
    'http://raufenc.com',
    'https://raufenc.com:8443',
    'https://user:pw@raufenc.com',
    'https://saldirgan.vercel.app',
    'null', '', 'raufenc.com', 'javascript:alert(1)',
    'http://localhost.evil.example',
  ]) assert.equal(kokenIzinli(kotu, IZINLI, { sunucu: 'raufenc.com' }), false, kotu);
  assert.equal(kokenIzinli('http://localhost:8084', IZINLI, { yerel: false }), false);
  // Aynı host ama http (canlı) → geçmez
  assert.equal(kokenIzinli('http://onizleme.vercel.app', [], { sunucu: 'onizleme.vercel.app' }), false);
  assert.equal(kokenIzinli('https://baska.vercel.app', [], { sunucu: 'onizleme.vercel.app' }), false);
});

test('istekKokeni: Origin yoksa ya da "null" ise Referer', () => {
  const r = (h) => ({ headers: new Headers(h) });
  assert.equal(istekKokeni(r({ origin: 'https://a.com', referer: 'https://b.com/x' })), 'https://a.com');
  assert.equal(istekKokeni(r({ origin: 'null', referer: 'https://b.com/x' })), 'https://b.com/x');
  assert.equal(istekKokeni(r({})), '');
});

test('corsKokeni', () => {
  assert.equal(corsKokeni('https://raufenc.com', true), 'https://raufenc.com');
  assert.equal(corsKokeni('https://evil.example', false), '');
  assert.equal(corsKokeni('https://raufenc.com', o => IZINLI.includes(o)), 'https://raufenc.com');
  assert.equal(corsKokeni('', true), '');
});

test('esit: sabit zamanlı karşılaştırma doğru sonuç verir', async () => {
  assert.equal(await esit('parola-123', 'parola-123'), true);
  assert.equal(await esit('parola-123', 'parola-124'), false);
  assert.equal(await esit('kisa', 'kisa-degil-uzun'), false);
  assert.equal(await esit('', 'x'), false);
  assert.equal(await esit('ğüşİ', 'ğüşİ'), true);
});

test('govdeOku: sınırı aşan gövde reddedilir', async () => {
  const istek = (govde) => new Request('https://x.test/', { method: 'POST', body: govde });
  assert.equal(await govdeOku(istek('{"a":1}'), 100), '{"a":1}');
  await assert.rejects(govdeOku(istek('x'.repeat(101)), 100), /too_large/);
});
