// İyiliklerle Büyüyorum — çevrimdışı çalışma (kapsam: /iyilik/).
// Çekirdek dosyalar kurulumda alınır; sayfa resimleri, oyun ikonları ve sesler ihtiyaç anında, bir kez indirilip saklanır.
const V = 'iyilik-v5-5';
const CORE = `${V}-core`, RUN = `${V}-run`;
const CORE_FILES = ['./', '1/', '2/', '3/', 'css/app.css', 'js/app.js', 'js/audio.js', 'js/icons.js', 'js/paint.js', 'js/sfx.js', 'js/cele.js', 'js/galeri.js', 'js/store.js', 'js/oyun.js',
  'font/nunito-latin.woff2', 'font/nunito-latin-ext.woff2', 'manifest.webmanifest', 'assets/icon.svg', 'assets/icon-192.png',
  'assets/book1.webp', 'assets/book2.webp', 'assets/book3.webp', 'assets/qr-book1.png', 'assets/qr-book2.png', 'assets/qr-book3.png',
  'data/book1.json', 'data/book2.json', 'data/book3.json', 'ses/ui.json'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CORE);
    await c.addAll(CORE_FILES);
    try { // tuş takımı sesleri çevrimdışı da çalışsın (en iyi çaba)
      const ui = await (await fetch('ses/ui.json')).json();
      const run = await caches.open(RUN);
      const keys = Object.keys(ui).filter(k => /^(r\d|sayfa\d+|hos|tuslar|kitap\d|sayfa-yok|sayfa-konusuz|dogru|tekrar|damga|bitti|esles2|sec|dinlesec|hafiza|sirala2)$/.test(k));
      await Promise.allSettled(keys.map(k => run.add(`ses/${ui[k].f}`)));
    } catch {}
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('iyilik-') && !k.startsWith(V)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const timeout = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error('zaman aşımı')), ms))]);
async function networkFirst(req, cacheName, ms = 4000) {
  const c = await caches.open(cacheName);
  try {
    const res = await timeout(fetch(req), ms);
    if (res.ok) c.put(req, res.clone());
    return res;
  } catch {
    return (await c.match(req, { ignoreSearch: true })) || (await caches.match(req, { ignoreSearch: true })) || Response.error();
  }
}
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(RUN)).put(req, res.clone());
  return res;
}
async function swr(req) {
  const c = await caches.open(RUN);
  const hit = await c.match(req);
  const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
  return hit || net;
}
async function audio(req) { // Safari/Chrome ses için Range ister; önbellekten parça döndür
  const c = await caches.open(RUN);
  let res = await caches.match(req.url);
  if (!res) {
    const net = await fetch(req.url);
    if (!net.ok) return net;
    c.put(req.url, net.clone()); res = net;
  }
  const range = req.headers.get('range');
  if (!range) return res;
  const buf = await res.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
  const s = +m[1] || 0, e = Math.min(m[2] ? +m[2] : buf.byteLength - 1, buf.byteLength - 1);
  return new Response(buf.slice(s, e + 1), { status: 206, headers: { 'Content-Type': 'audio/mpeg', 'Content-Range': `bytes ${s}-${e}/${buf.byteLength}`, 'Content-Length': String(e - s + 1), 'Accept-Ranges': 'bytes' } });
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || !url.pathname.startsWith('/iyilik/')) return;
  const path = url.pathname.slice('/iyilik/'.length);
  if (req.mode === 'navigate') return e.respondWith(networkFirst(req, CORE).then(r => r.type === 'error' ? caches.match('./') : r));
  if (path.endsWith('.mp3')) return e.respondWith(audio(req));
  if (/^(js|css)\//.test(path) || path === 'manifest.webmanifest') return e.respondWith(networkFirst(req, CORE));
  if (/^data\//.test(path) || /^ses\/[^/]+\.json$/.test(path)) return e.respondWith(swr(req));
  if (/^(sayfa|font|assets|ikon)\//.test(path)) return e.respondWith(cacheFirst(req));
});
