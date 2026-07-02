// ============================================================
// Vicdan Mahkemesi — minimal Service Worker (cache-first)
// Opsiyonel katman: herhangi bir hata oyunun normal (online)
// çalışmasını etkilemez.
// ============================================================
var CACHE_ADI = 'vicdan-mahkemesi-v1';
var ONBELLEK_DOSYALARI = [
  './',
  './index.html',
  './content.js',
  './manifest.webmanifest',
  '../lib/ses.js',
  '../assets/mahkeme/salon.jpg',
  '../assets/karakter/selim.jpg',
  '../assets/karakter/zeynep.jpg',
  '../assets/karakter/emir.jpg',
  '../assets/karakter/burak.jpg',
  '../assets/karakter/elif.jpg',
  '../assets/karakter/hademe.jpg',
  '../assets/karakter/kantinci.jpg',
  '../assets/karakter/rehber.jpg'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_ADI).then(function(cache){
      return Promise.all(
        ONBELLEK_DOSYALARI.map(function(url){
          return cache.add(url).catch(function(){ /* tek dosya başarısız olursa kurulumu bozma */ });
        })
      );
    }).catch(function(){ /* sessizce geç */ })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
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
self.addEventListener('fetch', function(event){
  if(event.request.method !== 'GET') return;
  var yol = new URL(event.request.url).pathname;
  var guncelKalmali = yol.endsWith('.html') || yol.endsWith('.js') || yol.endsWith('/') || yol.endsWith('.webmanifest');

  if (guncelKalmali) {
    event.respondWith(
      fetch(event.request).then(function(agYaniti){
        try{
          var kopya = agYaniti.clone();
          caches.open(CACHE_ADI).then(function(cache){ cache.put(event.request, kopya); }).catch(function(){});
        }catch(e){}
        return agYaniti;
      }).catch(function(){ return caches.match(event.request); })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(onbellekYaniti){
      if(onbellekYaniti) return onbellekYaniti;
      return fetch(event.request).catch(function(){ return onbellekYaniti; });
    })
  );
});
