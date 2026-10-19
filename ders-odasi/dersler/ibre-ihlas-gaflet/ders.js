/* İbremetre · İhlâs — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Gaflet · İhlâs · Riyâ). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-ihlas-gaflet",
 "ad": "İhlâs (Gaflet · Riyâ): İbren Nerede?",
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
     "huy": "İhlâs",
     "huyAnahtar": "İhlâs",
     "olculen": "İyilik yapma niyetim",
     "kanca": "Yardım ettim ama söylemem tabii.",
     "uclar": {
      "az": "Gaflet",
      "orta": "İhlâs",
      "fazla": "Riyâ"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "İhlâs",
     "cumle": "Yardım ettim ama söylemem tabii.",
     "uclar": {
      "az": "Gaflet",
      "orta": "İhlâs",
      "fazla": "Riyâ"
     },
     "yesil": 0.26,
     "hedefZon": "orta",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi iyiliğini gösterişsiz, yalnız Allahü teâlâ için yapıyor: orta uca yakın. Başka okumada “söylemem” derken herkesin duymasını istiyor: sağ uca (Riyâ) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, niyete bakar. İhlâs; iyiliği gösteriş için değil, yalnız Allahü teâlâ için yapmaktır. Sol uç (Gaflet), iyiliğe ve niyete dikkat etmeden dalgın dalgın yaşayıp geçmektir. Bu ibre ölçekten çok niyetin yönünü gösterir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "İhlâs",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Gaflet",
      "orta": "İhlâs",
      "fazla": "Riyâ"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Dalgın geçip gitmek neye benziyor?",
       "ad": "Gaflet",
       "soz": "Neden yaptığımı hiç düşünmedim ki.",
       "eylem": "yaslan",
       "zincir": [
        "Yaptığı iş niyetsiz kalır.",
        "Küçük bir iyiliğin tadını bile alamaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yaparım geçerim; niyet nedir ki?",
          "dogru": true,
          "not": "Gaflet, işi niyet etmeden dalgınlıkla yapıp geçmektir. Niyeti hatırlamak iyiliği güzelleştirir."
         },
         {
          "m": "Niyetim Allahü teâlâ için; kimse bilmese de olur.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ihlâsın sesi."
         },
         {
          "m": "Önce herkes görsün, sonra yaparım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: riyânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Gaflet",
        "soz": "Neden"
       },
       "zincirAnahtar": [
        "Yaptığı",
        "Küçük"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Herkesin görmesini isteyen kişi neyi kaçırır?",
       "ad": "Riyâ",
       "soz": "Herkes görsün, yardım ettiğimi duysunlar!",
       "eylem": "isaret",
       "zincir": [
        "İnsanlar gülümsemese üzülür.",
        "Başkası görmeyince iyilik yapma isteği de söner."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Önce herkes görsün, sonra yaparım.",
          "dogru": true,
          "not": "Riyâ, iyiliği gösteriş için yapmaktır. Alkış bitince iyilik de biter."
         },
         {
          "m": "Yaparım geçerim; niyet nedir ki?",
          "dogru": false,
          "not": "Bu sol ucun sesi: gafletin sesi."
         },
         {
          "m": "Niyetim Allahü teâlâ için; kimse bilmese de olur.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ihlâsın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Riyâ",
        "soz": "Herkes"
       },
       "zincirAnahtar": [
        "İnsanlar",
        "Başkası"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "İhlâs",
       "soz": "Gören olmasa da yaparım; niyetim temiz.",
       "eylem": "dusun",
       "zincir": [
        "Kalbi hafifler ve içi rahat eder.",
        "Bu güzel iş alkışa bağlı olmadığı için devam eder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Niyetim Allahü teâlâ için; kimse bilmese de olur.",
          "dogru": true,
          "not": "İhlâs, iyiliği gösterişsiz ve temiz niyetle, yalnız Allahü teâlâ için yapmaktır."
         },
         {
          "m": "Yaparım geçerim; niyet nedir ki?",
          "dogru": false,
          "not": "Bu sol ucun sesi: gafletin sesi."
         },
         {
          "m": "Önce herkes görsün, sonra yaparım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: riyânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "İhlâs",
        "soz": "Gören"
       },
       "zincirAnahtar": [
        "Kalbi",
        "Bu"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "İhlâs",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Gaflet",
      "orta": "İhlâs",
      "fazla": "Riyâ"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "cop",
       "baslik": "Sınıfta çöp",
       "tetik": "Teneffüsten sonra sınıfın ortasında bir çöp var. Etrafta kimse bakmıyor gibi.",
       "secenekler": [
        {
         "m": "Fark etmedim bile; dalgın dalgın geçerim.",
         "zon": "az",
         "sonuc": "Çöp yerinde kalıyor; iyilik yapabileceğin an fark edilmeden geçiyor.",
         "not": "İbre sola kaydı: dalgınlık, iyiliğe de niyete de dikkat etmeyi engelliyor.",
         "ses": "s1az"
        },
        {
         "m": "Arkadaşlarım gelsin, görsünler; sonra toplarım.",
         "zon": "fazla",
         "sonuc": "Gösteri için bekliyorsun; iyilik niyeti alkışa bağlı kalıyor.",
         "not": "İbre sağa kaydı: gösterişe bağlı iyilik, görenler gidince biter.",
         "ses": "s1fa"
        },
        {
         "m": "Hemen alıp çöp kutusuna atarım; kimse bilmese de olur.",
         "zon": "orta",
         "sonuc": "Sınıf temizleniyor; sen de içinden hafifliyorsun.",
         "not": "İbre ortada: iyiliği gösterişsiz ve temiz niyetle yaptın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kutu",
       "baslik": "Yardım kutusu",
       "tetik": "Okulda bir yardım kutusu var. Harçlığından atabilirsin; yanında fotoğraf çekmeyi seven arkadaşlar da var.",
       "secenekler": [
        {
         "m": "Kutu mu? Dalmışım, fark etmedim bile.",
         "zon": "az",
         "sonuc": "Kutunun yanından geçip gidiyorsun; yardım edebileceğin fırsat kaçıyor.",
         "not": "İbre sola kaydı: fark etmeden geçmek niyeti de silikleştiriyor.",
         "ses": "s2az"
        },
        {
         "m": "Önce fotoğrafımı çektirir, herkese gösteririm.",
         "zon": "fazla",
         "sonuc": "Para kutuya giriyor ama niyet, gösterişe doğru kayıyor.",
         "not": "İbre sağa kaydı: yardımı gösteriş için yapmak niyeti bozuyor.",
         "ses": "s2fa"
        },
        {
         "m": "Sessizce atar, niyetimi Allahü teâlâ için tutarım.",
         "zon": "orta",
         "sonuc": "Kimse görmese de içinde huzur oluyor.",
         "not": "İbre ortada: gösterişsiz niyet, iyiliği güzelleştiriyor.",
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
       "ad": "Az · Gaflet",
       "aciklama": "Dalgın geçip gitmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · İhlâs",
       "aciklama": "Gösterişsiz, temiz niyet",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Riyâ",
       "aciklama": "Gösteriş için yapmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşının düşürdüğü kalemi dalgınlıkla görmeden geçip gider.",
       "alan": "az",
       "ipucu": "Dikkat etmiyor."
      },
      {
       "id": "k2",
       "metin": "Bir iyilik yapınca hemen herkese “bakın ne yaptım” diye anlatır.",
       "alan": "fazla",
       "ipucu": "Gösteriş yapıyor."
      },
      {
       "id": "k3",
       "metin": "Çöpü sessizce kutuya atar ve kimseye söylemez.",
       "alan": "orta",
       "ipucu": "Gösterişsiz iyilik."
      },
      {
       "id": "k4",
       "metin": "Güzel bir işi yaparken neden yaptığını hiç düşünmeden dalıp gider.",
       "alan": "az",
       "ipucu": "Niyet etmeden yapıyor."
      },
      {
       "id": "k5",
       "metin": "Yardım ederken yanındakilerin görmesi için bir de fotoğraf çektirir.",
       "alan": "fazla",
       "ipucu": "Görünmek için yapıyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşına yardım eder, sonra konuyu bir daha hiç açmaz.",
       "alan": "orta",
       "ipucu": "Alkış beklemiyor."
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
        "Bir iyilik yapacakken",
        "Yardım ettikten sonra",
        "Biri beni takdir edince",
        "Gün içinde dalıp gidince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Yapmadan önce niyetimi içimden hatırlayacağım",
        "İyiliği anlatmadan yapıp geçeceğim",
        "Alkış yerine Allahü teâlâ için yaptığımı hatırlayacağım"
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
       "baslik": "İhlâs",
       "metin": "gösterişsiz, temiz niyetle iyilik",
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
   "sure": 3.412,
   "m": "Yardım ettim ama söylemem tabii.",
   "k": [
    [
     "Yardım",
     0.03,
     0.582
    ],
    [
     "ettim",
     0.582,
     1.134
    ],
    [
     "ama",
     1.134,
     1.686
    ],
    [
     "söylemem",
     1.686,
     2.514
    ],
    [
     "tabii.",
     2.514,
     3.342
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.499,
   "m": "Birçok güzel huy bir ibre gibidir. İhlâs, iyiliği hangi niyetle yaptığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.425
    ],
    [
     "güzel",
     0.425,
     0.819
    ],
    [
     "huy",
     0.819,
     1.016
    ],
    [
     "bir",
     1.016,
     1.214
    ],
    [
     "ibre",
     1.214,
     1.608
    ],
    [
     "gibidir.",
     1.608,
     2.2
    ],
    [
     "İhlâs,",
     2.78,
     3.315
    ],
    [
     "iyiliği",
     3.515,
     4.328
    ],
    [
     "hangi",
     4.328,
     4.735
    ],
    [
     "niyetle",
     4.735,
     5.345
    ],
    [
     "yaptığımı",
     5.345,
     6.158
    ],
    [
     "ölçer.",
     6.158,
     6.565
    ],
    [
     "İbre",
     6.685,
     7.125
    ],
    [
     "üç",
     7.125,
     7.345
    ],
    [
     "yerde",
     7.345,
     7.785
    ],
    [
     "durabilir:",
     7.785,
     8.665
    ],
    [
     "az,",
     9.0,
     9.685
    ],
    [
     "kararında,",
     10.12,
     10.326
    ],
    [
     "fazla.",
     10.326,
     10.429
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
   "sure": 7.141,
   "m": "Sol uçta Gaflet. Neden yaptığımı hiç düşünmedim ki. Güzel işleri niyet etmeden, dalgınlıkla yapıp geçer.",
   "k": [
    [
     "Sol",
     0.03,
     0.229
    ],
    [
     "uçta",
     0.229,
     0.627
    ],
    [
     "Gaflet.",
     0.627,
     1.025
    ],
    [
     "Neden",
     1.125,
     1.496
    ],
    [
     "yaptığımı",
     1.496,
     2.237
    ],
    [
     "hiç",
     2.237,
     2.423
    ],
    [
     "düşünmedim",
     2.423,
     3.165
    ],
    [
     "ki.",
     3.165,
     3.35
    ],
    [
     "Güzel",
     3.96,
     4.259
    ],
    [
     "işleri",
     4.259,
     4.708
    ],
    [
     "niyet",
     4.708,
     5.007
    ],
    [
     "etmeden,",
     5.007,
     5.455
    ],
    [
     "dalgınlıkla",
     5.685,
     6.378
    ],
    [
     "yapıp",
     6.378,
     6.725
    ],
    [
     "geçer.",
     6.725,
     7.071
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.099,
   "m": "Sonra ne olur? Yaptığı iş niyetsiz kalır. Küçük bir iyiliğin tadını bile alamaz.",
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
     "Yaptığı",
     0.995,
     1.477
    ],
    [
     "iş",
     1.477,
     1.637
    ],
    [
     "niyetsiz",
     1.637,
     2.119
    ],
    [
     "kalır.",
     2.119,
     2.44
    ],
    [
     "Küçük",
     2.62,
     2.941
    ],
    [
     "bir",
     2.941,
     3.102
    ],
    [
     "iyiliğin",
     3.102,
     3.744
    ],
    [
     "tadını",
     3.744,
     4.226
    ],
    [
     "bile",
     4.226,
     4.547
    ],
    [
     "alamaz.",
     4.547,
     5.029
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
   "sure": 7.101,
   "m": "Sağ uçta Riyâ. Herkes görsün, yardım ettiğimi duysunlar! İyiliği yaparken çevresine bakıp alkış bekler.",
   "k": [
    [
     "Sağ",
     0.03,
     0.264
    ],
    [
     "uçta",
     0.264,
     0.732
    ],
    [
     "Riyâ.",
     0.732,
     1.2
    ],
    [
     "Herkes",
     1.65,
     2.07
    ],
    [
     "görsün,",
     2.07,
     2.49
    ],
    [
     "yardım",
     2.72,
     3.017
    ],
    [
     "ettiğimi",
     3.017,
     3.61
    ],
    [
     "duysunlar!",
     3.61,
     4.055
    ],
    [
     "İyiliği",
     4.445,
     5.054
    ],
    [
     "yaparken",
     5.054,
     5.51
    ],
    [
     "çevresine",
     5.51,
     6.119
    ],
    [
     "bakıp",
     6.119,
     6.423
    ],
    [
     "alkış",
     6.423,
     6.727
    ],
    [
     "bekler.",
     6.727,
     7.031
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.972,
   "m": "Sonra ne olur? İnsanlar gülümsemese üzülür. Başkası görmeyince iyilik yapma isteği de söner.",
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
     "İnsanlar",
     0.955,
     1.46
    ],
    [
     "gülümsemese",
     1.46,
     2.3
    ],
    [
     "üzülür.",
     2.3,
     2.805
    ],
    [
     "Başkası",
     3.17,
     3.625
    ],
    [
     "görmeyince",
     3.625,
     4.232
    ],
    [
     "iyilik",
     4.232,
     4.688
    ],
    [
     "yapma",
     4.688,
     4.991
    ],
    [
     "isteği",
     4.991,
     5.446
    ],
    [
     "de",
     5.446,
     5.598
    ],
    [
     "söner.",
     5.598,
     5.902
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
   "sure": 9.452,
   "m": "Tam kararında İhlâs. Gören olmasa da yaparım; niyetim temiz. İyiliği gösterişsiz yapar, niyetini Allahü teâlâ için tutar.",
   "k": [
    [
     "Tam",
     0.03,
     0.211
    ],
    [
     "kararında",
     0.211,
     0.934
    ],
    [
     "İhlâs.",
     0.934,
     1.295
    ],
    [
     "Gören",
     1.83,
     2.078
    ],
    [
     "olmasa",
     2.078,
     2.449
    ],
    [
     "da",
     2.449,
     2.573
    ],
    [
     "yaparım;",
     2.573,
     2.945
    ],
    [
     "niyetim",
     3.385,
     3.859
    ],
    [
     "temiz.",
     3.859,
     4.175
    ],
    [
     "İyiliği",
     4.815,
     5.365
    ],
    [
     "gösterişsiz",
     5.365,
     5.915
    ],
    [
     "yapar,",
     5.915,
     6.19
    ],
    [
     "niyetini",
     6.625,
     7.413
    ],
    [
     "Allahü",
     7.413,
     8.004
    ],
    [
     "teâlâ",
     8.004,
     8.594
    ],
    [
     "için",
     8.594,
     8.988
    ],
    [
     "tutar.",
     8.988,
     9.382
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 7.218,
   "m": "Sonra ne olur? Kalbi hafifler ve içi rahat eder. Bu güzel iş alkışa bağlı olmadığı için devam eder.",
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
     "Kalbi",
     1.135,
     1.521
    ],
    [
     "hafifler",
     1.521,
     2.1
    ],
    [
     "ve",
     2.1,
     2.292
    ],
    [
     "içi",
     2.292,
     2.678
    ],
    [
     "rahat",
     2.678,
     3.064
    ],
    [
     "eder.",
     3.064,
     3.45
    ],
    [
     "Bu",
     4.045,
     4.208
    ],
    [
     "güzel",
     4.208,
     4.535
    ],
    [
     "iş",
     4.535,
     4.698
    ],
    [
     "alkışa",
     4.698,
     5.188
    ],
    [
     "bağlı",
     5.188,
     5.515
    ],
    [
     "olmadığı",
     5.515,
     6.168
    ],
    [
     "için",
     6.168,
     6.495
    ],
    [
     "devam",
     6.495,
     6.822
    ],
    [
     "eder.",
     6.822,
     7.148
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
   "sure": 4.991,
   "m": "Teneffüsten sonra sınıfın ortasında bir çöp var. Etrafta kimse bakmıyor gibi. Ne yaparsın?",
   "k": [
    [
     "Teneffüsten",
     0.03,
     0.59
    ],
    [
     "sonra",
     0.59,
     0.87
    ],
    [
     "sınıfın",
     0.87,
     1.29
    ],
    [
     "ortasında",
     1.29,
     1.85
    ],
    [
     "bir",
     1.85,
     1.99
    ],
    [
     "çöp",
     1.99,
     2.13
    ],
    [
     "var.",
     2.13,
     2.27
    ],
    [
     "Etrafta",
     2.555,
     2.982
    ],
    [
     "kimse",
     2.982,
     3.268
    ],
    [
     "bakmıyor",
     3.268,
     3.695
    ],
    [
     "gibi.",
     3.695,
     3.98
    ],
    [
     "Ne",
     4.25,
     4.418
    ],
    [
     "yaparsın?",
     4.418,
     4.921
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.554,
   "m": "Çöp yerinde kalıyor; iyilik yapabileceğin an fark edilmeden geçiyor.",
   "k": [
    [
     "Çöp",
     0.03,
     0.181
    ],
    [
     "yerinde",
     0.181,
     0.633
    ],
    [
     "kalıyor;",
     0.633,
     1.085
    ],
    [
     "iyilik",
     1.4,
     1.914
    ],
    [
     "yapabileceğin",
     1.914,
     2.942
    ],
    [
     "an",
     2.942,
     3.113
    ],
    [
     "fark",
     3.113,
     3.284
    ],
    [
     "edilmeden",
     3.284,
     3.97
    ],
    [
     "geçiyor.",
     3.97,
     4.484
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.757,
   "m": "Gösteri için bekliyorsun; iyilik niyeti alkışa bağlı kalıyor.",
   "k": [
    [
     "Gösteri",
     0.03,
     0.402
    ],
    [
     "için",
     0.402,
     0.649
    ],
    [
     "bekliyorsun;",
     0.649,
     1.145
    ],
    [
     "iyilik",
     1.675,
     2.106
    ],
    [
     "niyeti",
     2.106,
     2.537
    ],
    [
     "alkışa",
     2.537,
     2.969
    ],
    [
     "bağlı",
     2.969,
     3.256
    ],
    [
     "kalıyor.",
     3.256,
     3.687
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 2.845,
   "m": "Sınıf temizleniyor; sen de içinden hafifliyorsun.",
   "k": [
    [
     "Sınıf",
     0.03,
     0.294
    ],
    [
     "temizleniyor;",
     0.294,
     0.955
    ],
    [
     "sen",
     1.29,
     1.439
    ],
    [
     "de",
     1.439,
     1.587
    ],
    [
     "içinden",
     1.587,
     2.033
    ],
    [
     "hafifliyorsun.",
     2.033,
     2.775
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.413,
   "m": "Okulda bir yardım kutusu var. Harçlığından atabilirsin; yanında fotoğraf çekmeyi seven arkadaşlar da var. Ne yaparsın?",
   "k": [
    [
     "Okulda",
     0.03,
     0.436
    ],
    [
     "bir",
     0.436,
     0.572
    ],
    [
     "yardım",
     0.572,
     0.843
    ],
    [
     "kutusu",
     0.843,
     1.25
    ],
    [
     "var.",
     1.25,
     1.385
    ],
    [
     "Harçlığından",
     1.66,
     2.153
    ],
    [
     "atabilirsin;",
     2.153,
     2.77
    ],
    [
     "yanında",
     3.095,
     3.473
    ],
    [
     "fotoğraf",
     3.473,
     3.85
    ],
    [
     "çekmeyi",
     3.85,
     4.228
    ],
    [
     "seven",
     4.228,
     4.48
    ],
    [
     "arkadaşlar",
     4.48,
     4.983
    ],
    [
     "da",
     4.983,
     5.109
    ],
    [
     "var.",
     5.109,
     5.235
    ],
    [
     "Ne",
     5.835,
     5.962
    ],
    [
     "yaparsın?",
     5.962,
     6.343
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.581,
   "m": "Kutunun yanından geçip gidiyorsun; yardım edebileceğin fırsat kaçıyor.",
   "k": [
    [
     "Kutunun",
     0.03,
     0.389
    ],
    [
     "yanından",
     0.389,
     0.747
    ],
    [
     "geçip",
     0.747,
     0.987
    ],
    [
     "gidiyorsun;",
     0.987,
     1.465
    ],
    [
     "yardım",
     1.805,
     2.067
    ],
    [
     "edebileceğin",
     2.067,
     2.855
    ],
    [
     "fırsat",
     2.855,
     3.117
    ],
    [
     "kaçıyor.",
     3.117,
     3.511
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.567,
   "m": "Para kutuya giriyor ama niyet, gösterişe doğru kayıyor.",
   "k": [
    [
     "Para",
     0.03,
     0.36
    ],
    [
     "kutuya",
     0.36,
     0.855
    ],
    [
     "giriyor",
     0.855,
     1.35
    ],
    [
     "ama",
     1.35,
     1.68
    ],
    [
     "niyet,",
     1.68,
     2.01
    ],
    [
     "gösterişe",
     2.18,
     2.765
    ],
    [
     "doğru",
     2.765,
     3.058
    ],
    [
     "kayıyor.",
     3.058,
     3.497
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 2.901,
   "m": "Kimse görmese de içinde huzur oluyor.",
   "k": [
    [
     "Kimse",
     0.03,
     0.43
    ],
    [
     "görmese",
     0.43,
     1.03
    ],
    [
     "de",
     1.03,
     1.23
    ],
    [
     "içinde",
     1.23,
     1.83
    ],
    [
     "huzur",
     1.83,
     2.231
    ],
    [
     "oluyor.",
     2.231,
     2.831
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
   "sure": 9.3,
   "m": "Bu cümle bilerek çift anlamlı. İyiliği gösterişsiz yapan biri söylüyorsa orta uca yakın. Herkesin duymasını isteyen biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.177
    ],
    [
     "cümle",
     0.177,
     0.471
    ],
    [
     "bilerek",
     0.471,
     0.912
    ],
    [
     "çift",
     0.912,
     1.059
    ],
    [
     "anlamlı.",
     1.059,
     1.5
    ],
    [
     "İyiliği",
     1.875,
     2.542
    ],
    [
     "gösterişsiz",
     2.542,
     3.21
    ],
    [
     "yapan",
     3.21,
     3.543
    ],
    [
     "biri",
     3.543,
     3.877
    ],
    [
     "söylüyorsa",
     3.877,
     4.544
    ],
    [
     "orta",
     4.544,
     4.878
    ],
    [
     "uca",
     4.878,
     5.211
    ],
    [
     "yakın.",
     5.211,
     5.545
    ],
    [
     "Herkesin",
     5.98,
     6.444
    ],
    [
     "duymasını",
     6.444,
     7.063
    ],
    [
     "isteyen",
     7.063,
     7.528
    ],
    [
     "biri",
     7.528,
     7.837
    ],
    [
     "söylüyorsa",
     7.837,
     8.456
    ],
    [
     "sağ",
     8.456,
     8.611
    ],
    [
     "uca",
     8.611,
     8.92
    ],
    [
     "yakın.",
     8.92,
     9.23
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
