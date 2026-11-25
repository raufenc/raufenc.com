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
  "amac": "Hangi modern tuzaklara daha açık olduğunu gösterir",
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
  "amac": "Açlıktan mı, keyiften mi yediğini ayırt etmeni sağlar",
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
  "amac": "Ekranın dikkatini, kıyaslarını ve ruh hâlini nasıl etkilediğini ölçer",
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
  "amac": "Neden ertelediğini bulmana yardım eder",
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
  "amac": "Çevrenin seni destekleyip desteklemediğini gösterir",
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
  "amac": "Baskın hareket tarzını fark etmeni sağlar",
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
  "amac": "Kültürel eğilimini fark etmeni sağlar",
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
  "amac": "Anne baba olarak yaklaşımını görünür kılar",
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
  "amac": "Ergenlikteki ödül, risk ve arkadaş baskısını görünür kılar",
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
  "amac": "Üç ana dürtüden hangisinin sende baskın olduğunu bulur",
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
  "amac": "Kitaptaki kavramları ne kadar bildiğini ölçer",
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
  "amac": "Her bölümü okuduktan sonra öğrendiğini pekiştirir",
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
  "amac": "Kitabın sende neyi değiştirdiğini gösterir",
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
  "amac": "Ramazan'da kazandığın ritmi yılın geri kalanına taşıyıp taşımadığını gösterir",
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
  "amac": "Hızlı ve derin haz kaynaklarını ayırt etmene yardım eder",
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
  "amac": "Hayatındaki rol modelleri ve ilham kaynaklarını görmeni sağlar",
  "tema": "Rol modeller / çevre / ilham",
  "mekanik": "10",
  "soruSayisi": "Peygamber, sahabi, âlim, bilim farkındalık skoru",
  "sure": "Güçlü İlham Ağı / Gelişen / Boş Alan / Acil Keşif",
  "slug": "test-16"
 }
];
