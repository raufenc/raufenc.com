/* İbremetre · Tevbe — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Aldırmazlık · Tevbe · Umutsuzluk). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevbe-umutsuzluk",
 "ad": "Tevbe (Aldırmazlık · Umutsuzluk): İbren Nerede?",
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
     "olculen": "Hatama bakış biçimim",
     "kanca": "Olan oldu, geçti gitti.",
     "uclar": {
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tevbe",
     "cumle": "Olan oldu, geçti gitti.",
     "uclar": {
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi hatayı önemsemeden geçiyor: sol uca (Aldırmazlık) yakın. Başka okumada hatayı kabul etmiş, özür dilemiş ve sayfayı çevirmiş: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, hataya nasıl baktığımıza bakar. Tevbe; hatayı fark edip pişman olmak ve Allahü teâlâ’ya yönelerek düzeltmeye çalışmaktır. Sağ uçta ise “zaten düzeltemem” diye umudu kaybetmek vardır; oysa Allahü teâlâ’nın rahmetinden ümit kesilmez. Bu ibre ölçekten çok yönü gösterir.",
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
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Hatayı önemsememek neye benziyor?",
       "ad": "Aldırmazlık",
       "soz": "Kırıldıysa kırılsın, umurumda değil.",
       "eylem": "el-salla",
       "zincir": [
        "Arkadaşı kırgın kalır ve yanına yaklaşmak istemez.",
        "Hata düzelmez, kalbinde bir ağırlık olarak büyür."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ne olmuş yani? Önemli değil.",
          "dogru": true,
          "not": "Aldırmazlık, hata yapınca hiç pişman olmamaktır. Üzülmemek, düzeltme fırsatını da kaçırır."
         },
         {
          "m": "Üzüldüm ama düzeltebilirim; özür dileyeceğim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         },
         {
          "m": "Ben zaten düzeltemem; denemenin anlamı yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: umutsuzluğun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Aldırmazlık",
        "soz": "Kırıldıysa"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Hata"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Umudunu kesen kişi neyi kaçırır?",
       "ad": "Umutsuzluk",
       "soz": "Ben zaten düzeltemem; kimse beni affetmez.",
       "eylem": "otur",
       "zincir": [
        "Özür dilemeye bile yaklaşamaz.",
        "Düzeltebileceği bir hata büyük bir yük gibi kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben zaten düzeltemem; denemenin anlamı yok.",
          "dogru": true,
          "not": "Umutsuzluk, “düzeltemem” deyip affedilmeye bile umudu kesmektir. Allahü teâlâ’nın rahmetinden ümit kesilmez; küçük bir özür bile yeni bir başlangıçtır."
         },
         {
          "m": "Ne olmuş yani? Önemli değil.",
          "dogru": false,
          "not": "Bu sol ucun sesi: aldırmazlığın sesi."
         },
         {
          "m": "Üzüldüm ama düzeltebilirim; özür dileyeceğim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Umutsuzluk",
        "soz": "Ben"
       },
       "zincirAnahtar": [
        "Özür",
        "Düzeltebileceği"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tevbe",
       "soz": "Üzüldüm; özür dileyip kırdığımı toplayayım.",
       "eylem": "egil",
       "zincir": [
        "Arkadaşı özrünü duyunca yumuşar.",
        "Birlikte tamir ederler ve dostluk eskisinden sağlam olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Üzüldüm ama düzeltebilirim; özür dileyeceğim.",
          "dogru": true,
          "not": "Tevbe, hatayı fark edip pişman olmak, özür dilemek ve düzeltmeye yönelmektir. Umut hep açıktır."
         },
         {
          "m": "Ne olmuş yani? Önemli değil.",
          "dogru": false,
          "not": "Bu sol ucun sesi: aldırmazlığın sesi."
         },
         {
          "m": "Ben zaten düzeltemem; denemenin anlamı yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: umutsuzluğun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tevbe",
        "soz": "Üzüldüm;"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Birlikte"
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
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "resim",
       "baslik": "Bozulan resim",
       "tetik": "Arkadaşının resmini yanlışlıkla ıslattın ve resim bozuldu.",
       "secenekler": [
        {
         "m": "Bir resim işte, önemli değil.",
         "zon": "az",
         "sonuc": "Arkadaşın üzülüyor ama sen konuyu kapatıyorsun; kırgınlık duruyor.",
         "not": "İbre sola kaydı: hatayı önemsememek kırgınlığı bırakıyor.",
         "ses": "s1az"
        },
        {
         "m": "Ben hep bozuyorum; hiçbir şeyi düzeltemem.",
         "zon": "fazla",
         "sonuc": "Özür dilemeye bile yaklaşamıyorsun; arkadaşın ne olduğunu bilmiyor.",
         "not": "İbre sağa kaydı: “düzeltemem” demek, küçük adımı da durduruyor.",
         "ses": "s1fa"
        },
        {
         "m": "Üzüldüm; özür dileyip yeni resim için yardım ederim.",
         "zon": "orta",
         "sonuc": "Arkadaşın özrünü kabul ediyor; birlikte yeni bir resim yapıyorsunuz.",
         "not": "İbre ortada: pişman oldun ve umutla düzeltmeye yöneldin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "soz",
       "baslik": "Kırıcı söz",
       "tetik": "Arkadaşına sert bir söz söyledin ve gözlerinin dolduğunu gördün.",
       "secenekler": [
        {
         "m": "Ne var yani, doğruyu söyledim.",
         "zon": "az",
         "sonuc": "Arkadaşın uzaklaşıyor; aranızdaki mesafe büyüyor.",
         "not": "İbre sola kaydı: üzdüğünü görüp aldırmamak, dostluğu zedeliyor.",
         "ses": "s2az"
        },
        {
         "m": "Ben hep böyle yaparım; ne yapsam düzelmez.",
         "zon": "fazla",
         "sonuc": "Umudunu kesince özür dilemek de imkânsız görünüyor.",
         "not": "İbre sağa kaydı: kendini bırakmak, düzeltmenin yolunu kapatıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Özür dilerim; seni üzmek istemedim.",
         "zon": "orta",
         "sonuc": "Arkadaşın seni dinliyor; gönlü yavaş yavaş yumuşuyor.",
         "not": "İbre ortada: pişman olup umutla yaklaştın. Zor gelirse güvendiğin bir yetişkine de danışabilirsin.",
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
       "ad": "Az · Aldırmazlık",
       "aciklama": "Hataya aldırmamak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tevbe",
       "aciklama": "Pişman olup umutla dönmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Umutsuzluk",
       "aciklama": "“Düzeltemem” deyip umudu kesmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşını üzdükten sonra “umrumda mı?” deyip oyuna döner.",
       "alan": "az",
       "ipucu": "Hataya aldırmıyor."
      },
      {
       "id": "k2",
       "metin": "Bir hata yapınca “ben zaten düzeltemem” deyip kendini bırakır.",
       "alan": "fazla",
       "ipucu": "Umudunu yitirmiş."
      },
      {
       "id": "k3",
       "metin": "Üzdüğü arkadaşına gidip özür diler ve düzeltmeye çalışır.",
       "alan": "orta",
       "ipucu": "Pişman olup yöneliyor."
      },
      {
       "id": "k4",
       "metin": "Eşyayı bozduktan sonra “bana ne” deyip uzaklaşır.",
       "alan": "az",
       "ipucu": "Pişmanlık yok."
      },
      {
       "id": "k5",
       "metin": "Bir kez yanlış yapınca “bana artık kimse güvenmez” deyip denemeyi bırakır.",
       "alan": "fazla",
       "ipucu": "Düzelmeye umudu kalmamış."
      },
      {
       "id": "k6",
       "metin": "Hatasını söyler, “bir daha dikkat edeceğim” der ve yeniden dener.",
       "alan": "orta",
       "ipucu": "Umudunu kaybetmeden düzeltiyor."
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
        "Birini üzdüğümü fark edince",
        "Bir şeyi bozunca",
        "“Ben düzeltemem” diye düşününce",
        "Özür dilemek zor gelince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Üzdüğüm biriyle bugün konuşacağım",
        "“Düzeltemem” demek yerine küçük bir adım atacağım",
        "İçim ağırlaşırsa güvendiğim bir yetişkine anlatacağım"
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
       "metin": "pişman olup umutla düzeltmek",
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
   "sure": 2.154,
   "m": "Olan oldu, geçti gitti.",
   "k": [
    [
     "Olan",
     0.03,
     0.483
    ],
    [
     "oldu,",
     0.483,
     0.935
    ],
    [
     "geçti",
     1.165,
     1.624
    ],
    [
     "gitti.",
     1.624,
     2.084
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 9.984,
   "m": "Birçok güzel huy bir ibre gibidir. Tevbe, hatama nasıl baktığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.44
    ],
    [
     "güzel",
     0.44,
     0.85
    ],
    [
     "huy",
     0.85,
     1.055
    ],
    [
     "bir",
     1.055,
     1.26
    ],
    [
     "ibre",
     1.26,
     1.67
    ],
    [
     "gibidir.",
     1.67,
     2.285
    ],
    [
     "Tevbe,",
     2.72,
     3.17
    ],
    [
     "hatama",
     3.435,
     4.188
    ],
    [
     "nasıl",
     4.188,
     4.69
    ],
    [
     "baktığımı",
     4.69,
     5.693
    ],
    [
     "ölçer.",
     5.693,
     6.195
    ],
    [
     "İbre",
     6.31,
     6.737
    ],
    [
     "üç",
     6.737,
     6.95
    ],
    [
     "yerde",
     6.95,
     7.377
    ],
    [
     "durabilir:",
     7.377,
     8.23
    ],
    [
     "az,",
     8.465,
     8.608
    ],
    [
     "kararında,",
     8.608,
     9.18
    ],
    [
     "fazla.",
     9.5,
     9.914
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
   "sure": 7.362,
   "m": "Sol uçta Aldırmazlık. Kırıldıysa kırılsın, umurumda değil. Arkadaşının oyuncağını kırınca omuz silker.",
   "k": [
    [
     "Sol",
     0.03,
     0.254
    ],
    [
     "uçta",
     0.254,
     0.703
    ],
    [
     "Aldırmazlık.",
     0.703,
     1.6
    ],
    [
     "Kırıldıysa",
     2.295,
     2.829
    ],
    [
     "kırılsın,",
     2.829,
     3.23
    ],
    [
     "umurumda",
     3.435,
     3.885
    ],
    [
     "değil.",
     3.885,
     4.11
    ],
    [
     "Arkadaşının",
     4.98,
     5.66
    ],
    [
     "oyuncağını",
     5.66,
     6.34
    ],
    [
     "kırınca",
     6.34,
     6.748
    ],
    [
     "omuz",
     6.748,
     7.02
    ],
    [
     "silker.",
     7.02,
     7.292
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 7.866,
   "m": "Sonra ne olur? Arkadaşı kırgın kalır ve yanına yaklaşmak istemez. Hata düzelmez, kalbinde bir ağırlık olarak büyür.",
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
     1.24,
     1.922
    ],
    [
     "kırgın",
     1.922,
     2.263
    ],
    [
     "kalır",
     2.263,
     2.604
    ],
    [
     "ve",
     2.604,
     2.775
    ],
    [
     "yanına",
     2.775,
     3.287
    ],
    [
     "yaklaşmak",
     3.287,
     3.798
    ],
    [
     "istemez.",
     3.798,
     4.31
    ],
    [
     "Hata",
     4.69,
     5.114
    ],
    [
     "düzelmez,",
     5.114,
     5.75
    ],
    [
     "kalbinde",
     6.095,
     6.52
    ],
    [
     "bir",
     6.52,
     6.662
    ],
    [
     "ağırlık",
     6.662,
     7.087
    ],
    [
     "olarak",
     7.087,
     7.512
    ],
    [
     "büyür.",
     7.512,
     7.796
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
   "sure": 8.431,
   "m": "Sağ uçta Umutsuzluk. Ben zaten düzeltemem; kimse beni affetmez. Küçük bir hatadan sonra köşesine çekilip umudunu keser.",
   "k": [
    [
     "Sağ",
     0.03,
     0.226
    ],
    [
     "uçta",
     0.226,
     0.617
    ],
    [
     "Umutsuzluk.",
     0.617,
     1.4
    ],
    [
     "Ben",
     1.505,
     1.743
    ],
    [
     "zaten",
     1.743,
     2.219
    ],
    [
     "düzeltemem;",
     2.219,
     3.17
    ],
    [
     "kimse",
     3.43,
     3.761
    ],
    [
     "beni",
     3.761,
     4.093
    ],
    [
     "affetmez.",
     4.093,
     4.59
    ],
    [
     "Küçük",
     5.075,
     5.388
    ],
    [
     "bir",
     5.388,
     5.544
    ],
    [
     "hatadan",
     5.544,
     6.014
    ],
    [
     "sonra",
     6.014,
     6.327
    ],
    [
     "köşesine",
     6.327,
     6.953
    ],
    [
     "çekilip",
     6.953,
     7.422
    ],
    [
     "umudunu",
     7.422,
     8.048
    ],
    [
     "keser.",
     8.048,
     8.361
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.267,
   "m": "Sonra ne olur? Özür dilemeye bile yaklaşamaz. Düzeltebileceği bir hata büyük bir yük gibi kalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.366
    ],
    [
     "ne",
     0.366,
     0.534
    ],
    [
     "olur?",
     0.534,
     0.87
    ],
    [
     "Özür",
     1.08,
     1.375
    ],
    [
     "dilemeye",
     1.375,
     1.965
    ],
    [
     "bile",
     1.965,
     2.26
    ],
    [
     "yaklaşamaz.",
     2.26,
     2.85
    ],
    [
     "Düzeltebileceği",
     2.995,
     4.24
    ],
    [
     "bir",
     4.24,
     4.418
    ],
    [
     "hata",
     4.418,
     4.774
    ],
    [
     "büyük",
     4.774,
     5.13
    ],
    [
     "bir",
     5.13,
     5.308
    ],
    [
     "yük",
     5.308,
     5.486
    ],
    [
     "gibi",
     5.486,
     5.841
    ],
    [
     "kalır.",
     5.841,
     6.197
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
   "sure": 9.024,
   "m": "Tam kararında Tevbe. Üzüldüm; özür dileyip kırdığımı toplayayım. Kırdığını fark eder, özür diler ve düzeltmeye yardım eder.",
   "k": [
    [
     "Tam",
     0.03,
     0.155
    ],
    [
     "kararında",
     0.155,
     0.655
    ],
    [
     "Tevbe.",
     0.655,
     0.905
    ],
    [
     "Üzüldüm;",
     1.29,
     1.63
    ],
    [
     "özür",
     2.395,
     2.777
    ],
    [
     "dileyip",
     2.777,
     3.349
    ],
    [
     "kırdığımı",
     3.349,
     4.112
    ],
    [
     "toplayayım.",
     4.112,
     4.875
    ],
    [
     "Kırdığını",
     5.585,
     6.182
    ],
    [
     "fark",
     6.182,
     6.331
    ],
    [
     "eder,",
     6.331,
     6.63
    ],
    [
     "özür",
     6.75,
     7.089
    ],
    [
     "diler",
     7.089,
     7.428
    ],
    [
     "ve",
     7.428,
     7.598
    ],
    [
     "düzeltmeye",
     7.598,
     8.276
    ],
    [
     "yardım",
     8.276,
     8.615
    ],
    [
     "eder.",
     8.615,
     8.954
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.961,
   "m": "Sonra ne olur? Arkadaşı özrünü duyunca yumuşar. Birlikte tamir ederler ve dostluk eskisinden sağlam olur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.302
    ],
    [
     "ne",
     0.302,
     0.438
    ],
    [
     "olur?",
     0.438,
     0.71
    ],
    [
     "Arkadaşı",
     1.17,
     1.775
    ],
    [
     "özrünü",
     1.775,
     2.228
    ],
    [
     "duyunca",
     2.228,
     2.682
    ],
    [
     "yumuşar.",
     2.682,
     3.135
    ],
    [
     "Birlikte",
     3.395,
     3.947
    ],
    [
     "tamir",
     3.947,
     4.315
    ],
    [
     "ederler",
     4.315,
     4.867
    ],
    [
     "ve",
     4.867,
     5.051
    ],
    [
     "dostluk",
     5.051,
     5.419
    ],
    [
     "eskisinden",
     5.419,
     6.155
    ],
    [
     "sağlam",
     6.155,
     6.523
    ],
    [
     "olur.",
     6.523,
     6.891
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
   "sure": 4.285,
   "m": "Arkadaşının resmini yanlışlıkla ıslattın ve resim bozuldu. Ne yaparsın?",
   "k": [
    [
     "Arkadaşının",
     0.03,
     0.809
    ],
    [
     "resmini",
     0.809,
     1.276
    ],
    [
     "yanlışlıkla",
     1.276,
     1.899
    ],
    [
     "ıslattın",
     1.899,
     2.366
    ],
    [
     "ve",
     2.366,
     2.521
    ],
    [
     "resim",
     2.521,
     2.833
    ],
    [
     "bozuldu.",
     2.833,
     3.3
    ],
    [
     "Ne",
     3.64,
     3.784
    ],
    [
     "yaparsın?",
     3.784,
     4.215
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.574,
   "m": "Arkadaşın üzülüyor ama sen konuyu kapatıyorsun; kırgınlık duruyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.514
    ],
    [
     "üzülüyor",
     0.514,
     0.998
    ],
    [
     "ama",
     0.998,
     1.241
    ],
    [
     "sen",
     1.241,
     1.362
    ],
    [
     "konuyu",
     1.362,
     1.725
    ],
    [
     "kapatıyorsun;",
     1.725,
     2.33
    ],
    [
     "kırgınlık",
     2.71,
     3.107
    ],
    [
     "duruyor.",
     3.107,
     3.504
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.34,
   "m": "Özür dilemeye bile yaklaşamıyorsun; arkadaşın ne olduğunu bilmiyor.",
   "k": [
    [
     "Özür",
     0.03,
     0.236
    ],
    [
     "dilemeye",
     0.236,
     0.647
    ],
    [
     "bile",
     0.647,
     0.853
    ],
    [
     "yaklaşamıyorsun;",
     0.853,
     1.47
    ],
    [
     "arkadaşın",
     1.81,
     2.297
    ],
    [
     "ne",
     2.297,
     2.418
    ],
    [
     "olduğunu",
     2.418,
     2.905
    ],
    [
     "bilmiyor.",
     2.905,
     3.27
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.581,
   "m": "Arkadaşın özrünü kabul ediyor; birlikte yeni bir resim yapıyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.562
    ],
    [
     "özrünü",
     0.562,
     0.96
    ],
    [
     "kabul",
     0.96,
     1.226
    ],
    [
     "ediyor;",
     1.226,
     1.625
    ],
    [
     "birlikte",
     1.83,
     2.218
    ],
    [
     "yeni",
     2.218,
     2.476
    ],
    [
     "bir",
     2.476,
     2.606
    ],
    [
     "resim",
     2.606,
     2.864
    ],
    [
     "yapıyorsunuz.",
     2.864,
     3.511
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.207,
   "m": "Arkadaşına sert bir söz söyledin ve gözlerinin dolduğunu gördün. Ne yaparsın?",
   "k": [
    [
     "Arkadaşına",
     0.03,
     0.745
    ],
    [
     "sert",
     0.745,
     0.888
    ],
    [
     "bir",
     0.888,
     1.031
    ],
    [
     "söz",
     1.031,
     1.174
    ],
    [
     "söyledin",
     1.174,
     1.603
    ],
    [
     "ve",
     1.603,
     1.745
    ],
    [
     "gözlerinin",
     1.745,
     2.317
    ],
    [
     "dolduğunu",
     2.317,
     2.889
    ],
    [
     "gördün.",
     2.889,
     3.175
    ],
    [
     "Ne",
     3.6,
     3.734
    ],
    [
     "yaparsın?",
     3.734,
     4.137
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.552,
   "m": "Arkadaşın uzaklaşıyor; aranızdaki mesafe büyüyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.552
    ],
    [
     "uzaklaşıyor;",
     0.552,
     1.205
    ],
    [
     "aranızdaki",
     1.615,
     2.464
    ],
    [
     "mesafe",
     2.464,
     2.973
    ],
    [
     "büyüyor.",
     2.973,
     3.482
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.147,
   "m": "Umudunu kesince özür dilemek de imkânsız görünüyor.",
   "k": [
    [
     "Umudunu",
     0.03,
     0.639
    ],
    [
     "kesince",
     0.639,
     1.096
    ],
    [
     "özür",
     1.096,
     1.401
    ],
    [
     "dilemek",
     1.401,
     1.858
    ],
    [
     "de",
     1.858,
     2.011
    ],
    [
     "imkânsız",
     2.011,
     2.468
    ],
    [
     "görünüyor.",
     2.468,
     3.077
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.631,
   "m": "Arkadaşın seni dinliyor; gönlü yavaş yavaş yumuşuyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.652
    ],
    [
     "seni",
     0.652,
     0.963
    ],
    [
     "dinliyor;",
     0.963,
     1.43
    ],
    [
     "gönlü",
     1.615,
     2.004
    ],
    [
     "yavaş",
     2.004,
     2.393
    ],
    [
     "yavaş",
     2.393,
     2.783
    ],
    [
     "yumuşuyor.",
     2.783,
     3.561
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
   "sure": 9.376,
   "m": "Bu cümle bilerek çift anlamlı. Hatayı önemsemeyen biri söylüyorsa sol uca yakın. Hatayı kabul edip özür dilemiş biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.189
    ],
    [
     "cümle",
     0.189,
     0.506
    ],
    [
     "bilerek",
     0.506,
     0.981
    ],
    [
     "çift",
     0.981,
     1.14
    ],
    [
     "anlamlı.",
     1.14,
     1.615
    ],
    [
     "Hatayı",
     1.93,
     2.393
    ],
    [
     "önemsemeyen",
     2.393,
     3.164
    ],
    [
     "biri",
     3.164,
     3.472
    ],
    [
     "söylüyorsa",
     3.472,
     4.089
    ],
    [
     "sol",
     4.089,
     4.243
    ],
    [
     "uca",
     4.243,
     4.552
    ],
    [
     "yakın.",
     4.552,
     4.86
    ],
    [
     "Hatayı",
     5.26,
     5.766
    ],
    [
     "kabul",
     5.766,
     6.103
    ],
    [
     "edip",
     6.103,
     6.44
    ],
    [
     "özür",
     6.44,
     6.777
    ],
    [
     "dilemiş",
     6.777,
     7.283
    ],
    [
     "biri",
     7.283,
     7.62
    ],
    [
     "söylüyorsa",
     7.62,
     8.295
    ],
    [
     "orta",
     8.295,
     8.632
    ],
    [
     "uca",
     8.632,
     8.969
    ],
    [
     "yakın.",
     8.969,
     9.306
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
