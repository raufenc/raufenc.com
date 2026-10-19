/* İbremetre · Hüsnüzan — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Saflık · Hüsnüzan · Suizan). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-husnuzan",
 "ad": "Hüsnüzan: İbren Nerede?",
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
     "huy": "Hüsnüzan",
     "huyAnahtar": "Hüsnüzan",
     "olculen": "Kanıt yokken başkası hakkında düşünüşüm",
     "kanca": "Selam vermedi; bir şey olmuştur.",
     "uclar": {
      "az": "Saflık",
      "orta": "Hüsnüzan",
      "fazla": "Suizan"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Hüsnüzan",
     "cumle": "Selam vermedi; bir şey olmuştur.",
     "uclar": {
      "az": "Saflık",
      "orta": "Hüsnüzan",
      "fazla": "Suizan"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi “belki bir derdi vardır” diye düşünüp sonra nazikçe soracak: orta uca yakın. Başka okumada “bana karşı bir şey olmuştur” diye kanıtsız kötü sonuç çıkarıyor: sağ uca (Suizan) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an kanıt yokken kişiyi nasıl düşündüğümüze bakar. Hüsnüzan (Excel’deki adıyla Hüsn-ü Zan); delil yokken kötü düşünmemektir, ama gözü kapatmak değildir: iyi zan ile saflık farklıdır. Sol uçta kanıt aramadan herkese inanılır, sağ uç (Suizan; Excel’de Sû-i Zan) kanıt yokken kötü sanmaktır. Güvenlik gerektiren bir durumda kimseyi suçlamadan akıllıca davranıp güvendiğin bir yetişkine danışırız.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Hüsnüzan",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Saflık",
      "orta": "Hüsnüzan",
      "fazla": "Suizan"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Herkese hemen inanmak neye benziyor?",
       "ad": "Saflık",
       "soz": "Herkes dürüsttür, ne söylerse doğrudur.",
       "eylem": "saskin",
       "zincir": [
        "Yalan söyleyenler onu kolayca kandırır.",
        "Doğruyu yanlıştan ayırmayı öğrenmek gecikir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkes doğru söyler; sormama gerek yok.",
          "dogru": true,
          "not": "Saflık, iyi kötü demeden herkese inanmaktır. İyi düşünmek, kanıta bakmayı bırakmak demek değildir."
         },
         {
          "m": "Kanıt yok; önce iyi düşüneyim, sonra sorayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hüsnüzanın sesi."
         },
         {
          "m": "Cevap vermedi; kesin bana kızgın.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: suizanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Saflık",
        "soz": "Herkes"
       },
       "zincirAnahtar": [
        "Yalan",
        "Doğruyu"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kanıt yokken kötü sanmak neye benziyor?",
       "ad": "Suizan",
       "soz": "Kesin bana kızgın, yoksa cevap verirdi.",
       "eylem": "dusun",
       "zincir": [
        "Boş yere kırılır ve arkadaşına soğuk davranır.",
        "Arkadaşı neden değiştiğini anlayamaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Cevap vermedi; kesin bana kızgın.",
          "dogru": true,
          "not": "Suizan, kanıt yokken kötü zannetmektir. Önce sormadan kötü sonuç çıkarmak dostluğu boşuna yorar."
         },
         {
          "m": "Herkes doğru söyler; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Kanıt yok; önce iyi düşüneyim, sonra sorayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hüsnüzanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Suizan",
        "soz": "Kesin"
       },
       "zincirAnahtar": [
        "Boş",
        "Arkadaşı"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Hüsnüzan",
       "soz": "Belki işi vardır; sonra sorarım.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı sonradan nedenini rahatça anlatır.",
        "Dostluk kırılmadan devam eder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Kanıt yok; önce iyi düşüneyim, sonra sorayım.",
          "dogru": true,
          "not": "Hüsnüzan, kanıt yokken kötü düşünmemektir. Gözü kapatmak değil; kanıt çıkarsa dikkatli davranmaktır."
         },
         {
          "m": "Herkes doğru söyler; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Cevap vermedi; kesin bana kızgın.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: suizanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hüsnüzan",
        "soz": "Belki"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Dostluk"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Hüsnüzan",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Saflık",
      "orta": "Hüsnüzan",
      "fazla": "Suizan"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "oyun",
       "baslik": "Çevrimiçi oyun",
       "tetik": "Çevrimiçi bir oyunda tanımadığın biri güzel sözler söyleyip özel bilgilerini soruyor.",
       "secenekler": [
        {
         "m": "Çok nazik, kesin iyidir; bilgilerimi yazarım.",
         "zon": "az",
         "sonuc": "Kişisel bilgilerin tanımadığın birine gidiyor; bu güvenli değil.",
         "not": "İbre sola kaydı: herkese inanmak, kendini korumayı unutturuyor.",
         "ses": "s1az"
        },
        {
         "m": "Oyuncuların hepsi kötüdür; kimseyle oynamam.",
         "zon": "fazla",
         "sonuc": "Tüm oyuncuları suçlamak, iyi arkadaşları da uzaklaştırıyor.",
         "not": "İbre sağa kaydı: kanıt yokken herkesi kötü sanmak dostluğu da engelliyor.",
         "ses": "s1fa"
        },
        {
         "m": "Bilgi vermem; durumu hemen güvendiğim bir yetişkine söylerim.",
         "zon": "orta",
         "sonuc": "Kişisel bilgin güvende; güvendiğin yetişkin durumu birlikte değerlendiriyor.",
         "not": "İbre ortada: kimseyi suçlamadan kendini koruyan akıllı davranış.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kavga",
       "baslik": "Kim başlattı?",
       "tetik": "Dün küçük bir tartışma çıktı. Bir arkadaşın “ben başlatmadım,” diyor; başkaları “o başlattı,” diyor.",
       "secenekler": [
        {
         "m": "O söylüyorsa doğrudur; kimseye sormam.",
         "zon": "az",
         "sonuc": "Doğru dinlenmeden karar veriliyor; olayın gerçeği ortaya çıkmıyor.",
         "not": "İbre sola kaydı: duyduğuna hemen inanmak, doğruyu aramayı unutturuyor.",
         "ses": "s2az"
        },
        {
         "m": "Kesin o başlatmıştır; suçlu o.",
         "zon": "fazla",
         "sonuc": "Kanıt yokken suçlanan arkadaşın üzülüyor; sen de gerçeği göremiyorsun.",
         "not": "İbre sağa kaydı: kanıt yokken kötü sanmak haksızlığa yol açıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Kanıt görmeden kimseyi suçlamam; iki tarafı da dinlerim.",
         "zon": "orta",
         "sonuc": "Gerçek ortaya çıkıyor; kimse haksız yere suçlanmıyor.",
         "not": "İbre ortada: kanıt yokken iyi düşünmek, adil davranmaktır.",
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
       "ad": "Az · Saflık",
       "aciklama": "Herkese hemen inanmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Hüsnüzan",
       "aciklama": "Kanıt yokken iyi düşünmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Suizan",
       "aciklama": "Kanıt yokken kötü sanmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Tanımadığı biri güzel konuşunca kişisel bilgilerini hemen verir.",
       "alan": "az",
       "ipucu": "Herkese kolayca inanıyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı cevap vermeyince “kesin bana kızgın” diye düşünür.",
       "alan": "fazla",
       "ipucu": "Kanıt yokken kötü zannediyor."
      },
      {
       "id": "k3",
       "metin": "Arkadaşı geç kalınca “belki işi çıkmıştır” der, sonra sorar.",
       "alan": "orta",
       "ipucu": "Kanıt yokken iyi düşünüyor."
      },
      {
       "id": "k4",
       "metin": "Her videoya, her söze hiç sormadan inanır.",
       "alan": "az",
       "ipucu": "İyi kötü ayırmıyor."
      },
      {
       "id": "k5",
       "metin": "Yeni gelen öğrenciyi tanımadan “bu kesin kötüdür” der.",
       "alan": "fazla",
       "ipucu": "Tanımadan kötü sanıyor."
      },
      {
       "id": "k6",
       "metin": "Bir şey duyunca önce kanıta bakar, sonra karar verir.",
       "alan": "orta",
       "ipucu": "Önce kanıta bakıyor."
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
        "Biri cevap vermeyince",
        "Tanımadığım biri bana yazınca",
        "Bir arkadaşım hakkında kötü bir şey duyunca",
        "Birinin neden öyle yaptığını bilmediğimde"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Kötü sonuç çıkarmadan önce nazikçe soracağım",
        "Duyduğum şeyin kanıtına bakacağım",
        "Tanımadığım biri bilgi isterse güvendiğim bir yetişkine söyleyeceğim"
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
       "baslik": "Hüsnüzan",
       "metin": "kanıt yokken iyi düşünmek",
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
   "sure": 2.269,
   "m": "Selam vermedi; bir şey olmuştur.",
   "k": [
    [
     "Selam",
     0.03,
     0.302
    ],
    [
     "vermedi;",
     0.302,
     0.71
    ],
    [
     "bir",
     1.085,
     1.308
    ],
    [
     "şey",
     1.308,
     1.531
    ],
    [
     "olmuştur.",
     1.531,
     2.199
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 12.146,
   "m": "Birçok güzel huy bir ibre gibidir. Hüsnüzan, kanıt yokken başkasını nasıl düşündüğümü ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.488
    ],
    [
     "güzel",
     0.488,
     0.946
    ],
    [
     "huy",
     0.946,
     1.175
    ],
    [
     "bir",
     1.175,
     1.405
    ],
    [
     "ibre",
     1.405,
     1.863
    ],
    [
     "gibidir.",
     1.863,
     2.55
    ],
    [
     "Hüsnüzan,",
     3.125,
     3.825
    ],
    [
     "kanıt",
     4.15,
     4.602
    ],
    [
     "yokken",
     4.602,
     5.054
    ],
    [
     "başkasını",
     5.054,
     5.957
    ],
    [
     "nasıl",
     5.957,
     6.409
    ],
    [
     "düşündüğümü",
     6.409,
     7.538
    ],
    [
     "ölçer.",
     7.538,
     7.99
    ],
    [
     "İbre",
     8.1,
     8.561
    ],
    [
     "üç",
     8.561,
     8.792
    ],
    [
     "yerde",
     8.792,
     9.253
    ],
    [
     "durabilir:",
     9.253,
     10.175
    ],
    [
     "az,",
     10.535,
     10.689
    ],
    [
     "kararında,",
     10.689,
     11.305
    ],
    [
     "fazla.",
     11.695,
     12.076
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
   "sure": 7.371,
   "m": "Sol uçta Saflık. Herkes dürüsttür, ne söylerse doğrudur. Kim ne derse, kanıt aramadan inanır.",
   "k": [
    [
     "Sol",
     0.03,
     0.278
    ],
    [
     "uçta",
     0.278,
     0.774
    ],
    [
     "Saflık.",
     0.774,
     1.27
    ],
    [
     "Herkes",
     1.36,
     1.388
    ],
    [
     "dürüsttür,",
     1.388,
     1.43
    ],
    [
     "ne",
     2.04,
     2.392
    ],
    [
     "söylerse",
     2.392,
     3.449
    ],
    [
     "doğrudur.",
     3.449,
     4.505
    ],
    [
     "Kim",
     4.965,
     5.164
    ],
    [
     "ne",
     5.164,
     5.363
    ],
    [
     "derse,",
     5.363,
     5.76
    ],
    [
     "kanıt",
     6.035,
     6.316
    ],
    [
     "aramadan",
     6.316,
     6.879
    ],
    [
     "inanır.",
     6.879,
     7.301
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.757,
   "m": "Sonra ne olur? Yalan söyleyenler onu kolayca kandırır. Doğruyu yanlıştan ayırmayı öğrenmek gecikir.",
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
     "Yalan",
     1.175,
     1.454
    ],
    [
     "söyleyenler",
     1.454,
     2.011
    ],
    [
     "onu",
     2.011,
     2.289
    ],
    [
     "kolayca",
     2.289,
     2.707
    ],
    [
     "kandırır.",
     2.707,
     3.125
    ],
    [
     "Doğruyu",
     3.485,
     3.898
    ],
    [
     "yanlıştan",
     3.898,
     4.311
    ],
    [
     "ayırmayı",
     4.311,
     4.861
    ],
    [
     "öğrenmek",
     4.861,
     5.274
    ],
    [
     "gecikir.",
     5.274,
     5.687
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
   "sure": 7.068,
   "m": "Sağ uçta Suizan. Kesin bana kızgın, yoksa cevap verirdi. Cevap gelmeyince en kötüsünü varsayar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.238
    ],
    [
     "uçta",
     0.238,
     0.655
    ],
    [
     "Suizan.",
     0.655,
     1.28
    ],
    [
     "Kesin",
     1.81,
     2.165
    ],
    [
     "bana",
     2.165,
     2.52
    ],
    [
     "kızgın,",
     2.52,
     2.875
    ],
    [
     "yoksa",
     2.96,
     3.271
    ],
    [
     "cevap",
     3.271,
     3.583
    ],
    [
     "verirdi.",
     3.583,
     4.05
    ],
    [
     "Cevap",
     4.25,
     4.643
    ],
    [
     "gelmeyince",
     4.643,
     5.428
    ],
    [
     "en",
     5.428,
     5.624
    ],
    [
     "kötüsünü",
     5.624,
     6.409
    ],
    [
     "varsayar.",
     6.409,
     6.998
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.905,
   "m": "Sonra ne olur? Boş yere kırılır ve arkadaşına soğuk davranır. Arkadaşı neden değiştiğini anlayamaz.",
   "k": [
    [
     "Sonra",
     0.03,
     0.334
    ],
    [
     "ne",
     0.334,
     0.486
    ],
    [
     "olur?",
     0.486,
     0.79
    ],
    [
     "Boş",
     1.255,
     1.411
    ],
    [
     "yere",
     1.411,
     1.724
    ],
    [
     "kırılır",
     1.724,
     2.192
    ],
    [
     "ve",
     2.192,
     2.348
    ],
    [
     "arkadaşına",
     2.348,
     3.129
    ],
    [
     "soğuk",
     3.129,
     3.441
    ],
    [
     "davranır.",
     3.441,
     3.91
    ],
    [
     "Arkadaşı",
     4.31,
     4.983
    ],
    [
     "neden",
     4.983,
     5.32
    ],
    [
     "değiştiğini",
     5.32,
     6.162
    ],
    [
     "anlayamaz.",
     6.162,
     6.835
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
   "sure": 6.492,
   "m": "Tam kararında Hüsnüzan. Belki işi vardır; sonra sorarım. Kanıt yokken en iyi ihtimali düşünür.",
   "k": [
    [
     "Tam",
     0.03,
     0.207
    ],
    [
     "kararında",
     0.207,
     0.914
    ],
    [
     "Hüsnüzan.",
     0.914,
     1.445
    ],
    [
     "Belki",
     1.73,
     2.097
    ],
    [
     "işi",
     2.097,
     2.463
    ],
    [
     "vardır;",
     2.463,
     2.83
    ],
    [
     "sonra",
     3.055,
     3.323
    ],
    [
     "sorarım.",
     3.323,
     3.725
    ],
    [
     "Kanıt",
     4.315,
     4.616
    ],
    [
     "yokken",
     4.616,
     4.917
    ],
    [
     "en",
     4.917,
     5.068
    ],
    [
     "iyi",
     5.068,
     5.369
    ],
    [
     "ihtimali",
     5.369,
     5.971
    ],
    [
     "düşünür.",
     5.971,
     6.422
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.761,
   "m": "Sonra ne olur? Arkadaşı sonradan nedenini rahatça anlatır. Dostluk kırılmadan devam eder.",
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
     "Arkadaşı",
     1.125,
     1.813
    ],
    [
     "sonradan",
     1.813,
     2.329
    ],
    [
     "nedenini",
     2.329,
     3.018
    ],
    [
     "rahatça",
     3.018,
     3.534
    ],
    [
     "anlatır.",
     3.534,
     4.05
    ],
    [
     "Dostluk",
     4.765,
     5.15
    ],
    [
     "kırılmadan",
     5.15,
     5.921
    ],
    [
     "devam",
     5.921,
     6.306
    ],
    [
     "eder.",
     6.306,
     6.691
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
   "sure": 5.57,
   "m": "Çevrimiçi bir oyunda tanımadığın biri güzel sözler söyleyip özel bilgilerini soruyor. Ne yaparsın?",
   "k": [
    [
     "Çevrimiçi",
     0.03,
     0.607
    ],
    [
     "bir",
     0.607,
     0.751
    ],
    [
     "oyunda",
     0.751,
     1.184
    ],
    [
     "tanımadığın",
     1.184,
     1.905
    ],
    [
     "biri",
     1.905,
     2.193
    ],
    [
     "güzel",
     2.193,
     2.482
    ],
    [
     "sözler",
     2.482,
     2.77
    ],
    [
     "söyleyip",
     2.77,
     3.203
    ],
    [
     "özel",
     3.203,
     3.491
    ],
    [
     "bilgilerini",
     3.491,
     4.212
    ],
    [
     "soruyor.",
     4.212,
     4.645
    ],
    [
     "Ne",
     4.925,
     5.069
    ],
    [
     "yaparsın?",
     5.069,
     5.5
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.336,
   "m": "Kişisel bilgilerin tanımadığın birine gidiyor; bu güvenli değil.",
   "k": [
    [
     "Kişisel",
     0.03,
     0.402
    ],
    [
     "bilgilerin",
     0.402,
     0.897
    ],
    [
     "tanımadığın",
     0.897,
     1.517
    ],
    [
     "birine",
     1.517,
     1.888
    ],
    [
     "gidiyor;",
     1.888,
     2.26
    ],
    [
     "bu",
     2.495,
     2.623
    ],
    [
     "güvenli",
     2.623,
     3.009
    ],
    [
     "değil.",
     3.009,
     3.266
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.242,
   "m": "Tüm oyuncuları suçlamak, iyi arkadaşları da uzaklaştırıyor.",
   "k": [
    [
     "Tüm",
     0.03,
     0.166
    ],
    [
     "oyuncuları",
     0.166,
     0.847
    ],
    [
     "suçlamak,",
     0.847,
     1.255
    ],
    [
     "iyi",
     1.565,
     1.795
    ],
    [
     "arkadaşları",
     1.795,
     2.368
    ],
    [
     "da",
     2.368,
     2.483
    ],
    [
     "uzaklaştırıyor.",
     2.483,
     3.172
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 5.336,
   "m": "Kişisel bilgin güvende; güvendiğin yetişkin durumu birlikte değerlendiriyor.",
   "k": [
    [
     "Kişisel",
     0.03,
     0.527
    ],
    [
     "bilgin",
     0.527,
     0.858
    ],
    [
     "güvende;",
     0.858,
     1.355
    ],
    [
     "güvendiğin",
     1.78,
     2.514
    ],
    [
     "yetişkin",
     2.514,
     3.064
    ],
    [
     "durumu",
     3.064,
     3.615
    ],
    [
     "birlikte",
     3.615,
     4.165
    ],
    [
     "değerlendiriyor.",
     4.165,
     5.266
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.065,
   "m": "Dün küçük bir tartışma çıktı. Bir arkadaşın ben başlatmadım, diyor; başkaları o başlattı, diyor. Ne yaparsın?",
   "k": [
    [
     "Dün",
     0.03,
     0.173
    ],
    [
     "küçük",
     0.173,
     0.46
    ],
    [
     "bir",
     0.46,
     0.603
    ],
    [
     "tartışma",
     0.603,
     1.033
    ],
    [
     "çıktı.",
     1.033,
     1.32
    ],
    [
     "Bir",
     1.8,
     1.97
    ],
    [
     "arkadaşın",
     1.97,
     2.65
    ],
    [
     "ben",
     2.65,
     2.82
    ],
    [
     "başlatmadım,",
     2.82,
     3.5
    ],
    [
     "diyor;",
     3.71,
     3.973
    ],
    [
     "başkaları",
     3.973,
     4.499
    ],
    [
     "o",
     4.499,
     4.63
    ],
    [
     "başlattı,",
     4.63,
     5.025
    ],
    [
     "diyor.",
     5.46,
     5.638
    ],
    [
     "Ne",
     5.638,
     5.727
    ],
    [
     "yaparsın?",
     5.727,
     5.995
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.469,
   "m": "Doğru dinlenmeden karar veriliyor; olayın gerçeği ortaya çıkmıyor.",
   "k": [
    [
     "Doğru",
     0.03,
     0.292
    ],
    [
     "dinlenmeden",
     0.292,
     0.818
    ],
    [
     "karar",
     0.818,
     1.08
    ],
    [
     "veriliyor;",
     1.08,
     1.605
    ],
    [
     "olayın",
     1.78,
     2.185
    ],
    [
     "gerçeği",
     2.185,
     2.59
    ],
    [
     "ortaya",
     2.59,
     2.995
    ],
    [
     "çıkmıyor.",
     2.995,
     3.399
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.69,
   "m": "Kanıt yokken suçlanan arkadaşın üzülüyor; sen de gerçeği göremiyorsun.",
   "k": [
    [
     "Kanıt",
     0.03,
     0.298
    ],
    [
     "yokken",
     0.298,
     0.566
    ],
    [
     "suçlanan",
     0.566,
     0.968
    ],
    [
     "arkadaşın",
     0.968,
     1.504
    ],
    [
     "üzülüyor;",
     1.504,
     2.04
    ],
    [
     "sen",
     2.345,
     2.472
    ],
    [
     "de",
     2.472,
     2.6
    ],
    [
     "gerçeği",
     2.6,
     2.982
    ],
    [
     "göremiyorsun.",
     2.982,
     3.62
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.463,
   "m": "Gerçek ortaya çıkıyor; kimse haksız yere suçlanmıyor.",
   "k": [
    [
     "Gerçek",
     0.03,
     0.301
    ],
    [
     "ortaya",
     0.301,
     0.708
    ],
    [
     "çıkıyor;",
     0.708,
     1.115
    ],
    [
     "kimse",
     1.42,
     1.815
    ],
    [
     "haksız",
     1.815,
     2.209
    ],
    [
     "yere",
     2.209,
     2.604
    ],
    [
     "suçlanmıyor.",
     2.604,
     3.393
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
   "sure": 10.835,
   "m": "Bu cümle bilerek çift anlamlı. Belki bir derdi vardır diye düşünüp nazikçe soracak biri söylüyorsa orta uca yakın. Bana karşı bir şey olmuştur diye kanıtsız kötü düşünüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.173
    ],
    [
     "cümle",
     0.173,
     0.458
    ],
    [
     "bilerek",
     0.458,
     0.885
    ],
    [
     "çift",
     0.885,
     1.028
    ],
    [
     "anlamlı.",
     1.028,
     1.455
    ],
    [
     "Belki",
     1.92,
     2.209
    ],
    [
     "bir",
     2.209,
     2.354
    ],
    [
     "derdi",
     2.354,
     2.643
    ],
    [
     "vardır",
     2.643,
     2.933
    ],
    [
     "diye",
     2.933,
     3.222
    ],
    [
     "düşünüp",
     3.222,
     3.656
    ],
    [
     "nazikçe",
     3.656,
     4.09
    ],
    [
     "soracak",
     4.09,
     4.524
    ],
    [
     "biri",
     4.524,
     4.813
    ],
    [
     "söylüyorsa",
     4.813,
     5.392
    ],
    [
     "orta",
     5.392,
     5.681
    ],
    [
     "uca",
     5.681,
     5.971
    ],
    [
     "yakın.",
     5.971,
     6.26
    ],
    [
     "Bana",
     6.535,
     6.86
    ],
    [
     "karşı",
     6.86,
     7.186
    ],
    [
     "bir",
     7.186,
     7.348
    ],
    [
     "şey",
     7.348,
     7.511
    ],
    [
     "olmuştur",
     7.511,
     7.999
    ],
    [
     "diye",
     7.999,
     8.325
    ],
    [
     "kanıtsız",
     8.325,
     8.813
    ],
    [
     "kötü",
     8.813,
     9.138
    ],
    [
     "düşünüyorsa",
     9.138,
     9.952
    ],
    [
     "sağ",
     9.952,
     10.114
    ],
    [
     "uca",
     10.114,
     10.44
    ],
    [
     "yakın.",
     10.44,
     10.765
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
