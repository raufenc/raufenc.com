/* İbremetre · Tevâzu — az, kararında, fazla. Video yok: açılış, tahmin, kapılar, senaryo kodla çizilir.
   İçerik: TACEV Ahlak Müfredatı, "İslam ahlakı kutuplar 2.0" (Tezellül · Tevâzu · Kibr). Taslak: hoca onayı bekliyor. */
DO.dersKaydet(
{
 "id": "ibre-tevazu",
 "ad": "Tevâzu: İbren Nerede?",
 "kisaAd": "İbremetre",
 "seri": "İbremetre",
 "yas": "10-15 yaş",
 "ozet": "Birçok güzel huy bir ibre gibidir: çok az olunca eksiklik, çok fazla olunca taşkınlık. Merak sorusuyla başlayan, ibreyi sürükleyerek tahmin edilen, kapıların açıldığı ve “Sen olsan?” senaryolarıyla devam eden 8 dakikalık ders.",
 "kapakGorseli": "kapak.svg",
 "basariEsigi": 0.6,
 "bolumler": [
  {
   "id": "ibre",
   "ad": "İbremetre",
   "renk": "#17998A",
   "bloklar": [
    {
     "id": "acilis",
     "tur": "ibreAcilis",
     "huy": "Tevâzu",
     "olculen": "Başarıdaki payımı görme biçimim",
     "kanca": "Benim tevazum bile gösterişli!",
     "uclar": { "az": "Tezellül", "orta": "Tevâzu", "fazla": "Kibr" },
     "soru": "Bu cümle ibrenin neresinde?",
     "yesil": 0.24
    },
    {
     "id": "tahmin",
     "tur": "ibreTahmin",
     "huy": "Tevâzu",
     "cumle": "Benim tevazum bile gösterişli!",
     "uclar": { "az": "Tezellül", "orta": "Tevâzu", "fazla": "Kibr" },
     "yesil": 0.24,
     "hedefZon": "fazla",
     "aciklama": [
      "Bu cümle bilerek çift anlamlı. Bir okumada kişi kendi güzel huyunu bile öne çıkarıyor, yani payı kendine yazıyor: sağ uca (Kibr) yakın. Başka okumada kendine bakıp espri yapıyor: orta uca yakın. İki okuma da savunulabilir.",
      "İbre cümleye değil, o an kişinin payını nasıl gördüğüne bakar; amaç kendini sorgulamak değil, fark etmek. Tevâzu, payını doğru görmek ve sahip olduklarının bir nimet olduğunu bilmektir.",
      "Küçük not: tefrit = eksik uç, fazilet = ortadaki güzel huy, ifrat = taşkın uç."
     ],
     "merak": "Peki ibrenin iki ucundaki kişiler tam olarak ne yapar, içlerinden ne geçer? Üç kapıyı açıp bakalım."
    },
    {
     "id": "kapilar",
     "tur": "ibreKapilar",
     "huy": "Tevâzu",
     "baslik": "Üç kapı",
     "yonerge": "Hangi kapıyı açmak istersin? Her kapıda bir kişi, bir cümle ve bir iç ses var.",
     "uclar": { "az": "Tezellül", "orta": "Tevâzu", "fazla": "Kibr" },
     "yesil": 0.24,
     "kapilar": [
      {
       "zon": "az",
       "soru": "Kendini küçültmek de tevâzu mu?",
       "ad": "Tezellül",
       "soz": "Benim yaptığım söylemeye değmez.",
       "eylem": "yaslan",
       "zincir": [
        "Teşekkür edilince “benim yaptığım sayılmaz” diyerek geri çevirir.",
        "Arkadaşları onun emeğini göremez olur.",
        "Kendi emeği de yok sayılmış olur."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         { "m": "Yaptığım şey söylemeye değmez.", "dogru": true, "not": "Tezellül kendine haksızlık etmektir. Alçakgönüllülük değil, kendi emeğini yok saymak." },
         { "m": "Bu başarıda herkesin payı var; benim payım şu.", "dogru": false, "not": "Bu orta ucun sesi: tevâzunun sesi." },
         { "m": "Hepsini ben yaptım.", "dogru": false, "not": "Bu sağ ucun sesi: kibrin sesi." }
        ]
       }
      },
      {
       "zon": "fazla",
       "soru": "Başarıyı kendine yazan kişi neyi kaçırır?",
       "ad": "Kibr",
       "soz": "Bu işi bir ben yapabilirdim!",
       "eylem": "isaret",
       "zincir": [
        "Arkadaşlarının emeği görünmez olur.",
        "Teşekkür sırası kimseye gelmez.",
        "Bir sonraki işte arkadaşların gönülden gelmeyebilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         { "m": "Bu başarı benim; onlar sadece izledi.", "dogru": true, "not": "Kibir, kendini herkesten üstün görmektir; başkasının emeğini silip kendi payını şişirir." },
         { "m": "Benim yaptığım söylemeye değmez.", "dogru": false, "not": "Bu sol ucun sesi: tezellülün sesi." },
         { "m": "Hepimizin emeği var.", "dogru": false, "not": "Bu orta ucun sesi: tevâzunun sesi." }
        ]
       }
      },
      {
       "zon": "orta",
       "soru": "Doğru ayar neye benziyor?",
       "ad": "Tevâzu",
       "soz": "Hepimizin emeği var.",
       "eylem": "konus",
       "zincir": [
        "Payını bilir; ne eksik ne fazla söyler.",
        "Teşekkür eder, emeği paylaşır.",
        "Bir sonraki işte arkadaşların gönülden katılabilir."
       ],
       "ic": {
        "soru": "Bu kişi içinden ne diyor olabilir?",
        "secenekler": [
         { "m": "Bu başarıda herkesin payı var; benim payım şuydu.", "dogru": true, "not": "Tevâzu kendini silmek değil, payını doğru görmektir." },
         { "m": "Benim yaptığım söylemeye değmez.", "dogru": false, "not": "Bu sol ucun sesi: tezellülün sesi." },
         { "m": "Bu işi bir ben yapabilirdim.", "dogru": false, "not": "Bu sağ ucun sesi: kibrin sesi." }
        ]
       }
      }
     ]
    },
    {
     "id": "senaryo",
     "tur": "ibreSenaryo",
     "huy": "Tevâzu",
     "baslik": "Sen olsan?",
     "uclar": { "az": "Tezellül", "orta": "Tevâzu", "fazla": "Kibr" },
     "yesil": 0.24,
     "min": 2,
     "sonBaslik": "Aynı durum, farklı ibre.",
     "sonMetin": "İki durumda da sahne aynıydı. Fark, hangi iç sesi dinlediğimizdedir. İbre bir karne değil; gün içinde oynar, bu normaldir.",
     "senaryolar": [
      {
       "id": "yarisma",
       "baslik": "Yarışmayı kazandınız",
       "tetik": "Takımınız bilgi yarışmasını kazandı. Öğretmen sahneye yalnızca seni çağırıp tebrik ediyor.",
       "secenekler": [
        { "m": "Ben bir şey yapmadım ki, ben çıkmayayım.", "zon": "az", "sonuc": "Öğretmen seni çağırdı ama arkadaşlarının emeği sahnede anılmadı; belki onlar da bunu fark etti.", "not": "İbre sola kaydı: kendini küçülttükçe hem senin hem arkadaşlarının emeği görünmez oluyor." },
        { "m": "Evet, ben olmasam kazanamazdık!", "zon": "fazla", "sonuc": "Alkış yükseliyor ama arkadaşların sessizleşiyor; takım bir yandan kazanıp bir yandan kaybediyor.", "not": "İbre sağa kaydı: payı kendine yazınca birlikte kazanma duygusu zayıflıyor." },
        { "m": "Teşekkürler! Hepimizin emeği var; arkadaşlarımı da yanıma alabilir miyim?", "zon": "orta", "sonuc": "Alkış herkese gidiyor. Sen de payını saklamamış oldun.", "not": "İbre ortada: hem kendi payını hem arkadaşlarının payını görünür kıldın." }
       ]
      },
      {
       "id": "soru",
       "baslik": "Çözemeyen arkadaşın",
       "tetik": "Sınıfta bir arkadaşının çözemediği soruyu sen çözdün. Arkadaşın “Nasıl yaptın?” diye soruyor.",
       "secenekler": [
        { "m": "Bende bir şey yok ki, anlatmaya değmez; sen öğretmene sor.", "zon": "az", "sonuc": "Arkadaşın bir daha sormaya çekinebilir; öğrendiğin yolu paylaşma fırsatı kaçıyor.", "not": "İbre sola kaydı: bilgin saklı kalınca kimse ondan yararlanamıyor." },
        { "m": "Çok kolay, bunu bilmeyen mi var?", "zon": "fazla", "sonuc": "Arkadaşın küçük düştüğünü düşünebilir; bir dahaki sefere sormaya çekinebilir.", "not": "İbre sağa kaydı: kendini yüksek tutmak karşındakini küçültüyor." },
        { "m": "Önce şuna baktım, sonra şöyle düşündüm. İstersen birlikte deneyelim.", "zon": "orta", "sonuc": "Arkadaşın rahatlıyor; ikiniz de öğreniyorsunuz.", "not": "İbre ortada: bilgini paylaşırken karşındakini küçültmedin." }
       ]
      }
     ]
    },
    {
     "id": "uc-bul",
     "tur": "siniflandir",
     "baslik": "Hangi uca yakın?",
     "yonerge": "Kartı ibrenin uygun ucuna taşı. Emin değilsen karta bak: ipucu var.",
     "alanlar": [
      { "id": "az", "ad": "Az · Tezellül", "aciklama": "Kendini hiç saymak", "ikon": "kilit", "renk": "#4262B0" },
      { "id": "orta", "ad": "Kararında · Tevâzu", "aciklama": "Payını doğru görmek", "ikon": "muhur", "renk": "#17998A" },
      { "id": "fazla", "ad": "Fazla · Kibr", "aciklama": "Payı kendine yazmak", "ikon": "uyari", "renk": "#E0674F" }
     ],
     "kartlar": [
      { "id": "k1", "metin": "Başarısı olsa bile “ben bir işe yaramam” deyip her teşekkürü geri çevirir.", "alan": "az", "ipucu": "Kendi emeğini hiç saymıyor." },
      { "id": "k2", "metin": "Arkadaşı anlatırken “ben daha iyisini yaptım” diye lafı keser.", "alan": "fazla", "ipucu": "Konuyu kendine çekiyor." },
      { "id": "k3", "metin": "Başarıyı anlatırken arkadaşlarının payını da sayar.", "alan": "orta", "ipucu": "Payını da, başkalarının payını da görüyor." },
      { "id": "k4", "metin": "Yaptığı güzel işi bile saklar; “sayılmaz” der.", "alan": "az", "ipucu": "Kendi emeğini yok sayıyor." },
      { "id": "k5", "metin": "“Bu işi ben taşıdım, siz sadece izlediniz.” der.", "alan": "fazla", "ipucu": "Başkalarının emeğini siliyor." },
      { "id": "k6", "metin": "Hata yapınca da başarı kazanınca da payını aynı sakinlikle söyler.", "alan": "orta", "ipucu": "Payını olduğu gibi söylüyor." }
     ]
    },
    {
     "id": "niyet",
     "tur": "dusun",
     "baslik": "Bu hafta ibremi nasıl ayarlarım?",
     "sorular": [
      { "soru": "Hangi durumda ibrem sağa ya da sola kayıyor?", "secenekler": ["Başarımı anlatırken", "Övgü alırken", "Bir işi paylaşırken", "Hata yapınca"] },
      { "soru": "Bu hafta şunu deneyeceğim:", "secenekler": ["Başarımı anlatırken bir arkadaşımın payını da sayacağım", "Övgü alınca “teşekkür ederim” deyip payımı söyleyeceğim", "Bir işi paylaşırken herkesin katkısını yazacağım"] }
     ],
     "ipucu": "İstersen kendi cümleni yaz: “Eğer … olursa, o zaman …” (gerçek isim, okul, adres ya da telefon yazma; “bir arkadaşım” de).",
     "tesekkur": "Niyetin kaydedildi. İbre bir karne değil; gün içinde oynar, bu normaldir. Küçük bir ayar, her gün yeniden. Allahü teâlâ kolaylık versin."
    },
    {
     "id": "son",
     "tur": "kapanis",
     "baslik": "Ders tamamlandı",
     "maddeler": [
      { "baslik": "İbre", "metin": "az · kararında · fazla", "ikon": "yol", "renk": "#4262B0" },
      { "baslik": "Tevâzu", "metin": "payını doğru görmek", "ikon": "muhur", "renk": "#17998A" },
      { "baslik": "Her gün", "metin": "yeniden ayarlamak", "ikon": "kalp", "renk": "#E0674F" }
     ]
    }
   ]
  }
 ]
}
);
