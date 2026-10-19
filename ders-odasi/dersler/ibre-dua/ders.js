/* İbremetre · Dua — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Beddua · Dua · Aşırı Övgü). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-dua",
 "ad": "Dua: İbren Nerede?",
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
     "huy": "Dua",
     "huyAnahtar": "Dua",
     "olculen": "Birine yönelik dilek ve sözlerim",
     "kanca": "Sana ne dilediğimi biliyorsun.",
     "uclar": {
      "az": "Beddua",
      "orta": "Dua",
      "fazla": "Aşırı Övgü"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Dua",
     "cumle": "Sana ne dilediğimi biliyorsun.",
     "uclar": {
      "az": "Beddua",
      "orta": "Dua",
      "fazla": "Aşırı Övgü"
     },
     "yesil": 0.26,
     "hedefZon": "az",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi öfkeyle arkadaşına kötülük diliyor: sol uca (Beddua) yakın. Başka okumada ona içtenlikle iyilik diliyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, niyete ve ses tonuna bakar. Dua; Allahü teâlâ’ya yalvararak iyilik istemektir. Bu ibre ölçekten çok yönü gösterir: sol uçta öfkeyle kötülük dilemek (Excel’deki adı Beddua), sağ uçta sevilmek için yüze karşı ölçüsüz, abartılı güzel söz söylemek var; ikisi de dilek ve sözün ölçüsünü kaçırır. Üç sahnemiz var: kötü dileme, dua etme, abartılı övme.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Dua",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Beddua",
      "orta": "Dua",
      "fazla": "Aşırı Övgü"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Kızınca kötü dilemek neye benziyor?",
       "ad": "Beddua",
       "soz": "Keşke sen de bir kaybetsen, anlarsın!",
       "eylem": "hayir",
       "zincir": [
        "Arkadaşı üzülür ve kırılır.",
        "Kendi içi de rahat etmez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Çok kızdım; keşke o da benim gibi üzülse.",
          "dogru": true,
          "not": "Beddua, birine kötülük dilemektir. Öfke gelince önce nefes alıp sakinleşmek iyi gelir."
         },
         {
          "m": "Kızdım ama sakinleşip ona da iyilik dilerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: duanın sesi."
         },
         {
          "m": "Ona çok güzel şeyler söylersem beni sever.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: aşırı övgünün sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Beddua",
        "soz": "Keşke"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Kendi"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Abartıyla övmek neye benziyor?",
       "ad": "Abartı",
       "soz": "Sen dünyanın en harika insanısın, kusursuzsun!",
       "eylem": "el-salla",
       "zincir": [
        "Arkadaşı sözlerin içten olup olmadığını anlayamaz.",
        "Gerçek ve güzel sözler de değerini kaybeder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Ona çok güzel şeyler söylersem beni sever.",
          "dogru": true,
          "not": "Abartılı övgü, birini gereğinden fazla övmektir. İçten ve ölçülü güzel söz daha değerlidir."
         },
         {
          "m": "Çok kızdım; keşke o da benim gibi üzülse.",
          "dogru": false,
          "not": "Bu sol ucun sesi: bedduanın sesi."
         },
         {
          "m": "Kızdım ama sakinleşip ona da iyilik dilerim.",
          "dogru": false,
          "not": "Bu orta ucun sesi: duanın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Abartı",
        "soz": "Sen"
       },
       "zincirAnahtar": [
        "Arkadaşı",
        "Gerçek"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Dua",
       "soz": "Allahü teâlâ’dan hepimiz için iyilik isterim.",
       "eylem": "nefes",
       "zincir": [
        "İçi sakinleşir ve yumuşar.",
        "Arkadaşıyla arası da güzel kalır."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Kızsam da önce sakinleşirim, sonra iyilik dilerim.",
          "dogru": true,
          "not": "Dua, Allahü teâlâ’ya yalvararak iyilik istemektir. Kendimiz ve başkaları için güzel şey dilemek içimizi yumuşatır."
         },
         {
          "m": "Çok kızdım; keşke o da benim gibi üzülse.",
          "dogru": false,
          "not": "Bu sol ucun sesi: bedduanın sesi."
         },
         {
          "m": "Ona çok güzel şeyler söylersem beni sever.",
          "dogru": false,
          "not": "Bu sağ ucun sesi: aşırı övgünün sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Dua",
        "soz": "Allahü"
       },
       "zincirAnahtar": [
        "İçi",
        "Arkadaşıyla"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Dua",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Beddua",
      "orta": "Dua",
      "fazla": "Aşırı Övgü"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "oyun",
       "baslik": "Oyunu kaybedince",
       "tetik": "Oyunda arkadaşın seni yendi ve herkes onu alkışlıyor.",
       "secenekler": [
        {
         "m": "Keşke sen de bir kaybetsen, anlarsın!",
         "zon": "az",
         "sonuc": "Söz çıkıyor ama sonra içinde bir sıkıntı kalıyor; arkadaşın da kırılıyor.",
         "not": "İbre sola kaydı: kızgınlıkla kötü dilemek, kırgınlığı büyütüyor.",
         "ses": "s1az"
        },
        {
         "m": "Sen kusursuzsun, dünyanın en iyisisin; hep sen kazan!",
         "zon": "fazla",
         "sonuc": "Arkadaşın şaşırıyor; sözlerin içten gelmiyor gibi duruyor.",
         "not": "İbre sağa kaydı: herkesin içinde abartılı övgü, sözün değerini azaltıyor.",
         "ses": "s1fa"
        },
        {
         "m": "Tebrik ederim, güzel oynadın; hepimize iyilik dilerim.",
         "zon": "orta",
         "sonuc": "Arkadaşın gülümsüyor; sen de rahatlıyorsun.",
         "not": "İbre ortada: içten ve ölçülü güzel söz hem sana hem arkadaşına iyi geliyor.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "sinav",
       "baslik": "Arkadaşının sınavı",
       "tetik": "Arkadaşının yarın önemli bir sınavı var ve ona iyi bir şey söylemek istiyorsun.",
       "secenekler": [
        {
         "m": "Keşke sınavda zorlansa, bana ne.",
         "zon": "az",
         "sonuc": "Arkadaşın bunu hissedip kırılıyor; sen de içinde bir sıkıntı taşıyorsun.",
         "not": "İbre sola kaydı: birine kötülük dilemek içimizi de ağırlaştırıyor.",
         "ses": "s2az"
        },
        {
         "m": "Sen zaten dünyanın en zekisisin; kesin birinci olursun!",
         "zon": "fazla",
         "sonuc": "Arkadaşın üstünde baskı hissediyor; sözün içten gelmiyor gibi duruyor.",
         "not": "İbre sağa kaydı: abartılı övgü, içten bir iyilik dileğinin yerini tutmuyor.",
         "ses": "s2fa"
        },
        {
         "m": "Ona kolaylık dilerim; Allahü teâlâ’dan da kolaylık isterim.",
         "zon": "orta",
         "sonuc": "Arkadaşın gülümsüyor; sen de içten iyilik dilemenin rahatlığını yaşıyorsun.",
         "not": "İbre ortada: iyilik dilemek, hem sana hem arkadaşına iyi geliyor.",
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
       "ad": "Az · Beddua",
       "aciklama": "Kötülük dilemek",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Dua",
       "aciklama": "İçten iyilik dilemek",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Aşırı Övgü",
       "aciklama": "Abartıyla övmek",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Kızınca arkadaşına “keşke sen de bir kaybetsen” der.",
       "alan": "az",
       "ipucu": "Kötülük diliyor."
      },
      {
       "id": "k2",
       "metin": "Arkadaşı sevsin diye yüzüne karşı gereğinden fazla över.",
       "alan": "fazla",
       "ipucu": "Abartılı övüyor."
      },
      {
       "id": "k3",
       "metin": "Arkadaşı için Allahü teâlâ’dan iyilik ister.",
       "alan": "orta",
       "ipucu": "İyilik diliyor."
      },
      {
       "id": "k4",
       "metin": "Tartıştığı arkadaşı için içinden “umarım başarısız olur” der.",
       "alan": "az",
       "ipucu": "Kötülük diliyor."
      },
      {
       "id": "k5",
       "metin": "Herkesin yanında bir arkadaşını sürekli göklere çıkarır.",
       "alan": "fazla",
       "ipucu": "Abartılı övüyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşının başarısına içten ve ölçülü güzel bir söz söyler.",
       "alan": "orta",
       "ipucu": "İçten ve ölçülü."
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
        "Bir arkadaşıma kızınca",
        "Oyunu kaybedince",
        "Biri hakkında güzel bir şey söylerken",
        "Bir arkadaşım zor durumdayken"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Kızınca önce nefes alıp sakinleşeceğim",
        "Arkadaşım için Allahü teâlâ’dan iyilik isteyeceğim",
        "Güzel sözlerimi içten ve ölçülü söyleyeceğim"
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
       "baslik": "Dua",
       "metin": "içten iyilik dilemek",
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
   "sure": 1.752,
   "m": "Sana ne dilediğimi biliyorsun.",
   "k": [
    [
     "Sana",
     0.03,
     0.305
    ],
    [
     "ne",
     0.305,
     0.443
    ],
    [
     "dilediğimi",
     0.443,
     1.131
    ],
    [
     "biliyorsun.",
     1.131,
     1.682
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 11.18,
   "m": "Birçok güzel huy bir ibre gibidir. Dua, birine yönelik dilek ve sözlerimin yönünü ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.425
    ],
    [
     "güzel",
     0.425,
     0.819
    ],
    [
     "huy",
     0.819,
     1.016
    ],
    [
     "bir",
     1.016,
     1.214
    ],
    [
     "ibre",
     1.214,
     1.608
    ],
    [
     "gibidir.",
     1.608,
     2.2
    ],
    [
     "Dua,",
     2.725,
     3.17
    ],
    [
     "birine",
     3.405,
     4.068
    ],
    [
     "yönelik",
     4.068,
     4.732
    ],
    [
     "dilek",
     4.732,
     5.174
    ],
    [
     "ve",
     5.174,
     5.395
    ],
    [
     "sözlerimin",
     5.395,
     6.279
    ],
    [
     "yönünü",
     6.279,
     6.943
    ],
    [
     "ölçer.",
     6.943,
     7.385
    ],
    [
     "İbre",
     7.545,
     7.974
    ],
    [
     "üç",
     7.974,
     8.188
    ],
    [
     "yerde",
     8.188,
     8.617
    ],
    [
     "durabilir:",
     8.617,
     9.475
    ],
    [
     "az,",
     9.74,
     9.882
    ],
    [
     "kararında,",
     9.882,
     10.45
    ],
    [
     "fazla.",
     10.74,
     11.11
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
   "sure": 7.581,
   "m": "Sol uçta Beddua. Keşke sen de bir kaybetsen, anlarsın! Öfkelenince arkadaşına kötü bir şey diler.",
   "k": [
    [
     "Sol",
     0.03,
     0.233
    ],
    [
     "uçta",
     0.233,
     0.64
    ],
    [
     "Beddua.",
     0.64,
     1.25
    ],
    [
     "Keşke",
     1.335,
     1.921
    ],
    [
     "sen",
     1.921,
     2.214
    ],
    [
     "de",
     2.214,
     2.507
    ],
    [
     "bir",
     2.507,
     2.801
    ],
    [
     "kaybetsen,",
     2.801,
     3.68
    ],
    [
     "anlarsın!",
     3.9,
     4.425
    ],
    [
     "Öfkelenince",
     5.065,
     5.829
    ],
    [
     "arkadaşına",
     5.829,
     6.594
    ],
    [
     "kötü",
     6.594,
     6.899
    ],
    [
     "bir",
     6.899,
     7.052
    ],
    [
     "şey",
     7.052,
     7.205
    ],
    [
     "diler.",
     7.205,
     7.511
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 4.293,
   "m": "Sonra ne olur? Arkadaşı üzülür ve kırılır. Kendi içi de rahat etmez.",
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
     "Arkadaşı",
     1.225,
     1.736
    ],
    [
     "üzülür",
     1.736,
     2.119
    ],
    [
     "ve",
     2.119,
     2.247
    ],
    [
     "kırılır.",
     2.247,
     2.63
    ],
    [
     "Kendi",
     3.02,
     3.287
    ],
    [
     "içi",
     3.287,
     3.555
    ],
    [
     "de",
     3.555,
     3.688
    ],
    [
     "rahat",
     3.688,
     3.956
    ],
    [
     "etmez.",
     3.956,
     4.223
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
   "sure": 7.65,
   "m": "Sağ uçta Abartı. Sen dünyanın en harika insanısın, kusursuzsun! Sevsin diye yüzüne karşı gereğinden fazla över.",
   "k": [
    [
     "Sağ",
     0.03,
     0.155
    ],
    [
     "uçta",
     0.155,
     0.405
    ],
    [
     "Abartı.",
     0.405,
     0.78
    ],
    [
     "Sen",
     0.89,
     1.124
    ],
    [
     "dünyanın",
     1.124,
     1.827
    ],
    [
     "en",
     1.827,
     2.061
    ],
    [
     "harika",
     2.061,
     2.763
    ],
    [
     "insanısın,",
     2.763,
     3.7
    ],
    [
     "kusursuzsun!",
     3.94,
     4.615
    ],
    [
     "Sevsin",
     4.825,
     5.149
    ],
    [
     "diye",
     5.149,
     5.473
    ],
    [
     "yüzüne",
     5.473,
     5.959
    ],
    [
     "karşı",
     5.959,
     6.284
    ],
    [
     "gereğinden",
     6.284,
     6.932
    ],
    [
     "fazla",
     6.932,
     7.256
    ],
    [
     "över.",
     7.256,
     7.58
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 7.21,
   "m": "Sonra ne olur? Arkadaşı sözlerin içten olup olmadığını anlayamaz. Gerçek ve güzel sözler de değerini kaybeder.",
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
     1.045,
     1.71
    ],
    [
     "sözlerin",
     1.71,
     2.209
    ],
    [
     "içten",
     2.209,
     2.541
    ],
    [
     "olup",
     2.541,
     2.874
    ],
    [
     "olmadığını",
     2.874,
     3.705
    ],
    [
     "anlayamaz.",
     3.705,
     4.37
    ],
    [
     "Gerçek",
     4.5,
     4.852
    ],
    [
     "ve",
     4.852,
     5.028
    ],
    [
     "güzel",
     5.028,
     5.38
    ],
    [
     "sözler",
     5.38,
     5.732
    ],
    [
     "de",
     5.732,
     5.908
    ],
    [
     "değerini",
     5.908,
     6.612
    ],
    [
     "kaybeder.",
     6.612,
     7.14
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
   "sure": 8.736,
   "m": "Tam kararında Dua. Allahü teâlâ’dan hepimiz için iyilik isterim. Arkadaşına da kendine de güzel şeyler diler.",
   "k": [
    [
     "Tam",
     0.03,
     0.179
    ],
    [
     "kararında",
     0.179,
     0.773
    ],
    [
     "Dua.",
     0.773,
     1.07
    ],
    [
     "Allahü",
     1.205,
     1.877
    ],
    [
     "teâlâ’dan",
     1.877,
     2.774
    ],
    [
     "hepimiz",
     2.774,
     3.447
    ],
    [
     "için",
     3.447,
     3.895
    ],
    [
     "iyilik",
     3.895,
     4.567
    ],
    [
     "isterim.",
     4.567,
     5.24
    ],
    [
     "Arkadaşına",
     5.9,
     6.764
    ],
    [
     "da",
     6.764,
     6.937
    ],
    [
     "kendine",
     6.937,
     7.456
    ],
    [
     "de",
     7.456,
     7.629
    ],
    [
     "güzel",
     7.629,
     7.975
    ],
    [
     "şeyler",
     7.975,
     8.32
    ],
    [
     "diler.",
     8.32,
     8.666
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 4.958,
   "m": "Sonra ne olur? İçi sakinleşir ve yumuşar. Arkadaşıyla arası da güzel kalır.",
   "k": [
    [
     "Sonra",
     0.03,
     0.262
    ],
    [
     "ne",
     0.262,
     0.378
    ],
    [
     "olur?",
     0.378,
     0.61
    ],
    [
     "İçi",
     1.125,
     1.431
    ],
    [
     "sakinleşir",
     1.431,
     2.043
    ],
    [
     "ve",
     2.043,
     2.196
    ],
    [
     "yumuşar.",
     2.196,
     2.655
    ],
    [
     "Arkadaşıyla",
     2.955,
     3.699
    ],
    [
     "arası",
     3.699,
     4.145
    ],
    [
     "da",
     4.145,
     4.293
    ],
    [
     "güzel",
     4.293,
     4.591
    ],
    [
     "kalır.",
     4.591,
     4.888
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
   "sure": 5.574,
   "m": "Oyunda arkadaşın seni yendi ve herkes onu alkışlıyor. Ne yaparsın?",
   "k": [
    [
     "Oyunda",
     0.03,
     0.696
    ],
    [
     "arkadaşın",
     0.696,
     1.584
    ],
    [
     "seni",
     1.584,
     2.028
    ],
    [
     "yendi",
     2.028,
     2.472
    ],
    [
     "ve",
     2.472,
     2.694
    ],
    [
     "herkes",
     2.694,
     3.138
    ],
    [
     "onu",
     3.138,
     3.582
    ],
    [
     "alkışlıyor.",
     3.582,
     4.47
    ],
    [
     "Ne",
     5.565,
     5.59
    ],
    [
     "yaparsın?",
     5.59,
     5.665
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 3.985,
   "m": "Söz çıkıyor ama sonra içinde bir sıkıntı kalıyor; arkadaşın da kırılıyor.",
   "k": [
    [
     "Söz",
     0.03,
     0.171
    ],
    [
     "çıkıyor",
     0.171,
     0.594
    ],
    [
     "ama",
     0.594,
     0.877
    ],
    [
     "sonra",
     0.877,
     1.159
    ],
    [
     "içinde",
     1.159,
     1.582
    ],
    [
     "bir",
     1.582,
     1.723
    ],
    [
     "sıkıntı",
     1.723,
     2.147
    ],
    [
     "kalıyor;",
     2.147,
     2.57
    ],
    [
     "arkadaşın",
     2.99,
     3.401
    ],
    [
     "da",
     3.401,
     3.504
    ],
    [
     "kırılıyor.",
     3.504,
     3.915
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 3.042,
   "m": "Arkadaşın şaşırıyor; sözlerin içten gelmiyor gibi duruyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.507
    ],
    [
     "şaşırıyor;",
     0.507,
     0.985
    ],
    [
     "sözlerin",
     1.15,
     1.571
    ],
    [
     "içten",
     1.571,
     1.851
    ],
    [
     "gelmiyor",
     1.851,
     2.271
    ],
    [
     "gibi",
     2.271,
     2.552
    ],
    [
     "duruyor.",
     2.552,
     2.972
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 2.311,
   "m": "Arkadaşın gülümsüyor; sen de rahatlıyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.54
    ],
    [
     "gülümsüyor;",
     0.54,
     1.05
    ],
    [
     "sen",
     1.36,
     1.486
    ],
    [
     "de",
     1.486,
     1.612
    ],
    [
     "rahatlıyorsun.",
     1.612,
     2.241
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 4.325,
   "m": "Arkadaşının yarın önemli bir sınavı var ve ona iyi bir şey söylemek istiyorsun. Ne yaparsın?",
   "k": [
    [
     "Arkadaşının",
     0.03,
     0.627
    ],
    [
     "yarın",
     0.627,
     0.865
    ],
    [
     "önemli",
     0.865,
     1.223
    ],
    [
     "bir",
     1.223,
     1.342
    ],
    [
     "sınavı",
     1.342,
     1.7
    ],
    [
     "var",
     1.7,
     1.82
    ],
    [
     "ve",
     1.82,
     1.939
    ],
    [
     "ona",
     1.939,
     2.178
    ],
    [
     "iyi",
     2.178,
     2.416
    ],
    [
     "bir",
     2.416,
     2.536
    ],
    [
     "şey",
     2.536,
     2.655
    ],
    [
     "söylemek",
     2.655,
     3.013
    ],
    [
     "istiyorsun.",
     3.013,
     3.49
    ],
    [
     "Ne",
     3.71,
     3.846
    ],
    [
     "yaparsın?",
     3.846,
     4.255
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.644,
   "m": "Arkadaşın bunu hissedip kırılıyor; sen de içinde bir sıkıntı taşıyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.575
    ],
    [
     "bunu",
     0.575,
     0.847
    ],
    [
     "hissedip",
     0.847,
     1.255
    ],
    [
     "kırılıyor;",
     1.255,
     1.8
    ],
    [
     "sen",
     1.94,
     2.066
    ],
    [
     "de",
     2.066,
     2.191
    ],
    [
     "içinde",
     2.191,
     2.569
    ],
    [
     "bir",
     2.569,
     2.694
    ],
    [
     "sıkıntı",
     2.694,
     3.071
    ],
    [
     "taşıyorsun.",
     3.071,
     3.574
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.804,
   "m": "Arkadaşın üstünde baskı hissediyor; sözün içten gelmiyor gibi duruyor.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.601
    ],
    [
     "üstünde",
     0.601,
     1.029
    ],
    [
     "baskı",
     1.029,
     1.314
    ],
    [
     "hissediyor;",
     1.314,
     1.885
    ],
    [
     "sözün",
     2.015,
     2.302
    ],
    [
     "içten",
     2.302,
     2.588
    ],
    [
     "gelmiyor",
     2.588,
     3.018
    ],
    [
     "gibi",
     3.018,
     3.304
    ],
    [
     "duruyor.",
     3.304,
     3.734
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 4.289,
   "m": "Arkadaşın gülümsüyor; sen de içten iyilik dilemenin rahatlığını yaşıyorsun.",
   "k": [
    [
     "Arkadaşın",
     0.03,
     0.53
    ],
    [
     "gülümsüyor;",
     0.53,
     1.03
    ],
    [
     "sen",
     1.275,
     1.422
    ],
    [
     "de",
     1.422,
     1.569
    ],
    [
     "içten",
     1.569,
     1.864
    ],
    [
     "iyilik",
     1.864,
     2.305
    ],
    [
     "dilemenin",
     2.305,
     2.894
    ],
    [
     "rahatlığını",
     2.894,
     3.63
    ],
    [
     "yaşıyorsun.",
     3.63,
     4.219
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
   "sure": 6.818,
   "m": "Bu cümle bilerek çift anlamlı. Öfkeyle söylenirse sol uca yakın. İçtenlikle iyilik dilenirse orta uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.176
    ],
    [
     "cümle",
     0.176,
     0.468
    ],
    [
     "bilerek",
     0.468,
     0.906
    ],
    [
     "çift",
     0.906,
     1.052
    ],
    [
     "anlamlı.",
     1.052,
     1.49
    ],
    [
     "Öfkeyle",
     1.775,
     2.311
    ],
    [
     "söylenirse",
     2.311,
     3.026
    ],
    [
     "sol",
     3.026,
     3.205
    ],
    [
     "uca",
     3.205,
     3.562
    ],
    [
     "yakın.",
     3.562,
     3.92
    ],
    [
     "İçtenlikle",
     4.315,
     4.887
    ],
    [
     "iyilik",
     4.887,
     5.317
    ],
    [
     "dilenirse",
     5.317,
     5.889
    ],
    [
     "orta",
     5.889,
     6.175
    ],
    [
     "uca",
     6.175,
     6.462
    ],
    [
     "yakın.",
     6.462,
     6.748
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
