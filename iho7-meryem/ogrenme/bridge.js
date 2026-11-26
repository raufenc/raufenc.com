/* Preview-safe SCORM 1.2 adapter. Only the five first final responses contribute to the score. */
(()=>{'use strict';let api=null,active=false,finished=false,count=0;let start=Date.now();
 function find(w){for(let i=0;w&&i<12;i++){try{if(typeof w.API?.LMSInitialize==='function')return w.API;if(w.parent===w)break;w=w.parent;}catch(_){break;}}return null;}
 function call(name,...args){try{return api?.[name]?.(...args);}catch(_){return null;}}
 function set(k,v){if(active&&!finished)call('LMSSetValue',k,String(v));}
 function commit(){if(active&&!finished)call('LMSCommit','');}
 function duration(){let s=Math.floor((Date.now()-start)/1000);return `${String(Math.floor(s/3600)).padStart(4,'0')}:${String(Math.floor(s/60)%60).padStart(2,'0')}:${String(s%60).padStart(2,'0')}.00`;}
 window.MeryemLMS={
  start(preview){if(preview||finished)return;if(active){start=Date.now();set('cmi.core.lesson_status','incomplete');set('cmi.core.score.raw',0);commit();return;}start=Date.now();api=find(window);try{if(!api&&window.opener)api=find(window.opener);}catch(_){}if(!api)return;active=String(call('LMSInitialize',''))==='true';if(!active)return;count=parseInt(call('LMSGetValue','cmi.interactions._count'),10)||0;set('cmi.core.lesson_status','incomplete');set('cmi.core.score.min',0);set('cmi.core.score.max',100);set('cmi.core.score.raw',0);set('cmi.suspend_data','');commit();},
  connected:()=>active&&!finished,
  record(index,choice,correct){if(!active||finished)return;const p=`cmi.interactions.${count++}`;set(p+'.id','meryem-new-day-'+(index+1));set(p+'.type','choice');set(p+'.student_response',String.fromCharCode(97+choice));set(p+'.correct_responses.0.pattern',String.fromCharCode(97+correct));set(p+'.result',choice===correct?'correct':'wrong');commit();},
  complete(s){if(s.practiceFinal||s.final.filter(Boolean).length!==5)return;set('cmi.core.score.raw',window.MeryemEngine.score(s));set('cmi.core.lesson_status','completed');set('cmi.core.session_time',duration());set('cmi.core.exit','');commit();},
  finish(){if(!active||finished)return;set('cmi.core.session_time',duration());commit();call('LMSFinish','');finished=true;}
 };window.addEventListener('pagehide',e=>{if(!e.persisted)window.MeryemLMS.finish();});
})();
