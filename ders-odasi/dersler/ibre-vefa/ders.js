/* İbremetre · Vefâ — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Saflık · Vefâ · Gadr). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-vefa",
 "ad": "Vefâ: İbren Nerede?",
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
     "huy": "Vefâ",
     "huyAnahtar": "Vefâ",
     "olculen": "Dostluğu tanıma ve koruma biçimim",
     "kanca": "Ben payımı yaptım, sıra sende mi?",
     "uclar": {
      "az": "Saflık",
      "orta": "Vefâ",
      "fazla": "Gadr"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Vefâ",
     "cumle": "Ben payımı yaptım, sıra sende mi?",
     "uclar": {
      "az": "Saflık",
      "orta": "Vefâ",
      "fazla": "Gadr"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi payını yapmış, arkadaşına “sıra sende mi?” diye nazikçe soruyor ve gerekirse yardım edecek: orta uca yakın. Başka okumada payını yapınca işi karşısındakine bırakıp çekiliyor: sağ uca (Gadr) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an dostluğu nasıl koruduğumuza bakar. Vefâ; sözünde durmak ve dostluğu zor günde de korumaktır. Bu ibrede sol uç (Saflık), herkesi hemen dost sanıp kolayca kandırılmaktır; sağ uç ise dostu yarı yolda bırakmaktır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Vefâ",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Saflık",
      "orta": "Vefâ",
      "fazla": "Gadr"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Herkese hemen dost gözüyle bakmak neye benziyor?",
       "ad": "Saflık",
       "soz": "Herkes dostum; kim ne isterse yaparım.",
       "eylem": "saskin",
       "zincir": [
        "Dostluğunu kullanan biri çıkınca kırılır.",
        "Gerçek dostu tanıdıklardan ayırmak zor olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkes dostumsa kimseyi sınamama gerek yok.",
          "dogru": true,
          "not": "Saflık, herkesi hemen dost sanıp kolay aldanmaktır. Dostluk, zamanla tanıyarak güvenmeyi de ister."
         },
         {
          "m": "Zor günde yanında dururum; yeni tanıdığıma zamanla güvenirim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: vefânın sesi."
         },
         {
          "m": "İşim bitti; gerisi beni ilgilendirmez.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: gadrın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Saflık",
        "soz": "Herkes"
       },
       "zincirAnahtar": [
        "Dostluğunu",
        "Gerçek"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Dostu yarı yolda bırakmak neye benziyor?",
       "ad": "Gadr",
       "soz": "İşim bitti, gerisini sen hallet.",
       "eylem": "yuru",
       "zincir": [
        "Arkadaşı yarı yolda kalır.",
        "Güven sarsılır ve dostluk soğur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "İşim bitti; gerisi beni ilgilendirmez.",
          "dogru": true,
          "not": "Gadr, dostu yarı yolda bırakmaktır. İş bitince dostluğu da bitirmek güveni sarsar."
         },
         {
          "m": "Herkes dostumsa kimseyi sınamama gerek yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Zor günde yanında dururum; yeni tanıdığıma zamanla güvenirim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: vefânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Gadr",
        "soz": "İşim"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Güven"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Vefâ",
       "soz": "Yanındayım; sen bitirene kadar buradayım.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı yükünün hafiflediğini görür.",
        "Dostluk zor günde sınanıp güçlenir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Zor günde yanında dururum; yeni tanıdığıma zamanla güvenirim.",
          "dogru": true,
          "not": "Vefâ, sözünde durup dostluğu korumaktır. Zor gün, dostluğun en çok anlaşıldığı gündür."
         },
         {
          "m": "Herkes dostumsa kimseyi sınamama gerek yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "İşim bitti; gerisi beni ilgilendirmez.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: gadrın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Vefâ",
        "soz": "Yanındayım;"
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
     "huy": "Vefâ",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Saflık",
      "orta": "Vefâ",
      "fazla": "Gadr"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "proje",
       "baslik": "Ortak proje",
       "tetik": "Arkadaşınla ortak proje yapıyorsunuz. Sen kendi bölümünü bitirdin, arkadaşın hâlâ yetişmeye çalışıyor. Yeni tanıştığın biri de “dostuz artık, benim bölümümü de sen yap,” diyor.",
       "secenekler": [
        {
         "m": "Herkes dostum; yeni arkadaşımın bölümünü de yaparım.",
         "zon": "az",
         "sonuc": "Yeni tanıdığının işi sana kalıyor; asıl arkadaşının yanına gidecek vaktin kalmıyor.",
         "not": "İbre sola kaydı: herkesi hemen dost sanmak, asıl dostluğa zaman bırakmıyor.",
         "ses": "s1az"
        },
        {
         "m": "Bölümüm bitti, geri kalanı onun sorunu.",
         "zon": "fazla",
         "sonuc": "Arkadaşın yarı yolda kalıyor; proje eksik teslim ediliyor.",
         "not": "İbre sağa kaydı: işi bitince dostu bırakmak vefayı eksiltiyor.",
         "ses": "s1fa"
        },
        {
         "m": "Arkadaşıma yardım ederim; yeni tanıdığa sonra bakarız derim.",
         "zon": "orta",
         "sonuc": "Proje birlikte tamamlanıyor; yeni tanıdığınla dostluğu zamanla görüyorsun.",
         "not": "İbre ortada: dostunun yanında durmak, işin ötesinde bir güven kuruyor.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "hata",
       "baslik": "Zor gün",
       "tetik": "Arkadaşın bir hata yaptı ve herkes ona kızıyor. Yeni tanıştığın biri de “onu bırak, benimle ol; gerçek dostun benim,” diyor.",
       "secenekler": [
        {
         "m": "Madem benim dostummuş, ona uyup arkadaşımı bırakırım.",
         "zon": "az",
         "sonuc": "Dostun yalnız kalıyor; yeni tanıdığın da ilgisini kaybedebilir.",
         "not": "İbre sola kaydı: yeni gelene hemen güvenmek, eski dostluğu kolayca bırakıyor.",
         "ses": "s2az"
        },
        {
         "m": "Hata yaptı, artık benden bir şey beklemesin.",
         "zon": "fazla",
         "sonuc": "Arkadaşın en çok yalnız olduğu anda yardımsız kalıyor.",
         "not": "İbre sağa kaydı: zor günde bırakmak, vefanın tersine yürümek.",
         "ses": "s2fa"
        },
        {
         "m": "Arkadaşımla konuşurum; yeni tanıdığı da zamanla tanırım.",
         "zon": "orta",
         "sonuc": "Arkadaşın hatasını anlıyor ve düzeltiyor; dostluk zor günü atlatıyor.",
         "not": "İbre ortada: hatayı görüp dostunun yanında durdun.",
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
       "aciklama": "Herkesi hemen dost sanmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Vefâ",
       "aciklama": "Zor günde dostun yanında durmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Gadr",
       "aciklama": "Dostu yarı yolda bırakmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Yeni tanıştığı birine hemen “en yakın dostum” der, her istediğini yapar.",
       "alan": "az",
       "ipucu": "Herkesi hemen dost sanıyor."
      },
      {
       "id": "k2",
       "metin": "Ödevi bitince ortak çalıştığı arkadaşını bırakıp gider.",
       "alan": "fazla",
       "ipucu": "İşi bitince dostunu bırakıyor."
      },
      {
       "id": "k3",
       "metin": "Arkadaşı zorlanırken bitirene kadar yanında kalır.",
       "alan": "orta",
       "ipucu": "Zor günde yanında duruyor."
      },
      {
       "id": "k4",
       "metin": "Yeni tanıdığı biri her gün ödevini yaptırsa da “o benim dostum” der.",
       "alan": "az",
       "ipucu": "Kolayca kullanılıyor."
      },
      {
       "id": "k5",
       "metin": "Arkadaşı zor durumdayken “ben işimi bitirdim” deyip ayrılır.",
       "alan": "fazla",
       "ipucu": "Dostunu yalnız bırakıyor."
      },
      {
       "id": "k6",
       "metin": "Yeni biriyle de arkadaş olur ama eski dostunu bırakmaz.",
       "alan": "orta",
       "ipucu": "Dostluğu aceleye getirmiyor."
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
        "Yeni biri bana “dostum” deyince",
        "Ortak bir işi bitirince",
        "Arkadaşım zor durumdayken",
        "Biri arkadaşımı kötülerken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Yeni tanıdığıma zamanla güvenmeyi deneyeceğim",
        "Ortak işi bitirene kadar yanında kalacağım",
        "Zor bir durumda güvendiğim bir yetişkinle de konuşacağım"
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
       "baslik": "Vefâ",
       "metin": "zor günde dostun yanında olmak",
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
   "sure": 2.053,
   "m": "Ben payımı yaptım, sıra sende mi?",
   "k": [
    [
     "Ben",
     0.03,
     0.184
    ],
    [
     "payımı",
     0.184,
     0.647
    ],
    [
     "yaptım,",
     0.647,
     0.955
    ],
    [
     "sıra",
     1.24,
     1.537
    ],
    [
     "sende",
     1.537,
     1.834
    ],
    [
     "mi?",
     1.834,
     1.983
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.181,
   "m": "Birçok güzel huy bir ibre gibidir. Vefâ, dostluğu zor günde koruma biçimimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.582
    ],
    [
     "güzel",
     0.582,
     1.134
    ],
    [
     "huy",
     1.134,
     1.41
    ],
    [
     "bir",
     1.41,
     1.685
    ],
    [
     "ibre",
     1.685,
     2.237
    ],
    [
     "gibidir.",
     2.237,
     3.065
    ],
    [
     "Vefâ,",
     3.225,
     3.649
    ],
    [
     "dostluğu",
     3.649,
     4.285
    ],
    [
     "zor",
     4.285,
     4.497
    ],
    [
     "günde",
     4.497,
     4.921
    ],
    [
     "koruma",
     4.921,
     5.558
    ],
    [
     "biçimimi",
     5.558,
     6.406
    ],
    [
     "ölçer.",
     6.406,
     6.83
    ],
    [
     "İbre",
     6.995,
     7.469
    ],
    [
     "üç",
     7.469,
     7.707
    ],
    [
     "yerde",
     7.707,
     8.181
    ],
    [
     "durabilir:",
     8.181,
     9.13
    ],
    [
     "az,",
     9.555,
     9.706
    ],
    [
     "kararında,",
     9.706,
     10.31
    ],
    [
     "fazla.",
     10.745,
     11.111
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
   "sure": 7.576,
   "m": "Sol uçta Saflık. Herkes dostum; kim ne isterse yaparım. Yeni tanıdığı birine hemen güvenip her isteğini yerine getirir.",
   "k": [
    [
     "Sol",
     0.03,
     0.168
    ],
    [
     "uçta",
     0.168,
     0.444
    ],
    [
     "Saflık.",
     0.444,
     0.72
    ],
    [
     "Herkes",
     0.91,
     1.167
    ],
    [
     "dostum;",
     1.167,
     1.425
    ],
    [
     "kim",
     1.89,
     1.981
    ],
    [
     "ne",
     1.981,
     2.072
    ],
    [
     "isterse",
     2.072,
     2.346
    ],
    [
     "yaparım.",
     2.346,
     2.62
    ],
    [
     "Yeni",
     2.98,
     3.342
    ],
    [
     "tanıdığı",
     3.342,
     4.066
    ],
    [
     "birine",
     4.066,
     4.609
    ],
    [
     "hemen",
     4.609,
     4.971
    ],
    [
     "güvenip",
     4.971,
     5.514
    ],
    [
     "her",
     5.514,
     5.695
    ],
    [
     "isteğini",
     5.695,
     6.42
    ],
    [
     "yerine",
     6.42,
     6.963
    ],
    [
     "getirir.",
     6.963,
     7.506
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.976,
   "m": "Sonra ne olur? Dostluğunu kullanan biri çıkınca kırılır. Gerçek dostu tanıdıklardan ayırmak zor olur.",
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
     "Dostluğunu",
     0.92,
     1.497
    ],
    [
     "kullanan",
     1.497,
     1.93
    ],
    [
     "biri",
     1.93,
     2.219
    ],
    [
     "çıkınca",
     2.219,
     2.652
    ],
    [
     "kırılır.",
     2.652,
     3.085
    ],
    [
     "Gerçek",
     3.505,
     3.825
    ],
    [
     "dostu",
     3.825,
     4.145
    ],
    [
     "tanıdıklardan",
     4.145,
     4.946
    ],
    [
     "ayırmak",
     4.946,
     5.426
    ],
    [
     "zor",
     5.426,
     5.586
    ],
    [
     "olur.",
     5.586,
     5.906
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
   "sure": 6.413,
   "m": "Sağ uçta Gadr. İşim bitti, gerisini sen hallet. Arkadaşı zor durumdayken ortalıktan kaybolur.",
   "k": [
    [
     "Sağ",
     0.03,
     0.257
    ],
    [
     "uçta",
     0.257,
     0.712
    ],
    [
     "Gadr.",
     0.712,
     0.94
    ],
    [
     "İşim",
     1.19,
     1.485
    ],
    [
     "bitti,",
     1.485,
     1.78
    ],
    [
     "gerisini",
     1.895,
     2.741
    ],
    [
     "sen",
     2.741,
     2.952
    ],
    [
     "hallet.",
     2.952,
     3.375
    ],
    [
     "Arkadaşı",
     4.03,
     4.608
    ],
    [
     "zor",
     4.608,
     4.753
    ],
    [
     "durumdayken",
     4.753,
     5.331
    ],
    [
     "ortalıktan",
     5.331,
     5.91
    ],
    [
     "kaybolur.",
     5.91,
     6.343
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 4.81,
   "m": "Sonra ne olur? Arkadaşı yarı yolda kalır. Güven sarsılır ve dostluk soğur.",
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
     "Arkadaşı",
     1.08,
     1.596
    ],
    [
     "yarı",
     1.596,
     1.854
    ],
    [
     "yolda",
     1.854,
     2.112
    ],
    [
     "kalır.",
     2.112,
     2.37
    ],
    [
     "Güven",
     2.55,
     2.988
    ],
    [
     "sarsılır",
     2.988,
     3.645
    ],
    [
     "ve",
     3.645,
     3.864
    ],
    [
     "dostluk",
     3.864,
     4.302
    ],
    [
     "soğur.",
     4.302,
     4.74
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
   "sure": 8.786,
   "m": "Tam kararında Vefâ. Yanındayım; sen bitirene kadar buradayım. Payını bitirince arkadaşına yardım etmeye gider.",
   "k": [
    [
     "Tam",
     0.03,
     0.289
    ],
    [
     "kararında",
     0.289,
     1.323
    ],
    [
     "Vefâ.",
     1.323,
     1.84
    ],
    [
     "Yanındayım;",
     2.425,
     3.197
    ],
    [
     "sen",
     3.197,
     3.39
    ],
    [
     "bitirene",
     3.39,
     4.162
    ],
    [
     "kadar",
     4.162,
     4.548
    ],
    [
     "buradayım.",
     4.548,
     5.32
    ],
    [
     "Payını",
     5.74,
     6.21
    ],
    [
     "bitirince",
     6.21,
     6.837
    ],
    [
     "arkadaşına",
     6.837,
     7.62
    ],
    [
     "yardım",
     7.62,
     7.933
    ],
    [
     "etmeye",
     7.933,
     8.403
    ],
    [
     "gider.",
     8.403,
     8.716
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.683,
   "m": "Sonra ne olur? Arkadaşı yükünün hafiflediğini görür. Dostluk zor günde sınanıp güçlenir.",
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
     "Arkadaşı",
     0.935,
     1.548
    ],
    [
     "yükünün",
     1.548,
     2.008
    ],
    [
     "hafiflediğini",
     2.008,
     2.928
    ],
    [
     "görür.",
     2.928,
     3.235
    ],
    [
     "Dostluk",
     3.325,
     3.741
    ],
    [
     "zor",
     3.741,
     3.949
    ],
    [
     "günde",
     3.949,
     4.365
    ],
    [
     "sınanıp",
     4.365,
     4.989
    ],
    [
     "güçlenir.",
     4.989,
     5.613
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
   "sure": 9.958,
   "m": "Arkadaşınla ortak proje yapıyorsunuz. Sen kendi bölümünü bitirdin, arkadaşın hâlâ yetişmeye çalışıyor. Yeni tanıştığın biri de dostuz artık, benim bölümümü de sen yap, diyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşınla",
     0.03,
     0.667
    ],
    [
     "ortak",
     0.667,
     0.922
    ],
    [
     "proje",
     0.922,
     1.177
    ],
    [
     "yapıyorsunuz.",
     1.177,
     1.815
    ],
    [
     "Sen",
     2.09,
     2.217
    ],
    [
     "kendi",
     2.217,
     2.472
    ],
    [
     "bölümünü",
     2.472,
     2.982
    ],
    [
     "bitirdin,",
     2.982,
     3.365
    ],
    [
     "arkadaşın",
     3.515,
     4.102
    ],
    [
     "hâlâ",
     4.102,
     4.396
    ],
    [
     "yetişmeye",
     4.396,
     4.983
    ],
    [
     "çalışıyor.",
     4.983,
     5.57
    ],
    [
     "Yeni",
     5.67,
     5.957
    ],
    [
     "tanıştığın",
     5.957,
     6.531
    ],
    [
     "biri",
     6.531,
     6.818
    ],
    [
     "de",
     6.818,
     6.961
    ],
    [
     "dostuz",
     6.961,
     7.248
    ],
    [
     "artık,",
     7.248,
     7.535
    ],
    [
     "benim",
     7.75,
     7.987
    ],
    [
     "bölümümü",
     7.987,
     8.46
    ],
    [
     "de",
     8.46,
     8.578
    ],
    [
     "sen",
     8.578,
     8.697
    ],
    [
     "yap,",
     8.697,
     8.815
    ],
    [
     "diyor.",
     8.915,
     9.115
    ],
    [
     "Ne",
     9.445,
     9.556
    ],
    [
     "yaparsın?",
     9.556,
     9.888
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.948,
   "m": "Yeni tanıdığının işi sana kalıyor; asıl arkadaşının yanına gidecek vaktin kalmıyor.",
   "k": [
    [
     "Yeni",
     0.03,
     0.327
    ],
    [
     "tanıdığının",
     0.327,
     1.07
    ],
    [
     "işi",
     1.07,
     1.367
    ],
    [
     "sana",
     1.367,
     1.664
    ],
    [
     "kalıyor;",
     1.664,
     2.11
    ],
    [
     "asıl",
     2.235,
     2.529
    ],
    [
     "arkadaşının",
     2.529,
     3.263
    ],
    [
     "yanına",
     3.263,
     3.703
    ],
    [
     "gidecek",
     3.703,
     4.144
    ],
    [
     "vaktin",
     4.144,
     4.437
    ],
    [
     "kalmıyor.",
     4.437,
     4.878
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.131,
   "m": "Arkadaşın yarı yolda kalıyor; proje eksik teslim ediliyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.501
    ],
    [
     "yarı",
     0.501,
     0.736
    ],
    [
     "yolda",
     0.736,
     0.972
    ],
    [
     "kalıyor;",
     0.972,
     1.325
    ],
    [
     "proje",
     1.49,
     1.804
    ],
    [
     "eksik",
     1.804,
     2.119
    ],
    [
     "teslim",
     2.119,
     2.433
    ],
    [
     "ediliyor.",
     2.433,
     3.062
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.917,
   "m": "Proje birlikte tamamlanıyor; yeni tanıdığınla dostluğu zamanla görüyorsun.",
   "k": [
    [
     "Proje",
     0.03,
     0.265
    ],
    [
     "birlikte",
     0.265,
     0.618
    ],
    [
     "tamamlanıyor;",
     0.618,
     1.205
    ],
    [
     "yeni",
     1.635,
     1.895
    ],
    [
     "tanıdığınla",
     1.895,
     2.546
    ],
    [
     "dostluğu",
     2.546,
     2.936
    ],
    [
     "zamanla",
     2.936,
     3.326
    ],
    [
     "görüyorsun.",
     3.326,
     3.847
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 7.932,
   "m": "Arkadaşın bir hata yaptı ve herkes ona kızıyor. Yeni tanıştığın biri de onu bırak, benimle ol; gerçek dostun benim, diyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.603
    ],
    [
     "bir",
     0.603,
     0.746
    ],
    [
     "hata",
     0.746,
     1.033
    ],
    [
     "yaptı",
     1.033,
     1.319
    ],
    [
     "ve",
     1.319,
     1.462
    ],
    [
     "herkes",
     1.462,
     1.749
    ],
    [
     "ona",
     1.749,
     2.035
    ],
    [
     "kızıyor.",
     2.035,
     2.465
    ],
    [
     "Yeni",
     2.785,
     3.157
    ],
    [
     "tanıştığın",
     3.157,
     3.9
    ],
    [
     "biri",
     3.9,
     4.271
    ],
    [
     "de",
     4.271,
     4.457
    ],
    [
     "onu",
     4.457,
     4.828
    ],
    [
     "bırak,",
     4.828,
     5.2
    ],
    [
     "benimle",
     5.435,
     6.237
    ],
    [
     "ol;",
     6.237,
     6.505
    ],
    [
     "gerçek",
     6.63,
     6.738
    ],
    [
     "dostun",
     6.738,
     6.847
    ],
    [
     "benim,",
     6.847,
     6.955
    ],
    [
     "diyor.",
     7.33,
     7.507
    ],
    [
     "Ne",
     7.507,
     7.596
    ],
    [
     "yaparsın?",
     7.596,
     7.862
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.199,
   "m": "Dostun yalnız kalıyor; yeni tanıdığın da ilgisini kaybedebilir.",
   "k": [
    [
     "Dostun",
     0.03,
     0.37
    ],
    [
     "yalnız",
     0.37,
     0.71
    ],
    [
     "kalıyor;",
     0.71,
     1.22
    ],
    [
     "yeni",
     1.595,
     1.912
    ],
    [
     "tanıdığın",
     1.912,
     2.545
    ],
    [
     "da",
     2.545,
     2.704
    ],
    [
     "ilgisini",
     2.704,
     3.337
    ],
    [
     "kaybedebilir.",
     3.337,
     4.129
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.584,
   "m": "Arkadaşın en çok yalnız olduğu anda yardımsız kalıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.763
    ],
    [
     "en",
     0.763,
     0.947
    ],
    [
     "çok",
     0.947,
     1.13
    ],
    [
     "yalnız",
     1.13,
     1.497
    ],
    [
     "olduğu",
     1.497,
     2.047
    ],
    [
     "anda",
     2.047,
     2.414
    ],
    [
     "yardımsız",
     2.414,
     2.964
    ],
    [
     "kalıyor.",
     2.964,
     3.514
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.078,
   "m": "Arkadaşın hatasını anlıyor ve düzeltiyor; dostluk zor günü atlatıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.568
    ],
    [
     "hatasını",
     0.568,
     1.105
    ],
    [
     "anlıyor",
     1.105,
     1.508
    ],
    [
     "ve",
     1.508,
     1.643
    ],
    [
     "düzeltiyor;",
     1.643,
     2.18
    ],
    [
     "dostluk",
     2.595,
     2.909
    ],
    [
     "zor",
     2.909,
     3.066
    ],
    [
     "günü",
     3.066,
     3.38
    ],
    [
     "atlatıyor.",
     3.38,
     4.008
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
   "sure": 11.994,
   "m": "Bu cümle bilerek çift anlamlı. Payını yapıp nazikçe yardıma hazır biri söylüyorsa orta uca yakın. Payını yapınca işi karşısındakine bırakıp çekilen biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.181
    ],
    [
     "cümle",
     0.181,
     0.484
    ],
    [
     "bilerek",
     0.484,
     0.939
    ],
    [
     "çift",
     0.939,
     1.091
    ],
    [
     "anlamlı.",
     1.091,
     1.545
    ],
    [
     "Payını",
     1.92,
     2.387
    ],
    [
     "yapıp",
     2.387,
     2.698
    ],
    [
     "nazikçe",
     2.698,
     3.165
    ],
    [
     "yardıma",
     3.165,
     3.632
    ],
    [
     "hazır",
     3.632,
     3.943
    ],
    [
     "biri",
     3.943,
     4.254
    ],
    [
     "söylüyorsa",
     4.254,
     4.876
    ],
    [
     "orta",
     4.876,
     5.188
    ],
    [
     "uca",
     5.188,
     5.499
    ],
    [
     "yakın.",
     5.499,
     5.81
    ],
    [
     "Payını",
     6.455,
     6.984
    ],
    [
     "yapınca",
     6.984,
     7.514
    ],
    [
     "işi",
     7.514,
     7.866
    ],
    [
     "karşısındakine",
     7.866,
     8.925
    ],
    [
     "bırakıp",
     8.925,
     9.454
    ],
    [
     "çekilen",
     9.454,
     9.983
    ],
    [
     "biri",
     9.983,
     10.336
    ],
    [
     "söylüyorsa",
     10.336,
     11.042
    ],
    [
     "sağ",
     11.042,
     11.218
    ],
    [
     "uca",
     11.218,
     11.571
    ],
    [
     "yakın.",
     11.571,
     11.924
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
