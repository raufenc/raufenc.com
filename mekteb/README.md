# Mekteb — Kur'ân-ı Kerîm ve İlmihal Öğretim Sistemi (çalışma adı)

Bu klasör, vakfın brief'inde tarif edilen sistemin **Faz 0** teslimatıdır: proje
anayasası, içerik kod şeması, veri modeli, kaynak–kazanım–kanıt matrisinin şablonu
ve üç dolu örneği, bir de hocanın ders ekranının çalışan prototipi.

Ajans: bu depo ve bu oturum. Dinî içeriğin yazımı ve son onayı vakıftadır; ajans
yapıyı, şablonları, pedagojik kurguyu, yazılımı ve dijitalleştirmeyi yapar.

## Ajansın üstlendiği ve üstlenmediği

| Üstleniyor | Üstlenmiyor (vakıf / ehil hoca) |
|---|---|
| UbD çerçevesi, kazanım–kanıt matrisi şablonları ve doldurulmuş örnekler | Dinî hüküm ve metinlerin yazımı; Ehl-i sünnet itikadına uygunluk onayı |
| İçerik kod şeması, veri modeli, onay/sürüm akışı | Elif cüzü ve Karabaş Tecvidi sayfalarının asıl kaynakları (vektör/PDF) |
| Hoca ders odası, öğrenci çalışma modu, veli ve yönetici panelleri | Onaylı hafız kayıtları ve Mushaf görüntülerinin kullanım hakları |
| Basılı kitap, dijital içerik ve öğretmen kılavuzunun **tek kaynaktan** üretimi | Hocaların seçimi, eğitimi ve ders takvimi işletmesi |
| Görüntülü ders altyapısının kurulumu (açık kaynaklı, kendi sunucuda) | Sunucu ve alan adı sahipliği, KVKK veri sorumlusu rolü |
| LTI 1.3 / xAPI / SCORM dışa aktarım, yedekleme ve veri aktarımı | — |

## Değişmez ölçüler (brief'ten, yazılıma çevrilmiş hâli)

1. **Kanıt ölçeği tek ve sabittir:** `0 Henüz değil · 1 Yardımla · 2 İpucuyla · 3 Bağımsız`.
   Hoca tek dokunuşla işaretler; gözlem notu isteğe bağlıdır.
2. Ekran açmak, video bitirmek, oyun puanı **kanıt değildir**; yalnız `kanit` tablosuna
   hoca eliyle (canlı) veya tanımlı etkinlik sonucuyla (kendi kendine çalışma, "hoca
   onayı bekler" bayrağıyla) yazılır.
3. Öğrencinin **ses/video kaydı alınmaz**; otomatik telaffuz puanı yoktur. Kur'ân okuyuşunu
   hoca canlı dinler ve işaretler.
4. İman, ihlas, dindarlık **puanlanmaz**; veri modelinde böyle bir alan yoktur.
5. Kur'ân-ı Kerîm metni, âyet-i kerîmeler, Peygamber Efendimiz (sallallahü aleyhi ve
   sellem), sahâbe-i kirâm ve büyüklerimiz oyun unsuru, ceza, parçalama, bilmece veya
   yarışma malzemesi yapılmaz. Harf, hareke ve kelime tanıma etkinlikleri serbesttir.
6. Çocuklar arası sıralama, lider tablosu, "seri bozuldu" tarzı utandıran mekanik yoktur.
7. Onaysız içerik öğrenciye **yayımlanmaz**: her içerik `taslak → inceleme → onaylı → yayında`
   akışından geçer; öğrencinin gördüğü sürüm numarası kaydedilir.
8. Kur'ân ve ilmihal ilerlemesi **bağımsız iki yoldur**; görüşme sayısıyla karıştırılmaz.
9. Hocaya 13. ve 15. dakikada yalnız hocanın gördüğü nazik hatırlatma çıkar; ders
   otomatik kesilmez. "Kaydet ve ilmihale geç" Kur'ân ilerlemesini yazar, sıradaki ilmihal
   içeriğini açar.
10. Bağlantı kesilince veya hoca değişince oturum, son kayıttan devam eder (prototipte
    `localStorage`, üründe sunucu).
11. MEB kaynakları yalnız **yöntem** için esastır; arayüzde, kitapta ve tanıtımda MEB
    onayı ima edilmez.

## Fazlar ve kabul ölçütleri

| Faz | İş | Kabul ölçütü |
|---|---|---|
| **0 — Harita** (bu klasör) | Anayasa, kod şeması, veri modeli, matris şablonu + 3 örnek, hoca ekranı prototipi | Vakıf okur, ölçüleri onaylar veya düzeltir |
| **1 — Uçtan uca 3 örnek** | `K-ELF-39`, `K-TCV-03`, `I-AKD-003`: kitap sayfası → karekod → etkinlik → canlı ders → kanıt kaydı | Hoca 2 dk'da derse hazır; kesinti sonrası kaldığı yerden devam; onaysız içerik yayında görünmüyor |
| **2 — Küçük pilot** | 15–20 öğrenci, 6 hafta, 3 hoca | Hoca hazırlık süresi, kanıt işaretleme süresi, veli geri bildirimi ölçülür |
| **3 — Tam program** | 3 modül × 96 ders, paneller, kılavuzlar, LMS bağlantıları | Brief'teki teslim listesi + devralma belgesi |

## Teknik kararlar (teklif; vakıf onayıyla kesinleşir)

- **Tek içerik kaynağı:** `icerik` tabloları → aynı veriden basılı kitap (IDML/PDF),
  dijital etkinlik ve öğretmen kılavuzu üretilir. Karabaş ve Elif cüzü sayfaları yeniden
  dizilmez; vakfın verdiği vektör sayfalar olduğu gibi kullanılır (hareke tutarlılığı).
- **Görüntülü ders:** LiveKit (açık kaynak WebRTC), Türkiye'de kendi sunucuda; kayıt kapalı.
- **Uygulama:** Postgres + Node/TypeScript (veya Django); arayüz statik HTML/JS,
  bu sitenin mevcut projeleriyle aynı dil.
- **Dışa aktarım:** LTI 1.3 (dış LMS'e ders açmak), xAPI/cmi5 (kanıt akışı), SCORM 1.2
  (paket teslimi).
- **Ekran:** 16:9 yatay esas; 4:3 tablet güvenli alan; dikey telefonda yalnız izleme.
- **Hukuk:** KVKK, çocuk verisi için veli rızası, veri yeri Türkiye; roller ayrı
  (öğrenci / veli / hoca / içerik onaycısı / yönetici).

## Klasör

```
mekteb/
  README.md                 bu dosya
  sema/icerik-kodu.md       içerik kod şeması
  sema/veri-modeli.sql      Postgres şeması (öğrenci, hoca, oturum, kazanım, kanıt, sürüm/onay)
  matris/_sablon.json       kaynak–kazanım–kanıt matrisinin alanları
  matris/K-ELF-39.json      Elifba örneği: hareke ve okuma
  matris/K-TCV-03.json      Tecvid örneği: Medd-i tabîî (Karabaş ders 03)
  matris/I-AKD-003.json     İlmihal örneği: Allahü teâlâ birdir
  ders-odasi/index.html     hoca ders odası prototipi (15 dk Kur'ân + 10 dk ilmihal)
  ders-odasi/veri.js        Karabaş metinleri, dersler.json'dan harfi harfine
```

## Mevcut malzeme (siteden devralınan)

- `/karabas-elifbasi` — 40 ders, kalıcı karekod hedefleri (`?d=01…40`), Osmanlıca
  Karabaş metinleri. **Kur'ân yolunun iskeleti.**
- `/islami-egitim` — 1021 kazanım (akaid, ibadet, ahlâk, siyer…), seviye ve profil
  etiketli. **İlmihal yolunun ham kazanım havuzu;** vakıf kaynaklarına göre süzülüp
  yeniden yazılacak.
- `/hizli-hafiz`, `/namaz-yolu`, `/dkab`, `/ogrenim` — etkinlik ve sunum örnekleri.
