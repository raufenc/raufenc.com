/* ============================================================
   DOKUZ TİP MİZAÇ TESTİ — İÇERİK MOTORU
   data.js  ·  Rauf Enç  ·  raufenc.com/mizac
   ------------------------------------------------------------
   DTMM (Dokuz Tip Mizaç Modeli) / Enneagram temelli, seküler
   ve reflektif bir mizaç çerçevesi. Mistik / falcı dil yoktur;
   mizaç "doğuştan gelen, değişmeyen huy çekirdeği" olarak ele
   alınır. Tutku/erdem, nefs terbiyesi diliyle reflektif sunulur.
   Bu bir teşhis değil; kendini tanımak için bir aynadır.
   ============================================================ */

/* ── ÜÇ MERKEZ (TRİAD) ───────────────────────────────────── */
var MERKEZLER = {
  beden: {
    ad: 'Beden Merkezi',
    altAd: 'İçgüdü · Hareket',
    tipler: [8, 9, 1],
    duygu: 'Öfke',
    renk: '#c0703a',
    aciklama: 'Dünyayı bedensel sezgi ve içgüdüyle okur; asıl mesele otonomi, sınır ve kontroldür. Çekirdek duygusu öfkedir — ama her tip onunla farklı baş eder: Tip 1 içe bastırır, Tip 9 uyuşturup örtbas eder, Tip 8 doğrudan dışa vurur.'
  },
  kalp: {
    ad: 'Kalp Merkezi',
    altAd: 'Duygu · İlişki',
    tipler: [2, 3, 4],
    duygu: 'Utanç',
    renk: '#d65f86',
    aciklama: 'Dünyayı duygular ve ilişkiler üzerinden okur; asıl mesele kimlik, değer ve imajdır. Çekirdek duygusu utançtır — Tip 2 başkasına dönüp örter, Tip 3 başarıyla saklar, Tip 4 içine dönüp derinden yaşar.'
  },
  zihin: {
    ad: 'Zihin Merkezi',
    altAd: 'Düşünce · Analiz',
    tipler: [5, 6, 7],
    duygu: 'Korku',
    renk: '#4f6dbf',
    aciklama: 'Dünyayı zihin, plan ve analizle okur; asıl mesele güvenlik ve zihinsel berraklıktır. Çekirdek duygusu korkudur — Tip 5 geri çekilerek, Tip 6 tedbir ve sorgulamayla, Tip 7 olumluya kaçarak baş eder.'
  }
};

/* ── ENNEAGRAM GEOMETRİSİ ────────────────────────────────── */
/* Gelişim (entegrasyon) ve stres (dezentegrasyon) okları */
var OKLAR = {
  gelisim: { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 },
  stres:   { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 }
};
/* Kanatlar (komşu tipler) */
var KANATLAR = {
  1: [9, 2], 2: [1, 3], 3: [2, 4], 4: [3, 5], 5: [4, 6],
  6: [5, 7], 7: [6, 8], 8: [7, 9], 9: [8, 1]
};

/* Minimalist çizgi-ikon yolları (viewBox 0 0 24 24, stroke) */
var GLYPH = {
  1: '<path d="M12 3v15M7 20h10"/><path d="M12 7 5.5 9.5M12 7l6.5 2.5"/><path d="M3 13a2.5 2.5 0 0 0 5 0l-2.5-3.5z"/><path d="M16 13a2.5 2.5 0 0 0 5 0l-2.5-3.5z"/>',
  2: '<path d="M12 20S4.5 15.5 4.5 10.2A3.7 3.7 0 0 1 12 7a3.7 3.7 0 0 1 7.5 3.2C19.5 15.5 12 20 12 20z"/>',
  3: '<path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.7 6.8 19.5l1-5.8L3.5 9.6l5.9-.8z"/>',
  4: '<path d="M12 3l5.5 5.5L12 21 6.5 8.5z"/><path d="M6.5 8.5h11"/>',
  5: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l4.5 4.5"/>',
  6: '<path d="M12 3l7 2.8v5.2c0 4.9-3.4 8-7 10-3.6-2-7-5.1-7-10V5.8z"/>',
  7: '<circle cx="12" cy="12" r="8.2"/><path d="M15.5 8.5 11.8 13l-3.3 2.5 2.3-4.5z"/>',
  8: '<path d="M3 19.5h18L13.8 6 10.8 11 8.6 8z"/>',
  9: '<path d="M5 19.5C5 11.2 11.2 5 19.5 5c0 8.3-6.2 14.5-14.5 14.5z"/><path d="M9.5 15c.8-1.1 2.4-2.4 5-3.2"/>'
};

/* ── DOKUZ MİZAÇ TİPİ ────────────────────────────────────── */
/* renkText    : açık temada vurgu metni rengi (AA, açık zeminde)
   renkTextDark: koyu temada vurgu metni rengi (AA, koyu zeminde) */
var TIPLER = {
  1: {
    no: 1, ad: 'Mükemmeliyetçi', unvan: 'İlkeli Islahatçı',
    renk: '#2a9d8f', renkSoft: 'rgba(42,157,143,.14)', renkText: '#1e7a6f', renkTextDark: '#5fd0c0',
    merkez: 'beden',
    ozet: 'Doğru, düzenli ve ilkeli olmaya adanmış; her şeyin "olması gerektiği gibi" olmasını ister.',
    temelArzu: 'İyi, dürüst ve dengeli olmak; bir bütünlük ve doğruluk duygusuna sahip olmak.',
    temelKorku: 'Bozuk, kusurlu, ahlaken yanlış ya da yozlaşmış olmak.',
    motivasyon: 'Haklı olmak, her şeyi iyileştirmek, ilkeleriyle tutarlı kalmak ve eleştirinin ötesinde olmak ister. İçinde sürekli değerlendiren bir "iç eleştirmen" taşır.',
    tutku: 'Öfke (içe bastırılmış)', erdem: 'Sabır / Sükûnet',
    golge: 'Hatasız olma baskısı içte birikmiş bir kızgınlığa dönüşebilir; "doğru tek yol benimki" katılığına kapılır.',
    gucluYonler: ['Yüksek dürüstlük ve adalet duygusu', 'Disiplin, sorumluluk, güvenilirlik', 'Detaya ve kaliteye gösterilen özen', 'İlkelerinden taviz vermeyen tutarlılık', 'Bir şeyi daha iyiye taşıma becerisi'],
    zorluklar: ['Aşırı eleştirellik (önce kendine)', 'Esneklik ve hata payı tanımakta zorlanma', 'Bastırılmış öfke ve gerginlik', 'Siyah-beyaz, "doğru-yanlış" katılığı', 'Rahatlamayı, oyunu erteleme'],
    stres: { hedef: 4, metin: 'Stres altında Tip 4\'e kayar: içe kapanır, kendini yetersiz ve anlaşılmamış hisseder, melankoliye ve duygusal dalgalanmaya açılır.' },
    gelisim: { hedef: 7, metin: 'Geliştiğinde Tip 7\'nin neşesini alır: katılığı bırakır, hayatın spontane ve keyifli yanına açılır, "yeterince iyi"yi kabullenir.' },
    iliskiler: 'İlişkide sadık, dürüst ve adanmıştır; ama beklentileri yüksektir ve eleştirisi sevdiğini incitebilir. Sıcaklık, kendine ve karşısındakine "kusurlu olmak da insanca" diyebildiğinde gelir.',
    is: 'Kalite, etik ve düzen gerektiren işlerde parlar: eğitim, hukuk, denetim, editörlük, sağlık, mühendislik. Süreçleri iyileştirir, standardı yükseltir.',
    buyume: ['İç eleştirmenin sesini fark et; onu bir düşman değil, dindirilecek bir alışkanlık olarak gör.', '"Mükemmel" yerine "yeterince iyi"yi bilinçli olarak seç.', 'Öfkeni bastırmak yerine sağlıklı yollarla ifade et.', 'Kendine de başkalarına tanıdığın hata payını tanı; oyuna ve dinlenmeye izin ver.'],
    roller: 'Öğretmen, hâkim, kalite denetçisi, editör, reformcu, zanaatkâr'
  },
  2: {
    no: 2, ad: 'Yardımsever', unvan: 'Şefkatli Veren',
    renk: '#ef6f81', renkSoft: 'rgba(239,111,129,.14)', renkText: '#d4566c', renkTextDark: '#f4909e',
    merkez: 'kalp',
    ozet: 'Başkalarının ihtiyacına duyarlı, sıcak ve verici; sevgi ve yakınlık üzerinden var olur.',
    temelArzu: 'Sevilmek, istenmek ve başkalarının hayatında gerekli, kıymetli biri olmak.',
    temelKorku: 'Sevilmeye değmemek, istenmemek, bir başına ve ihtiyaç dışı kalmak.',
    motivasyon: 'Sevgiyi vererek kazanmaya çalışır; başkalarının ihtiyacını sezer, koşar, yardım eder. Kendi ihtiyaçlarını ise çoğu zaman görmezden gelir.',
    tutku: 'Gurur (vermenin gururu)', erdem: 'Alçakgönüllülük',
    golge: 'Verirken sessiz bir karşılık beklentisi gizlenir; "ben olmasam" duygusu ve bastırılmış ihtiyaçlar zamanla kırgınlığa döner.',
    gucluYonler: ['Sıcaklık, şefkat ve empati', 'Başkalarının ihtiyacını sezme becerisi', 'Cömertlik ve fedakârlık', 'İlişki kurma ve insanları bir araya getirme', 'Destekleyici, kucaklayıcı varlık'],
    zorluklar: ['Kendi ihtiyaçlarını görmezden gelme', 'Onaya ve sevgiye aşırı bağımlılık', 'Sınır koymakta zorlanma', 'Karşılık görmeyince kırgınlık', 'Dolaylı yoldan ihtiyaç belli etme'],
    stres: { hedef: 8, metin: 'Stres altında Tip 8\'e kayar: bastırdığı öfke patlar, talepkâr ve kontrolcü olur, "bunca verdim, hani karşılığı?" der.' },
    gelisim: { hedef: 4, metin: 'Geliştiğinde Tip 4\'ün içe dönüşünü alır: kendi duygu ve ihtiyaçlarını sahiplenir, karşılık beklemeden, kendini de doyurarak sevmeyi öğrenir.' },
    iliskiler: 'İlişkilerin kalbidir: besler, sarmalar, hatırlar. Peki ya "kendini unutma" eğilimi dengesiz bir verişe dönüştüğünde? Sağlık, "almaya" da izin verdiğinde gelir.',
    is: 'İnsanla temas eden alanlarda parlar: rehberlik, hemşirelik, öğretmenlik, sosyal hizmet, insan kaynakları, gönüllülük. Takımın moral ve bağ dokusudur.',
    buyume: ['"Benim ihtiyacım ne?" sorusunu günlük olarak sor.', 'Vermeyi karşılık beklemeden, gerçekten karşılıksız yapmayı dene.', '"Hayır" demeyi bir reddediş değil, sağlıklı bir sınır olarak gör.', 'Sevginin, sen kendini de doyurduğunda daha temiz aktığını fark et.'],
    roller: 'Rehber, hemşire, öğretmen, danışman, gönüllü, ev sahibi'
  },
  3: {
    no: 3, ad: 'Başaran', unvan: 'Hedef Odaklı Yıldız',
    renk: '#e0941f', renkSoft: 'rgba(224,148,31,.14)', renkText: '#b9780f', renkTextDark: '#f0b54e',
    merkez: 'kalp',
    ozet: 'Hedefe kilitli, verimli ve uyum sağlayan; başarı ve takdir üzerinden değer arar.',
    temelArzu: 'Değerli ve kıymetli hissetmek; başardıklarıyla saygı görmek.',
    temelKorku: 'Değersiz olmak, başarısız görünmek, hiçbir şey ifade etmemek.',
    motivasyon: 'Hedef koyar, çalışır, kazanır. Ortama göre en iyi versiyonunu sunmayı bilir. Değerinin "ne yaptığına" bağlı olduğuna inanır, bu yüzden durmadan üretir.',
    tutku: 'Yalan (kendini parlatma)', erdem: 'Hakikat / Samimiyet',
    golge: 'Başarı imajı gerçek benliğin önüne geçer; "ne hissettiğim" değil "nasıl göründüğüm" öne çıkar, içdeki boşluk üretkenlikle örtülür.',
    gucluYonler: ['Hedef belirleme ve başarma azmi', 'Yüksek enerji, verimlilik, pratiklik', 'Uyum sağlama ve kendini iyi sunma', 'İlham veren, sürükleyici liderlik', 'Sonuç üretme becerisi'],
    zorluklar: ['Değeri başarıya endeksleme', 'İmaj uğruna gerçek duyguları örtme', 'Aşırı çalışma, durup hissedememe', 'Rekabette başkalarını araç görme', 'Başarısızlığı içsel olarak felaketleştirme'],
    stres: { hedef: 9, metin: 'Stres altında Tip 9\'a kayar: tükenir, erteler, içten içe çöker; sürekli koşan motor aniden durur ve oyalanmaya kaçar.' },
    gelisim: { hedef: 6, metin: 'Geliştiğinde Tip 6\'nın bağlılığını alır: kendini değil topluluğu düşünür, sadık ve işbirlikçi olur, değerinin sevildiğinden geldiğini görür.' },
    iliskiler: 'Çekici, hareketli ve destekleyicidir; ama "başarılı görünme" zırhı yakınlığı zorlaştırabilir. Gerçek bağ, maskeyi indirip "başarısız da olsam sevilir miyim?" sorusuna güvenle bakabildiğinde kurulur.',
    is: 'Hedef, performans ve görünürlük olan her yerde parlar: yöneticilik, satış, girişimcilik, pazarlama, sahne, spor. Takımı sonuca taşır.',
    buyume: ['"Ne yaptığım"dan ayrı olarak "kim olduğumu" merak et.', 'Yavaşla; başarı olmadan da değerli olduğunu hisset.', 'Gerçek duygularını güvendiklerinle paylaş, maskeyi indir.', 'Başkalarının başarısını kendi tehdidin değil, ortak sevinç olarak gör.'],
    roller: 'Yönetici, girişimci, sunucu, pazarlamacı, sporcu, koç'
  },
  4: {
    no: 4, ad: 'Özgün', unvan: 'Derin Romantik',
    renk: '#9b6dd6', renkSoft: 'rgba(155,109,214,.14)', renkText: '#7d4fc0', renkTextDark: '#b89ae6',
    merkez: 'kalp',
    ozet: 'Duygusal derinliği, özgünlüğü ve anlamı arayan; sıradanlıktan kaçan hassas ruh.',
    temelArzu: 'Kendine has bir kimlik bulmak; derin, özgün ve anlamlı bir hayat yaşamak.',
    temelKorku: 'Kimliksiz, sıradan ve önemsiz olmak; kişisel bir anlamdan yoksun kalmak.',
    motivasyon: 'Duygularının derinliğinde kendini arar. Bende olmayan, başkalarında varmış gibi bir "eksiklik" hissi taşır; bu özlem, onu yaratıcılığa ve içe dönüşe iter.',
    tutku: 'Kıskançlık / Haset (eksiklik)', erdem: 'Denge / Şükür',
    golge: 'Eksik olana odaklanıp olanı görememe; melankoliyi kimlik sanma, "kimse beni anlamıyor" yalnızlığına yerleşme.',
    gucluYonler: ['Duygusal derinlik ve dürüstlük', 'Yaratıcılık ve estetik duyarlılık', 'Empati, özellikle acı çekene', 'Özgünlük ve sahicilik arayışı', 'Anlam ve derinlik üretme'],
    zorluklar: ['Eksiklik ve kıyas duygusu', 'Melankoliye ve içe kapanmaya yatkınlık', 'Duygu dalgalanmaları', 'Sıradan olanı küçümseme', 'Kendini fazla ciddiye/dramatik alma'],
    stres: { hedef: 2, metin: 'Stres altında Tip 2\'ye kayar: onay için kendini başkalarına adar, ihtiyaçlarını gizler, dolaylı yoldan sevgi arar.' },
    gelisim: { hedef: 1, metin: 'Geliştiğinde Tip 1\'in disiplinini alır: duygularına kapılmak yerine ilkeyle eyleme geçer, hayalini somut esere dönüştürür.' },
    iliskiler: 'Tutkulu, derin ve sahicidir; ama "yeterince derin/özel mi?" sorgusu ve dalgalanmalar ilişkiyi yorabilir. Huzuru, şu anda elindekinin değerini görebildiğinde bulur.',
    is: 'Yaratıcı ve anlam yüklü alanlarda parlar: sanat, yazarlık, tasarım, müzik, terapi, danışmanlık. Sıradanı estetiğe çevirir.',
    buyume: ['Eksik olana değil, halihazırda elindekine bilinçle odaklan (şükür pratiği).', 'Duyguların geçici hava durumudur; onlara kapılmadan akmalarına izin ver.', 'İlhamı bekleme; küçük, düzenli, somut eylemle üret.', 'Sıradan anların da güzel olabileceğini deneyimle.'],
    roller: 'Sanatçı, yazar, tasarımcı, müzisyen, terapist, danışman'
  },
  5: {
    no: 5, ad: 'Araştırmacı', unvan: 'Bilge Gözlemci',
    renk: '#4361b5', renkSoft: 'rgba(67,97,181,.14)', renkText: '#34509c', renkTextDark: '#8aa3e6',
    merkez: 'zihin',
    ozet: 'Bilgiye, anlamaya ve bağımsızlığa adanmış; mesafeli, derin ve gözlemci zihin.',
    temelArzu: 'Yetkin ve yeterli olmak; dünyayı anlayıp kendi ayakları üzerinde durabilmek.',
    temelKorku: 'Yetersiz, çaresiz, işe yaramaz olmak; başkalarına muhtaç ve istila edilmiş olmak.',
    motivasyon: 'Bilgi biriktirerek güvende hisseder. Enerjisini ve kaynaklarını korur, dünyaya katılmadan önce onu izler, anlar, "hazır" olmayı bekler.',
    tutku: 'Cimrilik (kendini esirgeme)', erdem: 'Cömertlik / Katılım',
    golge: 'Hayata "izleyici" kalıp katılımı erteleme; duyguları ve insanları zihne çekip yalnızlığa, kıtlık hissine yerleşme.',
    gucluYonler: ['Derin analiz ve uzmanlaşma', 'Bağımsızlık ve sakin gözlem', 'Nesnellik, soğukkanlılık', 'Az kaynakla idare edebilme', 'Özgün, derinlikli düşünce'],
    zorluklar: ['Duygusal mesafe ve içe kapanma', 'Hayata gözlemci kalıp katılmama', 'Enerji ve kaynakları aşırı koruma', 'İhtiyaç ve yakınlıktan kaçınma', 'Bilmeden harekete geçememe'],
    stres: { hedef: 7, metin: 'Stres altında Tip 7\'ye kayar: zihni dağılır, savrunur, bir uçtan diğerine atlar, dürtüsel kaçışlara yönelir.' },
    gelisim: { hedef: 8, metin: 'Geliştiğinde Tip 8\'in gücünü alır: bilgiyi eyleme döker, bedeniyle ve dünyayla temasa geçer, kendinden emin liderlik eder.' },
    iliskiler: 'Sadık, derin ve az ama öz bağ kurar; fakat "çok şey isteniyor" hissiyle geri çekilir. Yakınlık, paylaşmanın onu tüketmeyeceğine güvendiğinde derinleşir.',
    is: 'Uzmanlık ve derinlik isteyen alanlarda parlar: araştırma, bilim, mühendislik, yazılım, akademi, analiz. Karmaşığı çözer, ustalaşır.',
    buyume: ['Bilgini eyleme dök; "yeterince bildiğinde" değil, şimdi katıl.', 'Duygularını anında yaşamayı dene, sonra analiz etmeyi değil.', 'Cömert ol: zamanını, enerjini, kendini paylaş.', 'Bedeninle ve şimdiki anla temas kur (yürüyüş, nefes, hareket).'],
    roller: 'Araştırmacı, bilim insanı, mühendis, yazılımcı, analist, akademisyen'
  },
  6: {
    no: 6, ad: 'Sadık', unvan: 'Sadık Sorgulayıcı',
    renk: '#6b8cae', renkSoft: 'rgba(107,140,174,.16)', renkText: '#4f6f90', renkTextDark: '#a8c2dd',
    merkez: 'zihin',
    ozet: 'Güvenlik, sadakat ve hazırlık arayan; tehlikeyi önceden sezen tedbirli zihin.',
    temelArzu: 'Güvende olmak; destek, rehberlik ve sağlam bir zemin bulmak.',
    temelKorku: 'Desteksiz, dayanaksız ve hazırlıksız yakalanmak; kendi başının çaresine bakamamak.',
    motivasyon: 'Olası tehlikeleri önceden düşünür, senaryolar kurar, tedbir alır. Güven arar ama güvenmekte zorlanır; bu yüzden test eder, sorgular, sadık kalır.',
    tutku: 'Korku / Kuşku', erdem: 'Cesaret / İç güven',
    golge: 'Sürekli "ya kötü olursa" kaygısı; ya aşırı kurala-otoriteye sığınma ya da otoriteye isyan, içdeki rehberi dışarıda arama.',
    gucluYonler: ['Sadakat ve güvenilirlik', 'Sorun ve riskleri önceden görme', 'Hazırlık, tedbir, dayanışma', 'Topluluğa bağlılık', 'Zorlukta yanında olan dost'],
    zorluklar: ['Kronik kaygı ve aşırı düşünme', 'Kendine güvensizlik, kararsızlık', 'Felaket senaryolarına kapılma', 'Otoriteyle gelgitli ilişki', 'Şüphenin güveni yıpratması'],
    stres: { hedef: 3, metin: 'Stres altında Tip 3\'e kayar: kaygıyı işe/imaja gömer, durmadan çalışır, görünüşü kurtarmaya çalışır.' },
    gelisim: { hedef: 9, metin: 'Geliştiğinde Tip 9\'un sükûnetini alır: zihnindeki uğultu diner, kendine ve hayata güvenir, sakin ve istikrarlı olur.' },
    iliskiler: 'Sadık, dürüst, kriz anında en güvenilir dosttur; ama şüphe ve test etme yakınlığı yıpratabilir. Huzuru, içindeki rehbere güvenmeyi öğrendiğinde gelir.',
    is: 'Güven, ekip ve risk yönetimi isteyen alanlarda parlar: güvenlik, hukuk, denetim, sağlık, kamu, takım çalışması. Krizde soğukkanlı kalır.',
    buyume: ['Korkuyu bir bilgi olarak dinle, ama efendin yapma.', 'Kararlarda dış garantiyi değil, içsezgini güçlendir.', 'Felaket senaryosunu "en olası senaryo"yla dengele.', 'Cesaret, korkunun yokluğu değil; korkuya rağmen adım atmaktır.'],
    roller: 'Güvenlik uzmanı, hukukçu, denetçi, mühendis, ekip lideri, öğretmen'
  },
  7: {
    no: 7, ad: 'Maceracı', unvan: 'Coşkulu Kâşif',
    renk: '#f0833a', renkSoft: 'rgba(240,131,58,.14)', renkText: '#d56c25', renkTextDark: '#f5a36b',
    merkez: 'zihin',
    ozet: 'Heyecan, özgürlük ve olasılık peşinde; neşeli, hareketli ve fikir dolu zihin.',
    temelArzu: 'Mutlu, özgür ve tatmin olmuş olmak; hayatın bütün imkânlarını yaşamak.',
    temelKorku: 'Acıda, yoksunlukta ve sıkıntıda kapana kısılmak; mahrum kalmak.',
    motivasyon: 'Zihni sürekli yeni planlara, seçeneklere ve heyecanlara atlar. Acıdan ve sınırlanmaktan kaçar; hayatı dolu dolu yaşama açlığı taşır.',
    tutku: 'Oburluk / Aşırılık (deneyime açlık)', erdem: 'Ölçü / Ayıklık',
    golge: 'Acıdan kaçış için sürekli "bir sonraki"ne koşma; yüzeyde kalma, başladığını bitirememe, şu anla doyamama.',
    gucluYonler: ['Coşku, iyimserlik, enerji', 'Yaratıcılık ve fikir bolluğu', 'Çok yönlülük ve hızlı öğrenme', 'Ortama neşe ve canlılık katma', 'Olasılıkları görme becerisi'],
    zorluklar: ['Dağınıklık, odak ve süreklilik sorunu', 'Acı ve olumsuz duygulardan kaçış', 'Yüzeysellik, derinleşememe', 'Sınır ve bağlanma zorluğu', 'Şu anla doyamama (hep "daha")'],
    stres: { hedef: 1, metin: 'Stres altında Tip 1\'e kayar: katılaşır, eleştirel ve mükemmeliyetçi olur, neşesi yerini kasvete bırakır.' },
    gelisim: { hedef: 5, metin: 'Geliştiğinde Tip 5\'in derinliğini alır: bir şeyde kalır, derinleşir, sükûnetle odaklanır; nicelikten niteliğe geçer.' },
    iliskiler: 'Eğlenceli, ilham verici, hayat dolu bir partnerdir; ama kaçış ve bağlanma zorluğu derinliği engelleyebilir. Asıl tatmin, "şu an" ile kalabildiğinde gelir.',
    is: 'Yaratıcılık, çeşitlilik ve hız isteyen alanlarda parlar: girişimcilik, tanıtım, eğitim, medya, tasarım, organizasyon. Fikir ve enerji kaynağıdır.',
    buyume: ['Acıdan kaçma; zor duyguların içinden geçmenin de bir özgürlük olduğunu gör.', 'Bir şeyi sonuna kadar bitir; derinliğin tadına var.', '"Daha fazla seçenek" değil, "şu anın doyumu" peşinde ol.', 'Sınır ve bağlılığın özgürlüğü kısıtlamadığını, derinleştirdiğini deneyimle.'],
    roller: 'Girişimci, eğitmen, tasarımcı, organizatör, yayıncı, mucit'
  },
  8: {
    no: 8, ad: 'Lider', unvan: 'Güçlü Koruyucu',
    renk: '#d6453c', renkSoft: 'rgba(214,69,60,.14)', renkText: '#b6362e', renkTextDark: '#e8867f',
    merkez: 'beden',
    ozet: 'Güç, adalet ve kontrol arayan; doğrudan, korkusuz ve koruyucu irade.',
    temelArzu: 'Kendi hayatının ve kaderinin kontrolünde olmak; güçlü ve bağımsız kalmak.',
    temelKorku: 'Zarar görmek, kontrol edilmek, başkalarının insafına kalmak; ihanete uğramak.',
    motivasyon: 'Güçlü olmak ve kontrolü elde tutmak ister. Haksızlığa tahammülü yoktur, zayıfı korur. Yumuşaklığını bir kale ardında saklar; zayıf görünmekten kaçınır.',
    tutku: 'Doymak bilmez güç arzusu (dürtüsellik)', erdem: 'Masumiyet / Şefkat',
    golge: 'Yumuşaklığı zayıflık sanıp duvar örme; "ya hükmederim ya hükmedilirim" katılığı, gücü incitmek için kullanma.',
    gucluYonler: ['Güçlü irade ve liderlik', 'Cesaret, kararlılık, doğrudanlık', 'Zayıfı ve haklıyı koruma', 'Zorlukta sarsılmaz duruş', 'Adalet ve dürüstlük duygusu'],
    zorluklar: ['Kontrol ve baskınlık ihtiyacı', 'Öfkenin sertliğe dönüşmesi', 'Yumuşaklığı/zaafı gizleme', 'Aşırılık, "ya hep ya hiç"', 'İncinmeyi kabullenmekte zorluk'],
    stres: { hedef: 5, metin: 'Stres altında Tip 5\'e kayar: içine çekilir, insanlardan uzaklaşır, gizli planlar ve mesafeyle kendini korur.' },
    gelisim: { hedef: 2, metin: 'Geliştiğinde Tip 2\'nin şefkatini alır: gücünü korumak için değil sevmek için kullanır, yumuşaklığını bir zarafet olarak gösterir.' },
    iliskiler: 'Koruyucu, sadık ve tutkuludur; ama kontrol ve sertlik yakınlığı zorlaştırabilir. Gerçek güç, savunmasızlığını güvenle gösterebildiğinde ortaya çıkar.',
    is: 'Liderlik, girişim ve kriz yönetimi olan her yerde parlar: yöneticilik, girişimcilik, savunuculuk, inşa, kriz/saha işleri. Sorumluluğu kucaklar.',
    buyume: ['Yumuşaklığın zayıflık değil, güç olduğunu keşfet.', 'Kontrolü bırakmanın da bir güven olduğunu dene.', 'Öfkenden önce altındaki incinmeyi fark et.', 'Gücünü hükmetmek için değil, korumak ve sevmek için kullan.'],
    roller: 'Lider, girişimci, savunucu, saha yöneticisi, koç, kurucu'
  },
  9: {
    no: 9, ad: 'Barışçı', unvan: 'Huzurlu Arabulucu',
    renk: '#5fa882', renkSoft: 'rgba(95,168,130,.16)', renkText: '#458a67', renkTextDark: '#8fcfac',
    merkez: 'beden',
    ozet: 'Uyum, huzur ve içsel dinginlik arayan; sakin, hoşgörülü ve birleştirici varlık.',
    temelArzu: 'İçsel ve dışsal huzura kavuşmak; çevresiyle uyum ve denge içinde olmak.',
    temelKorku: 'Kopmak, kaybolmak, çatışmayla parçalanmak; önemsiz ve görünmez olmak.',
    motivasyon: 'Huzuru korumak için çatışmadan kaçınır, akışa uyar. Kendi isteklerini ve varlığını gölgede bırakacak kadar uyum sağlar; "sorun çıkmasın" der.',
    tutku: 'Tembellik (kendini unutma)', erdem: 'Eylem / Var olma',
    golge: 'Huzur uğruna kendini silme; önemli olanı erteleme, çatışmayı yutup pasif inada ve uyuşukluğa kayma.',
    gucluYonler: ['Sakinlik, hoşgörü, sabır', 'Uzlaştırma ve arabuluculuk', 'Farklı tarafları görebilme', 'İstikrar ve huzur verme', 'Yargısız, kabullenici varlık'],
    zorluklar: ['Kendi isteğini ve sesini bastırma', 'Erteleme ve eylemsizlik', 'Çatışmadan kaçış, pasif inat', 'Önceliklerini belirleyememe', 'Kendi varlığını küçümseme'],
    stres: { hedef: 6, metin: 'Stres altında Tip 6\'ya kayar: kaygılanır, kuşkuya düşer, kafasında olumsuz senaryolar çoğalır, tetikte olur.' },
    gelisim: { hedef: 3, metin: 'Geliştiğinde Tip 3\'ün enerjisini alır: harekete geçer, hedef koyar, kendi varlığını ve isteğini ortaya koyar.' },
    iliskiler: 'Sıcak, kabullenici ve huzur veren bir partnerdir; ama kendini silme ve pasif direnç gerçek yakınlığı engelleyebilir. Bağ, kendi sesini de masaya koyabildiğinde güçlenir.',
    is: 'Uyum, sabır ve uzlaşı isteyen alanlarda parlar: arabuluculuk, danışmanlık, eğitim, insan kaynakları, ekip çalışması, bakım işleri. Ortamı sakinleştirir.',
    buyume: ['Kendi isteğini fark et ve dile getir; varlığın önemli.', 'Önemli işi erteleme; küçük bir adımla harekete geç.', 'Çatışmadan kaçma; sağlıklı çatışma yakınlık getirir.', 'Akışa uymak ile kendini kaybetmek arasındaki farkı gör.'],
    roller: 'Arabulucu, danışman, öğretmen, bakım veren, ekip oyuncusu, diplomat'
  }
};

/* ── SORU HAVUZU ──────────────────────────────────────────
   Birinci tekil şahıs, 5'li katılım ölçeği (1–5).
   tip   : puanlanan tip (1–9)
   ters  : true ise ters-puanlı madde (katılım = tipe DÜŞÜK puan).
           Evetleme yanlılığını (her şeye "katılıyorum" deme) kırar.
   Her tip için ~10 madde (2'si ters). Havuzdan moda göre örneklenir.
   ──────────────────────────────────────────────────────── */
var SORULAR = [
  /* Tip 1 — Mükemmeliyetçi */
  { tip: 1, metin: 'Bir işi yapacaksam doğru ve eksiksiz yapmalıyım; "idare eder" beni rahatsız eder.' },
  { tip: 1, metin: 'İçimde sürekli "daha iyi olabilirdi" diyen bir eleştiri sesi var.' },
  { tip: 1, metin: 'Etrafımdaki yanlışlar ve düzensizlikler gözüme batar; düzeltme isteği duyarım.' },
  { tip: 1, metin: 'İlkelerimden kolay kolay ödün vermem; doğru bildiğimi savunurum.' },
  { tip: 1, metin: 'Kendime karşı çoğu insandan daha katı ve disiplinliyimdir.' },
  { tip: 1, metin: 'Söz verdiğim şeyi mutlaka yaparım; sözüme ve kurallara sadık kalırım.' },
  { tip: 1, metin: 'Bir şeyin "olması gerektiği gibi" olmaması içimde gerginlik yaratır.' },
  { tip: 1, metin: 'Zamanımı ve görevlerimi titizlikle düzenler, savsaklamaktan rahatsız olurum.' },
  { tip: 1, ters: true, metin: 'Çoğu konuda "yeterince iyi" benim için yeterlidir; ayrıntılara fazla takılmam.' },
  { tip: 1, ters: true, metin: 'Hata yapmak ya da kuralların dışına çıkmak beni pek rahatsız etmez.' },

  /* Tip 2 — Yardımsever */
  { tip: 2, metin: 'Başkalarının ihtiyaçlarını çoğu zaman kendiminkilerden önce fark ederim.' },
  { tip: 2, metin: 'İnsanlara yardım etmek, gerektiğinde fedakârlık yapmak bana iyi hissettirir.' },
  { tip: 2, metin: 'Sevilmek ve istenmek benim için çok önemlidir; reddedilmekten kolay incinirim.' },
  { tip: 2, metin: 'İlişkilerde verici olurum; bazen kendi ihtiyaçlarımı görmezden gelirim.' },
  { tip: 2, metin: 'Birinin hayatında gerekli ve önemli biri olduğumu hissetmek beni mutlu eder.' },
  { tip: 2, metin: 'İnsanlar dertlerini bana açar; güvenilir bir sığınak gibi görülmek hoşuma gider.' },
  { tip: 2, metin: 'Sevdiklerim için sınırlarımı zorlar, "hayır" demekte zorlanırım.' },
  { tip: 2, metin: 'Birinin takdir etmemesi ya da görmezden gelmesi beni derinden üzer.' },
  { tip: 2, ters: true, metin: 'Başkalarının ihtiyaçlarından çok kendi ihtiyaçlarıma odaklanırım.' },
  { tip: 2, ters: true, metin: 'Yardım istemek ya da bana muhtaç olunması beni rahatsız eder; mesafemi korurum.' },

  /* Tip 3 — Başaran */
  { tip: 3, metin: 'Hedef koyar, başarmak için kendimi sonuna kadar çalıştırırım.' },
  { tip: 3, metin: 'Başkalarının gözünde başarılı ve değerli görünmek benim için önemlidir.' },
  { tip: 3, metin: 'Verimli olmayı severim; zamanı boşa harcamak beni huzursuz eder.' },
  { tip: 3, metin: 'Ortama göre kendimi en iyi şekilde sunmayı, "kazanan" tarafta olmayı bilirim.' },
  { tip: 3, metin: 'Başarısız ya da değersiz görünmek en sevmediğim şeylerdendir.' },
  { tip: 3, metin: 'Bir işe girişince en iyisi, en başarılısı olmak isterim.' },
  { tip: 3, metin: 'İmajıma ve insanlar tarafından nasıl algılandığıma çok dikkat ederim.' },
  { tip: 3, metin: 'Boş durmak bana zaman kaybı gibi gelir; sürekli üretmek isterim.' },
  { tip: 3, ters: true, metin: 'Başarı ve başkalarının beni nasıl gördüğü beni pek ilgilendirmez.' },
  { tip: 3, ters: true, metin: 'Hedef peşinde koşmaktansa olduğum yerde sakin kalmayı yeğlerim.' },

  /* Tip 4 — Özgün */
  { tip: 4, metin: 'Kendimi başkalarından farklı, biraz da "bu dünyaya ait olmayan" biri gibi hissederim.' },
  { tip: 4, metin: 'Duygularım derin ve yoğundur; sıradanlıktan kaçar, özgün olanı ararım.' },
  { tip: 4, metin: 'Başkalarında olan bir şeyin bende eksik olduğu duygusunu sık sık yaşarım.' },
  { tip: 4, metin: 'Melankoli, özlem ve hayal kurmak iç dünyamın doğal parçalarıdır.' },
  { tip: 4, metin: 'Kendimi ve duygularımı yaratıcı/sanatsal yollarla ifade etmek isterim.' },
  { tip: 4, metin: 'Sıradan ve herkes gibi olmak benim için en sevimsiz ihtimallerden biridir.' },
  { tip: 4, metin: 'İçimde sık sık bir özlem, bir "bir şey eksik" duygusu taşırım.' },
  { tip: 4, metin: 'Güzellik, sanat ve derin duygular beni en çok canlı hissettiren şeylerdir.' },
  { tip: 4, ters: true, metin: 'Kendimi oldukça sıradan, herkes gibi hissederim ve bundan rahatsız olmam.' },
  { tip: 4, ters: true, metin: 'Duyguların derinliğinden çok, somut ve pratik gerçeklerle ilgilenirim.' },

  /* Tip 5 — Araştırmacı */
  { tip: 5, metin: 'Bir konuyu derinlemesine anlamak ve ustalaşmak beni en çok tatmin eden şeydir.' },
  { tip: 5, metin: 'Kalabalık ve aşırı talep beni yorar; kendi alanıma çekilip enerji toplarım.' },
  { tip: 5, metin: 'Duygularımı anında yaşamak yerine önce gözlemler, mantıkla analiz ederim.' },
  { tip: 5, metin: 'Bağımsızlığım ve özel alanım benim için çok kıymetli; çok şey istenmesinden hoşlanmam.' },
  { tip: 5, metin: 'Bir ortama girmeden önce izler, biriktirir, hazır hissedince katılırım.' },
  { tip: 5, metin: 'Sosyalleşmek yerine kitap, araştırma ya da kendi düşüncelerimle baş başa kalmayı yeğlerim.' },
  { tip: 5, metin: 'Bilmediğim bir konuda konuşmaktan rahatsız olurum; önce iyice öğrenmem gerekir.' },
  { tip: 5, metin: 'Duygularımı paylaşmaktansa kendi içimde işlemeyi tercih ederim.' },
  { tip: 5, ters: true, metin: 'Uzun uzun araştırmadan, içime doğduğu gibi atılıp harekete geçerim.' },
  { tip: 5, ters: true, metin: 'İnsanlarla bol vakit geçirmek beni yormaz, aksine enerji verir.' },

  /* Tip 6 — Sadık */
  { tip: 6, metin: 'Olası tehlikeleri ve kötü senaryoları önceden düşünür, tedbir alırım.' },
  { tip: 6, metin: 'Güvendiğim insanlara ve gruplara çok sadığımdır.' },
  { tip: 6, metin: 'Önemli kararlardan önce kafamda birçok "ya şöyle olursa" senaryosu döner.' },
  { tip: 6, metin: 'Yeni bir şeye güvenmeden önce test eder, sorgular, garantisini ararım.' },
  { tip: 6, metin: 'Belirsizlik ve tehdit karşısında tetikte ve temkinli olurum.' },
  { tip: 6, metin: 'Bana "her şey yolunda" dense bile içimde bir tedirginlik kalabilir.' },
  { tip: 6, metin: 'Karar verirken güvendiğim birine danışmak içimi rahatlatır.' },
  { tip: 6, metin: 'Sadakat benim için çok önemli; kolay kolay taraf ya da grup değiştirmem.' },
  { tip: 6, ters: true, metin: 'Geleceği pek dert etmem; işler nasıl olsa yoluna girer diye düşünürüm.' },
  { tip: 6, ters: true, metin: 'Yeni insanlara ve durumlara kuşkuyla değil, rahatça güvenirim.' },

  /* Tip 7 — Maceracı */
  { tip: 7, metin: 'Yeni deneyimler, seçenekler ve heyecan beni canlandırır; sıkılmaktan kaçarım.' },
  { tip: 7, metin: 'Aklım sürekli gelecekteki keyifli planlara ve yeni fikirlere atlar.' },
  { tip: 7, metin: 'Sıkıntı ve olumsuzlukla uğraşmaktansa olumlu tarafa odaklanmayı seçerim.' },
  { tip: 7, metin: 'Kendimi kısıtlanmış, tek bir seçeneğe mahkûm hissetmekten hoşlanmam.' },
  { tip: 7, metin: 'Enerjik ve iyimserimdir; hayatı dolu dolu yaşamak isterim.' },
  { tip: 7, metin: 'Bir planın iptal olması ya da seçeneklerimin azalması canımı sıkar.' },
  { tip: 7, metin: 'Sohbetlerde konudan konuya atlar, yeni fikirlerle kolayca heyecanlanırım.' },
  { tip: 7, metin: 'Olumsuz düşünceleri uzun süre taşımak yerine hızla moralimi toparlarım.' },
  { tip: 7, ters: true, metin: 'Tek bir işe uzun süre odaklanmak bana zor gelmez; sükûnetten hoşlanırım.' },
  { tip: 7, ters: true, metin: 'Yeni heyecanlar aramaktansa tanıdık, sade ve oturmuş bir hayatı tercih ederim.' },

  /* Tip 8 — Lider */
  { tip: 8, metin: 'Güçlü olmak ve kendi hayatımın kontrolünde olmak benim için esastır.' },
  { tip: 8, metin: 'Haksızlık karşısında çekinmeden, doğrudan tavır alırım.' },
  { tip: 8, metin: 'Kontrolün başkasında olması, bana hükmedilmesi beni rahatsız eder.' },
  { tip: 8, metin: 'Açık sözlü ve doğrudanımdır; ne düşündüğümü söylemekten çekinmem.' },
  { tip: 8, metin: 'Zayıf ya da savunmasız görünmektense güçlü durmayı yeğlerim.' },
  { tip: 8, metin: 'Bir ortamda doğal olarak sorumluluğu ve liderliği üstlenirim.' },
  { tip: 8, metin: 'Gücü olanın güçsüzü ezmesine tahammül edemem; zayıfın yanında dururum.' },
  { tip: 8, metin: 'Kararlıyımdır; bir şeye inandığımda engellere rağmen üstüne giderim.' },
  { tip: 8, ters: true, metin: 'Çatışmadan kaçınır, kontrolü başkasına bırakmakta zorlanmam.' },
  { tip: 8, ters: true, metin: 'Sertlik yerine yumuşaklıkla yaklaşmayı daha doğal bulurum.' },

  /* Tip 9 — Barışçı */
  { tip: 9, metin: 'Çatışma ve gerginlikten kaçınır, ortamı yumuşatmaya çalışırım.' },
  { tip: 9, metin: 'Çevremdekilerle uyum ve huzur içinde olmak benim için çok değerlidir.' },
  { tip: 9, metin: 'Kendi isteğimi öne çıkarmak yerine akışa uyum sağlamayı tercih ederim.' },
  { tip: 9, metin: 'Bazen önemli işleri erteler, rahatımı bozmamak için oyalanırım.' },
  { tip: 9, metin: 'Sakin, hoşgörülü ve uzlaşmacı biriyimdir; kimseyi kırmak istemem.' },
  { tip: 9, metin: 'Tartışma çıkacağını sezdiğimde geri çekilir ya da konuyu değiştiririm.' },
  { tip: 9, metin: 'Başkalarının görüşlerine kolayca uyum sağlar, kendi isteğimi ertelerim.' },
  { tip: 9, metin: 'Huzurumu bozacak ani değişikliklerden hoşlanmam.' },
  { tip: 9, ters: true, metin: 'Kendi isteğimi net biçimde ortaya koyar, gerekirse çatışmayı göze alırım.' },
  { tip: 9, ters: true, metin: 'Karar verince oyalanmadan hemen harekete geçerim.' }
];

/* Çocuk modu: aynı maddelerin ebeveyn gözlemine uygun karşılıkları.
   İçsel niyet bildiren ifadeler, doğrudan teşhis dili yerine gözlenen davranış
   ve çocuğun söylediği/işaret ettiği örüntüler üzerinden yazılır. */
var COCUK_METINLER = [
  'Çocuğum bir işi yapacaksa doğru ve eksiksiz yapmaya çalışır; "idare eder" hali onu rahatsız eder.',
  'Çocuğum yaptığı işlerde sık sık "daha iyi olabilirdi" diye düşünür veya bunu belli eder.',
  'Çocuğum çevresindeki yanlışları ve düzensizlikleri çabuk fark eder; düzeltmek ister.',
  'Çocuğum doğru bildiği şeyden kolay kolay vazgeçmez; kuralları ve ilkeleri savunur.',
  'Çocuğum kendine karşı yaşıtlarına göre daha katı ve disiplinli davranır.',
  'Çocuğum söz verdiği şeyi yapmaya ve kurallara sadık kalmaya önem verir.',
  'Bir şey olması gerektiği gibi olmadığında çocuğumda belirgin bir gerginlik oluşur.',
  'Çocuğum zamanını, eşyalarını veya görevlerini düzenlemeye çalışır; savsaklamaktan rahatsız olur.',
  'Çocuğum çoğu konuda "yeterince iyi" ile rahat eder; ayrıntılara fazla takılmaz.',
  'Çocuğum hata yapmayı ya da kuralların dışına çıkmayı genelde çok sorun etmez.',

  'Çocuğum başkalarının ihtiyaçlarını çoğu zaman kendi ihtiyacından önce fark eder.',
  'Çocuğum insanlara yardım etmeyi ve gerektiğinde fedakarlık yapmayı sever.',
  'Çocuğum sevilmek ve istenmek konusunda hassastır; reddedilince kolay incinir.',
  'Çocuğum ilişkilerde verici davranır; bazen kendi ihtiyacını ikinci plana atar.',
  'Çocuğum birinin hayatında gerekli ve önemli olduğunu hissettiğinde mutlu olur.',
  'Çocuğum insanlar ona dertlerini açtığında veya güven duyduğunda bundan hoşlanır.',
  'Çocuğum sevdikleri için sınırlarını zorlar; "hayır" demekte zorlanır.',
  'Çocuğum yardımının ya da emeğinin fark edilmemesine derinden üzülür.',
  'Çocuğum çoğu zaman başkalarının ihtiyaçlarından çok kendi ihtiyaçlarına odaklanır.',
  'Çocuğum başkalarının ona ihtiyaç duymasından veya yardım istemesinden rahatsız olur; mesafesini korur.',

  'Çocuğum hedef koyduğunda başarmak için güçlü biçimde çalışır.',
  'Çocuğum başarılı ve değerli görünmeye önem verir.',
  'Çocuğum verimli olmayı sever; zamanı boşa harcamak onu huzursuz eder.',
  'Çocuğum ortama göre kendini iyi sunmayı ve öne çıkmayı bilir.',
  'Çocuğum başarısız ya da yetersiz görünmekten belirgin biçimde rahatsız olur.',
  'Çocuğum bir işe girişince en iyilerden biri olmak ister.',
  'Çocuğum nasıl algılandığına ve imajına dikkat eder.',
  'Çocuğum boş durmayı sevmez; sürekli bir şey üretmek veya başarmak ister.',
  'Başarı ve başkalarının onu nasıl gördüğü çocuğumu pek ilgilendirmez.',
  'Çocuğum hedef peşinde koşmaktansa bulunduğu yerde sakin kalmayı tercih eder.',

  'Çocuğum kendini başkalarından farklı veya anlaşılması zor biri gibi hisseder/gösterir.',
  'Çocuğum duyguları derin yaşayan, özgün ve sıradan olmayan şeylere yönelen bir yapıdadır.',
  'Çocuğum başkalarında olup kendisinde eksikmiş gibi hissettiği şeylerden sık söz eder.',
  'Çocuğum özlem, hüzün ve hayal kurma hallerine kolay girer.',
  'Çocuğum kendini ve duygularını yaratıcı ya da sanatsal yollarla ifade etmek ister.',
  'Çocuğum sıradan ve herkes gibi görünmekten hoşlanmaz.',
  'Çocuğumda sık sık bir özlem veya "bir şey eksik" duygusu sezilir.',
  'Güzellik, sanat ve yoğun duygular çocuğumu belirgin biçimde canlandırır.',
  'Çocuğum kendini oldukça sıradan ve herkes gibi görür; bundan rahatsız olmaz.',
  'Çocuğum duygusal derinlikten çok somut ve pratik gerçeklerle ilgilenir.',

  'Çocuğum bir konuyu derinlemesine anlamaktan ve onda ustalaşmaktan büyük tatmin duyar.',
  'Kalabalık ve aşırı talep çocuğumu yorar; kendi alanına çekilip enerji toplar.',
  'Çocuğum duygularını hemen yaşamaktansa önce gözlemleyip mantıkla anlamaya çalışır.',
  'Çocuğum bağımsızlığına ve özel alanına çok önem verir; ondan çok şey istenmesinden hoşlanmaz.',
  'Çocuğum bir ortama katılmadan önce izler, bilgi toplar ve hazır hissetmek ister.',
  'Çocuğum sosyalleşmek yerine kitap, araştırma, oyun, hobi veya kendi düşünceleriyle kalmayı seçer.',
  'Çocuğum bilmediği konuda konuşmaktan rahatsız olur; önce iyice öğrenmek ister.',
  'Çocuğum duygularını paylaşmaktansa çoğu zaman kendi içinde işlemeyi tercih eder.',
  'Çocuğum uzun araştırmadan, içinden geldiği gibi atılıp harekete geçer.',
  'İnsanlarla bol vakit geçirmek çocuğumu yormaz; aksine ona enerji verir.',

  'Çocuğum olası tehlikeleri ve kötü senaryoları önceden düşünür; tedbir almak ister.',
  'Çocuğum güvendiği insanlara ve gruplara çok sadıktır.',
  'Önemli kararlardan önce çocuğumun kafasında birçok "ya şöyle olursa" senaryosu döner.',
  'Çocuğum yeni bir şeye güvenmeden önce onu test eder, sorgular veya garanti arar.',
  'Belirsizlik ve tehdit karşısında çocuğum tetikte ve temkinli olur.',
  'Çocuğuma "her şey yolunda" dense bile içinde bir tedirginlik kalabilir.',
  'Çocuğum karar verirken güvendiği birine danışınca rahatlar.',
  'Sadakat çocuğum için önemlidir; tarafını veya grubunu kolay değiştirmez.',
  'Çocuğum geleceği pek dert etmez; işlerin yoluna gireceğini düşünür.',
  'Çocuğum yeni insanlara ve durumlara kuşkuyla değil, rahatça güvenir.',

  'Yeni deneyimler, seçenekler ve heyecan çocuğumu canlandırır; sıkılmaktan kaçar.',
  'Çocuğumun aklı sık sık gelecekteki keyifli planlara ve yeni fikirlere atlar.',
  'Çocuğum sıkıntı ve olumsuzlukla uğraşmaktansa olumlu tarafa odaklanır.',
  'Çocuğum kısıtlanmış veya tek bir seçeneğe mahkum hissetmekten hoşlanmaz.',
  'Çocuğum enerjik ve iyimserdir; hayatı dolu dolu yaşamak ister.',
  'Bir planın iptal olması ya da seçeneklerinin azalması çocuğumun canını sıkar.',
  'Çocuğum sohbetlerde konudan konuya atlar; yeni fikirlerle kolayca heyecanlanır.',
  'Çocuğum olumsuz düşünceleri uzun süre taşımak yerine hızla moralini toparlar.',
  'Çocuğum tek bir işe uzun süre odaklanmakta zorlanmaz; sakinlikten hoşlanır.',
  'Çocuğum yeni heyecanlar aramaktansa tanıdık, sade ve oturmuş bir düzeni tercih eder.',

  'Çocuğum güçlü olmak ve kendi hayatının kontrolünde olmak ister.',
  'Çocuğum haksızlık karşısında çekinmeden ve doğrudan tavır alır.',
  'Kontrolün başkasında olması veya ona hükmedilmesi çocuğumu rahatsız eder.',
  'Çocuğum açık sözlü ve doğrudandır; ne düşündüğünü söylemekten çekinmez.',
  'Çocuğum zayıf ya da savunmasız görünmektense güçlü durmayı tercih eder.',
  'Çocuğum bir ortamda doğal olarak sorumluluk veya liderlik üstlenir.',
  'Çocuğum gücü olanın güçsüzü ezmesine tahammül edemez; zayıfın yanında durur.',
  'Çocuğum kararlıdır; bir şeye inandığında engellere rağmen üstüne gider.',
  'Çocuğum çatışmadan kaçınır ve kontrolü başkasına bırakmakta zorlanmaz.',
  'Çocuğum sertlik yerine yumuşaklıkla yaklaşmayı daha doğal bulur.',

  'Çocuğum çatışma ve gerginlikten kaçınır; ortamı yumuşatmaya çalışır.',
  'Çocuğum çevresindekilerle uyum ve huzur içinde olmaya çok değer verir.',
  'Çocuğum kendi isteğini öne çıkarmak yerine akışa uyum sağlamayı tercih eder.',
  'Çocuğum bazen önemli işleri erteler; rahatını bozmamak için oyalanır.',
  'Çocuğum sakin, hoşgörülü ve uzlaşmacıdır; kimseyi kırmak istemez.',
  'Tartışma çıkacağını sezdiğinde çocuğum geri çekilir veya konuyu değiştirir.',
  'Çocuğum başkalarının görüşlerine kolayca uyum sağlar ve kendi isteğini erteler.',
  'Çocuğum huzurunu bozacak ani değişikliklerden hoşlanmaz.',
  'Çocuğum kendi isteğini net biçimde ortaya koyar ve gerekirse çatışmayı göze alır.',
  'Çocuğum karar verince oyalanmadan hemen harekete geçer.'
];

SORULAR.forEach(function(q, i){ q.cocuk = COCUK_METINLER[i] || q.metin; });

/* Dışa aç (modül değiliz; global) */
window.MIZAC = { TIPLER: TIPLER, SORULAR: SORULAR, MERKEZLER: MERKEZLER, OKLAR: OKLAR, KANATLAR: KANATLAR, GLYPH: GLYPH };
