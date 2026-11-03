let cleanup=null;
const pendingWrites=new Map();
const checkpointKey='iyilik-color-checkpoint';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function closeColorStudio(){if(cleanup){cleanup();cleanup=null}}
function db(){
 return new Promise((resolve,reject)=>{if(!window.indexedDB){reject(Error('unavailable'));return}const req=indexedDB.open('iyilik-coloring',1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('drawings'))req.result.createObjectStore('drawings')};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
}
async function readDrawing(id){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction('drawings','readonly'),r=tx.objectStore('drawings').get(id);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);tx.oncomplete=()=>d.close()})}
async function writeDrawing(id,value){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction('drawings','readwrite');tx.objectStore('drawings').put(value,id);tx.oncomplete=()=>{d.close();resolve()};tx.onerror=()=>{d.close();reject(tx.error)}})}
function loadImage(src){return new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src})}
function blobOf(canvas){return new Promise(resolve=>canvas.toBlob(resolve,'image/png'))}
function download(url,name){const a=document.createElement('a');a.href=url;a.download=name;a.click()}
export async function mountColorStudio(root,lesson,toast,icon){
 closeColorStudio();
 const colors=['#de5f4b','#ed9454','#e7c64f','#9cab5a','#4c8c69','#5b9eae','#6978b6','#ac79a4','#9a7659','#333e39'];
 root.innerHTML=`<div class="colorstudio"><div class="canvas-wrap"><canvas id="color-canvas" width="800" height="1130" role="img" aria-label="${escape(lesson.title)} için boyama tuvali" tabindex="0"></canvas><span id="canvas-loading" style="position:absolute;top:35px;font-size:13px;background:white;padding:10px;border-radius:10px">Boyama hazırlanıyor…</span></div>
 <aside class="color-tools" aria-label="Boyama araçları"><div class="palettegroup"><div class="tool-title">RENGİNİ SEÇ</div><div class="palette">${colors.map((c,i)=>`<button class="swatch ${i===0?'active':''}" style="background:${c}" data-color="${c}" aria-label="${['Kırmızı','Turuncu','Sarı','Açık yeşil','Yeşil','Mavi','Mor','Pembe','Kahverengi','Koyu gri'][i]}" aria-pressed="${i===0}"></button>`).join('')}</div></div>
 <div><div class="tool-title" style="margin-bottom:8px">ARACIN</div><div class="toolbuttons"><button class="button small soft" data-tool="brush" aria-pressed="true">Kalem</button><button class="button small light" data-tool="fill" aria-pressed="false">Doldur</button><button class="button small light" data-tool="eraser" aria-pressed="false">Silgi</button></div></div>
 <div><label for="brush-size">KALEM KALINLIĞI</label><input type="range" id="brush-size" min="3" max="55" value="19" aria-label="Kalem kalınlığı"><div class="toolbuttons"><button class="button small light" id="undo-paint" disabled>Geri al</button><button class="button small light" id="clear-paint">Temizle</button></div></div>
 <div><button class="button small" id="save-paint">${icon('download')} PNG indir</button><button class="button small light" id="print-paint" style="margin-top:7px">Boyamamı yazdır</button><a class="button small light" href="assets/${lesson.id}.png" download="${lesson.id}-bos.png" style="margin-top:7px">Boş resmi indir</a><p class="savehint" id="paint-status" role="status" aria-live="polite">Çizimin bu cihazda otomatik saklanır.</p></div></aside></div>
 <p class="notice">“Doldur” kapalı bir alanı renklendirir. Çizgide açıklık varsa renk başka alana geçebilir; “Geri al” ile dönebilirsin. Klavye kullanıyorsan, tuvalde ok tuşlarıyla ilerleyip boşluk tuşuyla bir nokta boyayabilirsin.</p>`;
 const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
 const base=document.createElement('canvas'),paint=document.createElement('canvas'),bc=base.getContext('2d',{willReadFrequently:true}),pc=paint.getContext('2d',{willReadFrequently:true});
 const status=root.querySelector('#paint-status'),undoButton=root.querySelector('#undo-paint');
 let disposed=false,ready=false,active=false,activePointerId=null,dirty=false,color=colors[0],tool='brush',size=19,last=null,history=[],keyPoint={x:50,y:50},basePixels=null,revision=0;
 const updateStatus=text=>{if(!disposed)status.textContent=text};
 function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(base,0,0);ctx.globalCompositeOperation='multiply';ctx.drawImage(paint,0,0);ctx.globalCompositeOperation='source-over'}
 function snapshot(){history.push(pc.getImageData(0,0,paint.width,paint.height));if(history.length>16)history.shift();undoButton.disabled=false}
 function persist(){
  if(!ready||!dirty)return pendingWrites.get(lesson.id)||Promise.resolve();
  const localRevision=revision,at=Date.now(),snapshot=paint.toDataURL('image/png');dirty=false;
  try{localStorage.setItem(checkpointKey,JSON.stringify({id:lesson.id,at,data:snapshot}))}catch{}
  const bytes=atob(snapshot.split(',')[1]),array=new Uint8Array(bytes.length);for(let i=0;i<bytes.length;i++)array[i]=bytes.charCodeAt(i);
  const blob=new Blob([array],{type:'image/png'});
  const pending=(pendingWrites.get(lesson.id)||Promise.resolve()).catch(()=>{}).then(()=>writeDrawing(lesson.id,blob)).then(()=>{
   try{const saved=JSON.parse(localStorage.getItem(checkpointKey)||'null');if(saved?.id===lesson.id&&saved?.at===at&&saved?.data===snapshot)localStorage.removeItem(checkpointKey)}catch{}
   if(localRevision===revision)updateStatus('Boyaman bu cihazda saklandı.');
  }).catch(()=>{if(localRevision===revision)dirty=true;updateStatus('Cihaz kaydı kullanılamıyor. Boyamanı PNG olarak indirerek koruyabilirsin.')});
  pendingWrites.set(lesson.id,pending);return pending;
 }
 function scheduleSave(){revision++;dirty=true;updateStatus('Boyaman saklanıyor…');persist()}
 function point(ev){const r=canvas.getBoundingClientRect();return {x:Math.max(0,Math.min(canvas.width-1,(ev.clientX-r.left)*canvas.width/r.width)),y:Math.max(0,Math.min(canvas.height-1,(ev.clientY-r.top)*canvas.height/r.height))}}
 function segment(a,b){dirty=true;pc.globalCompositeOperation=tool==='eraser'?'destination-out':'source-over';pc.strokeStyle=color;pc.fillStyle=color;pc.lineWidth=size;pc.lineCap='round';pc.lineJoin='round';pc.beginPath();pc.moveTo(a.x,a.y);pc.lineTo(b.x,b.y);pc.stroke();if(a.x===b.x&&a.y===b.y){pc.beginPath();pc.arc(a.x,a.y,size/2,0,Math.PI*2);pc.fill()}pc.globalCompositeOperation='source-over';draw()}
 function fillAt(p){
 const w=canvas.width,h=canvas.height,x=Math.floor(p.x),y=Math.floor(p.y),start=(y*w+x)*4;
 if(basePixels[start]<180||basePixels[start+1]<180||basePixels[start+2]<180){toast('Çizginin içindeki açık bir alana dokun.');return}
 const data=pc.getImageData(0,0,w,h),d=data.data,target=[d[start],d[start+1],d[start+2],d[start+3]],rgb=color.match(/\w\w/g).map(x=>parseInt(x,16));
 if(target[3]===255&&target.slice(0,3).every((v,i)=>v===rgb[i]))return;
 const seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;queue[tail++]=y*w+x;seen[y*w+x]=1;
 const accept=(idx)=>{const z=idx*4;return basePixels[z]>180&&basePixels[z+1]>180&&basePixels[z+2]>180&&Math.abs(d[z]-target[0])<30&&Math.abs(d[z+1]-target[1])<30&&Math.abs(d[z+2]-target[2])<30&&Math.abs(d[z+3]-target[3])<30};
 while(head<tail){const pos=queue[head++],z=pos*4;if(!accept(pos))continue;d[z]=rgb[0];d[z+1]=rgb[1];d[z+2]=rgb[2];d[z+3]=255;const px=pos%w;for(const next of [px?pos-1:-1,px<w-1?pos+1:-1,pos>=w?pos-w:-1,pos<w*(h-1)?pos+w:-1])if(next>=0&&!seen[next]){seen[next]=1;queue[tail++]=next}}
 pc.putImageData(data,0,0);draw();scheduleSave();
 }
 const down=ev=>{if(!ready||disposed||active||ev.isPrimary===false)return;ev.preventDefault();snapshot();last=point(ev);keyPoint=last;if(tool==='fill'){fillAt(last);return}active=true;activePointerId=ev.pointerId;canvas.setPointerCapture(ev.pointerId);segment(last,last)};
 const move=ev=>{if(!active||ev.pointerId!==activePointerId)return;const p=point(ev);segment(last,p);last=p};
 const up=ev=>{if(!active||ev.pointerId!==activePointerId)return;active=false;activePointerId=null;scheduleSave()};
 canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 canvas.onkeydown=ev=>{if(!ready)return;const step=ev.shiftKey?40:12;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(ev.key))ev.preventDefault();if(ev.key==='ArrowUp')keyPoint.y-=step;if(ev.key==='ArrowDown')keyPoint.y+=step;if(ev.key==='ArrowLeft')keyPoint.x-=step;if(ev.key==='ArrowRight')keyPoint.x+=step;keyPoint.x=Math.max(size,Math.min(canvas.width-size,keyPoint.x));keyPoint.y=Math.max(size,Math.min(canvas.height-size,keyPoint.y));draw();if(ev.key===' '){snapshot();tool==='fill'?fillAt(keyPoint):segment(keyPoint,keyPoint);scheduleSave()}else if(ev.key.startsWith('Arrow')){ctx.strokeStyle='#c0711a';ctx.lineWidth=2;ctx.strokeRect(keyPoint.x-8,keyPoint.y-8,16,16)}};
 root.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>{color=b.dataset.color;root.querySelectorAll('[data-color]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)})});
 root.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{tool=b.dataset.tool;root.querySelectorAll('[data-tool]').forEach(x=>{x.classList.toggle('soft',x===b);x.classList.toggle('light',x!==b);x.setAttribute('aria-pressed',x===b)})});
 root.querySelector('#brush-size').oninput=ev=>size=Number(ev.target.value);
 undoButton.onclick=()=>{if(!ready||!history.length)return;pc.putImageData(history.pop(),0,0);draw();undoButton.disabled=!history.length;scheduleSave()};
 root.querySelector('#clear-paint').onclick=()=>{if(!ready)return;if(!confirm('Bu boyamadaki renkleri temizleyelim mi? Geri al ile geri dönebilirsin.'))return;snapshot();pc.clearRect(0,0,paint.width,paint.height);draw();scheduleSave()};
 root.querySelector('#save-paint').onclick=async()=>{if(!ready)return;draw();const blob=await blobOf(canvas);if(blob){const url=URL.createObjectURL(blob);download(url,`${lesson.id}-boyamam.png`);setTimeout(()=>URL.revokeObjectURL(url),1000)}};
 root.querySelector('#print-paint').onclick=()=>{if(!ready)return;draw();const w=window.open('','_blank');if(!w){toast('Yazdırmak için tarayıcıdaki açılır pencereye izin ver.');return}w.document.write(`<!doctype html><html lang="tr"><head><title>${escape(lesson.title)} · Boyamam</title><style>body{margin:0;text-align:center}img{max-width:100%;max-height:95vh;object-fit:contain}button{margin:12px;padding:12px 24px}@media print{button{display:none}}</style></head><body><button onclick="window.print()">Yazdır</button><br><img alt="${escape(lesson.title)}" src="${canvas.toDataURL('image/png')}"></body></html>`);w.document.close()};
 const flushHidden=()=>{if(document.visibilityState==='hidden')persist()};
 window.addEventListener('pagehide',persist);document.addEventListener('visibilitychange',flushHidden);
 cleanup=()=>{disposed=true;if(ready&&dirty)persist();window.removeEventListener('pagehide',persist);document.removeEventListener('visibilitychange',flushHidden);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up)};
 try{
 const image=await loadImage(`assets/${lesson.id}.png`);if(disposed)return;
 canvas.width=base.width=paint.width=image.naturalWidth;canvas.height=base.height=paint.height=image.naturalHeight;
 bc.drawImage(image,0,0);basePixels=bc.getImageData(0,0,base.width,base.height).data;keyPoint={x:canvas.width/2,y:canvas.height/2};
 await (pendingWrites.get(lesson.id)||Promise.resolve());
 let recovered=null;try{const cp=JSON.parse(localStorage.getItem(checkpointKey)||'null');if(cp?.id===lesson.id)recovered=cp.data}catch{}
 try{const saved=recovered||await readDrawing(lesson.id);if(saved&&!disposed){const url=typeof saved==='string'?saved:URL.createObjectURL(saved);try{const old=await loadImage(url);if(!disposed)pc.drawImage(old,0,0,paint.width,paint.height)}finally{if(typeof saved!=='string')URL.revokeObjectURL(url)}}}catch{updateStatus('Cihaz kaydı kullanılamıyor. PNG indir ile boyamanı koruyabilirsin.')}
 if(disposed)return;draw();ready=true;root.querySelector('#canvas-loading').remove();if(recovered){dirty=true;persist()}
 }catch{if(!disposed){root.querySelector('#canvas-loading').textContent='Resim yüklenemedi. Bağlantını kontrol edip bu boyamayı yeniden aç.';updateStatus('Boyama henüz yüklenmedi.');}}
}
