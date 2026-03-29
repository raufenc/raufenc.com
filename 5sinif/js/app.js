// SPA Router + Page Renderers
const app = document.getElementById('app');

// --- ROUTER ---
const routes = {
  '': renderLanding,
  'giris': renderGiris,
  'anasayfa': renderAnasayfa,
  'mod-sec': renderModSec,
  'dersler': renderDersler,
  'ders': renderDersLanding,
  'unite': renderUnite,
  'oyrenme': renderOyrenme,
  'ders-sonu': renderDersSonu,
  'tekrar': renderTekrar,
  'basarilar': renderBasarilar,
  'veli': renderVeliPanel,
};

function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  const parts = hash.split('/');
  return { path: parts[0] || '', params: parts.slice(1) };
}

function router() {
  const { path, params } = getRoute();
  const handler = routes[path];
  if (handler) {
    handler(params);
  } else {
    renderLanding();
  }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// --- HELPERS ---
function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'className') e.className = v;
    else if (k === 'onclick') e.onclick = v;
    else if (k === 'innerHTML') e.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
    else e.setAttribute(k, v);
  }
  for (const c of children) {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else if (c) e.appendChild(c);
  }
  return e;
}

function render(...elements) {
  app.innerHTML = '';
  for (const e of elements) {
    if (typeof e === 'string') app.innerHTML += e;
    else if (e) app.appendChild(e);
  }
}

function topNav(showBack = false, title = '') {
  const nav = el('nav', { className: 'top-nav' });
  const left = el('div', { className: 'nav-left' });
  if (showBack) {
    const btn = el('button', { className: 'btn-back', onclick: () => history.back() }, '←');
    left.appendChild(btn);
  }
  const logo = el('a', { href: '#/', className: 'nav-logo' }, '🎓 5. Sınıf');
  left.appendChild(logo);
  if (title) left.appendChild(el('span', { className: 'nav-title' }, title));
  nav.appendChild(left);

  const right = el('div', { className: 'nav-right' });
  if (Store.isLoggedIn()) {
    const profile = Store.getProfile();
    const xp = el('span', { className: 'nav-xp' }, `⭐ ${Store.getXP()} XP`);
    const streak = el('span', { className: 'nav-streak' }, `🔥 ${Store.getStreak()}`);
    right.appendChild(xp);
    right.appendChild(streak);
    right.appendChild(el('button', { className: 'btn-icon', onclick: () => navigate('#/anasayfa') }, '🏠'));
  }
  nav.appendChild(right);
  return nav;
}

function requireLogin() {
  if (!Store.isLoggedIn()) {
    navigate('#/giris');
    return true;
  }
  Store.recordActivity();
  return false;
}

// --- LANDING ---
function renderLanding() {
  render();
  app.innerHTML = `
    ${topNav().outerHTML}
    <section class="hero">
      <div class="hero-content">
        <div class="hero-mascot">🦉</div>
        <h1>5. Sınıf Evde Öğrenme</h1>
        <p class="hero-sub">Video dersler, eğlenceli quizler ve kişiselleştirilmiş öğrenme yolculuğun burada başlıyor!</p>
        <div class="hero-buttons">
          <button class="btn btn-primary btn-lg" onclick="navigate('#/giris')">Derse Başla 🚀</button>
          <button class="btn btn-outline btn-lg" onclick="navigate('#/veli')">Veli Olarak İncele</button>
        </div>
      </div>
    </section>
    <section class="landing-dersler">
      <h2>Derslerimiz</h2>
      <div class="ders-grid">
        ${DERSLER.map(d => `
          <div class="ders-card-landing" style="--ders-color: ${d.color}; --ders-bg: ${d.colorLight}">
            <div class="ders-card-icon">${d.icon}</div>
            <h3>${d.name}</h3>
            <p>${d.uniteler.length} ünite</p>
          </div>
        `).join('')}
      </div>
    </section>
    <section class="landing-features">
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>Kişiselleştirilmiş</h3>
          <p>Hızına ve seviyene göre uyarlanan dersler</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <h3>Oyunlaştırılmış</h3>
          <p>XP kazan, rozet topla, serini koru</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📺</div>
          <h3>Video Tabanlı</h3>
          <p>En iyi eğitimcilerin kısa konu anlatımları</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">👨‍👩‍👧</div>
          <h3>Veli Dostu</h3>
          <p>İlerleme takibi ve destek önerileri</p>
        </div>
      </div>
    </section>
    <section class="landing-trust">
      <p>🔒 Güvenli ortam &nbsp;|&nbsp; 👁️ Reklamsız &nbsp;|&nbsp; 📱 Her cihazda çalışır</p>
    </section>
    <footer class="landing-footer">
      <p>5. Sınıf Evde Öğrenme Platformu &copy; 2026</p>
    </footer>
  `;
}

// --- GİRİŞ / KAYIT ---
function renderGiris() {
  render();
  if (Store.isLoggedIn()) { navigate('#/anasayfa'); return; }
  app.innerHTML = `
    ${topNav(true, 'Giriş').outerHTML}
    <div class="page-center">
      <div class="card card-form">
        <div class="form-mascot">🦉</div>
        <h2>Hoş Geldin!</h2>
        <p>Hadi seni tanıyalım</p>
        <form id="girisForm">
          <div class="form-group">
            <label>Öğrenci Adı</label>
            <input type="text" id="ogrenciAdi" placeholder="Adını yaz..." required maxlength="30">
          </div>
          <div class="form-group">
            <label>Veli Adı (isteğe bağlı)</label>
            <input type="text" id="veliAdi" placeholder="Anne/Baba adı" maxlength="30">
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-full">Başlayalım! 🎉</button>
        </form>
      </div>
    </div>
  `;
  document.getElementById('girisForm').onsubmit = (e) => {
    e.preventDefault();
    const ad = document.getElementById('ogrenciAdi').value.trim();
    if (!ad) return;
    Store.setProfile({ name: ad, parentName: document.getElementById('veliAdi').value.trim() });
    Store.startSession();
    navigate('#/mod-sec');
  };
}

// --- MOD SECİMİ ---
function renderModSec() {
  if (requireLogin()) return;
  render();
  app.innerHTML = `
    ${topNav(true, 'Mod Seçimi').outerHTML}
    <div class="page-center">
      <h2 class="section-title">Bugün nasıl çalışmak istersin?</h2>
      <div class="mod-grid">
        ${MODLAR.map(m => `
          <button class="mod-card ${Store.getMode() === m.id ? 'mod-active' : ''}"
                  style="--mod-color: ${m.color}"
                  onclick="selectMode('${m.id}')">
            <span class="mod-icon">${m.icon}</span>
            <h3>${m.name}</h3>
            <p>${m.desc}</p>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
window.selectMode = function(mode) {
  Store.setMode(mode);
  navigate('#/anasayfa');
};

// --- ÖĞRENCİ ANASAYFA ---
function renderAnasayfa() {
  if (requireLogin()) return;
  const profile = Store.getProfile();
  const xp = Store.getXP();
  const streak = Store.getStreak();
  const reviews = Store.getReviewQueue();
  const mode = MODLAR.find(m => m.id === Store.getMode()) || MODLAR[1];

  render();
  app.innerHTML = `
    ${topNav(false).outerHTML}
    <div class="page-container">
      <div class="welcome-bar">
        <div>
          <h2>Merhaba ${profile.name}! ${getGreetingEmoji()}</h2>
          <p class="welcome-sub">Bugünkü modun: <strong>${mode.icon} ${mode.name}</strong>
            <button class="btn-link" onclick="navigate('#/mod-sec')">değiştir</button>
          </p>
        </div>
        <div class="stats-bar">
          <div class="stat-item"><span class="stat-val">⭐ ${xp}</span><span class="stat-label">XP</span></div>
          <div class="stat-item"><span class="stat-val">🔥 ${streak}</span><span class="stat-label">Gün Serisi</span></div>
          <div class="stat-item"><span class="stat-val">🎖️ ${Store.getBadges().length}</span><span class="stat-label">Rozet</span></div>
        </div>
      </div>

      ${reviews.length > 0 ? `
        <div class="quest-card">
          <div class="quest-badge">📋 Bugünkü Görev</div>
          <h3>${reviews.length} tekrar kartın bekliyor</h3>
          <button class="btn btn-primary" onclick="navigate('#/tekrar')">Tekrarlara Git →</button>
        </div>
      ` : `
        <div class="quest-card">
          <div class="quest-badge">🎯 Bugünkü Görev</div>
          <h3>Bir ders seç ve öğrenmeye başla!</h3>
          <button class="btn btn-primary" onclick="navigate('#/dersler')">Derslere Git →</button>
        </div>
      `}

      <h3 class="section-title">Derslerin</h3>
      <div class="ders-strip">
        ${DERSLER.map(d => {
          const prog = Store.getDersProgress(d.slug);
          const completed = Object.values(prog).filter(p => p.completed).length;
          const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
          return `
            <a href="#/ders/${d.slug}" class="ders-card" style="--ders-color: ${d.color}; --ders-bg: ${d.colorLight}">
              <div class="ders-card-top">
                <span class="ders-icon">${d.icon}</span>
                <span class="ders-pct">${pct}%</span>
              </div>
              <h4>${d.name}</h4>
              <div class="progress-bar"><div class="progress-fill" style="width: ${pct}%; background: ${d.color}"></div></div>
              <span class="ders-meta">${completed}/${d.uniteler.length} ünite</span>
            </a>
          `;
        }).join('')}
      </div>

      <div class="bottom-actions">
        <a href="#/basarilar" class="btn btn-outline">🎖️ Rozetlerim</a>
        <a href="#/tekrar" class="btn btn-outline">🔄 Tekrar Merkezi</a>
        <a href="#/veli" class="btn btn-outline">👨‍👩‍👧 Veli Paneli</a>
      </div>
    </div>
  `;
}

function getGreetingEmoji() {
  const h = new Date().getHours();
  if (h < 12) return '🌅';
  if (h < 17) return '☀️';
  return '🌙';
}

// --- DERSLER ---
function renderDersler() {
  if (requireLogin()) return;
  render();
  app.innerHTML = `
    ${topNav(true, 'Ders Merkezi').outerHTML}
    <div class="page-container">
      <h2 class="section-title">Derslerini Seç</h2>
      <div class="ders-full-grid">
        ${DERSLER.map(d => {
          const prog = Store.getDersProgress(d.slug);
          const completed = Object.values(prog).filter(p => p.completed).length;
          const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
          return `
            <a href="#/ders/${d.slug}" class="ders-card-full" style="--ders-color: ${d.color}; --ders-bg: ${d.colorLight}">
              <div class="ders-card-full-icon">${d.icon}</div>
              <div class="ders-card-full-info">
                <h3>${d.name}</h3>
                <p>${d.uniteler.length} ünite &middot; ${d.playlists.length} kaynak</p>
                <div class="progress-bar"><div class="progress-fill" style="width: ${pct}%; background: ${d.color}"></div></div>
              </div>
              <span class="ders-card-full-arrow">→</span>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// --- DERS LANDING ---
function renderDersLanding(params) {
  if (requireLogin()) return;
  const slug = params[0];
  const ders = getDers(slug);
  if (!ders) { navigate('#/dersler'); return; }

  render();
  app.innerHTML = `
    ${topNav(true, ders.name).outerHTML}
    <div class="page-container" style="--ders-color: ${ders.color}; --ders-bg: ${ders.colorLight}">
      <div class="ders-header" style="background: ${ders.colorLight}; border-left: 4px solid ${ders.color}">
        <span class="ders-header-icon">${ders.icon}</span>
        <div>
          <h2>${ders.name}</h2>
          <p>${ders.uniteler.length} ünite &middot; Kaynak: ${ders.playlists.map(p => p.kanal).join(', ')}</p>
        </div>
      </div>
      <div class="unite-list">
        ${ders.uniteler.map((u, i) => {
          const prog = Store.getLessonProgress(slug, u.slug);
          return `
            <a href="#/unite/${slug}/${u.slug}" class="unite-card ${prog.completed ? 'unite-done' : ''}">
              <div class="unite-num" style="background: ${ders.color}">${i + 1}</div>
              <div class="unite-info">
                <h4>${u.name}</h4>
                <p>${u.hedef}</p>
              </div>
              <div class="unite-status">
                ${prog.completed ? '<span class="badge-done">✓</span>' : prog.attempts > 0 ? '<span class="badge-progress">⏳</span>' : ''}
              </div>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// --- ÜNİTE EKRANI ---
function renderUnite(params) {
  if (requireLogin()) return;
  const [dersSlug, uniteSlug] = params;
  const ders = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  if (!ders || !unite) { navigate('#/dersler'); return; }

  const sorular = getSorular(dersSlug, uniteSlug);
  const playlist = ders.playlists[0];

  render();
  app.innerHTML = `
    ${topNav(true, unite.name).outerHTML}
    <div class="page-container">
      <div class="unite-header" style="background: ${ders.colorLight}; border-left: 4px solid ${ders.color}">
        <h2>${ders.icon} ${unite.name}</h2>
        <p>${unite.hedef}</p>
      </div>
      <div class="gorev-list">
        <div class="gorev-card" onclick="navigate('#/oyrenme/${dersSlug}/${uniteSlug}')">
          <span class="gorev-icon">📺</span>
          <div class="gorev-info">
            <h4>Video Ders</h4>
            <p>${playlist.kanal} &middot; ${playlist.kullanim}</p>
          </div>
          <span class="gorev-arrow">▶</span>
        </div>
        ${sorular.length > 0 ? `
          <div class="gorev-card" onclick="navigate('#/oyrenme/${dersSlug}/${uniteSlug}')">
            <span class="gorev-icon">❓</span>
            <div class="gorev-info">
              <h4>Checkpoint Soruları</h4>
              <p>${sorular.length} soru &middot; Video içinde açılır</p>
            </div>
            <span class="gorev-arrow">→</span>
          </div>
        ` : ''}
      </div>
      <button class="btn btn-primary btn-lg btn-full" onclick="navigate('#/oyrenme/${dersSlug}/${uniteSlug}')">
        Derse Başla 🚀
      </button>
    </div>
  `;
}

// --- ÖĞRENME PLAYER ---
function renderOyrenme(params) {
  if (requireLogin()) return;
  const [dersSlug, uniteSlug] = params;
  const ders = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  if (!ders || !unite) { navigate('#/dersler'); return; }

  const playlist = ders.playlists[0];
  const sorular = getSorular(dersSlug, uniteSlug);
  const embedUrl = getEmbedUrl(playlist.id);

  render();
  app.innerHTML = `
    ${topNav(true, unite.name).outerHTML}
    <div class="player-page">
      <div class="player-layout">
        <div class="player-video">
          <div class="video-wrapper">
            <iframe id="ytPlayer"
              src="${embedUrl}&origin=${window.location.origin}"
              title="${ders.name} - ${unite.name}"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
              frameborder="0">
            </iframe>
          </div>
          <div class="player-controls">
            <span class="source-badge">📺 ${playlist.kanal}</span>
            <span class="player-info">${unite.name}</span>
          </div>
        </div>
        <div class="player-sidebar">
          <div class="hedef-card" style="border-color: ${ders.color}">
            <h4>🎯 Öğrenme Hedefi</h4>
            <p>${unite.hedef}</p>
          </div>
          ${sorular.length > 0 ? `
            <div class="checkpoint-info">
              <p>📝 ${sorular.length} checkpoint sorusu</p>
              <button class="btn btn-primary btn-full" id="startQuizBtn" onclick="startQuiz()">
                Soruları Aç 📝
              </button>
            </div>
          ` : ''}
          <button class="btn btn-outline btn-full" onclick="navigate('#/ders-sonu/${dersSlug}/${uniteSlug}')">
            Dersi Tamamla →
          </button>
        </div>
      </div>
    </div>

    <div id="quizOverlay" class="quiz-overlay hidden">
      <div class="quiz-modal">
        <div class="quiz-header">
          <h3>Bir bakalım, anladın mı? 🤔</h3>
          <span id="quizProgress"></span>
        </div>
        <div id="quizContent"></div>
      </div>
    </div>
  `;

  // Quiz state
  window._quizState = { dersSlug, uniteSlug, sorular, current: 0, score: 0, answers: [] };
}

window.startQuiz = function() {
  const s = window._quizState;
  if (!s || s.sorular.length === 0) return;
  s.current = 0;
  s.score = 0;
  s.answers = [];
  document.getElementById('quizOverlay').classList.remove('hidden');
  showQuestion();
};

function showQuestion() {
  const s = window._quizState;
  const q = s.sorular[s.current];
  document.getElementById('quizProgress').textContent = `${s.current + 1} / ${s.sorular.length}`;
  document.getElementById('quizContent').innerHTML = `
    <p class="quiz-question">${q.soru}</p>
    <div class="quiz-options">
      ${q.secenekler.map((sec, i) => `
        <button class="quiz-option" onclick="answerQuestion(${i})">${sec}</button>
      `).join('')}
    </div>
    <button class="btn-link quiz-hint-btn" onclick="showHint()">💡 İpucu</button>
    <div id="hintBox" class="hint-box hidden"></div>
  `;
}

window.answerQuestion = function(idx) {
  const s = window._quizState;
  const q = s.sorular[s.current];
  const correct = idx === q.dogru;
  s.answers.push(correct);
  if (correct) {
    s.score++;
    Store.addXP(10);
  }

  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.disabled = true;
    if (i === q.dogru) opt.classList.add('quiz-correct');
    if (i === idx && !correct) opt.classList.add('quiz-wrong');
  });

  document.getElementById('quizContent').innerHTML += `
    <div class="quiz-feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}">
      ${correct ? '🎉 Harika, doğru!' : '😊 Bir daha bakalım! Doğru cevap: ' + q.secenekler[q.dogru]}
    </div>
    <button class="btn btn-primary" onclick="nextQuestion()">
      ${s.current < s.sorular.length - 1 ? 'Sonraki →' : 'Tamamla ✓'}
    </button>
  `;
};

window.showHint = function() {
  const s = window._quizState;
  const q = s.sorular[s.current];
  const hintBox = document.getElementById('hintBox');
  hintBox.classList.remove('hidden');
  hintBox.innerHTML = `💡 ${q.ipucu}`;
};

window.nextQuestion = function() {
  const s = window._quizState;
  s.current++;
  if (s.current < s.sorular.length) {
    showQuestion();
  } else {
    closeQuiz();
  }
};

function closeQuiz() {
  const s = window._quizState;
  document.getElementById('quizOverlay').classList.add('hidden');
  Store.setLessonProgress(s.dersSlug, s.uniteSlug, { score: s.score, attempts: (Store.getLessonProgress(s.dersSlug, s.uniteSlug).attempts || 0) + 1 });

  // Add to review queue
  const ders = getDers(s.dersSlug);
  const unite = getUnite(s.dersSlug, s.uniteSlug);
  if (s.score < s.sorular.length) {
    const dueDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    Store.addReview({ dersSlug: s.dersSlug, uniteSlug: s.uniteSlug, dersName: ders.name, uniteName: unite.name, dueDate, intervalIdx: 0 });
  }
}

// --- DERS SONU ---
function renderDersSonu(params) {
  if (requireLogin()) return;
  const [dersSlug, uniteSlug] = params;
  const ders = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  if (!ders || !unite) { navigate('#/dersler'); return; }

  const prog = Store.getLessonProgress(dersSlug, uniteSlug);
  const sorular = getSorular(dersSlug, uniteSlug);
  const score = prog.score || 0;
  const total = sorular.length || 1;
  const stars = score === total ? 3 : score >= total * 0.6 ? 2 : 1;

  // Mark completed and add XP
  if (!prog.completed) {
    Store.setLessonProgress(dersSlug, uniteSlug, { completed: true });
    Store.addXP(50);
  }

  // Add review for spaced repetition
  const dueDate = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];
  Store.addReview({ dersSlug, uniteSlug, dersName: ders.name, uniteName: unite.name, dueDate, intervalIdx: 1 });

  render();
  app.innerHTML = `
    ${topNav(true, 'Ders Tamamlandı').outerHTML}
    <div class="page-center">
      <div class="ders-sonu-card">
        <div class="confetti-container" id="confetti"></div>
        <div class="sonu-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <h2>Tebrikler! 🎉</h2>
        <p>${unite.name} dersini tamamladın!</p>
        <div class="sonu-stats">
          <div class="sonu-stat">
            <span class="sonu-val">${score}/${total}</span>
            <span class="sonu-label">Doğru</span>
          </div>
          <div class="sonu-stat">
            <span class="sonu-val">+50</span>
            <span class="sonu-label">XP</span>
          </div>
          <div class="sonu-stat">
            <span class="sonu-val">${stars}</span>
            <span class="sonu-label">Yıldız</span>
          </div>
        </div>
        <div class="sonu-actions">
          <button class="btn btn-primary btn-lg" onclick="navigate('#/ders/${dersSlug}')">Sonraki Ünite →</button>
          <button class="btn btn-outline" onclick="navigate('#/anasayfa')">Ana Sayfaya Dön</button>
        </div>
      </div>
    </div>
  `;

  // Confetti animation
  setTimeout(() => createConfetti(), 300);
}

function createConfetti() {
  const container = document.getElementById('confetti');
  if (!container) return;
  const colors = ['#FF6B35', '#4A90D9', '#43A047', '#FF9800', '#7B1FA2', '#E53935'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 2 + 's';
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(piece);
  }
}

// --- TEKRAR MERKEZİ ---
function renderTekrar() {
  if (requireLogin()) return;
  const reviews = Store.getReviewQueue();
  const allReviews = Store.get('reviews') || [];

  render();
  app.innerHTML = `
    ${topNav(true, 'Tekrar Merkezi').outerHTML}
    <div class="page-container">
      <div class="tekrar-header">
        <h2>🔄 Aralıklı Tekrar</h2>
        <p>Öğrendiklerini pekiştir! (1-3-7-21 gün aralıklarla)</p>
      </div>
      ${reviews.length > 0 ? `
        <div class="tekrar-list">
          ${reviews.map(r => `
            <div class="tekrar-card">
              <div class="tekrar-info">
                <h4>${r.dersName} - ${r.uniteName}</h4>
                <p>Tekrar zamanı geldi!</p>
              </div>
              <button class="btn btn-primary" onclick="navigate('#/oyrenme/${r.dersSlug}/${r.uniteSlug}')">Tekrarla →</button>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <h3>Tekrarların tamam!</h3>
          <p>Şu an bekleyen tekrar kartın yok. Yeni dersler tamamladıkça tekrar kartları oluşacak.</p>
          <button class="btn btn-primary" onclick="navigate('#/dersler')">Derse Git →</button>
        </div>
      `}
    </div>
  `;
}

// --- BAŞARILAR ---
function renderBasarilar() {
  if (requireLogin()) return;
  const badges = Store.getBadges();
  const allBadges = [
    { id: 'first_lesson', name: 'İlk Adım', icon: '🌟', desc: 'İlk dersini tamamla' },
    { id: 'xp_100', name: 'Yüzlük Kulüp', icon: '💯', desc: '100 XP topla' },
    { id: 'xp_500', name: 'Bilgi Şampiyonu', icon: '🏆', desc: '500 XP topla' },
    { id: 'streak_3', name: '3 Gün Serisi', icon: '🔥', desc: '3 gün üst üste çalış' },
    { id: 'streak_7', name: 'Haftalık Seri', icon: '⚡', desc: '7 gün üst üste çalış' },
    { id: 'streak_21', name: 'Süper Seri', icon: '🚀', desc: '21 gün üst üste çalış' },
  ];

  render();
  app.innerHTML = `
    ${topNav(true, 'Başarılarım').outerHTML}
    <div class="page-container">
      <h2 class="section-title">🎖️ Rozet Koleksiyonum</h2>
      <div class="badge-grid">
        ${allBadges.map(b => {
          const earned = badges.find(e => e.id === b.id);
          return `
            <div class="badge-card ${earned ? 'badge-earned' : 'badge-locked'}">
              <div class="badge-icon">${b.icon}</div>
              <h4>${b.name}</h4>
              <p>${b.desc}</p>
              ${earned ? `<span class="badge-date">Kazanıldı!</span>` : '<span class="badge-lock">🔒</span>'}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// --- VELİ PANELİ ---
function renderVeliPanel() {
  const profile = Store.getProfile();
  const xp = Store.getXP();
  const streak = Store.getStreak();
  const badges = Store.getBadges();
  const totalMins = Store.getTotalMinutes();
  const sessionMins = Store.getSessionMinutes();

  render();
  app.innerHTML = `
    ${topNav(true, 'Veli Paneli').outerHTML}
    <div class="page-container">
      <div class="veli-header">
        <h2>👨‍👩‍👧 Veli Paneli</h2>
        ${profile ? `<p>${profile.name} için ilerleme raporu</p>` : '<p>Henüz öğrenci girişi yapılmadı</p>'}
      </div>
      ${profile ? `
        <div class="veli-stats-grid">
          <div class="veli-stat-card">
            <span class="veli-stat-icon">⭐</span>
            <span class="veli-stat-val">${xp}</span>
            <span class="veli-stat-label">Toplam XP</span>
          </div>
          <div class="veli-stat-card">
            <span class="veli-stat-icon">🔥</span>
            <span class="veli-stat-val">${streak}</span>
            <span class="veli-stat-label">Gün Serisi</span>
          </div>
          <div class="veli-stat-card">
            <span class="veli-stat-icon">🎖️</span>
            <span class="veli-stat-val">${badges.length}</span>
            <span class="veli-stat-label">Rozet</span>
          </div>
          <div class="veli-stat-card">
            <span class="veli-stat-icon">⏱️</span>
            <span class="veli-stat-val">${totalMins + sessionMins}</span>
            <span class="veli-stat-label">Dakika</span>
          </div>
        </div>
        <h3 class="section-title">Ders İlerlemesi</h3>
        <div class="veli-ders-list">
          ${DERSLER.map(d => {
            const prog = Store.getDersProgress(d.slug);
            const completed = Object.values(prog).filter(p => p.completed).length;
            const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
            const zayif = d.uniteler.filter(u => {
              const p = Store.getLessonProgress(d.slug, u.slug);
              return p.attempts > 0 && p.score < (getSorular(d.slug, u.slug).length * 0.6);
            });
            return `
              <div class="veli-ders-card">
                <div class="veli-ders-top">
                  <span>${d.icon} ${d.name}</span>
                  <span>${pct}%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${pct}%; background: ${d.color}"></div></div>
                <p>${completed}/${d.uniteler.length} ünite tamamlandı</p>
                ${zayif.length > 0 ? `<p class="veli-alert">⚠️ Zorlanılan: ${zayif.map(u => u.name).join(', ')}</p>` : ''}
              </div>
            `;
          }).join('')}
        </div>
        <div class="veli-insight">
          <h4>💡 Öneriler</h4>
          <ul>
            ${xp < 50 ? '<li>Henüz başlangıç aşamasında. Günde 1-2 kısa ders önerilir.</li>' : ''}
            ${streak < 3 ? '<li>Düzenli çalışma alışkanlığı için her gün en az 1 ders tamamlamayı hedefleyin.</li>' : ''}
            ${streak >= 7 ? '<li>Harika bir seri! Çocuğunuz düzenli çalışıyor, tebrikler.</li>' : ''}
            <li>Çocuğunuzla birlikte ders sonrası kısa sohbetler motivasyonu artırır.</li>
          </ul>
        </div>
      ` : `
        <div class="empty-state">
          <div class="empty-icon">👋</div>
          <h3>Henüz veri yok</h3>
          <p>Öğrenci giriş yaptığında burada ilerleme bilgileri görünecek.</p>
          <button class="btn btn-primary" onclick="navigate('#/giris')">Giriş Yap</button>
        </div>
      `}
    </div>
  `;
}
