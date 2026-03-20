/* ===== Firebase Setup ===== */
let auth, googleProvider;
let currentUser = null;
let userRole = null;

const FIRESTORE_DB_ID = 'ai-studio-ac5d1b43-b908-42e1-8974-579e8d9328bb';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/${FIRESTORE_DB_ID}/documents`;
const API_KEY = FIREBASE_CONFIG.apiKey;

function initFirebase() {
  firebase.initializeApp(FIREBASE_CONFIG);
  auth = firebase.auth();
  googleProvider = new firebase.auth.GoogleAuthProvider();
}

/* ===== Firestore REST API helpers ===== */
async function getToken() {
  if (!currentUser) return null;
  return await currentUser.getIdToken();
}

function toFirestoreValue(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'string') return { stringValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (v === '__SERVER_TIMESTAMP__') return { timestampValue: new Date().toISOString() };
  return { stringValue: String(v) };
}

function fromFirestoreValue(v) {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return parseInt(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('timestampValue' in v) return new Date(v.timestampValue);
  if ('nullValue' in v) return null;
  if ('mapValue' in v) return fromFirestoreDoc(v.mapValue);
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(fromFirestoreValue);
  return null;
}

function fromFirestoreDoc(doc) {
  if (!doc || !doc.fields) return {};
  const obj = {};
  for (const [k, v] of Object.entries(doc.fields)) {
    obj[k] = fromFirestoreValue(v);
  }
  return obj;
}

async function fsSet(collection, docId, data) {
  const fields = {};
  for (const [k, v] of Object.entries(data)) {
    fields[k] = toFirestoreValue(v);
  }
  const url = `${FIRESTORE_BASE}/${collection}/${docId}?key=${API_KEY}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Firestore set error (${res.status}): ${errText}`);
  }
  return await res.json();
}

async function fsAdd(collection, data) {
  const fields = {};
  for (const [k, v] of Object.entries(data)) {
    fields[k] = toFirestoreValue(v);
  }
  const url = `${FIRESTORE_BASE}/${collection}?key=${API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Firestore add error (${res.status}): ${errText}`);
  }
  return await res.json();
}

async function fsGetAll(collection) {
  const url = `${FIRESTORE_BASE}/${collection}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Firestore getAll error (${res.status}): ${errText}`);
  }
  const data = await res.json();
  if (!data.documents) return [];
  return data.documents.map(doc => {
    const id = doc.name.split('/').pop();
    return { id, ...fromFirestoreDoc(doc) };
  });
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

function showToast(msg, isError) {
  const errDiv = document.createElement('div');
  errDiv.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:${isError ? '#c0392b' : '#27ae60'};color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-size:14px;max-width:90vw;text-align:center`;
  errDiv.textContent = msg;
  document.body.appendChild(errDiv);
  setTimeout(() => errDiv.remove(), 6000);
}

async function finishLesson() {
  lessonStep = 'completed';
  render();

  const preScore = calcScore(preTestAnswers, currentLesson.preTest);
  const postScore = calcScore(postTestAnswers, currentLesson.postTest);

  if (currentUser) {
    try {
      await fsAdd('progress', {
        userId: currentUser.uid,
        lessonId: currentLesson.id,
        preTestScore: preScore,
        postTestScore: postScore,
        completedAt: '__SERVER_TIMESTAMP__'
      });
      showToast('Sonuç kaydedildi!', false);
    } catch (e) {
      console.error('Save error:', e);
      showToast('Sonuç kaydedilemedi: ' + e.message, true);
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
    const [users, progress] = await Promise.all([
      fsGetAll('users'),
      fsGetAll('progress')
    ]);

    // Sort progress by completedAt descending
    progress.sort((a, b) => {
      const da = a.completedAt instanceof Date ? a.completedAt : new Date(0);
      const db2 = b.completedAt instanceof Date ? b.completedAt : new Date(0);
      return db2 - da;
    });

    const students = users.filter(u => u.role === 'student');
    const avgPost = progress.length > 0
      ? Math.round(progress.reduce((a, c) => a + (c.postTestScore || 0), 0) / progress.length)
      : 0;

    const rows = progress.length === 0
      ? `<tr><td colspan="5" class="empty-state">Henüz tamamlanan bir ders bulunmuyor.</td></tr>`
      : progress.map(r => {
          const userName = users.find(u => u.uid === r.userId)?.displayName || r.userId;
          const lessonName = LESSONS.find(l => l.id === r.lessonId)?.title || r.lessonId;
          const date = r.completedAt instanceof Date ? r.completedAt.toLocaleDateString('tr-TR') : '—';
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
    $('#admin-content').innerHTML = `<div class="empty-state">Veri yüklenirken hata oluştu.<br><small>${esc(e.message || '')}</small></div>`;
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

  auth.getRedirectResult().catch(e => {
    if (e.code !== 'auth/popup-closed-by-user') {
      console.error('Redirect error:', e);
    }
  });

  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    if (user) {
      userRole = user.email === 'raufenc@gmail.com' ? 'admin' : 'student';
      currentPage = 'dashboard';
      render();

      // Save user doc via REST API (non-blocking)
      fsSet('users', user.uid, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        role: userRole,
        lastLogin: '__SERVER_TIMESTAMP__'
      }).then(() => {
        console.log('User doc saved OK');
      }).catch(e => {
        console.error('User doc error:', e);
        showToast('Firestore hatası: ' + e.message, true);
      });
    } else {
      userRole = null;
      currentPage = 'login';
      render();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
