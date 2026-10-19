/* İbremetre · Tevbe — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Aldırmazlık · Tevbe · Umutsuzluk). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevbe-umutsuzluk",
 "ad": "Tevbe (Aldırmazlık · Umutsuzluk): İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "cesaret",
 "muzik": "cesaret",
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
     "huy": "Tevbe",
     "huyAnahtar": "Tevbe",
     "olculen": "Bozduğum şeye ve hatama bakış biçimim",
     "kanca": "Olan oldu, geçti gitti.",
     "uclar": {
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tevbe",
     "cumle": "Olan oldu, geçti gitti.",
     "uclar": {
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi bozduğu şeyi ve hatayı önemsemeden geçiyor: sol uca (Aldırmazlık) yakın. Başka okumada hatayı kabul etmiş, özür dilemiş ve sayfayı çevirmiş: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, hataya nasıl baktığımıza bakar. Tevbe; hatayı fark edip pişman olmak ve Allahü teâlâ’ya yönelerek düzeltmeye çalışmaktır. Sağ uçta ise bir şeyi kırınca ya da bozunca “zaten düzeltemem, affedilmem” diye umudu kaybetmek vardır; oysa Allahü teâlâ’nın rahmetinden ümit kesilmez. Bu umutsuzluk, hatadan sonra affedilme umuduyla ilgilidir; çalışma ve başarıdaki umut Recâ dersindedir. Bu ibre ölçekten çok yönü gösterir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tevbe",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Hatayı önemsememek neye benziyor?",
       "ad": "Aldırmazlık",
       "soz": "Kırıldıysa kırılsın, umurumda değil.",
       "eylem": "el-salla",
       "zincir": [
        "Arkadaşı kırgın kalır, dostluk soğuyabilir.",
        "Düzelmeyen hata, içte bir ağırlık olarak kalabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ne olmuş yani? Önemli değil.",
          "dogru": true,
          "not": "Aldırmazlık, hata yapınca hiç pişman olmamaktır. Üzülmemek, düzeltme fırsatını da kaçırır."
         },
         {
          "m": "Üzüldüm; özür dilerim, Allahü teâlâ’dan da af dilerim, düzeltmeye çalışırım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         },
         {
          "m": "Ben zaten düzeltemem; denemenin anlamı yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: umutsuzluğun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Aldırmazlık",
        "soz": "Kırıldıysa"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Düzelmeyen"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Umudunu kesen kişi neyi kaçırır?",
       "ad": "Umutsuzluk",
       "soz": "Nasıl olsa affedilmem; düzeltmeyi denemeyeyim.",
       "eylem": "otur",
       "zincir": [
        "Özür dilemeye yaklaşmak zorlaşır.",
        "Düzeltilebilecek bir hata, büyük bir yük gibi görünür."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ben zaten düzeltemem; denemenin anlamı yok.",
          "dogru": true,
          "not": "Umutsuzluk, “düzeltemem” deyip affedilmeye bile umudu kesmektir. Allahü teâlâ’nın rahmetinden ümit kesilmez; küçük bir özür bile yeni bir başlangıçtır. Umutsuz hissedince güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Ne olmuş yani? Önemli değil.",
          "dogru": false,
          "not": "Bu sol ucun sesi: aldırmazlığın sesi."
         },
         {
          "m": "Üzüldüm; özür dilerim, Allahü teâlâ’dan da af dilerim, düzeltmeye çalışırım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevbenin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Umutsuzluk",
        "soz": "Nasıl"
       },
       "zincirAnahtar": [
        "Özür",
        "Düzeltilebilecek"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tevbe",
       "soz": "Üzüldüm; özür dileyip kırdığımı toplayayım.",
       "eylem": "egil",
       "zincir": [
        "Arkadaşı özrünü duyunca yumuşar.",
        "Birlikte tamir ederler; dostluk güçlenebilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Üzüldüm; özür dilerim, Allahü teâlâ’dan da af dilerim, düzeltmeye çalışırım.",
          "dogru": true,
          "not": "Tevbe, hatayı fark edip pişman olmak, özür dilemek, Allahü teâlâ’ya yönelmek ve düzeltmeye çalışmaktır. Umut hep açıktır."
         },
         {
          "m": "Ne olmuş yani? Önemli değil.",
          "dogru": false,
          "not": "Bu sol ucun sesi: aldırmazlığın sesi."
         },
         {
          "m": "Ben zaten düzeltemem; denemenin anlamı yok.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: umutsuzluğun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tevbe",
        "soz": "Üzüldüm;"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Birlikte"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tevbe",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Aldırmazlık",
      "orta": "Tevbe",
      "fazla": "Umutsuzluk"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "resim",
       "baslik": "Bozulan resim",
       "tetik": "Arkadaşının resmini yanlışlıkla ıslattın ve resim bozuldu.",
       "secenekler": [
        {
         "m": "Bir resim işte, önemli değil.",
         "zon": "az",
         "sonuc": "Arkadaşın üzülüyor ama sen konuyu kapatıyorsun; kırgınlık duruyor.",
         "not": "İbre sola kaydı: bozulan şeyi önemsememek kırgınlığı bırakıyor.",
         "ses": "s1az"
        },
        {
         "m": "Ben hep bozuyorum; hiçbir şeyi düzeltemem.",
         "zon": "fazla",
         "sonuc": "Özür dilemeye bile yaklaşamıyorsun; arkadaşın ne olduğunu bilmiyor.",
         "not": "İbre sağa kaydı: “düzeltemem” demek, küçük adımı da durduruyor.",
         "ses": "s1fa"
        },
        {
         "m": "Üzüldüm; özür dileyip yeni resim için yardım ederim.",
         "zon": "orta",
         "sonuc": "Arkadaşın özrünü kabul ediyor; birlikte yeni bir resim yapıyorsunuz.",
         "not": "İbre ortada: pişman oldun ve umutla düzeltmeye yöneldin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "saksi",
       "baslik": "Komşunun saksısı",
       "tetik": "Bahçede top oynarken komşunun saksısını düşürüp kırdın.",
       "secenekler": [
        {
         "m": "Saksı eski zaten, kırıldıysa kırıldı; oynamaya devam ederim.",
         "zon": "az",
         "sonuc": "Kırık parçalar yerde kalıyor; komşu üzülüyor ve aranızda bir soğukluk oluyor.",
         "not": "İbre sola kaydı: bozulan şeye aldırmamak kırgınlığı bırakıyor.",
         "ses": "s2az"
        },
        {
         "m": "Nasıl olsa affedilmem; komşunun yüzüne bile bakamam.",
         "zon": "fazla",
         "sonuc": "Saklanıp duruyorsun; komşu ne olduğunu bilmiyor ve içindeki yük büyüyor.",
         "not": "İbre sağa kaydı: “affedilmem” demek, küçük özür adımını bile durduruyor. Zor gelirse güvendiğin bir yetişkine danışabilirsin.",
         "ses": "s2fa"
        },
        {
         "m": "Özür dilerim; Allahü teâlâ’dan af dileyip saksıyı yenilerim.",
         "zon": "orta",
         "sonuc": "Komşu üzülüyor ama özrünü duyunca yumuşuyor; yenisini birlikte seçiyorsunuz.",
         "not": "İbre ortada: pişman olup Allahü teâlâ’ya yönelerek umutla düzeltmeye çalıştın.",
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
       "ad": "Az · Aldırmazlık",
       "aciklama": "Hataya aldırmamak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tevbe",
       "aciklama": "Pişman olup umutla dönmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Umutsuzluk",
       "aciklama": "“Düzeltemem” deyip umudu kesmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Arkadaşının oyuncağını kırınca “umrumda mı?” deyip oyuna döner.",
       "alan": "az",
       "ipucu": "Hataya aldırmıyor."
      },
      {
       "id": "k2",
       "metin": "Bir şeyi bozunca “ben zaten düzeltemem” deyip kendini bırakır.",
       "alan": "fazla",
       "ipucu": "Umudunu yitirmiş."
      },
      {
       "id": "k3",
       "metin": "Bozduğu şey için özür diler, Allahü teâlâ’dan af diler ve onarmaya çalışır.",
       "alan": "orta",
       "ipucu": "Pişman olup yöneliyor."
      },
      {
       "id": "k4",
       "metin": "Arkadaşının çantasının fermuarını bozunca hiçbir şey olmamış gibi yürüyüp gider.",
       "alan": "az",
       "ipucu": "Pişmanlık yok."
      },
      {
       "id": "k5",
       "metin": "Bir şeyi düşürüp kırınca “nasıl olsa affedilmem” deyip özür dilemeye gitmez.",
       "alan": "fazla",
       "ipucu": "Affedilmeyeceğini sanıyor."
      },
      {
       "id": "k6",
       "metin": "Hatasını söyler, “bir daha dikkat edeceğim” der ve umutla yeniden dener.",
       "alan": "orta",
       "ipucu": "Umudunu kaybetmeden düzeltiyor."
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
        "Bir şeyi kırınca ya da bozunca",
        "Birine zarar verdiğimi fark edince",
        "“Ben düzeltemem” diye düşününce",
        "Özür dilemek zor gelince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bozduğum şey için bugün özür dileyip Allahü teâlâ’dan af dileyeceğim",
        "“Düzeltemem” demek yerine küçük bir adım atacağım",
        "İçim ağırlaşırsa güvendiğim bir yetişkine anlatacağım"
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
       "baslik": "Tevbe",
       "metin": "pişman olup umutla düzeltmek",
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
   "sure": 2.154,
   "m": "Olan oldu, geçti gitti.",
   "k": [
    [
     "Olan",
     0.03,
     0.483
    ],
    [
     "oldu,",
     0.483,
     0.935
    ],
    [
     "geçti",
     1.165,
     1.624
    ],
    [
     "gitti.",
     1.624,
     2.084
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 9.984,
   "m": "Birçok güzel huy bir ibre gibidir. Tevbe, hatama nasıl baktığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.44
    ],
    [
     "güzel",
     0.44,
     0.85
    ],
    [
     "huy",
     0.85,
     1.055
    ],
    [
     "bir",
     1.055,
     1.26
    ],
    [
     "ibre",
     1.26,
     1.67
    ],
    [
     "gibidir.",
     1.67,
     2.285
    ],
    [
     "Tevbe,",
     2.72,
     3.17
    ],
    [
     "hatama",
     3.435,
     4.188
    ],
    [
     "nasıl",
     4.188,
     4.69
    ],
    [
     "baktığımı",
     4.69,
     5.693
    ],
    [
     "ölçer.",
     5.693,
     6.195
    ],
    [
     "İbre",
     6.31,
     6.737
    ],
    [
     "üç",
     6.737,
     6.95
    ],
    [
     "yerde",
     6.95,
     7.377
    ],
    [
     "durabilir:",
     7.377,
     8.23
    ],
    [
     "az,",
     8.465,
     8.608
    ],
    [
     "kararında,",
     8.608,
     9.18
    ],
    [
     "fazla.",
     9.5,
     9.914
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
   "sure": 8.073,
   "m": "Sol uçta Aldırmazlık. Kırıldıysa kırılsın, umurumda değil. Arkadaşının ödünç verdiği bir şeyi kırınca omuz silker.",
   "k": [
    [
     "Sol",
     0.03,
     0.259
    ],
    [
     "uçta",
     0.259,
     0.718
    ],
    [
     "Aldırmazlık.",
     0.718,
     1.635
    ],
    [
     "Kırıldıysa",
     1.72,
     1.751
    ],
    [
     "kırılsın,",
     1.751,
     1.775
    ],
    [
     "umurumda",
     2.575,
     3.192
    ],
    [
     "değil.",
     3.192,
     3.5
    ],
    [
     "Arkadaşının",
     3.705,
     4.78
    ],
    [
     "ödünç",
     4.78,
     5.209
    ],
    [
     "verdiği",
     5.209,
     5.854
    ],
    [
     "bir",
     5.854,
     6.069
    ],
    [
     "şeyi",
     6.069,
     6.499
    ],
    [
     "kırınca",
     6.499,
     7.144
    ],
    [
     "omuz",
     7.144,
     7.573
    ],
    [
     "silker.",
     7.573,
     8.003
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 7.392,
   "m": "Sonra ne olur? Arkadaşı kırgın kalır, dostluk soğuyabilir. Düzelmeyen hata, içte bir ağırlık olarak kalabilir.",
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
     1.245,
     1.772
    ],
    [
     "kırgın",
     1.772,
     2.036
    ],
    [
     "kalır,",
     2.036,
     2.3
    ],
    [
     "dostluk",
     2.62,
     2.896
    ],
    [
     "soğuyabilir.",
     2.896,
     3.585
    ],
    [
     "Düzelmeyen",
     3.875,
     4.668
    ],
    [
     "hata,",
     4.668,
     5.065
    ],
    [
     "içte",
     5.315,
     5.624
    ],
    [
     "bir",
     5.624,
     5.778
    ],
    [
     "ağırlık",
     5.778,
     6.241
    ],
    [
     "olarak",
     6.241,
     6.704
    ],
    [
     "kalabilir.",
     6.704,
     7.322
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
   "sure": 8.514,
   "m": "Sağ uçta Umutsuzluk. Nasıl olsa affedilmem; düzeltmeyi denemeyeyim. Küçük bir hatadan sonra köşesine çekilip umudunu keser.",
   "k": [
    [
     "Sağ",
     0.03,
     0.195
    ],
    [
     "uçta",
     0.195,
     0.525
    ],
    [
     "Umutsuzluk.",
     0.525,
     1.185
    ],
    [
     "Nasıl",
     1.275,
     1.706
    ],
    [
     "olsa",
     1.706,
     2.137
    ],
    [
     "affedilmem;",
     2.137,
     3.0
    ],
    [
     "düzeltmeyi",
     3.325,
     3.801
    ],
    [
     "denemeyeyim.",
     3.801,
     4.395
    ],
    [
     "Küçük",
     4.995,
     5.324
    ],
    [
     "bir",
     5.324,
     5.488
    ],
    [
     "hatadan",
     5.488,
     5.981
    ],
    [
     "sonra",
     5.981,
     6.309
    ],
    [
     "köşesine",
     6.309,
     6.966
    ],
    [
     "çekilip",
     6.966,
     7.459
    ],
    [
     "umudunu",
     7.459,
     8.116
    ],
    [
     "keser.",
     8.116,
     8.444
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.627,
   "m": "Sonra ne olur? Özür dilemeye yaklaşmak zorlaşır. Düzeltilebilecek bir hata, büyük bir yük gibi görünür.",
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
     "Özür",
     1.105,
     1.379
    ],
    [
     "dilemeye",
     1.379,
     1.927
    ],
    [
     "yaklaşmak",
     1.927,
     2.339
    ],
    [
     "zorlaşır.",
     2.339,
     2.75
    ],
    [
     "Düzeltilebilecek",
     3.185,
     4.47
    ],
    [
     "bir",
     4.47,
     4.653
    ],
    [
     "hata,",
     4.653,
     5.02
    ],
    [
     "büyük",
     5.095,
     5.42
    ],
    [
     "bir",
     5.42,
     5.582
    ],
    [
     "yük",
     5.582,
     5.745
    ],
    [
     "gibi",
     5.745,
     6.07
    ],
    [
     "görünür.",
     6.07,
     6.557
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
   "sure": 10.546,
   "m": "Tam kararında Tevbe. Üzüldüm; özür dileyip kırdığımı toplayayım. Kırdığını fark eder, özür diler, Allahü teâlâ’ya yönelir ve düzeltmeye yardım eder.",
   "k": [
    [
     "Tam",
     0.03,
     0.144
    ],
    [
     "kararında",
     0.144,
     0.601
    ],
    [
     "Tevbe.",
     0.601,
     0.83
    ],
    [
     "Üzüldüm;",
     1.19,
     1.585
    ],
    [
     "özür",
     2.475,
     2.723
    ],
    [
     "dileyip",
     2.723,
     3.094
    ],
    [
     "kırdığımı",
     3.094,
     3.59
    ],
    [
     "toplayayım.",
     3.59,
     4.085
    ],
    [
     "Kırdığını",
     4.19,
     4.65
    ],
    [
     "fark",
     4.65,
     4.765
    ],
    [
     "eder,",
     4.765,
     4.995
    ],
    [
     "özür",
     5.775,
     6.253
    ],
    [
     "diler,",
     6.253,
     6.73
    ],
    [
     "Allahü",
     6.85,
     7.423
    ],
    [
     "teâlâ’ya",
     7.423,
     8.186
    ],
    [
     "yönelir",
     8.186,
     8.758
    ],
    [
     "ve",
     8.758,
     8.949
    ],
    [
     "düzeltmeye",
     8.949,
     9.713
    ],
    [
     "yardım",
     9.713,
     10.094
    ],
    [
     "eder.",
     10.094,
     10.476
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.846,
   "m": "Sonra ne olur? Arkadaşı özrünü duyunca yumuşar. Birlikte tamir ederler; dostluk güçlenebilir.",
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
     1.255,
     1.975
    ],
    [
     "özrünü",
     1.975,
     2.515
    ],
    [
     "duyunca",
     2.515,
     3.055
    ],
    [
     "yumuşar.",
     3.055,
     3.595
    ],
    [
     "Birlikte",
     3.83,
     4.31
    ],
    [
     "tamir",
     4.31,
     4.63
    ],
    [
     "ederler;",
     4.63,
     5.11
    ],
    [
     "dostluk",
     5.39,
     5.786
    ],
    [
     "güçlenebilir.",
     5.786,
     6.776
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
   "sure": 4.285,
   "m": "Arkadaşının resmini yanlışlıkla ıslattın ve resim bozuldu. Ne yaparsın?",
   "k": [
    [
     "Arkadaşının",
     0.03,
     0.809
    ],
    [
     "resmini",
     0.809,
     1.276
    ],
    [
     "yanlışlıkla",
     1.276,
     1.899
    ],
    [
     "ıslattın",
     1.899,
     2.366
    ],
    [
     "ve",
     2.366,
     2.521
    ],
    [
     "resim",
     2.521,
     2.833
    ],
    [
     "bozuldu.",
     2.833,
     3.3
    ],
    [
     "Ne",
     3.64,
     3.784
    ],
    [
     "yaparsın?",
     3.784,
     4.215
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.574,
   "m": "Arkadaşın üzülüyor ama sen konuyu kapatıyorsun; kırgınlık duruyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.514
    ],
    [
     "üzülüyor",
     0.514,
     0.998
    ],
    [
     "ama",
     0.998,
     1.241
    ],
    [
     "sen",
     1.241,
     1.362
    ],
    [
     "konuyu",
     1.362,
     1.725
    ],
    [
     "kapatıyorsun;",
     1.725,
     2.33
    ],
    [
     "kırgınlık",
     2.71,
     3.107
    ],
    [
     "duruyor.",
     3.107,
     3.504
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.34,
   "m": "Özür dilemeye bile yaklaşamıyorsun; arkadaşın ne olduğunu bilmiyor.",
   "k": [
    [
     "Özür",
     0.03,
     0.236
    ],
    [
     "dilemeye",
     0.236,
     0.647
    ],
    [
     "bile",
     0.647,
     0.853
    ],
    [
     "yaklaşamıyorsun;",
     0.853,
     1.47
    ],
    [
     "arkadaşın",
     1.81,
     2.297
    ],
    [
     "ne",
     2.297,
     2.418
    ],
    [
     "olduğunu",
     2.418,
     2.905
    ],
    [
     "bilmiyor.",
     2.905,
     3.27
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.581,
   "m": "Arkadaşın özrünü kabul ediyor; birlikte yeni bir resim yapıyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.562
    ],
    [
     "özrünü",
     0.562,
     0.96
    ],
    [
     "kabul",
     0.96,
     1.226
    ],
    [
     "ediyor;",
     1.226,
     1.625
    ],
    [
     "birlikte",
     1.83,
     2.218
    ],
    [
     "yeni",
     2.218,
     2.476
    ],
    [
     "bir",
     2.476,
     2.606
    ],
    [
     "resim",
     2.606,
     2.864
    ],
    [
     "yapıyorsunuz.",
     2.864,
     3.511
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.029,
   "m": "Bahçede top oynarken komşunun saksısını düşürüp kırdın. Ne yaparsın?",
   "k": [
    [
     "Bahçede",
     0.03,
     0.507
    ],
    [
     "top",
     0.507,
     0.666
    ],
    [
     "oynarken",
     0.666,
     1.143
    ],
    [
     "komşunun",
     1.143,
     1.619
    ],
    [
     "saksısını",
     1.619,
     2.255
    ],
    [
     "düşürüp",
     2.255,
     2.732
    ],
    [
     "kırdın.",
     2.732,
     3.05
    ],
    [
     "Ne",
     3.385,
     3.528
    ],
    [
     "yaparsın?",
     3.528,
     3.959
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.871,
   "m": "Kırık parçalar yerde kalıyor; komşu üzülüyor ve aranızda bir soğukluk oluyor.",
   "k": [
    [
     "Kırık",
     0.03,
     0.301
    ],
    [
     "parçalar",
     0.301,
     0.708
    ],
    [
     "yerde",
     0.708,
     0.979
    ],
    [
     "kalıyor;",
     0.979,
     1.385
    ],
    [
     "komşu",
     1.74,
     2.08
    ],
    [
     "üzülüyor",
     2.08,
     2.76
    ],
    [
     "ve",
     2.76,
     2.93
    ],
    [
     "aranızda",
     2.93,
     3.611
    ],
    [
     "bir",
     3.611,
     3.781
    ],
    [
     "soğukluk",
     3.781,
     4.291
    ],
    [
     "oluyor.",
     4.291,
     4.801
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.723,
   "m": "Saklanıp duruyorsun; komşu ne olduğunu bilmiyor ve içindeki yük büyüyor.",
   "k": [
    [
     "Saklanıp",
     0.03,
     0.405
    ],
    [
     "duruyorsun;",
     0.405,
     0.905
    ],
    [
     "komşu",
     1.36,
     1.707
    ],
    [
     "ne",
     1.707,
     1.88
    ],
    [
     "olduğunu",
     1.88,
     2.573
    ],
    [
     "bilmiyor",
     2.573,
     3.093
    ],
    [
     "ve",
     3.093,
     3.267
    ],
    [
     "içindeki",
     3.267,
     3.96
    ],
    [
     "yük",
     3.96,
     4.133
    ],
    [
     "büyüyor.",
     4.133,
     4.653
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.288,
   "m": "Komşu üzülüyor ama özrünü duyunca yumuşuyor; yenisini birlikte seçiyorsunuz.",
   "k": [
    [
     "Komşu",
     0.03,
     0.299
    ],
    [
     "üzülüyor",
     0.299,
     0.837
    ],
    [
     "ama",
     0.837,
     1.106
    ],
    [
     "özrünü",
     1.106,
     1.509
    ],
    [
     "duyunca",
     1.509,
     1.912
    ],
    [
     "yumuşuyor;",
     1.912,
     2.45
    ],
    [
     "yenisini",
     2.895,
     3.336
    ],
    [
     "birlikte",
     3.336,
     3.667
    ],
    [
     "seçiyorsunuz.",
     3.667,
     4.218
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
   "sure": 9.376,
   "m": "Bu cümle bilerek çift anlamlı. Hatayı önemsemeyen biri söylüyorsa sol uca yakın. Hatayı kabul edip özür dilemiş biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.189
    ],
    [
     "cümle",
     0.189,
     0.506
    ],
    [
     "bilerek",
     0.506,
     0.981
    ],
    [
     "çift",
     0.981,
     1.14
    ],
    [
     "anlamlı.",
     1.14,
     1.615
    ],
    [
     "Hatayı",
     1.93,
     2.393
    ],
    [
     "önemsemeyen",
     2.393,
     3.164
    ],
    [
     "biri",
     3.164,
     3.472
    ],
    [
     "söylüyorsa",
     3.472,
     4.089
    ],
    [
     "sol",
     4.089,
     4.243
    ],
    [
     "uca",
     4.243,
     4.552
    ],
    [
     "yakın.",
     4.552,
     4.86
    ],
    [
     "Hatayı",
     5.26,
     5.766
    ],
    [
     "kabul",
     5.766,
     6.103
    ],
    [
     "edip",
     6.103,
     6.44
    ],
    [
     "özür",
     6.44,
     6.777
    ],
    [
     "dilemiş",
     6.777,
     7.283
    ],
    [
     "biri",
     7.283,
     7.62
    ],
    [
     "söylüyorsa",
     7.62,
     8.295
    ],
    [
     "orta",
     8.295,
     8.632
    ],
    [
     "uca",
     8.632,
     8.969
    ],
    [
     "yakın.",
     8.969,
     9.306
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
