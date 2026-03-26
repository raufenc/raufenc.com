export const config = { runtime: 'edge' };

const MADDE_LISTESI = `
1/1: Muhammed aleyhisselâma uymak, se'âdete kavuşdurur [peygambere uymak, saadet, mutluluk, kurtuluş, Resule itaat, hidayet, sünnet, islam, iman, seadet, Hz Muhammed, tabi olmak] #iman
1/2: Allahü teâlâya itâ'at için, Resûlüne itâ'at lâzımdır [itaat, Allah'a itaat, peygambere itaat, emre uymak, taat, kulluk, ibadet, Resule uymak, farz] #iman
1/3: Müslimân olmak için, ne yapmalı? Kelime-i şehâdet [müslüman olmak, kelimei şehadet, şehadet getirmek, İslama girmek, iman etmek, ihtida, din değiştirmek, yeni müslüman, nasıl müslüman olunur] #iman
1/4: Ehl-i sünnet âlimleri [ehli sünnet, sünni, mezhep, itikad, akaid, hak mezhep, doğru yol, alimler, ulema, İslam alimleri, fırka, ehl-i sünnet vel cemaat] #akaid
1/5: Ehl-i sünnetin reîsi, imâm-ı a'zam Ebû Hanîfedir [İmamı Azam, Ebu Hanife, Hanefi mezhebi, Nu'man bin Sabit, büyük imam, fıkıh alimi, mezhep imamı, Hanefi, mezhep kurucusu] #tarih
1/6: İmâm-ı a'zamın büyüklüğü [İmamı Azam, Ebu Hanife, büyüklüğü, Dürrül muhtar, Hayratül hisan, fazilet, üstünlük, hanefi, mezhep imamı] #tarih
1/7: İslâm âlimlerinin kitâbları [İslam alimleri, kitaplar, eserler, fıkıh kitapları, ilmihal, muteber kitaplar, din kitapları, kaynak eserler, ulema] #ilim
1/8: Uydurma tefsîr yazan kâfir olur [tefsir, uydurma tefsir, Kuran yorumu, kendi görüşüyle tefsir, batıl tefsir, bid'at tefsir, meal, Kuran açıklaması] #iman
1/9: Kur'ân tercemelerinden hangisine güvenileceği [Kuran tercümesi, Kuran meali, Kuran çevirisi, güvenilir meal, meal karşılaştırma, Kuranı Kerim tercüme, hangi meal] #ilim
1/10: Din hırsızları [din hırsızları, dini bozmak, sapık fikirler, bid'at ehli, reformcu, modernist, dinde reform, zararlı fikirler, mezhepsizlik] #bidat
1/11: Îmânın gitmesine sebeb olan şeyler [imanın gitmesi, küfür sözleri, iman bozulması, irtidad, dinden çıkma, elfazı küfür, küfre düşmek, iman kaybı, imansızlık] #akaid
1/12: Kalbde îmân bulunmasına alâmet, ahkâm-ı islâmiyyeye uymakdır [iman alameti, kalp, amel, ahkam, İslam hükümleri, iman ve amel, imanın belirtisi, kalbde iman, tasdik] #akaid
1/13: Allahü teâlânın ni'metleri, dünyâda herkesedir [Allahın nimetleri, nimet, şükür, dünya nimetleri, rızık, ihsan, lütuf, nimete şükür] #iman
1/14: Âhıretde kâfire merhamet yokdur [ahiret, kafir, azap, cehennem, merhamet, kıyamet, hesap günü, kafirin akıbeti, ahiret azabı] #akaid
1/15: Muhabbetin alâmetleri [muhabbet, sevgi, Allah sevgisi, Peygamber sevgisi, aşk, kalp, sevgi belirtileri, hubb, dostluk] #ahlak
1/16: Muhammed "aleyhisselâm", Allahü teâlânın sevgilisidir [Peygamber Efendimiz, Hz Muhammed, Habibullah, Allahın sevgilisi, son peygamber, Resulullah, siyer] #iman
1/17: Peygamberimizin mu'cizeleri. Kur'ân-ı kerîmin üstünlüğü [mucize, Kuranı Kerim, Kuranın üstünlüğü, peygamber mucizeleri, delil, harikulade, İslam delilleri, nübüvvet delili] #iman
1/18: Resûle tâbi' olmak nasıl olur? Evlâd terbiyesi [Resule uymak, evlat terbiyesi, çocuk eğitimi, çocuk yetiştirmek, itaat, sünnet, aile, terbiye, pedagoji] #ahlak
1/19: Hubb-i fillah, buğd-i fillah. Kazâya rızâ nasıl olur? [Allah için sevmek, Allah için buğz, kazaya rıza, tevekkül, sabır, rıza, hubbu fillah, buğdü fillah, takdir] #ahlak
1/20: Kâfirler iki kısmdır [kafir çeşitleri, harbi, zimmi, küfür, gayrimüslim, ehli kitap, müşrik, kafir türleri] #akaid
1/21: Cennete girmek için Muhammed aleyhisselâma uymak lâzımdır [cennet, cennete girmek, kurtuluş, Peygambere uymak, ebedi saadet, ahiret, cennet yolu, iman, amel] #iman
1/22: Kâfirlerin iyiliği dünyâda kalır [kafirin ameli, dünya, sevap, ahirette amel, iyi iş, amelin kabulü, iyilik, kafir ameli] #akaid
1/23: Dünyâ, âhıretin tarlasıdır [dünya, ahiret, tarla, hazırlık, amel, ibadet, ölüm, fani dünya, ahirete hazırlık, ameli salih] #ahlak
1/24: Âhıret bilgileri, aklın dışındadır. Bunlara akl ermez [ahiret, akıl, gayb, iman, gayba iman, aklın sınırı, metafizik, iman esasları] #akaid
1/25: Kur'ân-ı kerîm nedir? Kur'ân tercemeleri [Kuranı Kerim, Kuran nedir, Kuran tercümesi, meal, Allah kelamı, vahiy, ilahi kitap, mushaf, Kuran bilgileri] #iman
1/26: İctihâd hatâları. İmâm-ı a'zamın büyüklüğü [ictihad, ictihad hatası, mezhep, İmamı Azam, hata, müctehid, fıkıh, mezhep farkları, ihtilaf] #ilim
1/27: İctihâd ne demekdir? Müctehid kime denir? [ictihad, müctehid, fıkıh, içtihat, alim, mezhep, hüküm çıkarmak, delil, istinbat, fıkıh usulü] #ilim
1/28: Sünnet-i müekkede, sünnet-i zevâid [sünnet, sünneti müekkede, sünneti zevaid, sünnet çeşitleri, nafile, müstehap, mendub, sünnet farkları] #ibadet
1/29: Bir üniversiteliye cevâb. Fen bilgileri, bir yaratıcının var olduğunu bildirmekdedir [fen bilgileri, yaratıcı, Allah delilleri, bilim ve din, üniversite, akıl, ispat, tabiat, evrim, ateizm] #iman
1/30: Dünyâya, burada kalacak kadar, âhırete de orada kalacak kadar çalışmalıdır [dünya ahiret dengesi, çalışmak, kazanç, ibadet, denge, helal rızık, ahirete hazırlık] #ahlak
1/31: Dünyâda âhırete yarar iş görmek lâzımdır [ahirete yarar iş, amel, ibadet, hayırlı iş, salih amel, sevap, dünya, ahiret] #ahlak
1/32: Tenâsuh ve iki rûhluluk yokdur. Âlem-i misâl [tenasüh, reenkarnasyon, ruh göçü, alemi misal, ruh, berzah, iki ruhlu, batıl inanç] #akaid
1/33: Allahü teâlânın yakın olması ne demekdir? [Allahın yakınlığı, kurbiyet, mekandan münezzeh, tenzih, Allahın sıfatları, yakınlık, maiyyet] #akaid
1/34: Sünnete yapışmak, bid'atlerden sakınmak lâzımdır [sünnet, bid'at, sünnete uymak, bid'atten sakınmak, sünneti seniyye, doğru yol, bidat, yenilik] #iman
1/35: Müşriklerin bedenleri pis değildir. İ'tikâdları pisdir [müşrik, pislik, necaset, itikad, küfür, beden temizliği, şirk, müşriklerin hükmü] #akaid
1/36: Bir üniversiteliye cevâb. Fen bilgileri [bilim, fen, din ve bilim, yaratılış, üniversite, akıl, tabiat, fizik, kimya] #ilim
1/37: Kur'ân-ı kerîmi felsefecilere göre tefsîr câiz değildir [tefsir, felsefe, Kuran yorumu, batıl yorum, filozoflar, akılcılık, Kuran anlama, bid'at tefsir] #ilim
1/38: Sünnete yapışmak, bid'atlerden sakınmak lâzımdır [sünnet, bid'at, sünnete uymak, bid'atten kaçınmak, sünneti seniyye, doğru yol] #iman
1/39: Tenâsuh ve iki rûhluluk yokdur. Âlem-i misâl [tenasüh, reenkarnasyon, ruh, alemi misal, berzah, ruh göçü] #akaid
1/40: Âlem-i ervâh ve âlem-i misâl ve âlem-i ecsâd. Kabr azâbı [alemi ervah, alemi misal, alemi ecsad, kabir azabı, ruhlar alemi, berzah, ölüm sonrası, ara alem] #akaid
1/41: Emr-i bil-ma'rûf, nehy-i anil-münker ve cihâd sevâbı çokdur [emri bil maruf, iyiliği emretmek, kötülükten nehyetmek, cihad, sevap, tebliğ, davet, nasihat] #ahlak
1/42: Vera' ve takvâ. Hâlis ibâdetin alâmeti nedir? [vera, takva, ihlas, halis ibadet, şüpheli şeyler, haramdan kaçınmak, Allah korkusu, sakınma] #ahlak
1/43: Tevbe, vera' ve takvâ [tövbe, tevbe, pişmanlık, günahtan dönmek, vera, takva, istiğfar, af dilemek, tövbe nasıl yapılır] #ahlak
1/44: Farz, sünnet ve nâfilelerin ehemmiyyetleri ve farkları [farz, sünnet, nafile, fark, önem, ibadet dereceleri, vacip, mendub, müstehap, ibadet çeşitleri] #ibadet
1/45: Allahü teâlânın yakın olması ne demekdir? [Allahın yakınlığı, kurbiyet, maiyyet, tenzih, sıfatlar, kullara yakınlık] #akaid
1/46: Îmân, ibâdetler ve lüzûmlu nasîhatler [iman, ibadet, nasihat, farzlar, vazifeleler, müslüman vazifeleri, temel bilgiler] #iman
1/47: Îmân, ibâdetler, harâmlar [iman, ibadet, haram, günah, yasak, büyük günahlar, kebire, yasak işler] #iman
1/48: Gençlikde yapılan ibâdetlerin kıymeti [gençlik, genç, ibadet, gençlikte ibadet, sevap, kıymet, değer, gençlik ibadeti] #ahlak
1/49: Âlemler, herşey yokdan var edildi. Yunan felesofları [yaratılış, yoktan var, felsefe, Yunan filozofları, alem, kainat, madde, kevn] #akaid
1/50: Tesavvuf yolunda çalışmak istiyenin yapması lâzım olan şeyler [tasavvuf, tarikat, seyr-i süluk, manevi yol, nefis terbiyesi, zikir, murakabe, mürşid, derviş] #tasavvuf
1/51: Beş vakt nemâz, otuzüç farz [beş vakit namaz, otuzüç farz, 33 farz, namazın farzları, abdest farzları, iman farzları, farz listesi, namaz şartları] #namaz
1/52: Abdest almak. Abdesti bozan şeyler [abdest, abdest almak, abdest nasıl alınır, abdesti bozan şeyler, vuzu, abdest farzları, abdest sünneti, hades] #taharet
1/53: Mest üzerine mesh, özr sâhibi olmak [mest, mesh, çorap üzerine mesh, özür sahibi, mazereti olan, mest hükümleri, mesh süresi, seferi] #taharet
1/54: Gusl abdesti nasıl alınır? Ne zemân alınır? [gusül, gusül abdesti, boy abdesti, cünüplük, hayız, nifas, gusül nasıl alınır, yıkanmak, farz gusül] #taharet
1/55: Teyemmüm. Su bulamamak nasıl olur? [teyemmüm, teyemmüm nasıl yapılır, su bulamama, toprak, temiz toprak, hasta, yolcu, teyemmüm şartları] #taharet
1/56: Necâsetden tahâret. İstincâ. İstibrâ [necaset, taharet, istinca, istibra, temizlik, pislik temizleme, tuvalet adabı, hükmi temizlik, hadesten taharet] #taharet
1/57: Sular, temiz su, pis su, artıklar [sular, su çeşitleri, temiz su, pis su, artık su, müstamel su, mutlak su, mukayyed su, kuyu suyu] #taharet
1/58: Setr-i avret. Kadınların örtünmesi [tesettür, setr-i avret, örtünmek, kadın örtünmesi, avret yerleri, kapanmak, hicab, namaz kıyafeti, kadın giyimi] #namaz
1/59: İstikbâl-i kıble. Kıble ta'yîni [kıble, kıble tayini, kıble yönü, Kabe, kıble nasıl bulunur, pusula, kıble tespiti, kıbleye dönmek, namaz yönü] #namaz
1/60: Nemâz vaktleri. Takvîmler. Ezân [namaz vakitleri, namaz saatleri, vakit, takvim, ezan, imsak, güneş, öğle, ikindi, akşam, yatsı, kerahat vakti] #namaz
1/61: Nemâzın vâcibleri, secde-i sehv, secde-i tilâvet ve vitr nemâzı [namazın vacibleri, sehiv secdesi, secde-i sehv, tilavet secdesi, vitir namazı, vacip, unutma] #namaz
1/62: Ezân kelimelerinin ma'nâları [ezan, ezan anlamı, ezan kelimeleri, ezan manası, Allahu ekber, eşhedü, hayye ales, ezan meali] #namaz
1/63: Nemâzın ehemmiyyeti. Nemâz kılmıyanlar [namazın önemi, namaz kılmamak, namaz terk, günah, namazın fazileti, namaz kılmayanın hükmü, terk-i salat] #namaz
1/64: Nemâz nasıl kılınır? Nemâzın beş rüknü, niyyet [namaz nasıl kılınır, namaz kılınışı, namaz rükünleri, niyet, iftitah tekbiri, kıyam, rükü, secde, tahiyyat] #namaz
1/65: Yolculukda, otobüsde, gemide, tayyârede nemâz [yolculukta namaz, seferi namaz, otobüste namaz, uçakta namaz, gemide namaz, yolcu namazı, misafir, kasr] #namaz
1/66: Nemâzın vâcibleri, secde-i sehv, secde-i tilâvet ve vitr nemâzı [vacip, sehiv secdesi, secde-i sehv, tilavet secdesi, vitir namazı, namazın vacibleri, hata] #namaz
1/67: Nemâzı bozan şeyler. Kâfirlere teşebbüh [namazı bozan, namaz bozulur, mufsid, kafirlere benzeme, teşebbüh, namazda konuşma, namaz bozulması] #namaz
1/68: Nemâzın mekrûhları, nemâzı bozmak için özr [namazın mekruhları, namazda mekruh, namaz bozma özrü, tahrimen mekruh, tenzihen mekruh, kerih] #namaz
1/69: Câmi'de yapılması câiz olmıyan şeyler. Terâvih nemâzı [cami, cami adabı, teravih namazı, ramazan namazı, 20 rekat, camide yasaklar, mescid, cami hürmeti] #namaz
1/70: Cemâ'at ile nemâz kılmak. Hoparlörle, radyo ile nemâz [cemaatle namaz, cemaat, imam, müezzin, hoparlör, radyo, saf, imamet, cemaat fazileti, muktedi] #namaz
1/71: Cum'a nemâzı. İbâdet ne demekdir? [cuma namazı, cuma, hutbe, cuma hükmü, farz, ibadet, ibadet tanımı, cuma vakti, minber] #namaz
1/72: Bayram nemâzı. Kurban bayramı tekbîrleri [bayram namazı, bayram, kurban bayramı, Ramazan bayramı, teşrik tekbirleri, bayram tekbirleri, bayram namazı kılınışı] #namaz
1/73: Nemâzda otururken parmak kaldırmak [parmak kaldırma, tahiyyat, oturuş, teşehhüd, işaret parmağı, ka'de, ettehiyyatü, namazda oturma] #namaz
1/74: Kazâ nemâzları. Nemâz kılmıyanın cezâsı [kaza namazı, kaza, namaz borcu, kılınmamış namaz, namaz terk cezası, namaz kılmamak, kaza nasıl kılınır] #namaz
1/75: Nemâz ibâdetlerin en üstünüdür [namazın üstünlüğü, namazın fazileti, en üstün ibadet, namaz sevabı, namaz kıymeti, miracın hediyesi] #namaz
1/76: Nemâzın ta'dîl-i erkânı. Kul hakkı [tadili erkan, namazda huzur, rükünleri tam yapma, kul hakkı, hukuku ibad, hak, namazın adabı] #namaz
1/77: Ramezân-ı şerîfin kıymeti. Oruc nasıl tutulur? [ramazan, oruç, oruç tutmak, ramazan orucu, savm, ramazanın fazileti, iftar, sahur, niyet, imsak] #oruc
1/78: Zekât vermek. Para, mal, hayvan ve toprak mahsûllerinin zekâtı [zekat, zekat vermek, para zekatı, mal zekatı, hayvan zekatı, öşür, nisap, zekat hesabı, zekat kimlere farz] #zekat
1/79: Ramezân-ı şerîfin kıymeti. Oruc nasıl tutulur? [ramazan, oruç, orucu bozan, oruç hükümleri, kefaret, kazası, fidye, oruç bozulması, yemek içmek] #oruc
1/80: Sadaka-i fıtrı kimler verir? Kimlere vermelidir? [fitre, sadaka-i fıtr, fıtır sadakası, fitre kimlere verilir, fitre miktarı, ramazan fitresi, fitre ne kadar] #zekat
1/81: Kurban kesmek lâzımdır. Kimler keser? Nasıl kesilir? [kurban, kurban kesmek, kurban bayramı, vacip, kurban hükümleri, kurban nasıl kesilir, kurban hayvanı, udhiye] #ibadet
1/82: Adak ne demekdir? Günâh olan adaklar [adak, nezir, adak adamak, adak hükümleri, günah adak, adak yerine getirmek, adak çeşitleri] #ibadet
1/83: Yemîn nasıl edilir? Yemînin çeşidleri. Yemîn keffâreti [yemin, yemin etmek, yemin keffareti, yemin çeşitleri, yemin bozma, kasem, yeminler, yalancı yemin] #ibadet
1/84: Hacca gitmek. Hac nasıl yapılır? [hac, hacca gitmek, hac ibadeti, umre, ihram, tavaf, sa'y, Arafat, Mina, Kabe, hac farzları, menasik] #hac
1/85: Arabî ayların birinci gününü bulmak [arabi aylar, kameri takvim, hicri takvim, mübarek geceler, Kadir gecesi, Miraç, Berat, Regaib, kandil] #ilim
1/86: Şemsî seneleri kamerî seneye çevirmek [şemsi sene, kameri sene, takvim çevirme, hicri miladi, yıl hesabı, takvim hesabı] #ilim
1/87: Kamerî seneyi mîlâdî seneye çevirmek [kameri miladi çeviri, hicri miladi, takvim hesabı, yıl dönüşümü, tarih hesabı] #ilim
1/88: Hicrî sene başının, hangi gün olduğunu bulmak [hicri yılbaşı, muharrem, hicri takvim, sene başı, hicri hesap] #ilim
1/89: Arabî ayların birinci gününü bulmak [arabi aylar, kameri ay başı, hilal, ayın ilk günü, ru'yet-i hilal, ay takvimi] #ilim
1/90: Selâmlaşmak nasıl olur? Müsâfeha nasıl yapılır? [selam, selamlaşma, müsafeha, el sıkışma, selam vermek, selam almak, selamın hükmü, adab, görgü kuralları] #ahlak
1/91: Kur'ân-ı kerîm, Allah kelâmıdır [Kuranı Kerim, Allah kelamı, vahiy, Kuranın mahiyeti, mahluk değil, kelam sıfatı, Kuran hürmeti, Kuran ilmi] #akaid
1/92: Kur'ân-ı kerîm, Allah kelâmıdır [Kuran, Allah kelamı, vahiy, Kuranın sıfatı, ezeli kelam, mahluk olmayan, Kuranın korunması] #akaid
1/93: Allahü teâlâ akl ile, hayâl ile anlaşılamaz. Gayba îmân etmek lâzımdır [Allah, akıl, gayb, gayba iman, akıl sınırı, tenzih, iman, Allahı tanımak, marifetullah] #akaid
1/94: Allahü teâlâ akl ile, hayâl ile anlaşılamaz. Gayba îmân etmek lâzımdır [Allah, akıl, hayal, gayba iman, idrak, akıl ötesi, iman hakikati, tenzih] #akaid
1/95: Hilye-i se'âdet. Siyer kitâbları. Resûlullahın zevceleri [hilye, hilyei saadet, siyer, peygamber hayatı, peygamberin eşleri, ümmühatül müminin, siyer kitapları] #tarih
1/96: Muhammed aleyhisselâmın güzel ahlâkı [peygamber ahlakı, güzel ahlak, Hz Muhammed, Resulullah, örnek ahlak, üsve-i hasene, peygamber hayatı, sünnet] #ahlak
1/97: Resûlullahın ana, baba ve bütün dedeleri hep mü'min, sâlih idi [peygamber soyu, soy ağacı, neseb, peygamber ailesi, Abdullah, Amine, Abdulmuttalib, Haşimoğulları] #tarih
1/98: Unutulmuş sünnetleri meydâna çıkarmağı ve bid'atden sakınmağı teşvîk etmekdedir [sünnet ihyası, bid'at, sünnet, teşvik, ihya, unutulan sünnetler, sünnetin önemi] #iman
2/1: Unutulmuş sünnetleri meydâna çıkarmağı ve bid'atden sakınmağı teşvîk etmekdedir [sünnet ihyası, bid'at, sünnet, sünneti ihya, bid'atten sakınma, sünnetin değeri] #iman
2/2: Düâ etmekdeki gizli bilgileri açıklamakdadır [dua, dua etmek, dua adabı, dua nasıl edilir, kabul, dua vakitleri, istemek, münacaat, yakarış] #ahlak
2/3: Resûlullaha uymağa ve dînini öğrendiği kimseyi sevmeğe teşvik etmekdedir [peygambere uymak, hocayı sevmek, ilim öğrenmek, alim sevgisi, muhabbet, ittiba, sünnet] #ahlak
2/4: Îmân, akl, zekâ, halâl, harâm, adâlet, zulm, kazâ, kader [iman, akıl, zeka, helal, haram, adalet, zulüm, kaza, kader, temel kavramlar, irade] #akaid
2/5: Tefsîr, hadîs ne demekdir? Din âlimi kime denir? [tefsir, hadis, din alimi, alim, ulema, ilim, fıkıh, tefsir ilmi, hadis ilmi, ravi] #ilim
2/6: Hadîs-i şerîflerin çeşidleri ve hadîs âlimleri [hadis, hadis çeşitleri, sahih, hasen, zayıf, mevzu, hadis alimleri, Buhari, Müslim, ravi, sened] #ilim
2/7: Derd ve belânın Allahü teâlâdan geldiğini düşünmelidir [dert, bela, musibet, sabır, tevekkül, kader, sıkıntı, imtihan, Allah'tan bilmek, rıza] #ahlak
2/8: Derd ve belânın Allahü teâlâdan geldiğini düşünmelidir [dert, bela, musibet, sabır, teslimiyet, kader, imtihan, sıkıntı, tevekkül] #ahlak
2/9: İnsanlardan gelen sıkıntılara sabretmek lâzımdır [sabır, sıkıntı, insanlardan gelen dert, sabretmek, tahammül, metanet, musibete sabır, ezaya sabır] #ahlak
2/10: Üzüntü ve sıkıntıları ni'met bilmelidir [üzüntü, sıkıntı, nimet, sabır, şükür, rıza, bela nimettir, musibette nimet, keffaret] #ahlak
2/11: Zâhir işlerin bozuk olması, kalbin dağılmasına yol açar [zahir, batın, kalp, kalbin bozulması, amelin bozukluğu, günah, kalp hastalığı, gaflet] #ahlak
2/12: Derd ve belâlar, günâhlara keffâretdir [bela, keffaret, günah, musibet, günahların affı, sıkıntı, sabır, hastalık, imtihan] #ahlak
2/13: Kendi dileklerimizi bırakıp sâhibimizin arzûsuna uymalıyız [teslimiyet, rıza, heva, nefis, Allahın iradesi, teslim olmak, arzu, istek, kulluk] #tasavvuf
2/14: Kibr ve ucb, kalbin tehlükeli hastalığıdır [kibir, ucub, kibr, kendini beğenmek, gurur, kalp hastalığı, büyüklenme, tevazu, alçak gönüllülük] #ahlak
2/15: Allahü teâlânın ismleri. Yaratmak ne demekdir? [Allahın isimleri, esmaül hüsna, 99 isim, yaratmak, tekvin, halık, sıfatlar, ilahi isimler, Allahı tanımak] #akaid
2/16: Resûlullahın vefât ederken kâğıd istemesi, Eshâb-ı kirâmın üstünlüğü [vefat, kağıt, sahabe, Eshab-ı kiram, veda, üstünlük, sahabe fazileti, son anlar] #tarih
2/17: Vehhâbîler ve çeşidleri. Kıymetli din kitâblarını okumalı [Vehhabi, Vehhabilik, İbni Teymiyye, selefiye, sapık mezhep, din kitapları, okuma, bid'at fırkası] #bidat
2/18: Kabr ziyâreti lâzımdır. Olgun rûhlardan istifâde edilir [kabir ziyareti, mezar ziyareti, evliya, tevessül, ruhlardan istifade, ölülere dua, ziyaret adabı, fatiha] #tasavvuf
2/19: Kabr azâbına inanmıyanlara cevâb vermekdedir [kabir azabı, kabir hayatı, berzah, ölüm sonrası, kabir sorgusu, Münker Nekir, azap, kabir suali] #akaid
2/20: Kabr azâbına inanmıyanlara cevâb vermekdedir [kabir azabı, kabir delili, berzah, ölüm sonrası, kabir nimeti, inkarcılara cevap, kabir ahvali] #akaid
2/21: Şâmânîler, Behâîler, Ahmediyye, Dürzîler, Yezîdîler, Selefîler [Şamanizm, Bahailik, Ahmediyye, Dürziler, Yezidiler, Selefilik, batıl dinler, sapık fırkalar, mezhepler] #bidat
2/22: Hurûfîlik [Hurufilik, batıl mezhep, Fazlullah Hurufi, sapık fırka, harf, sayı, gulat] #bidat
2/23: Resûlullahın vefât ederken kâğıd istemesi, Eshâb-ı kirâmın üstünlüğü [Resulullah vefatı, kağıt hadisesi, sahabe, Eshab-ı kiram, Hz Ömer, son günler] #tarih
2/24: Eshâb-ı kirâm birbirini çok severdi. Şî'îlerin iftirâları [sahabe, Eshab-ı kiram, sahabe sevgisi, Şiilik, iftira, Hz Ali, Hz Ebubekir, Hz Ömer, sahabe arasında sevgi] #tarih
2/25: Eshâb-ı kirâmın büyüklüğü. Dostlara çok derd gelmesi [sahabe büyüklüğü, Eshab-ı kiram, bela, dert, dostlar, evliya, sabır, musibetler, fazilet] #tarih
2/26: Sosyal adâlet. Sosyalizm. Kapitalizm. Komünizm [sosyal adalet, sosyalizm, kapitalizm, komünizm, ekonomi, siyaset, İslam ekonomisi, toplum, rejim] #muamelat
2/27: İslâmiyyet, din ve dünyâ se'âdetlerinin kaynağıdır [İslamiyet, saadet, mutluluk, din, dünya, barış, huzur, İslam medeniyeti, toplum düzeni] #iman
2/28: Nefs ve akl [nefis, akıl, nefis terbiyesi, nefsin mertebeleri, emmaret, levvame, mülhime, mutmainne, ruh, irade] #tasavvuf
2/29: Müslimânlar niçin geri kaldılar? [geri kalmak, İslam dünyası, gerileme, sebep, medeniyet, ilim, teknoloji, terakkı, inkılap] #tarih
2/30: İslâmiyyet fenni emr etmekdedir. Fen yobazları [İslam ve fen, bilim, fen emri, fen yobazı, ilerleme, bilimsel gelişme, din-bilim uyumu, teknoloji] #ilim
2/31: Madde, atom üzerinde yeni bilgiler. Radyo-aktivite. Radar [madde, atom, radyoaktivite, radar, fizik, bilim, keşifler, enerji, nükleer] #ilim
2/32: Atom kuvveti ve sulh zemânında kullanılması [atom enerjisi, nükleer, barış, sulh, bilim, fizik, enerji kullanımı] #ilim
2/33: İslâmiyyetde kadının kıymeti ve hakları çok büyükdür [kadın hakları, İslamda kadın, kadının değeri, kadın kıymeti, kadın ve İslam, hukuk, eşitlik] #nikah
2/34: İslâmiyyetde nikâh. Evlenmesi câiz olmıyan kadınlar [nikah, evlilik, evlenme, nikah hükümleri, evlenme engelleri, haram nikah, mehr, şahit, veli] #nikah
2/35: Kâfirlerin evlenmesi. Çocuğa îmânı, islâmı öğretmelidir [kafir nikahı, çocuk eğitimi, iman öğretmek, İslam eğitimi, çocuklara din, evlilik, terbiye] #nikah
2/36: İslâmiyyetdeki talâk. Hul'. Zihâr. Li'ân. İddet. Hıdâne [talak, boşanma, hul, zihar, lian, iddet, hidane, nafaka, ayrılık, ric'i talak, bain talak] #nikah
2/37: Süt kardeşlik. Süt ile akrabâ olanlar [süt kardeşlik, süt anne, süt baba, emzirme, süt hısımlığı, evlenme engeli, süt akrabalığı] #nikah
2/38: Nafaka nedir? Kimler verir? Kimlere verilir? Lakît, Komşu hakkı [nafaka, geçim, komşu hakkı, lakit, buluntu çocuk, nafaka borcu, aile nafakası, bakım] #nikah
2/39: İslâmiyyetde kadının kıymeti ve hakları çok büyükdür [kadın, kadın hakları, İslamda kadın, kadın değeri, hürmet, eşler arası haklar, aile] #nikah
2/40: Halâl, harâm ve şübheli şeyler. Vera' ve takvâ [helal, haram, şüpheli, vera, takva, haram listesi, helal gıda, şüpheli şeyler, haramdan kaçınma] #ahlak
2/41: Yimesi ve kullanması harâm olan şeyler [haram yiyecek, domuz, leş, kan, haram gıda, yenmesi yasak, zararlı yiyecek, yasak gıdalar] #ibadet
2/42: İçmesi harâm olan içkiler [içki, alkol, şarap, haram içecek, sarhoşluk, bira, içki yasağı, şarap hükmü, müskirat] #ibadet
2/43: Tütün, sigara içmek günâh mıdır? [sigara, tütün, sigara hükmü, sigara günah mı, tütün içmek, sağlık, keyif verici madde] #ibadet
2/44: İsrâf nedir? Tütün isrâf mıdır? Fâiz harâmdır [israf, faiz, riba, savurganlık, haram kazanç, tütün, lüks, gereksiz harcama, faiz yasağı] #muamelat
2/45: Yimek, içmek âdâbı [yemek adabı, sofra adabı, yemek yeme, besmele, duası, sağ elle yemek, yemek duaları, sofraya oturma] #ahlak
2/46: Hasta yemekleri. Ba'zı hastalıkların tedâvîsi [hasta, hastalık, tedavi, yemek, sağlık, tıp, bitkisel tedavi, perhiz, şifa] #ilim
2/47: Tevekkül. Evlilerin tevekkülü. Bekârların tevekkülü [tevekkül, Allah'a güven, sebep, çalışmak, rızık, evli tevekkülü, bekar, teslim olmak, kader] #ahlak
2/48: İrâde-i cüz'iyye. Bir ihtiyâr müslimânın kızına nasîhatı ve münâcâtı [iradei cüziyye, irade, kul iradesi, seçim, kader, nasihat, münacaat, kıza nasihat] #akaid
2/49: İrâde-i cüz'iyye. Bir ihtiyâr müslimânın kızına nasîhatı ve münâcâtı [iradei cüziyye, irade, cüzi irade, nasihat, vasıyet, müslüman nasihat, kız evlat] #akaid
2/50: Ebüssü'ûd efendinin (Kazâ-kader) risâlesi [kaza kader, Ebüssuud, risale, kader inancı, takdir, alın yazısı, levhi mahfuz, kader meselesi] #akaid
2/51: Sevgilinin her işi sevilir. Hamd, şükrden üstündür [hamd, şükür, muhabbet, sevgi, rıza, hamd ve şükür farkı, nimete hamd, Allah sevgisi] #ahlak
2/52: Tegannî, müzik. Radyoda, teybde Kur'ân-ı kerîm okumak ve dinlemek [müzik, teganni, şarkı, çalgı, müzik haram mı, radyoda Kuran, teyp, Kuran dinlemek, enstrüman] #ibadet
2/53: Cin hakkında geniş bilgi. Evliyânın rûhları [cin, cinler, ruh, evliya ruhları, görünmez varlık, cin çarpmak, cin alemi, peri, şeytan] #akaid
2/54: Rûhların hâzır olması. Allahü teâlânın sıfatları [ruh, ruhların hazır olması, tevessül, Allah sıfatları, subuti sıfatlar, zati sıfatlar, sıfat ilmi] #akaid
2/55: Allah adamlarının gönlünde zerre kadar dünyâ düşüncesi yokdur [evliya, zühd, dünya terk, kalp temizliği, manevi hal, dünya sevgisi, fena, kalp, zahid] #tasavvuf
2/56: Rûhlar insan şeklinde görünür. Tenâsüh yokdur [ruh, tenasüh, reenkarnasyon, ruhun bedene girmesi, ruh göçü, tecessüd, görünme] #akaid
2/57: İnsan medenî olmak için yaratılmışdır [insan, medeniyet, toplum, yaratılış gayesi, sosyal hayat, insanın amacı, cemaat, birlikte yaşama] #ahlak
2/58: Hârikaların, kerâmetlerin çok veyâ az olmasının sebebi [keramet, harika, evliya, veli, keramet sebebi, az keramet, çok keramet, ilahi hikmet] #tasavvuf
2/59: Seçilmişlerin ve câhillerin gaybdan îmânları [gayb, iman, ilm-i gayb, has iman, avamın imanı, keşf, müşahede, iman mertebeleri] #tasavvuf
2/60: Zâhir âlimlerinin ve tesavvufcuların ve râsih ilmli seçilmişlerin hâlleri [zahir alim, tasavvufçu, rasih ilim, ilim mertebeleri, keşf, ilim ehli, batıni ilim] #tasavvuf
2/61: Velî olmak için hârikalar ve kerâmetler lâzım değildir [velilik, keramet, evliya, veli olmak, istikamet, keramet şartı, sünnet, istikamet keramettir] #tasavvuf
2/62: Seçilmişlerin ve câhillerin gaybdan îmânları [gayb, iman, seçkin, cahil, iman farkı, iman derecesi, keşf ile iman, taklidi iman] #tasavvuf
2/63: Zâhir âlimlerinin ve tesavvufcuların hâlleri [zahir ilim, batın ilim, tasavvuf, alim, hal, makam, fıkıh ve tasavvuf] #tasavvuf
2/64: İnsanın aslı ademdir. Ademde hiç iyilik yokdur [adem, yokluk, insanın aslı, hiçlik, fena, tevazu, kibir ilacı, kulluk, acizlik] #tasavvuf
2/65: Güzel sûretlerin tatlı olmalarının sebebi nedir? [güzellik, suret, estetik, cemal, güzelliğin kaynağı, ilahi tecelli, yaratılış hikmeti] #tasavvuf
2/66: Allahü teâlâ hiçbir şeye benzemez ve akl ile anlaşılamaz [tenzih, teşbih, benzerlik, Allahın sıfatları, akıl, idrak, müşabehet, sıfatlar, Allahu teala] #akaid
2/67: Cennetde Allahü teâlânın görüleceğine inanmıyanlara cevâbdır [cennet, rüyetullah, Allahı görmek, cennet nimeti, ahiret, Mutezile, cevap, rü'yet] #akaid
2/68: Tesavvufcuların ve felsefecilerin (İlm-ül yakîn) bilgileri [tasavvuf, felsefe, ilmül yakin, aynül yakin, hakkul yakin, bilgi, yakîn, marifet] #tasavvuf
2/69: Abdüllah-i Dehlevî hazretlerinin (Mekâtib-i şerîfe) kitâbından [Abdullah Dehlevi, Mekatib, mektubat, tasavvuf, Nakşibendi, Hindistan, mektup, evliya] #tasavvuf
2/70: Akla, hayâle gelen ve keşf ile, şühûd ile anlaşılan herşey mahlûkdur [akıl, hayal, keşf, şühud, mahluk, Allahı tanıma, tenzih, idrak sınırı, marifet] #tasavvuf
2/71: İşin başı, sünnet-i seniyyeye yapışmak ve bid'atden sakınmakdır [sünnet, sünneti seniyye, bid'at, doğru yol, sünnet ehemmiyeti, sünnete yapışmak, bid'atten kaçınma] #iman
2/72: Resûlullahın kadınlarla yapdığı sözleşme [kadınlar, biat, sözleşme, kadın biatı, Resulullah, kadınlara emir, kadın hükümleri] #tarih
2/73: Abdüllah-i Dehlevî hazretlerinin (Mekâtib-i şerîfe) kitâbından [Abdullah Dehlevi, Mekatib-i şerife, tasavvuf, Nakşibendi, mektuplar, irşad] #tasavvuf
3/1: İşin başı, sünnet-i seniyyeye yapışmak ve bid'atden sakınmakdır [sünnet, bid'at, sünneti seniyye, doğru yol, bid'atten sakınma, sünnete uymak, Resulullah yolu] #iman
3/2: Resûlullahın kadınlarla yapdığı sözleşme [kadın biatı, sözleşme, biat, kadınlar, Resulullah emri, kadın vazifeleri] #tarih
3/3: Bey' ve şirâ. Halâl ve harâm satışları [alış veriş, ticaret, alım satım, helal satış, haram satış, bey ve şira, alışveriş hükümleri, kesb] #muamelat
3/4: Alış-verişde muhayyerlik [muhayyerlik, alışveriş, seçim hakkı, şart muhayyerliği, ayıp muhayyerliği, rüyet muhayyerliği] #muamelat
3/5: Bâtıl, fâsid, mekrûh satışlar. Sarraflık [batıl satış, fasid satış, mekruh satış, sarraflık, döviz, para bozma, geçersiz akit] #muamelat
3/6: Ölüm hastasının satış ve hediyye yapması [ölüm hastası, marazı mevt, hediye, vasiyet, satış, miras, hasta tasarrufu] #muamelat
3/7: Ölüm hastasının satış ve hediyye yapması [ölüm hastası, marazı mevt, hediye, vasiyet, satış, hasta hükümleri, tasarruf] #muamelat
3/8: Komşu, şüf'a ve diğer haklar üzerinde çeşidli bilgiler [komşu hakkı, şufa, ön alım hakkı, haklar, komşuluk, şefi, gayrimenkul, arsa] #muamelat
3/9: Şart ile söylenen şeyler [şart, taliki şart, şartlı akit, şartlı söz, muallak, şarta bağlı hüküm] #muamelat
3/10: Selem ile satış [selem, vadeli satış, peşin para vadeli mal, tarımsal satış, selem şartları, ileri tarihli satış] #muamelat
3/11: Karz-ı hasen, ödünç vermek. Kim ödünç isteyebilir? [karzı hasen, borç, ödünç, borç vermek, borç almak, güzel borç, faiz olmadan borç] #muamelat
3/12: Kefâlet, havâle, bono, sened kırdırmak. Poliçe [kefalet, havale, bono, senet, poliçe, kefil, borç devri, senet kırdırma, ticari evrak] #muamelat
3/13: Vekâlet. Alış-verişde, zekât vermekde vekîl tutmak [vekalet, vekil, temsilci, vekil tayin, zekat vekili, alışveriş vekili, temsil] #muamelat
3/14: Ticâretde ihsân etmek. Borc ödemek. Din kitâbları [ticaret ahlakı, ihsan, borç ödeme, din kitapları, ticaret adabı, doğruluk, güvenilirlik] #muamelat
3/15: Ticâretde dînini kayırmak. Harâmdan sakınmak [ticaret, helal kazanç, haramdan sakınma, ticaret ahlakı, ihtikar, karaborsa, dini gözetmek] #muamelat
3/16: Allahü teâlânın kullarına hizmet etmemiz lâzımdır [hizmet, insanlara hizmet, yardım, hayır, iyilik, insanlara yardım, toplum hizmeti, sosyal sorumluluk] #ahlak
3/17: İslâmiyyetde fâiz, bankalar, bono kırdırmak ve vakf [faiz, banka, riba, bono, vakıf, haram kazanç, İslam ekonomisi, banka faizi, faiz yasağı] #muamelat
3/18: Kirâ, ücret, işçilik. Sigortacılık. Emânetciye verilen para [kira, ücret, işçilik, sigorta, emanet, icare, işçi hakları, maaş, kiralama, sigorta hükmü] #muamelat
3/19: İslâmiyyetde fâiz, bankalar, bono kırdırmak ve vakf [faiz, banka faizi, riba, vakıf, İslam ekonomisi, faiz hükmü, bono kırdırma, helal finans] #muamelat
3/20: İslâmiyyetde şirket kurmak. Şirketler [şirket, ortaklık, ticari şirket, şirket kurma, müşareke, mudaraba, ortaklık hükümleri, iş ortağı] #muamelat
3/21: Kirâ, ücret, işçilik. Sigortacılık. Emânetciye verilen para [kira, ücret, işçi, sigorta, emanet, işçilik hukuku, ücret hukuku, kiralama hükmü] #muamelat
3/22: Ta'zîr cezâları, fıkh kitâblarını okumak lâzımdır [tazir, ceza, fıkıh, İslam ceza hukuku, ukubat, had cezası, tazir cezası, fıkıh kitapları] #muamelat
3/23: Ta'zîr cezâları, fıkh kitâblarını okumak lâzımdır [tazir, ceza, fıkıh, ceza hukuku, ukubat, tazir hükümleri, İslam hukuku] #muamelat
3/24: Cinâyetler, katlin çeşidleri ve cezâları. Kısâs [cinayet, katl, kısas, adam öldürme, ceza, idam, kasıt, hata, şibhi amd, cana kıyma] #muamelat
3/25: Diyet cezâları. Katl keffâreti [diyet, katl keffareti, kan bedeli, tazminat, diyet miktarı, cinayet cezası, öldürme keffareti] #muamelat
3/26: İkrâh, zorla yapdırmak. Hicr, bir şeyi yasaklamak [ikrah, zorlama, hicr, yasak, baskı, cebir, ehliyet kısıtlama, mahcur, zorlama hükmü] #muamelat
3/27: Ahkâm-ı islâmiyyesiz evliyâlık olmaz. Kelime-i tevhîd [evliyalık, velilik, şeriat, İslam hükümleri, kelimei tevhid, tasavvuf ve şeriat, hukuka uymak] #tasavvuf
3/28: Kelime-i tevhîdin ma'nâsını bildirmekdedir [kelimei tevhid, la ilahe illallah, tevhid, Allahın birliği, şehadet, iman, tevhid anlamı, şirk reddi] #akaid
3/29: Kelime-i tevhîdin üstünlüklerini bildirmekdedir [kelimei tevhid, fazilet, üstünlük, sevap, zikir, tevhid zikri, la ilahe illallah fazileti] #akaid
3/30: Fenâ ve bekâyı bildirmekdedir. Mahlûkların aslı, hakîkatleri [fena, beka, fena fillah, beka billah, mahluk, hakikat, yokluk, varlık, tasavvuf makamları] #tasavvuf
3/31: Eshâb-ı yemîn, eshâb-ı şimâl ve sâbikûn [Eshab-ı yemin, Eshab-ı şimal, sabikun, derece, mertebe, cennet ehli, cehennem ehli, makam] #akaid
3/32: Mü'minin kalbi kıymetlidir. Hiç kimsenin kalbini kırmamalıdır [kalp, kalp kırmak, gönül, mümin kalbi, kalp kıymetli, gönül yıkmak, eza, hakaret, hürmet] #ahlak
3/33: Arş ve Kürsî. Kalbin üstünlükleri [arş, kürsi, kalp, kalbin üstünlüğü, arşullah, kalbin makamı, gönül, maneviyat, ilahi sır] #tasavvuf
3/34: Bir tesavvuf mütehassısının mektûbu [tasavvuf, mektup, irşad, nasihat, tarikat, manevi yol, mürşid, mürid, seyr-i süluk] #tasavvuf
3/35: Allahü teâlânın ihâta, kurb ve ma'iyyet sıfatları [ihata, kurbiyet, maiyyet, Allahın sıfatları, yakınlık, kuşatma, birliktelik, tenzih, mekandan münezzeh] #akaid
3/36: Âlem vehm mertebesinde yaratılmışdır [alem, vehim, yaratılış, mertebeyi vehm, vücudu vehmi, mahluk, hayal, gerçeklik] #tasavvuf
3/37: Allahü teâlânın mahlûklara yakın olması. Adem. İblîs [yakınlık, Allahın yakınlığı, adem, iblis, şeytan, yaratılış, ilk insan, düşman, kurbiyet] #akaid
3/38: Nihâyet, âfâk ve enfüsün dışındadır. Evliyâ kimlere denir? [nihayet, afak, enfüs, evliya, velilik, seyr-i süluk, tasavvuf makamları, velinin tarifleri] #tasavvuf
3/39: Fenâ fillâh, vasl-ı uryânî. Ayn-ül-yakîn [fena fillah, vaslı uryani, aynül yakin, vuslat, kavuşma, tasavvuf mertebeleri, yokluk makamı] #tasavvuf
3/40: Kâ'be-i mu'azzamanın ve nemâzın kemâlâtı [Kabe, namaz, kemalat, Kabe fazileti, namazın hakikati, namazın sırları, Kabe ziyareti, ibadet sırrı] #tasavvuf
3/41: Tesavvuf yolunun başında da, sonunda da islâmiyyete uymak lâzımdır [tasavvuf, şeriat, İslam hükümleri, tasavvuf ve şeriat, başlangıç, son, istikamet, sünnet] #tasavvuf
3/42: Üçüncü cildin seksenyedinci mektûbundaki bilgileri açıklamakdadır [Mektubat, İmamı Rabbani, üçüncü cild, mektup, açıklama, tasavvuf bilgileri, Mektubatı şerif] #tasavvuf
3/43: Nemâzda olanın, Allahü teâlâya yakınlığı. Nemâzın hakîkati [namazda yakınlık, namazın hakikati, namazın sırrı, Allaha yakınlık, huşu, mirac, müminin miracı] #tasavvuf
3/44: Nihâyet, âfâk ve enfüsün dışındadır. Evliyâ kimlere denir? [nihayet, afak, enfüs, evliya tanımı, velilik, seyr-i süluk, tasavvuf makamları] #tasavvuf
3/45: Fenâ fillâh, vasl-ı uryânî. Ayn-ül-yakîn [fena fillah, vaslı uryani, aynül yakin, vuslat, tasavvuf makamları, yokluk, kavuşma] #tasavvuf
3/46: Kâ'be-i mu'azzamanın ve nemâzın kemâlâtı [Kabe, namaz, kemalat, Kabe sırları, namaz sırları, ibadet hikmeti, Beytullah] #tasavvuf
3/47: Vahdet-i vücûd bilgisi. Vücûd-i vehmî [vahdeti vücud, vücudu vehmi, birlik, varlık, İbni Arabi, Muhyiddin, tevhid, tasavvuf felsefesi] #tasavvuf
3/48: Madde, Allahü teâlâya ayna olamaz [madde, ayna, tecelli, tenzih, teşbih, Allahın zatı, panteizm reddi, madde ve ilah] #tasavvuf
3/49: Dünyâ görünüşdür. Âhıret, dünyânın aslıdır [dünya, ahiret, görünüş, asl, hakikat, fanilik, beka, geçicilik, ahiret gerçek] #tasavvuf
3/50: Tesavvuf yolunun başında da, sonunda da islâmiyyete uymak lâzımdır [tasavvuf, şeriat, istikamet, sünnet, bid'at, İslam hükümleri, doğru tasavvuf] #tasavvuf
3/51: Üçüncü cildin seksenyedinci mektûbundaki bilgileri açıklamakdadır [Mektubat, İmamı Rabbani, mektup açıklaması, tasavvuf, üçüncü cild, şerh] #tasavvuf
3/52: Nemâzda olanın, Allahü teâlâya yakınlığı. Nemâzın hakîkati [namaz, yakınlık, namazın hakikati, huşu, miraç, Allaha yakınlık, namaz sırrı] #tasavvuf
3/53: Âlemin, maddenin, zât-i ilâhîden nasîbi yokdur [alem, madde, zatı ilahi, tenzih, mahluk, yaratık, Allahın zatı, madde ve zat, panteizm] #tasavvuf
3/54: Madde üzerinde yeni bilgiler. Hüceyre, hayât, mikrop, zehr [madde, hücre, hayat, mikrop, zehir, biyoloji, bilim, tıp, canlılık, keşif] #ilim
3/55: Ölüm, ölüme hâzırlanmak. Şifâ âyetleri [ölüm, ölüme hazırlık, şifa ayetleri, sekerât, can çekme, son nefes, ölüm anı, hastalık, şifa] #cenaze
3/56: Meyyite yapılacak dînî vazîfe, kefen [cenaze, kefen, kefenleme, yıkama, cenaze yıkamak, ölüye yapılacaklar, dini vazife, techiz, tekfin] #cenaze
3/57: Resûlullahın yazdığı baş sağlığı mektûbu [başsağlığı, taziye, mektup, ölüm, sabır, cenaze, Resulullah mektubu, teselli] #cenaze
3/58: Baş sağlığı mektûbu. Meyyite yapılacak hediyyeler [başsağlığı, taziye, ölüye hediye, sevap hediyesi, isal-i sevap, ölüye dua, Kuran okuma, hayır] #cenaze
3/59: Kabr ziyâreti ve Kur'ân-ı kerîm okumak [kabir ziyareti, mezar ziyareti, Kuran okumak, ölülere dua, fatiha, kabir ziyaret adabı, sevap göndermek] #cenaze
3/60: Meyyit için iskat ve devr yapmak. Defn izni nasıl alınır? [iskat, devir, cenaze, defin, gömme, defin izni, ölü için iskat, namaz borcu, oruç borcu] #cenaze
3/61: Resûlullahın yazdığı baş sağlığı mektûbu [başsağlığı, taziye, mektup, sabır, ölüm, teselli, Resulullah, cenaze] #cenaze
3/62: Dünyâ sıkıntılarının fâidesi. Tâ'ûnun sevâbı [sıkıntı, fayda, sabır, tâun, veba, salgın, hastalık sevabı, musibet, keffaret] #ahlak
3/63: Sevgiliden gelen sıkıntılar, iyiliklerinden dahâ tatlıdır [sıkıntı, muhabbet, aşk, rıza, teslimiyet, bela, sabır, sevgi, dert, imtihan] #tasavvuf
3/64: Ferâiz bilgisi. Mîrâs alacak kimlerdir? Vasî ta'yîni [feraiz, miras, miras hukuku, varis, vasiyet, vasi, miras payı, tereike, ölen malı, mirasçı] #cenaze
3/65: Ferâiz hesâbları. Mîrâsı bölmek [feraiz hesabı, miras paylaşımı, miras bölme, hisse, pay, hesap, miras matematik, taksim] #cenaze
3/66: Kabr hayâtı ve tâ'ûndan ölmenin kıymeti [kabir hayatı, berzah, tâun, veba, şehit, salgın hastalık, kabir nimeti, ölüm, ahiret] #cenaze
3/67: Dünyâ sıkıntılarının fâidesi. Tâ'ûnun sevâbı [sıkıntı, sabır, tâun, veba, hastalık, sevap, keffaret, fayda, musibet nimeti] #ahlak
3/68: Kazâya râzı olmalıdır, hattâ lezzet duymalıdır [kazaya rıza, rıza, sabır, teslimiet, lezzet, kadere iman, takdir, kabul, hoşnutluk] #ahlak
3/69: Sevgiliden gelen sıkıntılar, iyiliklerinden dahâ tatlıdır [muhabbet, sıkıntı, aşk, rıza, bela, dert, sabır, teslimiyet, imtihan, sevgi] #tasavvuf
3/70: (Se'âdet-i Ebediyye)nin son sözü ve umûmî fihristi [Seadeti Ebediyye, fihrist, son söz, kitap sonu, özet, genel değerlendirme, kapanış, içindekiler]  #ilim`;

const SYSTEM_PROMPT = `Sen Se'âdet-i Ebediyye kitabının arama motorusun. Kullanıcının sorusuna veya arama terimine en uygun maddeleri bul.

NASIL ÇALIŞIRSIN:
1. Kullanıcının sorusunun KONUSUNU anla
2. Aşağıdaki listede her maddenin başlığına, [anahtar kelimelerine] ve #kategorisine bak
3. Soruyla EN ALAKALI maddeleri seç (max 5, daha az da olabilir)
4. Emin olmadığın maddeleri EKLEMEKTENse sadece emin olduklarını döndür

DİKKAT:
- Osmanlıca/Türkçe farkları: nemâz=namaz, oruc=oruç, gusl=gusül, kitâb=kitap, câmi=cami
- Aynı başlıklı maddeler var — ANAHTAR KELİMELERDEN ayır
- Kategori etiketleri (#namaz, #taharet, #nikah...) konuyu daraltmana yardım eder

FORMAT — SADECE bu JSON'u döndür, başka hiçbir şey yazma:
[{"k":1,"m":52,"s":"Abdest almak ve bozan şeyler"}]

k = kısım, m = madde no, s = neden bu madde (Türkçe, max 10 kelime)

MADDE LİSTESİ:
${MADDE_LISTESI}`;

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = ['https://ilmihal.org', 'https://www.ilmihal.org', 'http://localhost:8086', 'http://localhost:8084', 'http://localhost'];
  const corsOrigin = allowedOrigins.find(o => origin.startsWith(o)) ? origin : allowedOrigins[0];

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    if (!query || query.length < 3 || query.length > 500) {
      return new Response(JSON.stringify({ error: 'Invalid query' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.1,
        max_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: query }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: 'API error', detail: err }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';

    let results;
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      results = JSON.parse(cleaned);
    } catch {
      results = [];
    }

    return new Response(JSON.stringify({ results, source: 'ai' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
