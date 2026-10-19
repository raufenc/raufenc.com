/* İbremetre · Tefekkür — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Düşünmemek · Tefekkür · Vesvese). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tefekkur",
 "ad": "Tefekkür: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "inanc",
 "muzik": "inanc",
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
     "huy": "Tefekkür",
     "huyAnahtar": "Tefekkür",
     "olculen": "Etrafıma bakıp düşünme biçimim",
     "kanca": "Gökyüzüne baktım, sustum.",
     "uclar": {
      "az": "Düşünmemek",
      "orta": "Tefekkür",
      "fazla": "Vesvese"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tefekkür",
     "cumle": "Gökyüzüne baktım, sustum.",
     "uclar": {
      "az": "Düşünmemek",
      "orta": "Tefekkür",
      "fazla": "Vesvese"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi gökyüzüne bakıp hiçbir şey düşünmeden geçiyor: sol uca (Düşünmemek) yakın. Başka okumada hayranlıkla bakıp içinden “ne güzel bir düzen” diyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, bakarken ne yaptığımıza bakar. Tefekkür; gökyüzü, mevsimler, bitkiler gibi çevremizdeki düzene ve eserlere bakıp Allahü teâlâ’nın izini aramak ve şükretmektir. Merak etmek ve soru sormak güzeldir; sağ uç merakı değil, aynı soruyu tekrar tekrar düşünüp rahat edememeyi gösterir. Bu ibre ölçekten çok yönü gösterir. Aklına takılan sorular rahatsız ederse güvendiğin bir yetişkinle konuşabilirsin.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tefekkür",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Düşünmemek",
      "orta": "Tefekkür",
      "fazla": "Vesvese"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Bakıp hiç düşünmemek neye benziyor?",
       "ad": "Düşünmemek",
       "soz": "Yağmur mu yağıyor? Neyse, hadi içeri.",
       "eylem": "yuru",
       "zincir": [
        "Gökyüzündeki renkler fark edilmeden kaybolur.",
        "Şükredebileceği güzellikler yanından geçip gider."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bulut işte, bulut; üstüne düşünmem.",
          "dogru": true,
          "not": "Düşünmemek, çevresindeki güzel eserlere bakıp geçmektir. Bir an durup “ne düzenli” demek yetebilir."
         },
         {
          "m": "Bu düzen ne güzel; her şeyin yeri belli.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tefekkürün sesi."
         },
         {
          "m": "Ya bir şey kaçırırsam? Aynı soruyu tekrar düşüneyim.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: vesvesenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Düşünmemek",
        "soz": "Yağmur"
       },
       "zincirAnahtar": [
        "Gökyüzündeki",
        "Şükredebileceği"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Aynı soruya takılıp kalan kişi neyi kaçırır?",
       "ad": "Vesvese",
       "soz": "Ya bir şey kaçırırsam? Aynı soruyu yine düşüneyim!",
       "eylem": "dusun",
       "zincir": [
        "Soru bitmez, bakmanın tadı kaçar.",
        "Güzel manzaranın keyfini çıkaramadan eve döner."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ya bir şey kaçırırsam? Aynı soruyu tekrar düşüneyim.",
          "dogru": true,
          "not": "Vesvese, merakı bırakıp aynı soruya takılıp kalmak ve cevap bulsan da rahat edememektir. Merak etmek güzeldir; soru durmuyorsa güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Bulut işte, bulut; üstüne düşünmem.",
          "dogru": false,
          "not": "Bu sol ucun sesi: düşünmemenin sesi."
         },
         {
          "m": "Bu düzen ne güzel; her şeyin yeri belli.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tefekkürün sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Vesvese",
        "soz": "Ya"
       },
       "zincirAnahtar": [
        "Soru",
        "Güzel"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tefekkür",
       "soz": "Su damlası bulut olup yağmur oluyor; ne düzen!",
       "eylem": "dusun",
       "zincir": [
        "Yağmurun toprağı, toprağın da bitkiyi beslediğini fark eder.",
        "Şükrü artar, bakışı derinleşir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bu düzen ne güzel; her şeyin yeri belli.",
          "dogru": true,
          "not": "Tefekkür, çevremizdeki düzene ve eserlere bakıp Allahü teâlâ’yı hatırlamak ve şükretmektir."
         },
         {
          "m": "Bulut işte, bulut; üstüne düşünmem.",
          "dogru": false,
          "not": "Bu sol ucun sesi: düşünmemenin sesi."
         },
         {
          "m": "Ya bir şey kaçırırsam? Aynı soruyu tekrar düşüneyim.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: vesvesenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tefekkür",
        "soz": "Su"
       },
       "zincirAnahtar": [
        "Yağmurun",
        "Şükrü"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tefekkür",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Düşünmemek",
      "orta": "Tefekkür",
      "fazla": "Vesvese"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "gokyuzu",
       "baslik": "Akşam gökyüzü",
       "tetik": "Akşam balkonda gökyüzüne bakıyorsun; yıldızlar yavaş yavaş görünüyor.",
       "secenekler": [
        {
         "m": "Yıldız işte; hadi telefona bakayım.",
         "zon": "az",
         "sonuc": "Manzara fark edilmeden geçiyor; içinden hiçbir soru geçmiyor.",
         "not": "İbre sola kaydı: bakıp düşünmemek, güzelliği kaçırıyor.",
         "ses": "s1az"
        },
        {
         "m": "Ya bir şey kaçırırsam? Aynı soruyu tekrar tekrar düşünüyorum!",
         "zon": "fazla",
         "sonuc": "Aynı soru zihninde dönüp duruyor; cevap bulsan da manzaradan keyif alamıyorsun.",
         "not": "İbre sağa kaydı: aynı soruyu tekrar tekrar düşünmek insanı yoruyor. Rahat edemiyorsan güvendiğin bir yetişkinle konuş.",
         "ses": "s1fa"
        },
        {
         "m": "Ne güzel düzen; Allahü teâlâ’ya şükrederim.",
         "zon": "orta",
         "sonuc": "Sakin bir düşünceyle bakıyorsun; içinde huzur oluyor.",
         "not": "İbre ortada: bakıp düşündün ve şükrettin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "tohum",
       "baslik": "Filizlenen fasulye",
       "tetik": "Sınıfta fasulye tohumunu saksıya ekmiştiniz. Bugün saksıda küçük bir filiz çıkmış.",
       "secenekler": [
        {
         "m": "Fasulye işte; sulama sırası kimdeydi?",
         "zon": "az",
         "sonuc": "Filiz fark edilmeden geçiliyor; merak edilecek bir şey kalmıyor.",
         "not": "İbre sola kaydı: bakmak var ama düşünmek yok.",
         "ses": "s2az"
        },
        {
         "m": "Filiz iyi mi büyüyor? Aynı soruyu durmadan düşünüp rahat edemiyorum.",
         "zon": "fazla",
         "sonuc": "Her bakışta aynı soru dönüyor; cevap bulsan da içinde bir rahatsızlık kalıyor.",
         "not": "İbre sağa kaydı: aynı soru dönüp durunca merak, huzursuzluğa dönüşüyor. Rahat edemiyorsan güvendiğin bir yetişkinle konuş.",
         "ses": "s2fa"
        },
        {
         "m": "Toprağın, suyun ve ışığın düzenine bakarım.",
         "zon": "orta",
         "sonuc": "Filizin nasıl büyüdüğünü merakla izliyorsun, kitaptan da bakıyorsun.",
         "not": "İbre ortada: merakla bakıp düzeni fark ettin.",
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
       "ad": "Az · Düşünmemek",
       "aciklama": "Bakıp düşünmemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tefekkür",
       "aciklama": "Bakıp düşünüp şükretmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Vesvese",
       "aciklama": "Aynı soruya takılıp kalmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Sonbaharda yaprakların rengine bakıp “e, yaprak işte” deyip geçer.",
       "alan": "az",
       "ipucu": "Bakıyor ama düşünmüyor."
      },
      {
       "id": "k2",
       "metin": "Aynı soruyu tekrar tekrar sorar, cevap aldıktan sonra da rahat edemez.",
       "alan": "fazla",
       "ipucu": "Cevaptan sonra da rahat edemiyor."
      },
      {
       "id": "k3",
       "metin": "Mevsimlerin sırayla geldiğini fark edip bu düzene şükreder.",
       "alan": "orta",
       "ipucu": "Düzeni görüp ibret alıyor."
      },
      {
       "id": "k4",
       "metin": "Yağmurdan sonra gökkuşağını görür ama bir şey düşünmeden içeri girer.",
       "alan": "az",
       "ipucu": "Düşünmeden geçiyor."
      },
      {
       "id": "k5",
       "metin": "Yıldızlara bakarken “ya bir şey kaçırırsam?” diye aynı soruyu kafasında döndürüp durur.",
       "alan": "fazla",
       "ipucu": "Aynı soruya takılıyor."
      },
      {
       "id": "k6",
       "metin": "Tohumun filizlenişini izler, merak eder ve kitaptan araştırır.",
       "alan": "orta",
       "ipucu": "Merakla bakıp öğreniyor."
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
        "Gökyüzüne bakarken",
        "Yağmur yağarken",
        "Bir bitkiyi görünce",
        "Aklıma bir soru takılınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bu hafta bir gün gökyüzüne bir dakika bakacağım",
        "Gördüğüm bir güzelliği defterime yazıp şükredeceğim",
        "Aynı soru takılırsa güvendiğim bir yetişkinle konuşacağım"
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
       "baslik": "Tefekkür",
       "metin": "bakıp düşünüp şükretmek",
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
   "sure": 2.213,
   "m": "Gökyüzüne baktım, sustum.",
   "k": [
    [
     "Gökyüzüne",
     0.03,
     0.71
    ],
    [
     "baktım,",
     0.71,
     1.05
    ],
    [
     "sustum.",
     1.73,
     2.143
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.721,
   "m": "Birçok güzel huy bir ibre gibidir. Tefekkür, çevremdekilere nasıl baktığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.474
    ],
    [
     "güzel",
     0.474,
     0.917
    ],
    [
     "huy",
     0.917,
     1.139
    ],
    [
     "bir",
     1.139,
     1.361
    ],
    [
     "ibre",
     1.361,
     1.805
    ],
    [
     "gibidir.",
     1.805,
     2.47
    ],
    [
     "Tefekkür,",
     3.135,
     3.715
    ],
    [
     "çevremdekilere",
     3.88,
     5.217
    ],
    [
     "nasıl",
     5.217,
     5.663
    ],
    [
     "baktığımı",
     5.663,
     6.554
    ],
    [
     "ölçer.",
     6.554,
     7.0
    ],
    [
     "İbre",
     7.14,
     7.641
    ],
    [
     "üç",
     7.641,
     7.892
    ],
    [
     "yerde",
     7.892,
     8.393
    ],
    [
     "durabilir:",
     8.393,
     9.395
    ],
    [
     "az,",
     9.98,
     10.128
    ],
    [
     "kararında,",
     10.128,
     10.72
    ],
    [
     "fazla.",
     11.245,
     11.651
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
   "sure": 8.156,
   "m": "Sol uçta Düşünmemek. Yağmur mu yağıyor? Neyse, hadi içeri. Güzel bir manzaraya bakar ama bir şey sormaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.256
    ],
    [
     "uçta",
     0.256,
     0.707
    ],
    [
     "Düşünmemek.",
     0.707,
     1.61
    ],
    [
     "Yağmur",
     1.7,
     2.237
    ],
    [
     "mu",
     2.237,
     2.505
    ],
    [
     "yağıyor?",
     2.505,
     3.31
    ],
    [
     "Neyse,",
     3.855,
     4.134
    ],
    [
     "hadi",
     4.134,
     4.412
    ],
    [
     "içeri.",
     4.412,
     4.83
    ],
    [
     "Güzel",
     5.22,
     5.602
    ],
    [
     "bir",
     5.602,
     5.793
    ],
    [
     "manzaraya",
     5.793,
     6.558
    ],
    [
     "bakar",
     6.558,
     6.94
    ],
    [
     "ama",
     6.94,
     7.322
    ],
    [
     "bir",
     7.322,
     7.513
    ],
    [
     "şey",
     7.513,
     7.704
    ],
    [
     "sormaz.",
     7.704,
     8.086
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 7.057,
   "m": "Sonra ne olur? Gökyüzündeki renkler fark edilmeden kaybolur. Şükredebileceği güzellikler yanından geçip gider.",
   "k": [
    [
     "Sonra",
     0.03,
     0.324
    ],
    [
     "ne",
     0.324,
     0.471
    ],
    [
     "olur?",
     0.471,
     0.765
    ],
    [
     "Gökyüzündeki",
     1.295,
     2.13
    ],
    [
     "renkler",
     2.13,
     2.464
    ],
    [
     "fark",
     2.464,
     2.631
    ],
    [
     "edilmeden",
     2.631,
     3.299
    ],
    [
     "kaybolur.",
     3.299,
     3.8
    ],
    [
     "Şükredebileceği",
     4.16,
     5.259
    ],
    [
     "güzellikler",
     5.259,
     5.888
    ],
    [
     "yanından",
     5.888,
     6.359
    ],
    [
     "geçip",
     6.359,
     6.673
    ],
    [
     "gider.",
     6.673,
     6.987
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
   "sure": 8.875,
   "m": "Sağ uçta Vesvese. Ya bir şey kaçırırsam? Aynı soruyu yine düşüneyim! Aynı soruyu tekrar tekrar düşünür, cevap bulsa da rahat edemez.",
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
     "Vesvese.",
     0.6,
     1.17
    ],
    [
     "Ya",
     1.85,
     1.989
    ],
    [
     "bir",
     1.989,
     2.129
    ],
    [
     "şey",
     2.129,
     2.268
    ],
    [
     "kaçırırsam?",
     2.268,
     2.825
    ],
    [
     "Aynı",
     3.325,
     3.549
    ],
    [
     "soruyu",
     3.549,
     3.884
    ],
    [
     "yine",
     3.884,
     4.108
    ],
    [
     "düşüneyim!",
     4.108,
     4.555
    ],
    [
     "Aynı",
     5.22,
     5.535
    ],
    [
     "soruyu",
     5.535,
     6.008
    ],
    [
     "tekrar",
     6.008,
     6.323
    ],
    [
     "tekrar",
     6.323,
     6.638
    ],
    [
     "düşünür,",
     6.638,
     7.11
    ],
    [
     "cevap",
     7.355,
     7.645
    ],
    [
     "bulsa",
     7.645,
     7.935
    ],
    [
     "da",
     7.935,
     8.08
    ],
    [
     "rahat",
     8.08,
     8.37
    ],
    [
     "edemez.",
     8.37,
     8.805
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.915,
   "m": "Sonra ne olur? Soru bitmez, bakmanın tadı kaçar. Güzel manzaranın keyfini çıkaramadan eve döner.",
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
     "Soru",
     1.1,
     1.51
    ],
    [
     "bitmez,",
     1.51,
     1.92
    ],
    [
     "bakmanın",
     2.25,
     2.743
    ],
    [
     "tadı",
     2.743,
     3.071
    ],
    [
     "kaçar.",
     3.071,
     3.4
    ],
    [
     "Güzel",
     3.69,
     4.041
    ],
    [
     "manzaranın",
     4.041,
     4.742
    ],
    [
     "keyfini",
     4.742,
     5.267
    ],
    [
     "çıkaramadan",
     5.267,
     6.144
    ],
    [
     "eve",
     6.144,
     6.494
    ],
    [
     "döner.",
     6.494,
     6.845
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
   "sure": 9.718,
   "m": "Tam kararında Tefekkür. Su damlası bulut olup yağmur oluyor; ne düzen! Yağmura bakar, suyun yolculuğunu düşünür ve şükreder.",
   "k": [
    [
     "Tam",
     0.03,
     0.236
    ],
    [
     "kararında",
     0.236,
     1.058
    ],
    [
     "Tefekkür.",
     1.058,
     1.675
    ],
    [
     "Su",
     2.31,
     2.476
    ],
    [
     "damlası",
     2.476,
     2.975
    ],
    [
     "bulut",
     2.975,
     3.307
    ],
    [
     "olup",
     3.307,
     3.639
    ],
    [
     "yağmur",
     3.639,
     3.972
    ],
    [
     "oluyor;",
     3.972,
     4.47
    ],
    [
     "ne",
     4.725,
     4.943
    ],
    [
     "düzen!",
     4.943,
     5.38
    ],
    [
     "Yağmura",
     6.01,
     6.502
    ],
    [
     "bakar,",
     6.502,
     6.83
    ],
    [
     "suyun",
     7.055,
     7.425
    ],
    [
     "yolculuğunu",
     7.425,
     8.351
    ],
    [
     "düşünür",
     8.351,
     8.907
    ],
    [
     "ve",
     8.907,
     9.092
    ],
    [
     "şükreder.",
     9.092,
     9.648
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 7.429,
   "m": "Sonra ne olur? Yağmurun toprağı, toprağın da bitkiyi beslediğini fark eder. Şükrü artar, bakışı derinleşir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.282
    ],
    [
     "ne",
     0.282,
     0.408
    ],
    [
     "olur?",
     0.408,
     0.66
    ],
    [
     "Yağmurun",
     1.31,
     1.8
    ],
    [
     "toprağı,",
     1.8,
     2.29
    ],
    [
     "toprağın",
     2.385,
     3.036
    ],
    [
     "da",
     3.036,
     3.253
    ],
    [
     "bitkiyi",
     3.253,
     3.904
    ],
    [
     "beslediğini",
     3.904,
     4.989
    ],
    [
     "fark",
     4.989,
     5.206
    ],
    [
     "eder.",
     5.206,
     5.64
    ],
    [
     "Şükrü",
     5.89,
     6.157
    ],
    [
     "artar,",
     6.157,
     6.424
    ],
    [
     "bakışı",
     6.424,
     6.825
    ],
    [
     "derinleşir.",
     6.825,
     7.359
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
   "sure": 4.869,
   "m": "Akşam balkonda gökyüzüne bakıyorsun; yıldızlar yavaş yavaş görünüyor. Ne yaparsın?",
   "k": [
    [
     "Akşam",
     0.03,
     0.353
    ],
    [
     "balkonda",
     0.353,
     0.838
    ],
    [
     "gökyüzüne",
     0.838,
     1.484
    ],
    [
     "bakıyorsun;",
     1.484,
     2.13
    ],
    [
     "yıldızlar",
     2.215,
     2.683
    ],
    [
     "yavaş",
     2.683,
     2.995
    ],
    [
     "yavaş",
     2.995,
     3.306
    ],
    [
     "görünüyor.",
     3.306,
     3.93
    ],
    [
     "Ne",
     4.325,
     4.444
    ],
    [
     "yaparsın?",
     4.444,
     4.799
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.226,
   "m": "Manzara fark edilmeden geçiyor; içinden hiçbir soru geçmiyor.",
   "k": [
    [
     "Manzara",
     0.03,
     0.485
    ],
    [
     "fark",
     0.485,
     0.637
    ],
    [
     "edilmeden",
     0.637,
     1.245
    ],
    [
     "geçiyor;",
     1.245,
     1.7
    ],
    [
     "içinden",
     2.08,
     2.703
    ],
    [
     "hiçbir",
     2.703,
     3.118
    ],
    [
     "soru",
     3.118,
     3.534
    ],
    [
     "geçmiyor.",
     3.534,
     4.156
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.224,
   "m": "Aynı soru zihninde dönüp duruyor; cevap bulsan da manzaradan keyif alamıyorsun.",
   "k": [
    [
     "Aynı",
     0.03,
     0.282
    ],
    [
     "soru",
     0.282,
     0.535
    ],
    [
     "zihninde",
     0.535,
     0.914
    ],
    [
     "dönüp",
     0.914,
     1.166
    ],
    [
     "duruyor;",
     1.166,
     1.545
    ],
    [
     "cevap",
     2.01,
     2.278
    ],
    [
     "bulsan",
     2.278,
     2.546
    ],
    [
     "da",
     2.546,
     2.68
    ],
    [
     "manzaradan",
     2.68,
     3.216
    ],
    [
     "keyif",
     3.216,
     3.484
    ],
    [
     "alamıyorsun.",
     3.484,
     4.154
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.715,
   "m": "Sakin bir düşünceyle bakıyorsun; içinde huzur oluyor.",
   "k": [
    [
     "Sakin",
     0.03,
     0.322
    ],
    [
     "bir",
     0.322,
     0.468
    ],
    [
     "düşünceyle",
     0.468,
     1.051
    ],
    [
     "bakıyorsun;",
     1.051,
     1.635
    ],
    [
     "içinde",
     2.125,
     2.695
    ],
    [
     "huzur",
     2.695,
     3.075
    ],
    [
     "oluyor.",
     3.075,
     3.645
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.184,
   "m": "Sınıfta fasulye tohumunu saksıya ekmiştiniz. Bugün saksıda küçük bir filiz çıkmış. Ne yaparsın?",
   "k": [
    [
     "Sınıfta",
     0.03,
     0.6
    ],
    [
     "fasulye",
     0.6,
     1.17
    ],
    [
     "tohumunu",
     1.17,
     1.93
    ],
    [
     "saksıya",
     1.93,
     2.5
    ],
    [
     "ekmiştiniz.",
     2.5,
     3.26
    ],
    [
     "Bugün",
     3.37,
     3.679
    ],
    [
     "saksıda",
     3.679,
     4.143
    ],
    [
     "küçük",
     4.143,
     4.452
    ],
    [
     "bir",
     4.452,
     4.607
    ],
    [
     "filiz",
     4.607,
     4.916
    ],
    [
     "çıkmış.",
     4.916,
     5.225
    ],
    [
     "Ne",
     5.58,
     5.713
    ],
    [
     "yaparsın?",
     5.713,
     6.114
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.262,
   "m": "Filiz fark edilmeden geçiliyor; merak edilecek bir şey kalmıyor.",
   "k": [
    [
     "Filiz",
     0.03,
     0.29
    ],
    [
     "fark",
     0.29,
     0.42
    ],
    [
     "edilmeden",
     0.42,
     0.94
    ],
    [
     "geçiliyor;",
     0.94,
     1.46
    ],
    [
     "merak",
     1.785,
     2.041
    ],
    [
     "edilecek",
     2.041,
     2.552
    ],
    [
     "bir",
     2.552,
     2.68
    ],
    [
     "şey",
     2.68,
     2.808
    ],
    [
     "kalmıyor.",
     2.808,
     3.192
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.052,
   "m": "Her bakışta aynı soru dönüyor; cevap bulsan da içinde bir rahatsızlık kalıyor.",
   "k": [
    [
     "Her",
     0.03,
     0.175
    ],
    [
     "bakışta",
     0.175,
     0.61
    ],
    [
     "aynı",
     0.61,
     0.9
    ],
    [
     "soru",
     0.9,
     1.19
    ],
    [
     "dönüyor;",
     1.19,
     1.625
    ],
    [
     "cevap",
     1.755,
     2.033
    ],
    [
     "bulsan",
     2.033,
     2.312
    ],
    [
     "da",
     2.312,
     2.451
    ],
    [
     "içinde",
     2.451,
     2.869
    ],
    [
     "bir",
     2.869,
     3.008
    ],
    [
     "rahatsızlık",
     3.008,
     3.565
    ],
    [
     "kalıyor.",
     3.565,
     3.982
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.786,
   "m": "Filizin nasıl büyüdüğünü merakla izliyorsun, kitaptan da bakıyorsun.",
   "k": [
    [
     "Filizin",
     0.03,
     0.444
    ],
    [
     "nasıl",
     0.444,
     0.72
    ],
    [
     "büyüdüğünü",
     0.72,
     1.409
    ],
    [
     "merakla",
     1.409,
     1.823
    ],
    [
     "izliyorsun,",
     1.823,
     2.375
    ],
    [
     "kitaptan",
     2.66,
     3.056
    ],
    [
     "da",
     3.056,
     3.188
    ],
    [
     "bakıyorsun.",
     3.188,
     3.716
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
   "sure": 9.301,
   "m": "Bu cümle bilerek çift anlamlı. Gökyüzüne bakıp hiçbir şey düşünmeyen biri söylüyorsa sol uca yakın. Hayranlıkla bakıp düzeni düşünen biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.166
    ],
    [
     "cümle",
     0.166,
     0.438
    ],
    [
     "bilerek",
     0.438,
     0.846
    ],
    [
     "çift",
     0.846,
     0.982
    ],
    [
     "anlamlı.",
     0.982,
     1.39
    ],
    [
     "Gökyüzüne",
     1.945,
     2.527
    ],
    [
     "bakıp",
     2.527,
     2.817
    ],
    [
     "hiçbir",
     2.817,
     3.108
    ],
    [
     "şey",
     3.108,
     3.254
    ],
    [
     "düşünmeyen",
     3.254,
     3.835
    ],
    [
     "biri",
     3.835,
     4.126
    ],
    [
     "söylüyorsa",
     4.126,
     4.708
    ],
    [
     "sol",
     4.708,
     4.853
    ],
    [
     "uca",
     4.853,
     5.144
    ],
    [
     "yakın.",
     5.144,
     5.435
    ],
    [
     "Hayranlıkla",
     5.89,
     6.447
    ],
    [
     "bakıp",
     6.447,
     6.725
    ],
    [
     "düzeni",
     6.725,
     7.143
    ],
    [
     "düşünen",
     7.143,
     7.56
    ],
    [
     "biri",
     7.56,
     7.839
    ],
    [
     "söylüyorsa",
     7.839,
     8.395
    ],
    [
     "orta",
     8.395,
     8.674
    ],
    [
     "uca",
     8.674,
     8.952
    ],
    [
     "yakın.",
     8.952,
     9.231
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
