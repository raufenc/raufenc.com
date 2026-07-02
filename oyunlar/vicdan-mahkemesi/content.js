// ============================================================
// VİCDAN MAHKEMESİ — İçerik Dosyası
// Hayal Ortaokulu 7-A Sınıf Mahkemesi vakaları
// Hedef kitle: 11-13 yaş | Değerler: hüsn-ü zan, iftiranın
// ağırlığı, adil şahitlik, onarıcı adalet
// ============================================================

const ICERIK = {
  oyunAdi: 'Vicdan Mahkemesi',

  giris: {
    baslik: 'Sınıf Mahkemesi Kuruluyor!',
    metin: 'Nazan Öğretmen bir sabah sınıfa elinde tahta bir tokmak ve bir yığın dosyayla girdi: "Çocuklar, bu hafta Hayal Ortaokulu\'nda Sınıf Mahkemesi kuruyoruz. Anlaşmazlıkları bağırarak değil, dinleyerek çözeceğiz." Kura çekildi ve hâkim cübbesi — yani öğretmenin lacivert önlüğü — senin omuzlarına kondu. Nazan Öğretmen eğilip kulağına fısıldadı: "Unutma hâkim bey/hanım: Gözlerinle değil, vicdanınla bak. Acele hüküm, adaletin en büyük düşmanıdır."'
  },

  vakalar: [

    // ------------------------------------------------------------
    // VAKA 1 — Sanık masum (hüsn-ü zan dersi: eşya kazayla taşınmış)
    // ------------------------------------------------------------
    {
      id: 'v1',
      baslik: 'Kayıp Kalem Kutusu Dosyası',
      deger: 'Hüsn-ü zan — görünüşe aldanmamak',
      ozet: 'Nazan Öğretmen ilk dosyayı kürsüne koyar: "Hâkimim, bu dosya sıcak; dikkatli dinle." Zeynep\'in babasının hediyesi olan gökkuşağı desenli kalem kutusu, beden dersinden dönüldüğünde yerinde yoktu. Öğle arası kutu, okula iki hafta önce gelen Selim\'in sırasının gözünde bulundu. Sınıfın yarısı çoktan kararını vermiş: "Yeni çocuk almış işte!"',
      taraflar: [
        { karakter: 'selim', rol: 'sanık' },
        { karakter: 'zeynep', rol: 'şikâyetçi' },
        { karakter: 'hademe', rol: 'tanık' }
      ],
      ifadeler: {
        selim: [
          { soru: 'Kalem kutusu senin sıranda bulundu. Bunu nasıl açıklıyorsun?', cevap: 'Açıklayamıyorum hâkimim, keşke açıklayabilsem... Ben o kutuyu elime bile almadım. Sırama nasıl girdiğini ben de bilmiyorum. Kimse bana inanmıyor çünkü beni daha kimse tanımıyor.' },
          { soru: 'Beden dersine giderken sınıftan en son sen mi çıktın?', cevap: 'Evet, en son ben çıktım ama ayakkabımın bağcığı koptuğu için! Düğüm atana kadar herkes gitmişti. Çıkarken Zeynep\'in sırasına doğru dönüp bakmadım bile.' }
        ],
        zeynep: [
          { soru: 'Kutunun alındığını mı düşünüyorsun, kaybolduğunu mu?', cevap: 'Alındığını hâkimim. Kalem kutusu kanatlı değil ya, kendi kendine uçup Selim\'in sırasına giremez! O kutu babamın doğum günü hediyesi, ben onu gözüm gibi korurum.' },
          { soru: 'Selim\'i kutuyu alırken gören oldu mu? Sen gördün mü?', cevap: 'Görmedim... Kimse görmemiş aslında. Ama sınıfta en son o kalmış, kutu da onun sırasından çıktı. Başka bir açıklaması var mı ki?' }
        ],
        hademe: [
          { soru: 'Ramazan Amca, beden dersi saatinde 7-A\'da mıydınız?', cevap: 'Elbette hâkim bey/hanım, ben bu okulda kuş uçsa haberim olur. Üçüncü ders 7-A\'yı sildim, sıraları da camları açmak için pencere tarafına çektim. Sıralar bir güzel yer değiştirdi o gün.' },
          { soru: 'Yerde ya da ortalıkta bir kalem kutusu gördünüz mü?', cevap: 'Gördüm ya! Sıraları çekerken bir tanesinden pat diye rengârenk bir kutu düştü. Ben de e yerde kalmasın dedim, en yakındaki boş sıra gözüne koydum. Kimin sırasıymış, orasına hiç bakmadım. Suç bende mi yani şimdi?' }
        ]
      },
      deliller: [
        { ad: 'Temizlik çizelgesi', emoji: '🧹', aciklama: 'Ramazan Amca\'nın imzaladığı çizelgeye göre 7-A, tam beden dersi saatinde silinip düzenlenmiş. Yani sınıfta öğrenciler yokken içeride biri daha varmış.' },
        { ad: 'Sıraların yeni düzeni', emoji: '📏', aciklama: 'Sıralar o gün pencere tarafına çekilmiş. Selim\'in sırası, taşınmadan önce tam Zeynep\'in sırasının bitişiğindeymiş — düşen bir eşyanın en yakın konacağı yer.' },
        { ad: 'Kutunun bulunduğu hâli', emoji: '🎒', aciklama: 'Kutu sıra gözüne düzgünce, kalemleri içinde yerleştirilmiş hâlde duruyor. Aceleyle saklanmış bir çalıntıya değil, özenle "kaldırılmış" bir eşyaya benziyor.' }
      ],
      dogruHukum: 'sucsuz',
      gercek: 'Kutuyu kimse çalmadı. Ramazan Amca sıraları pencere kenarına çekerken kutu Zeynep\'in sırasından yere düştü; Ramazan Amca da onu en yakındaki boş sıra gözüne — yani Selim\'in sırasına — özenle yerleştirdi. Selim\'in tek "suçu", bağcığı koptuğu için sınıftan en son çıkmak ve okulun en yeni öğrencisi olmaktı.',
      ders: 'Bir eşyanın birinin sırasında bulunması, onu o kişinin aldığını göstermez; görünüş delil değildir. Hüsn-ü zan, "acaba başka bir açıklaması olabilir mi?" diye sormaktır — hele karşındaki, kendini savunacak bir dostu bile olmayan yeni bir öğrenciyse.',
      sanikGozundenKarakter: 'selim',
      sanikGozunden: [
        { metin: 'Ayakkabı bağcığım kopunca sınıfta tek başıma kaldım; düğümü atarken içimden "keşke bugün de kimseyle konuşmasam" diye geçirdim. Yeni okulda göze batmamak en büyük hayalimdi.' },
        { metin: 'Öğle arası "kalem kutusu sırasında bulundu" dediklerinde önce ne dediklerini anlamadım. Sonra herkesin gözü birden bana çevrildi; sanki sırtımda görünmez bir tabela vardı: "Yeni gelen — ona bakın."' },
        { metin: '"Açıklayamıyorum" derken sesim titredi, çünkü gerçekten bir açıklamam yoktu. Beni tanıyan tek bir kişi olsa "o böyle bir şey yapmaz" derdi belki. Ama kimse beni tanımıyordu ki.' },
        { metin: 'Hâkim "suçsuz" deyip tokmağı vurunca dizlerim çözüldü. Kimse fark etmedi ama bir haftadır ilk kez rahat nefes aldım — meğer masumiyetin de bir ağırlığı varmış, sırtımdan indi.' }
      ]
    },

    // ------------------------------------------------------------
    // VAKA 2 — Sanık suçlu (emanet + hatayı saklamak)
    // ------------------------------------------------------------
    {
      id: 'v2',
      baslik: 'Islanan Emanet Dosyası',
      deger: 'Emanete sahip çıkmak ve hatada dürüstlük',
      ozet: 'Nazan Öğretmen dosyayı uzatırken içini çeker: "Bu dosyada kırılan şey bir kitaptan fazlası, hâkimim." Kütüphanenin en sevilen kitabı "Çocuk Kalbi", iade rafında sayfaları dalga dalga kabarmış, mürekkebi dağılmış hâlde bulundu. Kayıt defterine göre kitabı son ödünç alan kişi Emir. Emir ise "Ben bıraktığımda kitap okunuyordu" diyor ama gözlerini kimseyle buluşturmuyor.',
      taraflar: [
        { karakter: 'emir', rol: 'sanık' },
        { karakter: 'zeynep', rol: 'şikâyetçi' },
        { karakter: 'burak', rol: 'tanık' }
      ],
      ifadeler: {
        emir: [
          { soru: 'Kitabı iade ettiğinde ne durumdaydı?', cevap: 'Yani... bıraktığımda sayfalar duruyordu, okunuyordu yani... Tamam, belki biraz dalgalıydı ama koca kitap, azıcık dalgadan bir şey olmaz ki! Sonuçta hikâye aynı hikâye, değil mi hâkimim? He he...' },
          { soru: 'O gün çantanda kitabın yanında ne taşıyordun?', cevap: 'Beslenme, defterler, bir de... su mataram. Ama kapağı kapalıydı! Yani ben kapadım sanıyordum... Hâkimim, ben o kitabı çok sevdim, ona bilerek asla zarar vermem, bunu bilmeni istiyorum.' }
        ],
        zeynep: [
          { soru: 'Kütüphane kolu başkanı olarak kayıtlar ne söylüyor?', cevap: 'Defter ortada hâkimim: kitabı en son Emir aldı. Ve şunu söylemeliyim — Emir kitabı bana elden teslim etmedi. Ben yokken, akşamüstü, kütüphaneci de yokken rafa bırakıvermiş. Kuralları bilen biri neden böyle sessizce bırakır?' },
          { soru: 'Kitap Emir\'den önce sağlam mıydı?', cevap: 'Kesinlikle. Bir önceki okuyucudan teslim alırken sayfalarını tek tek kontrol ettim, ben böyleyimdir. Tertemizdi. Damga bile taze duruyordu.' }
        ],
        burak: [
          { soru: 'O hafta Emir\'le ilgili dikkatini çeken bir şey oldu mu?', cevap: 'Matematik dersinde Emir\'in çantasının altından su sızıyordu. Sırasının altı göl olmuştu. Ben bir şey demedim... kimse bana bir şey sormaz zaten. Emir de kimseye çaktırmadan yerleri sildi.' },
          { soru: 'Emir suyu silerken nasıl görünüyordu?', cevap: 'Kötü görünüyordu. Yüzü bembeyazdı. Çantasını açıp içine baktı, sonra kapağını hemen kapattı. Sanki çantada görmek istemediği bir şey vardı.' }
        ]
      },
      deliller: [
        { ad: 'Kitabın sayfaları', emoji: '📖', aciklama: 'Sayfalar dalga dalga kurumuş, mürekkep yer yer dağılmış. Bu iz yağmurdan değil, kapalı bir yerde suya doymaktan olur — mesela ıslak bir çantanın içinde.' },
        { ad: 'Kayıt defteri', emoji: '📒', aciklama: 'Son ödünç alan: Emir. İade, teslim gününün akşamı, kütüphane görevlisi çıktıktan sonra sessizce rafa bırakılarak yapılmış. Elden teslim kuralı atlanmış.' },
        { ad: 'Emir\'in matarası', emoji: '🍶', aciklama: 'Mataranın kapak lastiği yırtık; kapak sonuna kadar sıkılsa bile yan durunca sızdırıyor. Deneme yapıldı: beş dakikada bir bardak su kaçırdı.' },
        { ad: 'Kalorifer üstündeki iz', emoji: '📄', aciklama: 'Kütüphane yanındaki kaloriferin üstünde, kitap kapağı şeklinde solmuş bir buhar izi var. Biri ıslak bir kitabı burada aceleyle kurutmaya çalışmış.' }
      ],
      dogruHukum: 'suclu',
      gercek: 'Emir\'in yırtık contalı matarası çantada aktı ve kitap suya doydu. Emir önce paniğe kapıldı, kitabı kaloriferin üstünde kurutmaya çalıştı; olmayınca kimsenin görmediği bir saatte sessizce rafa bıraktı. Kaza gerçekten kazaydı — ama Emir\'i sanık sandalyesine oturtan şey su değil, sakladığı gerçekti.',
      cezalar: [
        { metin: 'Kazadır, olur böyle şeyler; kitap da zaten eskiydi. Kimse ceza almasın, kapatalım dosyayı.', tip: 'gevsek' },
        { metin: 'Emir kütüphaneden ve Zeynep\'ten özür dilesin; biriktirdiği harçlıkla kitabın yenisini alsın ve iki hafta kütüphane koluna katılıp yıpranan kitapları kaplasın.', tip: 'onarici' },
        { metin: 'Emir bir dönem boyunca kütüphaneye adım atamasın ve yaptığını bütün okulun önünde, bayrak töreninde anlatsın.', tip: 'intikamci' }
      ],
      ders: 'Kaza suç değildir; ama kazayı saklamak, emanete ikinci kez zarar vermektir. "Islattım, ne yapabilirim?" diyen bir Emir belki hiç sanık olmayacaktı. Ceza da yaranın üstüne tuz basmak için değil, yarayı sarmak için verilir — kütüphaneden koparılan Emir düzelmez, kütüphaneye emek veren Emir düzelir.',
      sanikGozundenKarakter: 'emir',
      sanikGozunden: [
        { metin: 'Çantamın altından su sızdığını görünce midem bulandı. "Lütfen kitap olmasın, lütfen kitap olmasın" diye dua ettim ama fermuarı açtığımda "Çocuk Kalbi"nin kapağı sırılsıklamdı.' },
        { metin: 'Kaloriferin üstüne koyup kuruturken elim ayağım titriyordu. Sayfalar dalgalandıkça sanki ben de içeriden dalgalanıyordum: "Şimdi ne yapacağım, kime söyleyeceğim?"' },
        { metin: 'Rafa bırakırken kimsenin görmediğinden emin oldum — o an rahatladığımı sandım ama aslında sadece korkuyu erteledim. Eve giderken hiçbir şey tatmadı, hiçbir şey duymadım.' },
        { metin: 'Mahkemede gerçek ortaya çıkınca aslında içim ferahladı. Saklamak, ıslatmaktan çok daha ağırmış meğer. "Islattım" demek bu kadar zor olmamalıydı.' }
      ]
    },

    // ------------------------------------------------------------
    // VAKA 3 — Sanık masum (hüsn-ü zan: sert görünüş ≠ suç; gerçek fail rüzgâr)
    // ------------------------------------------------------------
    {
      id: 'v3',
      baslik: 'Yırtılan Proje Dosyası',
      deger: 'Hüsn-ü zan — kimseye "hep o yapar" damgası vurmamak',
      ozet: 'Nazan Öğretmen dosyayı verirken kaşlarını çatar: "Bu dosyada herkes hükmü çoktan vermiş, hâkimim. İşte tam da bu yüzden sana ihtiyacımız var." Elif\'in grubunun üç haftadır hazırladığı "Suyun Yolculuğu" afişi, teneffüs dönüşü panoda paramparça bulundu. Ve Burak, elinde afişten kopmuş koca bir parçayla panonun tam önünde yakalandı. Sınıf tek ağızdan bağırdı: "Kesin Burak!"',
      taraflar: [
        { karakter: 'burak', rol: 'sanık' },
        { karakter: 'elif', rol: 'şikâyetçi' },
        { karakter: 'hademe', rol: 'tanık' }
      ],
      ifadeler: {
        burak: [
          { soru: 'Sınıf seni elinde afiş parçasıyla gördü. Ne diyeceksin?', cevap: 'Elimde parça vardı çünkü afiş gözümün önünde panodan koptu, ben de düşerken yakalamaya çalıştım! Yarısını tutabildim. Sonra kapı açıldı ve herkes bağırmaya başladı. Kimse "ne oldu?" diye sormadı bile.' },
          { soru: 'Sence neden kimse sormadı?', cevap: '...Çünkü ben Burak\'ım. İri olan, suratsız olan. Bir şey kaybolsa önce bana bakarlar, bir şey kırılsa önce bana. Alıştım dersem yalan olur hâkimim. İnsan buna alışamıyor.' }
        ],
        elif: [
          { soru: 'Afiş senin grubunundu. Sen ne gördün Elif?', cevap: 'Ben... ben sınıfa ilk girenlerdendim. Burak\'ın elinde parça vardı, evet... Ama... — sesim titriyor, kusura bakma hâkimim — ben Burak\'ı yırtarken görmedim. Kimse görmemiş. Herkes "gördük" diyor ama sorunca "elinde parça vardı" diyorlar. Bu aynı şey değil.' },
          { soru: 'Emeğine yazık olmadı mı? Kızgın değil misin?', cevap: 'Üç haftalık emeğim gitti, tabii ki içim yanıyor. Ama yanlış kişiye kızarsam emeğim geri gelmez, üstüne bir de vicdanım yanar. Ben doğrusunu istiyorum, suçlusunu değil.' }
        ],
        hademe: [
          { soru: 'Ramazan Amca, o sabah 7-A\'da olağan dışı bir şey var mıydı?', cevap: 'Var ya hâkim bey/hanım, hem de benim yüzümden! Sabah okulu havalandırmak için bütün camları açtım. Sonra tek tek kapattım ama 7-A\'nın penceresi... ah benim unutkan kafam... açık kalmış. Mandalı da bozuk zaten, ay oldu söylüyorum tamir edilsin diye.' },
          { soru: 'Açık pencere afişi yırtabilir mi sizce?', cevap: 'Yırtar mı ne demek! Teneffüste koridor kapısı açılınca o sınıf rüzgâr tüneline döner. Geçen ay aynı pencere yüzünden deney raporları uçtu, bahçeden topladık. Poyraz esti mi o panoda kâğıt durmaz.' }
        ]
      },
      deliller: [
        { ad: 'Açık pencere', emoji: '🪟', aciklama: 'Panonun tam karşısındaki pencere ardına kadar açık, mandalı bozuk. O saatte dışarıda kuvvetli poyraz estiği nöbetçi öğretmen defterine bile yazılmış.' },
        { ad: 'Panodaki raptiyeler', emoji: '📌', aciklama: 'Üst iki raptiye hâlâ yerinde ve uçlarında kopmuş kâğıt payları duruyor. Afiş elle çekilip koparılmamış; asılı hâldeyken kendi köşesinden yük binip yırtılmış.' },
        { ad: 'Yırtığın yönü', emoji: '🔍', aciklama: 'Yırtık izi alttan yukarıya doğru ilerliyor. Biri afişi çekip yırtsaydı iz yukarıdan aşağı olurdu. Bu iz, alt ucu havalanan bir kâğıdın raptiyede asılı kalıp yırtılmasıyla uyumlu.' },
        { ad: 'Nöbetçi öğrenci tutanağı', emoji: '📝', aciklama: 'Nöbetçi öğrenci, teneffüs boyunca sınıf kapısının önünde durduğunu ve içeri Burak\'tan başka kimsenin girmediğini, Burak\'ın da zilden ancak bir dakika önce girdiğini söylüyor.' }
      ],
      dogruHukum: 'sucsuz',
      gercek: 'Suçlu bir öğrenci değil, açık pencereden dolan poyrazdı. Rüzgâr afişin alt ucunu havalandırdı, afiş üst raptiyelerde asılı kalıp ortadan yırtıldı. Burak sınıfa girdiğinde kâğıdın düştüğünü gördü ve son parçayı havada yakaladı — yani sınıfın "suç kanıtı" dediği şey, aslında bir iyilik anının fotoğrafıydı.',
      ders: 'İnsanları görünüşüne göre yargılamak, delilsiz hüküm vermenin en sinsi hâlidir; "kesin odur" cümlesi çoğu zaman "onu hiç sevmedim" cümlesinin kılık değiştirmişidir. Bir de şunu unutma: Elif gibi, kendi zararına rağmen "ben görmedim" diyebilen bir şahit, mahkemenin en değerli hazinesidir.',
      sanikGozundenKarakter: 'burak',
      sanikGozunden: [
        { metin: 'Kapıdan girer girmez afişin köşesinin havalandığını gördüm. Düşünmeden elimi uzattım, koca bir parçayı havada yakaladım — o an aklımdan geçen tek şey "üç haftalık emek yere düşmesin"di.' },
        { metin: 'Arkamı döndüğümde sınıf çoktan bağırıyordu: "Kesin Burak!" Elimdeki kâğıda baktım, sonra onlara baktım. Açıklayacak bir kelime bulamadım, sanki dilim de rüzgârla birlikte uçup gitmişti.' },
        { metin: 'Alıştım sandığım bir şeye o gün yeniden alışamadığımı fark ettim: "iri olan", "suratsız olan" hep önce ben oluyorum. Bir kere bile "ne oldu Burak?" diye sormadılar, hemen "yaptı" dediler.' },
        { metin: 'Hâkim "suçsuz" deyip pencereyi, raptiyeleri, yırtığın yönünü anlatınca sınıf sustu. O sessizlikte hissettiğim şey zafer değildi; sadece biri sonunda bana bakmış gibi hissettim.' }
      ]
    },

    // ------------------------------------------------------------
    // VAKA 4 — Delil yetersiz (acele hükmetmeme; geçmiş hata delil değildir)
    // ------------------------------------------------------------
    {
      id: 'v4',
      baslik: 'Kantin Kuyruğu Dosyası',
      deger: 'Şüpheyle hüküm verilmez — geçmiş hata delil sayılmaz',
      ozet: 'Nazan Öğretmen bu dosyayı verirken uzun uzun yüzüne bakar: "Hâkimim, bazen en cesur hüküm, hüküm vermemektir. Sadece söylemiş olayım." Selim\'in kantin kuyruğunda elinde tuttuğu 50 lira, itiş kakış arasında kayboldu. Hemen arkasında Emir duruyordu. Ve koridorda fısıltılar çoktan başladı: "Kitap olayını hatırlasanıza... Kesin Emir!"',
      taraflar: [
        { karakter: 'emir', rol: 'sanık' },
        { karakter: 'selim', rol: 'şikâyetçi' },
        { karakter: 'kantinci', rol: 'tanık' }
      ],
      ifadeler: {
        emir: [
          { soru: 'Selim\'in tam arkasındaydın. Parayı gördün mü?', cevap: 'Görmedim hâkimim, vallahi görmedim! Kuyrukta önüme arkama üç kişi girdi çıktı, ben tostuma bakıyordum. Elimi cebimden bile çıkarmadım.' },
          { soru: 'Peki sence neden herkes senden şüpheleniyor?', cevap: 'Kitap yüzünden... O olayda hata yaptım, sakladım ama sonunda her şeyi kabul edip elimden geleni yaptım. Ama demek ki silinmiyor. Bir kere hata yaptım diye artık okulda ne kaybolsa "Emir mi acaba?" mı diyecekler? Bu... bu çok ağır hâkimim.' }
        ],
        selim: [
          { soru: 'Parayı en son ne zaman gördün?', cevap: 'Elimde tutuyordum, sıkı sıkı. Kuyruk birden itişti, ben öne savruldum, tezgâha tutundum... Sonra baktım, elim boş. Emir tam arkamdaydı, onu biliyorum.' },
          { soru: 'Emir\'in parayı aldığını gördün mü?', cevap: 'Görmedim... Ama başka kim olabilir ki? Yani... aslında bilmiyorum. Herkes "kitap olayı" deyince ben de öyle düşündüm. Belki de haksızlık ediyorum, kafam karıştı hâkimim.' }
        ],
        kantinci: [
          { soru: 'İsmail Abi, o gün kantinde neler oldu?', cevap: 'Sorma hâkim bey/hanım, ana baba günüydü! Üç sınıf aynı anda indi, kuyruk yılan gibi kıvrıldı. İtiş kakış, gülüşme, bağrışma... O kalabalıkta yere düşen parayı fil düşse görmezdim. Kamera mı? Bizim kantinde kamera ne gezer!' },
          { soru: 'Emir o gün sizden alışveriş yaptı mı?', cevap: 'Yaptı, tost bir de ayran. Ama parayla değil — veresiye yazdırdı, defterim şahit. Şimdi sen düşün: cebinde taze 50 lira olan çocuk veresiye yazdırır mı? Yazdırmaz derim ben... ama kim bilir, belki de akıllılık edip saklamıştır. Vallahi bilemiyorum, yemin edemem.' }
        ]
      },
      deliller: [
        { ad: 'Veresiye defteri', emoji: '📓', aciklama: 'Emir o gün tost ve ayranı veresiye yazdırmış. Cebinde 50 lira olan birinin veresiye yazdırması tuhaf — ama bu bir ihtimaldir, kanıt değil. Ne suçunu ne suçsuzluğunu ispatlıyor.' },
        { ad: 'Kuyruk krokisi', emoji: '👥', aciklama: 'Görgü ifadelerine göre itiş kakış sırasında Selim\'le Emir\'in arasına en az üç öğrenci daha girip çıkmış. "Tam arkamdaydı" bilgisi o anda artık doğru bile değilmiş.' },
        { ad: 'Kayıp eşya kutusu', emoji: '🗃️', aciklama: 'O hafta kantin önünde bulunup kutuya atılan tek para, buruşuk bir 20 lira. Kayıp 50 lira ne kutuda ne yerde — sanki kalabalıkla birlikte buharlaşmış.' },
        { ad: 'Emir\'in cepleri ve çantası', emoji: '🧥', aciklama: 'Emir aranmayı kendisi istedi: "Bakın, hiçbir şeyim yok!" Ceplerinde ve çantasında 50 lira çıkmadı. Ama aradan saatler geçtiği için bu da tek başına bir şey kanıtlamıyor.' }
      ],
      dogruHukum: 'delilYetersiz',
      gercek: 'Bu dosyanın perde arkası hiç aydınlanamadı. Para büyük ihtimalle itiş kakışta yere düştü ve onlarca ayağın altında kim bilir nereye sürüklendi; belki de biri bulup sesini çıkarmadı. Kesin olan tek şey şu: eldeki hiçbir delil Emir\'i göstermiyordu — onu gösteren tek şey, geçmişteki bir hatasının gölgesiydi.',
      ders: 'Delil yoksa hüküm de yoktur; şüphe ne kadar kalabalıksa kalabalıklaşsın, tek bir kanıtın yerini tutamaz. Ve bir insanın geçmiş hatası delil değildir — dün düşen birini bugün de itersen, ayağa kalkmayı ona hiç öğretemezsin.',
      sanikGozundenKarakter: 'emir',
      sanikGozunden: [
        { metin: 'Kuyrukta "para kayboldu" lafı duyulur duyulmaz midem kasıldı. Daha kimse adımı söylememişti ama ben şimdiden içimden "yine mi ben" diye geçirdim.' },
        { metin: 'Fısıltılar başlayınca en çok kitap olayının adını duymak canımı yaktı. O olayda hatamı kabul etmiştim, bedelini ödemiştim — ama demek ki bir leke bir kere düşünce hiç çıkmıyormuş.' },
        { metin: 'Ceplerimi, çantamı kendim boşalttım herkesin önünde. "Bakın, hiçbir şeyim yok" derken sesim titredi; masum olmak bile beni temize çıkarmaya yetmeyebilirdi, çünkü kimse "gördüm" demiyor ama herkes "yine de" diyordu.' },
        { metin: 'Hâkim "delil yetersiz, geçmiş hata delil sayılmaz" deyince içim biraz açıldı ama tam da rahatlamadım — çünkü hüküm beraat değildi, sadece "bilmiyoruz" idi. Yine de bu, hiç kimsenin bana bakmadığı günlerden sonra bana da bir şans tanınması gibiydi.' }
      ]
    },

    // ------------------------------------------------------------
    // VAKA 5 — Sanık suçlu (kişilik hakkı, alay; adil şahitlik)
    // ------------------------------------------------------------
    {
      id: 'v5',
      baslik: 'Panodaki Karikatür Dosyası',
      deger: 'Kişilik hakkı — alay etmemek, kırmadan konuşmak',
      ozet: 'Nazan Öğretmen dosyayı uzatırken sesi ciddidir: "Hâkimim, bu dosyada gülen çoktu ama kimse komik değildi." Sabah sınıf panosunda imzasız bir karikatür bulundu: başında taç, elinde kırbaç bir kız ve altında kocaman bir yazı — "Kraliçe Zeynep ve Kulları". Sınıf gülmekten kırıldı; Zeynep ise günü tuvalette ağlayarak geçirdi. Kâğıtta imza yok, ama okulun gözü bir kişinin üstünde.',
      taraflar: [
        { karakter: 'burak', rol: 'sanık' },
        { karakter: 'zeynep', rol: 'şikâyetçi' },
        { karakter: 'selim', rol: 'tanık' }
      ],
      ifadeler: {
        burak: [
          { soru: 'Karikatürü sen mi çizdin Burak?', cevap: '...Evet, ben çizdim. Yalan söylemeyeceğim, ben yalandan yırtılan afiş kadar nefret ederim. Resim benim, asan da benim.' },
          { soru: 'Neden yaptın?', cevap: 'Zeynep proje grubuna beni almadı. Herkesin içinde "sen zaten çalışmazsın" dedi. Ben de... güldürürsem belki aralarına alırlar sandım. Komik olayım dedim, zalim olmuşum. Ağlayacağını bilseydim... Bilmiyordum hâkimim.' }
        ],
        zeynep: [
          { soru: 'O sabah neler yaşadın Zeynep?', cevap: 'Sınıfa girdim, herkes gülüyordu. Önce espriye ben de güldüm — sonra panoyu gördüm. Kendi sınıfımın ortasında küçüldüm de küçüldüm hâkimim. Sınıf başkanıyım diye kural hatırlatıyorum, "kraliçe" bu muymuş meğer?' },
          { soru: 'Burak\'a "sen zaten çalışmazsın" dedin mi?', cevap: 'Dedim... Herkesin içinde dedim, evet. Grubu korumak istiyordum ama şimdi düşününce... ben de onu herkesin önünde küçülttüm. Bunu burada söylemek zoruma gidiyor ama doğrusu bu.' }
        ],
        selim: [
          { soru: 'Selim, o sabah erken gelen sendin. Ne gördün?', cevap: 'Ben... servisim ilk geldiği için sınıfa hep ilk ben girerim. Burak\'ı panoya kâğıt asarken gördüm. Söylemek istemedim çünkü daha yeniyim, "ispiyoncu" derler diye korktum...' },
          { soru: 'Peki neden anlatmaya karar verdin?', cevap: 'Nazan Öğretmen geçen hafta "şahitlik emanettir; gördüğünü saklayan, yükü suçsuz birinin sırtına yıkar" demişti. Kalem kutusu dosyasında o suçsuz bendim, unutmadım. Sustukça başkası yanacaktı; ben de gördüğümü söylüyorum, ne eksik ne fazla.' }
        ]
      },
      deliller: [
        { ad: 'Karikatürün çizgileri', emoji: '🖍️', aciklama: 'Resim kömür kalemiyle çizilmiş ve gölgeleme tekniği çok ustaca. Resim dersinde kömür kalem kullanan tek öğrenci Burak; öğretmeni onun bu yeteneğini hep över.' },
        { ad: 'Kâğıdın arkası', emoji: '📄', aciklama: 'Kâğıt bir matematik defterinden koparılmış; arkasında yarım bırakılmış bir bölme işlemi var. Rakam el yazısı, Burak\'ın defterindeki yazıyla birebir aynı — kopan sayfa izi de defterine tam oturuyor.' },
        { ad: 'Servis giriş kaydı', emoji: '🚌', aciklama: 'Güvenlik defterine göre o sabah okula ilk giren öğrenciler: Selim (07.42) ve Burak (07.45). Karikatür 08.10\'da fark edildiğinde sınıfa henüz başka giren olmamıştı.' }
      ],
      dogruHukum: 'suclu',
      gercek: 'Karikatürü Burak çizdi ve astı — bunu mahkemede mertçe itiraf da etti. Amacı Zeynep\'i ağlatmak değil, "sen zaten çalışmazsın" sözünün kırgınlığını mizaha sarıp sınıfa kendini kabul ettirmekti. Ama alay, sahibinin niyetine bakmaz; kimin kalbine düştüyse onun ağırlığınca tartılır. Mahkeme bir şeyi daha gördü: Zeynep\'in herkes içinde söylediği o söz de bu dosyanın görünmeyen ilk sayfasıydı.',
      cezalar: [
        { metin: 'Burak\'ın da rezil bir karikatürü çizilip aynı panoya asılsın; o da aynı şeyi yaşasın da görsün gününü.', tip: 'intikamci' },
        { metin: 'Şakaydı işte, gençlik hâli; kâğıdı çöpe atalım, kimse büyütmesin bu meseleyi.', tip: 'gevsek' },
        { metin: 'Burak, Zeynep\'ten sınıfın önünde — yani güldükleri yerde — özür dilesin; bu kez Zeynep\'in emeğini anlatan güzel bir resim çizip aynı panoya assın. Zeynep de proje grubunda Burak\'a bir görev versin.', tip: 'onarici' }
      ],
      ders: 'Karşındaki gülmüyorsa, o artık şaka değildir; bir insanın onuru, sınıfı güldürmek için harcanamaz. Ve dikkat et: özrün panoya asılması boşuna değil — kırık nerede yaşandıysa, onarım da orada yapılır.',
      sanikGozundenKarakter: 'burak',
      sanikGozunden: [
        { metin: '"Sen zaten çalışmazsın" sözünü herkesin içinde duyunca yüzüm kızardı ama hiçbir şey söyleyemedim. Eve gidene kadar o cümle kafamda dönüp durdu.' },
        { metin: 'Kömür kalemimi elime alınca içimden "onları güldüreyim, belki böyle beni severler" diye geçirdi. Çizerken bile bir yandan kendimi haklı çıkarmaya çalışıyordum: "Sadece komik, kimse ciddiye almaz."' },
        { metin: 'Sabah panoya astığımda gülüşmeleri duyunca bir an gurur duydum — ta ki Zeynep\'in yüzünü, gerçek yüzünü görene kadar. Gülen ben değildim artık, o tuvalette ağlıyordu.' },
        { metin: 'Mahkemede "ben çizdim" derken sesim titremedi ama içim titredi. Alay ettiğim an bana komik gelmişti; şimdi o kâğıdı düşününce içimde hiç komik bir şey kalmadı, sadece "keşke" var.' }
      ]
    },

    // ------------------------------------------------------------
    // VAKA 6 — Sanık suçlu (iftira/dedikodu zinciri; çelişen ifadeler)
    // ------------------------------------------------------------
    {
      id: 'v6',
      baslik: 'Fısıltı Zinciri Dosyası',
      deger: 'İftiranın ağırlığı — dedikodunun ilk halkası olmamak',
      ozet: 'Nazan Öğretmen son dosyayı verirken gözlerinin içine bakar: "Hâkimim, bu dosyada silah yok, iz yok; sadece kelimeler var. Ama en derin yarayı da onlar açmış." Bir haftadır bütün okul "Elif fen sınavında kopya çekmiş" diye fısıldaşıyor; Elif yemekhanede tek başına oturur olmuş. Herkes dedikoduyu Emir\'den duyduğunu söylüyor — ama rehber öğretmen Murat Bey ipin ucunu çekince, yumak bambaşka bir kapıya çıktı: sanık sandalyesinde sınıf başkanı Zeynep oturuyor.',
      taraflar: [
        { karakter: 'zeynep', rol: 'sanık' },
        { karakter: 'elif', rol: 'şikâyetçi' },
        { karakter: 'emir', rol: 'tanık' },
        { karakter: 'rehber', rol: 'tanık' }
      ],
      ifadeler: {
        zeynep: [
          { soru: 'Bu söz senden mi çıktı Zeynep?', cevap: 'Hayır! Yani... ben sadece gördüğümü söyledim: sınavda Nazan Öğretmen, Elif\'in kâğıdına uzun uzun baktı, iki kere hem de. Ben "kopya çekti" demedim ki! O lafı Emir uydurdu, benim üstüme yıkmasın!' },
          { soru: 'Sadece gördüğünü mü söyledin, yoksa üzerine kendi yorumunu da ekledin mi?', cevap: '...Ben... yani şüphemi de söylemiş olabilirim. Ama kötü niyetle değil! Sınıf başkanıyım, sınıfın haklarını korumak benim görevim, bir haksızlık varsa... Ah... Şimdi söylerken fark ediyorum: ortada haksızlık falan yoktu, sadece benim şüphem vardı, değil mi?' }
        ],
        elif: [
          { soru: 'Bu bir haftada neler yaşadın Elif?', cevap: 'Kimse yüzüme bir şey demiyor hâkimim ama arkamı döner dönmez fısıltılar başlıyor. Yemekhanede masama kimse oturmuyor. Ben... ben kopya çekmedim. Ama asıl yaralayan ne biliyor musun? Çekmediğimi kanıtlamak zorunda bırakılmak.' },
          { soru: 'Sınav günü hatırladığın bir şey var mı?', cevap: 'Öğretmen kâğıdımın başında durdu, evet... Ben de çok korkmuştum, "bir yanlış mı yaptım?" diye. Meğer... neyse, onu delillerde görürsün hâkimim. Keşke herkes fısıldamadan önce bir kere sorsaydı.' }
        ],
        emir: [
          { soru: 'Emir, herkes dedikoduyu senden duymuş. Sen kimden duydun?', cevap: 'Zeynep\'ten hâkimim! Bana teneffüste bir not verdi, sonra da kulağıma "bence Elif\'in kâğıdında bir şeyler dönüyor, kopya çekmiş olabilir" dedi. Ben de... ben de düşünmeden üç kişiye söyledim. Ağzımdan çıkanı kulağım duysaydı keşke.' },
          { soru: 'Zeynep "kopya lafını Emir uydurdu" diyor. Buna ne dersin?', cevap: 'Uydurmadım! Süsledim ama... "olabilir"i ben "çekmiş" yaptım, orası benim günahım, kabul ediyorum. Ama tohumu ben ekmedim hâkimim, not ortada. Bir kere kitap olayında yandım, artık burada tek bildiğim doğruyu söylüyorum.' }
        ],
        rehber: [
          { soru: 'Murat Bey, bu fısıltının izini nasıl sürdünüz?', cevap: 'Tek tek konuştum çocuklarla; on iki öğrenci, herkes bir öncekini işaret etti. Zincir hep aynı kapıya çıktı: Emir\'e, Emir\'den de Zeynep\'in teneffüste verdiği bir nota. Dedikodu böyledir hâkimim: herkes "ben sadece duyduğumu söyledim" der, ama zincirin her halkası yükü biraz daha ağırlaştırır.' },
          { soru: 'Elif\'i bu süreçte nasıl gördünüz?', cevap: 'Haftalardır odama gülerek giren kız, son hafta kapıyı vurmaya çekinir oldu. Kelimenin kemiği yoktur derler ya — yanlış. Kelimenin kemiği yoktur ama kırdığı şeylerin vardır.' }
      ]
      },
      deliller: [
        { ad: 'Buruşuk not kâğıdı', emoji: '📝', aciklama: 'Emir\'in kitabının arasından çıktı; el yazısı Zeynep\'in. Aynen şöyle: "Kimseye söyleme!! Nazan Hoca sınavda Elif\'in kâğıdına İKİ KERE uzun uzun baktı. Bence bir şeyler dönüyor!!" Yani Zeynep gördüğünü değil, şüphesini yaymış.' },
        { ad: 'Sınav sonucu ve öğretmen notu', emoji: '📊', aciklama: 'Elif fen sınavından 98 almış. Nazan Öğretmen\'in not defterinin kenarında el yazısı bir not: "Elif\'in 4. cevabı kitaptakinden bile güzel — dönüp bir daha okudum!" Uzun bakışın sırrı buymuş.' },
        { ad: 'Rehberlik görüşme çizelgesi', emoji: '🔗', aciklama: 'Murat Bey\'in çizdiği zincir şeması: 12 öğrenci, 12 ok. Bütün oklar geriye doğru Emir\'e, Emir\'den de Zeynep\'in notuna ulaşıyor. Zincirin ilk halkası belli.' },
        { ad: 'Yemekhane nöbet defteri', emoji: '🍽️', aciklama: 'Nöbetçi öğretmen kaydı: Elif son beş gündür yemekhanede tek başına oturuyor. Kâğıda dökülmüş hâliyle bile insanın içini acıtan bir delil.' }
      ],
      dogruHukum: 'suclu',
      gercek: 'Nazan Öğretmen sınavda Elif\'in kâğıdına uzun bakmıştı — çünkü cevabı o kadar güzeldi ki dönüp bir daha okumuştu. Zeynep bu masum ânı şüpheyle yorumladı ve "bence bir şeyler dönüyor" notuyla tohumu toprağa attı; Emir "olabilir"i "çekmiş" yaparak suladı; okul da üç günde hasadını kaldırdı. Zeynep mahkemede notu görünce sesi kısıldı: "Ben sadece bir cümle yazmıştım..." Evet — çığ da tek bir kar tanesiyle başlar.',
      sanikGozundenKarakter: 'zeynep',
      sanikGozunden: [
        { metin: 'Öğretmenin Elif\'in kâğıdının başında iki kere durduğunu görünce içimde bir şüphe kıvılcımı çaktı. "Sınıf başkanıyım, bir haksızlık varsa fark etmeliyim" diye düşündüm — ama fark ettiğim şey aslında hiçbir şey değildi.' },
        { metin: 'Teneffüste Emir\'e notu uzatırken "sadece arkadaşça bir gözlem" sanıyordum kendimi. "Bence bir şeyler dönüyor" yazarken elim hiç titremedi, çünkü ne yaptığımın farkında bile değildim.' },
        { metin: 'Dedikodu okulu sarınca önce şaşırdım, sonra ürktüm: "Bu kadar büyümesini istememiştim." Ama geri almak, bir yastığın tüylerini rüzgârdan toplamaya benziyordu — elimden hiçbir şey gelmiyordu.' },
        { metin: 'Mahkemede kendi notumu önümde görünce sesim kısıldı. "Ben sadece bir cümle yazmıştım" derken fark ettim ki bazı cümleler küçük başlar ama koca bir çığ olup birinin üstüne çöker. Elif\'in yüzüne bakmaya utandım.' }
      ],
      cezalar: [
        { metin: 'Zeynep, Elif\'in adını temizleyen açıklamayı kendi sesiyle sınıfın önünde okusun, Elif\'ten özür dilesin; zincirin ikinci halkası Emir de yanında dursun ve payını üstlensin. İkisi birlikte, dedikoduyu ulaştırdıkları herkese tek tek gidip "yanılmışız" desin.', tip: 'onarici' },
        { metin: 'Zeynep sınıf başkanlığından derhâl alınsın ve bir dönem teneffüslerde konuşma yasağı cezası çeksin — bakalım fısıldamak neymiş anlasın.', tip: 'intikamci' },
        { metin: 'Çocuklar arasında olur böyle konuşmalar; zaten notta "bence" demiş, yani yorum. Kimse ceza almasın, unutulur gider.', tip: 'gevsek' }
      ],
      ders: 'Nazan Öğretmen hükümden sonra dedesinden dinlediği hikâyeyi anlattı: "Rüzgârlı bir günde bir yastık dolusu kuş tüyünü damdan savur, sonra git hepsini geri topla. Toplayamazsın, değil mi? Dedikodu da öyledir." Şüpheni yaymadan önce sor: Gördüm mü, yoksa sadece zannediyor muyum? Çünkü zannını fısıldayan, iftiranın ilk halkasını kendi eliyle takar.'
    }

  ]
};
