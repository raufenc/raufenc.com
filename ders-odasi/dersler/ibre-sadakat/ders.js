/* İbremetre · Sadakat — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Suskunluk · Sadakat · Sözbozma). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-sadakat",
 "ad": "Sadakat: İbren Nerede?",
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
     "huy": "Sadakat",
     "huyAnahtar": "Sadakat",
     "olculen": "Sözüme bağlılığımı gösterme biçimim",
     "kanca": "Cevap vermedim ama orada olacağım.",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Sadakat",
      "fazla": "Sözbozma"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Sadakat",
     "cumle": "Cevap vermedim ama orada olacağım.",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Sadakat",
      "fazla": "Sözbozma"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi arkadaşının mesajına cevap yazmıyor; sessiz kalıyor ve arkadaşı gelip gelmeyeceğini bilemiyor: sol uca (Suskunluk) yakın. Başka okumada cevap yazmamış olsa da söz verdiği yerde zamanında olacak: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an verdiğimiz söze nasıl bağlı kaldığımıza bakar. Sadakat; verdiği sözde durmak, tutamayacağını anlarsa bunu önceden söylemektir. Sağ uç (Excel’deki adıyla Va‘dini Bozmak) söz verip tutmamaktır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Sadakat",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Sadakat",
      "fazla": "Sözbozma"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Söylemesi gerekeni söylemeden kaybolmak neye benziyor?",
       "ad": "Suskunluk",
       "soz": "Gelemeyeceğim ama kimseye bir şey demem.",
       "eylem": "yaslan",
       "zincir": [
        "Arkadaşları saatlerce onu bekler.",
        "Neden gelmediği bilinmediği için kırgınlık birikir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Gelemeyeceğim desem sorun çıkar; susayım.",
          "dogru": true,
          "not": "Suskunluk, konuşması gereken yerde sessiz kalmaktır. “Tutamayacağım” demek, sessizce kaybolmaktan daha güvenli bir yoldur."
         },
         {
          "m": "Söz verdim; tutarım, tutamazsam önceden söylerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sadakatin sesi."
         },
         {
          "m": "Söz verdim ama canım istemiyor; gitmem.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: sözbozmanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Suskunluk",
        "soz": "Gelemeyeceğim"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Neden"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Söz verip tutmamak neye benziyor?",
       "ad": "Sözbozma",
       "soz": "Söz verdim ama istemedim, gelmedim.",
       "eylem": "el-salla",
       "zincir": [
        "Arkadaşı bir dahaki sözüne güvenemez.",
        "Güven kırılınca onarmak uzun sürer."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Söz verdim ama canım istemiyor; gitmem.",
          "dogru": true,
          "not": "Söz verip tutmamak güveni sarsar. Küçük bir söz bile olsa tutulmayınca karşı taraf bekler ve üzülür."
         },
         {
          "m": "Gelemeyeceğim desem sorun çıkar; susayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: suskunluğun sesi."
         },
         {
          "m": "Söz verdim; tutarım, tutamazsam önceden söylerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sadakatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Sözbozma",
        "soz": "Söz"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Güven"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Sadakat",
       "soz": "Söz verdim, tutarım; olmazsa önceden söylerim.",
       "eylem": "yuru",
       "zincir": [
        "Arkadaşları ona güvenir.",
        "Bir sonraki plan da rahatça yapılır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Söz verdim; tutarım, tutamazsam önceden söylerim.",
          "dogru": true,
          "not": "Sadakat, verdiği sözde durup bağlı kalmaktır. Tutamayacaksan önceden söylemek de sözüne bağlılıktır."
         },
         {
          "m": "Gelemeyeceğim desem sorun çıkar; susayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: suskunluğun sesi."
         },
         {
          "m": "Söz verdim ama canım istemiyor; gitmem.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: sözbozmanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Sadakat",
        "soz": "Söz"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Bir"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Sadakat",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Sadakat",
      "fazla": "Sözbozma"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "bulusma",
       "baslik": "Buluşma sözü",
       "tetik": "Arkadaşınla cumartesi parkta buluşmaya söz verdin. Sonra başka bir arkadaşın seni eğlenceli bir yere çağırdı.",
       "secenekler": [
        {
         "m": "Bir şey demem, parka gitmem; anlarlar.",
         "zon": "az",
         "sonuc": "Arkadaşın parkta bekliyor; neden gelmediğini bilemiyor.",
         "not": "İbre sola kaydı: söylememek, sözü tutamamanın sorumluluğunu kaçırıyor.",
         "ses": "s1az"
        },
        {
         "m": "Eğlenceli yere giderim; söz önemli değil.",
         "zon": "fazla",
         "sonuc": "Arkadaşın bekliyor ve sözünün değeri azalıyor.",
         "not": "İbre sağa kaydı: söz verip tutmamak güveni sarsıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Önce sözümü tutarım; olmazsa önceden haber veririm.",
         "zon": "orta",
         "sonuc": "Arkadaşın planını biliyor; ikiniz de güvenle devam ediyorsunuz.",
         "not": "İbre ortada: sözünde durdun ya da açıkça haber verdin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "gorev",
       "baslik": "Sınıf görevi",
       "tetik": "Öğretmene sınıf panosunu hazırlama sözü verdin. O hafta çok yoruldun ve hazırlayamadın.",
       "secenekler": [
        {
         "m": "Sessiz kalırım; belki unuturlar.",
         "zon": "az",
         "sonuc": "Pano boş kalıyor; öğretmen neden hazır olmadığını bilemiyor.",
         "not": "İbre sola kaydı: sessizce kaybolmak sorunu büyütüyor.",
         "ses": "s2az"
        },
        {
         "m": "Söz verdim ama yapmadım; ne olacak ki.",
         "zon": "fazla",
         "sonuc": "Öğretmen ve sınıf bir dahaki görevde sana güvenmekte zorlanıyor.",
         "not": "İbre sağa kaydı: tutulmayan söz, güveni azaltıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Yoruldum; öğretmene durumu söyleyip birlikte yapalım derim.",
         "zon": "orta",
         "sonuc": "Öğretmen yardım ayarlıyor ve pano zamanında hazır oluyor.",
         "not": "İbre ortada: tutamayacağını söylemek de söze bağlılıktır.",
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
       "ad": "Az · Suskunluk",
       "aciklama": "Gereken yerde sessiz kalmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Sadakat",
       "aciklama": "Sözüne bağlı kalmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Sözbozma",
       "aciklama": "Söz verip tutmamak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Oyuna gelmeyecekse bile haber vermez, sessizce kaybolur.",
       "alan": "az",
       "ipucu": "Haber vermiyor."
      },
      {
       "id": "k2",
       "metin": "Söz verdiği günde “canım istemedi” diyerek gitmez.",
       "alan": "fazla",
       "ipucu": "Sözünü tutmuyor."
      },
      {
       "id": "k3",
       "metin": "Söz verdiği günde gelir, gelemezse önceden söyler.",
       "alan": "orta",
       "ipucu": "Sözüne bağlı kalıyor."
      },
      {
       "id": "k4",
       "metin": "Ödevi yetiştiremeyeceğini bildiği hâlde kimseye söylemez.",
       "alan": "az",
       "ipucu": "Gereken yerde susuyor."
      },
      {
       "id": "k5",
       "metin": "“Birlikte yapacağız” der, sonra hiç aramaz.",
       "alan": "fazla",
       "ipucu": "Verdiği sözü bozuyor."
      },
      {
       "id": "k6",
       "metin": "Zorlanınca “yardım lazım” der ve yine sözünü yerine getirir.",
       "alan": "orta",
       "ipucu": "Sözüne bağlı kalıp destek istiyor."
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
        "Bir söz verirken",
        "Söz verdiğim şeyi yapamayacağımı anlayınca",
        "Başka bir plan çıkınca",
        "Bir arkadaşım beni beklerken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Söz vermeden önce yapıp yapamayacağımı düşüneceğim",
        "Tutamayacaksam bunu önceden söyleyeceğim",
        "Sözümü küçük şeylerde bile tutmaya çalışacağım"
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
       "baslik": "Sadakat",
       "metin": "sözüne bağlı kalmak",
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
   "sure": 2.329,
   "m": "Cevap vermedim ama orada olacağım.",
   "k": [
    [
     "Cevap",
     0.03,
     0.348
    ],
    [
     "vermedim",
     0.348,
     0.826
    ],
    [
     "ama",
     0.826,
     1.144
    ],
    [
     "orada",
     1.144,
     1.622
    ],
    [
     "olacağım.",
     1.622,
     2.259
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.488,
   "m": "Birçok güzel huy bir ibre gibidir. Sadakat, verdiğim söze bağlı kalma biçimimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.441
    ],
    [
     "güzel",
     0.441,
     0.852
    ],
    [
     "huy",
     0.852,
     1.057
    ],
    [
     "bir",
     1.057,
     1.263
    ],
    [
     "ibre",
     1.263,
     1.674
    ],
    [
     "gibidir.",
     1.674,
     2.29
    ],
    [
     "Sadakat,",
     2.825,
     3.435
    ],
    [
     "verdiğim",
     3.745,
     4.361
    ],
    [
     "söze",
     4.361,
     4.772
    ],
    [
     "bağlı",
     4.772,
     5.182
    ],
    [
     "kalma",
     5.182,
     5.593
    ],
    [
     "biçimimi",
     5.593,
     6.414
    ],
    [
     "ölçer.",
     6.414,
     6.825
    ],
    [
     "İbre",
     6.92,
     7.309
    ],
    [
     "üç",
     7.309,
     7.503
    ],
    [
     "yerde",
     7.503,
     7.892
    ],
    [
     "durabilir:",
     7.892,
     8.67
    ],
    [
     "az,",
     9.0,
     9.69
    ],
    [
     "kararında,",
     10.05,
     10.295
    ],
    [
     "fazla.",
     10.295,
     10.418
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
   "sure": 7.192,
   "m": "Sol uçta Suskunluk. Gelemeyeceğim ama kimseye bir şey demem. Söz verdiği buluşmaya gelmez, haber de vermez.",
   "k": [
    [
     "Sol",
     0.03,
     0.201
    ],
    [
     "uçta",
     0.201,
     0.542
    ],
    [
     "Suskunluk.",
     0.542,
     1.055
    ],
    [
     "Gelemeyeceğim",
     1.145,
     2.283
    ],
    [
     "ama",
     2.283,
     2.662
    ],
    [
     "kimseye",
     2.662,
     3.231
    ],
    [
     "bir",
     3.231,
     3.421
    ],
    [
     "şey",
     3.421,
     3.611
    ],
    [
     "demem.",
     3.611,
     3.99
    ],
    [
     "Söz",
     4.485,
     4.635
    ],
    [
     "verdiği",
     4.635,
     5.083
    ],
    [
     "buluşmaya",
     5.083,
     5.681
    ],
    [
     "gelmez,",
     5.681,
     5.98
    ],
    [
     "haber",
     6.275,
     6.614
    ],
    [
     "de",
     6.614,
     6.783
    ],
    [
     "vermez.",
     6.783,
     7.122
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.509,
   "m": "Sonra ne olur? Arkadaşları saatlerce onu bekler. Neden gelmediği bilinmediği için kırgınlık birikir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.29
    ],
    [
     "ne",
     0.29,
     0.42
    ],
    [
     "olur?",
     0.42,
     0.68
    ],
    [
     "Arkadaşları",
     0.95,
     1.59
    ],
    [
     "saatlerce",
     1.59,
     2.103
    ],
    [
     "onu",
     2.103,
     2.359
    ],
    [
     "bekler.",
     2.359,
     2.615
    ],
    [
     "Neden",
     3.025,
     3.279
    ],
    [
     "gelmediği",
     3.279,
     3.787
    ],
    [
     "bilinmediği",
     3.787,
     4.423
    ],
    [
     "için",
     4.423,
     4.677
    ],
    [
     "kırgınlık",
     4.677,
     5.058
    ],
    [
     "birikir.",
     5.058,
     5.439
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
   "sure": 7.287,
   "m": "Sağ uçta Sözbozma. Söz verdim ama istemedim, gelmedim. Söz verir, sonra hiçbir şey olmamış gibi davranır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.233
    ],
    [
     "uçta",
     0.233,
     0.64
    ],
    [
     "Sözbozma.",
     0.64,
     1.25
    ],
    [
     "Söz",
     1.595,
     1.786
    ],
    [
     "verdim",
     1.786,
     2.167
    ],
    [
     "ama",
     2.167,
     2.548
    ],
    [
     "istemedim,",
     2.548,
     3.31
    ],
    [
     "gelmedim.",
     3.465,
     3.89
    ],
    [
     "Söz",
     4.28,
     4.463
    ],
    [
     "verir,",
     4.463,
     4.83
    ],
    [
     "sonra",
     5.01,
     5.35
    ],
    [
     "hiçbir",
     5.35,
     5.689
    ],
    [
     "şey",
     5.689,
     5.859
    ],
    [
     "olmamış",
     5.859,
     6.368
    ],
    [
     "gibi",
     6.368,
     6.708
    ],
    [
     "davranır.",
     6.708,
     7.217
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.882,
   "m": "Sonra ne olur? Arkadaşı bir dahaki sözüne güvenemez. Güven kırılınca onarmak uzun sürer.",
   "k": [
    [
     "Sonra",
     0.03,
     0.298
    ],
    [
     "ne",
     0.298,
     0.432
    ],
    [
     "olur?",
     0.432,
     0.7
    ],
    [
     "Arkadaşı",
     1.05,
     1.609
    ],
    [
     "bir",
     1.609,
     1.748
    ],
    [
     "dahaki",
     1.748,
     2.167
    ],
    [
     "sözüne",
     2.167,
     2.586
    ],
    [
     "güvenemez.",
     2.586,
     3.145
    ],
    [
     "Güven",
     3.515,
     3.868
    ],
    [
     "kırılınca",
     3.868,
     4.575
    ],
    [
     "onarmak",
     4.575,
     5.105
    ],
    [
     "uzun",
     5.105,
     5.459
    ],
    [
     "sürer.",
     5.459,
     5.812
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
   "sure": 8.77,
   "m": "Tam kararında Sadakat. Söz verdim, tutarım; olmazsa önceden söylerim. Sözüne bağlı kalır, zorluk çıkarsa önceden söyler.",
   "k": [
    [
     "Tam",
     0.03,
     0.234
    ],
    [
     "kararında",
     0.234,
     1.052
    ],
    [
     "Sadakat.",
     1.052,
     1.665
    ],
    [
     "Söz",
     2.115,
     2.352
    ],
    [
     "verdim,",
     2.352,
     2.825
    ],
    [
     "tutarım;",
     3.005,
     3.345
    ],
    [
     "olmazsa",
     3.645,
     4.097
    ],
    [
     "önceden",
     4.097,
     4.548
    ],
    [
     "söylerim.",
     4.548,
     5.0
    ],
    [
     "Sözüne",
     5.265,
     5.871
    ],
    [
     "bağlı",
     5.871,
     6.276
    ],
    [
     "kalır,",
     6.276,
     6.68
    ],
    [
     "zorluk",
     6.84,
     7.212
    ],
    [
     "çıkarsa",
     7.212,
     7.77
    ],
    [
     "önceden",
     7.77,
     8.328
    ],
    [
     "söyler.",
     8.328,
     8.7
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 4.756,
   "m": "Sonra ne olur? Arkadaşları ona güvenir. Bir sonraki plan da rahatça yapılır.",
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
     "Arkadaşları",
     1.12,
     1.723
    ],
    [
     "ona",
     1.723,
     1.964
    ],
    [
     "güvenir.",
     1.964,
     2.325
    ],
    [
     "Bir",
     2.66,
     2.829
    ],
    [
     "sonraki",
     2.829,
     3.335
    ],
    [
     "plan",
     3.335,
     3.504
    ],
    [
     "da",
     3.504,
     3.673
    ],
    [
     "rahatça",
     3.673,
     4.179
    ],
    [
     "yapılır.",
     4.179,
     4.686
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
   "sure": 6.954,
   "m": "Arkadaşınla cumartesi parkta buluşmaya söz verdin. Sonra başka bir arkadaşın seni eğlenceli bir yere çağırdı. Ne yaparsın?",
   "k": [
    [
     "Arkadaşınla",
     0.03,
     0.756
    ],
    [
     "cumartesi",
     0.756,
     1.338
    ],
    [
     "parkta",
     1.338,
     1.628
    ],
    [
     "buluşmaya",
     1.628,
     2.209
    ],
    [
     "söz",
     2.209,
     2.354
    ],
    [
     "verdin.",
     2.354,
     2.645
    ],
    [
     "Sonra",
     3.045,
     3.316
    ],
    [
     "başka",
     3.316,
     3.587
    ],
    [
     "bir",
     3.587,
     3.722
    ],
    [
     "arkadaşın",
     3.722,
     4.264
    ],
    [
     "seni",
     4.264,
     4.535
    ],
    [
     "eğlenceli",
     4.535,
     5.077
    ],
    [
     "bir",
     5.077,
     5.213
    ],
    [
     "yere",
     5.213,
     5.484
    ],
    [
     "çağırdı.",
     5.484,
     5.89
    ],
    [
     "Ne",
     6.3,
     6.446
    ],
    [
     "yaparsın?",
     6.446,
     6.884
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.039,
   "m": "Arkadaşın parkta bekliyor; neden gelmediğini bilemiyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.594
    ],
    [
     "parkta",
     0.594,
     0.877
    ],
    [
     "bekliyor;",
     0.877,
     1.3
    ],
    [
     "neden",
     1.615,
     1.861
    ],
    [
     "gelmediğini",
     1.861,
     2.477
    ],
    [
     "bilemiyor.",
     2.477,
     2.969
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 2.678,
   "m": "Arkadaşın bekliyor ve sözünün değeri azalıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.603
    ],
    [
     "bekliyor",
     0.603,
     1.033
    ],
    [
     "ve",
     1.033,
     1.176
    ],
    [
     "sözünün",
     1.176,
     1.606
    ],
    [
     "değeri",
     1.606,
     2.035
    ],
    [
     "azalıyor.",
     2.035,
     2.608
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.771,
   "m": "Arkadaşın planını biliyor; ikiniz de güvenle devam ediyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.526
    ],
    [
     "planını",
     0.526,
     0.898
    ],
    [
     "biliyor;",
     0.898,
     1.27
    ],
    [
     "ikiniz",
     1.665,
     2.101
    ],
    [
     "de",
     2.101,
     2.247
    ],
    [
     "güvenle",
     2.247,
     2.683
    ],
    [
     "devam",
     2.683,
     2.974
    ],
    [
     "ediyorsunuz.",
     2.974,
     3.701
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.956,
   "m": "Öğretmene sınıf panosunu hazırlama sözü verdin. O hafta çok yoruldun ve hazırlayamadın. Ne yaparsın?",
   "k": [
    [
     "Öğretmene",
     0.03,
     0.539
    ],
    [
     "sınıf",
     0.539,
     0.793
    ],
    [
     "panosunu",
     0.793,
     1.302
    ],
    [
     "hazırlama",
     1.302,
     1.811
    ],
    [
     "sözü",
     1.811,
     2.066
    ],
    [
     "verdin.",
     2.066,
     2.32
    ],
    [
     "O",
     2.805,
     2.957
    ],
    [
     "hafta",
     2.957,
     3.261
    ],
    [
     "çok",
     3.261,
     3.414
    ],
    [
     "yoruldun",
     3.414,
     3.87
    ],
    [
     "ve",
     3.87,
     4.022
    ],
    [
     "hazırlayamadın.",
     4.022,
     4.935
    ],
    [
     "Ne",
     5.215,
     5.383
    ],
    [
     "yaparsın?",
     5.383,
     5.886
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.319,
   "m": "Pano boş kalıyor; öğretmen neden hazır olmadığını bilemiyor.",
   "k": [
    [
     "Pano",
     0.03,
     0.327
    ],
    [
     "boş",
     0.327,
     0.475
    ],
    [
     "kalıyor;",
     0.475,
     0.92
    ],
    [
     "öğretmen",
     1.275,
     1.645
    ],
    [
     "neden",
     1.645,
     1.892
    ],
    [
     "hazır",
     1.892,
     2.139
    ],
    [
     "olmadığını",
     2.139,
     2.755
    ],
    [
     "bilemiyor.",
     2.755,
     3.249
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.754,
   "m": "Öğretmen ve sınıf bir dahaki görevde sana güvenmekte zorlanıyor.",
   "k": [
    [
     "Öğretmen",
     0.03,
     0.507
    ],
    [
     "ve",
     0.507,
     0.665
    ],
    [
     "sınıf",
     0.665,
     0.983
    ],
    [
     "bir",
     0.983,
     1.142
    ],
    [
     "dahaki",
     1.142,
     1.619
    ],
    [
     "görevde",
     1.619,
     2.095
    ],
    [
     "sana",
     2.095,
     2.413
    ],
    [
     "güvenmekte",
     2.413,
     3.048
    ],
    [
     "zorlanıyor.",
     3.048,
     3.684
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.164,
   "m": "Öğretmen yardım ayarlıyor ve pano zamanında hazır oluyor.",
   "k": [
    [
     "Öğretmen",
     0.03,
     0.611
    ],
    [
     "yardım",
     0.611,
     0.998
    ],
    [
     "ayarlıyor",
     0.998,
     1.772
    ],
    [
     "ve",
     1.772,
     1.965
    ],
    [
     "pano",
     1.965,
     2.352
    ],
    [
     "zamanında",
     2.352,
     3.126
    ],
    [
     "hazır",
     3.126,
     3.513
    ],
    [
     "oluyor.",
     3.513,
     4.094
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
   "sure": 11.727,
   "m": "Bu cümle bilerek çift anlamlı. Mesaja cevap yazmayıp arkadaşını bilgisiz bırakan biri söylüyorsa sol uca yakın. Cevap yazmasa da söz verdiği yerde olacak biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.181
    ],
    [
     "cümle",
     0.181,
     0.483
    ],
    [
     "bilerek",
     0.483,
     0.936
    ],
    [
     "çift",
     0.936,
     1.087
    ],
    [
     "anlamlı.",
     1.087,
     1.54
    ],
    [
     "Mesaja",
     2.04,
     2.498
    ],
    [
     "cevap",
     2.498,
     2.803
    ],
    [
     "yazmayıp",
     2.803,
     3.26
    ],
    [
     "arkadaşını",
     3.26,
     4.022
    ],
    [
     "bilgisiz",
     4.022,
     4.48
    ],
    [
     "bırakan",
     4.48,
     4.938
    ],
    [
     "biri",
     4.938,
     5.243
    ],
    [
     "söylüyorsa",
     5.243,
     5.853
    ],
    [
     "sol",
     5.853,
     6.005
    ],
    [
     "uca",
     6.005,
     6.31
    ],
    [
     "yakın.",
     6.31,
     6.615
    ],
    [
     "Cevap",
     7.265,
     7.59
    ],
    [
     "yazmasa",
     7.59,
     8.078
    ],
    [
     "da",
     8.078,
     8.241
    ],
    [
     "söz",
     8.241,
     8.404
    ],
    [
     "verdiği",
     8.404,
     8.892
    ],
    [
     "yerde",
     8.892,
     9.217
    ],
    [
     "olacak",
     9.217,
     9.705
    ],
    [
     "biri",
     9.705,
     10.03
    ],
    [
     "söylüyorsa",
     10.03,
     10.681
    ],
    [
     "orta",
     10.681,
     11.006
    ],
    [
     "uca",
     11.006,
     11.332
    ],
    [
     "yakın.",
     11.332,
     11.657
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
