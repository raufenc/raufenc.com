/* İbremetre · Müdârâ — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Katılık · Müdârâ · Müdâhene). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-mudara",
 "ad": "Müdârâ: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "soz",
 "muzik": "soz",
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
     "huy": "Müdârâ",
     "huyAnahtar": "Müdârâ",
     "olculen": "Hatayı gösterirken nazik olma biçimim",
     "kanca": "Ona her şeyi olduğu gibi söyledim.",
     "uclar": {
      "az": "Katılık",
      "orta": "Müdârâ",
      "fazla": "Müdâhene"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Müdârâ",
     "cumle": "Ona her şeyi olduğu gibi söyledim.",
     "uclar": {
      "az": "Katılık",
      "orta": "Müdârâ",
      "fazla": "Müdâhene"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi doğruyu sert ve kırıcı biçimde söylüyor: sol uca (Katılık) yakın. Başka okumada açık sözlü ama nazik davranıyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an doğruyu nasıl gösterdiğimize bakar. Müdârâ; kimseyi kırmadan, güzel bir dille doğruyu göstermektir. Doğruyu sertçe çarpmak da, yaranmak için doğrudan vazgeçmek de bu ibrenin dışında kalır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Müdârâ",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Katılık",
      "orta": "Müdârâ",
      "fazla": "Müdâhene"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Sert ve anlayışsız olmak neye benziyor?",
       "ad": "Katılık",
       "soz": "Yine mi yanlış yaptın? Ne zaman öğreneceksin?",
       "eylem": "isaret",
       "zincir": [
        "Arkadaşı utanır ve savunmaya geçer.",
        "Doğru söz kulağa değil, kırgınlığa takılır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Hatayı hemen sertçe söylemezsem anlamaz.",
          "dogru": true,
          "not": "Katılık, hatayı sert ve anlayışsız söylemektir. Sert söylenen doğru, çoğu zaman dinlenmez."
         },
         {
          "m": "Hatasını yalnızken, nazik bir dille söyleyeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: müdârânın sesi."
         },
         {
          "m": "Üzülmesin; yanlışına da hak vereyim.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: müdâhenenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Katılık",
        "soz": "Yine"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Doğru"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Yaranmak için doğruyu saklamak neye benziyor?",
       "ad": "Müdâhene",
       "soz": "Çok haklısın, sen nasıl istersen öyle olsun.",
       "eylem": "el-salla",
       "zincir": [
        "Arkadaşı hatasını fark etmez.",
        "Yanlış alışkanlık sürer ve sonunda daha büyük bir sorun olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Doğruyu söylersem bana kırılır; susayım, onaylayayım.",
          "dogru": true,
          "not": "Müdâhene, sevilmek için doğrudan ödün vermektir. Yaranmak için saklanan doğru arkadaşa fayda vermez."
         },
         {
          "m": "Hatayı hemen sertçe söylemezsem anlamaz.",
          "dogru": false,
          "not": "Bu sol ucun sesi: katılığın sesi."
         },
         {
          "m": "Hatasını yalnızken, nazik bir dille söyleyeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: müdârânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Müdâhene",
        "soz": "Çok"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Yanlış"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Müdârâ",
       "soz": "Seni kırmadan bir şey söyleyebilir miyim?",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı onu dinler ve hatasını görür.",
        "Dostlukları bozulmaz; hata birlikte düzeltilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Hatasını yalnızken, nazik bir dille söyleyeyim.",
          "dogru": true,
          "not": "Müdârâ, kırmadan güzelce doğruyu göstermektir."
         },
         {
          "m": "Hatayı hemen sertçe söylemezsem anlamaz.",
          "dogru": false,
          "not": "Bu sol ucun sesi: katılığın sesi."
         },
         {
          "m": "Üzülmesin; yanlışına da hak vereyim.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: müdâhenenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Müdârâ",
        "soz": "Seni"
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
     "huy": "Müdârâ",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Katılık",
      "orta": "Müdârâ",
      "fazla": "Müdâhene"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "hamle",
       "baslik": "Yanlış hamle",
       "tetik": "Arkadaşın masa oyununda bir hamleyi yanlış oynuyor ve bunun farkında değil.",
       "secenekler": [
        {
         "m": "Yine yanlış oynadın! Biraz dikkat etsene!",
         "zon": "az",
         "sonuc": "Arkadaşın mahcup oluyor ve oyundan soğuyor.",
         "not": "İbre sola kaydı: sert söylenen doğru dinlenmiyor, kırgınlık bırakıyor.",
         "ses": "s1az"
        },
        {
         "m": "Sorun değil, sen nasıl istersen öyle oynayalım.",
         "zon": "fazla",
         "sonuc": "Hamle yanlış kalıyor; diğer oyuncular da neden böyle olduğunu anlamıyor.",
         "not": "İbre sağa kaydı: yaranmak için doğruyu saklamak sorunu çözmüyor.",
         "ses": "s1fa"
        },
        {
         "m": "Bence hamle şöyleydi; birlikte bir bakalım mı?",
         "zon": "orta",
         "sonuc": "Birlikte bakıyorsunuz ve arkadaşın yanlışını kendisi düzeltiyor.",
         "not": "İbre ortada: doğruyu kırmadan, birlikte bakarak gösterdin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "odev",
       "baslik": "Ödevdeki yanlış",
       "tetik": "Arkadaşının ödevinde belirgin bir yanlış var ve teslim etmeden önce onu sana gösterdi.",
       "secenekler": [
        {
         "m": "Bu çok kötü olmuş; baştan yap!",
         "zon": "az",
         "sonuc": "Arkadaşının morali bozuluyor ve ödevi düzeltmek istemiyor.",
         "not": "İbre sola kaydı: sert eleştiri, düzeltme isteğini de söndürüyor.",
         "ses": "s2az"
        },
        {
         "m": "Harika olmuş, hiçbir şeyini değiştirme!",
         "zon": "fazla",
         "sonuc": "Ödev yanlış hâliyle teslim ediliyor; arkadaşın hatayı sonradan öğreniyor.",
         "not": "İbre sağa kaydı: güzel görünmek için hatayı saklamak arkadaşına fayda vermiyor.",
         "ses": "s2fa"
        },
        {
         "m": "Şu kısım güzel olmuş; bu yeri birlikte kontrol edelim mi?",
         "zon": "orta",
         "sonuc": "Arkadaşın seni dinliyor; hem iyi yanını hem düzelteceği yeri öğreniyor.",
         "not": "İbre ortada: iyi yanı söyleyip hatayı nazikçe gösterdin.",
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
       "ad": "Az · Katılık",
       "aciklama": "Sert ve anlayışsız olmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Müdârâ",
       "aciklama": "Kırmadan doğruyu göstermek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Müdâhene",
       "aciklama": "Yaranmak için ödün vermek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşı hata yapınca sesini yükseltip azarlar: “Yine mi aynısı!”",
       "alan": "az",
       "ipucu": "Doğru olsa da sert ve kırıcı."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı yanlış yapsa da “harika!” der, sırf kırılmasın diye.",
       "alan": "fazla",
       "ipucu": "Doğruyu saklıyor."
      },
      {
       "id": "k3",
       "metin": "Arkadaşını kenara çeker, hatasını nazik bir dille gösterir.",
       "alan": "orta",
       "ipucu": "Doğruyu kırmadan söylüyor."
      },
      {
       "id": "k4",
       "metin": "“Bunu bilmiyorsan hiçbir şey bilmiyorsun” der.",
       "alan": "az",
       "ipucu": "Anlayışsız ve kırıcı."
      },
      {
       "id": "k5",
       "metin": "Yaranmak için arkadaşının yanlış sözlerine hep “haklısın” der.",
       "alan": "fazla",
       "ipucu": "Yaranmak için ödün veriyor."
      },
      {
       "id": "k6",
       "metin": "Önce iyi yanını söyler, sonra düzeltilecek yeri gösterir.",
       "alan": "orta",
       "ipucu": "Hem nazik hem açık."
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
        "Bir arkadaşım hata yapınca",
        "Ödevini bana gösterince",
        "Oyunda bir hamlenin yanlış olduğunu görünce",
        "Biri bana hatamı söylerken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Hatayı yalnızken, nazik bir dille söyleyeceğim",
        "Önce arkadaşımın iyi yanını söyleyeceğim",
        "Sert söz yerine “birlikte bakalım mı?” diyeceğim"
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
       "baslik": "Müdârâ",
       "metin": "kırmadan doğruyu göstermek",
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
   "sure": 2.264,
   "m": "Ona her şeyi olduğu gibi söyledim.",
   "k": [
    [
     "Ona",
     0.03,
     0.363
    ],
    [
     "her",
     0.363,
     0.529
    ],
    [
     "şeyi",
     0.529,
     0.862
    ],
    [
     "olduğu",
     0.862,
     1.361
    ],
    [
     "gibi",
     1.361,
     1.694
    ],
    [
     "söyledim.",
     1.694,
     2.194
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.365,
   "m": "Birçok güzel huy bir ibre gibidir. Müdârâ, hatalı birine doğruyu nasıl söylediğimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.438
    ],
    [
     "güzel",
     0.438,
     0.846
    ],
    [
     "huy",
     0.846,
     1.05
    ],
    [
     "bir",
     1.05,
     1.255
    ],
    [
     "ibre",
     1.255,
     1.663
    ],
    [
     "gibidir.",
     1.663,
     2.275
    ],
    [
     "Müdârâ,",
     3.0,
     3.58
    ],
    [
     "hatalı",
     3.845,
     4.447
    ],
    [
     "birine",
     4.447,
     5.048
    ],
    [
     "doğruyu",
     5.048,
     5.65
    ],
    [
     "nasıl",
     5.65,
     6.051
    ],
    [
     "söylediğimi",
     6.051,
     7.054
    ],
    [
     "ölçer.",
     7.054,
     7.455
    ],
    [
     "İbre",
     7.54,
     7.934
    ],
    [
     "üç",
     7.934,
     8.132
    ],
    [
     "yerde",
     8.132,
     8.526
    ],
    [
     "durabilir:",
     8.526,
     9.315
    ],
    [
     "az,",
     9.765,
     10.425
    ],
    [
     "kararında,",
     10.905,
     11.165
    ],
    [
     "fazla.",
     11.165,
     11.295
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
   "sure": 7.421,
   "m": "Sol uçta Katılık. Yine mi yanlış yaptın? Ne zaman öğreneceksin? Arkadaşı hata yapınca sesini yükseltip azarlar.",
   "k": [
    [
     "Sol",
     0.03,
     0.194
    ],
    [
     "uçta",
     0.194,
     0.522
    ],
    [
     "Katılık.",
     0.522,
     1.015
    ],
    [
     "Yine",
     1.105,
     1.502
    ],
    [
     "mi",
     1.502,
     1.701
    ],
    [
     "yanlış",
     1.701,
     2.098
    ],
    [
     "yaptın?",
     2.098,
     2.495
    ],
    [
     "Ne",
     2.575,
     2.764
    ],
    [
     "zaman",
     2.764,
     3.141
    ],
    [
     "öğreneceksin?",
     3.141,
     4.085
    ],
    [
     "Arkadaşı",
     4.605,
     5.215
    ],
    [
     "hata",
     5.215,
     5.52
    ],
    [
     "yapınca",
     5.52,
     5.978
    ],
    [
     "sesini",
     5.978,
     6.436
    ],
    [
     "yükseltip",
     6.436,
     6.893
    ],
    [
     "azarlar.",
     6.893,
     7.351
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.315,
   "m": "Sonra ne olur? Arkadaşı utanır ve savunmaya geçer. Doğru söz kulağa değil, kırgınlığa takılır.",
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
     1.04,
     1.674
    ],
    [
     "utanır",
     1.674,
     2.15
    ],
    [
     "ve",
     2.15,
     2.309
    ],
    [
     "savunmaya",
     2.309,
     2.943
    ],
    [
     "geçer.",
     2.943,
     3.26
    ],
    [
     "Doğru",
     3.7,
     4.031
    ],
    [
     "söz",
     4.031,
     4.197
    ],
    [
     "kulağa",
     4.197,
     4.694
    ],
    [
     "değil,",
     4.694,
     5.025
    ],
    [
     "kırgınlığa",
     5.3,
     5.84
    ],
    [
     "takılır.",
     5.84,
     6.245
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
   "sure": 6.406,
   "m": "Sağ uçta Müdâhene. Çok haklısın, sen nasıl istersen öyle olsun. Arkadaşı bozulmasın diye yanlışına bile onay verir.",
   "k": [
    [
     "Sağ",
     0.03,
     0.187
    ],
    [
     "uçta",
     0.187,
     0.501
    ],
    [
     "Müdâhene.",
     0.501,
     1.13
    ],
    [
     "Çok",
     1.425,
     1.491
    ],
    [
     "haklısın,",
     1.491,
     1.69
    ],
    [
     "sen",
     1.77,
     1.948
    ],
    [
     "nasıl",
     1.948,
     2.304
    ],
    [
     "istersen",
     2.304,
     2.838
    ],
    [
     "öyle",
     2.838,
     3.194
    ],
    [
     "olsun.",
     3.194,
     3.55
    ],
    [
     "Arkadaşı",
     3.885,
     4.375
    ],
    [
     "bozulmasın",
     4.375,
     4.865
    ],
    [
     "diye",
     4.865,
     5.11
    ],
    [
     "yanlışına",
     5.11,
     5.6
    ],
    [
     "bile",
     5.6,
     5.845
    ],
    [
     "onay",
     5.845,
     6.09
    ],
    [
     "verir.",
     6.09,
     6.336
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.711,
   "m": "Sonra ne olur? Arkadaşı hatasını fark etmez. Yanlış alışkanlık sürer ve sonunda daha büyük bir sorun olur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.312
    ],
    [
     "ne",
     0.312,
     0.453
    ],
    [
     "olur?",
     0.453,
     0.735
    ],
    [
     "Arkadaşı",
     1.07,
     1.714
    ],
    [
     "hatasını",
     1.714,
     2.357
    ],
    [
     "fark",
     2.357,
     2.518
    ],
    [
     "etmez.",
     2.518,
     2.84
    ],
    [
     "Yanlış",
     3.135,
     3.469
    ],
    [
     "alışkanlık",
     3.469,
     4.137
    ],
    [
     "sürer",
     4.137,
     4.471
    ],
    [
     "ve",
     4.471,
     4.638
    ],
    [
     "sonunda",
     4.638,
     5.138
    ],
    [
     "daha",
     5.138,
     5.472
    ],
    [
     "büyük",
     5.472,
     5.806
    ],
    [
     "bir",
     5.806,
     5.973
    ],
    [
     "sorun",
     5.973,
     6.307
    ],
    [
     "olur.",
     6.307,
     6.641
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
   "sure": 8.844,
   "m": "Tam kararında Müdârâ. Seni kırmadan bir şey söyleyebilir miyim? Önce iyi yanını söyler, sonra doğruyu nazikçe gösterir.",
   "k": [
    [
     "Tam",
     0.03,
     0.223
    ],
    [
     "kararında",
     0.223,
     0.993
    ],
    [
     "Müdârâ.",
     0.993,
     1.57
    ],
    [
     "Seni",
     2.095,
     2.484
    ],
    [
     "kırmadan",
     2.484,
     3.068
    ],
    [
     "bir",
     3.068,
     3.263
    ],
    [
     "şey",
     3.263,
     3.458
    ],
    [
     "söyleyebilir",
     3.458,
     4.431
    ],
    [
     "miyim?",
     4.431,
     4.82
    ],
    [
     "Önce",
     4.945,
     5.186
    ],
    [
     "iyi",
     5.186,
     5.427
    ],
    [
     "yanını",
     5.427,
     5.789
    ],
    [
     "söyler,",
     5.789,
     6.03
    ],
    [
     "sonra",
     6.335,
     6.779
    ],
    [
     "doğruyu",
     6.779,
     7.444
    ],
    [
     "nazikçe",
     7.444,
     8.109
    ],
    [
     "gösterir.",
     8.109,
     8.774
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 7.032,
   "m": "Sonra ne olur? Arkadaşı onu dinler ve hatasını görür. Dostlukları bozulmaz; hata birlikte düzeltilir.",
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
     1.27,
     1.893
    ],
    [
     "onu",
     1.893,
     2.204
    ],
    [
     "dinler",
     2.204,
     2.515
    ],
    [
     "ve",
     2.515,
     2.671
    ],
    [
     "hatasını",
     2.671,
     3.294
    ],
    [
     "görür.",
     3.294,
     3.605
    ],
    [
     "Dostlukları",
     4.03,
     4.639
    ],
    [
     "bozulmaz;",
     4.639,
     5.095
    ],
    [
     "hata",
     5.44,
     5.778
    ],
    [
     "birlikte",
     5.778,
     6.285
    ],
    [
     "düzeltilir.",
     6.285,
     6.962
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
   "sure": 4.552,
   "m": "Arkadaşın masa oyununda bir hamleyi yanlış oynuyor ve bunun farkında değil. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.573
    ],
    [
     "masa",
     0.573,
     0.844
    ],
    [
     "oyununda",
     0.844,
     1.387
    ],
    [
     "bir",
     1.387,
     1.523
    ],
    [
     "hamleyi",
     1.523,
     1.93
    ],
    [
     "yanlış",
     1.93,
     2.202
    ],
    [
     "oynuyor",
     2.202,
     2.609
    ],
    [
     "ve",
     2.609,
     2.745
    ],
    [
     "bunun",
     2.745,
     3.016
    ],
    [
     "farkında",
     3.016,
     3.424
    ],
    [
     "değil.",
     3.424,
     3.695
    ],
    [
     "Ne",
     3.96,
     4.09
    ],
    [
     "yaparsın?",
     4.09,
     4.482
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.142,
   "m": "Arkadaşın mahcup oluyor ve oyundan soğuyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.791
    ],
    [
     "mahcup",
     0.791,
     1.171
    ],
    [
     "oluyor",
     1.171,
     1.741
    ],
    [
     "ve",
     1.741,
     1.931
    ],
    [
     "oyundan",
     1.931,
     2.502
    ],
    [
     "soğuyor.",
     2.502,
     3.072
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.143,
   "m": "Hamle yanlış kalıyor; diğer oyuncular da neden böyle olduğunu anlamıyor.",
   "k": [
    [
     "Hamle",
     0.03,
     0.329
    ],
    [
     "yanlış",
     0.329,
     0.627
    ],
    [
     "kalıyor;",
     0.627,
     1.075
    ],
    [
     "diğer",
     1.295,
     1.587
    ],
    [
     "oyuncular",
     1.587,
     2.172
    ],
    [
     "da",
     2.172,
     2.319
    ],
    [
     "neden",
     2.319,
     2.611
    ],
    [
     "böyle",
     2.611,
     2.903
    ],
    [
     "olduğunu",
     2.903,
     3.488
    ],
    [
     "anlamıyor.",
     3.488,
     4.073
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.276,
   "m": "Birlikte bakıyorsunuz ve arkadaşın yanlışını kendisi düzeltiyor.",
   "k": [
    [
     "Birlikte",
     0.03,
     0.427
    ],
    [
     "bakıyorsunuz",
     0.427,
     1.089
    ],
    [
     "ve",
     1.089,
     1.221
    ],
    [
     "arkadaşın",
     1.221,
     1.75
    ],
    [
     "yanlışını",
     1.75,
     2.279
    ],
    [
     "kendisi",
     2.279,
     2.676
    ],
    [
     "düzeltiyor.",
     2.676,
     3.206
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.395,
   "m": "Arkadaşının ödevinde belirgin bir yanlış var ve teslim etmeden önce onu sana gösterdi. Ne yaparsın?",
   "k": [
    [
     "Arkadaşının",
     0.03,
     0.744
    ],
    [
     "ödevinde",
     0.744,
     1.315
    ],
    [
     "belirgin",
     1.315,
     1.743
    ],
    [
     "bir",
     1.743,
     1.886
    ],
    [
     "yanlış",
     1.886,
     2.171
    ],
    [
     "var",
     2.171,
     2.314
    ],
    [
     "ve",
     2.314,
     2.457
    ],
    [
     "teslim",
     2.457,
     2.742
    ],
    [
     "etmeden",
     2.742,
     3.17
    ],
    [
     "önce",
     3.17,
     3.456
    ],
    [
     "onu",
     3.456,
     3.741
    ],
    [
     "sana",
     3.741,
     4.027
    ],
    [
     "gösterdi.",
     4.027,
     4.455
    ],
    [
     "Ne",
     4.815,
     4.942
    ],
    [
     "yaparsın?",
     4.942,
     5.325
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.152,
   "m": "Arkadaşının morali bozuluyor ve ödevi düzeltmek istemiyor.",
   "k": [
    [
     "Arkadaşının",
     0.03,
     0.694
    ],
    [
     "morali",
     0.694,
     1.092
    ],
    [
     "bozuluyor",
     1.092,
     1.622
    ],
    [
     "ve",
     1.622,
     1.755
    ],
    [
     "ödevi",
     1.755,
     2.153
    ],
    [
     "düzeltmek",
     2.153,
     2.551
    ],
    [
     "istemiyor.",
     2.551,
     3.082
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.716,
   "m": "Ödev yanlış hâliyle teslim ediliyor; arkadaşın hatayı sonradan öğreniyor.",
   "k": [
    [
     "Ödev",
     0.03,
     0.284
    ],
    [
     "yanlış",
     0.284,
     0.538
    ],
    [
     "hâliyle",
     0.538,
     0.918
    ],
    [
     "teslim",
     0.918,
     1.172
    ],
    [
     "ediliyor;",
     1.172,
     1.68
    ],
    [
     "arkadaşın",
     1.925,
     2.417
    ],
    [
     "hatayı",
     2.417,
     2.786
    ],
    [
     "sonradan",
     2.786,
     3.154
    ],
    [
     "öğreniyor.",
     3.154,
     3.646
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.407,
   "m": "Arkadaşın seni dinliyor; hem iyi yanını hem düzelteceği yeri öğreniyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.552
    ],
    [
     "seni",
     0.552,
     0.813
    ],
    [
     "dinliyor;",
     0.813,
     1.205
    ],
    [
     "hem",
     1.525,
     1.681
    ],
    [
     "iyi",
     1.681,
     1.994
    ],
    [
     "yanını",
     1.994,
     2.462
    ],
    [
     "hem",
     2.462,
     2.618
    ],
    [
     "düzelteceği",
     2.618,
     3.399
    ],
    [
     "yeri",
     3.399,
     3.712
    ],
    [
     "öğreniyor.",
     3.712,
     4.337
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
   "sure": 8.831,
   "m": "Bu cümle bilerek çift anlamlı. Doğruyu sertçe çarpan biri söylüyorsa sol uca yakın. Açık ama nazik söyleyen biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.194
    ],
    [
     "cümle",
     0.194,
     0.52
    ],
    [
     "bilerek",
     0.52,
     1.011
    ],
    [
     "çift",
     1.011,
     1.175
    ],
    [
     "anlamlı.",
     1.175,
     1.665
    ],
    [
     "Doğruyu",
     2.08,
     2.569
    ],
    [
     "sertçe",
     2.569,
     2.895
    ],
    [
     "çarpan",
     2.895,
     3.221
    ],
    [
     "biri",
     3.221,
     3.547
    ],
    [
     "söylüyorsa",
     3.547,
     4.2
    ],
    [
     "sol",
     4.2,
     4.363
    ],
    [
     "uca",
     4.363,
     4.689
    ],
    [
     "yakın.",
     4.689,
     5.015
    ],
    [
     "Açık",
     5.3,
     5.63
    ],
    [
     "ama",
     5.63,
     5.959
    ],
    [
     "nazik",
     5.959,
     6.289
    ],
    [
     "söyleyen",
     6.289,
     6.783
    ],
    [
     "biri",
     6.783,
     7.113
    ],
    [
     "söylüyorsa",
     7.113,
     7.772
    ],
    [
     "orta",
     7.772,
     8.102
    ],
    [
     "uca",
     8.102,
     8.431
    ],
    [
     "yakın.",
     8.431,
     8.761
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
