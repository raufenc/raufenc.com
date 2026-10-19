/* İbremetre · Akîde — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Lakayt İnanç · Sahih Akîde · Bidat İnancı). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-akide",
 "ad": "Akîde: İbren Nerede?",
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
     "huy": "Akîde",
     "huyAnahtar": "Akîde",
     "olculen": "İnancı öğrenme ve doğrulama biçimim",
     "kanca": "Ben bunu hep böyle duydum.",
     "uclar": {
      "az": "Lakayt İnanç",
      "orta": "Sahih Akîde",
      "fazla": "Bidat İnancı"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Akîde",
     "cumle": "Ben bunu hep böyle duydum.",
     "uclar": {
      "az": "Lakayt İnanç",
      "orta": "Sahih Akîde",
      "fazla": "Bidat İnancı"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi duyduğu bir sözü kaynağına bakmadan dinin bir parçası sanıyor: sağ uca (Bidat İnancı) yakın. Başka okumada kişi duyduğunu açıkça söylüyor ve doğruluğunu güvenilir bir hocaya sormaya hazır: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an inancımızı nasıl öğrendiğimize bakar. Sahih Akîde; Kur’an ve sünnete uygun iman etmek ve dinini güvenilir yerden öğrenmektir. Bu ibre ölçekten çok yönü gösterir: ders doğru ile yanlış inancı ayırmaz, yalnızca kaynağa sorma alışkanlığına bakar.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Akîde",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Lakayt İnanç",
      "orta": "Sahih Akîde",
      "fazla": "Bidat İnancı"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "İnancı önemsememek neye benziyor?",
       "ad": "Lakayt",
       "soz": "Dinle ilgili şeyler beni pek ilgilendirmiyor.",
       "eylem": "yaslan",
       "zincir": [
        "Merak ettiği sorular cevapsız kalır.",
        "Öğrenebileceği güzel şeyler yanından geçip gider."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Dinle ilgili şeyleri öğrenmesem de olur.",
          "dogru": true,
          "not": "Lakayt, inancını önemsemeyip ilgisiz kalmaktır. Merak kapanınca öğrenme de durur."
         },
         {
          "m": "Bunu merak ediyorum; güvendiğim bir hocama sorayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sahih akîdenin sesi."
         },
         {
          "m": "Herkes söylüyor, demek ki dinde böyle; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: bidat inancının sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Lakayt",
        "soz": "Dinle"
       },
       "zincirAnahtar": [
        "Merak",
        "Öğrenebileceği"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Duyduğu her sözü dinden sayan kişi neyi kaçırır?",
       "ad": "Bidat",
       "soz": "Herkes söylüyor, bu da dinin bir parçasıdır.",
       "eylem": "isaret",
       "zincir": [
        "Yanlış bir bilgi doğru gibi yerleşebilir.",
        "Güvenilir bir kaynağa sormak aklına bile gelmez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkes söylüyor, demek ki dinde böyle; sormama gerek yok.",
          "dogru": true,
          "not": "Bu uçta, duyulan her söz kaynağına bakılmadan dinin bir parçası sanılır. Kaynağa sormak bunu önler."
         },
         {
          "m": "Dinle ilgili şeyleri öğrenmesem de olur.",
          "dogru": false,
          "not": "Bu sol ucun sesi: lakayt inancın sesi."
         },
         {
          "m": "Bunu merak ediyorum; güvendiğim bir hocama sorayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sahih akîdenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Bidat",
        "soz": "Herkes"
       },
       "zincirAnahtar": [
        "Yanlış",
        "Güvenilir"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Akîde",
       "soz": "Bunu hocama sorup doğrusunu öğreneyim.",
       "eylem": "konus",
       "zincir": [
        "Doğru bilgiyi güvenilir yerden öğrenir.",
        "İçi rahatlar ve öğrendiğini arkadaşlarına da anlatır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bunu merak ediyorum; güvendiğim bir hocama sorayım.",
          "dogru": true,
          "not": "Akîde, Kur’an ve sünnete uygun iman etmek ve öğrenirken güvenilir bir hocaya sormaktır."
         },
         {
          "m": "Dinle ilgili şeyleri öğrenmesem de olur.",
          "dogru": false,
          "not": "Bu sol ucun sesi: lakayt inancın sesi."
         },
         {
          "m": "Herkes söylüyor, demek ki dinde böyle; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: bidat inancının sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Akîde",
        "soz": "Bunu"
       },
       "zincirAnahtar": [
        "Doğru",
        "İçi"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Akîde",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Lakayt İnanç",
      "orta": "Sahih Akîde",
      "fazla": "Bidat İnancı"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "sohbet",
       "baslik": "Duyduğun söz",
       "tetik": "Bir arkadaşın dinle ilgili bir şey anlatıyor. Bunun doğru olup olmadığını bilmiyorsun.",
       "secenekler": [
        {
         "m": "Dinle ilgili şeyler beni ilgilendirmez, dinlemem.",
         "zon": "az",
         "sonuc": "Konu hakkında hiçbir şey öğrenmiyorsun; soru işaretin yerinde kalıyor.",
         "not": "İbre sola kaydı: ilgisiz kalmak, öğrenme kapısını kapatıyor.",
         "ses": "s1az"
        },
        {
         "m": "Arkadaşım söylediyse dinde de böyledir, tamam.",
         "zon": "fazla",
         "sonuc": "Doğru olup olmadığına bakılmıyor; yanlış bir bilgi sende de yerleşebilir.",
         "not": "İbre sağa kaydı: duyduğu sözü kaynağa bakmadan dinden saymak, bilgiyi sağlamlaştırmıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Güvendiğim bir hocama sorup öğrenirim.",
         "zon": "orta",
         "sonuc": "Hocan sakin sakin anlatıyor; doğrusunu öğrenmiş oluyorsun.",
         "not": "İbre ortada: duyduğunu güvenilir kaynağa sormak, sağlam öğrenmenin yolu.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "video",
       "baslik": "Videoda söylenen",
       "tetik": "Bir videoda dinle ilgili bir söz duydun ve doğru olup olmadığını merak ediyorsun.",
       "secenekler": [
        {
         "m": "Videoyu geçerim; hiç merak etmiyorum.",
         "zon": "az",
         "sonuc": "Merak ettiğin şey cevapsız kalıyor.",
         "not": "İbre sola kaydı: merak etmemek, öğrenmeyi baştan durduruyor.",
         "ses": "s2az"
        },
        {
         "m": "Videoda söylenmiş, demek ki dinin bir parçası.",
         "zon": "fazla",
         "sonuc": "Sözün kaynağını bilmeden onu başkasına da anlatabilirsin.",
         "not": "İbre sağa kaydı: her söyleneni kaynağına bakmadan dinden saymak, kafa karıştırabilir.",
         "ses": "s2fa"
        },
        {
         "m": "Anne babama ya da hocama gösterip sorarım.",
         "zon": "orta",
         "sonuc": "Büyüğün videoya birlikte bakıyor ve doğrusunu anlatıyor.",
         "not": "İbre ortada: güvendiğin bir büyükle birlikte bakmak, güvenli yol.",
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
       "ad": "Az · Lakayt İnanç",
       "aciklama": "Önemsememek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Sahih Akîde",
       "aciklama": "Güvenilir yerden öğrenmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Bidat İnancı",
       "aciklama": "Her sözü dinden saymak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Dinle ilgili bir konu açılınca “bana ne” der.",
       "alan": "az",
       "ipucu": "İlgisiz kalıyor."
      },
      {
       "id": "k2",
       "metin": "Duyduğu her sözü “dinde böyle” diyerek kaynağına bakmadan kabul eder.",
       "alan": "fazla",
       "ipucu": "Kaynağa bakmıyor."
      },
      {
       "id": "k3",
       "metin": "Dinle ilgili bir şey duyunca güvenilir bir hocaya sorar.",
       "alan": "orta",
       "ipucu": "Kaynağa soruyor."
      },
      {
       "id": "k4",
       "metin": "Dinini öğrenmek için hiç çaba göstermez.",
       "alan": "az",
       "ipucu": "Öğrenmeye ilgisiz."
      },
      {
       "id": "k5",
       "metin": "Arkadaşından duyduğu bir sözü, sormadan dinin bir parçası sayar.",
       "alan": "fazla",
       "ipucu": "Duyduğunu doğrulamıyor."
      },
      {
       "id": "k6",
       "metin": "Merak ettiği konuları güvenilir kitaplardan ve büyüklerinden öğrenir.",
       "alan": "orta",
       "ipucu": "Güvenilir yerden öğreniyor."
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
        "Dinle ilgili bir şey duyunca",
        "Arkadaşım bir bilgi anlatırken",
        "Bir videoda dinî bir söz görünce",
        "Merak ettiğim bir konu olunca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Merak ettiğimi güvendiğim bir hocama soracağım",
        "Duyduğum bir şeyi hemen dinden saymayıp kaynağına bakacağım",
        "Dinimi öğrenmek için bu hafta güvenilir bir kitaptan okuyacağım"
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
       "baslik": "Akîde",
       "metin": "güvenilir yerden öğrenmek",
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
   "sure": 2.339,
   "m": "Ben bunu hep böyle duydum.",
   "k": [
    [
     "Ben",
     0.03,
     0.31
    ],
    [
     "bunu",
     0.31,
     0.869
    ],
    [
     "hep",
     0.869,
     1.149
    ],
    [
     "böyle",
     1.149,
     1.709
    ],
    [
     "duydum.",
     1.709,
     2.269
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.314,
   "m": "Birçok güzel huy bir ibre gibidir. Akîde, inancımı nasıl öğrendiğimi ve doğruladığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.463
    ],
    [
     "güzel",
     0.463,
     0.895
    ],
    [
     "huy",
     0.895,
     1.112
    ],
    [
     "bir",
     1.112,
     1.328
    ],
    [
     "ibre",
     1.328,
     1.761
    ],
    [
     "gibidir.",
     1.761,
     2.41
    ],
    [
     "Akîde,",
     2.96,
     3.48
    ],
    [
     "inancımı",
     3.62,
     4.45
    ],
    [
     "nasıl",
     4.45,
     4.865
    ],
    [
     "öğrendiğimi",
     4.865,
     5.902
    ],
    [
     "ve",
     5.902,
     6.11
    ],
    [
     "doğruladığımı",
     6.11,
     7.355
    ],
    [
     "ölçer.",
     7.355,
     7.77
    ],
    [
     "İbre",
     7.905,
     8.297
    ],
    [
     "üç",
     8.297,
     8.493
    ],
    [
     "yerde",
     8.493,
     8.886
    ],
    [
     "durabilir:",
     8.886,
     9.67
    ],
    [
     "az,",
     9.875,
     10.028
    ],
    [
     "kararında,",
     10.028,
     10.64
    ],
    [
     "fazla.",
     10.785,
     11.244
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
   "sure": 7.371,
   "m": "Sol uçta Lakayt. Dinle ilgili şeyler beni pek ilgilendirmiyor. Dinle ilgili bir konu açılınca üzerinde durmaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.284
    ],
    [
     "uçta",
     0.284,
     0.792
    ],
    [
     "Lakayt.",
     0.792,
     1.3
    ],
    [
     "Dinle",
     1.38,
     1.755
    ],
    [
     "ilgili",
     1.755,
     2.317
    ],
    [
     "şeyler",
     2.317,
     2.692
    ],
    [
     "beni",
     2.692,
     3.067
    ],
    [
     "pek",
     3.067,
     3.255
    ],
    [
     "ilgilendirmiyor.",
     3.255,
     4.38
    ],
    [
     "Dinle",
     4.625,
     4.922
    ],
    [
     "ilgili",
     4.922,
     5.368
    ],
    [
     "bir",
     5.368,
     5.517
    ],
    [
     "konu",
     5.517,
     5.814
    ],
    [
     "açılınca",
     5.814,
     6.409
    ],
    [
     "üzerinde",
     6.409,
     7.004
    ],
    [
     "durmaz.",
     7.004,
     7.301
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.405,
   "m": "Sonra ne olur? Merak ettiği sorular cevapsız kalır. Öğrenebileceği güzel şeyler yanından geçip gider.",
   "k": [
    [
     "Sonra",
     0.03,
     0.288
    ],
    [
     "ne",
     0.288,
     0.417
    ],
    [
     "olur?",
     0.417,
     0.675
    ],
    [
     "Merak",
     1.34,
     1.632
    ],
    [
     "ettiği",
     1.632,
     2.071
    ],
    [
     "sorular",
     2.071,
     2.509
    ],
    [
     "cevapsız",
     2.509,
     2.948
    ],
    [
     "kalır.",
     2.948,
     3.24
    ],
    [
     "Öğrenebileceği",
     3.57,
     4.645
    ],
    [
     "güzel",
     4.645,
     4.952
    ],
    [
     "şeyler",
     4.952,
     5.26
    ],
    [
     "yanından",
     5.26,
     5.72
    ],
    [
     "geçip",
     5.72,
     6.027
    ],
    [
     "gider.",
     6.027,
     6.335
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
   "sure": 6.86,
   "m": "Sağ uçta Bidat. Herkes söylüyor, bu da dinin bir parçasıdır. Duyduğu sözün kaynağına bakmadan hemen kabul eder.",
   "k": [
    [
     "Sağ",
     0.03,
     0.234
    ],
    [
     "uçta",
     0.234,
     0.642
    ],
    [
     "Bidat.",
     0.642,
     1.05
    ],
    [
     "Herkes",
     1.14,
     1.548
    ],
    [
     "söylüyor,",
     1.548,
     2.16
    ],
    [
     "bu",
     2.275,
     2.438
    ],
    [
     "da",
     2.438,
     2.601
    ],
    [
     "dinin",
     2.601,
     2.926
    ],
    [
     "bir",
     2.926,
     3.089
    ],
    [
     "parçasıdır.",
     3.089,
     3.74
    ],
    [
     "Duyduğu",
     3.955,
     4.427
    ],
    [
     "sözün",
     4.427,
     4.742
    ],
    [
     "kaynağına",
     4.742,
     5.372
    ],
    [
     "bakmadan",
     5.372,
     5.845
    ],
    [
     "hemen",
     5.845,
     6.16
    ],
    [
     "kabul",
     6.16,
     6.475
    ],
    [
     "eder.",
     6.475,
     6.79
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.922,
   "m": "Sonra ne olur? Yanlış bir bilgi doğru gibi yerleşebilir. Güvenilir bir kaynağa sormak aklına bile gelmez.",
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
     "Yanlış",
     1.035,
     1.364
    ],
    [
     "bir",
     1.364,
     1.529
    ],
    [
     "bilgi",
     1.529,
     1.858
    ],
    [
     "doğru",
     1.858,
     2.187
    ],
    [
     "gibi",
     2.187,
     2.517
    ],
    [
     "yerleşebilir.",
     2.517,
     3.34
    ],
    [
     "Güvenilir",
     3.775,
     4.499
    ],
    [
     "bir",
     4.499,
     4.68
    ],
    [
     "kaynağa",
     4.68,
     5.223
    ],
    [
     "sormak",
     5.223,
     5.585
    ],
    [
     "aklına",
     5.585,
     6.128
    ],
    [
     "bile",
     6.128,
     6.49
    ],
    [
     "gelmez.",
     6.49,
     6.852
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
   "sure": 7.412,
   "m": "Tam kararında Akîde. Bunu hocama sorup doğrusunu öğreneyim. Duyduğu sözü güvendiği bir hocaya ya da büyüğüne sorar.",
   "k": [
    [
     "Tam",
     0.03,
     0.141
    ],
    [
     "kararında",
     0.141,
     0.583
    ],
    [
     "Akîde.",
     0.583,
     0.915
    ],
    [
     "Bunu",
     1.08,
     1.488
    ],
    [
     "hocama",
     1.488,
     2.1
    ],
    [
     "sorup",
     2.1,
     2.508
    ],
    [
     "doğrusunu",
     2.508,
     3.324
    ],
    [
     "öğreneyim.",
     3.324,
     4.14
    ],
    [
     "Duyduğu",
     4.375,
     4.799
    ],
    [
     "sözü",
     4.799,
     5.081
    ],
    [
     "güvendiği",
     5.081,
     5.647
    ],
    [
     "bir",
     5.647,
     5.788
    ],
    [
     "hocaya",
     5.788,
     6.212
    ],
    [
     "ya",
     6.212,
     6.353
    ],
    [
     "da",
     6.353,
     6.494
    ],
    [
     "büyüğüne",
     6.494,
     7.059
    ],
    [
     "sorar.",
     7.059,
     7.342
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.325,
   "m": "Sonra ne olur? Doğru bilgiyi güvenilir yerden öğrenir. İçi rahatlar ve öğrendiğini arkadaşlarına da anlatır.",
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
     "Doğru",
     0.995,
     1.296
    ],
    [
     "bilgiyi",
     1.296,
     1.749
    ],
    [
     "güvenilir",
     1.749,
     2.351
    ],
    [
     "yerden",
     2.351,
     2.653
    ],
    [
     "öğrenir.",
     2.653,
     3.105
    ],
    [
     "İçi",
     3.405,
     3.676
    ],
    [
     "rahatlar",
     3.676,
     4.084
    ],
    [
     "ve",
     4.084,
     4.219
    ],
    [
     "öğrendiğini",
     4.219,
     4.898
    ],
    [
     "arkadaşlarına",
     4.898,
     5.712
    ],
    [
     "da",
     5.712,
     5.848
    ],
    [
     "anlatır.",
     5.848,
     6.255
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
   "sure": 4.95,
   "m": "Bir arkadaşın dinle ilgili bir şey anlatıyor. Bunun doğru olup olmadığını bilmiyorsun. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.155
    ],
    [
     "arkadaşın",
     0.155,
     0.657
    ],
    [
     "dinle",
     0.657,
     0.907
    ],
    [
     "ilgili",
     0.907,
     1.283
    ],
    [
     "bir",
     1.283,
     1.408
    ],
    [
     "şey",
     1.408,
     1.534
    ],
    [
     "anlatıyor.",
     1.534,
     2.035
    ],
    [
     "Bunun",
     2.325,
     2.545
    ],
    [
     "doğru",
     2.545,
     2.765
    ],
    [
     "olup",
     2.765,
     2.985
    ],
    [
     "olmadığını",
     2.985,
     3.535
    ],
    [
     "bilmiyorsun.",
     3.535,
     3.975
    ],
    [
     "Ne",
     4.325,
     4.464
    ],
    [
     "yaparsın?",
     4.464,
     4.88
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.523,
   "m": "Konu hakkında hiçbir şey öğrenmiyorsun; soru işaretin yerinde kalıyor.",
   "k": [
    [
     "Konu",
     0.03,
     0.3
    ],
    [
     "hakkında",
     0.3,
     0.705
    ],
    [
     "hiçbir",
     0.705,
     0.975
    ],
    [
     "şey",
     0.975,
     1.11
    ],
    [
     "öğrenmiyorsun;",
     1.11,
     1.785
    ],
    [
     "soru",
     2.065,
     2.296
    ],
    [
     "işaretin",
     2.296,
     2.759
    ],
    [
     "yerinde",
     2.759,
     3.106
    ],
    [
     "kalıyor.",
     3.106,
     3.453
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.849,
   "m": "Doğru olup olmadığına bakılmıyor; yanlış bir bilgi sende de yerleşebilir.",
   "k": [
    [
     "Doğru",
     0.03,
     0.245
    ],
    [
     "olup",
     0.245,
     0.461
    ],
    [
     "olmadığına",
     0.461,
     0.999
    ],
    [
     "bakılmıyor;",
     0.999,
     1.43
    ],
    [
     "yanlış",
     1.715,
     2.032
    ],
    [
     "bir",
     2.032,
     2.191
    ],
    [
     "bilgi",
     2.191,
     2.509
    ],
    [
     "sende",
     2.509,
     2.826
    ],
    [
     "de",
     2.826,
     2.985
    ],
    [
     "yerleşebilir.",
     2.985,
     3.779
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.373,
   "m": "Hocan sakin sakin anlatıyor; doğrusunu öğrenmiş oluyorsun.",
   "k": [
    [
     "Hocan",
     0.03,
     0.361
    ],
    [
     "sakin",
     0.361,
     0.692
    ],
    [
     "sakin",
     0.692,
     1.023
    ],
    [
     "anlatıyor;",
     1.023,
     1.685
    ],
    [
     "doğrusunu",
     1.975,
     2.458
    ],
    [
     "öğrenmiş",
     2.458,
     2.82
    ],
    [
     "oluyorsun.",
     2.82,
     3.303
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.581,
   "m": "Bir videoda dinle ilgili bir söz duydun ve doğru olup olmadığını merak ediyorsun. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.177
    ],
    [
     "videoda",
     0.177,
     0.767
    ],
    [
     "dinle",
     0.767,
     1.062
    ],
    [
     "ilgili",
     1.062,
     1.505
    ],
    [
     "bir",
     1.505,
     1.652
    ],
    [
     "söz",
     1.652,
     1.8
    ],
    [
     "duydun",
     1.8,
     2.095
    ],
    [
     "ve",
     2.095,
     2.242
    ],
    [
     "doğru",
     2.242,
     2.537
    ],
    [
     "olup",
     2.537,
     2.832
    ],
    [
     "olmadığını",
     2.832,
     3.57
    ],
    [
     "merak",
     3.57,
     3.865
    ],
    [
     "ediyorsun.",
     3.865,
     4.455
    ],
    [
     "Ne",
     4.92,
     5.068
    ],
    [
     "yaparsın?",
     5.068,
     5.511
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 1.938,
   "m": "Merak ettiğin şey cevapsız kalıyor.",
   "k": [
    [
     "Merak",
     0.03,
     0.336
    ],
    [
     "ettiğin",
     0.336,
     0.796
    ],
    [
     "şey",
     0.796,
     0.949
    ],
    [
     "cevapsız",
     0.949,
     1.408
    ],
    [
     "kalıyor.",
     1.408,
     1.868
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.251,
   "m": "Sözün kaynağını bilmeden onu başkasına da anlatabilirsin.",
   "k": [
    [
     "Sözün",
     0.03,
     0.316
    ],
    [
     "kaynağını",
     0.316,
     0.889
    ],
    [
     "bilmeden",
     0.889,
     1.319
    ],
    [
     "onu",
     1.319,
     1.605
    ],
    [
     "başkasına",
     1.605,
     2.178
    ],
    [
     "da",
     2.178,
     2.322
    ],
    [
     "anlatabilirsin.",
     2.322,
     3.181
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.475,
   "m": "Büyüğün videoya birlikte bakıyor ve doğrusunu anlatıyor.",
   "k": [
    [
     "Büyüğün",
     0.03,
     0.49
    ],
    [
     "videoya",
     0.49,
     1.104
    ],
    [
     "birlikte",
     1.104,
     1.564
    ],
    [
     "bakıyor",
     1.564,
     2.024
    ],
    [
     "ve",
     2.024,
     2.178
    ],
    [
     "doğrusunu",
     2.178,
     2.791
    ],
    [
     "anlatıyor.",
     2.791,
     3.405
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
   "sure": 10.968,
   "m": "Bu cümle bilerek çift anlamlı. Duyduğunu kaynağına bakmadan dinden sayan biri söylüyorsa sağ uca yakın. Duyduğunu açıkça söyleyip güvenilir bir hocaya sormaya hazır biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.184
    ],
    [
     "cümle",
     0.184,
     0.492
    ],
    [
     "bilerek",
     0.492,
     0.954
    ],
    [
     "çift",
     0.954,
     1.108
    ],
    [
     "anlamlı.",
     1.108,
     1.57
    ],
    [
     "Duyduğunu",
     1.96,
     2.42
    ],
    [
     "kaynağına",
     2.42,
     2.88
    ],
    [
     "bakmadan",
     2.88,
     3.225
    ],
    [
     "dinden",
     3.225,
     3.455
    ],
    [
     "sayan",
     3.455,
     3.685
    ],
    [
     "biri",
     3.685,
     3.915
    ],
    [
     "söylüyorsa",
     3.915,
     4.375
    ],
    [
     "sağ",
     4.375,
     4.49
    ],
    [
     "uca",
     4.49,
     4.72
    ],
    [
     "yakın.",
     4.72,
     4.95
    ],
    [
     "Duyduğunu",
     5.095,
     5.758
    ],
    [
     "açıkça",
     5.758,
     6.256
    ],
    [
     "söyleyip",
     6.256,
     6.753
    ],
    [
     "güvenilir",
     6.753,
     7.416
    ],
    [
     "bir",
     7.416,
     7.582
    ],
    [
     "hocaya",
     7.582,
     8.079
    ],
    [
     "sormaya",
     8.079,
     8.577
    ],
    [
     "hazır",
     8.577,
     8.908
    ],
    [
     "biri",
     8.908,
     9.24
    ],
    [
     "söylüyorsa",
     9.24,
     9.903
    ],
    [
     "orta",
     9.903,
     10.234
    ],
    [
     "uca",
     10.234,
     10.566
    ],
    [
     "yakın.",
     10.566,
     10.898
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
