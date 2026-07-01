/*
 * ZAMAN YOLCUSU — Oyun İçeriği (content.js)
 * Evren: HAYAL ORTAOKULU | Hedef kitle: 11-13 yaş (7. sınıf)
 *
 * ÖĞRETMEN İÇİN DÜZENLEME NOTU:
 * - Her senaryoda "a" ve "b" iki seçenektir; hangisinin doğru olduğunu "tip" alanı
 *   belirtir ('iyi' / 'kotu'). İyi seçenek bilerek bazen a, bazen b konumundadır;
 *   sırayı değiştirirseniz "tip" ve "gorsel" alanlarını birlikte taşımayı unutmayın.
 * - "kisaVade" seçimin HEMEN sonrasını, "gelecek" ise 5 YIL SONRASINI (oyuncu ve
 *   arkadaşları 17-18 yaşında, lise son) anlatır. Metinleri güncellerken bu yaş
 *   farkını koruyun.
 * - "kotu" gelecekler ceza/felaket değil, doğal sonuç anlatır (güven kaybı,
 *   pişmanlık, kaçan fırsat) ve her birinde bir umut kapısı açık bırakılmıştır.
 *   Eklemeler yaparken bu dengeyi bozmayın; korkutmayın, düşündürün.
 * - "ders" alanı iki dal da izlendikten SONRA gösterilir; vaaz diliyle değil,
 *   çıkarım diliyle yazılmıştır.
 * - Görseller: senaryo görselleri bu klasördeki assets içinde (s1.jpg vb.),
 *   karakter portreleri ../assets/karakter/<id>.jpg yolundadır.
 * - Metinlerde oyuncuya "sen" diye seslenilir; ad ve cinsiyet belirtilmez.
 */

const ICERIK = {
  oyunAdi: "Zaman Yolcusu",

  giris: {
    baslik: "Tavan Arasındaki Saat",
    metin: "Dedenin tavan arasında, tozlu bir sandığın dibinde eski bir köstekli saat buldun. Kapağını açtığında akrep ile yelkovan geriye doğru dönmeye başladı ve içinden dedenin sesini duyar gibi oldun: 'Bu saat zamanı değil, seçimleri gösterir evlat.' Artık her seçiminden sonra kapağı çevirip beş yıl sonrasına gidebilir, o seçimin seni nereye götürdüğünü kendi gözlerinle izleyebilirsin. Hazırsan Hayal Ortaokulu'nda sıradan görünen ama hiç de sıradan olmayan bir hafta başlıyor."
  },

  senaryolar: [

    {
      id: "s1",
      baslik: "Gözünün Ucundaki Kâğıt",
      deger: "Dürüstlük ve emek",
      gorsel: "s1.jpg",
      sahne: "Matematik sınavındasın ve son iki soruda takıldın. Tam o sırada Emir, sırasının altından katlanmış küçük bir kâğıt uzatıyor: 'Al, dün akşam çözdüklerim.' Nazan Öğretmen pencerenin önünde, sırtı şu an dönük. Kalbin kulaklarında atıyor.",
      a: {
        metin: "Kâğıdı al, cevapları hızlıca kâğıdına geçir.",
        kisaVade: "Sınavdan beklediğinden yüksek bir not gelir. Ama Nazan Öğretmen kâğıtları dağıtırken seninkinin başında bir an duraklar; cevaplar doğru, çözüm yolları bomboş. Bir şey demez, sadece bakar. O bakış, notun sevincini yarıya indirir.",
        gelecek: "Beş yıl sonra, lise son sınıftasın. Üniversite denemesindesin ve karşına yine o konudan bir soru çıkıyor; kalemin havada kalıyor, çünkü o temel hiç atılmadı. Yan sırada Emir bile ilerlemiş; o kâğıdı uzattığı günü çoktan unutmuş, konuyu sonradan sökmüş. Dershane öğretmenin deneme kâğıdına küçük bir not düşüyor: 'Temel her yaşta atılır, yeter ki bugün başla.' O akşam yedinci sınıf konularından başlıyorsun; geç, ama gerçek bir başlangıç.",
        tip: "kotu",
        gorsel: "s1-kotu.jpg"
      },
      b: {
        metin: "Kâğıdı sessizce geri it, bildiklerinle çöz.",
        kisaVade: "İki sorudan biri yarım kalır, notun beklediğinden düşük gelir. Ama Nazan Öğretmen kâğıdını verirken çözüm yolunun yanına kırmızı kalemle bir not düşmüştür: 'Buraya kadar kendi aklınla gelmişsin, bir adım kalmış.' O bir adımı ertesi gün ondan öğrenirsin.",
        gelecek: "Beş yıl sonra, lise son sınıftasın. Deneme sınavında aynı tip soru karşına çıkıyor ve elin kendiliğinden çözüme gidiyor; o soruyla yıllar önce güreşmiştin, artık tanıdık geliyor. Çıkışta Emir omzuna vuruyor: 'Sen o günden beri sorularla teke tek dövüşüyorsun, artık hepsi tuş oluyor.' Nazan Öğretmen'i ziyarete gittiğinizde sana ilk sorduğu şey notların değil: 'Hâlâ kendi yolunla mı çözüyorsun?' Gülümseyerek başını sallıyorsun.",
        tip: "iyi",
        gorsel: "s1-iyi.jpg"
      },
      ders: "Not bir günün, öğrenmek ömrün karnesidir. Emekle kazanılan bilgi kimseden ödünç alınmaz; hep senin kalır."
    },

    {
      id: "s2",
      baslik: "Bir Tık Uzakta",
      deger: "Arkadaşlık ve mahremiyet",
      gorsel: "s2.jpg",
      sahne: "Teneffüste okula yeni gelen Selim, koridorda ayağı kayınca elindeki tepsiyle birlikte yere yuvarlandı. O an telefonun elindeydi ve çektiğin fotoğraf tam 'çok komik' denecek türden. Sınıf grubunda herkes 'atsana' diye yazıyor. Selim ise köşede, kıpkırmızı, önlüğünü silmeye çalışıyor.",
      a: {
        metin: "Fotoğrafı kimseye atmadan sil, gidip Selim'e elini uzat.",
        kisaVade: "Grupta birkaç kişi 'oyunbozan' diye söylenir, mesele o gün kapanır. Ama Selim'in sana bakışındaki rahatlamayı görürsün. Ertesi gün teneffüste gelip yanına oturur ve okula geldiğinden beri ilk kez uzun uzun konuşur; meğer ne çok ortak yanınız varmış.",
        gelecek: "Beş yıl sonra, lise son sınıftasınız. O çekingen Selim şimdi tiyatro kulübünün sahnesinde; yıl sonu gösterisinde salonu kahkahaya boğuyor. Perde kapanınca seni kulise çağırıyor: 'İlk düştüğüm gün biri fotoğrafımı silip elini uzatmıştı. O gün ayağa kalkabildim, gerisi geldi.' Alkışlar herkesin ama o cümle sadece senin.",
        tip: "iyi",
        gorsel: "s2-iyi.jpg"
      },
      b: {
        metin: "Gruba at; nasılsa herkes güler geçer.",
        kisaVade: "Telefonlar susana kadar kahkaha yağar, birkaç kişi fotoğrafa komik yazılar ekler. Ama ertesi gün Selim seninle göz göze gelmiyor, sıra arkadaşı olmak için kimse yanına oturmuyor. Zeynep çıkışta yanına geliyor: 'Yerinde olsam özür dilerdim. Daha ilk haftası.'",
        gelecek: "Beş yıl sonra, lise son sınıftasın. Bir okul buluşmasında Selim'le karşılaşıyorsun; kibar, güler yüzlü ama arada görünmez bir cam var. O fotoğrafı telefonlar çoktan unuttu; Selim'in aklında ise ilk haftasının o günü hâlâ taze. Yanına gidip yıllar sonra da olsa 'O gün yanlış yaptım' diyorsun. Bir an susuyor, sonra camın ardından ilk kez gerçekten gülümsüyor: 'Bunu duymak beş yıl sürdü ama değdi.' Cam kalkmıyor hemen; ama ilk çatlak o gün oluşuyor.",
        tip: "kotu",
        gorsel: "s2-kotu.jpg"
      },
      ders: "Ekranda bir saniye süren şey, birinin içinde yıllarca sürebilir. Paylaşmadan önce tek soru yeter: Bu benim fotoğrafım olsaydı ne isterdim?"
    },

    {
      id: "s3",
      baslik: "Defterdeki Küçük Rakam",
      deger: "Sözünde durmak",
      gorsel: "s3.jpg",
      sahne: "Geçen hafta gezi günü cüzdanını evde unutmuştun; Zeynep düşünmeden borç vermişti: 'Olur böyle şeyler, sonra verirsin.' Bugün harçlığını aldın. Ama İsmail Abi'nin kantinine yeni gelen o kart paketi de tam senin harçlığın kadar. İkisine birden para yetmiyor.",
      a: {
        metin: "Önce Zeynep'e borcunu ver; kartlar bekleyebilir.",
        kisaVade: "Zeynep parayı uzattığında bir an şaşırıyor: 'Hatırladın mı gerçekten? Çoğu kişi unutur.' İçinde bir hafiflik, cebinde eksik bir para var ama ikisi de iyi hissettiriyor. Akşam babana anlattığında bıyık altından gülüyor: 'Söz namustur. Kart dediğin gelir geçer, bu kalır.'",
        gelecek: "Beş yıl sonra, lise son sınıftasınız. Mezuniyet gezisi için sınıfta para toplanacak ve iş, kasayı tutacak birini seçmeye gelince Zeynep gözünü bile kırpmıyor: 'Yıllardır tanırım, onun defterinde açık hesap kalmaz.' Kimse itiraz etmiyor. O gün anlıyorsun ki yıllar önce ödediğin küçük borç, aslında bugünkü güvenin ilk taksitiymiş.",
        tip: "iyi",
        gorsel: "s3-iyi.jpg"
      },
      b: {
        metin: "Kartları al; Zeynep'in acelesi yok nasılsa.",
        kisaVade: "Kartlar gerçekten güzel çıkıyor, teneffüs boyunca elden ele geziyor. Ama koridorda Zeynep'i her gördüğünde cebini yoklayan biri oluyorsun. O hiçbir şey demiyor; demiyor olması daha çok batıyor. Küçük bir borç, büyük bir ağırlık.",
        gelecek: "Beş yıl sonra, lise son sınıftasınız. Kamp gezisi için ortak para toplanıyor; senin adın geçince kısa bir sessizlik oluyor. Kimse kötü bir şey söylemiyor ama emanet başkasına veriliyor. O akşam çekmecende o eski kartları buluyorsun; çoğunun adını bile hatırlamıyorsun. Ertesi gün Zeynep'e gidip yılların borcunu uzatıyorsun. Gülümsüyor: 'Parası önemli değildi, hatırlaman önemliydi. Geç geldin ama geldin.'",
        tip: "kotu",
        gorsel: "s3-kotu.jpg"
      },
      ders: "Borç küçük olabilir ama söz büyüktür. Güven bir günde kazanılmaz; tutulan küçük sözlerle ilmek ilmek örülür."
    },

    {
      id: "s4",
      baslik: "Camdaki Çatlak",
      deger: "Sorumluluk ve cesaret",
      gorsel: "s4.jpg",
      sahne: "Son teneffüste topa biraz hızlı vurdun; top sekip alt kat koridorunun camını çatlattı. Etrafta kimse yok gibi... ama az önce oradan Burak geçmişti ve herkes onun sert göründüğünü bilir. Kemal Bey'in ayak sesleri koridorda yankılanıyor.",
      a: {
        metin: "Sesini çıkarma; sorarlarsa 'Burak oradaydı' de.",
        kisaVade: "Kemal Bey Burak'ı odasına çağırıyor. Burak 'Ben yapmadım' diyor ama görüntüsü yüzünden kimse pek üstelemiyor. Sen rahatlıyorsun; ta ki paspasıyla oradan geçen Ramazan Amca sana uzun uzun bakana kadar. O okulda olan biteni herkesten önce bilir ve tek kelime etmiyor.",
        gelecek: "Beş yıl sonra, lise son sınıftasın. Burak'la aynı mahallede oturuyorsunuz ama aranızda hep bir soğukluk kaldı; meğer o yıl 'cam kıran çocuk' diye anılmak ona herkesin sandığından çok dokunmuş. Bir akşam otobüs durağında yan yana kalıyorsunuz. 'O camı kimin kırdığını hep biliyordum' diyor sakince, 'söylemeni bekledim.' Yutkunup yıllar sonra özrü oracıkta diliyorsun. Burak omuz silkiyor ama gözleri yumuşuyor: 'Geç olsun, güç olmasın.' Otobüs geldiğinde yan yana biniyorsunuz.",
        tip: "kotu",
        gorsel: "s4-kotu.jpg"
      },
      b: {
        metin: "Kemal Bey'e git: 'Camı ben kırdım, kazayla oldu.'",
        kisaVade: "Kemal Bey önce kaşlarını çatıyor, koridor buz kesiyor. Sonra o ciddi yüzün altındaki yumuşak kalp görünüyor: 'Kırık cam tamir edilir evlat. Gelip söylemen camdan kıymetli.' Harçlığından küçük bir katkı veriyorsun; Ramazan Amca'yla camın ölçüsünü birlikte alırken sana göz kırpıyor: 'Ben zaten görmüştüm, bakalım ne yapacak diyordum.'",
        gelecek: "Beş yıl sonra, lise son sınıftasın ve eski okulunda bir tören var: Kemal Bey emekli oluyor. Konuşmasında isim vermeden bir anı anlatıyor: 'Yıllar önce bir öğrenci kapımı çalıp camı ben kırdım dedi. O gün anladım ki bu okuldan cam değil, insan çıkıyor.' Salonda sadece üç kişi kime baktığını biliyor: sen, Ramazan Amca ve o günden beri sana 'sağlam çocuk' diyen Burak.",
        tip: "iyi",
        gorsel: "s4-iyi.jpg"
      },
      ders: "Kaza herkesin başına gelir; seni anlatan şey kaza değil, sonrasında verdiğin karardır. Suçu atmak bir anlık rahatlık, üstlenmek ömürlük bir duruştur."
    },

    {
      id: "s5",
      baslik: "Bir Bölüm Daha",
      deger: "Öz disiplin ve denge",
      gorsel: "s5.jpg",
      sahne: "Sınav haftası başladı. Masanda açık duran kitaplar, tablette ise oyunun yeni sezon bildirimi yanıp sönüyor. Kardeşin Yusuf kapı aralığından seni izliyor; sen ne yaparsan birebir aynısını yapıyor. Annen mutfaktan sesleniyor: 'Planına güveniyorum, sen bilirsin.'",
      a: {
        metin: "Nasılsa yarın çalışırım; bu gece sezonu bitir.",
        kisaVade: "Gece yarısını geçene kadar oynuyorsun; sezon bitiyor ama sabah gözlerin yanarak sınava giriyorsun. Sorular tanıdık, zihnin sisli. Asıl tuhafı akşam oluyor: Yusuf ödev defterini kapatıp 'Ben de yarın yaparım' diyor. Nereden öğrendiğini ikiniz de biliyorsunuz.",
        gelecek: "Beş yıl sonra, lise son sınıftasın ve bu sefer hafta sonunda deneme değil, gerçek üniversite sınavı var. Erteleme alışkanlığı yıllar içinde büyüdü; şimdi onunla ciddi bir hesaplaşma içindesin. Telefonuna kendi elinle kısıtlama koyuyor, masana bir program asıyorsun; geç ama kararlı bir toparlanış. Bir akşam on iki yaşındaki Yusuf'a kendi elinle çalışma planı çıkarıyorsun: 'Benim gibi son dakikaya bırakma, baştan dengeli git.' Yusuf hâlâ seni taklit ediyor; bu kez doğrusunu göstermeye kararlısın.",
        tip: "kotu",
        gorsel: "s5-kotu.jpg"
      },
      b: {
        metin: "Saat kur: kırk beş dakika ders, on beş dakika oyun.",
        kisaVade: "Plan gerçekten işliyor: konular bitiyor, molada oyun daha da tatlı geliyor çünkü kaçarak değil, hak ederek oynuyorsun. Ertesi gün sınavda zihnin berrak. Asıl sürpriz Yusuf'un odasında: kapısına eğri büğrü harflerle bir kâğıt asmış: 'Benim de planım var.'",
        gelecek: "Beş yıl sonra, lise son sınıftasın ve üniversite sınavına günler var. Herkes panik hâlinde gece gündüz birbirine karışmışken sen sakinsin; bu senin yıllardır işleyen düzenin, sınav haftası senin için olağanüstü hâl değil. Akşam molasında Yusuf'la yarım saat top oynayacak vaktin bile oluyor. Dönerken Yusuf topu koltuğuna sıkıştırıp soruyor: 'Sınavdan önce top oynayan başka abla-abi var mıdır?' Gülüyorsun: 'Planı olan herkes oynar.'",
        tip: "iyi",
        gorsel: "s5-iyi.jpg"
      },
      ders: "Oyun düşman değildir; plansızlık düşmandır. Dengeyi kuran hem oynar hem kazanır, üstelik ikisinin de tadını çıkararak."
    },

    {
      id: "s6",
      baslik: "Poşetler ve Düdük Sesi",
      deger: "Yardımlaşma ve komşuluk",
      gorsel: "s6.jpg",
      sahne: "Okul çıkışı mahalle maçına yetişmen lazım; Emir ileriden bağırıyor: 'Koş, kadro sensiz eksik!' Tam köşede Saliha Teyze'yi görüyorsun: iki ağır poşet, üç kat merdiven ve dizlerindeki o bildik ağrı. 'Evladım...' diyor, cümlesini bitirmeden gözü poşetlere kayıyor.",
      a: {
        metin: "Poşetleri al, üç katı birlikte çıkın; maça biraz geç kal.",
        kisaVade: "Maçın ancak ikinci yarısına yetişiyorsun; Emir 'Nerede kaldın?' diye söyleniyor, bir gol de yiyorsunuz. Ama kapı önünde Saliha Teyze'nin cebine sıkıştırdığı mendil şekeri ve ardından mırıldandığı dua, skorun tutamadığı bir yeri dolduruyor.",
        gelecek: "Beş yıl sonra, lise son sınıftasın. Saliha Teyze'nin kapısı artık haftalık uğrağın; poşetler hep senden, çay ve eski mahalle hikâyeleri hep ondan. Bir akşam anahtarını komşuya değil sana emanet ediyor: 'Bu mahallede kapımı bilerek çalan bir sen kaldın evlat.' Bakkal Hasan Amca seni çekiştiriyor: 'Saliha Hanım seni evladından ayırmıyor, haberin var mı?' Var. Ve bu, attığın hiçbir golün veremediği bir his.",
        tip: "iyi",
        gorsel: "s6-iyi.jpg"
      },
      b: {
        metin: "Görmemiş gibi adımlarını hızlandır; maç maçtır.",
        kisaVade: "Maça tam vaktinde yetişiyor, iki de gol atıyorsun; takım omuzlarda taşıyor. Dönüş yolunda Saliha Teyze'nin poşetlerini bakkal Hasan Amca'nın taşıdığını öğreniyorsun. Kimse sana bir şey demiyor; sadece Hasan Amca'nın 'Gençlik işte, telaşlı' deyişi içine tuhaf oturuyor.",
        gelecek: "Beş yıl sonra, lise son sınıftasın. Saliha Teyze'nin merdivenleri artık ona daha dik geliyor; kapısını mahallenin başka çocukları çalıyor, senin adını bilmiyorlar bile. Bir gün bakkalın önünde karşılaşıyorsunuz; yine o tatlı dil: 'Maşallah, kocaman olmuşsun.' Kırgın değil; sadece aranızda hiç örülmemiş bir bağ var ve bunu ikiniz de hissediyorsunuz. Poşetlerine uzanıyorsun: 'Bugün ben taşısam?' Gülüyor: 'Geç kaldın ama tam vaktinde geldin evlat.' İlk ilmek o gün atılıyor.",
        tip: "kotu",
        gorsel: "s6-kotu.jpg"
      },
      ders: "Maçlar biter, skorlar unutulur; bir komşunun duası ve güveni yıllarca seninle yürür. İyilik, ertelemeye gelmeyen bir randevudur."
    },

    {
      id: "s7",
      baslik: "Avucundaki Fazlalık",
      deger: "Kul hakkı ve dürüstlük",
      gorsel: "s7.jpg",
      sahne: "Kantin önü ana baba günü; İsmail Abi bir yandan tost çeviriyor, bir yandan para üstü veriyor. Köşeye çekilip avucuna bakıyorsun: yanlışlıkla fazla vermiş. Kimse fark etmedi, sıra çoktan ilerledi, zil çalmak üzere.",
      a: {
        metin: "Cebine at; onun hatası, senin şansın.",
        kisaVade: "Fazla parayla ertesi gün fazladan bir tost alıyorsun ama İsmail Abi'nin her 'Buyur aslanım!' deyişinde içinden bir şey cız ediyor. Para küçük, ağırlığı değil. Tostun tadı bile eskisi gibi gelmiyor.",
        gelecek: "Beş yıl sonra, lise son sınıftasın; mezuniyet öncesi eski okulunuza veda ziyaretine gidiyorsunuz. İsmail Abi herkese çay ısmarlıyor, meşhur veresiye defterini gösteriyor: 'Bu okulda kimin sözü senetti, hepsi burada yazar.' Herkes gülerken senin aklında hâlâ o bozukluklar şıngırdıyor. Kalabalık dağılınca yanına gidiyorsun: 'İsmail Abi, yıllar önce fazla para üstü vermiştin, ben de...' Tost maşasını bırakıp gülüyor: 'Beş yıl taşımışsın onu, demek ki vicdanın teraziymiş. Helal olsun, geç geldin ama geldin.' O gün kantinden çıkarken cebin değil ama için hafifliyor.",
        tip: "kotu",
        gorsel: "s7-kotu.jpg"
      },
      b: {
        metin: "Sıraya geri dön: 'İsmail Abi, fazla vermişsin.'",
        kisaVade: "İsmail Abi tost maşasını havada unutup sana bakıyor: 'Şu kalabalıkta benim aklımdan çıkanı sen geri getirdin, öyle mi?' Sonra veresiye defterini açıp adını kendi eliyle yazıyor: 'Bu çocuğa sorgusuz veresiye. Defter kefil, ben şahit.'",
        gelecek: "Beş yıl sonra, lise son sınıftasın; sınav dönemlerinde çalışmak için ara sıra eski okulunun oralara uğruyorsun. İsmail Abi seni gördü mü çay molasına ancak öyle çıkıyor: 'Kasaya sen bak, gözüm arkada kalmıyor.' Bir gün çırağına seni gösteriyor: 'Bak evlat, ticaret dediğin şu: yıllar önce iki lirayı geri getiren, bugün kasamı emanet ettiğim insan olur.' Küçücük bir bozuklukla başlayan şey, kasa anahtarına dönüşmüş.",
        tip: "iyi",
        gorsel: "s7-iyi.jpg"
      },
      ders: "Kul hakkı gramla ölçülmez; en küçüğü bile vicdan terazisinde ağır çeker. Helalinden az, haramdan çoktan her zaman iyidir."
    },

    {
      id: "s8",
      baslik: "Kumbaranın Sabrı",
      deger: "Tutumluluk ve sabır",
      gorsel: "s8.jpg",
      sahne: "Dedenle Hasan Amca'nın bakkalının önündeki tabureye oturmuşsunuz. Harçlığın cebinde. Bir yanda vitrindeki renkli atıştırmalıklar, öbür yanda komşunun 'satılık' diye camekâna bıraktığı ikinci el fotoğraf makinesi. Dede tespihini çevirip her zamanki gibi hikâyeyle konuşuyor: 'Damla damla göl olur evlat. Ben bu bakkalın çırağıyken...'",
      a: {
        metin: "Her cuma harçlığının bir kısmını Hasan Amca'ya emanet bırak; makine için biriktir.",
        kisaVade: "İlk haftalar zor: Emir dondurma yalarken sen yutkunup geçiyorsun. Ama Hasan Amca her cuma defterine bir çizik atıyor ve rakam büyüdükçe için kıpır kıpır oluyor. Makine hâlâ camekânda; artık ona 'satılık' değil, 'benim olacak' diye bakıyorsun.",
        gelecek: "Beş yıl sonra, lise son sınıftasın ve o makine yıllardır omzunda. Okulun mezuniyet töreninin fotoğrafçısı sensin; bir fotoğrafın il yarışmasında sergilendi. Serginin açılışında dede fotoğrafın altındaki adına dokunuyor: 'Damla damla göl olur demiştim ya... Sen gölü gördün, ben demesini bilirim sadece.' Hasan Amca da orada, cebinden yıpranmış emanet defterini çıkarıyor: 'Bu gölün ilk damlaları bende kayıtlı.'",
        tip: "iyi",
        gorsel: "s8-iyi.jpg"
      },
      b: {
        metin: "Harçlık harcanmak içindir; her gün küçük küçük bitir gitsin.",
        kisaVade: "Her gün tatlı bir şeyler: bir gün cips, bir gün gazoz, bir gün çıkartma. Hepsi güzel, hiçbiri kalıcı. Cuma akşamı cebin de bomboş, aklındaki liste de. Makine camekânda durmaya devam ediyor; sen artık o tarafa pek bakmıyorsun.",
        gelecek: "Beş yıl sonra, lise son sınıftasın. Makineyi çoktan başkası almış; arada sırada 'Bir gün kendi paramla alacağım' diyorsun ama o gün hep yarın. Bir akşam dede seni yanına çağırıyor; elinde eski, boyası dökülmüş bir teneke kumbara: 'Benim çıraklık kumbaram. Göl kurumadı evlat, sadece ilk damlayı bekliyor.' O gece ilk damlayı atıyorsun; teneke sesi, yıllardır duyduğun en umutlu ses. Hasan Amca'ya da haber veriyorsun: 'Cuma günleri yine geliyorum.'",
        tip: "kotu",
        gorsel: "s8-kotu.jpg"
      },
      ders: "Bugünün küçük vazgeçişleri, yarının büyük 'iyi ki'leridir. Sabır, kâr oranı en yüksek kumbaradır."
    }

  ],

  final: {
    baslik: "Saatin Son Tıkırtısı",
    metin: "Köstekli saatin kapağını son kez kapatırken dedenin sesi kulağında yankılanıyor: 'Gördün mü evlat, gelecek uzak bir ülke değilmiş.' Gelecek, bugün verdiğin küçük kararların ilmek ilmek dokuduğu bir kumaş; her seçim bir iplik ve kimi gözükmese de hepsi desende yerini alıyor. Kötü bir düğüm attıysan üzülme; iplik hâlâ senin elinde ve deseni değiştirmek için hiçbir zaman geç değil. Zaman makinesi herkeste yok ama herkeste ondan daha güçlü bir şey var: bir sonraki seçim."
  }
};
