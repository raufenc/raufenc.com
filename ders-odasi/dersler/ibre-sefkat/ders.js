/* İbremetre · Şefkat — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Duyarsızlık · Şefkat · Şemâtet). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-sefkat",
 "ad": "Şefkat: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "aile": "iliski",
 "muzik": "iliski",
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
     "huy": "Şefkat",
     "huyAnahtar": "Şefkat",
     "olculen": "Başkasının üzüntüsüne yaklaşımım",
     "kanca": "O üzülünce ben gülümsedim.",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Şefkat",
      "fazla": "Şemâtet"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Şefkat",
     "cumle": "O üzülünce ben gülümsedim.",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Şefkat",
      "fazla": "Şemâtet"
     },
     "yesil": 0.26,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi üzülen arkadaşına gülümseyerek moral veriyor: orta uca yakın. Başka okumada onun üzüntüsüne içten içe seviniyor: sağ uca (Şemâtet) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an başkasının üzüntüsüne nasıl yaklaştığımıza bakar. Şefkat; merhamet ve sevgi göstermek, üzülene yanında olduğunu hissettirmektir. Şemâtet ise “daha fazla şefkat” değildir: şefkatte yön karşındakinin iyiliğidir, şemâtette yön değişir ve onun kötü durumuna sevinmeye döner. Bu ibre ölçekten çok yönü gösterir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Şefkat",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Şefkat",
      "fazla": "Şemâtet"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Başkasının duygusunu umursamamak neye benziyor?",
       "ad": "Duyarsızlık",
       "soz": "Ağlıyorsa ağlasın, beni ilgilendirmez.",
       "eylem": "yuru",
       "zincir": [
        "Arkadaşı kendini yapayalnız hisseder.",
        "Kendisi de dostluğun sıcaklığını tadamaz."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Üzüntüsü onun işi; ben karışmayayım.",
          "dogru": true,
          "not": "Duyarsızlık, kimsenin duygusunu umursamamaktır. Yanına gitmek bile bir teselli olabilir."
         },
         {
          "m": "Üzüldü; yanına gidip yardım edeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: şefkatin sesi."
         },
         {
          "m": "İyi oldu, bu sefer üzülen o.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: şemâtetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Duyarsızlık",
        "soz": "Ağlıyorsa"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Kendisi"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Başkasının acısına sevinmek neye benziyor?",
       "ad": "Şemâtet",
       "soz": "Yarışı kaybetti, içimden sevindim.",
       "eylem": "isaret",
       "zincir": [
        "Gizli sevinç kalbini hafifletmez.",
        "Oyun arkadaşlığı da yavaş yavaş zayıflar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "İyi oldu, bu sefer üzülen o.",
          "dogru": true,
          "not": "Şemâtet, başkasının acısına gizlice sevinmektir. Rekabet olabilir; ama biri üzülürken sevinmek kalbi ağırlaştırır."
         },
         {
          "m": "Üzüntüsü onun işi; ben karışmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: duyarsızlığın sesi."
         },
         {
          "m": "Üzüldü; yanına gidip yardım edeyim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: şefkatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Şemâtet",
        "soz": "Yarışı"
       },
       "zincirAnahtar": [
        "Gizli",
        "Oyun"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Şefkat",
       "soz": "Üzüldüğünü görüyorum; yanındayım.",
       "eylem": "konus",
       "zincir": [
        "Arkadaşı yalnız olmadığını anlar.",
        "Dostluk daha da güçlenir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Üzüldü; yanına gidip yardım edeyim.",
          "dogru": true,
          "not": "Şefkat, merhamet ve sevgi göstermektir. Çözümün olmasa bile yanında olmak iyi gelir."
         },
         {
          "m": "Üzüntüsü onun işi; ben karışmayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: duyarsızlığın sesi."
         },
         {
          "m": "İyi oldu, bu sefer üzülen o.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: şemâtetin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Şefkat",
        "soz": "Üzüldüğünü"
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
     "huy": "Şefkat",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Duyarsızlık",
      "orta": "Şefkat",
      "fazla": "Şemâtet"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "yaris",
       "baslik": "Koşu yarışı",
       "tetik": "Okulda koşu yarışı yapılıyor. En yakın rakibin düştü ve kenara oturdu.",
       "secenekler": [
        {
         "m": "Ben bitireyim, ona bakmam bile.",
         "zon": "az",
         "sonuc": "Rakibin yalnız kalıyor; ikiniz de yarışın tadını çıkaramıyorsunuz.",
         "not": "İbre sola kaydı: duyarsız kalmak, yanındakinin ihtiyacını görmeyi engelliyor.",
         "ses": "s1az"
        },
        {
         "m": "İyi oldu, artık rakibim kalmadı!",
         "zon": "fazla",
         "sonuc": "İçindeki sevinç yarışın tadını gölgeliyor; arkadaşların bunu hissedebilir.",
         "not": "İbre sağa kaydı: sevgi yerine onun düşmesine sevinmek geldi.",
         "ses": "s1fa"
        },
        {
         "m": "İyi misin? Kımıldama, hemen öğretmeni çağırıyorum.",
         "zon": "orta",
         "sonuc": "Öğretmen geliyor; rakibin yalnız kalmıyor.",
         "not": "İbre ortada: yarışın ortasında bile merhamet gösterdin.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "kotunot",
       "baslik": "Kötü not",
       "tetik": "Arkadaşın sınavdan çok düşük not aldı ve sessizce başını önüne eğdi.",
       "secenekler": [
        {
         "m": "Notu kendi sorunu; yanına gitmem.",
         "zon": "az",
         "sonuc": "Arkadaşın üzüntüsüyle baş başa kalıyor.",
         "not": "İbre sola kaydı: duyguyu görmemek onu yalnız bırakıyor.",
         "ses": "s2az"
        },
        {
         "m": "Sınıfta benden yüksek not alan kalmadı, iyi oldu.",
         "zon": "fazla",
         "sonuc": "İçindeki sevinç, arkadaşlığı sessizce soğutuyor.",
         "not": "İbre sağa kaydı: başkasının üzüntüsüne sevinmek dostluğu zedeliyor.",
         "ses": "s2fa"
        },
        {
         "m": "Üzülme, birlikte çalışırsak bir dahaki sefer düzelir.",
         "zon": "orta",
         "sonuc": "Arkadaşın başını kaldırıyor; birlikte çalışmaya karar veriyorsunuz.",
         "not": "İbre ortada: merhamet ve sevgi, çözüm için yol açtı.",
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
       "ad": "Az · Duyarsızlık",
       "aciklama": "Üzüntüyü umursamamak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Şefkat",
       "aciklama": "Merhamet ve sevgi göstermek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Şemâtet",
       "aciklama": "Acıya gizlice sevinmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Oyunda düşen arkadaşına bakıp yoluna devam eder.",
       "alan": "az",
       "ipucu": "Yardıma ihtiyacı görmüyor."
      },
      {
       "id": "k2",
       "metin": "Rakibi sınavda düşük not alınca içinden “iyi oldu” der.",
       "alan": "fazla",
       "ipucu": "Üzüntüye gizlice seviniyor."
      },
      {
       "id": "k3",
       "metin": "Ağlayan arkadaşının yanına oturup dinler.",
       "alan": "orta",
       "ipucu": "Merhamet ve sevgi gösteriyor."
      },
      {
       "id": "k4",
       "metin": "Üzgün birini fark etse bile hiçbir şey demeden yoluna bakar.",
       "alan": "az",
       "ipucu": "Duyguyu umursamıyor."
      },
      {
       "id": "k5",
       "metin": "Yarışta kaybeden arkadaşına gizlice sırıtır.",
       "alan": "fazla",
       "ipucu": "Kaybına seviniyor."
      },
      {
       "id": "k6",
       "metin": "Kaybeden arkadaşına “bir dahaki sefer birlikte çalışalım” der.",
       "alan": "orta",
       "ipucu": "Teselli edip yanında duruyor."
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
        "Bir arkadaşım düşünce",
        "Yarışta rakibim kaybedince",
        "Birinin üzgün olduğunu görünce",
        "Sınıfta biri kötü not alınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Üzgün birine “nasılsın?” diye soracağım",
        "İçimden kötü bir sevinç gelirse farkına varıp ona yardım edeceğim",
        "Gerekirse güvendiğim bir yetişkine de haber vereceğim"
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
       "baslik": "Şefkat",
       "metin": "merhamet ve sevgi göstermek",
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
   "sure": 2.052,
   "m": "O üzülünce ben gülümsedim.",
   "k": [
    [
     "O",
     0.03,
     0.225
    ],
    [
     "üzülünce",
     0.225,
     1.006
    ],
    [
     "ben",
     1.006,
     1.201
    ],
    [
     "gülümsedim.",
     1.201,
     1.982
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 12.085,
   "m": "Birçok güzel huy bir ibre gibidir. Şefkat, başkasının üzüntüsüne nasıl yaklaştığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.417
    ],
    [
     "güzel",
     0.417,
     0.805
    ],
    [
     "huy",
     0.805,
     0.998
    ],
    [
     "bir",
     0.998,
     1.192
    ],
    [
     "ibre",
     1.192,
     1.579
    ],
    [
     "gibidir.",
     1.579,
     2.16
    ],
    [
     "Şefkat,",
     2.87,
     3.38
    ],
    [
     "başkasının",
     3.535,
     4.519
    ],
    [
     "üzüntüsüne",
     4.519,
     5.75
    ],
    [
     "nasıl",
     5.75,
     6.242
    ],
    [
     "yaklaştığımı",
     6.242,
     7.473
    ],
    [
     "ölçer.",
     7.473,
     7.965
    ],
    [
     "İbre",
     8.125,
     8.588
    ],
    [
     "üç",
     8.588,
     8.82
    ],
    [
     "yerde",
     8.82,
     9.283
    ],
    [
     "durabilir:",
     9.283,
     10.21
    ],
    [
     "az,",
     10.55,
     10.688
    ],
    [
     "kararında,",
     10.688,
     11.24
    ],
    [
     "fazla.",
     11.63,
     12.015
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
   "sure": 8.858,
   "m": "Sol uçta Duyarsızlık. Ağlıyorsa ağlasın, beni ilgilendirmez. Üzülen arkadaşının yanından hiçbir şey demeden geçer.",
   "k": [
    [
     "Sol",
     0.03,
     0.264
    ],
    [
     "uçta",
     0.264,
     0.733
    ],
    [
     "Duyarsızlık.",
     0.733,
     1.67
    ],
    [
     "Ağlıyorsa",
     1.755,
     2.666
    ],
    [
     "ağlasın,",
     2.666,
     3.35
    ],
    [
     "beni",
     3.71,
     3.989
    ],
    [
     "ilgilendirmez.",
     3.989,
     4.685
    ],
    [
     "Üzülen",
     5.285,
     5.838
    ],
    [
     "arkadaşının",
     5.838,
     6.76
    ],
    [
     "yanından",
     6.76,
     7.313
    ],
    [
     "hiçbir",
     7.313,
     7.682
    ],
    [
     "şey",
     7.682,
     7.866
    ],
    [
     "demeden",
     7.866,
     8.419
    ],
    [
     "geçer.",
     8.419,
     8.788
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 5.818,
   "m": "Sonra ne olur? Arkadaşı kendini yapayalnız hisseder. Kendisi de dostluğun sıcaklığını tadamaz.",
   "k": [
    [
     "Sonra",
     0.03,
     0.27
    ],
    [
     "ne",
     0.27,
     0.39
    ],
    [
     "olur?",
     0.39,
     0.63
    ],
    [
     "Arkadaşı",
     1.25,
     1.78
    ],
    [
     "kendini",
     1.78,
     2.178
    ],
    [
     "yapayalnız",
     2.178,
     2.708
    ],
    [
     "hisseder.",
     2.708,
     3.105
    ],
    [
     "Kendisi",
     3.645,
     4.066
    ],
    [
     "de",
     4.066,
     4.206
    ],
    [
     "dostluğun",
     4.206,
     4.626
    ],
    [
     "sıcaklığını",
     4.626,
     5.327
    ],
    [
     "tadamaz.",
     5.327,
     5.748
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
   "sure": 6.226,
   "m": "Sağ uçta Şemâtet. Yarışı kaybetti, içimden sevindim. Rakibi üzülürken gizlice sevinir.",
   "k": [
    [
     "Sağ",
     0.03,
     0.217
    ],
    [
     "uçta",
     0.217,
     0.59
    ],
    [
     "Şemâtet.",
     0.59,
     1.15
    ],
    [
     "Yarışı",
     1.285,
     1.88
    ],
    [
     "kaybetti,",
     1.88,
     2.475
    ],
    [
     "içimden",
     2.555,
     3.17
    ],
    [
     "sevindim.",
     3.17,
     3.785
    ],
    [
     "Rakibi",
     4.155,
     4.617
    ],
    [
     "üzülürken",
     4.617,
     5.232
    ],
    [
     "gizlice",
     5.232,
     5.694
    ],
    [
     "sevinir.",
     5.694,
     6.156
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 6.816,
   "m": "Sonra ne olur? Gizli sevinç kalbini hafifletmez. Oyun arkadaşlığı da yavaş yavaş zayıflar.",
   "k": [
    [
     "Sonra",
     0.03,
     0.306
    ],
    [
     "ne",
     0.306,
     0.444
    ],
    [
     "olur?",
     0.444,
     0.72
    ],
    [
     "Gizli",
     1.24,
     1.695
    ],
    [
     "sevinç",
     1.695,
     2.149
    ],
    [
     "kalbini",
     2.149,
     2.831
    ],
    [
     "hafifletmez.",
     2.831,
     3.74
    ],
    [
     "Oyun",
     3.99,
     4.357
    ],
    [
     "arkadaşlığı",
     4.357,
     5.276
    ],
    [
     "da",
     5.276,
     5.46
    ],
    [
     "yavaş",
     5.46,
     5.827
    ],
    [
     "yavaş",
     5.827,
     6.195
    ],
    [
     "zayıflar.",
     6.195,
     6.746
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
   "sure": 7.969,
   "m": "Tam kararında Şefkat. Üzüldüğünü görüyorum; yanındayım. Yanına oturur, dinler ve elinden geleni yapar.",
   "k": [
    [
     "Tam",
     0.03,
     0.257
    ],
    [
     "kararında",
     0.257,
     1.166
    ],
    [
     "Şefkat.",
     1.166,
     1.62
    ],
    [
     "Üzüldüğünü",
     2.19,
     2.704
    ],
    [
     "görüyorum;",
     2.704,
     3.115
    ],
    [
     "yanındayım.",
     3.51,
     3.965
    ],
    [
     "Yanına",
     4.55,
     5.008
    ],
    [
     "oturur,",
     5.008,
     5.465
    ],
    [
     "dinler",
     5.61,
     6.026
    ],
    [
     "ve",
     6.026,
     6.234
    ],
    [
     "elinden",
     6.234,
     6.859
    ],
    [
     "geleni",
     6.859,
     7.483
    ],
    [
     "yapar.",
     7.483,
     7.899
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 4.813,
   "m": "Sonra ne olur? Arkadaşı yalnız olmadığını anlar. Dostluk daha da güçlenir.",
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
     "Arkadaşı",
     1.08,
     1.852
    ],
    [
     "yalnız",
     1.852,
     2.238
    ],
    [
     "olmadığını",
     2.238,
     3.204
    ],
    [
     "anlar.",
     3.204,
     3.59
    ],
    [
     "Dostluk",
     3.79,
     4.028
    ],
    [
     "daha",
     4.028,
     4.266
    ],
    [
     "da",
     4.266,
     4.386
    ],
    [
     "güçlenir.",
     4.386,
     4.743
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
   "sure": 5.081,
   "m": "Okulda koşu yarışı yapılıyor. En yakın rakibin düştü ve kenara oturdu. Ne yaparsın?",
   "k": [
    [
     "Okulda",
     0.03,
     0.372
    ],
    [
     "koşu",
     0.372,
     0.601
    ],
    [
     "yarışı",
     0.601,
     0.943
    ],
    [
     "yapılıyor.",
     0.943,
     1.4
    ],
    [
     "En",
     1.85,
     1.992
    ],
    [
     "yakın",
     1.992,
     2.276
    ],
    [
     "rakibin",
     2.276,
     2.702
    ],
    [
     "düştü",
     2.702,
     2.986
    ],
    [
     "ve",
     2.986,
     3.128
    ],
    [
     "kenara",
     3.128,
     3.554
    ],
    [
     "oturdu.",
     3.554,
     3.98
    ],
    [
     "Ne",
     4.415,
     4.564
    ],
    [
     "yaparsın?",
     4.564,
     5.011
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.134,
   "m": "Rakibin yalnız kalıyor; ikiniz de yarışın tadını çıkaramıyorsunuz.",
   "k": [
    [
     "Rakibin",
     0.03,
     0.531
    ],
    [
     "yalnız",
     0.531,
     0.864
    ],
    [
     "kalıyor;",
     0.864,
     1.365
    ],
    [
     "ikiniz",
     1.615,
     2.047
    ],
    [
     "de",
     2.047,
     2.191
    ],
    [
     "yarışın",
     2.191,
     2.624
    ],
    [
     "tadını",
     2.624,
     3.056
    ],
    [
     "çıkaramıyorsunuz.",
     3.056,
     4.064
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.303,
   "m": "İçindeki sevinç yarışın tadını gölgeliyor; arkadaşların bunu hissedebilir.",
   "k": [
    [
     "İçindeki",
     0.03,
     0.583
    ],
    [
     "sevinç",
     0.583,
     0.859
    ],
    [
     "yarışın",
     0.859,
     1.273
    ],
    [
     "tadını",
     1.273,
     1.688
    ],
    [
     "gölgeliyor;",
     1.688,
     2.24
    ],
    [
     "arkadaşların",
     2.62,
     3.292
    ],
    [
     "bunu",
     3.292,
     3.561
    ],
    [
     "hissedebilir.",
     3.561,
     4.233
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 2.906,
   "m": "Öğretmen geliyor; rakibin yalnız kalmıyor.",
   "k": [
    [
     "Öğretmen",
     0.03,
     0.478
    ],
    [
     "geliyor;",
     0.478,
     0.925
    ],
    [
     "rakibin",
     1.27,
     1.857
    ],
    [
     "yalnız",
     1.857,
     2.249
    ],
    [
     "kalmıyor.",
     2.249,
     2.836
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.964,
   "m": "Arkadaşın sınavdan çok düşük not aldı ve sessizce başını önüne eğdi. Ne yaparsın?",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.659
    ],
    [
     "sınavdan",
     0.659,
     1.13
    ],
    [
     "çok",
     1.13,
     1.288
    ],
    [
     "düşük",
     1.288,
     1.602
    ],
    [
     "not",
     1.602,
     1.759
    ],
    [
     "aldı",
     1.759,
     2.074
    ],
    [
     "ve",
     2.074,
     2.231
    ],
    [
     "sessizce",
     2.231,
     2.702
    ],
    [
     "başını",
     2.702,
     3.174
    ],
    [
     "önüne",
     3.174,
     3.646
    ],
    [
     "eğdi.",
     3.646,
     3.96
    ],
    [
     "Ne",
     4.33,
     4.471
    ],
    [
     "yaparsın?",
     4.471,
     4.894
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.489,
   "m": "Arkadaşın üzüntüsüyle baş başa kalıyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.667
    ],
    [
     "üzüntüsüyle",
     0.667,
     1.463
    ],
    [
     "baş",
     1.463,
     1.623
    ],
    [
     "başa",
     1.623,
     1.941
    ],
    [
     "kalıyor.",
     1.941,
     2.419
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.356,
   "m": "İçindeki sevinç, arkadaşlığı sessizce soğutuyor.",
   "k": [
    [
     "İçindeki",
     0.03,
     0.673
    ],
    [
     "sevinç,",
     0.673,
     0.995
    ],
    [
     "arkadaşlığı",
     1.255,
     2.101
    ],
    [
     "sessizce",
     2.101,
     2.609
    ],
    [
     "soğutuyor.",
     2.609,
     3.286
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.844,
   "m": "Arkadaşın başını kaldırıyor; birlikte çalışmaya karar veriyorsunuz.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.479
    ],
    [
     "başını",
     0.479,
     0.816
    ],
    [
     "kaldırıyor;",
     0.816,
     1.265
    ],
    [
     "birlikte",
     1.525,
     2.007
    ],
    [
     "çalışmaya",
     2.007,
     2.649
    ],
    [
     "karar",
     2.649,
     2.971
    ],
    [
     "veriyorsunuz.",
     2.971,
     3.774
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
   "sure": 9.087,
   "m": "Bu cümle bilerek çift anlamlı. Üzülen arkadaşına gülümseyip moral veren biri söylüyorsa orta uca yakın. Onun üzüntüsüne gizlice seviniyorsa sağ uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.173
    ],
    [
     "cümle",
     0.173,
     0.459
    ],
    [
     "bilerek",
     0.459,
     0.888
    ],
    [
     "çift",
     0.888,
     1.031
    ],
    [
     "anlamlı.",
     1.031,
     1.46
    ],
    [
     "Üzülen",
     1.76,
     2.18
    ],
    [
     "arkadaşına",
     2.18,
     2.88
    ],
    [
     "gülümseyip",
     2.88,
     3.44
    ],
    [
     "moral",
     3.44,
     3.72
    ],
    [
     "veren",
     3.72,
     4.0
    ],
    [
     "biri",
     4.0,
     4.28
    ],
    [
     "söylüyorsa",
     4.28,
     4.84
    ],
    [
     "orta",
     4.84,
     5.12
    ],
    [
     "uca",
     5.12,
     5.4
    ],
    [
     "yakın.",
     5.4,
     5.68
    ],
    [
     "Onun",
     5.93,
     6.239
    ],
    [
     "üzüntüsüne",
     6.239,
     7.011
    ],
    [
     "gizlice",
     7.011,
     7.474
    ],
    [
     "seviniyorsa",
     7.474,
     8.245
    ],
    [
     "sağ",
     8.245,
     8.4
    ],
    [
     "uca",
     8.4,
     8.709
    ],
    [
     "yakın.",
     8.709,
     9.017
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
