/* İbremetre · Şecâat — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Cübn · Şecâat · Tehevvür). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-secaat",
 "ad": "Şecâat: İbren Nerede?",
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
     "huy": "Şecâat",
     "olculen": "Korku karşısında hareket biçimim",
     "kanca": "Ben hiçbir şeyden korkmam!",
     "uclar": {
      "az": "Cübn",
      "orta": "Şecâat",
      "fazla": "Tehevvür"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Şecâat",
     "cumle": "Ben hiçbir şeyden korkmam!",
     "uclar": {
      "az": "Cübn",
      "orta": "Şecâat",
      "fazla": "Tehevvür"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi tehlikeyi tartmadan atılıyor: sağ uca (Tehevvür) yakın. Başka okumada kendini cesaretlendiriyor ve yine de akıllıca davranıyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an korkuya karşı ne yaptığımıza bakar. Şecâat korkmamak değildir; korksan da akıllıca ve doğru olanı yapabilmektir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Şecâat",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Cübn",
      "orta": "Şecâat",
      "fazla": "Tehevvür"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Korkunca donup kalmak neye benziyor?",
       "ad": "Cübn",
       "soz": "Ben yapamam, hiçbir şey yapamam.",
       "eylem": "yaslan",
       "zincir": [
        "Yardım isteyebileceği kişiye durumu anlatamaz.",
        "Korku büyüdükçe atabileceği küçük adımları da göremez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben yapamam; bir şey yapmasam daha iyi.",
          "dogru": true,
          "not": "Cübn, tehlike karşısında hiç cesaret gösterememektir. Korkmak doğal; donup kalmak ise yardımı da engeller."
         },
         {
          "m": "Korkuyorum ama bir büyüğüme söyleyeceğim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: şecâatin sesi."
         },
         {
          "m": "Ben hallederim; kimseye söylemeye gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: tehevvürün sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Cübn",
        "soz": "Ben"
       },
       "zincirAnahtar": [
        "Yardım",
        "Korku"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Düşünmeden atılan kişi neyi kaçırır?",
       "ad": "Tehevvür",
       "soz": "Ben hallederim, hiçbir şey olmaz!",
       "eylem": "isaret",
       "zincir": [
        "Önce kendisi tehlikeye girer.",
        "Yetişkinlerin yardım edebileceği an da kaçmış olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben hallederim; düşünmeye gerek yok.",
          "dogru": true,
          "not": "Tehevvür, sonunu düşünmeden kendini tehlikeye atmaktır. Bu cesaret değil, acelecilik."
         },
         {
          "m": "Ben yapamam; bir şey yapmasam daha iyi.",
          "dogru": false,
          "not": "Bu sol ucun sesi: cübnün sesi."
         },
         {
          "m": "Korkuyorum ama bir büyüğüme söyleyeceğim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: şecâatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tehevvür",
        "soz": "Ben"
       },
       "zincirAnahtar": [
        "Önce",
        "Yetişkinlerin"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Şecâat",
       "soz": "Korkuyorum ama bir büyüğüme söyleyeceğim.",
       "eylem": "konus",
       "zincir": [
        "Tehlikeden uzaklaşıp yardım ister.",
        "Hem kendini hem çevresini korumuş olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Korkuyorum ama durup düşünür, yardım isterim.",
          "dogru": true,
          "not": "Şecâat, korkmamak değil; korksa da akıllıca ve doğru olanı yapmaktır."
         },
         {
          "m": "Ben yapamam; bir şey yapmasam daha iyi.",
          "dogru": false,
          "not": "Bu sol ucun sesi: cübnün sesi."
         },
         {
          "m": "Ben hallederim; düşünmeye gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: tehevvürün sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Şecâat",
        "soz": "Korkuyorum"
       },
       "zincirAnahtar": [
        "Tehlikeden",
        "Hem"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Şecâat",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Cübn",
      "orta": "Şecâat",
      "fazla": "Tehevvür"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "yol",
       "baslik": "Yoldaki yabancı",
       "tetik": "Okuldan dönerken tanımadığın biri seni durdurup, gel seni götüreyim, diyor.",
       "secenekler": [
        {
         "m": "Korkudan hiçbir şey yapamam; olduğum yerde kalırım.",
         "zon": "az",
         "sonuc": "Zaman geçiyor ama kimseye haber veremiyorsun; yalnız kalıyorsun.",
         "not": "İbre sola kaydı: korkudan donmak, yardım çağırmayı da engelliyor.",
         "ses": "s1az"
        },
        {
         "m": "Ben hallederim; yanına gidip bakayım.",
         "zon": "fazla",
         "sonuc": "Yaklaşıyorsun ve tehlikeyi tartmadan kendini işin içine atmış oluyorsun.",
         "not": "İbre sağa kaydı: tehlikeyi tartmadan atılmak, cesaret değil.",
         "ses": "s1fa"
        },
        {
         "m": "Hayır, gelmiyorum! Kalabalığa ya da bir yetişkine giderim.",
         "zon": "orta",
         "sonuc": "Güvenli bir yere gidip olanı bir yetişkine anlatıyorsun. Korksan da doğru olanı yaptın.",
         "not": "İbre ortada: korkuya rağmen akıllıca ve doğru davrandın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "haksiz",
       "baslik": "Haksızlık",
       "tetik": "Sınıfta bir arkadaşına haksızlık yapılıyor ve sen bunu görüyorsun.",
       "secenekler": [
        {
         "m": "Ben karışmam, bana bir şey olmasın.",
         "zon": "az",
         "sonuc": "Arkadaşın yalnız kalıyor; sen de içinde rahat edemiyorsun.",
         "not": "İbre sola kaydı: korku, doğruya el uzatmayı engelliyor.",
         "ses": "s2az"
        },
        {
         "m": "Hemen bağırıp haksızlık yapana yüklenirim!",
         "zon": "fazla",
         "sonuc": "Tartışma büyüyor; asıl sorun çözülmeden iş kavgaya dönebilir.",
         "not": "İbre sağa kaydı: düşünmeden atılmak işi çözmüyor, büyütüyor.",
         "ses": "s2fa"
        },
        {
         "m": "Arkadaşımın yanında dururum; olanı öğretmene anlatırım.",
         "zon": "orta",
         "sonuc": "Arkadaşın yalnız olmadığını hissediyor; sorun doğru kişiye ulaşıyor.",
         "not": "İbre ortada: korksan da doğrunun yanında akıllıca durdun.",
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
       "ad": "Az · Cübn",
       "aciklama": "Korkuyla donup kalmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Şecâat",
       "aciklama": "Korksa da akıllıca davranmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Tehevvür",
       "aciklama": "Düşünmeden atılmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Korkunca olduğu yerde donar; kimseye söyleyemez.",
       "alan": "az",
       "ipucu": "Korku onu hareketsiz bırakıyor."
      },
      {
       "id": "k2",
       "metin": "Kırmızı ışıkta karşıya koşar: “Bana bir şey olmaz.”",
       "alan": "fazla",
       "ipucu": "Tehlikeyi tartmıyor."
      },
      {
       "id": "k3",
       "metin": "Korksa da önce durup düşünür, sonra bir yetişkine söyler.",
       "alan": "orta",
       "ipucu": "Korkuya rağmen akıllıca davranıyor."
      },
      {
       "id": "k4",
       "metin": "Korktuğu için doğruyu söylemekten kaçınır.",
       "alan": "az",
       "ipucu": "Korku onu susturuyor."
      },
      {
       "id": "k5",
       "metin": "Yüksek bir yerden atlamaya kalkar: “Ben hallederim.”",
       "alan": "fazla",
       "ipucu": "Sonunu düşünmüyor."
      },
      {
       "id": "k6",
       "metin": "Yardım isteyeceği kişiyi bulur ve durumu anlatır.",
       "alan": "orta",
       "ipucu": "Doğru kişiye başvuruyor."
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
        "Korktuğum bir durumda",
        "Bir tehlike görünce",
        "Arkadaşım zor durumdayken",
        "Yeni bir şey denerken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Korktuğumda önce durup nefes alacağım",
        "Güvendiğim bir yetişkine durumu anlatacağım",
        "Haksızlık görünce doğru kişiye haber vereceğim"
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
       "baslik": "Şecâat",
       "metin": "korksa da akıllıca davranmak",
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
   "sure": 2.222,
   "m": "Ben hiçbir şeyden korkmam!",
   "k": [
    [
     "Ben",
     0.03,
     0.333
    ],
    [
     "hiçbir",
     0.333,
     0.94
    ],
    [
     "şeyden",
     0.94,
     1.546
    ],
    [
     "korkmam!",
     1.546,
     2.152
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.017,
   "m": "Birçok güzel huy bir ibre gibidir. Şecâat, korku karşısında nasıl davrandığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.424
    ],
    [
     "güzel",
     0.424,
     0.817
    ],
    [
     "huy",
     0.817,
     1.014
    ],
    [
     "bir",
     1.014,
     1.211
    ],
    [
     "ibre",
     1.211,
     1.605
    ],
    [
     "gibidir.",
     1.605,
     2.195
    ],
    [
     "Şecâat,",
     2.675,
     3.275
    ],
    [
     "korku",
     3.575,
     4.042
    ],
    [
     "karşısında",
     4.042,
     4.977
    ],
    [
     "nasıl",
     4.977,
     5.444
    ],
    [
     "davrandığımı",
     5.444,
     6.613
    ],
    [
     "ölçer.",
     6.613,
     7.08
    ],
    [
     "İbre",
     7.2,
     7.637
    ],
    [
     "üç",
     7.637,
     7.855
    ],
    [
     "yerde",
     7.855,
     8.292
    ],
    [
     "durabilir:",
     8.292,
     9.165
    ],
    [
     "az,",
     9.47,
     9.625
    ],
    [
     "kararında,",
     9.625,
     10.245
    ],
    [
     "fazla.",
     10.59,
     10.947
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
   "sure": 6.909,
   "m": "Sol uçta Cübn. Ben yapamam, hiçbir şey yapamam. Korkunca olduğu yerde donup kalır.",
   "k": [
    [
     "Sol",
     0.03,
     0.214
    ],
    [
     "uçta",
     0.214,
     0.581
    ],
    [
     "Cübn.",
     0.581,
     0.765
    ],
    [
     "Ben",
     0.995,
     1.085
    ],
    [
     "yapamam,",
     1.085,
     1.355
    ],
    [
     "hiçbir",
     2.145,
     2.353
    ],
    [
     "şey",
     2.353,
     2.458
    ],
    [
     "yapamam.",
     2.458,
     2.77
    ],
    [
     "Korkunca",
     3.21,
     4.117
    ],
    [
     "olduğu",
     4.117,
     5.025
    ],
    [
     "yerde",
     5.025,
     5.63
    ],
    [
     "donup",
     5.63,
     6.235
    ],
    [
     "kalır.",
     6.235,
     6.839
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 7.09,
   "m": "Sonra ne olur? Yardım isteyebileceği kişiye durumu anlatamaz. Korku büyüdükçe atabileceği küçük adımları da göremez.",
   "k": [
    [
     "Sonra",
     0.03,
     0.274
    ],
    [
     "ne",
     0.274,
     0.396
    ],
    [
     "olur?",
     0.396,
     0.64
    ],
    [
     "Yardım",
     1.18,
     1.412
    ],
    [
     "isteyebileceği",
     1.412,
     2.224
    ],
    [
     "kişiye",
     2.224,
     2.573
    ],
    [
     "durumu",
     2.573,
     2.921
    ],
    [
     "anlatamaz.",
     2.921,
     3.385
    ],
    [
     "Korku",
     3.9,
     4.184
    ],
    [
     "büyüdükçe",
     4.184,
     4.751
    ],
    [
     "atabileceği",
     4.751,
     5.602
    ],
    [
     "küçük",
     5.602,
     5.885
    ],
    [
     "adımları",
     5.885,
     6.452
    ],
    [
     "da",
     6.452,
     6.594
    ],
    [
     "göremez.",
     6.594,
     7.02
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
   "sure": 5.589,
   "m": "Sağ uçta Tehevvür. Ben hallederim, hiçbir şey olmaz! Tehlikeyi tartmadan öne atılır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.229
    ],
    [
     "uçta",
     0.229,
     0.628
    ],
    [
     "Tehevvür.",
     0.628,
     1.225
    ],
    [
     "Ben",
     1.89,
     1.998
    ],
    [
     "hallederim,",
     1.998,
     2.43
    ],
    [
     "hiçbir",
     2.59,
     2.892
    ],
    [
     "şey",
     2.892,
     3.043
    ],
    [
     "olmaz!",
     3.043,
     3.345
    ],
    [
     "Tehlikeyi",
     3.83,
     4.393
    ],
    [
     "tartmadan",
     4.393,
     4.815
    ],
    [
     "öne",
     4.815,
     5.096
    ],
    [
     "atılır.",
     5.096,
     5.519
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.828,
   "m": "Sonra ne olur? Önce kendisi tehlikeye girer. Yetişkinlerin yardım edebileceği an da kaçmış olur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.262
    ],
    [
     "ne",
     0.262,
     0.378
    ],
    [
     "olur?",
     0.378,
     0.61
    ],
    [
     "Önce",
     0.99,
     1.302
    ],
    [
     "kendisi",
     1.302,
     1.77
    ],
    [
     "tehlikeye",
     1.77,
     2.393
    ],
    [
     "girer.",
     2.393,
     2.705
    ],
    [
     "Yetişkinlerin",
     3.06,
     3.77
    ],
    [
     "yardım",
     3.77,
     4.054
    ],
    [
     "edebileceği",
     4.054,
     4.906
    ],
    [
     "an",
     4.906,
     5.048
    ],
    [
     "da",
     5.048,
     5.19
    ],
    [
     "kaçmış",
     5.19,
     5.474
    ],
    [
     "olur.",
     5.474,
     5.758
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
   "sure": 7.196,
   "m": "Tam kararında Şecâat. Korkuyorum ama bir büyüğüme söyleyeceğim. Korksa da ne yapacağını düşünür.",
   "k": [
    [
     "Tam",
     0.03,
     0.226
    ],
    [
     "kararında",
     0.226,
     1.008
    ],
    [
     "Şecâat.",
     1.008,
     1.595
    ],
    [
     "Korkuyorum",
     1.705,
     2.482
    ],
    [
     "ama",
     2.482,
     2.871
    ],
    [
     "bir",
     2.871,
     3.066
    ],
    [
     "büyüğüme",
     3.066,
     3.843
    ],
    [
     "söyleyeceğim.",
     3.843,
     4.815
    ],
    [
     "Korksa",
     5.41,
     5.696
    ],
    [
     "da",
     5.696,
     5.839
    ],
    [
     "ne",
     5.839,
     5.982
    ],
    [
     "yapacağını",
     5.982,
     6.697
    ],
    [
     "düşünür.",
     6.697,
     7.126
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.53,
   "m": "Sonra ne olur? Tehlikeden uzaklaşıp yardım ister. Hem kendini hem çevresini korumuş olur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.264
    ],
    [
     "ne",
     0.264,
     0.381
    ],
    [
     "olur?",
     0.381,
     0.615
    ],
    [
     "Tehlikeden",
     1.01,
     1.655
    ],
    [
     "uzaklaşıp",
     1.655,
     2.3
    ],
    [
     "yardım",
     2.3,
     2.622
    ],
    [
     "ister.",
     2.622,
     2.945
    ],
    [
     "Hem",
     3.34,
     3.491
    ],
    [
     "kendini",
     3.491,
     3.946
    ],
    [
     "hem",
     3.946,
     4.097
    ],
    [
     "çevresini",
     4.097,
     4.703
    ],
    [
     "korumuş",
     4.703,
     5.157
    ],
    [
     "olur.",
     5.157,
     5.46
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
   "sure": 5.17,
   "m": "Okuldan dönerken tanımadığın biri seni durdurup, gel seni götüreyim, diyor. Ne yaparsın?",
   "k": [
    [
     "Okuldan",
     0.03,
     0.426
    ],
    [
     "dönerken",
     0.426,
     0.822
    ],
    [
     "tanımadığın",
     0.822,
     1.481
    ],
    [
     "biri",
     1.481,
     1.745
    ],
    [
     "seni",
     1.745,
     2.009
    ],
    [
     "durdurup,",
     2.009,
     2.405
    ],
    [
     "gel",
     2.64,
     2.837
    ],
    [
     "seni",
     2.837,
     3.231
    ],
    [
     "götüreyim,",
     3.231,
     4.02
    ],
    [
     "diyor.",
     4.515,
     4.71
    ],
    [
     "Ne",
     4.71,
     4.808
    ],
    [
     "yaparsın?",
     4.808,
     5.1
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.711,
   "m": "Zaman geçiyor ama kimseye haber veremiyorsun; yalnız kalıyorsun.",
   "k": [
    [
     "Zaman",
     0.03,
     0.322
    ],
    [
     "geçiyor",
     0.322,
     0.759
    ],
    [
     "ama",
     0.759,
     1.051
    ],
    [
     "kimseye",
     1.051,
     1.489
    ],
    [
     "haber",
     1.489,
     1.781
    ],
    [
     "veremiyorsun;",
     1.781,
     2.51
    ],
    [
     "yalnız",
     2.805,
     3.084
    ],
    [
     "kalıyorsun.",
     3.084,
     3.641
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.719,
   "m": "Yaklaşıyorsun ve tehlikeyi tartmadan kendini işin içine atmış oluyorsun.",
   "k": [
    [
     "Yaklaşıyorsun",
     0.03,
     0.885
    ],
    [
     "ve",
     0.885,
     1.056
    ],
    [
     "tehlikeyi",
     1.056,
     1.741
    ],
    [
     "tartmadan",
     1.741,
     2.254
    ],
    [
     "kendini",
     2.254,
     2.767
    ],
    [
     "işin",
     2.767,
     3.109
    ],
    [
     "içine",
     3.109,
     3.622
    ],
    [
     "atmış",
     3.622,
     3.965
    ],
    [
     "oluyorsun.",
     3.965,
     4.649
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 4.462,
   "m": "Güvenli bir yere gidip olanı bir yetişkine anlatıyorsun. Korksan da doğru olanı yaptın.",
   "k": [
    [
     "Güvenli",
     0.03,
     0.359
    ],
    [
     "bir",
     0.359,
     0.468
    ],
    [
     "yere",
     0.468,
     0.687
    ],
    [
     "gidip",
     0.687,
     0.906
    ],
    [
     "olanı",
     0.906,
     1.235
    ],
    [
     "bir",
     1.235,
     1.344
    ],
    [
     "yetişkine",
     1.344,
     1.782
    ],
    [
     "anlatıyorsun.",
     1.782,
     2.33
    ],
    [
     "Korksan",
     2.785,
     3.106
    ],
    [
     "da",
     3.106,
     3.267
    ],
    [
     "doğru",
     3.267,
     3.589
    ],
    [
     "olanı",
     3.589,
     4.071
    ],
    [
     "yaptın.",
     4.071,
     4.392
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.084,
   "m": "Sınıfta bir arkadaşına haksızlık yapılıyor ve sen bunu görüyorsun. Ne yaparsın?",
   "k": [
    [
     "Sınıfta",
     0.03,
     0.429
    ],
    [
     "bir",
     0.429,
     0.562
    ],
    [
     "arkadaşına",
     0.562,
     1.226
    ],
    [
     "haksızlık",
     1.226,
     1.625
    ],
    [
     "yapılıyor",
     1.625,
     2.157
    ],
    [
     "ve",
     2.157,
     2.29
    ],
    [
     "sen",
     2.29,
     2.422
    ],
    [
     "bunu",
     2.422,
     2.688
    ],
    [
     "görüyorsun.",
     2.688,
     3.22
    ],
    [
     "Ne",
     3.495,
     3.625
    ],
    [
     "yaparsın?",
     3.625,
     4.014
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.067,
   "m": "Arkadaşın yalnız kalıyor; sen de içinde rahat edemiyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.581
    ],
    [
     "yalnız",
     0.581,
     0.857
    ],
    [
     "kalıyor;",
     0.857,
     1.27
    ],
    [
     "sen",
     1.56,
     1.68
    ],
    [
     "de",
     1.68,
     1.8
    ],
    [
     "içinde",
     1.8,
     2.159
    ],
    [
     "rahat",
     2.159,
     2.399
    ],
    [
     "edemiyorsun.",
     2.399,
     2.997
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.974,
   "m": "Tartışma büyüyor; asıl sorun çözülmeden iş kavgaya dönebilir.",
   "k": [
    [
     "Tartışma",
     0.03,
     0.49
    ],
    [
     "büyüyor;",
     0.49,
     0.95
    ],
    [
     "asıl",
     1.205,
     1.542
    ],
    [
     "sorun",
     1.542,
     1.88
    ],
    [
     "çözülmeden",
     1.88,
     2.554
    ],
    [
     "iş",
     2.554,
     2.723
    ],
    [
     "kavgaya",
     2.723,
     3.229
    ],
    [
     "dönebilir.",
     3.229,
     3.904
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.738,
   "m": "Arkadaşın yalnız olmadığını hissediyor; sorun doğru kişiye ulaşıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.657
    ],
    [
     "yalnız",
     0.657,
     0.97
    ],
    [
     "olmadığını",
     0.97,
     1.753
    ],
    [
     "hissediyor;",
     1.753,
     2.38
    ],
    [
     "sorun",
     2.52,
     2.729
    ],
    [
     "doğru",
     2.729,
     2.937
    ],
    [
     "kişiye",
     2.937,
     3.251
    ],
    [
     "ulaşıyor.",
     3.251,
     3.668
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
   "sure": 9.002,
   "m": "Bu cümle bilerek çift anlamlı. Tehlikeyi tartmadan atılan biri söylüyorsa sağ uca yakın. Kendini cesaretlendirip akıllıca davranan biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.162
    ],
    [
     "cümle",
     0.162,
     0.426
    ],
    [
     "bilerek",
     0.426,
     0.822
    ],
    [
     "çift",
     0.822,
     0.954
    ],
    [
     "anlamlı.",
     0.954,
     1.35
    ],
    [
     "Tehlikeyi",
     1.715,
     2.305
    ],
    [
     "tartmadan",
     2.305,
     2.747
    ],
    [
     "atılan",
     2.747,
     3.189
    ],
    [
     "biri",
     3.189,
     3.484
    ],
    [
     "söylüyorsa",
     3.484,
     4.073
    ],
    [
     "sağ",
     4.073,
     4.22
    ],
    [
     "uca",
     4.22,
     4.515
    ],
    [
     "yakın.",
     4.515,
     4.81
    ],
    [
     "Kendini",
     5.37,
     5.752
    ],
    [
     "cesaretlendirip",
     5.752,
     6.515
    ],
    [
     "akıllıca",
     6.515,
     7.024
    ],
    [
     "davranan",
     7.024,
     7.405
    ],
    [
     "biri",
     7.405,
     7.66
    ],
    [
     "söylüyorsa",
     7.66,
     8.169
    ],
    [
     "orta",
     8.169,
     8.423
    ],
    [
     "uca",
     8.423,
     8.677
    ],
    [
     "yakın.",
     8.677,
     8.932
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
