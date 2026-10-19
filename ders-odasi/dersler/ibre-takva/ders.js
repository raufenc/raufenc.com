/* İbremetre · Takvâ — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir; anlatım ses/ klasöründeki kısa kayıtlarla (Emmett) kelimeye kilitli oynar.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Ruhbâniyet · Takvâ · Hevâ). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-takva",
 "ad": "Takvâ: İbren Nerede?",
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
     "huy": "Takvâ",
     "huyAnahtar": "Takvâ",
     "olculen": "İsteklerime yön verme biçimim",
     "kanca": "Canım ne isterse onu yapmam.",
     "uclar": {
      "az": "Ruhbâniyet",
      "orta": "Takvâ",
      "fazla": "Hevâ"
     },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.26
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Takvâ",
     "cumle": "Canım ne isterse onu yapmam.",
     "uclar": {
      "az": "Ruhbâniyet",
      "orta": "Takvâ",
      "fazla": "Hevâ"
     },
     "yesil": 0.26,
     "hedefZon": "orta",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi canının her isteğini hemen yapmıyor ve yanlış olandan kendini alıkoyuyor: orta uca yakın. Başka okumada hiçbir isteğine, güzel ve helâl olanlara bile izin vermiyor: sol uca (Ruhbâniyet) yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, isteklerimize nasıl yön verdiğimize bakar. Takvâ; Allahü teâlâ’ya saygıyla yasaklardan sakınmaktır, güzel şeylerden yararlanmayı bırakmak değildir. Neyin serbest, neyin yasak olduğunu güvendiğin bir büyüğe ya da hocana sormak en doğrusudur.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Takvâ",
     "baslik": "Üç kapı",
     "yonerge": "Merak ettiğin kapıyı aç. Her kapıda kısa bir sahne var; bir kapıdan sonra devam edebilirsin.",
     "uclar": {
      "az": "Ruhbâniyet",
      "orta": "Takvâ",
      "fazla": "Hevâ"
     },
     "yesil": 0.26,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Güzel şeylerden bile uzak durmak neye benziyor?",
       "ad": "Ruhbâniyet",
       "soz": "Hiçbir güzel şeye dokunmam, hepsinden uzak durayım.",
       "eylem": "hayir",
       "zincir": [
        "Arkadaşlarının neşesinden uzak kalır.",
        "Helâl olan güzel şeylerin tadını da bilemez."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Her güzel şey tehlikeli; hepsini kendime yasaklayayım.",
          "dogru": true,
          "not": "Ruhbâniyet, verilen güzel şeylerin tamamından uzak durmaktır. Takvâ ise yasaklardan sakınıp helâl olanın tadını çıkarmaktır."
         },
         {
          "m": "Yanlış olandan sakınırım; helâl olanın tadını çıkarırım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: takvânın sesi."
         },
         {
          "m": "Canım çekti, yaparım; doğru mu yanlış mı düşünmem!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hevânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Ruhbâniyet",
        "soz": "Hiçbir"
       },
       "zincirAnahtar": [
        "Arkadaşlarının",
        "Helâl"
       ]
      },
      {
       "zon": "fazla",
       "soru": "Canının istediğini hemen yapan kişi neyi kaçırır?",
       "ad": "Hevâ",
       "soz": "Canım çekti, yaparım; doğru mu yanlış mı düşünmem!",
       "eylem": "isaret",
       "zincir": [
        "Başkasının hakkına girdiğini fark etmez.",
        "Pişmanlık sonradan kapıyı çalar."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "İstiyorum, hemen yapacağım; ölçüye ne gerek var!",
          "dogru": true,
          "not": "Hevâ-yı nefs, canı ne isterse doğru mu yanlış mı demeden yapmaktır. Ölçü kaybolunca hata kolaylaşır."
         },
         {
          "m": "Her güzel şey tehlikeli; hepsini kendime yasaklayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ruhbâniyetin sesi."
         },
         {
          "m": "Yanlış olandan sakınırım; helâl olanın tadını çıkarırım.",
          "dogru": false,
          "not": "Bu orta ucun sesi: takvânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Hevâ",
        "soz": "Canım"
       },
       "zincirAnahtar": [
        "Başkasının",
        "Pişmanlık"
       ]
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Takvâ",
       "soz": "Yanlış olduğunu biliyorum; Allahü teâlâ için sakınırım.",
       "eylem": "dusun",
       "zincir": [
        "İçi huzurla dolar.",
        "Doğru seçimin güvenini hisseder."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         {
          "m": "Yanlış olandan sakınırım; helâl olanın tadını çıkarırım.",
          "dogru": true,
          "not": "Takvâ, Allahü teâlâ’ya saygıyla yasaklardan sakınmaktır. Serbest ve güzel olan şeylerden de yararlanılır."
         },
         {
          "m": "Her güzel şey tehlikeli; hepsini kendime yasaklayayım.",
          "dogru": false,
          "not": "Bu sol ucun sesi: ruhbâniyetin sesi."
         },
         {
          "m": "Canım çekti, yaparım; doğru mu yanlış mı düşünmem!",
          "dogru": false,
          "not": "Bu sağ ucun sesi: hevânın sesi."
         }
        ]
       },
       "anahtar": {
        "ad": "Takvâ",
        "soz": "Yanlış"
       },
       "zincirAnahtar": [
        "İçi",
        "Doğru"
       ]
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Takvâ",
     "baslik": "Sen olsan?",
     "uclar": {
      "az": "Ruhbâniyet",
      "orta": "Takvâ",
      "fazla": "Hevâ"
     },
     "yesil": 0.26,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "sira",
       "baslik": "Teneffüste sıra",
       "tetik": "Teneffüste arkadaşların oyun oynuyor ve ikram paylaşıyor. Sırada bekleyen arkadaşının önüne geçip oyuna hemen girebilirsin; kimse bakmıyor.",
       "secenekler": [
        {
         "m": "Her şey tehlikeli; teneffüste bir şey yemem, hiçbir oyuna katılmam.",
         "zon": "az",
         "sonuc": "Arkadaşlarından ve güzel ikramlardan uzak kalıyorsun; teneffüsün tadı kaçıyor.",
         "not": "İbre sola kaydı: her güzel şeyden kaçmak sakınmak değildir, helâl olanı da kendine yasaklamaktır.",
         "ses": "s1az"
        },
        {
         "m": "Canım istedi; sırayı bozup ilk ben girerim, kim ne diyecek!",
         "zon": "fazla",
         "sonuc": "Sırada bekleyen arkadaşın üzülüyor; sen de içinde bir huzursuzluk taşıyorsun.",
         "not": "İbre sağa kaydı: canının istediğine hemen uymak, başkasının hakkını görmeyi unutturur.",
         "ses": "s1fa"
        },
        {
         "m": "Sırayı beklerim; sıram gelince ikramın da oyunun da tadını çıkarırım.",
         "zon": "orta",
         "sonuc": "Sıranı bekledin; Allahü teâlâ’ya saygıyla hakka dikkat ettin, oyunun da keyfini çıkarıyorsun.",
         "not": "İbre ortada: istek gelse de doğru olanı seçtin, serbest olanın tadını da kaçırmadın.",
         "ses": "s1or"
        }
       ],
       "ses": "s1"
      },
      {
       "id": "soz",
       "baslik": "Arkadaş sohbeti",
       "tetik": "Arkadaşların birinin arkasından kötü konuşuyor ve sana da “Sen ne dersin?” diye soruyor.",
       "secenekler": [
        {
         "m": "Güzel sohbetler bile tehlikeli; hiçbirine katılmam.",
         "zon": "az",
         "sonuc": "Arkadaşlarından uzaklaşıyorsun; sohbetlerin güzel yanları da kaçıyor.",
         "not": "İbre sola kaydı: konuşmaktan büsbütün kaçmak, güzel konuşmayı da engeller.",
         "ses": "s2az"
        },
        {
         "m": "Ben de canım ne isterse söylerim, ne çıkar ki!",
         "zon": "fazla",
         "sonuc": "Söz ağızdan çıkınca arkadaşın üzülüyor; sen de pişman oluyorsun.",
         "not": "İbre sağa kaydı: aklına gelen her şeyi söylemek, birini kırabilir.",
         "ses": "s2fa"
        },
        {
         "m": "Katılmam; nazikçe konuyu değiştiririm, kimseyi üzmem.",
         "zon": "orta",
         "sonuc": "Konu değişiyor; sen de arkadaşların da rahatlıyorsunuz.",
         "not": "İbre ortada: yasak olan sözden sakındın, sohbetin tadını bozmadın.",
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
       "ad": "Az · Ruhbâniyet",
       "aciklama": "Güzel şeylerden bile kaçmak",
       "ikon": "kilit",
       "renk": "#4262B0"
      },
      {
       "id": "orta",
       "ad": "Kararında · Takvâ",
       "aciklama": "Yasaktan sakınıp serbestten yararlanmak",
       "ikon": "muhur",
       "renk": "#17998A"
      },
      {
       "id": "fazla",
       "ad": "Fazla · Hevâ",
       "aciklama": "Canının istediğini hemen yapmak",
       "ikon": "uyari",
       "renk": "#E0674F"
      }
     ],
     "kartlar": [
      {
       "id": "k1",
       "metin": "Hiçbir eğlenceye katılmaz, helâl olanlara bile “hayır” der.",
       "alan": "az",
       "ipucu": "Her şeyi kendine yasaklıyor."
      },
      {
       "id": "k2",
       "metin": "Canı çekince başkasının eşyasını izinsiz alır.",
       "alan": "fazla",
       "ipucu": "İsteğine ölçü koymuyor."
      },
      {
       "id": "k3",
       "metin": "Canı çekse de başkasının hakkına girmekten kendini alıkoyar.",
       "alan": "orta",
       "ipucu": "Yasaktan sakınıyor."
      },
      {
       "id": "k4",
       "metin": "Güzel bir yemeği bile “ben yemem” diyerek geri çevirip herkesten uzak durur.",
       "alan": "az",
       "ipucu": "Helâl olanı da kendine yasaklıyor."
      },
      {
       "id": "k5",
       "metin": "Canı sıkılınca sınıfta düzeni bozar: “Canım istedi!”",
       "alan": "fazla",
       "ipucu": "Canına uyup düzeni bozuyor."
      },
      {
       "id": "k6",
       "metin": "Arkadaşlarıyla güzel vakit geçirir ama kimsenin arkasından kötü konuşmaz.",
       "alan": "orta",
       "ipucu": "Serbest olanın tadını çıkarıp yasaktan sakınıyor."
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
        "Canım bir şeyi çok istediğinde",
        "Yanlış olduğunu bildiğim bir fırsat çıkınca",
        "Bir şeyin serbest mi yasak mı olduğunu bilmediğimde",
        "Arkadaşlarım yanlış bir şeye çağırınca"
       ]
      },
      {
       "soru": "Bu hafta şunu deneyeceğim:",
       "secenekler": [
        "Canım çekse bile durup “bu doğru mu?” diyeceğim",
        "Emin olmadığım bir şeyi güvendiğim bir büyüğe soracağım",
        "Serbest ve güzel olan şeylerin tadını şükürle çıkaracağım"
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
       "baslik": "Takvâ",
       "metin": "saygıyla yasaktan sakınmak",
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
   "sure": 1.748,
   "m": "Canım ne isterse onu yapmam.",
   "k": [
    [
     "Canım",
     0.03,
     0.36
    ],
    [
     "ne",
     0.36,
     0.524
    ],
    [
     "isterse",
     0.524,
     1.019
    ],
    [
     "onu",
     1.019,
     1.348
    ],
    [
     "yapmam.",
     1.348,
     1.678
    ]
   ]
  },
  "a2": {
   "d": "ses/a2.m4a",
   "sure": 9.664,
   "m": "Birçok güzel huy bir ibre gibidir. Takvâ, isteklerime nasıl yön verdiğimi ölçer. İbre üç yerde durabilir: az, kararında, fazla.",
   "k": [
    [
     "Birçok",
     0.03,
     0.426
    ],
    [
     "güzel",
     0.426,
     0.823
    ],
    [
     "huy",
     0.823,
     1.021
    ],
    [
     "bir",
     1.021,
     1.219
    ],
    [
     "ibre",
     1.219,
     1.615
    ],
    [
     "gibidir.",
     1.615,
     2.21
    ],
    [
     "Takvâ,",
     2.585,
     3.06
    ],
    [
     "isteklerime",
     3.275,
     4.293
    ],
    [
     "nasıl",
     4.293,
     4.7
    ],
    [
     "yön",
     4.7,
     4.904
    ],
    [
     "verdiğimi",
     4.904,
     5.718
    ],
    [
     "ölçer.",
     5.718,
     6.125
    ],
    [
     "İbre",
     6.22,
     6.602
    ],
    [
     "üç",
     6.602,
     6.793
    ],
    [
     "yerde",
     6.793,
     7.176
    ],
    [
     "durabilir:",
     7.176,
     7.94
    ],
    [
     "az,",
     8.25,
     8.92
    ],
    [
     "kararında,",
     9.26,
     9.482
    ],
    [
     "fazla.",
     9.482,
     9.594
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
   "sure": 9.027,
   "m": "Sol uçta Ruhbâniyet. Hiçbir güzel şeye dokunmam, hepsinden uzak durayım. Helâl bir yemeği bile kendine yasaklar.",
   "k": [
    [
     "Sol",
     0.03,
     0.304
    ],
    [
     "uçta",
     0.304,
     0.851
    ],
    [
     "Ruhbâniyet.",
     0.851,
     1.945
    ],
    [
     "Hiçbir",
     2.05,
     2.56
    ],
    [
     "güzel",
     2.56,
     3.07
    ],
    [
     "şeye",
     3.07,
     3.58
    ],
    [
     "dokunmam,",
     3.58,
     4.345
    ],
    [
     "hepsinden",
     4.68,
     5.023
    ],
    [
     "uzak",
     5.023,
     5.252
    ],
    [
     "durayım.",
     5.252,
     5.595
    ],
    [
     "Helâl",
     5.69,
     6.157
    ],
    [
     "bir",
     6.157,
     6.39
    ],
    [
     "yemeği",
     6.39,
     7.09
    ],
    [
     "bile",
     7.09,
     7.557
    ],
    [
     "kendine",
     7.557,
     8.257
    ],
    [
     "yasaklar.",
     8.257,
     8.957
    ]
   ]
  },
  "kaz2": {
   "d": "ses/kaz2.m4a",
   "sure": 6.074,
   "m": "Sonra ne olur? Arkadaşlarının neşesinden uzak kalır. Helâl olan güzel şeylerin tadını da bilemez.",
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
     "Arkadaşlarının",
     1.105,
     2.035
    ],
    [
     "neşesinden",
     2.035,
     2.655
    ],
    [
     "uzak",
     2.655,
     2.965
    ],
    [
     "kalır.",
     2.965,
     3.275
    ],
    [
     "Helâl",
     3.725,
     4.01
    ],
    [
     "olan",
     4.01,
     4.295
    ],
    [
     "güzel",
     4.295,
     4.58
    ],
    [
     "şeylerin",
     4.58,
     5.007
    ],
    [
     "tadını",
     5.007,
     5.434
    ],
    [
     "da",
     5.434,
     5.577
    ],
    [
     "bilemez.",
     5.577,
     6.004
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
   "sure": 7.498,
   "m": "Sağ uçta Hevâ. Canım çekti, yaparım; doğru mu yanlış mı düşünmem! Canı ne isterse hemen yapar.",
   "k": [
    [
     "Sağ",
     0.03,
     0.274
    ],
    [
     "uçta",
     0.274,
     0.762
    ],
    [
     "Hevâ.",
     0.762,
     1.25
    ],
    [
     "Canım",
     1.81,
     2.07
    ],
    [
     "çekti,",
     2.07,
     2.33
    ],
    [
     "yaparım;",
     2.42,
     2.885
    ],
    [
     "doğru",
     3.175,
     3.608
    ],
    [
     "mu",
     3.608,
     3.825
    ],
    [
     "yanlış",
     3.825,
     4.258
    ],
    [
     "mı",
     4.258,
     4.475
    ],
    [
     "düşünmem!",
     4.475,
     5.125
    ],
    [
     "Canı",
     5.815,
     6.138
    ],
    [
     "ne",
     6.138,
     6.299
    ],
    [
     "isterse",
     6.299,
     6.783
    ],
    [
     "hemen",
     6.783,
     7.105
    ],
    [
     "yapar.",
     7.105,
     7.428
    ]
   ]
  },
  "kfa2": {
   "d": "ses/kfa2.m4a",
   "sure": 5.105,
   "m": "Sonra ne olur? Başkasının hakkına girdiğini fark etmez. Pişmanlık sonradan kapıyı çalar.",
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
     "Başkasının",
     0.915,
     1.531
    ],
    [
     "hakkına",
     1.531,
     1.992
    ],
    [
     "girdiğini",
     1.992,
     2.608
    ],
    [
     "fark",
     2.608,
     2.762
    ],
    [
     "etmez.",
     2.762,
     3.07
    ],
    [
     "Pişmanlık",
     3.165,
     3.675
    ],
    [
     "sonradan",
     3.675,
     4.185
    ],
    [
     "kapıyı",
     4.185,
     4.695
    ],
    [
     "çalar.",
     4.695,
     5.035
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
   "sure": 8.769,
   "m": "Tam kararında Takvâ. Yanlış olduğunu biliyorum; Allahü teâlâ için sakınırım. Canı çekse bile yasak olandan kendini alıkoyar.",
   "k": [
    [
     "Tam",
     0.03,
     0.172
    ],
    [
     "kararında",
     0.172,
     0.741
    ],
    [
     "Takvâ.",
     0.741,
     1.025
    ],
    [
     "Yanlış",
     1.18,
     1.619
    ],
    [
     "olduğunu",
     1.619,
     2.497
    ],
    [
     "biliyorum;",
     2.497,
     3.375
    ],
    [
     "Allahü",
     3.57,
     4.01
    ],
    [
     "teâlâ",
     4.01,
     4.45
    ],
    [
     "için",
     4.45,
     4.743
    ],
    [
     "sakınırım.",
     4.743,
     5.33
    ],
    [
     "Canı",
     5.665,
     6.002
    ],
    [
     "çekse",
     6.002,
     6.339
    ],
    [
     "bile",
     6.339,
     6.676
    ],
    [
     "yasak",
     6.676,
     7.014
    ],
    [
     "olandan",
     7.014,
     7.519
    ],
    [
     "kendini",
     7.519,
     8.025
    ],
    [
     "alıkoyar.",
     8.025,
     8.699
    ]
   ]
  },
  "kor2": {
   "d": "ses/kor2.m4a",
   "sure": 4.325,
   "m": "Sonra ne olur? İçi huzurla dolar. Doğru seçimin güvenini hisseder.",
   "k": [
    [
     "Sonra",
     0.03,
     0.288
    ],
    [
     "ne",
     0.288,
     0.417
    ],
    [
     "olur?",
     0.417,
     0.675
    ],
    [
     "İçi",
     1.135,
     1.446
    ],
    [
     "huzurla",
     1.446,
     1.914
    ],
    [
     "dolar.",
     1.914,
     2.225
    ],
    [
     "Doğru",
     2.45,
     2.751
    ],
    [
     "seçimin",
     2.751,
     3.202
    ],
    [
     "güvenini",
     3.202,
     3.803
    ],
    [
     "hisseder.",
     3.803,
     4.255
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
   "sure": 8.503,
   "m": "Teneffüste arkadaşların oyun oynuyor ve ikram paylaşıyor. Sırada bekleyen arkadaşının önüne geçip oyuna hemen girebilirsin; kimse bakmıyor. Ne yaparsın?",
   "k": [
    [
     "Teneffüste",
     0.03,
     0.585
    ],
    [
     "arkadaşların",
     0.585,
     1.279
    ],
    [
     "oyun",
     1.279,
     1.557
    ],
    [
     "oynuyor",
     1.557,
     1.973
    ],
    [
     "ve",
     1.973,
     2.112
    ],
    [
     "ikram",
     2.112,
     2.39
    ],
    [
     "paylaşıyor.",
     2.39,
     2.945
    ],
    [
     "Sırada",
     3.195,
     3.664
    ],
    [
     "bekleyen",
     3.664,
     4.133
    ],
    [
     "arkadaşının",
     4.133,
     4.915
    ],
    [
     "önüne",
     4.915,
     5.384
    ],
    [
     "geçip",
     5.384,
     5.697
    ],
    [
     "oyuna",
     5.697,
     6.166
    ],
    [
     "hemen",
     6.166,
     6.478
    ],
    [
     "girebilirsin;",
     6.478,
     7.26
    ],
    [
     "kimse",
     7.335,
     7.437
    ],
    [
     "bakmıyor.",
     7.437,
     7.59
    ],
    [
     "Ne",
     7.915,
     8.044
    ],
    [
     "yaparsın?",
     8.044,
     8.433
    ]
   ]
  },
  "s1az": {
   "d": "ses/s1az.m4a",
   "sure": 4.715,
   "m": "Arkadaşlarından ve güzel ikramlardan uzak kalıyorsun; teneffüsün tadı kaçıyor.",
   "k": [
    [
     "Arkadaşlarından",
     0.03,
     0.838
    ],
    [
     "ve",
     0.838,
     0.973
    ],
    [
     "güzel",
     0.973,
     1.243
    ],
    [
     "ikramlardan",
     1.243,
     1.782
    ],
    [
     "uzak",
     1.782,
     2.051
    ],
    [
     "kalıyorsun;",
     2.051,
     2.59
    ],
    [
     "teneffüsün",
     3.0,
     3.731
    ],
    [
     "tadı",
     3.731,
     4.097
    ],
    [
     "kaçıyor.",
     4.097,
     4.645
    ]
   ]
  },
  "s1fa": {
   "d": "ses/s1fa.m4a",
   "sure": 4.29,
   "m": "Sırada bekleyen arkadaşın üzülüyor; sen de içinde bir huzursuzluk taşıyorsun.",
   "k": [
    [
     "Sırada",
     0.03,
     0.373
    ],
    [
     "bekleyen",
     0.373,
     0.716
    ],
    [
     "arkadaşın",
     0.716,
     1.173
    ],
    [
     "üzülüyor;",
     1.173,
     1.63
    ],
    [
     "sen",
     2.005,
     2.163
    ],
    [
     "de",
     2.163,
     2.321
    ],
    [
     "içinde",
     2.321,
     2.796
    ],
    [
     "bir",
     2.796,
     2.954
    ],
    [
     "huzursuzluk",
     2.954,
     3.587
    ],
    [
     "taşıyorsun.",
     3.587,
     4.22
    ]
   ]
  },
  "s1or": {
   "d": "ses/s1or.m4a",
   "sure": 6.266,
   "m": "Sıranı bekledin; Allahü teâlâ’ya saygıyla hakka dikkat ettin, oyunun da keyfini çıkarıyorsun.",
   "k": [
    [
     "Sıranı",
     0.03,
     0.405
    ],
    [
     "bekledin;",
     0.405,
     0.78
    ],
    [
     "Allahü",
     1.31,
     1.811
    ],
    [
     "teâlâ’ya",
     1.811,
     2.478
    ],
    [
     "saygıyla",
     2.478,
     2.979
    ],
    [
     "hakka",
     2.979,
     3.312
    ],
    [
     "dikkat",
     3.312,
     3.646
    ],
    [
     "ettin,",
     3.646,
     3.98
    ],
    [
     "oyunun",
     4.07,
     4.601
    ],
    [
     "da",
     4.601,
     4.779
    ],
    [
     "keyfini",
     4.779,
     5.31
    ],
    [
     "çıkarıyorsun.",
     5.31,
     6.196
    ]
   ]
  },
  "s2": {
   "d": "ses/s2.m4a",
   "sure": 6.692,
   "m": "Arkadaşların birinin arkasından kötü konuşuyor ve sana da Sen ne dersin? diye soruyor. Ne yaparsın?",
   "k": [
    [
     "Arkadaşların",
     0.03,
     0.948
    ],
    [
     "birinin",
     0.948,
     1.499
    ],
    [
     "arkasından",
     1.499,
     2.234
    ],
    [
     "kötü",
     2.234,
     2.601
    ],
    [
     "konuşuyor",
     2.601,
     3.336
    ],
    [
     "ve",
     3.336,
     3.519
    ],
    [
     "sana",
     3.519,
     3.887
    ],
    [
     "da",
     3.887,
     4.07
    ],
    [
     "Sen",
     4.07,
     4.254
    ],
    [
     "ne",
     4.254,
     4.438
    ],
    [
     "dersin?",
     4.438,
     4.805
    ],
    [
     "diye",
     5.135,
     5.363
    ],
    [
     "soruyor.",
     5.363,
     5.705
    ],
    [
     "Ne",
     6.075,
     6.212
    ],
    [
     "yaparsın?",
     6.212,
     6.622
    ]
   ]
  },
  "s2az": {
   "d": "ses/s2az.m4a",
   "sure": 3.431,
   "m": "Arkadaşlarından uzaklaşıyorsun; sohbetlerin güzel yanları da kaçıyor.",
   "k": [
    [
     "Arkadaşlarından",
     0.03,
     0.66
    ],
    [
     "uzaklaşıyorsun;",
     0.66,
     1.29
    ],
    [
     "sohbetlerin",
     1.715,
     2.222
    ],
    [
     "güzel",
     2.222,
     2.475
    ],
    [
     "yanları",
     2.475,
     2.855
    ],
    [
     "da",
     2.855,
     2.981
    ],
    [
     "kaçıyor.",
     2.981,
     3.361
    ]
   ]
  },
  "s2fa": {
   "d": "ses/s2fa.m4a",
   "sure": 3.281,
   "m": "Söz ağızdan çıkınca arkadaşın üzülüyor; sen de pişman oluyorsun.",
   "k": [
    [
     "Söz",
     0.03,
     0.155
    ],
    [
     "ağızdan",
     0.155,
     0.531
    ],
    [
     "çıkınca",
     0.531,
     0.907
    ],
    [
     "arkadaşın",
     0.907,
     1.409
    ],
    [
     "üzülüyor;",
     1.409,
     1.91
    ],
    [
     "sen",
     2.125,
     2.261
    ],
    [
     "de",
     2.261,
     2.396
    ],
    [
     "pişman",
     2.396,
     2.668
    ],
    [
     "oluyorsun.",
     2.668,
     3.211
    ]
   ]
  },
  "s2or": {
   "d": "ses/s2or.m4a",
   "sure": 3.198,
   "m": "Konu değişiyor; sen de arkadaşların da rahatlıyorsunuz.",
   "k": [
    [
     "Konu",
     0.03,
     0.237
    ],
    [
     "değişiyor;",
     0.237,
     0.65
    ],
    [
     "sen",
     1.02,
     1.171
    ],
    [
     "de",
     1.171,
     1.321
    ],
    [
     "arkadaşların",
     1.321,
     2.074
    ],
    [
     "da",
     2.074,
     2.224
    ],
    [
     "rahatlıyorsunuz.",
     2.224,
     3.128
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
   "sure": 9.518,
   "m": "Bu cümle bilerek çift anlamlı. Yanlış olandan kendini alıkoyan biri söylüyorsa orta uca yakın. Hiçbir isteğine izin vermeyen biri söylüyorsa sol uca yakın.",
   "k": [
    [
     "Bu",
     0.03,
     0.2
    ],
    [
     "cümle",
     0.2,
     0.54
    ],
    [
     "bilerek",
     0.54,
     1.05
    ],
    [
     "çift",
     1.05,
     1.22
    ],
    [
     "anlamlı.",
     1.22,
     1.73
    ],
    [
     "Yanlış",
     1.85,
     2.166
    ],
    [
     "olandan",
     2.166,
     2.641
    ],
    [
     "kendini",
     2.641,
     3.115
    ],
    [
     "alıkoyan",
     3.115,
     3.747
    ],
    [
     "biri",
     3.747,
     4.064
    ],
    [
     "söylüyorsa",
     4.064,
     4.696
    ],
    [
     "orta",
     4.696,
     5.013
    ],
    [
     "uca",
     5.013,
     5.329
    ],
    [
     "yakın.",
     5.329,
     5.645
    ],
    [
     "Hiçbir",
     5.815,
     6.145
    ],
    [
     "isteğine",
     6.145,
     6.806
    ],
    [
     "izin",
     6.806,
     7.136
    ],
    [
     "vermeyen",
     7.136,
     7.631
    ],
    [
     "biri",
     7.631,
     7.962
    ],
    [
     "söylüyorsa",
     7.962,
     8.622
    ],
    [
     "sol",
     8.622,
     8.787
    ],
    [
     "uca",
     8.787,
     9.117
    ],
    [
     "yakın.",
     9.117,
     9.448
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
