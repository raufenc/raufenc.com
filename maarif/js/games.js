/* games.js - 10 Oyun Motoru */
(function(){
function getFamilyClass(f) { return window.H ? window.H.getFamilyClass(f) : ''; }
function findConcept(id) { return window.H ? window.H.findConcept(id) : null; }
function getRefsForConcept(c) { return window.H ? window.H.getRefsForConcept(c) : []; }
function shortFam(f) {
  if (!f) return '';
  if (f.includes('Erdem')) return 'Değerler';
  if (f.includes('Kavramsal')) return 'Kavramsal';
  if (f.includes('Eğilim')) return 'Eğilimler';
  if (f.includes('Sosyal')) return 'SDB';
  if (f.includes('Okuryazarlık')) return 'Okuryazarlık';
  if (f.includes('Profil')) return 'Profil';
  return f.slice(0, 20);
}

function shuffle(arr) { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function pick(arr, n) { return shuffle(arr).slice(0, n); }
function el(html) { const d=document.createElement('div'); d.innerHTML=html; return d; }

// Shared result screen
function showResult(app, gameId, score, total, onRetry) {
  const pct = Math.round(score/total*100);
  const stars = pct>=90?'⭐⭐⭐':pct>=60?'⭐⭐':pct>=30?'⭐':'';
  Store.addGameScore(gameId, score);
  app.innerHTML = `
    <div class="result-screen">
      <div class="result-stars">${stars||'😕'}</div>
      <div class="result-score">${score}/${total}</div>
      <div class="result-label">%${pct} Başarı</div>
      <div class="progress-bar mt-2"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="result-actions">
        <button class="btn btn-primary" id="retryBtn">🔄 Tekrar Oyna</button>
        <a href="#/oyunlar" class="btn btn-outline">🎮 Oyunlar</a>
      </div>
    </div>`;
  document.getElementById('retryBtn').addEventListener('click', onRetry);
}

// HUD
function hud(items) {
  return `<div class="game-hud">${items.map(i => `<div class="hud-item"><div class="hud-val">${i.val}</div><div class="hud-label">${i.label}</div></div>`).join('')}</div>`;
}

// ===== GAME01: Koddan Kavrama (Eslestirme) =====
function game01(app) {
  const pool = DATA.concepts.filter(c => c.code && c.code.length > 1);
  let score = 0, round = 0, totalRounds = 3;

  function playRound() {
    if (round >= totalRounds) { showResult(app, 'GAME01', score, totalRounds*5, ()=>game01(app)); return; }
    const items = pick(pool, 5);
    const codes = items.map(i => ({ code: i.code, id: i.id }));
    const terms = shuffle(items.map(i => ({ term: i.term, id: i.id })));
    let selected = null, matched = 0;

    app.innerHTML = `
      ${hud([{val:round+1+'/'+totalRounds,label:'Tur'},{val:score,label:'Puan'},{val:matched+'/5',label:'Eşleşme'}])}
      <div class="game-area">
        <p class="game-question">Kodları doğru kavramlarla eşleştirin</p>
        <div class="match-cols">
          <div id="colCodes">${codes.map(c => `<div class="match-item" data-id="${c.id}" data-side="code">${c.code}</div>`).join('')}</div>
          <div id="colTerms">${terms.map(t => `<div class="match-item" data-id="${t.id}" data-side="term">${t.term}</div>`).join('')}</div>
        </div>
      </div>`;

    app.querySelectorAll('.match-item').forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;
        if (!selected) {
          selected = item;
          item.classList.add('selected');
        } else {
          if (selected.dataset.side === item.dataset.side) {
            selected.classList.remove('selected');
            selected = item;
            item.classList.add('selected');
          } else {
            // Check match
            const isMatch = selected.dataset.id === item.dataset.id;
            if (isMatch) {
              selected.classList.remove('selected');
              selected.classList.add('matched');
              item.classList.add('matched');
              matched++; score++;
              selected = null;
              if (matched === 5) { setTimeout(() => { round++; playRound(); }, 800); }
            } else {
              selected.classList.add('wrong-flash');
              item.classList.add('wrong-flash');
              const s = selected;
              setTimeout(() => { s.classList.remove('selected','wrong-flash'); item.classList.remove('wrong-flash'); }, 500);
              selected = null;
            }
          }
        }
      });
    });
  }
  playRound();
}

// ===== GAME02: Hangisi Degil? =====
function game02(app) {
  const families = [...new Set(DATA.concepts.map(c => c.family))].filter(f => DATA.concepts.filter(c=>c.family===f).length >= 4);
  let score = 0, q = 0, total = 10;

  function nextQ() {
    if (q >= total) { showResult(app, 'GAME02', score, total, ()=>game02(app)); return; }
    const mainFam = families[Math.floor(Math.random()*families.length)];
    const samePool = DATA.concepts.filter(c => c.family === mainFam);
    const diffPool = DATA.concepts.filter(c => c.family !== mainFam);
    if (samePool.length < 3 || diffPool.length < 1) { q++; nextQ(); return; }
    const same = pick(samePool, 3);
    const diff = pick(diffPool, 1)[0];
    const options = shuffle([...same, diff]);

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <p class="game-question">Hangisi bu gruba ait değil?</p>
        <div class="options-grid" id="g2opts">
          ${options.map(o => `<button class="option-btn" data-id="${o.id}" data-diff="${o.id===diff.id}">${o.term}<br><small style="color:var(--text-light)">${o.code||''}</small></button>`).join('')}
        </div>
        <div id="g2fb" class="mt-1 text-center"></div>
      </div>`;

    let answered = false;
    app.querySelectorAll('#g2opts .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = btn.dataset.diff === 'true';
        if (correct) { score++; btn.classList.add('correct'); }
        else { btn.classList.add('wrong'); }
        app.querySelectorAll('#g2opts .option-btn').forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.diff==='true') b.classList.add('correct');
        });
        document.getElementById('g2fb').innerHTML = `<p>${correct?'✅ Doğru!':'❌ Yanlış!'} ${diff.term} → ${window.H ? window.Pages ? shortFam(diff.family) : diff.family : diff.family}</p>
          <button class="btn btn-primary btn-sm mt-1" onclick="window._g2next()">Sonraki →</button>`;
      });
    });
    window._g2next = () => { q++; nextQ(); };
  }
  nextQ();
}

function shortFam(f) {
  if (!f) return '';
  if (f.includes('Erdem')) return 'Değerler';
  if (f.includes('Kavramsal')) return 'Kavramsal Beceriler';
  if (f.includes('Eğilim')) return 'Eğilimler';
  if (f.includes('Alan')) return f.replace(' Alan Becerileri','');
  return f.slice(0,30);
}

// ===== GAME03: Fark Tahtasi =====
function game03(app) {
  const withDesc = DATA.concepts.filter(c => c.desc && c.desc.length > 30);
  let score = 0, q = 0, total = 5;

  function nextQ() {
    if (q >= total) { showResult(app, 'GAME03', score, total, ()=>game03(app)); return; }
    const pair = pick(withDesc, 2);
    const c1 = pair[0], c2 = pair[1];
    const dims = [
      { dim: 'Aile', v1: shortFam(c1.family), v2: shortFam(c2.family) },
      { dim: 'Tanım Anahtar', v1: c1.desc.split(' ').slice(0,4).join(' ')+'...', v2: c2.desc.split(' ').slice(0,4).join(' ')+'...' },
      { dim: 'Sayfa', v1: 's.'+c1.p1, v2: 's.'+c2.p1 },
      { dim: 'Kod', v1: c1.code||'—', v2: c2.code||'—' },
    ];

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <p class="game-question">${c1.term} ile ${c2.term} arasındaki farklar</p>
        <table class="compare-table">
          <tr><th>Boyut</th><th>${c1.term}</th><th>${c2.term}</th></tr>
          ${dims.map(d => `<tr><td><strong>${d.dim}</strong></td><td>${d.v1}</td><td>${d.v2}</td></tr>`).join('')}
        </table>
        <p class="mt-2 game-question" style="font-size:.95rem">"${c1.desc.slice(0,100)}..." tanımı hangisine ait?</p>
        <div class="options-grid">
          <button class="option-btn" data-correct="true" onclick="window._g3ans(this,true)">${c1.term}</button>
          <button class="option-btn" data-correct="false" onclick="window._g3ans(this,false)">${c2.term}</button>
        </div>
        <div id="g3fb" class="mt-1 text-center"></div>
      </div>`;

    let answered = false;
    window._g3ans = (btn, correct) => {
      if (answered) return;
      answered = true;
      if (correct) { score++; btn.classList.add('correct'); } else { btn.classList.add('wrong'); }
      app.querySelectorAll('.option-btn').forEach(b => b.classList.add('disabled'));
      document.getElementById('g3fb').innerHTML = `<button class="btn btn-primary btn-sm mt-1" onclick="window._g3next()">Sonraki →</button>`;
    };
    window._g3next = () => { q++; nextQ(); };
  }
  nextQ();
}

// ===== GAME04: Beceri Agaci =====
function game04(app) {
  // Find concepts with parent-child relationships
  const parents = DATA.concepts.filter(c => c.sub === 'Kategori' && DATA.concepts.some(ch => ch.parent === c.term));
  let score = 0, q = 0, total = 5;

  function nextQ() {
    if (q >= total || parents.length === 0) { showResult(app, 'GAME04', score, Math.min(total, q||1), ()=>game04(app)); return; }
    const parent = parents[q % parents.length];
    const children = DATA.concepts.filter(c => c.parent === parent.term && c.sub !== 'Kategori').slice(0,5);
    const fakes = pick(DATA.concepts.filter(c => c.parent !== parent.term && c.family !== parent.family), 2);
    const allItems = shuffle([...children, ...fakes]);

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <p class="game-question">Hangileri <strong>${parent.term}</strong> altında yer alır?</p>
        <div class="options-grid" id="g4opts">
          ${allItems.map(i => `<button class="option-btn" data-correct="${children.some(c=>c.id===i.id)}" style="text-align:center">${i.term}</button>`).join('')}
        </div>
        <div id="g4fb" class="mt-2 text-center">
          <button class="btn btn-primary" id="g4check">✅ Kontrol Et</button>
        </div>
      </div>`;

    const selected = new Set();
    app.querySelectorAll('#g4opts .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        if (selected.has(btn)) selected.delete(btn); else selected.add(btn);
      });
    });

    document.getElementById('g4check').addEventListener('click', () => {
      let roundScore = 0;
      app.querySelectorAll('#g4opts .option-btn').forEach(btn => {
        btn.classList.add('disabled');
        const isCorrect = btn.dataset.correct === 'true';
        const isSelected = btn.classList.contains('selected');
        if (isCorrect) btn.classList.add('correct');
        if (!isCorrect && isSelected) btn.classList.add('wrong');
        if (isCorrect === isSelected) roundScore++;
      });
      if (roundScore === allItems.length) score++;
      document.getElementById('g4fb').innerHTML = `<p>${roundScore}/${allItems.length} doğru</p><button class="btn btn-primary btn-sm mt-1" onclick="window._g4next()">Sonraki →</button>`;
    });
    window._g4next = () => { q++; nextQ(); };
  }
  nextQ();
}

// ===== GAME05: Sayfa Avcisi =====
function game05(app) {
  const assetPages = DATA.assets ? Object.keys(DATA.assets).map(Number) : [];
  if (assetPages.length < 4) { app.innerHTML = '<div class="empty-state"><p>Yeterli görsel yok</p></div>'; return; }
  let score = 0, q = 0, total = Math.min(8, assetPages.length);
  const usedPages = shuffle(assetPages).slice(0, total);

  function nextQ() {
    if (q >= total) { showResult(app, 'GAME05', score, total, ()=>game05(app)); return; }
    const pg = usedPages[q];
    const asset = DATA.assets[pg];
    const correct = DATA.concepts.filter(c => c.p1 === pg || (c.p1 <= pg && c.p2 >= pg));
    if (correct.length === 0) { q++; nextQ(); return; }
    const rightOne = correct[Math.floor(Math.random()*correct.length)];
    const wrongs = pick(DATA.concepts.filter(c => !correct.includes(c)), 3);
    const options = shuffle([rightOne, ...wrongs]);

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <p class="game-question">Bu görsel hangi kavramla ilgili?</p>
        <div style="text-align:center;margin-bottom:1rem"><img src="img/${asset.file}" alt="${asset.alt}" style="max-height:250px;border-radius:var(--radius);box-shadow:var(--shadow)"></div>
        <div class="options-grid" id="g5opts">
          ${options.map(o => `<button class="option-btn" data-id="${o.id}" data-correct="${o.id===rightOne.id}">${o.term}</button>`).join('')}
        </div>
        <div id="g5fb" class="mt-1 text-center"></div>
      </div>`;

    let answered = false;
    app.querySelectorAll('#g5opts .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const ok = btn.dataset.correct === 'true';
        if (ok) { score++; btn.classList.add('correct'); } else { btn.classList.add('wrong'); }
        app.querySelectorAll('#g5opts .option-btn').forEach(b => { b.classList.add('disabled'); if(b.dataset.correct==='true') b.classList.add('correct'); });
        document.getElementById('g5fb').innerHTML = `<button class="btn btn-primary btn-sm mt-1" onclick="window._g5next()">Sonraki →</button>`;
      });
    });
    window._g5next = () => { q++; nextQ(); };
  }
  nextQ();
}

// ===== GAME06: Mini Vaka =====
function game06(app) {
  const values = DATA.concepts.filter(c => c.family === 'Erdem-Değer-Eylem' && c.sub === 'Değer' && c.desc);
  const refs = DATA.references.filter(r => r.type === 'eylem' && r.text.length > 30);
  let score = 0, q = 0, total = 8;

  function nextQ() {
    if (q >= total) { showResult(app, 'GAME06', score, total, ()=>game06(app)); return; }
    // Pick a random action reference
    const ref = refs[Math.floor(Math.random()*refs.length)];
    // Find parent value
    const parentCode = ref.pc.split('.')[0];
    const correct = values.find(v => v.code === parentCode);
    if (!correct) { q++; nextQ(); return; }
    const wrongs = pick(values.filter(v => v.id !== correct.id), 3);
    const options = shuffle([correct, ...wrongs]);

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <p class="game-question">Bu eylem hangi değere aittir?</p>
        <div style="background:var(--surface-alt);padding:1.25rem;border-radius:var(--radius);margin-bottom:1.5rem;font-style:italic;line-height:1.6">"${ref.text}"</div>
        <div class="options-grid" id="g6opts">
          ${options.map(o => `<button class="option-btn" data-correct="${o.id===correct.id}">${o.term}</button>`).join('')}
        </div>
        <div id="g6fb" class="mt-1 text-center"></div>
      </div>`;

    let answered = false;
    app.querySelectorAll('#g6opts .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const ok = btn.dataset.correct === 'true';
        if (ok) { score++; btn.classList.add('correct'); } else { btn.classList.add('wrong'); }
        app.querySelectorAll('#g6opts .option-btn').forEach(b => { b.classList.add('disabled'); if(b.dataset.correct==='true') b.classList.add('correct'); });
        document.getElementById('g6fb').innerHTML = `<p>Doğru cevap: <strong>${correct.term}</strong></p><button class="btn btn-primary btn-sm mt-1" onclick="window._g6next()">Sonraki →</button>`;
      });
    });
    window._g6next = () => { q++; nextQ(); };
  }
  nextQ();
}

// ===== GAME07: Bosluk Doldur =====
function game07(app) {
  const withDesc = DATA.concepts.filter(c => c.desc && c.desc.split(' ').length >= 5);
  let score = 0, q = 0, total = 10;

  function nextQ() {
    if (q >= total) { showResult(app, 'GAME07', score, total, ()=>game07(app)); return; }
    const concept = withDesc[Math.floor(Math.random()*withDesc.length)];
    const words = concept.desc.split(' ').filter(w => w.length >= 4);
    if (words.length < 2) { q++; nextQ(); return; }
    const hiddenWord = words[Math.floor(Math.random()*words.length)];
    const blanked = concept.desc.replace(hiddenWord, '_____');
    const wrongWords = pick(withDesc.filter(c=>c.id!==concept.id).map(c=>c.desc.split(' ').filter(w=>w.length>=4)).flat(), 3);
    const options = shuffle([hiddenWord, ...wrongWords.slice(0,3)]);

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <p class="game-question">Boşluğu doldurun</p>
        <p style="text-align:center;font-size:1.05rem;margin-bottom:1.5rem"><strong>${concept.term}:</strong> "${blanked}"</p>
        <div class="options-grid" id="g7opts">
          ${options.map(o => `<button class="option-btn" data-correct="${o===hiddenWord}" style="text-align:center">${o}</button>`).join('')}
        </div>
        <div id="g7fb" class="mt-1 text-center"></div>
      </div>`;

    let answered = false;
    app.querySelectorAll('#g7opts .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const ok = btn.dataset.correct === 'true';
        if (ok) { score++; btn.classList.add('correct'); } else { btn.classList.add('wrong'); }
        app.querySelectorAll('#g7opts .option-btn').forEach(b => { b.classList.add('disabled'); if(b.dataset.correct==='true') b.classList.add('correct'); });
        Store.updateMastery(concept.id, ok);
        document.getElementById('g7fb').innerHTML = `<button class="btn btn-primary btn-sm mt-1" onclick="window._g7next()">Sonraki →</button>`;
      });
    });
    window._g7next = () => { q++; nextQ(); };
  }
  nextQ();
}

// ===== GAME08: Siralama Hatti =====
function game08(app) {
  // Find concepts with sequential process components
  const parents = DATA.concepts.filter(c => {
    const refs = DATA.references.filter(r => r.pc === c.code && r.type === 'süreç_bileşeni');
    return refs.length >= 3;
  });
  let score = 0, q = 0, total = Math.min(5, parents.length);

  function nextQ() {
    if (q >= total) { showResult(app, 'GAME08', score, total||1, ()=>game08(app)); return; }
    const parent = parents[q % parents.length];
    const refs = DATA.references.filter(r => r.pc === parent.code && r.type === 'süreç_bileşeni').slice(0,6);
    const correctOrder = refs.map((r,i) => ({ ...r, idx: i }));
    const shuffledItems = shuffle(correctOrder);

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <p class="game-question">${parent.term} süreç bileşenlerini sıraya dizin</p>
        <div id="sortArea">
          ${shuffledItems.map(r => `<div class="drag-item" data-idx="${r.idx}" draggable="false" onclick="window._g8select(this)">${r.code}: ${r.text.slice(0,80)}</div>`).join('')}
        </div>
        <div class="mt-2 text-center">
          <button class="btn btn-primary" id="g8check">✅ Kontrol Et</button>
        </div>
        <div id="g8fb" class="mt-1 text-center"></div>
      </div>`;

    // Simple click-to-swap ordering
    let firstSelected = null;
    window._g8select = function(el) {
      if (!firstSelected) {
        firstSelected = el;
        el.style.border = '2px solid var(--primary)';
      } else {
        // Swap
        const area = document.getElementById('sortArea');
        const items = [...area.children];
        const i1 = items.indexOf(firstSelected);
        const i2 = items.indexOf(el);
        if (i1 < i2) area.insertBefore(el, firstSelected);
        else area.insertBefore(firstSelected, el);
        firstSelected.style.border = '';
        firstSelected = null;
      }
    };

    document.getElementById('g8check').addEventListener('click', () => {
      const items = [...document.getElementById('sortArea').children];
      let correct = true;
      items.forEach((item, i) => {
        const expected = i;
        if (parseInt(item.dataset.idx) !== expected) correct = false;
        item.style.border = parseInt(item.dataset.idx) === expected ? '2px solid var(--success)' : '2px solid var(--danger)';
      });
      if (correct) score++;
      document.getElementById('g8fb').innerHTML = `<p>${correct?'✅ Doğru sıra!':'❌ Yanlış sıra'}</p><button class="btn btn-primary btn-sm mt-1" onclick="window._g8next()">Sonraki →</button>`;
    });
    window._g8next = () => { q++; nextQ(); };
  }
  nextQ();
}

// ===== GAME09: Hizli Tur (60 saniye) =====
function game09(app) {
  const withDesc = DATA.concepts.filter(c => c.desc);
  let score = 0, total = 0, timeLeft = 60, timer = null, combo = 0;

  function nextQ() {
    const correct = withDesc[Math.floor(Math.random()*withDesc.length)];
    const wrongs = pick(withDesc.filter(c => c.id !== correct.id), 3);
    const options = shuffle([correct, ...wrongs]);
    total++;

    document.getElementById('g9area').innerHTML = `
      <p class="game-question" style="font-size:.95rem">"${correct.desc.slice(0,120)}..."</p>
      <div class="options-grid" id="g9opts">
        ${options.map(o => `<button class="option-btn" data-correct="${o.id===correct.id}" style="padding:.6rem">${o.term}</button>`).join('')}
      </div>`;

    app.querySelectorAll('#g9opts .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ok = btn.dataset.correct === 'true';
        if (ok) { score++; combo++; } else { combo = 0; }
        Store.updateMastery(correct.id, ok);
        updateHUD();
        nextQ();
      });
    });
  }

  function updateHUD() {
    const hudEl = document.getElementById('g9hud');
    if (hudEl) hudEl.innerHTML = `
      <div class="hud-item"><div class="hud-val">${timeLeft}s</div><div class="hud-label">Süre</div></div>
      <div class="hud-item"><div class="hud-val">${score}</div><div class="hud-label">Doğru</div></div>
      <div class="hud-item"><div class="hud-val">${combo}</div><div class="hud-label">Kombo</div></div>
      <div class="hud-item"><div class="hud-val">${total-1}</div><div class="hud-label">Toplam</div></div>`;
    const tb = document.getElementById('g9timer');
    if (tb) tb.querySelector('.timer-fill').style.width = (timeLeft/60*100)+'%';
  }

  app.innerHTML = `
    <div class="game-hud" id="g9hud">
      <div class="hud-item"><div class="hud-val">60s</div><div class="hud-label">Süre</div></div>
      <div class="hud-item"><div class="hud-val">0</div><div class="hud-label">Doğru</div></div>
      <div class="hud-item"><div class="hud-val">0</div><div class="hud-label">Kombo</div></div>
    </div>
    <div class="timer-bar" id="g9timer"><div class="timer-fill" style="width:100%"></div></div>
    <div class="game-area" id="g9area"></div>`;

  timer = setInterval(() => {
    timeLeft--;
    updateHUD();
    if (timeLeft <= 10) {
      const tf = document.querySelector('#g9timer .timer-fill');
      if (tf) tf.classList.add('danger');
    }
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult(app, 'GAME09', score, Math.max(total-1,1), ()=>game09(app));
    }
  }, 1000);

  nextQ();
}

// ===== GAME10: Ustalik Kartlari (Flashcard) =====
function game10(app) {
  const store = Store.get();
  // Prioritize weak concepts
  const weak = Store.getWeakConcepts(20);
  const weakConcepts = weak.map(id => DATA.concepts.find(c => c.id === id)).filter(Boolean);
  const pool = weakConcepts.length >= 5 ? weakConcepts : shuffle(DATA.concepts.filter(c => c.desc)).slice(0, 20);
  let idx = 0, known = 0, total = pool.length;

  function showCard() {
    if (idx >= pool.length) {
      showResult(app, 'GAME10', known, total, ()=>game10(app));
      return;
    }
    const c = pool[idx];
    app.innerHTML = `
      ${hud([{val:(idx+1)+'/'+total,label:'Kart'},{val:known,label:'Biliyorum'}])}
      <div class="flashcard" id="fc" onclick="document.getElementById('fc').classList.toggle('flipped')">
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">
            <div class="fc-code">${c.code||c.id}</div>
            <div class="fc-term">${c.term}</div>
            <p style="margin-top:1rem;opacity:.7;font-size:.85rem">Tıkla → Tanımı gör</p>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="fc-desc">${c.desc||'Tanım mevcut değil'}</div>
            <p style="margin-top:.5rem;font-size:.8rem;color:var(--text-secondary)">${c.family} — s.${c.p1}</p>
          </div>
        </div>
      </div>
      <div class="flashcard-actions">
        <button class="btn btn-danger" onclick="window._fcAnswer(false)">🔄 Tekrar</button>
        <button class="btn btn-success" onclick="window._fcAnswer(true)">✅ Biliyorum</button>
      </div>`;

    window._fcAnswer = function(correct) {
      Store.updateMastery(c.id, correct);
      if (correct) known++;
      idx++;
      showCard();
    };
  }
  showCard();
}

// ===== GAME ROUTER =====
function start(app, gameId) {
  const game = DATA.games.find(g => g.id === gameId);
  if (!game) { app.innerHTML = '<div class="empty-state"><p>Oyun bulunamadı. <a href="#/oyunlar">Geri dön</a></p></div>'; return; }

  switch(gameId) {
    case 'GAME01': game01(app); break;
    case 'GAME02': game02(app); break;
    case 'GAME03': game03(app); break;
    case 'GAME04': game04(app); break;
    case 'GAME05': game05(app); break;
    case 'GAME06': game06(app); break;
    case 'GAME07': game07(app); break;
    case 'GAME08': game08(app); break;
    case 'GAME09': game09(app); break;
    case 'GAME10': game10(app); break;
    default: app.innerHTML = '<div class="empty-state"><p>Bu oyun henüz hazır değil.</p></div>';
  }
}

window.Games = { start };
})();
