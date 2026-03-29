// firebase-app.js — Firebase Auth + Firestore + Admin Panel
// ============================================
// FIREBASE CONFIG — kendi bilgilerini gir
// ============================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyATUuYFnaMX1yBqaoJxackYf4ucmWVixkw",
  authDomain: "kalbinin-haritasi.firebaseapp.com",
  projectId: "kalbinin-haritasi",
  storageBucket: "kalbinin-haritasi.firebasestorage.app",
  messagingSenderId: "485160854703",
  appId: "1:485160854703:web:8842cf7642e82803a6605a"
};

// Admin email listesi — bu email'ler admin paneline erişir
const ADMIN_EMAILS = ['raufenc@gmail.com'];

let db = null;
let auth = null;
let currentUser = null;
let userProfile = null;

// ============================================
// BAŞLATMA
// ============================================
function initFirebase() {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    auth = firebase.auth();

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        currentUser = user;
        await loadOrCreateProfile();
        await syncFromCloud();
        updateAuthUI();
      } else {
        currentUser = null;
        userProfile = null;
        updateAuthUI();
      }
    });
  } catch (e) {
    console.warn('Firebase başlatılamadı:', e);
  }
}

// ============================================
// AUTH
// ============================================
async function signInWithGoogle() {
  if (!auth) return;
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
}

async function signInWithEmail(email, password) {
  if (!auth) return { error: 'Bağlantı yok' };
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return { data: result.user };
  } catch (e) {
    if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
      try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        return { data: result.user, isNewUser: true };
      } catch (e2) {
        return { error: e2.message };
      }
    }
    return { error: e.message };
  }
}

async function signInWithMagicLink(email) {
  if (!auth) return { error: 'Bağlantı yok' };
  try {
    await auth.sendSignInLinkToEmail(email, {
      url: window.location.href,
      handleCodeInApp: true
    });
    localStorage.setItem('emailForSignIn', email);
    return {};
  } catch (e) {
    return { error: e.message };
  }
}

async function signOutUser() {
  if (!auth) return;
  await auth.signOut();
  currentUser = null;
  userProfile = null;
  updateAuthUI();
}

// ============================================
// PROFİL
// ============================================
async function loadOrCreateProfile() {
  if (!db || !currentUser) return;
  const doc = await db.collection('profiles').doc(currentUser.uid).get();
  if (doc.exists) {
    userProfile = doc.data();
  } else {
    userProfile = {
      displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Kullanıcı',
      email: currentUser.email || '',
      role: ADMIN_EMAILS.includes(currentUser.email) ? 'admin' : 'student',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('profiles').doc(currentUser.uid).set(userProfile);
  }
}

async function setRole(role) {
  if (!db || !currentUser) return;
  await db.collection('profiles').doc(currentUser.uid).update({ role });
  userProfile.role = role;
}

function isAdmin() {
  return userProfile?.role === 'admin' || ADMIN_EMAILS.includes(currentUser?.email);
}

function isTeacher() {
  return userProfile?.role === 'teacher' || isAdmin();
}

// ============================================
// SENKRONİZASYON
// ============================================
async function syncToCloud(testKey, scores) {
  if (!db || !currentUser) return;
  await db.collection('test_results').add({
    userId: currentUser.uid,
    testKey,
    tefrit: scores.tefrit,
    fazilet: scores.fazilet,
    ifrat: scores.ifrat,
    completedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

async function syncFromCloud() {
  if (!db || !currentUser) return;
  const snap = await db.collection('test_results')
    .where('userId', '==', currentUser.uid)
    .orderBy('completedAt', 'desc')
    .get();

  if (snap.empty) {
    await pushLocalToCloud();
    return;
  }

  const history = {};
  const seen = {};
  snap.forEach(doc => {
    const d = doc.data();
    if (seen[d.testKey]) return;
    seen[d.testKey] = true;
    history[d.testKey] = {
      percentages: { tefrit: d.tefrit, fazilet: d.fazilet, ifrat: d.ifrat },
      geminiData: null
    };
  });

  const local = JSON.parse(localStorage.getItem('ahlakHistory') || '{}');
  const merged = { ...local, ...history };
  localStorage.setItem('ahlakHistory', JSON.stringify(merged));
  if (typeof S !== 'undefined') S.history = merged;
}

async function pushLocalToCloud() {
  if (!db || !currentUser) return;
  const local = JSON.parse(localStorage.getItem('ahlakHistory') || '{}');
  const batch = db.batch();
  for (const [testKey, result] of Object.entries(local)) {
    if (!result.percentages) continue;
    const ref = db.collection('test_results').doc();
    batch.set(ref, {
      userId: currentUser.uid,
      testKey,
      tefrit: result.percentages.tefrit || 0,
      fazilet: result.percentages.fazilet || 0,
      ifrat: result.percentages.ifrat || 0,
      completedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  await batch.commit();
}

// ============================================
// SINIF YÖNETİMİ
// ============================================
function generateJoinCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

async function createClass(name) {
  if (!db || !currentUser) return null;
  const joinCode = generateJoinCode();
  const ref = await db.collection('classes').add({
    teacherId: currentUser.uid,
    name,
    joinCode,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return { id: ref.id, name, joinCode };
}

async function getMyClasses() {
  if (!db || !currentUser) return [];
  if (isTeacher()) {
    const snap = await db.collection('classes').where('teacherId', '==', currentUser.uid).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } else {
    const memSnap = await db.collection('class_members').where('userId', '==', currentUser.uid).get();
    const classIds = memSnap.docs.map(d => d.data().classId);
    if (classIds.length === 0) return [];
    const classes = [];
    for (const cid of classIds) {
      const doc = await db.collection('classes').doc(cid).get();
      if (doc.exists) classes.push({ id: doc.id, ...doc.data() });
    }
    return classes;
  }
}

async function joinClass(joinCode) {
  if (!db || !currentUser) return { error: 'Giriş yapmalısın' };
  const snap = await db.collection('classes').where('joinCode', '==', joinCode.toUpperCase()).get();
  if (snap.empty) return { error: 'Sınıf bulunamadı' };
  const cls = { id: snap.docs[0].id, ...snap.docs[0].data() };
  const existing = await db.collection('class_members')
    .where('classId', '==', cls.id).where('userId', '==', currentUser.uid).get();
  if (!existing.empty) return { error: 'Zaten bu sınıftasın' };
  await db.collection('class_members').add({
    classId: cls.id,
    userId: currentUser.uid,
    joinedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return { data: cls };
}

async function getClassStudents(classId) {
  if (!db || !currentUser) return [];
  const memSnap = await db.collection('class_members').where('classId', '==', classId).get();
  const students = [];
  for (const doc of memSnap.docs) {
    const uid = doc.data().userId;
    const profileDoc = await db.collection('profiles').doc(uid).get();
    students.push({
      userId: uid,
      displayName: profileDoc.exists ? profileDoc.data().displayName : 'İsimsiz'
    });
  }
  return students;
}

async function getClassResults(classId) {
  if (!db || !currentUser) return [];
  const memSnap = await db.collection('class_members').where('classId', '==', classId).get();
  const userIds = memSnap.docs.map(d => d.data().userId);
  if (userIds.length === 0) return [];
  // Firestore 'in' max 30 eleman destekler, grupla
  const results = [];
  for (let i = 0; i < userIds.length; i += 30) {
    const batch = userIds.slice(i, i + 30);
    const snap = await db.collection('test_results').where('userId', 'in', batch).orderBy('completedAt', 'desc').get();
    snap.forEach(doc => results.push(doc.data()));
  }
  return results;
}

async function deleteClass(classId) {
  if (!db || !currentUser) return;
  // Üyelikleri sil
  const memSnap = await db.collection('class_members').where('classId', '==', classId).get();
  const batch = db.batch();
  memSnap.forEach(doc => batch.delete(doc.ref));
  batch.delete(db.collection('classes').doc(classId));
  await batch.commit();
}

// ============================================
// ADMIN FONKSİYONLARI
// ============================================
async function adminGetAllUsers() {
  if (!db || !isAdmin()) return [];
  const snap = await db.collection('profiles').orderBy('createdAt', 'desc').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function adminGetAllClasses() {
  if (!db || !isAdmin()) return [];
  const snap = await db.collection('classes').orderBy('createdAt', 'desc').get();
  const classes = [];
  for (const doc of snap.docs) {
    const data = doc.data();
    const memSnap = await db.collection('class_members').where('classId', '==', doc.id).get();
    const teacherDoc = await db.collection('profiles').doc(data.teacherId).get();
    classes.push({
      id: doc.id,
      ...data,
      memberCount: memSnap.size,
      teacherName: teacherDoc.exists ? teacherDoc.data().displayName : 'Bilinmiyor'
    });
  }
  return classes;
}

async function adminGetStats() {
  if (!db || !isAdmin()) return {};
  const usersSnap = await db.collection('profiles').get();
  const classesSnap = await db.collection('classes').get();
  const resultsSnap = await db.collection('test_results').get();

  const roles = { student: 0, teacher: 0, admin: 0 };
  usersSnap.forEach(d => { roles[d.data().role || 'student']++; });

  const testCounts = {};
  resultsSnap.forEach(d => {
    const key = d.data().testKey;
    testCounts[key] = (testCounts[key] || 0) + 1;
  });

  return {
    totalUsers: usersSnap.size,
    totalClasses: classesSnap.size,
    totalResults: resultsSnap.size,
    roles,
    testCounts
  };
}

async function adminSetUserRole(userId, role) {
  if (!db || !isAdmin()) return;
  await db.collection('profiles').doc(userId).update({ role });
}

async function adminDeleteUser(userId) {
  if (!db || !isAdmin()) return;
  // Sonuçlarını sil
  const resSnap = await db.collection('test_results').where('userId', '==', userId).get();
  const batch1 = db.batch();
  resSnap.forEach(d => batch1.delete(d.ref));
  await batch1.commit();
  // Üyeliklerini sil
  const memSnap = await db.collection('class_members').where('userId', '==', userId).get();
  const batch2 = db.batch();
  memSnap.forEach(d => batch2.delete(d.ref));
  await batch2.commit();
  // Profili sil
  await db.collection('profiles').doc(userId).delete();
}

// ============================================
// AUTH UI
// ============================================
function updateAuthUI() {
  const btn = document.getElementById('auth-btn');
  if (!btn) return;
  if (currentUser) {
    const name = userProfile?.displayName || currentUser.email?.split('@')[0] || '';
    btn.innerHTML = name.charAt(0).toUpperCase();
    btn.title = name + (isAdmin() ? ' (Admin)' : isTeacher() ? ' (Eğitimci)' : '');
    btn.style.background = isAdmin() ? 'linear-gradient(135deg, #dc2626, #f87171)' : 'linear-gradient(135deg, var(--gold-dark), var(--gold))';
    btn.style.color = '#fff';
    btn.style.fontSize = '14px';
    btn.style.fontWeight = '700';
  } else {
    btn.innerHTML = '👤';
    btn.title = 'Giriş Yap';
    btn.style.background = 'var(--bg-card)';
    btn.style.color = 'var(--gold)';
    btn.style.fontSize = '16px';
    btn.style.fontWeight = 'normal';
  }
}

function showAuthModal() {
  if (currentUser) {
    S.screen = 'profile';
    render();
    if (isTeacher()) setTimeout(loadTeacherClasses, 100);
    else setTimeout(loadStudentClasses, 100);
    return;
  }
  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px)';
  modal.innerHTML = `
    <div class="card" style="max-width:400px;width:90%;position:relative">
      <button onclick="document.getElementById('auth-modal').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text-muted);font-size:20px;cursor:pointer">\u2715</button>
      <h2 class="font-display text-2xl font-bold mb-1" style="color:var(--gold)">Giriş Yap</h2>
      <p class="text-xs mb-6" style="color:var(--text-muted)">Sonuçlarını bulutta sakla, farklı cihazlarından eriş</p>
      <button onclick="signInWithGoogle()" class="btn btn-gold w-full mb-3" style="font-size:0.9rem">Google ile Giriş</button>
      <div class="divider"><span class="divider-icon">veya</span></div>
      <input id="auth-email" type="email" placeholder="E-posta adresin"
        style="width:100%;padding:0.75rem 1rem;border-radius:0.5rem;border:1px solid var(--border-gold);background:rgba(0,0,0,0.2);color:var(--text-primary);font-size:0.9rem;margin-bottom:0.5rem;font-family:Inter,sans-serif" />
      <input id="auth-pass" type="password" placeholder="Şifre (boş bırakırsan link gelir)"
        style="width:100%;padding:0.75rem 1rem;border-radius:0.5rem;border:1px solid var(--border-gold);background:rgba(0,0,0,0.2);color:var(--text-primary);font-size:0.9rem;margin-bottom:0.75rem;font-family:Inter,sans-serif" />
      <button onclick="handleEmailAuth()" class="btn btn-emerald w-full" style="font-size:0.9rem">Devam Et</button>
      <p id="auth-msg" class="text-xs mt-3 text-center" style="color:var(--text-muted)"></p>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

async function handleEmailAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const pass = document.getElementById('auth-pass').value;
  const msg = document.getElementById('auth-msg');
  if (!email) { msg.textContent = 'E-posta gerekli'; return; }
  if (!pass) {
    msg.textContent = 'Giriş linki gönderiliyor...';
    const { error } = await signInWithMagicLink(email);
    msg.textContent = error || 'E-postanı kontrol et!';
    msg.style.color = error ? '#f87171' : 'var(--emerald-light)';
  } else {
    msg.textContent = 'Giriş yapılıyor...';
    const { error, isNewUser } = await signInWithEmail(email, pass);
    if (error) { msg.textContent = error; msg.style.color = '#f87171'; }
    else {
      msg.textContent = isNewUser ? 'Hesap oluşturuldu!' : 'Hoş geldin!';
      msg.style.color = 'var(--emerald-light)';
      setTimeout(() => document.getElementById('auth-modal')?.remove(), 600);
    }
  }
}

// ============================================
// PROFİL EKRANI
// ============================================
function screenProfile() {
  if (!currentUser) { S.screen = 'welcome'; render(); return ''; }
  const name = userProfile?.displayName || '';
  const email = currentUser.email || '';
  const role = userProfile?.role || 'student';

  return `
  <div class="fade-in">
    <div class="mb-8"><button class="text-sm" style="color:var(--text-muted)" data-action="goWelcome">\u2190 Ana Sayfa</button></div>

    <div class="card mb-6">
      <div class="flex items-center gap-4 mb-4">
        <div style="width:48px;height:48px;border-radius:50%;background:${isAdmin()?'linear-gradient(135deg,#dc2626,#f87171)':'linear-gradient(135deg,var(--gold-dark),var(--gold))'};display:flex;align-items:center;justify-content:center;font-size:1.25rem;font-weight:700;color:#fff">${name.charAt(0).toUpperCase()}</div>
        <div>
          <h2 class="font-display text-xl font-bold" style="color:var(--gold)">${name}</h2>
          <p class="text-xs" style="color:var(--text-muted)">${email} \u2022 ${role === 'admin' ? 'Y\u00f6netici' : role === 'teacher' ? 'E\u011fitimci' : '\u00d6\u011frenci'}</p>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap">
        ${!isAdmin() ? `<button class="btn btn-ghost text-xs py-1.5 px-4" onclick="setRole('${role==='teacher'?'student':'teacher'}').then(()=>render())">${role==='teacher'?'\u00d6\u011frenci moduna ge\u00e7':'E\u011fitimci moduna ge\u00e7'}</button>` : ''}
        ${isAdmin() ? '<button class="btn btn-ghost text-xs py-1.5 px-4" data-action="goAdmin" style="border-color:#f87171;color:#f87171">Admin Paneli</button>' : ''}
        <button class="btn btn-subtle text-xs py-1.5 px-4" onclick="signOutUser().then(()=>{S.screen='welcome';render()})">Çıkış Yap</button>
      </div>
    </div>

    ${isTeacher() ? `
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-3" style="color:var(--gold)">Eğitimci Paneli</h3>
      <div class="flex gap-2 mb-4">
        <input id="new-class-name" type="text" placeholder="Sınıf adı (örn: 10-A)"
          style="flex:1;padding:0.6rem 0.8rem;border-radius:0.5rem;border:1px solid var(--border-gold);background:rgba(0,0,0,0.2);color:var(--text-primary);font-size:0.85rem;font-family:Inter,sans-serif" />
        <button class="btn btn-emerald text-xs py-1.5 px-4" data-action="createClass">Oluştur</button>
      </div>
      <div id="class-list"><p class="text-xs" style="color:var(--text-muted)">Yükleniyor...</p></div>
    </div>` : `
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-3" style="color:var(--gold)">Sınıfa Katıl</h3>
      <div class="flex gap-2 mb-2">
        <input id="join-code-input" type="text" placeholder="Katılım kodu" maxlength="6"
          style="flex:1;padding:0.6rem 0.8rem;border-radius:0.5rem;border:1px solid var(--border-gold);background:rgba(0,0,0,0.2);color:var(--text-primary);font-size:0.85rem;font-family:Inter,sans-serif;text-transform:uppercase;letter-spacing:0.1em" />
        <button class="btn btn-emerald text-xs py-1.5 px-4" data-action="joinClass">Katıl</button>
      </div>
      <p id="join-msg" class="text-xs" style="color:var(--text-muted)"></p>
      <div id="my-classes-list" class="mt-4"></div>
    </div>`}

    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-3" style="color:var(--gold)">Senkronizasyon</h3>
      <p class="text-sm mb-3" style="color:var(--text-secondary)">Sonuçların bulutta. Farklı cihazlarından giriş yaparak erişebilirsin.</p>
      <button class="btn btn-ghost text-xs py-1.5 px-4" onclick="syncFromCloud().then(()=>render())">Şimdi Senkronize Et</button>
    </div>

    <div class="text-center">
      <button class="btn btn-gold" data-action="goStart">Testlere Dön</button>
    </div>
  </div>`;
}

// ============================================
// SINIF DETAY EKRANI
// ============================================
function screenClassDetail() {
  return `
  <div class="fade-in">
    <div class="mb-8"><button class="text-sm" style="color:var(--text-muted)" data-action="goProfile">\u2190 Profil</button></div>
    <div id="class-detail-content"><div class="flex justify-center p-8"><div class="spinner"></div></div></div>
  </div>`;
}

async function loadClassDetail(classId) {
  const container = document.getElementById('class-detail-content');
  if (!container) return;

  const classes = await getMyClasses();
  const cls = classes.find(c => c.id === classId);
  if (!cls) { container.innerHTML = '<p style="color:#f87171">Sınıf bulunamadı</p>'; return; }

  const students = await getClassStudents(classId);
  const results = await getClassResults(classId);

  const studentMap = {};
  for (const s of students) {
    studentMap[s.userId] = { name: s.displayName, tests: {} };
  }
  const seen = {};
  for (const r of results) {
    if (!studentMap[r.userId]) continue;
    const key = r.userId + '_' + r.testKey;
    if (seen[key]) continue;
    seen[key] = true;
    studentMap[r.userId].tests[r.testKey] = { tefrit: r.tefrit, fazilet: r.fazilet, ifrat: r.ifrat };
  }

  const testKeys = Object.keys(TESTS);
  const studentList = Object.entries(studentMap);

  const avgByTest = {};
  for (const key of testKeys) {
    let tS = 0, fS = 0, iS = 0, c = 0;
    for (const [, s] of studentList) {
      if (s.tests[key]) { tS += s.tests[key].tefrit; fS += s.tests[key].fazilet; iS += s.tests[key].ifrat; c++; }
    }
    if (c > 0) avgByTest[key] = { tefrit: Math.round(tS/c), fazilet: Math.round(fS/c), ifrat: Math.round(iS/c), count: c };
  }

  container.innerHTML = `
    <div class="card mb-6">
      <div class="flex justify-between items-center mb-2">
        <h2 class="font-display text-2xl font-bold" style="color:var(--gold)">${cls.name}</h2>
        <span class="text-xs px-3 py-1 rounded-full" style="background:rgba(212,175,55,0.1);color:var(--gold);border:1px solid var(--border-gold)">Kod: ${cls.joinCode}</span>
      </div>
      <p class="text-sm" style="color:var(--text-muted)">${studentList.length} öğrenci</p>
      <button class="btn btn-subtle text-xs py-1 px-3 mt-2" onclick="if(confirm('Sınıfı silmek istediğine emin misin?')){deleteClass('${cls.id}').then(()=>{S.screen='profile';render();setTimeout(loadTeacherClasses,100)})}">Sınıfı Sil</button>
    </div>

    ${Object.keys(avgByTest).length > 0 ? `
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-4" style="color:var(--gold)">Sınıf Ortalaması</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        ${testKeys.filter(k => avgByTest[k]).map(k => `
          <div class="p-3 rounded-lg" style="background:rgba(212,175,55,0.04);border:1px solid var(--border-gold)">
            <p class="text-xs font-bold mb-1" style="color:var(--gold-light)">${TESTS[k]?.concepts?.fazilet||k}</p>
            <div class="flex justify-between text-xs">
              <span class="text-tefrit">${avgByTest[k].tefrit}%</span>
              <span class="text-fazilet font-bold">${avgByTest[k].fazilet}%</span>
              <span class="text-ifrat">${avgByTest[k].ifrat}%</span>
            </div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <div class="card">
      <h3 class="font-display text-lg font-bold mb-4" style="color:var(--gold)">Öğrenciler</h3>
      ${studentList.length === 0 ? `<p class="text-sm" style="color:var(--text-muted)">Katılım kodunu paylaşın: <strong style="color:var(--gold)">${cls.joinCode}</strong></p>` :
      studentList.map(([uid, s]) => `
        <div class="p-3 mb-2 rounded-lg" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-gold)">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold" style="color:var(--text-primary)">${s.name}</p>
            <span class="text-xs" style="color:var(--text-muted)">${Object.keys(s.tests).length}/17</span>
          </div>
          ${Object.keys(s.tests).length > 0 ? `<div class="flex flex-wrap gap-1 mt-2">${Object.entries(s.tests).map(([k, v]) =>
            `<span class="text-xs px-2 py-0.5 rounded" style="background:rgba(52,211,153,0.1);color:var(--emerald-light)">${TESTS[k]?.concepts?.fazilet||k} ${v.fazilet}%</span>`
          ).join('')}</div>` : ''}
        </div>`).join('')}
    </div>`;
}

// ============================================
// ADMİN PANELİ EKRANI
// ============================================
function screenAdmin() {
  if (!isAdmin()) { S.screen = 'welcome'; render(); return ''; }
  return `
  <div class="fade-in">
    <div class="mb-8"><button class="text-sm" style="color:var(--text-muted)" data-action="goProfile">\u2190 Profil</button></div>
    <h1 class="font-display text-3xl font-bold mb-6" style="color:#f87171">Admin Paneli</h1>
    <div id="admin-content"><div class="flex justify-center p-8"><div class="spinner"></div></div></div>
  </div>`;
}

async function loadAdminPanel() {
  const container = document.getElementById('admin-content');
  if (!container) return;

  const [stats, users, classes] = await Promise.all([
    adminGetStats(),
    adminGetAllUsers(),
    adminGetAllClasses()
  ]);

  container.innerHTML = `
    <!-- İstatistikler -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <div class="card text-center" style="padding:1rem">
        <p class="text-2xl font-bold" style="color:var(--gold)">${stats.totalUsers}</p>
        <p class="text-xs" style="color:var(--text-muted)">Kullanıcı</p>
      </div>
      <div class="card text-center" style="padding:1rem">
        <p class="text-2xl font-bold" style="color:var(--emerald-light)">${stats.totalClasses}</p>
        <p class="text-xs" style="color:var(--text-muted)">Sınıf</p>
      </div>
      <div class="card text-center" style="padding:1rem">
        <p class="text-2xl font-bold" style="color:var(--gold-light)">${stats.totalResults}</p>
        <p class="text-xs" style="color:var(--text-muted)">Test Sonucu</p>
      </div>
      <div class="card text-center" style="padding:1rem">
        <p class="text-2xl font-bold" style="color:var(--text-primary)">${stats.roles?.teacher || 0}</p>
        <p class="text-xs" style="color:var(--text-muted)">Eğitimci</p>
      </div>
    </div>

    <!-- Roller -->
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-2" style="color:var(--gold)">Rol Dağılımı</h3>
      <div class="flex gap-4 text-sm" style="color:var(--text-secondary)">
        <span>Öğrenci: <strong>${stats.roles?.student || 0}</strong></span>
        <span>Eğitimci: <strong>${stats.roles?.teacher || 0}</strong></span>
        <span>Admin: <strong>${stats.roles?.admin || 0}</strong></span>
      </div>
    </div>

    <!-- Test Popülerliği -->
    ${stats.testCounts && Object.keys(stats.testCounts).length > 0 ? `
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-3" style="color:var(--gold)">Test Popülerliği</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${Object.entries(stats.testCounts).sort((a,b) => b[1]-a[1]).map(([k, v]) => `
          <div class="flex justify-between text-xs p-2 rounded" style="background:rgba(212,175,55,0.04);border:1px solid var(--border-gold)">
            <span style="color:var(--gold-light)">${TESTS[k]?.concepts?.fazilet || k}</span>
            <span style="color:var(--text-muted)">${v}</span>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <!-- Sınıflar -->
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-3" style="color:var(--gold)">Tüm Sınıflar (${classes.length})</h3>
      ${classes.length === 0 ? '<p class="text-xs" style="color:var(--text-muted)">Henüz sınıf yok</p>' :
      classes.map(c => `
        <div class="p-3 mb-2 rounded-lg" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-gold)">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm font-semibold" style="color:var(--gold-light)">${c.name}</p>
              <p class="text-xs" style="color:var(--text-muted)">Eğitimci: ${c.teacherName} \u2022 Kod: ${c.joinCode}</p>
            </div>
            <span class="text-xs px-2 py-0.5 rounded" style="background:rgba(52,211,153,0.1);color:var(--emerald-light)">${c.memberCount} öğrenci</span>
          </div>
        </div>`).join('')}
    </div>

    <!-- Kullanıcılar -->
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-3" style="color:var(--gold)">Tüm Kullanıcılar (${users.length})</h3>
      <div style="max-height:400px;overflow-y:auto">
      ${users.map(u => `
        <div class="p-3 mb-2 rounded-lg flex justify-between items-center" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-gold)">
          <div>
            <p class="text-sm font-semibold" style="color:var(--text-primary)">${u.displayName || 'İsimsiz'}</p>
            <p class="text-xs" style="color:var(--text-muted)">${u.email || ''}</p>
          </div>
          <div class="flex gap-2 items-center">
            <select onchange="adminSetUserRole('${u.id}',this.value).then(()=>loadAdminPanel())"
              style="font-size:0.7rem;padding:2px 6px;border-radius:4px;border:1px solid var(--border-gold);background:rgba(0,0,0,0.3);color:var(--text-primary);font-family:Inter,sans-serif">
              <option value="student" ${u.role==='student'?'selected':''}>Öğrenci</option>
              <option value="teacher" ${u.role==='teacher'?'selected':''}>Eğitimci</option>
              <option value="admin" ${u.role==='admin'?'selected':''}>Admin</option>
            </select>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
}

async function loadTeacherClasses() {
  const container = document.getElementById('class-list');
  if (!container) return;
  const classes = await getMyClasses();
  if (classes.length === 0) {
    container.innerHTML = '<p class="text-xs" style="color:var(--text-muted)">Henüz sınıf yok. Yukarıdan oluştur.</p>';
    return;
  }
  container.innerHTML = classes.map(c => `
    <div class="p-3 mb-2 rounded-lg" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-gold);cursor:pointer" data-action="viewClass" data-id="${c.id}">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold" style="color:var(--gold-light)">${c.name}</p>
        <span class="text-xs px-2 py-0.5 rounded" style="background:rgba(212,175,55,0.1);color:var(--gold)">Kod: ${c.joinCode}</span>
      </div>
    </div>`).join('');
}

async function loadStudentClasses() {
  const container = document.getElementById('my-classes-list');
  if (!container) return;
  const classes = await getMyClasses();
  if (classes.length === 0) return;
  container.innerHTML = '<h4 class="text-sm font-bold mb-2" style="color:var(--gold-light)">Sınıflarım</h4>' +
    classes.map(c => `<p class="text-xs mb-1" style="color:var(--text-secondary)">\u2022 ${c?.name || 'Sınıf'}</p>`).join('');
}
