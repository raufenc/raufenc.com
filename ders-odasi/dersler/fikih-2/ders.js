/* FIKIH-2 · Sünnet, Mekruh, Müfsid — tam etkileşimli ders
   Kaynak: Drive "FIKIH-2" klasöründeki 22 slayt, anlatıcı seslendirmesi (anlatıcı.mp3)
   ve ders videosu (export.mp4). Metinler seslendirmenin kendisinden alınmıştır;
   oyunlar yalnızca bu kaynakta geçen bilgileri kullanır. */
DO.dersKaydet({
  id: 'fikih-2',
  ad: 'Sünnet, Mekruh, Müfsid',
  kisaAd: 'Fıkıh 2',
  seri: 'Fıkıh Dersleri',
  ozet: 'İbadeti güzelleştiren, zayıflatan ve bozan şeyleri tanıyoruz. Slaytlar, video, sekiz oyun ve sesli anlatımla yaklaşık 35-40 dakika.',
  yas: '10-15 yaş',
  sure: 40,
  kapakGorseli: 'slayt/02.webp',
  basariEsigi: 0.6,
  kaynak: 'Drive / FIKIH-2 (22 slayt, 3:51 anlatım, ders videosu, LMS etkinlik taslakları)',
  bolumler: [

    /* ------------------------------------------------------------ */
    {
      id: 'acilis', ad: 'Açılış', renk: '#2f4a6b',
      bloklar: [
        {
          id: 'kapak', tur: 'kapak',
          ust: 'Fıkıh Dersleri · 2',
          baslik: 'Sünnet · Mekruh · Müfsid',
          alt: 'İbadeti güzelleştiren, zayıflatan ve bozan şeyler',
          kartlar: [
            { ad: 'Sünnet', renk: '#4f7a3a', ikon: 'yildiz' },
            { ad: 'Mekruh', renk: '#e8962e', ikon: 'uyari' },
            { ad: 'Müfsid', renk: '#c0392b', ikon: 'kirik' }
          ],
          not: 'Derse besmele ile başlayın. Öğrencinin adını ve hâlini sorun; bir önceki dersin (farz, vacip, haram) üç kartını kısaca hatırlatın.'
        },
        {
          id: 'isinma', tur: 'anket', baslik: 'Isınma sorusu',
          soru: 'Sence bir ibadeti “zayıflatmak” ile “bozmak” aynı şey mi?',
          secenekler: ['Aynı şey', 'Farklı şeyler', 'Emin değilim'],
          ogrenciNotu: 'Bu soruya dersin sonunda yeniden döneceğiz.',
          not: 'Doğru cevabı şimdi söylemeyin. Dersin sonunda aynı soruyu tekrar sorun: Mekruh zayıflatır, müfsid bozar.'
        },
        {
          id: 'giris-video', tur: 'video', baslik: 'Üç yeni hüküm kartı',
          video: 'video/giris.mp4', videoWebm: 'video/giris.webm', poster: 'video/giris.jpg',
          altyazilar: [
            { bas: 0, son: 3.6, metin: 'Bir ibadeti öğrenirken sadece adını bilmek yetmez.' },
            { bas: 3.6, son: 9.1, metin: 'Onu güzelleştiren, zayıflatan ve bozan şeyleri de tanımak gerekir.' },
            { bas: 9.1, son: 12.4, metin: 'Bugün üç yeni hüküm kartını tanıyacağız:' },
            { bas: 12.4, son: 15.3, metin: 'Sünnet, mekruh ve müfsid.' },
            { bas: 15.3, son: 16.8, metin: 'Kısa harita şudur:' },
            { bas: 16.8, son: 19.2, metin: 'Sünnet ibadeti güzelleştirir.' },
            { bas: 19.2, son: 24.2, metin: 'Mekruh sevaba zarar veren, kaçınılması gereken davranıştır.' },
            { bas: 24.2, son: 28.1, metin: 'Müfsid ise başlanmış ibadeti bozan şeydir.' }
          ],
          duraklar: [
            {
              zaman: 9.2,
              soru: {
                metin: 'Bir ibadeti öğrenirken sadece adını bilmek yeter mi?',
                secenekler: ['Hayır; onu güzelleştiren, zayıflatan ve bozan şeyleri de tanımak gerekir', 'Evet, adını bilmek yeterlidir'],
                dogru: 0,
                aciklama: 'İbadetin adını bilmek ilk adımdır; onu nasıl koruyacağımızı da öğrenmemiz gerekir.'
              }
            },
            {
              zaman: 'son',
              soru: {
                metin: 'Bugün hangi üç hüküm kartını tanıyacağız?',
                secenekler: ['Sünnet, mekruh, müfsid', 'Farz, vacip, haram', 'Abdest, namaz, oruç'],
                dogru: 0,
                aciklama: 'Farz, vacip ve haramı önceki derste tanımıştık. Bugünün kartları: sünnet, mekruh ve müfsid.'
              }
            }
          ],
          not: 'Video iki yerde durup soru soruyor. Canlı derste videoyu siz başlatın; öğrencilerin ekranı sizi takip eder.'
        },
        {
          id: 'uc-kart', tur: 'kartlar', baslik: 'Üç kartı tanı',
          yonerge: 'Her kartı çevir; arkasındaki kısa haritayı oku.',
          kartlar: [
            { on: 'Sünnet', arka: 'İbadeti güzelleştirir.', not: 'Kısa not: güzel yol', renk: '#4f7a3a', gorsel: 'ikon/icon-sunnet.png' },
            { on: 'Mekruh', arka: 'Sevaba zarar veren, kaçınılması gereken davranıştır.', not: 'Kısa not: dikkat et ve kaçın', renk: '#e8962e', gorsel: 'ikon/icon-mekruh.png' },
            { on: 'Müfsid', arka: 'Başlanmış ibadeti bozan şeydir.', not: 'Kısa not: tanı', renk: '#c0392b', gorsel: 'ikon/icon-mufsid.png' }
          ],
          not: 'Öğrenciye her kartı kendi cümlesiyle anlattırın: “Güzelleştirir – zayıflatır – bozar.”'
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'sunnet', ad: 'Sünnet', renk: '#4f7a3a',
      bloklar: [
        { id: 'b-sunnet', tur: 'bolum', numara: '1. kart', baslik: 'Sünnet', alt: 'Güzel yol', ikon: 'yildiz', renk: '#4f7a3a' },
        {
          id: 's04', tur: 'slayt', gorsel: 'slayt/04.webp', ses: 'ses/04.mp3',
          metin: 'Sünnet; Allahü teâlânın açıkça farz olarak bildirmediği, Peygamber Efendimizin (sallallahü aleyhi ve sellem) övdüğü, yaptığı veya yapılırken görüp mâni olmadığı güzel yoldur.',
          not: 'Tanımdaki üç fiili ayırın: övdüğü · yaptığı · yapılırken görüp mâni olmadığı. Sorun: “Bir sünnet örneği biliyor musun?”'
        },
        {
          id: 's05', tur: 'slayt', gorsel: 'slayt/05.webp', ses: 'ses/05.mp3',
          metin: 'Sünnet önemsiz demek değildir. Sünneti sevmek ve önemsemek gerekir. Sünnet ibadeti güzelleştirir ve sevabını artırır.',
          not: 'Slayttaki gösterge: “önemse” deyince ibre güzelleştirir tarafına kayıyor.'
        },
        {
          id: 'sunnet-dy', tur: 'dogruYanlis', baslik: 'Doğru mu, yanlış mı?',
          ifadeler: [
            { id: 'onemsiz', metin: 'Sünnet önemsiz bir ayrıntıdır.', dogru: false, aciklama: 'Sünnet önemsiz demek değildir. Sünneti sevmek ve önemsemek gerekir.' },
            { id: 'guzellestirir', metin: 'Sünnet ibadeti güzelleştirir ve sevabını artırır.', dogru: true, aciklama: 'Evet. Sünnet ibadeti güzelleştirir ve sevabını artırır.' },
            { id: 'farz-bildirilen', metin: 'Sünnet, Allahü teâlânın açıkça farz olarak bildirdiği şeydir.', dogru: false, aciklama: 'Sünnet, Allahü teâlânın açıkça farz olarak bildirmediği güzel yoldur.' },
            { id: 'mani-olmadigi', metin: 'Peygamber Efendimizin (sallallahü aleyhi ve sellem) yapılırken görüp mâni olmadığı güzel yol da sünnettir.', dogru: true, aciklama: 'Evet. Övdüğü, yaptığı veya yapılırken görüp mâni olmadığı güzel yol sünnettir.' }
          ]
        },
        {
          id: 's06', tur: 'slayt', gorsel: 'slayt/06.webp', ses: 'ses/06.mp3',
          metin: 'Besmele çekmek, ezan okumak, ikâmet getirmek, cemaatle namaz kılmak ve misvak kullanmak sünnet örneklerindendir.',
          vurgular: [
            { id: 'besmele', x: 660, y: 245, r: 135, etiket: 'Besmele çekmek' },
            { id: 'ezan', x: 1015, y: 245, r: 135, etiket: 'Ezan okumak' },
            { id: 'ikamet', x: 1370, y: 245, r: 135, etiket: 'İkâmet getirmek' },
            { id: 'cemaat', x: 825, y: 625, r: 135, etiket: 'Cemaatle namaz kılmak' },
            { id: 'misvak', x: 1185, y: 625, r: 135, etiket: 'Misvak kullanmak' }
          ],
          not: 'Öğrenci daireye dokundukça adı çıkıyor. Her örnekte “Sen bunu ne zaman yapıyorsun?” diye sorun.'
        },
        {
          id: 's07', tur: 'slayt', gorsel: 'slayt/07.webp', ses: 'ses/07.mp3',
          metin: 'Sünnet-i müekkede, Peygamber Efendimizin (sallallahü aleyhi ve sellem) devamlı yaptığı, pek az terk ettiği kuvvetli sünnettir. Sünnet-i gayr-i müekkede ise ibadet maksadıyla ara sıra yaptığı sünnetlerdir.',
          not: 'Slayttaki iki sütun: müekkede (yükselen grafik, devamlı) · gayr-i müekkede (ara sıra).'
        },
        {
          id: 's08', tur: 'slayt', gorsel: 'slayt/08.webp', ses: 'ses/08.mp3',
          metin: 'Namazda Sübhâneke okumak, besmele okumak, rükû ve secdede tesbih söylemek, son oturuşta salavât dualarını okumak ve selâm verirken iki yana bakmak sünnetler arasında anlatılır.',
          vurgular: [
            { id: 'subhaneke', x: 230, y: 400, r: 95, etiket: 'Sübhâneke okumak' },
            { id: 'besmele-namaz', x: 445, y: 400, r: 95, etiket: 'Besmele okumak' },
            { id: 'tesbih', x: 660, y: 400, r: 95, etiket: 'Rükû ve secdede tesbih' },
            { id: 'salavat', x: 865, y: 400, r: 95, etiket: 'Son oturuşta salavât duaları' },
            { id: 'selam', x: 1070, y: 400, r: 95, etiket: 'Selâm verirken iki yana bakmak' }
          ]
        },
        {
          id: 's09', tur: 'slayt', gorsel: 'slayt/09.webp', ses: 'ses/09.mp3',
          metin: 'Sünnet kartını görünce zihindeki kısa not: Peygamber Efendimizin (sallallahü aleyhi ve sellem) bildirdiği güzel yol.'
        },
        {
          id: 'sunnet-yolu', tur: 'yol', baslik: 'Sünnet Yolu', rozet: 'Yol oyunu',
          yonerge: 'Her doğru cevapta güzel yolda bir taş ilerlersin.',
          hedef: 'SÜNNET', hedefAlt: 'GÜZEL YOL',
          sonBaslik: 'Güzel yolun sonuna ulaştın!',
          sonMetin: 'Sünnet, Peygamber Efendimizin (sallallahü aleyhi ve sellem) bildirdiği güzel yoldur.',
          adimlar: [
            { id: 'kisa-not', soru: 'Sünnet kartını görünce zihindeki kısa not ne olmalı?', secenekler: ['Peygamber Efendimizin (sallallahü aleyhi ve sellem) bildirdiği güzel yol', 'İbadeti bozan durum', 'Önemsiz bir ayrıntı'], dogru: 0, aciklama: 'Sünnet güzel yoldur; önemsiz demek değildir.' },
            { id: 'kazanc', soru: 'Sünnet ibadete ne kazandırır?', secenekler: ['İbadeti güzelleştirir ve sevabını artırır', 'İbadeti bozar', 'Sevaba zarar verir'], dogru: 0, aciklama: 'Doğru. Sünnet ibadeti güzelleştirir.' },
            { id: 'ornek', soru: 'Hangisi sünnet örneklerindendir?', secenekler: ['Besmele çekmek ve misvak kullanmak', 'Namazda faydasız hareket yapmak', 'Oruçluyken bilerek içmek'], dogru: 0, aciklama: 'Besmele çekmek ve misvak kullanmak sünnet örneklerindendir.' },
            { id: 'muekkede', soru: 'Sünnet-i müekkede nasıl anlatılır?', secenekler: ['Devamlı yapılan, pek az terk edilen kuvvetli sünnet', 'Ara sıra yapılan sünnet', 'Harama yakın mekruh'], dogru: 0, aciklama: 'Müekkede, devamlı yapılan ve pek az terk edilen kuvvetli sünnettir.' },
            { id: 'gayri-muekkede', soru: 'İbadet maksadıyla ara sıra yapılan sünnetlere ne denir?', secenekler: ['Sünnet-i gayr-i müekkede', 'Sünnet-i müekkede', 'Müfsid'], dogru: 0, aciklama: 'Ara sıra yapılan sünnetler gayr-i müekkededir.' },
            { id: 'namaz-sunneti', soru: 'Hangisi namazın sünnetleri arasında anlatılır?', secenekler: ['Rükû ve secdede tesbih söylemek', 'Etrafa bakmak', 'Namazda gülmek'], dogru: 0, aciklama: 'Rükû ve secdede tesbih söylemek namazın sünnetlerindendir.' }
          ],
          not: 'Yanlış cevapta yolcu ilerlemez, tekrar dener; puan yalnız ilk denemede verilir.'
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'mekruh', ad: 'Mekruh', renk: '#e8962e',
      bloklar: [
        { id: 'b-mekruh', tur: 'bolum', numara: '2. kart', baslik: 'Mekruh', alt: 'Dikkat et ve kaçın', ikon: 'uyari', renk: '#d9822b' },
        {
          id: 's10', tur: 'slayt', gorsel: 'slayt/10.webp', ses: 'ses/10.mp3',
          metin: 'Mekruh; Allahü teâlânın ve Peygamber Efendimizin (sallallahü aleyhi ve sellem) beğenmediği, ibadetin sevabına zarar veren davranıştır.',
          not: 'Slayttaki gösterge düşüyor: mekruh sevabı azaltır. Henüz “bozar” demiyoruz; o müfsidin işi.'
        },
        {
          id: 's11', tur: 'slayt', gorsel: 'slayt/11.webp', ses: 'ses/11.mp3',
          metin: 'Mekruh, haramla aynı kelime değildir; fakat önemsiz de değildir. Mekruh olan şeylerden kaçınmak gerekir.'
        },
        {
          id: 'mekruh-dy', tur: 'dogruYanlis', baslik: 'Mekruhu doğru tanıyalım',
          ifadeler: [
            { id: 'haramla-ayni', metin: 'Mekruh, haramla aynı kelimedir.', dogru: false, aciklama: 'Mekruh, haramla aynı kelime değildir.' },
            { id: 'onemsiz', metin: 'Mekruh önemsizdir, yapılsa da olur.', dogru: false, aciklama: 'Mekruh önemsiz değildir; ondan kaçınmak gerekir.' },
            { id: 'kacin', metin: 'Mekruh olan şeylerden kaçınmak gerekir.', dogru: true, aciklama: 'Evet. Kısa not: dikkat et ve kaçın.' },
            { id: 'sevap', metin: 'Mekruh, ibadetin sevabına zarar verir.', dogru: true, aciklama: 'Evet. Mekruh sevaba zarar veren davranıştır.' }
          ]
        },
        {
          id: 's12', tur: 'slayt', gorsel: 'slayt/12.webp', ses: 'ses/12.mp3',
          metin: 'Mekruh iki çeşittir. Tahrîmen mekruh, harama yakın olan ve çok ciddi kaçınılması gereken mekruhtur. Tenzîhen mekruh ise yapılmaması yapılmasından daha iyi olan davranıştır.'
        },
        {
          id: 's13', tur: 'slayt', gorsel: 'slayt/13.webp', ses: 'ses/13.mp3',
          metin: 'Vacibi terk etmek, tahrîmen mekruh başlığında anlatılır. Bu yüzden vacip hafife alınmaz; terk edilirse ibadet ciddiyetle yeniden değerlendirilir.',
          not: 'Önceki dersteki vacip kartıyla bağ kurun (vitir, bayram namazı…).'
        },
        {
          id: 's14', tur: 'slayt', gorsel: 'slayt/14.webp', ses: 'ses/14.mp3',
          metin: 'Tenzîhen mekruh, helâle yakın olmakla birlikte yapılmaması daha iyi olan davranıştır. Gayr-i müekkede sünnetleri veya müstehapları yapmamak bu başlıkta örnek verilir.'
        },
        {
          id: 'mekruh-cesit', tur: 'siniflandir', baslik: 'Tahrîmen mi, tenzîhen mi?',
          yonerge: 'Her kartı ait olduğu mekruh çeşidine sürükle (ya da karta, sonra kutuya dokun).',
          alanlar: [
            { id: 'tahrimen', ad: 'Tahrîmen mekruh', aciklama: 'Harama yakın, çok ciddi kaçınılır', renk: '#c0532b', ikon: 'uyari' },
            { id: 'tenzihen', ad: 'Tenzîhen mekruh', aciklama: 'Yapılmaması daha iyi', renk: '#d9a53b', ikon: 'uyari' }
          ],
          kartlar: [
            { id: 'harama-yakin', metin: 'Harama yakın olan', alan: 'tahrimen' },
            { id: 'ciddi', metin: 'Çok ciddi kaçınılması gereken', alan: 'tahrimen' },
            { id: 'vacip-terk', metin: 'Vacibi terk etmek', alan: 'tahrimen', aciklama: 'Vacibi terk etmek tahrîmen mekruh başlığında anlatılır.' },
            { id: 'daha-iyi', metin: 'Yapılmaması yapılmasından daha iyi olan', alan: 'tenzihen' },
            { id: 'helale-yakin', metin: 'Helâle yakın olmakla birlikte yapılmaması daha iyi olan', alan: 'tenzihen' },
            { id: 'gayri-muekkede', metin: 'Gayr-i müekkede sünnetleri yapmamak', alan: 'tenzihen', aciklama: 'Gayr-i müekkede sünnetleri veya müstehapları yapmamak tenzîhen mekruha örnek verilir.' }
          ]
        },
        {
          id: 's15', tur: 'slayt', gorsel: 'slayt/15.webp', ses: 'ses/15.mp3',
          metin: 'Namazda faydasız hareketler yapmak, parmakları çıtlatmak, etrafa bakmak, gözleri yummak ve huşûyu bozan şeyler yanında kılmak mekruhlar arasında anlatılır.',
          vurgular: [
            { id: 'hareket', x: 405, y: 320, r: 110, etiket: 'Faydasız hareketler yapmak' },
            { id: 'parmak', x: 660, y: 320, r: 110, etiket: 'Parmakları çıtlatmak' },
            { id: 'bakmak', x: 920, y: 320, r: 110, etiket: 'Etrafa bakmak' },
            { id: 'yummak', x: 1180, y: 320, r: 110, etiket: 'Gözleri yummak' },
            { id: 'husu', x: 1435, y: 320, r: 110, etiket: 'Huşûyu bozan şeyler yanında kılmak' }
          ]
        },
        {
          id: 'husu-gostergesi', tur: 'gosterge', baslik: 'Huşû Göstergesi', rozet: 'Namaz anı',
          yonerge: 'Namazda bu davranış mekruh mu? Doğru karar verdikçe huşû göstergesi yükselir.',
          gosterge: 'Huşû',
          secenekler: [
            { deger: 'mekruh', ad: 'Mekruh — kaçınırım', sinif: 'kacin', ikon: '✋' },
            { deger: 'sunnet', ad: 'Sünnet — güzel yol', sinif: 'guzel', ikon: '✦' }
          ],
          durumlar: [
            { id: 'hareket', metin: 'Namazda faydasız hareketler yapmak', cevap: 'mekruh', aciklama: 'Faydasız hareketler mekruhlar arasında anlatılır.' },
            { id: 'parmak', metin: 'Parmakları çıtlatmak', cevap: 'mekruh', aciklama: 'Namazda parmakları çıtlatmak mekruhtur.' },
            { id: 'etrafa', metin: 'Etrafa bakmak', cevap: 'mekruh', aciklama: 'Etrafa bakmak huşûyu zayıflatır; mekruhtur.' },
            { id: 'selam-iki-yana', metin: 'Selâm verirken iki yana bakmak', cevap: 'sunnet', aciklama: 'Dikkat! Etrafa bakmak mekruh; ama selâm verirken iki yana bakmak sünnettir.' },
            { id: 'gozleri-yummak', metin: 'Gözleri yummak', cevap: 'mekruh', aciklama: 'Namazda gözleri yummak mekruhlar arasında sayılır.' },
            { id: 'tesbih', metin: 'Rükû ve secdede tesbih söylemek', cevap: 'sunnet', aciklama: 'Rükû ve secdede tesbih söylemek sünnettir.' },
            { id: 'husu-bozan', metin: 'Huşûyu bozan şeyler yanında kılmak', cevap: 'mekruh', aciklama: 'Dikkati dağıttığı için mekruhlar arasında anlatılır.' },
            { id: 'subhaneke', metin: 'Sübhâneke okumak', cevap: 'sunnet', aciklama: 'Sübhâneke okumak namazın sünnetlerindendir.' }
          ],
          sonMetin: 'Namazda mekruhlardan kaçınmak huşûyu korur.',
          not: 'Kritik ayrım: “etrafa bakmak” (mekruh) ile “selâm verirken iki yana bakmak” (sünnet). Öğrenci karıştırırsa durup konuşun.'
        },
        {
          id: 's16', tur: 'slayt', gorsel: 'slayt/16.webp', ses: 'ses/16.mp3',
          metin: 'Mekruh kartını görünce zihindeki kısa not: Beğenilmeyen davranış; dikkat et ve kaçın.'
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'mufsid', ad: 'Müfsid', renk: '#c0392b',
      bloklar: [
        { id: 'b-mufsid', tur: 'bolum', numara: '3. kart', baslik: 'Müfsid', alt: 'Tanı: ibadeti bozar', ikon: 'kirik', renk: '#c0392b' },
        {
          id: 'mufsid-video', tur: 'video', baslik: 'Müfsid: ibadeti bozan şey',
          video: 'video/mufsid.mp4', videoWebm: 'video/mufsid.webm', poster: 'video/mufsid.jpg',
          altyazilar: [
            { bas: 0, son: 6.0, metin: 'Müfsid, dinimizde meşru olan bir işi veya başlanmış bir ibadeti bozan şeydir.' },
            { bas: 6.0, son: 10.0, metin: 'Müfsid, sadece sevabı azaltan bir uyarı değildir.' },
            { bas: 10.0, son: 15.4, metin: 'İbadetin kendisini bozan durumdur; bu yüzden müfsid iyi tanınmalıdır.' },
            { bas: 15.6, son: 19.6, metin: 'Namazda gülmek, namazı ve abdesti bozan örneklerdendir.' },
            { bas: 19.6, son: 23.7, metin: 'Oruçluyken bilerek yemek veya içmek de orucu bozar.' }
          ],
          duraklar: [
            {
              zaman: 15.4,
              soru: {
                metin: 'Müfsid, sadece sevabı azaltan bir uyarı mıdır?',
                secenekler: ['Hayır; ibadetin kendisini bozan durumdur', 'Evet; sadece sevabı biraz azaltır', 'Hayır; ibadeti güzelleştirir'],
                dogru: 0,
                aciklama: 'Sevaba zarar veren mekruhtur. Müfsid ise ibadetin kendisini bozar.'
              }
            },
            {
              zaman: 'son',
              soru: {
                metin: 'Oruçluyken bilerek yemek veya içmek oruca ne yapar?',
                secenekler: ['Orucu bozar', 'Orucu güzelleştirir', 'Sadece mekruhtur'],
                dogru: 0,
                aciklama: 'Oruçluyken bilerek yemek veya içmek orucu bozar; bu bir müfsiddir.'
              }
            }
          ]
        },
        {
          id: 'mufsid-kilidi', tur: 'kilit', baslik: 'Müfsid Kilidi', rozet: 'Karar kilidi',
          yonerge: 'Her durumda ibadete ne olduğunu seç. Doğru kararlar kilidin dişlerini açar.',
          secenekler: [
            { id: 'sunnet', ad: 'Güzelleştirir', alt: 'Sünnet', renk: '#4f7a3a' },
            { id: 'mekruh', ad: 'Zarar verir, kaçın', alt: 'Mekruh', renk: '#d9822b' },
            { id: 'mufsid', ad: 'Bozar', alt: 'Müfsid', renk: '#c0392b' }
          ],
          durumlar: [
            { id: 'besmele', metin: 'Besmele çekmek', cevap: 'sunnet', aciklama: 'Besmele çekmek sünnet örneklerindendir; ibadeti güzelleştirir.' },
            { id: 'faydasiz', metin: 'Namazda faydasız hareket yapmak', cevap: 'mekruh', aciklama: 'Mekruhlar arasında anlatılır; kaçınılması gerekir.' },
            { id: 'gulmek', metin: 'Namazda gülmek', cevap: 'mufsid', aciklama: 'Namazda gülmek, namazı ve abdesti bozan örneklerdendir.' },
            { id: 'yemek', metin: 'Oruçluyken bilerek yemek', cevap: 'mufsid', aciklama: 'Oruçluyken bilerek yemek orucu bozar.' },
            { id: 'misvak', metin: 'Misvak kullanmak', cevap: 'sunnet', aciklama: 'Misvak kullanmak sünnet örneklerindendir.' },
            { id: 'etrafa', metin: 'Namazda etrafa bakmak', cevap: 'mekruh', aciklama: 'Namazda mekruhlar arasında anlatılır.' }
          ],
          sonBaslik: 'Kilit açıldı!',
          sonMetin: 'Müfsidi iyi tanıyan, ibadetini korur.'
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'tekrar', ad: 'Tekrar', renk: '#7a4fa0',
      bloklar: [
        {
          id: 's20', tur: 'slayt', gorsel: 'slayt/20.webp', ses: 'ses/20.mp3',
          metin: 'Mekruh, ibadetin sevabına zarar veren, kaçınılacak davranıştır. Müfsid ise başlanmış ibadeti bozan şeydir. Bu iki kart birbirine karıştırılmamalıdır.',
          not: 'Isınma sorusunu hatırlatın: “Zayıflatmak ile bozmak aynı mı?” Şimdi cevap net: mekruh zayıflatır, müfsid bozar.'
        },
        {
          id: 'uc-kutu', tur: 'siniflandir', baslik: 'Üç kart, üç kutu',
          yonerge: 'Her davranışı doğru hüküm kartının kutusuna yerleştir.',
          alanlar: [
            { id: 'sunnet', ad: 'Sünnet', aciklama: 'İbadeti güzelleştirir', renk: '#4f7a3a', gorsel: 'ikon/icon-sunnet.png' },
            { id: 'mekruh', ad: 'Mekruh', aciklama: 'Sevaba zarar verir, kaçın', renk: '#d9822b', gorsel: 'ikon/icon-mekruh.png' },
            { id: 'mufsid', ad: 'Müfsid', aciklama: 'Başlanmış ibadeti bozar', renk: '#c0392b', gorsel: 'ikon/icon-mufsid.png' }
          ],
          kartlar: [
            { id: 'besmele', metin: 'Besmele çekmek', alan: 'sunnet' },
            { id: 'ezan', metin: 'Ezan okumak', alan: 'sunnet' },
            { id: 'cemaat', metin: 'Cemaatle namaz kılmak', alan: 'sunnet' },
            { id: 'misvak', metin: 'Misvak kullanmak', alan: 'sunnet' },
            { id: 'parmak', metin: 'Namazda parmakları çıtlatmak', alan: 'mekruh' },
            { id: 'etrafa', metin: 'Namazda etrafa bakmak', alan: 'mekruh' },
            { id: 'yummak', metin: 'Namazda gözleri yummak', alan: 'mekruh' },
            { id: 'gulmek', metin: 'Namazda gülmek', alan: 'mufsid', aciklama: 'Namazı ve abdesti bozan örneklerdendir.' },
            { id: 'icmek', metin: 'Oruçluyken bilerek içmek', alan: 'mufsid' },
            { id: 'yemek', metin: 'Oruçluyken bilerek yemek', alan: 'mufsid' }
          ]
        },
        {
          id: 'hafiza', tur: 'hafiza', baslik: 'Kavram Hafızası',
          ciftler: [
            { id: 'sunnet', a: 'Sünnet', b: 'Güzelleştirir', renk: '#4f7a3a' },
            { id: 'mekruh', a: 'Mekruh', b: 'Sevaba zarar verir', renk: '#d9822b' },
            { id: 'mufsid', a: 'Müfsid', b: 'İbadeti bozar', renk: '#c0392b' },
            { id: 'muekkede', a: 'Müekkede', b: 'Kuvvetli sünnet', renk: '#2f6b4a' },
            { id: 'tahrimen', a: 'Tahrîmen', b: 'Harama yakın', renk: '#a0442a' },
            { id: 'tenzihen', a: 'Tenzîhen', b: 'Yapılmaması daha iyi', renk: '#b9852b' }
          ],
          not: 'Bire üç derste sırayla oynatabilirsiniz: her öğrenci bir çift açar.'
        },
        {
          id: 's21', tur: 'slayt', gorsel: 'slayt/21.webp', ses: 'ses/21.mp3',
          metin: 'Hızlı test: Besmele çekmek sünnettir. Namazda faydasız hareket mekruhtur. Oruçluyken bilerek içmek müfsiddir. Misvak kullanmak sünnettir.'
        },
        {
          id: 'hiz-turu', tur: 'hizTuru', baslik: 'Hızlı Test', sure: 10,
          yonerge: 'Kartı gör, hükmünü hemen seç. Canlı derste sınıfça sıralama çıkar.',
          sorular: [
            { id: 'besmele', metin: 'Besmele çekmek', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 0 },
            { id: 'faydasiz', metin: 'Namazda faydasız hareket', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 1 },
            { id: 'icmek', metin: 'Oruçluyken bilerek içmek', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 2 },
            { id: 'misvak', metin: 'Misvak kullanmak', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 0 },
            { id: 'gulmek', metin: 'Namazda gülmek', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 2 },
            { id: 'ikamet', metin: 'İkâmet getirmek', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 0 },
            { id: 'parmak', metin: 'Namazda parmakları çıtlatmak', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 1 },
            { id: 'salavat', metin: 'Son oturuşta salavât dualarını okumak', secenekler: ['Sünnet', 'Mekruh', 'Müfsid'], dogru: 0 }
          ]
        },
        {
          id: 'son-sinav', tur: 'coktan', baslik: 'Son kontrol', rozet: 'Değerlendirme',
          sorular: [
            { id: 'tanim-sunnet', metin: 'Sünnet nedir?', secenekler: ['Allahü teâlânın açıkça farz olarak bildirmediği, Peygamber Efendimizin (sallallahü aleyhi ve sellem) övdüğü, yaptığı veya görüp mâni olmadığı güzel yol', 'Başlanmış ibadeti bozan şey', 'Harama yakın olan davranış', 'İbadetin sevabına zarar veren davranış'], dogru: 0, aciklama: 'Sünnet, Peygamber Efendimizin (sallallahü aleyhi ve sellem) bildirdiği güzel yoldur.' },
            { id: 'mekruh-haram', metin: 'Mekruh için hangisi doğrudur?', secenekler: ['Haramla aynı kelime değildir ama önemsiz de değildir', 'Haramla tamamen aynıdır', 'Önemsizdir, yapılsa da olur', 'İbadeti her zaman bozar'], dogru: 0, aciklama: 'Mekruh haramla aynı değildir; fakat önemsiz de değildir, kaçınmak gerekir.' },
            { id: 'vacip', metin: 'Vacibi terk etmek hangi başlıkta anlatılır?', secenekler: ['Tahrîmen mekruh', 'Tenzîhen mekruh', 'Sünnet-i müekkede', 'Mubah'], dogru: 0, aciklama: 'Vacibi terk etmek tahrîmen mekruh başlığında anlatılır; bu yüzden vacip hafife alınmaz.' },
            { id: 'fark', metin: 'Mekruh ile müfsid arasındaki fark nedir?', secenekler: ['Mekruh sevaba zarar verir; müfsid ibadeti bozar', 'İkisi de ibadeti güzelleştirir', 'Mekruh bozar; müfsid güzelleştirir', 'Aralarında fark yoktur'], dogru: 0, aciklama: 'Bu iki kart birbirine karıştırılmamalıdır.' },
            { id: 'abdest', metin: 'Hangisi hem namazı hem abdesti bozan örneklerdendir?', secenekler: ['Namazda gülmek', 'Etrafa bakmak', 'Gözleri yummak', 'Selâm verirken iki yana bakmak'], dogru: 0, aciklama: 'Namazda gülmek, namazı ve abdesti bozan örneklerdendir.' }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ */
    {
      id: 'kapanis', ad: 'Kapanış', renk: '#2f4a6b',
      bloklar: [
        {
          id: 's22', tur: 'slayt', gorsel: 'slayt/22.webp', ses: 'ses/22.mp3',
          metin: 'Sünneti önemse, mekruhtan kaçın, müfsidi tanı. Böylece ibadetin sadece adını değil, onu nasıl koruyacağını da öğrenmiş olursun.'
        },
        {
          id: 'niyet', tur: 'dusun', baslik: 'Bu haftaki niyetim',
          sorular: [
            { soru: 'Bu hafta hangi sünneti daha çok önemseyeceğim?', secenekler: ['Besmele çekmek', 'Misvak kullanmak', 'Cemaatle namaz kılmak', 'Rükû ve secdede tesbih', 'Son oturuşta salavât duaları'] },
            { soru: 'Namazda hangi mekruhtan kaçınacağım?', secenekler: ['Faydasız hareket', 'Parmakları çıtlatmak', 'Etrafa bakmak', 'Gözleri yummak', 'Huşûyu bozan şeyler yanında kılmak'] }
          ],
          ipucu: 'İstersen kendi cümleni yaz: “Ben bu hafta…”',
          tesekkur: 'Niyetin kaydedildi. Allahü teâlâ kolaylık versin.',
          not: 'Öğrencinin seçtiği niyeti bir sonraki derste sorun. Rapor ekranında bu cevaplar “Düşünce” satırında görünür.'
        },
        {
          id: 'son', tur: 'kapanis', baslik: 'Ders tamamlandı',
          maddeler: [
            { baslik: 'Önemse', metin: 'sünneti', ikon: 'yildiz', renk: '#4f7a3a' },
            { baslik: 'Kaçın', metin: 'mekruhtan', ikon: 'uyari', renk: '#d9822b' },
            { baslik: 'Tanı', metin: 'müfsidi', ikon: 'buyutec', renk: '#c0392b' }
          ],
          dua: 'Elhamdülillah. Öğrendiklerimizle amel etmeyi Allahü teâlâ nasip etsin.'
        }
      ]
    }
  ]
});
