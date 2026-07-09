/* ============================================================
   Bak Bak — service worker.
   HTML/JS: network-first (içerik güncel kalsın). Görsel: cache-first.
   Hata verse bile oyunun online çalışması etkilenmez.
   ============================================================ */
"use strict";
var CACHE_ADI = "bak-bak-v2";
var CACHE_DOSYALARI = [
  "./", "index.html",
  "lib/tokens.css", "lib/scorm.js",
  "motor/ses.js", "motor/kayit.js", "motor/oyun.js",
  "icerik/islami-simgeler.js", "icerik/hizli-hafiz.js",
  "manifest.webmanifest"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE_ADI).then(function (cache) {
    return Promise.all(CACHE_DOSYALARI.map(function (u) { return cache.add(u).catch(function () {}); }));
  }).catch(function () {}));
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE_ADI; }).map(function (k) { return caches.delete(k); }));
  }).catch(function () {}));
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var yol = new URL(event.request.url).pathname;
  var guncel = yol.endsWith(".html") || yol.endsWith(".js") || yol.endsWith("/") || yol.endsWith(".webmanifest");
  if (guncel) {
    event.respondWith(fetch(event.request).then(function (r) {
      try { var k = r.clone(); caches.open(CACHE_ADI).then(function (c) { c.put(event.request, k); }).catch(function () {}); } catch (e) {}
      return r;
    }).catch(function () { return caches.match(event.request); }));
    return;
  }
  event.respondWith(caches.match(event.request).then(function (r) {
    return r || fetch(event.request).catch(function () { return r; });
  }));
});
