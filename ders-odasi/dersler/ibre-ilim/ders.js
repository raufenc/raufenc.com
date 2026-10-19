/* İbremetre · İlim — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Cehâlet · İlim · Ukalâlık). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-ilim",
 "ad": "İlim: İbren Nerede?",
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
     "huy": "İlim",
     "huyAnahtar": "İlim",
     "olculen": "Bilgiye yaklaşımım",
     "kanca": "Bunu zaten biliyorum!",
     "uclar": {
      "az": "Cehâlet",
      "orta": "İlim",
      "fazla": "Ukalâlık"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "İlim",
     "cumle": "Bunu zaten biliyorum!",
     "uclar": {
      "az": "Cehâlet",
      "orta": "İlim",
      "fazla": "Ukalâlık"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir tonda, öğrenmiş birinin sakin bilgisi: orta uca yakın. Başka tonda, dinlemeden lafı kesen biri: sağ uca (Ukalâlık) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an bilgiye nasıl yaklaştığımıza bakar. İlim; merakla öğrenmek, bilmediğini bilmek ve öğrendiğini hayatına katmaktır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "İlim",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Cehâlet",
      "orta": "İlim",
      "fazla": "Ukalâlık"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Öğrenmek istememek neye benziyor?",
       "ad": "Cehâlet",
       "soz": "Ne gerek var, bilmesem de olur.",
       "eylem": "hayir",
       "zincir": [
        "Aklındaki soru cevapsız kalır.",
        "Öğrenebileceği güzel şeyler yanından geçip gider."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Öğrenmeye gerek yok, nasılsa idare ederim.",
          "dogru": true,
          "not": "Cehâlet, öğrenmek istememektir. Merak kapanınca bilgi de yanından geçer."
         },
         {
          "m": "Bilmiyorum ama öğrenmek istiyorum; kime sorsam?",
          "dogru": false,
          "not": "Bu orta ucun sesi: ilmin sesi."
         },
         {
          "m": "Ben zaten hepsini biliyorum.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: ukalâlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Cehâlet",
        "soz": "Ne"
       },
       "zincirAnahtar": [
        "Aklındaki",
        "Öğrenebileceği"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Her şeyi bildiğini sanan kişi neyi kaçırır?",
       "ad": "Ukalâlık",
       "soz": "Her şeyi ben bilirim; dinlemeye gerek yok.",
       "eylem": "isaret",
       "zincir": [
        "Arkadaşı bildiği doğruyu bile söylemekten vazgeçer.",
        "Kendisi de yeni bir şey öğrenme fırsatını kaçırır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben zaten biliyorum; dinlemeye gerek yok.",
          "dogru": true,
          "not": "Ukalâlık, her şeyi bildiğini sanıp kimseyi dinlememektir."
         },
         {
          "m": "Ne gerek var, bilmesem de olur.",
          "dogru": false,
          "not": "Bu sol ucun sesi: cehâletin sesi."
         },
         {
          "m": "Bilmediğim çok şey var; birlikte bakalım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ilmin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Ukalâlık",
        "soz": "Her"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Kendisi"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "İlim",
       "soz": "Bunu bilmiyorum, öğrenelim!",
       "eylem": "dusun",
       "zincir": [
        "Bilgisi gün gün çoğalır.",
        "Öğrendiğini paylaşınca hem bilgi hem dostluk büyür."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bilmediğim çok şey var; birlikte bakalım.",
          "dogru": true,
          "not": "İlim, bilmediğini bilip merakla öğrenmektir."
         },
         {
          "m": "Ne gerek var, bilmesem de olur.",
          "dogru": false,
          "not": "Bu sol ucun sesi: cehâletin sesi."
         },
         {
          "m": "Ben zaten hepsini biliyorum.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: ukalâlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "İlim",
        "soz": "Bunu"
       },
       "zincirAnahtar": [
        "Bilgisi",
        "Öğrendiğini"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "İlim",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Cehâlet",
      "orta": "İlim",
      "fazla": "Ukalâlık"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "anlatim",
       "baslik": "Anlaşılmayan yer",
       "tetik": "Sınıfta bir konu anlatılıyor ve bir kısmını anlayamadın. Öğretmen, anlaşılmayan yer var mı, diye soruyor.",
       "secenekler": [
        {
         "m": "Sorsam ne olacak, boş ver.",
         "zon": "az",
         "sonuc": "Konu eksik kalıyor; ertesi gün aynı yerde yine takılıyorsun.",
         "not": "İbre sola kaydı: soru sorulmayınca eksik bilgi yerinde kalıyor.",
         "ses": "s1az"
        },
        {
         "m": "Ben hepsini biliyorum, anlatmaya gerek yok!",
         "zon": "fazla",
         "sonuc": "Takıldığın yer kapanmıyor; arkadaşların da yanında soru sormaya çekinebilir.",
         "not": "İbre sağa kaydı: her şeyi bildiğini sanmak, yeni bilgiyi kapıda bekletiyor.",
         "ses": "s1fa"
        },
        {
         "m": "Şu kısmı anlayamadım; bir daha anlatır mısınız?",
         "zon": "orta",
         "sonuc": "Öğretmen yeniden anlatıyor; sınıftan başka arkadaşlar da rahatlıyor.",
         "not": "İbre ortada: bilmediğini söylemek, öğrenmenin ilk adımı.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "farkli",
       "baslik": "Farklı bilgi",
       "tetik": "Bir arkadaşın, senin bildiğinden farklı bir bilgi söylüyor.",
       "secenekler": [
        {
         "m": "Doğru mudur değil midir, bakmam; fark etmez.",
         "zon": "az",
         "sonuc": "Yanlış bilgi yerinde kalabilir; doğrusunu öğrenme fırsatı geçiyor.",
         "not": "İbre sola kaydı: doğruyu araştırmamak, bilgiyi eksik bırakıyor.",
         "ses": "s2az"
        },
        {
         "m": "Yanlış söylüyorsun; benim bildiğim doğru!",
         "zon": "fazla",
         "sonuc": "Tartışma büyüyor ama kimse kaynağa bakmıyor; belki arkadaşın haklıydı.",
         "not": "İbre sağa kaydı: dinlemeden hüküm vermek, doğruyu görmeyi geciktiriyor.",
         "ses": "s2fa"
        },
        {
         "m": "Ben böyle biliyordum; birlikte kitaptan bakalım mı?",
         "zon": "orta",
         "sonuc": "İkiniz de kaynağa bakıyorsunuz ve doğrusunu öğreniyorsunuz.",
         "not": "İbre ortada: farklı bilgiyi merakla araştırmak, ilmin yolu.",
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
       "ad": "Az · Cehâlet",
       "aciklama": "Öğrenmek istememek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · İlim",
       "aciklama": "Merakla öğrenmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Ukalâlık",
       "aciklama": "Her şeyi bildiğini sanmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Merak ettiği bir şey olsa bile sormaz; “ne gerek var” der.",
       "alan": "az",
       "ipucu": "Öğrenmeye hiç yönelmiyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı anlatırken lafı keser: “Ben bunu zaten biliyorum.”",
       "alan": "fazla",
       "ipucu": "Dinlemeden konuşuyor."
      },
      {
       "id": "k3",
       "metin": "Bilmediği bir şeyi sorar, öğrendiğini defterine yazar.",
       "alan": "orta",
       "ipucu": "Merakla öğreniyor ve kaydediyor."
      },
      {
       "id": "k4",
       "metin": "Yeni konuya bakmadan “bunu bilmesem de olur” der.",
       "alan": "az",
       "ipucu": "Öğrenebileceği şeyi geçiyor."
      },
      {
       "id": "k5",
       "metin": "Yeni bir bilgi duyunca “hepsini bilirim” der, kaynağa bakmaz.",
       "alan": "fazla",
       "ipucu": "Kendini her şeyi bilen sanıyor."
      },
      {
       "id": "k6",
       "metin": "Farklı bir bilgi duyunca kaynağa bakıp doğrusunu bulur.",
       "alan": "orta",
       "ipucu": "Doğruyu araştırıyor."
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
        "Bilmediğim bir şey çıkınca",
        "Biri bana bir şey anlatırken",
        "Ödev ya da ders çalışırken",
        "Yeni bir konuyu duyunca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bilmediğim bir şeyi sormaktan çekinmeyeceğim",
        "Biri anlatırken sözünü bitirmesini bekleyeceğim",
        "Öğrendiğim bir şeyi defterime yazacağım"
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
       "baslik": "İlim",
       "metin": "merakla öğrenmek",
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
   "sure": 1.773,
   "m": "Bunu zaten biliyorum!",
   "k": [
    [
     "Bunu",
     0.03,
     0.448
    ],
    [
     "zaten",
     0.448,
     0.867
    ],
    [
     "biliyorum!",
     0.867,
     1.703
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.651,
   "m": "Birçok güzel huy bir ibre gibidir. İlim, bilgiye nasıl yaklaştığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.475
    ],
    [
     "güzel",
     0.475,
     0.919
    ],
    [
     "huy",
     0.919,
     1.141
    ],
    [
     "bir",
     1.141,
     1.364
    ],
    [
     "ibre",
     1.364,
     1.808
    ],
    [
     "gibidir.",
     1.808,
     2.475
    ],
    [
     "İlim,",
     2.985,
     3.355
    ],
    [
     "bilgiye",
     3.585,
     4.324
    ],
    [
     "nasıl",
     4.324,
     4.816
    ],
    [
     "yaklaştığımı",
     4.816,
     6.048
    ],
    [
     "ölçer.",
     6.048,
     6.54
    ],
    [
     "İbre",
     6.64,
     7.076
    ],
    [
     "üç",
     7.076,
     7.293
    ],
    [
     "yerde",
     7.293,
     7.729
    ],
    [
     "durabilir:",
     7.729,
     8.6
    ],
    [
     "az,",
     8.975,
     9.7
    ],
    [
     "kararında,",
     10.12,
     10.428
    ],
    [
     "fazla.",
     10.428,
     10.581
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
   "sure": 6.412,
   "m": "Sol uçta Cehâlet. Ne gerek var, bilmesem de olur. Merak etmez, soru sormaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.255
    ],
    [
     "uçta",
     0.255,
     0.705
    ],
    [
     "Cehâlet.",
     0.705,
     1.38
    ],
    [
     "Ne",
     1.465,
     1.819
    ],
    [
     "gerek",
     1.819,
     2.526
    ],
    [
     "var,",
     2.526,
     2.88
    ],
    [
     "bilmesem",
     3.045,
     3.502
    ],
    [
     "de",
     3.502,
     3.655
    ],
    [
     "olur.",
     3.655,
     3.96
    ],
    [
     "Merak",
     4.11,
     4.665
    ],
    [
     "etmez,",
     4.665,
     5.22
    ],
    [
     "soru",
     5.405,
     5.873
    ],
    [
     "sormaz.",
     5.873,
     6.342
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.557,
   "m": "Sonra ne olur? Aklındaki soru cevapsız kalır. Öğrenebileceği güzel şeyler yanından geçip gider.",
   "k": [
    [
     "Sonra",
     0.03,
     0.304
    ],
    [
     "ne",
     0.304,
     0.441
    ],
    [
     "olur?",
     0.441,
     0.715
    ],
    [
     "Aklındaki",
     1.37,
     1.946
    ],
    [
     "soru",
     1.946,
     2.235
    ],
    [
     "cevapsız",
     2.235,
     2.667
    ],
    [
     "kalır.",
     2.667,
     2.955
    ],
    [
     "Öğrenebileceği",
     3.485,
     4.652
    ],
    [
     "güzel",
     4.652,
     4.986
    ],
    [
     "şeyler",
     4.986,
     5.319
    ],
    [
     "yanından",
     5.319,
     5.82
    ],
    [
     "geçip",
     5.82,
     6.153
    ],
    [
     "gider.",
     6.153,
     6.487
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
   "sure": 6.785,
   "m": "Sağ uçta Ukalâlık. Her şeyi ben bilirim; dinlemeye gerek yok. Karşısındakinin sözünü bitirmesine izin vermez.",
   "k": [
    [
     "Sağ",
     0.03,
     0.119
    ],
    [
     "uçta",
     0.119,
     0.298
    ],
    [
     "Ukalâlık.",
     0.298,
     0.655
    ],
    [
     "Her",
     0.82,
     1.113
    ],
    [
     "şeyi",
     1.113,
     1.699
    ],
    [
     "ben",
     1.699,
     1.991
    ],
    [
     "bilirim;",
     1.991,
     2.87
    ],
    [
     "dinlemeye",
     3.07,
     3.573
    ],
    [
     "gerek",
     3.573,
     3.824
    ],
    [
     "yok.",
     3.824,
     3.95
    ],
    [
     "Karşısındakinin",
     4.265,
     5.082
    ],
    [
     "sözünü",
     5.082,
     5.49
    ],
    [
     "bitirmesine",
     5.49,
     6.17
    ],
    [
     "izin",
     6.17,
     6.442
    ],
    [
     "vermez.",
     6.442,
     6.715
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 7.413,
   "m": "Sonra ne olur? Arkadaşı bildiği doğruyu bile söylemekten vazgeçer. Kendisi de yeni bir şey öğrenme fırsatını kaçırır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.292
    ],
    [
     "ne",
     0.292,
     0.423
    ],
    [
     "olur?",
     0.423,
     0.685
    ],
    [
     "Arkadaşı",
     1.105,
     1.696
    ],
    [
     "bildiği",
     1.696,
     2.138
    ],
    [
     "doğruyu",
     2.138,
     2.581
    ],
    [
     "bile",
     2.581,
     2.877
    ],
    [
     "söylemekten",
     2.877,
     3.467
    ],
    [
     "vazgeçer.",
     3.467,
     3.91
    ],
    [
     "Kendisi",
     4.435,
     4.92
    ],
    [
     "de",
     4.92,
     5.081
    ],
    [
     "yeni",
     5.081,
     5.404
    ],
    [
     "bir",
     5.404,
     5.566
    ],
    [
     "şey",
     5.566,
     5.727
    ],
    [
     "öğrenme",
     5.727,
     6.212
    ],
    [
     "fırsatını",
     6.212,
     6.858
    ],
    [
     "kaçırır.",
     6.858,
     7.343
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
   "sure": 8.222,
   "m": "Tam kararında İlim. Bunu bilmiyorum, öğrenelim! Bilmediğini bilir, sorar, öğrendiğini defterine yazar.",
   "k": [
    [
     "Tam",
     0.03,
     0.235
    ],
    [
     "kararında",
     0.235,
     1.055
    ],
    [
     "İlim.",
     1.055,
     1.465
    ],
    [
     "Bunu",
     1.71,
     2.083
    ],
    [
     "bilmiyorum,",
     2.083,
     2.83
    ],
    [
     "öğrenelim!",
     3.195,
     3.83
    ],
    [
     "Bilmediğini",
     3.915,
     5.008
    ],
    [
     "bilir,",
     5.008,
     5.445
    ],
    [
     "sorar,",
     5.67,
     6.145
    ],
    [
     "öğrendiğini",
     6.37,
     7.18
    ],
    [
     "defterine",
     7.18,
     7.828
    ],
    [
     "yazar.",
     7.828,
     8.152
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.367,
   "m": "Sonra ne olur? Bilgisi gün gün çoğalır. Öğrendiğini paylaşınca hem bilgi hem dostluk büyür.",
   "k": [
    [
     "Sonra",
     0.03,
     0.294
    ],
    [
     "ne",
     0.294,
     0.426
    ],
    [
     "olur?",
     0.426,
     0.69
    ],
    [
     "Bilgisi",
     1.15,
     1.671
    ],
    [
     "gün",
     1.671,
     1.845
    ],
    [
     "gün",
     1.845,
     2.019
    ],
    [
     "çoğalır.",
     2.019,
     2.54
    ],
    [
     "Öğrendiğini",
     2.94,
     3.927
    ],
    [
     "paylaşınca",
     3.927,
     4.717
    ],
    [
     "hem",
     4.717,
     4.914
    ],
    [
     "bilgi",
     4.914,
     5.309
    ],
    [
     "hem",
     5.309,
     5.507
    ],
    [
     "dostluk",
     5.507,
     5.902
    ],
    [
     "büyür.",
     5.902,
     6.297
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
   "sure": 6.055,
   "m": "Sınıfta bir konu anlatılıyor ve bir kısmını anlayamadın. Öğretmen, anlaşılmayan yer var mı, diye soruyor. Ne yaparsın?",
   "k": [
    [
     "Sınıfta",
     0.03,
     0.389
    ],
    [
     "bir",
     0.389,
     0.509
    ],
    [
     "konu",
     0.509,
     0.749
    ],
    [
     "anlatılıyor",
     0.749,
     1.347
    ],
    [
     "ve",
     1.347,
     1.467
    ],
    [
     "bir",
     1.467,
     1.587
    ],
    [
     "kısmını",
     1.587,
     1.946
    ],
    [
     "anlayamadın.",
     1.946,
     2.545
    ],
    [
     "Öğretmen,",
     2.96,
     3.435
    ],
    [
     "anlaşılmayan",
     3.595,
     4.551
    ],
    [
     "yer",
     4.551,
     4.742
    ],
    [
     "var",
     4.742,
     4.934
    ],
    [
     "mı,",
     4.934,
     5.125
    ],
    [
     "diye",
     5.45,
     5.569
    ],
    [
     "soruyor.",
     5.569,
     5.747
    ],
    [
     "Ne",
     5.747,
     5.807
    ],
    [
     "yaparsın?",
     5.807,
     5.985
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.687,
   "m": "Konu eksik kalıyor; ertesi gün aynı yerde yine takılıyorsun.",
   "k": [
    [
     "Konu",
     0.03,
     0.287
    ],
    [
     "eksik",
     0.287,
     0.544
    ],
    [
     "kalıyor;",
     0.544,
     0.93
    ],
    [
     "ertesi",
     1.07,
     1.579
    ],
    [
     "gün",
     1.579,
     1.749
    ],
    [
     "aynı",
     1.749,
     2.089
    ],
    [
     "yerde",
     2.089,
     2.428
    ],
    [
     "yine",
     2.428,
     2.768
    ],
    [
     "takılıyorsun.",
     2.768,
     3.617
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.835,
   "m": "Takıldığın yer kapanmıyor; arkadaşların da yanında soru sormaya çekinebilir.",
   "k": [
    [
     "Takıldığın",
     0.03,
     0.592
    ],
    [
     "yer",
     0.592,
     0.733
    ],
    [
     "kapanmıyor;",
     0.733,
     1.295
    ],
    [
     "arkadaşların",
     1.635,
     2.196
    ],
    [
     "da",
     2.196,
     2.308
    ],
    [
     "yanında",
     2.308,
     2.644
    ],
    [
     "soru",
     2.644,
     2.868
    ],
    [
     "sormaya",
     2.868,
     3.205
    ],
    [
     "çekinebilir.",
     3.205,
     3.765
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.494,
   "m": "Öğretmen yeniden anlatıyor; sınıftan başka arkadaşlar da rahatlıyor.",
   "k": [
    [
     "Öğretmen",
     0.03,
     0.415
    ],
    [
     "yeniden",
     0.415,
     0.801
    ],
    [
     "anlatıyor;",
     0.801,
     1.315
    ],
    [
     "sınıftan",
     1.66,
     2.038
    ],
    [
     "başka",
     2.038,
     2.29
    ],
    [
     "arkadaşlar",
     2.29,
     2.794
    ],
    [
     "da",
     2.794,
     2.92
    ],
    [
     "rahatlıyor.",
     2.92,
     3.424
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 3.705,
   "m": "Bir arkadaşın, senin bildiğinden farklı bir bilgi söylüyor. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.183
    ],
    [
     "arkadaşın,",
     0.183,
     0.793
    ],
    [
     "senin",
     0.793,
     1.098
    ],
    [
     "bildiğinden",
     1.098,
     1.709
    ],
    [
     "farklı",
     1.709,
     2.014
    ],
    [
     "bir",
     2.014,
     2.167
    ],
    [
     "bilgi",
     2.167,
     2.472
    ],
    [
     "söylüyor.",
     2.472,
     2.93
    ],
    [
     "Ne",
     3.085,
     3.223
    ],
    [
     "yaparsın?",
     3.223,
     3.635
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.856,
   "m": "Yanlış bilgi yerinde kalabilir; doğrusunu öğrenme fırsatı geçiyor.",
   "k": [
    [
     "Yanlış",
     0.03,
     0.305
    ],
    [
     "bilgi",
     0.305,
     0.579
    ],
    [
     "yerinde",
     0.579,
     0.991
    ],
    [
     "kalabilir;",
     0.991,
     1.54
    ],
    [
     "doğrusunu",
     1.88,
     2.466
    ],
    [
     "öğrenme",
     2.466,
     2.906
    ],
    [
     "fırsatı",
     2.906,
     3.346
    ],
    [
     "geçiyor.",
     3.346,
     3.786
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.545,
   "m": "Tartışma büyüyor ama kimse kaynağa bakmıyor; belki arkadaşın haklıydı.",
   "k": [
    [
     "Tartışma",
     0.03,
     0.402
    ],
    [
     "büyüyor",
     0.402,
     0.774
    ],
    [
     "ama",
     0.774,
     1.022
    ],
    [
     "kimse",
     1.022,
     1.271
    ],
    [
     "kaynağa",
     1.271,
     1.643
    ],
    [
     "bakmıyor;",
     1.643,
     2.015
    ],
    [
     "belki",
     2.215,
     2.495
    ],
    [
     "arkadaşın",
     2.495,
     3.055
    ],
    [
     "haklıydı.",
     3.055,
     3.475
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.299,
   "m": "İkiniz de kaynağa bakıyorsunuz ve doğrusunu öğreniyorsunuz.",
   "k": [
    [
     "İkiniz",
     0.03,
     0.447
    ],
    [
     "de",
     0.447,
     0.586
    ],
    [
     "kaynağa",
     0.586,
     1.004
    ],
    [
     "bakıyorsunuz",
     1.004,
     1.699
    ],
    [
     "ve",
     1.699,
     1.838
    ],
    [
     "doğrusunu",
     1.838,
     2.394
    ],
    [
     "öğreniyorsunuz.",
     2.394,
     3.229
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
   "sure": 6.447,
   "m": "Bu cümle bilerek çift anlamlı. Sakin söylenirse orta uca yakın. Lafı keserek söylenirse sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.179
    ],
    [
     "cümle",
     0.179,
     0.477
    ],
    [
     "bilerek",
     0.477,
     0.924
    ],
    [
     "çift",
     0.924,
     1.073
    ],
    [
     "anlamlı.",
     1.073,
     1.52
    ],
    [
     "Sakin",
     1.77,
     2.108
    ],
    [
     "söylenirse",
     2.108,
     2.785
    ],
    [
     "orta",
     2.785,
     3.123
    ],
    [
     "uca",
     3.123,
     3.462
    ],
    [
     "yakın.",
     3.462,
     3.8
    ],
    [
     "Lafı",
     4.025,
     4.361
    ],
    [
     "keserek",
     4.361,
     4.865
    ],
    [
     "söylenirse",
     4.865,
     5.537
    ],
    [
     "sağ",
     5.537,
     5.705
    ],
    [
     "uca",
     5.705,
     6.041
    ],
    [
     "yakın.",
     6.041,
     6.377
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
