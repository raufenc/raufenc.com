/* Kök Atlası: ağ isteği yok; seçeneklerin tamamı veri.js içinde sabittir. */
(() => {
  'use strict';
  const data = window.KOK_ATLASI;
  const host = document.getElementById('oyun');
  if (!host || !data) return;
  const cards = new Map(data.cards.map(c => [c.code, c]));
  const colors = ['#F04E23','#E81562','#064ED8','#6127A6','#007B68'];
  const mode = document.body.dataset.game;
  const element = (tag, text, cls) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (cls) el.className = cls;
    return el;
  };
  function button(text, fn, cls) {
    const b = element('button', text, cls); b.type = 'button'; b.addEventListener('click', fn); return b;
  }
  function feedback() {
    const el = element('p', '', 'feedback'); el.setAttribute('role','status'); el.setAttribute('aria-live','polite'); el.setAttribute('aria-atomic','true'); return el;
  }
  function heading(text) {
    const h = element('h2',text); h.tabIndex = -1; return h;
  }
  function color(c) { host.style.setProperty('--accent',c.familyColor || colors[c.box-1]); }
  function family(c) {
    const section = element('section',undefined,'answer');
    section.setAttribute('aria-label','Kelime ailesinin tamamı');
    section.append(element('h3',c.title),element('p',c.rootLine));
    const dl = element('dl');
    c.words.forEach(([word,definition]) => dl.append(element('dt',word),element('dd',definition)));
    section.append(dl,element('blockquote',c.sentence),element('p',c.etymology),element('p',c.question));
    return section;
  }
  function shuffled(items) {
    const a = [...items];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;
  }
  // İstanbul'un takvim günü; cihazın yerel saat diliminden bağımsızdır.
  function istanbulDate(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
    const part = name => parts.find(p=>p.type===name).value;
    return `${part('year')}-${part('month')}-${part('day')}`;
  }
  const dayNumber = date => Math.floor(Date.parse(date+'T00:00:00Z')/86400000);
  const dailyCard = date => cards.get(data.dailyOrder[((dayNumber(date)-dayNumber('2026-11-17'))%data.dailyOrder.length+data.dailyOrder.length)%data.dailyOrder.length]);
  const STORAGE = 'kok-atlasi-v1';
  let saved = {days:{}};
  let storageAvailable = true;
  try { const value=JSON.parse(localStorage.getItem(STORAGE)); if(value && value.days && typeof value.days==='object' && !Array.isArray(value.days)) saved=value; }
  catch (_) { storageAvailable=false; }
  function save() { try { localStorage.setItem(STORAGE,JSON.stringify(saved)); } catch (_) { storageAvailable=false; } }
  function statistics() {
    const completed=Object.entries(saved.days).filter(([d,s])=>/^\d{4}-\d{2}-\d{2}$/.test(d) && s && s.ended===true);
    const wins=completed.filter(([,s])=>s.won===true).map(([d])=>dayNumber(d)).sort((a,b)=>a-b);
    let best=0,run=0,prev=-Infinity;
    for(const d of wins){run=d===prev+1?run+1:1;best=Math.max(best,run);prev=d;}
    const today=dayNumber(istanbulDate());let streak=0;let d=wins.includes(today)?today:today-1;
    while(wins.includes(d--))streak++;
    return `${completed.length} gün tamamlandı · ${wins.length} doğru · Güncel seri: ${streak} · En uzun seri: ${best}`;
  }
  function readState(date,c) {
    const s=saved.days[date];
    if(s && s.card===c.code && Number.isInteger(s.hints) && s.hints>=1 && s.hints<=5 && Array.isArray(s.misses) && new Set(s.misses).size===s.misses.length && s.misses.every(v=>data.dailyOptions[c.code].includes(v) && v!==c.title) && s.misses.length<=5 && typeof s.ended==='boolean' && typeof s.won==='boolean' && (!s.won || s.ended)) return s;
    return {card:c.code,hints:1,misses:[],ended:false,won:false};
  }
  let date=istanbulDate(), practice=false, current=dailyCard(date), state=readState(date,current);
  function persist(){ if(!practice){saved.days[date]=state;save();} }
  function switchDaily(isPractice) {
    practice=isPractice;date=istanbulDate();
    current=practice?shuffled(data.cards.filter(c=>c.code!==current.code))[0]:dailyCard(date);
    state=practice?{card:current.code,hints:1,misses:[],ended:false,won:false}:readState(date,current);
    drawDaily(true);
  }
  function shareResult() {
    const text=`Kök Atlası · ${practice?'Pratik':date}\n${state.misses.map(()=>'🟥').join('')}${state.won?'🟩':'⬜'}\n${state.won?'Tamamlandı':'Bugünlük öğrenme molası'} · ${state.hints}/5 ipucu`;
    const existing=host.querySelector('.share-area');if(existing)existing.remove();
    const area=element('div',undefined,'share-area');const label=element('label','Sonuç metni');label.htmlFor='sonuc-metni';
    const field=element('textarea',text,'share-text');field.id='sonuc-metni';field.readOnly=true;
    const message=feedback();area.append(label,field,message);host.append(area);
    (async()=>{try {if(!navigator.clipboard)throw new Error('clipboard');await navigator.clipboard.writeText(text);message.textContent='✓ Sonuç metni kopyalandı. Dilediğiniz yerde paylaşabilirsiniz.';}catch(_){message.textContent='Sonuç metnini seçip kopyalayabilirsiniz.';field.focus();field.select();}})();
  }
  function drawDaily(focusTitle=false) {
    host.replaceChildren();color(current);
    const meta=element('div',undefined,'meta');meta.append(element('span',practice?'Pratik · rastgele kök':date+' · İstanbul'),element('span',`${state.hints}/5 ipucu`));
    const h=heading(practice?'Bir kökle daha tanışın':'Bugünün kelime ailesi');
    const hints=element('ol',undefined,'hints');
    const labels=['Kutu ve köken dili','Bir kelimenin tanımı','Başka bir kelimenin tanımı','Ailenin cümlesi','Aileden bir kelime'];
    if(data.dailyMeta[current.code].originHintIndex===2) labels.splice(0,3,'Bir kelimenin tanımı','Başka bir kelimenin tanımı','Kutu ve köken dili');
    data.hints[current.code].slice(0,state.hints).forEach((text,i)=>{const li=element('li');li.append(element('span',labels[i],'hint-label'),document.createTextNode(text));hints.append(li);});
    const choices=element('div',undefined,'choices');choices.setAttribute('role','group');choices.setAttribute('aria-label','Kök başlığını seçin');
    const status=feedback();
    data.dailyOptions[current.code].forEach(title=>{
      const wrong=state.misses.includes(title); const right=state.ended && title===current.title;
      const b=button((wrong?'✕ ':right?'✓ ':'')+title.split(/[→/]/)[0].trim(),()=>{
        if(state.ended)return;
        if(title===current.title){state.ended=true;state.won=true;persist();drawDaily();const msg=host.querySelector('[role=status]');msg.textContent='✓ Doğru. Ailenin tamamını birlikte okuyalım.';host.querySelector('.answer h3').focus();}
        else {state.misses.push(title);state.hints=Math.min(5,state.hints+1);persist();drawDaily();host.querySelector('[role=status]').textContent='✕ Bu başlık değil.'+(state.hints<5?' Sıradaki ipucu açıldı.':' Açık ipuçlarıyla yeniden deneyebilirsiniz.');const next=host.querySelector('.choices button:not(:disabled)');if(next)next.focus();}
      },wrong?'wrong':right?'right':'');
      b.disabled=state.ended||wrong; choices.append(b);
    });
    host.append(meta,h,element('p','İpuçlarını okuyun, aileye ait kök başlığını seçin.','instructions'),hints,choices,status);
    if(!state.ended){const actions=element('div',undefined,'actions');
      const next=button('Sonraki ipucu',()=>{state.hints++;persist();drawDaily();host.querySelector('[role=status]').textContent='Yeni ipucu açıldı.';(state.hints===5?host.querySelector('.choices button:not(:disabled)'):host.querySelector('#ipucu')).focus();},'secondary');next.id='ipucu';next.disabled=state.hints>=5;actions.append(next);
      if(state.hints===5)actions.append(button('Cevabı aç ve öğren',()=>{state.ended=true;state.won=false;persist();drawDaily();host.querySelector('[role=status]').textContent='Aile açıldı. Yarın yeni bir kök sizi bekliyor.';host.querySelector('.answer h3').focus();},'secondary'));
      host.append(actions);
    } else {
      const answer=family(current);answer.querySelector('h3').tabIndex=-1;host.append(answer);
      const actions=element('div',undefined,'actions');actions.append(button('Sonuç metnini kopyala',shareResult));host.append(actions);
    }
    const actions=element('div',undefined,'actions');actions.append(button('Pratik: rastgele kök',()=>switchDaily(true),'secondary'));if(practice)actions.append(button('Günün Kökü’ne dön',()=>switchDaily(false),'secondary'));host.append(actions);
    host.append(element('p',statistics(),'stats'),element('p',storageAvailable?'Günün ilerlemesi ve seri bilgisi yalnız bu tarayıcıda saklanır. Pratik, seriyi etkilemez.':'Tarayıcıda kayıt kullanılamıyor. Bu sayfa açıkken oynayabilirsiniz; ilerleme kalıcı olmayabilir.','fine'));
    if(focusTitle)h.focus();
  }
  function beginRound() {
    const bank=mode==='family'?data.familyBank:data.originBank;
    const selected=[],used=new Set();
    for(const q of shuffled(bank)){if(!used.has(q.card)){selected.push(q);used.add(q.card);}if(selected.length===10)break;}
    let index=0,score=0;
    function draw(focusTitle=false){
      host.replaceChildren();
      if(index===10){
        const h=heading('Tur tamamlandı');host.append(h,element('p',`${score} / 10`,'score'),element('p','Her kelime, ailesiyle birlikte daha anlamlı. Yeni bir turda başka ailelerle tanışabilirsiniz.'));
        const actions=element('div',undefined,'actions');actions.append(button('Yeni tur başlat',beginRound));const a=element('a','Diğer oyunlara dön','button secondary');a.href='/kok-atlasi/#oyunlar';actions.append(a);host.append(actions);h.focus();return;
      }
      const q=selected[index], c=cards.get(q.card);color(c);
      const meta=element('div',undefined,'meta');meta.append(element('span',`Soru ${index+1} / 10`),element('span',`${score} doğru`));host.append(meta);
      const h=heading(mode==='family'?c.title:c.words[q.wordIndex][0]);host.append(h);
      if(mode==='family'){
        host.append(element('p',c.rootLine));const list=element('ol',undefined,'family-words');
        c.words.forEach(([word],i)=>list.append(element('li',i===q.blank?'▢▢▢ — Hangi kelime eksik?':word,i===q.blank?'blank':undefined)));host.append(list);
      } else host.append(element('p',c.words[q.wordIndex][1]),element('p','Bu kelimenin kökü hangi dilden?','instructions'));
      const choices=element('div',undefined,'choices');choices.setAttribute('role','group');choices.setAttribute('aria-label','Cevabı seçin');const status=feedback();let locked=false;
      q.options.forEach(option=>choices.append(button(option,event=>{
        if(locked)return;locked=true;const correct=option===q.answer;if(correct)score++;
        Array.from(choices.children).forEach(b=>{b.disabled=true;if(b.textContent===q.answer){b.classList.add('right');b.textContent='✓ '+b.textContent;}else if(b===event.currentTarget){b.classList.add('wrong');b.textContent='✕ '+b.textContent;}});
        status.textContent=correct?'✓ Doğru.':'✕ Bu seçenek değil. Doğru cevap: '+q.answer+'.';
        const actions=element('div',undefined,'actions');const next=button(index===9?'Tur sonucunu gör':'Sonraki soru',()=>{index++;draw(true);});actions.append(next);host.append(actions,family(c));next.focus();
      })));
      host.append(choices,status);if(focusTitle)h.focus();
    }
    draw(true);
  }
  if(mode==='daily'){
    drawDaily();
    const refresh=()=>{if(!practice && istanbulDate()!==date)switchDaily(false);};
    document.addEventListener('visibilitychange',refresh);window.addEventListener('focus',refresh);setInterval(refresh,30000);
  } else beginRound();
})();
