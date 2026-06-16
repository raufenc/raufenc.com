/* Dokuz Tip Mizaç Testi — Service Worker (offline + yüklenebilir PWA)
   Strateji: NETWORK-FIRST (çevrimiçiyken her zaman taze; deploy'lar anında ulaşır),
   çevrimdışında cache'e düşer. Cache adını her varlık değişikliğinde ARTIR. */
var CACHE = 'mizac-v2';
var ASSETS = [
  './', './index.html', './app.js', './data.js', './style.css',
  './manifest.webmanifest', './favicon.svg',
  '/lib/design-system/tokens.css', '/lib/design-system/animations.css', '/lib/design-system/theme.js',
  '/nav.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
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

  // Network-first: önce ağ (taze), başarısızsa cache (çevrimdışı)
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200 && res.type === 'basic') {
        var cl = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, cl); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (cached) {
        return cached || (req.mode === 'navigate' ? caches.match('./index.html') : undefined);
      });
    })
  );
});
