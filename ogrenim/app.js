/* ===== Firebase Setup ===== */
let auth, db, googleProvider;
let currentUser = null;
let userRole = null;

function initFirebase() {
  firebase.initializeApp(FIREBASE_CONFIG);
  auth = firebase.auth();
  db = firebase.firestore();
  googleProvider = new firebase.auth.GoogleAuthProvider();
}

/* ===== State ===== */
let currentPage = 'loading';
let currentLesson = null;
let lessonStep = 'intro';
let contentIndex = 0;
let quizIndex = 0;
let preTestAnswers = [];
let postTestAnswers = [];
let swiperIndex = 0;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ===== Router ===== */
function render() {
  const app = $('#app');
  switch (currentPage) {
    case 'loading':
      app.innerHTML = '<div class="loading-page"><div class="spinner"></div><div class="loading-text">Yükleniyor...</div></div>';
      break;
    case 'login':
      renderLogin(app);
      break;
    case 'dashboard':
      renderDashboard(app);
      break;
    case 'lesson':
      renderLesson(app);
      break;
    case 'admin':
      renderAdmin(app);
      break;
  }
}

/* ===== LOGIN ===== */
function renderLogin(app) {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-pattern"></div>
      <div class="login-card">
        <div class="login-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>
        <div class="login-icon">📖</div>
        <h1 class="login-title">İslami Öğrenim Platformu</h1>
        <p class="login-subtitle">Etkileşimli dersler, testler ve içeriklerle öğrenin</p>
        <div class="login-divider"></div>
        <button class="login-btn" onclick="loginWithGoogle()">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
          Google ile Giriş Yap
        </button>
        <p class="login-footer">raufenc.com/ogrenim</p>
      </div>
    </div>
  `;
}

async function loginWithGoogle() {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (e) {
    console.error('Login error:', e);
    if (e.code === 'auth/popup-blocked') {
      // Fallback to redirect
      auth.signInWithRedirect(googleProvider);
    } else if (e.code !== 'auth/popup-closed-by-user') {
      alert('Giriş hatası: ' + (e.message || e.code));
    }
  }
}

/* ===== NAV ===== */
function buildNav() {
  const adminBtn = userRole === 'admin'
    ? `<button class="nav-btn nav-btn-admin" onclick="goAdmin()">Yönetici Paneli</button>`
    : '';
  const name = currentUser?.displayName || currentUser?.email || '';
  return `
    <nav class="top-nav">
      <div class="nav-brand">
        <div class="nav-brand-icon">📖</div>
        <span>İslami Öğrenim</span>
      </div>
      <div class="nav-right">
        <span class="nav-user">${esc(name)}</span>
        ${adminBtn}
        <button class="nav-btn nav-btn-logout" onclick="doLogout()">Çıkış</button>
      </div>
    </nav>
  `;
}

/* ===== DASHBOARD ===== */
function renderDashboard(app) {
  const cards = LESSONS.map(l => `
    <div class="lesson-card" onclick="openLesson('${l.id}')">
      <div class="lesson-thumb">
        <img src="${l.thumbnail}" alt="${esc(l.title)}" referrerpolicy="no-referrer">
        <div class="lesson-thumb-overlay"></div>
        <div class="lesson-thumb-info">
          <div class="lesson-duration">${l.duration}</div>
          <div class="lesson-thumb-title">${esc(l.title)}</div>
        </div>
      </div>
      <div class="lesson-body">
        <p class="lesson-desc">${esc(l.description)}</p>
        <button class="lesson-start-btn">▶ Derse Başla</button>
      </div>
    </div>
  `).join('');

  app.innerHTML = `
    ${buildNav()}
    <div class="dashboard">
      <div class="dash-header">
        <h1 class="dash-title">Modüller ve Dersler</h1>
        <p class="dash-subtitle">Öğrenmeye başlamak için bir ders seçin.</p>
      </div>
      <div class="lesson-grid">${cards}</div>
    </div>
  `;
}

function openLesson(id) {
  currentLesson = LESSONS.find(l => l.id === id);
  if (!currentLesson) return;
  lessonStep = 'intro';
  contentIndex = 0;
  quizIndex = 0;
  preTestAnswers = [];
  postTestAnswers = [];
  currentPage = 'lesson';
  render();
}

/* ===== LESSON PLAYER ===== */
function renderLesson(app) {
  let body = '';
  switch (lessonStep) {
    case 'intro': body = renderIntro(); break;
    case 'pre-test': body = renderQuiz(currentLesson.preTest, 'Ön Test', 'Mevcut bilginizi ölçelim'); break;
    case 'content': body = renderContent(); break;
    case 'post-test': body = renderQuiz(currentLesson.postTest, 'Son Test', 'Neler öğrendiğimizi değerlendirelim'); break;
    case 'completed': body = renderCompleted(); break;
  }
  app.innerHTML = `${buildNav()}<div class="player-page">${body}</div>`;
}

function renderIntro() {
  return `
    <div class="intro-section">
      <div class="intro-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>
      <h1 class="intro-title">${esc(currentLesson.title)}</h1>
      <p class="intro-desc">${esc(currentLesson.description)}</p>
      <div class="intro-flow">
        <h3>Ders Akışı</h3>
        <ul>
          <li><span class="step-num">1</span> Ön Test (Bilgi Ölçümü)</li>
          <li><span class="step-num">2</span> Etkileşimli İçerik</li>
          <li><span class="step-num">3</span> Son Test (Değerlendirme)</li>
        </ul>
        <button class="start-btn" onclick="startPreTest()">▶ Derse Başla</button>
      </div>
    </div>
  `;
}

function startPreTest() {
  lessonStep = 'pre-test';
  quizIndex = 0;
  preTestAnswers = [];
  render();
}

function renderQuiz(questions, title, subtitle) {
  const q = questions[quizIndex];
  const opts = q.options.map((o, i) => `
    <button class="quiz-option" onclick="answerQuiz(${i})">${esc(o)}</button>
  `).join('');

  return `
    <div class="quiz-section">
      <div class="quiz-header">
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      <div class="quiz-card">
        <div class="quiz-counter">Soru ${quizIndex + 1} / ${questions.length}</div>
        <div class="quiz-question">${esc(q.text)}</div>
        <div class="quiz-options">${opts}</div>
      </div>
    </div>
  `;
}

function answerQuiz(idx) {
  if (lessonStep === 'pre-test') {
    preTestAnswers.push(idx);
    if (quizIndex < currentLesson.preTest.length - 1) {
      quizIndex++;
    } else {
      lessonStep = 'content';
      contentIndex = 0;
    }
  } else if (lessonStep === 'post-test') {
    postTestAnswers.push(idx);
    if (quizIndex < currentLesson.postTest.length - 1) {
      quizIndex++;
    } else {
      finishLesson();
      return;
    }
  }
  render();
}

function renderContent() {
  const c = currentLesson.content[contentIndex];
  let media = '';

  if (c.type === 'youtube' && c.youtubeId) {
    media = `<div class="content-video"><iframe src="https://www.youtube.com/embed/${c.youtubeId}?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border-radius:12px"></iframe></div>`;
  } else if (c.type === 'video' && c.contentUrl) {
    media = `<div class="content-video"><video controls src="${c.contentUrl}"></video></div>`;
  } else if (c.type === 'audio' && c.contentUrl) {
    media = `
      <div class="content-audio">
        <div class="audio-icon">🔊</div>
        <audio controls style="flex:1"><source src="${c.contentUrl}" type="audio/mpeg"></audio>
      </div>`;
  } else if (c.type === 'image-swipe' && c.images) {
    swiperIndex = 0;
    const dots = c.images.map((_, i) =>
      `<div class="swiper-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>`
    ).join('');
    media = `
      <div class="swiper-container" id="swiper">
        <img class="swiper-img" id="swiper-img" src="${c.images[0]}" referrerpolicy="no-referrer">
        <button class="swiper-btn swiper-btn-prev" onclick="swipe(-1)">‹</button>
        <button class="swiper-btn swiper-btn-next" onclick="swipe(1)">›</button>
        <div class="swiper-dots" id="swiper-dots">${dots}</div>
      </div>`;
  }

  const textHtml = c.text ? `<p class="content-text">${esc(c.text)}</p>` : '';
  const dots = currentLesson.content.map((_, i) =>
    `<div class="content-dot ${i === contentIndex ? 'active' : ''}"></div>`
  ).join('');
  const isLast = contentIndex === currentLesson.content.length - 1;

  return `
    <div class="content-card">
      <div class="content-header"><h2>${esc(c.title)}</h2></div>
      <div class="content-body">${media}${textHtml}</div>
      <div class="content-nav">
        <button class="nav-arrow nav-arrow-prev" onclick="prevContent()" ${contentIndex === 0 ? 'disabled' : ''}>← Önceki</button>
        <div class="content-dots">${dots}</div>
        <button class="nav-arrow nav-arrow-next" onclick="nextContent()">${isLast ? 'Son Teste Geç →' : 'Sonraki →'}</button>
      </div>
    </div>`;
}

function swipe(dir) {
  const c = currentLesson.content[contentIndex];
  if (!c.images) return;
  swiperIndex = (swiperIndex + dir + c.images.length) % c.images.length;
  const img = $('#swiper-img');
  if (img) img.src = c.images[swiperIndex];
  $$('#swiper-dots .swiper-dot').forEach((d, i) => d.classList.toggle('active', i === swiperIndex));
}

function nextContent() {
  if (contentIndex < currentLesson.content.length - 1) {
    contentIndex++;
  } else {
    lessonStep = 'post-test';
    quizIndex = 0;
    postTestAnswers = [];
  }
  render();
}

function prevContent() {
  if (contentIndex > 0) { contentIndex--; render(); }
}

function calcScore(answers, questions) {
  let correct = 0;
  answers.forEach((a, i) => { if (a === questions[i].correctAnswerIndex) correct++; });
  return Math.round((correct / questions.length) * 100);
}

async function finishLesson() {
  lessonStep = 'completed';
  render();

  const preScore = calcScore(preTestAnswers, currentLesson.preTest);
  const postScore = calcScore(postTestAnswers, currentLesson.postTest);

  // Save to Firestore
  if (currentUser) {
    try {
      await db.collection('progress').add({
        userId: currentUser.uid,
        lessonId: currentLesson.id,
        preTestScore: preScore,
        postTestScore: postScore,
        completedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log('Progress saved successfully');
    } catch (e) {
      console.error('Save error:', e);
      // Show error to user
      const errDiv = document.createElement('div');
      errDiv.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#c0392b;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-size:14px';
      errDiv.textContent = 'Sonuç kaydedilemedi: ' + (e.message || e.code);
      document.body.appendChild(errDiv);
      setTimeout(() => errDiv.remove(), 8000);
    }
  }
}

function renderCompleted() {
  const preScore = calcScore(preTestAnswers, currentLesson.preTest);
  const postScore = calcScore(postTestAnswers, currentLesson.postTest);

  return `
    <div class="completed-section">
      <div class="completed-icon">✓</div>
      <h2 class="completed-title">Tebrikler!</h2>
      <p class="completed-subtitle">Dersi başarıyla tamamladınız.</p>
      <div class="scores-grid">
        <div class="score-card score-card-pre">
          <div class="score-label">Ön Test Skoru</div>
          <div class="score-value">%${preScore}</div>
        </div>
        <div class="score-card score-card-post">
          <div class="score-label">Son Test Skoru</div>
          <div class="score-value">%${postScore}</div>
        </div>
      </div>
      <button class="back-btn" onclick="goHome()">Ana Sayfaya Dön</button>
    </div>`;
}

/* ===== ADMIN ===== */
async function renderAdmin(app) {
  app.innerHTML = `
    ${buildNav()}
    <div class="admin-page">
      <div class="admin-header">
        <h1 class="dash-title" style="font-size:22px">Yönetici Paneli</h1>
        <button class="nav-btn nav-btn-admin" onclick="goHome()">← Derslere Dön</button>
      </div>
      <div id="admin-content"><div class="loading-page" style="min-height:200px"><div class="spinner"></div></div></div>
    </div>`;

  try {
    const [usersSnap, progressSnap] = await Promise.all([
      db.collection('users').get(),
      db.collection('progress').orderBy('completedAt', 'desc').get()
    ]);

    const users = usersSnap.docs.map(d => d.data());
    const progress = progressSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    const students = users.filter(u => u.role === 'student');
    const avgPost = progress.length > 0
      ? Math.round(progress.reduce((a, c) => a + (c.postTestScore || 0), 0) / progress.length)
      : 0;

    const rows = progress.length === 0
      ? `<tr><td colspan="5" class="empty-state">Henüz tamamlanan bir ders bulunmuyor.</td></tr>`
      : progress.map(r => {
          const userName = users.find(u => u.uid === r.userId)?.displayName || r.userId;
          const lessonName = LESSONS.find(l => l.id === r.lessonId)?.title || r.lessonId;
          const date = r.completedAt?.toDate ? new Date(r.completedAt.toDate()).toLocaleDateString('tr-TR') : '—';
          return `<tr>
            <td style="font-weight:600">${esc(userName)}</td>
            <td>${esc(lessonName)}</td>
            <td style="text-align:center"><span class="score-badge score-badge-low">%${r.preTestScore}</span></td>
            <td style="text-align:center"><span class="score-badge ${r.postTestScore >= 70 ? 'score-badge-high' : 'score-badge-low'}">%${r.postTestScore}</span></td>
            <td style="text-align:right">${date}</td>
          </tr>`;
        }).join('');

    $('#admin-content').innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-icon-users">👥</div>
          <div><div class="stat-label">Toplam Öğrenci</div><div class="stat-value">${students.length}</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-lessons">📖</div>
          <div><div class="stat-label">Tamamlanan Dersler</div><div class="stat-value">${progress.length}</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-score">📈</div>
          <div><div class="stat-label">Ortalama Başarı</div><div class="stat-value">%${avgPost}</div></div>
        </div>
      </div>
      <div class="progress-table-wrap">
        <div class="progress-table-header">
          <h3>Son Tamamlanan Dersler</h3>
          <p>Öğrencilerin test skorları ve ilerleme durumları</p>
        </div>
        <table class="progress-table">
          <thead><tr>
            <th>Öğrenci</th><th>Ders</th><th style="text-align:center">Ön Test</th><th style="text-align:center">Son Test</th><th style="text-align:right">Tarih</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  } catch (e) {
    console.error('Admin fetch error:', e);
    $('#admin-content').innerHTML = `<div class="empty-state">Veri yüklenirken hata oluştu.<br><small>${e.message || ''}</small></div>`;
  }
}

function goAdmin() { currentPage = 'admin'; render(); }
function goHome() { currentPage = 'dashboard'; currentLesson = null; render(); }

async function doLogout() {
  try { await auth.signOut(); } catch (e) { console.error('Logout:', e); }
}

function esc(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ===== INIT ===== */
function init() {
  initFirebase();

  // Handle redirect result (fallback for popup-blocked)
  auth.getRedirectResult().catch(e => {
    if (e.code !== 'auth/popup-closed-by-user') {
      console.error('Redirect error:', e);
    }
  });

  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    if (user) {
      // Set role based on email (instant, no Firestore wait)
      userRole = user.email === 'raufenc@gmail.com' ? 'admin' : 'student';
      currentPage = 'dashboard';
      render();

      // Save user doc in background
      const userRef = db.collection('users').doc(user.uid);
      userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: userRole,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).then(() => {
        console.log('User doc saved OK');
      }).catch(e => {
        console.error('User doc error:', e);
        const errDiv = document.createElement('div');
        errDiv.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#c0392b;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-size:14px';
        errDiv.textContent = 'Firestore hatası: ' + (e.message || e.code);
        document.body.appendChild(errDiv);
        setTimeout(() => errDiv.remove(), 8000);
      });
    } else {
      userRole = null;
      currentPage = 'login';
      render();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
