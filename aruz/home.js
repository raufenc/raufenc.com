(() => {
  'use strict';
  // Editorial entry point. The learning application supplies all live content.
  window.renderFailatunHome = function ({chapter, line, esc, renderPlayer, playPattern, openChapter}) {
    const main = document.querySelector('#main');
    const $ = selector => main.querySelector(selector);
    const $$ = selector => [...main.querySelectorAll(selector)];
    main.innerHTML = `
      <div class="brand-home">
        <section class="brand-hero" aria-labelledby="brandHeadline">
          <img class="hero-art" src="assets/siirin-icinde.png" width="1536" height="1024" fetchpriority="high" alt="Gece mavisi zeminde, sayfaları bir ritim dalgası gibi yükselen açık bir şiir kitabı.">
          <div class="hero-copy">
            <span class="eyebrow">BİR ŞİİRİN İÇİNE GİR.</span>
            <h1 id="brandHeadline">Bir beyit,<br>duyduğundan<br><em>çok daha fazlası.</em></h1>
            <p>Bir kelimeyi bul. Bir beyti yakala. Bir ritmi geri çal. Üç küçük oyunla şiirin içine gir; sonunda elinde bir beyit, aklında bir sır kalsın.</p>
            <div class="hero-actions"><a class="primary brand-primary" href="#oyna" id="heroPlay">Beytin sırrını çöz <span aria-hidden="true">↗</span></a><a class="brand-text-link hero-rhythm-link" href="#ritimler" id="heroRhythms">▶ Ritimleri dinle</a></div><div class="hero-game-note">Üç kısa oyun · Aruz bilmen gerekmiyor.</div>
            <div class="hero-note"><span aria-hidden="true">◖</span> Hayâtî İnanç’ın kendi sesinden.<br>Beytin manasından şiirin ahengine.</div>
          </div>
          <span class="art-caption" aria-hidden="true">SÖZÜN BİR AHENGİ VAR.</span>
          <button class="hero-scroll" data-scroll="ilk-beyit" aria-label="İlk beyte ilerle">↓</button>
        </section>

        <div class="poets-strip" aria-label="Meclislerdeki şairler"><span>AYNI DİLDE<br>YENİ BİR DÜNYA</span><p>Muhibbî <i>·</i> Fuzûlî <i>·</i> Şeyh Gâlib <i>·</i> Nâbî <i>·</i> Hayâlî <i>·</i> Yahyâ</p></div>

        <section class="brand-demo" id="ilk-beyit" tabindex="-1" aria-labelledby="demoHeading">
          <div class="demo-heading"><div><span class="eyebrow">İLK KEŞFİN</span><h2 id="demoHeading">Bu beyti biliyorsun.<br><em>Peki, içindekini?</em></h2></div><p>İki mısra. İki defa söylenen bir kelime.<br>İkisinde de aynı şeyi mi söylüyor?</p></div>
          <div class="demo-sheet">
            <div class="demo-sheet-top"><span>MUHİBBÎ</span><span>01 / 06 — ŞİİR MECLİSİ</span></div>
            <div class="demo-couplet">${chapter.lines.map((text,i)=>`<p class="poem-line" data-poem-line="${i}">${esc(text).replace('devlet',`<button class="word-reveal" data-devlet="${i}" aria-label="${i+1}. mısradaki devlet kelimesinin manasını keşfet" aria-pressed="false">devlet</button>`)}</p>`).join('')}</div>
            <div class="demo-switch" role="tablist" aria-label="İlk beyti keşfet"><button role="tab" id="demo-tab-anlam" data-demo-mode="anlam" aria-selected="true" aria-controls="demoInsight" tabindex="0">01 <span>Manayı aç</span></button><button role="tab" id="demo-tab-ritim" data-demo-mode="ritim" aria-selected="false" aria-controls="demoInsight" tabindex="-1">02 <span>Ritmi dinle</span></button></div>
            <div class="demo-insight" id="demoInsight" role="tabpanel" aria-labelledby="demo-tab-anlam"></div>
            <div class="record-player" id="recordPlayer"></div>
          </div>
          <div class="demo-after"><p>Bir kelimenin açtığı kapı, bütün beyti değiştirebilir.</p><button class="brand-text-link" id="openDemoChapter">Bu beyti birlikte çalış <span aria-hidden="true">↗</span></button></div>
        </section>

        <section class="brand-promise" aria-labelledby="promiseHeading">
          <div class="promise-intro"><span class="eyebrow">BİR SONRAKİ DİNLEYİŞİN DEĞİŞSİN.</span><h2 id="promiseHeading">Şiiri seversin.<br>Bir de <em>içinden bak.</em></h2><p>Fâilâtün, duyduğun güzelliğin izini sürebilmen için var. Sesten kelimeye, kelimeden ahenge.</p></div>
          <div class="promise-list"><article><span>01</span><div><h3>Söz sana açılsın.</h3><p>Eski kelimeler yabancı gelmesin. Beytin şerhini oku, mana inceliklerini tek tek keşfet.</p></div></article><article><span>02</span><div><h3>Kulağın inceliği yakalasın.</h3><p>Asıl okuyuşu dinle, yavaşlat, tekrar et. Kısa ve uzun hecelerin şiirde nasıl yer bulduğunu duy.</p></div></article><article><span>03</span><div><h3>Güzelliğin sırrını gör.</h3><p>Bir heceye dokun. Niçin uzadığını, kalıpta nasıl yer bulduğunu gör. Kendi okuyuşunu bu inceliklerle kur.</p></div></article></div>
        </section>

        <section class="brand-program" id="program" tabindex="-1" aria-labelledby="programHeading">
          <div class="program-heading"><div><span class="eyebrow">FÂİLÂTÜN · ARUZ PROGRAMI</span><h2 id="programHeading">İlk heceden<br><em>kendi okuyuşuna.</em></h2></div><p>Önceden aruz bilmen gerekmiyor. Küçük adımlarla başla; bir fikri öğren, beyitte gör, kendin dene.</p></div>
          <div class="program-stages"><article><span class="stage-number">I</span><span class="stage-level">BAŞLANGIÇ</span><h3>Kulağını aç.</h3><p>Açık ve kapalı heceyi ayırt et. Aslî uzunları ve mısra sonu kaidesini tanı.</p><span class="stage-detail">4 ders · 8 soru</span></article><article><span class="stage-number">II</span><span class="stage-level">ORTA</span><h3>Ahengi çöz.</h3><p>Tef‘ileleri kalıba yerleştir. Ulama ve imâlede hecenin nasıl değiştiğini gör.</p><span class="stage-detail">4 ders · 8 soru</span></article><article><span class="stage-number">III</span><span class="stage-level">İLERİ</span><h3>Okuyuşunu kur.</h3><p>Med ve zihafı ayırt et. Farklı okumaları karşılaştır; tercihinin kaynağını ve sebebini göster.</p><span class="stage-detail">4 ders · 8 soru</span></article></div>
          <div class="program-included"><p><b>Keşif boyunca yanında</b><br>6 beyit atölyesi · 18 tatbikat · 30 kayıtlık arşiv<br>16 mısranın taktîi · Tekrar defteri · Hocalar için çalışma kâğıtları</p><a class="primary brand-primary" href="#dersler">İlk derse başla <span aria-hidden="true">↗</span></a></div>
        </section>

        <section class="brand-faq" aria-labelledby="faqHeading"><div><span class="eyebrow">AKLINDAKİLER</span><h2 id="faqHeading">Başlamadan<br>birkaç söz.</h2></div><div class="faq-list">
          <details><summary>Aruzu hiç bilmiyorum. Bana uygun mu?</summary><p>Başlangıç dersleri heceyi ayırmakla başlar. Açık ve kapalı heceleri tanır, heceleri işaretlemeye başlarsın. Misal beyitlerdeki kelime izahları da okumana eşlik eder.</p></details>
          <details><summary>Hayâtî İnanç’ın kayıtları nasıl yer alıyor?</summary><p>Meclislerde ilgili beyit, Hayâtî İnanç’ın asıl yayınından dinletilir. Beytin yaklaşık aralığını tekrar edebilir, yavaşlatabilir ve kaydın tamamına ulaşabilirsin. Dersler, şerhler ve taktîler Fâilâtün için hazırlanmıştır.</p></details>
          <details><summary>Kendi hızımda ilerleyebilir miyim?</summary><p>Her ders tek bir fikri ve iki soruyu ele alır. İstediğin kadar tekrar edebilirsin. Ders ilerlemen ve kaydettiğin beyitler kullandığın tarayıcıda tutulur; başka bir cihazda otomatik görünmez.</p></details>
          <details><summary>Bir soruyu yanlış cevaplarsam ne olur?</summary><p>Yalnız doğru cevabı değil, niçin doğru olduğunu da görürsün. Yanlış cevapladığın sorular tekrar için saklanır; doğru cevap verdiğinde tekrar listesinden çıkar.</p></details>
        </div></section>

        <section class="brand-invitation"><span class="eyebrow">ŞİİRİN İÇİNDE SANA DA YER VAR.</span><h2>Bir beyitle başla.<br><em>Bak, nerelere açılıyor.</em></h2><a href="#dersler" class="primary brand-primary">Şiirin içine gir <span aria-hidden="true">↗</span></a><p>Fâilâtün — Manayı keşfet. Ahengi duy.</p></section>
      </div>`;

    $$('[data-scroll]').forEach(button => button.onclick = () => {
      const target = $('#'+button.dataset.scroll);
      target.focus({preventScroll:true});
      target.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    });
    $('#openDemoChapter').onclick = openChapter;
    let mode='anlam';
    const meanings=[['İlk “devlet”: makam ve iktidar.','İnsanların gözünde değerli olan kudret ve saltanat. Beyit, çok tanıdık bir değer yargısıyla başlıyor.'],['İkinci “devlet”: talih ve saadet.','Şair, bir nefes sağlığı bütün o kudretin önüne koyuyor. Aynı kelime, ikinci mısrada başka bir ağırlık kazanıyor.']];
    const paintInsight = (selection=null) => {
      $('#demoInsight').setAttribute('aria-labelledby','demo-tab-'+mode);
      const content=$('#demoInsight');
      if(mode==='anlam') {
        const [title,copy]=selection===null?['Aynı kelime. İki ayrı kapı.','Beyitteki altı çizili “devlet” kelimelerine dokun. Mananın iki mısra arasında nasıl değiştiğine bak.']:meanings[selection];
        content.innerHTML=`<div class="insight-symbol" aria-hidden="true">“</div><div aria-live="polite"><h3>${title}</h3><p>${copy}</p></div>`;
      } else {
        const foot=line.feet.at(-1);
        content.innerHTML=`<div class="demo-foot"><span>${esc(foot.name)}</span><div>${foot.syllables.map((s,i)=>`<button data-demo-syllable="${i}" aria-label="${esc(s.text)} hecesinin izahı"><b>${esc(s.text)}</b><small>${s.mark==='S'?'⏑':'—'}</small></button>`).join('')}</div></div><div class="rhythm-copy"><h3>Son hecenin küçük sırrı.</h3><p id="demoSyllableNote" aria-live="polite">“bi” hecesine dokun. Açık bir hecenin burada niçin uzun okunduğunu keşfet.</p><button class="brand-text-link" id="demoRhythm">▶ Bu ritmi dinle</button></div>`;
        $$('[data-demo-syllable]').forEach(button=>button.onclick=()=>{
          const index=Number(button.dataset.demoSyllable),syllable=foot.syllables[index];
          $$('[data-demo-syllable]').forEach(b=>b.classList.toggle('selected',b===button));
          $('#demoSyllableNote').textContent=syllable.note||(syllable.operation==='line_end'?'“bi” açık bir hecedir. Mısranın sonunda bulunduğu için burada uzun değer alır. Bu, imâle sayılmaz.':syllable.natural==='S'?'“'+syllable.text+'” kısa sesli harfle biten açık bir hecedir; kalıpta kısa konumu karşılar.':'“'+syllable.text+'” kapalı bir hecedir; kalıpta uzun konumu karşılar.');
        });
        $('#demoRhythm').onclick=()=>playPattern(foot.pattern);
      }
    };
    const setMode = next => {
      mode=next;
      $$('[data-demo-mode]').forEach(b=>{const active=b.dataset.demoMode===mode;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1});
      $$('[data-devlet]').forEach(b=>b.setAttribute('aria-pressed','false'));
      paintInsight();
    };
    $$('[data-devlet]').forEach(button=>button.onclick=()=>{setMode('anlam');button.setAttribute('aria-pressed','true');paintInsight(Number(button.dataset.devlet))});
    $$('[data-demo-mode]').forEach((button,i,buttons)=>{button.onclick=()=>setMode(button.dataset.demoMode);button.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?buttons[0]:e.key==='End'?buttons.at(-1):buttons[(i+1)%buttons.length];next.click();next.focus()}}});
    paintInsight();
    renderPlayer(chapter);
  };
})();
