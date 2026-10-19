/* Kocaeli MEM AR-GE Portalı — service worker: çevrim dışı kabuk + FCM arka plan bildirimleri */
const VERSION = 'arge-v1.2.0';
const BASE = '/kocaeli-arge/';
const SHELL = [BASE, BASE + 'index.html', BASE + 'css/app.css', BASE + 'manifest.webmanifest', BASE + 'data/seed.json',
  ...['app', 'backend', 'components', 'config', 'feeds', 'intro', 'router', 'ui', 'views/home', 'views/tv', 'views/arge', 'views/misc', 'views/akis'].map(f => `${BASE}js/${f}.js`)];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k.startsWith('arge-')).map(k => caches.delete(k)))).then(() => self.clients.claim())); });

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== location.origin) {
    if (/fonts\.(googleapis|gstatic)\.com|i\.ytimg\.com|cdnjs\.cloudflare\.com/.test(url.host)) e.respondWith(cacheFirst(e.request));
    return;
  }
  if (url.pathname.startsWith('/api/')) return; // ağ; istemci kendi önbelleğini tutar
  if (!url.pathname.startsWith(BASE)) return;
  e.respondWith(networkFirst(e.request));
});
async function networkFirst(req) {
  const c = await caches.open(VERSION);
  try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }
  catch (_) { return (await c.match(req, { ignoreSearch: true })) || (req.mode === 'navigate' ? c.match(BASE) : Response.error()); }
}
async function cacheFirst(req) {
  const c = await caches.open(VERSION + '-static');
  const hit = await c.match(req); if (hit) return hit;
  try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; } catch (_) { return Response.error(); }
}

// ── Push (FCM) — yalnız canlı modda; kayıt URL'sinde ?cfg= ile yapılandırma gelir ──
try {
  const cfg = new URL(self.location.href).searchParams.get('cfg');
  if (cfg) {
    importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');
    firebase.initializeApp(JSON.parse(cfg));
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((p) => {
      const n = p.notification || {};
      self.registration.showNotification(n.title || 'Kocaeli MEM AR-GE', { body: n.body || '', icon: BASE + 'assets/icon-192.png', badge: BASE + 'assets/badge-72.png', data: { url: p.data?.url || BASE }, lang: 'tr' });
    });
  }
} catch (_) {}
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || BASE;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => { for (const c of list) { if (c.url.includes(BASE) && 'focus' in c) { c.navigate(url); return c.focus(); } } return self.clients.openWindow(url); }));
});
