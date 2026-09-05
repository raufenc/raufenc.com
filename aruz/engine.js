(function(root){
 'use strict';
 const V='aeıioöuüâîû';
 const normalize=s=>String(s).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z]/g,'');
 const marks=s=>[...s].map(c=>c==='L'?'—':'⏑').join(' ');
 const wordsOf=line=>line.toLocaleLowerCase('tr-TR').replace(/[‘’'ʿʾ]/g,'').split(/[\s–—-]+/).map(w=>w.replace(/[^a-zçğıöşüâîû]/g,'')).filter(Boolean);
 const syllableToken=(text,wordIndex)=>({text,wordIndex,natural:!V.includes(text.at(-1))||/[âîû]/.test(text)?'L':'S',medEligible:!V.includes(text.at(-1))&&(/[âîû]/.test(text)||/[^aeıioöuüâîû]{2}$/.test(text))});
 function markToken(t,last){t.mark=last?'L':t.natural;if(last&&t.natural==='S'){t.operation='line_end';t.note='Mısra sonundaki açık hece uzun kabul edilir.'}return t}
 function tokenChoices(t,last,options){
  const choices=[{mark:t.mark||t.natural,cost:0,operation:t.operation}];
  if(!options.manual&&!last){if(t.natural==='S'&&options.allowImale!==false)choices.push({mark:'L',cost:1,operation:'imale'});if(t.medEligible&&options.allowMed!==false)choices.push({mark:'LS',cost:.8,operation:'med'})}
  return choices;
 }
 function syllabifyWord(raw){
  const word=raw.toLocaleLowerCase('tr-TR').replace(/[^a-zçğıöşüâîû]/g,'');
  const positions=[...word].map((c,i)=>V.includes(c)?i:-1).filter(i=>i>=0);
  if(!positions.length)return [];
  const out=[];let start=0;
  for(let i=0;i<positions.length-1;i++){const a=positions[i],b=positions[i+1];const cut=b-a<=2?a+1:b-1;out.push(word.slice(start,cut));start=cut}
  out.push(word.slice(start));return out;
 }
 function tokenize(line,vasl=false){
  const words=wordsOf(line);
  const junctions=[];
  if(vasl){for(let i=0;i<words.length-1;i++){const a=words[i],b=words[i+1];if(a&&b&&!V.includes(a.at(-1))&&V.includes(b[0])){junctions.push(`${a}_${b}`);words[i]=a.slice(0,-1);words[i+1]=a.at(-1)+b}}}
  const tokens=words.flatMap((w,wi)=>syllabifyWord(w).map(text=>syllableToken(text,wi)));
  tokens.forEach((t,i)=>markToken(t,i===tokens.length-1));
  return {tokens,junctions};
 }
 function flattenCorpus(data){
  if(Array.isArray(data))return data;
  return [...(data?.lines||[]),...(data?.recordingAlternatives?.fuzuli?.lines||[]),...(data?.meterAddition?.examples||[])].filter(x=>x.text&&x.feet);
 }
 function align(tokens,meter,options={}){
  const memo=new Map(),p=meter.pattern;
  function step(i,j){const key=i+','+j;if(memo.has(key))return memo.get(key);if(i===tokens.length)return j===p.length?{cost:0,operations:[],realization:[]}:null;
   const t=tokens[i],choices=tokenChoices(t,i===tokens.length-1,options);
   let best=null;
   for(const ch of choices){if(p.slice(j,j+ch.mark.length)!==ch.mark)continue;const next=step(i+1,j+ch.mark.length);if(!next)continue;const current={cost:ch.cost+next.cost,operations:[...(ch.cost?[{index:i,text:t.text,type:ch.operation}]:[]),...next.operations],realization:[{...t,mark:ch.mark,operation:ch.operation},...next.realization]};if(!best||current.cost<best.cost)best=current}
   memo.set(key,best);return best;
  }
  return step(0,0);
 }
 function alignOptionalVasl(line,meter,options){
  const words=wordsOf(line),offsets=[];let count=0;
  words.forEach(w=>{offsets.push(count);count+=syllabifyWord(w).length});
  const p=meter.pattern,memo=new Map();
  // The boundary decision travels with the meter position. This examines mixed
  // vasl readings without enumerating every subset of a long line's boundaries.
  function wordStep(wi,j,incoming){
   if(wi===words.length)return j===p.length?{cost:0,operations:[],realization:[],junctions:[]}:null;
   if(j>p.length)return null;
   const key=wi+','+j+','+incoming;if(memo.has(key))return memo.get(key);
   const canJoin=wi<words.length-1&&!V.includes(words[wi].at(-1))&&V.includes(words[wi+1][0]);
   let best=null;
   for(const outgoing of canJoin?[false,true]:[false]){
    let word=(incoming?words[wi-1].at(-1):'')+words[wi];if(outgoing)word=word.slice(0,-1);
    const tokens=syllabifyWord(word).map((s,i)=>markToken(syllableToken(s,wi),offsets[wi]+i===count-1)),local=new Map();
    function syllableStep(i,pos){
     if(i===tokens.length)return wordStep(wi+1,pos,outgoing);
     const k=i+','+pos;if(local.has(k))return local.get(k);
     const t=tokens[i],index=offsets[wi]+i;let result=null;
     for(const ch of tokenChoices(t,index===count-1,options)){
      if(p.slice(pos,pos+ch.mark.length)!==ch.mark)continue;
      const next=syllableStep(i+1,pos+ch.mark.length);if(!next)continue;
      const current={cost:ch.cost+next.cost,operations:[...(ch.cost?[{index,text:t.text,type:ch.operation}]:[]),...next.operations],realization:[{...t,mark:ch.mark,operation:ch.operation},...next.realization],junctions:next.junctions};
      if(!result||current.cost<result.cost)result=current;
     }
     local.set(k,result);return result;
    }
    const match=syllableStep(0,j);if(!match)continue;
    const current={...match,cost:match.cost+(outgoing ? .15 : 0),junctions:[...(outgoing?[words[wi]+'_'+words[wi+1]]:[]),...match.junctions]};
    if(!best||current.cost<best.cost)best=current;
   }
   memo.set(key,best);return best;
  }
  return wordStep(0,0,false);
 }
 function metersWithVariants(meters){
  const all=[...meters,{name:'Fâilâtün · Feilâtün · Feilâtün · Fa‘lün',pattern:'LSLLSSLLSSLLLL'},{name:'Feilâtün · Feilâtün · Feilâtün · Fa‘lün',pattern:'SSLLSSLLSSLLLL'},{name:'Fâilâtün · Feilâtün · Feilâtün · Feilün',pattern:'LSLLSSLLSSLLSSL'},{name:'Mef‘ûlü · Mefâîlü · Feûlün',pattern:'LLSSLLSSLL'}];
  return all.filter((m,i)=>all.findIndex(x=>x.pattern===m.pattern)===i);
 }
 function analyze(line,{corpus,meters=[],manualTokens=null,allowImale=true,allowMed=true,allowVasl=true}={}){
  if(typeof line!=='string'||!line.trim())return {kind:'empty',message:'Önce tek bir mısra yaz.'};
  if(line.length>240)return {kind:'invalid',message:'Tek seferde en fazla 240 karakterlik bir mısra incele.'};
  if(/[0-9]/.test(line)||!/[aeıioöuüâîû]/i.test(line))return {kind:'invalid',message:'Sayı veya işaret yerine, kelimelerden oluşan tek bir mısra yaz.'};
  if(line.trim().split(/\n/).length>1)return {kind:'invalid',message:'Bu alan tek mısra içindir. Mısraları burada sırayla incele; vezni tespit ederken şiirin diğer mısralarını da karşılaştır.'};
  const known=!manualTokens&&flattenCorpus(corpus).find(l=>normalize(l.text)===normalize(line));
  if(known)return {kind:'known',line:known,normalized:line!==known.text};
  const primary=manualTokens?{tokens:manualTokens,junctions:[]}:tokenize(line);
  if(primary.tokens.length<4)return {kind:'invalid',message:'Bu giriş bir mısranın kalıbını karşılaştırmak için çok kısa. En az dört hecelik bir söz yaz.'};
  const candidates=[];
  for(const m of metersWithVariants(meters)){const options={allowImale,allowMed,manual:!!manualTokens};const a=allowVasl&&!manualTokens?alignOptionalVasl(line,m,options):align(primary.tokens,m,options);if(a&&a.operations.length<=Math.max(2,Math.floor(primary.tokens.length*.35)))candidates.push({...m,...a,junctions:a.junctions||[]})}
  const ranked=candidates.sort((a,b)=>a.cost-b.cost).filter((c,i,all)=>all.findIndex(x=>x.pattern===c.pattern)===i).slice(0,3);
  return {kind:'exploratory',tokens:primary.tokens,candidates:ranked,message:ranked.length?'Bunlar muhtemel okumalar. Kelimelerin tarihî telaffuzu ve şiirin diğer mısralarıyla denetle.':'Bu hecelemeyle güvenilir bir kalıp önerisi çıkmadı; bu, mısranın kusurlu olduğunu göstermez. Metni, tarihî telaffuzu ve şiirin diğer mısralarını karşılaştır.'};
 }
 const api={normalize,marks,syllabifyWord,tokenize,align,flattenCorpus,metersWithVariants,analyze};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AruzEngine=api;
})(typeof window!=='undefined'?window:globalThis);
