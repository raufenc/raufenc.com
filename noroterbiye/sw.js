const CACHE_NAME = 'noroterbiye-v7';
const STATIC_ASSETS = [
  '/noroterbiye/',
  '/noroterbiye/js/common.js',
  '/noroterbiye/js/test-engine.js',
  '/noroterbiye/css/noroterbiye.css',
  '/lib/design-system/tokens.css',
  '/lib/design-system/theme.js',
  '/nav.js',
  '/images/noroterbiye.webp',
  '/noroterbiye/data/sozluk.js',
  '/noroterbiye/data/kisa-bilgiler.js',
  '/noroterbiye/data/testler.js',
  '/noroterbiye/data/oyunlar.js',
  '/noroterbiye/data/araclar.js',
  '/noroterbiye/data/rol-modeller.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Network first, cache fallback
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
