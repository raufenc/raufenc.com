/* İbremetre · Hikmetli Beyân — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Suskunluk · Hikmetli söz · Lakap). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-beyan-suskunluk",
 "ad": "Hikmetli Beyân (Suskunluk · Lakap): İbren Nerede?",
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
     "huy": "Hikmetli Beyân",
     "huyAnahtar": "Hikmetli",
     "olculen": "Ad takma ve şakada sınırım",
     "kanca": "Sadece şaka yaptım, o kadar.",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Hikmetli söz",
      "fazla": "Lakap"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Hikmetli Beyân",
     "cumle": "Sadece şaka yaptım, o kadar.",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Hikmetli söz",
      "fazla": "Lakap"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi birinin adı ya da özelliğiyle alay edip buna şaka diyor: sağ uca (Lakap) yakın. Başka okumada kimseyi küçük düşürmeden hafif bir espri yapıyor ve doğruyu dalga geçmeden söylemiş oluyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, sözün karşımızdakini nasıl etkilediğine bakar. Hikmetli Beyân; sözü yerinde, zamanında ve faydalı söylemektir. Bu ibre yalnız ad ve şaka konusuna bakar ve ölçekten çok yönü gösterir: bir uçta kırıldığı hâlde sessiz kalıp sınır koyamamak, öbür uçta küçük düşürücü bir ad takmak vardır.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Hikmetli Beyân",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Hikmetli söz",
      "fazla": "Lakap"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Kırıldığında sessiz kalmak neye benziyor?",
       "ad": "Suskunluk",
       "soz": "Canım sıkıldı ama bir şey diyemem, gülüp geçeyim.",
       "eylem": "yaslan",
       "zincir": [
        "Ad yerleşir ve sınır çizilmediği için sürer.",
        "Kırgınlığı içinde büyür; arkadaşları ne hissettiğini bilmez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Söylersem şakadan anlamaz derler; susayım.",
          "dogru": true,
          "not": "Suskunluk, kırıldığın yerde sessiz kalıp sınır koyamamaktır. Çekinmek doğaldır; küçük bir cümleyle ya da güvendiğin bir yetişkine anlatarak başlayabilirsin."
         },
         {
          "m": "Doğruyu dalga geçmeden söyleyeyim; şakayı kimse üzülmeden yapayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hikmetli sözün sesi."
         },
         {
          "m": "Bir ad takarsam herkes güler.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: lakap takmanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Suskunluk",
        "soz": "Canım"
       },
       "zincirAnahtar": [
        "Ad",
        "Kırgınlığı"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kırıcı bir ad takmak neye benziyor?",
       "ad": "Lakap",
       "soz": "Bundan sonra sana “Mırmır” diyeceğiz, olur mu?",
       "eylem": "isaret",
       "zincir": [
        "Herkes o adla seslenmeye başlar.",
        "Arkadaşı üzülür ve sınıfta konuşmaktan kaçınır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Bir ad takarsam herkes güler.",
          "dogru": true,
          "not": "Kötü lakap takmak, birini küçük düşürücü adlarla anmaktır. Şaka gibi görünse de karşındaki incinirse şaka değildir."
         },
         {
          "m": "Söylersem şakadan anlamaz derler; susayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: suskunluğun sesi."
         },
         {
          "m": "Doğruyu dalga geçmeden söyleyeyim; şakayı kimse üzülmeden yapayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: hikmetli sözün sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Lakap",
        "soz": "Bundan"
       },
       "zincirAnahtar": [
        "Herkes",
        "Arkadaşı"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Hikmetli söz",
       "soz": "Söz de şaka da yerinde olsun; adıyla seslenelim.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşları rahatça güler.",
        "Kimse küçük düşmez; şaka da sohbet de tatlı kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Doğruyu dalga geçmeden söyleyeyim; şakayı kimse üzülmeden yapayım.",
          "dogru": true,
          "not": "Hikmetli Beyân, yerinde ve faydalı söz söylemektir; şaka da, ad da kimseyi küçük düşürmeden olur."
         },
         {
          "m": "Söylersem şakadan anlamaz derler; susayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: suskunluğun sesi."
         },
         {
          "m": "Bir ad takarsam herkes güler.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: lakap takmanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hikmetli",
        "soz": "Söz"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Kimse"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Hikmetli Beyân",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Suskunluk",
      "orta": "Hikmetli söz",
      "fazla": "Lakap"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "lakap",
       "baslik": "Takılan lakap",
       "tetik": "Arkadaşların sana bir lakap taktı ve her gün o adla seslenip gülüyor. Bu hoşuna gitmiyor.",
       "secenekler": [
        {
         "m": "Gülüp geçerim, bir şey demem; belki sıkılırlar.",
         "zon": "az",
         "sonuc": "Lakap yerleşiyor; her seferinde için biraz daha kırılıyor.",
         "not": "İbre sola kaydı: kırıldığın hâlde sessiz kalmak sınırı çizmiyor.",
         "ses": "s1az"
        },
        {
         "m": "Ben de onlara daha kötü bir lakap takarım.",
         "zon": "fazla",
         "sonuc": "Karşılıklı lakaplar çoğalıyor; ortam gerginleşiyor.",
         "not": "İbre sağa kaydı: kötü ada kötü adla karşılık vermek kırgınlığı büyütüyor.",
         "ses": "s1fa"
        },
        {
         "m": "Adımla seslenin, bu lakap hoşuma gitmiyor, derim.",
         "zon": "orta",
         "sonuc": "Arkadaşların durup dinliyor; bir kısmı adınla seslenmeye başlıyor.",
         "not": "İbre ortada: sınırını nazik ama açık bir cümleyle söyledin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "saka",
       "baslik": "Şakanın sınırı",
       "tetik": "Sınıfta bir arkadaşın kıyafetiyle şaka yapılıyor ve herkes gülüyor. O arkadaş gülmüyor.",
       "secenekler": [
        {
         "m": "Gülmüyorum ama bir şey de demem; şaka sürsün.",
         "zon": "az",
         "sonuc": "Şaka sürüyor; arkadaşın daha da suskunlaşıyor.",
         "not": "İbre sola kaydı: şakanın kırdığını görüp sessiz kalmak sınır koymuyor.",
         "ses": "s2az"
        },
        {
         "m": "Ben de kıyafetiyle ilgili daha komik bir şaka yaparım.",
         "zon": "fazla",
         "sonuc": "Şaka büyüyor; arkadaşın gülmeyi bırakıp uzaklaşıyor.",
         "not": "İbre sağa kaydı: komik gibi görünen şaka karşındakinin kalbini kırıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Şakayı durdurup konuyu değiştiririm; sonra arkadaşıma da sorarım.",
         "zon": "orta",
         "sonuc": "Şaka duruyor; arkadaşın rahatlıyor.",
         "not": "İbre ortada: nazikçe araya girip şakanın sınırını gösterdin.",
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
       "ad": "Az · Suskunluk",
       "aciklama": "Kırılıp da susmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Hikmetli söz",
       "aciklama": "Alaysız doğru, kırmayan şaka",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Lakap",
       "aciklama": "Küçük düşüren ad takmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Kendisine takılan kırıcı adı sevmez ama hiçbir şey demeden susar.",
       "alan": "az",
       "ipucu": "Kırıldığı hâlde sınır koymuyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşının sakarlığıyla dalga geçip ona kırıcı bir ad takar.",
       "alan": "fazla",
       "ipucu": "Küçük düşürücü ad kullanıyor."
      },
      {
       "id": "k3",
       "metin": "Arkadaşına doğruyu dalga geçmeden, ciddi ve nazik bir dille söyler.",
       "alan": "orta",
       "ipucu": "Doğruyu alay etmeden söylüyor."
      },
      {
       "id": "k4",
       "metin": "Şaka ona dokunsa da gülüyormuş gibi yapar, hiçbir şey söylemez.",
       "alan": "az",
       "ipucu": "Kırılmasına rağmen susuyor."
      },
      {
       "id": "k5",
       "metin": "Alay etmek için bir arkadaşına kırıcı bir lakapla seslenir.",
       "alan": "fazla",
       "ipucu": "Küçük düşürücü ad takıyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşını gerçek adıyla çağırır; şakayı kimse kırılmadan yapar.",
       "alan": "orta",
       "ipucu": "Hem saygılı hem neşeli."
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
        "Biri bana kırıcı bir lakap takınca",
        "Arkadaşımla şakalaşırken",
        "Birine seslenirken",
        "Bir şaka hoşuma gitmeyince"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Kimseye alay eden bir ad takmayacağım",
        "Hoşuma gitmeyene nazikçe “bu hoşuma gitmedi” diyeceğim",
        "Çekinirsem önce güvendiğim bir yetişkinle konuşacağım"
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
       "baslik": "Hikmetli Beyân",
       "metin": "alaysız söz, kırmayan şaka",
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
   "sure": 1.605,
   "m": "Sadece şaka yaptım, o kadar.",
   "k": [
    [
     "Sadece",
     0.03,
     0.405
    ],
    [
     "şaka",
     0.405,
     0.655
    ],
    [
     "yaptım,",
     0.655,
     0.905
    ],
    [
     "o",
     0.98,
     1.165
    ],
    [
     "kadar.",
     1.165,
     1.535
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 13.174,
   "m": "Birçok güzel huy bir ibre gibidir. Hikmetli Beyân, birine nasıl seslendiğimi ve şakanın sınırını ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.515
    ],
    [
     "güzel",
     0.515,
     0.999
    ],
    [
     "huy",
     0.999,
     1.241
    ],
    [
     "bir",
     1.241,
     1.484
    ],
    [
     "ibre",
     1.484,
     1.968
    ],
    [
     "gibidir.",
     1.968,
     2.695
    ],
    [
     "Hikmetli",
     3.27,
     3.744
    ],
    [
     "Beyân,",
     3.744,
     4.06
    ],
    [
     "birine",
     4.66,
     5.333
    ],
    [
     "nasıl",
     5.333,
     5.782
    ],
    [
     "seslendiğimi",
     5.782,
     6.905
    ],
    [
     "ve",
     6.905,
     7.129
    ],
    [
     "şakanın",
     7.129,
     7.803
    ],
    [
     "sınırını",
     7.803,
     8.701
    ],
    [
     "ölçer.",
     8.701,
     9.15
    ],
    [
     "İbre",
     9.295,
     9.755
    ],
    [
     "üç",
     9.755,
     9.985
    ],
    [
     "yerde",
     9.985,
     10.445
    ],
    [
     "durabilir:",
     10.445,
     11.365
    ],
    [
     "az,",
     11.645,
     11.8
    ],
    [
     "kararında,",
     11.8,
     12.42
    ],
    [
     "fazla.",
     12.725,
     13.104
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
   "sure": 9.107,
   "m": "Sol uçta Suskunluk. Canım sıkıldı ama bir şey diyemem, gülüp geçeyim. Kendisine takılan adı sevmez ama itiraz edemeyip susar.",
   "k": [
    [
     "Sol",
     0.03,
     0.256
    ],
    [
     "uçta",
     0.256,
     0.708
    ],
    [
     "Suskunluk.",
     0.708,
     1.385
    ],
    [
     "Canım",
     1.47,
     1.861
    ],
    [
     "sıkıldı",
     1.861,
     2.446
    ],
    [
     "ama",
     2.446,
     2.837
    ],
    [
     "bir",
     2.837,
     3.032
    ],
    [
     "şey",
     3.032,
     3.228
    ],
    [
     "diyemem,",
     3.228,
     3.814
    ],
    [
     "gülüp",
     3.814,
     4.204
    ],
    [
     "geçeyim.",
     4.204,
     4.79
    ],
    [
     "Kendisine",
     5.435,
     6.09
    ],
    [
     "takılan",
     6.09,
     6.581
    ],
    [
     "adı",
     6.581,
     6.909
    ],
    [
     "sevmez",
     6.909,
     7.236
    ],
    [
     "ama",
     7.236,
     7.563
    ],
    [
     "itiraz",
     7.563,
     8.055
    ],
    [
     "edemeyip",
     8.055,
     8.709
    ],
    [
     "susar.",
     8.709,
     9.037
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 8.658,
   "m": "Sonra ne olur? Ad yerleşir ve sınır çizilmediği için sürer. Kırgınlığı içinde büyür; arkadaşları ne hissettiğini bilmez.",
   "k": [
    [
     "Sonra",
     0.03,
     0.308
    ],
    [
     "ne",
     0.308,
     0.447
    ],
    [
     "olur?",
     0.447,
     0.725
    ],
    [
     "Ad",
     1.255,
     1.418
    ],
    [
     "yerleşir",
     1.418,
     1.907
    ],
    [
     "ve",
     1.907,
     2.071
    ],
    [
     "sınır",
     2.071,
     2.397
    ],
    [
     "çizilmediği",
     2.397,
     3.213
    ],
    [
     "için",
     3.213,
     3.539
    ],
    [
     "sürer.",
     3.539,
     3.865
    ],
    [
     "Kırgınlığı",
     4.04,
     5.084
    ],
    [
     "içinde",
     5.084,
     5.868
    ],
    [
     "büyür;",
     5.868,
     6.39
    ],
    [
     "arkadaşları",
     6.665,
     7.404
    ],
    [
     "ne",
     7.404,
     7.552
    ],
    [
     "hissettiğini",
     7.552,
     8.292
    ],
    [
     "bilmez.",
     8.292,
     8.588
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
   "sure": 6.993,
   "m": "Sağ uçta Lakap. Bundan sonra sana “Mırmır” diyeceğiz, olur mu? Arkadaşının bir özelliğiyle dalga geçip ona bir ad takar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.258
    ],
    [
     "uçta",
     0.258,
     0.714
    ],
    [
     "Lakap.",
     0.714,
     1.17
    ],
    [
     "Bundan",
     1.265,
     1.582
    ],
    [
     "sonra",
     1.582,
     1.898
    ],
    [
     "sana",
     1.898,
     2.215
    ],
    [
     "“Mırmır”",
     2.215,
     2.532
    ],
    [
     "diyeceğiz,",
     2.532,
     3.165
    ],
    [
     "olur",
     3.165,
     3.482
    ],
    [
     "mu?",
     3.482,
     3.64
    ],
    [
     "Arkadaşının",
     4.13,
     4.795
    ],
    [
     "bir",
     4.795,
     4.928
    ],
    [
     "özelliğiyle",
     4.928,
     5.593
    ],
    [
     "dalga",
     5.593,
     5.859
    ],
    [
     "geçip",
     5.859,
     6.125
    ],
    [
     "ona",
     6.125,
     6.391
    ],
    [
     "bir",
     6.391,
     6.524
    ],
    [
     "ad",
     6.524,
     6.657
    ],
    [
     "takar.",
     6.657,
     6.923
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.043,
   "m": "Sonra ne olur? Herkes o adla seslenmeye başlar. Arkadaşı üzülür ve sınıfta konuşmaktan kaçınır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.272
    ],
    [
     "ne",
     0.272,
     0.393
    ],
    [
     "olur?",
     0.393,
     0.635
    ],
    [
     "Herkes",
     0.99,
     1.343
    ],
    [
     "o",
     1.343,
     1.519
    ],
    [
     "adla",
     1.519,
     1.872
    ],
    [
     "seslenmeye",
     1.872,
     2.577
    ],
    [
     "başlar.",
     2.577,
     2.93
    ],
    [
     "Arkadaşı",
     3.275,
     3.875
    ],
    [
     "üzülür",
     3.875,
     4.324
    ],
    [
     "ve",
     4.324,
     4.474
    ],
    [
     "sınıfta",
     4.474,
     4.924
    ],
    [
     "konuşmaktan",
     4.924,
     5.523
    ],
    [
     "kaçınır.",
     5.523,
     5.973
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
   "sure": 10.856,
   "m": "Tam kararında Hikmetli söz. Söz de şaka da yerinde olsun; adıyla seslenelim. Doğruyu dalga geçmeden söyler, şakayı kimseyi üzmeyecek yerde bırakır.",
   "k": [
    [
     "Tam",
     0.03,
     0.238
    ],
    [
     "kararında",
     0.238,
     1.072
    ],
    [
     "Hikmetli",
     1.072,
     1.697
    ],
    [
     "söz.",
     1.697,
     1.905
    ],
    [
     "Söz",
     2.23,
     2.355
    ],
    [
     "de",
     2.355,
     2.48
    ],
    [
     "şaka",
     2.48,
     2.73
    ],
    [
     "da",
     2.73,
     2.855
    ],
    [
     "yerinde",
     2.855,
     3.23
    ],
    [
     "olsun;",
     3.23,
     3.48
    ],
    [
     "adıyla",
     3.615,
     4.594
    ],
    [
     "seslenelim.",
     4.594,
     5.9
    ],
    [
     "Doğruyu",
     6.235,
     6.817
    ],
    [
     "dalga",
     6.817,
     7.205
    ],
    [
     "geçmeden",
     7.205,
     7.787
    ],
    [
     "söyler,",
     7.787,
     8.175
    ],
    [
     "şakayı",
     8.435,
     8.905
    ],
    [
     "kimseyi",
     8.905,
     9.376
    ],
    [
     "üzmeyecek",
     9.376,
     10.003
    ],
    [
     "yerde",
     10.003,
     10.316
    ],
    [
     "bırakır.",
     10.316,
     10.786
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.099,
   "m": "Sonra ne olur? Arkadaşları rahatça güler. Kimse küçük düşmez; şaka da sohbet de tatlı kalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.284
    ],
    [
     "ne",
     0.284,
     0.411
    ],
    [
     "olur?",
     0.411,
     0.665
    ],
    [
     "Arkadaşları",
     1.17,
     1.88
    ],
    [
     "rahatça",
     1.88,
     2.306
    ],
    [
     "güler.",
     2.306,
     2.59
    ],
    [
     "Kimse",
     2.955,
     3.327
    ],
    [
     "küçük",
     3.327,
     3.698
    ],
    [
     "düşmez;",
     3.698,
     4.07
    ],
    [
     "şaka",
     4.325,
     4.666
    ],
    [
     "da",
     4.666,
     4.836
    ],
    [
     "sohbet",
     4.836,
     5.177
    ],
    [
     "de",
     5.177,
     5.347
    ],
    [
     "tatlı",
     5.347,
     5.688
    ],
    [
     "kalır.",
     5.688,
     6.029
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
   "sure": 7.106,
   "m": "Arkadaşların sana bir lakap taktı ve her gün o adla seslenip gülüyor. Bu hoşuna gitmiyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.941
    ],
    [
     "sana",
     0.941,
     1.306
    ],
    [
     "bir",
     1.306,
     1.488
    ],
    [
     "lakap",
     1.488,
     1.853
    ],
    [
     "taktı",
     1.853,
     2.218
    ],
    [
     "ve",
     2.218,
     2.4
    ],
    [
     "her",
     2.4,
     2.582
    ],
    [
     "gün",
     2.582,
     2.764
    ],
    [
     "o",
     2.764,
     2.947
    ],
    [
     "adla",
     2.947,
     3.311
    ],
    [
     "seslenip",
     3.311,
     3.858
    ],
    [
     "gülüyor.",
     3.858,
     4.405
    ],
    [
     "Bu",
     4.835,
     4.992
    ],
    [
     "hoşuna",
     4.992,
     5.464
    ],
    [
     "gitmiyor.",
     5.464,
     5.935
    ],
    [
     "Ne",
     6.31,
     6.492
    ],
    [
     "yaparsın?",
     6.492,
     7.036
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.432,
   "m": "Lakap yerleşiyor; her seferinde için biraz daha kırılıyor.",
   "k": [
    [
     "Lakap",
     0.03,
     0.335
    ],
    [
     "yerleşiyor;",
     0.335,
     0.945
    ],
    [
     "her",
     1.15,
     1.297
    ],
    [
     "seferinde",
     1.297,
     1.887
    ],
    [
     "için",
     1.887,
     2.182
    ],
    [
     "biraz",
     2.182,
     2.477
    ],
    [
     "daha",
     2.477,
     2.772
    ],
    [
     "kırılıyor.",
     2.772,
     3.362
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 2.875,
   "m": "Karşılıklı lakaplar çoğalıyor; ortam gerginleşiyor.",
   "k": [
    [
     "Karşılıklı",
     0.03,
     0.606
    ],
    [
     "lakaplar",
     0.606,
     1.039
    ],
    [
     "çoğalıyor;",
     1.039,
     1.615
    ],
    [
     "ortam",
     1.8,
     2.087
    ],
    [
     "gerginleşiyor.",
     2.087,
     2.805
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.315,
   "m": "Arkadaşların durup dinliyor; bir kısmı adınla seslenmeye başlıyor.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.685
    ],
    [
     "durup",
     0.685,
     0.947
    ],
    [
     "dinliyor;",
     0.947,
     1.34
    ],
    [
     "bir",
     1.545,
     1.676
    ],
    [
     "kısmı",
     1.676,
     1.937
    ],
    [
     "adınla",
     1.937,
     2.33
    ],
    [
     "seslenmeye",
     2.33,
     2.853
    ],
    [
     "başlıyor.",
     2.853,
     3.245
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.024,
   "m": "Sınıfta bir arkadaşın kıyafetiyle şaka yapılıyor ve herkes gülüyor. O arkadaş gülmüyor. Ne yaparsın?",
   "k": [
    [
     "Sınıfta",
     0.03,
     0.559
    ],
    [
     "bir",
     0.559,
     0.736
    ],
    [
     "arkadaşın",
     0.736,
     1.441
    ],
    [
     "kıyafetiyle",
     1.441,
     2.323
    ],
    [
     "şaka",
     2.323,
     2.676
    ],
    [
     "yapılıyor",
     2.676,
     3.382
    ],
    [
     "ve",
     3.382,
     3.558
    ],
    [
     "herkes",
     3.558,
     3.911
    ],
    [
     "gülüyor.",
     3.911,
     4.44
    ],
    [
     "O",
     4.515,
     4.591
    ],
    [
     "arkadaş",
     4.591,
     4.818
    ],
    [
     "gülmüyor.",
     4.818,
     5.045
    ],
    [
     "Ne",
     5.395,
     5.535
    ],
    [
     "yaparsın?",
     5.535,
     5.954
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.998,
   "m": "Şaka sürüyor; arkadaşın daha da suskunlaşıyor.",
   "k": [
    [
     "Şaka",
     0.03,
     0.334
    ],
    [
     "sürüyor;",
     0.334,
     0.79
    ],
    [
     "arkadaşın",
     1.145,
     1.739
    ],
    [
     "daha",
     1.739,
     2.036
    ],
    [
     "da",
     2.036,
     2.185
    ],
    [
     "suskunlaşıyor.",
     2.185,
     2.928
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.212,
   "m": "Şaka büyüyor; arkadaşın gülmeyi bırakıp uzaklaşıyor.",
   "k": [
    [
     "Şaka",
     0.03,
     0.306
    ],
    [
     "büyüyor;",
     0.306,
     0.72
    ],
    [
     "arkadaşın",
     1.105,
     1.648
    ],
    [
     "gülmeyi",
     1.648,
     2.056
    ],
    [
     "bırakıp",
     2.056,
     2.463
    ],
    [
     "uzaklaşıyor.",
     2.463,
     3.142
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 2.338,
   "m": "Şaka duruyor; arkadaşın rahatlıyor.",
   "k": [
    [
     "Şaka",
     0.03,
     0.296
    ],
    [
     "duruyor;",
     0.296,
     0.695
    ],
    [
     "arkadaşın",
     0.905,
     1.587
    ],
    [
     "rahatlıyor.",
     1.587,
     2.268
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
   "sure": 11.34,
   "m": "Bu cümle bilerek çift anlamlı. Alay eden bir şaka yapan biri diyorsa sağ uca yakın. Kimseyi küçük düşürmeden hafif bir espri yapan ve doğruyu dalga geçmeden söyleyen biri diyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.173
    ],
    [
     "cümle",
     0.173,
     0.458
    ],
    [
     "bilerek",
     0.458,
     0.885
    ],
    [
     "çift",
     0.885,
     1.028
    ],
    [
     "anlamlı.",
     1.028,
     1.455
    ],
    [
     "Alay",
     1.85,
     2.134
    ],
    [
     "eden",
     2.134,
     2.417
    ],
    [
     "bir",
     2.417,
     2.559
    ],
    [
     "şaka",
     2.559,
     2.843
    ],
    [
     "yapan",
     2.843,
     3.127
    ],
    [
     "biri",
     3.127,
     3.41
    ],
    [
     "diyorsa",
     3.41,
     3.836
    ],
    [
     "sağ",
     3.836,
     3.978
    ],
    [
     "uca",
     3.978,
     4.261
    ],
    [
     "yakın.",
     4.261,
     4.545
    ],
    [
     "Kimseyi",
     5.01,
     5.492
    ],
    [
     "küçük",
     5.492,
     5.813
    ],
    [
     "düşürmeden",
     5.813,
     6.455
    ],
    [
     "hafif",
     6.455,
     6.776
    ],
    [
     "bir",
     6.776,
     6.936
    ],
    [
     "espri",
     6.936,
     7.257
    ],
    [
     "yapan",
     7.257,
     7.578
    ],
    [
     "ve",
     7.578,
     7.739
    ],
    [
     "doğruyu",
     7.739,
     8.22
    ],
    [
     "dalga",
     8.22,
     8.541
    ],
    [
     "geçmeden",
     8.541,
     9.023
    ],
    [
     "söyleyen",
     9.023,
     9.504
    ],
    [
     "biri",
     9.504,
     9.825
    ],
    [
     "diyorsa",
     9.825,
     10.307
    ],
    [
     "orta",
     10.307,
     10.628
    ],
    [
     "uca",
     10.628,
     10.949
    ],
    [
     "yakın.",
     10.949,
     11.27
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
