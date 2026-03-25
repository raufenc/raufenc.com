initPage('ogrenme');

let currentPath = null;
let currentQuizStep = null;

// Render XP bar
function renderXP() {
  const xp = Store.getTotalXP();
  const rank = Store.getRank();
  const nextRankXP = xp < 50 ? 50 : xp < 150 ? 150 : xp < 300 ? 300 : xp < 500 ? 500 : 500;
  const pct = Math.min(100, (xp / nextRankXP) * 100);
  document.getElementById('xp-bar').innerHTML = `
    <div class="xp-rank">${rank.icon} ${rank.title}</div>
    <div class="xp-total">${xp} XP</div>
    <div class="xp-progress"><div class="xp-fill" style="width:${pct}%"></div></div>
  `;
}

// Render path hub
function showHub() {
  currentPath = null;
  document.getElementById('path-hub').style.display = '';
  document.getElementById('path-view').style.display = 'none';

  const grid = document.getElementById('yollar-grid');
  grid.innerHTML = OGRENME_YOLLARI.map(yol => {
    const progress = Store.getPathProgress(yol.id);
    const completed = progress.filter(Boolean).length;
    const total = yol.adimlar.length;
    const pct = total > 0 ? (completed / total) * 100 : 0;
    return `
      <div class="yol-card" onclick="showPath(${yol.id})" style="--card-color:${yol.renk}">
        <div class="yol-icon">${yol.icon}</div>
        <div class="yol-title">${yol.baslik}</div>
        <div class="yol-desc">${yol.aciklama}</div>
        <div style="font-size:11px;color:var(--muted2);margin-bottom:6px">${completed}/${total} tamamlandı</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  }).join('');
}

// Show single path
function showPath(pathId) {
  const yol = OGRENME_YOLLARI.find(y => y.id === pathId);
  if (!yol) return;
  currentPath = yol;

  document.getElementById('path-hub').style.display = 'none';
  document.getElementById('path-view').style.display = '';

  const progress = Store.getPathProgress(yol.id);

  document.getElementById('path-header').innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <span style="font-size:36px">${yol.icon}</span>
      <div>
        <h2 style="font-size:22px;font-weight:900;margin-bottom:2px">${yol.baslik}</h2>
        <p style="font-size:13px;color:var(--muted2)">${yol.aciklama}</p>
      </div>
    </div>
  `;

  const steps = document.getElementById('path-steps');
  steps.innerHTML = yol.adimlar.map((adim, i) => {
    const done = progress[i];
    const locked = i > 0 && !progress[i-1]; // Previous step must be done
    const bilgin = BM[adim.bilginId];
    if (!bilgin) return '';
    const renk = alanRenk(bilgin.alanBirincil);

    return `
      <div class="yol-adim ${done ? 'done' : ''}" style="${locked ? 'opacity:0.4;pointer-events:none' : ''}">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="flex:1;min-width:0">
            <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">
              Adım ${i+1} · ${adim.konu}
            </div>
            <a href="alim.html?id=${bilgin.id}" style="font-size:15px;font-weight:800;color:var(--text);text-decoration:none">${bilgin.isim}</a>
            <div style="font-size:11px;color:var(--muted2);margin-top:2px">📅 ${bilgin.dogum||'?'}–${bilgin.vefat||'?'} · ${bilgin.yer}</div>
            <div style="font-size:12px;color:var(--muted2);margin-top:4px;line-height:1.5">${adim.hedef}</div>
          </div>
          <div style="flex-shrink:0">
            ${done
              ? '<span style="color:var(--green);font-size:24px">✓</span>'
              : locked
                ? '<span style="color:var(--muted);font-size:14px">🔒</span>'
                : `<button class="btn-primary" style="padding:8px 14px;font-size:11px" onclick="openQuiz(${yol.id},${i})">Quiz</button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Quiz system
function openQuiz(pathId, stepIdx) {
  const yol = OGRENME_YOLLARI.find(y => y.id === pathId);
  const adim = yol.adimlar[stepIdx];
  const bilgin = BM[adim.bilginId];
  currentQuizStep = { pathId, stepIdx, adim, bilgin };

  document.getElementById('quiz-title').textContent = `📝 ${adim.konu}`;

  const quiz = adim.quiz;
  document.getElementById('quiz-body').innerHTML = `
    <p style="font-size:14px;line-height:1.7;margin-bottom:16px">${quiz.soru}</p>
    <div class="options-grid" id="quiz-options">
      ${quiz.secenekler.map((s, i) => `
        <button class="option-btn" onclick="answerQuiz(${i})">${s}</button>
      `).join('')}
    </div>
    <div id="quiz-result" style="display:none;text-align:center;padding:16px 0"></div>
  `;

  document.getElementById('quiz-modal').classList.add('open');
}

function answerQuiz(chosen) {
  const { pathId, stepIdx, adim, bilgin } = currentQuizStep;
  const correct = adim.quiz.dogru;
  const buttons = document.querySelectorAll('#quiz-options .option-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    if (i === chosen && i !== correct) btn.classList.add('wrong');
  });

  const isCorrect = chosen === correct;
  const result = document.getElementById('quiz-result');

  if (isCorrect) {
    Store.savePathStep(pathId, stepIdx);
    Store.addQuizResult(pathId, stepIdx, 1, 1);
    result.innerHTML = `
      <div style="font-size:36px;margin-bottom:8px">🎉</div>
      <div style="font-size:18px;font-weight:800;color:var(--green);margin-bottom:4px">Doğru!</div>
      <p style="font-size:12px;color:var(--muted2);margin-bottom:12px">+10 XP kazandın</p>
      <button class="btn-primary" onclick="closeQuiz();showPath(${pathId})">Devam Et</button>
    `;
  } else {
    result.innerHTML = `
      <div style="font-size:36px;margin-bottom:8px">❌</div>
      <div style="font-size:18px;font-weight:800;color:var(--red);margin-bottom:4px">Yanlış!</div>
      <p style="font-size:12px;color:var(--muted2);margin-bottom:4px">Doğru cevap: <strong>${adim.quiz.secenekler[correct]}</strong></p>
      <p style="font-size:12px;color:var(--muted2);margin-bottom:12px">
        <a href="alim.html?id=${bilgin.id}" style="color:var(--gold)">Alimi incele</a> ve tekrar dene.
      </p>
      <button class="btn-secondary" onclick="closeQuiz()">Kapat</button>
    `;
  }
  result.style.display = '';
  renderXP();
}

function closeQuiz() {
  document.getElementById('quiz-modal').classList.remove('open');
}

// URL param check (ogrenme.html?yol=1)
const urlParams = new URLSearchParams(window.location.search);
const yolParam = urlParams.get('yol');

renderXP();
if (yolParam) {
  showPath(parseInt(yolParam));
} else {
  showHub();
}
