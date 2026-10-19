/* İbremetre · Af — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Saflık · Af · Özrü Reddi). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-af",
 "ad": "Af: İbren Nerede?",
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
     "huy": "Af",
     "huyAnahtar": "Af",
     "olculen": "Özür dileyene karşılık verme biçimim",
     "kanca": "Affettim ama aklımda kalacak.",
     "uclar": {
      "az": "Saflık",
      "orta": "Af",
      "fazla": "Özrü Reddi"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Af",
     "cumle": "Affettim ama aklımda kalacak.",
     "uclar": {
      "az": "Saflık",
      "orta": "Af",
      "fazla": "Özrü Reddi"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi “affettim” dese de içinde kin saklıyor: sağ uca (Özrü Reddi) yakın. Başka okumada affediyor ama aynı şeyin tekrar olmaması için dikkatli davranacağını söylüyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, özür dileyene nasıl karşılık verdiğimize bakar. Af; özür dileyeni adaletli biçimde bağışlamaktır. Bu ibre ölçekten çok yönü gösterir: bir uçta herkese hemen inanıp sınır koymamak (Saflık), öbür uçta pişman olana bile kin tutmak vardır. Sınır koymak, affetmemek demek değildir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Af",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Saflık",
      "orta": "Af",
      "fazla": "Özrü Reddi"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Sınır koymadan inanmak neye benziyor?",
       "ad": "Saflık",
       "soz": "Bir daha yapmam dedi; tabii ki inanırım.",
       "eylem": "yaslan",
       "zincir": [
        "Arkadaşı aynı hatayı tekrarlar.",
        "Kendisi her seferinde yeniden üzülür."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bir daha yapmaz dedi; yine inanırım.",
          "dogru": true,
          "not": "Saflık, sınır koymadan hemen inanmaktır. Affetmek güzeldir; ama aynı hata tekrar ederse nazik bir sınır koymak da gerekir."
         },
         {
          "m": "Seni affediyorum; ama bir daha olmasın diye bir kural koyalım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: affın sesi."
         },
         {
          "m": "Pişman olsa da affetmem, unutmam.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: özrü reddetmenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Saflık",
        "soz": "Bir"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Kendisi"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Özrü kabul etmemek neye benziyor?",
       "ad": "Kin",
       "soz": "Pişman olsan da seni asla affetmem!",
       "eylem": "hayir",
       "zincir": [
        "Arkadaşı üzülür ve barışma isteğini kaybeder.",
        "Kin büyür ve onu taşıyanı da yorar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Pişman olsa da affetmem, unutmam.",
          "dogru": true,
          "not": "Özrü reddetmek, pişman olana bile kin tutmaktır. Kin taşıyan kişi en çok kendini yorar."
         },
         {
          "m": "Bir daha yapmaz dedi; yine inanırım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Seni affediyorum; ama bir daha olmasın diye bir kural koyalım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: affın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kin",
        "soz": "Pişman"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Kin"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Af",
       "soz": "Özrünü kabul ediyorum; ama bir kural koyalım.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı rahatlar ve sözünü tutmaya çalışır.",
        "Dostlukları kırılmadan güçlenir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Seni affediyorum; ama bir daha olmasın diye bir kural koyalım.",
          "dogru": true,
          "not": "Af, özür dileyeni adaletli biçimde bağışlamaktır. Sınır koymak affetmemek değildir."
         },
         {
          "m": "Bir daha yapmaz dedi; yine inanırım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Pişman olsa da affetmem, unutmam.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: özrü reddetmenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Af",
        "soz": "Özrünü"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Dostlukları"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Af",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Saflık",
      "orta": "Af",
      "fazla": "Özrü Reddi"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "kalem",
       "baslik": "Kırılan kalem",
       "tetik": "Arkadaşın kalemini izinsiz alıp kırdı ve özür diledi. Bu, geçen ay da olmuştu.",
       "secenekler": [
        {
         "m": "Bir daha yapmam diyor ya, hiç düşünmeden inanırım.",
         "zon": "az",
         "sonuc": "Aynı şey tekrar oluyor; sen yine üzülüyorsun.",
         "not": "İbre sola kaydı: sınır koymadan inanmak, aynı üzüntüyü tekrarlatır.",
         "ses": "s1az"
        },
        {
         "m": "Özür dilesen de affetmem; hep hatırlarım.",
         "zon": "fazla",
         "sonuc": "Arkadaşın seninle konuşmaktan çekiniyor; dostluk soğuyor.",
         "not": "İbre sağa kaydı: pişman olanı bile bağışlamamak dostluğu soğutur.",
         "ses": "s1fa"
        },
        {
         "m": "Özrünü kabul ediyorum; bundan sonra sorup alalım.",
         "zon": "orta",
         "sonuc": "Arkadaşın rahatlıyor; ikiniz de yeni kuralı kabul ediyorsunuz.",
         "not": "İbre ortada: bağışladın ve nazik bir sınır koydun.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "oyun",
       "baslik": "Oyundan dışlanmak",
       "tetik": "Bir arkadaşın seni oyuna almayıp kırdı. Sonra gelip içtenlikle özür diledi.",
       "secenekler": [
        {
         "m": "Sorun değil, yine istediği gibi davransın.",
         "zon": "az",
         "sonuc": "Davranış değişmiyor; sen yine dışarıda kalıyorsun.",
         "not": "İbre sola kaydı: hiç sınır koymamak, kırılmanın tekrarına kapı açıyor.",
         "ses": "s2az"
        },
        {
         "m": "Özür işe yaramaz; seninle bir daha oynamam.",
         "zon": "fazla",
         "sonuc": "Özür dileyen kişi mahcup kalıyor; dostluk bitiyor.",
         "not": "İbre sağa kaydı: içten özrü kabul etmemek barışmanın yolunu kapatıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Özrünü kabul ettim; bir dahaki oyuna beni de al.",
         "zon": "orta",
         "sonuc": "Arkadaşın söz veriyor; ikiniz yeniden birlikte oynuyorsunuz.",
         "not": "İbre ortada: barıştın ve ne beklediğini nazikçe söyledin.",
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
       "aciklama": "Sınırsızca inanmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Af",
       "aciklama": "Bağışlamak ve nazik sınır",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Özrü Reddi",
       "aciklama": "Özrü kabul etmemek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Aynı hatayı yinelese de her özür dileyene hemen inanır.",
       "alan": "az",
       "ipucu": "Sınır koymadan güveniyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı içtenlikle özür diler; “asla affetmem” der.",
       "alan": "fazla",
       "ipucu": "Pişman olanı bile bağışlamıyor."
      },
      {
       "id": "k3",
       "metin": "Özrü kabul eder ve “bir daha olmasın” diye nazikçe konuşur.",
       "alan": "orta",
       "ipucu": "Affediyor ve sınırı söylüyor."
      },
      {
       "id": "k4",
       "metin": "Arkadaşı onu defalarca kırsa da hiç kural koymadan “tamam” der.",
       "alan": "az",
       "ipucu": "Hiç sınırı yok."
      },
      {
       "id": "k5",
       "metin": "Özür kabul edildikten sonra bile eski hatayı sürekli hatırlatır.",
       "alan": "fazla",
       "ipucu": "Kinini sürdürüyor."
      },
      {
       "id": "k6",
       "metin": "“Seni affettim, ama bir dahaki sefere önce bana sor” der.",
       "alan": "orta",
       "ipucu": "Bağışlıyor ve sınır koyuyor."
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
        "Biri bana özür dileyince",
        "Aynı hata tekrar edilince",
        "Bir arkadaşım beni kırınca",
        "İçimde kin büyürken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Özür dileyene bir fırsat vereceğim",
        "Gerekirse nazikçe “bir daha olmasın” diyeceğim",
        "Çok üzüldüysem güvendiğim bir yetişkinle konuşacağım"
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
       "baslik": "Af",
       "metin": "bağışlamak ve nazik sınır koymak",
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
   "sure": 2.334,
   "m": "Affettim ama aklımda kalacak.",
   "k": [
    [
     "Affettim",
     0.03,
     0.639
    ],
    [
     "ama",
     0.639,
     1.045
    ],
    [
     "aklımda",
     1.045,
     1.655
    ],
    [
     "kalacak.",
     1.655,
     2.264
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 12.058,
   "m": "Birçok güzel huy bir ibre gibidir. Af, özür dileyene nasıl karşılık verdiğimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.558
    ],
    [
     "güzel",
     0.558,
     1.086
    ],
    [
     "huy",
     1.086,
     1.35
    ],
    [
     "bir",
     1.35,
     1.615
    ],
    [
     "ibre",
     1.615,
     2.143
    ],
    [
     "gibidir.",
     2.143,
     2.935
    ],
    [
     "Af,",
     3.26,
     3.509
    ],
    [
     "özür",
     3.509,
     4.006
    ],
    [
     "dileyene",
     4.006,
     5.0
    ],
    [
     "nasıl",
     5.0,
     5.498
    ],
    [
     "karşılık",
     5.498,
     6.243
    ],
    [
     "verdiğimi",
     6.243,
     7.238
    ],
    [
     "ölçer.",
     7.238,
     7.735
    ],
    [
     "İbre",
     7.89,
     8.327
    ],
    [
     "üç",
     8.327,
     8.545
    ],
    [
     "yerde",
     8.545,
     8.982
    ],
    [
     "durabilir:",
     8.982,
     9.855
    ],
    [
     "az,",
     10.365,
     10.505
    ],
    [
     "kararında,",
     10.505,
     11.065
    ],
    [
     "fazla.",
     11.635,
     11.988
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
   "sure": 8.012,
   "m": "Sol uçta Saflık. Bir daha yapmam dedi; tabii ki inanırım. Aynı hatayı tekrarlayan arkadaşına yine hiç düşünmeden inanır.",
   "k": [
    [
     "Sol",
     0.03,
     0.158
    ],
    [
     "uçta",
     0.158,
     0.414
    ],
    [
     "Saflık.",
     0.414,
     0.67
    ],
    [
     "Bir",
     0.87,
     1.112
    ],
    [
     "daha",
     1.112,
     1.596
    ],
    [
     "yapmam",
     1.596,
     2.081
    ],
    [
     "dedi;",
     2.081,
     2.565
    ],
    [
     "tabii",
     2.65,
     2.817
    ],
    [
     "ki",
     2.817,
     2.873
    ],
    [
     "inanırım.",
     2.873,
     3.095
    ],
    [
     "Aynı",
     3.43,
     3.806
    ],
    [
     "hatayı",
     3.806,
     4.37
    ],
    [
     "tekrarlayan",
     4.37,
     5.122
    ],
    [
     "arkadaşına",
     5.122,
     6.062
    ],
    [
     "yine",
     6.062,
     6.438
    ],
    [
     "hiç",
     6.438,
     6.626
    ],
    [
     "düşünmeden",
     6.626,
     7.378
    ],
    [
     "inanır.",
     7.378,
     7.942
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.04,
   "m": "Sonra ne olur? Arkadaşı aynı hatayı tekrarlar. Kendisi her seferinde yeniden üzülür.",
   "k": [
    [
     "Sonra",
     0.03,
     0.3
    ],
    [
     "ne",
     0.3,
     0.435
    ],
    [
     "olur?",
     0.435,
     0.705
    ],
    [
     "Arkadaşı",
     1.11,
     1.688
    ],
    [
     "aynı",
     1.688,
     1.978
    ],
    [
     "hatayı",
     1.978,
     2.411
    ],
    [
     "tekrarlar.",
     2.411,
     2.845
    ],
    [
     "Kendisi",
     3.26,
     3.626
    ],
    [
     "her",
     3.626,
     3.749
    ],
    [
     "seferinde",
     3.749,
     4.237
    ],
    [
     "yeniden",
     4.237,
     4.603
    ],
    [
     "üzülür.",
     4.603,
     4.97
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
   "sure": 8.149,
   "m": "Sağ uçta Kin. Pişman olsan da seni asla affetmem! Arkadaşı içtenlikle özür dilese de yüzüne bile bakmaz.",
   "k": [
    [
     "Sağ",
     0.03,
     0.204
    ],
    [
     "uçta",
     0.204,
     0.551
    ],
    [
     "Kin.",
     0.551,
     0.725
    ],
    [
     "Pişman",
     0.825,
     1.162
    ],
    [
     "olsan",
     1.162,
     1.498
    ],
    [
     "da",
     1.498,
     1.667
    ],
    [
     "seni",
     1.667,
     2.003
    ],
    [
     "asla",
     2.003,
     2.34
    ],
    [
     "affetmem!",
     2.34,
     2.845
    ],
    [
     "Arkadaşı",
     2.96,
     3.935
    ],
    [
     "içtenlikle",
     3.935,
     4.91
    ],
    [
     "özür",
     4.91,
     5.398
    ],
    [
     "dilese",
     5.398,
     6.129
    ],
    [
     "de",
     6.129,
     6.373
    ],
    [
     "yüzüne",
     6.373,
     7.104
    ],
    [
     "bile",
     7.104,
     7.592
    ],
    [
     "bakmaz.",
     7.592,
     8.079
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.701,
   "m": "Sonra ne olur? Arkadaşı üzülür ve barışma isteğini kaybeder. Kin büyür ve onu taşıyanı da yorar.",
   "k": [
    [
     "Sonra",
     0.03,
     0.268
    ],
    [
     "ne",
     0.268,
     0.387
    ],
    [
     "olur?",
     0.387,
     0.625
    ],
    [
     "Arkadaşı",
     1.115,
     1.702
    ],
    [
     "üzülür",
     1.702,
     2.142
    ],
    [
     "ve",
     2.142,
     2.288
    ],
    [
     "barışma",
     2.288,
     2.728
    ],
    [
     "isteğini",
     2.728,
     3.315
    ],
    [
     "kaybeder.",
     3.315,
     3.755
    ],
    [
     "Kin",
     4.155,
     4.345
    ],
    [
     "büyür",
     4.345,
     4.726
    ],
    [
     "ve",
     4.726,
     4.917
    ],
    [
     "onu",
     4.917,
     5.298
    ],
    [
     "taşıyanı",
     5.298,
     6.06
    ],
    [
     "da",
     6.06,
     6.25
    ],
    [
     "yorar.",
     6.25,
     6.631
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
   "sure": 9.492,
   "m": "Tam kararında Af. Özrünü kabul ediyorum; ama bir kural koyalım. Pişman olanı bağışlar; bir daha olmaması için nazik bir sınır da koyar.",
   "k": [
    [
     "Tam",
     0.03,
     0.199
    ],
    [
     "kararında",
     0.199,
     0.876
    ],
    [
     "Af.",
     0.876,
     1.045
    ],
    [
     "Özrünü",
     1.475,
     1.857
    ],
    [
     "kabul",
     1.857,
     2.111
    ],
    [
     "ediyorum;",
     2.111,
     2.62
    ],
    [
     "ama",
     3.1,
     3.408
    ],
    [
     "bir",
     3.408,
     3.561
    ],
    [
     "kural",
     3.561,
     3.869
    ],
    [
     "koyalım.",
     3.869,
     4.33
    ],
    [
     "Pişman",
     4.92,
     5.248
    ],
    [
     "olanı",
     5.248,
     5.739
    ],
    [
     "bağışlar;",
     5.739,
     6.23
    ],
    [
     "bir",
     6.53,
     6.7
    ],
    [
     "daha",
     6.7,
     7.04
    ],
    [
     "olmaması",
     7.04,
     7.721
    ],
    [
     "için",
     7.721,
     8.061
    ],
    [
     "nazik",
     8.061,
     8.401
    ],
    [
     "bir",
     8.401,
     8.571
    ],
    [
     "sınır",
     8.571,
     8.911
    ],
    [
     "da",
     8.911,
     9.081
    ],
    [
     "koyar.",
     9.081,
     9.422
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.772,
   "m": "Sonra ne olur? Arkadaşı rahatlar ve sözünü tutmaya çalışır. Dostlukları kırılmadan güçlenir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.24
    ],
    [
     "ne",
     0.24,
     0.345
    ],
    [
     "olur?",
     0.345,
     0.555
    ],
    [
     "Arkadaşı",
     1.125,
     1.704
    ],
    [
     "rahatlar",
     1.704,
     2.138
    ],
    [
     "ve",
     2.138,
     2.283
    ],
    [
     "sözünü",
     2.283,
     2.717
    ],
    [
     "tutmaya",
     2.717,
     3.151
    ],
    [
     "çalışır.",
     3.151,
     3.585
    ],
    [
     "Dostlukları",
     3.935,
     4.577
    ],
    [
     "kırılmadan",
     4.577,
     5.22
    ],
    [
     "güçlenir.",
     5.22,
     5.702
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
   "sure": 5.692,
   "m": "Arkadaşın kalemini izinsiz alıp kırdı ve özür diledi. Bu, geçen ay da olmuştu. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.703
    ],
    [
     "kalemini",
     0.703,
     1.377
    ],
    [
     "izinsiz",
     1.377,
     1.882
    ],
    [
     "alıp",
     1.882,
     2.218
    ],
    [
     "kırdı",
     2.218,
     2.555
    ],
    [
     "ve",
     2.555,
     2.723
    ],
    [
     "özür",
     2.723,
     3.06
    ],
    [
     "diledi.",
     3.06,
     3.565
    ],
    [
     "Bu,",
     3.64,
     3.763
    ],
    [
     "geçen",
     3.763,
     4.009
    ],
    [
     "ay",
     4.009,
     4.133
    ],
    [
     "da",
     4.133,
     4.256
    ],
    [
     "olmuştu.",
     4.256,
     4.625
    ],
    [
     "Ne",
     5.03,
     5.178
    ],
    [
     "yaparsın?",
     5.178,
     5.622
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.184,
   "m": "Aynı şey tekrar oluyor; sen yine üzülüyorsun.",
   "k": [
    [
     "Aynı",
     0.03,
     0.334
    ],
    [
     "şey",
     0.334,
     0.486
    ],
    [
     "tekrar",
     0.486,
     0.789
    ],
    [
     "oluyor;",
     0.789,
     1.245
    ],
    [
     "sen",
     1.555,
     1.75
    ],
    [
     "yine",
     1.75,
     2.139
    ],
    [
     "üzülüyorsun.",
     2.139,
     3.114
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.791,
   "m": "Arkadaşın seninle konuşmaktan çekiniyor; dostluk soğuyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.803
    ],
    [
     "seninle",
     0.803,
     1.383
    ],
    [
     "konuşmaktan",
     1.383,
     2.157
    ],
    [
     "çekiniyor;",
     2.157,
     2.93
    ],
    [
     "dostluk",
     3.005,
     3.291
    ],
    [
     "soğuyor.",
     3.291,
     3.721
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.917,
   "m": "Arkadaşın rahatlıyor; ikiniz de yeni kuralı kabul ediyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.557
    ],
    [
     "rahatlıyor;",
     0.557,
     1.085
    ],
    [
     "ikiniz",
     1.445,
     1.895
    ],
    [
     "de",
     1.895,
     2.045
    ],
    [
     "yeni",
     2.045,
     2.346
    ],
    [
     "kuralı",
     2.346,
     2.796
    ],
    [
     "kabul",
     2.796,
     3.096
    ],
    [
     "ediyorsunuz.",
     3.096,
     3.847
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.685,
   "m": "Bir arkadaşın seni oyuna almayıp kırdı. Sonra gelip içtenlikle özür diledi. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.146
    ],
    [
     "arkadaşın",
     0.146,
     0.608
    ],
    [
     "seni",
     0.608,
     0.84
    ],
    [
     "oyuna",
     0.84,
     1.187
    ],
    [
     "almayıp",
     1.187,
     1.534
    ],
    [
     "kırdı.",
     1.534,
     1.765
    ],
    [
     "Sonra",
     2.045,
     2.314
    ],
    [
     "gelip",
     2.314,
     2.583
    ],
    [
     "içtenlikle",
     2.583,
     3.122
    ],
    [
     "özür",
     3.122,
     3.391
    ],
    [
     "diledi.",
     3.391,
     3.795
    ],
    [
     "Ne",
     4.135,
     4.255
    ],
    [
     "yaparsın?",
     4.255,
     4.615
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.9,
   "m": "Davranış değişmiyor; sen yine dışarıda kalıyorsun.",
   "k": [
    [
     "Davranış",
     0.03,
     0.484
    ],
    [
     "değişmiyor;",
     0.484,
     1.09
    ],
    [
     "sen",
     1.355,
     1.489
    ],
    [
     "yine",
     1.489,
     1.757
    ],
    [
     "dışarıda",
     1.757,
     2.293
    ],
    [
     "kalıyorsun.",
     2.293,
     2.83
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 2.983,
   "m": "Özür dileyen kişi mahcup kalıyor; dostluk bitiyor.",
   "k": [
    [
     "Özür",
     0.03,
     0.314
    ],
    [
     "dileyen",
     0.314,
     0.74
    ],
    [
     "kişi",
     0.74,
     1.025
    ],
    [
     "mahcup",
     1.025,
     1.309
    ],
    [
     "kalıyor;",
     1.309,
     1.735
    ],
    [
     "dostluk",
     2.0,
     2.365
    ],
    [
     "bitiyor.",
     2.365,
     2.913
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.715,
   "m": "Arkadaşın söz veriyor; ikiniz yeniden birlikte oynuyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.635
    ],
    [
     "söz",
     0.635,
     0.786
    ],
    [
     "veriyor;",
     0.786,
     1.24
    ],
    [
     "ikiniz",
     1.555,
     2.003
    ],
    [
     "yeniden",
     2.003,
     2.451
    ],
    [
     "birlikte",
     2.451,
     2.899
    ],
    [
     "oynuyorsunuz.",
     2.899,
     3.645
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
   "sure": 10.761,
   "m": "Bu cümle bilerek çift anlamlı. İçinde kin saklayan biri diyorsa sağ uca yakın. Affedip bir daha olmaması için dikkat edeceğini söyleyen biri diyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.204
    ],
    [
     "cümle",
     0.204,
     0.553
    ],
    [
     "bilerek",
     0.553,
     1.077
    ],
    [
     "çift",
     1.077,
     1.252
    ],
    [
     "anlamlı.",
     1.252,
     1.775
    ],
    [
     "İçinde",
     2.125,
     2.504
    ],
    [
     "kin",
     2.504,
     2.631
    ],
    [
     "saklayan",
     2.631,
     3.01
    ],
    [
     "biri",
     3.01,
     3.263
    ],
    [
     "diyorsa",
     3.263,
     3.643
    ],
    [
     "sağ",
     3.643,
     3.769
    ],
    [
     "uca",
     3.769,
     4.022
    ],
    [
     "yakın.",
     4.022,
     4.275
    ],
    [
     "Affedip",
     4.46,
     5.026
    ],
    [
     "bir",
     5.026,
     5.215
    ],
    [
     "daha",
     5.215,
     5.593
    ],
    [
     "olmaması",
     5.593,
     6.348
    ],
    [
     "için",
     6.348,
     6.726
    ],
    [
     "dikkat",
     6.726,
     7.103
    ],
    [
     "edeceğini",
     7.103,
     8.047
    ],
    [
     "söyleyen",
     8.047,
     8.614
    ],
    [
     "biri",
     8.614,
     8.992
    ],
    [
     "diyorsa",
     8.992,
     9.558
    ],
    [
     "orta",
     9.558,
     9.936
    ],
    [
     "uca",
     9.936,
     10.313
    ],
    [
     "yakın.",
     10.313,
     10.691
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
