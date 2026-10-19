/* İbremetre · Recâ — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Karamsarlık · Recâ · Hayalcilik). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-reca",
 "ad": "Recâ: İbren Nerede?",
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
     "huy": "Recâ",
     "huyAnahtar": "Recâ",
     "olculen": "Umudu çabayla taşıma biçimim",
     "kanca": "Her şey düzelecek, bakarsın.",
     "uclar": {
      "az": "Karamsarlık",
      "orta": "Recâ",
      "fazla": "Hayalcilik"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Recâ",
     "cumle": "Her şey düzelecek, bakarsın.",
     "uclar": {
      "az": "Karamsarlık",
      "orta": "Recâ",
      "fazla": "Hayalcilik"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi hiçbir şey yapmadan hayal kuruyor: sağ uca (Hayalcilik) yakın. Başka okumada çalışmış, hazırlanmış ve güvenle iyisini bekliyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, umudun yanında çabaya da bakar. Recâ; elinden geleni yapıp sonucu Allahü teâlâ’ya güvenerek umutla beklemektir. Sol uç (Karamsarlık; Excel’de Ye’s) umudu tamamen kaybetmektir, sağ uç (Hayalcilik; Excel’de Tûl-i Emel) çalışmadan uzun hayaller kurmaktır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Recâ",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Karamsarlık",
      "orta": "Recâ",
      "fazla": "Hayalcilik"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Umudunu kaybetmek neye benziyor?",
       "ad": "Karamsarlık",
       "soz": "Çalışsam da olmaz ki; hiç uğraşmayayım.",
       "eylem": "yaslan",
       "zincir": [
        "Denemeyi bıraktığı için bazı işler hiç başlamaz.",
        "Vazgeçtikçe umut daha da küçülür."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Denesem de olmaz; boşuna uğraşmayayım.",
          "dogru": true,
          "not": "Karamsarlık, umudun hiç kalmamasıdır. Bir kez olmayınca vazgeçmek, sonraki denemeyi de kapatır. Umutsuz hissedince güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Elimden geleni yaptım; güvenle bekliyorum.",
          "dogru": false,
          "not": "Bu orta ucun sesi: recânın sesi."
         },
         {
          "m": "Hayal kurmam yeter; çalışmasam da olur.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hayalciliğin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Karamsarlık",
        "soz": "Çalışsam"
       },
       "zincirAnahtar": [
        "Denemeyi",
        "Vazgeçtikçe"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Sadece hayal kuran kişi neden hedefe varamaz?",
       "ad": "Hayalcilik",
       "soz": "Yarın çok başarılı olacağım; çalışmama gerek yok.",
       "eylem": "dusun",
       "zincir": [
        "Sınav günü gelir, hazırlık yapmadığı ortaya çıkar.",
        "Hayal güzel kalır ama hiçbir şey değişmez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Hayal kurmam yeter; çalışmasam da olur.",
          "dogru": true,
          "not": "Hayalcilik, çalışmadan sadece hayal kurup beklemektir. Umut, çabayla birlikte güzeldir."
         },
         {
          "m": "Denesem de olmaz; boşuna uğraşmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: karamsarlığın sesi."
         },
         {
          "m": "Elimden geleni yaptım; güvenle bekliyorum.",
          "dogru": false,
          "not": "Bu orta ucun sesi: recânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hayalcilik",
        "soz": "Yarın"
       },
       "zincirAnahtar": [
        "Sınav",
        "Hayal"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Recâ",
       "soz": "Çalıştım; şimdi güvenle bekliyorum.",
       "eylem": "nefes",
       "zincir": [
        "Beklerken içi rahat eder.",
        "Sonuç nasıl olursa olsun yeniden denemeye hazır kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Elimden geleni yaptım; güvenle bekliyorum.",
          "dogru": true,
          "not": "Recâ, elinden geleni yapıp Allahü teâlâ’ya güvenerek umutla beklemektir."
         },
         {
          "m": "Denesem de olmaz; boşuna uğraşmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: karamsarlığın sesi."
         },
         {
          "m": "Hayal kurmam yeter; çalışmasam da olur.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hayalciliğin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Recâ",
        "soz": "Çalıştım;"
       },
       "zincirAnahtar": [
        "Beklerken",
        "Sonuç"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Recâ",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Karamsarlık",
      "orta": "Recâ",
      "fazla": "Hayalcilik"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "sinav",
       "baslik": "Zor sınav",
       "tetik": "Yarın zor bir sınavın var. Akşam masaya oturuyorsun.",
       "secenekler": [
        {
         "m": "Ne yapsam olmaz; kitaba hiç bakmayayım.",
         "zon": "az",
         "sonuc": "Kitap kapalı kalıyor; umutsuzluk yüzünden hazırlık hiç başlamıyor.",
         "not": "İbre sola kaydı: umudu kaybetmek, çalışmanın da önünü kesiyor.",
         "ses": "s1az"
        },
        {
         "m": "Zaten başaracağım; çalışmadan hayal kurayım.",
         "zon": "fazla",
         "sonuc": "Sınav günü bilmediğin sorular çıkıyor; hayal tek başına yetmiyor.",
         "not": "İbre sağa kaydı: umut çabasız kalınca boş hayale dönüyor.",
         "ses": "s1fa"
        },
        {
         "m": "Bugün elimden geleni yaparım, sonra güvenle beklerim.",
         "zon": "orta",
         "sonuc": "Hazırlıklı gidiyorsun; sonuç ne olursa olsun için rahat.",
         "not": "İbre ortada: umut ve çaba bir arada.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "takim",
       "baslik": "Takım denemesi",
       "tetik": "Takım seçmesinde ilk denemende seçilmedin. Bir sonraki deneme bir ay sonra.",
       "secenekler": [
        {
         "m": "Hiçbir zaman olmayacak; bırakıyorum.",
         "zon": "az",
         "sonuc": "Antrenmanlar bırakılıyor; bir sonraki denemeye bile girmiyorsun.",
         "not": "İbre sola kaydı: bir kez olmayınca umudu kesmek.",
         "ses": "s2az"
        },
        {
         "m": "Nasıl olsa seçilirim; antrenman yapmam.",
         "zon": "fazla",
         "sonuc": "Ay dolunca hazırlıksızsın; yine seçilmiyorsun.",
         "not": "İbre sağa kaydı: çalışmadan beklemek umut değil.",
         "ses": "s2fa"
        },
        {
         "m": "Her hafta çalışırım, bir ay sonra yeniden denerim.",
         "zon": "orta",
         "sonuc": "Düzenli çalışıyorsun; deneme günü kendine güvenle gidiyorsun.",
         "not": "İbre ortada: çalış, güven, yeniden dene.",
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
       "ad": "Az · Karamsarlık",
       "aciklama": "Umudu kaybetmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Recâ",
       "aciklama": "Çalışıp güvenle beklemek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Hayalcilik",
       "aciklama": "Çalışmadan hayal kurmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Bir kez notu düşünce “bir daha olmaz” deyip ders çalışmayı bırakır.",
       "alan": "az",
       "ipucu": "Umudu kaybetmiş."
      },
      {
       "id": "k2",
       "metin": "Resim yarışmasını kazanmayı düşler ama hiç resim yapmaz.",
       "alan": "fazla",
       "ipucu": "Sadece hayal ediyor."
      },
      {
       "id": "k3",
       "metin": "Düşük aldığı notu görür, planını değiştirir ve yeniden çalışır.",
       "alan": "orta",
       "ipucu": "Umut ve çaba birlikte."
      },
      {
       "id": "k4",
       "metin": "“Ben zaten başaramam” der ve denemeden bırakır.",
       "alan": "az",
       "ipucu": "Karamsarlığa kapılıyor."
      },
      {
       "id": "k5",
       "metin": "“Büyük bir bilim insanı olacağım” der ama kitabı açmaz.",
       "alan": "fazla",
       "ipucu": "Hayali var, adımı yok."
      },
      {
       "id": "k6",
       "metin": "Bahçeye tohum ekip her gün sular, sonra sabırla bekler.",
       "alan": "orta",
       "ipucu": "Çalışıp güvenle bekliyor."
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
        "Bir işte başarısız olunca",
        "Sonucu beklerken",
        "Çok zor bir ödevle karşılaşınca",
        "Hayal kurarken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Olmayınca bir sonraki küçük adımı yazacağım",
        "Hayalimi küçük bir plana çevireceğim",
        "Zor gelirse güvendiğim bir büyüğe anlatacağım"
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
       "baslik": "Recâ",
       "metin": "çalışıp güvenle beklemek",
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
   "sure": 1.674,
   "m": "Her şey düzelecek, bakarsın.",
   "k": [
    [
     "Her",
     0.03,
     0.201
    ],
    [
     "şey",
     0.201,
     0.372
    ],
    [
     "düzelecek,",
     0.372,
     1.055
    ],
    [
     "bakarsın.",
     1.145,
     1.604
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.312,
   "m": "Birçok güzel huy bir ibre gibidir. Recâ, çalışırken umudu nasıl taşıdığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.441
    ],
    [
     "güzel",
     0.441,
     0.852
    ],
    [
     "huy",
     0.852,
     1.057
    ],
    [
     "bir",
     1.057,
     1.263
    ],
    [
     "ibre",
     1.263,
     1.674
    ],
    [
     "gibidir.",
     1.674,
     2.29
    ],
    [
     "Recâ,",
     2.97,
     3.395
    ],
    [
     "çalışırken",
     3.66,
     4.53
    ],
    [
     "umudu",
     4.53,
     5.183
    ],
    [
     "nasıl",
     5.183,
     5.617
    ],
    [
     "taşıdığımı",
     5.617,
     6.705
    ],
    [
     "ölçer.",
     6.705,
     7.14
    ],
    [
     "İbre",
     7.31,
     7.779
    ],
    [
     "üç",
     7.779,
     8.013
    ],
    [
     "yerde",
     8.013,
     8.482
    ],
    [
     "durabilir:",
     8.482,
     9.42
    ],
    [
     "az,",
     9.79,
     9.943
    ],
    [
     "kararında,",
     9.943,
     10.555
    ],
    [
     "fazla.",
     10.865,
     11.242
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
   "m": "Sol uçta Karamsarlık. Çalışsam da olmaz ki; hiç uğraşmayayım. Bir kez olmayınca kalemi bırakır.",
   "k": [
    [
     "Sol",
     0.03,
     0.229
    ],
    [
     "uçta",
     0.229,
     0.626
    ],
    [
     "Karamsarlık.",
     0.626,
     1.42
    ],
    [
     "Çalışsam",
     1.49,
     2.27
    ],
    [
     "da",
     2.27,
     2.53
    ],
    [
     "olmaz",
     2.53,
     3.05
    ],
    [
     "ki;",
     3.05,
     3.31
    ],
    [
     "hiç",
     3.635,
     3.763
    ],
    [
     "uğraşmayayım.",
     3.763,
     4.405
    ],
    [
     "Bir",
     5.135,
     5.296
    ],
    [
     "kez",
     5.296,
     5.458
    ],
    [
     "olmayınca",
     5.458,
     6.103
    ],
    [
     "kalemi",
     6.103,
     6.587
    ],
    [
     "bırakır.",
     6.587,
     7.071
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.836,
   "m": "Sonra ne olur? Denemeyi bıraktığı için bazı işler hiç başlamaz. Vazgeçtikçe umut daha da küçülür.",
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
     "Denemeyi",
     1.105,
     1.752
    ],
    [
     "bıraktığı",
     1.752,
     2.398
    ],
    [
     "için",
     2.398,
     2.722
    ],
    [
     "bazı",
     2.722,
     3.045
    ],
    [
     "işler",
     3.045,
     3.368
    ],
    [
     "hiç",
     3.368,
     3.53
    ],
    [
     "başlamaz.",
     3.53,
     4.015
    ],
    [
     "Vazgeçtikçe",
     4.625,
     5.339
    ],
    [
     "umut",
     5.339,
     5.695
    ],
    [
     "daha",
     5.695,
     6.052
    ],
    [
     "da",
     6.052,
     6.23
    ],
    [
     "küçülür.",
     6.23,
     6.766
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
   "sure": 7.121,
   "m": "Sağ uçta Hayalcilik. Yarın çok başarılı olacağım; çalışmama gerek yok. Hayalini kurar ama tek adım atmaz.",
   "k": [
    [
     "Sağ",
     0.03,
     0.236
    ],
    [
     "uçta",
     0.236,
     0.649
    ],
    [
     "Hayalcilik.",
     0.649,
     1.475
    ],
    [
     "Yarın",
     1.555,
     1.9
    ],
    [
     "çok",
     1.9,
     2.073
    ],
    [
     "başarılı",
     2.073,
     2.764
    ],
    [
     "olacağım;",
     2.764,
     3.455
    ],
    [
     "çalışmama",
     3.68,
     4.254
    ],
    [
     "gerek",
     4.254,
     4.541
    ],
    [
     "yok.",
     4.541,
     4.685
    ],
    [
     "Hayalini",
     5.005,
     5.635
    ],
    [
     "kurar",
     5.635,
     5.949
    ],
    [
     "ama",
     5.949,
     6.264
    ],
    [
     "tek",
     6.264,
     6.422
    ],
    [
     "adım",
     6.422,
     6.736
    ],
    [
     "atmaz.",
     6.736,
     7.051
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 7.144,
   "m": "Sonra ne olur? Sınav günü gelir, hazırlık yapmadığı ortaya çıkar. Hayal güzel kalır ama hiçbir şey değişmez.",
   "k": [
    [
     "Sonra",
     0.03,
     0.26
    ],
    [
     "ne",
     0.26,
     0.375
    ],
    [
     "olur?",
     0.375,
     0.605
    ],
    [
     "Sınav",
     1.005,
     1.283
    ],
    [
     "günü",
     1.283,
     1.562
    ],
    [
     "gelir,",
     1.562,
     1.84
    ],
    [
     "hazırlık",
     2.08,
     2.458
    ],
    [
     "yapmadığı",
     2.458,
     2.961
    ],
    [
     "ortaya",
     2.961,
     3.338
    ],
    [
     "çıkar.",
     3.338,
     3.59
    ],
    [
     "Hayal",
     3.98,
     4.422
    ],
    [
     "güzel",
     4.422,
     4.864
    ],
    [
     "kalır",
     4.864,
     5.306
    ],
    [
     "ama",
     5.306,
     5.748
    ],
    [
     "hiçbir",
     5.748,
     6.19
    ],
    [
     "şey",
     6.19,
     6.411
    ],
    [
     "değişmez.",
     6.411,
     7.074
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
   "sure": 7.513,
   "m": "Tam kararında Recâ. Çalıştım; şimdi güvenle bekliyorum. Elinden geleni yapar, sonucu umutla bekler.",
   "k": [
    [
     "Tam",
     0.03,
     0.212
    ],
    [
     "kararında",
     0.212,
     0.941
    ],
    [
     "Recâ.",
     0.941,
     1.305
    ],
    [
     "Çalıştım;",
     1.68,
     2.19
    ],
    [
     "şimdi",
     2.6,
     2.901
    ],
    [
     "güvenle",
     2.901,
     3.353
    ],
    [
     "bekliyorum.",
     3.353,
     3.955
    ],
    [
     "Elinden",
     4.625,
     5.034
    ],
    [
     "geleni",
     5.034,
     5.442
    ],
    [
     "yapar,",
     5.442,
     5.715
    ],
    [
     "sonucu",
     6.03,
     6.56
    ],
    [
     "umutla",
     6.56,
     7.09
    ],
    [
     "bekler.",
     7.09,
     7.443
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.83,
   "m": "Sonra ne olur? Beklerken içi rahat eder. Sonuç nasıl olursa olsun yeniden denemeye hazır kalır.",
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
     "Beklerken",
     1.01,
     1.467
    ],
    [
     "içi",
     1.467,
     1.771
    ],
    [
     "rahat",
     1.771,
     2.076
    ],
    [
     "eder.",
     2.076,
     2.38
    ],
    [
     "Sonuç",
     2.715,
     3.019
    ],
    [
     "nasıl",
     3.019,
     3.324
    ],
    [
     "olursa",
     3.324,
     3.781
    ],
    [
     "olsun",
     3.781,
     4.085
    ],
    [
     "yeniden",
     4.085,
     4.542
    ],
    [
     "denemeye",
     4.542,
     5.151
    ],
    [
     "hazır",
     5.151,
     5.455
    ],
    [
     "kalır.",
     5.455,
     5.76
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
   "sure": 3.459,
   "m": "Yarın zor bir sınavın var. Akşam masaya oturuyorsun. Ne yaparsın?",
   "k": [
    [
     "Yarın",
     0.03,
     0.32
    ],
    [
     "zor",
     0.32,
     0.465
    ],
    [
     "bir",
     0.465,
     0.61
    ],
    [
     "sınavın",
     0.61,
     1.045
    ],
    [
     "var.",
     1.045,
     1.19
    ],
    [
     "Akşam",
     1.505,
     1.735
    ],
    [
     "masaya",
     1.735,
     2.08
    ],
    [
     "oturuyorsun.",
     2.08,
     2.655
    ],
    [
     "Ne",
     2.835,
     2.974
    ],
    [
     "yaparsın?",
     2.974,
     3.389
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.845,
   "m": "Kitap kapalı kalıyor; umutsuzluk yüzünden hazırlık hiç başlamıyor.",
   "k": [
    [
     "Kitap",
     0.03,
     0.279
    ],
    [
     "kapalı",
     0.279,
     0.652
    ],
    [
     "kalıyor;",
     0.652,
     1.025
    ],
    [
     "umutsuzluk",
     1.49,
     2.099
    ],
    [
     "yüzünden",
     2.099,
     2.556
    ],
    [
     "hazırlık",
     2.556,
     3.013
    ],
    [
     "hiç",
     3.013,
     3.165
    ],
    [
     "başlamıyor.",
     3.165,
     3.775
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.576,
   "m": "Sınav günü bilmediğin sorular çıkıyor; hayal tek başına yetmiyor.",
   "k": [
    [
     "Sınav",
     0.03,
     0.306
    ],
    [
     "günü",
     0.306,
     0.583
    ],
    [
     "bilmediğin",
     0.583,
     1.136
    ],
    [
     "sorular",
     1.136,
     1.55
    ],
    [
     "çıkıyor;",
     1.55,
     1.965
    ],
    [
     "hayal",
     2.165,
     2.463
    ],
    [
     "tek",
     2.463,
     2.612
    ],
    [
     "başına",
     2.612,
     3.059
    ],
    [
     "yetmiyor.",
     3.059,
     3.506
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.334,
   "m": "Hazırlıklı gidiyorsun; sonuç ne olursa olsun için rahat.",
   "k": [
    [
     "Hazırlıklı",
     0.03,
     0.478
    ],
    [
     "gidiyorsun;",
     0.478,
     0.925
    ],
    [
     "sonuç",
     1.215,
     1.557
    ],
    [
     "ne",
     1.557,
     1.727
    ],
    [
     "olursa",
     1.727,
     2.24
    ],
    [
     "olsun",
     2.24,
     2.581
    ],
    [
     "için",
     2.581,
     2.923
    ],
    [
     "rahat.",
     2.923,
     3.264
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.843,
   "m": "Takım seçmesinde ilk denemende seçilmedin. Bir sonraki deneme bir ay sonra. Ne yaparsın?",
   "k": [
    [
     "Takım",
     0.03,
     0.305
    ],
    [
     "seçmesinde",
     0.305,
     0.856
    ],
    [
     "ilk",
     0.856,
     0.994
    ],
    [
     "denemende",
     0.994,
     1.544
    ],
    [
     "seçilmedin.",
     1.544,
     2.095
    ],
    [
     "Bir",
     2.465,
     2.61
    ],
    [
     "sonraki",
     2.61,
     3.047
    ],
    [
     "deneme",
     3.047,
     3.483
    ],
    [
     "bir",
     3.483,
     3.629
    ],
    [
     "ay",
     3.629,
     3.774
    ],
    [
     "sonra.",
     3.774,
     4.065
    ],
    [
     "Ne",
     4.255,
     4.385
    ],
    [
     "yaparsın?",
     4.385,
     4.773
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.625,
   "m": "Antrenmanlar bırakılıyor; bir sonraki denemeye bile girmiyorsun.",
   "k": [
    [
     "Antrenmanlar",
     0.03,
     0.626
    ],
    [
     "bırakılıyor;",
     0.626,
     1.37
    ],
    [
     "bir",
     1.65,
     1.786
    ],
    [
     "sonraki",
     1.786,
     2.194
    ],
    [
     "denemeye",
     2.194,
     2.738
    ],
    [
     "bile",
     2.738,
     3.01
    ],
    [
     "girmiyorsun.",
     3.01,
     3.555
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.569,
   "m": "Ay dolunca hazırlıksızsın; yine seçilmiyorsun.",
   "k": [
    [
     "Ay",
     0.03,
     0.223
    ],
    [
     "dolunca",
     0.223,
     0.803
    ],
    [
     "hazırlıksızsın;",
     0.803,
     1.77
    ],
    [
     "yine",
     2.23,
     2.592
    ],
    [
     "seçilmiyorsun.",
     2.592,
     3.499
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.361,
   "m": "Düzenli çalışıyorsun; deneme günü kendine güvenle gidiyorsun.",
   "k": [
    [
     "Düzenli",
     0.03,
     0.371
    ],
    [
     "çalışıyorsun;",
     0.371,
     0.94
    ],
    [
     "deneme",
     1.255,
     1.662
    ],
    [
     "günü",
     1.662,
     1.934
    ],
    [
     "kendine",
     1.934,
     2.341
    ],
    [
     "güvenle",
     2.341,
     2.748
    ],
    [
     "gidiyorsun.",
     2.748,
     3.291
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
   "sure": 9.743,
   "m": "Bu cümle bilerek çift anlamlı. Hiçbir şey yapmadan hayal kuran biri söylüyorsa sağ uca yakın. Çalışıp güvenle bekleyen biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.205
    ],
    [
     "cümle",
     0.205,
     0.556
    ],
    [
     "bilerek",
     0.556,
     1.083
    ],
    [
     "çift",
     1.083,
     1.258
    ],
    [
     "anlamlı.",
     1.258,
     1.785
    ],
    [
     "Hiçbir",
     2.39,
     2.733
    ],
    [
     "şey",
     2.733,
     2.905
    ],
    [
     "yapmadan",
     2.905,
     3.42
    ],
    [
     "hayal",
     3.42,
     3.763
    ],
    [
     "kuran",
     3.763,
     4.107
    ],
    [
     "biri",
     4.107,
     4.45
    ],
    [
     "söylüyorsa",
     4.45,
     5.137
    ],
    [
     "sağ",
     5.137,
     5.308
    ],
    [
     "uca",
     5.308,
     5.652
    ],
    [
     "yakın.",
     5.652,
     5.995
    ],
    [
     "Çalışıp",
     6.525,
     6.975
    ],
    [
     "güvenle",
     6.975,
     7.425
    ],
    [
     "bekleyen",
     7.425,
     7.874
    ],
    [
     "biri",
     7.874,
     8.174
    ],
    [
     "söylüyorsa",
     8.174,
     8.774
    ],
    [
     "orta",
     8.774,
     9.074
    ],
    [
     "uca",
     9.074,
     9.374
    ],
    [
     "yakın.",
     9.374,
     9.673
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
