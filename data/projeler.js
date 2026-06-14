/**
 * Tek kaynak proje manifest'i + kategori meta.
 * Tum sayfalarda proje listesi, sayac ve kart icin bu dosya kullanilir.
 * Son guncelleme: 2026-05-26
 */
var PROJELER = [
  { emoji: '\u{1F9E0}', title: 'NöroTerbiye', desc: 'Neden hep aynı hataları tekrarlıyoruz? Beynindeki düşmanı tanı, nefsinle yüzleş. Testler, oyunlar ve araçlarla dolu kitabın dijital dünyası.', tag: 'Uygulama', href: '/noroterbiye/', kategori: 'noroterbiye', featured: true },
  { emoji: '\u{1F4DA}', title: 'MUALLİMO — Resim Kartları', desc: 'Çocuğunuza bir kitap okutun, 2.199 görsel kartla pekiştirsin. 24 kitap, 6 seri — her yaşa göre.', tag: 'Uygulama', href: '/muallimo/', kategori: 'dil', featured: true },
  { emoji: '\u{1F1EC}\u{1F1E7}', title: 'İngilizce Kelime Kartları', desc: 'Görselle öğren, sesle pekiştir. Günlük hayattan 238 kelime, 9 kategoride. Küçükler için biçilmiş kaftan.', tag: 'Uygulama', href: '/ingilizce-kelime/', kategori: 'dil' },
  { emoji: '\u{1F1F8}\u{1F1E6}', title: 'Arapça Kelime Kartları', desc: 'Selam vermekten alışveriş yapmaya — günlük Arapça\'nın 224 kelimesi. Görsel, ses ve Türkçe karşılığıyla.', tag: 'Uygulama', href: '/arapca-kelime/', kategori: 'dil' },
  { emoji: '\u{1F4DC}', title: 'Osmanlıca Lügat', desc: 'Dedenin dilini keşfet. 454 Osmanlıca terim, hat görselleriyle hayat buluyor. Arayıp bul, öğrenip sınan.', tag: 'Uygulama', href: '/osmanlica/', kategori: 'dil', featured: true },
  { emoji: '\u{1F9ED}', title: 'Kalbinin Haritası', desc: 'Kibir mi, sabır mı, ihlas mı? 17 farklı testle iç dünyana ayna tut. Yapay zeka destekli nefs muhasebesi.', tag: 'Uygulama', href: '/kalbinin-haritasi/', kategori: 'dusunce', featured: true },
  { emoji: '\u{1F9ED}', title: 'Meslek Pusulası', desc: 'Liseliler için karakter ve meslek uyumu keşfi. RIASEC + Beş Faktör çerçevesiyle bölüm önerileri, konuşma özeti ve rehber soruları.', tag: 'Uygulama', href: '/meslek-pusulasi/', kategori: 'dusunce', featured: true },
  { emoji: '\u{1F54C}', title: 'Özbekistan Evliyaları ve Âlimleri', desc: 'Buhara, Semerkant, Taşkent... 12 asırda yetişen 55 âlimin izini harita üzerinde sür.', tag: 'Ansiklopedi', href: '/evliyalar/', kategori: 'tarih' },
  { emoji: '\u{1F0CF}', title: 'Osmanlı Padişahları Kart Seti', desc: '623 yıllık imparatorluğun 36 padişahını tanı. Quiz, eşleştirme ve ipucuyla tahmin — tarih hiç bu kadar eğlenceli olmamıştı.', tag: 'Oyun', href: '/osmanli-kartlari/', kategori: 'tarih' },
  { emoji: '\u{1F31F}', title: 'İslam Bilim Yıldızları', desc: 'Cebirin babası kim? İlk hastaneyi kim kurdu? 85 âlimin keşiflerini oyunlarla öğren.', tag: 'Oyun', href: '/islam-bilim-yildizlari/', kategori: 'tarih' },
  { emoji: '\u{1F52C}', title: 'Bilim Nedir, Ne Değildir?', desc: 'Bilim her şeyi açıklayabilir mi? Sınırları nerede başlıyor? 64 slaytlık felsefi bir yolculuk.', tag: 'Sunum', href: '/sunumlar/bilim/', kategori: 'dusunce' },
  { emoji: '\u{1F575}\u{FE0F}', title: 'Safsata Dedektifi', desc: 'Tartışmalarda kullanılan 13 mantık tuzağını öğren. Gerçek diyaloglarda dedektif gibi tespit et.', tag: 'Sunum', href: '/sunumlar/safsatalar/', kategori: 'dusunce' },
  { emoji: '\u{1F3AE}', title: 'İHO 7. Sınıf Arapça Oyunları', desc: 'Arapça dersi sıkıcı olmak zorunda değil. 29 oyunla kelime, cümle ve gramer — sınıfça yarışın!', tag: 'Oyun', href: '/iho-oyunlar/', kategori: 'sinif' },
  { emoji: '\u{1F916}', title: 'Yapay Zekâ Araç Atlası', desc: 'Hangi YZ aracı ne işe yarar? 32 aracı karşılaştır, ihtiyacına göre seç. Üstelik çoğu ücretsiz.', tag: 'Rehber', href: '/ai-atlasi/', kategori: 'ai', featured: true },
  { emoji: '\u{1F9EC}', title: 'Beyin ↔ Yapay Zekâ', desc: 'İnsan beyni ile yapay zekâ arasındaki şaşırtıcı benzerlikler. 50 paralel keşif, 120 yıllık bir hikâye.', tag: 'Ansiklopedi', href: '/beyin-ve-yapay-zeka/', kategori: 'ai' },
  { emoji: '\u{262A}\u{FE0F}', title: 'Sevgili Peygamberim', desc: 'O\'nun hayatını hiç bu kadar yakından okumadınız. 72 bölüm, interaktif harita, kişi kartları ve quizlerle dolu bir yolculuk.', tag: 'Ansiklopedi', href: '/sevgili-peygamberim/', kategori: 'peygamberim', featured: true },
  { emoji: '\u{2709}\u{FE0F}', title: 'Davet Mektubu', desc: 'Ateist bir mühendise ne yazarsın? Agnostik bir doktora? 27 mesleğe özel, düşündürücü mektuplar.', tag: 'Uygulama', href: 'https://davetmektubu.com/', external: true, kategori: 'dusunce' },
  { emoji: '\u{1F3F9}', title: 'Kayı I — Ertuğrul\'un Ocağı', desc: 'Bir uç beyliğinden cihan devletine — Osmanlı\'nın kuruluş destanını kişiler, olaylar ve haritalarla keşfet.', tag: 'Ansiklopedi', href: '/kayi/', kategori: 'tarih' },
  { emoji: '\u{1F331}', title: 'İyilik Akademi', desc: 'Çocuklara güzel ahlakı nasıl öğretirsin? 40 derslik interaktif bir yolculukla — oyunlaştırılmış, quizlerle dolu.', tag: 'Uygulama', href: '/iyilikakademi/', kategori: 'peygamberim' },
  { emoji: '\u{1F4D6}', title: 'Program Rehberim', desc: 'Öğretmen el kitabı: Haftalık plan, ders akışı, 202 materyal, teknikler ve ölçme araçları. Maarif Modeli entegre.', tag: 'Rehber', href: '/maarif/#/rehber', kategori: 'sinif', featured: true }
];

var SINIF_ARACLARI = [];

var PROJE_SAYISI = PROJELER.length;

/**
 * Vitrin kategorileri — bento kartlarinin baglandigi tematik gruplar.
 * Her kategori /vitrin/[slug]/ adresinde acilir.
 */
var KATEGORILER = [
  { slug: 'noroterbiye', name: 'NöroTerbiye',         desc: 'İçindeki düşmanı dosta çevir.',                          renk: 'noroterbiye', boyut: 'tall' },
  { slug: 'dil',         name: 'Dil & Söz',           desc: 'İngilizce, Arapça ve Osmanlıca için kart setleri.',     renk: 'dil',         boyut: 'wide' },
  { slug: 'peygamberim', name: 'Peygamberim & Ahlâk', desc: 'Siyer atlası ve çocuk ahlâk müfredatı.',                renk: 'peygamberim', boyut: 'med'  },
  { slug: 'tarih',       name: 'Tarih & Medeniyet',   desc: 'Padişahlar, evliyalar, âlimler ve kuruluş destanları.', renk: 'tarih',       boyut: 'wide' },
  { slug: 'dusunce',     name: 'Düşünce Pusulası',    desc: 'Test, mantık, bilim felsefesi ve davet mektupları.',    renk: 'dusunce',     boyut: 'tall' },
  { slug: 'ai',          name: 'Yapay Zekâ',          desc: 'Araç atlası ve beyin–YZ paralelleri.',                  renk: 'ai',          boyut: 'wide' },
  { slug: 'sinif',       name: 'Sınıf Atölyesi',      desc: 'İHO Arapça oyunları ve Maarif rehberi.',                renk: 'sinif',       boyut: 'wide' }
];

/** Kategori slug'ından projeleri döndürür. */
function kategoriProjeleri(slug) {
  return PROJELER.filter(function(p) { return p.kategori === slug; });
}
