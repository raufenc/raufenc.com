/* İbremetre · İhlâs — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Gaflet · İhlâs · Riyâ). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-ihlas-gaflet",
 "ad": "İhlâs (Gaflet · Riyâ): İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "benlik",
 "muzik": "benlik",
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
     "olculen": "İyiliği hangi niyetle yaptığım",
     "kanca": "Yaptım ama üzerinde hiç durmadım.",
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
     "cumle": "Yaptım ama üzerinde hiç durmadım.",
     "uclar": {
      "az": "Gaflet",
      "orta": "İhlâs",
      "fazla": "Riyâ"
     },
     "yesil": 0.26,
     "hedefZon": "orta",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi iyiliği yapıp anlatmıyor, gösterişe girmiyor: orta uca yakın. Başka okumada neden yaptığını hiç düşünmeden, alışkanlıkla yapıp geçiyor: sol uca (Gaflet) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, niyete bakar. İhlâs; iyiliği gösteriş için değil, yalnız Allahü teâlâ için yapmaktır. Sol uç (Gaflet), iyiliği niyet etmeden, alışkanlıkla yapıp geçmektir; herkes bazen dalıp gider, önemli olan niyeti hatırlamaktır. Sağ uç (Riyâ), iyiliği duyurmak ve göstermek için yapmaktır. Bu ibre ölçekten çok niyetin yönünü gösterir.",
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
       "soru": "Niyet etmeden yapıp geçmek neye benziyor?",
       "ad": "Gaflet",
       "soz": "Alışkanlıkla yaptım; niye yaptığımı düşünmedim.",
       "eylem": "yaslan",
       "zincir": [
        "Yaptığı iyi iş, niyetsiz kalır.",
        "Küçük bir iyiliğin tadı eksik kalabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yaparım geçerim; niyet etmeye ne gerek?",
          "dogru": true,
          "not": "Gaflet, işi niyet etmeden alışkanlıkla yapıp geçmektir. Niyeti hatırlamak iyiliği güzelleştirir."
         },
         {
          "m": "Önce niyetimi hatırlayayım; Allahü teâlâ için yapıyorum.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ihlâsın sesi."
         },
         {
          "m": "Herkes bilsin ki ben yaptım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: riyânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Gaflet",
        "soz": "Alışkanlıkla"
       },
       "zincirAnahtar": [
        "Yaptığı",
        "Küçük"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Herkese duyurmak isteyen kişinin niyeti nereye kayar?",
       "ad": "Riyâ",
       "soz": "Herkes duysun, yaptığım iyiliği anlatacağım!",
       "eylem": "isaret",
       "zincir": [
        "Duyurmak için yapılan iş, niyeti gölgeler.",
        "Anlatma imkânı olmayınca iyilik yapma isteği azalabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkes bilsin ki ben yaptım.",
          "dogru": true,
          "not": "Riyâ, iyiliği gösteriş için yapmaktır. Anlatma isteği öne geçince niyet gölgede kalır."
         },
         {
          "m": "Yaparım geçerim; niyet etmeye ne gerek?",
          "dogru": false,
          "not": "Bu sol ucun sesi: gafletin sesi."
         },
         {
          "m": "Önce niyetimi hatırlayayım; Allahü teâlâ için yapıyorum.",
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
        "Duyurmak",
        "Anlatma"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "İhlâs",
       "soz": "Önce niyetimi hatırlarım; sonra yaparım.",
       "eylem": "dusun",
       "zincir": [
        "Kalbi hafifler ve içi rahat eder.",
        "Bu güzel iş duyurulmaya bağlı olmadığı için devam eder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Önce niyetimi hatırlayayım; Allahü teâlâ için yapıyorum.",
          "dogru": true,
          "not": "İhlâs, iyiliği gösterişsiz ve temiz niyetle, yalnız Allahü teâlâ için yapmaktır."
         },
         {
          "m": "Yaparım geçerim; niyet etmeye ne gerek?",
          "dogru": false,
          "not": "Bu sol ucun sesi: gafletin sesi."
         },
         {
          "m": "Herkes bilsin ki ben yaptım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: riyânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "İhlâs",
        "soz": "Önce"
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
       "id": "komsu",
       "baslik": "Komşunun poşetleri",
       "tetik": "Merdivende yaşlı bir komşunun elinde ağır poşetler var. Yardım edebilirsin.",
       "secenekler": [
        {
         "m": "Taşırım geçerim; neden yaptığımı düşünmem bile.",
         "zon": "az",
         "sonuc": "Poşetler taşınıyor ama niyet hiç hatırlanmıyor; iş, alışkanlıkla geçip gidiyor.",
         "not": "İbre sola kaydı: niyet etmeden yapıp geçmek iyiliğin değerini silikleştiriyor.",
         "ses": "s1az"
        },
        {
         "m": "Taşırken yüksek sesle “bakın yardım ediyorum” derim.",
         "zon": "fazla",
         "sonuc": "Poşetler taşınıyor ama dikkat fotoğrafa kayıyor; niyet gösterişe bağlanıyor.",
         "not": "İbre sağa kaydı: iyiliği duyurmak için yapmak niyeti gölgeliyor.",
         "ses": "s1fa"
        },
        {
         "m": "Önce niyetimi hatırlarım, sonra sessizce yardım ederim.",
         "zon": "orta",
         "sonuc": "Komşu teşekkür ediyor; sen iyiliği anlatmadan yoluna devam ediyorsun.",
         "not": "İbre ortada: niyetini hatırlayıp gösterişsiz yardım ettin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kardes",
       "baslik": "Kardeşin ayakkabısı",
       "tetik": "Küçük kardeşin ayakkabılarını bağlamakta zorlanıyor. Yardım edebilirsin.",
       "secenekler": [
        {
         "m": "Bağlayıveririm, zaten hep yapıyorum; niyete ne gerek?",
         "zon": "az",
         "sonuc": "Ayakkabılar bağlanıyor ama iş niyetsiz, sıradan bir alışkanlıkla geçiyor.",
         "not": "İbre sola kaydı: alışkanlığa dönen iyilikte niyet silikleşiyor.",
         "ses": "s2az"
        },
        {
         "m": "Bağlarken herkese “bakın, kardeşime yardım ediyorum” derim.",
         "zon": "fazla",
         "sonuc": "Ayakkabı bağlanıyor ama sözler duyurmaya kayıyor; yardımın tadı azalıyor.",
         "not": "İbre sağa kaydı: gösteriş, niyeti ikinci plana atıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Allahü teâlâ için yapıyorum diye niyet edip bağlarım.",
         "zon": "orta",
         "sonuc": "Kardeşin sevinerek koşuyor; sen de içinde sakin bir hoşluk duyuyorsun.",
         "not": "İbre ortada: niyet edip gösterişsiz yardım ettin.",
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
       "aciklama": "Niyet etmeden yapıp geçmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · İhlâs",
       "aciklama": "Niyetini hatırlayıp gösterişsiz yapmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Riyâ",
       "aciklama": "Duyurmak için yapmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşının düşürdüğü kalemi uzatır ama neden yaptığını hiç düşünmez.",
       "alan": "az",
       "ipucu": "Niyet etmeden yapıyor."
      },
      {
       "id": "k2",
       "metin": "Bir iyilik yapınca hemen herkese “bakın ne yaptım” diye anlatır.",
       "alan": "fazla",
       "ipucu": "Duyurmak için yapıyor."
      },
      {
       "id": "k3",
       "metin": "Komşusuna yardım eder ve bunu kimseye anlatma ihtiyacı duymaz.",
       "alan": "orta",
       "ipucu": "Gösterişsiz yardım."
      },
      {
       "id": "k4",
       "metin": "Her gün aynı iyi işi yapar ama bir kez bile niyetini hatırlamaz.",
       "alan": "az",
       "ipucu": "Alışkanlıkla geçiyor."
      },
      {
       "id": "k5",
       "metin": "Yardım ederken yanındakilerin duyması için yüksek sesle “bakın yardım ediyorum” der.",
       "alan": "fazla",
       "ipucu": "Görünmek için yapıyor."
      },
      {
       "id": "k6",
       "metin": "Bir iyiliğe başlamadan önce niyetini hatırlar, sonra sakin sakin yapar.",
       "alan": "orta",
       "ipucu": "Niyetini hatırlıyor."
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
        "Her zamanki bir işi yapıp geçerken",
        "Yardım ettikten sonra",
        "İyiliğimi anlatma isteği gelince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Yapmadan önce niyetimi içimden hatırlayacağım",
        "Her gün bir işi “Allahü teâlâ için” diye başlayacağım",
        "Anlatma isteği gelince bir nefes alıp bekleyeceğim"
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
   "sure": 2.528,
   "m": "Yaptım ama üzerinde hiç durmadım.",
   "k": [
    [
     "Yaptım",
     0.03,
     0.435
    ],
    [
     "ama",
     0.435,
     0.839
    ],
    [
     "üzerinde",
     0.839,
     1.648
    ],
    [
     "hiç",
     1.648,
     1.851
    ],
    [
     "durmadım.",
     1.851,
     2.458
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
   "sure": 6.851,
   "m": "Sol uçta Gaflet. Alışkanlıkla yaptım; niye yaptığımı düşünmedim. İyi işleri niyet etmeden yapıp geçer.",
   "k": [
    [
     "Sol",
     0.03,
     0.181
    ],
    [
     "uçta",
     0.181,
     0.483
    ],
    [
     "Gaflet.",
     0.483,
     0.785
    ],
    [
     "Alışkanlıkla",
     0.9,
     2.039
    ],
    [
     "yaptım;",
     2.039,
     2.495
    ],
    [
     "niye",
     2.57,
     2.879
    ],
    [
     "yaptığımı",
     2.879,
     3.497
    ],
    [
     "düşünmedim.",
     3.497,
     4.115
    ],
    [
     "İyi",
     4.515,
     4.839
    ],
    [
     "işleri",
     4.839,
     5.324
    ],
    [
     "niyet",
     5.324,
     5.648
    ],
    [
     "etmeden",
     5.648,
     6.133
    ],
    [
     "yapıp",
     6.133,
     6.457
    ],
    [
     "geçer.",
     6.457,
     6.781
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.759,
   "m": "Sonra ne olur? Yaptığı iyi iş, niyetsiz kalır. Küçük bir iyiliğin tadı eksik kalabilir.",
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
     "Yaptığı",
     1.31,
     1.567
    ],
    [
     "iyi",
     1.567,
     1.739
    ],
    [
     "iş,",
     1.739,
     1.825
    ],
    [
     "niyetsiz",
     1.915,
     2.257
    ],
    [
     "kalır.",
     2.257,
     2.485
    ],
    [
     "Küçük",
     2.615,
     3.025
    ],
    [
     "bir",
     3.025,
     3.23
    ],
    [
     "iyiliğin",
     3.23,
     4.05
    ],
    [
     "tadı",
     4.05,
     4.46
    ],
    [
     "eksik",
     4.46,
     4.869
    ],
    [
     "kalabilir.",
     4.869,
     5.689
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
   "sure": 7.47,
   "m": "Sağ uçta Riyâ. Herkes duysun, yaptığım iyiliği anlatacağım! İyiliği yapar yapmaz herkese duyurmanın yolunu arar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.229
    ],
    [
     "uçta",
     0.229,
     0.627
    ],
    [
     "Riyâ.",
     0.627,
     1.025
    ],
    [
     "Herkes",
     1.485,
     1.873
    ],
    [
     "duysun,",
     1.873,
     2.26
    ],
    [
     "yaptığım",
     2.505,
     2.835
    ],
    [
     "iyiliği",
     2.835,
     3.275
    ],
    [
     "anlatacağım!",
     3.275,
     3.825
    ],
    [
     "İyiliği",
     4.285,
     4.908
    ],
    [
     "yapar",
     4.908,
     5.219
    ],
    [
     "yapmaz",
     5.219,
     5.531
    ],
    [
     "herkese",
     5.531,
     5.998
    ],
    [
     "duyurmanın",
     5.998,
     6.621
    ],
    [
     "yolunu",
     6.621,
     7.088
    ],
    [
     "arar.",
     7.088,
     7.4
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 8.065,
   "m": "Sonra ne olur? Duyurmak için yapılan iş, niyeti gölgeler. Anlatma imkânı olmayınca iyilik yapma isteği azalabilir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.288
    ],
    [
     "ne",
     0.288,
     0.417
    ],
    [
     "olur?",
     0.417,
     0.675
    ],
    [
     "Duyurmak",
     1.445,
     1.785
    ],
    [
     "için",
     1.785,
     2.012
    ],
    [
     "yapılan",
     2.012,
     2.352
    ],
    [
     "iş,",
     2.352,
     2.465
    ],
    [
     "niyeti",
     2.57,
     3.31
    ],
    [
     "gölgeler.",
     3.31,
     4.05
    ],
    [
     "Anlatma",
     4.505,
     4.96
    ],
    [
     "imkânı",
     4.96,
     5.415
    ],
    [
     "olmayınca",
     5.415,
     6.022
    ],
    [
     "iyilik",
     6.022,
     6.478
    ],
    [
     "yapma",
     6.478,
     6.781
    ],
    [
     "isteği",
     6.781,
     7.236
    ],
    [
     "azalabilir.",
     7.236,
     7.995
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
   "sure": 8.407,
   "m": "Tam kararında İhlâs. Önce niyetimi hatırlarım; sonra yaparım. İyiliği yapmadan önce niyetini hatırlar, gösterişsiz yapar.",
   "k": [
    [
     "Tam",
     0.03,
     0.197
    ],
    [
     "kararında",
     0.197,
     0.866
    ],
    [
     "İhlâs.",
     0.866,
     1.2
    ],
    [
     "Önce",
     1.55,
     1.87
    ],
    [
     "niyetimi",
     1.87,
     2.51
    ],
    [
     "hatırlarım;",
     2.51,
     3.15
    ],
    [
     "sonra",
     3.315,
     3.595
    ],
    [
     "yaparım.",
     3.595,
     4.015
    ],
    [
     "İyiliği",
     4.855,
     5.357
    ],
    [
     "yapmadan",
     5.357,
     5.734
    ],
    [
     "önce",
     5.734,
     5.986
    ],
    [
     "niyetini",
     5.986,
     6.488
    ],
    [
     "hatırlar,",
     6.488,
     6.865
    ],
    [
     "gösterişsiz",
     7.14,
     7.938
    ],
    [
     "yapar.",
     7.938,
     8.337
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 7.434,
   "m": "Sonra ne olur? Kalbi hafifler ve içi rahat eder. Bu güzel iş duyurulmaya bağlı olmadığı için devam eder.",
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
     "Kalbi",
     1.125,
     1.512
    ],
    [
     "hafifler",
     1.512,
     2.092
    ],
    [
     "ve",
     2.092,
     2.285
    ],
    [
     "içi",
     2.285,
     2.672
    ],
    [
     "rahat",
     2.672,
     3.058
    ],
    [
     "eder.",
     3.058,
     3.445
    ],
    [
     "Bu",
     3.76,
     3.932
    ],
    [
     "güzel",
     3.932,
     4.275
    ],
    [
     "iş",
     4.275,
     4.446
    ],
    [
     "duyurulmaya",
     4.446,
     5.304
    ],
    [
     "bağlı",
     5.304,
     5.648
    ],
    [
     "olmadığı",
     5.648,
     6.334
    ],
    [
     "için",
     6.334,
     6.677
    ],
    [
     "devam",
     6.677,
     7.02
    ],
    [
     "eder.",
     7.02,
     7.364
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
   "sure": 5.167,
   "m": "Merdivende yaşlı bir komşunun elinde ağır poşetler var. Yardım edebilirsin. Ne yaparsın?",
   "k": [
    [
     "Merdivende",
     0.03,
     0.654
    ],
    [
     "yaşlı",
     0.654,
     0.966
    ],
    [
     "bir",
     0.966,
     1.122
    ],
    [
     "komşunun",
     1.122,
     1.591
    ],
    [
     "elinde",
     1.591,
     2.059
    ],
    [
     "ağır",
     2.059,
     2.371
    ],
    [
     "poşetler",
     2.371,
     2.839
    ],
    [
     "var.",
     2.839,
     2.995
    ],
    [
     "Yardım",
     3.34,
     3.577
    ],
    [
     "edebilirsin.",
     3.577,
     4.17
    ],
    [
     "Ne",
     4.58,
     4.709
    ],
    [
     "yaparsın?",
     4.709,
     5.097
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 5.131,
   "m": "Poşetler taşınıyor ama niyet hiç hatırlanmıyor; iş, alışkanlıkla geçip gidiyor.",
   "k": [
    [
     "Poşetler",
     0.03,
     0.521
    ],
    [
     "taşınıyor",
     0.521,
     1.175
    ],
    [
     "ama",
     1.175,
     1.502
    ],
    [
     "niyet",
     1.502,
     1.829
    ],
    [
     "hiç",
     1.829,
     1.992
    ],
    [
     "hatırlanmıyor;",
     1.992,
     2.81
    ],
    [
     "iş,",
     3.32,
     3.625
    ],
    [
     "alışkanlıkla",
     3.79,
     4.425
    ],
    [
     "geçip",
     4.425,
     4.68
    ],
    [
     "gidiyor.",
     4.68,
     5.061
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.165,
   "m": "Poşetler taşınıyor ama dikkat fotoğrafa kayıyor; niyet gösterişe bağlanıyor.",
   "k": [
    [
     "Poşetler",
     0.03,
     0.426
    ],
    [
     "taşınıyor",
     0.426,
     0.954
    ],
    [
     "ama",
     0.954,
     1.218
    ],
    [
     "dikkat",
     1.218,
     1.481
    ],
    [
     "fotoğrafa",
     1.481,
     2.009
    ],
    [
     "kayıyor;",
     2.009,
     2.405
    ],
    [
     "niyet",
     2.725,
     2.999
    ],
    [
     "gösterişe",
     2.999,
     3.547
    ],
    [
     "bağlanıyor.",
     3.547,
     4.095
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 4.105,
   "m": "Komşu teşekkür ediyor; sen iyiliği anlatmadan yoluna devam ediyorsun.",
   "k": [
    [
     "Komşu",
     0.03,
     0.333
    ],
    [
     "teşekkür",
     0.333,
     0.786
    ],
    [
     "ediyor;",
     0.786,
     1.24
    ],
    [
     "sen",
     1.355,
     1.504
    ],
    [
     "iyiliği",
     1.504,
     2.099
    ],
    [
     "anlatmadan",
     2.099,
     2.695
    ],
    [
     "yoluna",
     2.695,
     3.142
    ],
    [
     "devam",
     3.142,
     3.44
    ],
    [
     "ediyorsun.",
     3.44,
     4.035
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.883,
   "m": "Küçük kardeşin ayakkabılarını bağlamakta zorlanıyor. Yardım edebilirsin. Ne yaparsın?",
   "k": [
    [
     "Küçük",
     0.03,
     0.279
    ],
    [
     "kardeşin",
     0.279,
     0.651
    ],
    [
     "ayakkabılarını",
     0.651,
     1.521
    ],
    [
     "bağlamakta",
     1.521,
     2.018
    ],
    [
     "zorlanıyor.",
     2.018,
     2.515
    ],
    [
     "Yardım",
     2.85,
     3.114
    ],
    [
     "edebilirsin.",
     3.114,
     3.775
    ],
    [
     "Ne",
     4.22,
     4.368
    ],
    [
     "yaparsın?",
     4.368,
     4.813
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 5.082,
   "m": "Ayakkabılar bağlanıyor ama iş niyetsiz, sıradan bir alışkanlıkla geçiyor.",
   "k": [
    [
     "Ayakkabılar",
     0.03,
     0.905
    ],
    [
     "bağlanıyor",
     0.905,
     1.605
    ],
    [
     "ama",
     1.605,
     1.955
    ],
    [
     "iş",
     1.955,
     2.13
    ],
    [
     "niyetsiz,",
     2.13,
     2.655
    ],
    [
     "sıradan",
     2.905,
     3.432
    ],
    [
     "bir",
     3.432,
     3.607
    ],
    [
     "alışkanlıkla",
     3.607,
     4.486
    ],
    [
     "geçiyor.",
     4.486,
     5.012
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.233,
   "m": "Ayakkabı bağlanıyor ama sözler duyurmaya kayıyor; yardımın tadı azalıyor.",
   "k": [
    [
     "Ayakkabı",
     0.03,
     0.587
    ],
    [
     "bağlanıyor",
     0.587,
     1.144
    ],
    [
     "ama",
     1.144,
     1.422
    ],
    [
     "sözler",
     1.422,
     1.701
    ],
    [
     "duyurmaya",
     1.701,
     2.257
    ],
    [
     "kayıyor;",
     2.257,
     2.675
    ],
    [
     "yardımın",
     2.955,
     3.358
    ],
    [
     "tadı",
     3.358,
     3.626
    ],
    [
     "azalıyor.",
     3.626,
     4.163
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.912,
   "m": "Kardeşin sevinerek koşuyor; sen de içinde sakin bir hoşluk duyuyorsun.",
   "k": [
    [
     "Kardeşin",
     0.03,
     0.517
    ],
    [
     "sevinerek",
     0.517,
     1.167
    ],
    [
     "koşuyor;",
     1.167,
     1.655
    ],
    [
     "sen",
     1.94,
     2.147
    ],
    [
     "de",
     2.147,
     2.355
    ],
    [
     "içinde",
     2.355,
     2.977
    ],
    [
     "sakin",
     2.977,
     3.391
    ],
    [
     "bir",
     3.391,
     3.598
    ],
    [
     "hoşluk",
     3.598,
     4.013
    ],
    [
     "duyuyorsun.",
     4.013,
     4.842
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
   "sure": 9.732,
   "m": "Bu cümle bilerek çift anlamlı. İyiliği anlatmadan, gösterişsiz yapan biri söylüyorsa orta uca yakın. Niyet etmeden yapıp geçen biri söylüyorsa sol uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.17
    ],
    [
     "cümle",
     0.17,
     0.449
    ],
    [
     "bilerek",
     0.449,
     0.867
    ],
    [
     "çift",
     0.867,
     1.006
    ],
    [
     "anlamlı.",
     1.006,
     1.425
    ],
    [
     "İyiliği",
     1.8,
     2.453
    ],
    [
     "anlatmadan,",
     2.453,
     3.106
    ],
    [
     "gösterişsiz",
     3.106,
     3.759
    ],
    [
     "yapan",
     3.759,
     4.086
    ],
    [
     "biri",
     4.086,
     4.412
    ],
    [
     "söylüyorsa",
     4.412,
     5.065
    ],
    [
     "orta",
     5.065,
     5.392
    ],
    [
     "uca",
     5.392,
     5.718
    ],
    [
     "yakın.",
     5.718,
     6.045
    ],
    [
     "Niyet",
     6.435,
     6.758
    ],
    [
     "etmeden",
     6.758,
     7.242
    ],
    [
     "yapıp",
     7.242,
     7.564
    ],
    [
     "geçen",
     7.564,
     7.887
    ],
    [
     "biri",
     7.887,
     8.21
    ],
    [
     "söylüyorsa",
     8.21,
     8.855
    ],
    [
     "sol",
     8.855,
     9.016
    ],
    [
     "uca",
     9.016,
     9.339
    ],
    [
     "yakın.",
     9.339,
     9.662
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
