// tests_part3.js — Hilm, Kanaat, Şükür, Tevekkül, Hayâ
// Option sırası: puan 5 (İfrat) → 4 → 3 (Fazilet) → 2 → 1 (Tefrit)

const TESTS_PART3 = {
    hilm: {
        title: "Duygusuz Heykel mi, Korku Saçan Fırtına mı?",
        concepts: { tefrit: "Donukluk", fazilet: "Hilm", ifrat: "Öfke Patlaması" },
        questions: [
            { soru: "Bir arkadaşınız topluluk içinde sizi haksız yere suçladı.", options: [
                { text: "Anında patlar, bağırır ve hakaret ederim.", puan: 5 },
                { text: "Sesimi yükseltir, sert bir karşılık veririm.", puan: 4 },
                { text: "Sakin ama kararlı şekilde durumu düzeltirim.", puan: 3 },
                { text: "Rahatsız olurum ama ses çıkarmadan geçiştiririm.", puan: 2 },
                { text: "Hiç umursamam, suçlanmak bile ilgimi çekmez.", puan: 1 }
            ] },
            { soru: "Trafikte biri size çarptı, kusur tamamen karşı tarafta.", options: [
                { text: "Arabadan fırlar, küfür ve tehditle saldırırım.", puan: 5 },
                { text: "Bağırıp çağırırım ama sonra biraz sakinleşirim.", puan: 4 },
                { text: "Tutanak ve sigorta işlemini kavga etmeden hallederim.", puan: 3 },
                { text: "Canım sıkılır ama sessizce kenara çekerim.", puan: 2 },
                { text: "Arabadan bile inmem, ne olduğunu önemsemem.", puan: 1 }
            ] },
            { soru: "Sosyal medyada biri hakkınızda asılsız bir şey yazdı.", options: [
                { text: "Hakaret ve tehditlerle karşılık verir, savaş açarım.", puan: 5 },
                { text: "Sert bir dille karşılık yazar, kalp kırıcı sözler söylerim.", puan: 4 },
                { text: "Gerçeği nazikçe açıklayıp geçerim, hakaret etmem.", puan: 3 },
                { text: "Rahatsız olurum ama kısa bir cevap yazıp bırakırım.", puan: 2 },
                { text: "Görmezden gelirim, hiçbir şey hissetmem zaten.", puan: 1 }
            ] },
            { soru: "Evde yemek istediğiniz gibi yapılmamış.", options: [
                { text: "Masayı dağıtırcasına sinirlenip ortalığı karıştırırım.", puan: 5 },
                { text: "Ses yükseltip birkaç kırıcı laf söylerim.", puan: 4 },
                { text: "Teşekkür edip yumuşak bir dille tercihimi belirtirim.", puan: 3 },
                { text: "Hoşnutsuz olurum ama sesimi çıkarmam.", puan: 2 },
                { text: "Farkına bile varmam, ne yapılırsa yapılsın farketmez.", puan: 1 }
            ] },
            { soru: "Bir tanıdığınız yüzünüze karşı küçümseyici konuştu.", options: [
                { text: "Kontrolümü kaybedip ağır hakaret ve tehditte bulunurum.", puan: 5 },
                { text: "Onu da aşağılayacak sertlikte karşılık veririm.", puan: 4 },
                { text: "Yanlışını söyler, gerekirse mesafe koyarım ama taşkınlık yapmam.", puan: 3 },
                { text: "Bozulurum ama yüzüne bir şey diyemem, uzaklaşırım.", puan: 2 },
                { text: "Hiçbir şey hissetmem, duygusuz kalırım.", puan: 1 }
            ] },
            { soru: "Maçta hakem bariz yanlış bir karar verdi, takımınız mağdur.", options: [
                { text: "Hakemle kavgaya tutuşur, sahayı birbirine katarım.", puan: 5 },
                { text: "Yüksek sesle itiraz edip hakemin üstüne yürürüm.", puan: 4 },
                { text: "Kurallara uygun şekilde itirazımı bildiririm.", puan: 3 },
                { text: "Hafifçe itiraz edip fazla üstelemem.", puan: 2 },
                { text: "Aldırmam, haksız da olsa umursamam, belki oyundan çıkarım.", puan: 1 }
            ] },
            { soru: "Küçük bir çocuk evin duvarını kalemle çizdi.", options: [
                { text: "Öyle sinirlenirim ki çocuğa bağırır, sert cezalandırırım.", puan: 5 },
                { text: "Kızar, korkutucu bir uyarı yaparım.", puan: 4 },
                { text: "Sakince neden yanlış olduğunu anlatır, yapmamasını öğretirim.", puan: 3 },
                { text: "Yapma derim ama pek ciddiye almam.", puan: 2 },
                { text: "Hiç umursamam, çocuk ne yaparsa yapsın.", puan: 1 }
            ] },
            { soru: "İş yerinde patron size haksız yere fazla yük bindi.", options: [
                { text: "Ofisi basıp kavga çıkaracak kadar sinirlenirim.", puan: 5 },
                { text: "Öfkeyle çıkışır, ses yükseltirim.", puan: 4 },
                { text: "Kibar ama net şekilde durumu konuşurum, gerilimi artırmam.", puan: 3 },
                { text: "Rahatsız olurum ama sineye çeker, kendi kendime söylenirim.", puan: 2 },
                { text: "Hiç tepki vermem, içimde de bir şey hissetmem.", puan: 1 }
            ] },
            { soru: "Bir organizasyonda aksaklık oldu, herkes sizi suçluyor.", options: [
                { text: "Etrafa hakaretler yağdırır, masaları tekmeleyecek kadar öfkelenirim.", puan: 5 },
                { text: "Yüksek sesle kendimi savunup ortamı gererim.", puan: 4 },
                { text: "Gerekirse özür diler, saldırganlaşmadan durumu açıklarım.", puan: 3 },
                { text: "Suçlu olmadığımı kısık sesle belirtip baskıda susarım.", puan: 2 },
                { text: "Hiç tepki göstermeden sıyrılırım, sanki ben yokmuşum gibi.", puan: 1 }
            ] },
            { soru: "Arkadaş ortamında birisi size ağır bir ithamda bulundu.", options: [
                { text: "Çıldırırcasına kavgaya tutuşur, ortalığı birbirine katarım.", puan: 5 },
                { text: "Sesimi yükseltip karşı saldırıya geçerim.", puan: 4 },
                { text: "Sakince haksız ithamı reddeder, saygılı şekilde konuyu açıklığa kavuştururum.", puan: 3 },
                { text: "Rahatsız olup sessizce gruptan uzaklaşırım.", puan: 2 },
                { text: "Tek kelime etmeden köşeye çekilir, duygusuz kalırım.", puan: 1 }
            ] },
            { soru: "Birisi kazayla telefonunuzu düşürüp kırdı.", options: [
                { text: "O an sinir krizi geçirir, fiziksel veya sözlü şiddet gösteririm.", puan: 5 },
                { text: "Oldukça sert konuşur, öfkemi belli ederim.", puan: 4 },
                { text: "Kızmadan zararın nasıl telafi edileceğini konuşurum.", puan: 3 },
                { text: "İçten üzülürüm ama sesimi çıkarmam.", puan: 2 },
                { text: "Hiç umursamam, sanki sorun yokmuş gibi davranırım.", puan: 1 }
            ] },
        ]
    },
    kanaat: {
        title: "Parayı Saklayıp Kendini de Mahrum mu Bırakıyorsun, Yoksa Harcarken Doymuyor musun?",
        concepts: { tefrit: "Pintilik", fazilet: "Kanaat", ifrat: "Tamah" },
        questions: [
            { soru: "Maaşınız yattı, ilk gün ne yaparsınız?", options: [
                { text: "Hemen lüks ve gereksiz şeylere dalar, doyumsuzca harcarım.", puan: 5 },
                { text: "Daha çok kazanma hırsıyla hemen yeni planlar kurarım.", puan: 4 },
                { text: "Önce zorunlu giderleri karşılar, biraz da kenara koyarım.", puan: 3 },
                { text: "Temel ihtiyaçlardan bile kısar, mümkünse hiç harcamam.", puan: 2 },
                { text: "Derhal kenara koyar, kendimi aç bırakma pahasına sakalarım.", puan: 1 }
            ] },
            { soru: "Uzun süredir istediğiniz bir eşyayı alacak paranız var ama evde başka ihtiyaçlar da var.", options: [
                { text: "Gözüm dönmüş, en pahalısını alır, belki borçlanırım bile.", puan: 5 },
                { text: "Lüks olanı alır, sonra boş cüzdanla kalırım.", puan: 4 },
                { text: "İhtiyacım varsa makul fiyata iyi ürünü seçer, diğer masrafları da gözetirim.", puan: 3 },
                { text: "Ucuz bir alternatif alırım, paramın gitmesine dayanamam.", puan: 2 },
                { text: "Almaktan vazgeçer, paramı hiç harcamam, kendim de mahrum kalırım.", puan: 1 }
            ] },
            { soru: "Ay sonu geldi, elde az para kalmış ama faturalar bekliyor.", options: [
                { text: "Kalan parayla bile riskli harcamalar yapar, borçlanmaya devam ederim.", puan: 5 },
                { text: "Daha fazla kazanmak hırsıyla kendimi tehlikeye atabilirim.", puan: 4 },
                { text: "Masrafları karşılar, kalan varsa birikim yapar, dengeli ilerlerim.", puan: 3 },
                { text: "Faturayı ödemeye bile içim parçalanır, geciktirmeyi düşünürüm.", puan: 2 },
                { text: "Temel ihtiyacı bile keser, paramı saklamak için aç kalırım.", puan: 1 }
            ] },
            { soru: "Misafir gelecek, sofra hazırlayacaksınız.", options: [
                { text: "Limitsiz masraf yapar, gösterişli bir sofra kurar, sonra sıkıntıya girerim.", puan: 5 },
                { text: "Gereksiz çeşitlerle masrafı abartırım.", puan: 4 },
                { text: "Özen gösterir ama israfa kaçmadan yeterli sofra kurarım.", puan: 3 },
                { text: "Biraz ikram yaparım ama harcadığım her kuruş içimi acıtır.", puan: 2 },
                { text: "En ucuz malzemeler, yetersiz ikram; misafire önem vermem.", puan: 1 }
            ] },
            { soru: "Güvendiğiniz biri sizden borç istiyor, paranız da var.", options: [
                { text: "Borç vermek yerine kendi hırsım için kullanır, daha fazla kazanmanın peşine düşerim.", puan: 5 },
                { text: "Verirsem kar edebilir miyim diye hesap yaparım.", puan: 4 },
                { text: "Güveniyorsam, imkanım varsa seve seve veririm.", puan: 3 },
                { text: "Küçük bir miktar veririm ama tedirgin olurum.", puan: 2 },
                { text: "Asla vermem, param bende kalmalı.", puan: 1 }
            ] },
            { soru: "Arkadaşlar pahalı bir restorana davet etti.", options: [
                { text: "Gösteriş için en lüks tabakları ısmarlayıp abartılı masraf yaparım.", puan: 5 },
                { text: "Ortama ayak uydurup pahalı menüler sipariş ederim.", puan: 4 },
                { text: "Bütçeme göre normal bir menü seçer, gereksiz harcama yapmam.", puan: 3 },
                { text: "Zoraki gitsem de bir çorbayla idare eder, malımı korurum.", puan: 2 },
                { text: "Kesinlikle gitmem, paraya yazık derim.", puan: 1 }
            ] },
            { soru: "Aile içinde acil bir masraf çıktı, elinizde yeterli para var.", options: [
                { text: "Paramı umarsızca harcar, sonra da daha fazla kazanmak için riskli işlere dalarım.", puan: 5 },
                { text: "Büyük para koyar, sonra hırsla onu telafi etmeye çalışırım.", puan: 4 },
                { text: "İhtiyaç neyse makul ölçüde destek olurum.", puan: 3 },
                { text: "Çok cüzi bir miktar veririm, asıl parayı saklarım.", puan: 2 },
                { text: "Elimi cebime atmam, gerekirse onlar sıkıntı çeksin.", puan: 1 }
            ] },
            { soru: "Fazladan kazanç için gayrimeşru bir yol aklınıza geliyor.", options: [
                { text: "Gözüm para hırsından dönmüş, haram-helal bakmam, yeter ki kazanayım.", puan: 5 },
                { text: "Daha fazla kazanmak için yasal sınırları zorlamaya sıcak bakarım.", puan: 4 },
                { text: "Meşru yollarla rızkımı kazanır, harama yaklaşmam.", puan: 3 },
                { text: "Zaten fazla uğraşmam, riskli işlere hiç girmem ama pinticeyim.", puan: 2 },
                { text: "Para kazanmaya üşenirim, ne helal ne haram hiçbir işe girmem.", puan: 1 }
            ] },
            { soru: "Birisi size hediye getirdi.", options: [
                { text: "Hediyeleri daha pahalı şeyler istemenin fırsatı olarak görürüm.", puan: 5 },
                { text: "Daha büyüğünü, daha iyisini beklediğimi hissettiririm.", puan: 4 },
                { text: "Sevinir, gücüm yettiğince ben de karşılık veririm.", puan: 3 },
                { text: "Alırım ama kendim kimseye hediye almak istemem.", puan: 2 },
                { text: "Hediye almaktan bile rahatsız olurum, karşılık vermem gerekir diye korkarım.", puan: 1 }
            ] },
            { soru: "Markette büyük bir kampanya var, birçok ürün indirimde.", options: [
                { text: "İndirimli-indirimsiz bakmadan her şeyi doldurur, açgözlülükle paramı tüketirim.", puan: 5 },
                { text: "Kampanyayı görünce ihtiyacımdan fazla alır, masrafım artar.", puan: 4 },
                { text: "Gerçekten ihtiyacım olanları kampanyadan alır, gereksiz şeylere para vermem.", puan: 3 },
                { text: "En ucuzunu seçer, kalitesiz olsa bile paramı korumaya bakarım.", puan: 2 },
                { text: "En gerekli ürünleri bile almam, param cepte kalsın derim.", puan: 1 }
            ] },
        ]
    },
    sukur: {
        title: "Nimetlerin Hepsi Senin Gözünde Boş mu, Yoksa Sırf Sen mi Mükemmel Oldun?",
        concepts: { tefrit: "Nankörlük", fazilet: "Şükür", ifrat: "Kibre Kapılma" },
        questions: [
            { soru: "İşte burs veya maaş zammı aldınız.", options: [
                { text: "Tamamen böbürlenirim, bu zam bana yapılması normaldir derim.", puan: 5 },
                { text: "İçten içe kibirlenmeye başlarım, zaten ben olmasam olmazdı.", puan: 4 },
                { text: "Elhamdülillah derim, emeği geçenlere de teşekkür ederim.", puan: 3 },
                { text: "Biraz faydalı ama neden daha çok değil diye düşünürüm.", puan: 2 },
                { text: "Hiç yeterli değil, perişanım, hiçbir işime yaramaz derim.", puan: 1 }
            ] },
            { soru: "Mütevazı ama iş gören bir eviniz ve arabanız var.", options: [
                { text: "Bende varsa harikayım diye çevredekileri küçük görürüm.", puan: 5 },
                { text: "Kendi gayretimle aldım, kimse minnet etmesin diye böbürlenirim.", puan: 4 },
                { text: "Şükrünü bilirim, elimdekini değerlendirir, fırsat olursa iyileştiririm.", puan: 3 },
                { text: "Kısmen işimi görse de daha iyisi olmalıydı diye tatminsizim.", puan: 2 },
                { text: "Kötü araba kötü ev, hepsi berbat diye yakınıp dururum.", puan: 1 }
            ] },
            { soru: "Bir toplantıda başarılarınızdan söz edildi.", options: [
                { text: "Benden üstünü var mı diye gurur abidesi gibi konuşurum.", puan: 5 },
                { text: "Tabii iyiyim, kendi gayretimle başardım diye kendimi yüceltirim.", puan: 4 },
                { text: "Hamdederim, emeği geçenlere teşekkür eder, Allaha şükrederim.", puan: 3 },
                { text: "Biraz başarı var ama ne işe yarar diye olumsuz bakarım.", puan: 2 },
                { text: "Başarı falan yok, zaten hep şanssızım derim.", puan: 1 }
            ] },
            { soru: "Sosyal medyada sizi öven bir paylaşım gördünüz.", options: [
                { text: "Bu kadar övgü bile az, ben eşsizim diye kendimi göklere çıkarırım.", puan: 5 },
                { text: "Haklılar, bu övgüyü hak ediyorum diye gururlanırım.", puan: 4 },
                { text: "Teşekkür eder, Allahın izniyle oldu derim, haddimi bilirim.", puan: 3 },
                { text: "Övüyorlar ama bence pek önemi yok derim.", puan: 2 },
                { text: "Hiç güvenmem, bu övgü yalan, ben değersizim derim.", puan: 1 }
            ] },
            { soru: "Rahat ve konforlu bir yolculuk yapıyorsunuz, her şey yolunda.", options: [
                { text: "Bu konforu hak eden benim, diğer yolcular da kim diye kibirlenirim.", puan: 5 },
                { text: "Ben olmasam bu yolculuk eksik kalırdı gibi tuhaf bir özgüven hissederim.", puan: 4 },
                { text: "Elhamdülillah rahat yolculuk, nimet kıymetini bilirim.", puan: 3 },
                { text: "Fena değil ama sürekli kusur arayıp tadını çıkaramam.", puan: 2 },
                { text: "Koltuk da kötü hava da kötü, hep memnuniyetsizim.", puan: 1 }
            ] },
            { soru: "Evde tencere kaynıyor, çayınız hazır, temel ihtiyaçlar karşılanıyor.", options: [
                { text: "Bu ev bu yemek benim başarımla var diye insanlara üstten bakarım.", puan: 5 },
                { text: "Sayemde yiyorsunuz gibi gururlu söylemler yaparım.", puan: 4 },
                { text: "Rabbime şükreder, nasibime razı olurum.", puan: 3 },
                { text: "Ufak rahatlık var ama abartacak bir şey yok diye küçümserim.", puan: 2 },
                { text: "Hepsi yetersiz, keyif vermez, her şey kötü derim.", puan: 1 }
            ] },
            { soru: "Kendinizden çok daha zor durumda olanları gördünüz.", options: [
                { text: "Ben özelim, onlar benim seviyeme asla erişemez diye kibirle bakarım.", puan: 5 },
                { text: "İçimde onlardan üstünüm diye bir gurur hissi oluşur.", puan: 4 },
                { text: "Şükreder, elimden gelen yardımı yapmaya çalışırım.", puan: 3 },
                { text: "Onların halini görsem de ben de dertliyim diye memnuniyetsizim.", puan: 2 },
                { text: "Bende zaten hiçbir şey yok, sürekli kendime acırım.", puan: 1 }
            ] },
            { soru: "Büyük bir müjde aldınız, mesela beklenmedik bir ödül kazandınız.", options: [
                { text: "Görüyor musunuz ben üstünüm diye herkese hava atarım.", puan: 5 },
                { text: "Kendi çabamla kazandım diye gururlu pozlar veririm.", puan: 4 },
                { text: "Elhamdülillah deyip sevinir, nimeti yerinde kullanmaya çalışırım.", puan: 3 },
                { text: "Kısa süreli memnuniyet, sonra yine bu da yetmez derim.", puan: 2 },
                { text: "Hiç coşku duymam, ne işe yaracak ki diye nankörce bakarım.", puan: 1 }
            ] },
            { soru: "İnsanlar size ne kadar şanslısın dedi.", options: [
                { text: "Ben seçilmişim siz değilsiniz modunda tepeden bakarım.", puan: 5 },
                { text: "Bu benim hakkım, ben çok çalışıyorum diye böbürlenirim.", puan: 4 },
                { text: "Evet Rabbim nasip etti, hayra kullanabileyim derim.", puan: 3 },
                { text: "O kadar da önemli değil diye memnuniyetsiz konuşurum.", puan: 2 },
                { text: "Ne şansı, hiçbir işime yaramadı diye sızlanırım.", puan: 1 }
            ] },
            { soru: "Tanıdıklarınız size sürpriz bir kutlama düzenledi.", options: [
                { text: "Ben muhteşemim, bu kutlama az bile diye ego patlaması yaşarım.", puan: 5 },
                { text: "Bunu fazlasıyla hak ediyorum diye gururlanırım.", puan: 4 },
                { text: "Teşekkür eder, hem onlara hem Rabbime minnet duyarım.", puan: 3 },
                { text: "Biraz hoşuma gider ama daha büyüğünü beklerdim derim.", puan: 2 },
                { text: "Anlamsız bulurum, zaten hayatım kötü diye yakınırım.", puan: 1 }
            ] },
            { soru: "Sahip olduğunuz bir nimeti kaybetme riskiniz var.", options: [
                { text: "Ben böyle risklere boyun eğmem, çünkü mükemmelim diye ukalaca konuşurum.", puan: 5 },
                { text: "Bende var, kaybetmem, ben üstünüm diye kibirli yaklaşırım.", puan: 4 },
                { text: "Elhamdülillah şu an var, kaybetmemek için de tedbirimi alırım.", puan: 3 },
                { text: "Biraz var ama bana yine faydası yok diye tatminsizim.", puan: 2 },
                { text: "Zaten hiçbir şeyi hakkıyla yaşayamıyorum, hep kayıptayım.", puan: 1 }
            ] },
        ]
    },
    tevekkul: {
        title: "Plan Yok, Saldım Çayıra mı, Yoksa Her Şey Aklında Mı Hapsoldu?",
        concepts: { tefrit: "Tedbirsizlik", fazilet: "Tevekkül", ifrat: "Aşırı Endişe" },
        questions: [
            { soru: "İş arıyorsunuz, henüz bir şey bulamadınız.", options: [
                { text: "Her şey bende bitiyor, vasıtalar olmadan asla kurtulamam diye kaygıya boğulurum.", puan: 5 },
                { text: "Ya bulamazsam diye panik yapar, geceleri uyuyamam.", puan: 4 },
                { text: "Düzenli başvuru yapar, dua edip sonucu Allaha bırakırım.", puan: 3 },
                { text: "Arada bakarım ama çok uğraşmam, nasipse olur derim.", puan: 2 },
                { text: "Hiç CV hazırlamam, ilanlara bakmam, boşta dururum.", puan: 1 }
            ] },
            { soru: "Önemli bir sınava gireceksiniz.", options: [
                { text: "Başaramazsam hayatım mahvolur diye dünya kaygısına boğulurum.", puan: 5 },
                { text: "Günlerce uykusuz kalır, panik atak halinde abartılı çalışırım.", puan: 4 },
                { text: "Düzenli çalışır, dua eder, sonuca tevekkülle razı olurum.", puan: 3 },
                { text: "Az çalışır, oluruna bırakırım.", puan: 2 },
                { text: "Hiç çalışmam, Rabbim istemedi demek ki derim.", puan: 1 }
            ] },
            { soru: "Seyahate çıkacaksınız, yol üzerinde riskler olabilir.", options: [
                { text: "Her zerreyi kontrol etmeliyim diye maneviyata yer bırakmam.", puan: 5 },
                { text: "Ya uçak düşerse ya otel yanarsa diye senaryolarla boğuşurum.", puan: 4 },
                { text: "Bilet ve konaklama ayarlar, dua edip tevekkülle yola çıkarım.", puan: 3 },
                { text: "Basitçe bakarım ama çok ilgilenmem.", puan: 2 },
                { text: "Hiç plan yapmam, öylece yola çıkarım.", puan: 1 }
            ] },
            { soru: "Ufak bir sağlık şikayetiniz var, doktora gitmeniz gerekiyor.", options: [
                { text: "Benim kontrolüm dışında bir şey olamaz diye sürekli endişeyle titrerim.", puan: 5 },
                { text: "Her ağrıda büyük hastalık var mı diye panikle doktora koşarım.", puan: 4 },
                { text: "Doktora gider, tedavimi uygular, Allahtan şifa dilerim.", puan: 3 },
                { text: "Geçer herhalde diye ciddi muayeneden kaçınırım.", puan: 2 },
                { text: "Hiç doktora gitmem, kaderimde ne varsa o olur derim.", puan: 1 }
            ] },
            { soru: "Biri size gayret göstermelisin, plan yapmadan olmaz dedi.", options: [
                { text: "Sebeplere neredeyse tapınırcasına güvenip maneviyata hiç yer bırakmam.", puan: 5 },
                { text: "Her ayrıntıya saplanıp, aksilik olsa tahammül edemem.", puan: 4 },
                { text: "Plan yapmak güzel, sonra Allaha güvenmek esas; ikisini birlikte yaparım.", puan: 3 },
                { text: "Kısmen haklı ama uğraşacak mecalim yok derim.", puan: 2 },
                { text: "Plan da nedir, Allah dilerse olur diye her şeyi boş bırakırım.", puan: 1 }
            ] },
            { soru: "Bir arkadaşınız malzemeleri hazırla, ben de dua edeyim inşallah güzel olur dedi.", options: [
                { text: "Dua fuzuli zaman kaybı, mutlaka ben kurtaracağım diye düşünürüm.", puan: 5 },
                { text: "Sadece malzemelere inanırım, duanın pek manası yok derim.", puan: 4 },
                { text: "Hem fiili tedbir hem dua birlikte olmalı, dengeli bulurum.", puan: 3 },
                { text: "Dua iyi de ben çok uğraşmayayım, nasip diyelim.", puan: 2 },
                { text: "Ne duanın ne malzemenin önemi var, nasipse olur derim.", puan: 1 }
            ] },
            { soru: "Uzun vadeli bir projenizde finansal kaynak gecikti, süreç aksadı.", options: [
                { text: "Maddi kaygılarım o kadar yüksek ki maneviyatım sıfıra indi.", puan: 5 },
                { text: "Her gün ne olacak diye stres ve panik içindeyim.", puan: 4 },
                { text: "Yeni çözüm yolları arar, Rabbime dua edip süreci yönetirim.", puan: 3 },
                { text: "Az uğraşmıştım, şimdi daha da vazgeçerim.", puan: 2 },
                { text: "Olursa olur diye tamamen salar, hiçbir tedbir almam.", puan: 1 }
            ] },
            { soru: "Sınav sonuç günü, elimden geleni yaptınız.", options: [
                { text: "Düşük gelirse hayatım biter diye maneviyatsız endişeye boğulurum.", puan: 5 },
                { text: "Anksiyete tavan, sürekli kötü sonuç senaryoları kuruyorum.", puan: 4 },
                { text: "Çalıştım, dua ettim, sabırla bekliyorum; olumsuz olursa yeni yol çizerim.", puan: 3 },
                { text: "Kısmen çalışmıştım, Allah ne yazdıysa o derim.", puan: 2 },
                { text: "Hiç çalışmadım ki, hayırlısı neyse o diye bıraktım.", puan: 1 }
            ] },
            { soru: "Yeni bir iş yeri açmak istiyorsunuz.", options: [
                { text: "Maneviyat yok, sadece ben diyerek stresi tavan yaptırıp kendimi yıpratırım.", puan: 5 },
                { text: "Ya başarısız olursa korkusuyla sürekli panik halindeyim.", puan: 4 },
                { text: "Araştırır, sermayeyi planlar, dua edip tevekkülle açarım.", puan: 3 },
                { text: "Biraz heveslenir, yarım yamalak plan yapar, gerisini bırakırım.", puan: 2 },
                { text: "Hiçbir hazırlık yapmam, nasipse olur derim.", puan: 1 }
            ] },
            { soru: "Sigorta, yedek plan ve garantiler konusunda tutumunuz nedir?", options: [
                { text: "Tüm güvenliği ben sağlamalıyım, Allah faktörü yokmuş gibi kontrol takıntım var.", puan: 5 },
                { text: "Sigorta ve garantilere rağmen yine de geceleri uyuyamam.", puan: 4 },
                { text: "Temel sigorta ve mantıklı yedek planları alır, sonra tevekkülle yaşarım.", puan: 3 },
                { text: "Kısıtlı önlem alırım, çok üstünde durmam.", puan: 2 },
                { text: "Sigorta falan umursamam, alın yazısı neyse o derim.", puan: 1 }
            ] },
            { soru: "Bir hastalık haberi aldınız, yakınınız Rabbim şifa verir dedi.", options: [
                { text: "Benim kontrolüm dışında bir şey olamaz diye maneviyatsız şekilde titrerim.", puan: 5 },
                { text: "Ya kötüleşirsem diye her gün kaygı krizlerine girerim.", puan: 4 },
                { text: "Doktora gider, ilacı uygular, Allahtan şifa dileyerek sabırla yaklaşırım.", puan: 3 },
                { text: "Biraz bakarım ama ciddiyet yok, nasıl olsa kader derim.", puan: 2 },
                { text: "Doktor veya tedbir düşünmem, ölürsem ölürüm derim.", puan: 1 }
            ] },
        ]
    },
    haya: {
        title: "Dillenirken Susuyor musun, Yoksa Perdesiz Bir Sergi mi Sunuyorsun?",
        concepts: { tefrit: "Aşırı Utangaçlık", fazilet: "Haya", ifrat: "Hayâsızlık" },
        questions: [
            { soru: "Topluluk önünde bir sunum yapmanız gerekiyor.", options: [
                { text: "Müstehcen veya çirkin ifadeler bile kullanırım, umursamam.", puan: 5 },
                { text: "Argo ve abartılı sözlerle patavatsızlaşabilirim.", puan: 4 },
                { text: "Ölçülü ve saygılı bir sunum yaparım, utanmam beni engellemez.", puan: 3 },
                { text: "Minik bir konuşma yaparım ama gerekeni tam söyleyemem.", puan: 2 },
                { text: "Kesinlikle konuşamam, dilim tutulur, geri çekilirim.", puan: 1 }
            ] },
            { soru: "Gözünüzün önünde bir haksızlık yapılıyor, itiraz etmeniz lazım.", options: [
                { text: "Ağır hakaret ve ifşa yoluna giderek saldırırım, pervasızım.", puan: 5 },
                { text: "Bağırıp sertleşmeyi normal bulurum.", puan: 4 },
                { text: "Uygun üslupla itirazımı belirtir, aşırıya gitmem.", puan: 3 },
                { text: "Konuşmaya niyetlenirim ama ortamda utanıp geri çekilirim.", puan: 2 },
                { text: "Haksızlık da olsa ses çıkaramam, utancımdan hakkımı arayamam.", puan: 1 }
            ] },
            { soru: "Mahrem bir konunun konuşulduğu bir ortamdasınız.", options: [
                { text: "Müstehcen anlatımlardan çekinmem, hayâ perdem yok.", puan: 5 },
                { text: "Edep sınırını zorlayan espriler yaparım.", puan: 4 },
                { text: "Ciddiyeti koruyarak, ahlaki sınırlar içinde konuşurum.", puan: 3 },
                { text: "Biraz bilgi alsam da genelde kabuğuma çekilirim.", puan: 2 },
                { text: "En küçük şeyde yüzüm kızarır, konuyu duymak bile istemem.", puan: 1 }
            ] },
            { soru: "Karma bir toplulukta yemek davetindesiniz.", options: [
                { text: "Uygunsuz davranışlar ve müstehcen esprilerden çekinmem.", puan: 5 },
                { text: "Şakayı abartıp saygısız ifadelere kayabilirim.", puan: 4 },
                { text: "Edep ölçülerinde sohbet eder, gereğinde konuşur gereğinde susarım.", puan: 3 },
                { text: "Oturup sessiz kalırım, yanlış anlaşılma korkusuyla konuşamam.", puan: 2 },
                { text: "Başım önde, göz göze gelemem, belki yemekten bile çekinip kalkarım.", puan: 1 }
            ] },
            { soru: "Arkadaşlar müzikli bir eğlence düzenledi.", options: [
                { text: "Edep dışı hareketler ve müstehcen davranışlardan çekinmem.", puan: 5 },
                { text: "Sınırları zorlayacak tavırlar sergilerim.", puan: 4 },
                { text: "Ölçülü eğlenir, edep sınırını aşmayan şeylere katılırım.", puan: 3 },
                { text: "Kıpırdayamam, köşede aşırı çekingen kalırım.", puan: 2 },
                { text: "Ortamda bulunamam, en masum haliyle bile gerilim yaratır.", puan: 1 }
            ] },
            { soru: "Bir toplulukta kendini tanıt dediler.", options: [
                { text: "Aklıma gelen her özel detayı sınırsızca anlatır, ifşa ederim.", puan: 5 },
                { text: "Gereksiz açık sözler söylerim, ne utanacağım derim.", puan: 4 },
                { text: "Öz ve net şekilde kendimi tanıtır, gerekli yerde dururum.", puan: 3 },
                { text: "Kısmen tanıtsam da devamını getirip yüzüm kızararak susarım.", puan: 2 },
                { text: "İsmimi bile söyleyemeyecek kadar sıkılırım, sesim çıkmaz.", puan: 1 }
            ] },
            { soru: "Size bir haksızlık yapıldı, tepki göstermeniz gerekiyor.", options: [
                { text: "Çirkin, hakaret dolu ifadelerle saldırırım, hayâ gözetmem.", puan: 5 },
                { text: "Çok sert çıkışıp kaba sözler kullanırım.", puan: 4 },
                { text: "Gereken tepkiyi edep dairesinde veririm, hayâ susmak demek değil.", puan: 3 },
                { text: "Biraz mırıldanırım ama hemen susarım.", puan: 2 },
                { text: "Meşru hakkımı bile talep edemem, ölesiye çekinirim.", puan: 1 }
            ] },
            { soru: "Yanınızda edep dışı bir video açıldı, herkes izliyor.", options: [
                { text: "Dalar izlerim, hatta teşvik de ederim, utanma hissetmem.", puan: 5 },
                { text: "İzleyip gülerim, doğal şeyler diye umursamam.", puan: 4 },
                { text: "Rahatsız edici deyip nazikçe kapatılmasını isterim ya da kalkarım.", puan: 3 },
                { text: "Hoşnutsuzum ama çekingenliğimden müdahale edemem.", puan: 2 },
                { text: "Gözlerimi kaparım, oradan uzaklaşırım ama kapatın da diyemem.", puan: 1 }
            ] },
            { soru: "Zorunlu bir sağlık muayenesinde doktora özel konuları anlatmanız lazım.", options: [
                { text: "Gereksiz detayları bile hayâsızca anlatır, doktoru bile tuhaf duruma sokarım.", puan: 5 },
                { text: "Gereğinden fazla detayı rahatça paylaşırım.", puan: 4 },
                { text: "Edep içinde ama gerektiği kadar bilgi veririm, sağlığım önemli.", puan: 3 },
                { text: "Kısmen söylerim ama önemli detayları bile saklarım.", puan: 2 },
                { text: "Doktora bile derdimi anlatamam, tedavim aksar.", puan: 1 }
            ] },
            { soru: "Arkadaş grubunda müstehcen şakalar dönüyor.", options: [
                { text: "En müstehcen şakaları yaparak ortamda bayrak taşırım.", puan: 5 },
                { text: "Onlara ayak uydurup müstehcen espri eklerim.", puan: 4 },
                { text: "Uygunsuz bulursam kibarca tepkimi belirtir, gerekirse kalkarım.", puan: 3 },
                { text: "Biraz utanırım ama konuyu değiştirmeye de çekinirim.", puan: 2 },
                { text: "Rahatsız olsam da hiçbir şey diyemem, pasif kalırım.", puan: 1 }
            ] },
            { soru: "Toplum içinde sevgi gösterileri konusunda sınırınız nedir?", options: [
                { text: "Toplumun rahatsız olacağı davranışları bile umursamadan sergilerim.", puan: 5 },
                { text: "Alenen sarılma öpüşmeden çok sakınmam, ne utanacağım derim.", puan: 4 },
                { text: "Toplumsal normlar çerçevesinde zararsız sevgi gösterebilirim, ölçüyü aşmam.", puan: 3 },
                { text: "Kısmen kabul ederim ama toplum içinde her türlü temastan kaçınırım.", puan: 2 },
                { text: "En masum temasta bile ürkerim, sevdiğime bile yakınlaşamam.", puan: 1 }
            ] },
        ]
    },
};

// Mevcut TESTS objesine ekle
Object.assign(TESTS, TESTS_PART3);
