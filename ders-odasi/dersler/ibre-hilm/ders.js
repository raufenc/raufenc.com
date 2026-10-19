/* İbremetre · Hilm — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Kayıtsızlık · Hilm · Hıkd). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-hilm",
 "ad": "Hilm: İbren Nerede?",
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
      "İbre cümleye değil, o an öfkeyi ve haksızlığı nasıl karşıladığımıza bakar. Hilm; öfkelensen de yumuşak davranmak, kırgınlığı sakin bir sözle söylemektir.",
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
       "soz": "Bana ne, kime ne yapılırsa yapılsın.",
       "eylem": "yaslan",
       "zincir": [
        "Haksızlığa uğrayan arkadaşı yalnız kalır.",
        "Sorun çözülmeden büyümeye devam eder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bana ne, ben karışmam.",
          "dogru": true,
          "not": "Kayıtsızlık, haksızlığa karşı bile duyarsız kalmaktır. Sakin olmak ile umursamamak aynı şey değildir."
         },
         {
          "m": "Kızdım ama sakin kalıp konuşacağım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hilmin sesi."
         },
         {
          "m": "Affetmeyeceğim; bu içimde duracak.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hıkdın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kayıtsızlık",
        "soz": "Bana"
       },
       "zincirAnahtar": [
        "Haksızlığa",
        "Sorun"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kırgınlığı kalpte saklamak neye benziyor?",
       "ad": "Hıkd",
       "soz": "Affetmem, o günü hiç unutmayacağım.",
       "eylem": "dusun",
       "zincir": [
        "Eski olay her yeni buluşmada yeniden aklına gelir.",
        "Arkadaşı neden soğuk davrandığını anlayamaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Affetmeyeceğim; bu içimde duracak.",
          "dogru": true,
          "not": "Hıkd, öfkeyi kalpte saklayıp büyütmektir. Küçük bir kırgınlık, saklandıkça yük olur."
         },
         {
          "m": "Bana ne, ben karışmam.",
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
        "soz": "Affetmem,"
       },
       "zincirAnahtar": [
        "Eski",
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
          "m": "Bana ne, ben karışmam.",
          "dogru": false,
          "not": "Bu sol ucun sesi: kayıtsızlığın sesi."
         },
         {
          "m": "Affetmeyeceğim; bu içimde duracak.",
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
         "m": "Bana ne, istediği gibi itsin.",
         "zon": "az",
         "sonuc": "Aynı şey yine olabilir; sen de kendi sınırını söylememiş oluyorsun.",
         "not": "İbre sola kaydı: haksızlığa bile aldırmamak sorunu çözmüyor.",
         "ses": "s1az"
        },
        {
         "m": "Affetmem; bundan sonra onunla konuşmam.",
         "zon": "fazla",
         "sonuc": "Öfke içinde duruyor; onu her gördüğünde yeniden kızıyorsun.",
         "not": "İbre sağa kaydı: öfkeyi saklamak onu büyütüyor.",
         "ses": "s1fa"
        },
        {
         "m": "Canım yandı; bir daha yapma, diye sakince söylerim.",
         "zon": "orta",
         "sonuc": "Arkadaşın özür diliyor ve mesele orada kapanıyor.",
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
         "m": "Bir daha oyunuma dokunmasın; bunu hep hatırlayacağım.",
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
       "aciklama": "Kırgınlığı saklamak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşı haksız yere azarlanırken bakıp geçer.",
       "alan": "az",
       "ipucu": "Haksızlığa bakıp geçiyor."
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
       "metin": "Oyunda haksızlık yapılınca “bana ne” deyip uzaklaşır.",
       "alan": "az",
       "ipucu": "Haksızlığı umursamıyor."
      },
      {
       "id": "k5",
       "metin": "Eski bir kırgınlığı her fırsatta yüzüne vurur.",
       "alan": "fazla",
       "ipucu": "Kırgınlığı canlı tutuyor."
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
   "sure": 7.346,
   "m": "Sol uçta Kayıtsızlık. Bana ne, kime ne yapılırsa yapılsın. Arkadaşı itilirken bile yerinden kıpırdamaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.237
    ],
    [
     "uçta",
     0.237,
     0.651
    ],
    [
     "Kayıtsızlık.",
     0.651,
     1.48
    ],
    [
     "Bana",
     1.595,
     1.602
    ],
    [
     "ne,",
     1.602,
     1.605
    ],
    [
     "kime",
     2.12,
     2.537
    ],
    [
     "ne",
     2.537,
     2.745
    ],
    [
     "yapılırsa",
     2.745,
     3.579
    ],
    [
     "yapılsın.",
     3.579,
     4.205
    ],
    [
     "Arkadaşı",
     4.62,
     5.245
    ],
    [
     "itilirken",
     5.245,
     5.87
    ],
    [
     "bile",
     5.87,
     6.182
    ],
    [
     "yerinden",
     6.182,
     6.651
    ],
    [
     "kıpırdamaz.",
     6.651,
     7.276
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.749,
   "m": "Sonra ne olur? Haksızlığa uğrayan arkadaşı yalnız kalır. Sorun çözülmeden büyümeye devam eder.",
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
     "Haksızlığa",
     0.885,
     1.517
    ],
    [
     "uğrayan",
     1.517,
     1.991
    ],
    [
     "arkadaşı",
     1.991,
     2.623
    ],
    [
     "yalnız",
     2.623,
     2.939
    ],
    [
     "kalır.",
     2.939,
     3.255
    ],
    [
     "Sorun",
     3.405,
     3.73
    ],
    [
     "çözülmeden",
     3.73,
     4.38
    ],
    [
     "büyümeye",
     4.38,
     5.029
    ],
    [
     "devam",
     5.029,
     5.354
    ],
    [
     "eder.",
     5.354,
     5.679
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
   "sure": 7.171,
   "m": "Sağ uçta Hıkd. Affetmem, o günü hiç unutmayacağım. Eski bir kırgınlığı kalbinde taşıyıp durur.",
   "k": [
    [
     "Sağ",
     0.03,
     0.261
    ],
    [
     "uçta",
     0.261,
     0.724
    ],
    [
     "Hıkd.",
     0.724,
     0.955
    ],
    [
     "Affetmem,",
     1.035,
     1.225
    ],
    [
     "o",
     1.74,
     2.003
    ],
    [
     "günü",
     2.003,
     2.53
    ],
    [
     "hiç",
     2.53,
     2.794
    ],
    [
     "unutmayacağım.",
     2.794,
     4.375
    ],
    [
     "Eski",
     4.945,
     5.233
    ],
    [
     "bir",
     5.233,
     5.376
    ],
    [
     "kırgınlığı",
     5.376,
     5.951
    ],
    [
     "kalbinde",
     5.951,
     6.383
    ],
    [
     "taşıyıp",
     6.383,
     6.814
    ],
    [
     "durur.",
     6.814,
     7.101
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.737,
   "m": "Sonra ne olur? Eski olay her yeni buluşmada yeniden aklına gelir. Arkadaşı neden soğuk davrandığını anlayamaz.",
   "k": [
    [
     "Sonra",
     0.03,
     0.28
    ],
    [
     "ne",
     0.28,
     0.405
    ],
    [
     "olur?",
     0.405,
     0.655
    ],
    [
     "Eski",
     1.255,
     1.549
    ],
    [
     "olay",
     1.549,
     1.843
    ],
    [
     "her",
     1.843,
     1.991
    ],
    [
     "yeni",
     1.991,
     2.285
    ],
    [
     "buluşmada",
     2.285,
     2.873
    ],
    [
     "yeniden",
     2.873,
     3.314
    ],
    [
     "aklına",
     3.314,
     3.756
    ],
    [
     "gelir.",
     3.756,
     4.05
    ],
    [
     "Arkadaşı",
     4.495,
     5.006
    ],
    [
     "neden",
     5.006,
     5.262
    ],
    [
     "soğuk",
     5.262,
     5.517
    ],
    [
     "davrandığını",
     5.517,
     6.156
    ],
    [
     "anlayamaz.",
     6.156,
     6.667
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
   "sure": 2.557,
   "m": "Arkadaşın özür diliyor ve mesele orada kapanıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.521
    ],
    [
     "özür",
     0.521,
     0.767
    ],
    [
     "diliyor",
     0.767,
     1.136
    ],
    [
     "ve",
     1.136,
     1.258
    ],
    [
     "mesele",
     1.258,
     1.627
    ],
    [
     "orada",
     1.627,
     1.996
    ],
    [
     "kapanıyor.",
     1.996,
     2.487
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
  }
 }
}
);
