/* İbremetre · Tefsir — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Uzaklık · Doğru Tefsir · Yanlış Tefsir). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tefsir",
 "ad": "Tefsir: İbren Nerede?",
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
     "huy": "Tefsir",
     "huyAnahtar": "Tefsir",
     "olculen": "Kur’ân-ı Kerîm’i anlama biçimim",
     "kanca": "Ben bunu kendim anladım.",
     "uclar": {
      "az": "Uzaklık",
      "orta": "Doğru Tefsir",
      "fazla": "Yanlış Tefsir"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tefsir",
     "cumle": "Ben bunu kendim anladım.",
     "uclar": {
      "az": "Uzaklık",
      "orta": "Doğru Tefsir",
      "fazla": "Yanlış Tefsir"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi okuduğunu kendi görüşüne göre yorumlayıp kimseye sormuyor: sağ uca (Yanlış Tefsir) yakın. Başka okumada kişi okuyup anlamaya çalışmış ve anladığını güvendiği bir hocayla konuşmaya hazır: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an Kur’ân-ı Kerîm’i nasıl anlamaya çalıştığımıza bakar. Doğru tefsir; Kur’ân-ı Kerîm’i güvenilir ilim sahiplerinin öğrettiği şekilde anlamaktır. Çocuk düzeyinde bu, okumak, meale bakmak ve güvendiğin bir hocaya sormak alışkanlığıdır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tefsir",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Uzaklık",
      "orta": "Doğru Tefsir",
      "fazla": "Yanlış Tefsir"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Okumaktan uzak kalmak neye benziyor?",
       "ad": "Uzaklık",
       "soz": "Kur’ân-ı Kerîm’i açıp okumaya hiç vaktim yok.",
       "eylem": "yaslan",
       "zincir": [
        "Okumadığı için öğreneceği güzel şeyler yanından geçer.",
        "Merak ettiği konular öylece kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Şimdi vaktim yok; sonra bakarım.",
          "dogru": true,
          "not": "Uzaklık, Kur’ân-ı Kerîm’i okumamak ve anlamaya çalışmamaktır. Her gün küçük bir okuma bu mesafeyi kısaltır."
         },
         {
          "m": "Okuyayım, anlamadığım yeri güvendiğim hocama sorayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: doğru tefsirin sesi."
         },
         {
          "m": "Ben nasıl anlıyorsam öyledir; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: yanlış tefsirin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Uzaklık",
        "soz": "Kur’ân-ı"
       },
       "zincirAnahtar": [
        "Okumadığı",
        "Merak"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kendi isteğine göre anlamak neye benziyor?",
       "ad": "Kendince",
       "soz": "Bu bana göre şöyle demek; kimseye sormam.",
       "eylem": "isaret",
       "zincir": [
        "Yanlış anlaşılan bir şey yerleşebilir.",
        "Güvenilir bir hocaya sorsa farkı görebilirdi."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben nasıl anlıyorsam öyledir; sormama gerek yok.",
          "dogru": true,
          "not": "Bu uçta okunan söz, kendi isteğine göre anlaşılır. Okumak, meale bakmak ve güvendiğin bir hocaya sormak daha sağlam bir yoldur."
         },
         {
          "m": "Şimdi vaktim yok; sonra bakarım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: uzaklığın sesi."
         },
         {
          "m": "Okuyayım, anlamadığım yeri güvendiğim hocama sorayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: doğru tefsirin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kendince",
        "soz": "Bu"
       },
       "zincirAnahtar": [
        "Yanlış",
        "Güvenilir"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tefsir",
       "soz": "Okuyayım, anlamadığım yeri hocama sorayım.",
       "eylem": "konus",
       "zincir": [
        "Anlayışı her gün biraz derinleşir.",
        "Öğrendiğini ailesiyle de paylaşabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Okuyayım, anlamadığım yeri güvendiğim hocama sorayım.",
          "dogru": true,
          "not": "Doğru tefsir, Kur’ân-ı Kerîm’i güvenilir kaynaklardan ve hocalardan öğrenerek anlamaya çalışmaktır."
         },
         {
          "m": "Şimdi vaktim yok; sonra bakarım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: uzaklığın sesi."
         },
         {
          "m": "Ben nasıl anlıyorsam öyledir; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: yanlış tefsirin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tefsir",
        "soz": "Okuyayım,"
       },
       "zincirAnahtar": [
        "Anlayışı",
        "Öğrendiğini"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tefsir",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Uzaklık",
      "orta": "Doğru Tefsir",
      "fazla": "Yanlış Tefsir"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "okuma",
       "baslik": "Okuma saati",
       "tetik": "Evde Kur’ân-ı Kerîm okuma saati geldi ama canın başka bir şey yapmak istiyor.",
       "secenekler": [
        {
         "m": "Bugün de sonraya kalsın, sonra okurum.",
         "zon": "az",
         "sonuc": "Günler geçiyor; okumaya başlamak daha da zorlaşıyor.",
         "not": "İbre sola kaydı: sürekli ertelemek, Kur’ân-ı Kerîm’den uzaklaştırıyor.",
         "ses": "s1az"
        },
        {
         "m": "Okurum ama anlamını kendim bilirim, kimseye sormam.",
         "zon": "fazla",
         "sonuc": "Anlamadığın yerler yanlış anlaşılabilir; sorular cevapsız kalıyor.",
         "not": "İbre sağa kaydı: kendi görüşüne göre anlamak, doğrusunu öğrenmeyi engelliyor.",
         "ses": "s1fa"
        },
        {
         "m": "Kısaca okurum; anlamadığımı not alıp hocama sorarım.",
         "zon": "orta",
         "sonuc": "Küçük bir okuma yapıyorsun ve sorunu hocana götürüyorsun.",
         "not": "İbre ortada: okumak ve anlamak için sormak birlikte yürüyor.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "soz",
       "baslik": "Kafa karıştıran söz",
       "tetik": "Kur’ân-ı Kerîm’den duyduğun bir sözün anlamı sana kafa karıştırdı.",
       "secenekler": [
        {
         "m": "Düşünmem, geçerim; nasılsa anlamam.",
         "zon": "az",
         "sonuc": "Kafandaki soru kalıyor; konu sana daha da uzak geliyor.",
         "not": "İbre sola kaydı: anlamaya çalışmamak, mesafeyi büyütüyor.",
         "ses": "s2az"
        },
        {
         "m": "Bana göre bu şu demek; öyle kabul ettim.",
         "zon": "fazla",
         "sonuc": "Anlamı kendi isteğinle belirledin; doğru olup olmadığına bakılmıyor.",
         "not": "İbre sağa kaydı: kendi görüşüne göre anlamak, doğrusunu öğrenmeden karar vermektir.",
         "ses": "s2fa"
        },
        {
         "m": "Meale bakarım, sonra güvendiğim hocama sorarım.",
         "zon": "orta",
         "sonuc": "Hocan anlatınca kafandaki soru netleşiyor.",
         "not": "İbre ortada: okumak, bakmak ve hocaya sormak güzel bir alışkanlık.",
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
       "ad": "Az · Uzaklık",
       "aciklama": "Okumamak, anlamamak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Doğru Tefsir",
       "aciklama": "Okumak, bakmak, hocaya sormak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Yanlış Tefsir",
       "aciklama": "Kendi isteğine göre anlamak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Haftalarca Kur’ân-ı Kerîm’i açıp bakmaz.",
       "alan": "az",
       "ipucu": "Okumuyor."
      },
      {
       "id": "k2",
       "metin": "Duyduğu bir sözü işine geldiği gibi anlar, kimseye sormaz.",
       "alan": "fazla",
       "ipucu": "Kendi istediğine göre anlıyor."
      },
      {
       "id": "k3",
       "metin": "Okur, meale bakar, anlamadığını güvendiği hocaya sorar.",
       "alan": "orta",
       "ipucu": "Okuma ve sorma birlikte."
      },
      {
       "id": "k4",
       "metin": "“Anlamasam da olur” der, anlamaya çalışmaz.",
       "alan": "az",
       "ipucu": "Anlamaya uzak."
      },
      {
       "id": "k5",
       "metin": "“Ben öyle anlıyorum, bitti” der, kimseye danışmaz.",
       "alan": "fazla",
       "ipucu": "Tek yorumla yetiniyor."
      },
      {
       "id": "k6",
       "metin": "Her gün kısa bir süre okur ve merak ettiğini not alır.",
       "alan": "orta",
       "ipucu": "Düzenli ve meraklı."
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
        "Kur’ân-ı Kerîm okuma saatinde",
        "Anlamadığım bir söz duyunca",
        "Merak ettiğim bir konu olunca",
        "Bir arkadaşım farklı bir şey anlatınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Her gün kısa bir süre okuyacağım",
        "Anlamadığım yeri not alıp güvendiğim bir hocaya soracağım",
        "Bir sözü kendi isteğime göre anlamak yerine meale bakıp soracağım"
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
       "baslik": "Tefsir",
       "metin": "okumak, bakmak, hocaya sormak",
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
   "sure": 1.519,
   "m": "Ben bunu kendim anladım.",
   "k": [
    [
     "Ben",
     0.03,
     0.207
    ],
    [
     "bunu",
     0.207,
     0.562
    ],
    [
     "kendim",
     0.562,
     0.917
    ],
    [
     "anladım.",
     0.917,
     1.449
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.354,
   "m": "Birçok güzel huy bir ibre gibidir. Tefsir, Kur’ân-ı Kerîm’i nasıl anlamaya çalıştığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.445
    ],
    [
     "güzel",
     0.445,
     0.861
    ],
    [
     "huy",
     0.861,
     1.069
    ],
    [
     "bir",
     1.069,
     1.276
    ],
    [
     "ibre",
     1.276,
     1.692
    ],
    [
     "gibidir.",
     1.692,
     2.315
    ],
    [
     "Tefsir,",
     3.15,
     3.685
    ],
    [
     "Kur’ân-ı",
     3.98,
     4.544
    ],
    [
     "Kerîm’i",
     4.544,
     5.107
    ],
    [
     "nasıl",
     5.107,
     5.483
    ],
    [
     "anlamaya",
     5.483,
     6.235
    ],
    [
     "çalıştığımı",
     6.235,
     7.174
    ],
    [
     "ölçer.",
     7.174,
     7.55
    ],
    [
     "İbre",
     7.625,
     8.047
    ],
    [
     "üç",
     8.047,
     8.258
    ],
    [
     "yerde",
     8.258,
     8.681
    ],
    [
     "durabilir:",
     8.681,
     9.525
    ],
    [
     "az,",
     9.83,
     10.62
    ],
    [
     "kararında,",
     10.905,
     11.157
    ],
    [
     "fazla.",
     11.157,
     11.284
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
   "sure": 8.234,
   "m": "Sol uçta Uzaklık. Kur’ân-ı Kerîm’i açıp okumaya hiç vaktim yok. Okumayı sürekli sonraya bırakır, anlamaya da çalışmaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.242
    ],
    [
     "uçta",
     0.242,
     0.665
    ],
    [
     "Uzaklık.",
     0.665,
     1.3
    ],
    [
     "Kur’ân-ı",
     1.4,
     1.957
    ],
    [
     "Kerîm’i",
     1.957,
     2.514
    ],
    [
     "açıp",
     2.514,
     2.885
    ],
    [
     "okumaya",
     2.885,
     3.627
    ],
    [
     "hiç",
     3.627,
     3.813
    ],
    [
     "vaktim",
     3.813,
     4.184
    ],
    [
     "yok.",
     4.184,
     4.37
    ],
    [
     "Okumayı",
     4.465,
     5.202
    ],
    [
     "sürekli",
     5.202,
     5.755
    ],
    [
     "sonraya",
     5.755,
     6.307
    ],
    [
     "bırakır,",
     6.307,
     6.86
    ],
    [
     "anlamaya",
     7.16,
     7.662
    ],
    [
     "da",
     7.662,
     7.787
    ],
    [
     "çalışmaz.",
     7.787,
     8.164
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 7.045,
   "m": "Sonra ne olur? Okumadığı için öğreneceği güzel şeyler yanından geçer. Merak ettiği konular öylece kalır.",
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
     "Okumadığı",
     1.275,
     1.965
    ],
    [
     "için",
     1.965,
     2.242
    ],
    [
     "öğreneceği",
     2.242,
     2.932
    ],
    [
     "güzel",
     2.932,
     3.208
    ],
    [
     "şeyler",
     3.208,
     3.485
    ],
    [
     "yanından",
     3.485,
     3.899
    ],
    [
     "geçer.",
     3.899,
     4.175
    ],
    [
     "Merak",
     4.685,
     5.037
    ],
    [
     "ettiği",
     5.037,
     5.566
    ],
    [
     "konular",
     5.566,
     6.094
    ],
    [
     "öylece",
     6.094,
     6.622
    ],
    [
     "kalır.",
     6.622,
     6.975
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
   "sure": 8.26,
   "m": "Sağ uçta Kendince. Bu bana göre şöyle demek; kimseye sormam. Okuduğunu kendi istediği gibi yorumlar, sormayı gerekli görmez.",
   "k": [
    [
     "Sağ",
     0.03,
     0.154
    ],
    [
     "uçta",
     0.154,
     0.402
    ],
    [
     "Kendince.",
     0.402,
     0.775
    ],
    [
     "Bu",
     0.995,
     1.251
    ],
    [
     "bana",
     1.251,
     1.763
    ],
    [
     "göre",
     1.763,
     2.276
    ],
    [
     "şöyle",
     2.276,
     2.788
    ],
    [
     "demek;",
     2.788,
     3.3
    ],
    [
     "kimseye",
     3.54,
     4.053
    ],
    [
     "sormam.",
     4.053,
     4.395
    ],
    [
     "Okuduğunu",
     4.75,
     5.348
    ],
    [
     "kendi",
     5.348,
     5.588
    ],
    [
     "istediği",
     5.588,
     6.067
    ],
    [
     "gibi",
     6.067,
     6.306
    ],
    [
     "yorumlar,",
     6.306,
     6.665
    ],
    [
     "sormayı",
     6.86,
     7.359
    ],
    [
     "gerekli",
     7.359,
     7.858
    ],
    [
     "görmez.",
     7.858,
     8.19
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.805,
   "m": "Sonra ne olur? Yanlış anlaşılan bir şey yerleşebilir. Güvenilir bir hocaya sorsa farkı görebilirdi.",
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
     "Yanlış",
     1.21,
     1.46
    ],
    [
     "anlaşılan",
     1.46,
     1.96
    ],
    [
     "bir",
     1.96,
     2.085
    ],
    [
     "şey",
     2.085,
     2.21
    ],
    [
     "yerleşebilir.",
     2.21,
     2.835
    ],
    [
     "Güvenilir",
     3.3,
     3.873
    ],
    [
     "bir",
     3.873,
     4.016
    ],
    [
     "hocaya",
     4.016,
     4.446
    ],
    [
     "sorsa",
     4.446,
     4.732
    ],
    [
     "farkı",
     4.732,
     5.019
    ],
    [
     "görebilirdi.",
     5.019,
     5.735
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
   "sure": 8.557,
   "m": "Tam kararında Tefsir. Okuyayım, anlamadığım yeri hocama sorayım. Okur, meale bakar ve güvendiği bir hocaya sorar.",
   "k": [
    [
     "Tam",
     0.03,
     0.237
    ],
    [
     "kararında",
     0.237,
     1.066
    ],
    [
     "Tefsir.",
     1.066,
     1.48
    ],
    [
     "Okuyayım,",
     1.85,
     2.295
    ],
    [
     "anlamadığım",
     2.515,
     3.546
    ],
    [
     "yeri",
     3.546,
     3.958
    ],
    [
     "hocama",
     3.958,
     4.577
    ],
    [
     "sorayım.",
     4.577,
     5.195
    ],
    [
     "Okur,",
     5.315,
     5.667
    ],
    [
     "meale",
     5.667,
     6.196
    ],
    [
     "bakar",
     6.196,
     6.548
    ],
    [
     "ve",
     6.548,
     6.725
    ],
    [
     "güvendiği",
     6.725,
     7.429
    ],
    [
     "bir",
     7.429,
     7.606
    ],
    [
     "hocaya",
     7.606,
     8.134
    ],
    [
     "sorar.",
     8.134,
     8.487
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.707,
   "m": "Sonra ne olur? Anlayışı her gün biraz derinleşir. Öğrendiğini ailesiyle de paylaşabilir.",
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
     "Anlayışı",
     1.03,
     1.785
    ],
    [
     "her",
     1.785,
     1.974
    ],
    [
     "gün",
     1.974,
     2.162
    ],
    [
     "biraz",
     2.162,
     2.54
    ],
    [
     "derinleşir.",
     2.54,
     3.295
    ],
    [
     "Öğrendiğini",
     3.465,
     4.144
    ],
    [
     "ailesiyle",
     4.144,
     4.822
    ],
    [
     "de",
     4.822,
     4.958
    ],
    [
     "paylaşabilir.",
     4.958,
     5.637
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
   "sure": 4.847,
   "m": "Evde Kur’ân-ı Kerîm okuma saati geldi ama canın başka bir şey yapmak istiyor. Ne yaparsın?",
   "k": [
    [
     "Evde",
     0.03,
     0.302
    ],
    [
     "Kur’ân-ı",
     0.302,
     0.71
    ],
    [
     "Kerîm",
     0.71,
     0.983
    ],
    [
     "okuma",
     0.983,
     1.391
    ],
    [
     "saati",
     1.391,
     1.799
    ],
    [
     "geldi",
     1.799,
     2.071
    ],
    [
     "ama",
     2.071,
     2.343
    ],
    [
     "canın",
     2.343,
     2.615
    ],
    [
     "başka",
     2.615,
     2.888
    ],
    [
     "bir",
     2.888,
     3.024
    ],
    [
     "şey",
     3.024,
     3.16
    ],
    [
     "yapmak",
     3.16,
     3.432
    ],
    [
     "istiyor.",
     3.432,
     3.84
    ],
    [
     "Ne",
     4.085,
     4.258
    ],
    [
     "yaparsın?",
     4.258,
     4.777
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.134,
   "m": "Günler geçiyor; okumaya başlamak daha da zorlaşıyor.",
   "k": [
    [
     "Günler",
     0.03,
     0.376
    ],
    [
     "geçiyor;",
     0.376,
     0.895
    ],
    [
     "okumaya",
     0.975,
     1.572
    ],
    [
     "başlamak",
     1.572,
     2.02
    ],
    [
     "daha",
     2.02,
     2.318
    ],
    [
     "da",
     2.318,
     2.467
    ],
    [
     "zorlaşıyor.",
     2.467,
     3.064
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.561,
   "m": "Anlamadığın yerler yanlış anlaşılabilir; sorular cevapsız kalıyor.",
   "k": [
    [
     "Anlamadığın",
     0.03,
     0.665
    ],
    [
     "yerler",
     0.665,
     0.919
    ],
    [
     "yanlış",
     0.919,
     1.173
    ],
    [
     "anlaşılabilir;",
     1.173,
     1.935
    ],
    [
     "sorular",
     2.28,
     2.684
    ],
    [
     "cevapsız",
     2.684,
     3.087
    ],
    [
     "kalıyor.",
     3.087,
     3.491
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.311,
   "m": "Küçük bir okuma yapıyorsun ve sorunu hocana götürüyorsun.",
   "k": [
    [
     "Küçük",
     0.03,
     0.322
    ],
    [
     "bir",
     0.322,
     0.468
    ],
    [
     "okuma",
     0.468,
     0.906
    ],
    [
     "yapıyorsun",
     0.906,
     1.489
    ],
    [
     "ve",
     1.489,
     1.635
    ],
    [
     "sorunu",
     1.635,
     2.073
    ],
    [
     "hocana",
     2.073,
     2.511
    ],
    [
     "götürüyorsun.",
     2.511,
     3.241
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 3.747,
   "m": "Kur’ân-ı Kerîm’den duyduğun bir sözün anlamı sana kafa karıştırdı. Ne yaparsın?",
   "k": [
    [
     "Kur’ân-ı",
     0.03,
     0.389
    ],
    [
     "Kerîm’den",
     0.389,
     0.749
    ],
    [
     "duyduğun",
     0.749,
     1.108
    ],
    [
     "bir",
     1.108,
     1.228
    ],
    [
     "sözün",
     1.228,
     1.467
    ],
    [
     "anlamı",
     1.467,
     1.827
    ],
    [
     "sana",
     1.827,
     2.066
    ],
    [
     "kafa",
     2.066,
     2.306
    ],
    [
     "karıştırdı.",
     2.306,
     2.785
    ],
    [
     "Ne",
     3.12,
     3.259
    ],
    [
     "yaparsın?",
     3.259,
     3.677
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.662,
   "m": "Kafandaki soru kalıyor; konu sana daha da uzak geliyor.",
   "k": [
    [
     "Kafandaki",
     0.03,
     0.572
    ],
    [
     "soru",
     0.572,
     0.843
    ],
    [
     "kalıyor;",
     0.843,
     1.25
    ],
    [
     "konu",
     1.79,
     2.09
    ],
    [
     "sana",
     2.09,
     2.391
    ],
    [
     "daha",
     2.391,
     2.691
    ],
    [
     "da",
     2.691,
     2.841
    ],
    [
     "uzak",
     2.841,
     3.142
    ],
    [
     "geliyor.",
     3.142,
     3.592
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.932,
   "m": "Anlamı kendi isteğinle belirledin; doğru olup olmadığına bakılmıyor.",
   "k": [
    [
     "Anlamı",
     0.03,
     0.471
    ],
    [
     "kendi",
     0.471,
     0.765
    ],
    [
     "isteğinle",
     0.765,
     1.352
    ],
    [
     "belirledin;",
     1.352,
     1.94
    ],
    [
     "doğru",
     2.045,
     2.324
    ],
    [
     "olup",
     2.324,
     2.604
    ],
    [
     "olmadığına",
     2.604,
     3.303
    ],
    [
     "bakılmıyor.",
     3.303,
     3.862
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.069,
   "m": "Hocan anlatınca kafandaki soru netleşiyor.",
   "k": [
    [
     "Hocan",
     0.03,
     0.401
    ],
    [
     "anlatınca",
     0.401,
     1.144
    ],
    [
     "kafandaki",
     1.144,
     1.886
    ],
    [
     "soru",
     1.886,
     2.257
    ],
    [
     "netleşiyor.",
     2.257,
     2.999
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
   "sure": 11.905,
   "m": "Bu cümle bilerek çift anlamlı. Okuduğunu kendi görüşüne göre yorumlayıp kimseye sormayan biri söylüyorsa sağ uca yakın. Okuyup anlamaya çalışan ve hocasına sormaya hazır biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.171
    ],
    [
     "cümle",
     0.171,
     0.452
    ],
    [
     "bilerek",
     0.452,
     0.873
    ],
    [
     "çift",
     0.873,
     1.014
    ],
    [
     "anlamlı.",
     1.014,
     1.435
    ],
    [
     "Okuduğunu",
     1.815,
     2.493
    ],
    [
     "kendi",
     2.493,
     2.764
    ],
    [
     "görüşüne",
     2.764,
     3.306
    ],
    [
     "göre",
     3.306,
     3.578
    ],
    [
     "yorumlayıp",
     3.578,
     4.12
    ],
    [
     "kimseye",
     4.12,
     4.527
    ],
    [
     "sormayan",
     4.527,
     4.934
    ],
    [
     "biri",
     4.934,
     5.205
    ],
    [
     "söylüyorsa",
     5.205,
     5.747
    ],
    [
     "sağ",
     5.747,
     5.883
    ],
    [
     "uca",
     5.883,
     6.154
    ],
    [
     "yakın.",
     6.154,
     6.425
    ],
    [
     "Okuyup",
     6.94,
     7.399
    ],
    [
     "anlamaya",
     7.399,
     8.011
    ],
    [
     "çalışan",
     8.011,
     8.47
    ],
    [
     "ve",
     8.47,
     8.623
    ],
    [
     "hocasına",
     8.623,
     9.235
    ],
    [
     "sormaya",
     9.235,
     9.694
    ],
    [
     "hazır",
     9.694,
     10.0
    ],
    [
     "biri",
     10.0,
     10.306
    ],
    [
     "söylüyorsa",
     10.306,
     10.918
    ],
    [
     "orta",
     10.918,
     11.224
    ],
    [
     "uca",
     11.224,
     11.53
    ],
    [
     "yakın.",
     11.53,
     11.836
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
