/* İbremetre · İhlâs — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Mahviyet · İhlâs · Övgü sevgisi). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-ihlas-mahviyet",
 "ad": "İhlâs (Mahviyet · Övgü sevgisi): İbren Nerede?",
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
     "olculen": "İyiliği kimin için yaptığım",
     "kanca": "Ben yaptım ama söylemeyin.",
     "uclar": {
      "az": "Mahviyet",
      "orta": "İhlâs",
      "fazla": "Övgü sevgisi"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "İhlâs",
     "cumle": "Ben yaptım ama söylemeyin.",
     "uclar": {
      "az": "Mahviyet",
      "orta": "İhlâs",
      "fazla": "Övgü sevgisi"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi iyiliğin duyulmasını istemiyor, gizli kalsın diyor: orta uca yakın. Başka okumada söylemeyin derken aslında merak edilip övülmeyi umuyor: sağ uca (Övgü sevgisi) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o iyiliği hangi niyetle yaptığımıza bakar. İhlâs, iyiliği yalnız Allahü teâlâ için yapmaktır. Bu ibre ölçekten çok yönü gösterir: bir uçta kendini değersiz sayıp iyilikten çekilmek, öbür uçta alkış beklemek var.",
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
      "az": "Mahviyet",
      "orta": "İhlâs",
      "fazla": "Övgü sevgisi"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Kendini değersiz görmek neye benziyor?",
       "ad": "Mahviyet",
       "soz": "Ben hiçbir işe yaramam, bırakın yapmayayım.",
       "eylem": "egil",
       "zincir": [
        "İyilik yapma isteği sessizce söner.",
        "Ona teşekkür etmek isteyenler ne diyeceğini bilemez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ne yapsam boş; zaten kimse fark etmez.",
          "dogru": true,
          "not": "Mahviyet, kendini hep değersiz görmektir. Kendini böyle hissedince güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Allahü teâlâ için yapıyorum; görenin önemi yok.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ihlâsın sesi."
         },
         {
          "m": "Yaptığımı herkes görsün, alkışlasın!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: övgü sevgisinin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Mahviyet",
        "soz": "Ben"
       },
       "zincirAnahtar": [
        "İyilik",
        "Ona"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Alkış bekleyen kişi neyi kaçırır?",
       "ad": "Övgü-sevgisi",
       "soz": "Alkış olmadan ben bir şey yapmam; hepiniz görün!",
       "eylem": "isaret",
       "zincir": [
        "Övgü gelmeyince iyilik yapmaktan sıkılır.",
        "Yaptığı güzel işin tadı da kaybolur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Biri görmezse boşa gitmiş olur; herkes bilsin!",
          "dogru": true,
          "not": "Övgü sevgisi, iyiliği alkış için yapmaktır. İş güzel olsa da niyet insanlara yönelmiş olur."
         },
         {
          "m": "Ne yapsam boş; zaten kimse fark etmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: mahviyetin sesi."
         },
         {
          "m": "Allahü teâlâ için yapıyorum; görenin önemi yok.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ihlâsın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Övgü-sevgisi",
        "soz": "Alkış"
       },
       "zincirAnahtar": [
        "Övgü",
        "Yaptığı"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "İhlâs",
       "soz": "Allahü teâlâ için yaptım; kimse bilmese de olur.",
       "eylem": "yuru",
       "zincir": [
        "Gönlü hafifler, işi huzurla bırakır.",
        "Başkalarına da sessiz iyilik örnek olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Allahü teâlâ için yapıyorum; görenin önemi yok.",
          "dogru": true,
          "not": "İhlâs, iyiliği yalnız Allahü teâlâ için yapmaktır. Gören olsa da olmasa da aynı kalır."
         },
         {
          "m": "Ne yapsam boş; zaten kimse fark etmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: mahviyetin sesi."
         },
         {
          "m": "Yaptığımı herkes görsün, alkışlasın!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: övgü sevgisinin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "İhlâs",
        "soz": "Allahü"
       },
       "zincirAnahtar": [
        "Gönlü",
        "Başkalarına"
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
      "az": "Mahviyet",
      "orta": "İhlâs",
      "fazla": "Övgü sevgisi"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "bahce",
       "baslik": "Bahçedeki çöpler",
       "tetik": "Teneffüste bahçede çöpler var. Etrafta kimse yok ve sen toplayabilirsin.",
       "secenekler": [
        {
         "m": "Ben toplasam ne olur, değeri yok; boş veririm.",
         "zon": "az",
         "sonuc": "Çöpler yerinde kalıyor; küçük bir iyilik yapılmamış oluyor.",
         "not": "İbre sola kaydı: kendini küçük görmek iyiliğin önüne geçiyor.",
         "ses": "s1az"
        },
        {
         "m": "Toplarım ama herkes görsün, öğretmen de bilsin!",
         "zon": "fazla",
         "sonuc": "Çöp toplanıyor ama gönlün bakışlarda kalıyor.",
         "not": "İbre sağa kaydı: iyilik güzel, fakat niyet alkışa dönmüş.",
         "ses": "s1fa"
        },
        {
         "m": "Sessizce toplarım; Allahü teâlâ için yapıyorum.",
         "zon": "orta",
         "sonuc": "Bahçe temizleniyor; kimse görmese de içi rahat.",
         "not": "İbre ortada: iyiliği yalnız Allahü teâlâ için yaptın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "tesekkur",
       "baslik": "Sınıfta teşekkür",
       "tetik": "Sınıf önünde öğretmen, bu güzel işi sen yaptın, teşekkürler, diyor.",
       "secenekler": [
        {
         "m": "Önemi yok, ben hiçbir işe yaramam; teşekkür etmeyin.",
         "zon": "az",
         "sonuc": "Güzel bir söz karşılığını bulamıyor; kendine de iyi gelmiyor.",
         "not": "İbre sola kaydı: iyi sözü geri çevirmek, kendini değersiz sanmaktan gelir.",
         "ses": "s2az"
        },
        {
         "m": "Evet ben yaptım! Herkes beni alkışlasın!",
         "zon": "fazla",
         "sonuc": "Alkış geliyor ama arkadaşlarının payı gölgede kalıyor.",
         "not": "İbre sağa kaydı: alkış beklemek, niyeti dünyaya çevirir.",
         "ses": "s2fa"
        },
        {
         "m": "Rica ederim; Allahü teâlâ için yaptım, hepimize hayırlı olsun.",
         "zon": "orta",
         "sonuc": "Teşekkürü sakince alıyorsun; iş de dostluk da güzel kalıyor.",
         "not": "İbre ortada: övgüyü ne aradın ne de reddettin, niyetin Allahü teâlâ içindi.",
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
       "ad": "Az · Mahviyet",
       "aciklama": "Kendini değersiz görmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · İhlâs",
       "aciklama": "Yalnız Allahü teâlâ için yapmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Övgü sevgisi",
       "aciklama": "Övülmek için yapmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Güzel bir iş yapınca “zaten bir işe yaramam” der ve bir daha yardım etmez.",
       "alan": "az",
       "ipucu": "Kendini değersiz görüyor."
      },
      {
       "id": "k2",
       "metin": "İyilik yapınca etrafına bakar: “Gören oldu mu?”",
       "alan": "fazla",
       "ipucu": "Övülmeyi bekliyor."
      },
      {
       "id": "k3",
       "metin": "Yardımını sessizce yapar, kimse bilmese de aynı güzellikle sürdürür.",
       "alan": "orta",
       "ipucu": "Allahü teâlâ için yapıyor."
      },
      {
       "id": "k4",
       "metin": "Herkes teşekkür ettiği hâlde “benim yaptığımın değeri yok” der.",
       "alan": "az",
       "ipucu": "Kendini küçümsüyor."
      },
      {
       "id": "k5",
       "metin": "Her yardımdan sonra “öğretmene söyleyin, herkes duysun” der.",
       "alan": "fazla",
       "ipucu": "Alkış istiyor."
      },
      {
       "id": "k6",
       "metin": "Bağış kutusuna sessizce harçlık bırakır, kimseye söylemez.",
       "alan": "orta",
       "ipucu": "Gizli ve samimi iyilik yapıyor."
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
        "Güzel bir iş yapınca",
        "Biri beni övünce",
        "Kimse görmezken",
        "İyiliğimi anlatma isteği gelince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bir iyiliği Allahü teâlâ için sessizce yapacağım",
        "Övgü gelince teşekkür edip yoluma devam edeceğim",
        "Kendimi değersiz hissedersem güvendiğim bir yetişkinle konuşacağım"
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
       "metin": "yalnız Allahü teâlâ için yapmak",
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
   "sure": 1.854,
   "m": "Ben yaptım ama söylemeyin.",
   "k": [
    [
     "Ben",
     0.03,
     0.225
    ],
    [
     "yaptım",
     0.225,
     0.615
    ],
    [
     "ama",
     0.615,
     1.004
    ],
    [
     "söylemeyin.",
     1.004,
     1.784
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.514,
   "m": "Birçok güzel huy bir ibre gibidir. İhlâs, iyiliği kimin için yaptığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.449
    ],
    [
     "güzel",
     0.449,
     0.868
    ],
    [
     "huy",
     0.868,
     1.078
    ],
    [
     "bir",
     1.078,
     1.287
    ],
    [
     "ibre",
     1.287,
     1.706
    ],
    [
     "gibidir.",
     1.706,
     2.335
    ],
    [
     "İhlâs,",
     3.04,
     3.485
    ],
    [
     "iyiliği",
     3.79,
     4.351
    ],
    [
     "kimin",
     4.351,
     4.632
    ],
    [
     "için",
     4.632,
     4.913
    ],
    [
     "yaptığımı",
     4.913,
     5.474
    ],
    [
     "ölçer.",
     5.474,
     5.755
    ],
    [
     "İbre",
     6.415,
     6.943
    ],
    [
     "üç",
     6.943,
     7.207
    ],
    [
     "yerde",
     7.207,
     7.734
    ],
    [
     "durabilir:",
     7.734,
     8.79
    ],
    [
     "az,",
     9.075,
     9.212
    ],
    [
     "kararında,",
     9.212,
     9.76
    ],
    [
     "fazla.",
     10.09,
     10.444
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
   "sure": 8.798,
   "m": "Sol uçta Mahviyet. Ben hiçbir işe yaramam, bırakın yapmayayım. Herkes teşekkür etse de “önemi yok” der ve geri çekilir.",
   "k": [
    [
     "Sol",
     0.03,
     0.24
    ],
    [
     "uçta",
     0.24,
     0.66
    ],
    [
     "Mahviyet.",
     0.66,
     1.29
    ],
    [
     "Ben",
     1.4,
     1.647
    ],
    [
     "hiçbir",
     1.647,
     2.141
    ],
    [
     "işe",
     2.141,
     2.634
    ],
    [
     "yaramam,",
     2.634,
     3.375
    ],
    [
     "bırakın",
     3.66,
     4.044
    ],
    [
     "yapmayayım.",
     4.044,
     4.555
    ],
    [
     "Herkes",
     5.08,
     5.464
    ],
    [
     "teşekkür",
     5.464,
     6.04
    ],
    [
     "etse",
     6.04,
     6.424
    ],
    [
     "de",
     6.424,
     6.616
    ],
    [
     "“önemi",
     6.616,
     7.192
    ],
    [
     "yok”",
     7.192,
     7.384
    ],
    [
     "der",
     7.384,
     7.576
    ],
    [
     "ve",
     7.576,
     7.768
    ],
    [
     "geri",
     7.768,
     8.152
    ],
    [
     "çekilir.",
     8.152,
     8.728
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.705,
   "m": "Sonra ne olur? İyilik yapma isteği sessizce söner. Ona teşekkür etmek isteyenler ne diyeceğini bilemez.",
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
     "İyilik",
     1.0,
     1.546
    ],
    [
     "yapma",
     1.546,
     1.91
    ],
    [
     "isteği",
     1.91,
     2.455
    ],
    [
     "sessizce",
     2.455,
     3.001
    ],
    [
     "söner.",
     3.001,
     3.365
    ],
    [
     "Ona",
     3.62,
     3.922
    ],
    [
     "teşekkür",
     3.922,
     4.374
    ],
    [
     "etmek",
     4.374,
     4.675
    ],
    [
     "isteyenler",
     4.675,
     5.278
    ],
    [
     "ne",
     5.278,
     5.429
    ],
    [
     "diyeceğini",
     5.429,
     6.183
    ],
    [
     "bilemez.",
     6.183,
     6.635
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
   "sure": 9.542,
   "m": "Sağ uçta Övgü-sevgisi. Alkış olmadan ben bir şey yapmam; hepiniz görün! İyilik yaparken etrafına bakar, gören var mı diye bakınır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.204
    ],
    [
     "uçta",
     0.204,
     0.553
    ],
    [
     "Övgü-sevgisi.",
     0.553,
     1.425
    ],
    [
     "Alkış",
     1.665,
     2.071
    ],
    [
     "olmadan",
     2.071,
     2.68
    ],
    [
     "ben",
     2.68,
     2.883
    ],
    [
     "bir",
     2.883,
     3.086
    ],
    [
     "şey",
     3.086,
     3.289
    ],
    [
     "yapmam;",
     3.289,
     3.695
    ],
    [
     "hepiniz",
     3.695,
     4.304
    ],
    [
     "görün!",
     4.304,
     4.71
    ],
    [
     "İyilik",
     5.03,
     5.76
    ],
    [
     "yaparken",
     5.76,
     6.49
    ],
    [
     "etrafına",
     6.49,
     7.463
    ],
    [
     "bakar,",
     7.463,
     7.95
    ],
    [
     "gören",
     8.21,
     8.49
    ],
    [
     "var",
     8.49,
     8.631
    ],
    [
     "mı",
     8.631,
     8.771
    ],
    [
     "diye",
     8.771,
     9.051
    ],
    [
     "bakınır.",
     9.051,
     9.472
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.197,
   "m": "Sonra ne olur? Övgü gelmeyince iyilik yapmaktan sıkılır. Yaptığı güzel işin tadı da kaybolur.",
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
     "Övgü",
     1.195,
     1.54
    ],
    [
     "gelmeyince",
     1.54,
     2.229
    ],
    [
     "iyilik",
     2.229,
     2.746
    ],
    [
     "yapmaktan",
     2.746,
     3.263
    ],
    [
     "sıkılır.",
     3.263,
     3.78
    ],
    [
     "Yaptığı",
     4.05,
     4.529
    ],
    [
     "güzel",
     4.529,
     4.849
    ],
    [
     "işin",
     4.849,
     5.168
    ],
    [
     "tadı",
     5.168,
     5.488
    ],
    [
     "da",
     5.488,
     5.647
    ],
    [
     "kaybolur.",
     5.647,
     6.127
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
   "sure": 9.37,
   "m": "Tam kararında İhlâs. Allahü teâlâ için yaptım; kimse bilmese de olur. Çöpü sessizce toplar, ardına bakmaz.",
   "k": [
    [
     "Tam",
     0.03,
     0.261
    ],
    [
     "kararında",
     0.261,
     1.184
    ],
    [
     "İhlâs.",
     1.184,
     1.645
    ],
    [
     "Allahü",
     2.385,
     2.933
    ],
    [
     "teâlâ",
     2.933,
     3.48
    ],
    [
     "için",
     3.48,
     3.845
    ],
    [
     "yaptım;",
     3.845,
     4.21
    ],
    [
     "kimse",
     4.35,
     4.719
    ],
    [
     "bilmese",
     4.719,
     5.272
    ],
    [
     "de",
     5.272,
     5.456
    ],
    [
     "olur.",
     5.456,
     5.825
    ],
    [
     "Çöpü",
     6.34,
     6.774
    ],
    [
     "sessizce",
     6.774,
     7.426
    ],
    [
     "toplar,",
     7.426,
     7.86
    ],
    [
     "ardına",
     8.025,
     8.79
    ],
    [
     "bakmaz.",
     8.79,
     9.3
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.453,
   "m": "Sonra ne olur? Gönlü hafifler, işi huzurla bırakır. Başkalarına da sessiz iyilik örnek olur.",
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
     "Gönlü",
     1.025,
     1.409
    ],
    [
     "hafifler,",
     1.409,
     1.985
    ],
    [
     "işi",
     2.275,
     2.559
    ],
    [
     "huzurla",
     2.559,
     2.984
    ],
    [
     "bırakır.",
     2.984,
     3.41
    ],
    [
     "Başkalarına",
     3.67,
     4.574
    ],
    [
     "da",
     4.574,
     4.755
    ],
    [
     "sessiz",
     4.755,
     5.117
    ],
    [
     "iyilik",
     5.117,
     5.659
    ],
    [
     "örnek",
     5.659,
     6.021
    ],
    [
     "olur.",
     6.021,
     6.383
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
   "sure": 5.827,
   "m": "Teneffüste bahçede çöpler var. Etrafta kimse yok ve sen toplayabilirsin. Ne yaparsın?",
   "k": [
    [
     "Teneffüste",
     0.03,
     0.746
    ],
    [
     "bahçede",
     0.746,
     1.283
    ],
    [
     "çöpler",
     1.283,
     1.641
    ],
    [
     "var.",
     1.641,
     1.82
    ],
    [
     "Etrafta",
     2.26,
     2.771
    ],
    [
     "kimse",
     2.771,
     3.112
    ],
    [
     "yok",
     3.112,
     3.282
    ],
    [
     "ve",
     3.282,
     3.452
    ],
    [
     "sen",
     3.452,
     3.623
    ],
    [
     "toplayabilirsin.",
     3.623,
     4.645
    ],
    [
     "Ne",
     5.11,
     5.272
    ],
    [
     "yaparsın?",
     5.272,
     5.757
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.339,
   "m": "Çöpler yerinde kalıyor; küçük bir iyilik yapılmamış oluyor.",
   "k": [
    [
     "Çöpler",
     0.03,
     0.321
    ],
    [
     "yerinde",
     0.321,
     0.758
    ],
    [
     "kalıyor;",
     0.758,
     1.195
    ],
    [
     "küçük",
     1.535,
     1.802
    ],
    [
     "bir",
     1.802,
     1.935
    ],
    [
     "iyilik",
     1.935,
     2.335
    ],
    [
     "yapılmamış",
     2.335,
     2.869
    ],
    [
     "oluyor.",
     2.869,
     3.269
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.489,
   "m": "Çöp toplanıyor ama gönlün bakışlarda kalıyor.",
   "k": [
    [
     "Çöp",
     0.03,
     0.242
    ],
    [
     "toplanıyor",
     0.242,
     1.089
    ],
    [
     "ama",
     1.089,
     1.513
    ],
    [
     "gönlün",
     1.513,
     1.936
    ],
    [
     "bakışlarda",
     1.936,
     2.783
    ],
    [
     "kalıyor.",
     2.783,
     3.419
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 2.955,
   "m": "Bahçe temizleniyor; kimse görmese de içi rahat.",
   "k": [
    [
     "Bahçe",
     0.03,
     0.297
    ],
    [
     "temizleniyor;",
     0.297,
     0.965
    ],
    [
     "kimse",
     1.25,
     1.577
    ],
    [
     "görmese",
     1.577,
     2.068
    ],
    [
     "de",
     2.068,
     2.231
    ],
    [
     "içi",
     2.231,
     2.558
    ],
    [
     "rahat.",
     2.558,
     2.885
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.936,
   "m": "Sınıf önünde öğretmen, bu güzel işi sen yaptın, teşekkürler, diyor. Ne yaparsın?",
   "k": [
    [
     "Sınıf",
     0.03,
     0.309
    ],
    [
     "önünde",
     0.309,
     0.727
    ],
    [
     "öğretmen,",
     0.727,
     1.145
    ],
    [
     "bu",
     1.355,
     1.52
    ],
    [
     "güzel",
     1.52,
     1.85
    ],
    [
     "işi",
     1.85,
     2.18
    ],
    [
     "sen",
     2.18,
     2.345
    ],
    [
     "yaptın,",
     2.345,
     2.675
    ],
    [
     "teşekkürler,",
     2.87,
     3.795
    ],
    [
     "diyor.",
     4.265,
     4.465
    ],
    [
     "Ne",
     4.465,
     4.565
    ],
    [
     "yaparsın?",
     4.565,
     4.866
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.708,
   "m": "Güzel bir söz karşılığını bulamıyor; kendine de iyi gelmiyor.",
   "k": [
    [
     "Güzel",
     0.03,
     0.328
    ],
    [
     "bir",
     0.328,
     0.478
    ],
    [
     "söz",
     0.478,
     0.627
    ],
    [
     "karşılığını",
     0.627,
     1.373
    ],
    [
     "bulamıyor;",
     1.373,
     1.97
    ],
    [
     "kendine",
     2.405,
     2.816
    ],
    [
     "de",
     2.816,
     2.953
    ],
    [
     "iyi",
     2.953,
     3.227
    ],
    [
     "gelmiyor.",
     3.227,
     3.638
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.061,
   "m": "Alkış geliyor ama arkadaşlarının payı gölgede kalıyor.",
   "k": [
    [
     "Alkış",
     0.03,
     0.312
    ],
    [
     "geliyor",
     0.312,
     0.735
    ],
    [
     "ama",
     0.735,
     1.017
    ],
    [
     "arkadaşlarının",
     1.017,
     1.863
    ],
    [
     "payı",
     1.863,
     2.145
    ],
    [
     "gölgede",
     2.145,
     2.568
    ],
    [
     "kalıyor.",
     2.568,
     2.991
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.818,
   "m": "Teşekkürü sakince alıyorsun; iş de dostluk da güzel kalıyor.",
   "k": [
    [
     "Teşekkürü",
     0.03,
     0.79
    ],
    [
     "sakince",
     0.79,
     1.36
    ],
    [
     "alıyorsun;",
     1.36,
     2.12
    ],
    [
     "iş",
     2.32,
     2.463
    ],
    [
     "de",
     2.463,
     2.606
    ],
    [
     "dostluk",
     2.606,
     2.891
    ],
    [
     "da",
     2.891,
     3.034
    ],
    [
     "güzel",
     3.034,
     3.319
    ],
    [
     "kalıyor.",
     3.319,
     3.748
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
   "sure": 9.754,
   "m": "Bu cümle bilerek çift anlamlı. İyiliğin gizli kalmasını isteyen biri söylüyorsa orta uca yakın. Söylemeyin derken övülmeyi uman biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.166
    ],
    [
     "cümle",
     0.166,
     0.436
    ],
    [
     "bilerek",
     0.436,
     0.843
    ],
    [
     "çift",
     0.843,
     0.978
    ],
    [
     "anlamlı.",
     0.978,
     1.385
    ],
    [
     "İyiliğin",
     1.87,
     2.416
    ],
    [
     "gizli",
     2.416,
     2.69
    ],
    [
     "kalmasını",
     2.69,
     3.236
    ],
    [
     "isteyen",
     3.236,
     3.646
    ],
    [
     "biri",
     3.646,
     3.919
    ],
    [
     "söylüyorsa",
     3.919,
     4.465
    ],
    [
     "orta",
     4.465,
     4.739
    ],
    [
     "uca",
     4.739,
     5.012
    ],
    [
     "yakın.",
     5.012,
     5.285
    ],
    [
     "Söylemeyin",
     6.015,
     6.653
    ],
    [
     "derken",
     6.653,
     6.972
    ],
    [
     "övülmeyi",
     6.972,
     7.61
    ],
    [
     "uman",
     7.61,
     7.929
    ],
    [
     "biri",
     7.929,
     8.248
    ],
    [
     "söylüyorsa",
     8.248,
     8.886
    ],
    [
     "sağ",
     8.886,
     9.046
    ],
    [
     "uca",
     9.046,
     9.365
    ],
    [
     "yakın.",
     9.365,
     9.684
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
