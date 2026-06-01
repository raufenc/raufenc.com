(function(global){
  'use strict';

  const DEFAULT_GAME_TITLES = {
    flashcards: ['بِطاقاتُ المُفْرَدات', 'اُنْظُرِ الصّورَةَ وَاقْرَأِ الكَلِمَة.'],
    match: ['المُطابَقَة', 'طابِقِ الكَلِمَةَ مَعَ صورَتِها.'],
    quiz: ['الاِخْتِبار', 'اِخْتَرِ الجَوابَ الصَّحيح.'],
    truefalse: ['صَحٌّ أَمْ خَطَأ', 'هَلِ الجُمْلَةُ صَحيحَة؟'],
    sentenceOrder: ['تَرْتيبُ الجُمْلَة', 'رَتِّبِ الكَلِماتِ بِالتَّرتيبِ الصَّحيح.'],
    fillBlank: ['الكَلِمَةُ النّاقِصَة', 'أَكْمِلِ الجُمْلَةَ بِالكَلِمَةِ المُناسِبَة.'],
    memory: ['الذّاكِرَة', 'طابِقِ الكَلِمَةَ مَعَ صورَتِها.'],
    oddOneOut: ['المُخْتَلِف', 'اِخْتَرِ الكَلِمَةَ المُخْتَلِفَة.'],
    wordSearch: ['البَحْثُ عَنِ الكَلِمات', 'اِبْحَثْ عَنْ حُروفِ الكَلِمَة.'],
    directionsMap: ['الاِتِّجاهات', 'رَتِّبْ خُطُواتِ الطَّريق.'],
    comparative: ['المُقارَنَة', 'دَرِّبْ صيغَةَ أَفْعَلُ مِنْ.'],
    traffic: ['إِشاراتُ المُرور', 'اِخْتَرِ الفِعْلَ حَسَبَ الضَّوْء.'],
    dialogueBuilder: ['بِناءُ الحِوار', 'رَتِّبْ سُطورَ الحِوار.'],
    wheel: ['عَجَلَةُ الأَسْئِلَة', 'أَدِرِ العَجَلَةَ وَأَجِب.'],
    balloonPop: ['فَرْقَعَةُ البالونات', 'فَرْقِعِ البالونَ المُناسِبَ لِلصّورَة.'],
    typing: ['تَرْتيبُ الحُروف', 'رَتِّبِ الحُروفَ لِتَكْتُبَ الكَلِمَة.']
  };

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
    const data = options && options.data || global.Unit3Database;
    if(!data) throw new Error('Unit3Database not found.');
    return data;
  }
  function containerOf(container){
    if(typeof container === 'string') return document.querySelector(container);
    return container;
  }
  function makeShell(container, type, options){
    const titles = DEFAULT_GAME_TITLES[type] || ['الوَحْدَة ٣', ''];
    const title = (options && options.title) || titles[0];
    const subtitle = (options && options.subtitle) || titles[1];
    container.classList.add('u3-game');
    container.innerHTML = `
      <div class="u3-header">
        <div>
          <h2 class="u3-title">${escapeHtml(title)}</h2>
          <div class="u3-subtitle">${escapeHtml(subtitle)}</div>
        </div>
        <div class="u3-row">
          <span class="u3-pill">الوَحْدَة ٣</span>
          <span class="u3-pill u3-score" data-score>0 / 0</span>
        </div>
      </div>
      <div class="u3-progress" aria-label="progress"><span data-progress></span></div>
      <div data-body style="margin-top:16px"></div>
      <div class="u3-feedback" data-feedback></div>
      <div class="u3-footer-note">إِلى أَيْنَ نُسافِرُ؟</div>
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
    shell.feedback.className = 'u3-feedback' + (cls ? ' ' + cls : '');
  }
  function finalScreen(shell, correct, total, restart){
    const pct = total ? Math.round(correct*100/total) : 0;
    shell.body.innerHTML = `
      <div class="u3-card u3-center" style="flex-direction:column;gap:12px;text-align:center">
        <div style="font-size:56px">${pct >= 80 ? '🏆' : pct >= 50 ? '🌟' : '📘'}</div>
        <div class="u3-title">${pct}%</div>
        <div class="u3-muted">${correct} / ${total} ✅</div>
        <button class="u3-btn" data-restart>إعادَة 🔄</button>
      </div>`;
    $('[data-restart]', shell.body).addEventListener('click', restart);
    feedback(shell, '', '');
    setScore(shell, correct, total, total, total);
  }
  function optionButton(label, index){ return `<button class="u3-option" data-index="${index}">${escapeHtml(label)}</button>`; }

  function renderFlashcards(container, data, options){
    const shell = makeShell(container, 'flashcards', options);
    const list = sample(data.vocabulary.filter(v => ['transport','places','directions','traffic','questions','modes','comparatives','verbs'].includes(v.category)), options.limit || 40);
    let i=0, flipped=false;
    function draw(){
      const item = list[i];
      setScore(shell, i+1, list.length, i+1, list.length);
      shell.body.innerHTML = `
        <div class="u3-card" style="min-height:330px;display:flex;flex-direction:column;justify-content:center;gap:12px">
          <div class="u3-big-ar" dir="rtl">${escapeHtml(item.ar)}</div>
          <div class="u3-emoji" style="font-size:96px">${flipped ? escapeHtml(item.emoji || '🔤') : '👆'}</div>
        </div>
        <div class="u3-actions">
          <button class="u3-btn secondary" data-prev>→ السّابِق</button>
          <button class="u3-btn" data-flip>اقْلِب 🔄</button>
          <button class="u3-btn secondary" data-speak>🔊</button>
          <button class="u3-btn orange" data-next>التّالي ←</button>
        </div>`;
      $('.u3-card', shell.body).addEventListener('click', () => { flipped = !flipped; draw(); });
      $('[data-flip]', shell.body).addEventListener('click', () => { flipped = !flipped; draw(); });
      $('[data-speak]', shell.body).addEventListener('click', () => speak(item.ar));
      $('[data-prev]', shell.body).addEventListener('click', () => { i=(i-1+list.length)%list.length; flipped=false; draw(); });
      $('[data-next]', shell.body).addEventListener('click', () => { i=(i+1)%list.length; flipped=false; draw(); });
    }
    draw();
  }

  function renderMatch(container, data, options){
    const shell = makeShell(container, 'match', options);
    const vocab = data.vocabulary.filter(v => v.emoji && ['transport','places','directions','traffic','questions','modes','verbs'].includes(v.category));
    const pairs = sample(vocab, options.limit || 8).map((w, idx) => ({id:'p'+idx, ar:w.ar, emoji:w.emoji}));
    let selected = null, correct = 0, attempts = 0;
    function draw(){
      setScore(shell, correct, pairs.length, correct, pairs.length);
      shell.body.innerHTML = `
        <div class="u3-card"><div class="u3-muted">اِخْتَرِ الكَلِمَةَ ثُمَّ صورَتَها المُناسِبَة.</div></div>
        <div class="u3-grid u3-grid-2" style="margin-top:14px">
          <div class="u3-card u3-match-col" data-chips>
            ${shuffle(pairs).map(p=>`<button class="u3-chip u3-ar" draggable="true" data-ar="${escapeHtml(p.ar)}">${escapeHtml(p.ar)}</button>`).join('')}
          </div>
          <div class="u3-card u3-match-col" data-targets>
            ${shuffle(pairs).map(p=>`<div class="u3-match-target" data-expect="${escapeHtml(p.ar)}"><span style="font-size:44px">${escapeHtml(p.emoji)}</span></div>`).join('')}
          </div>
        </div>`;
      const chips = $all('.u3-chip', shell.body);
      chips.forEach(ch => {
        ch.addEventListener('click', () => { if(ch.classList.contains('used')) return; chips.forEach(c=>c.classList.remove('active')); selected = ch; ch.classList.add('active'); });
        ch.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', ch.dataset.ar); selected = ch; });
      });
      $all('.u3-match-target', shell.body).forEach(t => {
        t.addEventListener('dragover', e => { e.preventDefault(); t.classList.add('u3-drop-hover'); });
        t.addEventListener('dragleave', () => t.classList.remove('u3-drop-hover'));
        t.addEventListener('drop', e => { e.preventDefault(); t.classList.remove('u3-drop-hover'); check(t, e.dataTransfer.getData('text/plain')); });
        t.addEventListener('click', () => { if(selected) check(t, selected.dataset.ar); });
      });
    }
    function check(target, ar){
      if(target.classList.contains('filled')) return;
      attempts++;
      const chip = $all('.u3-chip', shell.body).find(c => c.dataset.ar === ar);
      if(target.dataset.expect === ar){
        correct++;
        target.classList.add('filled');
        target.innerHTML = `<span class="u3-ar">${escapeHtml(ar)}</span><span style="font-size:32px"> ${escapeHtml(pairs.find(p=>p.ar===ar).emoji)}</span>`;
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
      shell.body.innerHTML = `
        <div class="u3-card">
          ${f.visual || ''}
          <div class="u3-mid-ar" dir="rtl">${escapeHtml(f.prompt)}</div>
          ${f.hint ? `<div class="u3-muted">${escapeHtml(f.hint)}</div>` : ''}
        </div>
        <div class="u3-grid u3-grid-2" style="margin-top:14px">
          ${f.options.map((o,i)=>optionButton(o,i)).join('')}
        </div>`;
      $all('.u3-option', shell.body).forEach(btn => btn.addEventListener('click', () => choose(btn, f.answerIndex, f.after || '')));
    }
    function choose(btn, answerIndex, after){
      if(locked) return;
      locked=true;
      const chosen = Number(btn.dataset.index);
      const buttons = $all('.u3-option', shell.body);
      buttons.forEach((b,i)=>{ if(i===answerIndex) b.classList.add('correct'); if(i===chosen && i!==answerIndex) b.classList.add('wrong'); b.disabled = true; });
      if(chosen === answerIndex){ correct++; feedback(shell, after || '✅ صَحيح', 'good'); }
      else feedback(shell, after || '❌', 'bad');
      setScore(shell, correct, items.length, idx+1, items.length);
      setTimeout(() => { idx++; if(idx >= items.length) finalScreen(shell, correct, items.length, () => renderMCQGame(container, data, options, type, source, formatter)); else draw(); }, 950);
    }
    draw();
  }

  function renderQuiz(container, data, options){
    renderMCQGame(container, data, options, 'quiz', data.gameBanks.quizQuestions, q => ({prompt:q.prompt, options:q.options, answerIndex:q.answerIndex, hint:q.skill}));
  }
  function renderTrueFalse(container, data, options){
    const src = data.gameBanks.trueFalse.map(q => ({...q, options:['صَحٌّ','خَطَأ'], answerIndex:q.answer ? 0 : 1}));
    renderMCQGame(container, data, options, 'truefalse', src, q => ({prompt:q.statement, options:q.options, answerIndex:q.answerIndex, after:q.explanation}));
  }
  function renderOddOneOut(container, data, options){
    renderMCQGame(container, data, options, 'oddOneOut', data.gameBanks.oddOneOut, q => ({prompt:`اِخْتَرِ المُخْتَلِف`, options:q.options, answerIndex:q.oddIndex, after:q.explanation}));
  }
  function renderComparative(container, data, options){
    renderMCQGame(container, data, options, 'comparative', data.gameBanks.comparatives, q => ({prompt:q.prompt, options:q.options, answerIndex:q.options.indexOf(q.answer), after:q.tr}));
  }
  function trafficVisual(light){
    return `<div class="u3-light" aria-hidden="true"><div class="u3-bulb red ${light==='red'?'on':''}"></div><div class="u3-bulb yellow ${light==='yellow'?'on':''}"></div><div class="u3-bulb green ${light==='green'?'on':''}"></div></div>`;
  }
  function renderTraffic(container, data, options){
    renderMCQGame(container, data, {...options, limit: options.limit || 9}, 'traffic', data.gameBanks.traffic.concat(data.gameBanks.traffic).concat(data.gameBanks.traffic), q => ({visual:trafficVisual(q.light), prompt:q.question, options:q.options, answerIndex:q.options.indexOf(q.answer), after:q.tr}));
  }
  function renderFillBlank(container, data, options){
    renderMCQGame(container, data, options, 'fillBlank', data.gameBanks.fillBlanks, q => ({prompt:q.text, options:q.options, answerIndex:q.options.indexOf(q.answer), hint:q.hintTr}));
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
        <div class="u3-card"><div class="u3-muted">الجُمْلَة</div><div class="u3-sentence-answer" data-answer></div></div>
        <div class="u3-card" style="margin-top:14px"><div class="u3-muted">الكَلِمات</div><div class="u3-sentence-bank" data-bank>
          ${bank.map(x=>`<button class="u3-token" data-i="${x.i}">${escapeHtml(x.t)}</button>`).join('')}
        </div></div>
        <div class="u3-actions"><button class="u3-btn secondary" data-clear>مَسْح</button><button class="u3-btn" data-check>تَحَقَّق ✅</button></div>`;
      $all('.u3-token', $('[data-bank]', shell.body)).forEach(btn=>btn.addEventListener('click',()=>{
        btn.classList.add('used'); answer.push({i:Number(btn.dataset.i), t:btn.textContent, source:btn}); redrawAnswer(item);
      }));
      $('[data-clear]', shell.body).addEventListener('click',()=>{ answer.forEach(x=>x.source.classList.remove('used')); answer=[]; redrawAnswer(item); feedback(shell,'',''); });
      $('[data-check]', shell.body).addEventListener('click',()=>check(item));
    }
    function redrawAnswer(item){
      const area = $('[data-answer]', shell.body);
      area.innerHTML = answer.map((x,pos)=>`<button class="u3-token in-answer" data-pos="${pos}">${escapeHtml(x.t)}</button>`).join('');
      $all('.u3-token', area).forEach(btn=>btn.addEventListener('click',()=>{
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
    const vocab = data.vocabulary.filter(v => v.emoji && ['transport','places','directions','traffic','questions','modes','verbs'].includes(v.category));
    const pairs = sample(vocab, options.limit || 8);
    let cards = shuffle(pairs.flatMap((p,i)=>[
      {id:i, text:p.ar, kind:'ar'}, {id:i, text:p.emoji, kind:'emoji'}
    ]));
    let open=[], done=0, moves=0;
    function draw(){
      setScore(shell, done, pairs.length, done, pairs.length);
      shell.body.innerHTML = `<div class="u3-memory-grid">${cards.map((c,i)=>`<button class="u3-memory-card face-down" data-i="${i}">؟</button>`).join('')}</div>`;
      $all('.u3-memory-card', shell.body).forEach(card => card.addEventListener('click', () => flip(Number(card.dataset.i))));
    }
    function flip(i){
      const card = $(`.u3-memory-card[data-i="${i}"]`, shell.body);
      const dataCard = cards[i];
      if(dataCard.done || open.some(x=>x.i===i) || open.length>=2) return;
      card.classList.remove('face-down'); card.textContent = dataCard.text; if(dataCard.kind==='ar') card.classList.add('u3-ar');
      open.push({i, data:dataCard, el:card});
      if(open.length === 2){
        moves++;
        const ok = open[0].data.id === open[1].data.id && open[0].data.kind !== open[1].data.kind;
        if(ok){
          open.forEach(x=>{ x.data.done=true; x.el.classList.add('done'); }); done++; open=[]; feedback(shell,'✅ مُطابَق', 'good'); setScore(shell, done, pairs.length, done, pairs.length);
          if(done===pairs.length) setTimeout(()=>finalScreen(shell, done, pairs.length, () => renderMemory(container,data,options)), 700);
        }else{
          open.forEach(x=>x.el.classList.add('miss')); feedback(shell,'❌', 'bad');
          setTimeout(()=>{ open.forEach(x=>{ x.el.classList.remove('miss'); x.el.classList.add('face-down'); x.el.classList.remove('u3-ar'); x.el.textContent='؟'; }); open=[]; }, 700);
        }
      }
    }
    draw();
  }

  function renderWordSearch(container, data, options){
    const shell = makeShell(container, 'wordSearch', options);
    const words = sample(data.gameBanks.wordSearch.words, options.limit || 10).map(w => stripHarakat(w));
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
        <div class="u3-card"><div class="u3-muted">الكَلِمَةُ المَطْلوبَة</div><div class="u3-target-word u3-ar">${escapeHtml(target)}</div></div>
        <div class="u3-card" style="margin-top:14px"><div class="u3-wordsearch" style="grid-template-columns:repeat(${size},38px)">
          ${grid.map((row,r)=>row.map((ch,c)=>`<button class="u3-cell" data-r="${r}" data-c="${c}">${escapeHtml(ch)}</button>`).join('')).join('')}
        </div></div>`;
      $all('.u3-cell', shell.body).forEach(cell => cell.addEventListener('click', () => clickCell(cell)));
      markFoundCells();
    }
    function markFoundCells(){
      for(let wi=0; wi<targetIdx; wi++) (placements[wi]||[]).forEach(([r,c]) => { const cell = $(`.u3-cell[data-r="${r}"][data-c="${c}"]`, shell.body); if(cell) cell.classList.add('found'); });
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

  function renderDirectionsMap(container, data, options){
    const shell = makeShell(container, 'directionsMap', options);
    const scenarios = sample(data.gameBanks.directionsScenarios, options.limit || data.gameBanks.directionsScenarios.length);
    let idx=0, correct=0, answer=[];
    const places = ['البَيْت','المَدْرَسَة','المَكْتَبَة','المُسْتَشْفى','المَسْجِد','السّوق','مَوْقِف','شارِع','طَريق'];
    function draw(){
      const sc = scenarios[idx]; answer=[];
      setScore(shell, correct, scenarios.length, idx, scenarios.length);
      const shuffled = shuffle(sc.steps.map((s,i)=>({s,i})));
      shell.body.innerHTML = `
        <div class="u3-card"><div class="u3-mid-ar">${escapeHtml(sc.title)}</div><div class="u3-muted">${escapeHtml(sc.tr || '')}</div></div>
        <div class="u3-card" style="margin-top:14px"><div class="u3-map">
          ${Array.from({length:25},(_,i)=>{
            const label = places[i % places.length];
            const cls = label===sc.start ? 'start place' : label===sc.target ? 'target place' : (i%3===0 ? 'place' : '');
            return `<div class="u3-map-cell ${cls}">${escapeHtml(label)}</div>`;
          }).join('')}
        </div></div>
        <div class="u3-card" style="margin-top:14px"><div class="u3-muted">الطَّريق</div><div class="u3-sentence-answer" data-answer></div></div>
        <div class="u3-card" style="margin-top:14px"><div class="u3-muted">الخُطُوات</div><div class="u3-sentence-bank" data-bank>
          ${shuffled.map(x=>`<button class="u3-token u3-ar" data-i="${x.i}">${escapeHtml(x.s)}</button>`).join('')}
        </div></div>
        <div class="u3-actions"><button class="u3-btn secondary" data-clear>مَسْح</button><button class="u3-btn" data-check>تَحَقَّق ✅</button></div>`;
      $all('.u3-token', $('[data-bank]', shell.body)).forEach(btn=>btn.addEventListener('click',()=>{ btn.classList.add('used'); answer.push({i:Number(btn.dataset.i), s:btn.textContent, source:btn}); redraw(); }));
      $('[data-clear]', shell.body).addEventListener('click',()=>{ answer.forEach(x=>x.source.classList.remove('used')); answer=[]; redraw(); feedback(shell,'',''); });
      $('[data-check]', shell.body).addEventListener('click',()=>check(sc));
    }
    function redraw(){
      const area = $('[data-answer]', shell.body);
      area.innerHTML = answer.map((x,pos)=>`<button class="u3-token in-answer u3-ar" data-pos="${pos}">${escapeHtml(x.s)}</button>`).join('');
      $all('.u3-token', area).forEach(btn=>btn.addEventListener('click',()=>{ const pos=Number(btn.dataset.pos); const [removed]=answer.splice(pos,1); removed.source.classList.remove('used'); redraw(); }));
    }
    function check(sc){
      const ok = answer.map(x=>x.i).join(',') === sc.steps.map((_,i)=>i).join(',');
      if(ok){ correct++; feedback(shell,'✅ أَحْسَنْت', 'good'); setTimeout(()=>{ idx++; if(idx>=scenarios.length) finalScreen(shell, correct, scenarios.length, () => renderDirectionsMap(container,data,options)); else draw(); }, 900); }
      else feedback(shell,'🔁 حاوِلْ ثانِيَة', 'bad');
      setScore(shell, correct, scenarios.length, idx+1, scenarios.length);
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
        <div class="u3-card"><b class="u3-ar">${escapeHtml(dlg.title)}</b><div class="u3-muted">رَتِّبْ سُطورَ الحِوار.</div></div>
        <div class="u3-card" style="margin-top:14px"><div class="u3-muted">الحِوار</div><div data-answer></div></div>
        <div class="u3-card" style="margin-top:14px"><div class="u3-grid">
          ${shuffled.map(x=>`<button class="u3-option u3-ar" data-i="${x.i}"><b>${escapeHtml(x.l.speaker)}:</b>&nbsp;${escapeHtml(x.l.ar)}</button>`).join('')}
        </div></div>
        <div class="u3-actions"><button class="u3-btn secondary" data-clear>مَسْح</button><button class="u3-btn" data-check>تَحَقَّق ✅</button></div>`;
      $all('.u3-option', shell.body).forEach(btn=>btn.addEventListener('click',()=>{ btn.classList.add('used'); btn.disabled=true; answer.push({i:Number(btn.dataset.i), html:btn.innerHTML, source:btn}); redraw(); }));
      $('[data-clear]', shell.body).addEventListener('click',()=>{ answer.forEach(x=>{ x.source.disabled=false; x.source.classList.remove('used'); }); answer=[]; redraw(); feedback(shell,'',''); });
      $('[data-check]', shell.body).addEventListener('click',()=>check(dlg));
    }
    function redraw(){
      $('[data-answer]', shell.body).innerHTML = answer.map((x,pos)=>`<div class="u3-dialogue-line"><span class="u3-pill">${pos+1}</span><button class="u3-option u3-ar" data-pos="${pos}">${x.html}</button></div>`).join('');
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
        <div class="u3-wheel" data-wheel><span>🎡</span></div>
        <div class="u3-actions"><button class="u3-btn orange" data-spin>أَدِرِ العَجَلَة 🎡</button></div>`;
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
      shell.body.innerHTML = `
        <div class="u3-card"><div class="u3-mid-ar" dir="rtl">${escapeHtml(current.prompt)}</div><div class="u3-muted">${escapeHtml(current.skill || '')}</div></div>
        <div class="u3-grid u3-grid-2" style="margin-top:14px">${current.options.map((o,i)=>optionButton(o,i)).join('')}</div>`;
      $all('.u3-option', shell.body).forEach(btn => btn.addEventListener('click',()=>{
        const ok = Number(btn.dataset.index) === current.answerIndex;
        if(ok){ correct++; btn.classList.add('correct'); feedback(shell,'✅ صَحيح', 'good'); } else { btn.classList.add('wrong'); feedback(shell,'❌', 'bad'); }
        setScore(shell, correct, questions.length, asked.length, questions.length);
        setTimeout(()=> asked.length >= questions.length ? finalScreen(shell, correct, questions.length, () => renderWheel(container,data,options)) : drawIntro(), 900);
      }));
    }
    drawIntro();
  }

  function renderBalloonPop(container, data, options){
    const shell = makeShell(container, 'balloonPop', options);
    const pool = data.vocabulary.filter(v => ['transport','places','directions','traffic','questions','verbs'].includes(v.category));
    const rounds = sample(pool, options.limit || 10);
    let idx=0, correct=0;
    function draw(){
      const item = rounds[idx];
      const opts = shuffle([item].concat(sample(pool.filter(v=>v.id!==item.id), 5))).slice(0,6);
      setScore(shell, correct, rounds.length, idx, rounds.length);
      shell.body.innerHTML = `
        <div class="u3-card"><div class="u3-muted">فَرْقِعِ الكَلِمَةَ المُناسِبَة:</div><div style="text-align:center;font-size:80px">${escapeHtml(item.emoji || '🎈')}</div></div>
        <div class="u3-balloon-area" data-area style="margin-top:14px">
          ${opts.map((o,i)=>`<button class="u3-balloon u3-ar" data-id="${escapeHtml(o.id)}" style="left:${8+(i%3)*30}%; top:${18+Math.floor(i/3)*42}%">${escapeHtml(o.ar)}</button>`).join('')}
        </div>`;
      $all('.u3-balloon', shell.body).forEach(b => b.addEventListener('click',()=>{
        if(b.dataset.id === item.id){ correct++; b.classList.add('correct'); feedback(shell,'✅ أَحْسَنْت', 'good'); }
        else { b.classList.add('wrong'); feedback(shell,`✅ ${item.ar}`, 'bad'); }
        setTimeout(()=>{ idx++; if(idx>=rounds.length) finalScreen(shell, correct, rounds.length, () => renderBalloonPop(container,data,options)); else draw(); }, 850);
      }));
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
        <div class="u3-card" style="text-align:center">
          <div class="u3-muted">رَتِّبِ الحُروف</div>
          <div class="u3-big-ar" dir="rtl">${escapeHtml(item.ar)}</div>
        </div>
        <div class="u3-card" style="margin-top:14px">
          <input class="u3-input" data-input placeholder="✍️" dir="rtl">
          <div class="u3-actions" data-letters>${letters.map(ch=>`<button class="u3-chip" data-ch="${escapeHtml(ch)}">${escapeHtml(ch)}</button>`).join('')}</div>
          <div class="u3-actions"><button class="u3-btn secondary" data-clear>مَسْح</button><button class="u3-btn" data-check>تَحَقَّق ✅</button></div>
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
    directionsMap: renderDirectionsMap,
    comparative: renderComparative,
    traffic: renderTraffic,
    dialogueBuilder: renderDialogueBuilder,
    wheel: renderWheel,
    balloonPop: renderBalloonPop,
    typing: renderTyping
  };

  const api = {
    games: Object.keys(renderers),
    mount(container, gameType, options){
      const el = containerOf(container);
      if(!el) throw new Error('container not found.');
      const data = getData(options || {});
      const type = gameType || 'quiz';
      if(!renderers[type]) throw new Error('Unknown type: ' + type);
      renderers[type](el, data, options || {});
      return { destroy(){ el.innerHTML=''; el.classList.remove('u3-game'); } };
    },
    normalizeArabic,
    stripHarakat,
    shuffle,
    sample,
    speak
  };

  global.Unit3GameEngine = api;
  if(typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
