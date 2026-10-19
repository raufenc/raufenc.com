/* İbremetre · Islâh — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Pasiflik · Islâh · Fitne). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-islah",
 "ad": "Islâh: İbren Nerede?",
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
     "huy": "Islâh",
     "huyAnahtar": "Islâh",
     "olculen": "Bozulan bir durum karşısındaki payım",
     "kanca": "Bunu herkes bilmeli, anlatacağım!",
     "uclar": {
      "az": "Pasiflik",
      "orta": "Islâh",
      "fazla": "Fitne"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Islâh",
     "cumle": "Bunu herkes bilmeli, anlatacağım!",
     "uclar": {
      "az": "Pasiflik",
      "orta": "Islâh",
      "fazla": "Fitne"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi duyduğu şeyi yayıp ortamı bozuyor: sağ uca (Fitne) yakın. Başka okumada sorunu doğru kişilere duyurup düzeltmeye çalışıyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, niyete ve ne yaptığımıza bakar. Islâh; bozulan bir durumu düzeltip iyiye çevirmeye çalışmaktır. Bu ibre ölçekten çok yönü gösterir: bir uçta hiçbir şey yapmamak, öbür uçta ortamı karıştırmak vardır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Islâh",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Pasiflik",
      "orta": "Islâh",
      "fazla": "Fitne"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Sorunu görüp kıpırdamamak neye benziyor?",
       "ad": "Pasiflik",
       "soz": "Bana ne, ben karışmam.",
       "eylem": "yaslan",
       "zincir": [
        "Tartışma büyür ve arkadaşlar küser.",
        "Çözüm için atılabilecek küçük adım da kaçar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bana ne, kendileri halleder.",
          "dogru": true,
          "not": "Pasiflik, sorunu görüp harekete geçmemektir. Küçük bir adım bile durumu değiştirebilir."
         },
         {
          "m": "Önce sakin olup sorunu çözmeye bakayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ıslâhın sesi."
         },
         {
          "m": "Duyduğumu abartıp anlatayım, kızışsınlar.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: fitnenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Pasiflik",
        "soz": "Bana"
       },
       "zincirAnahtar": [
        "Tartışma",
        "Çözüm"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Ortamı bozmak neye benziyor?",
       "ad": "Fitne",
       "soz": "Duydun mu, o senin için ne demiş!",
       "eylem": "isaret",
       "zincir": [
        "İki arkadaşın arası açılır.",
        "Öfke büyür ve bütün grup huzursuz olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Duyduğumu abartıp anlatayım, kızışsınlar.",
          "dogru": true,
          "not": "Fitne, dedikodu ve kışkırtmayla ortamı bozmaktır. Ortam bozulunca herkes üzülür."
         },
         {
          "m": "Bana ne, kendileri halleder.",
          "dogru": false,
          "not": "Bu sol ucun sesi: pasifliğin sesi."
         },
         {
          "m": "Önce sakin olup sorunu çözmeye bakayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ıslâhın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Fitne",
        "soz": "Duydun"
       },
       "zincirAnahtar": [
        "İki",
        "Öfke"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Islâh",
       "soz": "Gelin, aranızı birlikte düzeltelim.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşlar yeniden konuşur.",
        "Kırgınlık yerini anlayışa bırakır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Önce sakin olup sorunu çözmeye bakayım.",
          "dogru": true,
          "not": "Islâh, bozulan bir durumu düzeltip iyiye çevirmeye çalışmaktır."
         },
         {
          "m": "Bana ne, kendileri halleder.",
          "dogru": false,
          "not": "Bu sol ucun sesi: pasifliğin sesi."
         },
         {
          "m": "Duyduğumu abartıp anlatayım, kızışsınlar.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: fitnenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Islâh",
        "soz": "Gelin,"
       },
       "zincirAnahtar": [
        "Arkadaşlar",
        "Kırgınlık"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Islâh",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Pasiflik",
      "orta": "Islâh",
      "fazla": "Fitne"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "kusme",
       "baslik": "Küsen arkadaşlar",
       "tetik": "İki arkadaşın teneffüste tartıştı ve birbirine küstü. İkisiyle de arkadaşsın.",
       "secenekler": [
        {
         "m": "Bana ne, ben karışmam.",
         "zon": "az",
         "sonuc": "Küslük günlerce sürüyor; ikisi de yalnız kalıyor.",
         "not": "İbre sola kaydı: görüp geçmek, küslüğün büyümesine izin veriyor.",
         "ses": "s1az"
        },
        {
         "m": "Birinin ötekine ne dediğini diğerine anlatırım.",
         "zon": "fazla",
         "sonuc": "İkisi de birbirine daha çok kızıyor; sen de güvenini kaybediyorsun.",
         "not": "İbre sağa kaydı: laf taşımak ortamı daha da bozuyor.",
         "ses": "s1fa"
        },
        {
         "m": "İkisiyle de konuşur, barışmaları için yardım ederim.",
         "zon": "orta",
         "sonuc": "İkisi de dinleniyor ve barışmak için konuşmaya hazırlanıyor.",
         "not": "İbre ortada: iki tarafı dinleyip barışa yardım ettin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "soz",
       "baslik": "Dolaşan söz",
       "tetik": "Sınıfta bir arkadaşın hakkında yanlış bir söz dolaşıyor ve bazıları buna inanıyor.",
       "secenekler": [
        {
         "m": "Ben bir şey demeyeyim; belki kendiliğinden geçer.",
         "zon": "az",
         "sonuc": "Söz yayılmaya devam ediyor; arkadaşın kendini savunamıyor.",
         "not": "İbre sola kaydı: yanlışı görüp sessiz kalmak, yanlışın büyümesine izin veriyor.",
         "ses": "s2az"
        },
        {
         "m": "Ben de duyduklarımı herkese anlatayım, eğlenceli olur.",
         "zon": "fazla",
         "sonuc": "Söz büyüyor; arkadaşın duyunca incinip sınıftan uzaklaşıyor.",
         "not": "İbre sağa kaydı: söze söz eklemek ortamı daha da bozuyor.",
         "ses": "s2fa"
        },
        {
         "m": "Yanlış sözü yaymam; durumu öğretmene anlatırım.",
         "zon": "orta",
         "sonuc": "Yanlış anlaşılma düzeliyor; arkadaşın yalnız olmadığını hissediyor.",
         "not": "İbre ortada: doğru kişiye başvurup durumu düzeltmeye çalıştın.",
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
       "ad": "Az · Pasiflik",
       "aciklama": "Görüp harekete geçmemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Islâh",
       "aciklama": "Bozulanı düzeltmeye çalışmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Fitne",
       "aciklama": "Dedikoduyla ortamı bozmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşlarının kavga ettiğini görür, “bana ne” diyerek uzaklaşır.",
       "alan": "az",
       "ipucu": "Düzeltmek için bir adım atmıyor."
      },
      {
       "id": "k2",
       "metin": "Duyduğu sözü abartarak başka bir arkadaşına taşır.",
       "alan": "fazla",
       "ipucu": "Ortamı bozuyor."
      },
      {
       "id": "k3",
       "metin": "Küsen iki arkadaşı konuşmaya davet eder.",
       "alan": "orta",
       "ipucu": "Barışmaya yardım ediyor."
      },
      {
       "id": "k4",
       "metin": "Sınıfta yanlış giden bir şeyi fark eder ama hiç haber vermez.",
       "alan": "az",
       "ipucu": "Sorunu görüp kıpırdamıyor."
      },
      {
       "id": "k5",
       "metin": "İki arkadaşın arasını kızıştırmak için “sana şöyle demiş” der.",
       "alan": "fazla",
       "ipucu": "Kışkırtıyor."
      },
      {
       "id": "k6",
       "metin": "Bozulan bir şeyi fark eder; düzeltir ya da bir büyüğüne haber verir.",
       "alan": "orta",
       "ipucu": "Bozulanı düzeltmeye çalışıyor."
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
        "İki arkadaşım tartışınca",
        "Sınıfta dedikodu başlayınca",
        "Bozulan bir şey görünce",
        "Biri bana kötü bir söz taşıyınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Duyduğum sözü taşımayacağım",
        "İki tarafı da sakince dinleyeceğim",
        "Çözemezsem güvendiğim bir yetişkine anlatacağım"
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
       "baslik": "Islâh",
       "metin": "bozulanı düzeltmek",
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
   "sure": 3.267,
   "m": "Bunu herkes bilmeli, anlatacağım!",
   "k": [
    [
     "Bunu",
     0.03,
     0.487
    ],
    [
     "herkes",
     0.487,
     0.944
    ],
    [
     "bilmeli,",
     0.944,
     1.63
    ],
    [
     "anlatacağım!",
     2.13,
     3.197
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.636,
   "m": "Birçok güzel huy bir ibre gibidir. Islâh, bozulan bir durumda ne yaptığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.524
    ],
    [
     "güzel",
     0.524,
     1.017
    ],
    [
     "huy",
     1.017,
     1.264
    ],
    [
     "bir",
     1.264,
     1.511
    ],
    [
     "ibre",
     1.511,
     2.005
    ],
    [
     "gibidir.",
     2.005,
     2.745
    ],
    [
     "Islâh,",
     3.345,
     3.85
    ],
    [
     "bozulan",
     4.175,
     4.796
    ],
    [
     "bir",
     4.796,
     5.004
    ],
    [
     "durumda",
     5.004,
     5.625
    ],
    [
     "ne",
     5.625,
     5.832
    ],
    [
     "yaptığımı",
     5.832,
     6.661
    ],
    [
     "ölçer.",
     6.661,
     7.075
    ],
    [
     "İbre",
     7.225,
     7.787
    ],
    [
     "üç",
     7.787,
     8.068
    ],
    [
     "yerde",
     8.068,
     8.631
    ],
    [
     "durabilir:",
     8.631,
     9.755
    ],
    [
     "az,",
     10.13,
     10.268
    ],
    [
     "kararında,",
     10.268,
     10.82
    ],
    [
     "fazla.",
     11.225,
     11.566
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
   "sure": 6.995,
   "m": "Sol uçta Pasiflik. Bana ne, ben karışmam. Arkadaşlarının tartıştığını görür ama yerinden kalkmaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.249
    ],
    [
     "uçta",
     0.249,
     0.688
    ],
    [
     "Pasiflik.",
     0.688,
     1.345
    ],
    [
     "Bana",
     1.445,
     1.488
    ],
    [
     "ne,",
     1.488,
     1.51
    ],
    [
     "ben",
     2.055,
     2.146
    ],
    [
     "karışmam.",
     2.146,
     2.42
    ],
    [
     "Arkadaşlarının",
     2.605,
     3.901
    ],
    [
     "tartıştığını",
     3.901,
     4.981
    ],
    [
     "görür",
     4.981,
     5.413
    ],
    [
     "ama",
     5.413,
     5.845
    ],
    [
     "yerinden",
     5.845,
     6.493
    ],
    [
     "kalkmaz.",
     6.493,
     6.925
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.522,
   "m": "Sonra ne olur? Tartışma büyür ve arkadaşlar küser. Çözüm için atılabilecek küçük adım da kaçar.",
   "k": [
    [
     "Sonra",
     0.03,
     0.284
    ],
    [
     "ne",
     0.284,
     0.411
    ],
    [
     "olur?",
     0.411,
     0.665
    ],
    [
     "Tartışma",
     1.195,
     1.765
    ],
    [
     "büyür",
     1.765,
     2.145
    ],
    [
     "ve",
     2.145,
     2.335
    ],
    [
     "arkadaşlar",
     2.335,
     3.095
    ],
    [
     "küser.",
     3.095,
     3.475
    ],
    [
     "Çözüm",
     3.905,
     4.205
    ],
    [
     "için",
     4.205,
     4.504
    ],
    [
     "atılabilecek",
     4.504,
     5.403
    ],
    [
     "küçük",
     5.403,
     5.703
    ],
    [
     "adım",
     5.703,
     6.002
    ],
    [
     "da",
     6.002,
     6.152
    ],
    [
     "kaçar.",
     6.152,
     6.452
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
   "sure": 7.348,
   "m": "Sağ uçta Fitne. Duydun mu, o senin için ne demiş! Duyduğunu abartarak arkadaşlar arasında taşır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.202
    ],
    [
     "uçta",
     0.202,
     0.546
    ],
    [
     "Fitne.",
     0.546,
     0.89
    ],
    [
     "Duydun",
     0.99,
     1.16
    ],
    [
     "mu,",
     1.16,
     1.245
    ],
    [
     "o",
     1.825,
     1.924
    ],
    [
     "senin",
     1.924,
     2.123
    ],
    [
     "için",
     2.123,
     2.322
    ],
    [
     "ne",
     2.322,
     2.421
    ],
    [
     "demiş!",
     2.421,
     2.62
    ],
    [
     "Duyduğunu",
     2.705,
     3.721
    ],
    [
     "abartarak",
     3.721,
     4.737
    ],
    [
     "arkadaşlar",
     4.737,
     5.754
    ],
    [
     "arasında",
     5.754,
     6.77
    ],
    [
     "taşır.",
     6.77,
     7.278
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.811,
   "m": "Sonra ne olur? İki arkadaşın arası açılır. Öfke büyür ve bütün grup huzursuz olur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.27
    ],
    [
     "ne",
     0.27,
     0.39
    ],
    [
     "olur?",
     0.39,
     0.63
    ],
    [
     "İki",
     1.185,
     1.44
    ],
    [
     "arkadaşın",
     1.44,
     1.95
    ],
    [
     "arası",
     1.95,
     2.332
    ],
    [
     "açılır.",
     2.332,
     2.715
    ],
    [
     "Öfke",
     3.11,
     3.515
    ],
    [
     "büyür",
     3.515,
     3.92
    ],
    [
     "ve",
     3.92,
     4.122
    ],
    [
     "bütün",
     4.122,
     4.527
    ],
    [
     "grup",
     4.527,
     4.729
    ],
    [
     "huzursuz",
     4.729,
     5.336
    ],
    [
     "olur.",
     5.336,
     5.741
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
   "sure": 9.31,
   "m": "Tam kararında Islâh. Gelin, aranızı birlikte düzeltelim. Araya girer, iki tarafı da dinler ve barışmaları için yol arar.",
   "k": [
    [
     "Tam",
     0.03,
     0.256
    ],
    [
     "kararında",
     0.256,
     1.162
    ],
    [
     "Islâh.",
     1.162,
     1.615
    ],
    [
     "Gelin,",
     2.355,
     2.686
    ],
    [
     "aranızı",
     2.686,
     3.347
    ],
    [
     "birlikte",
     3.347,
     3.843
    ],
    [
     "düzeltelim.",
     3.843,
     4.505
    ],
    [
     "Araya",
     5.28,
     5.748
    ],
    [
     "girer,",
     5.748,
     6.06
    ],
    [
     "iki",
     6.22,
     6.538
    ],
    [
     "tarafı",
     6.538,
     7.015
    ],
    [
     "da",
     7.015,
     7.174
    ],
    [
     "dinler",
     7.174,
     7.492
    ],
    [
     "ve",
     7.492,
     7.651
    ],
    [
     "barışmaları",
     7.651,
     8.445
    ],
    [
     "için",
     8.445,
     8.763
    ],
    [
     "yol",
     8.763,
     8.922
    ],
    [
     "arar.",
     8.922,
     9.24
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.381,
   "m": "Sonra ne olur? Arkadaşlar yeniden konuşur. Kırgınlık yerini anlayışa bırakır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.324
    ],
    [
     "ne",
     0.324,
     0.471
    ],
    [
     "olur?",
     0.471,
     0.765
    ],
    [
     "Arkadaşlar",
     1.275,
     1.891
    ],
    [
     "yeniden",
     1.891,
     2.353
    ],
    [
     "konuşur.",
     2.353,
     2.815
    ],
    [
     "Kırgınlık",
     3.005,
     3.537
    ],
    [
     "yerini",
     3.537,
     4.069
    ],
    [
     "anlayışa",
     4.069,
     4.779
    ],
    [
     "bırakır.",
     4.779,
     5.311
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
   "sure": 5.012,
   "m": "İki arkadaşın teneffüste tartıştı ve birbirine küstü. İkisiyle de arkadaşsın. Ne yaparsın?",
   "k": [
    [
     "İki",
     0.03,
     0.311
    ],
    [
     "arkadaşın",
     0.311,
     0.875
    ],
    [
     "teneffüste",
     0.875,
     1.438
    ],
    [
     "tartıştı",
     1.438,
     1.86
    ],
    [
     "ve",
     1.86,
     2.001
    ],
    [
     "birbirine",
     2.001,
     2.564
    ],
    [
     "küstü.",
     2.564,
     2.845
    ],
    [
     "İkisiyle",
     3.105,
     3.587
    ],
    [
     "de",
     3.587,
     3.708
    ],
    [
     "arkadaşsın.",
     3.708,
     4.19
    ],
    [
     "Ne",
     4.39,
     4.528
    ],
    [
     "yaparsın?",
     4.528,
     4.942
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 2.882,
   "m": "Küslük günlerce sürüyor; ikisi de yalnız kalıyor.",
   "k": [
    [
     "Küslük",
     0.03,
     0.376
    ],
    [
     "günlerce",
     0.376,
     0.896
    ],
    [
     "sürüyor;",
     0.896,
     1.415
    ],
    [
     "ikisi",
     1.815,
     2.147
    ],
    [
     "de",
     2.147,
     2.258
    ],
    [
     "yalnız",
     2.258,
     2.48
    ],
    [
     "kalıyor.",
     2.48,
     2.812
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.775,
   "m": "İkisi de birbirine daha çok kızıyor; sen de güvenini kaybediyorsun.",
   "k": [
    [
     "İkisi",
     0.03,
     0.421
    ],
    [
     "de",
     0.421,
     0.551
    ],
    [
     "birbirine",
     0.551,
     1.073
    ],
    [
     "daha",
     1.073,
     1.334
    ],
    [
     "çok",
     1.334,
     1.464
    ],
    [
     "kızıyor;",
     1.464,
     1.855
    ],
    [
     "sen",
     2.065,
     2.214
    ],
    [
     "de",
     2.214,
     2.363
    ],
    [
     "güvenini",
     2.363,
     2.96
    ],
    [
     "kaybediyorsun.",
     2.96,
     3.705
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 4.054,
   "m": "İkisi de dinleniyor ve barışmak için konuşmaya hazırlanıyor.",
   "k": [
    [
     "İkisi",
     0.03,
     0.546
    ],
    [
     "de",
     0.546,
     0.718
    ],
    [
     "dinleniyor",
     0.718,
     1.405
    ],
    [
     "ve",
     1.405,
     1.577
    ],
    [
     "barışmak",
     1.577,
     2.093
    ],
    [
     "için",
     2.093,
     2.437
    ],
    [
     "konuşmaya",
     2.437,
     3.125
    ],
    [
     "hazırlanıyor.",
     3.125,
     3.984
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.771,
   "m": "Sınıfta bir arkadaşın hakkında yanlış bir söz dolaşıyor ve bazıları buna inanıyor. Ne yaparsın?",
   "k": [
    [
     "Sınıfta",
     0.03,
     0.421
    ],
    [
     "bir",
     0.421,
     0.551
    ],
    [
     "arkadaşın",
     0.551,
     1.073
    ],
    [
     "hakkında",
     1.073,
     1.464
    ],
    [
     "yanlış",
     1.464,
     1.724
    ],
    [
     "bir",
     1.724,
     1.855
    ],
    [
     "söz",
     1.855,
     1.985
    ],
    [
     "dolaşıyor",
     1.985,
     2.506
    ],
    [
     "ve",
     2.506,
     2.637
    ],
    [
     "bazıları",
     2.637,
     3.158
    ],
    [
     "buna",
     3.158,
     3.419
    ],
    [
     "inanıyor.",
     3.419,
     3.94
    ],
    [
     "Ne",
     4.135,
     4.277
    ],
    [
     "yaparsın?",
     4.277,
     4.701
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.199,
   "m": "Söz yayılmaya devam ediyor; arkadaşın kendini savunamıyor.",
   "k": [
    [
     "Söz",
     0.03,
     0.167
    ],
    [
     "yayılmaya",
     0.167,
     0.715
    ],
    [
     "devam",
     0.715,
     0.989
    ],
    [
     "ediyor;",
     0.989,
     1.4
    ],
    [
     "arkadaşın",
     1.675,
     2.16
    ],
    [
     "kendini",
     2.16,
     2.523
    ],
    [
     "savunamıyor.",
     2.523,
     3.129
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.577,
   "m": "Söz büyüyor; arkadaşın duyunca incinip sınıftan uzaklaşıyor.",
   "k": [
    [
     "Söz",
     0.03,
     0.211
    ],
    [
     "büyüyor;",
     0.211,
     0.755
    ],
    [
     "arkadaşın",
     1.085,
     1.623
    ],
    [
     "duyunca",
     1.623,
     2.027
    ],
    [
     "incinip",
     2.027,
     2.43
    ],
    [
     "sınıftan",
     2.43,
     2.834
    ],
    [
     "uzaklaşıyor.",
     2.834,
     3.507
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.613,
   "m": "Yanlış anlaşılma düzeliyor; arkadaşın yalnız olmadığını hissediyor.",
   "k": [
    [
     "Yanlış",
     0.03,
     0.256
    ],
    [
     "anlaşılma",
     0.256,
     0.708
    ],
    [
     "düzeliyor;",
     0.708,
     1.16
    ],
    [
     "arkadaşın",
     1.625,
     2.136
    ],
    [
     "yalnız",
     2.136,
     2.392
    ],
    [
     "olmadığını",
     2.392,
     3.031
    ],
    [
     "hissediyor.",
     3.031,
     3.543
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
   "sure": 10.758,
   "m": "Bu cümle bilerek çift anlamlı. Duyduğunu herkese yayıp ortamı bozan biri söylüyorsa sağ uca yakın. Sorunu doğru kişilere duyurup düzeltmek isteyen biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.199
    ],
    [
     "cümle",
     0.199,
     0.537
    ],
    [
     "bilerek",
     0.537,
     1.044
    ],
    [
     "çift",
     1.044,
     1.213
    ],
    [
     "anlamlı.",
     1.213,
     1.72
    ],
    [
     "Duyduğunu",
     2.085,
     2.721
    ],
    [
     "herkese",
     2.721,
     3.198
    ],
    [
     "yayıp",
     3.198,
     3.516
    ],
    [
     "ortamı",
     3.516,
     3.993
    ],
    [
     "bozan",
     3.993,
     4.311
    ],
    [
     "biri",
     4.311,
     4.629
    ],
    [
     "söylüyorsa",
     4.629,
     5.265
    ],
    [
     "sağ",
     5.265,
     5.424
    ],
    [
     "uca",
     5.424,
     5.742
    ],
    [
     "yakın.",
     5.742,
     6.06
    ],
    [
     "Sorunu",
     6.385,
     6.815
    ],
    [
     "doğru",
     6.815,
     7.102
    ],
    [
     "kişilere",
     7.102,
     7.676
    ],
    [
     "duyurup",
     7.676,
     8.106
    ],
    [
     "düzeltmek",
     8.106,
     8.537
    ],
    [
     "isteyen",
     8.537,
     8.967
    ],
    [
     "biri",
     8.967,
     9.254
    ],
    [
     "söylüyorsa",
     9.254,
     9.827
    ],
    [
     "orta",
     9.827,
     10.114
    ],
    [
     "uca",
     10.114,
     10.401
    ],
    [
     "yakın.",
     10.401,
     10.688
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
