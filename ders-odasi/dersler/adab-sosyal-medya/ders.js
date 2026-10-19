/* Sosyal Medya Âdâbı — slaytlar ice-aktar.py ile, oyunlar adab-oyunlar.py ile eklendi. */
DO.dersKaydet(
{
 "id": "adab-sosyal-medya",
 "ad": "Sosyal Medya Âdâbı",
 "kisaAd": "Âdâb",
 "seri": "Âdâb-ı Muâşeret",
 "yas": "10-15 yaş",
 "ozet": "Ekrandaki davranışın da karakteri vardır. 24 slayt, gönder kilidi, yerleştirme, doğru-yanlış ve hız turu.",
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
     "baslik": "Sosyal Medya Âdâbı",
     "alt": "",
     "ikon": "kitap",
     "renk": "#6b8e4e"
    },
    {
     "id": "s01",
     "tur": "slayt",
     "gorsel": "slayt/01.webp",
     "ses": "ses/s01.mp3",
     "metin": "Sosyal medya âdâbı: Ekrandaki davranışın da bir karakteri vardır."
    },
    {
     "id": "s02",
     "tur": "slayt",
     "gorsel": "slayt/02.webp",
     "ses": "ses/s02.mp3",
     "metin": "Ekran küçük, etkisi büyük: Bir mesaj, bir yorum, bir paylaşım gerçek bir insanın kalbine dokunur."
    },
    {
     "id": "s03",
     "tur": "slayt",
     "gorsel": "slayt/03.webp",
     "ses": "ses/s03.mp3",
     "metin": "Herkes aynı ekranı kullanır; kimi fayda üretir, kimi tartışma çıkarır, kimi saatlerini kaybeder. Direksiyon sende."
    },
    {
     "id": "s04",
     "tur": "slayt",
     "gorsel": "slayt/04.webp",
     "ses": "ses/s04.mp3",
     "metin": "Gönder tuşundan önce dur: Yazdıklarımız, beğendiklerimiz ve paylaştıklarımız sorumluluk taşır."
    },
    {
     "id": "s05",
     "tur": "slayt",
     "gorsel": "slayt/05.webp",
     "ses": "ses/s05.mp3",
     "metin": "Dilin kalbe dokunsun: Nasıl konuştuğun da önemlidir. Güzel söz kapı açar."
    },
    {
     "id": "s06",
     "tur": "slayt",
     "gorsel": "slayt/06.webp",
     "ses": "ses/s06.mp3",
     "metin": "Yüz yüze söyleyemeyeceğini yazma. Gizli hesap kabalık için kalkan değildir."
    },
    {
     "id": "s07",
     "tur": "slayt",
     "gorsel": "slayt/07.webp",
     "ses": "ses/s07.mp3",
     "metin": "Boş gürültü değil, fayda: Paylaşımın bilgi versin, öğretsin, iyiliğe çağırsın."
    },
    {
     "id": "s08",
     "tur": "slayt",
     "gorsel": "slayt/08.webp",
     "ses": "ses/s08.mp3",
     "metin": "Özel hayat özel kalsın: Ailemizi, evimizi paylaşmadan önce “Gerçekten gerek var mı?” diye düşünürüz."
    },
    {
     "id": "s09",
     "tur": "slayt",
     "gorsel": "slayt/09.webp",
     "ses": "ses/s09.mp3",
     "metin": "Açık, akıcı, anlaşılır yaz: Sade ve mümkün olduğunca doğru yazarız."
    },
    {
     "id": "s10",
     "tur": "slayt",
     "gorsel": "slayt/10.webp",
     "ses": "ses/s10.mp3",
     "metin": "Ölçü kalite getirir: Abartı, tekrar ve gösteriş yerine ölçülü paylaşım."
    },
    {
     "id": "s11",
     "tur": "slayt",
     "gorsel": "slayt/11.webp",
     "ses": "ses/s11.mp3",
     "metin": "Yazıda ses tonu yok: Yanlış anlaşılmamak için uygun emojiyi yerinde kullanırız; her cümleye emoji yağdırmayız."
    },
    {
     "id": "s12",
     "tur": "slayt",
     "gorsel": "slayt/12.webp",
     "ses": "ses/s12.mp3",
     "metin": "Şaka incitmesin: Alay etmeyiz, küçümsemeyiz; uyaracaksak kırmadan, yapıcı bir dille konuşuruz."
    },
    {
     "id": "gonder-kilidi",
     "tur": "kilit",
     "baslik": "Gönder kilidi",
     "rozet": "3 soru",
     "yonerge": "Göndermeden önce üç soru: Doğru mu? Faydalı mı? Saygılı mı? Her mesaj için karar ver.",
     "secenekler": [
      {
       "id": "gonder",
       "ad": "Gönderirim",
       "alt": "doğru, faydalı, saygılı",
       "renk": "#4f7a3a"
      },
      {
       "id": "dur",
       "ad": "Göndermem",
       "alt": "bir şartı eksik",
       "renk": "#c0392b"
      }
     ],
     "durumlar": [
      {
       "id": "haber",
       "metin": "Kaynağı belli olmayan “şok” bir haber",
       "cevap": "dur",
       "aciklama": "Haberi doğrula; emin değilsen paylaşma.",
       "ipucu": "Doğru olduğundan emin miyiz?"
      },
      {
       "id": "tebrik",
       "metin": "Arkadaşına “Sınavın hayırlı olsun!” mesajı",
       "cevap": "gonder",
       "aciklama": "Güzel söz kapı açar."
      },
      {
       "id": "foto",
       "metin": "Arkadaşının izinsiz çektiğin komik fotoğrafı",
       "cevap": "dur",
       "aciklama": "İzin olmadan fotoğraf yok.",
       "ipucu": "İzin aldık mı?"
      },
      {
       "id": "ofke",
       "metin": "Kızgınken yazdığın sert bir cevap",
       "cevap": "dur",
       "aciklama": "Öfkeyle gönderme; önce dur, nefes al, düşün.",
       "ipucu": "Saygılı mı?"
      },
      {
       "id": "kaynak",
       "metin": "Kaynağını yazdığın faydalı bir bilgi",
       "cevap": "gonder",
       "aciklama": "Kaynağı göstermek emeğe saygıdır."
      },
      {
       "id": "ev",
       "metin": "Evinin adresini gösteren bir paylaşım",
       "cevap": "dur",
       "aciklama": "Özel hayat özel kalsın.",
       "ipucu": "Gerçekten gerek var mı?"
      }
     ],
     "sonBaslik": "Kilit açıldı!",
     "sonMetin": "Doğru mu? Faydalı mı? Saygılı mı? Üçü de “evet” ise gönder.",
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "s13",
     "tur": "slayt",
     "gorsel": "slayt/13.webp",
     "ses": "ses/s13.mp3",
     "metin": "İzin olmadan fotoğraf yok: Başkasının görüntüsü ve özel hayatı bize emanettir."
    },
    {
     "id": "s14",
     "tur": "slayt",
     "gorsel": "slayt/14.webp",
     "ses": "ses/s14.mp3",
     "metin": "Kaynağı göster: Başkasının paylaşımını sahiplenmeyiz; emeğe saygı paylaşımın adabıdır."
    },
    {
     "id": "s15",
     "tur": "slayt",
     "gorsel": "slayt/15.webp",
     "ses": "ses/s15.mp3",
     "metin": "Öfkeyle gönderme: Kızgınken yazmayız; önce durur, nefes alır, düşünür, sonra cevap veririz."
    },
    {
     "id": "s16",
     "tur": "slayt",
     "gorsel": "slayt/16.webp",
     "ses": "ses/s16.mp3",
     "metin": "Dijital iz kalır: Silinen bir paylaşım bile başka bir yerde yaşamaya devam edebilir."
    },
    {
     "id": "s17",
     "tur": "slayt",
     "gorsel": "slayt/17.webp",
     "ses": "ses/s17.mp3",
     "metin": "Tanımadığın kişilere DM yok: Özelden iletişimde acele etmeyiz; güvenliğimizi ve mahremiyetimizi koruruz."
    },
    {
     "id": "s18",
     "tur": "slayt",
     "gorsel": "slayt/18.webp",
     "ses": "ses/s18.mp3",
     "metin": "Takip ve paylaşımda seçici ol: Zarar veren hesaplara itibar etmeyiz."
    },
    {
     "id": "s19",
     "tur": "slayt",
     "gorsel": "slayt/19.webp",
     "ses": "ses/s19.mp3",
     "metin": "Paylaşımın bir amacı olsun: Gönder tuşuna basmadan önce “Bu gerçekten fayda sağlayacak mı?” diye sorarız."
    },
    {
     "id": "s20",
     "tur": "slayt",
     "gorsel": "slayt/20.webp",
     "ses": "ses/s20.mp3",
     "metin": "Haberi doğrula: Kaynağı belirsiz bilgiyi yaymayız; emin değilsek paylaşmayız."
    },
    {
     "id": "s21",
     "tur": "slayt",
     "gorsel": "slayt/21.webp",
     "ses": "ses/s21.mp3",
     "metin": "Çirkin etiket yok: Dikkat çekmek için rahatsız edici etiketler kullanmayız."
    },
    {
     "id": "s22",
     "tur": "slayt",
     "gorsel": "slayt/22.webp",
     "ses": "ses/s22.mp3",
     "metin": "Beğeni ve takipçi peşinde koşmayız; riskli takipleri ailemizden gizlemeyiz."
    },
    {
     "id": "s23",
     "tur": "slayt",
     "gorsel": "slayt/23.webp",
     "ses": "ses/s23.mp3",
     "metin": "Kendin ol, zamanını koru: Ekran süresi koyarız; hayatımızı ekrana bırakmayız."
    },
    {
     "id": "s24",
     "tur": "slayt",
     "gorsel": "slayt/24.webp",
     "ses": "ses/s24.mp3",
     "metin": "“İlim meclisine vardım kıldım taleb; ilim geride kaldı, illâ edep illâ edep.” (Yunus Emre hazretleri) Göndermeden önce üç soru: Doğru mu? Faydalı mı? Saygılı mı?"
    },
    {
     "id": "ekran-kutu",
     "tur": "siniflandir",
     "baslik": "Ekranda edeb",
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
       "id": "izin",
       "metin": "Fotoğraf için izin istemek",
       "alan": "guzel"
      },
      {
       "id": "dm",
       "metin": "Tanımadığı kişiye DM atmak",
       "alan": "kacin",
       "ipucu": "Güvenliğimizi koruruz."
      },
      {
       "id": "sure",
       "metin": "Ekran süresi koymak",
       "alan": "guzel"
      },
      {
       "id": "alay",
       "metin": "Alaycı yorum yazmak",
       "alan": "kacin",
       "ipucu": "Şaka incitmesin."
      },
      {
       "id": "sade",
       "metin": "Sade ve anlaşılır yazmak",
       "alan": "guzel"
      },
      {
       "id": "etiket",
       "metin": "Dikkat çeken çirkin etiketler",
       "alan": "kacin",
       "ipucu": "Çirkin etiket yok."
      },
      {
       "id": "aile",
       "metin": "Riskli bir takibi ailesine söylemek",
       "alan": "guzel"
      },
      {
       "id": "gizli",
       "metin": "Gizli hesapla kabalık etmek",
       "alan": "kacin",
       "ipucu": "Yüz yüze söyleyemeyeceğini yazma."
      }
     ],
     "not": "Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar."
    },
    {
     "id": "ekran-hiz",
     "tur": "hizTuru",
     "baslik": "Ekran hız turu",
     "sure": 10,
     "sorular": [
      {
       "metin": "Göndermeden önce kaç soru soruyoruz?",
       "secenekler": [
        "Üç",
        "Bir",
        "Hiç"
       ],
       "dogru": 0
      },
      {
       "metin": "Kızgınken mesaj yazmalı mıyız?",
       "secenekler": [
        "Hayır, önce dur",
        "Evet, hemen",
        "Fark etmez"
       ],
       "dogru": 0
      },
      {
       "metin": "Silinen paylaşım tamamen kaybolur mu?",
       "secenekler": [
        "Her zaman",
        "Hayır, iz kalabilir",
        "Evet, hemen"
       ],
       "dogru": 1
      },
      {
       "metin": "Başkasının fotoğrafını paylaşmak için…",
       "secenekler": [
        "İzin isteriz",
        "Beğeni bekleriz",
        "Gizli paylaşırız"
       ],
       "dogru": 0
      },
      {
       "metin": "Emin olmadığımız haber…",
       "secenekler": [
        "Paylaşılmaz",
        "Hemen yayılır",
        "Herkese gönderilir"
       ],
       "dogru": 0
      },
      {
       "metin": "“İllâ edep illâ edep” kimin sözü?",
       "secenekler": [
        "Yunus Emre hazretleri",
        "Bir reklam",
        "Bir oyun"
       ],
       "dogru": 0
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
       "baslik": "Doğru mu?",
       "metin": "doğrula",
       "ikon": "buyutec",
       "renk": "#2f4a6b"
      },
      {
       "baslik": "Faydalı mı?",
       "metin": "amaç taşı",
       "ikon": "yildiz",
       "renk": "#4f7a3a"
      },
      {
       "baslik": "Saygılı mı?",
       "metin": "kırma",
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
