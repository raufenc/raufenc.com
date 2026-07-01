/* BEYLİKTEN CİHANA — oyun verisi (çok-ajanlı üretildi, tarihî doğruluğu çapraz denetlendi) */
window.OYUN_VERISI = {
 "ayarlar": {
  "maas": 2000,
  "baslangicPara": 15000,
  "esaretCikisBedeli": 500
 },
 "gruplar": {
  "kurulus": {
   "ad": "Kuruluş Toprakları",
   "renk": "#6b4423"
  },
  "erkenanadolu": {
   "ad": "Erken Fetihler",
   "renk": "#5b9bd5"
  },
  "ilkbaskent": {
   "ad": "İlk Başkentler",
   "renk": "#d44e8c"
  },
  "rumeli": {
   "ad": "Rumeli",
   "renk": "#e8862b"
  },
  "anadolu": {
   "ad": "Anadolu Yâdigârı",
   "renk": "#c0392b"
  },
  "samcezire": {
   "ad": "Şam ve Cezîre",
   "renk": "#caa000"
  },
  "buyuksehir": {
   "ad": "Büyük Şehirler",
   "renk": "#1e9e54"
  },
  "tac": {
   "ad": "Devletin Tâcı",
   "renk": "#1f3a93"
  }
 },
 "imarKademeleri": [
  {
   "ad": "Han",
   "aciklama": "Tüccarların ve yolcuların konakladığı, malların saklandığı ticaret yapısı."
  },
  {
   "ad": "Hamam",
   "aciklama": "Şehir hayatının vazgeçilmez temizlik yapısı; geliri çoğu kez vakfa bağlıydı."
  },
  {
   "ad": "Medrese",
   "aciklama": "İlmin öğretildiği, müderrislerin ders verdiği yüksek eğitim kurumu."
  },
  {
   "ad": "Cami",
   "aciklama": "İbadetin ve mahalle hayatının merkezi; şehrin manevi çekirdeği."
  },
  {
   "ad": "Külliye",
   "aciklama": "Cami çevresinde medrese, imaret, darüşşifa ve hamamı toplayan büyük yapı topluluğu (en üst kademe)."
  }
 ],
 "kareler": [
  {
   "pos": 0,
   "tip": "baslangic",
   "ad": "Sefer Meydanı",
   "aciklama": "Ordunun sefere çıkmadan önce toplandığı meydan; her yıl yeni bir fetih buradan başlar.",
   "kural": "Tahtada her tam tur attığında buradan geçer, 2.000 akçe ulûfe (maaş) alırsın."
  },
  {
   "pos": 1,
   "tip": "sehir",
   "ad": "Söğüt",
   "grupKey": "kurulus",
   "grup": {
    "ad": "Kuruluş Toprakları",
    "renk": "#6b4423"
   },
   "fiyat": 600,
   "ipotek": 300,
   "imarBedeli": 500,
   "kira": [
    60,
    300,
    900,
    2700,
    3900,
    4800
   ],
   "tarih": "Beyliğin doğuşu: 13. yüzyıl sonu",
   "bilgi": "Söğüt, Osmanlı Beyliği'nin doğduğu yer olarak kabul edilir. Ertuğrul Gazi önderliğindeki Kayı boyu bu bölgeye yerleşmiş, oğlu Osman Bey döneminde beyliğin merkezi haline gelmiştir. Ertuğrul Gazi'nin türbesi bugün de Söğüt'tedir.",
   "neden": "Söğüt, küçük bir uç beyliğinin nasıl bir cihan devletine dönüşebileceğini ve her büyük gücün mütevazı bir başlangıcı olduğunu öğretir.",
   "gorsel": "img/sogut.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 2,
   "tip": "vakca",
   "ad": "Vak'a"
  },
  {
   "pos": 3,
   "tip": "sehir",
   "ad": "Domaniç",
   "grupKey": "kurulus",
   "grup": {
    "ad": "Kuruluş Toprakları",
    "renk": "#6b4423"
   },
   "fiyat": 600,
   "ipotek": 300,
   "imarBedeli": 500,
   "kira": [
    60,
    300,
    900,
    2700,
    3900,
    4800
   ],
   "tarih": "Kayı yaylağı: 13.-14. yüzyıl",
   "bilgi": "Domaniç, Kayı boyunun yaylak olarak kullandığı dağlık bölgedir. Osmanlı geleneğine göre kışlağı Söğüt, yazlağı ise Domaniç yaylalarıydı. Bölge, beyliğin ilk büyüme döneminde önemli bir yerleşim ve hayvancılık alanı olmuştur.",
   "neden": "Domaniç, konargöçer Türkmen yaşam biçimini ve toprağa yerleşme sürecinin beyliğin temelini nasıl oluşturduğunu gösterir.",
   "gorsel": "img/domanic.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 4,
   "tip": "vergi",
   "ad": "Avârız Vergisi",
   "tutar": 2000,
   "aciklama": "Avârız, olağanüstü hâllerde — özellikle savaş zamanı — halktan toplanan, sonradan süreklileşen vergidir."
  },
  {
   "pos": 5,
   "tip": "liman",
   "ad": "İzmir Limanı",
   "kisa": "İzmir",
   "fiyat": 2000,
   "ipotek": 1000,
   "kira": [
    250,
    500,
    1000,
    2000
   ],
   "bilgi": "Ege'nin kapısı; Batı Anadolu'nun deniz ticaretinde yükselen büyük limanı.",
   "sahip": null,
   "ipotekli": false
  },
  {
   "pos": 6,
   "tip": "sehir",
   "ad": "Bilecik",
   "grupKey": "erkenanadolu",
   "grup": {
    "ad": "Erken Fetihler",
    "renk": "#5b9bd5"
   },
   "fiyat": 1000,
   "ipotek": 500,
   "imarBedeli": 500,
   "kira": [
    100,
    500,
    1500,
    4500,
    6500,
    8000
   ],
   "tarih": "Fetih: yaklaşık 1299",
   "bilgi": "Bilecik, Osman Bey döneminde Bizans'tan alınan ilk önemli yerleşim merkezlerindendir. Beyliğin Söğüt çevresinden çıkıp genişlemesinin ilk somut adımlarından sayılır; yerel tekfurlarla kurulan ilişkiler fethi kolaylaştırmıştır.",
   "neden": "Osmanlı'nın bir aşiretten devlete dönüşürken ilk topraklarını nasıl genişlettiğini gösterir.",
   "gorsel": "img/bilecik.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 7,
   "tip": "ferman",
   "ad": "Ferman"
  },
  {
   "pos": 8,
   "tip": "sehir",
   "ad": "Yenişehir",
   "grupKey": "erkenanadolu",
   "grup": {
    "ad": "Erken Fetihler",
    "renk": "#5b9bd5"
   },
   "fiyat": 1000,
   "ipotek": 500,
   "imarBedeli": 500,
   "kira": [
    100,
    500,
    1500,
    4500,
    6500,
    8000
   ],
   "tarih": "Osman Bey'in ilk merkezi (14. yy başı)",
   "bilgi": "Yenişehir, Osman Bey döneminde fethedilip beyliğin batıya, Bursa ve İznik'e ilerleyişinde ileri üs ve ilk gerçek idare merkezi işlevi gördü. Bursa kuşatmasının lojistik üssü oldu; adı 'yeni şehir' anlamına gelir.",
   "neden": "Göçebe kökenli bir beyliğin sabit bir yönetim merkezi kurarak devletleşmesini temsil eder.",
   "gorsel": "img/yenisehir.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 9,
   "tip": "sehir",
   "ad": "İznik",
   "grupKey": "erkenanadolu",
   "grup": {
    "ad": "Erken Fetihler",
    "renk": "#5b9bd5"
   },
   "fiyat": 1200,
   "ipotek": 600,
   "imarBedeli": 1000,
   "kira": [
    120,
    600,
    1800,
    5400,
    7800,
    9600
   ],
   "tarih": "Fetih: 1331 (Orhan Bey)",
   "bilgi": "Antik adı Nikaia olan İznik, surlarla çevrili stratejik bir Bizans şehriydi; Orhan Bey döneminde uzun bir kuşatmanın ardından (1331) Osmanlı'ya katıldı. Burada kurulan ilk Osmanlı medresesi ve ünlü çinileriyle önemli bir ilim ve sanat merkezine dönüştü.",
   "neden": "Fethin yalnızca askerî değil, medrese ve kültür kurumlarıyla kalıcı bir uygarlık inşası olduğunu öğretir.",
   "gorsel": "img/iznik.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 10,
   "tip": "esaret",
   "ad": "Esaret — Yedikule",
   "aciklama": "Yedikule, İstanbul surlarındaki ünlü hisar; tutsakların ve fidye bekleyenlerin yeridir.",
   "kural": "Buraya düşersen çift atana, 500 akçe fidye ödeyene ya da Ferman/Bilgi ile çıkana kadar beklersin."
  },
  {
   "pos": 11,
   "tip": "sehir",
   "ad": "Bursa",
   "grupKey": "ilkbaskent",
   "grup": {
    "ad": "İlk Başkentler",
    "renk": "#d44e8c"
   },
   "fiyat": 1400,
   "ipotek": 700,
   "imarBedeli": 1000,
   "kira": [
    140,
    700,
    2100,
    6300,
    9100,
    11200
   ],
   "tarih": "Fetih: 1326",
   "bilgi": "Orhan Gazi döneminde 1326'da fethedilen Bursa, beylikten devlete geçen Osmanlı'nın ilk büyük başkenti oldu. Ulu Cami, Yeşil Cami ve Yeşil Türbe gibi erken Osmanlı eserlerinin merkezidir; ipek ticaretiyle de önemli bir ekonomik merkezdi. Birçok ilk dönem padişahın türbesi buradadır.",
   "neden": "Bir uç beyliğinin kalıcı bir devlet başkentine dönüşerek kurumsallaşmasını oyuncuya gösterir.",
   "gorsel": "img/bursa.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 12,
   "tip": "utility",
   "ad": "Darphane",
   "fiyat": 1500,
   "ipotek": 750,
   "carpan": [
    4,
    10
   ],
   "bilgi": "Devletin altın ve gümüş sikkeyi (akçe) bastığı kurum; para basma yetkisi egemenlik simgesiydi.",
   "sahip": null,
   "ipotekli": false
  },
  {
   "pos": 13,
   "tip": "sehir",
   "ad": "Edirne",
   "grupKey": "ilkbaskent",
   "grup": {
    "ad": "İlk Başkentler",
    "renk": "#d44e8c"
   },
   "fiyat": 1400,
   "ipotek": 700,
   "imarBedeli": 1000,
   "kira": [
    140,
    700,
    2100,
    6300,
    9100,
    11200
   ],
   "tarih": "Fetih: 1361 (başkent ~1363)",
   "bilgi": "I. Murad döneminde fethedilen Edirne, Osmanlı'nın Rumeli'ye ve Avrupa'ya açılan başkenti haline geldi. Yaklaşık bir asır boyunca devlete merkezlik etti ve İstanbul'un fethi de buradan hazırlandı; Selimiye Camii gibi şaheserlerle klasik mimarinin doruğunu temsil eder. Şehir, Balkan fetihlerinin lojistik ve siyasi üssüydü.",
   "neden": "Devletin yönünü Anadolu'dan Avrupa'ya çevirerek bir imparatorluğa dönüşme sürecini vurgular.",
   "gorsel": "img/edirne.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 14,
   "tip": "sehir",
   "ad": "Filibe",
   "grupKey": "ilkbaskent",
   "grup": {
    "ad": "İlk Başkentler",
    "renk": "#d44e8c"
   },
   "fiyat": 1600,
   "ipotek": 800,
   "imarBedeli": 1000,
   "kira": [
    160,
    800,
    2400,
    7200,
    10400,
    12800
   ],
   "tarih": "Fetih: 1363 (Lala Şahin Paşa)",
   "bilgi": "Bugün Bulgaristan'da bulunan Filibe (Plovdiv), Rumeli'nin erken dönemde fethedilen önemli bir şehri olup uzun süre Rumeli Beylerbeyliği'nin merkezi olarak yönetildi. Meriç vadisindeki konumu sayesinde Balkanlar'a yapılan akınların ve iskân siyasetinin kilit durağıydı. Osmanlı'nın bölgedeki idari ve askeri örgütlenmesinin temel taşlarından biriydi.",
   "neden": "Fethedilen Balkan topraklarının kalıcı idari merkezlerle yönetilip yurt haline getirilmesini öğretir.",
   "gorsel": "img/filibe.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 15,
   "tip": "liman",
   "ad": "Selanik Limanı",
   "kisa": "Selanik",
   "fiyat": 2000,
   "ipotek": 1000,
   "kira": [
    250,
    500,
    1000,
    2000
   ],
   "bilgi": "Rumeli'nin en işlek limanlarından biri; Balkan ticaretinin can damarı.",
   "sahip": null,
   "ipotekli": false
  },
  {
   "pos": 16,
   "tip": "sehir",
   "ad": "Üsküp",
   "grupKey": "rumeli",
   "grup": {
    "ad": "Rumeli",
    "renk": "#e8862b"
   },
   "fiyat": 1800,
   "ipotek": 900,
   "imarBedeli": 1000,
   "kira": [
    180,
    900,
    2700,
    8100,
    11700,
    14400
   ],
   "tarih": "Fetih: 1392",
   "bilgi": "Vardar Nehri kıyısındaki Üsküp, 1392'de Osmanlı idaresine girdi ve Rumeli fetihlerinde ileri üs ile akıncı faaliyetlerinin merkezi oldu. Çarşısı, hanları ve hamamlarıyla önemli bir Balkan kültür ve ticaret şehri olarak gelişti.",
   "neden": "Rumeli'deki ilerleyişte Üsküp'ün ileri üs olarak stratejik önemini öğretir.",
   "gorsel": "img/uskup.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 17,
   "tip": "vakca",
   "ad": "Vak'a"
  },
  {
   "pos": 18,
   "tip": "sehir",
   "ad": "Saraybosna",
   "grupKey": "rumeli",
   "grup": {
    "ad": "Rumeli",
    "renk": "#e8862b"
   },
   "fiyat": 1800,
   "ipotek": 900,
   "imarBedeli": 1000,
   "kira": [
    180,
    900,
    2700,
    8100,
    11700,
    14400
   ],
   "tarih": "Bosna'nın fethi: 1463",
   "bilgi": "Bosna'nın fethinin (1463) ardından Saraybosna, vali İsa Bey İshakoviç'in kurduğu külliye, çarşı ve köprülerle bir şehir olarak gelişti; adı 'saray' kelimesinden gelir. Gazi Hüsrev Bey'in eserleriyle Bosna'nın idari ve kültürel merkezi oldu.",
   "neden": "Osmanlı'nın bir şehri külliye ve vakıf kurumlarıyla nasıl inşa edip kalkındırdığını gösterir.",
   "gorsel": "img/saraybosna.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 19,
   "tip": "sehir",
   "ad": "Belgrad",
   "grupKey": "rumeli",
   "grup": {
    "ad": "Rumeli",
    "renk": "#e8862b"
   },
   "fiyat": 2000,
   "ipotek": 1000,
   "imarBedeli": 1000,
   "kira": [
    200,
    1000,
    3000,
    9000,
    13000,
    16000
   ],
   "tarih": "Fetih: 1521 (Kanuni)",
   "bilgi": "Tuna ile Sava'nın birleştiği noktadaki Belgrad, Macar Krallığı'nın güneydeki önemli kalesiydi. Fatih 1456'da alamadı; şehir ancak Kanuni Sultan Süleyman tarafından 1521'de fethedildi ve Orta Avrupa'ya açılan kapı oldu.",
   "neden": "Bir kalenin stratejik konumunun fethi neden kritik kıldığını öğretir.",
   "gorsel": "img/belgrad.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 20,
   "tip": "kervansaray",
   "ad": "Kervansaray",
   "aciklama": "Tüccarların yol üstünde güvenle konakladığı menzil; bir mola yeri.",
   "kural": "Dinlenme durağıdır; burada herhangi bir işlem olmaz."
  },
  {
   "pos": 21,
   "tip": "sehir",
   "ad": "Konya",
   "grupKey": "anadolu",
   "grup": {
    "ad": "Anadolu Yâdigârı",
    "renk": "#c0392b"
   },
   "fiyat": 2200,
   "ipotek": 1100,
   "imarBedeli": 1500,
   "kira": [
    220,
    1100,
    3300,
    9900,
    14300,
    17600
   ],
   "tarih": "Selçuklu başkenti (13. yy)",
   "bilgi": "Konya, Anadolu Selçuklu Devleti'ne uzun süre başkentlik yapmış ve devletin siyasi-kültürel merkezi olmuştur. Sultan I. Alâeddin Keykubad döneminde mimari ve ilim açısından zirveye ulaşmış, Mevlânâ Celâleddin Rûmî'nin yaşayıp vefat ettiği şehir olarak tasavvuf kültürünün de başkenti sayılmıştır.",
   "neden": "Anadolu'nun Türkleşmesinde Selçuklu siyasi ve kültürel merkezinin nasıl şekillendiğini öğretir.",
   "gorsel": "img/konya.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 22,
   "tip": "ferman",
   "ad": "Ferman"
  },
  {
   "pos": 23,
   "tip": "sehir",
   "ad": "Kayseri",
   "grupKey": "anadolu",
   "grup": {
    "ad": "Anadolu Yâdigârı",
    "renk": "#c0392b"
   },
   "fiyat": 2200,
   "ipotek": 1100,
   "imarBedeli": 1500,
   "kira": [
    220,
    1100,
    3300,
    9900,
    14300,
    17600
   ],
   "tarih": "Selçuklu-Osmanlı dönüşümü (13.-15. yy)",
   "bilgi": "Kayseri, Anadolu Selçukluları döneminde önemli bir ticaret, ilim ve sanat merkezi olmuş; Gevher Nesibe Şifahanesi ve Tıp Medresesi gibi öncü kurumlara ev sahipliği yapmıştır. Selçuklu sonrası Eretnaoğulları, Kadı Burhaneddin ve Dulkadiroğulları gibi güçlerin denetimine girmiş, Karamanoğulları'nın elindeyken Fatih Sultan Mehmed döneminde (1474) kesin olarak Osmanlı topraklarına katılmıştır.",
   "neden": "Bir şehrin medrese ve şifahaneleriyle bilim ve ticaret merkezine dönüşmesini örneklendirir.",
   "gorsel": "img/kayseri.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 24,
   "tip": "sehir",
   "ad": "Sivas",
   "grupKey": "anadolu",
   "grup": {
    "ad": "Anadolu Yâdigârı",
    "renk": "#c0392b"
   },
   "fiyat": 2400,
   "ipotek": 1200,
   "imarBedeli": 1500,
   "kira": [
    240,
    1200,
    3600,
    10800,
    15600,
    19200
   ],
   "tarih": "Selçuklu ilim merkezi; Osmanlı'ya katılım (1398)",
   "bilgi": "Sivas, Anadolu Selçukluları ve İlhanlı döneminde Gök Medrese ve Çifte Minareli Medrese gibi anıtsal eserlerle önemli bir ilim ve kervan yolu merkezi olmuştur. Yıldırım Bayezid döneminde Osmanlı'ya katılmış, daha sonra Millî Mücadele'de toplanan Sivas Kongresi (1919) ile Türk tarihinde yeniden öne çıkmıştır.",
   "neden": "Bir kentin ortaçağ medrese geleneğinden milli mücadeleye uzanan tarihsel sürekliliğini gösterir.",
   "gorsel": "img/sivas.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 25,
   "tip": "liman",
   "ad": "Trabzon Limanı",
   "kisa": "Trabzon",
   "fiyat": 2000,
   "ipotek": 1000,
   "kira": [
    250,
    500,
    1000,
    2000
   ],
   "bilgi": "Karadeniz ticaretinin önemli iskelesi; İpek Yolu'nun deniz ucu.",
   "sahip": null,
   "ipotekli": false
  },
  {
   "pos": 26,
   "tip": "sehir",
   "ad": "Halep",
   "grupKey": "samcezire",
   "grup": {
    "ad": "Şam ve Cezîre",
    "renk": "#caa000"
   },
   "fiyat": 2600,
   "ipotek": 1300,
   "imarBedeli": 1500,
   "kira": [
    260,
    1300,
    3900,
    11700,
    16900,
    20800
   ],
   "tarih": "Osmanlı fethi: 1516",
   "bilgi": "Halep, 1516 Mercidabık Savaşı'nın ardından Yavuz Sultan Selim döneminde Memlûklerden alınarak Osmanlı topraklarına katıldı ve yüzyıllarca önemli bir eyalet merkezi oldu. Daha öncesinde Zengî atabeyi Nureddin Mahmud'un başkenti olarak Haçlılara karşı mücadelenin merkezlerinden biriydi. Kervan yolları üzerindeki konumu sayesinde Osmanlı döneminde Doğu Akdeniz ticaretinin en canlı şehirlerinden biri haline geldi.",
   "neden": "Bir şehrin ticaret yolları üzerindeki konumunun onu hem zenginlik hem de stratejik bir merkez yaptığını öğretir.",
   "gorsel": "img/halep.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 27,
   "tip": "sehir",
   "ad": "Şam",
   "grupKey": "samcezire",
   "grup": {
    "ad": "Şam ve Cezîre",
    "renk": "#caa000"
   },
   "fiyat": 2600,
   "ipotek": 1300,
   "imarBedeli": 1500,
   "kira": [
    260,
    1300,
    3900,
    11700,
    16900,
    20800
   ],
   "tarih": "Osmanlı fethi: 1516",
   "bilgi": "Şam, 1516'da Yavuz Sultan Selim'in Suriye'yi fethiyle Osmanlı yönetimine girdi ve Şam Eyaleti'nin merkezi oldu. Her yıl buradan yola çıkan Surre alayları ve hac kervanları nedeniyle 'hac yolunun kapısı' olarak büyük dinî ve idari öneme sahipti. Emevî Camii ve köklü ilim geleneğiyle İslam dünyasının önemli kültür merkezlerinden biri olmayı sürdürdü.",
   "neden": "Bir şehrin dinî ve idari işlevinin (hac kervanlarının toplanma noktası olması) onu imparatorluk için ne kadar değerli kıldığını gösterir.",
   "gorsel": "img/sam.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 28,
   "tip": "utility",
   "ad": "Büyük Vakıf",
   "fiyat": 1500,
   "ipotek": 750,
   "carpan": [
    4,
    10
   ],
   "bilgi": "Eğitim, sağlık ve hayrı (medrese, darüşşifa, imaret) gelirleriyle finanse eden büyük hayır kurumu.",
   "sahip": null,
   "ipotekli": false
  },
  {
   "pos": 29,
   "tip": "seref",
   "ad": "Kudüs",
   "tarih": "Osmanlı fethi: 1516-1517",
   "bilgi": "Kudüs, 1516-1517 seferiyle Yavuz Sultan Selim döneminde Osmanlı topraklarına katıldı ve dört yüzyıl boyunca Osmanlı yönetiminde kaldı. Kanuni Sultan Süleyman, şehrin bugün hâlâ ayakta olan surlarını yeniden inşa ettirerek Kudüs'e büyük önem verdi. Üç semavi din için kutsal sayılan şehir, Osmanlı'nın farklı inançları bir arada yönetme anlayışının önemli bir örneğiydi.",
   "neden": "Üç din için kutsal bir şehri yönetmenin, hoşgörü ve farklı toplulukları bir arada tutma becerisi gerektirdiğini öğretir.",
   "gorsel": "img/kudus.webp",
   "kural": "Kutsal belde — alınıp satılmaz, üzerine imar yapılmaz. Buraya saygıyla uğrayan, hizmet şerefi (Hâdimü'l-Harameyn) kazanır; bu şeref oyun sonu servetine katkı sağlar."
  },
  {
   "pos": 30,
   "tip": "surgun",
   "ad": "Sürgün",
   "aciklama": "Devlete karşı suç işleyenler uzak bir diyara sürülür; merkezden uzaklaştırılır.",
   "kural": "Buraya düşen oyuncu doğruca Esaret (Yedikule) hanesine gönderilir."
  },
  {
   "pos": 31,
   "tip": "sehir",
   "ad": "Kahire",
   "grupKey": "buyuksehir",
   "grup": {
    "ad": "Büyük Şehirler",
    "renk": "#1e9e54"
   },
   "fiyat": 3000,
   "ipotek": 1500,
   "imarBedeli": 2000,
   "kira": [
    300,
    1500,
    4500,
    13500,
    19500,
    24000
   ],
   "tarih": "Osmanlı'ya katılışı: 1517",
   "bilgi": "Fatımîler tarafından kurulan Kahire, sonradan Memlûk Devleti'nin başkenti ve İslam dünyasının en önemli ilim merkezlerinden biri oldu. 1517'de Yavuz Sultan Selim'in Mısır seferiyle Osmanlı topraklarına katıldı ve halifeliğin Osmanlı'ya geçmesinde dönüm noktası oldu. El-Ezher medresesiyle yüzyıllarca İslam ilminin kalbi sayıldı.",
   "neden": "Mısır'ın fethi Osmanlı'yı İslam dünyasının lideri konumuna taşıyan stratejik bir kazanımdır.",
   "gorsel": "img/kahire.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 32,
   "tip": "sehir",
   "ad": "Bağdat",
   "grupKey": "buyuksehir",
   "grup": {
    "ad": "Büyük Şehirler",
    "renk": "#1e9e54"
   },
   "fiyat": 3000,
   "ipotek": 1500,
   "imarBedeli": 2000,
   "kira": [
    300,
    1500,
    4500,
    13500,
    19500,
    24000
   ],
   "tarih": "IV. Murad'ın fethi: 1638",
   "bilgi": "Abbasî Devleti'nin başkenti olarak kurulan Bağdat, Beytülhikme (Bilgelik Evi) ile İslam'ın altın çağında bilim ve tercüme faaliyetlerinin merkeziydi. 1258'de Moğol istilasıyla büyük yıkım yaşadı; uzun bir Safevî-Osmanlı çekişmesinin ardından 1638'de IV. Murad tarafından kesin olarak Osmanlı'ya bağlandı. Doğu seferlerinde sınır şehri olarak askerî önem taşıdı.",
   "neden": "Bağdat, Osmanlı-Safevî mücadelesinde doğu sınırının kilit şehri ve İslam ilim mirasının sembolüdür.",
   "gorsel": "img/bagdat.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 33,
   "tip": "vakca",
   "ad": "Vak'a"
  },
  {
   "pos": 34,
   "tip": "sehir",
   "ad": "Basra",
   "grupKey": "buyuksehir",
   "grup": {
    "ad": "Büyük Şehirler",
    "renk": "#1e9e54"
   },
   "fiyat": 3200,
   "ipotek": 1600,
   "imarBedeli": 2000,
   "kira": [
    320,
    1600,
    4800,
    14400,
    20800,
    25600
   ],
   "tarih": "Osmanlı'ya katılışı: 1538",
   "bilgi": "Hz. Ömer döneminde kurulan Basra, Basra Körfezi'ne yakın konumuyla erken İslam tarihinde önemli bir ticaret ve ilim merkeziydi. 1538'de Kanunî Sultan Süleyman döneminde Osmanlı egemenliğine girdi ve Hint Okyanusu ticaret yollarının kontrolünde stratejik bir üs oldu. Portekiz'le Basra Körfezi'ndeki rekabette Osmanlı'nın güney kapısını oluşturdu.",
   "neden": "Basra, Osmanlı'nın körfez ticaretine ve deniz gücüne açılan güney limanı olarak önemini öğretir.",
   "gorsel": "img/basra.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 35,
   "tip": "liman",
   "ad": "İskenderiye Limanı",
   "kisa": "İskenderiye",
   "fiyat": 2000,
   "ipotek": 1000,
   "kira": [
    250,
    500,
    1000,
    2000
   ],
   "bilgi": "Akdeniz'de Mısır'ın büyük limanı; Doğu-Batı ticaretinin kavşağı.",
   "sahip": null,
   "ipotekli": false
  },
  {
   "pos": 36,
   "tip": "ferman",
   "ad": "Ferman"
  },
  {
   "pos": 37,
   "tip": "sehir",
   "ad": "İstanbul",
   "grupKey": "tac",
   "grup": {
    "ad": "Devletin Tâcı",
    "renk": "#1f3a93"
   },
   "fiyat": 4000,
   "ipotek": 2000,
   "imarBedeli": 2000,
   "kira": [
    400,
    2000,
    6000,
    18000,
    26000,
    32000
   ],
   "tarih": "Fetih: 1453",
   "bilgi": "İstanbul, 1453'te Fatih Sultan Mehmed tarafından fethedilerek Bizans İmparatorluğu'na son verildi ve Osmanlı Devleti'nin başkenti oldu. Topkapı Sarayı, kapalıçarşı ve Süleymaniye gibi yapılarla devletin siyasi, ekonomik ve kültürel merkezi hâline geldi. Boğaz'ın iki kıtayı birleştiren konumu sayesinde yüzyıllarca dünya ticaretinin ve diplomasisinin kalbi olarak öne çıktı.",
   "neden": "İstanbul'un fethi bir çağı kapatıp yenisini açmış, şehri imparatorluğun gücünün ve sürekliliğinin sembolü hâline getirmiştir.",
   "gorsel": "img/istanbul.webp",
   "sahip": null,
   "imar": 0,
   "ipotekli": false
  },
  {
   "pos": 38,
   "tip": "vergi",
   "ad": "Gümrük Vergisi",
   "tutar": 1000,
   "aciklama": "Gümrük (öşür/bâc), sınırlardan ve pazarlardan geçen mallardan alınan ticaret vergisidir."
  },
  {
   "pos": 39,
   "tip": "seref",
   "ad": "Haremeyn",
   "tarih": "Osmanlı hâkimiyeti: 1517",
   "bilgi": "Haremeyn, İslam'ın iki kutsal şehri Mekke ve Medine'yi birlikte ifade eden terimdir. Yavuz Sultan Selim'in 1517'de Memlük Devleti'ne son vermesiyle bu kutsal toprakların korunması Osmanlı'ya geçti ve padişahlar bundan sonra 'Hâdimü'l-Haremeyni'ş-Şerifeyn' (İki Kutsal Şehrin Hizmetkârı) unvanını kullandı. Surre alayları ile her yıl bu bölgeye yardımlar gönderilir, hac yolları güvence altına alınırdı.",
   "neden": "Haremeyn'in korunması Osmanlı padişahına İslam dünyasında manevi liderlik ve hilafet meşruiyeti kazandırmıştır.",
   "gorsel": "img/haremeyn.webp",
   "kural": "Kutsal belde — alınıp satılmaz, üzerine imar yapılmaz. Buraya saygıyla uğrayan, hizmet şerefi (Hâdimü'l-Harameyn) kazanır; bu şeref oyun sonu servetine katkı sağlar."
  }
 ],
 "ferman": [
  {
   "baslik": "İstanbul'un Fethi",
   "metin": "1453'te Fatih Sultan Mehmed Konstantiniyye'yi fethetti; şehir yeni başkent oldu ve ticaret canlandı. Senin her şehrinden fetih sonrası gelen bereketle gelir topla.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 300
   },
   "ogren": "1453'te II. Mehmed İstanbul'u fethederek Bizans'a son verdi ve şehri Osmanlı başkenti yaptı."
  },
  {
   "baslik": "Kara Veba Salgını",
   "metin": "1347-1348 Kara Veba salgını Akdeniz şehirlerini kırıp nüfusu eritti; üretim durdu. Senin imarlı her yapından gelir düştü, her imar başına hazineye ödeme yap.",
   "etki": {
    "tur": "imar_basina_ver",
    "deger": 200
   },
   "ogren": "1347-1348 Kara Veba (taun) salgını Avrupa ve Yakındoğu'da nüfusun büyük bölümünü yok etti."
  },
  {
   "baslik": "Preveze Deniz Zaferi",
   "metin": "1538'de Barbaros Hayreddin Paşa Preveze'de Haçlı donanmasını bozguna uğrattı; Akdeniz Osmanlı denizi oldu. Senin her limanın güvenli ticaretle kazanç getirdi.",
   "etki": {
    "tur": "liman_basina_al",
    "deger": 400
   },
   "ogren": "1538 Preveze Deniz Zaferi ile Osmanlı, Barbaros komutasında Akdeniz'de üstünlük kazandı."
  },
  {
   "baslik": "Küçük Kıyamet Depremi",
   "metin": "10 Eylül 1509'da İstanbul'u vuran büyük deprem 'Küçük Kıyamet' diye anıldı; binlerce yapı yıkıldı. En çok imarlı şehrinde en değerli yapın yerle bir oldu.",
   "etki": {
    "tur": "en_degerli_imar_yik",
    "deger": 0
   },
   "ogren": "10 Eylül 1509 İstanbul depremi 'Küçük Kıyamet' (Kıyamet-i Suğra) olarak bilinir ve şehirde büyük yıkıma yol açmıştır."
  },
  {
   "baslik": "Mohaç Meydan Muharebesi",
   "metin": "1526'da Kanuni Sultan Süleyman Mohaç'ta Macar ordusunu iki saatte dağıttı; ganimet ve toprak kazanıldı. Sefer dönüşü her şehrine pay düştü.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 350
   },
   "ogren": "1526 Mohaç Meydan Muharebesi'nde Kanuni, Macaristan ordusunu yenerek Orta Avrupa'da ilerledi."
  },
  {
   "baslik": "Çaldıran ve Devşirme Ordusu",
   "metin": "1514 Çaldıran Savaşı'nda Yavuz Sultan Selim, devşirmeden yetişen yeniçerilerin tüfekleri ve topçunun ateş gücüyle üstün geldi. Kapıkulu maaşları için her şehrinden ulufe payı topla.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 300
   },
   "ogren": "1514 Çaldıran Savaşı'nda Osmanlı, top ve tüfek gibi ateşli silah üstünlüğüyle Safevi ordusunu yendi; askerler devşirme sistemiyle yetişirdi."
  },
  {
   "baslik": "Cizye Gelirinin Toplanması",
   "metin": "Osmanlı'da gayrimüslim teb'adan alınan cizye vergisi hazinenin düzenli geliriydi. Senin her şehrinden bu yılki cizye toplanıp kesene eklendi.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 250
   },
   "ogren": "Cizye, Osmanlı Devleti'nde gayrimüslim erkeklerden alınan ve hazineye önemli gelir sağlayan bir vergiydi."
  },
  {
   "baslik": "Avarız Vergisi Salındı",
   "metin": "Sefer ve olağanüstü giderler için halktan toplanan avarız vergisi savaş zamanı ağırlaşırdı. Sefer masrafı için her şehrin avarız ödedi, keseden çık.",
   "etki": {
    "tur": "mulk_basina_ver",
    "deger": 250
   },
   "ogren": "Avarız, Osmanlı'da savaş ve olağanüstü ihtiyaçlar için halktan alınan, zamanla sürekli hale gelen bir vergiydi."
  },
  {
   "baslik": "Sikke Tağşişi ve Enflasyon",
   "metin": "1585'te gümüş akçenin ayarı düşürüldü; para değer kaybedince fiyatlar fırladı ve gelirler eridi. Senin her imarlı yapının kira geliri azaldı, imar başına öde.",
   "etki": {
    "tur": "imar_basina_ver",
    "deger": 200
   },
   "ogren": "1585-1586'da akçenin gümüş içeriği yarıya yakın düşürülerek (tağşiş) Osmanlı'da ağır bir enflasyon başlamıştır."
  },
  {
   "baslik": "Kanunname İlan Edildi",
   "metin": "Fatih ve Kanuni dönemlerinde düzenlenen kanunnameler vergi ve mülk haklarını düzene soktu; ticaret güven kazandı. Adil düzenden her şehrin kazanç sağladı.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 300
   },
   "ogren": "Kanunnameler, Osmanlı'da örfi hukuku düzenleyen ve özellikle Fatih ile Kanuni döneminde sistemleştirilen kanun derlemeleriydi."
  },
  {
   "baslik": "Bereketli Hasat Yılı",
   "metin": "İklimin elverdiği bol yağışlı bir yılda tahıl ambarları doldu; tımar gelirleri arttı. Senin her şehrinden fazladan ürün geliri kesene aktarıldı.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 350
   },
   "ogren": "Tımar sisteminde tarımsal üretim, sipahinin ve hazinenin gelirinin temel kaynağıydı; bereketli yıllar geliri artırırdı."
  },
  {
   "baslik": "Büyük Şehir Yangını",
   "metin": "Osmanlı şehirlerinde ahşap evler sık sık yangına yenik düşerdi; bir kıvılcım mahalleleri kül ederdi. En çok imarlı şehrinde en değerli yapın yandı.",
   "etki": {
    "tur": "en_degerli_imar_yik",
    "deger": 0
   },
   "ogren": "Ahşap mimarinin yaygın olduğu Osmanlı şehirlerinde büyük yangınlar sıktır ve geniş yıkımlara yol açardı."
  },
  {
   "baslik": "Tersane ve Liman Yatırımı",
   "metin": "Devlet Haliç ve Akdeniz limanlarında tersaneleri güçlendirip deniz ticaretini destekledi. Senin her limanın artan gemi trafiğiyle gelir getirdi.",
   "etki": {
    "tur": "liman_basina_al",
    "deger": 350
   },
   "ogren": "Osmanlı, Haliç Tersanesi başta olmak üzere liman ve tersane yatırımlarıyla deniz gücünü ve ticaretini geliştirdi."
  },
  {
   "baslik": "Korsan Baskını Limanları Vurdu",
   "metin": "Akdeniz'de dolaşan korsanlar zaman zaman sahil kasabalarını ve limanları yağmaladı; ticaret aksadı. Senin her limanın zarar gördü, liman başına öde.",
   "etki": {
    "tur": "liman_basina_ver",
    "deger": 300
   },
   "ogren": "Akdeniz'de korsanlık, hem Osmanlı hem Avrupa sahillerinde ticareti tehdit eden sürekli bir sorundu."
  },
  {
   "baslik": "Padişah Affı: Ulufe Dağıtıldı",
   "metin": "Cülûs geleneğinde tahta çıkan padişah, kapıkulu askerlerine bahşiş ve af dağıtırdı. Bu fermanla esaretten kurtulursun; kullanana dek sakla.",
   "etki": {
    "tur": "esaretten_cik_karti",
    "deger": 0
   },
   "ogren": "Cülûs bahşişi, yeni tahta çıkan Osmanlı padişahının kapıkulu askerlerine dağıttığı geleneksel bir ödemeydi."
  },
  {
   "baslik": "İnebahtı Bozgunu",
   "metin": "1571 İnebahtı'nda (Lepanto) Osmanlı donanması Haçlı filosuna ağır kayıp verdi; sahil savunması sarsıldı. Senin her limanın tamir masrafı çıkardı, liman başına öde.",
   "etki": {
    "tur": "liman_basina_ver",
    "deger": 300
   },
   "ogren": "1571 İnebahtı Deniz Savaşı'nda Osmanlı donanması büyük kayıp verdi, ancak filo kısa sürede yeniden inşa edildi."
  }
 ],
 "vakca": [
  {
   "baslik": "Selimiye Camii Tamamlandı (1574)",
   "metin": "Mimar Sinan ustalık eseri Selimiye'yi Edirne'de tamamladı; şehirler imar yarışına girdi. Senin her imarlı şehrindeki esnaf iş buldu, hazinene bina başına 300 akçe girdi.",
   "etki": {
    "tur": "imar_basina_al",
    "deger": 300
   },
   "ogren": "Mimar Sinan, Selimiye Camii'ni 1574'te Edirne'de tamamladı ve onu kendi ustalık eseri saydı."
  },
  {
   "baslik": "Kara Veba Salgını (1347)",
   "metin": "1347'de başlayan Kara Veba salgını Akdeniz'den yayılarak şehirleri kırdı; çarşı ve atölyeler boşaldı. Senin imarlı her yapından üretim durdu, bina başına 250 akçe hazineden çıktı.",
   "etki": {
    "tur": "imar_basina_ver",
    "deger": 250
   },
   "ogren": "1347-1351 Kara Veba salgını Avrupa ve Akdeniz nüfusunun büyük bölümünü yok etti."
  },
  {
   "baslik": "Büyük İstanbul Yangını",
   "metin": "Ahşap evlerin sık olduğu şehirlerde çıkan bir yangın rüzgârla büyüdü; en kalabalık mahalle kül oldu. En çok imarlı şehrindeki en değerli yapın yandı.",
   "etki": {
    "tur": "en_degerli_imar_yik",
    "deger": 0
   },
   "ogren": "Osmanlı şehirlerinde ahşap mimari yaygınlığı nedeniyle yangınlar sıklıkla büyük yıkıma yol açardı."
  },
  {
   "baslik": "Preveze Deniz Zaferi (1538)",
   "metin": "Barbaros Hayreddin Paşa, 1538'de Preveze'de Haçlı donanmasını bozguna uğrattı; Akdeniz ticaret yolları Osmanlı'ya açıldı. Senin her limanın gümrük geliriyle doldu, liman başına 400 akçe kazandın.",
   "etki": {
    "tur": "liman_basina_al",
    "deger": 400
   },
   "ogren": "1538 Preveze Deniz Zaferi ile Osmanlı, 16. yüzyılda Akdeniz'de üstünlüğü ele geçirdi."
  },
  {
   "baslik": "Bereketli Hasat Yılı",
   "metin": "Yağışın tam zamanında düştüğü bir yılda buğday ambarları taştı; köyler ve şehirler bollukla doldu. Her şehrinden fazladan öşür geliri geldi, mülk başına 200 akçe aldın.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 200
   },
   "ogren": "Osmanlı ekonomisi büyük ölçüde tarıma dayalıydı; iyi hasat yılları hazine gelirini doğrudan artırırdı."
  },
  {
   "baslik": "Kuraklık ve Kıtlık",
   "metin": "Anadolu'da uzun süren kuraklık mahsulü yaktı; reaya vergi ödeyemez hale geldi. Her şehrinde gelir düştü, mülk başına 200 akçe hazineden çıktı.",
   "etki": {
    "tur": "mulk_basina_ver",
    "deger": 200
   },
   "ogren": "16. yüzyıl sonu kuraklık ve kıtlıkları, Anadolu'daki Celali huzursuzluklarının zeminini hazırladı."
  },
  {
   "baslik": "Sahaflar Çarşısı Vakfı",
   "metin": "Bir hayırsever, ilim yayılsın diye kitapçılar çarşısını vakfetti; medreseler kitaba kavuştu. Vakfın geliri sana bağlandı, hazinene 500 akçe girdi.",
   "etki": {
    "tur": "para_al",
    "deger": 500
   },
   "ogren": "Vakıf sistemi, Osmanlı'da eğitim ve hayır hizmetlerinin finansmanının temel kurumuydu."
  },
  {
   "baslik": "Lonca Kalfalık Töreni",
   "metin": "Ahi geleneğine bağlı lonca, çıraklarını ustalık peştemaliyle kuşattı; el emeği değerlendi. Atölyelerin üretimi arttı, her imarlı yapından 150 akçe kazandın.",
   "etki": {
    "tur": "imar_basina_al",
    "deger": 150
   },
   "ogren": "Lonca ve ahi teşkilatları, Osmanlı şehir ekonomisinde üretimi ve esnaf ahlakını düzenlerdi."
  },
  {
   "baslik": "Şahane Çarşı Vergisi",
   "metin": "Devlet, donanma masrafı için çarşı esnafından olağanüstü avarız vergisi topladı. Her imarlı yapından pay istendi, imar başına 180 akçe ödedin.",
   "etki": {
    "tur": "imar_basina_ver",
    "deger": 180
   },
   "ogren": "Avarız, olağanüstü durumlarda halktan toplanan ek vergiydi; zamanla sürekli hale geldi."
  },
  {
   "baslik": "Kervansaray Konaklaması",
   "metin": "İpek Yolu üzerindeki kervansarayına kervanlar dizildi; tüccarlar üç gün ücretsiz ağırlandı ama mallar pazarda satıldı. Her şehrindeki han geliriyle mülk başına 250 akçe kazandın.",
   "etki": {
    "tur": "mulk_basina_al",
    "deger": 250
   },
   "ogren": "Selçuklu ve Osmanlı kervansarayları tüccarı ücretsiz ağırlar, böylece ticaret yollarını canlı tutardı."
  },
  {
   "baslik": "Korsan Baskını",
   "metin": "Malta şövalyelerinin korsanları kıyı limanlarını vurdu; tüccar gemileri yağmalandı. Her limanın zarar gördü, liman başına 300 akçe kaybettin.",
   "etki": {
    "tur": "liman_basina_ver",
    "deger": 300
   },
   "ogren": "Akdeniz'de korsanlık, 16. yüzyılda hem Hristiyan hem Müslüman taraflarca sürdürülen yaygın bir tehditti."
  },
  {
   "baslik": "Esir Pazarında Tutsak",
   "metin": "Bir sefer dönüşü düşman akıncılarına yakalandın; fidye ödenene dek esarette kalacaksın. Doğruca esaret karesine git.",
   "etki": {
    "tur": "esarete_git",
    "deger": 0
   },
   "ogren": "Hudut bölgelerinde akınlar sırasında esir alıp fidye karşılığı serbest bırakmak yaygın bir uygulamaydı."
  },
  {
   "baslik": "Padişah Fermanıyla Af",
   "metin": "Tahta çıkan padişah cülus müracaatıyla bir mahkûma af çıkardı; bu ferman senin elinde. Esarete düşersen bu kartla bedelsiz kurtulursun, sakla.",
   "etki": {
    "tur": "esaretten_cik_karti",
    "deger": 0
   },
   "ogren": "Yeni padişahlar tahta çıkışlarında cülus bahşişi dağıtır ve bazı aflar ilan ederlerdi."
  },
  {
   "baslik": "Sadaka Taşı Geleneği",
   "metin": "Mahalleye konan sadaka taşına varlıklı komşular akçe bıraktı; muhtaçlar gizlice aldı. Sen de hayrına katıldın, her oyuncuya birer pay verdin.",
   "etki": {
    "tur": "herkese_ver",
    "deger": 200
   },
   "ogren": "Sadaka taşı, veren ile alanı karşılaştırmadan yardımı sağlayan Osmanlı sosyal dayanışma uygulamasıydı."
  },
  {
   "baslik": "Surre Alayı Bağışı",
   "metin": "Haremeyn'e gönderilen surre alayı için şehirler bağış topladı; herkese hisse düşer. Tüm oyunculardan bu hayra katkı istedin, her birinden pay aldın.",
   "etki": {
    "tur": "herkesten_al",
    "deger": 150
   },
   "ogren": "Surre alayı, Osmanlı padişahlarının her yıl Mekke ve Medine halkına gönderdiği para ve hediye kervanıydı."
  },
  {
   "baslik": "Cihana Dönüş ve Maaş",
   "metin": "Uzun seferden zaferle dönen bir kumandan gibi başa, payitahta vardın; divan sana ulufe bağladı. Başa git ve maaşını al.",
   "etki": {
    "tur": "basa_git_maas_al",
    "deger": 0
   },
   "ogren": "Ulufe, Yeniçerilere ve kapıkulu askerlerine üç ayda bir ödenen düzenli maaşın adıydı."
  }
 ],
 "ilerlemeKartlari": [
  {
   "sayi": 1,
   "baslik": "I. Murad: Hüdavendigâr",
   "bilgi": "Osmanlı'nın BİRİNCİ Murad'ı (Murad Hüdavendigâr), 1362'de tahta çıktı ve devleti bir beylikten aşarak Rumeli'de geniş topraklara yayılan bir güce dönüştürdü. 1389 Kosova Savaşı'nı kazanan ama savaş alanında şehit düşen İLK Osmanlı padişahı olarak tarihe geçti."
  },
  {
   "sayi": 1,
   "baslik": "Bursa: İlk Gerçek Başkent",
   "bilgi": "Orhan Bey döneminde 1326'da fethedilen Bursa, Osmanlı Devleti'nin yerleşik İLK başkenti oldu ve Söğüt'ten sonra devletin ağırlık merkezini oluşturdu. Burada inşa edilen Orhan Camii ve külliyesi, şehri bir yönetim ve ticaret merkezine dönüştüren tek bir çekirdek gibi gelişti."
  },
  {
   "sayi": 1,
   "baslik": "İznik: İlk Osmanlı Medresesi",
   "bilgi": "Osmanlı'nın BİRİNCİ medresesi, 1331'de İznik'in fethinin ardından Orhan Bey tarafından kuruldu. Başına âlim Dâvûd-ı Kayserî'nin getirildiği bu tek kurum, beyliğe ilmî bir omurga kazandırarak sonraki yüzyılların medrese geleneğine zemin hazırladı."
  },
  {
   "sayi": 1,
   "baslik": "İlk Osmanlı Akçesi",
   "bilgi": "Osmanlı'nın kendi adına basılan İLK madenî parası olan gümüş akçe, 1326'da Orhan Bey döneminde basıldı. Bir beyliğin kendi sikkesini basması bağımsızlığın tek başına en güçlü nişanesi sayılırdı ve bu adım Osmanlı'nın siyasi olgunluğunu gösterdi."
  },
  {
   "sayi": 1,
   "baslik": "Osman Bey: Tek Bir Çekirdekten",
   "bilgi": "Devlete adını veren Osman Gazi, 13. yüzyıl sonunda Söğüt çevresindeki tek bir uç beyliğini bağımsız bir siyasi yapıya çevirdi. 1299 dolaylarında Selçuklu otoritesinin çözülmesiyle hutbeyi kendi adına okutmaya yönelen bu BİRİNCİ lider, hanedanın kurucu atası oldu."
  },
  {
   "sayi": 1,
   "baslik": "Tuğra: Tek Bir İmza",
   "bilgi": "Osmanlı padişahlarının fermanlarını onayladığı tek mührü olan tuğra, her hükümdara ait eşsiz bir imza niteliğindeydi. Bilinen İLK Osmanlı tuğrası Orhan Bey'e aittir; bu tek işaret, bir belgenin doğrudan padişahın iradesini taşıdığını gösteren en yüksek yetki simgesiydi."
  },
  {
   "sayi": 2,
   "baslik": "Fatih'in İki Saltanatı",
   "bilgi": "II. Mehmed, 1453'te İstanbul'u fethederek Fatih unvanını aldı ve çağdaşlarınca 'Kayser-i Rum' olarak da anıldı. Adındaki 'II.' sayısı, onu kendisinden önceki I. Mehmed'den (Çelebi Mehmed) ayırır; böylece o, Osmanlı tahtına çıkan ikinci Mehmed'dir. Sayı 2."
  },
  {
   "sayi": 2,
   "baslik": "İki Kıtanın Şehri",
   "bilgi": "İstanbul, Avrupa ve Asya olmak üzere iki kıtada birden kurulu dünyadaki nadir şehirlerden biridir; ikisini İstanbul Boğazı ayırır. Osmanlı başkenti olarak hem Rumeli hem Anadolu yakasını içeren bu yapı, şehrin '2 kıta' ile özdeşleşmesini sağlar. Sayı 2."
  },
  {
   "sayi": 2,
   "baslik": "Çift Başlı Kartal",
   "bilgi": "Anadolu Selçuklu Devleti, iki yöne bakan çift başlı kartalı bir hâkimiyet simgesi olarak kullandı; bu motif Osmanlı öncesi Türk-İslam mimarisinde de görülür. Bir gövde üzerinde iki baş, doğu ile batı üzerindeki hâkimiyet iddiasını temsil eder. Sayı 2."
  },
  {
   "sayi": 2,
   "baslik": "Genç Osman'ın İkinciliği",
   "bilgi": "II. Osman, yani Genç Osman, 14 yaşında tahta çıkmış ve yeniçerilerin gücünü sınırlamaya çalışması nedeniyle 1622'de bir ayaklanmayla tahttan indirilmiştir. Adındaki 'II.' sayısı onu Osmanlı Devleti'nin kurucusu Osman Gazi'den ayırır. Sayı 2."
  },
  {
   "sayi": 2,
   "baslik": "Bayezid'in Hesaplaşması",
   "bilgi": "II. Bayezid, babası Fatih'in ölümünden sonra kardeşi Cem Sultan ile taht için mücadele etmiş ve 1481'de tahta geçmiştir. Tahta çıkmadan önce iki kardeşin rekabeti, onun 'II.' unvanıyla birlikte hatırlanır. Sayı 2."
  },
  {
   "sayi": 2,
   "baslik": "Mahmud'un İki Kurumu",
   "bilgi": "II. Mahmud, 1826'da Yeniçeri Ocağı'nı kaldırıp yerine 'Asakir-i Mansure-i Muhammediye' ordusunu kurarak eski ve yeni iki askerî düzen arasında bir dönüm noktası oluşturdu. Onun 'II.' sayısı, kendisinden önceki I. Mahmud'dan ayrıldığını gösterir. Sayı 2."
  },
  {
   "sayi": 3,
   "baslik": "III. Selim ve Nizam-ı Cedid",
   "bilgi": "III. Selim, 1789'da tahta çıkan reformcu padişahtır. Adındaki 'III.' (üçüncü) seni 3 kare ileri taşır. Avrupa tarzı yeni bir ordu olan Nizam-ı Cedid'i kurdu; aynı zamanda iyi bir bestekârdı ve 'Suzidilârâ' makamını kendisi geliştirdi."
  },
  {
   "sayi": 3,
   "baslik": "III. Ahmed ve Lale Devri",
   "bilgi": "III. Ahmed dönemi (1718-1730), zarafet ve sanatın öne çıktığı Lale Devri olarak anılır. Padişahın adındaki 'üçüncü' rakamı seni 3 kare ileri götürür. Bu dönemde İbrahim Müteferrika ilk Türk matbaasını 1727'de kurdu."
  },
  {
   "sayi": 3,
   "baslik": "III. Murad ve Doğudaki En Geniş Sınırlar",
   "bilgi": "III. Murad döneminde (1574-1595) Osmanlı Devleti doğuda İran (Safevî), batıda Avrupa cephelerinde savaştı ve 1590 Ferhat Paşa Antlaşması ile doğuda Hazar Denizi'ne kadar uzanan en geniş sınırlarına ulaştı. Adındaki 'III.' seni 3 kare ilerletir. Takiyüddin'in İstanbul Rasathanesi de bu dönemde kuruldu."
  },
  {
   "sayi": 3,
   "baslik": "III. Mustafa ve Modernleşme Çabaları",
   "bilgi": "III. Mustafa (1757-1774) ordunun modernleşmesi için Avrupalı uzmanlardan yararlandı ve Baron de Tott'a topçu okulu kurdurdu. Adındaki üçüncü rakamı seni 3 kare öteye taşır. Döneminde Laleli Camii inşa edildi."
  },
  {
   "sayi": 3,
   "baslik": "III. Osman ve Kısa Saltanat",
   "bilgi": "III. Osman 1754-1757 arasında yalnızca yaklaşık üç yıl tahtta kaldı. Hem adındaki 'III.' hem de kısa saltanatı 3 sayısını çağrıştırır ve seni 3 kare ilerletir. Şehzadeliğini uzun yıllar kafes usulü denen sarayda kapalı geçirmiştir."
  },
  {
   "sayi": 3,
   "baslik": "Üç Kıtada İmparatorluk",
   "bilgi": "Osmanlı Devleti yüzyıllar boyunca Asya, Avrupa ve Afrika olmak üzere üç kıtaya yayılan bir imparatorluktu. Bu 'üç kıta' ifadesi seni 3 kare ileri götürür. Bu konum, İpek ve Baharat yolları gibi önemli ticaret güzergâhlarını kontrol etmesini sağladı."
  },
  {
   "sayi": 4,
   "baslik": "Bağdat Fatihi IV. Murad",
   "bilgi": "Osmanlı tahtının 17. padişahı olan IV. Murad, 1638'de Bağdat'ı Safevilerden geri aldığı için 'Bağdat Fatihi' unvanıyla anılır. Adındaki 'IV.' (dördüncü) rakamı, onu bu sayının temsilcisi yapar. Seferde 4 kare ilerle."
  },
  {
   "sayi": 4,
   "baslik": "Dört Büyük Halife",
   "bilgi": "Hz. Peygamber'in vefatından sonra İslam toplumunu yöneten ilk dört halife (Hz. Ebû Bekir, Hz. Ömer, Hz. Osman, Hz. Ali) 'Hulefâ-i Râşidîn' yani 'Doğru Yolu Bulan Halifeler' olarak bilinir. Tam dört kişi oldukları için sayın 4. Dört kare ilerle."
  },
  {
   "sayi": 4,
   "baslik": "Avcı IV. Mehmed",
   "bilgi": "Yedi yaşında tahta çıkan IV. Mehmed, ava olan tutkusu nedeniyle 'Avcı' lakabıyla anılır; saltanatı döneminde Köprülü vezirleri devleti toparlamıştır. Adındaki 'IV.' rakamı onu dörde bağlar. Dört kare ilerle."
  },
  {
   "sayi": 4,
   "baslik": "Dört Hak Mezhep",
   "bilgi": "Sünni İslam'da fıkıh (hukuk) alanında dört büyük mezhep gelişmiştir: Hanefî, Şâfiî, Mâlikî ve Hanbelî. Osmanlı Devleti resmî olarak Hanefî mezhebini benimsemiştir. Mezhep sayısı dört olduğu için sayın 4. Dört kare ilerle."
  },
  {
   "sayi": 4,
   "baslik": "Dört Eyvanlı Medrese",
   "bilgi": "Selçuklu ve sonrası Türk-İslam mimarisinde medreseler çoğunlukla 'dört eyvanlı' plana göre inşa edilmiştir; orta avlunun dört yönüne açılan tonozlu mekânlara eyvan denir. Eyvan sayısı dört olduğu için sayın 4. Dört kare ilerle."
  },
  {
   "sayi": 4,
   "baslik": "Cennetle Müjdelenenler ve Dört Köşe Kâbe",
   "bilgi": "İslam mimarisinin merkezi olan Kâbe, dört köşeli (kübik) yapısıyla bilinir ve her köşesinin kendine ait bir adı vardır: Hacerü'l-Esved köşesi, Irak köşesi, Şam köşesi ve Yemen köşesi. Köşe sayısı dört olduğu için sayın 4. Dört kare ilerle."
  },
  {
   "sayi": 5,
   "baslik": "Beş Şartın Tahtı: I. Murad'ın Devleti",
   "bilgi": "İslam'ın beş şartından biri olan namaz, Osmanlı sultanlarının günlük hayatının merkezindeydi ve beş vakit eda edilirdi. I. Murad'ın 1389'daki Kosova Savaşı'nın ardından şehit düşmesi, devletin namaz ve cihat anlayışını sembolleştiren bir olay olarak anlatılır. İslam'ın beş şartı gibi, bu kart da seni beş kare ileri taşır."
  },
  {
   "sayi": 5,
   "baslik": "Beş Vakit Namaz ve Selâtin Camileri",
   "bilgi": "Osmanlı'da padişahlar tarafından yaptırılan büyük selâtin camileri, halkın beş vakit namazını cemaatle kılması için şehrin merkezine inşa edilirdi. Mimar Sinan'ın eseri olan Süleymaniye Camii (1557'de tamamlandı) bu camilerin en görkemlilerindendir. Beş vakit namazın hatırına ilerle: beş kare."
  },
  {
   "sayi": 5,
   "baslik": "Beşinci Padişah: Çelebi Mehmed",
   "bilgi": "Osmanlı Devleti'nin beşinci padişahı Çelebi Mehmed (I. Mehmed), 1402 Ankara Savaşı sonrası yaşanan Fetret Devri'ni sona erdirerek dağılan devleti yeniden birleştirdi. Bu yüzden tarihte adeta devletin ikinci kurucusu olarak anılır. Beşinci padişah, sana beşinci kareyi gösterir: beş ilerle."
  },
  {
   "sayi": 5,
   "baslik": "Beş Parmak: Pençe-i Âl-i Abâ",
   "bilgi": "Osmanlı kültüründe beşli el motifi olan pençe, Hz. Muhammed, Hz. Ali, Hz. Fatıma, Hz. Hasan ve Hz. Hüseyin'i temsil eden 'pençe-i âl-i abâ' inancıyla bayraklarda ve nişanlarda kullanılmıştır. Bu beş parmaklık motif, özellikle yeniçerilerin ve tarikatların sembollerinde görülürdü. Pençenin beş parmağı gibi, beş kare ilerle."
  },
  {
   "sayi": 5,
   "baslik": "Beşinci Sultan Murad'ın Kısa Saltanatı",
   "bilgi": "Beşinci Murad (V. Murad), 1876'da tahta çıkan ancak sağlık sorunları nedeniyle yalnızca yaklaşık üç ay hüküm sürüp tahttan indirilen padişahtı. Onun yerine kardeşi II. Abdülhamid geçti ve ilk Meşrutiyet ilan edildi. 'Beşinci' Murad'ın hatırına sayının beşi: beş kare ilerle."
  },
  {
   "sayi": 5,
   "baslik": "Beşinci Donanma Adımı: Preveze'ye Giden Yol",
   "bilgi": "Kanuni dönemi denizcisi Barbaros Hayreddin Paşa, 1538 Preveze Deniz Zaferi'yle Akdeniz'i bir Osmanlı gölü haline getirdi ve Haçlı donanmasını bozguna uğrattı. Bu zaferin yıl dönümü olan 27 Eylül, bugün Türkiye'de Deniz Kuvvetleri Günü olarak kutlanır. Zafere giden beşinci adım gibi, beş kare ilerle."
  },
  {
   "sayi": 6,
   "baslik": "Son Padişah VI. Mehmed",
   "bilgi": "Osmanlı tahtına çıkan son hükümdar VI. Mehmed Vahdettin'di; adındaki 'VI.' rakamı onun altıncı Mehmed olduğunu gösterir. 1918'de tahta çıktı ve saltanatın kaldırıldığı 1922'ye kadar hüküm sürdü. Taht numarası 6 olduğu için bu kart seni 6 kare ilerletir."
  },
  {
   "sayi": 6,
   "baslik": "Yaklaşık Altı Asırlık Devlet",
   "bilgi": "Osmanlı Devleti 1299'da kurulup 1922'de saltanatın kaldırılmasıyla sona erdiğinde arkasında yaklaşık 600 yıllık, yani altı asırlık bir tarih bırakmıştı. Tek bir hanedanın bu denli uzun süre hüküm sürmesi dünya tarihinde ender görülen bir durumdur. Altı asır, seni 6 kare ileri taşır."
  },
  {
   "sayi": 6,
   "baslik": "Altıgen Yıldız Çini",
   "bilgi": "Klasik Osmanlı çini ve tezyinatında en sevilen geometrik motiflerden biri altı kollu yıldız ve altıgen (altıgen) örgülerdir; İznik çinilerinde bu altıgen geometriler sıkça işlenmiştir. Geometrik desenler, sonsuzluğu ve birliği simgelediği için tercih edilirdi. Altıgenin altı köşesi seni 6 kare ileri götürür."
  },
  {
   "sayi": 6,
   "baslik": "II. Abdülhamid'in Tahta Çıkış Yılı",
   "bilgi": "II. Abdülhamid, babası Sultan Abdülmecid'in çocukları arasında dünyaya geldiğinde tahta uzak görünüyordu; ancak ağabeyi V. Murad'ın tahttan indirilmesinin ardından 1876'da tahta çıktı. Otuz üç yıl süren uzun saltanatı Osmanlı'nın son güçlü merkezî dönemiydi. Tahta çıkış yılı olan 1876'nın son hanesi '6', seni 6 kare ilerletir."
  },
  {
   "sayi": 6,
   "baslik": "Altı Köşeli Mührü Süleyman",
   "bilgi": "Osmanlı tezyinatında ve özellikle sancak ile alemlerde sıkça görülen 'Mührü Süleyman', iç içe geçmiş iki üçgenin oluşturduğu altı köşeli bir yıldız motifidir; koruyucu ve mübarek bir sembol olarak kullanılırdı. Bu altı köşeli yıldızın köşeleri seni 6 kare ilerletir."
  },
  {
   "sayi": 6,
   "baslik": "V. Murad'ın Kısa Saltanatı",
   "bilgi": "V. Murad Osmanlı'nın beşinci Murad'ı olup, 1876'da tahta çıkmış ancak yalnızca yaklaşık üç ay tahtta kalıp sağlık gerekçesiyle indirilmiştir. Bu kısa dönem, bir yılı bile bulmadan biten ender saltanatlardandır. Tahta çıkış ve iniş yılı 1876'nın son hanesi 6 olduğu için 6 kare ilerlersin."
  },
  {
   "sayi": 7,
   "baslik": "Yedikule Hisarı'nın Surları",
   "bilgi": "Fatih Sultan Mehmed, İstanbul'u fethettikten sonra Bizans'ın Altın Kapı bölgesindeki üç kuleye dört kule daha ekleterek toplam yedi kuleli bir hisar inşa ettirdi. Bu yüzden yapıya 'Yedikule' adı verildi; uzun yıllar hem hazine deposu hem de devlet zindanı olarak kullanıldı."
  },
  {
   "sayi": 7,
   "baslik": "Yedi Tepeli Şehir",
   "bilgi": "İstanbul, tıpkı eski Roma gibi yedi tepe üzerine kurulu kabul edilir ve Osmanlılar tepelere büyük selâtin camileri kondurmuştur. Fatih, Beyazıt ve Süleymaniye camileri bu tepeleri taçlandırır; şehrin 'yedi tepesi' Osmanlı silüetinin simgesi hâline gelmiştir."
  },
  {
   "sayi": 7,
   "baslik": "Yedi İklimin Hükümdarı",
   "bilgi": "Eski coğrafyada dünya 'yedi iklim' diye yedi kuşağa ayrılırdı ve geniş topraklara hükmeden hükümdarlar 'yedi iklimin sultanı' unvanıyla anılırdı. Kanunî Sultan Süleyman dönemi şairleri, padişahın üç kıtaya yayılan hâkimiyetini bu yedi iklim ifadesiyle övmüştür."
  },
  {
   "sayi": 7,
   "baslik": "Yedi Düvele Karşı",
   "bilgi": "Osmanlı halk dilinde Avrupa'nın büyük devletlerini topluca anlatmak için 'yedi düvel' deyimi kullanılırdı. Özellikle Millî Mücadele yıllarında Anadolu halkı, kendisine karşı birleşmiş güçleri 'yedi düvele karşı savaştık' sözüyle ifade etmiştir."
  },
  {
   "sayi": 7,
   "baslik": "Yedinci Padişah: Fatih",
   "bilgi": "İstanbul'u 1453'te fethederek çağ kapatıp çağ açan Fatih Sultan Mehmed, Osmanlı tahtına çıkan yedinci padişahtır. Osman Gazi, Orhan Gazi, I. Murad, I. Bayezid, I. Mehmed (Çelebi) ve II. Murad'dan sonra tahta geçen Fatih, fethiyle Osmanlı Beyliği'ni gerçek bir imparatorluğa, İstanbul'u ise yeni payitahta dönüştürmüştür."
  },
  {
   "sayi": 7,
   "baslik": "Yedi Kıta Mehter (Nevbet)",
   "bilgi": "Osmanlı'da hükümdarlık alameti sayılan mehterhane, eski Türk-İslâm geleneğinde günde belirli vakitlerde 'nevbet' vururdu; nevbetin günde yedi kez çalınması ise en yüksek hükümdarlık derecesinin nişanesi kabul edilirdi. Bir beye taht ve tuğ verildiğinde mehterin nevbet çalması, o beyliğin artık bağımsız bir devlet sayıldığını ilan ederdi."
  },
  {
   "sayi": 8,
   "baslik": "Sahn-ı Seman'ın Sekiz Medresesi",
   "bilgi": "Fatih Sultan Mehmed, fethettiği İstanbul'da bugünkü Fatih Camii çevresinde Sahn-ı Seman ('Sekiz Avlulu') adıyla bilinen sekiz yüksek medrese kurdurdu. Bu sekiz medrese, Osmanlı'nın en üst düzey ilim merkezi olarak hukuk, kelam ve aklî ilimlerin öğretildiği bir kampüs işlevi gördü. 'Seman' kelimesi Arapçada sekiz demektir."
  },
  {
   "sayi": 8,
   "baslik": "Dokuzuncu Padişah Yavuz",
   "bilgi": "Yavuz Sultan Selim, Osmanlı tahtına çıkan dokuzuncu padişahtı. Sekiz yıllık kısa saltanatında (1512-1520) Çaldıran'da Safevileri, Mercidabık ve Ridaniye'de Memlûkleri yenerek devletin sınırlarını Mısır ve Hicaz'a kadar genişletti. Onunla birlikte halifelik Osmanlı hanedanına geçmiştir. Saltanatının sekiz yıl sürmesi, onu sekiz sayısıyla anılır kılar."
  },
  {
   "sayi": 8,
   "baslik": "Sekiz Cennet Kapısı",
   "bilgi": "İslam inancında cennetin sekiz kapısı olduğu kabul edilir ve Osmanlı mimarisinde bu sembol sık işlenmiştir. Edirne'deki II. Bayezid Külliyesi gibi yapılarda ve birçok türbede sekizgen planlar bu inancı yansıtır. Mimar Sinan da bazı sebil ve çeşmelerini sekizgen formda tasarlamıştır."
  },
  {
   "sayi": 8,
   "baslik": "Sekizgen Sebiller",
   "bilgi": "Klasik Osmanlı mimarisinde sebiller (su dağıtım yapıları) çoğunlukla sekizgen planda inşa edilirdi; III. Ahmed Çeşmesi'nin köşesindeki sebil bunun bilinen örneğidir. Sekizgen form, hem yapısal denge hem de cennetin sekiz kapısına yapılan sembolik gönderme nedeniyle tercih edilmiştir. Su dağıtmak, Osmanlı'da en makbul hayır işlerinden sayılırdı."
  },
  {
   "sayi": 8,
   "baslik": "Tuğrada Üç Tuğ Çizgisi",
   "bilgi": "Osmanlı padişahlarının imzası olan tuğranın gelişmiş biçimi, 'tuğ' adı verilen ve yukarı doğru uzanan dikey çizgilerle tanınır. Olgun tuğralarda bu dikey unsurların sayısı gelenekle üç adettir; tuğranın tüm bölümleriyle (sere, beyze, kol, zülfe) çok parçalı yapısı hat sanatında özenli bir denge gerektirir. Tuğra, Orhan Bey'den itibaren kullanılmıştır."
  },
  {
   "sayi": 8,
   "baslik": "Altı Yüzyılı Devirmek",
   "bilgi": "Osmanlı Devleti, 1299'da Osman Bey'in beyliğiyle başlayıp 1922'de saltanatın kaldırılmasıyla son buldu ve böylece yaklaşık altı yüzyıl ayakta kaldı; tarihin en uzun ömürlü hanedanlarından biridir. Devlet, kuruluş döneminde Söğüt ve Domaniç çevresindeki küçük bir uç beyliğinden cihan devletine dönüşmüştür. Bu yükselişte Sahn-ı Seman'ın sekiz medresesi gibi eğitim kurumları önemli rol oynadı."
  },
  {
   "sayi": 9,
   "baslik": "Dokuz Tuğlu Padişahın Nişanı",
   "bilgi": "Osmanlı geleneğinde sancakbeyi, beylerbeyi, vezir ve padişahın tuğ sayıları rütbeye göre artardı; sancakbeyi bir, beylerbeyi iki, vezir üç, sadrazam beş tuğ taşırken en yüksek rütbe olan padişaha dokuz tuğ yakıştırılırdı. Eski Türk hakanlık geleneğinden gelen tuğ, at kuyruğundan yapılan bir hükümdarlık alametiydi; dokuz tuğ, eski Türk inanışındaki dokuz kat göğü ve en yüce egemenliği simgelerdi."
  },
  {
   "sayi": 9,
   "baslik": "Dokuz Oğuz (Tokuz Oğuz) Birliği",
   "bilgi": "Tarihte 'Dokuz Oğuz' (Tokuz Oğuz) adıyla anılan, dokuz boydan oluşan büyük bir Türk boy birliği bulunurdu; Orhun Yazıtları'nda da bu birlikten söz edilir. Oğuz geleneğinde dokuz sayısı kutlu sayılırdı: hükümdarın dokuz tuğu, dokuz kat gök ve dokuzlu armağan düzeni gibi pek çok unsurda dokuz, en yüce ve eksiksiz olanı temsil ederdi. Osmanlı hanedanının mensup olduğu Kayı boyu da Oğuzların Bozok kolundan gelir."
  },
  {
   "sayi": 9,
   "baslik": "Dokuz Kubbeli Edirne Eski Camii",
   "bilgi": "Edirne'de Çelebi Mehmed döneminde 1414 yılında tamamlanan Eski Cami, üç sıra hâlinde dizilmiş dokuz eşit kubbeyle örtülü çok kubbeli (ulu cami) planının en bilinen örneklerindendir. Dört fil ayağına benzer kalın payelerin taşıdığı dokuz kubbeli düzen, erken dönem Osmanlı mimarisinin sade ve görkemli anlayışını yansıtır; iç duvarlarındaki büyük hat yazılarıyla da ün kazanmıştır."
  },
  {
   "sayi": 9,
   "baslik": "Dokuzuncu Padişah Yavuz Sultan Selim",
   "bilgi": "Osmanlı tahtına çıkış sırasına göre dokuzuncu padişah olan I. Selim (Yavuz), 1512-1520 yılları arasında hüküm sürdü. 1517'de Memlük Devleti'ni ortadan kaldırarak hilafeti Osmanlı hanedanına taşıdı ve Mukaddes Emanetleri İstanbul'a getirdi; sekiz yıllık kısa saltanatına çok geniş fetihler sığdırdı."
  },
  {
   "sayi": 9,
   "baslik": "Dokuz Hane Bir Köy: Defter Düzeni",
   "bilgi": "Osmanlı malî teşkilatının temel kayıt birimi olan defter, gelir ve giderlerin tutulduğu hazine düzeninin belkemiğiydi. Tahrir defterleri, ülkenin nüfusunu ve vergi kaynaklarını belirli aralıklarla kayıt altına alır; bu sayım ve kayıt geleneği devletin merkezî maliyesini ayakta tutan en önemli unsurlardan biriydi. Dokuz hane kadar küçük bir yerleşimin bile köy sayılıp deftere işlenmesi, bu kayıt geleneğindeki titizliğin güzel bir göstergesiydi."
  },
  {
   "sayi": 9,
   "baslik": "Dokuz Yaşında Şehzade Eğitimi",
   "bilgi": "Osmanlı şehzadeleri küçük yaşlardan itibaren lala denilen tecrübeli devlet adamlarının gözetiminde yetiştirilir, belirli bir yaşa geldiklerinde sancağa çıkarılarak yöneticilik tecrübesi kazanırdı. Şehzadeler daha çocuk yaştayken bed-i besmele töreniyle eğitime başlar; saray hocaları elinde dinî ilimler, dil, hat ve binicilik gibi alanlarda yetiştirilir, dokuz on yaşlarına geldiklerinde bu eğitim iyice yoğunlaşırdı."
  },
  {
   "sayi": 10,
   "baslik": "Mete Han ve Onlu Ordu",
   "bilgi": "Büyük Hun Hükümdarı Mete Han, orduyu 10'lu sayma düzenine göre teşkilatlandırdı: on, yüz, bin ve on bin (tümen) birlikleri. Bu onlu askerî sistem sonraki Türk devletlerine ve dünya ordularına örnek oldu. Sayı 10, bu onlu teşkilatın temel basamağıdır."
  },
  {
   "sayi": 10,
   "baslik": "Onuncu Padişah Kanuni",
   "bilgi": "Osmanlı'nın yükseliş dönemi sayılan dönem güçlü sultanlar çağıdır; Fatih, II. Bayezid, Yavuz ve Kanuni gibi hükümdarlar imparatorluğu zirveye taşıdı. Bunlar arasında Kanuni Sultan Süleyman, Osmanlı tahtına çıkan 10. padişahtır. Sayı 10, Kanuni'nin sıra numarasını hatırlatır."
  },
  {
   "sayi": 10,
   "baslik": "Enderun'da Kademeli Yükseliş",
   "bilgi": "Osmanlı sarayında Enderun, devlet adamı ve komutan yetiştiren bir okuldu; öğrenciler kademeli odalarda eğitim görürdü. Disiplin ve liyakat esaslı bu sistem, en yetenekli devşirme gençlerini sadrazamlığa kadar yükseltebiliyordu. Eğitimin kademeli ilerleyişi, 10'lu basamak gibi adım adım yükselmeyi andırır."
  },
  {
   "sayi": 10,
   "baslik": "Onuncu Hükümdar Kanuni",
   "bilgi": "Kanuni Sultan Süleyman, Osmanlı tahtına çıkan 10. padişahtır ve 46 yıl hüküm sürerek en uzun saltanat süren sultan oldu. Döneminde hukuk alanında yaptığı düzenlemeler nedeniyle Batı'da 'Muhteşem', Doğu'da 'Kanuni' unvanıyla anıldı. Sayı 10, Kanuni'nin tahttaki sırasını gösterir."
  },
  {
   "sayi": 10,
   "baslik": "On Bin Kişilik Tümen",
   "bilgi": "Türk askerî tarihinde 'tümen' on bin askerden oluşan en büyük birliği ifade eder ve bu kelime bugün de orduda kullanılır. Mete Han'ın onlu teşkilatında tümen, sistemin en üst basamağını oluşturuyordu. Sayı 10, on bin kişilik tümeni meydana getiren onlu çarpan düzenine bağlanır."
  },
  {
   "sayi": 10,
   "baslik": "Onlu Sayma Düzeni",
   "bilgi": "Eski Türkler astronomide ve takvim hesaplarında usta olup On İki Hayvanlı Takvim'i kullanmış, sayma ve teşkilatlanmada onlu düzeni benimsemişlerdir. Ordularını on, yüz, bin diye bölmeleri yönetimde sayısal disiplin sağlıyordu. Sayı 10, Türklerin teşkilatçılıkta esas aldığı onlu sistemin çekirdeğidir."
  },
  {
   "sayi": 11,
   "baslik": "Malazgirt'in Kapısı",
   "bilgi": "1071 Malazgirt Savaşı, Sultan Alparslan komutasındaki Büyük Selçuklu ordusunun Bizans İmparatoru Romanos Diogenes'i yendiği savaştır. Anadolu'nun Türklere açıldığı bu dönüm noktası 11. yüzyılda yaşanmıştır; 1071 yılı 11. yüzyıla aittir. Sen de 11 kare ilerle."
  },
  {
   "sayi": 11,
   "baslik": "Kanuni'nin Uzun Saltanatı",
   "bilgi": "Kanuni Sultan Süleyman, Osmanlı tahtında en uzun süre kalan padişahtır; 1520'den 1566'ya kadar yaklaşık 46 yıl hüküm sürmüştür. Kendisi Osmanlı'nın 10. padişahıdır ve ondan sonra tahta çıkan oğlu II. Selim 11. padişah olmuştur. 11. padişaha ulaşan halkayı temsilen 11 kare ilerle."
  },
  {
   "sayi": 11,
   "baslik": "On Birinci Padişah II. Selim",
   "bilgi": "II. Selim, babası Kanuni Sultan Süleyman'ın 1566'da vefatı üzerine tahta çıkan ve Osmanlı'nın 11. padişahı olan hükümdardır. Sıralamada Osman Bey'den itibaren tam on birinci halkayı oluşturur; onun cülusunu temsilen 11 kare ilerle."
  },
  {
   "sayi": 11,
   "baslik": "Kuruluşun 11. Yılı",
   "bilgi": "Osmanlı Beyliği'nin kuruluşu genel kabulle 1299 yılına dayandırılır. Buna göre beyliğin kuruluşunun 11. yılı 1310 yılına denk gelir; bu sıralarda Osman Bey, Bursa ve İznik çevresindeki Bizans tekfurluklarına yönelik kuşatma ve akınlarını sürdürüyordu. Kuruluşun ilk on bir yılını anarak 11 kare ilerle."
  },
  {
   "sayi": 11,
   "baslik": "Otlukbeli'nin Galibi",
   "bilgi": "Fatih Sultan Mehmed, 1473 Otlukbeli Savaşı'nda Akkoyunlu hükümdarı Uzun Hasan'ı kesin bir yenilgiye uğratarak Osmanlı'nın doğu sınırını güvence altına almıştır. Bu zaferin kazanıldığı 1473 yılı, Anadolu'nun kapısının açıldığı Malazgirt'in (1071) yer aldığı 11. yüzyılın bir devamıdır; o yüzyıla atfen 11 kare ilerle."
  },
  {
   "sayi": 11,
   "baslik": "Mohaç'ta İki Saatlik Zafer",
   "bilgi": "1526 Mohaç Meydan Muharebesi'nde Kanuni Sultan Süleyman, Macar Kralı II. Lajos'un ordusunu yaklaşık iki saatte bozguna uğratmış ve Macaristan'ın büyük bölümü Osmanlı etkisine girmiştir. Bu zaferi kazanan Kanuni, Osmanlı'nın 10. padişahıdır; ondan sonra tahta geçecek olan oğlu II. Selim ise 11. padişahtır. Bu 11. halkayı düşünerek 11 kare ilerle."
  },
  {
   "sayi": 12,
   "baslik": "On İki Hayvanlı Türk Takvimi",
   "bilgi": "Eski Türkler, Çin etkisinden de izler taşıyan ve her yılı bir hayvanla anılan on iki yıllık bir döngüye dayanan takvim kullanırlardı: sıçan, sığır, pars, tavşan, ejder (lu), yılan, at, koyun, maymun, tavuk, köpek ve domuz. Kaşgarlı Mahmud'un Dîvânu Lugâti't-Türk adlı eseri (11. yüzyıl) bu on iki hayvanlı takvimi ve hayvanların sırasını ayrıntılı biçimde aktarır."
  },
  {
   "sayi": 12,
   "baslik": "On İki Ana Makam",
   "bilgi": "Klasik Türk-İslam mûsikîsi kuramında, makamların düzenlendiği edvâr geleneğinde on iki ana (asıl) makam sayılırdı. Sistemci ekolün öncüsü Safiyüddîn Urmevî'nin 13. yüzyılda kaleme aldığı Kitâbü'l-Edvâr adlı eserinde uşşak, nevâ, bûselik, rast, ırak, isfahan gibi makamlar bu on iki temel makam çerçevesinde tasnif edilmiş; bu kuram, Osmanlı mûsikîsinin asırlarca süren makam anlayışına temel oluşturmuştur."
  },
  {
   "sayi": 12,
   "baslik": "On İki Aylık Mali Yıl ve Rumî Takvim",
   "bilgi": "Osmanlı Devleti, vergi ve maaş gibi mali işlerini güneş yılına dayanan on iki aylık Rumî takvime göre yürütürdü; çünkü on bir gün kısa olan kamerî (hicrî) yıl, tarımsal hasat ve maliye düzeniyle uyuşmuyordu. Mali yılın başlangıcı, ilkbaharda tarım gelirlerinin toplanmaya başladığı Mart ayına denk getirilmişti."
  },
  {
   "sayi": 12,
   "baslik": "Lale Devri ve On İki Burç İnceliği",
   "bilgi": "III. Ahmed döneminde (1718-1730) yaşanan Lale Devri'nde sanat, mimari ve süsleme alanında büyük bir incelik gelişmiş; çini, minyatür ve takvim sanatında on iki burcu betimleyen bezemeler de rağbet görmüştür. Bu dönemde İbrahim Müteferrika ilk Türkçe matbaayı kurarak 1729'da ilk basılı kitabı (Vankulu Lügatı) üretmiştir."
  },
  {
   "sayi": 12,
   "baslik": "On İki Hayvandan Pars Yılı",
   "bilgi": "On iki hayvanlı Türk takviminde üçüncü sırada yer alan pars (bars), Türk hükümdarlık geleneğinde güç ve cesaretin simgesi sayılırdı. Orta Asya Türk devletlerinde hükümdarlar, doğdukları ya da tahta çıktıkları yılı bu on iki hayvandan birinin adıyla anar, yazışmalarda ve kitabelerde yıl bu şekilde belirtilirdi."
  },
  {
   "sayi": 12,
   "baslik": "Yılın On İki Ayı ve Nevruz",
   "bilgi": "Türklerde yılın on iki ayı güneş takvimine göre düzenlenir, yeni yıl ise gece ile gündüzün eşitlendiği 21 Mart Nevruz'unda başlardı. Selçuklu Sultanı Melikşah döneminde Ömer Hayyam'ın da içinde bulunduğu astronomlar, 1079'da düzenledikleri Celâlî Takvimi ile yılı on iki aya büyük bir hassasiyetle bölmüş, bu takvim Gregoryen takviminden bile daha küçük bir hata payına sahip olmuştur."
  },
  {
   "sayi": 2,
   "baslik": "Menzil Teşkilatı",
   "bilgi": "Menzilhanelerde at değiştiren ulaklar haberi şimşek hızıyla taşırdı. Hızın sayesinde 2 ilerle ve TEKRAR Sefer Kartı çek!",
   "ozel": {
    "tur": "tekrar"
   }
  },
  {
   "sayi": 3,
   "baslik": "Sefer-i Hümayun Coşkusu",
   "bilgi": "Padişah ordunun başında sefere çıktı; ordu şevkle ilerledi. 3 ilerle ve tekrar oyna!",
   "ozel": {
    "tur": "tekrar"
   }
  },
  {
   "sayi": 1,
   "baslik": "Acele Ferman",
   "bilgi": "Saraydan acele ferman geldi, hızlıca yola koyul. 1 ilerle ve tekrar çek!",
   "ozel": {
    "tur": "tekrar"
   }
  },
  {
   "sayi": 4,
   "baslik": "Akıncı Hızı",
   "bilgi": "Uç beylerinin akıncıları yıldırım gibi ilerlerdi. 4 ilerle ve tekrar oyna!",
   "ozel": {
    "tur": "tekrar"
   }
  },
  {
   "sayi": 0,
   "baslik": "Donanma Seferi",
   "bilgi": "Kaptan-ı Derya donanmayı denize açtı; gemiyle en yakın limana taşındın.",
   "ozel": {
    "tur": "isinla",
    "hedef": "liman"
   }
  },
  {
   "sayi": 0,
   "baslik": "Sefere Çağrı",
   "bilgi": "Tuğlar dikildi, ordu Sefer Meydanı'nda toplanıyor. Başa dön ve ulûfeni al!",
   "ozel": {
    "tur": "isinla",
    "hedef": 0
   }
  },
  {
   "sayi": 0,
   "baslik": "Surre Alayı",
   "bilgi": "Hac kervanına katıldın, kutsal beldeye yöneldin. Haremeyn'e git.",
   "ozel": {
    "tur": "isinla",
    "hedef": 39
   }
  },
  {
   "sayi": 3,
   "baslik": "Kış Bastırdı",
   "bilgi": "Sefer mevsimi bitti, ordu kışlağa çekildi. 3 kare geri git.",
   "ozel": {
    "tur": "geri"
   }
  },
  {
   "sayi": 2,
   "baslik": "Yollar Kapandı",
   "bilgi": "Sel ve çamur yolları kapattı; geri dönmek zorunda kaldın. 2 kare geri.",
   "ozel": {
    "tur": "geri"
   }
  },
  {
   "sayi": 4,
   "baslik": "Kuşatma Bozgunu",
   "bilgi": "Uzun kuşatma sonuç vermedi, ordu geri çekildi. 4 kare geri git.",
   "ozel": {
    "tur": "geri"
   }
  },
  {
   "sayi": 0,
   "baslik": "Casus Oyunu",
   "bilgi": "Bir casus seni yanlış yola sürükledi; önündeki en yakın rakiple yer değiştirdin!",
   "ozel": {
    "tur": "sakaci",
    "alt": "yer_degis"
   }
  },
  {
   "sayi": 0,
   "baslik": "Ani Baskın",
   "bilgi": "Sınır boyunda ani bir akın düzenledin; en yakın rakipten 500 akçe ganimet aldın.",
   "ozel": {
    "tur": "sakaci",
    "alt": "yakindan_al",
    "deger": 500
   }
  },
  {
   "sayi": 0,
   "baslik": "Şehzade Şenliği",
   "bilgi": "Sarayda şehzade doğdu, şenlik var! Her rakipten 200 akçe sevinç ihsanı topladın.",
   "ozel": {
    "tur": "sakaci",
    "alt": "herkesten",
    "deger": 200
   }
  }
 ],
 "sorular": [
  {
   "soru": "Osmanlı Devleti'nin kurucusu olan ve devlete adını veren padişah kimdir?",
   "secenekler": [
    "Osman Bey",
    "Orhan Bey",
    "Ertuğrul Gazi",
    "Murad Hüdavendigâr"
   ],
   "dogru": 0,
   "aciklama": "Osmanlı Devleti 1299 yılında Osman Bey tarafından kurulmuştur; devlet adını bu kurucu beyden alır.",
   "konu": "Kuruluş",
   "seviye": "kolay"
  },
  {
   "soru": "İstanbul'u 1453'te fethederek Osmanlı Devleti'ni imparatorluğa dönüştüren padişah hangisidir?",
   "secenekler": [
    "Yıldırım Bayezid",
    "Fatih Sultan Mehmed",
    "Yavuz Sultan Selim",
    "Kanuni Sultan Süleyman"
   ],
   "dogru": 1,
   "aciklama": "II. Mehmed, 1453'te İstanbul'u fethederek 'Fatih' unvanını almış ve Bizans'a son vermiştir.",
   "konu": "Fetihler",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı Devleti'nde 'Kanuni' lakabıyla anılan ve uzun saltanatı döneminde devletin en parlak çağını yaşatan padişah kimdir?",
   "secenekler": [
    "I. Selim",
    "I. Süleyman",
    "II. Selim",
    "III. Murad"
   ],
   "dogru": 1,
   "aciklama": "I. Süleyman, çıkardığı kanunlar ve adalet anlayışı nedeniyle 'Kanuni' olarak anılmış, Batı'da ise 'Muhteşem' lakabıyla tanınmıştır.",
   "konu": "Yükseliş",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı ordusunda devşirme sistemiyle yetiştirilen, padişaha bağlı yaya piyade asker ocağına ne ad verilir?",
   "secenekler": [
    "Akıncı",
    "Yeniçeri",
    "Sipahi",
    "Azap"
   ],
   "dogru": 1,
   "aciklama": "Yeniçeri Ocağı, devşirilen çocukların eğitilmesiyle oluşturulan, padişaha doğrudan bağlı daimi piyade ordusudur.",
   "konu": "Kurumlar",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı Devleti'nde devlet işlerinin görüldüğü, sadrazamın başkanlık ettiği en yüksek yönetim ve danışma kuruluna ne denir?",
   "secenekler": [
    "Divan-ı Hümayun",
    "Enderun",
    "Bab-ı Âli",
    "Şehzadegân"
   ],
   "dogru": 0,
   "aciklama": "Divan-ı Hümayun, devlet meselelerinin görüşülüp karara bağlandığı en üst yönetim organıdır.",
   "konu": "Kurumlar",
   "seviye": "kolay"
  },
  {
   "soru": "1517'de Mısır Seferi sonrasında hilafeti Osmanlı'ya getiren padişah hangisidir?",
   "secenekler": [
    "Fatih Sultan Mehmed",
    "Yavuz Sultan Selim",
    "Kanuni Sultan Süleyman",
    "II. Bayezid"
   ],
   "dogru": 1,
   "aciklama": "Yavuz Sultan Selim, 1517'de Memlûk Devleti'ni yenerek Mısır'ı fethetmiş ve hilafet Osmanlı padişahlarına geçmiştir.",
   "konu": "Yükseliş",
   "seviye": "kolay"
  },
  {
   "soru": "Mimar Sinan'ın 'ustalık eserim' dediği, Edirne'de bulunan ünlü camii hangisidir?",
   "secenekler": [
    "Süleymaniye Camii",
    "Selimiye Camii",
    "Şehzade Camii",
    "Sultanahmet Camii"
   ],
   "dogru": 1,
   "aciklama": "Mimar Sinan, Edirne'deki Selimiye Camii için 'ustalık eserim' demiştir; cami Osmanlı mimarisinin zirvelerinden biridir.",
   "konu": "Kültür-Medeniyet",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı öncesi Türk-İslam tarihinde Malazgirt Savaşı'nı 1071'de kazanarak Anadolu'nun kapılarını Türklere açan Büyük Selçuklu sultanı kimdir?",
   "secenekler": [
    "Tuğrul Bey",
    "Alparslan",
    "Melikşah",
    "Çağrı Bey"
   ],
   "dogru": 1,
   "aciklama": "Sultan Alparslan, 1071 Malazgirt Savaşı'nda Bizans'ı yenerek Anadolu'nun Türkleşmesinin önünü açmıştır.",
   "konu": "Türk-İslam Tarihi",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı Devleti'nde şehzadelerin eğitildiği ve devlet adamlarının yetiştirildiği saray okuluna ne ad verilir?",
   "secenekler": [
    "Medrese",
    "Enderun",
    "Sıbyan Mektebi",
    "Darülfünun"
   ],
   "dogru": 1,
   "aciklama": "Enderun, Topkapı Sarayı içinde yer alan, yetenekli öğrencilerin devlet hizmetine hazırlandığı saray okuludur.",
   "konu": "Kurumlar",
   "seviye": "kolay"
  },
  {
   "soru": "İlk Türk-İslam devletlerinden olan ve 'kalıcı ilk Türk-İslam devleti' kabul edilen, Satuk Buğra Han döneminde İslamiyet'i resmen benimseyen devlet hangisidir?",
   "secenekler": [
    "Karahanlılar",
    "Gazneliler",
    "Büyük Selçuklular",
    "Tolunoğulları"
   ],
   "dogru": 0,
   "aciklama": "Karahanlılar, Satuk Buğra Han döneminde İslamiyet'i kabul eden ilk Müslüman Türk devleti olarak kabul edilir.",
   "konu": "Türk-İslam Tarihi",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı Devleti'nde toprak ve vergi gelirlerinin asker yetiştirme karşılığında dağıtılmasına dayanan toprak sistemine ne ad verilir?",
   "secenekler": [
    "İltizam Sistemi",
    "Tımar Sistemi",
    "Malikâne Sistemi",
    "Vakıf Sistemi"
   ],
   "dogru": 1,
   "aciklama": "Tımar Sistemi'nde sipahilere verilen toprak gelirleri karşılığında asker beslenmesi ve tarımsal üretimin sürdürülmesi sağlanmıştır.",
   "konu": "Kurumlar",
   "seviye": "kolay"
  },
  {
   "soru": "Birinci Kosova Savaşı'nı kazanan ancak savaş alanında şehit edilen Osmanlı padişahı kimdir?",
   "secenekler": [
    "Orhan Bey",
    "I. Murad",
    "Yıldırım Bayezid",
    "I. Mehmed"
   ],
   "dogru": 1,
   "aciklama": "I. Murad (Hüdavendigâr), 1389 Birinci Kosova Savaşı'nı kazanmış, ancak savaş sonrası şehit edilmiştir.",
   "konu": "Fetihler",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı Devleti'nin ilk başkenti hangi şehirdir?",
   "secenekler": [
    "Bursa",
    "Söğüt",
    "Edirne",
    "İznik"
   ],
   "dogru": 0,
   "aciklama": "Osmanlı Beyliği Söğüt ve çevresinde kurulmuş olsa da, ilk başkent kabul edilen şehir 1326'da fethedilen Bursa'dır. Daha sonra Edirne başkent olmuştur.",
   "konu": "Kuruluş",
   "seviye": "kolay"
  },
  {
   "soru": "Ankara Savaşı'nda (1402) Timur'a yenilerek esir düşen ve bu yenilgiyle Osmanlı'da Fetret Devri'ni başlatan padişah kimdir?",
   "secenekler": [
    "I. Murad",
    "Yıldırım Bayezid",
    "Çelebi Mehmed",
    "II. Murad"
   ],
   "dogru": 1,
   "aciklama": "Yıldırım Bayezid, 1402 Ankara Savaşı'nda Timur'a yenilip esir düşmüş, ardından taht kavgalarıyla Fetret Devri başlamıştır.",
   "konu": "Yükseliş",
   "seviye": "kolay"
  },
  {
   "soru": "Büyük Selçuklu Devleti'nde medreseler kuran ve 'Siyasetname' adlı eseriyle tanınan ünlü vezir kimdir?",
   "secenekler": [
    "Nizamülmülk",
    "Tuğrul Bey",
    "Battal Gazi",
    "Yusuf Has Hacib"
   ],
   "dogru": 0,
   "aciklama": "Nizamülmülk, Büyük Selçuklu veziri olarak Nizamiye Medreselerini kurmuş ve devlet yönetimine dair 'Siyasetname'yi yazmıştır.",
   "konu": "Önemli Şahsiyetler",
   "seviye": "kolay"
  },
  {
   "soru": "Karlofça Antlaşması (1699) Osmanlı tarihinde hangi dönemin başlangıcı kabul edilir?",
   "secenekler": [
    "Yükseliş Dönemi",
    "Duraklama sonrası Gerileme Dönemi",
    "Kuruluş Dönemi",
    "Fetret Devri"
   ],
   "dogru": 1,
   "aciklama": "Karlofça Antlaşması ile Osmanlı ilk kez geniş topraklar kaybetmiş, bu antlaşma gerileme döneminin başlangıcı sayılmıştır.",
   "konu": "Önemli Olaylar",
   "seviye": "kolay"
  },
  {
   "soru": "Kaşgarlı Mahmud'un Türkçeyi Araplara öğretmek ve Türk dilinin zenginliğini göstermek amacıyla yazdığı ünlü sözlük-eser hangisidir?",
   "secenekler": [
    "Kutadgu Bilig",
    "Divanü Lugati't-Türk",
    "Atabetü'l-Hakayık",
    "Divan-ı Hikmet"
   ],
   "dogru": 1,
   "aciklama": "Kaşgarlı Mahmud'un yazdığı Divanü Lugati't-Türk, Türkçenin ilk sözlüğü ve Türk kültürünün önemli bir kaynağıdır.",
   "konu": "Kültür-Medeniyet",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı donanmasının ünlü amirali olup 'Kitab-ı Bahriye' adlı denizcilik eserini yazan ve haritalarıyla tanınan denizci kimdir?",
   "secenekler": [
    "Barbaros Hayreddin Paşa",
    "Piri Reis",
    "Turgut Reis",
    "Kılıç Ali Paşa"
   ],
   "dogru": 1,
   "aciklama": "Piri Reis, ünlü dünya haritasını çizen ve 'Kitab-ı Bahriye' adlı denizcilik kılavuzunu yazan Osmanlı denizcisidir.",
   "konu": "Önemli Şahsiyetler",
   "seviye": "kolay"
  },
  {
   "soru": "Osmanlı Devleti'nin kurucusu Osman Gazi'nin bağlı olduğu Anadolu Selçuklu Devleti'nin uç beyliği hangi bölgede konumlanmıştı?",
   "secenekler": [
    "Bizans sınırındaki Söğüt ve çevresi",
    "Akdeniz kıyısındaki Antalya",
    "Karadeniz'deki Trabzon",
    "Doğu Anadolu'daki Erzurum"
   ],
   "dogru": 0,
   "aciklama": "Osmanlılar, Anadolu Selçuklu Devleti'nin Bizans sınırındaki bir uç (sınır) beyliğiydi. Söğüt ve Domaniç bölgesinde yerleşen bu beylik, Bizans'a komşu olması sayesinde fetih ve gaza imkânı bularak hızla büyüdü.",
   "konu": "Kuruluş Dönemi",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı Devleti'nin Rumeli'deki ilk kalıcı toprağı olan ve Avrupa'ya geçişte üs olarak kullanılan kale hangisidir?",
   "secenekler": [
    "Çimpe Kalesi",
    "Belgrad Kalesi",
    "Rumeli Hisarı",
    "Anadolu Hisarı"
   ],
   "dogru": 0,
   "aciklama": "Orhan Bey döneminde, oğlu Süleyman Paşa komutasındaki kuvvetler 1353'te Çimpe Kalesi'ni ele geçirdi. Bu kale, Osmanlıların Rumeli'deki ilk toprağı oldu ve Balkanlara yönelik fetihlerin üssü hâline geldi.",
   "konu": "Rumeli'ye Geçiş",
   "seviye": "orta"
  },
  {
   "soru": "I. Murad döneminde gerçekleşen ve Haçlı ordusuna karşı kazanılan, Balkanlardaki Osmanlı hâkimiyetini pekiştiren savaş hangisidir?",
   "secenekler": [
    "Sırpsındığı Savaşı",
    "Malazgirt Savaşı",
    "Mohaç Savaşı",
    "Ankara Savaşı"
   ],
   "dogru": 0,
   "aciklama": "1364'teki Sırpsındığı Savaşı'nda I. Murad'ın kuvvetleri Sırp, Bulgar ve Macarlardan oluşan Haçlı ordusunu yenilgiye uğrattı. Bu zafer, Osmanlıların Balkanlardaki ilerleyişini kalıcı hâle getirdi.",
   "konu": "Yükselişe Geçiş",
   "seviye": "orta"
  },
  {
   "soru": "Yıldırım Bayezid'in Timur'a yenilerek esir düştüğü ve ardından Osmanlı'da Fetret Devri'nin başladığı savaş hangisidir?",
   "secenekler": [
    "Ankara Savaşı",
    "Niğbolu Savaşı",
    "Varna Savaşı",
    "Kosova Savaşı"
   ],
   "dogru": 0,
   "aciklama": "1402'deki Ankara Savaşı'nda Timur, Yıldırım Bayezid'i yenip esir aldı. Bu yenilgi sonrası şehzadeler arasında taht kavgaları başladı ve yaklaşık 11 yıl süren Fetret Devri (1402-1413) yaşandı.",
   "konu": "Fetret Devri",
   "seviye": "orta"
  },
  {
   "soru": "İstanbul'un fethi sırasında (1453) Bizans surlarını aşmak için kullanılan büyük topu döken Macar asıllı top dökümcüsü kimdir?",
   "secenekler": [
    "Urban (Orban)",
    "Mimar Sinan",
    "Şahin Giray",
    "Akşemseddin"
   ],
   "dogru": 0,
   "aciklama": "İstanbul kuşatmasında, Macar asıllı top ustası Urban tarafından dökülen dev toplar Bizans surlarını dövmek için kullanıldı. Bu büyük toplar, kuşatmada Osmanlı'nın teknolojik üstünlüğünü gösterdi.",
   "konu": "İstanbul'un Fethi",
   "seviye": "orta"
  },
  {
   "soru": "Fatih Sultan Mehmed'in çıkardığı ve devlet düzenini, protokol kurallarını ve kanunları düzenleyen, kardeş katlini de hukuki dayanağa bağlayan kanun derlemesi hangisidir?",
   "secenekler": [
    "Kanunname-i Âl-i Osman",
    "Tanzimat Fermanı",
    "Sened-i İttifak",
    "Adalet Fermanı"
   ],
   "dogru": 0,
   "aciklama": "Fatih Sultan Mehmed, devletin merkezî yapısını güçlendirmek için Kanunname-i Âl-i Osman'ı düzenletti. Bu kanunnamede devlet teşkilatı, saray protokolü ve 'nizam-ı âlem' için kardeş katli gibi konular hükme bağlandı.",
   "konu": "Fatih Dönemi ve Kurumlar",
   "seviye": "orta"
  },
  {
   "soru": "Yavuz Sultan Selim'in 1517'de Memlûk Devleti'ni yıkmasının ardından halifelik makamının Osmanlı'ya geçmesi hangi gelişmeyle ilişkilendirilir?",
   "secenekler": [
    "Mısır'ın fethi",
    "Kıbrıs'ın fethi",
    "Belgrad'ın fethi",
    "Rodos'un fethi"
   ],
   "dogru": 0,
   "aciklama": "Yavuz Sultan Selim, Mercidabık ve Ridaniye savaşlarıyla Memlûk Devleti'ni yıkıp Mısır'ı fethetti (1517). Bu fetihle kutsal emanetler ve halifelik makamı Osmanlı'ya geçti; Osmanlı padişahları İslam dünyasının lideri konumuna yükseldi.",
   "konu": "Yavuz Dönemi Fetihleri",
   "seviye": "orta"
  },
  {
   "soru": "Kanuni Sultan Süleyman döneminde, 1526'da Macaristan'ın büyük bölümünün Osmanlı hâkimiyetine girmesini sağlayan ve yaklaşık iki saatte kazanılan meydan savaşı hangisidir?",
   "secenekler": [
    "Mohaç Meydan Savaşı",
    "Çaldıran Savaşı",
    "Preveze Deniz Savaşı",
    "Otlukbeli Savaşı"
   ],
   "dogru": 0,
   "aciklama": "1526'daki Mohaç Meydan Savaşı'nda Kanuni Sultan Süleyman, Macar ordusunu kısa sürede yenilgiye uğrattı. Bu zaferle Macaristan'ın büyük kısmı Osmanlı kontrolüne girdi ve Orta Avrupa'ya kapı açıldı.",
   "konu": "Kanuni Dönemi",
   "seviye": "orta"
  },
  {
   "soru": "Barbaros Hayreddin Paşa komutasındaki Osmanlı donanmasının 1538'de Haçlı donanmasını yenerek Akdeniz'de üstünlük kurmasını sağlayan deniz savaşı hangisidir?",
   "secenekler": [
    "Preveze Deniz Savaşı",
    "İnebahtı Deniz Savaşı",
    "Çeşme Deniz Savaşı",
    "Sinop Baskını"
   ],
   "dogru": 0,
   "aciklama": "1538'deki Preveze Deniz Savaşı'nda Barbaros Hayreddin Paşa, Andrea Doria komutasındaki Haçlı donanmasını yendi. Bu zafer Akdeniz'in bir 'Türk gölü' hâline gelmesinin başlangıcı sayılır ve deniz hâkimiyetini perçinledi.",
   "konu": "Denizcilik ve Akdeniz",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı klasik döneminde devletin en yüksek karar organı olan ve devlet işlerinin görüşüldüğü kurulun adı nedir?",
   "secenekler": [
    "Divan-ı Hümayun",
    "Enderun",
    "Meşveret Meclisi",
    "Ayan Meclisi"
   ],
   "dogru": 0,
   "aciklama": "Divan-ı Hümayun, Osmanlı'da idari, askeri, mali ve hukuki işlerin görüşülüp karara bağlandığı en yüksek devlet kuruludur. Sadrazam, kazaskerler, defterdarlar ve nişancı gibi üyelerden oluşur; padişah adına devleti yönetirdi.",
   "konu": "Devlet Teşkilatı",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı'da devşirme sistemiyle alınan çocukların yetiştirildiği ve devlet adamı olarak yetiştikleri saray okulu hangisidir?",
   "secenekler": [
    "Enderun Mektebi",
    "Sıbyan Mektebi",
    "Sahn-ı Seman Medresesi",
    "Mekteb-i Mülkiye"
   ],
   "dogru": 0,
   "aciklama": "Enderun, Osmanlı sarayında devşirme yoluyla alınan yetenekli gençlerin eğitildiği bir okuldu. Burada hem ilim hem askerlik öğretilir, başarılı olanlar vezirliğe kadar yükselen devlet adamları olarak yetiştirilirdi.",
   "konu": "Eğitim Kurumları",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı toprak sisteminde, vergi gelirleri karşılığında devlete asker (cebelü) yetiştirmekle yükümlü olan dirlik sahibi sipahilerin uygulamasına ne ad verilir?",
   "secenekler": [
    "Tımar sistemi",
    "İltizam sistemi",
    "Malikâne sistemi",
    "Vakıf sistemi"
   ],
   "dogru": 0,
   "aciklama": "Tımar sisteminde, devlet belirli bölgelerin vergi gelirlerini sipahilere bırakırdı. Sipahiler bu gelir karşılığında savaşa hazır atlı askerler (cebelü) beslemek ve bölgenin güvenliğini sağlamakla yükümlüydü. Bu sistem hem orduyu hem üretimi destekledi.",
   "konu": "Toprak ve Ordu Sistemi",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı'da farklı din ve mezhepten toplulukların kendi inanç, dil ve hukuk işlerinde özerk olarak örgütlendiği sisteme ne ad verilir?",
   "secenekler": [
    "Millet sistemi",
    "Devşirme sistemi",
    "Kapıkulu sistemi",
    "Lonca sistemi"
   ],
   "dogru": 0,
   "aciklama": "Millet sistemi, Osmanlı'da gayrimüslim toplulukların (Rum, Ermeni, Yahudi gibi) din temelinde örgütlenip kendi ibadet, eğitim ve aile hukuku işlerini yürütebilmesine dayanıyordu. Bu sistem, çok dinli yapının uzun süre bir arada yaşamasını sağladı.",
   "konu": "Toplum Yapısı",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı mimarisinin zirvesi sayılan Süleymaniye ve Selimiye camilerini inşa eden, dönemin baş mimarı kimdir?",
   "secenekler": [
    "Mimar Sinan",
    "Sedefkâr Mehmed Ağa",
    "Mimar Kemaleddin",
    "Davud Ağa"
   ],
   "dogru": 0,
   "aciklama": "Mimar Sinan, Kanuni ve sonrasındaki dönemde Osmanlı baş mimarı olarak yüzlerce esere imza attı. Şehzade Camii'ni çıraklık, Süleymaniye'yi kalfalık, Edirne'deki Selimiye'yi ise ustalık eseri olarak nitelendirmiştir.",
   "konu": "Kültür ve Medeniyet",
   "seviye": "orta"
  },
  {
   "soru": "Türk-İslam tarihinde, Talas Savaşı (751) sonrasında Türklerin kitleler hâlinde İslamiyet'i kabul etme sürecini hızlandıran önemli gelişme nedir?",
   "secenekler": [
    "Müslüman Araplarla Türklerin Çinlilere karşı birlikte savaşması",
    "Türklerin Bizans ile ittifak kurması",
    "Türklerin Maniheizm'i benimsemesi",
    "Türklerin Hindistan'a göç etmesi"
   ],
   "dogru": 0,
   "aciklama": "751'deki Talas Savaşı'nda Müslüman Araplar ile Karluk Türkleri, Çin'e (Tang ordusuna) karşı birlikte savaştı. Bu yakınlaşma, Türkler ile Müslümanlar arasındaki ilişkileri geliştirdi ve Türklerin kitleler hâlinde İslamiyet'i benimsemesinin önünü açtı.",
   "konu": "Türk-İslam Tarihi",
   "seviye": "orta"
  },
  {
   "soru": "Büyük Selçuklu Devleti'nde medreseler kuran, Nizamiye Medreseleri'ni açan ve 'Siyasetname' adlı eseri yazan ünlü vezir kimdir?",
   "secenekler": [
    "Nizamülmülk",
    "Tuğrul Bey",
    "Melikşah",
    "Alparslan"
   ],
   "dogru": 0,
   "aciklama": "Nizamülmülk, Alparslan ve Melikşah dönemlerinde Büyük Selçuklu veziri olarak devlet teşkilatını düzenledi. Bağdat ve diğer şehirlerde açtığı Nizamiye Medreseleri eğitime büyük katkı sağladı; 'Siyasetname' adlı eserinde devlet yönetimine dair görüşlerini aktardı.",
   "konu": "Türk-İslam Devletleri",
   "seviye": "orta"
  },
  {
   "soru": "Anadolu'nun Türklere kapılarının açılmasını sağlayan, 1071'de Sultan Alparslan'ın Bizans İmparatoru Romanos Diogenes'i yendiği savaş hangisidir?",
   "secenekler": [
    "Malazgirt Savaşı",
    "Pasinler Savaşı",
    "Miryokefalon Savaşı",
    "Dandanakan Savaşı"
   ],
   "dogru": 0,
   "aciklama": "1071'deki Malazgirt Savaşı'nda Büyük Selçuklu Sultanı Alparslan, Bizans ordusunu yenip imparator Romanos Diogenes'i esir aldı. Bu zaferle Anadolu'nun kapıları Türklere açıldı ve Anadolu'nun Türkleşmesi süreci başladı.",
   "konu": "Anadolu'nun Türkleşmesi",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı Devleti'nin Avrupa'da gerilemesinin ve toprak kaybetmeye başlamasının resmî başlangıcı kabul edilen, 1699'da imzalanan antlaşma hangisidir?",
   "secenekler": [
    "Karlofça Antlaşması",
    "Pasarofça Antlaşması",
    "Küçük Kaynarca Antlaşması",
    "Zitvatorok Antlaşması"
   ],
   "dogru": 0,
   "aciklama": "II. Viyana Kuşatması'nın başarısızlığı ve ardından gelen savaşların sonunda 1699'da imzalanan Karlofça Antlaşması ile Osmanlı, ilk kez büyük çapta toprak kaybetti (Macaristan vb.). Bu antlaşma, Osmanlı'nın Avrupa'da gerileme döneminin başlangıcı sayılır.",
   "konu": "Gerileme Dönemi",
   "seviye": "orta"
  },
  {
   "soru": "Osmanlı Beyliği'nin kuruluş döneminde Bizans'a karşı verilen ve Osman Bey'in nüfuzunu önemli ölçüde artıran 1302 tarihli muharebe hangisidir?",
   "secenekler": [
    "Koyunhisar (Bafeus) Muharebesi",
    "Pelekanon Muharebesi",
    "Sırpsındığı Muharebesi",
    "Maltepe Savaşı"
   ],
   "dogru": 0,
   "aciklama": "1302'deki Koyunhisar (Bafeus) Muharebesi, Osman Bey'in Bizans ordusunu yenerek bölgedeki gücünü pekiştirdiği ilk büyük meydan savaşıdır; Pelekanon (1329) ise Orhan Bey dönemine aittir.",
   "konu": "Kuruluş Dönemi",
   "seviye": "zor"
  },
  {
   "soru": "Osmanlı'da tımar sisteminin temelini oluşturan ve fethedilen toprakların gelir kaynaklarının kaydedildiği defterlere ne ad verilirdi?",
   "secenekler": [
    "Ruznamçe defteri",
    "Tahrir (mufassal/icmal) defteri",
    "Şakird defteri",
    "Mühimme defteri"
   ],
   "dogru": 1,
   "aciklama": "Tahrir defterleri, fethedilen bölgelerdeki vergi yükümlüsü nüfus ve gelir kaynaklarının ayrıntılı (mufassal) ve özet (icmal) olarak kaydedildiği defterlerdir; tımar dağıtımının esasını oluştururdu. Mühimme defterleri ise Divan kararlarını içerirdi.",
   "konu": "Kurumlar",
   "seviye": "zor"
  },
  {
   "soru": "Ankara Savaşı (1402) sonrası yaşanan Fetret Devri'ni sona erdirerek devlet birliğini yeniden sağlayan padişah kimdir?",
   "secenekler": [
    "II. Murad",
    "I. Mehmed (Çelebi)",
    "Yıldırım Bayezid",
    "II. Bayezid"
   ],
   "dogru": 1,
   "aciklama": "1402 Ankara Savaşı'nda Timur'a yenilen Yıldırım Bayezid'in oğulları arasındaki taht mücadelesi (Fetret Devri) 1413'te Çelebi Mehmed'in (I. Mehmed) kardeşlerini bertaraf ederek birliği sağlamasıyla sona ermiştir.",
   "konu": "Kuruluş Dönemi",
   "seviye": "zor"
  },
  {
   "soru": "İstanbul'un fethinde (1453) Osmanlı donanmasının Haliç'i kapatan zinciri aşmak için karadan gemilerin yürütülmesi olayı, hangi stratejik zorunluluktan kaynaklanmıştır?",
   "secenekler": [
    "Bizans'ın kara surlarının aşılamaması",
    "Haliç'in girişindeki zincir engeli nedeniyle donanmanın içeri girememesi",
    "Macar topçularının saldırısı",
    "Karadeniz'den gelecek yardımın engellenmesi"
   ],
   "dogru": 1,
   "aciklama": "Bizans, Haliç'in girişini büyük bir zincirle kapatmıştı. II. Mehmed, donanmayı Haliç'e sokup surları iki yönden baskı altına almak için gemileri Galata sırtlarından karadan yürüterek Haliç'e indirdi.",
   "konu": "Fetihler",
   "seviye": "zor"
  },
  {
   "soru": "Yavuz Sultan Selim'in 1517'de Memlük Devleti'ni yıkmasıyla Osmanlı'ya geçen ve halifelik makamının Osmanlı'ya intikaliyle ilişkilendirilen kutsal emanetlerin korunduğu kentler arasında öncelikli olan hangisidir?",
   "secenekler": [
    "Şam ve Halep",
    "Mekke ve Medine (Haremeyn)",
    "Bağdat ve Basra",
    "Kudüs ve Yafa"
   ],
   "dogru": 1,
   "aciklama": "1517 Mısır Seferi sonrası Mekke ve Medine'yi kapsayan Haremeyn'in himayesi Osmanlı'ya geçti; padişah 'Hâdimü'l-Haremeyn' unvanını aldı. Bu durum Osmanlı'nın İslam dünyasındaki nüfuzunu pekiştirdi.",
   "konu": "Yükselme Dönemi",
   "seviye": "zor"
  },
  {
   "soru": "Kanuni Sultan Süleyman döneminde hukuki düzenlemeleri sistematize ederek 'kanunname' geleneğini zirveye taşıyan ve 'Şeyhülislam' olarak görev yapan ünlü hukukçu kimdir?",
   "secenekler": [
    "Molla Fenari",
    "Ebussuud Efendi",
    "İbn Kemal (Kemalpaşazade)",
    "Zembilli Ali Efendi"
   ],
   "dogru": 1,
   "aciklama": "Ebussuud Efendi, Kanuni döneminde örfi hukuk ile şer'i hukuku uzlaştıran fetvalarıyla ve kanunname düzenlemeleriyle Osmanlı hukuk sisteminin sistematikleşmesinde merkezî rol oynamıştır.",
   "konu": "Önemli Şahsiyetler",
   "seviye": "zor"
  },
  {
   "soru": "Osmanlı merkez teşkilatında Divan-ı Hümayun'da maliye işlerinden sorumlu olan ve hazine ile bütçeyi yöneten görevli hangisidir?",
   "secenekler": [
    "Nişancı",
    "Defterdar",
    "Kazasker",
    "Reisülküttab"
   ],
   "dogru": 1,
   "aciklama": "Defterdar, Divan-ı Hümayun'da devletin mali işlerinden, hazineden ve bütçeden sorumluydu. Nişancı tuğra ve kanunlardan, Kazasker büyük davalar ve kadı atamalarından, Reisülküttab ise yazışmalardan sorumluydu.",
   "konu": "Kurumlar",
   "seviye": "zor"
  },
  {
   "soru": "Karahanlı hükümdarı Satuk Buğra Han'ın İslam'ı kabulüyle önemli bir dönüm noktası yaşanmıştır. Karahanlıların Türk-İslam tarihindeki en önemli özelliği nedir?",
   "secenekler": [
    "İlk Müslüman Türk devleti olarak Türkçeyi resmi dil olarak kullanmaları",
    "Abbasi halifeliğini ele geçirmeleri",
    "Anadolu'yu Türkleştirmeleri",
    "Hindistan'a İslam'ı yaymaları"
   ],
   "dogru": 0,
   "aciklama": "Karahanlılar, topluca İslam'ı kabul eden ilk büyük Türk devleti olup yönetim ve edebiyatta Türkçeyi kullanmalarıyla (Kutadgu Bilig, Divanü Lügati't-Türk bu dönemin ürünleridir) öne çıkar.",
   "konu": "Türk-İslam Tarihi",
   "seviye": "zor"
  },
  {
   "soru": "Büyük Selçuklu Devleti'nde Nizamülmülk tarafından kurulan ve Sünni İslam eğitimi ile devlet memuru yetiştiren medrese sistemine ne ad verilir?",
   "secenekler": [
    "Beytülhikme",
    "Nizamiye Medreseleri",
    "Darülfünun",
    "Enderun"
   ],
   "dogru": 1,
   "aciklama": "Nizamülmülk'ün kurduğu Nizamiye Medreseleri, Bağdat başta olmak üzere çeşitli şehirlerde Sünni eğitim veren, Şii-Batıni propagandasına karşı koyan ve devlet kadrolarını yetiştiren kurumlardı.",
   "konu": "Türk-İslam Tarihi",
   "seviye": "zor"
  },
  {
   "soru": "1071 Malazgirt Savaşı'nın Türk tarihi açısından en kalıcı sonucu aşağıdakilerden hangisidir?",
   "secenekler": [
    "Bizans'ın tamamen yıkılması",
    "Anadolu kapılarının Türklere açılması ve Anadolu'nun Türkleşme sürecinin başlaması",
    "Abbasi halifeliğinin sona ermesi",
    "Haçlı Seferlerinin başlaması"
   ],
   "dogru": 1,
   "aciklama": "Alparslan'ın Bizans imparatoru Romanos Diogenes'i yendiği Malazgirt Savaşı, Anadolu'nun kapılarını Türklere açmış ve Anadolu'nun yurt edinilmesi (Türkleşmesi) sürecini başlatmıştır.",
   "konu": "Türk-İslam Tarihi",
   "seviye": "zor"
  },
  {
   "soru": "Osmanlı'da devşirme sistemiyle alınan çocukların eğitildiği ve sarayda üst düzey yönetici yetiştiren okul hangisidir?",
   "secenekler": [
    "Sahn-ı Seman",
    "Enderun Mektebi",
    "Süleymaniye Medresesi",
    "Mekteb-i Sultani"
   ],
   "dogru": 1,
   "aciklama": "Enderun, devşirme yöntemiyle seçilen yetenekli gençlerin saray içinde eğitilerek vezir, beylerbeyi gibi üst düzey devlet adamı olarak yetiştirildiği saray okuluydu. Sahn-ı Seman ise Fatih'in kurduğu yüksek medrese idi.",
   "konu": "Kurumlar",
   "seviye": "zor"
  },
  {
   "soru": "Osmanlı'nın Avrupa'da kalıcı yenilgiler dönemine girmesinin başlangıcı sayılan ve toprak kaybeden ilk antlaşma olarak nitelenen 1699 antlaşması hangisidir?",
   "secenekler": [
    "Karlofça Antlaşması",
    "Pasarofça Antlaşması",
    "Zitvatorok Antlaşması",
    "Vasvar Antlaşması"
   ],
   "dogru": 0,
   "aciklama": "1699 Karlofça Antlaşması, II. Viyana bozgunu sonrası Kutsal İttifak'a karşı imzalanmış olup Osmanlı'nın büyük çapta toprak kaybettiği ilk antlaşmadır ve Gerileme Dönemi'nin başlangıcı kabul edilir.",
   "konu": "Duraklama-Gerileme",
   "seviye": "zor"
  },
  {
   "soru": "Türk-İslam edebiyatının ilk eserlerinden olan ve Yusuf Has Hacip tarafından yazılan, ideal devlet yönetimini sembolik karakterlerle anlatan eser hangisidir?",
   "secenekler": [
    "Divanü Lügati't-Türk",
    "Kutadgu Bilig",
    "Atabetü'l-Hakayık",
    "Divan-ı Hikmet"
   ],
   "dogru": 1,
   "aciklama": "Yusuf Has Hacip'in 1069-1070'te Karahanlı hükümdarına sunduğu Kutadgu Bilig ('Mutluluk Veren Bilgi'), siyasetname türünde olup adalet, devlet, akıl ve kanaati temsil eden karakterlerle ideal yönetimi anlatır.",
   "konu": "Kültür-Medeniyet",
   "seviye": "zor"
  },
  {
   "soru": "Osmanlı toprak sisteminde devlete ait olup geliri belirli hizmetlere veya kişilere tahsis edilen ve mülkiyeti devlette kalan toprak türü hangisidir?",
   "secenekler": [
    "Mülk arazi",
    "Vakıf arazi",
    "Miri arazi",
    "Öşri arazi"
   ],
   "dogru": 2,
   "aciklama": "Miri arazi, mülkiyeti devlete ait olan ve kullanım hakkı (tasarruf) çiftçilere bırakılan toprak türüdür; tımar sisteminin temelini oluşturur. Mülk arazi özel mülkiyete, vakıf arazi ise hayır kurumlarına tahsis edilirdi.",
   "konu": "Kurumlar",
   "seviye": "zor"
  },
  {
   "soru": "Fatih Sultan Mehmed'in çıkardığı ve devletin bekası gerekçesiyle kardeş katlini hukuki zemine oturtan düzenlemeyi içeren kanun metni hangisidir?",
   "secenekler": [
    "Adaletname",
    "Kanunname-i Âl-i Osman",
    "Tevkii Kanunnamesi",
    "Ahkâm Defteri"
   ],
   "dogru": 1,
   "aciklama": "Fatih'in Kanunname-i Âl-i Osman'ı, devlet teşkilatını, protokolü ve saltanat veraset usullerini düzenlemiş; nizam-ı âlem (devletin düzeni) gerekçesiyle kardeş katline dair hükmü de içermiştir.",
   "konu": "Kurumlar",
   "seviye": "zor"
  },
  {
   "soru": "1389 I. Kosova Savaşı'nın Osmanlı açısından hem zafer hem de trajik bir kayıpla anılmasının nedeni nedir?",
   "secenekler": [
    "Padişah Murad'ın savaş alanında şehit edilmesi",
    "Ordunun büyük kayıplar vermesi",
    "Sırpların Osmanlı'yı yenmesi",
    "Haçlı ittifakının kurulması"
   ],
   "dogru": 0,
   "aciklama": "1389 I. Kosova Savaşı Osmanlı zaferiyle sonuçlanmış, ancak savaş alanında I. Murad (Hüdavendigar) bir Sırp tarafından şehit edilmiştir; bu, savaş meydanında şehit düşen tek Osmanlı padişahı olmasıyla anılır.",
   "konu": "Kuruluş Dönemi",
   "seviye": "zor"
  }
 ],
 "placeholder": false
};
