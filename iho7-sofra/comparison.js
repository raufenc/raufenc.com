(() => {
  'use strict';
  const selection=document.querySelector('#selection'), viewer=document.querySelector('#viewer'), host=document.querySelector('#frame-host');
  const versions={new:{url:'new.html',title:'التجربة الجديدة'},original:{url:'klasik/',title:'النشاط الأصلي'}};
  const frames=new Map(), playing=new WeakMap();
  let active=null, last='new';
  function pause(frame){
    if(!frame.contentDocument)return;
    const media=[...frame.contentDocument.querySelectorAll('video,audio')];
    playing.set(frame,media.filter(el=>!el.paused&&!el.ended));
    media.forEach(el=>el.pause());
  }
  function resume(frame){
    for(const el of playing.get(frame)||[]) if(!el.ended) el.play().catch(()=>{});
    playing.delete(frame);
  }
  function getFrame(key){
    if(frames.has(key)) return frames.get(key);
    const frame=document.createElement('iframe');
    frame.name='comparison-'+key;frame.title=versions[key].title;frame.allow='autoplay; fullscreen';
    frame.src=versions[key].url;frame.hidden=true;
    frame.addEventListener('load',()=>{
      if(active!==key)pause(frame);
      frame.contentDocument.addEventListener('play',event=>{
        if(active!==key||document.hidden){
          const pending=playing.get(frame)||[];
          if(!pending.includes(event.target))pending.push(event.target);
          playing.set(frame,pending);event.target.pause?.();
        }
      },true);
    });
    frames.set(key,frame);host.append(frame);return frame;
  }
  function render(){
    const key=location.hash.slice(1), next=Object.hasOwn(versions,key)?key:null;
    if(active===next)return;
    if(active){const prior=frames.get(active);pause(prior);prior.hidden=true;prior.inert=true;}
    active=next;selection.hidden=!!next;viewer.hidden=!next;
    for(const [id] of Object.entries(versions)){
      const button=document.querySelector('#switch-'+id);
      if(id===next)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');
    }
    if(next){
      last=next;const frame=getFrame(next);frame.hidden=false;frame.inert=false;resume(frame);
      document.title=versions[next].title+' · على المائدة';
      document.querySelector('#switch-'+next).focus({preventScroll:true});
    }else{
      document.title='على المائدة · الأصلي والجديد';
      document.querySelector(last==='new'?'#choose-new':'#choose-old').focus({preventScroll:true});
    }
  }
  window.addEventListener('hashchange',render);
  window.addEventListener('pagehide',()=>{if(active)pause(frames.get(active));});
  // A background tab must not keep either activity speaking.
  document.addEventListener('visibilitychange',()=>{
    if(active){if(document.hidden)pause(frames.get(active));else resume(frames.get(active));}
  });
  render();
})();
