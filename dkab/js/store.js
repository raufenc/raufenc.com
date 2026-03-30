// ===== DKAB Akademi - State Yonetimi (localStorage) =====

const STORAGE_KEY = 'dkab_akademi';

const DEFAULT_STATE = {
    user: null,
    progress: {},
    stats: {
        totalXp: 0,
        level: 1,
        streak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        badges: [],
        completedChapters: 0,
        totalQuizzes: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        enginesUsed: [],
        timeTracking: {},
        sessionLog: []
    },
    // 360° Ekosistem - Adaptif Ogrenme
    adaptive: {
        questionHistory: {},
        topicMastery: {}
    },
    // 360° Ekosistem - Degerlendirme
    assessments: {
        reactions: [],
        prePostResults: {}
    },
    // 360° Ekosistem - Akilli Ogrenme Yolu
    learningPath: {
        recommendations: [],
        lastGenerated: null,
        preferences: {
            dailyGoalMinutes: 15,
            difficulty: 'normal'
        }
    },
    // 360° Ekosistem - Hedef ve Dusunme
    goals: {
        active: [],
        completed: [],
        reflections: []
    },
    // 360° Ekosistem - Davranis Takibi
    behaviorLog: [],
    // 360° Ekosistem - Aliskanlik Takibi
    habits: {
        dailyLog: {}
    },
    // 360° Ekosistem - Sinif (Ekip)
    classroom: {
        code: null,
        joinedAt: null
    }
};

// XP thresholds per level
const XP_PER_LEVEL = 100;
const MAX_LEVEL = 99;

// Badge definitions
const BADGES = {
    first_lesson: { id: 'first_lesson', name: 'Ilk Adim', icon: '&#128218;', desc: 'Ilk dersini tamamla' },
    first_quiz: { id: 'first_quiz', name: 'Ilk Quiz', icon: '&#127919;', desc: 'Ilk quizi bitir' },
    perfect_quiz: { id: 'perfect_quiz', name: 'Mukemmel', icon: '&#11088;', desc: 'Bir quizde tum sorulari dogru cevapla' },
    streak_3: { id: 'streak_3', name: '3 Gun Serisi', icon: '&#128293;', desc: '3 gun ust uste calis' },
    streak_7: { id: 'streak_7', name: 'Haftalik Seri', icon: '&#127775;', desc: '7 gun ust uste calis' },
    streak_30: { id: 'streak_30', name: 'Aylik Seri', icon: '&#128081;', desc: '30 gun ust uste calis' },
    unit_complete: { id: 'unit_complete', name: 'Unite Fatihi', icon: '&#127942;', desc: 'Bir uniteyi tamamla' },
    five_units: { id: 'five_units', name: 'Bilge', icon: '&#129504;', desc: '5 unite tamamla' },
    level_5: { id: 'level_5', name: 'Cirak', icon: '&#128640;', desc: 'Seviye 5e ulas' },
    level_10: { id: 'level_10', name: 'Kalfa', icon: '&#11088;', desc: 'Seviye 10a ulas' },
    level_25: { id: 'level_25', name: 'Usta', icon: '&#128142;', desc: 'Seviye 25e ulas' },
    vocab_50: { id: 'vocab_50', name: 'Kelime Avcisi', icon: '&#128214;', desc: '50 terim ogren' },
    dua_master: { id: 'dua_master', name: 'Dua Ustasi', icon: '&#128588;', desc: 'Tum dualari ogren' },
    game_variety: { id: 'game_variety', name: 'Cok Yonlu', icon: '&#127922;', desc: '10 farkli oyun motorunu dene' }
};

class Store {
    constructor() {
        this._state = this._load();
        this._listeners = [];
    }

    _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const defaults = JSON.parse(JSON.stringify(DEFAULT_STATE));
                return {
                    ...defaults,
                    ...parsed,
                    stats: { ...defaults.stats, ...(parsed.stats || {}) },
                    adaptive: { ...defaults.adaptive, ...(parsed.adaptive || {}) },
                    assessments: { ...defaults.assessments, ...(parsed.assessments || {}) },
                    learningPath: {
                        ...defaults.learningPath,
                        ...(parsed.learningPath || {}),
                        preferences: { ...defaults.learningPath.preferences, ...(parsed.learningPath?.preferences || {}) }
                    },
                    goals: { ...defaults.goals, ...(parsed.goals || {}) },
                    habits: { ...defaults.habits, ...(parsed.habits || {}) },
                    classroom: { ...defaults.classroom, ...(parsed.classroom || {}) }
                };
            }
        } catch (e) {
            console.warn('Store load error:', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    _save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
        } catch (e) {
            console.warn('Store save error:', e);
        }
        this._notify();
    }

    _notify() {
        this._listeners.forEach(fn => fn(this._state));
    }

    onChange(fn) {
        this._listeners.push(fn);
        return () => {
            this._listeners = this._listeners.filter(l => l !== fn);
        };
    }

    get state() { return this._state; }
    get user() { return this._state.user; }
    get stats() { return this._state.stats; }

    // ===== User =====
    createUser(name, grade, avatar) {
        this._state.user = {
            name,
            grade,
            avatar: avatar || 'default',
            createdAt: new Date().toISOString().split('T')[0]
        };
        this._save();
    }

    setGrade(grade) {
        if (this._state.user) {
            this._state.user.grade = grade;
            this._save();
        }
    }

    // ===== Progress =====
    getProgress(grade, unitId, chapterId) {
        const g = this._state.progress[grade];
        if (!g) return null;
        const u = g[unitId];
        if (!u) return null;
        if (chapterId) return u[chapterId] || null;
        return u;
    }

    getUnitProgress(grade, unitId) {
        const u = this._state.progress[grade]?.[unitId];
        if (!u) return { completed: 0, total: 0, percent: 0 };
        const chapters = Object.values(u);
        const completed = chapters.filter(c => c.completed).length;
        return {
            completed,
            total: chapters.length,
            percent: chapters.length ? Math.round((completed / chapters.length) * 100) : 0
        };
    }

    getGradeProgress(grade) {
        const g = this._state.progress[grade];
        if (!g) return { completed: 0, total: 0, percent: 0 };
        let completed = 0, total = 0;
        Object.values(g).forEach(unit => {
            Object.values(unit).forEach(chapter => {
                total++;
                if (chapter.completed) completed++;
            });
        });
        return {
            completed,
            total,
            percent: total ? Math.round((completed / total) * 100) : 0
        };
    }

    completeChapter(grade, unitId, chapterId, xp, stars) {
        if (!this._state.progress[grade]) this._state.progress[grade] = {};
        if (!this._state.progress[grade][unitId]) this._state.progress[grade][unitId] = {};

        const prev = this._state.progress[grade][unitId][chapterId];
        const bestStars = Math.max(stars || 0, prev?.stars || 0);
        const isNew = !prev?.completed;
        const prevXp = prev?.xp || 0;
        const newXp = xp || 0;

        // Only award XP if this is new or score improved
        const xpToAward = isNew ? newXp : Math.max(0, newXp - prevXp);

        this._state.progress[grade][unitId][chapterId] = {
            completed: true,
            xp: Math.max(prevXp, newXp),
            stars: bestStars,
            completedAt: new Date().toISOString()
        };

        if (isNew) {
            this._state.stats.completedChapters++;
        }

        if (xpToAward > 0) {
            this._state.stats.totalXp += xpToAward;
            this._state.stats.level = Math.min(
                MAX_LEVEL,
                Math.floor(this._state.stats.totalXp / XP_PER_LEVEL) + 1
            );
        }

        this._checkBadges();
        this._save();

        return { isNew, xpGained: xpToAward, stars: bestStars };
    }

    // Track which game engine was used
    trackEngine(engineId) {
        if (!this._state.stats.enginesUsed) this._state.stats.enginesUsed = [];
        if (!this._state.stats.enginesUsed.includes(engineId)) {
            this._state.stats.enginesUsed.push(engineId);
            this._checkBadges();
            this._save();
        }
    }

    // ===== XP & Level =====
    addXp(amount) {
        // Eski metot adi — geriye uyumluluk icin addXP'ye yonlendir
        return this.addXP(amount);
    }

    getXpForCurrentLevel() {
        return this._state.stats.totalXp % XP_PER_LEVEL;
    }

    getXpNeededForNextLevel() {
        return XP_PER_LEVEL;
    }

    // ===== Streak =====
    updateStreak() {
        const today = new Date().toISOString().split('T')[0];
        const last = this._state.stats.lastActiveDate;

        if (last === today) return;

        if (last) {
            const lastDate = new Date(last + 'T00:00:00');
            const todayDate = new Date(today + 'T00:00:00');
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                this._state.stats.streak++;
            } else if (diffDays > 1) {
                this._state.stats.streak = 1;
            }
        } else {
            this._state.stats.streak = 1;
        }

        this._state.stats.lastActiveDate = today;
        this._state.stats.longestStreak = Math.max(
            this._state.stats.longestStreak,
            this._state.stats.streak
        );

        this._checkBadges();
        this._save();
    }

    // ===== Quiz Stats =====
    recordQuizResult(correct, total) {
        this._state.stats.totalQuizzes++;
        this._state.stats.correctAnswers += correct;
        this._state.stats.totalAnswers += total;

        if (correct === total && total > 0) {
            this.awardBadge('perfect_quiz');
        }
        if (this._state.stats.totalQuizzes === 1) {
            this.awardBadge('first_quiz');
        }

        this._save();
    }

    // ===== Badges =====
    awardBadge(badgeId) {
        if (!this._state.stats.badges.includes(badgeId)) {
            this._state.stats.badges.push(badgeId);
            return true;
        }
        return false;
    }

    hasBadge(badgeId) {
        return this._state.stats.badges.includes(badgeId);
    }

    _checkBadges() {
        const s = this._state.stats;

        // Streak badges
        if (s.streak >= 3) this.awardBadge('streak_3');
        if (s.streak >= 7) this.awardBadge('streak_7');
        if (s.streak >= 30) this.awardBadge('streak_30');

        // Level badges
        if (s.level >= 5) this.awardBadge('level_5');
        if (s.level >= 10) this.awardBadge('level_10');
        if (s.level >= 25) this.awardBadge('level_25');

        // Completion badges
        if (s.completedChapters >= 1) this.awardBadge('first_lesson');

        // Unit completion badges
        const progress = this._state.progress;
        let completedUnits = 0;
        Object.values(progress).forEach(grade => {
            Object.values(grade).forEach(unit => {
                const chapters = Object.values(unit);
                if (chapters.length > 0 && chapters.every(c => c.completed)) {
                    completedUnits++;
                }
            });
        });
        if (completedUnits >= 1) this.awardBadge('unit_complete');
        if (completedUnits >= 5) this.awardBadge('five_units');

        // Game variety badge
        if (s.enginesUsed && s.enginesUsed.length >= 10) this.awardBadge('game_variety');
    }

    // ===== 360° Adaptif Ogrenme =====
    recordAdaptiveAnswer(questionId, isCorrect) {
        const h = this._state.adaptive.questionHistory;
        if (!h[questionId]) {
            h[questionId] = { attempts: 0, correct: 0, lastSeen: null, interval: 1, nextReview: null };
        }
        h[questionId].attempts++;
        if (isCorrect) h[questionId].correct++;
        h[questionId].lastSeen = new Date().toISOString();

        // Aralikli tekrar: dogru ise aralik 2x, yanlis ise 1'e dusur
        if (isCorrect) {
            h[questionId].interval = Math.min(30, h[questionId].interval * 2);
        } else {
            h[questionId].interval = 1;
        }
        const next = new Date();
        next.setDate(next.getDate() + h[questionId].interval);
        h[questionId].nextReview = next.toISOString().split('T')[0];

        this._save();
    }

    updateTopicMastery(unitId, chapterId, score) {
        const key = `${unitId}_${chapterId}`;
        const m = this._state.adaptive.topicMastery;
        if (!m[key]) m[key] = { score: 0, attempts: 0 };
        m[key].attempts++;
        // Agirlikli ortalama: eski %60 + yeni %40
        m[key].score = Math.round(m[key].score * 0.6 + score * 0.4);
        this._save();
    }

    getTopicMastery(unitId, chapterId) {
        return this._state.adaptive.topicMastery[`${unitId}_${chapterId}`] || { score: 0, attempts: 0 };
    }

    getQuestionsForReview() {
        const today = new Date().toISOString().split('T')[0];
        return Object.entries(this._state.adaptive.questionHistory)
            .filter(([, h]) => h.nextReview && h.nextReview <= today)
            .map(([id, h]) => ({ questionId: id, ...h }));
    }

    // ===== 360° Degerlendirme =====
    addReaction(grade, unitId, chapterId, rating, comment) {
        this._state.assessments.reactions.push({
            grade, unitId, chapterId, rating, comment,
            date: new Date().toISOString()
        });
        this._save();
    }

    savePrePostResult(grade, unitId, type, score, total) {
        const key = `${grade}_${unitId}`;
        if (!this._state.assessments.prePostResults[key]) {
            this._state.assessments.prePostResults[key] = {};
        }
        this._state.assessments.prePostResults[key][type] = {
            score, total,
            percent: total > 0 ? Math.round((score / total) * 100) : 0,
            date: new Date().toISOString()
        };
        this._save();
    }

    getPrePostResult(grade, unitId) {
        return this._state.assessments.prePostResults[`${grade}_${unitId}`] || null;
    }

    // ===== 360° Hedefler =====
    addGoal(text, deadline) {
        this._state.goals.active.push({
            id: Date.now().toString(36),
            text, deadline,
            createdAt: new Date().toISOString()
        });
        this._save();
    }

    completeGoal(goalId) {
        const idx = this._state.goals.active.findIndex(g => g.id === goalId);
        if (idx >= 0) {
            const goal = this._state.goals.active.splice(idx, 1)[0];
            goal.completedAt = new Date().toISOString();
            this._state.goals.completed.push(goal);
            this._save();
        }
    }

    addReflection(text) {
        this._state.goals.reflections.push({
            text,
            date: new Date().toISOString()
        });
        this._save();
    }

    // ===== 360° Davranis Takibi =====
    logBehavior(behaviors) {
        this._state.behaviorLog.push({
            behaviors,
            date: new Date().toISOString()
        });
        this._save();
    }

    updateTodayBehavior(behaviors) {
        const today = new Date().toISOString().split('T')[0];
        const log = this._state.behaviorLog;
        const idx = log.findIndex(l => l.date?.startsWith(today));
        if (idx >= 0) {
            log[idx] = { behaviors, date: new Date().toISOString() };
        } else {
            log.push({ behaviors, date: new Date().toISOString() });
        }
        this._save();
    }

    // ===== 360° Aliskanlik Takibi =====
    logDailyActivity() {
        const today = new Date().toISOString().split('T')[0];
        if (!this._state.habits.dailyLog[today]) {
            this._state.habits.dailyLog[today] = { sessions: 0, minutesSpent: 0 };
        }
        this._state.habits.dailyLog[today].sessions++;
        this._save();
    }

    addTimeSpent(minutes) {
        const today = new Date().toISOString().split('T')[0];
        if (!this._state.habits.dailyLog[today]) {
            this._state.habits.dailyLog[today] = { sessions: 0, minutesSpent: 0 };
        }
        this._state.habits.dailyLog[today].minutesSpent += minutes;
        this._save();
    }

    getDailyLog() {
        return this._state.habits.dailyLog;
    }

    getTotalDaysActive() {
        return Object.keys(this._state.habits.dailyLog).length;
    }

    // ===== 360° Ogrenme Yolu Tercihleri =====
    setDifficulty(difficulty) {
        this._state.learningPath.preferences.difficulty = difficulty;
        this._save();
    }

    getDifficulty() {
        return this._state.learningPath.preferences.difficulty || 'normal';
    }

    // ===== 360° Sinif (Ekip) =====
    joinClassroom(code) {
        this._state.classroom.code = code;
        this._state.classroom.joinedAt = new Date().toISOString();
        this._save();
    }

    leaveClassroom() {
        this._state.classroom.code = null;
        this._state.classroom.joinedAt = null;
        this._save();
    }

    getClassroomCode() {
        return this._state.classroom.code;
    }

    // Kalıcı anonim kullanıcı ID'si (Firebase için)
    getUserId() {
        if (!this._state.userId) {
            this._state.userId = 'u_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
            this._save();
        }
        return this._state.userId;
    }

    // XP ekle (harici tetikleyiciler icin — orn. meydan okuma kabul)
    addXP(amount) {
        if (amount <= 0) return;
        const oldLevel = this._state.stats.level;
        this._state.stats.totalXp = (this._state.stats.totalXp || 0) + amount;
        this._state.stats.level = Math.min(
            MAX_LEVEL,
            Math.floor(this._state.stats.totalXp / XP_PER_LEVEL) + 1
        );
        this._checkBadges();
        this._save();

        // Seviye atladiysa kutlama
        if (this._state.stats.level > oldLevel) {
            this._onLevelUp?.(this._state.stats.level);
        }
    }

    // Seviye atlama callback'i (effects.js ile entegrasyon)
    onLevelUp(fn) {
        this._onLevelUp = fn;
    }

    // ===== Reset =====
    resetAll() {
        this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        localStorage.removeItem(STORAGE_KEY);
        this._notify();
    }

    resetGrade(grade) {
        delete this._state.progress[grade];
        this._save();
    }
}

// Singleton
const store = new Store();
export { store, BADGES, XP_PER_LEVEL };
