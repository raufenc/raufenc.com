/* İbremetre · Tahkik — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Taklîd · Tahkik · Şekk). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tahkik",
 "ad": "Tahkik: İbren Nerede?",
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
     "huy": "Tahkik",
     "huyAnahtar": "Tahkik",
     "olculen": "İnancımı anlayarak sağlamlaştırma biçimim",
     "kanca": "Hep soruyorum, emin olmak istiyorum.",
     "uclar": {
      "az": "Taklîd",
      "orta": "Tahkik",
      "fazla": "Şekk"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tahkik",
     "cumle": "Hep soruyorum, emin olmak istiyorum.",
     "uclar": {
      "az": "Taklîd",
      "orta": "Tahkik",
      "fazla": "Şekk"
     },
     "yesil": 0.26,
     "hedefZon": "orta",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi nedenini anlamak için rahatça soru soruyor: orta uca yakın. Başka okumada cevap aldıktan sonra da aynı soruyu tekrar tekrar soruyor ve bir türlü rahatlayamıyor: sağ uca (Şekk) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an inancı nasıl sağlamlaştırdığımıza bakar. Tahkik; bilerek ve anlayarak inanmaktır. Soru sormak güzeldir; nedenini anlamak bilgiyi sağlamlaştırır. Aklını çok meşgul eden sorular olursa bu bir kusur değildir; güvendiğin bir yetişkinle konuş. Bu ibre ölçekten çok yönü gösterir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tahkik",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Taklîd",
      "orta": "Tahkik",
      "fazla": "Şekk"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Anlamadan kabul etmek neye benziyor?",
       "ad": "Taklîd",
       "soz": "Ailem öyle dedi, ben de öyle bilirim.",
       "eylem": "yaslan",
       "zincir": [
        "Neden öyle olduğunu anlamaz.",
        "Biri soru sorunca ne diyeceğini bilemez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ailem öyle dediyse doğrudur; sormama gerek yok.",
          "dogru": true,
          "not": "Taklîd, anlamadan öylece kabul etmektir. Büyüklerden öğrenmek güzeldir; sorup anlamak bilgiyi daha sağlam yapar. Sorular imana zarar vermez; anlamak onu güçlendirir."
         },
         {
          "m": "Bunu merak ediyorum; sorup anlayarak öğreneyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tahkikin sesi."
         },
         {
          "m": "Cevabı duydum ama bir daha sorayım, emin olamadım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: şekkin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Taklîd",
        "soz": "Ailem"
       },
       "zincirAnahtar": [
        "Neden",
        "Biri"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Cevaba güvenememek neye benziyor?",
       "ad": "Şekk",
       "soz": "Cevabı duydum ama bir daha sorayım.",
       "eylem": "dusun",
       "zincir": [
        "Aynı soru her seferinde yeniden sorulur.",
        "Böyle zamanlarda güvendiği bir yetişkinle konuşmak iyi gelir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Cevabı duydum ama bir daha sorayım, emin olamadım.",
          "dogru": true,
          "not": "Şekk, cevap alsa da karar verememektir. Soru sormak güzeldir; aklına takılanlar durmuyorsa bu bir kusur değildir: güvendiğin bir yetişkinle konuşmak iyi gelir."
         },
         {
          "m": "Ailem öyle dediyse doğrudur; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: taklîdin sesi."
         },
         {
          "m": "Bunu merak ediyorum; sorup anlayarak öğreneyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: tahkikin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Şekk",
        "soz": "Cevabı"
       },
       "zincirAnahtar": [
        "Aynı",
        "Böyle"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tahkik",
       "soz": "Bunu anlamak istiyorum; neden böyle?",
       "eylem": "konus",
       "zincir": [
        "Cevabı anlayınca bilgisi sağlamlaşır.",
        "Yeni sorular geldikçe sormaktan çekinmez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bunu merak ediyorum; sorup anlayarak öğreneyim.",
          "dogru": true,
          "not": "Tahkik, bilerek ve anlayarak inanmaktır. Soru sormak güzeldir; nedenini anlamak bilgiyi sağlamlaştırır."
         },
         {
          "m": "Ailem öyle dediyse doğrudur; sormama gerek yok.",
          "dogru": false,
          "not": "Bu sol ucun sesi: taklîdin sesi."
         },
         {
          "m": "Cevabı duydum ama bir daha sorayım, emin olamadım.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: şekkin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Tahkik",
        "soz": "Bunu"
       },
       "zincirAnahtar": [
        "Cevabı",
        "Yeni"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tahkik",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Taklîd",
      "orta": "Tahkik",
      "fazla": "Şekk"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "ders",
       "baslik": "Nedenini sormak",
       "tetik": "Derste inançla ilgili bir konu anlatılıyor. Ailenden duyduğunu hatırlıyorsun ama nedenini bilmiyorsun.",
       "secenekler": [
        {
         "m": "Ailem öyle dedi; nedenini sormama gerek yok.",
         "zon": "az",
         "sonuc": "Konu aklında kalıyor ama biri nedenini sorunca cevap veremiyorsun.",
         "not": "İbre sola kaydı: anlamadan kabul etmek, bilgiyi sağlam yapmıyor.",
         "ses": "s1az"
        },
        {
         "m": "Cevap aldım ama yine de herkese tekrar tekrar sorayım.",
         "zon": "fazla",
         "sonuc": "Cevaplar birikiyor ama içinde bir karar oluşmuyor.",
         "not": "İbre sağa kaydı: aynı soruyu durmadan sormak, cevaba güvenmeyi geciktiriyor.",
         "ses": "s1fa"
        },
        {
         "m": "Nedenini sorarım; anlatılanı kendi cümlemle defterime yazarım.",
         "zon": "orta",
         "sonuc": "Nedenini anlıyorsun; anlattıkların hem açık hem aklında kalıyor.",
         "not": "İbre ortada: sorup anlamak, bilgiyi sağlamlaştırıyor.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "soru",
       "baslik": "Zor bir soru",
       "tetik": "Bir arkadaşın sana inançla ilgili zor bir soru soruyor. Cevabını tam bilmiyorsun.",
       "secenekler": [
        {
         "m": "Bilmem, öyle öğrendim; başka söyleyecek bir şeyim yok.",
         "zon": "az",
         "sonuc": "Soru havada kalıyor; arkadaşın da cevapsız kalıyor.",
         "not": "İbre sola kaydı: anlamadan kabul etmek, sorulara cevap veremiyor.",
         "ses": "s2az"
        },
        {
         "m": "Kim ne cevap verse emin olamam, sormaya devam!",
         "zon": "fazla",
         "sonuc": "Cevaplar birikiyor ama karar vermek zorlaşıyor; sohbet uzuyor.",
         "not": "İbre sağa kaydı: sormak güzel; ama cevaba yerleşmeden durmadan sormak yorabilir.",
         "ses": "s2fa"
        },
        {
         "m": "Tam bilmiyorum ama güzel soru; nedenini birlikte araştıralım.",
         "zon": "orta",
         "sonuc": "İkiniz de merakla araştırıyor ve cevabı birlikte öğreniyorsunuz.",
         "not": "İbre ortada: bilmediğini söylemek ve birlikte anlamaya çalışmak tahkikin yolu.",
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
       "ad": "Az · Taklîd",
       "aciklama": "Anlamadan kabul etmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Tahkik",
       "aciklama": "Sorup anlayarak öğrenmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Şekk",
       "aciklama": "Cevaba güvenememek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "“Büyüklerim öyle dedi” der, nedenini hiç sormaz.",
       "alan": "az",
       "ipucu": "Anlamadan kabul ediyor."
      },
      {
       "id": "k2",
       "metin": "Bir soruya cevap aldıktan sonra yine aynı soruyu tekrar tekrar sorar.",
       "alan": "fazla",
       "ipucu": "Cevaba güvenemiyor."
      },
      {
       "id": "k3",
       "metin": "Nedenini merak eder, rahatça sorar ve cevabı anlamaya çalışır.",
       "alan": "orta",
       "ipucu": "Sorup anlıyor."
      },
      {
       "id": "k4",
       "metin": "Anlamaya çalışmadan sırf “herkes öyle diyor” der.",
       "alan": "az",
       "ipucu": "Anlamaya çalışmıyor."
      },
      {
       "id": "k5",
       "metin": "Bir yetişkine sorsa da içi rahat etmez, soruyu yeniden sormak ister.",
       "alan": "fazla",
       "ipucu": "Rahat edemiyor."
      },
      {
       "id": "k6",
       "metin": "Aklına takılan soruyu not alıp güvendiği bir büyüğe götürür.",
       "alan": "orta",
       "ipucu": "Soruyu doğru yere taşıyor."
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
        "Bir bilgi duyunca",
        "Aklıma bir soru gelince",
        "Büyüklerimden bir şey öğrenirken",
        "Arkadaşım zor bir soru sorunca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Aklıma takılan soruyu not alıp güvendiğim bir hocaya soracağım",
        "Anlamadığım yeri “neden böyle?” diye soracağım",
        "Aklımı çok meşgul eden bir soru olursa güvendiğim bir yetişkinle konuşacağım"
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
       "baslik": "Tahkik",
       "metin": "sorup anlayarak öğrenmek",
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
   "sure": 2.564,
   "m": "Hep soruyorum, emin olmak istiyorum.",
   "k": [
    [
     "Hep",
     0.03,
     0.209
    ],
    [
     "soruyorum,",
     0.209,
     0.925
    ],
    [
     "emin",
     1.16,
     1.494
    ],
    [
     "olmak",
     1.494,
     1.827
    ],
    [
     "istiyorum.",
     1.827,
     2.494
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 10.348,
   "m": "Birçok güzel huy bir ibre gibidir. Tahkik, sorularıma nasıl yaklaştığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.408
    ],
    [
     "güzel",
     0.408,
     0.786
    ],
    [
     "huy",
     0.786,
     0.975
    ],
    [
     "bir",
     0.975,
     1.165
    ],
    [
     "ibre",
     1.165,
     1.543
    ],
    [
     "gibidir.",
     1.543,
     2.11
    ],
    [
     "Tahkik,",
     2.73,
     3.19
    ],
    [
     "sorularıma",
     3.495,
     4.558
    ],
    [
     "nasıl",
     4.558,
     4.982
    ],
    [
     "yaklaştığımı",
     4.982,
     6.045
    ],
    [
     "ölçer.",
     6.045,
     6.47
    ],
    [
     "İbre",
     6.605,
     7.003
    ],
    [
     "üç",
     7.003,
     7.202
    ],
    [
     "yerde",
     7.202,
     7.599
    ],
    [
     "durabilir:",
     7.599,
     8.395
    ],
    [
     "az,",
     8.805,
     9.455
    ],
    [
     "kararında,",
     9.87,
     10.142
    ],
    [
     "fazla.",
     10.142,
     10.278
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
   "sure": 6.039,
   "m": "Sol uçta Taklîd. Ailem öyle dedi, ben de öyle bilirim. Neden öyle olduğunu merak edip sormaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.166
    ],
    [
     "uçta",
     0.166,
     0.438
    ],
    [
     "Taklîd.",
     0.438,
     0.71
    ],
    [
     "Ailem",
     0.78,
     1.584
    ],
    [
     "öyle",
     1.584,
     2.119
    ],
    [
     "dedi,",
     2.119,
     2.655
    ],
    [
     "ben",
     2.85,
     2.966
    ],
    [
     "de",
     2.966,
     3.081
    ],
    [
     "öyle",
     3.081,
     3.313
    ],
    [
     "bilirim.",
     3.313,
     3.66
    ],
    [
     "Neden",
     4.155,
     4.414
    ],
    [
     "öyle",
     4.414,
     4.673
    ],
    [
     "olduğunu",
     4.673,
     5.191
    ],
    [
     "merak",
     5.191,
     5.45
    ],
    [
     "edip",
     5.45,
     5.709
    ],
    [
     "sormaz.",
     5.709,
     5.969
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.321,
   "m": "Sonra ne olur? Neden öyle olduğunu anlamaz. Biri soru sorunca ne diyeceğini bilemez.",
   "k": [
    [
     "Sonra",
     0.03,
     0.282
    ],
    [
     "ne",
     0.282,
     0.408
    ],
    [
     "olur?",
     0.408,
     0.66
    ],
    [
     "Neden",
     1.165,
     1.398
    ],
    [
     "öyle",
     1.398,
     1.63
    ],
    [
     "olduğunu",
     1.63,
     2.096
    ],
    [
     "anlamaz.",
     2.096,
     2.445
    ],
    [
     "Biri",
     2.74,
     3.054
    ],
    [
     "soru",
     3.054,
     3.368
    ],
    [
     "sorunca",
     3.368,
     3.839
    ],
    [
     "ne",
     3.839,
     3.996
    ],
    [
     "diyeceğini",
     3.996,
     4.78
    ],
    [
     "bilemez.",
     4.78,
     5.251
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
   "sure": 7.937,
   "m": "Sağ uçta Şekk. Cevabı duydum ama bir daha sorayım. Yetişkine sorunca da içi rahat etmez, soruyu yeniden sorar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.284
    ],
    [
     "uçta",
     0.284,
     0.791
    ],
    [
     "Şekk.",
     0.791,
     1.045
    ],
    [
     "Cevabı",
     1.17,
     1.495
    ],
    [
     "duydum",
     1.495,
     1.712
    ],
    [
     "ama",
     1.712,
     1.929
    ],
    [
     "bir",
     1.929,
     2.038
    ],
    [
     "daha",
     2.038,
     2.255
    ],
    [
     "sorayım.",
     2.255,
     2.58
    ],
    [
     "Yetişkine",
     2.96,
     3.967
    ],
    [
     "sorunca",
     3.967,
     4.723
    ],
    [
     "da",
     4.723,
     4.974
    ],
    [
     "içi",
     4.974,
     5.478
    ],
    [
     "rahat",
     5.478,
     5.981
    ],
    [
     "etmez,",
     5.981,
     6.485
    ],
    [
     "soruyu",
     6.61,
     7.081
    ],
    [
     "yeniden",
     7.081,
     7.553
    ],
    [
     "sorar.",
     7.553,
     7.867
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.769,
   "m": "Sonra ne olur? Aynı soru her seferinde yeniden sorulur. Böyle zamanlarda güvendiği bir yetişkinle konuşmak iyi gelir.",
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
     "Aynı",
     1.035,
     1.344
    ],
    [
     "soru",
     1.344,
     1.652
    ],
    [
     "her",
     1.652,
     1.807
    ],
    [
     "seferinde",
     1.807,
     2.424
    ],
    [
     "yeniden",
     2.424,
     2.887
    ],
    [
     "sorulur.",
     2.887,
     3.35
    ],
    [
     "Böyle",
     3.625,
     3.904
    ],
    [
     "zamanlarda",
     3.904,
     4.463
    ],
    [
     "güvendiği",
     4.463,
     5.022
    ],
    [
     "bir",
     5.022,
     5.162
    ],
    [
     "yetişkinle",
     5.162,
     5.721
    ],
    [
     "konuşmak",
     5.721,
     6.14
    ],
    [
     "iyi",
     6.14,
     6.419
    ],
    [
     "gelir.",
     6.419,
     6.699
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
   "sure": 7.793,
   "m": "Tam kararında Tahkik. Bunu anlamak istiyorum; neden böyle? Aklına takılanı rahatça sorar ve nedenini anlamaya çalışır.",
   "k": [
    [
     "Tam",
     0.03,
     0.201
    ],
    [
     "kararında",
     0.201,
     0.887
    ],
    [
     "Tahkik.",
     0.887,
     1.23
    ],
    [
     "Bunu",
     1.315,
     1.629
    ],
    [
     "anlamak",
     1.629,
     2.101
    ],
    [
     "istiyorum;",
     2.101,
     2.73
    ],
    [
     "neden",
     3.2,
     3.558
    ],
    [
     "böyle?",
     3.558,
     3.915
    ],
    [
     "Aklına",
     4.24,
     4.675
    ],
    [
     "takılanı",
     4.675,
     5.256
    ],
    [
     "rahatça",
     5.256,
     5.691
    ],
    [
     "sorar",
     5.691,
     5.981
    ],
    [
     "ve",
     5.981,
     6.126
    ],
    [
     "nedenini",
     6.126,
     6.707
    ],
    [
     "anlamaya",
     6.707,
     7.287
    ],
    [
     "çalışır.",
     7.287,
     7.723
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.112,
   "m": "Sonra ne olur? Cevabı anlayınca bilgisi sağlamlaşır. Yeni sorular geldikçe sormaktan çekinmez.",
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
     "Cevabı",
     1.165,
     1.638
    ],
    [
     "anlayınca",
     1.638,
     2.268
    ],
    [
     "bilgisi",
     2.268,
     2.74
    ],
    [
     "sağlamlaşır.",
     2.74,
     3.37
    ],
    [
     "Yeni",
     3.635,
     3.979
    ],
    [
     "sorular",
     3.979,
     4.495
    ],
    [
     "geldikçe",
     4.495,
     5.011
    ],
    [
     "sormaktan",
     5.011,
     5.526
    ],
    [
     "çekinmez.",
     5.526,
     6.042
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
   "sure": 5.783,
   "m": "Derste inançla ilgili bir konu anlatılıyor. Ailenden duyduğunu hatırlıyorsun ama nedenini bilmiyorsun. Ne yaparsın?",
   "k": [
    [
     "Derste",
     0.03,
     0.249
    ],
    [
     "inançla",
     0.249,
     0.578
    ],
    [
     "ilgili",
     0.578,
     0.907
    ],
    [
     "bir",
     0.907,
     1.017
    ],
    [
     "konu",
     1.017,
     1.237
    ],
    [
     "anlatılıyor.",
     1.237,
     1.785
    ],
    [
     "Ailenden",
     2.06,
     2.543
    ],
    [
     "duyduğunu",
     2.543,
     3.027
    ],
    [
     "hatırlıyorsun",
     3.027,
     3.631
    ],
    [
     "ama",
     3.631,
     3.873
    ],
    [
     "nedenini",
     3.873,
     4.357
    ],
    [
     "bilmiyorsun.",
     4.357,
     4.84
    ],
    [
     "Ne",
     5.22,
     5.343
    ],
    [
     "yaparsın?",
     5.343,
     5.713
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.218,
   "m": "Konu aklında kalıyor ama biri nedenini sorunca cevap veremiyorsun.",
   "k": [
    [
     "Konu",
     0.03,
     0.347
    ],
    [
     "aklında",
     0.347,
     0.822
    ],
    [
     "kalıyor",
     0.822,
     1.297
    ],
    [
     "ama",
     1.297,
     1.614
    ],
    [
     "biri",
     1.614,
     1.93
    ],
    [
     "nedenini",
     1.93,
     2.564
    ],
    [
     "sorunca",
     2.564,
     3.039
    ],
    [
     "cevap",
     3.039,
     3.356
    ],
    [
     "veremiyorsun.",
     3.356,
     4.148
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 2.971,
   "m": "Cevaplar birikiyor ama içinde bir karar oluşmuyor.",
   "k": [
    [
     "Cevaplar",
     0.03,
     0.483
    ],
    [
     "birikiyor",
     0.483,
     1.088
    ],
    [
     "ama",
     1.088,
     1.39
    ],
    [
     "içinde",
     1.39,
     1.843
    ],
    [
     "bir",
     1.843,
     1.994
    ],
    [
     "karar",
     1.994,
     2.297
    ],
    [
     "oluşmuyor.",
     2.297,
     2.901
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 4.358,
   "m": "Nedenini anlıyorsun; anlattıkların hem açık hem aklında kalıyor.",
   "k": [
    [
     "Nedenini",
     0.03,
     0.675
    ],
    [
     "anlıyorsun;",
     0.675,
     1.32
    ],
    [
     "anlattıkların",
     1.405,
     2.366
    ],
    [
     "hem",
     2.366,
     2.558
    ],
    [
     "açık",
     2.558,
     2.943
    ],
    [
     "hem",
     2.943,
     3.135
    ],
    [
     "aklında",
     3.135,
     3.711
    ],
    [
     "kalıyor.",
     3.711,
     4.288
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.298,
   "m": "Bir arkadaşın sana inançla ilgili zor bir soru soruyor. Cevabını tam bilmiyorsun. Ne yaparsın?",
   "k": [
    [
     "Bir",
     0.03,
     0.155
    ],
    [
     "arkadaşın",
     0.155,
     0.653
    ],
    [
     "sana",
     0.653,
     0.902
    ],
    [
     "inançla",
     0.902,
     1.275
    ],
    [
     "ilgili",
     1.275,
     1.649
    ],
    [
     "zor",
     1.649,
     1.773
    ],
    [
     "bir",
     1.773,
     1.898
    ],
    [
     "soru",
     1.898,
     2.147
    ],
    [
     "soruyor.",
     2.147,
     2.52
    ],
    [
     "Cevabını",
     2.9,
     3.467
    ],
    [
     "tam",
     3.467,
     3.608
    ],
    [
     "bilmiyorsun.",
     3.608,
     4.175
    ],
    [
     "Ne",
     4.63,
     4.779
    ],
    [
     "yaparsın?",
     4.779,
     5.228
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.127,
   "m": "Soru havada kalıyor; arkadaşın da cevapsız kalıyor.",
   "k": [
    [
     "Soru",
     0.03,
     0.304
    ],
    [
     "havada",
     0.304,
     0.714
    ],
    [
     "kalıyor;",
     0.714,
     1.125
    ],
    [
     "arkadaşın",
     1.505,
     2.07
    ],
    [
     "da",
     2.07,
     2.211
    ],
    [
     "cevapsız",
     2.211,
     2.634
    ],
    [
     "kalıyor.",
     2.634,
     3.057
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.325,
   "m": "Cevaplar birikiyor ama karar vermek zorlaşıyor; sohbet uzuyor.",
   "k": [
    [
     "Cevaplar",
     0.03,
     0.437
    ],
    [
     "birikiyor",
     0.437,
     0.979
    ],
    [
     "ama",
     0.979,
     1.25
    ],
    [
     "karar",
     1.25,
     1.521
    ],
    [
     "vermek",
     1.521,
     1.793
    ],
    [
     "zorlaşıyor;",
     1.793,
     2.335
    ],
    [
     "sohbet",
     2.48,
     2.79
    ],
    [
     "uzuyor.",
     2.79,
     3.255
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.31,
   "m": "İkiniz de merakla araştırıyor ve cevabı birlikte öğreniyorsunuz.",
   "k": [
    [
     "İkiniz",
     0.03,
     0.535
    ],
    [
     "de",
     0.535,
     0.704
    ],
    [
     "merakla",
     0.704,
     1.209
    ],
    [
     "araştırıyor",
     1.209,
     2.051
    ],
    [
     "ve",
     2.051,
     2.219
    ],
    [
     "cevabı",
     2.219,
     2.724
    ],
    [
     "birlikte",
     2.724,
     3.229
    ],
    [
     "öğreniyorsunuz.",
     3.229,
     4.24
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
   "sure": 10.028,
   "m": "Bu cümle bilerek çift anlamlı. Nedenini anlamak için rahatça soruyorsa orta uca yakın. Cevap aldıktan sonra da hep aynı soruyu soruyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.179
    ],
    [
     "cümle",
     0.179,
     0.478
    ],
    [
     "bilerek",
     0.478,
     0.927
    ],
    [
     "çift",
     0.927,
     1.077
    ],
    [
     "anlamlı.",
     1.077,
     1.525
    ],
    [
     "Nedenini",
     2.02,
     2.545
    ],
    [
     "anlamak",
     2.545,
     2.94
    ],
    [
     "için",
     2.94,
     3.202
    ],
    [
     "rahatça",
     3.202,
     3.596
    ],
    [
     "soruyorsa",
     3.596,
     4.122
    ],
    [
     "orta",
     4.122,
     4.385
    ],
    [
     "uca",
     4.385,
     4.647
    ],
    [
     "yakın.",
     4.647,
     4.91
    ],
    [
     "Cevap",
     5.645,
     6.02
    ],
    [
     "aldıktan",
     6.02,
     6.583
    ],
    [
     "sonra",
     6.583,
     6.958
    ],
    [
     "da",
     6.958,
     7.145
    ],
    [
     "hep",
     7.145,
     7.333
    ],
    [
     "aynı",
     7.333,
     7.708
    ],
    [
     "soruyu",
     7.708,
     8.27
    ],
    [
     "soruyorsa",
     8.27,
     9.02
    ],
    [
     "sağ",
     9.02,
     9.208
    ],
    [
     "uca",
     9.208,
     9.583
    ],
    [
     "yakın.",
     9.583,
     9.958
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
