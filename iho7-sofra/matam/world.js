(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const questions = window.ACTIVITIES[0].questions;
  const names = ['الطَّلَب', 'المَشْروب', 'ما يُحِبُّه', 'ما تُحِبُّه'];
  const chapters = ['لِقاءٌ عِنْدَ النّافِذَة', 'كوبٌ على الطّاوِلَة', 'ذَوْقُ الصَّديق', 'ذَوْقُ الصَّديقَة'];
  const points = [[.205,.605],[.865,.66],[.356,.462],[.687,.48]];
  const digits = n => String(n).replace(/\d/g, x => '٠١٢٣٤٥٦٧٨٩'[x]);
  const app=$('app'), film=$('film'), bench=$('workbench');
  const state={view:'intro',phase:'idle',index:-1,answers:Array(4).fill(null),selected:null,fill:0,started:0};
  let drag=null, suppressClick=false, pourFrame=0, pourLast=0, pourActive=false, ghost=null, stream=null;
  function make(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
  function art(kind,index){const e=make('div',kind==='food'?'food-art':'prop-art prop-'+index);if(kind==='food')e.style.setProperty('--index',index);e.setAttribute('aria-hidden','true');return e;}
  function setView(view){state.view=view;app.dataset.view=view;for(const id of ['intro','map','service'])$(id).hidden=id!==view;$('room').hidden=view==='intro';$('day').hidden=view!=='intro';$('count').hidden=view==='intro';}
  function setPhase(phase){state.phase=phase;app.dataset.phase=phase;const locked=phase!=='work';bench.classList.toggle('locked',phase==='watch');bench.classList.toggle('answered',phase==='answer'||phase==='done');for(const b of bench.querySelectorAll('button'))b.disabled=locked;bench.querySelector('.waiting')?.remove();if(phase==='watch'){const e=make('div','waiting');e.append(make('span','', 'اِسْتَمِعْ إلى الزَّبون'));bench.append(e);}const active=phase==='watch'?0:phase==='work'?1:2;document.querySelectorAll('.steps span').forEach((e,i)=>{e.classList.toggle('active',i===active);e.classList.toggle('past',i<active);});$('pause').hidden=!['watch','answer'].includes(phase);$('relisten').hidden=phase==='answer';$('after').hidden=phase!=='done';$('listen-note').hidden=phase!=='watch';}
  function updateMap(){
    $('count').textContent=digits(state.answers.filter(x=>x!==null).length)+' / ٤';
    for(const host of [$('hotspots'),$('table-nav')]){host.replaceChildren();questions.forEach((q,i)=>{const done=state.answers[i]!==null;const b=make('button',host.id==='hotspots'?'hotspot':'table-link');b.dataset.table=i;b.classList.toggle('done',done);b.setAttribute('aria-label',names[i]+(done?'، اكتمل اللقاء':''));if(host.id==='hotspots'){b.append(make('span','pin',done?'✓':digits(i+1)),make('span','pin-label',names[i]));}else{const img=make('img');img.src='../assets/'+q.watch.replace('.mp4','.webp');img.alt='';b.append(img,make('span','',names[i]),make('span','number',done?'✓':digits(i+1)));}b.addEventListener('click',()=>openTable(i));host.append(b);});}
    const complete=state.answers.every(x=>x!==null);$('restart').hidden=!complete;$('map-title').textContent=complete?'اِكْتَمَلَتْ لِقاءاتُ اليَوْم!':'مِنْ أَيِّ طاوِلَةٍ نَبْدَأ؟';$('map-kicker').textContent=complete?digits(state.answers.filter(x=>x.correct).length)+' إِجابات صَحيحَة مِنْ ٤':'الزَّبائِنُ بِانْتِظارِكَ';positionPins();
  }
  function positionPins(){const w=innerWidth,h=innerHeight,s=Math.max(w/1672,h/941),ow=1672*s,oh=941*s;document.querySelectorAll('.hotspot').forEach((b,i)=>{b.style.left=((w-ow)/2+points[i][0]*ow)+'px';b.style.top=((h-oh)/2+points[i][1]*oh)+'px';});}
  function cleanMotion(){stopPour();if(drag){if(drag.element.hasPointerCapture(drag.pointerId))drag.element.releasePointerCapture(drag.pointerId);drag=null;}ghost?.remove();stream?.remove();ghost=null;stream=null;}
  function showMap(){cleanMotion();film.pause();$('media-error').hidden=true;setView('map');updateMap();$('map-title').tabIndex=-1;$('map-title').focus({preventScroll:true});}
  function openTable(i){
    cleanMotion();film.pause();state.index=i;state.selected=null;state.fill=0;state.started=performance.now();$('feedback').textContent='';$('chapter').textContent=digits(i+1)+' / ٤ · '+chapters[i];$('customer-label').textContent=chapters[i];$('question').textContent=questions[i].prompt;$('work-kicker').textContent=i<2?'حَضِّرِ الطَّلَب':'دَفْتَرُ الزَّبائِن';renderBench();setView('service');playClip('watch');
  }
  function updatePlayIcon(){const paused=film.paused;$('pause').setAttribute('aria-label',paused?'متابعة الفيديو':'إيقاف مؤقت');$('pause').querySelector('use').setAttribute('href',paused?'#i-play':'#i-pause');}
  function attemptPlay(){
    $('media-error').hidden=true;$('start-film').hidden=true;
    if(film.error){film.load();}
    const p=film.play();if(p)p.catch(error=>{if(error.name==='AbortError')return;if(error.name==='NotAllowedError'){$('start-film').hidden=false;$('start-film').querySelector('span').textContent='تابِعْ';}else $('media-error').hidden=false;});
  }
  function playClip(kind){
    cleanMotion();setPhase(kind);const q=questions[state.index],file=kind==='watch'?q.watch:q.answer;
    film.poster='../assets/'+file.replace('.mp4','.webp');film.src='../vid/clips/'+file;film.load();attemptPlay();
  }
  function onEnded(){
    if(state.view!=='service')return;
    if(state.phase==='watch'){
      if(state.answers[state.index]!==null){showSaved();return;}
      setPhase('work');$('instruction').textContent=state.index===0?'اسْحَبِ الطَّبَقَ إلى الصّينيَّة، أَوِ الْمَسْه.':state.index===1?'اخْتَرْ إِبْريقًا، ثُمَّ اسْكُبْ في الكوب.':'اخْتَرِ الخَتْمَ، وَضَعْهُ في الدَّفْتَر.';
      $('feedback').textContent='';bench.classList.add('revealed');
    }else if(state.phase==='answer'){showSaved();}
  }
  function showSaved(){
    setPhase('done');const q=questions[state.index],answer=state.answers[state.index];$('feedback').textContent=(answer?.correct?'أَحْسَنْتَ! ':'الإِجابَة: ')+q.options[q.correct];$('instruction').textContent=state.index<2?'أَصْبَحَ الطَّلَبُ جاهِزًا.':'حُفِظَتِ المَلاحَظَةُ في الدَّفْتَر.';
    if(state.index===0){$('served-food').hidden=false;$('served-food').style.setProperty('--index',q.correct);$('tray-label').hidden=true;}
    if(state.index===1){state.fill=100;setDrink(q.correct);updateFill();}
    if(state.index>=2){stampInk(q.correct);}
    $('next').firstChild.textContent=state.answers.every(x=>x!==null)?'إلى المَطْعَم ':'الطّاوِلَةُ التّالِيَة ';
  }
  function submit(option){
    if(state.phase!=='work'||state.answers[state.index]!==null)return;
    const i=state.index,q=questions[i];state.answers[i]={response:option,correct:option===q.correct};window.EbaScorm?.record(i,option,performance.now()-state.started);$('count').textContent=digits(state.answers.filter(x=>x!==null).length)+' / ٤';$('feedback').textContent='اِسْتَمِعْ إلى الإِجابَة.';playClip('answer');
  }
  function objectButton(option,kind){const b=make('button','object');b.dataset.option=option;b.setAttribute('aria-label',questions[state.index].options[option]);b.append(art(kind,option),make('span','label',questions[state.index].options[option]));wireObject(b,kind,option);return b;}
  function renderBench(){
    bench.replaceChildren();bench.className='workbench';$('instruction').textContent='';
    if(state.index===0){
      const row=make('div','choices');for(let i=0;i<3;i++)row.append(objectButton(i,'food'));
      const tray=make('button','drop-tray');tray.id='tray';tray.setAttribute('aria-label','قدّم الطبق المختار');tray.append(art('prop',4));const served=art('food',0);served.id='served-food';served.classList.add('tray-content');served.hidden=true;const label=make('span','drop-label','إلى الطّاوِلَة ↓');label.id='tray-label';tray.append(served,label);tray.addEventListener('click',()=>{if(state.selected!==null)serveFood(state.selected);});bench.append(row,tray);
    }else if(state.index===1){
      const row=make('div','choices drink-choices');for(let i=0;i<3;i++)row.append(objectButton(i,'prop'));
      const cup=make('button','cup-target');cup.id='cup';cup.setAttribute('aria-label','املأ الكوب بالمشروب المختار');const liquid=make('div','cup-liquid');cup.append(liquid,art('prop',3),make('span','steam'));const label=make('span','cup-label','اِملأِ الكوب');label.id='cup-label';cup.append(label);cup.addEventListener('click',()=>{if(state.phase!=='work')return;if(state.selected===null){$('instruction').textContent='اخْتَرْ إِبْريقًا أَوَّلًا.';return;}if(pourActive){stopPour();return;}startPour();});
      const meter=make('div','pour-meter');meter.append(make('i'));bench.append(row,cup,meter);setDrink(0);
    }else{
      const scene=make('div','book-scene'),book=make('div','book'),page=make('div','book-page');page.append(make('span','book-title','دَفْتَرُ الزَّبائِن'));const img=make('img');img.src='../assets/'+questions[state.index].watch.replace('.mp4','.webp');img.alt='';page.append(img,make('h2','',state.index===2?'الكُفْتَة':'المَكَرونَة'));
      const target=make('button','stamp-target','سَجِّلْ هُنا');target.id='stamp-target';target.setAttribute('aria-label','ضع الختم في الدفتر');target.addEventListener('click',()=>{if(state.selected!==null)applyStamp(state.selected);});book.append(page,target);const stamps=make('div','stamps');for(let i=0;i<3;i++){const b=make('button','stamp',questions[state.index].options[i]);b.dataset.option=i;b.setAttribute('aria-label',questions[state.index].options[i]);wireObject(b,'stamp',i);stamps.append(b);}scene.append(book,stamps);bench.append(scene);
    }
  }
  function serveFood(option){if(state.phase!=='work')return;$('served-food').style.setProperty('--index',option);$('served-food').hidden=false;$('served-food').classList.add('revealed');$('tray-label').hidden=true;submit(option);}
  function stampInk(option){const target=$('stamp-target');if(!target)return;target.replaceChildren(make('span','ink',questions[state.index].options[option]));}
  function applyStamp(option){if(state.phase!=='work')return;stampInk(option);submit(option);}
  function select(option){state.selected=option;for(const b of bench.querySelectorAll('[data-option]'))b.classList.toggle('selected',+b.dataset.option===option);}
  function setDrink(option){const colors=['#b86a22','#efab30','#fffae9'];app.style.setProperty('--drink-color',colors[option]);$('cup')?.classList.toggle('has-tea',option===0&&state.fill>30);}
  function updateFill(){bench.style.setProperty('--fill',state.fill);$('cup')?.classList.toggle('has-tea',state.selected===0&&state.fill>30);}
  function showPourArt(){
    if(!ghost){ghost=art('prop',state.selected);ghost.classList.add('drag-ghost');document.body.append(ghost);}ghost.classList.add('pouring');const r=$('cup').getBoundingClientRect();const size=Math.min(170,r.height*1.2);ghost.style.width=size+'px';ghost.style.height=size+'px';ghost.style.left=(r.x+r.width*.5+size*.38)+'px';ghost.style.top=(r.y+size*.10)+'px';
    if(!stream){stream=make('div','pour-stream');document.body.append(stream);}stream.style.background=['#b86a22','#efab30','#fffae9'][state.selected];stream.style.left=(r.x+r.width*.49)+'px';stream.style.top=(r.y+r.height*.05)+'px';stream.style.height=r.height*.42+'px';
  }
  function startPour(){
    if(state.phase!=='work'||state.selected===null||pourActive)return;pourActive=true;showPourArt();$('cup').classList.add('ready');$('instruction').textContent='يَمْتَلِئُ الكوب…';pourLast=performance.now();
    const tick=now=>{if(!pourActive)return;state.fill=Math.min(100,state.fill+(now-pourLast)/18);pourLast=now;updateFill();if(state.fill>=100){const choice=state.selected;stopPour();submit(choice);return;}pourFrame=requestAnimationFrame(tick);};pourFrame=requestAnimationFrame(tick);
  }
  function stopPour(){pourActive=false;cancelAnimationFrame(pourFrame);pourFrame=0;stream?.remove();stream=null;ghost?.remove();ghost=null;$('cup')?.classList.remove('ready');}
  function inside(rect,x,y){return x>=rect.x&&x<=rect.right&&y>=rect.y&&y<=rect.bottom;}
  function targetFor(kind){return $(kind==='food'?'tray':kind==='stamp'?'stamp-target':'cup');}
  function wireObject(button,kind,option){
    button.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return;}if(state.phase!=='work')return;select(option);if(kind==='food')serveFood(option);else if(kind==='stamp')applyStamp(option);else{stopPour();state.fill=0;updateFill();setDrink(option);$('instruction').textContent='الْمَسِ الكوبَ لِتَسْكُبَ، أَوِ اسْحَبِ الإِبْريقَ إِلَيْهِ.';}});
    button.addEventListener('pointerdown',e=>{if(state.phase!=='work'||(e.pointerType==='mouse'&&e.button!==0))return;stopPour();select(option);if(kind==='prop'){state.fill=0;updateFill();setDrink(option);}drag={element:button,pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,kind,option,moved:false};button.setPointerCapture(e.pointerId);});
    button.addEventListener('pointermove',e=>{if(!drag||drag.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)<6&&!drag.moved)return;drag.moved=true;
      const target=targetFor(kind),valid=inside(target.getBoundingClientRect(),e.clientX,e.clientY);target.classList.toggle('ready',valid);
      if(kind==='prop'&&valid){startPour();return;}if(kind==='prop'&&pourActive)stopPour();
      if(!ghost){ghost=kind==='stamp'?make('div','stamp-ghost',questions[state.index].options[option]):art(kind,option);ghost.classList.add('drag-ghost');document.body.append(ghost);}
      ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';
    });
    button.addEventListener('pointerup',e=>{if(!drag||drag.pointerId!==e.pointerId)return;const moved=drag.moved,valid=inside(targetFor(kind).getBoundingClientRect(),e.clientX,e.clientY);button.releasePointerCapture(e.pointerId);drag=null;targetFor(kind).classList.remove('ready');if(moved){suppressClick=true;setTimeout(()=>suppressClick=false,0);}if(kind==='prop'){if(moved&&valid&&state.phase==='work'){startPour();}else stopPour();}else{ghost?.remove();ghost=null;if(moved&&valid){if(kind==='food')serveFood(option);else applyStamp(option);}}});
    button.addEventListener('pointercancel',()=>{cleanMotion();targetFor(kind)?.classList.remove('ready');});
  }
  $('open').addEventListener('click',showMap);$('room').addEventListener('click',showMap);$('return').addEventListener('click',showMap);
  $('exit').target='_top';$('exit').addEventListener('click',event=>{if(window.EbaScorm?.connected()){event.preventDefault();showMap();}});
  $('restart').addEventListener('click',()=>{state.answers=Array(4).fill(null);window.EbaScorm?.beginAttempt();showMap();});
  $('next').addEventListener('click',()=>{let next=-1;for(let step=1;step<=4;step++){const i=(state.index+step)%4;if(state.answers[i]===null){next=i;break;}}if(next<0)showMap();else openTable(next);});
  $('start-film').addEventListener('click',attemptPlay);$('retry').addEventListener('click',()=>{film.load();attemptPlay();});$('pause').addEventListener('click',()=>{if(film.paused)attemptPlay();else film.pause();});$('relisten').addEventListener('click',()=>playClip('watch'));
  $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await app.requestFullscreen();}catch{}});
  film.addEventListener('ended',onEnded);film.addEventListener('play',()=>{$('start-film').hidden=true;updatePlayIcon();});film.addEventListener('pause',updatePlayIcon);film.addEventListener('error',()=>{if(state.view==='service')$('media-error').hidden=false;});film.addEventListener('playing',()=>{$('media-error').hidden=true;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){film.pause();stopPour();}});
  window.addEventListener('message',event=>{if(event.origin!==location.origin)return;if(event.data?.type==='comparison:pause'||event.data?.type==='host-pause'){film.pause();stopPour();}});
  window.addEventListener('resize',()=>{positionPins();if(pourActive)showPourArt();});window.addEventListener('learning-save-error',()=>{$('save-warning').hidden=false;});
  updateMap();app.dataset.ready="true";$("open").disabled=false;
})();
