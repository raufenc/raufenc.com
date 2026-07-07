/* ============================================================
   Kâşif Motoru — service worker
   HTML/JS: network-first (içerik güncel kalsın). Görsel/ses/atlas: cache-first.
   Hata verse bile oyunun online çalışması etkilenmez.
   ============================================================ */
"use strict";

var CACHE_ADI = "kasif-motoru-v2";
var CACHE_DOSYALARI = [
  "./",
  "index.html",
  "lib/scorm.js",
  "lib/tokens.css",
  "motor/loop.js",
  "motor/physics.js",
  "motor/input.js",
  "motor/audio.js",
  "motor/oyuncu.js",
  "motor/kayit.js",
  "motor/sahne.js",
  "motor/mekanikler/dogru-gecit.js",
  "motor/mekanikler/kelime-kopru.js",
  "motor/mekanikler/isik-kapisi.js",
  "icerik/arapca-carsi.js",
  "manifest.webmanifest"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_ADI).then(function (cache) {
      return Promise.all(CACHE_DOSYALARI.map(function (url) {
        return cache.add(url).catch(function () {});
      }));
    }).catch(function () {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (anahtarlar) {
      return Promise.all(anahtarlar.filter(function (k) { return k !== CACHE_ADI; })
        .map(function (k) { return caches.delete(k); }));
    }).catch(function () {})
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var yol = new URL(event.request.url).pathname;
  var guncelKalmali = yol.endsWith(".html") || yol.endsWith(".js") || yol.endsWith("/") || yol.endsWith(".webmanifest");

  if (guncelKalmali) {
    event.respondWith(
      fetch(event.request).then(function (agYaniti) {
        try {
          var kopya = agYaniti.clone();
          caches.open(CACHE_ADI).then(function (cache) { cache.put(event.request, kopya); }).catch(function () {});
        } catch (e) {}
        return agYaniti;
      }).catch(function () { return caches.match(event.request); })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (yanit) {
      if (yanit) return yanit;
      return fetch(event.request).catch(function () { return yanit; });
    })
  );
});
