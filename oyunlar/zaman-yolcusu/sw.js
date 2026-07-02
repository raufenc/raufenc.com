/*
 * Zaman Yolcusu — minimal Service Worker (opsiyonel çevrimdışı destek)
 * Cache-first strateji: önbellekte varsa oradan, yoksa ağdan sun.
 * Herhangi bir hata oyunun normal (online) çalışmasını ETKİLEMEMELİ.
 */
'use strict';

var CACHE_ADI = 'zaman-yolcusu-v1';

var ONBELLEK_DOSYALARI = [
  './',
  './index.html',
  './content.js',
  '../lib/ses.js',
  '../assets/zaman/s1.jpg', '../assets/zaman/s1-iyi.jpg', '../assets/zaman/s1-kotu.jpg',
  '../assets/zaman/s2.jpg', '../assets/zaman/s2-iyi.jpg', '../assets/zaman/s2-kotu.jpg',
  '../assets/zaman/s3.jpg', '../assets/zaman/s3-iyi.jpg', '../assets/zaman/s3-kotu.jpg',
  '../assets/zaman/s4.jpg', '../assets/zaman/s4-iyi.jpg', '../assets/zaman/s4-kotu.jpg',
  '../assets/zaman/s5.jpg', '../assets/zaman/s5-iyi.jpg', '../assets/zaman/s5-kotu.jpg',
  '../assets/zaman/s6.jpg', '../assets/zaman/s6-iyi.jpg', '../assets/zaman/s6-kotu.jpg',
  '../assets/zaman/s7.jpg', '../assets/zaman/s7-iyi.jpg', '../assets/zaman/s7-kotu.jpg',
  '../assets/zaman/s8.jpg', '../assets/zaman/s8-iyi.jpg', '../assets/zaman/s8-kotu.jpg'
];

self.addEventListener('install', function(ev){
  ev.waitUntil(
    caches.open(CACHE_ADI).then(function(cache){
      return cache.addAll(ONBELLEK_DOSYALARI).catch(function(){ /* tek dosya başarısız olsa da kurulum bozulmasın */ });
    }).catch(function(){})
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(ev){
  ev.waitUntil(
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
self.addEventListener('fetch', function(ev){
  if (ev.request.method !== 'GET') return;
  var yol = new URL(ev.request.url).pathname;
  var guncelKalmali = yol.endsWith('.html') || yol.endsWith('.js') || yol.endsWith('/') || yol.endsWith('.webmanifest');

  if (guncelKalmali) {
    ev.respondWith(
      fetch(ev.request).then(function(agYaniti){
        try{
          var kopya = agYaniti.clone();
          caches.open(CACHE_ADI).then(function(cache){ cache.put(ev.request, kopya); }).catch(function(){});
        }catch(e){}
        return agYaniti;
      }).catch(function(){ return caches.match(ev.request); })
    );
    return;
  }

  ev.respondWith(
    caches.match(ev.request).then(function(onbellekYaniti){
      if (onbellekYaniti) return onbellekYaniti;
      return fetch(ev.request).then(function(agYaniti){
        try{
          var kopya = agYaniti.clone();
          caches.open(CACHE_ADI).then(function(cache){ cache.put(ev.request, kopya); }).catch(function(){});
        }catch(e){}
        return agYaniti;
      }).catch(function(){
        return onbellekYaniti; // undefined ise tarayıcı normal ağ hatasını gösterir
      });
    }).catch(function(){ return fetch(ev.request); })
  );
});
