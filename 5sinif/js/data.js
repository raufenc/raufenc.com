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
          },
          {
            saniye: 420,
            soru: '5.307.024 sayısında "3" rakamının basamak değeri kaçtır?',
            secenekler: ['3.000', '30.000', '300.000', '3.000.000'],
            dogru: 2,
            ipucu: '5.307.024 sayısında 3 yüz binler basamağındadır: 3 × 100.000 = 300.000.'
          },
          {
            saniye: 480,
            soru: '4.020.608 sayısının çözümlemesinde hangi basamak değerleri yazılmaz?',
            secenekler: [
              'Milyonlar ve yüzler',
              'On binler, binler ve onlar basamakları (sıfır içerdiklerinden)',
              'Birler ve yüz binler',
              'Hiçbiri; tüm basamaklar yazılır.'
            ],
            dogru: 1,
            ipucu: '0 rakamının basamak değeri 0 olur; çözümlemede 0 olan basamaklar atlanır.'
          },
          {
            saniye: 'fin',
            soru: 'Aşağıdakilerden hangisi "basamak değeri" ve "sayı değeri" kavramlarını doğru şekilde özetler?',
            secenekler: [
              'Sayı değeri rakamın kendisi; basamak değeri rakamın bulunduğu basamakla çarpımıdır.',
              'İkisi de her zaman aynı değeri verir.',
              'Basamak değeri rakamın kendisi; sayı değeri bulunduğu basamakla çarpımıdır.',
              'Sayı değeri yalnızca birler basamağında anlam taşır.'
            ],
            dogru: 0,
            ipucu: 'Basamak değeri = rakam × basamağın değeri. Sayı değeri = rakamın kendisi.'
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
          },
          {
            saniye: 420,
            soru: 'Aşağıdakilerden hangisi basit (tam sayılı değil) bir kesirdir?',
            secenekler: ['3 1/4', '7/5', '3/8', '2 2/3'],
            dogru: 2,
            ipucu: 'Basit kesirde pay paydasından küçüktür: 3/8 → 3 < 8 ✓'
          },
          {
            saniye: 480,
            soru: '9/4 kesrini tam sayılı kesir olarak nasıl yazarsın?',
            secenekler: ['1 1/4', '2 1/4', '2 3/4', '3 1/4'],
            dogru: 1,
            ipucu: '9 ÷ 4 = 2 kalan 1 → tam sayılı kesir: 2 ve 1/4 yani 2 1/4.'
          },
          {
            saniye: 'fin',
            soru: 'Birim kesir, basit kesir ve bileşik kesir arasındaki farkı en iyi hangisi açıklar?',
            secenekler: [
              'Birim kesirde pay=1; basit kesirde pay<payda; bileşik kesirde pay>payda.',
              'Hepsinde pay 1\'dir; fark paydadadır.',
              'Bileşik kesirde pay paydadan küçüktür.',
              'Birim kesirde pay paydasına eşittir.'
            ],
            dogru: 0,
            ipucu: '1/5 birim; 3/5 basit; 7/5 bileşik — pay-payda ilişkisine bak.'
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
          },
          {
            saniye: 420,
            soru: 'Bir fabrika günde 348 araba üretmektedir. 15 günde kaç araba üretir?',
            secenekler: ['4.220', '5.220', '5.020', '4.520'],
            dogru: 1,
            ipucu: '348 × 15 = 348 × 10 + 348 × 5 = 3480 + 1740 = 5220.'
          },
          {
            saniye: 480,
            soru: 'Toplam 1.248 öğrenci 8 eşit sınıfa bölünüyor. Her sınıfta kaç öğrenci olur?',
            secenekler: ['146', '156', '148', '166'],
            dogru: 1,
            ipucu: '1.248 ÷ 8 = ? Basamak basamak böl: 12÷8=1 kalan 4 → 48÷8=6 → 156.'
          },
          {
            saniye: 'fin',
            soru: 'Çarpma ve bölme problemlerini çözerken hangi strateji en doğrudur?',
            secenekler: [
              'Problemdeki tüm sayıları topla.',
              'Adım adım işlem yap; önce ne bilindiğini, ne sorulduğunu belirle.',
              'Her zaman önce bölme, sonra çarpma işlemi yap.',
              'Yalnızca büyük sayıyı küçük sayıyla çarp.'
            ],
            dogru: 1,
            ipucu: 'Problem çözme: verilenler → istenilen → işlem sırası. Kontrol için ters işlem kullan.'
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
          },
          {
            saniye: 420,
            soru: 'Alanı 48 cm² ve genişliği 6 cm olan dikdörtgenin uzunluğu kaç cm\'dir?',
            secenekler: ['6 cm', '8 cm', '9 cm', '12 cm'],
            dogru: 1,
            ipucu: 'Alan = uzunluk × genişlik → uzunluk = 48 ÷ 6 = 8 cm.'
          },
          {
            saniye: 480,
            soru: 'Kenar uzunluğu 9 cm olan karenin çevresi kaç cm\'dir?',
            secenekler: ['18 cm', '27 cm', '36 cm', '81 cm'],
            dogru: 2,
            ipucu: 'Karenin çevresi = 4 × kenar = 4 × 9 = 36 cm.'
          },
          {
            saniye: 'fin',
            soru: 'Alan ve çevre hesaplamalarında en önemli fark nedir?',
            secenekler: [
              'Alan, şeklin içini kaplar (cm²); çevre, dış sınırının uzunluğudur (cm).',
              'Alan ile çevre her zaman aynı sayısal değeri verir.',
              'Çevre kenarların çarpımı; alan kenarların toplamıdır.',
              'Alan yalnızca kareler için, çevre yalnızca dikdörtgenler için hesaplanır.'
            ],
            dogru: 0,
            ipucu: 'Alan = kısa × uzun (cm²); çevre = 2×(kısa+uzun) (cm). Birimlerine dikkat!'
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
          },
          {
            saniye: 420,
            soru: '12.345.678 sayısında binler bölüğü hangi rakamlardan oluşur?',
            secenekler: ['1 ve 2', '3, 4 ve 5', '6, 7 ve 8', '1, 2 ve 3'],
            dogru: 1,
            ipucu: 'Binler bölüğü: yüz binler (3), on binler (4) ve binler (5) basamaklarından oluşur.'
          },
          {
            saniye: 480,
            soru: '9 milyar 40 milyon 7 bin 15 sayısını rakamlarla nasıl yazarsın?',
            secenekler: ['9.040.007.015', '9.400.070.015', '9.040.700.015', '9.004.007.015'],
            dogru: 0,
            ipucu: '9 milyar → 9.000.000.000; 40 milyon → 40.000.000; 7 bin → 7.000; 15 → 15.'
          },
          {
            saniye: 'fin',
            soru: 'Büyük sayıları bölüklere ayırmanın temel kuralı hangisidir?',
            secenekler: [
              'Sağdan başlayarak her 3 basamakta bir gruplama yapılır: birler, binler, milyonlar, milyarlar.',
              'Soldan başlayarak her 2 basamakta bir gruplama yapılır.',
              'Yalnızca 6 basamaklı sayılar bölüklere ayrılır.',
              'Bölükler her zaman eşit sayıda rakam içerir.'
            ],
            dogru: 0,
            ipucu: 'Sağdan: ilk 3 → birler, sonraki 3 → binler, sonraki 3 → milyonlar, son 3 → milyarlar.'
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
          },
          {
            saniye: 420,
            soru: '2 yıl 3 ay kaç aydır?',
            secenekler: ['23 ay', '27 ay', '24 ay', '36 ay'],
            dogru: 1,
            ipucu: '1 yıl = 12 ay → 2 yıl = 24 ay; 24 + 3 = 27 ay.'
          },
          {
            saniye: 480,
            soru: 'Saat 09:45\'te başlayan etkinlik 1 saat 30 dakika sürüyor. Kaçta biter?',
            secenekler: ['10:45', '11:00', '11:15', '11:30'],
            dogru: 2,
            ipucu: '09:45 + 1 saat = 10:45; 10:45 + 30 dakika = 11:15.'
          },
          {
            saniye: 'fin',
            soru: 'Zaman birimlerinin büyükten küçüğe doğru sırası ve dönüşüm katsayıları hangisinde doğrudur?',
            secenekler: [
              'Yıl → ay (÷12) → hafta (÷4) → gün (÷7) → saat (÷24) → dakika (÷60)',
              'Yıl → ay (×12) → hafta (×4) → gün (×7) → saat (×24) → dakika (×60)',
              'Yıl (12 ay), ay (30 gün), gün (24 saat), saat (60 dakika), dakika (60 saniye).',
              'Yıl (10 ay), ay (28 gün), gün (12 saat).'
            ],
            dogru: 2,
            ipucu: '1 yıl=12 ay, 1 ay=30 gün, 1 gün=24 saat, 1 saat=60 dakika, 1 dakika=60 saniye.'
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
          },
          {
            saniye: 420,
            soru: 'Ay yüzeyinde astronotların ayak izleri neden çok uzun süre silinmez?',
            secenekler: [
              'Ay\'da rüzgâr ve hava olmadığı için izleri silen erozyon gerçekleşmez.',
              'Ay yüzeyi çok ıslak olduğu için iz kalıcıdır.',
              'Ay\'da yerçekimi olmadığı için toz havada asılı kalır.',
              'Ay yüzeyi camdan yapılmıştır.'
            ],
            dogru: 0,
            ipucu: 'Atmosfer olmadığında rüzgâr, yağmur ve aşınma yoktur; izler kalıcı olur.'
          },
          {
            saniye: 480,
            soru: 'Ay\'ın hangi özelliği, Dünya\'dan her zaman aynı yüzünü görmemize neden olur?',
            secenekler: [
              'Kendi ekseni etrafındaki dönüş süresi ile Dünya\'nın çevresindeki dolanım süresinin eşit olması.',
              'Ay\'ın çok yavaş dönmesi.',
              'Ay\'ın yalnızca gece görünmesi.',
              'Güneş ışığının Ay\'ı tek taraflı aydınlatması.'
            ],
            dogru: 0,
            ipucu: 'Her iki süre de yaklaşık 27-28 gün olduğundan Ay hep aynı yüzünü bize döner.'
          },
          {
            saniye: 'fin',
            soru: 'Ay hakkında öğrendiklerimizden hangisi doğrudur?',
            secenekler: [
              'Ay\'ın kendi ışığı vardır, atmosferi kalındır ve sıcaklık farkı azdır.',
              'Ay kendi ışığını üretmez; atmosferi neredeyse yoktur; bu yüzden hem kraterleri hem de büyük sıcaklık farkları vardır.',
              'Ay Güneş\'in etrafında döner ve sıcaklığı her yerde eşittir.',
              'Ay\'ın yüzeyinde su bulunmaktadır ve düzenli yağış görülür.'
            ],
            dogru: 1,
            ipucu: 'Ay: kendi ışığı yok, atmosfer yok → kraterler + −172/+100°C sıcaklık farkı.'
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
          },
          {
            saniye: 420,
            soru: 'Kuvvet hangi birimle ölçülür?',
            secenekler: ['Kilogram', 'Newton', 'Metre', 'Joule'],
            dogru: 1,
            ipucu: 'Kuvvetin birimi Newton\'dur (N); bilim insanı Isaac Newton\'ın adından gelir.'
          },
          {
            saniye: 480,
            soru: 'Aşağıdakilerden hangisi esnek olmayan (plastik) bir cismin özelliğidir?',
            secenekler: [
              'Kuvvet kalktıktan sonra eski şekline döner.',
              'Kuvvet uygulandığında şekli değişmez.',
              'Kuvvet kalktıktan sonra şeklini korur, eski haline dönmez.',
              'Kuvvet altında parçalanır ve kaybolur.'
            ],
            dogru: 2,
            ipucu: 'Oyun hamuruna bastırınca şekil değişir; bırakınca eski haline dönmez — bu plastik (esnek olmayan) davranıştır.'
          },
          {
            saniye: 'fin',
            soru: 'Kuvvet ve esnek cisimler konusunu özetleyen hangisidir?',
            secenekler: [
              'Kuvvet yalnızca cisimleri harekete geçirir; esnek cisimler her zaman parçalanır.',
              'Kuvvet: hareket, duruş, şekil/hız/yön değişikliğine yol açar; esnek cisimler kuvvet kalktığında eski haline dönerken esnek olmayanlar dönmez.',
              'Tüm cisimler eşit esnekliğe sahiptir; fark yoktur.',
              'Kuvvet yalnızca itme ya da çekme biçiminde olabilir; başka etkisi yoktur.'
            ],
            dogru: 1,
            ipucu: 'Kuvvetin 4 etkisi: harekete geçirme, durdurma, şekil değiştirme, hız/yön değiştirme.'
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
          },
          {
            saniye: 420,
            soru: 'Kütle hangi alet ile ölçülür?',
            secenekler: ['Dinamometre', 'Termometre', 'Terazi', 'Barometre'],
            dogru: 2,
            ipucu: 'Kütle kilogram birimiyle ölçülür; terazi (hassas veya kefeli) bu işe yarar.'
          },
          {
            saniye: 480,
            soru: 'Uzayda (yerçekimsiz ortamda) astronotun kütlesi ve ağırlığı nasıl değişir?',
            secenekler: [
              'Her ikisi de sıfır olur.',
              'Kütle değişmez; ağırlık sıfır olur (yerçekimi yok).',
              'Kütle artar; ağırlık azalır.',
              'İkisi de yerde olduğu gibi kalır.'
            ],
            dogru: 1,
            ipucu: 'Kütle miktara bağlıdır, değişmez. Ağırlık = kütle × yerçekimi; yerçekimi sıfırsa ağırlık sıfır.'
          },
          {
            saniye: 'fin',
            soru: 'Kütle, ağırlık ve yerçekimi arasındaki ilişkiyi en iyi hangisi özetler?',
            secenekler: [
              'Kütle her yerde aynıdır (kg); ağırlık, yerçekimine bağlı olarak değişir (N); yerçekimi merkezden uzaklaştıkça azalır.',
              'Kütle ve ağırlık her zaman birbirine eşittir.',
              'Ağırlık her yerde sabittir; kütle değişir.',
              'Yerçekimi Ay\'da Dünya\'dan daha fazladır.'
            ],
            dogru: 0,
            ipucu: 'Kütle → terazi, kg; Ağırlık → dinamometre, N. Ay\'da kütle aynı, ağırlık 1/6 olur.'
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
          },
          {
            saniye: 420,
            soru: 'Mikroskop kullanırken önce hangi objektifle başlamak doğrudur?',
            secenekler: ['En yüksek büyütmeli objektifle', 'En düşük büyütmeli objektifle', 'Herhangi biriyle başlanabilir', 'Okülerle'],
            dogru: 1,
            ipucu: 'Önce küçük büyütmeyle genel görüntü elde edilir; ardından yüksek büyütmeye geçilir.'
          },
          {
            saniye: 480,
            soru: 'Hayvan hücrelerinde bulunmayan ama bitki hücrelerinde bulunan yapılar hangileridir?',
            secenekler: [
              'Hücre zarı ve çekirdek',
              'Hücre duvarı, kloroplast ve büyük koful',
              'Mitokondri ve ribozom',
              'Hücre zarı ve mitokondri'
            ],
            dogru: 1,
            ipucu: 'Bitki hücresine özgü yapılar: hücre duvarı, kloroplast, büyük koful (merkezi vacuole).'
          },
          {
            saniye: 'fin',
            soru: 'Hücre ve mikroskop konusunu özetleyen hangisidir?',
            secenekler: [
              'Hücreler gözle görülebilir; mikroskop yalnızca taşları incelemek için kullanılır.',
              'Hücre, canlıların temel yapı birimidir; mikroskopla incelenir; bitki ve hayvan hücrelerinin bazı yapıları farklıdır.',
              'Tüm hücreler aynı yapıya sahiptir; fark yoktur.',
              'Mikroskop büyütmesi oküler ve objektif büyütmelerinin toplamıdır.'
            ],
            dogru: 1,
            ipucu: 'Hücre = temel birim. Bitki: hücre duvarı + kloroplast + büyük koful. Hayvan: bunlar yok.'
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
          },
          {
            saniye: 420,
            soru: 'Erime sırasında madde ısı alır mı yoksa verir mi?',
            secenekler: ['Ortama ısı verir.', 'Ortamdan ısı alır.', 'Hiçbir ısı alışverişi olmaz.', 'Önce alır sonra verir.'],
            dogru: 1,
            ipucu: 'Erimek için enerji gerekir; madde çevresinden ısı alarak erir (endotermik).'
          },
          {
            saniye: 480,
            soru: 'Buharlaşma ile kaynamanın farkı nedir?',
            secenekler: [
              'Buharlaşma yalnızca yüzeyden gerçekleşir ve her sıcaklıkta olur; kaynama belirli bir sıcaklıkta tüm sıvıdan gerçekleşir.',
              'İkisi tamamen aynı olaydır.',
              'Kaynama yüzeyden, buharlaşma iç kısımdan gerçekleşir.',
              'Buharlaşma sadece soğukta, kaynama sıcakta olur.'
            ],
            dogru: 0,
            ipucu: 'Buharlaşma: yüzeyden, her T\'de. Kaynama: belirli kaynama noktasında, tüm sıvıdan.'
          },
          {
            saniye: 'fin',
            soru: 'Maddenin hal değişimlerini doğru özetleyen seçenek hangisidir?',
            secenekler: [
              'Erime (katı→sıvı, ısı alır), Donma (sıvı→katı, ısı verir), Buharlaşma (sıvı→gaz, ısı alır), Yoğuşma (gaz→sıvı, ısı verir), Süblimleşme (katı→gaz).',
              'Erime ısı verir; donma ısı alır.',
              'Tüm hal değişimleri ısı vermekle gerçekleşir.',
              'Süblimleşmede madde önce sıvıya, sonra gaza dönüşür.'
            ],
            dogru: 0,
            ipucu: 'Isı alan değişimler: erime, buharlaşma, süblimleşme. Isı veren: donma, yoğuşma.'
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
          },
          {
            saniye: 420,
            soru: 'Kışın kalın yünlü kıyafet giyilmesinin ısı yalıtımıyla ilişkisi nedir?',
            secenekler: [
              'Yün ısı üretir ve vücudu ısıtır.',
              'Yün gözenekli yapısıyla havayı hapsettiğinden vücut ısısının dışarı kaçmasını engeller.',
              'Yün hava geçirmez olduğundan dışarıdaki soğuğu içeri almaz.',
              'Yünün ısı iletimle ilişkisi yoktur.'
            ],
            dogru: 1,
            ipucu: 'Yün gözenekli → içinde hava hapseder → hava ısı yalıtkanı → vücut ısısı korunur.'
          },
          {
            saniye: 480,
            soru: 'Aşağıdakilerden hangisi ısı yalıtkanı olarak kullanılır?',
            secenekler: ['Alüminyum folyo', 'Demir çubuk', 'Cam yünü', 'Bakır tel'],
            dogru: 2,
            ipucu: 'Cam yünü gözenekli yapısıyla binalarda yaygın kullanılan bir ısı yalıtkan malzemesidir.'
          },
          {
            saniye: 'fin',
            soru: 'Isı iletimi ve yalıtım konusunu en iyi özetleyen hangisidir?',
            secenekler: [
              'Metaller yalıtkan, gözenekli maddeler iletkendir.',
              'Isı soğuk cisimden sıcak cisme akar; metal cisimler iyi iletken, gözenekli maddeler iyi yalıtkandır.',
              'Isı yalnızca sıvılar aracılığıyla iletilir.',
              'Isı her yönde eşit miktarda akar; sıcaklık farkı önemli değildir.'
            ],
            dogru: 1,
            ipucu: 'Isı: sıcaktan soğuğa akar. İletken: metal. Yalıtkan: tahta, plastik, yün, hava, cam yünü.'
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
          },
          {
            saniye: 420,
            soru: '"Gül" sözcüğü aşağıdaki cümlelerden hangisinde fiil olarak kullanılmıştır?',
            secenekler: [
              'Bahçedeki güller açmış.',
              'Neden gülmüyorsun?',
              'Kırmızı gülü sana verdim.',
              'Gül kokusu her yere yayıldı.'
            ],
            dogru: 1,
            ipucu: '"Gül" hem çiçek adı (isim) hem de gülmek fiilinin emir kipidir.'
          },
          {
            saniye: 480,
            soru: '"Dil" sözcüğünün kaç farklı anlamı vardır?',
            secenekler: [
              'Yalnızca 1: konuşma organı.',
              'En az 2: konuşma organı ve iletişim sistemi (Türk dili).',
              'Yalnızca coğrafi anlamı (yarımada) vardır.',
              'Hiçbir eş sesli anlamı yoktur.'
            ],
            dogru: 1,
            ipucu: '"Dil" → organ (dili yutmuş gibi), dil → iletişim sistemi, dil → coğrafyada çıkıntılı kara parçası.'
          },
          {
            saniye: 'fin',
            soru: 'Eş sesli sözcüklerin temel özelliği hangisidir?',
            secenekler: [
              'Yazılışları aynı, okunuşları aynı, anlamları farklı; bağlama göre hangisi olduğu anlaşılır.',
              'Yazılışları farklı ama anlamları aynıdır.',
              'Hem yazılışları hem anlamları aynıdır.',
              'Yalnızca iki farklı sözcük türünde kullanılırlar.'
            ],
            dogru: 0,
            ipucu: '"Yüz, gül, kır, dal, bor, bar…" — hepsi aynı yazılır; anlam cümleden çıkarılır.'
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
          },
          {
            saniye: 420,
            soru: '"Fuar" sözcüğünün Türkçe karşılığı hangisidir?',
            secenekler: ['Sergi', 'Festival', 'Panayır', 'Tiyatro'],
            dogru: 2,
            ipucu: 'Fuar Fransızcadan gelir; Türkçe karşılığı "panayır" veya "sergi" olarak kullanılır.'
          },
          {
            saniye: 480,
            soru: '"Ambülans" sözcüğünün Türkçe karşılığı nedir?',
            secenekler: ['Kurtarma arabası', 'Cankurtaran', 'İtfaiye', 'Polis arabası'],
            dogru: 1,
            ipucu: '"Ambülans" yerine "cankurtaran" sözcüğü Türkçe karşılık olarak kullanılır.'
          },
          {
            saniye: 'fin',
            soru: 'Yabancı sözcükler yerine Türkçe karşılıklarını kullanmanın önemi nedir?',
            secenekler: [
              'Türkçeyi yabancı dillerden üstün kılar.',
              'Dilimizi yabancı etkilerden korur, zenginleştirir ve anlaşılırlığı artırır.',
              'Yabancı sözcükler kullanmak tamamen yasaktır.',
              'Türkçe karşılıklar her zaman daha kısadır.'
            ],
            dogru: 1,
            ipucu: 'Türkçe karşılıklar: dili canlı tutar, anlaşılırlığı artırır, kültürel kimliği korur.'
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
          },
          {
            saniye: 420,
            soru: '"Keşke o konsere gitseydim." cümlesi hangi duyguyu ifade eder?',
            secenekler: ['Pişmanlık', 'Hayıflanma', 'Sevinç', 'Öfke'],
            dogru: 1,
            ipucu: '"Keşke gideyeydim" = gitmedim ama keşke gitseydim → hayıflanma (gerçekleşmeyen eylem için üzüntü).'
          },
          {
            saniye: 480,
            soru: '"Keşke o parayı harcamasaydım." cümlesi hayıflanma mı, pişmanlık mı ifade eder?',
            secenekler: [
              'Hayıflanma — para harcanmadı ama keşke harcansaydı.',
              'Pişmanlık — para harcandı ve bundan üzüntü duyuluyor.',
              'Ne hayıflanma ne de pişmanlık.',
              'Öznel bir yargı bildiriyor.'
            ],
            dogru: 1,
            ipucu: '"Harcamasaydım" → para harcandı (gerçekleşti); olumsuzluk pişmanlığı gösterir.'
          },
          {
            saniye: 'fin',
            soru: 'Öznel-nesnel cümle ile hayıflanma-pişmanlık kavramlarını doğru özetleyen hangisidir?',
            secenekler: [
              'Nesnel cümleler kanıtlanamaz; öznel cümleler herkese göre aynıdır.',
              'Nesnel cümleler kanıtlanabilir; öznel cümleler kişisel yargı içerir. Hayıflanma yapılmayan eylem için, pişmanlık yapılan eylem için duyulan üzüntüdür.',
              'Hayıflanma ve pişmanlık aynı kavramlardır.',
              'Nesnel cümleler yalnızca bilimsel konularda kullanılır.'
            ],
            dogru: 1,
            ipucu: 'Nesnel: kanıtlanabilir. Öznel: kişisel. Hayıflanma: yapmadım keşke yapsaydım. Pişmanlık: yaptım keşke yapmасаydım.'
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
          },
          {
            saniye: 420,
            soru: 'Soru cümlesinin sonuna hangi noktalama işareti konur?',
            secenekler: ['.', '!', '?', '…'],
            dogru: 2,
            ipucu: '"Bugün hava nasıl?" — soru bildiren cümlelerin sonuna soru işareti konur.'
          },
          {
            saniye: 480,
            soru: '"Kitaplar, defterler ve kalemler çantada." cümlesinde virgüllerin işlevi nedir?',
            secenekler: [
              'Açıklama virgülü',
              'Sıralama virgülü',
              'Soru virgülü',
              'Alıntı virgülü'
            ],
            dogru: 1,
            ipucu: 'Sıralanan öğeler arasına konulan virgül sıralama virgülüdür; son öğeden önce "ve" varsa virgül gelmez.'
          },
          {
            saniye: 'fin',
            soru: 'Noktalama işaretlerinin temel amacı nedir?',
            secenekler: [
              'Cümleleri güzel göstermek için kullanılır.',
              'Anlamı belirginleştirmek, okuma doğruluğunu sağlamak ve yazıda durakları göstermek için kullanılır.',
              'Yalnızca yazarların tercihine bağlıdır.',
              'Noktalama işaretleri isteğe bağlıdır.'
            ],
            dogru: 1,
            ipucu: 'Nokta, virgül, soru, ünlem, iki nokta, üç nokta… — hepsi anlam ve ritim için zorunludur.'
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
          },
          {
            saniye: 420,
            soru: 'Aşağıdakilerden hangisi fiildir?',
            secenekler: ['Okul', 'Güzel', 'Yazmak', 'Hızlı'],
            dogru: 2,
            ipucu: '"Yazmak" -mak ekiyle anlamlı olur; fiil = iş/oluş/durum bildiren sözcük.'
          },
          {
            saniye: 480,
            soru: '"Sevgi" sözcüğü hangi sözcük türüdür?',
            secenekler: ['Fiil', 'Sıfat', 'İsim', 'Zarf'],
            dogru: 2,
            ipucu: '"Sevgi" bir duygu adı; soyut isimdir. "Sevmek" fiilinden türetilmiştir ama kendisi isimdir.'
          },
          {
            saniye: 'fin',
            soru: 'İsim ve fiil arasındaki temel fark nedir?',
            secenekler: [
              'İsimler varlık ve kavramları karşılar; fiiller iş, oluş ve durum bildirir. "-mak/-mek" ekiyle fiil test edilebilir.',
              'İsimler her zaman kısadır; fiiller uzundur.',
              'İsimler yalnızca somut varlıkları karşılar.',
              'Fiiller cümlede özne, isimler yüklem görevindedir.'
            ],
            dogru: 0,
            ipucu: 'İsim: kalem, sevgi, okul. Fiil: yazmak, sevmek, gitmek. Test: "-mak ekiyle anlamlı mı?"'
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
          },
          {
            saniye: 420,
            soru: '"türkiye\'nin başkenti ankara\'dır." cümlesinde kaç yazım yanlışı vardır?',
            secenekler: ['1', '2', '3', 'Hiç yok'],
            dogru: 1,
            ipucu: '"Türkiye" ülke adı, "Ankara" şehir adı — her ikisi de büyük harfle başlamalı. 2 hata.'
          },
          {
            saniye: 480,
            soru: 'Hangi sözcük büyük harfle başlamaz?',
            secenekler: ['Atatürk', 'Ocak', 'Kış', 'Marmara'],
            dogru: 2,
            ipucu: 'Mevsim adları (kış, ilkbahar, yaz, sonbahar) özel ad değildir; küçük harfle yazılır.'
          },
          {
            saniye: 'fin',
            soru: 'Büyük harf kullanımının temel kurallarını özetleyen hangisidir?',
            secenekler: [
              'Yalnızca cümle başları büyük harfle başlar.',
              'Cümle başları, özel adlar (kişi, ülke, şehir, ay), unvanlar ve eser adlarının her sözcüğü büyük harfle başlar; mevsim ve gün adları küçük yazılır.',
              'Her sözcük büyük harfle başlar.',
              'Büyük harf yalnızca resmî belgelerde kullanılır.'
            ],
            dogru: 1,
            ipucu: 'Büyük: cümle başı, özel ad, unvan, ay adı. Küçük: mevsim, renk, gün adı (ama ay adı büyük!).'
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
          },
          {
            saniye: 420,
            soru: 'Kültür kavramı nesilden nesile nasıl aktarılır?',
            secenekler: [
              'Yalnızca okullar aracılığıyla.',
              'Aile, toplum, dil, sanat ve gelenekler aracılığıyla.',
              'Sadece kitaplar aracılığıyla.',
              'Kültür nesiller arasında aktarılamaz.'
            ],
            dogru: 1,
            ipucu: 'Kültür, aile yaşamı, sözlü gelenek, okul, sanat eserleri ve günlük yaşam yoluyla aktarılır.'
          },
          {
            saniye: 480,
            soru: 'Farklı kültürlerin bir arada yaşamasına ne ad verilir?',
            secenekler: ['Kültürel çatışma', 'Kültürel yalnızlaşma', 'Kültürel çoğulculuk / mozaik', 'Kültürel tekçilik'],
            dogru: 2,
            ipucu: 'Farklı kültürlerin bir arada, saygı içinde yaşaması kültürel çoğulculuktur; Türkiye bu açıdan zengin bir mozaiğe sahiptir.'
          },
          {
            saniye: 'fin',
            soru: 'Kültürel zenginlikler konusunu özetleyen hangisidir?',
            secenekler: [
              'Kültür yalnızca yemek ve kıyafetten oluşur; diğer unsurlar önemsizdir.',
              'Kültür; dil, din, gelenek, sanat, yemek gibi unsurları kapsar; çeşitlilik toplumu zenginleştirir ve korunması gelecek nesillere aktarım için önemlidir.',
              'Kültür statiktir ve hiçbir zaman değişmez.',
              'Kültürel zenginliğin korumaya ihtiyacı yoktur.'
            ],
            dogru: 1,
            ipucu: 'Kültür = çok boyutlu. Çeşitlilik = güç. Koruma = kimlik aktarımı. UNESCO = evrensel değer.'
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
          },
          {
            saniye: 420,
            soru: 'Kültürel alışveriş (kültürlerarası etkileşim) ne anlama gelir?',
            secenekler: [
              'Bir kültürün diğerini tamamen yok etmesi.',
              'Farklı kültürlerin birbirinden etkilenerek yeni unsurlar kazanması.',
              'Kültürlerin hiç değişmeden kalması.',
              'Yalnızca ticaret yoluyla gerçekleşen değişim.'
            ],
            dogru: 1,
            ipucu: 'Kültürler ticaret, göç, sanat ve iletişim yoluyla birbirini etkiler ve zenginleşir.'
          },
          {
            saniye: 480,
            soru: 'Yerel festival ve şenliklerin kültürel önemi nedir?',
            secenekler: [
              'Yalnızca eğlence amaçlıdır; kültürel değeri yoktur.',
              'Gelenekleri yaşatır, toplumsal dayanışmayı güçlendirir ve turistlere kültür tanıtır.',
              'Ekonomik zararlar yaratır.',
              'Yabancı kültürlerin yayılmasını sağlar.'
            ],
            dogru: 1,
            ipucu: 'Festivaller: gelenek yaşatır, kimlik pekiştirir, turizm katkısı sağlar, dayanışmayı artırır.'
          },
          {
            saniye: 'fin',
            soru: 'Kültürel zenginliklerin birlikte yaşamaya katkısını özetleyen hangisidir?',
            secenekler: [
              'Farklı kültürler her zaman çatışmaya neden olur.',
              'Kültürel çeşitlilik saygı, hoşgörü ve dayanışmayı artırarak toplumun birlikte yaşamasına zemin hazırlar.',
              'Kültürel zenginlikler yalnızca ekonomik değer taşır.',
              'Tek tip kültür toplumsal barışı sağlar.'
            ],
            dogru: 1,
            ipucu: 'Çeşitlilik → zenginlik. Ortak değerler + saygı → birlikte yaşam. Farklılık = tehdit değil, kaynak.'
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
          },
          {
            saniye: 420,
            soru: 'Şehirleşme doğal çevreyi nasıl etkiler?',
            secenekler: [
              'Şehirleşmenin doğal çevreye etkisi yoktur.',
              'Orman ve tarım alanları azalır, hava-su kirliliği artar.',
              'Şehirleşme doğayı her zaman olumlu etkiler.',
              'Yalnızca deniz canlılarını olumsuz etkiler.'
            ],
            dogru: 1,
            ipucu: 'Şehirleşme: beton artışı → yeşil alan kaybı, sanayi → hava ve su kirliliği.'
          },
          {
            saniye: 480,
            soru: 'Aşağıdakilerden hangisi doğal bir çevre değişimine örnek değildir?',
            secenekler: ['Deprem', 'Sel', 'Fabrika kurma', 'Yanardağ patlaması'],
            dogru: 2,
            ipucu: 'Fabrika kurmak insan eliyle gerçekleşir; deprem, sel ve yanardağ doğal süreçlerdir.'
          },
          {
            saniye: 'fin',
            soru: 'Doğal ve beşeri çevre konusunu en iyi özetleyen hangisidir?',
            secenekler: [
              'Doğal çevre insan yapısı unsurları da kapsar.',
              'Doğal çevre (dağ, nehir, orman) ile beşeri çevre (yol, köprü, fabrika) birbirini etkiler; insan müdahalesi doğal çevreyi dönüştürür.',
              'Beşeri çevre yalnızca doğal değişimlerle oluşur.',
              'İnsan faaliyetlerinin çevreye hiçbir olumsuz etkisi yoktur.'
            ],
            dogru: 1,
            ipucu: 'Doğal = Tanrı\'nın yarattığı. Beşeri = insanın yaptığı. İkisi sürekli etkileşim halindedir.'
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
          },
          {
            saniye: 420,
            soru: 'Lidyalıların insanlığa en önemli katkısı nedir?',
            secenekler: ['Yazıyı icat ettiler.', 'Parayı (madeni para) icat ettiler.', 'İlk anayasayı yazdılar.', 'Tekerleği icat ettiler.'],
            dogru: 1,
            ipucu: 'Lidyalılar MÖ 7. yüzyılda madeni parayı icat ederek ticaret tarihini değiştirdiler.'
          },
          {
            saniye: 480,
            soru: 'Anadolu\'daki Hitit uygarlığı hangi alanda öne çıkmıştır?',
            secenekler: [
              'Denizcilik ve sömürgecilik',
              'Demir işçiliği ve yazılı antlaşmalar',
              'Piramit inşaatı',
              'Matbaayı icat etmeleri'
            ],
            dogru: 1,
            ipucu: 'Hititler demiri işlemiş ve tarihte bilinen ilk yazılı barış antlaşmasını (Kadeş) imzalamışlardır.'
          },
          {
            saniye: 'fin',
            soru: 'Anadolu\'nun kültürel mirasa katkısını özetleyen hangisidir?',
            secenekler: [
              'Anadolu yalnızca Osmanlı döneminde önemli bir medeniyet merkezi olmuştur.',
              'Anadolu; Göbeklitepe, Çatalhöyük, Efes, Hitit, Lidya ve daha pek çok medeniyetle insanlık tarihine önemli katkılar sunmuştur.',
              'Anadolu\'nun kültürel mirasa katkısı yoktur.',
              'Anadolu\'da yalnızca bir uygarlık yaşamıştır.'
            ],
            dogru: 1,
            ipucu: '"Medeniyetler beşiği": Göbeklitepe (tapınak), Çatalhöyük (kentleşme), Hititler (demir/antlaşma), Lidya (para).'
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
          },
          {
            saniye: 420,
            soru: 'Etkin vatandaş vergi ödemek, seçimlere katılmak gibi sorumluluklarını yerine getirmezse ne olur?',
            secenekler: [
              'Devlet hizmetleri aksayabilir ve demokratik düzen zayıflar.',
              'Hiçbir şey olmaz; bireyler isteğe göre karar verir.',
              'Bu sorumluluklar zaten zorunlu değildir.',
              'Diğer vatandaşların hakları genişler.'
            ],
            dogru: 0,
            ipucu: 'Etkin vatandaşlık: hem hak kullanmak hem de sorumluluğu yerine getirmek gerektirir.'
          },
          {
            saniye: 480,
            soru: 'Bir öğrencinin okul temizliğine katılması hangi etkin vatandaşlık davranışına örnektir?',
            secenekler: [
              'Kişisel çıkar gözetmek',
              'Toplumsal sorumluluk ve ortak alana sahip çıkmak',
              'Yasal zorunluluk yerine getirmek',
              'Oy kullanma hakkını kullanmak'
            ],
            dogru: 1,
            ipucu: 'Etkin vatandaş yalnızca hak talep etmez; çevresine, okuluna ve ülkesine de katkı sağlar.'
          },
          {
            saniye: 'fin',
            soru: 'Etkin vatandaşlık kavramını en iyi özetleyen hangisidir?',
            secenekler: [
              'Yalnızca oy kullanan kişidir.',
              'Haklarını bilen, sorumluluklarını yerine getiren, toplumsal sorunlara duyarlı ve demokratik yollarla çözüm arayan bireydir.',
              'Devletin tüm kararlarına körce uyan kişidir.',
              'Yalnızca kendi çıkarını düşünen kişidir.'
            ],
            dogru: 1,
            ipucu: 'Etkin vatandaş: Hak + Sorumluluk + Duyarlılık + Demokratik tutum = 4 temel unsur.'
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
          },
          {
            saniye: 420,
            soru: 'Demokrasilerde azınlık haklarının korunması neden önemlidir?',
            secenekler: [
              'Çünkü azınlıklar her seçimi kazanır.',
              'Çünkü çoğunluk yönetimi herkes için adil olmayabilir; herkesin temel hakları güvence altında olmalıdır.',
              'Çünkü azınlık hakları anayasada yer almaz.',
              'Azınlık haklarının demokrasiyle ilişkisi yoktur.'
            ],
            dogru: 1,
            ipucu: 'Gerçek demokrasi: çoğunluğun yönetimi + azınlığın haklarının güvencesi.'
          },
          {
            saniye: 480,
            soru: 'Türkiye Cumhuriyeti\'nin "laik" olması ne anlama gelir?',
            secenekler: [
              'Dini kurumların devleti yönetmesi.',
              'Din ve devlet işlerinin birbirinden ayrılması; herkesin inanç özgürlüğüne sahip olması.',
              'Yalnızca bir dinin tanınması.',
              'Din eğitiminin tamamen yasaklanması.'
            ],
            dogru: 1,
            ipucu: 'Laiklik: devlet dini tarafsız yönetir; bireyler inanç özgürlüğüne sahiptir.'
          },
          {
            saniye: 'fin',
            soru: 'Demokrasi ve Cumhuriyet konusunu özetleyen hangisidir?',
            secenekler: [
              'Demokrasi yalnızca seçimlerden ibarettir; Cumhuriyet saltanatın devamıdır.',
              'Demokrasi; egemenliğin halka ait olduğu yönetim biçimidir. Türkiye Cumhuriyeti 1923\'te kurulmuş, laik, demokratik bir cumhuriyettir.',
              'Cumhuriyet yönetiminde halkın seçme hakkı yoktur.',
              'Demokrasi ve Cumhuriyet aynı anlama gelir; fark yoktur.'
            ],
            dogru: 1,
            ipucu: 'Demokrasi = halk egemenliği. Cumhuriyet = halkın seçtiği yönetim. TC: 29 Ekim 1923.'
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
          },
          {
            saniye: 420,
            soru: 'Which country has French as its official language?',
            secenekler: ['Brazil', 'Germany', 'France', 'Japan'],
            dogru: 2,
            ipucu: 'France → French. Brazil → Portuguese. Germany → German. Japan → Japanese.'
          },
          {
            saniye: 480,
            soru: 'Complete: "She is from Japan. She is ___."',
            secenekler: ['Japanish', 'Japaner', 'Japanese', 'Japanian'],
            dogru: 2,
            ipucu: 'Japan → Japanese. The nationality adjective for Japan is "Japanese".'
          },
          {
            saniye: 'fin',
            soru: 'Which sentence correctly describes countries and nationalities?',
            secenekler: [
              '"Turkish" means only the Turkish language.',
              'Country names and nationality adjectives are always the same word.',
              'We say "I am from Turkey" (country) or "I am Turkish" (nationality); nationality words can describe a person, a language, or an adjective.',
              'Nationality adjectives are never used in English.'
            ],
            dogru: 2,
            ipucu: 'Country = Turkey; Nationality = Turkish (person, language, adjective). "I am from + country" or "I am + nationality".'
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
          },
          {
            saniye: 420,
            soru: 'Which preposition correctly completes: "The bank is ___ the post office"? (banka postane ile karşılıklı)',
            secenekler: ['next to', 'opposite', 'behind', 'between'],
            dogru: 1,
            ipucu: '"Opposite" = karşısında. "Next to" = yanında. "Behind" = arkasında. "Between" = arasında.'
          },
          {
            saniye: 480,
            soru: '"The school is between the park and the library." Bu cümleye göre okul nerededir?',
            secenekler: [
              'Park\'ın karşısında.',
              'Kütüphanenin arkasında.',
              'Park ile kütüphanenin arasında.',
              'Park\'ın yanında.'
            ],
            dogru: 2,
            ipucu: '"Between A and B" = A ile B\'nin arasında.'
          },
          {
            saniye: 'fin',
            soru: 'Which sentence best summarises prepositions of place for giving directions?',
            secenekler: [
              'Prepositions of place are not used for directions.',
              'Near, next to, opposite, between, behind, in front of describe locations; "turn left/right", "go straight on" are direction commands.',
              'Only "in" and "on" are used for place.',
              'Direction words and place prepositions mean the same thing.'
            ],
            dogru: 1,
            ipucu: 'Location: near, next to, opposite, between. Directions: turn left/right, go straight on, take the first/second left.'
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
          },
          {
            saniye: 420,
            soru: 'Which sentence has the adverb of frequency in the correct position?',
            secenekler: [
              'He plays always football.',
              'Always he plays football.',
              'He always plays football.',
              'He plays football always.'
            ],
            dogru: 2,
            ipucu: 'Adverb of frequency goes BEFORE the main verb: "He always plays." After "to be": "He is always late."'
          },
          {
            saniye: 480,
            soru: 'Sıklık zarflarını azdan çoğa doğru doğru sıralayan hangisidir?',
            secenekler: [
              'Never → rarely → sometimes → usually → always',
              'Always → usually → sometimes → rarely → never',
              'Sometimes → never → usually → rarely → always',
              'Usually → always → sometimes → never → rarely'
            ],
            dogru: 0,
            ipucu: 'Never (%0) → rarely (~%10) → sometimes (~%50) → usually (~%80) → always (%100).'
          },
          {
            saniye: 'fin',
            soru: 'Which sentence best summarises adverbs of frequency?',
            secenekler: [
              'Adverbs of frequency show how often something happens; they go before main verbs and after "to be"; the scale is: never → rarely → sometimes → usually → always.',
              'Adverbs of frequency always go at the end of the sentence.',
              'There are only two adverbs of frequency: always and never.',
              'Adverbs of frequency describe how something is done, not how often.'
            ],
            dogru: 0,
            ipucu: 'Key facts: position (before main verb / after to be) + scale (never 0% → always 100%).'
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
          },
          {
            saniye: 420,
            soru: 'Which time expression correctly completes: "I have breakfast ___ seven o\'clock"?',
            secenekler: ['in', 'on', 'at', 'by'],
            dogru: 2,
            ipucu: '"At" is used with specific times: at 7 o\'clock, at noon, at midnight.'
          },
          {
            saniye: 480,
            soru: '"She usually does her homework ___ the afternoon."',
            secenekler: ['at', 'on', 'in', 'by'],
            dogru: 2,
            ipucu: '"In" is used with parts of the day: in the morning, in the afternoon, in the evening.'
          },
          {
            saniye: 'fin',
            soru: 'Which sentence best summarises daily routine and time expressions?',
            secenekler: [
              'Time prepositions are: AT for specific times (at 7), IN for periods (in the morning/month/year), ON for days and dates (on Monday, on 5th May).',
              '"In", "on", and "at" can all be used with any time expression.',
              'Simple Present is only used for future actions.',
              'Daily routine verbs never use the -s/-es ending.'
            ],
            dogru: 0,
            ipucu: 'AT (exact time) + IN (morning/month/year) + ON (day/date). Simple Present: he/she/it → +s/es.'
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
          },
          {
            saniye: 420,
            soru: 'How do you say "Kulağım ağrıyor" in English?',
            secenekler: ['I have a toothache.', 'I have an earache.', 'I have a backache.', 'I have a stomachache.'],
            dogru: 1,
            ipucu: '"Ear" = kulak; "earache" = kulak ağrısı. Pattern: body part + ache.'
          },
          {
            saniye: 480,
            soru: '"I have a cold." ne anlama gelir?',
            secenekler: ['Üşüdüm / Soğuk aldım (nezle oldum).', 'Karnım ağrıyor.', 'Ateşim var.', 'Boğazım ağrıyor.'],
            dogru: 0,
            ipucu: '"A cold" = soğuk algınlığı / nezle. "I have a cold" = Nezle oldum.'
          },
          {
            saniye: 'fin',
            soru: 'Which sentence best summarises health complaints in English?',
            secenekler: [
              'Health complaints are expressed with "I have + article + body part + ache" or "I have + illness name"; "What\'s the matter?" is a common question to ask about problems.',
              'We always say "I am + body part + ache" for health problems.',
              '"Does your head hurt?" is answered with "Yes, I do."',
              'Health vocabulary is not needed in English communication.'
            ],
            dogru: 0,
            ipucu: '"I have a headache / stomachache / fever / cold." "What\'s the matter?" → "I have a sore throat."'
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
          },
          {
            saniye: 420,
            soru: 'Which is the correct negative form of "should"?',
            secenekler: ['should not', 'shouldn\'t', 'Both "should not" and "shouldn\'t" are correct.', 'don\'t should'],
            dogru: 2,
            ipucu: '"Should not" and "shouldn\'t" are both correct — they are full and contracted forms.'
          },
          {
            saniye: 480,
            soru: '"You ___ eat too much sugar." (Çok fazla şeker yememelisin.) Boşluğa ne gelir?',
            secenekler: ['should', 'shouldn\'t', 'must', 'can'],
            dogru: 1,
            ipucu: '"Shouldn\'t" = tavsiye etmeme (yapmamalısın). "Should" = tavsiye etme (yapmalısın).'
          },
          {
            saniye: 'fin',
            soru: 'Which sentence best summarises "should" and "shouldn\'t" for health?',
            secenekler: [
              '"Should" and "shouldn\'t" express obligation, like "must".',
              '"Should" gives positive advice (you should rest, drink water, sleep early); "shouldn\'t" gives negative advice (you shouldn\'t eat junk food); the base verb follows both.',
              '"Should" is only used in questions.',
              '"Shouldn\'t" means "cannot" in English.'
            ],
            dogru: 1,
            ipucu: 'Should + base verb = advice. Shouldn\'t + base verb = advice against. No -s, no "to", no -ing after should.'
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
