import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { verifyBookQr } from '../scripts/verify-book-qr.mjs';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

test('current site preserves the printed book links', () => {
  assert.doesNotThrow(() => verifyBookQr(config));
});

test('removing any printed address or its trailing slash variant blocks publishing', () => {
  for (let i = 0; i < 6; i++) {
    const changed = structuredClone(config);
    changed.redirects.splice(i, 1);
    assert.throws(() => verifyBookQr(changed));
  }
});

test('changing a destination, permanence or adding a request condition blocks publishing', () => {
  for (const change of [
    rule => { rule.destination = 'https://raufenc.com/'; },
    rule => { rule.permanent = false; },
    rule => { rule.has = [{ type: 'header', key: 'x-test', value: 'yes' }]; },
  ]) {
    for (let i = 0; i < 6; i++) {
      const changed = structuredClone(config);
      change(changed.redirects[i]);
      assert.throws(() => verifyBookQr(changed));
    }
  }
});

test('an earlier catch-all or duplicate book route blocks publishing', () => {
  const shadowed = structuredClone(config);
  shadowed.redirects.unshift({ source: '/(.*)', destination: '/', permanent: true });
  assert.throws(() => verifyBookQr(shadowed));
  const duplicated = structuredClone(config);
  duplicated.redirects.push({ ...duplicated.redirects[0], destination: '/' });
  assert.throws(() => verifyBookQr(duplicated));
});

test('removing the Vercel guard fails the repository check', () => {
  const changed = structuredClone(config);
  delete changed.buildCommand;
  assert.throws(() => verifyBookQr(changed));
});

test('unrelated redirects can still be added', () => {
  const changed = structuredClone(config);
  changed.redirects.push({ source: '/unrelated-old', destination: '/unrelated-new/', permanent: true });
  assert.doesNotThrow(() => verifyBookQr(changed));
});
