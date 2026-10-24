/* Basma! — seviye defteri
   Bu dosyayı bir metin editörüyle düzenleyin. Oyun.js'e dokunmanız gerekmez.
   Kaydettikten sonra sayfayı yenileyin. Canlı siteye ancak bu değişiklik
   yayımlandığında yansır.

   Her seviye bir nesnedir. Sık kullanılan alanlar:

   metin     Düğmenin içinde görünen talimat. Zorunlu.
   sure      Saniye. Yazılmazsa 6.
   ikon      Tek ad ya da dizi. Adlar:
             kedi, fare, orumcek, yildiz, saat,
             ucgen (3), kare (4), besgen (5), altigen (6), daire (0 köşe)
   tam       Tam olarak bu kadar basış doğru sayılır.
   az        Bu sayıdan az basış doğru sayılır (0 dahil). az: 2 → 0 veya 1.
   tur       Özel hesap. tam/az yerine geçer (hatirla hariç, o akılda tutar
             ve turun hedefi yine tam/az olur):
             "son"         Bir önceki turda yapılan basış
             "kelime"      sayilan cümlesindeki kelime sayısı
             "kose"        Görünen şeklin köşe sayısı (daire: 0)
             "saat"        saat alanındaki akrep (1–12). dakika isteğe bağlı
             "hatirla"     deger sayısını akılda tutar
             "hatirlanan"  Akıldaki sayı kadar bas
             "gorulen"     sayIkon daha önceki turlarda kaç kez göründü
   sayilan, deger, saat, dakika, sayIkon
             İlgili turun ek bilgisi.

   yeniKural Biriken kural. Aynı ikonun eski kuralının yerine geçer ve
             bu turda ikon görünüyorsa yazıdaki hedefin yerine geçer.
             { ikon, ne, adet, yazi }
             ne: "hep"   ikon varken adet kadar bas (yazı ne derse desin)
                 "asla"  ikon varken hiç basma
                 "cift"  o ikon düğmede çift sayıda ise adet, tek ise 0
                 "tek"   o ikon düğmede tek sayıda ise adet, çift ise 0
             yazi: oyuncunun üstte gördüğü kısa cümle.

   Örnek:
   { metin: "Bir kez bas.", tam: 1, sure: 7 }
*/
var BASMA_PAKETLER = [
  {
    id: "dikkat",
    ad: "Dikkat turu",
    ozet: "Talimat, hafıza ve biriken kurallar.",
    seviyeler: [
      { metin: "Bir kez bas.", tam: 1, sure: 8 },
      { metin: "Hiç basma.", tam: 0, sure: 7 },
      { metin: "İki kez bas.", tam: 2, sure: 7 },
      { metin: "Üç kez bas.", tam: 3, sure: 7 },
      { metin: "Bu tur da hiç basma.", tam: 0, sure: 6.5 },
      { metin: "Geçen tur kaç kez bastıysan, o kadar bas.", tur: "son", sure: 7 },
      { metin: "Bir kez bas.", tam: 1, sure: 6 },
      {
        metin: "Her kelime için bir kez bas.",
        tur: "kelime",
        sayilan: "elma armut ayva",
        sure: 8
      },
      { metin: "Karenin her köşesi için bir kez bas.", ikon: "kare", tur: "kose", sure: 8 },
      { metin: "Üçgenin her köşesi için bir kez bas.", ikon: "ucgen", tur: "kose", sure: 7 },
      { metin: "İki kere iki kadar bas.", tam: 4, sure: 7 },
      { metin: "Aklında tut: üç. Bu tur basma.", tur: "hatirla", deger: 3, tam: 0, sure: 9 },
      { metin: "İki kez bas.", tam: 2, sure: 6 },
      { metin: "Aklındaki sayı kadar bas.", tur: "hatirlanan", sure: 8 },
      { metin: "İkiden az bas.", az: 2, sure: 7 },
      { metin: "Çabuk karar ver: hiç basma.", tam: 0, sure: 2.8 },
      { metin: "Akrep kaç ise o kadar bas.", ikon: "saat", tur: "saat", saat: 4, dakika: 0, sure: 8 },
      { metin: "Dairenin her köşesi için bir kez bas.", ikon: "daire", tur: "kose", sure: 7 },
      {
        metin: "Bunu unutma: kedi görünce bir kez bas.",
        ikon: "kedi",
        tam: 1,
        sure: 8,
        yeniKural: { ikon: "kedi", ne: "hep", adet: 1, yazi: "Kedi görünce bir kez bas." }
      },
      { metin: "Basma.", ikon: "kedi", tam: 0, sure: 6 },
      { metin: "İki kez bas.", ikon: "yildiz", tam: 2, sure: 6 },
      {
        metin: "Bunu da unutma: örümcek görünce hiç basma.",
        ikon: "orumcek",
        tam: 0,
        sure: 8,
        yeniKural: { ikon: "orumcek", ne: "asla", adet: 0, yazi: "Örümcek görünce hiç basma." }
      },
      { metin: "Bir kez bas.", ikon: "orumcek", tam: 1, sure: 6 },
      {
        metin: "Yeni kural: kediler çift sayıda ise bir kez bas, tek sayıda ise basma.",
        ikon: ["kedi", "kedi"],
        tam: 1,
        sure: 10,
        yeniKural: {
          ikon: "kedi",
          ne: "cift",
          adet: 1,
          yazi: "Kediler çift sayıda ise bir kez bas, tek sayıda ise basma."
        }
      },
      { metin: "Bir kez bas.", ikon: "kedi", tam: 1, sure: 6.5 },
      {
        metin: "Bunu unutma: fare görünce bir kez bas.",
        ikon: "fare",
        tam: 1,
        sure: 8,
        yeniKural: { ikon: "fare", ne: "hep", adet: 1, yazi: "Fare görünce bir kez bas." }
      },
      { metin: "Basma.", ikon: "fare", tam: 0, sure: 5.5 },
      {
        metin: "Daha önce gördüğün her kedi için bir kez bas.",
        ikon: "yildiz",
        tur: "gorulen",
        sayIkon: "kedi",
        sure: 11
      }
    ]
  },
  {
    id: "siyer",
    ad: "Siyer turu",
    ozet: "Kısa ve sahih bilgiler. Peygamber Efendimiz (sallallahü aleyhi ve sellem).",
    seviyeler: [
      {
        metin: "Peygamber Efendimiz (sallallahü aleyhi ve sellem) Mekke-i Mükerreme'de dünyaya geldiyse iki kez bas.",
        tam: 2,
        sure: 16
      },
      {
        metin: "Peygamber Efendimizin (sallallahü aleyhi ve sellem) hicreti Medîne-i Münevvere'ye olduysa bir kez bas.",
        tam: 1,
        sure: 16
      },
      { metin: "İlk vahiy Hira mağarasında nâzil olduysa bir kez bas.", tam: 1, sure: 12 },
      { metin: "Kur'ân-ı Kerîm 114 sûre ise, rakamlarının toplamı kadar bas.", tam: 6, sure: 14 },
      {
        metin: "Peygamber Efendimizden (sallallahü aleyhi ve sellem) sonra ilk halîfe Hazret-i Ebû Bekr ise bir kez bas.",
        tam: 1,
        sure: 16
      },
      { metin: "Bir günde beş vakit namaz kılınırsa beş kez bas.", tam: 5, sure: 12 },
      { metin: "Ramazan orucu bir ay ise bir kez bas.", tam: 1, sure: 12 },
      { metin: "Kâbe, Mekke-i Mükerreme'de ise üç kez bas.", tam: 3, sure: 12 },
      {
        metin: "Peygamber Efendimiz (sallallahü aleyhi ve sellem) Medîne-i Münevvere'de dünyaya geldiyse bir kez bas; Mekke-i Mükerreme'de dünyaya geldiyse hiç basma.",
        tam: 0,
        sure: 18
      }
    ]
  }
];
