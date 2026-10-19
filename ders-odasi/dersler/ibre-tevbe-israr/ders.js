/* İbremetre · Tevbe — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Hatada Israr · Tevbe · Vesvese). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevbe-israr",
 "ad": "Tevbe (Hatada Israr · Vesvese): İbren Nerede?",
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
     "huy": "Tevbe",
     "huyAnahtar": "Tevbe",
     "olculen": "Hatadan dönme biçimim",
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
      "İbre cümleye değil, hatadan sonra ne yaptığımıza bakar. Tevbe; hatayı fark edip pişman olmak, özür dilemek ve Allahü teâlâ’ya yönelerek doğruya dönmektir. Sağ uç olan vesvese ise her konuda asılsız kuruntu yapmaktır; bu ibre ölçekten çok yönü gösterir. Kuruntular çoğalırsa güvendiğin bir yetişkinle konuşmak iyi gelir.",
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
       "soz": "Yanlış biliyorum ama böyle iyiyim, devam.",
       "eylem": "hayir",
       "zincir": [
        "Küçük yalan büyüyüp yenisini çağırır.",
        "Güven azaldıkça arkadaşları ondan uzaklaşır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yanlış ama bırakmak istemiyorum.",
          "dogru": true,
          "not": "Hatada ısrar, bildiği yanlışı bırakmamaktır. Fark etmek güzeldir; bırakmak ise yolu açar."
         },
         {
          "m": "Hata yaptım; özür dileyip bırakıyorum.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         },
         {
          "m": "Acaba yanlış yaptım? Bir daha bakayım.",
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
       "soru": "Boş yere kuruntu eden kişi neyi kaçırır?",
       "ad": "Vesvese",
       "soz": "Acaba yanlış mı yaptım? Bir daha, bir daha bakayım.",
       "eylem": "dusun",
       "zincir": [
        "Kontrol ettikçe huzuru kaçar.",
        "Zaman geçer, kuruntu azalmak yerine çoğalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Acaba yanlış yaptım? Bir daha bakayım.",
          "dogru": true,
          "not": "Vesvese, aslında olmayan bir şey için tekrar tekrar kuruntu etmektir. Böyle olunca güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Yanlış ama bırakmak istemiyorum.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ısrarın sesi."
         },
         {
          "m": "Hata yaptım; özür dileyip bırakıyorum.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Vesvese",
        "soz": "Acaba"
       },
       "zincirAnahtar": [
        "Kontrol",
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
        "Özür dilenince kalbi rahatlar.",
        "Yeni bir sayfa açıp doğrusunu yapmaya başlar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Hata yaptım; özür dileyip bırakıyorum.",
          "dogru": true,
          "not": "Tevbe, hatayı fark edip pişman olmak, özür dilemek ve doğruya dönmektir."
         },
         {
          "m": "Yanlış ama bırakmak istemiyorum.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ısrarın sesi."
         },
         {
          "m": "Acaba yanlış yaptım? Bir daha bakayım.",
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
        "Yeni"
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
       "baslik": "Küçük yalan",
       "tetik": "Arkadaşına küçük bir yalan söyledin ve yalan olduğunu biliyorsun. O ise sana güvenmeye devam ediyor.",
       "secenekler": [
        {
         "m": "Biliyorum yanlış ama böyle devam ederim.",
         "zon": "az",
         "sonuc": "Yalan büyüyor, yeni yalanlar gerekiyor ve güven azalıyor.",
         "not": "İbre sola kaydı: bildiği yanlışı sürdürmek hatayı büyütüyor.",
         "ses": "s1az"
        },
        {
         "m": "Acaba bir şey mi oldu? Yüz kere düşünüp durayım.",
         "zon": "fazla",
         "sonuc": "Kafan karışıyor; düzeltme adımı yerine kuruntu çoğalıyor.",
         "not": "İbre sağa kaydı: kuruntu, düzeltmenin yerini alıyor. Çoğalırsa güvendiğin bir yetişkine anlat.",
         "ses": "s1fa"
        },
        {
         "m": "Doğrusunu söyleyip özür dilerim.",
         "zon": "orta",
         "sonuc": "Arkadaşın önce şaşırıyor, sonra doğruyu söylediğin için sana güveniyor.",
         "not": "İbre ortada: hatayı fark edip düzelttin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kitap",
       "baslik": "Kirlenen kitap",
       "tetik": "Arkadaşının kitabına yanlışlıkla mürekkep damlattın. Kitap şimdi lekeli.",
       "secenekler": [
        {
         "m": "Söylemem; nasıl olsa fark etmez.",
         "zon": "az",
         "sonuc": "Leke duruyor; arkadaşın kitabı bulunca sana güvenmesi sarsılıyor.",
         "not": "İbre sola kaydı: hatayı gizlemek onu çözmüyor.",
         "ses": "s2az"
        },
        {
         "m": "Ya başka kitapları da bozduysam? Hepsine tekrar bakarım.",
         "zon": "fazla",
         "sonuc": "Kontrol bitmiyor; asıl yapman gereken özür bekliyor.",
         "not": "İbre sağa kaydı: asılsız kuruntu, gerçek adımı geciktiriyor.",
         "ses": "s2fa"
        },
        {
         "m": "Arkadaşıma söyler, özür diler, temizlemeye yardım ederim.",
         "zon": "orta",
         "sonuc": "Birlikte temizliyorsunuz; arkadaşın seni anlıyor.",
         "not": "İbre ortada: hatayı kabul edip düzeltmeye yöneldin.",
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
       "aciklama": "Hatayı sürdürmek",
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
       "aciklama": "Boş kuruntuya takılmak",
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
       "metin": "Ödevi çantaya koyduğunu bildiği hâlde on kere açıp bakar.",
       "alan": "fazla",
       "ipucu": "Boş kuruntuya takılıyor."
      },
      {
       "id": "k3",
       "metin": "Hatasını söyler, özür diler ve aynı hatayı yapmamaya çalışır.",
       "alan": "orta",
       "ipucu": "Pişman olup dönüyor."
      },
      {
       "id": "k4",
       "metin": "“Bir daha yapmam” der ama her gün aynısını yapar.",
       "alan": "az",
       "ipucu": "Sözü tutmuyor."
      },
      {
       "id": "k5",
       "metin": "Küçük bir hatadan sonra “ya bir şey daha bozduysam?” diye durmadan düşünür.",
       "alan": "fazla",
       "ipucu": "Kuruntu çoğalıyor."
      },
      {
       "id": "k6",
       "metin": "Hata yapınca bir yetişkine anlatır, düzeltmenin yolunu birlikte bulur.",
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
        "Aklıma boş kuruntular gelince",
        "Özür dilemem gerekince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Hatamı fark edince bugün özür dileyeceğim",
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
   "sure": 6.537,
   "m": "Sol uçta Israr. Yanlış biliyorum ama böyle iyiyim, devam. Hatasını bildiği hâlde aynı şeyi yapmaya devam eder.",
   "k": [
    [
     "Sol",
     0.03,
     0.244
    ],
    [
     "uçta",
     0.244,
     0.672
    ],
    [
     "Israr.",
     0.672,
     1.1
    ],
    [
     "Yanlış",
     1.445,
     1.672
    ],
    [
     "biliyorum",
     1.672,
     2.126
    ],
    [
     "ama",
     2.126,
     2.353
    ],
    [
     "böyle",
     2.353,
     2.58
    ],
    [
     "iyiyim,",
     2.58,
     2.92
    ],
    [
     "devam.",
     3.11,
     3.365
    ],
    [
     "Hatasını",
     3.765,
     4.305
    ],
    [
     "bildiği",
     4.305,
     4.711
    ],
    [
     "hâlde",
     4.711,
     4.981
    ],
    [
     "aynı",
     4.981,
     5.251
    ],
    [
     "şeyi",
     5.251,
     5.522
    ],
    [
     "yapmaya",
     5.522,
     5.927
    ],
    [
     "devam",
     5.927,
     6.197
    ],
    [
     "eder.",
     6.197,
     6.467
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.477,
   "m": "Sonra ne olur? Küçük yalan büyüyüp yenisini çağırır. Güven azaldıkça arkadaşları ondan uzaklaşır.",
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
     "Küçük",
     1.31,
     1.626
    ],
    [
     "yalan",
     1.626,
     1.943
    ],
    [
     "büyüyüp",
     1.943,
     2.417
    ],
    [
     "yenisini",
     2.417,
     3.05
    ],
    [
     "çağırır.",
     3.05,
     3.525
    ],
    [
     "Güven",
     4.065,
     4.341
    ],
    [
     "azaldıkça",
     4.341,
     4.892
    ],
    [
     "arkadaşları",
     4.892,
     5.58
    ],
    [
     "ondan",
     5.58,
     5.856
    ],
    [
     "uzaklaşır.",
     5.856,
     6.407
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
   "sure": 8.373,
   "m": "Sağ uçta Vesvese. Acaba yanlış mı yaptım? Bir daha, bir daha bakayım. Çantayı tekrar tekrar açıp kontrol eder, yine de rahat edemez.",
   "k": [
    [
     "Sağ",
     0.03,
     0.205
    ],
    [
     "uçta",
     0.205,
     0.555
    ],
    [
     "Vesvese.",
     0.555,
     1.08
    ],
    [
     "Acaba",
     1.64,
     1.946
    ],
    [
     "yanlış",
     1.946,
     2.149
    ],
    [
     "mı",
     2.149,
     2.251
    ],
    [
     "yaptım?",
     2.251,
     2.455
    ],
    [
     "Bir",
     2.535,
     2.563
    ],
    [
     "daha,",
     2.563,
     2.62
    ],
    [
     "bir",
     3.26,
     3.5
    ],
    [
     "daha",
     3.5,
     3.98
    ],
    [
     "bakayım.",
     3.98,
     4.7
    ],
    [
     "Çantayı",
     4.95,
     5.447
    ],
    [
     "tekrar",
     5.447,
     5.779
    ],
    [
     "tekrar",
     5.779,
     6.11
    ],
    [
     "açıp",
     6.11,
     6.442
    ],
    [
     "kontrol",
     6.442,
     6.773
    ],
    [
     "eder,",
     6.773,
     7.105
    ],
    [
     "yine",
     7.33,
     7.573
    ],
    [
     "de",
     7.573,
     7.695
    ],
    [
     "rahat",
     7.695,
     7.938
    ],
    [
     "edemez.",
     7.938,
     8.303
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.695,
   "m": "Sonra ne olur? Kontrol ettikçe huzuru kaçar. Zaman geçer, kuruntu azalmak yerine çoğalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.406
    ],
    [
     "ne",
     0.406,
     0.594
    ],
    [
     "olur?",
     0.594,
     0.97
    ],
    [
     "Kontrol",
     1.105,
     1.486
    ],
    [
     "ettikçe",
     1.486,
     2.058
    ],
    [
     "huzuru",
     2.058,
     2.629
    ],
    [
     "kaçar.",
     2.629,
     3.01
    ],
    [
     "Zaman",
     3.315,
     3.827
    ],
    [
     "geçer,",
     3.827,
     4.34
    ],
    [
     "kuruntu",
     4.58,
     5.091
    ],
    [
     "azalmak",
     5.091,
     5.603
    ],
    [
     "yerine",
     5.603,
     6.114
    ],
    [
     "çoğalır.",
     6.114,
     6.625
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
   "sure": 7.843,
   "m": "Tam kararında Tevbe. Hata yaptım; özür dileyip düzelteceğim. Hatasını fark eder, pişman olur ve doğruya döner.",
   "k": [
    [
     "Tam",
     0.03,
     0.234
    ],
    [
     "kararında",
     0.234,
     1.051
    ],
    [
     "Tevbe.",
     1.051,
     1.46
    ],
    [
     "Hata",
     2.12,
     2.315
    ],
    [
     "yaptım;",
     2.315,
     2.51
    ],
    [
     "özür",
     2.59,
     2.934
    ],
    [
     "dileyip",
     2.934,
     3.45
    ],
    [
     "düzelteceğim.",
     3.45,
     4.31
    ],
    [
     "Hatasını",
     4.94,
     5.514
    ],
    [
     "fark",
     5.514,
     5.658
    ],
    [
     "eder,",
     5.658,
     5.945
    ],
    [
     "pişman",
     6.105,
     6.439
    ],
    [
     "olur",
     6.439,
     6.772
    ],
    [
     "ve",
     6.772,
     6.939
    ],
    [
     "doğruya",
     6.939,
     7.439
    ],
    [
     "döner.",
     7.439,
     7.773
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.666,
   "m": "Sonra ne olur? Özür dilenince kalbi rahatlar. Yeni bir sayfa açıp doğrusunu yapmaya başlar.",
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
     1.325,
     1.561
    ],
    [
     "dilenince",
     1.561,
     2.034
    ],
    [
     "kalbi",
     2.034,
     2.27
    ],
    [
     "rahatlar.",
     2.27,
     2.625
    ],
    [
     "Yeni",
     2.73,
     3.088
    ],
    [
     "bir",
     3.088,
     3.267
    ],
    [
     "sayfa",
     3.267,
     3.626
    ],
    [
     "açıp",
     3.626,
     3.984
    ],
    [
     "doğrusunu",
     3.984,
     4.7
    ],
    [
     "yapmaya",
     4.7,
     5.238
    ],
    [
     "başlar.",
     5.238,
     5.596
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
   "sure": 6.767,
   "m": "Arkadaşına küçük bir yalan söyledin ve yalan olduğunu biliyorsun. O ise sana güvenmeye devam ediyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşına",
     0.03,
     0.775
    ],
    [
     "küçük",
     0.775,
     1.073
    ],
    [
     "bir",
     1.073,
     1.222
    ],
    [
     "yalan",
     1.222,
     1.52
    ],
    [
     "söyledin",
     1.52,
     1.966
    ],
    [
     "ve",
     1.966,
     2.115
    ],
    [
     "yalan",
     2.115,
     2.413
    ],
    [
     "olduğunu",
     2.413,
     3.009
    ],
    [
     "biliyorsun.",
     3.009,
     3.605
    ],
    [
     "O",
     3.905,
     4.053
    ],
    [
     "ise",
     4.053,
     4.349
    ],
    [
     "sana",
     4.349,
     4.644
    ],
    [
     "güvenmeye",
     4.644,
     5.236
    ],
    [
     "devam",
     5.236,
     5.531
    ],
    [
     "ediyor.",
     5.531,
     5.975
    ],
    [
     "Ne",
     6.225,
     6.343
    ],
    [
     "yaparsın?",
     6.343,
     6.697
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
   "sure": 3.583,
   "m": "Kafan karışıyor; düzeltme adımı yerine kuruntu çoğalıyor.",
   "k": [
    [
     "Kafan",
     0.03,
     0.28
    ],
    [
     "karışıyor;",
     0.28,
     0.78
    ],
    [
     "düzeltme",
     0.975,
     1.451
    ],
    [
     "adımı",
     1.451,
     1.927
    ],
    [
     "yerine",
     1.927,
     2.403
    ],
    [
     "kuruntu",
     2.403,
     2.879
    ],
    [
     "çoğalıyor.",
     2.879,
     3.513
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.793,
   "m": "Arkadaşın önce şaşırıyor, sonra doğruyu söylediğin için sana güveniyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.582
    ],
    [
     "önce",
     0.582,
     0.858
    ],
    [
     "şaşırıyor,",
     0.858,
     1.41
    ],
    [
     "sonra",
     1.55,
     1.806
    ],
    [
     "doğruyu",
     1.806,
     2.189
    ],
    [
     "söylediğin",
     2.189,
     2.7
    ],
    [
     "için",
     2.7,
     2.956
    ],
    [
     "sana",
     2.956,
     3.212
    ],
    [
     "güveniyor.",
     3.212,
     3.723
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.646,
   "m": "Arkadaşının kitabına yanlışlıkla mürekkep damlattın. Kitap şimdi lekeli. Ne yaparsın?",
   "k": [
    [
     "Arkadaşının",
     0.03,
     0.713
    ],
    [
     "kitabına",
     0.713,
     1.259
    ],
    [
     "yanlışlıkla",
     1.259,
     1.806
    ],
    [
     "mürekkep",
     1.806,
     2.215
    ],
    [
     "damlattın.",
     2.215,
     2.625
    ],
    [
     "Kitap",
     2.93,
     3.167
    ],
    [
     "şimdi",
     3.167,
     3.404
    ],
    [
     "lekeli.",
     3.404,
     3.76
    ],
    [
     "Ne",
     4.045,
     4.178
    ],
    [
     "yaparsın?",
     4.178,
     4.576
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.08,
   "m": "Leke duruyor; arkadaşın kitabı bulunca sana güvenmesi sarsılıyor.",
   "k": [
    [
     "Leke",
     0.03,
     0.278
    ],
    [
     "duruyor;",
     0.278,
     0.65
    ],
    [
     "arkadaşın",
     0.915,
     1.534
    ],
    [
     "kitabı",
     1.534,
     1.998
    ],
    [
     "bulunca",
     1.998,
     2.462
    ],
    [
     "sana",
     2.462,
     2.772
    ],
    [
     "güvenmesi",
     2.772,
     3.391
    ],
    [
     "sarsılıyor.",
     3.391,
     4.01
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.583,
   "m": "Kontrol bitmiyor; asıl yapman gereken özür bekliyor.",
   "k": [
    [
     "Kontrol",
     0.03,
     0.392
    ],
    [
     "bitmiyor;",
     0.392,
     0.935
    ],
    [
     "asıl",
     1.335,
     1.698
    ],
    [
     "yapman",
     1.698,
     2.061
    ],
    [
     "gereken",
     2.061,
     2.606
    ],
    [
     "özür",
     2.606,
     2.969
    ],
    [
     "bekliyor.",
     2.969,
     3.513
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 2.696,
   "m": "Birlikte temizliyorsunuz; arkadaşın seni anlıyor.",
   "k": [
    [
     "Birlikte",
     0.03,
     0.392
    ],
    [
     "temizliyorsunuz;",
     0.392,
     1.115
    ],
    [
     "arkadaşın",
     1.425,
     1.959
    ],
    [
     "seni",
     1.959,
     2.226
    ],
    [
     "anlıyor.",
     2.226,
     2.626
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
