// ===== Difficulty Scaler =====
// Sinifa gore zorluk parametreleri dondurur.
// 4-6: Kolay, 7-9: Orta, 10-12: Zor

export function getDifficulty(grade) {
    const g = parseInt(grade) || 5;

    if (g <= 6) {
        return {
            level: 'easy',
            label: 'Kolay',
            speed: 1.0,
            timerSeconds: 120,
            lives: 5,
            itemCount: 8,
            distractorRatio: 0.3,
            aiStrength: 0.4,     // AI rakip dogruluk orani
            spawnRate: 2.0,      // saniyede nesne cikarma
            pointsPerCorrect: 10,
            pointsPerWrong: -5,
            comboMultiplier: 1.5,
        };
    }

    if (g <= 9) {
        return {
            level: 'medium',
            label: 'Orta',
            speed: 1.5,
            timerSeconds: 90,
            lives: 3,
            itemCount: 12,
            distractorRatio: 0.5,
            aiStrength: 0.65,
            spawnRate: 2.8,
            pointsPerCorrect: 15,
            pointsPerWrong: -10,
            comboMultiplier: 2.0,
        };
    }

    // 10-12
    return {
        level: 'hard',
        label: 'Zor',
        speed: 2.0,
        timerSeconds: 60,
        lives: 3,
        itemCount: 15,
        distractorRatio: 0.6,
        aiStrength: 0.85,
        spawnRate: 3.5,
        pointsPerCorrect: 20,
        pointsPerWrong: -15,
        comboMultiplier: 2.5,
    };
}

// Zorluk parametresini oyun turune gore override et
export function getGameDifficulty(grade, engineId) {
    const base = getDifficulty(grade);

    // Motor-spesifik ayarlar
    const overrides = {
        E27: { timerSeconds: base.timerSeconds + 30 }, // Uzay nisancisi biraz daha uzun
        E28: { timerSeconds: base.timerSeconds + 15 }, // Balon patlatma
        E29: { lives: base.lives + 1 },                // Yaris - ekstra can
        E31: { spawnRate: base.spawnRate * 0.8 },       // Yakalayici - biraz yavas
        E33: { lives: 999, timerSeconds: 0 },           // Carkifelek - suresi/cani yok, hak sistemi
        E36: { timerSeconds: base.timerSeconds + 60 },  // Kelime avi - daha uzun sure
    };

    return { ...base, ...(overrides[engineId] || {}) };
}
