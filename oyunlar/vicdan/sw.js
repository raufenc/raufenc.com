/* ============================================================
   Vicdan — minimal service worker (cache-first, opsiyonel katman)
   Bu dosya hata verse bile oyunun normal (online) çalışması etkilenmez.
   ============================================================ */
"use strict";

var CACHE_ADI = "vicdan-cache-v1";
var CACHE_DOSYALARI = [
  "./",
  "./index.html",
  "./content.js",
  "./manifest.webmanifest",
  "../lib/ses.js",
  "../assets/kapak/vicdan.jpg",
  "../assets/karakter/anne.jpg",
  "../assets/karakter/baba.jpg",
  "../assets/karakter/bakkal.jpg",
  "../assets/karakter/burak.jpg",
  "../assets/karakter/dede.jpg",
  "../assets/karakter/elif.jpg",
  "../assets/karakter/emir.jpg",
  "../assets/karakter/hademe.jpg",
  "../assets/karakter/kagan.jpg",
  "../assets/karakter/kantinci.jpg",
  "../assets/karakter/kardes.jpg",
  "../assets/karakter/komsu.jpg",
  "../assets/karakter/mudur.jpg",
  "../assets/karakter/ogretmen.jpg",
  "../assets/karakter/rehber.jpg",
  "../assets/karakter/selim.jpg",
  "../assets/karakter/zeynep.jpg"
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
