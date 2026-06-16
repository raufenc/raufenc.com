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
  len: 'dengeli', perType: 5,
  sorular: [], idx: 0, answers: [],
  scores: null, primary: null, wing: null,
  locking: false, finishing: false, advTimer: null
};
var LEN = { hizli:{n:3,dk:'4 dakika'}, dengeli:{n:5,dk:'7 dakika'}, derin:{n:8,dk:'12 dakika'} };
var LK_LABEL = ['Hiç katılmıyorum','Pek katılmıyorum','Kararsızım','Katılıyorum','Tamamen katılıyorum'];
var LK_SIGN  = ['−','–','·','+','＋'];

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
function isDark(){ return !document.documentElement.classList.contains('light'); }

/* ── Aktif rengi ayarla (tema duyarlı) ── */
function setAccent(no){
  var r=document.documentElement.style;
  if(!no || !T[no]){
    r.setProperty('--c','#c8a46e'); r.setProperty('--c-soft','rgba(200,164,110,.14)'); r.setProperty('--c-text','#c8a46e');
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

  $('len-pick').querySelectorAll('button').forEach(function(b){
    b.addEventListener('click', function(){
      $('len-pick').querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); x.setAttribute('aria-pressed','false'); });
      b.classList.add('on'); b.setAttribute('aria-pressed','true');
      state.len=b.getAttribute('data-len'); state.perType=LEN[state.len].n;
      $('meta-min').textContent=LEN[state.len].dk;
    });
  });
  $('start-btn').addEventListener('click', start);
  offerPrevious();
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
  btn.textContent='↩ Önceki sonucun: '+d.primary+' · '+t.ad+' — tekrar gör';
  btn.addEventListener('click', function(){
    var fresh=readSavedResult(); if(!fresh){ slot.innerHTML=''; return; }
    state.scores=fresh.scores; state.primary=fresh.primary; state.wing=fresh.wing||null;
    renderResult(true);
  });
  slot.appendChild(btn);
}

/* ════════════════ TEST ════════════════ */
function pickQuestions(){
  var byType={}; for(var i=1;i<=9;i++) byType[i]={n:[],r:[]};
  S.forEach(function(q){ (q.ters ? byType[q.tip].r : byType[q.tip].n).push(q); });
  var k=state.perType, revN = k>=8 ? 2 : 1;
  var list=[];
  for(var t=1;t<=9;t++){
    var rv=shuffle(byType[t].r.slice()).slice(0, Math.min(revN, byType[t].r.length));
    var need=k-rv.length;
    var nm=shuffle(byType[t].n.slice()).slice(0, Math.min(need, byType[t].n.length));
    list=list.concat(rv, nm);
  }
  return shuffle(list);
}
function start(){
  state.sorular=pickQuestions();
  state.idx=0; state.answers=new Array(state.sorular.length).fill(null);
  state.finishing=false; state.locking=false; clearTimeout(state.advTimer);
  $('q-tot').textContent=state.sorular.length;
  $('prog-bar').setAttribute('aria-valuemax', state.sorular.length);
  showScreen('test');
  window.scrollTo({ top:0, behavior:'auto' });
  buildLikert();
  renderQuestion(true);
  focusQuestion();
  if(window.gtag) gtag('event','mizac_test_basladi',{event_category:'mizac',event_label:state.len});
}
function buildLikert(){
  var box=$('likert'); box.innerHTML='';
  for(var v=1;v<=5;v++){ (function(val){
    var b=el('button','lk'+(val<3?' disagree':'')+(val>3?' agree':''));
    b.type='button';
    b.setAttribute('role','radio');
    b.setAttribute('aria-checked','false');
    b.setAttribute('aria-label', val+' — '+LK_LABEL[val-1]);
    b.setAttribute('data-v', val);
    b.setAttribute('tabindex', val===1?'0':'-1');
    b.innerHTML='<span class="lk-sign" aria-hidden="true">'+LK_SIGN[val-1]+'</span>';
    b.addEventListener('click', function(){ answer(val); });
    box.appendChild(b);
  })(v); }
}
function updateLikertSelection(val){
  $('likert').querySelectorAll('.lk').forEach(function(b){
    var bv=+b.getAttribute('data-v'), on=(val!=null && bv===val);
    b.classList.toggle('sel', on);
    b.setAttribute('aria-checked', on?'true':'false');
    b.setAttribute('tabindex', val!=null ? (on?'0':'-1') : (bv===1?'0':'-1'));
  });
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
  $('q-text').textContent=q.metin;
  updateLikertSelection(state.answers[state.idx]);
  updateProgress();
  $('prev-btn').disabled=(state.idx===0);
  card.classList.remove('out-l','out-r'); card.classList.add('in');
  announce('q-live', 'Soru '+(state.idx+1)+' / '+state.sorular.length+'. '+q.metin);
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
  state.answers[state.idx]=val;
  updateLikertSelection(val);
  var sel=$('likert').querySelector('.lk.sel');
  if(sel && !RM){ sel.classList.remove('likert-pulse'); void sel.offsetWidth; sel.classList.add('likert-pulse'); }
  clearTimeout(state.advTimer);
  state.advTimer=setTimeout(function(){
    if(state.idx>=state.sorular.length-1) finish();
    else transitionTo(1, function(){ state.idx++; });
  }, RM?60:240);
}
function nextManual(){
  if(state.locking || state.finishing) return;
  if(state.idx>=state.sorular.length-1) finish();
  else transitionTo(1, function(){ state.idx++; });
}
function prev(){
  if(state.locking || state.finishing) return;
  if(state.idx>0) transitionTo(-1, function(){ state.idx--; });
}

/* ════════════════ PUANLAMA ════════════════ */
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
  var mode = spread<12 ? 'dejenere' : (gap<6 ? 'esbaskin' : 'net');
  state.scores={ pct:pct, raw:raw, cnt:cnt, order:order, top:top, second:second, gap:gap, spread:spread, mode:mode };
  state.primary=order[0];
  var w=KAN[state.primary];
  state.wing = pct[w[0]]>=pct[w[1]] ? w[0] : w[1];
}

/* ════════════════ HESAPLAMA ANİMASYONU ════════════════ */
function finish(){
  if(state.finishing) return;
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
  var subs=['Cevapların dokuz tip üzerinde değerlendiriliyor','Merkez ve kanat hesaplanıyor','Gölge ve gelişim yönün çıkarılıyor','Mizaç profilin hazırlanıyor'];
  var si=0; $('calc-sub').textContent=subs[0];
  var iv=setInterval(function(){ si=(si+1)%subs.length; $('calc-sub').textContent=subs[si]; }, 650);
  setTimeout(function(){
    clearInterval(iv);
    calc.classList.remove('on');
    testEl.removeAttribute('aria-hidden');
    try{ testEl.removeAttribute('inert'); }catch(e){}
    saveResult();
    renderResult(false);
    if(window.gtag) gtag('event','mizac_test_bitti',{event_category:'mizac',event_label:'tip_'+state.primary});
  }, RM?600:2700);
}
function saveResult(){
  try{ localStorage.setItem('mizac-sonuc', JSON.stringify({ primary:state.primary, wing:state.wing, scores:state.scores, len:state.len })); }catch(e){}
}

/* ════════════════ SONUÇ ════════════════ */
function belirginlik(gap){ return gap>=14?'yüksek':(gap>=6?'orta':'sınırda'); }

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
  var w=state.wing || (function(){ var ww=KAN[state.primary]; return sc.pct[ww[0]]>=sc.pct[ww[1]]?ww[0]:ww[1]; })();
  state.wing=w;
  var merk=MERK[P.merkez], gt=OK.gelisim[state.primary], st=OK.stres[state.primary];
  var secondNo=sc.order[1];
  var onCol=txtOn(P.renk);

  var html='';
  /* HERO */
  html+='<div class="res-hero">'
    + '<div class="res-kicker">'+(sc.mode==='dejenere'?'En öne çıkan eğilim':'Mizaç tipin')+'</div>'
    + '<div class="res-bignum">'+P.no+'</div>'
    + '<div class="res-glyph" style="background:'+P.renk+'"><svg viewBox="0 0 24 24" aria-hidden="true" style="stroke:'+onCol+'">'+GL[state.primary]+'</svg></div>'
    + '<h1 class="res-name serif" id="res-name" tabindex="-1">'+P.ad+'</h1>'
    + '<div class="res-unvan">'+P.unvan+'  ·  '+P.no+'w'+w+' (kanat '+w+')</div>'
    + '<p class="res-ozet">'+P.ozet+'</p>';
  if(sc.mode==='net'){
    html+='<div class="res-conf">Belirginlik: <b>'+belirginlik(sc.gap)+'</b> · İkincil eğilim: '+secondNo+' '+T[secondNo].ad+'</div>';
  } else if(sc.mode==='esbaskin'){
    html+='<div class="res-conf">İkincil eğilim '+secondNo+' '+T[secondNo].ad+' yalnızca <b>%'+sc.gap+'</b> geride — eş-baskın bir profilin var.</div>';
  } else {
    html+='<div class="res-conf">Cevapların birçok mizaca yakın dağıldı.</div>';
  }
  html+='</div>';

  /* Mod uyarısı */
  if(sc.mode==='dejenere'){
    html+='<div class="res-flag"><b>Net bir baskın mizaç belirmedi.</b> Cevapların birden çok tipe yakın dağıldı; bu da bir bilgidir — birçok mizacın dengeli bir karışımı olabilirsin. Daha ayırt edici (uçlara yakın) cevaplarla ya da <b>Derin</b> modla tekrar denersen profilin netleşebilir. Aşağıda yine de en öne çıkan eğilimlerin var.</div>';
  } else if(sc.mode==='esbaskin'){
    html+='<div class="res-flag soft">Profilin <b>'+P.no+' '+P.ad+'</b> ile <b>'+secondNo+' '+T[secondNo].ad+'</b> arasında dengeli. İkisini birlikte okumak seni daha iyi anlatır; aşağıdaki haritada her ikisi de öne çıkar.</div>';
  }

  /* HARİTA */
  html+='<figure class="res-map">'+emblemSVG({ me:state.primary, wings:KAN[state.primary], arrows:true, ids:true, draw:true })
    + '<figcaption class="map-legend">'
    + '<span><i style="background:'+P.renk+'"></i> Tipin ('+P.no+')</span>'
    + '<span><i style="background:#3f9d6c"></i> Gelişim → '+gt+'</span>'
    + '<span><i class="dash" style="background:#cf5b54"></i> Stres → '+st+'</span>'
    + '<span><i style="background:transparent;border:2px solid '+P.renk+'"></i> Kanatlar '+KAN[state.primary][0]+' & '+KAN[state.primary][1]+'</span>'
    + '</figcaption></figure>';

  /* SKOR GRAFİĞİ */
  html+='<h2 class="section-title"><span class="bar"></span>Dokuz tip dağılımın</h2>';
  html+='<div class="scores" id="scores"></div>';

  /* TEMEL */
  html+='<h2 class="section-title"><span class="bar"></span>Mizacının çekirdeği</h2>';
  html+='<div class="cards two">'+card('Temel arzu', P.temelArzu, true)+card('Temel korku', P.temelKorku, true)+'</div>';
  html+='<div class="cards" style="margin-top:14px">'+card('Seni harekete geçiren', P.motivasyon, false)+'</div>';

  /* GÜÇLÜ / ZORLUK */
  html+='<h2 class="section-title"><span class="bar"></span>Güçlü yönlerin</h2>';
  html+='<ul class="lst">'+P.gucluYonler.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
  html+='<h2 class="section-title"><span class="bar"></span>Gölge yönün & zorlukların</h2>';
  html+='<div class="card tint" style="margin-bottom:14px"><p>'+P.golge+'</p></div>';
  html+='<ul class="lst warn">'+P.zorluklar.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';

  /* TUTKU / ERDEM */
  html+='<h2 class="section-title"><span class="bar"></span>Nefsinin eğilimi & erdemin</h2>';
  html+='<div class="cards two">'+card('Gölge tutku', P.tutku, true)+card('Yöneleceğin erdem', P.erdem, true)+'</div>';

  /* MERKEZ & KANAT */
  html+='<h2 class="section-title"><span class="bar"></span>Merkez & kanat</h2>';
  html+='<div class="card"><h4>'+merk.ad+' · '+merk.altAd+'</h4><p>'+merk.aciklama+' (Bu merkezde tipler '+merk.tipler.join(', ')+' yer alır.)</p></div>';
  html+='<div class="pill-row" style="margin-top:14px">'+pill(KAN[state.primary][0])+pill(KAN[state.primary][1])+'</div>';
  html+='<p class="note-line">Kanat, çekirdek tipine komşu tiplerin kattığı renktir. Sende baskın kanat <b>'+w+' '+T[w].ad+'</b>: '+T[w].ozet+'</p>';

  /* STRES / GELİŞİM */
  html+='<h2 class="section-title"><span class="bar"></span>Stres & gelişim yönün</h2>';
  html+='<div class="arrows-2">'
    + '<div class="arrow-card grow"><div class="lab"><span class="ic" style="background:#3f9d6c;color:'+txtOn('#3f9d6c')+'">'+gt+'</span>Gelişim → '+T[gt].ad+'</div><p>'+P.gelisim.metin+'</p></div>'
    + '<div class="arrow-card stress"><div class="lab"><span class="ic" style="background:#cf5b54;color:'+txtOn('#cf5b54')+'">'+st+'</span>Stres → '+T[st].ad+'</div><p>'+P.stres.metin+'</p></div>'
    + '</div>';

  /* İLİŞKİ / İŞ */
  html+='<h2 class="section-title"><span class="bar"></span>İlişkiler & iş hayatı</h2>';
  html+='<div class="cards two">'+card('İlişkilerde', P.iliskiler, false)
    + card('İş & meslek', P.is+' <br><span class="muted-sm">Sık görülen roller: '+P.roller+'</span>', false)+'</div>';

  /* BÜYÜME */
  html+='<h2 class="section-title"><span class="bar"></span>Gelişim için 4 anahtar</h2>';
  html+='<ul class="lst">'+P.buyume.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';

  /* SOHBET */
  html+='<h2 class="section-title"><span class="bar"></span>Mizacınla sohbet et</h2>';
  html+=chatHTML(P, onCol);

  /* AKSİYONLAR */
  html+='<div class="res-actions">'
    + '<button class="act primary" id="share-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg> Sonucu paylaş</button>'
    + '<button class="act ghost" id="retake-btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Testi tekrar çöz</button>'
    + '</div>';
  html+='<p class="res-foot">Dokuz Tip Mizaç Modeli (DTMM / Enneagram), kişilik psikolojisinden ilham alan bir mizaç çerçevesidir; '
    + 'bilimsel kesinlikte bir teşhis değil, kendini tanımak için bir aynadır. Mizaç doğuştan gelir ama kader değildir — gelişim her tip için mümkündür.<br>'
    + '<a href="/">raufenc.com</a> · Bilgiyle, niyetle.</p>';

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
  var txt='Dokuz Tip Mizaç Testi sonucum: '+P.no+' · '+P.ad+' ('+P.unvan+'). Sen hangi mizaçtasın?';
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
    + '<div><div class="ht">Mizaç Rehberin</div><div class="hs">'+P.no+' · '+P.ad+' hakkında konuşalım</div></div>'
    + '<span class="chat-mode" id="chat-mode">rehber</span></div>'
    + '<div class="chat-log" id="chat-log" role="log" tabindex="0" aria-label="Sohbet"></div>'
    + '<div class="chat-sugg" id="chat-sugg"></div>'
    + '<div class="chat-input"><label class="sr-only" for="chat-in">Mizacın hakkında bir soru yaz</label>'
    + '<input id="chat-in" type="text" maxlength="500" placeholder="Mizacın hakkında bir şey sor…" autocomplete="off" />'
    + '<button class="chat-send" id="chat-send" type="button" aria-label="Gönder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>'
    + '</div>';
}
var SUGG=[
  { q:'Nasıl gelişebilirim?' }, { q:'Stres altında ne oluyorum?' }, { q:'İlişkilerde nasılım?' },
  { q:'Gölge yönüm ne?' }, { q:'Hangi meslekler bana uyar?' }, { q:'Kanadım ne anlama geliyor?' }
];
function setupChat(P){
  chatHistory=[]; aiMode=null;
  var sugg=$('chat-sugg');
  SUGG.forEach(function(s){ var b=el('button','sugg',s.q); b.type='button'; b.addEventListener('click', function(){ sendMessage(s.q); }); sugg.appendChild(b); });
  $('chat-send').addEventListener('click', function(){ var v=$('chat-in').value.trim(); if(v) sendMessage(v); });
  $('chat-in').addEventListener('keydown', function(e){
    if(e.key==='Enter'){ if(e.isComposing||e.keyCode===229) return; e.preventDefault(); var v=this.value.trim(); if(v) sendMessage(v); }
  });
  var sc=state.scores;
  var greet='Selam! Cevaplarında en baskın mizaç eğilimin <b>'+P.no+' · '+P.ad+'</b> ('+P.unvan+') çıktı. Bu eğilimin <b>temel arzusu</b>: '+P.temelArzu;
  if(sc && sc.gap<=8 && sc.mode!=='dejenere'){ var s2=sc.order[1]; greet+='<br><br><i>Not: '+s2+' '+T[s2].ad+' eğilimin de yanı başında (yalnız %'+sc.gap+' geride); istersen onu da yoklayalım.</i>'; }
  greet+='<br><br>Aşağıdaki sorulardan birine dokun ya da merak ettiğini doğrudan yaz — birlikte derinleşelim.';
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

/* Likert radiogroup klavye gezinmesi */
function likertKeydown(e){
  var box=$('likert'); if(!box) return;
  var radios=Array.prototype.slice.call(box.querySelectorAll('.lk'));
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
    announce('q-live', 'Kararsız olarak işaretlendi.');
    nextManual();
  });
});
})();
