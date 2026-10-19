/* İbremetre · Hikmetli Beyân — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Sükût-u Hakk · Hikmetli söz · Gıybet). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-beyan-giybet",
 "ad": "Hikmetli Beyân (Sükût · Gıybet): İbren Nerede?",
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
     "huy": "Hikmetli Beyân",
     "huyAnahtar": "Hikmetli",
     "olculen": "Sözümün yeri ve zamanı",
     "kanca": "Bazen susmak en doğrusu.",
     "uclar": {
      "az": "Sükût-u Hakk",
      "orta": "Hikmetli söz",
      "fazla": "Gıybet"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Hikmetli Beyân",
     "cumle": "Bazen susmak en doğrusu.",
     "uclar": {
      "az": "Sükût-u Hakk",
      "orta": "Hikmetli söz",
      "fazla": "Gıybet"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi söylenmesi gereken yerde bile susuyor: sol uca (Sükût-u Hakk) yakın. Başka okumada kimsenin arkasından konuşmamak için susuyor ve gerekince nazikçe söylemeyi biliyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an sözümüzün yerinde olup olmadığına bakar. Hikmetli Beyân; doğru yerde, doğru zamanda ve faydalı söz söylemektir. Bu ibre ölçekten çok yönü gösterir: bir uçta gerektiği yerde susmak, öbür uçta başkasının arkasından konuşmak vardır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Hikmetli Beyân",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Sükût-u Hakk",
      "orta": "Hikmetli söz",
      "fazla": "Gıybet"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Söylenmesi gerekeni söylememek neye benziyor?",
       "ad": "Sükût",
       "soz": "Söylersem başıma iş açılır, susayım.",
       "eylem": "yaslan",
       "zincir": [
        "Haksızlık yapan devam eder.",
        "Mağdur olan arkadaşı yalnız kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Söylersem başıma iş açılır, susayım.",
          "dogru": true,
          "not": "Sükût-u Hakk, doğruyu söyleyeceği yerde susmaktır. Zor olursa güvendiğin bir büyüğe söylemek de yardım ister."
         },
         {
          "m": "Gerekeni doğru kişiye ve nazikçe söyleyeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hikmetli sözün sesi."
         },
         {
          "m": "Bunu arkadaşlara anlatayım, o yokken konuşalım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: gıybetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Sükût",
        "soz": "Söylersem"
       },
       "zincirAnahtar": [
        "Haksızlık",
        "Mağdur"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Birinin arkasından konuşmak neye benziyor?",
       "ad": "Gıybet",
       "soz": "Biliyor musun, o yokken şunu yapmış!",
       "eylem": "isaret",
       "zincir": [
        "Anlatılan söz ağızdan ağıza dolaşır.",
        "Arkadaşı duyunca üzülür ve güveni azalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bunu arkadaşlara anlatayım, o yokken konuşalım.",
          "dogru": true,
          "not": "Gıybet, birinin kusurunu o yokken konuşmaktır. O duysa üzüleceği söz, arkasından da söylenmez."
         },
         {
          "m": "Söylersem başıma iş açılır, susayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: sükût-u hakkın sesi."
         },
         {
          "m": "Gerekeni doğru kişiye ve nazikçe söyleyeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hikmetli sözün sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Gıybet",
        "soz": "Biliyor"
       },
       "zincirAnahtar": [
        "Anlatılan",
        "Arkadaşı"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Hikmetli",
       "soz": "Önce ona, yalnızken ve nazikçe söyleyeyim.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı hatasını öğrenir.",
        "Sorun büyümeden çözülür ve aralarında güven kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Gerekeni doğru kişiye ve nazikçe söyleyeyim.",
          "dogru": true,
          "not": "Hikmetli Beyân, yerinde ve faydalı söz söylemektir. Gerektiğinde doğruyu söyler, gerekmediğinde arkadan konuşmaz."
         },
         {
          "m": "Söylersem başıma iş açılır, susayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: sükût-u hakkın sesi."
         },
         {
          "m": "Bunu arkadaşlara anlatayım, o yokken konuşalım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: gıybetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hikmetli",
        "soz": "Önce"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Sorun"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Hikmetli Beyân",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Sükût-u Hakk",
      "orta": "Hikmetli söz",
      "fazla": "Gıybet"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "kopya",
       "baslik": "Kopya",
       "tetik": "Bir arkadaşının ödevde kopya çektiğini gördün. Başka bir arkadaşın da bunu fark etti.",
       "secenekler": [
        {
         "m": "Görmemiş gibi yapar, hiçbir şey demem.",
         "zon": "az",
         "sonuc": "Kopya sürüyor; arkadaşın yanlışını fark etmiyor.",
         "not": "İbre sola kaydı: söylenmesi gereken söz saklanınca yanlış devam ediyor.",
         "ses": "s1az"
        },
        {
         "m": "Hemen bütün sınıfa onu anlatırım.",
         "zon": "fazla",
         "sonuc": "Arkadaşın herkesin dilinde kalıyor; küsüyor ve sana güvenmiyor.",
         "not": "İbre sağa kaydı: arkasından konuşmak sorunu çözmez, arkadaşı yaralar.",
         "ses": "s1fa"
        },
        {
         "m": "Ona yalnızken nazikçe söylerim; gerekirse öğretmene danışırım.",
         "zon": "orta",
         "sonuc": "Arkadaşın uyarılıyor ve kendini düzeltme fırsatı buluyor.",
         "not": "İbre ortada: doğru kişiye, doğru zamanda ve güzel söyledin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "grup",
       "baslik": "Mola sohbeti",
       "tetik": "Mola sırasında grupta biri, orada olmayan bir arkadaşın hakkında konuşmaya başlıyor.",
       "secenekler": [
        {
         "m": "Bir şey söylemem; sessizce dinlerim.",
         "zon": "az",
         "sonuc": "Konuşma uzuyor; arkadaşın savunacak kimse bulamıyor.",
         "not": "İbre sola kaydı: itiraz edilmeyince konuşma devam ediyor.",
         "ses": "s2az"
        },
        {
         "m": "Ben de onun hakkında bildiklerimi eklerim.",
         "zon": "fazla",
         "sonuc": "Söz büyüyor; arkadaşın duyunca çok üzülüyor.",
         "not": "İbre sağa kaydı: söze söz katmak arkasından konuşmayı büyütüyor.",
         "ses": "s2fa"
        },
        {
         "m": "O yokken konuşmayalım; sorun varsa ona söyleriz.",
         "zon": "orta",
         "sonuc": "Konu değişiyor; sorun varsa arkadaşınla yüz yüze konuşulacak.",
         "not": "İbre ortada: arkadan konuşmayı nazikçe durdurdun.",
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
       "ad": "Az · Sükût-u Hakk",
       "aciklama": "Gerekeni söylememek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Hikmetli söz",
       "aciklama": "Yerinde, faydalı söz",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Gıybet",
       "aciklama": "Arkasından konuşmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşı haksızlığa uğrarken olanı gördüğü hâlde sessiz kalır.",
       "alan": "az",
       "ipucu": "Söylenmesi gerekeni söylemiyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı yokken onun kusurlarını diğerlerine anlatır.",
       "alan": "fazla",
       "ipucu": "Arkasından konuşuyor."
      },
      {
       "id": "k3",
       "metin": "Hatalı arkadaşına yalnızken, nazikçe doğrusunu söyler.",
       "alan": "orta",
       "ipucu": "Doğru yerde, güzel söz."
      },
      {
       "id": "k4",
       "metin": "Haksızlığı bilir ama “başıma iş açılır” deyip hiç söylemez.",
       "alan": "az",
       "ipucu": "Susarak doğruyu saklıyor."
      },
      {
       "id": "k5",
       "metin": "Grupta, o yokken arkadaşının hatalarını tek tek sayar.",
       "alan": "fazla",
       "ipucu": "Arkadaşını arkasından yargılıyor."
      },
      {
       "id": "k6",
       "metin": "Konuşmadan önce düşünür: “Bu söz yerinde ve işe yarar mı?”",
       "alan": "orta",
       "ipucu": "Sözünü tartıyor."
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
        "Bir haksızlık görünce",
        "Arkadaşlarım birini konuşunca",
        "Birinin hatasını görünce",
        "Bir şey söylemeden önce"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Konuşmadan önce “yerinde ve işe yarar mı?” diye soracağım",
        "Bir kusuru, o kişiye nazikçe söyleyeceğim",
        "Zor bir durumda güvendiğim bir yetişkine anlatacağım"
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
       "baslik": "Hikmetli Beyân",
       "metin": "yerinde ve faydalı söz",
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
   "sure": 2.474,
   "m": "Bazen susmak en doğrusu.",
   "k": [
    [
     "Bazen",
     0.03,
     0.623
    ],
    [
     "susmak",
     0.623,
     1.217
    ],
    [
     "en",
     1.217,
     1.514
    ],
    [
     "doğrusu.",
     1.514,
     2.404
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 13.383,
   "m": "Birçok güzel huy bir ibre gibidir. Hikmetli Beyân, söylediğim sözün yerini ve zamanını ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.542
    ],
    [
     "güzel",
     0.542,
     1.054
    ],
    [
     "huy",
     1.054,
     1.31
    ],
    [
     "bir",
     1.31,
     1.565
    ],
    [
     "ibre",
     1.565,
     2.077
    ],
    [
     "gibidir.",
     2.077,
     2.845
    ],
    [
     "Hikmetli",
     3.92,
     4.481
    ],
    [
     "Beyân,",
     4.481,
     4.855
    ],
    [
     "söylediğim",
     5.19,
     5.916
    ],
    [
     "sözün",
     5.916,
     6.279
    ],
    [
     "yerini",
     6.279,
     6.824
    ],
    [
     "ve",
     6.824,
     7.006
    ],
    [
     "zamanını",
     7.006,
     7.732
    ],
    [
     "ölçer.",
     7.732,
     8.095
    ],
    [
     "İbre",
     8.84,
     9.433
    ],
    [
     "üç",
     9.433,
     9.73
    ],
    [
     "yerde",
     9.73,
     10.323
    ],
    [
     "durabilir:",
     10.323,
     11.51
    ],
    [
     "az,",
     11.92,
     12.067
    ],
    [
     "kararında,",
     12.067,
     12.655
    ],
    [
     "fazla.",
     12.98,
     13.313
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
   "sure": 8.594,
   "m": "Sol uçta Sükût. Söylersem başıma iş açılır, susayım. Haksızlığa tanık olur ama korkudan ses çıkarmaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.306
    ],
    [
     "uçta",
     0.306,
     0.858
    ],
    [
     "Sükût.",
     0.858,
     1.41
    ],
    [
     "Söylersem",
     1.485,
     2.196
    ],
    [
     "başıma",
     2.196,
     2.907
    ],
    [
     "iş",
     2.907,
     3.144
    ],
    [
     "açılır,",
     3.144,
     3.855
    ],
    [
     "susayım.",
     4.09,
     4.54
    ],
    [
     "Haksızlığa",
     5.14,
     5.936
    ],
    [
     "tanık",
     5.936,
     6.334
    ],
    [
     "olur",
     6.334,
     6.732
    ],
    [
     "ama",
     6.732,
     7.13
    ],
    [
     "korkudan",
     7.13,
     7.727
    ],
    [
     "ses",
     7.727,
     7.926
    ],
    [
     "çıkarmaz.",
     7.926,
     8.524
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.062,
   "m": "Sonra ne olur? Haksızlık yapan devam eder. Mağdur olan arkadaşı yalnız kalır.",
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
     "Haksızlık",
     1.235,
     1.695
    ],
    [
     "yapan",
     1.695,
     2.002
    ],
    [
     "devam",
     2.002,
     2.308
    ],
    [
     "eder.",
     2.308,
     2.615
    ],
    [
     "Mağdur",
     2.88,
     3.232
    ],
    [
     "olan",
     3.232,
     3.584
    ],
    [
     "arkadaşı",
     3.584,
     4.288
    ],
    [
     "yalnız",
     4.288,
     4.64
    ],
    [
     "kalır.",
     4.64,
     4.992
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
   "sure": 8.228,
   "m": "Sağ uçta Gıybet. Biliyor musun, o yokken şunu yapmış! Arkadaşının kusurlarını o yokken başkalarına anlatır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.27
    ],
    [
     "uçta",
     0.27,
     0.75
    ],
    [
     "Gıybet.",
     0.75,
     1.23
    ],
    [
     "Biliyor",
     1.32,
     2.037
    ],
    [
     "musun,",
     2.037,
     2.515
    ],
    [
     "o",
     2.74,
     2.922
    ],
    [
     "yokken",
     2.922,
     3.286
    ],
    [
     "şunu",
     3.286,
     3.651
    ],
    [
     "yapmış!",
     3.651,
     4.015
    ],
    [
     "Arkadaşının",
     4.3,
     5.218
    ],
    [
     "kusurlarını",
     5.218,
     6.137
    ],
    [
     "o",
     6.137,
     6.321
    ],
    [
     "yokken",
     6.321,
     6.688
    ],
    [
     "başkalarına",
     6.688,
     7.607
    ],
    [
     "anlatır.",
     7.607,
     8.158
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.9,
   "m": "Sonra ne olur? Anlatılan söz ağızdan ağıza dolaşır. Arkadaşı duyunca üzülür ve güveni azalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.278
    ],
    [
     "ne",
     0.278,
     0.402
    ],
    [
     "olur?",
     0.402,
     0.65
    ],
    [
     "Anlatılan",
     1.04,
     1.606
    ],
    [
     "söz",
     1.606,
     1.747
    ],
    [
     "ağızdan",
     1.747,
     2.171
    ],
    [
     "ağıza",
     2.171,
     2.596
    ],
    [
     "dolaşır.",
     2.596,
     3.02
    ],
    [
     "Arkadaşı",
     3.25,
     3.857
    ],
    [
     "duyunca",
     3.857,
     4.312
    ],
    [
     "üzülür",
     4.312,
     4.768
    ],
    [
     "ve",
     4.768,
     4.92
    ],
    [
     "güveni",
     4.92,
     5.375
    ],
    [
     "azalır.",
     5.375,
     5.83
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
   "sure": 10.193,
   "m": "Tam kararında Hikmetli. Önce ona, yalnızken ve nazikçe söyleyeyim. Kusuru arkasından konuşmaz; gerekince doğru kişiye güzelce söyler.",
   "k": [
    [
     "Tam",
     0.03,
     0.232
    ],
    [
     "kararında",
     0.232,
     1.039
    ],
    [
     "Hikmetli.",
     1.039,
     1.645
    ],
    [
     "Önce",
     2.12,
     2.445
    ],
    [
     "ona,",
     2.445,
     2.77
    ],
    [
     "yalnızken",
     3.025,
     3.539
    ],
    [
     "ve",
     3.539,
     3.71
    ],
    [
     "nazikçe",
     3.71,
     4.225
    ],
    [
     "söyleyeyim.",
     4.225,
     4.91
    ],
    [
     "Kusuru",
     5.205,
     5.795
    ],
    [
     "arkasından",
     5.795,
     6.58
    ],
    [
     "konuşmaz;",
     6.58,
     7.17
    ],
    [
     "gerekince",
     7.44,
     8.207
    ],
    [
     "doğru",
     8.207,
     8.59
    ],
    [
     "kişiye",
     8.59,
     9.165
    ],
    [
     "güzelce",
     9.165,
     9.74
    ],
    [
     "söyler.",
     9.74,
     10.123
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.554,
   "m": "Sonra ne olur? Arkadaşı hatasını öğrenir. Sorun büyümeden çözülür ve aralarında güven kalır.",
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
     "Arkadaşı",
     1.135,
     1.822
    ],
    [
     "hatasını",
     1.822,
     2.51
    ],
    [
     "öğrenir.",
     2.51,
     3.025
    ],
    [
     "Sorun",
     3.13,
     3.483
    ],
    [
     "büyümeden",
     3.483,
     4.189
    ],
    [
     "çözülür",
     4.189,
     4.719
    ],
    [
     "ve",
     4.719,
     4.895
    ],
    [
     "aralarında",
     4.895,
     5.778
    ],
    [
     "güven",
     5.778,
     6.131
    ],
    [
     "kalır.",
     6.131,
     6.484
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
   "sure": 5.203,
   "m": "Bir arkadaşının ödevde kopya çektiğini gördün. Başka bir arkadaşın da bunu fark etti. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.162
    ],
    [
     "arkadaşının",
     0.162,
     0.824
    ],
    [
     "ödevde",
     0.824,
     1.221
    ],
    [
     "kopya",
     1.221,
     1.486
    ],
    [
     "çektiğini",
     1.486,
     2.015
    ],
    [
     "gördün.",
     2.015,
     2.28
    ],
    [
     "Başka",
     2.505,
     2.787
    ],
    [
     "bir",
     2.787,
     2.927
    ],
    [
     "arkadaşın",
     2.927,
     3.49
    ],
    [
     "da",
     3.49,
     3.631
    ],
    [
     "bunu",
     3.631,
     3.913
    ],
    [
     "fark",
     3.913,
     4.053
    ],
    [
     "etti.",
     4.053,
     4.335
    ],
    [
     "Ne",
     4.58,
     4.718
    ],
    [
     "yaparsın?",
     4.718,
     5.133
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.014,
   "m": "Kopya sürüyor; arkadaşın yanlışını fark etmiyor.",
   "k": [
    [
     "Kopya",
     0.03,
     0.33
    ],
    [
     "sürüyor;",
     0.33,
     0.78
    ],
    [
     "arkadaşın",
     1.0,
     1.648
    ],
    [
     "yanlışını",
     1.648,
     2.296
    ],
    [
     "fark",
     2.296,
     2.458
    ],
    [
     "etmiyor.",
     2.458,
     2.944
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.352,
   "m": "Arkadaşın herkesin dilinde kalıyor; küsüyor ve sana güvenmiyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.513
    ],
    [
     "herkesin",
     0.513,
     0.875
    ],
    [
     "dilinde",
     0.875,
     1.238
    ],
    [
     "kalıyor;",
     1.238,
     1.6
    ],
    [
     "küsüyor",
     1.87,
     2.294
    ],
    [
     "ve",
     2.294,
     2.435
    ],
    [
     "sana",
     2.435,
     2.717
    ],
    [
     "güvenmiyor.",
     2.717,
     3.282
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.248,
   "m": "Arkadaşın uyarılıyor ve kendini düzeltme fırsatı buluyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.602
    ],
    [
     "uyarılıyor",
     0.602,
     1.318
    ],
    [
     "ve",
     1.318,
     1.461
    ],
    [
     "kendini",
     1.461,
     1.89
    ],
    [
     "düzeltme",
     1.89,
     2.32
    ],
    [
     "fırsatı",
     2.32,
     2.749
    ],
    [
     "buluyor.",
     2.749,
     3.179
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.914,
   "m": "Mola sırasında grupta biri, orada olmayan bir arkadaşın hakkında konuşmaya başlıyor. Ne yaparsın?",
   "k": [
    [
     "Mola",
     0.03,
     0.29
    ],
    [
     "sırasında",
     0.29,
     0.81
    ],
    [
     "grupta",
     0.81,
     1.07
    ],
    [
     "biri,",
     1.07,
     1.33
    ],
    [
     "orada",
     1.485,
     1.843
    ],
    [
     "olmayan",
     1.843,
     2.201
    ],
    [
     "bir",
     2.201,
     2.32
    ],
    [
     "arkadaşın",
     2.32,
     2.797
    ],
    [
     "hakkında",
     2.797,
     3.155
    ],
    [
     "konuşmaya",
     3.155,
     3.632
    ],
    [
     "başlıyor.",
     3.632,
     3.99
    ],
    [
     "Ne",
     4.31,
     4.444
    ],
    [
     "yaparsın?",
     4.444,
     4.844
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.114,
   "m": "Konuşma uzuyor; arkadaşın savunacak kimse bulamıyor.",
   "k": [
    [
     "Konuşma",
     0.03,
     0.367
    ],
    [
     "uzuyor;",
     0.367,
     0.705
    ],
    [
     "arkadaşın",
     0.995,
     1.58
    ],
    [
     "savunacak",
     1.58,
     2.166
    ],
    [
     "kimse",
     2.166,
     2.459
    ],
    [
     "bulamıyor.",
     2.459,
     3.044
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.632,
   "m": "Söz büyüyor; arkadaşın duyunca çok üzülüyor.",
   "k": [
    [
     "Söz",
     0.03,
     0.256
    ],
    [
     "büyüyor;",
     0.256,
     0.935
    ],
    [
     "arkadaşın",
     1.375,
     2.104
    ],
    [
     "duyunca",
     2.104,
     2.651
    ],
    [
     "çok",
     2.651,
     2.833
    ],
    [
     "üzülüyor.",
     2.833,
     3.562
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.608,
   "m": "Konu değişiyor; sorun varsa arkadaşınla yüz yüze konuşulacak.",
   "k": [
    [
     "Konu",
     0.03,
     0.278
    ],
    [
     "değişiyor;",
     0.278,
     0.775
    ],
    [
     "sorun",
     1.07,
     1.36
    ],
    [
     "varsa",
     1.36,
     1.651
    ],
    [
     "arkadaşınla",
     1.651,
     2.376
    ],
    [
     "yüz",
     2.376,
     2.522
    ],
    [
     "yüze",
     2.522,
     2.812
    ],
    [
     "konuşulacak.",
     2.812,
     3.538
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
   "sure": 11.123,
   "m": "Bu cümle bilerek çift anlamlı. Söylenmesi gereken yerde susan biri diyorsa sol uca yakın. Kimsenin arkasından konuşmamak için susan biri diyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.186
    ],
    [
     "cümle",
     0.186,
     0.499
    ],
    [
     "bilerek",
     0.499,
     0.969
    ],
    [
     "çift",
     0.969,
     1.126
    ],
    [
     "anlamlı.",
     1.126,
     1.595
    ],
    [
     "Söylenmesi",
     2.065,
     2.76
    ],
    [
     "gereken",
     2.76,
     3.282
    ],
    [
     "yerde",
     3.282,
     3.629
    ],
    [
     "susan",
     3.629,
     3.977
    ],
    [
     "biri",
     3.977,
     4.325
    ],
    [
     "diyorsa",
     4.325,
     4.846
    ],
    [
     "sol",
     4.846,
     5.02
    ],
    [
     "uca",
     5.02,
     5.367
    ],
    [
     "yakın.",
     5.367,
     5.715
    ],
    [
     "Kimsenin",
     6.175,
     6.738
    ],
    [
     "arkasından",
     6.738,
     7.488
    ],
    [
     "konuşmamak",
     7.488,
     8.239
    ],
    [
     "için",
     8.239,
     8.614
    ],
    [
     "susan",
     8.614,
     8.989
    ],
    [
     "biri",
     8.989,
     9.364
    ],
    [
     "diyorsa",
     9.364,
     9.927
    ],
    [
     "orta",
     9.927,
     10.303
    ],
    [
     "uca",
     10.303,
     10.678
    ],
    [
     "yakın.",
     10.678,
     11.053
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
