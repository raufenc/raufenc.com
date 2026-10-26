(() => {
  const start=document.querySelector('#startScreen');
  const sync=()=>document.body.classList.toggle('is-start',!start.classList.contains('hide'));
  new MutationObserver(sync).observe(start,{attributes:true,attributeFilter:['class']});sync();
  document.body.classList.toggle('embedded',window.parent!==window);
  document.querySelector('#vid').controls=true;
})();
