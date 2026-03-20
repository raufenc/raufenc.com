/* ===== Firebase Setup (compat SDK) ===== */
let firebaseApp, auth, db, googleProvider;
let currentUser = null;
let userRole = null;

function initFirebase() {
  firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
  auth = firebase.auth();
  db = firebase.firestore();
  // Use named database
  // Note: compat SDK uses default database. For named DB we use REST or default.
  googleProvider = new firebase.auth.GoogleAuthProvider();
}

/* ===== State ===== */
let currentPage = 'loading'; // loading, login, dashboard, lesson, admin
let currentLesson = null;
let lessonStep = 'intro'; // intro, pre-test, content, post-test, completed
let contentIndex = 0;
let quizIndex = 0;
let preTestAnswers = [];
let postTestAnswers = [];
let swiperIndex = 0;

/* ===== DOM Helpers ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function show(el) { el && el.classList.remove('hidden'); }
function hide(el) { el && el.classList.add('hidden'); }

/* ===== Router ===== */
function render() {
  const app = $('#app');
  switch (currentPage) {
    case 'loading':
      app.innerHTML = '<div class="loading-page"><div class="spinner"></div></div>';
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
      <div class="login-card">
        <div class="login-icon">📖</div>
        <h1 class="login-title">İslami Öğrenim Platformu</h1>
        <p class="login-subtitle">Öğrenmeye başlamak için giriş yapın</p>
        <button class="login-btn" onclick="loginWithGoogle()">Google ile Giriş Yap</button>
      </div>
    </div>
  `;
}

async function loginWithGoogle() {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (e) {
    console.error('Login failed:', e);
    alert('Giriş başarısız oldu. Lütfen tekrar deneyin.');
  }
}

/* ===== DASHBOARD ===== */
function renderDashboard(app) {
  const nav = buildNav();
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
    ${nav}
    <div class="dashboard">
      <h1 class="dash-title">Modüller ve Dersler</h1>
      <p class="dash-subtitle">Öğrenmeye başlamak için bir ders seçin.</p>
      <div class="lesson-grid">${cards}</div>
    </div>
  `;
}

function buildNav() {
  const adminBtn = userRole === 'admin'
    ? `<button class="nav-btn nav-btn-admin" onclick="goAdmin()">Yönetici Paneli</button>`
    : '';
  const name = currentUser?.displayName || currentUser?.email || '';
  return `
    <nav class="top-nav">
      <div class="nav-brand">
        <span class="nav-brand-icon">🏆</span>
        <span>Öğrenim Platformu</span>
      </div>
      <div class="nav-right">
        <span class="nav-user">Hoş geldin, ${esc(name)}</span>
        ${adminBtn}
        <button class="nav-btn nav-btn-logout" onclick="doLogout()">↩ Çıkış</button>
      </div>
    </nav>
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
  const nav = buildNav();
  let body = '';

  switch (lessonStep) {
    case 'intro':
      body = renderIntro();
      break;
    case 'pre-test':
      body = renderQuiz(currentLesson.preTest, 'Ön Test', 'Mevcut bilginizi ölçelim');
      break;
    case 'content':
      body = renderContent();
      break;
    case 'post-test':
      body = renderQuiz(currentLesson.postTest, 'Son Test', 'Neler öğrendiğimizi değerlendirelim');
      break;
    case 'completed':
      body = renderCompleted();
      break;
  }

  app.innerHTML = `${nav}<div class="player-page">${body}</div>`;
}

function renderIntro() {
  return `
    <div class="intro-section" style="animation: fadeIn 0.4s ease">
      <h1 class="intro-title">${esc(currentLesson.title)}</h1>
      <p class="intro-desc">${esc(currentLesson.description)}</p>
      <div class="intro-flow">
        <h3>Ders Akışı</h3>
        <ul>
          <li>Ön Test (Bilgi Ölçümü)</li>
          <li>Etkileşimli İçerik (Video, Ses, Görsel)</li>
          <li>Son Test (Değerlendirme)</li>
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
    <div class="quiz-section" style="padding-top: 32px;">
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

  if (c.type === 'video' && c.contentUrl) {
    media = `
      <div class="content-video">
        <video controls src="${c.contentUrl}"></video>
      </div>
    `;
  } else if (c.type === 'audio' && c.contentUrl) {
    media = `
      <div class="content-audio">
        <div class="audio-icon">🔊</div>
        <audio controls style="flex:1"><source src="${c.contentUrl}" type="audio/mpeg"></audio>
      </div>
    `;
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
      </div>
    `;
  }

  const textHtml = c.text ? `<p class="content-text">${esc(c.text)}</p>` : '';

  const dots = currentLesson.content.map((_, i) =>
    `<div class="content-dot ${i === contentIndex ? 'active' : ''}"></div>`
  ).join('');

  const isLast = contentIndex === currentLesson.content.length - 1;
  const isFirst = contentIndex === 0;

  return `
    <div class="content-card">
      <div class="content-header"><h2>${esc(c.title)}</h2></div>
      <div class="content-body">
        ${media}
        ${textHtml}
      </div>
      <div class="content-nav">
        <button class="nav-arrow nav-arrow-prev" onclick="prevContent()" ${isFirst ? 'disabled' : ''}>← Önceki</button>
        <div class="content-dots">${dots}</div>
        <button class="nav-arrow nav-arrow-next" onclick="nextContent()">${isLast ? 'Son Teste Geç →' : 'Sonraki →'}</button>
      </div>
    </div>
  `;
}

function swipe(dir) {
  const c = currentLesson.content[contentIndex];
  if (!c.images) return;
  swiperIndex = (swiperIndex + dir + c.images.length) % c.images.length;
  const img = $('#swiper-img');
  if (img) img.src = c.images[swiperIndex];
  const dots = $$('#swiper-dots .swiper-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === swiperIndex));
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
  if (contentIndex > 0) {
    contentIndex--;
    render();
  }
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

  try {
    if (currentUser) {
      await db.collection('progress').add({
        userId: currentUser.uid,
        lessonId: currentLesson.id,
        preTestScore: preScore,
        postTestScore: postScore,
        completedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (e) {
    console.error('Error saving progress:', e);
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
    </div>
  `;
}

/* ===== ADMIN ===== */
async function renderAdmin(app) {
  const nav = buildNav();
  app.innerHTML = `
    ${nav}
    <div class="admin-page">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
          <h1 class="dash-title" style="font-size:22px">Yönetici Paneli</h1>
        </div>
        <button class="nav-btn nav-btn-admin" onclick="goHome()">← Öğrenci Paneline Dön</button>
      </div>
      <div id="admin-content"><div class="loading-page" style="min-height:200px"><div class="spinner"></div></div></div>
    </div>
  `;

  try {
    const usersSnap = await db.collection('users').get();
    const users = usersSnap.docs.map(d => d.data());

    const progressSnap = await db.collection('progress').orderBy('completedAt', 'desc').get();
    const progress = progressSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    const students = users.filter(u => u.role === 'student');
    const avgPost = progress.length > 0
      ? Math.round(progress.reduce((a, c) => a + (c.postTestScore || 0), 0) / progress.length)
      : 0;

    const rows = progress.length === 0
      ? `<tr><td colspan="5" class="empty-state">Henüz tamamlanan bir ders bulunmuyor.</td></tr>`
      : progress.map(r => {
          const userName = users.find(u => u.uid === r.userId)?.displayName || r.userId;
          const lessonName = r.lessonId === 'peygamber-efendimizin-cocuklugu'
            ? "Peygamber Efendimiz (s.a.v.)'in Çocukluğu"
            : r.lessonId;
          const date = r.completedAt?.toDate ? new Date(r.completedAt.toDate()).toLocaleDateString('tr-TR') : '—';
          const preBadge = `<span class="score-badge score-badge-low">%${r.preTestScore}</span>`;
          const postBadge = `<span class="score-badge ${r.postTestScore >= 70 ? 'score-badge-high' : 'score-badge-low'}">%${r.postTestScore}</span>`;
          return `<tr><td>${esc(userName)}</td><td>${esc(lessonName)}</td><td>${preBadge}</td><td>${postBadge}</td><td style="text-align:right">${date}</td></tr>`;
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
          <p>Öğrencilerin dersleri tamamlama durumları ve test skorları.</p>
        </div>
        <table class="progress-table">
          <thead><tr>
            <th>Öğrenci</th><th>Ders</th><th style="text-align:center">Ön Test</th><th style="text-align:center">Son Test</th><th style="text-align:right">Tarih</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  } catch (e) {
    console.error('Admin data fetch error:', e);
    $('#admin-content').innerHTML = `<div class="empty-state">Veri yüklenirken hata oluştu. Firebase yapılandırmasını kontrol edin.</div>`;
  }
}

function goAdmin() {
  currentPage = 'admin';
  render();
}

function goHome() {
  currentPage = 'dashboard';
  currentLesson = null;
  render();
}

async function doLogout() {
  try {
    await auth.signOut();
  } catch (e) {
    console.error('Logout failed:', e);
  }
}

/* ===== Utility ===== */
function esc(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ===== INIT ===== */
function init() {
  initFirebase();

  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    if (user) {
      // Check/create user doc
      const userRef = db.collection('users').doc(user.uid);
      try {
        const doc = await userRef.get();
        if (doc.exists) {
          let role = doc.data().role;
          if (user.email === 'raufenc@gmail.com' && role !== 'admin') {
            await userRef.set({ role: 'admin' }, { merge: true });
            role = 'admin';
          }
          userRole = role;
        } else {
          const initialRole = user.email === 'raufenc@gmail.com' ? 'admin' : 'student';
          await userRef.set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: initialRole,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          userRole = initialRole;
        }
      } catch (e) {
        console.error('User doc error:', e);
        userRole = 'student';
      }
      currentPage = 'dashboard';
    } else {
      userRole = null;
      currentPage = 'login';
    }
    render();
  });
}

document.addEventListener('DOMContentLoaded', init);
