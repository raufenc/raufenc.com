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
    const famLabel = shortFam(mainFam);

    function optCard(o) {
      const isDiff = o.id === diff.id;
      const previewText = o.desc ? o.desc.slice(0, 90) + (o.desc.length > 90 ? '…' : '') : '';
      const fc = getFamilyClass(o.family);
      return `<button class="option-btn g2-card" data-id="${o.id}" data-diff="${isDiff}">
        <div class="g2-term">${o.term}</div>
        ${previewText ? `<div class="g2-hint">${previewText}</div>` : ''}
        <div class="g2-code">${o.code || ''}</div>
      </button>`;
    }

    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <div class="g2-header">
          <div class="g2-family-label">📂 Grup: <strong>${famLabel}</strong></div>
          <p class="game-question">Bu gruba ait OLMAYAN hangisi?</p>
        </div>
        <div class="options-grid g2-grid" id="g2opts">
          ${options.map(o => optCard(o)).join('')}
        </div>
        <div id="g2fb" class="mt-1 text-center"></div>
      </div>`;

    let answered = false;
    app.querySelectorAll('#g2opts .g2-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = btn.dataset.diff === 'true';
        if (correct) { score++; btn.classList.add('correct'); } else { btn.classList.add('wrong'); }
        app.querySelectorAll('#g2opts .g2-card').forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.diff === 'true') b.classList.add('correct');
        });
        document.getElementById('g2fb').innerHTML = `
          <div class="g2-explain">
            <span>${correct ? '✅ Doğru!' : '❌ Yanlış!'}</span>
            <strong>${diff.term}</strong>, <em>${shortFam(diff.family)}</em> ailesine ait — bu gruptaki diğerleri <em>${famLabel}</em> ailesinden.
          </div>
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

// ===== GAME03: Kavram Tasnifi (Sorting) =====
// Öğrenme mekaniği: kavramı okuyarak hangi aileye ait olduğunu düşünürsün
// Yanlış atarsan doğrusu gösterilir → öğrenme anı
function game03(app) {
  const allFams = [...new Set(DATA.concepts.map(c => c.family))]
    .filter(f => DATA.concepts.filter(c => c.family === f && c.desc && c.desc.length < 200 && !c.desc.includes(' • ')).length >= 3);
  if (allFams.length < 3) { app.innerHTML = '<div class="empty-state"><p>Yeterli veri yok</p></div>'; return; }

  let totalScore = 0, round = 0, totalRounds = 3;

  function playRound() {
    if (round >= totalRounds) { showResult(app, 'GAME03', totalScore, totalRounds * 9, () => game03(app)); return; }

    const selectedFams = pick(allFams, 3);
    const buckets = selectedFams.map(f => ({
      family: f,
      label: shortFam(f),
      concepts: pick(DATA.concepts.filter(c => c.family === f && c.desc && c.desc.length < 200 && !c.desc.includes(' • ')), 3)
    }));
    const allCards = shuffle(buckets.flatMap(b => b.concepts.map(c => ({ ...c, correctFam: b.family }))));
    const assignments = {}; // conceptId → assigned family
    let roundScore = 0;
    let remaining = allCards.length;

    function render() {
      app.innerHTML = `
        ${hud([{val: round+1+'/'+totalRounds, label:'Tur'},{val:totalScore+roundScore, label:'Puan'},{val:remaining, label:'Kalan'}])}
        <div class="game-area">
          <p class="game-question">Kavramları doğru aile kovalarına yerleştir</p>
          <div class="tasnif-buckets" id="buckets">
            ${buckets.map(b => `
              <div class="tasnif-bucket" data-fam="${b.family}" id="bucket-${b.family.replace(/\s/g,'_')}">
                <div class="tb-label">${b.label}</div>
                <div class="tb-cards" id="tbcards-${b.family.replace(/\s/g,'_')}"></div>
              </div>`).join('')}
          </div>
          <div class="tasnif-pool" id="cardPool">
            ${allCards.map(c => `
              <div class="tasnif-card" id="tc-${c.id}" data-id="${c.id}" data-fam="${c.correctFam}" onclick="window._g3pick(this)">
                <div class="tc-term">${c.term}</div>
                ${c.desc ? `<div class="tc-hint">${c.desc.slice(0,80)}${c.desc.length>80?'…':''}</div>` : ''}
              </div>`).join('')}
          </div>
          <div id="g3msg" class="g3-msg hidden"></div>
        </div>`;
    }

    render();

    let selectedCard = null;

    window._g3pick = function(cardEl) {
      if (cardEl.classList.contains('placed')) return;
      // Deselect previous
      document.querySelectorAll('.tasnif-card.selected-card').forEach(c => c.classList.remove('selected-card'));
      if (selectedCard && selectedCard.dataset.id === cardEl.dataset.id) { selectedCard = null; return; }
      selectedCard = cardEl;
      cardEl.classList.add('selected-card');
      // Highlight buckets
      document.querySelectorAll('.tasnif-bucket').forEach(b => b.classList.add('bucket-active'));
      // Assign bucket click
      document.querySelectorAll('.tasnif-bucket').forEach(bucketEl => {
        bucketEl.onclick = function() {
          if (!selectedCard) return;
          document.querySelectorAll('.tasnif-bucket').forEach(b => { b.classList.remove('bucket-active'); b.onclick = null; });
          const assignedFam = bucketEl.dataset.fam;
          const correct = assignedFam === selectedCard.dataset.fam;
          selectedCard.classList.remove('selected-card');
          if (correct) {
            roundScore++;
            selectedCard.classList.add('placed', 'placed-ok');
            const termText = selectedCard.querySelector('.tc-term')?.textContent || '';
            const key = assignedFam.replace(/\s/g,'_');
            const bucket = document.getElementById('tbcards-'+key);
            if (bucket) bucket.insertAdjacentHTML('beforeend',
              `<div class="tb-chip">${termText}</div>`);
          } else {
            selectedCard.classList.add('placed', 'placed-err');
            const correctLabel = shortFam(selectedCard.dataset.fam);
            const termText = selectedCard.querySelector('.tc-term')?.textContent || '';
            const msg = document.getElementById('g3msg');
            if (msg) {
              msg.textContent = `❌ "${termText}" → ${correctLabel} ailesine ait`;
              msg.classList.remove('hidden');
              setTimeout(() => msg.classList.add('hidden'), 2500);
            }
            // Still place it to correct bucket visually
            const correctKey = selectedCard.dataset.fam.replace(/\s/g,'_');
            const correctBucket = document.getElementById('tbcards-'+correctKey);
            if (correctBucket) correctBucket.insertAdjacentHTML('beforeend',
              `<div class="tb-chip tb-chip-err">${termText}</div>`);
          }
          remaining--;
          selectedCard = null;
          void document.getElementById('g3msg')?.offsetHeight; // trigger repaint
          if (remaining === 0) {
            setTimeout(() => {
              totalScore += roundScore;
              round++;
              playRound();
            }, 1200);
          }
        };
      });
    };
  }
  playRound();
}

// ===== GAME04: Eşleşme Kartları (Memory flip) =====
// Öğrenme mekaniği: kartı çevirince tanımı/terimi GÖRÜRSÜN → öğrenme kartları çevirirken olur
// Test değil keşif: kaç çevirmede tüm eşleri bulursun?
function game04(app) {
  const pool = DATA.concepts.filter(c => c.desc && c.desc.length > 20 && c.desc.length < 120 && !c.desc.includes(' • '));
  const selected = pick(pool, 8);
  // 16 kart: 8 terim + 8 tanım
  const cards = shuffle([
    ...selected.map((c, i) => ({ pairId: i, type: 'term', text: c.term, sub: shortFam(c.family), concept: c })),
    ...selected.map((c, i) => ({ pairId: i, type: 'desc', text: c.desc, sub: shortFam(c.family), concept: c }))
  ]).map((card, idx) => ({ ...card, idx }));

  let flipped = [];   // max 2 cards currently face-up
  let matched = new Set();
  let moves = 0;
  let locked = false;

  function renderGrid() {
    app.innerHTML = `
      ${hud([{val:matched.size/2+'/8',label:'Eşleşme'},{val:moves,label:'Hamle'}])}
      <div class="game-area">
        <p class="game-question" style="font-size:.9rem;margin-bottom:.75rem">Terim ile tanımını eşleştir — kartları çevirince öğrenirsin 🧠</p>
        <div class="memory-grid" id="memGrid">
          ${cards.map(card => `
            <div class="mem-card ${matched.has(card.pairId)?'mem-matched':''}" data-idx="${card.idx}" data-pair="${card.pairId}" data-type="${card.type}">
              <div class="mem-face mem-back">?</div>
              <div class="mem-face mem-front ${card.type==='term'?'mem-term':'mem-desc'}">
                <div class="mem-text">${card.text}</div>
                <div class="mem-sub">${card.sub}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;

    app.querySelectorAll('.mem-card').forEach(cardEl => {
      if (matched.has(parseInt(cardEl.dataset.pair))) {
        cardEl.classList.add('face-up');
        return;
      }
      cardEl.addEventListener('click', () => {
        if (locked) return;
        if (cardEl.classList.contains('face-up')) return;
        if (flipped.length >= 2) return;
        cardEl.classList.add('face-up');
        flipped.push(cardEl);
        if (flipped.length === 2) {
          moves++;
          locked = true;
          const [a, b] = flipped;
          const pairMatch = a.dataset.pair === b.dataset.pair && a.dataset.type !== b.dataset.type;
          if (pairMatch) {
            matched.add(parseInt(a.dataset.pair));
            a.classList.add('mem-matched');
            b.classList.add('mem-matched');
            flipped = [];
            locked = false;
            // Update moves counter
            const hudEl = app.querySelector('.hud-item:first-child .hud-val');
            if (hudEl) hudEl.textContent = matched.size/2+'/8';
            if (matched.size === 8) {
              setTimeout(() => {
                Store.addGameScore('GAME04', Math.max(10, 100 - moves));
                Store.addXP(20);
                app.innerHTML = `
                  <div class="result-screen">
                    <div class="result-stars">⭐⭐⭐</div>
                    <div class="result-score">${moves} hamle</div>
                    <div class="result-label">Tüm ${selected.length} çift eşleştirildi!</div>
                    <div class="result-actions">
                      <button class="btn btn-primary" onclick="window.Games.start(document.getElementById('app'),'GAME04')">🔄 Tekrar</button>
                      <a href="#/oyunlar" class="btn btn-outline">🎮 Oyunlar</a>
                    </div>
                  </div>`;
              }, 600);
            }
          } else {
            // Show mismatch briefly then flip back
            setTimeout(() => {
              a.classList.remove('face-up');
              b.classList.remove('face-up');
              flipped = [];
              locked = false;
            }, 1200);
          }
        }
      });
    });
  }
  renderGrid();
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

// ===== GAME06: Değeri Keşfet (Önce göster, sonra pekiştir) =====
// Öğrenme mekaniği: ÖNCE değeri ve tüm eylemlerini görürsün → kavramsal bağlantı kurulur
// Sonra "bu değere ait BAŞKA bir eylem hangisi?" sorusu → kısa süreli hafıza testi
function game06(app) {
  const values = DATA.concepts.filter(c => c.family === 'Erdem-Değer-Eylem' && c.sub === 'Değer' && c.desc);
  const cleanRefs = DATA.references.filter(r =>
    r.type === 'eylem' && r.text.length > 15 && r.text.length < 180 &&
    !r.text.includes(' • ') && !r.text.includes('öğrenme •') && !r.text.includes('Değer telkini')
  );
  let score = 0, q = 0, total = 6;

  function nextQ() {
    if (q >= total) { showResult(app, 'GAME06', score, total, () => game06(app)); return; }
    // Pick a value with at least 3 clean actions
    const candidates = values.filter(v => cleanRefs.filter(r => r.pc.split('.')[0] === v.code).length >= 3);
    if (candidates.length === 0) { q++; nextQ(); return; }
    const value = candidates[Math.floor(Math.random() * candidates.length)];
    const valueRefs = cleanRefs.filter(r => r.pc.split('.')[0] === value.code);
    // Show 3 actions in the "learn" phase, then test with 1 more
    const showRefs = pick(valueRefs, Math.min(3, valueRefs.length));
    const testRef = pick(valueRefs.filter(r => !showRefs.includes(r)), 1)[0];
    if (!testRef) { q++; nextQ(); return; }
    // Wrong options: real actions from OTHER values
    const wrongRefs = pick(cleanRefs.filter(r => r.pc.split('.')[0] !== value.code), 3);
    const options = shuffle([testRef, ...wrongRefs]);

    // Phase 1: LEARN — show value + its actions
    app.innerHTML = `
      ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
      <div class="game-area">
        <div class="g6-reveal">
          <div class="g6-value-card">
            <div class="g6-value-label">Değer</div>
            <div class="g6-value-name">${value.term}</div>
            ${value.desc ? `<div class="g6-value-desc">${value.desc}</div>` : ''}
          </div>
          <div class="g6-actions-list">
            <div class="g6-actions-title">Bu değere ait eylemler:</div>
            ${showRefs.map(r => `<div class="g6-action-item">→ ${r.text}</div>`).join('')}
          </div>
          <button class="btn btn-primary mt-2" id="g6ready">Anladım, devam →</button>
        </div>
      </div>`;

    document.getElementById('g6ready').addEventListener('click', () => {
      // Phase 2: TEST — find another action belonging to this value
      app.innerHTML = `
        ${hud([{val:(q+1)+'/'+total,label:'Soru'},{val:score,label:'Puan'}])}
        <div class="game-area">
          <div class="g6-test-header">
            <span class="g6-test-badge">${value.term}</span> değerine ait BAŞKA bir eylem hangisi?
          </div>
          <div class="options-grid" id="g6opts">
            ${options.map(o => `<button class="option-btn g2-card" data-correct="${o === testRef}">
              <div class="g2-term">${o.text}</div>
            </button>`).join('')}
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
          document.getElementById('g6fb').innerHTML = `
            <div class="g2-explain">${ok ? '✅ Doğru!' : '❌ Yanlış!'} Doğru eylem: <em>"${testRef.text}"</em></div>
            <button class="btn btn-primary btn-sm mt-1" onclick="window._g6next()">Sonraki →</button>`;
        });
      });
      window._g6next = () => { q++; nextQ(); };
    });
  }
  nextQ();
}

// ===== GAME07: Bosluk Doldur =====
function game07(app) {
  const withDesc = DATA.concepts.filter(c => c.desc && c.desc.split(' ').length >= 5 && c.desc.length < 300 && !c.desc.includes(' • '));
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
        document.getElementById('g7fb').innerHTML = `
          <div class="g2-explain">${ok?'✅ Doğru!':'❌ Yanlış!'} Tam tanım: <em>"${concept.desc}"</em></div>
          <button class="btn btn-primary btn-sm mt-1" onclick="window._g7next()">Sonraki →</button>`;
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
