// tests_part1.js — Kibir, Cesaret, Cömertlik, Zan, Hırs, Vesvese
// Option sırası: puan 5 (İfrat) → 4 → 3 (Fazilet) → 2 → 1 (Tefrit)

const TESTS_PART1 = {
    kibir: {
        title: "Aynadaki Hiçlik mi, Bulutlarda Kibir mi?",
        concepts: { tefrit: "Tezellül", fazilet: "Tevazu", ifrat: "Kibir" },
        questions: [
            { soru: "Toplantıda sizin fikrinizi başka biri sahiplenip alkış aldı.", options: [
                { text: "Hemen müdahale eder, fikrin asıl sahibi olduğumu yüksek sesle ilan ederim.", puan: 5 },
                { text: "Sözü alıp kendi katkımı vurgulayarak payımı ortaya koyarım.", puan: 4 },
                { text: "Sakinlikle eksik kalan kısımları tamamlar, arkadaşı da takdir ederim.", puan: 3 },
                { text: "Biraz bozulurum ama ses çıkarmadan geçiştiririm.", puan: 2 },
                { text: "Zaten bir katkım olamaz diye düşünüp tamamen susarım.", puan: 1 }
            ] },
            { soru: "Başarınızı tebrik edeceklerdi ama ilgi başka birine kayıp sizi unuttular.", options: [
                { text: "Asıl başarının bana ait olduğunu gürültüyle ortama hatırlatırım.", puan: 5 },
                { text: "Emeğimin fark edilmesi için ince ipuçları bırakırım.", puan: 4 },
                { text: "Diğer kişiyi de tebrik eder, dikkat çekme derdine düşmem.", puan: 3 },
                { text: "Biraz kırılırım ama hakkım yokmuş gibi hissederim.", puan: 2 },
                { text: "Bu ilgiyi hak etmediğimi düşünüp içime kapanırım.", puan: 1 }
            ] },
            { soru: "Patronunuz yapıcı bir dille hatanızı söyledi, haklı olduğunu biliyorsunuz.", options: [
                { text: "Ben hata yapmam diyerek inatla karşı çıkar, eleştiriyi reddederim.", puan: 5 },
                { text: "Şartları bahane ederek kendimi savunmaya çalışırım.", puan: 4 },
                { text: "Dikkatle dinler, teşekkür edip hatayı düzeltmeye çalışırım.", puan: 3 },
                { text: "Özür dilerim ama kendimi çok küçük hisseder sessizleşirim.", puan: 2 },
                { text: "Zaten beceriksizim diye düşünüp daha da içime kapanırım.", puan: 1 }
            ] },
            { soru: "Tanıştığınız biri yeteneğinizi abartılı biçimde övüyor.", options: [
                { text: "Evet, özel bir yeteneğe sahibim diyerek kendimi yüceltmeye başlarım.", puan: 5 },
                { text: "Hoşuma gider, biraz daha anlatmasını beklerim.", puan: 4 },
                { text: "Teşekkür ederim, konuyu fazla büyütmeden normalleştiririm.", puan: 3 },
                { text: "Memnun olurum ama abartıyorsunuz deyip çekinirim.", puan: 2 },
                { text: "Ben aslında çok yetersizim diyerek kendimi aşağılarım.", puan: 1 }
            ] },
            { soru: "Ekip tartışmasında karşı tarafın fikri daha mantıklı ama kabul etmek zor geliyor.", options: [
                { text: "Kesinlikle geri adım atmam, kendi fikrimi dayatmaya devam ederim.", puan: 5 },
                { text: "Benim fikrim de fena değildi diyerek onurumu korumaya çalışırım.", puan: 4 },
                { text: "Haklı olduklarını söyleyip meseleyi uzatmadan ortak çözüme varırım.", puan: 3 },
                { text: "Haklı olduklarını anlarım ama ben kimim ki deyip çekilirim.", puan: 2 },
                { text: "Zaten hep yanılıyorum diyerek hiç konuşmamayı tercih ederim.", puan: 1 }
            ] },
            { soru: "Sosyal medya paylaşımınız beklenmedik şekilde çok beğeni aldı.", options: [
                { text: "Daha çok takipçi ve beğeni peşine düşer, övgüye bağımlı hale gelirim.", puan: 5 },
                { text: "Daha fazla ilgi çekmek için ekstra paylaşımlar planlarım.", puan: 4 },
                { text: "Teşekkür edip ölçülü tepki veririm, ne şişinir ne küçültürüm kendimi.", puan: 3 },
                { text: "Biraz sevinsem de abartılıyor deyip geri çekilirim.", puan: 2 },
                { text: "Bunu hak edecek biri değilim, keşke paylaşmasaydım derim.", puan: 1 }
            ] },
            { soru: "Yolculukta kayboldunuz, yanınızdaki yol tarifi teklif ediyor.", options: [
                { text: "Kaybolduğumu asla kabul etmem, ben bu yola hakimim diye ısrar ederim.", puan: 5 },
                { text: "Kabul ederim ama aslında kaybolmadım gibi savunma yaparım.", puan: 4 },
                { text: "Teşekkür ederek yardım isterim, bunu doğal karşılarım.", puan: 3 },
                { text: "İsteksizce kabul eder, çok beceriksizim diye utanırım.", puan: 2 },
                { text: "Hiçbir şey beceremem duygusuyla ezik hissederim.", puan: 1 }
            ] },
            { soru: "Deneyiminiz az olmasına rağmen yeni gelenlere rehberlik görevi verildi.", options: [
                { text: "Burada en iyisi benim diye şov yaparak üstünlüğümü anlatırım.", puan: 5 },
                { text: "Zaman zaman üstten bakarak ben daha iyiyim havası veririm.", puan: 4 },
                { text: "Bilgimi paylaşır, abartılı iddiaya girmeden yardımcı olurum.", puan: 3 },
                { text: "Görevi alırım ama yetersiz hissederek pasif kalırım.", puan: 2 },
                { text: "Ben kimim ki yol göstereyim diyerek görevi reddederim.", puan: 1 }
            ] },
            { soru: "Bir aile büyüğü toplum içinde sizi haksız yere eleştirdi.", options: [
                { text: "Sen ne anlarsın diyerek sertçe karşılık veririm.", puan: 5 },
                { text: "Tartışmayı uzatıp benim hatam yok diye inatlaşırım.", puan: 4 },
                { text: "Saygıyı bozmadan yanlışı ifade eder, tatlıya bağlarım.", puan: 3 },
                { text: "Haklı olsam bile büyüktür bilir deyip kendimi küçültürüm.", puan: 2 },
                { text: "Hiç savunma yapmam, zaten hep haksızım diye susarım.", puan: 1 }
            ] },
            { soru: "Sunumunuzda mikrofon bozuldu, herkes size bakıyor.", options: [
                { text: "Beni kimse durduramaz tavrıyla durumu gösteriye çeviririm.", puan: 5 },
                { text: "Teknik ekibe bunu neden test etmediniz diye sert çıkışırım.", puan: 4 },
                { text: "Sakin kalıp teknik destek ister, sunuma mantıklı şekilde devam ederim.", puan: 3 },
                { text: "Kısık sesle devam ederim ama güvenim iyice sarsılır.", puan: 2 },
                { text: "Zaten beceremiyorum deyip sunumu yarıda bırakmak isterim.", puan: 1 }
            ] },
            { soru: "Aday olduğunuz pozisyona rakibiniz seçildi, sizi teselli ediyorlar.", options: [
                { text: "Torpil var diye dedikodu çıkararak onun itibarını sarsmaya çalışırım.", puan: 5 },
                { text: "Şansım yokmuş diyerek sitem eder, moral bozarım.", puan: 4 },
                { text: "Onun liyakatine saygı duyar, kendimi geliştirmeye odaklanırım.", puan: 3 },
                { text: "Kıskanırım ama benden iyidir deyip sessizce çekilirim.", puan: 2 },
                { text: "Ben zaten hiçbir zaman kazanamam diye kendimi tamamen küçümserim.", puan: 1 }
            ] },
        ]
    },
    cesaret: {
        title: "Kıpırdayamayan Yürek mi, Ateşe Atlayan Cesaret mi?",
        concepts: { tefrit: "Cübn", fazilet: "Cesaret", ifrat: "Tehevvür" },
        questions: [
            { soru: "Doğa kampında gece yabani hayvan bölgesinde rehber tek dolaşmayın diyor.", options: [
                { text: "Heyecan arıyorum diye tek başıma uzak noktalara sorumsuzca giderim.", puan: 5 },
                { text: "Ne olacak canım diyerek bazen tek başıma ormana dalarım.", puan: 4 },
                { text: "Uyarıları ciddiye alır, grup halinde hareket edip doğayı tedbirli keşfederim.", puan: 3 },
                { text: "Dışarı çıkmak istesem de korkum ağır basar, sürekli rehberin yanında kalırım.", puan: 2 },
                { text: "Çadırın dışına bile çıkmam, kampın tadını hiç alamam.", puan: 1 }
            ] },
            { soru: "Sokakta yaşlı birine sataşan kalabalık gençlerle karşılaştınız.", options: [
                { text: "Ne olursa olsun diyerek gözü kara kavgaya dalarım.", puan: 5 },
                { text: "Düşünmeden sesimi yükseltip tek başıma gruba çıkışırım.", puan: 4 },
                { text: "Durumu değerlendirip polise haber vererek makul biçimde müdahale ederim.", puan: 3 },
                { text: "Biraz bekler, belki vazgeçerler umuduyla doğrudan müdahale etmem.", puan: 2 },
                { text: "Zarar görmemek için gözümü kapatıp hızla uzaklaşırım.", puan: 1 }
            ] },
            { soru: "Çok kazandıran ama iflas riski de aynı ölçüde yüksek bir iş fırsatı var.", options: [
                { text: "Büyük oynayalım deyip tüm birikimimi yatırır, kaybetmeyi aklıma getirmem.", puan: 5 },
                { text: "Heyecanla hızlı karar veririm, pek fazla düşünmem.", puan: 4 },
                { text: "İş planını inceler, risk yönetimi yapıp mantıklıysa belirli sermayeyle katılırım.", puan: 3 },
                { text: "İçim gitse de kaybetme korkusuyla ciddi adım atmam.", puan: 2 },
                { text: "Riskli şeylere asla bulaşmam, garantici olayım diye kenarda kalırım.", puan: 1 }
            ] },
            { soru: "Gece karanlık ve güvensiz bir sokaktan geçmeniz gerekiyor, taksi de yok.", options: [
                { text: "Tam macera yeri deyip hiç tedbir almadan rahatça geçerim.", puan: 5 },
                { text: "Korkulacak bir şey yok deyip normal hızımla yürürüm.", puan: 4 },
                { text: "Dikkatle çevreyi gözetir, hızlı ama temkinli ilerlerim.", puan: 3 },
                { text: "Çaresiz kalırsam yavaşça ilerler, her sesle paniğe kapılırım.", puan: 2 },
                { text: "Asla tek başıma yürümem, saatlerce beklesem bile gitmem.", puan: 1 }
            ] },
            { soru: "Arkadaşlar sizi bungee jumping veya dağcılığa davet ediyor.", options: [
                { text: "En uç ve çılgın şeklini yapmak ister, aşırı riskleri bile göze alırım.", puan: 5 },
                { text: "Bir an önce deneyeyim diyerek temel eğitimleri geçiştirip hızla atlarım.", puan: 4 },
                { text: "Eğitmen ve güvenlik ekipmanı varsa kurallara uyarak denemeye varım.", puan: 3 },
                { text: "Merak etsem de başıma bir şey gelir korkusuyla seyirci kalırım.", puan: 2 },
                { text: "Tehlikeli her şeyden uzak dururum, kesinlikle gitmem.", puan: 1 }
            ] },
            { soru: "Kimsenin istemediği zor bir proje için patronunuz gönüllü arıyor.", options: [
                { text: "Zoru ben başarırım deyip her şeyi tek başıma yüklenmeye diretim.", puan: 5 },
                { text: "Hemen ben varım der, detayları sonra öğrenmeyi planlarım.", puan: 4 },
                { text: "Riskleri kabullenir plan yapar, gerektiğinde yardım isteyerek üstlenirim.", puan: 3 },
                { text: "İstesem de kendime güvenemem, ya rezil olursam diye korkarım.", puan: 2 },
                { text: "Zorluk çok fazla, yapamam diye baştan geri çekilirim.", puan: 1 }
            ] },
            { soru: "Kış şartlarında buzlu yolda araç kullanıyorsunuz, acil bir toplantı var.", options: [
                { text: "Aceleyle hızlanır, bir şey olmaz diyerek agresif kullanırım.", puan: 5 },
                { text: "Toplantı önemli deyip normal süratimle gitmeye devam ederim.", puan: 4 },
                { text: "Hızımı kış şartlarına göre ayarlar, dikkatli sürerim.", puan: 3 },
                { text: "Yola çıkarım ama aşırı korkuyla her an durup paniklerim.", puan: 2 },
                { text: "Tamamen kenara çekip hava düzelene kadar hiç hareket etmem.", puan: 1 }
            ] },
            { soru: "Hiç deneyiminiz olmadan büyük bir kalabalık önünde sunum daveti aldınız.", options: [
                { text: "Eminim mükemmel olacağım deyip hiç prova yapmadan çıkarım.", puan: 5 },
                { text: "Hazırlık az olsa bile bir cesaret sahneye atılırım.", puan: 4 },
                { text: "Heyecanı normal görüp hazırlığımı yapar, dengeli biçimde çıkıp konuşurum.", puan: 3 },
                { text: "Çıkmak istesem de korku baskın, çok zayıf bir sunum yaparım.", puan: 2 },
                { text: "Elim ayağım titrer, kesinlikle yapamam deyip çekilirim.", puan: 1 }
            ] },
            { soru: "Evin çatısında onarım gerekiyor, güvenlik ekipmanı var ama takması zaman alıyor.", options: [
                { text: "Koruma tedbirlerini reddeder, ben alışığım diye pervasızca çıkarım.", puan: 5 },
                { text: "Kemeri pek takmadan zaten dikkatliyim deyip hızlıca işimi görürüm.", puan: 4 },
                { text: "Emniyet kemeri ve uygun önlemleri alarak yavaş yavaş tamirimi yaparım.", puan: 3 },
                { text: "Çıkmayı denerim ama panikleyip yarıda vazgeçebilirim.", puan: 2 },
                { text: "Yükseklik korkum yüzünden asla çıkmam, başkasına da sormam.", puan: 1 }
            ] },
            { soru: "Uzun süredir çekindiğiniz birine duygularınızı açmak istiyorsunuz.", options: [
                { text: "Anı yaşa deyip plansızca ve fütursuzca her şeyi ortaya dökerim.", puan: 5 },
                { text: "Reddedilme riskini göze alıp fazla düşünmeden açılırım.", puan: 4 },
                { text: "Uygun ortam ve zamanı kollar, saygılı biçimde duygularımı ifade ederim.", puan: 3 },
                { text: "Cesaretimi toplayamam, belki reddedilmesem de adım atamam.", puan: 2 },
                { text: "Asla söyleyemem, reddedilme ihtimali beni tamamen felç eder.", puan: 1 }
            ] },
            { soru: "Yurt dışında iş fırsatı çıktı, aileniz riskli olabilir diyor.", options: [
                { text: "Plan falan düşünmeden hemen giderim, kaygı taşımam.", puan: 5 },
                { text: "Ailemi ikna etmeye çalışır, hızlıca harekete geçerim.", puan: 4 },
                { text: "Artıları eksileri tartıp, araştırma yapıp bilinçli karar veririm.", puan: 3 },
                { text: "Gitmek istesem de korkularım ağır basar, çekingen kalırım.", puan: 2 },
                { text: "Riske hiç girmem, bildiğim güvenli yolda devam ederim.", puan: 1 }
            ] },
        ]
    },
    comertlik: {
        title: "Cebine Gömülen Hazîne mi, Kontrolsüz Altın Yağmuru mu?",
        concepts: { tefrit: "Cimrilik", fazilet: "Cömertlik", ifrat: "İsraf" },
        questions: [
            { soru: "Elinize toplu bir prim geçti, hem ihtiyaçlarınız hem de yardıma muhtaç tanıdıklarınız var.", options: [
                { text: "Gösterişli harcamalar ve lükse dalarım, ne yardımı ne birikimi düşünürüm.", puan: 5 },
                { text: "Herkese dağıtmaya meyleder, kendi geleceğimi pek hesaba katmam.", puan: 4 },
                { text: "Kendi ihtiyaçlarımı giderir, gücüm yettiğince paylaşır, kalanını biriktiririm.", puan: 3 },
                { text: "Çok küçük bir kısmını kullanır, yardıma muhtaç olanı da görmezden gelirim.", puan: 2 },
                { text: "Bankaya koyar, temel ihtiyaçlarımı bile erteleyerek hiç harcamam.", puan: 1 }
            ] },
            { soru: "Aynı gün iki grup misafir gelecek, yemek planlaması yapıyorsunuz.", options: [
                { text: "Şov gibi ikram yapar, kilolarca yemek ziyan olur, kalanları atarım.", puan: 5 },
                { text: "Miktarı fazla kaçırırım, artan yemekleri nasıl saklayacağımı düşünmem.", puan: 4 },
                { text: "Misafir sayısına göre israf etmeden ama kimseyi aç bırakmayacak sofra kurarım.", puan: 3 },
                { text: "Biraz çeşit koyarım ama masraf fazla olmasın diye sürekli endişelenirim.", puan: 2 },
                { text: "Mümkün olan en ucuz malzemeyle idare ederim, misafir memnuniyetini düşünmem.", puan: 1 }
            ] },
            { soru: "Arkadaşlar etkinlik düzenliyor, katılım ücreti biraz yüksek.", options: [
                { text: "Kendi payımı öder, başkalarının da payını üstlenip abartılı harcarım.", puan: 5 },
                { text: "Hemen katılır, bütçemi zorlar ama çok düşünmem.", puan: 4 },
                { text: "Durumuma göre katılır, payımı öder ama bütçemi de aşmam.", puan: 3 },
                { text: "Uzun süre düşünür, kısa kesmek veya indirim istemek yoluna giderim.", puan: 2 },
                { text: "Masraf yapamam diyerek kesinlikle gitmem.", puan: 1 }
            ] },
            { soru: "Arkadaşınız sağlık sorunu için borç istiyor, ödeme gücü sınırlı.", options: [
                { text: "İstediğinden fazlasını verir, kendi hesabımı düşünmeden sınırsız yardım ederim.", puan: 5 },
                { text: "Hemen verir, geri ödeme konusunu hiç sormam.", puan: 4 },
                { text: "Gücümün yettiği kadar yardım eder, geri ödeme planı konuşurum.", puan: 3 },
                { text: "Çok düşünür, çok küçük bir miktar veririm.", puan: 2 },
                { text: "Param var ama yokmuş gibi davranıp vermekten kaçınırım.", puan: 1 }
            ] },
            { soru: "Markete ihtiyaç listesiyle gittiniz ama reyonlarda cazip ürünler var.", options: [
                { text: "Listeyi unutur, kasada dev bir hesapla ayrılırım.", puan: 5 },
                { text: "Listeye ek çok fazla ürün alırım, bütçeyi epey aşarım.", puan: 4 },
                { text: "Listeyi takip eder, birkaç makul ek alır ama bütçeyi gözetirim.", puan: 3 },
                { text: "Sadece listedeki en ucuz alternatifleri alır, ekstra hiçbir şey almam.", puan: 2 },
                { text: "Listeyi bile kısar, birçok ihtiyacı erteleyerek en az harcamayı yaparım.", puan: 1 }
            ] },
            { soru: "Bir tanıdığınız sizi çok özenli bir sofrayla ağırladı, siz de iade edeceksiniz.", options: [
                { text: "Onunkini ikiye katlayacak lüks bir ziyafet yapar, bütçemi hiç düşünmem.", puan: 5 },
                { text: "Çok fazla masraf yapar, biraz abartırım ama karşılık vermeliyim derim.", puan: 4 },
                { text: "Güzel ama dengeli bir sofra kurar, ne cimri ne müsrif davranırım.", puan: 3 },
                { text: "Çok basit bir ikram yapar, onun yaptığının çok altında kalırım.", puan: 2 },
                { text: "Davet etmeyi bile düşünmem, masraftan kaçınırım.", puan: 1 }
            ] },
            { soru: "Giysi ve eşyalarınız eskidi, maddi durumunuz fena değil.", options: [
                { text: "En pahalı markaları alır, gardırobu komple yeniler, sınır tanımam.", puan: 5 },
                { text: "İhtiyacımdan fazla alışveriş yapar, fazlasını düşünmem.", puan: 4 },
                { text: "İhtiyacım kadar yeniler, ne aşırı lükse kaçar ne de kendimi mahrum bırakırım.", puan: 3 },
                { text: "Çok az şey alır, çoğunu eski haliyle kullanmaya devam ederim.", puan: 2 },
                { text: "Param olsa da almam, yırtık bile olsa eskilerle idare ederim.", puan: 1 }
            ] },
            { soru: "Uzak bölgede okul yaptırmak için bağış kampanyası düzenleniyor.", options: [
                { text: "Gücümün çok üstünde bağış yapar, kendi mali güvenliğimi tehlikeye atarım.", puan: 5 },
                { text: "Cömertçe veririm ama bütçemdeki etkisini pek hesaplamam.", puan: 4 },
                { text: "Bütçeme uygun anlamlı bir miktar bağışlar, hayatımı olumsuz etkilemem.", puan: 3 },
                { text: "Çok küçük sembolik bir miktar veririm.", puan: 2 },
                { text: "Param var ama yok diyerek hiç vermem.", puan: 1 }
            ] },
            { soru: "Biriktirdiğiniz parayla tatile gidebilirsiniz, uzun süredir dinlenmeye ihtiyacınız var.", options: [
                { text: "En lüks oteli ve deneyimi seçer, bütçemin kat kat üstüne çıkarım.", puan: 5 },
                { text: "Rahatça harcar, dönüşte cebimde ne kalır pek düşünmem.", puan: 4 },
                { text: "Güzel ama makul bir tatil planlar, hem dinlenir hem bütçemi korurum.", puan: 3 },
                { text: "Çok ucuz bir seçenek bulurum ya da günü birlik giderim.", puan: 2 },
                { text: "Param var ama harcamaya kıyamam, tatile hiç gitmem.", puan: 1 }
            ] },
            { soru: "Maaş günü, paranızı nasıl değerlendirirsiniz?", options: [
                { text: "Hesapsızca dağıtır veya lükse dalar, ay sonunu hiç düşünmem.", puan: 5 },
                { text: "Cömertçe harcar, birikimi pek aklıma getirmem.", puan: 4 },
                { text: "Zorunlu giderleri ayırır, biraz tasarruf yapar, makul harcamalar yaparım.", puan: 3 },
                { text: "Asgari harcama yapar, her kuruşu biriktirmeye çalışırım.", puan: 2 },
                { text: "Harcamaktan korkar, temel ihtiyaçları bile ertelerim.", puan: 1 }
            ] },
            { soru: "Ay sonunda para kalmadı ya da çok az kaldı.", options: [
                { text: "Yine de kredi kartıyla harcamaya devam eder, borçlanmayı umursamam.", puan: 5 },
                { text: "Az da olsa elimdekini cömertçe paylaşır, durumumu görmezden gelirim.", puan: 4 },
                { text: "Durumumu gözden geçirir, bir sonraki ay bütçeyi daha iyi planlarım.", puan: 3 },
                { text: "Çok endişelenir, her harcamadan pişmanlık duyarım.", puan: 2 },
                { text: "Hiç harcamamış olmayı dilerdim, kendimi çok suçlarım.", puan: 1 }
            ] },
        ]
    },
    zan: {
        title: "Zehirli Bir Şüphe mi, Çocukça Bir Saflık mı?",
        concepts: { tefrit: "Sû-i Zan", fazilet: "Hüsnü Zan", ifrat: "Aşırı Saflık" },
        questions: [
            { soru: "Yeni komşunuz kapınıza hoş geldin hediyesi getirdi.", options: [
                { text: "Hemen kabul eder, tanımadan evime alır, sınırsız güvenirim.", puan: 5 },
                { text: "Sıcak karşılar, biraz fazla samimi davranır, iyi niyetinden şüphelenmem.", puan: 4 },
                { text: "Teşekkür eder, nazik karşılar ama tanımadan aşırı yakınlaşmam.", puan: 3 },
                { text: "Hediyeyi şüpheyle alır, arkasında bir çıkar var mı diye düşünürüm.", puan: 2 },
                { text: "Kesinlikle reddeder, alt tarafı bir iş ister diye kapıyı kapatırım.", puan: 1 }
            ] },
            { soru: "Arkadaşınız sosyal medyada paylaştığı yardım kampanyası için para istiyor.", options: [
                { text: "Hiç sorgulamadan istediği miktarı hemen gönderirim.", puan: 5 },
                { text: "Güvenirim, biraz araştırmadan yüklüce destek veririm.", puan: 4 },
                { text: "Kampanyayı araştırır, güvenilir bulursam gücüm yettiğince katkıda bulunurum.", puan: 3 },
                { text: "Çoğu kampanya sahte diye düşünür, çok temkinli davranırım.", puan: 2 },
                { text: "Kesinlikle dolandırıcılıktır deyip reddeder, arkadaşımı da suçlarım.", puan: 1 }
            ] },
            { soru: "Yeni gelen iş arkadaşı hakkında sinsi olabilir diye uyarılıyorsunuz.", options: [
                { text: "Uyarıları hiç ciddiye almam, hemen en yakın arkadaşım gibi davranırım.", puan: 5 },
                { text: "Herkes hakkında iyi düşünürüm, önyargıya pek kulak asmam.", puan: 4 },
                { text: "Önyargı taşımam ama kendi gözlemlerimle tanıyıp sonra karar veririm.", puan: 3 },
                { text: "Uyarıları ciddiye alır, o kişiye mesafeli ve soğuk davranırım.", puan: 2 },
                { text: "Duyduğum an onu tehlikeli ilan eder, çevreyi de uyarırım.", puan: 1 }
            ] },
            { soru: "Arkadaşınızın sizden sakladığı bir mesele olduğunu hissediyorsunuz.", options: [
                { text: "Saklıyorsa illaki güzel bir sürprizi vardır diye hiç sorgulamam.", puan: 5 },
                { text: "Çok merak etmem, zamanı gelince anlatır diye beklerim.", puan: 4 },
                { text: "Uygun bir dille sorar, zorlamadan öğrenmeye çalışırım.", puan: 3 },
                { text: "Benden bir şey gizliyorsa mutlaka kötü bir nedeni vardır diye kuşkulanırım.", puan: 2 },
                { text: "Arkamdan iş çeviriyor diye hemen güvenimi kaybeder uzaklaşırım.", puan: 1 }
            ] },
            { soru: "Tanımadığınız biri sizi aşırı övüp sizi çok sevdim diyor.", options: [
                { text: "Ne güzel insan deyip anında kucaklar, her dediğine inanırım.", puan: 5 },
                { text: "Hoşuma gider, fazla sorgulamadan samimiyetine inanırım.", puan: 4 },
                { text: "Kibarca teşekkür eder ama hemen yakınlaşmadan tanımaya çalışırım.", puan: 3 },
                { text: "Bir şey isteyecek diye tedirgin olur, mesafe koyarım.", puan: 2 },
                { text: "Kesinlikle art niyetli biri olduğuna kanaat getirip uzaklaşırım.", puan: 1 }
            ] },
            { soru: "Patronunuz yeni gelen kişiyi çok yetenekli diye övdü, size tanıttı.", options: [
                { text: "Patronun dediğine kayıtsız güvenir, hemen her işimi ona devrederim.", puan: 5 },
                { text: "Olumlu karşılar, fazla test etmeden işbirliği kurarım.", puan: 4 },
                { text: "Olumlu yaklaşır ama birlikte çalışarak kendi gözlemimle değerlendiririm.", puan: 3 },
                { text: "Patronun övmesine rağmen yetersiz olabilir diye temkinli yaklaşırım.", puan: 2 },
                { text: "Kesin torpillidir diye düşünür, ona güvenmem ve mesafe koyarım.", puan: 1 }
            ] },
            { soru: "Daha önce kazık yediğiniz biri tekrar dostluk kurmak istiyor.", options: [
                { text: "Geçmişi tamamen unutur, hiçbir tedbir almadan eski ilişkiye dönerim.", puan: 5 },
                { text: "İnsanlar değişir deyip fazla sorgulamadan şans veririm.", puan: 4 },
                { text: "Temkinli ama önyargısız yaklaşır, davranışlarını gözlemleyerek karar veririm.", puan: 3 },
                { text: "Büyük ihtimalle yine kazık yer diye düşünür, mesafe koyarım.", puan: 2 },
                { text: "Bir kez kazık yiyen iki kez yemez, kesinlikle reddederim.", puan: 1 }
            ] },
            { soru: "Arkadaşınız başka kimseye söyleme diyerek biraz riskli bir sır paylaştı.", options: [
                { text: "Sırrı herkese anlatmakta sakınca görmem, paylaşmak iyi bir şeydir derim.", puan: 5 },
                { text: "Çok yakın birkaç kişiye söylerim, zararı olmaz diye düşünürüm.", puan: 4 },
                { text: "Sırrı kimseye söylemem, arkadaşımın güvenini korumayı önemserim.", puan: 3 },
                { text: "Neden bana anlattı acaba, beni test mi ediyor diye şüphelenirim.", puan: 2 },
                { text: "Bu sırrı bana söylemesinin altında bir tuzak olduğuna eminim.", puan: 1 }
            ] },
            { soru: "Kapı kapı dolaşıp bağış toplayan biri geldi, birkaç kağıt gösteriyor.", options: [
                { text: "Hiç sorgulamadan cömertçe bağış yaparım, belgelerle ilgilenmem.", puan: 5 },
                { text: "Kağıtlara şöyle bir bakar, fazla incelemeden yardım ederim.", puan: 4 },
                { text: "Belgeleri dikkatle inceler, güvenilir bulursam yardım ederim.", puan: 3 },
                { text: "Büyük ihtimalle dolandırıcıdır diye düşünür, çok temkinli davranırım.", puan: 2 },
                { text: "Kesinlikle sahtekardır, kapıyı yüzüne kapatırım.", puan: 1 }
            ] },
            { soru: "Tanımadığınız bir hesap size özel proje var, çok kazandırır diye yazıyor.", options: [
                { text: "Heyecanlanır, hemen bilgilerimi paylaşıp katılmak isterim.", puan: 5 },
                { text: "İlginç gelebilir, birkaç soru sorup devam ederim.", puan: 4 },
                { text: "Çok dikkatli yaklaşır, detaylıca araştırıp güvenilirliğini doğrularım.", puan: 3 },
                { text: "Büyük ihtimalle dolandırıcılık diye düşünür, pek muhatap olmam.", puan: 2 },
                { text: "Kesinlikle dolandırıcı, hemen engellerim ve şikayet ederim.", puan: 1 }
            ] },
            { soru: "Arkadaşınız bir tanıdığınız hakkında çok tehlikeli dedi ama siz iyi tanıyorsunuz.", options: [
                { text: "Arkadaşımın sözünü hiç sorgulayıp hemen o kişiyi hayatımdan çıkarırım.", puan: 5 },
                { text: "Hmm, arkadaşım biliyordur deyip mesafe koymaya başlarım.", puan: 4 },
                { text: "Kendi deneyimlerime güvenir, iki tarafı da dinleyip karar veririm.", puan: 3 },
                { text: "Arkadaşım neden böyle dedi acaba, art niyetli olabilir diye kuşkulanırım.", puan: 2 },
                { text: "Arkadaşım kesin kıskançlıktan söylüyor deyip onu suçlarım.", puan: 1 }
            ] },
        ]
    },
    hirs: {
        title: "Hiç Kalkmayan Miskin mi, Durmaksızın Koşan Hırs Makinesi mi?",
        concepts: { tefrit: "Tembellik", fazilet: "Çalışkanlık", ifrat: "Aşırı Hırs" },
        questions: [
            { soru: "Bitirme projesi teslimine bir ay kaldı, kapsamlı ve düzenli çalışma gerekiyor.", options: [
                { text: "Gece gündüz durmadan çalışır, sağlığımı ve ilişkilerimi feda ederim.", puan: 5 },
                { text: "Yoğun tempoda çalışırım, ara vermekte zorlanırım.", puan: 4 },
                { text: "Günlük plan yapar, düzenli çalışıp dinlenme molaları da veririm.", puan: 3 },
                { text: "Bir şeyler yaparım ama motivasyonum düşük, ertelemeye meylederim.", puan: 2 },
                { text: "Son güne kadar hiç elimi sürmem, nasıl olsa bir şekilde olur derim.", puan: 1 }
            ] },
            { soru: "Sabah koşuya çıkmayı planladınız, alarm çaldı ama kalkmak zor.", options: [
                { text: "Her gün mutlaka koşar, hasta bile olsam kendimi zorla dışarı çıkarırım.", puan: 5 },
                { text: "Çoğu gün kalkarım, biraz geç kalsam da koşarım.", puan: 4 },
                { text: "Kendimi motive eder kalkarım, ama vücudumu da dinlemeyi bilirim.", puan: 3 },
                { text: "Bazen kalkarım ama çoğu zaman yatakta kalıp ertelerim.", puan: 2 },
                { text: "Alarmı kapatıp tekrar uyurum, koşu fikrini süresiz ertelerim.", puan: 1 }
            ] },
            { soru: "Kazancı iyi ama ek mesai gerektiren bir iş fırsatı çıktı.", options: [
                { text: "Hemen kabul eder, ailem ve sağlığım pahasına sonuna kadar çalışırım.", puan: 5 },
                { text: "Kabul eder, biraz zorlanırım ama fazla düşünmem.", puan: 4 },
                { text: "Mevcut dengemi bozmayacak şekilde değerlendirir, uygunsa kabul ederim.", puan: 3 },
                { text: "Düşünürüm ama ekstra çaba gerektirdiği için vazgeçme eğilimindeyim.", puan: 2 },
                { text: "Fazladan çalışmak istemem, mevcut durumum yeter derim.", puan: 1 }
            ] },
            { soru: "Hafta sonu tatiliniz var ama gelecek hafta önemli bir sunum bekleniyor.", options: [
                { text: "Tatili iptal eder, tüm hafta sonunu çalışmaya ayırırım.", puan: 5 },
                { text: "Tatilden erken döner, çoğu zamanı çalışmaya ayırırım.", puan: 4 },
                { text: "Hem dinlenir hem sunum için makul süre ayırır, dengeyi kurarım.", puan: 3 },
                { text: "Tatili tam yapar, sunumu son dakikaya bırakırım.", puan: 2 },
                { text: "Tatili de yapmam sunumu da, her ikisini de boş veririm.", puan: 1 }
            ] },
            { soru: "Takım çalışmasında zor kısım size kaldı, paylaşım yapılacak.", options: [
                { text: "Tüm zor işleri üstlenir, başkalarına güvenmem her şeyi kendim yaparım.", puan: 5 },
                { text: "Zor kısmı alır, gece mesaisi yapar ama yardım istemem.", puan: 4 },
                { text: "Payımı alır, gerektiğinde yardım ister, iş birliği içinde ilerlerim.", puan: 3 },
                { text: "Zor kısımdan kaçınmaya çalışır, kolay olanı tercih ederim.", puan: 2 },
                { text: "Sorumluluk almaktan kaçınır, başkalarına bırakırım.", puan: 1 }
            ] },
            { soru: "Mesleğiniz için faydalı ama kalın bir kitap okumaya başlamak istiyorsunuz.", options: [
                { text: "Bir oturuşta bitirmeye çalışır, başka her şeyi askıya alırım.", puan: 5 },
                { text: "Yoğun bir tempoyla okur, kısa sürede bitirmek isterim.", puan: 4 },
                { text: "Her gün belirli sayfa okur, düzenli ilerler, sıkmadan tamamlarım.", puan: 3 },
                { text: "Birkaç sayfa okur bırakırım, bir türlü devam edemem.", puan: 2 },
                { text: "Hiç başlamam, okumayı süresiz ertelerim.", puan: 1 }
            ] },
            { soru: "Grup arkadaşlarınız sen hızlısın, bize de yardım et diyor.", options: [
                { text: "Hepsinin işini üstlenir, tüm kontrolü ele alır, bırakmam.", puan: 5 },
                { text: "Çoğuna yardım eder, kendi işim aksasa da durmam.", puan: 4 },
                { text: "Kendi işimi bitirip sonra elimden geldiğince yardım ederim.", puan: 3 },
                { text: "İsteksizce biraz yardım eder, çoğunu savuştururum.", puan: 2 },
                { text: "Kendi işim bile bitmemiş deyip hiç yardım etmem.", puan: 1 }
            ] },
            { soru: "Proje sonunda büyük bir ödül veya takdir alma ihtimali var.", options: [
                { text: "Ödül için her şeyi feda eder, takıntılı hale gelirim.", puan: 5 },
                { text: "Ekstra motive olur, normali aşan bir tempoyla çalışırım.", puan: 4 },
                { text: "Motivasyonum artar ama çalışma-dinlenme dengemi bozmam.", puan: 3 },
                { text: "Biraz gayret gösteririm ama çok da peşinden koşmam.", puan: 2 },
                { text: "Ödül olsa da olmasa da fark etmez, ekstra çaba sarf etmem.", puan: 1 }
            ] },
            { soru: "Patronunuz performansın düşmüş, biraz daha gayret göster dedi.", options: [
                { text: "Kendimi aşırı zorlar, gece gündüz çalışıp tükenmişliğe sürüklenirim.", puan: 5 },
                { text: "Hemen sert bir tempoya geçer, durumu düzeltmeye çalışırım.", puan: 4 },
                { text: "Uyarıyı dikkate alır, planla ve ölçülü biçimde gayretimi artırırım.", puan: 3 },
                { text: "Biraz denerim ama kısa sürede eski temaya dönerim.", puan: 2 },
                { text: "Umursamam, nasılsa idare eder diyerek devam ederim.", puan: 1 }
            ] },
            { soru: "Uzun süre çalıştığınız bir işi bitirdiniz ama daha iyisini yapabilirdim hissi var.", options: [
                { text: "Asla yeterli bulmam, mükemmeliyetçilikle sürekli yeniden yaparım.", puan: 5 },
                { text: "Bir iki yer daha düzeltir, tamamen bırakmakta zorlanırım.", puan: 4 },
                { text: "Son bir kontrol yapar, makul bulursam teslim edip rahatlarım.", puan: 3 },
                { text: "Eh, idare eder deyip fazla düşünmeden bırakırım.", puan: 2 },
                { text: "Hiç gözden geçirmem, olduğu gibi bırakırım.", puan: 1 }
            ] },
            { soru: "Bayram tatilinde aile toplandı ama yarın teslim etmeniz gereken bir rapor var.", options: [
                { text: "Tatili tamamen iptal eder, odama kapanıp ailemle hiç vakit geçirmem.", puan: 5 },
                { text: "Aileye kısa uğrar ama zamanın çoğunu çalışmaya ayırırım.", puan: 4 },
                { text: "Aileyle vakit geçirir, uygun saatlerde rapor için çalışırım.", puan: 3 },
                { text: "Aileyle takılır, raporu son saatlere bırakırım.", puan: 2 },
                { text: "Raporu hiç düşünmem, tatil tatildir deyip tamamen boş veririm.", puan: 1 }
            ] },
        ]
    },
    vesvese: {
        title: "Hayatı Sallayan Boşvermişlik mi, Uykuları Kaçıran Kuruntu mu?",
        concepts: { tefrit: "Umursamazlık", fazilet: "Tedbir", ifrat: "Vesvese" },
        questions: [
            { soru: "Gelecek yıl için finansal planlama yapmanız gerekiyor, geliriniz sınırlı.", options: [
                { text: "Her senaryoyu düşünür, uykularım kaçar, obsesif biçimde planlarım.", puan: 5 },
                { text: "Detaylı hesaplar yapar, sürekli kontrol eder, rahat edemem.", puan: 4 },
                { text: "Gelir gider tablosu çıkarır, makul bir plan yapıp hayatıma devam ederim.", puan: 3 },
                { text: "Şöyle bir düşünür geçerim, ciddi bir planlama yapmam.", puan: 2 },
                { text: "Hiç düşünmem, nasıl olsa bir şekilde geçinir gideriz derim.", puan: 1 }
            ] },
            { soru: "Ufak tefek sağlık belirtileriniz var, kontrol yaptırmak aklınıza geliyor.", options: [
                { text: "En küçük belirtiyi felaket olarak görür, sürekli hastane koridorlarında dolaşırım.", puan: 5 },
                { text: "Her belirtiyi araştırır, internette saatlerce hastalık tararım.", puan: 4 },
                { text: "Doktora randevu alır, kontrol ettirir, gereksiz paniğe kapılmam.", puan: 3 },
                { text: "Geçer deyip çoğu zaman ertelemeye meyilli olurum.", puan: 2 },
                { text: "Vücuduma hiç aldırmam, ne olursa olsun doktora gitmem.", puan: 1 }
            ] },
            { soru: "Aracınızın lastiği eski, uzun yola çıkacaksınız.", options: [
                { text: "Lastiği, freni, yağı, her şeyi defalarca kontrol eder yola çıkamam.", puan: 5 },
                { text: "Lastiği değiştirir ama yolda sürekli endişeyle dikiz aynasına bakarım.", puan: 4 },
                { text: "Lastiği kontrol ettirir, gerekirse değiştirir, güvenle yola çıkarım.", puan: 3 },
                { text: "Bir bakayım der ama sonra boş ver hallolur diye yola çıkarım.", puan: 2 },
                { text: "Lastik mastic umurumda değil, direkt yola koyulurum.", puan: 1 }
            ] },
            { soru: "Seyahat planlarken detayları ne kadar kontrol edersiniz?", options: [
                { text: "Her detayı onlarca kez kontrol eder, bir aksilik olacak diye uyuyamam.", puan: 5 },
                { text: "Çok ayrıntılı listeler yapar, sürekli gözden geçiririm.", puan: 4 },
                { text: "Gerekli rezervasyonları yapar, esnek bir plan kurar, rahat olurum.", puan: 3 },
                { text: "Kabaca bir plan yapar, detaylarla pek uğraşmam.", puan: 2 },
                { text: "Hiç plan yapmam, ne olursa olsun akışına bırakırım.", puan: 1 }
            ] },
            { soru: "Yeni bir projeye başlarken risk analizi yapma konusunda ne düşünürsünüz?", options: [
                { text: "O kadar çok risk düşünürüm ki projeye başlamaktan vazgeçerim.", puan: 5 },
                { text: "Uzun uzun analiz yapar, her ihtimali değerlendirmeden adım atmam.", puan: 4 },
                { text: "Temel riskleri belirler, makul önlemler alıp işe başlarım.", puan: 3 },
                { text: "Risklere şöyle bir göz atar ama çok detaya girmem.", puan: 2 },
                { text: "Risk ne ki, düşünmeden atlarım işe.", puan: 1 }
            ] },
            { soru: "Yakınınız randevuya geç kaldı, telefonu da açmıyor.", options: [
                { text: "Felaket senaryoları kurar, panikle hastane ve karakol ararım.", puan: 5 },
                { text: "Çok endişelenir, sürekli arar ve mesaj atarım.", puan: 4 },
                { text: "Biraz bekler, makul süre sonra arar, trafikte kalmıştır diye düşünürüm.", puan: 3 },
                { text: "Gelir bir süre sonra deyip fazla kafaya takmam.", puan: 2 },
                { text: "Hiç umursamam, gelirse gelir diye takılırım.", puan: 1 }
            ] },
            { soru: "Önemli belgeleriniz ve eşyalarınız için ne kadar tedbir alırsınız?", options: [
                { text: "Her şeyin birden fazla yedeğini alır, sürekli kontrol eder rahatlayamam.", puan: 5 },
                { text: "Çok titiz davranırım, kaybolacak diye sık sık kontrol ederim.", puan: 4 },
                { text: "Önemli belgelerin yedeğini alır, düzenli ama takıntısız saklarım.", puan: 3 },
                { text: "Arada bir düzenlemeye çalışırım ama çok dikkat etmem.", puan: 2 },
                { text: "Hiç tedbir almam, nereye koyduğumu bile hatırlamam.", puan: 1 }
            ] },
            { soru: "Haberlerde olumsuz bir gelişme, afet veya kriz duyunca tepkiniz?", options: [
                { text: "Kıyamet kopacakmış gibi panikler, günlerce o konuyu düşünürüm.", puan: 5 },
                { text: "Çok endişelenir, yakınlarıma sürekli uyarılar yaparım.", puan: 4 },
                { text: "Bilgiyi takip eder, gerekli tedbiri alır, paniğe kapılmam.", puan: 3 },
                { text: "Şöyle bir duyar geçerim, fazla etkilenmem.", puan: 2 },
                { text: "Hiç ilgilenmem, haberleri izlemeye bile gerek duymam.", puan: 1 }
            ] },
            { soru: "Önemli bir sunum veya davete hazırlanıyorsunuz.", options: [
                { text: "Her detayı onlarca kez kontrol eder, yine de hazır olmadığımı hissederim.", puan: 5 },
                { text: "Çok erken ve aşırı detaylı hazırlanır, sürekli endişelenirim.", puan: 4 },
                { text: "Yeterli hazırlık yapar, zamanında hazır olur rahatça giderim.", puan: 3 },
                { text: "Son dakikaya bırakır, aceleyle hazırlanırım.", puan: 2 },
                { text: "Hiç hazırlanmam, ne olursa olsun olduğu gibi giderim.", puan: 1 }
            ] },
            { soru: "Telefonunuz veya cüzdanınız için güvenlik önlemi alır mısınız?", options: [
                { text: "Kaybolacak diye sürekli yoklar, bir dakika görmesem panik yaparım.", puan: 5 },
                { text: "Çok sık kontrol eder, her yere koyduğumda tedirgin olurum.", puan: 4 },
                { text: "Güvenli bir yerde taşır, makul önlem alırım ama takıntı yapmam.", puan: 3 },
                { text: "Pek dikkat etmem, nereye bıraktığımı bazen unuturum.", puan: 2 },
                { text: "Hiç önemsemem, kaybolursa kaybolsun derim.", puan: 1 }
            ] },
            { soru: "Geceleri yatağa uzandığınızda aklınızdan neler geçer?", options: [
                { text: "Saatlerce endişe ve korkularla boğuşur, hiç uyuyamam.", puan: 5 },
                { text: "Yarının sorunlarını kafamda döndürür, geç uyurum.", puan: 4 },
                { text: "Günü değerlendirir, yarın için kısa plan yapar, huzurla uyurum.", puan: 3 },
                { text: "Pek bir şey düşünmem, hızlıca uyurum.", puan: 2 },
                { text: "Hiçbir şey umurumda değil, kafam boş yatarım.", puan: 1 }
            ] },
        ]
    },
};

// Mevcut TESTS objesine ekle
Object.assign(TESTS, TESTS_PART1);
