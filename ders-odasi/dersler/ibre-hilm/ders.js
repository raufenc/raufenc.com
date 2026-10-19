/* İbremetre · Hilm — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Kayıtsızlık · Hilm · Hıkd). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-hilm",
 "ad": "Hilm: İbren Nerede?",
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
     "huy": "Hilm",
     "huyAnahtar": "Hilm",
     "olculen": "Öfkeyi ve haksızlığı karşılama biçimim",
     "kanca": "Bir şey demedim ama unutmadım.",
     "uclar": {
      "az": "Kayıtsızlık",
      "orta": "Hilm",
      "fazla": "Hıkd"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Hilm",
     "cumle": "Bir şey demedim ama unutmadım.",
     "uclar": {
      "az": "Kayıtsızlık",
      "orta": "Hilm",
      "fazla": "Hıkd"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi öfkeyle karşılık vermedi, olanı aklında tutuyor ve uygun bir zamanda sakince konuşacak: orta uca yakın. Başka okumada olanı kalbinde saklıyor ve içinde büyütüyor: sağ uca (Hıkd) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an öfkeyi ve haksızlığı nasıl karşıladığımıza bakar. Hilm; öfkelensen de yumuşak davranmak, kırgınlığı sakin bir sözle söylemektir. Sol uç, haksızlığa bile aldırmamaktır; sağ uç ise öfkeyi içinde büyütüp küs durmak ve sessizce karşılık beklemektir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Hilm",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Kayıtsızlık",
      "orta": "Hilm",
      "fazla": "Hıkd"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Haksızlığa bile aldırmamak neye benziyor?",
       "ad": "Kayıtsızlık",
       "soz": "Olsun, aldırmam; ne yaparlarsa yapsınlar.",
       "eylem": "yaslan",
       "zincir": [
        "Yapılanın yanlış olduğu kimseye söylenmez.",
        "Sorun çözülmeden büyümeye devam eder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Aldırmazsam bir şey olmaz; sesimi çıkarmayayım.",
          "dogru": true,
          "not": "Kayıtsızlık, haksızlığa karşı bile duyarsız kalmaktır. Sakin olmak ile aldırmamak aynı şey değildir."
         },
         {
          "m": "Kızdım ama sakin kalıp konuşacağım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hilmin sesi."
         },
         {
          "m": "Küstüm; konuşmam, sırası gelince karşılığını veririm.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hıkdın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kayıtsızlık",
        "soz": "Olsun,"
       },
       "zincirAnahtar": [
        "Yapılanın",
        "Sorun"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Öfkeyi içinde büyütmek neye benziyor?",
       "ad": "Hıkd",
       "soz": "Küstüm, konuşmam; sırası gelince görürsün.",
       "eylem": "dusun",
       "zincir": [
        "Küskünlük içinde her gün biraz daha büyür.",
        "Arkadaşı neden soğuk davrandığını anlayamaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Küstüm; konuşmam, sırası gelince karşılığını veririm.",
          "dogru": true,
          "not": "Hıkd, öfkeyi kalpte saklayıp büyütmektir. Küçük bir kırgınlık, içinde büyüdükçe yük olur."
         },
         {
          "m": "Aldırmazsam bir şey olmaz; sesimi çıkarmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: kayıtsızlığın sesi."
         },
         {
          "m": "Kızdım ama sakin kalıp konuşacağım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hilmin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hıkd",
        "soz": "Küstüm,"
       },
       "zincirAnahtar": [
        "Küskünlük",
        "Arkadaşı"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Hilm",
       "soz": "Kızdım ama sakin konuşacağım.",
       "eylem": "nefes",
       "zincir": [
        "Sakin sözler karşısındakini de yumuşatır.",
        "Sorun büyümeden konuşularak çözülür."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Kızdım ama sakin kalıp konuşacağım.",
          "dogru": true,
          "not": "Hilm, öfkelensen de yumuşak davranmaktır. Öfkeyi hissetmek kusur değil; onu nasıl taşıdığın önemli."
         },
         {
          "m": "Aldırmazsam bir şey olmaz; sesimi çıkarmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: kayıtsızlığın sesi."
         },
         {
          "m": "Küstüm; konuşmam, sırası gelince karşılığını veririm.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hıkdın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hilm",
        "soz": "Kızdım"
       },
       "zincirAnahtar": [
        "Sakin",
        "Sorun"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Hilm",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Kayıtsızlık",
      "orta": "Hilm",
      "fazla": "Hıkd"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "itis",
       "baslik": "Teneffüste itiş",
       "tetik": "Teneffüste bir arkadaşın seni itip kitaplarını yere düşürdü. Bunu bilerek yaptı.",
       "secenekler": [
        {
         "m": "Olsun, aldırmam; istediği gibi itsin.",
         "zon": "az",
         "sonuc": "Aynı şey yine olabilir; sen de kendi sınırını söylememiş oluyorsun.",
         "not": "İbre sola kaydı: haksızlığa bile aldırmamak sorunu çözmüyor.",
         "ses": "s1az"
        },
        {
         "m": "Bir şey demem ama içimde tutarım; sırası gelir.",
         "zon": "fazla",
         "sonuc": "Öfke içinde duruyor; onu her gördüğünde yeniden kızıyorsun.",
         "not": "İbre sağa kaydı: öfkeyi saklamak onu büyütüyor.",
         "ses": "s1fa"
        },
        {
         "m": "“Canım yandı; bir daha yapma” diye sakince söylerim.",
         "zon": "orta",
         "sonuc": "Arkadaşın durup düşünüyor; tekrar ederse öğretmene söyleyeceksin.",
         "not": "İbre ortada: kızgınlığı sakin bir sözle söyledin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kule",
       "baslik": "Kardeşle oyun",
       "tetik": "Küçük kardeşin, emek verdiğin kule oyununu bozdu.",
       "secenekler": [
        {
         "m": "Olsun, ne olursa olsun fark etmez.",
         "zon": "az",
         "sonuc": "Emeğin yok sayılmış oluyor; kardeşin neyi bozduğunu anlamıyor.",
         "not": "İbre sola kaydı: hiç tepki vermemek, kırgınlığı ve sınırı görünmez kılıyor.",
         "ses": "s2az"
        },
        {
         "m": "Bir şey demem ama aklımda tutarım; o da bir gün görsün.",
         "zon": "fazla",
         "sonuc": "Küçük olay kalbinde büyüyor; sonraki oyunlarda da kızgın oturuyorsun.",
         "not": "İbre sağa kaydı: kırgınlığı saklamak, küçük olayı büyütüyor.",
         "ses": "s2fa"
        },
        {
         "m": "Üzüldüm; sakince anlatıp birlikte yeniden kurarız.",
         "zon": "orta",
         "sonuc": "Kardeşin dinliyor ve birlikte yeniden kuruyorsunuz.",
         "not": "İbre ortada: öfkenin üstüne yumuşak bir sözle gittin.",
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
     "tur": "ibreNefes",
     "id": "nefes",
     "baslik": "Oyun parçan bozuldu",
     "tetik": "Arkadaşın, çok sevdiğin oyun parçanı bozdu. İbreye bak: o ne yapıyor?",
     "uclar": {
      "az": "Kayıtsızlık",
      "orta": "Hilm",
      "fazla": "Hiddet"
     },
     "ses": {
      "acilis": "v1",
      "yonerge": "v2",
      "ipucu": "v3",
      "yatisti": "v4",
      "soru": "v5"
     },
     "secenekler": [
      {
       "m": "Önemli değil, boşver.",
       "zon": "az",
       "ses": "v6"
      },
      {
       "m": "Bu parça benim için önemliydi. Bir dahaki sefere önce bana sor, lütfen.",
       "zon": "orta",
       "ses": "v7"
      },
      {
       "m": "Hep yapıyorsun bunu! Hiç dikkat etmiyorsun, hep senin yüzünden!",
       "zon": "fazla",
       "ses": "v8"
      }
     ],
     "huy": "Hilm",
     "yesil": 0.26
    },
    {
     "id": "uc-bul",
     "tur": "siniflandir",
     "baslik": "Hangi uca yakın?",
     "yonerge": "Kartı ibrenin uygun ucuna taşı. Emin değilsen karta bak: ipucu var.",
     "alanlar": [
      {
       "id": "az",
       "ad": "Az · Kayıtsızlık",
       "aciklama": "Haksızlığa aldırmamak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Hilm",
       "aciklama": "Öfkede yumuşak kalmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Hıkd",
       "aciklama": "Küsüp içinde büyütmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Haksız yere azarlanınca “olsun” der, hiçbir şey söylemez.",
       "alan": "az",
       "ipucu": "Haksızlığa aldırmıyor."
      },
      {
       "id": "k2",
       "metin": "Kırıldığı arkadaşıyla haftalar sonra bile konuşmaz: “Unutmadım.”",
       "alan": "fazla",
       "ipucu": "Kırgınlığı saklıyor."
      },
      {
       "id": "k3",
       "metin": "Kızınca durup derin nefes alır, sonra sakin konuşur.",
       "alan": "orta",
       "ipucu": "Öfkesini yumuşak taşıyor."
      },
      {
       "id": "k4",
       "metin": "Oyunda hakkı yenince sesini çıkarmaz, olmamış gibi davranır.",
       "alan": "az",
       "ipucu": "Kendi hakkına bile aldırmıyor."
      },
      {
       "id": "k5",
       "metin": "Kırıldığı arkadaşına belli etmeden kendince karşılık vermeyi bekler.",
       "alan": "fazla",
       "ipucu": "Kırgınlığı içinde büyütüyor."
      },
      {
       "id": "k6",
       "metin": "Kardeşi bozunca “üzüldüm, bir daha yapma” der ve barışır.",
       "alan": "orta",
       "ipucu": "Sakince söyleyip affediyor."
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
        "Biri bana haksızlık yapınca",
        "Çok kızdığımda",
        "Bir arkadaşım beni kırınca",
        "Eski bir kırgınlığı hatırlayınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Kızınca önce üç nefes alacağım",
        "Üzüldüğümü sakin bir cümleyle söyleyeceğim",
        "Gerekirse güvendiğim bir yetişkinden yardım isteyeceğim"
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
       "baslik": "Hilm",
       "metin": "öfkede yumuşak kalmak",
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
   "sure": 2.325,
   "m": "Bir şey demedim ama unutmadım.",
   "k": [
    [
     "Bir",
     0.03,
     0.232
    ],
    [
     "şey",
     0.232,
     0.435
    ],
    [
     "demedim",
     0.435,
     1.041
    ],
    [
     "ama",
     1.041,
     1.446
    ],
    [
     "unutmadım.",
     1.446,
     2.255
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.345,
   "m": "Birçok güzel huy bir ibre gibidir. Hilm, öfkeyi ve haksızlığı nasıl karşıladığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.429
    ],
    [
     "güzel",
     0.429,
     0.828
    ],
    [
     "huy",
     0.828,
     1.028
    ],
    [
     "bir",
     1.028,
     1.227
    ],
    [
     "ibre",
     1.227,
     1.626
    ],
    [
     "gibidir.",
     1.626,
     2.225
    ],
    [
     "Hilm,",
     2.68,
     3.115
    ],
    [
     "öfkeyi",
     3.31,
     3.877
    ],
    [
     "ve",
     3.877,
     4.066
    ],
    [
     "haksızlığı",
     4.066,
     4.821
    ],
    [
     "nasıl",
     4.821,
     5.199
    ],
    [
     "karşıladığımı",
     5.199,
     6.332
    ],
    [
     "ölçer.",
     6.332,
     6.71
    ],
    [
     "İbre",
     6.82,
     7.226
    ],
    [
     "üç",
     7.226,
     7.428
    ],
    [
     "yerde",
     7.428,
     7.834
    ],
    [
     "durabilir:",
     7.834,
     8.645
    ],
    [
     "az,",
     8.935,
     9.615
    ],
    [
     "kararında,",
     9.935,
     10.162
    ],
    [
     "fazla.",
     10.162,
     10.275
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
   "sure": 7.366,
   "m": "Sol uçta Kayıtsızlık. Olsun, aldırmam; ne yaparlarsa yapsınlar. İtilip incinse de yüzünü bile buruşturmaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.221
    ],
    [
     "uçta",
     0.221,
     0.604
    ],
    [
     "Kayıtsızlık.",
     0.604,
     1.37
    ],
    [
     "Olsun,",
     1.47,
     1.475
    ],
    [
     "aldırmam;",
     2.04,
     2.395
    ],
    [
     "ne",
     2.68,
     2.91
    ],
    [
     "yaparlarsa",
     2.91,
     3.83
    ],
    [
     "yapsınlar.",
     3.83,
     4.52
    ],
    [
     "İtilip",
     4.6,
     5.106
    ],
    [
     "incinse",
     5.106,
     5.611
    ],
    [
     "de",
     5.611,
     5.78
    ],
    [
     "yüzünü",
     5.78,
     6.285
    ],
    [
     "bile",
     6.285,
     6.622
    ],
    [
     "buruşturmaz.",
     6.622,
     7.296
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.265,
   "m": "Sonra ne olur? Yapılanın yanlış olduğu kimseye söylenmez. Sorun çözülmeden büyümeye devam eder.",
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
     "Yapılanın",
     1.01,
     1.655
    ],
    [
     "yanlış",
     1.655,
     1.978
    ],
    [
     "olduğu",
     1.978,
     2.462
    ],
    [
     "kimseye",
     2.462,
     2.946
    ],
    [
     "söylenmez.",
     2.946,
     3.43
    ],
    [
     "Sorun",
     3.73,
     4.082
    ],
    [
     "çözülmeden",
     4.082,
     4.786
    ],
    [
     "büyümeye",
     4.786,
     5.49
    ],
    [
     "devam",
     5.49,
     5.843
    ],
    [
     "eder.",
     5.843,
     6.195
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
   "sure": 7.798,
   "m": "Sağ uçta Hıkd. Küstüm, konuşmam; sırası gelince görürsün. Sessizce küser ve içinden bir karşılık düşünür.",
   "k": [
    [
     "Sağ",
     0.03,
     0.202
    ],
    [
     "uçta",
     0.202,
     0.547
    ],
    [
     "Hıkd.",
     0.547,
     0.72
    ],
    [
     "Küstüm,",
     0.865,
     1.14
    ],
    [
     "konuşmam;",
     1.83,
     2.22
    ],
    [
     "sırası",
     2.47,
     3.165
    ],
    [
     "gelince",
     3.165,
     3.86
    ],
    [
     "görürsün.",
     3.86,
     4.555
    ],
    [
     "Sessizce",
     5.03,
     5.536
    ],
    [
     "küser",
     5.536,
     5.873
    ],
    [
     "ve",
     5.873,
     6.042
    ],
    [
     "içinden",
     6.042,
     6.548
    ],
    [
     "bir",
     6.548,
     6.716
    ],
    [
     "karşılık",
     6.716,
     7.222
    ],
    [
     "düşünür.",
     7.222,
     7.728
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.484,
   "m": "Sonra ne olur? Küskünlük içinde her gün biraz daha büyür. Arkadaşı neden soğuk davrandığını anlayamaz.",
   "k": [
    [
     "Sonra",
     0.03,
     0.308
    ],
    [
     "ne",
     0.308,
     0.447
    ],
    [
     "olur?",
     0.447,
     0.725
    ],
    [
     "Küskünlük",
     1.105,
     1.71
    ],
    [
     "içinde",
     1.71,
     2.316
    ],
    [
     "her",
     2.316,
     2.518
    ],
    [
     "gün",
     2.518,
     2.719
    ],
    [
     "biraz",
     2.719,
     3.123
    ],
    [
     "daha",
     3.123,
     3.526
    ],
    [
     "büyür.",
     3.526,
     3.93
    ],
    [
     "Arkadaşı",
     4.14,
     4.675
    ],
    [
     "neden",
     4.675,
     4.942
    ],
    [
     "soğuk",
     4.942,
     5.21
    ],
    [
     "davrandığını",
     5.21,
     5.879
    ],
    [
     "anlayamaz.",
     5.879,
     6.414
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
   "sure": 6.959,
   "m": "Tam kararında Hilm. Kızdım ama sakin konuşacağım. Derin nefes alır, nazik bir cümle seçer.",
   "k": [
    [
     "Tam",
     0.03,
     0.208
    ],
    [
     "kararında",
     0.208,
     0.922
    ],
    [
     "Hilm.",
     0.922,
     1.1
    ],
    [
     "Kızdım",
     1.665,
     2.046
    ],
    [
     "ama",
     2.046,
     2.427
    ],
    [
     "sakin",
     2.427,
     2.808
    ],
    [
     "konuşacağım.",
     2.808,
     3.76
    ],
    [
     "Derin",
     3.85,
     4.382
    ],
    [
     "nefes",
     4.382,
     4.913
    ],
    [
     "alır,",
     4.913,
     5.445
    ],
    [
     "nazik",
     5.555,
     5.936
    ],
    [
     "bir",
     5.936,
     6.127
    ],
    [
     "cümle",
     6.127,
     6.508
    ],
    [
     "seçer.",
     6.508,
     6.889
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.967,
   "m": "Sonra ne olur? Sakin sözler karşısındakini de yumuşatır. Sorun büyümeden konuşularak çözülür.",
   "k": [
    [
     "Sonra",
     0.03,
     0.296
    ],
    [
     "ne",
     0.296,
     0.429
    ],
    [
     "olur?",
     0.429,
     0.695
    ],
    [
     "Sakin",
     1.025,
     1.321
    ],
    [
     "sözler",
     1.321,
     1.617
    ],
    [
     "karşısındakini",
     1.617,
     2.505
    ],
    [
     "de",
     2.505,
     2.653
    ],
    [
     "yumuşatır.",
     2.653,
     3.245
    ],
    [
     "Sorun",
     3.55,
     3.885
    ],
    [
     "büyümeden",
     3.885,
     4.556
    ],
    [
     "konuşularak",
     4.556,
     5.394
    ],
    [
     "çözülür.",
     5.394,
     5.897
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
   "sure": 5.597,
   "m": "Teneffüste bir arkadaşın seni itip kitaplarını yere düşürdü. Bunu bilerek yaptı. Ne yaparsın?",
   "k": [
    [
     "Teneffüste",
     0.03,
     0.554
    ],
    [
     "bir",
     0.554,
     0.685
    ],
    [
     "arkadaşın",
     0.685,
     1.21
    ],
    [
     "seni",
     1.21,
     1.472
    ],
    [
     "itip",
     1.472,
     1.734
    ],
    [
     "kitaplarını",
     1.734,
     2.39
    ],
    [
     "yere",
     2.39,
     2.652
    ],
    [
     "düşürdü.",
     2.652,
     3.045
    ],
    [
     "Bunu",
     3.47,
     3.739
    ],
    [
     "bilerek",
     3.739,
     4.141
    ],
    [
     "yaptı.",
     4.141,
     4.41
    ],
    [
     "Ne",
     4.99,
     5.124
    ],
    [
     "yaparsın?",
     5.124,
     5.527
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.282,
   "m": "Aynı şey yine olabilir; sen de kendi sınırını söylememiş oluyorsun.",
   "k": [
    [
     "Aynı",
     0.03,
     0.258
    ],
    [
     "şey",
     0.258,
     0.372
    ],
    [
     "yine",
     0.372,
     0.599
    ],
    [
     "olabilir;",
     0.599,
     1.055
    ],
    [
     "sen",
     1.25,
     1.373
    ],
    [
     "de",
     1.373,
     1.495
    ],
    [
     "kendi",
     1.495,
     1.74
    ],
    [
     "sınırını",
     1.74,
     2.231
    ],
    [
     "söylememiş",
     2.231,
     2.721
    ],
    [
     "oluyorsun.",
     2.721,
     3.212
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.698,
   "m": "Öfke içinde duruyor; onu her gördüğünde yeniden kızıyorsun.",
   "k": [
    [
     "Öfke",
     0.03,
     0.316
    ],
    [
     "içinde",
     0.316,
     0.746
    ],
    [
     "duruyor;",
     0.746,
     1.175
    ],
    [
     "onu",
     1.335,
     1.663
    ],
    [
     "her",
     1.663,
     1.826
    ],
    [
     "gördüğünde",
     1.826,
     2.482
    ],
    [
     "yeniden",
     2.482,
     2.973
    ],
    [
     "kızıyorsun.",
     2.973,
     3.628
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.562,
   "m": "Arkadaşın durup düşünüyor; tekrar ederse öğretmene söyleyeceksin.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.468
    ],
    [
     "durup",
     0.468,
     0.687
    ],
    [
     "düşünüyor;",
     0.687,
     1.125
    ],
    [
     "tekrar",
     1.495,
     1.78
    ],
    [
     "ederse",
     1.78,
     2.208
    ],
    [
     "öğretmene",
     2.208,
     2.779
    ],
    [
     "söyleyeceksin.",
     2.779,
     3.492
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.076,
   "m": "Küçük kardeşin, emek verdiğin kule oyununu bozdu. Ne yaparsın?",
   "k": [
    [
     "Küçük",
     0.03,
     0.356
    ],
    [
     "kardeşin,",
     0.356,
     0.845
    ],
    [
     "emek",
     1.04,
     1.342
    ],
    [
     "verdiğin",
     1.342,
     1.796
    ],
    [
     "kule",
     1.796,
     2.098
    ],
    [
     "oyununu",
     2.098,
     2.703
    ],
    [
     "bozdu.",
     2.703,
     3.005
    ],
    [
     "Ne",
     3.41,
     3.559
    ],
    [
     "yaparsın?",
     3.559,
     4.006
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.919,
   "m": "Emeğin yok sayılmış oluyor; kardeşin neyi bozduğunu anlamıyor.",
   "k": [
    [
     "Emeğin",
     0.03,
     0.505
    ],
    [
     "yok",
     0.505,
     0.664
    ],
    [
     "sayılmış",
     0.664,
     1.139
    ],
    [
     "oluyor;",
     1.139,
     1.615
    ],
    [
     "kardeşin",
     1.8,
     2.273
    ],
    [
     "neyi",
     2.273,
     2.588
    ],
    [
     "bozduğunu",
     2.588,
     3.218
    ],
    [
     "anlamıyor.",
     3.218,
     3.849
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.31,
   "m": "Küçük olay kalbinde büyüyor; sonraki oyunlarda da kızgın oturuyorsun.",
   "k": [
    [
     "Küçük",
     0.03,
     0.388
    ],
    [
     "olay",
     0.388,
     0.746
    ],
    [
     "kalbinde",
     0.746,
     1.283
    ],
    [
     "büyüyor;",
     1.283,
     1.82
    ],
    [
     "sonraki",
     2.12,
     2.544
    ],
    [
     "oyunlarda",
     2.544,
     3.109
    ],
    [
     "da",
     3.109,
     3.251
    ],
    [
     "kızgın",
     3.251,
     3.533
    ],
    [
     "oturuyorsun.",
     3.533,
     4.24
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.287,
   "m": "Kardeşin dinliyor ve birlikte yeniden kuruyorsunuz.",
   "k": [
    [
     "Kardeşin",
     0.03,
     0.561
    ],
    [
     "dinliyor",
     0.561,
     1.092
    ],
    [
     "ve",
     1.092,
     1.269
    ],
    [
     "birlikte",
     1.269,
     1.801
    ],
    [
     "yeniden",
     1.801,
     2.332
    ],
    [
     "kuruyorsunuz.",
     2.332,
     3.217
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
   "sure": 10.861,
   "m": "Bu cümle bilerek çift anlamlı. Olanı aklında tutup sakince konuşmayı düşünen biri söylüyorsa orta uca yakın. Kırgınlığı kalbinde büyüten biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.179
    ],
    [
     "cümle",
     0.179,
     0.478
    ],
    [
     "bilerek",
     0.478,
     0.927
    ],
    [
     "çift",
     0.927,
     1.077
    ],
    [
     "anlamlı.",
     1.077,
     1.525
    ],
    [
     "Olanı",
     1.975,
     2.396
    ],
    [
     "aklında",
     2.396,
     2.816
    ],
    [
     "tutup",
     2.816,
     3.096
    ],
    [
     "sakince",
     3.096,
     3.517
    ],
    [
     "konuşmayı",
     3.517,
     4.078
    ],
    [
     "düşünen",
     4.078,
     4.498
    ],
    [
     "biri",
     4.498,
     4.778
    ],
    [
     "söylüyorsa",
     4.778,
     5.339
    ],
    [
     "orta",
     5.339,
     5.619
    ],
    [
     "uca",
     5.619,
     5.9
    ],
    [
     "yakın.",
     5.9,
     6.18
    ],
    [
     "Kırgınlığı",
     6.81,
     7.568
    ],
    [
     "kalbinde",
     7.568,
     8.137
    ],
    [
     "büyüten",
     8.137,
     8.706
    ],
    [
     "biri",
     8.706,
     9.085
    ],
    [
     "söylüyorsa",
     9.085,
     9.843
    ],
    [
     "sağ",
     9.843,
     10.033
    ],
    [
     "uca",
     10.033,
     10.412
    ],
    [
     "yakın.",
     10.412,
     10.791
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
  },
  "v1": {
   "d": "ses/v1.m4a",
   "sure": 5.993,
   "m": "Arkadaşın, çok sevdiğin oyun parçanı bozdu. Bak, ibre kendiliğinden sağa kayıyor.",
   "k": [
    [
     "Arkadaşın,",
     0.03,
     0.66
    ],
    [
     "çok",
     0.785,
     0.965
    ],
    [
     "sevdiğin",
     0.965,
     1.507
    ],
    [
     "oyun",
     1.507,
     1.868
    ],
    [
     "parçanı",
     1.868,
     2.409
    ],
    [
     "bozdu.",
     2.409,
     2.77
    ],
    [
     "Bak,",
     3.255,
     3.49
    ],
    [
     "ibre",
     3.995,
     4.316
    ],
    [
     "kendiliğinden",
     4.316,
     5.12
    ],
    [
     "sağa",
     5.12,
     5.441
    ],
    [
     "kayıyor.",
     5.441,
     5.923
    ]
   ]
  },
  "v2": {
   "d": "ses/v2.m4a",
   "sure": 7.597,
   "m": "Kızmak herkesin yaşadığı bir duygu; sorun değil. “Nefes al” düğmesine basılı tut; istersen yalnızca halkayı izle.",
   "k": [
    [
     "Kızmak",
     0.03,
     0.374
    ],
    [
     "herkesin",
     0.374,
     0.89
    ],
    [
     "yaşadığı",
     0.89,
     1.579
    ],
    [
     "bir",
     1.579,
     1.751
    ],
    [
     "duygu;",
     1.751,
     2.095
    ],
    [
     "sorun",
     2.51,
     2.839
    ],
    [
     "değil.",
     2.839,
     3.169
    ],
    [
     "“Nefes",
     3.169,
     3.498
    ],
    [
     "al”",
     3.498,
     3.663
    ],
    [
     "düğmesine",
     3.663,
     4.321
    ],
    [
     "basılı",
     4.321,
     4.815
    ],
    [
     "tut;",
     4.815,
     4.98
    ],
    [
     "istersen",
     5.23,
     5.857
    ],
    [
     "yalnızca",
     5.857,
     6.483
    ],
    [
     "halkayı",
     6.483,
     7.11
    ],
    [
     "izle.",
     7.11,
     7.527
    ]
   ]
  },
  "v3": {
   "d": "ses/v3.m4a",
   "sure": 3.661,
   "m": "Yavaşça nefes al. Sonra yavaşça ver.",
   "k": [
    [
     "Yavaşça",
     0.03,
     0.633
    ],
    [
     "nefes",
     0.633,
     1.034
    ],
    [
     "al.",
     1.034,
     1.235
    ],
    [
     "Sonra",
     1.625,
     2.28
    ],
    [
     "yavaşça",
     2.28,
     3.264
    ],
    [
     "ver.",
     3.264,
     3.591
    ]
   ]
  },
  "v4": {
   "d": "ses/v4.m4a",
   "sure": 5.582,
   "m": "Bak, ibre ortaya geldi. Buna hilm diyoruz: kızgınlıkta bile sakin kalabilmek.",
   "k": [
    [
     "Bak,",
     0.03,
     0.305
    ],
    [
     "ibre",
     0.5,
     0.773
    ],
    [
     "ortaya",
     0.773,
     1.182
    ],
    [
     "geldi.",
     1.182,
     1.455
    ],
    [
     "Buna",
     1.785,
     2.222
    ],
    [
     "hilm",
     2.222,
     2.44
    ],
    [
     "diyoruz:",
     2.44,
     3.095
    ],
    [
     "kızgınlıkta",
     3.535,
     4.194
    ],
    [
     "bile",
     4.194,
     4.523
    ],
    [
     "sakin",
     4.523,
     4.853
    ],
    [
     "kalabilmek.",
     4.853,
     5.512
    ]
   ]
  },
  "v5": {
   "d": "ses/v5.m4a",
   "sure": 3.556,
   "m": "Şimdi arkadaşına ne söylersin? Üç yoldan birini seç.",
   "k": [
    [
     "Şimdi",
     0.03,
     0.316
    ],
    [
     "arkadaşına",
     0.316,
     1.032
    ],
    [
     "ne",
     1.032,
     1.175
    ],
    [
     "söylersin?",
     1.175,
     1.605
    ],
    [
     "Üç",
     2.1,
     2.298
    ],
    [
     "yoldan",
     2.298,
     2.694
    ],
    [
     "birini",
     2.694,
     3.288
    ],
    [
     "seç.",
     3.288,
     3.486
    ]
   ]
  },
  "v6": {
   "d": "ses/v6.m4a",
   "sure": 5.022,
   "m": "Umursamıyormuş gibi yapınca ibre sola kaydı. Seni neyin üzdüğünü arkadaşın bilemedi.",
   "k": [
    [
     "Umursamıyormuş",
     0.03,
     0.844
    ],
    [
     "gibi",
     0.844,
     1.115
    ],
    [
     "yapınca",
     1.115,
     1.521
    ],
    [
     "ibre",
     1.521,
     1.793
    ],
    [
     "sola",
     1.793,
     2.064
    ],
    [
     "kaydı.",
     2.064,
     2.335
    ],
    [
     "Seni",
     2.645,
     2.933
    ],
    [
     "neyin",
     2.933,
     3.222
    ],
    [
     "üzdüğünü",
     3.222,
     3.798
    ],
    [
     "arkadaşın",
     3.798,
     4.375
    ],
    [
     "bilemedi.",
     4.375,
     4.952
    ]
   ]
  },
  "v7": {
   "d": "ses/v7.m4a",
   "sure": 6.492,
   "m": "Sakin ve net konuşunca ibre ortada kaldı. Arkadaşın seni dinledi; ikiniz de çözüm düşünebildiniz.",
   "k": [
    [
     "Sakin",
     0.03,
     0.411
    ],
    [
     "ve",
     0.411,
     0.601
    ],
    [
     "net",
     0.601,
     0.791
    ],
    [
     "konuşunca",
     0.791,
     1.553
    ],
    [
     "ibre",
     1.553,
     1.933
    ],
    [
     "ortada",
     1.933,
     2.504
    ],
    [
     "kaldı.",
     2.504,
     2.885
    ],
    [
     "Arkadaşın",
     3.125,
     3.674
    ],
    [
     "seni",
     3.674,
     3.948
    ],
    [
     "dinledi;",
     3.948,
     4.36
    ],
    [
     "ikiniz",
     4.76,
     5.175
    ],
    [
     "de",
     5.175,
     5.314
    ],
    [
     "çözüm",
     5.314,
     5.591
    ],
    [
     "düşünebildiniz.",
     5.591,
     6.422
    ]
   ]
  },
  "v8": {
   "d": "ses/v8.m4a",
   "sure": 6.475,
   "m": "Bağırıp suçlayınca ibre yine sağa kaydı. Arkadaşın savunmaya geçti ve söylemek istediğin şey duyulmadı.",
   "k": [
    [
     "Bağırıp",
     0.03,
     0.514
    ],
    [
     "suçlayınca",
     0.514,
     1.159
    ],
    [
     "ibre",
     1.159,
     1.482
    ],
    [
     "yine",
     1.482,
     1.805
    ],
    [
     "sağa",
     1.805,
     2.127
    ],
    [
     "kaydı.",
     2.127,
     2.45
    ],
    [
     "Arkadaşın",
     2.85,
     3.468
    ],
    [
     "savunmaya",
     3.468,
     4.087
    ],
    [
     "geçti",
     4.087,
     4.396
    ],
    [
     "ve",
     4.396,
     4.55
    ],
    [
     "söylemek",
     4.55,
     5.014
    ],
    [
     "istediğin",
     5.014,
     5.632
    ],
    [
     "şey",
     5.632,
     5.787
    ],
    [
     "duyulmadı.",
     5.787,
     6.405
    ]
   ]
  }
 }
}
);
