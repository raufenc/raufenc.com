(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const cards=new Map(JSON.parse($('#vitrin').textContent).map(c=>[c.code,c]));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const card=$('#hero-card'),flip=$('#flip');
  function turn(){const on=card.classList.toggle('flipped');card.setAttribute('aria-pressed',String(on));flip.setAttribute('aria-pressed',String(on));flip.textContent=on?'Ön yüze dönün ↻':'Kartı çevirin ↻';card.setAttribute('aria-label',on?'Kartın ön yüzünü açın':'Kartın arka yüzünü açın');}
  card.addEventListener('click',turn);flip.addEventListener('click',turn);
  card.addEventListener('pointermove',ev=>{if(reduced.matches||ev.pointerType!=='mouse')return;const r=card.getBoundingClientRect();card.style.setProperty('--ry',((ev.clientX-r.left)/r.width*16-8)+'deg');card.style.setProperty('--rx',(-((ev.clientY-r.top)/r.height*16-8))+'deg');});
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');});
  if(window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission!=='function')window.addEventListener('deviceorientation',ev=>{if(reduced.matches||ev.gamma===null)return;card.style.setProperty('--ry',Math.max(-6,Math.min(6,ev.gamma/4))+'deg');},{passive:true});
  let kin=0;const lines=$$('.kin-line span');let interval;
  function rotateStart(){clearInterval(interval);if(!reduced.matches)interval=setInterval(()=>{if(document.hidden)return;lines[kin].hidden=true;kin=(kin+1)%lines.length;lines[kin].hidden=false;},4000);}
  rotateStart();reduced.addEventListener('change',rotateStart);
  $$('.kin-toggle').forEach(b=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(on));$('.kin-front',b).setAttribute('aria-hidden',String(on));$('.kin-detail',b).setAttribute('aria-hidden',String(!on));}));
  $$('.face-tabs button').forEach(b=>b.addEventListener('click',()=>{$('.anatomy').dataset.face=b.dataset.face;$$('.face-tabs button').forEach(t=>t.setAttribute('aria-pressed',String(t===b)));}));
  const panel=$('#box-panel');
  function openBox(n,focus=false){panel.hidden=false;panel.style.setProperty('--accent',['#F04E23','#E81562','#064ED8','#6127A6','#007B68'][n-1]);$$('[data-box-content]').forEach(p=>p.hidden=p.dataset.boxContent!==String(n));$$('[data-box]').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.box===String(n))));if(focus){panel.scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});panel.focus({preventScroll:true});}}
  $$('[data-box]').forEach(b=>b.addEventListener('click',()=>{if(b.getAttribute('aria-expanded')==='true'){$('#close-box').click();return;}openBox(b.dataset.box);}));
  $$('[data-open-box]').forEach(b=>b.addEventListener('click',()=>openBox(b.dataset.openBox,true)));
  $('#close-box').addEventListener('click',()=>{const active=$('[data-box][aria-expanded=true]');panel.hidden=true;$$('[data-box]').forEach(b=>b.setAttribute('aria-expanded','false'));if(active)active.focus();});
  $$('.sample-card').forEach(b=>b.addEventListener('click',()=>{const was=b.classList.contains('active');$$('.sample-card',b.parentElement).forEach(o=>{if(o!==b){o.classList.remove('active','flipped');o.setAttribute('aria-pressed','false');}});b.classList.add('active');if(was)b.classList.toggle('flipped');b.setAttribute('aria-pressed',String(b.classList.contains('flipped')));$('[data-sample-sentence]',b.closest('[data-box-content]')).textContent=cards.get(b.dataset.sample).sentence;}));
  const colors=['#F04E23','#E81562','#064ED8','#6127A6','#007B68'];
  function light(demo,i,definition=false){$$('mark',demo).forEach(m=>{m.classList.toggle('lit',+m.dataset.word===i);m.style.setProperty('--word',colors[+m.dataset.word]);});$$('.word-chips button',demo).forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.word===i)));if(definition)$('.definition',demo).textContent=cards.get(demo.dataset.code).words[i][1];}
  $$('.sentence-demo').forEach(demo=>{$$('.word-chips button',demo).forEach(b=>b.addEventListener('click',()=>light(demo,+b.dataset.word,true)));});
  let heroVisible=true,finalVisible=false;
  function sticky(){const past=$('#kahraman').getBoundingClientRect().bottom<0;$('.sticky-cta').hidden=heroVisible||finalVisible||!past;}
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target);}}),{threshold:.1});
    $$('.section,.route,.anatomy figcaption').forEach(el=>{el.classList.add('reveal');io.observe(el);});
    const ctaIO=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.target.id==='kahraman')heroVisible=en.isIntersecting;else finalVisible=en.isIntersecting;});sticky();});ctaIO.observe($('#kahraman'));ctaIO.observe($('#son-cta'));
    const sentenceIO=new IntersectionObserver(entries=>entries.forEach(en=>{if(!en.isIntersecting)return;sentenceIO.unobserve(en.target);if(reduced.matches)return;let i=0;light(en.target,i);const timer=setInterval(()=>{if(reduced.matches||++i===5){clearInterval(timer);return;}light(en.target,i);},650);}),{threshold:.5});$$('.sentence-demo').forEach(d=>sentenceIO.observe(d));
  }
})();
