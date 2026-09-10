import {BASE, pathFor, renderCollections, renderList, renderPoem} from './render.mjs';

let data, current, collection = 'all', filtered = [], query = '', meter = 'all', requestId = 0;
const $ = s => document.querySelector(s);
const normalize = s => String(s || '').toLocaleLowerCase('tr-TR').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const storage = {get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
let size = Math.min(30, Math.max(18, Number(storage.get('beyit-size')) || 22));
let theme = storage.get('beyit-theme') || 'light';
function preferences(){document.documentElement.dataset.theme = theme; document.documentElement.style.setProperty('--verse-size',`${size/16}rem`); $('[data-theme]')?.setAttribute('aria-label',theme === 'dark' ? 'Gündüz görünümüne geç' : 'Gece görünümüne geç');}
preferences();
function notify(text){const el=$('#toast');el.textContent=text;el.classList.add('visible');clearTimeout(notify.timer);notify.timer=setTimeout(()=>el.classList.remove('visible'),3000);}
function toggleIndex(force){const open=force ?? !document.body.classList.contains('index-open');document.body.classList.toggle('index-open',open);document.querySelectorAll('[data-index]').forEach(b=>b.setAttribute('aria-expanded',String(open)));if(open)$('#search').focus();else if(force===undefined)$('button.mobile-index').focus();}
function applyFilters(){
  if(!data)return;
  const q=normalize(query).trim();
  filtered=data.poems.filter(p=>(collection==='all'||p.collectionId===collection)&&(meter==='all'||p.meterId===meter||p.meterType===meter)&&(!q||p.searchText.includes(q)));
  $('#poem-list').innerHTML=renderList(filtered,current?.id);
  $('#result-count').textContent=filtered.length;
  $('#list-title').textContent=collection==='all'?'Bütün defter':data.collections.find(c=>c.id===collection)?.title;
  $('#collections').innerHTML=renderCollections(data,collection);
  $('#collection-select').value=collection;
}
function findFromURL(){const match=location.pathname.match(/\/siir\/([^/]+)/);const hash=decodeURIComponent(location.hash.slice(1));return data.poems.find(p=>p.id===(match?.[1]||hash)||p.legacyId===hash)||data.poems[0];}
function selectPoem(id,{push=true,focus=true}={}){
  const p=data.poems.find(p=>p.id===id);if(!p)return;
  current=p;const nav=filtered.some(x=>x.id===id)?filtered:data.poems;
  $('#reader').innerHTML=renderPoem(p,data,nav);$('#reader').dataset.poemId=id;$('#reader').scrollTop=0;
  if(push)history.pushState({poem:id},'',pathFor(p));
  document.title=`${p.title} · Rauf Enç | Beyit Defteri`;
  $('link[rel="canonical"]')?.setAttribute('href',`https://raufenc.com${pathFor(p)}`);
  const description=p.couplets[0].verses.map(v=>v.text).join(' ');
  $('meta[name="description"]')?.setAttribute('content',description);
  for(const [key,value] of [['og:title',document.title],['og:description',description],['og:url',`https://raufenc.com${pathFor(p)}`],['og:type','article']])document.querySelector(`meta[property="${key}"]`)?.setAttribute('content',value);
  const structured=document.querySelector('script[type="application/ld+json"]');
  if(structured)structured.textContent=JSON.stringify({'@context':'https://schema.org','@type':'CreativeWork',name:p.title,url:`https://raufenc.com${pathFor(p)}`,author:{'@type':'Person',name:'Rauf Enç'},inLanguage:'tr',text:p.couplets.map(c=>c.verses.map(v=>v.text).join('\n')).join('\n\n')});
  applyFilters();toggleIndex(false);syncFocusLabel();
  if(focus)$('#siir').focus({preventScroll:true});
}
function syncFocusLabel(){const focus=document.body.classList.contains('focus-mode');$('[data-focus]')?.setAttribute('aria-pressed',String(focus));$('[data-focus]')?.setAttribute('aria-label',focus?'Fihristi ve koleksiyonları göster':'Sadece şiiri göster');}
async function copy(text,success){try{await navigator.clipboard.writeText(text);notify(success)}catch{const el=document.createElement('textarea');el.value=text;el.style.position='fixed';el.style.opacity='0';document.body.append(el);el.select();const ok=document.execCommand('copy');el.remove();notify(ok?success:'Kopyalanamadı. Metni seçerek kopyalayabilirsin.')}}
document.addEventListener('click',async e=>{
  const b=e.target.closest('button,a');if(!b)return;
  if(b.hasAttribute('data-index'))toggleIndex();
  if(b.hasAttribute('data-theme')){theme=theme==='dark'?'light':'dark';storage.set('beyit-theme',theme);preferences();}
  if(b.hasAttribute('data-size')){size=Math.min(30,Math.max(18,size+Number(b.dataset.size)*2));storage.set('beyit-size',size);preferences();notify(`Yazı boyutu: ${size}`);}
  if(b.hasAttribute('data-about'))$('#about').showModal();
  if(b.hasAttribute('data-close-about'))$('#about').close();
  if(b.hasAttribute('data-focus')){document.body.classList.toggle('focus-mode');syncFocusLabel();}
  if(!data)return;
  if(b.dataset.poem && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button===0){e.preventDefault();selectPoem(b.dataset.poem);}
  if(b.dataset.collection){collection=b.dataset.collection;query='';$('#search').value='';applyFilters();$('#poem-list').scrollTop=0;}
  if(b.hasAttribute('data-reset')){query='';meter='all';collection='all';$('#search').value='';$('#meter-filter').value='all';applyFilters();}
  if(b.hasAttribute('data-copy'))await copy(`${current.title}\n\n${current.couplets.map(c=>c.verses.map(v=>v.text).join('\n')).join('\n\n')}\n\nRauf Enç`, 'Şiir kopyalandı.');
  if(b.hasAttribute('data-share'))await copy(`https://raufenc.com${pathFor(current)}`,'Şiirin bağlantısı kopyalandı.');
});
$('#search').addEventListener('input',e=>{query=e.target.value;applyFilters();});
$('#meter-filter').addEventListener('change',e=>{meter=e.target.value;applyFilters();});
$('#collection-select').addEventListener('change',e=>{collection=e.target.value;applyFilters();});
$('#about').addEventListener('click',e=>{if(e.target===$('#about')){const r=$('#about').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#about').close();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#about').open){toggleIndex(false);document.body.classList.remove('focus-mode');syncFocusLabel();}});
window.addEventListener('popstate',()=>{if(data)selectPoem(findFromURL().id,{push:false});});
window.addEventListener('hashchange',()=>{if(data&&location.hash)selectPoem(findFromURL().id,{push:false});});
async function load(){
  const id=++requestId;
  try{
    const response=await fetch(`${BASE}data/defter.json`);if(!response.ok)throw Error('data');
    const incoming=await response.json();if(id!==requestId)return;data=incoming;
    for(const p of data.poems)p.searchText=normalize([p.title,p.subtitle,p.theme,p.letter?`mektup ${p.letter} ${p.letter}. mektup`:'',...p.couplets.flatMap(c=>c.verses.map(v=>v.text)),...p.glossary.map(g=>`${g.term} ${g.definition}`)].join(' '));
    current=findFromURL();filtered=data.poems;
    if(current.id!==$('#reader').dataset.poemId)selectPoem(current.id,{push:false,focus:false});else applyFilters();
    document.documentElement.dataset.ready='true';
  }catch{notify('Arama yüklenemedi. Şiir bağlantılarıyla okumaya devam edebilirsin.');document.documentElement.dataset.ready='error';}
}
load();
