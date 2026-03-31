// ====== GÜNLÜK ROTASYON — 5 dersten 3'ü, C(5,3)=10 kombinasyon ======
const DAILY_ROTATIONS = [
  ['matematik', 'fen',      'turkce'],
  ['sosyal',    'ingilizce','matematik'],
  ['fen',       'turkce',   'sosyal'],
  ['ingilizce', 'matematik','fen'],
  ['turkce',    'sosyal',   'ingilizce'],
  ['matematik', 'turkce',   'ingilizce'],
  ['fen',       'sosyal',   'matematik'],
  ['turkce',    'ingilizce','fen'],
  ['sosyal',    'matematik','turkce'],
  ['ingilizce', 'fen',      'sosyal'],
];

// localStorage CRUD helpers
const Store = {
  _key: '5sinif_lms_v1',

  _load() {
    try {
      return JSON.parse(localStorage.getItem(this._key)) || {};
    } catch { return {}; }
  },

  _save(data) {
    localStorage.setItem(this._key, JSON.stringify(data));
    if (window.FirebaseService) window.FirebaseService.scheduleSync();
  },

  get(path) {
    const data = this._load();
    return path.split('.').reduce((o, k) => o?.[k], data);
  },

  set(path, value) {
    const data = this._load();
    const keys = path.split('.');
    let obj = data;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]] || typeof obj[keys[i]] !== 'object') obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this._save(data);
    return value;
  },

  // Profile
  getProfile() {
    return this.get('profile') || null;
  },

  setProfile(profile) {
    this.set('profile', { ...profile, createdAt: profile.createdAt || new Date().toISOString() });
  },

  isLoggedIn() {
    return !!this.getProfile();
  },

  logout() {
    const data = this._load();
    delete data.profile;
    this._save(data);
  },

  // XP & Streaks
  getXP() {
    return this.get('xp') || 0;
  },

  addXP(amount) {
    const current = this.getXP();
    this.set('xp', current + amount);
    this._checkBadges();
    return current + amount;
  },

  getStreak() {
    const lastDate = this.get('lastActiveDate');
    const streak = this.get('streak') || 0;
    const today = new Date().toISOString().split('T')[0];
    if (lastDate === today) return streak;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (lastDate === yesterday) return streak;
    if (lastDate && lastDate !== today && lastDate !== yesterday) return 0;
    return streak;
  },

  recordActivity() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = this.get('lastActiveDate');
    const streak = this.get('streak') || 0;
    if (lastDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = (lastDate === yesterday) ? streak + 1 : 1;
    this.set('streak', newStreak);
    this.set('lastActiveDate', today);
  },

  // Lesson progress
  getLessonProgress(dersSlug, uniteSlug) {
    return this.get(`progress.${dersSlug}.${uniteSlug}`) || { completed: false, score: 0, attempts: 0, lastAttempt: null };
  },

  setLessonProgress(dersSlug, uniteSlug, data) {
    this.set(`progress.${dersSlug}.${uniteSlug}`, { ...this.getLessonProgress(dersSlug, uniteSlug), ...data, lastAttempt: new Date().toISOString() });
  },

  getDersProgress(dersSlug) {
    return this.get(`progress.${dersSlug}`) || {};
  },

  // Spaced repetition
  getReviewQueue() {
    const reviews = this.get('reviews') || [];
    const today = new Date().toISOString().split('T')[0];
    return reviews.filter(r => r.dueDate <= today && !r.done);
  },

  addReview(item) {
    const reviews = this.get('reviews') || [];
    reviews.push({ ...item, id: Date.now(), createdAt: new Date().toISOString() });
    this.set('reviews', reviews);
  },

  completeReview(id) {
    const reviews = this.get('reviews') || [];
    const idx = reviews.findIndex(r => r.id === id);
    if (idx >= 0) {
      const intervals = [1, 3, 7, 21];
      const r = reviews[idx];
      const nextInterval = intervals[(r.intervalIdx || 0) + 1];
      if (nextInterval) {
        const dueDate = new Date(Date.now() + nextInterval * 86400000).toISOString().split('T')[0];
        reviews[idx] = { ...r, done: false, dueDate, intervalIdx: (r.intervalIdx || 0) + 1 };
      } else {
        reviews[idx].done = true;
      }
      this.set('reviews', reviews);
    }
  },

  // Badges
  getBadges() {
    return this.get('badges') || [];
  },

  _checkBadges() {
    const badges = this.getBadges();
    const xp = this.getXP();
    const streak = this.get('streak') || 0;
    const allBadgeDefs = [
      { id: 'first_lesson', name: 'İlk Adım', icon: '🌟', desc: 'İlk dersini tamamladın!', check: () => xp >= 10 },
      { id: 'xp_100', name: 'Yüzlük Kulüp', icon: '💯', desc: '100 XP topladın!', check: () => xp >= 100 },
      { id: 'xp_500', name: 'Bilgi Şampiyonu', icon: '🏆', desc: '500 XP topladın!', check: () => xp >= 500 },
      { id: 'streak_3', name: '3 Gün Serisi', icon: '🔥', desc: '3 gün üst üste çalıştın!', check: () => streak >= 3 },
      { id: 'streak_7', name: 'Haftalık Seri', icon: '⚡', desc: '7 gün üst üste çalıştın!', check: () => streak >= 7 },
      { id: 'streak_21', name: 'Süper Seri', icon: '🚀', desc: '21 gün üst üste çalıştın!', check: () => streak >= 21 },
    ];
    let newBadge = null;
    for (const def of allBadgeDefs) {
      if (!badges.find(b => b.id === def.id) && def.check()) {
        const badge = { ...def, earnedAt: new Date().toISOString() };
        delete badge.check;
        badges.push(badge);
        newBadge = badge;
      }
    }
    if (newBadge) this.set('badges', badges);
    return newBadge;
  },

  // Mode
  getMode() {
    return this.get('mode') || 'normal';
  },

  setMode(mode) {
    this.set('mode', mode);
  },

  // Session time tracking
  startSession() {
    this.set('sessionStart', Date.now());
  },

  getSessionMinutes() {
    const start = this.get('sessionStart');
    if (!start) return 0;
    return Math.round((Date.now() - start) / 60000);
  },

  getTotalMinutes() {
    return this.get('totalMinutes') || 0;
  },

  addSessionMinutes(mins) {
    this.set('totalMinutes', this.getTotalMinutes() + mins);
  },

  // ====== GÜNLÜK OTURUM ======

  _todayStr() {
    return new Date().toISOString().split('T')[0];
  },

  getDailySession() {
    const s = this.get('dailySession');
    if (!s) return null;
    const today = this._todayStr();
    if (s.date === today) return s;
    // 4 saatlik gece yarısı toleransı (23:00'da başlayan ders gece yarısı geçmesine rağmen devam eder)
    if (s.startedAt && (Date.now() - s.startedAt) < 4 * 60 * 60 * 1000) return s;
    return null;
  },

  initDailySession() {
    const today = this._todayStr();
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const subjects = DAILY_ROTATIONS[dayOfYear % 10];

    // Her dersin sıradaki tamamlanmamış ünitesini bul
    const units = subjects.map(dersSlug => {
      const ders = (typeof DERSLER !== 'undefined') ? DERSLER.find(d => d.slug === dersSlug) : null;
      if (!ders) return null;
      const prog = this.getDersProgress(dersSlug);
      const nextUnite = ders.uniteler.find(u => !prog[u.slug]?.completed);
      return nextUnite ? nextUnite.slug : ders.uniteler[0].slug; // hepsi bitmişse baştan başla
    });

    const session = {
      date: today,
      subjectsToday: subjects,
      unitesToday: units,
      completed: [false, false, false],
      currentIndex: 0,
      startedAt: Date.now(),
      xpEarned: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      earlyExit: false,
    };
    this.set('dailySession', session);
    return session;
  },

  updateDailySession(updates) {
    const s = this.getDailySession();
    if (!s) return null;
    const updated = { ...s, ...updates };
    this.set('dailySession', updated);
    return updated;
  },

  // ====== DETAYLI CEVAP KAYDI ======

  recordAnswer(dersSlug, uniteSlug, answer) {
    // answer: { saniye, soru, secilen, dogru, dogruMu, ipucuKullandiMi, sure, tarih }
    const path = `progress.${dersSlug}.${uniteSlug}.answers`;
    const answers = this.get(path) || [];
    answers.push(answer);
    this.set(path, answers);
    this._updateWeakPoints(dersSlug, uniteSlug, answer.dogruMu);
  },

  getAnswerDetails(dersSlug, uniteSlug) {
    return this.get(`progress.${dersSlug}.${uniteSlug}.answers`) || [];
  },

  // ====== GÜNLÜK ÖZET GEÇMİŞİ ======

  saveDailySummary(summary) {
    // summary: { date, subjects, units, completedCount, totalQuestions, correctAnswers, wrongAnswers, hintsUsed, totalTime, xpEarned, earlyExit }
    const history = this.get('dailyHistory') || [];
    // Aynı güne ait varsa güncelle, yoksa ekle
    const idx = history.findIndex(h => h.date === summary.date);
    if (idx >= 0) history[idx] = summary;
    else history.push(summary);
    // Son 60 günü tut
    if (history.length > 60) history.shift();
    this.set('dailyHistory', history);
  },

  getDailyHistory(days = 7) {
    const history = this.get('dailyHistory') || [];
    return history.slice(-days);
  },

  // ====== ZAYIF NOKTA ANALİZİ ======

  _updateWeakPoints(dersSlug, uniteSlug, dogruMu) {
    const wp = this.get('weakPoints') || {};
    if (!wp[dersSlug]) wp[dersSlug] = { wrong: 0, total: 0, topics: [] };
    wp[dersSlug].total++;
    if (!dogruMu) {
      wp[dersSlug].wrong++;
      if (!wp[dersSlug].topics.includes(uniteSlug)) {
        wp[dersSlug].topics.push(uniteSlug);
      }
    }
    this.set('weakPoints', wp);
  },

  getWeakPoints() {
    return this.get('weakPoints') || {};
  },

  getWeakSubjects(threshold = 0.5) {
    const wp = this.getWeakPoints();
    return Object.entries(wp)
      .filter(([, v]) => v.total >= 3 && (v.wrong / v.total) >= threshold)
      .map(([slug, v]) => ({ slug, wrongRate: Math.round((v.wrong / v.total) * 100), topics: v.topics }))
      .sort((a, b) => b.wrongRate - a.wrongRate);
  },

  // ====== VELİ RAPORU ======

  getTodayReport() {
    const today = this._todayStr();
    const history = this.get('dailyHistory') || [];
    return history.find(h => h.date === today) || null;
  },

  // Reset for demo
  reset() {
    localStorage.removeItem(this._key);
  }
};

window.Store = Store;
