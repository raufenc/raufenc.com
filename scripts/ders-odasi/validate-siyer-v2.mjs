#!/usr/bin/env node
/**
 * Real Ders Odası DOM integration test (jsdom; NOT a browser/visual/audio test).
 * Run from repository root:
 *   npm install --prefix "$RUNNER_TEMP/siyer-dom" --no-save jsdom@26
 *   SIYER_NODE_MODULES="$RUNNER_TEMP/siyer-dom" node scripts/ders-odasi/validate-siyer-v2.mjs
 * No product logic is mocked. Only media playback and viewport geometry,
 * which jsdom cannot implement, are supplied. Firebase/LRS are not connected.
 */
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(process.env.SIYER_NODE_MODULES
  ? resolve(process.env.SIYER_NODE_MODULES, 'package.json') : import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const read = p => readFileSync(resolve(root, p), 'utf8');
const wait = ms => new Promise(done => setTimeout(done, ms));
const ids = Array.from({ length: 60 }, (_, i) => 'siyer-' + String(i + 1).padStart(2, '0'));
const html = read('ders-odasi/ders.html');
const scriptPaths = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)]
  .map(m => m[1]).filter(p => p.startsWith('motor/'));
for (const name of ['cekirdek.js','kayit.js','canli.js','oynatici.js','bloklar-temel.js','bloklar-oyun.js','bloklar-eglence.js']) {
  assert(scriptPaths.includes('motor/' + name), 'Native engine missing from ders.html: ' + name);
}
const sources = scriptPaths.map(p => [p, read('ders-odasi/' + p)]);
const manifest = JSON.parse(read('ders-odasi/siyer/content-v2.json'));
const entries = Array.isArray(manifest) ? manifest : (manifest.lessons || manifest.dersler);
assert(Array.isArray(entries), 'content-v2.json must contain an array or lessons/dersler array');
assert.equal(entries.length, 60, 'Exactly 60 content lessons required');
assert.deepEqual(entries.map(x => typeof x.id === 'number' ? 'siyer-' + String(x.id).padStart(2, '0') : x.id).sort(), ids, 'Content IDs must be siyer-01 through siyer-60');


// The curriculum hub must open the existing native player, not a second shallow player.
{
 const hubErrors=[],vc=new VirtualConsole();
 vc.on('error',(...a)=>hubErrors.push(a.map(String).join(' ')));
 vc.on('jsdomError',e=>hubErrors.push(e.message));
 const h=new JSDOM(read('ders-odasi/siyer/index.html'),{url:'https://raufenc.com/ders-odasi/siyer/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
 const w=h.window;
 w.HTMLElement.prototype.scrollIntoView=function(){};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
 w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
 w.eval(read('ders-odasi/siyer/content-v2.js'));
 w.eval(read('ders-odasi/siyer/hub-v2.js'));
 await wait(50);
 assert.equal(w.document.querySelectorAll('.lesson-card').length,60,'Hub must show all 60 lessons');
 assert.equal(w.document.querySelectorAll('.module-section').length,10,'Hub must show ten units');
 w.document.querySelector('[data-lesson="1"]').click();
 assert.equal(new URL(w.document.querySelector('#frame-host iframe').src).searchParams.get('d'),'siyer-01','Hub must launch full native course');
 assert.equal(w.document.querySelector('#lesson-dialog').open,true,'Lesson dialog must open');
 assert.equal(hubErrors.length,0,'Hub errors: '+hubErrors.join('\n'));
 h.window.close();
 console.log('PASS curriculum hub: 60 lessons, 10 units, native lesson launch');
}

const results = { scope: 'DOM integration (not browser rendering, audio decoding, or live transport QA)',
  lessons: 0, blocks: 0, slides: 0, svg: 0, mp3: 0, interactions: [], errors: [] };
const covered = new Set();
const wanted = new Set(['anket', 'coktan', 'dusun', 'sirala', 'siniflandir', 'eslestir', 'hikaye']);
const present = new Set();
const by = (host, selector, context) => {
  const el = host.querySelector(selector);
  assert(el, context + ': missing ' + selector);
  return el;
};
const itemBy = (host, selector, attr, value, context) => {
  const el = [...host.querySelectorAll(selector)].find(x => String(x.getAttribute(attr)) === String(value));
  assert(el, context + ': missing ' + selector + ' ' + attr + '=' + value);
  return el;
};
const answered = DO => DO.Kayit.ifadeler.filter(s => s.verb.id.endsWith('/answered'));

function localAsset(id, relative) {
  assert.equal(typeof relative, 'string', id + ': missing media path');
  assert(!/^(?:https?:|data:|\/\/)/i.test(relative), id + ': local media required: ' + relative);
  const base = resolve(root, 'ders-odasi/dersler', id);
  const path = resolve(base, relative.split(/[?#]/)[0]);
  assert(path.startsWith(base + sep), id + ': media escapes lesson directory');
  assert(statSync(path).isFile(), id + ': missing media ' + relative);
  return path;
}

async function exercise(w, DO, O, b, label) {
  const host = O.dom.icerik;
  const before = answered(DO).length;
  const required = b.zorunlu == null ? DO.Bloklar[b.tur].zorunlu : b.zorunlu;
  if (required && O.i < O.sira.length - 1 && !O.durum[b.id]?.tamam) {
    const index = O.i;
    O.ileri();
    assert.equal(O.i, index, label + ': incomplete activity must prevent Next');
  }
  let expectedScore;
  if (b.tur === 'anket') {
    by(host, '.anket-secenek button', label).click();
    assert(by(host, '.anket-secenek', label).classList.contains('oylandi'), label + ': vote not marked');
    assert(host.querySelectorAll('.anket-cubuk').length === b.secenekler.length, label + ': result bars missing');
  } else if (b.tur === 'dusun') {
    const save = by(host, '.dusun-form button.dug.ana', label);
    save.click();
    assert(!O.durum[b.id]?.tamam, label + ': empty reflection must not complete');
    const textarea = host.querySelector('textarea');
    if (textarea) {
      textarea.value = 'DOM denemesi: öğrendiğim bilgiyi kaynak ve gerekçesiyle açıklarım.';
      textarea.dispatchEvent(new w.Event('input', { bubbles: true }));
    } else by(host, '.cip', label).click();
    save.click();
    assert(by(host, '.dusun-ozet', label).textContent.trim(), label + ': saved response missing');
  } else if (b.tur === 'coktan') {
    for (let n = 0; n < b.sorular.length; n++) {
      const q = b.sorular[n];
      const choice = n === 0 ? (q.dogru + 1) % q.secenekler.length : q.dogru;
      itemBy(host, '.secenek', 'data-i', choice, label).click();
      assert(host.querySelector(n === 0 ? '.secenek.yanlis' : '.secenek.dogru'), label + ': answer feedback missing');
      if (q.aciklama) assert(host.textContent.includes(q.aciklama), label + ': explanation missing');
      const after = answered(DO).length;
      itemBy(host, '.secenek', 'data-i', choice, label).click();
      assert.equal(answered(DO).length, after, label + ': duplicate answer recorded');
      by(host, 'button.devam', label).click();
    }
    expectedScore = Math.max(0, b.sorular.length - 1) * 10;
  } else if (b.tur === 'sirala') {
    assert(b.adimlar.length > 1, label + ': needs at least two sequence items');
    itemBy(host, '.sr-kart', 'data-id', b.adimlar[1].id, label).click();
    assert(!O.durum[b.id]?.tamam, label + ': wrong order must not complete');
    assert(host.querySelector('.sr-kart.salla'), label + ': wrong-order feedback missing');
    for (const step of b.adimlar) itemBy(host, '.sr-kart', 'data-id', step.id, label).click();
    await wait(1450);
    expectedScore = (b.adimlar.length - 1) * 10;
  } else if (b.tur === 'siniflandir') {
    const first = b.kartlar[0];
    const wrong = b.alanlar.find(a => a.id !== first.alan);
    assert(wrong, label + ': requires two classification groups');
    const select = c => itemBy(host, '.sinif-kart', 'data-id', c.id, label)
      .dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    select(first);
    itemBy(host, '.sinif-alan', 'data-alan', wrong.id, label).click();
    assert(!itemBy(host, '.sinif-kart', 'data-id', first.id, label).classList.contains('yerlesti'),
      label + ': wrong group accepted');
    for (const card of b.kartlar) {
      select(card);
      itemBy(host, '.sinif-alan', 'data-alan', card.alan, label).click();
    }
    await wait(1050);
    expectedScore = (b.kartlar.length - 1) * 10;
  } else if (b.tur === 'eslestir') {
    const findPair = (side, text) => {
      const button = [...host.querySelectorAll('.esle-sutun.' + side + ' button')].find(x => x.textContent === text);
      assert(button, label + ': matching button missing: ' + text);
      return button;
    };
    assert(b.ciftler.length > 1, label + ': requires two matching pairs');
    findPair('sol', b.ciftler[0].sol).click();
    findPair('sag', b.ciftler[1].sag).click();
    assert(!findPair('sol', b.ciftler[0].sol).classList.contains('bitti'), label + ': wrong pair accepted');
    for (const pair of b.ciftler) {
      findPair('sol', pair.sol).click();
      findPair('sag', pair.sag).click();
    }
    await wait(1050);
    expectedScore = (b.ciftler.length - 1) * 10;
  } else if (b.tur === 'hikaye') {
    let wrongTried = false, maximum = 0;
    for (const scene of b.sahneler) {
      host.querySelector('.hy-metin')?.click(); // finish native typewriter for the test
      if (scene.secenekler) {
        maximum += 10;
        const correct = scene.secenekler.findIndex(x => x.iyi);
        assert(correct >= 0, label + ': decision has no correct choice');
        const wrong = scene.secenekler.findIndex(x => !x.iyi);
        if (!wrongTried && wrong >= 0) {
          itemBy(host, '.hy-secenekler button', 'data-i', wrong, label).click();
          assert(by(host, '.hy-sonuc.dur span', label).textContent.trim(), label + ': wrong decision explanation missing');
          wrongTried = true;
        }
        itemBy(host, '.hy-secenekler button', 'data-i', correct, label).click();
        assert(by(host, '.hy-sonuc.iyi span', label).textContent.trim(), label + ': correct decision explanation missing');
      }
      const next = [...host.querySelectorAll('.hy-panel > button')].find(x => !x.disabled);
      assert(next, label + ': decision continuation missing');
      next.click();
    }
    expectedScore = maximum - (wrongTried ? 10 : 0);
  }
  assert(O.durum[b.id]?.tamam, label + ': activity did not complete');
  if (expectedScore !== undefined) assert.equal(O.durum[b.id].puan, expectedScore, label + ': score incorrect');
  assert(answered(DO).length > before, label + ': no xAPI answer recorded');
  const persisted = JSON.parse(w.localStorage.getItem('do:ifade:' + DO.Kayit.oturum) || '[]');
  assert(persisted.some(x => x.verb.id.endsWith('/answered')), label + ': no local answer persisted');
  if (O.i < O.sira.length - 1) {
    const index = O.i;
    O.ileri();
    assert.equal(O.i, index + 1, label + ': completed activity must allow Next');
  }
}

for (const id of ids) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', err => errors.push('jsdom: ' + (err.stack || err.message)));
  virtualConsole.on('error', (...args) => errors.push('console.error: ' + args.map(String).join(' ')));
  virtualConsole.on('warn', (...args) => errors.push('console.warn: ' + args.map(String).join(' ')));
  const dom = new JSDOM('<!doctype html><html lang="tr"><head></head><body></body></html>', {
    url: 'https://raufenc.com/ders-odasi/ders.html?d=' + id + '&rol=bireysel',
    runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole
  });
  const w = dom.window;
  w.addEventListener('error', e => errors.push('window.error: ' + (e.error?.stack || e.message)));
  w.addEventListener('unhandledrejection', e => errors.push('unhandled rejection: ' + e.reason));
  try {
    // No layout engine / media decoder is present in jsdom. These are only capability stubs.
    Object.defineProperty(w.HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 1600 });
    Object.defineProperty(w.HTMLElement.prototype, 'clientHeight', { configurable: true, get: () => 900 });
    w.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); };
    w.HTMLMediaElement.prototype.pause = function () {};
    w.HTMLMediaElement.prototype.load = function () {};
    w.DO_AYAR = { firebase: null };
    w.localStorage.setItem('do:ayar', JSON.stringify({ anlatim: false, altyazi: true }));
    for (const [path, code] of sources) w.eval(code + '\n//# sourceURL=' + path);
    const DO = w.DO;
    DO.sesAcik = false;
    Object.defineProperty(w.document, 'currentScript', {configurable:true, value:{src:'https://raufenc.com/ders-odasi/dersler/'+id+'/ders.js'}});
    w.eval(read('ders-odasi/dersler/' + id + '/ders.js') + '\n//# sourceURL=' + id + '/ders.js');
    assert.equal(DO._ders?.id, id, id + ': DO.dersKaydet did not register lesson');
    DO._ders._kok = 'dersler/' + id + '/';
    const O = DO.Oynatici;
    O.baslat();
    by(w.document, '.ad-girdi', id).value = 'DOM Deneme';
    const enter = [...w.document.querySelectorAll('.giris-dugmeler button')]
      .find(b => /^(Derse başla|Baştan başla)$/.test(b.textContent.trim()));
    assert(enter, id + ': native entry button missing');
    enter.click();
    assert.equal(O.i, 0, id + ': entry must open first block');
    assert.equal(O.ogrenci.ad, 'DOM Deneme', id + ': learner name missing');
    assert(O.sira.length >= 9, id + ': unexpectedly short lesson');
    assert.equal(new Set(O.sira.map(b => b.id)).size, O.sira.length, id + ': duplicate block IDs');
    const slides = O.sira.filter(b => b.tur === 'slayt');
    assert.equal(slides.length, 4, id + ': exactly four narrative slides required');
    assert.equal(new Set(slides.map(b => b.gorsel)).size, 4, id + ': distinct illustrations required');
    assert.equal(new Set(slides.map(b => b.ses)).size, 4, id + ': distinct narration files required');
    for (const slide of slides) {
      const image = localAsset(id, slide.gorsel);
      assert(/\.svg$/i.test(image), id + ': SVG slide required');
      const svg = new w.DOMParser().parseFromString(readFileSync(image, 'utf8'), 'image/svg+xml');
      assert(!svg.querySelector('parsererror') && svg.documentElement.localName === 'svg', id + ': invalid SVG');
      const audio = localAsset(id, slide.ses);
      assert(/\.mp3$/i.test(audio) && statSync(audio).size > 1000, id + ': missing/empty MP3');
      results.svg++; results.mp3++;
    }
    for (let i = 0; i < O.sira.length; i++) {
      const b = O.sira[i], label = id + '/' + b.id + '(' + b.tur + ')';
      present.add(b.tur);
      assert(DO.Bloklar[b.tur]?.ciz, label + ': unregistered native block');
      O.git(i);
      assert.equal(O.i, i, label + ': navigation did not select requested block');
      const host = O.dom.icerik;
      assert(host.childElementCount > 0 && !host.querySelector('.eksik'), label + ': empty or unsupported render');
      assert(host.textContent.trim() || host.querySelector('img,svg,video,canvas'), label + ': render has no content');
      assert(!/\b(?:undefined|NaN)\b/.test(host.textContent), label + ': undefined/NaN visible to learner');
      if (b.tur === 'slayt') {
        const img = by(host, 'img.slayt-gorsel', label);
        assert(img.getAttribute('src').endsWith(b.gorsel), label + ': wrong slide path');
        assert.equal(O.dom.altyazi.textContent, b.metin, label + ': full narration subtitle missing');
        assert(host.querySelector('.slayt-tekrar'), label + ': narration replay control missing');
        results.slides++;
      }
      if (wanted.has(b.tur) && !covered.has(b.tur)) {
        await exercise(w, DO, O, b, label);
        covered.add(b.tur);
        results.interactions.push(label);
      }
      assert.equal(errors.length, 0, label + ' emitted errors:\n' + errors.join('\n'));
      results.blocks++;
    }
    await wait(20); // flush promises and immediate callbacks before disposing the lesson
    assert.equal(errors.length, 0, id + ' emitted errors:\n' + errors.join('\n'));
    results.lessons++;
    console.log('PASS ' + id + ' (' + O.sira.length + ' blocks, 4 SVG, 4 MP3)');
  } catch (error) {
    results.errors.push(id + ': ' + (error.stack || error.message));
  } finally { dom.window.close(); }
}
for (const type of wanted) {
  if (present.has(type) && !covered.has(type)) results.errors.push('No completed interaction test for native type ' + type);
}
assert.equal(results.lessons, 60, 'Not all 60 lessons passed:\n' + results.errors.join('\n\n'));
assert.equal(results.slides, 240, 'Expected 240 rendered slides');
assert.equal(results.mp3, 240, 'Expected 240 local narration files');
console.log(JSON.stringify(results, null, 2));
assert.equal(results.errors.length, 0, 'DOM integration failures');
