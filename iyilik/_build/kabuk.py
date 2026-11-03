#!/usr/bin/env python3
"""index.html'i ve basılı QR sayfalarını (1/, 2/, 3/) tek şablondan yazar.
Basılı adresler (/iyilik/1/ 2/ 3/) silinmez/taşınmaz; her biri <base href="/iyilik/"> içerir ve #kitap/N açar."""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
NAV = [('home', 'home', 'Ana sayfa'), ('konular', 'book', 'Konular'), ('boya', 'paint', 'Boya'), ('defter', 'star', 'Defterim'), ('buyuk', 'people', 'Büyükler')]
def page(book=None):
    pre = ''
    if book:
        pre = f'\n  <script>if(!location.hash||location.hash==="#home"){{history.replaceState(null,"","/iyilik/#kitap/{book}")}}</script>'
    nav = ''.join(f'<a href="#{k}" data-nav="{k}" data-icon="{ic}"><i></i>{t}</a>' for k, ic, t in NAV)
    return f'''<!doctype html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <base href="/iyilik/">{pre}
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#234c3c">
  <meta name="description" content="İyiliklerle Büyüyorum: kitabındaki sayfayı bul, dinle, oyna ve boya. Reklamsız, üyeliksiz, çevrimdışı çalışır.">
  <title>İyiliklerle Büyüyorum · Dinle, oyna, boya</title>
  <link rel="icon" type="image/svg+xml" href="assets/icon.svg">
  <link rel="apple-touch-icon" href="assets/icon-192.png">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="preload" as="font" type="font/woff2" href="font/nunito-latin.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="font/nunito-latin-ext.woff2" crossorigin>
  <link rel="stylesheet" href="css/app.css">
  <script type="module" src="js/app.js"></script>
</head>
<body>
  <a class="skip" href="#main">İçeriğe geç</a>
  <header class="top"><a class="brand" href="#home" aria-label="İyiliklerle Büyüyorum ana sayfa"><img src="assets/icon.svg" alt="" width="38" height="38"><span>İyiliklerle Büyüyorum</span></a><button class="ibtn" id="snd" aria-pressed="true" aria-label="Sesli ipuçları"></button></header>
  <main id="main" tabindex="-1"><noscript><p style="padding:20px">Bu site JavaScript ile çalışır. Lütfen tarayıcınızda JavaScript'i açın.</p></noscript></main>
  <nav class="nav" aria-label="Ana menü">{nav}</nav>
  <div id="toast" role="status" aria-live="polite"></div>
</body>
</html>
'''
(ROOT / 'index.html').write_text(page(), encoding='utf-8')
for n in (1, 2, 3):
    d = ROOT / str(n); d.mkdir(exist_ok=True)
    (d / 'index.html').write_text(page(n), encoding='utf-8')
print('yazıldı')
