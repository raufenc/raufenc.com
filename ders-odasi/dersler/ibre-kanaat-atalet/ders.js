/* İbremetre · Kanaat — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Atâlet · Kanaat · Hırs). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-kanaat-atalet",
 "ad": "Kanaat (Atâlet · Hırs): İbren Nerede?",
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
     "huy": "Kanaat",
     "huyAnahtar": "Kanaat",
     "olculen": "Çabam ile doyumum arasındaki denge",
     "kanca": "Daha iyisi hep olabilir.",
     "uclar": {
      "az": "Atâlet",
      "orta": "Kanaat",
      "fazla": "Hırs"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Kanaat",
     "cumle": "Daha iyisi hep olabilir.",
     "uclar": {
      "az": "Atâlet",
      "orta": "Kanaat",
      "fazla": "Hırs"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi eline geçenle hiç yetinmeyip hep daha yükseğini kovalıyor: sağ uca (Hırs) yakın. Başka okumada elinden geleni yapıyor, gelişmeye açık kalıyor ve elindekine de şükrediyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an çabayla doyum arasında nerede durduğumuza bakar. Kanaat; elindekine razı olup şükretmektir, çalışmayı bırakmak değildir. Bu ibre ölçekten çok yönü gösterir: bir uçta hiç çaba göstermemek, öbür uçta mal ve makam için doymamak var.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Kanaat",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Atâlet",
      "orta": "Kanaat",
      "fazla": "Hırs"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Hiç gayret etmemek neye benziyor?",
       "ad": "Atâlet",
       "soz": "Çalışsam da çalışmasam da aynı, boş ver.",
       "eylem": "yaslan",
       "zincir": [
        "Ödev birikip büyür.",
        "Elindeki imkânlar da boşa gider."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Uğraşmaya ne gerek var; bu kadarı bana yeter.",
          "dogru": true,
          "not": "Atâlet, hiç gayret göstermeyip boş durmaktır. Yetinmek ile çabasız kalmak ayrı şeylerdir."
         },
         {
          "m": "Elimden geleni yaptım; sonucuna şükrederim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: kanaatin sesi."
         },
         {
          "m": "Hep daha yükseği olmalı; hiç durmadan kovalayayım!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hırsın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Atâlet",
        "soz": "Çalışsam"
       },
       "zincirAnahtar": [
        "Ödev",
        "Elindeki"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Hep daha çoğunu isteyen kişi neyi kaçırır?",
       "ad": "Hırs",
       "soz": "En yüksek not da, en büyük makam da benim olsun!",
       "eylem": "isaret",
       "zincir": [
        "Kazandıkça gönlü doymaz.",
        "Arkadaşlarıyla keyif almaya vakit bulamaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ne kadar alsam yetmez; hep daha üstü lazım.",
          "dogru": true,
          "not": "Hırs, mal ve makam için doymamaktır. Elindekinin tadı çıkmaz."
         },
         {
          "m": "Uğraşmaya ne gerek var; bu kadarı bana yeter.",
          "dogru": false,
          "not": "Bu sol ucun sesi: atâletin sesi."
         },
         {
          "m": "Elimden geleni yaptım; sonucuna şükrederim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: kanaatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hırs",
        "soz": "En"
       },
       "zincirAnahtar": [
        "Kazandıkça",
        "Arkadaşlarıyla"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Kanaat",
       "soz": "Elimden geleni yaptım; sonucuna şükrederim.",
       "eylem": "sevinc",
       "zincir": [
        "Huzuru gönlünde taşır.",
        "Yeni işlere de rahat bir kalple başlar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Elimdekine şükrederek yarın yine çalışırım.",
          "dogru": true,
          "not": "Kanaat, elindekine razı olup şükretmektir. Çalışmayı bırakmak demek değildir."
         },
         {
          "m": "Uğraşmaya ne gerek var; bu kadarı bana yeter.",
          "dogru": false,
          "not": "Bu sol ucun sesi: atâletin sesi."
         },
         {
          "m": "Hep daha yükseği olmalı; hiç durmadan kovalayayım!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hırsın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kanaat",
        "soz": "Elimden"
       },
       "zincirAnahtar": [
        "Huzuru",
        "Yeni"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Kanaat",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Atâlet",
      "orta": "Kanaat",
      "fazla": "Hırs"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "karne",
       "baslik": "Karne günü",
       "tetik": "Karne günü: notların iyi ama bir dersten istediğin yüksek notu alamadın.",
       "secenekler": [
        {
         "m": "Not ne gelirse gelsin, bundan sonra hiç çalışmam.",
         "zon": "az",
         "sonuc": "Gelişme fırsatları sessizce yanından geçip gidiyor.",
         "not": "İbre sola kaydı: çabayı bırakmak, doyumu da getirmiyor.",
         "ses": "s1az"
        },
        {
         "m": "Bütün notlar en yüksek olmalı; olmadıysa memnun değilim!",
         "zon": "fazla",
         "sonuc": "Aldığın güzel notların tadı çıkmıyor; sürekli gerginsin.",
         "not": "İbre sağa kaydı: hep daha yükseğini istemek elindekinin tadını bozuyor.",
         "ses": "s1fa"
        },
        {
         "m": "Notlarıma şükrederim; eksik dersime biraz daha çalışırım.",
         "zon": "orta",
         "sonuc": "Hem içi rahat hem yolu açık bir şekilde ilerliyorsun.",
         "not": "İbre ortada: elindekine şükredip çalışmaya devam ettin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "baskan",
       "baslik": "Sınıf başkanlığı",
       "tetik": "Sınıf başkanlığı seçimi var. Arkadaşların seni aday göstermek istiyor.",
       "secenekler": [
        {
         "m": "Hiç uğraşmam; seçilsem de seçilmesem de bana ne.",
         "zon": "az",
         "sonuc": "Arkadaşlarına faydalı olma fırsatı kaçıyor.",
         "not": "İbre sola kaydı: hiç gayret etmemek, güzel işlerin önünü kapatıyor.",
         "ses": "s2az"
        },
        {
         "m": "Başkan mutlaka ben olmalıyım; kazanmak için her şeyi yaparım!",
         "zon": "fazla",
         "sonuc": "Kazanmak uğruna arkadaşlarını yoruyorsun; sonuç tatsız oluyor.",
         "not": "İbre sağa kaydı: makam hırsı dostlukları gölgeliyor.",
         "ses": "s2fa"
        },
        {
         "m": "Elimden geleni yaparım; sonuç ne olursa razı olurum.",
         "zon": "orta",
         "sonuc": "Seçimden sonra arkadaşlarınla aranız iyi kalıyor.",
         "not": "İbre ortada: emek verdin, sonuca da gönül rahatlığıyla razı oldun.",
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
       "ad": "Az · Atâlet",
       "aciklama": "Hiç gayret etmemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Kanaat",
       "aciklama": "Çalışıp şükretmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Hırs",
       "aciklama": "Hep daha çoğunu istemek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Ödevi varken bütün gün koltukta oturur: “Ne gerek var?”",
       "alan": "az",
       "ipucu": "Hiç gayret göstermiyor."
      },
      {
       "id": "k2",
       "metin": "Aldığı hediyeyle yetinmez: “Daha büyüğü olmalı!”",
       "alan": "fazla",
       "ipucu": "Doymak bilmiyor."
      },
      {
       "id": "k3",
       "metin": "Çalışıp aldığı nota şükreder, eksiğini tamamlamaya bakar.",
       "alan": "orta",
       "ipucu": "Gayret ediyor ve şükrediyor."
      },
      {
       "id": "k4",
       "metin": "Kolay bir görev verilse bile “ben uğraşmam” der.",
       "alan": "az",
       "ipucu": "Çaba göstermiyor."
      },
      {
       "id": "k5",
       "metin": "Arkadaşında daha güzel bir şey görünce kendi elindekinden hoşnut olmaz.",
       "alan": "fazla",
       "ipucu": "Kıyaslayıp doymuyor."
      },
      {
       "id": "k6",
       "metin": "Elindeki kalemle keyifle çizer, yeni bir tane için aceleci davranmaz.",
       "alan": "orta",
       "ipucu": "Elindekinin kıymetini biliyor."
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
        "Karne ya da sınav sonucu gelince",
        "Başkasında güzel bir şey görünce",
        "Yorucu bir işe başlarken",
        "Yeni bir şey istediğimde"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bugün işime elimden geleni yapacağım",
        "Elimdeki güzel bir şey için şükredeceğim",
        "Bir şey isteyince önce “bana gerçekten lazım mı?” diyeceğim"
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
       "baslik": "Kanaat",
       "metin": "çalışıp şükretmek",
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
   "sure": 2.118,
   "m": "Daha iyisi hep olabilir.",
   "k": [
    [
     "Daha",
     0.03,
     0.434
    ],
    [
     "iyisi",
     0.434,
     1.039
    ],
    [
     "hep",
     1.039,
     1.241
    ],
    [
     "olabilir.",
     1.241,
     2.048
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.835,
   "m": "Birçok güzel huy bir ibre gibidir. Kanaat, çabamla doyumum arasındaki dengeyi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.495
    ],
    [
     "güzel",
     0.495,
     0.959
    ],
    [
     "huy",
     0.959,
     1.191
    ],
    [
     "bir",
     1.191,
     1.424
    ],
    [
     "ibre",
     1.424,
     1.888
    ],
    [
     "gibidir.",
     1.888,
     2.585
    ],
    [
     "Kanaat,",
     3.13,
     3.66
    ],
    [
     "çabamla",
     3.96,
     4.674
    ],
    [
     "doyumum",
     4.674,
     5.389
    ],
    [
     "arasındaki",
     5.389,
     6.579
    ],
    [
     "dengeyi",
     6.579,
     7.294
    ],
    [
     "ölçer.",
     7.294,
     7.77
    ],
    [
     "İbre",
     7.86,
     8.308
    ],
    [
     "üç",
     8.308,
     8.532
    ],
    [
     "yerde",
     8.532,
     8.979
    ],
    [
     "durabilir:",
     8.979,
     9.875
    ],
    [
     "az,",
     10.21,
     10.357
    ],
    [
     "kararında,",
     10.357,
     10.945
    ],
    [
     "fazla.",
     11.4,
     11.765
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
   "sure": 8.455,
   "m": "Sol uçta Atâlet. Çalışsam da çalışmasam da aynı, boş ver. Ödevi masada bırakıp boş boş oturur.",
   "k": [
    [
     "Sol",
     0.03,
     0.247
    ],
    [
     "uçta",
     0.247,
     0.682
    ],
    [
     "Atâlet.",
     0.682,
     1.335
    ],
    [
     "Çalışsam",
     1.445,
     2.288
    ],
    [
     "da",
     2.288,
     2.569
    ],
    [
     "çalışmasam",
     2.569,
     3.692
    ],
    [
     "da",
     3.692,
     3.973
    ],
    [
     "aynı,",
     3.973,
     4.535
    ],
    [
     "boş",
     4.755,
     5.025
    ],
    [
     "ver.",
     5.025,
     5.295
    ],
    [
     "Ödevi",
     5.535,
     6.146
    ],
    [
     "masada",
     6.146,
     6.757
    ],
    [
     "bırakıp",
     6.757,
     7.367
    ],
    [
     "boş",
     7.367,
     7.571
    ],
    [
     "boş",
     7.571,
     7.775
    ],
    [
     "oturur.",
     7.775,
     8.385
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.324,
   "m": "Sonra ne olur? Ödev birikip büyür. Elindeki imkânlar da boşa gider.",
   "k": [
    [
     "Sonra",
     0.03,
     0.326
    ],
    [
     "ne",
     0.326,
     0.474
    ],
    [
     "olur?",
     0.474,
     0.77
    ],
    [
     "Ödev",
     1.345,
     1.732
    ],
    [
     "birikip",
     1.732,
     2.313
    ],
    [
     "büyür.",
     2.313,
     2.7
    ],
    [
     "Elindeki",
     2.9,
     3.685
    ],
    [
     "imkânlar",
     3.685,
     4.273
    ],
    [
     "da",
     4.273,
     4.469
    ],
    [
     "boşa",
     4.469,
     4.861
    ],
    [
     "gider.",
     4.861,
     5.254
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
   "sure": 9.212,
   "m": "Sağ uçta Hırs. En yüksek not da, en büyük makam da benim olsun! Aldığı notla ya da makamla bir türlü yetinmez.",
   "k": [
    [
     "Sağ",
     0.03,
     0.22
    ],
    [
     "uçta",
     0.22,
     0.6
    ],
    [
     "Hırs.",
     0.6,
     0.79
    ],
    [
     "En",
     0.865,
     1.22
    ],
    [
     "yüksek",
     1.22,
     1.93
    ],
    [
     "not",
     1.93,
     2.285
    ],
    [
     "da,",
     2.285,
     2.64
    ],
    [
     "en",
     2.745,
     2.924
    ],
    [
     "büyük",
     2.924,
     3.281
    ],
    [
     "makam",
     3.281,
     3.638
    ],
    [
     "da",
     3.638,
     3.816
    ],
    [
     "benim",
     3.816,
     4.173
    ],
    [
     "olsun!",
     4.173,
     4.53
    ],
    [
     "Aldığı",
     4.67,
     5.509
    ],
    [
     "notla",
     5.509,
     6.068
    ],
    [
     "ya",
     6.068,
     6.347
    ],
    [
     "da",
     6.347,
     6.627
    ],
    [
     "makamla",
     6.627,
     7.465
    ],
    [
     "bir",
     7.465,
     7.745
    ],
    [
     "türlü",
     7.745,
     8.304
    ],
    [
     "yetinmez.",
     8.304,
     9.142
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.142,
   "m": "Sonra ne olur? Kazandıkça gönlü doymaz. Arkadaşlarıyla keyif almaya vakit bulamaz.",
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
     "Kazandıkça",
     0.965,
     1.71
    ],
    [
     "gönlü",
     1.71,
     2.083
    ],
    [
     "doymaz.",
     2.083,
     2.455
    ],
    [
     "Arkadaşlarıyla",
     2.595,
     3.524
    ],
    [
     "keyif",
     3.524,
     3.834
    ],
    [
     "almaya",
     3.834,
     4.298
    ],
    [
     "vakit",
     4.298,
     4.608
    ],
    [
     "bulamaz.",
     4.608,
     5.072
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
   "sure": 8.127,
   "m": "Tam kararında Kanaat. Elimden geleni yaptım; sonucuna şükrederim. Çalışır, sonucu da şükürle karşılar.",
   "k": [
    [
     "Tam",
     0.03,
     0.215
    ],
    [
     "kararında",
     0.215,
     0.955
    ],
    [
     "Kanaat.",
     0.955,
     1.51
    ],
    [
     "Elimden",
     1.95,
     2.34
    ],
    [
     "geleni",
     2.34,
     2.73
    ],
    [
     "yaptım;",
     2.73,
     2.99
    ],
    [
     "sonucuna",
     3.585,
     4.092
    ],
    [
     "şükrederim.",
     4.092,
     4.6
    ],
    [
     "Çalışır,",
     5.26,
     5.745
    ],
    [
     "sonucu",
     6.16,
     6.729
    ],
    [
     "da",
     6.729,
     6.919
    ],
    [
     "şükürle",
     6.919,
     7.488
    ],
    [
     "karşılar.",
     7.488,
     8.057
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.607,
   "m": "Sonra ne olur? Huzuru gönlünde taşır. Yeni işlere de rahat bir kalple başlar.",
   "k": [
    [
     "Sonra",
     0.03,
     0.428
    ],
    [
     "ne",
     0.428,
     0.627
    ],
    [
     "olur?",
     0.627,
     1.025
    ],
    [
     "Huzuru",
     1.27,
     1.774
    ],
    [
     "gönlünde",
     1.774,
     2.279
    ],
    [
     "taşır.",
     2.279,
     2.615
    ],
    [
     "Yeni",
     2.98,
     3.373
    ],
    [
     "işlere",
     3.373,
     3.963
    ],
    [
     "de",
     3.963,
     4.16
    ],
    [
     "rahat",
     4.16,
     4.554
    ],
    [
     "bir",
     4.554,
     4.75
    ],
    [
     "kalple",
     4.75,
     5.144
    ],
    [
     "başlar.",
     5.144,
     5.537
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
   "sure": 5.436,
   "m": "Karne günü: notların iyi ama bir dersten istediğin yüksek notu alamadın. Ne yaparsın?",
   "k": [
    [
     "Karne",
     0.03,
     0.305
    ],
    [
     "günü:",
     0.305,
     0.58
    ],
    [
     "notların",
     0.975,
     1.451
    ],
    [
     "iyi",
     1.451,
     1.768
    ],
    [
     "ama",
     1.768,
     2.085
    ],
    [
     "bir",
     2.085,
     2.244
    ],
    [
     "dersten",
     2.244,
     2.561
    ],
    [
     "istediğin",
     2.561,
     3.196
    ],
    [
     "yüksek",
     3.196,
     3.513
    ],
    [
     "notu",
     3.513,
     3.83
    ],
    [
     "alamadın.",
     3.83,
     4.465
    ],
    [
     "Ne",
     4.795,
     4.938
    ],
    [
     "yaparsın?",
     4.938,
     5.366
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.169,
   "m": "Gelişme fırsatları sessizce yanından geçip gidiyor.",
   "k": [
    [
     "Gelişme",
     0.03,
     0.542
    ],
    [
     "fırsatları",
     0.542,
     1.224
    ],
    [
     "sessizce",
     1.224,
     1.735
    ],
    [
     "yanından",
     1.735,
     2.247
    ],
    [
     "geçip",
     2.247,
     2.588
    ],
    [
     "gidiyor.",
     2.588,
     3.099
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 2.913,
   "m": "Aldığın güzel notların tadı çıkmıyor; sürekli gerginsin.",
   "k": [
    [
     "Aldığın",
     0.03,
     0.45
    ],
    [
     "güzel",
     0.45,
     0.73
    ],
    [
     "notların",
     0.73,
     1.15
    ],
    [
     "tadı",
     1.15,
     1.43
    ],
    [
     "çıkmıyor;",
     1.43,
     1.85
    ],
    [
     "sürekli",
     1.935,
     2.389
    ],
    [
     "gerginsin.",
     2.389,
     2.843
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.191,
   "m": "Hem içi rahat hem yolu açık bir şekilde ilerliyorsun.",
   "k": [
    [
     "Hem",
     0.03,
     0.193
    ],
    [
     "içi",
     0.193,
     0.518
    ],
    [
     "rahat",
     0.518,
     0.844
    ],
    [
     "hem",
     0.844,
     1.006
    ],
    [
     "yolu",
     1.006,
     1.332
    ],
    [
     "açık",
     1.332,
     1.657
    ],
    [
     "bir",
     1.657,
     1.82
    ],
    [
     "şekilde",
     1.82,
     2.308
    ],
    [
     "ilerliyorsun.",
     2.308,
     3.121
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.249,
   "m": "Sınıf başkanlığı seçimi var. Arkadaşların seni aday göstermek istiyor. Ne yaparsın?",
   "k": [
    [
     "Sınıf",
     0.03,
     0.308
    ],
    [
     "başkanlığı",
     0.308,
     0.864
    ],
    [
     "seçimi",
     0.864,
     1.281
    ],
    [
     "var.",
     1.281,
     1.42
    ],
    [
     "Arkadaşların",
     1.62,
     2.245
    ],
    [
     "seni",
     2.245,
     2.495
    ],
    [
     "aday",
     2.495,
     2.745
    ],
    [
     "göstermek",
     2.745,
     3.12
    ],
    [
     "istiyor.",
     3.12,
     3.495
    ],
    [
     "Ne",
     3.64,
     3.775
    ],
    [
     "yaparsın?",
     3.775,
     4.179
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.374,
   "m": "Arkadaşlarına faydalı olma fırsatı kaçıyor.",
   "k": [
    [
     "Arkadaşlarına",
     0.03,
     0.833
    ],
    [
     "faydalı",
     0.833,
     1.234
    ],
    [
     "olma",
     1.234,
     1.501
    ],
    [
     "fırsatı",
     1.501,
     1.903
    ],
    [
     "kaçıyor.",
     1.903,
     2.304
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.308,
   "m": "Kazanmak uğruna arkadaşlarını yoruyorsun; sonuç tatsız oluyor.",
   "k": [
    [
     "Kazanmak",
     0.03,
     0.616
    ],
    [
     "uğruna",
     0.616,
     1.202
    ],
    [
     "arkadaşlarını",
     1.202,
     2.374
    ],
    [
     "yoruyorsun;",
     2.374,
     3.155
    ],
    [
     "sonuç",
     3.41,
     3.646
    ],
    [
     "tatsız",
     3.646,
     3.883
    ],
    [
     "oluyor.",
     3.883,
     4.238
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 2.989,
   "m": "Seçimden sonra arkadaşlarınla aranız iyi kalıyor.",
   "k": [
    [
     "Seçimden",
     0.03,
     0.486
    ],
    [
     "sonra",
     0.486,
     0.79
    ],
    [
     "arkadaşlarınla",
     0.79,
     1.702
    ],
    [
     "aranız",
     1.702,
     2.158
    ],
    [
     "iyi",
     2.158,
     2.462
    ],
    [
     "kalıyor.",
     2.462,
     2.919
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
   "sure": 10.977,
   "m": "Bu cümle bilerek çift anlamlı. Hep daha yükseğini kovalayan biri söylüyorsa sağ uca yakın. Elinden geleni yapıp şükreden ve gelişmeye açık biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.197
    ],
    [
     "cümle",
     0.197,
     0.531
    ],
    [
     "bilerek",
     0.531,
     1.032
    ],
    [
     "çift",
     1.032,
     1.199
    ],
    [
     "anlamlı.",
     1.199,
     1.7
    ],
    [
     "Hep",
     2.11,
     2.261
    ],
    [
     "daha",
     2.261,
     2.562
    ],
    [
     "yükseğini",
     2.562,
     3.165
    ],
    [
     "kovalayan",
     3.165,
     3.767
    ],
    [
     "biri",
     3.767,
     4.069
    ],
    [
     "söylüyorsa",
     4.069,
     4.672
    ],
    [
     "sağ",
     4.672,
     4.822
    ],
    [
     "uca",
     4.822,
     5.124
    ],
    [
     "yakın.",
     5.124,
     5.425
    ],
    [
     "Elinden",
     5.495,
     6.036
    ],
    [
     "geleni",
     6.036,
     6.577
    ],
    [
     "yapıp",
     6.577,
     6.938
    ],
    [
     "şükreden",
     6.938,
     7.48
    ],
    [
     "ve",
     7.48,
     7.66
    ],
    [
     "gelişmeye",
     7.66,
     8.382
    ],
    [
     "açık",
     8.382,
     8.742
    ],
    [
     "biri",
     8.742,
     9.103
    ],
    [
     "söylüyorsa",
     9.103,
     9.825
    ],
    [
     "orta",
     9.825,
     10.186
    ],
    [
     "uca",
     10.186,
     10.547
    ],
    [
     "yakın.",
     10.547,
     10.907
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
