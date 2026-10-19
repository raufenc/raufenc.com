/* İbremetre · Şecâat — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Cübn · Şecâat · Tehevvür). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-secaat",
 "ad": "Şecâat: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "cesaret",
 "muzik": "cesaret",
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
     "huyAnahtar": "Şecâat",
     "olculen": "Tehlike karşısında hareket biçimim",
     "kanca": "Korkmuyorum, bakalım ne olacak.",
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
     "cumle": "Korkmuyorum, bakalım ne olacak.",
     "uclar": {
      "az": "Cübn",
      "orta": "Şecâat",
      "fazla": "Tehevvür"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi tehlikeye bakmadan “bakalım ne olacak” diyerek atılıyor: sağ uca (Tehevvür) yakın. Başka okumada korkusunu kabul edip kendini yatıştırıyor, sonra güvenli bir yerden bakıp karar veriyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an korkuya karşı ne yaptığımıza bakar. Bu derste yabancı, yol, karanlık gibi bedensel tehlikeler karşısındaki korkuya bakıyoruz. Şecâat korkmamak değildir; korksan da akıllıca ve doğru olanı yapabilmektir.",
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
       "soz": "Çok korkuyorum, kıpırdayamıyorum.",
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
          "not": "Cübn, tehlike karşısında korkudan kıpırdayamamaktır. Korkmak doğaldır; donup kalmak ise yardım istemeyi de zorlaştırır."
         },
         {
          "m": "Korkuyorum ama durup düşüneceğim, yardım isteyeceğim.",
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
        "soz": "Çok"
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
          "m": "Korkuyorum ama durup düşüneceğim, yardım isteyeceğim.",
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
       "soz": "Korkuyorum ama güvendiğim bir yetişkine söyleyeceğim.",
       "eylem": "konus",
       "zincir": [
        "Tehlikeden uzaklaşıp yardım ister.",
        "Hem kendini hem çevresini korumuş olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Korkuyorum ama durup düşüneceğim, yardım isteyeceğim.",
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
       "tetik": "Okuldan dönerken tanımadığın biri yanına gelip “Gel, seni götüreyim!” diyor.",
       "secenekler": [
        {
         "m": "Korkudan hiçbir şey yapamam; olduğum yerde kalırım.",
         "zon": "az",
         "sonuc": "Zaman geçiyor ama kimseye haber veremiyorsun; yalnız kalıyorsun.",
         "not": "İbre sola kaydı: korkudan donmak, yardım çağırmayı da engelliyor.",
         "ses": "s1az"
        },
        {
         "m": "Ben hallederim; kimseye söylemeden konuşayım.",
         "zon": "fazla",
         "sonuc": "Yaklaşıyorsun ve tehlikeyi tartmadan kendini işin içine atmış oluyorsun.",
         "not": "İbre sağa kaydı: tehlikeyi tartmadan atılmak, cesaret değil.",
         "ses": "s1fa"
        },
        {
         "m": "Hayır, gelmiyorum! Kalabalığa ya da güvendiğim bir yetişkine giderim.",
         "zon": "orta",
         "sonuc": "Güvenli bir yere gidip olanı güvendiğin bir yetişkine anlatıyorsun. Korksan da doğru olanı yaptın.",
         "not": "İbre ortada: korkuya rağmen akıllıca ve doğru davrandın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "karanlik",
       "baslik": "Elektrik kesintisi",
       "tetik": "Akşam evde elektrikler kesiliyor. Karanlık odada tek başınasın ve korkuyorsun; evde güvendiğin bir yetişkin başka odada.",
       "secenekler": [
        {
         "m": "Korkudan sesim çıkmıyor; kıpırdamadan beklerim.",
         "zon": "az",
         "sonuc": "Karanlıkta yalnız bekliyorsun; yardım isteyebileceğin kişi seni duymuyor.",
         "not": "İbre sola kaydı: korkudan susmak, yardım çağırmayı da zorlaştırıyor.",
         "ses": "s2az"
        },
        {
         "m": "Korkmuyorum! Karanlıkta tek başıma bir şeyler aramaya giderim.",
         "zon": "fazla",
         "sonuc": "Önünü göremiyorsun; bir yere çarpabilirsin ve evdekiler nerede olduğunu bilmiyor.",
         "not": "İbre sağa kaydı: karanlıkta tartmadan atılmak cesaret değil, risk.",
         "ses": "s2fa"
        },
        {
         "m": "Derin nefes alıp yerimde dururum, yetişkini sesle çağırırım.",
         "zon": "orta",
         "sonuc": "Yetişkin gelip yanına oturuyor; ışık gelene dek birlikte bekliyorsunuz.",
         "not": "İbre ortada: korksan da durup nefes aldın ve yardım istedin.",
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
       "metin": "Yolda yabancı biri yaklaşınca korkudan donar; sesini çıkaramaz.",
       "alan": "az",
       "ipucu": "Korku onu hareketsiz bırakıyor."
      },
      {
       "id": "k2",
       "metin": "Uyarıları dinlemeden tehlikeli bir işe girişir: “Bana bir şey olmaz.”",
       "alan": "fazla",
       "ipucu": "Tehlikeyi tartmıyor."
      },
      {
       "id": "k3",
       "metin": "Korksa da önce durup düşünür, sonra güvendiği bir yetişkine söyler.",
       "alan": "orta",
       "ipucu": "Korkuya rağmen akıllıca davranıyor."
      },
      {
       "id": "k4",
       "metin": "Karanlıkta korktuğu için yardım çağırmaya bile cesaret edemez.",
       "alan": "az",
       "ipucu": "Korku onu susturuyor."
      },
      {
       "id": "k5",
       "metin": "Tehlikeli bir yere kimseye söylemeden gider: “Ben hallederim.”",
       "alan": "fazla",
       "ipucu": "Sonunu düşünmüyor."
      },
      {
       "id": "k6",
       "metin": "Tanımadığı biri ısrar edince “hayır” der ve kalabalık bir yere gider.",
       "alan": "orta",
       "ipucu": "Doğru kişiye ve yere yöneliyor."
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
        "Karanlıkta ya da yalnız kalınca",
        "Yolda bir yabancı yaklaşınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Korktuğumda önce durup nefes alacağım",
        "Güvendiğim bir yetişkine durumu anlatacağım",
        "Tanımadığım biri ısrar ederse “hayır” deyip kalabalığa gideceğim"
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
   "sure": 2.389,
   "m": "Korkmuyorum, bakalım ne olacak.",
   "k": [
    [
     "Korkmuyorum,",
     0.03,
     0.85
    ],
    [
     "bakalım",
     1.06,
     1.6
    ],
    [
     "ne",
     1.6,
     1.78
    ],
    [
     "olacak.",
     1.78,
     2.319
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
   "sure": 7.363,
   "m": "Sol uçta Cübn. Çok korkuyorum, kıpırdayamıyorum. Tehlike görünce olduğu yerde donup kalır.",
   "k": [
    [
     "Sol",
     0.03,
     0.312
    ],
    [
     "uçta",
     0.312,
     0.877
    ],
    [
     "Cübn.",
     0.877,
     1.16
    ],
    [
     "Çok",
     1.875,
     2.017
    ],
    [
     "korkuyorum,",
     2.017,
     2.585
    ],
    [
     "kıpırdayamıyorum.",
     2.94,
     3.71
    ],
    [
     "Tehlike",
     4.305,
     4.903
    ],
    [
     "görünce",
     4.903,
     5.5
    ],
    [
     "olduğu",
     5.5,
     6.098
    ],
    [
     "yerde",
     6.098,
     6.496
    ],
    [
     "donup",
     6.496,
     6.895
    ],
    [
     "kalır.",
     6.895,
     7.293
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
   "sure": 6.484,
   "m": "Sağ uçta Tehevvür. Ben hallederim, hiçbir şey olmaz! Tehlikeli bir yere bakmadan, tartmadan dalar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.238
    ],
    [
     "uçta",
     0.238,
     0.655
    ],
    [
     "Tehevvür.",
     0.655,
     1.28
    ],
    [
     "Ben",
     1.58,
     1.748
    ],
    [
     "hallederim,",
     1.748,
     2.417
    ],
    [
     "hiçbir",
     2.417,
     2.752
    ],
    [
     "şey",
     2.752,
     2.92
    ],
    [
     "olmaz!",
     2.92,
     3.255
    ],
    [
     "Tehlikeli",
     3.815,
     4.351
    ],
    [
     "bir",
     4.351,
     4.485
    ],
    [
     "yere",
     4.485,
     4.753
    ],
    [
     "bakmadan,",
     4.753,
     5.155
    ],
    [
     "tartmadan",
     5.26,
     5.953
    ],
    [
     "dalar.",
     5.953,
     6.414
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
   "sure": 8.484,
   "m": "Tam kararında Şecâat. Korkuyorum ama güvendiğim bir yetişkine söyleyeceğim. Korksa da durur, ne yapacağını düşünür.",
   "k": [
    [
     "Tam",
     0.03,
     0.222
    ],
    [
     "kararında",
     0.222,
     0.989
    ],
    [
     "Şecâat.",
     0.989,
     1.565
    ],
    [
     "Korkuyorum",
     1.65,
     2.426
    ],
    [
     "ama",
     2.426,
     2.814
    ],
    [
     "güvendiğim",
     2.814,
     3.59
    ],
    [
     "bir",
     3.59,
     3.784
    ],
    [
     "yetişkine",
     3.784,
     4.56
    ],
    [
     "söyleyeceğim.",
     4.56,
     5.53
    ],
    [
     "Korksa",
     5.775,
     6.265
    ],
    [
     "da",
     6.265,
     6.51
    ],
    [
     "durur,",
     6.51,
     7.0
    ],
    [
     "ne",
     7.35,
     7.468
    ],
    [
     "yapacağını",
     7.468,
     8.059
    ],
    [
     "düşünür.",
     8.059,
     8.414
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
   "sure": 5.567,
   "m": "Okuldan dönerken tanımadığın biri yanına gelip Gel, seni götüreyim! diyor. Ne yaparsın?",
   "k": [
    [
     "Okuldan",
     0.03,
     0.492
    ],
    [
     "dönerken",
     0.492,
     0.954
    ],
    [
     "tanımadığın",
     0.954,
     1.723
    ],
    [
     "biri",
     1.723,
     2.031
    ],
    [
     "yanına",
     2.031,
     2.493
    ],
    [
     "gelip",
     2.493,
     2.801
    ],
    [
     "Gel,",
     2.801,
     2.955
    ],
    [
     "seni",
     3.115,
     3.493
    ],
    [
     "götüreyim!",
     3.493,
     4.25
    ],
    [
     "diyor.",
     4.945,
     5.129
    ],
    [
     "Ne",
     5.129,
     5.221
    ],
    [
     "yaparsın?",
     5.221,
     5.497
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
   "sure": 5.526,
   "m": "Güvenli bir yere gidip olanı güvendiğin bir yetişkine anlatıyorsun. Korksan da doğru olanı yaptın.",
   "k": [
    [
     "Güvenli",
     0.03,
     0.413
    ],
    [
     "bir",
     0.413,
     0.54
    ],
    [
     "yere",
     0.54,
     0.796
    ],
    [
     "gidip",
     0.796,
     1.051
    ],
    [
     "olanı",
     1.051,
     1.434
    ],
    [
     "güvendiğin",
     1.434,
     1.944
    ],
    [
     "bir",
     1.944,
     2.072
    ],
    [
     "yetişkine",
     2.072,
     2.582
    ],
    [
     "anlatıyorsun.",
     2.582,
     3.22
    ],
    [
     "Korksan",
     3.71,
     4.059
    ],
    [
     "da",
     4.059,
     4.234
    ],
    [
     "doğru",
     4.234,
     4.583
    ],
    [
     "olanı",
     4.583,
     5.106
    ],
    [
     "yaptın.",
     5.106,
     5.456
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 8.349,
   "m": "Akşam evde elektrikler kesiliyor. Karanlık odada tek başınasın ve korkuyorsun; evde güvendiğin bir yetişkin başka odada. Ne yaparsın?",
   "k": [
    [
     "Akşam",
     0.03,
     0.293
    ],
    [
     "evde",
     0.293,
     0.557
    ],
    [
     "elektrikler",
     0.557,
     1.083
    ],
    [
     "kesiliyor.",
     1.083,
     1.61
    ],
    [
     "Karanlık",
     2.085,
     2.529
    ],
    [
     "odada",
     2.529,
     2.974
    ],
    [
     "tek",
     2.974,
     3.122
    ],
    [
     "başınasın",
     3.122,
     3.714
    ],
    [
     "ve",
     3.714,
     3.862
    ],
    [
     "korkuyorsun;",
     3.862,
     4.455
    ],
    [
     "evde",
     5.15,
     5.431
    ],
    [
     "güvendiğin",
     5.431,
     5.994
    ],
    [
     "bir",
     5.994,
     6.135
    ],
    [
     "yetişkin",
     6.135,
     6.557
    ],
    [
     "başka",
     6.557,
     6.838
    ],
    [
     "odada.",
     6.838,
     7.26
    ],
    [
     "Ne",
     7.715,
     7.856
    ],
    [
     "yaparsın?",
     7.856,
     8.279
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 5.485,
   "m": "Karanlıkta yalnız bekliyorsun; yardım isteyebileceğin kişi seni duymuyor.",
   "k": [
    [
     "Karanlıkta",
     0.03,
     0.634
    ],
    [
     "yalnız",
     0.634,
     0.936
    ],
    [
     "bekliyorsun;",
     0.936,
     1.54
    ],
    [
     "yardım",
     1.89,
     2.331
    ],
    [
     "isteyebileceğin",
     2.331,
     3.873
    ],
    [
     "kişi",
     3.873,
     4.313
    ],
    [
     "seni",
     4.313,
     4.754
    ],
    [
     "duymuyor.",
     4.754,
     5.415
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.869,
   "m": "Önünü göremiyorsun; bir yere çarpabilirsin ve evdekiler nerede olduğunu bilmiyor.",
   "k": [
    [
     "Önünü",
     0.03,
     0.412
    ],
    [
     "göremiyorsun;",
     0.412,
     1.05
    ],
    [
     "bir",
     1.44,
     1.586
    ],
    [
     "yere",
     1.586,
     1.878
    ],
    [
     "çarpabilirsin",
     1.878,
     2.608
    ],
    [
     "ve",
     2.608,
     2.754
    ],
    [
     "evdekiler",
     2.754,
     3.339
    ],
    [
     "nerede",
     3.339,
     3.777
    ],
    [
     "olduğunu",
     3.777,
     4.361
    ],
    [
     "bilmiyor.",
     4.361,
     4.799
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.991,
   "m": "Yetişkin gelip yanına oturuyor; ışık gelene dek birlikte bekliyorsunuz.",
   "k": [
    [
     "Yetişkin",
     0.03,
     0.387
    ],
    [
     "gelip",
     0.387,
     0.626
    ],
    [
     "yanına",
     0.626,
     0.983
    ],
    [
     "oturuyor;",
     0.983,
     1.46
    ],
    [
     "ışık",
     1.81,
     2.112
    ],
    [
     "gelene",
     2.112,
     2.564
    ],
    [
     "dek",
     2.564,
     2.715
    ],
    [
     "birlikte",
     2.715,
     3.167
    ],
    [
     "bekliyorsunuz.",
     3.167,
     3.921
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
   "sure": 9.728,
   "m": "Bu cümle bilerek çift anlamlı. Tehlikeye bakmadan atılan biri söylüyorsa sağ uca yakın. Korkusunu kabul edip önce güvenli yerden bakan biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.188
    ],
    [
     "cümle",
     0.188,
     0.504
    ],
    [
     "bilerek",
     0.504,
     0.978
    ],
    [
     "çift",
     0.978,
     1.136
    ],
    [
     "anlamlı.",
     1.136,
     1.61
    ],
    [
     "Tehlikeye",
     2.06,
     2.614
    ],
    [
     "bakmadan",
     2.614,
     3.03
    ],
    [
     "atılan",
     3.03,
     3.446
    ],
    [
     "biri",
     3.446,
     3.723
    ],
    [
     "söylüyorsa",
     3.723,
     4.277
    ],
    [
     "sağ",
     4.277,
     4.416
    ],
    [
     "uca",
     4.416,
     4.693
    ],
    [
     "yakın.",
     4.693,
     4.97
    ],
    [
     "Korkusunu",
     5.305,
     5.905
    ],
    [
     "kabul",
     5.905,
     6.206
    ],
    [
     "edip",
     6.206,
     6.506
    ],
    [
     "önce",
     6.506,
     6.806
    ],
    [
     "güvenli",
     6.806,
     7.256
    ],
    [
     "yerden",
     7.256,
     7.557
    ],
    [
     "bakan",
     7.557,
     7.857
    ],
    [
     "biri",
     7.857,
     8.157
    ],
    [
     "söylüyorsa",
     8.157,
     8.757
    ],
    [
     "orta",
     8.757,
     9.058
    ],
    [
     "uca",
     9.058,
     9.358
    ],
    [
     "yakın.",
     9.358,
     9.658
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
