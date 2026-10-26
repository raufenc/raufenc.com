(() => {
 'use strict';
 const $=s=>document.querySelector(s), root=$('#scene'), stage=$('#stage'), camera=$('#camera'), choices=$('#choices');
 const watch=$('#watch'),answer=$('#answer'), q=window.ACTIVITIES[0].questions[0];
 const positions=[{x:292,y:374},{x:423,y:374},{x:554,y:374}];
 const target={x:490,y:354};
 let state='intro',media=watch,selected=null,drag=null,ignoreClickUntil=0,token=0,cam={x:0,y:0,scale:1},heard=false;
 watch.src='../vid/clips/'+q.watch;answer.src='../vid/clips/'+q.answer;
 const dishes=q.options.map((label,index)=>{
   const button=document.createElement('button');button.className='dish';button.dataset.option=index;button.setAttribute('aria-label',label);button.title=label;button.innerHTML='<span class="dish-art" aria-hidden="true"></span>';button.tabIndex=-1;choices.append(button);return button;
 });
 const announce=text=>$('#announce').textContent=text;
 function setState(next){state=next;root.dataset.state=next;$('#start').hidden=next!=='intro';$('#replay').hidden=!['choice','done'].includes(next);$('#play-pause').hidden=!['watch','answer'].includes(next);choices.inert=next!=='choice';dishes.forEach(b=>b.tabIndex=next==='choice'?0:-1);layout();}
 function layout(){
   const r=stage.getBoundingClientRect(), portrait=r.height>r.width;
   const base=Math.min(r.width/854,r.height/480);
   let scale=base,x=(r.width-854*base)/2,y=(r.height-480*base)/2;
   if(portrait){
     const zoom=['choice','serving'].includes(state)?1.65:1;
     scale=base*zoom;x=r.width/2-427*scale;
     const focus=['choice','serving'].includes(state)?270:240;
     y=r.height*.43-focus*scale;
   }
   cam={x,y,scale};camera.style.transform=`translate(${x}px,${y}px) scale(${scale})`;
   const msg=$('#message');
   if(!portrait&&['choice','done'].includes(state)){
     const plateBottom=state==='choice'?400:380;
     msg.style.top=Math.min(y+plateBottom*scale+8,r.height-msg.offsetHeight-3)+'px';msg.style.bottom='auto';
   }else{msg.style.top='';msg.style.bottom='';}
 }
 function position(button,p){button.style.left=(p.x-64)+'px';button.style.top=(p.y-34)+'px';}
 function resetDishes(){dishes.forEach((b,i)=>{b.disabled=false;b.classList.remove('dragging','arriving','fade');b.style.transform='';position(b,positions[i]);});choices.classList.remove('visible','served','dragging','over');}
 function caption(eyebrow,question,hint){$('#eyebrow').textContent=eyebrow;$('#question').textContent=question;$('#hint').textContent=hint;layout();}
 function clearDrag(restore=true){
   if(drag){try{drag.button.releasePointerCapture(drag.pointer);}catch{}drag.button.classList.remove('dragging');if(state==='choice'&&restore){drag.button.classList.add('arriving');position(drag.button,positions[drag.option]);}drag=null;}
   choices.classList.remove('dragging','over');
 }
 function playVideo(video){
   $('#media-error').hidden=true;media=video;
   if(video.error){$('#media-error').hidden=false;return;}
   video.play().catch(()=>{if(video.error){$('#media-error').hidden=false;}else{$('#play-pause').hidden=false;$('#play-pause').setAttribute('aria-label','تشغيل');$('#play-pause-shape').setAttribute('d','m9 5 10 7-10 7Z');announce('اضغط زر التشغيل للاستماع.');}});
 }
 function start(){
   token++;clearDrag();watch.pause();answer.pause();heard=false;selected=null;
   watch.hidden=false;answer.hidden=true;answer.style.opacity='0';resetDishes();watch.currentTime=0;
   $('#film-progress').style.width='0%';setState('watch');playVideo(watch);
 }
 function showChoices(){
   heard=true;setState('choice');caption('',q.prompt,'اسحب الطبق إلى الصبي، أو المسه.');
   choices.classList.add('visible');announce(q.prompt+' اسحب الطبق إلى الصبي أو المس الطبق.');
 }
 function replay(){
   if(state==='watch'||state==='answer')return;
   if(state==='done'){start();return;}
   clearDrag();resetDishes();watch.hidden=false;answer.hidden=true;watch.currentTime=0;setState('watch');playVideo(watch);
 }
 function isDelivery(x,y){return x>=425&&x<=670&&y>=150&&y<=390;}
 function toWorld(event){const r=stage.getBoundingClientRect();return {x:(event.clientX-r.left-cam.x)/cam.scale,y:(event.clientY-r.top-cam.y)/cam.scale};}
 function serve(option){
   if(state!=='choice'||!heard)return;
   selected=option;const stamp=++token;clearDrag();setState('serving');choices.classList.remove('dragging','over');
   const chosen=dishes[option];dishes.forEach((b,i)=>{b.disabled=true;if(i!==option)b.classList.add('fade');});
   chosen.classList.add('arriving');position(chosen,target);
   caption('',q.prompt,option===q.correct?'':'لِنَسْتَمِعْ إلى طلبه.');
   if(option!==q.correct){
     position(chosen,positions[option]);chosen.classList.add('fade');const right=dishes[q.correct];right.classList.remove('fade');right.classList.add('arriving');position(right,target);
   }
   choices.classList.remove('visible');choices.classList.add('served');
   answer.currentTime=0;answer.hidden=false;answer.style.opacity='0';setState('answer');
   // Retain the paused source frame until the answer's first decoded frame is ready.
   const reveal=()=>{if(stamp!==token)return;answer.style.opacity='1';watch.hidden=true;};
   answer.addEventListener('playing',reveal,{once:true});playVideo(answer);
 }
 function done(){
   setState('done');caption(selected===q.correct?'أحسنت!':'هذا هو طلبه.',q.options[q.correct],'');
   $('#replay').setAttribute('aria-label','جرّب مرّة أخرى');announce((selected===q.correct?'أحسنت. ':'')+q.options[q.correct]);$('#replay').focus({preventScroll:true});
 }
 dishes.forEach((button,option)=>{
   button.addEventListener('pointerdown',event=>{
     if(state!=='choice'||event.button!==0||!event.isPrimary)return;
     clearDrag();button.classList.remove('arriving');const p=toWorld(event);drag={button,option,pointer:event.pointerId,x:event.clientX,y:event.clientY,offsetX:p.x-positions[option].x,offsetY:p.y-positions[option].y,moved:false};button.setPointerCapture(event.pointerId);
     $('#hint').textContent=q.options[option];
   });
   button.addEventListener('pointermove',event=>{
     if(!drag||drag.pointer!==event.pointerId)return;
     if(!drag.moved&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>6){drag.moved=true;button.classList.add('dragging');choices.classList.add('dragging');}
     if(!drag.moved)return;
     const p=toWorld(event);position(button,{x:p.x-drag.offsetX,y:p.y-drag.offsetY});choices.classList.toggle('over',isDelivery(p.x,p.y));event.preventDefault();
   });
   button.addEventListener('pointerup',event=>{
     if(!drag||drag.pointer!==event.pointerId)return;
     const moved=drag.moved,p=toWorld(event),valid=isDelivery(p.x,p.y);clearDrag(!moved||!valid);
     if(moved){ignoreClickUntil=Date.now()+400;if(valid)serve(option);else $('#hint').textContent='اسحب الطبق إلى الصبي.';}
   });
   button.addEventListener('pointercancel',()=>{clearDrag();if(state==='choice')$('#hint').textContent='اسحب الطبق إلى الصبي، أو المسه.';});
   button.addEventListener('click',()=>{if(Date.now()>=ignoreClickUntil)serve(option);});
   button.addEventListener('focus',()=>{if(state==='choice')$('#hint').textContent=q.options[option];});
   button.addEventListener('pointerenter',()=>{if(state==='choice'&&!drag)$('#hint').textContent=q.options[option];});
 });
 for(const video of [watch,answer]){
   video.addEventListener('timeupdate',()=>{if(video===media)$('#film-progress').style.width=((video.currentTime/(video.duration||1))*100)+'%';});
   video.addEventListener('play',()=>{$('#play-pause-shape').setAttribute('d','M9 5v14M15 5v14');$('#play-pause').setAttribute('aria-label','إيقاف مؤقت');});
   video.addEventListener('pause',()=>{$('#play-pause-shape').setAttribute('d','m9 5 10 7-10 7Z');$('#play-pause').setAttribute('aria-label','تشغيل');});
   video.addEventListener('error',()=>{if(video===media&&['watch','answer'].includes(state))$('#media-error').hidden=false;});
 }
 watch.addEventListener('ended',()=>{if(state==='watch')showChoices();});answer.addEventListener('ended',()=>{if(state==='answer')done();});
 $('#start').addEventListener('click',start);$('#replay').addEventListener('click',replay);
 $('#play-pause').addEventListener('click',()=>{if(media.paused)playVideo(media);else media.pause();});
 $('#retry').addEventListener('click',()=>{const last=media.currentTime||0;media.load();media.addEventListener('loadedmetadata',()=>{media.currentTime=last;playVideo(media);},{once:true});});
 $('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else announce('يمكنك تدوير الجهاز لعرض أوسع.');}catch{announce('يمكنك تدوير الجهاز لعرض أوسع.');}});
 window.addEventListener('resize',()=>{clearDrag();layout();});document.addEventListener('visibilitychange',()=>{if(document.hidden){watch.pause();answer.pause();}});
 resetDishes();layout();
})();
