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
  // --- Günlük öğrenme akışı ---
  'gunluk':         renderGunluk,
  'gunluk-oyrenme': renderGunlukOyrenme,
  'gunluk-mola':    renderGunlukMola,
  'gunluk-ozet':    renderGunlukOzet,
  // --- Veli detay ---
  'veli-ders':      renderVeliDersDetay,
  // --- Admin ---
  'admin':          renderAdmin,
  'admin-ogrenci':  renderAdminOgrenci,
  // --- Veli Portalı (şifresiz, veli kodu ile) ---
  'veli-portal':    renderVeliPortal,
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
  // Veli panelinden / portalından ayrılınca gerçek zamanlı dinleyiciyi durdur
  if (window._veliPanelActive) {
    window._veliPanelActive = false;
    if (window.FirebaseService?.stopVeliListener) FirebaseService.stopVeliListener();
  }
  if (window._veliPortalActive) {
    window._veliPortalActive = false;
    if (window.FirebaseService?.stopVeliListener) FirebaseService.stopVeliListener();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  if (window.FirebaseService) FirebaseService.init();
  router();
});

// ========== HELPERS ==========
function requireLogin() {
  if (!Store.isLoggedIn()) { navigate('#/giris'); return true; }
  Store.recordActivity();
  return false;
}

function requireAdmin() {
  if (!Store.isLoggedIn()) { navigate('#/giris'); return true; }
  if (Store.getProfile()?.role !== 'admin') { navigate('#/anasayfa'); return true; }
  return false;
}

window.appLogout = async function() {
  if (!confirm('Çıkış yapmak istediğine emin misin?')) return;
  if (window.FirebaseService) await FirebaseService.signOut();
  else Store.logout();
  navigate('#/');
};

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
          ${window.FirebaseService?.getCurrentUser() ? '<span class="nav-sync" title="Bulut senkronize">☁️</span>' : ''}
          <button class="btn-icon" onclick="navigate('#/anasayfa')">🏠</button>
          <button class="btn-icon nav-logout" title="Çıkış" onclick="appLogout()">⏻</button>
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
        <div class="hero-mascot"><img src="assets/mascot.svg" alt="Maskot" class="mascot-img"></div>
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
const ADMIN_CODE = 'ADMIN2026';

function renderGiris() {
  if (Store.isLoggedIn()) {
    const role = Store.getProfile()?.role;
    navigate(role === 'admin' ? '#/admin' : role === 'veli' ? '#/veli' : '#/anasayfa');
    return;
  }

  const fbConfigured = window.FirebaseService && window.FirebaseService.isConfigured();

  app.innerHTML = `
    ${topNavHTML(true, 'Giriş')}
    <div class="page-center">
      <div class="card card-form">
        <div class="form-mascot"><img src="assets/mascot.svg" alt="Maskot" class="mascot-img-sm"></div>
        <h2>Hoş Geldin!</h2>

        ${fbConfigured ? `
          <!-- Giriş/Kayıt Sekmeleri -->
          <div class="auth-tabs" id="authTabs">
            <button class="auth-tab active" id="tabLogin" onclick="girisToggleTab('login')">Giriş Yap</button>
            <button class="auth-tab" id="tabRegister" onclick="girisToggleTab('register')">Kayıt Ol</button>
          </div>

          <!-- Rol Seçimi -->
          <div class="role-selector" id="roleSelector">
            <button class="role-btn active" id="roleOgrenci" onclick="girisToggleRole('ogrenci')">👤 Öğrenci</button>
            <button class="role-btn" id="roleVeli" onclick="girisToggleRole('veli')">👨‍👩‍👧 Veli</button>
            <button class="role-btn" id="roleAdmin" onclick="girisToggleRole('admin')">🔑 Admin</button>
          </div>

          <!-- Admin Kodu (sadece admin rolünde görünür) -->
          <div class="form-group hidden" id="adminCodeGroup">
            <label>Admin Kodu</label>
            <input type="password" id="adminCode" placeholder="Admin erişim kodu" maxlength="20">
          </div>

          <!-- Firebase Giriş Formu -->
          <form id="fbForm">
            <div class="form-group hidden" id="nameGroup">
              <label>Ad Soyad</label>
              <input type="text" id="fbName" placeholder="Adın ve soyadın" maxlength="40">
            </div>
            <div class="form-group">
              <label>E-posta</label>
              <input type="email" id="fbEmail" placeholder="eposta@ornek.com" required>
            </div>
            <div class="form-group">
              <label>Şifre</label>
              <input type="password" id="fbPass" placeholder="En az 6 karakter" required minlength="6">
            </div>
            <div id="fbError" class="form-error hidden"></div>
            <button type="submit" id="fbSubmit" class="btn btn-primary btn-lg btn-full">Giriş Yap</button>
          </form>

          <div class="divider"><span>veya</span></div>
          <p class="veli-portal-link-hint">Veli misiniz? <a href="#/veli-portal" class="btn-link">Veli Portalı →</a></p>
        ` : `
          <!-- Firebase yapılandırılmamışsa çevrimdışı form -->
          <p class="offline-notice">⚠️ Firebase yapılandırılmamış — çevrimdışı mod</p>
        `}

        <!-- Çevrimdışı / Hızlı Başlangıç (her zaman mevcut, Firebase varsa ikincil) -->
        <form id="girisForm" ${fbConfigured ? 'style="margin-top:0"' : ''}>
          ${fbConfigured ? '<p class="offline-label">Hesapsız hızlı başla (demo)</p>' : '<p>Hadi seni tanıyalım</p>'}
          <div class="form-group">
            <label>Öğrenci Adı</label>
            <input type="text" id="ogrenciAdi" placeholder="Adını yaz..." required maxlength="30">
          </div>
          ${!fbConfigured ? `<div class="form-group"><label>Veli Adı (isteğe bağlı)</label><input type="text" id="veliAdi" placeholder="Anne/Baba adı" maxlength="30"></div>` : ''}
          <button type="submit" class="btn ${fbConfigured ? 'btn-outline' : 'btn-primary'} btn-lg btn-full">
            ${fbConfigured ? '⚡ Hızlı Başla' : 'Başlayalım! 🎉'}
          </button>
        </form>
      </div>
    </div>
  `;

  // Çevrimdışı form
  document.getElementById('girisForm').onsubmit = (e) => {
    e.preventDefault();
    const ad = document.getElementById('ogrenciAdi').value.trim();
    if (!ad) return;
    const veliEl = document.getElementById('veliAdi');
    Store.setProfile({ name: ad, parentName: veliEl ? veliEl.value.trim() : '', role: 'ogrenci' });
    Store.startSession();
    navigate('#/mod-sec');
  };

  // Firebase form (sadece config varsa)
  if (fbConfigured) {
    let _role = 'ogrenci';
    let _tab  = 'login';

    window.girisToggleRole = (role) => {
      _role = role;
      ['ogrenci', 'veli', 'admin'].forEach(r => {
        document.getElementById('role' + r.charAt(0).toUpperCase() + r.slice(1))?.classList.toggle('active', r === role);
      });
      // Admin kodu alanını göster/gizle
      document.getElementById('adminCodeGroup').classList.toggle('hidden', role !== 'admin');
    };

    window.girisToggleTab = (tab) => {
      _tab = tab;
      document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
      document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
      document.getElementById('nameGroup').classList.toggle('hidden', tab !== 'register');
      document.getElementById('fbSubmit').textContent = tab === 'register' ? 'Kayıt Ol 🎉' : 'Giriş Yap';
    };

    document.getElementById('fbForm').onsubmit = async (e) => {
      e.preventDefault();
      const email    = document.getElementById('fbEmail').value.trim();
      const pass     = document.getElementById('fbPass').value;
      const name     = document.getElementById('fbName')?.value.trim() || '';
      const errEl    = document.getElementById('fbError');
      const btn      = document.getElementById('fbSubmit');
      const aCode    = document.getElementById('adminCode')?.value.trim() || '';

      // Admin kodu doğrulama
      if (_role === 'admin' && aCode !== ADMIN_CODE) {
        errEl.textContent = 'Admin kodu hatalı.';
        errEl.classList.remove('hidden');
        return;
      }

      errEl.classList.add('hidden');
      btn.disabled = true;
      btn.textContent = 'Lütfen bekle...';

      try {
        let cred;
        if (_tab === 'register') {
          cred = await FirebaseService.signUpEmail(email, pass, name);
          Store.setProfile({ name: name || email.split('@')[0], email, role: _role, uid: cred.user.uid });
        } else {
          cred = await FirebaseService.signInEmail(email, pass);
          // Profile will be loaded from Firestore by _onFirebaseSignIn
          // Override role if admin code was entered
          window._pendingRole = _role === 'admin' ? 'admin' : null;
        }
        Store.startSession();
        // Navigation handled by _onFirebaseSignIn callback after data pull
      } catch (err) {
        btn.disabled = false;
        btn.textContent = _tab === 'register' ? 'Kayıt Ol 🎉' : 'Giriş Yap';
        errEl.textContent = _fbErrorMessage(err.code);
        errEl.classList.remove('hidden');
      }
    };

    // Firebase sign-in callback (global — diğer sayfalardan da tetiklenebilir)
    window._onFirebaseSignIn = (user) => {
      let profile = Store.getProfile();
      if (!profile) {
        // İlk giriş — profil oluştur
        const role = window._pendingRole || 'ogrenci';
        window._pendingRole = null;
        Store.setProfile({ name: user.displayName || user.email.split('@')[0], email: user.email, role, uid: user.uid });
        profile = Store.getProfile();
      } else if (window._pendingRole) {
        // Mevcut hesap admin koduyla açıldı — rolü güncelle
        Store.setProfile({ ...profile, role: window._pendingRole });
        profile = Store.getProfile();
        window._pendingRole = null;
      }
      Store.startSession();
      const role = profile?.role;
      if (role === 'admin')    navigate('#/admin');
      else if (role === 'veli') navigate('#/veli');
      else                      navigate(profile?.xp > 0 ? '#/anasayfa' : '#/mod-sec');
    };
  }
}

function _fbErrorMessage(code) {
  const msgs = {
    'auth/user-not-found': 'Bu e-posta ile kayıtlı hesap bulunamadı.',
    'auth/wrong-password': 'Şifre hatalı.',
    'auth/email-already-in-use': 'Bu e-posta zaten kullanımda.',
    'auth/weak-password': 'Şifre en az 6 karakter olmalı.',
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/too-many-requests': 'Çok fazla deneme. Lütfen biraz bekleyin.',
    'auth/network-request-failed': 'İnternet bağlantısı yok.',
  };
  return msgs[code] || 'Bir hata oluştu. Tekrar deneyin.';
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
      ${(() => {
        const session = Store.getDailySession();
        const allDone = session && session.completed.every(Boolean);
        const inProgress = session && !allDone && (session.currentIndex > 0 || session.completed.some(Boolean));
        if (allDone) {
          return `<div class="quest-card quest-card-done">
            <div class="quest-badge">🌟 Bugün Tamamlandı</div>
            <h3>Harika çalıştın! Yarın devam ederiz.</h3>
            <button class="btn btn-outline" onclick="navigate('#/dersler')">Serbest Çalışma →</button>
          </div>`;
        } else if (inProgress) {
          const doneCount = session.completed.filter(Boolean).length;
          return `<div class="quest-card quest-card-resume">
            <div class="quest-badge">▶ Devam Et</div>
            <h3>Günlük öğrenmen yarım kaldı (${doneCount}/3)</h3>
            <button class="btn btn-primary gunluk-cta-btn" onclick="navigate('#/gunluk')">Kaldığın Yerden Devam Et →</button>
          </div>`;
        } else {
          return `<div class="quest-card quest-card-new">
            <div class="quest-badge">🎯 Günlük Öğrenme</div>
            <h3>Bugün 3 dersten yeni konular seni bekliyor!</h3>
            <button class="btn btn-primary gunluk-cta-btn" onclick="navigate('#/gunluk')">Başla 🚀</button>
            ${reviews.length > 0 ? `<button class="btn btn-outline" onclick="navigate('#/tekrar')">📋 ${reviews.length} tekrar kartın var</button>` : ''}
          </div>`;
        }
      })()}
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
    videoId: unite.videoId || null,
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

  // Use single video ID if available, otherwise first video from playlist
  const videoId = window._quizState?.videoId;

  const playerConfig = {
    width: '100%',
    height: '100%',
    playerVars: {
      playsinline: 1,
      enablejsapi: 1,
      rel: 0,
      modestbranding: 1,
      origin: window.location.origin
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  };

  if (videoId) {
    playerConfig.videoId = videoId;
  } else {
    playerConfig.playerVars.list = playlistId;
    playerConfig.playerVars.listType = 'playlist';
  }

  _ytPlayer = new YT.Player('ytPlayerContainer', playerConfig);
}

function onPlayerReady(event) {
  console.log('YT Player ready');
  // Show play overlay — user must click to start (browser autoplay policy)
  showPlayOverlay();
  startCheckpointMonitor();
}

function onPlayerStateChange(event) {
  if (event.data === 1) { // PLAYING
    hidePlayOverlay();
    startCheckpointMonitor();
  } else if (event.data === 0) { // ENDED
    stopCheckpointMonitor();
    fireFinCheckpoint();
  } else if (event.data === 2) { // PAUSED (not by checkpoint)
    if (!window._quizState?.quizActive) {
      stopCheckpointMonitor();
    }
  }
}

function showPlayOverlay() {
  const wrapper = document.querySelector('.video-wrapper');
  if (!wrapper || document.getElementById('playOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'playOverlay';
  overlay.className = 'play-overlay';
  // Karikatür intro resmi
  const state = window._quizState;
  const unite = state ? getUnite(state.dersSlug, state.uniteSlug) : null;
  const introImg = unite?.mascotImages?.intro;
  overlay.innerHTML = `
    ${introImg ? `<img src="${introImg}" alt="Ders tanıtımı" class="mascot-cover">` : ''}
    <button class="play-overlay-btn" onclick="startVideo()">▶ Videoyu Başlat</button>
  `;
  wrapper.appendChild(overlay);
}

function hidePlayOverlay() {
  const overlay = document.getElementById('playOverlay');
  if (overlay) overlay.remove();
}

window.startVideo = function() {
  hidePlayOverlay();
  if (_ytPlayer && _ytPlayer.playVideo) {
    _ytPlayer.playVideo();
  }
  // If video doesn't start within 3s, show a hint
  setTimeout(() => {
    if (_ytPlayer && _ytPlayer.getPlayerState && _ytPlayer.getPlayerState() !== 1) {
      const controls = document.querySelector('.player-controls');
      if (controls && !document.getElementById('playHint')) {
        const hint = document.createElement('span');
        hint.id = 'playHint';
        hint.className = 'play-hint';
        hint.textContent = '👆 Video başlamadıysa yukarıdaki ▶ butonuna tıklayın';
        controls.appendChild(hint);
      }
    }
  }, 3000);
};

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
    if (cp.saniye === 'fin') continue; // 'fin' sorusu sadece video bitince tetiklenir
    if (!_firedCheckpoints.has(i) && currentTime >= cp.saniye && currentTime <= cp.saniye + 3) {
      _firedCheckpoints.add(i);
      state.currentCheckpoint = i;
      triggerCheckpoint(i);
      break;
    }
  }
}

function fireFinCheckpoint() {
  const state = window._quizState;
  if (!state || state.quizActive) return;
  for (let i = 0; i < state.checkpoints.length; i++) {
    if (!_firedCheckpoints.has(i) && state.checkpoints[i].saniye === 'fin') {
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
  window._answerStartTime = Date.now(); // cevap süresi ölçümü

  // Pause video
  if (_ytPlayer && _ytPlayer.pauseVideo) _ytPlayer.pauseVideo();

  const cp = state.checkpoints[idx];
  document.getElementById('quizOverlay').classList.remove('hidden');
  document.getElementById('quizProgress').textContent = `Soru ${idx + 1} / ${state.checkpoints.length}`;
  // Break karikatürünü sadece ortadaki soruda göster
  const unite = getUnite(state.dersSlug, state.uniteSlug);
  const breakImg = unite?.mascotImages?.break;
  const midIdx = Math.floor(state.checkpoints.length / 2);
  const showBreakImg = breakImg && (idx === midIdx);

  document.getElementById('quizContent').innerHTML = `
    ${showBreakImg ? `<img src="${breakImg}" class="mascot-img-break" alt="Mola">` : ''}
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
  const ipucuKullanildi = !document.getElementById('hintBox')?.classList.contains('hidden');
  if (ipucuKullanildi) window._hintsUsedThisSession = (window._hintsUsedThisSession || 0) + 1;

  // Detaylı cevap kaydı (360° takip)
  const sure = window._answerStartTime ? (Date.now() - window._answerStartTime) / 1000 : null;
  window._answerStartTime = null;
  Store.recordAnswer(state.dersSlug, state.uniteSlug, {
    saniye: cp.saniye,
    soru: cp.soru,
    secilen: ansIdx,
    dogru: cp.dogru,
    dogruMu: correct,
    ipucuKullandiMi: ipucuKullanildi,
    sure,
    tarih: new Date().toISOString(),
  });

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

  // Show feedback + doğru cevapta küçük karikatür
  const uniteForFeedback = getUnite(state.dersSlug, state.uniteSlug);
  const outroImg = uniteForFeedback?.mascotImages?.outro;
  const celebrateHtml = (correct && outroImg) ? `<img src="${outroImg}" class="mascot-img-celebrate" alt="Tebrikler!">` : '';
  const feedbackHTML = `
    ${celebrateHtml}
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
        ${unite.mascotImages?.outro ? `<div class="mascot-completion"><img src="${unite.mascotImages.outro}" class="mascot-img-completion" alt="Ders tamamlandı!"></div>` : ''}
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

// ========== GÜNLÜK ÖĞRENME ==========

const MOLA_MESAJLARI = [
  'Harika gidiyorsun! Her öğrenilen şey bir adım ileri! 🚀',
  'Beynin şu an yeni bilgiler kaydediyor, inan bana! 🧠',
  'Bir dersi bitirdin! Sıradakine hazır mısın? 💪',
  'Serinle bu gün daha da uzuyor! Devam et! 🔥',
  'Öğrenmek süper güç — ve sen onu kullanıyorsun! ⚡',
];

function gunlukStepperHTML(session) {
  return `<div class="gunluk-mini-stepper">
    ${session.subjectsToday.map((slug, i) => {
      const ders = getDers(slug);
      const done = session.completed[i];
      const active = i === session.currentIndex && !done;
      return `<div class="gms-step ${done ? 'gms-done' : active ? 'gms-active' : 'gms-pending'}">
        <div class="gms-circle">${done ? '✓' : ders ? ders.icon : '?'}</div>
        <span class="gms-label">${i + 1}/${session.subjectsToday.length}</span>
      </div>`;
    }).join('<div class="gms-line"></div>')}
  </div>`;
}

function renderGunluk() {
  if (requireLogin()) return;

  let session = Store.getDailySession();
  const allDone = session && session.completed.every(Boolean);

  if (allDone) {
    // Bugün tamamlandı
    const report = Store.getTodayReport();
    app.innerHTML = `
      ${topNavHTML(true, 'Günlük Öğrenme')}
      <div class="page-center">
        <div class="gunluk-done-card">
          <div class="confetti-container" id="confetti"></div>
          <div class="gunluk-done-icon">🌟</div>
          <h2>Bugün harika çalıştın!</h2>
          <p>Yarın yeni dersler seni bekliyor.</p>
          ${report ? `<div class="gunluk-ozet-stats">
            <div class="gos-item"><span class="gos-val">${report.completedCount}/3</span><span class="gos-label">Ders</span></div>
            <div class="gos-item"><span class="gos-val">${report.correctAnswers}/${report.totalQuestions}</span><span class="gos-label">Doğru</span></div>
            <div class="gos-item"><span class="gos-val">+${report.xpEarned}</span><span class="gos-label">XP</span></div>
          </div>` : ''}
          <div class="gunluk-done-actions">
            <button class="btn btn-primary btn-lg" onclick="navigate('#/anasayfa')">Ana Sayfaya Dön</button>
            <button class="btn btn-outline" onclick="navigate('#/dersler')">Serbest Çalışma →</button>
          </div>
        </div>
      </div>`;
    setTimeout(createConfetti, 200);
    return;
  }

  if (!session) session = Store.initDailySession();

  const isResume = session.currentIndex > 0 || session.completed.some(Boolean);

  app.innerHTML = `
    ${topNavHTML(true, 'Günlük Öğrenme')}
    <div class="page-container">
      <div class="gunluk-header">
        <div class="gunluk-header-icon">🎯</div>
        <div>
          <h2>${isResume ? 'Kaldığın Yerden Devam Et' : 'Bugünkü Öğrenme Planın'}</h2>
          <p>Her gün 3 farklı dersten ilerle</p>
        </div>
      </div>

      <div class="gunluk-stepper">
        ${session.subjectsToday.map((slug, i) => {
          const ders = getDers(slug);
          const unite = getUnite(slug, session.unitesToday[i]);
          const done = session.completed[i];
          const active = i === session.currentIndex;
          return `<div class="gs-item ${done ? 'gs-done' : active ? 'gs-active' : 'gs-pending'}">
            <div class="gs-circle" style="${ders ? `--step-color:${ders.color}` : ''}">${done ? '✓' : ders ? ders.icon : '?'}</div>
            <div class="gs-info">
              <span class="gs-ders">${ders ? ders.name : slug}</span>
              <span class="gs-unite">${unite ? unite.name : ''}</span>
            </div>
            ${done ? '<span class="gs-badge">Tamamlandı ✓</span>' : active ? '<span class="gs-badge gs-badge-active">Sırada →</span>' : ''}
          </div>`;
        }).join('')}
      </div>

      <button class="btn btn-primary btn-lg btn-full gunluk-cta"
        onclick="navigate('#/gunluk-oyrenme/${session.currentIndex}')">
        ${isResume ? `Devam Et (${session.completed.filter(Boolean).length}/3) →` : 'Başlayalım! 🚀'}
      </button>
      <button class="btn btn-outline btn-full" onclick="navigate('#/anasayfa')">Şimdi Değil</button>
    </div>`;
}

function renderGunlukOyrenme(params) {
  if (requireLogin()) return;

  const idx = parseInt(params[0] || '0', 10);
  const session = Store.getDailySession();
  if (!session) { navigate('#/gunluk'); return; }
  if (session.completed[idx]) { navigate('#/gunluk'); return; }

  const dersSlug  = session.subjectsToday[idx];
  const uniteSlug = session.unitesToday[idx];
  const ders  = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  if (!ders || !unite) { navigate('#/gunluk'); return; }

  const checkpoints = unite.checkpoints || [];
  window._gunlukIdx = idx;
  window._answerStartTime = null;
  window._hintsUsedThisSession = 0;

  app.innerHTML = `
    ${topNavHTML(false, '')}
    <div class="player-page">
      ${gunlukStepperHTML(session)}
      <div class="player-layout">
        <div class="player-video">
          <div class="video-wrapper"><div id="ytPlayerContainer"></div></div>
          <div class="player-controls">
            <span class="source-badge">📺 ${ders.playlists[0].kanal}</span>
            <span class="player-info">${unite.name}</span>
          </div>
        </div>
        <div class="player-sidebar">
          <div class="hedef-card" style="border-color:${ders.color}">
            <h4>${ders.icon} ${ders.name}</h4>
            <p>${unite.hedef}</p>
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
          <button class="btn btn-primary btn-full" id="btnComplete" disabled onclick="completeGunlukLesson(${idx})">
            Dersi Tamamla →
          </button>
          <p class="complete-hint" id="completeHint">Soruları yanıtladıktan sonra aktif olur</p>
          <button class="btn btn-outline btn-full gunluk-exit-btn" onclick="gunlukEarlyExit()">
            Bugünlük Tamam
          </button>
        </div>
      </div>
    </div>
    <div id="quizOverlay" class="quiz-overlay hidden">
      <div class="quiz-modal">
        <div class="quiz-header"><h3>Bir bakalım, anladın mı? 🤔</h3><span id="quizProgress"></span></div>
        <div id="quizContent"></div>
      </div>
    </div>`;

  window._quizState = {
    dersSlug, uniteSlug, checkpoints,
    videoId: unite.videoId || null,
    currentCheckpoint: 0, score: 0, totalAnswered: 0,
    quizActive: false,
    isGunluk: true,
    gunlukIdx: idx,
  };

  initYouTubePlayer(ders.playlists[0].id);
}

window.completeGunlukLesson = function(idx) {
  const session = Store.getDailySession();
  if (!session) return;

  const dersSlug  = session.subjectsToday[idx];
  const uniteSlug = session.unitesToday[idx];
  const ders  = getDers(dersSlug);
  const unite = getUnite(dersSlug, uniteSlug);
  const state = window._quizState || {};

  // İlerlemeyi kaydet
  if (!Store.getLessonProgress(dersSlug, uniteSlug).completed) {
    Store.setLessonProgress(dersSlug, uniteSlug, { completed: true });
    Store.addXP(50);
    const dueDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    Store.addReview({ dersSlug, uniteSlug, dersName: ders.name, uniteName: unite.name, dueDate, intervalIdx: 0 });
  }
  Store.recordActivity();
  updateNavXP();

  // Oturumu güncelle
  const newCompleted = [...session.completed];
  newCompleted[idx] = true;
  const nextIdx = newCompleted.findIndex(c => !c);
  const totalCorrect  = (session.correctAnswers || 0) + (state.score || 0);
  const totalQuestions = (session.totalQuestions || 0) + (state.checkpoints?.length || 0);
  const xpEarned = (session.xpEarned || 0) + 50 + (state.score || 0) * 10;

  Store.updateDailySession({
    completed: newCompleted,
    currentIndex: nextIdx >= 0 ? nextIdx : idx,
    correctAnswers: totalCorrect,
    totalQuestions,
    xpEarned,
  });

  // Hepsi tamam mı?
  if (newCompleted.every(Boolean)) {
    Store.saveDailySummary({
      date: new Date().toISOString().split('T')[0],
      subjects: session.subjectsToday,
      units: session.unitesToday,
      completedCount: 3,
      totalQuestions,
      correctAnswers: totalCorrect,
      wrongAnswers: totalQuestions - totalCorrect,
      hintsUsed: window._hintsUsedThisSession || 0,
      totalTime: Date.now() - session.startedAt,
      xpEarned,
      earlyExit: false,
    });
    navigate('#/gunluk-ozet');
  } else {
    navigate(`#/gunluk-mola/${idx}`);
  }
};

window.gunlukEarlyExit = function() {
  if (!confirm('Bugünlük çalışmayı bitirmek istiyor musun? İlerleme kaydedilecek.')) return;
  const session = Store.getDailySession();
  if (session) {
    const state = window._quizState || {};
    const completedCount = session.completed.filter(Boolean).length;
    Store.saveDailySummary({
      date: new Date().toISOString().split('T')[0],
      subjects: session.subjectsToday,
      units: session.unitesToday,
      completedCount,
      totalQuestions: session.totalQuestions || 0,
      correctAnswers: session.correctAnswers || 0,
      wrongAnswers: (session.totalQuestions || 0) - (session.correctAnswers || 0),
      hintsUsed: window._hintsUsedThisSession || 0,
      totalTime: Date.now() - session.startedAt,
      xpEarned: session.xpEarned || 0,
      earlyExit: true,
    });
    Store.updateDailySession({ earlyExit: true });
  }
  navigate('#/gunluk-ozet');
};

function renderGunlukMola(params) {
  if (requireLogin()) return;
  const idx = parseInt(params[0] || '0', 10);
  const session = Store.getDailySession();
  if (!session) { navigate('#/gunluk'); return; }

  const doneCount = session.completed.filter(Boolean).length;
  const nextIdx = session.completed.findIndex(c => !c);
  const nextDersSlug = session.subjectsToday[nextIdx];
  const nextDers = getDers(nextDersSlug);
  const nextUnite = getUnite(nextDersSlug, session.unitesToday[nextIdx]);
  const msg = MOLA_MESAJLARI[Math.floor(Math.random() * MOLA_MESAJLARI.length)];

  app.innerHTML = `
    ${topNavHTML(false, 'Mola')}
    <div class="page-center">
      <div class="gunluk-mola-card">
        <div class="confetti-container" id="confetti"></div>
        ${gunlukStepperHTML(session)}
        <div class="mola-check">✓</div>
        <h2>Harika! ${doneCount}/3 tamamlandı! 🎉</h2>
        <p class="mola-msg">${msg}</p>
        ${nextDers ? `<div class="mola-next-card" style="border-color:${nextDers.color}">
          <span class="mola-next-icon">${nextDers.icon}</span>
          <div>
            <span class="mola-next-label">Sıradaki</span>
            <strong>${nextDers.name}</strong>
            <span class="mola-next-unite">${nextUnite ? nextUnite.name : ''}</span>
          </div>
        </div>` : ''}
        <button class="btn btn-primary btn-lg btn-full" onclick="navigate('#/gunluk-oyrenme/${nextIdx}')">
          Devam Et →
        </button>
        <button class="btn btn-outline" onclick="gunlukEarlyExit()">Bugünlük Tamam</button>
      </div>
    </div>`;
  setTimeout(createConfetti, 200);
}

function renderGunlukOzet() {
  if (requireLogin()) return;

  const report = Store.getTodayReport();
  const session = Store.getDailySession();
  const profile = Store.getProfile();
  const streak  = Store.getStreak();
  const badges  = Store.getBadges();

  const correct    = report?.correctAnswers || 0;
  const total      = report?.totalQuestions || 0;
  const pct        = total > 0 ? Math.round((correct / total) * 100) : 0;
  const completed  = report?.completedCount || 0;
  const xpEarned   = report?.xpEarned || 0;
  const earlyExit  = report?.earlyExit || false;
  const durationMs = report?.totalTime || 0;
  const durationMin = Math.max(1, Math.round(durationMs / 60000));
  const stars = pct >= 85 ? 3 : pct >= 60 ? 2 : 1;

  // Son kazanılan rozetleri bul (son 10 dakikada)
  const recentBadges = badges.filter(b => {
    const ago = Date.now() - new Date(b.earnedAt).getTime();
    return ago < 600000;
  });

  const weakSubjects = Store.getWeakSubjects(0.5).slice(0, 2);

  app.innerHTML = `
    ${topNavHTML(false, 'Günlük Özet')}
    <div class="page-center">
      <div class="gunluk-ozet-card">
        <div class="confetti-container" id="confetti"></div>
        <div class="ozet-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <h2>${earlyExit ? 'Bugün burada bıraktın!' : 'Günlük öğrenme tamamlandı!'}</h2>
        <p>${earlyExit ? 'Yarın devam edebilirsin.' : 'Harika bir gün! 🎉'}</p>

        <div class="gunluk-ozet-stats">
          <div class="gos-item"><span class="gos-val">${completed}/3</span><span class="gos-label">Ders</span></div>
          <div class="gos-item"><span class="gos-val">${correct}/${total}</span><span class="gos-label">Doğru</span></div>
          <div class="gos-item"><span class="gos-val">%${pct}</span><span class="gos-label">Başarı</span></div>
          <div class="gos-item"><span class="gos-val">+${xpEarned}</span><span class="gos-label">XP</span></div>
          <div class="gos-item"><span class="gos-val">🔥 ${streak}</span><span class="gos-label">Seri</span></div>
          <div class="gos-item"><span class="gos-val">⏱️ ${durationMin}dk</span><span class="gos-label">Süre</span></div>
        </div>

        ${recentBadges.length > 0 ? `<div class="ozet-badges">
          <p>🎖️ Yeni rozet kazandın!</p>
          ${recentBadges.map(b => `<div class="ozet-badge-item">${b.icon} <strong>${b.name}</strong> — ${b.desc}</div>`).join('')}
        </div>` : ''}

        ${weakSubjects.length > 0 ? `<div class="ozet-zayif">
          <p>💡 Zorlandığın konular:</p>
          ${weakSubjects.map(w => {
            const d = getDers(w.slug);
            return `<span class="ozet-zayif-tag" style="${d ? `background:${d.colorLight};color:${d.color}` : ''}">
              ${d ? d.icon : ''} ${d ? d.name : w.slug} — %${w.wrongRate} hata
            </span>`;
          }).join('')}
          <p class="ozet-zayif-hint">Yarın bu konular tekrar gelecek, merak etme!</p>
        </div>` : ''}

        <button class="btn btn-primary btn-lg btn-full" onclick="navigate('#/anasayfa')">Ana Sayfaya Dön</button>
      </div>
    </div>`;
  if (!earlyExit) setTimeout(createConfetti, 200);
}

// ========== VELİ PANELİ 360° ==========
// Gerçek zamanlı Firebase dinleyicisi: veli paneli açıkken öğrenci veri değiştirirse otomatik yeniler
window._veliPanelActive = false;

function renderVeliPanel() {
  window._veliPanelActive = true;

  // Firebase gerçek zamanlı dinleyici kur
  if (window.FirebaseService?.isReady()) {
    const user = FirebaseService.getCurrentUser();
    if (user) {
      FirebaseService.startVeliListener(user.uid, (freshData) => {
        if (!window._veliPanelActive) return;
        // Store'u sessizce güncelle (sync olmadan)
        try { localStorage.setItem(Store._key, JSON.stringify(freshData)); } catch(_) {}
        _veliPanelRefresh();
      });
    }
  }

  _veliPanelRefresh();
}

function _veliPanelRefresh() {
  const profile   = Store.getProfile();
  const xp        = Store.getXP();
  const streak    = Store.getStreak();
  const badges    = Store.getBadges();
  const totalMins = Store.getTotalMinutes() + Store.getSessionMinutes();
  const today     = Store.getTodayReport();
  const history   = Store.getDailyHistory(7);
  const weakSubs  = Store.getWeakSubjects(0.4);

  if (!profile) {
    app.innerHTML = `
      ${topNavHTML(true, 'Veli Paneli')}
      <div class="page-container">
        <div class="empty-state"><div class="empty-icon">👋</div><h3>Henüz veri yok</h3>
          <p>Öğrenci giriş yaptığında burada ilerleme bilgileri görünecek.</p>
          <button class="btn btn-primary" onclick="navigate('#/giris')">Giriş Yap</button></div>
      </div>`;
    return;
  }

  // Haftalık grafik verisi
  const last7 = (() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      const h = history.find(x => x.date === d);
      days.push({ date: d, label: ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'][new Date(d).getDay()], h });
    }
    return days;
  })();

  const maxQ = Math.max(...last7.map(d => d.h?.totalQuestions || 0), 1);

  app.innerHTML = `
    ${topNavHTML(true, 'Veli Paneli')}
    <div class="page-container">
      <div class="veli-header">
        <h2>👨‍👩‍👧 Veli Paneli</h2>
        <p>${profile.name} için 360° ilerleme raporu
          ${window.FirebaseService?.getCurrentUser() ? '<span class="veli-sync-badge">☁️ Canlı Senkron</span>' : ''}</p>
      </div>

      <!-- Özet Sayaçlar -->
      <div class="veli-stats-grid">
        <div class="veli-stat-card"><span class="veli-stat-icon">⭐</span><span class="veli-stat-val">${xp}</span><span class="veli-stat-label">Toplam XP</span></div>
        <div class="veli-stat-card"><span class="veli-stat-icon">🔥</span><span class="veli-stat-val">${streak}</span><span class="veli-stat-label">Gün Serisi</span></div>
        <div class="veli-stat-card"><span class="veli-stat-icon">🎖️</span><span class="veli-stat-val">${badges.length}</span><span class="veli-stat-label">Rozet</span></div>
        <div class="veli-stat-card"><span class="veli-stat-icon">⏱️</span><span class="veli-stat-val">${totalMins}</span><span class="veli-stat-label">Toplam Dakika</span></div>
      </div>

      <!-- Bugünün Raporu -->
      ${today ? `<div class="veli-bugun-rapor">
        <h3>📊 Bugünün Raporu</h3>
        <div class="veli-rapor-grid">
          <div class="veli-rapor-item ${today.completedCount === 3 ? 'veli-rapor-good' : ''}">
            <span class="vr-icon">${today.completedCount === 3 ? '✅' : '⏳'}</span>
            <span class="vr-val">${today.completedCount}/3</span>
            <span class="vr-label">Ders Tamamlandı</span>
          </div>
          <div class="veli-rapor-item ${today.totalQuestions > 0 && (today.correctAnswers/today.totalQuestions) >= 0.7 ? 'veli-rapor-good' : 'veli-rapor-warn'}">
            <span class="vr-icon">📝</span>
            <span class="vr-val">${today.correctAnswers}/${today.totalQuestions}</span>
            <span class="vr-label">Doğru Cevap ${today.totalQuestions > 0 ? '(%' + Math.round(today.correctAnswers/today.totalQuestions*100) + ')' : ''}</span>
          </div>
          <div class="veli-rapor-item">
            <span class="vr-icon">💡</span>
            <span class="vr-val">${today.hintsUsed || 0}</span>
            <span class="vr-label">İpucu Kullandı</span>
          </div>
          <div class="veli-rapor-item">
            <span class="vr-icon">⏱️</span>
            <span class="vr-val">${Math.max(1, Math.round((today.totalTime||0)/60000))} dk</span>
            <span class="vr-label">Çalışma Süresi</span>
          </div>
        </div>
        ${today.earlyExit ? '<p class="veli-early-exit">⚠️ Bugün erken çıkış yapıldı.</p>' : ''}
        <p class="veli-rapor-dersler">Çalışılan konular: ${(today.subjects||[]).map(s => { const d=getDers(s); return d ? d.icon+' '+d.name : s; }).join(', ')}</p>
      </div>` : `<div class="veli-bugun-rapor veli-rapor-empty">
        <p>📅 Bugün henüz çalışma yapılmadı.</p>
      </div>`}

      <!-- Haftalık Grafik -->
      <div class="veli-grafik-section">
        <h3>📈 Son 7 Gün</h3>
        <div class="veli-grafik">
          ${last7.map(day => {
            const q = day.h?.totalQuestions || 0;
            const c = day.h?.correctAnswers || 0;
            const w = q - c;
            const hC = q > 0 ? Math.round((c / maxQ) * 100) : 0;
            const hW = q > 0 ? Math.round((w / maxQ) * 100) : 0;
            return `<div class="veli-bar-col">
              <div class="veli-bar-wrap">
                ${q > 0 ? `<div class="veli-bar-correct" style="height:${hC}%" title="${c} doğru"></div>
                <div class="veli-bar-wrong" style="height:${hW}%" title="${w} yanlış"></div>` :
                '<div class="veli-bar-empty"></div>'}
              </div>
              <span class="veli-bar-label ${day.date === new Date().toISOString().split('T')[0] ? 'veli-bar-today' : ''}">${day.label}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="veli-grafik-legend">
          <span class="veli-legend-correct">■ Doğru</span>
          <span class="veli-legend-wrong">■ Yanlış</span>
        </div>
      </div>

      <!-- Zayıf Noktalar -->
      ${weakSubs.length > 0 ? `<div class="veli-zayif-section">
        <h3>⚠️ Dikkat Edilecek Konular</h3>
        <div class="veli-zayif-list">
          ${weakSubs.map(w => {
            const d = getDers(w.slug);
            if (!d) return '';
            return `<div class="veli-zayif-card" style="border-left-color:${d.color}">
              <div class="veli-zayif-top">
                <span>${d.icon} ${d.name}</span>
                <span class="veli-zayif-pct veli-zayif-bad">%${w.wrongRate} hata</span>
              </div>
              <p>Zorlandığı üniteler: ${w.topics.map(t => { const u=getUnite(w.slug,t); return u?u.name:t; }).join(', ')}</p>
              <button class="btn btn-outline btn-sm" onclick="navigate('#/veli-ders/${w.slug}')">Detayına Bak →</button>
            </div>`;
          }).join('')}
        </div>
        <p class="veli-zayif-oneri">💡 Öneri: Bu konulardaki videoları çocuğunuzla birlikte izleyebilir, ders sonrası kısa sohbetler yapabilirsiniz.</p>
      </div>` : ''}

      <!-- Ders İlerlemesi -->
      <h3 class="section-title">Ders İlerlemesi</h3>
      <div class="veli-ders-list">
        ${DERSLER.map(d => {
          const prog = Store.getDersProgress(d.slug);
          const completed = Object.values(prog).filter(p => p.completed).length;
          const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
          const wp = Store.getWeakPoints()[d.slug];
          const wrongRate = wp && wp.total > 0 ? Math.round(wp.wrong / wp.total * 100) : null;
          return `<div class="veli-ders-card" onclick="navigate('#/veli-ders/${d.slug}')" style="cursor:pointer">
            <div class="veli-ders-top">
              <span>${d.icon} ${d.name}</span>
              <span class="veli-ders-pct">${pct}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div>
            <div class="veli-ders-meta">
              <span>${completed}/${d.uniteler.length} ünite tamamlandı</span>
              ${wrongRate !== null ? `<span class="veli-ders-acc ${wrongRate > 40 ? 'veli-acc-warn' : 'veli-acc-ok'}">Başarı: %${100-wrongRate}</span>` : ''}
            </div>
            <span class="veli-ders-arrow">Detay →</span>
          </div>`;
        }).join('')}
      </div>

      <!-- Genel Öneriler -->
      <div class="veli-insight">
        <h4>💡 Öneriler</h4>
        <ul>
          ${xp < 50 ? '<li>Henüz başlangıç aşamasında. Günlük öğrenme modülünü birlikte keşfedin.</li>' : ''}
          ${streak < 3 ? '<li>Düzenli çalışma için her gün en az Günlük Öğrenme modülünü tamamlamayı hedefleyin.</li>' : ''}
          ${streak >= 7 ? '<li>🎉 Harika bir seri! Çocuğunuz düzenli çalışıyor, tebrikler.</li>' : ''}
          ${weakSubs.length > 0 ? '<li>Zayıf noktalardaki konuları ders dışı hayatla ilişkilendirerek anlatmak kalıcılığı artırır.</li>' : ''}
          <li>Ders sonrası "Bugün ne öğrendin?" sorusu öğrenmeyi pekiştirir.</li>
        </ul>
      </div>

      <!-- Firebase Veli Kodu (Firebase aktifse) -->
      ${window.FirebaseService?.isReady() ? `<div class="veli-kod-section">
        <h4>📲 Uzaktan Takip</h4>
        ${Store.get('veliCode') ? `<p>Veli kodunuz: <strong class="veli-kod">${Store.get('veliCode')}</strong></p>
          <p class="veli-kod-hint">Bu kodu veli uygulamasına girerek çocuğunuzun ilerlemesini başka bir cihazdan takip edebilirsiniz.</p>` :
        `<button class="btn btn-outline" onclick="veliKodOlustur()">Veli Kodu Oluştur</button>
          <p class="veli-kod-hint">Firebase bağlıyken öğrenci verileri otomatik buluta senkronize edilir.</p>`}
      </div>` : ''}
    </div>`;
}

window.veliKodOlustur = async function() {
  const user = window.FirebaseService?.getCurrentUser();
  if (!user) return;
  const code = await FirebaseService.generateVeliCode(user.uid, user.email);
  if (code) {
    alert(`Veli kodunuz: ${code}\nBu kodu veli uygulamasına girin.`);
    _veliPanelRefresh();
  }
};

// ========== VELİ DERS DETAYI ==========
function renderVeliDersDetay(params) {
  const dersSlug = params[0];
  const ders = getDers(dersSlug);
  if (!ders) { navigate('#/veli'); return; }

  const prog = Store.getDersProgress(dersSlug);
  const wp   = Store.getWeakPoints()[dersSlug] || {};

  app.innerHTML = `
    ${topNavHTML(true, ders.name + ' — Detay')}
    <div class="page-container">
      <div class="veli-detay-header" style="border-left:4px solid ${ders.color}; background:${ders.colorLight}">
        <h2>${ders.icon} ${ders.name}</h2>
        <p>${wp.total ? `Toplam ${wp.total} sorudan ${wp.total - wp.wrong} doğru (%${Math.round((wp.total-wp.wrong)/wp.total*100)} başarı)` : 'Henüz soru cevaplanmadı'}</p>
      </div>

      ${ders.uniteler.map((unite, i) => {
        const lessonProg = Store.getLessonProgress(dersSlug, unite.slug);
        const answers    = Store.getAnswerDetails(dersSlug, unite.slug);
        const correct    = answers.filter(a => a.dogruMu).length;
        const total      = answers.length;
        const hintsUsed  = answers.filter(a => a.ipucuKullandiMi).length;
        const pct        = total > 0 ? Math.round(correct / total * 100) : null;

        return `<div class="veli-unite-card ${lessonProg.completed ? 'vd-done' : ''}">
          <div class="veli-unite-header">
            <div class="veli-unite-num" style="background:${ders.color}">${i+1}</div>
            <div class="veli-unite-info">
              <strong>${unite.name}</strong>
              <span>${lessonProg.completed ? '✅ Tamamlandı' : lessonProg.attempts > 0 ? '⏳ Devam Ediyor' : '🔒 Başlanmadı'}</span>
            </div>
            ${pct !== null ? `<span class="vd-pct ${pct >= 70 ? 'vd-good' : 'vd-warn'}">%${pct}</span>` : ''}
          </div>

          ${answers.length > 0 ? `<div class="vd-answers">
            ${answers.map((a, ai) => `<div class="vd-answer-row ${a.dogruMu ? 'vda-correct' : 'vda-wrong'}" title="${a.soru}">
              <span class="vda-num">${ai+1}</span>
              <span class="vda-icon">${a.dogruMu ? '✓' : '✗'}</span>
              <span class="vda-soru">${a.soru.length > 60 ? a.soru.slice(0,57)+'...' : a.soru}</span>
              ${a.ipucuKullandiMi ? '<span class="vda-hint" title="İpucu kullandı">💡</span>' : ''}
              ${a.sure ? `<span class="vda-sure">${Math.round(a.sure)}s</span>` : ''}
            </div>`).join('')}
            ${hintsUsed > 0 ? `<p class="vd-hints">💡 ${hintsUsed} kez ipucu kullandı</p>` : ''}
          </div>` : lessonProg.attempts > 0 ? '<p class="vd-no-data">Soru detayı mevcut değil.</p>' : ''}
        </div>`;
      }).join('')}
    </div>`;
}

// ========== ADMİN PANELİ ==========

function renderAdmin() {
  if (requireAdmin()) return;

  const fbReady = window.FirebaseService?.isReady();
  app.innerHTML = `
    ${topNavHTML(true, 'Admin Paneli')}
    <div class="page-container">
      <div class="admin-header">
        <div>
          <h2>🔑 Admin Paneli</h2>
          <p>Tüm öğrencilerin ilerlemesini buradan izleyebilirsiniz.</p>
        </div>
        <div class="admin-header-actions">
          <a href="#/veli-portal" class="btn btn-outline btn-sm">👁 Veli Portalı</a>
        </div>
      </div>

      ${!fbReady ? `<div class="admin-offline-warning">
        <p>⚠️ Firebase bağlantısı yok. Öğrenci listesi Firebase gerektirir.</p>
        <p class="admin-offline-sub">firebase.js içindeki FIREBASE_CONFIG değerlerini doldurun.</p>
      </div>` : `<div id="adminStudentList" class="admin-loading">
        <div class="admin-spinner">⏳ Öğrenci listesi yükleniyor...</div>
      </div>`}
    </div>`;

  if (!fbReady) return;

  FirebaseService.listStudents().then(students => {
    const el = document.getElementById('adminStudentList');
    if (!el) return;
    el.className = ''; // admin-loading display:flex'i kaldır

    if (!students.length) {
      el.innerHTML = `<div class="empty-state"><div class="empty-icon">👥</div><h3>Henüz kayıtlı öğrenci yok</h3>
        <p>Öğrenciler giriş yapıp veri senkronize ettikçe burada görünecek.</p></div>`;
      return;
    }

    // Sınıf geneli istatistikler
    const totalStudents = students.length;
    const avgXP = Math.round(students.reduce((s, st) => s + (st.xp || 0), 0) / totalStudents);
    const activeToday = students.filter(st => st.todayReport && st.todayReport.completedCount > 0).length;
    const avgStreak = Math.round(students.reduce((s, st) => s + (st.streak || 0), 0) / totalStudents);

    el.innerHTML = `
      <!-- Sınıf İstatistikleri -->
      <div class="admin-class-stats">
        <div class="admin-stat-card"><span class="admin-stat-icon">👥</span><span class="admin-stat-val">${totalStudents}</span><span class="admin-stat-label">Toplam Öğrenci</span></div>
        <div class="admin-stat-card"><span class="admin-stat-icon">⭐</span><span class="admin-stat-val">${avgXP}</span><span class="admin-stat-label">Ort. XP</span></div>
        <div class="admin-stat-card"><span class="admin-stat-icon">📅</span><span class="admin-stat-val">${activeToday}</span><span class="admin-stat-label">Bugün Aktif</span></div>
        <div class="admin-stat-card"><span class="admin-stat-icon">🔥</span><span class="admin-stat-val">${avgStreak}</span><span class="admin-stat-label">Ort. Seri</span></div>
      </div>

      <!-- Öğrenci Listesi -->
      <h3 class="section-title">Öğrenciler</h3>
      <div class="admin-student-list">
        ${students.sort((a, b) => (b.xp || 0) - (a.xp || 0)).map(st => {
          const today = st.todayReport;
          const lastActive = st.lastActiveDate
            ? (st.lastActiveDate === new Date().toISOString().split('T')[0] ? 'Bugün' : st.lastActiveDate)
            : 'Hiç';
          const todayPct = today?.totalQuestions > 0
            ? Math.round(today.correctAnswers / today.totalQuestions * 100)
            : null;
          return `<div class="admin-student-card" onclick="navigate('#/admin-ogrenci/${st.uid}')">
            <div class="admin-student-top">
              <div class="admin-student-avatar">${(st.name || '?')[0].toUpperCase()}</div>
              <div class="admin-student-info">
                <strong>${st.name || '—'}</strong>
                <span class="admin-student-email">${st.email || ''}</span>
              </div>
              <div class="admin-student-stats">
                <span class="admin-badge-xp">⭐ ${st.xp || 0} XP</span>
                <span class="admin-badge-streak">🔥 ${st.streak || 0}</span>
                ${st.badgeCount > 0 ? `<span class="admin-badge-count">🎖️ ${st.badgeCount}</span>` : ''}
              </div>
            </div>
            <div class="admin-student-bottom">
              <span class="admin-last-active ${lastActive === 'Bugün' ? 'admin-active-today' : ''}">Son aktif: ${lastActive}</span>
              ${today ? `<span class="admin-today-report ${today.completedCount === 3 ? 'admin-today-complete' : ''}">
                Bugün: ${today.completedCount}/3 ders | ${today.correctAnswers}/${today.totalQuestions} doğru${todayPct !== null ? ' (%' + todayPct + ')' : ''}
              </span>` : '<span class="admin-today-none">Bugün çalışma yok</span>'}
            </div>
          </div>`;
        }).join('')}
      </div>`;
  });
}

function renderAdminOgrenci(params) {
  if (requireAdmin()) return;

  const uid = params[0];
  if (!uid) { navigate('#/admin'); return; }

  const fbReady = window.FirebaseService?.isReady();

  app.innerHTML = `
    ${topNavHTML(true, 'Öğrenci Detayı')}
    <div class="page-container">
      <div id="adminOgrenciContent" class="admin-loading">
        <div class="admin-spinner">⏳ Öğrenci verisi yükleniyor...</div>
      </div>
    </div>`;

  if (!fbReady) {
    document.getElementById('adminOgrenciContent').innerHTML =
      '<p class="admin-offline-warning">Firebase bağlantısı gerekiyor.</p>';
    return;
  }

  FirebaseService.getStudentFullData(uid).then(data => {
    const el = document.getElementById('adminOgrenciContent');
    if (!el) return;
    el.className = ''; // admin-loading display:flex'i kaldır

    if (!data) {
      el.innerHTML = '<div class="empty-state"><p>Öğrenci bulunamadı.</p><button class="btn btn-outline" onclick="navigate(\'#/admin\')">Geri Dön</button></div>';
      return;
    }

    const profile = data.profile || {};
    const xp      = data.xp || 0;
    const streak  = data.streak || 0;
    const badges  = data.badges || [];
    const history = data.dailyHistory || [];
    const weakPts = data.weakPoints || {};
    const progress = data.progress || {};
    const adminNotes = data.adminNotes || [];

    // Son 7 günün özeti
    const last7 = (() => {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
        const h = history.find(x => x.date === d);
        days.push({ date: d, label: ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'][new Date(d).getDay()], h });
      }
      return days;
    })();
    const maxQ = Math.max(...last7.map(d => d.h?.totalQuestions || 0), 1);

    el.innerHTML = `
      <!-- Öğrenci Başlık -->
      <div class="admin-ogrenci-header">
        <div class="admin-ogrenci-avatar">${(profile.name || '?')[0].toUpperCase()}</div>
        <div>
          <h2>${profile.name || '—'}</h2>
          <p>${profile.email || ''}</p>
        </div>
        <div class="admin-ogrenci-stats">
          <span>⭐ ${xp} XP</span>
          <span>🔥 ${streak} Seri</span>
          <span>🎖️ ${badges.length} Rozet</span>
        </div>
      </div>

      <!-- Son 7 Gün Grafiği -->
      <div class="veli-grafik-section">
        <h3>📈 Son 7 Gün</h3>
        <div class="veli-grafik">
          ${last7.map(day => {
            const q = day.h?.totalQuestions || 0;
            const c = day.h?.correctAnswers || 0;
            const w = q - c;
            const hC = q > 0 ? Math.round((c / maxQ) * 100) : 0;
            const hW = q > 0 ? Math.round((w / maxQ) * 100) : 0;
            return `<div class="veli-bar-col">
              <div class="veli-bar-wrap">
                ${q > 0 ? `<div class="veli-bar-correct" style="height:${hC}%"></div>
                <div class="veli-bar-wrong" style="height:${hW}%"></div>` : '<div class="veli-bar-empty"></div>'}
              </div>
              <span class="veli-bar-label ${day.date === new Date().toISOString().split('T')[0] ? 'veli-bar-today' : ''}">${day.label}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="veli-grafik-legend"><span class="veli-legend-correct">■ Doğru</span><span class="veli-legend-wrong">■ Yanlış</span></div>
      </div>

      <!-- Zayıf Noktalar -->
      ${Object.keys(weakPts).length > 0 ? `<div class="veli-zayif-section">
        <h3>⚠️ Zayıf Noktalar</h3>
        <div class="veli-zayif-list">
          ${Object.entries(weakPts).map(([slug, wp]) => {
            const d = getDers(slug);
            const rate = wp.total > 0 ? Math.round(wp.wrong / wp.total * 100) : 0;
            return `<div class="veli-zayif-card" style="border-left-color:${d?.color || '#ccc'}">
              <div class="veli-zayif-top">
                <span>${d ? d.icon + ' ' + d.name : slug}</span>
                <span class="veli-zayif-pct ${rate > 40 ? 'veli-zayif-bad' : ''}">%${rate} hata</span>
              </div>
              <p>Toplam: ${wp.total} soru | Yanlış: ${wp.wrong}</p>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}

      <!-- Ders İlerlemesi -->
      <h3 class="section-title">Ders İlerlemesi</h3>
      <div class="veli-ders-list">
        ${DERSLER.map(d => {
          const prog = progress[d.slug] || {};
          const completed = Object.values(prog).filter(p => p.completed).length;
          const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
          return `<div class="veli-ders-card">
            <div class="veli-ders-top"><span>${d.icon} ${d.name}</span><span class="veli-ders-pct">${pct}%</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div>
            <div class="veli-ders-meta"><span>${completed}/${d.uniteler.length} ünite tamamlandı</span></div>
          </div>`;
        }).join('')}
      </div>

      <!-- Admin Notları -->
      <div class="admin-notes-section">
        <h3>📝 Öğretmen Notları</h3>
        ${adminNotes.length > 0 ? `<div class="admin-notes-list">
          ${adminNotes.slice().reverse().map(n => `<div class="admin-note-item">
            <p>${n.note}</p>
            <span class="admin-note-date">${new Date(n.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>`).join('')}
        </div>` : '<p class="admin-notes-empty">Henüz not eklenmedi.</p>'}
        <div class="admin-note-form">
          <textarea id="adminNoteInput" class="admin-note-textarea" placeholder="Not ekle..." rows="3" maxlength="500"></textarea>
          <button class="btn btn-primary" onclick="adminAddNote('${uid}')">Not Ekle</button>
        </div>
      </div>`;
  });
}

window.adminAddNote = async function(uid) {
  const input = document.getElementById('adminNoteInput');
  if (!input || !input.value.trim()) return;
  const note = input.value.trim();
  input.disabled = true;
  await FirebaseService.addAdminNote(uid, note);
  // Refresh page to show new note
  renderAdminOgrenci([uid]);
};

// ========== VELİ PORTALI ==========
// Veliler Firebase hesabı olmadan sadece öğrenci koduyla gerçek zamanlı takip yapabilir.

window._veliPortalActive = false;

function renderVeliPortal() {
  // Mevcut kullanıcı admin veya veli ise kendi paneline yönlendir
  if (Store.isLoggedIn()) {
    const role = Store.getProfile()?.role;
    if (role === 'admin') { navigate('#/admin'); return; }
    if (role === 'veli')  { navigate('#/veli');  return; }
  }

  const fbReady = window.FirebaseService?.isReady();

  app.innerHTML = `
    ${topNavHTML(true, 'Veli Portalı')}
    <div class="page-center">
      <div class="card card-form veli-portal-card">
        <div class="form-mascot">👨‍👩‍👧</div>
        <h2>Veli Portalı</h2>
        <p class="veli-portal-sub">Çocuğunuzun size verdiği 8 haneli kodu girerek ilerlemesini takip edin.</p>

        ${!fbReady ? `<div class="admin-offline-warning">
          <p>⚠️ Firebase yapılandırılmamış. Veli portalı Firebase gerektirir.</p>
        </div>` : `
        <form id="veliPortalForm">
          <div class="form-group">
            <label>Öğrenci Kodu</label>
            <input type="text" id="veliPortalCode" placeholder="Örn: ABC12345" maxlength="8"
              style="text-transform:uppercase;letter-spacing:2px;font-size:1.2rem;text-align:center" required>
          </div>
          <div id="veliPortalError" class="form-error hidden"></div>
          <button type="submit" id="veliPortalBtn" class="btn btn-primary btn-lg btn-full">Takip Etmeye Başla →</button>
        </form>

        <div class="divider"><span>veya</span></div>
        <button class="btn btn-outline btn-full" onclick="navigate('#/giris')">Veli Hesabıyla Giriş Yap</button>
        `}
      </div>
    </div>`;

  if (!fbReady) return;

  document.getElementById('veliPortalForm').onsubmit = async (e) => {
    e.preventDefault();
    const code = document.getElementById('veliPortalCode').value.trim().toUpperCase();
    const errEl = document.getElementById('veliPortalError');
    const btn   = document.getElementById('veliPortalBtn');

    errEl.classList.add('hidden');
    btn.disabled = true;
    btn.textContent = 'Aranıyor...';

    const ogrenciUid = await FirebaseService.resolveVeliCode(code);
    if (!ogrenciUid) {
      errEl.textContent = 'Geçersiz kod. Çocuğunuzdan kodu tekrar isteyin.';
      errEl.classList.remove('hidden');
      btn.disabled = false;
      btn.textContent = 'Takip Etmeye Başla →';
      return;
    }

    // Öğrenciyi bulduk — gerçek zamanlı dinleyiciyi başlat
    _startVeliPortalView(ogrenciUid, code);
  };
}

function _startVeliPortalView(ogrenciUid, code) {
  window._veliPortalActive = true;

  // Önce bir kere veri çek ve ekranı kur
  FirebaseService.getStudentFullData(ogrenciUid).then(data => {
    _renderVeliPortalView(ogrenciUid, code, data);

    // Gerçek zamanlı dinleyiciyi başlat
    FirebaseService.startVeliListener(ogrenciUid, (freshData) => {
      if (!window._veliPortalActive) return;
      _renderVeliPortalView(ogrenciUid, code, freshData);
    });
  });
}

function _renderVeliPortalView(ogrenciUid, code, data) {
  if (!data) {
    app.innerHTML = `${topNavHTML(true, 'Veli Portalı')}
      <div class="page-container"><div class="empty-state"><p>Öğrenci verisi bulunamadı.</p>
      <button class="btn btn-outline" onclick="navigate('#/veli-portal')">Geri</button></div></div>`;
    return;
  }

  const profile  = data.profile || {};
  const xp       = data.xp || 0;
  const streak   = data.streak || 0;
  const badges   = data.badges || [];
  const history  = data.dailyHistory || [];
  const weakPts  = data.weakPoints || {};
  const today    = history.slice(-1)[0] || null;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayReport = (today?.date === todayStr) ? today : null;

  const last7 = (() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      const h = history.find(x => x.date === d);
      days.push({ date: d, label: ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'][new Date(d).getDay()], h });
    }
    return days;
  })();
  const maxQ = Math.max(...last7.map(d => d.h?.totalQuestions || 0), 1);

  const weakList = Object.entries(weakPts)
    .map(([slug, wp]) => ({ slug, rate: wp.total > 0 ? Math.round(wp.wrong / wp.total * 100) : 0, ...wp }))
    .filter(w => w.total >= 3 && w.rate >= 40)
    .sort((a, b) => b.rate - a.rate);

  app.innerHTML = `
    ${topNavHTML(true, 'Veli Portalı')}
    <div class="page-container">
      <div class="veli-portal-top">
        <div class="veli-portal-student">
          <div class="veli-portal-avatar">${(profile.name || '?')[0].toUpperCase()}</div>
          <div>
            <h2>${profile.name || '—'}</h2>
            <p class="veli-portal-code-label">Kod: <strong>${code}</strong></p>
          </div>
        </div>
        <span class="veli-sync-badge">☁️ Canlı Takip</span>
      </div>

      <!-- Özet Sayaçlar -->
      <div class="veli-stats-grid">
        <div class="veli-stat-card"><span class="veli-stat-icon">⭐</span><span class="veli-stat-val">${xp}</span><span class="veli-stat-label">Toplam XP</span></div>
        <div class="veli-stat-card"><span class="veli-stat-icon">🔥</span><span class="veli-stat-val">${streak}</span><span class="veli-stat-label">Gün Serisi</span></div>
        <div class="veli-stat-card"><span class="veli-stat-icon">🎖️</span><span class="veli-stat-val">${badges.length}</span><span class="veli-stat-label">Rozet</span></div>
        <div class="veli-stat-card"><span class="veli-stat-icon">📅</span><span class="veli-stat-val">${history.length}</span><span class="veli-stat-label">Aktif Gün</span></div>
      </div>

      <!-- Bugünün Raporu -->
      ${todayReport ? `<div class="veli-bugun-rapor">
        <h3>📊 Bugünün Raporu</h3>
        <div class="veli-rapor-grid">
          <div class="veli-rapor-item ${todayReport.completedCount === 3 ? 'veli-rapor-good' : ''}">
            <span class="vr-icon">${todayReport.completedCount === 3 ? '✅' : '⏳'}</span>
            <span class="vr-val">${todayReport.completedCount}/3</span>
            <span class="vr-label">Ders Tamamlandı</span>
          </div>
          <div class="veli-rapor-item ${todayReport.totalQuestions > 0 && (todayReport.correctAnswers / todayReport.totalQuestions) >= 0.7 ? 'veli-rapor-good' : 'veli-rapor-warn'}">
            <span class="vr-icon">📝</span>
            <span class="vr-val">${todayReport.correctAnswers}/${todayReport.totalQuestions}</span>
            <span class="vr-label">Doğru Cevap</span>
          </div>
          <div class="veli-rapor-item">
            <span class="vr-icon">💡</span>
            <span class="vr-val">${todayReport.hintsUsed || 0}</span>
            <span class="vr-label">İpucu</span>
          </div>
          <div class="veli-rapor-item">
            <span class="vr-icon">⏱️</span>
            <span class="vr-val">${Math.max(1, Math.round((todayReport.totalTime || 0) / 60000))} dk</span>
            <span class="vr-label">Süre</span>
          </div>
        </div>
      </div>` : `<div class="veli-bugun-rapor veli-rapor-empty"><p>📅 Bugün henüz çalışma yapılmadı.</p></div>`}

      <!-- Haftalık Grafik -->
      <div class="veli-grafik-section">
        <h3>📈 Son 7 Gün</h3>
        <div class="veli-grafik">
          ${last7.map(day => {
            const q = day.h?.totalQuestions || 0;
            const c = day.h?.correctAnswers || 0;
            const w = q - c;
            const hC = q > 0 ? Math.round((c / maxQ) * 100) : 0;
            const hW = q > 0 ? Math.round((w / maxQ) * 100) : 0;
            return `<div class="veli-bar-col">
              <div class="veli-bar-wrap">
                ${q > 0 ? `<div class="veli-bar-correct" style="height:${hC}%"></div>
                <div class="veli-bar-wrong" style="height:${hW}%"></div>` : '<div class="veli-bar-empty"></div>'}
              </div>
              <span class="veli-bar-label ${day.date === new Date().toISOString().split('T')[0] ? 'veli-bar-today' : ''}">${day.label}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="veli-grafik-legend"><span class="veli-legend-correct">■ Doğru</span><span class="veli-legend-wrong">■ Yanlış</span></div>
      </div>

      <!-- Zayıf Noktalar -->
      ${weakList.length > 0 ? `<div class="veli-zayif-section">
        <h3>⚠️ Dikkat Edilecek Konular</h3>
        <div class="veli-zayif-list">
          ${weakList.map(w => {
            const d = getDers(w.slug);
            if (!d) return '';
            return `<div class="veli-zayif-card" style="border-left-color:${d.color}">
              <div class="veli-zayif-top">
                <span>${d.icon} ${d.name}</span>
                <span class="veli-zayif-pct veli-zayif-bad">%${w.rate} hata</span>
              </div>
              <p>Zorlandığı üniteler: ${(w.topics || []).map(t => { const u = getUnite(w.slug, t); return u ? u.name : t; }).join(', ')}</p>
            </div>`;
          }).join('')}
        </div>
        <p class="veli-zayif-oneri">💡 Bu konulardaki videoları birlikte izleyebilirsiniz.</p>
      </div>` : ''}

      <!-- Genel İlerleme -->
      <h3 class="section-title">Ders İlerlemesi</h3>
      <div class="veli-ders-list">
        ${DERSLER.map(d => {
          const prog = (data.progress || {})[d.slug] || {};
          const completed = Object.values(prog).filter(p => p.completed).length;
          const pct = Math.round((completed / d.uniteler.length) * 100) || 0;
          return `<div class="veli-ders-card">
            <div class="veli-ders-top"><span>${d.icon} ${d.name}</span><span class="veli-ders-pct">${pct}%</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div>
            <div class="veli-ders-meta"><span>${completed}/${d.uniteler.length} ünite tamamlandı</span></div>
          </div>`;
        }).join('')}
      </div>

      <button class="btn btn-outline btn-full" onclick="navigate('#/veli-portal')" style="margin-top:1.5rem">
        ← Farklı Öğrenciyi Takip Et
      </button>
    </div>`;
}
