/* İbremetre · Kanaat — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Uyuşukluk · Kanaat · Mal sevgisi). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-kanaat-uyusukluk",
 "ad": "Kanaat (Uyuşukluk · Mal sevgisi): İbren Nerede?",
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
     "huy": "Kanaat",
     "huyAnahtar": "Kanaat",
     "olculen": "Harekete geçişim ve eşyaya bağlılığım",
     "kanca": "Kalkıp bir şey almama gerek yok.",
     "uclar": {
      "az": "Uyuşukluk",
      "orta": "Kanaat",
      "fazla": "Mal sevgisi"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Kanaat",
     "cumle": "Kalkıp bir şey almama gerek yok.",
     "uclar": {
      "az": "Uyuşukluk",
      "orta": "Kanaat",
      "fazla": "Mal sevgisi"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi üşendiği için yerinden kalkmıyor: sol uca (Uyuşukluk) yakın. Başka okumada elindekiler ona yetiyor ve yeni bir şeye ihtiyaç duymuyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an harekete ve eşyaya nasıl yaklaştığımıza bakar. Kanaat; elindekine razı olup şükretmektir. Faydalı işe kalkmak da eşyaya gönlünü bağlamamak da bu huyun parçasıdır. Bu ibre ölçekten çok yönü gösterir: bir uçta hareketsizlik, öbür uçta paraya ve eşyaya aşırı bağlılık var.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Kanaat",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Uyuşukluk",
      "orta": "Kanaat",
      "fazla": "Mal sevgisi"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Üşenip kıpırdamamak neye benziyor?",
       "ad": "Uyuşukluk",
       "soz": "Çok yoruldum, hiçbir şeye kalkmam.",
       "eylem": "otur",
       "zincir": [
        "İş birikir, oda daha da dağılır.",
        "Yardım edebileceği anlar da elinden kayar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Kıpırdamasam daha iyi; nasılsa idare ederim.",
          "dogru": true,
          "not": "Uyuşukluk, üşengeçlikle hiç harekete geçmemektir. Faydalı işler sırada bekler."
         },
         {
          "m": "Elimdekine şükrederim; kalkıp işime bakayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: kanaatin sesi."
         },
         {
          "m": "Eşyalarım yerinde mi? Hiç kimse dokunmasın!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: mal sevgisinin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Uyuşukluk",
        "soz": "Çok"
       },
       "zincirAnahtar": [
        "İş",
        "Yardım"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Eşyasına çok bağlanan kişi neyi kaçırır?",
       "ad": "Mal-sevgisi",
       "soz": "Eşyalarıma kimse dokunmasın, hepsi benim!",
       "eylem": "isaret",
       "zincir": [
        "Eşyası kadar gönlü de sıkışır.",
        "Arkadaşlık için ayırdığı vakit azalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Kaybolursa üzülürüm; hepsini sıkı saklayayım.",
          "dogru": true,
          "not": "Mal sevgisi, paraya ve eşyaya aşırı bağlanmaktır. Fazla bağlanan, kaybetme endişesiyle rahat edemez."
         },
         {
          "m": "Kıpırdamasam daha iyi; nasılsa idare ederim.",
          "dogru": false,
          "not": "Bu sol ucun sesi: uyuşukluğun sesi."
         },
         {
          "m": "Elimdekine şükrederim; kalkıp işime bakayım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: kanaatin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Mal-sevgisi",
        "soz": "Eşyalarıma"
       },
       "zincirAnahtar": [
        "Eşyası",
        "Arkadaşlık"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Kanaat",
       "soz": "Elimdekiler bana yeter; kalkıp işime bakarım.",
       "eylem": "yuru",
       "zincir": [
        "Zamanını işe ve dostlara ayırır.",
        "Eşyası kaybolsa bile gönlü rahat kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Elimdekine şükrederim; kalkıp işime bakayım.",
          "dogru": true,
          "not": "Kanaat, elindekine razı olup şükretmektir. Hem üşengeçliğe hem eşyaya bağlanmaya mesafe koyar."
         },
         {
          "m": "Kıpırdamasam daha iyi; nasılsa idare ederim.",
          "dogru": false,
          "not": "Bu sol ucun sesi: uyuşukluğun sesi."
         },
         {
          "m": "Eşyalarım yerinde mi? Hiç kimse dokunmasın!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: mal sevgisinin sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Kanaat",
        "soz": "Elimdekiler"
       },
       "zincirAnahtar": [
        "Zamanını",
        "Eşyası"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Kanaat",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Uyuşukluk",
      "orta": "Kanaat",
      "fazla": "Mal sevgisi"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "oda",
       "baslik": "Oda toplama",
       "tetik": "Hafta sonu odanı toplaman gerekiyor. Eşyalarının bir kısmını artık kullanmıyorsun.",
       "secenekler": [
        {
         "m": "Toplamasam da olur; yatağımdan hiç kalkmam.",
         "zon": "az",
         "sonuc": "Oda daha da dağılıyor; aradığını bulamıyorsun.",
         "not": "İbre sola kaydı: üşenmek, küçük işi büyütüyor.",
         "ses": "s1az"
        },
        {
         "m": "Hiçbirini ayırmam; hepsi benim, kimseye de vermem!",
         "zon": "fazla",
         "sonuc": "Oda doluyor; kullanmadığın şeyler yük oluyor.",
         "not": "İbre sağa kaydı: her eşyaya bağlanmak, gönlü de odayı da daraltıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Kalkıp toplarım; kullanmadıklarımı ihtiyacı olana veririm.",
         "zon": "orta",
         "sonuc": "Odan ferahlıyor, bir arkadaşına da faydan dokunuyor.",
         "not": "İbre ortada: elindekine şükrettin, işe koyuldun ve eşyaya bağlanmadın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "fuar",
       "baslik": "Kırtasiye fuarı",
       "tetik": "Okulda kırtasiye fuarı var. Arkadaşların gidiyor; sen odanda oyalanmak istiyorsun.",
       "secenekler": [
        {
         "m": "Gelmem, yerimden kalkmak istemiyorum.",
         "zon": "az",
         "sonuc": "Arkadaşlarınla geçireceğin güzel vakit kaçıyor.",
         "not": "İbre sola kaydı: üşenmek, güzel fırsatları da geçirir.",
         "ses": "s2az"
        },
        {
         "m": "Gelirim; ne varsa hepsini alırım, hepsi benim olsun!",
         "zon": "fazla",
         "sonuc": "Cebin boşalıyor ama gönlün doymuyor; yük artıyor.",
         "not": "İbre sağa kaydı: ne görsem benim olsun demek, eşyayı gönle bağlar.",
         "ses": "s2fa"
        },
        {
         "m": "Gelirim, bakarım; yalnız ihtiyacım olanı alırım.",
         "zon": "orta",
         "sonuc": "Hem arkadaşlarınla vakit geçiriyorsun hem cebin rahat.",
         "not": "İbre ortada: kalktın, gezdin ve elindekine yetinerek karar verdin.",
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
       "ad": "Az · Uyuşukluk",
       "aciklama": "Hiç harekete geçmemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Kanaat",
       "aciklama": "Razı olup harekete geçmek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Mal sevgisi",
       "aciklama": "Eşyaya aşırı bağlanmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Top oynamaya çağrılınca “üşendim” der, koltukta uzanıp kalır.",
       "alan": "az",
       "ipucu": "Harekete geçmeye üşeniyor."
      },
      {
       "id": "k2",
       "metin": "Kumbarasına kimseyi yaklaştırmaz, eşyalarını bir an gözünden ayırmaz.",
       "alan": "fazla",
       "ipucu": "Eşyaya aşırı bağlı."
      },
      {
       "id": "k3",
       "metin": "Bir topu olsa bile keyifle oynar, arkadaşlarıyla paylaşır.",
       "alan": "orta",
       "ipucu": "Elindekiyle mutlu ve hareketli."
      },
      {
       "id": "k4",
       "metin": "Ödevlerini erteleyip bütün gün kanepede yatar.",
       "alan": "az",
       "ipucu": "Hiç kıpırdamıyor."
      },
      {
       "id": "k5",
       "metin": "Yeni eşyasına çizik düşmesin diye oynamaya bile kıyamaz.",
       "alan": "fazla",
       "ipucu": "Eşyası onu esir almış."
      },
      {
       "id": "k6",
       "metin": "Eşyasını özenle kullanır; arkadaşlarıyla oynamak için de yerinden kalkar.",
       "alan": "orta",
       "ipucu": "Eşyasını sever ama bağlanmaz."
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
        "Yapılacak bir iş görünce",
        "Oyuna ya da teneffüse çağrılınca",
        "Yeni bir eşya görünce",
        "Eşyam kaybolur ya da bozulursa"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Bugün bir işe üşenmeden kalkacağım",
        "Eşyalarımı sever ama onlara fazla bağlanmayacağım",
        "Kullanmadığım bir şeyi ihtiyacı olana vereceğim"
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
       "baslik": "Kanaat",
       "metin": "razı olup harekete geçmek",
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
   "sure": 1.794,
   "m": "Kalkıp bir şey almama gerek yok.",
   "k": [
    [
     "Kalkıp",
     0.03,
     0.369
    ],
    [
     "bir",
     0.369,
     0.538
    ],
    [
     "şey",
     0.538,
     0.708
    ],
    [
     "almama",
     0.708,
     1.216
    ],
    [
     "gerek",
     1.216,
     1.555
    ],
    [
     "yok.",
     1.555,
     1.724
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.338,
   "m": "Birçok güzel huy bir ibre gibidir. Kanaat, harekete geçişimi ve eşyalara bağlılığımı ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.434
    ],
    [
     "güzel",
     0.434,
     0.837
    ],
    [
     "huy",
     0.837,
     1.039
    ],
    [
     "bir",
     1.039,
     1.241
    ],
    [
     "ibre",
     1.241,
     1.645
    ],
    [
     "gibidir.",
     1.645,
     2.25
    ],
    [
     "Kanaat,",
     2.565,
     3.26
    ],
    [
     "harekete",
     3.48,
     4.302
    ],
    [
     "geçişimi",
     4.302,
     5.124
    ],
    [
     "ve",
     5.124,
     5.329
    ],
    [
     "eşyalara",
     5.329,
     6.151
    ],
    [
     "bağlılığımı",
     6.151,
     7.179
    ],
    [
     "ölçer.",
     7.179,
     7.59
    ],
    [
     "İbre",
     7.74,
     8.158
    ],
    [
     "üç",
     8.158,
     8.367
    ],
    [
     "yerde",
     8.367,
     8.784
    ],
    [
     "durabilir:",
     8.784,
     9.62
    ],
    [
     "az,",
     9.94,
     10.645
    ],
    [
     "kararında,",
     10.95,
     11.162
    ],
    [
     "fazla.",
     11.162,
     11.268
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
   "sure": 6.878,
   "m": "Sol uçta Uyuşukluk. Çok yoruldum, hiçbir şeye kalkmam. Odanın dağınıklığına bakıp yerinden kıpırdamaz.",
   "k": [
    [
     "Sol",
     0.03,
     0.149
    ],
    [
     "uçta",
     0.149,
     0.386
    ],
    [
     "Uyuşukluk.",
     0.386,
     0.86
    ],
    [
     "Çok",
     1.08,
     1.228
    ],
    [
     "yoruldum,",
     1.228,
     1.67
    ],
    [
     "hiçbir",
     2.19,
     2.38
    ],
    [
     "şeye",
     2.38,
     2.57
    ],
    [
     "kalkmam.",
     2.57,
     2.76
    ],
    [
     "Odanın",
     3.14,
     3.751
    ],
    [
     "dağınıklığına",
     3.751,
     4.974
    ],
    [
     "bakıp",
     4.974,
     5.381
    ],
    [
     "yerinden",
     5.381,
     5.992
    ],
    [
     "kıpırdamaz.",
     5.992,
     6.807
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.042,
   "m": "Sonra ne olur? İş birikir, oda daha da dağılır. Yardım edebileceği anlar da elinden kayar.",
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
     "İş",
     1.075,
     1.224
    ],
    [
     "birikir,",
     1.224,
     1.67
    ],
    [
     "oda",
     1.99,
     2.31
    ],
    [
     "daha",
     2.31,
     2.63
    ],
    [
     "da",
     2.63,
     2.79
    ],
    [
     "dağılır.",
     2.79,
     3.27
    ],
    [
     "Yardım",
     3.59,
     3.888
    ],
    [
     "edebileceği",
     3.888,
     4.781
    ],
    [
     "anlar",
     4.781,
     5.079
    ],
    [
     "da",
     5.079,
     5.228
    ],
    [
     "elinden",
     5.228,
     5.674
    ],
    [
     "kayar.",
     5.674,
     5.972
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
   "sure": 7.142,
   "m": "Sağ uçta Mal-sevgisi. Eşyalarıma kimse dokunmasın, hepsi benim! Kumbarasına kimseyi yaklaştırmaz.",
   "k": [
    [
     "Sağ",
     0.03,
     0.264
    ],
    [
     "uçta",
     0.264,
     0.733
    ],
    [
     "Mal-sevgisi.",
     0.733,
     1.67
    ],
    [
     "Eşyalarıma",
     2.145,
     2.861
    ],
    [
     "kimse",
     2.861,
     3.147
    ],
    [
     "dokunmasın,",
     3.147,
     3.72
    ],
    [
     "hepsi",
     3.905,
     4.21
    ],
    [
     "benim!",
     4.21,
     4.515
    ],
    [
     "Kumbarasına",
     5.125,
     5.936
    ],
    [
     "kimseyi",
     5.936,
     6.423
    ],
    [
     "yaklaştırmaz.",
     6.423,
     7.072
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.621,
   "m": "Sonra ne olur? Eşyası kadar gönlü de sıkışır. Arkadaşlık için ayırdığı vakit azalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.286
    ],
    [
     "ne",
     0.286,
     0.414
    ],
    [
     "olur?",
     0.414,
     0.67
    ],
    [
     "Eşyası",
     1.295,
     1.752
    ],
    [
     "kadar",
     1.752,
     2.056
    ],
    [
     "gönlü",
     2.056,
     2.361
    ],
    [
     "de",
     2.361,
     2.513
    ],
    [
     "sıkışır.",
     2.513,
     2.97
    ],
    [
     "Arkadaşlık",
     3.245,
     3.86
    ],
    [
     "için",
     3.86,
     4.168
    ],
    [
     "ayırdığı",
     4.168,
     4.783
    ],
    [
     "vakit",
     4.783,
     5.09
    ],
    [
     "azalır.",
     5.09,
     5.551
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
   "sure": 9.191,
   "m": "Tam kararında Kanaat. Elimdekiler bana yeter; kalkıp işime bakarım. Eşyasını sever ama gönlünü ona bağlamaz; işine koyulur.",
   "k": [
    [
     "Tam",
     0.03,
     0.205
    ],
    [
     "kararında",
     0.205,
     0.905
    ],
    [
     "Kanaat.",
     0.905,
     1.43
    ],
    [
     "Elimdekiler",
     1.545,
     2.576
    ],
    [
     "bana",
     2.576,
     2.988
    ],
    [
     "yeter;",
     2.988,
     3.4
    ],
    [
     "kalkıp",
     3.835,
     4.098
    ],
    [
     "işime",
     4.098,
     4.491
    ],
    [
     "bakarım.",
     4.491,
     4.885
    ],
    [
     "Eşyasını",
     5.545,
     6.207
    ],
    [
     "sever",
     6.207,
     6.539
    ],
    [
     "ama",
     6.539,
     6.87
    ],
    [
     "gönlünü",
     6.87,
     7.367
    ],
    [
     "ona",
     7.367,
     7.698
    ],
    [
     "bağlamaz;",
     7.698,
     8.195
    ],
    [
     "işine",
     8.46,
     8.791
    ],
    [
     "koyulur.",
     8.791,
     9.121
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 5.604,
   "m": "Sonra ne olur? Zamanını işe ve dostlara ayırır. Eşyası kaybolsa bile gönlü rahat kalır.",
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
     "Zamanını",
     1.08,
     1.635
    ],
    [
     "işe",
     1.635,
     1.913
    ],
    [
     "ve",
     1.913,
     2.052
    ],
    [
     "dostlara",
     2.052,
     2.468
    ],
    [
     "ayırır.",
     2.468,
     2.885
    ],
    [
     "Eşyası",
     3.195,
     3.696
    ],
    [
     "kaybolsa",
     3.696,
     4.197
    ],
    [
     "bile",
     4.197,
     4.532
    ],
    [
     "gönlü",
     4.532,
     4.866
    ],
    [
     "rahat",
     4.866,
     5.2
    ],
    [
     "kalır.",
     5.2,
     5.534
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
   "sure": 5.403,
   "m": "Hafta sonu odanı toplaman gerekiyor. Eşyalarının bir kısmını artık kullanmıyorsun. Ne yaparsın?",
   "k": [
    [
     "Hafta",
     0.03,
     0.291
    ],
    [
     "sonu",
     0.291,
     0.553
    ],
    [
     "odanı",
     0.553,
     0.945
    ],
    [
     "toplaman",
     0.945,
     1.337
    ],
    [
     "gerekiyor.",
     1.337,
     1.86
    ],
    [
     "Eşyalarının",
     2.04,
     2.751
    ],
    [
     "bir",
     2.751,
     2.893
    ],
    [
     "kısmını",
     2.893,
     3.32
    ],
    [
     "artık",
     3.32,
     3.604
    ],
    [
     "kullanmıyorsun.",
     3.604,
     4.315
    ],
    [
     "Ne",
     4.685,
     4.847
    ],
    [
     "yaparsın?",
     4.847,
     5.333
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 2.76,
   "m": "Oda daha da dağılıyor; aradığını bulamıyorsun.",
   "k": [
    [
     "Oda",
     0.03,
     0.307
    ],
    [
     "daha",
     0.307,
     0.583
    ],
    [
     "da",
     0.583,
     0.722
    ],
    [
     "dağılıyor;",
     0.722,
     1.275
    ],
    [
     "aradığını",
     1.685,
     2.187
    ],
    [
     "bulamıyorsun.",
     2.187,
     2.69
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 2.562,
   "m": "Oda doluyor; kullanmadığın şeyler yük oluyor.",
   "k": [
    [
     "Oda",
     0.03,
     0.268
    ],
    [
     "doluyor;",
     0.268,
     0.625
    ],
    [
     "kullanmadığın",
     0.955,
     1.654
    ],
    [
     "şeyler",
     1.654,
     1.933
    ],
    [
     "yük",
     1.933,
     2.073
    ],
    [
     "oluyor.",
     2.073,
     2.492
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 3.052,
   "m": "Odan ferahlıyor, bir arkadaşına da faydan dokunuyor.",
   "k": [
    [
     "Odan",
     0.03,
     0.36
    ],
    [
     "ferahlıyor,",
     0.36,
     1.02
    ],
    [
     "bir",
     1.115,
     1.259
    ],
    [
     "arkadaşına",
     1.259,
     1.977
    ],
    [
     "da",
     1.977,
     2.12
    ],
    [
     "faydan",
     2.12,
     2.407
    ],
    [
     "dokunuyor.",
     2.407,
     2.982
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 5.273,
   "m": "Okulda kırtasiye fuarı var. Arkadaşların gidiyor; sen odanda oyalanmak istiyorsun. Ne yaparsın?",
   "k": [
    [
     "Okulda",
     0.03,
     0.424
    ],
    [
     "kırtasiye",
     0.424,
     0.95
    ],
    [
     "fuarı",
     0.95,
     1.344
    ],
    [
     "var.",
     1.344,
     1.475
    ],
    [
     "Arkadaşların",
     1.675,
     2.322
    ],
    [
     "gidiyor;",
     2.322,
     2.71
    ],
    [
     "sen",
     2.875,
     2.993
    ],
    [
     "odanda",
     2.993,
     3.347
    ],
    [
     "oyalanmak",
     3.347,
     3.818
    ],
    [
     "istiyorsun.",
     3.818,
     4.29
    ],
    [
     "Ne",
     4.62,
     4.766
    ],
    [
     "yaparsın?",
     4.766,
     5.203
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 2.921,
   "m": "Arkadaşlarınla geçireceğin güzel vakit kaçıyor.",
   "k": [
    [
     "Arkadaşlarınla",
     0.03,
     0.97
    ],
    [
     "geçireceğin",
     0.97,
     1.754
    ],
    [
     "güzel",
     1.754,
     2.067
    ],
    [
     "vakit",
     2.067,
     2.381
    ],
    [
     "kaçıyor.",
     2.381,
     2.851
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 4.599,
   "m": "Cebin boşalıyor ama gönlün doymuyor; yük artıyor.",
   "k": [
    [
     "Cebin",
     0.03,
     0.465
    ],
    [
     "boşalıyor",
     0.465,
     1.336
    ],
    [
     "ama",
     1.336,
     1.772
    ],
    [
     "gönlün",
     1.772,
     2.207
    ],
    [
     "doymuyor;",
     2.207,
     2.86
    ],
    [
     "yük",
     3.42,
     3.697
    ],
    [
     "artıyor.",
     3.697,
     4.529
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.071,
   "m": "Hem arkadaşlarınla vakit geçiriyorsun hem cebin rahat.",
   "k": [
    [
     "Hem",
     0.03,
     0.186
    ],
    [
     "arkadaşlarınla",
     0.186,
     1.125
    ],
    [
     "vakit",
     1.125,
     1.437
    ],
    [
     "geçiriyorsun",
     1.437,
     2.219
    ],
    [
     "hem",
     2.219,
     2.376
    ],
    [
     "cebin",
     2.376,
     2.689
    ],
    [
     "rahat.",
     2.689,
     3.001
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
   "sure": 10.335,
   "m": "Bu cümle bilerek çift anlamlı. Üşendiği için kalkmayan biri söylüyorsa sol uca yakın. Elindekiler yettiği için yenisine ihtiyaç duymayan biri söylüyorsa orta uca yakın.",
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
     "Üşendiği",
     1.75,
     2.363
    ],
    [
     "için",
     2.363,
     2.67
    ],
    [
     "kalkmayan",
     2.67,
     3.129
    ],
    [
     "biri",
     3.129,
     3.436
    ],
    [
     "söylüyorsa",
     3.436,
     4.049
    ],
    [
     "sol",
     4.049,
     4.202
    ],
    [
     "uca",
     4.202,
     4.509
    ],
    [
     "yakın.",
     4.509,
     4.815
    ],
    [
     "Elindekiler",
     5.44,
     6.194
    ],
    [
     "yettiği",
     6.194,
     6.646
    ],
    [
     "için",
     6.646,
     6.948
    ],
    [
     "yenisine",
     6.948,
     7.551
    ],
    [
     "ihtiyaç",
     7.551,
     8.003
    ],
    [
     "duymayan",
     8.003,
     8.456
    ],
    [
     "biri",
     8.456,
     8.757
    ],
    [
     "söylüyorsa",
     8.757,
     9.36
    ],
    [
     "orta",
     9.36,
     9.662
    ],
    [
     "uca",
     9.662,
     9.963
    ],
    [
     "yakın.",
     9.963,
     10.265
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
