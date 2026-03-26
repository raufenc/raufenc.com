/* ============================================================
   Kayı Tarih Atlası — Olaylar & Savaşlar
   ============================================================ */

const EVENTS = [
  // ── Ertuğrul Dönemi ──
  {
    id: "e01", year: 1230, period: "ertugrul",
    title: { tr: "Kayıların Anadolu'ya Gelişi", en: "Kayı Arrival in Anatolia" },
    desc: {
      tr: "Ertuğrul Gazi liderliğindeki Kayı boyu, Moğol baskısından kaçarak Anadolu Selçuklu Devleti topraklarına sığındı. Sultan Alâeddin Keykubâd, onlara Söğüt ve Domaniç yaylalarını yurt olarak verdi.",
      en: "The Kayı tribe, led by Ertuğrul Ghazi, fled Mongol pressure and took refuge in Anatolian Seljuk territory. Sultan Alaeddin Keykubad granted them Söğüt and Domaniç pastures as homeland."
    },
    locations: [13, 14, 12], type: "political"
  },
  {
    id: "e02", year: 1281, period: "ertugrul",
    title: { tr: "Ertuğrul Gazi'nin Vefatı", en: "Death of Ertuğrul Ghazi" },
    desc: {
      tr: "Ertuğrul Gazi Söğüt'te vefat etti. Oğlu Osman Bey beyliğin başına geçti. Ertuğrul'un türbesi bugün hâlâ Söğüt'tedir.",
      en: "Ertuğrul Ghazi died in Söğüt. His son Osman Bey assumed leadership. Ertuğrul's tomb still stands in Söğüt today."
    },
    locations: [13], type: "political"
  },

  // ── Osman Dönemi ──
  {
    id: "e03", year: 1284, period: "osman",
    title: { tr: "Ermeni Beli Çarpışması", en: "Battle of Ermeni Beli" },
    desc: {
      tr: "Osman Bey'in bilinen ilk muharebesi. Yeğeni Bayhoca şehit düştü. Bu çarpışma Osmanlıların uç beyliği olarak ilk askerî faaliyetini temsil eder.",
      en: "Osman Bey's first known battle. His nephew Bayhoca was martyred. This engagement represents the first military activity of the Ottomans as a frontier principality."
    },
    locations: [21], type: "battle"
  },
  {
    id: "e04", year: 1285, period: "osman",
    title: { tr: "Kulacahisar'ın Fethi", en: "Capture of Kulacahisar" },
    desc: {
      tr: "Osmanlıların ele geçirdiği ilk kale. Osman Bey gece baskınıyla kaleyi aldı. Bu olay, küçük bir aşiretten devlete dönüşümün ilk somut adımıdır.",
      en: "First castle ever captured by the Ottomans. Osman Bey took the castle in a night raid. This event marks the first concrete step from tribe to state."
    },
    locations: [22], type: "conquest"
  },
  {
    id: "e05", year: 1288, period: "osman",
    title: { tr: "Karacahisar'ın Fethi", en: "Capture of Karacahisar" },
    desc: {
      tr: "Osman'ın ele geçirdiği ilk büyük kale. Burada ilk hutbe okundu ve Osmanlı Devleti'nin fiilen kurulduğu kabul edilir. Selçuklu Sultanı, Osman'a Eskişehir'i tahsis etti.",
      en: "First major fortress captured by Osman. The first khutba was read here, marking the de facto establishment of the Ottoman state. The Seljuk Sultan granted Eskişehir to Osman."
    },
    locations: [16, 19], type: "conquest"
  },
  {
    id: "e06", year: 1299, period: "osman",
    title: { tr: "Bilecik'in Fethi (Düğün Baskını)", en: "Capture of Bilecik (Wedding Feast Ruse)" },
    desc: {
      tr: "Osman Bey, Çakırpınar'daki düğün ziyafetinde Bizans tekfurlarına pusu kurdu. Bilecik, Yarhisar ve İnegöl bir gecede Osmanlı topraklarına katıldı. Bu olay, Osmanlı Devleti'nin bağımsızlık ilânı olarak kabul edilir.",
      en: "Osman Bey ambushed Byzantine tekfurs at a wedding feast in Çakırpınar. Bilecik, Yarhisar, and İnegöl fell to Ottoman control in one night. This event is considered the declaration of Ottoman independence."
    },
    locations: [15, 27, 17, 18], type: "conquest"
  },
  {
    id: "e07", year: 1302, period: "osman",
    title: { tr: "Koyunhisar (Bapheus) Muharebesi", en: "Battle of Bapheus (Koyunhisar)" },
    desc: {
      tr: "Osman'ın Bizans sahra ordusuna karşı ilk büyük zaferi. Bizans İmparatoru tarafından gönderilen ordu ağır yenilgiye uğradı. Bu zafer, Osmanlıların Bitinya'daki hâkimiyetini pekiştirdi ve adlarını tüm Bizans dünyasına duyurdu.",
      en: "Osman's first major victory over a Byzantine field army. The army sent by the Byzantine Emperor was heavily defeated. This victory consolidated Ottoman dominance in Bithynia and made their name known throughout the Byzantine world."
    },
    locations: [25], type: "battle"
  },

  // ── Orhan Dönemi ──
  {
    id: "e08", year: 1326, period: "orhan",
    title: { tr: "Bursa'nın Fethi", en: "Conquest of Bursa" },
    desc: {
      tr: "Uzun kuşatmanın ardından Bursa teslim oldu ve Osmanlı Devleti'nin ilk büyük başkenti oldu. Osman Gazi'nin cenazesi Bursa'ya defnedildi. Orhan burada ilk Osmanlı sikkesini bastırdı.",
      en: "After a long siege, Bursa surrendered and became the first major Ottoman capital. Osman Ghazi's body was buried in Bursa. Orhan minted the first Ottoman coin here."
    },
    locations: [29], type: "conquest"
  },
  {
    id: "e09", year: 1329, period: "orhan",
    title: { tr: "Pelekanon Muharebesi", en: "Battle of Pelekanon" },
    desc: {
      tr: "İlk Osmanlı-İmparator muharebesi. Orhan, İmparator III. Andronikos'u yendi. Bu zaferle Bizans, Anadolu'daki son topraklarını savunma umudunu kaybetti.",
      en: "First Ottoman-Emperor battle. Orhan defeated Emperor Andronikos III. With this victory, Byzantium lost hope of defending its last territories in Anatolia."
    },
    locations: [42], type: "battle"
  },
  {
    id: "e10", year: 1331, period: "orhan",
    title: { tr: "İznik'in Fethi", en: "Conquest of Nicaea" },
    desc: {
      tr: "Bizans İmparatorluğu'nun eski başkenti İznik (Nicaea) Osmanlılara teslim oldu. Bu psikolojik zafer, Osmanlıların artık bir beylik değil, devlet olduğunu gösterdi.",
      en: "The former Byzantine capital Nicaea surrendered to the Ottomans. This psychological victory showed that the Ottomans were no longer a principality but a state."
    },
    locations: [30], type: "conquest"
  },
  {
    id: "e11", year: 1337, period: "orhan",
    title: { tr: "İzmit'in Fethi", en: "Conquest of Nicomedia" },
    desc: {
      tr: "Son Bizans Bithynia kalesi olan İzmit düştü. Osmanlılar artık Marmara'nın güney kıyısını tamamen kontrol ediyordu.",
      en: "The last Byzantine Bithynian stronghold fell. The Ottomans now controlled the entire southern coast of the Sea of Marmara."
    },
    locations: [31], type: "conquest"
  },
  {
    id: "e12", year: 1345, period: "orhan",
    title: { tr: "Karesi Beyliği'nin İlhakı", en: "Annexation of Karesid Beylik" },
    desc: {
      tr: "Barışçıl yolla ilhak edilen ilk beylik. Karesioğulları'nın deniz gücü ve askerleri (Hacı İlbey, Evrenos Bey) Osmanlılara katıldı. Bu ilhak, Rumeli'ye geçişin kapısını açtı.",
      en: "First beylik peacefully annexed. The Karesid navy and warriors (Hacı İlbey, Evrenos Bey) joined the Ottomans. This annexation opened the door to crossing into Rumelia."
    },
    locations: [105, 106], type: "political"
  },
  {
    id: "e13", year: 1352, period: "orhan",
    title: { tr: "Çimpe Kalesi — Avrupa'ya İlk Adım", en: "Tzympe — First Step into Europe" },
    desc: {
      tr: "Bizanslı müttefik Kantakuzenos'un çağrısıyla Süleyman Paşa Gelibolu'ya geçti. Çimpe Kalesi, Avrupa topraklarındaki ilk Osmanlı mevzisi oldu.",
      en: "At the invitation of Byzantine ally Cantacuzenus, Süleyman Pasha crossed to Gallipoli. Tzympe became the first Ottoman-held fortification on European soil."
    },
    locations: [60, 59], type: "conquest"
  },

  // ── I. Murad Dönemi ──
  {
    id: "e14", year: 1361, period: "murad",
    title: { tr: "Edirne'nin Fethi", en: "Conquest of Edirne" },
    desc: {
      tr: "Adrianopolis (Edirne) Osmanlı ordusuna teslim oldu. Burası İkinci Osmanlı Başkenti olacak ve 1453'e kadar hükümet merkezi kalacaktı. Trakya'nın kapısı açıldı.",
      en: "Adrianople (Edirne) surrendered to the Ottoman army. It would become the Second Ottoman Capital and seat of government until 1453. The gateway to Thrace was opened."
    },
    locations: [63], type: "conquest"
  },
  {
    id: "e15", year: 1371, period: "murad",
    title: { tr: "Sırpsındığı / Meriç Muharebesi", en: "Battle of Maritsa (Chernomen)" },
    desc: {
      tr: "Hacı İlbey komutasındaki Osmanlı öncü kuvvetleri, çok daha kalabalık Sırp ordusunu Meriç kıyısında gece baskınıyla imha etti. Sırp kralları Vukašin ve Uglješa hayatlarını kaybetti. Makedonya Osmanlılara açıldı.",
      en: "Ottoman vanguard forces under Hacı İlbey annihilated the much larger Serbian army in a night raid on the Maritsa River. Serbian kings Vukašin and Uglješa perished. Macedonia was opened to the Ottomans."
    },
    locations: [83], type: "battle"
  },
  {
    id: "e16", year: 1374, period: "murad",
    title: { tr: "Hamidoğulları Topraklarının Satın Alınması", en: "Purchase of Hamidid Territories" },
    desc: {
      tr: "I. Murad, savaş yerine diplomasi kullanarak Hamidoğulları'ndan Burdur, Beyşehir, Seydişehir ve çevresini satın aldı. Osmanlı genişlemesinin her zaman askerî olmadığının önemli kanıtı.",
      en: "Murad I used diplomacy instead of war, purchasing Burdur, Beyşehir, Seydişehir and surroundings from the Hamidids. Important evidence that Ottoman expansion was not always military."
    },
    locations: [108, 110, 111], type: "political"
  },
  {
    id: "e17", year: 1389, period: "murad",
    title: { tr: "Kosova Meydan Muharebesi", en: "Battle of Kosovo" },
    desc: {
      tr: "Osmanlı tarihinin en önemli muharebelerinden biri. I. Murad, Sırp-Bosnalı-Arnavut koalisyonunu Kosova Ovası'nda yendi ancak savaş meydanında şehit düştü. Bu zafer, Osmanlı Balkan hâkimiyetini kesin olarak kurdu.",
      en: "One of the most important battles in Ottoman history. Murad I defeated the Serbian-Bosnian-Albanian coalition at Kosovo Polje but was martyred on the battlefield. This victory definitively established Ottoman Balkan hegemony."
    },
    locations: [82, 127], type: "battle"
  },

  // ── I. Bayezid Dönemi ──
  {
    id: "e18", year: 1390, period: "bayezid",
    title: { tr: "Batı Anadolu Beyliklerinin İlhakı", en: "Annexation of Western Anatolian Beyliks" },
    desc: {
      tr: "Yıldırım Bayezid, hızlı bir seferle Aydınoğulları, Saruhanoğulları, Menteşeoğulları ve Germiyanoğulları beyliklerini Osmanlı topraklarına kattı. Tüm Batı Anadolu Osmanlı kontrolüne geçti.",
      en: "Bayezid the Thunderbolt, in a rapid campaign, annexed the Aydinid, Saruhanid, Menteshid, and Germiyanid beyliks. All of Western Anatolia came under Ottoman control."
    },
    locations: [102, 104, 101, 99], type: "conquest"
  },
  {
    id: "e19", year: 1393, period: "bayezid",
    title: { tr: "Tırnova'nın Fethi — Bulgar Devleti'nin Sonu", en: "Fall of Tarnovo — End of Bulgaria" },
    desc: {
      tr: "Bulgar başkenti Tırnova düştü ve ortaçağ Bulgar bağımsızlığı sona erdi. Bulgaristan tamamen Osmanlı vilayeti oldu.",
      en: "The Bulgarian capital Tarnovo fell, ending medieval Bulgarian independence. Bulgaria became entirely an Ottoman province."
    },
    locations: [78], type: "conquest"
  },
  {
    id: "e20", year: 1396, period: "bayezid",
    title: { tr: "Niğbolu Muharebesi", en: "Battle of Nicopolis" },
    desc: {
      tr: "Bayezid, tüm Avrupa'dan toplanan büyük Haçlı ordusunu Niğbolu'da ağır yenilgiye uğrattı. Fransız, İngiliz, Macar, Alman ve Burgondiya şövalyeleri savaş esiri alındı. Bu zafer Osmanlıları Avrupa'nın en büyük askerî gücü ilân etti.",
      en: "Bayezid inflicted a heavy defeat on the great Crusader army assembled from all over Europe at Nicopolis. French, English, Hungarian, German, and Burgundian knights were taken prisoner. This victory proclaimed the Ottomans as Europe's greatest military power."
    },
    locations: [76, 128], type: "battle"
  },
  {
    id: "e21", year: 1402, period: "bayezid",
    title: { tr: "Ankara Muharebesi — Osmanlı'nın Büyük Felaketi", en: "Battle of Ankara — Ottoman Catastrophe" },
    desc: {
      tr: "Timur, Çubuk Ovası'nda Bayezid I'i yenerek esir aldı. Bayezid esarette vefat etti. Osmanlı Devleti parçalandı ve 11 yıl sürecek Fetret Devri (Saltanat Kavgası) başladı. Anadolu beylikleri yeniden bağımsızlıklarını ilan etti.",
      en: "Timur defeated and captured Bayezid I on the Çubuk Plain. Bayezid died in captivity. The Ottoman state fragmented and the 11-year Interregnum (Fetret Devri) began. Anatolian beyliks re-declared their independence."
    },
    locations: [95, 129], type: "battle"
  },

  // ── Fetret Devri & Çelebi Mehmed ──
  {
    id: "e22", year: 1413, period: "celebi",
    title: { tr: "Çelebi Mehmed'in Tahta Çıkışı — Birliğin Yeniden Tesisi", en: "Mehmed I's Accession — Restoration of Unity" },
    desc: {
      tr: "11 yıllık taht kavgasının ardından Çelebi Mehmed tüm kardeşlerini yenerek Osmanlı birliğini yeniden kurdu. Edirne'de tahta çıktı ve devleti yeniden inşa etmeye başladı.",
      en: "After 11 years of civil war, Mehmed I defeated all his brothers and restored Ottoman unity. He ascended the throne in Edirne and began rebuilding the state."
    },
    locations: [63], type: "political"
  }
];

// ═══════════════════════════════════════════════════════════
// PADİŞAH BİLGİLERİ
// ═══════════════════════════════════════════════════════════

const SULTANS = [
  {
    id: "ertugrul", period: "ertugrul",
    name: { tr: "Ertuğrul Gazi", en: "Ertuğrul Ghazi" },
    reign: { tr: "~1230 – 1281", en: "c.1230 – 1281" },
    title: { tr: "Kayı Boyu Beyi", en: "Chief of the Kayı Tribe" },
    desc: {
      tr: "Kayı boyunun önderi. Söğüt ve Domaniç'te beyliğin temellerini attı. Selçuklu sultanına bağlılığını sürdürerek Bizans ucunda gazâ faaliyetlerini yürüttü.",
      en: "Leader of the Kayı tribe. He laid the foundations of the principality in Söğüt and Domaniç. He maintained loyalty to the Seljuk sultan while conducting gaza activities on the Byzantine frontier."
    },
    capital: { tr: "Söğüt", en: "Söğüt" },
    color: "#CC8400"
  },
  {
    id: "osman", period: "osman",
    name: { tr: "Osman Gazi", en: "Osman I" },
    reign: { tr: "1299 – 1326", en: "1299 – 1326" },
    title: { tr: "Osmanlı Devleti'nin Kurucusu", en: "Founder of the Ottoman State" },
    desc: {
      tr: "Beylikten devlete geçişi sağladı. İlk hutbeyi okuttu, ilk fetihleri gerçekleştirdi. Bapheus'ta Bizans'a karşı büyük zafer kazandı. Bursa kuşatmasını başlattı ancak şehrin fethini göremedi.",
      en: "He achieved the transition from principality to state. He had the first khutba read and carried out the first conquests. He won a great victory against Byzantium at Bapheus. He began the siege of Bursa but did not live to see its fall."
    },
    capital: { tr: "Söğüt → Yenişehir", en: "Söğüt → Yenişehir" },
    color: "#8B0000"
  },
  {
    id: "orhan", period: "orhan",
    name: { tr: "Orhan Gazi", en: "Orhan Ghazi" },
    reign: { tr: "1326 – 1362", en: "1326 – 1362" },
    title: { tr: "Devlet Mimarı", en: "State Architect" },
    desc: {
      tr: "İlk Osmanlı sikkesini bastırdı, ilk medreseyi kurdu, ilk vezirlik makamını oluşturdu. Bursa'yı başkent yaptı. İznik ve İzmit'i fethetti. Avrupa'ya ilk adımı attı. Karesi Beyliği'ni ilhak ederek Osmanlıları deniz gücü yaptı.",
      en: "He minted the first Ottoman coin, founded the first madrasah, and created the first vizierate. He made Bursa the capital. He conquered Nicaea and Nicomedia. He took the first step into Europe. By annexing the Karesid Beylik, he turned the Ottomans into a naval power."
    },
    capital: { tr: "Bursa", en: "Bursa" },
    color: "#2563EB"
  },
  {
    id: "murad", period: "murad",
    name: { tr: "I. Murad (Hüdâvendigâr)", en: "Murad I (Hüdâvendigâr)" },
    reign: { tr: "1362 – 1389", en: "1362 – 1389" },
    title: { tr: "Balkan Fatihi, Şehit Padişah", en: "Conqueror of the Balkans, Martyred Sultan" },
    desc: {
      tr: "Edirne'yi fethederek ikinci başkent yaptı. Yeniçeri Ocağı'nı ve Devşirme sistemini kurdu. Tımâr düzenini oluşturdu. Meriç ve Kosova'da büyük zaferler kazandı. Kosova'da şehit düşen ilk ve tek Osmanlı padişahıdır.",
      en: "He conquered Edirne and made it the second capital. He established the Janissary corps and Devshirme system. He created the Timar system. He won great victories at Maritsa and Kosovo. He is the first and only Ottoman sultan martyred in battle."
    },
    capital: { tr: "Edirne", en: "Edirne" },
    color: "#16A34A"
  },
  {
    id: "bayezid", period: "bayezid",
    name: { tr: "I. Bayezid (Yıldırım)", en: "Bayezid I (the Thunderbolt)" },
    reign: { tr: "1389 – 1402", en: "1389 – 1402" },
    title: { tr: "Anadolu ve Rumeli'nin Birleştiricisi", en: "Unifier of Anatolia and Rumelia" },
    desc: {
      tr: "Hızlı seferleriyle 'Yıldırım' lakabını aldı. Anadolu beyliklerinin çoğunu ilhak etti. Niğbolu'da büyük Haçlı ordusunu yendi. İstanbul'u abluka altına aldı. Ancak Timur'a yenilerek esir düştü ve esarette vefat etti.",
      en: "He earned the nickname 'Thunderbolt' for his rapid campaigns. He annexed most Anatolian beyliks. He defeated the great Crusader army at Nicopolis. He blockaded Constantinople. But he was defeated by Timur, captured, and died in captivity."
    },
    capital: { tr: "Edirne", en: "Edirne" },
    color: "#DC2626"
  },
  {
    id: "celebi", period: "celebi",
    name: { tr: "Çelebi Sultan Mehmed", en: "Mehmed I (Çelebi)" },
    reign: { tr: "1413 – 1421", en: "1413 – 1421" },
    title: { tr: "İkinci Kurucu", en: "Second Founder" },
    desc: {
      tr: "Fetret Devri'ndeki taht kavgasını kazanarak Osmanlı birliğini yeniden kurdu. Devleti diplomatik ve askerî tedbirlerle toparladı. 'İkinci Kurucu' olarak anılır.",
      en: "He won the succession struggle during the Interregnum and restored Ottoman unity. He rebuilt the state through diplomatic and military measures. He is remembered as the 'Second Founder'."
    },
    capital: { tr: "Edirne", en: "Edirne" },
    color: "#7C3AED"
  }
];
