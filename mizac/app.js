/* ============================================================
   DOKUZ TİP MİZAÇ TESTİ — app.js
   Test akışı · puanlama · enneagram · sonuç · sohbet
   ============================================================ */
(function(){
'use strict';
var M = window.MIZAC;
var T = M.TIPLER, S = M.SORULAR, MERK = M.MERKEZLER, OK = M.OKLAR, KAN = M.KANATLAR, GL = M.GLYPH;

/* ── Durum ── */
var state = {
  len: 'dengeli',
  perType: 5,
  sorular: [],
  idx: 0,
  answers: [],      // değer 1..5 (3 = kararsız/nötr), null = cevapsız
  scores: null,
  primary: null
};
var LEN = { hizli:{n:3,dk:'4 dakika'}, dengeli:{n:5,dk:'7 dakika'}, derin:{n:8,dk:'12 dakika'} };

/* ── Kısayollar ── */
function $(id){ return document.getElementById(id); }
function el(tag, cls, html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

/* ── Aktif rengi ayarla ── */
function setAccent(no){
  var c = no ? T[no].renk : 'var(--warm,#c8a46e)';
  var soft = no ? T[no].renkSoft : 'rgba(200,164,110,.14)';
  var ct = no ? T[no].renkText : 'var(--warm,#c8a46e)';
  var r = document.documentElement.style;
  r.setProperty('--c', T[no] ? T[no].renk : '#c8a46e');
  r.setProperty('--c-soft', soft);
  r.setProperty('--c-text', ct);
}

/* ════════════════ ENNEAGRAM GEOMETRİSİ ════════════════ */
var ORDER = [9,1,2,3,4,5,6,7,8];   // tepeden saat yönünde
var POS = (function(){
  var p={}, R=82, cx=100, cy=100;
  ORDER.forEach(function(num,i){
    var ang = (-90 + i*40) * Math.PI/180;
    p[num] = { x: cx + R*Math.cos(ang), y: cy + R*Math.sin(ang), ang:ang };
  });
  return p;
})();
function svgLine(a,b,cls){ return '<line class="'+cls+'" x1="'+POS[a].x.toFixed(1)+'" y1="'+POS[a].y.toFixed(1)+'" x2="'+POS[b].x.toFixed(1)+'" y2="'+POS[b].y.toFixed(1)+'"/>'; }

/* Amblemin tam SVG'sini üretir.
   opts: { me, wings:[], arrows:bool, ids:bool, decorative:bool } */
function emblemSVG(opts){
  opts = opts||{};
  var s = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">';
  if(opts.arrows){
    s += '<defs>'
      + '<marker id="ahg" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto"><path d="M0 0l6 3.2L0 6.4z" fill="#4eae7a"/></marker>'
      + '<marker id="ahs" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto"><path d="M0 0l6 3.2L0 6.4z" fill="#d66"/></marker>'
      + '</defs>';
  }
  var g = opts.decorative ? '<g class="spin">' : '<g>';
  s += g;
  s += '<circle class="ennea-circle" cx="100" cy="100" r="82"/>';
  // iç bağlantılar
  [[9,3],[3,6],[6,9]].forEach(function(p){ s+=svgLine(p[0],p[1],'ennea-line'); });
  [[1,4],[4,2],[2,8],[8,5],[5,7],[7,1]].forEach(function(p){ s+=svgLine(p[0],p[1],'ennea-line'); });
  s += '</g>';
  // gelişim / stres okları
  if(opts.arrows && opts.me){
    var me=opts.me;
    var gt=OK.gelisim[me], st=OK.stres[me];
    s += arrowPath(me, gt, 'grow', 'ahg');
    s += arrowPath(me, st, 'stress', 'ahs');
  }
  // düğümler
  ORDER.forEach(function(num){
    var P=POS[num], me=(opts.me===num), wing=(opts.wings&&opts.wings.indexOf(num)>=0);
    var cls='node'+(me?' me':'')+(wing?' wing':'');
    var r = me?15:(wing?11:(opts.decorative?9:9));
    var fill = me? T[num].renk : (wing? 'transparent' : (opts.decorative?T[num].renk:'var(--surface2,#eee)'));
    var stroke = wing? T[num].renk : (opts.decorative?'none':'var(--border,#ddd)');
    var op = opts.decorative? (me?1:.92) : (me?1:(wing?1:.85));
    s += '<g class="'+cls+'" data-no="'+num+'">';
    s += '<circle cx="'+P.x.toFixed(1)+'" cy="'+P.y.toFixed(1)+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2" opacity="'+op+'"/>';
    if(opts.ids!==false){
      var tcol = (me||opts.decorative)?'#fff':(wing?T[num].renk:'var(--text-secondary)');
      s += '<text x="'+P.x.toFixed(1)+'" y="'+P.y.toFixed(1)+'" style="fill:'+tcol+'">'+num+'</text>';
    }
    s += '</g>';
  });
  s += '</svg>';
  return s;
}
function arrowPath(a,b,cls,marker){
  // düğüm kenarından kenarına kısaltılmış çizgi
  var A=POS[a], B=POS[b];
  var dx=B.x-A.x, dy=B.y-A.y, len=Math.sqrt(dx*dx+dy*dy);
  var ux=dx/len, uy=dy/len;
  var x1=A.x+ux*17, y1=A.y+uy*17, x2=B.x-ux*15, y2=B.y-uy*15;
  return '<line class="arrow '+cls+'" x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" marker-end="url(#'+marker+')"/>';
}

/* ════════════════ GİRİŞ ════════════════ */
function initIntro(){
  // dekoratif amblem
  $('intro-emblem').innerHTML = emblemSVG({ decorative:true });
  // node tıklayınca o tipi önizle (basit)
  $('intro-emblem').querySelectorAll('.node').forEach(function(n){
    n.addEventListener('click', function(){
      var no=+n.getAttribute('data-no');
      showToast(T[no].no+' · '+T[no].ad+' — '+T[no].unvan);
    });
  });
  // tip rozetleri
  var chips = $('type-chips');
  for(var i=1;i<=9;i++){ (function(no){
    var t=T[no];
    var chip=el('button','type-chip');
    chip.innerHTML='<span class="dot" style="background:'+t.renk+'"><svg viewBox="0 0 24 24">'+GL[no]+'</svg></span>'+t.ad;
    chip.title=t.no+' · '+t.unvan+' — '+t.ozet;
    chip.addEventListener('click',function(){ showToast(t.no+' · '+t.ad+': '+t.ozet); });
    chips.appendChild(chip);
  })(i); }
  // uzunluk seçici
  $('len-pick').querySelectorAll('button').forEach(function(b){
    b.addEventListener('click',function(){
      $('len-pick').querySelectorAll('button').forEach(function(x){x.classList.remove('on');});
      b.classList.add('on');
      state.len=b.getAttribute('data-len');
      state.perType=LEN[state.len].n;
      $('meta-min').textContent=LEN[state.len].dk;
    });
  });
  $('start-btn').addEventListener('click', start);
  // önceki sonuç
  offerPrevious();
}
function offerPrevious(){
  try{
    var raw=localStorage.getItem('mizac-sonuc');
    if(!raw) return;
    var d=JSON.parse(raw);
    if(!d || !d.primary) return;
    var t=T[d.primary];
    var link=el('button','intro-meta','');
    link.style.cssText='background:none;border:none;margin-top:14px;color:var(--c-text);font-weight:600;text-decoration:underline;cursor:pointer;display:block;width:100%';
    link.textContent='↩ Önceki sonucun: '+d.primary+' · '+t.ad+' — tekrar gör';
    link.addEventListener('click',function(){
      state.scores=d.scores; state.primary=d.primary;
      renderResult(true);
    });
    $('start-btn').parentNode.appendChild(link);
  }catch(e){}
}

/* ════════════════ TEST ════════════════ */
function pickQuestions(){
  var byType={}; for(var i=1;i<=9;i++)byType[i]=[];
  S.forEach(function(q){ byType[q.tip].push(q); });
  var list=[];
  for(var t=1;t<=9;t++){
    var pool=shuffle(byType[t].slice());
    var k=Math.min(state.perType, pool.length);
    for(var j=0;j<k;j++) list.push(pool[j]);
  }
  return shuffle(list);
}
function start(){
  state.sorular=pickQuestions();
  state.idx=0;
  state.answers=new Array(state.sorular.length).fill(null);
  $('q-tot').textContent=state.sorular.length;
  showScreen('test');
  window.scrollTo(0,0);
  buildLikert();
  renderQuestion(true);
  if(window.gtag) gtag('event','mizac_test_basladi',{event_category:'mizac',event_label:state.len});
}
function buildLikert(){
  var box=$('likert'); box.innerHTML='';
  for(var v=1;v<=5;v++){ (function(val){
    var b=el('button','lk'+(val<3?' disagree':''));
    b.setAttribute('data-v',val);
    b.setAttribute('aria-label', val+' / 5');
    b.addEventListener('click',function(){ answer(val); });
    box.appendChild(b);
  })(v); }
}
function renderQuestion(first){
  var q=state.sorular[state.idx];
  var card=$('q-card');
  function paint(){
    $('q-no').textContent='SORU '+(state.idx+1);
    $('q-text').textContent=q.metin;
    var cur=state.answers[state.idx];
    $('likert').querySelectorAll('.lk').forEach(function(b){
      b.classList.toggle('sel', cur!=null && +b.getAttribute('data-v')===cur);
    });
    var pct=(state.idx)/state.sorular.length*100;
    $('prog-fill').style.width=pct+'%';
    $('q-cur').textContent=state.idx+1;
    $('prev-btn').disabled=(state.idx===0);
    card.classList.remove('out-l','out-r'); card.classList.add('in');
  }
  if(first){ paint(); return; }
  paint();
}
function transitionTo(dir, fn){
  var card=$('q-card');
  card.classList.remove('in');
  card.classList.add(dir>0?'out-l':'out-r');
  setTimeout(function(){
    fn();
    card.classList.remove('out-l','out-r');
    void card.offsetWidth;
    card.classList.add('in');
    renderQuestion(true);
  }, 300);
}
function answer(val){
  state.answers[state.idx]=val;
  // seçilen butonu vurgula + nabız
  $('likert').querySelectorAll('.lk').forEach(function(b){
    var on=(+b.getAttribute('data-v')===val);
    b.classList.toggle('sel',on);
    if(on){ b.classList.remove('likert-pulse'); void b.offsetWidth; b.classList.add('likert-pulse'); }
  });
  setTimeout(function(){
    if(state.idx>=state.sorular.length-1){ finish(); }
    else { transitionTo(1, function(){ state.idx++; }); }
  }, 240);
}
function nextManual(){
  if(state.idx>=state.sorular.length-1){ finish(); }
  else transitionTo(1, function(){ state.idx++; });
}
function prev(){ if(state.idx>0) transitionTo(-1, function(){ state.idx--; }); }

/* ════════════════ PUANLAMA ════════════════ */
function computeScores(){
  var raw={}; for(var i=1;i<=9;i++)raw[i]=0;
  var cnt={}; for(var k=1;k<=9;k++)cnt[k]=0;
  state.sorular.forEach(function(q,i){
    var v=state.answers[i];
    if(v==null) v=3;            // cevapsız → nötr
    raw[q.tip]+=(v-1);          // 1..5 → 0..4 puan
    cnt[q.tip]++;
  });
  var pct={};
  for(var t=1;t<=9;t++){
    var max=(cnt[t]||1)*4;
    pct[t]=Math.round(raw[t]/max*100);
  }
  // sıralama, beraberlik bozucu: ham puan, sonra tip no küçük
  var order=[];
  for(var n=1;n<=9;n++)order.push(n);
  order.sort(function(a,b){ return pct[b]-pct[a] || raw[b]-raw[a] || a-b; });
  state.scores={ pct:pct, raw:raw, order:order };
  state.primary=order[0];
  // kanat: komşulardan yüksek olan
  var w=KAN[state.primary];
  state.wing = pct[w[0]]>=pct[w[1]] ? w[0] : w[1];
}

/* ════════════════ HESAPLAMA ANİMASYONU ════════════════ */
function finish(){
  computeScores();
  $('prog-fill').style.width='100%';
  setAccent(state.primary);
  var calc=$('calc');
  $('calc-emblem').innerHTML=emblemSVG({ me:state.primary, decorative:false, ids:true });
  calc.classList.add('on');
  var subs=['Cevapların dokuz tip üzerinde değerlendiriliyor','Merkez ve kanat hesaplanıyor','Gölge ve gelişim yönün çıkarılıyor','Mizaç profilin hazırlanıyor'];
  var si=0; $('calc-sub').textContent=subs[0];
  var iv=setInterval(function(){ si=(si+1)%subs.length; $('calc-sub').textContent=subs[si]; },650);
  setTimeout(function(){
    clearInterval(iv);
    calc.classList.remove('on');
    saveResult();
    renderResult(false);
    if(window.gtag) gtag('event','mizac_test_bitti',{event_category:'mizac',event_label:'tip_'+state.primary});
  }, 2700);
}
function saveResult(){
  try{ localStorage.setItem('mizac-sonuc', JSON.stringify({ primary:state.primary, wing:state.wing, scores:state.scores, len:state.len, t:Date.now() })); }catch(e){}
}

/* ════════════════ SONUÇ ════════════════ */
function renderResult(fromSaved){
  var P=T[state.primary];
  setAccent(state.primary);
  var sc=state.scores;
  var w=state.wing || (function(){ var ww=KAN[state.primary]; return sc.pct[ww[0]]>=sc.pct[ww[1]]?ww[0]:ww[1]; })();
  state.wing=w;
  var merk=MERK[P.merkez];
  var gt=OK.gelisim[state.primary], st=OK.stres[state.primary];
  var conf=sc.pct[state.primary]; // baskınlık yüzdesi
  var secondNo=sc.order[1];

  var html='';
  /* HERO */
  html+='<div class="res-hero">'
    + '<div class="res-kicker">Mizaç tipin</div>'
    + '<div class="res-bignum">'+P.no+'</div>'
    + '<div class="res-glyph"><svg viewBox="0 0 24 24">'+GL[state.primary]+'</svg></div>'
    + '<div class="res-name serif">'+P.ad+'</div>'
    + '<div class="res-unvan">'+P.unvan+'  ·  '+P.no+'w'+w+' (kanat '+w+')</div>'
    + '<p class="res-ozet">'+P.ozet+'</p>'
    + '<div class="res-conf">Bu tip cevaplarınla <b>%'+conf+'</b> örtüşüyor · İkincil eğilim: '+secondNo+' '+T[secondNo].ad+'</div>'
    + '</div>';

  /* HARİTA */
  html+='<div class="res-map">'+emblemSVG({ me:state.primary, wings:KAN[state.primary], arrows:true, ids:true })+'</div>'
    + '<div class="map-legend">'
    + '<span><i style="background:'+P.renk+'"></i> Senin tipin ('+P.no+')</span>'
    + '<span><i style="background:#4eae7a"></i> Gelişim → '+gt+'</span>'
    + '<span><i style="background:#d66"></i> Stres → '+st+'</span>'
    + '<span><i style="background:transparent;border:2px solid '+P.renk+'"></i> Kanatlar '+KAN[state.primary][0]+' & '+KAN[state.primary][1]+'</span>'
    + '</div>';

  /* SKOR GRAFİĞİ */
  html+='<h3 class="section-title"><span class="bar"></span>Dokuz tip dağılımın</h3>';
  html+='<div class="scores" id="scores"></div>';

  /* TEMEL */
  html+='<h3 class="section-title"><span class="bar"></span>Mizacının çekirdeği</h3>';
  html+='<div class="cards two">'
    + card('Temel arzu', P.temelArzu, true)
    + card('Temel korku', P.temelKorku, true)
    + '</div>';
  html+='<div class="cards" style="margin-top:14px">'+card('Seni harekete geçiren', P.motivasyon, false)+'</div>';

  /* GÜÇLÜ / ZORLUK */
  html+='<h3 class="section-title"><span class="bar"></span>Güçlü yönlerin</h3>';
  html+='<ul class="lst">'+P.gucluYonler.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
  html+='<h3 class="section-title"><span class="bar"></span>Gölge yönün & zorlukların</h3>';
  html+='<div class="card tint" style="margin-bottom:14px"><p>'+P.golge+'</p></div>';
  html+='<ul class="lst warn">'+P.zorluklar.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';

  /* TUTKU / ERDEM */
  html+='<h3 class="section-title"><span class="bar"></span>Nefsinin eğilimi & erdemin</h3>';
  html+='<div class="cards two">'
    + card('Gölge tutku', P.tutku, true)
    + card('Yöneleceğin erdem', P.erdem, true)
    + '</div>';

  /* MERKEZ & KANAT */
  html+='<h3 class="section-title"><span class="bar"></span>Merkez & kanat</h3>';
  html+='<div class="card"><h4>'+merk.ad+' · '+merk.altAd+'</h4><p>'+merk.aciklama+' Bu merkezin baskın duygusu: <b>'+merk.duygu+'</b>. (Tipler '+merk.tipler.join(', ')+')</p></div>';
  html+='<div class="pill-row" style="margin-top:14px">'
    + pill(KAN[state.primary][0]) + pill(KAN[state.primary][1])
    + '</div>'
    + '<p style="color:var(--text-secondary);font-size:.9rem;margin-top:10px">Kanat, çekirdek tipine komşu tiplerin kattığı renktir. Sende baskın kanat <b>'+w+' '+T[w].ad+'</b>: '+T[w].ozet+'</p>';

  /* STRES / GELİŞİM */
  html+='<h3 class="section-title"><span class="bar"></span>Stres & gelişim yönün</h3>';
  html+='<div class="arrows-2">'
    + '<div class="arrow-card grow"><div class="lab"><span class="ic" style="background:#4eae7a">'+gt+'</span>Gelişim → '+T[gt].ad+'</div><p>'+P.gelisim.metin+'</p></div>'
    + '<div class="arrow-card stress"><div class="lab"><span class="ic" style="background:#d66">'+st+'</span>Stres → '+T[st].ad+'</div><p>'+P.stres.metin+'</p></div>'
    + '</div>';

  /* İLİŞKİ / İŞ */
  html+='<h3 class="section-title"><span class="bar"></span>İlişkiler & iş hayatı</h3>';
  html+='<div class="cards two">'
    + card('İlişkilerde', P.iliskiler, false)
    + card('İş & meslek', P.is+' <br><span style="color:var(--muted2);font-size:.86rem">Sık görülen roller: '+P.roller+'</span>', false)
    + '</div>';

  /* BÜYÜME */
  html+='<h3 class="section-title"><span class="bar"></span>Gelişim için 4 anahtar</h3>';
  html+='<ul class="lst">'+P.buyume.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';

  /* SOHBET */
  html+='<h3 class="section-title"><span class="bar"></span>Mizacınla sohbet et</h3>';
  html+=chatHTML(P);

  /* AKSİYONLAR */
  html+='<div class="res-actions">'
    + '<button class="act primary" id="share-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg> Sonucu paylaş</button>'
    + '<button class="act ghost" id="retake-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Testi tekrar çöz</button>'
    + '</div>';
  html+='<p class="res-foot">Dokuz Tip Mizaç Modeli (DTMM / Enneagram) bir mizaç çerçevesidir; kesin bir teşhis değil, kendini tanımak için bir aynadır. '
    + 'Mizaç doğuştan gelir ama kader değildir — gelişim her tip için mümkündür.<br>'
    + '<a href="/">raufenc.com</a> · Bilgiyle, niyetle.</p>';

  $('result-body').innerHTML=html;
  showScreen('result');
  window.scrollTo(0,0);

  // skor barlarını çiz (animasyonlu)
  renderScores();
  // butonlar
  $('share-btn').addEventListener('click', shareResult);
  $('retake-btn').addEventListener('click', function(){
    var link=document.querySelector('#intro .intro-meta + button'); // varsa eski sonuç linki kalsın
    showScreen('intro'); window.scrollTo(0,0); setAccent(null);
  });
  // sohbeti kur
  setupChat(P);
}
function card(title, body, tint){
  return '<div class="card'+(tint?' tint':'')+'"><h4>'+title+'</h4><p>'+body+'</p></div>';
}
function pill(no){
  var t=T[no];
  return '<span class="pill"><span class="mini" style="background:'+t.renk+'">'+no+'</span><b>'+t.ad+'</b></span>';
}
function renderScores(){
  var box=$('scores'); var sc=state.scores;
  box.innerHTML='';
  sc.order.forEach(function(no,i){
    var t=T[no], pc=sc.pct[no];
    var row=el('div','score-row'+(no===state.primary?' top':''));
    row.style.color=t.renk;
    row.innerHTML='<span class="sn" style="background:'+t.renk+'">'+no+'</span>'
      + '<div class="score-track"><div class="score-val" style="background:'+t.renk+'"></div></div>'
      + '<span class="pct" style="color:var(--text-secondary)">%'+pc+'</span>';
    box.appendChild(row);
    (function(bar,pc,i){ setTimeout(function(){ bar.style.width=pc+'%'; }, 120+i*70); })(row.querySelector('.score-val'),pc,i);
  });
}

/* ════════════════ PAYLAŞ ════════════════ */
function shareResult(){
  var P=T[state.primary];
  var txt='Dokuz Tip Mizaç Testi sonucum: '+P.no+' · '+P.ad+' ('+P.unvan+'). Sen hangi mizaçtasın?';
  var url='https://raufenc.com/mizac/';
  if(navigator.share){
    navigator.share({ title:'Dokuz Tip Mizaç Testi', text:txt, url:url }).catch(function(){});
  } else if(navigator.clipboard){
    navigator.clipboard.writeText(txt+' '+url).then(function(){ showToast('Sonuç panoya kopyalandı ✓'); });
  } else {
    showToast('Bağlantı: '+url);
  }
}

/* ════════════════ SOHBET ════════════════ */
var chatHistory=[]; var aiMode=null; // null bilinmiyor, true canlı AI, false rehber
function chatHTML(P){
  return '<div class="chat-wrap">'
    + '<div class="chat-head"><span class="av"><svg viewBox="0 0 24 24">'+GL[state.primary]+'</svg></span>'
    + '<div><div class="ht">Mizaç Rehberin</div><div class="hs">'+P.no+' · '+P.ad+' hakkında konuşalım</div></div>'
    + '<span class="chat-mode" id="chat-mode">rehber</span></div>'
    + '<div class="chat-log" id="chat-log"></div>'
    + '<div class="chat-sugg" id="chat-sugg"></div>'
    + '<div class="chat-input"><input id="chat-in" type="text" placeholder="Mizacın hakkında bir şey sor…" autocomplete="off" />'
    + '<button class="chat-send" id="chat-send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>'
    + '</div>';
}
var SUGG=[
  { q:'Nasıl gelişebilirim?', k:'gelisim' },
  { q:'Stres altında ne oluyorum?', k:'stres' },
  { q:'İlişkilerde nasılım?', k:'iliski' },
  { q:'Gölge yönüm ne?', k:'golge' },
  { q:'Hangi meslekler bana uyar?', k:'is' },
  { q:'Kanadım ne anlama geliyor?', k:'kanat' }
];
function setupChat(P){
  chatHistory=[];
  var sugg=$('chat-sugg');
  SUGG.forEach(function(s){
    var b=el('button','sugg',s.q);
    b.addEventListener('click',function(){ sendMessage(s.q); });
    sugg.appendChild(b);
  });
  $('chat-send').addEventListener('click',function(){ var v=$('chat-in').value.trim(); if(v)sendMessage(v); });
  $('chat-in').addEventListener('keydown',function(e){ if(e.key==='Enter'){ var v=this.value.trim(); if(v)sendMessage(v); } });
  // açılış mesajı
  botSay('Selam! Senin mizacın <b>'+P.no+' · '+P.ad+'</b> ('+P.unvan+') çıktı. Bu tipin <b>temel arzusu</b> şu: '+P.temelArzu+' İstersen aşağıdaki sorulardan birine dokun ya da merak ettiğini doğrudan yaz — birlikte derinleşelim.', false);
}
function addMsg(text, who){
  var log=$('chat-log');
  var m=el('div','msg '+who, text);
  log.appendChild(m); log.scrollTop=log.scrollHeight;
  return m;
}
function botSay(text, type){
  // type=true → daktilo efektiyle
  var m=addMsg('', 'bot');
  if(type){ typeWriter(m, text); } else { m.innerHTML=text; }
  $('chat-log').scrollTop=$('chat-log').scrollHeight;
}
function typeWriter(node, html){
  // basit: kelime kelime aç
  var tmp=document.createElement('div'); tmp.innerHTML=html;
  var full=html;
  var words=full.split(/(\s+)/); var i=0; node.innerHTML='';
  var iv=setInterval(function(){
    node.innerHTML += words[i]; i++;
    $('chat-log').scrollTop=$('chat-log').scrollHeight;
    if(i>=words.length){ clearInterval(iv); }
  }, 22);
}
function showTyping(){
  var log=$('chat-log');
  var t=el('div','msg bot','<span class="typing"><i></i><i></i><i></i></span>');
  t.id='typing-ind'; log.appendChild(t); log.scrollTop=log.scrollHeight;
}
function hideTyping(){ var t=$('typing-ind'); if(t)t.remove(); }

function sendMessage(text){
  $('chat-in').value='';
  addMsg(text,'user');
  chatHistory.push({ role:'user', content:text });
  showTyping();
  // önce AI dene, olmazsa rehbere düş
  tryAI(text).then(function(reply){
    hideTyping();
    setChatMode(true);
    chatHistory.push({ role:'assistant', content:reply });
    botSay(reply, true);
  }).catch(function(){
    hideTyping();
    setChatMode(false);
    var ans=guideAnswer(text);
    chatHistory.push({ role:'assistant', content:ans });
    botSay(ans, true);
  });
}
function setChatMode(live){
  if(aiMode===live) return; aiMode=live;
  var m=$('chat-mode'); if(!m)return;
  m.textContent = live ? 'canlı yapay zekâ' : 'rehber';
  m.classList.toggle('live', live);
}
function tryAI(text){
  var P=T[state.primary];
  var payload={
    tip: P.no, tipAdi: P.ad, unvan: P.unvan, merkez: MERK[P.merkez].ad,
    kanat: state.wing, ozet: P.ozet,
    scores: state.scores ? topScores() : null,
    history: chatHistory.slice(-8),
    message: text
  };
  return fetch('/api/mizac-sohbet', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  }).then(function(res){
    if(!res.ok) throw new Error('http '+res.status);
    return res.json();
  }).then(function(d){
    if(d && d.reply && !d.fallback) return d.reply;
    throw new Error('fallback');
  });
}
function topScores(){
  var o=state.scores.order.slice(0,3).map(function(n){ return n+':%'+state.scores.pct[n]; });
  return o.join(', ');
}

/* — Yerleşik rehber: niyet eşleştirmeli cevap — */
function guideAnswer(text){
  var P=T[state.primary];
  var q=text.toLocaleLowerCase('tr');
  function has(){ for(var i=0;i<arguments.length;i++){ if(q.indexOf(arguments[i])>=0) return true; } return false; }
  var gt=OK.gelisim[state.primary], st=OK.stres[state.primary];

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
  if(has('kanat'))
    { var w=state.wing, k=KAN[state.primary];
      return 'Çekirdek tipin '+P.no+', ama yanına komşu tipler renk katar. Sende baskın kanat <b>'+w+' '+T[w].ad+'</b>: '+T[w].ozet+'<br><br>Diğer kanadın ('+(k[0]===w?k[1]:k[0])+' '+T[k[0]===w?k[1]:k[0]].ad+') zayıf da olsa içinde mevcut.'; }
  if(has('güçlü','guclu','iyi yön','avantaj','artı','arti','yetenek'))
    return '<b>Güçlü yönlerin:</b><br>• '+P.gucluYonler.join('<br>• ');
  if(has('zayıf','zayif','zorluk','kusur','gölge','golge','eksik','sorun','kötü yön'))
    return '<b>Gölgen:</b> '+P.golge+'<br><br><b>Başlıca zorlukların:</b><br>• '+P.zorluklar.join('<br>• ');
  if(has('tutku','günah','gunah','nefs','öfke','ofke','gurur','kıskan','kiskan','cimri','tembel'))
    return 'Her mizacın bir gölge tutkusu ve onu dengeleyen bir erdemi vardır.<br><br>Senin gölge tutkun: <b>'+P.tutku+'</b>. Yöneleceğin erdem ise <b>'+P.erdem+'</b>.<br>'+P.golge;
  if(has('merkez','triad','beden','kalp','zihin'))
    { var mk=MERK[P.merkez]; return 'Sen <b>'+mk.ad+'</b> ('+mk.altAd+') içindesin. '+mk.aciklama+' Bu merkezin baskın duygusu <b>'+mk.duygu+'</b>; tipler '+mk.tipler.join(', ')+' burada yer alır.'; }
  if(has('uyum','hangi tip','anlaş','anlas','eşleş','esles','birlikte','geçin','gecin'))
    return 'Mizaçlar arası uyum sabit bir kural değildir; her eşleşme, iki tarafın olgunluk düzeyine bağlıdır. Senin için en besleyici ilişki, '+gt+' '+T[gt].ad+' yönündeki gelişimini destekleyen, gölge tutkun ('+P.tutku.split(' ')[0]+') konusunda sana ayna tutabilen biriyle olur. Kendi merkezinden ('+MERK[P.merkez].ad+') farklı bir merkezin dengesi de seni tamamlar.';
  if(has('doğru mu','dogru mu','emin','kesin','yanlış','yanlis','değil mi','degil mi'))
    return 'Bu test bir teşhis değil, bir aynadır. '+P.no+' '+P.ad+' çıkması, çoğu cevabının bu mizacın çekirdeğiyle örtüştüğü anlamına gelir. Eğer içine tam oturmadıysa, ikincil eğilimine ('+state.scores.order[1]+' '+T[state.scores.order[1]].ad+') de bakmanı öneririm — bazen kişi kanadına ya da komşu tipe daha yakın hisseder.';
  if(has('selam','merhaba','sa ','nasılsın','teşekkür','tesekkur','sağ ol','sag ol'))
    return 'Ne demek, buradayım. '+P.ad+' mizacının hangi yönünü merak ediyorsan — gelişimini, ilişkilerini, gölgeni — sorman yeter.';

  // varsayılan: reflektif + yönlendirme
  return 'Güzel soru. '+P.ad+' mizacı için şunu söyleyebilirim: özünde '+P.ozet.charAt(0).toLocaleLowerCase('tr')+P.ozet.slice(1)+'<br><br>Biraz daha somutlaştırabilirsen yardımcı olurum. Dilersen şunlardan birini sor: <i>gelişim yolum, stres tepkim, ilişkilerim, gölge tutkum</i> ya da <i>bana uygun meslekler</i>.';
}

/* ════════════════ YARDIMCI ════════════════ */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); });
  $(id).classList.add('active');
}
var toastTimer;
function showToast(msg){
  var t=$('toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(function(){ t.classList.remove('show'); }, 2600);
}

/* klavye 1-5 + geri */
document.addEventListener('keydown', function(e){
  if(!$('test').classList.contains('active')) return;
  if(e.key>='1'&&e.key<='5'){ answer(+e.key); }
  else if(e.key==='ArrowLeft'){ prev(); }
  else if(e.key==='ArrowRight'){ nextManual(); }
});

/* başlat */
document.addEventListener('DOMContentLoaded', function(){
  initIntro();
  $('prev-btn').addEventListener('click', prev);
  $('skip-btn').addEventListener('click', function(){ state.answers[state.idx]=3; nextManual(); });
});
})();
