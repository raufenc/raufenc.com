/* İbremetre · Hürmet — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Saygısızlık · Hürmet · Takdis). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-hurmet",
 "ad": "Hürmet: İbren Nerede?",
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
     "huy": "Hürmet",
     "huyAnahtar": "Hürmet",
     "olculen": "Bilgili büyüklere davranış biçimim",
     "kanca": "Hocamın sözünün üstüne söz söylemem.",
     "uclar": {
      "az": "Saygısızlık",
      "orta": "Hürmet",
      "fazla": "Takdis"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Hürmet",
     "cumle": "Hocamın sözünün üstüne söz söylemem.",
     "uclar": {
      "az": "Saygısızlık",
      "orta": "Hürmet",
      "fazla": "Takdis"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi hocasını hatasız sanıp hiç soru sormuyor: sağ uca (Takdis) yakın. Başka okumada kişi hocasının sözünü kesmeden saygıyla dinliyor, sonra nazikçe sorusunu soruyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an bilgili büyüklere nasıl davrandığımıza bakar. Hürmet; bilgili büyükleri saygıyla dinlemek ve onlara değer vermektir. Nazikçe soru sormak saygısızlık değildir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Hürmet",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Saygısızlık",
      "orta": "Hürmet",
      "fazla": "Takdis"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Dinlememek neye benziyor?",
       "ad": "Saygısızlık",
       "soz": "Hoca konuşurken ben kendi işime bakarım.",
       "eylem": "hayir",
       "zincir": [
        "Anlatılan bilgiyi kaçırır.",
        "Büyüğü de üzülebilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Dinlememe gerek yok; beni ilgilendirmez.",
          "dogru": true,
          "not": "Saygısızlık, bilgili büyüğü dinlememek ya da küçümsemektir. Saygı gösterince öğrenme kapısı da açılır."
         },
         {
          "m": "Dinleyeyim; anlamadığım yeri sonra nazikçe sorarım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hürmetin sesi."
         },
         {
          "m": "Hocam hiç hata yapmaz; soru sormaya gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: takdisin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Saygısızlık",
        "soz": "Hoca"
       },
       "zincirAnahtar": [
        "Anlatılan",
        "Büyüğü"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Hiç soru sormamak neye benziyor?",
       "ad": "Takdis",
       "soz": "O hiç hata yapmaz; ona soru sorulmaz.",
       "eylem": "isaret",
       "zincir": [
        "Anlamadığı yerler öylece kalır.",
        "Bir şeyi anlamayınca sormaya çekinir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Hocam hiç hata yapmaz; soru sormaya gerek yok.",
          "dogru": true,
          "not": "Takdis, bilgili büyüğü aşırı yüceltmektir. Bu uçta büyük hatasız sanılır ve soru sorulmaz; oysa saygı, nazikçe sormayı engellemez."
         },
         {
          "m": "Dinlememe gerek yok; beni ilgilendirmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saygısızlığın sesi."
         },
         {
          "m": "Dinleyeyim; anlamadığım yeri sonra nazikçe sorarım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hürmetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Takdis",
        "soz": "O"
       },
       "zincirAnahtar": [
        "Anlamadığı",
        "Bir"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Hürmet",
       "soz": "Sizi dinliyorum; anlamadığımı sonra sorarım.",
       "eylem": "konus",
       "zincir": [
        "Anlattıkları kafasında yerleşir.",
        "Büyüğü de anlatmaktan memnun olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Dinleyeyim; anlamadığım yeri sonra nazikçe sorarım.",
          "dogru": true,
          "not": "Hürmet, bilgili büyükleri saygıyla dinlemek ve onlara değer vermektir."
         },
         {
          "m": "Dinlememe gerek yok; beni ilgilendirmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saygısızlığın sesi."
         },
         {
          "m": "Hocam hiç hata yapmaz; soru sormaya gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: takdisin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hürmet",
        "soz": "Sizi"
       },
       "zincirAnahtar": [
        "Anlattıkları",
        "Büyüğü"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Hürmet",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Saygısızlık",
      "orta": "Hürmet",
      "fazla": "Takdis"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "sinif",
       "baslik": "Ders anlatılırken",
       "tetik": "Öğretmenin ders anlatırken bir yerde anlamadığın bir şey oldu.",
       "secenekler": [
        {
         "m": "Dinlemem; arkamdaki arkadaşımla konuşurum.",
         "zon": "az",
         "sonuc": "Anlatılan konu kaçıyor; öğretmenin dersi de bölünüyor.",
         "not": "İbre sola kaydı: dinlememek hem bilgiyi hem saygıyı kaçırıyor.",
         "ses": "s1az"
        },
        {
         "m": "Öğretmenim yanılmaz; anlamasam da sormam.",
         "zon": "fazla",
         "sonuc": "Anlamadığın yer aklında takılı kalıyor.",
         "not": "İbre sağa kaydı: soru sormaktan çekinmek saygıyı değil, öğrenmeyi azaltıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Sözü bitince elimi kaldırıp nazikçe sorarım.",
         "zon": "orta",
         "sonuc": "Öğretmenin sakin sakin anlatıyor; anlamadığın yer netleşiyor.",
         "not": "İbre ortada: dinlemek ve nazikçe sormak birlikte yürüyebilir.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "buyuk",
       "baslik": "Büyüğün öğüdü",
       "tetik": "Aile büyüğün sana bir konuda öğüt veriyor ama aklında bir soru var.",
       "secenekler": [
        {
         "m": "Ne söylerse söylesin, hiç dinlemem.",
         "zon": "az",
         "sonuc": "Büyüğün anlatmaktan vazgeçiyor; paylaşacağı bilgiyi duyamıyorsun.",
         "not": "İbre sola kaydı: dinlemeyince öğüdün faydası da kaçıyor.",
         "ses": "s2az"
        },
        {
         "m": "Ona hiç soru sormam; her sözü kesin doğrudur.",
         "zon": "fazla",
         "sonuc": "Aklındaki soru cevapsız kalıyor.",
         "not": "İbre sağa kaydı: hiç sormamak saygı sayılmaz; öğrenmeyi azaltır.",
         "ses": "s2fa"
        },
        {
         "m": "Önce dinler, sonra aklımdaki soruyu sakin bir sesle sorarım.",
         "zon": "orta",
         "sonuc": "Büyüğün memnun oluyor ve sorunu sevgiyle cevaplıyor.",
         "not": "İbre ortada: saygıyla dinlemek ve sormak birlikte güzel.",
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
       "ad": "Az · Saygısızlık",
       "aciklama": "Dinlememek, küçümsemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Hürmet",
       "aciklama": "Dinleyip nazikçe sormak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Takdis",
       "aciklama": "Hatasız sanıp hiç sormamak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Öğretmeni konuşurken arkasını dönüp başka şeyle ilgilenir.",
       "alan": "az",
       "ipucu": "Dinlemiyor."
      },
      {
       "id": "k2",
       "metin": "Hocasının her sözünü hatasız sanır; hiç soru sormaz.",
       "alan": "fazla",
       "ipucu": "Hatasız sanıyor."
      },
      {
       "id": "k3",
       "metin": "Hocası konuşurken dinler, anlamadığını sonra nazikçe sorar.",
       "alan": "orta",
       "ipucu": "Saygıyla dinleyip soruyor."
      },
      {
       "id": "k4",
       "metin": "Dedesi anlatırken sözünü keser ve “boş ver” der.",
       "alan": "az",
       "ipucu": "Değer vermiyor."
      },
      {
       "id": "k5",
       "metin": "“O her şeyi bilir, ona soru sorulmaz” der.",
       "alan": "fazla",
       "ipucu": "Aşırı yüceltiyor."
      },
      {
       "id": "k6",
       "metin": "Büyüğü anlatırken dikkatle dinler, sonunda teşekkür eder.",
       "alan": "orta",
       "ipucu": "Saygıyla dinliyor."
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
        "Öğretmenim anlatırken",
        "Bir büyüğüm bana öğüt verirken",
        "Anlamadığım bir yer olunca",
        "Bir hocamı çok sevip beğendiğimde"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Konuşan büyüğümü sözü bitene kadar dinleyeceğim",
        "Anlamadığım yeri nazikçe soracağım",
        "Hocama teşekkür edip öğrendiğimi paylaşacağım"
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
       "baslik": "Hürmet",
       "metin": "saygıyla dinleyip nazikçe sormak",
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
   "sure": 2.189,
   "m": "Hocamın sözünün üstüne söz söylemem.",
   "k": [
    [
     "Hocamın",
     0.03,
     0.512
    ],
    [
     "sözünün",
     0.512,
     0.994
    ],
    [
     "üstüne",
     0.994,
     1.477
    ],
    [
     "söz",
     1.477,
     1.637
    ],
    [
     "söylemem.",
     1.637,
     2.119
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.607,
   "m": "Birçok güzel huy bir ibre gibidir. Hürmet, bilgili büyüklere nasıl davrandığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.484
    ],
    [
     "güzel",
     0.484,
     0.937
    ],
    [
     "huy",
     0.937,
     1.164
    ],
    [
     "bir",
     1.164,
     1.391
    ],
    [
     "ibre",
     1.391,
     1.845
    ],
    [
     "gibidir.",
     1.845,
     2.525
    ],
    [
     "Hürmet,",
     3.115,
     3.63
    ],
    [
     "bilgili",
     3.965,
     4.498
    ],
    [
     "büyüklere",
     4.498,
     5.21
    ],
    [
     "nasıl",
     5.21,
     5.565
    ],
    [
     "davrandığımı",
     5.565,
     6.454
    ],
    [
     "ölçer.",
     6.454,
     6.81
    ],
    [
     "İbre",
     7.545,
     8.061
    ],
    [
     "üç",
     8.061,
     8.318
    ],
    [
     "yerde",
     8.318,
     8.834
    ],
    [
     "durabilir:",
     8.834,
     9.865
    ],
    [
     "az,",
     10.17,
     10.317
    ],
    [
     "kararında,",
     10.317,
     10.905
    ],
    [
     "fazla.",
     11.145,
     11.537
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
   "sure": 6.558,
   "m": "Sol uçta Saygısızlık. Hoca konuşurken ben kendi işime bakarım. Bilgili büyük konuşurken arkasını döner.",
   "k": [
    [
     "Sol",
     0.03,
     0.224
    ],
    [
     "uçta",
     0.224,
     0.611
    ],
    [
     "Saygısızlık.",
     0.611,
     1.385
    ],
    [
     "Hoca",
     1.95,
     2.197
    ],
    [
     "konuşurken",
     2.197,
     2.69
    ],
    [
     "ben",
     2.69,
     2.813
    ],
    [
     "kendi",
     2.813,
     3.06
    ],
    [
     "işime",
     3.06,
     3.43
    ],
    [
     "bakarım.",
     3.43,
     3.8
    ],
    [
     "Bilgili",
     4.3,
     4.738
    ],
    [
     "büyük",
     4.738,
     5.029
    ],
    [
     "konuşurken",
     5.029,
     5.613
    ],
    [
     "arkasını",
     5.613,
     6.196
    ],
    [
     "döner.",
     6.196,
     6.488
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 4.05,
   "m": "Sonra ne olur? Anlatılan bilgiyi kaçırır. Büyüğü de üzülebilir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.268
    ],
    [
     "ne",
     0.268,
     0.387
    ],
    [
     "olur?",
     0.387,
     0.625
    ],
    [
     "Anlatılan",
     1.11,
     1.702
    ],
    [
     "bilgiyi",
     1.702,
     2.146
    ],
    [
     "kaçırır.",
     2.146,
     2.59
    ],
    [
     "Büyüğü",
     2.93,
     3.28
    ],
    [
     "de",
     3.28,
     3.397
    ],
    [
     "üzülebilir.",
     3.397,
     3.98
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
   "sure": 8.065,
   "m": "Sağ uçta Takdis. O hiç hata yapmaz; ona soru sorulmaz. Bilgili büyüğünü hatasız sanır ve hiç soru sormaz.",
   "k": [
    [
     "Sağ",
     0.03,
     0.261
    ],
    [
     "uçta",
     0.261,
     0.723
    ],
    [
     "Takdis.",
     0.723,
     1.185
    ],
    [
     "O",
     1.575,
     1.728
    ],
    [
     "hiç",
     1.728,
     1.882
    ],
    [
     "hata",
     1.882,
     2.188
    ],
    [
     "yapmaz;",
     2.188,
     2.495
    ],
    [
     "ona",
     2.58,
     3.017
    ],
    [
     "soru",
     3.017,
     3.454
    ],
    [
     "sorulmaz.",
     3.454,
     4.11
    ],
    [
     "Bilgili",
     4.5,
     5.083
    ],
    [
     "büyüğünü",
     5.083,
     5.859
    ],
    [
     "hatasız",
     5.859,
     6.442
    ],
    [
     "sanır",
     6.442,
     6.83
    ],
    [
     "ve",
     6.83,
     7.024
    ],
    [
     "hiç",
     7.024,
     7.219
    ],
    [
     "soru",
     7.219,
     7.607
    ],
    [
     "sormaz.",
     7.607,
     7.995
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.568,
   "m": "Sonra ne olur? Anlamadığı yerler öylece kalır. Bir şeyi anlamayınca sormaya çekinir.",
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
     "Anlamadığı",
     1.035,
     1.9
    ],
    [
     "yerler",
     1.9,
     2.245
    ],
    [
     "öylece",
     2.245,
     2.764
    ],
    [
     "kalır.",
     2.764,
     3.11
    ],
    [
     "Bir",
     3.505,
     3.647
    ],
    [
     "şeyi",
     3.647,
     3.932
    ],
    [
     "anlamayınca",
     3.932,
     4.644
    ],
    [
     "sormaya",
     4.644,
     5.071
    ],
    [
     "çekinir.",
     5.071,
     5.498
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
   "sure": 7.359,
   "m": "Tam kararında Hürmet. Sizi dinliyorum; anlamadığımı sonra sorarım. Sözü bitirmesini bekler, sonra nazikçe sorar.",
   "k": [
    [
     "Tam",
     0.03,
     0.19
    ],
    [
     "kararında",
     0.19,
     0.83
    ],
    [
     "Hürmet.",
     0.83,
     1.15
    ],
    [
     "Sizi",
     1.36,
     1.608
    ],
    [
     "dinliyorum;",
     1.608,
     2.105
    ],
    [
     "anlamadığımı",
     2.405,
     3.1
    ],
    [
     "sonra",
     3.1,
     3.332
    ],
    [
     "sorarım.",
     3.332,
     3.68
    ],
    [
     "Sözü",
     4.345,
     4.713
    ],
    [
     "bitirmesini",
     4.713,
     5.633
    ],
    [
     "bekler,",
     5.633,
     6.001
    ],
    [
     "sonra",
     6.001,
     6.369
    ],
    [
     "nazikçe",
     6.369,
     6.921
    ],
    [
     "sorar.",
     6.921,
     7.289
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 4.962,
   "m": "Sonra ne olur? Anlattıkları kafasında yerleşir. Büyüğü de anlatmaktan memnun olur.",
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
     "Anlattıkları",
     1.08,
     1.784
    ],
    [
     "kafasında",
     1.784,
     2.348
    ],
    [
     "yerleşir.",
     2.348,
     2.77
    ],
    [
     "Büyüğü",
     3.06,
     3.518
    ],
    [
     "de",
     3.518,
     3.671
    ],
    [
     "anlatmaktan",
     3.671,
     4.281
    ],
    [
     "memnun",
     4.281,
     4.587
    ],
    [
     "olur.",
     4.587,
     4.892
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
   "sure": 3.557,
   "m": "Öğretmenin ders anlatırken bir yerde anlamadığın bir şey oldu. Ne yaparsın?",
   "k": [
    [
     "Öğretmenin",
     0.03,
     0.536
    ],
    [
     "ders",
     0.536,
     0.662
    ],
    [
     "anlatırken",
     0.662,
     1.168
    ],
    [
     "bir",
     1.168,
     1.294
    ],
    [
     "yerde",
     1.294,
     1.547
    ],
    [
     "anlamadığın",
     1.547,
     2.179
    ],
    [
     "bir",
     2.179,
     2.306
    ],
    [
     "şey",
     2.306,
     2.432
    ],
    [
     "oldu.",
     2.432,
     2.685
    ],
    [
     "Ne",
     2.975,
     3.103
    ],
    [
     "yaparsın?",
     3.103,
     3.487
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.781,
   "m": "Anlatılan konu kaçıyor; öğretmenin dersi de bölünüyor.",
   "k": [
    [
     "Anlatılan",
     0.03,
     0.641
    ],
    [
     "konu",
     0.641,
     0.947
    ],
    [
     "kaçıyor;",
     0.947,
     1.405
    ],
    [
     "öğretmenin",
     1.695,
     2.428
    ],
    [
     "dersi",
     2.428,
     2.795
    ],
    [
     "de",
     2.795,
     2.978
    ],
    [
     "bölünüyor.",
     2.978,
     3.711
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 2.253,
   "m": "Anlamadığın yer aklında takılı kalıyor.",
   "k": [
    [
     "Anlamadığın",
     0.03,
     0.748
    ],
    [
     "yer",
     0.748,
     0.891
    ],
    [
     "aklında",
     0.891,
     1.322
    ],
    [
     "takılı",
     1.322,
     1.752
    ],
    [
     "kalıyor.",
     1.752,
     2.183
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.903,
   "m": "Öğretmenin sakin sakin anlatıyor; anlamadığın yer netleşiyor.",
   "k": [
    [
     "Öğretmenin",
     0.03,
     0.675
    ],
    [
     "sakin",
     0.675,
     0.998
    ],
    [
     "sakin",
     0.998,
     1.32
    ],
    [
     "anlatıyor;",
     1.32,
     1.965
    ],
    [
     "anlamadığın",
     2.22,
     3.027
    ],
    [
     "yer",
     3.027,
     3.188
    ],
    [
     "netleşiyor.",
     3.188,
     3.833
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.677,
   "m": "Aile büyüğün sana bir konuda öğüt veriyor ama aklında bir soru var. Ne yaparsın?",
   "k": [
    [
     "Aile",
     0.03,
     0.553
    ],
    [
     "büyüğün",
     0.553,
     1.075
    ],
    [
     "sana",
     1.075,
     1.424
    ],
    [
     "bir",
     1.424,
     1.598
    ],
    [
     "konuda",
     1.598,
     2.121
    ],
    [
     "öğüt",
     2.121,
     2.469
    ],
    [
     "veriyor",
     2.469,
     2.992
    ],
    [
     "ama",
     2.992,
     3.34
    ],
    [
     "aklında",
     3.34,
     3.863
    ],
    [
     "bir",
     3.863,
     4.037
    ],
    [
     "soru",
     4.037,
     4.386
    ],
    [
     "var.",
     4.386,
     4.56
    ],
    [
     "Ne",
     5.155,
     5.268
    ],
    [
     "yaparsın?",
     5.268,
     5.607
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.14,
   "m": "Büyüğün anlatmaktan vazgeçiyor; paylaşacağı bilgiyi duyamıyorsun.",
   "k": [
    [
     "Büyüğün",
     0.03,
     0.494
    ],
    [
     "anlatmaktan",
     0.494,
     1.112
    ],
    [
     "vazgeçiyor;",
     1.112,
     1.73
    ],
    [
     "paylaşacağı",
     2.04,
     2.821
    ],
    [
     "bilgiyi",
     2.821,
     3.289
    ],
    [
     "duyamıyorsun.",
     3.289,
     4.07
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 2.862,
   "m": "Aklındaki soru cevapsız kalıyor.",
   "k": [
    [
     "Aklındaki",
     0.03,
     0.951
    ],
    [
     "soru",
     0.951,
     1.411
    ],
    [
     "cevapsız",
     1.411,
     2.102
    ],
    [
     "kalıyor.",
     2.102,
     2.792
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.924,
   "m": "Büyüğün memnun oluyor ve sorunu sevgiyle cevaplıyor.",
   "k": [
    [
     "Büyüğün",
     0.03,
     0.634
    ],
    [
     "memnun",
     0.634,
     1.036
    ],
    [
     "oluyor",
     1.036,
     1.64
    ],
    [
     "ve",
     1.64,
     1.841
    ],
    [
     "sorunu",
     1.841,
     2.445
    ],
    [
     "sevgiyle",
     2.445,
     3.049
    ],
    [
     "cevaplıyor.",
     3.049,
     3.854
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
   "sure": 11.635,
   "m": "Bu cümle bilerek çift anlamlı. Hocasını hatasız sanıp hiç soru sormayan biri söylüyorsa sağ uca yakın. Sözünü kesmeden dinleyip sonra nazikçe soran biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.207
    ],
    [
     "cümle",
     0.207,
     0.561
    ],
    [
     "bilerek",
     0.561,
     1.092
    ],
    [
     "çift",
     1.092,
     1.269
    ],
    [
     "anlamlı.",
     1.269,
     1.8
    ],
    [
     "Hocasını",
     2.055,
     2.766
    ],
    [
     "hatasız",
     2.766,
     3.299
    ],
    [
     "sanıp",
     3.299,
     3.654
    ],
    [
     "hiç",
     3.654,
     3.832
    ],
    [
     "soru",
     3.832,
     4.187
    ],
    [
     "sormayan",
     4.187,
     4.72
    ],
    [
     "biri",
     4.72,
     5.076
    ],
    [
     "söylüyorsa",
     5.076,
     5.787
    ],
    [
     "sağ",
     5.787,
     5.964
    ],
    [
     "uca",
     5.964,
     6.32
    ],
    [
     "yakın.",
     6.32,
     6.675
    ],
    [
     "Sözünü",
     6.97,
     7.462
    ],
    [
     "kesmeden",
     7.462,
     7.955
    ],
    [
     "dinleyip",
     7.955,
     8.447
    ],
    [
     "sonra",
     8.447,
     8.775
    ],
    [
     "nazikçe",
     8.775,
     9.267
    ],
    [
     "soran",
     9.267,
     9.595
    ],
    [
     "biri",
     9.595,
     9.924
    ],
    [
     "söylüyorsa",
     9.924,
     10.58
    ],
    [
     "orta",
     10.58,
     10.908
    ],
    [
     "uca",
     10.908,
     11.236
    ],
    [
     "yakın.",
     11.236,
     11.565
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
