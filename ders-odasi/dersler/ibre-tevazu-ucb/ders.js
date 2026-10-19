/* İbremetre · Tevâzu — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Küçümseme · Tevâzu · Ucb). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevazu-ucb",
 "ad": "Tevâzu (Küçümseme · Ucb): İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "benlik",
 "muzik": "benlik",
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
     "huy": "Tevâzu",
     "huyAnahtar": "Tevâzu",
     "olculen": "Güzel yanlarıma bakışım",
     "kanca": "Bende özel bir şey yok.",
     "uclar": {
      "az": "Küçümseme",
      "orta": "Tevâzu",
      "fazla": "Ucb"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tevâzu",
     "cumle": "Bende özel bir şey yok.",
     "uclar": {
      "az": "Küçümseme",
      "orta": "Tevâzu",
      "fazla": "Ucb"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi kendi yeteneğini küçümsüyor, önemsiz sayıyor: sol uca (Küçümseme) yakın. Başka okumada güzel bir yeteneğin kendi marifeti olmadığını, Allahü teâlâ’nın verdiği bir nimet olduğunu biliyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an güzel yanlarımıza nasıl baktığımıza bakar. Tevâzu; nimetin Allahü teâlâ’dan olduğunu bilerek alçakgönüllü olmaktır: ne yeteneğini küçümsemek ne de kendine hayran olmak.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tevâzu",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Küçümseme",
      "orta": "Tevâzu",
      "fazla": "Ucb"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Kendi yeteneğini küçümsemek neye benziyor?",
       "ad": "Küçümseme",
       "soz": "Bende özel bir şey yok, herkes benden iyi.",
       "eylem": "egil",
       "zincir": [
        "Yeteneği kullanılmadığı için gelişmez.",
        "Denemekten ve paylaşmaktan çekinir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bu yeteneğim önemsiz; kimseye göstermeye değmez.",
          "dogru": true,
          "not": "Küçümseme, kendi yeteneğini ve güzel yanlarını önemsiz saymaktır; kendini değersiz sanmaya kadar gidebilir. Güzel yanı görmemek, nimeti görmemek demektir. Böyle hissedince güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Bu yeteneği bana Allahü teâlâ verdi; şükrederim.",
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
        "ad": "Küçümseme",
        "soz": "Bende"
       },
       "zincirAnahtar": [
        "Yeteneği",
        "Denemekten"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kendine hayran olan kişi neyi göremez?",
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
          "m": "Bu yeteneğim önemsiz; kimseye göstermeye değmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: küçümsemenin sesi."
         },
         {
          "m": "Bu yeteneği bana Allahü teâlâ verdi; şükrederim.",
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
       "ad": "Tevâzu",
       "soz": "Güzel yanım var; Allahü teâlâ verdi, şükrederim.",
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
          "not": "Tevâzu, nimetin Allahü teâlâ’dan olduğunu bilerek alçakgönüllü olmaktır."
         },
         {
          "m": "Bu yeteneğim önemsiz; kimseye göstermeye değmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: küçümsemenin sesi."
         },
         {
          "m": "Bu güzellik bende; benim kadar iyisi yok!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: ucbun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tevâzu",
        "soz": "Güzel"
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
     "huy": "Tevâzu",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Küçümseme",
      "orta": "Tevâzu",
      "fazla": "Ucb"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "siir",
       "baslik": "Şiir okuma",
       "tetik": "Sınıf müsameresi için öğretmen, şiir okuyacak birini arıyor. Sesinin güzel olduğunu biliyorsun.",
       "secenekler": [
        {
         "m": "Bende özel bir şey yok; bu işi başkası okusun.",
         "zon": "az",
         "sonuc": "Güzel sesin sahnede duyulmuyor; deneme fırsatı da kaçıyor.",
         "not": "İbre sola kaydı: yeteneğini küçümsemek, nimeti kullanmamaktır.",
         "ses": "s1az"
        },
        {
         "m": "Elbette ben okurum; benden güzel okuyan yok, kimse denemesin!",
         "zon": "fazla",
         "sonuc": "Arkadaşların denemekten vazgeçiyor; sınıfın neşesi azalıyor.",
         "not": "İbre sağa kaydı: kendine hayranlık, başkalarının yolunu kapatır.",
         "ses": "s1fa"
        },
        {
         "m": "Okurum; sesimi Allahü teâlâ verdi, arkadaşlarım da denesin.",
         "zon": "orta",
         "sonuc": "Güzel bir okuma oluyor; başka arkadaşlar da sıra alıyor.",
         "not": "İbre ortada: yeteneği bilip kullandın ve başkalarına da yer açtın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "proje",
       "baslik": "Grup projesi",
       "tetik": "Grup projesinde resim çizmek senin iyi olduğun bir iş. Grup, bu kısmı kimin yapacağını soruyor.",
       "secenekler": [
        {
         "m": "Ben bir şey bilmiyorum; siz yapın, benden bir şey olmaz.",
         "zon": "az",
         "sonuc": "Ekip senin güçlü yanından yoksun kalıyor; sen de kendini denemekten uzaklaşıyorsun.",
         "not": "İbre sola kaydı: yeteneğini küçümsemek, ekibi de seni de eksik bırakır.",
         "ses": "s2az"
        },
        {
         "m": "Hepsini ben yaparım; sizin elinizden bu iş gelmez!",
         "zon": "fazla",
         "sonuc": "Arkadaşların kenara çekiliyor; proje tek başına senin yükün oluyor.",
         "not": "İbre sağa kaydı: kendine hayranlık, başkasının katkısını görünmez kılar.",
         "ses": "s2fa"
        },
        {
         "m": "Çizimi ben yaparım; siz de iyi olduğunuz kısımları alın.",
         "zon": "orta",
         "sonuc": "Herkes payını alıyor; proje birlikte güzelleşiyor.",
         "not": "İbre ortada: kendi yeteneğini bildin, başkalarınınkini de kıymetli saydın.",
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
       "ad": "Az · Küçümseme",
       "aciklama": "Yeteneğini küçümsemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tevâzu",
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
       "metin": "Yeteneği olduğu hâlde “bu işi benden iyi yapan çok” deyip yarışmaya katılmaz.",
       "alan": "az",
       "ipucu": "Yeteneğini küçümsüyor."
      },
      {
       "id": "k2",
       "metin": "Hep kendi başarısını anlatır, başkalarının işini beğenmez.",
       "alan": "fazla",
       "ipucu": "Kendine hayran."
      },
      {
       "id": "k3",
       "metin": "Güzel bir yanı olduğunu bilir, şükreder; başkalarının yeteneğine de yer açar.",
       "alan": "orta",
       "ipucu": "Nimeti biliyor, alçakgönüllü."
      },
      {
       "id": "k4",
       "metin": "“Bende özel bir şey yok” der, çizimini çekmeceye saklar.",
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
        "Bir işte iyi olduğumu bilirken",
        "Bir yarışmada ya da sınavda başarılı olunca",
        "Kendimi başkalarından kötü görünce",
        "Yaptığım işi çok beğenince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Güzel yanımı küçümsemeden de büyütmeden de kullanacağım",
        "Başkasının güzel yanını da fark edip söyleyeceğim",
        "Kendimi küçük hissedersem güvendiğim bir yetişkinle konuşacağım"
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
       "baslik": "Tevâzu",
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
   "m": "Birçok güzel huy bir ibre gibidir. Tevâzu, güzel yanlarıma nasıl baktığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
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
     "Tevâzu,",
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
   "sure": 8.37,
   "m": "Sol uçta Küçümseme. Bende özel bir şey yok, herkes benden iyi. Güzel resim çizer ama kimseye göstermeden çekmecesine koyar.",
   "k": [
    [
     "Sol",
     0.03,
     0.214
    ],
    [
     "uçta",
     0.214,
     0.583
    ],
    [
     "Küçümseme.",
     0.583,
     1.32
    ],
    [
     "Bende",
     1.83,
     2.126
    ],
    [
     "özel",
     2.126,
     2.421
    ],
    [
     "bir",
     2.421,
     2.569
    ],
    [
     "şey",
     2.569,
     2.717
    ],
    [
     "yok,",
     2.717,
     2.865
    ],
    [
     "herkes",
     3.13,
     3.418
    ],
    [
     "benden",
     3.418,
     3.707
    ],
    [
     "iyi.",
     3.707,
     3.995
    ],
    [
     "Güzel",
     4.665,
     4.995
    ],
    [
     "resim",
     4.995,
     5.326
    ],
    [
     "çizer",
     5.326,
     5.656
    ],
    [
     "ama",
     5.656,
     5.987
    ],
    [
     "kimseye",
     5.987,
     6.482
    ],
    [
     "göstermeden",
     6.482,
     7.143
    ],
    [
     "çekmecesine",
     7.143,
     7.969
    ],
    [
     "koyar.",
     7.969,
     8.3
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.543,
   "m": "Sonra ne olur? Yeteneği kullanılmadığı için gelişmez. Denemekten ve paylaşmaktan çekinir.",
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
     "Yeteneği",
     1.08,
     1.632
    ],
    [
     "kullanılmadığı",
     1.632,
     2.46
    ],
    [
     "için",
     2.46,
     2.736
    ],
    [
     "gelişmez.",
     2.736,
     3.15
    ],
    [
     "Denemekten",
     3.6,
     4.224
    ],
    [
     "ve",
     4.224,
     4.381
    ],
    [
     "paylaşmaktan",
     4.381,
     5.005
    ],
    [
     "çekinir.",
     5.005,
     5.473
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
   "sure": 10.088,
   "m": "Tam kararında Tevâzu. Güzel yanım var; Allahü teâlâ verdi, şükrederim. Güzel yanını bilir, şükreder ve öğrenmeye devam eder.",
   "k": [
    [
     "Tam",
     0.03,
     0.246
    ],
    [
     "kararında",
     0.246,
     1.111
    ],
    [
     "Tevâzu.",
     1.111,
     1.76
    ],
    [
     "Güzel",
     2.32,
     2.646
    ],
    [
     "yanım",
     2.646,
     2.972
    ],
    [
     "var;",
     2.972,
     3.135
    ],
    [
     "Allahü",
     3.61,
     4.058
    ],
    [
     "teâlâ",
     4.058,
     4.506
    ],
    [
     "verdi,",
     4.506,
     4.805
    ],
    [
     "şükrederim.",
     5.105,
     5.735
    ],
    [
     "Güzel",
     6.16,
     6.477
    ],
    [
     "yanını",
     6.477,
     6.953
    ],
    [
     "bilir,",
     6.953,
     7.27
    ],
    [
     "şükreder",
     7.425,
     8.073
    ],
    [
     "ve",
     8.073,
     8.289
    ],
    [
     "öğrenmeye",
     8.289,
     9.154
    ],
    [
     "devam",
     9.154,
     9.586
    ],
    [
     "eder.",
     9.586,
     10.018
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
   "sure": 5.674,
   "m": "Sınıf müsameresi için öğretmen, şiir okuyacak birini arıyor. Sesinin güzel olduğunu biliyorsun. Ne yaparsın?",
   "k": [
    [
     "Sınıf",
     0.03,
     0.263
    ],
    [
     "müsameresi",
     0.263,
     0.844
    ],
    [
     "için",
     0.844,
     1.076
    ],
    [
     "öğretmen,",
     1.076,
     1.425
    ],
    [
     "şiir",
     1.425,
     1.657
    ],
    [
     "okuyacak",
     1.657,
     2.123
    ],
    [
     "birini",
     2.123,
     2.471
    ],
    [
     "arıyor.",
     2.471,
     2.82
    ],
    [
     "Sesinin",
     3.245,
     3.61
    ],
    [
     "güzel",
     3.61,
     3.853
    ],
    [
     "olduğunu",
     3.853,
     4.339
    ],
    [
     "biliyorsun.",
     4.339,
     4.825
    ],
    [
     "Ne",
     5.09,
     5.218
    ],
    [
     "yaparsın?",
     5.218,
     5.604
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.037,
   "m": "Güzel sesin sahnede duyulmuyor; deneme fırsatı da kaçıyor.",
   "k": [
    [
     "Güzel",
     0.03,
     0.301
    ],
    [
     "sesin",
     0.301,
     0.572
    ],
    [
     "sahnede",
     0.572,
     0.978
    ],
    [
     "duyulmuyor;",
     0.978,
     1.52
    ],
    [
     "deneme",
     1.87,
     2.199
    ],
    [
     "fırsatı",
     2.199,
     2.528
    ],
    [
     "da",
     2.528,
     2.638
    ],
    [
     "kaçıyor.",
     2.638,
     2.967
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.358,
   "m": "Arkadaşların denemekten vazgeçiyor; sınıfın neşesi azalıyor.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.724
    ],
    [
     "denemekten",
     0.724,
     1.28
    ],
    [
     "vazgeçiyor;",
     1.28,
     1.835
    ],
    [
     "sınıfın",
     2.14,
     2.485
    ],
    [
     "neşesi",
     2.485,
     2.829
    ],
    [
     "azalıyor.",
     2.829,
     3.288
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.137,
   "m": "Güzel bir okuma oluyor; başka arkadaşlar da sıra alıyor.",
   "k": [
    [
     "Güzel",
     0.03,
     0.287
    ],
    [
     "bir",
     0.287,
     0.415
    ],
    [
     "okuma",
     0.415,
     0.8
    ],
    [
     "oluyor;",
     0.8,
     1.185
    ],
    [
     "başka",
     1.615,
     1.857
    ],
    [
     "arkadaşlar",
     1.857,
     2.341
    ],
    [
     "da",
     2.341,
     2.462
    ],
    [
     "sıra",
     2.462,
     2.704
    ],
    [
     "alıyor.",
     2.704,
     3.067
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.067,
   "m": "Grup projesinde resim çizmek senin iyi olduğun bir iş. Grup, bu kısmı kimin yapacağını soruyor. Ne yaparsın?",
   "k": [
    [
     "Grup",
     0.03,
     0.178
    ],
    [
     "projesinde",
     0.178,
     0.77
    ],
    [
     "resim",
     0.77,
     1.066
    ],
    [
     "çizmek",
     1.066,
     1.362
    ],
    [
     "senin",
     1.362,
     1.659
    ],
    [
     "iyi",
     1.659,
     1.955
    ],
    [
     "olduğun",
     1.955,
     2.399
    ],
    [
     "bir",
     2.399,
     2.547
    ],
    [
     "iş.",
     2.547,
     2.695
    ],
    [
     "Grup,",
     2.98,
     3.295
    ],
    [
     "bu",
     3.495,
     3.627
    ],
    [
     "kısmı",
     3.627,
     3.89
    ],
    [
     "kimin",
     3.89,
     4.153
    ],
    [
     "yapacağını",
     4.153,
     4.81
    ],
    [
     "soruyor.",
     4.81,
     5.205
    ],
    [
     "Ne",
     5.45,
     5.587
    ],
    [
     "yaparsın?",
     5.587,
     5.997
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 5.387,
   "m": "Ekip senin güçlü yanından yoksun kalıyor; sen de kendini denemekten uzaklaşıyorsun.",
   "k": [
    [
     "Ekip",
     0.03,
     0.379
    ],
    [
     "senin",
     0.379,
     0.729
    ],
    [
     "güçlü",
     0.729,
     1.078
    ],
    [
     "yanından",
     1.078,
     1.602
    ],
    [
     "yoksun",
     1.602,
     1.951
    ],
    [
     "kalıyor;",
     1.951,
     2.475
    ],
    [
     "sen",
     2.78,
     2.949
    ],
    [
     "de",
     2.949,
     3.118
    ],
    [
     "kendini",
     3.118,
     3.626
    ],
    [
     "denemekten",
     3.626,
     4.302
    ],
    [
     "uzaklaşıyorsun.",
     4.302,
     5.317
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.234,
   "m": "Arkadaşların kenara çekiliyor; proje tek başına senin yükün oluyor.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.776
    ],
    [
     "kenara",
     0.776,
     1.223
    ],
    [
     "çekiliyor;",
     1.223,
     1.82
    ],
    [
     "proje",
     1.97,
     2.308
    ],
    [
     "tek",
     2.308,
     2.476
    ],
    [
     "başına",
     2.476,
     2.983
    ],
    [
     "senin",
     2.983,
     3.32
    ],
    [
     "yükün",
     3.32,
     3.658
    ],
    [
     "oluyor.",
     3.658,
     4.164
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.177,
   "m": "Herkes payını alıyor; proje birlikte güzelleşiyor.",
   "k": [
    [
     "Herkes",
     0.03,
     0.299
    ],
    [
     "payını",
     0.299,
     0.702
    ],
    [
     "alıyor;",
     0.702,
     1.105
    ],
    [
     "proje",
     1.44,
     1.773
    ],
    [
     "birlikte",
     1.773,
     2.274
    ],
    [
     "güzelleşiyor.",
     2.274,
     3.107
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
   "sure": 8.218,
   "m": "Bu cümle bilerek çift anlamlı. Kendi yeteneğini küçümseyen biri söylüyorsa sol uca yakın. Yeteneğin bir nimet olduğunu bilen biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.176
    ],
    [
     "cümle",
     0.176,
     0.467
    ],
    [
     "bilerek",
     0.467,
     0.903
    ],
    [
     "çift",
     0.903,
     1.048
    ],
    [
     "anlamlı.",
     1.048,
     1.485
    ],
    [
     "Kendi",
     1.89,
     2.137
    ],
    [
     "yeteneğini",
     2.137,
     2.754
    ],
    [
     "küçümseyen",
     2.754,
     3.248
    ],
    [
     "biri",
     3.248,
     3.494
    ],
    [
     "söylüyorsa",
     3.494,
     3.988
    ],
    [
     "sol",
     3.988,
     4.111
    ],
    [
     "uca",
     4.111,
     4.358
    ],
    [
     "yakın.",
     4.358,
     4.605
    ],
    [
     "Yeteneğin",
     4.81,
     5.344
    ],
    [
     "bir",
     5.344,
     5.478
    ],
    [
     "nimet",
     5.478,
     5.745
    ],
    [
     "olduğunu",
     5.745,
     6.279
    ],
    [
     "bilen",
     6.279,
     6.546
    ],
    [
     "biri",
     6.546,
     6.813
    ],
    [
     "söylüyorsa",
     6.813,
     7.347
    ],
    [
     "orta",
     7.347,
     7.614
    ],
    [
     "uca",
     7.614,
     7.881
    ],
    [
     "yakın.",
     7.881,
     8.148
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
