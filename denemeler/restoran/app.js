(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const questions = window.ACTIVITIES[0].questions;
  const ar = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const icon = id => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const chapters = ['الطلب الأوّل · المأكولات', 'الطلب الثاني · المشروبات', 'على المائدة · الكفتة', 'على المائدة · المكرونة'];
  const drinkColors = ['#a44d0d', '#efa62a', '#fff6dd'];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, selected = null, pending = null, answers = [], started = 0;
  let heard = [], answerHeard = [], videoKind = 'watch', videoToken = 0, drag = null;
  let suppressClickUntil = 0, pouringTimer = null;
  const dialog = $('#video-dialog'), video = $('#video');
  const shuffle = a => { const v = [...a]; for (let i=v.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [v[i],v[j]]=[v[j],v[i]]; } return v; };
  const announce = text => { $('#announcement').textContent = text; };
  function setScreen(id) {
    for (const name of ['home','play','result']) $('#'+name).hidden = name !== id;
  }
  function clearDrag() {
    if (!drag) return;
    try { drag.button.releasePointerCapture(drag.pointer); } catch (_) {}
    drag.ghost?.remove(); drag = null;
  }
  function stopMedia() {
    videoToken++; video.pause();
    if (dialog.open) dialog.close();
  }
  function start() {
    stopMedia(); clearDrag(); clearTimeout(pouringTimer);
    index=0; answers=Array(questions.length).fill(null); heard=Array(questions.length).fill(false); answerHeard=Array(questions.length).fill(false);
    window.EbaScorm.beginAttempt(); setScreen('play'); renderQuestion(); openVideo('watch');
  }
  function home() { stopMedia(); clearDrag(); clearTimeout(pouringTimer); setScreen('home'); $('#start').focus(); }
  function progress() {
    $('#progress').innerHTML = questions.map((_,i)=>`<span class="${answers[i]!==null?'done':i===index?'current':''}" aria-label="${ar(i+1)}${answers[i]!==null?' مكتمل':''}"></span>`).join('');
    $('#progress').setAttribute('aria-label', `الموقف ${ar(index+1)} من ${ar(questions.length)}`);
  }
  function renderQuestion() {
    clearDrag(); clearTimeout(pouringTimer); selected=null; pending=null; started=Date.now();
    $('#play').dataset.question = String(index);
    $('#question').textContent = questions[index].prompt;
    $('#chapter').textContent = chapters[index];
    $('#confirm').disabled = true;
    $('#confirm').innerHTML = `تأكيد ${index<2?'الطلب':'الاختيار'} ${icon('check')}`;
    progress();
    if(index===0) renderFood(); else if(index===1) renderDrinks(); else renderTaste();
  }
  function renderFood() {
    $('#hint').textContent = 'اسحب الطبق إلى الصينية، أو اختره ثم المس الصينية.';
    $('#interaction').innerHTML = `<button id="drop-target" class="tray" aria-label="الصينية: ضع الطبق هنا"><span class="drop-label">ضع الطبق هنا</span></button><div class="products">${shuffle([0,1,2]).map(i=>`<button class="product" data-option="${i}" aria-label="${questions[index].options[i]}" aria-pressed="false"><span class="food food-${i}" aria-hidden="true"></span><span class="label">${questions[index].options[i]}</span></button>`).join('')}</div>`;
    bindProducts('food'); $('#drop-target').addEventListener('click',()=>{if(pending!==null) place(pending,'food');else announce('اختر طبقًا أوّلًا.');});
  }
  function renderDrinks() {
    $('#hint').textContent = 'اسحب الإبريق إلى الكأس، أو اختره ثم المس الكأس.';
    $('#interaction').innerHTML = `<button id="drop-target" class="cup-target" aria-label="الكأس: اسكب الشراب هنا"><span class="glass"><span class="liquid"></span></span><span class="drop-label">اسكب هنا</span></button><div class="products drink-products">${shuffle([0,1,2]).map(i=>`<button class="product" data-option="${i}" aria-label="${questions[index].options[i]}" aria-pressed="false"><span class="drink drink-${i}" aria-hidden="true"></span><span class="label">${questions[index].options[i]}</span></button>`).join('')}</div>`;
    bindProducts('drink'); $('#drop-target').addEventListener('click',()=>{if(pending!==null) place(pending,'drink');else announce('اختر شرابًا أوّلًا.');});
  }
  function bindProducts(kind) {
    for (const button of document.querySelectorAll('.product')) {
      const option=Number(button.dataset.option);
      button.addEventListener('click',()=>{
        if(Date.now()<suppressClickUntil||answers[index]!==null) return;
        pending=option; markPending(option);
        $('#hint').textContent = kind==='food'?'الآن المس الصينية لوضع الطبق.':'الآن المس الكأس لسكب الشراب.';
        $('#drop-target').classList.add('ready');
      });
      button.addEventListener('pointerdown',event=>{
        if(answers[index]!==null || event.button!==0 || !event.isPrimary) return;
        clearDrag();
        drag={button,option,kind,pointer:event.pointerId,x:event.clientX,y:event.clientY,moved:false,ghost:null};
        button.setPointerCapture(event.pointerId);
      });
      button.addEventListener('pointermove',event=>{
        if(!drag || drag.pointer!==event.pointerId) return;
        if(!drag.moved && Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>6) {
          drag.moved=true;
          const r=button.getBoundingClientRect();
          const ghost=document.createElement('div');ghost.className='drag-ghost';
          const visual=button.querySelector('.food,.drink').cloneNode(true);ghost.append(visual);
          ghost.style.width=Math.max(100,Math.min(200,r.width))+'px';ghost.style.height=Math.max(75,Math.min(170,r.height-25))+'px';
          document.body.append(ghost);drag.ghost=ghost;$('#drop-target').classList.add('ready');
        }
        if(drag.ghost) { drag.ghost.style.left=event.clientX+'px';drag.ghost.style.top=event.clientY+'px';event.preventDefault(); }
      });
      button.addEventListener('pointerup',event=>{
        if(!drag || drag.pointer!==event.pointerId) return;
        const wasDrag=drag.moved;
        if(wasDrag) {
          suppressClickUntil=Date.now()+300;
          const r=$('#drop-target').getBoundingClientRect();
          const inside=event.clientX>=r.left-12&&event.clientX<=r.right+12&&event.clientY>=r.top-12&&event.clientY<=r.bottom+12;
          if(inside) place(option,kind); else {$('#drop-target').classList.remove('ready');announce('ضع الاختيار داخل المكان المحدّد.');}
        }
        clearDrag();
      });
      button.addEventListener('pointercancel',()=>{clearDrag();$('#drop-target')?.classList.remove('ready');});
    }
  }
  function markPending(option) {
    for(const b of document.querySelectorAll('.product')) {
      b.classList.toggle('pending',Number(b.dataset.option)===option);
      b.setAttribute('aria-pressed',String(Number(b.dataset.option)===option));
    }
  }
  function place(option,kind) {
    if(answers[index]!==null) return;
    selected=option;pending=option;markPending(option);
    const target=$('#drop-target'); target.classList.remove('ready');
    if(kind==='food') {
      target.classList.add('placed');
      target.innerHTML=`<span class="food food-${option}" aria-hidden="true"></span><span class="placed-badge" aria-hidden="true">✓</span>`;
      target.setAttribute('aria-label','الطبق المختار: '+questions[index].options[option]);
      for(const b of document.querySelectorAll('.product')) b.classList.toggle('used',Number(b.dataset.option)===option);
    } else {
      target.classList.remove('filled');
      target.dataset.drink=String(option);
      target.style.setProperty('--liquid',drinkColors[option]);
      document.querySelectorAll('.pour-jug,.pour-stream').forEach(el=>el.remove());
      clearTimeout(pouringTimer);
      if(!reducedMotion.matches) {
        const jug=document.createElement('div');jug.className=`pour-jug drink drink-${option}`;jug.setAttribute('aria-hidden','true');
        const stream=document.createElement('div');stream.className='pour-stream';stream.style.setProperty('--liquid',drinkColors[option]);stream.setAttribute('aria-hidden','true');
        $('#interaction').append(jug,stream);
        pouringTimer=setTimeout(()=>{jug.remove();stream.remove();},1000);
      }
      // Flush the empty state so pouring a different drink animates visibly.
      void target.offsetWidth;target.classList.add('filled');
      target.querySelector('.drop-label').textContent=questions[index].options[option];
      target.setAttribute('aria-label','الشراب المختار: '+questions[index].options[option]);
    }
    $('#hint').textContent=questions[index].options[option]+' · أكّد اختيارك.';
    $('#confirm').disabled=false;announce('تم الاختيار. يمكنك تأكيده أو تغييره.');
  }
  function levels() { return index===2?[1,2,0]:[0,2,1]; }
  function renderTaste() {
    const q=questions[index], map=levels();
    $('#hint').textContent='حرّك القلب لتُظهر درجة المحبّة، ثم أكّد اختيارك.';
    $('#interaction').innerHTML=`<div class="taste-scene"><div class="taste-meal"><div class="food food-${index===2?0:3}"></div></div><div class="taste-hearts" aria-hidden="true">${[0,1,2].map(()=>icon('heart')).join('')}</div><span class="taste-question-mark" aria-hidden="true">؟</span><div class="preference"><div class="range-wrap"><div class="range-rail"></div><span class="range-dot"></span><span class="range-dot"></span><span class="range-dot"></span><span class="range-heart">${icon('heart')}</span><input id="preference-range" type="range" min="0" max="2" step="1" value="1" aria-label="درجة المحبّة" aria-valuetext="لم تختر بعد"></div><div class="taste-options">${map.map((option,level)=>`<button class="taste-option" data-level="${level}" data-option="${option}" aria-pressed="false">${q.options[option]}</button>`).join('')}</div></div></div>`;
    for(const heart of document.querySelectorAll('.taste-hearts svg'))heart.classList.add('off');
    $('#preference-range').addEventListener('input',event=>chooseLevel(Number(event.target.value)));
    // A tap at the initial middle stop is an intentional choice too.
    $('#preference-range').addEventListener('pointerup',event=>chooseLevel(Number(event.target.value)));
    $('#preference-range').addEventListener('keydown',event=>{if(event.key===' '||event.key==='Enter'){event.preventDefault();chooseLevel(Number(event.target.value));}});
    for(const button of document.querySelectorAll('.taste-option'))button.addEventListener('click',()=>chooseLevel(Number(button.dataset.level)));
  }
  function chooseLevel(level) {
    if(answers[index]!==null) return;
    selected=levels()[level];
    const scene=$('.taste-scene');scene.style.setProperty('--level',level);scene.dataset.level=String(level);
    $('#preference-range').value=level;$('#preference-range').setAttribute('aria-valuetext',questions[index].options[selected]);
    $('.range-heart').style.left=(level*50)+'%';
    document.querySelectorAll('.taste-hearts svg').forEach((el,i)=>el.classList.toggle('off',level===0||(level===1&&i>0)));
    document.querySelectorAll('.taste-option').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.level)===level)));
    $('#hint').textContent=questions[index].options[selected];$('#confirm').disabled=false;
  }
  function submit() {
    if(answers[index]!==null) { if(answerHeard[index]) next(); return; }
    if(selected===null) return;
    answers[index]=selected;
    window.EbaScorm.record(index,selected,Date.now()-started);
    progress();
    for(const button of document.querySelectorAll('#interaction button,#interaction input'))button.disabled=true;
    $('#confirm').innerHTML=`التالي ${icon('arrow')}`;$('#confirm').disabled=true;
    openVideo('answer');
  }
  function openVideo(kind) {
    clearDrag();videoKind=kind;videoToken++;const token=videoToken;
    const q=questions[index];
    const correct=answers[index]===q.correct;
    dialog.classList.toggle('correct',kind==='answer'&&correct);dialog.classList.toggle('wrong',kind==='answer'&&!correct);
    $('#video-kicker').textContent=kind==='watch'?'استمع إلى الحوار':correct?'أحسنت!':'لِنَسْتَمِعْ إلى الإجابة.';
    $('#video-title').textContent=kind==='watch'?q.prompt:q.options[q.correct];
    $('#video-note').textContent=kind==='watch'?'استمع جيدًا، ثم حضّر الطلب.':correct?'اختيارك يوافق الحوار.':'تذكّر هذه الإجابة في المرّة القادمة.';
    $('#video-next').innerHTML=(kind==='watch'?'إلى المائدة':index===questions.length-1?'النتيجة':'التالي')+' '+icon('arrow');
    $('#video-next').disabled=kind==='watch'?!heard[index]:!answerHeard[index];
    $('#video-close').disabled=$('#video-next').disabled;
    $('#video-error').hidden=true;
    video.poster='assets/'+q[kind].replace('.mp4','.webp');
    video.src='vid/clips/'+q[kind];video.load();
    if(!dialog.open) dialog.showModal();
    const play=video.play();if(play)play.catch(()=>{if(token===videoToken && !video.error)$('#video-note').textContent='اضغط زر التشغيل للاستماع.';});
  }
  video.addEventListener('ended',()=>{
    if(!dialog.open) return;
    if(videoKind==='watch')heard[index]=true;else {answerHeard[index]=true;$('#confirm').disabled=false;}
    $('#video-next').disabled=false;$('#video-close').disabled=false;
    $('#video-next').focus();
  });
  video.addEventListener('error',()=>{if(dialog.open){$('#video-error').hidden=false;$('#video-close').disabled=false;$('#video-note').textContent='تحقّق من الاتصال ثم أعد المحاولة.';}});
  $('#retry-video').addEventListener('click',()=>openVideo(videoKind));
  function closeVideo() {video.pause();dialog.close();$('#question').focus();}
  $('#video-next').addEventListener('click',()=>{const kind=videoKind;closeVideo();if(kind==='answer')next();});
  $('#video-close').addEventListener('click',closeVideo);
  dialog.addEventListener('cancel',event=>{if($('#video-close').disabled)event.preventDefault();else video.pause();});
  dialog.addEventListener('close',()=>video.pause());
  function next() {
    if(index===questions.length-1) { result();return; }
    index++;renderQuestion();openVideo('watch');
  }
  function result() {
    const points=answers.filter((value,i)=>value===questions[i].correct).length;
    $('#score').textContent=ar(points*25)+' / '+ar(100);
    $('#receipt-lines').innerHTML=questions.map((q,i)=>`<li class="${answers[i]===q.correct?'':'miss'}"><b class="mark">${answers[i]===q.correct?'✓':'×'}</b><span>${q.options[q.correct]}</span><span>${ar(answers[i]===q.correct?25:0)}</span></li>`).join('');
    window.EbaScorm.complete();setScreen('result');$('#result-title').focus();
  }
  $('#start').addEventListener('click',start);$('#restart').addEventListener('click',start);
  $('#home-btn').addEventListener('click',home);$('#back-home').addEventListener('click',home);
  $('#confirm').addEventListener('click',submit);$('#listen').addEventListener('click',()=>openVideo(answers[index]!==null?'answer':'watch'));
  $('#help').addEventListener('click',()=>$('#help-dialog').showModal());
  $('#help-close').addEventListener('click',()=>$('#help-dialog').close());
  $('#help-start').addEventListener('click',()=>{$('#help-dialog').close();start();});
  for(const b of document.querySelectorAll('.full'))b.addEventListener('click',async()=>{
    try {if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else announce('التجربة ملائمة لهذا العرض.');}catch(_){announce('تعذّر فتح وضع ملء الشاشة.');}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
  window.addEventListener('resize',clearDrag);
  window.addEventListener('learning-save-error',()=>{$('#save-warning').hidden=false;});
  if(window.EbaScorm.diagnostics().errors.some(e=>!e.optional))$('#save-warning').hidden=false;
})();
