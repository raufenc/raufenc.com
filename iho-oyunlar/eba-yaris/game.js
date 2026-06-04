/* ===== EBA Yarış motoru — tek kişilik etkinlik + iki kişilik hız yarışı =====
   1 KİŞİ: orijinal eba-etkilesim akışı birebir → izle (sessiz watch) → cevapla → cevabı videodan duy.
   2 KİŞİ: paylaşımlı video üstte; altta iki ayrı yarış şeridi.
     • Her oyuncunun şıkları BAĞIMSIZ karışır → kopyalama zorlaşır, kelimeyi gerçekten tanıması gerekir.
     • İlk doğru işaretleyen turu kazanır (⚡), AMA rakibin paneli KİLİTLENMEZ:
       o da seçer; tur bitince iki tarafta da doğru yeşil gösterilir; cevap videodan sesli duyulur.
     • Skor: ⚡ = hız galibiyeti (tur), ✓ = kişisel doğru sayısı (öğrenme). Öğreticilik önde.
   Klipler/ses tek kaynaktan: ../eba-etkilesim/vid/clips/  (kopya yok, src değişerek baştan sona oynar → atlama/donma yok). */
(function(){
'use strict';

const ARABIC_DIGITS=['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
const toAr=n=>String(n).split('').map(c=>ARABIC_DIGITS[+c]??c).join('');
const DIR='../eba-etkilesim/vid/clips/';

const params=new URLSearchParams(location.search);
const ACT=(window.ACTIVITIES||[]).find(a=>a.id===params.get('id'))||(window.ACTIVITIES||[])[0];

const $=s=>document.querySelector(s);
const video=$('#vid'),
  startScreen=$('#startScreen'), startTitle=$('#startTitle'), startSub=$('#startSub'),
  btnSolo=$('#btnSolo'), btnDuo=$('#btnDuo'),
  /* 1 kişi */
  qPanel=$('#qPanel'), qPrompt=$('#qPrompt'), qOpts=$('#qOpts'), qFeedback=$('#qFeedback'),
  endScreen=$('#endScreen'), finalScore=$('#finalScore'), endMsg=$('#endMsg'), replayBtn=$('#replayBtn'),
  /* 2 kişi */
  duel=$('#duel'), duelPrompt=$('#duelPrompt'), optsA=$('#optsA'), optsB=$('#optsB'),
  flashA=$('#flashA'), flashB=$('#flashB'),
  endScreen2=$('#endScreen2'), end2Win=$('#end2Win'), end2P1=$('#end2P1'), end2P2=$('#end2P2'), replayBtn2=$('#replayBtn2'),
  /* HUD */
  hudSolo=$('#hudSolo'), hudDuo=$('#hudDuo'),
  dotsEl=$('#dots'), curIdxEl=$('#curIdx'), totEl=$('#totIdx'),
  pillA=$('#pillA'), pillB=$('#pillB'), curIdx2El=$('#curIdx2'), tot2El=$('#totIdx2');

let mode=1, idx=0, busy=false;
let correctCount=0;                              /* 1 kişi skoru */
let P=[{wins:0,correct:0},{wins:0,correct:0}];   /* 2 kişi skoru */
let ans=[null,null], firstCorrect=null;          /* tur durumu (2 kişi) */

function setup(){
  if(!ACT){ startTitle.textContent='لا يوجد نشاط'; return; }
  document.title=ACT.title||'نشاط';
  startTitle.textContent=ACT.title||'';
  startSub.textContent=ACT.subtitle||'';
}

/* ---------- Paylaşılan medya yardımcıları (orijinalle aynı davranış) ---------- */
const voice=new Audio();
function playVoice(file){            /* file yoksa hemen çözer; varsa bitince çözer */
  return new Promise(res=>{
    if(!file){ res(); return; }
    let done=false;
    const fin=()=>{ if(done)return; done=true; voice.removeEventListener('ended',fin); voice.removeEventListener('error',fin); res(); };
    voice.addEventListener('ended',fin); voice.addEventListener('error',fin);
    try{ voice.src=DIR+file; voice.currentTime=0; const p=voice.play(); if(p&&p.catch)p.catch(()=>{}); }
    catch(e){ fin(); return; }
    setTimeout(fin,9000);
  });
}
function playClip(file){            /* src değiştir → canplay'de baştan sona oynat → ended'de çöz (atlama yok) */
  return new Promise(resolve=>{
    let done=false;
    const tryPlay=()=>{ const p=video.play(); if(p&&p.catch)p.catch(()=>{}); };
    const finish=()=>{ if(done)return; done=true;
      video.removeEventListener('ended',finish);
      video.removeEventListener('error',finish);
      video.removeEventListener('canplay',tryPlay);
      resolve(); };
    video.addEventListener('ended',finish);
    video.addEventListener('error',finish);
    video.addEventListener('canplay',tryPlay);
    video.src=DIR+file;
    if(video.readyState>=3) tryPlay();
    setTimeout(finish,20000);       /* güvenlik backstop (klipler ≤8sn) */
  });
}
function shuffled(q){
  const arr=q.options.map((t,i)=>({t,ok:i===q.correct}));
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}

/* ======================= BAŞLAT ======================= */
function start(m){
  mode=m; idx=0; correctCount=0;
  P=[{wins:0,correct:0},{wins:0,correct:0}];
  startScreen.classList.add('hide');
  endScreen.classList.remove('show');
  endScreen2.classList.remove('show');
  document.body.classList.toggle('duo', mode===2);
  if(mode===1){ hudSolo.style.display='flex'; hudDuo.style.display='none'; setupSoloHud(); runQuestion(); }
  else        { hudSolo.style.display='none'; hudDuo.style.display='flex'; setupDuoHud(); runRound2P(); }
}

/* ======================= 1 KİŞİ (orijinal akış) ======================= */
function setupSoloHud(){
  const n=ACT.questions.length; totEl.textContent=toAr(n);
  dotsEl.innerHTML='';
  for(let i=0;i<n;i++){ const d=document.createElement('span'); d.className='dot'+(i===0?' active':''); dotsEl.appendChild(d); }
}
function updateSoloHud(){
  curIdxEl.textContent=toAr(Math.min(idx+1,ACT.questions.length));
  [...dotsEl.children].forEach((d,i)=>d.classList.toggle('active',i===idx));
}
function markDot(i,ok){ const d=dotsEl.children[i]; if(d){ d.classList.remove('active'); d.classList.add(ok?'ok':'bad'); } }

async function runQuestion(){
  if(idx>=ACT.questions.length){ finishSolo(); return; }
  busy=true;
  qPanel.classList.remove('show');
  qFeedback.className='feedback'; qFeedback.textContent='';
  qOpts.innerHTML=''; qPrompt.textContent='';
  updateSoloHud();
  const q=ACT.questions[idx];
  const watching=playClip(q.watch);     /* sessiz görsel */
  playVoice(ACT.ask);                    /* üstüne sesli soru (varsa) */
  await watching;
  showOptionsSolo(q);
}
function showOptionsSolo(q){
  busy=false;
  qPrompt.textContent=q.prompt||'';
  qOpts.innerHTML='';
  shuffled(q).forEach(o=>{
    const b=document.createElement('button');
    b.className='opt-btn'; b.textContent=o.t;
    b.onclick=()=>chooseSolo(o.ok,b);
    qOpts.appendChild(b);
  });
  qPanel.classList.add('show');
}
async function chooseSolo(isCorrect,btn){
  if(busy)return; busy=true;
  const q=ACT.questions[idx];
  qOpts.querySelectorAll('.opt-btn').forEach(b=>b.disabled=true);
  if(isCorrect){
    btn.classList.add('correct'); correctCount++;
    qFeedback.textContent='أَحْسَنْتَ'; qFeedback.className='feedback show ok';
  } else {
    btn.classList.add('wrong');
    qOpts.querySelectorAll('.opt-btn').forEach(b=>{ if(b.textContent===q.options[q.correct]) b.classList.add('correct'); });
    qFeedback.textContent='الإِجابَةُ الصَّحيحَةُ'; qFeedback.className='feedback show bad';
  }
  markDot(idx,isCorrect);
  await new Promise(r=>setTimeout(r,650));
  if(q.say) await playVoice(q.say);
  else if(q.answer) await playClip(q.answer);
  else await new Promise(r=>setTimeout(r,500));
  idx++;
  setTimeout(runQuestion,250);
}
function finishSolo(){
  qPanel.classList.remove('show');
  const n=ACT.questions.length;
  finalScore.textContent=toAr(correctCount)+' / '+toAr(n);
  const pct=correctCount/n;
  endMsg.textContent= pct===1?'مُمْتاز! ما شاءَ اللَّه'
    : pct>=.75?'جَيِّدٌ جِدًّا'
    : pct>=.5 ?'جَيِّدٌ، حاوِلْ مَرَّةً أُخْرى'
    : 'تَدَرَّبْ ثُمَّ أَعِدْ';
  endScreen.classList.add('show');
}

/* ======================= 2 KİŞİ (hız yarışı) ======================= */
function setupDuoHud(){ tot2El.textContent=toAr(ACT.questions.length); renderDuoScores(); }
function renderDuoScores(){
  pillA.textContent='⚡'+toAr(P[0].wins)+' · ✓'+toAr(P[0].correct);
  pillB.textContent='⚡'+toAr(P[1].wins)+' · ✓'+toAr(P[1].correct);
}
function updateDuoHud(){ curIdx2El.textContent=toAr(Math.min(idx+1,ACT.questions.length)); }

async function runRound2P(){
  if(idx>=ACT.questions.length){ finishDuo(); return; }
  busy=true;
  duel.classList.remove('show');
  ans=[null,null]; firstCorrect=null;
  optsA.innerHTML=''; optsB.innerHTML=''; duelPrompt.textContent='';
  updateDuoHud();
  const q=ACT.questions[idx];
  const watching=playClip(q.watch);     /* paylaşımlı görsel — ikisi de izler */
  playVoice(ACT.ask);
  await watching;
  showDuel(q);
}
function buildLane(q,container,player){
  container.innerHTML='';
  shuffled(q).forEach(o=>{               /* her şerit BAĞIMSIZ karışır */
    const b=document.createElement('button');
    b.className='opt-btn'; b.textContent=o.t;
    b.onclick=()=>choose2P(player,o,b,container);
    container.appendChild(b);
  });
}
function showDuel(q){
  busy=false;
  duelPrompt.textContent=q.prompt||'';
  buildLane(q,optsA,0);
  buildLane(q,optsB,1);
  duel.classList.add('show');
}
function flashWin(player){
  const f=player===0?flashA:flashB;
  if(f){ f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
}
function choose2P(player,o,btn,container){
  if(ans[player])return;                 /* her oyuncu tek seçim */
  ans[player]={ok:o.ok};
  if(o.ok){
    btn.classList.add('correct');
    P[player].correct++;
    if(firstCorrect===null){             /* ilk doğru → tur galibiyeti */
      firstCorrect=player; P[player].wins++; flashWin(player);
    }
  } else {
    btn.classList.add('wrong');
  }
  container.querySelectorAll('.opt-btn').forEach(b=>b.disabled=true); /* SADECE bu oyuncunun şeridi kilitlenir */
  renderDuoScores();
  maybeResolve2P();
}
async function maybeResolve2P(){
  if(!ans[0]||!ans[1])return;            /* iki oyuncu da cevaplayınca tur biter */
  busy=true;
  const q=ACT.questions[idx];
  [optsA,optsB].forEach(c=>c.querySelectorAll('.opt-btn').forEach(b=>{   /* iki tarafta da doğruyu göster (öğreticilik) */
    if(b.textContent===q.options[q.correct]) b.classList.add('correct');
  }));
  await new Promise(r=>setTimeout(r,700));
  if(q.say) await playVoice(q.say);
  else if(q.answer) await playClip(q.answer);   /* cevabı videodan ikisi de duyar */
  else await new Promise(r=>setTimeout(r,500));
  idx++;
  setTimeout(runRound2P,250);
}
function finishDuo(){
  duel.classList.remove('show');
  end2P1.innerHTML='<b>👤 اللّاعِبُ ١</b><br>⚡ '+toAr(P[0].wins)+' &nbsp; ✓ '+toAr(P[0].correct);
  end2P2.innerHTML='<b>👤 اللّاعِبُ ٢</b><br>⚡ '+toAr(P[1].wins)+' &nbsp; ✓ '+toAr(P[1].correct);
  const a=P[0], b=P[1];
  let p1win=false, p2win=false, msg;
  if(a.wins>b.wins){ p1win=true; msg='فازَ اللّاعِبُ ١ 🏆'; }
  else if(b.wins>a.wins){ p2win=true; msg='فازَ اللّاعِبُ ٢ 🏆'; }
  else if(a.correct>b.correct){ p1win=true; msg='فازَ اللّاعِبُ ١ 🏆'; }   /* beraberlik → doğru sayısı */
  else if(b.correct>a.correct){ p2win=true; msg='فازَ اللّاعِبُ ٢ 🏆'; }
  else { msg='تَعادُل! 🤝'; }
  end2Win.textContent=msg;
  end2P1.classList.toggle('win',p1win);
  end2P2.classList.toggle('win',p2win);
  endScreen2.classList.add('show');
}

/* ---------- düğmeler ---------- */
btnSolo.addEventListener('click',()=>start(1));
btnDuo .addEventListener('click',()=>start(2));
replayBtn .addEventListener('click',()=>{ endScreen .classList.remove('show'); startScreen.classList.remove('hide'); });
replayBtn2.addEventListener('click',()=>{ endScreen2.classList.remove('show'); startScreen.classList.remove('hide'); });

if(ACT) setup();
})();
