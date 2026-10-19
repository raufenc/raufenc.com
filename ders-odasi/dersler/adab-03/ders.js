/* Günlük Edebler — slaytlar ice-aktar.py ile, oyunlar adab-oyunlar.py ile eklendi. */
DO.dersKaydet(
{
 "id": "adab-03",
 "ad": "Günlük Edebler",
 "kisaAd": "Âdâb",
 "seri": "Âdâb-ı Muâşeret",
 "yas": "10-15 yaş",
 "ozet": "Evde, okulda, yolda, camide ve ekran başında aynı saygı dili. 5 slayt, soru çarkı ve doğru-yanlış.",
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
     "baslik": "Günlük Edebler",
     "alt": "",
     "ikon": "kitap",
     "renk": "#6b8e4e"
    },
    {
     "id": "s01",
     "tur": "slayt",
     "gorsel": "slayt/01.webp",
     "ses": "ses/s01.mp3",
     "metin": "Edep, günlük hayatın her yerindedir."
    },
    {
     "id": "s02",
     "tur": "slayt",
     "gorsel": "slayt/02.webp",
     "ses": "ses/s02.mp3",
     "metin": "Aynı saygı dili her ortamda gerekir."
    },
    {
     "id": "gunluk-cark",
     "tur": "cark",
     "baslik": "Günlük edeb çarkı",
     "dilimler": [
      {
       "id": "ev",
       "etiket": "Evde",
       "emoji": "🏠",
       "soru": "Annen yorgun geldi. Ne yaparsın?",
       "secenekler": [
        "Bir bardak su getirir, yardım ederim",
        "Odama geçip ses yapmam yeter",
        "Hemen isteklerimi sıralarım"
       ],
       "dogru": 0,
       "aciklama": "Küçük bir yardım büyük saygı gösterir."
      },
      {
       "id": "okul",
       "etiket": "Okulda",
       "emoji": "🏫",
       "soru": "Derste bir şey sormak istiyorsun. Ne yaparsın?",
       "secenekler": [
        "Parmak kaldırıp sıramı beklerim",
        "Hemen yüksek sesle sorarım",
        "Arkadaşıma fısıldarım"
       ],
       "dogru": 0,
       "aciklama": "Aynı saygı dili her ortamda gerekir."
      },
      {
       "id": "yol",
       "etiket": "Yolda",
       "emoji": "🚶",
       "soru": "Yaşlı bir amca ağır poşet taşıyor.",
       "secenekler": [
        "Yardım teklif ederim",
        "Görmezden gelirim",
        "Arkadaşlarıma gösterip gülerim"
       ],
       "dogru": 0,
       "aciklama": "Yaşlılara yardım etmek güzel bir edebdir."
      },
      {
       "id": "cami",
       "etiket": "Camide",
       "emoji": "🕌",
       "soru": "Camide nasıl otururuz?",
       "secenekler": [
        "Sakin ve edebli",
        "Koşup oynayarak",
        "Ayaklarımı uzatarak"
       ],
       "dogru": 0,
       "aciklama": "Cami huzur mekânıdır."
      },
      {
       "id": "telefon",
       "etiket": "Telefon",
       "emoji": "📱",
       "soru": "Kalabalık bir yerde telefonun çalabilir.",
       "secenekler": [
        "Önceden sessize alırım",
        "Sesini sonuna kadar açarım",
        "Hoparlörden konuşurum"
       ],
       "dogru": 0,
       "aciklama": "Sesimizi ve çevremizi kontrol ederiz."
      },
      {
       "id": "sira",
       "etiket": "Sırada",
       "emoji": "⏳",
       "soru": "Fırında uzun bir sıra var.",
       "secenekler": [
        "Sıramı sabırla beklerim",
        "Öne geçerim",
        "Söylenip dururum"
       ],
       "dogru": 0,
       "aciklama": "Sırada beklemek de edebdir."
      }
     ],
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "s03",
     "tur": "slayt",
     "gorsel": "slayt/03.webp",
     "ses": "ses/s03.mp3",
     "metin": "Kuralı bilmek yetmez; davranışa dönüştürmek gerekir."
    },
    {
     "id": "s04",
     "tur": "slayt",
     "gorsel": "slayt/04.webp",
     "ses": "ses/s04.mp3",
     "metin": "Sözümüzü, sesimizi ve çevremizi kontrol ederiz."
    },
    {
     "id": "s05",
     "tur": "slayt",
     "gorsel": "slayt/05.webp",
     "ses": "ses/s05.mp3",
     "metin": "Küçük davranışlar, büyük saygı gösterir."
    },
    {
     "id": "gunluk-dy",
     "tur": "dogruYanlis",
     "baslik": "Doğru mu, yanlış mı?",
     "ifadeler": [
      {
       "id": "her-yer",
       "metin": "Edeb sadece camide gerekir.",
       "dogru": false,
       "aciklama": "Edep, günlük hayatın her yerindedir.",
       "gorsel": "slayt/01.webp"
      },
      {
       "id": "ayni",
       "metin": "Aynı saygı dili her ortamda gerekir.",
       "dogru": true,
       "aciklama": "Evde, okulda, yolda, camide…",
       "gorsel": "slayt/02.webp"
      },
      {
       "id": "bilmek",
       "metin": "Kuralı bilmek yeter; uygulamaya gerek yoktur.",
       "dogru": false,
       "aciklama": "Kuralı davranışa dönüştürmek gerekir.",
       "gorsel": "slayt/03.webp"
      },
      {
       "id": "ses",
       "metin": "Sözümüzü, sesimizi ve çevremizi kontrol ederiz.",
       "dogru": true,
       "aciklama": "Üçü de edebin parçasıdır.",
       "gorsel": "slayt/04.webp"
      },
      {
       "id": "kucuk",
       "metin": "Küçük davranışlar önemsizdir.",
       "dogru": false,
       "aciklama": "Küçük davranışlar büyük saygı gösterir.",
       "gorsel": "slayt/05.webp"
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
       "baslik": "Her yerde",
       "metin": "aynı saygı",
       "ikon": "yol",
       "renk": "#2f4a6b"
      },
      {
       "baslik": "Bilgi",
       "metin": "davranışa dönüşsün",
       "ikon": "el",
       "renk": "#4f7a3a"
      },
      {
       "baslik": "Küçük",
       "metin": "ama büyük",
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
