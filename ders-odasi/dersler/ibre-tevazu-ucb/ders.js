/* İbremetre · Tevazu — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Aşağılık · Tevazu · Ucb). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevazu-ucb",
 "ad": "Tevazu (Aşağılık · Ucb): İbren Nerede?",
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
     "huy": "Tevazu",
     "huyAnahtar": "Tevazu",
     "olculen": "Güzel yanlarıma bakışım",
     "kanca": "Bende özel bir şey yok.",
     "uclar": {
      "az": "Aşağılık",
      "orta": "Tevazu",
      "fazla": "Ucb"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tevazu",
     "cumle": "Bende özel bir şey yok.",
     "uclar": {
      "az": "Aşağılık",
      "orta": "Tevazu",
      "fazla": "Ucb"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi kendini değersiz görüyor: sol uca (Aşağılık) yakın. Başka okumada güzel bir yeteneğin kendi marifeti olmadığını, Allahü teâlânın verdiği bir nimet olduğunu biliyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an güzel yanlarımıza nasıl baktığımıza bakar. Tevazu; nimetin Allahü teâlâdan olduğunu bilerek alçakgönüllü olmaktır: ne kendini küçültmek ne de kendine hayran olmak.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tevazu",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Aşağılık",
      "orta": "Tevazu",
      "fazla": "Ucb"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Kendini değersiz görmek neye benziyor?",
       "ad": "Aşağılık",
       "soz": "Ben hiçbir şeye yaramam, çizimim de kötü.",
       "eylem": "egil",
       "zincir": [
        "Sahip olduğu güzel yeteneği göremez.",
        "Denemekten ve paylaşmaktan çekinir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bende güzel bir şey yok; herkes benden iyi.",
          "dogru": true,
          "not": "Aşağılık, kendini değersiz ve yetersiz görmektir. Güzel yanı görmemek, nimeti görmemek demektir. Böyle hissedince güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Bu güzel yeteneği bana Allahü teâlâ verdi; şükrederim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevazunun sesi."
         },
         {
          "m": "Bu güzellik bende; benim kadar iyisi yok!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: ucbun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Aşağılık",
        "soz": "Ben"
       },
       "zincirAnahtar": [
        "Sahip",
        "Denemekten"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kendine hayran olan kişi neyi kaçırır?",
       "ad": "Ucb",
       "soz": "Bu resmi ben çizdim, benden iyisi yok!",
       "eylem": "isaret",
       "zincir": [
        "Başkalarının güzel işlerini göremez.",
        "Gelişmek için yeni şeyler öğrenmeyi bırakır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben zaten çok iyiyim; herkes bana hayran olmalı.",
          "dogru": true,
          "not": "Ucb, kendi bilgisine ve meziyetine hayran olmaktır. Güzel yanın bir nimet olduğunu unutturur."
         },
         {
          "m": "Bende güzel bir şey yok; herkes benden iyi.",
          "dogru": false,
          "not": "Bu sol ucun sesi: aşağılığın sesi."
         },
         {
          "m": "Bu güzel yeteneği bana Allahü teâlâ verdi; şükrederim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevazunun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Ucb",
        "soz": "Bu"
       },
       "zincirAnahtar": [
        "Başkalarının",
        "Gelişmek"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tevazu",
       "soz": "Teşekkür ederim; bu yeteneği Allahü teâlâ verdi.",
       "eylem": "konus",
       "zincir": [
        "Güzel yanını şükürle taşır.",
        "Başkalarının güzel yanlarını da takdir eder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bu yeteneği bana Allahü teâlâ verdi; şükrederim.",
          "dogru": true,
          "not": "Tevazu, nimetin Allahü teâlâdan olduğunu bilerek alçakgönüllü olmaktır."
         },
         {
          "m": "Bende güzel bir şey yok; herkes benden iyi.",
          "dogru": false,
          "not": "Bu sol ucun sesi: aşağılığın sesi."
         },
         {
          "m": "Bu güzellik bende; benim kadar iyisi yok!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: ucbun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tevazu",
        "soz": "Teşekkür"
       },
       "zincirAnahtar": [
        "Güzel",
        "Başkalarının"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tevazu",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Aşağılık",
      "orta": "Tevazu",
      "fazla": "Ucb"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "sergi",
       "baslik": "Resim sergisi",
       "tetik": "Okul resim sergisinde çizimin çok beğenildi. Öğretmenin, çok güzel olmuş, diyor.",
       "secenekler": [
        {
         "m": "Hayır, çok kötü; benim çizdiğim şeyin değeri yok.",
         "zon": "az",
         "sonuc": "Öğretmenin güzel sözü havada kalıyor; kendini çizmekten soğutuyorsun.",
         "not": "İbre sola kaydı: güzel yanını görmemek, nimeti de görmemektir.",
         "ses": "s1az"
        },
        {
         "m": "Evet, biliyorum; benden iyi çizen yok zaten.",
         "zon": "fazla",
         "sonuc": "Arkadaşlarının çizimlerine hiç bakmıyorsun; gelişmen duruyor.",
         "not": "İbre sağa kaydı: kendine hayran olmak, öğrenmenin yolunu kapatır.",
         "ses": "s1fa"
        },
        {
         "m": "Teşekkür ederim; Allahü teâlâ bu yeteneği verdi, çalışıyorum.",
         "zon": "orta",
         "sonuc": "Öğretmenin gülümsüyor; arkadaşlarının resimlerine de bakıyorsun.",
         "not": "İbre ortada: teşekkür ettin, nimeti bilip şükrettin ve gelişmeye devam ettin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "okuma",
       "baslik": "Okuma yarışı",
       "tetik": "Hızlı okuma yarışmasında birinci oldun. Arkadaşların seni tebrik ediyor.",
       "secenekler": [
        {
         "m": "Bir şey yapmadım; ben birinci olacak biri değilim.",
         "zon": "az",
         "sonuc": "Arkadaşların tebriklerinin karşısında mahcup kalıyorsun; sevinç kaçıyor.",
         "not": "İbre sola kaydı: kendini küçültmek, güzel bir günü de küçültür.",
         "ses": "s2az"
        },
        {
         "m": "Tabii, ben herkesten zekiyim; bu benim marifetim!",
         "zon": "fazla",
         "sonuc": "Arkadaşların sessizleşiyor; tebrik edenlerin sevinci azalıyor.",
         "not": "İbre sağa kaydı: kendine hayranlık, arkadaşların gönlünü uzaklaştırır.",
         "ses": "s2fa"
        },
        {
         "m": "Sağ olun; çok çalıştım ve bu nimet için şükrediyorum.",
         "zon": "orta",
         "sonuc": "Arkadaşlarınla birlikte seviniyorsunuz.",
         "not": "İbre ortada: emeğini ve nimeti birlikte bilmek, alçakgönüllülüktür.",
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
       "ad": "Az · Aşağılık",
       "aciklama": "Kendini değersiz görmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tevazu",
       "aciklama": "Nimeti bilip alçakgönüllü olmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Ucb",
       "aciklama": "Kendine hayran olmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Güzel bir iş yapınca “aslında kötü oldu” diyerek kendini ezer.",
       "alan": "az",
       "ipucu": "Kendini değersiz görüyor."
      },
      {
       "id": "k2",
       "metin": "Hep kendi başarısını anlatır, başkalarının işini beğenmez.",
       "alan": "fazla",
       "ipucu": "Kendine hayran."
      },
      {
       "id": "k3",
       "metin": "Güzel sözü duyunca teşekkür eder ve bu nimet için şükreder.",
       "alan": "orta",
       "ipucu": "Nimeti biliyor, alçakgönüllü."
      },
      {
       "id": "k4",
       "metin": "Kompliman alınca “bende bir şey yok” der, çizimini saklar.",
       "alan": "az",
       "ipucu": "Güzel yanını görmüyor."
      },
      {
       "id": "k5",
       "metin": "Aynaya bakıp kendi yeteneğine hayran olur: “Benim gibisi yok.”",
       "alan": "fazla",
       "ipucu": "Kendini beğeniyor."
      },
      {
       "id": "k6",
       "metin": "Yaptığını beğenir ama daha iyisini öğrenmeye devam eder.",
       "alan": "orta",
       "ipucu": "Hem şükrediyor hem gelişiyor."
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
        "Biri beni takdir edince",
        "Bir yarışmada ya da sınavda başarılı olunca",
        "Kendimi başkalarından kötü görünce",
        "Yaptığım işi çok beğenince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Takdir edilince “teşekkür ederim” deyip şükredeceğim",
        "Başkasının güzel yanını da fark edip söyleyeceğim",
        "Kendimi küçültmeden de büyütmeden anlatacağım"
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
       "baslik": "Tevazu",
       "metin": "şükredip alçakgönüllü olmak",
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
   "sure": 1.53,
   "m": "Bende özel bir şey yok.",
   "k": [
    [
     "Bende",
     0.03,
     0.439
    ],
    [
     "özel",
     0.439,
     0.847
    ],
    [
     "bir",
     0.847,
     1.051
    ],
    [
     "şey",
     1.051,
     1.256
    ],
    [
     "yok.",
     1.256,
     1.46
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.767,
   "m": "Birçok güzel huy bir ibre gibidir. Tevazu, güzel yanlarıma nasıl baktığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.453
    ],
    [
     "güzel",
     0.453,
     0.875
    ],
    [
     "huy",
     0.875,
     1.087
    ],
    [
     "bir",
     1.087,
     1.298
    ],
    [
     "ibre",
     1.298,
     1.721
    ],
    [
     "gibidir.",
     1.721,
     2.355
    ],
    [
     "Tevazu,",
     2.895,
     3.605
    ],
    [
     "güzel",
     3.745,
     4.264
    ],
    [
     "yanlarıma",
     4.264,
     5.301
    ],
    [
     "nasıl",
     5.301,
     5.819
    ],
    [
     "baktığımı",
     5.819,
     6.856
    ],
    [
     "ölçer.",
     6.856,
     7.375
    ],
    [
     "İbre",
     7.565,
     8.005
    ],
    [
     "üç",
     8.005,
     8.225
    ],
    [
     "yerde",
     8.225,
     8.665
    ],
    [
     "durabilir:",
     8.665,
     9.545
    ],
    [
     "az,",
     10.02,
     10.74
    ],
    [
     "kararında,",
     11.27,
     11.555
    ],
    [
     "fazla.",
     11.555,
     11.697
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
   "sure": 7.895,
   "m": "Sol uçta Aşağılık. Ben hiçbir şeye yaramam, çizimim de kötü. Güzel bir resim çizmiş ama övgüyü duyunca başını eğer.",
   "k": [
    [
     "Sol",
     0.03,
     0.211
    ],
    [
     "uçta",
     0.211,
     0.572
    ],
    [
     "Aşağılık.",
     0.572,
     1.295
    ],
    [
     "Ben",
     1.38,
     1.597
    ],
    [
     "hiçbir",
     1.597,
     2.032
    ],
    [
     "şeye",
     2.032,
     2.467
    ],
    [
     "yaramam,",
     2.467,
     3.12
    ],
    [
     "çizimim",
     3.455,
     3.868
    ],
    [
     "de",
     3.868,
     4.005
    ],
    [
     "kötü.",
     4.005,
     4.28
    ],
    [
     "Güzel",
     4.635,
     4.954
    ],
    [
     "bir",
     4.954,
     5.113
    ],
    [
     "resim",
     5.113,
     5.432
    ],
    [
     "çizmiş",
     5.432,
     5.751
    ],
    [
     "ama",
     5.751,
     6.07
    ],
    [
     "övgüyü",
     6.07,
     6.549
    ],
    [
     "duyunca",
     6.549,
     7.027
    ],
    [
     "başını",
     7.027,
     7.506
    ],
    [
     "eğer.",
     7.506,
     7.825
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.537,
   "m": "Sonra ne olur? Sahip olduğu güzel yeteneği göremez. Denemekten ve paylaşmaktan çekinir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.28
    ],
    [
     "ne",
     0.28,
     0.405
    ],
    [
     "olur?",
     0.405,
     0.655
    ],
    [
     "Sahip",
     1.135,
     1.402
    ],
    [
     "olduğu",
     1.402,
     1.803
    ],
    [
     "güzel",
     1.803,
     2.07
    ],
    [
     "yeteneği",
     2.07,
     2.604
    ],
    [
     "göremez.",
     2.604,
     3.005
    ],
    [
     "Denemekten",
     3.405,
     4.092
    ],
    [
     "ve",
     4.092,
     4.264
    ],
    [
     "paylaşmaktan",
     4.264,
     4.952
    ],
    [
     "çekinir.",
     4.952,
     5.467
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
   "sure": 6.209,
   "m": "Sağ uçta Ucb. Bu resmi ben çizdim, benden iyisi yok! Kendini beğenir, başkasınınkine bakmaz.",
   "k": [
    [
     "Sağ",
     0.03,
     0.214
    ],
    [
     "uçta",
     0.214,
     0.581
    ],
    [
     "Ucb.",
     0.581,
     0.765
    ],
    [
     "Bu",
     0.89,
     0.953
    ],
    [
     "resmi",
     0.953,
     1.077
    ],
    [
     "ben",
     1.077,
     1.14
    ],
    [
     "çizdim,",
     1.14,
     1.265
    ],
    [
     "benden",
     1.825,
     2.128
    ],
    [
     "iyisi",
     2.128,
     2.583
    ],
    [
     "yok!",
     2.583,
     2.735
    ],
    [
     "Kendini",
     2.985,
     3.945
    ],
    [
     "beğenir,",
     3.945,
     4.905
    ],
    [
     "başkasınınkine",
     4.98,
     5.849
    ],
    [
     "bakmaz.",
     5.849,
     6.139
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.01,
   "m": "Sonra ne olur? Başkalarının güzel işlerini göremez. Gelişmek için yeni şeyler öğrenmeyi bırakır.",
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
     "Başkalarının",
     1.1,
     1.757
    ],
    [
     "güzel",
     1.757,
     2.02
    ],
    [
     "işlerini",
     2.02,
     2.546
    ],
    [
     "göremez.",
     2.546,
     2.94
    ],
    [
     "Gelişmek",
     3.345,
     3.831
    ],
    [
     "için",
     3.831,
     4.156
    ],
    [
     "yeni",
     4.156,
     4.48
    ],
    [
     "şeyler",
     4.48,
     4.804
    ],
    [
     "öğrenmeyi",
     4.804,
     5.453
    ],
    [
     "bırakır.",
     5.453,
     5.939
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
   "sure": 9.647,
   "m": "Tam kararında Tevazu. Teşekkür ederim; bu yeteneği Allahü teâlâ verdi. Övgüyü sakin karşılar, şükreder ve gelişmeye devam eder.",
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
     "Tevazu.",
     1.024,
     1.62
    ],
    [
     "Teşekkür",
     2.275,
     2.615
    ],
    [
     "ederim;",
     2.615,
     2.955
    ],
    [
     "bu",
     3.465,
     3.587
    ],
    [
     "yeteneği",
     3.587,
     4.073
    ],
    [
     "Allahü",
     4.073,
     4.437
    ],
    [
     "teâlâ",
     4.437,
     4.802
    ],
    [
     "verdi.",
     4.802,
     5.045
    ],
    [
     "Övgüyü",
     5.71,
     6.241
    ],
    [
     "sakin",
     6.241,
     6.594
    ],
    [
     "karşılar,",
     6.594,
     7.125
    ],
    [
     "şükreder",
     7.4,
     7.944
    ],
    [
     "ve",
     7.944,
     8.126
    ],
    [
     "gelişmeye",
     8.126,
     8.851
    ],
    [
     "devam",
     8.851,
     9.214
    ],
    [
     "eder.",
     9.214,
     9.577
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.186,
   "m": "Sonra ne olur? Güzel yanını şükürle taşır. Başkalarının güzel yanlarını da takdir eder.",
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
     "Güzel",
     1.21,
     1.601
    ],
    [
     "yanını",
     1.601,
     2.188
    ],
    [
     "şükürle",
     2.188,
     2.774
    ],
    [
     "taşır.",
     2.774,
     3.165
    ],
    [
     "Başkalarının",
     3.6,
     4.386
    ],
    [
     "güzel",
     4.386,
     4.701
    ],
    [
     "yanlarını",
     4.701,
     5.329
    ],
    [
     "da",
     5.329,
     5.487
    ],
    [
     "takdir",
     5.487,
     5.801
    ],
    [
     "eder.",
     5.801,
     6.116
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
   "sure": 6.111,
   "m": "Okul resim sergisinde çizimin çok beğenildi. Öğretmenin, çok güzel olmuş, diyor. Ne yaparsın?",
   "k": [
    [
     "Okul",
     0.03,
     0.364
    ],
    [
     "resim",
     0.364,
     0.699
    ],
    [
     "sergisinde",
     0.699,
     1.368
    ],
    [
     "çizimin",
     1.368,
     1.869
    ],
    [
     "çok",
     1.869,
     2.036
    ],
    [
     "beğenildi.",
     2.036,
     2.705
    ],
    [
     "Öğretmenin,",
     2.985,
     3.825
    ],
    [
     "çok",
     4.09,
     4.297
    ],
    [
     "güzel",
     4.297,
     4.711
    ],
    [
     "olmuş,",
     4.711,
     5.125
    ],
    [
     "diyor.",
     5.665,
     5.79
    ],
    [
     "Ne",
     5.79,
     5.853
    ],
    [
     "yaparsın?",
     5.853,
     6.041
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.006,
   "m": "Öğretmenin güzel sözü havada kalıyor; kendini çizmekten soğutuyorsun.",
   "k": [
    [
     "Öğretmenin",
     0.03,
     0.609
    ],
    [
     "güzel",
     0.609,
     0.898
    ],
    [
     "sözü",
     0.898,
     1.187
    ],
    [
     "havada",
     1.187,
     1.621
    ],
    [
     "kalıyor;",
     1.621,
     2.055
    ],
    [
     "kendini",
     2.32,
     2.761
    ],
    [
     "çizmekten",
     2.761,
     3.201
    ],
    [
     "soğutuyorsun.",
     3.201,
     3.936
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.616,
   "m": "Arkadaşlarının çizimlerine hiç bakmıyorsun; gelişmen duruyor.",
   "k": [
    [
     "Arkadaşlarının",
     0.03,
     0.876
    ],
    [
     "çizimlerine",
     0.876,
     1.58
    ],
    [
     "hiç",
     1.58,
     1.721
    ],
    [
     "bakmıyorsun;",
     1.721,
     2.285
    ],
    [
     "gelişmen",
     2.64,
     3.093
    ],
    [
     "duruyor.",
     3.093,
     3.546
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.647,
   "m": "Öğretmenin gülümsüyor; arkadaşlarının resimlerine de bakıyorsun.",
   "k": [
    [
     "Öğretmenin",
     0.03,
     0.54
    ],
    [
     "gülümsüyor;",
     0.54,
     1.05
    ],
    [
     "arkadaşlarının",
     1.24,
     2.116
    ],
    [
     "resimlerine",
     2.116,
     2.847
    ],
    [
     "de",
     2.847,
     2.993
    ],
    [
     "bakıyorsun.",
     2.993,
     3.577
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.164,
   "m": "Hızlı okuma yarışmasında birinci oldun. Arkadaşların seni tebrik ediyor. Ne yaparsın?",
   "k": [
    [
     "Hızlı",
     0.03,
     0.283
    ],
    [
     "okuma",
     0.283,
     0.662
    ],
    [
     "yarışmasında",
     0.662,
     1.293
    ],
    [
     "birinci",
     1.293,
     1.672
    ],
    [
     "oldun.",
     1.672,
     1.925
    ],
    [
     "Arkadaşların",
     2.265,
     3.005
    ],
    [
     "seni",
     3.005,
     3.3
    ],
    [
     "tebrik",
     3.3,
     3.596
    ],
    [
     "ediyor.",
     3.596,
     4.04
    ],
    [
     "Ne",
     4.495,
     4.645
    ],
    [
     "yaparsın?",
     4.645,
     5.094
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.868,
   "m": "Arkadaşların tebriklerinin karşısında mahcup kalıyorsun; sevinç kaçıyor.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.678
    ],
    [
     "tebriklerinin",
     0.678,
     1.325
    ],
    [
     "karşısında",
     1.325,
     1.843
    ],
    [
     "mahcup",
     1.843,
     2.102
    ],
    [
     "kalıyorsun;",
     2.102,
     2.62
    ],
    [
     "sevinç",
     3.0,
     3.319
    ],
    [
     "kaçıyor.",
     3.319,
     3.798
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.354,
   "m": "Arkadaşların sessizleşiyor; tebrik edenlerin sevinci azalıyor.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.688
    ],
    [
     "sessizleşiyor;",
     0.688,
     1.345
    ],
    [
     "tebrik",
     1.47,
     1.749
    ],
    [
     "edenlerin",
     1.749,
     2.307
    ],
    [
     "sevinci",
     2.307,
     2.726
    ],
    [
     "azalıyor.",
     2.726,
     3.284
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 2.118,
   "m": "Arkadaşlarınla birlikte seviniyorsunuz.",
   "k": [
    [
     "Arkadaşlarınla",
     0.03,
     0.837
    ],
    [
     "birlikte",
     0.837,
     1.241
    ],
    [
     "seviniyorsunuz.",
     1.241,
     2.048
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
   "sure": 9.158,
   "m": "Bu cümle bilerek çift anlamlı. Kendini değersiz gören biri söylüyorsa sol uca yakın. Yeteneğin bir nimet olduğunu bilen biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.172
    ],
    [
     "cümle",
     0.172,
     0.456
    ],
    [
     "bilerek",
     0.456,
     0.882
    ],
    [
     "çift",
     0.882,
     1.024
    ],
    [
     "anlamlı.",
     1.024,
     1.45
    ],
    [
     "Kendini",
     1.96,
     2.369
    ],
    [
     "değersiz",
     2.369,
     2.778
    ],
    [
     "gören",
     2.778,
     3.051
    ],
    [
     "biri",
     3.051,
     3.323
    ],
    [
     "söylüyorsa",
     3.323,
     3.868
    ],
    [
     "sol",
     3.868,
     4.005
    ],
    [
     "uca",
     4.005,
     4.277
    ],
    [
     "yakın.",
     4.277,
     4.55
    ],
    [
     "Yeteneğin",
     5.07,
     5.713
    ],
    [
     "bir",
     5.713,
     5.874
    ],
    [
     "nimet",
     5.874,
     6.195
    ],
    [
     "olduğunu",
     6.195,
     6.838
    ],
    [
     "bilen",
     6.838,
     7.159
    ],
    [
     "biri",
     7.159,
     7.481
    ],
    [
     "söylüyorsa",
     7.481,
     8.124
    ],
    [
     "orta",
     8.124,
     8.445
    ],
    [
     "uca",
     8.445,
     8.766
    ],
    [
     "yakın.",
     8.766,
     9.088
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
