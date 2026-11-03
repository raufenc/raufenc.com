import {renderPassport} from './passport.js';
import {renderQRCodes} from './qrcodes.js';
import {renderHome,renderBook} from './premium.js';
import {renderShell,closeShellMenu} from './shell.js';
import { mountColorStudio, closeColorStudio } from './coloring.js';

const books=[
 {id:1,title:'Rabbimi ve İbadetlerimi Seviyorum',short:'İbadet Bahçem',desc:'Nimetleri fark et, ibadetleri adım adım öğren, merak ettiklerini keşfet.',color:'#91aa71',url:'https://raufenc.com/iyilik/1/'},
 {id:2,title:'Güzel Ahlaklı Oluyorum',short:'İyilik Atölyesi',desc:'Dostluk, doğruluk ve merhametle güzel davranışların anlamını keşfet.',color:'#d4a874',url:'https://raufenc.com/iyilik/2/'},
 {id:3,title:'Günlük Hayatımda Dinimi Yaşıyorum',short:'Günlük Hayat Maceram',desc:'Sofradan okula, küçük alışkanlıklardan güzel bir güne doğru yola çık.',color:'#8daeba',url:'https://raufenc.com/iyilik/3/'}
];
const icons={
 home:'<path d="m3 10 9-7 9 7v10H5V10m4 10v-7h6v7"/>',
 book:'<path d="M12 5c-3-2-7-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1v15"/>',
 paint:'<path d="m15 3 6 6-10 10-6-6L15 3Zm-9 9-3 9 9-3M13 5l6 6"/>',
 leaf:'<path d="M20 3C7 2 2 7 5 15c8 5 16-2 15-12ZM4 21 16 9"/>',
 people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4m2-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3"/>',
 search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
 arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
 back:'<path d="M20 12H5m6-6-6 6 6 6"/>',
 check:'<path d="m5 12 4 4L20 5"/>',
 sound:'<path d="m3 9 4 0 5-4v14l-5-4H3V9m13-2c3 3 3 7 0 10m3-13c5 5 5 11 0 16"/>',
 stop:'<rect x="6" y="6" width="12" height="12" rx="1"/>',
 play:'<path d="m8 4 12 8-12 8V4Z"/>',
 game:'<path d="M7 7h10c4 0 6 11 3 12-2 1-4-3-6-3h-4c-2 0-4 4-6 3C1 18 3 7 7 7Zm0 3v5m-2-2h4m7-2h1m1 3h1"/>',
 star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v1"/>',
 download:'<path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>'
};
const icon=n=>`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n]||icons.leaf}</svg>`;
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const para=s=>e(s).replace(/\n\n/g,'</p><p>');
const norm=s=>String(s).toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
const shuffle=arr=>arr.map(v=>({v,k:Math.random()})).sort((a,b)=>a.k-b.k).map(x=>x.v);
let lessons=[],sources=[],sourceMap={},activeTab='learn',currentLesson=null,gameState={},quizState={index:0,answered:false,correct:false},search='',bookFilter=0;
let state={completed:{},tasks:{},last:null,visits:{}};
try{const v=JSON.parse(localStorage.getItem('iyilik-dunya-v1')||'null');if(v&&typeof v==='object')state={...state,...v,completed:v.completed||{},tasks:v.tasks||{},visits:v.visits||{}}}catch{}
const count=()=>Object.keys(state.completed).filter(id=>lessons.some(l=>l.id===id)).length;
const save=()=>{try{localStorage.setItem('iyilik-dunya-v1',JSON.stringify(state))}catch{toast('İlerleme bu tarayıcıda saklanamıyor. İçerikleri kullanmaya devam edebilirsin.')}};
const toast=message=>{const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),3500)};
const bookBy=id=>books.find(b=>b.id===Number(id))||books[0];
const getLesson=id=>lessons.find(l=>l.id===id);
function shell(){
 renderShell({books,e,icon,onSearch:text=>{search=text;bookFilter=0;if(location.hash==='#konular')library();else location.hash='konular'}});
 updateProgress();
}
function closeMenu(){closeShellMenu()}
function experienceContext(){return {lessons,state,e,icon,setMain,books,getLesson,topicCard}}
function bookWorld(id){if(!renderBook(experienceContext(),id))notFound()}

function updateProgress(){const n=count();document.getElementById('side-count').textContent=`${n} / 60 konu keşfedildi`;document.getElementById('side-progress').style.width=`${n/60*100}%`}
function setMain(html){document.getElementById('main').innerHTML=html}
function topicCard(l,color=false){return `<a class="topiccard" href="#${color?'boyama':'ders'}/${e(l.id)}"><div class="topicimage"><img loading="lazy" src="assets/${e(l.id)}-thumb.webp" alt="${e(l.title)} boyama sahnesi"><span class="pagebadge">s. ${l.pages.join('–')}</span>${state.completed[l.id]?`<span class="donebadge" aria-label="Tamamlandı">✓</span>`:''}</div><div class="topicbody"><small>${e(bookBy(l.book).short)}</small><h3>${e(l.title)}</h3><p>${e(l.intro)}</p><div class="cardbottom"><span>${color?'Boyamaya başla':'Öğren · Oyna · Uygula'}</span>${icon('arrow')}</div></div></a>`}
function home(){renderHome(experienceContext())}
function library(color=false,book=bookFilter){
 bookFilter=Number(book)||0;
 const b=books.find(x=>x.id===bookFilter);
 setMain(`<div class="pagehead"><div class="eyebrow">${color?'RENKLERİNLE KEŞFET':b?`${b.id}. KİTAP · ${e(b.short)}`:'60 KONU, BİRBİRİNE AÇILAN KAPILAR'}</div><h1>${color?'Boyama atölyesi':b?e(b.title):'Bugün neyi merak ediyorsun?'}</h1><p>${color?'Kitabındaki sahneleri kendi renklerinle tamamla. Boyamanı sakla, indir veya kâğıtta devam etmek için yazdır.':b?e(b.desc):'Kitabına, konu adına veya sayfa numarasına göre keşfet. Her konuda anlatım, hikâye, oyun, sorular ve birlikte yapılacak bir etkinlik var.'}</p></div>
 <div class="filters" role="group" aria-label="Kitap filtresi">${[{id:0,short:'Bütün kitaplar'},...books].map(x=>`<button class="chip ${x.id===bookFilter?'active':''}" data-book="${x.id}" aria-pressed="${x.id===bookFilter}">${e(x.short)}</button>`).join('')}</div>
 <div class="findrow"><input type="search" class="field" id="library-query" placeholder="Konu ara: abdest, paylaşmak, sofra…" aria-label="Konu ara" value="${e(search)}"><label for="page-query">Kitap sayfan</label><input type="number" class="field" id="page-query" min="1" max="48" placeholder="6–45"><button class="button small light" id="clear-filters">Temizle</button></div>
 <p class="muted" id="result-count" style="font-size:11px;margin-bottom:15px" aria-live="polite"></p><div class="topicgrid" id="topic-results"></div>`);
 const update=()=>{search=document.getElementById('library-query').value;const p=Number(document.getElementById('page-query').value);const list=lessons.filter(l=>(!bookFilter||l.book===bookFilter)&&(!search||norm(`${l.title} ${l.intro} ${l.learn.map(x=>x.text).join(' ')}`).includes(norm(search)))&&(!p||l.pages.includes(p)));document.getElementById('result-count').textContent=`${list.length} konu${p?' · sayfa '+p:''}`;document.getElementById('topic-results').innerHTML=list.length?list.map(l=>topicCard(l,color)).join(''):'<div class="empty" style="grid-column:1/-1"><h3>Bu seçimle bir konu bulamadık.</h3><p>Kitapların konu sayfaları 6–45 arasındadır. Başka bir kelime veya sayfa deneyebilirsin.</p></div>'};
 document.querySelectorAll('[data-book]').forEach(btn=>btn.onclick=()=>{bookFilter=Number(btn.dataset.book);document.querySelectorAll('[data-book]').forEach(x=>{x.classList.toggle('active',x===btn);x.setAttribute('aria-pressed',x===btn)});update()});
 document.getElementById('library-query').oninput=update;document.getElementById('page-query').oninput=update;
 document.getElementById('clear-filters').onclick=()=>{document.getElementById('library-query').value='';document.getElementById('page-query').value='';update()};update();
}
const tabs=[['learn','book','Öğren'],['story','people','Hikâye'],['game','game','Oyun'],['quiz','star','Kendini dene'],['color','paint','Boyama'],['family','leaf','Birlikte']];
function lesson(id,tab='learn'){
 const l=getLesson(id);if(!l){notFound();return}
 currentLesson=l;activeTab=tab;state.last=l.id;state.visits[l.id]=Date.now();save();
 setMain(`<a class="backlink" href="#kitap/${l.book}">${icon('back')}${e(bookBy(l.book).short)}</a><section class="lessonhead"><div><div class="lessonmeta">${l.book}. KİTAP · SAYFA ${l.pages.join('–')}</div><h1>${e(l.title)}</h1><p>${e(l.intro)}</p></div><img src="assets/${l.id}-thumb.webp" alt="${e(l.title)} sahnesi"></section>
 <div class="tabs" role="tablist" aria-label="Konu etkinlikleri">${tabs.map(([id,ic,t])=>`<button class="tab ${id===tab?'active':''}" role="tab" id="tab-${id}" aria-selected="${id===tab}" aria-controls="lesson-content" data-tab="${id}">${icon(ic)}${t}</button>`).join('')}</div><section id="lesson-content" role="tabpanel" aria-labelledby="tab-${tab}"></section>`);
 document.querySelectorAll('[data-tab]').forEach(btn=>btn.onclick=()=>changeTab(btn.dataset.tab));
 showTab();
}
function changeTab(tab){
 closeColorStudio();stopAudio();activeTab=tab;document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab);b.setAttribute('aria-selected',b.dataset.tab===tab)});
 document.getElementById('lesson-content').setAttribute('aria-labelledby','tab-'+tab);showTab();
}
function sourceLinks(l){return `<div class="sources-inline"><strong>Bu konunun kaynakları:</strong> ${(l.sourceIds||[]).map(id=>sourceMap[id]).filter(Boolean).map(s=>`<a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${e(s.title)}</a>`).join(' ')}<br>Açıklamalar çocuklar için yeniden anlatılmıştır; doğrudan alıntı değildir. Ayrıntılar birlikte okuyan büyükler içindir.</div>`}
function showTab(){
 const l=currentLesson,c=document.getElementById('lesson-content');
 if(activeTab==='learn'){
 c.innerHTML=`<div class="content-top"><h2>Birlikte keşfedelim.</h2><div class="audio-controls"><button class="button small light" id="listen">${icon('sound')} Dinle</button><button class="button small light" id="stop-audio" aria-label="Dinlemeyi durdur">${icon('stop')}</button><span class="audio-note">Cihazının Türkçe sesiyle okunur.</span></div></div>
 <div class="learncards">${l.learn.map((x,i)=>`<article class="learncard"><span class="stepnumber">0${i+1}</span><div><h3>${e(x.title)}</h3><p>${para(x.text)}</p></div></article>`).join('')}</div>
 <div class="deep"><h2>Biraz daha merak ediyorum.</h2>${l.deeper.map(x=>`<details><summary>${e(x.q)}</summary><p>${para(x.a)}</p></details>`).join('')}</div>
 <div class="taskbox"><h3>Bugün hayatında dene.</h3><p>${e(l.task)}</p><label class="checkrow"><input type="checkbox" id="task-check" ${state.tasks[l.id]?'checked':''}>Bu etkinliği denedim.</label><small class="muted">Bu işaret kendi hatırlatıcındır; davranışlarına puan verilmez.</small></div>
 ${sourceLinks(l)}<div class="nextrow"><button class="button" id="to-story">Hikâyeye katıl ${icon('arrow')}</button><button class="button light" id="print-lesson">Bu dersi yazdır</button></div>`;
 document.getElementById('listen').onclick=()=>speak([l.title,l.intro,...l.learn.flatMap(x=>[x.title,x.text])].join('. '));
 document.getElementById('stop-audio').onclick=stopAudio;
 document.getElementById('task-check').onchange=ev=>{state.tasks[l.id]=ev.target.checked;save()};
 document.getElementById('to-story').onclick=()=>changeTab('story');
 document.getElementById('print-lesson').onclick=()=>window.print();
 }else if(activeTab==='story'){
 c.innerHTML=`<div class="content-top"><h2>Hikâyede sen de varsın.</h2></div><div class="story-scene"><small>EMİR VE ZEYNEP’LE BİR GÜN</small><p>${e(l.story.scene)}</p></div><p class="question">${e(l.story.question)}</p><div class="choices">${l.story.options.map((o,i)=>`<button class="choice" data-story="${i}"><span class="letter">${String.fromCharCode(65+i)}</span>${e(o.text)}</button>`).join('')}</div><div id="story-feedback" aria-live="polite"></div><div class="nextrow"><button class="button light" id="story-to-game">Oyuna geç ${icon('arrow')}</button></div>`;
 document.querySelectorAll('[data-story]').forEach(btn=>btn.onclick=()=>{const o=l.story.options[Number(btn.dataset.story)];document.querySelectorAll('[data-story]').forEach(b=>b.classList.remove('selected','incorrect'));btn.classList.add(o.correct?'selected':'incorrect');document.getElementById('story-feedback').innerHTML=`<div class="feedback ${o.correct?'':'retry'}"><strong>${o.correct?'Birlikte düşünelim.':'Başka bir yol da düşünelim.'}</strong><p>${e(o.feedback)}</p>${o.correct?'':'<p>Başka bir seçenek deneyebilirsin.</p>'}</div>`});
 document.getElementById('story-to-game').onclick=()=>changeTab('game');
 }else if(activeTab==='quiz'){quizState={index:0,answered:false,correct:false};renderQuiz()}
 else if(activeTab==='game'){initGame()}
 else if(activeTab==='color'){c.innerHTML=`<div class="content-top"><h2>Bu sahne senin renklerinle.</h2><a class="button small light" href="assets/${l.id}.png" download="${l.id}-boyama.png">${icon('download')} Boş resmi indir</a></div><div id="color-root"></div>`;mountColorStudio(document.getElementById('color-root'),l,toast,icon)}
 else if(activeTab==='family'){
 c.innerHTML=`<div class="content-top"><h2>Birlikte okuyan büyüklere</h2><button class="button small light" id="print-family">Rehberi yazdır</button></div>
 <article class="family-card"><h3>Bu konuya nasıl eşlik edebilirsiniz?</h3><p>${para(l.family.guide)}</p></article>
 <article class="family-card"><h3>Sohbeti açan sorular</h3><ul>${l.family.questions.map(q=>`<li>${e(q)}</li>`).join('')}</ul></article>
 <article class="family-card"><h3>Birlikte yapalım</h3><p>${para(l.family.activity)}</p></article>
 <div class="taskbox"><h3>Çocuğunuzun açıklamasını dinleyin.</h3><p>“Neden böyle düşündün?” ve “Bunu başka nerede kullanabiliriz?” sorularıyla gerekçesini anlatmasına fırsat verin. Yanlış cevap yeni bir konuşmanın başlangıcıdır. İbadetle ilgili ayrıntıları çocuğun hazır oluşuna göre, kaynak notlarındaki çerçeveyle ele alın.</p></div>${sourceLinks(l)}`;
 document.getElementById('print-family').onclick=()=>window.print();
 }
}
function renderQuiz(){
 const l=currentLesson,c=document.getElementById('lesson-content');
 if(quizState.index>=l.quiz.length){
 state.completed[l.id]=Date.now();save();updateProgress();
 const next=lessons.find(x=>x.book===l.book&&x.n===l.n+1);
 c.innerHTML=`<div class="celebration"><span>❧</span><h2>Bir keşif daha tamamlandı.</h2><p>${e(l.title)} konusunun sorularını açıklamalarıyla tamamladın. Öğrendiklerini bir büyüğüne kendi sözlerinle anlatmayı dene.</p><div class="hero-actions" style="justify-content:center"><button class="button" id="quiz-color">${icon('paint')} Boyamaya geç</button><button class="button light" id="quiz-again">Soruları yeniden çöz</button>${next?`<a class="button light" href="#ders/${next.id}">Sonraki konu ${icon('arrow')}</a>`:'<a class="button light" href="#agac">Defterime bak</a>'}</div></div>`;
 document.getElementById('quiz-color').onclick=()=>changeTab('color');document.getElementById('quiz-again').onclick=()=>{quizState.index=0;renderQuiz()};return;
 }
 const q=l.quiz[quizState.index];quizState.answered=false;quizState.correct=false;
 c.innerHTML=`<div class="content-top"><h2>Kendini dene.</h2><span class="muted" style="font-size:12px">${quizState.index+1} / ${l.quiz.length} soru</span></div><div class="quizprogress">${l.quiz.map((_,i)=>`<span class="${i<quizState.index?'done':i===quizState.index?'current':''}"></span>`).join('')}</div>
 <div class="quiz-card"><p class="question">${e(q.question)}</p><div class="choices">${q.options.map((o,i)=>`<button class="choice" data-answer="${i}"><span class="letter">${String.fromCharCode(65+i)}</span>${e(o)}</button>`).join('')}</div><div id="quiz-feedback" aria-live="polite"></div><div class="nextrow"><button class="button" id="quiz-next" disabled>${quizState.index===l.quiz.length-1?'Keşfi tamamla':'Sonraki soru'} ${icon('arrow')}</button></div></div>`;
 document.querySelectorAll('[data-answer]').forEach(btn=>btn.onclick=()=>{const good=Number(btn.dataset.answer)===q.answer;document.querySelectorAll('[data-answer]').forEach(b=>b.classList.remove('selected','incorrect'));btn.classList.add(good?'selected':'incorrect');quizState.answered=true;quizState.correct=good;document.getElementById('quiz-next').disabled=!good;document.getElementById('quiz-feedback').innerHTML=`<div class="feedback ${good?'':'retry'}"><strong>${good?'Evet, birlikte nedenine bakalım.':'Bir daha düşünelim.'}</strong><p>${e(q.explanation)}</p>${good?'':'<p>Açıklamayı okuyup tekrar deneyebilirsin.</p>'}</div>`});
 document.getElementById('quiz-next').onclick=()=>{if(!quizState.correct)return;quizState.index++;renderQuiz()};
}
function initGame(){
 const game=currentLesson.game;
 if(game.type==='order')gameState={type:'order',bank:shuffle(game.items.map((text,i)=>({text,i}))),chosen:[]};
 else gameState={type:'match',left:game.pairs.map((p,i)=>({...p,i})),right:shuffle(game.pairs.map((p,i)=>({...p,i}))),selected:null,done:[]};
 renderGame();
}
function renderGame(){
 const c=document.getElementById('lesson-content'),g=currentLesson.game;
 if(g.type==='order'){
 c.innerHTML=`<div class="content-top"><h2>Sırayı birlikte kuralım.</h2><button class="button small light" id="game-reset">Yeniden başla</button></div><p>${e(g.instruction)}</p><p class="muted" style="font-size:12px;margin-top:9px">Kartlara doğru sırayla dokun. Seçtiğin kartlar aşağıya yerleşir.</p>
 <div class="orderbank">${gameState.bank.filter(x=>!gameState.chosen.includes(x.i)).map(x=>`<button class="orderitem" data-order="${x.i}">${e(x.text)}</button>`).join('')}</div>
 <div class="orderslots" aria-label="Seçtiğin sıra">${gameState.chosen.length?gameState.chosen.map((id,i)=>`<div class="orderplaced"><b>${i+1}</b><span>${e(g.items[id])}</span></div>`).join(''):'<span class="muted" style="font-size:13px">İlk adımı seçerek başla.</span>'}</div>
 <div class="toolbuttons"><button class="button light" id="order-undo" ${!gameState.chosen.length?'disabled':''}>Son kartı geri al</button><button class="button" id="order-check" ${gameState.chosen.length!==g.items.length?'disabled':''}>Sıramı kontrol et</button></div><div id="game-feedback" aria-live="polite"></div>`;
 document.querySelectorAll('[data-order]').forEach(b=>b.onclick=()=>{gameState.chosen.push(Number(b.dataset.order));renderGame()});
 document.getElementById('order-undo').onclick=()=>{gameState.chosen.pop();renderGame()};
 document.getElementById('order-check').onclick=()=>{const good=gameState.chosen.every((x,i)=>x===i);document.getElementById('game-feedback').innerHTML=`<div class="feedback ${good?'':'retry'}">${good?'Bütün adımlar yerli yerinde. Şimdi bu sırayı kendi sözlerinle anlatabilir misin?':'Bu sırada değişmesi gereken adımlar var. “Yeniden başla” ile tekrar dene; Öğren bölümündeki açıklama sana yardımcı olabilir.'}</div>${good?'<button class="button" id="game-to-quiz">Sorularla pekiştir →</button>':''}`;if(good)document.getElementById('game-to-quiz').onclick=()=>changeTab('quiz')};
 }else{
 c.innerHTML=`<div class="content-top"><h2>Birbirini tamamlayanları bul.</h2><button class="button small light" id="game-reset">Yeniden başla</button></div><p>${e(g.instruction)}</p><p class="muted" style="font-size:12px;margin:9px 0 19px">Önce soldan bir kart, sonra sağdan eşini seç.</p><div class="matchgrid"><div class="matchcol">${gameState.left.map(p=>`<button class="matchitem ${gameState.done.includes(p.i)?'matched':gameState.selected===p.i?'active':''}" data-left="${p.i}" ${gameState.done.includes(p.i)?'disabled':''}>${e(p.a)} ${gameState.done.includes(p.i)?'✓':''}</button>`).join('')}</div><div class="matchcol">${gameState.right.map(p=>`<button class="matchitem ${gameState.done.includes(p.i)?'matched':''}" data-right="${p.i}" ${gameState.done.includes(p.i)?'disabled':''}>${e(p.b)} ${gameState.done.includes(p.i)?'✓':''}</button>`).join('')}</div></div><div id="game-feedback" aria-live="polite">${gameState.done.length===g.pairs.length?'<div class="feedback">Bütün eşleri buldun! İki kart arasındaki ilişkiyi bir büyüğüne anlatmayı dene.</div><button class="button" id="game-to-quiz">Sorularla pekiştir →</button>':''}</div>`;
 document.querySelectorAll('[data-left]').forEach(b=>b.onclick=()=>{gameState.selected=Number(b.dataset.left);renderGame()});
 document.querySelectorAll('[data-right]').forEach(b=>b.onclick=()=>{if(gameState.selected===null){toast('Önce sol taraftan bir kart seç.');return}if(gameState.selected===Number(b.dataset.right)){gameState.done.push(gameState.selected);gameState.selected=null;renderGame()}else document.getElementById('game-feedback').innerHTML='<div class="feedback retry">Bu iki kart birbirini tamamlamıyor. Kartlardaki anlamı düşünerek başka bir eş deneyebilirsin.</div>'});
 const next=document.getElementById('game-to-quiz');if(next)next.onclick=()=>changeTab('quiz');
 }
 document.getElementById('game-reset').onclick=initGame;
}
function colorPage(id){
 const l=getLesson(id);
 if(!l){library(true);return}
 currentLesson=l;state.last=l.id;save();
 setMain(`<a class="backlink" href="#boyama">${icon('back')}Bütün boyamalar</a><div class="pagehead"><div class="eyebrow">${e(bookBy(l.book).short)} · SAYFA ${l.pages.join('–')}</div><h1>${e(l.title)}</h1><p>Dokun, boya, kendi renklerini seç. İstersen boş resmi indirip kâğıtta devam et.</p></div><div class="book-picker"><label for="color-select">Başka bir sahne</label><select id="color-select" class="field">${books.map(b=>`<optgroup label="${e(b.short)}">${lessons.filter(x=>x.book===b.id).map(x=>`<option value="${x.id}" ${x.id===id?'selected':''}>${e(x.title)}</option>`).join('')}</optgroup>`).join('')}</select><a class="button small light" href="#ders/${l.id}">Bu konuyu öğren</a></div><div id="color-root"></div>`);
 document.getElementById('color-select').onchange=ev=>location.hash='boyama/'+ev.target.value;
 mountColorStudio(document.getElementById('color-root'),l,toast,icon);
}
function tree(){renderPassport({books,lessons,state,e,icon,setMain,save,toast,updateProgress,getLesson})}
function family(){
 setMain(`<div class="pagehead"><div class="eyebrow">BİRLİKTE OKUYAN BÜYÜKLERE</div><h1>Merakına eşlik edin.</h1><p>Kitaptaki kısa anlatımı, çocuğunuzun sorularıyla genişletin. Her konu için ayrıntılı rehber, sohbet soruları ve günlük hayatta yapılacak bir etkinlik hazırladık.</p></div>
 <div class="familygrid">
 <article class="family-card"><h3>1. Önce çocuğun bildiğini dinleyin.</h3><p>Kitaptaki resmi açın. “Burada neler oluyor?” diye sorun. Sonra konu sayfasındaki üç kısa açıklamayı okuyun veya cihazın Türkçe sesiyle dinleyin. Süreyi çocuğun ilgisine göre ayarlayın.</p></article>
 <article class="family-card"><h3>2. Kararın gerekçesini konuşun.</h3><p>Hikâyedeki seçenekleri birlikte değerlendirin. Doğru seçeneğin yanında nedenini de konuşun. Çocuğun sorusunu tamamlamasına izin verin; bilmediğiniz bir konuda ilgili kaynak bölümüne beraber bakın.</p></article>
 <article class="family-card"><h3>3. Ekrandan hayata geçin.</h3><p>“Bugün hayatında dene” görevini gündelik bir ana taşıyın. Birlikte uygulamak, bir başkasına anlatmak ve birkaç gün sonra hatırlamak için küçük fırsatlar oluşturun.</p></article>
 <article class="family-card"><h3>4. Her çocuğa kendi hızında eşlik edin.</h3><p>Boyama ve oyunlar tekrar açılabilir. Yarış, sıralama veya günlük seri kaybetme baskısı yoktur. Okuma desteği isteyen çocuk birlikte dinleyebilir; tercih ederse etkinliği kâğıtta sürdürebilir.</p></article>
 </div><article class="family-card"><h3>Dinî anlatımın çerçevesi</h3><p>İbadetlerin uygulama ayrıntıları, derslerde belirtilen yerlerde Hanefî çerçeveyle anlatılır. Başka mezheplerde farklı uygulamalar bulunabilir. Farz, sünnet, âdap ve kitaptaki çizim tercihleri aynı şey değildir. Namaz çizimindeki takke veya çorap gibi unsurları tek başına ibadetin geçerlilik şartı olarak öğretmeyin.</p><p>Kaynaklar, ilgili bilginin dayanağını göstermek içindir; herhangi bir kurumun bu siteyi onayladığı anlamına gelmez. İçerikler kaynaklardan yararlanılarak özgün ve çocuklara uygun dille hazırlanmıştır. Kişiye özel dinî sorular için ehil bir öğreticiyle görüşün.</p></article>
 <article class="family-card"><h3>Saygı, güven ve gönüllülük</h3><p>Çocuğu sarılmaya, affetmeye veya özel bir duygusunu açıklamaya zorlamayın. Sabır, zarar görmeye sessiz kalmak olarak öğretilmez. İyilik, niyet ve iman dijital puanla ölçülmez. Mukaddes isimler ve metinler boyanacak veya silinecek oyun nesneleri yapılmaz.</p></article>
 <div class="sectionhead"><div><h2>Bir konunun rehberini açın.</h2><p>Her dersin “Birlikte” sekmesinde o konuya özel öneriler bulunur.</p></div></div><div class="bookgrid">${books.map(b=>`<a class="soft-panel" href="#kitap/${b.id}"><div><div class="eyebrow">${b.id}. KİTAP</div><h3>${e(b.short)}</h3><span class="button small light">20 rehberi keşfet →</span></div></a>`).join('')}</div>
 <div class="notice">Sesli okuma, cihazınızda bulunan Türkçe konuşma motorunu kullanır. Her cihazda aynı ses veya telaffuz kalitesi bulunmayabilir. Yazılı içerik her zaman erişilebilir.</div><div class="nextrow"><a class="button light" href="#kaynaklar">Kaynakları inceleyin</a><a class="button light" href="#karekod">Kitap karekodları</a></div>`);
}
function sourcePage(){
 setMain(`<div class="pagehead"><div class="eyebrow">ÖĞRENDİKLERİMİZİN DAYANAKLARI</div><h1>Kaynakça ve yayın çerçevesi</h1><p>Kaynaklar her dersin altında da gösterilir. Bağlantılar ilgili kurumların özgün sayfalarına açılır. Bu kaynakların kullanılması kurumsal onay anlamına gelmez.</p></div><div class="notice">Dinî açıklamalar, çocuklara uygun özgün anlatımlardır. Doğrudan ayet veya Hadis-i Şerif alıntısı olarak sunulmaz. İbadet uygulamalarında belirtilen Hanefî çerçeve, diğer mezheplerin uygulamalarını geçersiz saymaz.</div>${books.map(b=>`<div class="sectionhead"><div><h2>${e(b.short)}</h2></div></div><div class="sourcegrid">${sources.filter(s=>lessons.some(l=>l.book===b.id&&l.sourceIds.includes(s.id))).map(s=>`<article class="sourcecard"><h3>${e(s.title)}</h3><p>${e(s.scope||'İlgili konu açıklamalarının hazırlanmasında yararlanılan kaynak.')}</p><a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">Özgün kaynağı aç ↗</a></article>`).join('')}</div>`).join('')}`);
}
function qrPage(){renderQRCodes({setMain,books,e,icon})}
function privacy(){
 setMain(`<div class="pagehead"><div class="eyebrow">SADE VE AÇIK</div><h1>Gizlilik ve cihaz kayıtları</h1><p>Öğrenme yolculuğunda hesap açman veya kişisel bilgilerini paylaşman gerekmez.</p></div>
 <article class="family-card"><h3>Neler saklanır?</h3><p>Tamamlanan konular, son açılan ders ve etkinlik işaretleri bu tarayıcının yerel alanında; boyamalar ise bu tarayıcının çizim veritabanında saklanır. Uygulama bu kayıtları bir kullanıcı sunucusuna göndermez. Tarayıcı verileri silinirse veya cihaz değişirse kayıtlar kendiliğinden taşınmaz.</p></article>
 <article class="family-card"><h3>Dış bağlantılar ve ses</h3><p>Kaynak bağlantıları tıklandığında ilgili kurumun sitesine geçilir. Yazı tipleri Google Fonts üzerinden yüklenebilir; siteyi sunan barındırma hizmeti olağan erişim kayıtları tutabilir. Uygulamada reklam veya ek analitik izleyici bulunmaz. Sesli okuma cihazın konuşma motoruyla çalışır; motorun çevrim içi veya çevrim dışı çalışması cihaz ayarlarına bağlıdır.</p></article>
 <article class="family-card"><h3>Kayıtlarımı nasıl korurum?</h3><p>Keşif defterindeki yedekleme düğmesi öğrenme ilerlemesini indirir. Boyama ekranındaki PNG indir düğmesi çizimini bir dosyaya kaydeder. Paylaşılan bir cihaz kullanıyorsan kaydın o tarayıcıyı kullanan diğer kişilerce görülebileceğini unutma.</p></article>
 <a class="button light" href="#agac">İlerleme yedeklerime git</a>`);
}
function notFound(){setMain('<div class="empty"><h2>Bu sayfayı bulamadık.</h2><p style="margin:15px 0">Konu kütüphanesinden yolculuğuna devam edebilirsin.</p><a class="button" href="#konular">Konuları keşfet</a></div>')}
let speechQueue=[];
function stopAudio(){speechQueue=[];if('speechSynthesis'in window)window.speechSynthesis.cancel()}
function speak(text){
 if(!('speechSynthesis'in window)){toast('Bu tarayıcı sesli okumayı desteklemiyor. Metni birlikte okuyabilirsin.');return}
 stopAudio();const voices=speechSynthesis.getVoices();const voice=voices.find(v=>v.lang.startsWith('tr'));
 if(!voice&&!voices.some(v=>v.lang.startsWith('tr'))){toast('Cihazında Türkçe ses bulunmayabilir. Ses ayarlarından Türkçe ekleyebilirsin.')}
 speechQueue=text.match(/[^.!?]+[.!?]?/g)||[text];
 const next=()=>{if(!speechQueue.length)return;const u=new SpeechSynthesisUtterance(speechQueue.shift());u.lang='tr-TR';u.rate=.9;if(voice)u.voice=voice;u.onend=next;u.onerror=ev=>{if(ev.error!=='interrupted'&&ev.error!=='canceled'){speechQueue=[];toast('Sesli okuma başlatılamadı. Metni okumaya devam edebilirsin.')}};speechSynthesis.speak(u)};next();
}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function route(){
 closeColorStudio();stopAudio();closeMenu();const [page,id]=location.hash.slice(1).split('/');
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===page||(a.dataset.nav==='konular'&&['kitap','ders'].includes(page))));
 document.title=(page==='ders'&&getLesson(id)?getLesson(id).title+' · ':'')+'İyiliklerle Büyüyorum';
 if(page==='ders')lesson(id);
 else if(page==='kitap'){search='';bookWorld(id)}
 else if(page==='konular')library();
 else if(page==='boyama')id?colorPage(id):library(true);
 else if(page==='agac')tree();
 else if(page==='buyukler')family();
 else if(page==='kaynaklar')sourcePage();
 else if(page==='karekod')qrPage();
 else if(page==='gizlilik')privacy();
 else if(!page||page==='home')home();
 else notFound();
 window.scrollTo({top:0,behavior:'instant'});
}
async function boot(){
 try{
 const results=await Promise.all([1,2,3].flatMap(b=>[fetch(`data/book${b}.json`).then(r=>{if(!r.ok)throw Error('İçerik yüklenemedi');return r.json()}),fetch(`data/book${b}-sources.json`).then(r=>{if(!r.ok)throw Error('Kaynak yüklenemedi');return r.json()})]));
 for(let i=0;i<results.length;i+=2){lessons.push(...results[i]);sources.push(...results[i+1])}lessons.sort((a,b)=>a.book-b.book||a.n-b.n);sourceMap=Object.fromEntries(sources.map(s=>[s.id,s]));shell();
 if(!location.hash){const host=location.hostname;const b=host.includes('iyilik-atolyesi')?2:host.includes('gunluk-hayat')?3:host.includes('ibadet-bahcem')?1:null;if(b)history.replaceState(null,'','#kitap/'+b)}
 window.addEventListener('hashchange',route);route();
 }catch(err){document.getElementById('app').innerHTML='<div class="loading"><span>✿</span><h2>Biraz bekleyelim.</h2><p>İçerik yüklenemedi. Bağlantını kontrol edip yeniden deneyebilirsin.</p><button class="button" onclick="location.reload()">Yeniden dene</button></div>';console.error(err)}
}
boot();
