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
        videoId: 'fT7DWHW8JE4',
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
        videoId: 'NZQCvqCBt5g',
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
        videoId: 'CCIfZrD2awI',
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
        slug: 'zaman-olcme', name: 'Zaman Ölçme', hedef: 'Zaman birimlerini dönüştürme ve problemleri çözme',
        videoId: 'gNqWh-Um6vM',
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
      },
      {
        slug: 'dogal-sayilar-okuma', name: 'Doğal Sayıları Okuma ve Yazma', hedef: 'Çok basamaklı doğal sayıları okuma ve yazma',
        videoId: '3uvFo550SQg',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Milyonlar bölüğü kaç basamaktan sonra başlar?',
            secenekler: ['3 basamaktan sonra', '6 basamaktan sonra', '9 basamaktan sonra', '4 basamaktan sonra'],
            dogru: 1,
            ipucu: 'Birler bölüğü ilk 3, binler bölüğü sonraki 3, milyonlar bölüğü 7. basamaktan itibaren başlar.'
          },
          {
            saniye: 120,
            soru: '3.450.000 sayısı nasıl okunur?',
            secenekler: [
              'Üç milyon dört yüz elli bin',
              'Otuz dört milyon elli bin',
              'Üç milyon kırk beş bin',
              'Üç yüz kırk beş milyon'
            ],
            dogru: 0,
            ipucu: 'Bölüklere ayır: 3 milyon / 450 bin / 000 birler → üç milyon dört yüz elli bin.'
          },
          {
            saniye: 180,
            soru: '"Yirmi bir milyon beş yüz bin" sayısını rakamlarla nasıl yazarsın?',
            secenekler: ['21.500.000', '2.150.000', '215.000.000', '21.050.000'],
            dogru: 0,
            ipucu: '21 milyon = 21.000.000; beş yüz bin = 500.000 → 21.500.000.'
          },
          {
            saniye: 240,
            soru: 'Milyarlar bölüğünde hangi basamaklar bulunur?',
            secenekler: [
              'Birler, onlar, yüzler',
              'Milyarlar, on milyarlar, yüz milyarlar',
              'Yüz binler, on binler, binler',
              'Milyonlar, on milyonlar, yüz milyonlar'
            ],
            dogru: 1,
            ipucu: 'Her bölükte 3 basamak vardır: milyarlar bölüğü → milyarlar, on milyarlar, yüz milyarlar.'
          },
          {
            saniye: 300,
            soru: '5.008.070.000 sayısında sıfır olan bölük hangisidir?',
            secenekler: ['Birler bölüğü', 'Binler bölüğü', 'Milyonlar bölüğü', 'Milyarlar bölüğü'],
            dogru: 0,
            ipucu: 'Sağdan başla: birler bölüğü 000 → tamamı sıfır.'
          },
          {
            saniye: 360,
            soru: '"Dört milyar üç yüz milyon" sayısını rakamlarla nasıl yazarsın?',
            secenekler: ['4.300.000.000', '43.000.000.000', '430.000.000', '4.030.000.000'],
            dogru: 0,
            ipucu: '4 milyar = 4.000.000.000; üç yüz milyon = 300.000.000 → topla.'
          },
          {
            saniye: 420,
            soru: '72.156.003 sayısında 7 rakamının basamak değeri kaçtır?',
            secenekler: ['7.000.000', '70.000.000', '700.000', '7.000'],
            dogru: 1,
            ipucu: '7 rakamı on milyonlar basamağında: 7 × 10.000.000 = 70.000.000.'
          },
          {
            saniye: 'fin',
            soru: 'Çok basamaklı doğal sayıları doğru okumak için en önemli kural nedir?',
            secenekler: [
              'Sağdan sola bölüklere ayırıp her bölüğü kendi adıyla okumak.',
              'Soldan sağa tek tek rakam okumak.',
              'Sadece sıfır olmayan rakamları okumak.',
              'Sayıyı ikişer ikişer gruplamak.'
            ],
            dogru: 0,
            ipucu: 'Sağdan 3\'er basamak ayır → birler, binler, milyonlar, milyarlar; her bölüğü adıyla oku.'
          }
        ]
      },
      {
        slug: 'toplama-cikarma', name: 'Doğal Sayılarla Toplama ve Çıkarma', hedef: 'Doğal sayılarla toplama ve çıkarma işlemlerini yapma',
        videoId: 'IHoenJnlNUw',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Toplama işleminde "elde" ne zaman oluşur?',
            secenekler: [
              'Bir basamaktaki rakamların toplamı 10 veya daha fazla olduğunda.',
              'İki sayının birler basamağı aynı olduğunda.',
              'Toplanan sayılardan biri sıfır olduğunda.',
              'Sadece üç basamaklı sayılarda oluşur.'
            ],
            dogru: 0,
            ipucu: 'Örneğin 7+8=15; 5 yazılır, 1 elde olarak bir üst basamağa eklenir.'
          },
          {
            saniye: 120,
            soru: '4.567 + 3.895 işleminin sonucu kaçtır?',
            secenekler: ['8.462', '7.462', '8.362', '8.452'],
            dogru: 0,
            ipucu: 'Birler: 7+5=12 (yaz 2, elde 1). Onlar: 6+9+1=16 (yaz 6, elde 1). Devam et.'
          },
          {
            saniye: 180,
            soru: 'Çıkarma işleminde "onluk bozdurma" ne demektir?',
            secenekler: [
              'Üstteki basamak yetersiz kalınca bir üst basamaktan 1 alıp 10 olarak eklemek.',
              'Her basamaktan 10 çıkarmak.',
              'Sayıyı 10\'a bölmek.',
              'Sadece onlar basamağında yapılan bir işlem.'
            ],
            dogru: 0,
            ipucu: 'Örneğin 42−17: birler basamağında 2 < 7, onlardan 1 bozdur → 12−7=5.'
          },
          {
            saniye: 240,
            soru: '8.003 − 4.567 işleminin sonucu kaçtır?',
            secenekler: ['3.436', '3.536', '4.436', '3.446'],
            dogru: 0,
            ipucu: 'Birler: 3 < 7, onluk bozdurmamız lazım. Adım adım yaparak ilerle.'
          },
          {
            saniye: 300,
            soru: 'Bir kitapçıda 12.450 kitap vardı. 3.875 kitap satıldı, 2.130 yeni kitap geldi. Kaç kitap kaldı?',
            secenekler: ['10.705', '10.605', '11.705', '10.805'],
            dogru: 0,
            ipucu: 'Önce çıkar: 12.450 − 3.875 = 8.575; sonra ekle: 8.575 + 2.130 = 10.705.'
          },
          {
            saniye: 360,
            soru: 'Toplama işleminin doğruluğunu kontrol etmek için ne yapılır?',
            secenekler: [
              'Sonuçtan toplananlardan birini çıkarırız; diğer toplanan çıkmalıdır.',
              'İşlemi baştan sona tekrar yaparız.',
              'Sayıları çarparız.',
              'Sonuca 10 ekleriz.'
            ],
            dogru: 0,
            ipucu: 'Toplam − bir toplanan = diğer toplanan → sağlama yapılır.'
          },
          {
            saniye: 420,
            soru: '56.789 + 34.211 işleminin sonucu kaçtır?',
            secenekler: ['91.000', '90.000', '89.000', '91.100'],
            dogru: 0,
            ipucu: 'Basamak basamak topla: 9+1=10, 8+1+1=10, 7+2+1=10, 6+4+1=11, 5+3+1=9 → 91.000.'
          },
          {
            saniye: 'fin',
            soru: 'Toplama ve çıkarma işlemlerinde dikkat edilmesi gereken en önemli nokta hangisidir?',
            secenekler: [
              'Basamakları alt alta doğru hizalamak ve elde/bozdurma işlemlerini unutmamak.',
              'Sayıları her zaman büyükten küçüğe yazmak.',
              'Sadece birler basamağını kontrol etmek yeterlidir.',
              'İşlemi soldan sağa yapmak.'
            ],
            dogru: 0,
            ipucu: 'Basamakları hizala, elde ve bozdurma işlemlerini doğru yap, sağlamayla kontrol et.'
          }
        ]
      },
      {
        slug: 'zihinden-islem', name: 'Zihinden Toplama ve Çıkarma', hedef: 'Zihinden toplama ve çıkarma stratejileri',
        videoId: '0wj7svyTgKw',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Zihinden toplama yaparken "yuvarlama" stratejisi nasıl kullanılır?',
            secenekler: [
              'Sayıyı en yakın onluğa veya yüzlüğe yuvarlayıp, farkı sonra düzeltiriz.',
              'Sayının son rakamını sileriz.',
              'İki sayıyı da 10\'a böleriz.',
              'Sadece birler basamağını toplarız.'
            ],
            dogru: 0,
            ipucu: 'Örneğin 48+35: 48→50 yap, 50+35=85, sonra 2 çıkar → 83.'
          },
          {
            saniye: 120,
            soru: '197 + 245 işlemini zihinden yapmak için en kolay yöntem hangisidir?',
            secenekler: [
              '197\'yi 200\'e yuvarlayıp 200+245=445, sonra 3 çıkarmak → 442.',
              'İki sayıyı da 100\'e yuvarlamak.',
              '197+245=442 doğrudan ezberlemek.',
              'Sadece yüzler basamağını toplamak.'
            ],
            dogru: 0,
            ipucu: '197 sayısı 200\'e çok yakın; 3 fazla ekledik, sonra 3 çıkarırız.'
          },
          {
            saniye: 180,
            soru: '"Parçalama" stratejisinde 56 + 37 nasıl hesaplanır?',
            secenekler: [
              '50+30=80, 6+7=13, 80+13=93',
              '56+30=86, 86+7=93',
              'Her iki yöntem de doğru.',
              '56+40=96, 96−3=93'
            ],
            dogru: 2,
            ipucu: 'Parçalama farklı şekillerde yapılabilir: basamaklara ayırma veya bir sayıyı parçalama.'
          },
          {
            saniye: 240,
            soru: '503 − 198 işlemini zihinden en kolay nasıl yaparsın?',
            secenekler: [
              '503 − 200 = 303, sonra 2 ekle → 305',
              '500 − 198 = 302, sonra 3 ekle → 305',
              'Her iki yöntem de doğru ve sonuç 305.',
              '503 − 200 = 303, sonra 2 çıkar → 301'
            ],
            dogru: 2,
            ipucu: '198\'i 200\'e yuvarlarsak 2 fazla çıkarmış oluruz; bunu geri ekleriz.'
          },
          {
            saniye: 300,
            soru: 'Zihinden 750 − 380 işlemini "onluklar yöntemi" ile nasıl yaparsın?',
            secenekler: [
              '750−380: 750−400=350, 350+20=370',
              '750−380: 700−300=400, 50−80=−30 → 370',
              '750−380: 750−300=450, 450−80=370',
              'Hepsi doğru sonucu verir.'
            ],
            dogru: 3,
            ipucu: 'Farklı stratejilerle aynı sonuca ulaşılır: 750 − 380 = 370.'
          },
          {
            saniye: 360,
            soru: '1.995 + 2.008 işlemini zihinden yapmak için hangi strateji en pratiktir?',
            secenekler: [
              '2.000 + 2.000 = 4.000; sonra 5 çıkar ve 8 ekle → 4.003',
              '1.995 + 2.000 = 3.995; 3.995 + 8 = 4.003',
              'Her iki yöntem de doğrudur.',
              '1.000 + 2.000 = 3.000; 995 + 8 = 1.003 → sonuç 3.003'
            ],
            dogru: 2,
            ipucu: 'Her iki sayıyı da yuvarlayabilir veya sadece birini yuvarlayıp farkı düzeltebilirsin.'
          },
          {
            saniye: 420,
            soru: 'Markette 85 TL harcadın, kasiyere 200 TL verdin. Para üstünü zihinden nasıl bulursun?',
            secenekler: [
              '85\'ten 100\'e 15, 100\'den 200\'e 100 → 15+100=115 TL',
              '200−85: 200−80=120, 120−5=115 TL',
              'Her iki yöntem de doğru → 115 TL',
              '200−85: 200−90=110, 110+5=115 TL'
            ],
            dogru: 2,
            ipucu: '"Tamamlama" yöntemi: 85→100 (15 TL), 100→200 (100 TL) → toplam 115 TL.'
          },
          {
            saniye: 'fin',
            soru: 'Zihinden işlem stratejilerinin ortak özelliği nedir?',
            secenekler: [
              'Sayıları kolay hesaplanabilir hale getirip, sonra düzeltme yapmak.',
              'Her zaman kâğıt kalem kullanmak.',
              'Sadece küçük sayılarda uygulanabilir.',
              'Sayıları her zaman 10\'a bölmek.'
            ],
            dogru: 0,
            ipucu: 'Yuvarlama, parçalama, tamamlama → hepsi sayıları kolay hale getirip farkı düzeltir.'
          }
        ]
      },
      {
        slug: 'carpma-bolme-islemleri', name: 'Doğal Sayılarda Çarpma ve Bölme', hedef: 'Doğal sayılarda çarpma ve bölme işlemlerini yapma',
        videoId: '-FruESJRVeE',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Çarpma işlemi aslında neyin kısa yoludur?',
            secenekler: [
              'Aynı sayının tekrar tekrar toplanmasının.',
              'Sayıları büyükten küçüğe sıralamanın.',
              'Bölme işleminin tersinin.',
              'Sayıların basamaklarını ayırmanın.'
            ],
            dogru: 0,
            ipucu: 'Örneğin 4×3 = 4+4+4 = 12; çarpma tekrarlı toplamadır.'
          },
          {
            saniye: 120,
            soru: '345 × 12 işleminin sonucu kaçtır?',
            secenekler: ['4.140', '3.140', '4.040', '4.240'],
            dogru: 0,
            ipucu: '345×2=690 ve 345×10=3.450 → 690+3.450=4.140.'
          },
          {
            saniye: 180,
            soru: 'Bölme işleminde "bölünen", "bölen", "bölüm" ve "kalan" nedir?',
            secenekler: [
              'Bölünen ÷ bölen = bölüm, artan kısım kalandır.',
              'Bölen ÷ bölünen = kalan.',
              'Bölüm × kalan = bölünen.',
              'Kalan her zaman bölenden büyüktür.'
            ],
            dogru: 0,
            ipucu: '17÷5=3 kalan 2 → 17 bölünen, 5 bölen, 3 bölüm, 2 kalan.'
          },
          {
            saniye: 240,
            soru: '1.728 ÷ 8 işleminin sonucu kaçtır?',
            secenekler: ['216', '206', '226', '218'],
            dogru: 0,
            ipucu: '17÷8=2 kalan 1 → 12÷8=1 kalan 4 → 48÷8=6 → sonuç: 216.'
          },
          {
            saniye: 300,
            soru: 'Bir sayı 25 ile çarpılıp sonuç 3.750 bulunmuştur. Bu sayı kaçtır?',
            secenekler: ['150', '145', '155', '160'],
            dogru: 0,
            ipucu: 'Ters işlem: 3.750 ÷ 25 = ? → 25×150 = 3.750.'
          },
          {
            saniye: 360,
            soru: '4.625 ÷ 25 işleminde bölüm ve kalan kaçtır?',
            secenekler: ['Bölüm: 185, kalan: 0', 'Bölüm: 184, kalan: 25', 'Bölüm: 183, kalan: 0', 'Bölüm: 185, kalan: 5'],
            dogru: 0,
            ipucu: '25×185 = 4.625 → tam bölünür, kalan 0.'
          },
          {
            saniye: 420,
            soru: 'Bir fabrikada günde 756 kutu üretiliyor. 18 günde kaç kutu üretilir?',
            secenekler: ['13.608', '13.508', '14.608', '12.608'],
            dogru: 0,
            ipucu: '756 × 18: 756×10=7.560, 756×8=6.048 → 7.560+6.048=13.608.'
          },
          {
            saniye: 'fin',
            soru: 'Çarpma ile bölme işlemi arasındaki ilişki nedir?',
            secenekler: [
              'Bölme, çarpmanın ters işlemidir; a×b=c ise c÷b=a olur.',
              'İkisi birbirinden tamamen bağımsızdır.',
              'Çarpma yalnızca büyük sayılarda, bölme küçük sayılarda kullanılır.',
              'Bölmede her zaman kalan kalır.'
            ],
            dogru: 0,
            ipucu: 'Çarpma ve bölme ters işlemlerdir: 6×4=24 ise 24÷4=6.'
          }
        ]
      },
      {
        slug: 'karenin-cevresi', name: 'Karenin Çevresi', hedef: 'Karenin çevre uzunluğunu hesaplama',
        videoId: 'fRRPgdOrehQ',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Karenin en temel özelliği nedir?',
            secenekler: [
              'Dört kenarının uzunluğu birbirine eşittir.',
              'İki kenarı uzun, iki kenarı kısadır.',
              'Üç kenarı vardır.',
              'Kenarları farklı uzunluktadır.'
            ],
            dogru: 0,
            ipucu: 'Kare: dört kenarı eşit, dört açısı 90° olan özel bir dikdörtgendir.'
          },
          {
            saniye: 120,
            soru: 'Çevre ne demektir?',
            secenekler: [
              'Bir şeklin dış sınırının toplam uzunluğudur.',
              'Bir şeklin içindeki alandır.',
              'Şeklin köşe sayısıdır.',
              'Şeklin kenar sayısıdır.'
            ],
            dogru: 0,
            ipucu: 'Çevre, şeklin etrafını dolaştığında aldığın toplam yol uzunluğudur.'
          },
          {
            saniye: 180,
            soru: 'Kenar uzunluğu 6 cm olan karenin çevresi kaç cm\'dir?',
            secenekler: ['24 cm', '12 cm', '36 cm', '18 cm'],
            dogru: 0,
            ipucu: 'Karenin çevresi = 4 × kenar = 4 × 6 = ?'
          },
          {
            saniye: 240,
            soru: 'Bir karenin çevresi 48 cm ise bir kenarı kaç cm\'dir?',
            secenekler: ['10 cm', '12 cm', '16 cm', '8 cm'],
            dogru: 1,
            ipucu: 'Çevre = 4 × kenar → kenar = çevre ÷ 4 = 48 ÷ 4 = ?'
          },
          {
            saniye: 300,
            soru: 'Kenar uzunluğu 15 cm olan kare şeklinde bir çerçevenin çevresi kaç cm\'dir?',
            secenekler: ['45 cm', '60 cm', '30 cm', '75 cm'],
            dogru: 1,
            ipucu: 'Çevre = 4 × 15 = 60 cm.'
          },
          {
            saniye: 360,
            soru: 'İki karenin kenar uzunlukları 8 cm ve 5 cm\'dir. Çevreleri arasındaki fark kaç cm\'dir?',
            secenekler: ['12 cm', '3 cm', '20 cm', '13 cm'],
            dogru: 0,
            ipucu: 'Birinci çevre: 4×8=32; ikinci çevre: 4×5=20; fark: 32−20=12 cm.'
          },
          {
            saniye: 420,
            soru: 'Kare şeklinde bir bahçenin etrafına tel çekilecek. Kenar uzunluğu 25 m ise kaç metre tel gerekir?',
            secenekler: ['75 m', '100 m', '50 m', '125 m'],
            dogru: 1,
            ipucu: 'Bahçenin etrafı = çevre = 4 × 25 = 100 m.'
          },
          {
            saniye: 'fin',
            soru: 'Karenin çevresi için hangi formül doğrudur?',
            secenekler: [
              'Çevre = 4 × kenar uzunluğu',
              'Çevre = 2 × kenar uzunluğu',
              'Çevre = kenar × kenar',
              'Çevre = kenar + kenar'
            ],
            dogru: 0,
            ipucu: 'Karenin 4 eşit kenarı vardır; çevre = kenar + kenar + kenar + kenar = 4 × kenar.'
          }
        ]
      },
      {
        slug: 'karenin-alani', name: 'Karenin Alanı', hedef: 'Karenin alanını hesaplama ve birim kare',
        videoId: 'HRAIsSfs48o',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Alan ne demektir?',
            secenekler: [
              'Bir şeklin kapladığı yüzey büyüklüğüdür.',
              'Bir şeklin çevresinin uzunluğudur.',
              'Bir şeklin köşe sayısıdır.',
              'Bir şeklin kenar uzunluğudur.'
            ],
            dogru: 0,
            ipucu: 'Alan, düz bir yüzeyin ne kadar yer kapladığını gösterir; birimi cm², m² gibidir.'
          },
          {
            saniye: 120,
            soru: 'Birim kare ne demektir?',
            secenekler: [
              'Kenar uzunluğu 1 birim olan kare; alanı ölçmek için kullanılır.',
              'En büyük kare şeklinin adı.',
              'Alanı 100 cm² olan kare.',
              'Çevresi 1 cm olan kare.'
            ],
            dogru: 0,
            ipucu: '1 cm × 1 cm = 1 cm² → bu bir birim karedir.'
          },
          {
            saniye: 180,
            soru: 'Kenar uzunluğu 5 cm olan karenin alanı kaç cm²\'dir?',
            secenekler: ['20 cm²', '10 cm²', '25 cm²', '15 cm²'],
            dogru: 2,
            ipucu: 'Karenin alanı = kenar × kenar = 5 × 5 = ?'
          },
          {
            saniye: 240,
            soru: 'Bir karenin alanı 64 cm² ise kenar uzunluğu kaç cm\'dir?',
            secenekler: ['6 cm', '8 cm', '16 cm', '32 cm'],
            dogru: 1,
            ipucu: 'Alan = kenar × kenar → kenar × kenar = 64 → 8 × 8 = 64.'
          },
          {
            saniye: 300,
            soru: 'Kenar uzunluğu 9 cm olan karenin alanı kaç cm²\'dir?',
            secenekler: ['36 cm²', '72 cm²', '81 cm²', '18 cm²'],
            dogru: 2,
            ipucu: 'Alan = 9 × 9 = 81 cm².'
          },
          {
            saniye: 360,
            soru: 'Bir karenin alanı 49 m² ise çevresi kaç metredir?',
            secenekler: ['28 m', '14 m', '21 m', '49 m'],
            dogru: 0,
            ipucu: 'Alan = 49 → kenar = 7 m; çevre = 4 × 7 = 28 m.'
          },
          {
            saniye: 420,
            soru: 'Kenar uzunluğu 12 cm olan kare şeklinde bir kartondan kaç tane 1 cm²\'lik birim kare çıkar?',
            secenekler: ['48 tane', '24 tane', '144 tane', '120 tane'],
            dogru: 2,
            ipucu: 'Karenin alanı = 12 × 12 = 144 cm²; her 1 cm² bir birim karedir.'
          },
          {
            saniye: 'fin',
            soru: 'Karenin alanı ile çevresi arasındaki fark nedir?',
            secenekler: [
              'Alan = kenar × kenar (cm²); çevre = 4 × kenar (cm). Birimleri farklıdır.',
              'Alan ve çevre her zaman aynı değeri verir.',
              'Alan kenarların toplamıdır; çevre kenarların çarpımıdır.',
              'Alan sadece büyük kareler için hesaplanır.'
            ],
            dogru: 0,
            ipucu: 'Alan yüzey ölçer (cm²), çevre kenar toplamını ölçer (cm) — farklı kavramlardır.'
          }
        ]
      },
      {
        slug: 'ondalik-gosterim', name: 'Ondalık Gösterim', hedef: 'Ondalık gösterimi anlama ve kullanma',
        videoId: '9asGD316AHc',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Ondalık gösterimde virgülden sonraki ilk basamak neyi ifade eder?',
            secenekler: [
              'Onda birler basamağını (1/10)',
              'Yüzde birler basamağını (1/100)',
              'Birler basamağını',
              'Binde birler basamağını (1/1000)'
            ],
            dogru: 0,
            ipucu: 'Virgülden sonra sırasıyla: onda birler, yüzde birler, binde birler gelir.'
          },
          {
            saniye: 120,
            soru: '3/10 kesrinin ondalık gösterimi nedir?',
            secenekler: ['0,3', '0,03', '3,0', '0,003'],
            dogru: 0,
            ipucu: '3/10 = 3 onda bir = 0,3. Payda 10 ise virgülden sonra bir basamak.'
          },
          {
            saniye: 180,
            soru: '0,47 sayısı kesir olarak nasıl yazılır?',
            secenekler: ['47/10', '47/100', '47/1000', '4/7'],
            dogru: 1,
            ipucu: 'Virgülden sonra 2 basamak varsa payda 100 olur: 0,47 = 47/100.'
          },
          {
            saniye: 240,
            soru: '0,250 ile 0,25 sayıları arasında nasıl bir ilişki vardır?',
            secenekler: [
              'Eşittirler; sondaki sıfır değeri değiştirmez.',
              '0,250 daha büyüktür.',
              '0,25 daha büyüktür.',
              'Karşılaştırılamazlar.'
            ],
            dogru: 0,
            ipucu: '0,250 = 250/1000 = 25/100 = 0,25 → sondaki sıfır anlam değiştirmez.'
          },
          {
            saniye: 300,
            soru: '2,75 sayısında 7 rakamının basamak değeri kaçtır?',
            secenekler: ['7', '0,7', '0,07', '70'],
            dogru: 1,
            ipucu: '7, onda birler basamağında: 7 × 0,1 = 0,7.'
          },
          {
            saniye: 360,
            soru: 'Aşağıdakilerden hangisi en büyük sayıdır?',
            secenekler: ['0,9', '0,85', '0,125', '0,8'],
            dogru: 0,
            ipucu: 'Basamak basamak karşılaştır: onda birler → 9 > 8 > 8 > 1 → 0,9 en büyük.'
          },
          {
            saniye: 420,
            soru: '15/1000 kesrinin ondalık gösterimi nedir?',
            secenekler: ['0,15', '0,015', '1,5', '0,0015'],
            dogru: 1,
            ipucu: 'Payda 1000 ise virgülden sonra 3 basamak: 15/1000 = 0,015.'
          },
          {
            saniye: 'fin',
            soru: 'Ondalık gösterim ile kesir arasındaki ilişkiyi en doğru açıklayan hangisidir?',
            secenekler: [
              'Ondalık gösterim, paydası 10, 100 veya 1000 olan kesirlerin virgüllü yazılış biçimidir.',
              'Ondalık gösterim sadece tam sayılar için geçerlidir.',
              'Her kesir ondalık gösterimle yazılamaz.',
              'Ondalık gösterimde virgül kullanılmaz.'
            ],
            dogru: 0,
            ipucu: '3/10=0,3; 47/100=0,47; 125/1000=0,125 → hepsi ondalık gösterimdir.'
          }
        ]
      },
      {
        slug: 'sayi-oruntuler', name: 'Sayı ve Şekil Örüntüleri', hedef: 'Sayı ve şekil örüntülerinin kuralını bulma',
        videoId: 'vVd-ndQ-vB8',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Örüntü nedir?',
            secenekler: [
              'Belirli bir kurala göre tekrar eden veya değişen sayı ya da şekil dizisidir.',
              'Rastgele sıralanmış sayılardır.',
              'Sadece çift sayılardan oluşan dizilerdir.',
              'Geometrik şekillerin adıdır.'
            ],
            dogru: 0,
            ipucu: 'Örüntü: bir kuralı olan, tahmin edilebilir bir düzendir.'
          },
          {
            saniye: 120,
            soru: '3, 7, 11, 15, 19, … örüntüsünün kuralı nedir?',
            secenekler: [
              'Her adımda 4 ekleniyor.',
              'Her adımda 3 ekleniyor.',
              'Her adımda 2 ile çarpılıyor.',
              'Her adımda 5 ekleniyor.'
            ],
            dogru: 0,
            ipucu: '7−3=4, 11−7=4, 15−11=4 → her seferinde 4 ekleniyor.'
          },
          {
            saniye: 180,
            soru: '2, 6, 18, 54, … örüntüsünde bir sonraki sayı kaçtır?',
            secenekler: ['108', '162', '72', '60'],
            dogru: 1,
            ipucu: '6÷2=3, 18÷6=3, 54÷18=3 → her adımda 3 ile çarpılıyor: 54×3=?'
          },
          {
            saniye: 240,
            soru: '100, 90, 81, 73, 66, … örüntüsünde çıkarılan sayılar nasıl değişiyor?',
            secenekler: [
              '10, 9, 8, 7, … şeklinde birer azalıyor.',
              'Hep 10 çıkarılıyor.',
              '10, 8, 6, 4, … şeklinde ikişer azalıyor.',
              'Sabit bir kural yok.'
            ],
            dogru: 0,
            ipucu: '100−90=10, 90−81=9, 81−73=8, 73−66=7 → farklar 10, 9, 8, 7, … birer azalıyor.'
          },
          {
            saniye: 300,
            soru: 'Bir şekil örüntüsünde 1. adımda 1 kare, 2. adımda 3 kare, 3. adımda 5 kare var. 5. adımda kaç kare olur?',
            secenekler: ['7', '9', '11', '13'],
            dogru: 1,
            ipucu: '1, 3, 5, 7, 9 → her adımda 2 ekleniyor: 4. adım=7, 5. adım=9.'
          },
          {
            saniye: 360,
            soru: '1, 1, 2, 3, 5, 8, 13, … örüntüsünün kuralı nedir?',
            secenekler: [
              'Her sayı kendinden önceki iki sayının toplamıdır.',
              'Her adımda 2 ekleniyor.',
              'Her sayı bir öncekinin 2 katıdır.',
              'Sabit bir kural yoktur.'
            ],
            dogru: 0,
            ipucu: '1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13 → her sayı önceki ikisinin toplamı.'
          },
          {
            saniye: 420,
            soru: '5, 10, 20, 40, … örüntüsünde 6. terim kaçtır?',
            secenekler: ['80', '160', '120', '200'],
            dogru: 1,
            ipucu: 'Her adımda 2 ile çarpılıyor: 5, 10, 20, 40, 80, 160.'
          },
          {
            saniye: 'fin',
            soru: 'Bir örüntünün kuralını bulmak için ne yapmalıyız?',
            secenekler: [
              'Ardışık terimler arasındaki farkı veya oranı inceleyerek düzeni keşfetmeliyiz.',
              'Sadece ilk iki terime bakmalıyız.',
              'Sayıları büyükten küçüğe sıralamalıyız.',
              'Terimleri toplamalıyız.'
            ],
            dogru: 0,
            ipucu: 'Farklar sabit mi? Oranlar sabit mi? Yoksa farklar da değişiyor mu? Bunu bul, kuralı çöz.'
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
        slug: 'kutle-agirlik', name: 'Kütle, Ağırlık ve Yer Çekimi', hedef: 'Kütle ile ağırlık arasındaki farkı ve yer çekimini anlama',
        videoId: 'smkx-o2txNI',
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
      },
      {
        slug: 'gunes-ozellikleri', name: 'Gökyüzündeki Komşumuz: Güneş', hedef: 'Güneş hakkında temel bilgileri öğrenme',
        videoId: 'yx7xbUKNYkU',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Güneş bir yıldız mıdır yoksa gezegen midir?',
            secenekler: [
              'Güneş bir yıldızdır; kendi ışığını ve ısısını kendisi üretir.',
              'Güneş bir gezegendir; Dünya\'nın etrafında döner.',
              'Güneş bir uydudur; Ay gibi ışık yansıtır.',
              'Güneş ne yıldız ne gezegendir; özel bir gök cismidir.'
            ],
            dogru: 0,
            ipucu: 'Güneş, Güneş Sistemi\'nin merkezindeki yıldızdır ve kendi enerjisini üretir.'
          },
          {
            saniye: 120,
            soru: 'Güneş\'in ışığı ve ısısı Dünya\'ya nasıl ulaşır?',
            secenekler: [
              'Işınım (radyasyon) yoluyla boşlukta yayılarak ulaşır.',
              'Hava molekülleri taşıyarak ulaştırır.',
              'Rüzgâr aracılığıyla ulaşır.',
              'Yalnızca Ay üzerinden yansıyarak ulaşır.'
            ],
            dogru: 0,
            ipucu: 'Uzayda hava yoktur; ısı ve ışık ışınım yoluyla yayılır.'
          },
          {
            saniye: 180,
            soru: 'Güneş\'in yüzey sıcaklığı yaklaşık kaç derecedir?',
            secenekler: [
              'Yaklaşık 100 °C',
              'Yaklaşık 1.000 °C',
              'Yaklaşık 6.000 °C',
              'Yaklaşık 100.000 °C'
            ],
            dogru: 2,
            ipucu: 'Güneş\'in yüzey sıcaklığı yaklaşık 5.500-6.000 °C civarındadır.'
          },
          {
            saniye: 240,
            soru: 'Güneş enerjisini nasıl üretir?',
            secenekler: [
              'İçindeki hidrojen gazının helyuma dönüşmesiyle (nükleer füzyon).',
              'Yüzeyindeki volkanlar sayesinde.',
              'Etrafındaki gezegenlerden enerji alarak.',
              'Kendi etrafında hızla dönerek.'
            ],
            dogru: 0,
            ipucu: 'Güneş\'in çekirdeğinde hidrojen atomları birleşerek helyuma dönüşür; bu olay büyük enerji açığa çıkarır.'
          },
          {
            saniye: 300,
            soru: 'Dünya\'nın Güneş\'e olan uzaklığı yaklaşık ne kadardır?',
            secenekler: [
              'Yaklaşık 150 milyon km',
              'Yaklaşık 15 milyon km',
              'Yaklaşık 1,5 milyar km',
              'Yaklaşık 384.000 km'
            ],
            dogru: 0,
            ipucu: 'Dünya-Güneş arası yaklaşık 150 milyon kilometredir; ışık bu mesafeyi 8 dakikada alır.'
          },
          {
            saniye: 360,
            soru: 'Güneş olmasaydı aşağıdakilerden hangisi gerçekleşmezdi?',
            secenekler: [
              'Dünya\'da mevsimler, ısı ve ışık olmazdı; canlılar yaşayamazdı.',
              'Dünya daha hızlı dönerdi.',
              'Ay daha parlak olurdu.',
              'Denizlerdeki su tuzlu olurdu.'
            ],
            dogru: 0,
            ipucu: 'Güneş; ışık, ısı ve enerji kaynağıdır — onsuz Dünya\'da yaşam mümkün olmazdı.'
          },
          {
            saniye: 420,
            soru: 'Güneş, Dünya\'dan yaklaşık kaç kat büyüktür?',
            secenekler: [
              'Yaklaşık 10 kat',
              'Yaklaşık 109 kat (çap olarak)',
              'Yaklaşık 1.000 kat',
              'Dünya ile aynı büyüklüktedir.'
            ],
            dogru: 1,
            ipucu: 'Güneş\'in çapı Dünya\'nın çapının yaklaşık 109 katıdır; çok devasa bir yıldızdır.'
          },
          {
            saniye: 'fin',
            soru: 'Güneş hakkında aşağıdakilerden hangisi YANLIŞTIR?',
            secenekler: [
              'Güneş bir gezegendir ve kendi ışığı yoktur.',
              'Güneş bir yıldızdır ve kendi ışığını üretir.',
              'Güneş\'in yüzey sıcaklığı yaklaşık 6.000 °C\'dir.',
              'Güneş enerjisini nükleer füzyon ile üretir.'
            ],
            dogru: 0,
            ipucu: 'Güneş gezegen değil, yıldızdır; kendi ışığını ve ısısını kendisi üretir.'
          }
        ]
      },
      {
        slug: 'kuvveti-taniyalim', name: 'Kuvveti Tanıyalım', hedef: 'Kuvvet kavramını ve kuvvetin ölçülmesini öğrenme',
        videoId: '6f4W8MRqtV8',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Kuvvet nedir?',
            secenekler: [
              'Bir cismi iten veya çeken her türlü etki.',
              'Yalnızca cisimleri durduran etki.',
              'Sadece ağır cisimlere uygulanan güç.',
              'Cisimlerin ağırlığı demektir.'
            ],
            dogru: 0,
            ipucu: 'Kuvvet, itme veya çekme şeklinde cisimlere uygulanan etkidir.'
          },
          {
            saniye: 120,
            soru: 'Kuvvetin birimi nedir ve hangi aletle ölçülür?',
            secenekler: [
              'Birimi Newton (N); dinamometre ile ölçülür.',
              'Birimi kilogram; terazi ile ölçülür.',
              'Birimi metre; cetvel ile ölçülür.',
              'Birimi joule; termometre ile ölçülür.'
            ],
            dogru: 0,
            ipucu: 'Kuvvet Newton (N) birimiyle ifade edilir ve dinamometre (kuvvetölçer) ile ölçülür.'
          },
          {
            saniye: 180,
            soru: 'Aşağıdakilerden hangisi kuvvetin etkisine örnek değildir?',
            secenekler: [
              'Topun şeklinin bozulması.',
              'Bisikletin hızlanması.',
              'Masanın renginin değişmesi.',
              'Arabanın durması.'
            ],
            dogru: 2,
            ipucu: 'Kuvvet cismin hareketini, hızını, yönünü veya şeklini değiştirir; renk değişimi kuvvetle ilgili değildir.'
          },
          {
            saniye: 240,
            soru: 'Temas gerektirmeden etkisini gösteren kuvvete ne denir?',
            secenekler: [
              'Temas kuvveti',
              'Temassız (alan) kuvveti',
              'Sürtünme kuvveti',
              'Kas kuvveti'
            ],
            dogru: 1,
            ipucu: 'Mıknatıs kuvveti ve yer çekimi kuvveti temas olmadan etkisini gösterir; bunlara temassız kuvvet denir.'
          },
          {
            saniye: 300,
            soru: 'Aşağıdakilerden hangisi temas kuvvetine örnektir?',
            secenekler: [
              'Yer çekimi kuvveti',
              'Mıknatıs kuvveti',
              'Sürtünme kuvveti',
              'Elektrik kuvveti'
            ],
            dogru: 2,
            ipucu: 'Sürtünme kuvveti, iki yüzey birbirine temas ettiğinde ortaya çıkar.'
          },
          {
            saniye: 360,
            soru: 'Bir cisme aynı yönde iki kuvvet uygulanırsa bileşke kuvvet nasıl bulunur?',
            secenekler: [
              'İki kuvvet toplanır.',
              'İki kuvvet çıkarılır.',
              'Sadece büyük olan alınır.',
              'İki kuvvet çarpılır.'
            ],
            dogru: 0,
            ipucu: 'Aynı yöndeki kuvvetler toplanarak bileşke kuvveti oluşturur.'
          },
          {
            saniye: 420,
            soru: 'Bir cisme zıt yönde 8 N ve 3 N kuvvet uygulanırsa bileşke kuvvet kaç N olur?',
            secenekler: [
              '11 N',
              '5 N',
              '3 N',
              '24 N'
            ],
            dogru: 1,
            ipucu: 'Zıt yöndeki kuvvetlerde bileşke: büyükten küçük çıkarılır → 8 − 3 = 5 N.'
          },
          {
            saniye: 'fin',
            soru: 'Kuvvet hakkında aşağıdakilerden hangisi doğrudur?',
            secenekler: [
              'Kuvvet yalnızca cisimleri iter; çekme etkisi yoktur.',
              'Kuvvet itme veya çekme etkisidir; birimi Newton\'dur; temas ve temassız olarak ikiye ayrılır.',
              'Kuvvet yalnızca büyük cisimler arasında oluşur.',
              'Kuvvetin etkisi yalnızca harekettir; şekil değişikliğine neden olmaz.'
            ],
            dogru: 1,
            ipucu: 'Kuvvet: itme/çekme etkisi, birimi N, dinamometre ile ölçülür, temas/temassız olarak sınıflandırılır.'
          }
        ]
      },
      {
        slug: 'surtunme-kuvveti', name: 'Sürtünme Kuvveti', hedef: 'Sürtünme kuvvetini ve etkilerini anlama',
        videoId: 'QOqTFJdp_88',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Sürtünme kuvveti nedir?',
            secenekler: [
              'Birbirine temas eden iki yüzey arasında hareketi zorlaştıran kuvvet.',
              'Cisimleri havaya kaldıran kuvvet.',
              'Sadece sıvılarda oluşan bir kuvvet.',
              'Mıknatısın çekme kuvveti.'
            ],
            dogru: 0,
            ipucu: 'Sürtünme, temas eden yüzeyler arasında harekete karşı yönde oluşan dirençtir.'
          },
          {
            saniye: 120,
            soru: 'Sürtünme kuvvetinin yönü nasıldır?',
            secenekler: [
              'Her zaman hareket yönünün tersinedir.',
              'Her zaman hareket yönüyle aynıdır.',
              'Yukarı doğrudur.',
              'Sabit bir yönü yoktur; rastgele değişir.'
            ],
            dogru: 0,
            ipucu: 'Sürtünme kuvveti her zaman cismin hareket yönüne zıt yönde etki eder.'
          },
          {
            saniye: 180,
            soru: 'Aşağıdakilerden hangisi sürtünme kuvvetini artırır?',
            secenekler: [
              'Yüzeyin pürüzlü olması.',
              'Yüzeyin kaygan olması.',
              'Cismin daha hafif olması.',
              'Yüzeye yağ sürülmesi.'
            ],
            dogru: 0,
            ipucu: 'Yüzey ne kadar pürüzlü olursa sürtünme o kadar fazla olur.'
          },
          {
            saniye: 240,
            soru: 'Araba lastiklerinin desenli olmasının nedeni nedir?',
            secenekler: [
              'Sürtünmeyi artırarak yolda tutunmayı sağlamak.',
              'Arabanın daha hızlı gitmesini sağlamak.',
              'Lastiğin daha güzel görünmesi.',
              'Lastiğin daha hafif olması.'
            ],
            dogru: 0,
            ipucu: 'Lastik desenleri yüzey pürüzlülüğünü artırarak sürtünmeyi ve tutunmayı güçlendirir.'
          },
          {
            saniye: 300,
            soru: 'Sürtünme kuvveti olmasaydı aşağıdakilerden hangisi gerçekleşirdi?',
            secenekler: [
              'Yürüyemez, yazı yazamaz ve araçlar frenlemeyle duramazdık.',
              'Her şey daha kolay olurdu.',
              'Sadece araçlar etkilenirdi.',
              'Hiçbir değişiklik olmazdı.'
            ],
            dogru: 0,
            ipucu: 'Sürtünme olmasaydı ayağımız kayar, kalem tutamaz, araçlar duramaz; yaşam çok zorlaşırdı.'
          },
          {
            saniye: 360,
            soru: 'Aşağıdakilerden hangisinde sürtünme kuvveti AZALTILMAK istenir?',
            secenekler: [
              'Kayak pistinin yüzeyinin düzgün yapılması.',
              'Ayakkabı tabanlarının desenli yapılması.',
              'Araba lastiklerinin desenli olması.',
              'Kapı kolunun pürüzlü yapılması.'
            ],
            dogru: 0,
            ipucu: 'Kayak yaparken sürtünmenin az olması istenir; bu yüzden pist düzgün ve kaygan yapılır.'
          },
          {
            saniye: 420,
            soru: 'Sürtünme kuvveti ile cismin ağırlığı arasındaki ilişki nedir?',
            secenekler: [
              'Cisim ağırlaştıkça sürtünme kuvveti artar.',
              'Cisim ağırlaştıkça sürtünme azalır.',
              'Ağırlık sürtünmeyi etkilemez.',
              'Sadece hafif cisimler sürtünmeden etkilenir.'
            ],
            dogru: 0,
            ipucu: 'Cismin ağırlığı arttıkça yüzeye baskı artar ve sürtünme kuvveti de artar.'
          },
          {
            saniye: 'fin',
            soru: 'Sürtünme kuvveti hakkında aşağıdakilerden hangisi doğrudur?',
            secenekler: [
              'Sürtünme kuvveti her zaman zararlıdır ve azaltılmalıdır.',
              'Sürtünme yüzeyler arasında hareketin tersine etki eder; pürüzlülük ve ağırlık artınca artar; bazen yararlı bazen zararlıdır.',
              'Sürtünme sadece katı yüzeylerde oluşur.',
              'Sürtünme kuvvetinin yönü hareketle aynıdır.'
            ],
            dogru: 1,
            ipucu: 'Sürtünme: hareket yönüne zıt, pürüzlülük/ağırlıkla artar, yararlı ve zararlı yönleri var.'
          }
        ]
      },
      {
        slug: 'hucre-organeller', name: 'Hücre ve Organelleri', hedef: 'Hücrenin yapısını ve organellerin görevlerini tanıma',
        videoId: 'DbWkNSM89D8',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Hücre nedir?',
            secenekler: [
              'Canlıların en küçük yapı ve görev birimidir.',
              'Yalnızca bitkilerde bulunan bir yapıdır.',
              'Sadece gözle görülebilen büyük yapılardır.',
              'Cansız maddelerin temel birimidir.'
            ],
            dogru: 0,
            ipucu: 'Hücre, tüm canlıların yapısını ve görevlerini oluşturan en küçük birimdir.'
          },
          {
            saniye: 120,
            soru: 'Hücre zarının görevi nedir?',
            secenekler: [
              'Hücreyi dış ortamdan ayırır ve madde giriş-çıkışını kontrol eder.',
              'Hücreye şekil verir ve sert tutar.',
              'Hücrenin enerji üretimini sağlar.',
              'Kalıtım bilgisini taşır.'
            ],
            dogru: 0,
            ipucu: 'Hücre zarı seçici geçirgendir; hangi maddelerin girip çıkacağını kontrol eder.'
          },
          {
            saniye: 180,
            soru: 'Hücrenin yönetim merkezi hangisidir?',
            secenekler: [
              'Çekirdek',
              'Mitokondri',
              'Koful',
              'Hücre zarı'
            ],
            dogru: 0,
            ipucu: 'Çekirdek, DNA\'yı (kalıtım bilgisini) barındırır ve hücrenin tüm faaliyetlerini yönetir.'
          },
          {
            saniye: 240,
            soru: 'Hücrenin enerji santralı olarak bilinen organel hangisidir?',
            secenekler: [
              'Koful',
              'Mitokondri',
              'Ribozom',
              'Endoplazmik retikulum'
            ],
            dogru: 1,
            ipucu: 'Mitokondri, besinlerdeki enerjiyi hücrenin kullanabileceği enerjiye dönüştürür.'
          },
          {
            saniye: 300,
            soru: 'Bitki hücresinde bulunup hayvan hücresinde bulunmayan yapı hangisidir?',
            secenekler: [
              'Hücre duvarı ve kloroplast',
              'Çekirdek ve mitokondri',
              'Hücre zarı ve ribozom',
              'Sitoplazma ve koful'
            ],
            dogru: 0,
            ipucu: 'Hücre duvarı bitkiye şekil/dayanıklılık verir; kloroplast fotosentez yapar — ikisi de hayvanda yok.'
          },
          {
            saniye: 360,
            soru: 'Kloroplastın görevi nedir?',
            secenekler: [
              'Fotosentez yaparak besin (glikoz) üretmek.',
              'Hücreye şekil vermek.',
              'Artık maddeleri depolamak.',
              'Protein üretmek.'
            ],
            dogru: 0,
            ipucu: 'Kloroplast güneş ışığını kullanarak su ve karbondioksitten besin üretir (fotosentez).'
          },
          {
            saniye: 420,
            soru: 'Ribozomun görevi nedir?',
            secenekler: [
              'Protein sentezi yapmak.',
              'Enerji üretmek.',
              'Madde depolamak.',
              'Hücreyi korumak.'
            ],
            dogru: 0,
            ipucu: 'Ribozom, hücrede protein üretiminden sorumlu küçük organeldir.'
          },
          {
            saniye: 'fin',
            soru: 'Hücre ve organeller hakkında hangisi doğrudur?',
            secenekler: [
              'Tüm hücreler aynıdır; bitki ve hayvan hücresi arasında fark yoktur.',
              'Hücre canlıların en küçük birimi; çekirdek yönetir, mitokondri enerji üretir, kloroplast fotosentez yapar; bitki hücresinde hücre duvarı ve kloroplast ekstra bulunur.',
              'Hayvan hücresinde kloroplast ve hücre duvarı bulunur.',
              'Mitokondri yalnızca bitki hücrelerinde bulunur.'
            ],
            dogru: 1,
            ipucu: 'Hücre: en küçük birim. Çekirdek→yönetim, mitokondri→enerji, kloroplast→fotosentez (sadece bitki).'
          }
        ]
      },
      {
        slug: 'destek-hareket', name: 'Destek ve Hareket Sistemi', hedef: 'İskelet ve kas sistemini tanıma',
        videoId: 'H3_FwuwIgM0',
        checkpoints: [
          {
            saniye: 60,
            soru: 'İskelet sisteminin görevi nedir?',
            secenekler: [
              'Vücuda şekil vermek, iç organları korumak ve hareketi sağlamak.',
              'Yalnızca vücuda şekil vermek.',
              'Sadece kanı taşımak.',
              'Besinleri sindirmek.'
            ],
            dogru: 0,
            ipucu: 'İskelet sistemi üç ana görev üstlenir: şekil verme, koruma ve hareket.'
          },
          {
            saniye: 120,
            soru: 'İnsan vücudunda yaklaşık kaç kemik bulunur?',
            secenekler: [
              'Yaklaşık 106',
              'Yaklaşık 206',
              'Yaklaşık 306',
              'Yaklaşık 406'
            ],
            dogru: 1,
            ipucu: 'Yetişkin bir insanın vücudunda yaklaşık 206 kemik bulunur.'
          },
          {
            saniye: 180,
            soru: 'Kemiklerin birbirine bağlandığı yere ne denir?',
            secenekler: [
              'Eklem',
              'Kas',
              'Kıkırdak',
              'Tendon'
            ],
            dogru: 0,
            ipucu: 'Eklemler, kemiklerin birbirine bağlandığı ve hareketin sağlandığı yerlerdir.'
          },
          {
            saniye: 240,
            soru: 'Aşağıdakilerden hangisi oynar eklem örneğidir?',
            secenekler: [
              'Diz eklemi',
              'Kafatası kemikleri arasındaki bağlantı',
              'Omurga kemikleri arasındaki bağlantı',
              'Diş-çene bağlantısı'
            ],
            dogru: 0,
            ipucu: 'Diz, dirsek ve omuz eklemleri serbestçe hareket edebilen oynar eklemlerdir.'
          },
          {
            saniye: 300,
            soru: 'Kaslar nasıl hareket sağlar?',
            secenekler: [
              'Kasılıp gevşeyerek kemikleri hareket ettirir.',
              'Kendiliğinden kemikleri iter.',
              'Kaslar hareket sağlamaz, sadece koruma görevi yapar.',
              'Kaslar yalnızca gevşer, kasılmaz.'
            ],
            dogru: 0,
            ipucu: 'Kaslar, kemiklere tendonlarla bağlıdır; kasılıp gevşeyerek hareketi sağlar.'
          },
          {
            saniye: 360,
            soru: 'Kemiklerin sağlığını korumak için aşağıdakilerden hangisi yapılmalıdır?',
            secenekler: [
              'Kalsiyum ve D vitamini içeren besinler tüketmek ve düzenli egzersiz yapmak.',
              'Hiç hareket etmemek ve sürekli oturmak.',
              'Sadece şekerli gıdalar yemek.',
              'Ağır yükleri tek elle taşımak.'
            ],
            dogru: 0,
            ipucu: 'Süt, peynir, yoğurt (kalsiyum) ve güneş ışığı (D vitamini) kemik sağlığı için önemlidir.'
          },
          {
            saniye: 420,
            soru: 'Kıkırdağın görevi nedir?',
            secenekler: [
              'Eklemlerde sürtünmeyi azaltmak ve darbeleri emmek.',
              'Kan üretmek.',
              'Kasları kemiklere bağlamak.',
              'Sinir sinyallerini iletmek.'
            ],
            dogru: 0,
            ipucu: 'Kıkırdak, esnek bir dokudur; eklemlerde tampon görevi görerek sürtünmeyi ve darbeleri azaltır.'
          },
          {
            saniye: 'fin',
            soru: 'Destek ve hareket sistemi hakkında hangisi doğrudur?',
            secenekler: [
              'İskelet ve kas sistemi birlikte çalışır; iskelet vücuda şekil verip organları korur, kaslar kasılıp gevşeyerek hareketi sağlar.',
              'Kaslar kemik olmadan da hareket sağlayabilir.',
              'İskeletin tek görevi vücuda şekil vermektir.',
              'İnsan vücudunda yaklaşık 50 kemik bulunur.'
            ],
            dogru: 0,
            ipucu: 'İskelet + kas = destek ve hareket sistemi; birlikte çalışarak vücuda şekil, koruma ve hareket sağlar.'
          }
        ]
      },
      {
        slug: 'isigin-yayilmasi', name: 'Işığın Yayılması', hedef: 'Işığın doğrusal yayılmasını ve ışık kaynaklarını öğrenme',
        videoId: 'NIvbMpcmIMo',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Işık nasıl yayılır?',
            secenekler: [
              'Doğrusal (düz bir çizgi boyunca) yayılır.',
              'Eğri bir yol izleyerek yayılır.',
              'Rastgele yönlerde zikzak çizerek yayılır.',
              'Yalnızca yukarıdan aşağıya yayılır.'
            ],
            dogru: 0,
            ipucu: 'Işık her zaman doğrusal olarak, yani düz bir çizgi boyunca ilerler.'
          },
          {
            saniye: 120,
            soru: 'Aşağıdakilerden hangisi doğal ışık kaynağıdır?',
            secenekler: [
              'Güneş',
              'Fener',
              'Lamba',
              'Mum'
            ],
            dogru: 0,
            ipucu: 'Güneş ve yıldızlar doğal ışık kaynağıdır; lamba, fener ve mum ise yapay ışık kaynaklarıdır.'
          },
          {
            saniye: 180,
            soru: 'Işığı geçirmeyen maddelere ne denir?',
            secenekler: [
              'Saydam',
              'Yarı saydam',
              'Opak (ışık geçirmez)',
              'Şeffaf'
            ],
            dogru: 2,
            ipucu: 'Opak (ışık geçirmez) maddeler: tahta, metal, karton gibi ışığı hiç geçirmeyen maddeler.'
          },
          {
            saniye: 240,
            soru: 'Aşağıdakilerden hangisi saydam (şeffaf) maddedir?',
            secenekler: [
              'Cam',
              'Karton',
              'Tahta',
              'Metal levha'
            ],
            dogru: 0,
            ipucu: 'Saydam maddeler ışığı geçirir; cam, temiz su ve temiz hava saydam maddelere örnektir.'
          },
          {
            saniye: 300,
            soru: 'Gölge nasıl oluşur?',
            secenekler: [
              'Işık doğrusal yayıldığı için opak bir cismin arkasına ulaşamaz ve karanlık alan oluşur.',
              'Işık cismin etrafından dolanarak oluşturur.',
              'Gölge sadece gece oluşur.',
              'Gölge oluşması için ışığa gerek yoktur.'
            ],
            dogru: 0,
            ipucu: 'Işık doğrusal yayılır → opak cismin arkasına geçemez → gölge oluşur.'
          },
          {
            saniye: 360,
            soru: 'Yarı saydam madde hangisidir?',
            secenekler: [
              'Buzlu cam',
              'Berrak cam',
              'Demir levha',
              'Ayna'
            ],
            dogru: 0,
            ipucu: 'Yarı saydam maddeler ışığın bir kısmını geçirir; buzlu cam, yağlı kâğıt ve tül perde örnektir.'
          },
          {
            saniye: 420,
            soru: 'Işık kaynağından çıkan ışık demetleri bir engelden geçirildiğinde düz bir çizgi oluşturur. Bu neyi kanıtlar?',
            secenekler: [
              'Işığın doğrusal yayıldığını.',
              'Işığın eğri yayıldığını.',
              'Işığın yalnızca saydam maddelerden geçtiğini.',
              'Işığın renkli olduğunu.'
            ],
            dogru: 0,
            ipucu: 'Karanlık odada ışık demetinin düz bir çizgi oluşturması, ışığın doğrusal yayıldığını gösterir.'
          },
          {
            saniye: 'fin',
            soru: 'Işığın yayılması konusuyla ilgili hangisi doğrudur?',
            secenekler: [
              'Işık doğrusal yayılır; saydam maddelerden geçer, opak maddelerden geçemez ve gölge oluşturur.',
              'Işık eğri yayılır ve her maddeden geçer.',
              'Gölge yalnızca saydam maddelerin arkasında oluşur.',
              'Işık kaynağına yaklaştıkça gölge büyür.'
            ],
            dogru: 0,
            ipucu: 'Işık: doğrusal yayılır, saydam→geçer, yarı saydam→kısmen geçer, opak→geçemez→gölge oluşur.'
          }
        ]
      },
      {
        slug: 'tam-golge', name: 'Tam Gölge Oluşumu', hedef: 'Tam gölge oluşumunu ve gölgenin boyutunu etkileyen faktörleri öğrenme',
        videoId: 'skxXJhM4IxI',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Tam gölge oluşması için hangi koşullar gereklidir?',
            secenekler: [
              'Bir ışık kaynağı, bir opak cisim ve bir perde (ekran) gereklidir.',
              'Sadece ışık kaynağı yeterlidir.',
              'Saydam bir cisim ve ışık kaynağı gereklidir.',
              'Gölge oluşması için karanlık oda gereklidir.'
            ],
            dogru: 0,
            ipucu: 'Tam gölge için üç şey lazım: ışık kaynağı + opak cisim + gölgenin düştüğü perde.'
          },
          {
            saniye: 120,
            soru: 'Noktasal ışık kaynağı ile cisim arasındaki mesafe azalırsa gölge nasıl değişir?',
            secenekler: [
              'Gölge büyür.',
              'Gölge küçülür.',
              'Gölge değişmez.',
              'Gölge kaybolur.'
            ],
            dogru: 0,
            ipucu: 'Işık kaynağı cisme yaklaştıkça gölge büyür; uzaklaştıkça gölge küçülür.'
          },
          {
            saniye: 180,
            soru: 'Cisim perdeye yaklaştırılırsa gölgenin boyutu nasıl değişir?',
            secenekler: [
              'Gölge küçülür ve cisme benzer.',
              'Gölge büyür.',
              'Gölge renk değiştirir.',
              'Gölge oluşmaz.'
            ],
            dogru: 0,
            ipucu: 'Cisim perdeye yaklaştıkça gölge küçülür ve cismin gerçek boyutuna yaklaşır.'
          },
          {
            saniye: 240,
            soru: 'Tam gölgenin şekli neye bağlıdır?',
            secenekler: [
              'Cismin şekline bağlıdır.',
              'Işık kaynağının rengine bağlıdır.',
              'Perdenin rengine bağlıdır.',
              'Odanın büyüklüğüne bağlıdır.'
            ],
            dogru: 0,
            ipucu: 'Gölgenin şekli, ışığı engelleyen cismin şeklinin bir yansımasıdır.'
          },
          {
            saniye: 300,
            soru: 'Noktasal ışık kaynağı kullanıldığında gölgenin özelliği nedir?',
            secenekler: [
              'Kenarları keskin ve net bir tam gölge oluşur.',
              'Gölge oluşmaz.',
              'Yarı gölge oluşur.',
              'Gölge renkli olur.'
            ],
            dogru: 0,
            ipucu: 'Noktasal ışık kaynağı tek bir noktadan ışık verir; bu yüzden gölgenin kenarları keskin ve net olur.'
          },
          {
            saniye: 360,
            soru: 'Aşağıdakilerden hangisi gölgenin boyutunu ETKİLEMEZ?',
            secenekler: [
              'Cismin rengi.',
              'Cismin ışık kaynağına uzaklığı.',
              'Cismin perdeye uzaklığı.',
              'Cismin büyüklüğü.'
            ],
            dogru: 0,
            ipucu: 'Gölgenin boyutunu etkileyen: cismin büyüklüğü, ışık kaynağına ve perdeye olan uzaklığı. Renk gölgeyi etkilemez.'
          },
          {
            saniye: 420,
            soru: 'Geniş (yayılı) ışık kaynağı kullanıldığında ne oluşur?',
            secenekler: [
              'Tam gölgenin etrafında yarı gölge bölgesi oluşur.',
              'Sadece tam gölge oluşur.',
              'Hiç gölge oluşmaz.',
              'Gölge cisimden küçük olur.'
            ],
            dogru: 0,
            ipucu: 'Geniş ışık kaynağı birden fazla noktadan ışık gönderir; ortada tam gölge, etrafında yarı gölge oluşur.'
          },
          {
            saniye: 'fin',
            soru: 'Tam gölge oluşumu hakkında hangisi doğrudur?',
            secenekler: [
              'Noktasal ışık kaynağı keskin kenarlı tam gölge oluşturur; ışık kaynağı cisme yaklaştıkça gölge büyür; cisim perdeye yaklaştıkça gölge küçülür.',
              'Gölgenin boyutu yalnızca cismin rengine bağlıdır.',
              'Geniş ışık kaynağı ile sadece tam gölge oluşur.',
              'Saydam cisimler tam gölge oluşturur.'
            ],
            dogru: 0,
            ipucu: 'Tam gölge: noktasal kaynak→net kenar; kaynak yakın→gölge büyük; cisim perdeye yakın→gölge küçük.'
          }
        ]
      },
      {
        slug: 'tanecikli-yapi', name: 'Maddenin Tanecikli Yapısı', hedef: 'Maddenin taneciklerden oluştuğunu ve tanecik özelliklerini öğrenme',
        videoId: 'q_M3R4KzwqU',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Madde nedir?',
            secenekler: [
              'Kütlesi olan ve uzayda yer kaplayan her şey.',
              'Sadece gözle görebildiğimiz nesneler.',
              'Yalnızca katı olan şeyler.',
              'Havada uçan her şey.'
            ],
            dogru: 0,
            ipucu: 'Madde, kütlesi olan ve boşlukta yer kaplayan her şeydir; katı, sıvı ve gaz olabilir.'
          },
          {
            saniye: 120,
            soru: 'Maddenin tanecikli yapısı ne anlama gelir?',
            secenekler: [
              'Tüm maddeler çok küçük taneciklerden (atom ve moleküllerden) oluşur.',
              'Maddeler yalnızca büyük parçalardan oluşur.',
              'Tanecikler sadece gazlarda bulunur.',
              'Tanecikli yapı yalnızca metallerde vardır.'
            ],
            dogru: 0,
            ipucu: 'Her madde, gözle görülemeyecek kadar küçük taneciklerden (atom/molekül) oluşmuştur.'
          },
          {
            saniye: 180,
            soru: 'Katı maddelerdeki tanecikler nasıl dizilmiştir?',
            secenekler: [
              'Düzenli ve sıkı dizilmiştir; birbirine çok yakındır.',
              'Dağınık ve birbirinden çok uzaktır.',
              'Tamamen serbest hareket eder.',
              'Tanecikler arası boşluk çok fazladır.'
            ],
            dogru: 0,
            ipucu: 'Katı maddelerde tanecikler düzenli, sıkı ve birbirine yakın dizilmiştir; bu yüzden şekilleri sabittir.'
          },
          {
            saniye: 240,
            soru: 'Sıvı maddelerdeki taneciklerin özelliği nedir?',
            secenekler: [
              'Tanecikler katıya göre daha gevşek dizilmiştir; birbirleri üzerinden kayabilir.',
              'Tanecikler tamamen sabittir ve hiç hareket etmez.',
              'Tanecikler arasında hiç boşluk yoktur.',
              'Tanecikler en hızlı sıvıda hareket eder.'
            ],
            dogru: 0,
            ipucu: 'Sıvılarda tanecikler birbirine yakın ama serbestçe kayabilir; bu yüzden sıvılar bulunduğu kabın şeklini alır.'
          },
          {
            saniye: 300,
            soru: 'Gaz maddelerdeki tanecikler nasıl hareket eder?',
            secenekler: [
              'Çok hızlı ve düzensiz hareket eder; birbirinden çok uzaktır.',
              'Yavaş ve düzenli hareket eder.',
              'Hiç hareket etmez.',
              'Sadece aşağı doğru hareket eder.'
            ],
            dogru: 0,
            ipucu: 'Gaz tanecikleri çok hızlı, rastgele hareket eder ve aralarındaki boşluk çok fazladır.'
          },
          {
            saniye: 360,
            soru: 'Bir parfüm şişesi açıldığında kokusunun odaya yayılmasının nedeni nedir?',
            secenekler: [
              'Parfüm taneciklerinin hava tanecikleri arasındaki boşluklardan geçerek yayılması (difüzyon).',
              'Parfümün görünmez bir güçle itilmesi.',
              'Havanın parfümü emmesi.',
              'Parfüm taneciklerinin yok olup yeniden oluşması.'
            ],
            dogru: 0,
            ipucu: 'Tanecikler arasında boşluk vardır; parfüm tanecikleri bu boşluklardan geçerek her yere yayılır (difüzyon).'
          },
          {
            saniye: 420,
            soru: 'Hangi hâlde tanecikler arası boşluk en fazladır?',
            secenekler: [
              'Katı hâlde',
              'Sıvı hâlde',
              'Gaz hâlde',
              'Hepsinde eşittir.'
            ],
            dogru: 2,
            ipucu: 'Tanecikler arası boşluk: katı < sıvı < gaz. Gaz hâlde tanecikler en uzak ve en hızlıdır.'
          },
          {
            saniye: 'fin',
            soru: 'Maddenin tanecikli yapısı hakkında hangisi doğrudur?',
            secenekler: [
              'Tüm maddeler taneciklerden oluşur; tanecikler sürekli hareket eder; katıda sıkı, sıvıda gevşek, gazda çok uzak dizilmiştir; aralarında boşluk vardır.',
              'Tanecikler yalnızca gazlarda hareket eder.',
              'Katı maddelerde tanecikler arası boşluk en fazladır.',
              'Tanecikler arası boşluk tüm hâllerde aynıdır.'
            ],
            dogru: 0,
            ipucu: 'Madde = taneciklerden oluşur, tanecikler hareket eder, aralarında boşluk var; katı→sıkı, sıvı→gevşek, gaz→çok uzak.'
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
      },
      {
        slug: 'soz-sanatlari', name: 'Söz Sanatları (Benzetme, Kişileştirme, Konuşturma)', hedef: 'Benzetme, kişileştirme ve konuşturma söz sanatlarını tanıma',
        videoId: 'br54-02-bK4',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Söz sanatları neden kullanılır?',
            secenekler: [
              'Anlatımı daha etkili, güzel ve canlı kılmak için.',
              'Cümledeki yazım hatalarını düzeltmek için.',
              'Kelimelerin anlamlarını değiştirmek için.',
              'Paragrafı uzatmak için.'
            ],
            dogru: 0,
            ipucu: 'Söz sanatları anlatıma güzellik ve etki katmak amacıyla kullanılır.'
          },
          {
            saniye: 120,
            soru: '"Kızın yanakları elma gibi kıpkırmızıydı." cümlesinde hangi söz sanatı vardır?',
            secenekler: [
              'Kişileştirme',
              'Konuşturma',
              'Benzetme',
              'Abartma'
            ],
            dogru: 2,
            ipucu: '"Gibi" edatı benzetme söz sanatının en belirgin ipucusudur.'
          },
          {
            saniye: 180,
            soru: 'Benzetme söz sanatında hangi öge benzetilen şeyi belirtir?',
            secenekler: [
              'Benzeyen',
              'Kendisine benzetilen',
              'Benzetme yönü',
              'Benzetme edatı'
            ],
            dogru: 1,
            ipucu: '"Saçları ipek gibi yumuşak" — ipek, kendisine benzetilendir.'
          },
          {
            saniye: 240,
            soru: '"Rüzgâr ağaçlara fısıldıyordu." cümlesinde hangi söz sanatı kullanılmıştır?',
            secenekler: [
              'Benzetme',
              'Konuşturma',
              'Kişileştirme',
              'Abartma'
            ],
            dogru: 2,
            ipucu: 'İnsan dışı varlıklara insan özellikleri vermeye kişileştirme denir.'
          },
          {
            saniye: 300,
            soru: 'Kişileştirme ile konuşturma arasındaki fark nedir?',
            secenekler: [
              'İkisi de aynı anlama gelir.',
              'Kişileştirmede varlığa insan özelliği verilir; konuşturmada varlık doğrudan konuşturulur.',
              'Konuşturmada "gibi" edatı kullanılır.',
              'Kişileştirmede varlık konuşturulur; konuşturmada insan özelliği verilir.'
            ],
            dogru: 1,
            ipucu: 'Konuşturma, kişileştirmenin bir ileri adımıdır — varlık tırnak içinde konuşur.'
          },
          {
            saniye: 360,
            soru: '"Güneş, \'Bugün herkesi ısıtacağım!\' dedi." cümlesinde hangi söz sanatı vardır?',
            secenekler: [
              'Benzetme',
              'Kişileştirme',
              'Konuşturma',
              'Abartma'
            ],
            dogru: 2,
            ipucu: 'Güneş doğrudan konuşuyor — bu konuşturma (intak) sanatıdır.'
          },
          {
            saniye: 420,
            soru: 'Aşağıdakilerden hangisinde benzetme sanatı vardır?',
            secenekler: [
              '"Yapraklar yere usulca süzüldü."',
              '"Deniz bugün çok sakin görünüyor."',
              '"Gözleri yıldız gibi parlıyordu."',
              '"Çiçek, \'Beni kopar!\' diye seslendi."'
            ],
            dogru: 2,
            ipucu: '"Gibi" edatı olan cümle benzetme sanatını gösterir.'
          },
          {
            saniye: 'fin',
            soru: 'Söz sanatlarını doğru özetleyen hangisidir?',
            secenekler: [
              'Benzetme: varlıklar arasında "gibi, kadar" ile benzerlik kurma. Kişileştirme: insan dışı varlığa insan özelliği verme. Konuşturma: insan dışı varlığı doğrudan konuşturma.',
              'Söz sanatları yalnızca şiirlerde kullanılır, düzyazıda kullanılmaz.',
              'Kişileştirme ve konuşturma aynı şeydir; aralarında fark yoktur.',
              'Benzetme söz sanatında "gibi" edatı asla kullanılmaz.'
            ],
            dogru: 0,
            ipucu: 'Benzetme = gibi/kadar. Kişileştirme = insan özelliği. Konuşturma = doğrudan konuşma.'
          }
        ]
      },
      {
        slug: 'anlatim-bicimleri', name: 'Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları', hedef: 'Betimleme, öyküleme ve tanıtma anlatım biçimlerini ayırt etme',
        videoId: 'H7ILiRWnzOY',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Anlatım biçimleri kaça ayrılır?',
            secenekler: [
              'İkiye: betimleme ve öyküleme.',
              'Üçe: açıklama, betimleme ve tartışma.',
              'Dörde: açıklama (öğretici), betimleme (tasvir), öyküleme (olay anlatma) ve tartışma.',
              'Beşe: betimleme, öyküleme, açıklama, tartışma ve karşılaştırma.'
            ],
            dogru: 2,
            ipucu: 'Temel anlatım biçimleri: açıklayıcı, betimleyici, öyküleyici ve tartışmacı anlatımdır.'
          },
          {
            saniye: 120,
            soru: '"Evin önündeki bahçe rengarenk çiçeklerle doluydu; mis gibi bir koku yayılıyordu." Bu metin hangi anlatım biçimine örnektir?',
            secenekler: [
              'Öyküleme',
              'Betimleme (tasvir)',
              'Tartışma',
              'Açıklama'
            ],
            dogru: 1,
            ipucu: 'Duyu organlarına hitap eden, görüntüyü tasvir eden anlatım betimleme anlatımıdır.'
          },
          {
            saniye: 180,
            soru: 'Öyküleme anlatım biçiminin temel özelliği nedir?',
            secenekler: [
              'Bir kavramı tanımlamak.',
              'Bir olayı baştan sona anlatmak, hareket ve değişim içermek.',
              'Bir konuyu savunmak veya eleştirmek.',
              'Bir manzarayı ayrıntılı betimlemek.'
            ],
            dogru: 1,
            ipucu: 'Öykülemede bir olay sırası vardır; olaylar birbiri ardına anlatılır.'
          },
          {
            saniye: 240,
            soru: '"Dünya\'da su kaynaklarının yalnızca %3\'ü tatlı sudur." Bu cümle hangi anlatım biçimine örnektir?',
            secenekler: [
              'Betimleme',
              'Öyküleme',
              'Açıklayıcı anlatım',
              'Tartışma'
            ],
            dogru: 2,
            ipucu: 'Bilgi veren, öğretici nitelikteki anlatım açıklayıcı anlatımdır.'
          },
          {
            saniye: 300,
            soru: 'Düşünceyi geliştirme yollarından "tanımlama" nedir?',
            secenekler: [
              'Bir kavramın ne olduğunu açıklamaktır.',
              'İki kavramı karşılaştırmaktır.',
              'Bir konuyu örnekle desteklemektir.',
              'Bir olayı zaman sırasına göre anlatmaktır.'
            ],
            dogru: 0,
            ipucu: '"Tanımlama" bir kavramın "ne olduğunu" ortaya koyan ifadedir.'
          },
          {
            saniye: 360,
            soru: '"Kitap okumak zihin için egzersiz gibidir." cümlesinde hangi düşünceyi geliştirme yolu kullanılmıştır?',
            secenekler: [
              'Tanımlama',
              'Örnekleme',
              'Benzetme',
              'Tanık gösterme'
            ],
            dogru: 2,
            ipucu: '"Gibi" edatıyla bir kavram başka bir kavrama benzetilmiştir.'
          },
          {
            saniye: 420,
            soru: '"Atatürk, \'Hayatta en hakiki mürşit ilimdir.\' demiştir." cümlesinde hangi düşünceyi geliştirme yolu vardır?',
            secenekler: [
              'Örnekleme',
              'Karşılaştırma',
              'Tanık gösterme (alıntı yapma)',
              'Tanımlama'
            ],
            dogru: 2,
            ipucu: 'Bir düşünceyi desteklemek için ünlü birinin sözünü aktarmaya tanık gösterme denir.'
          },
          {
            saniye: 'fin',
            soru: 'Anlatım biçimleri ve düşünceyi geliştirme yollarını doğru özetleyen hangisidir?',
            secenekler: [
              'Anlatım biçimleri (açıklama, betimleme, öyküleme, tartışma) metnin genel yapısını belirler; düşünceyi geliştirme yolları (tanımlama, örnekleme, benzetme, karşılaştırma, tanık gösterme) ise düşünceyi destekler.',
              'Anlatım biçimleri ile düşünceyi geliştirme yolları aynı şeydir.',
              'Betimleme bir düşünceyi geliştirme yoludur, anlatım biçimi değildir.',
              'Düşünceyi geliştirme yolları yalnızca tartışma anlatımında kullanılır.'
            ],
            dogru: 0,
            ipucu: 'Anlatım biçimi = metnin genel çerçevesi. Düşünceyi geliştirme yolu = düşünceyi destekleyen teknikler.'
          }
        ]
      },
      {
        slug: 'hikaye-unsurlari', name: 'Hikâyenin Unsurları', hedef: 'Hikâyenin olay, kişi, yer, zaman unsurlarını belirleme',
        videoId: 'lbpRQLXb8hw',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Bir hikâyenin temel unsurları nelerdir?',
            secenekler: [
              'Yalnızca olay ve kişiler.',
              'Olay, kişiler, yer (mekân) ve zaman.',
              'Başlık, yazar ve sayfa sayısı.',
              'Giriş, gelişme ve sonuç.'
            ],
            dogru: 1,
            ipucu: 'Hikâyenin dört temel unsuru: olay, kişiler, yer ve zaman.'
          },
          {
            saniye: 120,
            soru: 'Hikâyedeki "olay" unsuru neyi ifade eder?',
            secenekler: [
              'Hikâyenin geçtiği yeri.',
              'Hikâyede anlatılan temel sorunu veya yaşananları.',
              'Hikâyedeki kişilerin özelliklerini.',
              'Hikâyenin yazılış tarihini.'
            ],
            dogru: 1,
            ipucu: 'Olay, hikâyenin temelini oluşturan yaşanmış veya kurgulanmış hadisedir.'
          },
          {
            saniye: 180,
            soru: '"Ali, yaz tatilinde köyde dedesini ziyarete gitti." cümlesinde yer unsuru hangisidir?',
            secenekler: [
              'Ali',
              'Yaz tatili',
              'Köy',
              'Dedesini ziyaret etmek'
            ],
            dogru: 2,
            ipucu: 'Yer unsuru, olayın geçtiği mekânı belirtir — nerede sorusunun cevabıdır.'
          },
          {
            saniye: 240,
            soru: 'Hikâyede "zaman" unsuru nasıl belirlenir?',
            secenekler: [
              'Hikâyedeki kişilerin yaşlarına bakılarak.',
              'Olayın ne zaman geçtiğini bildiren ifadelerden (mevsim, saat, yıl, gece-gündüz gibi).',
              'Hikâyenin sayfa sayısına bakılarak.',
              'Yazarın doğum tarihine bakılarak.'
            ],
            dogru: 1,
            ipucu: '"Yaz tatilinde", "sabahın erken saatlerinde" gibi ifadeler zaman unsurudur.'
          },
          {
            saniye: 300,
            soru: 'Bir hikâyede "kişiler" unsurunu bulmak için hangi soruyu sorarız?',
            secenekler: [
              'Ne zaman?',
              'Nerede?',
              'Kim / Kimler?',
              'Nasıl?'
            ],
            dogru: 2,
            ipucu: 'Kişiler unsuru "kim" sorusunun cevabıdır.'
          },
          {
            saniye: 360,
            soru: '"Küçük kız, kış günü parkta bir yavru kedi buldu." cümlesinde olay unsuru hangisidir?',
            secenekler: [
              'Küçük kız',
              'Kış günü',
              'Parkta',
              'Yavru kedi bulması'
            ],
            dogru: 3,
            ipucu: 'Olay unsuru, yapılan eylemi veya yaşanan durumu belirtir.'
          },
          {
            saniye: 420,
            soru: 'Hikâyenin bölümleri (giriş, gelişme, sonuç) ile unsurları arasındaki fark nedir?',
            secenekler: [
              'Fark yoktur, ikisi aynı şeydir.',
              'Bölümler hikâyenin yapısını (sırasını); unsurlar hikâyenin içeriğini (olay, kişi, yer, zaman) belirtir.',
              'Bölümler yalnızca romanlarda, unsurlar yalnızca hikâyelerde bulunur.',
              'Unsurlar hikâyenin uzunluğunu belirler.'
            ],
            dogru: 1,
            ipucu: 'Bölümler = yapı (sıralama). Unsurlar = içerik (ne, kim, nerede, ne zaman).'
          },
          {
            saniye: 'fin',
            soru: 'Hikâyenin unsurlarını doğru özetleyen hangisidir?',
            secenekler: [
              'Hikâyenin unsurları: olay (ne oldu), kişiler (kim), yer (nerede), zaman (ne zaman). Bu unsurlar birlikte hikâyenin temelini oluşturur.',
              'Hikâyenin tek unsuru olaydır; diğerleri önemsizdir.',
              'Yer ve zaman unsuru yalnızca romanlarda bulunur.',
              'Hikâyenin unsurları giriş, gelişme ve sonuçtur.'
            ],
            dogru: 0,
            ipucu: 'Dört temel unsur: olay, kişiler, yer, zaman. Hepsi bir arada hikâyeyi oluşturur.'
          }
        ]
      },
      {
        slug: 'gecis-baglanti', name: 'Geçiş ve Bağlantı İfadeleri', hedef: 'Geçiş ve bağlantı ifadelerini metinde doğru kullanma',
        videoId: 'sUIAdU-Fwl0',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Geçiş ve bağlantı ifadeleri ne işe yarar?',
            secenekler: [
              'Cümleleri birbirinden ayırarak bağımsız kılar.',
              'Cümleler ve paragraflar arasında anlam ilişkisi kurarak metni akıcı hale getirir.',
              'Kelimelerin yazımını düzeltir.',
              'Noktalama işaretlerinin yerini alır.'
            ],
            dogru: 1,
            ipucu: 'Bağlantı ifadeleri metin içindeki cümleleri birbirine bağlayarak akıcılık sağlar.'
          },
          {
            saniye: 120,
            soru: '"Öncelikle, bu konunun önemini anlamamız gerekir." cümlesinde "öncelikle" hangi tür bağlantı ifadesidir?',
            secenekler: [
              'Karşıtlık bildiren',
              'Sıralama (öncelik) bildiren',
              'Neden-sonuç bildiren',
              'Örnekleme bildiren'
            ],
            dogru: 1,
            ipucu: '"Öncelikle, ilk olarak, birincisi" gibi ifadeler sıralama bildirir.'
          },
          {
            saniye: 180,
            soru: '"Hava çok soğuktu. Buna rağmen dışarı çıktık." cümlesinde "buna rağmen" ne tür bir bağlantı ifadesidir?',
            secenekler: [
              'Sıralama',
              'Örnekleme',
              'Karşıtlık (zıtlık) bildiren',
              'Ekleme bildiren'
            ],
            dogru: 2,
            ipucu: '"Buna rağmen, ancak, fakat, oysa" gibi ifadeler karşıtlık bildirir.'
          },
          {
            saniye: 240,
            soru: '"Örneğin, kitap okumak kelime dağarcığımızı genişletir." cümlesindeki "örneğin" hangi bağlantı türüne aittir?',
            secenekler: [
              'Karşıtlık',
              'Sıralama',
              'Örnekleme',
              'Sonuç'
            ],
            dogru: 2,
            ipucu: '"Örneğin, mesela, sözgelimi" örnekleme bildiren bağlantı ifadeleridir.'
          },
          {
            saniye: 300,
            soru: '"Bu nedenle hepimiz daha dikkatli olmalıyız." cümlesindeki bağlantı ifadesi ne tür bir ilişki kurar?',
            secenekler: [
              'Ekleme',
              'Neden-sonuç',
              'Karşıtlık',
              'Sıralama'
            ],
            dogru: 1,
            ipucu: '"Bu nedenle, bu yüzden, dolayısıyla, bundan dolayı" neden-sonuç bildirir.'
          },
          {
            saniye: 360,
            soru: 'Aşağıdakilerden hangisi ekleme bildiren bir bağlantı ifadesidir?',
            secenekler: [
              'Ancak',
              'Bunun yanı sıra',
              'Sonuç olarak',
              'Örneğin'
            ],
            dogru: 1,
            ipucu: '"Bunun yanı sıra, ayrıca, üstelik, hem de" ekleme bildiren ifadelerdir.'
          },
          {
            saniye: 420,
            soru: '"Sonuç olarak, bu proje hepimize çok şey öğretti." cümlesindeki bağlantı ifadesi hangi amaçla kullanılmıştır?',
            secenekler: [
              'Konuya giriş yapmak için.',
              'Karşıt bir düşünce bildirmek için.',
              'Konuyu özetlemek ve bitirmek için.',
              'Yeni bir örnek vermek için.'
            ],
            dogru: 2,
            ipucu: '"Sonuç olarak, kısacası, özetle" ifadeleri metni toparlama ve sonlandırma amaçlıdır.'
          },
          {
            saniye: 'fin',
            soru: 'Geçiş ve bağlantı ifadelerini doğru özetleyen hangisidir?',
            secenekler: [
              'Bağlantı ifadeleri metni akıcı yapar: sıralama (öncelikle, sonra), karşıtlık (ancak, buna rağmen), neden-sonuç (bu yüzden), ekleme (ayrıca), örnekleme (örneğin) ve özetleme (sonuç olarak) gibi türleri vardır.',
              'Bağlantı ifadeleri sadece "ve, ama, çünkü" kelimelerinden oluşur.',
              'Bağlantı ifadeleri yalnızca paragrafların sonunda kullanılır.',
              'Bağlantı ifadeleri anlam ilişkisi kurmaz, sadece süs amaçlıdır.'
            ],
            dogru: 0,
            ipucu: 'Sıralama, karşıtlık, neden-sonuç, ekleme, örnekleme, özetleme — hepsi bağlantı ifadesidir.'
          }
        ]
      },
      {
        slug: 'cumlede-kavramlar', name: 'Cümlede Kavramlar (Neden-Sonuç, Amaç-Sonuç, Koşul)', hedef: 'Neden-sonuç, amaç-sonuç ve koşul cümlelerini ayırt etme',
        videoId: '6eDBln5v9M8',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Neden-sonuç cümlesi ne anlam taşır?',
            secenekler: [
              'Bir olayın gerçekleşmesi için gerekli şartı bildirir.',
              'Bir olayın hangi nedenle (sebep) gerçekleştiğini ve sonucunu bildirir.',
              'İki olayı karşılaştırır.',
              'Bir dileği ifade eder.'
            ],
            dogru: 1,
            ipucu: 'Neden-sonuç: "Çok çalıştığı için sınavı geçti." Neden = çalışmak, sonuç = geçmek.'
          },
          {
            saniye: 120,
            soru: '"Hava soğuk olduğu için mont giydim." cümlesinde neden hangisidir?',
            secenekler: [
              'Mont giymek',
              'Havanın soğuk olması',
              'Her ikisi de neden',
              'Hiçbiri'
            ],
            dogru: 1,
            ipucu: '"İçin, -den dolayı, -diği için" gibi ifadeler nedenin ipucusudur.'
          },
          {
            saniye: 180,
            soru: 'Amaç-sonuç cümlesi ile neden-sonuç cümlesi arasındaki fark nedir?',
            secenekler: [
              'İkisi de aynı anlama gelir.',
              'Neden-sonuçta bir olay kendiliğinden gerçekleşir; amaç-sonuçta bir hedef/niyet için eylem yapılır.',
              'Amaç-sonuçta "çünkü" kullanılır.',
              'Neden-sonuçta bir hedef vardır, amaç-sonuçta yoktur.'
            ],
            dogru: 1,
            ipucu: 'Amaç-sonuç: "Sınavı geçmek İÇİN çalıştı." — bir hedef (amaç) var.'
          },
          {
            saniye: 240,
            soru: '"Kardeşine hediye almak için markete gitti." cümlesinde amaç hangisidir?',
            secenekler: [
              'Markete gitmek',
              'Kardeşine hediye almak',
              'Alışveriş yapmak',
              'Marketten dönmek'
            ],
            dogru: 1,
            ipucu: '"İçin, amacıyla, diye" ifadeleri amacı gösterir; amaç eylemin hedefidir.'
          },
          {
            saniye: 300,
            soru: 'Koşul (şart) cümlesi ne anlam taşır?',
            secenekler: [
              'Bir olayın kesin olarak gerçekleşeceğini bildirir.',
              'Bir olayın gerçekleşmesinin başka bir olaya bağlı olduğunu bildirir.',
              'İki olayın aynı anda gerçekleştiğini bildirir.',
              'Bir olayın nedenini açıklar.'
            ],
            dogru: 1,
            ipucu: '"Eğer/şayet + -se/-sa" yapısı koşul bildirir: "Eğer yağmur yağarsa evde kalırız."'
          },
          {
            saniye: 360,
            soru: '"Eğer erken kalkarsan okula geç kalmazsın." cümlesindeki koşul nedir?',
            secenekler: [
              'Okula geç kalmamak',
              'Erken kalkmak',
              'Okula gitmek',
              'Uyumak'
            ],
            dogru: 1,
            ipucu: '"Eğer" ve "-san" eki koşulu gösterir; koşul şartın gerçekleşmesi gereken kısmıdır.'
          },
          {
            saniye: 420,
            soru: 'Aşağıdaki cümlelerden hangisi amaç-sonuç ilişkisi taşır?',
            secenekler: [
              '"Hava güzel olduğu için pikniğe gittik."',
              '"Eğer ders çalışırsan başarılı olursun."',
              '"Sağlıklı olmak için her gün spor yapıyor."',
              '"Çok yorulduğundan erken yattı."'
            ],
            dogru: 2,
            ipucu: '"İçin" edatı ve bir hedef (sağlıklı olmak) = amaç-sonuç ilişkisi.'
          },
          {
            saniye: 'fin',
            soru: 'Neden-sonuç, amaç-sonuç ve koşul kavramlarını doğru özetleyen hangisidir?',
            secenekler: [
              'Neden-sonuç: bir olay başka bir olaya yol açar (-diği için, -den dolayı). Amaç-sonuç: bir hedef için eylem yapılır (için, amacıyla, diye). Koşul: bir olayın gerçekleşmesi şarta bağlıdır (eğer, -se/-sa).',
              'Üçü de aynı anlama gelir; aralarında fark yoktur.',
              'Koşul cümlelerinde "çünkü" kullanılır.',
              'Amaç-sonuç cümleleri "eğer" ile başlar.'
            ],
            dogru: 0,
            ipucu: 'Neden-sonuç = sebep → sonuç. Amaç-sonuç = hedef → eylem. Koşul = şart → sonuç.'
          }
        ]
      },
      {
        slug: 'isimler-adlar', name: 'İsimler (Adlar)', hedef: 'İsimleri özel/cins, tekil/çoğul, somut/soyut olarak sınıflandırma',
        videoId: 'ok8UC7I9Qeo',
        checkpoints: [
          {
            saniye: 60,
            soru: 'İsim (ad) nedir?',
            secenekler: [
              'Varlıkların hareketlerini bildiren sözcüklerdir.',
              'Varlıkları ve kavramları karşılayan sözcüklerdir.',
              'Varlıkların özelliklerini bildiren sözcüklerdir.',
              'Cümledeki bağlaçlardır.'
            ],
            dogru: 1,
            ipucu: 'İsimler; canlı-cansız varlıkları, kavramları ve duyguları karşılayan sözcüklerdir.'
          },
          {
            saniye: 120,
            soru: '"Atatürk" özel ad mıdır, yoksa cins (tür) ad mıdır?',
            secenekler: [
              'Cins (tür) addır.',
              'Özel addır.',
              'Hem özel hem cins addır.',
              'Ad değildir.'
            ],
            dogru: 1,
            ipucu: 'Tek bir varlığı, kişiyi veya yeri karşılayan adlar özel addır ve büyük harfle başlar.'
          },
          {
            saniye: 180,
            soru: 'Aşağıdakilerden hangisi cins (tür) addır?',
            secenekler: [
              'Ankara',
              'Kalem',
              'Sakarya',
              'Atatürk'
            ],
            dogru: 1,
            ipucu: 'Cins ad, aynı türdeki tüm varlıkları karşılar: kalem, ağaç, çiçek...'
          },
          {
            saniye: 240,
            soru: '"Çocuklar" sözcüğü tekil midir, çoğul mudur?',
            secenekler: [
              'Tekil',
              'Çoğul',
              'Hem tekil hem çoğul',
              'Belirsiz'
            ],
            dogru: 1,
            ipucu: '"-ler/-lar" eki sözcüğü çoğul yapar: çocuk → çocuklar.'
          },
          {
            saniye: 300,
            soru: 'Somut isim ile soyut isim arasındaki fark nedir?',
            secenekler: [
              'Somut isimler yalnızca canlıları, soyut isimler yalnızca cansızları karşılar.',
              'Somut isimler beş duyu organıyla algılanabilir; soyut isimler algılanamaz, yalnızca düşünülür veya hissedilir.',
              'İkisi arasında fark yoktur.',
              'Soyut isimler her zaman çoğul kullanılır.'
            ],
            dogru: 1,
            ipucu: 'Somut: masa, su, çiçek (görebilirsin). Soyut: sevgi, özlem, mutluluk (hissedersin).'
          },
          {
            saniye: 360,
            soru: 'Aşağıdakilerden hangisi soyut bir isimdir?',
            secenekler: [
              'Ağaç',
              'Deniz',
              'Özgürlük',
              'Taş'
            ],
            dogru: 2,
            ipucu: 'Özgürlük gözle görülemez, elle tutulamaz — yalnızca düşünülür ve hissedilir.'
          },
          {
            saniye: 420,
            soru: '"Topluluk ismi" ne demektir?',
            secenekler: [
              'Birden fazla varlıktan oluşan bir grubu tek sözcükle karşılayan isimdir.',
              'Çoğul eki almış her isimdir.',
              'Yalnızca insan topluluklarını ifade eden isimdir.',
              'Soyut isimlerin başka bir adıdır.'
            ],
            dogru: 0,
            ipucu: 'Ordu, sürü, orman, takım — hepsi birçok varlığı tek sözcükle anlatır.'
          },
          {
            saniye: 'fin',
            soru: 'İsimlerin sınıflandırılmasını doğru özetleyen hangisidir?',
            secenekler: [
              'İsimler; özel/cins (tür), tekil/çoğul, somut/soyut ve topluluk ismi olarak sınıflandırılır. Özel adlar büyük harfle yazılır.',
              'İsimler yalnızca özel ve cins olmak üzere ikiye ayrılır.',
              'Soyut isimler daima özel ad sayılır.',
              'Topluluk isimleri çoğul eki almış isimlerdir.'
            ],
            dogru: 0,
            ipucu: 'Özel/cins, tekil/çoğul, somut/soyut, topluluk — isimlerin dört sınıflandırma ölçütü.'
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
      },
      {
        slug: 'ilimizin-konumu', name: 'İlimizin Göreceli Konumu', hedef: 'İlimizin göreceli konumunu ve komşu illeri tanıma',
        videoId: '4ygoBUqSmvI',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Göreceli konum ne demektir?',
            secenekler: [
              'Bir yerin enlem ve boylam derecesiyle belirlenmesidir.',
              'Bir yerin çevresindeki illere, denizlere, dağlara göre yerinin tarif edilmesidir.',
              'Bir yerin nüfus sayısına göre belirlenmesidir.',
              'Bir yerin yüzölçümüne göre sıralanmasıdır.'
            ],
            dogru: 1,
            ipucu: 'Göreceli konum, çevredeki yerlere (il, deniz, dağ) göre yapılan konum tarifidir.'
          },
          {
            saniye: 120,
            soru: 'Göreceli konum ile mutlak konum arasındaki fark nedir?',
            secenekler: [
              'İkisi aynı şeydir.',
              'Mutlak konum enlem-boylamla, göreceli konum çevreye göre belirlenir.',
              'Göreceli konum enlem-boylamla belirlenir.',
              'Mutlak konum komşu illere göre belirlenir.'
            ],
            dogru: 1,
            ipucu: 'Mutlak = koordinat (enlem-boylam). Göreceli = çevreye göre tarif.'
          },
          {
            saniye: 180,
            soru: 'Bir ilin göreceli konumu tarif edilirken hangi bilgiler kullanılır?',
            secenekler: [
              'Yalnızca nüfus ve yüzölçümü bilgileri.',
              'Komşu iller, yakınındaki denizler, dağlar ve nehirler.',
              'Yalnızca enlem ve boylam bilgileri.',
              'Yalnızca iklim bilgileri.'
            ],
            dogru: 1,
            ipucu: '"Kuzeyinde ... denizi, doğusunda ... ili var." gibi ifadeler göreceli konumu anlatır.'
          },
          {
            saniye: 240,
            soru: '"İlimiz, Karadeniz\'in güneyinde yer alır." cümlesi hangi tür konum bilgisi verir?',
            secenekler: [
              'Mutlak konum',
              'Göreceli konum',
              'Matematik konum',
              'Özel konum'
            ],
            dogru: 1,
            ipucu: 'Bir denize göre yön belirtilmişse bu göreceli konum tarifidir.'
          },
          {
            saniye: 300,
            soru: 'Komşu illeri bilmek neden önemlidir?',
            secenekler: [
              'Sadece sınav soruları için gereklidir.',
              'Ticaret, ulaşım ve sosyal ilişkiler açısından komşu illerin etkisini anlamamızı sağlar.',
              'Hiçbir önemi yoktur.',
              'Sadece harita çizmek için kullanılır.'
            ],
            dogru: 1,
            ipucu: 'Komşu iller arasında ticaret, ulaşım ve kültürel etkileşim yoğundur.'
          },
          {
            saniye: 360,
            soru: 'Bir ilin göreceli konumu zamanla değişir mi?',
            secenekler: [
              'Evet, her yıl değişir.',
              'Hayır, coğrafi konumu sabittir; ancak çevresindeki yapılar (yollar, köprüler) değişebilir.',
              'Evet, depremlerle sürekli değişir.',
              'Hayır, hiçbir şekilde değişmez.'
            ],
            dogru: 1,
            ipucu: 'İlin fiziksel yeri aynıdır ama çevresindeki beşeri unsurlar (yol, baraj) değişebilir.'
          },
          {
            saniye: 420,
            soru: 'Aşağıdakilerden hangisi göreceli konum tarifi değildir?',
            secenekler: [
              '"İlimiz 40° kuzey enlemi üzerindedir."',
              '"İlimizin kuzeyinde Kastamonu ili yer alır."',
              '"İlimiz Karadeniz kıyısındadır."',
              '"İlimizin doğusunda verimli ovalar uzanır."'
            ],
            dogru: 0,
            ipucu: 'Enlem-boylam bilgisi mutlak (matematik) konumu belirtir, göreceli konum değil.'
          },
          {
            saniye: 'fin',
            soru: 'Göreceli konum kavramını doğru özetleyen hangisidir?',
            secenekler: [
              'Göreceli konum, bir yerin çevresindeki illere, denizlere, dağlara ve nehirlere göre tarif edilmesidir. Mutlak konumdan farkı, koordinat kullanılmamasıdır.',
              'Göreceli konum, enlem ve boylam derecelerini kullanarak yapılan konum tarifidir.',
              'Göreceli konum yalnızca büyükşehirler için kullanılır.',
              'Göreceli konum ve mutlak konum aynı anlama gelir.'
            ],
            dogru: 0,
            ipucu: 'Göreceli = çevreye göre tarif. Mutlak = enlem-boylam.'
          }
        ]
      },
      {
        slug: 'komsu-devletler', name: 'Ülkemize Komşu Devletler', hedef: 'Türkiye\'ye komşu olan devletleri tanıma',
        videoId: 'C6-43BBvcuM',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Türkiye kaç ülkeyle kara sınırına sahiptir?',
            secenekler: [
              '6',
              '7',
              '8',
              '9'
            ],
            dogru: 2,
            ipucu: 'Türkiye 8 ülkeyle kara komşusudur: Yunanistan, Bulgaristan, Gürcistan, Ermenistan, Nahçıvan (Azerbaycan), İran, Irak, Suriye.'
          },
          {
            saniye: 120,
            soru: 'Türkiye\'nin batı komşuları hangileridir?',
            secenekler: [
              'İran ve Irak',
              'Yunanistan ve Bulgaristan',
              'Gürcistan ve Ermenistan',
              'Suriye ve Irak'
            ],
            dogru: 1,
            ipucu: 'Avrupa kıtasındaki komşularımız batıda yer alır: Yunanistan ve Bulgaristan.'
          },
          {
            saniye: 180,
            soru: 'Türkiye\'nin kuzeydoğu komşuları kimlerdir?',
            secenekler: [
              'Yunanistan ve Bulgaristan',
              'Gürcistan ve Ermenistan',
              'İran ve Irak',
              'Suriye ve Lübnan'
            ],
            dogru: 1,
            ipucu: 'Kafkasya bölgesindeki komşularımız kuzeydoğudadır: Gürcistan ve Ermenistan.'
          },
          {
            saniye: 240,
            soru: 'Türkiye\'nin güneyinde hangi ülkeler yer alır?',
            secenekler: [
              'Bulgaristan ve Yunanistan',
              'Gürcistan ve İran',
              'Suriye ve Irak',
              'Ermenistan ve Azerbaycan'
            ],
            dogru: 2,
            ipucu: 'Güney sınırımız boyunca Suriye ve Irak yer alır.'
          },
          {
            saniye: 300,
            soru: 'Nahçıvan hangi ülkeye bağlıdır?',
            secenekler: [
              'İran',
              'Ermenistan',
              'Azerbaycan',
              'Gürcistan'
            ],
            dogru: 2,
            ipucu: 'Nahçıvan, Azerbaycan\'ın özerk bölgesidir ve Türkiye ile kısa bir sınırı vardır.'
          },
          {
            saniye: 360,
            soru: 'Türkiye\'nin en uzun kara sınırı hangi ülkeyledir?',
            secenekler: [
              'Yunanistan',
              'Bulgaristan',
              'Suriye',
              'İran'
            ],
            dogru: 2,
            ipucu: 'Türkiye\'nin güney sınırı boyunca uzanan Suriye ile en uzun kara sınırımız vardır.'
          },
          {
            saniye: 420,
            soru: 'Türkiye hangi denizlerle çevrilidir?',
            secenekler: [
              'Yalnızca Akdeniz ve Karadeniz.',
              'Karadeniz, Marmara Denizi, Ege Denizi ve Akdeniz.',
              'Yalnızca Karadeniz ve Ege Denizi.',
              'Atlas Okyanusu ve Akdeniz.'
            ],
            dogru: 1,
            ipucu: 'Üç tarafı denizlerle çevrili: kuzeyde Karadeniz, batıda Ege, güneyde Akdeniz, arada Marmara.'
          },
          {
            saniye: 'fin',
            soru: 'Türkiye\'nin komşu devletlerini doğru özetleyen hangisidir?',
            secenekler: [
              'Türkiye 8 kara komşusuna sahiptir: batıda Yunanistan-Bulgaristan, kuzeydoğuda Gürcistan-Ermenistan, doğuda Nahçıvan (Azerbaycan)-İran, güneyde Irak-Suriye. Üç tarafı denizlerle çevrilidir.',
              'Türkiye yalnızca 5 ülkeyle komşudur.',
              'Türkiye\'nin deniz komşusu yoktur.',
              'Türkiye yalnızca Asya kıtasında komşulara sahiptir.'
            ],
            dogru: 0,
            ipucu: '8 kara komşusu: Yunanistan, Bulgaristan, Gürcistan, Ermenistan, Nahçıvan, İran, Irak, Suriye.'
          }
        ]
      },
      {
        slug: 'afetler', name: 'İlimizde Yaşanabilecek Afetler ve Etkileri', hedef: 'Doğal afetleri tanıma ve afetlere karşı hazırlıklı olma',
        videoId: '3F9edAIuVzI',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Doğal afet nedir?',
            secenekler: [
              'İnsanların yaptığı kazalar.',
              'Doğada kendiliğinden meydana gelen ve can-mal kaybına yol açan olaylar.',
              'Yalnızca deprem demektir.',
              'Sadece yurt dışında yaşanan olaylar.'
            ],
            dogru: 1,
            ipucu: 'Deprem, sel, heyelan, çığ gibi doğanın kendiliğinden ürettiği yıkıcı olaylardır.'
          },
          {
            saniye: 120,
            soru: 'Aşağıdakilerden hangisi doğal bir afet değildir?',
            secenekler: [
              'Deprem',
              'Sel',
              'Trafik kazası',
              'Heyelan'
            ],
            dogru: 2,
            ipucu: 'Trafik kazası insan kaynaklıdır; doğal afet doğa olaylarından kaynaklanır.'
          },
          {
            saniye: 180,
            soru: 'Deprem sırasında en güvenli hareket hangisidir?',
            secenekler: [
              'Pencereden atlamak.',
              'Asansöre binmek.',
              'Çök-kapan-tutun (sağlam masa altına sığınmak).',
              'Panikle dışarı koşmak.'
            ],
            dogru: 2,
            ipucu: '"Çök-kapan-tutun" deprem anında hayat kurtaran temel harekettir.'
          },
          {
            saniye: 240,
            soru: 'Sel afeti genellikle neden meydana gelir?',
            secenekler: [
              'Aşırı sıcaklıktan.',
              'Şiddetli ve uzun süren yağışlardan veya kar erimelerinden.',
              'Rüzgârın çok şiddetli esmesinden.',
              'Yer kabuğunun kırılmasından.'
            ],
            dogru: 1,
            ipucu: 'Sel, fazla yağış veya kar erimesiyle suların taşması sonucu oluşur.'
          },
          {
            saniye: 300,
            soru: 'Heyelan ne demektir?',
            secenekler: [
              'Deniz suyunun yükselmesidir.',
              'Toprağın ve kayaların eğimli yamaçlardan aşağı kaymasıdır.',
              'Yeraltı suyunun bitmesidir.',
              'Volkanik patlamadır.'
            ],
            dogru: 1,
            ipucu: 'Heyelan: eğimli arazide toprağın, taşın ve kayanın yer çekimiyle kaymasıdır.'
          },
          {
            saniye: 360,
            soru: 'Afetlere karşı hazırlıklı olmak için ailece ne yapılmalıdır?',
            secenekler: [
              'Hiçbir şey yapmaya gerek yoktur.',
              'Deprem çantası hazırlamak, toplanma alanını belirlemek ve tatbikat yapmak.',
              'Sadece haberleri izlemek yeterlidir.',
              'Afet olduğunda karar verilir, önceden hazırlık gereksizdir.'
            ],
            dogru: 1,
            ipucu: 'Deprem çantası + toplanma alanı + aile iletişim planı = afete hazırlık.'
          },
          {
            saniye: 420,
            soru: 'Bir deprem çantasında hangisi bulunmalıdır?',
            secenekler: [
              'Oyuncaklar ve kitaplar.',
              'Su, kuru gıda, ilk yardım malzemesi, el feneri ve düdük.',
              'Sadece para.',
              'Sadece battaniye.'
            ],
            dogru: 1,
            ipucu: 'Su, gıda, ilk yardım, fener, düdük — deprem çantasının olmazsa olmazları.'
          },
          {
            saniye: 'fin',
            soru: 'Doğal afetler konusunu doğru özetleyen hangisidir?',
            secenekler: [
              'Deprem, sel, heyelan ve çığ gibi doğal afetler can ve mal kaybına yol açar. Hazırlıklı olmak için deprem çantası hazırlanmalı, toplanma alanı bilinmeli ve tatbikatlar yapılmalıdır.',
              'Doğal afetler yalnızca tropikal bölgelerde yaşanır.',
              'Afetlere karşı hazırlık yapmak gereksizdir.',
              'Doğal afetlerin etkisini yalnızca devlet önleyebilir, bireylere düşen bir görev yoktur.'
            ],
            dogru: 0,
            ipucu: 'Afetler her yerde olabilir; bireysel hazırlık (çanta, plan, tatbikat) hayat kurtarır.'
          }
        ]
      },
      {
        slug: 'ilk-yerlesimler', name: 'Anadolu\'nun İlk Yerleşim Yerlerinde Yaşam', hedef: 'Anadolu\'daki ilk yerleşim yerlerini ve yaşam biçimlerini tanıma',
        videoId: 'b3xT-xnCXUE',
        checkpoints: [
          {
            saniye: 60,
            soru: 'İnsanlar neden göçebe yaşamdan yerleşik yaşama geçmiştir?',
            secenekler: [
              'Savaşlardan kaçmak için.',
              'Tarım yapmayı öğrenmeleri ve hayvanları evcilleştirmeleriyle birlikte.',
              'Deniz seviyesinin yükselmesi nedeniyle.',
              'Devletin emriyle.'
            ],
            dogru: 1,
            ipucu: 'Tarım ve hayvancılığın başlaması insanları bir yere bağlamış, yerleşik yaşam başlamıştır.'
          },
          {
            saniye: 120,
            soru: 'Anadolu\'daki en eski yerleşim yerlerinden biri hangisidir?',
            secenekler: [
              'İstanbul',
              'Çatalhöyük',
              'Ankara',
              'İzmir'
            ],
            dogru: 1,
            ipucu: 'Çatalhöyük (Konya), dünyada bilinen en eski yerleşim yerlerinden biridir.'
          },
          {
            saniye: 180,
            soru: 'Çatalhöyük\'te evlerin özelliği neydi?',
            secenekler: [
              'Evlerin kapısı yoktu; çatıdan girilirdi.',
              'Evler taştan çok katlı yapılırdı.',
              'Her evin büyük bir bahçesi vardı.',
              'Evler birbirinden çok uzaktı.'
            ],
            dogru: 0,
            ipucu: 'Çatalhöyük\'te evler bitişikti ve çatıdaki bir açıklıktan merdivene girilirdi.'
          },
          {
            saniye: 240,
            soru: 'İlk yerleşim yerlerinde insanlar geçimlerini nasıl sağlıyordu?',
            secenekler: [
              'Fabrikada çalışarak.',
              'Tarım, hayvancılık ve el sanatlarıyla.',
              'Madencilikle.',
              'Yalnızca balıkçılıkla.'
            ],
            dogru: 1,
            ipucu: 'Tarım (buğday, arpa), hayvancılık (koyun, keçi) ve basit el sanatları temel geçim yoluydu.'
          },
          {
            saniye: 300,
            soru: 'İlk yerleşim yerlerinde kullanılan araçlar hangi malzemeden yapılırdı?',
            secenekler: [
              'Demir ve çelik',
              'Taş, kemik ve kilden',
              'Plastik ve cam',
              'Bakır ve altın'
            ],
            dogru: 1,
            ipucu: 'İlk dönemlerde taş, kemik ve kil en çok kullanılan malzemelerdi (Taş Devri).'
          },
          {
            saniye: 360,
            soru: 'Anadolu neden ilk yerleşim için uygun bir bölgeydi?',
            secenekler: [
              'Çöl iklimi olduğu için.',
              'Verimli toprakları, ılıman iklimi ve su kaynaklarının bolluğu nedeniyle.',
              'Dağlık olduğu için düşmandan korunma sağladığından.',
              'Denizlerle çevrili olduğu için balıkçılık yapılabildiğinden.'
            ],
            dogru: 1,
            ipucu: 'Verimli toprak + su + ılıman iklim = tarıma ve yerleşime uygun ortam.'
          },
          {
            saniye: 420,
            soru: 'Göbeklitepe\'nin önemi nedir?',
            secenekler: [
              'Dünyanın en büyük şehridir.',
              'Bilinen en eski tapınak kalıntılarını barındırır (yaklaşık 12.000 yıl öncesine ait).',
              'İlk yazının burada bulunduğu düşünülmektedir.',
              'Anadolu\'nun en yeni yerleşim yeridir.'
            ],
            dogru: 1,
            ipucu: 'Göbeklitepe (Şanlıurfa), yaklaşık 12.000 yıllık tarihi ile dünyanın bilinen en eski tapınağıdır.'
          },
          {
            saniye: 'fin',
            soru: 'Anadolu\'nun ilk yerleşim yerleri konusunu doğru özetleyen hangisidir?',
            secenekler: [
              'Tarım ve hayvancılığın başlamasıyla yerleşik yaşama geçildi. Çatalhöyük ve Göbeklitepe gibi merkezler Anadolu\'nun en eski yerleşim alanlarıdır. İnsanlar taş, kemik ve kilden araçlar kullanarak geçimlerini sağlıyordu.',
              'Anadolu\'da yerleşik yaşam yalnızca 500 yıl önce başlamıştır.',
              'İlk yerleşimciler yalnızca avcılıkla geçinirdi.',
              'Anadolu\'daki ilk yerleşim yerleri yalnızca kıyı bölgelerdeydi.'
            ],
            dogru: 0,
            ipucu: 'Tarım → yerleşik yaşam. Çatalhöyük, Göbeklitepe = Anadolu\'nun en eski merkezleri.'
          }
        ]
      },
      {
        slug: 'mezopotamya', name: 'Mezopotamya ve Anadolu\'nun Ortak Kültürel Mirasa Katkıları', hedef: 'Mezopotamya ve Anadolu medeniyetlerinin kültürel mirasını tanıma',
        videoId: 'ijBw2KbL9NE',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Mezopotamya neresidir?',
            secenekler: [
              'Mısır\'daki Nil Nehri çevresidir.',
              'Dicle ve Fırat nehirleri arasındaki bölgedir (bugünkü Irak civarı).',
              'Anadolu\'nun batısıdır.',
              'Yunanistan\'daki antik şehirlerin bulunduğu bölgedir.'
            ],
            dogru: 1,
            ipucu: 'Mezopotamya = "iki nehir arası" (Dicle ve Fırat). Bugünkü Irak topraklarıdır.'
          },
          {
            saniye: 120,
            soru: 'Mezopotamya\'da hangi önemli buluş gerçekleştirilmiştir?',
            secenekler: [
              'Matbaa',
              'Yazı (çivi yazısı)',
              'Pusula',
              'Barut'
            ],
            dogru: 1,
            ipucu: 'Sümerler, tarihteki ilk yazıyı (çivi yazısı) Mezopotamya\'da geliştirmiştir.'
          },
          {
            saniye: 180,
            soru: 'Mezopotamya\'da yaşayan medeniyetlerden hangisi değildir?',
            secenekler: [
              'Sümerler',
              'Babilliler',
              'Asurlular',
              'Lidyalılar'
            ],
            dogru: 3,
            ipucu: 'Lidyalılar Anadolu\'da (bugünkü Manisa civarı) yaşamıştır, Mezopotamya\'da değil.'
          },
          {
            saniye: 240,
            soru: 'Parayı ilk kullanan medeniyet hangisidir ve nerede kurulmuştur?',
            secenekler: [
              'Sümerler — Mezopotamya\'da',
              'Lidyalılar — Anadolu\'da',
              'Mısırlılar — Afrika\'da',
              'Romalılar — Avrupa\'da'
            ],
            dogru: 1,
            ipucu: 'Lidyalılar parayı ilk kez kullanarak ticareti kolaylaştırmıştır (Anadolu, Sardes).'
          },
          {
            saniye: 300,
            soru: 'Hititler hangi alanda önemli bir ilke imza atmıştır?',
            secenekler: [
              'İlk çivi yazısını icat etmişlerdir.',
              'Tarihteki bilinen ilk yazılı antlaşmayı (Kadeş) yapmışlardır.',
              'İlk parayı basmışlardır.',
              'İlk piramitleri inşa etmişlerdir.'
            ],
            dogru: 1,
            ipucu: 'Kadeş Antlaşması (MÖ 1259), Hititler ile Mısırlılar arasında yapılan bilinen ilk yazılı barış antlaşmasıdır.'
          },
          {
            saniye: 360,
            soru: 'Anadolu ve Mezopotamya medeniyetleri insanlığa hangi katkıları sağlamıştır?',
            secenekler: [
              'Hiçbir katkıları olmamıştır.',
              'Yazı, hukuk, para, tarım, astronomi ve mimari gibi alanlarda temel buluşlar.',
              'Sadece savaş teknolojileri geliştirmişlerdir.',
              'Yalnızca sanat alanında katkı sağlamışlardır.'
            ],
            dogru: 1,
            ipucu: 'Yazı (Sümer), para (Lidya), hukuk (Babil - Hammurabi), antlaşma (Hitit) — köklü katkılar.'
          },
          {
            saniye: 420,
            soru: 'Hammurabi Kanunları\'nın önemi nedir?',
            secenekler: [
              'Tarihteki ilk yazılı kanun metnidir.',
              'Bilinen en eski ve en kapsamlı yazılı hukuk kurallarından biridir (Babil).',
              'Yalnızca ticaret kurallarını içerir.',
              'Anadolu\'da yazılmıştır.'
            ],
            dogru: 1,
            ipucu: 'Babil Kralı Hammurabi, toplum düzenini sağlamak için kapsamlı yazılı yasalar oluşturmuştur.'
          },
          {
            saniye: 'fin',
            soru: 'Mezopotamya ve Anadolu\'nun kültürel mirasını doğru özetleyen hangisidir?',
            secenekler: [
              'Mezopotamya (Sümerler: yazı, Babilliler: hukuk) ve Anadolu (Hititler: ilk yazılı antlaşma, Lidyalılar: para) medeniyetleri; yazı, hukuk, ticaret ve diplomasi alanlarında insanlığa temel katkılar sağlamıştır.',
              'Bu medeniyetler yalnızca tarımla uğraşmıştır.',
              'Anadolu medeniyetleri Mezopotamya\'dan etkilenmemiştir.',
              'Mezopotamya medeniyetleri yalnızca savaş teknolojisi geliştirmiştir.'
            ],
            dogru: 0,
            ipucu: 'Sümer = yazı, Babil = hukuk, Hitit = antlaşma, Lidya = para. Köklü miras.'
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
      },
      {
        slug: 'movies', name: 'Movies — Superlatives & Making Suggestions', hedef: 'Film türlerini ve superlative yapısını öğrenme',
        videoId: 'dUsuMGzvwtY',
        checkpoints: [
          {
            saniye: 60,
            soru: 'Which of these is a movie genre (film türü)?',
            secenekler: [
              'Comedy',
              'Library',
              'Kitchen',
              'Hospital'
            ],
            dogru: 0,
            ipucu: 'Comedy (komedi), horror (korku), action (aksiyon), animation (animasyon) — bunlar film türleridir.'
          },
          {
            saniye: 120,
            soru: '"Horror" film türü Türkçede ne anlama gelir?',
            secenekler: [
              'Komedi',
              'Korku',
              'Bilim kurgu',
              'Macera'
            ],
            dogru: 1,
            ipucu: 'Horror = korku. Horror movies korku filmleridir.'
          },
          {
            saniye: 180,
            soru: 'Superlative (en üstünlük) yapısı ne işe yarar?',
            secenekler: [
              'İki şeyi karşılaştırmak için.',
              'Üç veya daha fazla şey arasından "en" olanı belirtmek için.',
              'Bir şeyin eşit olduğunu göstermek için.',
              'Geçmiş zamandaki olayları anlatmak için.'
            ],
            dogru: 1,
            ipucu: 'Superlative = en üstünlük. "The best, the funniest, the most exciting" gibi yapılar.'
          },
          {
            saniye: 240,
            soru: '"Good" kelimesinin superlative hali hangisidir?',
            secenekler: [
              'gooder',
              'goodest',
              'the best',
              'the most good'
            ],
            dogru: 2,
            ipucu: 'Good → better → the best. Bu düzensiz (irregular) bir sıfattır.'
          },
          {
            saniye: 300,
            soru: '"This is the ___ movie I have ever seen." (Bu gördüğüm en komik film.) Boşluğa ne gelir?',
            secenekler: [
              'funnier',
              'funniest',
              'most funny',
              'more funny'
            ],
            dogru: 1,
            ipucu: 'Funny → funnier → the funniest. Kısa sıfatlarda "-est" eki superlative yapar.'
          },
          {
            saniye: 360,
            soru: '"Let\'s watch a comedy!" cümlesi ne tür bir ifadedir?',
            secenekler: [
              'Soru cümlesi',
              'Öneri (suggestion) cümlesi',
              'Emir cümlesi',
              'Olumsuz cümle'
            ],
            dogru: 1,
            ipucu: '"Let\'s..." yapısı "Hadi ...yapalım!" anlamında öneri bildirir.'
          },
          {
            saniye: 420,
            soru: 'Öneri yapmak için hangi yapı kullanılmaz?',
            secenekler: [
              'Let\'s watch a film.',
              'How about going to the cinema?',
              'Why don\'t we see a movie?',
              'I must do my homework.'
            ],
            dogru: 3,
            ipucu: '"Must" zorunluluk bildirir, öneri değildir. Let\'s / How about / Why don\'t we = öneri.'
          },
          {
            saniye: 'fin',
            soru: 'Which best summarises superlatives and making suggestions?',
            secenekler: [
              'Superlatives compare only two things; suggestions use "must".',
              'Superlatives show "the most/the -est" among three or more; suggestions use "Let\'s / How about / Why don\'t we". Irregular: good → the best, bad → the worst.',
              'Superlatives and comparatives are the same thing.',
              'Making suggestions always requires "shall" and nothing else.'
            ],
            dogru: 1,
            ipucu: 'Superlative = the -est / the most. Suggestions = Let\'s / How about / Why don\'t we.'
          }
        ]
      },
      {
        slug: 'movies-opinions', name: 'Movies — Expressing Opinions', hedef: 'Film türleri hakkında fikir belirtme',
        videoId: 'DGFgqvG5_nY',
        checkpoints: [
          {
            saniye: 60,
            soru: '"I think comedies are funny." cümlesinde "I think" ne anlama gelir?',
            secenekler: [
              'Biliyorum',
              'Bence / Düşünüyorum ki',
              'Hatırlıyorum',
              'Hayal ediyorum'
            ],
            dogru: 1,
            ipucu: '"I think" = "Bence" veya "Düşünüyorum ki". Fikir bildiren bir ifadedir.'
          },
          {
            saniye: 120,
            soru: '"What do you think about action movies?" sorusuna hangisi uygun bir cevaptır?',
            secenekler: [
              'I am 10 years old.',
              'I think they are exciting!',
              'I go to school every day.',
              'My name is Ali.'
            ],
            dogru: 1,
            ipucu: '"What do you think about...?" = "... hakkında ne düşünüyorsun?" — fikir soran soru.'
          },
          {
            saniye: 180,
            soru: '"In my opinion, animation movies are the best." cümlesindeki "in my opinion" ne demektir?',
            secenekler: [
              'Benim hatırama göre',
              'Benim fikrimce / Bana göre',
              'Benim evimde',
              'Benim öğretmenime göre'
            ],
            dogru: 1,
            ipucu: '"In my opinion" = "Bana göre / Benim fikrimce" — kişisel görüş bildiren ifade.'
          },
          {
            saniye: 240,
            soru: 'Birine film önerirken hangisini söyleyebilirsin?',
            secenekler: [
              'You should watch this movie. It\'s great!',
              'I don\'t like movies.',
              'What time is it?',
              'I have a headache.'
            ],
            dogru: 0,
            ipucu: '"You should watch..." = "İzlemelisin..." — öneri ve tavsiye bildiren yapı.'
          },
          {
            saniye: 300,
            soru: '"Scary" kelimesi hangi film türünü tanımlar?',
            secenekler: [
              'Comedy',
              'Romance',
              'Horror',
              'Animation'
            ],
            dogru: 2,
            ipucu: 'Scary = korkutucu. Korku filmleri (horror movies) scary olarak nitelendirilir.'
          },
          {
            saniye: 360,
            soru: '"I don\'t like romantic movies because they are boring." cümlesinde olumsuz fikir nasıl ifade edilmiş?',
            secenekler: [
              '"I like" ile',
              '"I don\'t like ... because ..." yapısıyla',
              '"I think" ile',
              '"Let\'s" ile'
            ],
            dogru: 1,
            ipucu: '"I don\'t like ... because ..." = "Sevmiyorum çünkü..." — olumsuz fikir + neden.'
          },
          {
            saniye: 420,
            soru: 'Film hakkında fikir belirtirken hangi sıfatlar kullanılabilir?',
            secenekler: [
              'Tall, short, thin',
              'Exciting, boring, funny, scary, interesting',
              'Hot, cold, warm',
              'Monday, Tuesday, Wednesday'
            ],
            dogru: 1,
            ipucu: 'Exciting (heyecanlı), boring (sıkıcı), funny (komik), scary (korkutucu) — film sıfatları.'
          },
          {
            saniye: 'fin',
            soru: 'Which best summarises expressing opinions about movies?',
            secenekler: [
              'We use "I think / In my opinion / I believe" to share opinions; "I like / I don\'t like ... because ..." to express preferences; and adjectives like exciting, boring, funny, scary to describe movies.',
              'Opinions can only be expressed with "I think".',
              'We never give reasons for our movie preferences.',
              'Movie opinions only use positive adjectives.'
            ],
            dogru: 0,
            ipucu: 'I think / In my opinion = fikir. I like/don\'t like ... because = tercih + neden. Sıfatlar: exciting, boring, funny, scary.'
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
