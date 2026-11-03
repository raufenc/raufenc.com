# İyiliklerle Büyüyorum v5 — resimli oyunlar (3 Kasım 2026)

## Canlı durum
- Site: https://raufenc.com/iyilik/ (sürüm `iyilik-v5-1`). Canlıda 60 oyunun hepsi telefon boyunda (390 px, dokunmatik) baştan sona oynandı ve bitti.
- Kitap karekodları (/iyilik/1/, /2/, /3/) değişmedi, üçü de açılıyor. Çocukların damgaları ve boyadıkları resimler aynı kayıtta duruyor.

## Ne değişti
1. **60 oyun artık resimle oynanıyor.** Kartlarda yazı yok; bazı kartlarda resmin altında küçük, tek kelimelik bir etiket var. Oyun türleri:
   - **Sırala (28 oyun):** Üstte numaralı yuvalar var, altta resimli kartlar. Çocuk sıradaki karta dokunur ya da kartı yuvaya sürükler.
     - Örnek: abdest adımları, beş vakit, el yıkama, yaya geçidi.
     - Doğru sıra eski verideki sıranın aynısı.
   - **Eşini seç (19 oyun):** Üstte büyük bir durum resmi var, altta üç seçenek. Çocuk birine dokunur ya da yukarı sürükler.
     - Örnek: kırık kalp → özür balonu.
   - **Dinle, bul (9 oyun):** Kelime sesli okunur ("Kıble", "Mihrap", "Sahur" gibi), çocuk dört resimden doğrusunu seçer. Doğru seçince kelimenin anlamı okunur.
   - **Resim ↔ resim (2 oyun):**
     - b1-01: büyüteç ↔ uğur böceği, dua eden eller ↔ ekmek.
     - b1-08: vücut resmi ↔ abdest hareketi.
     - Çocuk dokunarak ya da sürükleyerek eşleştirir.
   - **Hafıza kartları (2 oyun):**
     - b1-04: kirli el ↔ sabunlu eller, dağınık oda ↔ toplu oda.
     - b2-16: ev işleri.
2. **Yanlışta ceza yok.** Kart hafifçe sallanır ve "Bir daha bakalım" denir. İki denemeden sonra doğru kart altın renkte parlar. Doğruda hafif bir ses ve küçük bir sıçrama olur. Oyun bitince "Aferin!" çıkar.
3. **Kartlara dokununca eski oyunun cümlesi Emmett'in sesiyle okunur.** Örneğin musluk resmine dokununca "Musluğu iş bitince kapatmak" duyulur. Böylece öğretilen fikir aynı kaldı. Yeni dinî bilgi eklenmedi.
4. **Kitap sayfasıyla bağ:** Oyunun üstünde konunun kitap sayfasının küçük resmi ve sayfa numarası duruyor. Dokununca o sayfa açılıyor.
5. **Büyükler rehberi:** Her konuda "Oyunun yazılı hâli" bölümü var. Eski yönerge, eşleştirmeler ve sıralar orada yazı olarak duruyor.
6. **Veri:** Yeni oyunlar `data/bookN.json` içinde ayrı `game2` alanında. Eski `game` alanı hiç değişmedi.
7. **Çevrimdışı çalışma:** İkonlar ilk kullanımda cihaza kaydediliyor. Büyükler'deki "cildi indir" düğmesi ikonları da indiriyor.

## Sayılar
- **İkon:** 202 ikon üretildi (`iyilik/ikon/`, 384 px saydam WebP, toplam 5 MB). Bazı ikonlar birden çok oyunda kullanılıyor.
- **Codex:** 22 çağrı yapıldı.
  - 21'i 10'arlık tabakalar.
  - 1'i düzeltme tabakası.
  - İlk tabaka sonraki bütün çağrılara tarz örneği olarak verildi.
- **Gözle denetim:** Her tabakayı tek tek inceledim. Üç ikonu geri çevirdim ve yeniden çizdirdim:
  - Ağza ve burna su verme: yandan görünen başta dudak ve burun çizgisi vardı. Yeni çizimde baş tamamen düz.
  - Kıyam: öteki namaz resimlerinden farklı giysi ve seccadeyle çizilmişti.
- **Higgsfield:** 0,45 kredi harcandı (bakiye 36,08'den 35,63'e indi).
  - Beş kısa yönerge Emmett'in sesiyle tek çekimde üretildi ve sessizliklerden kesildi: "Resme dokun, sonra eşine.", "Resme bak, eşini seç.", "Dinle ve doğru resmi bul.", "Kartları çevir, eşlerini bul.", "Resimleri sırayla yerleştir."
  - 25 kredilik sınırın çok altında kalındı.

## Telefonda denenecek 3 oyun
1. Namaz hareketleri (sırala): https://raufenc.com/iyilik/#konu/b1-11/oyun — ilk kartı parmakla yuvaya sürükleyin, ötekilere dokunun.
2. Abdest (resim ↔ resim, sürükleme): https://raufenc.com/iyilik/#konu/b1-08/oyun
3. Güzel sözler (eşini seç): https://raufenc.com/iyilik/#konu/b2-02/oyun

İsterseniz bunlara da bakın: dinle-bul #konu/b1-10/oyun, hafıza #konu/b1-04/oyun.

## Lütfen gözle bakılsın (hassas resimler)
- **Tavaf (b1-19):** Üzerinde hiç yazı ya da desen olmayan düz siyah küp, altın şerit ve etrafında oklar.
- **Bayram namazı (b1-20):** Yeşil kubbeli bir cami çizildi. Belli bir camiyi göstermiyor, ama istenirse renk değiştirilebilir.
- **Kur'ân kelimeleri (b1-14):**
  - Sûre: rahle üstünde yeşil kılıflı kapalı Kur'ân-ı Kerîm.
  - Âyet: kurdeleli kapalı kitap.
  - Meâl: dünya küresi ve kitap.
  - Tefsir: büyüteç ve kitap.
  - Hiçbirinde yazı yok. Kavramlar soyut olduğu için resimler yalnız ipucu niteliğinde; asıl öğretim seste.
- **İnsan figürleri:** Namaz ve abdest resimlerinde yüzsüz, takkeli çocuk figürü var; aile resminde de yüzsüz figürler. Göz, ağız, burun çizilmedi.

## Bilinen eksikler
- Yeni beş yönerge sesini kulakla dinleyemedim. Kesim noktaları belirgin sessizliklerde, uzunlukları cümlelere uyuyor.
- Testi gerçek bir telefonda değil, telefon boyuna ayarlanmış başsız Chrome'da yaptım. Dokunma ve sürükleme olayları gerçekti. iPhone'da bir kez elle denenmesi iyi olur.
- "Eşini seç" oyunlarında "büyükten yardım iste" fikri birçok yerde aynı resimle gösteriliyor (büyük el, küçük el). Bazı duygular simgeyle anlatıldı: fırtına bulutu, boş pil, kırık kalp. 5 yaşında bir çocuğa ilk seferde büyüğün eşlik etmesi gerekebilir.
- Hafıza kartları 390 px'te 4 sütun, kartlar küçük (yaklaşık 84 px).
- Ağza ve burna su verme resimleri birbirine benziyor. Kartların altındaki "Ağız" ve "Burun" etiketleri ayırt etmeye yardım ediyor.
- Eski uzun oyun yönergesi ("Hanefî abdestin dört temelini…") çocuk ekranında artık okunmuyor; Büyükler rehberinde yazı olarak duruyor.

## Dosyalar
- Oyun kodu: `js/oyun.js`; bağlantılar `js/app.js` içinde; görünüm `css/app.css` sonunda.
- Üretim düzeni (`_build/oyun2/`):
  - `plan.py`: ikon tarifleri ve hangi oyunda hangi resmin kullanıldığı.
  - `tabaka.py`: Codex çağrısı.
  - `kes.py` ve `kes_hepsi.py`: tabakayı ikonlara kesme.
  - `veri.py`: `game2` alanını veriye yazma.
  - `oyna.mjs`: otomatik oyun testi.
  - `cagrilar.jsonl`: Codex çağrı defteri.
