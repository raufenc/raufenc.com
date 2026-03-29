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
          },
          {
            saniye: 240,
            soru: '9.876.543 sayısında "8" rakamının basamak değeri kaçtır?',
            secenekler: ['8.000', '80.000', '800.000', '8.000.000'],
            dogru: 2,
            ipucu: 'Rakamın basamak değeri, bulunduğu basamakla çarpılmasıyla bulunur.'
          },
          {
            saniye: 300,
            soru: 'Bir sayıda rakamın sayı değeri ile basamak değeri aynı olabilir mi?',
            secenekler: [
              'Hayır, hiçbir zaman aynı olmaz.',
              'Evet, birler basamağındaki rakam için aynıdır.',
              'Evet, yüzler basamağındaki rakam için aynıdır.',
              'Sadece 0 rakamı için aynıdır.'
            ],
            dogru: 1,
            ipucu: 'Birler basamağındaki rakamın basamak değeri 1×rakam = rakamın kendisidir.'
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
          },
          {
            saniye: 240,
            soru: '3/4 ile 5/8 kesirlerinden hangisi daha büyüktür?',
            secenekler: ['5/8', '3/4', 'Eşittirler', 'Karşılaştırılamaz'],
            dogru: 1,
            ipucu: 'Kesirleri karşılaştırmak için paydaları eşitlemeliyiz: 3/4 = 6/8.'
          },
          {
            saniye: 300,
            soru: '2/3 + 1/4 işleminin sonucu kaçtır?',
            secenekler: ['3/7', '11/12', '3/12', '8/12'],
            dogru: 1,
            ipucu: 'Paydaları farklı kesirlerde ortak payda buluruz: 2/3=8/12, 1/4=3/12, toplam=11/12.'
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
          },
          {
            saniye: 240,
            soru: '456 × 23 işleminin sonucu kaçtır?',
            secenekler: ['9.488', '10.488', '10.288', '9.288'],
            dogru: 1,
            ipucu: 'Çarpma işleminde basamak basamak çarpar, sonuçları toplarız.'
          },
          {
            saniye: 300,
            soru: '2.856 ÷ 7 işleminin sonucu kaçtır?',
            secenekler: ['308', '408', '418', '508'],
            dogru: 1,
            ipucu: 'Bölme işlemini basamak basamak yaparak kontrol ederiz.'
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
          },
          {
            saniye: 240,
            soru: 'Kenar uzunluğu 7 cm olan bir karenin alanı kaç cm²dir?',
            secenekler: ['14 cm²', '28 cm²', '49 cm²', '21 cm²'],
            dogru: 2,
            ipucu: 'Karenin alanı = kenar × kenar = 7 × 7 = ?'
          },
          {
            saniye: 300,
            soru: 'Uzunluğu 12 cm, genişliği 5 cm olan dikdörtgenin çevresi kaç cm\'dir?',
            secenekler: ['60 cm', '34 cm', '17 cm', '24 cm'],
            dogru: 1,
            ipucu: 'Dikdörtgenin çevresi = 2 × (uzunluk + genişlik) = 2 × (12 + 5) = ?'
          },
          {
            saniye: 360,
            soru: 'Çevresi 36 cm olan bir karenin bir kenarı kaç cm\'dir?',
            secenekler: ['6 cm', '9 cm', '12 cm', '18 cm'],
            dogru: 1,
            ipucu: 'Karenin 4 kenarı eşit; çevreyi 4\'e böleriz: 36 ÷ 4 = ?'
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
          },
          {
            saniye: 240,
            soru: '4.852.736 sayısında "binler bölüğü" hangi rakamlardan oluşur?',
            secenekler: ['4 ve 8', '8, 5 ve 2', '7, 3 ve 6', '2, 7 ve 3'],
            dogru: 1,
            ipucu: 'Binler bölüğü: yüz binler, on binler ve binler basamaklarını içerir.'
          },
          {
            saniye: 300,
            soru: '7.000.000 + 300.000 + 50.000 + 6.000 + 400 + 20 + 8 toplamı kaçtır?',
            secenekler: ['7.356.428', '7.365.428', '73.564.28', '7.356.248'],
            dogru: 0,
            ipucu: 'Bölüklere ayırarak yazılan sayıyı topladığımızda gerçek sayıya ulaşırız.'
          },
          {
            saniye: 360,
            soru: 'Hangi sayıda milyonlar bölüğü sıfırdan farklıdır?',
            secenekler: ['987.654', '1.000.001', '999.999', '456.789'],
            dogru: 1,
            ipucu: 'Milyonlar bölüğü en az 7 basamaklı sayılarda yer alır.'
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
          },
          {
            saniye: 240,
            soru: '3 saat 45 dakika kaç dakikadır?',
            secenekler: ['165 dakika', '195 dakika', '215 dakika', '225 dakika'],
            dogru: 3,
            ipucu: '3 × 60 = 180 dakika + 45 dakika = ?'
          },
          {
            saniye: 300,
            soru: 'Bir film saat 14:35\'te başlayıp 16:20\'de biterse kaç dakika sürmüştür?',
            secenekler: ['95 dakika', '105 dakika', '85 dakika', '115 dakika'],
            dogru: 1,
            ipucu: '14:35\'ten 16:20\'ye: 1 saat 45 dakika = 60 + 45 = 105 dakika.'
          },
          {
            saniye: 360,
            soru: '250 dakika kaç saat kaç dakikadır?',
            secenekler: ['3 saat 50 dakika', '4 saat 10 dakika', '4 saat 30 dakika', '3 saat 70 dakika'],
            dogru: 1,
            ipucu: '250 ÷ 60 = 4 saat kalan 10 dakika.'
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
          },
          {
            saniye: 240,
            soru: 'Ay\'ın kendi ekseni etrafında dönüş süresi ile Dünya\'nın çevresindeki dolanım süresi nasıldır?',
            secenekler: [
              'Her ikisi de yaklaşık 27-28 gündür.',
              'Kendi ekseni 24 saat, Dünya çevresi 30 gündür.',
              'Kendi ekseni 7 gün, Dünya çevresi 30 gündür.',
              'Her ikisi de 365 gündür.'
            ],
            dogru: 0,
            ipucu: 'İki sürenin eşit olması nedeniyle Ay\'ın hep aynı yüzünü görürüz.'
          },
          {
            saniye: 300,
            soru: 'Aşağıdaki gök cisimlerinden hangisi kendi ışığını üretir?',
            secenekler: ['Ay', 'Dünya', 'Güneş', 'Mars'],
            dogru: 2,
            ipucu: 'Güneş bir yıldızdır ve enerjiyi nükleer füzyon yoluyla kendisi üretir.'
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
          },
          {
            saniye: 240,
            soru: 'Esnek bir cisme uygulanan kuvvet ortadan kalkınca ne olur?',
            secenekler: [
              'Cisim kalıcı olarak şekil değiştirir.',
              'Cisim eski şekline döner.',
              'Cisim parçalanır.',
              'Cisim büyür.'
            ],
            dogru: 1,
            ipucu: 'Esnek cisimler, kuvvet kalktığında orijinal şekillerine geri dönerler.'
          },
          {
            saniye: 300,
            soru: 'Aşağıdakilerden hangisi esnek bir cisim değildir?',
            secenekler: ['Yay', 'Lastik bant', 'Cam', 'Sünger'],
            dogru: 2,
            ipucu: 'Cam kırılgan bir maddedir; esneyen cisimler gibi şekil değiştirip geri dönemez.'
          },
          {
            saniye: 360,
            soru: 'Bir yaya uygulanan kuvvet arttıkça uzama miktarı nasıl değişir?',
            secenekler: ['Azalır', 'Değişmez', 'Artar', 'Önce artar sonra azalır'],
            dogru: 2,
            ipucu: 'Yaya uygulanan kuvvet ile uzama miktarı arasında doğru orantı vardır.'
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
          },
          {
            saniye: 240,
            soru: 'Ay\'da yer çekimi Dünya\'nınkinin yaklaşık kaçta biri kadardır?',
            secenekler: ['1/2', '1/4', '1/6', '1/10'],
            dogru: 2,
            ipucu: 'Ay\'ın kütlesi Dünya\'dan küçük olduğu için yer çekimi yaklaşık 6 kat azdır.'
          },
          {
            saniye: 300,
            soru: 'Kütlesi 60 kg olan bir kişinin Dünya\'daki ağırlığı 600 N ise Ay\'daki ağırlığı kaç N\'dur?',
            secenekler: ['600 N', '300 N', '100 N', '60 N'],
            dogru: 2,
            ipucu: 'Ay\'da yer çekimi 1/6\'sı olduğundan: 600 ÷ 6 = 100 N.'
          },
          {
            saniye: 360,
            soru: 'Ağırlık hangi alet ile ölçülür?',
            secenekler: ['Terazi', 'Dinamometre', 'Termometre', 'Cetvel'],
            dogru: 1,
            ipucu: 'Ağırlık Newton birimiyle ölçülür; dinamometre bu işe yarar.'
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
          },
          {
            saniye: 240,
            soru: 'Mikroskobun büyütme gücü nasıl hesaplanır?',
            secenekler: [
              'Oküler büyütme + objektif büyütme',
              'Oküler büyütme × objektif büyütme',
              'Oküler büyütme ÷ objektif büyütme',
              'Sadece objektif büyütmesine bakılır'
            ],
            dogru: 1,
            ipucu: 'Toplam büyütme = oküler mercek büyütmesi × objektif mercek büyütmesi.'
          },
          {
            saniye: 300,
            soru: 'Aşağıdakilerden hangisi hem bitki hem hayvan hücrelerinde bulunur?',
            secenekler: ['Hücre duvarı', 'Kloroplast', 'Hücre zarı', 'Büyük koful'],
            dogru: 2,
            ipucu: 'Hücre zarı tüm canlı hücrelerde ortak olarak bulunan yapıdır.'
          },
          {
            saniye: 360,
            soru: 'Fotosentez hangi hücre organelinde gerçekleşir?',
            secenekler: ['Mitokondri', 'Kloroplast', 'Ribozom', 'Çekirdek'],
            dogru: 1,
            ipucu: 'Kloroplast içindeki klorofil, ışık enerjisini kullanarak besin üretir.'
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
          },
          {
            saniye: 240,
            soru: 'Sıvının gaz hâline geçmesine ne denir?',
            secenekler: ['Donma', 'Buharlaşma', 'Yoğunlaşma', 'Erime'],
            dogru: 1,
            ipucu: 'Su ısıtıldığında sıvıdan gaz hâline geçer; buna buharlaşma denir.'
          },
          {
            saniye: 300,
            soru: 'Gaz hâlindeki suyun sıvıya dönüşmesine ne denir?',
            secenekler: ['Buharlaşma', 'Süblimleşme', 'Yoğunlaşma', 'Donma'],
            dogru: 2,
            ipucu: 'Soğuk yüzeylere değen su buharı sıvıya döner; bu olay yoğunlaşmadır.'
          },
          {
            saniye: 360,
            soru: 'Katının doğrudan gaz hâline geçmesine ne ad verilir?',
            secenekler: ['Erime', 'Donma', 'Buharlaşma', 'Süblimleşme'],
            dogru: 3,
            ipucu: 'Naftalin ve kuru buz gibi maddeler sıvı hâle geçmeden doğrudan gaz olur; buna süblimleşme denir.'
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
          },
          {
            saniye: 240,
            soru: 'Evlerde çift cam kullanılmasının amacı nedir?',
            secenekler: [
              'Güneş ışığını artırmak',
              'Isı yalıtımı sağlamak',
              'Sesi artırmak',
              'Camı daha sağlam yapmak'
            ],
            dogru: 1,
            ipucu: 'Çift cam arasındaki hava tabakası ısının geçişini yavaşlatarak yalıtım sağlar.'
          },
          {
            saniye: 300,
            soru: 'Termos bardakta içeceğin sıcaklığının uzun süre korunmasının nedeni nedir?',
            secenekler: [
              'Termosun elektrikle ısıtması',
              'Çift cidarlı yapısı ve vakum tabakası sayesinde ısı iletimini azaltması',
              'Camın ısıyı iletmesi',
              'İçindeki soğutucu gaz'
            ],
            dogru: 1,
            ipucu: 'Termos çift cidarlı ve aralarında vakum olan bir yapıya sahip; bu ısı iletimini en aza indirir.'
          },
          {
            saniye: 360,
            soru: 'Isı iletiminin gerçekleşmesi için ne gereklidir?',
            secenekler: [
              'İki cisim arasında sıcaklık farkı olmalıdır.',
              'İki cismin aynı sıcaklıkta olması gerekir.',
              'Cisimlerin mutlaka metal olması gerekir.',
              'Isı iletimi yalnızca sıvılarda gerçekleşir.'
            ],
            dogru: 0,
            ipucu: 'Isı her zaman sıcak cisimden soğuk cisme doğru akar; bunun için iki cisim arasında sıcaklık farkı olmalıdır.'
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
          },
          {
            saniye: 240,
            soru: '"Yüz" sözcüğü aşağıdaki cümlelerin hangisinde farklı bir anlamda kullanılmıştır?',
            secenekler: [
              'Sınıfta yüz öğrenci var.',
              'Yüzünü yıkadı.',
              'Yüz lira bozuk para istedi.',
              'Toplantıya yüz kişi katıldı.'
            ],
            dogru: 1,
            ipucu: 'Eş sesli sözcükler; yazılış ve okunuşları aynı, anlamları farklı sözcüklerdir.'
          },
          {
            saniye: 300,
            soru: '"Kır" sözcüğü hangi cümlede "renk" anlamında kullanılmıştır?',
            secenekler: [
              'Bu sopayı kır.',
              'Saçları kır olmaya başladı.',
              'Kıra pikniğe gittik.',
              'Kalemi kır, kullanma.'
            ],
            dogru: 1,
            ipucu: 'Eş sesli "kır": renk (ak/gri), açık alan ve kırmak (fiil) anlamlarında kullanılır.'
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
          },
          {
            saniye: 240,
            soru: '"Aktüel" sözcüğünün Türkçe karşılığı hangisidir?',
            secenekler: ['Güncel', 'Tarihsel', 'Bilimsel', 'Sanatsal'],
            dogru: 0,
            ipucu: 'Dilimize Fransızcadan giren sözcüklerin yerine Türkçe karşılıkları kullanılmalıdır.'
          },
          {
            saniye: 300,
            soru: '"Tolerans" sözcüğünün Türkçe karşılığı hangisidir?',
            secenekler: ['Sabır', 'Hoşgörü', 'Duygu', 'Saygı'],
            dogru: 1,
            ipucu: 'Yabancı sözcükler yerine Türkçe karşılıklarını kullanmak dilimizi zenginleştirir.'
          },
          {
            saniye: 360,
            soru: '"Konser" sözcüğünün Türkçe karşılığı nedir?',
            secenekler: ['Sergi', 'Dinleti', 'Gösteri', 'Tiyatro'],
            dogru: 1,
            ipucu: 'Sanatçının müzik icra ettiği etkinliğin Türkçe karşılığı "dinleti"dir.'
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
          },
          {
            saniye: 240,
            soru: 'Aşağıdaki cümlelerden hangisi nesneldir?',
            secenekler: [
              'Bu film çok sıkıcıydı.',
              'Türkiye\'nin başkenti Ankara\'dır.',
              'Bence en güzel mevsim sonbahardır.',
              'Futbol harika bir spordur.'
            ],
            dogru: 1,
            ipucu: 'Nesnel cümleler kişiden kişiye değişmeyen, kanıtlanabilir bilgiler içerir.'
          },
          {
            saniye: 300,
            soru: '"Bu kitap çok güzel yazılmış." cümlesi hangi tür bir yargı içermektedir?',
            secenekler: [
              'Nesnel — herkesçe doğrulanabilir',
              'Öznel — kişisel bir beğeni içermektedir',
              'Ne öznel ne nesnel',
              'Bilimsel bir yargıdır'
            ],
            dogru: 1,
            ipucu: 'Öznel cümleler kişiden kişiye değişen, kanıtlanamayan yargılar içerir.'
          },
          {
            saniye: 360,
            soru: 'Aşağıdakilerden hangisi öznel bir cümledir?',
            secenekler: [
              'Güneş doğudan doğar.',
              'Su 100°C\'de kaynar.',
              'Türkçe öğrenmesi kolay bir dildir.',
              'İstanbul iki kıta üzerindedir.'
            ],
            dogru: 2,
            ipucu: '"Kolay" gibi değerlendirmeler kişiden kişiye değişir; bu öznel cümle yapar.'
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
          },
          {
            saniye: 240,
            soru: '"Tebrikler, yarışmayı kazandın___" Bu cümlenin sonuna hangi noktalama işareti gelir?',
            secenekler: ['.', '?', '!', '...'],
            dogru: 2,
            ipucu: 'Sevinç, coşku veya ünlem bildiren cümlelerin sonuna ünlem işareti konur.'
          },
          {
            saniye: 300,
            soru: 'Sıralama virgülü için hangi kural doğrudur?',
            secenekler: [
              'Sıralanan öğelerin sonuncusundan önce virgül konmaz.',
              'Sıralanan tüm öğelerden sonra virgül konur.',
              'Sıralanan öğeler arasında virgül kullanılmaz.',
              'Virgül sadece cümle sonunda kullanılır.'
            ],
            dogru: 0,
            ipucu: 'Sıralanan kelimeler arasına virgül konur; son öğeden önce "ve/ile" varsa virgül gelmez.'
          },
          {
            saniye: 360,
            soru: '"Ankara, Türkiye\'nin başkentidir." cümlesindeki virgülün görevi nedir?',
            secenekler: [
              'Sıralama virgülü',
              'Özne ile açıklama arasında açıklayıcı virgül',
              'Uzun cümlelerde nefes yeri',
              'Alıntı virgülü'
            ],
            dogru: 1,
            ipucu: 'Özne ile yüklem arasına açıklayıcı bilgi eklendiğinde virgül kullanılır.'
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
          },
          {
            saniye: 240,
            soru: '"Koşmak" sözcüğü hangi sözcük türüdür?',
            secenekler: ['İsim', 'Fiil', 'Sıfat', 'Zarf'],
            dogru: 1,
            ipucu: 'Fiiller iş, oluş ve durum bildiren sözcüklerdir; "koşmak" bir hareket bildiriyor.'
          },
          {
            saniye: 300,
            soru: 'Aşağıdakilerden hangisi isim grubuna girer?',
            secenekler: ['Koşmak', 'Güzel', 'Hızlıca', 'Kalem'],
            dogru: 3,
            ipucu: 'İsimler varlıkları ve kavramları karşılar; "kalem" somut bir varlık adıdır.'
          },
          {
            saniye: 360,
            soru: '"Uyumak" fiilinden türeyen isim hangisidir?',
            secenekler: ['Uyuyan', 'Uyku', 'Uyuyor', 'Uyutmak'],
            dogru: 1,
            ipucu: '"Uyku" sözcüğü "uyumak" fiilinden türetilmiş bir isimdir.'
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
          },
          {
            saniye: 240,
            soru: 'Aşağıdakilerden hangisi büyük harfle yazılmaz?',
            secenekler: [
              'Ülke adları',
              'Şehir adları',
              'Mevsim adları',
              'Kişi adları'
            ],
            dogru: 2,
            ipucu: 'Mevsim adları (ilkbahar, yaz, sonbahar, kış) özel ad olmadığından küçük harfle yazılır.'
          },
          {
            saniye: 300,
            soru: '"Atatürk, cumhuriyeti 29 ekim 1923\'te ilan etti." cümlesindeki yazım yanlışı nedir?',
            secenekler: [
              'Atatürk büyük harfle başlamamalı.',
              '"Ekim" ay adı büyük harfle başlamalı.',
              'Cümle doğru yazılmış.',
              '"Cumhuriyeti" büyük harfle yazılmalı.'
            ],
            dogru: 1,
            ipucu: 'Ay adları Türkçede büyük harfle başlar: Ocak, Şubat, Ekim gibi.'
          },
          {
            saniye: 360,
            soru: 'Kitap, dergi ve gazete adları nasıl yazılır?',
            secenekler: [
              'Tamamen büyük harfle',
              'Her sözcüğü büyük harfle',
              'Tırnak içinde ve her sözcüğünün ilk harfi büyük',
              'Sadece baş harfi büyük'
            ],
            dogru: 2,
            ipucu: 'Kitap, dergi ve gazete adları tırnak içine alınır ve her sözcüğünün ilk harfi büyük yazılır.'
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
          },
          {
            saniye: 240,
            soru: 'UNESCO Dünya Mirası Listesi\'ne alınmak için bir alanın taşıması gereken özellik nedir?',
            secenekler: [
              'Sadece çok eski olması',
              'Olağanüstü evrensel değer taşıması',
              'Bir ülkenin en büyük yapısı olması',
              'En çok ziyaret edilen yer olması'
            ],
            dogru: 1,
            ipucu: 'UNESCO, olağanüstü evrensel değer taşıyan alanları Dünya Mirası Listesi\'ne alır.'
          },
          {
            saniye: 300,
            soru: 'Kültürel mirasın korunması neden önemlidir?',
            secenekler: [
              'Sadece turizm geliri sağlamak için',
              'Yalnızca müzeleri doldurmak için',
              'Geçmişi geleceğe aktarmak ve kimliğimizi korumak için',
              'Devlet binası olarak kullanmak için'
            ],
            dogru: 2,
            ipucu: 'Kültürel miras, bir toplumun tarihini, değerlerini ve kimliğini gelecek nesillere taşır.'
          },
          {
            saniye: 360,
            soru: 'Türkiye\'de aşağıdakilerden hangisi UNESCO Dünya Mirası Listesi\'nde yer almaktadır?',
            secenekler: ['Kocatepe Camii', 'Kapadokya', 'Atatürk Havalimanı', 'İstanbul Boğaz Köprüsü'],
            dogru: 1,
            ipucu: 'Kapadokya, eşsiz peribacaları ve yeraltı şehirleriyle UNESCO listesinde yer alır.'
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
          },
          {
            saniye: 240,
            soru: 'Kültürel zenginlikler bir ülkenin ekonomisine nasıl katkı sağlar?',
            secenekler: [
              'Sağlamaz, kültür ekonomiyle ilgili değildir.',
              'Turizm geliri ve istihdam yoluyla katkı sağlar.',
              'Sadece devlet bütçesini zorlar.',
              'Yalnızca sanata katkı sağlar.'
            ],
            dogru: 1,
            ipucu: 'Kültürel mekânları ziyaret eden turistler, yörenin ekonomisine önemli katkı sağlar.'
          },
          {
            saniye: 300,
            soru: 'Geleneksel el sanatları neden korunmalıdır?',
            secenekler: [
              'Çünkü ucuz üretim sağlarlar.',
              'Çünkü yalnızca yabancılara satılırlar.',
              'Çünkü kültürel kimliği yansıtır ve nesiller arası aktarımı sağlarlar.',
              'Çünkü zorunlu ihtiyaçları karşılarlar.'
            ],
            dogru: 2,
            ipucu: 'Geleneksel el sanatları, kültürümüzün somut göstergelerinden biri ve kimliğimizi yansıtır.'
          },
          {
            saniye: 360,
            soru: 'Kültürel zenginliklerin toplumsal birlik açısından önemi nedir?',
            secenekler: [
              'Toplumsal birliğe katkısı yoktur.',
              'Ortak değerler ve geçmiş paylaşımı toplumu bir arada tutar.',
              'Yalnızca ayrımcılığa yol açar.',
              'Sadece bireysel kimlik oluşturur.'
            ],
            dogru: 1,
            ipucu: 'Ortak kültürel miras, bir toplumun bağlarını güçlendiren ve birliği pekiştiren temel unsurdur.'
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
          },
          {
            saniye: 240,
            soru: 'Aşağıdakilerden hangisi beşeri (insan yapımı) bir çevre unsurudur?',
            secenekler: ['Dağlar', 'Nehirler', 'Köprüler', 'Ormanlar'],
            dogru: 2,
            ipucu: 'İnsanlar tarafından oluşturulan her şey beşeri çevrenin parçasıdır.'
          },
          {
            saniye: 300,
            soru: 'İnsanların doğal çevreyi dönüştürmesine ne denir?',
            secenekler: ['Doğal afet', 'Coğrafi keşif', 'Beşeri müdahale', 'İklim değişikliği'],
            dogru: 2,
            ipucu: 'İnsanlar tarım, yapılaşma ve sanayiyle doğal çevreyi dönüştürür; buna beşeri müdahale denir.'
          },
          {
            saniye: 360,
            soru: 'Doğal çevrenin korunması için bireysel düzeyde neler yapılabilir?',
            secenekler: [
              'Yalnızca devlet önlem alabilir.',
              'Hiçbir şey yapılamaz.',
              'Geri dönüşüm, su tasarrufu ve ağaç dikme gibi davranışlar.',
              'Sadece fabrikaları kapatmak yeterlidir.'
            ],
            dogru: 2,
            ipucu: 'Her bireyin çevreye duyarlı davranışları doğanın korunmasına katkı sağlar.'
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
          },
          {
            saniye: 120,
            soru: 'Anadolu neden "medeniyetler beşiği" olarak adlandırılır?',
            secenekler: [
              'Yalnızca Osmanlı\'nın yurdu olduğu için.',
              'Tarih boyunca pek çok farklı medeniyete ev sahipliği yaptığı için.',
              'Dünyanın en büyük kıtası olduğu için.',
              'En çok nüfusa sahip bölge olduğu için.'
            ],
            dogru: 1,
            ipucu: 'Anadolu; Hitit, Frig, Lidya, Roma, Bizans ve daha pek çok medeniyete ev sahipliği yapmıştır.'
          },
          {
            saniye: 180,
            soru: 'Anadolu\'da bulunan Çatalhöyük\'ün önemi nedir?',
            secenekler: [
              'Dünyanın en büyük camiidir.',
              'Dünyanın bilinen en eski kentleşme örneklerinden biridir.',
              'İlk Türk devletinin kurulduğu yerdir.',
              'Olimpiyat oyunlarının yapıldığı ilk alandır.'
            ],
            dogru: 1,
            ipucu: 'Çatalhöyük, yaklaşık 9.000 yıllık geçmişiyle dünyanın en eski yerleşim merkezlerinden biridir.'
          },
          {
            saniye: 240,
            soru: 'Anadolu\'daki hangi medeniyet yazıyı ilk kullananlar arasında yer alır?',
            secenekler: ['Frigler', 'Hititler', 'Lidyalılar', 'Romalılar'],
            dogru: 1,
            ipucu: 'Hititler çivi yazısı kullanmış ve pek çok yazılı belge bırakmış önemli bir Anadolu medeniyetidir.'
          },
          {
            saniye: 300,
            soru: 'Anadolu\'nun dünya kültürel mirasına katkısına örnek olarak hangisi verilebilir?',
            secenekler: ['Çin Seddi', 'Mısır Piramitleri', 'Efes Antik Kenti', 'Eiffel Kulesi'],
            dogru: 2,
            ipucu: 'Efes, Türkiye\'deki önemli antik kentlerden biri olup Anadolu\'nun zengin kültürel mirasını yansıtır.'
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
          },
          {
            saniye: 240,
            soru: 'Etkin bir vatandaş aşağıdakilerden hangisini yapar?',
            secenekler: [
              'Toplumsal sorunlarla ilgilenmez.',
              'Sadece kendi çıkarını düşünür.',
              'Toplumsal sorunlara duyarlı olur ve çözüm üretmeye çalışır.',
              'Hiçbir zaman oy kullanmaz.'
            ],
            dogru: 2,
            ipucu: 'Etkin vatandaş, topluma karşı sorumluluk duyar ve haklarını bilir.'
          },
          {
            saniye: 300,
            soru: 'Demokratik bir toplumda vatandaşların en temel siyasi katılım hakkı nedir?',
            secenekler: ['Gösteri düzenlemek', 'Oy kullanmak', 'Dernek kurmak', 'Dilekçe vermek'],
            dogru: 1,
            ipucu: 'Seçimlerde oy kullanmak, demokratik katılımın en temel biçimidir.'
          },
          {
            saniye: 360,
            soru: 'Sivil toplum kuruluşlarının (dernekler, vakıflar) toplumdaki rolü nedir?',
            secenekler: [
              'Yalnızca devlet adına çalışmak.',
              'Toplumsal sorunlara çözüm üretmek ve dayanışmayı güçlendirmek.',
              'Ticari kazanç sağlamak.',
              'Siyasi partileri yönetmek.'
            ],
            dogru: 1,
            ipucu: 'Sivil toplum kuruluşları, toplumun ihtiyaçlarını karşılamak için gönüllülük esasıyla çalışır.'
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
          },
          {
            saniye: 240,
            soru: 'Türkiye Cumhuriyeti hangi tarihte ilan edilmiştir?',
            secenekler: ['23 Nisan 1920', '30 Ağustos 1922', '29 Ekim 1923', '3 Mart 1924'],
            dogru: 2,
            ipucu: 'Cumhuriyetimiz, 29 Ekim 1923\'te Atatürk önderliğinde ilan edilmiştir.'
          },
          {
            saniye: 300,
            soru: 'Demokrasilerde yasama yetkisi kimde bulunur?',
            secenekler: ['Cumhurbaşkanında', 'Orduda', 'Halk tarafından seçilen parlamentoda', 'Yargıda'],
            dogru: 2,
            ipucu: 'Kanun yapmak ve değiştirmek halkın seçtiği yasama organına aittir.'
          },
          {
            saniye: 360,
            soru: 'Cumhuriyet yönetiminde devlet başkanı nasıl belirlenir?',
            secenekler: [
              'Miras yoluyla (saltanat)',
              'Askeri atama ile',
              'Halk tarafından seçimle',
              'Dini liderler tarafından'
            ],
            dogru: 2,
            ipucu: 'Cumhuriyetin temel özelliği: devlet başkanının halk tarafından seçilmesidir.'
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
          },
          {
            saniye: 240,
            soru: 'Almanya\'dan biri için doğru milliyet ifadesi hangisidir?',
            secenekler: ['He is German.', 'He is Germany.', 'He is Germanian.', 'He is Germanish.'],
            dogru: 0,
            ipucu: 'Ülke adı "Germany", milliyet sıfatı "German" — the man from Germany is German.'
          },
          {
            saniye: 300,
            soru: '"Where are you from?" sorusuna doğru cevap biçimi hangisidir?',
            secenekler: [
              'I am from Turkey. / I am Turkish.',
              'I am Turkey.',
              'I from Turkey.',
              'I be Turkish.'
            ],
            dogru: 0,
            ipucu: '"I am from + ülke adı" veya "I am + milliyet sıfatı" doğru kalıplardır.'
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
          },
          {
            saniye: 180,
            soru: 'Kitap ödünç almak için nereye gidilir?',
            secenekler: ['Library (kütüphane)', 'Hospital (hastane)', 'Bakery (fırın)', 'Pharmacy (eczane)'],
            dogru: 0,
            ipucu: '"You can borrow books from the library." — kütüphane kitap ödünç alma yeridir.'
          },
          {
            saniye: 240,
            soru: '"Turn left at the traffic lights." cümlesinin anlamı nedir?',
            secenekler: [
              'Trafik ışıklarında sola dön.',
              'Trafik ışıklarında sağa dön.',
              'Trafik ışıklarında düz git.',
              'Trafik ışıklarında dur.'
            ],
            dogru: 0,
            ipucu: '"Turn left" = sola dön; "Turn right" = sağa dön.'
          },
          {
            saniye: 300,
            soru: '"Opposite the park" ne anlama gelir?',
            secenekler: ['Parkın karşısında', 'Parkın yanında', 'Parkın arkasında', 'Parkın içinde'],
            dogru: 0,
            ipucu: '"Opposite" = karşısında — The cinema is opposite the park.'
          },
          {
            saniye: 360,
            soru: '"Go straight on." komutunun anlamı nedir?',
            secenekler: ['Düz git.', 'Sola dön.', 'Geri dön.', 'Dur.'],
            dogru: 0,
            ipucu: '"Go straight on / Go straight ahead" = düz devam et.'
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
          },
          {
            saniye: 180,
            soru: 'Hobi sormanın doğru biçimi hangisidir?',
            secenekler: [
              'What do you do in your free time? / What are your hobbies?',
              'What is your free time?',
              'Do you have free?',
              'What you do for hobby?'
            ],
            dogru: 0,
            ipucu: '"What do you do in your free time?" en yaygın hobi sorusu kalıbıdır.'
          },
          {
            saniye: 240,
            soru: '"I enjoy playing chess." cümlesinde "enjoy" fiilinden sonra hangi yapı kullanılmıştır?',
            secenekler: ['Gerund (fiil + -ing)', 'Base verb (yalın hali)', 'To + fiil', 'Geçmiş zaman (V2)'],
            dogru: 0,
            ipucu: '"Enjoy" fiilinden sonra daima gerund (-ing) gelir: I enjoy playing, reading, swimming…'
          },
          {
            saniye: 300,
            soru: 'Aşağıdakilerden hangisi kapalı alan (indoor) hobisidir?',
            secenekler: ['Playing video games', 'Cycling', 'Swimming', 'Hiking'],
            dogru: 0,
            ipucu: 'Indoor hobbies = evde yapılanlar: playing video games, reading, drawing vb.'
          },
          {
            saniye: 360,
            soru: '"She rarely goes to the cinema." cümlesinde "rarely" ne anlama gelir?',
            secenekler: ['Nadiren', 'Sık sık', 'Her zaman', 'Hiçbir zaman'],
            dogru: 0,
            ipucu: '"Rarely" = nadiren, çok az sıklıkla. Rarely ≈ %10-15 sıklık.'
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
          },
          {
            saniye: 180,
            soru: '"She brushes her teeth every day." cümlesinde neden "brush" değil "brushes" kullanılmıştır?',
            secenekler: [
              'Özne 3. tekil şahıs (she) olduğu için geniş zamanda -s/-es eki alır.',
              'Geniş zamanda her fiil -s alır.',
              'Fiil "to be" ile kullanıldığında -s alır.',
              'Soru cümlesi olduğu için.'
            ],
            dogru: 0,
            ipucu: 'Simple Present: he/she/it için fiile -s/-es eklenir — She brushes, He goes, It starts.'
          },
          {
            saniye: 240,
            soru: 'Aşağıdaki günlük rutin cümlelerinden hangisi doğrudur?',
            secenekler: [
              'I wake up at 7 o\'clock every morning.',
              'I wakes up at 7 o\'clock every morning.',
              'I am wake up at 7 o\'clock.',
              'I woke up at 7 o\'clock every morning.'
            ],
            dogru: 0,
            ipucu: '"I" için geniş zamanda fiile ek gelmez: I wake up (✓), I wakes up (✗).'
          },
          {
            saniye: 300,
            soru: '"Go to bed" ifadesinin zıt anlamlısı nedir?',
            secenekler: ['Wake up / Get up', 'Come home', 'Have lunch', 'Take a shower'],
            dogru: 0,
            ipucu: '"Go to bed" = yatmak; karşıtı "wake up / get up" = uyanmak / kalkmak.'
          },
          {
            saniye: 360,
            soru: '"At" zaman edatı hangi durumda kullanılır?',
            secenekler: [
              'Belirli saatler için — at 7:30, at noon, at night.',
              'Aylar için — at January.',
              'Yıllar için — at 2024.',
              'Mevsimler için — at summer.'
            ],
            dogru: 0,
            ipucu: 'Zaman edatları: AT + saat/gece; IN + sabah/öğleden sonra/akşam/ay/yıl; ON + gün/tarih.'
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
          },
          {
            saniye: 180,
            soru: '"I have a headache." cümlesini Türkçeye çevir.',
            secenekler: ['Başım ağrıyor.', 'Karnım ağrıyor.', 'Dişim ağrıyor.', 'Boğazım ağrıyor.'],
            dogru: 0,
            ipucu: '"head" = baş, "ache" = ağrı → headache = baş ağrısı.'
          },
          {
            saniye: 240,
            soru: 'Sağlıklı kalmak için hangisi doğru bir alışkanlıktır?',
            secenekler: [
              'Eating vegetables and drinking water.',
              'Eating junk food every day.',
              'Sleeping only 3 hours.',
              'Never exercising.'
            ],
            dogru: 0,
            ipucu: 'Healthy habits: eat vegetables, drink water, sleep enough, exercise regularly.'
          },
          {
            saniye: 300,
            soru: '"What\'s the matter?" sorusuna uygun cevap hangisidir?',
            secenekler: [
              'I have a sore throat.',
              'I am a doctor.',
              'I go to school.',
              'I like apples.'
            ],
            dogru: 0,
            ipucu: '"What\'s the matter? / What\'s wrong?" = Ne var? — şikayeti "I have a…" ile belirt.'
          },
          {
            saniye: 360,
            soru: '"I have a fever." cümlesinde "fever" ne anlama gelir?',
            secenekler: ['Ateş', 'Öksürük', 'Baş ağrısı', 'Mide bulantısı'],
            dogru: 0,
            ipucu: '"Fever" = ateş — I have a fever = Ateşim var.'
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
          },
          {
            saniye: 180,
            soru: 'Nezle olduğunda hangi tavsiyeyi vermek doğrudur?',
            secenekler: [
              'You should drink hot tea and rest.',
              'You should eat ice cream.',
              'You shouldn\'t drink water.',
              'You should go out in cold weather.'
            ],
            dogru: 0,
            ipucu: '"Should" tavsiye bildirir — nezlede sıcak içki içmek ve dinlenmek önerilir.'
          },
          {
            saniye: 240,
            soru: '"You should see a doctor." cümlesinin Türkçesi nedir?',
            secenekler: [
              'Doktora gitmelisin.',
              'Doktoru seviyorsun.',
              'Doktor olmak istiyorsun.',
              'Doktora gitme.'
            ],
            dogru: 0,
            ipucu: '"Should" = -meli/-malı; "see a doctor" = doktora gitmek/görünmek.'
          },
          {
            saniye: 300,
            soru: 'Boğaz ağrısı için doğru öneri hangisidir?',
            secenekler: [
              'You should gargle with salt water.',
              'You should eat spicy food.',
              'You should talk a lot.',
              'You shouldn\'t drink warm liquids.'
            ],
            dogru: 0,
            ipucu: 'Boğaz ağrısında tuzlu suyla gargara yapmak ve sıcak sıvı içmek önerilir.'
          },
          {
            saniye: 360,
            soru: '"Should" ile "must" arasındaki fark nedir?',
            secenekler: [
              '"Should" öneri/tavsiye bildirir; "must" zorunluluk bildirir.',
              'İkisi tamamen aynı anlama gelir.',
              '"Must" daha nazik bir tavsiyedir.',
              '"Should" yasakları bildirir.'
            ],
            dogru: 0,
            ipucu: 'Should = tavsiye (You should rest.); Must = zorunluluk (You must wear a mask.)'
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
