// İyilik Akademi kaldırıldı (Kasım 2026). Bu dosya, uygulamayı daha önce açmış
// tarayıcılardaki eski hizmet işçisini ve önbelleğini temizler; başka iş yapmaz.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (olay) => {
  olay.waitUntil((async () => {
    const adlar = await caches.keys();
    await Promise.all(adlar.filter((ad) => ad.startsWith('iyilik-akademi')).map((ad) => caches.delete(ad)));
    await self.registration.unregister();
    const pencereler = await self.clients.matchAll({ type: 'window' });
    pencereler.forEach((p) => p.navigate(p.url));
  })());
});
