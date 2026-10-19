/* İbremetre · Af — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Saflık · Af · Cezalandırma). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-af",
 "ad": "Af: İbren Nerede?",
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
     "huy": "Af",
     "huyAnahtar": "Af",
     "olculen": "Özür dileyene karşılık verme biçimim",
     "kanca": "Affettim ama aklımda kalacak.",
     "uclar": {
      "az": "Saflık",
      "orta": "Af",
      "fazla": "Cezalandırma"
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
      "fazla": "Cezalandırma"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi “affettim” dese de özrü gerçekten kabul etmiyor, bunu özür dileyene sürekli hatırlatıp ona yük bindiriyor: sağ uca (Cezalandırma) yakın. Başka okumada affediyor ama aynı şeyin tekrar olmaması için dikkatli davranacağını söylüyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, özür dileyene nasıl karşılık verdiğimize bakar. Af; özür dileyeni adaletli biçimde bağışlamaktır. Bu ibre ölçekten çok yönü gösterir: bir uçta herkese hemen inanıp sınır koymamak (Saflık), öbür uçta özrü kabul etmeyip özür dileyene ceza vermek (kaynak listede Özrü Reddi) vardır. Sınır koymak, affetmemek demek değildir.",
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
      "fazla": "Cezalandırma"
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
          "m": "Özrünü kabul ediyorum; bir daha olmasın diye bir kural koyalım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: affın sesi."
         },
         {
          "m": "Özür yetmez; bir de ceza çekmeli ki bir daha yapmasın.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: cezalandırmanın sesi."
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
       "soru": "Özür dileyene ceza vermek neye benziyor?",
       "ad": "Cezalandırma",
       "soz": "Özür yetmez, önce bunun bedelini ödeyeceksin!",
       "eylem": "hayir",
       "zincir": [
        "Arkadaşı özrünün işe yaramadığını düşünür.",
        "Dostluk bir hesaplaşmaya döner ve ikisi de yorulur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Özür yetmez; bir de ceza çekmeli ki bir daha yapmasın.",
          "dogru": true,
          "not": "Cezalandırma, özrü kabul etmeyip özür dileyene ceza vermektir. Ceza barışı uzaklaştırır; fırsat vermek ikinizi de rahatlatır."
         },
         {
          "m": "Bir daha yapmaz dedi; yine inanırım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Özrünü kabul ediyorum; bir daha olmasın diye bir kural koyalım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: affın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Cezalandırma",
        "soz": "Özür"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Dostluk"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Af",
       "soz": "Özrünü kabul ediyorum. Ayrıca bir kural koyalım.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı rahatlar ve sözünü tutmaya çalışır.",
        "Dostluk kırılmadan güçlenebilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Özrünü kabul ediyorum; bir daha olmasın diye bir kural koyalım.",
          "dogru": true,
          "not": "Af, özür dileyeni adaletli biçimde bağışlamaktır. Sınır koymak affetmemek değildir."
         },
         {
          "m": "Bir daha yapmaz dedi; yine inanırım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: saflığın sesi."
         },
         {
          "m": "Özür yetmez; bir de ceza çekmeli ki bir daha yapmasın.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: cezalandırmanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Af",
        "soz": "Özrünü"
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
     "huy": "Af",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Saflık",
      "orta": "Af",
      "fazla": "Cezalandırma"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "defter",
       "baslik": "Lekelenen defter",
       "tetik": "Arkadaşın, defterini izinsiz alıp üzerine boya döktü ve özür diledi. Bu, geçen ay da olmuştu.",
       "secenekler": [
        {
         "m": "Bir daha yapmam diyor ya, hiç düşünmeden inanırım.",
         "zon": "az",
         "sonuc": "Aynı şey tekrar oluyor; sen yine üzülüyorsun.",
         "not": "İbre sola kaydı: sınır koymadan inanmak, aynı üzüntüyü tekrarlatır.",
         "ses": "s1az"
        },
        {
         "m": "Özür yetmez; bunun bedelini ödemeden barışmam.",
         "zon": "fazla",
         "sonuc": "Arkadaşın özrünün işe yaramadığını düşünüyor; aranız gerginleşiyor.",
         "not": "İbre sağa kaydı: özrü kabul etmeyip ceza vermek dostluğu hesaplaşmaya çevirir.",
         "ses": "s1fa"
        },
        {
         "m": "Özrünü kabul ediyorum; bundan sonra önce sorup alırız.",
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
       "baslik": "Ders arası",
       "tetik": "Bir arkadaşın ders arasında sana bağırıp seni kırdı. Sonra gelip içtenlikle özür diledi.",
       "secenekler": [
        {
         "m": "Sorun değil, yine istediği gibi davransın.",
         "zon": "az",
         "sonuc": "Davranış değişmiyor; yine kırılıyorsun.",
         "not": "İbre sola kaydı: hiç sınır koymamak, kırılmanın tekrarına kapı açıyor.",
         "ses": "s2az"
        },
        {
         "m": "Özür yetmez; bir hafta yanıma oturmayacaksın.",
         "zon": "fazla",
         "sonuc": "Özür dileyen kişi mahcup kalıyor; barışmak yerine hesaplaşma başlıyor.",
         "not": "İbre sağa kaydı: içten özrü cezayla karşılamak barışmanın yolunu uzatıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Özrünü kabul ettim; bir dahaki sefer sakin konuşalım.",
         "zon": "orta",
         "sonuc": "Arkadaşın söz veriyor; ikiniz yeniden rahatça konuşuyorsunuz.",
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
       "ad": "Fazla · Cezalandırma",
       "aciklama": "Özür dileyene ceza vermek",
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
       "metin": "Arkadaşı içtenlikle özür diler; o, tekrar tekrar özür dilemesini ister.",
       "alan": "fazla",
       "ipucu": "Özrü yeterli bulmuyor."
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
       "metin": "Özür dileyen arkadaşına “bedelini ödemeden barışmam” der.",
       "alan": "fazla",
       "ipucu": "Özrü cezaya bağlıyor."
      },
      {
       "id": "k6",
       "metin": "“Seni affettim; bir dahaki sefere önce bana sor” der.",
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
        "Özür dileyene kızgınken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Özür dileyene ceza vermek yerine fırsat vereceğim",
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
   "sure": 9.973,
   "m": "Sağ uçta Cezalandırma. Özür yetmez, önce bunun bedelini ödeyeceksin! Arkadaşı içtenlikle özür dilese de ona ceza verip tekrar özür dilettirir.",
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
     "Cezalandırma.",
     0.551,
     1.42
    ],
    [
     "Özür",
     1.855,
     2.23
    ],
    [
     "yetmez,",
     2.23,
     2.605
    ],
    [
     "önce",
     2.845,
     3.109
    ],
    [
     "bunun",
     3.109,
     3.373
    ],
    [
     "bedelini",
     3.373,
     3.9
    ],
    [
     "ödeyeceksin!",
     3.9,
     4.56
    ],
    [
     "Arkadaşı",
     5.345,
     5.996
    ],
    [
     "içtenlikle",
     5.996,
     6.647
    ],
    [
     "özür",
     6.647,
     6.973
    ],
    [
     "dilese",
     6.973,
     7.461
    ],
    [
     "de",
     7.461,
     7.624
    ],
    [
     "ona",
     7.624,
     7.949
    ],
    [
     "ceza",
     7.949,
     8.275
    ],
    [
     "verip",
     8.275,
     8.6
    ],
    [
     "tekrar",
     8.6,
     8.926
    ],
    [
     "özür",
     8.926,
     9.251
    ],
    [
     "dilettirir.",
     9.251,
     9.902
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.99,
   "m": "Sonra ne olur? Arkadaşı özrünün işe yaramadığını düşünür. Dostluk bir hesaplaşmaya döner ve ikisi de yorulur.",
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
     "Arkadaşı",
     1.13,
     1.722
    ],
    [
     "özrünün",
     1.722,
     2.166
    ],
    [
     "işe",
     2.166,
     2.462
    ],
    [
     "yaramadığını",
     2.462,
     3.351
    ],
    [
     "düşünür.",
     3.351,
     3.795
    ],
    [
     "Dostluk",
     3.9,
     4.236
    ],
    [
     "bir",
     4.236,
     4.403
    ],
    [
     "hesaplaşmaya",
     4.403,
     5.242
    ],
    [
     "döner",
     5.242,
     5.578
    ],
    [
     "ve",
     5.578,
     5.745
    ],
    [
     "ikisi",
     5.745,
     6.249
    ],
    [
     "de",
     6.249,
     6.417
    ],
    [
     "yorulur.",
     6.417,
     6.92
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
   "sure": 10.509,
   "m": "Tam kararında Af. Özrünü kabul ediyorum. Ayrıca bir kural koyalım. Pişman olanı bağışlar; bir daha olmaması için nazik bir sınır da koyar.",
   "k": [
    [
     "Tam",
     0.03,
     0.21
    ],
    [
     "kararında",
     0.21,
     0.93
    ],
    [
     "Af.",
     0.93,
     1.11
    ],
    [
     "Özrünü",
     1.21,
     1.91
    ],
    [
     "kabul",
     1.91,
     2.377
    ],
    [
     "ediyorum.",
     2.377,
     3.31
    ],
    [
     "Ayrıca",
     3.575,
     4.148
    ],
    [
     "bir",
     4.148,
     4.339
    ],
    [
     "kural",
     4.339,
     4.722
    ],
    [
     "koyalım.",
     4.722,
     5.295
    ],
    [
     "Pişman",
     5.8,
     6.145
    ],
    [
     "olanı",
     6.145,
     6.662
    ],
    [
     "bağışlar;",
     6.662,
     7.18
    ],
    [
     "bir",
     7.285,
     7.471
    ],
    [
     "daha",
     7.471,
     7.842
    ],
    [
     "olmaması",
     7.842,
     8.584
    ],
    [
     "için",
     8.584,
     8.955
    ],
    [
     "nazik",
     8.955,
     9.326
    ],
    [
     "bir",
     9.326,
     9.512
    ],
    [
     "sınır",
     9.512,
     9.883
    ],
    [
     "da",
     9.883,
     10.068
    ],
    [
     "koyar.",
     10.068,
     10.439
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.973,
   "m": "Sonra ne olur? Arkadaşı rahatlar ve sözünü tutmaya çalışır. Dostluk kırılmadan güçlenebilir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.278
    ],
    [
     "ne",
     0.278,
     0.402
    ],
    [
     "olur?",
     0.402,
     0.65
    ],
    [
     "Arkadaşı",
     1.215,
     1.789
    ],
    [
     "rahatlar",
     1.789,
     2.22
    ],
    [
     "ve",
     2.22,
     2.363
    ],
    [
     "sözünü",
     2.363,
     2.794
    ],
    [
     "tutmaya",
     2.794,
     3.224
    ],
    [
     "çalışır.",
     3.224,
     3.655
    ],
    [
     "Dostluk",
     4.005,
     4.35
    ],
    [
     "kırılmadan",
     4.35,
     5.04
    ],
    [
     "güçlenebilir.",
     5.04,
     5.903
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
   "sure": 6.972,
   "m": "Arkadaşın, defterini izinsiz alıp üzerine boya döktü ve özür diledi. Bu, geçen ay da olmuştu. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın,",
     0.03,
     0.73
    ],
    [
     "defterini",
     0.73,
     1.43
    ],
    [
     "izinsiz",
     1.43,
     1.955
    ],
    [
     "alıp",
     1.955,
     2.305
    ],
    [
     "üzerine",
     2.305,
     3.005
    ],
    [
     "boya",
     3.005,
     3.355
    ],
    [
     "döktü",
     3.355,
     3.705
    ],
    [
     "ve",
     3.705,
     3.88
    ],
    [
     "özür",
     3.88,
     4.23
    ],
    [
     "diledi.",
     4.23,
     4.755
    ],
    [
     "Bu,",
     4.945,
     5.061
    ],
    [
     "geçen",
     5.061,
     5.294
    ],
    [
     "ay",
     5.294,
     5.41
    ],
    [
     "da",
     5.41,
     5.526
    ],
    [
     "olmuştu.",
     5.526,
     5.875
    ],
    [
     "Ne",
     6.355,
     6.492
    ],
    [
     "yaparsın?",
     6.492,
     6.902
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
   "sure": 3.718,
   "m": "Arkadaşın özrünün işe yaramadığını düşünüyor; aranız gerginleşiyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.506
    ],
    [
     "özrünün",
     0.506,
     0.863
    ],
    [
     "işe",
     0.863,
     1.101
    ],
    [
     "yaramadığını",
     1.101,
     1.814
    ],
    [
     "düşünüyor;",
     1.814,
     2.29
    ],
    [
     "aranız",
     2.63,
     3.012
    ],
    [
     "gerginleşiyor.",
     3.012,
     3.648
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
   "sure": 5.461,
   "m": "Bir arkadaşın ders arasında sana bağırıp seni kırdı. Sonra gelip içtenlikle özür diledi. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.157
    ],
    [
     "arkadaşın",
     0.157,
     0.666
    ],
    [
     "ders",
     0.666,
     0.793
    ],
    [
     "arasında",
     0.793,
     1.301
    ],
    [
     "sana",
     1.301,
     1.555
    ],
    [
     "bağırıp",
     1.555,
     1.937
    ],
    [
     "seni",
     1.937,
     2.191
    ],
    [
     "kırdı.",
     2.191,
     2.445
    ],
    [
     "Sonra",
     2.65,
     2.935
    ],
    [
     "gelip",
     2.935,
     3.219
    ],
    [
     "içtenlikle",
     3.219,
     3.788
    ],
    [
     "özür",
     3.788,
     4.073
    ],
    [
     "diledi.",
     4.073,
     4.5
    ],
    [
     "Ne",
     4.775,
     4.929
    ],
    [
     "yaparsın?",
     4.929,
     5.391
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.422,
   "m": "Davranış değişmiyor; yine kırılıyorsun.",
   "k": [
    [
     "Davranış",
     0.03,
     0.521
    ],
    [
     "değişmiyor;",
     0.521,
     1.175
    ],
    [
     "yine",
     1.53,
     1.765
    ],
    [
     "kırılıyorsun.",
     1.765,
     2.352
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.083,
   "m": "Özür dileyen kişi mahcup kalıyor; barışmak yerine hesaplaşma başlıyor.",
   "k": [
    [
     "Özür",
     0.03,
     0.293
    ],
    [
     "dileyen",
     0.293,
     0.688
    ],
    [
     "kişi",
     0.688,
     0.952
    ],
    [
     "mahcup",
     0.952,
     1.215
    ],
    [
     "kalıyor;",
     1.215,
     1.61
    ],
    [
     "barışmak",
     1.895,
     2.384
    ],
    [
     "yerine",
     2.384,
     2.873
    ],
    [
     "hesaplaşma",
     2.873,
     3.524
    ],
    [
     "başlıyor.",
     3.524,
     4.013
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.737,
   "m": "Arkadaşın söz veriyor; ikiniz yeniden rahatça konuşuyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.633
    ],
    [
     "söz",
     0.633,
     0.783
    ],
    [
     "veriyor;",
     0.783,
     1.235
    ],
    [
     "ikiniz",
     1.56,
     1.981
    ],
    [
     "yeniden",
     1.981,
     2.403
    ],
    [
     "rahatça",
     2.403,
     2.824
    ],
    [
     "konuşuyorsunuz.",
     2.824,
     3.667
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
   "sure": 12.444,
   "m": "Bu cümle bilerek çift anlamlı. Özrü gerçekten kabul etmeyip özür dileyene yük bindiren biri diyorsa sağ uca yakın. Affedip bir daha olmaması için dikkat edeceğini söyleyen biri diyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.206
    ],
    [
     "cümle",
     0.206,
     0.559
    ],
    [
     "bilerek",
     0.559,
     1.089
    ],
    [
     "çift",
     1.089,
     1.265
    ],
    [
     "anlamlı.",
     1.265,
     1.795
    ],
    [
     "Özrü",
     1.895,
     2.237
    ],
    [
     "gerçekten",
     2.237,
     2.749
    ],
    [
     "kabul",
     2.749,
     3.091
    ],
    [
     "etmeyip",
     3.091,
     3.603
    ],
    [
     "özür",
     3.603,
     3.945
    ],
    [
     "dileyene",
     3.945,
     4.628
    ],
    [
     "yük",
     4.628,
     4.799
    ],
    [
     "bindiren",
     4.799,
     5.312
    ],
    [
     "biri",
     5.312,
     5.653
    ],
    [
     "diyorsa",
     5.653,
     6.166
    ],
    [
     "sağ",
     6.166,
     6.337
    ],
    [
     "uca",
     6.337,
     6.678
    ],
    [
     "yakın.",
     6.678,
     7.02
    ],
    [
     "Affedip",
     7.74,
     8.161
    ],
    [
     "bir",
     8.161,
     8.302
    ],
    [
     "daha",
     8.302,
     8.583
    ],
    [
     "olmaması",
     8.583,
     9.144
    ],
    [
     "için",
     9.144,
     9.425
    ],
    [
     "dikkat",
     9.425,
     9.706
    ],
    [
     "edeceğini",
     9.706,
     10.408
    ],
    [
     "söyleyen",
     10.408,
     10.829
    ],
    [
     "biri",
     10.829,
     11.11
    ],
    [
     "diyorsa",
     11.11,
     11.532
    ],
    [
     "orta",
     11.532,
     11.812
    ],
    [
     "uca",
     11.812,
     12.093
    ],
    [
     "yakın.",
     12.093,
     12.374
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
