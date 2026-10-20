"use strict";
const list=document.getElementById("list");
const search=document.getElementById("search");
const filter=document.getElementById("available-only");
const count=document.getElementById("result-count");
const empty=document.getElementById("empty");
let poems=[];
const player=document.getElementById("player");
const frameHost=document.getElementById("video-frame");
const closePlayer=document.getElementById("close-player");
let activeListenButton=null;
function normalise(s){return String(s).toLocaleLowerCase("tr").replaceAll("ı","i").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’'‘]/g,"");}
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function timecode(s){const seconds=Math.floor(s||0);const m=Math.floor(seconds/60);return `${m}:${String(seconds%60).padStart(2,"0")}`;}
function safeLink(url){try{const u=new URL(url);return u.protocol==="https:"?u.href:null;}catch{return null;}}
function play(p,button){
 const v=p.recording;
 if(!v||!/^[A-Za-z0-9_-]{11}$/.test(v.video_id))return;
 activeListenButton=button;
 const u=new URL(`https://www.youtube-nocookie.com/embed/${v.video_id}`);
 u.searchParams.set("start",String(Math.max(0,Math.floor(v.start_seconds||0))));
 if(v.end_seconds)u.searchParams.set("end",String(Math.ceil(v.end_seconds)));
 u.searchParams.set("autoplay","1");u.searchParams.set("rel","0");u.searchParams.set("playsinline","1");
 const frame=el("iframe");frame.src=u.href;frame.title=`${p.number}. beyit · ${p.poet}`;
 frame.allow="autoplay; encrypted-media; picture-in-picture";frame.allowFullscreen=true;
 frame.referrerPolicy="strict-origin-when-cross-origin";frameHost.replaceChildren(frame);
 document.getElementById("player-title").textContent=`${p.number}. beyit · ${p.poet}`;
 document.getElementById("player-note").textContent=v.note||"Bu beyitle ilgili okuyuş ve izah bölümü.";
 document.getElementById("youtube-link").href=safeLink(v.url);
 player.showModal();closePlayer.focus();
}
function stop(){player.close();}
closePlayer.addEventListener("click",stop);
player.addEventListener("close",()=>{frameHost.replaceChildren();activeListenButton?.focus();});
player.addEventListener("click",e=>{if(e.target===player){const r=player.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)stop();}});
function card(p){
 const row=el("article","poem-card");row.id=`beyit-${p.number}`;row.setAttribute("aria-labelledby",`siir-${p.number}`);
 const number=el("a","number permalink",String(p.number).padStart(2,"0"));number.href=`#${row.id}`;number.setAttribute("aria-label",`${p.number}. beytin bağlantısı`);
 row.append(number);const body=el("div","card-body");row.append(body);
 const poem=el("h3","poem");poem.id=`siir-${p.number}`;p.lines.forEach(line=>poem.append(el("span",null,line)));body.append(poem);
 const meta=el("div","meta");meta.append(el("span","poet",p.poet));
 if(p.meter){const meter=el("span","meter",p.meter);meter.title=p.meter_name||"";meter.setAttribute("aria-label",p.meter_name||p.meter);meta.append(meter);}
 meta.append(el("span","page",`Kitapta ${2*p.number-1}–${2*p.number}. sayfalar`));body.append(meta);
 if(p.recording&&safeLink(p.recording.url)){
  const v=p.recording;const actions=el("div","watch-row");const a=el("button","watch");a.type="button";a.setAttribute("aria-label",`${p.number}. beyit: okuyuşu ve izahı dinle`);a.addEventListener("click",()=>play(p,a));
  const icon=el("span",null,"▶");icon.setAttribute("aria-hidden","true");a.append(icon,document.createTextNode("Okuyuşu ve izahı dinle"));actions.append(a);
  if(v.start_seconds!==null&&v.start_seconds!==undefined)actions.append(el("span","time",`Başlangıç ${timecode(v.start_seconds)}`));
  body.append(actions);const source=el("p","source source-title");source.textContent=[v.channel,v.title].filter(Boolean).join(" · ");body.append(source);
  if(v.note)body.append(el("p","source",v.note));
 }else {
  body.append(el("p","unavailable","Bu beytin okuma ve izah kaydı henüz eşleştirilmedi."));
 }
 if(p.written_source&&safeLink(p.written_source)){
  const a=el("a","written-source","Hocamızın ilgili yazısı ↗");a.href=safeLink(p.written_source);a.target="_blank";a.rel="noopener noreferrer";body.append(a);
  if(p.written_note)body.append(el("p","source",p.written_note));
 }
 return row;
}
function render(){
 const query=normalise(search.value.trim());const available=filter.getAttribute("aria-pressed")==="true";
 const result=poems.filter(p=>(!available||p.recording)&&(!query||(/^\d+$/.test(query)?p.number===Number(query):normalise([p.number,p.poet,...p.lines].join(" ")).includes(query))));
 list.replaceChildren(...result.map(card));empty.hidden=result.length>0;
 count.textContent=query||available?`${result.length} beyit gösteriliyor`:`${poems.filter(p=>p.recording).length} dinleme kaydı`;
}
search.addEventListener("input",render);
filter.addEventListener("click",()=>{filter.setAttribute("aria-pressed",String(filter.getAttribute("aria-pressed")!=="true"));render();});
fetch("beyitler.json").then(r=>{if(!r.ok)throw Error(r.status);return r.json();}).then(data=>{
 poems=data.poems;render();if(location.hash){const target=document.getElementById(location.hash.slice(1));target?.scrollIntoView();}
}).catch(()=>{list.textContent="Liste şu anda yüklenemedi. Sayfayı yenileyerek tekrar deneyebilirsiniz.";count.textContent="";});
