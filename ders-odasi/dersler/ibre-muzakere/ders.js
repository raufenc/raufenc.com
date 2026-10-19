/* İbremetre · Müzâkere — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Uysallık · Müzâkere · İnat). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-muzakere",
 "ad": "Müzâkere: İbren Nerede?",
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
     "huy": "Müzâkere",
     "olculen": "Kendi fikrimi savunma payım",
     "kanca": "Tamam, siz nasıl isterseniz.",
     "uclar": {
      "az": "Uysallık",
      "orta": "Müzâkere",
      "fazla": "İnat"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Müzâkere",
     "cumle": "Tamam, siz nasıl isterseniz.",
     "uclar": {
      "az": "Uysallık",
      "orta": "Müzâkere",
      "fazla": "İnat"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi kendi fikri olduğu hâlde hiç söylemiyor: sol uca (Uysallık) yakın. Başka okumada fikrini zaten söylemiş, dinlemiş ve ortak karara gönülden uyuyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o ana kadar ne yaptığımıza bakar. Müzâkere; karşılıklı saygıyla fikrini paylaşmak, karşındakini dinlemek ve birlikte çözüm aramaktır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Müzâkere",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Uysallık",
      "orta": "Müzâkere",
      "fazla": "İnat"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Fikrini hiç söylememek neye benziyor?",
       "ad": "Uysallık",
       "soz": "Ben bir şey demeyeyim, peki.",
       "eylem": "yaslan",
       "zincir": [
        "Kimse onun ne istediğini bilemez.",
        "Karar hep başkalarının istediği gibi çıkar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben söylemesem de olur; nasılsa fark etmez.",
          "dogru": true,
          "not": "Uysallık, kendi fikrini hiç savunmamaktır. Fikir söylenmeyince grup da ondan yararlanamaz."
         },
         {
          "m": "Ben şöyle düşünüyorum; sizin fikriniz ne?",
          "dogru": false,
          "not": "Bu orta ucun sesi: müzâkerenin sesi."
         },
         {
          "m": "Benim dediğim olacak, başka yol yok!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: inadın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Uysallık",
        "soz": "Ben"
       },
       "zincirAnahtar": [
        "Kimse",
        "Karar"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Haksız olsa da diretmek neye benziyor?",
       "ad": "İnat",
       "soz": "Yok öyle, benim dediğim olacak!",
       "eylem": "hayir",
       "zincir": [
        "Arkadaşları konuşmaktan vazgeçer.",
        "Ortak bir çözüm bulunamaz, iş yarım kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Benim dediğim olacak, başka yol yok!",
          "dogru": true,
          "not": "İnat, haksız olsa da diretmektir. Dinlemeyen kişi doğruyu da kaçırır."
         },
         {
          "m": "Ben söylemesem de olur; nasılsa fark etmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: uysallığın sesi."
         },
         {
          "m": "Ben şöyle düşünüyorum; sizin fikriniz ne?",
          "dogru": false,
          "not": "Bu orta ucun sesi: müzâkerenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "İnat",
        "soz": "Yok"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Ortak"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Müzâkere",
       "soz": "Önce herkes söylesin, sonra karar verelim.",
       "eylem": "konus",
       "zincir": [
        "Herkesin fikri masaya gelir.",
        "Ortak bir yol bulunur ve herkes kendini duyulmuş hisseder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben şöyle düşünüyorum; sizin fikriniz ne?",
          "dogru": true,
          "not": "Müzâkere, karşılıklı saygıyla fikrini paylaşıp birlikte çözüm aramaktır."
         },
         {
          "m": "Ben söylemesem de olur; nasılsa fark etmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: uysallığın sesi."
         },
         {
          "m": "Benim dediğim olacak, başka yol yok!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: inadın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Müzâkere",
        "soz": "Önce"
       },
       "zincirAnahtar": [
        "Herkesin",
        "Ortak"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Müzâkere",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Uysallık",
      "orta": "Müzâkere",
      "fazla": "İnat"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "grup",
       "baslik": "Grup ödevi",
       "tetik": "Grup ödevinde konuyu seçmek gerekiyor. Sen başka bir konuyu daha çok istiyorsun.",
       "secenekler": [
        {
         "m": "Sizin seçtiğiniz olsun, ben bir şey demeyeyim.",
         "zon": "az",
         "sonuc": "Konu seçiliyor ama sen ödevde sıkılıyorsun; belki fikrin gruba yarayacaktı.",
         "not": "İbre sola kaydı: söylenmeyen fikir kimseye yarayamıyor.",
         "ses": "s1az"
        },
        {
         "m": "Benim seçtiğim konu olacak; başkasını kabul etmem!",
         "zon": "fazla",
         "sonuc": "Grup huzursuzlaşıyor; kimse seninle çalışmak istemiyor.",
         "not": "İbre sağa kaydı: dinlemeyen kişi ortak çözümü kaybediyor.",
         "ses": "s1fa"
        },
        {
         "m": "Ben bu konuyu öneriyorum; sizin önerileriniz neler?",
         "zon": "orta",
         "sonuc": "Herkes önerisini söylüyor ve ortak bir konu bulunuyor.",
         "not": "İbre ortada: fikrini söyledin ve başkalarını da dinledin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "oyun",
       "baslik": "Oyun kuralı",
       "tetik": "Teneffüste oynayacağınız oyunun kuralı konusunda arkadaşlarınla fikir ayrılığı var.",
       "secenekler": [
        {
         "m": "Siz nasıl istiyorsanız öyle olsun.",
         "zon": "az",
         "sonuc": "Oyun başlıyor ama sen kendini oyunun dışında hissediyorsun.",
         "not": "İbre sola kaydı: istediğini söylemeyince oyun sana göre olmuyor.",
         "ses": "s2az"
        },
        {
         "m": "Ya benim kuralımla oynarız ya da oynamayız!",
         "zon": "fazla",
         "sonuc": "Oyun hiç başlamıyor; teneffüs tartışmayla bitiyor.",
         "not": "İbre sağa kaydı: diretmek hem oyunu hem dostluğu bekletiyor.",
         "ses": "s2fa"
        },
        {
         "m": "Önce herkes kuralını söylesin; ortak bir kural yapalım.",
         "zon": "orta",
         "sonuc": "Kural birlikte belirleniyor ve oyun herkes için keyifli oluyor.",
         "not": "İbre ortada: konuşmak ve dinlemek birlikte çözüm buluyor.",
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
       "ad": "Az · Uysallık",
       "aciklama": "Fikrini hiç söylememek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Müzâkere",
       "aciklama": "Konuşmak, dinlemek, çözüm bulmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · İnat",
       "aciklama": "Haksız da olsa diretmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Herkes bir şey seçerken istediğini söylemeden “peki” der.",
       "alan": "az",
       "ipucu": "Fikrini söylemiyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı haklı olsa bile “yok öyle!” diye diretir.",
       "alan": "fazla",
       "ipucu": "Dinlemiyor."
      },
      {
       "id": "k3",
       "metin": "Fikrini söyler, arkadaşının fikrini de dinler.",
       "alan": "orta",
       "ipucu": "Konuşuyor ve dinliyor."
      },
      {
       "id": "k4",
       "metin": "Fikri sorulduğunda “fark etmez” deyip geçer.",
       "alan": "az",
       "ipucu": "Kendi payını görmüyor."
      },
      {
       "id": "k5",
       "metin": "Kendi dediği olmayınca oyundan çekilir.",
       "alan": "fazla",
       "ipucu": "Ortak çözümü kabul etmiyor."
      },
      {
       "id": "k6",
       "metin": "Herkesin işine yarayacak ortak bir yol arar.",
       "alan": "orta",
       "ipucu": "Ortak çözüm arıyor."
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
        "Grup çalışmasında",
        "Arkadaşlarımla bir şey seçerken",
        "Biri bana karşı çıkınca",
        "Bir oyunun kuralını konuşurken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Fikrimi söylemeden önce karşımdakini dinleyeceğim",
        "Fikrimi bir kez de olsa nazikçe söyleyeceğim",
        "Ortak bir çözüm önereceğim"
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
       "baslik": "Müzâkere",
       "metin": "konuşmak, dinlemek, çözüm bulmak",
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
   "sure": 1.968,
   "m": "Tamam, siz nasıl isterseniz.",
   "k": [
    [
     "Tamam,",
     0.03,
     0.525
    ],
    [
     "siz",
     0.62,
     0.803
    ],
    [
     "nasıl",
     0.803,
     1.168
    ],
    [
     "isterseniz.",
     1.168,
     1.898
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 9.817,
   "m": "Birçok güzel huy bir ibre gibidir. Müzâkere, fikrimi savunma payımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.445
    ],
    [
     "güzel",
     0.445,
     0.859
    ],
    [
     "huy",
     0.859,
     1.066
    ],
    [
     "bir",
     1.066,
     1.274
    ],
    [
     "ibre",
     1.274,
     1.688
    ],
    [
     "gibidir.",
     1.688,
     2.31
    ],
    [
     "Müzâkere,",
     2.595,
     3.465
    ],
    [
     "fikrimi",
     3.645,
     4.338
    ],
    [
     "savunma",
     4.338,
     5.03
    ],
    [
     "payımı",
     5.03,
     5.723
    ],
    [
     "ölçer.",
     5.723,
     6.185
    ],
    [
     "İbre",
     6.265,
     6.659
    ],
    [
     "üç",
     6.659,
     6.857
    ],
    [
     "yerde",
     6.857,
     7.251
    ],
    [
     "durabilir:",
     7.251,
     8.04
    ],
    [
     "az,",
     8.33,
     9.075
    ],
    [
     "kararında,",
     9.375,
     9.623
    ],
    [
     "fazla.",
     9.623,
     9.747
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
   "sure": 6.267,
   "m": "Sol uçta Uysallık. Ben bir şey demeyeyim, peki. Herkes bir şey seçerken istediğini söylemeden geçer.",
   "k": [
    [
     "Sol",
     0.03,
     0.25
    ],
    [
     "uçta",
     0.25,
     0.69
    ],
    [
     "Uysallık.",
     0.69,
     1.35
    ],
    [
     "Ben",
     1.44,
     1.444
    ],
    [
     "bir",
     1.444,
     1.447
    ],
    [
     "şey",
     1.447,
     1.451
    ],
    [
     "demeyeyim,",
     1.451,
     1.465
    ],
    [
     "peki.",
     2.085,
     3.08
    ],
    [
     "Herkes",
     3.545,
     3.84
    ],
    [
     "bir",
     3.84,
     3.987
    ],
    [
     "şey",
     3.987,
     4.134
    ],
    [
     "seçerken",
     4.134,
     4.576
    ],
    [
     "istediğini",
     4.576,
     5.313
    ],
    [
     "söylemeden",
     5.313,
     5.903
    ],
    [
     "geçer.",
     5.903,
     6.197
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.533,
   "m": "Sonra ne olur? Kimse onun ne istediğini bilemez. Karar hep başkalarının istediği gibi çıkar.",
   "k": [
    [
     "Sonra",
     0.03,
     0.272
    ],
    [
     "ne",
     0.272,
     0.393
    ],
    [
     "olur?",
     0.393,
     0.635
    ],
    [
     "Kimse",
     0.855,
     1.172
    ],
    [
     "onun",
     1.172,
     1.489
    ],
    [
     "ne",
     1.489,
     1.647
    ],
    [
     "istediğini",
     1.647,
     2.44
    ],
    [
     "bilemez.",
     2.44,
     2.915
    ],
    [
     "Karar",
     3.045,
     3.347
    ],
    [
     "hep",
     3.347,
     3.498
    ],
    [
     "başkalarının",
     3.498,
     4.254
    ],
    [
     "istediği",
     4.254,
     4.859
    ],
    [
     "gibi",
     4.859,
     5.161
    ],
    [
     "çıkar.",
     5.161,
     5.463
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
   "sure": 6.19,
   "m": "Sağ uçta İnat. Yok öyle, benim dediğim olacak! Arkadaşı haklı olduğunu gösterse de dinlemez.",
   "k": [
    [
     "Sağ",
     0.03,
     0.199
    ],
    [
     "uçta",
     0.199,
     0.537
    ],
    [
     "İnat.",
     0.537,
     0.875
    ],
    [
     "Yok",
     0.955,
     0.993
    ],
    [
     "öyle,",
     0.993,
     1.07
    ],
    [
     "benim",
     1.44,
     1.904
    ],
    [
     "dediğim",
     1.904,
     2.599
    ],
    [
     "olacak!",
     2.599,
     3.295
    ],
    [
     "Arkadaşı",
     3.605,
     4.197
    ],
    [
     "haklı",
     4.197,
     4.493
    ],
    [
     "olduğunu",
     4.493,
     5.085
    ],
    [
     "gösterse",
     5.085,
     5.528
    ],
    [
     "de",
     5.528,
     5.676
    ],
    [
     "dinlemez.",
     5.676,
     6.12
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.517,
   "m": "Sonra ne olur? Arkadaşları konuşmaktan vazgeçer. Ortak bir çözüm bulunamaz, iş yarım kalır.",
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
     "Arkadaşları",
     1.255,
     1.961
    ],
    [
     "konuşmaktan",
     1.961,
     2.526
    ],
    [
     "vazgeçer.",
     2.526,
     2.95
    ],
    [
     "Ortak",
     3.26,
     3.553
    ],
    [
     "bir",
     3.553,
     3.7
    ],
    [
     "çözüm",
     3.7,
     3.993
    ],
    [
     "bulunamaz,",
     3.993,
     4.58
    ],
    [
     "iş",
     4.685,
     4.837
    ],
    [
     "yarım",
     4.837,
     5.142
    ],
    [
     "kalır.",
     5.142,
     5.447
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
   "sure": 8.268,
   "m": "Tam kararında Müzâkere. Önce herkes söylesin, sonra karar verelim. Oturup konuşur, herkesin işine yarayacak bir yol arar.",
   "k": [
    [
     "Tam",
     0.03,
     0.229
    ],
    [
     "kararında",
     0.229,
     1.024
    ],
    [
     "Müzâkere.",
     1.024,
     1.82
    ],
    [
     "Önce",
     2.59,
     2.959
    ],
    [
     "herkes",
     2.959,
     3.327
    ],
    [
     "söylesin,",
     3.327,
     3.88
    ],
    [
     "sonra",
     4.005,
     4.294
    ],
    [
     "karar",
     4.294,
     4.582
    ],
    [
     "verelim.",
     4.582,
     5.015
    ],
    [
     "Oturup",
     5.575,
     5.578
    ],
    [
     "konuşur,",
     5.578,
     5.58
    ],
    [
     "herkesin",
     5.65,
     6.196
    ],
    [
     "işine",
     6.196,
     6.742
    ],
    [
     "yarayacak",
     6.742,
     7.47
    ],
    [
     "bir",
     7.47,
     7.652
    ],
    [
     "yol",
     7.652,
     7.834
    ],
    [
     "arar.",
     7.834,
     8.198
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 7.396,
   "m": "Sonra ne olur? Herkesin fikri masaya gelir. Ortak bir yol bulunur ve herkes kendini duyulmuş hisseder.",
   "k": [
    [
     "Sonra",
     0.03,
     0.426
    ],
    [
     "ne",
     0.426,
     0.624
    ],
    [
     "olur?",
     0.624,
     1.02
    ],
    [
     "Herkesin",
     1.14,
     1.629
    ],
    [
     "fikri",
     1.629,
     1.955
    ],
    [
     "masaya",
     1.955,
     2.444
    ],
    [
     "gelir.",
     2.444,
     2.77
    ],
    [
     "Ortak",
     3.105,
     3.549
    ],
    [
     "bir",
     3.549,
     3.772
    ],
    [
     "yol",
     3.772,
     3.994
    ],
    [
     "bulunur",
     3.994,
     4.66
    ],
    [
     "ve",
     4.66,
     4.882
    ],
    [
     "herkes",
     4.882,
     5.327
    ],
    [
     "kendini",
     5.327,
     5.993
    ],
    [
     "duyulmuş",
     5.993,
     6.66
    ],
    [
     "hisseder.",
     6.66,
     7.326
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
   "sure": 5.127,
   "m": "Grup ödevinde konuyu seçmek gerekiyor. Sen başka bir konuyu daha çok istiyorsun. Ne yaparsın?",
   "k": [
    [
     "Grup",
     0.03,
     0.164
    ],
    [
     "ödevinde",
     0.164,
     0.698
    ],
    [
     "konuyu",
     0.698,
     1.099
    ],
    [
     "seçmek",
     1.099,
     1.366
    ],
    [
     "gerekiyor.",
     1.366,
     1.9
    ],
    [
     "Sen",
     2.13,
     2.273
    ],
    [
     "başka",
     2.273,
     2.559
    ],
    [
     "bir",
     2.559,
     2.701
    ],
    [
     "konuyu",
     2.701,
     3.13
    ],
    [
     "daha",
     3.13,
     3.416
    ],
    [
     "çok",
     3.416,
     3.559
    ],
    [
     "istiyorsun.",
     3.559,
     4.13
    ],
    [
     "Ne",
     4.495,
     4.635
    ],
    [
     "yaparsın?",
     4.635,
     5.057
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.625,
   "m": "Konu seçiliyor ama sen ödevde sıkılıyorsun; belki fikrin gruba yarayacaktı.",
   "k": [
    [
     "Konu",
     0.03,
     0.332
    ],
    [
     "seçiliyor",
     0.332,
     0.937
    ],
    [
     "ama",
     0.937,
     1.239
    ],
    [
     "sen",
     1.239,
     1.391
    ],
    [
     "ödevde",
     1.391,
     1.844
    ],
    [
     "sıkılıyorsun;",
     1.844,
     2.6
    ],
    [
     "belki",
     2.82,
     3.135
    ],
    [
     "fikrin",
     3.135,
     3.451
    ],
    [
     "gruba",
     3.451,
     3.766
    ],
    [
     "yarayacaktı.",
     3.766,
     4.555
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.287,
   "m": "Grup huzursuzlaşıyor; kimse seninle çalışmak istemiyor.",
   "k": [
    [
     "Grup",
     0.03,
     0.187
    ],
    [
     "huzursuzlaşıyor;",
     0.187,
     1.13
    ],
    [
     "kimse",
     1.505,
     1.79
    ],
    [
     "seninle",
     1.79,
     2.218
    ],
    [
     "çalışmak",
     2.218,
     2.646
    ],
    [
     "istemiyor.",
     2.646,
     3.217
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 2.928,
   "m": "Herkes önerisini söylüyor ve ortak bir konu bulunuyor.",
   "k": [
    [
     "Herkes",
     0.03,
     0.313
    ],
    [
     "önerisini",
     0.313,
     1.02
    ],
    [
     "söylüyor",
     1.02,
     1.444
    ],
    [
     "ve",
     1.444,
     1.585
    ],
    [
     "ortak",
     1.585,
     1.868
    ],
    [
     "bir",
     1.868,
     2.01
    ],
    [
     "konu",
     2.01,
     2.292
    ],
    [
     "bulunuyor.",
     2.292,
     2.858
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.753,
   "m": "Teneffüste oynayacağınız oyunun kuralı konusunda arkadaşlarınla fikir ayrılığı var. Ne yaparsın?",
   "k": [
    [
     "Teneffüste",
     0.03,
     0.495
    ],
    [
     "oynayacağınız",
     0.495,
     1.194
    ],
    [
     "oyunun",
     1.194,
     1.543
    ],
    [
     "kuralı",
     1.543,
     1.892
    ],
    [
     "konusunda",
     1.892,
     2.357
    ],
    [
     "arkadaşlarınla",
     2.357,
     3.055
    ],
    [
     "fikir",
     3.055,
     3.288
    ],
    [
     "ayrılığı",
     3.288,
     3.754
    ],
    [
     "var.",
     3.754,
     3.87
    ],
    [
     "Ne",
     4.17,
     4.298
    ],
    [
     "yaparsın?",
     4.298,
     4.683
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.654,
   "m": "Oyun başlıyor ama sen kendini oyunun dışında hissediyorsun.",
   "k": [
    [
     "Oyun",
     0.03,
     0.444
    ],
    [
     "başlıyor",
     0.444,
     1.065
    ],
    [
     "ama",
     1.065,
     1.479
    ],
    [
     "sen",
     1.479,
     1.686
    ],
    [
     "kendini",
     1.686,
     2.307
    ],
    [
     "oyunun",
     2.307,
     2.928
    ],
    [
     "dışında",
     2.928,
     3.549
    ],
    [
     "hissediyorsun.",
     3.549,
     4.584
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.646,
   "m": "Oyun hiç başlamıyor; teneffüs tartışmayla bitiyor.",
   "k": [
    [
     "Oyun",
     0.03,
     0.456
    ],
    [
     "hiç",
     0.456,
     0.669
    ],
    [
     "başlamıyor;",
     0.669,
     1.52
    ],
    [
     "teneffüs",
     1.895,
     2.399
    ],
    [
     "tartışmayla",
     2.399,
     3.072
    ],
    [
     "bitiyor.",
     3.072,
     3.576
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.016,
   "m": "Kural birlikte belirleniyor ve oyun herkes için keyifli oluyor.",
   "k": [
    [
     "Kural",
     0.03,
     0.37
    ],
    [
     "birlikte",
     0.37,
     0.881
    ],
    [
     "belirleniyor",
     0.881,
     1.732
    ],
    [
     "ve",
     1.732,
     1.903
    ],
    [
     "oyun",
     1.903,
     2.243
    ],
    [
     "herkes",
     2.243,
     2.584
    ],
    [
     "için",
     2.584,
     2.924
    ],
    [
     "keyifli",
     2.924,
     3.435
    ],
    [
     "oluyor.",
     3.435,
     3.946
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
   "sure": 9.739,
   "m": "Bu cümle bilerek çift anlamlı. Fikrini hiç söylemeyen biri diyorsa sol uca yakın. Fikrini söyleyip dinledikten sonra ortak karara uyan biri diyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.188
    ],
    [
     "cümle",
     0.188,
     0.502
    ],
    [
     "bilerek",
     0.502,
     0.975
    ],
    [
     "çift",
     0.975,
     1.132
    ],
    [
     "anlamlı.",
     1.132,
     1.605
    ],
    [
     "Fikrini",
     1.87,
     2.376
    ],
    [
     "hiç",
     2.376,
     2.544
    ],
    [
     "söylemeyen",
     2.544,
     3.219
    ],
    [
     "biri",
     3.219,
     3.556
    ],
    [
     "diyorsa",
     3.556,
     4.062
    ],
    [
     "sol",
     4.062,
     4.231
    ],
    [
     "uca",
     4.231,
     4.568
    ],
    [
     "yakın.",
     4.568,
     4.905
    ],
    [
     "Fikrini",
     5.14,
     5.593
    ],
    [
     "söyleyip",
     5.593,
     6.046
    ],
    [
     "dinledikten",
     6.046,
     6.65
    ],
    [
     "sonra",
     6.65,
     6.952
    ],
    [
     "ortak",
     6.952,
     7.254
    ],
    [
     "karara",
     7.254,
     7.707
    ],
    [
     "uyan",
     7.707,
     8.008
    ],
    [
     "biri",
     8.008,
     8.31
    ],
    [
     "diyorsa",
     8.31,
     8.763
    ],
    [
     "orta",
     8.763,
     9.065
    ],
    [
     "uca",
     9.065,
     9.367
    ],
    [
     "yakın.",
     9.367,
     9.669
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
