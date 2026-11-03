# İyiliklerle Büyüyorum v4 — plan (3 Kasım 2026)

## Bugünkü durum (çocuk ve anne baba gözüyle, 390 px)
- Akış doğru: kitap → sayfa numarası → konu/boya. Ama görünüm "şablon uygulama" gibi: her şey aynı çerçeveli beyaz kart, kitabın kendi sıcak dünyası (kapak resimleri) yalnız küçük küçük resimlerde.
- Konu sayfası bir yetişkin metni: konu başına ~3.000 harf sesli metin. 5 yaşındaki çocuk dinlemez, sıkılır.
- Boyamanın sonu yok: çocuk bitirdiğinde kimse "ne güzel olmuş" demiyor.
- Ses (OpenAI) yapay ve soğuk; hiçbir dokunuşun sesi yok.

## Alanın iyileri neyi neden iyi yapıyor
- **Khan Academy Kids / Duolingo ABC**: her ekranda tek iş, çok kısa sesli yönerge, her doğru adıma küçük ve sıcak bir ödül. → Biz: konu başına 600–800 harf, tek dokunuşla oku, kısa geri bildirim.
- **Sago Mini / Toca Boca**: metin yok denecek kadar az; dokunma hedefleri büyük; her dokunuşun yumuşak sesi ve küçük bir hareketi var; reklam/yarış yok. → Biz: dokunma sesleri (kapatılabilir), basınca hafif çökme, yumuşak geçişler.
- **PBS Kids / Lake**: boyama sonunda çocuğun eseri sergilenir; galeri "benim duvarım" hissi verir. → Biz: "Bitti" ile kutlama, Resimlerim çerçeveli duvar.
- **Epic!**: kitap kapağı her yerde baş rolde; kapak açılır gibi geçiş. → Biz: açılışta üç kapak, katmanlı ve hafif parallax; kapağa dokununca kitap açılır.

## Öncelik sırası ve "premium" ölçütü
1. **Çocuk metni kısa** (`kid` alanı): başlık, 2–3 cümle giriş, kısa hikâye + seçenekler, oyun, görev. Uzun metin Büyükler'e taşınır, hiçbir şey silinmez. Ölçüt: konu başına ≤ 800 harf sesli metin, her ekran tek kaydırmada okunur.
2. **Emmett sesi** (Higgsfield · ElevenLabs): bütün sesler tek ağızdan, sıcak. Ölçüt: eksik dosya yok, −18 LUFS, kelime vurgusu çalışıyor.
3. **Boyama tebriki**: "Bitti" → resmin kendisi parlar, ışıltılar, sekiz farklı tebrik cümlesi sırayla, damga ve Resimlerim duvarı. Ölçüt: 2 sn'de biter, ekranı kaplamaz, hareket azaltma ayarına uyar.
4. **Görsel yenileme**: kitap kapaklarından renk sistemi, kapaklı açılış, tuşlarken sayfa önizlemesi, kağıt dokulu sayfa, dokunma sesleri. Ölçüt: 390 px'te hiçbir yazı/düğme taşmaz; 48 px'ten küçük dokunma hedefi yok; ilk açılış ek yükleme olmadan.
5. **Canlanan sayfa artığı**: kod ve dosyalar tamamen silinir (yapıldı).
6. **Tanıtım videoları** (kodla): vitrin kartı 16:9 ve dikey 9:16 ~20 sn reklam filmi.
7. **Rapor** (`V4_RAPOR.md`).
