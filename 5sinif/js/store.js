// ====== SEVİYE SİSTEMİ ======
const LEVELS = [
  { level: 1,  name: 'Yeni Kaşif',         xp: 0,     icon: '🌱' },
  { level: 2,  name: 'Meraklı Öğrenci',     xp: 50,    icon: '🌿' },
  { level: 3,  name: 'Azimli Çalışkan',     xp: 100,   icon: '🌳' },
  { level: 4,  name: 'Bilgi Toplayıcı',     xp: 150,   icon: '📚' },
  { level: 5,  name: 'Hızlı Öğrenci',       xp: 200,   icon: '⚡' },
  { level: 6,  name: 'Soru Avcısı',         xp: 300,   icon: '🎯' },
  { level: 7,  name: 'Ders Kahramanı',      xp: 400,   icon: '🦸' },
  { level: 8,  name: 'Bilgi Yıldızı',       xp: 500,   icon: '⭐' },
  { level: 9,  name: 'Süper Öğrenci',       xp: 650,   icon: '🌟' },
  { level: 10, name: 'Parlak Zeka',         xp: 800,   icon: '💡' },
  { level: 11, name: 'Bilim İnsanı',        xp: 1000,  icon: '🔬' },
  { level: 12, name: 'Matematik Dehası',    xp: 1200,  icon: '🧮' },
  { level: 13, name: 'Dil Ustası',          xp: 1400,  icon: '📝' },
  { level: 14, name: 'Tarih Gezgini',       xp: 1600,  icon: '🗺️' },
  { level: 15, name: 'Doğa Kaşifi',         xp: 1800,  icon: '🌍' },
  { level: 16, name: 'Bilgi Şövalyesi',     xp: 2100,  icon: '🛡️' },
  { level: 17, name: 'Araştırmacı',         xp: 2400,  icon: '🔎' },
  { level: 18, name: 'Bilge Öğrenci',       xp: 2700,  icon: '🎓' },
  { level: 19, name: 'Efsane Çalışkan',     xp: 3000,  icon: '🏅' },
  { level: 20, name: 'Altın Beyin',         xp: 3400,  icon: '🧠' },
  { level: 21, name: 'Ders Prensi',         xp: 3800,  icon: '👑' },
  { level: 22, name: 'Bilgi Savaşçısı',     xp: 4200,  icon: '⚔️' },
  { level: 23, name: 'Sınıf Yıldızı',      xp: 4700,  icon: '🌠' },
  { level: 24, name: 'Mega Beyin',          xp: 5200,  icon: '🚀' },
  { level: 25, name: 'Elmas Öğrenci',       xp: 5800,  icon: '💎' },
  { level: 26, name: 'Bilgi Ejderhası',     xp: 6500,  icon: '🐉' },
  { level: 27, name: 'Dahi Kaşif',          xp: 7200,  icon: '🧪' },
  { level: 28, name: 'Profesör',            xp: 8000,  icon: '🎩' },
  { level: 29, name: 'Uzay Kaşifi',         xp: 9000,  icon: '🛸' },
  { level: 30, name: 'Bilgi Ustası',        xp: 10000, icon: '🏆' },
];

// ====== GENİŞLETİLMİŞ ROZET SİSTEMİ ======
const BADGE_DEFS = [
  // XP Rozetleri
  { id: 'first_lesson', name: 'İlk Adım',        icon: '🌟', desc: 'İlk dersini tamamla',         category: 'xp',    hint: 'Bir ders tamamla' },
  { id: 'xp_100',  name: 'Yüzlük Kulüp',         icon: '💯', desc: '100 XP topla',                category: 'xp',    hint: '100 XP kazan' },
  { id: 'xp_500',  name: 'Bilgi Şampiyonu',       icon: '🏆', desc: '500 XP topla',                category: 'xp',    hint: '500 XP kazan' },
  { id: 'xp_1000', name: 'Bin Puan Efsanesi',     icon: '🎖️', desc: '1000 XP topla',              category: 'xp',    hint: '1000 XP kazan' },
  { id: 'xp_2500', name: 'XP Kralı',              icon: '👑', desc: '2500 XP topla',               category: 'xp',    hint: '2500 XP kazan' },
  { id: 'xp_5000', name: 'Efsanevi Bilgin',       icon: '💎', desc: '5000 XP topla',               category: 'xp',    hint: '5000 XP kazan' },
  { id: 'xp_10000',name: 'Ölümsüz Usta',          icon: '🐉', desc: '10000 XP topla',             category: 'xp',    hint: '10000 XP kazan' },
  // Seri Rozetleri
  { id: 'streak_3',  name: '3 Gün Serisi',        icon: '🔥', desc: '3 gün üst üste çalış',       category: 'seri',  hint: '3 gün art arda gir' },
  { id: 'streak_7',  name: 'Haftalık Seri',       icon: '⚡', desc: '7 gün üst üste çalış',       category: 'seri',  hint: '7 gün art arda gir' },
  { id: 'streak_14', name: 'Çelik İrade',         icon: '💪', desc: '14 gün üst üste çalış',      category: 'seri',  hint: '14 gün art arda gir' },
  { id: 'streak_21', name: 'Süper Seri',          icon: '🚀', desc: '21 gün üst üste çalış',      category: 'seri',  hint: '21 gün art arda gir' },
  { id: 'streak_30', name: 'Demir Disiplin',      icon: '🏅', desc: '30 gün üst üste çalış',      category: 'seri',  hint: '30 gün art arda gir' },
  // Ders Ustalığı
  { id: 'master_matematik', name: 'Matematik Ustası', icon: '📐', desc: 'Tüm matematik ünitelerini tamamla', category: 'ustalık', hint: 'Matematiğin tüm ünitelerini bitir' },
  { id: 'master_fen',       name: 'Fen Bilimcisi',    icon: '🔬', desc: 'Tüm fen ünitelerini tamamla',       category: 'ustalık', hint: 'Fen Bilimlerinin tüm ünitelerini bitir' },
  { id: 'master_turkce',    name: 'Dil Ustası',       icon: '📖', desc: 'Tüm Türkçe ünitelerini tamamla',    category: 'ustalık', hint: 'Türkçe\'nin tüm ünitelerini bitir' },
  { id: 'master_sosyal',    name: 'Tarih Bilgini',    icon: '🌍', desc: 'Tüm sosyal bilgiler ünitelerini tamamla', category: 'ustalık', hint: 'Sosyal Bilgilerin tüm ünitelerini bitir' },
  { id: 'master_ingilizce', name: 'İngilizce Yıldızı',icon: '🇬🇧', desc: 'Tüm İngilizce ünitelerini tamamla', category: 'ustalık', hint: 'İngilizce\'nin tüm ünitelerini bitir' },
  // İsabet Rozetleri
  { id: 'perfect_1',  name: 'Mükemmel Ders',      icon: '✨', desc: 'Bir derste %100 yap',         category: 'isabet', hint: 'Bir derste tüm soruları doğru cevapla' },
  { id: 'perfect_3',  name: 'Üçlü Mükemmel',      icon: '🌈', desc: '3 derste %100 yap',          category: 'isabet', hint: '3 farklı derste mükemmel puan al' },
  { id: 'perfect_10', name: 'Hatasız Kul',         icon: '💫', desc: '10 derste %100 yap',         category: 'isabet', hint: '10 farklı derste mükemmel puan al' },
  { id: 'no_hint',    name: 'İpucusuz Kahraman',   icon: '🧩', desc: 'Bir dersi ipucu kullanmadan bitir', category: 'isabet', hint: 'Hiç ipucu kullanmadan bir ders tamamla' },
  // Keşif Rozetleri
  { id: 'explore_all',  name: 'Kaşif',             icon: '🗺️', desc: '5 dersin hepsini dene',      category: 'keşif', hint: 'Her 5 dersten en az 1 ünite aç' },
  { id: 'units_10',     name: 'Yolcu',             icon: '🚶', desc: '10 ünite tamamla',           category: 'keşif', hint: 'Toplam 10 ünite bitir' },
  { id: 'units_25',     name: 'Gezgin',            icon: '🚴', desc: '25 ünite tamamla',           category: 'keşif', hint: 'Toplam 25 ünite bitir' },
  { id: 'units_50',     name: 'Dünya Gezgini',     icon: '✈️', desc: '50 ünite tamamla',           category: 'keşif', hint: 'Toplam 50 ünite bitir' },
  // Özel Rozetler
  { id: 'night_owl',    name: 'Gece Baykuşu',     icon: '🦉', desc: 'Saat 20:00 sonrası çalış',   category: 'özel',  hint: 'Akşam 8\'den sonra ders tamamla' },
  { id: 'early_bird',   name: 'Erken Kuş',         icon: '🐦', desc: 'Saat 08:00 öncesi çalış',    category: 'özel',  hint: 'Sabah 8\'den önce ders tamamla' },
  { id: 'speed_demon',  name: 'Hız Canavarı',      icon: '⏱️', desc: 'Bir soruyu 5 saniyede cevapla', category: 'özel', hint: '5 saniyenin altında doğru cevap ver' },
  { id: 'weekend_hero', name: 'Hafta Sonu Savaşçısı', icon: '🦸', desc: 'Hafta sonunda çalış',    category: 'özel',  hint: 'Cumartesi veya pazar günü ders tamamla' },
  { id: 'mission_master', name: 'Görev Ustası',    icon: '🎯', desc: 'Bir günde 3 görevi tamamla',  category: 'özel',  hint: 'Aynı gün 3 günlük görevi bitir' },
];

const BADGE_CATEGORIES = {
  'xp':      { name: 'XP Rozetleri',       icon: '⭐' },
  'seri':    { name: 'Seri Rozetleri',      icon: '🔥' },
  'ustalık': { name: 'Ders Ustalığı',       icon: '🎓' },
  'isabet':  { name: 'İsabet Rozetleri',    icon: '🎯' },
  'keşif':   { name: 'Keşif Rozetleri',     icon: '🗺️' },
  'özel':    { name: 'Özel Rozetler',       icon: '✨' },
};

// ====== GÜNLÜK GÖREV SİSTEMİ ======
const MISSION_POOL = [
  { id: 'complete_2',   text: 'Bugün 2 ders tamamla',           xp: 30, check: (s) => s.lessonsToday >= 2 },
  { id: 'streak_5',     text: 'Art arda 5 doğru cevap ver',     xp: 40, check: (s) => s.maxCorrectStreak >= 5 },
  { id: 'study_15',     text: '15 dakika çalış',                xp: 25, check: (s) => s.minutesToday >= 15 },
  { id: 'new_subject',  text: 'Yeni bir derse başla',           xp: 20, check: (s) => s.newSubjectToday },
  { id: 'no_hints',     text: 'İpucu kullanmadan ders bitir',   xp: 35, check: (s) => s.hintFreeLesson },
  { id: 'review_one',   text: 'Tekrar Merkezi\'nden tekrar yap', xp: 25, check: (s) => s.reviewDoneToday },
  { id: 'speed_10',     text: '10 saniyede bir soru çöz',       xp: 15, check: (s) => s.fastAnswer },
  { id: 'daily_all',    text: '3 günlük dersini tamamla',       xp: 50, check: (s) => s.dailyAllDone },
  { id: 'answer_20',    text: '20 soru çöz',                    xp: 30, check: (s) => s.questionsToday >= 20 },
  { id: 'accuracy_80',  text: '%80 üzeri başarı oranı yakala',  xp: 35, check: (s) => s.accuracyToday >= 80 },
];

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

// localStorage CRUD helpers — Çoklu kullanıcı namespace desteği
const Store = {
  _currentUid: null,
  _legacyKey: '5sinif_lms_v1',

  get _key() {
    return '5sinif_' + (this._currentUid || 'anonymous');
  },

  setUser(uid) {
    this._currentUid = uid || 'anonymous';
    // Migrasyon: eski veriler varsa ve yeni key boşsa, kopyala
    if (uid && !localStorage.getItem(this._key) && localStorage.getItem(this._legacyKey)) {
      const legacy = localStorage.getItem(this._legacyKey);
      try {
        const data = JSON.parse(legacy);
        // Sadece aynı uid veya profili olmayan legacy data kopyalanır
        if (!data.profile?.uid || data.profile.uid === uid) {
          localStorage.setItem(this._key, legacy);
        }
      } catch {}
    }
  },

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

  // XP & Seviye
  getXP() {
    return this.get('xp') || 0;
  },

  addXP(amount) {
    const oldXP = this.getXP();
    const oldLevel = this.getLevel();
    const newXP = oldXP + amount;
    this.set('xp', newXP);
    const newLevel = this.getLevel();
    const newBadge = this._checkBadges();
    const leveledUp = newLevel.level > oldLevel.level ? newLevel : null;
    return { xp: newXP, leveledUp, newBadge };
  },

  getLevel() {
    const xp = this.getXP();
    let current = LEVELS[0];
    for (const lvl of LEVELS) {
      if (xp >= lvl.xp) current = lvl;
      else break;
    }
    return current;
  },

  getLevelProgress() {
    const xp = this.getXP();
    const current = this.getLevel();
    const idx = LEVELS.findIndex(l => l.level === current.level);
    const next = LEVELS[idx + 1];
    if (!next) return { current, next: null, pct: 100, xpToNext: 0 };
    const range = next.xp - current.xp;
    const progress = xp - current.xp;
    return { current, next, pct: Math.min(100, Math.round((progress / range) * 100)), xpToNext: next.xp - xp };
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
    const hour = new Date().getHours();
    const dayOfWeek = new Date().getDay();

    // Tamamlanan unite sayisi hesapla
    const completedUnits = this._countCompletedUnits();
    const perfectLessons = this._countPerfectLessons();
    const subjectsExplored = this._countExploredSubjects();
    const subjectMastery = this._checkSubjectMastery();

    const checks = {
      'first_lesson': () => xp >= 10,
      'xp_100': () => xp >= 100,
      'xp_500': () => xp >= 500,
      'xp_1000': () => xp >= 1000,
      'xp_2500': () => xp >= 2500,
      'xp_5000': () => xp >= 5000,
      'xp_10000': () => xp >= 10000,
      'streak_3': () => streak >= 3,
      'streak_7': () => streak >= 7,
      'streak_14': () => streak >= 14,
      'streak_21': () => streak >= 21,
      'streak_30': () => streak >= 30,
      'master_matematik': () => subjectMastery.matematik,
      'master_fen': () => subjectMastery.fen,
      'master_turkce': () => subjectMastery.turkce,
      'master_sosyal': () => subjectMastery.sosyal,
      'master_ingilizce': () => subjectMastery.ingilizce,
      'perfect_1': () => perfectLessons >= 1,
      'perfect_3': () => perfectLessons >= 3,
      'perfect_10': () => perfectLessons >= 10,
      'no_hint': () => !!this.get('hintFreeLesson'),
      'explore_all': () => subjectsExplored >= 5,
      'units_10': () => completedUnits >= 10,
      'units_25': () => completedUnits >= 25,
      'units_50': () => completedUnits >= 50,
      'night_owl': () => hour >= 20,
      'early_bird': () => hour < 8,
      'speed_demon': () => !!this.get('fastAnswerEarned'),
      'weekend_hero': () => dayOfWeek === 0 || dayOfWeek === 6,
      'mission_master': () => {
        const m = this.getDailyMissions();
        return m.every(mi => mi.completed);
      },
    };

    let newBadge = null;
    for (const def of BADGE_DEFS) {
      if (!badges.find(b => b.id === def.id) && checks[def.id] && checks[def.id]()) {
        const badge = { id: def.id, name: def.name, icon: def.icon, desc: def.desc, category: def.category, earnedAt: new Date().toISOString() };
        badges.push(badge);
        newBadge = badge;
      }
    }
    if (newBadge) this.set('badges', badges);
    return newBadge;
  },

  _countCompletedUnits() {
    let count = 0;
    if (typeof DERSLER === 'undefined') return 0;
    for (const d of DERSLER) {
      const prog = this.getDersProgress(d.slug);
      count += Object.values(prog).filter(p => p && p.completed).length;
    }
    return count;
  },

  _countPerfectLessons() {
    let count = 0;
    if (typeof DERSLER === 'undefined') return 0;
    for (const d of DERSLER) {
      const prog = this.getDersProgress(d.slug);
      for (const u of d.uniteler) {
        const p = prog[u.slug];
        if (p && p.completed && p.score === (u.checkpoints || []).length && (u.checkpoints || []).length > 0) count++;
      }
    }
    return count;
  },

  _countExploredSubjects() {
    if (typeof DERSLER === 'undefined') return 0;
    let count = 0;
    for (const d of DERSLER) {
      const prog = this.getDersProgress(d.slug);
      if (Object.keys(prog).length > 0) count++;
    }
    return count;
  },

  _checkSubjectMastery() {
    const result = {};
    if (typeof DERSLER === 'undefined') return result;
    for (const d of DERSLER) {
      const prog = this.getDersProgress(d.slug);
      const total = d.uniteler.length;
      const done = Object.values(prog).filter(p => p && p.completed).length;
      result[d.slug] = total > 0 && done >= total;
    }
    return result;
  },

  // ====== GÜNLÜK GÖREVLER ======
  getDailyMissions() {
    const today = this._todayStr();
    const saved = this.get('dailyMissions');
    if (saved && saved.date === today) return saved.missions;
    // Deterministik secim (tarih seed)
    const seed = today.split('-').join('');
    const seedNum = parseInt(seed) % 1000;
    const shuffled = [...MISSION_POOL].sort((a, b) => {
      const ha = ((seedNum * 31 + a.id.charCodeAt(0)) % 100);
      const hb = ((seedNum * 31 + b.id.charCodeAt(0)) % 100);
      return ha - hb;
    });
    const selected = shuffled.slice(0, 3).map(m => ({
      id: m.id, text: m.text, xp: m.xp, completed: false
    }));
    this.set('dailyMissions', { date: today, missions: selected });
    return selected;
  },

  checkMissions() {
    const missions = this.getDailyMissions();
    const state = this._getMissionState();
    let anyCompleted = false;
    for (const m of missions) {
      if (m.completed) continue;
      const def = MISSION_POOL.find(p => p.id === m.id);
      if (def && def.check(state)) {
        m.completed = true;
        this.addXP(m.xp);
        anyCompleted = true;
      }
    }
    if (anyCompleted) {
      this.set('dailyMissions', { date: this._todayStr(), missions });
      this._checkBadges();
    }
    return missions;
  },

  _getMissionState() {
    const session = this.getDailySession();
    const report = this.getTodayReport();
    const lessonsToday = report ? report.completedCount : (session ? session.completed.filter(Boolean).length : 0);
    const questionsToday = report ? report.totalQuestions : (session ? session.totalQuestions : 0);
    const correctToday = report ? report.correctAnswers : (session ? session.correctAnswers : 0);
    const accuracyToday = questionsToday > 0 ? Math.round((correctToday / questionsToday) * 100) : 0;
    return {
      lessonsToday,
      questionsToday,
      accuracyToday,
      maxCorrectStreak: this.get('maxCorrectStreakToday') || 0,
      minutesToday: this.getSessionMinutes(),
      newSubjectToday: !!this.get('newSubjectToday'),
      hintFreeLesson: !!this.get('hintFreeLessonToday'),
      reviewDoneToday: !!this.get('reviewDoneToday'),
      fastAnswer: !!this.get('fastAnswerToday'),
      dailyAllDone: session ? session.completed.every(Boolean) : false,
    };
  },

  // Gorev durum takip yardimcilari
  recordCorrectStreak(count) {
    const current = this.get('maxCorrectStreakToday') || 0;
    if (count > current) this.set('maxCorrectStreakToday', count);
  },

  recordFastAnswer() { this.set('fastAnswerToday', true); this.set('fastAnswerEarned', true); },
  recordHintFreeLesson() { this.set('hintFreeLessonToday', true); this.set('hintFreeLesson', true); },
  recordNewSubject() { this.set('newSubjectToday', true); },
  recordReviewDone() { this.set('reviewDoneToday', true); },

  resetDailyTrackers() {
    const today = this._todayStr();
    if (this.get('lastTrackerReset') !== today) {
      this.set('maxCorrectStreakToday', 0);
      this.set('fastAnswerToday', false);
      this.set('hintFreeLessonToday', false);
      this.set('newSubjectToday', false);
      this.set('reviewDoneToday', false);
      this.set('lastTrackerReset', today);
    }
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

  // ====== AVATAR SİSTEMİ ======
  getAvatar() {
    return this.get('avatar') || { base: 0, hair: 0, accessory: -1, frame: -1 };
  },
  setAvatar(config) { this.set('avatar', config); },

  // ====== TEMA SİSTEMİ ======
  getTheme() { return this.get('theme') || 'default'; },
  setTheme(id) { this.set('theme', id); applyTheme(id); },

  getUnlockedThemes() {
    const lvl = this.getLevel().level;
    const unlocked = ['default'];
    if (lvl >= 5) unlocked.push('sunset');
    if (lvl >= 10) unlocked.push('forest');
    if (lvl >= 15) unlocked.push('space');
    if (lvl >= 20) unlocked.push('ocean');
    if (lvl >= 30) unlocked.push('rainbow');
    return unlocked;
  },

  // ====== ÖDEV SİSTEMİ ======
  getAssignments() { return this.get('assignments') || []; },
  addAssignment(a) {
    const list = this.getAssignments();
    list.push({ ...a, id: Date.now(), createdAt: new Date().toISOString(), completed: false });
    this.set('assignments', list);
  },
  completeAssignment(id) {
    const list = this.getAssignments();
    const a = list.find(x => x.id === id);
    if (a) { a.completed = true; a.completedAt = new Date().toISOString(); this.set('assignments', list); }
  },

  // ====== VELİ KUTLAMA SİSTEMİ ======
  getCelebrations() { return this.get('celebrations') || []; },
  addCelebration(msg, type) {
    const list = this.getCelebrations();
    list.push({ msg, type, id: Date.now(), seen: false });
    this.set('celebrations', list);
  },
  getUnseenCelebrations() {
    return this.getCelebrations().filter(c => !c.seen);
  },
  markCelebrationsSeen() {
    const list = this.getCelebrations();
    list.forEach(c => c.seen = true);
    this.set('celebrations', list);
  },

  // ====== MESAJLAŞMA ======
  getMessages() { return this.get('messages') || []; },
  addMessage(from, text) {
    const list = this.getMessages();
    list.push({ from, text, time: new Date().toISOString(), read: false });
    if (list.length > 50) list.shift();
    this.set('messages', list);
  },

  // ====== ONBOARDING ======
  isOnboarded() { return !!this.get('onboarded'); },
  setOnboarded() { this.set('onboarded', true); },

  // ====== VELİ HEDEF SİSTEMİ ======
  getParentGoals() {
    return this.get('parentGoals') || [];
  },

  addParentGoal(goal) {
    const goals = this.getParentGoals();
    goals.push({ ...goal, id: Date.now(), createdAt: new Date().toISOString(), completed: false });
    this.set('parentGoals', goals);
    return goals;
  },

  removeParentGoal(id) {
    const goals = this.getParentGoals().filter(g => g.id !== id);
    this.set('parentGoals', goals);
    return goals;
  },

  checkParentGoals() {
    const goals = this.getParentGoals();
    let changed = false;
    for (const g of goals) {
      if (g.completed) continue;
      let met = false;
      if (g.type === 'lessons') {
        met = this._countCompletedUnits() >= g.target;
      } else if (g.type === 'accuracy') {
        const wp = this.getWeakPoints();
        const ders = wp[g.subject];
        if (ders && ders.total >= 3) {
          met = ((1 - ders.wrong / ders.total) * 100) >= g.target;
        }
      } else if (g.type === 'streak') {
        met = this.getStreak() >= g.target;
      } else if (g.type === 'xp') {
        met = this.getXP() >= g.target;
      }
      if (met) { g.completed = true; g.completedAt = new Date().toISOString(); changed = true; }
    }
    if (changed) this.set('parentGoals', goals);
    return goals;
  },

  // Reset for demo
  reset() {
    localStorage.removeItem(this._key);
  }
};

window.Store = Store;

// ====== TEMA UYGULAMA ======
const THEMES = {
  default: { name: 'Varsayılan', icon: '💙', colors: {} },
  sunset:  { name: 'Günbatımı', icon: '🌅', colors: { '--primary':'#FF6B35','--primary-light':'#FFF3E0','--bg':'#FFF8F0','--card-bg':'#FFFAF5' }},
  forest:  { name: 'Orman', icon: '🌲', colors: { '--primary':'#2E7D32','--primary-light':'#E8F5E9','--bg':'#F1F8E9','--card-bg':'#F9FBF2' }},
  space:   { name: 'Uzay', icon: '🌌', colors: { '--primary':'#7C4DFF','--primary-light':'#1a1a2e','--bg':'#0f0f23','--card-bg':'#16213e','--text':'#e0e0e0','--text-light':'#aaa' }},
  ocean:   { name: 'Okyanus', icon: '🌊', colors: { '--primary':'#00ACC1','--primary-light':'#E0F7FA','--bg':'#F0FEFF','--card-bg':'#F5FFFE' }},
  rainbow: { name: 'Gökkuşağı', icon: '🌈', colors: { '--primary':'#E91E63','--primary-light':'#FCE4EC','--bg':'linear-gradient(135deg,#FFF3E0,#F3E5F5,#E8F5E9)','--card-bg':'#fff' }},
};
window.THEMES = THEMES;

function applyTheme(id) {
  const theme = THEMES[id];
  if (!theme) return;
  const root = document.documentElement;
  // Reset
  root.removeAttribute('data-theme');
  ['--primary','--primary-light','--bg','--card-bg','--text','--text-light'].forEach(p => root.style.removeProperty(p));
  if (id === 'space') root.setAttribute('data-theme', 'dark');
  Object.entries(theme.colors).forEach(([k, v]) => root.style.setProperty(k, v));
}
window.applyTheme = applyTheme;

// Sayfa yuklenince aktif temayi uygula
document.addEventListener('DOMContentLoaded', () => applyTheme(Store.getTheme()));
