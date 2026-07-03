/* ============================================================
   Doğru Taraf — service worker (network-first HTML/JS, cache-first görsel)
   HTML/JS asla cache-first yapılmaz — aksi halde içerik güncellemeleri
   kullanıcıya ulaşmaz (bu derste bir kez yaşandı).
   Bu dosya hata verse bile oyunun normal (online) çalışması etkilenmez.
   ============================================================ */
"use strict";

var CACHE_ADI = "dogrutaraf-cache-v2";
var CACHE_DOSYALARI = [
  "./",
  "index.html",
  "content.js",
  "lib/ses.js",
  "manifest.webmanifest",
  "assets/kapak.jpg",
  "assets/kategori/iman.jpg",
  "assets/kategori/islam.jpg",
  "assets/kategori/temizlik.jpg",
  "assets/kategori/namaz.jpg",
  "assets/kategori/oruc.jpg",
  "assets/kategori/zekat.jpg",
  "assets/kategori/hac.jpg",
  "assets/kategori/siyer.jpg",
  "assets/kategori/kuran.jpg",
  "assets/kategori/ahlak.jpg",
  "assets/maskot/maskot-01.jpg",
  "assets/maskot/maskot-02.jpg",
  "assets/maskot/maskot-03.jpg",
  "assets/maskot/maskot-04.jpg",
  "assets/maskot/maskot-05.jpg",
  "assets/maskot/maskot-06.jpg",
  "assets/maskot/maskot-07.jpg",
  "assets/maskot/maskot-08.jpg",
  "assets/maskot/maskot-09.jpg",
  "assets/maskot/maskot-10.jpg",
  "assets/maskot/maskot-11.jpg",
  "assets/maskot/maskot-12.jpg",
  "assets/maskot/maskot-13.jpg",
  "assets/maskot/maskot-14.jpg",
  "assets/maskot/maskot-15.jpg",
  "assets/maskot/maskot-16.jpg",
  "assets/maskot/maskot-17.jpg",
  "assets/maskot/maskot-18.jpg",
  "assets/maskot/maskot-19.jpg",
  "assets/maskot/maskot-20.jpg",
  "assets/maskot/maskot-21.jpg",
  "assets/maskot/maskot-22.jpg",
  "assets/maskot/maskot-23.jpg",
  "assets/maskot/maskot-24.jpg",
  "assets/maskot/hero-karsilama.jpg",
  "assets/maskot/hero-kutlama.jpg",
  "assets/maskot/hero-tesvik.jpg"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_ADI).then(function(cache){
      return Promise.all(
        CACHE_DOSYALARI.map(function(url){
          return cache.add(url).catch(function(){ /* tek dosya başarısız olursa kurulumu bozmasın */ });
        })
      );
    }).catch(function(){})
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(anahtarlar){
      return Promise.all(
        anahtarlar.filter(function(k){ return k !== CACHE_ADI; })
                  .map(function(k){ return caches.delete(k); })
      );
    }).catch(function(){})
  );
  self.clients.claim();
});

/* HTML/JS: network-first (her zaman güncel içerik, ağ yoksa önbelleğe düş).
   Görseller: cache-first (nadiren değişir, hız önceliklidir). */
self.addEventListener("fetch", function(event){
  if (event.request.method !== "GET") return;
  var yol = new URL(event.request.url).pathname;
  var guncelKalmali = yol.endsWith(".html") || yol.endsWith(".js") || yol.endsWith("/") || yol.endsWith(".webmanifest");

  if (guncelKalmali) {
    event.respondWith(
      fetch(event.request).then(function(agYaniti){
        try {
          var kopya = agYaniti.clone();
          caches.open(CACHE_ADI).then(function(cache){ cache.put(event.request, kopya); }).catch(function(){});
        } catch(e){}
        return agYaniti;
      }).catch(function(){ return caches.match(event.request); })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(yanit){
      if (yanit) return yanit;
      return fetch(event.request).catch(function(){ return yanit; });
    })
  );
});
