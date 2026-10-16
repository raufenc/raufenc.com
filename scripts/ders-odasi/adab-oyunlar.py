#!/usr/bin/env python3
"""Âdâb-ı Muâşeret destelerine oyun, altyazı ve kapanış ekler.

ice-aktar.py ile içe aktarılmış ders.js dosyalarını okur; slaytlara altyazı (slaytın kendi
cümlesi), öğretmen notu ve destenin konusuna göre oyunlar ekler. Oyunlar yalnızca slaytta
geçen bilgileri kullanır. Tekrar çalıştırılabilir: her seferinde slaytlardan yeniden kurar.

  python3 scripts/ders-odasi/adab-oyunlar.py
"""
import json
import os
import re

KOK = os.path.join(os.path.dirname(__file__), '..', '..', 'ders-odasi', 'dersler')


def dy(id, metin, dogru, aciklama, gorsel=None):
    o = {'id': id, 'metin': metin, 'dogru': dogru, 'aciklama': aciklama}
    if gorsel:
        o['gorsel'] = 'slayt/%s.webp' % gorsel
    return o


def kart(id, metin, alan, ipucu=None):
    o = {'id': id, 'metin': metin, 'alan': alan}
    if ipucu:
        o['ipucu'] = ipucu
    return o


GUZEL = {'id': 'guzel', 'ad': 'Edebli davranış', 'aciklama': 'Böyle yaparız', 'ikon': 'yildiz', 'renk': '#4f7a3a'}
KACIN = {'id': 'kacin', 'ad': 'Yapmayalım', 'aciklama': 'Bundan kaçınırız', 'ikon': 'uyari', 'renk': '#c0392b'}

DESTELER = {
    # ------------------------------------------------------------------
    'adab-01': {
        'ozet': 'Edeb nedir, nasıl dinlenir, nasıl sorulur? 6 slayt, doğru-yanlış ve sıralama oyunu.',
        'metin': [
            'Edeb, güzel huy ve saygılı davranıştır.',
            'Edeb; söz dinlemek, haddini bilmek ve kırmadan davranmaktır.',
            'Bilgi, edep ile değer kazanır.',
            'En güzel miras: edep.',
            '“Peki efendim” demek, önce saygıyla dinlemektir.',
            'Düşüncemizi sonra, uygun bir dille sorabiliriz.',
        ],
        'notlar': {1: 'Öğrenciye sorun: “Sence edebli bir insan nasıl konuşur, nasıl dinler?”'},
        'oyunlar': [
            {'id': 'edeb-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('tanim', 'Edeb, güzel huy ve saygılı davranıştır.', True, 'Slaytta da böyle tarif edildi.', '01'),
                dy('bilgi', 'Bilgi tek başına yeter; edebe gerek yoktur.', False, 'Bilgi, edep ile değer kazanır.', '03'),
                dy('miras', 'Büyüklerimizin bize bıraktığı en güzel miras edebdir.', True, 'En güzel miras: edep.', '04'),
                dy('peki', '“Peki efendim” demek, önce saygıyla dinlemektir.', True, 'Önce dinleriz, sonra uygun dille sorarız.', '05'),
                dy('kes', 'Büyüğümüz konuşurken sözünü kesip hemen itiraz ederiz.', False, 'Önce saygıyla dinler, düşüncemizi sonra uygun bir dille söyleriz.', '06'),
                dy('kirma', 'Edeb; söz dinlemek, haddini bilmek ve kırmadan davranmaktır.', True, 'Üç güzel davranış: dinlemek, haddini bilmek, kırmamak.', '02'),
            ]},
            {'id': 'dinle-sor', 'tur': 'sirala', 'baslik': 'Önce dinle, sonra sor', 'rozet': '🧭 Sırala',
             'yonerge': 'Büyüğümüz bir şey anlatıyor. Edebli bir sohbetin adımlarını sırayla seç.',
             'adimlar': [
                 {'id': 'dinle', 'metin': 'Saygıyla dinlerim', 'gorsel': 'slayt/05.webp'},
                 {'id': 'bekle', 'metin': 'Sözünü bitirmesini beklerim', 'ipucu': 'Dinledik. Sonra ne yaparız?'},
                 {'id': 'peki', 'metin': '“Peki efendim” derim', 'gorsel': 'slayt/02.webp', 'ipucu': 'Söz bitti; önce kabulle karşılarız.'},
                 {'id': 'sor', 'metin': 'Sorumu uygun bir dille sorarım', 'gorsel': 'slayt/06.webp', 'ipucu': 'Soru en sona kalır.'},
             ],
             'sonMetin': 'Önce dinlemek, sonra güzel bir dille sormak edebdir.'},
        ],
        'kapanis': [('Dinle', 'saygıyla', 'goz', '#2f4a6b'), ('Bekle', 'sözü bitsin', 'el', '#4f7a3a'), ('Sor', 'güzel dille', 'kalp', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-02': {
        'ozet': 'Büyüklerimizin edeb sözleri ve davranışın dili. 5 slayt, yerleştirme, hafıza ve kendini kontrol kartı.',
        'metin': [
            'Büyüklerimiz: Edep, bilgiden önce gelir.',
            'Çirkin gördüğümüz davranışı kendimiz yapmayız.',
            'Yanlış örnek de bize ders olabilir.',
            'Edep, insanı güzelleştiren davranış dilidir: söz, bakış, oturuş, yardım ve teşekkür.',
            'Bugün kendi davranışımızı kontrol edeceğiz: saygı, söz, ses, izin ve temizlik.',
        ],
        'oyunlar': [
            {'id': 'iki-kutu', 'tur': 'siniflandir', 'baslik': 'Edebli mi, değil mi?', 'alanlar': [GUZEL, KACIN], 'kartlar': [
                kart('yardim', 'Arkadaşına yardım etmek', 'guzel'),
                kart('azar', 'Arkadaşını parmakla azarlamak', 'kacin', 'Çirkin gördüğümüz davranışı kendimiz yapmayız.'),
                kart('bakis', 'Yumuşak bakmak', 'guzel'),
                kart('yayil', 'Yayılarak oturmak', 'kacin', 'Oturuş da edebin dilidir.'),
                kart('tesekkur', 'Teşekkür etmek', 'guzel'),
                kart('bagir', 'Bağırarak konuşmak', 'kacin', 'Sesimizi kontrol ederiz.'),
                kart('izin', 'İzin istemek', 'guzel'),
                kart('kirlet', 'Etrafı kirletmek', 'kacin', 'Temizlik de edebdendir.'),
            ]},
            {'id': 'hafiza', 'tur': 'hafiza', 'baslik': 'Edebin dili', 'yonerge': 'Kartları çevir; edebin dilini anlamıyla eşleştir.', 'ciftler': [
                {'id': 'soz', 'a': 'Söz', 'b': 'Güzel ve kırmadan konuşmak', 'renk': '#e8962e'},
                {'id': 'bakis', 'a': 'Bakış', 'b': 'Yumuşak ve saygılı bakmak', 'renk': '#2f4a6b'},
                {'id': 'oturus', 'a': 'Oturuş', 'b': 'Toplu ve edebli oturmak', 'renk': '#4f7a3a'},
                {'id': 'yardim', 'a': 'Yardım', 'b': 'İhtiyacı olana el uzatmak', 'renk': '#2a9d8f'},
                {'id': 'tesekkur', 'a': 'Teşekkür', 'b': 'İyiliği güzel karşılamak', 'renk': '#c0392b'},
            ]},
            {'id': 'kontrol', 'tur': 'dusun', 'baslik': 'Kendi davranışımı kontrol ediyorum', 'sorular': [
                {'soru': 'Bu hafta hangisine daha çok dikkat edeceğim?', 'secenekler': ['Saygı', 'Söz', 'Ses', 'İzin', 'Temizlik']},
            ], 'ipucu': 'İstersen kendi cümleni yaz: “Ben bu hafta…”', 'tesekkur': 'Niyetin kaydedildi. Allahü teâlâ kolaylık versin.'},
        ],
        'kapanis': [('Edeb', 'bilgiden önce', 'kitap', '#2f4a6b'), ('Ders al', 'yanlış örnekten', 'buyutec', '#e8962e'), ('Kontrol et', 'kendini', 'yildiz', '#4f7a3a')],
    },
    # ------------------------------------------------------------------
    'adab-03': {
        'ozet': 'Evde, okulda, yolda, camide ve ekran başında aynı saygı dili. 5 slayt, soru çarkı ve doğru-yanlış.',
        'metin': [
            'Edep, günlük hayatın her yerindedir.',
            'Aynı saygı dili her ortamda gerekir.',
            'Kuralı bilmek yetmez; davranışa dönüştürmek gerekir.',
            'Sözümüzü, sesimizi ve çevremizi kontrol ederiz.',
            'Küçük davranışlar, büyük saygı gösterir.',
        ],
        'oyunlar': [
            {'id': 'gunluk-cark', 'tur': 'cark', 'baslik': 'Günlük edeb çarkı', 'dilimler': [
                {'id': 'ev', 'etiket': 'Evde', 'emoji': '🏠', 'soru': 'Annen yorgun geldi. Ne yaparsın?', 'secenekler': ['Bir bardak su getirir, yardım ederim', 'Odama geçip ses yapmam yeter', 'Hemen isteklerimi sıralarım'], 'dogru': 0, 'aciklama': 'Küçük bir yardım büyük saygı gösterir.'},
                {'id': 'okul', 'etiket': 'Okulda', 'emoji': '🏫', 'soru': 'Derste bir şey sormak istiyorsun. Ne yaparsın?', 'secenekler': ['Parmak kaldırıp sıramı beklerim', 'Hemen yüksek sesle sorarım', 'Arkadaşıma fısıldarım'], 'dogru': 0, 'aciklama': 'Aynı saygı dili her ortamda gerekir.'},
                {'id': 'yol', 'etiket': 'Yolda', 'emoji': '🚶', 'soru': 'Yaşlı bir amca ağır poşet taşıyor.', 'secenekler': ['Yardım teklif ederim', 'Görmezden gelirim', 'Arkadaşlarıma gösterip gülerim'], 'dogru': 0, 'aciklama': 'Yaşlılara yardım etmek güzel bir edebdir.'},
                {'id': 'cami', 'etiket': 'Camide', 'emoji': '🕌', 'soru': 'Camide nasıl otururuz?', 'secenekler': ['Sakin ve edebli', 'Koşup oynayarak', 'Ayaklarımı uzatarak'], 'dogru': 0, 'aciklama': 'Cami huzur mekânıdır.'},
                {'id': 'telefon', 'etiket': 'Telefon', 'emoji': '📱', 'soru': 'Kalabalık bir yerde telefonun çalabilir.', 'secenekler': ['Önceden sessize alırım', 'Sesini sonuna kadar açarım', 'Hoparlörden konuşurum'], 'dogru': 0, 'aciklama': 'Sesimizi ve çevremizi kontrol ederiz.'},
                {'id': 'sira', 'etiket': 'Sırada', 'emoji': '⏳', 'soru': 'Fırında uzun bir sıra var.', 'secenekler': ['Sıramı sabırla beklerim', 'Öne geçerim', 'Söylenip dururum'], 'dogru': 0, 'aciklama': 'Sırada beklemek de edebdir.'},
            ]},
            {'id': 'gunluk-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('her-yer', 'Edeb sadece camide gerekir.', False, 'Edep, günlük hayatın her yerindedir.', '01'),
                dy('ayni', 'Aynı saygı dili her ortamda gerekir.', True, 'Evde, okulda, yolda, camide…', '02'),
                dy('bilmek', 'Kuralı bilmek yeter; uygulamaya gerek yoktur.', False, 'Kuralı davranışa dönüştürmek gerekir.', '03'),
                dy('ses', 'Sözümüzü, sesimizi ve çevremizi kontrol ederiz.', True, 'Üçü de edebin parçasıdır.', '04'),
                dy('kucuk', 'Küçük davranışlar önemsizdir.', False, 'Küçük davranışlar büyük saygı gösterir.', '05'),
            ]},
        ],
        'kapanis': [('Her yerde', 'aynı saygı', 'yol', '#2f4a6b'), ('Bilgi', 'davranışa dönüşsün', 'el', '#4f7a3a'), ('Küçük', 'ama büyük', 'kalp', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-04': {
        'ozet': 'Büyüklerin yanında ses, oturuş ve tavır. 6 slayt, yerleştirme ve durum soruları.',
        'metin': [
            'Büyüklerin yanında sesimizi ve tavrımızı yumuşatırız.',
            'Oturuş ve beden dili de saygı anlatır.',
            'Yaşlılara hürmet, güzel bir dinî edeptir.',
            'Her yaştan insana karşı tevazu gösteririz.',
            'Büyüklerin yanında sözümüze ve davranışımıza dikkat ederiz.',
            'Edebli duruş, incitmemeyi seçmektir.',
        ],
        'oyunlar': [
            {'id': 'oturus', 'tur': 'siniflandir', 'baslik': 'Büyüklerin yanında', 'alanlar': [GUZEL, KACIN], 'kartlar': [
                kart('dik', 'Dik ve düzgün oturmak', 'guzel'),
                kart('yayil', 'Ayakları uzatıp yayılmak', 'kacin', 'Oturuş da saygı anlatır.'),
                kart('yer', 'Otobüste yer vermek', 'guzel'),
                kart('bagir', 'Yüksek sesle itiraz etmek', 'kacin', 'Büyüklerin yanında sesimizi yumuşatırız.'),
                kart('dinle', 'Söz verilince konuşmak', 'guzel'),
                kart('kol', 'Kollarını kavuşturup surat asmak', 'kacin', 'Beden dili de saygı anlatır.'),
            ]},
            {'id': 'durumlar', 'tur': 'coktan', 'baslik': 'Sen olsan ne yapardın?', 'sorular': [
                {'metin': 'Otobüste oturuyorsun; bastonlu bir dede bindi.', 'secenekler': ['Kalkıp yerimi veririm', 'Görmemiş gibi yaparım', 'Başkası versin diye beklerim'], 'dogru': 0, 'aciklama': 'Yaşlılara hürmet, güzel bir dinî edeptir.', 'gorsel': 'slayt/03.webp'},
                {'metin': 'Deden sana bir şey anlatıyor ama sen biliyorsun.', 'secenekler': ['Sabırla dinlerim', '“Biliyorum” deyip sözünü keserim', 'Telefonuma bakarım'], 'dogru': 0, 'aciklama': 'Büyüklerin yanında sözümüze ve davranışımıza dikkat ederiz.'},
                {'metin': 'Küçük kardeşin oyununu bozdu.', 'secenekler': ['Kırmadan, sakin anlatırım', 'Bağırırım', 'Ben de onunkini bozarım'], 'dogru': 0, 'aciklama': 'Her yaştan insana karşı tevazu gösteririz; edebli duruş incitmemeyi seçmektir.'},
                {'metin': 'Büyükler odaya girdi; sen yayılmış oturuyorsun.', 'secenekler': ['Toparlanıp düzgün otururum', 'Hiç değiştirmem', 'Ayaklarımı onlara doğru uzatırım'], 'dogru': 0, 'aciklama': 'Oturuş ve beden dili de saygı anlatır.', 'gorsel': 'slayt/02.webp'},
            ]},
        ],
        'kapanis': [('Yumuşak', 'ses ve tavır', 'kalp', '#c0392b'), ('Hürmet', 'yaşlılara', 'el', '#4f7a3a'), ('Tevazu', 'her yaşa', 'yildiz', '#2f4a6b')],
    },
    # ------------------------------------------------------------------
    'adab-05': {
        'ozet': 'Kapıda izin, tanıtma ve özel alana saygı. 6 slayt, sıralama ve doğru-yanlış.',
        'metin': [
            'Kapı, özel alanın sınırıdır.',
            'İzin istemeden içeri girilmez.',
            'İzin verilmezse ısrar edilmez.',
            'Kapı açılınca önce kendimizi tanıtırız.',
            'Evde oda kapısında bile izin istemek edebdir.',
            'Özel alana saygı, güveni artırır.',
        ],
        'oyunlar': [
            {'id': 'kapi-sira', 'tur': 'sirala', 'baslik': 'Kapıda edeb', 'rozet': '🚪 Sırala', 'yonerge': 'Bir arkadaşının evine gittin. Adımları sırayla seç.', 'adimlar': [
                {'id': 'cal', 'metin': 'Kapıyı nazikçe çalarım', 'gorsel': 'slayt/02.webp'},
                {'id': 'bekle', 'metin': 'Paspasın dışında beklerim', 'gorsel': 'slayt/01.webp', 'ipucu': 'Kapıyı çaldık. Şimdi?'},
                {'id': 'tanit', 'metin': 'Kapı açılınca selam verip kendimi tanıtırım', 'gorsel': 'slayt/04.webp', 'ipucu': 'Kapı açıldı. İlk ne yaparız?'},
                {'id': 'izin', 'metin': 'İzin verilirse içeri girerim', 'gorsel': 'slayt/06.webp', 'ipucu': 'Girmek için ne gerekir?'},
            ], 'sonMetin': 'İzin verilmezse ısrar etmeden “Başka zaman gelirim” deriz.'},
            {'id': 'kapi-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('izinsiz', 'Kapı açıksa izin istemeden girebiliriz.', False, 'İzin istemeden içeri girilmez.', '02'),
                dy('israr', 'İzin verilmezse ısrar etmeyiz.', True, 'Sakin bir şekilde başka zaman geliriz.', '03'),
                dy('tanit', 'Kapı açılınca önce kendimizi tanıtırız.', True, 'Kim olduğumuzu söyleriz.', '04'),
                dy('oda', 'Evde oda kapıları için izne gerek yoktur.', False, 'Evde oda kapısında bile izin istemek edebdir.', '05'),
                dy('guven', 'Özel alana saygı, güveni artırır.', True, 'Aile ve komşu arasında güven büyür.', '06'),
            ]},
        ],
        'kapanis': [('Çal', 've bekle', 'el', '#4f7a3a'), ('Tanıt', 'kendini', 'goz', '#2f4a6b'), ('Israr etme', 'izin yoksa', 'kilit', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-06': {
        'ozet': 'Az, öz ve hayırlı söz; telefonda edeb. 6 slayt, “Güzel söz sepeti” oyunu ve telefon sıralaması.',
        'metin': [
            'Konuşurken az, öz ve hayırlı söz seçeriz: kısa, net, faydalı.',
            'Yüksek ses, karşımızdakini rahatsız edebilir.',
            'Gıybet, alay ve yalandan uzak dururuz.',
            'Kibar kelimeler, zor konuşmaları yumuşatır.',
            'Telefonda önce kendimizi tanıtırız.',
            'Sözümüz, edebimizi gösterir.',
        ],
        'oyunlar': [
            {'id': 'soz-sepeti', 'tur': 'yakala', 'baslik': 'Güzel söz sepeti', 'rozet': '🧺 Söz sepeti', 'sure': 40, 'hedef': 180, 'oge': 'güzel söz',
             'yonerge': 'Güzel sözleri sepetine topla; gıybet, alay ve yalandan kaç!',
             'iyiler': [{'metin': 'Lütfen', 'emoji': '🙏'}, {'metin': 'Teşekkür ederim', 'emoji': '💐'}, {'metin': 'Buyurun', 'emoji': '🤲'},
                        {'metin': 'Kolay gelsin', 'emoji': '🌿'}, {'metin': 'Özür dilerim', 'emoji': '🕊️'}, {'metin': 'Selâmün aleyküm', 'emoji': '👋'}, {'metin': 'Allahü teâlâ razı olsun', 'emoji': '💚'}],
             'kotuler': [{'metin': 'Gıybet', 'emoji': '🤫', 'aciklama': 'Gıybetten uzak dururuz.'}, {'metin': 'Alay', 'emoji': '😝', 'aciklama': 'Alay etmek kalbi kırar.'},
                         {'metin': 'Yalan', 'emoji': '🤥', 'aciklama': 'Yalan söylemeyiz.'}, {'metin': 'Bağırmak', 'emoji': '📢', 'aciklama': 'Yüksek ses rahatsız eder.'},
                         {'metin': 'Kırıcı söz', 'emoji': '💔', 'aciklama': 'Kibar kelimeler konuşmayı yumuşatır.'}, {'metin': 'Lakap takmak', 'emoji': '🏷️', 'aciklama': 'Kimseye lakap takmayız.'}]},
            {'id': 'telefon-sira', 'tur': 'sirala', 'baslik': 'Telefonda edeb', 'rozet': '📞 Sırala', 'yonerge': 'Dedeni arıyorsun. Konuşmanın adımlarını sırala.', 'adimlar': [
                {'id': 'selam', 'metin': 'Selam veririm', 'emoji': '👋'},
                {'id': 'tanit', 'metin': 'Kendimi tanıtırım', 'gorsel': 'slayt/05.webp', 'ipucu': 'Selamdan sonra karşımızdaki kim olduğumuzu bilmeli.'},
                {'id': 'kisa', 'metin': 'Kısa, net ve faydalı konuşurum', 'gorsel': 'slayt/01.webp', 'ipucu': 'Az, öz, hayırlı söz.'},
                {'id': 'veda', 'metin': 'Teşekkür edip güzelce vedalaşırım', 'emoji': '💐', 'ipucu': 'Konuşma biterken…'},
            ]},
        ],
        'kapanis': [('Az, öz', 've hayırlı', 'kitap', '#2f4a6b'), ('Uzak dur', 'gıybet ve yalandan', 'uyari', '#c0392b'), ('Tanıt', 'telefonda kendini', 'el', '#4f7a3a')],
    },
    # ------------------------------------------------------------------
    'adab-07': {
        'ozet': 'Düzenli gece, huzurlu sabah. 6 slayt, akşam-sabah sıralaması ve doğru-yanlış.',
        'metin': [
            'Düzenli gün, düzenli geceden başlar.',
            'Yatmadan önce dua ve tevbe kalbi toparlar.',
            'Geç yatmak, sabahı zorlaştırır.',
            'Sabah için alarm kurmak sorumluluktur.',
            'Abdestli ve huzurlu uyumaya çalışırız.',
            'Uyku, ertesi güne hazırlıktır.',
        ],
        'oyunlar': [
            {'id': 'gece-sira', 'tur': 'sirala', 'baslik': 'Akşamdan sabaha', 'rozet': '🌙 Sırala', 'yonerge': 'Yatma vaktine doğru yapılanları sırayla seç.', 'adimlar': [
                {'id': 'canta', 'metin': 'Çantamı hazırlarım', 'gorsel': 'slayt/04.webp'},
                {'id': 'alarm', 'metin': 'Sabah için alarm kurarım', 'emoji': '⏰', 'ipucu': 'Çanta hazır; sabahı düşünelim.'},
                {'id': 'abdest', 'metin': 'Abdest alırım', 'gorsel': 'slayt/05.webp', 'ipucu': 'Yatağa girmeden önce…'},
                {'id': 'dua', 'metin': 'Dua ve tevbe ederim', 'gorsel': 'slayt/02.webp', 'ipucu': 'Yatakta kalbi toparlayan şey.'},
                {'id': 'uyu', 'metin': 'Erkenden uyurum', 'gorsel': 'slayt/01.webp'},
                {'id': 'kalk', 'metin': 'Sabah neşeyle kalkarım', 'gorsel': 'slayt/06.webp'},
            ]},
            {'id': 'gece-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('gec', 'Gece geç saate kadar telefona bakmak sabahı kolaylaştırır.', False, 'Geç yatmak sabahı zorlaştırır.', '03'),
                dy('dua', 'Yatmadan önce dua ve tevbe kalbi toparlar.', True, 'Gün güzel bir şekilde kapanır.', '02'),
                dy('alarm', 'Sabah için alarm kurmak sorumluluktur.', True, 'Sabaha hazırlıklı başlarız.', '04'),
                dy('abdest', 'Abdestli ve huzurlu uyumaya çalışırız.', True, 'Abdestli uyumak güzel bir edebdir.', '05'),
            ]},
        ],
        'kapanis': [('Erken yat', 'düzenli uyu', 'yildiz', '#2f4a6b'), ('Dua et', 'yatmadan önce', 'kalp', '#4f7a3a'), ('Kur', 'alarmını', 'el', '#e8962e')],
    },
    # ------------------------------------------------------------------
    'adab-08': {
        'ozet': 'Sofrada temizlik, besmele, sağ el ve şükür. 6 slayt ve sofra sıralaması. Konunun tam dersi: Bereketli Sofra.',
        'metin': [
            'Sofra edebi temizlikle başlar.',
            'Yemeğe besmeleyle başlar, sağ elle yeriz.',
            'Yemekten sonra şükrederiz.',
            'Diş temizliğini kimseyi rahatsız etmeden yaparız.',
            'Misafirlikte ev sahibine teşekkür ederiz.',
            'Sofrada edep, temizlik ve nezakettir.',
        ],
        'oyunlar': [
            {'id': 'sofra-sira', 'tur': 'sirala', 'baslik': 'Sofra sırası', 'rozet': '🍽️ Sırala', 'adimlar': [
                {'id': 'yika', 'metin': 'Ellerimizi yıkarız', 'gorsel': 'slayt/01.webp'},
                {'id': 'besmele', 'metin': 'Besmeleyle başlarız', 'gorsel': 'slayt/02.webp', 'ipucu': 'Yemeğe nasıl başlarız?'},
                {'id': 'sukur', 'metin': 'Yemekten sonra şükrederiz', 'gorsel': 'slayt/03.webp', 'ipucu': 'Yemek bitti…'},
                {'id': 'dis', 'metin': 'Dişimizi uygun yerde temizleriz', 'gorsel': 'slayt/04.webp', 'ipucu': 'Kimseyi rahatsız etmeden…'},
                {'id': 'tesekkur', 'metin': 'Ev sahibine teşekkür ederiz', 'gorsel': 'slayt/05.webp', 'ipucu': 'Misafirlikten ayrılırken…'},
            ]},
            {'id': 'sofra-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('sag', 'Yemeği sağ elimizle yeriz.', True, 'Besmeleyle başlar, sağ elle yeriz.', '02'),
                dy('dis', 'Dişimizi sofrada, herkesin önünde temizleriz.', False, 'Kimseyi rahatsız etmeden, uygun yerde temizleriz.', '04'),
                dy('sukur', 'Yemekten sonra şükrederiz.', True, '“Elhamdülillah” deriz.', '03'),
            ]},
        ],
        'kapanis': [('Temizlik', 'önce ve sonra', 'el', '#4f7a3a'), ('Besmele', 've sağ el', 'yildiz', '#e8962e'), ('Şükür', 've teşekkür', 'kalp', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-09': {
        'ozet': 'Camiye saygı, sükûnet ve temizlik. 6 slayt, yerleştirme ve durum soruları.',
        'metin': [
            'Camiye saygı ve sakinlikle gireriz.',
            'Ayakkabıları gürültü yapmadan alırız.',
            'Camide gereksiz konuşmadan uzak dururuz.',
            'Cami, ibadet ve huzur mekânıdır.',
            'Sesimize, adımlarımıza ve çevreye dikkat ederiz.',
            'Saygı, caminin huzurunu korur.',
        ],
        'oyunlar': [
            {'id': 'cami-kutu', 'tur': 'siniflandir', 'baslik': 'Camide', 'alanlar': [GUZEL, KACIN], 'kartlar': [
                kart('sakin', 'Sakinlikle içeri girmek', 'guzel'),
                kart('kos', 'Koridorda koşmak', 'kacin', 'Adımlarımıza dikkat ederiz.'),
                kart('ayakkabi', 'Ayakkabıyı sessizce yerleştirmek', 'guzel'),
                kart('konus', 'Yüksek sesle sohbet etmek', 'kacin', 'Camide gereksiz konuşmayız.'),
                kart('cop', 'Çöpü çöp kutusuna atmak', 'guzel'),
                kart('telefon', 'Telefonu sesli bırakmak', 'kacin', 'Caminin huzurunu koruruz.'),
            ]},
            {'id': 'cami-soru', 'tur': 'coktan', 'baslik': 'Sen olsan ne yapardın?', 'sorular': [
                {'metin': 'Camiye girerken arkadaşın seslendi.', 'secenekler': ['İçeri girince işaretle selam veririm, sonra konuşuruz', 'Bağırarak cevap veririm', 'Koşup yanına giderim'], 'dogru': 0, 'aciklama': 'Camiye saygı ve sakinlikle gireriz.', 'gorsel': 'slayt/01.webp'},
                {'metin': 'Namazdan sonra ayakkabılarını alıyorsun.', 'secenekler': ['Gürültü yapmadan alırım', 'Yere atıp ses çıkarırım', 'Başkasınınkini iteklerim'], 'dogru': 0, 'aciklama': 'Ayakkabıları gürültü yapmadan alırız.', 'gorsel': 'slayt/02.webp'},
                {'metin': 'Cami halısında kâğıt gördün.', 'secenekler': ['Alıp çöp kutusuna atarım', 'Görmezden gelirim', 'Ayağımla kenara iterim'], 'dogru': 0, 'aciklama': 'Çevreye dikkat ederiz.', 'gorsel': 'slayt/05.webp'},
            ]},
        ],
        'kapanis': [('Sakin', 'gir ve otur', 'el', '#4f7a3a'), ('Sessiz', 'adım ve söz', 'goz', '#2f4a6b'), ('Temiz', 'bırak', 'yildiz', '#2a9d8f')],
    },
    # ------------------------------------------------------------------
    'adab-10': {
        'ozet': 'Sokakta, alışverişte ve arkadaşla edeb. 7 slayt, yerleştirme ve doğru-yanlış.',
        'metin': [
            'Sokakta kimseyi rahatsız etmemek esastır.',
            'Alay, kavga, yalan ve aldatma edebe uymaz.',
            'Alışverişte dürüstlük ve helal kazanç önemlidir.',
            'Yiyeceği temiz ve örtülü taşırız.',
            'Arkadaşla yürürken onu bekletmeyiz.',
            'Ayrılırken helalleşmek güzel bir edeptir.',
            'Mahremiyetimizi korumak da edebin parçasıdır.',
        ],
        'oyunlar': [
            {'id': 'yol-kutu', 'tur': 'siniflandir', 'baslik': 'Yolda, evde, işte', 'alanlar': [GUZEL, KACIN], 'kartlar': [
                kart('durust', 'Alışverişte dürüst olmak', 'guzel'),
                kart('alay', 'Birini parmakla gösterip alay etmek', 'kacin', 'Alay edebe uymaz.'),
                kart('ortulu', 'Ekmeği örtülü taşımak', 'guzel'),
                kart('kavga', 'Kavga etmek', 'kacin', 'Kavga edebe uymaz.'),
                kart('helal', 'Ayrılırken helalleşmek', 'guzel'),
                kart('aldat', 'Para üstünde aldatmak', 'kacin', 'Helal kazanç önemlidir.'),
                kart('bekle', 'Arkadaşını bekletmemek', 'guzel'),
                kart('yalan', 'Yalan söylemek', 'kacin', 'Yalan edebe uymaz.'),
            ]},
            {'id': 'yol-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('rahatsiz', 'Sokakta kimseyi rahatsız etmemek esastır.', True, 'Mesafe, sessizlik ve temizlik.', '01'),
                dy('ortu', 'Yiyeceği açıkta, elde sallayarak taşırız.', False, 'Yiyeceği temiz ve örtülü taşırız.', '04'),
                dy('helal', 'Ayrılırken helalleşmek güzel bir edeptir.', True, 'Gönüller hoş olur.', '06'),
                dy('mahrem', 'Mahremiyetimizi korumak da edebin parçasıdır.', True, 'Kendimizin ve başkalarının mahremiyetine saygı.', '07'),
            ]},
        ],
        'kapanis': [('Rahatsız etme', 'sokakta', 'yol', '#2f4a6b'), ('Dürüst ol', 'alışverişte', 'muhur', '#4f7a3a'), ('Helalleş', 'ayrılırken', 'kalp', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-11': {
        'ozet': 'Kıble, oturuş ve görünmeyen yerde edeb. 6 slayt, doğru-yanlış ve durum soruları.',
        'metin': [
            'Kıble, ibadette yöneldiğimiz özel bir yöndür.',
            'Kıbleye karşı saygısız davranışlardan kaçınırız.',
            'Cami ve evde oturuşumuza dikkat ederiz.',
            'Bu edeb, kalpteki saygıyı davranışa taşır.',
            'Cüneyd-i Bağdâdî hazretlerinin kıssası bize hassasiyet öğretir.',
            'Görünmeyen yerde bile edebimizi koruruz.',
        ],
        'notlar': {5: 'Cüneyd-i Bağdâdî hazretlerinin kıssasını kendi kaynağınızdan kısaca anlatın; slaytta yalnızca başlığı var.'},
        'oyunlar': [
            {'id': 'kible-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('yon', 'Kıble, ibadette yöneldiğimiz özel bir yöndür.', True, 'Kâbe-i Muazzama yönüdür.', '01'),
                dy('ayak', 'Kıbleye doğru ayak uzatıp yayılmak bir şey değildir.', False, 'Kıbleye karşı saygısız davranışlardan kaçınırız.', '03'),
                dy('kalp', 'Bu edeb, kalpteki saygıyı davranışa taşır.', True, 'Saygı kalpte başlar, davranışta görünür.', '04'),
                dy('gorunmez', 'Kimse görmüyorsa edebe dikkat etmeye gerek yoktur.', False, 'Görünmeyen yerde bile edebimizi koruruz.', '06'),
            ]},
            {'id': 'kible-soru', 'tur': 'coktan', 'baslik': 'Sen olsan ne yapardın?', 'sorular': [
                {'metin': 'Evde kanepede ayaklarını uzatmışsın; ayakların kıbleye doğru.', 'secenekler': ['Toparlanıp oturuşumu düzeltirim', 'Nasılsa evdeyim, değiştirmem', 'Ayaklarımı daha da uzatırım'], 'dogru': 0, 'aciklama': 'Cami ve evde oturuşumuza dikkat ederiz.', 'gorsel': 'slayt/03.webp'},
                {'metin': 'Odanda yalnızsın.', 'secenekler': ['Yine edebimi korurum', 'Kimse görmüyor, fark etmez', 'Sadece camide edebli olurum'], 'dogru': 0, 'aciklama': 'Görünmeyen yerde bile edebimizi koruruz.', 'gorsel': 'slayt/06.webp'},
            ]},
        ],
        'kapanis': [('Kıble', 'saygının yönü', 'yol', '#2f4a6b'), ('Oturuş', 'edebli', 'el', '#4f7a3a'), ('Her yerde', 'görünmese de', 'goz', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-12': {
        'ozet': 'Ailede tatlı dil, sabır ve güler yüz. 6 slayt ve “Huzur göstergesi” oyunu.',
        'metin': [
            'Ailede edeb, tatlı dil ve güzel nasihatle başlar.',
            'İhtiyaçları helal yoldan karşılamak sorumluluktur.',
            'Kızınca kırıcı söz ve şiddetten uzak durulur.',
            'Aile sırrı dışarıda anlatılmaz.',
            'Evde güler yüz huzuru artırır.',
            'En yakınlarımızı incitmemek de edeptir.',
        ],
        'oyunlar': [
            {'id': 'huzur', 'tur': 'gosterge', 'baslik': 'Evin huzur göstergesi', 'rozet': 'Aile', 'gosterge': 'Huzur',
             'yonerge': 'Bu davranış evin huzurunu artırır mı, azaltır mı? Doğru karar verdikçe gösterge yükselir.',
             'secenekler': [{'deger': 'artar', 'ad': 'Huzuru artırır', 'sinif': 'guzel', 'ikon': '💚'}, {'deger': 'azalir', 'ad': 'Huzuru azaltır', 'sinif': 'kacin', 'ikon': '💔'}],
             'durumlar': [
                 {'id': 'tatli', 'metin': 'Kardeşine tatlı dille nasihat etmek', 'cevap': 'artar', 'aciklama': 'Ailede edeb, tatlı dil ve güzel nasihatle başlar.'},
                 {'id': 'kiz', 'metin': 'Kızınca kırıcı sözler söylemek', 'cevap': 'azalir', 'aciklama': 'Kızınca biraz bekler, sakinleşiriz.'},
                 {'id': 'sir', 'metin': 'Evde konuşulanları dışarıda anlatmak', 'cevap': 'azalir', 'aciklama': 'Aile sırrı dışarıda anlatılmaz.'},
                 {'id': 'guler', 'metin': 'Eve güler yüzle girmek', 'cevap': 'artar', 'aciklama': 'Evde güler yüz huzuru artırır.'},
                 {'id': 'incit', 'metin': 'Anneyi kıracak şekilde itiraz etmek', 'cevap': 'azalir', 'aciklama': 'En yakınlarımızı incitmemek de edeptir.'},
                 {'id': 'yardim', 'metin': 'Ev işlerine yardım etmek', 'cevap': 'artar', 'aciklama': 'Yardımlaşma sevgiyi artırır.'},
             ], 'sonMetin': 'Tatlı dil ve güler yüz evi huzurla doldurur.'},
        ],
        'kapanis': [('Tatlı dil', 've nasihat', 'kalp', '#c0392b'), ('Sabır', 'kızınca', 'el', '#2f4a6b'), ('Güler yüz', 'evde', 'yildiz', '#4f7a3a')],
    },
    # ------------------------------------------------------------------
    'adab-evden-cikarken': {
        'ozet': 'Vedalaşma, sağ ayakkabı, dua ve güzel niyet. 7 slayt, sıralama ve dua eşleştirmesi.',
        'metin': [
            'Evden çıkarken edeb: besmele, aileye veda, güzel niyet ve dua.',
            'Çıkmadan önce ailemizle vedalaşırız. Besmele ile önce sağ ayakkabımızı giyer, evden sol ayakla çıkarız.',
            'Evden çıkarken şu duayı okuruz: “Bismillâhi ve tevekkeltü alellâhi ve lâ havle ve lâ kuvvete illâ billâh.”',
            'Bu dua bize Allahü teâlâya güvenmeyi, doğru yolda kalmayı ve korunmayı Allahü teâlâdan istemeyi hatırlatır.',
            'Okula ya da işe giderken güzel niyet ederiz: helal rızık, aileye destek, ibadet ve insanlara fayda.',
            'Evden çıkarken Âyete’l-Kürsî okumayı alışkanlık hâline getiririz; gösteriş için değil, Allahü teâlânın korumasını dilemek için.',
            'Eve girerken de İhlâs-ı şerîf okumayı hatırlarız. Evden çıkış ve eve dönüş dua ile güzelleşsin.',
        ],
        'not_temizle': True,
        'oyunlar': [
            {'id': 'cikis-sira', 'tur': 'sirala', 'baslik': 'Kapıdan çıkarken', 'rozet': '🚪 Sırala', 'yonerge': 'Sabah evden çıkıyorsun. Adımları sırayla seç.', 'adimlar': [
                {'id': 'veda', 'metin': 'Ailemle vedalaşırım', 'gorsel': 'slayt/01.webp'},
                {'id': 'ayakkabi', 'metin': 'Besmeleyle önce sağ ayakkabımı giyerim', 'gorsel': 'slayt/02.webp', 'ipucu': 'Vedalaştık; şimdi ayakkabı…'},
                {'id': 'cik', 'metin': 'Sol ayakla dışarı çıkarım', 'emoji': '🦶', 'ipucu': 'Kapı eşiğinden hangi ayakla çıkıyorduk?'},
                {'id': 'dua', 'metin': 'Evden çıkış duasını okurum', 'gorsel': 'slayt/03.webp', 'ipucu': 'Dışarı çıkınca hemen…'},
                {'id': 'kursi', 'metin': 'Âyete’l-Kürsî okurum', 'gorsel': 'slayt/06.webp', 'ipucu': 'Korunmayı dilemek için okunan âyet-i kerîme.'},
                {'id': 'niyet', 'metin': 'Güzel niyetle yola koyulurum', 'gorsel': 'slayt/05.webp'},
            ]},
            {'id': 'dua-esle', 'tur': 'eslestir', 'baslik': 'Duanın anlamı', 'yonerge': 'Duanın her parçasını anlamıyla eşleştir.', 'ciftler': [
                {'id': 'bismillah', 'sol': 'Bismillâhi', 'sag': 'Allahü teâlânın adıyla'},
                {'id': 'tevekkul', 'sol': 've tevekkeltü alellâhi', 'sag': 'Allahü teâlâya tevekkül ettim'},
                {'id': 'havle', 'sol': 've lâ havle ve lâ kuvvete illâ billâh', 'sag': 'Güç ve kuvvet ancak Allahü teâlânın yardımıyladır'},
            ]},
        ],
        'kapanis': [('Vedalaş', 've besmele', 'el', '#2f4a6b'), ('Dua et', 'kapıda', 'kalp', '#4f7a3a'), ('Niyet et', 'güzel', 'yildiz', '#e8962e')],
    },
    # ------------------------------------------------------------------
    'adab-insanlarla': {
        'ozet': 'Mecliste oturuş, temizlik, büyüklerin yeri. 7 slayt, yerleştirme ve doğru-yanlış.',
        'metin': [
            'İnsanlarla beraberken otururken, konuşurken, dinlerken çevremize saygı gösteririz.',
            'Oturuşumuz da edepli olsun: ayak uzatıp yayılmayız, mecliste ölçülü otururuz.',
            'Gereksiz hareketlerden kaçınırız: saçla, elbiseyle, parmaklarla oynamak dikkat dağıtır.',
            'Temizlikte başkalarını düşünürüz: esnemek ya da burnu temizlemek gerekirse uygun bir yere gideriz.',
            'Bir meclise girince büyüklerin yerine oturmayız; yanlışlıkla oturduysak fark edince uygun yere geçeriz.',
            'Mecliste uyumamaya çalışırız; uykumuz gelirse mümkünse uygun bir yere geçeriz.',
            'Öyle davranırız ki insanlar yanımızda huzur bulsun ve bizi saygıyla hatırlasın.',
        ],
        'not_temizle': True,
        'oyunlar': [
            {'id': 'meclis-kutu', 'tur': 'siniflandir', 'baslik': 'Mecliste', 'alanlar': [GUZEL, KACIN], 'kartlar': [
                kart('olculu', 'Ölçülü ve toplu oturmak', 'guzel'),
                kart('bacak', 'Bacak bacak üstüne atıp yayılmak', 'kacin', 'Mecliste ölçülü otururuz.'),
                kart('mendil', 'Burnunu temizlemek için uygun yere gitmek', 'guzel'),
                kart('sac', 'Saçıyla, parmaklarıyla oynayıp durmak', 'kacin', 'Gereksiz hareketler dikkat dağıtır.'),
                kart('yer', 'Büyüklerin yerini onlara bırakmak', 'guzel'),
                kart('silmek', 'Elini yüzünü kıyafetine silmek', 'kacin', 'Temizlikte başkalarını düşünürüz.'),
            ]},
            {'id': 'meclis-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('yer', 'Yanlışlıkla büyüğün yerine oturduysak fark edince uygun yere geçeriz.', True, 'Büyüklerin yerine saygı gösteririz.', '05'),
                dy('uyu', 'Mecliste uyuyup horlamak kimseyi rahatsız etmez.', False, 'Uykumuz gelirse uygun bir yere geçeriz.', '06'),
                dy('esne', 'Esnemek gerekirse kimseyi rahatsız etmeden uygun yere gideriz.', True, 'Ses ve görüntüyle kimseyi rahatsız etmeyiz.', '04'),
                dy('huzur', 'İnsanlar yanımızda huzur bulacak şekilde davranırız.', True, 'Bizi saygıyla hatırlasınlar.', '07'),
            ]},
        ],
        'kapanis': [('Ölçülü', 'otur', 'el', '#2f4a6b'), ('Düşün', 'başkalarını', 'kalp', '#4f7a3a'), ('Huzur ver', 'yanındakine', 'yildiz', '#e8962e')],
    },
    # ------------------------------------------------------------------
    'adab-sosyal-medya': {
        'ozet': 'Ekrandaki davranışın da karakteri vardır. 24 slayt, gönder kilidi, yerleştirme, doğru-yanlış ve hız turu.',
        'metin': [
            'Sosyal medya âdâbı: Ekrandaki davranışın da bir karakteri vardır.',
            'Ekran küçük, etkisi büyük: Bir mesaj, bir yorum, bir paylaşım gerçek bir insanın kalbine dokunur.',
            'Herkes aynı ekranı kullanır; kimi fayda üretir, kimi tartışma çıkarır, kimi saatlerini kaybeder. Direksiyon sende.',
            'Gönder tuşundan önce dur: Yazdıklarımız, beğendiklerimiz ve paylaştıklarımız sorumluluk taşır.',
            'Dilin kalbe dokunsun: Nasıl konuştuğun da önemlidir. Güzel söz kapı açar.',
            'Yüz yüze söyleyemeyeceğini yazma. Gizli hesap kabalık için kalkan değildir.',
            'Boş gürültü değil, fayda: Paylaşımın bilgi versin, öğretsin, iyiliğe çağırsın.',
            'Özel hayat özel kalsın: Ailemizi, evimizi paylaşmadan önce “Gerçekten gerek var mı?” diye düşünürüz.',
            'Açık, akıcı, anlaşılır yaz: Sade ve mümkün olduğunca doğru yazarız.',
            'Ölçü kalite getirir: Abartı, tekrar ve gösteriş yerine ölçülü paylaşım.',
            'Yazıda ses tonu yok: Yanlış anlaşılmamak için uygun emojiyi yerinde kullanırız; her cümleye emoji yağdırmayız.',
            'Şaka incitmesin: Alay etmeyiz, küçümsemeyiz; uyaracaksak kırmadan, yapıcı bir dille konuşuruz.',
            'İzin olmadan fotoğraf yok: Başkasının görüntüsü ve özel hayatı bize emanettir.',
            'Kaynağı göster: Başkasının paylaşımını sahiplenmeyiz; emeğe saygı paylaşımın adabıdır.',
            'Öfkeyle gönderme: Kızgınken yazmayız; önce durur, nefes alır, düşünür, sonra cevap veririz.',
            'Dijital iz kalır: Silinen bir paylaşım bile başka bir yerde yaşamaya devam edebilir.',
            'Tanımadığın kişilere DM yok: Özelden iletişimde acele etmeyiz; güvenliğimizi ve mahremiyetimizi koruruz.',
            'Takip ve paylaşımda seçici ol: Zarar veren hesaplara itibar etmeyiz.',
            'Paylaşımın bir amacı olsun: Gönder tuşuna basmadan önce “Bu gerçekten fayda sağlayacak mı?” diye sorarız.',
            'Haberi doğrula: Kaynağı belirsiz bilgiyi yaymayız; emin değilsek paylaşmayız.',
            'Çirkin etiket yok: Dikkat çekmek için rahatsız edici etiketler kullanmayız.',
            'Beğeni ve takipçi peşinde koşmayız; riskli takipleri ailemizden gizlemeyiz.',
            'Kendin ol, zamanını koru: Ekran süresi koyarız; hayatımızı ekrana bırakmayız.',
            '“İlim meclisine vardım kıldım taleb; ilim geride kaldı, illâ edep illâ edep.” (Yunus Emre hazretleri) Göndermeden önce üç soru: Doğru mu? Faydalı mı? Saygılı mı?',
        ],
        'not_temizle': True,
        'oyunlar': [
            {'id': 'gonder-kilidi', 'tur': 'kilit', 'baslik': 'Gönder kilidi', 'rozet': '3 soru',
             'yonerge': 'Göndermeden önce üç soru: Doğru mu? Faydalı mı? Saygılı mı? Her mesaj için karar ver.',
             'secenekler': [{'id': 'gonder', 'ad': 'Gönderirim', 'alt': 'doğru, faydalı, saygılı', 'renk': '#4f7a3a'},
                            {'id': 'dur', 'ad': 'Göndermem', 'alt': 'bir şartı eksik', 'renk': '#c0392b'}],
             'durumlar': [
                 {'id': 'haber', 'metin': 'Kaynağı belli olmayan “şok” bir haber', 'cevap': 'dur', 'aciklama': 'Haberi doğrula; emin değilsen paylaşma.', 'ipucu': 'Doğru olduğundan emin miyiz?'},
                 {'id': 'tebrik', 'metin': 'Arkadaşına “Sınavın hayırlı olsun!” mesajı', 'cevap': 'gonder', 'aciklama': 'Güzel söz kapı açar.'},
                 {'id': 'foto', 'metin': 'Arkadaşının izinsiz çektiğin komik fotoğrafı', 'cevap': 'dur', 'aciklama': 'İzin olmadan fotoğraf yok.', 'ipucu': 'İzin aldık mı?'},
                 {'id': 'ofke', 'metin': 'Kızgınken yazdığın sert bir cevap', 'cevap': 'dur', 'aciklama': 'Öfkeyle gönderme; önce dur, nefes al, düşün.', 'ipucu': 'Saygılı mı?'},
                 {'id': 'kaynak', 'metin': 'Kaynağını yazdığın faydalı bir bilgi', 'cevap': 'gonder', 'aciklama': 'Kaynağı göstermek emeğe saygıdır.'},
                 {'id': 'ev', 'metin': 'Evinin adresini gösteren bir paylaşım', 'cevap': 'dur', 'aciklama': 'Özel hayat özel kalsın.', 'ipucu': 'Gerçekten gerek var mı?'},
             ], 'sonBaslik': 'Kilit açıldı!', 'sonMetin': 'Doğru mu? Faydalı mı? Saygılı mı? Üçü de “evet” ise gönder.'},
            {'id': 'ekran-kutu', 'tur': 'siniflandir', 'baslik': 'Ekranda edeb', 'alanlar': [GUZEL, KACIN], 'kartlar': [
                kart('izin', 'Fotoğraf için izin istemek', 'guzel'),
                kart('dm', 'Tanımadığı kişiye DM atmak', 'kacin', 'Güvenliğimizi koruruz.'),
                kart('sure', 'Ekran süresi koymak', 'guzel'),
                kart('alay', 'Alaycı yorum yazmak', 'kacin', 'Şaka incitmesin.'),
                kart('sade', 'Sade ve anlaşılır yazmak', 'guzel'),
                kart('etiket', 'Dikkat çeken çirkin etiketler', 'kacin', 'Çirkin etiket yok.'),
                kart('aile', 'Riskli bir takibi ailesine söylemek', 'guzel'),
                kart('gizli', 'Gizli hesapla kabalık etmek', 'kacin', 'Yüz yüze söyleyemeyeceğini yazma.'),
            ]},
            {'id': 'ekran-hiz', 'tur': 'hizTuru', 'baslik': 'Ekran hız turu', 'sure': 10, 'sorular': [
                {'metin': 'Göndermeden önce kaç soru soruyoruz?', 'secenekler': ['Üç', 'Bir', 'Hiç'], 'dogru': 0},
                {'metin': 'Kızgınken mesaj yazmalı mıyız?', 'secenekler': ['Hayır, önce dur', 'Evet, hemen', 'Fark etmez'], 'dogru': 0},
                {'metin': 'Silinen paylaşım tamamen kaybolur mu?', 'secenekler': ['Her zaman', 'Hayır, iz kalabilir', 'Evet, hemen'], 'dogru': 1},
                {'metin': 'Başkasının fotoğrafını paylaşmak için…', 'secenekler': ['İzin isteriz', 'Beğeni bekleriz', 'Gizli paylaşırız'], 'dogru': 0},
                {'metin': 'Emin olmadığımız haber…', 'secenekler': ['Paylaşılmaz', 'Hemen yayılır', 'Herkese gönderilir'], 'dogru': 0},
                {'metin': '“İllâ edep illâ edep” kimin sözü?', 'secenekler': ['Yunus Emre hazretleri', 'Bir reklam', 'Bir oyun'], 'dogru': 0},
            ]},
        ],
        'kapanis': [('Doğru mu?', 'doğrula', 'buyutec', '#2f4a6b'), ('Faydalı mı?', 'amaç taşı', 'yildiz', '#4f7a3a'), ('Saygılı mı?', 'kırma', 'kalp', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-yeme-icme': {
        'ozet': 'Yeme ve içme âdâbı, 20 resimli slayt ve resimli doğru-yanlış. Konunun tam dersi: Bereketli Sofra.',
        'metin': [
            'Yemeğe besmele ile başlarız.', 'Ölçülü yeriz.', 'Ellerimizi yıkar, sağ elimizle yeriz.', 'Sofrada güzel otururuz.',
            'İsraf etmeyiz; artanları hayvanlarla paylaşırız.', 'Ortak tabakta önümüzden yeriz.', 'Sünnet oturuşu: sağ diz dik, sol ayak altta.',
            'Sofrada güzel sohbet ederiz.', 'Lokmalarımızı küçük alırız.', 'Sofraya davet edilmeyi bekleriz.', 'Büyüklerimize öncelik veririz.',
            'Sofrada hürmetli oluruz.', 'Temizliğe dikkat ederiz; kırıntıları yere dökmeyiz.', 'Yemekten sonra dişlerimizi temizleriz.',
            'Yemekten önce ve sonra ellerimizi yıkarız.', 'Yiyecek ve içeceklerin üstünü kapatırız.', 'Sağ elimizle içeriz.',
            'Yemekten sonra “Elhamdülillah” deriz.', 'Tabağımızdaki son lokmayı da değerlendiririz.', 'Yere düşen lokmayı temizleyip yeriz; nimeti israf etmeyiz.',
        ],
        'not_temizle': True,
        'oyunlar': [
            {'id': 'resimli-dy', 'tur': 'dogruYanlis', 'baslik': 'Resimli doğru-yanlış', 'ifadeler': [
                dy('besmele', 'Yemeğe besmele ile başlarız.', True, 'Besmele sofraya bereket getirir.', '01'),
                dy('olcu', 'Doyunca da yemeye devam ederiz.', False, 'Ölçülü yeriz.', '02'),
                dy('onunden', 'Ortak tabakta önümüzden yeriz.', True, 'Başkasının önüne uzanmayız.', '06'),
                dy('davet', 'Davet edilmeden sofraya otururuz.', False, 'Davet edilmeyi bekleriz.', '10'),
                dy('kapat', 'Yiyeceklerin üstünü kapatırız.', True, 'Kaplar örtülür.', '16'),
                dy('israf', 'Artan yemeği çöpe atarız.', False, 'İsraf etmeyiz.', '05'),
            ]},
        ],
        'kapanis': [('Besmele', 've sağ el', 'yildiz', '#e8962e'), ('Ölçü', 'israf yok', 'el', '#4f7a3a'), ('Şükür', 'Elhamdülillah', 'kalp', '#c0392b')],
    },
    # ------------------------------------------------------------------
    'adab-yolda': {
        'ozet': 'Hızda, bakışta ve yürüyüşte orta yol. 5 slayt, doğru-yanlış ve durum soruları.',
        'metin': [
            'Yolda yürürken edeb: Hızda, bakışta ve yürüyüşte orta yolu koruruz.',
            'Orta hızda, dengeli yürürüz: Çok acele etmeyiz, tembellik de etmeyiz; kibirli gibi salınmayız.',
            'Yürürken gösterişe kaçmayız: İki de bir arkamıza dönüp bakmayız; sakin ve doğal yürürüz.',
            'Binekte de ölçüyü koruruz: Ne çok hızlı ne çok yavaş; güvenli ve dengeli.',
            'Yolda gözümüzü koruruz: Evlerin pencerelerine bakmayız; insanların mahremiyetine saygı gösteririz.',
        ],
        'not_temizle': True,
        'oyunlar': [
            {'id': 'yolda-dy', 'tur': 'dogruYanlis', 'baslik': 'Doğru mu, yanlış mı?', 'ifadeler': [
                dy('orta', 'Yolda orta hızda, dengeli yürürüz.', True, 'Ne koşturur ne sürükleniriz.', '02'),
                dy('salin', 'Kibirli gibi salınarak yürümek güzeldir.', False, 'Ölçülü ve doğal yürürüz.', '02'),
                dy('arka', 'Yürürken iki de bir arkamıza dönüp poz veririz.', False, 'Sakin ve doğal yürürüz.', '03'),
                dy('kemer', 'Arabada emniyet kemerimizi takarız.', True, 'Binekte de güvenli ve dengeli oluruz.', '04'),
                dy('pencere', 'Yolda evlerin pencerelerine bakmayız.', True, 'Mahremiyete saygı gösteririz.', '05'),
            ]},
            {'id': 'yolda-soru', 'tur': 'coktan', 'baslik': 'Sen olsan ne yapardın?', 'sorular': [
                {'metin': 'Okula geç kaldın, kaldırım kalabalık.', 'secenekler': ['Hızlı ama kimseye çarpmadan yürürüm', 'İnsanları iteleyerek koşarım', 'Yolun ortasından koşarım'], 'dogru': 0, 'aciklama': 'Orta hızda, dengeli yürürüz.', 'gorsel': 'slayt/02.webp'},
                {'metin': 'Bir evin penceresi açık.', 'secenekler': ['Bakışımı önüme indiririm', 'Durup içeri bakarım', 'Arkadaşlarıma gösteririm'], 'dogru': 0, 'aciklama': 'Yolda gözümüzü koruruz.', 'gorsel': 'slayt/05.webp'},
            ]},
        ],
        'kapanis': [('Orta hız', 'dengeli', 'yol', '#2f4a6b'), ('Sade', 'gösterişsiz', 'el', '#4f7a3a'), ('Göz', 'korunur', 'goz', '#c0392b')],
    },
}


def isle(ders_id, v):
    yol = os.path.join(KOK, ders_id, 'ders.js')
    s = open(yol, encoding='utf-8').read()
    j = json.loads(s[s.index('{'):s.rindex('}') + 1])
    bolum = j['bolumler'][0]
    slaytlar = [b for b in bolum['bloklar'] if b['tur'] == 'slayt']
    giris = [b for b in bolum['bloklar'] if b['tur'] == 'bolum']
    assert len(slaytlar) == len(v['metin']), (ders_id, len(slaytlar), len(v['metin']))
    for i, b in enumerate(slaytlar):
        b['metin'] = v['metin'][i]
        if v.get('not_temizle') or (b.get('not') or '').startswith('[Sources]'):
            b.pop('not', None)
        n = v.get('notlar', {}).get(i + 1)
        if n:
            b['not'] = n
    oyunlar = v['oyunlar']
    for o in oyunlar:
        o.setdefault('not', 'Birlikte modunda öğrenciler sırayla oynar; “Herkes kendi” modunda her öğrenci kendi ekranında oynar.')
    # Slaytları ikiye böl: ilk oyun ortaya, kalanlar sona (tek oyunluysa sona)
    orta = len(slaytlar) // 2 if len(oyunlar) > 1 and len(slaytlar) >= 5 else len(slaytlar)
    bloklar = giris + slaytlar[:orta] + oyunlar[:1] + slaytlar[orta:] + oyunlar[1:]
    bloklar.append({'id': 'son', 'tur': 'kapanis', 'baslik': 'Ders tamamlandı',
                    'maddeler': [{'baslik': a, 'metin': m, 'ikon': ik, 'renk': r} for a, m, ik, r in v['kapanis']],
                    'dua': 'Elhamdülillah. Öğrendiklerimizle amel etmeyi Allahü teâlâ nasip etsin.'})
    bolum['bloklar'] = bloklar
    j.pop('taslak', None)
    j['ozet'] = v['ozet']
    with open(yol, 'w', encoding='utf-8') as f:
        f.write('/* %s — slaytlar ice-aktar.py ile, oyunlar adab-oyunlar.py ile eklendi. */\n' % j['ad'])
        f.write('DO.dersKaydet(\n' + json.dumps(j, ensure_ascii=False, indent=1) + '\n);\n')
    return len(oyunlar)


def main():
    kat_yol = os.path.join(KOK, 'katalog.js')
    m = re.search(r'DO\.katalogKaydet\((\[.*\])\);', open(kat_yol, encoding='utf-8').read(), re.S)
    katalog = json.loads(m.group(1))
    for ders_id, v in DESTELER.items():
        n = isle(ders_id, v)
        for k in katalog:
            if k['id'] == ders_id:
                k['durum'] = 'oyunlu'
                k['oyun'] = n
                k['ozet'] = v['ozet']
        print('✓', ders_id, n, 'oyun')
    sira = {'tam': 0, 'oyunlu': 1, 'taslak': 2}
    katalog.sort(key=lambda k: (sira.get(k.get('durum'), 3), k.get('seri', ''), k.get('id')))
    with open(kat_yol, 'w', encoding='utf-8') as f:
        f.write('/* Ders Odası — ders kataloğu. scripts/ders-odasi/ice-aktar.py ve adab-oyunlar.py günceller. */\n')
        f.write('DO.katalogKaydet(' + json.dumps(katalog, ensure_ascii=False, indent=1) + ');\n')


if __name__ == '__main__':
    main()
