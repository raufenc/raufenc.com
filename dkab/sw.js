// ===== DKAB Akademi - Service Worker (Offline Destek) =====
// Cache-first for static assets and data, network-first for Firebase

const CACHE_NAME = 'dkab-v14';
const DATA_CACHE = 'dkab-data-v12';

// Static assets to precache
const PRECACHE_URLS = [
    '/dkab/app.html',
    '/dkab/css/main.css',
    '/dkab/css/components.css',
    '/dkab/css/animations.css',
    '/dkab/js/app.js',
    '/dkab/js/store.js',
    '/dkab/js/adaptive.js',
    '/dkab/js/messages.js',
    '/dkab/js/data-loader.js',
    '/dkab/js/components/header.js',
    '/dkab/js/components/sidebar.js',
    '/dkab/js/components/home.js',
    '/dkab/js/components/class-selector.js',
    '/dkab/js/components/unit-list.js',
    '/dkab/js/components/chapter-view.js',
    '/dkab/js/components/glossary.js',
    '/dkab/js/components/progress-dashboard.js',
    '/dkab/js/components/effects.js',
    '/dkab/js/components/learning-path.js',
    '/dkab/js/components/assessment.js',
    '/dkab/js/components/goals.js',
    '/dkab/js/components/habits.js',
    '/dkab/js/engines/engine-utils.js',
    '/dkab/js/engines/game-shell.js',
    '/dkab/js/engines/canvas-core.js',
    '/dkab/js/engines/sound-fx.js',
    '/dkab/js/engines/difficulty.js',
    '/dkab/js/engines/sprite-renderer.js',
    '/dkab/js/engines/e25-kelime-tahmin.js',
    '/dkab/js/engines/e26-sifre-cozucu.js',
    '/dkab/js/engines/e27-uzay-nisancisi.js',
    '/dkab/js/engines/e28-balon-patlatma.js',
    '/dkab/js/engines/e29-yaris.js',
    '/dkab/js/engines/e30-halat-cekme.js',
    '/dkab/js/engines/e31-yakalayici.js',
    '/dkab/js/engines/e32-bilgi-yarismasi.js',
    '/dkab/js/engines/e33-bilgi-carki.js',
    '/dkab/js/engines/e34-surukle-sinifla.js',
    '/dkab/js/engines/e35-surpriz-kutu.js',
    '/dkab/js/engines/e36-kelime-avi.js',
];

// Install: precache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .catch(() => { /* continue even if some fail */ })
    );
    self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(k => k !== CACHE_NAME && k !== DATA_CACHE)
                    .map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// Fetch strategy
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Skip non-GET and cross-origin (Firebase, Google Fonts API calls)
    if (event.request.method !== 'GET') return;

    // Network-first for Firebase RTDB
    if (url.hostname.includes('firebaseio.com') || url.hostname.includes('firebase')) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    // Cache-first for JSON data files
    if (url.pathname.includes('/data/') && url.pathname.endsWith('.json')) {
        event.respondWith(cacheFirst(event.request, DATA_CACHE));
        return;
    }

    // Cache-first for Google Fonts CSS (already loaded via link tag)
    if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
        event.respondWith(cacheFirst(event.request, CACHE_NAME));
        return;
    }

    // Cache-first for same-origin JS/CSS/HTML
    if (url.origin === self.location.origin) {
        event.respondWith(cacheFirst(event.request, CACHE_NAME));
        return;
    }
});

async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    // Strip query params (?v=6) when checking cache
    const cacheKey = new URL(request.url);
    cacheKey.search = '';
    const cached = await cache.match(cacheKey.toString()) || await cache.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        // Return offline fallback for HTML pages
        if (request.headers.get('Accept')?.includes('text/html')) {
            const fallback = await cache.match('/dkab/app.html');
            if (fallback) return fallback;
        }
        return new Response('{"offline":true}', {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(DATA_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cache = await caches.open(DATA_CACHE);
        const cached = await cache.match(request);
        return cached || new Response('{"offline":true}', {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
