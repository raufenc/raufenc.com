/* İbremetre · Akîde — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Lakayt İnanç · Sahih Akîde · Kaynaksız). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-akide",
 "ad": "Akîde: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "inanc",
 "muzik": "inanc",
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
      "fazla": "Kaynaksız"
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
      "fazla": "Kaynaksız"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi duyduğu bir sözü kaynağına bakmadan dinin bir parçası sanıyor: sağ uca (Kaynaksız) yakın. Başka okumada kişi duyduğunu açıkça söylüyor ve doğruluğunu güvenilir bir kaynakta kontrol etmeye hazır: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an inancımızı nasıl öğrendiğimize bakar. Sahih Akîde; Kur’an ve sünnete uygun iman etmek ve duyduğumuzu güvenilir kaynakla karşılaştırmaktır. Sağ uca çocuk diliyle “Kaynaksız” dedik; Excel’deki adı Bid‘at Îtikâdı, yani dinde aslı olmayan, sonradan eklenmiş inanışlardır. Bu ibre ölçekten çok yönü gösterir: ders doğru ile yanlış inancı ayırmaz, yalnızca duyduğunu kaynağında kontrol etme alışkanlığına bakar.",
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
      "fazla": "Kaynaksız"
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
        "Dinle ilgili merak edeceği şeyler hiç sorulmaz.",
        "Doğru bilgiyi öğrenme fırsatları birer birer geçer."
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
          "m": "Bunu duydum; güvenilir kaynakta var mı, bakayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sahih akîdenin sesi."
         },
         {
          "m": "Herkes söylüyor, demek ki dinde böyle; bakmama gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: kaynaksızlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Lakayt",
        "soz": "Dinle"
       },
       "zincirAnahtar": [
        "Dinle",
        "Doğru"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Duyduğu her sözü dinden sayan kişi neyi kaçırır?",
       "ad": "Kaynaksız",
       "soz": "Herkes söylüyor, bu da dinin bir parçasıdır.",
       "eylem": "isaret",
       "zincir": [
        "Yanlış bir bilgi doğru gibi yerleşebilir.",
        "Kaynağa bakmak aklına bile gelmez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkes söylüyor, demek ki dinde böyle; bakmama gerek yok.",
          "dogru": true,
          "not": "Bu uçta duyulan her söz kaynağına bakılmadan dinin bir parçası sanılır. Kaynağa bakmak bunu önler."
         },
         {
          "m": "Dinle ilgili şeyleri öğrenmesem de olur.",
          "dogru": false,
          "not": "Bu sol ucun sesi: lakayt inancın sesi."
         },
         {
          "m": "Bunu duydum; güvenilir kaynakta var mı, bakayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: sahih akîdenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kaynaksız",
        "soz": "Herkes"
       },
       "zincirAnahtar": [
        "Yanlış",
        "Kaynağa"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Akîde",
       "soz": "Duyduğumu güvenilir kaynakta kontrol edeyim.",
       "eylem": "dusun",
       "zincir": [
        "Doğru olanla sonradan eklenen söz birbirinden ayrılır.",
        "İçi rahatlar ve öğrendiğini arkadaşlarına da anlatır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bunu duydum; güvenilir kaynakta var mı, bakayım.",
          "dogru": true,
          "not": "Akîde, Kur’an ve sünnete uygun iman etmektir; duyduğunu güvenilir kaynakta kontrol etmek bunu korur."
         },
         {
          "m": "Dinle ilgili şeyleri öğrenmesem de olur.",
          "dogru": false,
          "not": "Bu sol ucun sesi: lakayt inancın sesi."
         },
         {
          "m": "Herkes söylüyor, demek ki dinde böyle; bakmama gerek yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: kaynaksızlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Akîde",
        "soz": "Duyduğumu"
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
      "fazla": "Kaynaksız"
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
         "m": "Duyduğumu güvenilir bir kaynakta kontrol ederim.",
         "zon": "orta",
         "sonuc": "Kaynağa bakınca neyin doğru olduğunu görüyorsun.",
         "not": "İbre ortada: duyduğunu güvenilir kaynakta kontrol etmek, sağlam öğrenmenin yolu.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "video",
       "baslik": "Videoda söylenen",
       "tetik": "Bir videoda dinle ilgili bir söz duydun ama kaynağını bilmiyorsun.",
       "secenekler": [
        {
         "m": "Videoyu geçerim; üzerinde durmaya değmez.",
         "zon": "az",
         "sonuc": "Videodaki söz hakkında hiçbir şey öğrenmiyorsun; konu geçip gidiyor.",
         "not": "İbre sola kaydı: ilgisiz kalmak, öğrenmeyi baştan durduruyor.",
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
         "m": "Güvenilir kitaptan kontrol edip büyüğüme de gösteririm.",
         "zon": "orta",
         "sonuc": "Büyüğünle birlikte videoya bakıp doğrusunu öğreniyorsun.",
         "not": "İbre ortada: kaynağa bakıp güvendiğin bir büyükle birlikte bakmak, güvenli yol.",
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
       "aciklama": "Kaynağıyla karşılaştırmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Kaynaksız",
       "aciklama": "Her sözü dinden saymak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Dinle ilgili bir konu açılınca konuyu hemen değiştirir.",
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
       "metin": "Dinle ilgili bir şey duyunca güvenilir bir kaynakta kontrol eder.",
       "alan": "orta",
       "ipucu": "Kaynağıyla karşılaştırıyor."
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
       "metin": "Duyduğu sözün doğruluğunu güvenilir kitaplarda ve büyüklerinde araştırır.",
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
        "Duyduğumu güvenilir bir kaynakta kontrol edeceğim",
        "Duyduğum bir şeyi hemen dinden saymayıp kaynağına bakacağım",
        "Emin olamazsam güvendiğim bir hocama ya da büyüğüme soracağım"
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
       "metin": "duyduğunu kaynağında kontrol etmek",
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
   "sure": 6.403,
   "m": "Sonra ne olur? Dinle ilgili merak edeceği şeyler hiç sorulmaz. Doğru bilgiyi öğrenme fırsatları birer birer geçer.",
   "k": [
    [
     "Sonra",
     0.03,
     0.258
    ],
    [
     "ne",
     0.258,
     0.372
    ],
    [
     "olur?",
     0.372,
     0.6
    ],
    [
     "Dinle",
     0.865,
     1.16
    ],
    [
     "ilgili",
     1.16,
     1.602
    ],
    [
     "merak",
     1.602,
     1.896
    ],
    [
     "edeceği",
     1.896,
     2.486
    ],
    [
     "şeyler",
     2.486,
     2.781
    ],
    [
     "hiç",
     2.781,
     2.928
    ],
    [
     "sorulmaz.",
     2.928,
     3.37
    ],
    [
     "Doğru",
     3.68,
     3.975
    ],
    [
     "bilgiyi",
     3.975,
     4.417
    ],
    [
     "öğrenme",
     4.417,
     4.859
    ],
    [
     "fırsatları",
     4.859,
     5.449
    ],
    [
     "birer",
     5.449,
     5.744
    ],
    [
     "birer",
     5.744,
     6.039
    ],
    [
     "geçer.",
     6.039,
     6.333
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
   "sure": 7.433,
   "m": "Sağ uçta Kaynaksız. Herkes söylüyor, bu da dinin bir parçasıdır. Duyduğu sözün kaynağına bakmadan hemen kabul eder.",
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
     "Kaynaksız.",
     0.64,
     1.25
    ],
    [
     "Herkes",
     1.65,
     1.96
    ],
    [
     "söylüyor,",
     1.96,
     2.425
    ],
    [
     "bu",
     2.64,
     2.811
    ],
    [
     "da",
     2.811,
     2.981
    ],
    [
     "dinin",
     2.981,
     3.322
    ],
    [
     "bir",
     3.322,
     3.493
    ],
    [
     "parçasıdır.",
     3.493,
     4.175
    ],
    [
     "Duyduğu",
     4.46,
     4.944
    ],
    [
     "sözün",
     4.944,
     5.267
    ],
    [
     "kaynağına",
     5.267,
     5.912
    ],
    [
     "bakmadan",
     5.912,
     6.396
    ],
    [
     "hemen",
     6.396,
     6.718
    ],
    [
     "kabul",
     6.718,
     7.041
    ],
    [
     "eder.",
     7.041,
     7.363
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.757,
   "m": "Sonra ne olur? Yanlış bir bilgi doğru gibi yerleşebilir. Kaynağa bakmak aklına bile gelmez.",
   "k": [
    [
     "Sonra",
     0.03,
     0.276
    ],
    [
     "ne",
     0.276,
     0.399
    ],
    [
     "olur?",
     0.399,
     0.645
    ],
    [
     "Yanlış",
     1.1,
     1.423
    ],
    [
     "bir",
     1.423,
     1.584
    ],
    [
     "bilgi",
     1.584,
     1.907
    ],
    [
     "doğru",
     1.907,
     2.23
    ],
    [
     "gibi",
     2.23,
     2.553
    ],
    [
     "yerleşebilir.",
     2.553,
     3.36
    ],
    [
     "Kaynağa",
     3.68,
     4.182
    ],
    [
     "bakmak",
     4.182,
     4.516
    ],
    [
     "aklına",
     4.516,
     5.018
    ],
    [
     "bile",
     5.018,
     5.352
    ],
    [
     "gelmez.",
     5.352,
     5.687
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
   "sure": 7.777,
   "m": "Tam kararında Akîde. Duyduğumu güvenilir kaynakta kontrol edeyim. Duyduğu sözü güvendiği bir kitaptan ya da büyüğünden kontrol eder.",
   "k": [
    [
     "Tam",
     0.03,
     0.196
    ],
    [
     "kararında",
     0.196,
     0.861
    ],
    [
     "Akîde.",
     0.861,
     1.36
    ],
    [
     "Duyduğumu",
     1.885,
     2.379
    ],
    [
     "güvenilir",
     2.379,
     2.873
    ],
    [
     "kaynakta",
     2.873,
     3.243
    ],
    [
     "kontrol",
     3.243,
     3.49
    ],
    [
     "edeyim.",
     3.49,
     3.86
    ],
    [
     "Duyduğu",
     4.655,
     5.053
    ],
    [
     "sözü",
     5.053,
     5.318
    ],
    [
     "güvendiği",
     5.318,
     5.849
    ],
    [
     "bir",
     5.849,
     5.982
    ],
    [
     "kitaptan",
     5.982,
     6.38
    ],
    [
     "ya",
     6.38,
     6.512
    ],
    [
     "da",
     6.512,
     6.645
    ],
    [
     "büyüğünden",
     6.645,
     7.176
    ],
    [
     "kontrol",
     7.176,
     7.441
    ],
    [
     "eder.",
     7.441,
     7.707
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 8.662,
   "m": "Sonra ne olur? Doğru olanla sonradan eklenen söz birbirinden ayrılır. İçi rahatlar ve öğrendiğini arkadaşlarına da anlatır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.418
    ],
    [
     "ne",
     0.418,
     0.612
    ],
    [
     "olur?",
     0.612,
     1.0
    ],
    [
     "Doğru",
     1.19,
     1.586
    ],
    [
     "olanla",
     1.586,
     2.181
    ],
    [
     "sonradan",
     2.181,
     2.775
    ],
    [
     "eklenen",
     2.775,
     3.37
    ],
    [
     "söz",
     3.37,
     3.568
    ],
    [
     "birbirinden",
     3.568,
     4.361
    ],
    [
     "ayrılır.",
     4.361,
     4.955
    ],
    [
     "İçi",
     5.26,
     5.577
    ],
    [
     "rahatlar",
     5.577,
     6.053
    ],
    [
     "ve",
     6.053,
     6.212
    ],
    [
     "öğrendiğini",
     6.212,
     7.005
    ],
    [
     "arkadaşlarına",
     7.005,
     7.957
    ],
    [
     "da",
     7.957,
     8.116
    ],
    [
     "anlatır.",
     8.116,
     8.592
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
   "sure": 2.65,
   "m": "Kaynağa bakınca neyin doğru olduğunu görüyorsun.",
   "k": [
    [
     "Kaynağa",
     0.03,
     0.455
    ],
    [
     "bakınca",
     0.455,
     0.88
    ],
    [
     "neyin",
     0.88,
     1.163
    ],
    [
     "doğru",
     1.163,
     1.446
    ],
    [
     "olduğunu",
     1.446,
     2.013
    ],
    [
     "görüyorsun.",
     2.013,
     2.58
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.457,
   "m": "Bir videoda dinle ilgili bir söz duydun ama kaynağını bilmiyorsun. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.176
    ],
    [
     "videoda",
     0.176,
     0.762
    ],
    [
     "dinle",
     0.762,
     1.055
    ],
    [
     "ilgili",
     1.055,
     1.495
    ],
    [
     "bir",
     1.495,
     1.641
    ],
    [
     "söz",
     1.641,
     1.788
    ],
    [
     "duydun",
     1.788,
     2.08
    ],
    [
     "ama",
     2.08,
     2.373
    ],
    [
     "kaynağını",
     2.373,
     2.959
    ],
    [
     "bilmiyorsun.",
     2.959,
     3.545
    ],
    [
     "Ne",
     3.785,
     3.936
    ],
    [
     "yaparsın?",
     3.936,
     4.387
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.674,
   "m": "Videodaki söz hakkında hiçbir şey öğrenmiyorsun; konu geçip gidiyor.",
   "k": [
    [
     "Videodaki",
     0.03,
     0.717
    ],
    [
     "söz",
     0.717,
     0.854
    ],
    [
     "hakkında",
     0.854,
     1.266
    ],
    [
     "hiçbir",
     1.266,
     1.541
    ],
    [
     "şey",
     1.541,
     1.678
    ],
    [
     "öğrenmiyorsun;",
     1.678,
     2.365
    ],
    [
     "konu",
     2.7,
     2.958
    ],
    [
     "geçip",
     2.958,
     3.217
    ],
    [
     "gidiyor.",
     3.217,
     3.604
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
   "sure": 2.989,
   "m": "Büyüğünle birlikte videoya bakıp doğrusunu öğreniyorsun.",
   "k": [
    [
     "Büyüğünle",
     0.03,
     0.555
    ],
    [
     "birlikte",
     0.555,
     0.949
    ],
    [
     "videoya",
     0.949,
     1.475
    ],
    [
     "bakıp",
     1.475,
     1.737
    ],
    [
     "doğrusunu",
     1.737,
     2.262
    ],
    [
     "öğreniyorsun.",
     2.262,
     2.919
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
   "sure": 11.887,
   "m": "Bu cümle bilerek çift anlamlı. Duyduğunu kaynağına bakmadan dinden sayan biri söylüyorsa sağ uca yakın. Duyduğunu açıkça söyleyip güvenilir bir kaynakta kontrol etmeye hazır biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.186
    ],
    [
     "cümle",
     0.186,
     0.498
    ],
    [
     "bilerek",
     0.498,
     0.966
    ],
    [
     "çift",
     0.966,
     1.122
    ],
    [
     "anlamlı.",
     1.122,
     1.59
    ],
    [
     "Duyduğunu",
     1.975,
     2.6
    ],
    [
     "kaynağına",
     2.6,
     3.226
    ],
    [
     "bakmadan",
     3.226,
     3.695
    ],
    [
     "dinden",
     3.695,
     4.007
    ],
    [
     "sayan",
     4.007,
     4.32
    ],
    [
     "biri",
     4.32,
     4.633
    ],
    [
     "söylüyorsa",
     4.633,
     5.258
    ],
    [
     "sağ",
     5.258,
     5.415
    ],
    [
     "uca",
     5.415,
     5.727
    ],
    [
     "yakın.",
     5.727,
     6.04
    ],
    [
     "Duyduğunu",
     6.515,
     7.088
    ],
    [
     "açıkça",
     7.088,
     7.518
    ],
    [
     "söyleyip",
     7.518,
     7.948
    ],
    [
     "güvenilir",
     7.948,
     8.521
    ],
    [
     "bir",
     8.521,
     8.664
    ],
    [
     "kaynakta",
     8.664,
     9.094
    ],
    [
     "kontrol",
     9.094,
     9.381
    ],
    [
     "etmeye",
     9.381,
     9.811
    ],
    [
     "hazır",
     9.811,
     10.097
    ],
    [
     "biri",
     10.097,
     10.384
    ],
    [
     "söylüyorsa",
     10.384,
     10.957
    ],
    [
     "orta",
     10.957,
     11.244
    ],
    [
     "uca",
     11.244,
     11.53
    ],
    [
     "yakın.",
     11.53,
     11.817
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
