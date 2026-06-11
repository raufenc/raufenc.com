(function(global){
  'use strict';

  const DEFAULT_GAME_TITLES = {
    flashcards: ['بِطاقات المُفْرَدات', 'اُنْظُر الصّورَة وَاقْرَأ الكَلِمَة.'],
    match: ['المُطابَقَة', 'صِل المَدينَة بِما تَشْتَهِرُ بِه.'],
    quiz: ['الاِخْتِبار', 'اِخْتَر الجَواب الصَّحيح.'],
    truefalse: ['صَحّ أَمْ خَطَأ', 'هَل الجُمْلَة صَحيحَة؟'],
    sentenceOrder: ['تَرْتيب الجُمْلَة', 'رَتِّب الكَلِمات بِالتَّرْتيب الصَّحيح.'],
    fillBlank: ['الكَلِمَة النّاقِصَة', 'أَكْمِل الجُمْلَة بِالكَلِمَة المُناسِبَة.'],
    memory: ['الذّاكِرَة', 'طابِق الكَلِمَة مَع صورَتِها.'],
    oddOneOut: ['المُخْتَلِف', 'حَدِّد الكَلِمَة المُخْتَلِفَة.'],
    wordSearch: ['البَحْث عَن الكَلِمات', 'اِبْحَثْ عَنْ حُروف الكَلِمَة.'],
    dialogueBuilder: ['بِناء الحِوار', 'رَتِّبْ سُطور الحِوار.'],
    wheel: ['عَجَلَة الأَسْئِلَة', 'أَدِر العَجَلَة وَأَجِبْ.'],
    balloonPop: ['فَرْقَعَة البالونات', 'فَرْقِع البالون المُناسِب لِلصّورَة.'],
    typing: ['تَرْتيب الحُروف', 'رَتِّب الحُروف لِتَكْتُبَ الكَلِمَة.'],
    clock: ['كَم السّاعَة؟', 'اُنْظُر السّاعَة وَاخْتَر الجَواب الصَّحيح.'],
    map: ['أَيْن تَقَعُ؟', 'اِضْغَطْ عَلى مَكان المَدينَة في الخَريطَة.'],
    classify: ['صَنِّف الكَلِمات', 'صَنِّف الكَلِمَة في المَجْموعَة المُناسِبَة.'],
    demonstrative: ['هَذا، هَذِه، هَؤُلاء', 'اِخْتَر اسْم الإِشارَة المُناسِب.'],
    secretWord: ['كَلِمَة السِّرّ', 'أَجِبْ عَن الأَسْئِلَة لِتَجِدَ كَلِمَة السِّرّ.']
  };

  const EMOJI_CATS = ['places','foods','adjectives','directions','people','time'];

  function $(sel, root){ return (root || document).querySelector(sel); }
  function $all(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }
  function clamp(n,min,max){ return Math.max(min, Math.min(max,n)); }
  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }
  function sample(arr, n){ return shuffle(arr || []).slice(0, n || arr.length); }
  function escapeHtml(s){ return String(s == null ? '' : s).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function stripHarakat(str){ return String(str || '').replace(/[\u064B-\u065F\u0670]/g,''); }
  function normalizeArabic(str){
    return stripHarakat(str)
      .replace(/[إأآٱ]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/ة/g,'ه')
      .replace(/ؤ/g,'و')
      .replace(/ئ/g,'ي')
      .replace(/ـ/g,'')
      .replace(/\s+/g,'')
      .trim();
  }
  function speak(text){
    try{
      if(!('speechSynthesis' in global)) return;
      const u = new SpeechSynthesisUtterance(stripHarakat(text));
      u.lang = 'ar-SA';
      u.rate = 0.78;
      global.speechSynthesis.cancel();
      global.speechSynthesis.speak(u);
    }catch(e){}
  }
  function getData(options){
    const data = options && options.data || global.Unit4Database;
    if(!data) throw new Error('Unit4Database not found.');
    return data;
  }
  function containerOf(container){
    if(typeof container === 'string') return document.querySelector(container);
    return container;
  }
  function makeShell(container, type, options){
    const titles = DEFAULT_GAME_TITLES[type] || ['الوَحْدَة ٤', ''];
    const title = (options && options.title) || titles[0];
    const subtitle = (options && options.subtitle) || titles[1];
    container.classList.add('u4-game');
    container.innerHTML = `
      <div class="u4-header">
        <div>
          <h2 class="u4-title">${escapeHtml(title)}</h2>
          <div class="u4-subtitle">${escapeHtml(subtitle)}</div>
        </div>
        <div class="u4-row">
          <span class="u4-pill">الوَحْدَة ٤</span>
          <span class="u4-pill u4-score" data-score>0 / 0</span>
        </div>
      </div>
      <div class="u4-progress" aria-label="progress"><span data-progress></span></div>
      <div data-body style="margin-top:16px"></div>
      <div class="u4-feedback" data-feedback></div>
      <div class="u4-footer-note">مَدينَتي وَبَلَدي</div>
    `;
    return {
      body: $('[data-body]', container),
      score: $('[data-score]', container),
      progress: $('[data-progress]', container),
      feedback: $('[data-feedback]', container)
    };
  }
  function setScore(shell, correct, total, current, max){
    shell.score.textContent = `${correct} / ${total}`;
    const pct = max ? Math.round((current / max)*100) : (total ? Math.round((correct/total)*100) : 0);
    shell.progress.style.width = `${clamp(pct,0,100)}%`;
  }
  function feedback(shell, text, cls){
    shell.feedback.textContent = text || '';
    shell.feedback.className = 'u4-feedback' + (cls ? ' ' + cls : '');
  }
  function finalScreen(shell, correct, total, restart){
    const pct = total ? Math.round(correct*100/total) : 0;
    shell.body.innerHTML = `
      <div class="u4-card u4-center" style="flex-direction:column;gap:12px;text-align:center">
        <div style="font-size:56px">${pct >= 80 ? '🏆' : pct >= 50 ? '🌟' : '📘'}</div>
        <div class="u4-title">${pct}%</div>
        <div class="u4-muted">${correct} / ${total} ✅</div>
        <button class="u4-btn" data-restart>إِعادَة 🔄</button>
      </div>`;
    $('[data-restart]', shell.body).addEventListener('click', restart);
    feedback(shell, '', '');
    setScore(shell, correct, total, total, total);
  }
  function optionButton(label, index){ return `<button class="u4-option" data-index="${index}">${escapeHtml(label)}</button>`; }

  function renderFlashcards(container, data, options){
    const shell = makeShell(container, 'flashcards', options);
    const list = sample(data.vocabulary.filter(v => v.emoji && EMOJI_CATS.includes(v.category)), options.limit || 40);
    let i=0, flipped=false;
    function draw(){
      const item = list[i];
      setScore(shell, i+1, list.length, i+1, list.length);
      shell.body.innerHTML = `
        <div class="u4-card" style="min-height:330px;display:flex;flex-direction:column;justify-content:center;gap:12px">
          <div class="u4-muted">بِطاقَة مُفْرَدات — اِضْغَطْ عَلى البِطاقَة لِلقَلْب 👆</div>
          <div class="u4-big-ar" dir="rtl">${escapeHtml(item.ar)}</div>
          <div class="u4-emoji" style="font-size:96px">${flipped ? escapeHtml(item.emoji || '🔤') : '👆'}</div>
        </div>
        <div class="u4-actions">
          <button class="u4-btn secondary" data-prev>→ السّابِق</button>
          <button class="u4-btn" data-flip>اِقْلِبْ 🔄</button>
          <button class="u4-btn secondary" data-speak>🔊</button>
          <button class="u4-btn orange" data-next>التّالي ←</button>
        </div>`;
      $('.u4-card', shell.body).addEventListener('click', () => { flipped = !flipped; draw(); });
      $('[data-flip]', shell.body).addEventListener('click', () => { flipped = !flipped; draw(); });
      $('[data-speak]', shell.body).addEventListener('click', () => speak(item.ar));
      $('[data-prev]', shell.body).addEventListener('click', () => { i=(i-1+list.length)%list.length; flipped=false; draw(); });
      $('[data-next]', shell.body).addEventListener('click', () => { i=(i+1)%list.length; flipped=false; draw(); });
    }
    draw();
  }

  function renderMatch(container, data, options){
    const shell = makeShell(container, 'match', options);
    const pairs = sample(data.gameBanks.matchPairs, options.limit || 8);
    let selected = null, correct = 0, attempts = 0;
    function draw(){
      setScore(shell, correct, pairs.length, correct, pairs.length);
      shell.body.innerHTML = `
        <div class="u4-card"><div class="u4-muted" dir="rtl" style="text-align:center">اِخْتَر المَدينَة ثُمَّ صِلْها بِما تَشْتَهِرُ بِه.</div></div>
        <div class="u4-grid u4-grid-2" style="margin-top:14px">
          <div class="u4-card u4-match-col" data-chips>
            ${shuffle(pairs).map(p=>`<button class="u4-chip u4-ar" draggable="true" data-ar="${escapeHtml(p.left)}">${escapeHtml(p.left)}</button>`).join('')}
          </div>
          <div class="u4-card u4-match-col" data-targets>
            ${shuffle(pairs).map(p=>`<div class="u4-match-target u4-ar" data-expect="${escapeHtml(p.left)}"><span class="u4-target-text">${escapeHtml(p.right)}</span></div>`).join('')}
          </div>
        </div>`;
      const chips = $all('.u4-chip', shell.body);
      chips.forEach(ch => {
        ch.addEventListener('click', () => { if(ch.classList.contains('used')) return; chips.forEach(c=>c.classList.remove('active')); selected = ch; ch.classList.add('active'); });
        ch.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', ch.dataset.ar); selected = ch; });
      });
      $all('.u4-match-target', shell.body).forEach(t => {
        t.addEventListener('dragover', e => { e.preventDefault(); t.classList.add('u4-drop-hover'); });
        t.addEventListener('dragleave', () => t.classList.remove('u4-drop-hover'));
        t.addEventListener('drop', e => { e.preventDefault(); t.classList.remove('u4-drop-hover'); check(t, e.dataTransfer.getData('text/plain')); });
        t.addEventListener('click', () => { if(selected) check(t, selected.dataset.ar); });
      });
    }
    function check(target, ar){
      if(target.classList.contains('filled')) return;
      attempts++;
      const chip = $all('.u4-chip', shell.body).find(c => c.dataset.ar === ar);
      if(target.dataset.expect === ar){
        correct++;
        const pair = pairs.find(p=>p.left===ar);
        target.classList.add('filled');
        target.innerHTML = `<span class="u4-ar"><b>${escapeHtml(pair.left)}</b> — ${escapeHtml(pair.right)}</span>`;
        if(chip) chip.classList.add('used');
        selected = null;
        feedback(shell, '✅ أَحْسَنْت', 'good');
      }else{
        feedback(shell, '🔁 حاوِلْ ثانِيَة', 'bad');
      }
      setScore(shell, correct, pairs.length, correct, pairs.length);
      if(correct === pairs.length) setTimeout(() => finalScreen(shell, correct, pairs.length, () => renderMatch(container, data, options)), 650);
    }
    draw();
  }

  function renderMCQGame(container, data, options, type, source, formatter){
    const shell = makeShell(container, type, options);
    const items = sample(source, options.limit || Math.min(12, source.length));
    let idx=0, correct=0, locked=false;
    function draw(){
      const q = items[idx]; locked=false;
      setScore(shell, correct, items.length, idx, items.length);
      const f = formatter(q);
      // Şıkları karıştır (>2 ise), doğru cevabın yeni konumunu hesapla → konum yanlılığını önler
      const order = f.options.length > 2 ? shuffle(f.options.map((_, i) => i)) : f.options.map((_, i) => i);
      const shOptions = order.map(i => f.options[i]);
      const shAnswerIndex = order.indexOf(f.answerIndex);
      shell.body.innerHTML = `
        <div class="u4-card">
          ${f.visual || ''}
          <div class="u4-mid-ar" dir="rtl">${escapeHtml(f.prompt)}</div>
          ${f.hint ? `<div class="u4-muted">${escapeHtml(f.hint)}</div>` : ''}
        </div>
        <div class="u4-grid u4-grid-2" style="margin-top:14px">
          ${shOptions.map((o,i)=>optionButton(o,i)).join('')}
        </div>`;
      $all('.u4-option', shell.body).forEach(btn => btn.addEventListener('click', () => choose(btn, shAnswerIndex, f.after || '')));
    }
    function choose(btn, answerIndex, after){
      if(locked) return;
      locked=true;
      const chosen = Number(btn.dataset.index);
      const buttons = $all('.u4-option', shell.body);
      buttons.forEach((b,i)=>{ if(i===answerIndex) b.classList.add('correct'); if(i===chosen && i!==answerIndex) b.classList.add('wrong'); b.disabled = true; });
      if(chosen === answerIndex){ correct++; feedback(shell, after || '✅ صَحيح', 'good'); }
      else feedback(shell, after || '❌', 'bad');
      setScore(shell, correct, items.length, idx+1, items.length);
      setTimeout(() => { idx++; if(idx >= items.length) finalScreen(shell, correct, items.length, () => renderMCQGame(container, data, options, type, source, formatter)); else draw(); }, 950);
    }
    draw();
  }

  function renderQuiz(container, data, options){
    renderMCQGame(container, data, options, 'quiz', data.gameBanks.quizQuestions, q => ({prompt:q.prompt, options:q.options, answerIndex:q.answerIndex, hint:''}));
  }
  function renderTrueFalse(container, data, options){
    const src = data.gameBanks.trueFalse.map(q => ({...q, options:['صَحّ','خَطَأ'], answerIndex:q.answer ? 0 : 1}));
    renderMCQGame(container, data, options, 'truefalse', src, q => ({prompt:q.statement, options:q.options, answerIndex:q.answerIndex, after:q.explanation}));
  }
  function renderOddOneOut(container, data, options){
    renderMCQGame(container, data, options, 'oddOneOut', data.gameBanks.oddOneOut, q => ({prompt:`حَدِّد الكَلِمَة المُخْتَلِفَة`, options:q.options, answerIndex:q.oddIndex, after:q.explanation}));
  }
  function clockSVG(h, m){
    const minAngle = m * 6;
    const hourAngle = (h % 12) * 30 + m * 0.5;
    const nums = ['١٢','١','٢','٣','٤','٥','٦','٧','٨','٩','١٠','١١'];
    let labels = '';
    for(let i=0;i<12;i++){
      const ang = (i*30 - 90) * Math.PI/180;
      const x = 100 + 73*Math.cos(ang), y = 100 + 73*Math.sin(ang);
      labels += `<text x="${x.toFixed(1)}" y="${(y+6.5).toFixed(1)}" text-anchor="middle" font-size="17" font-weight="800" fill="#172033">${nums[i]}</text>`;
    }
    let ticks = '';
    for(let i=0;i<60;i++){
      if(i%5===0) continue;
      const ang=(i*6-90)*Math.PI/180;
      ticks += `<line x1="${(100+85*Math.cos(ang)).toFixed(1)}" y1="${(100+85*Math.sin(ang)).toFixed(1)}" x2="${(100+90*Math.cos(ang)).toFixed(1)}" y2="${(100+90*Math.sin(ang)).toFixed(1)}" stroke="#cfdff0" stroke-width="1.5"/>`;
    }
    return `<div class="u4-clock-wrap"><svg viewBox="0 0 200 200" class="u4-clock" aria-hidden="true">
      <circle cx="100" cy="100" r="95" fill="#fff" stroke="#0f6fff" stroke-width="6"/>
      ${ticks}${labels}
      <line x1="100" y1="100" x2="100" y2="58" stroke="#172033" stroke-width="7" stroke-linecap="round" transform="rotate(${hourAngle} 100 100)"/>
      <line x1="100" y1="100" x2="100" y2="34" stroke="#db334d" stroke-width="4.5" stroke-linecap="round" transform="rotate(${minAngle} 100 100)"/>
      <circle cx="100" cy="100" r="6" fill="#172033"/>
    </svg></div>`;
  }
  function renderClock(container, data, options){
    const bank = data.gameBanks.clockItems;
    const src = sample(bank, options.limit || bank.length).map(it => {
      const others = sample(bank.filter(o => o.ar !== it.ar), 3).map(o => o.ar);
      return Object.assign({}, it, { options: [it.ar].concat(others), answerIndex: 0 });
    });
    renderMCQGame(container, data, Object.assign({}, options, {limit: src.length}), 'clock', src, q => ({
      visual: clockSVG(q.h, q.m),
      prompt: 'كَم السّاعَة الآن؟',
      options: q.options,
      answerIndex: q.answerIndex
    }));
  }
  function renderDemonstrative(container, data, options){
    const DEMS = ['هَذا','هَذِه','هَؤُلاء'];
    const src = data.gameBanks.demonstratives.map(d => Object.assign({}, d, {options: DEMS.slice(), answerIndex: DEMS.indexOf(d.answer)}));
    renderMCQGame(container, data, options, 'demonstrative', src, q => ({
      visual: `<div style="text-align:center;font-size:84px;line-height:1.25">${escapeHtml(q.emoji)}</div>`,
      prompt: `________ ${q.word}`,
      options: q.options,
      answerIndex: q.answerIndex
    }));
  }
  function renderFillBlank(container, data, options){
    renderMCQGame(container, data, options, 'fillBlank', data.gameBanks.fillBlanks, q => ({prompt:q.text, options:q.options, answerIndex:q.options.indexOf(q.answer), hint:''}));
  }

  function renderSentenceOrder(container, data, options){
    const shell = makeShell(container, 'sentenceOrder', options);
    const list = sample(data.gameBanks.sentenceOrder, options.limit || data.gameBanks.sentenceOrder.length);
    let idx=0, correct=0, answer=[];
    function draw(){
      const item = list[idx]; answer=[];
      const bank = shuffle(item.tokens.map((t,i)=>({t, i})));
      setScore(shell, correct, list.length, idx, list.length);
      shell.body.innerHTML = `
        <div class="u4-card"><div class="u4-muted">الجُمْلَة</div><div class="u4-sentence-answer" data-answer></div></div>
        <div class="u4-card" style="margin-top:14px"><div class="u4-muted">الكَلِمات</div><div class="u4-sentence-bank" data-bank>
          ${bank.map(x=>`<button class="u4-token" data-i="${x.i}">${escapeHtml(x.t)}</button>`).join('')}
        </div></div>
        <div class="u4-actions"><button class="u4-btn secondary" data-clear>مَسْح</button><button class="u4-btn" data-check>تَحَقَّقْ ✅</button></div>`;
      $all('.u4-token', $('[data-bank]', shell.body)).forEach(btn=>btn.addEventListener('click',()=>{
        btn.classList.add('used'); answer.push({i:Number(btn.dataset.i), t:btn.textContent, source:btn}); redrawAnswer(item);
      }));
      $('[data-clear]', shell.body).addEventListener('click',()=>{ answer.forEach(x=>x.source.classList.remove('used')); answer=[]; redrawAnswer(item); feedback(shell,'',''); });
      $('[data-check]', shell.body).addEventListener('click',()=>check(item));
    }
    function redrawAnswer(item){
      const area = $('[data-answer]', shell.body);
      area.innerHTML = answer.map((x,pos)=>`<button class="u4-token in-answer" data-pos="${pos}">${escapeHtml(x.t)}</button>`).join('');
      $all('.u4-token', area).forEach(btn=>btn.addEventListener('click',()=>{
        const pos=Number(btn.dataset.pos); const [removed]=answer.splice(pos,1); removed.source.classList.remove('used'); redrawAnswer(item);
      }));
    }
    function check(item){
      const got = answer.map(x=>x.t).join(' ');
      const expected = item.tokens.join(' ');
      if(got === expected){
        correct++; feedback(shell,'✅ أَحْسَنْت', 'good');
        setScore(shell, correct, list.length, idx+1, list.length);
        setTimeout(()=>{ idx++; if(idx>=list.length) finalScreen(shell, correct, list.length, () => renderSentenceOrder(container,data,options)); else draw(); }, 900);
      }else feedback(shell,'🔁 حاوِلْ ثانِيَة', 'bad');
    }
    draw();
  }

  function renderMemory(container, data, options){
    const shell = makeShell(container, 'memory', options);
    const vocab = data.vocabulary.filter(v => v.emoji && EMOJI_CATS.includes(v.category));
    const pairs = sample(vocab, options.limit || 8);
    let cards = shuffle(pairs.flatMap((p,i)=>[
      {id:i, text:p.ar, kind:'ar'}, {id:i, text:p.emoji, kind:'emoji'}
    ]));
    let open=[], done=0, moves=0;
    function draw(){
      setScore(shell, done, pairs.length, done, pairs.length);
      shell.body.innerHTML = `<div class="u4-memory-grid">${cards.map((c,i)=>`<button class="u4-memory-card face-down" data-i="${i}">؟</button>`).join('')}</div>`;
      $all('.u4-memory-card', shell.body).forEach(card => card.addEventListener('click', () => flip(Number(card.dataset.i))));
    }
    function flip(i){
      const card = $(`.u4-memory-card[data-i="${i}"]`, shell.body);
      const dataCard = cards[i];
      if(dataCard.done || open.some(x=>x.i===i) || open.length>=2) return;
      card.classList.remove('face-down'); card.textContent = dataCard.text; if(dataCard.kind==='ar') card.classList.add('u4-ar');
      open.push({i, data:dataCard, el:card});
      if(open.length === 2){
        moves++;
        const ok = open[0].data.id === open[1].data.id && open[0].data.kind !== open[1].data.kind;
        if(ok){
          open.forEach(x=>{ x.data.done=true; x.el.classList.add('done'); }); done++; open=[]; feedback(shell,'✅ مُطابَق', 'good'); setScore(shell, done, pairs.length, done, pairs.length);
          if(done===pairs.length) setTimeout(()=>finalScreen(shell, done, pairs.length, () => renderMemory(container,data,options)), 700);
        }else{
          open.forEach(x=>x.el.classList.add('miss')); feedback(shell,'❌', 'bad');
          setTimeout(()=>{ open.forEach(x=>{ x.el.classList.remove('miss'); x.el.classList.add('face-down'); x.el.classList.remove('u4-ar'); x.el.textContent='؟'; }); open=[]; }, 700);
        }
      }
    }
    draw();
  }

  function renderWordSearch(container, data, options){
    const shell = makeShell(container, 'wordSearch', options);
    const words = sample(data.gameBanks.wordSearch.words, options.limit || 10).map(w => stripHarakat(w));
    const wsNorm = s => normalizeArabic(s).replace(/^ال/,'');
    const wsEmoji = w => { const v = data.vocabulary.find(x => x.emoji && wsNorm(x.ar) === wsNorm(w)); return v ? v.emoji : '🔤'; };
    const size = options.size || 10;
    const filler = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
    let grid, placements, occupied, targetIdx=0, selected=[];
    function makeGrid(){
      grid = Array.from({length:size}, () => Array.from({length:size}, () => filler[Math.floor(Math.random()*filler.length)]));
      occupied = Array.from({length:size}, () => Array.from({length:size}, () => false));
      placements = [];
      words.forEach((word, wi)=>{
        const chars = Array.from(word);
        let placed=false;
        for(let attempt=0; attempt<100 && !placed; attempt++){
          const dir = Math.random() < .55 ? 'h' : 'v';
          const r = Math.floor(Math.random() * (dir==='v' ? size - chars.length + 1 : size));
          const c = Math.floor(Math.random() * (dir==='h' ? size - chars.length + 1 : size));
          let ok=true;
          for(let k=0;k<chars.length;k++){
            const rr=r+(dir==='v'?k:0), cc=c+(dir==='h'?k:0);
            if(occupied[rr][cc] && grid[rr][cc] !== chars[k]) ok=false;
          }
          if(ok){
            const cells=[];
            for(let k=0;k<chars.length;k++){ const rr=r+(dir==='v'?k:0), cc=c+(dir==='h'?k:0); grid[rr][cc]=chars[k]; occupied[rr][cc]=true; cells.push([rr,cc]); }
            placements[wi] = cells; placed=true;
          }
        }
      });
    }
    function draw(){
      if(!grid) makeGrid();
      const target = words[targetIdx];
      setScore(shell, targetIdx, words.length, targetIdx, words.length);
      shell.body.innerHTML = `
        <div class="u4-card"><div class="u4-muted">الكَلِمَة المَطْلوبَة</div><div style="font-size:52px;line-height:1.1;margin:4px 0">${escapeHtml(wsEmoji(target))}</div><div class="u4-target-word u4-ar">${escapeHtml(target)}</div></div>
        <div class="u4-card" style="margin-top:14px"><div class="u4-wordsearch" style="grid-template-columns:repeat(${size},38px)">
          ${grid.map((row,r)=>row.map((ch,c)=>`<button class="u4-cell" data-r="${r}" data-c="${c}">${escapeHtml(ch)}</button>`).join('')).join('')}
        </div></div>`;
      $all('.u4-cell', shell.body).forEach(cell => cell.addEventListener('click', () => clickCell(cell)));
      markFoundCells();
    }
    function markFoundCells(){
      for(let wi=0; wi<targetIdx; wi++) (placements[wi]||[]).forEach(([r,c]) => { const cell = $(`.u4-cell[data-r="${r}"][data-c="${c}"]`, shell.body); if(cell) cell.classList.add('found'); });
    }
    function clickCell(cell){
      const target = Array.from(words[targetIdx]);
      const expected = target[selected.length];
      if(cell.textContent === expected){
        cell.classList.add('active'); selected.push(cell);
        if(selected.length === target.length){
          selected.forEach(c=>{ c.classList.remove('active'); c.classList.add('found'); });
          feedback(shell,'✅ أَحْسَنْت', 'good');
          targetIdx++; selected=[];
          if(targetIdx>=words.length) setTimeout(()=>finalScreen(shell, words.length, words.length, () => renderWordSearch(container,data,options)), 700);
          else setTimeout(draw, 650);
        }
      }else{
        selected.forEach(c=>c.classList.remove('active')); selected=[]; feedback(shell,'🔁', 'bad');
      }
    }
    draw();
  }

  const MAP_REGION_LABELS = {shamal:'شَمال', janub:'جَنوب', sharq:'شَرْق', gharb:'غَرْب', wasat:'وَسَط'};
  function renderMap(container, data, options){
    const shell = makeShell(container, 'map', options);
    const items = sample(data.gameBanks.mapItems, options.limit || data.gameBanks.mapItems.length);
    let idx=0, correct=0, locked=false;
    function zoneRect(id, x, y, w, h, rx){
      return `<g class="u4-zone" data-region="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><text x="${x+w/2}" y="${y+h/2+9}" text-anchor="middle">${MAP_REGION_LABELS[id]}</text></g>`;
    }
    function draw(){
      const it = items[idx]; locked=false;
      setScore(shell, correct, items.length, idx, items.length);
      shell.body.innerHTML = `
        <div class="u4-card" style="text-align:center">
          <div class="u4-mid-ar" dir="rtl" style="text-align:center">أَيْن تَقَعُ ${escapeHtml(it.city)}؟</div>
          <div class="u4-muted" dir="rtl" style="text-align:center">اِضْغَطْ عَلى الجَواب في خَريطَة تُرْكِيا 👇</div>
        </div>
        <div class="u4-card" style="margin-top:14px">
          <svg viewBox="0 0 680 340" class="u4-map-tr" aria-label="خَريطَة تُرْكِيا">
            <rect x="0" y="0" width="680" height="340" rx="22" fill="#DFF0FB"/>
            ${zoneRect('gharb', 16, 36, 162, 268, 18)}
            ${zoneRect('shamal', 184, 36, 290, 80, 14)}
            ${zoneRect('wasat', 184, 122, 290, 96, 14)}
            ${zoneRect('janub', 184, 224, 290, 80, 14)}
            ${zoneRect('sharq', 480, 36, 184, 268, 18)}
          </svg>
        </div>`;
      $all('.u4-zone', shell.body).forEach(z => z.addEventListener('click', () => choose(z, it)));
    }
    function choose(zone, it){
      if(locked) return; locked=true;
      const picked = zone.dataset.region;
      $all('.u4-zone', shell.body).forEach(z => {
        if(z.dataset.region === it.region) z.classList.add('correct');
        if(z === zone && picked !== it.region) z.classList.add('wrong');
      });
      if(picked === it.region){ correct++; feedback(shell, `✅ ${it.city} في ${MAP_REGION_LABELS[it.region]} تُرْكِيا`, 'good'); }
      else feedback(shell, `❌ ${it.city} في ${MAP_REGION_LABELS[it.region]} تُرْكِيا`, 'bad');
      setScore(shell, correct, items.length, idx+1, items.length);
      setTimeout(() => { idx++; if(idx >= items.length) finalScreen(shell, correct, items.length, () => renderMap(container, data, options)); else draw(); }, 1200);
    }
    draw();
  }

  function renderDialogueBuilder(container, data, options){
    const shell = makeShell(container, 'dialogueBuilder', options);
    const dialogues = sample(data.dialogues, options.limit || data.dialogues.length);
    let idx=0, correct=0, answer=[];
    function draw(){
      const dlg = dialogues[idx]; answer=[];
      setScore(shell, correct, dialogues.length, idx, dialogues.length);
      const shuffled = shuffle(dlg.lines.map((l,i)=>({l,i})));
      shell.body.innerHTML = `
        <div class="u4-card"><b class="u4-ar">${escapeHtml(dlg.title)}</b><div class="u4-muted">رَتِّبْ سُطور الحِوار.</div></div>
        <div class="u4-card" style="margin-top:14px"><div class="u4-muted">الحِوار</div><div data-answer></div></div>
        <div class="u4-card" style="margin-top:14px"><div class="u4-grid">
          ${shuffled.map(x=>`<button class="u4-option u4-ar" data-i="${x.i}"><b>${escapeHtml(x.l.speaker)}:</b>&nbsp;${escapeHtml(x.l.ar)}</button>`).join('')}
        </div></div>
        <div class="u4-actions"><button class="u4-btn secondary" data-clear>مَسْح</button><button class="u4-btn" data-check>تَحَقَّقْ ✅</button></div>`;
      $all('.u4-option', shell.body).forEach(btn=>btn.addEventListener('click',()=>{ btn.classList.add('used'); btn.disabled=true; answer.push({i:Number(btn.dataset.i), html:btn.innerHTML, source:btn}); redraw(); }));
      $('[data-clear]', shell.body).addEventListener('click',()=>{ answer.forEach(x=>{ x.source.disabled=false; x.source.classList.remove('used'); }); answer=[]; redraw(); feedback(shell,'',''); });
      $('[data-check]', shell.body).addEventListener('click',()=>check(dlg));
    }
    function redraw(){
      $('[data-answer]', shell.body).innerHTML = answer.map((x,pos)=>`<div class="u4-dialogue-line"><span class="u4-pill">${pos+1}</span><button class="u4-option u4-ar" data-pos="${pos}">${x.html}</button></div>`).join('');
      $all('[data-pos]', $('[data-answer]', shell.body)).forEach(btn=>btn.addEventListener('click',()=>{ const pos=Number(btn.dataset.pos); const [removed]=answer.splice(pos,1); removed.source.disabled=false; removed.source.classList.remove('used'); redraw(); }));
    }
    function check(dlg){
      const ok = answer.map(x=>x.i).join(',') === dlg.lines.map((_,i)=>i).join(',');
      if(ok){ correct++; feedback(shell,'✅ أَحْسَنْت', 'good'); setTimeout(()=>{ idx++; if(idx>=dialogues.length) finalScreen(shell, correct, dialogues.length, () => renderDialogueBuilder(container,data,options)); else draw(); }, 900); }
      else feedback(shell,'🔁 حاوِلْ ثانِيَة', 'bad');
      setScore(shell, correct, dialogues.length, idx+1, dialogues.length);
    }
    draw();
  }

  function renderWheel(container, data, options){
    const shell = makeShell(container, 'wheel', options);
    const questions = sample(data.gameBanks.wheelQuestions, options.limit || 12);
    let asked=[], correct=0, current=null;
    function drawIntro(){
      setScore(shell, correct, questions.length, asked.length, questions.length);
      shell.body.innerHTML = `
        <div class="u4-wheel" data-wheel><span>🎡</span></div>
        <div class="u4-actions"><button class="u4-btn orange" data-spin>أَدِر العَجَلَة 🎡</button></div>`;
      $('[data-spin]', shell.body).addEventListener('click', spin);
      $('[data-wheel]', shell.body).addEventListener('click', spin);
    }
    function spin(){
      if(asked.length >= questions.length){ finalScreen(shell, correct, questions.length, () => renderWheel(container,data,options)); return; }
      const remaining = questions.filter(q => !asked.includes(q.id));
      current = remaining[Math.floor(Math.random()*remaining.length)];
      asked.push(current.id);
      const wheel = $('[data-wheel]', shell.body);
      wheel.style.transform = `rotate(${720 + Math.random()*720}deg)`;
      setTimeout(drawQuestion, 850);
    }
    function drawQuestion(){
      const wOrder = current.options.length > 2 ? shuffle(current.options.map((_, i) => i)) : current.options.map((_, i) => i);
      const wOptions = wOrder.map(i => current.options[i]);
      const wAnswerIndex = wOrder.indexOf(current.answerIndex);
      shell.body.innerHTML = `
        <div class="u4-card"><div class="u4-mid-ar" dir="rtl">${escapeHtml(current.prompt)}</div></div>
        <div class="u4-grid u4-grid-2" style="margin-top:14px">${wOptions.map((o,i)=>optionButton(o,i)).join('')}</div>`;
      $all('.u4-option', shell.body).forEach(btn => btn.addEventListener('click',()=>{
        const ok = Number(btn.dataset.index) === wAnswerIndex;
        if(ok){ correct++; btn.classList.add('correct'); feedback(shell,'✅ صَحيح', 'good'); } else { btn.classList.add('wrong'); feedback(shell,'❌', 'bad'); }
        setScore(shell, correct, questions.length, asked.length, questions.length);
        setTimeout(()=> asked.length >= questions.length ? finalScreen(shell, correct, questions.length, () => renderWheel(container,data,options)) : drawIntro(), 900);
      }));
    }
    drawIntro();
  }

  const BALLOON_STORE = 'u4-balloon-records';
  function balloonRecords(){
    try { return JSON.parse(localStorage.getItem(BALLOON_STORE) || '[]'); } catch(e){ return []; }
  }
  function balloonBest(){
    const r = balloonRecords();
    return r.length ? r[0].s : 0;
  }
  function balloonSave(name, score){
    const list = balloonRecords();
    list.push({ n: name || 'طالِب', s: score, t: Date.now() });
    list.sort((a,b) => b.s - a.s || a.t - b.t);
    const top = list.slice(0, 10);
    try { localStorage.setItem(BALLOON_STORE, JSON.stringify(top)); } catch(e){}
    return top;
  }
  function renderBalloonPop(container, data, options){
    const shell = makeShell(container, 'balloonPop', options);
    const pool = data.vocabulary.filter(v => v.emoji && EMOJI_CATS.includes(v.category));
    const maxLives = options.lives || 3;
    let queue = shuffle(pool);
    let lives = maxLives, score = 0, locked = false;
    function hud(){
      shell.score.textContent = `🏆 ${score} · ${'❤️'.repeat(lives)}${'🤍'.repeat(maxLives - lives)}`;
      shell.progress.style.width = `${(lives / maxLives) * 100}%`;
    }
    function nextItem(){
      if(!queue.length) queue = shuffle(pool);
      return queue.pop();
    }
    function draw(){
      const item = nextItem(); locked = false;
      hud();
      const opts = shuffle([item].concat(sample(pool.filter(v=>v.id!==item.id), 5))).slice(0,6);
      shell.body.innerHTML = `
        <div class="u4-card">
          <div class="u4-row" style="justify-content:space-between;align-items:center">
            <div class="u4-muted">فَرْقِع الكَلِمَة المُناسِبَة:</div>
            <span class="u4-pill">أَفْضَل نَتيجَة: ${balloonBest()} 🏆</span>
          </div>
          <div style="text-align:center;font-size:80px">${escapeHtml(item.emoji || '🎈')}</div>
        </div>
        <div class="u4-balloon-area" data-area style="margin-top:14px">
          ${opts.map((o,i)=>`<button class="u4-balloon u4-ar" data-id="${escapeHtml(o.id)}" style="left:${8+(i%3)*30}%; top:${18+Math.floor(i/3)*42}%">${escapeHtml(o.ar)}</button>`).join('')}
        </div>`;
      $all('.u4-balloon', shell.body).forEach(b => b.addEventListener('click',()=>{
        if(locked) return; locked = true;
        if(b.dataset.id === item.id){
          score++; b.classList.add('correct'); feedback(shell,'✅ أَحْسَنْت', 'good'); hud();
          setTimeout(draw, 700);
        } else {
          lives--; b.classList.add('wrong'); feedback(shell,`❌ الصَّحيح: ${item.ar}`, 'bad'); hud();
          setTimeout(()=>{ if(lives <= 0) gameOver(); else draw(); }, 950);
        }
      }));
    }
    function gameOver(){
      const best = balloonBest();
      shell.body.innerHTML = `
        <div class="u4-card u4-center" style="flex-direction:column;gap:12px;text-align:center">
          <div style="font-size:56px">🎈</div>
          <div class="u4-title" dir="rtl">اِنْتَهَتِ اللُّعْبَة</div>
          <div class="u4-big-ar">🏆 ${score}</div>
          ${score > best ? `<div class="u4-pill" style="background:#fff7ed;border-color:#fdba74;color:#9a3412">رَقْم قِياسِيّ جَديد! 🎉</div>` : ''}
          <input class="u4-input" data-name placeholder="اِسْمُك" dir="rtl" maxlength="20" style="max-width:280px">
          <div class="u4-actions">
            <button class="u4-btn" data-save>سَجِّل النَّتيجَة 🏆</button>
            <button class="u4-btn secondary" data-again>إِعادَة 🔄</button>
          </div>
        </div>`;
      feedback(shell, '', '');
      $('[data-save]', shell.body).addEventListener('click', () => {
        const name = $('[data-name]', shell.body).value.trim();
        showBoard(balloonSave(name, score));
      });
      $('[data-again]', shell.body).addEventListener('click', () => renderBalloonPop(container, data, options));
    }
    function showBoard(list){
      shell.body.innerHTML = `
        <div class="u4-card" style="text-align:center">
          <div class="u4-title" dir="rtl">لَوْحَة الأَبْطال 🏆</div>
          <div class="u4-records" dir="rtl">
            ${list.map((r,i)=>`<div class="u4-record-row">
              <span class="u4-record-rank">${i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1)}</span>
              <span class="u4-record-name u4-ar">${escapeHtml(r.n)}</span>
              <span class="u4-record-score">${r.s}</span>
            </div>`).join('')}
          </div>
          <div class="u4-actions"><button class="u4-btn orange" data-again>اِلْعَبْ مَرَّة أُخْرى 🎈</button></div>
        </div>`;
      feedback(shell, '', '');
      $('[data-again]', shell.body).addEventListener('click', () => renderBalloonPop(container, data, options));
    }
    draw();
  }

  function renderTyping(container, data, options){
    const shell = makeShell(container, 'typing', options);
    const items = sample(data.gameBanks.typingItems, options.limit || data.gameBanks.typingItems.length);
    let idx=0, correct=0;
    function draw(){
      const item = items[idx];
      const letters = shuffle(Array.from(item.target));
      setScore(shell, correct, items.length, idx, items.length);
      shell.body.innerHTML = `
        <div class="u4-card" style="text-align:center">
          <div class="u4-muted">اُنْظُر الصّورَة ثُمَّ رَتِّب الحُروف لِتَكْتُبَ الكَلِمَة</div>
          <div style="font-size:96px;line-height:1.1">${escapeHtml(item.emoji || '🔤')}</div>
        </div>
        <div class="u4-card" style="margin-top:14px">
          <input class="u4-input" data-input placeholder="✍️" dir="rtl">
          <div class="u4-actions" data-letters>${letters.map(ch=>`<button class="u4-chip" data-ch="${escapeHtml(ch)}">${escapeHtml(ch)}</button>`).join('')}</div>
          <div class="u4-actions"><button class="u4-btn secondary" data-clear>مَسْح</button><button class="u4-btn" data-check>تَحَقَّقْ ✅</button></div>
        </div>`;
      const input = $('[data-input]', shell.body);
      $all('[data-ch]', shell.body).forEach(btn => btn.addEventListener('click',()=>{ input.value += btn.dataset.ch; btn.classList.add('used'); }));
      $('[data-clear]', shell.body).addEventListener('click',()=>{ input.value=''; $all('[data-ch]', shell.body).forEach(b=>b.classList.remove('used')); feedback(shell,'',''); });
      $('[data-check]', shell.body).addEventListener('click',()=>{
        if(normalizeArabic(input.value) === normalizeArabic(item.target)){
          correct++; feedback(shell,'✅ أَحْسَنْت', 'good');
          setScore(shell, correct, items.length, idx+1, items.length);
          setTimeout(()=>{ idx++; if(idx>=items.length) finalScreen(shell, correct, items.length, () => renderTyping(container,data,options)); else draw(); }, 800);
        }else feedback(shell,`🔁 ${item.ar}`, 'bad');
      });
    }
    draw();
  }

  function renderClassify(container, data, options){
    const shell = makeShell(container, 'classify', options);
    const sets = options.setId ? data.gameBanks.classifySets.filter(s => s.id === options.setId) : data.gameBanks.classifySets;
    const rounds = sets.flatMap(set => shuffle(set.items).map(item => ({set, item})));
    let idx=0, correct=0, locked=false;
    function draw(){
      const r = rounds[idx]; locked=false;
      setScore(shell, correct, rounds.length, idx, rounds.length);
      shell.body.innerHTML = `
        <div class="u4-card" style="text-align:center">
          <div class="u4-pill" style="margin-bottom:10px">${escapeHtml(r.set.title)}</div>
          <div class="u4-big-ar" dir="rtl" style="text-align:center">${escapeHtml(r.item.text)}</div>
        </div>
        <div class="u4-grid u4-grid-2" style="margin-top:14px">
          <button class="u4-option u4-cat" data-cat="A">${escapeHtml(r.set.catA)}</button>
          <button class="u4-option u4-cat" data-cat="B">${escapeHtml(r.set.catB)}</button>
        </div>`;
      $all('.u4-cat', shell.body).forEach(btn => btn.addEventListener('click', () => {
        if(locked) return; locked=true;
        const ok = btn.dataset.cat === r.item.cat;
        $all('.u4-cat', shell.body).forEach(b => { if(b.dataset.cat === r.item.cat) b.classList.add('correct'); b.disabled = true; });
        if(ok){ correct++; feedback(shell, '✅ أَحْسَنْت', 'good'); }
        else { btn.classList.add('wrong'); feedback(shell, '❌', 'bad'); }
        setScore(shell, correct, rounds.length, idx+1, rounds.length);
        setTimeout(() => { idx++; if(idx >= rounds.length) finalScreen(shell, correct, rounds.length, () => renderClassify(container, data, options)); else draw(); }, 850);
      }));
    }
    draw();
  }

  function renderSecretWord(container, data, options){
    const shell = makeShell(container, 'secretWord', options);
    const bank = data.gameBanks.secretWord;
    const qs = bank.questions;
    let idx=0, correct=0, locked=false;
    const found = [];
    function slots(){
      const cells = bank.letters.map((L,i) => `<span class="u4-slot${i < found.length ? ' filled' : ''}">${i < found.length ? escapeHtml(found[i]) : (i+1)}</span>`).join('');
      return `<div class="u4-secret-slots" dir="rtl">${cells}<span class="u4-slot given">${escapeHtml(bank.given)}</span></div>`;
    }
    function draw(){
      if(idx >= qs.length){ final(); return; }
      const q = qs[idx]; locked=false;
      const order = shuffle(q.options.map((_,i)=>i));
      const opts = order.map(i=>q.options[i]);
      const ans = order.indexOf(q.answerIndex);
      setScore(shell, correct, qs.length, idx, qs.length);
      shell.body.innerHTML = `
        <div class="u4-card" style="text-align:center">${slots()}</div>
        <div class="u4-card" style="margin-top:14px">
          <div class="u4-mid-ar" dir="rtl" style="text-align:center">${escapeHtml(q.prompt)}</div>
        </div>
        <div class="u4-grid u4-grid-3" style="margin-top:14px">
          ${opts.map((o,i)=>optionButton(o,i)).join('')}
        </div>`;
      $all('.u4-option', shell.body).forEach(btn => btn.addEventListener('click', () => {
        if(locked) return; locked=true;
        const chosen = Number(btn.dataset.index);
        $all('.u4-option', shell.body).forEach((b,i)=>{ if(i===ans) b.classList.add('correct'); if(i===chosen && i!==ans) b.classList.add('wrong'); b.disabled=true; });
        if(chosen === ans){ correct++; feedback(shell, `✅ حَرْف جَديد: «${bank.letters[idx]}»`, 'good'); }
        else feedback(shell, `❌ الحَرْف: «${bank.letters[idx]}»`, 'bad');
        found.push(bank.letters[idx]);
        setScore(shell, correct, qs.length, idx+1, qs.length);
        setTimeout(() => { idx++; draw(); }, 1050);
      }));
    }
    function final(){
      shell.body.innerHTML = `
        <div class="u4-card u4-center" style="flex-direction:column;gap:14px;text-align:center">
          <div style="font-size:56px">🔓</div>
          <div class="u4-muted" dir="rtl">كَلِمَة السِّرّ هِي:</div>
          <div class="u4-big-ar" dir="rtl" style="text-align:center">${escapeHtml(bank.secret)}</div>
          <div class="u4-muted">${correct} / ${qs.length} ✅</div>
          <button class="u4-btn" data-restart>إِعادَة 🔄</button>
        </div>`;
      $('[data-restart]', shell.body).addEventListener('click', () => renderSecretWord(container, data, options));
      feedback(shell, '', '');
      setScore(shell, correct, qs.length, qs.length, qs.length);
    }
    draw();
  }

  const renderers = {
    flashcards: renderFlashcards,
    match: renderMatch,
    quiz: renderQuiz,
    truefalse: renderTrueFalse,
    sentenceOrder: renderSentenceOrder,
    fillBlank: renderFillBlank,
    memory: renderMemory,
    oddOneOut: renderOddOneOut,
    wordSearch: renderWordSearch,
    dialogueBuilder: renderDialogueBuilder,
    wheel: renderWheel,
    balloonPop: renderBalloonPop,
    typing: renderTyping,
    clock: renderClock,
    map: renderMap,
    classify: renderClassify,
    demonstrative: renderDemonstrative,
    secretWord: renderSecretWord
  };

  function fitToViewport(el){
    try{
      if(typeof matchMedia!=='undefined' && matchMedia('(orientation: portrait) and (max-width: 880px)').matches){ el.style.transform=''; return; }
      const p=el.parentElement||document.body;
      el.style.transform='';
      const avail=Math.max(140,(p.clientHeight||window.innerHeight)-8);
      const need=el.scrollHeight;
      const f=Math.min(1,avail/need);
      el.style.transformOrigin='top center';
      el.style.transform=(f<0.999)?('scale('+f.toFixed(4)+')'):'';
    }catch(e){}
  }

  const api = {
    games: Object.keys(renderers),

    mount(container, gameType, options){
      const el = containerOf(container);
      if(!el) throw new Error('container not found.');
      const data = getData(options || {});
      const type = gameType || 'quiz';
      if(!renderers[type]) throw new Error('Unknown type: ' + type);
      renderers[type](el, data, options || {});
      const _fit=()=>fitToViewport(el);
      try{ new MutationObserver(_fit).observe(el,{childList:true,subtree:true}); window.addEventListener('resize',_fit); setInterval(_fit,900); }catch(e){}
      try{ if(document.fonts&&document.fonts.ready) document.fonts.ready.then(_fit); }catch(e){}
      _fit();
      return { destroy(){ el.innerHTML=''; el.classList.remove('u4-game'); } };
    },
    normalizeArabic,
    stripHarakat,
    shuffle,
    sample,
    speak
  };

  global.Unit4GameEngine = api;
  if(typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
