/* store.js - localStorage ilerleme ve ustalık sistemi */
(function(){
  const KEY = 'maarif_store';
  const DEFAULTS = {
    xp: 0, level: 1,
    mastery: {},
    quizHistory: [],
    gameScores: {},
    badges: [],
    visited: [],
    lastRoute: '',
    streak: { count: 0, lastDate: '' }
  };

  const BADGES = [
    { id: 'ilk_adim', name: 'İlk Adım', desc: '1 quiz tamamla', icon: '🎯', check: s => s.quizHistory.length >= 1 },
    { id: 'kavram_avcisi', name: 'Kavram Avcısı', desc: '10 kavram ziyaret et', icon: '🔍', check: s => s.visited.length >= 10 },
    { id: 'oyun_ustasi', name: 'Oyun Ustası', desc: '5 farklı oyun oyna', icon: '🎮', check: s => Object.keys(s.gameScores).length >= 5 },
    { id: 'deger_bilgini', name: 'Değer Bilgini', desc: 'Değerler quizini tamamla', icon: '⭐', check: s => s.quizHistory.some(q => q.family === 'Erdem-Değer-Eylem') },
    { id: 'hafta_serisi', name: 'Hafta Serisi', desc: '7 gün üst üste gir', icon: '🔥', check: s => s.streak.count >= 7 },
    { id: 'beceri_kasi', name: 'Beceri Kaşifi', desc: 'Beceriler sayfasını ziyaret et', icon: '🧭', check: s => s.visited.includes('beceriler') },
    { id: 'yuz_kavram', name: '100 Kavram', desc: '100 kavram ziyaret et', icon: '💯', check: s => s.visited.length >= 100 },
    { id: 'tam_puan', name: 'Tam Puan', desc: 'Bir quizde %100 yap', icon: '🏆', check: s => s.quizHistory.some(q => q.score === q.total) },
  ];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...DEFAULTS };
      const parsed = JSON.parse(raw);
      return { ...DEFAULTS, ...parsed };
    } catch(e) { return { ...DEFAULTS }; }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) {}
  }

  function updateStreak(state) {
    const today = new Date().toISOString().slice(0,10);
    if (state.streak.lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
    if (state.streak.lastDate === yesterday) {
      state.streak.count++;
    } else {
      state.streak.count = 1;
    }
    state.streak.lastDate = today;
  }

  function calcLevel(xp) {
    return Math.floor(xp / 100) + 1;
  }

  window.Store = {
    BADGES,
    get() { return load(); },
    save(s) { s.level = calcLevel(s.xp); save(s); },
    addXP(amount) {
      const s = load();
      s.xp += amount;
      s.level = calcLevel(s.xp);
      updateStreak(s);
      this.checkBadges(s);
      save(s);
      return s;
    },
    visitConcept(id) {
      const s = load();
      if (!s.visited.includes(id)) s.visited.push(id);
      updateStreak(s);
      this.checkBadges(s);
      save(s);
    },
    visitPage(page) {
      const s = load();
      if (!s.visited.includes(page)) s.visited.push(page);
      save(s);
    },
    setLastRoute(route) {
      const s = load(); s.lastRoute = route; save(s);
    },
    addQuiz(result) {
      const s = load();
      s.quizHistory.push({ ...result, date: new Date().toISOString() });
      s.xp += result.score * 10;
      s.level = calcLevel(s.xp);
      updateStreak(s);
      this.checkBadges(s);
      save(s);
      return s;
    },
    addGameScore(gameId, score) {
      const s = load();
      const prev = s.gameScores[gameId] || 0;
      if (score > prev) s.gameScores[gameId] = score;
      s.xp += Math.floor(score / 2);
      s.level = calcLevel(s.xp);
      updateStreak(s);
      this.checkBadges(s);
      save(s);
      return s;
    },
    updateMastery(conceptId, correct) {
      const s = load();
      const cur = s.mastery[conceptId] || 50;
      s.mastery[conceptId] = Math.max(0, Math.min(100, cur + (correct ? 10 : -15)));
      save(s);
    },
    checkBadges(s) {
      const newBadges = [];
      BADGES.forEach(b => {
        if (!s.badges.includes(b.id) && b.check(s)) {
          s.badges.push(b.id);
          newBadges.push(b);
        }
      });
      if (newBadges.length > 0) {
        setTimeout(() => {
          newBadges.forEach(b => showToast(b.icon + ' Rozet: ' + b.name));
        }, 500);
      }
    },
    getWeakConcepts(n) {
      const s = load();
      const entries = Object.entries(s.mastery).filter(([,v]) => v < 60);
      entries.sort((a,b) => a[1] - b[1]);
      return entries.slice(0, n || 10).map(([id]) => id);
    }
  };

  window.showToast = function(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 3000);
  };
})();
