# İyiliklerle Büyüyorum — site v3 raporu

Dal: `iyilik-v3` (main'den; **push edilmedi**). Yalnız `iyilik/` altında çalışıldı. Basılı adres korumaları (`verify-book-qr.mjs`, `book-qr-redirects.test.mjs`) ve `1/ 2/ 3/` sayfaları aynen duruyor.

## Ne yapıldı

### 1. Canlanan sayfalar — 3 örnek hazır, gerisi üretilmedi
Her sayfa ≈ 22 sn'lik, kodla çalışan bir sahne (video değil; çizgiler keskin, çevrimdışı çalışır):
1. **Çizgiler çiziliyor (0–10,5 sn).** Kitabın gerçek çizgi resminin (`-c.webp`) iskeleti çıkarılıp (Zhang-Suen) kenarlara ayrıldı; tarayıcıda kalın bir fırça bu yollar boyunca bir maske açar. Çizgi hep asıl rasterdir, vektörleştirme yok. Sıra: **önce sayfadaki yazı satırları soldan sağa** (başlık el yazısı gibi belirir), sonra büyük şekiller, sonra ayrıntılar. Yollar çizgi pikselinin ≈ %99'unu örter; kalanı süre sonunda tamamlanır.
2. **Renkler bölge bölge dolar (8–20 sn).** `-b.webp` bölge haritası + Claude etiketleri. Nesne grupları sırayla (gökyüzü/duvar/zemin → ağaç/bitki → eşya → giysi → ten/saç → göz akı), her bölge 0,9 sn'de yumuşakça solar.
3. **Çevre canlı:** yalnız gökyüzü/bulut/su bölgelerinde çok hafif ışıltı ve bulut kayması, güneş/ışık bölgelerinde hafif parlama (CSS maskesi, GPU'da); tüm sahnede yavaş yakınlaşma (%7). Karakter bölgelerine hareket **yok**, yeni figür/yüz yok.
4. **Ses (varsayılan açık):** sayfanın kendi metni, mevcut anlatıcı sesiyle (coral, `ses_uret.py` önbelleği): başlık + alt cümle çizim sırasında, sayfa altındaki yönerge renklenmenin sonunda. Metin Claude görsel çağrısında sayfa resminden aynen okundu (uydurma yok). Altında altyazı satırı (ses kapalıyken de görünür). Müzik yok.
5. Sonunda **"Şimdi sen boya!"** → o sayfanın dokun-boyası. Duraklat / baştan / sona atla düğmeleri, ses açma-kapama. `prefers-reduced-motion`: animasyon yok, renkli son kare + "Dinle".
6. **Erişim:** "Sayfa N" ekranında ve konunun Görev adımında "Canlandır" düğmesi (yalnız hazır sayfalarda; liste `sayfa/canlan.json`). Hazır olmayan sayfaya doğrudan gidilirse nazik bir mesaj ve "boya" bağlantısı çıkar.

**3 örneğin adresleri** (yerel/yayında `…/iyilik/` + hash):
- `#canlan/1/12` — Temiz ve düzenliyim (başlık, alt cümle ve yönerge sesli)
- `#canlan/2/7` — çizim-only sayfa (kitapta yazı yok → ses yok, sessiz sahne; 254 bölge, 36 nesne grubu)
- `#canlan/3/30` — Komşumu düşünüyorum (sesli)

Dosyalar: `js/canlan.js` (genel oynatıcı, 144 sayfaya ölçeklenir), `_build/canlandir.py` (üretim; `--sayfa 1-12 2-7 3-30`, `--hepsi`, `--say`, `--yol-yalniz`, `--sessiz`, `--is-sayisi N`, `--model`, `--yeniden`), sayfa başına `sayfa/<id>-yol.json` (20–57 KB), `-renk.json` (4–9 KB), `ses/canlan/<id>-{giris,yonerge}.mp3` (≈ 6–20 KB).

**Renk seçimi:** her bölge numaralı bindirmeyle Claude'a (görsel, `claude-haiku-5-5`, düşünme kapalı) etiketlettirildi: {etiket, sabit palet rengi, nesne adı} + sayfa metni. Palet: boyama stüdyosunun 21 rengi + kapaklardan örneklenen ten (`#f6c196`) ve saç (`#6b3a14`) tonları + birkaç açık ton. Model yanlış/uyumsuz renk verirse doğal-renk denetimi düzeltir (yaprak yeşil, gökyüzü mavi, bulut beyaz, ten yalnız `ten`; büyük alanda lacivert/koyu kahve açılır; bir nesne 3+ renk alırsa baskın renge toplanır). Yazı ve sayfa kenarı boyanmaz.

**Maliyet (örnek):** 3 sayfa için 7 Claude çağrısı (ilk deneme düşünme açıkken ≈ 9,7 bin çıktı token'ı yedi; sonra kapatıldı), toplam ≈ 64 bin girdi + 33 bin çıktı token ≈ **0,23 $** (haiku için *varsayılan* 1 $/5 $ MTok ile; kesin tutar Anthropic panelinden doğrulanmalı — fiyat tablosuna bu oturumda erişemedim). Yeni TTS: 4 cümle-grubu ≈ 30 sn ses ≈ 0,01 $. Sınır (1 $) aşılmadı.

### 144 sayfa için tahmin
- **Claude görsel:** sayfa başına ≈ 9,5 bin girdi + 3,9 bin çıktı token → 144 sayfa ≈ **4 $** (haiku varsayımıyla). Sonnet-5-5'e geçilirse yaklaşık 3 katı (≈ 12 $).
- **Yeni ses:** ≈ 9 sn/sayfa → ≈ 22 dk ≈ **0,3 $**.
- **Süre:** sayfa başına ≈ 20–40 sn (çoğu Claude beklemesi); `--is-sayisi 3` ile ≈ **15–25 dk**; ardışık ≈ 1 saat.
- **Ek yük:** ≈ 144 × 45 KB ≈ **6–7 MB** (yol + renk + ses). Hepsi `--hepsi` ile tek komut.
- Kalite uyarısı: etiketleme tamamen otomatik; renkleri tek tek gözden geçirmeden yayına almak riskli (aşağıda).

### 2. Resimlerim ve paylaşma
- **Resimlerim** (`#resimler`): boyanan bütün sayfalar ızgarada (cihazdaki IndexedDB'den). Dokununca büyük görünüm (`#resim/1/12`) ve **"Boyamaya devam et"**. Giriş: Boya atölyesinin üstünde "Resimlerim (N)" düğmesi ve Defterim'deki "Hepsi ›".
- **Paylaş yalnız Büyükler bölümünde** (ebeveyn kapısı arkasında): `#buyuk/resimler` → resim seç → künyeli önizleme → **Paylaş**: Web Share API ile PNG dosyası; destek yoksa indirir ve bunu söyler. Resmin altında zarif künye şeridi: "İyiliklerle Büyüyorum · raufenc.com/iyilik". Çocuk ekranlarında paylaşma düğmesi yok. Resimler hiçbir sunucuya gitmez.

### 3. Anonim ziyaret sayımı
- `kabuk.py` şablonuna Vercel Web Analytics eklendi (`<script defer src="/_vercel/insights/script.js">`, Vercel'in standart `window.va` satırıyla); `index.html` ve `1/ 2/ 3/` yeniden üretildi. CSP'de `self` izinli; çerez/kişisel veri yok. Başka analitik eklenmedi.
- Gizlilik paragrafı dürüstçe güncellendi (istenen cümleler aynen). Hizmet, yerelde 404 döner (beklenen); yayında Vercel sağlar.

`sw.js` sürümü `iyilik-v3-4`; `js/canlan.js`, `js/galeri.js` çekirdeğe eklendi; "cildi indir" hazır canlanan sayfaların dosyalarını da alır.

## Test sonuçları (bu oturumda çalıştırıldı)
- `node --check` (8 JS + sw.js) temiz; `canlandir.py` sözdizimi tamam.
- `node scripts/verify-book-qr.mjs` → geçti. `node --test tests/book-qr-redirects.test.mjs` → 6/6 geçti.
- Yerel sunucu + `_build/dogrula.mjs` (canlan bütünlük denetimi eklendi: yol biçimi, bölge sırası, renk biçimi, ses dosyası): 74 JSON geçerli, **2.341 dosyanın tamamı HTTP 200**, "HER ŞEY TAMAM".
- Gerçek Chrome (390 × 844) ile: üç örneğin kare kare oynatılması; "Canlandır" yalnız hazır sayfalarda; hazır olmayan sayfada nazik mesaj; sesin gerçekten çalması (giriş + yönerge `play()`); sona atla → düğme; düğmeden dokun-boyaya geçiş; boya → Resimlerim ızgarası → büyük görünüm (paylaş düğmesi yok); ebeveyn kapısı → resim seç → paylaş (`navigator.share` taklit edilip PNG dosyası, ad ve başlık doğrulandı); `share` desteği yokken indirme; künye şeridinin görsel kontrolü; gizlilik metni; `reduced-motion` renkli son kare. Konsolda beklenen 404'ler dışında hata yok (yerelde analitik betiği; hazır olmayan sayfa).
- Ambient katmanı: maske ve animasyonun çalıştığı doğrulandı; etkisi çok hafif (örnek 3/30'da gökyüzü yalnız pencerede küçük).

## Bilinen eksikler / dürüst notlar
- **Gerçek telefonda (iOS Safari, ucuz Android) denenmedi.** Oynatıcı tuvale 832 × 1196 çiziyor; düşük donanımda akıcılık denenmeli. iOS'ta sesin ilk dokunuştan önce çalmaması beklenen (doğrudan bağlantıda "Sesle izle" düğmesi çıkar; denemedim).
- Renkler Claude'a bırakıldığı için zevke/doğruluğa göre değişir (örnek: 1/12'de zemin yeşil, perde pembe; 2/7'de başörtüleri canlı renkler). **Sanat yönetimi onayı Rauf'ta.** Kitaptaki karakterlerin giysi/ten renkleri model seçimidir.
- Çizim sırası "el çizimi" değil iskelet temelli: büyük çizgiler önce gelir, ayrıntılar son 3–4 sn'de yoğunlaşır; yazı çizimi harf harf değil, kenar kenar (uzaklaşınca iyi, yakında bazı harfler parça parça görünür).
- Boyama stüdyosundan Resimlerim'e geçişte (≈ 1 sn içinde) kayıt henüz yazılmadıysa ızgara bir an boş görünebilir (v2'den gelen otomatik kayıt gecikmesi; sayfa yenilenince düzelir).
- Yazım tutarsızlığı (v2 notundan): veri "sallallahu aleyhi ve sellem" yazıyor; kitap resimlerindeki metne dokunulmadı.
- 3 örnek dışında hiçbir sayfa üretilmedi; diğer sayfalarda "Canlandır" düğmesi görünmez.

## Ana oturumun tarayıcıda denemesi gereken akışlar
1. `#canlan/1/12`, `#canlan/2/7`, `#canlan/3/30`: baştan sona izle; çizim sırası, renk seçimi, ses/altyazı uyumu, "Şimdi sen boya!" düğmesi. Duraklat/baştan/sona atla/ses kapat. Telefon yatay/dikey.
2. İlk dokunuş olmadan doğrudan bağlantı açılırsa "Sesle izle" düğmesi.
3. Sistem ayarında "hareketi azalt" açıkken renkli son kare.
4. Boya → Resimlerim → büyük görünüm → "Boyamaya devam et". Büyükler → "Resimleri gör ve paylaş" → Paylaş (telefonda paylaşım penceresi, masaüstünde indirme).
5. Yayında: `/iyilik/1/` açıp Vercel Analytics panelinde sayımın göründüğü; Gizlilik metni.
6. Uçak modu: bir kez izlenen canlan sayfası ve Resimlerim çalışıyor mu.

## Rauf'un karar vermesi gerekenler
1. Örneklerin görünümü/hızı (22 sn) uygun mu? Çizim sırası, çevre ışıltısı yeterince "canlı" mı yoksa daha belirgin mi olsun?
2. 144 sayfaya geçilsin mi? Tahmin ≈ 4 $ (Claude) + 0,3 $ (ses), ≈ 20 dk; renkleri gözden geçirme süresi ayrı. Daha iyi renk için `--model claude-sonnet-5-5` (≈ 3 kat) denensin mi?
3. Karakterlere (kitap çizimleri) renk verilmesi ve renklerin model seçimine bırakılması onaylı mı, yoksa ten/saç/giysi için sabit kurallar mı konsun?
4. Yazısız çizim sayfalarında (örn. 2/7) sessiz sahne yeterli mi, yoksa bu sayfalara yalnız arayüz sesi mi eklensin?
5. "Resimlerim" için alt menüye yer açılsın mı (şimdi Boya ve Defterim'den erişiliyor)?
