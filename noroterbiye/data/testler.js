const TESTLER_DATA = [
 {
  "id": "ID",
  "ad": "Ad",
  "kitle": "Kitle",
  "amac": "Amaç",
  "tema": "Tema",
  "mekanik": "Soru Sayısı",
  "soruSayisi": "Skorlama",
  "sure": "Sonuç Tipleri",
  "slug": "id"
 },
 {
  "id": "TS01",
  "ad": "Modern Hile Risk Radarı",
  "kitle": "Genel",
  "amac": "Kullanıcının hangi modern tuzaklarda daha kırılgan olduğunu göstermek",
  "tema": "Yemek, ekran, oyun, para, müzik, sosyal medya",
  "mekanik": "24",
  "soruSayisi": "6 alt boyut + genel risk skoru",
  "sure": "Düşük / Orta / Yüksek + 3 öneri",
  "slug": "test-01"
 },
 {
  "id": "TS02",
  "ad": "Hedonik Açlık Testi",
  "kitle": "Genel",
  "amac": "Açlık ile zevk için yeme arasındaki farkı görünür kılmak",
  "tema": "Yemek / şeker / kola",
  "mekanik": "12",
  "soruSayisi": "Yeme tetikleyicileri ve duygusal yeme skoru",
  "sure": "Fizyolojik ağırlıklı / Karışık / Hedonik ağırlıklı",
  "slug": "test-02"
 },
 {
  "id": "TS03",
  "ad": "Ekran Baskısı Testi",
  "kitle": "Genç + Yetişkin",
  "amac": "Ekranların dikkat, kıyas ve duygusal dalgalanma etkisini ölçmek",
  "tema": "Ekran / reklam / dizi-film / sosyal medya",
  "mekanik": "18",
  "soruSayisi": "Dikkat, kıyas, kaçış, tetiklenme alt puanları",
  "sure": "Pasif izleyici / Dalgalı kullanıcı / Yüksek maruziyet",
  "slug": "test-03"
 },
 {
  "id": "TS04",
  "ad": "Savsaklama Profili",
  "kitle": "Genç + Öğrenci + Profesyonel",
  "amac": "Ertelemenin altında yatan nedeni ayırmak",
  "tema": "Savsaklama / stres / korku",
  "mekanik": "16",
  "soruSayisi": "Korku, dağınıklık, aşırı hedef, düşük enerji alt skorları",
  "sure": "Mükemmeliyetçi erteleme / Dağınık erteleme / Yorgun erteleme",
  "slug": "test-04"
 },
 {
  "id": "TS05",
  "ad": "Çevre Etkisi Skoru",
  "kitle": "Genel",
  "amac": "Kullanıcının çevresinin onu destekleyip desteklemediğini göstermek",
  "tema": "Arkadaş, aile, mentor, dijital çevre",
  "mekanik": "15",
  "soruSayisi": "Destek, geri bildirim, rol model, riskli ortam puanları",
  "sure": "Güçlü ağ / Karışık ağ / Yalnız mücadele",
  "slug": "test-05"
 },
 {
  "id": "TS06",
  "ad": "Mizaç ve Kimya Mini Testi",
  "kitle": "Genel",
  "amac": "Kişinin baskın hareket tarzına dair farkındalık oluşturmak",
  "tema": "Mizaç / dopamin-serotonin dengesi",
  "mekanik": "18",
  "soruSayisi": "Arayış, düzen, görünürlük, güven eksenleri",
  "sure": "Merak odaklı / Güven odaklı / Uyum odaklı / Başarı odaklı",
  "slug": "test-06"
 },
 {
  "id": "TS07",
  "ad": "Bireyci mi Kolektivist mi?",
  "kitle": "Genel",
  "amac": "Kültürel eğilim farkındalığı oluşturmak",
  "tema": "Doğulu / Batılı nefs",
  "mekanik": "12",
  "soruSayisi": "Bireyci ve kolektivist puan",
  "sure": "Baskın bireyci / Baskın kolektivist / Dengeli",
  "slug": "test-07"
 },
 {
  "id": "TS08",
  "ad": "Ebeveynlik Tarzı Farkındalık Testi",
  "kitle": "Ebeveyn",
  "amac": "Ebeveynlik yaklaşımını görünür kılmak",
  "tema": "Otoritatif, otoriter, serbest, ihmalkâr",
  "mekanik": "20",
  "soruSayisi": "4 stil skoru",
  "sure": "Baskın stil + dengeleme önerileri",
  "slug": "test-08"
 },
 {
  "id": "TS09",
  "ad": "Genç Nefs Risk Radarı",
  "kitle": "Genç",
  "amac": "Ergenlikte ödül, risk ve çevre baskısını görünür kılmak",
  "tema": "Genç beyni",
  "mekanik": "18",
  "soruSayisi": "Risk iştahı, çevre etkisi, ekran/oyun, savsaklama puanları",
  "sure": "Sakin rota / Dalgalı rota / Yüksek hız modu",
  "slug": "test-09"
 },
 {
  "id": "TS10",
  "ad": "Şehvet-Şöhret-Gadab Check-up",
  "kitle": "Okuyan",
  "amac": "Üç ana dürtüde baskın alanı bulmak",
  "tema": "Dopamin / serotonin / kortizol",
  "mekanik": "21",
  "soruSayisi": "3 temel dürtü skoru",
  "sure": "Arzu baskın / Statü baskın / Stres baskın / Dengeli",
  "slug": "test-10"
 },
 {
  "id": "TS11",
  "ad": "Kısa Kavram Quizleri",
  "kitle": "Genel",
  "amac": "Sözlük bilgisini ölçmek",
  "tema": "Temel kavramlar",
  "mekanik": "10",
  "soruSayisi": "Doğru sayısı",
  "sure": "Yeni başlayan / Yolda / Hakim",
  "slug": "test-11"
 },
 {
  "id": "TS12",
  "ad": "Bölüm Sonu Quizleri",
  "kitle": "Okuyan",
  "amac": "Her bölümü okuduktan sonra bilgiyi pekiştirmek",
  "tema": "Kitabın tüm bölümleri",
  "mekanik": "8-12 / bölüm",
  "soruSayisi": "Bölüm içi başarı yüzdesi",
  "sure": "Öğrenildi / Gözden geçirilmeli",
  "slug": "test-12"
 },
 {
  "id": "TS13",
  "ad": "Okuma Öncesi / Sonrası Fark Testi",
  "kitle": "Okumayan + Okuyan",
  "amac": "Kitabın etkisini görünür kılmak",
  "tema": "Farkındalık dönüşümü",
  "mekanik": "14",
  "soruSayisi": "Önce-sonra karşılaştırmalı öz değerlendirme",
  "sure": "Düşük değişim / Belirgin değişim / Yüksek değişim",
  "slug": "test-13"
 },
 {
  "id": "TS14",
  "ad": "Ramazan Sonrası Sürdürülebilirlik Testi",
  "kitle": "Aile + Genel",
  "amac": "Ramazan'da oluşan ritmin yılın geri kalanına taşınıp taşınmadığını görmek",
  "tema": "Ramazan / çevre / ritim",
  "mekanik": "12",
  "soruSayisi": "Ritim, aile birliği, ibadet düzeni skoru",
  "sure": "Geçici ivme / Kısmi devam / Kalıcı ritim",
  "slug": "test-14"
 },
 {
  "id": "TS15",
  "ad": "Dopamin Kaynak Haritası",
  "kitle": "Genel",
  "amac": "Kullanıcının hızlı ve derin haz kaynaklarını ayırmasına yardım etmek",
  "tema": "Haz kaynakları",
  "mekanik": "16",
  "soruSayisi": "Hızlı dopamin / derin anlam / bağ / başarı ekseni",
  "sure": "Hızlı ödül ağırlıklı / Karışık / Derinlik ağırlıklı",
  "slug": "test-15"
 },
 {
  "id": "TS16",
  "ad": "Rol Model Farkındalık Testi",
  "kitle": "Genel",
  "amac": "Hayatındaki rol model farkındalığını ve ilham ağını ölçmek",
  "tema": "Rol modeller / çevre / ilham",
  "mekanik": "10",
  "soruSayisi": "Peygamber, sahabi, âlim, bilim farkındalık skoru",
  "sure": "Güçlü İlham Ağı / Gelişen / Boş Alan / Acil Keşif",
  "slug": "test-16"
 }
];
