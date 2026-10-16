/* ÂDÂB-I MUÂŞERET · Bereketli Sofra — tam etkileşimli ders
   Kaynak: Drive "Yeme ve İçme Âdâbı" (20 slayt) ve "Sofra Edebi" (6 slayt) desteleri.
   Hikâye, hata bulma ve ikon görselleri bu ders için GPT Image (Higgsfield) ile üretildi (gorsel/).
   Hadîs-i şerîfler meâlen verilmiş, kaynakları yanlarında yazılmıştır. */
(function () {
  var I = function (n) { return 'gorsel/ikon-iyi-' + n + '.webp'; };
  var K = function (n) { return 'gorsel/ikon-kotu-' + n + '.webp'; };
  DO.dersKaydet({
    id: 'adab-sofra',
    ad: 'Bereketli Sofra',
    kisaAd: 'Âdâb',
    seri: 'Âdâb-ı Muâşeret',
    ozet: 'Yeme ve içme âdâbını Yusuf ile bir akşam sofrasında öğreniyoruz: resimli hikâye, bereket sepeti, soru çarkı, hata bulma ve dolan bereket sofrasıyla 35-40 dakika.',
    yas: '8-13 yaş',
    sure: 40,
    kapakGorseli: 'gorsel/kapak.webp',
    basariEsigi: 0.6,
    kaynak: 'Drive / Yeme ve İçme Âdâbı (20 slayt) + Sofra Edebi (6 slayt); hikâye ve oyun görselleri GPT Image ile üretildi',
    bolumler: [

      /* ------------------------------------------------------------ */
      {
        id: 'acilis', ad: 'Açılış', renk: '#2f4a6b',
        bloklar: [
          {
            id: 'kapak', tur: 'kapak', gorsel: 'gorsel/kapak.webp',
            ust: 'Âdâb-ı Muâşeret',
            baslik: 'Bereketli Sofra',
            alt: 'Yeme ve içme âdâbı · Yusuf ile bir akşam yemeği',
            not: 'Derse besmele ile başlayın. Öğrenciye bu akşam evde ne yemek pişeceğini sorun; sofrayı kimin kurduğunu konuşun.'
          },
          {
            id: 'isinma', tur: 'anket', baslik: 'Isınma sorusu',
            soru: 'Sofraya oturunca ilk ne yaparsın?',
            secenekler: ['Besmele çekerim', 'Hemen yemeğe başlarım', 'Büyüklerin başlamasını beklerim', 'Hiç düşünmedim'],
            ogrenciNotu: 'Dersin sonunda bu soruya birlikte yeniden bakacağız.',
            not: 'Cevabı düzeltmeyin. Kapanışta aynı soruyu tekrar sorun: “Ellerimizi yıkarız, büyüklerimizi bekleriz, besmele çekeriz.”'
          },
          {
            id: 'hikaye-1', tur: 'hikaye', baslik: 'Yusuf eve geliyor', rozet: '📖 Hikâye · 1. bölüm',
            sahneler: [
              {
                id: 'eve-gelis', gorsel: 'gorsel/hikaye-1.webp',
                metin: 'Akşam ezanına az kalmıştı. Yusuf okuldan eve geldi. Mutfaktan mis gibi çorba kokusu geliyordu; karnı zil çalıyordu!',
                soru: 'Yusuf çok acıkmış. Sence ilk ne yapmalı?',
                secenekler: [
                  { metin: 'Çantasını bırakıp ellerini sabunla yıkamalı', iyi: true, sonuc: 'Yusuf ellerini güzelce yıkadı. Annesi gülümsedi: “Aferin oğlum, sofraya temiz ellerle oturulur.”' },
                  { metin: 'Hemen tencereden bir kaşık almalı', sonuc: 'Annesi tatlı bir sesle: “Yusuf’cuğum, sofra kurulsun, hep beraber yiyelim. Önce ne yapıyorduk?” dedi.' },
                  { metin: 'Ellerini yıkamadan sofraya oturmalı', sonuc: 'Okuldan gelen eller tozlu olabilir. Sofraya oturmadan önce eller yıkanır.' }
                ]
              },
              {
                id: 'dede-bekliyor', gorsel: 'gorsel/hikaye-2.webp',
                metin: 'Sofra kuruldu. Dedesi, annesi ve Zeynep yerlerini aldı. Yusuf’un eli hemen çorbaya uzandı… ama dedesi henüz başlamamıştı.',
                soru: 'Yusuf şimdi ne yapmalı?',
                secenekler: [
                  { metin: 'Elini çekip dedesinin başlamasını beklemeli', iyi: true, sonuc: 'Yusuf bekledi. Dedesi “Bismillâhirrahmânirrahîm” deyip başladı; Yusuf da besmele çekip başladı. Dedesi onu takdirle süzdü.' },
                  { metin: 'Acıktığı için hemen başlayabilir', sonuc: 'Acıkmak çok normal; ama sofrada büyüklerimize öncelik vermek edebdir. Biraz sabır sofraya bereket katar.' },
                  { metin: 'Herkesten önce kendi tabağını doldurmalı', sonuc: 'Önce büyüklerimiz alır, biz sonra alırız. Sofrada acele etmeyiz.' }
                ]
              }
            ],
            sonBaslik: 'Hikâyenin ilk bölümü bitti!',
            sonMetin: 'Yusuf sofraya temiz ellerle oturdu ve dedesini bekledi. Bakalım sofrada neler olacak…',
            not: 'Her seçimde öğrenciye “Neden?” diye sorun. Yanlış seçimi ayıplamadan sonucunu birlikte okuyun.'
          },
          {
            id: 'sofra-0', tur: 'sofra', ust: 'Bereket sofrası',
            baslik: 'Bu sofrayı birlikte kuracağız',
            alt: 'Her etkinliği bitirdiğinde sofraya yeni bir nimet gelecek. Üç yıldız alırsan tabak parıldar!',
            not: 'Sofra ekranı dersin ödül panosudur; her bölüm sonunda yeniden görünür.'
          }
        ]
      },

      /* ------------------------------------------------------------ */
      {
        id: 'once', ad: 'Sofradan önce', renk: '#4f7a3a',
        bloklar: [
          { id: 'b-once', tur: 'bolum', numara: '1. durak', baslik: 'Sofradan önce', alt: 'Temizlik, davet ve sabır', ikon: 'el', renk: '#4f7a3a' },
          {
            id: 's-el', tur: 'slayt', gorsel: 'slayt/y15.webp',
            metin: 'Sofraya oturmadan önce ellerimizi sabunla yıkarız. Hadîs-i şerîfte “Yemeğin bereketi, ondan önce ve sonra elleri yıkamaktır” buyruldu. (Ebû Dâvûd, Tirmizî)',
            not: 'Öğrenciye kendi el yıkama sırasını anlattırın: su, sabun, avuç içi, parmak araları, durulama.'
          },
          {
            id: 's-davet', tur: 'slayt', gorsel: 'slayt/y10.webp',
            metin: 'Sofra hazırlanınca ev sahibi ya da büyüklerimiz davet edene kadar bekleriz. Misafirlikte de davet edilmeden sofraya oturmayız.',
            not: 'Sorun: “Misafirliğe gittin, sofra kuruluyor. Ne yaparsın?”'
          },
          {
            id: 's-buyuk', tur: 'slayt', gorsel: 'slayt/y11.webp',
            metin: 'Yemeğe önce büyüklerimiz başlar. Onlar başlamadan elimizi uzatmayız; en güzel lokmayı önce onlara ikram ederiz.',
            not: 'Hikâyedeki dede sahnesini hatırlatın.'
          },
          {
            id: 's-oturus', tur: 'slayt', gorsel: 'slayt/y07.webp',
            metin: 'Sofrada güzel oturmanın bir yolu sünnet oturuşudur: sağ diz dikilir, sol ayak altta kalır. Yayılarak, ayak uzatarak oturmayız.',
            vurgular: [
              { id: 'sag', x: 610, y: 320, r: 90, etiket: 'Sağ diz dik' },
              { id: 'sol', x: 870, y: 650, r: 90, etiket: 'Sol ayak altta' }
            ],
            not: 'Öğrenciyle birlikte oturuşu deneyin. Dizlerde sıkıntısı varsa iki diz üstü ya da bağdaş da olur; önemli olan edepli ve toplu oturmaktır.'
          },
          {
            id: 's-otur', tur: 'slayt', gorsel: 'slayt/y04.webp',
            metin: 'Sofrada dik ve toplu otururuz; gözümüz başkalarının tabağında olmaz, elimiz kendi önümüzde durur.',
            not: 'Slayttaki küçük daireleri gösterin: dik sırt, kendi tabağına bakan göz, önünde duran el, toplu diz.'
          },
          {
            id: 'hazirlik-sira', tur: 'sirala', baslik: 'Sofra yolculuğu', rozet: '🧭 Sırala',
            yonerge: 'Sofranın başından sonuna adımları sırayla seç. Her doğru adımda Yusuf bir durak ilerler!',
            adimlar: [
              { id: 'yika', metin: 'Ellerimizi yıkarız', gorsel: 'slayt/y15.webp', aciklama: 'Temiz eller, bereketli sofra.' },
              { id: 'davet', metin: 'Davet edilince otururuz', gorsel: 'slayt/y10.webp', ipucu: 'Elleri yıkadık. Sofraya ne zaman oturuyorduk?' },
              { id: 'bekle', metin: 'Büyüklerimizi bekleriz', gorsel: 'slayt/y11.webp', ipucu: 'Oturduk. Yemeğe ilk kim başlar?' },
              { id: 'besmele', metin: 'Besmele çekeriz', gorsel: 'slayt/y01.webp', ipucu: 'Büyüklerimiz başladı. Biz başlarken ne deriz?' },
              { id: 'sag', metin: 'Sağ elle, önümüzden yeriz', gorsel: 'slayt/y06.webp', ipucu: 'Besmeleyi çektik. Nasıl yiyoruz?' },
              { id: 'hamd', metin: '“Elhamdülillah” deriz', gorsel: 'slayt/y18.webp', ipucu: 'Yemek bitti. Kalkmadan önce ne deriz?' },
              { id: 'temiz', metin: 'Elimizi, ağzımızı temizleriz', gorsel: 'slayt/y14.webp', ipucu: 'Son adım temizlikle ilgili.' }
            ],
            sonBaslik: 'Sofra yolculuğu tamam!',
            sonMetin: 'Temizlikle başladık, şükür ve temizlikle bitirdik.',
            not: 'Birlikte modunda öğrenciler sırayla dokunabilir. Yanlış kartta ipucu çıkar; cevabı söylemeyin, ipucunu okutun.'
          },
          { id: 'sofra-1', tur: 'sofra', not: 'İlk nimetler sofraya geldi. Öğrenciye hangi tabağın geldiğini sorun.' }
        ]
      },

      /* ------------------------------------------------------------ */
      {
        id: 'yerken', ad: 'Yerken', renk: '#e8962e',
        bloklar: [
          { id: 'b-yerken', tur: 'bolum', numara: '2. durak', baslik: 'Sofrada', alt: 'Besmele, sağ el, önünden ye', ikon: 'yildiz', renk: '#e8962e' },
          {
            id: 's-besmele', tur: 'slayt', gorsel: 'slayt/a08-02.webp',
            metin: 'Yemeğe “Bismillâhirrahmânirrahîm” diyerek başlarız. Besmele ile başlanan sofraya bereket gelir.',
            not: 'Besmeleyi öğrenciyle birlikte okuyun. Unutursa hatırlayınca “Bismillâhi evvelehû ve âhirehû” denir; çarktaki soruda geçecek.'
          },
          {
            id: 'soz-evladim', tur: 'soz', ust: 'Hadîs-i şerîf', renk: '#e8962e',
            giris: 'Hazret-i Ömer bin Ebû Seleme küçük bir çocukken Peygamber Efendimizin (sallallahü aleyhi ve sellem) yanında yemek yiyordu; eli tabağın her yanında dolaşıyordu. Peygamber Efendimiz (sallallahü aleyhi ve sellem) ona şefkatle şöyle buyurdu:',
            metin: '“Evlâdım! Besmele çek, sağ elinle ye ve önünden ye.”',
            kaynak: 'Buhârî, Et‘ime 2 · Müslim, Eşribe 108',
            aciklama: 'Bir çocuğa söylenmiş üç güzel öğüt: Besmele · Sağ el · Önünden yemek.',
            not: 'Peygamber Efendimizin (sallallahü aleyhi ve sellem) çocuğu azarlamadan, “Evlâdım” diye şefkatle öğrettiğine dikkat çekin.'
          },
          {
            id: 's-sag', tur: 'slayt', gorsel: 'slayt/y03.webp',
            metin: 'Sağ elimizle yer, sağ elimizle içeriz. Peygamber Efendimiz (sallallahü aleyhi ve sellem) yemeyi ve içmeyi sağ elle yapmayı emretti. (Müslim)',
            not: 'Solak öğrenci varsa nazikçe konuşun: yazıyı sol elle yazabilir; yemekte sağ eli kullanmaya alışmak edebdir.'
          },
          {
            id: 's-onunden', tur: 'slayt', gorsel: 'slayt/y06.webp',
            metin: 'Ortak tabaktan yerken kendi önümüzden yeriz. Başkasının önüne, tabağın ortasına uzanmayız.',
            not: 'Sorun: “Tepsinin ortasında en güzel et var. Ne yaparsın?”'
          },
          {
            id: 's-lokma', tur: 'slayt', gorsel: 'slayt/y09.webp',
            metin: 'Lokmalarımızı küçük alır, iyice çiğneriz. Ağzımızdaki lokmayı yutmadan yenisini almayız.'
          },
          {
            id: 's-olcu', tur: 'slayt', gorsel: 'slayt/y02.webp',
            metin: 'Ölçülü yeriz. Hadîs-i şerîfte midenin üçte birinin yemeğe, üçte birinin suya, üçte birinin de nefese ayrılması tavsiye edildi. (Tirmizî, Zühd 47)',
            not: 'Terazi resmini gösterin: “Doyunca dururuz; tıka basa yemeyiz.”'
          },
          {
            id: 's-sohbet', tur: 'slayt', gorsel: 'slayt/y08.webp',
            metin: 'Sofrada güzel ve tatlı sohbet ederiz. Ağzımız doluyken konuşmayız; kimseyi kırmayız, yemeği ayıplamayız.'
          },
          {
            id: 's-hurmet', tur: 'slayt', gorsel: 'slayt/y12.webp',
            metin: 'Sofrada hürmetli oluruz: ağzımızı şapırdatmayız, yüksek sesle gülüp bağırmayız, başkalarını rahatsız edecek davranışlardan uzak dururuz.'
          },
          {
            id: 'soru-carki', tur: 'cark', baslik: 'Sofra çarkı',
            yonerge: 'Çarkı çevir! Hangi konu gelirse onun sorusunu cevapla.',
            dilimler: [
              { id: 'c-besmele', etiket: 'Besmele', emoji: '🤲', soru: 'Yemeğe başlarken besmeleyi unuttun. Hatırlayınca ne dersin?', secenekler: ['Bismillâhi evvelehû ve âhirehû', 'Bir şey demem, iş işten geçti', 'Yemeği bırakıp kalkarım'], dogru: 0, aciklama: 'Peygamber Efendimiz (sallallahü aleyhi ve sellem) besmele unutulunca “Bismillâhi evvelehû ve âhirehû” (başında da sonunda da Allahü teâlânın adıyla) denmesini öğretti. (Ebû Dâvûd, Tirmizî)' },
              { id: 'c-sag', etiket: 'Sağ el', emoji: '✋', soru: 'Su bardağını hangi elimizle tutup içeriz?', secenekler: ['Sağ elimizle', 'Sol elimizle', 'Fark etmez'], dogru: 0, aciklama: 'Yemekte ve içmekte sağ el kullanılır. (Müslim)' },
              { id: 'c-onunden', etiket: 'Önünden', emoji: '🍽️', soru: 'Pilav tepsisi sofranın ortasında. Nereden yersin?', secenekler: ['Kendi önümden', 'En güzel etin olduğu yerden', 'Herkesin önünden biraz'], dogru: 0, aciklama: '“Evlâdım! … önünden ye.” (Buhârî, Müslim)' },
              { id: 'c-lokma', etiket: 'Lokma', emoji: '🍞', soru: 'Lokmayı nasıl alırız?', secenekler: ['Küçük alır, iyice çiğneriz', 'Ağzımızı doldururuz, çabuk biter', 'Yutmadan yenisini alırız'], dogru: 0, aciklama: 'Küçük lokma, iyi çiğneme: hem sağlık hem edeb.' },
              { id: 'c-olcu', etiket: 'Ölçü', emoji: '⚖️', soru: 'Hadîs-i şerîfe göre midemizin ne kadarı yemeğe ayrılır?', secenekler: ['Üçte biri', 'Tamamı', 'Yarısından fazlası'], dogru: 0, aciklama: 'Üçte biri yemeğe, üçte biri suya, üçte biri nefese. (Tirmizî)' },
              { id: 'c-ayiplama', etiket: 'Sevmediğim', emoji: '🥦', soru: 'Sevmediğin bir yemek geldi. Ne yaparsın?', secenekler: ['Ayıplamam; istemezsem yemem', '“Bu ne biçim yemek!” derim', 'Surat asarım'], dogru: 0, aciklama: 'Peygamber Efendimiz (sallallahü aleyhi ve sellem) hiçbir yemeği ayıplamazdı; canı isterse yer, istemezse bırakırdı. (Buhârî, Müslim)' },
              { id: 'c-sohbet', etiket: 'Sohbet', emoji: '💬', soru: 'Sofrada nasıl konuşuruz?', secenekler: ['Güzel sohbet ederiz; ağzımız doluyken konuşmayız', 'Ağzımız doluyken de anlatırız', 'Yüksek sesle şakalaşırız'], dogru: 0, aciklama: 'Tatlı sohbet sofrayı güzelleştirir.' },
              { id: 'c-buyuk', etiket: 'Büyükler', emoji: '👴', soru: 'Sofrada yemeğe ilk kim başlar?', secenekler: ['Büyüklerimiz', 'En çok acıkan', 'En küçük çocuk'], dogru: 0, aciklama: 'Büyüklere öncelik vermek edebdir.' }
            ],
            sonBaslik: 'Çark tamam!',
            sonMetin: 'Sekiz konunun hepsini cevapladın.',
            not: 'Canlı derste “Bu etkinlik: Birlikte” seçilirse çarkı öğrenciler sırayla çevirir; herkes aynı dilimi görür.'
          },
          {
            id: 'hikaye-2', tur: 'hikaye', baslik: 'Sofrada bir an', rozet: '📖 Hikâye · 2. bölüm',
            sahneler: [
              {
                id: 'dusen-ekmek', gorsel: 'gorsel/hikaye-3.webp',
                metin: 'Yemek çok güzeldi! Yusuf ekmeğini çorbaya banarken bir parçası elinden kayıp sofra bezinin kenarına düştü.',
                soru: 'Yusuf ne yapmalı?',
                secenekler: [
                  { metin: 'Ekmeği alır, üstündekini temizler ve yer', iyi: true, sonuc: 'Peygamber Efendimiz (sallallahü aleyhi ve sellem) böyle öğretti: düşen lokmayı temizleyip yemek, onu israf etmemek. Yusuf ekmeği alıp yedi.' },
                  { metin: 'Ayağıyla kenara iter', sonuc: 'Ekmek nimettir; ayakla itilmez. Ecdadımız yerde ekmek görse alır, öper, yüksekçe bir yere koyardı.' },
                  { metin: 'Çöpe atar', sonuc: 'Temizlenip yenebilecek bir nimeti atmak israftır.' }
                ]
              },
              {
                id: 'artan-pilav', gorsel: 'gorsel/hikaye-4.webp',
                metin: 'Yusuf tabağına pilavı tepeleme koymuştu. Biraz sonra karnı doydu ama tabakta hâlâ pilav vardı.',
                soru: 'Şimdi ne yapsın?',
                secenekler: [
                  { metin: 'Artanı çöpe atmaz, saklanmasını ister; bir dahaki sefere tabağına az alır', iyi: true, sonuc: 'Annesi gülümsedi: “Az al, gerekirse yine al.” Ölçülü almak israfı önler.' },
                  { metin: 'Artanı çöpe döker', sonuc: 'Nimeti çöpe dökmek israftır. Artan yemek saklanabilir, paylaşılabilir.' },
                  { metin: 'Doysa da zorla hepsini yer', sonuc: 'Tıka basa yemek de doğru değil. Midenin bir kısmı suya ve nefese kalmalı.' }
                ]
              }
            ],
            sonBaslik: 'Hikâyenin ikinci bölümü bitti!',
            sonMetin: 'Yusuf nimete saygı gösterdi ve ölçülü olmayı öğrendi.',
            not: '“Ecdadımız yerdeki ekmeği öperdi” sözünü açın; öğrencinin evinde de böyle bir âdet var mı sorun.'
          },
          {
            id: 'bereket-sepeti', tur: 'yakala', baslik: 'Bereket sepeti', sure: 45, max: 100,
            yonerge: 'Sofra edebine uyan davranışları sepetine topla, uymayanlardan kaç! Fareyle, parmağınla ya da ← → tuşlarıyla oyna.',
            iyiler: [
              { metin: 'Ellerini yıka', gorsel: I(1), emoji: '🧼' },
              { metin: 'Sağ elle ye', gorsel: I(2), emoji: '🥄' },
              { metin: 'Küçük lokma', gorsel: I(3), emoji: '🍞' },
              { metin: 'Üç yudumda iç', gorsel: I(4), emoji: '🥛' },
              { metin: 'Üstünü kapat', gorsel: I(5), emoji: '🍲' },
              { metin: 'Düşen ekmeği al', gorsel: I(6), emoji: '🤲' },
              { metin: 'Tabağı temiz bırak', gorsel: I(7), emoji: '🍽️' },
              { metin: 'Dişlerini temizle', gorsel: I(8), emoji: '🪥' },
              { metin: 'Elhamdülillah', gorsel: I(9), emoji: '🤲' }
            ],
            kotuler: [
              { metin: 'İsraf', gorsel: K(1), emoji: '🗑️', aciklama: 'Tabağı taşırmak israftır; yiyeceğimiz kadar alırız.' },
              { metin: 'Ekmeği çöpe at', gorsel: K(2), emoji: '🗑️', aciklama: 'Ekmek nimettir, çöpe atılmaz.' },
              { metin: 'Sol elle ye', gorsel: K(3), emoji: '✋', aciklama: 'Yemek sağ elle yenir.' },
              { metin: 'Sofrada telefon', gorsel: K(4), emoji: '📱', aciklama: 'Sofrada telefon değil, sohbet olur.' },
              { metin: 'Açık bırakılan kap', gorsel: K(5), emoji: '🪰', aciklama: 'Kapların üstü örtülür.' },
              { metin: 'Yürürken ye', gorsel: K(6), emoji: '🚶', aciklama: 'Oturarak, sofrada yeriz.' },
              { metin: 'Yemeği ayıpla', gorsel: K(7), emoji: '😠', aciklama: 'Yemek ayıplanmaz; istemezsek yemeyiz.' },
              { metin: 'Tıka basa ye', gorsel: K(8), emoji: '😵', aciklama: 'Ölçülü yeriz; ağzımızı doldurmayız.' }
            ],
            not: 'Canlı derste başlatma sizdedir: “Bereket sepetini herkes için başlat” düğmesine basınca herkes aynı anda oynar. Sonunda sınıf sıralaması görünür; öğrencinin yakaladığı yanlışlar raporda yazar.'
          },
          { id: 'sofra-2', tur: 'sofra', not: 'Sofra doluyor. Hangi tabakların parladığına (üç yıldız) bakın.' }
        ]
      },

      /* ------------------------------------------------------------ */
      {
        id: 'icerken', ad: 'İçerken ve sonra', renk: '#2a9d8f',
        bloklar: [
          { id: 'b-icerken', tur: 'bolum', numara: '3. durak', baslik: 'İçerken ve sofradan kalkarken', alt: 'Üç yudum, örtülü kap, şükür', ikon: 'kalp', renk: '#2a9d8f' },
          {
            id: 's-ic', tur: 'slayt', gorsel: 'slayt/y17.webp',
            metin: 'Suyu sağ elimizle, oturarak ve üç yudumda içeriz. Peygamber Efendimiz (sallallahü aleyhi ve sellem) içerken üç kere nefes alırdı; bardağın içine nefes vermezdi. (Buhârî, Müslim)',
            not: 'Bir bardak suyla birlikte deneyin: besmele, üç yudum, her yudumda bardağı ağızdan uzaklaştırmak, sonunda “Elhamdülillah”.'
          },
          {
            id: 's-kapat', tur: 'slayt', gorsel: 'slayt/y16.webp',
            metin: 'Yiyecek ve içeceklerin üstünü örteriz. Hadîs-i şerîfte geceleyin kapların örtülmesi emredildi. (Buhârî, Müslim)'
          },
          {
            id: 's-israf', tur: 'slayt', gorsel: 'slayt/y05.webp',
            metin: 'İsraf etmeyiz. Tabağımıza yiyebileceğimiz kadar alırız; kırıntıları çöpe değil kuşlara, hayvanlara veririz.',
            not: 'Slayttaki kediyi gösterin: artanlar hayvanlarla paylaşılabilir.'
          },
          {
            id: 's-son-lokma', tur: 'slayt', gorsel: 'slayt/y19.webp',
            metin: 'Tabağımızı temiz bırakırız. Peygamber Efendimiz (sallallahü aleyhi ve sellem) “Bereketin yemeğin hangi kısmında olduğunu bilemezsiniz” buyurdu. (Müslim)'
          },
          {
            id: 'soz-lokma', tur: 'soz', ust: 'Hadîs-i şerîf', renk: '#2a9d8f',
            giris: 'Peygamber Efendimiz (sallallahü aleyhi ve sellem) şöyle buyurdu:',
            metin: '“Sizden birinizin lokması düşerse ona bulaşanı gidersin ve onu yesin; şeytana bırakmasın.”',
            kaynak: 'Müslim, Eşribe',
            aciklama: 'Hikâyede Yusuf’un yaptığı tam da buydu: düşen ekmeği aldı, temizledi ve yedi.'
          },
          {
            id: 'hata-bul', tur: 'hataBul', baslik: 'Bu sofrada neler yanlış?', gorsel: 'gorsel/hata-bul.webp',
            hatalar: [
              { id: 'telefon', x: 170, y: 370, r: 130, ad: 'Sofrada telefona bakmak', aciklama: 'Sofrada telefon değil, sohbet olur; nimete ve sofradakilere dikkat ederiz.' },
              { id: 'yerde-ekmek', x: 700, y: 800, r: 105, ad: 'Yerde kalan ekmek', aciklama: 'Düşen lokma alınır, temizlenir ve yenir.' },
              { id: 'dolu-tabak', x: 750, y: 440, r: 150, ad: 'Taşan tabak', aciklama: 'Yiyeceğimiz kadar alırız; israf etmeyiz.' },
              { id: 'ayakta', x: 1440, y: 400, r: 170, ad: 'Ayakta su içmek ve açık sürahi', aciklama: 'Oturarak, üç yudumda içeriz; kapların üstünü örteriz.' },
              { id: 'uzanma', x: 1170, y: 340, r: 130, ad: 'Başkasının önünden almak', aciklama: 'Kendi önümüzden yeriz; uzanıp başkasının önünden almayız.' }
            ],
            not: 'İpucu düğmesi bir bölgeyi parlatır (o hata 5 puan). Öğrenci bulduğu her hatanın doğrusunu sesli söylesin.'
          },
          {
            id: 's-hamd', tur: 'slayt', gorsel: 'slayt/y18.webp',
            metin: 'Yemekten sonra “Elhamdülillah” der, dua ederiz. Allahü teâlâ, kulunun bir lokma yiyip bir yudum içip kendisine hamd etmesinden razı olur. (Müslim)',
            not: 'Yemek duasını birlikte okuyun; öğrencinin evde okuduğu duayı sorun.'
          },
          {
            id: 's-dis', tur: 'slayt', gorsel: 'slayt/y14.webp',
            metin: 'Yemekten sonra ellerimizi yıkar, ağzımızı çalkalar, dişlerimizi misvak ya da fırçayla temizleriz.'
          },
          {
            id: 's-dis-yer', tur: 'slayt', gorsel: 'slayt/a08-04.webp',
            metin: 'Diş temizliğini sofrada değil, kimseyi rahatsız etmeden uygun bir yerde yaparız.'
          },
          {
            id: 's-tesekkur', tur: 'slayt', gorsel: 'slayt/a08-05.webp',
            metin: 'Misafirlikte yemekten sonra ev sahibine teşekkür eder, “Allahü teâlâ bereket versin” diye dua ederiz.'
          },
          {
            id: 'dogru-mu', tur: 'dogruYanlis', baslik: 'Doğru mu, yanlış mı?',
            ifadeler: [
              { id: 'dy-besmele', metin: 'Yemeğe başlarken besmele çekeriz.', dogru: true, gorsel: 'slayt/y01.webp', aciklama: 'Besmele ile başlanan sofraya bereket gelir.' },
              { id: 'dy-her-yer', metin: 'Ortak tabakta istediğimiz yerden yeriz.', dogru: false, gorsel: 'slayt/y06.webp', aciklama: 'Kendi önümüzden yeriz.' },
              { id: 'dy-uc-yudum', metin: 'Suyu üç yudumda, nefesimizi bardağın dışına vererek içeriz.', dogru: true, gorsel: 'slayt/y17.webp', aciklama: 'Peygamber Efendimiz (sallallahü aleyhi ve sellem) böyle içerdi.' },
              { id: 'dy-ayipla', metin: 'Sevmediğimiz yemeği ayıplayabiliriz.', dogru: false, gorsel: 'slayt/y08.webp', aciklama: 'Yemek ayıplanmaz; istemezsek yemeyiz.' },
              { id: 'dy-buyuk', metin: 'Büyüklerimiz başlamadan yemeğe başlamayız.', dogru: true, gorsel: 'slayt/y11.webp', aciklama: 'Büyüklere öncelik edebdir.' },
              { id: 'dy-acik', metin: 'Gece yemeklerin üstünü açık bırakmak önemli değildir.', dogru: false, gorsel: 'slayt/y16.webp', aciklama: 'Kapların üstü örtülür.' },
              { id: 'dy-dis', metin: 'Yemekten sonra ellerimizi yıkar, dişlerimizi temizleriz.', dogru: true, gorsel: 'slayt/y14.webp', aciklama: 'Temizlikle başlar, temizlikle bitiririz.' },
              { id: 'dy-sofrada-dis', metin: 'Dişlerimizi sofrada, herkesin önünde temizleriz.', dogru: false, gorsel: 'slayt/a08-04.webp', aciklama: 'Kimseyi rahatsız etmeden uygun yerde temizleriz.' }
            ],
            not: 'Kartı kaydırmak çocuklara keyifli gelir; düğmelerle de cevaplanabilir.'
          },
          {
            id: 'iki-kutu', tur: 'siniflandir', baslik: 'Sofrada mı, yapmayalım mı?',
            yonerge: 'Resimli kartları doğru kutuya taşı ya da karta dokunup kutuya dokun.',
            alanlar: [
              { id: 'guzel', ad: 'Sofra edebi', aciklama: 'Böyle yaparız', ikon: 'yildiz', renk: '#4f7a3a' },
              { id: 'kacin', ad: 'Yapmayalım', aciklama: 'Bundan kaçınırız', ikon: 'uyari', renk: '#c0392b' }
            ],
            kartlar: [
              { id: 'k1', metin: 'Ellerini yıkamak', gorsel: I(1), alan: 'guzel' },
              { id: 'k2', metin: 'Kabın üstünü örtmek', gorsel: I(5), alan: 'guzel' },
              { id: 'k3', metin: 'Tabağı temiz bırakmak', gorsel: I(7), alan: 'guzel' },
              { id: 'k4', metin: 'Yemekten sonra dua', gorsel: I(9), alan: 'guzel' },
              { id: 'k5', metin: 'Ekmeği çöpe atmak', gorsel: K(2), alan: 'kacin', ipucu: 'Ekmek nimettir.' },
              { id: 'k6', metin: 'Sofrada telefon', gorsel: K(4), alan: 'kacin', ipucu: 'Sofrada sohbet mi, ekran mı?' },
              { id: 'k7', metin: 'Yürürken yemek', gorsel: K(6), alan: 'kacin', ipucu: 'Nerede ve nasıl yeriz?' },
              { id: 'k8', metin: 'Kırıntıları saçmak', gorsel: K(9), alan: 'kacin', ipucu: 'Temizliğe dikkat!' }
            ],
            not: 'Her kartta “Neden?” diye sorun.'
          },
          {
            id: 'hikaye-3', tur: 'hikaye', baslik: 'Sofradan kalkarken', rozet: '📖 Hikâye · son bölüm',
            sahneler: [
              {
                id: 'dua', gorsel: 'gorsel/hikaye-5.webp',
                metin: 'Herkes doymuştu. Dedesi ellerini açtı; Zeynep de, Yusuf da ellerini açtı.',
                soru: 'Sofradan kalkmadan önce ne yapılır?',
                secenekler: [
                  { metin: 'Allahü teâlâya hamd eder, dua ederiz', iyi: true, sonuc: 'Hep birlikte “Elhamdülillah” dediler. Dedesi yemek duasını okudu, herkes “Âmin” dedi.' },
                  { metin: 'Hemen kalkıp oyuna koşarız', sonuc: 'Acele etmeyelim; nimeti veren Allahü teâlâya önce şükredelim.' },
                  { metin: 'Bir şey demeden kalkarız', sonuc: 'Sofradan şükürsüz kalkılmaz; “Elhamdülillah” demek ne güzeldir.' }
                ]
              },
              {
                id: 'kuslar', gorsel: 'gorsel/bitis.webp',
                metin: 'Yusuf ile Zeynep sofrayı topladı. Kırıntıları da pencerenin önündeki serçelere ayırdılar. Dedesi gülümsedi: “İşte bereketli sofra böyle olur.”',
                soru: 'Sofra toplanırken sen ne yaparsın?',
                secenekler: [
                  { metin: 'Tabakları taşır, kırıntıları toplarım', iyi: true, sonuc: 'Sofrayı toplamaya yardım etmek hem anneye hem nimete hürmettir.' },
                  { metin: 'Hemen kalkıp giderim', sonuc: 'Sofrayı kuranlara yardım etmek güzel bir edebdir.' },
                  { metin: 'Kırıntıları yere silkerim', sonuc: 'Kırıntılar yere değil, kuşlara ya da uygun bir yere.' }
                ]
              }
            ],
            sonBaslik: 'Hikâye bitti!',
            sonMetin: 'Yusuf’un sofrası temizlikle başladı, şükürle bitti. Bereketli olsun!',
            not: 'Öğrenciye hikâyeyi kendi cümleleriyle özetletin: Yusuf hangi edepleri yaptı?'
          },
          { id: 'sofra-3', tur: 'sofra' }
        ]
      },

      /* ------------------------------------------------------------ */
      {
        id: 'tekrar', ad: 'Tekrar', renk: '#7a4fa3',
        bloklar: [
          { id: 'b-tekrar', tur: 'bolum', numara: 'Son durak', baslik: 'Bereket yarışması', alt: 'Hafıza ve hız', ikon: 'yildiz', renk: '#7a4fa3' },
          {
            id: 'hafiza', tur: 'hafiza', baslik: 'Resimli hafıza',
            yonerge: 'Kartları çevir; resmi, anlatan sözle eşleştir.',
            ciftler: [
              { id: 'h1', a: 'El yıkama', aGorsel: I(1), b: 'Yemekten önce ve sonra', renk: '#4fa3d1' },
              { id: 'h2', a: 'Sağ el', aGorsel: I(2), b: 'Sağ elle yer, sağ elle içeriz', renk: '#4f7a3a' },
              { id: 'h3', a: 'Küçük lokma', aGorsel: I(3), b: 'Küçük al, iyi çiğne', renk: '#e8962e' },
              { id: 'h4', a: 'Üç yudum', aGorsel: I(4), b: 'Nefesi bardağın dışına ver', renk: '#2a9d8f' },
              { id: 'h5', a: 'Örtülü kap', aGorsel: I(5), b: 'Kapların üstü örtülür', renk: '#b388eb' },
              { id: 'h6', a: 'Şükür', aGorsel: I(9), b: '“Elhamdülillah”', renk: '#e76f51' }
            ],
            not: 'Birlikte modunda öğrenciler sırayla kart çevirir.'
          },
          {
            id: 'hiz-turu', tur: 'hizTuru', baslik: 'Sofra hız turu', sure: 10,
            sorular: [
              { metin: 'Yemeğe ne ile başlarız?', secenekler: ['Besmele', 'Tatlı', 'Su'], dogru: 0 },
              { metin: 'Hangi elle yeriz?', secenekler: ['Sol', 'Sağ', 'İkisi de'], dogru: 1 },
              { metin: 'Ortak tabaktan nereden yeriz?', secenekler: ['Ortasından', 'Önümüzden', 'Karşıdan'], dogru: 1 },
              { metin: 'Suyu kaç yudumda içeriz?', secenekler: ['Bir', 'Üç', 'On'], dogru: 1 },
              { metin: 'Yere düşen ekmeği ne yaparız?', secenekler: ['Temizleyip yeriz', 'Çiğneriz', 'Çöpe atarız'], dogru: 0 },
              { metin: 'Yemekten sonra ne deriz?', secenekler: ['Elhamdülillah', 'Hiçbir şey', 'Doymadım'], dogru: 0 },
              { metin: 'Yemeğe ilk kim başlar?', secenekler: ['En küçük', 'Büyüklerimiz', 'En hızlı'], dogru: 1 },
              { metin: 'Gece kapların üstü…', secenekler: ['Örtülür', 'Açık kalır', 'Fark etmez'], dogru: 0 }
            ],
            not: 'Canlı derste hız turunu siz başlatırsınız; herkes aynı anda başlar, sıralama canlı görünür.'
          },
          {
            id: 'niyet', tur: 'dusun', baslik: 'Benim sofra niyetim',
            sorular: [
              { soru: 'Bu hafta sofrada hangi edebi hiç unutmayacağım?', secenekler: ['Besmele çekmek', 'Sağ elle yemek', 'Önümden yemek', 'Büyüklerimi beklemek', 'Elhamdülillah demek'] },
              { soru: 'Evde sofra için hangi yardımı yapacağım?', secenekler: ['Sofrayı kurmaya yardım', 'Sofrayı toplamak', 'Kırıntıları kuşlara ayırmak', 'Su dağıtmak'] }
            ],
            ipucu: 'İstersen kendi cümleni yaz: “Ben bu hafta sofrada…”',
            tesekkur: 'Niyetin kaydedildi. Allahü teâlâ sofrana bereket versin.',
            not: 'Bir sonraki derste niyetini sorun. Rapor ekranında bu cevaplar görünür.'
          },
          { id: 'sofra-son', tur: 'sofra', ust: 'Bereket sofrası', not: 'Dersin ödül ekranı. Bütün tabaklar geldiyse tebrik edin.' },
          {
            id: 'son', tur: 'kapanis', baslik: 'Ders tamamlandı',
            maddeler: [
              { baslik: 'Önce', metin: 'temizlik ve sabır', ikon: 'el', renk: '#4f7a3a' },
              { baslik: 'Sofrada', metin: 'besmele, sağ el, önünden', ikon: 'yildiz', renk: '#e8962e' },
              { baslik: 'Sonra', metin: 'şükür ve temizlik', ikon: 'kalp', renk: '#2a9d8f' }
            ],
            dua: 'Elhamdülillah. Allahü teâlâ sofralarımızı bereketli, bizi şükreden kullarından eylesin.'
          }
        ]
      }
    ]
  });
})();
