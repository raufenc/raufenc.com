(() => {
  'use strict';
  const feet=[['Fâilâtün','LSLL'],['Mefâîlün','SLLL'],['Feûlün','SLL'],['Mef‘ûlü','LLS'],['Mefâîlü','SLLS'],['Feilâtün','SSLL'],['Müstef‘ilün','LLSL'],['Fâilün','LSL']];
  const ids=['failatun','mefailun','feulun','mefulu','mefailu','feilatun','mustefilun','failun'];
  let selected=0,tempo=80;
  window.getFailatunRhythm=()=>({id:ids[selected],name:feet[selected][0]});
  window.renderFailatunRhythms=({esc,marks,playPattern,stopTones,newEar,resetBuilder})=>{
    const requested=ids.indexOf(new URLSearchParams(location.search).get('ritim'));if(requested>=0)selected=requested;
    const main=document.querySelector('#main'),$=s=>main.querySelector(s),$$=s=>[...main.querySelectorAll(s)];
    main.innerHTML=`<div class="page-intro"><div><span class="eyebrow">DİNLE</span><h1>Ritimleri dinle.</h1></div><p class="intro-copy">Oynat düğmesine bas. Başka bir ritim duymak için adına dokun.</p></div>
      <div class="rhythm-layout">
        <section class="rhythm-player surface" aria-labelledby="rhythmName"><span class="rhythm-kicker">SEÇİLİ RİTİM</span><h2 id="rhythmName"></h2><div class="pulse-pattern" id="pulsePattern" aria-label="Kısa ve uzun hece sırası"></div><button class="primary rhythm-play" id="pulsePlay" aria-pressed="false">▶ Ritmi dinle</button><p id="rhythmStatus" class="rhythm-status" role="status">Dinlemeye hazır.</p><label class="range-label" for="tempo"><span>Hız</span><input type="range" min="45" max="125" value="${tempo}" id="tempo"><output id="tempoValue" for="tempo">${tempo}</output></label><div class="speed-labels"><span>Daha yavaş</span><span>Daha hızlı</span></div><p class="rhythm-explanation">Uzun hece iki, kısa hece bir zaman sürer.<br>Burada duyduğun sesler ritim vuruşlarıdır.</p></section>
        <section class="rhythm-selection" aria-labelledby="rhythmChoicesHeading"><h2 id="rhythmChoicesHeading">Bir ritme dokun, dinle.</h2><div class="rhythm-choices">${feet.map(([name,pattern],i)=>`<button data-rhythm="${i}" aria-label="${esc(name)} ritmini dinle" aria-pressed="${i===selected}"><span><strong>${esc(name)}</strong><small aria-hidden="true">${marks(pattern)}</small></span><span class="rhythm-choice-play" aria-hidden="true">▶</span></button>`).join('')}</div><a href="#meclis" class="recording-shortcut"><span><strong>Hayâtî İnanç’tan beyit dinle</strong><small>Şiirin asıl okuyuşuna geç.</small></span><span aria-hidden="true">↗</span></a></section>
      </div>
      <details class="rhythm-exercises"><summary>Kulağını sına <span>İki kısa temrin</span></summary><div class="rhythm-exercise-grid"><section class="surface"><h2>Hangi ritmi duydun?</h2><button class="secondary" id="earPlay">▶ Gizli ritmi dinle</button><div class="ear-options" id="earOptions"></div><div class="feedback" role="status" id="earFeedback"></div><button class="text-button" id="newEar">Yeni ritim ↻</button></section><section class="surface"><h2>Fâilâtün’ü kur</h2><p class="builder-pattern">— ⏑ — —</p><p id="builderResult">Dört heceyi sırayla seç.</p><div class="ear-options" id="builderButtons"></div><button class="text-button" id="resetBuilder">Yeniden kur ↻</button></section></div></details>`;
    const owner=$('.rhythm-player');let playing=false,attempt=0;
    const paintState=active=>{playing=active;if(!owner.isConnected)return;$('#pulsePlay').textContent=active?'■ Durdur':'▶ Ritmi dinle';$('#pulsePlay').setAttribute('aria-pressed',active);$('#rhythmStatus').textContent=active?feet[selected][0]+' çalıyor.':'Dinlemeye hazır.'};
    const paint=()=>{$('#rhythmName').textContent=feet[selected][0];$('#pulsePattern').innerHTML=[...feet[selected][1]].map(mark=>`<span class="pulse-mark"><b>${marks(mark)}</b><small>${mark==='L'?'uzun':'kısa'}</small></span>`).join('');$$('[data-rhythm]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.rhythm)===selected))};
    const start=async()=>{stopTones();const ticket=++attempt;paintState(true);const ok=await playPattern(feet[selected][1],tempo,()=>paintState(false));if(ticket===attempt&&!ok)paintState(false)};
    $('#pulsePlay').onclick=()=>{if(playing){attempt++;stopTones();paintState(false)}else start()};
    $$('[data-rhythm]').forEach(button=>button.onclick=()=>{stopTones();selected=Number(button.dataset.rhythm);const url=new URL(location.href);url.search='';url.searchParams.set('ritim',ids[selected]);url.hash='ritimler';history.replaceState(null,'',url);paint();start()});
    $('#tempo').oninput=e=>{tempo=Number(e.target.value);$('#tempoValue').value=tempo;if(playing)start()};
    paint();newEar();$('#newEar').onclick=()=>{stopTones();newEar()};resetBuilder();$('#resetBuilder').onclick=()=>{stopTones();resetBuilder()};
  };
})();
