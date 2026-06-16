/* ============================================================
   DOKUZ TİP MİZAÇ TESTİ — app.js
   Test akışı · puanlama · enneagram · sonuç · sohbet
   Erişilebilir (ARIA/odak/canlı bölge), XSS-güvenli, reduced-motion duyarlı.
   ============================================================ */
(function(){
'use strict';
var M = window.MIZAC;
var T = M.TIPLER, S = M.SORULAR, MERK = M.MERKEZLER, OK = M.OKLAR, KAN = M.KANATLAR, GL = M.GLYPH;

var RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
if(window.matchMedia){ try{ window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function(e){ RM=e.matches; }); }catch(e){} }

/* ── Durum ── */
var state = {
  len: 'dengeli', perType: 5, audience: 'self',
  sorular: [], idx: 0, answers: [], answerTimes: [],
  scores: null, primary: null, wing: null,
  locking: false, finishing: false, advTimer: null,
  startedAt: 0, questionSeenAt: 0
};
var LEN = { hizli:{n:3,dk:'4 dakika'}, dengeli:{n:5,dk:'7 dakika'}, derin:{n:8,dk:'12 dakika'} };
var AUDIENCE = {
  self: {
    intro: 'Kendin için çöz; baskın eğilimini, ikincil tipleri, güven düzeyini ve gelişim rehberini birlikte gör.',
    note: 'Soruları genelde nasıl olduğuna göre cevapla; tek bir günün ruh halini ölçmüyoruz.',
    mode: 'öz değerlendirme',
    resultKicker: 'Mizaç eğilimin',
    saved: 'Önceki sonucun',
    foot: 'Dokuz Tip Mizaç Modeli (DTMM / Enneagram), kişilik psikolojisinden ilham alan bir mizaç çerçevesidir; bilimsel kesinlikte bir teşhis değil, kendini tanımak için yapılandırılmış bir aynadır. Mizaç doğuştan gelir ama kader değildir — gelişim her tip için mümkündür.'
  },
  child: {
    intro: 'Çocuğun için çöz; ebeveyn gözlemine dayalı baskın eğilimleri, güven düzeyini ve rehberlik notlarını gör.',
    note: 'Çocuğunu son 6 ayda farklı ortamlarda nasıl gözlemlediğine göre cevapla; tek bir günün davranışını ölçmüyoruz.',
    mode: 'ebeveyn gözlemi',
    resultKicker: 'Gözlenen eğilim',
    saved: 'Önceki çocuk gözlemi',
    foot: 'Bu sonuç çocuğun kendisinden değil, ebeveyn gözleminden üretilmiş bir eğilim haritasıdır; tanı, etiket veya kesin hüküm değildir. Yaş, ortam, öğretmen/diğer ebeveyn gözlemi ve gelişim dönemi sonucu etkileyebilir.'
  }
};
var LK_SELF = ['Hiç katılmıyorum','Pek katılmıyorum','Kararsızım','Katılıyorum','Tamamen katılıyorum'];
var LK_CHILD = ['Hiç gözlemlemiyorum','Nadiren gözlemliyorum','Emin değilim','Sık gözlemliyorum','Çok belirgin'];

/* ── Kısayollar ── */
function $(id){ return document.getElementById(id); }
function el(tag, cls, html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
/* Güvenli zengin metin: her şeyi escape et, yalnız izinli etiketleri geri aç, satır sonlarını <br>'a çevir */
function safeRich(s){
  var e = escapeHtml(s);
  e = e.replace(/&lt;(\/?(?:b|strong|i|em|br|ul|ol|li))\s*\/?&gt;/gi, function(m,tag){ return '<'+tag.toLowerCase()+'>'; });
  e = e.replace(/\n/g, '<br>');
  return e;
}
function toPlain(s){ return String(s).replace(/<br\s*\/?>/gi,' ').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(); }
function announce(id, msg){ var n=$(id); if(n){ n.textContent=''; n.textContent=msg; } }
function aud(){ return state.audience==='child' ? AUDIENCE.child : AUDIENCE.self; }
function isChild(){ return state.audience==='child'; }
function likertLabels(){ return isChild() ? LK_CHILD : LK_SELF; }
function questionText(q){ return isChild() ? (q.cocuk || q.metin) : q.metin; }
function pctText(n){ return '%'+Math.round(n); }
function clamp(n, min, max){ n=+n; if(!isFinite(n)) n=min; return Math.max(min, Math.min(max, n)); }
function answerToPercent(v){ return v==null ? 50 : Math.round((clamp(v,1,5)-1)*25); }
function percentToAnswer(p){ return Math.round((1 + clamp(p,0,100)/25)*100)/100; }
function answerBucket(v){ return Math.max(1, Math.min(5, Math.round(clamp(v,1,5)))); }

/* ── Kontrast: dolgu üstü metin rengi (WCAG AA) ── */
function relLum(hex){
  hex=String(hex).replace('#','');
  if(hex.length===3) hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  var r=parseInt(hex.substr(0,2),16)/255, g=parseInt(hex.substr(2,2),16)/255, b=parseInt(hex.substr(4,2),16)/255;
  function f(c){ return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
}
function txtOn(hex){
  var L=relLum(hex);
  var cWhite=1.05/(L+0.05);
  var cDark=(L+0.05)/(relLum('#16161d')+0.05);
  return cWhite>=cDark ? '#ffffff' : '#16161d';
}
function isDark(){ return !document.documentElement.classList.contains('light') && !document.documentElement.classList.contains('mizac-light'); }

/* ── Aktif rengi ayarla (tema duyarlı) ── */
function setAccent(no){
  var r=document.documentElement.style;
  if(!no || !T[no]){
    r.setProperty('--c','#2f8e9e'); r.setProperty('--c-soft','rgba(47,142,158,.12)'); r.setProperty('--c-text','#256f7e');
    return;
  }
  var t=T[no];
  r.setProperty('--c', t.renk);
  r.setProperty('--c-soft', t.renkSoft);
  r.setProperty('--c-text', isDark() ? t.renkTextDark : t.renkText);
}
/* Tema değişince vurgu metni rengini tazele */
window.addEventListener('theme-changed', function(){ setAccent(state.primary || null); });

/* ════════════════ ENNEAGRAM GEOMETRİSİ ════════════════ */
var ORDER = [9,1,2,3,4,5,6,7,8];
var POS = (function(){
  var p={}, R=82, cx=100, cy=100;
  ORDER.forEach(function(num,i){ var ang=(-90+i*40)*Math.PI/180; p[num]={ x:cx+R*Math.cos(ang), y:cy+R*Math.sin(ang) }; });
  return p;
})();
function svgLine(a,b,cls){ return '<line class="'+cls+'" x1="'+POS[a].x.toFixed(1)+'" y1="'+POS[a].y.toFixed(1)+'" x2="'+POS[b].x.toFixed(1)+'" y2="'+POS[b].y.toFixed(1)+'"/>'; }
function arrowPath(a,b,cls,marker){
  var A=POS[a], B=POS[b], dx=B.x-A.x, dy=B.y-A.y, len=Math.sqrt(dx*dx+dy*dy), ux=dx/len, uy=dy/len;
  var x1=A.x+ux*17, y1=A.y+uy*17, x2=B.x-ux*15, y2=B.y-uy*15;
  return '<line class="arrow '+cls+'" x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" marker-end="url(#'+marker+')"/>';
}
/* opts: { me, wings:[], arrows, ids, decorative, draw, calc } */
function emblemSVG(opts){
  opts=opts||{};
  var aria = opts.me ? ('Enneagram haritası. Senin tipin '+opts.me+' '+(T[opts.me]?T[opts.me].ad:'')+'. Gelişim yönü tip '+OK.gelisim[opts.me]+', stres yönü tip '+OK.stres[opts.me]+', kanatlar '+KAN[opts.me].join(' ve ')+'.') : 'Dokuz tipli enneagram amblemi';
  var deco = !!opts.decorative;
  var s = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" '
        + (deco ? 'role="presentation" aria-hidden="true"' : 'role="img" aria-label="'+escapeHtml(aria)+'"')
        + (opts.draw ? ' class="mz-draw"' : '') + '>';
  if(!deco) s += '<title>'+escapeHtml(aria)+'</title>';
  if(opts.arrows){
    s += '<defs>'
      + '<marker id="ahg" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto"><path d="M0 0l6 3.2L0 6.4z" fill="#3f9d6c"/></marker>'
      + '<marker id="ahs" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto"><path d="M0 0l6 3.2L0 6.4z" fill="#cf5b54"/></marker>'
      + '</defs>';
  }
  s += deco ? '<g class="spin">' : '<g>';
  s += '<circle class="ennea-circle" cx="100" cy="100" r="82"/>';
  [[9,3],[3,6],[6,9]].forEach(function(p){ s+=svgLine(p[0],p[1],'ennea-line'); });
  [[1,4],[4,2],[2,8],[8,5],[5,7],[7,1]].forEach(function(p){ s+=svgLine(p[0],p[1],'ennea-line'); });
  s += '</g>';
  if(opts.arrows && opts.me){
    s += arrowPath(opts.me, OK.gelisim[opts.me], 'grow', 'ahg');
    s += arrowPath(opts.me, OK.stres[opts.me], 'stress', 'ahs');
  }
  ORDER.forEach(function(num, i){
    var P=POS[num], me=(opts.me===num), wing=(opts.wings && opts.wings.indexOf(num)>=0);
    var cls='node'+(me?' me':'')+(wing?' wing':'');
    var r = me?15 : (wing?11 : 9);
    var fill = me ? T[num].renk : (wing ? 'transparent' : (deco ? T[num].renk : 'var(--surface2,#eee)'));
    var stroke = wing ? T[num].renk : (deco ? 'none' : 'var(--border,#ddd)');
    var op = deco ? (me?1:.92) : (me?1:(wing?1:.85));
    var delay = opts.calc ? ' style="animation-delay:'+(0.12*(me?9:i)).toFixed(2)+'s"' : '';
    s += '<g class="'+cls+'" data-no="'+num+'">';
    s += '<circle cx="'+P.x.toFixed(1)+'" cy="'+P.y.toFixed(1)+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2" opacity="'+op+'"'+delay+'/>';
    if(opts.ids!==false){
      var tcol = (me||deco) ? txtOn(T[num].renk) : (wing ? T[num].renk : 'var(--text-secondary)');
      s += '<text x="'+P.x.toFixed(1)+'" y="'+P.y.toFixed(1)+'" style="fill:'+tcol+'">'+num+'</text>';
    }
    s += '</g>';
  });
  s += '</svg>';
  return s;
}

/* ════════════════ GİRİŞ ════════════════ */
function initIntro(){
  $('intro-emblem').innerHTML = emblemSVG({ decorative:true });
  var chips=$('type-chips');
  for(var i=1;i<=9;i++){ (function(no){
    var t=T[no];
    var chip=el('button','type-chip');
    chip.type='button';
    chip.innerHTML='<span class="dot" style="background:'+t.renk+';color:'+txtOn(t.renk)+'"><svg viewBox="0 0 24 24" aria-hidden="true" style="stroke:'+txtOn(t.renk)+'">'+GL[no]+'</svg></span>'+t.ad;
    chip.setAttribute('aria-label', t.no+' '+t.ad+', '+t.unvan);
    chip.title=t.no+' · '+t.unvan+' — '+t.ozet;
    chip.addEventListener('click', function(){ showToast(t.no+' · '+t.ad+': '+t.ozet); });
    chips.appendChild(chip);
  })(i); }

  $('audience-pick').querySelectorAll('button').forEach(function(b){
    b.addEventListener('click', function(){
      $('audience-pick').querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); x.setAttribute('aria-pressed','false'); });
      b.classList.add('on'); b.setAttribute('aria-pressed','true');
      state.audience=b.getAttribute('data-audience') || 'self';
      updateAudienceCopy();
    });
  });

  $('len-pick').querySelectorAll('button').forEach(function(b){
    b.addEventListener('click', function(){
      $('len-pick').querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); x.setAttribute('aria-pressed','false'); });
      b.classList.add('on'); b.setAttribute('aria-pressed','true');
      state.len=b.getAttribute('data-len'); state.perType=LEN[state.len].n;
      $('meta-min').textContent=LEN[state.len].dk;
    });
  });
  $('start-btn').addEventListener('click', start);
  updateAudienceCopy();
  offerPrevious();
}

function updateAudienceCopy(){
  var a=aud();
  if($('intro-sub')) $('intro-sub').textContent=a.intro;
  if($('audience-note')) $('audience-note').textContent=a.note;
  if($('intro-note')) $('intro-note').textContent=isChild() ? 'Çocuk modu bir teşhis değil; ebeveyn gözlemine dayalı rehberliktir.' : 'Bu bir teşhis değil; kendini tanımak için yapılandırılmış bir aynadır.';
  if($('lk-left')) $('lk-left').textContent=likertLabels()[0];
  if($('lk-mid')) $('lk-mid').textContent=likertLabels()[2];
  if($('lk-right')) $('lk-right').textContent=likertLabels()[4];
  if($('skip-btn')) $('skip-btn').innerHTML=(isChild()?'Emin değilim':'Kararsızım')+' <span aria-hidden="true">→</span>';
  document.documentElement.setAttribute('data-audience', state.audience);
}

function readSavedResult(){
  try{
    var raw=localStorage.getItem('mizac-sonuc'); if(!raw) return null;
    var d=JSON.parse(raw);
    var ok = d && +d.primary>=1 && +d.primary<=9 && T[+d.primary] && d.scores && d.scores.pct &&
             Array.isArray(d.scores.order) && d.scores.order.length===9;
    if(!ok){ localStorage.removeItem('mizac-sonuc'); return null; }
    d.primary=+d.primary;
    return d;
  }catch(e){ try{ localStorage.removeItem('mizac-sonuc'); }catch(_){ } return null; }
}
function offerPrevious(){
  var slot=$('prev-slot'); if(!slot) return;
  slot.innerHTML='';
  var d=readSavedResult(); if(!d) return;
  var t=T[d.primary];
  var btn=el('button','prev-result-link');
  btn.type='button';
  var label = d.audience==='child' ? AUDIENCE.child.saved : AUDIENCE.self.saved;
  btn.textContent='↩ '+label+': '+d.primary+' · '+t.ad+' — tekrar gör';
  btn.addEventListener('click', function(){
    var fresh=readSavedResult(); if(!fresh){ slot.innerHTML=''; return; }
    state.audience=fresh.audience || 'self';
    state.scores=fresh.scores; state.primary=fresh.primary; state.wing=fresh.wing||null;
    updateAudienceCopy();
    renderResult(true);
  });
  slot.appendChild(btn);
}

/* ════════════════ TEST ════════════════ */
function pickQuestions(){
  var byType={}; for(var i=1;i<=9;i++) byType[i]={n:[],r:[]};
  S.forEach(function(q){ (q.ters ? byType[q.tip].r : byType[q.tip].n).push(q); });
  var k=state.perType, revN = k>=8 ? 2 : 1;
  var picked={};
  for(var t=1;t<=9;t++){
    var rv=byType[t].r.slice(0, Math.min(revN, byType[t].r.length));
    var need=k-rv.length;
    var nm=byType[t].n.slice(0, Math.min(need, byType[t].n.length));
    var one=nm.slice();
    if(rv[0]) one.splice(Math.min(1, one.length), 0, rv[0]);
    if(rv[1]) one.splice(Math.max(3, one.length), 0, rv[1]);
    picked[t]=one.slice(0,k);
  }
  var list=[];
  for(var slot=0; slot<k; slot++){
    ORDER.forEach(function(no){ if(picked[no] && picked[no][slot]) list.push(picked[no][slot]); });
  }
  return list;
}
function start(){
  state.sorular=pickQuestions();
  state.idx=0; state.answers=new Array(state.sorular.length).fill(null); state.answerTimes=new Array(state.sorular.length).fill(null);
  state.startedAt=Date.now(); state.questionSeenAt=Date.now();
  state.finishing=false; state.locking=false; clearTimeout(state.advTimer);
  $('q-tot').textContent=state.sorular.length;
  $('prog-bar').setAttribute('aria-valuemax', state.sorular.length);
  showScreen('test');
  window.scrollTo({ top:0, behavior:'auto' });
  buildLikert();
  renderQuestion(true);
  focusQuestion();
  if(window.gtag) gtag('event','mizac_test_basladi',{event_category:'mizac',event_label:state.len+'_'+state.audience});
}
function buildLikert(){
  var box=$('likert'), labels=likertLabels(); box.innerHTML='';
  if($('lk-left')) $('lk-left').textContent=labels[0];
  if($('lk-mid')) $('lk-mid').textContent=labels[2];
  if($('lk-right')) $('lk-right').textContent=labels[4];
  var read=el('div','scale-readout');
  read.id='scale-readout';
  var shell=el('div','scale-shell');
  shell.id='scale-shell';
  shell.innerHTML='<input id="scale-range" class="scale-range" type="range" min="0" max="100" step="1" value="50" aria-labelledby="q-text" />';
  box.appendChild(read);
  box.appendChild(shell);
  var range=$('scale-range');
  function sync(){ updateScaleUI(+range.value); }
  range.addEventListener('input', sync);
  range.addEventListener('change', function(){ answer(percentToAnswer(range.value)); });
  range.addEventListener('keydown', function(e){
    if(e.key>='1' && e.key<='5'){
      e.preventDefault(); e.stopPropagation();
      range.value=(+e.key-1)*25;
      updateScaleUI(+range.value);
      answer(+e.key);
    } else if(e.key===' ' || e.key==='Enter'){
      e.preventDefault(); e.stopPropagation();
      answer(percentToAnswer(range.value));
    }
  });
  sync();
}
function scaleLabel(percent){
  var labels=likertLabels(), p=clamp(percent,0,100);
  if(p<13) return labels[0];
  if(p<38) return labels[1];
  if(p<=62) return labels[2];
  if(p<=87) return labels[3];
  return labels[4];
}
function updateScaleUI(percent){
  var range=$('scale-range'), read=$('scale-readout'), shell=$('scale-shell');
  var p=Math.round(clamp(percent,0,100));
  var text=scaleLabel(p)+' · %'+p;
  if(shell) shell.style.setProperty('--pos', p+'%');
  if(read) read.textContent=text;
  if(range){
    range.value=p;
    range.setAttribute('aria-valuetext', text);
  }
}
function updateLikertSelection(val){
  var range=$('scale-range');
  if(range){ updateScaleUI(answerToPercent(val)); }
}
function updateProgress(){
  var n=state.sorular.length, i=state.idx;
  var pct=(i)/n*100;
  $('prog-fill').style.width=pct+'%';
  $('q-cur').textContent=i+1;
  var bar=$('prog-bar');
  bar.setAttribute('aria-valuenow', i+1);
  bar.setAttribute('aria-valuetext', 'Soru '+(i+1)+' / '+n);
}
function renderQuestion(){
  var q=state.sorular[state.idx], card=$('q-card');
  $('q-no').textContent='SORU '+(state.idx+1);
  $('q-text').textContent=questionText(q);
  state.questionSeenAt=Date.now();
  updateLikertSelection(state.answers[state.idx]);
  updateProgress();
  $('prev-btn').disabled=(state.idx===0);
  card.classList.remove('out-l','out-r'); card.classList.add('in');
  announce('q-live', 'Soru '+(state.idx+1)+' / '+state.sorular.length+'. '+questionText(q));
}
function focusQuestion(){ var t=$('q-text'); if(t){ t.setAttribute('tabindex','-1'); t.focus({preventScroll:true}); } }
function transitionTo(dir, fn){
  if(state.locking || state.finishing) return;
  state.locking=true;
  var card=$('q-card');
  if(RM){ fn(); renderQuestion(); state.locking=false; focusQuestion(); return; }
  card.classList.remove('in'); card.classList.add(dir>0?'out-l':'out-r');
  setTimeout(function(){
    fn();
    card.classList.remove('out-l','out-r'); void card.offsetWidth; card.classList.add('in');
    renderQuestion();
    state.locking=false;
    focusQuestion();
  }, 300);
}
function answer(val){
  if(state.locking || state.finishing) return;
  val=clamp(val,1,5);
  state.answers[state.idx]=val;
  state.answerTimes[state.idx]=Math.max(0, Date.now()-state.questionSeenAt);
  updateLikertSelection(val);
  var shell=$('scale-shell');
  if(shell && !RM){ shell.classList.remove('scale-pulse'); void shell.offsetWidth; shell.classList.add('scale-pulse'); }
  clearTimeout(state.advTimer);
  state.advTimer=setTimeout(function(){
    if(state.idx>=state.sorular.length-1) finish();
    else transitionTo(1, function(){ state.idx++; });
  }, RM?60:240);
}
function nextManual(){
  if(state.locking || state.finishing) return;
  clearTimeout(state.advTimer);          // bekleyen otomatik ilerlemeyi iptal et
  if(state.idx>=state.sorular.length-1) finish();
  else transitionTo(1, function(){ state.idx++; });
}
function prev(){
  if(state.locking || state.finishing) return;
  clearTimeout(state.advTimer);          // bekleyen otomatik ilerlemeyi iptal et
  if(state.idx>0) transitionTo(-1, function(){ state.idx--; });
}

/* ════════════════ PUANLAMA ════════════════ */
function longestRun(vals){
  var best=0, cur=0, last=null;
  vals.forEach(function(v){
    v=answerBucket(v);
    if(v===last) cur++; else { last=v; cur=1; }
    if(cur>best) best=cur;
  });
  return best;
}
function responseQuality(vals, times, gap, spread){
  var total=vals.length || 1, counts={}, flags=[];
  vals.forEach(function(v){ var b=answerBucket(v); counts[b]=(counts[b]||0)+1; });
  var neutral=counts[3]||0, maxSame=0;
  Object.keys(counts).forEach(function(k){ if(counts[k]>maxSame) maxSame=counts[k]; });
  var validTimes=(times||[]).filter(function(t){ return typeof t==='number' && isFinite(t) && t>=0; });
  var fast=validTimes.filter(function(t){ return t<850; }).length;
  var avgTime=validTimes.length ? Math.round(validTimes.reduce(function(a,b){return a+b;},0)/validTimes.length) : null;
  var score=100;
  function penalize(cond, pts, flag){ if(cond){ score-=pts; flags.push(flag); } }
  penalize(neutral/total>=0.45, 26, 'Çok fazla orta/emin değilim yanıtı var.');
  penalize(neutral/total>=0.30 && neutral/total<0.45, 12, 'Orta yanıt oranı yüksek.');
  penalize(maxSame/total>=0.70, 24, 'Cevaplar belirgin biçimde tek seçeneğe yığılmış.');
  penalize(maxSame/total>=0.55 && maxSame/total<0.70, 12, 'Cevap çeşitliliği sınırlı.');
  penalize(longestRun(vals)/total>=0.45, 10, 'Uzun bir bölümde aynı yanıt peş peşe verilmiş.');
  penalize(fast/total>=0.65, 18, 'Cevapların çoğu çok hızlı verilmiş.');
  penalize(fast/total>=0.35 && fast/total<0.65, 8, 'Bazı cevaplar çok hızlı verilmiş.');
  penalize(spread<12, 18, 'Tip puanları birbirine çok yakın dağılmış.');
  penalize(spread>=12 && gap<6, 8, 'İlk iki eğilim birbirine çok yakın.');
  score=Math.max(0, Math.min(100, score));
  var level=score>=78 ? 'yuksek' : (score>=58 ? 'orta' : 'dusuk');
  return {
    score: score,
    level: level,
    label: level==='yuksek' ? 'Yüksek' : (level==='orta' ? 'Orta' : 'Düşük'),
    flags: flags,
    neutralPct: Math.round(neutral/total*100),
    samePct: Math.round(maxSame/total*100),
    fastPct: Math.round(fast/total*100),
    avgTime: avgTime
  };
}
function scoreMode(gap, spread, quality){
  if((quality && quality.level==='dusuk') || spread<12) return 'dejenere';
  if(gap<7) return 'esbaskin';
  return 'net';
}
function computeScores(){
  var raw={}, cnt={};
  for(var i=1;i<=9;i++){ raw[i]=0; cnt[i]=0; }
  state.sorular.forEach(function(q, idx){
    var v=state.answers[idx];
    if(v==null) return;                       // cevapsız tamamen dışarıda
    var p = q.ters ? (5 - v) : (v - 1);        // 0..4 (ters madde puanı çevirir)
    raw[q.tip]+=p; cnt[q.tip]++;
  });
  var pct={};
  for(var t=1;t<=9;t++){ var max=(cnt[t]||1)*4; pct[t]=Math.round(raw[t]/max*100); }
  var order=[]; for(var n=1;n<=9;n++) order.push(n);
  order.sort(function(a,b){ return pct[b]-pct[a] || raw[b]-raw[a] || a-b; });
  var top=pct[order[0]], second=pct[order[1]], low=pct[order[8]];
  var gap=top-second, spread=top-low;
  var vals=state.answers.filter(function(v){ return v!=null; });
  var quality=responseQuality(vals, state.answerTimes, gap, spread);
  var mode = scoreMode(gap, spread, quality);
  state.scores={ pct:pct, raw:raw, cnt:cnt, order:order, top:top, second:second, gap:gap, spread:spread, mode:mode, quality:quality, audience:state.audience };
  state.primary=order[0];
  var w=KAN[state.primary];
  state.wing = pct[w[0]]>=pct[w[1]] ? w[0] : w[1];
}

/* ════════════════ HESAPLAMA ANİMASYONU ════════════════ */
function finish(){
  if(state.finishing || state.locking) return;   // geçiş animasyonu sırasında tetiklenirse yoksay
  state.finishing=true;
  clearTimeout(state.advTimer);
  computeScores();
  $('prog-fill').style.width='100%';
  setAccent(state.primary);
  var testEl=$('test');
  testEl.setAttribute('aria-hidden','true');
  try{ testEl.setAttribute('inert',''); }catch(e){}
  $('calc-emblem').innerHTML=emblemSVG({ me:state.primary, ids:true, calc:true });
  var calc=$('calc'); calc.classList.add('on');
  var subs=isChild()
    ? ['Gözlemlerin dokuz eğilim üzerinde değerlendiriliyor','Merkez ve kanat olasılıkları hesaplanıyor','Güven düzeyi ve ikincil eğilimler çıkarılıyor','Ebeveyn rehberlik notları hazırlanıyor']
    : ['Cevapların dokuz tip üzerinde değerlendiriliyor','Merkez ve kanat hesaplanıyor','Güven düzeyi ve gelişim yönün çıkarılıyor','Mizaç profilin hazırlanıyor'];
  var si=0; $('calc-sub').textContent=subs[0];
  var iv=setInterval(function(){ si=(si+1)%subs.length; $('calc-sub').textContent=subs[si]; }, 650);
  setTimeout(function(){
    clearInterval(iv);
    calc.classList.remove('on');
    testEl.removeAttribute('aria-hidden');
    try{ testEl.removeAttribute('inert'); }catch(e){}
    saveResult();
    renderResult(false);
    if(window.gtag) gtag('event','mizac_test_bitti',{event_category:'mizac',event_label:state.audience+'_tip_'+state.primary});
  }, RM?600:2700);
}
function saveResult(){
  try{ localStorage.setItem('mizac-sonuc', JSON.stringify({ primary:state.primary, wing:state.wing, scores:state.scores, len:state.len, audience:state.audience })); }catch(e){}
}

/* ════════════════ SONUÇ ════════════════ */
function belirginlik(gap){ return gap>=14?'yüksek':(gap>=6?'orta':'sınırda'); }
var COCUK_REHBER = {
  1: { iliski:'Dürüst, kurallı ve sorumluluk sahibidir; hata görünce düzeltmek isteyebilir. Yakınlık, hata yaptığında da kabul gördüğünü hissettiğinde yumuşar.', ortam:'Net beklentiler, adil kurallar ve kaliteye değer veren ortamlar iyi gelir. Aşırı eleştiri onu daha katılaştırabilir; "yeterince iyi" pratiği rahatlatır.', buyume:['Hata yapmanın öğrenmenin parçası olduğunu sakin örneklerle göster.', 'Sadece sonucu değil çabasını ve niyetini de fark et.', 'Esneklik isteyen küçük oyunlar ve seçim alanları aç.', 'Düzeltme isteğini şefkatli dile çevirmesine yardım et.'] },
  2: { iliski:'Sıcak, yardımsever ve ilişki odaklıdır; sevilmediğini hissettiğinde kolay kırılabilir. Kendi ihtiyacını söylemeyi öğrenmesi önemlidir.', ortam:'Takdir, güvenli bağ ve sınırları koruyan yetişkinlik iyi gelir. Sürekli "uslu/yardımcı çocuk" rolüne itilirse kendi sesini unutabilir.', buyume:['Yardım etmediğinde de sevildiğini açıkça hissettir.', 'Kendi ihtiyacını sormayı günlük küçük bir ritüel yap.', '"Hayır" demesini ayıp değil sınır olarak öğret.', 'Verdiği emeği överken kimliğini sadece fedakarlığa bağlama.'] },
  3: { iliski:'Hedefe ve başarıya kolay odaklanır; beğenilmek ve yeterli görünmek ister. Başarısız olduğunda değerinin azalmadığını duymaya ihtiyaç duyar.', ortam:'Hedef, geri bildirim ve görünür ilerleme motive eder. Rekabet dozunda olmalı; sevgi başarıya bağlanmamalı.', buyume:['Başarıdan bağımsız değerli olduğunu sık ve somut söyle.', 'Duygusunu sormak için performans anları dışında zaman ayır.', 'Kazanmaktan çok öğrenme sürecini görünür kıl.', 'Dinlenmeyi de sorumluluk kadar meşru hale getir.'] },
  4: { iliski:'Duygusal derinliği yüksek, özgün ve hassas olabilir. Anlaşılmadığını hissettiğinde içine çekilebilir veya dramatikleşebilir.', ortam:'Sanat, hikaye, müzik ve duygu ifadesi alanları iyi gelir. Kıyas ve küçümseme hassasiyetini artırır.', buyume:['Duygusunu küçültmeden adlandırmasına yardım et.', 'Sıradan günlerin de değerli olduğunu birlikte fark edin.', 'Üretmesi için ilham beklemeden küçük rutinler kur.', 'Kıyas yerine kendi gelişim çizgisini görmesini sağla.'] },
  5: { iliski:'Gözlemci, bağımsız ve derinleşmeyi seven bir yapı gösterebilir. Fazla talep veya kalabalıkta geri çekilebilir.', ortam:'Sessiz alan, derin merak ve kendi hızında öğrenme iyi gelir. Ama hayata katılımı ertelememesi için nazik davet gerekir.', buyume:['Özel alanına saygı gösterirken küçük sosyal adımlar planla.', 'Bildiklerini paylaşmasını baskısız biçimde teşvik et.', 'Duyguyu analizden önce fark etmesine yardım et.', 'Bedensel hareket ve oyunla zihinden hayata geçiş alanı aç.'] },
  6: { iliski:'Sadık, dikkatli ve güven arayan bir çocuk olabilir. Belirsizlikte soru sorar, garanti ister veya kaygılanır.', ortam:'Öngörülebilir rutinler, güvenilir yetişkinler ve açık planlar iyi gelir. Aşırı güvence vermek yerine iç güvenini büyütmek gerekir.', buyume:['Korkusunu dinle, ama korkunun tek karar verici olmadığını göster.', 'Küçük kararları kendi vermesi için alan aç.', 'Felaket senaryosunu en olası senaryoyla dengelet.', 'Cesareti korkusuzluk değil küçük adım olarak tarif et.'] },
  7: { iliski:'Neşeli, meraklı ve seçeneklerle canlanan bir çocuk olabilir. Sıkıntıdan kaçmak için konudan konuya atlayabilir.', ortam:'Çeşitlilik, oyun ve keşif iyi gelir; fakat bitirme alışkanlığı ve sınır da gerekir. Eğlenceyle yapı birlikte kurulmalı.', buyume:['Başladığı şeyi küçük parçalara bölerek bitirmesini destekle.', 'Zor duygudan hemen kaçmadan yanında kalmasına yardım et.', 'Seçenekleri sınırlı ama anlamlı tut.', 'Sükuneti ceza değil derinleşme alanı olarak deneyimlet.'] },
  8: { iliski:'Güçlü, doğrudan ve koruyucu davranabilir. Kontrol edilmekten hoşlanmaz; haksızlığa sert tepki verebilir.', ortam:'Net sınır, saygılı güç ve adil otorite iyi gelir. Sert güç çatışmaları onu daha savunmacı yapabilir.', buyume:['Gücünü korumak ve savunmak için kullanmasını öv.', 'Duygunun altındaki incinmeyi adlandırmasına yardım et.', 'Sınırı sakin ama kararlı biçimde koy.', 'Yumuşaklığın zayıflık olmadığını modelle.'] },
  9: { iliski:'Sakin, uyumlu ve ortamı yumuşatan bir çocuk olabilir. Çatışmadan kaçarken kendi isteğini geri plana atabilir.', ortam:'Huzurlu ama harekete geçiren ortamlar iyi gelir. Fazla baskı donmasına, fazla serbestlik ertelemesine yol açabilir.', buyume:['Kendi isteğini net söylemesi için seçenekli sorular sor.', 'Önemli işleri çok küçük ilk adımlara böl.', 'Sağlıklı çatışmanın ilişkiyi bozmadığını göster.', 'Varlığının ve fikrinin önemli olduğunu sıkça hissettir.'] }
};
function childGuide(no){ return COCUK_REHBER[no] || COCUK_REHBER[9]; }
function qualityText(sc){
  var q=sc.quality || { label:'Orta', score:65, flags:[] };
  if(q.level==='yuksek') return 'Cevap deseni tutarlı ve ayırt edici görünüyor; yine de sonuç bir teşhis değil, güçlü bir okuma önerisidir.';
  if(q.level==='orta') return 'Cevap deseni okunabilir, fakat bazı yakın/kararsız alanlar var. İlk iki eğilimi birlikte okumak daha doğru olur.';
  return 'Cevap deseni tek bir tipe güvenle kapanmıyor. Sonucu kesinleştirmek yerine ipucu gibi oku; derin mod veya farklı zaman/gözlemle tekrar çözmek iyi olur.';
}
function modeTitle(sc, P, secondNo){
  if(sc.mode==='dejenere') return 'Çoklu / sınırda profil';
  if(sc.mode==='esbaskin') return P.ad+' + '+T[secondNo].ad;
  return P.ad;
}
function modeLead(sc, P, secondNo){
  if(sc.mode==='dejenere') return isChild()
    ? 'Gözlemler tek bir mizaca net kapanmadı; en yakın eğilim '+P.no+' '+P.ad+', hemen yanında '+secondNo+' '+T[secondNo].ad+' var.'
    : 'Cevapların tek bir mizaca net kapanmadı; en yakın eğilim '+P.no+' '+P.ad+', hemen yanında '+secondNo+' '+T[secondNo].ad+' var.';
  if(sc.mode==='esbaskin') return isChild()
    ? 'Çocuğunuzda '+P.no+' '+P.ad+' ve '+secondNo+' '+T[secondNo].ad+' eğilimleri birbirine çok yakın görünüyor.'
    : 'Profilin '+P.no+' '+P.ad+' ve '+secondNo+' '+T[secondNo].ad+' arasında birbirine yakın görünüyor.';
  return P.ozet;
}

function renderResult(fromSaved){
  if(!T[state.primary] || !state.scores || !state.scores.pct){ showScreen('intro'); setAccent(null); return; }
  var P=T[state.primary];
  setAccent(state.primary);
  var sc=state.scores;
  /* Eski/kaydedilmiş veride türev metrikleri tamamla */
  if(sc.mode===undefined){
    sc.top=sc.pct[sc.order[0]]; sc.second=sc.pct[sc.order[1]];
    sc.gap=sc.top-sc.second; sc.spread=sc.top-sc.pct[sc.order[8]];
    sc.mode = sc.spread<12 ? 'dejenere' : (sc.gap<6 ? 'esbaskin' : 'net');
  }
  if(!sc.quality){ sc.quality={ score: sc.mode==='net'?82:(sc.mode==='esbaskin'?68:48), level: sc.mode==='net'?'yuksek':(sc.mode==='esbaskin'?'orta':'dusuk'), label: sc.mode==='net'?'Yüksek':(sc.mode==='esbaskin'?'Orta':'Düşük'), flags:[] }; }
  var w=state.wing || (function(){ var ww=KAN[state.primary]; return sc.pct[ww[0]]>=sc.pct[ww[1]]?ww[0]:ww[1]; })();
  state.wing=w;
  var merk=MERK[P.merkez], gt=OK.gelisim[state.primary], st=OK.stres[state.primary];
  var secondNo=sc.order[1];
  var onCol=txtOn(P.renk);
  var child=isChild(), q=sc.quality;
  var heroNum = sc.mode==='dejenere' ? '?' : (sc.mode==='esbaskin' ? (P.no+'·'+secondNo) : P.no);
  var heroTitle = modeTitle(sc, P, secondNo);

  var html='';
  /* HERO */
  html+='<div class="res-hero">'
    + '<div class="res-kicker">'+aud().resultKicker+' · '+aud().mode+'</div>'
    + '<div class="res-bignum">'+heroNum+'</div>'
    + '<div class="res-glyph" style="background:'+P.renk+'"><svg viewBox="0 0 24 24" aria-hidden="true" style="stroke:'+onCol+'">'+GL[state.primary]+'</svg></div>'
    + '<h1 class="res-name serif" id="res-name" tabindex="-1">'+heroTitle+'</h1>'
    + '<div class="res-unvan">'+(sc.mode==='dejenere'?'En yakın eğilim: ':'')+P.no+' '+P.unvan+'  ·  '+P.no+'w'+w+' (kanat '+w+')</div>'
    + '<p class="res-ozet">'+modeLead(sc, P, secondNo)+'</p>';
  if(sc.mode==='net'){
    html+='<div class="res-conf">Belirginlik: <b>'+belirginlik(sc.gap)+'</b> · İkincil eğilim: '+secondNo+' '+T[secondNo].ad+' · Okuma güveni: <b>'+q.label+'</b></div>';
  } else if(sc.mode==='esbaskin'){
    html+='<div class="res-conf">İlk iki eğilim arasında yalnızca <b>'+sc.gap+' puan</b> fark var · Okuma güveni: <b>'+q.label+'</b></div>';
  } else {
    html+='<div class="res-conf">Puanlar birçok mizaca yakın dağıldı · Okuma güveni: <b>'+q.label+'</b></div>';
  }
  html+='</div>';

  html+='<div class="res-read">'
    + '<div><h4>Okuma güveni</h4><b class="read-score">'+q.label+' · '+q.score+'/100</b><p>'+qualityText(sc)+'</p></div>'
    + '<div><h4>Nasıl okunmalı?</h4><p>'+(child?'Bu harita çocuğunuzu etiketlemek için değil, hangi ihtiyaçlara daha dikkatle bakabileceğinizi görmek için var.':'Bu harita kimliğini kapatmak için değil, tekrar eden motivasyon ve stres örüntülerini fark etmek için var.')+'</p></div>'
    + '</div>';

  /* Mod uyarısı */
  if(sc.mode==='dejenere'){
    html+='<div class="res-flag"><b>Net bir baskın mizaç belirmedi.</b> '+(child?'Gözlemler birden çok eğilime yakın dağıldı. Bu, çocuğun farklı ortamlarda farklı yüzlerini gösterdiği veya bazı maddelerde yeterli gözlem olmadığı anlamına gelebilir.':'Cevapların birden çok tipe yakın dağıldı; bu da bir bilgidir.')+' Daha ayırt edici cevaplarla ya da <b>Derin</b> modla tekrar denersen profil netleşebilir. Aşağıda yine de en öne çıkan eğilimler var.</div>';
  } else if(sc.mode==='esbaskin'){
    html+='<div class="res-flag soft">'+(child?'Gözlem profili':'Profilin')+' <b>'+P.no+' '+P.ad+'</b> ile <b>'+secondNo+' '+T[secondNo].ad+'</b> arasında dengeli. İkisini birlikte okumak daha isabetli olur.</div>';
  }
  if(q.flags && q.flags.length){
    html+='<div class="res-flag quiet"><b>Güven notu:</b> '+q.flags.slice(0,3).join(' ')+'</div>';
  }

  /* HARİTA */
  html+='<figure class="res-map">'+emblemSVG({ me:state.primary, wings:KAN[state.primary], arrows:true, ids:true, draw:true })
    + '<figcaption class="map-legend">'
    + '<span><i style="background:'+P.renk+'"></i> '+(child?'En yakın eğilim':'Tipin')+' ('+P.no+')</span>'
    + '<span><i style="background:#3f9d6c"></i> Gelişim → '+gt+'</span>'
    + '<span><i class="dash" style="background:#cf5b54"></i> Stres → '+st+'</span>'
    + '<span><i style="background:transparent;border:2px solid '+P.renk+'"></i> Kanatlar '+KAN[state.primary][0]+' & '+KAN[state.primary][1]+'</span>'
    + '</figcaption></figure>';

  /* SKOR GRAFİĞİ */
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Dokuz eğilim dağılımı':'Dokuz tip dağılımın')+'</h2>';
  html+='<div class="scores" id="scores"></div>';

  /* TEMEL */
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Gözlenen çekirdek eğilim':'Mizacının çekirdeği')+'</h2>';
  html+='<div class="cards two">'+card(child?'Bu eğilimin temel arzusu':'Temel arzu', P.temelArzu, true)+card(child?'Bu eğilimin temel korkusu':'Temel korku', P.temelKorku, true)+'</div>';
  html+='<div class="cards" style="margin-top:14px">'+card(child?'Davranışta görünebilecek itki':'Seni harekete geçiren', P.motivasyon, false)+'</div>';

  /* GÜÇLÜ / ZORLUK */
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Gözlenen güçlü yönler':'Güçlü yönlerin')+'</h2>';
  html+='<ul class="lst">'+P.gucluYonler.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Dikkat isteyen gölge alanlar':'Gölge yönün & zorlukların')+'</h2>';
  html+='<div class="card tint" style="margin-bottom:14px"><p>'+P.golge+'</p></div>';
  html+='<ul class="lst warn">'+P.zorluklar.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';

  /* TUTKU / ERDEM */
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Denge ihtiyacı':'Nefsinin eğilimi & erdemin')+'</h2>';
  html+='<div class="cards two">'+card(child?'Zorlanınca görülebilecek tutku':'Gölge tutku', P.tutku, true)+card(child?'Desteklenecek erdem':'Yöneleceğin erdem', P.erdem, true)+'</div>';

  /* MERKEZ & KANAT */
  html+='<h2 class="section-title"><span class="bar"></span>Merkez & kanat</h2>';
  html+='<div class="card"><h4>'+merk.ad+' · '+merk.altAd+'</h4><p>'+merk.aciklama+' (Bu merkezde tipler '+merk.tipler.join(', ')+' yer alır.)</p></div>';
  html+='<div class="pill-row" style="margin-top:14px">'+pill(KAN[state.primary][0])+pill(KAN[state.primary][1])+'</div>';
  html+='<p class="note-line">Kanat, çekirdek tipine komşu tiplerin kattığı renktir. '+(child?'Bu gözlemde baskın kanat ':'Sende baskın kanat ')+'<b>'+w+' '+T[w].ad+'</b>: '+T[w].ozet+'</p>';

  /* STRES / GELİŞİM */
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Stres & destek yönü':'Stres & gelişim yönün')+'</h2>';
  html+='<div class="arrows-2">'
    + '<div class="arrow-card grow"><div class="lab"><span class="ic" style="background:#3f9d6c;color:'+txtOn('#3f9d6c')+'">'+gt+'</span>Gelişim → '+T[gt].ad+'</div><p>'+P.gelisim.metin+'</p></div>'
    + '<div class="arrow-card stress"><div class="lab"><span class="ic" style="background:#cf5b54;color:'+txtOn('#cf5b54')+'">'+st+'</span>Stres → '+T[st].ad+'</div><p>'+P.stres.metin+'</p></div>'
    + '</div>';

  /* İLİŞKİ / İŞ */
  if(child){
    var cg=childGuide(state.primary);
    html+='<h2 class="section-title"><span class="bar"></span>İlişkiler & öğrenme ortamı</h2>';
    html+='<div class="cards two">'+card('İlişkilerde gözlenebilir', cg.iliski, false)
      + card('Ev-okul ortamı', cg.ortam, false)+'</div>';
  } else {
    html+='<h2 class="section-title"><span class="bar"></span>İlişkiler & iş hayatı</h2>';
    html+='<div class="cards two">'+card('İlişkilerde', P.iliskiler, false)
      + card('İş & meslek', P.is+' <br><span class="muted-sm">Sık görülen roller: '+P.roller+'</span>', false)+'</div>';
  }

  /* BÜYÜME */
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Ebeveyn için 4 rehberlik anahtarı':'Gelişim için 4 anahtar')+'</h2>';
  var growth = child ? childGuide(state.primary).buyume : P.buyume;
  html+='<ul class="lst">'+growth.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';

  html+='<h2 class="section-title"><span class="bar"></span>Sonucu güvenle kullan</h2>';
  html+='<div class="cards two">'
    + card('Kesin hüküm değil', child?'Bu sonuç çocuğunuzu tanımlayan bir etiket değil; hangi ihtiyacını daha iyi görmeniz gerektiğine dair bir gözlem pusulasıdır.':'Bu sonuç kimliğini kapatan bir etiket değil; tekrar eden motivasyon ve zorlanma örüntülerini fark etme aracıdır.', false)
    + card('Netleştirme yolu', child?'Emin olmadığınız maddelerde diğer ebeveyn, öğretmen veya farklı ortam gözlemiyle tekrar bakmak sonucu güçlendirir.':'Emin olmadığın maddelerde acele etmeden, farklı zamanlarda ve Derin modda tekrar çözmek profili netleştirir.', false)
    + '</div>';

  /* SOHBET */
  html+='<h2 class="section-title"><span class="bar"></span>'+(child?'Çocuk gözlemiyle sohbet et':'Mizacınla sohbet et')+'</h2>';
  html+=chatHTML(P, onCol);

  /* AKSİYONLAR */
  html+='<div class="res-actions">'
    + '<button class="act primary" id="share-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg> Sonucu paylaş</button>'
    + '<button class="act ghost" id="retake-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Testi tekrar çöz</button>'
    + '</div>';
  html+='<p class="res-foot">'+aud().foot+'<br><a href="/">raufenc.com</a> · Bilgiyle, niyetle.</p>';

  $('result-body').innerHTML=html;
  showScreen('result');
  window.scrollTo({ top:0, behavior:'auto' });
  renderScores();
  var rn=$('res-name'); if(rn) rn.focus({preventScroll:true});
  $('share-btn').addEventListener('click', shareResult);
  $('retake-btn').addEventListener('click', function(){
    setAccent(null);
    showScreen('intro');
    window.scrollTo({ top:0, behavior:'auto' });
    offerPrevious();
    var sb=$('start-btn'); if(sb) sb.focus();
  });
  setupChat(P);
}
function card(title, body, tint){ return '<div class="card'+(tint?' tint':'')+'"><h4>'+title+'</h4><p>'+body+'</p></div>'; }
function pill(no){ var t=T[no]; return '<span class="pill"><span class="mini" style="background:'+t.renk+';color:'+txtOn(t.renk)+'">'+no+'</span><b>'+t.ad+'</b></span>'; }
function countUp(node, to){
  if(RM || !window.requestAnimationFrame){ node.textContent='%'+to; return; }
  var t0=null;
  function step(ts){ if(t0==null)t0=ts; var p=Math.min((ts-t0)/900,1); node.textContent='%'+Math.round(to*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); }
  requestAnimationFrame(step);
}
function renderScores(){
  var box=$('scores'), sc=state.scores; box.innerHTML='';
  sc.order.forEach(function(no, i){
    var t=T[no], pc=sc.pct[no];
    var row=el('div','score-row'+(no===state.primary?' top':''));
    row.style.setProperty('--row-c', t.renk);
    row.innerHTML='<span class="sn" style="background:'+t.renk+';color:'+txtOn(t.renk)+'">'+no+'</span>'
      + '<div class="score-track"><div class="score-val"></div></div>'
      + '<span class="pct">%0</span>';
    box.appendChild(row);
    (function(bar, num, pc, i){
      setTimeout(function(){ bar.style.width=pc+'%'; countUp(num, pc); }, RM?0:(120+i*70));
    })(row.querySelector('.score-val'), row.querySelector('.pct'), pc, i);
  });
}

/* ════════════════ PAYLAŞ ════════════════ */
function shareResult(){
  var P=T[state.primary];
  var txt=isChild()
    ? 'Dokuz Tip Mizaç Testi çocuk gözlem sonucu: en yakın eğilim '+P.no+' · '+P.ad+' ('+P.unvan+').'
    : 'Dokuz Tip Mizaç Testi sonucum: '+P.no+' · '+P.ad+' ('+P.unvan+'). Sen hangi mizaçtasın?';
  var url='https://raufenc.com/mizac/';
  if(navigator.share){ navigator.share({ title:'Dokuz Tip Mizaç Testi', text:txt, url:url }).catch(function(){}); }
  else if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(txt+' '+url).then(function(){ showToast('Sonuç panoya kopyalandı ✓'); }, function(){ showToast('Bağlantı: '+url); }); }
  else { showToast('Bağlantı: '+url); }
}

/* ════════════════ SOHBET ════════════════ */
var chatHistory=[]; var aiMode=null; var scrollPending=false;
function chatHTML(P, onCol){
  return '<div class="chat-wrap">'
    + '<div class="chat-head"><span class="av" style="background:'+P.renk+'"><svg viewBox="0 0 24 24" aria-hidden="true" style="stroke:'+onCol+'">'+GL[state.primary]+'</svg></span>'
    + '<div><div class="ht">'+(isChild()?'Ebeveyn Rehberi':'Mizaç Rehberin')+'</div><div class="hs">'+P.no+' · '+P.ad+' hakkında konuşalım</div></div>'
    + '<span class="chat-mode" id="chat-mode">rehber</span></div>'
    + '<div class="chat-log" id="chat-log" role="log" tabindex="0" aria-label="Sohbet"></div>'
    + '<div class="chat-sugg" id="chat-sugg"></div>'
    + '<div class="chat-input"><label class="sr-only" for="chat-in">'+(isChild()?'Çocuğunun mizacı hakkında bir soru yaz':'Mizacın hakkında bir soru yaz')+'</label>'
    + '<input id="chat-in" type="text" maxlength="500" placeholder="'+(isChild()?'Çocuğun hakkında bir şey sor...':'Mizacın hakkında bir şey sor...')+'" autocomplete="off" />'
    + '<button class="chat-send" id="chat-send" type="button" aria-label="Gönder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>'
    + '</div>';
}
var SUGG=[
  { q:'Nasıl gelişebilirim?' }, { q:'Stres altında ne oluyorum?' }, { q:'İlişkilerde nasılım?' },
  { q:'Gölge yönüm ne?' }, { q:'Hangi meslekler bana uyar?' }, { q:'Kanadım ne anlama geliyor?' }
];
var SUGG_CHILD=[
  { q:'Ona nasıl destek olurum?' }, { q:'Streste neye dikkat etmeliyim?' }, { q:'Okulda nasıl desteklenir?' },
  { q:'Gölge alanı ne?' }, { q:'Sınır koyarken ne yapayım?' }, { q:'Kanadı ne anlama geliyor?' }
];
function setupChat(P){
  chatHistory=[]; aiMode=null;
  var sugg=$('chat-sugg');
  (isChild()?SUGG_CHILD:SUGG).forEach(function(s){ var b=el('button','sugg',s.q); b.type='button'; b.addEventListener('click', function(){ sendMessage(s.q); }); sugg.appendChild(b); });
  $('chat-send').addEventListener('click', function(){ var v=$('chat-in').value.trim(); if(v) sendMessage(v); });
  $('chat-in').addEventListener('keydown', function(e){
    if(e.key==='Enter'){ if(e.isComposing||e.keyCode===229) return; e.preventDefault(); var v=this.value.trim(); if(v) sendMessage(v); }
  });
  var sc=state.scores;
  var greet=isChild()
    ? 'Selam. Gözlemlerinde çocuğun için en yakın eğilim <b>'+P.no+' · '+P.ad+'</b> ('+P.unvan+') görünüyor. Bunu kesin etiket değil, ebeveynlikte dikkat edilecek bir ihtiyaç haritası gibi okuyalım.'
    : 'Selam! Cevaplarında en baskın mizaç eğilimin <b>'+P.no+' · '+P.ad+'</b> ('+P.unvan+') çıktı. Bu eğilimin <b>temel arzusu</b>: '+P.temelArzu;
  if(sc && sc.gap<=8 && sc.mode!=='dejenere'){ var s2=sc.order[1]; greet+='<br><br><i>Not: '+s2+' '+T[s2].ad+' eğilimi de yanı başında ('+sc.gap+' puan fark); ikisini birlikte okumak iyi olur.</i>'; }
  if(sc && sc.mode==='dejenere') greet+='<br><br><i>Not: Profil tek bir tipe net kapanmadı; soruları rehberlik için kullanıp kesin hüküm vermeyelim.</i>';
  greet+='<br><br>Aşağıdaki sorulardan birine dokun ya da merak ettiğini doğrudan yaz — birlikte netleştirelim.';
  botSay(greet, false);
}
function scheduleScroll(){ if(scrollPending) return; scrollPending=true; requestAnimationFrame(function(){ var log=$('chat-log'); if(log) log.scrollTop=log.scrollHeight; scrollPending=false; }); }
function addUserMsg(text){ var log=$('chat-log'); var m=el('div','msg user'); m.textContent=text; log.appendChild(m); scheduleScroll(); return m; }
function botSay(html, useTyping){
  var log=$('chat-log'); var m=el('div','msg bot'); log.appendChild(m);
  if(useTyping && !RM) typeWriter(m, html); else m.innerHTML=safeRich(html);
  scheduleScroll();
  announce('chat-live', toPlain(html));
  return m;
}
function typeWriter(node, html){
  var tmp=el('div'); tmp.innerHTML=safeRich(html);
  node.innerHTML='';
  while(tmp.firstChild) node.appendChild(tmp.firstChild);
  var tns=[]; (function walk(n){ for(var c=n.firstChild;c;c=c.nextSibling){ if(c.nodeType===3) tns.push({node:c, full:c.nodeValue||''}); else if(c.nodeType===1) walk(c); } })(node);
  tns.forEach(function(t){ t.node.nodeValue=''; });
  var ti=0, ci=0;
  var timer=setInterval(function(){
    if(ti>=tns.length){ clearInterval(timer); return; }
    var t=tns[ti]; ci+=2;
    if(ci>=t.full.length){ t.node.nodeValue=t.full; ti++; ci=0; } else t.node.nodeValue=t.full.slice(0,ci);
    scheduleScroll();
  }, 16);
}
function showTyping(){ var log=$('chat-log'); var t=el('div','msg bot','<span class="typing" aria-hidden="true"><i></i><i></i><i></i></span>'); t.id='typing-ind'; log.appendChild(t); scheduleScroll(); }
function hideTyping(){ var t=$('typing-ind'); if(t) t.remove(); }
function setChatMode(live){
  if(aiMode===live) return; aiMode=live;
  var m=$('chat-mode'); if(!m) return;
  m.textContent = live ? 'canlı yapay zekâ' : 'rehber';
  m.classList.toggle('live', live);
}
function sendMessage(text){
  text=String(text).slice(0,1000).trim(); if(!text) return;
  $('chat-in').value='';
  addUserMsg(text);
  chatHistory.push({ role:'user', content:text });
  showTyping();
  tryAI(text).then(function(reply){
    hideTyping(); setChatMode(true);
    chatHistory.push({ role:'assistant', content: toPlain(reply) });
    botSay(reply, true);
  }).catch(function(){
    hideTyping(); setChatMode(false);
    var ans=guideAnswer(text);
    chatHistory.push({ role:'assistant', content: toPlain(ans) });
    botSay(ans, true);
  });
}
function topScores(){ return state.scores.order.slice(0,3).map(function(n){ return n+':%'+state.scores.pct[n]; }).join(', '); }
function tryAI(text){
  var P=T[state.primary];
  var payload={ tip:P.no, tipAdi:P.ad, unvan:P.unvan, merkez:MERK[P.merkez].ad, kanat:state.wing, ozet:P.ozet,
    audience: state.audience, quality: state.scores && state.scores.quality ? state.scores.quality.label : null,
    scores: state.scores ? topScores() : null, history: chatHistory.slice(-8), message:text };
  return fetch('/api/mizac-sohbet', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
    .then(function(res){ if(!res.ok) throw new Error('http '+res.status); return res.json(); })
    .then(function(d){ if(d && d.reply && !d.fallback) return d.reply; throw new Error('fallback'); });
}

/* — Yerleşik rehber: niyet eşleştirmeli cevap — */
function guideAnswer(text){
  var P=T[state.primary];
  var q=String(text).toLocaleLowerCase('tr');
  function has(){ for(var i=0;i<arguments.length;i++){ if(q.indexOf(arguments[i])>=0) return true; } return false; }
  var gt=OK.gelisim[state.primary], st=OK.stres[state.primary], sc=state.scores;

  if(isChild()){
    var cg=childGuide(state.primary);
    if(has('destek','geliş','gelis','büyü','buyu','yardım','yardim','nasıl','nasil','ebeveyn'))
      return 'Bu eğilimde en iyi destek, çocuğun temel ihtiyacını görüp davranışı etiketlememektir.<br><br><b>4 rehberlik anahtarı:</b><br>• '+cg.buyume.join('<br>• ');
    if(has('stres','zorlan','bunal','kötü','kotu','baskı','baski','sıkış','tıkan','panik'))
      return 'Stres altında <b>'+st+' '+T[st].ad+'</b> tarafına benzeyen tepkiler görülebilir: '+P.stres.metin+'<br><br>Çocuk için bunu kesin tip değişimi gibi değil, zorlanınca ortaya çıkan bir baş etme biçimi gibi oku. Sakin sınır, duygu adlandırma ve küçük adım genelde iyi çalışır.';
    if(has('okul','ders','öğren','ogren','öğretmen','ogretmen','sınıf','sinif'))
      return cg.ortam;
    if(has('ilişki','iliski','arkadaş','arkadas','kardeş','kardes','aile'))
      return cg.iliski;
    if(has('sınır','sinir','kural','disiplin','öfke','ofke','inat'))
      return 'Sınır koyarken iki şeyi birlikte tut: sıcak bağ ve net çerçeve. Bu profil için işe yarayan yön: '+cg.buyume[0]+' Ayrıca kuralı kişiliğine değil davranışa bağla; "sen böylesin" yerine "bu davranışın sonucu şu" dili daha koruyucudur.';
    if(has('kanat')){
      var cw=state.wing, ck=KAN[state.primary], cother=(ck[0]===cw?ck[1]:ck[0]);
      return 'Kanat, ana eğilime komşu mizacın kattığı renktir. Bu gözlemde baskın kanat <b>'+cw+' '+T[cw].ad+'</b>: '+T[cw].ozet+'<br><br>Diğer kanat ('+cother+' '+T[cother].ad+') da gelişimle veya farklı ortamlarda görünebilir.';
    }
    if(has('güçlü','guclu','iyi yön','avantaj','artı','arti','yetenek'))
      return '<b>Gözlenen güçlü yönler:</b><br>• '+P.gucluYonler.join('<br>• ');
    if(has('gölge','golge','zorluk','zor','eksik','sorun'))
      return '<b>Dikkat isteyen alan:</b> '+P.golge+'<br><br>Bu bir kusur listesi değil; çocuğun zorlanınca hangi ihtiyacı saklayabileceğini anlamak için bir ipucu.';
    if(has('emin','kesin','doğru mu','dogru mu','yanlış','yanlis','teşhis','teshis'))
      return 'Bu sonuç kesin teşhis değildir. Ebeveyn gözlemine dayalı bir eğilim haritasıdır.'+(sc&&sc.quality?'<br><br><b>Okuma güveni:</b> '+sc.quality.label+' ('+sc.quality.score+'/100). ':' ')+(sc&&sc.gap<=8?'İlk iki eğilim yakın olduğu için '+sc.order[0]+' '+T[sc.order[0]].ad+' ile '+sc.order[1]+' '+T[sc.order[1]].ad+' birlikte okunmalı.':'Farklı ortam ve öğretmen/diğer ebeveyn gözlemiyle doğrulamak iyi olur.');
    if(has('selam','merhaba','teşekkür','tesekkur','sağ ol','sag ol'))
      return 'Buradayım. Çocuğun için en faydalı okuma, davranışın arkasındaki ihtiyacı görmek: güven mi, değer mi, özgürlük mü, huzur mu? Bir durumu anlatırsan birlikte daha somut bakabiliriz.';
    return 'Bu gözlemde çocuğun için en yakın eğilim <b>'+P.no+' '+P.ad+'</b>. Bunu etiket gibi değil, ihtiyaç haritası gibi okuyalım.<br><br>Pratik başlangıç: '+cg.buyume[0]+' Dilersen okul, arkadaşlık, sınır koyma veya stres anlarını ayrıca sorabilirsin.';
  }

  if(has('geliş','gelis','büyü','buyu','iyileş','iyiles','nasıl daha','ilerle','olgunlaş'))
    return 'Senin gelişim yolun <b>'+gt+' '+T[gt].ad+'</b> yönünde açılıyor: '+P.gelisim.metin+'<br><br>Şu dört anahtar sana özel:<br>• '+P.buyume.join('<br>• ');
  if(has('stres','zorlan','bunal','kötü','kotu','baskı','baski','sıkış','tıkan','panik'))
    return 'Stres altında <b>'+st+' '+T[st].ad+'</b> tarafına kayarsın: '+P.stres.metin+'<br><br>Fark etmen yeter: bu kayışı sezdiğinde dur, nefes al ve gelişim yönün olan '+gt+'\'e bilinçle yönel.';
  if(has('ilişki','iliski','aşk','ask','sevgili','eş','es ','evlilik','partner','arkadaş','arkadas'))
    return P.iliskiler;
  if(has('iş','is ','meslek','kariyer','çalış','calis','bölüm','bolum','job'))
    return P.is+'<br><br><b>Sana uygun roller:</b> '+P.roller+'.';
  if(has('korku'))
    return 'Senin <b>temel korkun</b> şu: '+P.temelKorku+'<br><br>Bu korku kötü değil; mizacının pusulası. Onu tanıdıkça üzerindeki gücü azalır.';
  if(has('arzu','iste','istiyor','motiv','neden','isterim','peşinde','pesinde'))
    return 'Seni en derinden harekete geçiren şey: '+P.motivasyon+'<br><br><b>Temel arzun:</b> '+P.temelArzu;
  if(has('kanat')){
    var w=state.wing, k=KAN[state.primary], other=(k[0]===w?k[1]:k[0]);
    return 'Çekirdek tipin '+P.no+', ama yanına komşu tipler renk katar. Sende baskın kanat <b>'+w+' '+T[w].ad+'</b>: '+T[w].ozet+'<br><br>Diğer kanadın ('+other+' '+T[other].ad+') zayıf da olsa içinde mevcut.';
  }
  if(has('güçlü','guclu','iyi yön','avantaj','artı','arti','yetenek'))
    return '<b>Güçlü yönlerin:</b><br>• '+P.gucluYonler.join('<br>• ');
  if(has('zayıf','zayif','zorluk','kusur','gölge','golge','eksik','sorun','kötü yön'))
    return '<b>Gölgen:</b> '+P.golge+'<br><br><b>Başlıca zorlukların:</b><br>• '+P.zorluklar.join('<br>• ');
  if(has('tutku','günah','gunah','nefs','öfke','ofke','gurur','kıskan','kiskan','cimri','tembel'))
    return 'Her mizacın bir gölge tutkusu ve onu dengeleyen bir erdemi vardır.<br><br>Senin gölge tutkun: <b>'+P.tutku+'</b>. Yöneleceğin erdem ise <b>'+P.erdem+'</b>.<br>'+P.golge;
  if(has('merkez','triad','beden','kalp','zihin')){
    var mk=MERK[P.merkez];
    return 'Sen <b>'+mk.ad+'</b> ('+mk.altAd+') içindesin. '+mk.aciklama+' (Tipler '+mk.tipler.join(', ')+' burada yer alır.)';
  }
  if(has('uyum','hangi tip','anlaş','anlas','eşleş','esles','birlikte','geçin','gecin'))
    return 'Mizaçlar arası uyum sabit bir kural değildir; her eşleşme, iki tarafın olgunluk düzeyine bağlıdır. Senin için en besleyici ilişki, '+gt+' '+T[gt].ad+' yönündeki gelişimini destekleyen, gölge tutkun konusunda sana ayna tutabilen biriyle olur. Kendi merkezinden ('+MERK[P.merkez].ad+') farklı bir merkezin dengesi de seni tamamlar.';
  if(has('doğru mu','dogru mu','emin','kesin','yanlış','yanlis','değil mi','degil mi','sınır','sinir'))
    return 'Bu test bir teşhis değil, bir aynadır. '+P.no+' '+P.ad+' çıkması, çoğu cevabının bu mizacın çekirdeğiyle örtüştüğü anlamına gelir.'+ (sc&&sc.gap<=8?(' Üstelik ikincil eğilimin ('+sc.order[1]+' '+T[sc.order[1]].ad+') yalnız %'+sc.gap+' geride; ikisini birlikte okumak seni daha iyi anlatır.'):' Tam oturmadıysa ikincil eğilimine de bakmanı öneririm.');
  if(has('selam','merhaba','nasılsın','teşekkür','tesekkur','sağ ol','sag ol'))
    return 'Ne demek, buradayım. '+P.ad+' mizacının hangi yönünü merak ediyorsan — gelişimini, ilişkilerini, gölgeni — sorman yeter.';

  return 'Güzel soru. '+P.ad+' mizacı için şunu söyleyebilirim: özünde '+P.ozet.charAt(0).toLocaleLowerCase('tr')+P.ozet.slice(1)+'<br><br>Biraz daha somutlaştırabilirsen yardımcı olurum. Dilersen şunlardan birini sor: <i>gelişim yolum, stres tepkim, ilişkilerim, gölge tutkum</i> ya da <i>bana uygun meslekler</i>.';
}

/* ════════════════ YARDIMCI ════════════════ */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){ if(s.id!==id) s.classList.remove('active'); });
  $(id).classList.add('active');
}
var toastTimer;
function showToast(msg){ var t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(function(){ t.classList.remove('show'); }, 2800); }

/* Eski radiogroup fallback'i için klavye gezinmesi */
function likertKeydown(e){
  var box=$('likert'); if(!box) return;
  var radios=Array.prototype.slice.call(box.querySelectorAll('.lk'));
  if(!radios.length) return;
  var cur=radios.indexOf(document.activeElement); if(cur<0) cur=0;
  var next=cur, act=false;
  switch(e.key){
    case 'ArrowRight': case 'ArrowDown': next=(cur+1)%5; act=true; break;
    case 'ArrowLeft': case 'ArrowUp': next=(cur+4)%5; act=true; break;
    case 'Home': next=0; act=true; break;
    case 'End': next=4; act=true; break;
    case ' ': case 'Enter': e.preventDefault(); e.stopPropagation(); answer(cur+1); return;
    default: return;
  }
  if(act){
    e.preventDefault(); e.stopPropagation();
    radios.forEach(function(r,i){ r.setAttribute('tabindex', i===next?'0':'-1'); });
    radios[next].focus();
  }
}

/* Global klavye (1-5 cevap, oklar soru gezinme) */
document.addEventListener('keydown', function(e){
  if(!$('test') || !$('test').classList.contains('active')) return;
  if($('calc') && $('calc').classList.contains('on')) return;
  if(state.locking || state.finishing) return;
  var tag=(e.target && e.target.tagName || '').toUpperCase();
  if(tag==='INPUT' || tag==='TEXTAREA') return;
  var inLikert = e.target && e.target.closest && e.target.closest('#likert');
  if(e.key>='1' && e.key<='5'){ e.preventDefault(); answer(+e.key); }
  else if(e.key==='ArrowLeft' && !inLikert){ e.preventDefault(); prev(); }
  else if(e.key==='ArrowRight' && !inLikert){ e.preventDefault(); nextManual(); }
});

/* başlat */
document.addEventListener('DOMContentLoaded', function(){
  initIntro();
  $('likert').addEventListener('keydown', likertKeydown);
  $('prev-btn').addEventListener('click', prev);
  $('skip-btn').addEventListener('click', function(){
    if(state.locking || state.finishing) return;
    state.answers[state.idx]=3;
    state.answerTimes[state.idx]=Math.max(0, Date.now()-state.questionSeenAt);
    announce('q-live', (isChild()?'Emin değilim':'Kararsız')+' olarak işaretlendi.');
    nextManual();
  });
});
})();
