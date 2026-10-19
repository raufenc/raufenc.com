/* Kur'an Öğretmenim — çevrimdışı çalışma (service worker)
   Kapsam: /kuran-ogretmenim/
   - Giriş sitesi kabuğu ve uygulama çekirdeği: önce ağ, olmazsa önbellek
   - Sesler, görseller, veri dosyaları: önce önbellek, arkada tazele
*/
var SURUM = 'ko-v5';
var KABUK = 'ko-kabuk-' + SURUM;
var VARLIK = 'ko-varlik-' + SURUM;
var KOK = '/kuran-ogretmenim/';
var ON_YUKLE = [
  KOK, KOK + 'index.html', KOK + 'stil.css', KOK + 'site.js',
  KOK + 'assets/img/logo-64.png', KOK + 'assets/img/logo-192.png',
  KOK + 'assets/video/tanitim-poster.webp',
  KOK + 'kuran/', KOK + 'kuran/okuyucu.css', KOK + 'kuran/okuyucu.js',
  KOK + 'dualar/', KOK + 'dualar/dualar.css', KOK + 'dualar/dualar.js',
  KOK + 'tecvid/', KOK + 'tecvid/tecvid.css', KOK + 'tecvid/tecvid.js',
  KOK + 'oyunlar/', KOK + 'oyunlar/oyunlar.css', KOK + 'oyunlar/oyunlar.js', KOK + 'sinif/dersler.json',
  KOK + 'app/', KOK + 'app/index.html', KOK + 'app/flutter_bootstrap.js', KOK + 'app/main.dart.js',
  KOK + 'app/assets/FontManifest.json', KOK + 'app/assets/AssetManifest.bin.json', KOK + 'app/assets/AssetManifest.bin',
  KOK + 'app/assets/fonts/MaterialIcons-Regular.otf', KOK + 'app/icons/logo-192.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(KABUK).then(function (c) {
      return Promise.all(ON_YUKLE.map(function (u) { return c.add(u).catch(function () {}); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k.indexOf('ko-') === 0 && k.indexOf(SURUM) < 0; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function varlikMi(url) {
  return url.pathname.indexOf(KOK + 'app/assets/') === 0 ||
         url.pathname.indexOf(KOK + 'assets/') === 0 ||
         url.pathname.indexOf(KOK + 'app/icons/') === 0 ||
         url.pathname.indexOf(KOK + 'kuran/veri/') === 0 ||
         url.pathname.indexOf(KOK + 'app/canvaskit/') === 0;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           // CanvasKit, yazı tipleri ve dış sesler tarayıcıya bırakılır
  if (url.pathname.indexOf(KOK) !== 0) return;
  if (req.headers.get('range')) return;                       // video/ses parça istekleri önbelleğe alınmaz

  if (varlikMi(url)) {
    // önce önbellek, arkada tazele
    e.respondWith(
      caches.open(VARLIK).then(function (c) {
        return c.match(req).then(function (hit) {
          var agdan = fetch(req).then(function (res) {
            if (res && res.ok && res.type === 'basic') c.put(req, res.clone());
            return res;
          }).catch(function () { return hit; });
          return hit || agdan;
        });
      })
    );
    return;
  }

  // kabuk: önce ağ, olmazsa önbellek
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok && res.type === 'basic') {
        var kopya = res.clone();
        caches.open(KABUK).then(function (c) { c.put(req, kopya); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        if (hit) return hit;
        if (req.mode === 'navigate') return caches.match(url.pathname.indexOf(KOK + 'app') === 0 ? KOK + 'app/index.html' : KOK + 'index.html');
        return Response.error();
      });
    })
  );
});
