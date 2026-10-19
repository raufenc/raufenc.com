/* Edeb Sözleri — slaytlar ice-aktar.py ile, oyunlar adab-oyunlar.py ile eklendi. */
DO.dersKaydet(
{
 "id": "adab-02",
 "ad": "Edeb Sözleri",
 "kisaAd": "Âdâb",
 "seri": "Âdâb-ı Muâşeret",
 "yas": "10-15 yaş",
 "ozet": "Büyüklerimizin edeb sözleri ve davranışın dili. 5 slayt, yerleştirme, hafıza ve kendini kontrol kartı.",
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
     "baslik": "Edeb Sözleri",
     "alt": "",
     "ikon": "kitap",
     "renk": "#6b8e4e"
    },
    {
     "id": "s01",
     "tur": "slayt",
     "gorsel": "slayt/01.webp",
     "ses": "ses/s01.mp3",
     "metin": "Büyüklerimiz: Edep, bilgiden önce gelir."
    },
    {
     "id": "s02",
     "tur": "slayt",
     "gorsel": "slayt/02.webp",
     "ses": "ses/s02.mp3",
     "metin": "Çirkin gördüğümüz davranışı kendimiz yapmayız."
    },
    {
     "id": "iki-kutu",
     "tur": "siniflandir",
     "baslik": "Edebli mi, değil mi?",
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
       "id": "yardim",
       "metin": "Arkadaşına yardım etmek",
       "alan": "guzel"
      },
      {
       "id": "azar",
       "metin": "Arkadaşını parmakla azarlamak",
       "alan": "kacin",
       "ipucu": "Çirkin gördüğümüz davranışı kendimiz yapmayız."
      },
      {
       "id": "bakis",
       "metin": "Yumuşak bakmak",
       "alan": "guzel"
      },
      {
       "id": "yayil",
       "metin": "Yayılarak oturmak",
       "alan": "kacin",
       "ipucu": "Oturuş da edebin dilidir."
      },
      {
       "id": "tesekkur",
       "metin": "Teşekkür etmek",
       "alan": "guzel"
      },
      {
       "id": "bagir",
       "metin": "Bağırarak konuşmak",
       "alan": "kacin",
       "ipucu": "Sesimizi kontrol ederiz."
      },
      {
       "id": "izin",
       "metin": "İzin istemek",
       "alan": "guzel"
      },
      {
       "id": "kirlet",
       "metin": "Etrafı kirletmek",
       "alan": "kacin",
       "ipucu": "Temizlik de edebdendir."
      }
     ],
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "s03",
     "tur": "slayt",
     "gorsel": "slayt/03.webp",
     "ses": "ses/s03.mp3",
     "metin": "Yanlış örnek de bize ders olabilir."
    },
    {
     "id": "s04",
     "tur": "slayt",
     "gorsel": "slayt/04.webp",
     "ses": "ses/s04.mp3",
     "metin": "Edep, insanı güzelleştiren davranış dilidir: söz, bakış, oturuş, yardım ve teşekkür."
    },
    {
     "id": "s05",
     "tur": "slayt",
     "gorsel": "slayt/05.webp",
     "ses": "ses/s05.mp3",
     "metin": "Bugün kendi davranışımızı kontrol edeceğiz: saygı, söz, ses, izin ve temizlik."
    },
    {
     "id": "hafiza",
     "tur": "hafiza",
     "baslik": "Edebin dili",
     "yonerge": "Kartları çevir; edebin dilini anlamıyla eşleştir.",
     "ciftler": [
      {
       "id": "soz",
       "a": "Söz",
       "b": "Güzel ve kırmadan konuşmak",
       "renk": "#e8962e"
      },
      {
       "id": "bakis",
       "a": "Bakış",
       "b": "Yumuşak ve saygılı bakmak",
       "renk": "#2f4a6b"
      },
      {
       "id": "oturus",
       "a": "Oturuş",
       "b": "Toplu ve edebli oturmak",
       "renk": "#4f7a3a"
      },
      {
       "id": "yardim",
       "a": "Yardım",
       "b": "İhtiyacı olana el uzatmak",
       "renk": "#2a9d8f"
      },
      {
       "id": "tesekkur",
       "a": "Teşekkür",
       "b": "İyiliği güzel karşılamak",
       "renk": "#c0392b"
      }
     ],
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "kontrol",
     "tur": "dusun",
     "baslik": "Kendi davranışımı kontrol ediyorum",
     "sorular": [
      {
       "soru": "Bu hafta hangisine daha çok dikkat edeceğim?",
       "secenekler": [
        "Saygı",
        "Söz",
        "Ses",
        "İzin",
        "Temizlik"
       ]
      }
     ],
     "ipucu": "İstersen kendi cümleni yaz: “Ben bu hafta…”",
     "tesekkur": "Niyetin kaydedildi. Allahü teâlâ kolaylık versin.",
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "son",
     "tur": "kapanis",
     "baslik": "Ders tamamlandı",
     "maddeler": [
      {
       "baslik": "Edeb",
       "metin": "bilgiden önce",
       "ikon": "kitap",
       "renk": "#2f4a6b"
      },
      {
       "baslik": "Ders al",
       "metin": "yanlış örnekten",
       "ikon": "buyutec",
       "renk": "#e8962e"
      },
      {
       "baslik": "Kontrol et",
       "metin": "kendini",
       "ikon": "yildiz",
       "renk": "#4f7a3a"
      }
     ],
     "dua": "Elhamdülillah. Öğrendiklerimizle amel etmeyi Allahü teâlâ nasip etsin."
    }
   ]
  }
 ]
}
);
