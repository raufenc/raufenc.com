# Dijital Karabaş refakat sitesi

Bu klasör, kitabın mevcut üreticisinden bağımsızdır. Ana üretici dosyasında değişiklik yapılmamıştır.

Yerel önizleme için proje kökünde:

```sh
python3 -m http.server 8098 --directory work/karabas_elifba_asli/dijital_karabas
```

Ardından ana sayfa veya bir ders açılabilir:

```text
http://localhost:8098/
http://localhost:8098/?d=01
http://localhost:8098/?d=37
```

Kalıcı yayın şeması:

```text
https://raufenc.com/karabas-elifbasi/?d=01
```

`d` değeri sayfa numarası değil, `01` ile `37` arasındaki kalıcı ders kimliğidir. Böylece kitabın sayfa düzeni değişse bile basılı karekodların hedefi değişmez.

Dosyalar:

- `index.html`: görünür arayüz
- `gorunum.css`: mobil ve masaüstü mizanpaj
- `ders.js`: ders seçimi, ilerleme kaydı ve etkileşim
- `dersler.json`: mevcut manifestonun site içindeki kaynak kopyası
- `karekod-hedefleri.json`: eski 37 karekod dosyasının yeni kalıcı hedef eşlemesi
