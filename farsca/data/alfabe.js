/* ============================================================
   Alfabe — Farsca'ya ozgu harfler ve okunuş kurallari
   Kur'an okuyan biri icin sadece 4 ek harf + farklar
   ============================================================ */
const ALFABE_DATA = {
  /* 4 Farsca'ya ozgu harf */
  harfler: [
    {
      harf: 'پ',
      isim: 'Pe',
      ses: 'p',
      aciklama: 'Turkce "p" sesi. Arapca\'da bulunmaz.',
      ornekler: [
        { kelime: 'پدر', okunuş: 'peder', anlam: 'baba' },
        { kelime: 'پنج', okunuş: 'penj', anlam: 'bes' },
        { kelime: 'پول', okunuş: 'pul', anlam: 'para' },
        { kelime: 'پسر', okunuş: 'pesar', anlam: 'ogul/erkek cocuk' },
        { kelime: 'پیراهن', okunuş: 'pirâhen', anlam: 'gomlek' }
      ],
      baslangic: 'پـ',
      orta: 'ـپـ',
      son: 'ـپ'
    },
    {
      harf: 'چ',
      isim: 'Ce',
      ses: 'c (Turkce c)',
      aciklama: 'Turkce "c" sesi. Arapca\'da bulunmaz. Turkce ile ayni.',
      ornekler: [
        { kelime: 'چای', okunuş: 'çây', anlam: 'cay' },
        { kelime: 'چشم', okunuş: 'ceşm', anlam: 'goz' },
        { kelime: 'چهار', okunuş: 'cehâr', anlam: 'dort' },
        { kelime: 'چرا', okunuş: 'cerâ', anlam: 'neden' },
        { kelime: 'چیز', okunuş: 'çiz', anlam: 'sey' }
      ],
      baslangic: 'چـ',
      orta: 'ـچـ',
      son: 'ـچ'
    },
    {
      harf: 'ژ',
      isim: 'Je',
      ses: 'j (Turkce j)',
      aciklama: 'Turkce "j" sesi (jurnal\'daki gibi). Arapca\'da bulunmaz.',
      ornekler: [
        { kelime: 'ژاپن', okunuş: 'jâpon', anlam: 'Japonya' },
        { kelime: 'ژاله', okunuş: 'jâle', anlam: 'cicek' },
        { kelime: 'ژنرال', okunuş: 'jenerâl', anlam: 'general' },
        { kelime: 'گاراژ', okunuş: 'gârâj', anlam: 'garaj' },
        { kelime: 'بژ', okunuş: 'bej', anlam: 'bej rengi' }
      ],
      baslangic: 'ژ',
      orta: 'ـژ',
      son: 'ـژ'
    },
    {
      harf: 'گ',
      isim: 'Gaf',
      ses: 'g (sert g)',
      aciklama: 'Turkce sert "g" sesi. Arapca\'da bulunmaz. ک\'den bir cizgi fazlasiyla ayirt edilir.',
      ornekler: [
        { kelime: 'گل', okunuş: 'gol', anlam: 'gul/cicek' },
        { kelime: 'گفت', okunuş: 'goft', anlam: 'dedi' },
        { kelime: 'بزرگ', okunuş: 'bozorg', anlam: 'buyuk' },
        { kelime: 'گوش', okunuş: 'guş', anlam: 'kulak' },
        { kelime: 'گربه', okunuş: 'gorbe', anlam: 'kedi' }
      ],
      baslangic: 'گـ',
      orta: 'ـگـ',
      son: 'ـگ'
    }
  ],

  /* Okunuş kurallari — Arapca bilen icin farklar */
  okunusKurallari: [
    {
      baslik: 'Sesli Harfler',
      ikon: '🔤',
      aciklama: 'Farsca\'da 6 sesli harf vardir. Arapca\'dan farkli olarak harekeler genelde yazilmaz, kelimeleri okuyarak ogrenirsiniz.',
      detaylar: [
        { kural: 'اَ → a (kisa)', ornek: 'بَد → bed (kotu)', not: 'Arapca fethaya benzer ama daha kapalı "e" ye yakın' },
        { kural: 'اِ → e (kisa)', ornek: 'دِل → del (gonul)', not: 'Arapca kesra gibi' },
        { kural: 'اُ → o (kisa)', ornek: 'گُل → gol (gul)', not: 'Arapca dammeden farkli: "u" degil "o"' },
        { kural: 'آ / ا → â (uzun a)', ornek: 'آب → âb (su)', not: 'Turkce "a" nin uzunu' },
        { kural: 'ی → i (uzun)', ornek: 'شیر → şir (sut/aslan)', not: 'Arapca "ya" harfi' },
        { kural: 'و → u (uzun)', ornek: 'دور → dur (uzak)', not: 'Arapca "vav" harfi' }
      ]
    },
    {
      baslik: 'Ezafe Yapisi',
      ikon: '🔗',
      aciklama: 'Farsca\'nin en onemli gramer ozelliklerinden biri. Iki kelimeyi birbirine baglar. Kesra (ِ) ile gosterilir ama genelde yazilmaz.',
      detaylar: [
        { kural: 'İsim + -e + Sifat', ornek: 'کتابِ بزرگ → ketâb-e bozorg (buyuk kitap)', not: '' },
        { kural: 'İsim + -e + İsim (aitlik)', ornek: 'کتابِ من → ketâb-e man (benim kitabim)', not: '' },
        { kural: 'ه ile biten kelimeler: -ye', ornek: 'خانه‌یِ ما → hâne-ye mâ (bizim evimiz)', not: '\'ye\' eklenir' },
        { kural: 'ی ile biten kelimeler: -ye', ornek: 'صندلی‌یِ چوبی → sandali-ye çubi (tahta sandalye)', not: '' }
      ]
    },
    {
      baslik: 'Arapca\'dan Farkli Okunan Harfler',
      ikon: '⚠️',
      aciklama: 'Bazi harfler Farsca\'da Arapca\'dan farkli okunur.',
      detaylar: [
        { kural: 'ث → s (se degil)', ornek: 'ثروت → servat (servet)', not: 'Arapca "se" → Farsca "s"' },
        { kural: 'ذ → z', ornek: 'ذکر → zekr (zikir)', not: 'Arapca "zel" → Farsca "z"' },
        { kural: 'ص → s', ornek: 'صبر → sabr (sabir)', not: 'Arapca kalin "sad" → Farsca duz "s"' },
        { kural: 'ض → z', ornek: 'ضرر → zarar (zarar)', not: 'Arapca "dad" → Farsca "z"' },
        { kural: 'ط → t', ornek: 'طلا → talâ (altin)', not: 'Arapca kalin "ta" → Farsca duz "t"' },
        { kural: 'ظ → z', ornek: 'ظلم → zolm (zulum)', not: 'Arapca "za" → Farsca "z"' },
        { kural: 'ع → hicbir ses / a', ornek: 'علم → elm (ilim)', not: 'Arapca\'daki bogazdan gelen ses yok' },
        { kural: 'و bazen sessiz', ornek: 'خواب → hâb (uyku)', not: 'خوا → hâ okunur (vav sessiz)' }
      ]
    },
    {
      baslik: 'Ozel Okunuş Kurallari',
      ikon: '📖',
      aciklama: 'Farsca\'ya ozgu bazi okunuş kurallari.',
      detaylar: [
        { kural: 'خوا → hâ', ornek: 'خواهر → hâher (kiz kardes)', not: 'و okunmaz' },
        { kural: 'خوی → hoy/huy', ornek: 'خویش → hiş (kendi)', not: '' },
        { kural: 'Kelime sonu ه → e/he', ornek: 'خانه → hâne (ev)', not: 'Bazen "e" bazen "he"' },
        { kural: 'ی kelime sonunda → i/â', ornek: 'ایرانی → irâni (İranli)', not: 'Nisbet ya\'si' },
        { kural: 'و kelime basinda → va/vo', ornek: 'ولی → vali (ama)', not: '' },
        { kural: 'Nim-fasile (‌)', ornek: 'می‌روم → mi-revem', not: 'Yarim bosluk, Farsca\'ya ozgu' }
      ]
    }
  ],

  /* Sayilar 0-100 */
  sayilar: [
    { sayi: 0, farsca: 'صفر', okunuş: 'sefr' },
    { sayi: 1, farsca: 'یک', okunuş: 'yek' },
    { sayi: 2, farsca: 'دو', okunuş: 'do' },
    { sayi: 3, farsca: 'سه', okunuş: 'se' },
    { sayi: 4, farsca: 'چهار', okunuş: 'cehâr' },
    { sayi: 5, farsca: 'پنج', okunuş: 'penj' },
    { sayi: 6, farsca: 'شش', okunuş: 'şeş' },
    { sayi: 7, farsca: 'هفت', okunuş: 'heft' },
    { sayi: 8, farsca: 'هشت', okunuş: 'heşt' },
    { sayi: 9, farsca: 'نه', okunuş: 'noh' },
    { sayi: 10, farsca: 'ده', okunuş: 'deh' },
    { sayi: 11, farsca: 'یازده', okunuş: 'yâzdeh' },
    { sayi: 12, farsca: 'دوازده', okunuş: 'devâzdeh' },
    { sayi: 13, farsca: 'سیزده', okunuş: 'sizdeh' },
    { sayi: 14, farsca: 'چهارده', okunuş: 'cehârdeh' },
    { sayi: 15, farsca: 'پانزده', okunuş: 'pânzdeh' },
    { sayi: 16, farsca: 'شانزده', okunuş: 'şânzdeh' },
    { sayi: 17, farsca: 'هفده', okunuş: 'hefdeh' },
    { sayi: 18, farsca: 'هجده', okunuş: 'hejdeh' },
    { sayi: 19, farsca: 'نوزده', okunuş: 'nuzdeh' },
    { sayi: 20, farsca: 'بیست', okunuş: 'bist' },
    { sayi: 30, farsca: 'سی', okunuş: 'si' },
    { sayi: 40, farsca: 'چهل', okunuş: 'cehel' },
    { sayi: 50, farsca: 'پنجاه', okunuş: 'pencâh' },
    { sayi: 60, farsca: 'شصت', okunuş: 'şast' },
    { sayi: 70, farsca: 'هفتاد', okunuş: 'heftâd' },
    { sayi: 80, farsca: 'هشتاد', okunuş: 'heştâd' },
    { sayi: 90, farsca: 'نود', okunuş: 'navad' },
    { sayi: 100, farsca: 'صد', okunuş: 'sad' },
    { sayi: 1000, farsca: 'هزار', okunuş: 'hezâr' }
  ]
};
