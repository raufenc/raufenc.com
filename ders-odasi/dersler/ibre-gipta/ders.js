/* İbremetre · Gıpta — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Duyarsızlık · Gıpta · Hased). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-gipta",
 "ad": "Gıpta: İbren Nerede?",
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
     "huy": "Gıpta",
     "huyAnahtar": "Gıpta",
     "olculen": "Başkasının iyiliğine bakış biçimim",
     "kanca": "Keşke onun yerinde ben olsam.",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Gıpta",
      "fazla": "Hased"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Gıpta",
     "cumle": "Keşke onun yerinde ben olsam.",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Gıpta",
      "fazla": "Hased"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi arkadaşının başarısını görüp onun gibi çalışmaya özeniyor: orta uca yakın. Başka okumada o başarının arkadaşından gidip kendisine gelmesini istiyor: sağ uca (Hased) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an başkasının iyiliğine nasıl baktığımıza bakar. Gıpta; güzel bir örneği görüp ona benzemeye çalışmak ve onun sevincine sevinebilmektir. Hased ise “daha fazla gıpta” değildir: gıptada yön örneğe doğru çalışmaktır, hasedde yön değişir ve o iyiliğin karşındakinden gitmesini istemeye döner. Bu ibre ölçekten çok yönü gösterir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Gıpta",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Gıpta",
      "fazla": "Hased"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Başkasının başarısına ilgisiz kalmak neye benziyor?",
       "ad": "Duyarsızlık",
       "soz": "Başarmış, bana ne; bakmam bile.",
       "eylem": "yaslan",
       "zincir": [
        "Arkadaşı sevincini paylaşacak kimse bulamaz.",
        "Kendisi de güzel bir örnekten öğrenme fırsatını kaçırır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Onun başarısı beni ilgilendirmez.",
          "dogru": true,
          "not": "Duyarsızlık, başkasının başarısına ilgisiz kalmaktır. Hem sevinmeyi hem özenmeyi kapatır."
         },
         {
          "m": "Ne güzel başarmış; ben de çalışayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: gıptanın sesi."
         },
         {
          "m": "Bu başarı onda kalmasın, bana gelsin.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hasedin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Duyarsızlık",
        "soz": "Başarmış,"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Kendisi"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Başkasının iyiliğini çekemeyen kişi neyi kaçırır?",
       "ad": "Hased",
       "soz": "Hak etmedi, o başarı bende olmalıydı!",
       "eylem": "isaret",
       "zincir": [
        "Kıskançlık içini sıkar, kendi işine odaklanamaz.",
        "Dostluk soğur, araya sessiz bir mesafe girer."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Onda olmasın, bende olsun.",
          "dogru": true,
          "not": "Hased, başkasının iyiliğini kıskanmaktır. Özenmek değil, o iyiliğin karşındakinden gitmesini istemektir."
         },
         {
          "m": "Onun başarısı beni ilgilendirmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: duyarsızlığın sesi."
         },
         {
          "m": "Ne güzel başarmış; ben de çalışayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: gıptanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hased",
        "soz": "Hak"
       },
       "zincirAnahtar": [
        "Kıskançlık",
        "Dostluk"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Gıpta",
       "soz": "Çok güzel olmuş, ben de çalışayım!",
       "eylem": "sevinc",
       "zincir": [
        "Tebrik edilen arkadaşı da sevinir.",
        "Kendisi de çalışmaya yeni bir güçle başlar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ne güzel başarmış; ben de çalışayım.",
          "dogru": true,
          "not": "Gıpta, iyi bir örneğe özenip ona benzemek istemektir. Güzelliği ondan almak değil, kendine katmak ister."
         },
         {
          "m": "Onun başarısı beni ilgilendirmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: duyarsızlığın sesi."
         },
         {
          "m": "Bu başarı onda kalmasın, bana gelsin.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hasedin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Gıpta",
        "soz": "Çok"
       },
       "zincirAnahtar": [
        "Tebrik",
        "Kendisi"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Gıpta",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Gıpta",
      "fazla": "Hased"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "madalya",
       "baslik": "Madalya günü",
       "tetik": "Sınıf arkadaşın yarışmada madalya aldı ve herkes onu alkışlıyor.",
       "secenekler": [
        {
         "m": "Alkışlamam; başarısı ilgimi çekmiyor.",
         "zon": "az",
         "sonuc": "Arkadaşın senden de bir tebrik bekliyordu; sen sınıfın ortak sevincinden uzakta kalıyorsun.",
         "not": "İbre sola kaydı: ilgisiz kalmak hem sevinmeyi hem özenmeyi kapatıyor.",
         "ses": "s1az"
        },
        {
         "m": "Madalya bende olmalıydı; ona sevinemem.",
         "zon": "fazla",
         "sonuc": "İçin sıkılıyor; arkadaşın sevinirken sen onun başarısını küçültecek sözler arıyorsun.",
         "not": "İbre sağa kaydı: özenmek yerine o iyiliğin ondan gitmesini istemeye döndü.",
         "ses": "s1fa"
        },
        {
         "m": "Tebrik ederim; ben de bir dahaki sefere denerim.",
         "zon": "orta",
         "sonuc": "Arkadaşın gülümsüyor; sen de neleri çalışman gerektiğini düşünüyorsun.",
         "not": "İbre ortada: başkasının başarısına sevinip kendine örnek almak.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "not",
       "baslik": "Yüksek not",
       "tetik": "Arkadaşın sınavdan senden yüksek not aldı ve nasıl çalıştığını anlatıyor.",
       "secenekler": [
        {
         "m": "Anlatsın, beni ilgilendirmez.",
         "zon": "az",
         "sonuc": "Çalışma yöntemini dinlemiyorsun; öğrenebileceğin güzel bir yol yanından geçiyor.",
         "not": "İbre sola kaydı: ilgisiz kalmak, güzel örnekten öğrenmeyi engelliyor.",
         "ses": "s2az"
        },
        {
         "m": "Onun notu düşse, benimki yükselse.",
         "zon": "fazla",
         "sonuc": "İçin sıkıntıyla doluyor; arkadaşının çabasını göremiyorsun, kendi çalışmana da odaklanamıyorsun.",
         "not": "İbre sağa kaydı: örnek almak yerine onun eksilmesini istemeye döndü.",
         "ses": "s2fa"
        },
        {
         "m": "Nasıl çalıştığını anlat; ben de deneyeyim.",
         "zon": "orta",
         "sonuc": "Arkadaşın yöntemini paylaşıyor; sen de kendi çalışma planını hazırlıyorsun.",
         "not": "İbre ortada: iyi örneğe özenmek, çalışmanı güçlendiriyor.",
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
       "ad": "Az · Duyarsızlık",
       "aciklama": "Başarıya ilgisiz kalmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Gıpta",
       "aciklama": "Güzel örneğe özenmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Hased",
       "aciklama": "İyiliğin ondan gitmesini istemek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşı resim yarışmasını kazanınca başını çevirir, bir şey demez.",
       "alan": "az",
       "ipucu": "Başarıya hiç ilgi göstermiyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı takım kaptanı seçilince ona bu görevi çok görüp suratını asar.",
       "alan": "fazla",
       "ipucu": "Onun iyiliğini çok görüyor."
      },
      {
       "id": "k3",
       "metin": "Arkadaşının güzel yazısını görünce onun gibi yazmaya çalışır.",
       "alan": "orta",
       "ipucu": "Örneğe özenip öğreniyor."
      },
      {
       "id": "k4",
       "metin": "Sınıfta başarılı biri tebrik edilirken “beni ilgilendirmez” der.",
       "alan": "az",
       "ipucu": "Sevince katılmıyor."
      },
      {
       "id": "k5",
       "metin": "Arkadaşı övülünce “bunu hak etmedi” diye kendi kendine söylenir.",
       "alan": "fazla",
       "ipucu": "Onun başarısını küçültüyor."
      },
      {
       "id": "k6",
       "metin": "Başarılı arkadaşına çalışma yöntemini sorar.",
       "alan": "orta",
       "ipucu": "Örnekten öğrenmek istiyor."
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
        "Bir arkadaşım başarı gösterince",
        "Notlar açıklanırken",
        "Bir arkadaşım ödül alınca",
        "Kendimi başkasıyla karşılaştırınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Arkadaşımı içtenlikle tebrik edeceğim",
        "Güzel bulduğum şeyi kendime örnek alıp çalışacağım",
        "İçim sıkılırsa güvendiğim bir yetişkinle konuşacağım"
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
       "baslik": "Gıpta",
       "metin": "güzele özenip çalışmak",
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
   "sure": 1.865,
   "m": "Keşke onun yerinde ben olsam.",
   "k": [
    [
     "Keşke",
     0.03,
     0.383
    ],
    [
     "onun",
     0.383,
     0.736
    ],
    [
     "yerinde",
     0.736,
     1.266
    ],
    [
     "ben",
     1.266,
     1.442
    ],
    [
     "olsam.",
     1.442,
     1.795
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.559,
   "m": "Birçok güzel huy bir ibre gibidir. Gıpta, başkasının iyiliğine nasıl baktığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.461
    ],
    [
     "güzel",
     0.461,
     0.892
    ],
    [
     "huy",
     0.892,
     1.107
    ],
    [
     "bir",
     1.107,
     1.323
    ],
    [
     "ibre",
     1.323,
     1.754
    ],
    [
     "gibidir.",
     1.754,
     2.4
    ],
    [
     "Gıpta,",
     3.055,
     3.545
    ],
    [
     "başkasının",
     3.71,
     4.365
    ],
    [
     "iyiliğine",
     4.365,
     5.184
    ],
    [
     "nasıl",
     5.184,
     5.512
    ],
    [
     "baktığımı",
     5.512,
     6.167
    ],
    [
     "ölçer.",
     6.167,
     6.495
    ],
    [
     "İbre",
     6.585,
     7.081
    ],
    [
     "üç",
     7.081,
     7.328
    ],
    [
     "yerde",
     7.328,
     7.824
    ],
    [
     "durabilir:",
     7.824,
     8.815
    ],
    [
     "az,",
     9.085,
     9.77
    ],
    [
     "kararında,",
     10.105,
     10.361
    ],
    [
     "fazla.",
     10.361,
     10.489
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
   "sure": 7.002,
   "m": "Sol uçta Duyarsızlık. Başarmış, bana ne; bakmam bile. Arkadaşı ödül alırken başını çevirir.",
   "k": [
    [
     "Sol",
     0.03,
     0.292
    ],
    [
     "uçta",
     0.292,
     0.816
    ],
    [
     "Duyarsızlık.",
     0.816,
     1.865
    ],
    [
     "Başarmış,",
     1.965,
     1.99
    ],
    [
     "bana",
     2.51,
     2.907
    ],
    [
     "ne;",
     2.907,
     3.105
    ],
    [
     "bakmam",
     3.255,
     3.475
    ],
    [
     "bile.",
     3.475,
     3.695
    ],
    [
     "Arkadaşı",
     3.935,
     4.734
    ],
    [
     "ödül",
     4.734,
     5.134
    ],
    [
     "alırken",
     5.134,
     5.733
    ],
    [
     "başını",
     5.733,
     6.332
    ],
    [
     "çevirir.",
     6.332,
     6.932
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.428,
   "m": "Sonra ne olur? Arkadaşı sevincini paylaşacak kimse bulamaz. Kendisi de güzel bir örnekten öğrenme fırsatını kaçırır.",
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
     "Arkadaşı",
     0.96,
     1.558
    ],
    [
     "sevincini",
     1.558,
     2.155
    ],
    [
     "paylaşacak",
     2.155,
     2.753
    ],
    [
     "kimse",
     2.753,
     3.052
    ],
    [
     "bulamaz.",
     3.052,
     3.5
    ],
    [
     "Kendisi",
     3.92,
     4.286
    ],
    [
     "de",
     4.286,
     4.408
    ],
    [
     "güzel",
     4.408,
     4.652
    ],
    [
     "bir",
     4.652,
     4.773
    ],
    [
     "örnekten",
     4.773,
     5.139
    ],
    [
     "öğrenme",
     5.139,
     5.505
    ],
    [
     "fırsatını",
     5.505,
     5.993
    ],
    [
     "kaçırır.",
     5.993,
     6.358
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
   "sure": 6.551,
   "m": "Sağ uçta Hased. Hak etmedi, o başarı bende olmalıydı! Arkadaşının sevincine bakınca içi sıkılır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.199
    ],
    [
     "uçta",
     0.199,
     0.537
    ],
    [
     "Hased.",
     0.537,
     0.875
    ],
    [
     "Hak",
     0.955,
     0.96
    ],
    [
     "etmedi,",
     0.96,
     0.975
    ],
    [
     "o",
     1.51,
     1.7
    ],
    [
     "başarı",
     1.7,
     2.27
    ],
    [
     "bende",
     2.27,
     2.65
    ],
    [
     "olmalıydı!",
     2.65,
     3.41
    ],
    [
     "Arkadaşının",
     3.68,
     4.504
    ],
    [
     "sevincine",
     4.504,
     5.163
    ],
    [
     "bakınca",
     5.163,
     5.657
    ],
    [
     "içi",
     5.657,
     5.987
    ],
    [
     "sıkılır.",
     5.987,
     6.481
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 7.792,
   "m": "Sonra ne olur? Kıskançlık içini sıkar, kendi işine odaklanamaz. Dostluk soğur, araya sessiz bir mesafe girer.",
   "k": [
    [
     "Sonra",
     0.03,
     0.404
    ],
    [
     "ne",
     0.404,
     0.591
    ],
    [
     "olur?",
     0.591,
     0.965
    ],
    [
     "Kıskançlık",
     1.105,
     1.675
    ],
    [
     "içini",
     1.675,
     2.245
    ],
    [
     "sıkar,",
     2.245,
     2.625
    ],
    [
     "kendi",
     2.745,
     3.208
    ],
    [
     "işine",
     3.208,
     3.902
    ],
    [
     "odaklanamaz.",
     3.902,
     5.06
    ],
    [
     "Dostluk",
     5.35,
     5.666
    ],
    [
     "soğur,",
     5.666,
     5.983
    ],
    [
     "araya",
     5.983,
     6.457
    ],
    [
     "sessiz",
     6.457,
     6.773
    ],
    [
     "bir",
     6.773,
     6.931
    ],
    [
     "mesafe",
     6.931,
     7.406
    ],
    [
     "girer.",
     7.406,
     7.722
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
   "sure": 6.788,
   "m": "Tam kararında Gıpta. Çok güzel olmuş, ben de çalışayım! Arkadaşının başarısını görür, içtenlikle tebrik eder.",
   "k": [
    [
     "Tam",
     0.03,
     0.196
    ],
    [
     "kararında",
     0.196,
     0.859
    ],
    [
     "Gıpta.",
     0.859,
     1.19
    ],
    [
     "Çok",
     1.47,
     1.654
    ],
    [
     "güzel",
     1.654,
     2.022
    ],
    [
     "olmuş,",
     2.022,
     2.39
    ],
    [
     "ben",
     2.595,
     2.718
    ],
    [
     "de",
     2.718,
     2.842
    ],
    [
     "çalışayım!",
     2.842,
     3.335
    ],
    [
     "Arkadaşının",
     3.825,
     4.446
    ],
    [
     "başarısını",
     4.446,
     5.067
    ],
    [
     "görür,",
     5.067,
     5.315
    ],
    [
     "içtenlikle",
     5.495,
     6.106
    ],
    [
     "tebrik",
     6.106,
     6.412
    ],
    [
     "eder.",
     6.412,
     6.718
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.683,
   "m": "Sonra ne olur? Tebrik edilen arkadaşı da sevinir. Kendisi de çalışmaya yeni bir güçle başlar.",
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
     "Tebrik",
     1.08,
     1.375
    ],
    [
     "edilen",
     1.375,
     1.817
    ],
    [
     "arkadaşı",
     1.817,
     2.406
    ],
    [
     "da",
     2.406,
     2.553
    ],
    [
     "sevinir.",
     2.553,
     2.995
    ],
    [
     "Kendisi",
     3.11,
     3.611
    ],
    [
     "de",
     3.611,
     3.778
    ],
    [
     "çalışmaya",
     3.778,
     4.445
    ],
    [
     "yeni",
     4.445,
     4.779
    ],
    [
     "bir",
     4.779,
     4.946
    ],
    [
     "güçle",
     4.946,
     5.28
    ],
    [
     "başlar.",
     5.28,
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
   "sure": 4.378,
   "m": "Sınıf arkadaşın yarışmada madalya aldı ve herkes onu alkışlıyor. Ne yaparsın?",
   "k": [
    [
     "Sınıf",
     0.03,
     0.313
    ],
    [
     "arkadaşın",
     0.313,
     0.879
    ],
    [
     "yarışmada",
     0.879,
     1.445
    ],
    [
     "madalya",
     1.445,
     1.869
    ],
    [
     "aldı",
     1.869,
     2.152
    ],
    [
     "ve",
     2.152,
     2.293
    ],
    [
     "herkes",
     2.293,
     2.576
    ],
    [
     "onu",
     2.576,
     2.859
    ],
    [
     "alkışlıyor.",
     2.859,
     3.425
    ],
    [
     "Ne",
     3.715,
     3.863
    ],
    [
     "yaparsın?",
     3.863,
     4.308
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.495,
   "m": "Arkadaşın senden de bir tebrik bekliyordu; sen sınıfın ortak sevincinden uzakta kalıyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.56
    ],
    [
     "senden",
     0.56,
     0.825
    ],
    [
     "de",
     0.825,
     0.958
    ],
    [
     "bir",
     0.958,
     1.09
    ],
    [
     "tebrik",
     1.09,
     1.355
    ],
    [
     "bekliyordu;",
     1.355,
     1.885
    ],
    [
     "sen",
     2.065,
     2.204
    ],
    [
     "sınıfın",
     2.204,
     2.62
    ],
    [
     "ortak",
     2.62,
     2.898
    ],
    [
     "sevincinden",
     2.898,
     3.453
    ],
    [
     "uzakta",
     3.453,
     3.869
    ],
    [
     "kalıyorsun.",
     3.869,
     4.425
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 5.611,
   "m": "İçin sıkılıyor; arkadaşın sevinirken sen onun başarısını küçültecek sözler arıyorsun.",
   "k": [
    [
     "İçin",
     0.03,
     0.31
    ],
    [
     "sıkılıyor;",
     0.31,
     0.87
    ],
    [
     "arkadaşın",
     1.035,
     1.728
    ],
    [
     "sevinirken",
     1.728,
     2.421
    ],
    [
     "sen",
     2.421,
     2.595
    ],
    [
     "onun",
     2.595,
     2.941
    ],
    [
     "başarısını",
     2.941,
     3.808
    ],
    [
     "küçültecek",
     3.808,
     4.501
    ],
    [
     "sözler",
     4.501,
     4.848
    ],
    [
     "arıyorsun.",
     4.848,
     5.541
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.995,
   "m": "Arkadaşın gülümsüyor; sen de neleri çalışman gerektiğini düşünüyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.642
    ],
    [
     "gülümsüyor;",
     0.642,
     1.255
    ],
    [
     "sen",
     1.335,
     1.479
    ],
    [
     "de",
     1.479,
     1.623
    ],
    [
     "neleri",
     1.623,
     2.055
    ],
    [
     "çalışman",
     2.055,
     2.486
    ],
    [
     "gerektiğini",
     2.486,
     3.206
    ],
    [
     "düşünüyorsun.",
     3.206,
     3.925
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.723,
   "m": "Arkadaşın sınavdan senden yüksek not aldı ve nasıl çalıştığını anlatıyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.634
    ],
    [
     "sınavdan",
     0.634,
     1.087
    ],
    [
     "senden",
     1.087,
     1.389
    ],
    [
     "yüksek",
     1.389,
     1.691
    ],
    [
     "not",
     1.691,
     1.842
    ],
    [
     "aldı",
     1.842,
     2.143
    ],
    [
     "ve",
     2.143,
     2.294
    ],
    [
     "nasıl",
     2.294,
     2.596
    ],
    [
     "çalıştığını",
     2.596,
     3.351
    ],
    [
     "anlatıyor.",
     3.351,
     3.955
    ],
    [
     "Ne",
     4.11,
     4.246
    ],
    [
     "yaparsın?",
     4.246,
     4.653
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.644,
   "m": "Çalışma yöntemini dinlemiyorsun; öğrenebileceğin güzel bir yol yanından geçiyor.",
   "k": [
    [
     "Çalışma",
     0.03,
     0.441
    ],
    [
     "yöntemini",
     0.441,
     0.99
    ],
    [
     "dinlemiyorsun;",
     0.99,
     1.675
    ],
    [
     "öğrenebileceğin",
     1.76,
     2.919
    ],
    [
     "güzel",
     2.919,
     3.25
    ],
    [
     "bir",
     3.25,
     3.415
    ],
    [
     "yol",
     3.415,
     3.581
    ],
    [
     "yanından",
     3.581,
     4.077
    ],
    [
     "geçiyor.",
     4.077,
     4.574
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 5.401,
   "m": "İçin sıkıntıyla doluyor; arkadaşının çabasını göremiyorsun, kendi çalışmana da odaklanamıyorsun.",
   "k": [
    [
     "İçin",
     0.03,
     0.306
    ],
    [
     "sıkıntıyla",
     0.306,
     0.857
    ],
    [
     "doluyor;",
     0.857,
     1.27
    ],
    [
     "arkadaşının",
     1.59,
     2.204
    ],
    [
     "çabasını",
     2.204,
     2.696
    ],
    [
     "göremiyorsun,",
     2.696,
     3.31
    ],
    [
     "kendi",
     3.645,
     3.886
    ],
    [
     "çalışmana",
     3.886,
     4.367
    ],
    [
     "da",
     4.367,
     4.488
    ],
    [
     "odaklanamıyorsun.",
     4.488,
     5.331
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.783,
   "m": "Arkadaşın yöntemini paylaşıyor; sen de kendi çalışma planını hazırlıyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.522
    ],
    [
     "yöntemini",
     0.522,
     1.013
    ],
    [
     "paylaşıyor;",
     1.013,
     1.505
    ],
    [
     "sen",
     1.725,
     1.858
    ],
    [
     "de",
     1.858,
     1.99
    ],
    [
     "kendi",
     1.99,
     2.255
    ],
    [
     "çalışma",
     2.255,
     2.653
    ],
    [
     "planını",
     2.653,
     3.05
    ],
    [
     "hazırlıyorsun.",
     3.05,
     3.713
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
   "sure": 10.251,
   "m": "Bu cümle bilerek çift anlamlı. Arkadaşına özenip çalışmak isteyen biri söylüyorsa orta uca yakın. O başarının ondan gidip kendisine gelmesini isteyen biri söylüyorsa sağ uca yakın.",
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
     "Arkadaşına",
     1.725,
     2.415
    ],
    [
     "özenip",
     2.415,
     2.83
    ],
    [
     "çalışmak",
     2.83,
     3.244
    ],
    [
     "isteyen",
     3.244,
     3.658
    ],
    [
     "biri",
     3.658,
     3.934
    ],
    [
     "söylüyorsa",
     3.934,
     4.487
    ],
    [
     "orta",
     4.487,
     4.763
    ],
    [
     "uca",
     4.763,
     5.039
    ],
    [
     "yakın.",
     5.039,
     5.315
    ],
    [
     "O",
     5.82,
     5.961
    ],
    [
     "başarının",
     5.961,
     6.523
    ],
    [
     "ondan",
     6.523,
     6.805
    ],
    [
     "gidip",
     6.805,
     7.086
    ],
    [
     "kendisine",
     7.086,
     7.649
    ],
    [
     "gelmesini",
     7.649,
     8.212
    ],
    [
     "isteyen",
     8.212,
     8.634
    ],
    [
     "biri",
     8.634,
     8.915
    ],
    [
     "söylüyorsa",
     8.915,
     9.478
    ],
    [
     "sağ",
     9.478,
     9.618
    ],
    [
     "uca",
     9.618,
     9.9
    ],
    [
     "yakın.",
     9.9,
     10.181
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
