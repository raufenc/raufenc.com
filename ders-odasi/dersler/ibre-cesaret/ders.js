/* İbremetre · Cesaret — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Çekingenlik · Cesaret · Pervasızlık). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-cesaret",
 "ad": "Cesaret: İbren Nerede?",
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
     "huy": "Cesaret",
     "huyAnahtar": "Cesaret",
     "olculen": "Doğruyu yapma cesaretim",
     "kanca": "Ne derlerse desinler, yaparım.",
     "uclar": {
      "az": "Çekingenlik",
      "orta": "Cesaret",
      "fazla": "Pervasızlık"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Cesaret",
     "cumle": "Ne derlerse desinler, yaparım.",
     "uclar": {
      "az": "Çekingenlik",
      "orta": "Cesaret",
      "fazla": "Pervasızlık"
     },
     "yesil": 0.26,
     "hedefZon": "orta",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi başkaları ne derse desin doğru olanı yapıyor: orta uca yakın. Başka okumada kimseyi dinlemeden, sonunu düşünmeden atılıyor: sağ uca (Pervasızlık) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an doğruyu yapmak için ne yaptığımıza bakar. Cesaret; çekinsen de doğru olanı seçip yapabilmektir. Sol uç, “başkaları ayıplar” diye doğruyu yapamamaktır; sağ uç, düşünmeden tehlikeye atılmaktır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Cesaret",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Çekingenlik",
      "orta": "Cesaret",
      "fazla": "Pervasızlık"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Ayıplanmaktan korkmak neye benziyor?",
       "ad": "Çekingenlik",
       "soz": "Ya arkadaşlar gülerse? Söylemesem daha iyi.",
       "eylem": "yaslan",
       "zincir": [
        "Haksızlığa uğrayan arkadaşı yalnız kalır.",
        "Kendisi de içinde rahat edemez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ya gülerlerse? Hiç karışmayayım.",
          "dogru": true,
          "not": "Çekingenlik, başkaları ayıplar diye doğruyu yapamamaktır. Çevrenin sesi, içindeki doğru sesi bastırıyor."
         },
         {
          "m": "Çekiniyorum ama doğru olanı yapacağım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: cesaretin sesi."
         },
         {
          "m": "Yapamazsın dediler; düşünmeden yapayım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: pervasızlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Çekingenlik",
        "soz": "Ya"
       },
       "zincirAnahtar": [
        "Haksızlığa",
        "Kendisi"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kışkırtılınca atılan kişi neyi kaçırır?",
       "ad": "Pervasızlık",
       "soz": "Yapamazsın mı dediniz? Hemen atlıyorum!",
       "eylem": "isaret",
       "zincir": [
        "Koridorda kayarak koşunca arkadaşına çarpabilir.",
        "Cesur görünmek isterken kendine de zarar verebilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yapamazsın dediler; düşünmeden yapayım.",
          "dogru": true,
          "not": "Pervasızlık, düşünmeden kendini öne atmaktır. Cesarete benzer ama sonunu hesaplamaz."
         },
         {
          "m": "Ya gülerlerse? Hiç karışmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: çekingenliğin sesi."
         },
         {
          "m": "Çekiniyorum ama doğru olanı yapacağım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: cesaretin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Pervasızlık",
        "soz": "Yapamazsın"
       },
       "zincirAnahtar": [
        "Koridorda",
        "Cesur"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Cesaret",
       "soz": "Gülseler de doğrusunu söyleyeceğim.",
       "eylem": "konus",
       "zincir": [
        "Doğru söz yerine ulaşır.",
        "Arkadaşları da onun duruşundan güç alır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Çekiniyorum ama doğru olanı yapacağım.",
          "dogru": true,
          "not": "Cesaret, çekinsen de durup düşünerek doğru olanı yapabilmektir."
         },
         {
          "m": "Ya gülerlerse? Hiç karışmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: çekingenliğin sesi."
         },
         {
          "m": "Yapamazsın dediler; düşünmeden yapayım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: pervasızlığın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Cesaret",
        "soz": "Gülseler"
       },
       "zincirAnahtar": [
        "Doğru",
        "Arkadaşları"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Cesaret",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Çekingenlik",
      "orta": "Cesaret",
      "fazla": "Pervasızlık"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "dalga",
       "baslik": "Dalga geçme",
       "tetik": "Arkadaşların sınıftan bir arkadaşınla dalga geçiyor. Bunun doğru olmadığını biliyorsun.",
       "secenekler": [
        {
         "m": "Karışmayayım, sonra bana da gülerler.",
         "zon": "az",
         "sonuc": "Dalga geçme sürüyor; arkadaşın daha da kırılıyor, sen de içinde rahatsızsın.",
         "not": "İbre sola kaydı: ayıplanma korkusu, doğruyu söylemeyi engelliyor.",
         "ses": "s1az"
        },
        {
         "m": "Düşünmeden ortaya dalıp hepsine bağırırım!",
         "zon": "fazla",
         "sonuc": "Tartışma büyüyor; asıl konu unutuluyor ve arkadaşın yine yalnız kalıyor.",
         "not": "İbre sağa kaydı: düşünmeden atılmak doğruyu savunmak değil, ortalığı karıştırmak.",
         "ses": "s1fa"
        },
        {
         "m": "Dalga geçmeyin, bu doğru değil.",
         "zon": "orta",
         "sonuc": "Bir kısmı utanıp duruyor; arkadaşın yalnız olmadığını anlıyor.",
         "not": "İbre ortada: çekinsen de sakin ve doğru bir söz söyledin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kopya",
       "baslik": "Sınıfta kopya",
       "tetik": "Sınavda bir arkadaşının kopya çektiğini görüyorsun. Doğrusunun söylenmesi gerektiğini biliyorsun.",
       "secenekler": [
        {
         "m": "Hiç sesimi çıkarmam; sonra bana kızarlar.",
         "zon": "az",
         "sonuc": "Kopya sürüyor; sen ise sınav boyunca huzursuz kalıyorsun.",
         "not": "İbre sola kaydı: “ne derler” düşüncesi doğruyu susturuyor.",
         "ses": "s2az"
        },
        {
         "m": "Hemen herkesin önünde ilan edip ortaya atılırım!",
         "zon": "fazla",
         "sonuc": "Arkadaşın utanıyor, sınıf karışıyor; konuşmak için daha uygun bir yol vardı.",
         "not": "İbre sağa kaydı: sonucunu düşünmeden atılmak işi çözmüyor.",
         "ses": "s2fa"
        },
        {
         "m": "Önce arkadaşıma söylerim; olmazsa güvendiğim öğretmene anlatırım.",
         "zon": "orta",
         "sonuc": "Arkadaşın durumu fark ediyor; sorun doğru kişiye ulaşıyor.",
         "not": "İbre ortada: korksan da düşünerek doğru yolu seçtin.",
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
       "ad": "Az · Çekingenlik",
       "aciklama": "“Ne derler” diye susmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Cesaret",
       "aciklama": "Çekinse de doğruyu yapmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Pervasızlık",
       "aciklama": "Düşünmeden atılmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Doğrusunu bilir ama “arkadaşlar ne der?” diye susar.",
       "alan": "az",
       "ipucu": "Ayıplanmaktan çekiniyor."
      },
      {
       "id": "k2",
       "metin": "“Cesaretin yok mu?” denince hiç düşünmeden yüksek bir yerden atlar.",
       "alan": "fazla",
       "ipucu": "Sonunu düşünmüyor."
      },
      {
       "id": "k3",
       "metin": "Gülebilirler diye çekinir ama yine de doğrusunu nazikçe söyler.",
       "alan": "orta",
       "ipucu": "Çekinse de doğruyu yapıyor."
      },
      {
       "id": "k4",
       "metin": "Arkadaşı haksızlığa uğrarken “bana da gülerler” deyip yanına gitmez.",
       "alan": "az",
       "ipucu": "Çekinmek onu durduruyor."
      },
      {
       "id": "k5",
       "metin": "Arkadaşları bağırınca ne olacağına bakmadan korkuluktan kaymaya kalkar.",
       "alan": "fazla",
       "ipucu": "Kışkırtmaya kapılıyor."
      },
      {
       "id": "k6",
       "metin": "Haksızlığı görünce önce durup düşünür, sonra uygun bir söz söyler.",
       "alan": "orta",
       "ipucu": "Hem doğruyu yapıyor hem düşünüyor."
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
        "Arkadaşlarım yanlış bir şey yapınca",
        "“Yapamazsın!” diye kışkırtılınca",
        "Doğruyu söylemek zor gelince",
        "Sınıfta fikrimi söylemek isteyince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Doğruyu söylemeden önce bir nefes alacağım",
        "“Yapamazsın” denince durup sonucunu düşüneceğim",
        "Zor gelirse güvendiğim bir büyüğe danışacağım"
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
       "baslik": "Cesaret",
       "metin": "çekinse de doğruyu yapmak",
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
   "sure": 2.179,
   "m": "Ne derlerse desinler, yaparım.",
   "k": [
    [
     "Ne",
     0.03,
     0.211
    ],
    [
     "derlerse",
     0.211,
     0.756
    ],
    [
     "desinler,",
     0.756,
     1.3
    ],
    [
     "yaparım.",
     1.535,
     2.109
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.633,
   "m": "Birçok güzel huy bir ibre gibidir. Cesaret, doğruyu yapmaktaki gücümü ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.525
    ],
    [
     "güzel",
     0.525,
     1.021
    ],
    [
     "huy",
     1.021,
     1.269
    ],
    [
     "bir",
     1.269,
     1.516
    ],
    [
     "ibre",
     1.516,
     2.012
    ],
    [
     "gibidir.",
     2.012,
     2.755
    ],
    [
     "Cesaret,",
     2.85,
     3.445
    ],
    [
     "doğruyu",
     3.66,
     4.433
    ],
    [
     "yapmaktaki",
     4.433,
     5.463
    ],
    [
     "gücümü",
     5.463,
     6.235
    ],
    [
     "ölçer.",
     6.235,
     6.75
    ],
    [
     "İbre",
     6.945,
     7.351
    ],
    [
     "üç",
     7.351,
     7.553
    ],
    [
     "yerde",
     7.553,
     7.959
    ],
    [
     "durabilir:",
     7.959,
     8.77
    ],
    [
     "az,",
     9.105,
     9.242
    ],
    [
     "kararında,",
     9.242,
     9.79
    ],
    [
     "fazla.",
     10.19,
     10.563
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
   "sure": 7.709,
   "m": "Sol uçta Çekingenlik. Ya arkadaşlar gülerse? Söylemesem daha iyi. Doğruyu bildiği hâlde sessiz kalır.",
   "k": [
    [
     "Sol",
     0.03,
     0.234
    ],
    [
     "uçta",
     0.234,
     0.641
    ],
    [
     "Çekingenlik.",
     0.641,
     1.455
    ],
    [
     "Ya",
     1.555,
     1.811
    ],
    [
     "arkadaşlar",
     1.811,
     2.833
    ],
    [
     "gülerse?",
     2.833,
     3.6
    ],
    [
     "Söylemesem",
     4.01,
     4.51
    ],
    [
     "daha",
     4.51,
     4.76
    ],
    [
     "iyi.",
     4.76,
     5.01
    ],
    [
     "Doğruyu",
     5.71,
     6.192
    ],
    [
     "bildiği",
     6.192,
     6.675
    ],
    [
     "hâlde",
     6.675,
     6.996
    ],
    [
     "sessiz",
     6.996,
     7.318
    ],
    [
     "kalır.",
     7.318,
     7.639
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.539,
   "m": "Sonra ne olur? Haksızlığa uğrayan arkadaşı yalnız kalır. Kendisi de içinde rahat edemez.",
   "k": [
    [
     "Sonra",
     0.03,
     0.296
    ],
    [
     "ne",
     0.296,
     0.429
    ],
    [
     "olur?",
     0.429,
     0.695
    ],
    [
     "Haksızlığa",
     0.99,
     1.57
    ],
    [
     "uğrayan",
     1.57,
     2.005
    ],
    [
     "arkadaşı",
     2.005,
     2.585
    ],
    [
     "yalnız",
     2.585,
     2.875
    ],
    [
     "kalır.",
     2.875,
     3.165
    ],
    [
     "Kendisi",
     3.625,
     4.086
    ],
    [
     "de",
     4.086,
     4.24
    ],
    [
     "içinde",
     4.24,
     4.701
    ],
    [
     "rahat",
     4.701,
     5.008
    ],
    [
     "edemez.",
     5.008,
     5.469
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
   "sure": 7.582,
   "m": "Sağ uçta Pervasızlık. Yapamazsın mı dediniz? Hemen atlıyorum! Kışkırtılınca sonunu düşünmeden öne atılır.",
   "k": [
    [
     "Sağ",
     0.03,
     0.241
    ],
    [
     "uçta",
     0.241,
     0.662
    ],
    [
     "Pervasızlık.",
     0.662,
     1.505
    ],
    [
     "Yapamazsın",
     1.595,
     2.357
    ],
    [
     "mı",
     2.357,
     2.548
    ],
    [
     "dediniz?",
     2.548,
     3.12
    ],
    [
     "Hemen",
     3.435,
     3.66
    ],
    [
     "atlıyorum!",
     3.66,
     4.11
    ],
    [
     "Kışkırtılınca",
     4.685,
     5.516
    ],
    [
     "sonunu",
     5.516,
     6.015
    ],
    [
     "düşünmeden",
     6.015,
     6.68
    ],
    [
     "öne",
     6.68,
     7.013
    ],
    [
     "atılır.",
     7.013,
     7.512
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 7.279,
   "m": "Sonra ne olur? Koridorda kayarak koşunca arkadaşına çarpabilir. Cesur görünmek isterken kendine de zarar verebilir.",
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
     "Koridorda",
     1.225,
     1.788
    ],
    [
     "kayarak",
     1.788,
     2.211
    ],
    [
     "koşunca",
     2.211,
     2.633
    ],
    [
     "arkadaşına",
     2.633,
     3.337
    ],
    [
     "çarpabilir.",
     3.337,
     3.9
    ],
    [
     "Cesur",
     4.285,
     4.61
    ],
    [
     "görünmek",
     4.61,
     5.097
    ],
    [
     "isterken",
     5.097,
     5.585
    ],
    [
     "kendine",
     5.585,
     6.072
    ],
    [
     "de",
     6.072,
     6.234
    ],
    [
     "zarar",
     6.234,
     6.559
    ],
    [
     "verebilir.",
     6.559,
     7.209
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
   "sure": 7.272,
   "m": "Tam kararında Cesaret. Gülseler de doğrusunu söyleyeceğim. Önce durup düşünür, sonra doğru olanı yapar.",
   "k": [
    [
     "Tam",
     0.03,
     0.211
    ],
    [
     "kararında",
     0.211,
     0.936
    ],
    [
     "Cesaret.",
     0.936,
     1.48
    ],
    [
     "Gülseler",
     1.585,
     2.182
    ],
    [
     "de",
     2.182,
     2.38
    ],
    [
     "doğrusunu",
     2.38,
     3.176
    ],
    [
     "söyleyeceğim.",
     3.176,
     4.17
    ],
    [
     "Önce",
     4.25,
     4.579
    ],
    [
     "durup",
     4.579,
     4.907
    ],
    [
     "düşünür,",
     4.907,
     5.4
    ],
    [
     "sonra",
     5.625,
     5.976
    ],
    [
     "doğru",
     5.976,
     6.326
    ],
    [
     "olanı",
     6.326,
     6.852
    ],
    [
     "yapar.",
     6.852,
     7.202
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.102,
   "m": "Sonra ne olur? Doğru söz yerine ulaşır. Arkadaşları da onun duruşundan güç alır.",
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
     "Doğru",
     1.165,
     1.483
    ],
    [
     "söz",
     1.483,
     1.642
    ],
    [
     "yerine",
     1.642,
     2.118
    ],
    [
     "ulaşır.",
     2.118,
     2.595
    ],
    [
     "Arkadaşları",
     2.895,
     3.607
    ],
    [
     "da",
     3.607,
     3.75
    ],
    [
     "onun",
     3.75,
     4.034
    ],
    [
     "duruşundan",
     4.034,
     4.604
    ],
    [
     "güç",
     4.604,
     4.747
    ],
    [
     "alır.",
     4.747,
     5.032
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
   "sure": 4.825,
   "m": "Arkadaşların sınıftan bir arkadaşınla dalga geçiyor. Bunun doğru olmadığını biliyorsun. Ne yaparsın?",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.647
    ],
    [
     "sınıftan",
     0.647,
     1.017
    ],
    [
     "bir",
     1.017,
     1.141
    ],
    [
     "arkadaşınla",
     1.141,
     1.758
    ],
    [
     "dalga",
     1.758,
     2.005
    ],
    [
     "geçiyor.",
     2.005,
     2.375
    ],
    [
     "Bunun",
     2.625,
     2.831
    ],
    [
     "doğru",
     2.831,
     3.037
    ],
    [
     "olmadığını",
     3.037,
     3.553
    ],
    [
     "biliyorsun.",
     3.553,
     3.965
    ],
    [
     "Ne",
     4.28,
     4.399
    ],
    [
     "yaparsın?",
     4.399,
     4.755
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.202,
   "m": "Dalga geçme sürüyor; arkadaşın daha da kırılıyor, sen de içinde rahatsızsın.",
   "k": [
    [
     "Dalga",
     0.03,
     0.361
    ],
    [
     "geçme",
     0.361,
     0.693
    ],
    [
     "sürüyor;",
     0.693,
     1.19
    ],
    [
     "arkadaşın",
     1.385,
     1.854
    ],
    [
     "daha",
     1.854,
     2.089
    ],
    [
     "da",
     2.089,
     2.206
    ],
    [
     "kırılıyor,",
     2.206,
     2.675
    ],
    [
     "sen",
     2.94,
     3.072
    ],
    [
     "de",
     3.072,
     3.205
    ],
    [
     "içinde",
     3.205,
     3.602
    ],
    [
     "rahatsızsın.",
     3.602,
     4.132
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.997,
   "m": "Tartışma büyüyor; asıl konu unutuluyor ve arkadaşın yine yalnız kalıyor.",
   "k": [
    [
     "Tartışma",
     0.03,
     0.438
    ],
    [
     "büyüyor;",
     0.438,
     0.845
    ],
    [
     "asıl",
     1.185,
     1.541
    ],
    [
     "konu",
     1.541,
     1.898
    ],
    [
     "unutuluyor",
     1.898,
     2.789
    ],
    [
     "ve",
     2.789,
     2.967
    ],
    [
     "arkadaşın",
     2.967,
     3.68
    ],
    [
     "yine",
     3.68,
     4.036
    ],
    [
     "yalnız",
     4.036,
     4.393
    ],
    [
     "kalıyor.",
     4.393,
     4.927
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.447,
   "m": "Bir kısmı utanıp duruyor; arkadaşın yalnız olmadığını anlıyor.",
   "k": [
    [
     "Bir",
     0.03,
     0.157
    ],
    [
     "kısmı",
     0.157,
     0.41
    ],
    [
     "utanıp",
     0.41,
     0.79
    ],
    [
     "duruyor;",
     0.79,
     1.17
    ],
    [
     "arkadaşın",
     1.485,
     2.026
    ],
    [
     "yalnız",
     2.026,
     2.296
    ],
    [
     "olmadığını",
     2.296,
     2.972
    ],
    [
     "anlıyor.",
     2.972,
     3.377
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.418,
   "m": "Sınavda bir arkadaşının kopya çektiğini görüyorsun. Doğrusunun söylenmesi gerektiğini biliyorsun. Ne yaparsın?",
   "k": [
    [
     "Sınavda",
     0.03,
     0.393
    ],
    [
     "bir",
     0.393,
     0.514
    ],
    [
     "arkadaşının",
     0.514,
     1.119
    ],
    [
     "kopya",
     1.119,
     1.362
    ],
    [
     "çektiğini",
     1.362,
     1.846
    ],
    [
     "görüyorsun.",
     1.846,
     2.33
    ],
    [
     "Doğrusunun",
     2.56,
     3.008
    ],
    [
     "söylenmesi",
     3.008,
     3.456
    ],
    [
     "gerektiğini",
     3.456,
     4.017
    ],
    [
     "biliyorsun.",
     4.017,
     4.465
    ],
    [
     "Ne",
     4.79,
     4.93
    ],
    [
     "yaparsın?",
     4.93,
     5.348
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.006,
   "m": "Kopya sürüyor; sen ise sınav boyunca huzursuz kalıyorsun.",
   "k": [
    [
     "Kopya",
     0.03,
     0.352
    ],
    [
     "sürüyor;",
     0.352,
     0.835
    ],
    [
     "sen",
     1.18,
     1.364
    ],
    [
     "ise",
     1.364,
     1.731
    ],
    [
     "sınav",
     1.731,
     2.099
    ],
    [
     "boyunca",
     2.099,
     2.65
    ],
    [
     "huzursuz",
     2.65,
     3.201
    ],
    [
     "kalıyorsun.",
     3.201,
     3.936
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.36,
   "m": "Arkadaşın utanıyor, sınıf karışıyor; konuşmak için daha uygun bir yol vardı.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.562
    ],
    [
     "utanıyor,",
     0.562,
     1.095
    ],
    [
     "sınıf",
     1.21,
     1.582
    ],
    [
     "karışıyor;",
     1.582,
     2.325
    ],
    [
     "konuşmak",
     2.405,
     2.84
    ],
    [
     "için",
     2.84,
     3.13
    ],
    [
     "daha",
     3.13,
     3.42
    ],
    [
     "uygun",
     3.42,
     3.71
    ],
    [
     "bir",
     3.71,
     3.855
    ],
    [
     "yol",
     3.855,
     4.0
    ],
    [
     "vardı.",
     4.0,
     4.29
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.615,
   "m": "Arkadaşın durumu fark ediyor; sorun doğru kişiye ulaşıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.541
    ],
    [
     "durumu",
     0.541,
     0.924
    ],
    [
     "fark",
     0.924,
     1.052
    ],
    [
     "ediyor;",
     1.052,
     1.435
    ],
    [
     "sorun",
     1.705,
     2.04
    ],
    [
     "doğru",
     2.04,
     2.374
    ],
    [
     "kişiye",
     2.374,
     2.876
    ],
    [
     "ulaşıyor.",
     2.876,
     3.545
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
   "sure": 9.095,
   "m": "Bu cümle bilerek çift anlamlı. Doğru olanı yapmaya kararlı biri söylüyorsa orta uca yakın. Sonunu düşünmeden atılan biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.178
    ],
    [
     "cümle",
     0.178,
     0.475
    ],
    [
     "bilerek",
     0.475,
     0.921
    ],
    [
     "çift",
     0.921,
     1.07
    ],
    [
     "anlamlı.",
     1.07,
     1.515
    ],
    [
     "Doğru",
     1.875,
     2.171
    ],
    [
     "olanı",
     2.171,
     2.615
    ],
    [
     "yapmaya",
     2.615,
     3.059
    ],
    [
     "kararlı",
     3.059,
     3.503
    ],
    [
     "biri",
     3.503,
     3.8
    ],
    [
     "söylüyorsa",
     3.8,
     4.392
    ],
    [
     "orta",
     4.392,
     4.688
    ],
    [
     "uca",
     4.688,
     4.984
    ],
    [
     "yakın.",
     4.984,
     5.28
    ],
    [
     "Sonunu",
     5.93,
     6.372
    ],
    [
     "düşünmeden",
     6.372,
     6.962
    ],
    [
     "atılan",
     6.962,
     7.404
    ],
    [
     "biri",
     7.404,
     7.698
    ],
    [
     "söylüyorsa",
     7.698,
     8.288
    ],
    [
     "sağ",
     8.288,
     8.435
    ],
    [
     "uca",
     8.435,
     8.73
    ],
    [
     "yakın.",
     8.73,
     9.025
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
