/* ═══════════════════════════════════════════════════════════
   Âlimler Serisi — Evrensel Motor (engine.js)
   Config: SCHOLAR (config.js)
   Data:   BOOK, TIMELINE, PERIOD_COLORS, PERIOD_LABELS (book-data.js)
   Map:    data/locations.json
   ═══════════════════════════════════════════════════════════ */

/* ═══════════ TEMA SİSTEMİ ═══════════ */
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem(SCHOLAR.id+'-theme',t);
  document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
  const labels={'':'🌙','sepia':'📜','light':'☀️'};
  document.querySelectorAll('.theme-btn').forEach(b=>{if(b.textContent.trim()===labels[t])b.classList.add('active');});
}
(function(){var t=localStorage.getItem(SCHOLAR.id+'-theme');if(t)setTheme(t);})();

/* ═══════════ ANA UYGULAMA ═══════════ */
(function(){
'use strict';

let MAP_DATA, map, markers={}, routeLayers=[], activePeriod='all';

/* ── Hero Doldur ── */
function populateHero(){
  document.title=SCHOLAR.name+' — '+SCHOLAR.subtitle;
  document.querySelector('meta[name="description"]').content=SCHOLAR.description;
  document.getElementById('logo-letter').textContent=SCHOLAR.logoLetter;
  document.getElementById('logo-name').textContent=SCHOLAR.name;
  document.getElementById('logo-sub').textContent=SCHOLAR.subtitle;
  document.getElementById('hero-badge').textContent=SCHOLAR.birthAH+' — '+SCHOLAR.deathAH+' H  /  '+SCHOLAR.birthCE+' — '+SCHOLAR.deathCE+' M';
  document.getElementById('hero-title').textContent=SCHOLAR.name;
  document.getElementById('hero-fullname').innerHTML=SCHOLAR.fullName+' <em>'+SCHOLAR.honorific+'</em>';
  document.getElementById('hero-desc').textContent=SCHOLAR.description;

  // Stats
  const statsEl=document.getElementById('hero-stats');
  statsEl.innerHTML=SCHOLAR.stats.map(s=>
    `<div class="stat"><div class="stat-num" data-target="${s.target}"${s.suffix?' data-suffix="'+s.suffix+'"':''}>0</div><div class="stat-label">${s.label}</div></div>`
  ).join('');

  // Section headers
  document.getElementById('sh-map-title').textContent=SCHOLAR.sections.map.title;
  document.getElementById('sh-map-desc').textContent=SCHOLAR.sections.map.desc;
  document.getElementById('sh-timeline-title').textContent=SCHOLAR.sections.timeline.title;
  document.getElementById('sh-timeline-desc').textContent=SCHOLAR.sections.timeline.desc;
  document.getElementById('sh-content-title').textContent=SCHOLAR.sections.content.title;
  document.getElementById('sh-content-desc').textContent=SCHOLAR.sections.content.desc;

  // Özel bölüm (hadîs/söz/kerâmet) — opsiyonel
  const ozelSection=BOOK.find(ch=>ch.id==='ozel');
  const ozelBlock=document.getElementById('ozel-section');
  const ozelNav=document.getElementById('nav-ozel');
  const ozelQnav=document.getElementById('qnav-ozel');
  if(ozelSection&&SCHOLAR.sections.ozel){
    document.getElementById('sh-ozel-title').textContent=SCHOLAR.sections.ozel.title;
    document.getElementById('sh-ozel-desc').textContent=SCHOLAR.sections.ozel.desc;
    if(ozelNav)ozelNav.textContent=SCHOLAR.sections.ozel.navLabel||SCHOLAR.sections.ozel.title;
    if(ozelQnav){ozelQnav.textContent=(SCHOLAR.sections.ozel.icon||'★')+' '+( SCHOLAR.sections.ozel.navLabel||SCHOLAR.sections.ozel.title);}
  }else{
    if(ozelBlock)ozelBlock.style.display='none';
    if(document.getElementById('ozel-content'))document.getElementById('ozel-content').style.display='none';
    if(ozelNav)ozelNav.style.display='none';
    if(ozelQnav)ozelQnav.style.display='none';
  }

  // Footer
  document.getElementById('footer-source').textContent='Kaynak: '+SCHOLAR.source.name;
  document.getElementById('footer-link').href=SCHOLAR.source.url;
}

/* ── Veri Yükleme ── */
async function init(){
  populateHero();
  try{
    const r=await fetch('data/locations.json');
    MAP_DATA=await r.json();
  }catch(e){MAP_DATA={locations:[],routes:[],periods:[]};}
  initMap();
  renderMarkers();
  renderRoutes();
  populateFilters();
  setupSearch();
  renderLegend();
  setupDetailPanel();
  renderTimeline();
  renderBookContent();
  renderOzelContent();
  setupJourney();
  initCounters();
  setupNavHighlight();
}
document.addEventListener('DOMContentLoaded',init);

/* ═══════════ MAP ═══════════ */
function initMap(){
  map=L.map('map',{center:SCHOLAR.mapCenter,zoom:SCHOLAR.mapZoom,minZoom:3,maxZoom:12,zoomControl:true});

  /* ── Katmanlar ── */
  const physical=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',{
    attribution:'&copy; Esri',maxZoom:8
  });
  const topo=L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; OpenTopoMap',maxZoom:17
  });
  const osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; OpenStreetMap',maxZoom:19
  });
  const cartoLight=L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; CARTO',subdomains:'abcd',maxZoom:19
  });
  const cartoDark=L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; CARTO',subdomains:'abcd',maxZoom:19
  });
  const satellite=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{
    attribution:'&copy; Esri',maxZoom:18
  });

  physical.addTo(map);

  L.control.layers({
    'Coğrafî':physical,
    'Topoğrafik':topo,
    'Siyâsî':osm,
    'Açık Tema':cartoLight,
    'Koyu Tema':cartoDark,
    'Uydu':satellite
  },null,{position:'bottomleft',collapsed:true}).addTo(map);
}

/* Kayı tarzı SVG marker sistemi */
const _goldIcon=L.divIcon({
  className:'custom-marker',
  html:'<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="6" fill="#c9a84c" stroke="#5a3e1b" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" fill="#5a3e1b"/></svg>',
  iconSize:[20,20],iconAnchor:[10,10],popupAnchor:[0,-12]
});
const _capitalIcon=L.divIcon({
  className:'custom-marker',
  html:'<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#8b6914" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="#c9a84c" stroke="#5a3e1b" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" fill="#5a3e1b"/></svg>',
  iconSize:[24,24],iconAnchor:[12,12],popupAnchor:[0,-14]
});
function _battleIcon(s){
  const h=s/2,p=Math.round(s*.18),q=s-p;
  return L.divIcon({
    className:'custom-marker battle-marker',
    html:'<svg width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'"><line x1="'+p+'" y1="'+p+'" x2="'+q+'" y2="'+q+'" stroke="#6b1d1d" stroke-width="2" stroke-linecap="round"/><line x1="'+q+'" y1="'+p+'" x2="'+p+'" y2="'+q+'" stroke="#6b1d1d" stroke-width="2" stroke-linecap="round"/><circle cx="'+h+'" cy="'+h+'" r="'+Math.round(s*.16)+'" fill="#c0392b" stroke="#4a0e0e" stroke-width="1"/><line x1="'+(p-1)+'" y1="'+(p-1)+'" x2="'+(p+2)+'" y2="'+(p+2)+'" stroke="#8b6914" stroke-width="1.5" stroke-linecap="round"/><line x1="'+(q+1)+'" y1="'+(p-1)+'" x2="'+(q-2)+'" y2="'+(p+2)+'" stroke="#8b6914" stroke-width="1.5" stroke-linecap="round"/></svg>',
    iconSize:[s,s],iconAnchor:[h,h],popupAnchor:[0,-h-2]
  });
}
const _battleSmall=_battleIcon(20);
const _battleLarge=_battleIcon(26);

function renderMarkers(){
  if(!MAP_DATA.locations)return;
  MAP_DATA.locations.sort((a,b)=>a.order-b.order).forEach(loc=>{
    const cat=loc.category||'default';
    const isBattle=cat==='savas';
    const isCap=cat==='baskent';
    const icon=isBattle?(loc.significance==='major'?_battleLarge:_battleSmall):isCap?_capitalIcon:_goldIcon;
    const m=L.marker([loc.lat,loc.lon],{icon:icon,zIndexOffset:isBattle?500:0}).addTo(map);
    m.bindPopup(makePopup(loc),{maxWidth:300});
    if(loc.significance!=='minor'){
      const lbl=isBattle&&loc.events&&loc.events[0]?loc.events[0].title:loc.name;
      const lblCls=isBattle?'map-label-battle':isCap?'map-label-capital':'map-label';
      const lblIcon=L.divIcon({className:lblCls,html:'<span>'+lbl+'</span>',iconSize:[0,0],iconAnchor:[-14,5]});
      L.marker([loc.lat,loc.lon],{icon:lblIcon,interactive:false}).addTo(map);
    }
    m.on('click',()=>m.openPopup());
    m.locData=loc;
    markers[loc.id]=m;
  });
}

function makePopup(loc){
  const p=MAP_DATA.periods.find(pp=>pp.id===loc.periods[0]);
  const c=PERIOD_COLORS[loc.periods[0]];
  let ev='';
  if(loc.events&&loc.events[0])ev=`<div style="font-size:12px;color:var(--text2);margin:6px 0"><b>${loc.events[0].ah_year} H:</b> ${loc.events[0].title}</div>`;
  return `<div class="popup-title">${loc.name}</div>
    <div class="popup-modern">${loc.modern_name}</div>
    <span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600;background:${c}20;color:${c}">${p?p.label:''}</span>
    ${ev}
    <div class="popup-links">
      <a href="javascript:void(0)" onclick="event.stopPropagation();window._openDetail('${loc.id}')">Detay</a>
      <a href="javascript:void(0)" onclick="event.stopPropagation();window._goToTimeline('${loc.id}')">Kronolojide Göster</a>
    </div>`;
}

function renderRoutes(){
  if(!MAP_DATA.routes)return;
  MAP_DATA.routes.forEach(r=>{
    const c=PERIOD_COLORS[r.period]||'#d4a853';
    const line=L.polyline(r.waypoints,{color:c,weight:1.8,opacity:.45,dashArray:'4,6'}).addTo(map);
    line.routeData=r;
    routeLayers.push(line);
  });
}

/* ═══════════ FILTERS ═══════════ */
function populateFilters(){
  const sel=document.getElementById('period-filter');
  if(!MAP_DATA.periods)return;
  MAP_DATA.periods.forEach(p=>{
    const o=document.createElement('option');o.value=p.id;o.textContent=p.label;sel.appendChild(o);
  });
  sel.addEventListener('change',()=>{activePeriod=sel.value;applyFilter();});
}
function applyFilter(){
  let c=0;
  Object.values(markers).forEach(m=>{
    const show=activePeriod==='all'||m.locData.periods.includes(activePeriod);
    if(show){m.addTo(map);c++;}else map.removeLayer(m);
  });
  routeLayers.forEach(rl=>{
    if(activePeriod==='all'||rl.routeData.period===activePeriod)rl.addTo(map);
    else map.removeLayer(rl);
  });
  document.getElementById('filter-count').textContent=`${c} / ${MAP_DATA.locations.length} lokasyon`;
}

/* ═══════════ SEARCH ═══════════ */
function setupSearch(){
  const inp=document.getElementById('search-input'),res=document.getElementById('search-results');
  inp.addEventListener('input',()=>{
    const q=inp.value.trim().toLowerCase();
    if(q.length<2){res.classList.remove('show');return;}
    const matches=MAP_DATA.locations.filter(l=>l.name.toLowerCase().includes(q)||l.modern_name.toLowerCase().includes(q));
    if(!matches.length){res.classList.remove('show');return;}
    res.innerHTML=matches.map(l=>{
      const p=MAP_DATA.periods.find(pp=>pp.id===l.periods[0]);
      return `<div class="sr-item" data-id="${l.id}"><span class="sr-name">${l.name}</span><span class="sr-info">${p?p.label:''}</span></div>`;
    }).join('');
    res.classList.add('show');
    res.querySelectorAll('.sr-item').forEach(it=>it.addEventListener('click',()=>{
      const loc=MAP_DATA.locations.find(l=>l.id===it.dataset.id);
      if(loc&&markers[it.dataset.id]){map.flyTo([loc.lat,loc.lon],7,{duration:1});markers[it.dataset.id].openPopup();}
      res.classList.remove('show');inp.value='';
    }));
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.search-box'))res.classList.remove('show');});
}

/* ═══════════ LEGEND ═══════════ */
function renderLegend(){
  const el=document.getElementById('legend');
  let html='<div class="legend-title">Dönemler</div>';
  if(MAP_DATA.periods)MAP_DATA.periods.forEach(p=>{
    html+=`<div class="legend-row" onclick="document.getElementById('period-filter').value='${p.id}';document.getElementById('period-filter').dispatchEvent(new Event('change'))"><div class="legend-dot" style="background:${p.color}"></div>${p.label}</div>`;
  });
  el.innerHTML=html;
}

/* ═══════════ DETAIL PANEL ═══════════ */
function setupDetailPanel(){
  const panel=document.getElementById('detail-panel'),ov=document.getElementById('overlay'),cls=document.getElementById('detail-close');
  function close(){panel.classList.remove('open');ov.classList.remove('open');}
  cls.addEventListener('click',close);ov.addEventListener('click',close);

  window._openDetail=function(id){
    const loc=MAP_DATA.locations.find(l=>l.id===id);if(!loc)return;
    map.closePopup();
    const periods=loc.periods.map(pid=>{const p=MAP_DATA.periods.find(pp=>pp.id===pid);return `<span class="dp-badge" style="background:${PERIOD_COLORS[pid]}20;color:${PERIOD_COLORS[pid]}">${p.label}</span>`;}).join('');
    let evHtml='';
    if(loc.events&&loc.events.length)evHtml=`<div class="dp-section"><h4>Olaylar</h4>${loc.events.map(ev=>`<p style="margin:6px 0"><span style="color:var(--gold);font-weight:600">${ev.ah_year} H / ${ev.ce_year} M</span> — <b>${ev.title}</b><br>${ev.description}</p>`).join('')}</div>`;
    document.getElementById('detail-content').innerHTML=`
      <h2>${loc.name}</h2><div class="dp-modern">${loc.modern_name}</div>
      <div style="margin:10px 0">${periods}</div>${evHtml}
      <div class="dp-section"><h4>Hakkında</h4><p>${loc.detail_text}</p></div>
      <button class="tl-btn" onclick="window._flyTo('${id}')">📍 Haritada Göster</button>`;
    panel.classList.add('open');ov.classList.add('open');
  };
  window._flyTo=function(id){
    const loc=MAP_DATA.locations.find(l=>l.id===id);
    if(loc){map.flyTo([loc.lat,loc.lon],8,{duration:1});document.getElementById('detail-panel').classList.remove('open');document.getElementById('overlay').classList.remove('open');setTimeout(()=>{if(markers[id])markers[id].openPopup();},1100);}
  };
  window._goToTimeline=function(locId){
    map.closePopup();
    setTimeout(()=>window._scrollToTimeline(locId),300);
  };
  window._scrollToTimeline=function(locId){
    const items=document.querySelectorAll('.tl-item[data-loc="'+locId+'"]');
    if(items.length){
      items[0].scrollIntoView({behavior:'smooth',block:'center'});
      items[0].style.borderColor='var(--gold)';
      items[0].style.boxShadow='0 0 20px rgba(212,168,83,.3)';
      setTimeout(()=>{items[0].style.borderColor='';items[0].style.boxShadow='';},3000);
    }
  };
}

/* ═══════════ SINEMATIK YOLCULUK ═══════════ */
function setupJourney(){
  const playBtn=document.getElementById('j-play'),pauseBtn=document.getElementById('j-pause'),resetBtn=document.getElementById('j-reset'),speedSel=document.getElementById('j-speed');
  const panel=document.getElementById('j-panel'),yearEl=document.getElementById('jp-year'),routeEl=document.getElementById('jp-route'),descEl=document.getElementById('jp-desc'),progEl=document.getElementById('jp-progress'),legend=document.getElementById('legend');
  let state={playing:false,paused:false,step:0,timer:null,drawn:[],movMarker:null};

  playBtn.addEventListener('click',()=>{
    if(state.paused){state.paused=false;state.playing=true;pauseBtn.classList.remove('hidden');playBtn.classList.add('hidden');animateStep();return;}
    resetVisuals();state.playing=true;state.paused=false;state.step=0;
    playBtn.classList.add('hidden');pauseBtn.classList.remove('hidden');resetBtn.classList.remove('hidden');speedSel.classList.remove('hidden');
    routeLayers.forEach(rl=>map.removeLayer(rl));
    panel.classList.add('show');legend.classList.add('hidden');
    animateStep();
  });
  pauseBtn.addEventListener('click',()=>{state.paused=true;state.playing=false;clearTimeout(state.timer);pauseBtn.classList.add('hidden');playBtn.classList.remove('hidden');playBtn.textContent='▶ Devam';});
  resetBtn.addEventListener('click',()=>{
    state.playing=false;state.paused=false;clearTimeout(state.timer);resetVisuals();
    routeLayers.forEach(rl=>{if(activePeriod==='all'||rl.routeData.period===activePeriod)rl.addTo(map);});
    playBtn.classList.remove('hidden');playBtn.innerHTML='▶ <span>Seyahati İzle</span>';
    pauseBtn.classList.add('hidden');resetBtn.classList.add('hidden');speedSel.classList.add('hidden');panel.classList.remove('show');legend.classList.remove('hidden');
  });

  function resetVisuals(){state.drawn.forEach(l=>map.removeLayer(l));state.drawn=[];if(state.movMarker){map.removeLayer(state.movMarker);state.movMarker=null;}}

  function animateStep(){
    if(!state.playing||state.paused)return;
    const routes=MAP_DATA.routes;
    if(state.step>=routes.length){
      yearEl.textContent=SCHOLAR.journeyEnd.year;routeEl.innerHTML=SCHOLAR.journeyEnd.title;
      descEl.textContent=SCHOLAR.journeyEnd.desc;
      progEl.style.width='100%';state.playing=false;pauseBtn.classList.add('hidden');playBtn.classList.add('hidden');legend.classList.remove('hidden');return;
    }
    const route=routes[state.step];const color=PERIOD_COLORS[route.period]||'#d4a853';
    const speed=parseInt(speedSel.value)||2;const dur=2500/speed;
    const fromLoc=MAP_DATA.locations.find(l=>l.id===route.from);
    const toLoc=MAP_DATA.locations.find(l=>l.id===route.to);

    yearEl.textContent=route.ah_year+' H · '+(route.ah_year-SCHOLAR.birthAH)+' yaşında';
    routeEl.innerHTML=`${fromLoc?fromLoc.name:'?'} <span class="arrow">→</span> ${toLoc?toLoc.name:'?'}`;
    descEl.textContent=(SCHOLAR.routeDetails&&SCHOLAR.routeDetails[route.label])||route.label;
    progEl.style.width=Math.round((state.step+1)/routes.length*100)+'%';

    const wp=route.waypoints;
    const line=L.polyline(wp,{color:color,weight:2.5,opacity:.7}).addTo(map);
    state.drawn.push(line);

    if(state.movMarker)map.removeLayer(state.movMarker);
    const dest=wp[wp.length-1];
    state.movMarker=L.circleMarker(dest,{radius:6,fillColor:'#d4a853',fillOpacity:1,color:'#fff',weight:2}).addTo(map);

    map.flyTo(dest,5,{duration:1});

    state.step++;
    state.timer=setTimeout(animateStep,dur);
  }
}

/* ═══════════ TIMELINE ═══════════ */
function renderTimeline(){
  const wrap=document.getElementById('timeline-wrap');
  TIMELINE.forEach(ev=>{
    const color=PERIOD_COLORS[ev.period]||'#d4a853';
    const loc=MAP_DATA.locations?MAP_DATA.locations.find(l=>l.id===ev.loc):null;
    const item=document.createElement('div');
    item.className='tl-item';item.dataset.loc=ev.loc;
    item.innerHTML=`
      <div class="tl-id">${ev.year}</div>
      <div class="tl-title">${ev.title}</div>
      <div class="tl-period" style="color:${color}">${PERIOD_LABELS[ev.period]||''}</div>
      <div class="tl-geo">📍 ${loc?loc.name:''}</div>
      <div class="tl-desc">${ev.desc}</div>
      <button class="tl-btn" onclick="event.stopPropagation();window._flyToFromTimeline('${ev.loc}')">🗺️ Haritada Göster</button>`;
    item.addEventListener('click',()=>{
      if(loc&&markers[ev.loc]){
        document.getElementById('map-section').scrollIntoView({behavior:'smooth'});
        setTimeout(()=>{map.flyTo([loc.lat,loc.lon],7,{duration:1});setTimeout(()=>markers[ev.loc].openPopup(),1100);},500);
      }
    });
    wrap.appendChild(item);
  });

  window._flyToFromTimeline=function(locId){
    const loc=MAP_DATA.locations?MAP_DATA.locations.find(l=>l.id===locId):null;
    if(loc&&markers[locId]){
      const mapEl=document.getElementById('map');
      mapEl.scrollIntoView({behavior:'smooth',block:'center'});
      setTimeout(()=>{map.invalidateSize();map.flyTo([loc.lat,loc.lon],7,{duration:1});setTimeout(()=>markers[locId].openPopup(),1200);},800);
    }
  };
}

/* ═══════════ KITAP İÇERİĞİ ═══════════ */
function renderBookContent(){
  const container=document.getElementById('book-content');
  const colorMap={gold:'#d4a853',green:'#22c55e',blue:'#3b82f6',purple:'#a855f7',orange:'#f97316',red:'#ef4444',teal:'#14b8a6'};
  const iconMap={gold:'📖',green:'🌱',blue:'🧭',purple:'👨‍🏫',orange:'🧠',teal:'👥',red:'🕌'};

  BOOK.filter(ch=>ch.id!=='ozel').forEach((ch,ci)=>{
    const color=colorMap[ch.color]||'#d4a853';
    const icon=iconMap[ch.color]||'📖';
    const div=document.createElement('div');div.className='chapter';
    let subsHtml=ch.subs.map(s=>{
      if(s.hadith) return `<div class="hadith-card"><div class="hadith-label">Hadîs-i Şerîf</div><div class="sub-title">${s.title}</div><div class="sub-text">${s.text}</div></div>`;
      return `<div class="sub-entry"><div class="sub-title">${s.title}</div><div class="sub-text">${s.text}</div></div>`;
    }).join('');

    div.innerHTML=`
      <div class="ch-head" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">
        <div class="ch-icon" style="background:${color}20;color:${color}">${icon}</div>
        <div class="ch-title">${ch.title}</div>
        <span class="ch-arrow">▼</span>
      </div>
      <div class="ch-body">${subsHtml}</div>`;
    container.appendChild(div);
  });
}

/* ═══════════ ÖZEL BÖLÜM (Hadîs / Söz / Kerâmet) ═══════════ */
function renderOzelContent(){
  const container=document.getElementById('ozel-content');
  if(!container)return;
  const ozelChapter=BOOK.find(ch=>ch.id==='ozel');
  if(!ozelChapter)return;
  const label=(SCHOLAR.sections.ozel&&SCHOLAR.sections.ozel.cardLabel)||'';
  ozelChapter.subs.forEach(s=>{
    const card=document.createElement('div');card.className='hadith-card';
    card.innerHTML=`${label?'<div class="hadith-label">'+label+'</div>':''}<div class="sub-title">${s.title}</div><div class="sub-text">${s.text}</div>`;
    container.appendChild(card);
  });
}

/* ═══════════ HERO COUNTERS ═══════════ */
function initCounters(){
  const el=document.getElementById('hero-stats');let done=false;
  function check(){
    if(done)return;
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight&&r.bottom>0){done=true;animate();window.removeEventListener('scroll',check);}
  }
  window.addEventListener('scroll',check,{passive:true});
  setTimeout(check,500);

  function animate(){
    document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
      const target=parseInt(el.dataset.target),suffix=el.dataset.suffix||'';
      const dur=2000,steps=60,inc=target/steps;let cur=0;
      const t=setInterval(()=>{cur+=inc;if(cur>=target){cur=target;clearInterval(t);}el.textContent=fmt(Math.round(cur))+suffix;},dur/steps);
    });
  }
}
function fmt(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');}

/* ═══════════ NAV HIGHLIGHT ═══════════ */
function setupNavHighlight(){
  const links=document.querySelectorAll('.main-nav a');
  const ids=['map-section','timeline-section','content-section','ozel-section'];
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+en.target.id));
    });
  },{threshold:.1,rootMargin:'-80px 0px -60% 0px'});
  ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
}

})();
