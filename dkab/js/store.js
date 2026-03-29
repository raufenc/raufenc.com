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
        enginesUsed: []
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
                return {
                    ...JSON.parse(JSON.stringify(DEFAULT_STATE)),
                    ...parsed,
                    stats: { ...JSON.parse(JSON.stringify(DEFAULT_STATE.stats)), ...(parsed.stats || {}) }
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
        if (amount <= 0) return;
        this._state.stats.totalXp += amount;
        this._state.stats.level = Math.min(
            MAX_LEVEL,
            Math.floor(this._state.stats.totalXp / XP_PER_LEVEL) + 1
        );
        this._checkBadges();
        this._save();
        return { newLevel: this._state.stats.level };
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
