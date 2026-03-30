// ===== DKAB Akademi - 360° Adaptif Ogrenme Motoru =====

import { store } from './store.js?v=13';

/**
 * Adaptif ogrenme algoritmasi:
 * - Aralikli tekrar (spaced repetition) ile soru secimi
 * - Konu ustaligi hesaplama
 * - Zorluk seviyesine gore soru filtreleme
 * - Akilli quiz olusturma
 */

// Zorluk carpanlari
const DIFFICULTY_MULTIPLIERS = {
    easy: { xp: 1, timeBonus: 1.5, hintVisible: true, questionCount: 0.7 },
    normal: { xp: 1, timeBonus: 1, hintVisible: false, questionCount: 1 },
    challenge: { xp: 1.5, timeBonus: 0.7, hintVisible: false, questionCount: 1.3 }
};

/**
 * Quiz icin adaptif soru secimi yapar
 * %30 zayif alanlardan, %50 mevcut konudan, %20 tekrar
 */
export function selectAdaptiveQuestions(allQuestions, unitId, chapterId, maxCount = 10) {
    const difficulty = store.getDifficulty();
    const multiplier = DIFFICULTY_MULTIPLIERS[difficulty] || DIFFICULTY_MULTIPLIERS.normal;
    const targetCount = Math.round(maxCount * multiplier.questionCount);

    const today = new Date().toISOString().split('T')[0];
    const history = store.state.adaptive.questionHistory;

    // Mevcut bolum sorulari
    const currentQuestions = allQuestions.filter(q => q.bolum_id === chapterId);

    // Tekrar gereken sorular (tum sorular arasindan)
    const reviewDue = allQuestions.filter(q => {
        const h = history[q.soru_id];
        return h && h.nextReview && h.nextReview <= today;
    });

    // Zayif alan sorulari (dogruluk < %50)
    const weakQuestions = allQuestions.filter(q => {
        const h = history[q.soru_id];
        return h && h.attempts >= 2 && (h.correct / h.attempts) < 0.5;
    });

    // Secim: %50 mevcut, %30 zayif, %20 tekrar
    const selected = [];
    const currentCount = Math.ceil(targetCount * 0.5);
    const weakCount = Math.ceil(targetCount * 0.3);
    const reviewCount = targetCount - currentCount - weakCount;

    // Mevcut konu sorulari (rastgele)
    selected.push(...shuffleAndPick(currentQuestions, currentCount));

    // Zayif alan sorulari
    const unusedWeak = weakQuestions.filter(q => !selected.find(s => s.soru_id === q.soru_id));
    selected.push(...shuffleAndPick(unusedWeak, weakCount));

    // Tekrar sorulari
    const unusedReview = reviewDue.filter(q => !selected.find(s => s.soru_id === q.soru_id));
    selected.push(...shuffleAndPick(unusedReview, reviewCount));

    // Eksik kalan varsa mevcut konudan tamamla
    if (selected.length < targetCount) {
        const remaining = currentQuestions.filter(q => !selected.find(s => s.soru_id === q.soru_id));
        selected.push(...shuffleAndPick(remaining, targetCount - selected.length));
    }

    return selected.slice(0, targetCount);
}

/**
 * Bir quiz sonucunu isler ve adaptif verileri gunceller
 */
export function processQuizResult(questions, answers, unitId, chapterId) {
    let correct = 0;
    const total = questions.length;

    questions.forEach((q, i) => {
        const isCorrect = answers[i] === q.dogru_cevap;
        if (isCorrect) correct++;
        store.recordAdaptiveAnswer(q.soru_id, isCorrect);
    });

    // Konu ustaligi guncelle
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    store.updateTopicMastery(unitId, chapterId, score);

    // XP hesapla (zorluk carpani ile)
    const difficulty = store.getDifficulty();
    const multiplier = DIFFICULTY_MULTIPLIERS[difficulty] || DIFFICULTY_MULTIPLIERS.normal;
    const baseXp = correct * 10;
    const xp = Math.round(baseXp * multiplier.xp);

    return { correct, total, score, xp };
}

/**
 * Bir unite icin genel ustalik skoru dondurur
 */
export function getUnitMasteryScore(unitId, chapters) {
    if (!chapters || chapters.length === 0) return 0;

    let totalScore = 0;
    let count = 0;

    chapters.forEach(ch => {
        const mastery = store.getTopicMastery(unitId, ch.bolum_id);
        if (mastery.attempts > 0) {
            totalScore += mastery.score;
            count++;
        }
    });

    return count > 0 ? Math.round(totalScore / count) : 0;
}

/**
 * Zorluk ayarlarini getirir
 */
export function getDifficultySettings() {
    const difficulty = store.getDifficulty();
    return DIFFICULTY_MULTIPLIERS[difficulty] || DIFFICULTY_MULTIPLIERS.normal;
}

/**
 * Dizi karistirip N eleman secer
 */
function shuffleAndPick(arr, count) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.max(0, count));
}

export { DIFFICULTY_MULTIPLIERS };
