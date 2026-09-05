(() => {
  'use strict';
  const meaningQuestions={
    muhibbi:{word:'sıhhat',choices:['Saltanat ve hükmetme kudreti','Bir yere duyulan hasret','Sağlık, afiyet'],answer:2,explanation:'Şair bir nefes sağlığı, insanların değer verdiği devlet ve saltanatla karşılaştırıyor.'},
    fuzuli:{word:'müştâk',choices:['Hasret çeken, kavuşmayı çok isteyen','Her şeyden vazgeçmiş','Sözünü gizleyen'],answer:0,explanation:'“Men lebün müştâkıyam”: Şair, sevgilinin dudağına duyduğu hasreti dile getiriyor.'},
    galib:{word:'zübde',choices:['Görünen bir gölge','Öz, en seçkin parça','Uzakta kalan hatıra'],answer:1,explanation:'“Zübde-i âlem” sözüyle insana âlemin özü ve seçkin parçası olarak bakılıyor.'},
    nabi:{word:'kûy',choices:['Yolculuğun sonu','Gözde biriken yaş','Semt, mahalle, belde'],answer:2,explanation:'“Kûy-ı mahbûb-ı Hudâ”, Allah’ın sevgilisinin bulunduğu beldeyi anlatıyor.'},
    hayali:{word:'mâhî',choices:['İnci','Balık','Yıldız'],answer:1,explanation:'Beyitteki balıklar denizin içindedir; denizi bilmezler. Yakınımızdaki hakikati fark etme düşüncesi bu benzetmeyle açılıyor.'},
    yahya:{word:'visâl',choices:['Kavuşma','Ayrılık','Unutma'],answer:0,explanation:'“Visâl ihtimâli”, kavuşma ihtimalidir. Şair gönle bu ihtimalle sevinmesini söylüyor.'}
  };
  const rules={
    imale:'Açık hece, kalıptaki uzun konumu karşılamak için uzatılıyor.',
    med:'Tek hece, bir uzun ve bir kısa vezin konumunu karşılıyor.',
    line_end:'Mısra sonundaki açık hece uzun kabul ediliyor.',
    short:'Kısa sesli harfle biten açık hece, kısa konumu karşılıyor.',
    long:'Kapalı veya aslî uzun sesli taşıyan hece, uzun konumu karşılıyor.'
  };
  function lessonFor(chapter,lines){
    const line=lines[0],syllables=line.feet.flatMap(f=>f.syllables),target=syllables.find(s=>['med','imale','line_end'].includes(s.operation))||syllables[0];
    const code=rules[target.operation]?target.operation:target.natural==='S'?'short':'long';
    const options=[code,...Object.keys(rules).filter(k=>k!==code).slice(0,2)];
    const shift=chapter.number?Number(chapter.number)%3:0;for(let i=0;i<shift;i++)options.push(options.shift());
    return {meaning:meaningQuestions[chapter.id],line,foot:line.feet.at(-1),target,reason:{choices:options.map(k=>rules[k]),answer:options.indexOf(code),explanation:target.note||rules[code]}};
  }
  function restore(raw,lesson){
    const p=raw&&typeof raw==='object'?raw:{};
    return {step:Number.isInteger(p.step)?Math.max(0,Math.min(3,p.step)):0,meaning:Number.isInteger(p.meaning)&&p.meaning>=0&&p.meaning<3?p.meaning:null,reason:Number.isInteger(p.reason)&&p.reason>=0&&p.reason<3?p.reason:null,marks:lesson.foot.syllables.map((_,i)=>['S','L','LS'].includes(p.marks?.[i])?p.marks[i]:''),checked:!!p.checked};
  }
  const isComplete=(p,lesson)=>p.meaning===lesson.meaning.answer&&p.reason===lesson.reason.answer&&p.checked&&lesson.foot.syllables.every((s,i)=>p.marks[i]===s.mark);
  const noteFor=s=>s.note||rules[s.operation]||rules[s.natural==='S'?'short':'long'];
  function render({chapter,chapters,lines,words,progress,completedIds,esc,marks,renderPlayer,playPattern,stopTones,sourceLinks,onUpdate,onChapter,onFree,onSave,isSaved}){
    const main=document.querySelector('#main'),lesson=lessonFor(chapter,lines),p=restore(progress,lesson);
    const $=s=>main.querySelector(s),$$=s=>[...main.querySelectorAll(s)];
    let lineIndex=0,footIndex=lines[0].feet.length-1;
    main.innerHTML=`<div class="page-intro"><div><span class="eyebrow">BEYİT ATÖLYESİ</span><h1>Dinle. Anla. Kendin çöz.</h1></div><p class="intro-copy">Bir beyit üzerinde dört adım.<br>Neyi, niçin yaptığını görerek ilerle.</p></div><div class="listen-links"><a href="#ritimler">▶ Ritimleri dinle</a><a href="#arsiv">Kayıtların tamamı ↗</a><button class="text-button" id="freeExplore">Şerhi ve taktîyi aç ↗</button></div>
      <div class="workspace journey-workspace"><aside><div class="chapter-list" aria-label="Çalışacağın beyti seç">${chapters.map(c=>`<button class="chapter-button ${c.id===chapter.id?'active':''}" data-chapter="${esc(c.id)}" aria-pressed="${c.id===chapter.id}"><span class="n">${completedIds.includes(c.id)?'✓':esc(c.number)}</span><span><strong>${esc(c.poet)}</strong><small>${completedIds.includes(c.id)?'Tatbikatlar tamam':'Beyit atölyesi'}</small></span></button>`).join('')}</div><p class="sidebar-note" id="journeyTotal">${completedIds.length} / ${chapters.length} beyit çalışıldı.<br>İlerlemen bu tarayıcıda saklanır.</p></aside><section class="journey-shell">
      <div class="journey-top"><span>${esc(chapter.poet)}</span><button id="journeySave" class="bookmark" aria-label="Beyti defterine ekle" aria-pressed="${isSaved}">${isSaved?'★':'☆'}</button></div>
      <nav class="journey-steps" aria-label="Beyit çalışma adımları">${['Dinle','Anla','Ritmi izle','Kendin çöz'].map((s,i)=>`<button data-step="${i}"><span>${i+1}</span>${s}</button>`).join('')}</nav>
      <div class="journey-poem"><div class="couplet">${chapter.lines.map((l,i)=>`<p class="poem-line" data-poem-line="${i}">${esc(l)}</p>`).join('')}</div></div>
      <div class="record-player" id="recordPlayer"></div><div id="journeyBody" class="journey-body"></div>
      <details class="journey-sources"><summary>Metnin ve taktînin kaynakları</summary>${sourceLinks(lines.flatMap(l=>l.sourceIds||[]))}<p>Bu taktîler, kaynak metinler esas alınarak Fâilâtün için hazırlanmıştır.</p></details>
      </section></div>`;
    const owner=$('.journey-shell');
    const store=()=>onUpdate({...p,marks:[...p.marks]},isComplete(p,lesson));
    const go=step=>{stopTones();p.step=step;store();paint();$('#journeyBody').focus({preventScroll:true});$('#journeyBody').scrollIntoView({block:'start',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
    $('#journeyBody').tabIndex=-1;
    $('#freeExplore').onclick=onFree;
    $('#journeySave').onclick=()=>{onSave();const b=$('#journeySave'),saved=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',saved);b.textContent=saved?'★':'☆'};
    $$('[data-chapter]').forEach(b=>b.onclick=()=>onChapter(b.dataset.chapter));
    $$('[data-step]').forEach(b=>b.onclick=()=>go(Number(b.dataset.step)));
    function navigation(nextLabel){return `<div class="journey-actions">${p.step?'<button class="text-button" id="journeyBack">← Önceki adım</button>':'<span>Önce asıl okuyuşa kulak ver.</span>'}<button class="primary" id="journeyNext">${nextLabel} →</button></div>`}
    function paint(){
      $$('[data-step]').forEach((b,i)=>{b.classList.toggle('active',i===p.step);if(i===p.step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
      const body=$('#journeyBody');
      if(p.step===0){body.innerHTML=`<span class="eyebrow">1 / 4 · DİNLE</span><h2>Önce sözün sesini duy.</h2><p class="journey-lead">Yukarıdaki “Hayâtî İnanç’tan dinle” düğmesine bas. İstersen okuyuşu yavaşlat veya tekrar et.</p><div class="journey-listen-prompt"><b>Dinlerken düşün</b><p>${esc(chapter.prompts[0])}</p></div>${navigation('Kelimeleri aç')}`}
      if(p.step===1){body.innerHTML=`<span class="eyebrow">2 / 4 · ANLA</span><h2>Kelimeler sana açılsın.</h2><p class="journey-lead">Bir kelimeye dokun; beyitteki manasını gör.</p><div class="journey-words">${words.map(([word],i)=>`<button data-word="${i}" aria-pressed="${i===0}">${esc(word)}</button>`).join('')}</div><div id="journeyDefinition" class="journey-definition" role="status"></div><details class="journey-meaning" open><summary>Beytin manası ve şerhi</summary><p>${esc(chapter.meaning)}</p><p class="subtle">${esc(chapter.deep)}</p></details>${navigation('Ritme geç')}`;
        const word=i=>{const [w,d]=words[i];$('#journeyDefinition').innerHTML=`<strong>${esc(w)}</strong><p>${esc(d)}</p>`;$$('[data-word]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.word)===i))};$$('[data-word]').forEach(b=>b.onclick=()=>word(Number(b.dataset.word)));word(0);
      }
      if(p.step===2){paintRhythm(body)}
      if(p.step===3){paintChallenge(body)}
      if($('#journeyNext'))$('#journeyNext').onclick=()=>go(p.step+1);
      if($('#journeyBack'))$('#journeyBack').onclick=()=>go(p.step-1);
    }
    function paintRhythm(body){const line=lines[lineIndex],foot=line.feet[footIndex];
      body.innerHTML=`<span class="eyebrow">3 / 4 · RİTMİ İZLE</span><h2>Hecenin yerini duy.</h2><div class="journey-line-tabs">${lines.map((_,i)=>`<button data-journey-line="${i}" aria-pressed="${i===lineIndex}">${i+1}. mısra</button>`).join('')}</div><p class="journey-line-label">${esc(line.text)}</p><p class="subtle" style="margin-bottom:14px">Parçalar incelemek içindir; şiiri okurken her sınırda durmak gerekmez.</p><div class="journey-foot-tabs" aria-label="Mısranın parçaları">${line.feet.map((f,i)=>`<button data-journey-foot="${i}" aria-pressed="${i===footIndex}"><small>${i+1}. parça</small>${esc(f.name)}</button>`).join('')}</div><div class="journey-heces">${foot.syllables.map((s,i)=>`<button data-journey-syllable="${i}" aria-label="${esc(s.text)}: ${s.mark==='LS'?'med':s.mark==='L'?'uzun':'kısa'}. İzahı aç."><strong>${esc(s.text)}</strong><span class="syllable-pulses">${[...s.mark].map(m=>`<span class="pulse-mark">${marks(m)}</span>`).join('')}</span><small>${s.mark==='LS'?'tek hecede med':s.mark==='L'?'uzun':'kısa'}</small></button>`).join('')}</div><div class="journey-audio-actions"><button class="primary" id="journeyPattern" aria-pressed="false">▶ Bu parçayı dinle</button><span>Ritim vuruşları · Uzun 2, kısa 1 zaman</span></div><div class="journey-syllable-note" id="journeySyllableNote" role="status">Bir heceye dokun. Niçin kısa veya uzun olduğunu öğren.</div>${navigation('Kendin çöz')}`;
      const bodyOwner=$('.journey-heces');let playing=false,attempt=0;
      const reset=()=>{playing=false;if(!owner.isConnected||!bodyOwner.isConnected)return;$('#journeyPattern').textContent='▶ Bu parçayı dinle';$('#journeyPattern').setAttribute('aria-pressed','false')};
      $('#journeyPattern').onclick=async()=>{if(playing){attempt++;stopTones();reset();return}stopTones();const ticket=++attempt;playing=true;$('#journeyPattern').textContent='■ Durdur';$('#journeyPattern').setAttribute('aria-pressed','true');const ok=await playPattern(foot.pattern,72,reset);if(!ok&&ticket===attempt)reset()};
      $$('[data-journey-syllable]').forEach(b=>b.onclick=()=>{const s=foot.syllables[Number(b.dataset.journeySyllable)];$$('[data-journey-syllable]').forEach(x=>x.classList.toggle('selected',x===b));$('#journeySyllableNote').innerHTML=`<b>${esc(s.text)}</b> · ${esc(noteFor(s))}`});
      $$('[data-journey-line]').forEach(b=>b.onclick=()=>{stopTones();lineIndex=Number(b.dataset.journeyLine);footIndex=lines[lineIndex].feet.length-1;paint()});
      $$('[data-journey-foot]').forEach(b=>b.onclick=()=>{stopTones();footIndex=Number(b.dataset.journeyFoot);paint()});
    }
    function paintChallenge(body){
      const finished=isComplete(p,lesson),foot=lesson.foot;
      const options=(key,q)=>q.choices.map((text,i)=>`<button data-journey-answer="${key}" data-choice="${i}" aria-pressed="${p[key]===i}" class="${p[key]===i?(i===q.answer?'correct':'incorrect'):''}">${esc(text)}</button>`).join('');
      body.innerHTML=`<span class="eyebrow">4 / 4 · KENDİN ÇÖZ</span><h2>Şimdi sıra sende.</h2><p class="journey-lead">Üç kısa tatbikat. Her cevabın izahını göreceksin.</p>
        <section class="journey-question"><h3>1. “${esc(lesson.meaning.word)}” bu beyitte ne demek?</h3><div class="journey-answers">${options('meaning',lesson.meaning)}</div><p id="meaningFeedback" class="journey-feedback ${p.meaning===null?'':p.meaning===lesson.meaning.answer?'good':'bad'}" role="status">${p.meaning===null?'':`${p.meaning===lesson.meaning.answer?'Doğru.':'Bir daha düşün.'} ${esc(lesson.meaning.explanation)}`}</p></section>
        <section class="journey-question"><h3>2. İlk mısranın son parçasını işaretle.</h3><p class="subtle">${esc(foot.name)} · Heceye dokunarak kısa veya uzun değerini seç.</p><div class="journey-mark-answer">${foot.syllables.map((s,i)=>`<button data-journey-mark="${i}" aria-label="${esc(s.text)} hecesi: ${p.marks[i]?marks(p.marks[i]):'henüz seçilmedi'}. Değeri değiştir." class="${p.checked?(p.marks[i]===s.mark?'correct':'incorrect'):''}"><strong>${esc(s.text)}</strong><span>${p.marks[i]?marks(p.marks[i]):'?'}</span></button>`).join('')}</div><button class="secondary" id="checkJourneyMarks">İşaretlerimi kontrol et</button><p class="journey-feedback ${p.checked?(p.marks.every((m,i)=>m===foot.syllables[i].mark)?'good':'bad'):''}" id="marksFeedback" role="status">${p.checked?(p.marks.every((m,i)=>m===foot.syllables[i].mark)?'Doğru: '+esc(foot.name)+' = '+marks(foot.pattern):foot.syllables.filter((s,i)=>p.marks[i]!==s.mark).map(s=>esc(s.text)+': '+esc(noteFor(s))).join(' ')):''}</p></section>
        <section class="journey-question"><h3>3. “${esc(lesson.target.text)}” hecesinin değeri niçin böyle?</h3><p class="subtle">${esc(lesson.line.text)}<br>İşaretli hece: ${esc(lesson.target.text)} = ${marks(lesson.target.mark)}</p><div class="journey-answers">${options('reason',lesson.reason)}</div><p id="reasonFeedback" class="journey-feedback ${p.reason===null?'':p.reason===lesson.reason.answer?'good':'bad'}" role="status">${p.reason===null?'':`${p.reason===lesson.reason.answer?'Doğru.':'Bir daha düşün.'} ${esc(lesson.reason.explanation)}`}</p></section>
        ${finished?`<div class="journey-complete" role="status"><span>✓</span><div><h3>Bu beyti çalıştın.</h3><p>Manayı seçtin, ritmi kurdun ve hecenin bu değeri niçin aldığını gösterdin.</p></div></div><div class="journey-actions"><button class="text-button" id="restartJourney">Beyti yeniden çalış</button><button class="primary" id="nextJourney">Sıradaki beyit →</button></div>`:`<div class="journey-actions"><button class="text-button" id="journeyBack">← Ritme yeniden bak</button><p>Üç tatbikat doğru tamamlanınca<br>beyit ilerlemene eklenir.</p></div>`}`;
      $$('[data-journey-answer]').forEach(b=>b.onclick=()=>{const key=b.dataset.journeyAnswer;p[key]=Number(b.dataset.choice);store();paint();const next=$(`[data-journey-answer="${key}"][data-choice="${p[key]}"]`);next?.focus({preventScroll:true});updateCompletion()});
      $$('[data-journey-mark]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.journeyMark),values=foot.syllables.some(s=>s.mark==='LS')?['','S','L','LS']:['','S','L'];p.marks[i]=values[(values.indexOf(p.marks[i])+1)%values.length];p.checked=false;store();paint();$(`[data-journey-mark="${i}"]`).focus({preventScroll:true});updateCompletion()});
      $('#checkJourneyMarks').onclick=()=>{p.checked=true;store();paint();$('#checkJourneyMarks').focus({preventScroll:true});updateCompletion()};
      if($('#restartJourney'))$('#restartJourney').onclick=()=>{p.meaning=null;p.reason=null;p.marks=foot.syllables.map(()=> '');p.checked=false;go(0);updateCompletion()};
      if($('#nextJourney'))$('#nextJourney').onclick=()=>{const next=chapters.find(c=>c.id!==chapter.id&&!completedIds.includes(c.id))||chapters[(chapters.findIndex(c=>c.id===chapter.id)+1)%chapters.length];onChapter(next.id)};
    }
    function updateCompletion(){const complete=isComplete(p,lesson),ids=completedIds.filter(id=>id!==chapter.id);if(complete)ids.push(chapter.id);$('#journeyTotal').innerHTML=`${ids.length} / ${chapters.length} beyit çalışıldı.<br>İlerlemen bu tarayıcıda saklanır.`;const selected=$('[data-chapter="'+chapter.id+'"]');selected.querySelector('.n').textContent=complete?'✓':chapter.number;selected.querySelector('small').textContent=complete?'Tatbikatlar tamam':'Beyit atölyesi'}
    paint();renderPlayer(chapter);
  }
  window.AruzJourney={lessonFor,restore,isComplete,render};
})();
