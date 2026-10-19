/* İbremetre · Vefâ — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Saflık · Vefâ · Gadr). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-vefa",
 "ad": "Vefâ: İbren Nerede?",
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
     "huy": "Vefâ",
     "huyAnahtar": "Vefâ",
     "olculen": "Dostluğu zor günde koruma biçimim",
     "kanca": "Ben bitirdim, gerisi senin işin.",
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
     "cumle": "Ben bitirdim, gerisi senin işin.",
     "uclar": {
      "az": "Saflık",
      "orta": "Vefâ",
      "fazla": "Gadr"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi payını bitirmiş, arkadaşına “gerisi senin” derken yine de yanında kalıp yardım etmeye hazır: orta uca yakın. Başka okumada payını bitirince arkadaşı zor durumdayken çekip gidiyor: sağ uca (Gadr) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an dostluğu nasıl koruduğumuza bakar. Vefâ; sözünde durmak ve dostluğu zor günde de korumaktır. Bu ibrede sol uç, duyduğu söze hemen inanıp dostuna sormadan uzaklaşmak ya da kolayca kandırılmaktır; sağ uç ise dostu yarı yolda bırakmaktır.",
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
       "soru": "Duyduğuna hemen inanmak neye benziyor?",
       "ad": "Saflık",
       "soz": "Dediklerine inandım; arkadaşıma sormam bile.",
       "eylem": "saskin",
       "zincir": [
        "Dostu neden uzaklaştığını anlayamaz.",
        "Söylentinin doğrusunu da kimse araştırmaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkes doğru söylüyordur; hemen inanırım.",
          "dogru": true,
          "not": "Saflık, herkesi masum sanıp çabucak inanmaktır. Dostluk, duyduğunu önce dostuna sormayı da ister."
         },
         {
          "m": "Yanındayım; önce konuşup birlikte bakalım.",
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
        "soz": "Dediklerine"
       },
       "zincirAnahtar": [
        "Dostu",
        "Söylentinin"
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
          "m": "Herkes doğru söylüyordur; hemen inanırım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Yanındayım; önce konuşup birlikte bakalım.",
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
          "m": "Yanındayım; önce konuşup birlikte bakalım.",
          "dogru": true,
          "not": "Vefâ, sözünde durup dostluğu korumaktır. Zor gün, dostluğun en çok anlaşıldığı gündür."
         },
         {
          "m": "Herkes doğru söylüyordur; hemen inanırım.",
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
       "tetik": "Arkadaşınla ortak proje yapıyorsunuz. Sen bölümünü bitirdin, arkadaşın hâlâ yetişmeye çalışıyor.",
       "secenekler": [
        {
         "m": "Biri “o yapamaz” demiş; ona inanıp projeden çekilirim.",
         "zon": "az",
         "sonuc": "Arkadaşın nedenini bilmiyor; söylentinin doğru olup olmadığı hiç sorulmuyor.",
         "not": "İbre sola kaydı: duyduğuna hemen inanmak, dostluğu sınamadan bırakmaya götürüyor.",
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
         "m": "Payım bitti; senin bölümüne de yardım edeyim.",
         "zon": "orta",
         "sonuc": "Proje birlikte tamamlanıyor; ikiniz de rahatlıyorsunuz.",
         "not": "İbre ortada: dostunun yanında durmak, işin ötesinde bir güven kuruyor.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "hata",
       "baslik": "Zor gün",
       "tetik": "Arkadaşın bir hata yaptı ve herkes ona kızıyor. Bazıları onunla görüşmemeni söylüyor.",
       "secenekler": [
        {
         "m": "Herkes öyle diyorsa doğrudur, görüşmem.",
         "zon": "az",
         "sonuc": "Dostun yalnız kalıyor; sen de olanın gerçeğini hiç öğrenmiyorsun.",
         "not": "İbre sola kaydı: kalabalığın sözüne hemen inanmak, dostluğu kolayca bırakıyor.",
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
         "m": "Önce onunla konuşurum; hatayı birlikte düzeltiriz.",
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
       "aciklama": "Söylentiye çabucak inanmak",
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
       "metin": "Biri “arkadaşın seni sevmiyor” deyince sormadan ona inanır.",
       "alan": "az",
       "ipucu": "Söylentiye hemen kapılıyor."
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
       "metin": "Tanımadığı birinin dedikodusuna hemen inanıp dostundan uzaklaşır.",
       "alan": "az",
       "ipucu": "Çabucak inanıyor."
      },
      {
       "id": "k5",
       "metin": "Arkadaşı üzülünce “benim işim değil” der.",
       "alan": "fazla",
       "ipucu": "Dostunu yalnız bırakıyor."
      },
      {
       "id": "k6",
       "metin": "Duyduğunu önce dostuna sorar, sonra karar verir.",
       "alan": "orta",
       "ipucu": "Önce konuşup dostluğu koruyor."
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
        "Bir söylenti duyunca",
        "Ortak bir işi bitirince",
        "Arkadaşım zor durumdayken",
        "Biri arkadaşımı kötülerken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Duyduğumu önce arkadaşıma soracağım",
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
   "sure": 2.039,
   "m": "Ben bitirdim, gerisi senin işin.",
   "k": [
    [
     "Ben",
     0.03,
     0.193
    ],
    [
     "bitirdim,",
     0.193,
     0.68
    ],
    [
     "gerisi",
     1.0,
     1.415
    ],
    [
     "senin",
     1.415,
     1.692
    ],
    [
     "işin.",
     1.692,
     1.969
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
   "sure": 8.591,
   "m": "Sol uçta Saflık. Dediklerine inandım; arkadaşıma sormam bile. Duyduğu söylentiye hemen kapılıp dostundan uzaklaşır.",
   "k": [
    [
     "Sol",
     0.03,
     0.252
    ],
    [
     "uçta",
     0.252,
     0.696
    ],
    [
     "Saflık.",
     0.696,
     1.14
    ],
    [
     "Dediklerine",
     1.235,
     2.301
    ],
    [
     "inandım;",
     2.301,
     2.94
    ],
    [
     "arkadaşıma",
     3.415,
     4.076
    ],
    [
     "sormam",
     4.076,
     4.341
    ],
    [
     "bile.",
     4.341,
     4.605
    ],
    [
     "Duyduğu",
     5.285,
     5.796
    ],
    [
     "söylentiye",
     5.796,
     6.477
    ],
    [
     "hemen",
     6.477,
     6.818
    ],
    [
     "kapılıp",
     6.818,
     7.329
    ],
    [
     "dostundan",
     7.329,
     7.84
    ],
    [
     "uzaklaşır.",
     7.84,
     8.521
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.564,
   "m": "Sonra ne olur? Dostu neden uzaklaştığını anlayamaz. Söylentinin doğrusunu da kimse araştırmaz.",
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
     "Dostu",
     1.14,
     1.494
    ],
    [
     "neden",
     1.494,
     1.849
    ],
    [
     "uzaklaştığını",
     1.849,
     2.911
    ],
    [
     "anlayamaz.",
     2.911,
     3.62
    ],
    [
     "Söylentinin",
     3.73,
     4.467
    ],
    [
     "doğrusunu",
     4.467,
     5.204
    ],
    [
     "da",
     5.204,
     5.388
    ],
    [
     "kimse",
     5.388,
     5.757
    ],
    [
     "araştırmaz.",
     5.757,
     6.494
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
   "sure": 6.363,
   "m": "Arkadaşınla ortak proje yapıyorsunuz. Sen bölümünü bitirdin, arkadaşın hâlâ yetişmeye çalışıyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşınla",
     0.03,
     0.682
    ],
    [
     "ortak",
     0.682,
     0.943
    ],
    [
     "proje",
     0.943,
     1.203
    ],
    [
     "yapıyorsunuz.",
     1.203,
     1.855
    ],
    [
     "Sen",
     2.15,
     2.289
    ],
    [
     "bölümünü",
     2.289,
     2.844
    ],
    [
     "bitirdin,",
     2.844,
     3.26
    ],
    [
     "arkadaşın",
     3.41,
     3.971
    ],
    [
     "hâlâ",
     3.971,
     4.252
    ],
    [
     "yetişmeye",
     4.252,
     4.814
    ],
    [
     "çalışıyor.",
     4.814,
     5.375
    ],
    [
     "Ne",
     5.74,
     5.878
    ],
    [
     "yaparsın?",
     5.878,
     6.293
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.301,
   "m": "Arkadaşın nedenini bilmiyor; söylentinin doğru olup olmadığı hiç sorulmuyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.499
    ],
    [
     "nedenini",
     0.499,
     0.968
    ],
    [
     "bilmiyor;",
     0.968,
     1.32
    ],
    [
     "söylentinin",
     1.595,
     2.215
    ],
    [
     "doğru",
     2.215,
     2.525
    ],
    [
     "olup",
     2.525,
     2.836
    ],
    [
     "olmadığı",
     2.836,
     3.456
    ],
    [
     "hiç",
     3.456,
     3.611
    ],
    [
     "sorulmuyor.",
     3.611,
     4.231
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
   "sure": 2.889,
   "m": "Proje birlikte tamamlanıyor; ikiniz de rahatlıyorsunuz.",
   "k": [
    [
     "Proje",
     0.03,
     0.271
    ],
    [
     "birlikte",
     0.271,
     0.633
    ],
    [
     "tamamlanıyor;",
     0.633,
     1.235
    ],
    [
     "ikiniz",
     1.67,
     2.015
    ],
    [
     "de",
     2.015,
     2.13
    ],
    [
     "rahatlıyorsunuz.",
     2.13,
     2.819
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.538,
   "m": "Arkadaşın bir hata yaptı ve herkes ona kızıyor. Bazıları onunla görüşmemeni söylüyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.614
    ],
    [
     "bir",
     0.614,
     0.759
    ],
    [
     "hata",
     0.759,
     1.051
    ],
    [
     "yaptı",
     1.051,
     1.343
    ],
    [
     "ve",
     1.343,
     1.489
    ],
    [
     "herkes",
     1.489,
     1.781
    ],
    [
     "ona",
     1.781,
     2.072
    ],
    [
     "kızıyor.",
     2.072,
     2.51
    ],
    [
     "Bazıları",
     2.765,
     3.254
    ],
    [
     "onunla",
     3.254,
     3.621
    ],
    [
     "görüşmemeni",
     3.621,
     4.233
    ],
    [
     "söylüyor.",
     4.233,
     4.6
    ],
    [
     "Ne",
     4.9,
     5.042
    ],
    [
     "yaparsın?",
     5.042,
     5.468
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 5.55,
   "m": "Dostun yalnız kalıyor; sen de olanın gerçeğini hiç öğrenmiyorsun.",
   "k": [
    [
     "Dostun",
     0.03,
     0.46
    ],
    [
     "yalnız",
     0.46,
     0.89
    ],
    [
     "kalıyor;",
     0.89,
     1.535
    ],
    [
     "sen",
     1.93,
     2.167
    ],
    [
     "de",
     2.167,
     2.403
    ],
    [
     "olanın",
     2.403,
     3.113
    ],
    [
     "gerçeğini",
     3.113,
     4.06
    ],
    [
     "hiç",
     4.06,
     4.297
    ],
    [
     "öğrenmiyorsun.",
     4.297,
     5.48
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
   "sure": 9.873,
   "m": "Bu cümle bilerek çift anlamlı. Payını bitirip yine de yardıma hazır biri söylüyorsa orta uca yakın. Payını bitirince dostunu bırakıp giden biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.172
    ],
    [
     "cümle",
     0.172,
     0.455
    ],
    [
     "bilerek",
     0.455,
     0.879
    ],
    [
     "çift",
     0.879,
     1.02
    ],
    [
     "anlamlı.",
     1.02,
     1.445
    ],
    [
     "Payını",
     1.915,
     2.327
    ],
    [
     "bitirip",
     2.327,
     2.739
    ],
    [
     "yine",
     2.739,
     3.013
    ],
    [
     "de",
     3.013,
     3.151
    ],
    [
     "yardıma",
     3.151,
     3.563
    ],
    [
     "hazır",
     3.563,
     3.837
    ],
    [
     "biri",
     3.837,
     4.112
    ],
    [
     "söylüyorsa",
     4.112,
     4.661
    ],
    [
     "orta",
     4.661,
     4.936
    ],
    [
     "uca",
     4.936,
     5.21
    ],
    [
     "yakın.",
     5.21,
     5.485
    ],
    [
     "Payını",
     6.13,
     6.554
    ],
    [
     "bitirince",
     6.554,
     7.119
    ],
    [
     "dostunu",
     7.119,
     7.543
    ],
    [
     "bırakıp",
     7.543,
     7.967
    ],
    [
     "giden",
     7.967,
     8.249
    ],
    [
     "biri",
     8.249,
     8.532
    ],
    [
     "söylüyorsa",
     8.532,
     9.097
    ],
    [
     "sağ",
     9.097,
     9.238
    ],
    [
     "uca",
     9.238,
     9.521
    ],
    [
     "yakın.",
     9.521,
     9.803
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
