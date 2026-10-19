/* İbremetre · Sıdk — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (İkiyüzlülük · Sıdk · Patavatsızlık). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-sidk",
 "ad": "Sıdk: İbren Nerede?",
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
     "huy": "Sıdk",
     "huyAnahtar": "Sıdk",
     "olculen": "Sözümle davranışım arasındaki uyum",
     "kanca": "Herkesle konuştum, kimseyi kırmadım.",
     "uclar": {
      "az": "İkiyüzlülük",
      "orta": "Sıdk",
      "fazla": "Patavatsızlık"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Sıdk",
     "cumle": "Herkesle konuştum, kimseyi kırmadım.",
     "uclar": {
      "az": "İkiyüzlülük",
      "orta": "Sıdk",
      "fazla": "Patavatsızlık"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi herkese hoşuna gidecek şeyler söylediği için kimseyi kırmamış: sol uca (İkiyüzlülük) yakın. Başka okumada kişi doğruyu nazikçe söylediği için kimseyi kırmamış: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, sözümüzle içimizin uyumuna bakar. Sıdk; dürüst olmak, yalan söylememek ve göründüğümüz gibi olmaktır. İkiyüzlülük, kaynak listede Nifâk diye geçer; yüzüne başka, arkasından başka konuşmaktır. Doğruyu söylemek için kırıcı olmak gerekmez; patavatsızlık, sözü hiç tartmadan söylemektir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Sıdk",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "İkiyüzlülük",
      "orta": "Sıdk",
      "fazla": "Patavatsızlık"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "İki yüzlü davranmak neye benziyor?",
       "ad": "İkiyüzlülük",
       "soz": "Yüzüne başka, arkasından başka söylerim.",
       "eylem": "el-salla",
       "zincir": [
        "Arkadaşları kimin neyi düşündüğünü anlayamaz.",
        "Sözlerine olan güven yavaş yavaş azalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkes bana kızmasın; ne istiyorsa onu söyleyeyim.",
          "dogru": true,
          "not": "İkiyüzlülük, iki yüzlü olmak ve göründüğü gibi olmamaktır. Söz özle uyuşmayınca güven azalır."
         },
         {
          "m": "Ne düşünüyorsam her yerde aynısını söyleyeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sıdkın sesi."
         },
         {
          "m": "Aklıma geleni hemen söyleyeyim, ne olacak?",
          "dogru": false,
          "not": "Bu sağ ucun sesi: patavatsızlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "İkiyüzlülük",
        "soz": "Yüzüne"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Sözlerine"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Sözü hiç tartmamak neye benziyor?",
       "ad": "Patavatsızlık",
       "soz": "Ne düşünüyorsam hemen söylerim, fark etmez.",
       "eylem": "isaret",
       "zincir": [
        "Karşısındaki kırılır ve üzülür.",
        "Doğru söz bile dinlenmez; geriye kırgınlık kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Aklıma geleni hemen söyleyeyim, ne olacak?",
          "dogru": true,
          "not": "Patavatsızlık, sözü hiç tartmadan söylemektir. Doğru olsa bile sözün zamanı ve üslubu önemlidir."
         },
         {
          "m": "Herkes bana kızmasın; ne istiyorsa onu söyleyeyim.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ikiyüzlülüğün sesi."
         },
         {
          "m": "Ne düşünüyorsam her yerde aynısını söyleyeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sıdkın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Patavatsızlık",
        "soz": "Ne"
       },
       "zincirAnahtar": [
        "Karşısındaki",
        "Doğru"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Sıdk",
       "soz": "Sana ne diyorsam, arkandan da aynısını derim.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşları ona güvenir.",
        "Söylediği söz her yerde aynı olduğu için sözüne güvenilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ne düşünüyorsam her yerde aynısını söyleyeyim.",
          "dogru": true,
          "not": "Sıdk, dürüst olmak, yalan söylememek ve göründüğü gibi olmaktır."
         },
         {
          "m": "Herkes bana kızmasın; ne istiyorsa onu söyleyeyim.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ikiyüzlülüğün sesi."
         },
         {
          "m": "Aklıma geleni hemen söyleyeyim, ne olacak?",
          "dogru": false,
          "not": "Bu sağ ucun sesi: patavatsızlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Sıdk",
        "soz": "Sana"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Söylediği"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Sıdk",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "İkiyüzlülük",
      "orta": "Sıdk",
      "fazla": "Patavatsızlık"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "resim",
       "baslik": "Arkadaşın resmi",
       "tetik": "Arkadaşın yaptığı resmi gösterip “beğendin mi?” diye soruyor. Sen resmi pek beğenmedin.",
       "secenekler": [
        {
         "m": "“Güzel olmuş” derim, sonra başkalarına “berbattı” derim.",
         "zon": "az",
         "sonuc": "Arkadaşın bunu duyuyor ve sana güvenmekte zorlanıyor.",
         "not": "İbre sola kaydı: yüzüne başka, arkasından başka söylemek güveni kırar.",
         "ses": "s1az"
        },
        {
         "m": "Hiç güzel olmamış, çok kötü!",
         "zon": "fazla",
         "sonuc": "Arkadaşın üzülüyor ve resim yapmak istemiyor.",
         "not": "İbre sağa kaydı: doğru olsa da tartmadan söylenen söz kırıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Dürüst olayım: şurayı pek sevmedim ama renkleri güzel.",
         "zon": "orta",
         "sonuc": "Arkadaşın bunun gerçek düşüncen olduğunu biliyor ve sözüne güveniyor.",
         "not": "İbre ortada: yalansız ve kırıcı olmayan bir söz seçtin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kirik",
       "baslik": "Kırılan oyuncak",
       "tetik": "Okulda bir oyuncak kırıldı. Öğretmen soruyor; kırılmasına sen de sebep oldun.",
       "secenekler": [
        {
         "m": "“Bilmiyorum” derim, sonra arkadaşlara başka anlatırım.",
         "zon": "az",
         "sonuc": "Gerçek öğrenilince hem sana hem anlattıklarına güven azalıyor.",
         "not": "İbre sola kaydı: göründüğü gibi olmamak, güveni kaybettiriyor.",
         "ses": "s2az"
        },
        {
         "m": "Aklıma gelen her şeyi, kimi üzeceğine bakmadan söylerim.",
         "zon": "fazla",
         "sonuc": "Sınıf gerginleşiyor; sözlerin dinlenmiyor.",
         "not": "İbre sağa kaydı: sözü tartmadan söylemek sınıfı gerginleştiriyor.",
         "ses": "s2fa"
        },
        {
         "m": "Ben de sebep oldum; olanı olduğu gibi anlatırım.",
         "zon": "orta",
         "sonuc": "Gerçek anlaşılıyor; öğretmen dürüstlüğüne güveniyor.",
         "not": "İbre ortada: doğruyu açıkça ve kimseyi suçlamadan söyledin.",
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
       "ad": "Az · İkiyüzlülük",
       "aciklama": "Göründüğü gibi olmamak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Sıdk",
       "aciklama": "Sözle içi aynı olmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Patavatsızlık",
       "aciklama": "Sözü hiç tartmamak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşına “çok güzel” der, ama arkasından aksini söyler.",
       "alan": "az",
       "ipucu": "Göründüğü gibi değil."
      },
      {
       "id": "k2",
       "metin": "Aklına gelen her şeyi, kimi üzeceğini düşünmeden söyler.",
       "alan": "fazla",
       "ipucu": "Sözü tartmıyor."
      },
      {
       "id": "k3",
       "metin": "Ne düşünüyorsa yüzüne de arkasından da aynısını söyler.",
       "alan": "orta",
       "ipucu": "Sözü ve içi aynı."
      },
      {
       "id": "k4",
       "metin": "Öğretmen varken uslu durur, yokken kurallara uymaz.",
       "alan": "az",
       "ipucu": "Davranışı yerine göre değişiyor."
      },
      {
       "id": "k5",
       "metin": "Arkadaşının resmine bakıp aklına geleni olduğu gibi söyler.",
       "alan": "fazla",
       "ipucu": "Sözü tartmadan söylüyor."
      },
      {
       "id": "k6",
       "metin": "Hatasını kabul eder: “Evet, kırdım; özür dilerim.”",
       "alan": "orta",
       "ipucu": "Dürüst davranıyor."
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
        "Bir arkadaşım bana bir şey sorunca",
        "Bir hata yapınca",
        "Birinin yanında ve arkasında konuşurken",
        "Aklıma bir şey gelince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Yüzüne söylemeyeceğimi arkasından da söylemeyeceğim",
        "Söylemeden önce bir saniye düşüneceğim",
        "Doğruyu söylerken kırıcı olmayan bir cümle seçeceğim"
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
       "baslik": "Sıdk",
       "metin": "sözle içinin uyumu",
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
   "sure": 2.125,
   "m": "Herkesle konuştum, kimseyi kırmadım.",
   "k": [
    [
     "Herkesle",
     0.03,
     0.468
    ],
    [
     "konuştum,",
     0.468,
     0.905
    ],
    [
     "kimseyi",
     1.105,
     1.58
    ],
    [
     "kırmadım.",
     1.58,
     2.055
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.675,
   "m": "Birçok güzel huy bir ibre gibidir. Sıdk, söylediğim ile olduğum arasındaki uyumu ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.484
    ],
    [
     "güzel",
     0.484,
     0.937
    ],
    [
     "huy",
     0.937,
     1.164
    ],
    [
     "bir",
     1.164,
     1.391
    ],
    [
     "ibre",
     1.391,
     1.845
    ],
    [
     "gibidir.",
     1.845,
     2.525
    ],
    [
     "Sıdk,",
     2.93,
     3.035
    ],
    [
     "söylediğim",
     3.13,
     4.116
    ],
    [
     "ile",
     4.116,
     4.609
    ],
    [
     "olduğum",
     4.609,
     5.349
    ],
    [
     "arasındaki",
     5.349,
     6.582
    ],
    [
     "uyumu",
     6.582,
     7.322
    ],
    [
     "ölçer.",
     7.322,
     7.815
    ],
    [
     "İbre",
     7.91,
     8.324
    ],
    [
     "üç",
     8.324,
     8.532
    ],
    [
     "yerde",
     8.532,
     8.946
    ],
    [
     "durabilir:",
     8.946,
     9.775
    ],
    [
     "az,",
     10.165,
     10.31
    ],
    [
     "kararında,",
     10.31,
     10.89
    ],
    [
     "fazla.",
     11.235,
     11.605
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
   "sure": 9.103,
   "m": "Sol uçta İkiyüzlülük. Yüzüne başka, arkasından başka söylerim. Karşısındaki kişiye göre, içinden geçmeyen şeyler söyler.",
   "k": [
    [
     "Sol",
     0.03,
     0.224
    ],
    [
     "uçta",
     0.224,
     0.611
    ],
    [
     "İkiyüzlülük.",
     0.611,
     1.58
    ],
    [
     "Yüzüne",
     1.66,
     2.659
    ],
    [
     "başka,",
     2.659,
     3.325
    ],
    [
     "arkasından",
     3.445,
     4.069
    ],
    [
     "başka",
     4.069,
     4.382
    ],
    [
     "söylerim.",
     4.382,
     4.85
    ],
    [
     "Karşısındaki",
     5.33,
     6.082
    ],
    [
     "kişiye",
     6.082,
     6.534
    ],
    [
     "göre,",
     6.534,
     6.835
    ],
    [
     "içinden",
     7.1,
     7.68
    ],
    [
     "geçmeyen",
     7.68,
     8.26
    ],
    [
     "şeyler",
     8.26,
     8.647
    ],
    [
     "söyler.",
     8.647,
     9.033
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.173,
   "m": "Sonra ne olur? Arkadaşları kimin neyi düşündüğünü anlayamaz. Sözlerine olan güven yavaş yavaş azalır.",
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
     "Arkadaşları",
     1.01,
     1.632
    ],
    [
     "kimin",
     1.632,
     1.881
    ],
    [
     "neyi",
     1.881,
     2.13
    ],
    [
     "düşündüğünü",
     2.13,
     2.752
    ],
    [
     "anlayamaz.",
     2.752,
     3.25
    ],
    [
     "Sözlerine",
     3.54,
     4.223
    ],
    [
     "olan",
     4.223,
     4.565
    ],
    [
     "güven",
     4.565,
     4.907
    ],
    [
     "yavaş",
     4.907,
     5.249
    ],
    [
     "yavaş",
     5.249,
     5.59
    ],
    [
     "azalır.",
     5.59,
     6.103
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
   "sure": 7.06,
   "m": "Sağ uçta Patavatsızlık. Ne düşünüyorsam hemen söylerim, fark etmez. Aklına geleni, karşısındakini düşünmeden söyler.",
   "k": [
    [
     "Sağ",
     0.03,
     0.193
    ],
    [
     "uçta",
     0.193,
     0.518
    ],
    [
     "Patavatsızlık.",
     0.518,
     1.33
    ],
    [
     "Ne",
     1.82,
     1.953
    ],
    [
     "düşünüyorsam",
     1.953,
     2.619
    ],
    [
     "hemen",
     2.619,
     2.885
    ],
    [
     "söylerim,",
     2.885,
     3.285
    ],
    [
     "fark",
     3.51,
     3.697
    ],
    [
     "etmez.",
     3.697,
     4.07
    ],
    [
     "Aklına",
     4.27,
     4.42
    ],
    [
     "geleni,",
     4.42,
     4.57
    ],
    [
     "karşısındakini",
     4.665,
     5.828
    ],
    [
     "düşünmeden",
     5.828,
     6.603
    ],
    [
     "söyler.",
     6.603,
     6.99
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.914,
   "m": "Sonra ne olur? Karşısındaki kırılır ve üzülür. Doğru söz bile dinlenmez; geriye kırgınlık kalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.4
    ],
    [
     "ne",
     0.4,
     0.585
    ],
    [
     "olur?",
     0.585,
     0.955
    ],
    [
     "Karşısındaki",
     1.06,
     1.675
    ],
    [
     "kırılır",
     1.675,
     2.043
    ],
    [
     "ve",
     2.043,
     2.166
    ],
    [
     "üzülür.",
     2.166,
     2.535
    ],
    [
     "Doğru",
     2.965,
     3.304
    ],
    [
     "söz",
     3.304,
     3.473
    ],
    [
     "bile",
     3.473,
     3.812
    ],
    [
     "dinlenmez;",
     3.812,
     4.32
    ],
    [
     "geriye",
     4.585,
     5.057
    ],
    [
     "kırgınlık",
     5.057,
     5.529
    ],
    [
     "kalır.",
     5.529,
     5.844
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
   "sure": 7.853,
   "m": "Tam kararında Sıdk. Sana ne diyorsam, arkandan da aynısını derim. Yalan söylemez; yüzüne ve arkasından aynı sözü söyler.",
   "k": [
    [
     "Tam",
     0.03,
     0.2
    ],
    [
     "kararında",
     0.2,
     0.88
    ],
    [
     "Sıdk.",
     0.88,
     1.05
    ],
    [
     "Sana",
     1.43,
     1.752
    ],
    [
     "ne",
     1.752,
     1.913
    ],
    [
     "diyorsam,",
     1.913,
     2.395
    ],
    [
     "arkandan",
     2.61,
     3.024
    ],
    [
     "da",
     3.024,
     3.162
    ],
    [
     "aynısını",
     3.162,
     3.714
    ],
    [
     "derim.",
     3.714,
     3.99
    ],
    [
     "Yalan",
     4.465,
     4.789
    ],
    [
     "söylemez;",
     4.789,
     5.275
    ],
    [
     "yüzüne",
     5.515,
     6.001
    ],
    [
     "ve",
     6.001,
     6.163
    ],
    [
     "arkasından",
     6.163,
     6.811
    ],
    [
     "aynı",
     6.811,
     7.135
    ],
    [
     "sözü",
     7.135,
     7.459
    ],
    [
     "söyler.",
     7.459,
     7.783
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.506,
   "m": "Sonra ne olur? Arkadaşları ona güvenir. Söylediği söz her yerde aynı olduğu için sözüne güvenilir.",
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
     "Arkadaşları",
     1.29,
     1.897
    ],
    [
     "ona",
     1.897,
     2.14
    ],
    [
     "güvenir.",
     2.14,
     2.505
    ],
    [
     "Söylediği",
     2.875,
     3.522
    ],
    [
     "söz",
     3.522,
     3.684
    ],
    [
     "her",
     3.684,
     3.846
    ],
    [
     "yerde",
     3.846,
     4.17
    ],
    [
     "aynı",
     4.17,
     4.493
    ],
    [
     "olduğu",
     4.493,
     4.979
    ],
    [
     "için",
     4.979,
     5.303
    ],
    [
     "sözüne",
     5.303,
     5.788
    ],
    [
     "güvenilir.",
     5.788,
     6.436
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
   "sure": 6.1,
   "m": "Arkadaşın yaptığı resmi gösterip beğendin mi? diye soruyor. Sen resmi pek beğenmedin. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.754
    ],
    [
     "yaptığı",
     0.754,
     1.297
    ],
    [
     "resmi",
     1.297,
     1.658
    ],
    [
     "gösterip",
     1.658,
     2.201
    ],
    [
     "beğendin",
     2.201,
     2.744
    ],
    [
     "mi?",
     2.744,
     2.925
    ],
    [
     "diye",
     3.145,
     3.181
    ],
    [
     "soruyor.",
     3.181,
     3.235
    ],
    [
     "Sen",
     3.425,
     3.636
    ],
    [
     "resmi",
     3.636,
     4.057
    ],
    [
     "pek",
     4.057,
     4.268
    ],
    [
     "beğenmedin.",
     4.268,
     5.11
    ],
    [
     "Ne",
     5.465,
     5.606
    ],
    [
     "yaparsın?",
     5.606,
     6.03
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.019,
   "m": "Arkadaşın bunu duyuyor ve sana güvenmekte zorlanıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.614
    ],
    [
     "bunu",
     0.614,
     0.906
    ],
    [
     "duyuyor",
     0.906,
     1.343
    ],
    [
     "ve",
     1.343,
     1.489
    ],
    [
     "sana",
     1.489,
     1.781
    ],
    [
     "güvenmekte",
     1.781,
     2.365
    ],
    [
     "zorlanıyor.",
     2.365,
     2.949
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 2.949,
   "m": "Arkadaşın üzülüyor ve resim yapmak istemiyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.7
    ],
    [
     "üzülüyor",
     0.7,
     1.371
    ],
    [
     "ve",
     1.371,
     1.538
    ],
    [
     "resim",
     1.538,
     1.874
    ],
    [
     "yapmak",
     1.874,
     2.209
    ],
    [
     "istemiyor.",
     2.209,
     2.879
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.65,
   "m": "Arkadaşın bunun gerçek düşüncen olduğunu biliyor ve sözüne güveniyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.576
    ],
    [
     "bunun",
     0.576,
     0.849
    ],
    [
     "gerçek",
     0.849,
     1.122
    ],
    [
     "düşüncen",
     1.122,
     1.532
    ],
    [
     "olduğunu",
     1.532,
     2.078
    ],
    [
     "biliyor",
     2.078,
     2.488
    ],
    [
     "ve",
     2.488,
     2.624
    ],
    [
     "sözüne",
     2.624,
     3.034
    ],
    [
     "güveniyor.",
     3.034,
     3.58
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.073,
   "m": "Okulda bir oyuncak kırıldı. Öğretmen soruyor; kırılmasına sen de sebep oldun. Ne yaparsın?",
   "k": [
    [
     "Okulda",
     0.03,
     0.468
    ],
    [
     "bir",
     0.468,
     0.614
    ],
    [
     "oyuncak",
     0.614,
     1.052
    ],
    [
     "kırıldı.",
     1.052,
     1.49
    ],
    [
     "Öğretmen",
     1.995,
     2.43
    ],
    [
     "soruyor;",
     2.43,
     2.865
    ],
    [
     "kırılmasına",
     3.485,
     4.18
    ],
    [
     "sen",
     4.18,
     4.32
    ],
    [
     "de",
     4.32,
     4.459
    ],
    [
     "sebep",
     4.459,
     4.737
    ],
    [
     "oldun.",
     4.737,
     5.015
    ],
    [
     "Ne",
     5.355,
     5.517
    ],
    [
     "yaparsın?",
     5.517,
     6.003
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.846,
   "m": "Gerçek öğrenilince hem sana hem anlattıklarına güven azalıyor.",
   "k": [
    [
     "Gerçek",
     0.03,
     0.356
    ],
    [
     "öğrenilince",
     0.356,
     1.17
    ],
    [
     "hem",
     1.17,
     1.333
    ],
    [
     "sana",
     1.333,
     1.659
    ],
    [
     "hem",
     1.659,
     1.822
    ],
    [
     "anlattıklarına",
     1.822,
     2.799
    ],
    [
     "güven",
     2.799,
     3.125
    ],
    [
     "azalıyor.",
     3.125,
     3.776
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 2.462,
   "m": "Sınıf gerginleşiyor; sözlerin dinlenmiyor.",
   "k": [
    [
     "Sınıf",
     0.03,
     0.319
    ],
    [
     "gerginleşiyor;",
     0.319,
     1.04
    ],
    [
     "sözlerin",
     1.36,
     1.802
    ],
    [
     "dinlenmiyor.",
     1.802,
     2.392
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.361,
   "m": "Gerçek anlaşılıyor; öğretmen dürüstlüğüne güveniyor.",
   "k": [
    [
     "Gerçek",
     0.03,
     0.31
    ],
    [
     "anlaşılıyor;",
     0.31,
     1.01
    ],
    [
     "öğretmen",
     1.415,
     1.884
    ],
    [
     "dürüstlüğüne",
     1.884,
     2.665
    ],
    [
     "güveniyor.",
     2.665,
     3.291
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
   "sure": 8.636,
   "m": "Bu cümle bilerek çift anlamlı. Herkese hoşuna gideni söyleyen biri diyorsa sol uca yakın. Doğruyu nazikçe söyleyen biri diyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.175
    ],
    [
     "cümle",
     0.175,
     0.465
    ],
    [
     "bilerek",
     0.465,
     0.9
    ],
    [
     "çift",
     0.9,
     1.045
    ],
    [
     "anlamlı.",
     1.045,
     1.48
    ],
    [
     "Herkese",
     1.85,
     2.257
    ],
    [
     "hoşuna",
     2.257,
     2.664
    ],
    [
     "gideni",
     2.664,
     3.071
    ],
    [
     "söyleyen",
     3.071,
     3.478
    ],
    [
     "biri",
     3.478,
     3.75
    ],
    [
     "diyorsa",
     3.75,
     4.157
    ],
    [
     "sol",
     4.157,
     4.292
    ],
    [
     "uca",
     4.292,
     4.564
    ],
    [
     "yakın.",
     4.564,
     4.835
    ],
    [
     "Doğruyu",
     5.305,
     5.794
    ],
    [
     "nazikçe",
     5.794,
     6.283
    ],
    [
     "söyleyen",
     6.283,
     6.772
    ],
    [
     "biri",
     6.772,
     7.099
    ],
    [
     "diyorsa",
     7.099,
     7.588
    ],
    [
     "orta",
     7.588,
     7.914
    ],
    [
     "uca",
     7.914,
     8.24
    ],
    [
     "yakın.",
     8.24,
     8.566
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
