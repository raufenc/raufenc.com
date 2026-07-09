/* ============================================================
   İÇERİK PAKETİ — İslâmî Simgeler (demo).
   Motor bu paketi ?paket=islami-simgeler ile yükler.
   KLON üretmek için: bu dosyayı kopyala → icerik/<yeni-ad>.js,
   ogeler[] listesini değiştir, görselleri varliklar/<yeni-ad>/ altına koy.
   ============================================================ */
window.PAKET = {
  meta: {
    id: "islami-simgeler",
    ad: "İslâmî Simgeler",
    altBaslik: "Görsel Dikkat Oyunu",
    ders: "Din Kültürü ve Ahlâk Bilgisi",
    sinif: "4-8",
    unite: "Simgeler ve Kavramlar",
    surum: "1.0.0",

    kok: "varliklar/islami-simgeler/",   // görsel yolu ön eki
    hedefKelime: "BAK BAK",              // kazanmak için toplanacak harfler (boşluk = ayraç)
    soruModu: "bilgi",                   // bilgi | resim | kelime | karisik

    // Zorluk rampası: her tur bir sonraki seviyeyi kullanır, sonuncuda sabitlenir.
    // adet = ızgaradaki kutu sayısı (sütun = √adet yukarı yuvarlanır).
    seviyeler: [
      { adet: 9 }, { adet: 12 }, { adet: 16 }, { adet: 20 }, { adet: 25 }, { adet: 30 }
    ]
  },

  // 9 kart — her biri: id, ad (TR), arapca, gorsel (SVG), emoji (yedek),
  //   bilgi = "Bilgi kartı"nda görünen ipucu/tanım (adı SÖYLEMEDEN tarif eder → çocuk bulur)
  ogeler: [
    { id: "cami",    ad: "Cami",           arapca: "مَسْجِد",     gorsel: "cami.svg",    emoji: "🕌",
      bilgi: "Müslümanların topluca namaz kıldığı, kubbeli ve minareli ibadet yeri." },
    { id: "kabe",    ad: "Kâbe",           arapca: "اَلْكَعْبَة",  gorsel: "kabe.svg",    emoji: "🕋",
      bilgi: "Mekke'de bulunan, namazda yöneldiğimiz (kıblemiz) kutsal küp yapı." },
    { id: "kuran",   ad: "Kur'ân-ı Kerîm", arapca: "اَلْقُرْآن",   gorsel: "kuran.svg",   emoji: "📖",
      bilgi: "Yüce Allah'ın Peygamberimize gönderdiği kutsal kitabımız; rahle üstünde açık durur." },
    { id: "hilal",   ad: "Hilâl ve Yıldız", arapca: "اَلْهِلَال",  gorsel: "hilal.svg",   emoji: "☪️",
      bilgi: "Ramazan'ın ve bayramın gelişini müjdeleyen, gökteki incecik ay ile yıldız." },
    { id: "tesbih",  ad: "Tesbih",         arapca: "اَلْمِسْبَحَة", gorsel: "tesbih.svg",  emoji: "📿",
      bilgi: "Zikir (sübhânallah) çekerken tanelerini birer birer kaydırdığımız araç." },
    { id: "kandil",  ad: "Kandil",         arapca: "اَلْقِنْدِيل", gorsel: "kandil.svg",  emoji: "🪔",
      bilgi: "İçinde yağ yanan eski aydınlatma; mübarek gecelere de bu adı veririz." },
    { id: "seccade", ad: "Seccâde",        arapca: "اَلسَّجَّادَة", gorsel: "seccade.svg", emoji: "🧎",
      bilgi: "Üzerinde namaz kıldığımız, ucunda mihrap deseni olan küçük yaygı." },
    { id: "minare",  ad: "Minâre",         arapca: "اَلْمِئْذَنَة", gorsel: "minare.svg",  emoji: "🗼",
      bilgi: "Müezzinin çıkıp ezan okuduğu, ince uzun, şerefeli kule." },
    { id: "ibrik",   ad: "İbrik",          arapca: "اَلْإِبْرِيق", gorsel: "ibrik.svg",   emoji: "🏺",
      bilgi: "Abdest alırken içindeki suyu döktüğümüz, emzikli ve kulplu su kabı." }
  ]
};
