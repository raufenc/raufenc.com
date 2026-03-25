initPage('sinav');

let currentGame = null;
// Bu Kim state
let bkRound=0, bkScore=0, bkScholars=[], bkClueIdx=0, bkAnswered=false;
// Eslestir state
let esScore=0, esTimer=60, esInterval=null, esPairs=[], esSelected=null;
// Zaman state
let ztRound=0, ztScore=0, ztScholars=[], ztSlots=[];

function showMenu() {
  currentGame = null;
  const scores = Store.getScores();
  const content = document.getElementById('main-content');
  content.innerHTML = `
    <div class="game-select">
      <h2>\u26A1 S\u0131nav ve Oyunlar</h2>
      <p>Bilgini test et, y\u00FCksek skor k\u0131r!</p>

      <div class="hs-bar">
        <div class="hs-item"><div class="hs-label">Bu Kim?</div><div class="hs-val">${scores['bu-kim']||0}</div></div>
        <div class="hs-item"><div class="hs-label">E\u015Fle\u015Ftir</div><div class="hs-val">${scores['eslestir']||0}</div></div>
        <div class="hs-item"><div class="hs-label">Zaman</div><div class="hs-val">${scores['zaman']||0}</div></div>
      </div>

      <div class="game-cards">
        <div class="game-card" onclick="startBuKim()">
          <div class="game-card-icon">\uD83D\uDD75\uFE0F</div>
          <div class="game-card-title">Bu Kim?</div>
          <div class="game-card-desc">\u0130pu\u00E7lar\u0131ndan alimi tahmin et. 10 tur.</div>
          <div class="game-card-badge">300 puan/tur</div>
        </div>
        <div class="game-card" onclick="startEslestir()">
          <div class="game-card-icon">\uD83D\uDD17</div>
          <div class="game-card-title">E\u015Fle\u015Ftir</div>
          <div class="game-card-desc">Alim ve katk\u0131lar\u0131n\u0131 e\u015Fle. 60 saniye.</div>
          <div class="game-card-badge">Zamana kar\u015F\u0131</div>
        </div>
        <div class="game-card" onclick="startZaman()">
          <div class="game-card-icon">\u231B</div>
          <div class="game-card-title">Zaman T\u00FCneli</div>
          <div class="game-card-desc">Alimleri kronolojik s\u0131raya diz. 3 tur.</div>
          <div class="game-card-badge">S\u0131ralama</div>
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <h2 style="font-size:18px;font-weight:900;margin:32px 0 12px">\uD83C\uDFC6 Ba\u015Far\u0131mlar</h2>
    <div class="xp-bar" style="margin-bottom:16px">
      <div class="xp-rank">${Store.getRank().icon} ${Store.getRank().title}</div>
      <div class="xp-total">${Store.getTotalXP()} XP</div>
      <div class="xp-progress"><div class="xp-fill" style="width:${Math.min(100,(Store.getTotalXP()/500)*100)}%"></div></div>
    </div>
    <div class="basarim-grid">
      ${BASARIMLAR.map(b => {
        const unlocked = Store.getAchievements().includes(b.id);
        return `
          <div class="basarim-card ${unlocked?'unlocked':'locked'}">
            <div class="basarim-icon">${b.icon}</div>
            <div class="basarim-title">${b.baslik}</div>
            <div class="basarim-desc">${b.aciklama}</div>
            <div class="basarim-xp">${b.puan} XP</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ========== BU KIM? ==========
function startBuKim() {
  currentGame = 'bu-kim';
  // Pick 10 scholars with clues
  const withClues = BILGINLER.filter(b => b.ipuclari && b.ipuclari.length >= 3);
  bkScholars = shuffle(withClues).slice(0, 10);
  bkRound = 0; bkScore = 0;
  nextBkRound();
}

function nextBkRound() {
  if (bkRound >= bkScholars.length) return endBuKim();
  bkClueIdx = 0; bkAnswered = false;
  const scholar = bkScholars[bkRound];

  // Generate options: correct + 3 random
  const others = shuffle(BILGINLER.filter(b => b.id !== scholar.id)).slice(0, 3);
  const options = shuffle([scholar, ...others]);

  const content = document.getElementById('main-content');
  content.innerHTML = `
    <div style="max-width:640px;margin:0 auto;padding-top:24px">
      <div class="oyun-hud">
        <div class="hud-item"><div class="hud-label">Tur</div><div class="hud-val">${bkRound+1}/10</div></div>
        <div class="hud-item"><div class="hud-label">Puan</div><div class="hud-val" id="bk-score">${bkScore}</div></div>
      </div>
      <div class="clue-cards" id="bk-clues">
        ${scholar.ipuclari.map((c, i) => `
          <div class="clue-card ${i===0?'visible':''}" id="clue-${i}">
            <span class="clue-num">${i+1}</span> ${c}
          </div>
        `).join('')}
      </div>
      <button class="reveal-btn" id="bk-reveal" onclick="revealClue()">\uD83D\uDCA1 Sonraki \u0130pucu</button>
      <div class="options-grid" id="bk-options">
        ${options.map(o => `
          <button class="option-btn" onclick="answerBk(${o.id},${scholar.id})">${o.isim}</button>
        `).join('')}
      </div>
      <button class="btn-secondary" onclick="showMenu()" style="margin-top:12px">\u2190 Men\u00FC</button>
    </div>
  `;
}

function revealClue() {
  bkClueIdx++;
  const el = document.getElementById('clue-'+bkClueIdx);
  if (el) el.classList.add('visible');
  const scholar = bkScholars[bkRound];
  if (bkClueIdx >= scholar.ipuclari.length - 1) {
    document.getElementById('bk-reveal').disabled = true;
  }
}

function answerBk(chosen, correct) {
  if (bkAnswered) return;
  bkAnswered = true;
  const btns = document.querySelectorAll('#bk-options .option-btn');
  btns.forEach(btn => {
    btn.disabled = true;
    const id = parseInt(btn.getAttribute('onclick').match(/answerBk\((\d+)/)[1]);
    if (id === correct) btn.classList.add('correct');
    if (id === chosen && id !== correct) btn.classList.add('wrong');
  });

  if (chosen === correct) {
    const pts = bkClueIdx === 0 ? 300 : bkClueIdx === 1 ? 200 : 100;
    bkScore += pts;
    document.getElementById('bk-score').textContent = bkScore;
  }

  setTimeout(() => { bkRound++; nextBkRound(); }, 1500);
}

function endBuKim() {
  Store.saveScore('bu-kim', bkScore);
  let medal = '\uD83E\uDD49', title = '\u0130yi';
  if (bkScore >= 2500) { medal = '\uD83E\uDD47'; title = 'M\u00FCkemmel!'; }
  else if (bkScore >= 1500) { medal = '\uD83E\uDD48'; title = '\u00C7ok \u0130yi!'; }

  document.getElementById('main-content').innerHTML = `
    <div class="sonuc show" style="padding-top:60px">
      <div class="sonuc-rozet">${medal}</div>
      <div class="sonuc-skor">${bkScore}</div>
      <div class="sonuc-unvan">${title}</div>
      <div class="sonuc-mesaj">10 turda ${bkScore} puan toplad\u0131n!</div>
      <div class="sonuc-btns">
        <button class="btn-primary" onclick="startBuKim()">Tekrar Oyna</button>
        <button class="btn-secondary" onclick="showMenu()">Men\u00FC</button>
      </div>
    </div>
  `;
}

// ========== ESLESTIR ==========
function startEslestir() {
  currentGame = 'eslestir';
  esScore = 0; esTimer = 60; esSelected = null;
  loadEsPairs();
  esInterval = setInterval(() => {
    esTimer--;
    const el = document.getElementById('es-timer');
    if (el) el.textContent = esTimer;
    if (esTimer <= 0) endEslestir();
  }, 1000);
}

function loadEsPairs() {
  // Pick 6 scholars with contributions
  const withKatki = shuffle(BILGINLER.filter(b => b.katkilar && b.katkilar.length > 0));
  esPairs = withKatki.slice(0, 6).map(b => ({
    id: b.id, isim: b.isim, katki: b.katkilar[0], matched: false
  }));
  esSelected = null;
  renderEslestir();
}

function renderEslestir() {
  const leftItems = esPairs.map(p => ({ id: p.id, text: p.isim, type: 'name', matched: p.matched }));
  const rightItems = shuffle(esPairs.map(p => ({ id: p.id, text: p.katki, type: 'katki', matched: p.matched })));

  document.getElementById('main-content').innerHTML = `
    <div style="max-width:640px;margin:0 auto;padding-top:24px">
      <div class="oyun-hud">
        <div class="hud-item"><div class="hud-label">S\u00FCre</div><div class="hud-val" id="es-timer">${esTimer}</div></div>
        <div class="hud-item"><div class="hud-label">Puan</div><div class="hud-val">${esScore}</div></div>
      </div>
      <div class="eslestir-grid">
        <div class="eslestir-col">
          ${leftItems.map(i => `
            <div class="eslestir-card ${i.matched?'matched':''}" data-id="${i.id}" data-type="name" onclick="selectEs(this)">${i.text}</div>
          `).join('')}
        </div>
        <div class="eslestir-col">
          ${rightItems.map(i => `
            <div class="eslestir-card ${i.matched?'matched':''}" data-id="${i.id}" data-type="katki" onclick="selectEs(this)" style="font-size:11px">${i.text}</div>
          `).join('')}
        </div>
      </div>
      <button class="btn-secondary" onclick="endEslestir()" style="margin-top:12px">\u2190 Bitir</button>
    </div>
  `;
}

function selectEs(el) {
  if (el.classList.contains('matched')) return;

  if (!esSelected) {
    esSelected = el;
    el.classList.add('selected');
  } else {
    const id1 = parseInt(esSelected.dataset.id);
    const id2 = parseInt(el.dataset.id);
    const type1 = esSelected.dataset.type;
    const type2 = el.dataset.type;

    if (type1 === type2) {
      // Same column, switch selection
      esSelected.classList.remove('selected');
      esSelected = el;
      el.classList.add('selected');
      return;
    }

    if (id1 === id2) {
      // Correct match
      esSelected.classList.remove('selected');
      esSelected.classList.add('matched');
      el.classList.add('matched');
      esScore += 10;
      esPairs.find(p => p.id === id1).matched = true;
      esSelected = null;

      // Check if all matched
      if (esPairs.every(p => p.matched)) {
        setTimeout(loadEsPairs, 500);
      } else {
        renderEslestir();
      }
    } else {
      // Wrong
      el.classList.add('wrong');
      esSelected.classList.add('wrong');
      const s = esSelected;
      setTimeout(() => {
        el.classList.remove('wrong');
        s.classList.remove('wrong','selected');
        esSelected = null;
      }, 400);
    }
  }
}

function endEslestir() {
  clearInterval(esInterval);
  Store.saveScore('eslestir', esScore);

  document.getElementById('main-content').innerHTML = `
    <div class="sonuc show" style="padding-top:60px">
      <div class="sonuc-rozet">\uD83D\uDD17</div>
      <div class="sonuc-skor">${esScore}</div>
      <div class="sonuc-unvan">${esScore >= 60 ? 'Muhte\u015Fem!' : esScore >= 30 ? '\u0130yi!' : 'Denemeye devam!'}</div>
      <div class="sonuc-mesaj">60 saniyede ${esScore} puan toplad\u0131n!</div>
      <div class="sonuc-btns">
        <button class="btn-primary" onclick="startEslestir()">Tekrar Oyna</button>
        <button class="btn-secondary" onclick="showMenu()">Men\u00FC</button>
      </div>
    </div>
  `;
}

// ========== ZAMAN TUNELI ==========
function startZaman() {
  currentGame = 'zaman';
  ztRound = 0; ztScore = 0; ztSlots = [];
  nextZtRound();
}

function nextZtRound() {
  if (ztRound >= 3) return endZaman();

  const withDates = shuffle(BILGINLER.filter(b => b.dogum || b.vefat));
  ztScholars = withDates.slice(0, 5).map(b => ({
    id: b.id, isim: b.isim,
    year: b.dogum || (b.vefat - 40),
    display: `${b.isim} (${b.dogum||'?'}\u2013${b.vefat||'?'})`
  })).sort((a,b) => a.year - b.year);

  ztSlots = Array(5).fill(null);
  const poolScholars = shuffle([...ztScholars]);

  document.getElementById('main-content').innerHTML = `
    <div style="max-width:640px;margin:0 auto;padding-top:24px">
      <div class="oyun-hud">
        <div class="hud-item"><div class="hud-label">Tur</div><div class="hud-val">${ztRound+1}/3</div></div>
        <div class="hud-item"><div class="hud-label">Puan</div><div class="hud-val">${ztScore}</div></div>
      </div>
      <div class="zaman-instruct">Alimleri en eskiden en yeniye s\u0131rayla yerle\u015Ftir.</div>
      <div class="zaman-pool" id="zt-pool">
        ${poolScholars.map(s => `
          <div class="zaman-pool-card" data-id="${s.id}" onclick="pickZt(${s.id})">${s.isim}</div>
        `).join('')}
      </div>
      <div class="zaman-slot-row" id="zt-slots">
        ${ztSlots.map((s, i) => `
          <div class="zaman-slot" data-idx="${i}" onclick="clearZtSlot(${i})">
            <span class="zaman-slot-num">${i+1}</span>
            <span class="zaman-slot-name">${s ? s.isim : 'T\u0131kla yerle\u015Ftir'}</span>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-primary" onclick="checkZt()">Kontrol Et</button>
        <button class="btn-secondary" onclick="showMenu()">\u2190 Men\u00FC</button>
      </div>
      <div class="zaman-reveal" id="zt-reveal"></div>
    </div>
  `;
}

function pickZt(id) {
  const slot = ztSlots.indexOf(null);
  if (slot === -1) return;
  const scholar = ztScholars.find(s => s.id === id);
  if (!scholar || ztSlots.includes(scholar)) return;

  ztSlots[slot] = scholar;
  // Hide from pool
  const poolCard = document.querySelector(`.zaman-pool-card[data-id="${id}"]`);
  if (poolCard) poolCard.style.display = 'none';

  // Update slot display
  const slotEls = document.querySelectorAll('.zaman-slot');
  slotEls[slot].innerHTML = `
    <span class="zaman-slot-num">${slot+1}</span>
    <span class="zaman-slot-name filled">${scholar.isim}</span>
    <button class="zaman-slot-remove" onclick="event.stopPropagation();clearZtSlot(${slot})">\u2715</button>
  `;
}

function clearZtSlot(idx) {
  const scholar = ztSlots[idx];
  if (!scholar) return;
  ztSlots[idx] = null;

  // Show in pool again
  const poolCard = document.querySelector(`.zaman-pool-card[data-id="${scholar.id}"]`);
  if (poolCard) poolCard.style.display = '';

  // Update slot
  const slotEls = document.querySelectorAll('.zaman-slot');
  slotEls[idx].innerHTML = `
    <span class="zaman-slot-num">${idx+1}</span>
    <span class="zaman-slot-name">T\u0131kla yerle\u015Ftir</span>
  `;
}

function checkZt() {
  if (ztSlots.includes(null)) return;

  const correct = [...ztScholars]; // already sorted by year
  const slotEls = document.querySelectorAll('.zaman-slot');
  let roundScore = 0;

  ztSlots.forEach((s, i) => {
    if (s.id === correct[i].id) {
      slotEls[i].classList.add('correct');
      roundScore += 20;
    } else {
      slotEls[i].classList.add('wrong');
    }
  });

  ztScore += roundScore;

  // Show correct order
  const reveal = document.getElementById('zt-reveal');
  reveal.classList.add('show');
  reveal.innerHTML = `
    <div style="font-weight:800;margin-bottom:8px">Do\u011Fru s\u0131ralama:</div>
    <div class="zaman-timeline">
      ${correct.map(s => `
        <div class="zt-item"><span class="zt-dot"></span><span class="zt-year">${s.year}</span> ${s.isim}</div>
      `).join('')}
    </div>
    <div style="margin-top:12px;font-size:13px;color:var(--gold);font-weight:700">${roundScore}/100 puan</div>
    <button class="btn-primary" style="margin-top:10px" onclick="ztRound++;nextZtRound()">Sonraki Tur</button>
  `;
}

function endZaman() {
  Store.saveScore('zaman', ztScore);
  document.getElementById('main-content').innerHTML = `
    <div class="sonuc show" style="padding-top:60px">
      <div class="sonuc-rozet">\u231B</div>
      <div class="sonuc-skor">${ztScore}</div>
      <div class="sonuc-unvan">${ztScore >= 250 ? 'Zaman Uzman\u0131!' : ztScore >= 150 ? '\u0130yi!' : 'Tekrar dene!'}</div>
      <div class="sonuc-mesaj">3 turda ${ztScore} puan toplad\u0131n!</div>
      <div class="sonuc-btns">
        <button class="btn-primary" onclick="startZaman()">Tekrar Oyna</button>
        <button class="btn-secondary" onclick="showMenu()">Men\u00FC</button>
      </div>
    </div>
  `;
}

// ========== UTILITY ==========
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Init
showMenu();
