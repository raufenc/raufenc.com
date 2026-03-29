// 5. Sinif ders verileri — sorular YouTube transkriptinden timestamp'e gore yazilmistir
const DERSLER = [
  {
    slug: 'matematik',
    name: 'Matematik',
    icon: '📐',
    color: '#4A90D9',
    colorLight: '#E8F0FE',
    uniteler: [
      {
        slug: 'basamak-degeri', name: 'Basamak Değeri ve Sayı Değeri', hedef: 'Büyük doğal sayılarda basamak ve sayı değerini bulabilme',
        videoId: 'I108YUUtwmU',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Bir sayıda "basamak değeri" ile "sayı değeri" arasındaki fark nedir?',
            secenekler: [
              'Basamak değeri o rakamın bulunduğu basamakla çarpılmış halidir; sayı değeri rakamın kendisidir.',
              'Sayı değeri basamakla çarpılır; basamak değeri rakamın kendisidir.',
              'Basamak değeri ve sayı değeri her zaman eşittir.',
              'Basamak değeri yalnızca birler basamağındaki rakamlar için geçerlidir.'
            ],
            dogru: 0,
            ipucu: 'Onlar basamağındaki 2 için: basamak değeri 2×10=20, sayı değeri ise yine 2.'
          },
          {
            saniye: 120,
            soru: '8 rakamı birler basamağında ise bu rakamın basamak değeri kaçtır?',
            secenekler: ['8', '80', '800', '1'],
            dogru: 0,
            ipucu: 'Birler basamağında 1 ile çarparsın: 8×1=?'
          },
          {
            saniye: 180,
            soru: 'Bir sayının çözümlemesinde 0 rakamının basamak değeri neden yazılmaz?',
            secenekler: [
              '0 ile çarpılınca sonuç 0 olur, toplamdaki etkisi yoktur.',
              '0 rakamı hiçbir sayıyı temsil etmez.',
              '0 bulunan basamağın ismi yoktur.',
              '0, çözümlemede hep en başa yazılır.'
            ],
            dogru: 0,
            ipucu: '"Bunlar toplama yaparken artık etkisiz eleman olmuş oluyorlar." — hoca'
          }
        ]
      },
      {
        slug: 'kesirler', name: 'Kesirler', hedef: 'Birim, basit ve bileşik kesirleri tanıma ve karşılaştırma',
        videoId: '5ZNxjyxT2hM',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Birim kesir nasıl tanımlanır?',
            secenekler: [
              'Payı daima 1 olan, bir bütünün eş parçalarından yalnızca birini gösteren kesir.',
              'Payı paydasından büyük olan kesir.',
              'Bir tam sayı ile kesrin birlikte yazıldığı kesir.',
              'Payı paydadan küçük olan her kesir.'
            ],
            dogru: 0,
            ipucu: 'Birim kesirde pay daima 1 olacak — örnek: 1/4, 1/12, 1/7.'
          },
          {
            saniye: 120,
            soru: '1/8 birim kesrini sayı doğrusunda göstermek için 0 ile 1 arasını kaç eş parçaya bölmek gerekir?',
            secenekler: ['8', '1', '4', '2'],
            dogru: 0,
            ipucu: '0 ile 1 arasını payda kadar eş parçaya böl; birinci noktayı seç.'
          },
          {
            saniye: 180,
            soru: 'Aşağıdaki kesirlerden hangisi bileşik kesirdir?',
            secenekler: ['5/3', '1/7', '4/9', '3/20'],
            dogru: 0,
            ipucu: 'Bileşik kesirde pay paydasından büyük olur — örnek: 5/3, 19/12.'
          }
        ]
      },
      {
        slug: 'carpma-bolme', name: 'Çarpma ve Bölme Problemleri', hedef: 'Çarpma ve bölme işlemleri içeren çok adımlı problemleri çözme',
        videoId: 'YJKpdPBgJmU',
        checkpoints: [
          {
            saniye: 60,
            soru: '552 cm uzunluğundaki çubuk 2 eşit parçaya bölünüyor. Her parçanın uzunluğu kaç cm olur?',
            secenekler: ['276 cm', '138 cm', '184 cm', '552 cm'],
            dogru: 0,
            ipucu: '552 ÷ 2 = ?'
          },
          {
            saniye: 120,
            soru: 'Lokantada 675 kg domatesin 260 kg\'ı tüketilmiş, kalan 5 güne eşit bölünmüştür. Her güne kaç kg düşer?',
            secenekler: ['83 kg', '135 kg', '92 kg', '46 kg'],
            dogru: 0,
            ipucu: 'Önce 675−260=415; sonra 415÷5=?'
          },
          {
            saniye: 180,
            soru: 'Genişliği 254 cm olan rafa, genişliği 8 cm olan kitaplardan en fazla kaç tane sığar?',
            secenekler: ['31', '32', '33', '30'],
            dogru: 0,
            ipucu: '254 ÷ 8 = 31 kalan 6; 6 cm bir kitap için yetmez.'
          }
        ]
      },
      {
        slug: 'alan-cevre', name: 'Alan ve Çevre', hedef: 'Dikdörtgenin alan ve çevresini hesaplama, bilinmeyeni bulma',
        videoId: 'WKbrSAJ6oiI',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Uzun kenarı 10 cm, kısa kenarı 7 cm olan dikdörtgenin alanı kaçtır?',
            secenekler: ['70 cm²', '34 cm²', '17 cm²', '100 cm²'],
            dogru: 0,
            ipucu: 'Alan = kısa kenar × uzun kenar = 7 × 10 = ?'
          },
          {
            saniye: 120,
            soru: 'Alanı 90 m² ve uzun kenarı 15 m olan dikdörtgenin kısa kenarı kaç metredir?',
            secenekler: ['6 m', '9 m', '12 m', '75 m'],
            dogru: 0,
            ipucu: 'Alan = kısa × uzun → kısa = 90 ÷ 15 = ?'
          }
        ]
      },
      {
        slug: 'bolukler', name: 'Büyük Sayıları Bölüklere Ayırma', hedef: 'Büyük doğal sayıları bölüklere ayırarak okuma ve yazma',
        videoId: 'NZQCvqCBt5g',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Sayıları bölüklere ayırırken sağdan başlayarak kaçar basamak gruplanır?',
            secenekler: ['3\'er basamak', '2\'şer basamak', '4\'er basamak', '1\'er basamak'],
            dogru: 0,
            ipucu: '"Sağdan başlamak şartıyla her üç basamakta bir birleşen kısım bölüktür."'
          },
          {
            saniye: 120,
            soru: 'Bölük isimleri küçükten büyüğe doğru hangi sıradadır?',
            secenekler: [
              'Birler → Binler → Milyonlar → Milyarlar',
              'Birler → Milyonlar → Binler → Milyarlar',
              'Milyarlar → Milyonlar → Binler → Birler',
              'Binler → Birler → Milyonlar → Milyarlar'
            ],
            dogru: 0,
            ipucu: 'Sağdan sola: birler bölüğü → binler → milyonlar → milyarlar.'
          }
        ]
      },
      {
        slug: 'zaman-olcme', name: 'Zaman Ölçme', hedef: 'Zaman birimlerini dönüştürme ve problemleri çözme',
        videoId: 'euQgzldoUck',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Standart hesaplamalarda bir ay kaç gün olarak alınır?',
            secenekler: ['30 gün', '31 gün', '28 gün', '29 gün'],
            dogru: 0,
            ipucu: 'Şubat 28, bazı aylar 31 olsa da standart hesapta 1 ay = 30 gün.'
          },
          {
            saniye: 120,
            soru: '5 günü saate çevirmek için hangi işlemi yaparsın?',
            secenekler: ['5 × 24 = 120 saat', '5 × 60 = 300 saat', '5 × 7 = 35 saat', '5 × 12 = 60 saat'],
            dogru: 0,
            ipucu: 'Bir gün 24 saat; 5 gün = 5 × 24 = ?'
          }
        ]
      }
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pRw6UsxkdnIdzdpW5B_dI6i', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWLwyQUu5RPuYb5OoIvQ9CKt', kullanim: 'Derin anlatım' },
    ]
  },
  {
    slug: 'fen',
    name: 'Fen Bilimleri',
    icon: '🔬',
    color: '#43A047',
    colorLight: '#E8F5E9',
    uniteler: [
      {
        slug: 'ay-ozellikleri', name: 'Ay\'ın Özellikleri', hedef: 'Ay\'ın yüzeyi, ışığı ve sıcaklık farkı hakkında bilgi edinme',
        videoId: 'LoAG7HHVxtM',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Ayın yüzeyinde krater (çukur) bulunmasının temel nedeni nedir?',
            secenekler: [
              'Atmosferi çok ince olduğundan göktaşları çarparak çukur bırakır.',
              'Ay\'ın Güneş\'e çok yakın olması.',
              'Ay\'ın Dünya\'nın etrafında dönmesi.',
              'Ay\'ın kendi ışığının olmaması.'
            ],
            dogru: 0,
            ipucu: '"Atmosferi yok denecek kadar az ve ince" olduğundan göktaşları çarpıp çukur bırakıyor.'
          },
          {
            saniye: 120,
            soru: 'Ay\'ın kendi ışığı yoktur; peki Ay\'ı nasıl görürüz?',
            secenekler: [
              'Güneş\'ten gelen ışığı alıp Dünya\'ya yansıtır.',
              'Ay\'ın çekirdeği ışık üretir.',
              'Dünya\'dan yansıyan ışığı alır.',
              'Yıldızlardan gelen ışığı biriktirir.'
            ],
            dogru: 0,
            ipucu: '"Ay, Güneş\'ten gelen ışığı alıp Dünya\'ya yansıtıyor; biz de onu bu şekilde görüyoruz."'
          },
          {
            saniye: 180,
            soru: 'Ay\'ın gündüz ile gece sıcaklıkları arasında büyük fark olmasının nedeni nedir?',
            secenekler: [
              'Atmosferi ince olduğundan ısıyı tutamaz.',
              'Ay\'ın Güneş\'e çok yakın olması.',
              'Ay\'ın küçük olması.',
              'Ay\'ın çok hızlı dönmesi.'
            ],
            dogru: 0,
            ipucu: 'Gündüz ~+100°C, gece ~−172°C; ince atmosfer ısıyı tutamıyor.'
          }
        ]
      },
      {
        slug: 'esnek-cisimler', name: 'Kuvvet ve Esnek Cisimler', hedef: 'Kuvvetin etkilerini ve esnek/esnek olmayan cisimleri tanıma',
        videoId: 'smkx-o2txNI',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Aşağıdakilerden hangisi kuvvetin etkisine örnek DEĞİLDİR?',
            secenekler: [
              'Bir cismin renginin değişmesi.',
              'Durmakta olan bir cismin harekete geçmesi.',
              'Hareket eden bir cismin durması.',
              'Cismin şeklinin değişmesi.'
            ],
            dogru: 0,
            ipucu: 'Kuvvet: harekete geçirir, durdurur, şeklini/hızını/yönünü değiştirir — ama rengini değiştirmez!'
          },
          {
            saniye: 120,
            soru: 'Esnek cisimler ile esnek olmayan cisimler arasındaki temel fark nedir?',
            secenekler: [
              'Esnek cisimler kuvvet kaldırılınca eski haline döner; esnek olmayanlar dönmez.',
              'Esnek cisimler ağır, esnek olmayanlar hafiftir.',
              'Esnek cisimler her zaman katıdır.',
              'Esnek cisimler kuvvet altında hiç şekil değiştirmez.'
            ],
            dogru: 0,
            ipucu: 'Balon ve yay esnek; oyun hamuru ve silgi esnek değil — şekillerini korurlar.'
          }
        ]
      },
      {
        slug: 'kutle-agirlik', name: 'Kütle, Ağırlık ve Yer Çekimi', hedef: 'Kütle ile ağırlık arasındaki farkı ve yer çekimini anlama',
        videoId: 'QOqTFJdp_88',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Yerçekimi kuvveti hakkında aşağıdakilerden hangisi doğrudur?',
            secenekler: [
              'Yerin merkezinden uzaklaştıkça yer çekimi azalır.',
              'Yerin merkezine yaklaştıkça yer çekimi azalır.',
              'Yer çekimi her yerde eşit büyüklüktedir.',
              'Yer çekimi yalnızca ağır cisimlere etki eder.'
            ],
            dogru: 0,
            ipucu: '"Yerçekimi kuvveti dünyanın merkezinden uzaklaştıkça azalıyor."'
          },
          {
            saniye: 120,
            soru: 'Kütle ile ağırlık arasındaki temel fark nedir?',
            secenekler: [
              'Kütle her yerde aynı kalır; ağırlık bulunulan konuma göre değişir.',
              'Ağırlık her yerde aynı kalır; kütle konuma göre değişir.',
              'Kütle ve ağırlık her zaman birbirine eşittir.',
              'Kütle Newton, ağırlık kilogram birimiyle ölçülür.'
            ],
            dogru: 0,
            ipucu: '"Ay\'da kütlen aynı, ama ağırlığın farklı — çünkü yer çekimi daha az."'
          }
        ]
      },
      {
        slug: 'hucre-mikroskop', name: 'Hücre ve Mikroskop', hedef: 'Hücreyi ve mikroskobun kullanımını öğrenme',
        videoId: 'auQui6S956o',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Hücreleri incelemek için kullanılan alet hangisidir?',
            secenekler: ['Mikroskop', 'Termometre', 'Dinamometre', 'Teleskop'],
            dogru: 0,
            ipucu: '"Hücreleri incelemek için mikroskop denilen bir alet kullanıyoruz."'
          },
          {
            saniye: 120,
            soru: 'Mikroskobun inceleme tablasına preparat yerleştirirken kullanılan ince cam parçasına ne denir?',
            secenekler: ['Lamel', 'Lam', 'Oküler', 'Objektif'],
            dogru: 0,
            ipucu: '"Lam biraz daha kalın cam, lamel daha ince küçük cam."'
          }
        ]
      },
      {
        slug: 'hal-degisimi', name: 'Maddenin Hal Değişimi', hedef: 'Erime, donma, buharlaşma ve yoğuşmayı anlama',
        videoId: '7hVI_SD_Ciw',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Katı haldeki bir maddenin ısı alarak sıvı hale geçmesine ne denir?',
            secenekler: ['Erime', 'Donma', 'Buharlaşma', 'Yoğuşma'],
            dogru: 0,
            ipucu: 'Dondurma yavaş yavaş erir — katıdan sıvıya geçişin adı "erime"dir.'
          },
          {
            saniye: 120,
            soru: 'Donma sırasında madde çevresiyle nasıl bir ısı alışverişi yapar?',
            secenekler: [
              'Ortama ısı verir, çevreyi ısıtır.',
              'Ortamdan ısı alır, çevreyi soğutur.',
              'Ortamla hiçbir ısı alışverişi yapmaz.',
              'Ortamı nemlendirir.'
            ],
            dogru: 0,
            ipucu: '"Donma olurken madde ortama ısı verir" — kar yağdığında hava biraz ılıklaşır.'
          }
        ]
      },
      {
        slug: 'isi-iletimi', name: 'Isı İletimi ve Yalıtım', hedef: 'Isı iletken ve yalıtkan maddeleri tanıma',
        videoId: '8muTsgbr18g',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Aşağıdaki maddelerden hangisi iyi bir ısı iletenidir?',
            secenekler: ['Bakır', 'Tahta', 'Plastik', 'Yün'],
            dogru: 0,
            ipucu: '"Altın, gümüş, bakır gibi metaller iyi ısı iletenidir." Tahta, plastik, yün yalıtkandır.'
          },
          {
            saniye: 120,
            soru: 'Isı yalıtkan maddelerin ortak özelliği nedir?',
            secenekler: [
              'Boşluklu ve gözenekli olmaları.',
              'Çok yoğun ve sert olmaları.',
              'Tanecikleri birbirine çok yakın olması.',
              'Metal içermeleri.'
            ],
            dogru: 0,
            ipucu: '"Isı yalıtkanı maddeler boşluklu ve gözenekli olmalı" — tanecikler arası mesafe büyükse ısı zorlanır.'
          }
        ]
      }
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQmONRNbSycsnBQqgRMzpun', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWIZt11pMwDrfdeuREY7F92f', kullanim: 'Derin anlatım' },
    ]
  },
  {
    slug: 'turkce',
    name: 'Türkçe',
    icon: '📖',
    color: '#E53935',
    colorLight: '#FFEBEE',
    uniteler: [
      {
        slug: 'es-sesli', name: 'Eş Sesli Sözcükler', hedef: 'Yazılışı aynı, anlamı farklı sözcükleri tanıma ve kullanma',
        videoId: 'pm3cO8SmOZ4',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Eş sesli sözcükler nasıl tanımlanır?',
            secenekler: [
              'Yazılışları ve okunuşları aynı, anlamları farklı sözcükler.',
              'Anlamları aynı, yazılışları farklı sözcükler.',
              'Köken olarak aynı dilden gelen sözcükler.',
              'Birbirinin zıttı olan sözcükler.'
            ],
            dogru: 0,
            ipucu: '"Yüz" hem sayı, hem surat, hem de yüzmek fiiline karşılık geliyor.'
          },
          {
            saniye: 120,
            soru: '"Ağaca çıkarken dalı kırdı." cümlesinde kaç eş sesli sözcük çifti bulunabilir?',
            secenekler: [
              'En az 2 — "kır" ve "dal"',
              '1 — yalnızca "kır"',
              'Hiç yok',
              '3 — "kır", "dal" ve "çık"'
            ],
            dogru: 0,
            ipucu: '"Kır" hem fiil (kırmak) hem coğrafi alan; "dal" hem ağaç dalı hem dalmak fiili.'
          },
          {
            saniye: 180,
            soru: '"Bere" sözcüğünün eş sesli anlamları arasında hangisi YOKTUR?',
            secenekler: [
              'Bir tür meyve.',
              'Başa takılan bir tür şapka.',
              'Vücutta oluşan morluk (yara bere).'
            ],
            dogru: 0,
            ipucu: '"Bere" iki anlamda kullanılır: başlık ve yara/morluk. Meyve anlamı yoktur.'
          }
        ]
      },
      {
        slug: 'yabanci-sozcukler', name: 'Yabancı Sözcüklerin Türkçe Karşılıkları', hedef: 'Dilimize giren yabancı sözcüklerin Türkçe karşılıklarını öğrenme',
        videoId: 'lbpRQLXb8hw',
        checkpoints: [
          {
            saniye: 60,
            soru: '"Laptop" sözcüğünün Türkçe karşılığı hangisidir?',
            secenekler: ['Dizüstü bilgisayar', 'Akıllı telefon', 'Masaüstü bilgisayar', 'Tablet'],
            dogru: 0,
            ipucu: '"Bilgisayarı nerede kullanıyorum? Dizimin üstünde — o zaman dizüstü bilgisayar."'
          },
          {
            saniye: 120,
            soru: '"Spiker" sözcüğünün Türkçe karşılığı hangisidir?',
            secenekler: ['Sunucu / Konuşmacı', 'Seyirci', 'Yönetmen', 'Muhabir'],
            dogru: 0,
            ipucu: '"Spiker yerine Türkçe karşılığını söylemen gerekiyor: konuşmacı veya sunucu."'
          }
        ]
      },
      {
        slug: 'oznel-nesnel', name: 'Öznel ve Nesnel Cümleler', hedef: 'Öznel ve nesnel ifadeleri ayırt etme; hayıflanma ve pişmanlık cümleleri',
        videoId: 'br54-02-bK4',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Nesnel cümlenin temel özelliği nedir?',
            secenekler: [
              'Doğruluğu veya yanlışlığı kanıtlanabilir.',
              'Kişisel düşünce ve beğenileri içerir.',
              'Yalnızca soruları ifade eder.',
              'Mecaz anlam taşır.'
            ],
            dogru: 0,
            ipucu: '"Alfabemizde 29 harf vardır" — bunu doğrulayıp yanlışlayabiliriz; nesnel cümle budur.'
          },
          {
            saniye: 120,
            soru: 'Hayıflanma ile pişmanlık arasındaki temel fark nedir?',
            secenekler: [
              'Hayıflanma yapılmayan şeyden duyulan üzüntüdür; pişmanlık yapılan hatadan duyulur.',
              'Pişmanlık gelecekle, hayıflanma geçmişle ilgilidir.',
              'İkisi de aynı anlama gelir.',
              'Hayıflanma sevinçle, pişmanlık üzüntüyle ilgilidir.'
            ],
            dogru: 0,
            ipucu: '"Keşke almayaydım" → hayıflanma (almadım). "Borsada kaybettim" → pişmanlık (yaptım).'
          }
        ]
      },
      {
        slug: 'noktalama', name: 'Noktalama İşaretleri', hedef: 'İki nokta, üç nokta ve diğer noktalama işaretlerini yerinde kullanma',
        videoId: 'u3pKU_JN6cs',
        checkpoints: [
          {
            saniye: 60,
            soru: 'İki nokta (:) hangi durumda kullanılır?',
            secenekler: [
              'Açıklama veya örnek verilecekken ve alıntı öncesinde.',
              'Cümle sonunda yargı bitince.',
              'Soru sormak için.',
              'Duygu bildiren kelimelerin ardından.'
            ],
            dogru: 0,
            ipucu: '"Açıklama yapmak istediğimde iki noktayı kullanıyorum." — örn. Yozgatlı sanatçılar: Hayko Cepkin…'
          },
          {
            saniye: 120,
            soru: 'Üç nokta (…) aşağıdaki durumlardan hangisinde kullanılır?',
            secenekler: [
              'Tamamlanmamış ya da kasıtlı yarım bırakılmış cümlelerde.',
              'Cümle sonunda yargı biterken.',
              'Bir şeyi sorgulamak için.',
              'Hayvanlara verilen özel adlarda.'
            ],
            dogru: 0,
            ipucu: '"Tamamlanmamış cümlenin sonuna konur; birden aklıma… — ne geldi, ne gitti?"'
          }
        ]
      },
      {
        slug: 'isim-fiil', name: 'İsim ve Fiil', hedef: 'Sözcükleri isim ve fiil olarak sınıflandırma',
        videoId: 'BFWZGxvgTS0',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Fiiller hangi anlamları taşıyan sözcüklerdir?',
            secenekler: [
              'İş, oluş veya hareket bildiren sözcükler.',
              'Varlık ve kavramları karşılayan sözcükler.',
              'Sıfatları nitelendiren sözcükler.',
              'Cümleleri birbirine bağlayan sözcükler.'
            ],
            dogru: 0,
            ipucu: '"Gitmek, yürümek, almak, vermek — hepsinde iş/hareket var; fiilin diğer adı eylemdir."'
          },
          {
            saniye: 120,
            soru: 'Bir sözcüğün fiil mi isim mi olduğunu anlamanın en pratik yolu nedir?',
            secenekler: [
              '"-mak / -mek" eki getirip anlamlı olup olmadığına bakmak.',
              'Sözcüğü büyük harfle yazıp yazmadığına bakmak.',
              'Sözcüğün kaç heceli olduğunu saymak.',
              'Sözcüğün Türkçe kökenli olup olmadığına bakmak.'
            ],
            dogru: 0,
            ipucu: '"Gelmek oldu mu? Oldu → fiil. Kitapmak oldu mu? Olmaz → isim."'
          }
        ]
      },
      {
        slug: 'buyuk-harf', name: 'Büyük Harf Kullanımı', hedef: 'Büyük harf kullanım kurallarını öğrenme ve uygulama',
        videoId: 'jIIS5FPDCEc',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Şiirde her dize büyük harfle başlar çünkü:',
            secenekler: [
              'Yazım kuralı gereği her dize yeni bir satır olarak kabul edilir.',
              'Şiirlerde cümle olmaz.',
              'Yalnızca birinci dize büyük harfle başlar.',
              'Şiirler yalnızca özel isimlerden oluşur.'
            ],
            dogru: 0,
            ipucu: '"Dize şeklinde yazılmışsa büyük harflerle başlayacak" — birleştirince tek cümle olsa bile.'
          },
          {
            saniye: 120,
            soru: 'Kişi adlarından önce veya sonra gelen unvanlar (Sultan, Profesör, Mareşal) nasıl yazılır?',
            secenekler: [
              'Büyük harfle başlanır.',
              'Tamamen küçük harfle yazılır.',
              'Tırnak içine alınır.',
              'Kısaltılarak yazılır.'
            ],
            dogru: 0,
            ipucu: '"Fatih Sultan Mehmet — Sultan büyük yazılacak çünkü ona verilen bir unvandır."'
          }
        ]
      }
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQahebWos9BnH_dRnDqYYEU', kullanim: 'Ana dilbilgisi' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWJwOQA4BL_zGOnGpFC5IG4d', kullanim: 'Derin anlatım' },
    ]
  },
  {
    slug: 'sosyal',
    name: 'Sosyal Bilgiler',
    icon: '🌍',
    color: '#FF9800',
    colorLight: '#FFF3E0',
    uniteler: [
      {
        slug: 'kulturel-zenginlik', name: 'Kültürel Zenginlikler', hedef: 'Kültür kavramını ve kültürel zenginliklerin önemini anlama',
        videoId: 'UCGDuU_lEkY',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Kültür kavramına aşağıdakilerden hangisi dahil DEĞİLDİR?',
            secenekler: [
              'Bir ülkenin coğrafi koordinatları.',
              'Dil ve din.',
              'Gelenek ve görenek.',
              'Yemek ve kıyafet.'
            ],
            dogru: 0,
            ipucu: '"Kültür; dil, din, gelenek, görenek, sanat, müzik, yemek, kıyafet, bayram gibi değerlerin tümü."'
          },
          {
            saniye: 120,
            soru: 'Kültürel çeşitliliğin toplumlara katkısı nedir?',
            secenekler: [
              'Turizmi geliştirir ve ülke tanıtımına katkı sağlar.',
              'Tek tip bir yaşam biçimi oluşturur.',
              'Yabancı kültürlerin tamamen yok olmasını sağlar.',
              'Ülkeleri birbirinden izole eder.'
            ],
            dogru: 0,
            ipucu: '"Farklı kültürler turizmi geliştirir; geleneksel yemek ve el sanatlarımız ülke tanıtımına katkı sağlar."'
          }
        ]
      },
      {
        slug: 'kultur-katki', name: 'Kültürel Zenginliklerin Birlikte Yaşamaya Katkısı', hedef: 'Kültürel çeşitliliğin ortak yaşama katkısını değerlendirme',
        videoId: '3F9edAIuVzI',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Kültürel zenginlikler birlikte yaşamaya nasıl katkı sağlar?',
            secenekler: [
              'Birbirine saygıyı artırır ve topluma çeşitlilik katar.',
              'Toplumları birbirinden ayırır ve çatışma çıkarır.',
              'Yalnızca ekonomiyi etkiler.',
              'Kültürel zenginliklerin birlikte yaşamaya katkısı yoktur.'
            ],
            dogru: 0,
            ipucu: 'Farklı kültürler bir arada yaşayınca toplum zenginleşir, saygı ve dayanışma artar.'
          },
          {
            saniye: 120,
            soru: 'Aşağıdakilerden hangisi kültürel zenginliğe örnek DEĞİLDİR?',
            secenekler: [
              'Bir ülkenin nüfus yoğunluğu.',
              'Halk oyunları.',
              'Geleneksel yemekler.',
              'El sanatları.'
            ],
            dogru: 0,
            ipucu: 'Nüfus yoğunluğu demografik bir veridir; halk oyunları, yemek ve el sanatları kültürel değerlerdir.'
          }
        ]
      },
      {
        slug: 'doga-beseri', name: 'Doğal ve Beşeri Çevre', hedef: 'Doğal ve beşeri çevreyi ayırt etme ve değişimlerini anlama',
        videoId: 'gCdFpGQtNcA',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Aşağıdakilerden hangisi doğal çevrenin bir parçasıdır?',
            secenekler: ['Nehirler', 'Fabrikalar', 'Yollar', 'Köprüler'],
            dogru: 0,
            ipucu: '"Fabrikalar, yollar, köprüler insan yapımı; nehirler ise doğal çevrenin parçası."'
          },
          {
            saniye: 120,
            soru: 'Heyelan (toprak kayması) hangi tür çevre değişimine örnektir?',
            secenekler: [
              'Doğal etkenlerle gerçekleşen doğal çevre değişimi.',
              'İnsan eliyle gerçekleşen beşeri çevre değişimi.',
              'Tarım alanlarının genişletilmesi.',
              'Şehirleşme ve nüfus artışı.'
            ],
            dogru: 0,
            ipucu: '"Karadeniz\'de yoğun yağışlar nedeniyle heyelan görülür; bu doğal bir değişimdir."'
          }
        ]
      },
      {
        slug: 'anadolu-miras', name: 'Anadolu\'nun Kültürel Mirasa Katkıları', hedef: 'Anadolu\'daki ilk yerleşimler ve kültürel miras alanlarını tanıma',
        videoId: 'Hlv-Y2rGZ4o',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Göbeklitepe neden önemlidir?',
            secenekler: [
              'Dünyanın bilinen en eski tapınak kompleksini barındırır.',
              'Anadolu\'nun ilk şehir yerleşmesidir.',
              'İlk yazılı hukuk kurallarının oluşturulduğu yerdir.',
              'İlk tarım alanlarının kurulduğu yerdir.'
            ],
            dogru: 0,
            ipucu: '"Göbeklitepe — dünyanın bilinen en eski tapınak kompleksi; Şanlıurfa\'da."'
          }
        ]
      },
      {
        slug: 'etkin-vatandaslik', name: 'Etkin Vatandaşlık', hedef: 'Etkin vatandaşın özelliklerini ve demokratik tutumlarını öğrenme',
        videoId: 'ot516YDjf8o',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Etkin vatandaşın temel özelliği nedir?',
            secenekler: [
              'Haklarını bilen, sorumluluklarını yerine getiren ve toplumsal sorunlara duyarlı olan bireydir.',
              'Yalnızca kendi çıkarlarını düşünen bireydir.',
              'Sorunlar karşısında sessiz kalan bireydir.',
              'Yalnızca oy kullanan bireydir.'
            ],
            dogru: 0,
            ipucu: '"Etkin vatandaş; haklar + sorumluluklar + duyarlılık üçgeninde yaşar; pasif değildir."'
          },
          {
            saniye: 120,
            soru: 'Etkin vatandaş haksızlıkla karşılaştığında nasıl davranır?',
            secenekler: [
              'Şiddete başvurmadan yasal ve demokratik yolları kullanır.',
              'Her durumda sessiz kalır.',
              'Şiddet kullanarak hakkını arar.',
              'Durumu görmezden gelir.'
            ],
            dogru: 0,
            ipucu: '"Haksızlık karşısında sessiz kalmaz — ama şiddete de başvurmaz; yasal yolları kullanır."'
          }
        ]
      },
      {
        slug: 'demokrasi', name: 'Demokrasi ve Cumhuriyet', hedef: 'Demokratik yönetim biçimini ve Cumhuriyetin temel niteliklerini öğrenme',
        videoId: 'ZRex1rmWFwA',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Demokrasi yalnızca devlet yönetiminde değil, günlük hayatta da uygulanır. Buna örnek hangisidir?',
            secenekler: [
              'Ailecek nereye gidileceğine birlikte karar vermek.',
              'Tek kişinin kararı ile yönetim yapmak.',
              'Seçimlere katılmamak.',
              'Başka ülkelerin yasalarına uymak.'
            ],
            dogru: 0,
            ipucu: '"Demokrasi bir yaşam biçimi — evde bile ailecek beraber karar alırız."'
          },
          {
            saniye: 120,
            soru: '"Milli egemenlik" ne anlama gelir?',
            secenekler: [
              'Yönetme gücünün halka ait olması.',
              'Yalnızca askerlerin yönetme hakkına sahip olması.',
              'Milletvekillerinin keyfi karar alması.',
              'Dış güçlerin ülkeyi yönetmesi.'
            ],
            dogru: 0,
            ipucu: '"Milli egemenlik: yönetme gücü halka ait; seçimlerle temsilcilerini halk seçer."'
          }
        ]
      }
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQay3pMGxFF_psduAqUR_7n', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'B', kanal: 'Benim Hocam', id: 'PL2Bf1L_pHfWJp_rYB9Cp9AfN5GyisxdsF', kullanim: 'Derin anlatım' },
    ]
  },
  {
    slug: 'ingilizce',
    name: 'İngilizce',
    icon: '🇬🇧',
    color: '#7B1FA2',
    colorLight: '#F3E5F5',
    uniteler: [
      {
        slug: 'hello', name: 'Hello! — Countries & Nationalities', hedef: 'Ülkeleri, milliyet isimlerini ve dilleri öğrenme',
        videoId: 'yAGRyOA2kqE',
        checkpoints: [
          {
            saniye: 60,
            soru: '"Turkish" sözcüğü kaç farklı anlama gelir?',
            secenekler: [
              '3 anlam: Türk (kişi), Türkçe (dil), Türk (sıfat).',
              '1 anlam: Türk (kişi).',
              '2 anlam: Türk ve Türkiye.',
              '4 anlam.'
            ],
            dogru: 0,
            ipucu: '"Turkish hem Türk hem Turkish hem Türkçe anlamına geliyor" — 3 anlam!'
          },
          {
            saniye: 120,
            soru: 'Hangi ülkenin resmi dili İngilizce değildir?',
            secenekler: ['Brazil (Brezilya)', 'Canada (Kanada)', 'England (İngiltere)', 'United States (ABD)'],
            dogru: 0,
            ipucu: 'Brezilya\'nın dili Portekizcedir (Portuguese).'
          },
          {
            saniye: 180,
            soru: '"Dutch" hangi ülkenin uyruk/dil adıdır?',
            secenekler: ['Netherlands (Hollanda)', 'Denmark (Danimarka)', 'Germany (Almanya)', 'Poland (Polonya)'],
            dogru: 0,
            ipucu: '"Netherland Hollanda, Dutch Duch — ne kadar uyumlu!" dedi hoca.'
          }
        ]
      },
      {
        slug: 'my-town', name: 'My Town — Prepositions of Place', hedef: 'Yer bildiren edatları ve yön tarifini öğrenme',
        videoId: 'tccjcPJovCE',
        checkpoints: [
          {
            saniye: 60,
            soru: '"The library is near the school." cümlesinin Türkçe anlamı nedir?',
            secenekler: [
              'Kütüphane okulun yanındadır.',
              'Okul kütüphanenin karşısındadır.',
              'Kütüphane okulun arkasındadır.',
              'Okul kütüphaneden uzaktadır.'
            ],
            dogru: 0,
            ipucu: '"Near" = yanında / yakınında.'
          },
          {
            saniye: 120,
            soru: 'Bir yerin nerede olduğunu sormak için hangi soru kullanılır?',
            secenekler: [
              'Where is the…? / How can I get to the…?',
              'What is the…?',
              'When is the…?',
              'Who is the…?'
            ],
            dogru: 0,
            ipucu: '"Where is the Galata Tower?" = Galata Kulesi nerede?'
          }
        ]
      },
      {
        slug: 'games-hobbies', name: 'Games and Hobbies — Adverbs of Frequency', hedef: 'Sıklık zarflarını cümlede doğru kullanma',
        videoId: 'FYSdqEcdOYY',
        checkpoints: [
          {
            saniye: 60,
            soru: '"Always" zarfı yüzde kaç sıklığı ifade eder?',
            secenekler: ['%100', '%80', '%50', '%0'],
            dogru: 0,
            ipucu: 'Always = her zaman = %100. Usually ≈ %80, sometimes ≈ %50, never = %0.'
          },
          {
            saniye: 120,
            soru: 'Sıklık zarfı (always, usually, never…) cümlede nereye yerleştirilir?',
            secenekler: [
              'Ana fiilden önce; "to be" fiilinden sonra.',
              'Her zaman cümlenin en başına.',
              'Her zaman cümlenin en sonuna.',
              'Rastgele yerleştirilebilir.'
            ],
            dogru: 0,
            ipucu: '"Adverbs come before the main verb but after to be" — I always play / He is never late.'
          }
        ]
      },
      {
        slug: 'my-daily-routine', name: 'My Daily Routine — Time Expressions', hedef: 'Zaman ifadelerini ve günlük rutini anlatma',
        videoId: '2eHNj1EUB7I',
        checkpoints: [
          {
            saniye: 60,
            soru: '"In the morning" ne zaman anlamına gelir?',
            secenekler: [
              'Günün erken saatlerinde / sabahları.',
              'Öğleden sonra.',
              'Gece geç saatlerde.',
              'Akşam güneş battıktan sonra.'
            ],
            dogru: 0,
            ipucu: '"In the morning: early part of the day." — I brush my teeth in the morning.'
          },
          {
            saniye: 120,
            soru: '"At night" ile "in the evening" arasındaki fark nedir?',
            secenekler: [
              '"At night" yatmadan önceki gece saatleri; "in the evening" gün batımından hemen sonrası.',
              'İkisi tamamen aynı anlama gelir.',
              '"In the evening" gece yarısından sonrasıdır.',
              '"At night" sabah saatlerini ifade eder.'
            ],
            dogru: 0,
            ipucu: '"Evening = after sunset; night = before sleeping."'
          }
        ]
      },
      {
        slug: 'health', name: 'Health — Body Parts & Complaints', hedef: 'Sağlık sorunlarını ve vücut bölümlerini İngilizce anlatma',
        videoId: 'gyBTOthrUOA',
        checkpoints: [
          {
            saniye: 60,
            soru: '"I have a stomachache." cümlesinin Türkçe anlamı nedir?',
            secenekler: [
              'Karnım ağrıyor.',
              'Başım ağrıyor.',
              'Dişim ağrıyor.',
              'Boğazım ağrıyor.'
            ],
            dogru: 0,
            ipucu: '"stomach" = karın, "ache" = ağrı → Karnım ağrıyor.'
          },
          {
            saniye: 120,
            soru: '"Does your head hurt?" sorusuna olumlu cevap nasıl verilir?',
            secenekler: [
              'Yes, it does.',
              'Yes, I do.',
              'Yes, he does.',
              'Yes, it is.'
            ],
            dogru: 0,
            ipucu: '"Does your head hurt?" → özne "head" yani "it" → Yes, it does.'
          }
        ]
      },
      {
        slug: 'health-2', name: 'Health — Should & Shouldn\'t', hedef: 'Should/shouldn\'t yapısını sağlık önerileri için kullanma',
        videoId: 'AGuZyYZDoWY',
        checkpoints: [
          {
            saniye: 60,
            soru: '"You should rest." cümlesinde "should"tan sonra fiil hangi halde gelir?',
            secenekler: [
              'Fiilin birinci hali (base verb) — ek almadan.',
              'Fiilin -ing hali.',
              'Fiilin geçmiş hali (V2).',
              '"to" + fiilin birinci hali.'
            ],
            dogru: 0,
            ipucu: '"After should we use the base verb" — You should rest ✓ / You should to rest ✗.'
          },
          {
            saniye: 120,
            soru: '"You shouldn\'t eat junk food." cümlesinin Türkçe anlamı nedir?',
            secenekler: [
              'Abur cubur yememelisin.',
              'Abur cubur yemelisin.',
              'Abur cubur yiyebilirsin.',
              'Abur cubur yiyeceksin.'
            ],
            dogru: 0,
            ipucu: '"Shouldn\'t = yapmamalısın; eat junk food = abur cubur yemek."'
          }
        ]
      }
    ],
    playlists: [
      { tier: 'A', kanal: 'Hocalara Geldik', id: 'PLLElfSeRJ_pQrXpuwUgTjmWubpvEwC6TH', kullanim: 'Ana mikro-öğrenme' },
      { tier: 'B', kanal: 'MEB Dinleme', id: 'PLY5F4Y-Xf8wv5o8vx0crPkw1-dYayYbcH', kullanim: 'Dinleme / warm-up' },
    ]
  }
];

const MODLAR = [
  { id: 'hizli', name: 'Hızlı', icon: '⚡', desc: 'Kısa ve hızlı dersler, az checkpoint', color: '#FF6B35' },
  { id: 'normal', name: 'Normal', icon: '📚', desc: 'Standart ders akışı', color: '#4A90D9' },
  { id: 'destekli', name: 'Destekli', icon: '🤝', desc: 'Daha fazla ipucu ve açıklama', color: '#43A047' },
  { id: 'sakin', name: 'Sakin', icon: '🌿', desc: 'Yavaş tempo, az animasyon', color: '#7B1FA2' },
];

function getEmbedUrl(playlistId) {
  return `https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1&rel=0&modestbranding=1`;
}

function getDers(slug) {
  return DERSLER.find(d => d.slug === slug);
}

function getUnite(dersSlug, uniteSlug) {
  const ders = getDers(dersSlug);
  if (!ders) return null;
  return ders.uniteler.find(u => u.slug === uniteSlug);
}

function getCheckpoints(dersSlug, uniteSlug) {
  const unite = getUnite(dersSlug, uniteSlug);
  return unite?.checkpoints || [];
}

window.DERSLER = DERSLER;
window.MODLAR = MODLAR;
window.getEmbedUrl = getEmbedUrl;
window.getDers = getDers;
window.getUnite = getUnite;
window.getCheckpoints = getCheckpoints;
