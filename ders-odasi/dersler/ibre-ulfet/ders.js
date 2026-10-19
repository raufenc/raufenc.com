/* İbremetre · Ülfet — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Hicr · Ülfet · Yapışkanlık). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-ulfet",
 "ad": "Ülfet: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
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
     "huy": "Ülfet",
     "olculen": "Yakınlık kurma biçimim",
     "kanca": "Küsmedim, sadece konuşmuyorum.",
     "uclar": {
      "az": "Hicr",
      "orta": "Ülfet",
      "fazla": "Yapışkanlık"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Ülfet",
     "cumle": "Küsmedim, sadece konuşmuyorum.",
     "uclar": {
      "az": "Hicr",
      "orta": "Ülfet",
      "fazla": "Yapışkanlık"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi küsüp konuşmayı kesiyor: sol uca (Hicr) yakın. Başka okumada kısa bir süre sakinleşmek istiyor ve sonra barışmaya hazır: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, niyete ve sürece bakar. Ülfet; sevgi ve anlayışla yakınlık kurmak, karşındakinin alanına da saygı göstermektir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Ülfet",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Hicr",
      "orta": "Ülfet",
      "fazla": "Yapışkanlık"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Küsüp uzaklaşmak neye benziyor?",
       "ad": "Hicr",
       "soz": "Seninle konuşmam, bir daha da çağırma.",
       "eylem": "hayir",
       "zincir": [
        "Arkadaşı neden küstüğünü bilemez.",
        "Gün geçtikçe aradaki mesafe büyür."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Beni anlamadı; ben de konuşmam.",
          "dogru": true,
          "not": "Hicr, dostluğu kesip küskün kalmaktır. Küskünlük uzadıkça barışmak da zorlaşır."
         },
         {
          "m": "Kırıldım ama konuşup barışmak istiyorum.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ülfetin sesi."
         },
         {
          "m": "Sen nereye ben oraya; seni yalnız bırakmam.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: yapışkanlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hicr",
        "soz": "Seninle"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Gün"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Peşini bırakmayan kişi neyi kaçırır?",
       "ad": "Yapışkanlık",
       "soz": "Neden yalnız kalmak istiyorsun, ben de geliyorum!",
       "eylem": "isaret",
       "zincir": [
        "Arkadaşı biraz soluk almak ister.",
        "Bunaldıkça dostluk yük gibi görünmeye başlar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yalnız kalmak istemesin; hep yanında olayım.",
          "dogru": true,
          "not": "Yapışkanlık, arkadaşının peşinden her an ayrılmamaktır. Sevgi, karşındakinin alanına da saygı ister."
         },
         {
          "m": "Beni anlamadı; ben de konuşmam.",
          "dogru": false,
          "not": "Bu sol ucun sesi: hicrin sesi."
         },
         {
          "m": "Biraz yalnız kalsın; hazır olunca yanındayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ülfetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Yapışkanlık",
        "soz": "Neden"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Bunaldıkça"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Ülfet",
       "soz": "İstersen biraz sonra konuşalım; ben buradayım.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı kendini rahat ve değerli hisseder.",
        "Dostluk yük olmadan, zamanla güçlenir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Biraz yalnız kalsın; hazır olunca yanındayım.",
          "dogru": true,
          "not": "Ülfet, sevgiyle yakınlık kurmak ve karşındakinin alanına saygı göstermektir."
         },
         {
          "m": "Beni anlamadı; ben de konuşmam.",
          "dogru": false,
          "not": "Bu sol ucun sesi: hicrin sesi."
         },
         {
          "m": "Yalnız kalmak istemesin; hep yanında olayım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: yapışkanlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Ülfet",
        "soz": "İstersen"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Dostluk"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Ülfet",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Hicr",
      "orta": "Ülfet",
      "fazla": "Yapışkanlık"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "tartisma",
       "baslik": "Küçük tartışma",
       "tetik": "Arkadaşınla küçük bir konuda tartıştınız. O, bugün yalnız oturmak istediğini söylüyor.",
       "secenekler": [
        {
         "m": "Madem öyle, artık seninle konuşmam.",
         "zon": "az",
         "sonuc": "Küskünlük büyüyor; ikiniz de yalnız kalıyorsunuz.",
         "not": "İbre sola kaydı: küsmek mesafeyi açıyor.",
         "ses": "s1az"
        },
        {
         "m": "Olmaz, ben yanına oturuyorum; seni yalnız bırakmam!",
         "zon": "fazla",
         "sonuc": "Arkadaşın daha da sıkılıyor; söylediği sözün dinlenmediğini düşünüyor.",
         "not": "İbre sağa kaydı: karşındakinin isteğini duymamak yakınlığı zedeliyor.",
         "ses": "s1fa"
        },
        {
         "m": "Tamam, bugün yalnız otur; ihtiyacın olursa buradayım.",
         "zon": "orta",
         "sonuc": "Arkadaşın rahatlıyor; bir süre sonra kendisi yanına geliyor.",
         "not": "İbre ortada: hem sevgini hem saygını gösterdin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "yeni",
       "baslik": "Yeni arkadaş",
       "tetik": "Sınıfa yeni bir öğrenci geldi. Sessiz duruyor ve kimseyle konuşmuyor.",
       "secenekler": [
        {
         "m": "Beni ilgilendirmez; ben kendi arkadaşlarımla kalırım.",
         "zon": "az",
         "sonuc": "Yeni arkadaş kendini yalnız hissediyor; tanışma fırsatı kaçıyor.",
         "not": "İbre sola kaydı: uzak durmak yeni dostlukları engelliyor.",
         "ses": "s2az"
        },
        {
         "m": "Hemen en yakın arkadaşı olurum; her yere birlikte gideriz!",
         "zon": "fazla",
         "sonuc": "Yeni arkadaş bunalıyor; başkalarıyla tanışmaya fırsat bulamıyor.",
         "not": "İbre sağa kaydı: aşırı yakınlık, karşındakine alan bırakmıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Merhaba derim; istersen birlikte oturalım diye sorarım.",
         "zon": "orta",
         "sonuc": "Yeni arkadaş gülümsüyor ve kendi hızında yaklaşıyor.",
         "not": "İbre ortada: yakınlığı davet ettin, zorlamadın.",
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
     "id": "uc-bul",
     "tur": "siniflandir",
     "baslik": "Hangi uca yakın?",
     "yonerge": "Kartı ibrenin uygun ucuna taşı. Emin değilsen karta bak: ipucu var.",
     "alanlar": [
      {
       "id": "az",
       "ad": "Az · Hicr",
       "aciklama": "Küsüp uzaklaşmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Ülfet",
       "aciklama": "Yakınlık kurup alan bırakmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Yapışkanlık",
       "aciklama": "Peşini bırakmamak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Bir tartışmadan sonra günlerce selam vermez.",
       "alan": "az",
       "ipucu": "Küskünlüğü uzatıyor."
      },
      {
       "id": "k2",
       "metin": "“Biraz yalnız kalayım” dendiği hâlde yine peşinden gider.",
       "alan": "fazla",
       "ipucu": "Söylenene kulak vermiyor."
      },
      {
       "id": "k3",
       "metin": "Barışmak için ilk adımı atar, arkadaşının hızına da uyar.",
       "alan": "orta",
       "ipucu": "Hem yaklaşıyor hem saygı gösteriyor."
      },
      {
       "id": "k4",
       "metin": "Oyuna çağrıldığında “ben gelmem” deyip köşesinde oturur.",
       "alan": "az",
       "ipucu": "Yaklaşmak yerine uzaklaşıyor."
      },
      {
       "id": "k5",
       "metin": "Arkadaşı başkalarıyla oynayınca üzülüp araya girer.",
       "alan": "fazla",
       "ipucu": "Arkadaşına alan bırakmıyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşı yalnız kalmak isterse “ihtiyacın olursa buradayım” der.",
       "alan": "orta",
       "ipucu": "Alan bırakıyor ama yanında."
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
        "Bir arkadaşımla tartışınca",
        "Arkadaşım yalnız kalmak isteyince",
        "Yeni biriyle tanışırken",
        "Arkadaşım başkalarıyla oynarken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Küsmek yerine “barışalım mı?” diyeceğim",
        "Arkadaşım “yalnız kalayım” derse ona alan bırakacağım",
        "Yeni bir arkadaşa merhaba diyeceğim"
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
       "baslik": "Ülfet",
       "metin": "yakınlık kurup alan bırakmak",
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
   "sure": 2.822,
   "m": "Küsmedim, sadece konuşmuyorum.",
   "k": [
    [
     "Küsmedim,",
     0.03,
     0.66
    ],
    [
     "sadece",
     1.105,
     1.722
    ],
    [
     "konuşmuyorum.",
     1.722,
     2.752
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 9.524,
   "m": "Birçok güzel huy bir ibre gibidir. Ülfet, yakınlık kurma biçimimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.497
    ],
    [
     "güzel",
     0.497,
     0.965
    ],
    [
     "huy",
     0.965,
     1.198
    ],
    [
     "bir",
     1.198,
     1.432
    ],
    [
     "ibre",
     1.432,
     1.899
    ],
    [
     "gibidir.",
     1.899,
     2.6
    ],
    [
     "Ülfet,",
     2.725,
     3.14
    ],
    [
     "yakınlık",
     3.36,
     3.912
    ],
    [
     "kurma",
     3.912,
     4.28
    ],
    [
     "biçimimi",
     4.28,
     5.017
    ],
    [
     "ölçer.",
     5.017,
     5.385
    ],
    [
     "İbre",
     5.52,
     6.011
    ],
    [
     "üç",
     6.011,
     6.257
    ],
    [
     "yerde",
     6.257,
     6.748
    ],
    [
     "durabilir:",
     6.748,
     7.73
    ],
    [
     "az,",
     8.08,
     8.224
    ],
    [
     "kararında,",
     8.224,
     8.8
    ],
    [
     "fazla.",
     9.085,
     9.454
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
   "sure": 6.684,
   "m": "Sol uçta Hicr. Seninle konuşmam, bir daha da çağırma. Oyuna çağrılsa bile köşesinden çıkmaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.309
    ],
    [
     "uçta",
     0.309,
     0.866
    ],
    [
     "Hicr.",
     0.866,
     1.145
    ],
    [
     "Seninle",
     1.45,
     1.902
    ],
    [
     "konuşmam,",
     1.902,
     2.355
    ],
    [
     "bir",
     2.625,
     2.752
    ],
    [
     "daha",
     2.752,
     3.006
    ],
    [
     "da",
     3.006,
     3.134
    ],
    [
     "çağırma.",
     3.134,
     3.515
    ],
    [
     "Oyuna",
     3.94,
     4.513
    ],
    [
     "çağrılsa",
     4.513,
     5.086
    ],
    [
     "bile",
     5.086,
     5.468
    ],
    [
     "köşesinden",
     5.468,
     6.232
    ],
    [
     "çıkmaz.",
     6.232,
     6.614
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.897,
   "m": "Sonra ne olur? Arkadaşı neden küstüğünü bilemez. Gün geçtikçe aradaki mesafe büyür.",
   "k": [
    [
     "Sonra",
     0.03,
     0.266
    ],
    [
     "ne",
     0.266,
     0.384
    ],
    [
     "olur?",
     0.384,
     0.62
    ],
    [
     "Arkadaşı",
     1.1,
     1.754
    ],
    [
     "neden",
     1.754,
     2.081
    ],
    [
     "küstüğünü",
     2.081,
     2.735
    ],
    [
     "bilemez.",
     2.735,
     3.225
    ],
    [
     "Gün",
     3.395,
     3.582
    ],
    [
     "geçtikçe",
     3.582,
     4.143
    ],
    [
     "aradaki",
     4.143,
     4.891
    ],
    [
     "mesafe",
     4.891,
     5.453
    ],
    [
     "büyür.",
     5.453,
     5.827
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
   "sure": 6.838,
   "m": "Sağ uçta Yapışkanlık. Neden yalnız kalmak istiyorsun, ben de geliyorum! Arkadaşının gölgesi gibi her yere gider.",
   "k": [
    [
     "Sağ",
     0.03,
     0.209
    ],
    [
     "uçta",
     0.209,
     0.566
    ],
    [
     "Yapışkanlık.",
     0.566,
     1.28
    ],
    [
     "Neden",
     1.36,
     1.71
    ],
    [
     "yalnız",
     1.71,
     2.06
    ],
    [
     "kalmak",
     2.06,
     2.41
    ],
    [
     "istiyorsun,",
     2.41,
     3.11
    ],
    [
     "ben",
     3.305,
     3.419
    ],
    [
     "de",
     3.419,
     3.533
    ],
    [
     "geliyorum!",
     3.533,
     3.99
    ],
    [
     "Arkadaşının",
     4.67,
     5.369
    ],
    [
     "gölgesi",
     5.369,
     5.789
    ],
    [
     "gibi",
     5.789,
     6.069
    ],
    [
     "her",
     6.069,
     6.208
    ],
    [
     "yere",
     6.208,
     6.488
    ],
    [
     "gider.",
     6.488,
     6.768
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.126,
   "m": "Sonra ne olur? Arkadaşı biraz soluk almak ister. Bunaldıkça dostluk yük gibi görünmeye başlar.",
   "k": [
    [
     "Sonra",
     0.03,
     0.258
    ],
    [
     "ne",
     0.258,
     0.372
    ],
    [
     "olur?",
     0.372,
     0.6
    ],
    [
     "Arkadaşı",
     0.92,
     1.592
    ],
    [
     "biraz",
     1.592,
     1.928
    ],
    [
     "soluk",
     1.928,
     2.263
    ],
    [
     "almak",
     2.263,
     2.599
    ],
    [
     "ister.",
     2.599,
     2.935
    ],
    [
     "Bunaldıkça",
     3.045,
     3.848
    ],
    [
     "dostluk",
     3.848,
     4.25
    ],
    [
     "yük",
     4.25,
     4.45
    ],
    [
     "gibi",
     4.45,
     4.852
    ],
    [
     "görünmeye",
     4.852,
     5.655
    ],
    [
     "başlar.",
     5.655,
     6.056
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
   "sure": 8.139,
   "m": "Tam kararında Ülfet. İstersen biraz sonra konuşalım; ben buradayım. Elini uzatır, arkadaşının yalnız kalmak istediği anları da anlar.",
   "k": [
    [
     "Tam",
     0.03,
     0.176
    ],
    [
     "kararında",
     0.176,
     0.759
    ],
    [
     "Ülfet.",
     0.759,
     1.05
    ],
    [
     "İstersen",
     1.12,
     1.648
    ],
    [
     "biraz",
     1.648,
     2.0
    ],
    [
     "sonra",
     2.0,
     2.351
    ],
    [
     "konuşalım;",
     2.351,
     3.055
    ],
    [
     "ben",
     3.315,
     3.419
    ],
    [
     "buradayım.",
     3.419,
     3.835
    ],
    [
     "Elini",
     4.535,
     4.895
    ],
    [
     "uzatır,",
     4.895,
     5.255
    ],
    [
     "arkadaşının",
     5.33,
     6.051
    ],
    [
     "yalnız",
     6.051,
     6.339
    ],
    [
     "kalmak",
     6.339,
     6.627
    ],
    [
     "istediği",
     6.627,
     7.204
    ],
    [
     "anları",
     7.204,
     7.636
    ],
    [
     "da",
     7.636,
     7.78
    ],
    [
     "anlar.",
     7.78,
     8.069
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.33,
   "m": "Sonra ne olur? Arkadaşı kendini rahat ve değerli hisseder. Dostluk yük olmadan, zamanla güçlenir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.438
    ],
    [
     "ne",
     0.438,
     0.642
    ],
    [
     "olur?",
     0.642,
     1.05
    ],
    [
     "Arkadaşı",
     1.15,
     1.802
    ],
    [
     "kendini",
     1.802,
     2.292
    ],
    [
     "rahat",
     2.292,
     2.618
    ],
    [
     "ve",
     2.618,
     2.781
    ],
    [
     "değerli",
     2.781,
     3.271
    ],
    [
     "hisseder.",
     3.271,
     3.76
    ],
    [
     "Dostluk",
     3.915,
     4.367
    ],
    [
     "yük",
     4.367,
     4.592
    ],
    [
     "olmadan,",
     4.592,
     5.27
    ],
    [
     "zamanla",
     5.39,
     5.825
    ],
    [
     "güçlenir.",
     5.825,
     6.26
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
   "sure": 5.431,
   "m": "Arkadaşınla küçük bir konuda tartıştınız. O, bugün yalnız oturmak istediğini söylüyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşınla",
     0.03,
     0.71
    ],
    [
     "küçük",
     0.71,
     0.982
    ],
    [
     "bir",
     0.982,
     1.118
    ],
    [
     "konuda",
     1.118,
     1.526
    ],
    [
     "tartıştınız.",
     1.526,
     2.07
    ],
    [
     "O,",
     2.51,
     2.635
    ],
    [
     "bugün",
     2.635,
     2.885
    ],
    [
     "yalnız",
     2.885,
     3.135
    ],
    [
     "oturmak",
     3.135,
     3.51
    ],
    [
     "istediğini",
     3.51,
     4.135
    ],
    [
     "söylüyor.",
     4.135,
     4.51
    ],
    [
     "Ne",
     4.86,
     4.985
    ],
    [
     "yaparsın?",
     4.985,
     5.361
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.372,
   "m": "Küskünlük büyüyor; ikiniz de yalnız kalıyorsunuz.",
   "k": [
    [
     "Küskünlük",
     0.03,
     0.645
    ],
    [
     "büyüyor;",
     0.645,
     1.26
    ],
    [
     "ikiniz",
     1.68,
     2.122
    ],
    [
     "de",
     2.122,
     2.27
    ],
    [
     "yalnız",
     2.27,
     2.565
    ],
    [
     "kalıyorsunuz.",
     2.565,
     3.302
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.93,
   "m": "Arkadaşın daha da sıkılıyor; söylediği sözün dinlenmediğini düşünüyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.521
    ],
    [
     "daha",
     0.521,
     0.766
    ],
    [
     "da",
     0.766,
     0.889
    ],
    [
     "sıkılıyor;",
     0.889,
     1.38
    ],
    [
     "söylediği",
     1.49,
     2.082
    ],
    [
     "sözün",
     2.082,
     2.379
    ],
    [
     "dinlenmediğini",
     2.379,
     3.267
    ],
    [
     "düşünüyor.",
     3.267,
     3.86
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.267,
   "m": "Arkadaşın rahatlıyor; bir süre sonra kendisi yanına geliyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.492
    ],
    [
     "rahatlıyor;",
     0.492,
     0.955
    ],
    [
     "bir",
     1.295,
     1.431
    ],
    [
     "süre",
     1.431,
     1.703
    ],
    [
     "sonra",
     1.703,
     1.974
    ],
    [
     "kendisi",
     1.974,
     2.382
    ],
    [
     "yanına",
     2.382,
     2.79
    ],
    [
     "geliyor.",
     2.79,
     3.197
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.754,
   "m": "Sınıfa yeni bir öğrenci geldi. Sessiz duruyor ve kimseyle konuşmuyor. Ne yaparsın?",
   "k": [
    [
     "Sınıfa",
     0.03,
     0.446
    ],
    [
     "yeni",
     0.446,
     0.723
    ],
    [
     "bir",
     0.723,
     0.862
    ],
    [
     "öğrenci",
     0.862,
     1.278
    ],
    [
     "geldi.",
     1.278,
     1.555
    ],
    [
     "Sessiz",
     1.86,
     2.171
    ],
    [
     "duruyor",
     2.171,
     2.637
    ],
    [
     "ve",
     2.637,
     2.792
    ],
    [
     "kimseyle",
     2.792,
     3.258
    ],
    [
     "konuşmuyor.",
     3.258,
     3.88
    ],
    [
     "Ne",
     4.2,
     4.571
    ],
    [
     "yaparsın?",
     4.571,
     5.684
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.462,
   "m": "Yeni arkadaş kendini yalnız hissediyor; tanışma fırsatı kaçıyor.",
   "k": [
    [
     "Yeni",
     0.03,
     0.298
    ],
    [
     "arkadaş",
     0.298,
     0.7
    ],
    [
     "kendini",
     0.7,
     1.101
    ],
    [
     "yalnız",
     1.101,
     1.369
    ],
    [
     "hissediyor;",
     1.369,
     1.905
    ],
    [
     "tanışma",
     2.15,
     2.564
    ],
    [
     "fırsatı",
     2.564,
     2.978
    ],
    [
     "kaçıyor.",
     2.978,
     3.392
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.197,
   "m": "Yeni arkadaş bunalıyor; başkalarıyla tanışmaya fırsat bulamıyor.",
   "k": [
    [
     "Yeni",
     0.03,
     0.254
    ],
    [
     "arkadaş",
     0.254,
     0.591
    ],
    [
     "bunalıyor;",
     0.591,
     1.04
    ],
    [
     "başkalarıyla",
     1.255,
     1.879
    ],
    [
     "tanışmaya",
     1.879,
     2.378
    ],
    [
     "fırsat",
     2.378,
     2.628
    ],
    [
     "bulamıyor.",
     2.628,
     3.127
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.041,
   "m": "Yeni arkadaş gülümsüyor ve kendi hızında yaklaşıyor.",
   "k": [
    [
     "Yeni",
     0.03,
     0.34
    ],
    [
     "arkadaş",
     0.34,
     0.804
    ],
    [
     "gülümsüyor",
     0.804,
     1.423
    ],
    [
     "ve",
     1.423,
     1.578
    ],
    [
     "kendi",
     1.578,
     1.888
    ],
    [
     "hızında",
     1.888,
     2.352
    ],
    [
     "yaklaşıyor.",
     2.352,
     2.971
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
   "sure": 9.236,
   "m": "Bu cümle bilerek çift anlamlı. Küsüp konuşmayı kesen biri söylüyorsa sol uca yakın. Biraz sakinleşip sonra barışmak isteyen biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.18
    ],
    [
     "cümle",
     0.18,
     0.481
    ],
    [
     "bilerek",
     0.481,
     0.933
    ],
    [
     "çift",
     0.933,
     1.083
    ],
    [
     "anlamlı.",
     1.083,
     1.535
    ],
    [
     "Küsüp",
     1.89,
     2.198
    ],
    [
     "konuşmayı",
     2.198,
     2.814
    ],
    [
     "kesen",
     2.814,
     3.122
    ],
    [
     "biri",
     3.122,
     3.429
    ],
    [
     "söylüyorsa",
     3.429,
     4.045
    ],
    [
     "sol",
     4.045,
     4.199
    ],
    [
     "uca",
     4.199,
     4.507
    ],
    [
     "yakın.",
     4.507,
     4.815
    ],
    [
     "Biraz",
     5.14,
     5.45
    ],
    [
     "sakinleşip",
     5.45,
     6.069
    ],
    [
     "sonra",
     6.069,
     6.379
    ],
    [
     "barışmak",
     6.379,
     6.843
    ],
    [
     "isteyen",
     6.843,
     7.308
    ],
    [
     "biri",
     7.308,
     7.617
    ],
    [
     "söylüyorsa",
     7.617,
     8.237
    ],
    [
     "orta",
     8.237,
     8.546
    ],
    [
     "uca",
     8.546,
     8.856
    ],
    [
     "yakın.",
     8.856,
     9.166
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
  }
 }
}
);
