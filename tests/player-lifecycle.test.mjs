// Run: node --experimental-vm-modules --test tests/player-lifecycle.test.mjs
// DOM/media doubles exercise ownership and remote navigation without a browser.
// Browser autoplay policy still requires a real Safari/Chrome smoke check.
import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = fs.readFileSync(new URL('../sunumlar/player.js', import.meta.url), 'utf8');
const flush = () => new Promise(resolve => setImmediate(resolve));

async function harness({ nativeHls = false, deferImport = false, deferPlay = false, rejectFirstPlay = false, blockPlayAttempts = 0 } = {}) {
  const nodes = [];
  const instances = [];
  let releaseImport;
  class Element extends EventTarget {
    constructor(tag) {
      super();
      this.tagName = tag.toUpperCase();
      this.children = [];
      this.style = {};
      this.dataset = {};
      this.attributes = {};
      this.classList = { add() {}, remove() {}, toggle() {} };
      this.currentTime = 0;
      this.duration = 90;
      this.paused = true;
      this.playCalls = 0;
      this.pauseCalls = 0;
      this.pendingPlays = [];
      nodes.push(this);
    }
    append(...children) { this.children.push(...children); children.forEach(node => { node.parent = this; }); }
    replaceChildren(...children) { this.children = []; this.append(...children); }
    setAttribute(key, value) { this.attributes[key] = value; }
    removeAttribute(key) { delete this.attributes[key]; if (key === 'src') this.src = ''; }
    getAttribute(key) { return this.attributes[key]; }
    focus() { document.activeElement = this; }
    remove() { if (this.parent) this.parent.children = this.parent.children.filter(node => node !== this); }
    getBoundingClientRect() { return { left: 0, top: 0, width: 100, height: 100 }; }
    getClientRects() { return [this.getBoundingClientRect()]; }
    querySelectorAll() { return []; }
    closest(selector) { return selector === 'button' && this.tagName === 'BUTTON' ? this : null; }
    contains(node) { return this === node || this.children.some(child => child.contains?.(node)); }
    matches() { return false; }
    canPlayType() { return nativeHls ? 'probably' : ''; }
    pause() { this.pauseCalls += 1; this.paused = true; this.dispatchEvent(new Event('pause')); }
    play() {
      this.playCalls += 1;
      if (this.playCalls <= blockPlayAttempts) {
        return Promise.reject(Object.assign(new Error('User activation required'), { name: 'NotAllowedError' }));
      }
      if (rejectFirstPlay && this.playCalls === 1) {
        return Promise.reject(Object.assign(new Error('Source not ready'), { name: 'AbortError' }));
      }
      this.paused = false;
      this.dispatchEvent(new Event('play'));
      const complete = () => { this.paused = false; this.dispatchEvent(new Event('playing')); };
      if (deferPlay) return new Promise(resolve => this.pendingPlays.push(() => { complete(); resolve(); }));
      complete();
      return Promise.resolve();
    }
    load() {}
    getContext() { return { clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {} }; }
  }
  const document = new EventTarget();
  document.body = new Element('body');
  document.head = new Element('head');
  document.createElement = tag => new Element(tag);
  document.querySelectorAll = () => [];
  document.activeElement = document.body;
  class Hls {
    static Events = { ERROR: 'error', MEDIA_ATTACHED: 'attached', MANIFEST_PARSED: 'manifest' };
    static isSupported() { return true; }
    constructor(config) { this.config = config; this.handlers = {}; instances.push(this); }
    on(event, callback) { this.handlers[event] = callback; }
    loadSource(src) { this.src = src; }
    attachMedia(media) { this.media = media; media.src = 'blob:hls'; this.handlers.attached?.(); }
    destroy() { this.destroyed = true; }
  }
  const context = vm.createContext({
    document, location: new URL('https://raufenc.com/sunumlar/'), URL, AbortController,
    EventTarget, ResizeObserver: class { observe() {} disconnect() {} }, devicePixelRatio: 1,
    setTimeout, clearTimeout, setInterval, clearInterval, console,
  });
  const hlsModule = new vm.SyntheticModule(['default'], function () {
    this.setExport('default', Hls);
  }, { context });
  await hlsModule.link(() => {});
  await hlsModule.evaluate();
  const gate = deferImport ? new Promise(resolve => { releaseImport = resolve; }) : Promise.resolve();
  const module = new vm.SourceTextModule(source, {
    context,
    initializeImportMeta(meta) { meta.url = 'https://raufenc.com/sunumlar/player.js'; },
    async importModuleDynamically(specifier) {
      assert.equal(specifier, './vendor/hls.js');
      await gate;
      return hlsModule;
    },
  });
  await module.link(() => {});
  await module.evaluate();
  return {
    open: module.namespace.openPlayer, nodes, instances, releaseImport,
    counter: () => nodes.find(node => node.className === 'sp-counter').textContent,
    videos: () => nodes.filter(node => node.tagName === 'VIDEO'),
    key(key, { repeat = false, target = document.activeElement } = {}) {
      const event = new Event('keydown', { cancelable: true });
      Object.defineProperties(event, {
        key: { value: key }, repeat: { value: repeat }, target: { value: target },
      });
      document.dispatchEvent(event);
      return event;
    },
  };
}

const image = { type: 'image', src: '/image.jpg' };
const movie = (src = '/clip.mp4') => ({
  type: 'video', src, poster: '/poster.jpg', start: 2, end: 8, autoplay: true, muted: false,
});
const project = (video = movie()) => ({ title: 'Remote test', slides: [image, video, image, image] });

test('remote entry starts audible MP4 immediately and forward stops it; repeats do not skip', async t => {
  const h = await harness();
  const player = await h.open(project());
  t.after(() => player.close());
  h.key('PageDown');
  const video = h.videos()[0];
  assert.equal(video.playCalls, 1);
  assert.equal(video.muted, false);
  assert.equal(video.autoplay, true);
  assert.equal(video.poster, 'https://raufenc.com/poster.jpg');
  assert.equal(h.counter(), '2 / 4');
  h.key('PageDown', { repeat: true, target: video });
  assert.equal(h.counter(), '2 / 4');
  h.key('ArrowRight', { target: video });
  assert.equal(h.counter(), '3 / 4');
  assert.equal(video.paused, true);
  assert.equal(video.src, '');
  h.key('PageUp');
  assert.equal(h.counter(), '2 / 4');
  h.key('ArrowLeft', { target: h.videos()[1] });
  assert.equal(h.counter(), '1 / 4');
});

test('new video slides autoplay by default when the field is absent', async t => {
  const h = await harness();
  const slide = movie();
  delete slide.autoplay;
  const player = await h.open(project(slide));
  t.after(() => player.close());
  h.key('PageDown');
  const video = h.videos()[0];
  assert.equal(video.autoplay, true);
  assert.equal(video.preload, 'auto');
  assert.equal(video.playCalls, 1);
  assert.equal(video.muted, false);
});

test('an explicit autoplay false keeps video paused through readiness events', async t => {
  const h = await harness();
  const player = await h.open(project({ ...movie(), autoplay: false }));
  t.after(() => player.close());
  h.key('PageDown');
  const video = h.videos()[0];
  video.dispatchEvent(new Event('loadedmetadata'));
  video.dispatchEvent(new Event('canplay'));
  await flush();
  assert.equal(video.autoplay, false);
  assert.equal(video.preload, 'metadata');
  assert.equal(video.playCalls, 0);
  assert.equal(video.paused, true);
  h.key('k');
  assert.equal(video.playCalls, 1);
});

test('Space and Enter advance even when a pointer-clicked button keeps focus', async t => {
  const h = await harness();
  const player = await h.open(project());
  t.after(() => player.close());
  const button = h.nodes.find(node => node.tagName === 'BUTTON');
  h.key(' ', { target: button });
  assert.equal(h.counter(), '2 / 4');
  h.key('Enter', { target: button });
  assert.equal(h.counter(), '3 / 4');
  h.key('Enter', { target: button, repeat: true });
  assert.equal(h.counter(), '3 / 4');
});

test('video completion remains on its slide and readiness events cannot restart it', async t => {
  const h = await harness();
  const player = await h.open(project());
  t.after(() => player.close());
  h.key('PageDown');
  const video = h.videos()[0];
  video.dispatchEvent(new Event('loadedmetadata'));
  assert.equal(video.currentTime, 2);
  video.currentTime = 8;
  video.dispatchEvent(new Event('timeupdate'));
  video.dispatchEvent(new Event('ended'));
  await flush();
  video.dispatchEvent(new Event('canplay'));
  assert.equal(h.counter(), '2 / 4');
  assert.equal(video.paused, true);
  assert.equal(video.autoplay, false);
  assert.equal(video.playCalls, 1);
});

test('a delayed play promise cannot revive a video after the next slide', async t => {
  const h = await harness({ deferPlay: true });
  const player = await h.open(project());
  t.after(() => player.close());
  h.key('PageDown');
  const previous = h.videos()[0];
  h.key('PageDown');
  previous.pendingPlays[0]();
  await flush();
  assert.equal(previous.paused, true);
  assert.equal(previous.autoplay, false);
  assert.equal(h.counter(), '3 / 4');
});

test('native HLS starts in the navigation gesture without importing hls.js', async t => {
  const h = await harness({ nativeHls: true });
  const player = await h.open(project(movie('/clip.m3u8')));
  t.after(() => player.close());
  h.key('PageDown');
  assert.equal(h.videos()[0].src, 'https://raufenc.com/clip.m3u8');
  assert.equal(h.videos()[0].playCalls, 1);
  assert.equal(h.instances.length, 0);
});

test('asynchronous HLS attachment autoplays and destroys the old stream on navigation', async t => {
  const h = await harness({ deferImport: true });
  const player = await h.open(project(movie('/clip.m3u8')));
  t.after(() => player.close());
  h.key('PageDown');
  assert.equal(h.videos()[0].playCalls, 0);
  h.releaseImport();
  await flush();
  const stream = h.instances[0];
  assert.equal(stream.config.enableWorker, false);
  assert.equal(stream.media.playCalls, 1);
  assert.equal(stream.media.muted, false);
  h.key('PageDown');
  assert.equal(stream.destroyed, true);
  assert.equal(stream.media.paused, true);
});

test('a readiness event retries interrupted startup but never a deliberately paused video', async t => {
  const h = await harness({ rejectFirstPlay: true });
  const player = await h.open(project());
  t.after(() => player.close());
  h.key('PageDown');
  const video = h.videos()[0];
  await flush();
  video.dispatchEvent(new Event('canplay'));
  await flush();
  assert.equal(video.playCalls, 2);
  assert.equal(video.paused, false);
  h.key('k');
  video.dispatchEvent(new Event('canplay'));
  assert.equal(video.paused, true);
  assert.equal(video.playCalls, 2);
});

test('after autoplay is blocked, remote forward retries this video before allowing a skip', async t => {
  const h = await harness({ blockPlayAttempts: 2 });
  const player = await h.open(project());
  t.after(() => player.close());
  h.key('PageDown');
  const video = h.videos()[0];
  await flush();
  const toast = h.nodes.find(node => node.className === 'sp-toast');
  assert.match(toast.textContent, /kumandanın ileri düğmesine bir kez daha basın/);
  h.key('PageDown');
  await flush();
  assert.equal(video.playCalls, 2);
  assert.equal(h.counter(), '2 / 4');
  assert.match(toast.textContent, /otomatik oynatma izni gerekebilir/);
  h.key('Enter');
  await flush();
  assert.equal(video.playCalls, 3);
  assert.equal(video.paused, false);
  assert.equal(h.counter(), '2 / 4');
  h.key('PageDown');
  assert.equal(h.counter(), '3 / 4');
  assert.equal(video.paused, true);
});

test('an HLS import completing after navigation does not attach or play the old slide', async t => {
  const h = await harness({ deferImport: true });
  const player = await h.open(project(movie('/clip.m3u8')));
  t.after(() => player.close());
  h.key('PageDown');
  h.key('PageDown');
  h.releaseImport();
  await flush();
  assert.equal(h.instances.length, 0);
  assert.equal(h.videos()[0].playCalls, 0);
  assert.equal(h.counter(), '3 / 4');
});

test('all Para Dediğin Şey videos request audible autoplay and retain their media/posters', () => {
  const presentation = JSON.parse(fs.readFileSync(new URL('../sunumlar/para-dedigin-sey/project.json', import.meta.url), 'utf8'));
  const videos = presentation.slides.filter(slide => slide.type === 'video');
  assert.equal(presentation.slides.length, 55);
  assert.equal(videos.length, 19);
  for (const slide of videos) {
    assert.equal(slide.autoplay, true, slide.id);
    assert.equal(slide.muted, false, slide.id);
    assert.ok(slide.src && slide.poster, slide.id);
    assert.doesNotMatch(slide.notes, /görsele tıklayın|videoya tıklayarak|videoyu oynatın|videoyu başlatın/i, slide.id);
  }
});
