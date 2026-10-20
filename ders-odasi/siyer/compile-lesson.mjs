export function compileLesson(lesson, renderFrame) {
 const num=String(lesson.id).padStart(2,'0'), id='siyer-'+num, p='v2-'+num+'-';
 const renk=['#176b71','#635044','#365c91','#6b5189','#2f7060','#526843','#486a87','#855441','#57629a','#326f65'][lesson.module-1];
 const src=lesson.sources.map(s=>s.title+': '+s.url).join('\n');
 const note=(time,text)=>time+' • '+text+'\n'+lesson.teacher.differentiation;
 const opening=[
 {id:p+'kapak',tur:'kapak',ust:'SİYER YOLCULUĞU · '+lesson.module+'. ÜNİTE · '+lesson.id+'. DERS',baslik:lesson.title,alt:lesson.date+' · 10 dakika · '+lesson.objective,gorsel:'../../siyer/assets/atlas-cover.png',not:note('0:00–0:20',lesson.teacher.misconception)+'\nKaynaklar:\n'+src},
 {id:p+'tahmin',tur:'anket',baslik:'Önce düşünelim',soru:lesson.hook.question,secenekler:lesson.hook.options,ogrenciNotu:'Bu bir başlangıç tahmini; puan verilmez.',not:note('0:20–1:00',lesson.hook.note)}
 ];
 const illustrations=lesson.frames.map((f,i)=>renderFrame(lesson,f,i));
 const slides=lesson.frames.map((f,i)=>({id:p+'anlatim-'+(i+1),tur:'slayt',baslik:f.title,gorsel:'slayt/'+String(i+1).padStart(2,'0')+'.svg',ses:'ses/s'+String(i+1).padStart(2,'0')+'.mp3',metin:f.narration,kenburns:false,vurgular:illustrations[i].hotspots,not:note((i+1)+':00–'+(i+2)+':00',f.narration+'\nGörseldeki etiketlere dokunun: '+f.labels.join(' • '))}));
 const g=lesson.game;let game;
 if(g.kind==='sequence')game={tur:'sirala',adimlar:g.items.map((x,i)=>({id:p+'adim-'+i,metin:x.text,aciklama:x.explanation,ikon:'kitap',renk})),sonBaslik:'Sıra neden böyle?',sonMetin:g.items.map(x=>x.explanation).join(' ')};
 else if(g.kind==='classify')game={tur:'siniflandir',alanlar:g.groups.map((ad,i)=>({id:p+'grup-'+i,ad,ikon:i?'goz':'kitap',renk:i?'#9b6b32':renk})),kartlar:g.items.map((x,i)=>({id:p+'kart-'+i,metin:x.text,alan:p+'grup-'+x.group,aciklama:x.explanation})),sonMetin:'Seçimlerini gerekçeleriyle birlikte düşün. '+lesson.teacher.misconception};
 else if(g.kind==='match')game={tur:'eslestir',ciftler:g.pairs.map((x,i)=>({id:p+'cift-'+i,sol:x.left,sag:x.right}))};
 else throw Error('Unsupported game '+g.kind);
 Object.assign(game,{id:p+'oyun',baslik:g.title,yonerge:g.prompt,not:note('5:00–7:00',g.prompt+'\n'+lesson.teacher.misconception)});
 const games=[game];
 if(g.kind==='match')games.push({id:p+'gerekceler',tur:'kartlar',baslik:'Eşleşmelerin gerekçesi',zorunlu:false,kartlar:g.pairs.map((x,i)=>({on:x.left,arka:x.explanation,not:x.right,ikon:'kitap',renk})),not:note('5:00–7:00 içinde', 'Eşleştirme ardından gerekçeleri birlikte kontrol edin.')});
 const d=lesson.decision;
 games.push({id:p+'karar',tur:'hikaye',baslik:'Bilgini kullan',rozet:'Karar ver',sahneler:[{id:p+'durum',gorsel:'slayt/04.svg',metin:'Öğrendiğimiz bilgiyi bir düşünme durumunda kullanalım.',soru:d.question,secenekler:d.options.map((metin,i)=>({metin,iyi:i===d.answer,sonuc:d.explanations[i]}))}],sonBaslik:'Seçiminin gerekçesini açıkla',sonMetin:d.explanations[d.answer],not:note('7:00–8:00', 'Seçimlerden sonra açıklamaları okutun. Bu etkinlik tarihî kişileri canlandırma etkinliği değildir.')});
 const end=[
 {id:p+'kontrol',tur:'coktan',baslik:'Üç soruda kendini yokla',sorular:lesson.quiz.map((q,i)=>({id:p+'soru-'+i,metin:q.question,secenekler:q.options,dogru:q.answer,aciklama:q.explanation})),not:note('8:00–9:00','Yanlış seçeneklerin neden uygun olmadığını açıklamalardan inceleyin.')},
 {id:p+'cikis',tur:'dusun',baslik:'Yanımda kalan',soru:lesson.teacher.exit,ipucu:'Kendi cümlenle kısa bir cevap yaz. Kişisel bilgi paylaşmana gerek yok.',tesekkur:'Düşüncen kaydedildi.',not:note('9:00–9:45',lesson.teacher.exit)},
 {id:p+'kapanis',tur:'kapanis',baslik:lesson.id===54?'Bir hayatı anlamak':'Bugünden yanımıza kalan',maddeler:[{baslik:'Öğrendim',metin:lesson.frames[0].title,ikon:'kitap',renk},{baslik:'Bağ kurdum',metin:lesson.frames[2].title,ikon:'goz',renk:'#486a87'},{baslik:'Kendi cümlem',metin:'Cevabımı gerekçesiyle açıklıyorum.',ikon:'kalp',renk:'#986824'}],dua:'Öğrendiklerimizle amel etmeyi Allahü teâlâ nasip etsin.',not:'9:45–10:00 • '+lesson.teacher.exit+'\nKaynaklar:\n'+src}
 ];
 const native={id,ad:lesson.title,kisaAd:'Siyer '+lesson.id,seri:'Siyer Yolculuğu',yas:'10–14 yaş',sure:10,ozet:lesson.objective,kapakGorseli:'../../siyer/assets/atlas-cover.png',basariEsigi:.6,icerikSurumu:2,kaynaklar:lesson.sources,bolumler:[{id:p+'baslangic',ad:'Merak et',renk,bloklar:opening},{id:p+'kesfet',ad:'Dinle ve keşfet',renk,bloklar:slides},{id:p+'uygula',ad:'Oyna ve düşün',renk,bloklar:games},{id:p+'pekiştir',ad:'Kendini yokla',renk,bloklar:end}]};
 const setup="(function(){if(typeof document!=='undefined'){document.documentElement.classList.add('siyer-v2','siyer-"+num+"');if(!document.getElementById('siyer-theme')){var s=document.createElement('link');s.id='siyer-theme';s.rel='stylesheet';s.href=new URL('../../siyer/lesson-theme.css',document.currentScript.src).href;document.head.appendChild(s);}"+(lesson.id===54?"if(DO.efekt){DO.efekt.zafer=function(){};}DO.konfeti=function(){};":"")+"}DO.dersKaydet("+JSON.stringify(native,null,2)+");})();\n";
 return {native,script:setup,illustrations};
}
