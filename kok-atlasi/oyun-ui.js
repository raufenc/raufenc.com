/* Görsel zenginleştirme: asıl oyun.js ve soru bankaları değişmez. */
(() => {
  'use strict';
  const host=document.getElementById('oyun'),data=window.KOK_ATLASI;
  if(!host||!data)return;
  const allowed=new Set('KA01-03 KA01-01 KA01-17 KA02-13 KA02-16 KA02-17 KA03-28 KA03-01 KA03-35 KA04-01 KA04-10 KA04-06 KA05-12 KA05-31 KA05-28'.split(' '));
  const colors=['#F04E23','#E81562','#064ED8','#6127A6','#007B68'];let boxes=new Set(),lastQuestion=0,roundResults=new Map();
  const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  const image=(key,alt)=>{const im=el('img');im.src='/kok-atlasi/gorsel/'+key+'-320.webp';im.width=320;im.height=key.startsWith('KUTU')?480:472;im.loading='lazy';im.alt=alt;return im;};
  function sale(parent){const area=el('aside',undefined,'game-sale');area.append(el('p','Kelimeleri masanızda da bir araya getirin.'));const status=el('p');status.dataset.status='';const a=el('a',undefined,'button');a.dataset.cta='buy';area.append(status,a);parent.append(area);window.kaSatisDoldur(area);}
  function boxIcons(parent,ns){const row=el('div',undefined,'result-boxes');[...ns].sort().forEach(n=>{const a=el('a');a.href='/kok-atlasi/#kutular';a.style.setProperty('--accent',colors[n-1]);a.append(image('KUTU0'+n+'_ON',n+'. kutu'));row.append(a);});parent.append(row);}
  const fold=s=>s.toLocaleLowerCase('tr').normalize('NFD').replace(/\p{M}/gu,'');
  function sentenceWordIndex(words,token){
    const t=fold(token);let best=-1,score=0;
    words.forEach(([word],i)=>word.split('/').forEach(part=>{
      const w=fold(part.trim()),base=w.replace(/m[ae]k$/,'');
      const soften=s=>s.replace(/[kptc]$/,ch=>({k:'g',p:'b',t:'d',c:'c'}[ch]));
      const forms=[w,base,soften(base)];
      const dropped=base.replace(/([aeıioöuü])([^aeıioöuü]*)$/,'$2');
      if(dropped.length>=3)forms.push(dropped,soften(dropped));
      // Ekli biçimlerde en uzun gövde önceliklidir: cemaat, cem'den önce gelir.
      if(base.length>=4)forms.push(base.slice(0,-1));
      forms.forEach(stem=>{const rank=t===w?100+w.length:stem.length;
        if((stem.length>=3||t===w)&&t.startsWith(stem)&&rank>score){score=rank;best=i;}
      });
    }));
    return best;
  }
  function enhance(){
    const pageTitle=document.querySelector('.game-hero h1');if(pageTitle)pageTitle.style.color=host.style.getPropertyValue('--accent');
    const answer=host.querySelector('.answer');
    if(answer&&!answer.dataset.enriched){answer.dataset.enriched='true';const title=answer.querySelector('h3').textContent,c=data.cards.find(c=>c.title===title);if(c){boxes.add(c.box);const fb=host.querySelector('.feedback');if(lastQuestion&&fb)roundResults.set(lastQuestion,fb.textContent.startsWith('✓'));const chips=el('div',undefined,'family-chips');c.words.forEach(([w],i)=>{const s=el('span',w);s.style.setProperty('--word',colors[i]);chips.append(s);});answer.querySelector('h3').after(chips);
      const quote=answer.querySelector('blockquote');if(quote){const text=c.sentence,tokens=[...text.matchAll(/[\p{L}]+/gu)];let cursor=0;const frag=document.createDocumentFragment();tokens.forEach(m=>{const i=sentenceWordIndex(c.words,m[0]);if(i<0)return;frag.append(document.createTextNode(text.slice(cursor,m.index)));const mark=el('mark',m[0]);mark.dataset.word=String(i);mark.style.color=colors[i];frag.append(mark);cursor=m.index+m[0].length;});frag.append(document.createTextNode(text.slice(cursor)));quote.replaceChildren(frag);}
      if(allowed.has(c.code)){const fig=el('figure',undefined,'answer-art');fig.append(image(c.code+'_ON',c.title+' — örnek kart'));answer.append(fig);}
      if(document.body.dataset.game==='daily'){const note=el('p','Bu aile '+c.box+'. kutuda');answer.append(note);boxIcons(answer,new Set([c.box]));sale(answer);}
      if(document.body.dataset.game==='family'){const blank=host.querySelector('.blank');if(blank){const choices=host.querySelector('.choices');const right=choices.querySelector('.right');if(right){blank.textContent=right.textContent.replace(/^✓ /,'');blank.classList.add('filled');}}}
      if(document.body.dataset.game==='origin'){const wrap=el('div');wrap.innerHTML='<svg class="origin-arc" viewBox="0 0 360 100" role="img"><path d="M40 70 Q180 -20 320 70"></path><text x="45" y="90"></text><text x="280" y="90"></text></svg>';const svg=wrap.firstElementChild;svg.setAttribute('aria-label',c.origin+' kökeninden Türkçeye');const labels=svg.querySelectorAll('text');labels[0].textContent=c.origin;labels[1].textContent='Türkçe';answer.append(svg);}
    }}
    const meta=host.querySelector('.meta');if(meta&&!host.querySelector('.mini-progress')&&document.body.dataset.game!=='daily'){const m=meta.textContent.match(/Soru (\d+) \/ 10/);if(m){const n=+m[1];if(n===1&&lastQuestion!==1){boxes=new Set();roundResults=new Map();}lastQuestion=n;const row=el('div',undefined,'mini-progress');row.setAttribute('aria-label','Soru '+n+' / 10');for(let i=1;i<=10;i++){const s=el('span',undefined,i<n?(roundResults.get(i)?'done':'missed'):i===n?'current':'');s.setAttribute('aria-hidden','true');row.append(s);}meta.after(row);}}
    if(document.body.dataset.game==='daily'&&!host.querySelector('.week-strip')){const strip=el('div',undefined,'week-strip');strip.setAttribute('aria-label','Son yedi günlük kayıt');let saved={days:{}};try{saved=JSON.parse(localStorage.getItem('kok-atlasi-v1'))||saved;}catch(_){}for(let i=6;i>=0;i--){const d=new Date(Date.now()-i*86400000);const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);const done=saved.days&&saved.days[date]&&saved.days[date].won;const s=el('span',(done?'✓ ':'')+d.toLocaleDateString('tr-TR',{day:'numeric',month:'numeric',timeZone:'Europe/Istanbul'}),done?'done':'');strip.append(s);}host.append(strip);}
    if(document.body.dataset.game==='origin')host.querySelectorAll('.choices button').forEach(b=>{const n=['Arapça','Farsça','Yunanca','Türkçe','Latince'].indexOf(b.textContent.replace(/^[✓✕] /,''));b.style.setProperty('--option',colors[n===4?2:n]||colors[2]);});
    if(host.querySelector('.score')&&!host.querySelector('.game-sale')){host.append(el('p','Bu turda tanıştığınız 10 aile şu kutulardaydı'));boxIcons(host,boxes);sale(host);}
  }
  const observer=new MutationObserver(()=>{observer.disconnect();enhance();observer.observe(host,{childList:true,subtree:true});});enhance();observer.observe(host,{childList:true,subtree:true});
})();
