const OGRENME_YOLLARI = [
  {
    id: 1,
    slug: "astronomi-matematik",
    baslik: "Astronomi ve Matematik",
    aciklama: "Gokyuzunun hesabindan cebrin dogusuna",
    icon: "\u{1F52D}",
    renk: "#818cf8",
    adimlar: [
      {
        bilginId: 568,
        konu: "Islam Astronomisinin Safagi",
        hedef: "Ebu Ma'ser el-Belhi'nin astronomi ve astrolojideki onculugunu ogren",
        quiz: {
          soru: "Ebu Ma'ser el-Belhi'nin Latince'ye cevrilen ve Avrupa'yi derinden etkileyen eseri hangisidir?",
          secenekler: ["Kitabu'l-Medhal el-Kebir (Introductorium Maius)", "Almagest Serhi", "Zic-i Sultani", "Kitabu'l-Menazir"],
          dogru: 0
        }
      },
      {
        bilginId: 906,
        konu: "Endulus'te Bilimin Yukselisi",
        hedef: "Mesleme el-Mecriti'nin Endulus'teki matematik ve astronomi okulu kurma cabasini ogren",
        quiz: {
          soru: "Mesleme el-Mecriti hangi bolgenin bilim hayatinin canlanmasinda merkezi rol oynamistir?",
          secenekler: ["Endulus (Ispanya)", "Misir", "Irak", "Iran"],
          dogru: 0
        }
      },
      {
        bilginId: 509,
        konu: "Kuresel Trigonometri",
        hedef: "Jabir ibn Aflah'in kuresel trigonometri alanindaki katkilarini ogren",
        quiz: {
          soru: "Jabir ibn Aflah'in trigonometri alanindaki en onemli katkisi nedir?",
          secenekler: ["Kuresel trigonometride Jabir teoremini gelistirmesi", "Pi sayisini hesaplamasi", "Logaritmayi bulmasi", "Cebir denklemlerini cozmesi"],
          dogru: 0
        }
      },
      {
        bilginId: 472,
        konu: "Gezegen Hareketlerinde Yeni Yaklasim",
        hedef: "Bitruci'nin Batlamyus'un episikl modeline karsi gelistirdigi alternatif sistemi ogren",
        quiz: {
          soru: "Bitruci (Alpetragius) hangi konuda Batlamyus'a karsi cikarak yeni bir model onerdi?",
          secenekler: ["Gezegen hareket modeli", "Ay'in buyuklugu", "Gunes tutulmasi", "Yildiz kataloglama"],
          dogru: 0
        }
      },
      {
        bilginId: 1006,
        konu: "Hassas Astronomi Aletleri",
        hedef: "Zerkali'nin usturlap ve astronomi aletlerindeki devrimci katkilarini ogren",
        quiz: {
          soru: "Zerkali (Arzachel) hangi aleti gelistirerek astronomi olcumlerinde devrim yapmistir?",
          secenekler: ["Evrensel usturlap (Safihatu'z-Zerkale)", "Teleskop", "Pusula", "Gunes saati"],
          dogru: 0
        }
      },
      {
        bilginId: 929,
        konu: "Trigonometrik Tablolar",
        hedef: "Muhyiddin el-Magibi'nin trigonometri ve astronomi tablolarina katkilarini ogren",
        quiz: {
          soru: "Muhyiddin el-Magibi hangi gozlemevinde calisarak onemli astronomi tablolari hazirladi?",
          secenekler: ["Meraga Gozlemevi", "Istanbul Gozlemevi", "Semerkant Gozlemevi", "Kahire Gozlemevi"],
          dogru: 0
        }
      },
      {
        bilginId: 987,
        konu: "Namaz Vakitleri ve Matematik",
        hedef: "Semseddin el-Halili'nin namaz vakitlerini hesaplamak icin gelistirdigi matematiksel tablolari ogren",
        quiz: {
          soru: "Semseddin el-Halili ne amacla kapsamli matematiksel tablolar hazirladi?",
          secenekler: ["Namaz vakitlerinin ve kiblenin hassas hesaplanmasi", "Gemi rotalarinin belirlenmesi", "Takvim reformu", "Vergi hesaplari"],
          dogru: 0
        }
      },
      {
        bilginId: 805,
        konu: "Gezegen Teorisinde Devrim",
        hedef: "Ibn Satir'in Batlamyus modelini duzeltmesini ve Kopernik'e etkisini ogren",
        quiz: {
          soru: "Ibn Satir'in gezegen modeli ile hangi Avrupali astronomun modeli arasinda dikkat cekici benzerlikler vardir?",
          secenekler: ["Kopernik", "Galileo", "Kepler", "Newton"],
          dogru: 0
        }
      },
      {
        bilginId: 858,
        konu: "Semerkant Matematik Okulu",
        hedef: "Kadizade-i Rumi'nin Semerkant'ta matematik ve astronomi egitimindeki rolunu ogren",
        quiz: {
          soru: "Kadizade-i Rumi hangi buyuk gozlemevinin kurulmasinda bilimsel danismanlik yapmistir?",
          secenekler: ["Ulug Bey Gozlemevi (Semerkant)", "Meraga Gozlemevi", "Istanbul Gozlemevi", "Kahire Gozlemevi"],
          dogru: 0
        }
      },
      {
        bilginId: 998,
        konu: "Yildiz Katalogu ve Gozlemevi",
        hedef: "Ulug Bey'in dunyanin en buyuk gozlemevini kurup yildiz katalogunu hazirlamasini ogren",
        quiz: {
          soru: "Ulug Bey'in Zic-i Sultani adli eserinde kac yildizin koordinatlari kayitlidir?",
          secenekler: ["Yaklasik 1018 yildiz", "Yaklasik 500 yildiz", "Yaklasik 200 yildiz", "Yaklasik 2000 yildiz"],
          dogru: 0
        }
      },
      {
        bilginId: 459,
        konu: "Matematiksel Astronomi",
        hedef: "Ali Kuscu'nun matematik ve astronomideki ozgun katkilarini ogren",
        quiz: {
          soru: "Ali Kuscu hangi konuda onemli bir risale yazarak Dunyanin hareketini tartismistir?",
          secenekler: ["Dunyanin donmesi meselesi (Hall-i Eshkal-i Kamer)", "Gunes lekeleri", "Gunes merkezli sistem", "Gezegen halkalari"],
          dogru: 0
        }
      },
      {
        bilginId: 991,
        konu: "Istanbul Gozlemevi",
        hedef: "Takiyyuddin'in Istanbul Gozlemevi'ni kurup modern astronomi aletleri gelistirmesini ogren",
        quiz: {
          soru: "Takiyyuddin'in 1577'de Istanbul'da kurdugu gozlemevi hangi padisahin destegiyle insa edilmistir?",
          secenekler: ["Sultan III. Murad", "Kanuni Sultan Suleyman", "Fatih Sultan Mehmed", "Sultan II. Selim"],
          dogru: 0
        }
      }
    ]
  },
  {
    id: 2,
    slug: "tip-saglik",
    baslik: "Tip ve Saglik Bilimleri",
    aciklama: "Cerrahiden eczaciliga, Islam tip geleneginin yolculugu",
    icon: "\u{1FA7A}",
    renk: "#34d399",
    adimlar: [
      {
        bilginId: 657,
        konu: "Kimya ve Tibin Bulusmasi",
        hedef: "Halid b. Yezid'in tibba kimyasal yaklasimi ve tercume hareketindeki rolunu ogren",
        quiz: {
          soru: "Halid b. Yezid Islam dunyasinda hangi hareketin oncusu kabul edilir?",
          secenekler: ["Yunanca-Arapca tercume hareketi", "Gozlemevi kurma hareketi", "Matbaacillik", "Denizcilik"],
          dogru: 0
        }
      },
      {
        bilginId: 715,
        konu: "Bulaski Hastaliklar ve Eczacilik",
        hedef: "Ibn Cezzar'in bulaski hastaliklar ve ilac bilimi uzerine calismalari ogren",
        quiz: {
          soru: "Ibn Cezzar'in Avrupa'da 'Viaticum' adiyla bilinen unlu eseri hangisidir?",
          secenekler: ["Zadu'l-Musafir (Yolcunun Azigi)", "El-Kanun fi't-Tib", "Kitabu'l-Havi", "Kitabu't-Tasrif"],
          dogru: 0
        }
      },
      {
        bilginId: 630,
        konu: "Tibbi Botanik",
        hedef: "Gafiki'nin tibbi bitkileri resimleriyle tanimlama calismasini ogren",
        quiz: {
          soru: "Gafiki hangi alanda Islam bilim tarihinde one cikmistir?",
          secenekler: ["Tibbi bitkiler ve eczacilik (Materia Medica)", "Cerrahi aletler", "Goz hastaliklari", "Anatomi"],
          dogru: 0
        }
      },
      {
        bilginId: 1002,
        konu: "Cerrahinin Babasi",
        hedef: "Zehravi'nin cerrahi aletler ve cerrahi tekniklerdeki devrimci katkilarini ogren",
        quiz: {
          soru: "Zehravi'nin (Abulcasis) 'Kitabu't-Tasrif' adli eserinde kac cerrahi alet tarif edilmistir?",
          secenekler: ["200'den fazla cerrahi alet", "50 cerrahi alet", "20 cerrahi alet", "500 cerrahi alet"],
          dogru: 0
        }
      },
      {
        bilginId: 820,
        konu: "Klinik Tip ve Deneysellik",
        hedef: "Ibn Zuhr'un klinik gozleme dayali tip anlayisini ve cerrahi katkilarini ogren",
        quiz: {
          soru: "Ibn Zuhr (Avenzoar) tipta hangi yontemi on plana cikarmistir?",
          secenekler: ["Klinik gozlem ve deneysel tip", "Astrolojiye dayali teshis", "Yalnizca bitkisel tedavi", "Sadece kitabi bilgi"],
          dogru: 0
        }
      },
      {
        bilginId: 573,
        konu: "Anatomi ve Gozlem",
        hedef: "Abdullatif el-Bagdadi'nin anatomi ve tibbi gozlem alanindaki katkilarini ogren",
        quiz: {
          soru: "Abdullatif el-Bagdadi hangi konuda Galen'in goruslerini duzelterek tibbi gozlemin onemini gostermistir?",
          secenekler: ["Alt cene kemiginin yapisi (tek kemik oldugu)", "Kalbin yapisi", "Akciger fonksiyonu", "Beyin anatomisi"],
          dogru: 0
        }
      },
      {
        bilginId: 785,
        konu: "Kucuk Kan Dolasiminin Kesfi",
        hedef: "Ibnu'n-Nefis'in akciger kan dolasimini kesfetmesini ogren",
        quiz: {
          soru: "Ibnu'n-Nefis'in kesfettigi kucuk (pulmoner) kan dolasimi hangi organlari kapsar?",
          secenekler: ["Kalp ve akciger arasi kan dolasimi", "Beyin ve kalp arasi", "Karaciger ve bobrek arasi", "Mide ve bagirsak arasi"],
          dogru: 0
        }
      },
      {
        bilginId: 739,
        konu: "Veba ve Bulaski Hastalik Teorisi",
        hedef: "Ibn Hatime'nin vebanin bulasma yollarini arastirmasini ogren",
        quiz: {
          soru: "Ibn Hatime 1348 veba salgini sirasinda hangi onemli tibbi tespiti yapmistir?",
          secenekler: ["Hastalikarin bulasici oldugu ve temas yoluyla yayildigi", "Vebanin hava kirliligindan kaynaklandigi", "Vebanin yalnizca hayvanlari etkiledigi", "Hastalikarin yildiz konumlarindan kaynaklandigi"],
          dogru: 0
        }
      },
      {
        bilginId: 649,
        konu: "Anadolu'da Tip Gelenegi",
        hedef: "Haci Pasa'nin Anadolu'daki tibbi calismalari ve Turkce tip eserlerini ogren",
        quiz: {
          soru: "Haci Pasa (Celaluddin Hizir) hangi ozelligiyle Anadolu tip tarihinde onemli bir yer tutar?",
          secenekler: ["Turkce tip kitabi yazan ilk hekimlerden olmasi", "Ilk gozlemevi kurmasi", "Matbaayi Anadolu'ya getirmesi", "Ilk eczaneyi acmasi"],
          dogru: 0
        }
      },
      {
        bilginId: 441,
        konu: "Hekimlik ve Maneviyat",
        hedef: "Aksemseddin'in tip ve mikrobiyoloji alanindaki ongoruleri ogren",
        quiz: {
          soru: "Aksemseddin 'Maddet-ul Hayat' adli eserinde hangi onemli gorusu ileri surmistur?",
          secenekler: ["Hastaliklarin gozle gorunmeyen tohumcuklardan (mikroplardan) kaynaklandigi", "Tum hastaliklarin soguktan geldigi", "Hastaliklarin yalnizca kan bozuklugundan olustugu", "Her hastalik icin tek bir ilac bulundugu"],
          dogru: 0
        }
      },
      {
        bilginId: 542,
        konu: "Eczacilik Ansiklopedisi",
        hedef: "Davud el-Antaki'nin kapsamli eczacilik ve tip ansiklopedisini ogren",
        quiz: {
          soru: "Davud el-Antaki'nin 'Tezkiretu Uli'l-Elbab' adli eseri hangi alani kapsamli olarak ele alir?",
          secenekler: ["Eczacilik, bitkiler ve dogal ilaclar", "Astronomi ve matematik", "Felsefe ve mantik", "Cografya ve seyahat"],
          dogru: 0
        }
      },
      {
        bilginId: 933,
        konu: "Osmanli'da Modern Tip",
        hedef: "Mustafa Behcet Efendi'nin Osmanli'da modern tibbi kurumsallastirma cabasini ogren",
        quiz: {
          soru: "Mustafa Behcet Efendi Osmanli'da hangi onemli tibbi kurumun acilmasina onculluk etmistir?",
          secenekler: ["Tibbiye Mektebi (Tibbhane-i Amire)", "Darulfunun", "Dar-ul Hadis", "Suleymaniye Kutuphanesi"],
          dogru: 0
        }
      }
    ]
  },
  {
    id: 3,
    slug: "fizik-optik-kimya",
    baslik: "Fizik, Optik ve Kimya",
    aciklama: "Isik teorisinden kimyanin dogusuna",
    icon: "\u{1F52C}",
    renk: "#f472b6",
    adimlar: [
      {
        bilginId: 885,
        konu: "Islam Felsefe ve Biliminin Oncusu",
        hedef: "Kindi'nin optik, fizik ve felsefe alanlarindaki kurucu katkilarini ogren",
        quiz: {
          soru: "Kindi 'De Aspectibus' adli optik eserinde isik icin hangi teoriyi savunmustur?",
          secenekler: ["Isik isinlarinin duz cizgiler halinde yayildigi", "Isigin gozden ciktigi (goz isini teorisi)", "Isigin dairesel yayildigi", "Isigin yalnizca Gunes'ten geldigi"],
          dogru: 0
        }
      },
      {
        bilginId: 752,
        konu: "Optigin Babasi",
        hedef: "Ibnu'l-Heysem'in Kitabu'l-Menazir eseriyle optik bilimine devrim yapmasini ogren",
        quiz: {
          soru: "Ibnu'l-Heysem (Alhazen) gorme olayini nasil aciklamistir?",
          secenekler: ["Cisimlerden yansiyip gelen isigin goze girmesiyle (intromission)", "Gozden cikan isinlarla (emission/extramission)", "Isigin ruhani bir olay oldugunu savunarak", "Gorme olayini aciklamamistir"],
          dogru: 0
        }
      },
      {
        bilginId: 623,
        konu: "Gokkusagi Teorisi",
        hedef: "Kemaleddin Farisi'nin isigin kirilmasi ve gokkusagi olusumunu aciklamasini ogren",
        quiz: {
          soru: "Kemaleddin el-Farisi gokkusaginin olusumunu aciklamak icin hangi yontemi kullanmistir?",
          secenekler: ["Cam kure (su dolu kure) ile isik kirilma deneyleri", "Yalnizca gozle gozlem", "Matematiksel modelleme", "Astrolojik hesaplamalar"],
          dogru: 0
        }
      },
      {
        bilginId: 891,
        konu: "Optik ve Astronomi Sentezi",
        hedef: "Kutbuddin Sirazi'nin isigin kirilmasi ve gokkusagi uzerindeki calismasini ogren",
        quiz: {
          soru: "Kutbuddin Sirazi hangi gozlemevinde calismis ve onemli astronomi eserleri vermistir?",
          secenekler: ["Meraga Gozlemevi", "Istanbul Gozlemevi", "Semerkant Gozlemevi", "Bagdat Gozlemevi"],
          dogru: 0
        }
      },
      {
        bilginId: 657,
        konu: "Kimyanin Ilk Adimlari",
        hedef: "Halid b. Yezid'in kimya (simya) alanindaki tercume ve arastirmalarini ogren",
        quiz: {
          soru: "Halid b. Yezid kimya tarihinde hangi ozelligiyle tanimlanir?",
          secenekler: ["Islam dunyasinda kimya/simya calismalarinin ilk hamisi olmasi", "Periyodik tabloyu olusturmasi", "Atom teorisini gelistirmesi", "Ilac kimyasini kurmasi"],
          dogru: 0
        }
      },
      {
        bilginId: 683,
        konu: "Simyadan Kimyaya Gecis",
        hedef: "Iraki es-Semavi'nin kimya ve simya alanindaki deneysel calismalarini ogren",
        quiz: {
          soru: "Iraki es-Semavi hangi alanda eserler vermistir?",
          secenekler: ["Simya ve kimyasal donusum arastirmalari", "Gunes enerjisi", "Maden muhendisligi", "Deniz bilimleri"],
          dogru: 0
        }
      },
      {
        bilginId: 842,
        konu: "Modern Bilimlerin Osmanli'ya Aktarimi",
        hedef: "Hoca Ishak Efendi'nin Bati bilimlerini Osmanli'ya aktarma cabasini ogren",
        quiz: {
          soru: "Hoca Ishak Efendi'nin dort ciltlik 'Mecmua-i Ulum-i Riyaziye' eseri hangi konulari kapsar?",
          secenekler: ["Fizik, kimya, matematik ve muhendislik", "Yalnizca astronomi", "Yalnizca tip", "Yalnizca cografya"],
          dogru: 0
        }
      },
      {
        bilginId: 906,
        konu: "Endulus'te Kimya",
        hedef: "Mesleme el-Mecriti'nin kimya ve dogal bilimler alanindaki katkilarini ogren",
        quiz: {
          soru: "Mesleme el-Mecriti'ye atfedilen 'Rutbetul-Hakim' adli eser hangi alanla ilgilidir?",
          secenekler: ["Kimya ve simya", "Astronomi", "Tip", "Felsefe"],
          dogru: 0
        }
      },
      {
        bilginId: 568,
        konu: "Doga Felsefesi ve Kozmoloji",
        hedef: "Ebu Ma'ser'in doga felsefesi ve fiziksel dunyanin isleyisine dair goruslerini ogren",
        quiz: {
          soru: "Ebu Ma'ser el-Belhi'nin kozmoloji anlayisinda hangi kavram merkezi bir rol oynar?",
          secenekler: ["Gok cisimlerinin yeryuzunu etkilemesi (tabii felsefe)", "Atomculuk", "Bos uzay teorisi", "Mekanik fizik"],
          dogru: 0
        }
      },
      {
        bilginId: 610,
        konu: "Tabiat Bilimleri ve Kelam",
        hedef: "Fahreddin Razi'nin tabiat felsefesi ve fizik konularindaki elestirel yaklasimini ogren",
        quiz: {
          soru: "Fahreddin Razi hangi konuda antik Yunan filozoflarina karsi elestirel bir tutum sergilemistir?",
          secenekler: ["Atomculuk, bosluk ve hareket kavramlari", "Gezegen yildiz sayilari", "Bitki siniflandirmasi", "Deniz akintilari"],
          dogru: 0
        }
      }
    ]
  },
  {
    id: 4,
    slug: "cografya-kesif",
    baslik: "Cografya ve Kesif",
    aciklama: "Dunya haritalarindan okyanusların kesiflerine",
    icon: "\u{1F30D}",
    renk: "#fb923c",
    adimlar: [
      {
        bilginId: 845,
        konu: "Islam Cografyaciligin Temelleri",
        hedef: "Istahri'nin Islam dunyasinin bolgesel cografyasini sistematik olarak haritalandirmasini ogren",
        quiz: {
          soru: "Istahri'nin cografya eserlerinin en belirgin ozelligi nedir?",
          secenekler: ["Islam ulkelerini bolge bolge renkli haritalarla tanimlamasi", "Yalnizca deniz yollarini haritalamasi", "Sadece daglari siniflandirmasi", "Yalnizca sehir planlari cizmesi"],
          dogru: 0
        }
      },
      {
        bilginId: 743,
        konu: "Ticaret Yollari ve Cografya",
        hedef: "Ibn Havkal'in uzun seyahatlere dayanan cografi eserlerini ogren",
        quiz: {
          soru: "Ibn Havkal 'Suretul-Arz' adli eserinde ozellikle neyi tanimlamistir?",
          secenekler: ["Islam dunyasinin ticaret yollarini ve sehirlerini", "Yalnizca Avrupa cografyasini", "Okyanus akimilarini", "Yildiz haritalarini"],
          dogru: 0
        }
      },
      {
        bilginId: 485,
        konu: "Kuzey Afrika ve Endulus Cografyasi",
        hedef: "Bekri'nin Kuzey Afrika ve Endulus bolgesinin cografyasina dair ansiklopedik eserini ogren",
        quiz: {
          soru: "Ebu Ubeyd el-Bekri'nin 'el-Mesalik ve'l-Memalik' eserinin ozelligi nedir?",
          secenekler: ["Seyahat etmeden kaynaklardan derlenen kapsamli cografi ansiklopedi olmasi", "Deniz haritasi olmasi", "Yalnizca iklim bilgisi vermesi", "Sadece bitki ortusu tanimlamasi"],
          dogru: 0
        }
      },
      {
        bilginId: 834,
        konu: "Dunyanin En Buyuk Ortacag Haritasi",
        hedef: "Idrisi'nin Sicilya Krali Roger II icin hazirladigi dunya haritasini ogren",
        quiz: {
          soru: "Idrisi'nin 'Tabula Rogeriana' (Nuzhetul-Mustak) haritasi ne icin hazirlanmistir?",
          secenekler: ["Sicilya Krali II. Roger'in emriyle dunya cografyasini derlemek", "Osmanli padisahinin emriyle", "Bir deniz seferini planlamak", "Mekke'nin konumunu belirlemek"],
          dogru: 0
        }
      },
      {
        bilginId: 558,
        konu: "Seyahat ve Acayip Haberler",
        hedef: "Girnati'nin seyahatlerinde kaydetigi ilginc cografi ve kulturel bilgileri ogren",
        quiz: {
          soru: "Ebu Hamid el-Girnati hangi tur eserlerle tanimlanir?",
          secenekler: ["Seyahat ve acayip haberler (Tuhfetul-Elbab)", "Astronomi tablolari", "Tip ansiklopedileri", "Matematik risaleleri"],
          dogru: 0
        }
      },
      {
        bilginId: 877,
        konu: "Kozmografya ve Doga Harikaları",
        hedef: "Kazvini'nin dogal dunyanin harikalarini derleyen ansiklopedik eserini ogren",
        quiz: {
          soru: "Kazvini'nin 'Acaibu'l-Mahlukat' adli eseri hangi konulari kapsar?",
          secenekler: ["Doga harikaları, cografi bilgiler ve canli turlerinin tanimlamalari", "Yalnizca matematik", "Sadece astronomi", "Yalnizca tarih"],
          dogru: 0
        }
      },
      {
        bilginId: 702,
        konu: "Dunyanin En Buyuk Seyyahi",
        hedef: "Ibn Battuta'nin 30 yillik seyahatinde ziyaret ettigi ulkeleri ve gozlemlerini ogren",
        quiz: {
          soru: "Ibn Battuta yaklasik kac yil seyahat etmis ve kac kilometre yol katetmistir?",
          secenekler: ["Yaklasik 30 yil ve 120.000 km", "10 yil ve 20.000 km", "5 yil ve 5.000 km", "50 yil ve 200.000 km"],
          dogru: 0
        }
      },
      {
        bilginId: 956,
        konu: "Osmanli Denizciligi ve Haritacilik",
        hedef: "Piri Reis'in dunya haritasini ve denizcilik kitabini ogren",
        quiz: {
          soru: "Piri Reis'in 1513 tarihli dunya haritasinin en sasirtici ozelligi nedir?",
          secenekler: ["Guney Amerika kiyilarini sasirtici bir dogrulukla gostermesi", "Avustralya'yi gostermesi", "Kutuplari ayrintili cizmesi", "Tum okyanuslarin derinligini gostermesi"],
          dogru: 0
        }
      },
      {
        bilginId: 762,
        konu: "Hint Okyanusu'nun Kutbu",
        hedef: "Ahmed b. Macid'in denizcilik ve navigasyon alanindaki eserlerini ogren",
        quiz: {
          soru: "Ahmed b. Macid hangi ozelligiyle 'Hint Okyanusu'nun Aslani' olarak anilir?",
          secenekler: ["Hint Okyanusu navigasyonu ve denizcilik kilavuzlari yazmasi", "Hint Okyanusu'nu yuzmeyle gecmesi", "Orada bir ada kesfetmesi", "Denizaltı icat etmesi"],
          dogru: 0
        }
      },
      {
        bilginId: 607,
        konu: "10 Ciltlik Seyahat Ansiklopedisi",
        hedef: "Evliya Celebi'nin 'Seyahatname' eserinin kapsami ve onemini ogren",
        quiz: {
          soru: "Evliya Celebi'nin 10 ciltlik Seyahatname'sinde hangi cografi alan tanimlanmistir?",
          secenekler: ["Osmanli cografyasi basla olmak uzere Avrupa, Asya ve Afrika", "Yalnizca Istanbul", "Sadece Anadolu", "Yalnizca Arap yarimadasi"],
          dogru: 0
        }
      }
    ]
  },
  {
    id: 5,
    slug: "felsefe-kelam",
    baslik: "Felsefe ve Kelam",
    aciklama: "Akil ve imanin buyuk sentezi",
    icon: "\u{1F4DC}",
    renk: "#a78bfa",
    adimlar: [
      {
        bilginId: 885,
        konu: "Islam Felsefesinin Babasi",
        hedef: "Kindi'nin Islam dunyasinda felsefi dusuncenin temellerini atmasini ogren",
        quiz: {
          soru: "Kindi Islam dusunce tarihinde hangi unvanla anilir?",
          secenekler: ["Filozoflarin Ilki (Failasuf-ul Arab)", "Ikinci Muallim", "Huccetul-Islam", "Seyhu'r-Reis"],
          dogru: 0
        }
      },
      {
        bilginId: 696,
        konu: "Bireysel Akil ve Ozgurluk",
        hedef: "Ibn Bacce'nin insan aklinin tekamulu hakkindaki felsefesini ogren",
        quiz: {
          soru: "Ibn Bacce (Avempace) 'Tedbiru'l-Mutavahhid' eserinde hangi kavramdan bahseder?",
          secenekler: ["Yalniz insanin (mutavahhid) akil ile kemale ermesi", "Devlet yonetimi", "Askeri strateji", "Ekonomik kalkinma"],
          dogru: 0
        }
      },
      {
        bilginId: 810,
        konu: "Felsefe Romani",
        hedef: "Ibn Tufeyl'in 'Hayy bin Yakzan' eserinin felsefi mesajini ogren",
        quiz: {
          soru: "Ibn Tufeyl'in 'Hayy bin Yakzan' adli eserinin ana temasi nedir?",
          secenekler: ["Insanin tek basina akil yoluyla hakikate ulasabilecegi", "Deniz seyahati macerasi", "Savas ve baris", "Ticaret ve zenginlik"],
          dogru: 0
        }
      },
      {
        bilginId: 790,
        konu: "Akil ve Vahiy Uyumu",
        hedef: "Ibn Rusd'un akil-iman iliskisine dair goruslerini ve Avrupa'ya etkisini ogren",
        quiz: {
          soru: "Ibn Rusd (Averroes) Avrupa'da en cok hangi filozofun eserlerine yazdigi serhlerle taninir?",
          secenekler: ["Aristoteles", "Platon", "Sokrates", "Epikuros"],
          dogru: 0
        }
      },
      {
        bilginId: 610,
        konu: "Kelam ve Felsefe Elestirisi",
        hedef: "Fahreddin Razi'nin kelam ve felsefe arasindaki elestirel yaklasiminini ogren",
        quiz: {
          soru: "Fahreddin Razi'nin 'el-Mebahis el-Mesrikiyye' eseri hangi konulari kapsar?",
          secenekler: ["Metafizik, tabiat felsefesi ve mantik", "Yalnizca tip", "Sadece astronomi", "Yalnizca tarih"],
          dogru: 0
        }
      },
      {
        bilginId: 687,
        konu: "Tasavvuf ve Varlik Felsefesi",
        hedef: "Muhyiddin Ibn Arabi'nin vahdet-i vucud dusuncesini ogren",
        quiz: {
          soru: "Muhyiddin Ibn Arabi'nin en meshur eseri hangisidir?",
          secenekler: ["el-Futuhat el-Mekkiyye", "Ihya-u Ulumi'd-Din", "el-Mukaddime", "Tehafutut-Tehafut"],
          dogru: 0
        }
      },
      {
        bilginId: 746,
        konu: "Zahiri Dusunce",
        hedef: "Ibn Hazm'in zahiri fikih ve felsefe yaklasimini ogren",
        quiz: {
          soru: "Ibn Hazm hangi fikih mezhebiyle ozdeslestirilir?",
          secenekler: ["Zahiri mezhebi", "Hanefi mezhebi", "Maliki mezhebi", "Hanbeli mezhebi"],
          dogru: 0
        }
      },
      {
        bilginId: 848,
        konu: "Kelam Ilminin Sistematigi",
        hedef: "Adududdin Ici'nin kelam ilmini sistematik bir sekilde derlemesini ogren",
        quiz: {
          soru: "Adududdin el-Ici'nin kelam ilmindeki en onemli eseri hangisidir?",
          secenekler: ["el-Mevakif fi Ilmi'l-Kelam", "el-Muhassal", "Serhu'l-Akaid", "el-Milel ve'n-Nihal"],
          dogru: 0
        }
      },
      {
        bilginId: 978,
        konu: "Kelam ve Mantik Ustaligi",
        hedef: "Seyyid Serif Curcani'nin kelam, mantik ve dil bilimlerindeki sentezini ogren",
        quiz: {
          soru: "Seyyid Serif Curcani'nin 'et-Ta'rifat' adli eseri hangi alanda bir referans kaynaktir?",
          secenekler: ["Ilmi terimlerin tarifleri (terminoloji sozlugu)", "Tarih ansiklopedisi", "Cografi sozluk", "Tibbi terimlerin sozlugu"],
          dogru: 0
        }
      },
      {
        bilginId: 546,
        konu: "Tasavvuf ve Felsefe Sentezi",
        hedef: "Davud el-Kayseri'nin Ibn Arabi dusuncesini sistematiklestirmesini ogren",
        quiz: {
          soru: "Davud el-Kayseri Osmanli'da hangi egitim kurumunun ilk muderrisi olmustur?",
          secenekler: ["Iznik Medresesi (ilk Osmanli medresesi)", "Suleymaniye Medresesi", "Fatih Medresesi", "Sahn-i Seman Medresesi"],
          dogru: 0
        }
      }
    ]
  },
  {
    id: 6,
    slug: "muhendislik-mimarlik",
    baslik: "Muhendislik ve Mimarlik",
    aciklama: "Ucus denemelerinden mimari saheserlerine",
    icon: "\u{1F3D7}\uFE0F",
    renk: "#fbbf24",
    adimlar: [
      {
        bilginId: 728,
        konu: "Ilk Ucus Denemesi",
        hedef: "Abbas Ibn Firnas'in tarihte ilk kontrollü ucus denemesini ogren",
        quiz: {
          soru: "Abbas Ibn Firnas 9. yuzyilda Kurtuba'da hangi tarihi basariyi gerceklestirmistir?",
          secenekler: ["Kanatlarla kontrollü bir ucus denemesi yapmasi", "Ilk denizaltini yapmasi", "Ilk matbaayi kurmasi", "Ilk koproyu insa etmesi"],
          dogru: 0
        }
      },
      {
        bilginId: 670,
        konu: "Istanbul Bogazi Uzerinde Ucus",
        hedef: "Hezarfen Ahmed Celebi'nin kanat ile ucus hikayesini ogren",
        quiz: {
          soru: "Hezarfen Ahmed Celebi 17. yuzyilda nereden ucarak Istanbul Bogazi'ni gecmistir?",
          secenekler: ["Galata Kulesi'nden Uskudar'a", "Topkapi Sarayi'ndan Beyoglu'na", "Ayasofya'dan Sultanahmet'e", "Kiz Kulesi'nden Eminonu'ne"],
          dogru: 0
        }
      },
      {
        bilginId: 897,
        konu: "Roket ile Yukselen Adam",
        hedef: "Lagari Hasan Celebi'nin barutlu roketle yukselen ilk insan olma hikayesini ogren",
        quiz: {
          soru: "Lagari Hasan Celebi hangi tarihsel olayin kutlamalari sirasinda roketle yukselmistir?",
          secenekler: ["Sultan IV. Murad'in kizinin dogumu", "Istanbul'un fethi", "Kanuni'nin tahta cikisi", "Viyana kusatmasi"],
          dogru: 0
        }
      },
      {
        bilginId: 1002,
        konu: "Cerrahi Alet Muhendisligi",
        hedef: "Zehravi'nin 200'den fazla cerrahi aleti tasarlayip muhendislik acisindan tanimlamasini ogren",
        quiz: {
          soru: "Zehravi'nin tasarladigi cerrahi aletler hangi eserde resimli olarak tanimlanmistir?",
          secenekler: ["Kitabu't-Tasrif'in 30. bolumu", "El-Kanun fi't-Tib", "Kitabu'l-Menazir", "Kitabu'l-Havi"],
          dogru: 0
        }
      },
      {
        bilginId: 805,
        konu: "Mekanik Saat ve Astronomi Aletleri",
        hedef: "Ibn Satir'in tasarladigi hassas astronomi aletleri ve mekanik saatleri ogren",
        quiz: {
          soru: "Ibn Satir'in Emeviye Camii'ne yerlestirdigi alet nedir?",
          secenekler: ["Gunes saati (basit gunes saati)", "Teleskop", "Pusula", "Su saati"],
          dogru: 0
        }
      },
      {
        bilginId: 916,
        konu: "Osmanli Mimari Geleneginin Surduruculugu",
        hedef: "Mimar Davud Aga'nin Sultanahmet Camii'nin temellerini atan mimari mirasini ogren",
        quiz: {
          soru: "Mimar Davud Aga hangi onemli mimari yapinin mimarliginii ustlenmistir?",
          secenekler: ["Yeni Valide Camii'nin baslangici ve bircok Osmanli yapisi", "Selimiye Camii", "Suleymaniye Camii", "Topkapi Sarayi"],
          dogru: 0
        }
      },
      {
        bilginId: 922,
        konu: "Mimarlığin Zirvesi",
        hedef: "Mimar Sinan'in Osmanli mimarisine kazandirdigi saheserleri ve muhendislik dehasini ogren",
        quiz: {
          soru: "Mimar Sinan'in 'kalfaligin eseri' olarak tanimladigi camii hangisidir?",
          secenekler: ["Suleymaniye Camii", "Selimiye Camii", "Sehzadebasi Camii", "Mihrimah Sultan Camii"],
          dogru: 0
        }
      },
      {
        bilginId: 829,
        konu: "Osmanli'da Matbaacilik Devrimi",
        hedef: "Ibrahim Muteferrika'nin Osmanli'da ilk matbaayi kurup kitap basmasini ogren",
        quiz: {
          soru: "Ibrahim Muteferrika Osmanli'da ilk basilan kitabi hangi yilda yayinlamistir?",
          secenekler: ["1729", "1453", "1600", "1800"],
          dogru: 0
        }
      },
      {
        bilginId: 991,
        konu: "Mekanik Saatler ve Gozlem Aletleri",
        hedef: "Takiyyuddin'in otomatik makineler ve mekanik saatler alanindaki muhendislik basarilarini ogren",
        quiz: {
          soru: "Takiyyuddin'in 'el-Turuku's-Seniyye fi'l-Alati'r-Ruhaniyye' eseri hangi konudadir?",
          secenekler: ["Mekanik saatler ve otomatik makineler", "Denizcilik", "Tip", "Astronomi tablolari"],
          dogru: 0
        }
      },
      {
        bilginId: 871,
        konu: "Bilgi Ansiklopedisti",
        hedef: "Katip Celebi'nin bilim ve cografya ansiklopedilerindeki sistematik yaklasimini ogren",
        quiz: {
          soru: "Katip Celebi'nin 'Kesfuz-Zunun' adli eseri neyi derlemistir?",
          secenekler: ["Islam dunyasindaki kitaplarin ve ilimlerin bibliyografyasi", "Sehirlerin cografyasi", "Tibbi bitkilerin listesi", "Cerrahi alet kataloglari"],
          dogru: 0
        }
      }
    ]
  }
];
