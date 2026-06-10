/* ===== EBA Etkileşim motoru — kesilmiş klip modeli =====
   Her soru iki kısa klip: watch (izle) + answer (cevabı duy).
   watch klipleri fiziksel olarak sessiz kesildi (yiyecek/saat → isim/saat ele verilmez);
   market klipleri sesli (önce dinle, sonra hatırla).
   src değiştirilerek baştan sona oynatılır → ATLAMA YOK, donma yok, her yerde çalışır.
   Akış: watch oynar → biter → Arapça şıklar (videonun ALTINDA, video görünür kalır) →
         seç → doğru/yanlış → answer oynar (cevabı videodan duyar) → sonraki → skor.
*/
(function(){
'use strict';

const ARABIC_DIGITS=['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
const toAr=n=>String(n).split('').map(c=>ARABIC_DIGITS[+c]??c).join('');
const DIR='vid/clips/';

const params=new URLSearchParams(location.search);
const ACT=(window.ACTIVITIES||[]).find(a=>a.id===params.get('id'))||(window.ACTIVITIES||[])[0];

const $=s=>document.querySelector(s);
const video=$('#vid'), startScreen=$('#startScreen'), startTitle=$('#startTitle'),
  startSub=$('#startSub'), startBtn=$('#startBtn'),
  qPanel=$('#qPanel'), qPrompt=$('#qPrompt'), qOpts=$('#qOpts'), qFeedback=$('#qFeedback'),
  endScreen=$('#endScreen'), finalScore=$('#finalScore'), endMsg=$('#endMsg'), replayBtn=$('#replayBtn'),
  dotsEl=$('#dots'), curIdxEl=$('#curIdx'), totEl=$('#totIdx');

let idx=0, correctCount=0, busy=false;

function setup(){
  if(!ACT){ startTitle.textContent='لا يوجَد نَشاط'; return; }
  document.title=ACT.title||'نَشاط';
  startTitle.textContent=ACT.title||'';
  startSub.textContent=ACT.subtitle||'';
  const n=ACT.questions.length;
  totEl.textContent=toAr(n);
  dotsEl.innerHTML='';
  for(let i=0;i<n;i++){ const d=document.createElement('span'); d.className='dot'+(i===0?' active':''); dotsEl.appendChild(d); }
}
function updateHud(){
  curIdxEl.textContent=toAr(Math.min(idx+1,ACT.questions.length));
  [...dotsEl.children].forEach((d,i)=>d.classList.toggle('active',i===idx));
}
function markDot(i,ok){ const d=dotsEl.children[i]; if(d){ d.classList.remove('active'); d.classList.add(ok?'ok':'bad'); } }

/* Sesli anlatım — tek <audio> öğesi, temiz TTS klipleri (soru + cevap).
   s022/s156'da kaynak video sesi HİÇ kullanılmaz → çıngırak/bip yok.
   Sentetik bip/ding de kaldırıldı; geri bildirim görsel (yeşil/kırmızı) + TTS cevap. */
const voice=new Audio();
function playVoice(file){           // file yoksa hemen çözer; varsa bitince çözer
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

/* Klip oynat: src değiştir, HAZIR olunca (canplay) baştan sona oynat, 'ended'de çöz.
   Atlama yok. Erken play() boşa gidebildiği için oynatmayı canplay'e bağlıyoruz. */
function playClip(file){
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
    setTimeout(finish,20000); // güvenlik backstop (klipler ≤8sn)
  });
}

function shuffled(q){
  const arr=q.options.map((t,i)=>({t,ok:i===q.correct}));
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}

async function start(){
  idx=0; correctCount=0;
  [...dotsEl.children].forEach(d=>d.classList.remove('ok','bad','active'));
  startScreen.classList.add('hide');
  endScreen.classList.remove('show');
  runQuestion();
}

async function runQuestion(){
  if(idx>=ACT.questions.length){ finish(); return; }
  busy=true;
  qPanel.classList.remove('show');
  qFeedback.className='feedback'; qFeedback.textContent='';
  qOpts.innerHTML=''; qPrompt.textContent='';
  updateHud();
  const q=ACT.questions[idx];
  const watching=playClip(q.watch);   // sessiz görsel
  playVoice(ACT.ask);                 // üstüne sesli soru ("ما هذا؟" / "كَم السّاعَة الآن؟")
  await watching;
  showOptions(q);
}

function showOptions(q){
  busy=false;
  qPrompt.textContent=q.prompt||'';
  qOpts.innerHTML='';
  shuffled(q).forEach(o=>{
    const b=document.createElement('button');
    b.className='opt-btn'; b.textContent=o.t;
    b.onclick=()=>choose(o.ok,b);
    qOpts.appendChild(b);
  });
  qPanel.classList.add('show');
}

async function choose(isCorrect,btn){
  if(busy)return; busy=true;
  const q=ACT.questions[idx];
  qOpts.querySelectorAll('.opt-btn').forEach(b=>b.disabled=true);
  if(isCorrect){
    btn.classList.add('correct'); correctCount++;
    qFeedback.textContent='أَحْسَنْتَ'; qFeedback.className='feedback show ok';
  } else {
    btn.classList.add('wrong');
    qOpts.querySelectorAll('.opt-btn').forEach(b=>{ if(b.textContent===q.options[q.correct]) b.classList.add('correct'); });
    qFeedback.textContent='الإِجابَة الصَّحيحَة'; qFeedback.className='feedback show bad';
  }
  markDot(idx,isCorrect);
  await new Promise(r=>setTimeout(r,650));
  if(q.say) await playVoice(q.say);            // temiz TTS cevap (video son karede donuk kalır)
  else if(q.answer) await playClip(q.answer);  // s070: özgün diyalog cevabı (videodan)
  else await new Promise(r=>setTimeout(r,500));
  idx++;
  setTimeout(runQuestion,250);
}

function finish(){
  qPanel.classList.remove('show');
  const n=ACT.questions.length;
  finalScore.textContent=toAr(correctCount)+' / '+toAr(n);
  const pct=correctCount/n;
  endMsg.textContent= pct===1?'مُمْتاز! ما شاءَ اللَّه'
    : pct>=.75?'جَيِّد جِدًّا'
    : pct>=.5 ?'جَيِّد، حاوِلْ مَرَّةً أُخْرى'
    : 'تَدَرَّبْ ثُمَّ أَعِدْ';
  endScreen.classList.add('show');
}

startBtn.addEventListener('click',start);
replayBtn.addEventListener('click',()=>{ endScreen.classList.remove('show'); startScreen.classList.remove('hide'); });

if(ACT) setup();
})();
