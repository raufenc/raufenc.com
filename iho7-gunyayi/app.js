/* ===== İHO7 Arapça — Gün Yayı motoru =====
   1 KİŞİ : izle (video büyük) → video küçülür, soru + etkileşim yükselir → cevapla → cevabı videodan duy (altyazılı)
   2 KİŞİ : paylaşımlı video; iki ayrı yarış şeridi (şıklar bağımsız karışır), ilk doğru ⚡, ikisi de cevaplar, cevap videodan duyulur.
   Etkileşim türleri (sahne üstverisi SCENE'den): dial = güneşi gün yayında sürükle · town = binaya dokun · cards = kart seç.
   Arapça metin yalnız data.js'den ve orijinal arayüz yazılarından gelir; burada yeni Arapça metin yazılmadı. */
(function(){
'use strict';
const AD=['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
const toAr=n=>String(n).split('').map(c=>AD[+c]??c).join('');
const DIR='vid/clips/';
const $=s=>document.querySelector(s);
const clamp=ART.clamp, mix=ART.mix;
const ACT=(window.ACTIVITIES||[]).find(a=>a.id===new URLSearchParams(location.search).get('id'))||window.ACTIVITIES[0];
const SC=(window.SCENE||{})[ACT.id]||{q:[],posters:[]};
const N=ACT.questions.length;
const root=document.documentElement;
function setVh(){root.style.setProperty('--dvh',(window.innerHeight/100)+'px');}
setVh();addEventListener('resize',setVh);
const video=$('#vid'), stage=$('#stage'), cap=$('#cap'), replayBtn0=$('#replay');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;};
const ease={io:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,out:t=>1-Math.pow(1-t,3)};
function anim(ms,f,e=ease.io){return new Promise(res=>{const t0=performance.now();(function step(now){const k=clamp((now-t0)/ms);f(e(k),k);k<1?requestAnimationFrame(step):res();})(t0);});}

/* ================= SES (WebAudio, dosyasız) ================= */
let AC=null,muted=false;
function ac(){ if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}} if(AC&&AC.state==='suspended')AC.resume(); return AC; }
function tone(f,t0,dur,type,vol,to){
  if(muted)return; const a=ac(); if(!a)return;
  const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+t0;
  o.type=type||'sine'; o.frequency.setValueAtTime(f,t); if(to)o.frequency.exponentialRampToValueAtTime(to,t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol||.15,t+.02); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t+dur+.05);
}
const sfx={
  tap(){tone(620,0,.09,'triangle',.12);},
  tick(){tone(1100,0,.04,'square',.035);},
  whoosh(){tone(180,0,.5,'sawtooth',.05,900);},
  good(){[523,659,784,1047,1319].forEach((f,i)=>tone(f,i*.085,.45,'sine',.15));tone(262,0,.6,'triangle',.08);},
  bad(){tone(330,0,.28,'sine',.13,200);tone(247,.14,.35,'sine',.1,160);},
  star(){tone(1568,0,.3,'sine',.1);tone(2093,.07,.4,'sine',.08);},
  fan(){[392,523,659,784,1047,1319,1568].forEach((f,i)=>tone(f,i*.11,.55,'triangle',.13));}
};
const buzz=ms=>{try{navigator.vibrate&&navigator.vibrate(ms);}catch(e){}};
$('#sndBtn').addEventListener('click',e=>{muted=!muted;e.currentTarget.classList.toggle('off',muted);if(!muted)sfx.tap();});

/* ================= PARÇACIKLAR ================= */
const fxc=$('#fx'),fxx=fxc.getContext('2d');let parts=[],fxRun=false;
function fxSize(){const d=Math.min(2,window.devicePixelRatio||1);fxc.width=innerWidth*d;fxc.height=innerHeight*d;fxx.setTransform(d,0,0,d,0,0);}
addEventListener('resize',fxSize);fxSize();
const COLS=['#FFC83D','#FF9F1C','#FFE27A','#fff','#FF5C9B','#6FD3FF'];
function starPath(c,x,y,r){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();}
function burst(x,y,n,power){
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=(power||9)*(.35+Math.random());
    parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-5,r:6+Math.random()*12,rot:Math.random()*6,vr:(Math.random()-.5)*.3,life:1,dec:.008+Math.random()*.01,c:COLS[(Math.random()*COLS.length)|0],s:Math.random()<.6?0:1,g:.28});}
  if(!fxRun){fxRun=true;requestAnimationFrame(fxLoop);}
}
function rain(n){
  for(let i=0;i<n;i++){parts.push({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.6,vx:(Math.random()-.5)*2,vy:2+Math.random()*4,r:7+Math.random()*13,rot:Math.random()*6,vr:(Math.random()-.5)*.2,life:1,dec:.004,c:COLS[(Math.random()*COLS.length)|0],s:Math.random()<.7?0:1,g:.03});}
  if(!fxRun){fxRun=true;requestAnimationFrame(fxLoop);}
}
function fxLoop(){
  fxx.clearRect(0,0,innerWidth,innerHeight);
  parts=parts.filter(p=>p.life>0&&p.y<innerHeight+40);
  for(const p of parts){p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.vx*=.992;p.rot+=p.vr;p.life-=p.dec;
    fxx.save();fxx.globalAlpha=clamp(p.life*1.6);fxx.translate(p.x,p.y);fxx.rotate(p.rot);fxx.fillStyle=p.c;
    if(p.s===0){starPath(fxx,0,0,p.r);fxx.shadowColor=p.c;fxx.shadowBlur=10;fxx.fill();}
    else{fxx.beginPath();fxx.ellipse(0,0,p.r*.9,p.r*.4,0,0,7);fxx.fill();}
    fxx.restore();}
  if(parts.length)requestAnimationFrame(fxLoop);else fxRun=false;
}

/* ================= GÖKYÜZÜ ================= */
let skyT=.1;
const orb=$('#orb'),orbSun=orb.querySelector('.sun'),orbMoon=orb.querySelector('.moon');
function setSky(t){
  skyT=t;const c=ART.skyAt(t),s=ART.sOf(t),ink='#10163a',st=root.style;
  st.setProperty('--sky-top',c.top);st.setProperty('--sky-mid',c.mid);st.setProperty('--sky-bot',c.bot);
  st.setProperty('--sk-far',mix(c.bot,ink,.3));st.setProperty('--sk-mid',mix(c.bot,ink,.52));st.setProperty('--sk-near',mix(c.bot,ink,.74));
  st.setProperty('--star',c.night.toFixed(3));st.setProperty('--win',clamp(c.night*1.25).toFixed(3));
  st.setProperty('--cloud',mix('#ffffff',c.mid,.15+.7*c.night));st.setProperty('--cloud-o',(.62-.35*c.night).toFixed(2));
  orb.style.left=(50+44*Math.cos(Math.PI*s))+'%';orb.style.top=(78-62*Math.sin(Math.PI*s))+'%';
  orbSun.style.opacity=(1-c.night).toFixed(3);orbMoon.style.opacity=c.night.toFixed(3);
  document.body.classList.toggle('night',c.night>.5);
  document.querySelector('meta[name=theme-color]').content=c.top;
}
let skyTok=0;
function tweenSky(to,ms){const from=skyT,tok=++skyTok;return anim(ms||1200,(e)=>{if(tok===skyTok)setSky(from+(to-from)*e);});}
(function buildSky(){
  const S=$('#stars');for(let i=0;i<90;i++){const s=el('i');const z=1+Math.random()*2.6;s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${z}px;height:${z}px;animation-delay:${Math.random()*3}s;animation-duration:${2+Math.random()*3}s`;S.appendChild(s);}
  const C=$('#clouds');[[18,26,'34vw',70],[42,8,'24vw',95],[10,60,'30vw',120],[58,34,'20vw',80],[30,70,'26vw',105]].forEach((c,i)=>{const d=el('div','cloud','<svg viewBox="0 0 200 68"><path d="M30 62a24 24 0 0 1 4-48 34 34 0 0 1 64-6 30 30 0 0 1 52 12 26 26 0 0 1 20 42z"/></svg>');d.style.cssText=`top:${c[0]}%;--w:${c[2]};--d:${c[3]}s;--dl:-${c[1]*3+i*11}s`;C.appendChild(d);});
  /* silüet: tepeler + evler + camii + selvi */
  let r=7;const rnd=()=>{r=(r*16807)%2147483647;return r/2147483647;};
  let far='M0 320V215',mid='',near='',wins='';
  for(let x=0;x<=1600;x+=100)far+=`Q${x+50} ${150+rnd()*60} ${x+100} ${205+rnd()*25}`;far+='V320Z';
  for(let x=-10;x<1600;){const w=60+rnd()*60,h=70+rnd()*80,y=320-h;
    mid+=rnd()<.5?`M${x} 320V${y}H${x+w}V320Z`:`M${x} 320V${y+18}L${x+w/2} ${y-8}L${x+w} ${y+18}V320Z`;
    for(let wy=y+28;wy<300;wy+=34)for(let wx=x+12;wx<x+w-14;wx+=24)if(rnd()<.55)wins+=`<rect class="w" x="${wx}" y="${wy}" width="9" height="13" rx="2"/>`;
    x+=w+4+rnd()*10;}
  const mx=1180;/* camii kümesi */
  near+=`M${mx-150} 320V250H${mx+130}V320Z`;
  near+=`M${mx-120} 250a70 70 0 0 1 140 0Z M${mx-95} 250a45 45 0 0 1 90 0Z`;
  near+=`M${mx-120} 250a40 40 0 0 1 0 -80a40 40 0 0 1 0 80Z`.replace(/./g,m=>m);
  near+=`M${mx-62} 160a8 8 0 1 1 8 8M${mx-68} 170h16V145l-8 -22z`;
  near+=`M${mx+148} 320V120l8 -26 8 26V320Z M${mx+142} 170h28v10h-28Z M${mx-168} 320V140l8 -24 8 24V320Z M${mx-174} 190h28v10h-28Z`;
  for(let x=20;x<1600;x+=240+rnd()*120){if(Math.abs(x-mx)<260)continue;near+=`M${x} 320c-16 -30 -16 -80 0 -120c16 40 16 90 0 120Z`;}
  for(let x=60;x<1600;x+=300+rnd()*160){if(Math.abs(x-mx)<260)continue;const w=80+rnd()*40,h=60+rnd()*40;near+=`M${x} 320V${320-h}H${x+w}V320Z`;wins+=`<rect class="w" x="${x+14}" y="${320-h+14}" width="10" height="14" rx="2"/><rect class="w" x="${x+w-26}" y="${320-h+14}" width="10" height="14" rx="2"/>`;}
  wins+=`<rect class="w" x="${mx-80}" y="${275}" width="14" height="22" rx="7"/><rect class="w" x="${mx-20}" y="${275}" width="14" height="22" rx="7"/>`;
  $('#skyline').innerHTML=`<path class="far" d="${far}"/><path class="mid" d="${mid}"/>${wins}<path class="near" d="${near}"/>`;
})();

/* ================= AMBILIGHT ================= */
const ambi=$('#ambi'),actx=ambi.getContext('2d');
(function loop(){if(video.readyState>=2&&!video.paused){try{actx.drawImage(video,0,0,64,36);}catch(e){}}requestAnimationFrame(loop);})();

/* ================= VİDEO ================= */
const tap=$('#tap');
function tryStart(){tap.classList.remove('show');try{const p=video.play();if(p&&p.catch)p.catch(()=>tap.classList.add('show'));}catch(e){tap.classList.add('show');}}
tap.addEventListener('click',e=>{e.stopPropagation();tryStart();});
function playClip(file){
  return new Promise(resolve=>{
    let done=false;tap.classList.remove('show');
    const fin=()=>{if(done)return;done=true;['ended','error'].forEach(n=>video.removeEventListener(n,fin));video.removeEventListener('canplay',tryStart);tap.classList.remove('show');resolve();};
    video.playsInline=true;video.setAttribute('playsinline','');
    video.addEventListener('ended',fin);video.addEventListener('error',fin);video.addEventListener('canplay',tryStart);
    video.src=DIR+file;try{video.load();}catch(e){}tryStart();
    setTimeout(()=>{if(!tap.classList.contains('show'))fin();},30000);
  });
}
function showCap(q){cap.querySelector('.cq').textContent=q.prompt;cap.querySelector('.ca').textContent=q.options[q.correct];cap.classList.add('show');}
const hideCap=()=>cap.classList.remove('show');

/* ================= İLERLEME ŞERİDİ ================= */
const results=new Array(N).fill(null);
function buildTrack(box){
  box.innerHTML='';
  for(let i=0;i<N;i++){
    if(i)box.appendChild(el('div','link'));
    const m=el('div','med','<img alt="" src="'+(SC.posters[i]||'')+'"><span class="star">★</span>');box.appendChild(m);
  }
}
function updateTrack(){
  [$('#track'),$('#track2')].forEach(box=>{
    [...box.querySelectorAll('.med')].forEach((m,i)=>{
      m.classList.toggle('cur',i===idx&&!finished);
      m.classList.toggle('done',results[i]!==null);
      m.classList.toggle('good',results[i]===true);
    });
    [...box.querySelectorAll('.link')].forEach((l,i)=>l.classList.toggle('on',results[i]!==null));
  });
}

/* ================= ETKİLEŞİMLER ================= */
function shuffledIdx(q){const a=q.options.map((_,i)=>i);for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];}return a;}

/* kart / bina karoları — 1 ve 2 kişi için ortak */
function buildTiles(q,sc,onPick,opt){
  const box=el('div','tiles');
  const tiles={};
  shuffledIdx(q).forEach(i=>{
    const o=(sc&&sc.opts&&sc.opts[i])||{};
    const b=el('button','tile');b.type='button';b.dataset.i=i;
    b.innerHTML=ART.iconFor(o.icon||(o.t!=null?'time':''),o)+'<span class="txt"></span>';
    b.querySelector('.txt').textContent=q.options[i];
    b.addEventListener('click',()=>{sfx.tap();onPick(i,b);});
    box.appendChild(b);tiles[i]=b;
  });
  let host=box;
  if(opt&&opt.street){host=el('div','street');host.appendChild(box);}
  return {el:host,tiles,lock(){Object.values(tiles).forEach(t=>t.disabled=true);}};
}

/* güneşi gün yayında sürükle */
function buildDial(q,sc,onPick){
  const W=900,H=420,CX=450,CY=370,R=250,DOCK={x:450,y:336};
  const pt=(s,r)=>({x:CX+r*Math.cos(Math.PI*s),y:CY-r*Math.sin(Math.PI*s)});
  const box=el('div','dial');
  box.innerHTML=`<svg viewBox="0 0 ${W} ${H}"><path class="arc2" d="M${CX+R} ${CY}A${R} ${R} 0 0 0 ${CX-R} ${CY}"/><path class="arc" d="M${CX+R} ${CY}A${R} ${R} 0 0 0 ${CX-R} ${CY}"/><line class="horizon" x1="0" y1="${CY}" x2="${W}" y2="${CY}"/></svg><div class="dock"></div>`;
  const pc=(x,y)=>`left:${(x/W*100).toFixed(2)}%;top:${(y/H*100).toFixed(2)}%`;
  const mk=[],chips=[],mp=[];
  q.options.forEach((txt,i)=>{
    const t=sc.opts[i].t,s=ART.sOf(t),p=pt(s,R),cp=pt(s,R+84);
    mp[i]={x:p.x,y:p.y,t};
    const m=el('div','mk');m.style.cssText=pc(p.x,p.y);box.appendChild(m);mk[i]=m;
    const c=el('button','chip');c.type='button';c.textContent=txt;
    const cx=clamp(cp.x/W*100,19,81);c.style.cssText=`left:${cx}%;top:${(cp.y/H*100).toFixed(2)}%`;
    c.addEventListener('click',()=>{if(!locked)snap(i);});
    box.appendChild(c);chips[i]=c;
  });
  const tk=el('div','tk','<div class="tsun"></div><div class="tmoon"></div><div class="hint">↑</div>');box.appendChild(tk);
  let pos={...DOCK},locked=false,dragging=false,lastHot=-1;
  const setTk=(x,y)=>{pos={x,y};tk.style.left=(x/W*100)+'%';tk.style.top=(y/H*100)+'%';};
  const toSvg=ev=>{const r=box.getBoundingClientRect();return{x:clamp((ev.clientX-r.left)/r.width*W,0,W),y:clamp((ev.clientY-r.top)/r.height*H,0,H)};};
  const near=()=>{let b=-1,d=1e9;mp.forEach((m,i)=>{const dd=Math.hypot(m.x-pos.x,m.y-pos.y);if(dd<d){d=dd;b=i;}});return{i:b,d};};
  function hot(i){if(i===lastHot)return;lastHot=i;chips.forEach((c,k)=>c.classList.toggle('hot',k===i));mk.forEach((m,k)=>m.classList.toggle('hot',k===i));if(i>=0)sfx.tick();}
  function skyFrom(x,y){const dx=x-CX,dy=CY-y,r=Math.hypot(dx,dy);if(dy>8&&r>100){const s=clamp(Math.atan2(dy,dx)/Math.PI);setSky(.04+.92*s);}}
  tk.addEventListener('pointerdown',ev=>{if(locked)return;dragging=true;tk.classList.add('drag');tk.querySelector('.hint').style.display='none';try{tk.setPointerCapture(ev.pointerId);}catch(e){}ev.preventDefault();sfx.tap();});
  tk.addEventListener('pointermove',ev=>{if(!dragging||locked)return;const p=toSvg(ev);setTk(p.x,p.y);skyFrom(p.x,p.y);const n=near();hot(n.d<95?n.i:-1);});
  const end=()=>{if(!dragging)return;dragging=false;tk.classList.remove('drag');const n=near();if(n.d<110){snap(n.i);}else{hot(-1);home();}};
  tk.addEventListener('pointerup',end);tk.addEventListener('pointercancel',end);
  async function home(){const from={...pos},t0=skyT;tweenSky(sc.story,700);await anim(550,e=>setTk(from.x+(DOCK.x-from.x)*e,from.y+(DOCK.y-from.y)*e),ease.out);tk.querySelector('.hint').style.display='';}
  async function snap(i){
    if(locked)return;locked=true;hot(i);const from={...pos},to=mp[i];
    tweenSky(to.t,520);await anim(520,e=>setTk(from.x+(to.x-from.x)*e,from.y+(to.y-from.y)*e),ease.out);
    const r=tk.getBoundingClientRect();onPick(i,{x:r.left+r.width/2,y:r.top+r.height/2});
  }
  return {el:box,lock(){locked=true;},
    async reveal(chosen,correct){
      chips.forEach((c,i)=>{if(i===chosen)c.classList.add(chosen===correct?'ok':'bad');else if(i!==correct)c.classList.add('dim');});
      hot(-1);
      if(chosen!==correct){await sleep(500);const from={...pos},to=mp[correct];tweenSky(to.t,800);await anim(800,e=>setTk(from.x+(to.x-from.x)*e,from.y+(to.y-from.y)*e),ease.io);}
      chips[correct].classList.remove('dim','bad');chips[correct].classList.add('ok');mk[correct].classList.add('ok');
    }};
}

/* ================= OYUN (1 KİŞİ) ================= */
let mode=1,idx=0,busy=false,finished=false,correctCount=0;
const widgetBox=$('#widget'),promptEl=$('#prompt'),fb=$('#feedback');
const setPhase=p=>{stage.className=p+(mode===2?' duo':'');};
let curWidget=null;

async function runQuestion(){
  if(idx>=N){finishSolo();return;}
  busy=true;finished=false;hideCap();replayBtn0.classList.remove('on');
  setPhase('watch');promptEl.textContent='';widgetBox.innerHTML='';fb.className='feedback';
  updateTrack();sfx.whoosh();
  const q=ACT.questions[idx],sc=SC.q[idx]||{};
  tweenSky(sc.story??.5,1500);
  await playClip(q.watch);
  showQuestion(q,sc);
}
function showQuestion(q,sc){
  promptEl.textContent=q.prompt;
  let type=sc.type||'cards';
  if(type==='dial'&&innerWidth/innerHeight<.95)type='cards';
  const pick=(i,origin)=>chooseSolo(i,origin);
  if(type==='dial')curWidget=buildDial(q,sc,pick);
  else curWidget=buildTiles(q,sc,(i,b)=>{const r=b.getBoundingClientRect();chooseSolo(i,{x:r.left+r.width/2,y:r.top+r.height/2});},{street:type==='town'});
  curWidget.type=type;
  widgetBox.innerHTML='';widgetBox.appendChild(curWidget.el);
  setPhase('ask');replayBtn0.classList.add('on');busy=false;
}
replayBtn0.addEventListener('click',()=>{if(busy||mode!==1)return;sfx.tap();playClip(ACT.questions[idx].watch);});

async function chooseSolo(i,origin){
  if(busy)return;busy=true;
  const q=ACT.questions[idx],ok=i===q.correct;
  curWidget.lock&&curWidget.lock();
  replayBtn0.classList.remove('on');
  if(curWidget.tiles){
    Object.entries(curWidget.tiles).forEach(([k,t])=>{t.disabled=true;if(+k===i)t.classList.add(ok?'ok':'bad');else t.classList.add('dim');});
    if(!ok)setTimeout(()=>{const t=curWidget.tiles[q.correct];t.classList.remove('dim');t.classList.add('ok');},550);
  }else curWidget.reveal(i,q.correct);
  results[idx]=ok;updateTrack();
  if(ok){correctCount++;sfx.good();buzz(40);burst(origin.x,origin.y,46,10);fb.textContent='أَحْسَنْت';fb.className='feedback show';
         setTimeout(()=>sfx.star(),450);}
  else{sfx.bad();buzz([30,60,30]);}
  await sleep(ok?1500:2300);
  fb.className='feedback';
  setPhase('watch');showCap(q);
  await sleep(450);
  await playClip(q.answer||q.watch);
  await sleep(700);hideCap();
  idx++;await sleep(250);runQuestion();
}

function finishSolo(){
  finished=true;updateTrack();
  stage.style.visibility='hidden';document.body.classList.add('is-finished');$('#hud').style.visibility='hidden';
  tweenSky(.97,2200);
  const meds=$('#endMeds');meds.innerHTML='';
  for(let i=0;i<N;i++){const m=el('div','med '+(results[i]?'good done':'done'),'<img alt="" src="'+SC.posters[i]+'"><span class="star">★</span>');meds.appendChild(m);setTimeout(()=>{if(results[i])sfx.star();},400+i*260);}
  $('#finalScore').textContent=toAr(correctCount)+' / '+toAr(N);
  const pct=correctCount/N;
  $('#endMsg').textContent=pct===1?'مُمْتاز، ما شاءَ الله.':pct>=.75?'جَيِّد جِدًّا.':pct>=.5?'جَيِّد، حاوِلْ مَرَّةً أُخْرى.':'تَدَرَّبْ ثُمَّ أَعِدْ.';
  $('#filmLbl').textContent=ACT.title;
  $('#endScreen').classList.add('show');
  if(pct===1){sfx.fan();rain(120);setTimeout(()=>rain(80),1400);}else if(pct>=.5){sfx.good();rain(40);}
  if(window.EbaScorm)window.EbaScorm.complete(Math.round(pct*100));
}

/* bütün günü film olarak izle */
async function playFilm(){
  $('#endScreen').classList.remove('show');document.body.classList.remove('is-finished');
  stage.style.visibility='';$('#hud').style.visibility='';
  mode=1;finished=false;const keep=results.slice();
  setPhase('film');
  for(let i=0;i<N;i++){
    const q=ACT.questions[i];idx=i;updateTrack();
    tweenSky(SC.q[i].story,1400);showCap(q);sfx.whoosh();
    await playClip(q.answer||q.watch);await sleep(500);hideCap();
  }
  finished=true;updateTrack();idx=N;
  await sleep(300);
  stage.style.visibility='hidden';document.body.classList.add('is-finished');$('#hud').style.visibility='hidden';
  tweenSky(.97,1800);$('#endScreen').classList.add('show');
}

/* ================= OYUN (2 KİŞİ) ================= */
let P=[{wins:0,correct:0},{wins:0,correct:0}],ans=[null,null],firstCorrect=null;
const pillA=$('#pillA'),pillB=$('#pillB'),optsA=$('#optsA'),optsB=$('#optsB'),duelPrompt=$('#duelPrompt');
function renderDuo(){pillA.textContent='⚡'+toAr(P[0].wins)+' · ✓'+toAr(P[0].correct);pillB.textContent='⚡'+toAr(P[1].wins)+' · ✓'+toAr(P[1].correct);}
async function runRound2P(){
  if(idx>=N){finishDuo();return;}
  busy=true;hideCap();setPhase('watch');ans=[null,null];firstCorrect=null;optsA.innerHTML='';optsB.innerHTML='';duelPrompt.textContent='';
  updateTrack();sfx.whoosh();
  const q=ACT.questions[idx],sc=SC.q[idx]||{};
  tweenSky(sc.story??.5,1500);
  await playClip(q.watch);
  duelPrompt.textContent=q.prompt;
  [[optsA,0],[optsB,1]].forEach(([box,pl])=>{
    const w=buildTiles(q,sc,(i,b)=>choose2P(pl,i,b,w),{});
    box.appendChild(w.el);
  });
  setPhase('ask');busy=false;
}
function choose2P(pl,i,btn,w){
  if(ans[pl]!==null)return;const q=ACT.questions[idx],ok=i===q.correct;ans[pl]={ok};
  w.lock();const r=btn.getBoundingClientRect();
  if(ok){btn.classList.add('ok');P[pl].correct++;sfx.good();burst(r.left+r.width/2,r.top+r.height/2,30,8);if(firstCorrect===null){firstCorrect=pl;P[pl].wins++;}}
  else{btn.classList.add('bad');sfx.bad();}
  Object.entries(w.tiles).forEach(([k,t])=>{if(t!==btn)t.classList.add('dim');});
  renderDuo();maybeResolve2P();
}
async function maybeResolve2P(){
  if(!ans[0]||!ans[1])return;busy=true;const q=ACT.questions[idx];
  [optsA,optsB].forEach(c=>c.querySelectorAll('.tile').forEach(t=>{if(+t.dataset.i===q.correct){t.classList.remove('dim','bad');t.classList.add('ok');}}));
  results[idx]=true;updateTrack();
  await sleep(1500);setPhase('watch');showCap(q);await sleep(450);
  await playClip(q.answer||q.watch);await sleep(700);hideCap();
  idx++;await sleep(250);runRound2P();
}
function finishDuo(){
  finished=true;updateTrack();stage.style.visibility='hidden';document.body.classList.add('is-finished');$('#hud').style.visibility='hidden';
  tweenSky(.97,2000);
  $('#end2P1').innerHTML='<b>👤 اللّاعِب ١</b><br>⚡ '+toAr(P[0].wins)+' &nbsp; ✓ '+toAr(P[0].correct);
  $('#end2P2').innerHTML='<b>👤 اللّاعِب ٢</b><br>⚡ '+toAr(P[1].wins)+' &nbsp; ✓ '+toAr(P[1].correct);
  const a=P[0],b=P[1];let w1=false,w2=false,msg;
  if(a.wins>b.wins){w1=true;msg='فازَ اللّاعِب ١. 🏆';}else if(b.wins>a.wins){w2=true;msg='فازَ اللّاعِب ٢. 🏆';}
  else if(a.correct>b.correct){w1=true;msg='فازَ اللّاعِب ١. 🏆';}else if(b.correct>a.correct){w2=true;msg='فازَ اللّاعِب ٢. 🏆';}else msg='تَعادُل 🤝';
  $('#end2Win').textContent=msg;$('#end2P1').classList.toggle('win',w1);$('#end2P2').classList.toggle('win',w2);
  $('#endScreen2').classList.add('show');sfx.fan();rain(90);
  if(window.EbaScorm)window.EbaScorm.complete(Math.round(Math.max(a.correct,b.correct)/N*100));
}

/* ================= BAŞLAT / DÜĞMELER ================= */
function start(m){
  ac();sfx.tap();mode=m;idx=0;correctCount=0;finished=false;results.fill(null);P=[{wins:0,correct:0},{wins:0,correct:0}];
  $('#startScreen').classList.remove('show');['#endScreen','#endScreen2'].forEach(s=>$(s).classList.remove('show'));
  stage.style.visibility='';$('#hud').style.visibility='';document.body.classList.remove('is-finished');
  $('#hudSolo').style.display=m===1?'flex':'none';$('#hudDuo').style.display=m===2?'flex':'none';
  buildTrack($('#track'));buildTrack($('#track2'));renderDuo();
  m===1?runQuestion():runRound2P();
}
function toStart(){
  ['#endScreen','#endScreen2'].forEach(s=>$(s).classList.remove('show'));stage.style.visibility='hidden';
  $('#hud').style.visibility='hidden';document.body.classList.add('is-finished');
  $('#startScreen').classList.add('show');setSky(.0);tweenSky(.16,6000);
}
$('#btnSolo').addEventListener('click',()=>start(1));
$('#btnDuo').addEventListener('click',()=>start(2));
$('#replayBtn').addEventListener('click',()=>{ac();sfx.tap();toStart();});
$('#replayBtn2').addEventListener('click',()=>{ac();sfx.tap();toStart();});
$('#filmBtn').addEventListener('click',()=>{ac();sfx.tap();playFilm();});

/* açılış */
document.body.dataset.unit=String(ACT.unit||'');document.title=ACT.title||document.title;
$('#startTitle').textContent=ACT.title||'';$('#startSub').textContent=ACT.subtitle||'';
(function(){const P=$('#polaroids'),rot=[-7,4,-2,6,-5],y=[6,-8,10,-6,8];SC.posters.forEach((p,i)=>{const d=el('div','pola','<img alt="" src="'+p+'">');d.style.cssText=`--r:${rot[i%5]}deg;--y:${y[i%5]}px;--dl:${.15+i*.12}s`;P.appendChild(d);});})();
stage.style.visibility='hidden';$('#hud').style.visibility='hidden';document.body.classList.add('is-finished');
setSky(0);tweenSky(.16,7000);
})();
