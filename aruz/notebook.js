(() => {
 'use strict';
 const KEYS=['failatun-learning-v4','failatun-play-v1'],LIMIT=256*1024;
 const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 function create(learning,play){return {format:'failatun-defteri',version:1,savedAt:new Date().toISOString(),learning,play}}
 function decode(text,normalize){
  if(typeof text!=='string'||text.length>LIMIT)throw new Error('Bu defter dosyası fazla büyük. Fâilâtün’den indirdiğin dosyayı seç.');
  let raw;try{raw=JSON.parse(text)}catch{throw new Error('Dosya okunamadı. Fâilâtün’den indirdiğin defter dosyasını seç.')}
  if(!record(raw)||raw.format!=='failatun-defteri'||raw.version!==1||!record(raw.learning)||!record(raw.play))throw new Error('Bu dosya desteklenen bir Fâilâtün defteri değil.');
  return normalize({learning:raw.learning,play:raw.play});
 }
 function commit(storage,data){
  const before=KEYS.map(k=>storage.getItem(k)),values=[data.learning,data.play];
  try{KEYS.forEach((k,i)=>storage.setItem(k,JSON.stringify(values[i])))}catch(error){
   let restored=true;
   KEYS.forEach((k,i)=>{try{if(before[i]===null)storage.removeItem(k);else storage.setItem(k,before[i])}catch{restored=false}});
   throw new Error(restored?'Defter saklanamadı. Mevcut kayıtların korundu; tarayıcının saklama iznini kontrol et.':'Defter saklanamadı ve önceki kayıtlar bütünüyle geri konamadı. İndirdiğin yedek dosyasını muhafaza et.');
  }
 }
 const readFile=file=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Dosya okunamadı. Yeniden seçmeyi dene.'));reader.readAsText(file)});
 function open({showDialog,snapshot,normalize,onApply,toast}){
  showDialog('<h2>Defterin seninle gelsin.</h2><p>Derslerini, beyit çalışmalarını ve oyunlarını bir dosyaya kaydet. Başka bir cihazda yahut Fâilâtün’ün yeni adresinde bu dosyayı açıp devam edebilirsin.</p><div class="action-row"><button class="primary" id="downloadNotebook">Defterimi indir ↓</button></div><hr><label class="field-label" for="notebookFile">KAYDETTİĞİN DEFTERİ SEÇ</label><input class="lab-input" style="min-height:auto;margin-top:12px" type="file" id="notebookFile" accept="application/json,.json"><div id="notebookPreview" class="note-box" hidden><p id="notebookSummary"></p><p>Bu dosyadaki kayıtlar, buradaki ders ve oyun kayıtlarının yerini alacak. Mevcut defterini de saklamak için önce yukarıdan indir.</p><button class="secondary" id="applyNotebook">Bu defteri yükle</button></div><p id="notebookMessage" role="status" aria-live="polite"></p><p class="subtle">Dosya bu tarayıcıda okunur. Bir sunucuya gönderilmez.</p>');
  const $=s=>document.querySelector(s),dialog=$('#infoDialog');let pending=null,ticket=0,alive=true;
  dialog.addEventListener('close',()=>{alive=false;ticket++},{once:true});
  $('#downloadNotebook').onclick=()=>{
   try{const data=snapshot(),blob=new Blob([JSON.stringify(create(data.learning,data.play),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='failatun-defterim-'+new Date().toISOString().slice(0,10)+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#notebookMessage').textContent='Defter dosyan hazır. İndirilenler arasından alabilirsin.'}catch{$('#notebookMessage').textContent='Defter indirilemedi. Bu tarayıcıda dosya indirmeye izin verip yeniden dene.'}
  };
  $('#notebookFile').onchange=async e=>{
   const own=++ticket,file=e.target.files?.[0];pending=null;$('#notebookPreview').hidden=true;$('#notebookMessage').textContent='';if(!file)return;
   try{if(file.size>LIMIT)throw new Error('Bu dosya fazla büyük. Fâilâtün’den indirdiğin defter dosyasını seç.');const parsed=decode(await readFile(file),normalize);if(!alive||ticket!==own)return;pending=parsed;$('#notebookSummary').textContent=parsed.learning.completed.length+' tamamlanmış ders · '+parsed.learning.bookmarks.length+' defter kaydı · '+parsed.play.collected.length+' tamamlanmış oyun eli';$('#notebookPreview').hidden=false}catch(error){if(alive&&ticket===own)$('#notebookMessage').textContent=error.message}
  };
  $('#applyNotebook').onclick=()=>{
   if(!pending||!alive)return;
   try{commit(localStorage,pending);onApply(pending);dialog.close();toast('Defterin yüklendi. Kaldığın yerden devam edebilirsin.')}catch(error){$('#notebookMessage').textContent=error.message}
  };
 }
 window.AruzNotebook={create,decode,commit,open};
})();
