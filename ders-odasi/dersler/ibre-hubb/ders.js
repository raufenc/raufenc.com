/* İbremetre · Hubbu Fillah — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Tecrid · Hubb-Buğz · Menfaat). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-hubb",
 "ad": "Hubbu Fillah: İbren Nerede?",
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
     "huy": "Hubbu Fillah",
     "huyAnahtar": "Hubbu",
     "olculen": "Dostluk kurma biçimim",
     "kanca": "Ben herkesin yanındayım.",
     "uclar": {
      "az": "Tecrid",
      "orta": "Hubb-Buğz",
      "fazla": "Menfaat"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Hubbu Fillah",
     "cumle": "Ben herkesin yanındayım.",
     "uclar": {
      "az": "Tecrid",
      "orta": "Hubb-Buğz",
      "fazla": "Menfaat"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi popüler olmak için herkesin her davranışına “tamam” diyor: sağ uca (Menfaat) yakın. Başka okumada kişi kimseyi dışlamıyor, arkadaşını seviyor ama yanlış bir davranışı onaylamıyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, dostluğu neye göre kurduğumuza bakar. Hubbu Fillah; Allahü teâlâ için sevmek ve sevmemek ölçüsüne göre dostluk kurmaktır. Çocuk diliyle: arkadaşını sev, yanlış davranışı sevme. Kimseyi sevmemek hedef değildir. Bu ibre ölçekten çok yönü gösterir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Hubbu Fillah",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Tecrid",
      "orta": "Hubb-Buğz",
      "fazla": "Menfaat"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Herkesten uzak durmak neye benziyor?",
       "ad": "Tecrid",
       "soz": "Kimseyle arkadaş olmak istemiyorum.",
       "eylem": "otur",
       "zincir": [
        "Yalnızlık hissi büyür.",
        "Arkadaşları onu çağırmaktan vazgeçebilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Herkesten uzak durayım; yalnız kalmak daha rahat.",
          "dogru": true,
          "not": "Tecrid, herkesi dışlayıp yalnız kalmaktır. Arkadaşı sevmek ile yanlış davranışı sevmemek aynı şey değildir."
         },
         {
          "m": "Arkadaşımı severim; yanlış davranışa katılmam, nazikçe söylerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hubb-buğzun sesi."
         },
         {
          "m": "Ne yaparsa onaylayayım; beni çok sevsinler.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: menfaatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tecrid",
        "soz": "Kimseyle"
       },
       "zincirAnahtar": [
        "Yalnızlık",
        "Arkadaşları"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Çıkar için onaylamak neye benziyor?",
       "ad": "Menfaat",
       "soz": "Ne yaparsan yap, bravo; ben seninleyim!",
       "eylem": "sevinc",
       "zincir": [
        "Yanlış davranış fark edilmeden sürüp gider.",
        "Dostluk, çıkar yüzünden gölgelenir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ne yaparsa onaylayayım; beni çok sevsinler.",
          "dogru": true,
          "not": "Menfaat, dostluğu çıkar ve popülerlik için kurmaktır. Arkadaşını sev, ama yanlış davranışı sevme."
         },
         {
          "m": "Herkesten uzak durayım; yalnız kalmak daha rahat.",
          "dogru": false,
          "not": "Bu sol ucun sesi: tecridin sesi."
         },
         {
          "m": "Arkadaşımı severim; yanlış davranışa katılmam, nazikçe söylerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hubb-buğzun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Menfaat",
        "soz": "Ne"
       },
       "zincirAnahtar": [
        "Yanlış",
        "Dostluk,"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Dostluk",
       "soz": "Seni severim ama bu davranışı doğru bulmuyorum.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı bu sözü sevgiyle dinleyebilir.",
        "Dostluk daha içten ve sağlam olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Arkadaşımı severim; yanlış davranışa katılmam, nazikçe söylerim.",
          "dogru": true,
          "not": "Hubbu Fillah, Allahü teâlâ için sevmek ve sevmemek ölçüsüne göre dostluk kurmaktır: arkadaşını sev, yanlış davranışı sevme."
         },
         {
          "m": "Herkesten uzak durayım; yalnız kalmak daha rahat.",
          "dogru": false,
          "not": "Bu sol ucun sesi: tecridin sesi."
         },
         {
          "m": "Ne yaparsa onaylayayım; beni çok sevsinler.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: menfaatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Dostluk",
        "soz": "Seni"
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
     "huy": "Hubbu Fillah",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Tecrid",
      "orta": "Hubb-Buğz",
      "fazla": "Menfaat"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "alay",
       "baslik": "Alaycı gülüşme",
       "tetik": "Arkadaş grubunda biri, sınıftaki bir arkadaşıyla alay etmeye başladı. Herkes gülüyor.",
       "secenekler": [
        {
         "m": "Hepsinden uzak dururum; hiçbir grupla oturmam.",
         "zon": "az",
         "sonuc": "Yalnız kalıyorsun; alay edilen arkadaş da yalnız kalıyor.",
         "not": "İbre sola kaydı: herkesi dışlamak, kimseye yardım etmeyi de engelliyor.",
         "ses": "s1az"
        },
        {
         "m": "Ben de gülerim, popüler kalırım.",
         "zon": "fazla",
         "sonuc": "Alay büyüyor; kırılan arkadaş daha yalnız kalıyor.",
         "not": "İbre sağa kaydı: popüler kalmak için yanlışa katılmak, dostluğu değil çıkarı korur.",
         "ses": "s1fa"
        },
        {
         "m": "Gülmem; arkadaşımı severim ama bu davranış doğru değil derim.",
         "zon": "orta",
         "sonuc": "Grup sessizleşiyor; kırılan arkadaş yalnız olmadığını görüyor.",
         "not": "İbre ortada: arkadaşı sevip yanlış davranışı sevmemek.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "odev",
       "baslik": "Yapılmamış ödev",
       "tetik": "Sevdiğin bir arkadaşın ödevini yapmadı ve öğretmene yaptım demeni istiyor.",
       "secenekler": [
        {
         "m": "Kimseyle uğraşmam, uzak dururum.",
         "zon": "az",
         "sonuc": "Konu açık kalıyor; arkadaşınla bağın da zayıflıyor.",
         "not": "İbre sola kaydı: uzak durmak, arkadaşa yardım etme fırsatını kaçırıyor.",
         "ses": "s2az"
        },
        {
         "m": "Tamam, söylerim; bana kızmasın, beni sevsin.",
         "zon": "fazla",
         "sonuc": "Arkadaşın memnun oluyor ama doğru olmayan bir şeye ortak oluyorsun.",
         "not": "İbre sağa kaydı: sevilmek için yanlışı onaylamak, dostluğu zayıflatır.",
         "ses": "s2fa"
        },
        {
         "m": "Seni severim ama yalan söylemem; ödevi birlikte yapalım.",
         "zon": "orta",
         "sonuc": "Arkadaşın önce şaşırıyor, sonra birlikte çalışmaya razı oluyor.",
         "not": "İbre ortada: sevgi ile doğruluk birlikte durabilir.",
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
       "ad": "Az · Tecrid",
       "aciklama": "Herkesten uzak durmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Hubb-Buğz",
       "aciklama": "Arkadaşı sev, yanlışı sevme",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Menfaat",
       "aciklama": "Popüler olmak için onaylamak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Oyun davetlerini hep geri çevirir, kimseyle konuşmaz.",
       "alan": "az",
       "ipucu": "Herkesi dışlıyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı yanlış bir şey yapınca popüler kalmak için “aferin” der.",
       "alan": "fazla",
       "ipucu": "Yanlışa onay veriyor."
      },
      {
       "id": "k3",
       "metin": "Arkadaşını sever ama yanlış davranışını nazikçe söyler.",
       "alan": "orta",
       "ipucu": "Sevgi ve doğru ölçü."
      },
      {
       "id": "k4",
       "metin": "“Kimse beni anlamaz” diyerek herkesten uzak durur.",
       "alan": "az",
       "ipucu": "Yalnızlaşıyor."
      },
      {
       "id": "k5",
       "metin": "Beğenilmek için herkesin her davranışına “haklısın” der.",
       "alan": "fazla",
       "ipucu": "Çıkar için onaylıyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşıyla oynar; yanlış bir davranışa katılmaz.",
       "alan": "orta",
       "ipucu": "Yanında ama yanlışın yanında değil."
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
        "Arkadaşım yanlış bir şey yapınca",
        "Popüler bir gruba girerken",
        "Oyun davetini alınca",
        "Bir arkadaşımla tartışınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Arkadaşımı sevip yanlış davranışa nazikçe “hayır” diyeceğim",
        "Beğenilmek için doğru bildiğimi bırakmayacağım",
        "Bu hafta bir arkadaşıma içten bir iyilik yapacağım"
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
       "baslik": "Hubbu Fillah",
       "metin": "arkadaşı sev, yanlışı sevme",
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
   "sure": 1.97,
   "m": "Ben herkesin yanındayım.",
   "k": [
    [
     "Ben",
     0.03,
     0.264
    ],
    [
     "herkesin",
     0.264,
     0.965
    ],
    [
     "yanındayım.",
     0.965,
     1.9
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.467,
   "m": "Birçok güzel huy bir ibre gibidir. Hubbu Fillah, dostluğu neye göre kurduğumu ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.416
    ],
    [
     "güzel",
     0.416,
     0.803
    ],
    [
     "huy",
     0.803,
     0.996
    ],
    [
     "bir",
     0.996,
     1.189
    ],
    [
     "ibre",
     1.189,
     1.575
    ],
    [
     "gibidir.",
     1.575,
     2.155
    ],
    [
     "Hubbu",
     2.995,
     3.34
    ],
    [
     "Fillah,",
     3.34,
     3.685
    ],
    [
     "dostluğu",
     3.985,
     4.653
    ],
    [
     "neye",
     4.653,
     5.098
    ],
    [
     "göre",
     5.098,
     5.544
    ],
    [
     "kurduğumu",
     5.544,
     6.435
    ],
    [
     "ölçer.",
     6.435,
     6.88
    ],
    [
     "İbre",
     6.95,
     7.361
    ],
    [
     "üç",
     7.361,
     7.567
    ],
    [
     "yerde",
     7.567,
     7.978
    ],
    [
     "durabilir:",
     7.978,
     8.8
    ],
    [
     "az,",
     9.065,
     9.213
    ],
    [
     "kararında,",
     9.213,
     9.805
    ],
    [
     "fazla.",
     10.045,
     10.397
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
   "sure": 6.339,
   "m": "Sol uçta Tecrid. Kimseyle arkadaş olmak istemiyorum. Oyun davetlerini hep geri çevirip köşede oturur.",
   "k": [
    [
     "Sol",
     0.03,
     0.18
    ],
    [
     "uçta",
     0.18,
     0.48
    ],
    [
     "Tecrid.",
     0.48,
     0.78
    ],
    [
     "Kimseyle",
     0.865,
     1.482
    ],
    [
     "arkadaş",
     1.482,
     2.1
    ],
    [
     "olmak",
     2.1,
     2.511
    ],
    [
     "istemiyorum.",
     2.511,
     3.54
    ],
    [
     "Oyun",
     3.9,
     4.149
    ],
    [
     "davetlerini",
     4.149,
     4.773
    ],
    [
     "hep",
     4.773,
     4.898
    ],
    [
     "geri",
     4.898,
     5.147
    ],
    [
     "çevirip",
     5.147,
     5.521
    ],
    [
     "köşede",
     5.521,
     5.895
    ],
    [
     "oturur.",
     5.895,
     6.269
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.141,
   "m": "Sonra ne olur? Yalnızlık hissi büyür. Arkadaşları onu çağırmaktan vazgeçebilir.",
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
     "Yalnızlık",
     1.29,
     1.738
    ],
    [
     "hissi",
     1.738,
     2.036
    ],
    [
     "büyür.",
     2.036,
     2.335
    ],
    [
     "Arkadaşları",
     2.77,
     3.489
    ],
    [
     "onu",
     3.489,
     3.777
    ],
    [
     "çağırmaktan",
     3.777,
     4.352
    ],
    [
     "vazgeçebilir.",
     4.352,
     5.071
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
   "sure": 8.815,
   "m": "Sağ uçta Menfaat. Ne yaparsan yap, bravo; ben seninleyim! Popüler olmak için arkadaşının yanlış bir davranışına da güler ve onaylar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.24
    ],
    [
     "uçta",
     0.24,
     0.66
    ],
    [
     "Menfaat.",
     0.66,
     1.29
    ],
    [
     "Ne",
     1.38,
     1.404
    ],
    [
     "yaparsan",
     1.404,
     1.476
    ],
    [
     "yap,",
     1.476,
     1.5
    ],
    [
     "bravo;",
     2.06,
     2.865
    ],
    [
     "ben",
     3.04,
     3.129
    ],
    [
     "seninleyim!",
     3.129,
     3.485
    ],
    [
     "Popüler",
     3.79,
     4.341
    ],
    [
     "olmak",
     4.341,
     4.708
    ],
    [
     "için",
     4.708,
     5.075
    ],
    [
     "arkadaşının",
     5.075,
     5.992
    ],
    [
     "yanlış",
     5.992,
     6.359
    ],
    [
     "bir",
     6.359,
     6.543
    ],
    [
     "davranışına",
     6.543,
     7.46
    ],
    [
     "da",
     7.46,
     7.644
    ],
    [
     "güler",
     7.644,
     8.011
    ],
    [
     "ve",
     8.011,
     8.194
    ],
    [
     "onaylar.",
     8.194,
     8.745
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.93,
   "m": "Sonra ne olur? Yanlış davranış fark edilmeden sürüp gider. Dostluk, çıkar yüzünden gölgelenir.",
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
     "Yanlış",
     1.185,
     1.497
    ],
    [
     "davranış",
     1.497,
     1.965
    ],
    [
     "fark",
     1.965,
     2.121
    ],
    [
     "edilmeden",
     2.121,
     2.746
    ],
    [
     "sürüp",
     2.746,
     3.058
    ],
    [
     "gider.",
     3.058,
     3.37
    ],
    [
     "Dostluk,",
     3.715,
     4.17
    ],
    [
     "çıkar",
     4.41,
     4.732
    ],
    [
     "yüzünden",
     4.732,
     5.215
    ],
    [
     "gölgelenir.",
     5.215,
     5.86
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
   "sure": 9.209,
   "m": "Tam kararında Dostluk. Seni severim ama bu davranışı doğru bulmuyorum. Arkadaşını sever, yanlış davranışı nazikçe söyler.",
   "k": [
    [
     "Tam",
     0.03,
     0.239
    ],
    [
     "kararında",
     0.239,
     1.076
    ],
    [
     "Dostluk.",
     1.076,
     1.495
    ],
    [
     "Seni",
     1.57,
     1.986
    ],
    [
     "severim",
     1.986,
     2.61
    ],
    [
     "ama",
     2.61,
     3.026
    ],
    [
     "bu",
     3.026,
     3.234
    ],
    [
     "davranışı",
     3.234,
     4.067
    ],
    [
     "doğru",
     4.067,
     4.483
    ],
    [
     "bulmuyorum.",
     4.483,
     5.315
    ],
    [
     "Arkadaşını",
     5.985,
     6.614
    ],
    [
     "sever,",
     6.614,
     6.865
    ],
    [
     "yanlış",
     7.095,
     7.467
    ],
    [
     "davranışı",
     7.467,
     8.21
    ],
    [
     "nazikçe",
     8.21,
     8.767
    ],
    [
     "söyler.",
     8.767,
     9.139
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.053,
   "m": "Sonra ne olur? Arkadaşı bu sözü sevgiyle dinleyebilir. Dostluk daha içten ve sağlam olur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.456
    ],
    [
     "ne",
     0.456,
     0.669
    ],
    [
     "olur?",
     0.669,
     1.095
    ],
    [
     "Arkadaşı",
     1.185,
     1.741
    ],
    [
     "bu",
     1.741,
     1.88
    ],
    [
     "sözü",
     1.88,
     2.158
    ],
    [
     "sevgiyle",
     2.158,
     2.575
    ],
    [
     "dinleyebilir.",
     2.575,
     3.27
    ],
    [
     "Dostluk",
     3.745,
     4.152
    ],
    [
     "daha",
     4.152,
     4.559
    ],
    [
     "içten",
     4.559,
     4.966
    ],
    [
     "ve",
     4.966,
     5.169
    ],
    [
     "sağlam",
     5.169,
     5.576
    ],
    [
     "olur.",
     5.576,
     5.983
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
   "sure": 5.354,
   "m": "Arkadaş grubunda biri, sınıftaki bir arkadaşıyla alay etmeye başladı. Herkes gülüyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaş",
     0.03,
     0.418
    ],
    [
     "grubunda",
     0.418,
     0.805
    ],
    [
     "biri,",
     0.805,
     1.064
    ],
    [
     "sınıftaki",
     1.064,
     1.581
    ],
    [
     "bir",
     1.581,
     1.71
    ],
    [
     "arkadaşıyla",
     1.71,
     2.356
    ],
    [
     "alay",
     2.356,
     2.615
    ],
    [
     "etmeye",
     2.615,
     3.002
    ],
    [
     "başladı.",
     3.002,
     3.39
    ],
    [
     "Herkes",
     3.775,
     4.115
    ],
    [
     "gülüyor.",
     4.115,
     4.625
    ],
    [
     "Ne",
     4.77,
     4.898
    ],
    [
     "yaparsın?",
     4.898,
     5.284
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.659,
   "m": "Yalnız kalıyorsun; alay edilen arkadaş da yalnız kalıyor.",
   "k": [
    [
     "Yalnız",
     0.03,
     0.322
    ],
    [
     "kalıyorsun;",
     0.322,
     0.905
    ],
    [
     "alay",
     1.405,
     1.717
    ],
    [
     "edilen",
     1.717,
     2.185
    ],
    [
     "arkadaş",
     2.185,
     2.653
    ],
    [
     "da",
     2.653,
     2.809
    ],
    [
     "yalnız",
     2.809,
     3.121
    ],
    [
     "kalıyor.",
     3.121,
     3.589
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.766,
   "m": "Alay büyüyor; kırılan arkadaş daha yalnız kalıyor.",
   "k": [
    [
     "Alay",
     0.03,
     0.432
    ],
    [
     "büyüyor;",
     0.432,
     1.035
    ],
    [
     "kırılan",
     1.36,
     1.899
    ],
    [
     "arkadaş",
     1.899,
     2.438
    ],
    [
     "daha",
     2.438,
     2.797
    ],
    [
     "yalnız",
     2.797,
     3.157
    ],
    [
     "kalıyor.",
     3.157,
     3.696
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.458,
   "m": "Grup sessizleşiyor; kırılan arkadaş yalnız olmadığını görüyor.",
   "k": [
    [
     "Grup",
     0.03,
     0.189
    ],
    [
     "sessizleşiyor;",
     0.189,
     0.985
    ],
    [
     "kırılan",
     1.27,
     1.667
    ],
    [
     "arkadaş",
     1.667,
     2.064
    ],
    [
     "yalnız",
     2.064,
     2.329
    ],
    [
     "olmadığını",
     2.329,
     2.991
    ],
    [
     "görüyor.",
     2.991,
     3.388
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.167,
   "m": "Sevdiğin bir arkadaşın ödevini yapmadı ve öğretmene yaptım demeni istiyor. Ne yaparsın?",
   "k": [
    [
     "Sevdiğin",
     0.03,
     0.471
    ],
    [
     "bir",
     0.471,
     0.618
    ],
    [
     "arkadaşın",
     0.618,
     1.206
    ],
    [
     "ödevini",
     1.206,
     1.794
    ],
    [
     "yapmadı",
     1.794,
     2.234
    ],
    [
     "ve",
     2.234,
     2.381
    ],
    [
     "öğretmene",
     2.381,
     2.969
    ],
    [
     "yaptım",
     2.969,
     3.263
    ],
    [
     "demeni",
     3.263,
     3.704
    ],
    [
     "istiyor.",
     3.704,
     4.145
    ],
    [
     "Ne",
     4.515,
     4.661
    ],
    [
     "yaparsın?",
     4.661,
     5.097
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.63,
   "m": "Konu açık kalıyor; arkadaşınla bağın da zayıflıyor.",
   "k": [
    [
     "Konu",
     0.03,
     0.261
    ],
    [
     "açık",
     0.261,
     0.493
    ],
    [
     "kalıyor;",
     0.493,
     0.84
    ],
    [
     "arkadaşınla",
     1.02,
     1.661
    ],
    [
     "bağın",
     1.661,
     1.918
    ],
    [
     "da",
     1.918,
     2.046
    ],
    [
     "zayıflıyor.",
     2.046,
     2.56
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.553,
   "m": "Arkadaşın memnun oluyor ama doğru olmayan bir şeye ortak oluyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.582
    ],
    [
     "memnun",
     0.582,
     0.859
    ],
    [
     "oluyor",
     0.859,
     1.273
    ],
    [
     "ama",
     1.273,
     1.549
    ],
    [
     "doğru",
     1.549,
     1.826
    ],
    [
     "olmayan",
     1.826,
     2.24
    ],
    [
     "bir",
     2.24,
     2.378
    ],
    [
     "şeye",
     2.378,
     2.654
    ],
    [
     "ortak",
     2.654,
     2.931
    ],
    [
     "oluyorsun.",
     2.931,
     3.483
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.042,
   "m": "Arkadaşın önce şaşırıyor, sonra birlikte çalışmaya razı oluyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.52
    ],
    [
     "önce",
     0.52,
     0.765
    ],
    [
     "şaşırıyor,",
     0.765,
     1.256
    ],
    [
     "sonra",
     1.256,
     1.501
    ],
    [
     "birlikte",
     1.501,
     1.869
    ],
    [
     "çalışmaya",
     1.869,
     2.359
    ],
    [
     "razı",
     2.359,
     2.604
    ],
    [
     "oluyor.",
     2.604,
     2.972
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
   "sure": 12.368,
   "m": "Bu cümle bilerek çift anlamlı. Popüler olmak için herkesin her davranışına evet diyen biri söylüyorsa sağ uca yakın. Arkadaşını seven ama yanlış davranışı onaylamayan biri söylüyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.18
    ],
    [
     "cümle",
     0.18,
     0.48
    ],
    [
     "bilerek",
     0.48,
     0.93
    ],
    [
     "çift",
     0.93,
     1.08
    ],
    [
     "anlamlı.",
     1.08,
     1.53
    ],
    [
     "Popüler",
     2.255,
     2.711
    ],
    [
     "olmak",
     2.711,
     3.015
    ],
    [
     "için",
     3.015,
     3.32
    ],
    [
     "herkesin",
     3.32,
     3.776
    ],
    [
     "her",
     3.776,
     3.928
    ],
    [
     "davranışına",
     3.928,
     4.689
    ],
    [
     "evet",
     4.689,
     4.993
    ],
    [
     "diyen",
     4.993,
     5.297
    ],
    [
     "biri",
     5.297,
     5.601
    ],
    [
     "söylüyorsa",
     5.601,
     6.21
    ],
    [
     "sağ",
     6.21,
     6.362
    ],
    [
     "uca",
     6.362,
     6.666
    ],
    [
     "yakın.",
     6.666,
     6.97
    ],
    [
     "Arkadaşını",
     7.575,
     8.313
    ],
    [
     "seven",
     8.313,
     8.608
    ],
    [
     "ama",
     8.608,
     8.903
    ],
    [
     "yanlış",
     8.903,
     9.198
    ],
    [
     "davranışı",
     9.198,
     9.789
    ],
    [
     "onaylamayan",
     9.789,
     10.527
    ],
    [
     "biri",
     10.527,
     10.822
    ],
    [
     "söylüyorsa",
     10.822,
     11.412
    ],
    [
     "orta",
     11.412,
     11.707
    ],
    [
     "uca",
     11.707,
     12.002
    ],
    [
     "yakın.",
     12.002,
     12.298
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
