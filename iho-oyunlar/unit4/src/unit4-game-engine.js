(function(global){
  'use strict';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  };
  const strip = (s) => String(s||'').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[؟?،,.؛;]/g,'').trim();
  const safe = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  class IHOGameSession {
    constructor(container, db, gameId){
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      this.db = db;
      this.game = db.games.find(g => g.id === gameId) || db.games[0];
      this.items = shuffle(this.game.items || []);
      this.i = 0;
      this.score = 0;
      this.scoreA = 0;
      this.scoreB = 0;
      this.activePlayer = 'A';
      this.timer = null;
      this.timeLeft = null;
      this.finished = false;
    }
    start(){ this.render(); }
    reset(){ clearInterval(this.timer); this.items = shuffle(this.game.items || []); this.i=0; this.score=0; this.scoreA=0; this.scoreB=0; this.activePlayer='A'; this.finished=false; this.render(); }
    current(){ return this.items[this.i]; }
    isDuel(){ return !!(this.game.settings && this.game.settings.twoPlayer) || ['sa_g0_answer_race','sa_g1_true_false','sa_g4_missing_word','sa_g5_who_am_i'].includes(this.game.id); }
    header(){
      const total = this.items.length;
      const duel = this.isDuel();
      return `<div class="iho-game-header">
        <div>
          <div class="iho-game-title" dir="rtl">${safe(this.game.title_ar)}</div>
          <div class="iho-game-subtitle">${safe(this.game.title_tr)} · ${safe(this.game.type)} · ${safe(this.game.skill || '')}</div>
        </div>
        <div class="iho-game-meta">
          <span>${this.finished ? total : Math.min(this.i+1,total)}/${total}</span>
          <span>Skor: ${this.score}</span>
          ${duel ? `<span>A: ${this.scoreA}</span><span>B: ${this.scoreB}</span>` : ''}
          <button class="iho-small-btn" data-action="reset">↻</button>
        </div>
      </div>${duel ? this.duelBar() : ''}`;
    }
    duelBar(){
      return `<div class="iho-duel-bar">
        <button class="${this.activePlayer==='A'?'active':''}" data-player="A">Oyuncu A</button>
        <button class="${this.activePlayer==='B'?'active':''}" data-player="B">Oyuncu B</button>
      </div>`;
    }
    base(inner){
      this.container.innerHTML = `<section class="iho-game-shell">${this.header()}<div class="iho-game-body">${inner}</div></section>`;
      const reset = $('[data-action="reset"]', this.container);
      if(reset) reset.addEventListener('click', () => this.reset());
      $$('[data-player]', this.container).forEach(btn => btn.addEventListener('click', () => { this.activePlayer = btn.dataset.player; this.render(); }));
    }
    render(){
      clearInterval(this.timer);
      if(!this.game){ this.container.innerHTML = '<p>Oyun bulunamadı.</p>'; return; }
      if(this.i >= this.items.length && !['matching','memory','sorting','word_search'].includes(this.game.type)){ this.end(); return; }
      const map = {
        multiple_choice: () => this.renderMultipleChoice(),
        fill_blank: () => this.renderFillBlank(),
        true_false: () => this.renderTrueFalse(),
        matching: () => this.renderMatching(),
        memory: () => this.renderMemory(),
        sorting: () => this.renderSorting(),
        odd_one_out: () => this.renderOddOneOut(),
        sentence_order: () => this.renderSentenceOrder(),
        dialogue_order: () => this.renderDialogueOrder(),
        word_scramble: () => this.renderWordScramble(),
        clock: () => this.renderClock(),
        who_am_i: () => this.renderWhoAmI(),
        map_quiz: () => this.renderMapQuiz(),
        word_search: () => this.renderWordSearch()
      };
      (map[this.game.type] || map.multiple_choice)();
    }
    award(correct){
      if(correct){ this.score++; if(this.isDuel()){ this.activePlayer==='A' ? this.scoreA++ : this.scoreB++; } }
    }
    feedback(correct, explanation=''){
      const box = $('.iho-feedback', this.container);
      if(box){
        box.className = `iho-feedback ${correct?'ok':'bad'}`;
        box.innerHTML = `${correct?'✓ Doğru':'✗ Yanlış'}${explanation ? `<div>${safe(explanation)}</div>` : ''}`;
      }
    }
    next(){ this.i++; this.render(); }
    end(){
      this.finished = true;
      const winner = this.isDuel() ? `<p class="iho-result">Kazanan: ${this.scoreA===this.scoreB?'Berabere':(this.scoreA>this.scoreB?'Oyuncu A':'Oyuncu B')}</p>` : '';
      this.base(`<div class="iho-end"><h2>Oyun bitti</h2><p>Toplam skor: <b>${this.score}</b> / ${this.items.length}</p>${winner}<button class="iho-primary" data-action="play-again">Tekrar Oyna</button></div>`);
      $('[data-action="play-again"]', this.container).addEventListener('click', () => this.reset());
    }
    startTimer(seconds){
      if(!seconds) return;
      this.timeLeft = seconds;
      const el = $('.iho-timer', this.container);
      if(el) el.textContent = `⏱ ${this.timeLeft}`;
      this.timer = setInterval(() => {
        this.timeLeft--;
        if(el) el.textContent = `⏱ ${this.timeLeft}`;
        if(this.timeLeft <= 0){ clearInterval(this.timer); this.feedback(false, 'Süre bitti.'); setTimeout(() => this.next(), 700); }
      }, 1000);
    }
    choices(options, answer, explanation=''){
      return `<div class="iho-choices">${shuffle(options).map(opt => `<button class="iho-choice" data-choice="${safe(opt)}" dir="rtl">${safe(opt)}</button>`).join('')}</div><div class="iho-feedback"></div>`;
    }
    wireChoice(answer, explanation=''){
      $$('[data-choice]', this.container).forEach(btn => btn.addEventListener('click', () => {
        clearInterval(this.timer);
        const correct = strip(btn.dataset.choice) === strip(answer);
        this.award(correct); this.feedback(correct, explanation);
        $$('[data-choice]', this.container).forEach(b => b.disabled = true);
        btn.classList.add(correct ? 'correct' : 'wrong');
        setTimeout(() => this.next(), 850);
      }));
    }
    renderMultipleChoice(){
      const item = this.current();
      const timer = this.game.settings && this.game.settings.timerSeconds;
      this.base(`<div class="iho-question" dir="rtl">${safe(item.prompt)}</div>${timer ? '<div class="iho-timer"></div>' : ''}${item.context ? `<div class="iho-context">${safe(item.context)}</div>` : ''}${this.choices(item.options, item.answer, item.explanation)}`);
      this.wireChoice(item.answer, item.explanation);
      this.startTimer(timer);
    }
    renderMapQuiz(){
      const item = this.current();
      const map = `<div class="iho-map-box" dir="rtl"><div class="north">شمال</div><div class="west">غرب</div><div class="center">${safe(item.city || 'تركيا')}</div><div class="east">شرق</div><div class="south">جنوب</div></div>`;
      this.base(`${map}<div class="iho-question" dir="rtl">${safe(item.prompt)}</div>${this.choices(item.options, item.answer)}`);
      this.wireChoice(item.answer, `${item.city} → ${item.answer}`);
    }
    renderFillBlank(){
      const item = this.current();
      const sentence = safe(item.sentence).replace('____','<span class="blank">____</span>');
      this.base(`<div class="iho-question" dir="rtl">${sentence}</div><div class="iho-context">${safe(item.translation || '')}</div>${this.choices(item.options, item.answer)}`);
      this.wireChoice(item.answer, item.translation || '');
    }
    renderTrueFalse(){
      const item = this.current();
      this.base(`<div class="iho-question" dir="rtl">${safe(item.statement)}</div><div class="iho-choices two"><button class="iho-choice" data-choice="true">صَحّ</button><button class="iho-choice" data-choice="false">خَطَأ</button></div><div class="iho-feedback"></div>`);
      $$('[data-choice]', this.container).forEach(btn => btn.addEventListener('click', () => {
        const correct = (btn.dataset.choice === 'true') === !!item.answer;
        this.award(correct); this.feedback(correct, item.explanation || '');
        $$('[data-choice]', this.container).forEach(b => b.disabled = true);
        setTimeout(() => this.next(), 900);
      }));
    }
    renderOddOneOut(){
      const item = this.current();
      this.base(`<div class="iho-instruction">Uymayan kelimeyi seç.</div><div class="iho-choices">${item.words.map(w => `<button class="iho-choice" data-choice="${safe(w)}" dir="rtl">${safe(w)}</button>`).join('')}</div><div class="iho-feedback"></div>`);
      this.wireChoice(item.answer, item.explanation || '');
    }
    renderSentenceOrder(){
      const item = this.current();
      const tokens = item.tokens || String(item.sentence).split(/\s+/).filter(Boolean);
      const mixed = shuffle(tokens);
      this.base(`<div class="iho-context">${safe(item.translation || 'Kelimeleri doğru sıraya koy.')}</div><div class="iho-target" dir="rtl" data-built></div><div class="iho-token-bank" dir="rtl">${mixed.map((t,i)=>`<button class="iho-token" data-token="${safe(t)}" data-idx="${i}">${safe(t)}</button>`).join('')}</div><div class="iho-actions"><button class="iho-secondary" data-action="clear">Temizle</button><button class="iho-primary" data-action="check">Kontrol</button></div><div class="iho-feedback"></div>`);
      const built=[];
      $$('[data-token]', this.container).forEach(btn => btn.addEventListener('click', () => { built.push(btn.dataset.token); btn.disabled=true; $('[data-built]',this.container).textContent = built.join(' '); }));
      $('[data-action="clear"]', this.container).addEventListener('click', () => { built.length=0; $('[data-built]',this.container).textContent=''; $$('[data-token]',this.container).forEach(b=>b.disabled=false); });
      $('[data-action="check"]', this.container).addEventListener('click', () => { const correct = strip(built.join(' ')) === strip(tokens.join(' ')); this.award(correct); this.feedback(correct, item.sentence); setTimeout(() => this.next(), 950); });
    }
    renderDialogueOrder(){
      const item = this.current();
      const lines = item.lines || [];
      const mixed = shuffle(lines);
      this.base(`<div class="iho-context">${safe(item.title || '')}</div><div class="iho-target dialogue" dir="rtl" data-built></div><div class="iho-token-bank dialogue" dir="rtl">${mixed.map((t,i)=>`<button class="iho-line-token" data-token="${safe(t)}" data-idx="${i}">${safe(t)}</button>`).join('')}</div><div class="iho-actions"><button class="iho-secondary" data-action="clear">Temizle</button><button class="iho-primary" data-action="check">Kontrol</button></div><div class="iho-feedback"></div>`);
      const built=[];
      $$('[data-token]', this.container).forEach(btn => btn.addEventListener('click', () => { built.push(btn.dataset.token); btn.disabled=true; $('[data-built]',this.container).innerHTML = built.map(l=>`<div>${safe(l)}</div>`).join(''); }));
      $('[data-action="clear"]', this.container).addEventListener('click', () => { built.length=0; $('[data-built]',this.container).innerHTML=''; $$('[data-token]',this.container).forEach(b=>b.disabled=false); });
      $('[data-action="check"]', this.container).addEventListener('click', () => { const correct = strip(built.join('|')) === strip(lines.join('|')); this.award(correct); this.feedback(correct, 'Doğru sıra: ' + lines.join(' / ')); setTimeout(() => this.next(), 1200); });
    }
    renderWordScramble(){
      const item = this.current();
      const chars = Array.from(item.word);
      this.base(`<div class="iho-context">${safe(item.translation || '')}</div><div class="iho-target" dir="rtl" data-built></div><div class="iho-token-bank letters" dir="rtl">${shuffle(chars).map((t,i)=>`<button class="iho-token letter" data-token="${safe(t)}" data-idx="${i}">${safe(t)}</button>`).join('')}</div><div class="iho-actions"><button class="iho-secondary" data-action="clear">Temizle</button><button class="iho-primary" data-action="check">Kontrol</button></div><div class="iho-feedback"></div>`);
      const built=[];
      $$('[data-token]', this.container).forEach(btn => btn.addEventListener('click', () => { built.push(btn.dataset.token); btn.disabled=true; $('[data-built]',this.container).textContent = built.join(''); }));
      $('[data-action="clear"]', this.container).addEventListener('click', () => { built.length=0; $('[data-built]',this.container).textContent=''; $$('[data-token]',this.container).forEach(b=>b.disabled=false); });
      $('[data-action="check"]', this.container).addEventListener('click', () => { const correct = strip(built.join('')) === strip(item.word); this.award(correct); this.feedback(correct, item.word); setTimeout(() => this.next(), 900); });
    }
    renderWhoAmI(){
      const item = this.current();
      this.base(`<div class="iho-clues" dir="rtl">${item.clues.map((c,i)=>`<div><b>${i+1}.</b> ${safe(c)}</div>`).join('')}</div>${this.choices(item.options, item.answer)}`);
      this.wireChoice(item.answer, `Cevap: ${item.answer}`);
    }
    renderClock(){
      const item = this.current();
      const [h,m] = item.time.split(':').map(Number);
      const minDeg = m*6;
      const hourDeg = ((h%12)*30)+(m*0.5);
      const clock = `<div class="clock"><div class="hand hour" style="transform:rotate(${hourDeg}deg)"></div><div class="hand minute" style="transform:rotate(${minDeg}deg)"></div><div class="pin"></div><span class="n n12">١٢</span><span class="n n3">٣</span><span class="n n6">٦</span><span class="n n9">٩</span></div>`;
      this.base(`${clock}<div class="iho-context">${safe(item.time)}</div>${this.choices(item.options, item.phrase)}`);
      this.wireChoice(item.phrase, item.time);
    }
    renderMatching(){
      const pairs = shuffle(this.items).slice(0, (this.game.settings && this.game.settings.maxPairs) || 10);
      const lefts = shuffle(pairs.map((p,i)=>({...p, idx:i})));
      const rights = shuffle(pairs.map((p,i)=>({...p, idx:i})));
      this.base(`<div class="iho-instruction">Sol ve sağ kartları eşleştir.</div><div class="iho-match"><div>${lefts.map(p=>`<button class="iho-match-card left" data-side="left" data-idx="${p.idx}" dir="rtl">${safe(p.left)}</button>`).join('')}</div><div>${rights.map(p=>`<button class="iho-match-card right" data-side="right" data-idx="${p.idx}" dir="rtl">${safe(p.right)}</button>`).join('')}</div></div><div class="iho-feedback"></div>`);
      let selected=null, matched=0;
      $$('.iho-match-card', this.container).forEach(btn => btn.addEventListener('click', () => {
        if(btn.disabled) return;
        if(!selected){ selected=btn; btn.classList.add('selected'); return; }
        if(selected === btn){ selected.classList.remove('selected'); selected=null; return; }
        if(selected.dataset.side === btn.dataset.side){ selected.classList.remove('selected'); selected=btn; btn.classList.add('selected'); return; }
        const correct = selected.dataset.idx === btn.dataset.idx;
        if(correct){ selected.disabled=true; btn.disabled=true; selected.classList.add('matched'); btn.classList.add('matched'); matched++; this.score++; this.feedback(true, 'Eşleşti.'); if(matched===pairs.length){ setTimeout(()=>this.end(),600); } }
        else { this.feedback(false, 'Tekrar dene.'); btn.classList.add('wrong'); setTimeout(()=>btn.classList.remove('wrong'),300); }
        selected.classList.remove('selected'); selected=null;
      }));
    }
    renderMemory(){
      const pairs = shuffle(this.items).slice(0, (this.game.settings && this.game.settings.maxPairs) || 8);
      const cards = shuffle(pairs.flatMap((p,i)=>[{text:p.left, pair:i},{text:p.right, pair:i}]));
      this.base(`<div class="iho-memory" dir="rtl">${cards.map((c,i)=>`<button class="iho-memory-card" data-pair="${c.pair}" data-index="${i}"><span class="back">؟</span><span class="front">${safe(c.text)}</span></button>`).join('')}</div><div class="iho-feedback"></div>`);
      let open=[], matched=0;
      $$('.iho-memory-card', this.container).forEach(card => card.addEventListener('click', () => {
        if(card.disabled || card.classList.contains('open')) return;
        card.classList.add('open'); open.push(card);
        if(open.length===2){
          const correct = open[0].dataset.pair === open[1].dataset.pair;
          if(correct){ open.forEach(c=>{c.disabled=true;c.classList.add('matched')}); matched++; this.score++; this.feedback(true,'Eşleşti.'); if(matched===pairs.length){ setTimeout(()=>this.end(),700); } open=[]; }
          else { this.feedback(false,'Tekrar dene.'); setTimeout(()=>{ open.forEach(c=>c.classList.remove('open')); open=[]; },700); }
        }
      }));
    }
    renderSorting(){
      const categories = (this.game.settings && this.game.settings.categories) || [...new Set(this.items.map(i=>i.category))];
      const items = shuffle(this.items);
      this.base(`<div class="iho-instruction">Bir kelimeye, sonra doğru kategoriye tıkla.</div><div class="iho-sort-items" dir="rtl">${items.map((it,i)=>`<button data-sort-item="${i}" data-cat="${safe(it.category)}">${safe(it.text)}</button>`).join('')}</div><div class="iho-sort-cats" dir="rtl">${categories.map(c=>`<button data-sort-cat="${safe(c)}">${safe(c)}</button>`).join('')}</div><div class="iho-feedback"></div>`);
      let selected=null, done=0;
      $$('[data-sort-item]', this.container).forEach(btn=>btn.addEventListener('click',()=>{ if(btn.disabled) return; $$('[data-sort-item]',this.container).forEach(b=>b.classList.remove('selected')); selected=btn; btn.classList.add('selected'); }));
      $$('[data-sort-cat]', this.container).forEach(cat=>cat.addEventListener('click',()=>{
        if(!selected) return;
        const correct = selected.dataset.cat === cat.dataset.sortCat;
        if(correct){ selected.disabled=true; selected.classList.add('matched'); selected.classList.remove('selected'); this.score++; done++; this.feedback(true,'Doğru kategori.'); if(done===items.length){ setTimeout(()=>this.end(),700); } }
        else { this.feedback(false,`Doğru kategori: ${selected.dataset.cat}`); }
        selected=null;
      }));
    }
    renderWordSearch(){
      const size = (this.game.settings && this.game.settings.size) || 12;
      const words = (this.items || []).map(i => i.word || i.text).filter(Boolean);
      const letters = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');
      const grid = Array.from({length:size},()=>Array(size).fill(''));
      function canPlace(word,r,c,dr,dc){ for(let k=0;k<word.length;k++){ const rr=r+dr*k, cc=c+dc*k; if(rr<0||cc<0||rr>=size||cc>=size) return false; if(grid[rr][cc] && grid[rr][cc]!==word[k]) return false; } return true; }
      function place(word){ const dirs=[[0,1],[1,0],[1,1]]; for(let tries=0;tries<200;tries++){ const [dr,dc]=dirs[Math.floor(Math.random()*dirs.length)]; const r=Math.floor(Math.random()*size), c=Math.floor(Math.random()*size); if(canPlace(word,r,c,dr,dc)){ for(let k=0;k<word.length;k++) grid[r+dr*k][c+dc*k]=word[k]; return true; } } return false; }
      words.forEach(w=>place(Array.from(w).join('')));
      for(let r=0;r<size;r++) for(let c=0;c<size;c++) if(!grid[r][c]) grid[r][c]=letters[Math.floor(Math.random()*letters.length)];
      this.base(`<div class="iho-word-search-wrap"><div class="iho-word-list" dir="rtl">${words.map(w=>`<span data-word="${safe(w)}">${safe(w)}</span>`).join('')}</div><div class="iho-word-grid" style="grid-template-columns:repeat(${size},1fr)" dir="ltr">${grid.flatMap((row,r)=>row.map((ch,c)=>`<button data-cell="${r},${c}">${safe(ch)}</button>`)).join('')}</div><div class="iho-actions"><button class="iho-secondary" data-action="clear">Temizle</button></div><div class="iho-feedback"></div></div>`);
      let selected=[]; let found=new Set();
      $$('[data-cell]',this.container).forEach(cell=>cell.addEventListener('click',()=>{ cell.classList.toggle('selected'); const key=cell.dataset.cell; if(selected.includes(key)) selected=selected.filter(x=>x!==key); else selected.push(key); const text=selected.map(k=>{ const [r,c]=k.split(',').map(Number); return grid[r][c]; }).join(''); const rev=Array.from(text).reverse().join(''); const hit=words.find(w => strip(w)===strip(text) || strip(w)===strip(rev)); if(hit && !found.has(hit)){ found.add(hit); this.score++; $$(`[data-word="${hit}"]`,this.container).forEach(w=>w.classList.add('found')); $$('[data-cell].selected',this.container).forEach(c=>{c.classList.add('found'); c.classList.remove('selected');}); selected=[]; this.feedback(true, `${hit} bulundu.`); if(found.size===words.length) setTimeout(()=>this.end(),700); } }));
      $('[data-action="clear"]',this.container).addEventListener('click',()=>{ selected=[]; $$('[data-cell].selected',this.container).forEach(c=>c.classList.remove('selected')); });
    }
  }

  const IHOGame = {
    async load(url){ const res = await fetch(url); if(!res.ok) throw new Error('Database yüklenemedi: '+url); return await res.json(); },
    mount(container, db, gameId){ const s = new IHOGameSession(container, db, gameId); s.start(); return s; },
    mountCatalog(container, db, onSelect){
      const el = typeof container === 'string' ? document.querySelector(container) : container;
      const games = db.games || [];
      el.innerHTML = `<div class="iho-catalog">${games.map(g=>`<button class="iho-game-card" data-game="${safe(g.id)}"><span dir="rtl">${safe(g.title_ar)}</span><small>${safe(g.title_tr)} · ${safe(g.type)}</small></button>`).join('')}</div>`;
      $$('[data-game]', el).forEach(btn => btn.addEventListener('click', () => onSelect ? onSelect(btn.dataset.game) : IHOGame.mount(el, db, btn.dataset.game)));
    }
  };
  global.IHOGame = IHOGame;
})(window);
