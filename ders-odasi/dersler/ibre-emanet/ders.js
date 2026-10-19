/* İbremetre · Emanet — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Safdillik · Emanet · Hıyânet). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-emanet",
 "ad": "Emanet: İbren Nerede?",
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
      "İbre cümleye değil, o an bırakılana nasıl davrandığımıza bakar. Emanet; bırakılanı özenle korumak, sahibine zamanında geri vermek ve sözünde durmaktır. Hata yapmak ile ihanet aynı şey değildir: kazayla zarar vermek hatadır; bilerek gizlemek ya da izinsiz kullanmak güveni yıkar. Bu yüzden hata olduğunda hemen söylemek emanete sadakattir.",
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
       "soru": "Her söze hemen kanmak neye benziyor?",
       "ad": "Safdillik",
       "soz": "Kim isterse versin, kim bilir iyi niyetlidir.",
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
          "m": "Bu bana emanet; sahibine vereceğim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: emanetin sesi."
         },
         {
          "m": "Bende duruyor; ben kullanırım, kimse bilmez.",
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
        "Sahibi güvenini boşa çıkmış bulur.",
        "Bir daha ona hiçbir şey emanet edilmez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bende duruyor; ben kullanırım, kimse bilmez.",
          "dogru": true,
          "not": "Hıyânet, emanete ihanet edip güveni yıkmaktır. Kazayla zarar vermek başkadır; bilerek gizlemek ihanettir."
         },
         {
          "m": "Kim isterse verebilirim; hepsi iyidir.",
          "dogru": false,
          "not": "Bu sol ucun sesi: safdilliğin sesi."
         },
         {
          "m": "Bu bana emanet; sahibine vereceğim.",
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
        "Bir"
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
          "m": "Bu bana emanet; sahibine vereceğim.",
          "dogru": true,
          "not": "Emanet, bırakılanı özenle korumak ve sözünde durmaktır. Kime vereceğini düşünmek de buna dahildir."
         },
         {
          "m": "Kim isterse verebilirim; hepsi iyidir.",
          "dogru": false,
          "not": "Bu sol ucun sesi: safdilliğin sesi."
         },
         {
          "m": "Bende duruyor; ben kullanırım, kimse bilmez.",
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
       "tetik": "Arkadaşın sana defterini bıraktı ve yarın isterim, dedi. Teneffüste biri gelip bu defteri bana ver, diyor.",
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
       "baslik": "Kırılan kalem",
       "tetik": "Ödünç aldığın kalem kazayla kırıldı. Yanındaki arkadaşın önemli değil, söyleme, diyor.",
       "secenekler": [
        {
         "m": "Önemli değilmiş, ona inanıp söylemem.",
         "zon": "az",
         "sonuc": "Kalem sorulunca ne diyeceğini bilemiyorsun; güven zedeleniyor.",
         "not": "İbre sola kaydı: her söze inanmak, sorumluluğu unutturuyor.",
         "ses": "s2az"
        },
        {
         "m": "Kırık kalemi saklarım; kimse bilmeyecek.",
         "zon": "fazla",
         "sonuc": "Sakladığın her gün içinde yük oluyor; sonunda güveni yıkıyor.",
         "not": "İbre sağa kaydı: kazayı gizlemek hatayı ihanete çeviriyor.",
         "ses": "s2fa"
        },
        {
         "m": "Kazayla kırıldı; hemen söyleyip yenisini almayı öneririm.",
         "zon": "orta",
         "sonuc": "Arkadaşın üzülüyor ama dürüstlüğünü görüp teşekkür ediyor.",
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
   "sure": 8.369,
   "m": "Sol uçta Safdillik. Kim isterse versin, kim bilir iyi niyetlidir. Arkadaşının bıraktığı defteri isteyen birine uzatır.",
   "k": [
    [
     "Sol",
     0.03,
     0.177
    ],
    [
     "uçta",
     0.177,
     0.47
    ],
    [
     "Safdillik.",
     0.47,
     0.91
    ],
    [
     "Kim",
     1.145,
     1.302
    ],
    [
     "isterse",
     1.302,
     1.772
    ],
    [
     "versin,",
     1.772,
     2.085
    ],
    [
     "kim",
     2.64,
     2.76
    ],
    [
     "bilir",
     2.76,
     3.0
    ],
    [
     "iyi",
     3.0,
     3.24
    ],
    [
     "niyetlidir.",
     3.24,
     3.72
    ],
    [
     "Arkadaşının",
     3.94,
     4.978
    ],
    [
     "bıraktığı",
     4.978,
     5.808
    ],
    [
     "defteri",
     5.808,
     6.431
    ],
    [
     "isteyen",
     6.431,
     7.054
    ],
    [
     "birine",
     7.054,
     7.677
    ],
    [
     "uzatır.",
     7.677,
     8.299
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
   "sure": 6.559,
   "m": "Sonra ne olur? Sahibi güvenini boşa çıkmış bulur. Bir daha ona hiçbir şey emanet edilmez.",
   "k": [
    [
     "Sonra",
     0.03,
     0.436
    ],
    [
     "ne",
     0.436,
     0.639
    ],
    [
     "olur?",
     0.639,
     1.045
    ],
    [
     "Sahibi",
     1.14,
     1.588
    ],
    [
     "güvenini",
     1.588,
     2.185
    ],
    [
     "boşa",
     2.185,
     2.483
    ],
    [
     "çıkmış",
     2.483,
     2.782
    ],
    [
     "bulur.",
     2.782,
     3.08
    ],
    [
     "Bir",
     3.55,
     3.76
    ],
    [
     "daha",
     3.76,
     4.18
    ],
    [
     "ona",
     4.18,
     4.6
    ],
    [
     "hiçbir",
     4.6,
     5.02
    ],
    [
     "şey",
     5.02,
     5.23
    ],
    [
     "emanet",
     5.23,
     5.86
    ],
    [
     "edilmez.",
     5.86,
     6.489
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
   "sure": 6.553,
   "m": "Arkadaşın sana defterini bıraktı ve yarın isterim, dedi. Teneffüste biri gelip bu defteri bana ver, diyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.588
    ],
    [
     "sana",
     0.588,
     0.867
    ],
    [
     "defterini",
     0.867,
     1.425
    ],
    [
     "bıraktı",
     1.425,
     1.843
    ],
    [
     "ve",
     1.843,
     1.983
    ],
    [
     "yarın",
     1.983,
     2.262
    ],
    [
     "isterim,",
     2.262,
     2.68
    ],
    [
     "dedi.",
     2.98,
     3.205
    ],
    [
     "Teneffüste",
     3.445,
     4.057
    ],
    [
     "biri",
     4.057,
     4.363
    ],
    [
     "gelip",
     4.363,
     4.669
    ],
    [
     "bu",
     4.669,
     4.822
    ],
    [
     "defteri",
     4.822,
     5.281
    ],
    [
     "bana",
     5.281,
     5.587
    ],
    [
     "ver,",
     5.587,
     5.74
    ],
    [
     "diyor.",
     5.945,
     6.124
    ],
    [
     "Ne",
     6.124,
     6.214
    ],
    [
     "yaparsın?",
     6.214,
     6.483
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
   "sure": 7.195,
   "m": "Ödünç aldığın kalem kazayla kırıldı. Yanındaki arkadaşın önemli değil, söyleme, diyor. Ne yaparsın?",
   "k": [
    [
     "Ödünç",
     0.03,
     0.302
    ],
    [
     "aldığın",
     0.302,
     0.711
    ],
    [
     "kalem",
     0.711,
     0.983
    ],
    [
     "kazayla",
     0.983,
     1.392
    ],
    [
     "kırıldı.",
     1.392,
     1.8
    ],
    [
     "Yanındaki",
     2.4,
     3.168
    ],
    [
     "arkadaşın",
     3.168,
     3.935
    ],
    [
     "önemli",
     3.935,
     4.511
    ],
    [
     "değil,",
     4.511,
     4.895
    ],
    [
     "söyleme,",
     5.685,
     6.18
    ],
    [
     "diyor.",
     7.165,
     7.198
    ],
    [
     "Ne",
     7.198,
     7.215
    ],
    [
     "yaparsın?",
     7.215,
     7.265
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.199,
   "m": "Kalem sorulunca ne diyeceğini bilemiyorsun; güven zedeleniyor.",
   "k": [
    [
     "Kalem",
     0.03,
     0.251
    ],
    [
     "sorulunca",
     0.251,
     0.694
    ],
    [
     "ne",
     0.694,
     0.804
    ],
    [
     "diyeceğini",
     0.804,
     1.357
    ],
    [
     "bilemiyorsun;",
     1.357,
     1.91
    ],
    [
     "güven",
     2.235,
     2.49
    ],
    [
     "zedeleniyor.",
     2.49,
     3.129
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 6.683,
   "m": "Sakladığın her gün içinde yük oluyor; sonunda güveni yıkıyor.",
   "k": [
    [
     "Sakladığın",
     0.03,
     1.032
    ],
    [
     "her",
     1.032,
     1.282
    ],
    [
     "gün",
     1.282,
     1.532
    ],
    [
     "içinde",
     1.532,
     2.283
    ],
    [
     "yük",
     2.283,
     2.534
    ],
    [
     "oluyor;",
     2.534,
     3.285
    ],
    [
     "sonunda",
     3.785,
     4.728
    ],
    [
     "güveni",
     4.728,
     5.67
    ],
    [
     "yıkıyor.",
     5.67,
     6.613
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.63,
   "m": "Arkadaşın üzülüyor ama dürüstlüğünü görüp teşekkür ediyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.644
    ],
    [
     "üzülüyor",
     0.644,
     1.258
    ],
    [
     "ama",
     1.258,
     1.565
    ],
    [
     "dürüstlüğünü",
     1.565,
     2.332
    ],
    [
     "görüp",
     2.332,
     2.639
    ],
    [
     "teşekkür",
     2.639,
     3.1
    ],
    [
     "ediyor.",
     3.1,
     3.56
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
