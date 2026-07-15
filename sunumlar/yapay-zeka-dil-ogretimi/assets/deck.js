/* Sunum verisi: bölümler, plan ve konuşmacı notları (40 slayt) */
const DECK = {
  N: 40,
  SECTIONS: [
    { name: "Açılış",                        start: 1,  min: 0  },
    { name: "1 · Haz ve Hız Çağı",           start: 3,  min: 3  },
    { name: "2 · Muallim ve Makine",         start: 8,  min: 11 },
    { name: "3 · Yapay Zekâ Nasıl Düşünür?", start: 16, min: 24 },
    { name: "4 · Prompt: Muavini Çalıştırmak", start: 23, min: 36 },
    { name: "5 · Sarf, Nahiv ve Prompt",     start: 29, min: 46 },
    { name: "Kapanış",                       start: 37, min: 56 }
  ],
  TOTALMIN: 60,
  NOTES: [
"Selamlama — tek nefeste üç vaat: bu aleti <b>kabulleneceğiz</b>, <b>ölçüsünü</b> öğreneceğiz, <b>felsefesini</b> kavrayacağız. “Size araç listesi değil, bakış açısı vereceğim.”",
"Buz kırıcı (30 sn): “Son gün, ilk saat — bu bir sunum değil; <b>pedagojik dayanıklılık testi</b>.” Gülümseme alın, başlayın.",
"Tespit: dikkat kısa, beklenti yüksek, tempo baş döndürücü. Suçlamıyoruz, tarif ediyoruz. Yapay zekâ bu iklimin aracı: <b>hazzı kolaylaştırdı, hızı artırdı</b>.",
"İlk <b>ölçü</b> — terazi: aynı alet sabırsızlık da üretir, motivasyon da. Fark alette değil, <b>kullanan elin niyetinde ve ölçüsünde</b>. Seminerin omurga cümlesi.",
"Aynaya bakma anı: derslerimiz niçin lezzetsiz ve yavaş göründü? Tek yönlü anlatım, az görsel, geç geri bildirim… “<b>Değişim mümkün.</b>”",
"Cevabımız tek kelime: <b>LEZZET</b> — hikâyeleştireceğiz, görselleştireceğiz, oyunlaştıracağız, konuşturacağız, merak uyandıracağız.",
"Bölüm kapanışı — çağrı: “Haz çağında lezzeti, hız çağında akıcılığı artırmak <b>bizim elimizde</b>.” Köprü: “Ama dürüst soru: bu alet bizi işimizden mi edecek?”",
"Soruyu salona sorun ve <b>10 saniye susun</b>: “Yapay zekâ Arapça öğretmenini bitirecek mi?” El kaldırtın. Cevap bölüm sonunda.",
"Ana tez: <b>Tercüme memurluğu bitti</b>; muallimlik daha önemli oldu. Makine “ne demek?”e cevap verir; muallim “<b>ne mana taşır?</b>” sorusunu açar.",
"Kanıt — tek örnek yeter: <b>كَيْفَ حَالُكَ</b> = “Nasılsın?” Tercüme düzeyi makinede. Muallimlik düzeyi: kim, kime, hangi ortamda, hangi tonla?",
"Derinlik: Arapça yalnızca yabancı dil değildir — <b>metin, ibadet ve hafıza, medeniyet, komşuluk, edep dili</b>. Sorumluluğumuz bir dil dersinden büyük.",
"Bölümün cevabı: <b>Yerine geçmez; muavin olur.</b> Tahtaya yazılacak cümle: “<b>AI hız verir; muallim yön verir.</b>”",
"İş bölümünün makine tarafı: kelime listesi, sadeleştirme, örnek, diyalog, soru, rubrik, hareke… <b>Angarya listesi</b> — gönül rahatlığıyla devredin.",
"İş bölümünün insan tarafı: hâl okumak, iklim kurmak, hata korkusunu azaltmak, değerle ilişkilendirmek. <b>Bunların hiçbirinin promptu yok.</b>",
"Karikatür (15 sn) — bölüm özeti tek cümle: “<b>Robot koşturur, muallim yetiştirir.</b>” Köprü: “Peki bu muavin nasıl düşünüyor? Kaputu açıyoruz.”",
"Seminerin <b>felsefi kalbi</b>. Kabullenmek için tanımak gerekir. Üç kelime: <b>örüntü</b> işler, <b>bağlama</b> bakar, <b>tahmin</b> eder. İnsan gibi hissetmez.",
"Adım 1 — metni nasıl görür: parçalara böler (token). <b>الطَّالِبُ يَقْرَأُ الْكِتَابَ</b> cümlesinin parçalanışını gösterin — sarf hocaları gülümsesin.",
"Adım 2 — meşhur denklem: <b>kral − erkek + kadın = kraliçe</b>. Model harfi değil, <b>ilişkiyi</b> öğrenir. “Vay” sesini bekleyin.",
"<b>AHA slaydı</b>: “Sarf zaten bunu yıllardır yapıyor.” <b>ك-ت-ب</b> → kitap, yazan, yazıhane, kütüphane: kök + kalıp + anlam. Sarf hocası bu çağa en hazırlıklı meslek.",
"Adım 3 — bağlam manayı belirler: “yüz” üç cümlede üç anlam; <b>عين</b> göz de, pınar da, casus da. “<b>Kelimeden çok, cümle konuşur.</b>”",
"Adım 4 — yazar gibi görünür, aslında <b>tahmin eder</b>: her adımda en olası devam. Sihir yok, olasılık var.",
"Ölçünün kaynağı — altını çizin: “<b>Bu bir şuur değil; istatistiksel öğrenmedir.</b>” Hata eder, uydurabilir → çıktı daima muallim kontrolünden geçer. Köprü: tahmini yöneten şey ne? <b>Prompt.</b>",
"Tanım: <b>Prompt = öğretmenin pedagojik aklını makineye tarif etmesi.</b> Komut değil; sınıf + hedef + bağlam + ölçme içeren görev tanımı.",
"Kötü örnek — güldürerek öğretin: “7. sınıf için Arapça ders hazırla.” Seviye? Süre? Ölçme? “<b>Bu prompt değil; temenni.</b>”",
"Karikatür (15 sn) — yerel espri: “<b>Mersin sıcak, prompt serin.</b>” Köprü: “Şehrinizin adını formül yaptık…”",
"<b>MERSİN Formülü</b> — ezberletin: Maksat • Eşik • Rol • Sınır • İlişki • Netice. <b>Sınır</b> ve <b>Netice</b>: ölçünün prompt'a yazılmış hâli.",
"Formülün ete kemiğe bürünmüş hâli — tam örnek prompt. Yavaş okuyun; <b>fotoğraflatın</b>.",
"Köprü: iyi prompt önemli <b>ama sıfırdan başlamak şart değil</b>. En iyi başlangıç bazen güzel bir örnektir: örnek → kalıp → yeni ders.",
"Atölyenin özü — <b>tersine mühendislik</b>: iyi örneğin gizli kalıbını çıkarmak. Kopyalamak değil; mimarisini anlamak, kendi bağlamında sentezlemek.",
"Vecizeyi yavaş okuyun: Sarf kelimenin kalıbını, Nahiv cümlenin düzenini, Prompt öğretim tasarımının kalıbını görür. “<b>Prompt, yapay zekâ çağının öğretim nahvidir.</b>”",
"<b>Ölçü: Kopya değil, kalıp transferi.</b> Yanlış: “Bunu aynen yap.” Doğru: “İlkeleri çıkar, yeni bağlama uyarla.” Metni değil, tasarım mantığını taşı.",
"Vaka — canlı anlatın: <b>Eksik Bilgi Kartları</b>. A'da ürün var fiyat yok, B'de tersi; öğrenciler <b>كَمْ هٰذَا؟</b> ile konuşmak zorunda. Gerçek iletişim ihtiyacı sınıfa girdi.",
"Vakanın röntgeni — neden çalışıyor? Gerçek ihtiyaç, destekli üretim, bağlam içinde kalıplar, eş çalışması, doğal ölçme, saygı. <b>Çıkarılacak kalıp bu altı ilke.</b>",
"Uygulama — YZ'ye talimat: “<b>Bunu kopyalama</b>; tasarım mantığını analiz et, gizli yapıyı çıkar, iskelet üret, <b>benim bağlamıma</b> sentezle.” Reçeteler Tersine Mühendislik sayfasında.",
"Meyve: aynı kalıp + yeni bağlam = <b>Pazar Kartları</b> dersi. Taklit değil, <b>tevarüs</b>.",
"TYMM bağı: slogan değil — alan becerisi, değer, sosyal-duygusal boyut, eylem <b>etkinliğin içinde</b> yaşar.",
"Kapanış başlıyor — her şey tek görselde: <b>öğretmenin yeni atölyesi</b>, 8 adımlı döngü. <b>Kontrol et</b> adımını vurgulayın. “YZ öğretmenin atölyesini büyütür.”",
"<b>Üç Ölçü</b> — tane tane okuyun: şuur değil istatistik / muavin, muallim değil / kopya değil, kalıp. Bu slayt fotoğraflanmak içindir; bekleyin.",
"Final manifestosu — yavaş, vurgulu: “Tercüme memurluğu bitti. Arapça muallimliği aslına döndü. <b>Makine kelimeyi çevirebilir; insanı anlamla ancak insan tanıştırır.</b>”",
"Teşekkür + iletişim: <b>@raufenc</b> • raufenc.com. Kapanış: “Aleti kabullendik, ölçüsünü kuşandık, felsefesini kavradık — gerisi atölyede.”"
  ]
};
DECK.secOf = n => { let s = DECK.SECTIONS[0]; for (const x of DECK.SECTIONS) { if (n >= x.start) s = x; } return s; };
DECK.planMinAt = n => { /* bu slayta gelinmesi planlanan dakika (bölüm içinde doğrusal) */
  const S = DECK.SECTIONS;
  for (let i = 0; i < S.length; i++) {
    const s = S[i], nx = S[i + 1];
    const end = nx ? nx.start : DECK.N + 1, endMin = nx ? nx.min : DECK.TOTALMIN;
    if (n >= s.start && n < end) return s.min + (endMin - s.min) * (n - s.start) / (end - s.start);
  }
  return 0;
};
