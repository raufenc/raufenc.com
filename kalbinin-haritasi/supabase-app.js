// supabase-app.js — Auth, Senkronizasyon, Eğitimci Paneli
// Supabase proje bilgilerini buraya gir:
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_KEY';

let SB = null; // Supabase client
let currentUser = null;
let userProfile = null;

// ============================================
// BAŞLATMA
// ============================================
function initSupabase() {
  if (typeof supabase === 'undefined') return;
  try {
    SB = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    SB.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        currentUser = session.user;
        await loadProfile();
        await syncFromCloud();
        updateAuthUI();
      } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        userProfile = null;
        updateAuthUI();
      }
    });
    // Sayfa yüklenince mevcut oturumu kontrol et
    SB.auth.getUser().then(({ data }) => {
      if (data.user) {
        currentUser = data.user;
        loadProfile().then(() => updateAuthUI());
      } else {
        updateAuthUI();
      }
    });
  } catch (e) {
    console.warn('Supabase başlatılamadı:', e);
  }
}

// ============================================
// AUTH
// ============================================
async function signInWithGoogle() {
  if (!SB) return;
  await SB.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/kalbinin-haritasi/' }
  });
}

async function signInWithEmail(email, password) {
  if (!SB) return { error: 'Bağlantı yok' };
  const { data, error } = await SB.auth.signInWithPassword({ email, password });
  if (error && error.message.includes('Invalid login')) {
    // Hesap yok, kayıt ol
    const { data: d2, error: e2 } = await SB.auth.signUp({ email, password });
    return { data: d2, error: e2, isNewUser: true };
  }
  return { data, error };
}

async function signInWithMagicLink(email) {
  if (!SB) return { error: 'Bağlantı yok' };
  return await SB.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin + '/kalbinin-haritasi/' }
  });
}

async function signOutUser() {
  if (!SB) return;
  await SB.auth.signOut();
  currentUser = null;
  userProfile = null;
  updateAuthUI();
}

async function loadProfile() {
  if (!SB || !currentUser) return;
  const { data } = await SB.from('profiles').select('*').eq('id', currentUser.id).single();
  userProfile = data;
}

async function setRole(role) {
  if (!SB || !currentUser) return;
  await SB.from('profiles').update({ role }).eq('id', currentUser.id);
  userProfile.role = role;
}

// ============================================
// SENKRONİZASYON
// ============================================
async function syncToCloud(testKey, scores) {
  if (!SB || !currentUser) return;
  await SB.from('test_results').insert({
    user_id: currentUser.id,
    test_key: testKey,
    tefrit: scores.tefrit,
    fazilet: scores.fazilet,
    ifrat: scores.ifrat
  });
}

async function syncFromCloud() {
  if (!SB || !currentUser) return;
  const { data } = await SB.from('test_results')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('completed_at', { ascending: false });

  if (!data || data.length === 0) {
    // Bulutta veri yok → localStorage'ı buluta gönder
    await pushLocalToCloud();
    return;
  }

  // Buluttan gelen son sonuçları localStorage'a yaz
  const history = {};
  const seen = {};
  for (const row of data) {
    if (seen[row.test_key]) continue; // Her test için sadece son sonuç
    seen[row.test_key] = true;
    history[row.test_key] = {
      percentages: { tefrit: row.tefrit, fazilet: row.fazilet, ifrat: row.ifrat },
      geminiData: null
    };
  }

  // localStorage ile birleştir (bulut öncelikli)
  const local = JSON.parse(localStorage.getItem('ahlakHistory') || '{}');
  const merged = { ...local, ...history };
  localStorage.setItem('ahlakHistory', JSON.stringify(merged));
  S.history = merged;
}

async function pushLocalToCloud() {
  if (!SB || !currentUser) return;
  const local = JSON.parse(localStorage.getItem('ahlakHistory') || '{}');
  for (const [testKey, result] of Object.entries(local)) {
    if (!result.percentages) continue;
    await SB.from('test_results').insert({
      user_id: currentUser.id,
      test_key: testKey,
      tefrit: result.percentages.tefrit || 0,
      fazilet: result.percentages.fazilet || 0,
      ifrat: result.percentages.ifrat || 0
    });
  }
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
  if (!SB || !currentUser) return null;
  const join_code = generateJoinCode();
  const { data, error } = await SB.from('classes').insert({
    teacher_id: currentUser.id,
    name,
    join_code
  }).select().single();
  if (error) return null;
  return data;
}

async function getMyClasses() {
  if (!SB || !currentUser) return [];
  if (userProfile?.role === 'teacher') {
    const { data } = await SB.from('classes').select('*').eq('teacher_id', currentUser.id);
    return data || [];
  } else {
    const { data } = await SB.from('class_members').select('class_id, classes(*)').eq('user_id', currentUser.id);
    return (data || []).map(d => d.classes);
  }
}

async function joinClass(joinCode) {
  if (!SB || !currentUser) return { error: 'Giriş yapmalısın' };
  const { data: cls } = await SB.from('classes').select('id, name').eq('join_code', joinCode.toUpperCase()).single();
  if (!cls) return { error: 'Sınıf bulunamadı' };
  const { error } = await SB.from('class_members').insert({ class_id: cls.id, user_id: currentUser.id });
  if (error?.code === '23505') return { error: 'Zaten bu sınıftasın' };
  if (error) return { error: error.message };
  return { data: cls };
}

async function getClassStudents(classId) {
  if (!SB || !currentUser) return [];
  const { data } = await SB.from('class_members')
    .select('user_id, profiles(display_name)')
    .eq('class_id', classId);
  return data || [];
}

async function getClassResults(classId) {
  if (!SB || !currentUser) return [];
  const { data: members } = await SB.from('class_members').select('user_id').eq('class_id', classId);
  if (!members || members.length === 0) return [];
  const userIds = members.map(m => m.user_id);
  const { data } = await SB.from('test_results')
    .select('user_id, test_key, tefrit, fazilet, ifrat, completed_at, profiles:user_id(display_name)')
    .in('user_id', userIds)
    .order('completed_at', { ascending: false });
  return data || [];
}

async function deleteClass(classId) {
  if (!SB || !currentUser) return;
  await SB.from('classes').delete().eq('id', classId).eq('teacher_id', currentUser.id);
}

// ============================================
// AUTH UI
// ============================================
function updateAuthUI() {
  const btn = document.getElementById('auth-btn');
  if (!btn) return;
  if (currentUser) {
    const name = userProfile?.display_name || currentUser.email?.split('@')[0] || '';
    const initial = name.charAt(0).toUpperCase();
    btn.innerHTML = initial;
    btn.title = name;
    btn.style.background = 'linear-gradient(135deg, var(--gold-dark), var(--gold))';
    btn.style.color = '#0a0f1e';
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
    return;
  }
  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px)';
  modal.innerHTML = `
    <div class="card" style="max-width:400px;width:90%;position:relative">
      <button onclick="document.getElementById('auth-modal').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text-muted);font-size:20px;cursor:pointer">✕</button>
      <h2 class="font-display text-2xl font-bold mb-1" style="color:var(--gold)">Giriş Yap</h2>
      <p class="text-xs mb-6" style="color:var(--text-muted)">Sonuçlarını bulutta sakla, farklı cihazlarından eriş</p>

      <button onclick="signInWithGoogle()" class="btn btn-gold w-full mb-3" style="font-size:0.9rem">Google ile Giriş</button>

      <div class="divider"><span class="divider-icon">veya</span></div>

      <div id="auth-email-form">
        <input id="auth-email" type="email" placeholder="E-posta adresin"
          style="width:100%;padding:0.75rem 1rem;border-radius:0.5rem;border:1px solid var(--border-gold);background:rgba(0,0,0,0.2);color:var(--text-primary);font-size:0.9rem;margin-bottom:0.5rem;font-family:Inter,sans-serif" />
        <input id="auth-pass" type="password" placeholder="Şifre (opsiyonel — boş bırakırsan link gelir)"
          style="width:100%;padding:0.75rem 1rem;border-radius:0.5rem;border:1px solid var(--border-gold);background:rgba(0,0,0,0.2);color:var(--text-primary);font-size:0.9rem;margin-bottom:0.75rem;font-family:Inter,sans-serif" />
        <button onclick="handleEmailAuth()" class="btn btn-emerald w-full" style="font-size:0.9rem">Devam Et</button>
        <p id="auth-msg" class="text-xs mt-3 text-center" style="color:var(--text-muted)"></p>
      </div>
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
    msg.textContent = error ? error.message : 'E-postanı kontrol et — giriş linki gönderdik!';
    msg.style.color = error ? '#f87171' : 'var(--emerald-light)';
  } else {
    msg.textContent = 'Giriş yapılıyor...';
    const { error, isNewUser } = await signInWithEmail(email, pass);
    if (error) {
      msg.textContent = error.message || error;
      msg.style.color = '#f87171';
    } else {
      msg.textContent = isNewUser ? 'Hesap oluşturuldu! E-postanı onayla.' : 'Giriş başarılı!';
      msg.style.color = 'var(--emerald-light)';
      if (!isNewUser) setTimeout(() => document.getElementById('auth-modal')?.remove(), 800);
    }
  }
}

// ============================================
// PROFİL EKRANI
// ============================================
function screenProfile() {
  if (!currentUser) { S.screen = 'welcome'; render(); return ''; }
  const name = userProfile?.display_name || '';
  const email = currentUser.email || '';
  const role = userProfile?.role || 'student';
  const isTeacher = role === 'teacher';

  return `
  <div class="fade-in">
    <div class="mb-8"><button class="text-sm" style="color:var(--text-muted)" data-action="goWelcome">← Ana Sayfa</button></div>

    <div class="card mb-6">
      <div class="flex items-center gap-4 mb-4">
        <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--gold-dark),var(--gold));display:flex;align-items:center;justify-content:center;font-size:1.25rem;font-weight:700;color:#0a0f1e">${name.charAt(0).toUpperCase()}</div>
        <div>
          <h2 class="font-display text-xl font-bold" style="color:var(--gold)">${name}</h2>
          <p class="text-xs" style="color:var(--text-muted)">${email}</p>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button class="btn btn-ghost text-xs py-1.5 px-4" onclick="setRole('${isTeacher ? 'student' : 'teacher'}').then(()=>{render()})">
          ${isTeacher ? 'Öğrenci moduna geç' : 'Eğitimci moduna geç'}
        </button>
        <button class="btn btn-subtle text-xs py-1.5 px-4" onclick="signOutUser().then(()=>{S.screen='welcome';render()})">Çıkış Yap</button>
      </div>
    </div>

    ${isTeacher ? `
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
        <input id="join-code-input" type="text" placeholder="Katılım kodu (örn: AHL-K7M)" maxlength="6"
          style="flex:1;padding:0.6rem 0.8rem;border-radius:0.5rem;border:1px solid var(--border-gold);background:rgba(0,0,0,0.2);color:var(--text-primary);font-size:0.85rem;font-family:Inter,sans-serif;text-transform:uppercase;letter-spacing:0.1em" />
        <button class="btn btn-emerald text-xs py-1.5 px-4" data-action="joinClass">Katıl</button>
      </div>
      <p id="join-msg" class="text-xs" style="color:var(--text-muted)"></p>
      <div id="my-classes-list" class="mt-4"></div>
    </div>`}

    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-3" style="color:var(--gold)">Bulut Senkronizasyonu</h3>
      <p class="text-sm mb-3" style="color:var(--text-secondary)">Sonuçların otomatik olarak bulutta saklanıyor. Farklı cihazlarından giriş yaparak erişebilirsin.</p>
      <button class="btn btn-ghost text-xs py-1.5 px-4" onclick="syncFromCloud().then(()=>{render()})">Şimdi Senkronize Et</button>
    </div>

    <div class="text-center">
      <button class="btn btn-gold" data-action="goStart">Testlere Dön</button>
    </div>
  </div>`;
}

// ============================================
// EĞİTİMCİ — SINIF DETAY EKRANI
// ============================================
function screenClassDetail() {
  return `
  <div class="fade-in">
    <div class="mb-8"><button class="text-sm" style="color:var(--text-muted)" data-action="goProfile">← Profil</button></div>
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

  // Her öğrencinin son sonuçlarını grupla
  const studentMap = {};
  for (const s of students) {
    studentMap[s.user_id] = {
      name: s.profiles?.display_name || 'İsimsiz',
      tests: {}
    };
  }
  for (const r of results) {
    if (!studentMap[r.user_id]) continue;
    if (!studentMap[r.user_id].tests[r.test_key]) {
      studentMap[r.user_id].tests[r.test_key] = { tefrit: r.tefrit, fazilet: r.fazilet, ifrat: r.ifrat };
    }
  }

  const testKeys = Object.keys(TESTS);
  const studentList = Object.entries(studentMap);

  // Sınıf ortalaması hesapla
  const avgByTest = {};
  for (const key of testKeys) {
    let tSum = 0, fSum = 0, iSum = 0, count = 0;
    for (const [, s] of studentList) {
      if (s.tests[key]) {
        tSum += s.tests[key].tefrit; fSum += s.tests[key].fazilet; iSum += s.tests[key].ifrat;
        count++;
      }
    }
    if (count > 0) avgByTest[key] = { tefrit: Math.round(tSum/count), fazilet: Math.round(fSum/count), ifrat: Math.round(iSum/count), count };
  }

  container.innerHTML = `
    <div class="card mb-6">
      <div class="flex justify-between items-center mb-2">
        <h2 class="font-display text-2xl font-bold" style="color:var(--gold)">${cls.name}</h2>
        <span class="text-xs px-3 py-1 rounded-full" style="background:rgba(212,175,55,0.1);color:var(--gold);border:1px solid var(--border-gold)">Kod: ${cls.join_code}</span>
      </div>
      <p class="text-sm" style="color:var(--text-muted)">${studentList.length} öğrenci</p>
    </div>

    ${Object.keys(avgByTest).length > 0 ? `
    <div class="card mb-6">
      <h3 class="font-display text-lg font-bold mb-4" style="color:var(--gold)">Sınıf Ortalaması</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        ${testKeys.filter(k => avgByTest[k]).map(k => `
          <div class="p-3 rounded-lg" style="background:rgba(212,175,55,0.04);border:1px solid var(--border-gold)">
            <p class="text-xs font-bold mb-1" style="color:var(--gold-light)">${TESTS[k].concepts.fazilet}</p>
            <div class="flex justify-between text-xs">
              <span class="text-tefrit">${avgByTest[k].tefrit}%</span>
              <span class="text-fazilet font-bold">${avgByTest[k].fazilet}%</span>
              <span class="text-ifrat">${avgByTest[k].ifrat}%</span>
            </div>
            <p class="text-xs mt-1" style="color:var(--text-muted)">${avgByTest[k].count} öğrenci</p>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <div class="card">
      <h3 class="font-display text-lg font-bold mb-4" style="color:var(--gold)">Öğrenciler</h3>
      ${studentList.length === 0 ? '<p class="text-sm" style="color:var(--text-muted)">Henüz kimse katılmadı. Katılım kodunu paylaşın: <strong style="color:var(--gold)">' + cls.join_code + '</strong></p>' :
      studentList.map(([uid, s]) => {
        const testCount = Object.keys(s.tests).length;
        return `
        <div class="p-3 mb-2 rounded-lg" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-gold)">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold" style="color:var(--text-primary)">${s.name}</p>
            <span class="text-xs" style="color:var(--text-muted)">${testCount}/17 test</span>
          </div>
          ${testCount > 0 ? `<div class="flex flex-wrap gap-2 mt-2">${Object.entries(s.tests).map(([k, v]) =>
            `<span class="text-xs px-2 py-0.5 rounded" style="background:rgba(52,211,153,0.1);color:var(--emerald-light)">${TESTS[k]?.concepts?.fazilet || k} ${v.fazilet}%</span>`
          ).join('')}</div>` : ''}
        </div>`;
      }).join('')}
    </div>`;
}

async function loadTeacherClasses() {
  const container = document.getElementById('class-list');
  if (!container) return;
  const classes = await getMyClasses();
  if (classes.length === 0) {
    container.innerHTML = '<p class="text-xs" style="color:var(--text-muted)">Henüz sınıf oluşturmadınız.</p>';
    return;
  }
  container.innerHTML = classes.map(c => `
    <div class="p-3 mb-2 rounded-lg" style="background:rgba(0,0,0,0.15);border:1px solid var(--border-gold);cursor:pointer" data-action="viewClass" data-id="${c.id}">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold" style="color:var(--gold-light)">${c.name}</p>
        <span class="text-xs px-2 py-0.5 rounded" style="background:rgba(212,175,55,0.1);color:var(--gold)">Kod: ${c.join_code}</span>
      </div>
    </div>`).join('');
}

async function loadStudentClasses() {
  const container = document.getElementById('my-classes-list');
  if (!container) return;
  const classes = await getMyClasses();
  if (classes.length === 0) return;
  container.innerHTML = '<h4 class="text-sm font-bold mb-2" style="color:var(--gold-light)">Sınıflarım</h4>' +
    classes.map(c => `<p class="text-xs mb-1" style="color:var(--text-secondary)">• ${c?.name || 'Sınıf'}</p>`).join('');
}
