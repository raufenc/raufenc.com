/* Edeb Nedir? — slaytlar ice-aktar.py ile, oyunlar adab-oyunlar.py ile eklendi. */
DO.dersKaydet(
{
 "id": "adab-01",
 "ad": "Edeb Nedir?",
 "kisaAd": "Âdâb",
 "seri": "Âdâb-ı Muâşeret",
 "yas": "10-15 yaş",
 "ozet": "Edeb nedir, nasıl dinlenir, nasıl sorulur? 6 slayt, doğru-yanlış ve sıralama oyunu.",
 "kapakGorseli": "slayt/01.webp",
 "basariEsigi": 0.6,
 "bolumler": [
  {
   "id": "ders",
   "ad": "Âdâb",
   "renk": "#6b8e4e",
   "bloklar": [
    {
     "id": "giris",
     "tur": "bolum",
     "numara": "Âdâb-ı Muâşeret",
     "baslik": "Edeb Nedir?",
     "alt": "",
     "ikon": "kitap",
     "renk": "#6b8e4e"
    },
    {
     "id": "s01",
     "tur": "slayt",
     "gorsel": "slayt/01.webp",
     "metin": "Edeb, güzel huy ve saygılı davranıştır.",
     "not": "Öğrenciye sorun: “Sence edebli bir insan nasıl konuşur, nasıl dinler?”"
    },
    {
     "id": "s02",
     "tur": "slayt",
     "gorsel": "slayt/02.webp",
     "metin": "Edeb; söz dinlemek, haddini bilmek ve kırmadan davranmaktır."
    },
    {
     "id": "s03",
     "tur": "slayt",
     "gorsel": "slayt/03.webp",
     "metin": "Bilgi, edep ile değer kazanır."
    },
    {
     "id": "edeb-dy",
     "tur": "dogruYanlis",
     "baslik": "Doğru mu, yanlış mı?",
     "ifadeler": [
      {
       "id": "tanim",
       "metin": "Edeb, güzel huy ve saygılı davranıştır.",
       "dogru": true,
       "aciklama": "Slaytta da böyle tarif edildi.",
       "gorsel": "slayt/01.webp"
      },
      {
       "id": "bilgi",
       "metin": "Bilgi tek başına yeter; edebe gerek yoktur.",
       "dogru": false,
       "aciklama": "Bilgi, edep ile değer kazanır.",
       "gorsel": "slayt/03.webp"
      },
      {
       "id": "miras",
       "metin": "Büyüklerimizin bize bıraktığı en güzel miras edebdir.",
       "dogru": true,
       "aciklama": "En güzel miras: edep.",
       "gorsel": "slayt/04.webp"
      },
      {
       "id": "peki",
       "metin": "“Peki efendim” demek, önce saygıyla dinlemektir.",
       "dogru": true,
       "aciklama": "Önce dinleriz, sonra uygun dille sorarız.",
       "gorsel": "slayt/05.webp"
      },
      {
       "id": "kes",
       "metin": "Büyüğümüz konuşurken sözünü kesip hemen itiraz ederiz.",
       "dogru": false,
       "aciklama": "Önce saygıyla dinler, düşüncemizi sonra uygun bir dille söyleriz.",
       "gorsel": "slayt/06.webp"
      },
      {
       "id": "kirma",
       "metin": "Edeb; söz dinlemek, haddini bilmek ve kırmadan davranmaktır.",
       "dogru": true,
       "aciklama": "Üç güzel davranış: dinlemek, haddini bilmek, kırmamak.",
       "gorsel": "slayt/02.webp"
      }
     ],
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "s04",
     "tur": "slayt",
     "gorsel": "slayt/04.webp",
     "metin": "En güzel miras: edep."
    },
    {
     "id": "s05",
     "tur": "slayt",
     "gorsel": "slayt/05.webp",
     "metin": "“Peki efendim” demek, önce saygıyla dinlemektir."
    },
    {
     "id": "s06",
     "tur": "slayt",
     "gorsel": "slayt/06.webp",
     "metin": "Düşüncemizi sonra, uygun bir dille sorabiliriz."
    },
    {
     "id": "dinle-sor",
     "tur": "sirala",
     "baslik": "Önce dinle, sonra sor",
     "rozet": "🧭 Sırala",
     "yonerge": "Büyüğümüz bir şey anlatıyor. Edebli bir sohbetin adımlarını sırayla seç.",
     "adimlar": [
      {
       "id": "dinle",
       "metin": "Saygıyla dinlerim",
       "gorsel": "slayt/05.webp"
      },
      {
       "id": "bekle",
       "metin": "Sözünü bitirmesini beklerim",
       "ipucu": "Dinledik. Sonra ne yaparız?"
      },
      {
       "id": "peki",
       "metin": "“Peki efendim” derim",
       "gorsel": "slayt/02.webp",
       "ipucu": "Söz bitti; önce kabulle karşılarız."
      },
      {
       "id": "sor",
       "metin": "Sorumu uygun bir dille sorarım",
       "gorsel": "slayt/06.webp",
       "ipucu": "Soru en sona kalır."
      }
     ],
     "sonMetin": "Önce dinlemek, sonra güzel bir dille sormak edebdir.",
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "son",
     "tur": "kapanis",
     "baslik": "Ders tamamlandı",
     "maddeler": [
      {
       "baslik": "Dinle",
       "metin": "saygıyla",
       "ikon": "goz",
       "renk": "#2f4a6b"
      },
      {
       "baslik": "Bekle",
       "metin": "sözü bitsin",
       "ikon": "el",
       "renk": "#4f7a3a"
      },
      {
       "baslik": "Sor",
       "metin": "güzel dille",
       "ikon": "kalp",
       "renk": "#c0392b"
      }
     ],
     "dua": "Elhamdülillah. Öğrendiklerimizle amel etmeyi Allahü teâlâ nasip etsin."
    }
   ]
  }
 ]
}
);
