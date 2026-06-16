/* Yol Haritan — Service Worker (çevrimdışı + güvenli güncelleme)
   Çekirdek (HTML/JS/CSS/data) AĞ-ÖNCELİKLİ (hep taze); fontlar/ikonlar stale-while-revalidate. */
const CACHE = "yol-haritan-v3";
const CORE = ["./", "./index.html", "./styles.css", "./app.js", "./data.js"];
const ASSETS = CORE.concat(["./favicon.svg", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./manifest.webmanifest"]);
const FONTS = [
  "PlusJakartaSans-400-latin", "PlusJakartaSans-400-latin-ext", "PlusJakartaSans-500-latin", "PlusJakartaSans-500-latin-ext",
  "PlusJakartaSans-700-latin", "PlusJakartaSans-700-latin-ext", "PlusJakartaSans-800-latin", "PlusJakartaSans-800-latin-ext",
  "Sora-700-latin", "Sora-700-latin-ext", "Sora-800-latin", "Sora-800-latin-ext"
].map(function (f) { return "./fonts/" + f + ".woff2"; });
const isCore = function (url) { return CORE.some(function (c) { return url.pathname.replace(/\/$/, "") === new URL(c, location).pathname.replace(/\/$/, ""); }) || /\/(app|data)\.js$|styles\.css$/.test(url.pathname); };

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(ASSETS).then(function () { return c.addAll(FONTS).catch(function () {}); });
    }).then(function () { return self.skipWaiting(); })
  );
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // HTML gezinme + çekirdek: AĞ ÖNCELİKLİ
  if (req.mode === "navigate" || isCore(url)) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); return res;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || (req.mode === "navigate" ? caches.match("./index.html") : undefined); });
      })
    );
    return;
  }
  // diğer varlıklar (font/ikon): stale-while-revalidate
  e.respondWith(caches.match(req).then(function (cached) {
    var net = fetch(req).then(function (res) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); return res; }).catch(function () { return cached; });
    return cached || net;
  }));
});
