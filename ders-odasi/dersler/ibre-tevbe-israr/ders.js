/* İbremetre · Tevbe — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Hatada Israr · Tevbe · Vesvese). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevbe-israr",
 "ad": "Tevbe (Hatada Israr · Vesvese): İbren Nerede?",
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
     "huy": "Tevbe",
     "huyAnahtar": "Tevbe",
     "olculen": "Tekrarlanan hatadan dönme biçimim",
     "kanca": "Bir daha yapmayacağım, söz veriyorum.",
     "uclar": {
      "az": "Hatada Israr",
      "orta": "Tevbe",
      "fazla": "Vesvese"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tevbe",
     "cumle": "Bir daha yapmayacağım, söz veriyorum.",
     "uclar": {
      "az": "Hatada Israr",
      "orta": "Tevbe",
      "fazla": "Vesvese"
     },
     "yesil": 0.26,
     "hedefZon": "orta",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi hatasını gerçekten anlamış ve değişmeye karar vermiş: orta uca yakın. Başka okumada aynı sözü her seferinde söyleyip yine aynı hatayı yapıyor: sol uca (Hatada Israr) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, hatadan sonra ne yaptığımıza bakar. Tevbe; hatayı fark edip pişman olmak, özür dilemek ve Allahü teâlâ’ya yönelerek doğruya dönmektir. Tekrar düşsen de yeniden denemek ve tevbe etmek hep mümkündür. Sol uç, yanlış olduğunu bile bile aynı şeyi sürdürmektir. Sağ uç olan vesvese ise her konuda durmayan kuruntu yapmaktır; bu ibre ölçekten çok yönü gösterir. Bu bir kusur değil; güvendiğin bir yetişkinle konuşunca hafifler.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tevbe",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Hatada Israr",
      "orta": "Tevbe",
      "fazla": "Vesvese"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Aynı hatayı sürdürmek neye benziyor?",
       "ad": "Israr",
       "soz": "Yanlış olduğunu biliyorum ama devam ediyorum.",
       "eylem": "hayir",
       "zincir": [
        "Küçük yalan büyüyüp yenisini çağırır.",
        "Güven azaldıkça dostluklar yorulur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yanlış ama bırakmak zor geliyor; devam edeyim.",
          "dogru": true,
          "not": "Hatada ısrar, bile bile yanlışı sürdürmektir. Fark etmek güzeldir; bırakmak ise yolu açar. Tekrar düşsen de yeniden denemek ve tevbe etmek hep mümkündür."
         },
         {
          "m": "Hata yaptım; özür dilerim, Allahü teâlâ’dan da af dilerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         },
         {
          "m": "Ya hata yaptıysam? Bir daha düşüneyim.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: vesvesenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Israr",
        "soz": "Yanlış"
       },
       "zincirAnahtar": [
        "Küçük",
        "Güven"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kuruntuya takılan kişi neyi kaçırır?",
       "ad": "Vesvese",
       "soz": "Ya hata yaptıysam? Bir daha düşüneyim, bir daha!",
       "eylem": "dusun",
       "zincir": [
        "Düşündükçe huzuru kaçar.",
        "Zaman geçer, kuruntu azalmak yerine çoğalabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ya hata yaptıysam? Bir daha düşüneyim.",
          "dogru": true,
          "not": "Vesvese, durmayan kuruntudur. Bu bir kusur değil; güvendiğin bir yetişkinle konuşunca hafifler."
         },
         {
          "m": "Yanlış ama bırakmak zor geliyor; devam edeyim.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ısrarın sesi."
         },
         {
          "m": "Hata yaptım; özür dilerim, Allahü teâlâ’dan da af dilerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Vesvese",
        "soz": "Ya"
       },
       "zincirAnahtar": [
        "Düşündükçe",
        "Zaman"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tevbe",
       "soz": "Hata yaptım; özür dileyip düzelteceğim.",
       "eylem": "egil",
       "zincir": [
        "Özür dileyince kalbi hafifler.",
        "Allahü teâlâ’ya yönelmek ona yeni bir başlangıç verir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Hata yaptım; özür dilerim, Allahü teâlâ’dan da af dilerim.",
          "dogru": true,
          "not": "Tevbe, hatayı fark edip pişman olmak, özür dilemek, Allahü teâlâ’ya yönelmek ve doğruya dönmektir."
         },
         {
          "m": "Yanlış ama bırakmak zor geliyor; devam edeyim.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ısrarın sesi."
         },
         {
          "m": "Ya hata yaptıysam? Bir daha düşüneyim.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: vesvesenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tevbe",
        "soz": "Hata"
       },
       "zincirAnahtar": [
        "Özür",
        "Allahü"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tevbe",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Hatada Israr",
      "orta": "Tevbe",
      "fazla": "Vesvese"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "yalan",
       "baslik": "Aynı yalan",
       "tetik": "Bu hafta arkadaşına aynı küçük yalanı birkaç kez söyledin. Yalan olduğunu biliyorsun; o ise sana güvenmeye devam ediyor.",
       "secenekler": [
        {
         "m": "Biliyorum yanlış ama alıştım; böyle devam ederim.",
         "zon": "az",
         "sonuc": "Yalan büyüyor, yeni yalanlar gerekiyor ve güven azalıyor.",
         "not": "İbre sola kaydı: bildiği yanlışı sürdürmek hatayı büyütüyor.",
         "ses": "s1az"
        },
        {
         "m": "Ya yalanım çok ağırsa? Aklımda döndüreyim, bir şey yapmam.",
         "zon": "fazla",
         "sonuc": "Kuruntu çoğalıyor ama düzeltme adımı atılmıyor; arkadaşın yalanı hâlâ bilmiyor.",
         "not": "İbre sağa kaydı: durmayan kuruntu, düzeltmenin yerini alıyor. Çoğalırsa güvendiğin bir yetişkine anlat.",
         "ses": "s1fa"
        },
        {
         "m": "Doğrusunu söyleyip özür dilerim, Allahü teâlâ’dan da af dilerim.",
         "zon": "orta",
         "sonuc": "Arkadaşın önce şaşırıyor, sonra doğruyu söylediğin için sana yeniden güvenmeye başlıyor.",
         "not": "İbre ortada: hatayı fark edip düzelttin ve Allahü teâlâ’ya yöneldin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "gec",
       "baslik": "Geç kalma",
       "tetik": "Her sabah derse geç kalıyorsun. Bunun arkadaşlarını beklettiğini biliyorsun.",
       "secenekler": [
        {
         "m": "Biliyorum ama böyle alıştım; yarın da geç kalırım.",
         "zon": "az",
         "sonuc": "Geç kalma sürüyor; arkadaşların yoruluyor ve güven azalıyor.",
         "not": "İbre sola kaydı: bildiği yanlışı sürdürmek alışkanlığı büyütüyor.",
         "ses": "s2az"
        },
        {
         "m": "Ya herkes bana kızmıştır? Aynı şeyi sürekli düşünürüm!",
         "zon": "fazla",
         "sonuc": "Kuruntu aklında dönüp duruyor; erken hazırlanma adımı bir türlü atılmıyor.",
         "not": "İbre sağa kaydı: durmayan kuruntu, küçük bir düzeltmenin yerini alıyor. Çoğalırsa güvendiğin bir yetişkine anlat.",
         "ses": "s2fa"
        },
        {
         "m": "Özür dilerim, Allahü teâlâ’dan da af dilerim; yarın erken çıkarım.",
         "zon": "orta",
         "sonuc": "Arkadaşların özrünü anlıyor; ertesi sabah zamanında çıkıyorsun.",
         "not": "İbre ortada: hatayı fark edip özür diledin, Allahü teâlâ’ya yöneldin ve düzeltmeyi seçtin.",
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
       "ad": "Az · Hatada Israr",
       "aciklama": "Hatayı bile bile sürdürmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tevbe",
       "aciklama": "Pişman olup doğruya dönmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Vesvese",
       "aciklama": "Durmayan kuruntuya takılmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Yalan olduğunu bilir, yine de her gün aynı yalanı tekrarlar.",
       "alan": "az",
       "ipucu": "Yanlışı sürdürüyor."
      },
      {
       "id": "k2",
       "metin": "Özür dilediği hâlde “yeterli oldu mu?” diye gün boyu aynı şeyi düşünür.",
       "alan": "fazla",
       "ipucu": "Durmayan kuruntu."
      },
      {
       "id": "k3",
       "metin": "Hatasını söyler, özür diler, Allahü teâlâ’dan da af diler ve aynı hatayı yapmamaya çalışır.",
       "alan": "orta",
       "ipucu": "Pişman olup dönüyor."
      },
      {
       "id": "k4",
       "metin": "Her sabah geç kaldığını bilir, “yarın erken kalkarım” der ama yine geç kalır.",
       "alan": "az",
       "ipucu": "Aynı şeyi tekrarlıyor."
      },
      {
       "id": "k5",
       "metin": "Küçük bir hatadan sonra “ya kötü bir şey olursa?” diye aynı şeyi tekrar tekrar düşünür.",
       "alan": "fazla",
       "ipucu": "Kuruntu durmuyor."
      },
      {
       "id": "k6",
       "metin": "Hata yapınca özür diler, Allahü teâlâ’dan af diler ve düzeltmenin yolunu arar.",
       "alan": "orta",
       "ipucu": "Doğruya dönüyor."
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
        "Bir hata yapınca",
        "Aynı yanlışı tekrar edince",
        "Aklıma durmayan kuruntular gelince",
        "Özür dilemem gerekince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Hatamı fark edince bugün özür dileyip Allahü teâlâ’dan af dileyeceğim",
        "Aynı hatayı bırakmak için küçük bir adım seçeceğim",
        "Kuruntular artarsa güvendiğim bir yetişkinle konuşacağım"
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
       "baslik": "Tevbe",
       "metin": "pişman olup doğruya dönmek",
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
   "sure": 2.278,
   "m": "Bir daha yapmayacağım, söz veriyorum.",
   "k": [
    [
     "Bir",
     0.03,
     0.092
    ],
    [
     "daha",
     0.092,
     0.217
    ],
    [
     "yapmayacağım,",
     0.217,
     0.53
    ],
    [
     "söz",
     0.605,
     0.926
    ],
    [
     "veriyorum.",
     0.926,
     2.208
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.557,
   "m": "Birçok güzel huy bir ibre gibidir. Tevbe, hatamdan sonra nasıl davrandığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.462
    ],
    [
     "güzel",
     0.462,
     0.894
    ],
    [
     "huy",
     0.894,
     1.11
    ],
    [
     "bir",
     1.11,
     1.325
    ],
    [
     "ibre",
     1.325,
     1.757
    ],
    [
     "gibidir.",
     1.757,
     2.405
    ],
    [
     "Tevbe,",
     2.885,
     3.305
    ],
    [
     "hatamdan",
     3.615,
     4.281
    ],
    [
     "sonra",
     4.281,
     4.726
    ],
    [
     "nasıl",
     4.726,
     5.17
    ],
    [
     "davrandığımı",
     5.17,
     6.281
    ],
    [
     "ölçer.",
     6.281,
     6.725
    ],
    [
     "İbre",
     6.82,
     7.25
    ],
    [
     "üç",
     7.25,
     7.465
    ],
    [
     "yerde",
     7.465,
     7.895
    ],
    [
     "durabilir:",
     7.895,
     8.755
    ],
    [
     "az,",
     9.165,
     9.302
    ],
    [
     "kararında,",
     9.302,
     9.85
    ],
    [
     "fazla.",
     10.21,
     10.487
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
   "sure": 7.423,
   "m": "Sol uçta Israr. Yanlış olduğunu biliyorum ama devam ediyorum. Yanlış olduğunu bildiği hâlde aynı şeyi yapmaya devam eder.",
   "k": [
    [
     "Sol",
     0.03,
     0.196
    ],
    [
     "uçta",
     0.196,
     0.528
    ],
    [
     "Israr.",
     0.528,
     0.86
    ],
    [
     "Yanlış",
     0.995,
     1.32
    ],
    [
     "olduğunu",
     1.32,
     1.97
    ],
    [
     "biliyorum",
     1.97,
     2.62
    ],
    [
     "ama",
     2.62,
     2.945
    ],
    [
     "devam",
     2.945,
     3.27
    ],
    [
     "ediyorum.",
     3.27,
     3.92
    ],
    [
     "Yanlış",
     4.235,
     4.518
    ],
    [
     "olduğunu",
     4.518,
     5.085
    ],
    [
     "bildiği",
     5.085,
     5.51
    ],
    [
     "hâlde",
     5.51,
     5.794
    ],
    [
     "aynı",
     5.794,
     6.077
    ],
    [
     "şeyi",
     6.077,
     6.361
    ],
    [
     "yapmaya",
     6.361,
     6.786
    ],
    [
     "devam",
     6.786,
     7.069
    ],
    [
     "eder.",
     7.069,
     7.353
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.216,
   "m": "Sonra ne olur? Küçük yalan büyüyüp yenisini çağırır. Güven azaldıkça dostluklar yorulur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.328
    ],
    [
     "ne",
     0.328,
     0.477
    ],
    [
     "olur?",
     0.477,
     0.775
    ],
    [
     "Küçük",
     1.4,
     1.685
    ],
    [
     "yalan",
     1.685,
     1.97
    ],
    [
     "büyüyüp",
     1.97,
     2.398
    ],
    [
     "yenisini",
     2.398,
     2.968
    ],
    [
     "çağırır.",
     2.968,
     3.395
    ],
    [
     "Güven",
     3.96,
     4.324
    ],
    [
     "azaldıkça",
     4.324,
     5.053
    ],
    [
     "dostluklar",
     5.053,
     5.599
    ],
    [
     "yorulur.",
     5.599,
     6.146
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
   "sure": 8.864,
   "m": "Sağ uçta Vesvese. Ya hata yaptıysam? Bir daha düşüneyim, bir daha! Hata yapıp yapmadığını tekrar tekrar düşünür, yine de rahat edemez.",
   "k": [
    [
     "Sağ",
     0.03,
     0.224
    ],
    [
     "uçta",
     0.224,
     0.613
    ],
    [
     "Vesvese.",
     0.613,
     1.195
    ],
    [
     "Ya",
     1.97,
     2.056
    ],
    [
     "hata",
     2.056,
     2.228
    ],
    [
     "yaptıysam?",
     2.228,
     2.485
    ],
    [
     "Bir",
     2.565,
     2.615
    ],
    [
     "daha",
     2.615,
     2.715
    ],
    [
     "düşüneyim,",
     2.715,
     2.915
    ],
    [
     "bir",
     3.5,
     3.72
    ],
    [
     "daha!",
     3.72,
     4.16
    ],
    [
     "Hata",
     4.34,
     4.729
    ],
    [
     "yapıp",
     4.729,
     5.119
    ],
    [
     "yapmadığını",
     5.119,
     6.092
    ],
    [
     "tekrar",
     6.092,
     6.482
    ],
    [
     "tekrar",
     6.482,
     6.871
    ],
    [
     "düşünür,",
     6.871,
     7.455
    ],
    [
     "yine",
     7.75,
     8.011
    ],
    [
     "de",
     8.011,
     8.141
    ],
    [
     "rahat",
     8.141,
     8.402
    ],
    [
     "edemez.",
     8.402,
     8.794
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.756,
   "m": "Sonra ne olur? Düşündükçe huzuru kaçar. Zaman geçer, kuruntu azalmak yerine çoğalabilir.",
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
     "Düşündükçe",
     1.065,
     1.627
    ],
    [
     "huzuru",
     1.627,
     2.049
    ],
    [
     "kaçar.",
     2.049,
     2.33
    ],
    [
     "Zaman",
     2.545,
     3.042
    ],
    [
     "geçer,",
     3.042,
     3.54
    ],
    [
     "kuruntu",
     3.705,
     4.13
    ],
    [
     "azalmak",
     4.13,
     4.554
    ],
    [
     "yerine",
     4.554,
     4.979
    ],
    [
     "çoğalabilir.",
     4.979,
     5.686
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
   "sure": 11.841,
   "m": "Tam kararında Tevbe. Hata yaptım; özür dileyip düzelteceğim. Hatasını fark eder, pişman olur, özür diler ve Allahü teâlâ’ya yönelerek doğruya döner.",
   "k": [
    [
     "Tam",
     0.03,
     0.17
    ],
    [
     "kararında",
     0.17,
     0.73
    ],
    [
     "Tevbe.",
     0.73,
     1.01
    ],
    [
     "Hata",
     1.245,
     1.43
    ],
    [
     "yaptım;",
     1.43,
     1.615
    ],
    [
     "özür",
     2.65,
     3.018
    ],
    [
     "dileyip",
     3.018,
     3.57
    ],
    [
     "düzelteceğim.",
     3.57,
     4.49
    ],
    [
     "Hatasını",
     4.635,
     5.315
    ],
    [
     "fark",
     5.315,
     5.485
    ],
    [
     "eder,",
     5.485,
     5.825
    ],
    [
     "pişman",
     5.935,
     6.463
    ],
    [
     "olur,",
     6.463,
     6.99
    ],
    [
     "özür",
     7.14,
     7.581
    ],
    [
     "diler",
     7.581,
     8.022
    ],
    [
     "ve",
     8.022,
     8.243
    ],
    [
     "Allahü",
     8.243,
     8.904
    ],
    [
     "teâlâ’ya",
     8.904,
     9.786
    ],
    [
     "yönelerek",
     9.786,
     10.669
    ],
    [
     "doğruya",
     10.669,
     11.33
    ],
    [
     "döner.",
     11.33,
     11.771
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 7.64,
   "m": "Sonra ne olur? Özür dileyince kalbi hafifler. Allahü teâlâ’ya yönelmek ona yeni bir başlangıç verir.",
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
     "Özür",
     1.34,
     1.672
    ],
    [
     "dileyince",
     1.672,
     2.335
    ],
    [
     "kalbi",
     2.335,
     2.667
    ],
    [
     "hafifler.",
     2.667,
     3.165
    ],
    [
     "Allahü",
     3.46,
     4.076
    ],
    [
     "teâlâ’ya",
     4.076,
     4.898
    ],
    [
     "yönelmek",
     4.898,
     5.515
    ],
    [
     "ona",
     5.515,
     5.926
    ],
    [
     "yeni",
     5.926,
     6.337
    ],
    [
     "bir",
     6.337,
     6.542
    ],
    [
     "başlangıç",
     6.542,
     7.159
    ],
    [
     "verir.",
     7.159,
     7.57
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
   "sure": 8.293,
   "m": "Bu hafta arkadaşına aynı küçük yalanı birkaç kez söyledin. Yalan olduğunu biliyorsun; o ise sana güvenmeye devam ediyor. Ne yaparsın?",
   "k": [
    [
     "Bu",
     0.03,
     0.172
    ],
    [
     "hafta",
     0.172,
     0.456
    ],
    [
     "arkadaşına",
     0.456,
     1.165
    ],
    [
     "aynı",
     1.165,
     1.449
    ],
    [
     "küçük",
     1.449,
     1.733
    ],
    [
     "yalanı",
     1.733,
     2.159
    ],
    [
     "birkaç",
     2.159,
     2.442
    ],
    [
     "kez",
     2.442,
     2.584
    ],
    [
     "söyledin.",
     2.584,
     3.01
    ],
    [
     "Yalan",
     3.64,
     3.882
    ],
    [
     "olduğunu",
     3.882,
     4.366
    ],
    [
     "biliyorsun;",
     4.366,
     4.85
    ],
    [
     "o",
     5.24,
     5.379
    ],
    [
     "ise",
     5.379,
     5.656
    ],
    [
     "sana",
     5.656,
     5.933
    ],
    [
     "güvenmeye",
     5.933,
     6.487
    ],
    [
     "devam",
     6.487,
     6.764
    ],
    [
     "ediyor.",
     6.764,
     7.18
    ],
    [
     "Ne",
     7.675,
     7.812
    ],
    [
     "yaparsın?",
     7.812,
     8.223
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.488,
   "m": "Yalan büyüyor, yeni yalanlar gerekiyor ve güven azalıyor.",
   "k": [
    [
     "Yalan",
     0.03,
     0.448
    ],
    [
     "büyüyor,",
     0.448,
     1.075
    ],
    [
     "yeni",
     1.075,
     1.493
    ],
    [
     "yalanlar",
     1.493,
     2.119
    ],
    [
     "gerekiyor",
     2.119,
     2.955
    ],
    [
     "ve",
     2.955,
     3.164
    ],
    [
     "güven",
     3.164,
     3.582
    ],
    [
     "azalıyor.",
     3.582,
     4.418
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.963,
   "m": "Kuruntu çoğalıyor ama düzeltme adımı atılmıyor; arkadaşın yalanı hâlâ bilmiyor.",
   "k": [
    [
     "Kuruntu",
     0.03,
     0.399
    ],
    [
     "çoğalıyor",
     0.399,
     0.892
    ],
    [
     "ama",
     0.892,
     1.138
    ],
    [
     "düzeltme",
     1.138,
     1.508
    ],
    [
     "adımı",
     1.508,
     1.877
    ],
    [
     "atılmıyor;",
     1.877,
     2.37
    ],
    [
     "arkadaşın",
     2.745,
     3.461
    ],
    [
     "yalanı",
     3.461,
     3.998
    ],
    [
     "hâlâ",
     3.998,
     4.356
    ],
    [
     "bilmiyor.",
     4.356,
     4.893
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 4.989,
   "m": "Arkadaşın önce şaşırıyor, sonra doğruyu söylediğin için sana yeniden güvenmeye başlıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.598
    ],
    [
     "önce",
     0.598,
     0.882
    ],
    [
     "şaşırıyor,",
     0.882,
     1.45
    ],
    [
     "sonra",
     1.535,
     1.829
    ],
    [
     "doğruyu",
     1.829,
     2.271
    ],
    [
     "söylediğin",
     2.271,
     2.859
    ],
    [
     "için",
     2.859,
     3.153
    ],
    [
     "sana",
     3.153,
     3.447
    ],
    [
     "yeniden",
     3.447,
     3.889
    ],
    [
     "güvenmeye",
     3.889,
     4.477
    ],
    [
     "başlıyor.",
     4.477,
     4.919
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.244,
   "m": "Her sabah derse geç kalıyorsun. Bunun arkadaşlarını beklettiğini biliyorsun. Ne yaparsın?",
   "k": [
    [
     "Her",
     0.03,
     0.197
    ],
    [
     "sabah",
     0.197,
     0.53
    ],
    [
     "derse",
     0.53,
     0.863
    ],
    [
     "geç",
     0.863,
     1.029
    ],
    [
     "kalıyorsun.",
     1.029,
     1.695
    ],
    [
     "Bunun",
     2.01,
     2.268
    ],
    [
     "arkadaşlarını",
     2.268,
     3.041
    ],
    [
     "beklettiğini",
     3.041,
     3.685
    ],
    [
     "biliyorsun.",
     3.685,
     4.2
    ],
    [
     "Ne",
     4.595,
     4.74
    ],
    [
     "yaparsın?",
     4.74,
     5.174
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.668,
   "m": "Geç kalma sürüyor; arkadaşların yoruluyor ve güven azalıyor.",
   "k": [
    [
     "Geç",
     0.03,
     0.213
    ],
    [
     "kalma",
     0.213,
     0.58
    ],
    [
     "sürüyor;",
     0.58,
     1.13
    ],
    [
     "arkadaşların",
     1.71,
     2.612
    ],
    [
     "yoruluyor",
     2.612,
     3.334
    ],
    [
     "ve",
     3.334,
     3.515
    ],
    [
     "güven",
     3.515,
     3.876
    ],
    [
     "azalıyor.",
     3.876,
     4.598
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.193,
   "m": "Kuruntu aklında dönüp duruyor; erken hazırlanma adımı bir türlü atılmıyor.",
   "k": [
    [
     "Kuruntu",
     0.03,
     0.402
    ],
    [
     "aklında",
     0.402,
     0.775
    ],
    [
     "dönüp",
     0.775,
     1.023
    ],
    [
     "duruyor;",
     1.023,
     1.395
    ],
    [
     "erken",
     1.7,
     2.003
    ],
    [
     "hazırlanma",
     2.003,
     2.609
    ],
    [
     "adımı",
     2.609,
     3.063
    ],
    [
     "bir",
     3.063,
     3.215
    ],
    [
     "türlü",
     3.215,
     3.517
    ],
    [
     "atılmıyor.",
     3.517,
     4.123
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.573,
   "m": "Arkadaşların özrünü anlıyor; ertesi sabah zamanında çıkıyorsun.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.737
    ],
    [
     "özrünü",
     0.737,
     1.161
    ],
    [
     "anlıyor;",
     1.161,
     1.585
    ],
    [
     "ertesi",
     1.87,
     2.247
    ],
    [
     "sabah",
     2.247,
     2.498
    ],
    [
     "zamanında",
     2.498,
     3.0
    ],
    [
     "çıkıyorsun.",
     3.0,
     3.503
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
   "sure": 9.518,
   "m": "Bu cümle bilerek çift anlamlı. Hatasını anlayıp değişmek isteyen biri söylüyorsa orta uca yakın. Aynı sözü her seferinde söyleyip yine yapan biri söylüyorsa sol uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.165
    ],
    [
     "cümle",
     0.165,
     0.433
    ],
    [
     "bilerek",
     0.433,
     0.837
    ],
    [
     "çift",
     0.837,
     0.972
    ],
    [
     "anlamlı.",
     0.972,
     1.375
    ],
    [
     "Hatasını",
     1.695,
     2.24
    ],
    [
     "anlayıp",
     2.24,
     2.648
    ],
    [
     "değişmek",
     2.648,
     3.057
    ],
    [
     "isteyen",
     3.057,
     3.466
    ],
    [
     "biri",
     3.466,
     3.738
    ],
    [
     "söylüyorsa",
     3.738,
     4.283
    ],
    [
     "orta",
     4.283,
     4.555
    ],
    [
     "uca",
     4.555,
     4.828
    ],
    [
     "yakın.",
     4.828,
     5.1
    ],
    [
     "Aynı",
     5.415,
     5.714
    ],
    [
     "sözü",
     5.714,
     6.013
    ],
    [
     "her",
     6.013,
     6.162
    ],
    [
     "seferinde",
     6.162,
     6.759
    ],
    [
     "söyleyip",
     6.759,
     7.208
    ],
    [
     "yine",
     7.208,
     7.506
    ],
    [
     "yapan",
     7.506,
     7.805
    ],
    [
     "biri",
     7.805,
     8.104
    ],
    [
     "söylüyorsa",
     8.104,
     8.701
    ],
    [
     "sol",
     8.701,
     8.851
    ],
    [
     "uca",
     8.851,
     9.15
    ],
    [
     "yakın.",
     9.15,
     9.448
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
