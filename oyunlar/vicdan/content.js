/* ============================================================
   VİCDAN — İçerik Dosyası (Hayal Ortaokulu)
   ÖĞRETMENLER İÇİN: Yeni kart eklemek için "kartlar" dizisine yeni bir satır
   ekleyin: {id:"x99", bolum:1-5, karakter:"kadrodan bir id", metin:"...",
   sol:{etiket, sonuc, vicdan, arkadaslik, aile, ozguven}, sag:{...}}.
   Stat değerleri -18 ile +18 arasında kalmalı; "id" benzersiz olmalı.
   Bir seçeneğe flag:"adSoyad" eklerseniz, kosul:"adSoyad" yazan kart yalnız
   o seçim yapılmışsa desteye girer (vicdanın geçmişi hatırlaması için).
   Karakter id'leri: ogretmen, mudur, rehber, anne, baba, kardes, dede, emir,
   zeynep, elif, burak, selim, kantinci, bakkal, komsu, hademe.
   ============================================================ */

const ICERIK = {
  oyunAdi: "Vicdan",

  bolumler: [
    {
      no: 1,
      ad: "Dürüstlük",
      giris: "Hayal Ortaokulu'nda yeni bir hafta başlıyor. Küçük bir yalan bazen kocaman bir çantadan daha ağırdır. Bakalım bu hafta çantanda ne taşıyacaksın?",
      kupe: { soz: "Doğruluk iyiliğe götürür, iyilik de cennete götürür.", kaynak: "Hadis-i şerif (Buhârî ve Müslim)", kisaKaynak: "Buhârî, Edeb 69" }
    },
    {
      no: 2,
      ad: "Kul Hakkı",
      giris: "Kul hakkı görünmez bir çizgidir: sıradaki yerin, bir emeğin, hatta bir dilim kekin bile sahibi var. Bu hafta o çizgiye basmadan yürümeyi deneyeceksin.",
      kupe: { soz: "Müslüman, elinden ve dilinden emin olunan kimsedir.", kaynak: "Hadis-i şerif (Buhârî)", kisaKaynak: "Buhârî, Îmân 4" }
    },
    {
      no: 3,
      ad: "Adalet",
      giris: "Adalet bir terazidir: bir kefesine arkadaşını, öbürüne doğruyu koyunca iş zorlaşır. Bu hafta terazi senin elinde. Elin titreyecek, orası kesin.",
      kupe: { soz: "Hiçbiriniz kendisi için istediğini kardeşi için de istemedikçe iman etmiş olmaz.", kaynak: "Hadis-i şerif (Buhârî ve Müslim)", kisaKaynak: "Buhârî, Îmân 7" }
    },
    {
      no: 4,
      ad: "Sabır ve Öfke",
      giris: "Öfke bir kibrit gibidir: çakması bir saniye, söndürmesi bazen haftalar sürer. Bu hafta herkesin cebinde bir kutu kibrit var. Bakalım kim çakacak?",
      kupe: { soz: "Gerçek pehlivan, güreşte rakibini yenen değil, öfkelendiği zaman kendine hâkim olandır.", kaynak: "Hadis-i şerif (Buhârî ve Müslim)", kisaKaynak: "Buhârî, Edeb 76" }
    },
    {
      no: 5,
      ad: "Cömertlik ve Fedakârlık",
      giris: "Cömertlik cüzdanla değil, yürekle ölçülür. Bazen bir tostun yarısı, bazen bir cumartesi sabahıdır. Bu hafta bakalım sen neyi bölüşeceksin?",
      kupe: { soz: "Veren el, alan elden üstündür.", kaynak: "Hadis-i şerif (Buhârî ve Müslim)", kisaKaynak: "Buhârî, Zekât 18" }
    }
  ],

  kartlar: [

    /* ---------- BÖLÜM 1: DÜRÜSTLÜK ---------- */

    {
      id: "d01", bolum: 1, karakter: "ogretmen",
      metin: "Nazan Öğretmen sınav kağıtlarını dağıttı. Puanları topluyorsun: yanlışlıkla 10 puan fazla vermiş. Kimsenin haberi yok.",
      sol: { etiket: "Sesimi çıkarmam", sonuc: "Not güzel görünüyor ama kağıda her bakışında o 10 puan sana bakıyor.", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: 4 },
      sag: { etiket: "Öğretmene söylerim", sonuc: "Nazan Öğretmen şaşırır: 'Sınıfta bir dürüstlük kahramanı varmış.' Emir 'notunu düşürttün, inanamıyorum' der.", vicdan: 12, arkadaslik: -3, aile: 0, ozguven: 3 }
    },
    {
      id: "d02", bolum: 1, karakter: "emir", tartisma: true,
      metin: "Sınavın ortası. Emir gözleriyle yalvarıyor: kağıdını biraz kaydırmanı istiyor. Öğretmen pencereden bahçeye bakıyor.",
      sol: { etiket: "Kağıdımı açarım", sonuc: "Emir rahatlar, sana 'ömürlük borçluyum' işareti yapar. İçinde ince bir sızı.", vicdan: -10, arkadaslik: 8, aile: 0, ozguven: 0, flag: "kopyaVerdin" },
      sag: { etiket: "Kağıdımı kapatırım", sonuc: "Emir dudak büker. Teneffüste 'bencilsin' der; sen 'ikimiz için yapmadım' dersin ama duymaz.", vicdan: 10, arkadaslik: -8, aile: 0, ozguven: 3 }
    },
    {
      id: "d03", bolum: 1, karakter: "bakkal",
      metin: "Hasan Amca para üstünü verirken dalgın: elinde 5 lira fazla var. Kapıya kadar geldin, fark ettin.",
      sol: { etiket: "Cebe atarım", sonuc: "Beş lira cebe girer ama bir tuhaf ağır. Bozuk para bu kadar mı ağır olur?", vicdan: -12, arkadaslik: 0, aile: 0, ozguven: 4, flag: "paraUstuKaldi" },
      sag: { etiket: "Geri veririm", sonuc: "Hasan Amca gülümser: 'Sen bu mahallenin sigortasısın evlat.'", vicdan: 12, arkadaslik: 0, aile: 0, ozguven: 4 }
    },
    {
      id: "d04", bolum: 1, karakter: "anne",
      metin: "Salonda top oynarken annenin çiçekliğini devirdin. Kimse görmedi. Annen içeri girip soruyor: 'Bunu Tekir mi devirdi?'",
      sol: { etiket: "Kedi devirdi derim", sonuc: "Annen kediye söylenir. Tekir sana uzun uzun bakar: 'Gerçekten mi?'", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: -3 },
      sag: { etiket: "Ben kırdım derim", sonuc: "Annen önce kaşını kaldırır, sonra 'İtiraf ettiğin için sağ ol' der. Tekir'in itibarı kurtulur.", vicdan: 12, arkadaslik: 0, aile: 8, ozguven: 0 }
    },
    {
      id: "d05", bolum: 1, karakter: "kardes",
      metin: "Dün telefonda istemediğin bir davet için 'hastayım' demiştin. Yusuf duymuş. Şimdi soruyor: 'Ben de okul için hastayım diyebilir miyim? Sen dedin ama.'",
      sol: { etiket: "O farklıydı, karışma", sonuc: "Yusuf omuz silker ama aklının bir köşesine yazar. Yedi yaş, kocaman hafıza.", vicdan: -8, arkadaslik: 0, aile: -4, ozguven: 0 },
      sag: { etiket: "Hata ettim, diyemezsin", sonuc: "'Ben de yanlış yaptım, ikimiz de demeyelim' dersin. Yusuf ciddi ciddi el sıkışır.", vicdan: 10, arkadaslik: 0, aile: 7, ozguven: 0 }
    },
    {
      id: "d06", bolum: 1, karakter: "zeynep",
      metin: "Zeynep panoya astığın fotoğrafı herkese gösteriyor: 'Bunu sen mi çektin? Harika!' Ama fotoğrafı Elif çekmişti; sen sadece getirmiştin.",
      sol: { etiket: "Teşekkürleri kabul ederim", sonuc: "Alkışlar güzel geliyor. Bir tek Elif'in bakışları hariç.", vicdan: -10, arkadaslik: 2, aile: 0, ozguven: 6 },
      sag: { etiket: "Elif çekti derim", sonuc: "Elif kıpkırmızı olur ama gözleri parlar. Zeynep fotoğrafın altına Elif'in adını yazar.", vicdan: 10, arkadaslik: 4, aile: 0, ozguven: -4 }
    },
    {
      id: "d07", bolum: 1, karakter: "mudur",
      metin: "Bahçede cam kırıldı. Kemal Bey topu havaya kaldırmış: 'Bu kimin?' Top Emir'in. Emir yerin dibine girmiş, sana bakıyor.",
      sol: { etiket: "Bilmiyorum derim", sonuc: "Emir rahatlar ama Kemal Bey bütün okulun teneffüsünü kısaltır. Herkes cezalı.", vicdan: -6, arkadaslik: 8, aile: 0, ozguven: 0 },
      sag: { etiket: "Kendin söyle, derim", sonuc: "Emir'i dürtersin. Kekeleyerek öne çıkar. Kemal Bey 'İtiraf yiğitliktir' der; ceza yarıya iner.", vicdan: 10, arkadaslik: 2, aile: 0, ozguven: 3 }
    },
    {
      id: "d08", bolum: 1, karakter: "dede",
      metin: "Dede çayını karıştırıyor: 'Bir keresinde pazarcı bana fazla para verdi. Üç sokak geri yürüdüm. Sence değer miydi?'",
      sol: { etiket: "Üç sokak çok dede", sonuc: "Dede güler: 'Ayaklar yorulur evlat, ama vicdan dinlenir.' Çayından bir yudum alır.", vicdan: -5, arkadaslik: 0, aile: -2, ozguven: 2 },
      sag: { etiket: "Bence değerdi", sonuc: "Dede başını sallar: 'Sen anlamışsın.' O gün çayın yanına gizli çikolata çıkar.", vicdan: 6, arkadaslik: 0, aile: 4, ozguven: 0 }
    },
    {
      id: "d09", bolum: 1, karakter: "kantinci",
      metin: "Kantinde izdiham. İsmail Abi tostu verdi ama parayı almayı unuttu. Kalabalık seni kapıya doğru itiyor.",
      sol: { etiket: "Kalabalıkta kaynarım", sonuc: "Emir 'beleş tost' diye güler. Tost boğazından biraz zor geçer.", vicdan: -12, arkadaslik: 3, aile: 0, ozguven: 0 },
      sag: { etiket: "Dönüp öderim", sonuc: "İsmail Abi göz kırpar: 'Sen veresiye defterine değil, gönül defterine yazıldın.'", vicdan: 12, arkadaslik: -3, aile: 0, ozguven: 3 }
    },
    {
      id: "d10", bolum: 1, karakter: "ogretmen",
      metin: "Ödevi yapmadın. Nazan Öğretmen sıraların arasında ilerliyor, defterleri tek tek kontrol ediyor. Sıra sana geliyor.",
      sol: { etiket: "Evde unuttum derim", sonuc: "Öğretmen 'yarın getir' der. Kalbin küt küt: ya yarın da sorarsa?", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: -3 },
      sag: { etiket: "Yapmadım, derim", sonuc: "'Yarına tamamla' der, o kadar. Dünya dönmeye devam eder; sen rahat nefes alırsın.", vicdan: 10, arkadaslik: 0, aile: 0, ozguven: 4 }
    },
    {
      id: "d11", bolum: 1, karakter: "elif",
      metin: "Elif saçını kestirmiş, pek de iyi olmamış. Heyecanla soruyor: 'Nasıl olmuş?' Sınıf sessizce cevabını bekliyor.",
      sol: { etiket: "Harika olmuş derim", sonuc: "Elif sevinir. Sen 'küçücük bir yalandı' diye düşünürsün. Küçücük müydü sahi?", vicdan: -4, arkadaslik: 5, aile: 0, ozguven: 0 },
      sag: { etiket: "Nazikçe doğruyu söylerim", sonuc: "'Eskisi sana daha çok yakışıyordu bence' dersin. Elif bir an bozulur, sonra 'dürüstsün bari' der.", vicdan: 6, arkadaslik: -4, aile: 0, ozguven: 2 }
    },
    {
      id: "d12", bolum: 1, karakter: "emir",
      metin: "Emir mağazada çekildiği fotoğrafı 'yeni bisikletim' diye paylaşmış. Sana yazıyor: 'Sen de yorum yap: Oha, süper!'",
      sol: { etiket: "Yalanına ortak olurum", sonuc: "'Oha, süper!' yazarsın. Beğeniler yağar; ikinizin arasında bir yalan büyür.", vicdan: -8, arkadaslik: 5, aile: 0, ozguven: 0 },
      sag: { etiket: "Ortak olmam", sonuc: "Emir önce bozulur. Akşam mesaj gelir: 'Haklısın, sildim. Zaten selesi rahatsızdı.'", vicdan: 8, arkadaslik: -5, aile: 0, ozguven: 3 }
    },
    {
      id: "d13", bolum: 1, karakter: "hademe",
      metin: "Ramazan Amca koridorda yerden 50 lira almış, sana uzatıyor: 'Senin mi evlat? Buradan düştü galiba.' Senin değil.",
      sol: { etiket: "Benim derim", sonuc: "Para cebe girer. Ertesi gün Selim'in kayıp harçlığını aradığını duyarsın.", vicdan: -14, arkadaslik: 0, aile: 0, ozguven: -3 },
      sag: { etiket: "Benim değil", sonuc: "Ramazan Amca 'sahibini buluruz' der. Ertesi gün Selim'in yüzü gülüyor: harçlığı bulunmuş.", vicdan: 10, arkadaslik: 0, aile: 0, ozguven: 4 }
    },
    {
      id: "d14", bolum: 1, karakter: "anne",
      metin: "Sınavdan beklediğinden düşük bir not aldın. Akşam yemeğinde annen soruyor: 'Sınav sonucu açıklandı mı?'",
      sol: { etiket: "Daha açıklanmadı derim", sonuc: "Kağıt çantanın en dibine iner. Ama kağıtlar çantalarda sonsuza dek saklanamaz.", vicdan: -8, arkadaslik: 0, aile: -3, ozguven: -2, flag: "notuGizledin" },
      sag: { etiket: "Kağıdı gösteririm", sonuc: "Annen üzülür ama 'Birlikte çalışırız' der. Omuzlarındaki görünmez çanta yere iner.", vicdan: 10, arkadaslik: 0, aile: 7, ozguven: 0 }
    },

    /* ---------- BÖLÜM 2: KUL HAKKI ---------- */

    {
      id: "k01", bolum: 2, karakter: "emir",
      metin: "Kantin kuyruğu kapıya kadar. Emir en önden el sallıyor: 'Gel gel, yer tuttum!' Arkandaki herkes seni izliyor.",
      sol: { etiket: "Öne kaynarım", sonuc: "Tostu ilk alanlardansın. Arkadan gelen homurtular tostun yanında garnitür.", vicdan: -8, arkadaslik: 4, aile: 0, ozguven: 0 },
      sag: { etiket: "Sıramı beklerim", sonuc: "Emir 'amma dürüstsün' diye söylenir. Arkandaki beşinci sınıflı sana kocaman gülümser.", vicdan: 8, arkadaslik: -4, aile: 0, ozguven: 2 }
    },
    {
      id: "k02", bolum: 2, karakter: "emir", tartisma: true,
      metin: "Emir kulağına eğiliyor: 'Burak eski okulundan uzaklaştırma almış diye duydum. Gruba yazıyorum, bomba haber!'",
      sol: { etiket: "Yaz, görsünler", sonuc: "Grup kahkahaya boğulur. Mesaj yayılır; Burak'ın sırtındaki görünmez yük büyür.", vicdan: -14, arkadaslik: 5, aile: 0, ozguven: 0, flag: "dedikoduYaydin" },
      sag: { etiket: "Bizi ilgilendirmez", sonuc: "'Doğru mu bilmiyoruz bile' dersin. Emir 'sıkıcısın' der ama telefonu cebine koyar.", vicdan: 12, arkadaslik: -5, aile: 0, ozguven: 3 }
    },
    {
      id: "k03", bolum: 2, karakter: "elif",
      metin: "Elif'ten emanet aldığın kitaba meyve suyu damlattın. Kocaman bir leke. Elif yarın kitabını istiyor.",
      sol: { etiket: "Lekeyi gizleyip veririm", sonuc: "Sayfayı hızlıca geçerken teslim edersin. Elif'in kitaplığında artık senin sırrın da duruyor.", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: -3, flag: "kitapSakladin" },
      sag: { etiket: "Gösterip özür dilerim", sonuc: "Elif önce içini çeker, sonra 'Kitaplar da yaşıyor işte' der. Aranızda bir şey sağlamlaşır.", vicdan: 10, arkadaslik: 3, aile: 0, ozguven: 0 }
    },
    {
      id: "k04", bolum: 2, karakter: "komsu",
      metin: "Saliha Teyze iki koca poşetle apartmanın önünde; asansör yine bozuk. Tam o anda Emir bağırıyor: 'Maç başlıyor, koş!'",
      sol: { etiket: "Maça koşarım", sonuc: "İlk gole yetişirsin. Saliha Teyze merdivenlerde mola vere vere çıkar.", vicdan: -8, arkadaslik: 5, aile: 0, ozguven: 0 },
      sag: { etiket: "Poşetleri taşırım", sonuc: "Maçta yerine başkası geçer ama Saliha Teyze'nin duası asansörden hızlı çıkar. Annen de duymuş, gururlu.", vicdan: 10, arkadaslik: -4, aile: 3, ozguven: 0 }
    },
    {
      id: "k05", bolum: 2, karakter: "kardes",
      metin: "Buzdolabında son dilim kek. Yusuf'la aynı anda gördünüz. Annen içeriden sesleniyor: 'Aranızda paylaşın!'",
      sol: { etiket: "Büyük parçayı kaparım", sonuc: "Yusuf küçük parçaya bakıp bakıp iç çeker. Kek boğazında büyür de büyür.", vicdan: -6, arkadaslik: 0, aile: -4, ozguven: 2 },
      sag: { etiket: "Ben bölerim, o seçsin", sonuc: "Eski usul adalet: bölen sen, seçen o. Yusuf tabii ki milimetrik büyük olanı seçer; gülersin.", vicdan: 8, arkadaslik: 0, aile: 5, ozguven: 0 }
    },
    {
      id: "k06", bolum: 2, karakter: "selim", tartisma: true,
      metin: "Kalemin tam sınav öncesi bitti. Selim tuvalette; sırasında yepyeni bir kalem seti duruyor. 'Bir tane alsam fark etmez ki...'",
      sol: { etiket: "Sessizce alırım", sonuc: "Kalem yazıyor ama sanki mürekkebi biraz buruk. Selim dönünce setini sayar gibi bakar.", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: -2 },
      sag: { etiket: "Dönünce isterim", sonuc: "Selim kalemi uzatırken ilk kez gülümser: 'İstediğin zaman.' Bugün biriyle ilk kez konuşmuş.", vicdan: 8, arkadaslik: 3, aile: 0, ozguven: 0 }
    },
    {
      id: "k07", bolum: 2, karakter: "burak",
      metin: "Teneffüste bakıyorsun: Burak senin topunla oynuyor. Sormamış, çantandan almış. Etraftakiler tepkini bekliyor.",
      sol: { etiket: "Topu kapar, iterim", sonuc: "Top sende ama ortam gerilir. Burak dişlerini sıkar, kimse kazanmaz.", vicdan: -6, arkadaslik: -4, aile: 0, ozguven: 3 },
      sag: { etiket: "Sorsaydın verirdim, derim", sonuc: "Burak duraksar. 'Pardon...' der. Kimse ona 'verirdim' dememiş galiba daha önce.", vicdan: 8, arkadaslik: 4, aile: 0, ozguven: 2 }
    },
    {
      id: "k08", bolum: 2, karakter: "baba",
      metin: "Baban fatura parası verdi: 'Yatır gel, üstü 15 lira artar.' Fatura ödendi, 15 lira elinde. Baban unutmuş gibi.",
      sol: { etiket: "Üstünü harçlık sayarım", sonuc: "Baban sormaz bile. Ama 'söz namustur' diyen sesi kulağında dolanır durur.", vicdan: -8, arkadaslik: 0, aile: -4, ozguven: 2 },
      sag: { etiket: "Üstünü aynen veririm", sonuc: "Baban parayı alır, sonra geri uzatır: 'Üstü sende kalsın aslanım. Ama artık hakkın olarak.'", vicdan: 8, arkadaslik: 0, aile: 6, ozguven: 0 }
    },
    {
      id: "k09", bolum: 2, karakter: "rehber",
      metin: "Murat Bey'in odasındasın. Telefonu çalınca dışarı çıkıyor. Masada açık bir dosya: üstünde Burak'ın adı yazıyor.",
      sol: { etiket: "Göz ucuyla okurum", sonuc: "İki satır okursun; keşke okumasaydın. Sır taşımak, çalınca hiç hafif değil.", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: -2 },
      sag: { etiket: "Başımı çeviririm", sonuc: "Camdan bahçeye bakarsın. Murat Bey dönünce dosyayı kapatır, sana 'sağ ol' gibi bakar.", vicdan: 8, arkadaslik: 0, aile: 0, ozguven: 4 }
    },
    {
      id: "k10", bolum: 2, karakter: "emir",
      metin: "Emir, Elif'in koridorda düşerken çekilmiş videosunu bulmuş: 'Çok komik, gruba atıyorum. İzin mi alacağız yani?'",
      sol: { etiket: "At, çok komik", sonuc: "Grup güler. Elif ertesi gün kimsenin yüzüne bakamaz. Komiklik kime komikti?", vicdan: -12, arkadaslik: 4, aile: 0, ozguven: 0 },
      sag: { etiket: "Elif'e sormadan olmaz", sonuc: "'Sen düşerken çekilse atar mıydın?' Emir durur, videoyu siler: 'İyi ki sordun.'", vicdan: 12, arkadaslik: -4, aile: 0, ozguven: 3 }
    },
    {
      id: "k11", bolum: 2, karakter: "dede",
      metin: "Dede akşam sorar: 'Bugün kimsenin görünmez çizgisine bastın mı bakalım?' Gözlüğünün üstünden bakıyor.",
      sol: { etiket: "Hatırlamıyorum dede", sonuc: "Dede 'Hatırlamamak da bir cevaptır' der, gazetesine döner.", vicdan: -3, arkadaslik: 0, aile: -2, ozguven: 0 },
      sag: { etiket: "Bir şey anlatacağım", sonuc: "Anlatırsın. Dede dinler, yargılamaz: 'Fark etmek, yolun yarısıdır evlat.'", vicdan: 6, arkadaslik: 0, aile: 5, ozguven: 0 }
    },
    {
      id: "k12", bolum: 2, karakter: "hademe",
      metin: "Son zil çaldı, sınıf savaş alanı: yerlerde kağıtlar, kalem açacağı kırıntıları. Herkes kapıya koşuyor. Ramazan Amca kapıda paspasıyla bekliyor.",
      sol: { etiket: "Ben atmadım, çıkarım", sonuc: "Doğru, sen atmadın. Ama Ramazan Amca'nın beli herkesin çöpüne eğiliyor.", vicdan: -6, arkadaslik: 2, aile: 0, ozguven: 0 },
      sag: { etiket: "İki dakika toplarım", sonuc: "Ramazan Amca görür: 'Senin gibiler oldukça süpürge bayram eder.' İkiniz de gülersiniz.", vicdan: 8, arkadaslik: 0, aile: 0, ozguven: 3 }
    },
    {
      id: "k13", bolum: 2, karakter: "zeynep",
      metin: "Sınıf pikniği. Zeynep meyve sularını dağıttı: kişi başı bir tane. Kutu neredeyse boş, kimse bakmıyor. Bir tane daha alsan?",
      sol: { etiket: "İkinciyi kaparım", sonuc: "En son gelen Selim'e su kalmaz. Elindeki ikinci kutunun tadı bir tuhaf.", vicdan: -8, arkadaslik: -2, aile: 0, ozguven: 0 },
      sag: { etiket: "Bir tane yeter", sonuc: "Son kutu Selim'e kalır. Kimse bilmez; bilmese de olur zaten.", vicdan: 6, arkadaslik: 0, aile: 0, ozguven: 2 }
    },
    {
      id: "k14", bolum: 2, karakter: "kagan",
      metin: "Koridorda kalabalık; Kağan'ın tekerlekli sandalyesinin önünde birkaç bisiklet çantası bırakılmış, geçecek yer daralmış. Onu görmezden gelip yürüyebilirsin, kimse fark etmez.",
      sol: { etiket: "Kenardan geçip giderim", sonuc: "Kağan çantaların arasında dönüp durur, zil çalar, hâlâ oradadır.", vicdan: -6, arkadaslik: 0, aile: 0, ozguven: 0 },
      sag: { etiket: "Çantaları kenara çekerim", sonuc: "İki saniye sürer. Kağan 'sağ ol' der geçerken; sen 'bir şey değil' dersin, gerçekten de değildir.", vicdan: 8, arkadaslik: 3, aile: 0, ozguven: 0 }
    },

    /* ---------- BÖLÜM 3: ADALET ---------- */

    {
      id: "a01", bolum: 3, karakter: "emir", tartisma: true,
      metin: "Teneffüs maçında hakem sensin. Emir ceza sahasında topu elle kesti. Tam göremeyen oldu ama sen gördün. Herkes sana bakıyor.",
      sol: { etiket: "Devam, derim", sonuc: "Emir'in takımı kazanır. Karşı takımdan biri 'hakem taraflı' diye söylenir; haksız da değil.", vicdan: -10, arkadaslik: 5, aile: 0, ozguven: -2 },
      sag: { etiket: "Penaltı veririm", sonuc: "Emir 'Ben senin arkadaşın değil miyim?' der. Maç biter; 'iyi hakemdin' demek zorunda kalır.", vicdan: 12, arkadaslik: -6, aile: 0, ozguven: 4 }
    },
    {
      id: "a02", bolum: 3, karakter: "ogretmen",
      metin: "Nazan Öğretmen grup sözcüsünü sana seçtiriyor. En çok emek veren Elif'ti; ama Emir de 'beni seç' diye kaş göz yapıyor.",
      sol: { etiket: "Emir'i seçerim", sonuc: "Emir havaya girer. Elif tek kelime etmez; etmemesi daha çok batıyor.", vicdan: -6, arkadaslik: 6, aile: 0, ozguven: 0 },
      sag: { etiket: "Elif'i seçerim", sonuc: "'En çok o çalıştı' dersin. Emir surat asar ama sınıftan itiraz çıkmaz: herkes biliyordu.", vicdan: 8, arkadaslik: -4, aile: 0, ozguven: 0 }
    },
    {
      id: "a03", bolum: 3, karakter: "selim",
      metin: "Beden dersinde takım kaptanısın. Seçim başladı; Selim yine en arkada, gözleri yerde. Onu hiç seçen olmadı bugüne dek.",
      sol: { etiket: "En iyileri seçerim", sonuc: "Takımın güçlü, maçı alırsınız. Selim kenardan izler; skoru kimse ona sormaz.", vicdan: -8, arkadaslik: 3, aile: 0, ozguven: 2, flag: "selimiEsGectin" },
      sag: { etiket: "İlk turda Selim'i seçerim", sonuc: "Selim şaşkınlıktan yerinden fırlar. Takım homurdanır; ama o gün Selim hayatının maçını çıkarır.", vicdan: 12, arkadaslik: -4, aile: 0, ozguven: 0 }
    },
    {
      id: "a04", bolum: 3, karakter: "burak", tartisma: true,
      metin: "Kantinde para kaybolmuş. Biri 'Kesin Burak almıştır' diyor; herkes başını sallıyor. Ama sen Burak'ın o saatte kütüphanede olduğunu gördün.",
      sol: { etiket: "Karışmam, uzak dururum", sonuc: "Burak'ın 'zaten hep ben' bakışı içine oturur. Sessizlik de bir oydur; sen oyunu kullandın.", vicdan: -12, arkadaslik: 0, aile: 0, ozguven: -3 },
      sag: { etiket: "Burak orada değildi, derim", sonuc: "Kalabalığa karşı konuşmak zor; sesin biraz titrer ama çıkar. Para sonra çantanın astarından çıkar.", vicdan: 14, arkadaslik: -2, aile: 0, ozguven: 4 }
    },
    {
      id: "a05", bolum: 3, karakter: "elif", tartisma: true,
      metin: "Nazan Öğretmen Elif'in ödevini kayıp sanıp düşük not verdi. Oysa Elif teslim ederken sen oradaydın. Elif itiraz edemiyor; sesi titriyor.",
      sol: { etiket: "Elif kendi halletsin", sonuc: "Elif bir şey diyemez, not öyle kalır. Sana bakışında bir soru var: 'Sen de mi?'", vicdan: -8, arkadaslik: -3, aile: 0, ozguven: 0 },
      sag: { etiket: "Parmak kaldırıp anlatırım", sonuc: "'Elif teslim etti, ben şahidim.' Ödev başka dosyadan çıkar. Elif'in bakışını ömrünce unutmazsın.", vicdan: 12, arkadaslik: 4, aile: 0, ozguven: 3, flag: "elifiSavundun" }
    },
    {
      id: "a06", bolum: 3, karakter: "mudur", tartisma: true,
      metin: "Koridorda iki kişi koşuyordu: Burak ve Emir. Kemal Bey sadece Burak'ı yakaladı. Sana soruyor: 'Yalnız mıydı?'",
      sol: { etiket: "Yalnızdı derim", sonuc: "Emir kurtulur, sana 'kardeşimsin' der. Cezayı tek başına yiyen Burak'ın bakışı ise ağır.", vicdan: -14, arkadaslik: 6, aile: 0, ozguven: 0 },
      sag: { etiket: "İkisi de koşuyordu", sonuc: "Emir kızarır ama ceza ikiye bölününce hafifler. Çıkışta mırıldanır: 'Doğrusu buydu galiba.'", vicdan: 12, arkadaslik: -8, aile: 0, ozguven: 2 }
    },
    {
      id: "a07", bolum: 3, karakter: "kardes",
      metin: "Yusuf'la kutu oyunu oynuyorsunuz. İki eldir kaybediyor, dudağı titremeye başladı. Bir sonraki eli bile bile verebilirsin.",
      sol: { etiket: "Bile bile yenilirim", sonuc: "Yusuf havalara uçar. Ama üçüncü oyunda hileyi sezer: 'Sen şakaan mı yenildin?!'", vicdan: -3, arkadaslik: 0, aile: 5, ozguven: 0 },
      sag: { etiket: "Kurallıca oynarım", sonuc: "Yusuf kaybedince dudak büker, sonra 'Bi daha!' der. Gerçek oyun daha tatlı; o da biliyor.", vicdan: 5, arkadaslik: 0, aile: -2, ozguven: 2 }
    },
    {
      id: "a08", bolum: 3, karakter: "anne",
      metin: "Oda ikinizindi, dağınıklık ikinizindi; ama annen sadece sana kızdı: 'Sen büyüksün!' İçinden itiraz fışkırıyor.",
      sol: { etiket: "Hep bana, diye bağırırım", sonuc: "Kapılar çarpılır. Haklıydın belki; ama bağırınca haklılığın da sesi kısılır.", vicdan: -4, arkadaslik: 0, aile: -6, ozguven: 2 },
      sag: { etiket: "Sakinken konuşurum", sonuc: "Akşam 'Anne, bu adil değildi' dersin. Annen durur: 'Haklısın. Yorgundum.' Konuşmak işe yararmış.", vicdan: 8, arkadaslik: 0, aile: 5, ozguven: 4 }
    },
    {
      id: "a09", bolum: 3, karakter: "hademe",
      metin: "Zeynep'in kulaklığı kayıp. Biri 'Temizlik yapan almıştır' diyor; ok Ramazan Amca'yı gösteriyor. Sen kulaklığın spor salonunda düştüğünü görmüştün.",
      sol: { etiket: "Lafa karışmam", sonuc: "Ramazan Amca o gün paspasını her zamankinden yavaş sürer. Suçlanmak, yorgunluktan beterdir.", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: -2 },
      sag: { etiket: "Gördüğümü söylerim", sonuc: "Kulaklık spor salonunda bulunur. Ramazan Amca çay ısmarlamak ister; çayı yok ama gülümsemesi kocaman.", vicdan: 12, arkadaslik: 0, aile: 0, ozguven: 3 }
    },
    {
      id: "a10", bolum: 3, karakter: "emir", tartisma: true,
      metin: "Grupta Selim'in konuşmasını taklit eden bir video dönüyor. Emir atmış. Herkes gülücük emojisi yağdırıyor. Sıra sende.",
      sol: { etiket: "Ben de gülerim", sonuc: "Akışa uyarsın. Selim ertesi gün derste hiç konuşmaz; taklit edilecek ses de kalmaz.", vicdan: -12, arkadaslik: 4, aile: 0, ozguven: 0 },
      sag: { etiket: "Bu alay, yazarım", sonuc: "'Komik değil, alay bu' yazarsın. Grup sessizleşir. Biri daha yazar: 'Katılıyorum.' Sonra biri daha.", vicdan: 14, arkadaslik: -6, aile: 0, ozguven: 4 }
    },
    {
      id: "a11", bolum: 3, karakter: "baba",
      metin: "Babanla pazardasınız. Satıcı, önündeki yaşlı teyzenin poşetine tezgah arkasından ezik meyveleri koyuyor. Baban görmedi, sen gördün.",
      sol: { etiket: "İşimize bakalım", sonuc: "Teyze ezik meyvelerle evine döner. Pazar kalabalık; vicdan da kalabalıkta kaybolur bazen.", vicdan: -8, arkadaslik: 0, aile: 0, ozguven: -2 },
      sag: { etiket: "Babama fısıldarım", sonuc: "Baban satıcıya sessizce bir şey söyler; teyzenin poşeti yenilenir. Dönüşte omzunu sıkar: 'Gözün aydınmış.'", vicdan: 10, arkadaslik: 0, aile: 4, ozguven: 0 }
    },
    {
      id: "a12", bolum: 3, karakter: "zeynep",
      metin: "Kural net: antrenmana geç kalan maçta oynayamaz. Burak yine geç kaldı. Zeynep sana danışıyor: 'Kural kuraldır, değil mi?'",
      sol: { etiket: "Kural herkese eşit", sonuc: "Burak oynamaz. Kural işledi; ama Burak'ın neden geç kaldığını hâlâ kimse bilmiyor.", vicdan: 0, arkadaslik: -4, aile: 0, ozguven: 3 },
      sag: { etiket: "Önce sebebini soralım", sonuc: "Meğer Burak kardeşini kreşe bırakıyormuş. Kural değil, çözüm konuşulur: ona esnek saat.", vicdan: 8, arkadaslik: 4, aile: 0, ozguven: 0 }
    },
    {
      id: "a13", bolum: 3, karakter: "kagan",
      metin: "Sınıf gezisi oylaması: bir grup eski kaleyi önerdi, ama girişi merdivenli; Kağan'ın tekerlekli sandalyesi çıkamaz. Diğer seçenek biraz daha sıradan ama herkes rahatça geziyor.",
      sol: { etiket: "Kaleyi öneririm, manzarası harika", sonuc: "Oylama kaleden yana çıkar. Gezi günü Kağan otobüste, sınıf fotoğrafını telefonundan izler.", vicdan: -8, arkadaslik: -4, aile: 0, ozguven: 2 },
      sag: { etiket: "Herkesin gezebileceği yeri öneririm", sonuc: "Kağan gezi boyunca ilk kez herkesle aynı fotoğrafta. 'Bu sefer dışarıda kalmadım' der, gülerek.", vicdan: 10, arkadaslik: 6, aile: 0, ozguven: 0 }
    },

    /* ---------- BÖLÜM 4: SABIR VE ÖFKE ---------- */

    {
      id: "s01", bolum: 4, karakter: "burak",
      metin: "Koridorda Burak omuz attı, kalemlerin yerlere saçıldı. Herkes döndü, bakıyor. Kulakların uğulduyor.",
      sol: { etiket: "Ben de iterim", sonuc: "İki itiş, bir kalabalık, bir 'müdüre gidiyorsunuz'. Kalemlerin hâlâ yerde.", vicdan: -8, arkadaslik: -4, aile: 0, ozguven: 3 },
      sag: { etiket: "Nefes alıp sorarım", sonuc: "'Bir şey mi var?' dersin. Burak duraklar: 'Pardon... dalgındım.' Yüzüne ilk kez bakarsın: yorgun.", vicdan: 10, arkadaslik: 0, aile: 0, ozguven: 4 }
    },
    {
      id: "s02", bolum: 4, karakter: "kardes",
      metin: "Bir haftadır uğraştığın proje maketinin üstüne Yusuf robot çizmiş. 'Güzelleştirdim!' diye gülümsüyor, elinde keçeli kalem.",
      sol: { etiket: "Köpürüp bağırırım", sonuc: "Yusuf ağlar, annen koşar, sen hâlâ öfkelisin. Maket ise hâlâ çizili.", vicdan: -8, arkadaslik: 0, aile: -6, ozguven: 0, flag: "yusufaBagirdin" },
      sag: { etiket: "Nefes alıp düzeltiriz", sonuc: "Robotu köşeye küçük bir imza gibi bırakırsınız. 'Ama bir daha sormadan asla' dersin; söz verir.", vicdan: 10, arkadaslik: 0, aile: 6, ozguven: 2 }
    },
    {
      id: "s03", bolum: 4, karakter: "baba",
      metin: "Baban kapıda: 'Süre doldu, tablet bana.' Ama takım maçının tam ortasındasın; çıkarsan arkadaşlarını yarı yolda bırakacaksın.",
      sol: { etiket: "Beş dakika, diye direnirim", sonuc: "Maç biter ama babanla aranda uzatmalar başlar. Tablet yine gider, üstüne bir de hafta eklenir.", vicdan: -5, arkadaslik: 3, aile: -5, ozguven: 0 },
      sag: { etiket: "Tamam baba, derim", sonuc: "Takım 'nereye gittin!' diye yazar. Baban şaşırır: 'Tartışmadan mı? Yarın on dakika bonus.'", vicdan: 6, arkadaslik: -3, aile: 6, ozguven: 0 }
    },
    {
      id: "s04", bolum: 4, karakter: "emir",
      metin: "Emir şakayı abarttı: herkesin içinde sana uyduruk bir lakap taktı, sınıf güldü. O hâlâ gülüyor, senin yüzün yanıyor.",
      sol: { etiket: "Zayıf noktasından vururum", sonuc: "Sen de onunkini söylersin. Sınıf yine güler; ama artık iki kişi kırgın, sıfır kişi kazançlı.", vicdan: -8, arkadaslik: -5, aile: 0, ozguven: 3 },
      sag: { etiket: "Sonra baş başa konuşurum", sonuc: "Teneffüste 'Bu hoşuma gitmedi' dersin. Emir afallar: 'Şakaydı... ama tamam, anladım.' Bir daha yapmaz.", vicdan: 10, arkadaslik: 4, aile: 0, ozguven: 5 }
    },
    {
      id: "s05", bolum: 4, karakter: "ogretmen",
      metin: "Nazan Öğretmen yorgun gününde konuşan sen sandı ve herkesin içinde seni azarladı. Oysa konuşan başkasıydı. Haksızlık damarına bastı.",
      sol: { etiket: "Anında ters cevap", sonuc: "Sınıf 'ooo' çeker; iki saniye kahraman olursun. Sonrası: özür, veli, uzun bir hafta.", vicdan: -6, arkadaslik: 3, aile: 0, ozguven: 3 },
      sag: { etiket: "Ders sonu anlatırım", sonuc: "Zil çalınca sakince anlatırsın. Öğretmen durur: 'Haklısın, özür dilerim.' Büyüklük bulaşıcıdır.", vicdan: 10, arkadaslik: 0, aile: 0, ozguven: 5 }
    },
    {
      id: "s06", bolum: 4, karakter: "emir",
      metin: "Oyunda biri sana olmadık bir laf yazdı. Parmakların klavyenin üstünde; kafanda cevabın on katı hazır.",
      sol: { etiket: "Bombayı yazarım", sonuc: "Mesaj gider, kavga büyür, gece yarısına kadar sürer. Kazanan: hiç kimse.", vicdan: -8, arkadaslik: -4, aile: 0, ozguven: 2 },
      sag: { etiket: "Telefonu bırakırım", sonuc: "Kalkar, bir bardak su içersin. Sabah yazmadığın mesaja bakarsın: iyi ki.", vicdan: 8, arkadaslik: 0, aile: 0, ozguven: 4 }
    },
    {
      id: "s07", bolum: 4, karakter: "anne",
      metin: "Sofrada yine karnabahar. Annen bütün gün ayakta; yemeği koyarken 'Biliyorum, sevmiyorsun' diyor, gözler yorgun.",
      sol: { etiket: "Yine mi bu, derim", sonuc: "Annen bir şey demez; tabağını alır. Sessizlik karnabahardan da soğuk.", vicdan: -5, arkadaslik: 0, aile: -6, ozguven: 0 },
      sag: { etiket: "Sessizce biraz yerim", sonuc: "Annen fark eder: 'Yarın senin sevdiğinden yapacağım.' Karnabahar bile buna değer.", vicdan: 5, arkadaslik: 0, aile: 6, ozguven: 0 }
    },
    {
      id: "s08", bolum: 4, karakter: "dede",
      metin: "Dede bahçede fide dikiyor: 'Bu fidan üç yıl meyve vermez. Yine de her hafta sular mısın?' Elinde ikinci kürek, sana bakıyor.",
      sol: { etiket: "Üç yıl mı, çok uzun", sonuc: "Dede güler: 'Acele üzüm, koruk kalır.' Küreği yine de bir gün sana bırakacak.", vicdan: -4, arkadaslik: 0, aile: -2, ozguven: 0 },
      sag: { etiket: "Sularım, beklerim", sonuc: "İlk sulamayı birlikte yaparsınız. 'Sabır da böyle bir şeydir' der Dede: 'Kökü görünmez, meyvesi görünür.'", vicdan: 6, arkadaslik: 0, aile: 4, ozguven: 0 }
    },
    {
      id: "s09", bolum: 4, karakter: "kantinci",
      metin: "İsmail Abi bugün tek başına; sipariş yağmuru altında senin tostu unuttu. Teneffüsün bitmesine üç dakika var.",
      sol: { etiket: "Söylenip çıkışırım", sonuc: "'Abi saat kaç oldu!' Herkes döner bakar. Tost gelir ama tadı kaçmıştır; ikinizin de.", vicdan: -6, arkadaslik: 0, aile: 0, ozguven: -2 },
      sag: { etiket: "Sakince hatırlatırım", sonuc: "'Kolay gelsin abi, sıra bendeydi.' İsmail Abi tostu çift kaşar yapar: 'Sabrın kaşarı bol olur.'", vicdan: 6, arkadaslik: 0, aile: 0, ozguven: 3 }
    },
    {
      id: "s10", bolum: 4, karakter: "selim",
      metin: "Selim sıranın kenarına takıldı ve senin suluboya kutun yere döküldü. Resmin ortasına mor bir göl. Selim taş kesilmiş, bekliyor.",
      sol: { etiket: "Gözün nerede, diye bağırırım", sonuc: "Selim kıpkırmızı olur, günlerce yanına yaklaşamaz. Mor göl kurur; kırgınlık kurumaz.", vicdan: -8, arkadaslik: -4, aile: 0, ozguven: 0 },
      sag: { etiket: "Olur böyle şeyler, derim", sonuc: "Birlikte toplarsınız. Ertesi gün sıranda küçük bir çikolata: üstünde 'özür' yazan bir not.", vicdan: 8, arkadaslik: 5, aile: 0, ozguven: 0 }
    },
    {
      id: "s11", bolum: 4, karakter: "baba",
      metin: "Babanla kuyruktasınız; adamın biri kaynak yaptı. Babanın kaşları çatıldı, burnundan soluyor. Sana dönüyor: 'Gördün mü şunu?'",
      sol: { etiket: "Gaz veririm", sonuc: "'Rezalet baba!' dersin; ikiniz birlikte köpürürsünüz. Kuyruk kısalmaz, tansiyon yükselir.", vicdan: -4, arkadaslik: 0, aile: 3, ozguven: 0 },
      sag: { etiket: "Kibrit sende kalsın baba", sonuc: "Baban önce şaşırır, sonra kahkaha atar: 'Bak sen, benim lafımı bana satıyor.' Sıra çabuk gelir.", vicdan: 8, arkadaslik: 0, aile: 4, ozguven: 2 }
    },
    {
      id: "s12", bolum: 4, karakter: "burak",
      metin: "Burak bahçe duvarının dibinde tek başına oturuyor. Yumrukları sıkılı, gözleri dolu. Kimse yaklaşmaya cesaret edemiyor.",
      sol: { etiket: "Uzak durur, karışmam", sonuc: "Zil çalar, herkes dağılır. Burak duvar dibinde biraz daha küçülür.", vicdan: -6, arkadaslik: 0, aile: 0, ozguven: -2 },
      sag: { etiket: "Yanına oturur, susarım", sonuc: "Beş dakika kimse konuşmaz. Sonra Burak 'Sağ ol' der. Bazen sabır, susmaktır.", vicdan: 10, arkadaslik: 5, aile: 0, ozguven: 0 }
    },
    {
      id: "s13", bolum: 4, karakter: "rehber",
      metin: "Murat Bey sınıfa 'öfke termometresi' dağıttı: kızınca doldurup nefes sayacaksın. Emir dalga geçiyor: 'Bunlar işe yaramaz.'",
      sol: { etiket: "Emir'e katılırım", sonuc: "Termometre çantanın dibine iner. Hafta içinde iki kez lazım olur; çantanın dibinde kalır.", vicdan: -4, arkadaslik: 3, aile: 0, ozguven: -2 },
      sag: { etiket: "Denemeden bilemem", sonuc: "Hafta sonunda termometrende üç 'söndürülmüş yangın' işareti var. Murat Bey'le kutlarsınız.", vicdan: 6, arkadaslik: 0, aile: 0, ozguven: 4 }
    },
    {
      id: "s14", bolum: 4, karakter: "ogretmen", ozelTip: "kader",
      metin: "Haftalardır çalıştığın sınav son anda idari bir kararla iptal edildi; yeni tarih üç hafta sonraya kaldı. Elinden hiçbir şey gelmiyor.",
      sol: { etiket: "Boşver", sonuc: "Bazı şeyler senin elinde değil; elinde olan, ona nasıl karşılık verdiğin.", vicdan: 0, arkadaslik: 0, aile: 0, ozguven: 0 },
      sag: { etiket: "Ne yapabilirim ki", sonuc: "Bazı şeyler senin elinde değil; elinde olan, ona nasıl karşılık verdiğin.", vicdan: 0, arkadaslik: 0, aile: 0, ozguven: 0 }
    },

    /* ---------- BÖLÜM 5: CÖMERTLİK VE FEDAKÂRLIK ---------- */

    {
      id: "c01", bolum: 5, karakter: "selim",
      metin: "Harçlığınla günün son tostunu kaptın. Selim parasını evde unutmuş; bir şey demiyor ama midesi konuşuyor: guruldayarak.",
      sol: { etiket: "Afiyetle yerim", sonuc: "Tost güzel; ama karşında aç duran biriyle yenince yarısı tadından oluyor.", vicdan: -8, arkadaslik: -2, aile: 0, ozguven: 0 },
      sag: { etiket: "Yarısını uzatırım", sonuc: "İsmail Abi görür, ikinize birer çay açar: 'Bölüşen büyür.'", vicdan: 10, arkadaslik: 5, aile: 0, ozguven: 0 }
    },
    {
      id: "c02", bolum: 5, karakter: "komsu",
      metin: "Cumartesi sabahı, tam maça çıkıyordun. Saliha Teyze kapıda: 'Evladım, eczaneye gidecek halim yok; ilaçlarım bitti.'",
      sol: { etiket: "Acelem var, derim", sonuc: "Maça tam vaktinde yetişirsin. Saliha Teyze pencereden yola bakar, bekler.", vicdan: -10, arkadaslik: 3, aile: 0, ozguven: 0 },
      sag: { etiket: "Eczaneye koşarım", sonuc: "İlk yarıyı kaçırırsın; Saliha Teyze'nin duası devre arasına sığmaz. Annen kapıda duymuş, gülümsüyor.", vicdan: 12, arkadaslik: -3, aile: 3, ozguven: 0 }
    },
    {
      id: "c03", bolum: 5, karakter: "kardes",
      metin: "Aylardır kulaklık için biriktiriyordun; para tamam. O akşam öğreniyorsun: Yusuf'un bisikletinin lastiği patlak, tamir parası harçlığını aşıyor, kimseye söyleyememiş.",
      sol: { etiket: "Kulaklığımı alırım", sonuc: "Senin paran, senin hakkın; bunu herkes bilir. Yusuf bisikletini balkonda parklı tutar.", vicdan: -3, arkadaslik: 0, aile: -2, ozguven: 3 },
      sag: { etiket: "Önce lastik", sonuc: "Kulaklık iki ay daha vitrinde bekler. Yusuf ilk turu senin adına atar; rüzgar ikinize de değer.", vicdan: 10, arkadaslik: 0, aile: 7, ozguven: 0 }
    },
    {
      id: "c04", bolum: 5, karakter: "elif",
      metin: "Elif sınıf kitaplığı kampanyası başlattı. Evdeki kitaplarına bakıyorsun: hiç okumadığın üç kitap var, bir de en sevdiğin o kitap.",
      sol: { etiket: "Okumadıklarımı veririm", sonuc: "Üç kitap kitaplığa girer; bu da bir iyilik. Sevdiğin kitap rafında rahat bir nefes alır.", vicdan: 3, arkadaslik: 2, aile: 0, ozguven: 0 },
      sag: { etiket: "En sevdiğimi de katarım", sonuc: "Elif kitabı görünce duraklar: 'Bunu mu? Emin misin?' O soruyu duymak bile güzel.", vicdan: 8, arkadaslik: 3, aile: 0, ozguven: 2 }
    },
    {
      id: "c05", bolum: 5, karakter: "emir",
      metin: "Zeynep kulağına fısıldıyor: 'Emir matematikten kalacak, sana söyleyemiyor ama yardım lazım.' Hafta sonu sinema planın var.",
      sol: { etiket: "Planım bozulmaz", sonuc: "Film güzeldi. Pazartesi Emir'in boş kağıda bakışı ise hiç güzel değil.", vicdan: -6, arkadaslik: -4, aile: 0, ozguven: 0 },
      sag: { etiket: "Cumartesi Emir'le çalışırım", sonuc: "Kapıda mahcup sırıtır: 'Sana dondurma borcum ömürlük.' Sınavdan geçer; dondurma çıkar.", vicdan: 10, arkadaslik: 6, aile: 0, ozguven: 0 }
    },
    {
      id: "c06", bolum: 5, karakter: "ogretmen", tartisma: true,
      metin: "Resim yarışmasında tek kontenjan kaldı. Nazan Öğretmen önceliği sana verdi. Ama Elif'in resmi... sen de gördün, bambaşka.",
      sol: { etiket: "Hakkımı kullanırım", sonuc: "Yarışmaya sen katılırsın; bu senin hakkındı, kimse kızamaz. Elif resmini dosyasına kaldırır.", vicdan: 0, arkadaslik: -2, aile: 0, ozguven: 4 },
      sag: { etiket: "Yerimi Elif'e bırakırım", sonuc: "Elif'in resmi il sergisine seçilir. İçinde küçük bir 'keşke ben' sızısı; üstünde büyük bir gurur.", vicdan: 8, arkadaslik: 4, aile: 0, ozguven: -3 }
    },
    {
      id: "c07", bolum: 5, karakter: "bakkal",
      metin: "Hasan Amca'nın kapısında yeni bir köşe: 'Askıda Ekmek'. Cebinde bir ekmek parası fazlası var; ama harçlık da kolay kazanılmıyor.",
      sol: { etiket: "Bu hafta olmaz", sonuc: "Para cebinde kalır; buna hakkın da var. Askı bugün biraz boş sallanır, o kadar.", vicdan: -3, arkadaslik: 0, aile: 0, ozguven: -2 },
      sag: { etiket: "Bir ekmek asarım", sonuc: "Ertesi gün askı boş: birinin sofrasında senin ekmeğin var ve kim olduğunu asla bilmeyeceksin. En güzel kısmı da bu.", vicdan: 8, arkadaslik: 0, aile: 0, ozguven: 3 }
    },
    {
      id: "c08", bolum: 5, karakter: "dede",
      metin: "Dede dolaptan iki atkı çıkarıyor: 'Biri senin. Öbürünü ne yapalım?' Aklına bahçe nöbetinde üşüyen Ramazan Amca geliyor.",
      sol: { etiket: "Yedek dursun bizde", sonuc: "Atkı dolapta beklemeye devam eder. Dolaplar sıcak tutmaz; boyunlar tutar.", vicdan: -3, arkadaslik: 0, aile: -2, ozguven: 0 },
      sag: { etiket: "Ramazan Amca'ya götürelim", sonuc: "Ramazan Amca atkıyı her sardığında 'dedene selam' diyecek. Bir selam zinciri kuruldu; halkası sensin.", vicdan: 8, arkadaslik: 0, aile: 5, ozguven: 0 }
    },
    {
      id: "c09", bolum: 5, karakter: "rehber",
      metin: "Murat Bey kütüphaneyi düzenlemek için gönüllü arıyor: bir haftalık teneffüsler feda. Zeynep çoktan yazıldı; sana bakıyor.",
      sol: { etiket: "Teneffüsümden olmam", sonuc: "Bahçe maçları devam eder. Kütüphane de bir hafta daha 'aranan kitap bulunamadı' modunda kalır.", vicdan: -3, arkadaslik: 2, aile: 0, ozguven: 0 },
      sag: { etiket: "Ben de yazılırım", sonuc: "Bir hafta sonra raflar ordu gibi dizili. Murat Bey ilk üyelik kartlarını uzatır: 001 Zeynep, 002 sen.", vicdan: 6, arkadaslik: 3, aile: 0, ozguven: 3 }
    },
    {
      id: "c13", bolum: 5, karakter: "kagan",
      metin: "Grup projesinde sunumu kimin yapacağını konuşuyorsunuz. Kağan 'ben de anlatmak isterim' diyor ama sınıf kürsüsüne çıkış rampasız, iki basamaklı.",
      sol: { etiket: "Başka biri anlatsın, daha kolay olur", sonuc: "Sunumu Zeynep yapar, iş akar gider. Kağan notlarını Zeynep'e fısıldar, ama sesi hiç duyulmaz.", vicdan: -6, arkadaslik: -2, aile: 0, ozguven: 0 },
      sag: { etiket: "Kürsüye değil, aramıza gelsin öğretmene söyleriz", sonuc: "Nazan Öğretmen düzeni değiştirir, sunum sınıfın ortasında yapılır. Kağan ilk kez kürsüsüz de olsa herkesin gözünün içine bakarak anlatır.", vicdan: 10, arkadaslik: 6, aile: 0, ozguven: 0 }
    },
    {
      id: "c10", bolum: 5, karakter: "anne",
      metin: "Annen bugün fazladan mesai yaptı; mutfakta bulaşık dağ gibi. Kimse bir şey demedi. Sen televizyonun karşısındasın.",
      sol: { etiket: "Odama süzülürüm", sonuc: "Kapını kapatınca sular akmaya başlar mutfakta. Yorgun eller, bir çift daha eksik yıkar.", vicdan: -6, arkadaslik: 0, aile: -4, ozguven: 0 },
      sag: { etiket: "Kolları sıvarım", sonuc: "Annen köpüklerin arasından sana bakar; yorgunluğu yüzünden bir kaşık eksilir.", vicdan: 8, arkadaslik: 0, aile: 8, ozguven: 0 }
    },
    {
      id: "c11", bolum: 5, karakter: "burak",
      metin: "Burak'ın spor ayakkabısı ayrılmış, bantla tutturmuş; beden dersinde saklamaya çalışıyor. Senin çantanda yedek ayakkabın var.",
      sol: { etiket: "Herkesin içinde uzatırım", sonuc: "İyilik iyiliktir; ama Burak kulaklarına kadar kızarır. 'Gerek yok' der, alamaz.", vicdan: 3, arkadaslik: -3, aile: 0, ozguven: 2 },
      sag: { etiket: "Sessizce çantasına koyarım", sonuc: "Burak hiçbir şey demez. Ertesi gün senin çantanda bir gofret: sessiz bir teşekkür.", vicdan: 10, arkadaslik: 5, aile: 0, ozguven: 0 }
    },
    {
      id: "c12", bolum: 5, karakter: "zeynep",
      metin: "Okulda yardım kermesi. Zeynep masada eleman arıyor, kapıda da bağış kutusu duruyor. İkisine birden gücün yetmiyor.",
      sol: { etiket: "Kumbaramı bağışlarım", sonuc: "Kutuya atarken kimse görmez; zaten mesele o değil.", vicdan: 8, arkadaslik: 0, aile: 2, ozguven: 0 },
      sag: { etiket: "Bütün gün masada çalışırım", sonuc: "Akşam ayakların sızlar ama kasadaki rakamda senin de emeğin var.", vicdan: 8, arkadaslik: 4, aile: 0, ozguven: 0 }
    },

    /* ---------- KOŞULLU TAKİP KARTLARI ----------
       Bu kartlar yalnız ilgili flag konmuşsa desteye girer:
       geçmişteki bir seçim, ileride kapıyı çalar. */

    {
      id: "f01", bolum: 3, kosul: "kopyaVerdin", karakter: "ogretmen",
      metin: "Nazan Öğretmen iki kağıdı yan yana koymuş: seninki ve Emir'inki. Aynı yanlışlar, aynı sırayla. 'Bana anlatmak istediğiniz bir şey var mı?'",
      sol: { etiket: "İnkar ederiz", sonuc: "Öğretmen 'Peki' der ama gözleri 'biliyorum' diyor. O bakış, sınav notundan ağır.", vicdan: -14, arkadaslik: 3, aile: 0, ozguven: -4 },
      sag: { etiket: "Doğruyu anlatırım", sonuc: "Sınavı yeniden olursunuz. Emir üç gün küser; dördüncü gün 'İçim rahat aslında' der.", vicdan: 14, arkadaslik: -5, aile: 0, ozguven: 3 }
    },
    {
      id: "f02", bolum: 2, kosul: "paraUstuKaldi", karakter: "bakkal",
      metin: "Hasan Amca kasayı sayarken iç çekiyor: 'Bugünlerde hesap hep eksik. Yaşlandık galiba.' Cebindeki 5 lira birden ağırlaşıyor.",
      sol: { etiket: "Sesimi çıkarmam", sonuc: "Hasan Amca hesabı kendinden bilir. Cebindeki 5 lira artık hep 50 gibi gelir.", vicdan: -10, arkadaslik: 0, aile: 0, ozguven: -4 },
      sag: { etiket: "Geri verip itiraf ederim", sonuc: "Hasan Amca önce şaşırır, sonra omzuna vurur: 'Helal olsun. Hata herkese, dönmek yiğide mahsus.'", vicdan: 14, arkadaslik: 0, aile: 0, ozguven: 5 }
    },
    {
      id: "f03", bolum: 3, kosul: "kitapSakladin", karakter: "elif",
      metin: "Elif teneffüste kitabı getirdi: 'Bu leke bende yoktu...' Sesi titriyor ama gözleri sende. Sınıf sessiz.",
      sol: { etiket: "Eskiden vardı derim", sonuc: "Elif inanmayan gözlerle bakar. Yalan yalanı çağırdı; ikincisi ilkinden zor çıktı, üçüncüsü daha da zor.", vicdan: -14, arkadaslik: -4, aile: 0, ozguven: -3 },
      sag: { etiket: "Benim, özür dilerim", sonuc: "'Yenisini alacağım' dersin. Elif derin nefes alır: 'Keşke baştan söyleseydin.' Üç haftalık harçlık gider; yük biter.", vicdan: 14, arkadaslik: 4, aile: 0, ozguven: 2 }
    },
    {
      id: "f04", bolum: 4, kosul: "dedikoduYaydin", karakter: "burak", tartisma: true,
      metin: "Burak önünü kesiyor: 'Eski okulumla ilgili dedikoduya senin de ortak olduğunu söylediler.' Yumrukları sıkılı ama gözleri kırgın.",
      sol: { etiket: "Emir başlattı, derim", sonuc: "Topu arkadaşına atarsın. Burak 'hepiniz aynısınız' der; haksız sayılmaz.", vicdan: -12, arkadaslik: -6, aile: 0, ozguven: -3 },
      sag: { etiket: "Payım var, özür dilerim", sonuc: "Burak uzun uzun bakar: 'İlk kez biri düzgünce özür diledi.' Yumruklar yavaşça çözülür.", vicdan: 14, arkadaslik: 4, aile: 0, ozguven: -2 }
    },
    {
      id: "f05", bolum: 4, kosul: "notuGizledin", karakter: "anne",
      metin: "Annen çamaşır için ceplerini boşaltırken katlanmış sınav kağıdını bulmuş. Kağıt masada duruyor. Kimse konuşmuyor; sessizlik en yüksek ses.",
      sol: { etiket: "Yeni verdiler, derim", sonuc: "Kağıdın üstündeki tarih seni yalanlar. Yalan, tarihle yarışamaz.", vicdan: -14, arkadaslik: 0, aile: -8, ozguven: 0 },
      sag: { etiket: "Her şeyi anlatırım", sonuc: "Annen dinler: 'Nottan üzülmedim, saklamandan üzüldüm.' Bu cümleyi uzun süre unutmayacaksın.", vicdan: 14, arkadaslik: 0, aile: 6, ozguven: -2 }
    },
    {
      id: "f06", bolum: 5, kosul: "yusufaBagirdin", karakter: "kardes",
      metin: "Maket olayından beri Yusuf sana mesafeli. Bugün okul çıkışı koşarak geliyor; gofretinin yarısını uzatıyor: 'Barışalım mı abi... abla... neyse işte, barışalım mı?'",
      sol: { etiket: "Gofretle olmaz, derim", sonuc: "Yusuf'un eli havada kalır. Yedi yaşındaki bir el, havada çok bekleyemez.", vicdan: -10, arkadaslik: 0, aile: -8, ozguven: 0 },
      sag: { etiket: "Kocaman sarılırım", sonuc: "Yarım gofret, tam barış. Küçük eller büyük barışlar yapar.", vicdan: 12, arkadaslik: 0, aile: 8, ozguven: 0 }
    },
    {
      id: "f07", bolum: 5, kosul: "selimiEsGectin", karakter: "selim",
      metin: "Selim beden derslerinde artık hiç öne çıkmıyor; hep en arkada. Murat Bey sana sordu: 'Sen kaptansın, bir fikrin var mı?'",
      sol: { etiket: "Kendi sorunu, derim", sonuc: "Selim biraz daha geriye gider. Geri gide gide bir gün görünmez olunur.", vicdan: -10, arkadaslik: -3, aile: 0, ozguven: -2 },
      sag: { etiket: "Bugün ilk onu seçerim", sonuc: "Selim önce şaka sanır. Sonra o gün bir gol atar. Tek gol; ama nasıl bir gol!", vicdan: 12, arkadaslik: 4, aile: 0, ozguven: 0 }
    },
    {
      id: "f08", bolum: 5, kosul: "elifiSavundun", karakter: "elif",
      metin: "Kantinde hesap karıştı; İsmail Abi yanlışlıkla senin ödemediğini sanıyor. Tam o anda Elif öne çıkıyor: 'Ödedi, ben gördüm.' Sesi hiç titremiyor.",
      sol: { etiket: "Rahatlar, geçerim", sonuc: "İsmail Abi özür diler. Elif'in yaptığı, içinde tatlı bir yerde durur.", vicdan: 2, arkadaslik: 2, aile: 0, ozguven: 0 },
      sag: { etiket: "İyilik dönermiş, derim", sonuc: "Elif gülümser: 'Sen başlattın.' İkiniz de o ödev gününü hatırlarsınız.", vicdan: 6, arkadaslik: 6, aile: 0, ozguven: 2 }
    }
  ],

  sonlar: {
    vicdan0: {
      baslik: "Vicdanın Sesi Kısıldı",
      metin: "İçindeki o küçük ses o kadar çok susturuldu ki artık fısıldayamıyor. Gece yastığa başını koyunca bir ağırlık var; adını sen de biliyorsun. İyi haber şu: vicdanın pili bitmez, sadece şarj bekler. Baştan dene; bu kez onu bir dinle."
    },
    arkadaslik0: {
      baslik: "Koridorlar Sessiz",
      metin: "Teneffüs zili çalıyor ama kimse seni çağırmıyor. Belki hep haklıydın; ama haklılık, üslupsuz kalınca yalnızlık getiriyor. İnsan doğruyu söylerken de sıcacık olabilir. Baştan dene; bu kez kalbini de yanına al."
    },
    aile0: {
      baslik: "Evin Işığı Loş",
      metin: "Ev, dünyadaki ilk takımındır; sen bir süredir o takımın maçlarına çıkmıyorsun. Sofrada sandalyen boş, Yusuf kapını tıklatmaz oldu. Neyse ki ailenin kapısı kilitlenmez, sadece gıcırdar. Baştan dene; bu kez eve de uğra."
    },
    ozguven0: {
      baslik: "Gölgene Saklandın",
      metin: "O kadar geride durdun ki kendi sesini unuttun. Oysa doğruyu söylemek için önce 'ben de varım' diyebilmek gerekir. Cesaret dev bir şey değildir; parmak kaldırmakla başlar. Baştan dene; bu kez biraz daha dik."
    },
    arkadaslik100: {
      baslik: "Evet Makinesi",
      metin: "Herkes seni çok seviyor; çünkü herkese 'evet' dedin. Peki sen neredesin? Kalabalığın ortasında herkes var, bir tek sen yoksun. Arkadaşlık, aynı şarkıyı söylemek değil; kendi sesinle koroya katılmaktır. Baştan dene; bu kez listeye kendini de ekle."
    },
    ozguven100: {
      baslik: "Burnun Bulutlarda",
      metin: "Kendine güvenmen güzeldi; ama doz kaçtı. Artık aynada senden başkası görünmüyor, hatalar hep başkasının. Unutma: en yüksekte uçan uçurtmanın bile ipi yerde durur. Baştan dene; bu kez ipi elinden bırakma."
    },
    final: {
      genel: "Beş hafta, onlarca seçim... Hayal Ortaokulu'nda bir dönem bitti. Kimi gün kibrit çaktın, kimi gün su oldun; kimi gün çizgiye bastın, kimi gün silip yeniden çizdin. Vicdan bir kas gibidir: kullandıkça güçlenir. Al bakalım karneni.",
      yorumlar: {
        vicdan: "İçindeki ses bu dönem gür çıktı. Her zaman alkış almadın, bazen yalnız kaldın; ama akşam başını yastığa koyduğunda için rahattı. Bu, dünyanın en sessiz ödülüdür ve en kıymetlisi.",
        arkadaslik: "Dostluk karnen pekiyi! İnsanlar seni seviyor; çünkü yanlarında olduğunu biliyorlar. Tek bir not düşelim: bazen 'hayır' demek de bir dostluk görevidir. Onu da öğrenince tadından yenmeyeceksin.",
        aile: "Evinin direği olmuşsun. İstenmeden getirilen çay bardağı, Yusuf'un 'abi... abla... neyse işte'si, babanın omzuna vuruşu... Bunlar karneye yazılmaz ama kalbe yazılır; senin kalbin dolu.",
        ozguven: "Dik durmayı öğrendin: itiraz ederken bağırmadan, özür dilerken küçülmeden. Aynaya rahat bakıyorsun. Sıradaki hedef belli: o gücü hep başkaları için de kullanmak."
      }
    }
  }
};
