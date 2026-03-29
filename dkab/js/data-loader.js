// ===== DKAB Akademi - JSON Veri Yukleyici =====

const DATA_BASE = './data';
const cache = new Map();

// Grade metadata
const GRADE_INFO = {
    4:  { name: '4. Sinif', color: '#FF6B6B', gradient: 'linear-gradient(135deg, #FF6B6B, #ee5a24)', mode: 'child' },
    5:  { name: '5. Sinif', color: '#FF9FF3', gradient: 'linear-gradient(135deg, #FF9FF3, #f368e0)', mode: 'child' },
    6:  { name: '6. Sinif', color: '#48dbfb', gradient: 'linear-gradient(135deg, #48dbfb, #0abde3)', mode: 'child' },
    7:  { name: '7. Sinif', color: '#feca57', gradient: 'linear-gradient(135deg, #feca57, #ff9f43)', mode: 'child' },
    8:  { name: '8. Sinif', color: '#ff6348', gradient: 'linear-gradient(135deg, #ff6348, #eb4d4b)', mode: 'child' },
    9:  { name: '9. Sinif', color: '#6C63FF', gradient: 'linear-gradient(135deg, #6C63FF, #5f27cd)', mode: 'teen' },
    10: { name: '10. Sinif', color: '#1dd1a1', gradient: 'linear-gradient(135deg, #1dd1a1, #10ac84)', mode: 'teen' },
    11: { name: '11. Sinif', color: '#54a0ff', gradient: 'linear-gradient(135deg, #54a0ff, #2e86de)', mode: 'teen' },
    12: { name: '12. Sinif', color: '#c44569', gradient: 'linear-gradient(135deg, #c44569, #e66767)', mode: 'teen' }
};

// File paths for each grade
function getDataPath(grade, file) {
    const paddedGrade = String(grade).padStart(2, '0');
    return `${DATA_BASE}/${paddedGrade}/${file}`;
}

// Data file mapping
const DATA_FILES = {
    manifest: 'MANIFEST.json',
    units: '02_yapi/unite_listesi.json',
    bookMap: '02_yapi/kitap_haritasi.json',
    chapters: '02_yapi/bolum_listesi.json',
    coverage: '02_yapi/kapsama_matrisi.json',
    questions: '05_olcme_degerlendirme/soru_bankasi.json',
    games: '04_etkinlik_ve_oyun/oyun_bankasi.json',
    engines: '04_etkinlik_ve_oyun/motor_katalogu.json',
    glossary: '03_terimler/sozluk.json',
    conceptCards: '03_terimler/kavram_kartlari.json',
    prayers: '06_dua_ve_sure/dua_sure_bankasi.json',
    activities: '04_etkinlik_ve_oyun/kitaptaki_etkinlikler.json',
    answers: '05_olcme_degerlendirme/cevap_anahtari.json',
    visuals: '07_gorsel_plani/gorsel_uretim_listesi.json',
    pageTexts: '01_metin/sayfa_metinleri.json'
};

async function fetchJSON(url) {
    if (cache.has(url)) return cache.get(url);

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
        const data = await res.json();
        cache.set(url, data);
        return data;
    } catch (err) {
        console.warn(`Veri yuklenemedi: ${url}`, err);
        return null;
    }
}

// Load a specific data file for a grade
async function loadData(grade, dataKey) {
    const file = DATA_FILES[dataKey];
    if (!file) {
        console.warn(`Unknown data key: ${dataKey}`);
        return null;
    }
    return fetchJSON(getDataPath(grade, file));
}

// Load all essential data for a grade (for dashboard)
async function loadGradeEssentials(grade) {
    const [units, chapters, bookMap] = await Promise.all([
        loadData(grade, 'units'),
        loadData(grade, 'chapters'),
        loadData(grade, 'bookMap')
    ]);
    return { units, chapters, bookMap };
}

// Load chapter content (for lesson view)
async function loadChapterContent(grade, unitId, chapterId) {
    const [games, questions, conceptCards, prayers, coverage, visuals] = await Promise.all([
        loadData(grade, 'games'),
        loadData(grade, 'questions'),
        loadData(grade, 'conceptCards'),
        loadData(grade, 'prayers'),
        loadData(grade, 'coverage'),
        loadData(grade, 'visuals')
    ]);

    // Filter for this chapter
    const chapterGames = games ? games.filter(g => g.bolum_id === chapterId) : [];
    const chapterQuestions = questions ? questions.filter(q => q.bolum_id === chapterId) : [];
    const chapterCard = conceptCards ? conceptCards.find(c => c.bolum_id === chapterId) : null;
    const chapterCoverage = coverage ? coverage.find(c => c.bolum_id === chapterId) : null;

    // Filter prayers by unit
    const unitPrayers = prayers ? prayers.filter(p => p.unite_id === unitId) : [];

    // Filter visuals for this chapter
    const chapterVisuals = visuals ? visuals.filter(v => v.bolum_id === chapterId) : [];

    return {
        games: chapterGames,
        questions: chapterQuestions,
        conceptCard: chapterCard,
        prayers: unitPrayers,
        coverage: chapterCoverage,
        visuals: chapterVisuals
    };
}

// Load visuals for a grade
async function loadVisuals(grade) {
    return loadData(grade, 'visuals');
}

// Load glossary for a grade
async function loadGlossary(grade) {
    return loadData(grade, 'glossary');
}

// Load game engines (same for all grades)
async function loadEngines(grade) {
    return loadData(grade, 'engines');
}

// Check which grades have data available
async function checkAvailableGrades() {
    const available = [];
    for (const grade of Object.keys(GRADE_INFO)) {
        try {
            const res = await fetch(getDataPath(grade, 'MANIFEST.json'), { method: 'HEAD' });
            if (res.ok) available.push(parseInt(grade));
        } catch {
            // Grade data not available
        }
    }
    return available;
}

// Get grade info
function getGradeInfo(grade) {
    return GRADE_INFO[grade] || null;
}

// Get all grade infos
function getAllGrades() {
    return Object.entries(GRADE_INFO).map(([grade, info]) => ({
        grade: parseInt(grade),
        ...info
    }));
}

// Clear cache
function clearCache() {
    cache.clear();
}

export {
    loadData,
    loadGradeEssentials,
    loadChapterContent,
    loadGlossary,
    loadEngines,
    loadVisuals,
    checkAvailableGrades,
    getGradeInfo,
    getAllGrades,
    clearCache,
    GRADE_INFO,
    DATA_FILES
};
