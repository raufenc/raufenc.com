(() => {
  'use strict';
  const KEY='failatun-play-v1';
  // Prompts are our own; every verse, missing word and rhythm comes from the sourced corpus.
  const briefs={
    muhibbi:{line:1,word:'sıhhat',other:['servet','şöhret'],hint:'Kanûnî burada bir nefesin kıymetini saltanatla tartıyor.',reveal:'Bir padişahın cevabı: sıhhat. “Devlet” bu mısrada talih ve saadet manasına da açılıyor.',scene:'Bir dostun servet peşinde kendini tüketiyor. Ona sıhhatin kıymetini hangi mısra hatırlatır?',sceneLine:1,foils:['yahya','hayali']},
    fuzuli:{line:0,word:'Kevser',other:['deryâ','mehtap'],hint:'Zâhidlerin istediği, cennetle anılan bir sudur.',reveal:'Kevser, cennetle anılan sudur. Zâhid Kevser’i isterken âşığın gönlü sevgilinin dudağındadır.',scene:'Birinin gönlü sevgilide, ötekinin gözü cennet nimetinde. Bu iki isteği hangi mısra karşı karşıya getirir?',sceneLine:0,foils:['muhibbi','yahya']},
    galib:{line:1,word:'âdemsin',other:['deryâsın','rüyâsın'],hint:'Şair, karşısındaki insana hitap ediyor. Kelime, Âdem adını da hatırlatır.',reveal:'Âdem: insan. “Merdüm-i dîde”, göz bebeğidir. Şair insanı kâinatın göz bebeği olarak görür.',scene:'Bir dostun kendini kıymetsiz hissediyor. Ona insanın âlemdeki yerini hangi mısra hatırlatır?',sceneLine:0,foils:['nabi','fuzuli']},
    nabi:{line:0,word:'edebden',other:['kederden','seferden'],hint:'Hürmet gösterilecek bir makamdasın. Şair, nasıl davranman gerektiğini hatırlatıyor.',reveal:'“Terk-i edeb”, edebi bırakmaktır. Nâbî, Medine’de edebi elden bırakmamayı öğütler.',scene:'Hürmet gösterilecek bir makama giriyorsun. Edebi hatırlatan mısra hangisi?',sceneLine:0,foils:['galib','hayali']},
    hayali:{line:1,word:'deryâyı',other:['sahrâyı','dünyâyı'],hint:'Mâhî balıktır. İçinde yaşadığı şeyi düşün.',reveal:'Deryâ: deniz. Mâhî: balık. Beytin sırrı, içinde bulunduğu denizi bilmeyen balıklarda.',scene:'Aranan hakikat yanı başında, fakat fark edilmiyor. Bunu denizdeki balıklarla hangi mısra anlatır?',sceneLine:1,foils:['muhibbi','nabi']},
    yahya:{line:1,word:'zevâli',other:['hayâli','cemâli'],hint:'Kemâl son hadde erişmektir. Son haddine varan ayrılık da bir gün sona erer.',reveal:'Zevâl: sona erme. Ayrılık kemâle erdiyse onun da zevâli, yani sonu vardır.',scene:'Ayrılık uzadıkça ümidini yitiren bir dostun var. Ona kavuşma ihtimalini hangi mısra fısıldar?',sceneLine:0,foils:['fuzuli','muhibbi']}
  };
  const rotate=(list,n)=>list.slice(n%list.length).concat(list.slice(0,n%list.length));
  function makePlans(chapters,getLines){
    return chapters.filter(c=>briefs[c.id]).map((chapter,i)=>{
      const b=briefs[chapter.id],lines=getLines(chapter.id),line=lines[b.line],foot=lines[0].feet[0];
      if(line.text.split(b.word).length!==2)throw new Error('Missing-word source mismatch: '+chapter.id);
      return {id:chapter.id,chapter,...b,text:line.text,wordChoices:rotate([b.word,...b.other],i+1),foot,
        sceneChoices:rotate([chapter.id,...b.foils],i+2).map(id=>{const c=chapters.find(c=>c.id===id),ls=getLines(id);return {id,poet:c.poet,text:ls[id===chapter.id?b.sceneLine:1].text}}),
        sources:lines.flatMap(l=>l.sourceIds||[])};
    });
  }
  const fresh=id=>({id,round:0,word:null,scene:null,taps:[],checked:false,heard:false,hints:[false,false,false],misses:[0,0,0]});
  const complete=(run,p)=>run.word===p.word&&run.scene===p.id&&run.checked&&run.taps.join('')===p.foot.pattern;
  function restore(raw,plans){
    const data=raw&&typeof raw==='object'?raw:{},p=plans.find(p=>p.id===data.run?.id)||plans[0],r=data.run||{},run=fresh(p.id);
    run.word=p.wordChoices.includes(r.word)?r.word:null;
    run.scene=p.sceneChoices.some(c=>c.id===r.scene)?r.scene:null;
    run.taps=Array.isArray(r.taps)?r.taps.filter(x=>x==='S'||x==='L').slice(0,p.foot.pattern.length):[];
    run.checked=!!r.checked&&run.taps.length===p.foot.pattern.length;
    run.heard=!!r.heard;
    run.hints=run.hints.map((_,i)=>!!r.hints?.[i]);
    run.misses=run.misses.map((_,i)=>Number.isInteger(r.misses?.[i])?Math.max(0,Math.min(999,r.misses[i])):0);
    const ceiling=run.word!==p.word?0:run.scene!==p.id?1:complete(run,p)?3:2;
    run.round=Number.isInteger(r.round)?Math.max(0,Math.min(ceiling,r.round)):0;
    return {run,collected:[...new Set(Array.isArray(data.collected)?data.collected.filter(id=>plans.some(p=>p.id===id)):[])]};
  }
  let dispose=()=>{},memory=null;
  function render({chapters,getLines,esc,marks,playPattern,stopTones,sourceLinks,onChapter,onCollect,copyText}){
    dispose();
    const plans=makePlans(chapters,getLines);
    if(!memory){let raw={};try{raw=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{}memory=restore(raw,plans)}
    let data=memory,p=plans.find(p=>p.id===data.run.id)||plans[0],run=data.run,alive=true,playing=false,ticket=0,cancelled=false,storageOK=true;
    const requested=new URLSearchParams(location.search).get('meydan');
    if(plans.some(x=>x.id===requested)&&requested!==p.id){p=plans.find(x=>x.id===requested);data.run=fresh(p.id);run=data.run}
    const main=document.querySelector('#main'),$=s=>main.querySelector(s),$$=s=>[...main.querySelectorAll(s)];
    const save=()=>{memory=data;try{localStorage.setItem(KEY,JSON.stringify(data))}catch{storageOK=false}};
    const stop=()=>{cancelled=true;ticket++;playing=false;stopTones()};
    dispose=()=>{alive=false;stop()};
    save();
    const link=id=>{const url=new URL(location.href);url.search='';url.searchParams.set('meydan',id);url.hash='oyna';return url.href};
    const start=id=>{stop();p=plans.find(x=>x.id===id);run=data.run=fresh(id);history.replaceState(null,'',link(id));save();paint();focusTitle()};
    const nextPlan=()=>{const order=rotate(plans,plans.indexOf(p)+1);return order.find(x=>x.id!==p.id&&!data.collected.includes(x.id))||order[0]};
    const focusTitle=()=>{$('#playTitle')?.focus({preventScroll:true});$('#playTitle')?.scrollIntoView({block:'start',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
    function frame(){
      main.innerHTML=`<div class="play-page"><header class="play-intro"><div><span class="eyebrow">FÂİLÂTÜN · SÖZ MEYDANI</span><h1>Bir el oynayalım.</h1><p>Bir kelime, bir beyit, bir ritim. Başlamak için bilmen gerekmez.</p></div><a class="play-exit" href="#ritimler">▶ Ritimleri dinle</a></header><section class="play-table" aria-label="Söz Meydanı oyunu"><div class="play-top"><span class="play-hand">${String(plans.indexOf(p)+1).padStart(2,'0')} / 06 <b>${esc(p.chapter.poet)}</b></span><span class="play-count" aria-live="polite">${Math.min(run.round,3)} / 3 sır</span></div><ol class="play-trail" aria-label="Oyunun durakları">${['Kelimeyi bul','Beyti yakala','Ritmi geri çal'].map((label,i)=>`<li class="${run.round>i?'done':run.round===i?'current':''}" ${run.round===i?'aria-current="step"':''}><span>${run.round>i?'✓':i+1}</span><b>${label}</b></li>`).join('')}</ol><div class="play-stage" id="playStage"></div><footer class="play-table-foot"><span>İpucu her zaman yanında.</span><button class="text-button" id="otherHand">Başka bir beyit ↻</button></footer></section><details class="play-collection"><summary>Meydanda bulduğun beyitler <b>${data.collected.length} / 6</b></summary><p>${storageOK?'Bu tarayıcıda saklanır.':'Bu oturum boyunca burada görünür.'} Bir şair seçip yeniden oynayabilirsin.</p><div>${plans.map(x=>`<button data-collection="${x.id}" ${data.collected.includes(x.id)?'':'disabled'}><span aria-hidden="true">${data.collected.includes(x.id)?'✦':'·'}</span>${esc(x.chapter.poet)}<small>${data.collected.includes(x.id)?'Yeniden oyna':'Henüz açılmadı'}</small></button>`).join('')}</div></details></div>`;
      $('#otherHand').onclick=()=>start(nextPlan().id);
      $$('[data-collection]').forEach(b=>b.onclick=()=>start(b.dataset.collection));
    }
    function feedback(good,title,text){return `<div class="play-feedback ${good?'good':'again'}" role="status"><span class="play-feedback-mark" aria-hidden="true">${good?'✦':'↻'}</span><div><strong>${title}</strong><p>${esc(text)}</p></div></div>`}
    function next(label){return `<button class="primary play-next" id="playNext">${label} <span aria-hidden="true">→</span></button>`}
    function paint(){
      if(!alive)return;
      frame();const stage=$('#playStage');
      if(run.round===0){const good=run.word===p.word,parts=p.text.split(p.word);
        stage.innerHTML=`<span class="play-kicker">01 · KAYIP KELİME</span><h2 id="playTitle" tabindex="-1">Şair burada ne demişti?</h2><p class="play-caption">Boş kalan yere bir kelime bırak.</p><p class="play-verse">${esc(parts[0])}<span class="play-gap ${good?'found':''}">${good?esc(p.word):'<span aria-label="Kayıp kelime">···</span>'}</span>${esc(parts[1])}</p><div class="play-word-choices">${p.wordChoices.map(word=>`<button data-play-word="${esc(word)}" ${good?'disabled':''} class="${run.word===word?(good?'right':'tried'):''}">${esc(word)}</button>`).join('')}</div>${run.word?feedback(good,good?'Kelime yerine oturdu.':'Bir daha tartalım.',good?p.reveal:p.hint):'<div class="play-feedback-space"></div>'}${good?next('Beyti yakala'):`<button class="text-button play-hint" id="playHint" aria-expanded="${run.hints[0]}">✧ Bir ipucu</button>${run.hints[0]?`<p class="play-hint-copy" role="status">${esc(p.hint)}</p>`:''}`}`;
        $$('[data-play-word]').forEach(b=>b.onclick=()=>{if(run.word===p.word)return;run.word=b.dataset.playWord;if(run.word!==p.word)run.misses[0]++;save();paint();(run.word===p.word?$('#playNext'):$('[data-play-word="'+run.word+'"]'))?.focus({preventScroll:true})});
        if($('#playHint'))$('#playHint').onclick=()=>{run.hints[0]=true;save();paint();$('#playHint').focus({preventScroll:true})};
      }else if(run.round===1){const good=run.scene===p.id;
        stage.innerHTML=`<span class="play-kicker">02 · HÂLİNE BİR BEYİT</span><h2 id="playTitle" tabindex="-1">Şimdi hayatın içinden.</h2><p class="play-scenario">${esc(p.scene)}</p><div class="play-verse-choices">${p.sceneChoices.map((c,i)=>`<button data-play-scene="${c.id}" ${good?'disabled':''} class="${run.scene===c.id?(good?'right':'tried'):''}"><span class="play-choice-letter">${['A','B','C'][i]}</span><span>${esc(c.text)}</span></button>`).join('')}</div>${run.scene?feedback(good,good?'Beyit yerini buldu.':'Güzel mısra; bu hâli bir daha düşün.',good?p.chapter.meaning:'Bir önceki oyunda açtığın kelimeyi ve beytin işaret ettiği hâli hatırla.'):'<div class="play-feedback-space"></div>'}${good?next('Ritmi geri çal'):''}`;
        $$('[data-play-scene]').forEach(b=>b.onclick=()=>{if(run.scene===p.id)return;run.scene=b.dataset.playScene;if(run.scene!==p.id)run.misses[1]++;save();paint();(run.scene===p.id?$('#playNext'):$('[data-play-scene="'+run.scene+'"]'))?.focus({preventScroll:true})});
      }else if(run.round===2){paintRhythm(stage)}
      else {paintPrize(stage)}
      if($('#playNext'))$('#playNext').onclick=()=>{
        const allowed=run.round===0?run.word===p.word:run.round===1?run.scene===p.id:complete(run,p);
        if(!allowed)return;stop();run.round++;
        if(run.round===3){if(!data.collected.includes(p.id))data.collected.push(p.id);onCollect(p.id)}
        save();paint();focusTitle();
      };
    }
    function paintRhythm(stage){
      const good=run.checked&&run.taps.join('')===p.foot.pattern;
      stage.innerHTML=`<span class="play-kicker">03 · KULAĞINDA KALSIN</span><h2 id="playTitle" tabindex="-1">Duyduğunu geri çal.</h2><p class="play-caption">Önce dinle. Sonra Düm ve De ile aynı sırayı kur.</p><div class="play-rhythm-model" aria-label="Dinlenecek ritim">${[...p.foot.pattern].map((m,i)=>`<span class="pulse-mark"><b>${run.hints[2]||good?marks(m):'·'}</b><small>${good?esc(p.foot.syllables[i]?.text||''):i+1}</small></span>`).join('')}</div><div class="play-listen-row"><button class="secondary" id="playModel" aria-pressed="false">▶ Ritmi dinle</button><button class="text-button" id="showPlayPattern" aria-expanded="${run.hints[2]}">İşaretleri göster</button></div><p class="play-audio-status" id="playAudioStatus" role="status">${good?'Ritim tamam.':run.heard||run.hints[2]?'Sıra sende.':'Dinleyebilir veya işaretleri açabilirsin.'}</p><div class="play-tap-track" id="tapTrack" aria-label="Kurduğun ritim">${[...p.foot.pattern].map((m,i)=>`<span class="${run.taps[i]?'filled':''} ${run.checked?(run.taps[i]===m?'right':'tried'):''}" aria-label="${i+1}. vuruş: ${run.taps[i]?(run.taps[i]==='L'?'uzun':'kısa'):'boş'}">${run.taps[i]?marks(run.taps[i]):'·'}</span>`).join('')}</div><div class="play-drums"><button class="play-drum long" data-play-tap="L" ${good||run.taps.length===p.foot.pattern.length||!run.heard&&!run.hints[2]?'disabled':''}><span>Düm</span><b>—</b><small>Uzun · iki zaman</small></button><button class="play-drum short" data-play-tap="S" ${good||run.taps.length===p.foot.pattern.length||!run.heard&&!run.hints[2]?'disabled':''}><span>De</span><b>⏑</b><small>Kısa · bir zaman</small></button></div><div class="play-rhythm-tools"><button class="text-button" id="resetPlayTaps">↻ Yeniden kur</button><button class="text-button" id="hearMyTaps" aria-pressed="false" ${run.taps.length?'':'disabled'}>▶ Benim ritmim</button></div><div id="rhythmFeedback">${run.checked?feedback(good,good?'Ahenk kulağına yerleşti.':'Bir vuruşun yeri değişti.',good?`${p.foot.name}: ${marks(p.foot.pattern)}. Uzun iki, kısa bir zaman. Bu, beytin ilk tef‘ilesinin ritmi.`:`${run.taps.findIndex((m,i)=>m!==p.foot.pattern[i])+1}. vuruş ${p.foot.pattern[run.taps.findIndex((m,i)=>m!==p.foot.pattern[i])]==='L'?'uzun':'kısa'} olmalı. Bir daha dinle veya işaretlere bak.`):''}</div>${good?next('Beytim gelsin'):''}<p class="play-rhythm-note">Buradaki sesler ritim vuruşlarıdır. Hocanın okuyuşunu beyit sayfasında dinleyebilirsin.</p>`;
      $('#playModel').onclick=()=>listen(p.foot.pattern,'playModel');
      $('#hearMyTaps').onclick=()=>listen(run.taps.join(''),'hearMyTaps',false);
      $('#showPlayPattern').onclick=()=>{stop();run.hints[2]=true;save();paint();$('#showPlayPattern').focus({preventScroll:true})};
      $('#resetPlayTaps').onclick=()=>{stop();run.taps=[];run.checked=false;save();paint();$('[data-play-tap="L"]')?.focus({preventScroll:true})};
      $$('[data-play-tap]').forEach(b=>b.onclick=()=>{
        if(playing||good||!run.heard&&!run.hints[2]||run.taps.length>=p.foot.pattern.length)return;
        const mark=b.dataset.playTap;run.taps.push(mark);run.checked=run.taps.length===p.foot.pattern.length;
        if(run.checked&&run.taps.join('')!==p.foot.pattern)run.misses[2]++;
        save();paint();playPattern(mark,180);
        (complete(run,p)?$('#playNext'):$('[data-play-tap="'+mark+'"]'))?.focus({preventScroll:true});
      });
    }
    async function listen(pattern,buttonId,isModel=true){
      if(playing){stop();paint();return}
      stop();const attempt=++ticket;cancelled=false;playing=true;
      const button=$('#'+buttonId);button.textContent='■ Durdur';button.setAttribute('aria-pressed','true');
      $$('[data-play-tap]').forEach(b=>b.disabled=true);
      $('#playAudioStatus').textContent=isModel?'Kulağını ver…':'Kurduğun ritim çalıyor…';
      const ok=await playPattern(pattern,90,()=>{
        if(!alive||attempt!==ticket||cancelled||run.round!==2)return;
        playing=false;if(isModel)run.heard=true;save();paint();$('#'+buttonId)?.focus({preventScroll:true});
      });
      if(!alive||attempt!==ticket)return;
      if(!ok){playing=false;paint();$('#playAudioStatus').textContent='Ses açılamadı. “İşaretleri göster” ile oynayabilirsin.'}
    }
    function paintPrize(stage){
      const foot=p.foot,first=run.misses.filter((n,i)=>n===0&&!run.hints[i]).length;
      stage.innerHTML=`<div class="play-prize"><div class="play-seal" aria-hidden="true"><span>✦</span><small>ÜÇ SIR<br>BİR BEYİT</small></div><span class="play-kicker">${esc(p.chapter.poet.toLocaleUpperCase('tr-TR'))}</span><h2 id="playTitle" tabindex="-1">Artık bu beyitte<br>bir hatıran var.</h2><div class="play-prize-verse">${p.chapter.lines.map(l=>`<p>${esc(l)}</p>`).join('')}</div><div class="play-keepsakes"><span>✓ <b>${esc(p.word)}</b> yerini buldu.</span><span>✓ Beytin manasını yakaladın.</span><span>✓ <b>${esc(foot.name)}</b> ritmini kurdun.</span></div><p class="play-prize-note">${first===3?'Üçünü de ilk tahminde buldun. ':''}Bu beyit defterine eklendi.</p><div class="play-prize-actions"><button class="primary" id="nextPlayHand">Bir el daha ↗</button><button class="secondary" id="playHearPoet">Hayâtî İnanç’tan dinle</button><button class="text-button" id="sharePlayHand">Bir dosta meydan oku ↗</button></div><details class="play-prize-sources"><summary>Beytin manası ve kaynakları</summary><p>${esc(p.chapter.meaning)}</p>${sourceLinks(p.sources)}</details></div>`;
      $('#nextPlayHand').onclick=()=>start(nextPlan().id);
      $('#playHearPoet').onclick=()=>onChapter(p.id);
      $('#sharePlayHand').onclick=()=>copyText(link(p.id));
    }
    paint();
  }
  window.AruzPlay={makePlans,restore,complete,render,dispose:()=>dispose(),snapshot:()=>{if(memory)return memory;try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}},replaceProgress:data=>{dispose();memory=data}};
})();
