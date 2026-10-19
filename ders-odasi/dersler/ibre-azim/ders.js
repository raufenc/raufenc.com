/* İbremetre · Azim — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Tesvîf · Azim · Telaş). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-azim",
 "ad": "Azim: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "caba",
 "muzik": "caba",
 "yas": "10-15 yaş",
 "ozet": "Birçok güzel huy bir ibre gibidir: çok az olunca eksiklik, çok fazla olunca taşkınlık. Sesli, animasyonlu açılış; ibreyi sürükleyerek tahmin; merak ettiğin kapıyı aç; “Sen olsan?” senaryolarıyla 8 dakikalık ders.",
 "kapakGorseli": "kapak.svg",
 "basariEsigi": 0.6,
 "bolumler": [
  {
   "id": "ibre",
   "ad": "İbremetre",
   "renk": "#17998A",
   "bloklar": [
    {
     "id": "acilis",
     "tur": "ibreAcilis",
     "huy": "Azim",
     "huyAnahtar": "Azim",
     "olculen": "İşe girişme biçimim",
     "kanca": "Bugün değil, yarın başlarım.",
     "uclar": {
      "az": "Tesvîf",
      "orta": "Azim",
      "fazla": "Telaş"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Azim",
     "cumle": "Bugün değil, yarın başlarım.",
     "uclar": {
      "az": "Tesvîf",
      "orta": "Azim",
      "fazla": "Telaş"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi işi hep ileri atıyor: sol uca (Tesvîf) yakın. Başka okumada yarın için net bir plan yapmış ve saatini belirlemiş: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, işi nasıl ele aldığımıza bakar. Azim; kararlı ve sabırlı çalışmak, büyük işi küçük parçalara bölüp her gün biraz ilerlemektir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Azim",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Tesvîf",
      "orta": "Azim",
      "fazla": "Telaş"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Hep yarına bırakmak neye benziyor?",
       "ad": "Tesvîf",
       "soz": "Yarın yaparım, nasılsa vakit var.",
       "eylem": "yaslan",
       "zincir": [
        "İş birikir, her gün biraz daha büyür.",
        "Son anda yetişmeye çalışınca hem keyif hem kalite düşer."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yarın yaparım; şimdi biraz daha oyalanayım.",
          "dogru": true,
          "not": "Tesvîf, hayırlı işleri sürekli ertelemektir. Küçük erteleme, büyük bir yığına dönüşür."
         },
         {
          "m": "Bugün on beş dakikayla başlayayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: azmin sesi."
         },
         {
          "m": "Hepsini bu akşam bir çırpıda bitireyim!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: telaşın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tesvîf",
        "soz": "Yarın"
       },
       "zincirAnahtar": [
        "İş",
        "Son"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Panikle koşturan kişi işi nasıl bozar?",
       "ad": "Telaş",
       "soz": "Hepsini şimdi, hemen bitirmeliyim!",
       "eylem": "isaret",
       "zincir": [
        "Acele ettikçe hata yapar.",
        "İş yarım kalır, yeniden başlamak gerekir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Hepsini şimdi, tek seferde bitireyim!",
          "dogru": true,
          "not": "Telaş, plan yapmadan panikle acele etmektir. Hız var ama yön yok."
         },
         {
          "m": "Yarın yaparım; şimdi biraz daha oyalanayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: tesvîfin sesi."
         },
         {
          "m": "Bugün on beş dakikayla başlayayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: azmin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Telaş",
        "soz": "Hepsini"
       },
       "zincirAnahtar": [
        "Acele",
        "İş"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Azim",
       "soz": "Bugün on beş dakika, yarın yine.",
       "eylem": "konus",
       "zincir": [
        "Küçük adımlar birikir.",
        "İş yavaş yavaş ama sağlam ilerler."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Küçük bir plan yapıp bugün başlayayım.",
          "dogru": true,
          "not": "Azim, kararlı ve sabırlı biçimde her gün biraz çalışmaktır."
         },
         {
          "m": "Yarın yaparım; şimdi biraz daha oyalanayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: tesvîfin sesi."
         },
         {
          "m": "Hepsini şimdi, tek seferde bitireyim!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: telaşın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Azim",
        "soz": "Bugün"
       },
       "zincirAnahtar": [
        "Küçük",
        "İş"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Azim",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Tesvîf",
      "orta": "Azim",
      "fazla": "Telaş"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "proje",
       "baslik": "Proje ödevi",
       "tetik": "Önümüzdeki hafta teslim edilecek bir proje ödevin var. Öğretmen konuyu bugün verdi.",
       "secenekler": [
        {
         "m": "Daha çok var; son günlere bırakırım.",
         "zon": "az",
         "sonuc": "Günler geçiyor; son akşam işin hepsi sana yükleniyor.",
         "not": "İbre sola kaydı: ertelenen iş küçülmüyor, büyüyor.",
         "ses": "s1az"
        },
        {
         "m": "Bu akşam hepsini bitirip kenara koyayım!",
         "zon": "fazla",
         "sonuc": "Planın yok; acele edince eksik yerler çıkıyor ve yarısını yeniden yapıyorsun.",
         "not": "İbre sağa kaydı: plansız acele, işi hızlandırmıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Her gün yarım saat ayırıp parçalara bölerim.",
         "zon": "orta",
         "sonuc": "İş küçük parçalarla ilerliyor; teslim günü rahatsın.",
         "not": "İbre ortada: küçük ve düzenli adımlar işi taşıyor.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "masa",
       "baslik": "Çalışma saati",
       "tetik": "Ders çalışma saatin geldi ama masan dağınık ve yarım kalmış işlerin var.",
       "secenekler": [
        {
         "m": "Önce biraz dinleneyim, sonra bakarım.",
         "zon": "az",
         "sonuc": "Dinlenme uzuyor; çalışma saati sessizce geçip gidiyor.",
         "not": "İbre sola kaydı: başlamayı ertelemek, zamanı eritiyor.",
         "ses": "s2az"
        },
        {
         "m": "Hepsine aynı anda başlayayım!",
         "zon": "fazla",
         "sonuc": "Her işe biraz dokunuyorsun ama hiçbiri bitmiyor.",
         "not": "İbre sağa kaydı: aynı anda her şey, hiçbir şey demek.",
         "ses": "s2fa"
        },
        {
         "m": "Önce bir işi seçip on beş dakika çalışırım.",
         "zon": "orta",
         "sonuc": "İlk iş bitince devam etmek kolaylaşıyor.",
         "not": "İbre ortada: tek bir küçük başlangıç yolu açıyor.",
         "ses": "s2or"
        }
       ],
       "ses": "s2"
      }
     ],
     "karsiSes": "skarsi",
     "sonSes": "sson"
    },
    {
     "tur": "ibreGun",
     "id": "gun",
     "baslik": "Bir günün ibresi",
     "ozetBaslik": "Bugünün ibre yolu",
     "ses": {
      "acilis": "v1",
      "son": "v7"
     },
     "duraklar": [
      {
       "id": "okul",
       "ad": "Okul çıkışı",
       "baslik": "Okul çıkışı",
       "ses": "v2",
       "durum": "Çantan omzunda. Arkadaşların seni oyuna çağırıyor, ama yarına teslim edilecek bir ödev var.",
       "secenekler": [
        {
         "m": "Akşama kadar oynarım; ödev sonra.",
         "zon": "az",
         "t": -0.78,
         "not": "İbre sola: ertelemek kolay, ama iş küçülmüyor."
        },
        {
         "m": "Biraz oynarım, eve gidince ödeve küçük bir plan yaparım.",
         "zon": "orta",
         "t": 0.02,
         "not": "İbre ortada: hem oyuna hem başlamaya yer var."
        },
        {
         "m": "Oyuna katılmam; koşup eve gider, hepsini hemen bitirmeye çalışırım.",
         "zon": "fazla",
         "t": 0.7,
         "not": "İbre sağa: acele edince dinlenmek ve plan yapmak atlanıyor."
        }
       ]
      },
      {
       "id": "ikindi",
       "ad": "İkindi",
       "baslik": "İkindi",
       "ses": "v3",
       "durum": "Evdesin. Masanda yarım kalmış bir proje duruyor.",
       "secenekler": [
        {
         "m": "Yarın bakarım; şimdi biraz uzanayım.",
         "zon": "az",
         "t": -0.6,
         "not": "İbre sola: “yarın” çoğu zaman yine yarına kalıyor."
        },
        {
         "m": "On beş dakika süre koyup projeye başlarım.",
         "zon": "orta",
         "t": -0.04,
         "not": "İbre ortada: küçük bir başlangıç yolu açıyor."
        },
        {
         "m": "Üç işe birden başlarım; hepsini bu akşam bitireceğim!",
         "zon": "fazla",
         "t": 0.85,
         "not": "İbre sağa: aynı anda çok iş, hiçbirini bitirmeyi zorlaştırıyor."
        }
       ]
      },
      {
       "id": "aksam",
       "ad": "Akşam yemeği",
       "baslik": "Akşam yemeği",
       "ses": "v4",
       "durum": "Sofra hazır, ama aklında bitmemiş bir iş var.",
       "secenekler": [
        {
         "m": "Yemekten sonra uykum gelir; bu iş zaten yarına kalır.",
         "zon": "az",
         "t": -0.7,
         "not": "İbre sola: yorgunluk gerçek, ama iş yine bekliyor."
        },
        {
         "m": "Sofrada rahatça yer, sonra işe yirmi dakika ayırırım.",
         "zon": "orta",
         "t": 0.06,
         "not": "İbre ortada: dinlenme ve çaba aynı akşama sığdı."
        },
        {
         "m": "İki lokma yer, hemen masaya koşarım.",
         "zon": "fazla",
         "t": 0.62,
         "not": "İbre sağa: telaş, sofradaki güzel vakti de götürdü."
        }
       ]
      },
      {
       "id": "ders",
       "ad": "Ders saati",
       "baslik": "Ders saati",
       "ses": "v5",
       "durum": "Ders çalışma saati geldi. Konu biraz zor görünüyor.",
       "secenekler": [
        {
         "m": "Zor görünüyor; bugün olmaz, bırakayım.",
         "zon": "az",
         "t": -0.85,
         "not": "İbre sola: zor kısım bırakılınca daha da büyük görünür."
        },
        {
         "m": "Konuyu küçük parçalara bölüp ilk parçayla başlarım.",
         "zon": "orta",
         "t": -0.02,
         "not": "İbre ortada: zor iş, parçalara bölününce yürünebilir oluyor."
        },
        {
         "m": "Hepsini tek oturuşta, mola vermeden bitirmeye çalışırım.",
         "zon": "fazla",
         "t": 0.74,
         "not": "İbre sağa: mola vermeyince dikkat çabuk dağılıyor."
        }
       ]
      },
      {
       "id": "yatis",
       "ad": "Yatmadan önce",
       "baslik": "Yatmadan önce",
       "ses": "v6",
       "durum": "Yatma vakti yaklaşıyor. Yarının çantası ve yapılacaklar seni bekliyor.",
       "secenekler": [
        {
         "m": "Yarın sabah bakarım; şimdi yatayım.",
         "zon": "az",
         "t": -0.66,
         "not": "İbre sola: hazırlığı sabaha bırakmak sabahı sıkıştırıyor."
        },
        {
         "m": "Kısa bir liste yapıp çantayı hazırlar, sonra yatarım.",
         "zon": "orta",
         "t": 0.04,
         "not": "İbre ortada: küçük bir hazırlık yarını rahatlatıyor."
        },
        {
         "m": "Gece geç saate kadar her şeyi yeniden kontrol ederim.",
         "zon": "fazla",
         "t": 0.88,
         "not": "İbre sağa: fazla uğraşmak uykuyu ve yarını yoruyor."
        }
       ]
      }
     ],
     "huy": "Azim",
     "uclar": {
      "az": "Tesvîf",
      "orta": "Azim",
      "fazla": "Telaş"
     },
     "yesil": 0.26
    },
    {
     "id": "uc-bul",
     "tur": "siniflandir",
     "baslik": "Hangi uca yakın?",
     "yonerge": "Kartı ibrenin uygun ucuna taşı. Emin değilsen karta bak: ipucu var.",
     "alanlar": [
      {
       "id": "az",
       "ad": "Az · Tesvîf",
       "aciklama": "Hep ertelemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Azim",
       "aciklama": "Planla, her gün bir parça",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Telaş",
       "aciklama": "Panikle acele etmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Ödevi hep “yarın yaparım” der; sonunda yetişemez.",
       "alan": "az",
       "ipucu": "Başlamayı erteliyor."
      },
      {
       "id": "k2",
       "metin": "Planı yokken tüm ödevi tek gecede bitirmeye çalışır.",
       "alan": "fazla",
       "ipucu": "Acele ediyor, planı yok."
      },
      {
       "id": "k3",
       "metin": "Ödevini günlere bölüp her gün biraz yapar.",
       "alan": "orta",
       "ipucu": "Küçük ve düzenli ilerliyor."
      },
      {
       "id": "k4",
       "metin": "Yapacağı işi her gün bir sonraki güne bırakır.",
       "alan": "az",
       "ipucu": "Hiç başlamıyor."
      },
      {
       "id": "k5",
       "metin": "Aynı anda beş işe başlar; hiçbirini bitiremez.",
       "alan": "fazla",
       "ipucu": "Panikle dağılıyor."
      },
      {
       "id": "k6",
       "metin": "Başlamak zor gelince önce küçük bir adımla başlar, sonra devam eder.",
       "alan": "orta",
       "ipucu": "Küçük bir başlangıç yapıyor."
      }
     ]
    },
    {
     "id": "niyet",
     "tur": "dusun",
     "baslik": "Bu hafta ibremi nasıl ayarlarım?",
     "sorular": [
      {
       "soru": "Hangi durumda ibrem sağa ya da sola kayıyor?",
       "secenekler": [
        "Bir işe başlarken",
        "Ödev verilince",
        "Zor bir iş görünce",
        "Teslim günü yaklaşınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bir işe bugün küçük bir adımla başlayacağım",
        "Büyük işi küçük parçalara bölüp günlere yayacağım",
        "Yapılacakları sıraya koyup bir tanesiyle başlayacağım"
       ]
      }
     ],
     "ipucu": "İstersen kendi cümleni yaz: “Eğer … olursa, o zaman …” (gerçek isim, okul, adres ya da telefon yazma; “bir arkadaşım” de).",
     "tesekkur": "Niyetin kaydedildi. İbre bir karne değil; gün içinde oynar, bu normaldir. Küçük bir ayar, her gün yeniden. Allahü teâlâ kolaylık versin."
    },
    {
     "id": "son",
     "tur": "kapanis",
     "baslik": "Ders tamamlandı",
     "maddeler": [
      {
       "baslik": "İbre",
       "metin": "az · kararında · fazla",
       "ikon": "yol",
       "renk": "#4262B0"
      },
      {
       "baslik": "Azim",
       "metin": "her gün bir parça",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "baslik": "Her gün",
       "metin": "yeniden ayarlamak",
       "ikon": "kalp",
       "renk": "#E0674F"
      }
     ],
     "ses": "ses/kap.m4a"
    }
   ]
  }
 ],
 "sesler": {
  "a1": {
   "d": "ses/a1.m4a",
   "sure": 2.061,
   "m": "Bugün değil, yarın başlarım.",
   "k": [
    [
     "Bugün",
     0.03,
     0.466
    ],
    [
     "değil,",
     0.466,
     0.901
    ],
    [
     "yarın",
     0.901,
     1.337
    ],
    [
     "başlarım.",
     1.337,
     1.991
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 9.308,
   "m": "Birçok güzel huy bir ibre gibidir. Azim, bir işe nasıl girişeceğimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.42
    ],
    [
     "güzel",
     0.42,
     0.81
    ],
    [
     "huy",
     0.81,
     1.005
    ],
    [
     "bir",
     1.005,
     1.2
    ],
    [
     "ibre",
     1.2,
     1.59
    ],
    [
     "gibidir.",
     1.59,
     2.175
    ],
    [
     "Azim,",
     2.535,
     2.945
    ],
    [
     "bir",
     3.09,
     3.292
    ],
    [
     "işe",
     3.292,
     3.696
    ],
    [
     "nasıl",
     3.696,
     4.1
    ],
    [
     "girişeceğimi",
     4.1,
     5.311
    ],
    [
     "ölçer.",
     5.311,
     5.715
    ],
    [
     "İbre",
     5.815,
     6.198
    ],
    [
     "üç",
     6.198,
     6.39
    ],
    [
     "yerde",
     6.39,
     6.773
    ],
    [
     "durabilir:",
     6.773,
     7.54
    ],
    [
     "az,",
     7.885,
     8.555
    ],
    [
     "kararında,",
     8.925,
     9.134
    ],
    [
     "fazla.",
     9.134,
     9.238
    ]
   ]
  },
  "a3": {
   "d": "ses/a3.m4a",
   "sure": 2.345,
   "m": "Peki bu cümle, ibrenin neresinde?",
   "k": [
    [
     "Peki",
     0.03,
     0.428
    ],
    [
     "bu",
     0.428,
     0.627
    ],
    [
     "cümle,",
     0.627,
     1.025
    ],
    [
     "ibrenin",
     1.125,
     1.618
    ],
    [
     "neresinde?",
     1.618,
     2.275
    ]
   ]
  },
  "k0": {
   "d": "ses/k0.m4a",
   "sure": 3.505,
   "m": "Üç kapı var. Hangisi seni daha çok merak ettiriyor?",
   "k": [
    [
     "Üç",
     0.03,
     0.231
    ],
    [
     "kapı",
     0.231,
     0.634
    ],
    [
     "var.",
     0.634,
     0.835
    ],
    [
     "Hangisi",
     1.165,
     1.651
    ],
    [
     "seni",
     1.651,
     1.976
    ],
    [
     "daha",
     1.976,
     2.3
    ],
    [
     "çok",
     2.3,
     2.462
    ],
    [
     "merak",
     2.462,
     2.786
    ],
    [
     "ettiriyor?",
     2.786,
     3.435
    ]
   ]
  },
  "k9": {
   "d": "ses/k9.m4a",
   "sure": 6.69,
   "m": "Başka kapılarda başka sesler var. Merak ediyorsan aç; yoksa devam edebilirsin.",
   "k": [
    [
     "Başka",
     0.03,
     0.458
    ],
    [
     "kapılarda",
     0.458,
     1.315
    ],
    [
     "başka",
     1.315,
     1.743
    ],
    [
     "sesler",
     1.743,
     2.171
    ],
    [
     "var.",
     2.171,
     2.385
    ],
    [
     "Merak",
     3.0,
     3.389
    ],
    [
     "ediyorsan",
     3.389,
     4.166
    ],
    [
     "aç;",
     4.166,
     4.36
    ],
    [
     "yoksa",
     4.905,
     5.286
    ],
    [
     "devam",
     5.286,
     5.667
    ],
    [
     "edebilirsin.",
     5.667,
     6.62
    ]
   ]
  },
  "kap": {
   "d": "ses/kap.m4a",
   "sure": 3.032,
   "m": "Küçük bir ayar, her gün yeniden.",
   "k": [
    [
     "Küçük",
     0.03,
     0.482
    ],
    [
     "bir",
     0.482,
     0.708
    ],
    [
     "ayar,",
     0.708,
     1.16
    ],
    [
     "her",
     1.54,
     1.824
    ],
    [
     "gün",
     1.824,
     2.109
    ],
    [
     "yeniden.",
     2.109,
     2.962
    ]
   ]
  },
  "kaz1": {
   "d": "ses/kaz1.m4a",
   "sure": 6.442,
   "m": "Sol uçta Tesvîf. Yarın yaparım, nasılsa vakit var. İyi bir işi yarın, yarın diye savar.",
   "k": [
    [
     "Sol",
     0.03,
     0.287
    ],
    [
     "uçta",
     0.287,
     0.801
    ],
    [
     "Tesvîf.",
     0.801,
     1.315
    ],
    [
     "Yarın",
     1.91,
     2.15
    ],
    [
     "yaparım,",
     2.15,
     2.51
    ],
    [
     "nasılsa",
     2.765,
     3.23
    ],
    [
     "vakit",
     3.23,
     3.54
    ],
    [
     "var.",
     3.54,
     3.695
    ],
    [
     "İyi",
     4.05,
     4.246
    ],
    [
     "bir",
     4.246,
     4.344
    ],
    [
     "işi",
     4.344,
     4.539
    ],
    [
     "yarın,",
     4.539,
     4.735
    ],
    [
     "yarın",
     4.895,
     5.387
    ],
    [
     "diye",
     5.387,
     5.879
    ],
    [
     "savar.",
     5.879,
     6.372
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 7.572,
   "m": "Sonra ne olur? İş birikir, her gün biraz daha büyür. Son anda yetişmeye çalışınca hem keyif hem kalite düşer.",
   "k": [
    [
     "Sonra",
     0.03,
     0.28
    ],
    [
     "ne",
     0.28,
     0.405
    ],
    [
     "olur?",
     0.405,
     0.655
    ],
    [
     "İş",
     1.14,
     1.309
    ],
    [
     "birikir,",
     1.309,
     1.815
    ],
    [
     "her",
     2.145,
     2.294
    ],
    [
     "gün",
     2.294,
     2.443
    ],
    [
     "biraz",
     2.443,
     2.74
    ],
    [
     "daha",
     2.74,
     3.038
    ],
    [
     "büyür.",
     3.038,
     3.335
    ],
    [
     "Son",
     3.805,
     3.99
    ],
    [
     "anda",
     3.99,
     4.359
    ],
    [
     "yetişmeye",
     4.359,
     5.099
    ],
    [
     "çalışınca",
     5.099,
     5.838
    ],
    [
     "hem",
     5.838,
     6.023
    ],
    [
     "keyif",
     6.023,
     6.393
    ],
    [
     "hem",
     6.393,
     6.577
    ],
    [
     "kalite",
     6.577,
     7.132
    ],
    [
     "düşer.",
     7.132,
     7.502
    ]
   ]
  },
  "kaz3": {
   "d": "ses/kaz3.m4a",
   "sure": 2.261,
   "m": "Sence bu kişi içinden ne diyor?",
   "k": [
    [
     "Sence",
     0.03,
     0.423
    ],
    [
     "bu",
     0.423,
     0.619
    ],
    [
     "kişi",
     0.619,
     1.012
    ],
    [
     "içinden",
     1.012,
     1.602
    ],
    [
     "ne",
     1.602,
     1.798
    ],
    [
     "diyor?",
     1.798,
     2.191
    ]
   ]
  },
  "kfa1": {
   "d": "ses/kfa1.m4a",
   "sure": 6.822,
   "m": "Sağ uçta Telaş. Hepsini şimdi, hemen bitirmeliyim! Planı yokken bütün işi tek seferde bitirmeye çalışır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.256
    ],
    [
     "uçta",
     0.256,
     0.708
    ],
    [
     "Telaş.",
     0.708,
     1.16
    ],
    [
     "Hepsini",
     1.49,
     2.027
    ],
    [
     "şimdi,",
     2.027,
     2.385
    ],
    [
     "hemen",
     2.59,
     2.851
    ],
    [
     "bitirmeliyim!",
     2.851,
     3.505
    ],
    [
     "Planı",
     3.855,
     4.16
    ],
    [
     "yokken",
     4.16,
     4.465
    ],
    [
     "bütün",
     4.465,
     4.77
    ],
    [
     "işi",
     4.77,
     5.075
    ],
    [
     "tek",
     5.075,
     5.227
    ],
    [
     "seferde",
     5.227,
     5.685
    ],
    [
     "bitirmeye",
     5.685,
     6.295
    ],
    [
     "çalışır.",
     6.295,
     6.752
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 4.943,
   "m": "Sonra ne olur? Acele ettikçe hata yapar. İş yarım kalır, yeniden başlamak gerekir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.29
    ],
    [
     "ne",
     0.29,
     0.42
    ],
    [
     "olur?",
     0.42,
     0.68
    ],
    [
     "Acele",
     0.88,
     1.349
    ],
    [
     "ettikçe",
     1.349,
     1.819
    ],
    [
     "hata",
     1.819,
     2.132
    ],
    [
     "yapar.",
     2.132,
     2.445
    ],
    [
     "İş",
     2.635,
     2.801
    ],
    [
     "yarım",
     2.801,
     3.133
    ],
    [
     "kalır,",
     3.133,
     3.465
    ],
    [
     "yeniden",
     3.685,
     4.081
    ],
    [
     "başlamak",
     4.081,
     4.477
    ],
    [
     "gerekir.",
     4.477,
     4.873
    ]
   ]
  },
  "kfa3": {
   "d": "ses/kfa3.m4a",
   "sure": 1.872,
   "m": "Sence bu kişi içinden ne diyor?",
   "k": [
    [
     "Sence",
     0.03,
     0.352
    ],
    [
     "bu",
     0.352,
     0.513
    ],
    [
     "kişi",
     0.513,
     0.835
    ],
    [
     "içinden",
     0.835,
     1.319
    ],
    [
     "ne",
     1.319,
     1.48
    ],
    [
     "diyor?",
     1.48,
     1.802
    ]
   ]
  },
  "kor1": {
   "d": "ses/kor1.m4a",
   "sure": 8.318,
   "m": "Tam kararında Azim. Bugün on beş dakika, yarın yine. Küçük bir plan yapıp başlar; her gün biraz ilerler.",
   "k": [
    [
     "Tam",
     0.03,
     0.201
    ],
    [
     "kararında",
     0.201,
     0.884
    ],
    [
     "Azim.",
     0.884,
     1.225
    ],
    [
     "Bugün",
     1.825,
     2.196
    ],
    [
     "on",
     2.196,
     2.382
    ],
    [
     "beş",
     2.382,
     2.568
    ],
    [
     "dakika,",
     2.568,
     3.125
    ],
    [
     "yarın",
     3.6,
     3.918
    ],
    [
     "yine.",
     3.918,
     4.235
    ],
    [
     "Küçük",
     4.64,
     5.104
    ],
    [
     "bir",
     5.104,
     5.336
    ],
    [
     "plan",
     5.336,
     5.568
    ],
    [
     "yapıp",
     5.568,
     6.031
    ],
    [
     "başlar;",
     6.031,
     6.495
    ],
    [
     "her",
     6.615,
     6.848
    ],
    [
     "gün",
     6.848,
     7.082
    ],
    [
     "biraz",
     7.082,
     7.548
    ],
    [
     "ilerler.",
     7.548,
     8.248
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.102,
   "m": "Sonra ne olur? Küçük adımlar birikir. İş yavaş yavaş ama sağlam ilerler.",
   "k": [
    [
     "Sonra",
     0.03,
     0.286
    ],
    [
     "ne",
     0.286,
     0.414
    ],
    [
     "olur?",
     0.414,
     0.67
    ],
    [
     "Küçük",
     1.135,
     1.452
    ],
    [
     "adımlar",
     1.452,
     1.929
    ],
    [
     "birikir.",
     1.929,
     2.405
    ],
    [
     "İş",
     2.68,
     2.876
    ],
    [
     "yavaş",
     2.876,
     3.268
    ],
    [
     "yavaş",
     3.268,
     3.66
    ],
    [
     "ama",
     3.66,
     4.052
    ],
    [
     "sağlam",
     4.052,
     4.444
    ],
    [
     "ilerler.",
     4.444,
     5.032
    ]
   ]
  },
  "kor3": {
   "d": "ses/kor3.m4a",
   "sure": 2.158,
   "m": "Sence bu kişi içinden ne diyor?",
   "k": [
    [
     "Sence",
     0.03,
     0.404
    ],
    [
     "bu",
     0.404,
     0.591
    ],
    [
     "kişi",
     0.591,
     0.965
    ],
    [
     "içinden",
     0.965,
     1.527
    ],
    [
     "ne",
     1.527,
     1.714
    ],
    [
     "diyor?",
     1.714,
     2.088
    ]
   ]
  },
  "s1": {
   "d": "ses/s1.m4a",
   "sure": 5.643,
   "m": "Önümüzdeki hafta teslim edilecek bir proje ödevin var. Öğretmen konuyu bugün verdi. Ne yaparsın?",
   "k": [
    [
     "Önümüzdeki",
     0.03,
     0.739
    ],
    [
     "hafta",
     0.739,
     1.022
    ],
    [
     "teslim",
     1.022,
     1.306
    ],
    [
     "edilecek",
     1.306,
     1.873
    ],
    [
     "bir",
     1.873,
     2.015
    ],
    [
     "proje",
     2.015,
     2.298
    ],
    [
     "ödevin",
     2.298,
     2.723
    ],
    [
     "var.",
     2.723,
     2.865
    ],
    [
     "Öğretmen",
     3.09,
     3.595
    ],
    [
     "konuyu",
     3.595,
     4.101
    ],
    [
     "bugün",
     4.101,
     4.438
    ],
    [
     "verdi.",
     4.438,
     4.775
    ],
    [
     "Ne",
     5.07,
     5.196
    ],
    [
     "yaparsın?",
     5.196,
     5.573
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.376,
   "m": "Günler geçiyor; son akşam işin hepsi sana yükleniyor.",
   "k": [
    [
     "Günler",
     0.03,
     0.484
    ],
    [
     "geçiyor;",
     0.484,
     1.165
    ],
    [
     "son",
     1.31,
     1.54
    ],
    [
     "akşam",
     1.54,
     2.001
    ],
    [
     "işin",
     2.001,
     2.462
    ],
    [
     "hepsi",
     2.462,
     2.923
    ],
    [
     "sana",
     2.923,
     3.384
    ],
    [
     "yükleniyor.",
     3.384,
     4.306
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.175,
   "m": "Planın yok; acele edince eksik yerler çıkıyor ve yarısını yeniden yapıyorsun.",
   "k": [
    [
     "Planın",
     0.03,
     0.373
    ],
    [
     "yok;",
     0.373,
     0.545
    ],
    [
     "acele",
     0.685,
     1.095
    ],
    [
     "edince",
     1.095,
     1.506
    ],
    [
     "eksik",
     1.506,
     1.78
    ],
    [
     "yerler",
     1.78,
     2.053
    ],
    [
     "çıkıyor",
     2.053,
     2.464
    ],
    [
     "ve",
     2.464,
     2.6
    ],
    [
     "yarısını",
     2.6,
     3.148
    ],
    [
     "yeniden",
     3.148,
     3.558
    ],
    [
     "yapıyorsun.",
     3.558,
     4.105
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.063,
   "m": "İş küçük parçalarla ilerliyor; teslim günü rahatsın.",
   "k": [
    [
     "İş",
     0.03,
     0.176
    ],
    [
     "küçük",
     0.176,
     0.468
    ],
    [
     "parçalarla",
     0.468,
     1.051
    ],
    [
     "ilerliyor;",
     1.051,
     1.635
    ],
    [
     "teslim",
     1.955,
     2.252
    ],
    [
     "günü",
     2.252,
     2.548
    ],
    [
     "rahatsın.",
     2.548,
     2.993
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.722,
   "m": "Ders çalışma saatin geldi ama masan dağınık ve yarım kalmış işlerin var. Ne yaparsın?",
   "k": [
    [
     "Ders",
     0.03,
     0.204
    ],
    [
     "çalışma",
     0.204,
     0.725
    ],
    [
     "saatin",
     0.725,
     1.247
    ],
    [
     "geldi",
     1.247,
     1.594
    ],
    [
     "ama",
     1.594,
     1.942
    ],
    [
     "masan",
     1.942,
     2.289
    ],
    [
     "dağınık",
     2.289,
     2.811
    ],
    [
     "ve",
     2.811,
     2.985
    ],
    [
     "yarım",
     2.985,
     3.332
    ],
    [
     "kalmış",
     3.332,
     3.68
    ],
    [
     "işlerin",
     3.68,
     4.201
    ],
    [
     "var.",
     4.201,
     4.375
    ],
    [
     "Ne",
     4.77,
     4.991
    ],
    [
     "yaparsın?",
     4.991,
     5.652
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.438,
   "m": "Dinlenme uzuyor; çalışma saati sessizce geçip gidiyor.",
   "k": [
    [
     "Dinlenme",
     0.03,
     0.69
    ],
    [
     "uzuyor;",
     0.69,
     1.35
    ],
    [
     "çalışma",
     1.63,
     2.217
    ],
    [
     "saati",
     2.217,
     2.804
    ],
    [
     "sessizce",
     2.804,
     3.39
    ],
    [
     "geçip",
     3.39,
     3.782
    ],
    [
     "gidiyor.",
     3.782,
     4.368
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 2.534,
   "m": "Her işe biraz dokunuyorsun ama hiçbiri bitmiyor.",
   "k": [
    [
     "Her",
     0.03,
     0.165
    ],
    [
     "işe",
     0.165,
     0.436
    ],
    [
     "biraz",
     0.436,
     0.706
    ],
    [
     "dokunuyorsun",
     0.706,
     1.382
    ],
    [
     "ama",
     1.382,
     1.653
    ],
    [
     "hiçbiri",
     1.653,
     2.058
    ],
    [
     "bitmiyor.",
     2.058,
     2.464
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 2.173,
   "m": "İlk iş bitince devam etmek kolaylaşıyor.",
   "k": [
    [
     "İlk",
     0.03,
     0.178
    ],
    [
     "iş",
     0.178,
     0.326
    ],
    [
     "bitince",
     0.326,
     0.77
    ],
    [
     "devam",
     0.77,
     1.066
    ],
    [
     "etmek",
     1.066,
     1.362
    ],
    [
     "kolaylaşıyor.",
     1.362,
     2.103
    ]
   ]
  },
  "skarsi": {
   "d": "ses/skarsi.m4a",
   "sure": 2.684,
   "m": "Aynı sahne, üç ayrı ibre.",
   "k": [
    [
     "Aynı",
     0.03,
     0.505
    ],
    [
     "sahne,",
     0.505,
     0.98
    ],
    [
     "üç",
     1.36,
     1.611
    ],
    [
     "ayrı",
     1.611,
     2.112
    ],
    [
     "ibre.",
     2.112,
     2.614
    ]
   ]
  },
  "sson": {
   "d": "ses/sson.m4a",
   "sure": 9.679,
   "m": "Aynı durum, farklı ibre. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
   "k": [
    [
     "Aynı",
     0.03,
     0.42
    ],
    [
     "durum,",
     0.42,
     0.81
    ],
    [
     "farklı",
     0.97,
     1.385
    ],
    [
     "ibre.",
     1.385,
     1.8
    ],
    [
     "Fark,",
     2.485,
     2.73
    ],
    [
     "hangi",
     2.825,
     3.219
    ],
    [
     "iç",
     3.219,
     3.416
    ],
    [
     "sesi",
     3.416,
     3.81
    ],
    [
     "dinlediğimizdedir.",
     3.81,
     5.19
    ],
    [
     "İbre",
     5.945,
     6.318
    ],
    [
     "bir",
     6.318,
     6.504
    ],
    [
     "karne",
     6.504,
     6.877
    ],
    [
     "değil;",
     6.877,
     7.25
    ],
    [
     "gün",
     7.635,
     7.814
    ],
    [
     "içinde",
     7.814,
     8.352
    ],
    [
     "oynar,",
     8.352,
     8.71
    ],
    [
     "bu",
     8.87,
     9.055
    ],
    [
     "normaldir.",
     9.055,
     9.609
    ]
   ]
  },
  "t1": {
   "d": "ses/t1.m4a",
   "sure": 3.962,
   "m": "Karar senin. İbreyi sürükle, sonra ne kadar emin olduğunu söyle.",
   "k": [
    [
     "Karar",
     0.03,
     0.325
    ],
    [
     "senin.",
     0.325,
     0.62
    ],
    [
     "İbreyi",
     0.91,
     1.325
    ],
    [
     "sürükle,",
     1.325,
     1.74
    ],
    [
     "sonra",
     1.995,
     2.287
    ],
    [
     "ne",
     2.287,
     2.433
    ],
    [
     "kadar",
     2.433,
     2.725
    ],
    [
     "emin",
     2.725,
     3.016
    ],
    [
     "olduğunu",
     3.016,
     3.6
    ],
    [
     "söyle.",
     3.6,
     3.892
    ]
   ]
  },
  "t2": {
   "d": "ses/t2.m4a",
   "sure": 8.723,
   "m": "Bu cümle bilerek çift anlamlı. İşi hep ileri atan biri söylüyorsa sol uca yakın. Yarın için net bir plan yapmış biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.188
    ],
    [
     "cümle",
     0.188,
     0.502
    ],
    [
     "bilerek",
     0.502,
     0.975
    ],
    [
     "çift",
     0.975,
     1.132
    ],
    [
     "anlamlı.",
     1.132,
     1.605
    ],
    [
     "İşi",
     2.125,
     2.412
    ],
    [
     "hep",
     2.412,
     2.555
    ],
    [
     "ileri",
     2.555,
     2.986
    ],
    [
     "atan",
     2.986,
     3.272
    ],
    [
     "biri",
     3.272,
     3.559
    ],
    [
     "söylüyorsa",
     3.559,
     4.133
    ],
    [
     "sol",
     4.133,
     4.276
    ],
    [
     "uca",
     4.276,
     4.563
    ],
    [
     "yakın.",
     4.563,
     4.85
    ],
    [
     "Yarın",
     5.12,
     5.457
    ],
    [
     "için",
     5.457,
     5.793
    ],
    [
     "net",
     5.793,
     5.961
    ],
    [
     "bir",
     5.961,
     6.13
    ],
    [
     "plan",
     6.13,
     6.298
    ],
    [
     "yapmış",
     6.298,
     6.634
    ],
    [
     "biri",
     6.634,
     6.971
    ],
    [
     "söylüyorsa",
     6.971,
     7.644
    ],
    [
     "orta",
     7.644,
     7.98
    ],
    [
     "uca",
     7.98,
     8.317
    ],
    [
     "yakın.",
     8.317,
     8.653
    ]
   ]
  },
  "t3": {
   "d": "ses/t3.m4a",
   "sure": 4.325,
   "m": "Peki ibrenin uçlarında duran kişiler ne yapar? Bir kapı seç.",
   "k": [
    [
     "Peki",
     0.03,
     0.361
    ],
    [
     "ibrenin",
     0.361,
     0.858
    ],
    [
     "uçlarında",
     0.858,
     1.52
    ],
    [
     "duran",
     1.52,
     1.851
    ],
    [
     "kişiler",
     1.851,
     2.348
    ],
    [
     "ne",
     2.348,
     2.514
    ],
    [
     "yapar?",
     2.514,
     2.845
    ],
    [
     "Bir",
     3.45,
     3.651
    ],
    [
     "kapı",
     3.651,
     4.054
    ],
    [
     "seç.",
     4.054,
     4.255
    ]
   ]
  },
  "v1": {
   "d": "ses/v1.m4a",
   "sure": 5.077,
   "m": "Okul çıkışından yatma vaktine kadar beş durağımız var. Her durakta ibre biraz oynar.",
   "k": [
    [
     "Okul",
     0.03,
     0.364
    ],
    [
     "çıkışından",
     0.364,
     1.031
    ],
    [
     "yatma",
     1.031,
     1.365
    ],
    [
     "vaktine",
     1.365,
     1.865
    ],
    [
     "kadar",
     1.865,
     2.199
    ],
    [
     "beş",
     2.199,
     2.366
    ],
    [
     "durağımız",
     2.366,
     3.033
    ],
    [
     "var.",
     3.033,
     3.2
    ],
    [
     "Her",
     3.31,
     3.48
    ],
    [
     "durakta",
     3.48,
     3.989
    ],
    [
     "ibre",
     3.989,
     4.328
    ],
    [
     "biraz",
     4.328,
     4.668
    ],
    [
     "oynar.",
     4.668,
     5.007
    ]
   ]
  },
  "v2": {
   "d": "ses/v2.m4a",
   "sure": 5.833,
   "m": "Birinci durak, okul çıkışı. Çantan omzunda; arkadaşların oyuna çağırıyor ama yarına ödev var.",
   "k": [
    [
     "Birinci",
     0.03,
     0.468
    ],
    [
     "durak,",
     0.468,
     0.76
    ],
    [
     "okul",
     0.885,
     1.143
    ],
    [
     "çıkışı.",
     1.143,
     1.53
    ],
    [
     "Çantan",
     2.12,
     2.458
    ],
    [
     "omzunda;",
     2.458,
     2.965
    ],
    [
     "arkadaşların",
     3.09,
     3.758
    ],
    [
     "oyuna",
     3.758,
     4.159
    ],
    [
     "çağırıyor",
     4.159,
     4.694
    ],
    [
     "ama",
     4.694,
     4.961
    ],
    [
     "yarına",
     4.961,
     5.362
    ],
    [
     "ödev",
     5.362,
     5.63
    ],
    [
     "var.",
     5.63,
     5.763
    ]
   ]
  },
  "v3": {
   "d": "ses/v3.m4a",
   "sure": 4.782,
   "m": "İkinci durak, ikindi vakti. Evdesin ve masanda yarım kalmış bir proje duruyor.",
   "k": [
    [
     "İkinci",
     0.03,
     0.414
    ],
    [
     "durak,",
     0.414,
     0.67
    ],
    [
     "ikindi",
     0.97,
     1.387
    ],
    [
     "vakti.",
     1.387,
     1.665
    ],
    [
     "Evdesin",
     2.19,
     2.635
    ],
    [
     "ve",
     2.635,
     2.783
    ],
    [
     "masanda",
     2.783,
     3.229
    ],
    [
     "yarım",
     3.229,
     3.525
    ],
    [
     "kalmış",
     3.525,
     3.822
    ],
    [
     "bir",
     3.822,
     3.97
    ],
    [
     "proje",
     3.97,
     4.267
    ],
    [
     "duruyor.",
     4.267,
     4.712
    ]
   ]
  },
  "v4": {
   "d": "ses/v4.m4a",
   "sure": 5.033,
   "m": "Üçüncü durak, akşam yemeği. Sofra hazır, ama aklında bitmemiş bir iş var.",
   "k": [
    [
     "Üçüncü",
     0.03,
     0.48
    ],
    [
     "durak,",
     0.48,
     0.78
    ],
    [
     "akşam",
     0.96,
     1.224
    ],
    [
     "yemeği.",
     1.224,
     1.62
    ],
    [
     "Sofra",
     2.105,
     2.452
    ],
    [
     "hazır,",
     2.452,
     2.8
    ],
    [
     "ama",
     3.175,
     3.5
    ],
    [
     "aklında",
     3.5,
     3.988
    ],
    [
     "bitmemiş",
     3.988,
     4.475
    ],
    [
     "bir",
     4.475,
     4.638
    ],
    [
     "iş",
     4.638,
     4.8
    ],
    [
     "var.",
     4.8,
     4.963
    ]
   ]
  },
  "v5": {
   "d": "ses/v5.m4a",
   "sure": 4.014,
   "m": "Dördüncü durak, ders çalışma saati. Konu biraz zor görünüyor.",
   "k": [
    [
     "Dördüncü",
     0.03,
     0.522
    ],
    [
     "durak,",
     0.522,
     0.85
    ],
    [
     "ders",
     0.975,
     1.133
    ],
    [
     "çalışma",
     1.133,
     1.606
    ],
    [
     "saati.",
     1.606,
     2.08
    ],
    [
     "Konu",
     2.505,
     2.825
    ],
    [
     "biraz",
     2.825,
     3.145
    ],
    [
     "zor",
     3.145,
     3.305
    ],
    [
     "görünüyor.",
     3.305,
     3.944
    ]
   ]
  },
  "v6": {
   "d": "ses/v6.m4a",
   "sure": 5.32,
   "m": "Son durak, yatmadan önce. Yarının çantası ve yapılacaklar seni bekliyor.",
   "k": [
    [
     "Son",
     0.03,
     0.232
    ],
    [
     "durak,",
     0.232,
     0.635
    ],
    [
     "yatmadan",
     0.85,
     1.324
    ],
    [
     "önce.",
     1.324,
     1.64
    ],
    [
     "Yarının",
     2.22,
     2.755
    ],
    [
     "çantası",
     2.755,
     3.29
    ],
    [
     "ve",
     3.29,
     3.468
    ],
    [
     "yapılacaklar",
     3.468,
     4.359
    ],
    [
     "seni",
     4.359,
     4.716
    ],
    [
     "bekliyor.",
     4.716,
     5.25
    ]
   ]
  },
  "v7": {
   "d": "ses/v7.m4a",
   "sure": 6.236,
   "m": "İşte bugünün ibre yolu. İbre gün içinde oynar; bu normaldir, yarın yine ayarlanır.",
   "k": [
    [
     "İşte",
     0.03,
     0.359
    ],
    [
     "bugünün",
     0.359,
     0.852
    ],
    [
     "ibre",
     0.852,
     1.181
    ],
    [
     "yolu.",
     1.181,
     1.51
    ],
    [
     "İbre",
     2.125,
     2.459
    ],
    [
     "gün",
     2.459,
     2.626
    ],
    [
     "içinde",
     2.626,
     3.126
    ],
    [
     "oynar;",
     3.126,
     3.46
    ],
    [
     "bu",
     3.745,
     3.934
    ],
    [
     "normaldir,",
     3.934,
     4.5
    ],
    [
     "yarın",
     4.85,
     5.179
    ],
    [
     "yine",
     5.179,
     5.508
    ],
    [
     "ayarlanır.",
     5.508,
     6.166
    ]
   ]
  }
 }
}
);
