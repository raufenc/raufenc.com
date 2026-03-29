// === 5. Sinif LMS — Ana Uygulama ===
// SPA Router + Tum Sayfa Render'lari + YouTube IFrame API + Checkpoint Motoru

const app = document.getElementById('app');
let _ytPlayer = null;
let _checkpointTimer = null;
let _firedCheckpoints = new Set();

// ========== ROUTER ==========
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

function navigate(hash) { window.location.hash = hash; }

function getRoute() {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  const parts = hash.split('/');
  return { path: parts[0] || '', params: parts.slice(1) };
}

function router() {
  cleanup();
  const { path, params } = getRoute();
  const handler = routes[path];
  if (handler) handler(params);
  else renderLanding();
  window.scrollTo(0, 0);
}

function cleanup() {
  if (_checkpointTimer) { clearInterval(_checkpointTimer); _checkpointTimer = null; }
  _ytPlayer = null;
  _firedCheckpoints = new Set();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// ========== HELPERS ==========
function requireLogin() {
  if (!Store.isLoggedIn()) { navigate('#/giris'); return true; }
  Store.recordActivity();
  return false;
}

function updateNavXP() {
  const el = document.getElementById('navXP');
  if (el) el.textContent = `${Store.getXP()} XP`;
  const el2 = document.getElementById('navStreak');
  if (el2) el2.textContent = Store.getStreak();
}

function topNavHTML(showBack = false, title = '') {
  const loggedIn = Store.isLoggedIn();
  return `
    <nav class="top-nav">
      <div class="nav-left">
        ${showBack ? '<button class="btn-back" onclick="history.back()">←</button>' : ''}
        <a href="#/" class="nav-logo">🎓 5. Sınıf</a>
        ${title ? `<span class="nav-title">${title}</span>` : ''}
      </div>
      <div class="nav-right">
        ${loggedIn ? `
          <span class="nav-xp">⭐ <span id="navXP">${Store.getXP()} XP</span></span>
          <span class="nav-streak">🔥 <span id="navStreak">${Store.getStreak()}</span></span>
          <button class="btn-icon" onclick="navigate('#/anasayfa')">🏠</button>
        ` : ''}
      </div>
    </nav>`;
}

function getGreetingEmoji() {
  const h = new Date().getHours();
  if (h < 12) return '🌅';
  if (h < 17) return '☀️';
  return '🌙';
}

// ========== LANDING ==========
function renderLanding() {
  app.innerHTML = `
    ${topNavHTML()}
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
          <a href="#/ders/${d.slug}" class="ders-card-landing" style="--ders-color: ${d.color}; --ders-bg: ${d.colorLight}" onclick="event.preventDefault(); ${Store.isLoggedIn() ? `navigate('#/ders/${d.slug}')` : `navigate('#/giris')`}">
            <div class="ders-card-icon">${d.icon}</div>
            <h3>${d.name}</h3>
            <p>${d.uniteler.length} ünite</p>
          </a>
        `).join('')}
      </div>
    </section>
    <section class="landing-features">
      <div class="feature-grid">
        <div class="feature-card"><div class="feature-icon">🎯</div><h3>Kişiselleştirilmiş</h3><p>Hızına ve seviyene göre uyarlanan dersler</p></div>
        <div class="feature-card"><div class="feature-icon">🏆</div><h3>Oyunlaştırılmış</h3><p>XP kazan, rozet topla, serini koru</p></div>
        <div class="feature-card"><div class="feature-icon">📺</div><h3>Video Tabanlı</h3><p>En iyi eğitimcilerin kısa konu anlatımları</p></div>
        <div class="feature-card"><div class="feature-icon">👨‍👩‍👧</div><h3>Veli Dostu</h3><p>İlerleme takibi ve destek önerileri</p></div>
      </div>
    </section>
    <section class="landing-trust">
      <p>🔒 Güvenli ortam &nbsp;|&nbsp; 👁️ Reklamsız &nbsp;|&nbsp; 📱 Her cihazda çalışır</p>
    </section>
    <footer class="landing-footer"><p>5. Sınıf Evde Öğrenme Platformu &copy; 2026</p></footer>
  `;
}

// ========== GİRİŞ ==========
function renderGiris() {
  if (Store.isLoggedIn()) { navigate('#/anasayfa'); return; }
  app.innerHTML = `
    ${topNavHTML(true, 'Giriş')}
    <div class="page-center">
      <div class="card card-form">
        <div class="form-mascot">🦉</div>
        <h2>Hoş Geldin!</h2>
        <p>Hadi seni tanıyalım</p>
        <form id="girisForm">
          <div class="form-group"><label>Öğrenci Adı</label><input type="text" id="ogrenciAdi" placeholder="Adını yaz..." required maxlength="30"></div>
          <div class="form-group"><label>Veli Adı (isteğe bağlı)</label><input type="text" id="veliAdi" placeholder="Anne/Baba adı" maxlength="30"></div>
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

// ========== MOD SEÇİMİ ==========
function renderModSec() {
  if (requireLogin()) return;
  app.innerHTML = `
    ${topNavHTML(true, 'Mod Seçimi')}
    <div class="page-center">
      <h2 class="section-title">Bugün nasıl çalışmak istersin?</h2>
      <div class="mod-grid">
        ${MODLAR.map(m => `
          <button class="mod-card ${Store.getMode() === m.id ? 'mod-active' : ''}" style="--mod-color: ${m.color}" onclick="Store.setMode('${m.id}'); navigate('#/anasayfa')">
            <span class="mod-icon">${m.icon}</span><h3>${m.name}</h3><p>${m.desc}</p>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// ========== ANASAYFA ==========
function renderAnasayfa() {
  if (requireLogin()) return;
  const profile = Store.getProfile();
  const mode = MODLAR.find(m => m.id === Store.getMode()) || MODLAR[1];
  const reviews = Store.getReviewQueue();

  app.innerHTML = `
    ${topNavHTML()}
    <div class="page-container">
      <div class="welcome-bar">
        <div>
          <h2>Merhaba ${profile.name}! ${getGreetingEmoji()}</h2>
          <p class="welcome-sub">Bugünkü modun: <strong>${mode.icon} ${mode.name}</strong>
            <button class="btn-link" onclick="navigate('#/mod-sec')">değiştir</button>
          </p>
        </div>
        <div class="stats-bar">
          <div class="stat-item"><span class="stat-val">⭐ ${Store.getXP()}</span><span class="stat-label">XP</span></div>
          <div class="stat-item"><span class="stat-val">🔥 ${Store.getStreak()}</span><span class="stat-label">Gün Serisi</span></div>
          <div class="stat-item"><span class="stat-val">🎖️ ${Store.getBadges().length}</span><span class="stat-label">Rozet</span></div>
        </div>
      </div>
      ${reviews.length > 0 ? `
        <div class="quest-card"><div class="quest-badge">📋 Bugünkü Görev</div>
          <h3>${reviews.length} tekrar kartın bekliyor</h3>
          <button class="btn btn-primary" onclick="navigate('#/tekrar')">Tekrarlara Git →</button></div>
      ` : `
        <div class="quest-card"><div class="quest-badge">🎯 Bugünkü Görev</div>
          <h3>Bir ders seç ve öğrenmeye başla!</h3>
          <button class="btn btn-primary" onclick="navigate('#/dersler')">Derslere Git →</button></div>
      `}
      <h3 class="section-title">Derslerin</h3>
      <div class="ders-strip">
        ${DERSLER.map(d => {
          const prog = Store.getDersProgress(d.slug);
          const completed = Object.values(prog).filter(p => p.completed).length;
          const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
          return `<a href="#/ders/${d.slug}" class="ders-card" style="--ders-color: ${d.color}; --ders-bg: ${d.colorLight}">
            <div class="ders-card-top"><span class="ders-icon">${d.icon}</span><span class="ders-pct">${pct}%</span></div>
            <h4>${d.name}</h4>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div>
            <span class="ders-meta">${completed}/${d.uniteler.length} ünite</span>
          </a>`;
        }).join('')}
      </div>
      <div class="bottom-actions">
        <a href="#/basarilar" class="btn btn-outline">🎖️ Rozetlerim</a>
        <a href="#/tekrar" class="btn btn-outline">🔄 Tekrar Merkezi</a>
        <a href="#/veli" class="btn btn-outline">👨‍👩‍👧 Veli Paneli</a>
        <button class="btn btn-outline btn-danger" onclick="if(confirm('Çıkış yapılsın mı?')){Store.logout();navigate('#/')}">🚪 Çıkış</button>
      </div>
    </div>
  `;
}

// ========== DERSLER ==========
function renderDersler() {
  if (requireLogin()) return;
  app.innerHTML = `
    ${topNavHTML(true, 'Ders Merkezi')}
    <div class="page-container">
      <h2 class="section-title">Derslerini Seç</h2>
      <div class="ders-full-grid">
        ${DERSLER.map(d => {
          const prog = Store.getDersProgress(d.slug);
          const completed = Object.values(prog).filter(p => p.completed).length;
          const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
          return `<a href="#/ders/${d.slug}" class="ders-card-full" style="--ders-color:${d.color};--ders-bg:${d.colorLight}">
            <div class="ders-card-full-icon">${d.icon}</div>
            <div class="ders-card-full-info"><h3>${d.name}</h3><p>${d.uniteler.length} ünite &middot; ${d.playlists.length} kaynak</p>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div></div>
            <span class="ders-card-full-arrow">→</span></a>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ========== DERS LANDING ==========
function renderDersLanding(params) {
  if (requireLogin()) return;
  const ders = getDers(params[0]);
  if (!ders) { navigate('#/dersler'); return; }
  app.innerHTML = `
    ${topNavHTML(true, ders.name)}
    <div class="page-container">
      <div class="ders-header" style="background:${ders.colorLight};border-left:4px solid ${ders.color}">
        <span class="ders-header-icon">${ders.icon}</span>
        <div><h2>${ders.name}</h2><p>${ders.uniteler.length} ünite &middot; Kaynak: ${ders.playlists.map(p=>p.kanal).join(', ')}</p></div>
      </div>
      <div class="unite-list">
        ${ders.uniteler.map((u, i) => {
          const prog = Store.getLessonProgress(ders.slug, u.slug);
          return `<a href="#/unite/${ders.slug}/${u.slug}" class="unite-card ${prog.completed ? 'unite-done' : ''}">
            <div class="unite-num" style="background:${ders.color}">${i+1}</div>
            <div class="unite-info"><h4>${u.name}</h4><p>${u.hedef}</p></div>
            <div class="unite-status">${prog.completed ? '<span class="badge-done">✓</span>' : prog.attempts > 0 ? '<span class="badge-progress">⏳</span>' : ''}</div>
          </a>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ========== ÜNİTE ==========
function renderUnite(params) {
  if (requireLogin()) return;
  const [dersSlug, uniteSlug] = params;
  const ders = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  if (!ders || !unite) { navigate('#/dersler'); return; }
  const checkpoints = unite.checkpoints || [];
  app.innerHTML = `
    ${topNavHTML(true, unite.name)}
    <div class="page-container">
      <div class="unite-header" style="background:${ders.colorLight};border-left:4px solid ${ders.color}">
        <h2>${ders.icon} ${unite.name}</h2><p>${unite.hedef}</p>
      </div>
      <div class="gorev-list">
        <div class="gorev-card"><span class="gorev-icon">📺</span><div class="gorev-info"><h4>Video Ders</h4><p>${ders.playlists[0].kanal} &middot; ${ders.playlists[0].kullanim}</p></div><span class="gorev-arrow">▶</span></div>
        ${checkpoints.length > 0 ? `<div class="gorev-card"><span class="gorev-icon">❓</span><div class="gorev-info"><h4>Checkpoint Soruları</h4><p>${checkpoints.length} soru &middot; Video sırasında otomatik açılır</p></div><span class="gorev-arrow">⏱️</span></div>` : ''}
      </div>
      <button class="btn btn-primary btn-lg btn-full" onclick="navigate('#/oyrenme/${dersSlug}/${uniteSlug}')">Derse Başla 🚀</button>
    </div>
  `;
}

// ========== ÖĞRENME PLAYER + YOUTUBE API + CHECKPOINT ==========
function renderOyrenme(params) {
  if (requireLogin()) return;
  const [dersSlug, uniteSlug] = params;
  const ders = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  if (!ders || !unite) { navigate('#/dersler'); return; }

  const playlist = ders.playlists[0];
  const checkpoints = unite.checkpoints || [];
  const embedUrl = getEmbedUrl(playlist.id);

  app.innerHTML = `
    ${topNavHTML(true, unite.name)}
    <div class="player-page">
      <div class="player-layout">
        <div class="player-video">
          <div class="video-wrapper">
            <div id="ytPlayerContainer"></div>
          </div>
          <div class="player-controls">
            <span class="source-badge">📺 ${playlist.kanal}</span>
            <span class="player-info">${unite.name}</span>
          </div>
        </div>
        <div class="player-sidebar">
          <div class="hedef-card" style="border-color:${ders.color}">
            <h4>🎯 Öğrenme Hedefi</h4><p>${unite.hedef}</p>
          </div>
          <div class="checkpoint-info">
            <p>📝 <strong>${checkpoints.length}</strong> checkpoint sorusu</p>
            <p class="checkpoint-sub">Video oynarken otomatik açılır</p>
            <div id="checkpointStatus" class="checkpoint-status">
              ${checkpoints.map((c, i) => `<div class="cp-dot" id="cp-${i}" title="${c.saniye}. saniyede">○</div>`).join('')}
            </div>
          </div>
          <div id="quizScore" class="quiz-score hidden">
            <span id="quizScoreText"></span>
          </div>
          <button class="btn btn-primary btn-full" id="btnComplete" disabled onclick="navigate('#/ders-sonu/${dersSlug}/${uniteSlug}')">
            Dersi Tamamla →
          </button>
          <p class="complete-hint" id="completeHint">Soruları yanıtladıktan sonra aktif olur</p>
        </div>
      </div>
    </div>
    <div id="quizOverlay" class="quiz-overlay hidden">
      <div class="quiz-modal">
        <div class="quiz-header"><h3>Bir bakalım, anladın mı? 🤔</h3><span id="quizProgress"></span></div>
        <div id="quizContent"></div>
      </div>
    </div>
  `;

  // Quiz state
  window._quizState = {
    dersSlug, uniteSlug, checkpoints,
    currentCheckpoint: 0, score: 0, totalAnswered: 0,
    quizActive: false
  };

  // YouTube IFrame API
  initYouTubePlayer(playlist.id);
}

function initYouTubePlayer(playlistId) {
  // Load YT API if not loaded
  if (!window.YT || !window.YT.Player) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => createPlayer(playlistId);
  } else {
    createPlayer(playlistId);
  }
}

function createPlayer(playlistId) {
  const container = document.getElementById('ytPlayerContainer');
  if (!container) return;

  _ytPlayer = new YT.Player('ytPlayerContainer', {
    height: '100%',
    width: '100%',
    playerVars: {
      list: playlistId,
      listType: 'playlist',
      enablejsapi: 1,
      rel: 0,
      modestbranding: 1,
      origin: window.location.origin,
      host: 'https://www.youtube-nocookie.com'
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log('YT Player ready');
  startCheckpointMonitor();
}

function onPlayerStateChange(event) {
  // YT.PlayerState.PLAYING = 1, PAUSED = 2
  if (event.data === 1) {
    startCheckpointMonitor();
  } else {
    stopCheckpointMonitor();
  }
}

function startCheckpointMonitor() {
  if (_checkpointTimer) return;
  _checkpointTimer = setInterval(checkForCheckpoint, 500);
}

function stopCheckpointMonitor() {
  if (_checkpointTimer) { clearInterval(_checkpointTimer); _checkpointTimer = null; }
}

function checkForCheckpoint() {
  if (!_ytPlayer || !_ytPlayer.getCurrentTime) return;
  const state = window._quizState;
  if (!state || state.quizActive) return;

  const currentTime = Math.floor(_ytPlayer.getCurrentTime());

  for (let i = 0; i < state.checkpoints.length; i++) {
    const cp = state.checkpoints[i];
    if (!_firedCheckpoints.has(i) && currentTime >= cp.saniye && currentTime <= cp.saniye + 3) {
      _firedCheckpoints.add(i);
      state.currentCheckpoint = i;
      triggerCheckpoint(i);
      break;
    }
  }
}

function triggerCheckpoint(idx) {
  const state = window._quizState;
  state.quizActive = true;

  // Pause video
  if (_ytPlayer && _ytPlayer.pauseVideo) _ytPlayer.pauseVideo();

  const cp = state.checkpoints[idx];
  document.getElementById('quizOverlay').classList.remove('hidden');
  document.getElementById('quizProgress').textContent = `Soru ${idx + 1} / ${state.checkpoints.length}`;
  document.getElementById('quizContent').innerHTML = `
    <p class="quiz-question">${cp.soru}</p>
    <div class="quiz-options">
      ${cp.secenekler.map((sec, i) => `<button class="quiz-option" onclick="handleAnswer(${idx}, ${i})">${sec}</button>`).join('')}
    </div>
    <button class="btn-link quiz-hint-btn" onclick="document.getElementById('hintBox').classList.remove('hidden')">💡 İpucu</button>
    <div id="hintBox" class="hint-box hidden">💡 ${cp.ipucu}</div>
  `;
}

window.handleAnswer = function(cpIdx, ansIdx) {
  const state = window._quizState;
  const cp = state.checkpoints[cpIdx];
  const correct = ansIdx === cp.dogru;

  if (correct) {
    state.score++;
    Store.addXP(10);
    updateNavXP();
  }
  state.totalAnswered++;

  // Highlight answers
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.disabled = true;
    opt.onclick = null;
    if (i === cp.dogru) opt.classList.add('quiz-correct');
    if (i === ansIdx && !correct) opt.classList.add('quiz-wrong');
  });

  // Update checkpoint dot
  const dot = document.getElementById(`cp-${cpIdx}`);
  if (dot) { dot.textContent = correct ? '●' : '✗'; dot.classList.add(correct ? 'cp-correct' : 'cp-wrong'); }

  // Show feedback
  const feedbackHTML = `
    <div class="quiz-feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}">
      ${correct ? '🎉 Harika, doğru!' : '😊 Bir daha bakalım! Doğru cevap: <strong>' + cp.secenekler[cp.dogru] + '</strong>'}
    </div>
    <button class="btn btn-primary" onclick="closeCheckpoint()">Devam Et ▶</button>
  `;
  document.getElementById('quizContent').innerHTML += feedbackHTML;

  // Update score display
  const scoreEl = document.getElementById('quizScore');
  const scoreText = document.getElementById('quizScoreText');
  if (scoreEl && scoreText) {
    scoreEl.classList.remove('hidden');
    scoreText.textContent = `${state.score}/${state.totalAnswered} doğru`;
  }

  // Enable complete button if all checkpoints answered
  if (state.totalAnswered >= state.checkpoints.length) {
    const btn = document.getElementById('btnComplete');
    const hint = document.getElementById('completeHint');
    if (btn) { btn.disabled = false; btn.classList.add('btn-ready'); }
    if (hint) hint.textContent = '✓ Tüm sorular yanıtlandı!';

    // Save progress
    Store.setLessonProgress(state.dersSlug, state.uniteSlug, {
      score: state.score, attempts: (Store.getLessonProgress(state.dersSlug, state.uniteSlug).attempts || 0) + 1
    });
  }
};

window.closeCheckpoint = function() {
  const state = window._quizState;
  state.quizActive = false;
  document.getElementById('quizOverlay').classList.add('hidden');
  // Resume video
  if (_ytPlayer && _ytPlayer.playVideo) _ytPlayer.playVideo();
};

// ========== DERS SONU ==========
function renderDersSonu(params) {
  if (requireLogin()) return;
  const [dersSlug, uniteSlug] = params;
  const ders = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  if (!ders || !unite) { navigate('#/dersler'); return; }

  const prog = Store.getLessonProgress(dersSlug, uniteSlug);
  const checkpoints = unite.checkpoints || [];
  const total = checkpoints.length || 1;
  const score = prog.score || 0;
  const stars = score === total ? 3 : score >= total * 0.6 ? 2 : 1;

  if (!prog.completed) {
    Store.setLessonProgress(dersSlug, uniteSlug, { completed: true });
    Store.addXP(50);
    // Schedule review
    const dueDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    Store.addReview({ dersSlug, uniteSlug, dersName: ders.name, uniteName: unite.name, dueDate, intervalIdx: 0 });
  }

  app.innerHTML = `
    ${topNavHTML(true, 'Ders Tamamlandı')}
    <div class="page-center">
      <div class="ders-sonu-card">
        <div class="confetti-container" id="confetti"></div>
        <div class="sonu-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <h2>Tebrikler! 🎉</h2>
        <p>${unite.name} dersini tamamladın!</p>
        <div class="sonu-stats">
          <div class="sonu-stat"><span class="sonu-val">${score}/${total}</span><span class="sonu-label">Doğru</span></div>
          <div class="sonu-stat"><span class="sonu-val">+${50 + score * 10}</span><span class="sonu-label">XP</span></div>
          <div class="sonu-stat"><span class="sonu-val">${stars}</span><span class="sonu-label">Yıldız</span></div>
        </div>
        <div class="sonu-actions">
          <button class="btn btn-primary btn-lg" onclick="navigate('#/ders/${dersSlug}')">Sonraki Ünite →</button>
          <button class="btn btn-outline" onclick="navigate('#/anasayfa')">Ana Sayfaya Dön</button>
        </div>
      </div>
    </div>
  `;
  setTimeout(createConfetti, 200);
}

function createConfetti() {
  const container = document.getElementById('confetti');
  if (!container) return;
  const colors = ['#FF6B35', '#4A90D9', '#43A047', '#FF9800', '#7B1FA2', '#E53935', '#FFD700', '#00BCD4'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = Math.random() * 1.5 + 's';
    p.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    p.style.width = (Math.random() * 8 + 6) + 'px';
    p.style.height = (Math.random() * 8 + 6) + 'px';
    container.appendChild(p);
  }
}

// ========== TEKRAR ==========
function renderTekrar() {
  if (requireLogin()) return;
  const reviews = Store.getReviewQueue();
  app.innerHTML = `
    ${topNavHTML(true, 'Tekrar Merkezi')}
    <div class="page-container">
      <div class="tekrar-header"><h2>🔄 Aralıklı Tekrar</h2><p>Öğrendiklerini pekiştir! (1-3-7-21 gün aralıklarla)</p></div>
      ${reviews.length > 0 ? `<div class="tekrar-list">
        ${reviews.map(r => `<div class="tekrar-card"><div class="tekrar-info"><h4>${r.dersName} - ${r.uniteName}</h4><p>Tekrar zamanı geldi!</p></div>
          <button class="btn btn-primary" onclick="navigate('#/oyrenme/${r.dersSlug}/${r.uniteSlug}')">Tekrarla →</button></div>`).join('')}
      </div>` : `<div class="empty-state"><div class="empty-icon">🎉</div><h3>Tekrarların tamam!</h3>
        <p>Şu an bekleyen tekrar kartın yok. Yeni dersler tamamladıkça tekrar kartları oluşacak.</p>
        <button class="btn btn-primary" onclick="navigate('#/dersler')">Derse Git →</button></div>`}
    </div>
  `;
}

// ========== BAŞARILAR ==========
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
  app.innerHTML = `
    ${topNavHTML(true, 'Başarılarım')}
    <div class="page-container">
      <h2 class="section-title">🎖️ Rozet Koleksiyonum</h2>
      <div class="badge-grid">
        ${allBadges.map(b => {
          const earned = badges.find(e => e.id === b.id);
          return `<div class="badge-card ${earned ? 'badge-earned' : 'badge-locked'}">
            <div class="badge-icon">${b.icon}</div><h4>${b.name}</h4><p>${b.desc}</p>
            ${earned ? '<span class="badge-date">Kazanıldı!</span>' : '<span class="badge-lock">🔒</span>'}
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ========== VELİ PANELİ ==========
function renderVeliPanel() {
  const profile = Store.getProfile();
  const xp = Store.getXP();
  const streak = Store.getStreak();
  const badges = Store.getBadges();
  const totalMins = Store.getTotalMinutes() + Store.getSessionMinutes();

  app.innerHTML = `
    ${topNavHTML(true, 'Veli Paneli')}
    <div class="page-container">
      <div class="veli-header"><h2>👨‍👩‍👧 Veli Paneli</h2>
        ${profile ? `<p>${profile.name} için ilerleme raporu</p>` : '<p>Henüz öğrenci girişi yapılmadı</p>'}</div>
      ${profile ? `
        <div class="veli-stats-grid">
          <div class="veli-stat-card"><span class="veli-stat-icon">⭐</span><span class="veli-stat-val">${xp}</span><span class="veli-stat-label">Toplam XP</span></div>
          <div class="veli-stat-card"><span class="veli-stat-icon">🔥</span><span class="veli-stat-val">${streak}</span><span class="veli-stat-label">Gün Serisi</span></div>
          <div class="veli-stat-card"><span class="veli-stat-icon">🎖️</span><span class="veli-stat-val">${badges.length}</span><span class="veli-stat-label">Rozet</span></div>
          <div class="veli-stat-card"><span class="veli-stat-icon">⏱️</span><span class="veli-stat-val">${totalMins}</span><span class="veli-stat-label">Dakika</span></div>
        </div>
        <h3 class="section-title">Ders İlerlemesi</h3>
        <div class="veli-ders-list">
          ${DERSLER.map(d => {
            const prog = Store.getDersProgress(d.slug);
            const completed = Object.values(prog).filter(p => p.completed).length;
            const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
            return `<div class="veli-ders-card"><div class="veli-ders-top"><span>${d.icon} ${d.name}</span><span>${pct}%</span></div>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div>
              <p>${completed}/${d.uniteler.length} ünite tamamlandı</p></div>`;
          }).join('')}
        </div>
        <div class="veli-insight"><h4>💡 Öneriler</h4><ul>
          ${xp < 50 ? '<li>Henüz başlangıç aşamasında. Günde 1-2 kısa ders önerilir.</li>' : ''}
          ${streak < 3 ? '<li>Düzenli çalışma alışkanlığı için her gün en az 1 ders tamamlamayı hedefleyin.</li>' : ''}
          ${streak >= 7 ? '<li>Harika bir seri! Çocuğunuz düzenli çalışıyor, tebrikler.</li>' : ''}
          <li>Çocuğunuzla birlikte ders sonrası kısa sohbetler motivasyonu artırır.</li>
        </ul></div>
      ` : `<div class="empty-state"><div class="empty-icon">👋</div><h3>Henüz veri yok</h3>
        <p>Öğrenci giriş yaptığında burada ilerleme bilgileri görünecek.</p>
        <button class="btn btn-primary" onclick="navigate('#/giris')">Giriş Yap</button></div>`}
    </div>
  `;
}
