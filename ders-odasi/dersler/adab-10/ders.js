/* Yolda, Evde ve İşte Edeb — slaytlar ice-aktar.py ile, oyunlar adab-oyunlar.py ile eklendi. */
DO.dersKaydet(
{
 "id": "adab-10",
 "ad": "Yolda, Evde ve İşte Edeb",
 "kisaAd": "Âdâb",
 "seri": "Âdâb-ı Muâşeret",
 "yas": "10-15 yaş",
 "ozet": "Sokakta, alışverişte ve arkadaşla edeb. 7 slayt, yerleştirme ve doğru-yanlış.",
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
     "baslik": "Yolda, Evde ve İşte Edeb",
     "alt": "",
     "ikon": "kitap",
     "renk": "#6b8e4e"
    },
    {
     "id": "s01",
     "tur": "slayt",
     "gorsel": "slayt/01.webp",
     "ses": "ses/s01.mp3",
     "metin": "Sokakta kimseyi rahatsız etmemek esastır."
    },
    {
     "id": "s02",
     "tur": "slayt",
     "gorsel": "slayt/02.webp",
     "ses": "ses/s02.mp3",
     "metin": "Alay, kavga, yalan ve aldatma edebe uymaz."
    },
    {
     "id": "s03",
     "tur": "slayt",
     "gorsel": "slayt/03.webp",
     "ses": "ses/s03.mp3",
     "metin": "Alışverişte dürüstlük ve helal kazanç önemlidir."
    },
    {
     "id": "yol-kutu",
     "tur": "siniflandir",
     "baslik": "Yolda, evde, işte",
     "alanlar": [
      {
       "id": "guzel",
       "ad": "Edebli davranış",
       "aciklama": "Böyle yaparız",
       "ikon": "yildiz",
       "renk": "#4f7a3a"
      },
      {
       "id": "kacin",
       "ad": "Yapmayalım",
       "aciklama": "Bundan kaçınırız",
       "ikon": "uyari",
       "renk": "#c0392b"
      }
     ],
     "kartlar": [
      {
       "id": "durust",
       "metin": "Alışverişte dürüst olmak",
       "alan": "guzel"
      },
      {
       "id": "alay",
       "metin": "Birini parmakla gösterip alay etmek",
       "alan": "kacin",
       "ipucu": "Alay edebe uymaz."
      },
      {
       "id": "ortulu",
       "metin": "Ekmeği örtülü taşımak",
       "alan": "guzel"
      },
      {
       "id": "kavga",
       "metin": "Kavga etmek",
       "alan": "kacin",
       "ipucu": "Kavga edebe uymaz."
      },
      {
       "id": "helal",
       "metin": "Ayrılırken helalleşmek",
       "alan": "guzel"
      },
      {
       "id": "aldat",
       "metin": "Para üstünde aldatmak",
       "alan": "kacin",
       "ipucu": "Helal kazanç önemlidir."
      },
      {
       "id": "bekle",
       "metin": "Arkadaşını bekletmemek",
       "alan": "guzel"
      },
      {
       "id": "yalan",
       "metin": "Yalan söylemek",
       "alan": "kacin",
       "ipucu": "Yalan edebe uymaz."
      }
     ],
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "s04",
     "tur": "slayt",
     "gorsel": "slayt/04.webp",
     "ses": "ses/s04.mp3",
     "metin": "Yiyeceği temiz ve örtülü taşırız."
    },
    {
     "id": "s05",
     "tur": "slayt",
     "gorsel": "slayt/05.webp",
     "ses": "ses/s05.mp3",
     "metin": "Arkadaşla yürürken onu bekletmeyiz."
    },
    {
     "id": "s06",
     "tur": "slayt",
     "gorsel": "slayt/06.webp",
     "ses": "ses/s06.mp3",
     "metin": "Ayrılırken helalleşmek güzel bir edeptir."
    },
    {
     "id": "s07",
     "tur": "slayt",
     "gorsel": "slayt/07.webp",
     "ses": "ses/s07.mp3",
     "metin": "Mahremiyetimizi korumak da edebin parçasıdır."
    },
    {
     "id": "yol-dy",
     "tur": "dogruYanlis",
     "baslik": "Doğru mu, yanlış mı?",
     "ifadeler": [
      {
       "id": "rahatsiz",
       "metin": "Sokakta kimseyi rahatsız etmemek esastır.",
       "dogru": true,
       "aciklama": "Mesafe, sessizlik ve temizlik.",
       "gorsel": "slayt/01.webp"
      },
      {
       "id": "ortu",
       "metin": "Yiyeceği açıkta, elde sallayarak taşırız.",
       "dogru": false,
       "aciklama": "Yiyeceği temiz ve örtülü taşırız.",
       "gorsel": "slayt/04.webp"
      },
      {
       "id": "helal",
       "metin": "Ayrılırken helalleşmek güzel bir edeptir.",
       "dogru": true,
       "aciklama": "Gönüller hoş olur.",
       "gorsel": "slayt/06.webp"
      },
      {
       "id": "mahrem",
       "metin": "Mahremiyetimizi korumak da edebin parçasıdır.",
       "dogru": true,
       "aciklama": "Kendimizin ve başkalarının mahremiyetine saygı.",
       "gorsel": "slayt/07.webp"
      }
     ],
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "son",
     "tur": "kapanis",
     "baslik": "Ders tamamlandı",
     "maddeler": [
      {
       "baslik": "Rahatsız etme",
       "metin": "sokakta",
       "ikon": "yol",
       "renk": "#2f4a6b"
      },
      {
       "baslik": "Dürüst ol",
       "metin": "alışverişte",
       "ikon": "muhur",
       "renk": "#4f7a3a"
      },
      {
       "baslik": "Helalleş",
       "metin": "ayrılırken",
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
