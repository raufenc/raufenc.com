(function(){
  'use strict';
  let api=null, initialized=false, finished=false;
  function findApi(start){
    let win=start;
    for(let depth=0;win&&depth<8;depth++){
      try{if(win.API)return win.API;const parent=win.parent;if(!parent||parent===win)break;win=parent;}catch(_){break;}
    }
    return null;
  }
  function call(name,...args){
    if(!api||typeof api[name]!=='function')return false;
    try{return api[name](...(args.length?args:['']));}catch(_){return false;}
  }
  window.EbaScorm={
    init(){
      if(initialized)return;
      api=findApi(window);
      if(!api){try{if(window.opener)api=findApi(window.opener);}catch(_){}}
      if(!api)return;
      initialized=String(call('LMSInitialize',''))==='true';
      if(!initialized)return;
      const status=call('LMSGetValue','cmi.core.lesson_status');
      if(status!=='completed'&&status!=='passed')call('LMSSetValue','cmi.core.lesson_status','incomplete');
      call('LMSCommit','');
    },
    complete(score){
      if(!initialized||finished)return;
      const value=Number(score),pct=Number.isFinite(value)?Math.max(0,Math.min(100,Math.round(value))):0;
      call('LMSSetValue','cmi.core.score.min','0');
      call('LMSSetValue','cmi.core.score.max','100');
      call('LMSSetValue','cmi.core.score.raw',String(pct));
      call('LMSSetValue','cmi.core.lesson_status',pct>=50?'passed':'completed');
      call('LMSCommit','');
    },
    finish(){
      if(!initialized||finished)return;
      finished=true;call('LMSCommit','');call('LMSFinish','');
    }
  };
  window.EbaScorm.init();
  window.addEventListener('pagehide',event=>{if(!event.persisted)window.EbaScorm.finish();});
  window.addEventListener('beforeunload',()=>window.EbaScorm.finish());
})();
