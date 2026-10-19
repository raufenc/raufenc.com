/* İbremetre · Hikmetli Beyân — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Suskunluk · Hikmetli söz · Lakap). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-beyan-suskunluk",
 "ad": "Hikmetli Beyân (Suskunluk · Lakap): İbren Nerede?",
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
     "huy": "Hikmetli Beyân",
     "huyAnahtar": "Hikmetli",
     "olculen": "Birine seslenme ve gerçeği söyleme biçimim",
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
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi birinin özelliğiyle alay eden bir ad ya da şaka yapıyor: sağ uca (Lakap) yakın. Başka okumada kimseyi küçük düşürmeyen, herkesin güldüğü iyi niyetli bir espri yapıyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, sözün karşımızdakini nasıl etkilediğine bakar. Hikmetli Beyân; doğruyu yerinde, zamanında ve faydalı söylemektir. Bu ibre ölçekten çok yönü gösterir: bir uçta gerekeni söylemeye çekinmek, öbür uçta küçük düşürücü bir ad takmak vardır.",
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
       "soru": "Hakkı söylemekten çekinmek neye benziyor?",
       "ad": "Suskunluk",
       "soz": "Yanlış olduğunu biliyorum ama söyleyemem.",
       "eylem": "yaslan",
       "zincir": [
        "Yanlış bilgi ödevde kalır.",
        "Grup bunu sonradan fark edince herkes bozulur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Söylersem bana gülerler; susayım.",
          "dogru": true,
          "not": "Suskunluk, hakkı söylemesi gereken yerde çekinmektir. Çekinmek doğaldır; küçük bir cümleyle ya da bir büyüğe danışarak başlayabilirsin."
         },
         {
          "m": "Çekinsem de adını söyleyip nazikçe konuşayım.",
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
        "soz": "Yanlış"
       },
       "zincirAnahtar": [
        "Yanlış",
        "Grup"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Kırıcı bir ad takmak neye benziyor?",
       "ad": "Lakap",
       "soz": "Bundan sonra sana “kaplumbağa” diyeceğiz, olur mu?",
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
          "m": "Söylersem bana gülerler; susayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: suskunluğun sesi."
         },
         {
          "m": "Çekinsem de adını söyleyip nazikçe konuşayım.",
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
       "ad": "Hikmetli",
       "soz": "Bence şurayı birlikte düzeltelim; ne dersin?",
       "eylem": "konus",
       "zincir": [
        "Arkadaşları fikri dinler.",
        "Hata düzelir ve kimse küçük düşmeden ilerler."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Çekinsem de adını söyleyip nazikçe konuşayım.",
          "dogru": true,
          "not": "Hikmetli Beyân, yerinde ve faydalı söz söylemektir; kimseyi küçük düşürmeden doğruyu söylemektir."
         },
         {
          "m": "Söylersem bana gülerler; susayım.",
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
        "soz": "Bence"
       },
       "zincirAnahtar": [
        "Arkadaşları",
        "Hata"
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
       "id": "bilgi",
       "baslik": "Yanlış bilgi",
       "tetik": "Arkadaşların bir konuda yanlış bilgi söylüyor. Sen doğrusunu biliyorsun ama konuşmaya çekiniyorsun.",
       "secenekler": [
        {
         "m": "Ben bir şey demeyeyim, yanlış kalsın.",
         "zon": "az",
         "sonuc": "Yanlış bilgi sürüyor; ödevde de aynı hata çıkıyor.",
         "not": "İbre sola kaydı: bildiğini söylememek yanlışın yerinde kalmasına izin veriyor.",
         "ses": "s1az"
        },
        {
         "m": "Doğrusunu bilmeyene “bilgisiz” derim, belki öğrenir.",
         "zon": "fazla",
         "sonuc": "Arkadaşların alınıyor ve doğrusunu dinlemek de istemiyorlar.",
         "not": "İbre sağa kaydı: küçük düşüren söz, doğrunun duyulmasını engelliyor.",
         "ses": "s1fa"
        },
        {
         "m": "Ben şöyle okumuştum; birlikte kontrol edelim mi?",
         "zon": "orta",
         "sonuc": "Birlikte kaynağa bakıyorsunuz ve doğrusu anlaşılıyor.",
         "not": "İbre ortada: doğruyu nazikçe ve birlikte bakmayı önererek söyledin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "ad",
       "baslik": "Yeni arkadaşın adı",
       "tetik": "Sınıfa yeni gelen arkadaşın adı zor söyleniyor. Birkaç kişi ona komik bir ad takmayı konuşuyor.",
       "secenekler": [
        {
         "m": "Buna itiraz edemem; susar geçerim.",
         "zon": "az",
         "sonuc": "Takma ad yerleşiyor; arkadaşın bu duruma üzülüyor.",
         "not": "İbre sola kaydı: gerektiğinde itiraz etmemek, kırıcı adın yayılmasına izin veriyor.",
         "ses": "s2az"
        },
        {
         "m": "Ben de ona çok komik bir ad buluyorum.",
         "zon": "fazla",
         "sonuc": "Ad herkesçe kullanılıyor; yeni arkadaş sınıfa ısınamıyor.",
         "not": "İbre sağa kaydı: komik gibi görünen kırıcı ad, karşındakinin kalbini kırıyor.",
         "ses": "s2fa"
        },
        {
         "m": "Adını doğru söylemeyi öğrenelim; gerçek adıyla seslenelim.",
         "zon": "orta",
         "sonuc": "Arkadaşın adını doğru duyuyor ve kendini daha rahat hissediyor.",
         "not": "İbre ortada: nazikçe itiraz edip güzel bir çözüm önerdin.",
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
       "aciklama": "Hakkı söylemekten çekinmek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Hikmetli söz",
       "aciklama": "Doğruyu nazikçe söylemek",
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
       "metin": "Ödevde yanlış gördüğü yeri biliyor ama grup arkadaşına söylemiyor.",
       "alan": "az",
       "ipucu": "Doğruyu söylemekten çekiniyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşının sakarlığıyla dalga geçip ona kırıcı bir ad takar.",
       "alan": "fazla",
       "ipucu": "Küçük düşürücü ad kullanıyor."
      },
      {
       "id": "k3",
       "metin": "Yanlışı fark edince “şunu bir daha kontrol edelim mi?” der.",
       "alan": "orta",
       "ipucu": "Doğruyu nazikçe söylüyor."
      },
      {
       "id": "k4",
       "metin": "Arkadaşı yanlış kuralı söylerken doğrusunu bilir ama konuşmaz.",
       "alan": "az",
       "ipucu": "Gerektiğinde konuşmuyor."
      },
      {
       "id": "k5",
       "metin": "Alay etmek için bir arkadaşına “yavaş kaplumbağa” diye seslenir.",
       "alan": "fazla",
       "ipucu": "Küçük düşürücü ad takıyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşını gerçek adıyla çağırır; doğruyu söylerken sesini yumuşak tutar.",
       "alan": "orta",
       "ipucu": "Hem saygılı hem açık."
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
        "Yanlış bir bilgi duyunca",
        "Arkadaşımla şakalaşırken",
        "Grup çalışmasında bir hata görünce",
        "Birine seslenirken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bildiğimi nazikçe, “şöyle bakalım mı?” diye söyleyeceğim",
        "Kimseye alay eden bir ad takmayacağım",
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
       "metin": "doğruyu nazikçe söylemek",
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
   "sure": 12.944,
   "m": "Birçok güzel huy bir ibre gibidir. Hikmetli Beyân, birine nasıl seslendiğimi ve doğruyu nasıl söylediğimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.517
    ],
    [
     "güzel",
     0.517,
     1.005
    ],
    [
     "huy",
     1.005,
     1.248
    ],
    [
     "bir",
     1.248,
     1.492
    ],
    [
     "ibre",
     1.492,
     1.979
    ],
    [
     "gibidir.",
     1.979,
     2.71
    ],
    [
     "Hikmetli",
     3.23,
     3.749
    ],
    [
     "Beyân,",
     3.749,
     4.095
    ],
    [
     "birine",
     4.28,
     4.939
    ],
    [
     "nasıl",
     4.939,
     5.378
    ],
    [
     "seslendiğimi",
     5.378,
     6.476
    ],
    [
     "ve",
     6.476,
     6.695
    ],
    [
     "doğruyu",
     6.695,
     7.354
    ],
    [
     "nasıl",
     7.354,
     7.793
    ],
    [
     "söylediğimi",
     7.793,
     8.891
    ],
    [
     "ölçer.",
     8.891,
     9.33
    ],
    [
     "İbre",
     9.53,
     9.917
    ],
    [
     "üç",
     9.917,
     10.11
    ],
    [
     "yerde",
     10.11,
     10.497
    ],
    [
     "durabilir:",
     10.497,
     11.27
    ],
    [
     "az,",
     11.58,
     11.722
    ],
    [
     "kararında,",
     11.722,
     12.29
    ],
    [
     "fazla.",
     12.55,
     12.874
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
   "sure": 7.335,
   "m": "Sol uçta Suskunluk. Yanlış olduğunu biliyorum ama söyleyemem. Grup ödevinde yanlış bir bilgi görür ama söylemeye çekinir.",
   "k": [
    [
     "Sol",
     0.03,
     0.218
    ],
    [
     "uçta",
     0.218,
     0.595
    ],
    [
     "Suskunluk.",
     0.595,
     1.16
    ],
    [
     "Yanlış",
     1.23,
     1.541
    ],
    [
     "olduğunu",
     1.541,
     2.162
    ],
    [
     "biliyorum",
     2.162,
     2.783
    ],
    [
     "ama",
     2.783,
     3.094
    ],
    [
     "söyleyemem.",
     3.094,
     3.715
    ],
    [
     "Grup",
     4.325,
     4.465
    ],
    [
     "ödevinde",
     4.465,
     5.025
    ],
    [
     "yanlış",
     5.025,
     5.305
    ],
    [
     "bir",
     5.305,
     5.445
    ],
    [
     "bilgi",
     5.445,
     5.725
    ],
    [
     "görür",
     5.725,
     6.005
    ],
    [
     "ama",
     6.005,
     6.285
    ],
    [
     "söylemeye",
     6.285,
     6.845
    ],
    [
     "çekinir.",
     6.845,
     7.265
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.686,
   "m": "Sonra ne olur? Yanlış bilgi ödevde kalır. Grup bunu sonradan fark edince herkes bozulur.",
   "k": [
    [
     "Sonra",
     0.03,
     0.322
    ],
    [
     "ne",
     0.322,
     0.468
    ],
    [
     "olur?",
     0.468,
     0.76
    ],
    [
     "Yanlış",
     1.14,
     1.476
    ],
    [
     "bilgi",
     1.476,
     1.811
    ],
    [
     "ödevde",
     1.811,
     2.314
    ],
    [
     "kalır.",
     2.314,
     2.65
    ],
    [
     "Grup",
     3.025,
     3.198
    ],
    [
     "bunu",
     3.198,
     3.543
    ],
    [
     "sonradan",
     3.543,
     4.061
    ],
    [
     "fark",
     4.061,
     4.234
    ],
    [
     "edince",
     4.234,
     4.752
    ],
    [
     "herkes",
     4.752,
     5.097
    ],
    [
     "bozulur.",
     5.097,
     5.615
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
   "sure": 7.791,
   "m": "Sağ uçta Lakap. Bundan sonra sana “kaplumbağa” diyeceğiz, olur mu? Arkadaşının yavaş yazmasıyla dalga geçip ona bir ad takar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.242
    ],
    [
     "uçta",
     0.242,
     0.666
    ],
    [
     "Lakap.",
     0.666,
     1.09
    ],
    [
     "Bundan",
     1.185,
     1.526
    ],
    [
     "sonra",
     1.526,
     1.868
    ],
    [
     "sana",
     1.868,
     2.209
    ],
    [
     "“kaplumbağa”",
     2.209,
     2.892
    ],
    [
     "diyeceğiz,",
     2.892,
     3.575
    ],
    [
     "olur",
     4.26,
     4.548
    ],
    [
     "mu?",
     4.548,
     4.693
    ],
    [
     "Arkadaşının",
     4.693,
     5.414
    ],
    [
     "yavaş",
     5.414,
     5.702
    ],
    [
     "yazmasıyla",
     5.702,
     6.279
    ],
    [
     "dalga",
     6.279,
     6.567
    ],
    [
     "geçip",
     6.567,
     6.856
    ],
    [
     "ona",
     6.856,
     7.144
    ],
    [
     "bir",
     7.144,
     7.289
    ],
    [
     "ad",
     7.289,
     7.433
    ],
    [
     "takar.",
     7.433,
     7.721
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
   "sure": 9.588,
   "m": "Tam kararında Hikmetli. Bence şurayı birlikte düzeltelim; ne dersin? Çekinse de doğruyu nazik bir cümleyle söyler, arkadaşına adıyla seslenir.",
   "k": [
    [
     "Tam",
     0.03,
     0.217
    ],
    [
     "kararında",
     0.217,
     0.964
    ],
    [
     "Hikmetli.",
     0.964,
     1.525
    ],
    [
     "Bence",
     1.83,
     2.138
    ],
    [
     "şurayı",
     2.138,
     2.599
    ],
    [
     "birlikte",
     2.599,
     3.06
    ],
    [
     "düzeltelim;",
     3.06,
     3.675
    ],
    [
     "ne",
     3.81,
     3.98
    ],
    [
     "dersin?",
     3.98,
     4.32
    ],
    [
     "Çekinse",
     4.64,
     5.213
    ],
    [
     "de",
     5.213,
     5.404
    ],
    [
     "doğruyu",
     5.404,
     5.977
    ],
    [
     "nazik",
     5.977,
     6.359
    ],
    [
     "bir",
     6.359,
     6.55
    ],
    [
     "cümleyle",
     6.55,
     7.123
    ],
    [
     "söyler,",
     7.123,
     7.505
    ],
    [
     "arkadaşına",
     7.825,
     8.594
    ],
    [
     "adıyla",
     8.594,
     9.056
    ],
    [
     "seslenir.",
     9.056,
     9.518
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 6.295,
   "m": "Sonra ne olur? Arkadaşları fikri dinler. Hata düzelir ve kimse küçük düşmeden ilerler.",
   "k": [
    [
     "Sonra",
     0.03,
     0.324
    ],
    [
     "ne",
     0.324,
     0.471
    ],
    [
     "olur?",
     0.471,
     0.765
    ],
    [
     "Arkadaşları",
     1.095,
     1.959
    ],
    [
     "fikri",
     1.959,
     2.304
    ],
    [
     "dinler.",
     2.304,
     2.65
    ],
    [
     "Hata",
     2.925,
     3.338
    ],
    [
     "düzelir",
     3.338,
     3.956
    ],
    [
     "ve",
     3.956,
     4.163
    ],
    [
     "kimse",
     4.163,
     4.575
    ],
    [
     "küçük",
     4.575,
     4.988
    ],
    [
     "düşmeden",
     4.988,
     5.606
    ],
    [
     "ilerler.",
     5.606,
     6.225
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
   "sure": 7.088,
   "m": "Arkadaşların bir konuda yanlış bilgi söylüyor. Sen doğrusunu biliyorsun ama konuşmaya çekiniyorsun. Ne yaparsın?",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.75
    ],
    [
     "bir",
     0.75,
     0.894
    ],
    [
     "konuda",
     0.894,
     1.327
    ],
    [
     "yanlış",
     1.327,
     1.615
    ],
    [
     "bilgi",
     1.615,
     1.903
    ],
    [
     "söylüyor.",
     1.903,
     2.335
    ],
    [
     "Sen",
     2.8,
     2.946
    ],
    [
     "doğrusunu",
     2.946,
     3.527
    ],
    [
     "biliyorsun",
     3.527,
     4.109
    ],
    [
     "ama",
     4.109,
     4.401
    ],
    [
     "konuşmaya",
     4.401,
     4.982
    ],
    [
     "çekiniyorsun.",
     4.982,
     5.71
    ],
    [
     "Ne",
     6.5,
     6.63
    ],
    [
     "yaparsın?",
     6.63,
     7.018
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 2.847,
   "m": "Yanlış bilgi sürüyor; ödevde de aynı hata çıkıyor.",
   "k": [
    [
     "Yanlış",
     0.03,
     0.344
    ],
    [
     "bilgi",
     0.344,
     0.659
    ],
    [
     "sürüyor;",
     0.659,
     1.13
    ],
    [
     "ödevde",
     1.3,
     1.703
    ],
    [
     "de",
     1.703,
     1.837
    ],
    [
     "aynı",
     1.837,
     2.106
    ],
    [
     "hata",
     2.106,
     2.374
    ],
    [
     "çıkıyor.",
     2.374,
     2.777
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.691,
   "m": "Arkadaşların alınıyor ve doğrusunu dinlemek de istemiyorlar.",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.811
    ],
    [
     "alınıyor",
     0.811,
     1.435
    ],
    [
     "ve",
     1.435,
     1.591
    ],
    [
     "doğrusunu",
     1.591,
     2.216
    ],
    [
     "dinlemek",
     2.216,
     2.684
    ],
    [
     "de",
     2.684,
     2.84
    ],
    [
     "istemiyorlar.",
     2.84,
     3.621
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 2.687,
   "m": "Birlikte kaynağa bakıyorsunuz ve doğrusu anlaşılıyor.",
   "k": [
    [
     "Birlikte",
     0.03,
     0.418
    ],
    [
     "kaynağa",
     0.418,
     0.806
    ],
    [
     "bakıyorsunuz",
     0.806,
     1.453
    ],
    [
     "ve",
     1.453,
     1.582
    ],
    [
     "doğrusu",
     1.582,
     1.97
    ],
    [
     "anlaşılıyor.",
     1.97,
     2.617
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.717,
   "m": "Sınıfa yeni gelen arkadaşın adı zor söyleniyor. Birkaç kişi ona komik bir ad takmayı konuşuyor. Ne yaparsın?",
   "k": [
    [
     "Sınıfa",
     0.03,
     0.453
    ],
    [
     "yeni",
     0.453,
     0.736
    ],
    [
     "gelen",
     0.736,
     1.018
    ],
    [
     "arkadaşın",
     1.018,
     1.582
    ],
    [
     "adı",
     1.582,
     1.864
    ],
    [
     "zor",
     1.864,
     2.006
    ],
    [
     "söyleniyor.",
     2.006,
     2.57
    ],
    [
     "Birkaç",
     3.085,
     3.381
    ],
    [
     "kişi",
     3.381,
     3.677
    ],
    [
     "ona",
     3.677,
     3.973
    ],
    [
     "komik",
     3.973,
     4.269
    ],
    [
     "bir",
     4.269,
     4.416
    ],
    [
     "ad",
     4.416,
     4.564
    ],
    [
     "takmayı",
     4.564,
     5.008
    ],
    [
     "konuşuyor.",
     5.008,
     5.6
    ],
    [
     "Ne",
     5.985,
     6.151
    ],
    [
     "yaparsın?",
     6.151,
     6.647
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.049,
   "m": "Takma ad yerleşiyor; arkadaşın bu duruma üzülüyor.",
   "k": [
    [
     "Takma",
     0.03,
     0.383
    ],
    [
     "ad",
     0.383,
     0.559
    ],
    [
     "yerleşiyor;",
     0.559,
     1.265
    ],
    [
     "arkadaşın",
     1.58,
     2.046
    ],
    [
     "bu",
     2.046,
     2.163
    ],
    [
     "duruma",
     2.163,
     2.513
    ],
    [
     "üzülüyor.",
     2.513,
     2.979
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.39,
   "m": "Ad herkesçe kullanılıyor; yeni arkadaş sınıfa ısınamıyor.",
   "k": [
    [
     "Ad",
     0.03,
     0.189
    ],
    [
     "herkesçe",
     0.189,
     0.666
    ],
    [
     "kullanılıyor;",
     0.666,
     1.46
    ],
    [
     "yeni",
     1.83,
     2.059
    ],
    [
     "arkadaş",
     2.059,
     2.403
    ],
    [
     "sınıfa",
     2.403,
     2.747
    ],
    [
     "ısınamıyor.",
     2.747,
     3.32
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.714,
   "m": "Arkadaşın adını doğru duyuyor ve kendini daha rahat hissediyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.632
    ],
    [
     "adını",
     0.632,
     1.084
    ],
    [
     "doğru",
     1.084,
     1.385
    ],
    [
     "duyuyor",
     1.385,
     1.837
    ],
    [
     "ve",
     1.837,
     1.988
    ],
    [
     "kendini",
     1.988,
     2.439
    ],
    [
     "daha",
     2.439,
     2.74
    ],
    [
     "rahat",
     2.74,
     3.042
    ],
    [
     "hissediyor.",
     3.042,
     3.644
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
   "sure": 9.23,
   "m": "Bu cümle bilerek çift anlamlı. Alay eden bir şaka yapan biri diyorsa sağ uca yakın. Kimseyi küçük düşürmeyen bir espri yapan biri diyorsa orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.185
    ],
    [
     "cümle",
     0.185,
     0.495
    ],
    [
     "bilerek",
     0.495,
     0.96
    ],
    [
     "çift",
     0.96,
     1.115
    ],
    [
     "anlamlı.",
     1.115,
     1.58
    ],
    [
     "Alay",
     2.125,
     2.421
    ],
    [
     "eden",
     2.421,
     2.718
    ],
    [
     "bir",
     2.718,
     2.866
    ],
    [
     "şaka",
     2.866,
     3.162
    ],
    [
     "yapan",
     3.162,
     3.458
    ],
    [
     "biri",
     3.458,
     3.755
    ],
    [
     "diyorsa",
     3.755,
     4.199
    ],
    [
     "sağ",
     4.199,
     4.347
    ],
    [
     "uca",
     4.347,
     4.644
    ],
    [
     "yakın.",
     4.644,
     4.94
    ],
    [
     "Kimseyi",
     5.345,
     5.803
    ],
    [
     "küçük",
     5.803,
     6.108
    ],
    [
     "düşürmeyen",
     6.108,
     6.719
    ],
    [
     "bir",
     6.719,
     6.871
    ],
    [
     "espri",
     6.871,
     7.176
    ],
    [
     "yapan",
     7.176,
     7.482
    ],
    [
     "biri",
     7.482,
     7.787
    ],
    [
     "diyorsa",
     7.787,
     8.245
    ],
    [
     "orta",
     8.245,
     8.55
    ],
    [
     "uca",
     8.55,
     8.855
    ],
    [
     "yakın.",
     8.855,
     9.16
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
