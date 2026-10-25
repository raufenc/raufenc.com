(function(){
  'use strict';
  var api=null,initialized=false,finished=false,start=Date.now(),interactionCount=0;
  function discover(win){
    for(var i=0;win&&i<12;i++){
      try{if(win.API&&typeof win.API.LMSInitialize==='function')return win.API;if(win.parent===win)break;win=win.parent;}catch(_){break;}
    }
    return null;
  }
  function call(method){
    if(!api||typeof api[method]!=='function')return null;
    try{return api[method].apply(api,Array.prototype.slice.call(arguments,1));}catch(_){return null;}
  }
  function set(key,value){return call('LMSSetValue',key,String(value));}
  function get(key){return call('LMSGetValue',key);}
  function commit(){if(initialized&&!finished)call('LMSCommit','');}
  function duration(ms){
    var c=Math.max(0,Math.floor(ms/10)),h=Math.floor(c/360000),m=Math.floor(c/6000)%60,s=Math.floor(c/100)%60;
    return String(h).padStart(4,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(c%100).padStart(2,'0');
  }
  api=discover(window);
  if(!api){try{if(window.opener)api=discover(window.opener);}catch(_){}}
  if(api){
    initialized=String(call('LMSInitialize',''))==='true';
    if(initialized){
      var status=get('cmi.core.lesson_status');
      if(!status||status==='not attempted')set('cmi.core.lesson_status','incomplete');
      interactionCount=parseInt(get('cmi.interactions._count'),10)||0;
      commit();
    }
  }
  window.LearningBridge={
    connected:function(){return initialized&&!finished;},
    read:function(){if(!initialized)return null;try{return JSON.parse(get('cmi.suspend_data')||'null');}catch(_){return null;}},
    save:function(state){
      if(!initialized||finished)return;
      var data=JSON.stringify(state);
      if(data.length<=4000)set('cmi.suspend_data',data);
      set('cmi.core.lesson_location','stop-'+(state.current+1));
      var complete=state.done.filter(Boolean).length===5;
      var answered=state.first.filter(function(x){return x!==null;}).length;
      if(answered){
        set('cmi.core.score.min',0);set('cmi.core.score.max',100);
        set('cmi.core.score.raw',state.first.filter(function(x){return x===true;}).length*20);
      }
      set('cmi.core.lesson_status',complete?'completed':'incomplete');
      set('cmi.core.exit',complete?'':'suspend');
      set('cmi.core.session_time',duration(Date.now()-start));
      commit();
    },
    record:function(index,response,correct,latency){
      if(!initialized||finished)return;
      var prefix='cmi.interactions.'+(interactionCount++);
      set(prefix+'.id','s013-q'+(index+1));set(prefix+'.type','choice');
      set(prefix+'.student_response',String.fromCharCode(97+response));
      set(prefix+'.result',correct?'correct':'wrong');set(prefix+'.latency',duration(latency));
      commit();
    },
    reset:function(){
      if(!initialized||finished)return;
      set('cmi.suspend_data','');set('cmi.core.lesson_location','stop-1');
      set('cmi.core.score.raw',0);set('cmi.core.lesson_status','incomplete');commit();
    },
    finish:function(){
      if(!initialized||finished)return;
      set('cmi.core.session_time',duration(Date.now()-start));commit();call('LMSFinish','');finished=true;
    }
  };
  window.addEventListener('pagehide',function(event){if(!event.persisted)window.LearningBridge.finish();else commit();});
  window.addEventListener('beforeunload',function(){window.LearningBridge.finish();});
})();
