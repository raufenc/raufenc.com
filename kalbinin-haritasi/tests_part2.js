// tests_part2.js — Adalet, Hikmet, İffet, İhlâs, Hased, Sabır
// Option sırası: puan 5 (İfrat) → 4 → 3 (Fazilet) → 2 → 1 (Tefrit)

const TESTS_PART2 = {
    adalet: {
        title: "Zulme Boyun Büken mi, Gücüyle Ezen mi?",
        concepts: { tefrit: "Boyun Eğme", fazilet: "Adalet", ifrat: "Zulüm" },
        questions: [
            { soru: "İş arkadaşınız hatasını size yıkmaya çalışıyor, üstünüz de bunu duydu.", options: [
                { text: "Fırsatı değerlendirir, karşı tarafı suçlayarak onu haksız konuma düşürürüm.", puan: 5 },
                { text: "Kendimi savunurken sözlerimi sertleştirir, başkalarına da ithamda bulunabilirim.", puan: 4 },
                { text: "Haklılığımı sakin bir şekilde açıklar, delillerimle durumu düzeltmeye çalışırım.", puan: 3 },
                { text: "Biraz itiraz ederim ama zarar görmekten korkup sessizce geri çekilirim.", puan: 2 },
                { text: "Haksız olduğumu bilsem de hiçbir savunma yapmadan boyun eğerim.", puan: 1 }
            ] },
            { soru: "Arkadaş grubunuzda iki kişi tartışıyor, biri bariz haksız. Siz saygı duyulan bir üyesiniz.", options: [
                { text: "Güçlü tarafı destekler, zayıfı ezerek kendi konumumu sağlama alırım.", puan: 5 },
                { text: "Haksızı uyarırken bazen kırıcı laflar söylerim, öfkeyle adalet uygulamaya kalkarım.", puan: 4 },
                { text: "Haksızlığa uğrayanın yanında durur, tarafları uzlaştırmaya gayret ederim.", puan: 3 },
                { text: "İçten içe rahatsız olurum ama araya girmeye cesaret edemem.", puan: 2 },
                { text: "Kavga büyürse bana da sıkıntı olur diye haksızlığı bildiğim halde susarım.", puan: 1 }
            ] },
            { soru: "Yönetici oldunuz, size bağlı bir çalışan geride kalmış ama yakın arkadaşınız.", options: [
                { text: "Tamamen keyfime göre kayırma ve cezalandırma uygular, adaleti hiçe sayarım.", puan: 5 },
                { text: "Adil olmaya çalışsam da canım sıkılınca haksız değerlendirmeler yapabilirim.", puan: 4 },
                { text: "Tüm çalışanları objektif ölçütlerle değerlendirir, arkadaşıma da adil davranırım.", puan: 3 },
                { text: "Kayırmak istemem ama hatırı için biraz torpil geçerim.", puan: 2 },
                { text: "Güçlü ekibin karşısında durmaktan çekinir, adaletli değerlendirmeden bile kaçarım.", puan: 1 }
            ] },
            { soru: "Aile içi paylaşımda birinin hakkı yeniliyor ama büyükler karışma diyor.", options: [
                { text: "Gücü elime geçirirsem kendi lehime düzenleme yapar, başkalarının hakkını gasp ederim.", puan: 5 },
                { text: "Haksızlığa karşı çıkarken üslubumu sertleştirir, aileyi daha da gererim.", puan: 4 },
                { text: "Saygıyı bozmadan adil olması gerektiğini söyleyerek konuyu gündeme taşırım.", puan: 3 },
                { text: "Rahatsız olsam da büyüklere itiraz etmekten korkup ufak uyarıyla geçiştiririm.", puan: 2 },
                { text: "Ailenin tepkisinden çekinip ses çıkarmaz, haksızlığı kabul ederim.", puan: 1 }
            ] },
            { soru: "Dostunuz haksızlığa uğramış, sizden şahitlik istiyor. Karşı taraf da tanıdığınız.", options: [
                { text: "Bana menfaat sağlayan tarafı kayırmak için gerçeği çarpıtırım.", puan: 5 },
                { text: "Arkadaşımı abartılı savunur, diğer tarafa haksız ithamlarda bulunabilirim.", puan: 4 },
                { text: "Bildiğim kadarıyla dürüstçe anlatır, kimin hakkıysa onu teslim ederim.", puan: 3 },
                { text: "Gördüklerimi bile gizleyebilirim, başım ağrımasın diye çekinceli davranırım.", puan: 2 },
                { text: "Her iki tarafa da bilmiyorum deyip tamamen uzak dururum.", puan: 1 }
            ] },
            { soru: "Üstleriniz sizi haksız yere suçladı. Kendinizi savunma imkanınız var ama riskli.", options: [
                { text: "Savunmakla kalmaz, bu vesileyle karşı tarafı da her yönden suçlamaya kalkarım.", puan: 5 },
                { text: "Haksızlığı düzeltirken saldırgan tutum takınıp ciddi çatışma çıkarabilirim.", puan: 4 },
                { text: "Delillerle kendimi savunur, haksız ithamı ortadan kaldırmaya çalışırım.", puan: 3 },
                { text: "Ufak bir itiraz etmeye çekinir, kısık sesle geçiştirmeye bakarım.", puan: 2 },
                { text: "Hiçbir şey söylemem, böyle gelmiş böyle gider diyerek kabullenirim.", puan: 1 }
            ] },
            { soru: "Bir otorite elinize geçti, disiplin kurallarını nasıl uygulayacaksınız?", options: [
                { text: "Gücümü keyfime göre kullanır, istediğimi cezalandırıp istediğimi kayırırım.", puan: 5 },
                { text: "Adil olmaya çabalasam da gücün etkisiyle aşırı ceza verebilirim.", puan: 4 },
                { text: "Kim olursa olsun kuralları makul ölçüde uygular, cezayı adil belirlerim.", puan: 3 },
                { text: "Bazı kuralları uygularım ama yakınlarıma torpil geçer, tam adil olamam.", puan: 2 },
                { text: "Hiçbir kuralı uygulamaz, haksızlıklara göz yumarım kimse tepki göstermesin diye.", puan: 1 }
            ] },
            { soru: "Evde kardeşiniz veya çocuğunuz bir hata yaptı. Ceza vermek size kalmış.", options: [
                { text: "Fırsat bulmuşken ezici bir ceza uygular, haklarını tamamen hiçe sayarım.", puan: 5 },
                { text: "Bazen sinirlenir, küçük hata olsa bile gereğinden fazla cezalandırırım.", puan: 4 },
                { text: "Hatanın boyutuna göre makul bir yaptırım uygular, neden-sonuç anlatırım.", puan: 3 },
                { text: "Biraz kızarım ama fazla üstüne gitmem, sonuca karışmadan bırakırım.", puan: 2 },
                { text: "Ne kadar büyük hata olsa da ses çıkarmam, pasif kalırım.", puan: 1 }
            ] },
            { soru: "Bir sözleşmede adaletsiz maddeler fark ettiniz, taraflar sessiz kalmanızı istiyor.", options: [
                { text: "Bu fırsattan yararlanır, kendi menfaatime uygun haksız şartları görmezden gelirim.", puan: 5 },
                { text: "Adaleti savunayım derken sert üslup kullanır, ortamı gerer ve öfkeyle suçlarım.", puan: 4 },
                { text: "Gücüm yeterse haksız maddeyi düzeltelim diyerek iyileştirme için araya girerim.", puan: 3 },
                { text: "İçten içe rahatsız olurum ama korkudan sesimi çıkaramam.", puan: 2 },
                { text: "Susup geçerim, benimle alakası yok, kim ne yaparsa yapsın.", puan: 1 }
            ] },
            { soru: "İstemeden de olsa birine zarar verdiniz, mağdur olan biri var.", options: [
                { text: "Zarar verdiğim kişiyi önemsemez, kendi suçu deyip haksızlığa devam ederim.", puan: 5 },
                { text: "Telafi etmek istesem de kibirlenip bahanelere sığınabilirim.", puan: 4 },
                { text: "Mağduriyeti gidermek için elden geleni yapar, zararı tazmin edip özür dilerim.", puan: 3 },
                { text: "Kısmen sorumluluğu kabul eder gibi yapar, kısa özürle geçiştiririm.", puan: 2 },
                { text: "Özür dilesem bile çok çekinirim, kaçınma yolunu seçerim.", puan: 1 }
            ] },
            { soru: "Değerlendirme görevi verildi: not, puan veya terfi dağıtacaksınız.", options: [
                { text: "Keyfime göre dağıtır, yakınlarımı yüceltirken sevmediklerimi ezmek için fırsat bilirim.", puan: 5 },
                { text: "Genelde objektif olsam da sevmediklerime düşük not vermeye eğilimli olurum.", puan: 4 },
                { text: "Herkesi aynı ölçütlerle değerlendirir, objektif kriterlere bakarım.", puan: 3 },
                { text: "Tanıdıklara torpil yapar, tatsızlık olmasın diye biraz kayırma yaparım.", puan: 2 },
                { text: "Değerlendirme yapmaktan kaçar, sorumluluk almaktan korkarım.", puan: 1 }
            ] },
        ]
    },
    hikmet: {
        title: "Cevher Olan Aklı Köreltiyor musun, Yoksa Hilebazlığa mı Koşturuyorsun?",
        concepts: { tefrit: "Gabâvet", fazilet: "Hikmet", ifrat: "Cerbeze" },
        questions: [
            { soru: "Tartışmada yeni bir bilgi öğreniyorsunuz, deliller sizinle çelişiyor.", options: [
                { text: "Gerçek umurumda değil, bu bilgiyi karşı tarafı manipüle etmek için kullanırım.", puan: 5 },
                { text: "Bilgiyi kavrarım ama kendimi haklı çıkarmak için laf cambazlığı yaparım.", puan: 4 },
                { text: "Delilleri değerlendirir, doğruyu anlamaya çalışır, gerekirse fikrimi değiştiririm.", puan: 3 },
                { text: "Kısmen anlasam da derinlemesine incelemekle uğraşmam, yüzeysel kalırım.", puan: 2 },
                { text: "Hiç sorgulamadan eski inancımı sürdürür, yeni bilgiyi anlamaya bile çalışmam.", puan: 1 }
            ] },
            { soru: "Yeni ve karmaşık bir yöntem veya teknoloji öğrenmeniz gerekiyor.", options: [
                { text: "Zekamı kullanarak başkalarını saf dışı bırakacak hileler geliştiririm.", puan: 5 },
                { text: "Teknolojiyi öğrenir, kendi avantajıma sunarım ama gerçeği bazen saklarım.", puan: 4 },
                { text: "Nasıl çalıştığını anlamaya ve bilinçli kullanmaya dikkat ederim.", puan: 3 },
                { text: "Yüzeysel bakarım, kullanıyorsam yeter der, teorik kısmı önemsemem.", puan: 2 },
                { text: "Detayını merak etmem, ezbere taklit ederim, mantığını sorgulamam.", puan: 1 }
            ] },
            { soru: "Proje için ekiple bilgi topluyorsunuz, doğru ve güvenilir kaynak derlemeniz bekleniyor.", options: [
                { text: "Proje menfaatim için yanıltıcı veri manipülasyonu yapar, rakiplere fark atmayı düşünürüm.", puan: 5 },
                { text: "Verileri toplarken ekibin bilmesini istemediğim noktaları saklar veya eğip bükerim.", puan: 4 },
                { text: "Gerçekçi ve doğrulanabilir bilgileri seçer, farklı kaynakları karşılaştırırım.", puan: 3 },
                { text: "Kısmen kaynak bakarım ama çoğunlukla yüzeysel araştırmayla yetinirim.", puan: 2 },
                { text: "Kim ne diyorsa olduğu gibi alırım, kaynaksız verileri bile sorgulamadan koyarım.", puan: 1 }
            ] },
            { soru: "Arkadaş grubunda tartışma var, gerçeği biliyorsunuz ama kazanmak da istiyorsunuz.", options: [
                { text: "Doğru veya yanlış fark etmez, zekamı tamamen manipülasyon için kullanırım.", puan: 5 },
                { text: "İkna etmek için ufak laf cambazlıklarına başvurur, gerçeği bazen gizlerim.", puan: 4 },
                { text: "Hakikati yapıcı şekilde açıklar, tarafsız kalarak meseleyi aydınlatırım.", puan: 3 },
                { text: "Biraz fikir beyan ederim ama tam anlamadan çabucak konu değiştiririm.", puan: 2 },
                { text: "Ne gerçeği ne tartışmayı önemserim, duyduğumu tekrar ederim.", puan: 1 }
            ] },
            { soru: "İş hayatında stratejik planlama yapıyorsunuz, rakiple ilgili etik dışı istihbarat fırsatı çıktı.", options: [
                { text: "Her türlü yasa dışı yola girer, zekamı tamamen hileye seferber ederim.", puan: 5 },
                { text: "Gerekirse etik dışı yollara kısmen girer, ufak hileler kullanabilirim.", puan: 4 },
                { text: "Rakibi meşru yöntemlerle öğrenmeye çalışır, planımı dürüstçe kurarım.", puan: 3 },
                { text: "Biraz ilgilenirim ama derin analiz yapmam, yüzeysel kalırım.", puan: 2 },
                { text: "Plan yapmam, rastgele davranırım, rakibin ne yaptığını merak bile etmem.", puan: 1 }
            ] },
            { soru: "Proje sunumu yapıldı, mantıklı ama belirsiz noktalar var, ekip hemen kabul diyor.", options: [
                { text: "Belirsizlikleri bilerek kullanır, ileride şahsi çıkarıma döndürmek için plan yaparım.", puan: 5 },
                { text: "Soruları akıllıca sorarım ama kendi karım varsa ekibi yanıltacak yorumlar yaparım.", puan: 4 },
                { text: "Eksik veya riskli kısımları sorgular, netleştikten sonra karar veririm.", puan: 3 },
                { text: "Bir iki soru sorsam da pek üzerine gitmem, yüzeysel onaylarım.", puan: 2 },
                { text: "Sorgulamadan tamam derim, ayrıntısına hiç bakmam.", puan: 1 }
            ] },
            { soru: "Bir arkadaş hayatıyla ilgili önemli konuda sizden danışmanlık istiyor.", options: [
                { text: "Tamamen manipülasyon odaklı davranır, onun zaaflarını kullanıp kendi karımı gözetirim.", puan: 5 },
                { text: "Danışmanlık yaparken kendi avantajımı gözetir, ona tam uygun olmayan öneriler verebilirim.", puan: 4 },
                { text: "Onu dinleyerek mantıklı tavsiyelerde bulunur, durumuna uygun çözümler öneririm.", puan: 3 },
                { text: "Kısmen yardımcı olsam da derinlemesine analiz etmem, sen bilirsin derim.", puan: 2 },
                { text: "Pek düşünmeden rastgele birkaç tavsiye söyler geçerim.", puan: 1 }
            ] },
            { soru: "Sosyal medyada tartışma var, karşı tarafı rezil edebilecek bir argümanınız var ama doğruluğu şüpheli.", options: [
                { text: "Doğruluğu umursamam, sırf rezil etmek adına yalan-yanlış argümanlar da üretirim.", puan: 5 },
                { text: "Karşı tarafı alt etmek için argümanı biraz çarpıtarak kullanırım.", puan: 4 },
                { text: "Bilgiyi doğru şekilde paylaşır, eksik noktayı düzeltir, dürüstçe katkı sunarım.", puan: 3 },
                { text: "Az biraz katılır, bir iki laf atar, fazla uğraşmadan çekilirim.", puan: 2 },
                { text: "Doğru-yanlış fark etmeden sessiz kalır, hiç düşünmem bile.", puan: 1 }
            ] },
            { soru: "Sertifika sınavındasınız, hile yapma imkanınız var ve rakipsiz başarı kazanabilirsiniz.", options: [
                { text: "Kopya, sızıntı ve her imkanı kullanır, rakipleri geride bırakmak için ne gerekirse yaparım.", puan: 5 },
                { text: "İyi çalışırım yine de ihtiyaç görürsem ufak kopya veya taktik hilelere başvururum.", puan: 4 },
                { text: "Emek vererek öğrenir, adil bir sınavla hak ettiğim sonucu almak isterim.", puan: 3 },
                { text: "Çalışsam da derine inmem, hile fikri aklımdan geçse de cesaret edemem.", puan: 2 },
                { text: "Çalışmıyorum da, hile de yapmıyorum, ne olursa olsun.", puan: 1 }
            ] },
            { soru: "Arkadaşlarınız size danışıyor, siz bazen onları kendi çıkarınız için yönlendirmek istiyorsunuz.", options: [
                { text: "Bana duyulan güveni tamamen istismar eder, onların zararını bile göze alırım.", puan: 5 },
                { text: "Mantıklı öneriler verse de gizli yönlendirmeler yapmaktan çekinmem.", puan: 4 },
                { text: "Onlara gerçekten fayda sağlayacak çözümler sunar, dürüst biçimde rehberlik ederim.", puan: 3 },
                { text: "Düşünürüm ama yüzeysel öneriler veririm, derin akıl yürütme zahmetine girmem.", puan: 2 },
                { text: "Zeka falan kullanmam, rastgele söylerim, düşünmeye üşenirim.", puan: 1 }
            ] },
            { soru: "Bir konuyu bilip bilmediğinizi soruyorlar ama tam hakim değilsiniz.", options: [
                { text: "Kendimi uzman gibi gösterir, bilmediğim halde insanları bilinçli yanıltırım.", puan: 5 },
                { text: "Bilenmiş izlenimi verip eksik bilgimi saklar, laf cambazlığıyla idare ederim.", puan: 4 },
                { text: "Bildiğim kadarını açıklar, emin değilsem araştırmak lazım diye dürüstçe söylerim.", puan: 3 },
                { text: "Bilmiyorum ama belki böyledir diye yüzeysel konuşup bırakırım.", puan: 2 },
                { text: "Ezbere ve rastgele cevap veririm, gerçeği öğrenmeye bile çalışmam.", puan: 1 }
            ] },
        ]
    },
    iffet: {
        title: "Nefsinin Sesi Kısık mı, Çığlıkları Tavan mı?",
        concepts: { tefrit: "Humud", fazilet: "İffet", ifrat: "Fücur" },
        questions: [
            { soru: "Sevdiğiniz yemekler var ama sağlığınız ve dini hassasiyetleriniz de önemli.", options: [
                { text: "Canım ne isterse sınırsız yerim, sağlık veya helal-haram kaygılarını düşünmem.", puan: 5 },
                { text: "Bazen aşırıya kaçarım, tatlı ve ağır yemeklere direnmek zor oluyor.", puan: 4 },
                { text: "Zaruri ihtiyaç ve lezzeti dengeler, helal ve sağlıklı çizgide ölçülü tüketirim.", puan: 3 },
                { text: "Arada keyifli şeyler yesem de genelde kendime gerek yok deyip kısıtlarım.", puan: 2 },
                { text: "Neredeyse aç gezerim, lezzetli bile olsa kendimi gereksiz yere mahrum bırakırım.", puan: 1 }
            ] },
            { soru: "Karşı cinse duyduğunuz ilgi konusunda genel tutumunuz nedir?", options: [
                { text: "Her türlü sınırı reddeder, duygusal ve fiziksel isteklerimi doyurmaktan çekinmem.", puan: 5 },
                { text: "Sık sık duygusal ataklar yaşar, tutkumu bazen frenleyemem.", puan: 4 },
                { text: "Helal dairede dinî ve ahlakî ölçülere sadık kalarak ilişkiyi yürütürüm.", puan: 3 },
                { text: "İlgi duysam da bastırır, karşı cinsle iletişimimi minimumda tutarım.", puan: 2 },
                { text: "Kendimi tamamen kapatır, meşru yakınlıktan bile soğuk davranırım.", puan: 1 }
            ] },
            { soru: "Giyim-kuşam ve süslenme konusundaki yaklaşımınız nasıl?", options: [
                { text: "Gösterişli ve mahremiyet sınırlarını da zorlayan şekilde dikkat çekici giyinirim.", puan: 5 },
                { text: "Modayı ve dikkat çekici tarzları sever, bazen abartılı süslenirim.", puan: 4 },
                { text: "Temiz, özenli ve ölçülü giyinmeye dikkat eder, aşırılığa kaçmam.", puan: 3 },
                { text: "Arada düzgün giyinsem de çoğunlukla dış görünüşü basite indirgerim.", puan: 2 },
                { text: "Kendime bakmayı gereksiz görür, en eski kıyafetle idare ederim.", puan: 1 }
            ] },
            { soru: "Arkadaşlar sınırları zorlayan bir eğlence mekanına davet ediyor.", options: [
                { text: "Her türlü ortama açığım, haram eğlence de dahil sınırsız zevk ararım.", puan: 5 },
                { text: "Ortama uyup kaptırabilirim, sınırları aşsam da çok pişman olmam.", puan: 4 },
                { text: "Mekan ve içerik ahlaki ölçülerimi çok aşmıyorsa ölçülü şekilde eğlenebilirim.", puan: 3 },
                { text: "İstemesem de bazen uğrarım ama köşede oturur, keyif almamaya çalışırım.", puan: 2 },
                { text: "Asla eğlenceye gitmem, meşru ortamlarda bile hepsi gereksiz diye düşünürüm.", puan: 1 }
            ] },
            { soru: "İltifat, övgü ve beğenilme gibi duygusal ihtiyaçlarda tavrınız nedir?", options: [
                { text: "Sürekli ilgi ve övgü ister, bunu elde etmek uğruna haysiyet tanımam.", puan: 5 },
                { text: "Beğenilme isteğim yüksek, sırf övgü almak için normalden fazla uğraşırım.", puan: 4 },
                { text: "Takdir edilmek hoştur ama asla aşırı beklentiye girmem, ölçüyü korurum.", puan: 3 },
                { text: "Beğenilsem de rahatsız olur, benim neyim var ki diye duygularımı bastırırım.", puan: 2 },
                { text: "Beğenilmek bana anlamsız gelir, kendimi neredeyse değersiz gösteririm.", puan: 1 }
            ] },
            { soru: "Helal-haram konusundaki hassasiyetiniz genellikle nasıldır?", options: [
                { text: "Haram-helal ayrımı gözetmeden canım ne isterse yapar, arzu odaklı yaşarım.", puan: 5 },
                { text: "Helale riayet etsem de zaman zaman harama kayabilir, nefsimi frenlemekte zorlanırım.", puan: 4 },
                { text: "Helal-haram çizgisine uyar, helalde özgürce yaşar, haramdan sakınırım.", puan: 3 },
                { text: "Geniş helal dairede bile soğuk kalır, meşru nimetlerden çoğunlukla kaçınırım.", puan: 2 },
                { text: "Helal olan şeyleri bile kendime yasaklayacak kadar aşırı kısıtlama yaparım.", puan: 1 }
            ] },
            { soru: "Reklamlar ve cazip teklifler karşınıza çıkınca tüketim alışkanlığınız nasıl?", options: [
                { text: "Çılgınca alışveriş yapar, lüks ve keyif için paramı esirgemem.", puan: 5 },
                { text: "Bazen heveslenir, abartılı alışveriş yapar, sonra pişman olurum.", puan: 4 },
                { text: "Gerçek ihtiyacımı tanır, bütçeme göre hareket ederim.", puan: 3 },
                { text: "Nadiren ufak tefek alırım ama genelde ihtiyaç değil deyip kendimi baskılarım.", puan: 2 },
                { text: "Hemen hemen hiçbir şeye para harcamaz, ihtiyaç bile olsa hayır derim.", puan: 1 }
            ] },
            { soru: "Arkadaş ortamında flört veya sınırı aşan şakalar olduğunda ne yaparsınız?", options: [
                { text: "Sınır tanımadan her türlü müstehcen espriye ve eğlenceye dahil olurum.", puan: 5 },
                { text: "Bazen sınırı aşan şakalara kapılır, nefsimi kontrol etmekte zorlanırım.", puan: 4 },
                { text: "Helal ölçülerdeyse hoşgörüyle katılır, rahatsız edici olunca nazikçe uyarırım.", puan: 3 },
                { text: "Ara sıra bulunurum ama hiç katılmam, soğuk ve mesafeli davranırım.", puan: 2 },
                { text: "Her türlü sosyal etkileşimden kaçar, böyle şeylere gerek yok derim.", puan: 1 }
            ] },
            { soru: "Maddi imkanlarınızı nefsani hazlara harcama eğiliminiz nasıl?", options: [
                { text: "Bütün kazancımı lükse, eğlenceye veya aşırılığa harcarım, sınırsız davranırım.", puan: 5 },
                { text: "Nefsimin istediğini karşılayayım derken bazen abartılı masraflara girerim.", puan: 4 },
                { text: "Kendimi makul ölçüde ödüllendirir, fazla lüksten kaçınırım.", puan: 3 },
                { text: "Zaman zaman ufak harcamalar yapsam da çoğunlukla cimrice yaklaşırım.", puan: 2 },
                { text: "Kendime hiçbir keyif veya konfor izni vermem, sürekli mahrum bırakırım.", puan: 1 }
            ] },
            { soru: "Öfke, arzu ve haz gibi güçlü dürtülerinizde kontrol mekanizmanız nasıl?", options: [
                { text: "Dürtülerime anında boyun eğer, haram veya aşırılık olsa bile aldırmam.", puan: 5 },
                { text: "Zaman zaman nefsime yenilir, hırsla hareket eder, sonra pişman olurum.", puan: 4 },
                { text: "Doğal arzularımı meşru yollarla tatmin eder, aşırıya kaçmadan disiplinli olurum.", puan: 3 },
                { text: "Dürtülerim olsa da genelde bastırır, kendime yasaklayayım diye kısıtlarım.", puan: 2 },
                { text: "Bu dürtüleri tamamen yok etmeye çalışır, kendimi hissiz hale getirmek isterim.", puan: 1 }
            ] },
            { soru: "Nefs terbiyesi ve manevi gelişim kavramına bakışınız nasıl?", options: [
                { text: "Nefs terbiyesini gereksiz bulur, her arzumun peşinden koşarım.", puan: 5 },
                { text: "Arada hatırlarım ama sık sık kendimi kaptırır, aşırılıklara girebilirim.", puan: 4 },
                { text: "Nefsimi tanır, meşru isteklerini makul karşılar, haramdan sakınırım.", puan: 3 },
                { text: "Terbiye etmek adına kendimi aşırı baskılar, helal keyiflerden bile kaçarım.", puan: 2 },
                { text: "Meşru hazlardan bile uzak duracak kadar katı yasak koyarım.", puan: 1 }
            ] },
        ]
    },
    ihlas: {
        title: "Hayırdan Uzak mı Kaçıyorsun, Yoksa Alkış Avcısı mısın?",
        concepts: { tefrit: "Terk-i Amel", fazilet: "İhlâs", ifrat: "Riya" },
        questions: [
            { soru: "Bir hayır organizasyonunda gönüllü arıyorlar, gösteriş endişeniz var.", options: [
                { text: "İnsanların ne kadar iyi adam demesi için katılırım, tam aradığım fırsat.", puan: 5 },
                { text: "Katılma fikri hoş ama aklımın köşesinde takdir almak düşüncesi de var.", puan: 4 },
                { text: "Allah rızası için yapmak isterim, insanların övmesi ikinci plandadır.", puan: 3 },
                { text: "Mecburen bir görünüp kaçarım, göstermelik katılsam da sonuna kadar kalamam.", puan: 2 },
                { text: "Riyaya düşerim korkusuyla hiç hayır işine bulaşmam.", puan: 1 }
            ] },
            { soru: "Sabah namazına kalktınız, cemaatle gitmek aklınızda ama övgü de cezbediyor.", options: [
                { text: "Sırf insanlar ne takva adam desin diye namaza giderim, yoksa gitmezdim.", puan: 5 },
                { text: "Allah rızası için de gidiyorum ama etraftakilerin görmesi de cazip geliyor.", puan: 4 },
                { text: "Niyetimi düzeltip Allah rızası diyerek cemaatle kılarım, övgü önemli değil.", puan: 3 },
                { text: "Arada gidiyorum ama övülmekten hoşlanıyorum, tam içtenlikle değilim.", puan: 2 },
                { text: "Riyadan korkup namaza hiç gitmeyebilirim, evde de kılmamaya kadar varabilir.", puan: 1 }
            ] },
            { soru: "Zekat vermeniz gerekiyor, çevreniz samimiyetsiz bağışçıları eleştiriyor.", options: [
                { text: "Zekat miktarını abartarak ilan ederim, gerçekte daha az verip büyük gösteririm.", puan: 5 },
                { text: "Zekatı versem de içimden bilsinler ve takdir etsinler diye isteyebilirim.", puan: 4 },
                { text: "Zekat farz borcumdur, Allah rızası için gizliden de verebilirim.", puan: 3 },
                { text: "Biraz versem de tam miktarı eksik çıkarır, göstermelik yetinmeye çalışırım.", puan: 2 },
                { text: "Ya riya olur ya sorun çıkar diye zekatı tamamen terk ederim.", puan: 1 }
            ] },
            { soru: "Dini sohbet programına katılıyorsunuz, konuşmacı devam edenleri çok takdir ediyor.", options: [
                { text: "Asıl niyetim ön sıralarda görünsün, fotoğraf çekilsin, paylaşılsın demek.", puan: 5 },
                { text: "Hem istifade ederim hem de dindar görünmek izlenimi yaratmak hoşuma gider.", puan: 4 },
                { text: "Maksadım hakikati öğrenmek ve Allah rızasına yakınlaşmak, övgü beklentim yok.", puan: 3 },
                { text: "Arada gidip yüz göstermeyi yeterli bulurum, istikrarlı değilim.", puan: 2 },
                { text: "Samimiyetim yoksa gitmeyeyim diye tamamen soğurum.", puan: 1 }
            ] },
            { soru: "Bir öğrenci sizden yardım istiyor, işi siz yapın benim adım çıksın diyor.", options: [
                { text: "Yardım edersem mutlaka adım anılsın isterim, yoksa yapmam.", puan: 5 },
                { text: "Ben de takdir almak isterim, perde arkasından kendimi göstermeye çalışırım.", puan: 4 },
                { text: "Amelimi Allah bilir, gösteriş gerekmeden yardımcı olurum.", puan: 3 },
                { text: "Yaparım belki ama hocanın da beni takdir etmesini istediğim bir beklentim var.", puan: 2 },
                { text: "Samimi olamam diye korkup böyle işlere hiç bulaşmam.", puan: 1 }
            ] },
            { soru: "Sosyal medyada dini içerikli paylaşımlar yapıyorsunuz, beğeni sayısına odaklandığınızı fark ettiniz.", options: [
                { text: "Tek amacım dindar ve bilgili görünmek, paylaşımları tamamen etki için yapıyorum.", puan: 5 },
                { text: "Beğeniler hoşuma gidiyor, Allah rızası desem de takdirin cazibesi ağır basıyor.", puan: 4 },
                { text: "Asıl amacım güzellikleri duyurmak, beğeni alıp almamak çok önemli değil.", puan: 3 },
                { text: "Arada paylaşıyorum ama aslında beğeni bekliyorum, tam içtenlikli değilim.", puan: 2 },
                { text: "Dindar görünmekten korkup paylaşım yapmaktan tamamen uzak dururum.", puan: 1 }
            ] },
            { soru: "Gece namazı veya oruç tutuyorsunuz ama bunu çevreniize anlatma isteğiniz var.", options: [
                { text: "Bu ameli sırf başkalarına anlatmak için yapıyorum, maşallah desinler diye.", puan: 5 },
                { text: "Yaparken aklıma yarın sohbette söylerim düşüncesi geliyor, övgü bekliyorum.", puan: 4 },
                { text: "İbadeti gizli tutar, Allah için yaparım, kimseye anlatmak gerekmez.", puan: 3 },
                { text: "Arada yaparım, insanlara da biraz söylerim ama tam motive olmadığımdan yarım kalır.", puan: 2 },
                { text: "Böyle yüksek amellere gerek yok diye korkup tamamen bırakırım.", puan: 1 }
            ] },
            { soru: "İftar organizasyonunda görev aldınız, beni görsünler düşüncesi geçiyor mu?", options: [
                { text: "Bütün işim herkesin gözü önünde rol kesmek, hizmete değil görünmeye çalışıyorum.", puan: 5 },
                { text: "Görev yaparken keşke herkes beni övse ne fedakar dese diye bekliyorum.", puan: 4 },
                { text: "Hizmette bulunmak için mutlu olur, Allah rızasıyla elimden geleni yaparım.", puan: 3 },
                { text: "Zorunlu olsa yaparım ama gönülsüzüm, faydası olur belki diye düşünürüm.", puan: 2 },
                { text: "Riyaya düşerim diye hiç görev almam, en iyisi uzak durmak.", puan: 1 }
            ] },
            { soru: "Maddi yardım kampanyasında isminizin ilan edilmesi fikrine nasıl bakarsınız?", options: [
                { text: "Ana motivasyonum ismimin billboard'da yazılması, yoksa yardım düşünmem.", puan: 5 },
                { text: "İsmimi görsünler hoşuma gider, tamamen bu yüzden değil ama varlığımı bilsinler.", puan: 4 },
                { text: "Gerekliyse gizli veya açıktan verebilirim, niyetim Allah rızası, reklam önemli değil.", puan: 3 },
                { text: "Az bir şey verip ismime bakılsın isterim ama çok da gönülden istemiyorum.", puan: 2 },
                { text: "İsmim ilan edilecekse hiç bağış yapmam, böyle işlere girmem.", puan: 1 }
            ] },
            { soru: "Çevreniz senin duan kabul oluyor diye sizi sürekli övüyor.", options: [
                { text: "Tam istediğim şey, ben özelim duam makbuldür diye hava atarım.", puan: 5 },
                { text: "İnsanların maşallah ne veli kişi demesi nefsimi okşar, beğenilmek sevindirir.", puan: 4 },
                { text: "Teşekkür eder, her şey Allah'ın takdiri ben sadece kulum diye mütevazı kalırım.", puan: 3 },
                { text: "Biraz hoşuma gider, evet dualarım kabul olur diye tam bilmeden öyle sunarım.", puan: 2 },
                { text: "Böyle lafları duyunca her duayı bırakırım, samimi olamam en iyisi etmeyeyim.", puan: 1 }
            ] },
        ]
    },
    hased: {
        title: "Başkasının Başarısı Sence Yok mu, Yoksa Göz mü Diktiğin Var?",
        concepts: { tefrit: "Kayıtsızlık", fazilet: "Gıpta", ifrat: "Hased" },
        questions: [
            { soru: "Arkadaşınız terfi etti, herkes tebrik ediyor.", options: [
                { text: "Terfisinin haksız olduğunu düşünür, geri alınmasını isterim.", puan: 5 },
                { text: "İçten içe keşke o terfi bana gelseydi diye rahatsız olurum.", puan: 4 },
                { text: "Tebrik eder, benim de gayret etmem gerektiğini düşünürüm.", puan: 3 },
                { text: "İlgilenmem, biraz iyi iyi derim ama motivasyonum sıfırdır.", puan: 2 },
                { text: "Duymamış gibi yaparım, kimin terfi ettiği umurumda değil.", puan: 1 }
            ] },
            { soru: "Yeni komşu gayet kibar, herkes onu seviyor ve sizden daha çok ilgi görüyor.", options: [
                { text: "Onun hakkında dedikodu yapar, itibarını sarsmaya çalışırım.", puan: 5 },
                { text: "Rahatsız olurum, bu kadar popüler olmasa iyi olurdu diye düşünürüm.", puan: 4 },
                { text: "Güzel, demek iyi insan, ben de komşuluk ilişkilerimi güçlendireyim.", puan: 3 },
                { text: "Biraz garip gelir ama üstüne düşmem.", puan: 2 },
                { text: "Ne komşu ne çevre takmam, kendi halime bakarım.", puan: 1 }
            ] },
            { soru: "Kuzeniniz güzel bir ev aldı, siz kirada oturuyorsunuz, aile onu örnek gösteriyor.", options: [
                { text: "Evin başına bir iş gelmesini, satmak zorunda kalmasını isterim.", puan: 5 },
                { text: "Sürekli niye bende yok diye içimi kemiririm.", puan: 4 },
                { text: "Tebrik eder, ben de çalışıp biriktirmeliyim diye harekete geçerim.", puan: 3 },
                { text: "Arada canımı sıkar ama çabuk geçer.", puan: 2 },
                { text: "Ev almış almamış hiç ilgilenmem.", puan: 1 }
            ] },
            { soru: "İş yerinde sizin değil meslektaşınızın fikrini beğendiler, fikir gerçekten iyi.", options: [
                { text: "O fikrin çalıntı veya eksik olduğunu iddia etmeye çalışırım.", puan: 5 },
                { text: "Benim fikrim de iyiydi halbuki diye içimden kıvranırım.", puan: 4 },
                { text: "Fikrini beğenir, sonraki sefere daha iyi hazırlanmaya karar veririm.", puan: 3 },
                { text: "Biraz bozulur ama üstüne gitmem.", puan: 2 },
                { text: "Önemsemem, toplantıda zaten dalmıştım.", puan: 1 }
            ] },
            { soru: "Çocukluk arkadaşınız çok güzel bir düğün yaptı, sosyal medyada tebrik yağıyor.", options: [
                { text: "Evliliklerinin yürümemesini, mutluluğun kısa sürmesini dilerim.", puan: 5 },
                { text: "Süslü düğünü gözüme batar, bu kadar abartmayın diye söylenirim.", puan: 4 },
                { text: "İçtenlikle sevinirim, kendi düğünüm için de ilham alırım.", puan: 3 },
                { text: "Beğenirim ama çok da üstünde durmam.", puan: 2 },
                { text: "Düğünmüş tebrikmiş ne fark eder.", puan: 1 }
            ] },
            { soru: "Tanıdığınız biri kısa sürede çok iyi form yakaladı, siz düzenli spor yapamıyorsunuz.", options: [
                { text: "Sakatlanmasını veya bırakmasını isterim, formunu kaybetse sevinirim.", puan: 5 },
                { text: "Keşke bu kadar fark atmasaydı, beni kötü gösteriyor diye düşünürüm.", puan: 4 },
                { text: "Vay be, ben de başlasam iyi olacak diye heveslenirim.", puan: 3 },
                { text: "Helal olsun derim ama beni motive etmez.", puan: 2 },
                { text: "Sporun bana faydası yok diye düşünür, hiç ilgilenmem.", puan: 1 }
            ] },
            { soru: "Sınıfta veya işte herkesin saygı duyduğu bilgili biri var, hep övülüyor.", options: [
                { text: "İtibarını düşürmek için hata yapmasını bekler, fırsat kollarım.", puan: 5 },
                { text: "İçimden torpilli ya da gösteriş yapıyor diye geçiririm.", puan: 4 },
                { text: "Ondan öğreneceğim şeyler var, yakınlaşıp bilgi edinmeye çalışırım.", puan: 3 },
                { text: "Farkındayım ama aldırmam, kendi işime bakarım.", puan: 2 },
                { text: "Kim kimi övüyormuş boşver.", puan: 1 }
            ] },
            { soru: "Tanıdığınız biri hayır işine çok katkıda bulunuyor ve çevrede takdir ediliyor.", options: [
                { text: "Yardımının boşa gitmesini, insanların onu unutmasını isterim.", puan: 5 },
                { text: "Gösteriş yapıyor, samimi değil diye içimden eleştiririm.", puan: 4 },
                { text: "Takdir eder, gücüm yettiğince ben de katkı sunmaya çalışırım.", puan: 3 },
                { text: "Aferin derim ama kendim bir şey yapmaya niyetlenmem.", puan: 2 },
                { text: "Hayır işi bağış bunlar beni hiç ilgilendirmez.", puan: 1 }
            ] },
            { soru: "Kardeşiniz yarışmada ödül kazandı, anne-babanız gururlu, herkes kutluyor.", options: [
                { text: "Ödülünün elinden alınmasını veya rezil olmasını isterim.", puan: 5 },
                { text: "İlginin hep ona gitmesi canımı sıkar, beni niye görmüyorsunuz derim.", puan: 4 },
                { text: "Gönülden sevinirim, ben de bir alanda kendimi geliştirsem diye düşünürüm.", puan: 3 },
                { text: "İçimden abartmayın geçer ama dile getirmem.", puan: 2 },
                { text: "Ailenin sevinci de ödül de umurumda değil.", puan: 1 }
            ] },
            { soru: "Uzun süredir istediğiniz fırsatı siz değil tanıdığınız biri yakaladı, hak ettiğini biliyorsunuz.", options: [
                { text: "O fırsatı kaybetmesini, ona da nasip olmamasını dilerim.", puan: 5 },
                { text: "Hak etse de niye hep o niye ben değil diye içimi yiyip bitiririm.", puan: 4 },
                { text: "Tebrik eder, sıramın da geleceğine inanırım.", puan: 3 },
                { text: "Canım sıkılır ama çabuk unuturum.", puan: 2 },
                { text: "Kimin yakaladığı beni ilgilendirmez, zaten peşinden koşmuyordum.", puan: 1 }
            ] },
            { soru: "Sosyal medyada eski arkadaşınızın lüks tatil fotoğraflarını görüyorsunuz.", options: [
                { text: "Tatilinin berbat geçmesini, bir aksilik yaşamasını isterim.", puan: 5 },
                { text: "Hep gösteriş, param var diye hava atıyor diye sinirleniyorum.", puan: 4 },
                { text: "Sevinirim, ben de imkan bulunca güzel bir yer keşfedeyim derim.", puan: 3 },
                { text: "Güzelmiş der geçerim, pek etkilemez.", puan: 2 },
                { text: "Kaydırır geçerim, ne tatilmiş ne otelmiş.", puan: 1 }
            ] },
        ]
    },
    sabir: {
        title: "Oturduğu Yerde Kalan mı, Sabırla İlerleyen mi, Yoksa Kestirmeden Koşup Tökezleyen mi?",
        concepts: { tefrit: "Atâlet", fazilet: "Sabır", ifrat: "Acelecilik" },
        questions: [
            { soru: "Uzun soluklu bir projede zorluklar ve pürüzler oluşuyor.", options: [
                { text: "Sonuç olmayınca öfkelenir, sabırsızca herkesin üstüne giderim.", puan: 5 },
                { text: "Sonuç görmeyince hırslanıp telaş eder, ekibi de bunaltırım.", puan: 4 },
                { text: "Sorunları tespit eder, sabırla çözüm yolları arar, mantıklı süreç yönetirim.", puan: 3 },
                { text: "Başta biraz denerim, sıkıntı görünce bana göre değilmiş deyip çekilirim.", puan: 2 },
                { text: "Proje zorlaşıyorsa tamamen bırakırım, uğraşacak enerjim yok.", puan: 1 }
            ] },
            { soru: "Uzun vadeli sınav veya spor antrenmanı var, haftalarca çalışmak lazım.", options: [
                { text: "Hemen sonuç beklediğim için programı aşırı artırır, sakatlanma bile riske ederim.", puan: 5 },
                { text: "Başta hırslı başlarım ama yeterince hız alamayınca sabırsızlanıp öfke krizine girerim.", puan: 4 },
                { text: "Plan yapar, gün gün çalışırım, zor gelse de sabreder motivasyonu korurum.", puan: 3 },
                { text: "Başlar gibi olsam da her zorlu aşamada bırakırım, düzenli çalışamam.", puan: 2 },
                { text: "Hiç girişmemeyi tercih ederim, o kadar sabır yok bende diye atalet gösteririm.", puan: 1 }
            ] },
            { soru: "Aileniz biraz sabır göster hemen olmayabilir diyor ama tahammülünüz kısıtlı.", options: [
                { text: "Hemen olmalı diye dayatır, beklemeye asla yanaşmam, belki her şeyi bozarım.", puan: 5 },
                { text: "Beklerken huzursuz olur, çevreme sürekli baskı yapar, sabırsızca sonuca koşarım.", puan: 4 },
                { text: "Kolay olmayacağını bilsem de adım adım ilerler, sabırla dengeli götürürüm.", puan: 3 },
                { text: "Biraz dener, daraldığım an bu sabır işi bana göre değil diye uzaklaşırım.", puan: 2 },
                { text: "Zaten bekleyemem, hiç başlamayayım, bu iş uzun sürecekse yokum.", puan: 1 }
            ] },
            { soru: "İş yerinde uzun vadeli proje çok bunaltıyor, bazı arkadaşlar sabrediyor.", options: [
                { text: "Öylesine acele edip hatalara sürükler, proje ortada kalınca agresifleşirim.", puan: 5 },
                { text: "Çabuk sonuç için arkadaşlara yüklenir, sabırsızca ekibi bıktırırım.", puan: 4 },
                { text: "Zorluk normaldir, sabırla programlar, yılmadan devam ederim.", puan: 3 },
                { text: "Kısa denemeler yapsam da sıkıldıkça bırak gitsin deyip dağılırım.", puan: 2 },
                { text: "Kesinlikle projeden çekilir, uğraşamam ben derim, belki hiç başlamam.", puan: 1 }
            ] },
            { soru: "Ev taşıma veya tamirat gibi uzun sürecek günlük bir iş var.", options: [
                { text: "Hızlı olsun diye her şeyi üst üste yığar, eşyaları kırar, bunalımlı acelecilik.", puan: 5 },
                { text: "Kısa sürede bitirmek için aşırı stres yapar, kendimi ve çevremi boğaz ederim.", puan: 4 },
                { text: "Planlı şekilde uğraşır, gerektiği kadar vakit ayırıp sabırla sonuna götürürüm.", puan: 3 },
                { text: "Başlasam da çabuk bırakır, olmuyor benlik iş değil deyip geri çekilirim.", puan: 2 },
                { text: "Hiç ilgilenmem, nasılsa bitmeyecek diye bir kenarda oturur atalet gösteririm.", puan: 1 }
            ] },
            { soru: "Uzun süredir beklediğiniz terfi veya onay var, kurum henüz açıklamadı.", options: [
                { text: "Sabrım yok, hemen açıklayın diye tehdit veya fevri davranışlara bile girerim.", puan: 5 },
                { text: "Sürekli arayıp ne oldu sonuç nerede diye baskı yapar, bekleme sürecinde öfkelenirim.", puan: 4 },
                { text: "Sürecin normal olduğunu düşünür, işimi yapmaya devam eder sabırlı davranırım.", puan: 3 },
                { text: "Biraz merak etsem de sonuç alamadıkça kendi halime döner motivasyonu keserim.", puan: 2 },
                { text: "Bekleme zahmeti bana göre değil diyerek işi de süreci de bırakma eğilimindeyim.", puan: 1 }
            ] },
            { soru: "Maddi sıkıntıdasınız, birikim yapmak zaman alacak, uzun vadeli tasarruf planı var.", options: [
                { text: "Bu beklemeyle uğraşamam, acele borç bulur riskli işlere girerim.", puan: 5 },
                { text: "Kısa sürede büyük birikim ister, sabırsızca aileyi zora sokan kısıtlamalar yaparım.", puan: 4 },
                { text: "Ağır da olsa her ay ufak ufak kenara koyar, sabırla devam ederim.", puan: 3 },
                { text: "Azıcık denesem de param yetmiyor birikim mümkün değil deyip vazgeçerim.", puan: 2 },
                { text: "Birikim uzak iş, nasılsa olmuyor deyip her şeyi boş veririm.", puan: 1 }
            ] },
            { soru: "Evde ebeveyn veya akraba bakımı gibi uzun süreli bir görev üstlendiniz.", options: [
                { text: "İyileşmiyor diye agresifleşir, fevri davranışlarla moral bozucu ortam yaratırım.", puan: 5 },
                { text: "Çabuk iyileşsin diye bazen sinirlenir, sabırsız tepkiler veririm.", puan: 4 },
                { text: "Zorluk olduğunu biliyorum ama emek ve sabırla sorumluluğu üstlenirim.", puan: 3 },
                { text: "Biraz destek olsam da sıkılınca bırakırım, tamamen sürdüremem.", puan: 2 },
                { text: "Hemen kaçmak isterim, bakım ve sabır işleri bana göre değil.", puan: 1 }
            ] },
            { soru: "Oruç tutuyorsunuz, ilk birkaç saat geçtikten sonra dayanmak zorlaşıyor.", options: [
                { text: "Sürekli huysuzlanır, niye bu kadar uzun diye öfkelenip belki de orucu bozarım.", puan: 5 },
                { text: "Hadi akşam gelsin diye sürekli saate bakar, sabırsızlıkla çevremi bunaltırım.", puan: 4 },
                { text: "Zorluğunu bilsem de sabredip gün sonuna kadar gayret ederim.", puan: 3 },
                { text: "Başlasam da öğlene gelmeden bırakayım deyip dayanamam.", puan: 2 },
                { text: "Hiç oruca girmem, nasıl olsa yapamam diye en başta vazgeçerim.", puan: 1 }
            ] },
            { soru: "Toplu yolculukta otobüs rötar yapıyor, saatlerce beklemek gerek.", options: [
                { text: "Görevlilerle kavga etme noktasına gelir, ortalığı karıştırırım.", puan: 5 },
                { text: "Dakikada bir ne zaman kalkacağız diye söylenir, sinirli tavırlar gösteririm.", puan: 4 },
                { text: "Gayet sakince kitap okuyarak veya başka bir meşguliyetle sabırla beklerim.", puan: 3 },
                { text: "Biraz beklerim ama çabuk sıkılır, dayanamam deyip ortada kalırım.", puan: 2 },
                { text: "Yolculuğu iptal eder, ne haliniz varsa görün deyip giderim.", puan: 1 }
            ] },
            { soru: "Yeni tanıştığınız biriyle anlaşmak zaman istiyor, sabır gerektiren bir süreç.", options: [
                { text: "Hemen samimi olmalıyız veya hiç diyerek aşırı tepkilerle ilişkileri bozarım.", puan: 5 },
                { text: "Hızlı uyum bekler, niye hemen anlaşamıyoruz diye sabırsızca sitem ederim.", puan: 4 },
                { text: "İnsan ilişkileri zamana bağlıdır, olgunlukla sabırla uyum sağlamaya gayret ederim.", puan: 3 },
                { text: "Başta girişir, sonra beni anlamıyor deyip çabuk pes ederim.", puan: 2 },
                { text: "Yeni tanışma ve zaman verme uğraştırıyor, hiç ilişki kurmam.", puan: 1 }
            ] },
        ]
    },
};

Object.assign(TESTS, TESTS_PART2);
