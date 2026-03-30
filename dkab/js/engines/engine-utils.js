// ===== Engine Utils: Ortak Yardımcı Fonksiyonlar =====
// Tüm motorlar bu modülü kullanır.

/**
 * dogru_cevap alanı "B" gibi index harfi olabilir, metin olmayabilir.
 * secenekler dizisinden gerçek metni çıkarır.
 */
export function getCorrectText(s) {
    const raw = (s.dogru_cevap || '').trim();
    // Sadece tek harf (A/B/C/D) ise seçeneklerden bul
    if (/^[A-D]$/i.test(raw)) {
        const idx = 'ABCD'.toUpperCase().indexOf(raw.toUpperCase());
        const opt = (s.secenekler || [])[idx] || '';
        return opt.replace(/^[A-D]\)\s*/i, '').trim();
    }
    return raw.replace(/^[A-D]\)\s*/i, '').trim();
}

/**
 * Yanlış cevap metinlerini döndürür (doğruyu hariç tutar)
 */
export function getWrongTexts(s, correctText) {
    return (s.secenekler || [])
        .map(o => (o || '').replace(/^[A-D]\)\s*/i, '').trim())
        .filter(o => o && o !== correctText)
        .slice(0, 3);
}

/**
 * Bir sorudan { soru, dogru, yanlis[] } formatına dönüştür
 */
export function soruToWave(s) {
    const dogru = getCorrectText(s);
    const yanlis = getWrongTexts(s, dogru);
    return { soru: s.soru || '', dogru, yanlis };
}

/**
 * Bir sorudan { soru, secenekler[], dogru_cevap } normalize formatına dönüştür
 */
export function normalizeSoru(s) {
    const dogru = getCorrectText(s);
    const yanlis = getWrongTexts(s, dogru);
    return {
        soru: s.soru || '',
        dogru_cevap: dogru,
        secenekler: shuffle([dogru, ...yanlis])
    };
}

export function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
