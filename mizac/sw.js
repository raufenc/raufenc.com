/* Dokuz Tip Mizaç Testi — Service Worker (offline + yüklenebilir PWA) */
var CACHE = 'mizac-v1';
var ASSETS = [
  './', './index.html', './app.js', './data.js', './style.css',
  './manifest.webmanifest', './favicon.svg',
  '/lib/design-system/tokens.css', '/lib/design-system/animations.css', '/lib/design-system/theme.js',
  '/nav.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // tek tek ekle: biri 404 olsa bile kurulum bozulmasın
      return Promise.all(ASSETS.map(function (u) { return c.add(u).catch(function () {}); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;       // dış kaynaklar (fontlar) tarayıcıya
  if (url.pathname.indexOf('/api/') === 0) return;        // serverless'ı asla cache'leme

  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  e.respondWith(
    caches.match(req).then(function (cached) {
      var net = fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var cl = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, cl); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || net;
    })
  );
});
