/* İbremetre · Kanaat — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Cimrilik · Kanaat · Tamâ‘). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-kanaat-cimrilik",
 "ad": "Kanaat (Cimrilik · Tamâ‘): İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "caba",
 "muzik": "caba",
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
     "huy": "Kanaat",
     "huyAnahtar": "Kanaat",
     "olculen": "Elimdekini paylaşma ve isteme dengem",
     "kanca": "Bu bende kalsın, bana yeter.",
     "uclar": {
      "az": "Cimrilik",
      "orta": "Kanaat",
      "fazla": "Tamâ‘"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Kanaat",
     "cumle": "Bu bende kalsın, bana yeter.",
     "uclar": {
      "az": "Cimrilik",
      "orta": "Kanaat",
      "fazla": "Tamâ‘"
     },
     "yesil": 0.26,
     "hedefZon": "orta",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi elindekiyle yetiniyor ve fazlasını istemiyor: orta uca yakın. Başka okumada elindekini sıkı sıkı kendinde tutup kimseye uzatmıyor: sol uca (Cimrilik) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an elimizdekine nasıl baktığımıza bakar. Kanaat; elindekine razı olup şükretmektir. Razı olan gönül, çoğu zaman paylaşmaya da açıktır. Bu ibre ölçekten çok yönü gösterir: bir uçta elindekini hiç paylaşmamak (cimrilik), öbür uçta gözü doymayıp hep daha istemek (tamâ‘) var.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Kanaat",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Cimrilik",
      "orta": "Kanaat",
      "fazla": "Tamâ‘"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Hiç paylaşmamak neye benziyor?",
       "ad": "Cimrilik",
       "soz": "Bu benim, kimseye vermem.",
       "eylem": "hayir",
       "zincir": [
        "Arkadaşları ona yaklaşmaya çekinir.",
        "Paylaşmanın verdiği sıcaklık hiç tadılmaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Verirsem eksilir; hepsi bende kalsın.",
          "dogru": true,
          "not": "Cimrilik, malını kimseyle paylaşmamaktır. Paylaşınca çoğu zaman dostluk büyür."
         },
         {
          "m": "Bana yeten bir şey var; bir kısmını da paylaşayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: kanaatin sesi."
         },
         {
          "m": "Bende var ama yine de hepsi benim olsun!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: tamânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Cimrilik",
        "soz": "Bu"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Paylaşmanın"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Gözü doymayan kişi neden mutlu olamaz?",
       "ad": "Tamâ‘",
       "soz": "Dolabım oyuncak dolu ama yenisini de isterim!",
       "eylem": "isaret",
       "zincir": [
        "Yeni oyuncak çabuk eskir.",
        "Eldeki güzel şeylerin tadı çıkmaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Biri daha olsa, o zaman tamam!",
          "dogru": true,
          "not": "Tamâ‘, gözü doymayıp hep daha istemektir. Yeni şeyler gönlü her zaman doldurmaz."
         },
         {
          "m": "Verirsem eksilir; hepsi bende kalsın.",
          "dogru": false,
          "not": "Bu sol ucun sesi: cimriliğin sesi."
         },
         {
          "m": "Bana yeten bir şey var; bir kısmını da paylaşayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: kanaatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tamâ‘",
        "soz": "Dolabım"
       },
       "zincirAnahtar": [
        "Yeni",
        "Eldeki"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Kanaat",
       "soz": "Bende olan bana yeter; gel birlikte yiyelim.",
       "eylem": "konus",
       "zincir": [
        "Sofrası küçük de olsa gönlü doyar.",
        "Arkadaşları onun yanında kendini rahat hisseder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bana yeten bir şey var; bir kısmını da paylaşayım.",
          "dogru": true,
          "not": "Kanaat, elindekine razı olup şükretmektir. Razı olan, paylaşmaktan da korkmaz."
         },
         {
          "m": "Verirsem eksilir; hepsi bende kalsın.",
          "dogru": false,
          "not": "Bu sol ucun sesi: cimriliğin sesi."
         },
         {
          "m": "Bende var ama yine de hepsi benim olsun!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: tamânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kanaat",
        "soz": "Bende"
       },
       "zincirAnahtar": [
        "Sofrası",
        "Arkadaşları"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Kanaat",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Cimrilik",
      "orta": "Kanaat",
      "fazla": "Tamâ‘"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "teneffus",
       "baslik": "Teneffüs",
       "tetik": "Yanında güzel bir paket kuru meyve getirdin. Teneffüste arkadaşların yanına geliyor.",
       "secenekler": [
        {
         "m": "Çantamdan çıkarmam; kimse görmesin.",
         "zon": "az",
         "sonuc": "Yiyeceğin sana kalıyor ama arkadaşlarının yüzü düşüyor.",
         "not": "İbre sola kaydı: hiç paylaşmamak yakınlığı azaltıyor.",
         "ses": "s1az"
        },
        {
         "m": "Onların yiyeceğine de göz dikerim; hepsi bende olsun!",
         "zon": "fazla",
         "sonuc": "Yiyecek olsa da gözün doymuyor; teneffüsün neşesini kaçırıyorsun.",
         "not": "İbre sağa kaydı: doymamak, elindekinin tadını almayı engelliyor.",
         "ses": "s1fa"
        },
        {
         "m": "Kendi payımdan bir parça uzatırım; ben de memnunum.",
         "zon": "orta",
         "sonuc": "Birlikte yiyorsunuz; sohbet de ikramla tatlanıyor.",
         "not": "İbre ortada: elindekine razı oldun ve paylaşmaktan çekinmedin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "oyuncak",
       "baslik": "Yeni oyuncak",
       "tetik": "Arkadaşın yeni bir oyuncak aldı. Senin de odanda zaten birçok oyuncağın var.",
       "secenekler": [
        {
         "m": "Oyuncaklarıma kimse dokunmasın; hiçbirini vermem.",
         "zon": "az",
         "sonuc": "Arkadaşın seni oyuna çağırmaktan çekinir hâle geliyor.",
         "not": "İbre sola kaydı: eşyayı kendine saklamak dostluğu uzaklaştırıyor.",
         "ses": "s2az"
        },
        {
         "m": "Ben de aynısını isterim, hatta daha büyüğünü!",
         "zon": "fazla",
         "sonuc": "Odandaki oyuncakların hiç tadı çıkmıyor; hep yenisini bekliyorsun.",
         "not": "İbre sağa kaydı: başkasına bakıp doymamak insanı rahatsız eder.",
         "ses": "s2fa"
        },
        {
         "m": "Onunki güzelmiş; benimkilerle de mutluyum, birlikte oynayalım.",
         "zon": "orta",
         "sonuc": "İki oyuncakla da keyifli bir oyun kuruluyor.",
         "not": "İbre ortada: şükredip paylaşınca oyun büyüyor.",
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
       "ad": "Az · Cimrilik",
       "aciklama": "Hiçbir şeyi paylaşmamak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Kanaat",
       "aciklama": "Razı olup paylaşmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Tamâ‘",
       "aciklama": "Gözü doymayıp istemek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Kumbarasındaki parayı kimseye göstermez, yardım istenince duymazdan gelir.",
       "alan": "az",
       "ipucu": "Hiçbir şeyi paylaşmıyor."
      },
      {
       "id": "k2",
       "metin": "Dolabı oyuncak dolu olduğu hâlde yenilerini istemekten vazgeçmez.",
       "alan": "fazla",
       "ipucu": "Gözü doymuyor."
      },
      {
       "id": "k3",
       "metin": "Elindeki yiyeceğe şükreder, bir kısmını arkadaşıyla bölüşür.",
       "alan": "orta",
       "ipucu": "Hem razı hem paylaşıyor."
      },
      {
       "id": "k4",
       "metin": "Arkadaşı bir kalem istese çantasını kapatıp başını çevirir.",
       "alan": "az",
       "ipucu": "Elindekini vermiyor."
      },
      {
       "id": "k5",
       "metin": "Her vitrinin önünde “bunu da alalım” der, aldıklarının tadını çıkarmaz.",
       "alan": "fazla",
       "ipucu": "Aldıkça yetinemiyor."
      },
      {
       "id": "k6",
       "metin": "Payına razı olur, fazlasını istemez; arkadaşı isteyince elindekinden verir.",
       "alan": "orta",
       "ipucu": "Az olana razı, paylaşmaya açık."
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
        "Teneffüste yiyeceğimi açarken",
        "Bir arkadaşım güzel bir şey alınca",
        "Alışverişte vitrine bakarken",
        "Biri benden bir şey isteyince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Yiyeceğimden bir parça ikram edeceğim",
        "Elimdeki bir şey için bugün şükredeceğim",
        "Bir şey isteyince önce elimdekilere bakacağım"
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
       "baslik": "Kanaat",
       "metin": "razı olup şükretmek; paylaşmak",
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
   "sure": 1.941,
   "m": "Bu bende kalsın, bana yeter.",
   "k": [
    [
     "Bu",
     0.03,
     0.199
    ],
    [
     "bende",
     0.199,
     0.537
    ],
    [
     "kalsın,",
     0.537,
     0.875
    ],
    [
     "bana",
     1.065,
     1.468
    ],
    [
     "yeter.",
     1.468,
     1.871
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.942,
   "m": "Birçok güzel huy bir ibre gibidir. Kanaat, elimdekine bakışımı ve paylaşmamı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.467
    ],
    [
     "güzel",
     0.467,
     0.905
    ],
    [
     "huy",
     0.905,
     1.123
    ],
    [
     "bir",
     1.123,
     1.342
    ],
    [
     "ibre",
     1.342,
     1.779
    ],
    [
     "gibidir.",
     1.779,
     2.435
    ],
    [
     "Kanaat,",
     2.915,
     3.465
    ],
    [
     "elimdekine",
     3.74,
     5.059
    ],
    [
     "bakışımı",
     5.059,
     6.114
    ],
    [
     "ve",
     6.114,
     6.377
    ],
    [
     "paylaşmamı",
     6.377,
     7.432
    ],
    [
     "ölçer.",
     7.432,
     7.96
    ],
    [
     "İbre",
     8.12,
     8.544
    ],
    [
     "üç",
     8.544,
     8.757
    ],
    [
     "yerde",
     8.757,
     9.181
    ],
    [
     "durabilir:",
     9.181,
     10.03
    ],
    [
     "az,",
     10.3,
     10.449
    ],
    [
     "kararında,",
     10.449,
     11.045
    ],
    [
     "fazla.",
     11.42,
     11.872
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
   "sure": 6.996,
   "m": "Sol uçta Cimrilik. Bu benim, kimseye vermem. Yiyeceğini çantasında saklayıp arkadaşlarından gizler.",
   "k": [
    [
     "Sol",
     0.03,
     0.268
    ],
    [
     "uçta",
     0.268,
     0.743
    ],
    [
     "Cimrilik.",
     0.743,
     1.455
    ],
    [
     "Bu",
     1.55,
     1.57
    ],
    [
     "benim,",
     1.57,
     1.61
    ],
    [
     "kimseye",
     2.055,
     2.262
    ],
    [
     "vermem.",
     2.262,
     2.4
    ],
    [
     "Yiyeceğini",
     2.6,
     3.682
    ],
    [
     "çantasında",
     3.682,
     4.547
    ],
    [
     "saklayıp",
     4.547,
     5.196
    ],
    [
     "arkadaşlarından",
     5.196,
     6.494
    ],
    [
     "gizler.",
     6.494,
     6.926
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.002,
   "m": "Sonra ne olur? Arkadaşları ona yaklaşmaya çekinir. Paylaşmanın verdiği sıcaklık hiç tadılmaz.",
   "k": [
    [
     "Sonra",
     0.03,
     0.428
    ],
    [
     "ne",
     0.428,
     0.627
    ],
    [
     "olur?",
     0.627,
     1.025
    ],
    [
     "Arkadaşları",
     1.1,
     1.832
    ],
    [
     "ona",
     1.832,
     2.125
    ],
    [
     "yaklaşmaya",
     2.125,
     2.711
    ],
    [
     "çekinir.",
     2.711,
     3.15
    ],
    [
     "Paylaşmanın",
     3.27,
     4.031
    ],
    [
     "verdiği",
     4.031,
     4.601
    ],
    [
     "sıcaklık",
     4.601,
     5.172
    ],
    [
     "hiç",
     5.172,
     5.362
    ],
    [
     "tadılmaz.",
     5.362,
     5.932
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
   "sure": 7.554,
   "m": "Sağ uçta Tamâ‘. Dolabım oyuncak dolu ama yenisini de isterim! Her yeni oyuncağı görünce eskileri unutur.",
   "k": [
    [
     "Sağ",
     0.03,
     0.166
    ],
    [
     "uçta",
     0.166,
     0.438
    ],
    [
     "Tamâ‘.",
     0.438,
     0.71
    ],
    [
     "Dolabım",
     0.805,
     1.337
    ],
    [
     "oyuncak",
     1.337,
     1.868
    ],
    [
     "dolu",
     1.868,
     2.223
    ],
    [
     "ama",
     2.223,
     2.577
    ],
    [
     "yenisini",
     2.577,
     3.286
    ],
    [
     "de",
     3.286,
     3.463
    ],
    [
     "isterim!",
     3.463,
     3.995
    ],
    [
     "Her",
     4.6,
     4.77
    ],
    [
     "yeni",
     4.77,
     5.109
    ],
    [
     "oyuncağı",
     5.109,
     5.788
    ],
    [
     "görünce",
     5.788,
     6.297
    ],
    [
     "eskileri",
     6.297,
     6.975
    ],
    [
     "unutur.",
     6.975,
     7.484
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.178,
   "m": "Sonra ne olur? Yeni oyuncak çabuk eskir. Eldeki güzel şeylerin tadı çıkmaz.",
   "k": [
    [
     "Sonra",
     0.03,
     0.316
    ],
    [
     "ne",
     0.316,
     0.459
    ],
    [
     "olur?",
     0.459,
     0.745
    ],
    [
     "Yeni",
     1.29,
     1.616
    ],
    [
     "oyuncak",
     1.616,
     2.104
    ],
    [
     "çabuk",
     2.104,
     2.429
    ],
    [
     "eskir.",
     2.429,
     2.755
    ],
    [
     "Eldeki",
     3.125,
     3.621
    ],
    [
     "güzel",
     3.621,
     3.951
    ],
    [
     "şeylerin",
     3.951,
     4.447
    ],
    [
     "tadı",
     4.447,
     4.777
    ],
    [
     "çıkmaz.",
     4.777,
     5.107
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
   "sure": 8.997,
   "m": "Tam kararında Kanaat. Bende olan bana yeter; gel birlikte yiyelim. Elindeki yiyeceğe şükreder, arkadaşına da uzatır.",
   "k": [
    [
     "Tam",
     0.03,
     0.217
    ],
    [
     "kararında",
     0.217,
     0.968
    ],
    [
     "Kanaat.",
     0.968,
     1.53
    ],
    [
     "Bende",
     1.655,
     2.154
    ],
    [
     "olan",
     2.154,
     2.652
    ],
    [
     "bana",
     2.652,
     3.151
    ],
    [
     "yeter;",
     3.151,
     3.65
    ],
    [
     "gel",
     4.09,
     4.127
    ],
    [
     "birlikte",
     4.127,
     4.239
    ],
    [
     "yiyelim.",
     4.239,
     4.35
    ],
    [
     "Elindeki",
     4.68,
     5.809
    ],
    [
     "yiyeceğe",
     5.809,
     6.938
    ],
    [
     "şükreder,",
     6.938,
     7.785
    ],
    [
     "arkadaşına",
     7.91,
     8.475
    ],
    [
     "da",
     8.475,
     8.588
    ],
    [
     "uzatır.",
     8.588,
     8.927
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.339,
   "m": "Sonra ne olur? Sofrası küçük de olsa gönlü doyar. Arkadaşları onun yanında kendini rahat hisseder.",
   "k": [
    [
     "Sonra",
     0.03,
     0.264
    ],
    [
     "ne",
     0.264,
     0.381
    ],
    [
     "olur?",
     0.381,
     0.615
    ],
    [
     "Sofrası",
     1.0,
     1.561
    ],
    [
     "küçük",
     1.561,
     1.935
    ],
    [
     "de",
     1.935,
     2.123
    ],
    [
     "olsa",
     2.123,
     2.497
    ],
    [
     "gönlü",
     2.497,
     2.871
    ],
    [
     "doyar.",
     2.871,
     3.245
    ],
    [
     "Arkadaşları",
     3.605,
     4.345
    ],
    [
     "onun",
     4.345,
     4.641
    ],
    [
     "yanında",
     4.641,
     5.085
    ],
    [
     "kendini",
     5.085,
     5.529
    ],
    [
     "rahat",
     5.529,
     5.825
    ],
    [
     "hisseder.",
     5.825,
     6.269
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
   "sure": 5.446,
   "m": "Yanında güzel bir paket kuru meyve getirdin. Teneffüste arkadaşların yanına geliyor. Ne yaparsın?",
   "k": [
    [
     "Yanında",
     0.03,
     0.466
    ],
    [
     "güzel",
     0.466,
     0.757
    ],
    [
     "bir",
     0.757,
     0.902
    ],
    [
     "paket",
     0.902,
     1.193
    ],
    [
     "kuru",
     1.193,
     1.483
    ],
    [
     "meyve",
     1.483,
     1.774
    ],
    [
     "getirdin.",
     1.774,
     2.21
    ],
    [
     "Teneffüste",
     2.465,
     3.012
    ],
    [
     "arkadaşların",
     3.012,
     3.695
    ],
    [
     "yanına",
     3.695,
     4.105
    ],
    [
     "geliyor.",
     4.105,
     4.515
    ],
    [
     "Ne",
     4.73,
     4.891
    ],
    [
     "yaparsın?",
     4.891,
     5.376
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.653,
   "m": "Yiyeceğin sana kalıyor ama arkadaşlarının yüzü düşüyor.",
   "k": [
    [
     "Yiyeceğin",
     0.03,
     0.676
    ],
    [
     "sana",
     0.676,
     0.999
    ],
    [
     "kalıyor",
     0.999,
     1.484
    ],
    [
     "ama",
     1.484,
     1.807
    ],
    [
     "arkadaşlarının",
     1.807,
     2.776
    ],
    [
     "yüzü",
     2.776,
     3.099
    ],
    [
     "düşüyor.",
     3.099,
     3.583
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.508,
   "m": "Yiyecek olsa da gözün doymuyor; teneffüsün neşesini kaçırıyorsun.",
   "k": [
    [
     "Yiyecek",
     0.03,
     0.483
    ],
    [
     "olsa",
     0.483,
     0.785
    ],
    [
     "da",
     0.785,
     0.935
    ],
    [
     "gözün",
     0.935,
     1.237
    ],
    [
     "doymuyor;",
     1.237,
     1.69
    ],
    [
     "teneffüsün",
     1.765,
     2.28
    ],
    [
     "neşesini",
     2.28,
     2.795
    ],
    [
     "kaçırıyorsun.",
     2.795,
     3.438
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 2.744,
   "m": "Birlikte yiyorsunuz; sohbet de ikramla tatlanıyor.",
   "k": [
    [
     "Birlikte",
     0.03,
     0.394
    ],
    [
     "yiyorsunuz;",
     0.394,
     0.88
    ],
    [
     "sohbet",
     1.12,
     1.431
    ],
    [
     "de",
     1.431,
     1.586
    ],
    [
     "ikramla",
     1.586,
     2.052
    ],
    [
     "tatlanıyor.",
     2.052,
     2.674
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.073,
   "m": "Arkadaşın yeni bir oyuncak aldı. Senin de odanda zaten birçok oyuncağın var. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.528
    ],
    [
     "yeni",
     0.528,
     0.777
    ],
    [
     "bir",
     0.777,
     0.902
    ],
    [
     "oyuncak",
     0.902,
     1.276
    ],
    [
     "aldı.",
     1.276,
     1.525
    ],
    [
     "Senin",
     1.975,
     2.245
    ],
    [
     "de",
     2.245,
     2.38
    ],
    [
     "odanda",
     2.38,
     2.785
    ],
    [
     "zaten",
     2.785,
     3.055
    ],
    [
     "birçok",
     3.055,
     3.325
    ],
    [
     "oyuncağın",
     3.325,
     3.865
    ],
    [
     "var.",
     3.865,
     4.0
    ],
    [
     "Ne",
     4.41,
     4.558
    ],
    [
     "yaparsın?",
     4.558,
     5.003
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.478,
   "m": "Arkadaşın seni oyuna çağırmaktan çekinir hâle geliyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.483
    ],
    [
     "seni",
     0.483,
     0.709
    ],
    [
     "oyuna",
     0.709,
     1.049
    ],
    [
     "çağırmaktan",
     1.049,
     1.502
    ],
    [
     "çekinir",
     1.502,
     1.842
    ],
    [
     "hâle",
     1.842,
     2.068
    ],
    [
     "geliyor.",
     2.068,
     2.408
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.716,
   "m": "Odandaki oyuncakların hiç tadı çıkmıyor; hep yenisini bekliyorsun.",
   "k": [
    [
     "Odandaki",
     0.03,
     0.599
    ],
    [
     "oyuncakların",
     0.599,
     1.311
    ],
    [
     "hiç",
     1.311,
     1.453
    ],
    [
     "tadı",
     1.453,
     1.738
    ],
    [
     "çıkmıyor;",
     1.738,
     2.165
    ],
    [
     "hep",
     2.46,
     2.592
    ],
    [
     "yenisini",
     2.592,
     3.119
    ],
    [
     "bekliyorsun.",
     3.119,
     3.646
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 2.841,
   "m": "İki oyuncakla da keyifli bir oyun kuruluyor.",
   "k": [
    [
     "İki",
     0.03,
     0.352
    ],
    [
     "oyuncakla",
     0.352,
     0.997
    ],
    [
     "da",
     0.997,
     1.158
    ],
    [
     "keyifli",
     1.158,
     1.642
    ],
    [
     "bir",
     1.642,
     1.803
    ],
    [
     "oyun",
     1.803,
     2.126
    ],
    [
     "kuruluyor.",
     2.126,
     2.771
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
   "sure": 10.375,
   "m": "Bu cümle bilerek çift anlamlı. Elindekiyle yetinen ve fazlasını istemeyen biri söylüyorsa orta uca yakın. Elindekini kimseyle paylaşmayan biri söylüyorsa sol uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.183
    ],
    [
     "cümle",
     0.183,
     0.49
    ],
    [
     "bilerek",
     0.49,
     0.951
    ],
    [
     "çift",
     0.951,
     1.105
    ],
    [
     "anlamlı.",
     1.105,
     1.565
    ],
    [
     "Elindekiyle",
     2.11,
     2.817
    ],
    [
     "yetinen",
     2.817,
     3.241
    ],
    [
     "ve",
     3.241,
     3.382
    ],
    [
     "fazlasını",
     3.382,
     3.948
    ],
    [
     "istemeyen",
     3.948,
     4.513
    ],
    [
     "biri",
     4.513,
     4.796
    ],
    [
     "söylüyorsa",
     4.796,
     5.362
    ],
    [
     "orta",
     5.362,
     5.644
    ],
    [
     "uca",
     5.644,
     5.927
    ],
    [
     "yakın.",
     5.927,
     6.21
    ],
    [
     "Elindekini",
     6.865,
     7.613
    ],
    [
     "kimseyle",
     7.613,
     8.062
    ],
    [
     "paylaşmayan",
     8.062,
     8.66
    ],
    [
     "biri",
     8.66,
     8.959
    ],
    [
     "söylüyorsa",
     8.959,
     9.557
    ],
    [
     "sol",
     9.557,
     9.707
    ],
    [
     "uca",
     9.707,
     10.006
    ],
    [
     "yakın.",
     10.006,
     10.305
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
