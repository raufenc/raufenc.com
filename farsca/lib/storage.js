/* ============================================================
   Storage — localStorage wrapper for progress tracking
   ============================================================ */
const FarsStorage = (() => {
  const PREFIX = 'farsca_';

  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch {}
  }

  function remove(key) {
    try { localStorage.removeItem(PREFIX + key); } catch {}
  }

  /* --- Progress helpers --- */
  function getProgress() {
    return get('progress', {
      xp: 0,
      level: 1,
      streak: 0,
      lastStudy: null,
      completedLessons: [],
      completedAlfabe: false,
      badges: [],
      totalCorrect: 0,
      totalWrong: 0,
      studyDays: []
    });
  }

  function saveProgress(p) { set('progress', p); }

  function addXP(amount) {
    const p = getProgress();
    p.xp += amount;
    /* Level thresholds: level N needs N*100 XP */
    while (p.xp >= p.level * 100 && p.level < 50) {
      p.xp -= p.level * 100;
      p.level++;
    }
    saveProgress(p);
    return p;
  }

  function updateStreak() {
    const p = getProgress();
    const today = new Date().toISOString().slice(0, 10);
    if (p.lastStudy === today) return p;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    p.streak = (p.lastStudy === yesterday) ? p.streak + 1 : 1;
    p.lastStudy = today;
    if (!p.studyDays.includes(today)) p.studyDays.push(today);
    saveProgress(p);
    return p;
  }

  function markLessonComplete(lessonId) {
    const p = getProgress();
    if (!p.completedLessons.includes(lessonId)) {
      p.completedLessons.push(lessonId);
    }
    saveProgress(p);
    return p;
  }

  function addBadge(badgeId) {
    const p = getProgress();
    if (!p.badges.includes(badgeId)) {
      p.badges.push(badgeId);
    }
    saveProgress(p);
    return p;
  }

  function recordAnswer(correct) {
    const p = getProgress();
    if (correct) p.totalCorrect++;
    else p.totalWrong++;
    saveProgress(p);
    return p;
  }

  /* --- Spaced Repetition Data --- */
  function getSRData() {
    return get('sr_data', {});
  }

  function saveSRData(data) {
    set('sr_data', data);
  }

  /* --- Settings --- */
  function getSettings() {
    return get('settings', {
      ttsRate: 0.85,
      ttsEnabled: true,
      showTranslit: true,
      dailyGoal: 20
    });
  }

  function saveSettings(s) { set('settings', s); }

  return {
    get, set, remove,
    getProgress, saveProgress, addXP, updateStreak,
    markLessonComplete, addBadge, recordAnswer,
    getSRData, saveSRData,
    getSettings, saveSettings
  };
})();
