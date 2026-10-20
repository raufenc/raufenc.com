function renderFrame(lesson, frame, index) {
  'use strict';
  const kinds=['map','route','timeline','family','market','home','book','city','community','agreement','journey','values'];
  if(!lesson||!frame||!kinds.includes(frame.kind)) throw Error('Unknown illustration kind: '+(frame&&frame.kind));
  if(!Array.isArray(frame.labels)||frame.labels.length<3||frame.labels.length>5||frame.labels.some(x=>typeof x!=='string'||!x.trim()))throw Error('Expected 3–5 nonempty labels');
  const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const palettes=[['#176B71','#D6EBE6','#BE6A38'],['#635044','#F0E2C8','#99692C'],['#365C91','#DBE6F4','#946427'],['#6B5189','#E8E0F0','#94583A'],['#2F7060','#DCECE2','#986824'],['#526843','#E2E9D6','#936134'],['#486A87','#DCEAF0','#A35E35'],['#855441','#EBDDD2','#496E59'],['#57629A','#E1E3F2','#99632E'],['#326F65','#D9EBE4','#94672A']];
  const [accent,pale,ochre]=palettes[(Number(lesson.module||1)-1+10)%10],ink='#193750',paper='#FFFCF3',sand='#EEDDC0',line='#C9BDA6';
  const uid='f'+String(lesson.id).replace(/[^a-z0-9]/gi,'')+'_'+Number(index||0),grad=uid+'sky',wood=uid+'wood',shadow=uid+'shadow';
  const T=(x,y,s,size=24,fill=ink,weight=500,anchor='start')=>'<text x="'+x+'" y="'+y+'" font-family="Arial, sans-serif" font-size="'+size+'" fill="'+fill+'" font-weight="'+weight+'" text-anchor="'+anchor+'">'+E(s)+'</text>';
  const P=(d,fill='none',stroke=ink,w=3,other='')=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" '+other+'/>';
  const R=(x,y,w,h,fill,rx=12,stroke='none',sw=1)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
  const C=(x,y,r,fill,stroke='none',w=1)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+w+'"/>';
  const ellipse=(x,y,rx,ry,fill)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'"/>';
  function wrap(s,max){const out=[];let a='';for(const word of String(s).split(/\s+/)){if((a+' '+word).trim().length>max&&a){out.push(a);a=word;}else a=(a+' '+word).trim();}if(a)out.push(a);return out;}
  function lines(x,y,s,max=30,size=24,fill=ink,weight=500,gap=30){return wrap(s,max).map((v,i)=>T(x,y+i*gap,v,size,fill,weight)).join('');}
  function roof(x,y,w,h,fill=paper){return R(x,y,w,h,fill,4,ink,3)+P('M'+x+' '+y+' l'+w/2+' -'+h/3+' '+w/2+' '+h/3,fill,ink,3);}
  function house(x,y,s=1,color=paper){return '<g transform="translate('+x+' '+y+') scale('+s+')">'+R(0,0,120,100,color,6,ink,3)+P('M-10 0 H130 L113 -21 H7 Z',sand,ink,3)+P('M45 100 V52 Q60 25 75 52 V100',ochre,ink,2)+R(15,25,18,24,pale,3,ink,2)+R(88,25,18,24,pale,3,ink,2)+P('M20 -21 V-37 H40 V-21 M80 -21 V-37 H100 V-21','none',ink,4)+'</g>';}
  function palm(x,y,s=1){return '<g transform="translate('+x+' '+y+') scale('+s+')">'+P('M0 0 Q-9 -65 0 -125','none',ochre,14)+P('M0 -123 Q-57 -165 -85 -130 Q-45 -150 0 -123 M0 -123 Q58 -164 86 -132 Q45 -146 0 -123 M0 -123 Q-25 -186 -53 -172 Q-18 -162 0 -123 M0 -123 Q21 -185 50 -168 Q22 -166 0 -123 M0 -123 Q-66 -118 -78 -82 Q-43 -110 0 -123 M0 -123 Q60 -119 77 -82 Q42 -109 0 -123',accent,accent,4)+'</g>';}
  function mountain(x,y,w=110,h=85){return P('M'+(x-w/2)+' '+y+' L'+x+' '+(y-h)+' L'+(x+w/2)+' '+y+' Z','#B8B29A','none',0)+P('M'+(x-w/2)+' '+y+' L'+x+' '+(y-h)+' L'+(x-4)+' '+y+' Z','#9DA28D','none',0);}
  function pot(x,y,s=1,fill=ochre){return '<g transform="translate('+x+' '+y+') scale('+s+')">'+P('M-20 -45 H20 L16 -25 Q50 8 26 40 Q0 50 -26 40 Q-50 8 -16 -25 Z',fill,ink,3)+ellipse(0,-45,22,7,paper)+P('M-27 -8 Q-58 -15 -51 10 Q-47 26 -33 22 M27 -8 Q58 -15 51 10 Q47 26 33 22','none',ink,4)+'</g>';}
  function lantern(x,y,s=1){return '<g transform="translate('+x+' '+y+') scale('+s+')">'+P('M0 -68 V-45 M-18 -45 Q0 -72 18 -45 L28 -30 H-28 Z',ochre,ink,3)+P('M-28 -30 H28 L22 35 H-22 Z','#F5CD68',ink,3)+P('M-22 35 H22 L30 47 H-30 Z',ochre,ink,3)+P('M-8 -25 V28 M8 -25 V28','none',paper,4)+'</g>';}
  function scroll(x,y,w=260,h=250,fill=paper){return R(x,y,w,h,fill,14,ink,3)+ellipse(x+w/2,y,w/2,15,sand)+ellipse(x+w/2,y+h,w/2,15,sand)+P('M'+(x+25)+' '+(y+60)+' H'+(x+w-25)+' M'+(x+25)+' '+(y+100)+' H'+(x+w-25)+' M'+(x+25)+' '+(y+140)+' H'+(x+w-70),'none',line,8);}
  function books(x,y,s=1){return '<g transform="translate('+x+' '+y+') scale('+s+')">'+R(0,0,160,28,accent,5,ink,2)+R(10,-35,155,28,ochre,5,ink,2)+R(-8,-70,168,28,pale,5,ink,2)+P('M12 8 H144 M22 -27 H150 M7 -61 H143','none',paper,5)+'</g>';}
  function openBook(x,y,s=1){return '<g transform="translate('+x+' '+y+') scale('+s+')">'+P('M0 0 Q-80 -55 -200 -35 V180 Q-90 165 0 220 Q90 165 200 180 V-35 Q80 -55 0 0 Z',paper,ink,5)+P('M0 0 V220','none',ochre,6)+P('M-200 180 L-214 198 Q-90 178 0 238 Q90 178 214 198 L200 180','none',accent,12)+[0,1,2,3].map(i=>P('M-165 '+(25+i*35)+' Q-85 '+(5+i*35)+' -35 '+(40+i*35)+' M35 '+(40+i*35)+' Q85 '+(5+i*35)+' 165 '+(25+i*35),'none',line,7)).join('')+'</g>';}
  function compass(x,y){return C(x,y,35,paper,accent,2)+P('M'+x+' '+(y-25)+' L'+(x+9)+' '+y+' '+x+' '+(y+25)+' '+(x-9)+' '+y+' Z',accent,ink,2)+T(x,y-45,'K',18,ink,700,'middle');}
  function balance(x,y,s=1){return '<g transform="translate('+x+' '+y+') scale('+s+')">'+P('M0 -150 V170 M-65 170 H65 M-120 -100 H120','none',ink,13)+C(0,-100,19,ochre,ink,3)+P('M-120 -100 L-174 30 M-120 -100 L-66 30 M120 -100 L66 30 M120 -100 L174 30','none',ochre,5)+P('M-179 30 H-61 Q-75 90 -120 90 Q-165 90 -179 30 Z',pale,ink,4)+P('M61 30 H179 Q165 90 120 90 Q75 90 61 30 Z',sand,ink,4)+'</g>';}
  let art='',anchors=[];
  const backdrop=R(58,218,1012,560,paper,26,'#DDD2BF',2);
  switch(frame.kind){
        case 'map':{
      const lid=Number(String(lesson.id).replace(/\D/g,'')),fi=Number(index||0);
      const dot=(x,y,name,where='right')=>{
        art+=C(x,y,10,accent,paper,3);
        art+=T(where==='left'?x-23:x+23,y-14,name,22,ink,700,where==='left'?'end':'start');
      };
      const arrow=(x1,y1,x2,y2,color=ochre,dash=false)=>{
        const angle=Math.atan2(y2-y1,x2-x1),len=16;
        art+=P('M'+x1+' '+y1+' L'+x2+' '+y2,'none',color,5,dash?'stroke-dasharray="8 10"':'');
        art+=P('M'+(x2-len*Math.cos(angle-.5))+' '+(y2-len*Math.sin(angle-.5))+' L'+x2+' '+y2+' '+(x2-len*Math.cos(angle+.5))+' '+(y2-len*Math.sin(angle+.5)),'none',color,5);
      };
      const chip=(x,y,w,title,sub)=>{
        art+=R(x,y,w,112,paper,16,accent,3)+lines(x+22,y+38,title,24,23,ink,700,27);
        if(sub)art+=lines(x+22,y+82,sub,29,18,accent,500,22);
      };
      const note=s=>{art+=T(564,730,s,18,ink,500,'middle');};
      const hbase=()=>{
        art+=R(80,240,968,514,'#CCE3E6',18);
        art+=P('M80 240 H360 L382 336 L365 408 L403 500 L420 605 L435 754 H80 Z','#D8D1AC','none',0);
        art+=P('M452 240 H1048 V754 H544 L521 650 L498 546 L462 452 L422 358 Z',sand,'none',0);
        art+=P('M360 240 L382 336 L365 408 L403 500 L420 605 L435 754 M452 240 L422 358 L462 452 L498 546 L521 650 L544 754','none','#77A4A8',4);
        art+=T(848,283,'ARABİSTAN',24,ink,700,'middle')+T(210,290,'AFRİKA',22,ink,700,'middle')+T(338,520,'Kızıldeniz',21,accent,600,'middle')+compass(970,665);
      };
      const local=label=>{art+=R(80,240,968,514,pale,18)+T(115,280,label,19,accent,700);};
      if(lid===1&&fi===0){
        hbase();
        art+=P('M507 330 Q550 330 565 390 L634 624 Q600 659 561 631 L492 416 Z','#D3B578',accent,2,'opacity=".75"');
        art+=T(550,490,'HİCAZ',26,ink,700)+mountain(685,430,100,85)+mountain(720,510,100,80);
        dot(600,618,'Mekke');
        anchors=[[850,365],[550,490],[420,570],[600,618]];
      }else if(lid===1){
        hbase();dot(600,600,'Mekke');dot(572,390,'Yesrib / Medine');dot(756,642,'Tâif');
        art+=mountain(785,600,100,66)+mountain(860,650,100,75);anchors=[[600,600],[572,390],[756,642]];
      }else if(lid===13){
        local('Mekke çevresi · yer ve mekân türleri');
        art+=mountain(760,577,370,220)+mountain(890,590,245,155);
        art+=house(210,565,.8)+house(313,601,.65);
        art+=P('M695 513 Q726 447 756 513 Z',ink,ink,2);
        art+=P('M370 620 Q510 625 690 530','none',ochre,5,'stroke-dasharray="8 10"');
        art+=T(245,505,'Mekke',27,ink,700)+T(738,326,'Nur Dağı',25,ink,700)+T(611,422,'Hira mağarası',23,ink,700);
        note('Şehir, dağ ve mağara birbirinden farklı mekân türleridir.');
        anchors=[[275,602],[710,475],[826,423],[729,512]];
      }else if(lid===20){
        hbase();dot(618,480,'Mekke');dot(225,635,'Habeşistan');
        arrow(590,505,275,615,ochre,true);note('Ana coğrafî ilişki · kesin deniz rotası gösterilmez.');
        anchors=[[618,480],[435,555],[225,635]];
      }else if(lid===24){
        local('İsrâ · başlangıç ve varış mekânları');
        chip(135,535,330,'Mescid-i Harâm','Mekke');chip(660,310,330,'Mescid-i Aksâ','Kudüs');
        arrow(440,528,658,434,ochre);art+=T(541,461,'İsrâ',27,ochre,700,'middle');
        art+=C(300,504,30,sand,accent,3)+C(825,446,30,sand,accent,3);
        note('Bu bağlantı, yolculuğun gerçekleşme biçiminin tasviri değildir.');
        anchors=[[300,504],[825,446],[548,487]];
      }else if(lid===25){
        hbase();dot(575,385,'Yesrib');dot(640,620,'Mekke');
        arrow(595,420,626,583,ochre);chip(755,460,240,'Hac mevsimi','Mekke’de görüşme');
        anchors=[[575,385],[640,620],[800,500]];
      }else if(lid===28){
        local('Varış bölgesi · hicretin son aşaması');
        art+=P('M180 682 Q330 655 430 575 T700 385','none',paper,45);
        arrow(180,680,425,565,ochre);arrow(472,532,705,387,accent);
        art+=house(384,480,.7)+house(680,323,.75)+house(805,350,.65);
        art+=T(430,634,'Kubâ',25,ink,700,'middle')+T(758,315,'Medine merkezi',25,ink,700,'middle');
        note('Kubâ ve Medine merkezi ayrı yerleşim noktalarıdır; ölçekli plan değildir.');
        anchors=[[265,645],[443,554],[754,398]];
      }else if(lid===31&&fi===0){
        local('Medine’den bakış · namazda yönelinen doğrultu');
        dot(434,340,'Kudüs');dot(570,487,'Medine');dot(692,645,'Mekke');
        arrow(543,457,459,371,accent);arrow(592,515,667,611,ochre);
        art+=T(315,423,'Önce: Kudüs yönü',21,accent,700,'middle')+T(824,570,'Sonra: Kâbe yönü',21,ochre,700,'middle')+compass(964,336);
        note('Oklar yolculuğu değil, kıble değişimindeki iki ayrı dönemi gösterir.');
        anchors=[[434,340],[570,487],[692,645]];
      }else if(lid===31){
        local('Farklı konumlardan ortak kıbleye yöneliş');
        const ps=[[235,360],[880,370],[260,655],[880,650]];
        ps.forEach(p=>{art+=C(p[0],p[1],28,paper,accent,3);arrow(p[0]+(p[0]<565?40:-40),p[1]+(p[1]<500?25:-25),565+(p[0]<565?-75:75),500+(p[1]<500?-45:45),accent);});
        art+=R(474,445,182,110,paper,20,ochre,4)+T(565,490,'KÂBE',30,ink,700,'middle')+T(565,526,'Ortak kıble',22,ink,700,'middle');
        note('Kavramsal şema · gerçek kıble açısını belirlemek için kullanılamaz.');
        anchors=[[235,360],[394,413],[565,500]];
      }else if(lid===34){
        local('Uhud · sorumlulukların birbirine bağlı olması');
        art+=mountain(300,430,290,130)+mountain(505,440,310,150)+mountain(720,431,270,120);
        art+=T(473,322,'Uhud çevresi',25,ink,700,'middle');
        art+=R(165,515,280,105,paper,16,accent,3)+T(305,559,'Görev noktası',24,ink,700,'middle');
        art+=R(656,515,284,105,paper,16,accent,3)+T(798,559,'Diğer görevler',24,ink,700,'middle');
        art+=P('M451 568 H650','none',ochre,7)+C(550,568,19,paper,ochre,3);
        note('Sorumluluk ilişkisi şemasıdır; birlik veya taktik yerleşimi değildir.');
        anchors=[[505,390],[305,587],[550,568]];
      }else if(lid===36){
        local('Medine çevresi · farklı arazi özellikleri');
        art+=R(332,420,440,248,paper,90,accent,3)+house(412,513,.8)+house(600,535,.7);
        art+=T(555,470,'MEDİNE',28,ink,700,'middle');
        for(let n=0;n<4;n++){art+=mountain(180+n%2*58,444+n*61,95,66)+mountain(864+n%2*62,444+n*61,95,66);}
        art+=P('M330 363 Q551 330 773 363','none',ochre,13,'stroke-dasharray="19 10"');
        art+=T(555,310,'Savunmanın güçlendirildiği kesim',22,ink,700,'middle');
        note('Arazi farklarını açıklayan şema · ayrıntılı kuşatma planı değildir.');
        anchors=[[555,551],[896,536],[555,351]];
      }else if(lid===37){
        local('Ziyaret hedefi ve beklenen yer');
        dot(665,329,'Medine yönü');dot(382,540,'Hudeybiye çevresi','left');dot(816,595,'Mekke');
        arrow(632,366,407,503,accent);arrow(425,555,773,590,ochre,true);
        art+=P('M592 544 V603','none',ochre,9)+T(615,643,'O yıl giriş gerçekleşmedi',22,ink,700,'middle');
        note('Yaklaşık konum ilişkisi; kafilenin kesin güzergâhı değildir.');
        anchors=[[546,420],[382,540],[816,595]];
      }else if(lid===39||lid===49){
        const outgoing=lid===39;
        local(outgoing?'İletişim şeması · Medine’den gönderilen mektuplar':'Ziyaret şeması · Medine’ye gelen farklı heyetler');
        art+=C(565,495,90,paper,accent,4)+T(565,501,'Medine',29,ink,700,'middle');
        const ns=[[225,349],[881,349],[230,649],[880,649]];
        ns.forEach((p,n)=>{
          art+=R(p[0]-90,p[1]-37,180,74,paper,12,accent,3)+T(p[0],p[1]+7,outgoing?'Muhatap '+(n+1):'Heyet '+(n+1),22,ink,700,'middle');
          const dx=p[0]-565,dy=p[1]-495,len=Math.hypot(dx,dy),sx=565+dx/len*112,sy=495+dy/len*112,ex=p[0]-dx/len*105,ey=p[1]-dy/len*50;
          if(outgoing)arrow(sx,sy,ex,ey,ochre);else arrow(ex,ey,sx,sy,ochre);
        });
        note('Oklar ilişkiyi gösterir; muhatapların kesin coğrafî konumlarını göstermez.');
        anchors=outgoing?[[565,495],[881,349],[695,431]]:[[225,349],[695,431],[565,495],[565,564]];
      }else if(lid===40){
        hbase();dot(560,337,'Hayber');dot(594,486,'Medine');dot(648,653,'Mekke');
        arrow(587,452,567,374,accent);arrow(606,524,637,618,ochre,true);
        anchors=[[594,486],[560,337],[576,407]];
      }else if(lid===47){
        hbase();dot(568,361,'Medine');dot(609,605,'Mekke');dot(798,648,'Tâif');
        arrow(724,609,591,406,ochre);art+=T(745,473,'Medine’ye dönüş',23,ink,700,'middle');
        anchors=[[609,605],[798,648],[568,361],[671,528]];
      }else if(lid===48){
        hbase();dot(522,341,'Tebük');dot(634,634,'Medine');arrow(619,593,536,381,ochre);
        art+=T(700,478,'Kuzeye yolculuk',25,ink,700,'middle');
        anchors=[[634,634],[578,489],[522,341]];
      }else if(lid===52){
        local('Farklı konuşma yerleri · öğütlerin derlenmesi');
        chip(150,322,330,'Arafat','Konuşma yeri');chip(650,322,330,'Mina','Konuşma yeri');
        arrow(320,457,484,584,accent);arrow(814,457,645,584,accent);
        art+=R(385,590,360,83,paper,15,ochre,3)+T(565,641,'Veda öğütleri',27,ink,700,'middle');
        note('Metinlerin ilişkisini gösteren şema · mekânlar arası yol haritası değildir.');
        anchors=[[318,377],[816,377],[425,532],[565,632]];
      }else{
        local('Bu karedeki yer ve kavram ilişkileri');
        const xs=frame.labels.length===3?[240,565,890]:frame.labels.length===4?[200,440,680,920]:[165,365,565,765,965];
        anchors=xs.map((x,i)=>[x,485]);
        anchors.forEach((p,i)=>{art+=C(p[0],p[1],55,paper,accent,4);if(i)art+=P('M'+(p[0]-60)+' 485 H'+(anchors[i-1][0]+60),'none',ochre,4);});
        note('Kavramsal şema · kesin coğrafî konum veya güzergâh göstermez.');
      }
      break;}
    case 'route':{
      art+=R(80,240,968,514,'url(#'+grad+')',18)+P('M80 550 Q250 485 414 547 T740 548 T1048 520 V754 H80 Z',sand,'none',0);
      art+=P('M80 650 Q260 555 510 638 T1048 625 V754 H80 Z','#DCC392','none',0);
      art+=mountain(230,460,220,130)+mountain(390,470,190,110)+mountain(860,430,240,125);
      art+=P('M155 675 C230 540 340 700 450 575 S650 590 715 440 S850 480 959 340','none',paper,30);
      art+=P('M155 675 C230 540 340 700 450 575 S650 590 715 440 S850 480 959 340','none',ochre,5,'stroke-dasharray="10 14"');
      anchors=[[155,675],[355,625],[540,545],[718,443],[959,340]];anchors=Array.from({length:frame.labels.length},(_,i)=>anchors[Math.round(i*4/(frame.labels.length-1))]);
      anchors.forEach((p,i)=>art+=C(p[0],p[1],20,paper,accent,4)+T(p[0],p[1]+7,String(i+1),20,ink,700,'middle'));
      art+=house(125,530,.66)+house(863,240,.72)+palm(810,620,.65)+pot(275,705,.46)+compass(980,695);
      break;}
    case 'timeline':{
      art+=R(80,240,968,514,pale,18);
      art+=P('M132 501 H1005 M974 480 L1005 501 974 522','none',accent,12);
      const xs=Array.from({length:frame.labels.length},(_,i)=>160+i*780/(frame.labels.length-1));anchors=xs.map((x,i)=>[x,501]);
      xs.forEach((x,i)=>{art+=C(x,501,28,paper,accent,5)+T(x,509,String(i+1),24,ink,700,'middle');let up=i%2===0,y=up?315:575;
        art+=P('M'+x+' '+(up?473:529)+' V'+(up?400:575),'none',ochre,3)+R(x-68,y,136,85,paper,14,line,2);
        art+=T(x,y+55,String(i+1).padStart(2,'0'),38,accent,700,'middle');
        art+=R(x-35,up?265:695,70,8,ochre,4);
      });
      art+=T(120,725,'ÖNCE',18,ink,700)+T(1000,725,'SONRA',18,ink,700,'end');
      break;}
        case 'family':{
      const lid=Number(String(lesson.id).replace(/\D/g,'')),fi=Number(index||0);
      art+=R(80,240,968,514,pale,18);
      if(lid===11&&fi===0){
        art+=R(160,277,810,124,paper,18,accent,3);
        art+=T(565,316,'Peygamber Efendimiz (sallallahü aleyhi ve sellem)',23,ink,700,'middle');
        art+=T(565,349,'ile Hadîce vâlidemizin',23,ink,600,'middle')+T(565,382,'kız evlatları',23,accent,700,'middle');
        art+=P('M565 404 V465 M205 465 H925','none',ochre,5);
        anchors=[[205,590],[445,590],[685,590],[925,590]];
        anchors.forEach((p,i)=>{
          art+=P('M'+p[0]+' 465 V530','none',ochre,5)+R(p[0]-99,530,198,122,paper,15,accent,3);
          art+=T(p[0],575,String(i+1),24,accent,700,'middle')+T(p[0],628,'Kız evlat',21,ink,600,'middle');
        });
        art+=T(565,721,'Dört isim aynı kuşaktadır; kart numaraları doğum sırası değildir.',19,ink,500,'middle');
      }else if(lid===11){
        art+=R(205,288,720,103,paper,18,accent,3)+T(565,332,'Hadîce vâlidemizden dünyaya gelen oğullar',25,ink,700,'middle')+T(565,369,'Aynı kuşaktaki iki evlat bağı',21,accent,600,'middle');
        art+=P('M565 392 V436 M322 436 H808 M322 436 V492 M808 436 V492','none',ochre,5);
        art+=R(195,492,254,108,paper,16,accent,3)+R(681,492,254,108,paper,16,accent,3);
        art+=T(322,536,'Kāsım',27,ink,700,'middle')+T(808,536,'Abdullah',27,ink,700,'middle');
        art+=R(358,650,414,62,paper,14,line,2)+T(565,691,'Küçük yaşta vefat',23,ink,600,'middle');
        anchors=[[322,571],[808,571],[565,676]];
      }else{
        const positions=frame.labels.length===3?[[260,390],[860,390],[565,650]]:[[260,365],[860,365],[260,650],[860,650],[565,510]];
        const hubTitle=lid===30?'Dayanışma bağı':lid===55?'Evde paylaşım':'Yakınlık ve bakım bağları';
        art+=R(375,456,380,96,paper,18,accent,3)+T(565,513,hubTitle,25,ink,700,'middle');
        anchors=positions.slice(0,frame.labels.length);
        anchors.forEach((p,i)=>{
          const endx=p[0]<565?375:p[0]>565?755:565,endy=p[1]<500?470:540;
          art+=P('M'+p[0]+' '+p[1]+' L'+endx+' '+endy,'none',ochre,4,'stroke-dasharray="7 8"');
          art+=R(p[0]-103,p[1]-45,206,90,paper,15,accent,3)+T(p[0],p[1]+8,String(i+1),28,accent,700,'middle');
        });
        art+=T(565,728,'Bağ ve bakım kavramlarını gösterir; bir soy ağacı değildir.',19,ink,500,'middle');
      }
      break;}
        case 'market':{
      if(Number(String(lesson.id).replace(/\D/g,''))===58&&Number(index||0)===0){
        art+=R(80,240,968,514,pale,18)+T(118,282,'Yiyecek yığınının kesiti',24,ink,700);
        art+=P('M185 655 Q267 415 555 345 Q835 412 940 655 Z','#E6BE68',ink,4);
        art+=P('M185 655 Q213 573 253 527 Q560 560 871 527 Q917 595 940 655 Z','#A88651',ink,3);
        for(let row=0;row<6;row++)for(let col=0;col<16;col++){
          const x=280+col*36+(row%2)*15,y=420+row*38;
          if(y>655||x>900||Math.abs(x-555)>(y-335)*1.1)continue;
          art+=ellipse(x,y,10,5,y>540?'#8C7049':'#F3D18B');
        }
        art+=P('M185 655 H940','none',ink,5);
        art+=R(125,300,295,77,paper,13,accent,3)+T(273,347,'Dışarıdan görünen üst',21,ink,700,'middle');
        art+=R(685,300,310,77,paper,13,accent,3)+T(840,347,'Kesit ile görünen alt',21,ink,700,'middle');
        art+=P('M300 385 L405 445 M837 385 L779 579','none',accent,3,'stroke-dasharray="5 7"');
        art+=T(555,491,'Kuru görünen üst bölüm',25,ink,700,'middle')+T(557,617,'Islak alt bölüm',25,paper,700,'middle');
        art+=T(565,721,'Ürünün görünmeyen durumu da alıcıya açıklanmalıdır.',20,ink,600,'middle');
        anchors=[[470,435],[565,602],[855,605],[840,338]];
      }else{
        art+=R(80,240,968,514,'url(#'+grad+')',18)+R(80,600,968,154,sand,0);
        art+=R(125,350,322,287,paper,10,ink,3)+P('M110 350 L146 285 H426 L462 350 Z',accent,ink,3);
        for(let i=0;i<7;i++)art+=R(110+i*50,350,50,30,i%2?pale:accent,0,ink,1);
        art+=R(150,490,275,110,ochre,4,ink,3)+pot(190,455,.75)+pot(260,457,.62)+pot(350,455,.8);
        art+=balance(725,515,.78)+R(685,648,80,24,ochre,6,ink,3);
        art+=books(210,680,.78)+P('M420 645 L480 607 538 645 V710 H420 Z',pale,ink,3)+P('M431 645 H525 M480 609 V707','none',ochre,5);
        art+=R(835,640,132,65,paper,5,ink,3)+P('M851 652 H951 M851 671 H929 M851 690 H942','none',line,5);
        anchors=[[280,335],[230,466],[630,541],[820,541],[900,671]];
      }
      break;}
    case 'home':{
      art+=R(80,240,968,514,'url(#'+grad+')',18);
      art+=R(150,330,827,360,sand,8,ink,4)+P('M130 330 H995 L945 280 H180 Z',ochre,ink,4);
      art+=P('M195 690 V438 Q275 315 355 438 V690 M423 690 V438 Q503 315 583 438 V690 M650 690 V438 Q730 315 810 438 V690',paper,ink,4);
      art+=R(220,445,105,242,accent,7,ink,3)+P('M272 448 V686 M235 485 H310 M235 580 H310','none',ochre,4)+C(304,570,6,paper);
      art+=P('M388 690 H862 L965 754 H210 Z','#DEC38D',ink,3)+P('M430 705 H820 M385 730 H895','none',paper,6);
      art+=pot(500,625,.85)+pot(570,647,.56)+books(697,648,.65)+lantern(732,422,.58)+palm(920,680,.9);
      anchors=[[273,554],[500,622],[720,640],[732,414],[930,530]];break;}
    case 'book':{
      art+=R(80,240,968,514,pale,18);
      art+=ellipse(565,701,400,40,'#CAD3BE')+P('M230 680 L865 680 946 750 H150 Z',ochre,ink,4);
      art+=openBook(565,390,1.5)+books(178,653,.62)+lantern(940,430,.78);
      art+=P('M825 300 Q897 254 932 268 Q910 307 844 331 Z',paper,accent,3)+P('M813 342 L924 270','none',accent,4);
      art+=C(330,298,35,paper,ochre,3)+P('M309 298 H350 M330 277 V319','none',ochre,4);
      anchors=[[395,455],[738,455],[565,680],[914,290],[940,430]];break;}
    case 'city':{
      art+=R(80,240,968,514,'url(#'+grad+')',18);
      art+=P('M80 490 Q300 430 480 483 T1048 480 V754 H80 Z',sand,'none',0);
      art+=P('M95 690 Q350 560 564 614 T1040 592','none',paper,65)+P('M520 280 Q490 430 564 614 T640 754','none',paper,60);
      art+=house(150,390,.95)+house(290,565,.72)+house(735,365,.85)+house(855,565,.8)+house(420,315,.7);
      art+=R(515,428,205,140,paper,8,ink,3)+R(540,453,155,90,sand,5,ink,3);
      for(let i=0;i<4;i++)art+=R(528+i*57,410,13,33,ochre,2,ink,1);
      art+=P('M533 427 V399 H697 V427','none',accent,7)+palm(970,460,.8)+palm(405,675,.75);
      art+=C(604,642,31,'#BCDDE4',accent,5)+ellipse(604,642,15,10,'#80BBC3');
      anchors=[[217,445],[610,498],[790,400],[604,642],[908,611]];break;}
    case 'community':{
      art+=R(80,240,968,514,pale,18);
      const ps=[[305,340],[810,340],[275,655],[840,655],[565,485]];
      art+=P('M305 340 Q565 235 810 340 Q1000 500 840 655 Q565 760 275 655 Q110 500 305 340 Z','none','#91B3A2',21);
      ps.slice(0,4).forEach(p=>art+=P('M'+p[0]+' '+p[1]+' L565 485','none',ochre,5,'stroke-dasharray="8 10"'));
      ps.forEach((p,i)=>{art+=C(p[0],p[1],78,paper,accent,4);if(i===0)art+=openBook(p[0],p[1]-20,.28);else if(i===1)art+=house(p[0]-30,p[1]-20,.5);else if(i===2)art+=pot(p[0],p[1],.7);else if(i===3)art+=books(p[0]-40,p[1]+10,.5);else art+=P('M535 485 L555 506 599 459','none',accent,12);});
      anchors=ps;break;}
    case 'agreement':{
      art+=R(80,240,968,514,pale,18)+P('M100 695 H1028 L1048 754 H80 Z',ochre,'none',0);
      art+=scroll(290,315,430,345)+P('M320 315 Q550 280 690 315','none',ochre,4);
      art+=C(624,608,47,ochre,ink,3)+C(624,608,30,sand,ink,2)+P('M608 608 L621 620 641 593','none',ink,4);
      art+=P('M596 648 L580 719 611 703 630 731 646 651',accent,ink,3);
      art+=P('M766 553 Q863 361 938 330 Q933 435 784 574 Z',paper,accent,4)+P('M752 593 L927 344','none',ink,5)+pot(810,654,.6,accent);
      art+=P('M156 373 H218 M187 342 V404','none',ochre,7)+C(187,373,54,'none',ochre,3);
      anchors=[[390,373],[510,443],[624,607],[870,439],[810,652]];break;}
    case 'journey':{
      art+=R(80,240,968,514,'url(#'+grad+')',18)+C(947,300,30,'#F1C55D')+P('M80 460 Q240 375 390 465 T710 455 T1048 410 V754 H80 Z',sand,'none',0);
      art+=mountain(254,410,260,130)+mountain(740,423,270,140);
      art+=P('M95 714 Q275 575 445 648 T760 560 T1037 483','none',paper,52)+P('M95 714 Q275 575 445 648 T760 560 T1037 483','none',ochre,5,'stroke-dasharray="9 13"');
      const allStops=[[169,668],[370,619],[571,653],[776,550],[982,510]],ps=Array.from({length:frame.labels.length},(_,i)=>allStops[Math.round(i*4/(frame.labels.length-1))]);
      ps.forEach((p,i)=>{art+=C(p[0],p[1],23,paper,accent,5)+T(p[0],p[1]+7,String(i+1),20,ink,700,'middle');});
      art+=P('M420 494 L499 367 581 494 Z',accent,ink,4)+P('M471 494 L499 418 526 494 Z',paper,ink,3)+P('M400 494 H601','none',ochre,8);
      art+=palm(853,510,.7)+pot(120,558,.7)+R(625,701,148,34,ochre,8,ink,3)+R(645,685,108,20,sand,5,ink,2);
      anchors=ps;break;}
    case 'values':{
      art+=R(80,240,968,514,pale,18)+ellipse(565,716,325,29,'#BFCFBB');
      art+=balance(565,495,1.05);
      art+=openBook(435,470,.28)+books(652,475,.43)+P('M548 315 L565 282 582 315 618 320 592 345 598 382 565 364 532 382 538 345 512 320 Z',ochre,ink,3);
      art+=R(140,560,170,110,paper,14,ink,3)+P('M175 615 L200 640 275 582','none',accent,9);
      art+=R(820,560,170,110,paper,14,ink,3)+P('M855 589 H955 M855 614 H934 M855 639 H946','none',ochre,7);
      art+=P('M315 610 Q565 789 815 610','none',accent,3,'stroke-dasharray="6 9"');
      anchors=[[435,532],[693,532],[565,331],[225,615],[905,615]];break;}
  }
  const labels=frame.labels.map(s=>s.trim()),hotspots=[];
  let connectors='',cards='';
  const cardX=1110,cardW=430,areaTop=246,areaH=504,slot=areaH/labels.length,cardH=Math.min(slot-14,140);
  labels.forEach((label,i)=>{
    const yy=areaTop+i*slot,cy=yy+cardH/2;
    let a=anchors[i]||[1024,cy]; const isUnmatchedMap=frame.kind==='map'&&a[0]===995;
    if(isUnmatchedMap){a=[1079,cy];}
    const [ax,ay]=a;
    if(!isUnmatchedMap)connectors+=P('M'+ax+' '+ay+' C'+Math.min(ax+150,1060)+' '+ay+' 1040 '+cy+' '+cardX+' '+cy,'none',accent,2,'stroke-dasharray="5 7" opacity=".55"');
    cards+=R(cardX,yy,cardW,cardH,paper,16,'#C5CDBF',2)+R(cardX,yy,7,cardH,accent,3);
    let fs=23,ls=wrap(label,28),gap=fs+5;
    while((ls.length*gap>cardH-16)&&fs>13){fs--;gap=fs+4;ls=wrap(label,Math.floor(650/fs));}
    const textY=yy+(cardH-(ls.length-1)*gap)/2+fs*.32;
    cards+=T(cardX+26,cy+6,String(i+1).padStart(2,'0'),16,accent,700);
    cards+=ls.map((t,j)=>T(cardX+66,textY+j*gap,t,fs,ink,600)).join('');
    cards+=C(ax,ay,23,paper,accent,4)+C(ax,ay,14,accent)+T(ax,ay+6,String(i+1),17,paper,700,'middle');
    hotspots.push({id:'point-'+(i+1),x:ax,y:ay*.82+50,r:frame.kind==='map'?22:27,etiket:label});
  });
  const title=String(frame.title||lesson.title||''),tl=wrap(title,54),titleFont=tl.length>2?32:40,titleGap=titleFont+9;
  const top=tl.map((l,i)=>T(80,105+i*titleGap,l,titleFont,ink,700)).join('');
  const titleNode=E(title),desc=E('Şematik öğretim görseli. '+labels.join('. ')+'. '+String(frame.narration||''));
  const footer=String(lesson.date||'')+' · '+(frame.kind==='map'?'Konumlar yaklaşık, harita ölçekli değildir.':'Tarihî fotoğraf veya birebir mimari çizim değildir; şematik öğretim görselidir.');
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="'+uid+'title '+uid+'desc"><title id="'+uid+'title">'+titleNode+'</title><desc id="'+uid+'desc">'+desc+'</desc><defs><linearGradient id="'+grad+'" x1="0" y1="0" x2="0" y2="1"><stop stop-color="'+pale+'"/><stop offset="1" stop-color="#F8EBCD"/></linearGradient><linearGradient id="'+wood+'"><stop stop-color="#C79560"/><stop offset="1" stop-color="#E2BE80"/></linearGradient><filter id="'+shadow+'" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#193750" flood-opacity=".12"/></filter></defs>'+R(0,0,1600,900,'#F7F2E7',0)+R(28,27,1544,845,paper,28,'#D8CEBD',2)+R(80,48,9,17,accent,4)+T(104,62,'SİYER YOLCULUĞU · ÜNİTE '+lesson.module+' · BÖLÜM '+String(lesson.id).padStart(2,'0'),18,accent,700)+top+P('M80 194 H1520','none','#D9D0C0',2)+'<g transform="translate(0 50) scale(1 .82)">'+backdrop+art+connectors+cards+'</g>'+P('M80 805 H1520','none','#D9D0C0',2)+lines(80,834,footer,116,17,'#4F5C62',500,22)+T(1510,846,String(Number(index||0)+1).padStart(2,'0'),22,accent,700,'end')+'</svg>';
  return {svg,hotspots};
}
export {renderFrame};
