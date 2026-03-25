/* ============================================================
   Islam Bilim Yildizlari - Shared JavaScript Module
   Every page loads this file for navigation, theme, storage, etc.
   ============================================================ */

// ========== NAVIGATION ==========
function buildNav(activePage) {
  const pages = [
    { id: 'kesfet', href: 'alimler.html', icon: '\u{1F52D}', label: 'Ke\u015ffet' },
    { id: 'harita', href: 'harita.html', icon: '\u{1F5FA}\uFE0F', label: 'Harita' },
    { id: 'baglanti', href: 'baglanti.html', icon: '\u{1F578}\uFE0F', label: 'Ba\u011flant\u0131lar' },
    { id: 'ogrenme', href: 'ogrenme.html', icon: '\u{1F4DA}', label: '\u00D6\u011frenme' },
    { id: 'sinav', href: 'sinav.html', icon: '\u26A1', label: 'S\u0131nav' }
  ];

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="site-logo">\u262A <span>\u0130slam Bilim Y\u0131ld\u0131zlar\u0131</span></a>
      <nav class="site-nav">
        ${pages.map(p => `<a href="${p.href}" class="nav-link${activePage === p.id ? ' active' : ''}" data-page="${p.id}">
          <span class="nav-icon">${p.icon}</span> ${p.label}
        </a>`).join('')}
      </nav>
      <button id="theme-toggle" onclick="toggleTheme()" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:10px;padding:6px 10px;cursor:pointer;color:var(--muted2);font-size:14px">\u2600\uFE0F</button>
    </div>
  `;
  document.body.prepend(header);
}

// ========== THEME ==========
function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle('light');
  const isLight = html.classList.contains('light');
  localStorage.setItem('iby-theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isLight ? '\u{1F319}' : '\u2600\uFE0F';
}

function initTheme() {
  const saved = localStorage.getItem('iby-theme');
  if (saved === 'light') document.documentElement.classList.add('light');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = document.documentElement.classList.contains('light') ? '\u{1F319}' : '\u2600\uFE0F';
}

// ========== STARS BACKGROUND ==========
function initStars() {
  const c = document.getElementById('stars');
  if (!c) return;
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 1;
    s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;--delay:${Math.random() * 3}s;--min:${.05 + Math.random() * .15};--max:${.4 + Math.random() * .5}`;
    c.appendChild(s);
  }
}

// ========== FOOTER ==========
function buildFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = '\u262A \u0130slam Bilim Y\u0131ld\u0131zlar\u0131 \u00B7 <a href="index.html" style="color:var(--gold);text-decoration:none">Ana Sayfa</a>';
  document.body.appendChild(footer);
}

// ========== LOCAL STORAGE HELPERS ==========
const Store = {
  _get(key, def) {
    try { return JSON.parse(localStorage.getItem(key)) || def; }
    catch { return def; }
  },

  _set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },

  // Visited scholars
  getVisited() {
    return this._get('iby-visited', []);
  },

  addVisited(id) {
    const v = this.getVisited();
    if (!v.includes(id)) {
      v.push(id);
      this._set('iby-visited', v);
    }
    checkAchievements();
  },

  // Path progress
  getPathProgress(pathId) {
    const p = this._get('iby-progress', {});
    return p[pathId] || [];
  },

  savePathStep(pathId, stepIdx) {
    const p = this._get('iby-progress', {});
    if (!p[pathId]) p[pathId] = [];
    p[pathId][stepIdx] = true;
    this._set('iby-progress', p);
    checkAchievements();
  },

  getCompletedPaths() {
    if (typeof OGRENME_YOLLARI === 'undefined') return 0;
    const p = this._get('iby-progress', {});
    let count = 0;
    OGRENME_YOLLARI.forEach(yol => {
      const prog = p[yol.id] || [];
      if (yol.adimlar.length > 0 && prog.filter(Boolean).length >= yol.adimlar.length) count++;
    });
    return count;
  },

  // Quiz history
  addQuizResult(pathId, stepIdx, score, maxScore) {
    const h = this._get('iby-quiz-history', []);
    h.push({ pathId, stepIdx, score, maxScore, date: new Date().toISOString() });
    this._set('iby-quiz-history', h);
    checkAchievements();
  },

  // Game scores
  getScores() {
    return this._get('iby-scores', { 'bu-kim': 0, 'eslestir': 0, 'zaman': 0 });
  },

  saveScore(game, score) {
    const s = this.getScores();
    if (score > (s[game] || 0)) {
      s[game] = score;
      this._set('iby-scores', s);
    }
  },

  // Achievements
  getAchievements() {
    return this._get('iby-achievements', []);
  },

  unlockAchievement(id) {
    const a = this.getAchievements();
    if (!a.includes(id)) {
      a.push(id);
      this._set('iby-achievements', a);
      // Find achievement name
      if (typeof BASARIMLAR !== 'undefined') {
        const b = BASARIMLAR.find(x => x.id === id);
        if (b) showToast('\u{1F3C6} ' + b.baslik + ' \u2014 ' + b.puan + ' XP', 'achievement');
      }
    }
  },

  // Total XP
  getTotalXP() {
    if (typeof BASARIMLAR === 'undefined') return 0;
    const unlocked = this.getAchievements();
    return BASARIMLAR.filter(b => unlocked.includes(b.id)).reduce((s, b) => s + b.puan, 0);
  },

  getRank() {
    const xp = this.getTotalXP();
    if (xp >= 500) return { title: 'All\u00E2me', icon: '\u{1F451}' };
    if (xp >= 300) return { title: 'Muallim', icon: '\u{1F393}' };
    if (xp >= 150) return { title: '\u00C2lim Aday\u0131', icon: '\u{1F4D6}' };
    if (xp >= 50) return { title: '\u00D6\u011frenci', icon: '\u270F\uFE0F' };
    return { title: 'Talebe', icon: '\u{1F331}' };
  },

  // Favorites
  getFavorites() { return this._get('iby-favorites', []); },
  toggleFavorite(id) {
    const favs = this.getFavorites();
    const idx = favs.indexOf(id);
    if (idx === -1) { favs.push(id); } else { favs.splice(idx, 1); }
    this._set('iby-favorites', favs);
    return idx === -1; // returns true if added, false if removed
  },
  isFavorite(id) { return this.getFavorites().includes(id); },

  // Recent viewed (last 10)
  getRecent() { return this._get('iby-recent', []); },
  addRecent(id) {
    let r = this.getRecent().filter(x => x !== id);
    r.unshift(id);
    if (r.length > 10) r = r.slice(0, 10);
    this._set('iby-recent', r);
  }
};

// ========== ACHIEVEMENTS ==========
function checkAchievements() {
  if (typeof BASARIMLAR === 'undefined') return;
  const visited = Store.getVisited();
  const unlocked = Store.getAchievements();
  const quizHistory = Store._get('iby-quiz-history', []);

  BASARIMLAR.forEach(b => {
    if (unlocked.includes(b.id)) return;
    let earned = false;
    switch (b.kosul.tip) {
      case 'visit':
        earned = visited.length >= b.kosul.sayi;
        break;
      case 'path-complete':
        earned = Store.getCompletedPaths() >= b.kosul.sayi;
        break;
      case 'quiz-complete':
        earned = quizHistory.length >= b.kosul.sayi;
        break;
      case 'perfect-score':
        earned = quizHistory.some(q => q.score === q.maxScore);
        break;
      case 'connection-view':
        earned = Store._get('iby-conn-viewed', false);
        break;
    }
    if (earned) Store.unlockAchievement(b.id);
  });
}

// ========== TOAST ==========
function showToast(message, type) {
  // Remove existing toast
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ========== SHARE ==========
function shareScholar(scholar) {
  const url = `${window.location.origin}/islam-bilim-yildizlari/alim.html?id=${scholar.id}`;
  const text = `${scholar.isim} — ${scholar.hook}`;

  if (navigator.share) {
    navigator.share({ title: scholar.isim, text: text, url: url }).catch(() => {});
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
      showToast('\u{1F4CB} Link kopyaland\u0131!');
    }).catch(() => {
      // Final fallback
      prompt('Linki kopyala:', url);
    });
  }
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const isText = isNaN(target);
    if (isText) { el.textContent = el.dataset.count; return; }
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = current;
    }, 30);
  });
}

// ========== FAVORITE TOGGLE UI ==========
function toggleFavUI(id, btnEl) {
  const added = Store.toggleFavorite(id);
  if (btnEl) {
    btnEl.classList.toggle('active', added);
    btnEl.textContent = added ? '\u2764\uFE0F' : '\u{1F90D}';
  }
  showToast(added ? '\u2764\uFE0F Favorilere eklendi' : '\u{1F494} Favorilerden \u00E7\u0131kar\u0131ld\u0131');
}

// ========== COLOR UTILITY ==========
// alanRenk is defined in data/bilginler.js

// ========== INIT ==========
function initPage(activePage) {
  buildNav(activePage);
  initStars();
  initTheme();
  buildFooter();
}
