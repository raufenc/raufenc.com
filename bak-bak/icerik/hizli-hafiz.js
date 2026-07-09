/* ============================================================
   İÇERİK PAKETİ — Hızlı Hafız.
   Motor bunu ?paket=hizli-hafiz ile yükler.
   mod:"orta" → 3x3 ızgara, MERKEZ hücre bilgi kartı,
   çevredeki 8 hücre tek nesne görselleri (1 hedef + 7 çeldirici).
   Görseller: varliklar/hizli-hafiz/<id>.jpg
   İpuçları: Rauf'un rafine ettiği saygılı ton (Hazreti X (aleyhisselam) / Cenâb-ı Allah).
   ============================================================ */
window.PAKET = {
  "meta": {
    "id": "hizli-hafiz",
    "oyunAdi": "Hızlı Hafız",
    "logo": "🧠",
    "ad": "",
    "altBaslik": "İpucundan Bul — Görsel Dikkat",
    "ders": "Din Kültürü ve Ahlâk Bilgisi",
    "sinif": "3-8",
    "surum": "1.0.0",
    "kok": "varliklar/hizli-hafiz/",
    "hedefKelime": "HIZLI HAFIZ",
    "soruModu": "bilgi",
    "mod": "orta",
    "nasil": [
      "Ortadaki <b>bilgi kartını</b> oku — sana bir ipucu verir.",
      "İpucuna <b>uyan resmi</b> çevredeki 8 karttan bul ve dokun.",
      "Doğru bulunca cevap ortada gösterilir — böylece <b>öğrenirsin</b>.",
      "Her doğru buluş <b>HIZLI&nbsp;HAFIZ</b>'dan bir harf kazandırır.",
      "<b>Tek Kişi:</b> süreye karşı yarış. <b>İki Kişi:</b> tableti aranıza koyun, karşılıklı yarışın."
    ]
  },
  "ogeler": [
    {
      "id": "deve",
      "ad": "Deve",
      "gorsel": "deve.jpg",
      "emoji": "🐫",
      "bilgi": "Gâşiye sûresinde yaratılışına bakmamız istenen, çölün hörgüçlü sabırlı bineği."
    },
    {
      "id": "hurma",
      "ad": "Hurma",
      "gorsel": "hurma.jpg",
      "emoji": "🌴",
      "bilgi": "Hazreti Meryem'e, ağacı silkeleyince taze düşen çölün tatlı meyvesi."
    },
    {
      "id": "uzum",
      "ad": "Üzüm",
      "gorsel": "uzum.jpg",
      "emoji": "🍇",
      "bilgi": "Bağlarda salkım salkım biten, taze de kuru da yenen tatlı meyve."
    },
    {
      "id": "karinca",
      "ad": "Karınca",
      "gorsel": "karinca.jpg",
      "emoji": "🐜",
      "bilgi": "Hazreti Süleyman (aleyhisselam)'ın ordusunu görünce dostlarını yuvaya çağıran minik canlı."
    },
    {
      "id": "yagmur",
      "ad": "Yağmur",
      "gorsel": "yagmur.jpg",
      "emoji": "🌧️",
      "bilgi": "Cenâb-ı Allah'ın gökten indirip kuru toprağı dirilttiği rahmet."
    },
    {
      "id": "dag",
      "ad": "Dağ",
      "gorsel": "dag.jpg",
      "emoji": "⛰️",
      "bilgi": "Yeryüzüne kazık gibi çakıldığı bildirilen, heybetli yüksek kütle."
    },
    {
      "id": "kum-saati",
      "ad": "Kum saati",
      "gorsel": "kum-saati.jpg",
      "emoji": "⏳",
      "bilgi": "Kumu akarken zamanın geçişini gösteren araç."
    },
    {
      "id": "terazi",
      "ad": "Terazi",
      "gorsel": "terazi.jpg",
      "emoji": "⚖️",
      "bilgi": "Alışverişte ve adalette doğru tartmayı öğütleyen iki kefeli mîzan."
    },
    {
      "id": "testi",
      "ad": "Testi",
      "gorsel": "testi.jpg",
      "emoji": "🏺",
      "bilgi": "Pişmiş topraktan yapılan, su taşınan kulplu kap."
    },
    {
      "id": "ekmek",
      "ad": "Ekmek",
      "gorsel": "ekmek.jpg",
      "emoji": "🍞",
      "bilgi": "Hazreti Yûsuf (aleyhisselam) kıssasında rüyada kuşların yediği, undan yapılan temel yiyecek."
    },
    {
      "id": "sayi-7",
      "ad": "Yedi",
      "gorsel": "sayi-7.jpg",
      "emoji": "7",
      "bilgi": "Kat kat yaratılan göklerin sayısı; bir haftanın günleri kadar."
    },
    {
      "id": "inek",
      "ad": "İnek",
      "gorsel": "inek.jpg",
      "emoji": "🐄",
      "bilgi": "Bakara sûresinde bir topluluğa kesmeleri emredilen, sütü bereketli büyükbaş."
    },
    {
      "id": "incir",
      "ad": "İncir",
      "gorsel": "incir.jpg",
      "emoji": "🌿",
      "bilgi": "Tîn sûresinde üzerine yemin edilen, içi minik tanecikli tatlı meyve."
    },
    {
      "id": "hudhud",
      "ad": "Hüdhüd",
      "gorsel": "hudhud.jpg",
      "emoji": "🐦",
      "bilgi": "Hazreti Süleyman (aleyhisselam)'a Sebe'den haber getiren tepeli kuş."
    },
    {
      "id": "ari",
      "ad": "Arı",
      "gorsel": "ari.jpg",
      "emoji": "🐝",
      "bilgi": "Nahl sûresinde dağ ve ağaçlara yuva kurması vahyedilen, bal yapan böcek."
    },
    {
      "id": "anahtar",
      "ad": "Anahtar",
      "gorsel": "anahtar.jpg",
      "emoji": "🗝️",
      "bilgi": "Karun'un hazineleri anılırken geçen; kilitli şeyleri açan alet."
    },
    {
      "id": "sepet",
      "ad": "Sepet",
      "gorsel": "sepet.jpg",
      "emoji": "🧺",
      "bilgi": "Örülerek yapılan, içine yiyecek konan kulplu kap."
    },
    {
      "id": "su",
      "ad": "Su",
      "gorsel": "su.jpg",
      "emoji": "💧",
      "bilgi": "Cenâb-ı Allah'ın her canlıyı kendisinden yarattığı berrak nimet."
    },
    {
      "id": "sayi-12",
      "ad": "On iki",
      "gorsel": "sayi-12.jpg",
      "emoji": "12",
      "bilgi": "Hazreti Yâkub (aleyhisselam)'ın oğullarının ve yılın aylarının sayısı."
    },
    {
      "id": "tohum",
      "ad": "Tohum",
      "gorsel": "tohum.jpg",
      "emoji": "🌱",
      "bilgi": "Cenâb-ı Allah'ın çatlatıp içinden filiz çıkardığı küçük dâne."
    },
    {
      "id": "fil",
      "ad": "Fil",
      "gorsel": "fil.jpg",
      "emoji": "🐘",
      "bilgi": "Ebrehe'nin ordusuyla gelen, bir sûreye adını veren iri hayvan."
    },
    {
      "id": "agac",
      "ad": "Ağaç",
      "gorsel": "agac.jpg",
      "emoji": "🌳",
      "bilgi": "Kökü toprakta, dalları göğe uzanan; güzel söze benzetilen bitki."
    },
    {
      "id": "kelebek",
      "ad": "Kelebek",
      "gorsel": "kelebek.jpg",
      "emoji": "🦋",
      "bilgi": "Renkli kanatlarıyla çiçekten çiçeğe uçan böcek."
    },
    {
      "id": "ruzgar",
      "ad": "Rüzgâr",
      "gorsel": "ruzgar.jpg",
      "emoji": "🌬️",
      "bilgi": "Hazreti Süleyman (aleyhisselam)'a boyun eğdirilen, bulutları süren görünmez kuvvet."
    },
    {
      "id": "sayi-500",
      "ad": "Beş yüz",
      "gorsel": "sayi-500.jpg",
      "emoji": "500",
      "bilgi": "Yüzün beş katı eden büyük sayı."
    },
    {
      "id": "hazine",
      "ad": "Hazine sandığı",
      "gorsel": "hazine.jpg",
      "emoji": "💰",
      "bilgi": "Karun'un şımardığı, anahtarları bile ağır gelen mal yığını."
    },
    {
      "id": "kalem",
      "ad": "Kalem",
      "gorsel": "kalem.jpg",
      "emoji": "🖋️",
      "bilgi": "İlk inen âyetlerde Cenâb-ı Allah'ın yazmayı öğrettiği; üzerine yemin edilen alet."
    },
    {
      "id": "karga",
      "ad": "Karga",
      "gorsel": "karga.jpg",
      "emoji": "🐦‍⬛",
      "bilgi": "Hazreti Âdem'in oğluna kardeşini gömmeyi öğreten kara kuş."
    },
    {
      "id": "sivrisinek",
      "ad": "Sivrisinek",
      "gorsel": "sivrisinek.jpg",
      "emoji": "🦟",
      "bilgi": "Cenâb-ı Allah'ın küçüklüğüne rağmen örnek verdiği, vızıldayan minik canlı."
    },
    {
      "id": "magara",
      "ad": "Mağara",
      "gorsel": "magara.jpg",
      "emoji": "🕳️",
      "bilgi": "Ashâb-ı Kehf gençlerinin yıllarca uyuduğu kaya boşluğu."
    },
    {
      "id": "halat",
      "ad": "Halat",
      "gorsel": "halat.jpg",
      "emoji": "🪢",
      "bilgi": "'Hepiniz Allah'ın ipine sarılın' buyruğunu hatırlatan kalın urgan."
    },
    {
      "id": "kandil",
      "ad": "Kandil",
      "gorsel": "kandil.jpg",
      "emoji": "🪔",
      "bilgi": "Nûr sûresinde ışığı örnek verilen, içinde fitil yanan lamba."
    },
    {
      "id": "sayi-1000",
      "ad": "Bin",
      "gorsel": "sayi-1000.jpg",
      "emoji": "1000",
      "bilgi": "On kere yüz eden büyük sayı."
    },
    {
      "id": "esek",
      "ad": "Eşek",
      "gorsel": "esek.jpg",
      "emoji": "🫏",
      "bilgi": "Hazreti Lokman'ın öğüdünde sesi en çirkin ses diye anılan yük hayvanı."
    },
    {
      "id": "salatalik",
      "ad": "Salatalık",
      "gorsel": "salatalik.jpg",
      "emoji": "🥒",
      "bilgi": "Bakara'da özlenen sebzelerden; yeşil, uzun ve sulu."
    },
    {
      "id": "balik",
      "ad": "Balık",
      "gorsel": "balik.jpg",
      "emoji": "🐟",
      "bilgi": "Hazreti Yûnus (aleyhisselam)'ı bir süre karnında taşıyan büyük deniz canlısı."
    },
    {
      "id": "cekirge",
      "ad": "Çekirge",
      "gorsel": "cekirge.jpg",
      "emoji": "🦗",
      "bilgi": "Hazreti Mûsâ (aleyhisselam) döneminde bela olarak sürüyle gelen sıçrayan böcek."
    },
    {
      "id": "sayi-309",
      "ad": "Üç yüz dokuz",
      "gorsel": "sayi-309.jpg",
      "emoji": "309",
      "bilgi": "Ashâb-ı Kehf'in mağarada kaldığı yıl sayısı."
    },
    {
      "id": "selale",
      "ad": "Şelale",
      "gorsel": "selale.jpg",
      "emoji": "🌊",
      "bilgi": "Kayadan köpürerek aşağı dökülen su."
    },
    {
      "id": "gunes",
      "ad": "Güneş",
      "gorsel": "gunes.jpg",
      "emoji": "☀️",
      "bilgi": "Belirli bir ölçüyle hareket eden, gündüzü aydınlatıp ısıtan gök cismi."
    },
    {
      "id": "kapi",
      "ad": "Kapı",
      "gorsel": "kapi.jpg",
      "emoji": "🚪",
      "bilgi": "Hazreti Yûsuf (aleyhisselam) kıssasında ayrı kapılardan girmeleri öğütlenen geçit."
    },
    {
      "id": "pusula",
      "ad": "Pusula",
      "gorsel": "pusula.jpg",
      "emoji": "🧭",
      "bilgi": "İğnesi hep bir yönü gösteren, yol buldururan alet."
    },
    {
      "id": "koyun",
      "ad": "Koyun",
      "gorsel": "koyun.jpg",
      "emoji": "🐑",
      "bilgi": "Yününden ve sütünden yararlanılan, kurban edilen küçükbaş."
    },
    {
      "id": "zeytin",
      "ad": "Zeytin",
      "gorsel": "zeytin.jpg",
      "emoji": "🫒",
      "bilgi": "Nûr sûresinde yağı ışıkla anılan, bereketli ağacın yeşil meyvesi."
    },
    {
      "id": "nar",
      "ad": "Nar",
      "gorsel": "nar.jpg",
      "emoji": "🔴",
      "bilgi": "Rahmân sûresinde geçen, içi kırmızı taneli meyve."
    },
    {
      "id": "salyangoz",
      "ad": "Salyangoz",
      "gorsel": "salyangoz.jpg",
      "emoji": "🐌",
      "bilgi": "Evini sırtında taşıyan, ağır ağır yürüyen canlı."
    },
    {
      "id": "ay",
      "ad": "Ay",
      "gorsel": "ay.jpg",
      "emoji": "🌙",
      "bilgi": "Geceyi aydınlatan, incelip hilâl olan; vakitleri belirten gök cismi."
    },
    {
      "id": "bulut",
      "ad": "Bulut",
      "gorsel": "bulut.jpg",
      "emoji": "☁️",
      "bilgi": "Gölge yapıp yağmuru taşıyan, gökte süzülen kütle."
    },
    {
      "id": "tas",
      "ad": "Taş",
      "gorsel": "tas.jpg",
      "emoji": "🪨",
      "bilgi": "Hazreti Mûsâ (aleyhisselam) asâsıyla vurunca pınar fışkıran sert cisim."
    },
    {
      "id": "gemi",
      "ad": "Gemi",
      "gorsel": "gemi.jpg",
      "emoji": "⛵",
      "bilgi": "Hazreti Nûh (aleyhisselam)'ın tufanda inananları taşıyan büyük deniz taşıtı."
    },
    {
      "id": "cicek",
      "ad": "Çiçek",
      "gorsel": "cicek.jpg",
      "emoji": "🌸",
      "bilgi": "Güzel kokan, renkli taç yapraklı bitki."
    },
    {
      "id": "sayi-40",
      "ad": "Kırk",
      "gorsel": "sayi-40.jpg",
      "emoji": "40",
      "bilgi": "Hazreti Mûsâ (aleyhisselam)'ın Rabbiyle buluşmak için beklediği gece sayısı."
    },
    {
      "id": "keci",
      "ad": "Keçi",
      "gorsel": "keci.jpg",
      "emoji": "🐐",
      "bilgi": "Dağlara tırmanan, sütü ve kılı olan çevik küçükbaş."
    },
    {
      "id": "sogan",
      "ad": "Soğan",
      "gorsel": "sogan.jpg",
      "emoji": "🧅",
      "bilgi": "Bakara'da özlenen, kat kat kabuklu keskin kokulu sebze."
    },
    {
      "id": "ugur-bocegi",
      "ad": "Uğur böceği",
      "gorsel": "ugur-bocegi.jpg",
      "emoji": "🐞",
      "bilgi": "Kırmızı-siyah benekli, yaprakta gezen küçük böcek."
    },
    {
      "id": "sayi-950",
      "ad": "Dokuz yüz elli",
      "gorsel": "sayi-950.jpg",
      "emoji": "950",
      "bilgi": "Hazreti Nûh (aleyhisselam)'ın halkını hakka çağırdığı uzun yıllar."
    },
    {
      "id": "nehir",
      "ad": "Nehir",
      "gorsel": "nehir.jpg",
      "emoji": "🏞️",
      "bilgi": "Cennet anlatımında altından akan; ovaya can veren tatlı su yolu."
    },
    {
      "id": "kova",
      "ad": "Kova",
      "gorsel": "kova.jpg",
      "emoji": "🪣",
      "bilgi": "Hazreti Yûsuf (aleyhisselam) kıssasında kuyuya sarkıtılan, su çeken kulplu kap."
    },
    {
      "id": "sikke",
      "ad": "Sikke",
      "gorsel": "sikke.jpg",
      "emoji": "🪙",
      "bilgi": "Hazreti Yûsuf (aleyhisselam)'ın birkaç tanesine satıldığı parlak para."
    },
    {
      "id": "gomlek",
      "ad": "Gömlek",
      "gorsel": "gomlek.jpg",
      "emoji": "👕",
      "bilgi": "Hazreti Yûsuf (aleyhisselam)'ın kokusu babasının gözünü açan giysi."
    },
    {
      "id": "yildiz",
      "ad": "Yıldız",
      "gorsel": "yildiz.jpg",
      "emoji": "⭐",
      "bilgi": "Hazreti Yûsuf (aleyhisselam)'ın rüyasında secde eden; geceleri yol gösteren ışık."
    },
    {
      "id": "at",
      "ad": "At",
      "gorsel": "at.jpg",
      "emoji": "🐎",
      "bilgi": "Âdiyât sûresinde soluk soluğa koşan, süs ve binek olan asil hayvan."
    },
    {
      "id": "kabak",
      "ad": "Kabak",
      "gorsel": "kabak.jpg",
      "emoji": "🎃",
      "bilgi": "Hazreti Yûnus (aleyhisselam) iyileşsin diye üzerine bitirilen geniş yapraklı bitki."
    },
    {
      "id": "kus",
      "ad": "Kuş",
      "gorsel": "kus.jpg",
      "emoji": "🐦",
      "bilgi": "Gökte kanat çırparak Cenâb-ı Allah'ın tuttuğu tüylü canlı."
    },
    {
      "id": "orumcek",
      "ad": "Örümcek",
      "gorsel": "orumcek.jpg",
      "emoji": "🕷️",
      "bilgi": "Ankebût sûresinde en çürük evi ören böcek."
    },
    {
      "id": "simsek",
      "ad": "Şimşek",
      "gorsel": "simsek.jpg",
      "emoji": "⚡",
      "bilgi": "Bulutlar arasında çakıp göz kamaştıran, korku ve umut veren ışık."
    },
    {
      "id": "basak",
      "ad": "Başak",
      "gorsel": "basak.jpg",
      "emoji": "🌾",
      "bilgi": "Hazreti Yûsuf (aleyhisselam) kıssasında bir taneden yedi tane veren bereketli ekin."
    },
    {
      "id": "kase",
      "ad": "Kâse",
      "gorsel": "kase.jpg",
      "emoji": "🥣",
      "bilgi": "İçine yemek ve su konan süslü kap."
    },
    {
      "id": "sayi-99",
      "ad": "Doksan dokuz",
      "gorsel": "sayi-99.jpg",
      "emoji": "99",
      "bilgi": "Cenâb-ı Allah'ın en güzel isimlerinin (Esmâ-i Hüsnâ) sayısı."
    },
    {
      "id": "yaprak",
      "ad": "Yaprak",
      "gorsel": "yaprak.jpg",
      "emoji": "🍃",
      "bilgi": "Hazreti Âdem ile Havvâ'nın örtündüğü, daldan düşen yeşil örtü."
    }
  ]
};
