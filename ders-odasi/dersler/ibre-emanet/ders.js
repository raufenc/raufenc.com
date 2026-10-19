/* İbremetre · Emanet — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Safdillik · Emanet · Hıyânet). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-emanet",
 "ad": "Emanet: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "iliski",
 "muzik": "iliski",
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
     "huy": "Emanet",
     "huyAnahtar": "Emanet",
     "olculen": "Bana bırakılana davranış biçimim",
     "kanca": "O bana bıraktı, ben bilirim.",
     "uclar": {
      "az": "Safdillik",
      "orta": "Emanet",
      "fazla": "Hıyânet"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Emanet",
     "cumle": "O bana bıraktı, ben bilirim.",
     "uclar": {
      "az": "Safdillik",
      "orta": "Emanet",
      "fazla": "Hıyânet"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi bırakılan şeyin kendisine güvenildiği için verildiğini biliyor ve onu korumayı üstleniyor: orta uca yakın. Başka okumada bırakılanı kendi malı sayıp istediği gibi kullanıyor: sağ uca (Hıyânet) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an bırakılana nasıl davrandığımıza bakar. Emanet; bırakılanı özenle korumak, sahibine zamanında geri vermek ve sözünde durmaktır. Hata yapmak ile ihanet aynı şey değildir: kazayla zarar vermek hatadır; bilerek gizlemek ya da izinsiz kullanmak güveni yıkar. Bu yüzden hata olduğunda hemen söylemek emanete sadakattir. Bu ibrede sol uç (Safdillik), bırakılanı kimin istediğine bakmadan vermektir; sağ uç bırakılanı kendi malı gibi kullanmaktır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Emanet",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Safdillik",
      "orta": "Emanet",
      "fazla": "Hıyânet"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Emaneti isteyen herkese vermek neye benziyor?",
       "ad": "Safdillik",
       "soz": "Kim isterse veririm, belki iyi niyetlidir.",
       "eylem": "saskin",
       "zincir": [
        "Sahibi emanetini geri bulamaz.",
        "Güven için dikkat gerektiğini acı yoldan öğrenir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Kim isterse verebilirim; hepsi iyidir.",
          "dogru": true,
          "not": "Safdillik, her söze hemen inanıp kolay aldanmaktır. Emanet, kime verileceğini düşünmeyi de ister."
         },
         {
          "m": "Bu benim değil; özenle saklayıp zamanında geri veririm.",
          "dogru": false,
          "not": "Bu orta ucun sesi: emanetin sesi."
         },
         {
          "m": "Sahibi görmüyor; ben kullanırsam kimse anlamaz.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hıyânetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Safdillik",
        "soz": "Kim"
       },
       "zincirAnahtar": [
        "Sahibi",
        "Güven"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Bırakılanı kendine saklamak neye benziyor?",
       "ad": "Hıyânet",
       "soz": "Bende duruyor, kullanırım, kimse bilmez.",
       "eylem": "isaret",
       "zincir": [
        "Sahibi güveninin boşa çıktığını görür.",
        "Güveni yeniden kazanmak zaman alır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Sahibi görmüyor; ben kullanırsam kimse anlamaz.",
          "dogru": true,
          "not": "Hıyânet, emanete ihanet edip güveni yıkmaktır. Kazayla zarar vermek başkadır; bilerek gizlemek ihanettir."
         },
         {
          "m": "Kim isterse verebilirim; hepsi iyidir.",
          "dogru": false,
          "not": "Bu sol ucun sesi: safdilliğin sesi."
         },
         {
          "m": "Bu benim değil; özenle saklayıp zamanında geri veririm.",
          "dogru": false,
          "not": "Bu orta ucun sesi: emanetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hıyânet",
        "soz": "Bende"
       },
       "zincirAnahtar": [
        "Sahibi",
        "Güveni"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Emanet",
       "soz": "Bu bana emanet; sahibine vereceğim.",
       "eylem": "konus",
       "zincir": [
        "Sahibi emanetini güvenle geri alır.",
        "Arkadaşlık güvenle derinleşir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bu benim değil; özenle saklayıp zamanında geri veririm.",
          "dogru": true,
          "not": "Emanet, bırakılanı özenle korumak ve sözünde durmaktır. Kime vereceğini düşünmek de buna dahildir."
         },
         {
          "m": "Kim isterse verebilirim; hepsi iyidir.",
          "dogru": false,
          "not": "Bu sol ucun sesi: safdilliğin sesi."
         },
         {
          "m": "Sahibi görmüyor; ben kullanırsam kimse anlamaz.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hıyânetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Emanet",
        "soz": "Bu"
       },
       "zincirAnahtar": [
        "Sahibi",
        "Arkadaşlık"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Emanet",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Safdillik",
      "orta": "Emanet",
      "fazla": "Hıyânet"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "defter",
       "baslik": "Ödünç defter",
       "tetik": "Arkadaşın sana defterini bıraktı ve “yarın isterim,” dedi. Teneffüste biri gelip “bu defteri bana ver,” diyor.",
       "secenekler": [
        {
         "m": "Tamam, al; belki doğru söylüyordur.",
         "zon": "az",
         "sonuc": "Defter sahibinden uzaklaşıyor; yarın arkadaşına verecek bir şeyin kalmıyor.",
         "not": "İbre sola kaydı: her söze kanmak emaneti kolay kaptırıyor.",
         "ses": "s1az"
        },
        {
         "m": "Bende kalsın; arkadaşım zaten fark etmez.",
         "zon": "fazla",
         "sonuc": "Arkadaşın güveni boşa çıkıyor; defterini bulamayınca üzülüyor.",
         "not": "İbre sağa kaydı: emaneti kendinmiş gibi görmek güveni yıkıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Bu defter benim değil; sahibi gelmeden veremem.",
         "zon": "orta",
         "sonuc": "Defter yarın yerine ulaşıyor; arkadaşının güvenini koruyorsun.",
         "not": "İbre ortada: emaneti kime vereceğini düşünüp korudun.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kirik",
       "baslik": "Kırılan şemsiye",
       "tetik": "Ödünç aldığın şemsiye rüzgârda kazayla kırıldı. Yanındaki arkadaşın “önemli değil, söyleme,” diyor.",
       "secenekler": [
        {
         "m": "Madem önemli değil, ben de unuturum.",
         "zon": "az",
         "sonuc": "Şemsiye sorulunca ne diyeceğini bilemiyorsun; güven zedeleniyor.",
         "not": "İbre sola kaydı: her söze inanmak, sorumluluğu unutturuyor.",
         "ses": "s2az"
        },
        {
         "m": "Kırık şemsiyeyi saklarım; kimse bilmeyecek.",
         "zon": "fazla",
         "sonuc": "Sakladıkça içinde yük oluyor; sahibi öğrendiğinde güven azalıyor.",
         "not": "İbre sağa kaydı: kazayı gizlemek hatayı ihanete çeviriyor.",
         "ses": "s2fa"
        },
        {
         "m": "Kazayla kırıldı; hemen söyleyip yenisini almayı öneririm.",
         "zon": "orta",
         "sonuc": "Arkadaşın biraz üzülüyor ama dürüstlüğünü görüyor; güven korunuyor.",
         "not": "İbre ortada: kaza ile ihanet farklıdır; hemen söylemek güveni korur.",
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
       "ad": "Az · Safdillik",
       "aciklama": "Kolayca kanıp kaptırmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Emanet",
       "aciklama": "Emaneti özenle korumak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Hıyânet",
       "aciklama": "Emanete ihanet etmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşının bıraktığı çantayı, “bana lazım” diyen ilk kişiye uzatır.",
       "alan": "az",
       "ipucu": "Kolayca kanıyor."
      },
      {
       "id": "k2",
       "metin": "Ödünç aldığı oyuncağı sahibinden gizleyip kendi kutusuna koyar.",
       "alan": "fazla",
       "ipucu": "Bırakılanı kendine saklıyor."
      },
      {
       "id": "k3",
       "metin": "Ödünç aldığı kitabı özenle saklar, söz verdiği gün geri verir.",
       "alan": "orta",
       "ipucu": "Emaneti özenle koruyor."
      },
      {
       "id": "k4",
       "metin": "Arkadaşının emanet ettiği eşyayı, “benimdir” diyen birine teslim eder.",
       "alan": "az",
       "ipucu": "Her söze inanıyor."
      },
      {
       "id": "k5",
       "metin": "Kendisine bırakılan harçlığı izinsiz harcar.",
       "alan": "fazla",
       "ipucu": "Güveni boşa çıkarıyor."
      },
      {
       "id": "k6",
       "metin": "Kırdığı eşyayı hemen söyler ve özür diler.",
       "alan": "orta",
       "ipucu": "Kazayı dürüstçe söylüyor."
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
        "Biri bana bir şey emanet edince",
        "Biri emanetimi isteyince",
        "Bir eşyayı kırınca",
        "Tanımadığım birinin sözüne inanacakken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Emaneti kime vereceğimi önce sahibine soracağım",
        "Kazayla bozulursa hemen sahibine söyleyeceğim",
        "Emin olamazsam güvendiğim bir yetişkine danışacağım"
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
       "baslik": "Emanet",
       "metin": "bırakılanı korumak",
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
   "sure": 1.819,
   "m": "O bana bıraktı, ben bilirim.",
   "k": [
    [
     "O",
     0.03,
     0.174
    ],
    [
     "bana",
     0.174,
     0.463
    ],
    [
     "bıraktı,",
     0.463,
     0.895
    ],
    [
     "ben",
     1.15,
     1.3
    ],
    [
     "bilirim.",
     1.3,
     1.749
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.524,
   "m": "Birçok güzel huy bir ibre gibidir. Emanet, bana bırakılana nasıl davrandığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.463
    ],
    [
     "güzel",
     0.463,
     0.895
    ],
    [
     "huy",
     0.895,
     1.112
    ],
    [
     "bir",
     1.112,
     1.328
    ],
    [
     "ibre",
     1.328,
     1.761
    ],
    [
     "gibidir.",
     1.761,
     2.41
    ],
    [
     "Emanet,",
     3.095,
     3.8
    ],
    [
     "bana",
     3.885,
     4.312
    ],
    [
     "bırakılana",
     4.312,
     5.379
    ],
    [
     "nasıl",
     5.379,
     5.806
    ],
    [
     "davrandığımı",
     5.806,
     6.873
    ],
    [
     "ölçer.",
     6.873,
     7.3
    ],
    [
     "İbre",
     7.545,
     7.974
    ],
    [
     "üç",
     7.974,
     8.188
    ],
    [
     "yerde",
     8.188,
     8.617
    ],
    [
     "durabilir:",
     8.617,
     9.475
    ],
    [
     "az,",
     9.895,
     10.655
    ],
    [
     "kararında,",
     11.05,
     11.319
    ],
    [
     "fazla.",
     11.319,
     11.454
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
   "sure": 6.993,
   "m": "Sol uçta Safdillik. Kim isterse veririm, belki iyi niyetlidir. Arkadaşının bıraktığı defteri isteyen birine uzatır.",
   "k": [
    [
     "Sol",
     0.03,
     0.233
    ],
    [
     "uçta",
     0.233,
     0.638
    ],
    [
     "Safdillik.",
     0.638,
     1.245
    ],
    [
     "Kim",
     1.32,
     1.323
    ],
    [
     "isterse",
     1.323,
     1.331
    ],
    [
     "veririm,",
     1.331,
     1.34
    ],
    [
     "belki",
     1.81,
     2.039
    ],
    [
     "iyi",
     2.039,
     2.268
    ],
    [
     "niyetlidir.",
     2.268,
     2.725
    ],
    [
     "Arkadaşının",
     2.875,
     3.839
    ],
    [
     "bıraktığı",
     3.839,
     4.61
    ],
    [
     "defteri",
     4.61,
     5.188
    ],
    [
     "isteyen",
     5.188,
     5.766
    ],
    [
     "birine",
     5.766,
     6.344
    ],
    [
     "uzatır.",
     6.344,
     6.923
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.9,
   "m": "Sonra ne olur? Sahibi emanetini geri bulamaz. Güven için dikkat gerektiğini acı yoldan öğrenir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.27
    ],
    [
     "ne",
     0.27,
     0.39
    ],
    [
     "olur?",
     0.39,
     0.63
    ],
    [
     "Sahibi",
     1.065,
     1.463
    ],
    [
     "emanetini",
     1.463,
     2.127
    ],
    [
     "geri",
     2.127,
     2.392
    ],
    [
     "bulamaz.",
     2.392,
     2.79
    ],
    [
     "Güven",
     3.16,
     3.457
    ],
    [
     "için",
     3.457,
     3.753
    ],
    [
     "dikkat",
     3.753,
     4.05
    ],
    [
     "gerektiğini",
     4.05,
     4.792
    ],
    [
     "acı",
     4.792,
     5.088
    ],
    [
     "yoldan",
     5.088,
     5.385
    ],
    [
     "öğrenir.",
     5.385,
     5.83
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
   "sure": 6.989,
   "m": "Sağ uçta Hıyânet. Bende duruyor, kullanırım, kimse bilmez. Bırakılan şeyi sahibinden gizli kullanır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.235
    ],
    [
     "uçta",
     0.235,
     0.645
    ],
    [
     "Hıyânet.",
     0.645,
     1.26
    ],
    [
     "Bende",
     1.725,
     1.969
    ],
    [
     "duruyor,",
     1.969,
     2.335
    ],
    [
     "kullanırım,",
     2.64,
     3.075
    ],
    [
     "kimse",
     3.47,
     3.772
    ],
    [
     "bilmez.",
     3.772,
     4.075
    ],
    [
     "Bırakılan",
     4.75,
     5.328
    ],
    [
     "şeyi",
     5.328,
     5.618
    ],
    [
     "sahibinden",
     5.618,
     6.196
    ],
    [
     "gizli",
     6.196,
     6.485
    ],
    [
     "kullanır.",
     6.485,
     6.919
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.158,
   "m": "Sonra ne olur? Sahibi güveninin boşa çıktığını görür. Güveni yeniden kazanmak zaman alır.",
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
     "Sahibi",
     1.04,
     1.514
    ],
    [
     "güveninin",
     1.514,
     2.146
    ],
    [
     "boşa",
     2.146,
     2.462
    ],
    [
     "çıktığını",
     2.462,
     3.094
    ],
    [
     "görür.",
     3.094,
     3.41
    ],
    [
     "Güveni",
     3.835,
     4.355
    ],
    [
     "yeniden",
     4.355,
     4.875
    ],
    [
     "kazanmak",
     4.875,
     5.395
    ],
    [
     "zaman",
     5.395,
     5.742
    ],
    [
     "alır.",
     5.742,
     6.088
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
   "sure": 8.066,
   "m": "Tam kararında Emanet. Bu bana emanet; sahibine vereceğim. Özenle saklar ve istenince geri verir.",
   "k": [
    [
     "Tam",
     0.03,
     0.237
    ],
    [
     "kararında",
     0.237,
     1.064
    ],
    [
     "Emanet.",
     1.064,
     1.685
    ],
    [
     "Bu",
     2.125,
     2.32
    ],
    [
     "bana",
     2.32,
     2.71
    ],
    [
     "emanet;",
     2.71,
     3.295
    ],
    [
     "sahibine",
     3.58,
     4.047
    ],
    [
     "vereceğim.",
     4.047,
     4.515
    ],
    [
     "Özenle",
     4.88,
     5.548
    ],
    [
     "saklar",
     5.548,
     5.993
    ],
    [
     "ve",
     5.993,
     6.216
    ],
    [
     "istenince",
     6.216,
     7.106
    ],
    [
     "geri",
     7.106,
     7.551
    ],
    [
     "verir.",
     7.551,
     7.996
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.688,
   "m": "Sonra ne olur? Sahibi emanetini güvenle geri alır. Arkadaşlık güvenle derinleşir.",
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
     "Sahibi",
     0.945,
     1.418
    ],
    [
     "emanetini",
     1.418,
     2.206
    ],
    [
     "güvenle",
     2.206,
     2.679
    ],
    [
     "geri",
     2.679,
     2.995
    ],
    [
     "alır.",
     2.995,
     3.31
    ],
    [
     "Arkadaşlık",
     3.75,
     4.429
    ],
    [
     "güvenle",
     4.429,
     4.938
    ],
    [
     "derinleşir.",
     4.938,
     5.618
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
   "sure": 6.865,
   "m": "Arkadaşın sana defterini bıraktı ve yarın isterim, dedi. Teneffüste biri gelip bu defteri bana ver, diyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.578
    ],
    [
     "sana",
     0.578,
     0.853
    ],
    [
     "defterini",
     0.853,
     1.401
    ],
    [
     "bıraktı",
     1.401,
     1.812
    ],
    [
     "ve",
     1.812,
     1.949
    ],
    [
     "yarın",
     1.949,
     2.224
    ],
    [
     "isterim,",
     2.224,
     2.635
    ],
    [
     "dedi.",
     3.025,
     3.235
    ],
    [
     "Teneffüste",
     3.92,
     4.464
    ],
    [
     "biri",
     4.464,
     4.736
    ],
    [
     "gelip",
     4.736,
     5.008
    ],
    [
     "bu",
     5.008,
     5.144
    ],
    [
     "defteri",
     5.144,
     5.552
    ],
    [
     "bana",
     5.552,
     5.824
    ],
    [
     "ver,",
     5.824,
     5.96
    ],
    [
     "diyor.",
     6.225,
     6.415
    ],
    [
     "Ne",
     6.415,
     6.51
    ],
    [
     "yaparsın?",
     6.51,
     6.795
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.651,
   "m": "Defter sahibinden uzaklaşıyor; yarın arkadaşına verecek bir şeyin kalmıyor.",
   "k": [
    [
     "Defter",
     0.03,
     0.331
    ],
    [
     "sahibinden",
     0.331,
     0.933
    ],
    [
     "uzaklaşıyor;",
     0.933,
     1.685
    ],
    [
     "yarın",
     1.825,
     2.169
    ],
    [
     "arkadaşına",
     2.169,
     3.031
    ],
    [
     "verecek",
     3.031,
     3.547
    ],
    [
     "bir",
     3.547,
     3.72
    ],
    [
     "şeyin",
     3.72,
     4.064
    ],
    [
     "kalmıyor.",
     4.064,
     4.581
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.358,
   "m": "Arkadaşın güveni boşa çıkıyor; defterini bulamayınca üzülüyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.525
    ],
    [
     "güveni",
     0.525,
     0.896
    ],
    [
     "boşa",
     0.896,
     1.144
    ],
    [
     "çıkıyor;",
     1.144,
     1.515
    ],
    [
     "defterini",
     1.68,
     2.175
    ],
    [
     "bulamayınca",
     2.175,
     2.793
    ],
    [
     "üzülüyor.",
     2.793,
     3.288
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.162,
   "m": "Defter yarın yerine ulaşıyor; arkadaşının güvenini koruyorsun.",
   "k": [
    [
     "Defter",
     0.03,
     0.279
    ],
    [
     "yarın",
     0.279,
     0.528
    ],
    [
     "yerine",
     0.528,
     0.902
    ],
    [
     "ulaşıyor;",
     0.902,
     1.4
    ],
    [
     "arkadaşının",
     1.525,
     2.128
    ],
    [
     "güvenini",
     2.128,
     2.61
    ],
    [
     "koruyorsun.",
     2.61,
     3.092
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.074,
   "m": "Ödünç aldığın şemsiye rüzgârda kazayla kırıldı. Yanındaki arkadaşın önemli değil, söyleme, diyor. Ne yaparsın?",
   "k": [
    [
     "Ödünç",
     0.03,
     0.309
    ],
    [
     "aldığın",
     0.309,
     0.727
    ],
    [
     "şemsiye",
     0.727,
     1.145
    ],
    [
     "rüzgârda",
     1.145,
     1.564
    ],
    [
     "kazayla",
     1.564,
     1.982
    ],
    [
     "kırıldı.",
     1.982,
     2.4
    ],
    [
     "Yanındaki",
     2.76,
     3.475
    ],
    [
     "arkadaşın",
     3.475,
     4.191
    ],
    [
     "önemli",
     4.191,
     4.727
    ],
    [
     "değil,",
     4.727,
     5.085
    ],
    [
     "söyleme,",
     5.55,
     5.701
    ],
    [
     "diyor.",
     5.701,
     5.802
    ],
    [
     "Ne",
     5.802,
     5.853
    ],
    [
     "yaparsın?",
     5.853,
     6.004
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.498,
   "m": "Şemsiye sorulunca ne diyeceğini bilemiyorsun; güven zedeleniyor.",
   "k": [
    [
     "Şemsiye",
     0.03,
     0.365
    ],
    [
     "sorulunca",
     0.365,
     0.812
    ],
    [
     "ne",
     0.812,
     0.923
    ],
    [
     "diyeceğini",
     0.923,
     1.482
    ],
    [
     "bilemiyorsun;",
     1.482,
     2.04
    ],
    [
     "güven",
     2.425,
     2.711
    ],
    [
     "zedeleniyor.",
     2.711,
     3.428
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.259,
   "m": "Sakladıkça içinde yük oluyor; sahibi öğrendiğinde güven azalıyor.",
   "k": [
    [
     "Sakladıkça",
     0.03,
     0.661
    ],
    [
     "içinde",
     0.661,
     1.134
    ],
    [
     "yük",
     1.134,
     1.292
    ],
    [
     "oluyor;",
     1.292,
     1.765
    ],
    [
     "sahibi",
     2.075,
     2.528
    ],
    [
     "öğrendiğinde",
     2.528,
     3.283
    ],
    [
     "güven",
     3.283,
     3.585
    ],
    [
     "azalıyor.",
     3.585,
     4.189
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.272,
   "m": "Arkadaşın biraz üzülüyor ama dürüstlüğünü görüyor; güven korunuyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.533
    ],
    [
     "biraz",
     0.533,
     0.784
    ],
    [
     "üzülüyor",
     0.784,
     1.288
    ],
    [
     "ama",
     1.288,
     1.539
    ],
    [
     "dürüstlüğünü",
     1.539,
     2.168
    ],
    [
     "görüyor;",
     2.168,
     2.545
    ],
    [
     "güven",
     2.905,
     3.337
    ],
    [
     "korunuyor.",
     3.337,
     4.202
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
   "sure": 9.603,
   "m": "Bu cümle bilerek çift anlamlı. Bırakılanı korumayı üstlenen biri söylüyorsa orta uca yakın. Bırakılanı kendi malı sayan biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.205
    ],
    [
     "cümle",
     0.205,
     0.555
    ],
    [
     "bilerek",
     0.555,
     1.08
    ],
    [
     "çift",
     1.08,
     1.255
    ],
    [
     "anlamlı.",
     1.255,
     1.78
    ],
    [
     "Bırakılanı",
     1.875,
     2.679
    ],
    [
     "korumayı",
     2.679,
     3.323
    ],
    [
     "üstlenen",
     3.323,
     3.805
    ],
    [
     "biri",
     3.805,
     4.127
    ],
    [
     "söylüyorsa",
     4.127,
     4.77
    ],
    [
     "orta",
     4.77,
     5.092
    ],
    [
     "uca",
     5.092,
     5.413
    ],
    [
     "yakın.",
     5.413,
     5.735
    ],
    [
     "Bırakılanı",
     5.825,
     6.668
    ],
    [
     "kendi",
     6.668,
     7.005
    ],
    [
     "malı",
     7.005,
     7.342
    ],
    [
     "sayan",
     7.342,
     7.679
    ],
    [
     "biri",
     7.679,
     8.016
    ],
    [
     "söylüyorsa",
     8.016,
     8.69
    ],
    [
     "sağ",
     8.69,
     8.859
    ],
    [
     "uca",
     8.859,
     9.196
    ],
    [
     "yakın.",
     9.196,
     9.533
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
