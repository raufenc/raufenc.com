/* İbremetre · Tevâzu — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Tezellül · Tevâzu · Kibr). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevazu",
 "ad": "Tevâzu: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "benlik",
 "muzik": "benlik",
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
     "huy": "Tevâzu",
     "olculen": "Başarıdaki payımı görme biçimim",
     "kanca": "Benim tevazum bile gösterişli!",
     "uclar": {
      "az": "Tezellül",
      "orta": "Tevâzu",
      "fazla": "Kibr"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.24
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tevâzu",
     "cumle": "Benim tevazum bile gösterişli!",
     "uclar": {
      "az": "Tezellül",
      "orta": "Tevâzu",
      "fazla": "Kibr"
     },
     "yesil": 0.24,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi kendi güzel huyunu bile öne çıkarıyor, yani payı kendine yazıyor: sağ uca (Kibr) yakın. Başka okumada kendine bakıp espri yapıyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an kişinin payını nasıl gördüğüne bakar; amaç kendini sorgulamak değil, fark etmek. Tevâzu, payını doğru görmek ve sahip olduklarının bir nimet olduğunu bilmektir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tevâzu",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Tezellül",
      "orta": "Tevâzu",
      "fazla": "Kibr"
     },
     "yesil": 0.24,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Kendini küçültmek de tevâzu mu?",
       "ad": "Tezellül",
       "soz": "Benim yaptığım söylemeye değmez.",
       "eylem": "yaslan",
       "zincir": [
        "Arkadaşları onun emeğini göremez olur.",
        "Kendi emeği de yok sayılmış olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yaptığım şey söylemeye değmez.",
          "dogru": true,
          "not": "Tezellül kendine haksızlık etmektir. Alçakgönüllülük değil, kendi emeğini yok saymak."
         },
         {
          "m": "Bu başarıda herkesin payı var; benim payım şu.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevâzunun sesi."
         },
         {
          "m": "Hepsini ben yaptım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: kibrin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tezellül",
        "soz": "Benim"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Kendi"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Başarıyı kendine yazan kişi neyi kaçırır?",
       "ad": "Kibr",
       "soz": "Bu işi bir ben yapabilirdim!",
       "eylem": "isaret",
       "zincir": [
        "Teşekkür sırası kimseye gelmez.",
        "Bir sonraki işte arkadaşların gönülden katılmayabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bu başarı benim; onlar sadece izledi.",
          "dogru": true,
          "not": "Kibir, kendini herkesten üstün görmektir; başkasının emeğini silip kendi payını şişirir."
         },
         {
          "m": "Benim yaptığım söylemeye değmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: tezellülün sesi."
         },
         {
          "m": "Hepimizin emeği var.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tevâzunun sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kibr",
        "soz": "Bu"
       },
       "zincirAnahtar": [
        "Teşekkür",
        "Bir"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tevâzu",
       "soz": "Hepimizin emeği var.",
       "eylem": "konus",
       "zincir": [
        "Payını olduğu gibi söyler.",
        "Bir sonraki işte arkadaşların gönülden katılabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bu başarıda herkesin payı var; benim payım şuydu.",
          "dogru": true,
          "not": "Tevâzu kendini silmek değil, payını doğru görmektir."
         },
         {
          "m": "Benim yaptığım söylemeye değmez.",
          "dogru": false,
          "not": "Bu sol ucun sesi: tezellülün sesi."
         },
         {
          "m": "Bu işi bir ben yapabilirdim.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: kibrin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tevâzu",
        "soz": "Hepimizin"
       },
       "zincirAnahtar": [
        "Payını",
        "Bir"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tevâzu",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Tezellül",
      "orta": "Tevâzu",
      "fazla": "Kibr"
     },
     "yesil": 0.24,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "yarisma",
       "baslik": "Yarışmayı kazandınız",
       "tetik": "Takımınız bilgi yarışmasını kazandı. Öğretmen sahneye yalnızca seni çağırıp tebrik ediyor.",
       "secenekler": [
        {
         "m": "Ben bir şey yapmadım ki, ben çıkmayayım.",
         "zon": "az",
         "sonuc": "Sahneye çıkmıyorsun; ne senin ne arkadaşlarının emeği anılıyor.",
         "not": "İbre sola kaydı: kendini küçülttükçe hem senin hem arkadaşlarının emeği görünmez oluyor.",
         "ses": "s1az"
        },
        {
         "m": "Evet, ben olmasam kazanamazdık!",
         "zon": "fazla",
         "sonuc": "Alkış yükseliyor ama arkadaşların sessizleşiyor; takım bir yandan kazanıp bir yandan kaybediyor.",
         "not": "İbre sağa kaydı: payı kendine yazınca birlikte kazanma duygusu zayıflıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Teşekkürler! Hepimizin emeği var; arkadaşlarımı da yanıma alabilir miyim?",
         "zon": "orta",
         "sonuc": "Alkış herkese gidiyor. Sen de payını saklamamış oldun.",
         "not": "İbre ortada: hem kendi payını hem arkadaşlarının payını görünür kıldın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "soru",
       "baslik": "Çözemeyen arkadaşın",
       "tetik": "Sınıfta bir arkadaşının çözemediği soruyu sen çözdün. Arkadaşın “Nasıl yaptın?” diye soruyor.",
       "secenekler": [
        {
         "m": "Bende bir şey yok ki, anlatmaya değmez; sen öğretmene sor.",
         "zon": "az",
         "sonuc": "Öğrendiğin yol sende kalıyor; arkadaşın sorusunun cevabını bulamıyor.",
         "not": "İbre sola kaydı: bilgin saklı kalınca kimse ondan yararlanamıyor.",
         "ses": "s2az"
        },
        {
         "m": "Çok kolay, bunu bilmeyen mi var?",
         "zon": "fazla",
         "sonuc": "Arkadaşın küçük düştüğünü düşünebilir; bir dahaki sefere sormaya çekinebilir.",
         "not": "İbre sağa kaydı: kendini yüksek tutmak karşındakini küçültüyor.",
         "ses": "s2fa"
        },
        {
         "m": "Önce şuna baktım, sonra şöyle düşündüm. İstersen birlikte deneyelim.",
         "zon": "orta",
         "sonuc": "Arkadaşın rahatlıyor; ikiniz de öğreniyorsunuz.",
         "not": "İbre ortada: bilgini paylaşırken karşındakini küçültmedin.",
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
     "tur": "ibrePay",
     "id": "pay",
     "baslik": "Payı kime yazıyorsun?",
     "tetik": "Takımınız turnuvayı kazandı! Alkış tam 100 parça. Sen ve üç arkadaşın arasında paylaştır; kaydırıcıları ya da + − düğmelerini kullan.",
     "kisiler": [
      "Sen",
      "Arkadaş 1",
      "Arkadaş 2",
      "Arkadaş 3"
     ],
     "ses": {
      "acilis": "v1",
      "yonerge": "v2",
      "az": "v3",
      "orta": "v4",
      "fazla": "v5",
      "arkadas": "v6",
      "yeniden": "v7"
     },
     "huy": "Tevâzu",
     "uclar": {
      "az": "Tezellül",
      "orta": "Tevâzu",
      "fazla": "Kibr"
     },
     "yesil": 0.24
    },
    {
     "id": "uc-bul",
     "tur": "siniflandir",
     "baslik": "Hangi uca yakın?",
     "yonerge": "Kartı ibrenin uygun ucuna taşı. Emin değilsen karta bak: ipucu var.",
     "alanlar": [
      {
       "id": "az",
       "ad": "Az · Tezellül",
       "aciklama": "Kendini hiç saymak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tevâzu",
       "aciklama": "Payını doğru görmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Kibr",
       "aciklama": "Payı kendine yazmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Başarısı olsa bile “ben bir işe yaramam” deyip her teşekkürü geri çevirir.",
       "alan": "az",
       "ipucu": "Kendi emeğini hiç saymıyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı anlatırken “ben daha iyisini yaptım” diye lafı keser.",
       "alan": "fazla",
       "ipucu": "Konuyu kendine çekiyor."
      },
      {
       "id": "k3",
       "metin": "Başarıyı anlatırken arkadaşlarının payını da sayar.",
       "alan": "orta",
       "ipucu": "Payını da, başkalarının payını da görüyor."
      },
      {
       "id": "k4",
       "metin": "Yaptığı güzel işi bile saklar; “sayılmaz” der.",
       "alan": "az",
       "ipucu": "Kendi emeğini yok sayıyor."
      },
      {
       "id": "k5",
       "metin": "“Bu işi ben taşıdım, siz sadece izlediniz.” der.",
       "alan": "fazla",
       "ipucu": "Başkalarının emeğini siliyor."
      },
      {
       "id": "k6",
       "metin": "Hata yapınca da başarı kazanınca da payını aynı sakinlikle söyler.",
       "alan": "orta",
       "ipucu": "Payını olduğu gibi söylüyor."
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
        "Başarımı anlatırken",
        "Övgü alırken",
        "Bir işi paylaşırken",
        "Hata yapınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Başarımı anlatırken bir arkadaşımın payını da sayacağım",
        "Övgü alınca “teşekkür ederim” deyip payımı söyleyeceğim",
        "Bir işi paylaşırken herkesin katkısını yazacağım"
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
       "baslik": "Tevâzu",
       "metin": "payını doğru görmek",
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
   "sure": 2.033,
   "m": "Benim tevazum bile gösterişli!",
   "k": [
    [
     "Benim",
     0.03,
     0.381
    ],
    [
     "tevazum",
     0.381,
     0.909
    ],
    [
     "bile",
     0.909,
     1.26
    ],
    [
     "gösterişli!",
     1.26,
     1.963
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.887,
   "m": "Birçok güzel huy bir ibre gibidir. Tevâzu, başarıdaki payımı nasıl gördüğümü ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.436
    ],
    [
     "güzel",
     0.436,
     0.843
    ],
    [
     "huy",
     0.843,
     1.046
    ],
    [
     "bir",
     1.046,
     1.249
    ],
    [
     "ibre",
     1.249,
     1.655
    ],
    [
     "gibidir.",
     1.655,
     2.265
    ],
    [
     "Tevâzu,",
     2.685,
     3.435
    ],
    [
     "başarıdaki",
     3.55,
     4.573
    ],
    [
     "payımı",
     4.573,
     5.188
    ],
    [
     "nasıl",
     5.188,
     5.597
    ],
    [
     "gördüğümü",
     5.597,
     6.416
    ],
    [
     "ölçer.",
     6.416,
     6.825
    ],
    [
     "İbre",
     7.075,
     7.523
    ],
    [
     "üç",
     7.523,
     7.747
    ],
    [
     "yerde",
     7.747,
     8.194
    ],
    [
     "durabilir:",
     8.194,
     9.09
    ],
    [
     "az,",
     9.4,
     9.553
    ],
    [
     "kararında,",
     9.553,
     10.165
    ],
    [
     "fazla.",
     10.485,
     10.817
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
   "sure": 6.622,
   "m": "Sol uçta Tezellül. Benim yaptığım söylemeye değmez. Başarısı olsa bile teşekkürü geri çevirir.",
   "k": [
    [
     "Sol",
     0.03,
     0.247
    ],
    [
     "uçta",
     0.247,
     0.682
    ],
    [
     "Tezellül.",
     0.682,
     1.335
    ],
    [
     "Benim",
     1.425,
     1.833
    ],
    [
     "yaptığım",
     1.833,
     2.445
    ],
    [
     "söylemeye",
     2.445,
     3.262
    ],
    [
     "değmez.",
     3.262,
     3.67
    ],
    [
     "Başarısı",
     3.915,
     4.535
    ],
    [
     "olsa",
     4.535,
     4.846
    ],
    [
     "bile",
     4.846,
     5.156
    ],
    [
     "teşekkürü",
     5.156,
     5.776
    ],
    [
     "geri",
     5.776,
     6.086
    ],
    [
     "çevirir.",
     6.086,
     6.552
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.289,
   "m": "Sonra ne olur? Arkadaşları onun emeğini göremez olur. Kendi emeği de yok sayılmış olur.",
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
     "Arkadaşları",
     0.98,
     1.627
    ],
    [
     "onun",
     1.627,
     1.886
    ],
    [
     "emeğini",
     1.886,
     2.403
    ],
    [
     "göremez",
     2.403,
     2.791
    ],
    [
     "olur.",
     2.791,
     3.05
    ],
    [
     "Kendi",
     3.43,
     3.728
    ],
    [
     "emeği",
     3.728,
     4.175
    ],
    [
     "de",
     4.175,
     4.324
    ],
    [
     "yok",
     4.324,
     4.473
    ],
    [
     "sayılmış",
     4.473,
     4.921
    ],
    [
     "olur.",
     4.921,
     5.219
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
   "sure": 5.42,
   "m": "Sağ uçta Kibr. Bu işi bir ben yapabilirdim! Başkasının emeği görünmez olur.",
   "k": [
    [
     "Sağ",
     0.03,
     0.199
    ],
    [
     "uçta",
     0.199,
     0.536
    ],
    [
     "Kibr.",
     0.536,
     0.705
    ],
    [
     "Bu",
     0.91,
     1.137
    ],
    [
     "işi",
     1.137,
     1.592
    ],
    [
     "bir",
     1.592,
     1.82
    ],
    [
     "ben",
     1.82,
     2.047
    ],
    [
     "yapabilirdim!",
     2.047,
     3.185
    ],
    [
     "Başkasının",
     3.53,
     4.137
    ],
    [
     "emeği",
     4.137,
     4.592
    ],
    [
     "görünmez",
     4.592,
     5.047
    ],
    [
     "olur.",
     5.047,
     5.35
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.196,
   "m": "Sonra ne olur? Teşekkür sırası kimseye gelmez. Bir sonraki işte arkadaşların gönülden katılmayabilir.",
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
     "Teşekkür",
     1.045,
     1.563
    ],
    [
     "sırası",
     1.563,
     2.081
    ],
    [
     "kimseye",
     2.081,
     2.6
    ],
    [
     "gelmez.",
     2.6,
     2.945
    ],
    [
     "Bir",
     3.225,
     3.37
    ],
    [
     "sonraki",
     3.37,
     3.805
    ],
    [
     "işte",
     3.805,
     4.095
    ],
    [
     "arkadaşların",
     4.095,
     4.821
    ],
    [
     "gönülden",
     4.821,
     5.256
    ],
    [
     "katılmayabilir.",
     5.256,
     6.126
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
   "sure": 5.632,
   "m": "Tam kararında Tevâzu. Hepimizin emeği var. Payını bilir, teşekkür eder, paylaşır.",
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
     "Tevâzu.",
     0.88,
     1.39
    ],
    [
     "Hepimizin",
     1.905,
     2.4
    ],
    [
     "emeği",
     2.4,
     2.771
    ],
    [
     "var.",
     2.771,
     2.895
    ],
    [
     "Payını",
     3.185,
     3.626
    ],
    [
     "bilir,",
     3.626,
     3.92
    ],
    [
     "teşekkür",
     4.05,
     4.551
    ],
    [
     "eder,",
     4.551,
     4.885
    ],
    [
     "paylaşır.",
     5.05,
     5.562
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.579,
   "m": "Sonra ne olur? Payını olduğu gibi söyler. Bir sonraki işte arkadaşların gönülden katılabilir.",
   "k": [
    [
     "Sonra",
     0.03,
     0.302
    ],
    [
     "ne",
     0.302,
     0.438
    ],
    [
     "olur?",
     0.438,
     0.71
    ],
    [
     "Payını",
     1.185,
     1.596
    ],
    [
     "olduğu",
     1.596,
     2.007
    ],
    [
     "gibi",
     2.007,
     2.281
    ],
    [
     "söyler.",
     2.281,
     2.555
    ],
    [
     "Bir",
     2.885,
     3.023
    ],
    [
     "sonraki",
     3.023,
     3.437
    ],
    [
     "işte",
     3.437,
     3.714
    ],
    [
     "arkadaşların",
     3.714,
     4.404
    ],
    [
     "gönülden",
     4.404,
     4.819
    ],
    [
     "katılabilir.",
     4.819,
     5.509
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
   "sure": 6.66,
   "m": "Takımınız bilgi yarışmasını kazandı. Öğretmen sahneye yalnızca seni çağırıp tebrik ediyor. Ne yaparsın?",
   "k": [
    [
     "Takımınız",
     0.03,
     0.603
    ],
    [
     "bilgi",
     0.603,
     0.889
    ],
    [
     "yarışmasını",
     0.889,
     1.605
    ],
    [
     "kazandı.",
     1.605,
     2.035
    ],
    [
     "Öğretmen",
     2.425,
     2.918
    ],
    [
     "sahneye",
     2.918,
     3.41
    ],
    [
     "yalnızca",
     3.41,
     3.903
    ],
    [
     "seni",
     3.903,
     4.231
    ],
    [
     "çağırıp",
     4.231,
     4.724
    ],
    [
     "tebrik",
     4.724,
     5.052
    ],
    [
     "ediyor.",
     5.052,
     5.545
    ],
    [
     "Ne",
     5.94,
     6.103
    ],
    [
     "yaparsın?",
     6.103,
     6.59
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.453,
   "m": "Sahneye çıkmıyorsun; ne senin ne arkadaşlarının emeği anılıyor.",
   "k": [
    [
     "Sahneye",
     0.03,
     0.439
    ],
    [
     "çıkmıyorsun;",
     0.439,
     0.985
    ],
    [
     "ne",
     1.335,
     1.514
    ],
    [
     "senin",
     1.514,
     1.873
    ],
    [
     "ne",
     1.873,
     2.052
    ],
    [
     "arkadaşlarının",
     2.052,
     3.128
    ],
    [
     "emeği",
     3.128,
     3.666
    ],
    [
     "anılıyor.",
     3.666,
     4.383
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 5.237,
   "m": "Alkış yükseliyor ama arkadaşların sessizleşiyor. Takım bir yandan kazanıp bir yandan kaybediyor.",
   "k": [
    [
     "Alkış",
     0.03,
     0.34
    ],
    [
     "yükseliyor",
     0.34,
     0.96
    ],
    [
     "ama",
     0.96,
     1.27
    ],
    [
     "arkadaşların",
     1.27,
     2.045
    ],
    [
     "sessizleşiyor.",
     2.045,
     2.82
    ],
    [
     "Takım",
     2.965,
     3.259
    ],
    [
     "bir",
     3.259,
     3.405
    ],
    [
     "yandan",
     3.405,
     3.699
    ],
    [
     "kazanıp",
     3.699,
     4.139
    ],
    [
     "bir",
     4.139,
     4.286
    ],
    [
     "yandan",
     4.286,
     4.58
    ],
    [
     "kaybediyor.",
     4.58,
     5.167
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.023,
   "m": "Alkış herkese gidiyor. Sen de payını saklamamış oldun.",
   "k": [
    [
     "Alkış",
     0.03,
     0.348
    ],
    [
     "herkese",
     0.348,
     0.824
    ],
    [
     "gidiyor.",
     0.824,
     1.3
    ],
    [
     "Sen",
     1.45,
     1.587
    ],
    [
     "de",
     1.587,
     1.723
    ],
    [
     "payını",
     1.723,
     2.133
    ],
    [
     "saklamamış",
     2.133,
     2.679
    ],
    [
     "oldun.",
     2.679,
     2.953
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.229,
   "m": "Sınıfta bir arkadaşının çözemediği soruyu sen çözdün. Arkadaşın, nasıl yaptın, diye soruyor.",
   "k": [
    [
     "Sınıfta",
     0.03,
     0.43
    ],
    [
     "bir",
     0.43,
     0.563
    ],
    [
     "arkadaşının",
     0.563,
     1.229
    ],
    [
     "çözemediği",
     1.229,
     1.895
    ],
    [
     "soruyu",
     1.895,
     2.295
    ],
    [
     "sen",
     2.295,
     2.428
    ],
    [
     "çözdün.",
     2.428,
     2.695
    ],
    [
     "Arkadaşın,",
     3.11,
     3.575
    ],
    [
     "nasıl",
     3.85,
     4.022
    ],
    [
     "yaptın,",
     4.022,
     4.195
    ],
    [
     "diye",
     4.28,
     4.632
    ],
    [
     "soruyor.",
     4.632,
     5.159
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 4.813,
   "m": "Öğrendiğin yol sende kalıyor; arkadaşın sorusunun cevabını bulamıyor.",
   "k": [
    [
     "Öğrendiğin",
     0.03,
     0.694
    ],
    [
     "yol",
     0.694,
     0.86
    ],
    [
     "sende",
     0.86,
     1.192
    ],
    [
     "kalıyor;",
     1.192,
     1.69
    ],
    [
     "arkadaşın",
     1.97,
     2.663
    ],
    [
     "sorusunun",
     2.663,
     3.357
    ],
    [
     "cevabını",
     3.357,
     4.05
    ],
    [
     "bulamıyor.",
     4.05,
     4.743
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.129,
   "m": "Arkadaşın küçük düştüğünü düşünebilir. Bir dahaki sefere sormaya çekinebilir.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.514
    ],
    [
     "küçük",
     0.514,
     0.756
    ],
    [
     "düştüğünü",
     0.756,
     1.24
    ],
    [
     "düşünebilir.",
     1.24,
     1.845
    ],
    [
     "Bir",
     2.315,
     2.431
    ],
    [
     "dahaki",
     2.431,
     2.78
    ],
    [
     "sefere",
     2.78,
     3.129
    ],
    [
     "sormaya",
     3.129,
     3.478
    ],
    [
     "çekinebilir.",
     3.478,
     4.059
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.167,
   "m": "Arkadaşın rahatlıyor. İkiniz de öğreniyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.665
    ],
    [
     "rahatlıyor.",
     0.665,
     1.3
    ],
    [
     "İkiniz",
     1.64,
     2.077
    ],
    [
     "de",
     2.077,
     2.223
    ],
    [
     "öğreniyorsunuz.",
     2.223,
     3.097
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
   "sure": 9.221,
   "m": "Bu cümle bilerek çift anlamlı. Bir okumada kişi payı kendine yazıyor: sağ uca yakın. Başka okumada kendine bakıp espri yapıyor: orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.177
    ],
    [
     "cümle",
     0.177,
     0.47
    ],
    [
     "bilerek",
     0.47,
     0.909
    ],
    [
     "çift",
     0.909,
     1.056
    ],
    [
     "anlamlı.",
     1.056,
     1.495
    ],
    [
     "Bir",
     1.9,
     2.04
    ],
    [
     "okumada",
     2.04,
     2.6
    ],
    [
     "kişi",
     2.6,
     2.88
    ],
    [
     "payı",
     2.88,
     3.16
    ],
    [
     "kendine",
     3.16,
     3.58
    ],
    [
     "yazıyor:",
     3.58,
     4.0
    ],
    [
     "sağ",
     4.3,
     4.455
    ],
    [
     "uca",
     4.455,
     4.765
    ],
    [
     "yakın.",
     4.765,
     5.075
    ],
    [
     "Başka",
     5.375,
     5.693
    ],
    [
     "okumada",
     5.693,
     6.329
    ],
    [
     "kendine",
     6.329,
     6.807
    ],
    [
     "bakıp",
     6.807,
     7.125
    ],
    [
     "espri",
     7.125,
     7.443
    ],
    [
     "yapıyor:",
     7.443,
     7.92
    ],
    [
     "orta",
     8.385,
     8.64
    ],
    [
     "uca",
     8.64,
     8.896
    ],
    [
     "yakın.",
     8.896,
     9.151
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
  },
  "v1": {
   "d": "ses/v1.m4a",
   "sure": 6.496,
   "m": "Takımınız turnuvayı kazandı! Salondaki alkış tam yüz parça; bu alkışı kimlere yazarsın?",
   "k": [
    [
     "Takımınız",
     0.03,
     0.714
    ],
    [
     "turnuvayı",
     0.714,
     1.397
    ],
    [
     "kazandı!",
     1.397,
     1.91
    ],
    [
     "Salondaki",
     2.65,
     3.46
    ],
    [
     "alkış",
     3.46,
     3.865
    ],
    [
     "tam",
     3.865,
     4.067
    ],
    [
     "yüz",
     4.067,
     4.27
    ],
    [
     "parça;",
     4.27,
     4.675
    ],
    [
     "bu",
     5.135,
     5.264
    ],
    [
     "alkışı",
     5.264,
     5.651
    ],
    [
     "kimlere",
     5.651,
     6.039
    ],
    [
     "yazarsın?",
     6.039,
     6.426
    ]
   ]
  },
  "v2": {
   "d": "ses/v2.m4a",
   "sure": 6.171,
   "m": "Dört kişi var: sen ve üç arkadaşın. Kaydırıcılarla payları dağıt; toplam hep yüz kalır.",
   "k": [
    [
     "Dört",
     0.03,
     0.194
    ],
    [
     "kişi",
     0.194,
     0.521
    ],
    [
     "var:",
     0.521,
     0.685
    ],
    [
     "sen",
     1.095,
     1.291
    ],
    [
     "ve",
     1.291,
     1.486
    ],
    [
     "üç",
     1.486,
     1.682
    ],
    [
     "arkadaşın.",
     1.682,
     2.465
    ],
    [
     "Kaydırıcılarla",
     2.8,
     3.662
    ],
    [
     "payları",
     3.662,
     4.093
    ],
    [
     "dağıt;",
     4.093,
     4.38
    ],
    [
     "toplam",
     4.575,
     5.084
    ],
    [
     "hep",
     5.084,
     5.338
    ],
    [
     "yüz",
     5.338,
     5.593
    ],
    [
     "kalır.",
     5.593,
     6.101
    ]
   ]
  },
  "v3": {
   "d": "ses/v3.m4a",
   "sure": 6.999,
   "m": "Kendine çok az pay yazdın; ibre sola, tezellüle kaydı. Senin emeğin de bu kazanmanın içinde.",
   "k": [
    [
     "Kendine",
     0.03,
     0.534
    ],
    [
     "çok",
     0.534,
     0.703
    ],
    [
     "az",
     0.703,
     0.871
    ],
    [
     "pay",
     0.871,
     1.039
    ],
    [
     "yazdın;",
     1.039,
     1.375
    ],
    [
     "ibre",
     1.91,
     2.305
    ],
    [
     "sola,",
     2.305,
     2.7
    ],
    [
     "tezellüle",
     3.0,
     3.623
    ],
    [
     "kaydı.",
     3.623,
     3.935
    ],
    [
     "Senin",
     4.52,
     4.864
    ],
    [
     "emeğin",
     4.864,
     5.38
    ],
    [
     "de",
     5.38,
     5.553
    ],
    [
     "bu",
     5.553,
     5.725
    ],
    [
     "kazanmanın",
     5.725,
     6.413
    ],
    [
     "içinde.",
     6.413,
     6.929
    ]
   ]
  },
  "v4": {
   "d": "ses/v4.m4a",
   "sure": 6.811,
   "m": "Payların dengeli; ibre ortada, tevâzuda. Kendi emeğini de, arkadaşlarının emeğini de görüyorsun.",
   "k": [
    [
     "Payların",
     0.03,
     0.442
    ],
    [
     "dengeli;",
     0.442,
     0.855
    ],
    [
     "ibre",
     1.295,
     1.613
    ],
    [
     "ortada,",
     1.613,
     2.09
    ],
    [
     "tevâzuda.",
     2.365,
     2.935
    ],
    [
     "Kendi",
     3.26,
     3.591
    ],
    [
     "emeğini",
     3.591,
     4.254
    ],
    [
     "de,",
     4.254,
     4.42
    ],
    [
     "arkadaşlarının",
     4.64,
     5.48
    ],
    [
     "emeğini",
     5.48,
     6.04
    ],
    [
     "de",
     6.04,
     6.18
    ],
    [
     "görüyorsun.",
     6.18,
     6.741
    ]
   ]
  },
  "v5": {
   "d": "ses/v5.m4a",
   "sure": 7.065,
   "m": "Alkışın çoğunu kendine yazdın; ibre sağa, kibre kaydı. Arkadaşların da bu kazanmak için çok uğraştı.",
   "k": [
    [
     "Alkışın",
     0.03,
     0.506
    ],
    [
     "çoğunu",
     0.506,
     0.982
    ],
    [
     "kendine",
     0.982,
     1.458
    ],
    [
     "yazdın;",
     1.458,
     1.775
    ],
    [
     "ibre",
     2.125,
     2.505
    ],
    [
     "sağa,",
     2.505,
     2.885
    ],
    [
     "kibre",
     3.175,
     3.56
    ],
    [
     "kaydı.",
     3.56,
     3.945
    ],
    [
     "Arkadaşların",
     4.315,
     5.152
    ],
    [
     "da",
     5.152,
     5.32
    ],
    [
     "bu",
     5.32,
     5.487
    ],
    [
     "kazanmak",
     5.487,
     5.99
    ],
    [
     "için",
     5.99,
     6.325
    ],
    [
     "çok",
     6.325,
     6.492
    ],
    [
     "uğraştı.",
     6.492,
     6.995
    ]
   ]
  },
  "v6": {
   "d": "ses/v6.m4a",
   "sure": 4.728,
   "m": "Bir arkadaşının payı çok küçük kaldı. Onun emeği de görünüyor mu, bir bak.",
   "k": [
    [
     "Bir",
     0.03,
     0.195
    ],
    [
     "arkadaşının",
     0.195,
     1.018
    ],
    [
     "payı",
     1.018,
     1.347
    ],
    [
     "çok",
     1.347,
     1.512
    ],
    [
     "küçük",
     1.512,
     1.841
    ],
    [
     "kaldı.",
     1.841,
     2.17
    ],
    [
     "Onun",
     2.745,
     2.996
    ],
    [
     "emeği",
     2.996,
     3.372
    ],
    [
     "de",
     3.372,
     3.498
    ],
    [
     "görünüyor",
     3.498,
     4.0
    ],
    [
     "mu,",
     4.0,
     4.125
    ],
    [
     "bir",
     4.235,
     4.446
    ],
    [
     "bak.",
     4.446,
     4.658
    ]
   ]
  },
  "v7": {
   "d": "ses/v7.m4a",
   "sure": 6.521,
   "m": "İstersen payları yeniden dağıt. İbre bir karne değil; alkışı paylaşırken kendimize baktığımız bir aynadır.",
   "k": [
    [
     "İstersen",
     0.03,
     0.451
    ],
    [
     "payları",
     0.451,
     0.873
    ],
    [
     "yeniden",
     0.873,
     1.294
    ],
    [
     "dağıt.",
     1.294,
     1.575
    ],
    [
     "İbre",
     1.95,
     2.246
    ],
    [
     "bir",
     2.246,
     2.394
    ],
    [
     "karne",
     2.394,
     2.689
    ],
    [
     "değil;",
     2.689,
     2.985
    ],
    [
     "alkışı",
     3.265,
     3.768
    ],
    [
     "paylaşırken",
     3.768,
     4.439
    ],
    [
     "kendimize",
     4.439,
     5.11
    ],
    [
     "baktığımız",
     5.11,
     5.78
    ],
    [
     "bir",
     5.78,
     5.948
    ],
    [
     "aynadır.",
     5.948,
     6.451
    ]
   ]
  }
 }
}
);
