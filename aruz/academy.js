window.ARUZ_DATA = (() => {
  'use strict';

  const meters = [
    { name: 'Fâilâtün · Fâilâtün · Fâilâtün · Fâilün', short: 'Fâilâtün', pattern: 'LSLLLSLLLSLLLSL' },
    { name: 'Mefâîlün · Mefâîlün · Mefâîlün · Mefâîlün', short: 'Mefâîlün', pattern: 'SLLLSLLLSLLLSLLL' },
    { name: 'Feilâtün · Feilâtün · Feilâtün · Feilün', short: 'Feilâtün', pattern: 'SSLLSSLLSSLLSSL' },
    { name: 'Mefâîlün · Mefâîlün · Feûlün', short: 'Kısa hezec', pattern: 'SLLLSLLLSLL' },
    { name: 'Mef‘ûlü · Fâilâtü · Mefâîlü · Fâilün', short: 'Muzâri', pattern: 'LLSLSLSSLLSLSL' },
    { name: 'Mef‘ûlü · Mefâîlü · Mefâîlü · Feûlün', short: 'Hezec', pattern: 'LLSSLLSSLLSSLL' },
    { name: 'Mefâilün · Feilâtün · Mefâilün · Feilün', short: 'Müctes', pattern: 'SLSLSSLLSLSLSSL' },
    { name: 'Fâilâtün · Fâilâtün · Fâilün', short: 'Kısa remel', pattern: 'LSLLLSLLLSL' }
  ];

  const chapters = [
    {
      id: 'muhibbi', number: '01', series: 'HAYÂTÎ BEYİTLER · 14', poet: 'Muhibbî',
      theme: 'Sıhhat · devlet · kıymet', video: 'j7KkbmD8TDY', sourceName: 'MYMECRA', source: 'https://www.youtube.com/watch?v=j7KkbmD8TDY',
      lines: ['Halk içinde mu‘teber bir nesne yok devlet gibi', 'Olmaya devlet cihânda bir nefes sıhhat gibi'],
      short: 'Gerçek servet, bir nefes sıhhattir.',
      meaning: 'İnsanlar arasında makam ve iktidar değerli görünse de dünyadaki hiçbir kudret, sağlıklı alınan tek bir nefes kadar büyük değildir.',
      deep: '“Devlet” kelimesi hem iktidar hem talih ve saadet manalarını taşır; beyit aynı kelimeyi iki ayrı manada döndürür.',
      prompts: ['“Devlet” kelimesinin iki ayrı manası', 'İkinci mısradaki hüküm cümlesi', 'Okuyuşun tabiî durakları'],
      meter: 'Fâilâtün · Fâilâtün · Fâilâtün · Fâilün', pattern: 'LSLLLSLLLSLLLSL', verifiedMeter: true,
      feet: [
        { name:'Fâilâtün', syllables:[['Halk','L'],['i','S'],['çin','L'],['de','L']] },
        { name:'Fâilâtün', syllables:[['mu‘','L'],['te','S'],['ber','L'],['bir','L']] },
        { name:'Fâilâtün', syllables:[['nes','L'],['ne','S'],['yok','L'],['dev','L']] },
        { name:'Fâilün', syllables:[['let','L'],['gi','S'],['bi','L']] }
      ]
    },
    {
      id: 'fuzuli', number: '02', series: 'HAYÂTÎ BEYİTLER · 01', poet: 'Fuzûlî',
      theme: 'Su · ateş · naat', video: 'N6y3vfHNW3U', sourceName: 'MYMECRA', source: 'https://www.youtube.com/watch?v=N6y3vfHNW3U',
      lines: ['Saçma ey göz eşkden gönlümdeki odlara su', 'Kim bu denlü dutuşan odlara kılmaz çâre su'],
      short: 'Gözyaşı, gönüldeki aşk ateşini söndüremez.',
      meaning: 'Şair gözüne, gönlündeki ateşe boşuna su saçmamasını söyler; böylesine tutuşmuş bir yangına sıradan su çare olamaz.',
      deep: 'Su ve ateş tezadı yalnız bir benzetme değildir; kaside boyunca tekrar eden “su” redifi, manayı sesle birlikte taşır.',
      prompts: ['Her mısranın sonundaki “su” sesi', 'Su ile ateş arasındaki tezat', 'Hitabın “ey göz” ile başlaması'],
      meter: 'Fâilâtün · Fâilâtün · Fâilâtün · Fâilün', pattern: 'LSLLLSLLLSLLLSL', verifiedMeter: true
    },
    {
      id: 'galib', number: '03', series: 'HAYÂTÎ BEYİTLER · 06', poet: 'Şeyh Gâlib',
      theme: 'İnsan · âlem · nazar', video: 'Nw71oHsskMA', sourceName: 'MYMECRA', source: 'https://www.youtube.com/watch?v=Nw71oHsskMA',
      lines: ['Hoşça bak zâtına kim zübde-i âlemsin sen', 'Merdüm-i dîde-i ekvân olan âdemsin sen'],
      short: 'Kendine dikkatle bak; âlemin özüsün.',
      meaning: 'İnsana küçüklüğünü değil, taşıdığı büyük emaneti hatırlatır: Sen âlemin özü ve varlık gözünün bebeğisin.',
      deep: '“Merdüm” hem insan hem göz bebeği manasına gelir. Şair bu iki manayla insanı varlığın bakış merkezine yerleştirir.',
      prompts: ['“Zübde” kelimesinin hülâsa manası', '“Merdüm”ün iki manası', 'İkinci şahsa doğrudan hitap'],
      meter: 'Kalıbı şiirin bütünüyle kontrol et', pattern: 'LSLL', verifiedMeter: false
    },
    {
      id: 'nabi', number: '04', series: 'HAYÂTÎ BEYİTLER · 27', poet: 'Nâbî',
      theme: 'Edep · Medine · naat', video: '_kGbMfGy8ig', sourceName: 'MYMECRA', source: 'https://www.youtube.com/watch?v=_kGbMfGy8ig',
      lines: ['Sakın terk-i edebden kûy-ı mahbûb-ı Hudâ’dır bu', 'Nazargâh-ı ilâhîdir makâm-ı Mustafâ’dır bu'],
      short: 'Bu makamda her şeyden önce edep gerekir.',
      meaning: 'Nâbî, Medine’ye yaklaşırken okurunu uyarır: Burası Allah’ın sevgilisinin beldesi ve ilâhî nazarın yöneldiği makamdır.',
      deep: 'Beyit öğüt veren hikemî söyleyişi, mekânın kutsiyetiyle birleştirir. Emir kipindeki “sakın” bütün şiirin ahlâk tonunu kurar.',
      prompts: ['İlk kelimedeki güçlü uyarı', '“Kûy” ve “nazargâh” kelimeleri', 'İki mısradaki “bu” redifi'],
      meter: 'Kalıbı şiirin bütünü ve tarihî söyleyişle kontrol et', pattern: 'SLLL', verifiedMeter: false
    },
    {
      id: 'hayali', number: '05', series: 'HAYÂTÎ BEYİTLER · 20', poet: 'Hayâlî Bey',
      theme: 'Hakikat · deniz · idrak', video: 'xHwjt0tEm58', sourceName: 'MYMECRA', source: 'https://www.youtube.com/watch?v=xHwjt0tEm58',
      lines: ['Cihân-ârâ cihân içindedir ârâyı bilmezler', 'O mâhîler ki deryâ içredir deryâyı bilmezler'],
      short: 'İnsan, içinde yaşadığı hakikati bazen göremez.',
      meaning: 'Dünyayı süsleyen hakikat dünyanın içindedir; fakat insanlar onu fark etmez. Denizde yaşayan balığın denizi bilmemesi gibi.',
      deep: '“Cihân / cihân-ârâ” ve “deryâ / mâhî” çiftleri, görünür olanla onu mümkün kılan zemin arasındaki münasebeti kurar.',
      prompts: ['“Cihân-ârâ” terkibi', 'Balık ve deniz benzetmesi', '“Bilmezler” redifinin hükmü'],
      meter: 'Mefâîlün · Mefâîlün · Mefâîlün · Mefâîlün', pattern: 'SLLLSLLLSLLLSLLL', verifiedMeter: true
    },
    {
      id: 'yahya', number: '06', series: 'HAYÂTÎ BEYİTLER · 30', poet: 'Taşlıcalı Yahyâ',
      theme: 'Ümit · ayrılık · kemal', video: 'ei6CFXcaBx4', sourceName: 'MYMECRA', source: 'https://www.youtube.com/watch?v=ei6CFXcaBx4',
      lines: ['Handân ol gönül ki visâl ihtimâli var', 'Firkat kemâle erdi kemâlin zevâli var'],
      short: 'Ayrılık son haddine geldiyse kavuşma yakındır.',
      meaning: 'Ey gönül, sevin: Kavuşma ihtimali vardır. Ayrılık kemale ulaştı; kemale eren her şeyin bir sona erişi de vardır.',
      deep: 'Beyit “kemâl” ile “zevâl” arasındaki ses ve mana bağını kullanır; ümit, değişmenin kaçınılmazlığı üzerine kurulur.',
      prompts: ['“Handân” kelimesindeki sevinç', 'Kemâl–zevâl ses yakınlığı', 'Ayrılıktan ümide dönüş'],
      meter: 'Kalıbı şiirin bütünüyle kontrol et', pattern: 'LSLL', verifiedMeter: false
    }
  ];

  const records = [
    { id:'hb01', series:'Hayâtî Beyitler', episode:'01', title:'Türkçenin En Güzel Şiiri', poet:'Fuzûlî', theme:'Su Kasidesi · naat', desc:'Fuzûlî ve Su Kasidesi üzerinden klasik şiirin ses ve mana dünyasına giriş.', source:'https://www.youtube.com/watch?v=N6y3vfHNW3U', label:'MyMecra', quote:'Saçma ey göz eşkden gönlümdeki odlara su', sample:'Saçma ey göz eşkden gönlümdeki odlara su' },
    { id:'hb02', series:'Hayâtî Beyitler', episode:'02', title:'Bâkî’den Kalan Hoş Sadâ', poet:'Bâkî', theme:'Şairlik · kalıcılık', desc:'Bâkî adı çevresinde şiirde sesin ve kalıcı sözün izini süren bölüm.', source:'https://www.youtube.com/watch?v=xw0pKf_l4b4', label:'MyMecra' },
    { id:'hb03', series:'Hayâtî Beyitler', episode:'03', title:'Âşıkların Nefesini Kesen Bir Beyit', poet:'Nedîm', theme:'Aşk · söyleyiş', desc:'Nedîm’in söyleyiş gücünü bir beyit merkezinde dinleme durağı.', source:'https://www.youtube.com/watch?v=vzwWxhu8JO8', label:'MyMecra' },
    { id:'hb04', series:'Hayâtî Beyitler', episode:'04', title:'Kudsî Hadislerle Yazılan Şiir', poet:'Mustafa Mânevî Efendi', theme:'Naat · irfan', desc:'Mustafa Mânevî Efendi’nin naatı çevresinde kaynak ve mana münasebeti.', source:'https://www.youtube.com/watch?v=N_lyXbuJRBk', label:'MyMecra' },
    { id:'hb05', series:'Hayâtî Beyitler', episode:'05', title:'İki Dünya Saadetinin Şifresi', poet:'Yozgatlı Fennî', theme:'Hikmet · ahlâk', desc:'Yozgatlı Fennî’nin manzumesi üzerinden öğüt ve şiir dili.', source:'https://www.youtube.com/watch?v=wUfJFezeslc', label:'MyMecra' },
    { id:'hb06', series:'Hayâtî Beyitler', episode:'06', title:'Bir Mısra ile Her Şeyin Özeti', poet:'Şeyh Gâlib', theme:'İnsan · âlem', desc:'İnsanın âlemdeki yerini anlatan meşhur Şeyh Gâlib beyti.', source:'https://www.youtube.com/watch?v=Nw71oHsskMA', label:'MyMecra', quote:'Hoşça bak zâtına kim zübde-i âlemsin sen', sample:'Hoşça bak zâtına kim zübde-i âlemsin sen' },
    { id:'hb12', series:'Hayâtî Beyitler', episode:'12', title:'Kork Allah’tan Korkmayandan', poet:'Şair bilgisi belirtilmiyor', theme:'Hikmet · mesuliyet', desc:'Başlığındaki hikmet sözü üzerinden korku, vicdan ve mesuliyet teması.', source:'https://www.youtube.com/watch?v=6JITYuE7K3o', label:'MyMecra' },
    { id:'hb14', series:'Hayâtî Beyitler', episode:'14', title:'Kanuni’nin En Meşhur Beyti', poet:'Muhibbî', theme:'Sıhhat · devlet', desc:'Muhibbî mahlasıyla şiir söyleyen Kanuni’nin meşhur beyti.', source:'https://www.youtube.com/watch?v=j7KkbmD8TDY', label:'MyMecra', quote:'Halk içinde mu‘teber bir nesne yok devlet gibi', sample:'Halk içinde mu‘teber bir nesne yok devlet gibi' },
    { id:'hb17', series:'Hayâtî Beyitler', episode:'17', title:'Aşkın Üç Kahramanı Vardır', poet:'Avnî', theme:'Aşk · kahraman', desc:'Fatih Sultan Mehmed’in Avnî mahlasıyla kurduğu şiir dünyası.', source:'https://www.youtube.com/watch?v=p7XNRIKwxrM', label:'MyMecra' },
    { id:'hb19', series:'Hayâtî Beyitler', episode:'19', title:'Kibir Varken Adam Olunmaz', poet:'Muhibbî · Seydi Ali Reis', theme:'Tevazu · kanaat', desc:'Muhibbî ve Seydi Ali Reis çevresinde tevazu ile kanaat üzerine beyitler.', source:'https://www.youtube.com/watch?v=Oad_GOMurg4', label:'MyMecra' },
    { id:'hb20', series:'Hayâtî Beyitler', episode:'20', title:'Nimetin Kıymeti Elden Gidince Anlaşılır', poet:'Hayâlî Bey', theme:'Nimet · idrak', desc:'Hayâlî Bey’in meşhur cihan beyti üzerinden görmek ve fark etmek.', source:'https://www.youtube.com/watch?v=xHwjt0tEm58', label:'MyMecra', quote:'Cihân-ârâ cihân içindedir ârâyı bilmezler', sample:'Cihân ârâ cihân içindedir ârâyı bilmezler' },
    { id:'hb23', series:'Hayâtî Beyitler', episode:'23', title:'Gönül Derdi Kelâma Sığmaz', poet:'Nâbî', theme:'Gönül · kelâm', desc:'Nâbî ile gönül derdinin sözün sınırlarını aşan tarafı.', source:'https://www.youtube.com/watch?v=A0Jhy6zSGD8', label:'MyMecra' },
    { id:'hb25', series:'Hayâtî Beyitler', episode:'25', title:'Sevilmeyen Sevemez', poet:'Şair bilgisi belirtilmiyor', theme:'Tasavvufî aşk', desc:'Sevmek ve sevilmek münasebetini tasavvufî aşk ekseninde ele alan bölüm.', source:'https://www.youtube.com/watch?v=grpPw8HBEyY', label:'MyMecra' },
    { id:'hb26', series:'Hayâtî Beyitler', episode:'26', title:'Aşk Geceleri Sever, Gölgeyi Bile Kıskanır', poet:'Şeyh Gâlib · Fasîh Ahmed Dede', theme:'Aşk · gece', desc:'Şeyh Gâlib ile Fasîh Ahmed Dede arasında aşkın şiir dili.', source:'https://www.youtube.com/watch?v=QYqBBOi838s', label:'MyMecra' },
    { id:'hb27', series:'Hayâtî Beyitler', episode:'27', title:'Medine’yi Uyandıran Şiir', poet:'Nâbî', theme:'Edep · naat', desc:'Nâbî’nin “Sakın terk-i edebden” şiiri çevresinde.', source:'https://www.youtube.com/watch?v=_kGbMfGy8ig', label:'MyMecra', quote:'Sakın terk-i edebden kûy-ı mahbûb-ı Hudâ’dır bu', sample:'Sakın terk-i edebden kûy-ı mahbûb-ı Hudâdır bu' },
    { id:'hb29', series:'Hayâtî Beyitler', episode:'29', title:'Aşk mı Ticaret mi?', poet:'Ahmed Paşa · Necâtî Bey', theme:'Aşk · mukayese', desc:'Ahmed Paşa ile Necâtî Bey’in söyleyişlerini karşılaştıran bir okuma.', source:'https://www.youtube.com/watch?v=T1GqwOH5ozc', label:'MyMecra' },
    { id:'hb30', series:'Hayâtî Beyitler', episode:'30', title:'Bir Beyit, Bir Hayat: Handân Ol Gönül', poet:'Taşlıcalı Yahyâ', theme:'Ümit · ayrılık', desc:'Taşlıcalı Yahyâ’nın ayrılık içinde ümit taşıyan beyti.', source:'https://www.youtube.com/watch?v=ei6CFXcaBx4', label:'MyMecra', quote:'Handân ol gönül ki visâl ihtimâli var', sample:'Handân ol gönül ki visâl ihtimâli var' },
    { id:'hb33', series:'Hayâtî Beyitler', episode:'33', title:'Güzellere Yakışır Bir Veda', poet:'Şair bilgisi belirtilmiyor', theme:'Veda · hüsn-i hâtime', desc:'Veda ve güzel bir son fikrini klasik şiir diliyle ele alan bölüm.', source:'https://www.youtube.com/watch?v=Jb2bBu80j-w', label:'MyMecra' },
    { id:'hbrazi', series:'Hayâtî Beyitler', episode:'Seçki', title:'Ruh Vermekle, Beden Almakla Doyar', poet:'Üsküdarlı Râzî', theme:'Ruh · beden', desc:'Üsküdarlı Râzî’nin beyti çevresinde ruh ve beden tezadı.', source:'https://www.youtube.com/watch?v=Y64pv_zE4mQ', label:'MyMecra' },
    { id:'hbsaki', series:'Hayâtî Beyitler', episode:'Seçki', title:'Sâkî Dediğin Şeyhtir', poet:'Şair bilgisi belirtilmiyor', theme:'Sâkî · tasavvuf', desc:'Klasik şiirde sâkî ve aşk şarabı mazmunlarına giriş.', source:'https://www.youtube.com/watch?v=2v6rDzx-SrQ', label:'MyMecra' },
    { id:'cvp55', series:'Can Veren Pervaneler', episode:'55', title:'Nâbî', poet:'Nâbî', theme:'Hikemî şiir', desc:'Diyanet TV’nin resmî arşivinde Nâbî’ye ayrılan program.', source:'https://www.diyanet.tv/can-veren-pervaneler/video/nabi--can-veren-pervaneler-55-bolum', label:'Diyanet TV' },
    { id:'cvp56', series:'Can Veren Pervaneler', episode:'56', title:'Şeyhülislâm Yahyâ', poet:'Şeyhülislâm Yahyâ', theme:'Gazel · hikmet', desc:'Resmî program dizisinde Şeyhülislâm Yahyâ’ya ayrılan bölüm.', source:'https://www.diyanet.tv/can-veren-pervaneler/', label:'Diyanet TV' },
    { id:'cvp58', series:'Can Veren Pervaneler', episode:'58', title:'Yozgatlı Fennî', poet:'Yozgatlı Fennî', theme:'Hikmet · öğüt', desc:'Diyanet TV’nin resmî arşivinde Yozgatlı Fennî’ye ayrılan program.', source:'https://www.diyanet.tv/can-veren-pervaneler/video/yozgatli-fenni--can-veren-pervaneler-58-bolum', label:'Diyanet TV' },
    { id:'cvp60', series:'Can Veren Pervaneler', episode:'60', title:'Yahyâ Kemal Beyatlı', poet:'Yahyâ Kemal Beyatlı', theme:'Modern klasik · İstanbul', desc:'Program arşivinde Yahyâ Kemal’in şiir dünyasına ayrılan bölüm.', source:'https://www.diyanet.tv/can-veren-pervaneler/', label:'Diyanet TV' },
    { id:'cvp61', series:'Can Veren Pervaneler', episode:'61', title:'Şeyh Gâlib', poet:'Şeyh Gâlib', theme:'Sebk-i Hindî · tasavvuf', desc:'Program arşivinde Şeyh Gâlib’e ayrılan bölüm.', source:'https://www.diyanet.tv/can-veren-pervaneler/', label:'Diyanet TV' },
    { id:'cvp62', series:'Can Veren Pervaneler', episode:'62', title:'Keçecizâde İzzet Molla', poet:'Keçecizâde İzzet Molla', theme:'Şair · hayat', desc:'Program arşivinde Keçecizâde İzzet Molla’ya ayrılan bölüm.', source:'https://www.diyanet.tv/can-veren-pervaneler/', label:'Diyanet TV' },
    { id:'cvp63', series:'Can Veren Pervaneler', episode:'63', title:'Necâtî Bey', poet:'Necâtî Bey', theme:'Gazel · söyleyiş', desc:'Program arşivinde Necâtî Bey’e ayrılan bölüm.', source:'https://www.diyanet.tv/can-veren-pervaneler/', label:'Diyanet TV' },
    { id:'cvp64', series:'Can Veren Pervaneler', episode:'64', title:'Avnî', poet:'Avnî', theme:'Şair hükümdar', desc:'Program arşivinde Avnî’nin şiirlerine ayrılan bölüm.', source:'https://www.diyanet.tv/can-veren-pervaneler/', label:'Diyanet TV' },
    { id:'cvpbaki', series:'Can Veren Pervaneler', episode:'Seçki', title:'Divan Şairi Bâkî’den Beyitler', poet:'Bâkî', theme:'Kalıcılık · ses', desc:'Diyanet TV’nin resmî sayfasında Bâkî beyitlerine ayrılan seçki.', source:'https://www.diyanet.tv/can-veren-pervaneler/video/divan-sairi-bakiden-beyitler--hayati-inanc', label:'Diyanet TV' },
    { id:'cvpnaili', series:'Can Veren Pervaneler', episode:'Seçki', title:'Nâ’ilî’nin Naatından', poet:'Nâ’ilî', theme:'Naat · söyleyiş', desc:'Diyanet TV’nin resmî sayfasında Nâ’ilî’nin naatından beyitler.', source:'https://www.diyanet.tv/can-veren-pervaneler/video/na-il%C3%AE-%E2%80%98nin-naatindan', label:'Diyanet TV' }
  ];

  return { meters, chapters, records };
})();
