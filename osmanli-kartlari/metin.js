'use strict';
window.METIN = {
 title:'Osmanlı Padişahları', subtitle:'36 padişah, 72 yüz, bir hanedanın hikâyesi',
 brand:'Osmanlı Padişahları', discover:'Kartları Keşfet', buy:'Seti Edinin', skip:'İçeriğe geç',
 navAlbum:'Albüm', navGames:'Meclis', navTable:'Masada', heroNote:'Ecdadımızın hikâyesini açın, çevirin, birlikte okuyun.',
 albumTitle:'Padişahlarımızın albümü', albumIntro:'Her kart bir hayat, her arka yüz birlikte okunacak bir hatıra. Bir karta dokunarak başlayın.',
 all:'Tümü', century:n=>`${n}. yy`, flipAll:'Hepsini çevir', sealCount:n=>`${n} / 36 kart mühürlendi`, albumDone:'Albüm tamamlandı', seal:'Görüldü',
 timelineTitle:'Saltanat şeridi', timelineIntro:'Altı asrı aşan bir yolculuk. Şeridi yana kaydırın; bir saltanata dokunup kartını açın.',
 timelineLabel:'1299–1922 saltanatları; yatay kaydırılabilir', years:'yıl', timelineCount:n=>`${n}`, interregnum:'Fetret Devri',
 gamesTitle:'Meclis', gamesIntro:'Kartları ailece masaya yayın. Sıralayın, eşleştirin, tartın; geçmişi birlikte okuyun.',
 games:[
 {id:'silsile',title:'Silsile',desc:'Padişahlarımızın kartlarını bir zincirin halkaları gibi sıralayın.',levels:['Beşli','Dokuzlu','Tam Silsile'],rule:'Önce desteden bir kart, sonra zincirden bir halka seçin. Kartı halkaya sürükleyebilirsiniz. Halkalar, seçilen kartların saltanat sırasına göre dizilir.'},
 {id:'hafiza',title:'Hafıza Divanı',desc:'Ön ve arka yüzleri bir araya getirin; her çiftte bir hayatı yeniden okuyun.',levels:['6 çift','10 çift','18 çift'],rule:'İki kapalı kartı açın. Aynı padişahın ön ve arka yüzü birleşince açık kalır. Ardından niteleme şeridini okuyun.'},
 {id:'terazi',title:'Saltanat Terazisi',desc:'Saltanat yıllarını iki kefede dengeye getirin.',levels:['4 kart','6 kart','Yüzyıl dengesi'],rule:'Bir kart seçip sol veya sağ kefeye dokunun; dilerseniz sürükleyin. Tüm kartları kullanın. İki toplam arasındaki fark en çok bir yıl olunca denge kurulur. Kefedeki karta dokunarak desteye geri alabilirsiniz.'},
 {id:'hazine',title:'Bilgi Hazinesi',desc:'Kartlardaki bilgi cümlelerini ait oldukları padişahlarla buluşturun.',levels:['2 padişah','3 padişah','4 padişah'],rule:'Her bilgiyi ait olduğu padişahın kartına yerleştirin. Önce bilgi şeridine, ardından karta dokunun veya şeridi sürükleyin. Bütün bilgileri birleşen kart çevrilir.'},
 {id:'pusula',title:'Yıl Pusulası',desc:'Bir yıl seçin; o yılın saltanatına açılan kartları inceleyin.',levels:['Keşfe başlayın','Asırlar arasında','Son yüzyıl'],rule:'Kadranı kaydırın veya yıl yazın. Geçiş yıllarında birlikte görünen kartları açabilirsiniz. Kaydet düğmesi, kartları ve yıl bilgisini bir görselde birleştirir.'}
 ],
 tableTitle:'Masada, birlikte', tableIntro:'Ekrandan sofraya, aileden sınıfa: aynı kartlarla beş sakin buluşma.',
 tableRules:[
 ['Silsile','Beş ön yüz seçin ve karıştırın. Saltanat tarihlerine bakarak sıraya dizin; sonra desteyi dokuz veya otuz altı karta genişletin. Her halkada padişahımızın hitabını birlikte okuyun.'],
 ['Hafıza Divanı','İki set kullanın veya ön ve arka yüzlerin kopyalarını ayrı kartlara basın. Altı çiftle başlayıp kapalı dizin. Sırayla iki yüz açın; birleşen çiftin nitelemesini sesli okuyun.'],
 ['Saltanat Terazisi','Dört ya da altı kart seçin. Saltanat sürelerini kâğıda yazın, iki gruba ayırın. Önce dengelenebilen bir grup hazırlayın; toplamları arasında en çok bir yıl fark arayın. İki saltanatı toplayın; Sultan V. Murad Han için üç ay kullanın.'],
 ['Bilgi Hazinesi','İki, üç veya dört kartın arka yüzündeki bilgileri ayrı kâğıtlara aynen aktarın. Ön yüzleri masaya koyun ve her cümleyi ait olduğu karta yerleştirin. Sonunda arka yüzleri birlikte okuyun.'],
 ['Yıl Pusulası','1299–1922 arasında bir yıl seçin. Tarih aralıklarını inceleyerek o yıl tahtta olan padişahımızı bulun. Geçiş yıllarında iki veya üç kartı yan yana koyun; Fetret Devri için ayrı bir kâğıt ayırın.']
 ],
 classroomTitle:'Sınıfta bir tarih masası', classroom:'Küçük gruplara birer yüzyıl verin. Her grup kartları tarihe göre yerleştirsin, bir bilgi cümlesini aynen okusun ve ortak saltanat yıllarını işaretlesin. Sonra bütün gruplar aynı şeritte buluşsun.',
 styleTitle:'Üslubumuz', styleNote:'Padişahlarımızı hürmetle anıyor, ecdadımızın hikâyesini merak ve dikkatle okuyoruz. Burada her etkinlik birlikte öğrenmeye açılan bir kapıdır.',
 print:'Masa kurallarını yazdır', purchaseTitle:'Tarihe masanızda yer açın', dimensions:'63 × 93 mm · 36 kart · 72 yüz', purchaseNote:'Elde çevrilen, masaya yayılan, nesiller arasında paylaşılan bir kart seti.',
 source:'Kaynak: Osmanlı Padişahları Kart Seti. Kart yüzlerindeki metinler aynen aktarılmıştır. Yıl bilgileri kartlardaki saltanat aralıklarına dayanır; geçiş yılları iki ucu da içerir.',
 close:'Kapat', previous:'Önceki kart', next:'Sonraki kart', flip:'Kartı çevir', front:'Ön yüz', back:'Arka yüz', tilt:'Kartı elinize alın', tiltOn:'Eğim etkin', tiltDenied:'Eğim kullanılamıyor; kartı dokunarak çevirebilirsiniz.', viewerHint:'Dokunarak çevirin · Yana kaydırarak ilerleyin',
 play:'Oyna', timelineHint:'Şeridi yana kaydırın →', levelDescriptions:{silsile:['Ardışık beş saltanat, beş halka.','Asırlar arasından dokuz kart.','Otuz altı kart, tek hanedan.'],hafiza:['Altı hayatın iki yüzünü birleştirin.','On çift kartı birlikte açın.','On sekiz çiftlik geniş bir divan.'],terazi:['Dört kartla dengeyi kurun.','Altı saltanatı iki kefeye paylaştırın.','Bir yüzyılın saltanatlarını tartın.'],hazine:['İki padişahımızın bilgilerini birleştirin.','Üç kartın hatırasını okuyun.','Dört kartla bilgi sofrasını genişletin.'],pusula:['Fethin yılıyla başlayın.','Bir başka asrın kapısını açın.','Son dönemin kartlarını inceleyin.']}, progress:(a,b,u)=>`${a} / ${b} ${u}`, units:{silsile:'halka',hafiza:'çift',terazi:'kart',hazine:'bilgi',pusula:'yıl'},
 chooseLevel:'Bir kademe seçin', level:'Kademe', restart:'Yeniden başla', levels:'Kademelere dön', selected:'Seçildi', selectCard:'Önce bir kart seçin.', selectStrip:'Önce bir bilgi şeridi seçin.', placed:'Yerine yerleşti.', pending:'Henüz sırasına oturmadı', another:'Bu bilgi başka bir kartın', ring:n=>`${n}. halka`,
 chainDone:n=>`Silsile tamamlandı: ${n} halka, tek zincir.`, elapsed:s=>`Geçen süre: ${Math.floor(s/60)} dakika ${s%60} saniye`,
 memoryDone:'Divan tamamlandı. Açılan kartlar albümünüze mühürlendi.', memoryWait:'Biraz sonra iki kartı yeniden açabilirsiniz.',
 left:'Sol kefe', right:'Sağ kefe', deck:'Deste', weight:n=>`${Number.isInteger(n)?n:n.toLocaleString('tr-TR')} yıl`, months:'3 ay',
 balanceDone:(a,b)=>a===b?`Terazi dengede: iki kefede ${a.toLocaleString('tr-TR')}’er yıl saltanat.`:`Terazi dengede: ${a.toLocaleString('tr-TR')} ve ${b.toLocaleString('tr-TR')} yıl saltanat.`,
 balanceStatus:d=>`Kefeler arasındaki fark: ${d.toLocaleString('tr-TR')} yıl`, centuryChoice:'Yüzyıl seçin', centuryNote:'Dengelenebilen kart grubu bulunan yüzyıllar gösterilir.',
 treasureDone:'Kartlar tamamlandı; şimdi birlikte okuyalım', yearLabel:'Yıl seçin', yearInput:'Yıl', save:'Kaydet', saving:'Görsel hazırlanıyor.', saved:'Görsel hazırlandı.', saveError:'Görsel hazırlanamadı; yeniden deneyebilirsiniz.',
 fetret:'1402–1413 yılları Fetret Devri’dir; Yıldırım Bayezid Han’ın oğulları arasında taht mücadelesi sürmüştür.',
 reign:(p,n)=>`${p.hitap} — ${p.sira===33?'3 aylık saltanatı':`${n}. saltanat yılı`}`,
 compassNote:'Geçiş yıllarında aynı yılın bütün saltanatları gösterilir. Saltanat yılı, ilgili dönemin başlangıcı birinci yıl sayılarak hesaplanır.',
 compassDone:'Yıl Pusulası keşfi tamamlandı.', finishExplore:'Keşfi tamamla', yearRange:'1299–1922 arasında bir yıl seçin.',
 orientation:'Kart görünümü', portrait:'Kart yelpazesi', rules:'Etkinlik kuralları', noScripts:'Bu albümü kullanmak için JavaScript etkin olmalıdır.'
};
