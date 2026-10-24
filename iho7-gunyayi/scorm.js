(function(){
  var api=null;
  function findApi(win){
    var tries=0;
    while(win && tries<8){
      if(win.API) return win.API;
      tries++;
      win=win.parent && win.parent!==win ? win.parent : null;
    }
    return null;
  }
  function apiCall(name,value){
    if(!api) return false;
    try{
      if(typeof value==="undefined") return api[name] && api[name]("");
      return api[name] && api[name](value);
    }catch(e){ return false; }
  }
  window.EbaScorm={
    init:function(){
      api=findApi(window) || (window.opener ? findApi(window.opener) : null);
      if(api){
        apiCall("LMSInitialize","");
        apiCall("LMSSetValue","cmi.core.lesson_status","incomplete");
        apiCall("LMSCommit","");
      }
    },
    complete:function(score){
      if(!api) return;
      var pct=Math.max(0,Math.min(100,Math.round(score||100)));
      apiCall("LMSSetValue","cmi.core.score.raw",String(pct));
      apiCall("LMSSetValue","cmi.core.lesson_status",pct>=50 ? "passed" : "completed");
      apiCall("LMSCommit","");
    },
    finish:function(){
      if(api){
        apiCall("LMSCommit","");
        apiCall("LMSFinish","");
      }
    }
  };
  window.EbaScorm.init();
  window.addEventListener("beforeunload",function(){ window.EbaScorm.finish(); });
})();