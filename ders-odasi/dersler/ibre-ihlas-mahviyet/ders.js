/* İbremetre · İhlâs — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Hevessizlik · İhlâs · Gösteriş). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-ihlas-mahviyet",
 "ad": "İhlâs (Hevessizlik · Gösteriş): İbren Nerede?",
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
     "huy": "İhlâs",
     "huyAnahtar": "İhlâs",
     "olculen": "İyiliği kimin için yaptığım",
     "kanca": "Ben yaptım ama söylemeyin.",
     "uclar": {
      "az": "Hevessizlik",
      "orta": "İhlâs",
      "fazla": "Gösteriş"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "İhlâs",
     "cumle": "Ben yaptım ama söylemeyin.",
     "uclar": {
      "az": "Hevessizlik",
      "orta": "İhlâs",
      "fazla": "Gösteriş"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi iyiliğin duyulmasını istemiyor, gizli kalsın diyor: orta uca yakın. Başka okumada söylemeyin derken aslında merak edilip övülmeyi umuyor: sağ uca (Gösteriş) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o iyiliği hangi niyetle yaptığımıza bakar. İhlâs, iyiliği yalnız Allahü teâlâ için yapmaktır. Bu ibre ölçekten çok yönü gösterir: bir uçta iyilik yapmaya hevesini kaybedip geri çekilmek (kaynaklarda mahviyet), öbür uçta alkış ve övgü beklemek (kaynaklarda övgü sevgisi) var.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "İhlâs",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Hevessizlik",
      "orta": "İhlâs",
      "fazla": "Gösteriş"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "İyilikten geri çekilmek neye benziyor?",
       "ad": "Hevessizlik",
       "soz": "Ne yapsam boş, hiç iyilik yapasım yok.",
       "eylem": "egil",
       "zincir": [
        "İyilik yapma isteği iyice söner.",
        "Yardıma ihtiyacı olan arkadaşı yalnız kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yapsam da yapmasam da değişmez; hiç havam yok.",
          "dogru": true,
          "not": "Hevessizlik, iyilik yapmaya isteğin kalmayıp geri çekilmektir. Kendini böyle hissedince güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Karşılık beklemeden yaparım; Allahü teâlâ için olsun.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ihlâsın sesi."
         },
         {
          "m": "Yaptığımı herkes görsün, alkışlasın!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: gösterişin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hevessizlik",
        "soz": "Ne"
       },
       "zincirAnahtar": [
        "İyilik",
        "Yardıma"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Alkış bekleyen kişi neyi kaybeder?",
       "ad": "Gösteriş",
       "soz": "Alkış olmadan ben bir şey yapmam; hepiniz görün!",
       "eylem": "isaret",
       "zincir": [
        "Övgü gelmeyince iyilik yapmaktan sıkılır.",
        "Yaptığı güzel işin tadı da kaybolur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Biri görmezse boşa gitmiş olur; herkes bilsin!",
          "dogru": true,
          "not": "Gösteriş, iyiliği alkış ve övgü için yapmaktır (kaynaklarda övgü sevgisi). İş güzel olsa da niyet insanlara yönelmiş olur."
         },
         {
          "m": "Yapsam da yapmasam da değişmez; hiç havam yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: hevessizliğin sesi."
         },
         {
          "m": "Karşılık beklemeden yaparım; Allahü teâlâ için olsun.",
          "dogru": false,
          "not": "Bu orta ucun sesi: ihlâsın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Gösteriş",
        "soz": "Alkış"
       },
       "zincirAnahtar": [
        "Övgü",
        "Yaptığı"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "İhlâs",
       "soz": "Karşılık beklemeden yaptım; kimse bilmese de olur.",
       "eylem": "yuru",
       "zincir": [
        "Gönlü hafifler, işi huzurla bırakır.",
        "Başkalarına da sessiz iyilik örnek olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Karşılık beklemeden yaparım; Allahü teâlâ için olsun.",
          "dogru": true,
          "not": "İhlâs, iyiliği yalnız Allahü teâlâ için yapmaktır. Gören olsa da olmasa da aynı kalır."
         },
         {
          "m": "Yapsam da yapmasam da değişmez; hiç havam yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: hevessizliğin sesi."
         },
         {
          "m": "Yaptığımı herkes görsün, alkışlasın!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: gösterişin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "İhlâs",
        "soz": "Karşılık"
       },
       "zincirAnahtar": [
        "Gönlü",
        "Başkalarına"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "İhlâs",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Hevessizlik",
      "orta": "İhlâs",
      "fazla": "Gösteriş"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "odev",
       "baslik": "Ödev yardımı",
       "tetik": "Teneffüste arkadaşın ödevde takıldı ve senden yardım istiyor. Sen o konuyu iyi biliyorsun; sınıfta birkaç kişi de var.",
       "secenekler": [
        {
         "m": "Şimdi hiç havamda değilim; yardım etmem, kendisi çözsün.",
         "zon": "az",
         "sonuc": "Arkadaşın çaresiz kalıyor; sen de yardım etmenin sevincini kaçırıyorsun.",
         "not": "İbre sola kaydı: iyiliğe hevessiz kalmak, güzel işin önünü kapatır.",
         "ses": "s1az"
        },
        {
         "m": "Yardım ederim ama önce herkes bakıp beni alkışlasın!",
         "zon": "fazla",
         "sonuc": "Yardım ediliyor ama gönlün alkışlarda kalıyor; yardımın tadı kaçıyor.",
         "not": "İbre sağa kaydı: iyilik güzel, fakat niyet alkışa dönmüş.",
         "ses": "s1fa"
        },
        {
         "m": "Yardım ederim; karşılık beklemem, kimse bilmese de olur.",
         "zon": "orta",
         "sonuc": "Arkadaşın konuyu çözüyor; ikiniz de rahat bir nefes alıyorsunuz.",
         "not": "İbre ortada: iyiliği yalnız Allahü teâlâ için yaptın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "tesekkur",
       "baslik": "Sınıfta teşekkür",
       "tetik": "Birlikte hazırladığınız sunum bitti. Öğretmen sunumu çok beğendi ve sınıf önünde teşekkür ediyor.",
       "secenekler": [
        {
         "m": "Teşekkür kimin umurunda; bir daha böyle işlere katılmam.",
         "zon": "az",
         "sonuc": "Arkadaşların bir sonraki işte sensiz kalıyor; sen de katkı vermenin keyfini kaçırıyorsun.",
         "not": "İbre sola kaydı: iyiliğe hevesi kaybetmek, yeni güzel işlerin kapısını kapatır.",
         "ses": "s2az"
        },
        {
         "m": "Bunu en çok ben hazırladım; herkes bilsin, beni alkışlasın!",
         "zon": "fazla",
         "sonuc": "Alkış geliyor ama arkadaşlarının emeği gölgede kalıyor.",
         "not": "İbre sağa kaydı: alkış beklemek, niyeti insanlara çevirir.",
         "ses": "s2fa"
        },
        {
         "m": "Rica ederim; hepimize hayırlı olsun.",
         "zon": "orta",
         "sonuc": "Teşekkürü sakince alıyorsun; iş de dostluk da güzel kalıyor.",
         "not": "İbre ortada: övgüyü ne aradın ne de reddettin, niyetin Allahü teâlâ içindi.",
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
       "ad": "Az · Hevessizlik",
       "aciklama": "Hevesini kaybedip geri çekilmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · İhlâs",
       "aciklama": "Yalnız Allahü teâlâ için yapmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Gösteriş",
       "aciklama": "Alkış ve övgü için yapmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Sınıf etkinliğine yardım teklif edilince “canım istemiyor” der ve geri çekilir.",
       "alan": "az",
       "ipucu": "İyilikten hevesini kaybetmiş."
      },
      {
       "id": "k2",
       "metin": "İyilik yapınca etrafına bakar: “Gören oldu mu?”",
       "alan": "fazla",
       "ipucu": "Övülmeyi bekliyor."
      },
      {
       "id": "k3",
       "metin": "Elinden geleni yapar; teşekkür gelirse sevinir, gelmese de aynı güzellikle sürdürür.",
       "alan": "orta",
       "ipucu": "Allahü teâlâ için yapıyor."
      },
      {
       "id": "k4",
       "metin": "Yardım istenince “hiç havamda değilim” der ve sonraki sefer de uzak durur.",
       "alan": "az",
       "ipucu": "İyilik yapmaya hevesi yok."
      },
      {
       "id": "k5",
       "metin": "Her yardımdan sonra “bak ne yaptım” diye sınıfa duyurur.",
       "alan": "fazla",
       "ipucu": "Alkış istiyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşının eksik defterini sessizce tamamlar, kimseye söylemez.",
       "alan": "orta",
       "ipucu": "Gizli ve samimi iyilik yapıyor."
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
        "Güzel bir iş yapınca",
        "Biri beni övünce",
        "Kimse görmezken",
        "İyiliğimi anlatma isteği gelince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bir iyiliği Allahü teâlâ için sessizce yapacağım",
        "Övgü gelince teşekkür edip yoluma devam edeceğim",
        "Hevesim kaçınca küçük bir iyilikle yeniden başlayacağım"
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
       "baslik": "İhlâs",
       "metin": "yalnız Allahü teâlâ için yapmak",
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
   "sure": 1.854,
   "m": "Ben yaptım ama söylemeyin.",
   "k": [
    [
     "Ben",
     0.03,
     0.225
    ],
    [
     "yaptım",
     0.225,
     0.615
    ],
    [
     "ama",
     0.615,
     1.004
    ],
    [
     "söylemeyin.",
     1.004,
     1.784
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.514,
   "m": "Birçok güzel huy bir ibre gibidir. İhlâs, iyiliği kimin için yaptığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.449
    ],
    [
     "güzel",
     0.449,
     0.868
    ],
    [
     "huy",
     0.868,
     1.078
    ],
    [
     "bir",
     1.078,
     1.287
    ],
    [
     "ibre",
     1.287,
     1.706
    ],
    [
     "gibidir.",
     1.706,
     2.335
    ],
    [
     "İhlâs,",
     3.04,
     3.485
    ],
    [
     "iyiliği",
     3.79,
     4.351
    ],
    [
     "kimin",
     4.351,
     4.632
    ],
    [
     "için",
     4.632,
     4.913
    ],
    [
     "yaptığımı",
     4.913,
     5.474
    ],
    [
     "ölçer.",
     5.474,
     5.755
    ],
    [
     "İbre",
     6.415,
     6.943
    ],
    [
     "üç",
     6.943,
     7.207
    ],
    [
     "yerde",
     7.207,
     7.734
    ],
    [
     "durabilir:",
     7.734,
     8.79
    ],
    [
     "az,",
     9.075,
     9.212
    ],
    [
     "kararında,",
     9.212,
     9.76
    ],
    [
     "fazla.",
     10.09,
     10.444
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
   "sure": 9.253,
   "m": "Sol uçta Hevessizlik. Ne yapsam boş, hiç iyilik yapasım yok. Ödevinde takılan arkadaşı yardım isteyince “şimdi istemiyorum” der.",
   "k": [
    [
     "Sol",
     0.03,
     0.226
    ],
    [
     "uçta",
     0.226,
     0.617
    ],
    [
     "Hevessizlik.",
     0.617,
     1.4
    ],
    [
     "Ne",
     1.49,
     1.506
    ],
    [
     "yapsam",
     1.506,
     1.539
    ],
    [
     "boş,",
     1.539,
     1.555
    ],
    [
     "hiç",
     2.23,
     2.499
    ],
    [
     "iyilik",
     2.499,
     3.308
    ],
    [
     "yapasım",
     3.308,
     4.116
    ],
    [
     "yok.",
     4.116,
     4.385
    ],
    [
     "Ödevinde",
     4.455,
     5.211
    ],
    [
     "takılan",
     5.211,
     5.779
    ],
    [
     "arkadaşı",
     5.779,
     6.535
    ],
    [
     "yardım",
     6.535,
     6.913
    ],
    [
     "isteyince",
     6.913,
     7.67
    ],
    [
     "“şimdi",
     7.67,
     8.048
    ],
    [
     "istemiyorum”",
     8.048,
     8.993
    ],
    [
     "der.",
     8.993,
     9.183
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.824,
   "m": "Sonra ne olur? İyilik yapma isteği iyice söner. Yardıma ihtiyacı olan arkadaşı yalnız kalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.29
    ],
    [
     "ne",
     0.29,
     0.42
    ],
    [
     "olur?",
     0.42,
     0.68
    ],
    [
     "İyilik",
     1.285,
     1.715
    ],
    [
     "yapma",
     1.715,
     2.002
    ],
    [
     "isteği",
     2.002,
     2.433
    ],
    [
     "iyice",
     2.433,
     2.863
    ],
    [
     "söner.",
     2.863,
     3.15
    ],
    [
     "Yardıma",
     3.64,
     4.013
    ],
    [
     "ihtiyacı",
     4.013,
     4.511
    ],
    [
     "olan",
     4.511,
     4.759
    ],
    [
     "arkadaşı",
     4.759,
     5.257
    ],
    [
     "yalnız",
     5.257,
     5.505
    ],
    [
     "kalır.",
     5.505,
     5.754
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
   "sure": 8.235,
   "m": "Sağ uçta Gösteriş. Alkış olmadan ben bir şey yapmam; hepiniz görün! Arkadaşına yardım ettikten sonra herkesin bakıp bakmadığına bakar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.227
    ],
    [
     "uçta",
     0.227,
     0.62
    ],
    [
     "Gösteriş.",
     0.62,
     1.21
    ],
    [
     "Alkış",
     1.745,
     2.038
    ],
    [
     "olmadan",
     2.038,
     2.478
    ],
    [
     "ben",
     2.478,
     2.624
    ],
    [
     "bir",
     2.624,
     2.771
    ],
    [
     "şey",
     2.771,
     2.917
    ],
    [
     "yapmam;",
     2.917,
     3.21
    ],
    [
     "hepiniz",
     3.45,
     3.885
    ],
    [
     "görün!",
     3.885,
     4.175
    ],
    [
     "Arkadaşına",
     4.75,
     5.461
    ],
    [
     "yardım",
     5.461,
     5.746
    ],
    [
     "ettikten",
     5.746,
     6.173
    ],
    [
     "sonra",
     6.173,
     6.457
    ],
    [
     "herkesin",
     6.457,
     6.884
    ],
    [
     "bakıp",
     6.884,
     7.169
    ],
    [
     "bakmadığına",
     7.169,
     7.88
    ],
    [
     "bakar.",
     7.88,
     8.165
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.197,
   "m": "Sonra ne olur? Övgü gelmeyince iyilik yapmaktan sıkılır. Yaptığı güzel işin tadı da kaybolur.",
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
     "Övgü",
     1.195,
     1.54
    ],
    [
     "gelmeyince",
     1.54,
     2.229
    ],
    [
     "iyilik",
     2.229,
     2.746
    ],
    [
     "yapmaktan",
     2.746,
     3.263
    ],
    [
     "sıkılır.",
     3.263,
     3.78
    ],
    [
     "Yaptığı",
     4.05,
     4.529
    ],
    [
     "güzel",
     4.529,
     4.849
    ],
    [
     "işin",
     4.849,
     5.168
    ],
    [
     "tadı",
     5.168,
     5.488
    ],
    [
     "da",
     5.488,
     5.647
    ],
    [
     "kaybolur.",
     5.647,
     6.127
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
   "sure": 8.14,
   "m": "Tam kararında İhlâs. Karşılık beklemeden yaptım; kimse bilmese de olur. Arkadaşına ödevde yardım eder, sonra sessizce kendi işine döner.",
   "k": [
    [
     "Tam",
     0.03,
     0.198
    ],
    [
     "kararında",
     0.198,
     0.869
    ],
    [
     "İhlâs.",
     0.869,
     1.205
    ],
    [
     "Karşılık",
     1.595,
     1.943
    ],
    [
     "beklemeden",
     1.943,
     2.408
    ],
    [
     "yaptım;",
     2.408,
     2.64
    ],
    [
     "kimse",
     2.725,
     3.071
    ],
    [
     "bilmese",
     3.071,
     3.591
    ],
    [
     "de",
     3.591,
     3.764
    ],
    [
     "olur.",
     3.764,
     4.11
    ],
    [
     "Arkadaşına",
     4.685,
     5.283
    ],
    [
     "ödevde",
     5.283,
     5.642
    ],
    [
     "yardım",
     5.642,
     5.881
    ],
    [
     "eder,",
     5.881,
     6.12
    ],
    [
     "sonra",
     6.3,
     6.595
    ],
    [
     "sessizce",
     6.595,
     7.037
    ],
    [
     "kendi",
     7.037,
     7.332
    ],
    [
     "işine",
     7.332,
     7.775
    ],
    [
     "döner.",
     7.775,
     8.07
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.453,
   "m": "Sonra ne olur? Gönlü hafifler, işi huzurla bırakır. Başkalarına da sessiz iyilik örnek olur.",
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
     "Gönlü",
     1.025,
     1.409
    ],
    [
     "hafifler,",
     1.409,
     1.985
    ],
    [
     "işi",
     2.275,
     2.559
    ],
    [
     "huzurla",
     2.559,
     2.984
    ],
    [
     "bırakır.",
     2.984,
     3.41
    ],
    [
     "Başkalarına",
     3.67,
     4.574
    ],
    [
     "da",
     4.574,
     4.755
    ],
    [
     "sessiz",
     4.755,
     5.117
    ],
    [
     "iyilik",
     5.117,
     5.659
    ],
    [
     "örnek",
     5.659,
     6.021
    ],
    [
     "olur.",
     6.021,
     6.383
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
   "sure": 6.684,
   "m": "Teneffüste arkadaşın ödevde takıldı ve senden yardım istiyor. Sen o konuyu iyi biliyorsun; sınıfta birkaç kişi de var. Ne yaparsın?",
   "k": [
    [
     "Teneffüste",
     0.03,
     0.538
    ],
    [
     "arkadaşın",
     0.538,
     1.046
    ],
    [
     "ödevde",
     1.046,
     1.428
    ],
    [
     "takıldı",
     1.428,
     1.809
    ],
    [
     "ve",
     1.809,
     1.936
    ],
    [
     "senden",
     1.936,
     2.19
    ],
    [
     "yardım",
     2.19,
     2.444
    ],
    [
     "istiyor.",
     2.444,
     2.825
    ],
    [
     "Sen",
     3.09,
     3.201
    ],
    [
     "o",
     3.201,
     3.313
    ],
    [
     "konuyu",
     3.313,
     3.647
    ],
    [
     "iyi",
     3.647,
     3.87
    ],
    [
     "biliyorsun;",
     3.87,
     4.315
    ],
    [
     "sınıfta",
     4.615,
     5.005
    ],
    [
     "birkaç",
     5.005,
     5.265
    ],
    [
     "kişi",
     5.265,
     5.525
    ],
    [
     "de",
     5.525,
     5.655
    ],
    [
     "var.",
     5.655,
     5.785
    ],
    [
     "Ne",
     6.095,
     6.225
    ],
    [
     "yaparsın?",
     6.225,
     6.614
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.656,
   "m": "Arkadaşın çaresiz kalıyor; sen de yardım etmenin sevincini kaçırıyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.532
    ],
    [
     "çaresiz",
     0.532,
     0.908
    ],
    [
     "kalıyor;",
     0.908,
     1.285
    ],
    [
     "sen",
     1.615,
     1.738
    ],
    [
     "de",
     1.738,
     1.861
    ],
    [
     "yardım",
     1.861,
     2.108
    ],
    [
     "etmenin",
     2.108,
     2.477
    ],
    [
     "sevincini",
     2.477,
     2.97
    ],
    [
     "kaçırıyorsun.",
     2.97,
     3.586
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 5.21,
   "m": "Yardım ediliyor ama gönlün alkışlarda kalıyor; yardımın tadı kaçıyor.",
   "k": [
    [
     "Yardım",
     0.03,
     0.398
    ],
    [
     "ediliyor",
     0.398,
     1.135
    ],
    [
     "ama",
     1.135,
     1.503
    ],
    [
     "gönlün",
     1.503,
     1.871
    ],
    [
     "alkışlarda",
     1.871,
     2.608
    ],
    [
     "kalıyor;",
     2.608,
     3.16
    ],
    [
     "yardımın",
     3.57,
     4.159
    ],
    [
     "tadı",
     4.159,
     4.552
    ],
    [
     "kaçıyor.",
     4.552,
     5.14
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.204,
   "m": "Arkadaşın konuyu çözüyor; ikiniz de rahat bir nefes alıyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.488
    ],
    [
     "konuyu",
     0.488,
     0.832
    ],
    [
     "çözüyor;",
     0.832,
     1.175
    ],
    [
     "ikiniz",
     1.46,
     1.819
    ],
    [
     "de",
     1.819,
     1.938
    ],
    [
     "rahat",
     1.938,
     2.178
    ],
    [
     "bir",
     2.178,
     2.297
    ],
    [
     "nefes",
     2.297,
     2.536
    ],
    [
     "alıyorsunuz.",
     2.536,
     3.134
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.231,
   "m": "Birlikte hazırladığınız sunum bitti. Öğretmen sunumu çok beğendi ve sınıf önünde teşekkür ediyor. Ne yaparsın?",
   "k": [
    [
     "Birlikte",
     0.03,
     0.368
    ],
    [
     "hazırladığınız",
     0.368,
     1.044
    ],
    [
     "sunum",
     1.044,
     1.27
    ],
    [
     "bitti.",
     1.27,
     1.495
    ],
    [
     "Öğretmen",
     1.89,
     2.343
    ],
    [
     "sunumu",
     2.343,
     2.797
    ],
    [
     "çok",
     2.797,
     2.948
    ],
    [
     "beğendi",
     2.948,
     3.401
    ],
    [
     "ve",
     3.401,
     3.553
    ],
    [
     "sınıf",
     3.553,
     3.855
    ],
    [
     "önünde",
     3.855,
     4.308
    ],
    [
     "teşekkür",
     4.308,
     4.762
    ],
    [
     "ediyor.",
     4.762,
     5.215
    ],
    [
     "Ne",
     5.6,
     5.74
    ],
    [
     "yaparsın?",
     5.74,
     6.161
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 5.075,
   "m": "Arkadaşların bir sonraki işte sensiz kalıyor; sen de katkı vermenin keyfini kaçırıyorsun.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.805
    ],
    [
     "bir",
     0.805,
     0.96
    ],
    [
     "sonraki",
     0.96,
     1.425
    ],
    [
     "işte",
     1.425,
     1.735
    ],
    [
     "sensiz",
     1.735,
     2.045
    ],
    [
     "kalıyor;",
     2.045,
     2.51
    ],
    [
     "sen",
     2.75,
     2.9
    ],
    [
     "de",
     2.9,
     3.051
    ],
    [
     "katkı",
     3.051,
     3.351
    ],
    [
     "vermenin",
     3.351,
     3.802
    ],
    [
     "keyfini",
     3.802,
     4.253
    ],
    [
     "kaçırıyorsun.",
     4.253,
     5.005
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.27,
   "m": "Alkış geliyor ama arkadaşlarının emeği gölgede kalıyor.",
   "k": [
    [
     "Alkış",
     0.03,
     0.318
    ],
    [
     "geliyor",
     0.318,
     0.75
    ],
    [
     "ama",
     0.75,
     1.039
    ],
    [
     "arkadaşlarının",
     1.039,
     1.903
    ],
    [
     "emeği",
     1.903,
     2.335
    ],
    [
     "gölgede",
     2.335,
     2.768
    ],
    [
     "kalıyor.",
     2.768,
     3.2
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.818,
   "m": "Teşekkürü sakince alıyorsun; iş de dostluk da güzel kalıyor.",
   "k": [
    [
     "Teşekkürü",
     0.03,
     0.79
    ],
    [
     "sakince",
     0.79,
     1.36
    ],
    [
     "alıyorsun;",
     1.36,
     2.12
    ],
    [
     "iş",
     2.32,
     2.463
    ],
    [
     "de",
     2.463,
     2.606
    ],
    [
     "dostluk",
     2.606,
     2.891
    ],
    [
     "da",
     2.891,
     3.034
    ],
    [
     "güzel",
     3.034,
     3.319
    ],
    [
     "kalıyor.",
     3.319,
     3.748
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
   "sure": 9.754,
   "m": "Bu cümle bilerek çift anlamlı. İyiliğin gizli kalmasını isteyen biri söylüyorsa orta uca yakın. Söylemeyin derken övülmeyi uman biri söylüyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.166
    ],
    [
     "cümle",
     0.166,
     0.436
    ],
    [
     "bilerek",
     0.436,
     0.843
    ],
    [
     "çift",
     0.843,
     0.978
    ],
    [
     "anlamlı.",
     0.978,
     1.385
    ],
    [
     "İyiliğin",
     1.87,
     2.416
    ],
    [
     "gizli",
     2.416,
     2.69
    ],
    [
     "kalmasını",
     2.69,
     3.236
    ],
    [
     "isteyen",
     3.236,
     3.646
    ],
    [
     "biri",
     3.646,
     3.919
    ],
    [
     "söylüyorsa",
     3.919,
     4.465
    ],
    [
     "orta",
     4.465,
     4.739
    ],
    [
     "uca",
     4.739,
     5.012
    ],
    [
     "yakın.",
     5.012,
     5.285
    ],
    [
     "Söylemeyin",
     6.015,
     6.653
    ],
    [
     "derken",
     6.653,
     6.972
    ],
    [
     "övülmeyi",
     6.972,
     7.61
    ],
    [
     "uman",
     7.61,
     7.929
    ],
    [
     "biri",
     7.929,
     8.248
    ],
    [
     "söylüyorsa",
     8.248,
     8.886
    ],
    [
     "sağ",
     8.886,
     9.046
    ],
    [
     "uca",
     9.046,
     9.365
    ],
    [
     "yakın.",
     9.365,
     9.684
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
