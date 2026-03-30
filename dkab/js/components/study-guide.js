// ===== DKAB Akademi - Faz 4: Rehberli Calisma Modu =====
// Baglam duyarli ipuclari + kisisellestirilmis calisma plani

import { store } from '../store.js?v=12';
import { loadGradeEssentials } from '../data-loader.js?v=12';

// Calisma ipuclari havuzu (bağlama gore secilir)
const STUDY_TIPS = {
    low_mastery: [
        'Bu konuyu kucuk parcalara bol. Her gun 10 dk okuyarak basla.',
        'Kavram kartlarini sesli oku ve kendi cumlelerinle tekrar et.',
        'Zorlandigin yerleri not al ve ogretmenine sor.',
        'Konuyu bir arkadasina anlatmayi dene — ogretmek ogrenmenin en iyi yoludur.'
    ],
    medium_mastery: [
        'Iyi gidiyorsun! Simdi farkli soru tipleriyle kendini sinayabilirsin.',
        'Ogrendiklerini gunluk hayattan orneklerle iliskilendir.',
        'Quizlerde hatalilarini not et ve o konulara tekrar odaklan.',
        'Kavramlari kendi kelimelerinle ozetlemeyi dene.'
    ],
    high_mastery: [
        'Harika! Bu konuda cok iyisin. Baska arkadaslarina yardim edebilirsin.',
        'Daha derinlemesine arastirma yaparak bilgini genisletebilirsin.',
        'Farkli unitelerdeki baglantiları kesfetmeye calis.',
        'Meydan okuma gonder ve sinifini test et!'
    ],
    streak_broken: [
        'Serini kaybettin ama endise etme! Bugunden tekrar basla.',
        'Her gun sadece 5 dakika bile olsa bir sey oku.',
        'Kucuk hedefler koy — mesela "bugun 1 bolum tamamla".'
    ],
    new_unit: [
        'Yeni uniteye baslamadan once unite basligini ve alt basliklarini oku.',
        'Unite sozlugundeki kavramlara goz at.',
        'Once "bunu biliyorum" dediklerini, sonra bilmediklerini calis.'
    ]
};

// Gunun calisma onayı (motivasyon)
const DAILY_MOTIVATION = [
    '"Ilim Cin\'de de olsa gidip aliniz." — Hadis-i Serif',
    '"Oku! Yaratan Rabbinin adiyla oku." — Alak Suresi, 1',
    '"Bilen ile bilmeyen bir olur mu?" — Zumer Suresi, 9',
    '"Kim ilim yolunda yururse Allah ona cennetin yolunu kolaylastirir."',
    '"Ilim ogrenmek her Muslumana farzdir."',
    '"Bir saat tefekkur, bir yil ibadetten hayirlidir."',
    '"Berikten mezara kadar ilim ogrenin."',
    '"Alimler Peygamberlerin varisleridir."'
];

export async function renderStudyGuide(el, app) {
    const user = store.user;
    if (!user) { window.location.hash = '#/sinif-sec'; return; }

    const grade = user.grade;
    el.innerHTML = '<div class="content-area text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div><p class="text-muted">Calisma planin hazirlaniyor...</p></div>';

    const essentials = await loadGradeEssentials(grade);
    if (!essentials.units) {
        el.innerHTML = '<div class="content-area text-center mt-xl"><p class="text-muted">Veri yuklenemedi.</p><a href="#/" class="btn btn-primary mt-lg">Geri Don</a></div>';
        return;
    }

    // Analiz: unite bazli ilerleme ve mastery
    const unitAnalysis = analyzeProgress(grade, essentials);
    const todaysTips = generateTips(unitAnalysis);
    const weekPlan = generateWeeklyPlan(unitAnalysis, essentials);
    const reviewItems = store.getQuestionsForReview();
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1)) / 86400000);
    const motivation = DAILY_MOTIVATION[dayOfYear % DAILY_MOTIVATION.length];

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <h1 class="font-display">&#128218; Rehberli Calisma</h1>
                <p class="text-muted">${grade}. Sinif — Sana ozel calisma plani</p>
            </div>

            <!-- Gunun Motivasyonu -->
            <div class="card anim-fade-in-up mt-lg" style="padding:1.5rem; background:linear-gradient(135deg, rgba(27,107,74,0.05), rgba(72,198,239,0.05)); border-left:4px solid var(--primary);">
                <p style="font-style:italic; color:var(--primary); font-size:1.05rem; line-height:1.6;">${motivation}</p>
            </div>

            <!-- Durum Ozeti -->
            <div class="study-status mt-lg anim-fade-in-up" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
                ${buildStatusCards(unitAnalysis)}
            </div>

            <!-- Baglam Duyarli Ipuclari -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#128161; Sana Ozel Ipuclari</h3>
                <div class="tips-list mt-md" style="display:flex; flex-direction:column; gap:0.75rem;">
                    ${todaysTips.map(tip => `
                        <div style="display:flex; gap:0.75rem; align-items:flex-start; padding:0.75rem 1rem; border-radius:10px; background:var(--bg-secondary);">
                            <span style="font-size:1.3rem; flex-shrink:0;">${tip.icon}</span>
                            <div>
                                <div style="font-weight:500; font-size:0.95rem;">${tip.title}</div>
                                <div class="text-muted" style="font-size:0.85rem; margin-top:2px;">${tip.text}</div>
                                ${tip.link ? `<a href="${tip.link}" class="btn btn-sm btn-outline mt-sm" style="font-size:0.8rem;">Basla &rarr;</a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Aralikli Tekrar -->
            ${reviewItems.length > 0 ? `
            <div class="card anim-fade-in-up mt-lg" style="padding:1.5rem; border-left:4px solid var(--warning);">
                <h3>&#128260; Tekrar Zamani</h3>
                <p class="text-muted mt-xs">${reviewItems.length} soru tekrar zamani geldi.</p>
                <a href="#/sinif/${grade}" class="btn btn-warning mt-md">Tekrara Basla</a>
            </div>
            ` : ''}

            <!-- Haftalik Plan -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#128197; Bu Hafta Icin Plan</h3>
                <div class="week-plan mt-md" style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${weekPlan.map((day, i) => `
                        <div style="display:flex; align-items:center; gap:1rem; padding:0.75rem 1rem; border-radius:8px; ${i === ((new Date().getDay() + 6) % 7) ? 'background:var(--bg-secondary); border-left:3px solid var(--primary);' : ''}">
                            <span style="min-width:70px; font-weight:600; font-size:0.9rem; color:${i === ((new Date().getDay() + 6) % 7) ? 'var(--primary)' : 'var(--text-secondary)'};">${day.dayName}</span>
                            <span style="font-size:0.9rem;">${day.task}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Unite Durumu Haritasi -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#127758; Unite Haritam</h3>
                <div class="unit-map mt-md" style="display:flex; flex-direction:column; gap:0.75rem;">
                    ${unitAnalysis.map(u => `
                        <a href="#/sinif/${grade}/unite/${u.unitNum}" style="text-decoration:none; color:inherit;">
                            <div class="card card-interactive" style="padding:1rem; display:flex; align-items:center; gap:1rem;">
                                <div style="width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; background:${getMasteryBg(u.mastery)};">
                                    ${getMasteryIcon(u.mastery)}
                                </div>
                                <div style="flex:1;">
                                    <div style="font-weight:500;">${u.title}</div>
                                    <div class="text-muted" style="font-size:0.8rem;">${u.completedChapters}/${u.totalChapters} bolum &middot; Hakimiyet: %${u.mastery}</div>
                                </div>
                                <div class="progress-bar" style="width:60px; height:6px;">
                                    <div class="fill" style="width:${u.mastery}%; background:${getMasteryColor(u.mastery)};"></div>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>`;
}

function analyzeProgress(grade, essentials) {
    const units = essentials.units || [];
    return units.map(u => {
        const unitNum = u.unite_id.replace('U', '');
        const chapters = (essentials.chapters || []).filter(c => c.unite_id === u.unite_id);
        const totalChapters = chapters.length;
        let completedChapters = 0;
        let totalMastery = 0;
        let masteryCount = 0;

        chapters.forEach(c => {
            const p = store.getProgress(grade, u.unite_id, c.bolum_id);
            if (p?.completed) completedChapters++;
            const m = store.getTopicMastery(u.unite_id, c.bolum_id);
            if (m.attempts > 0) {
                totalMastery += m.score;
                masteryCount++;
            }
        });

        const completionPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
        const avgMastery = masteryCount > 0 ? Math.round(totalMastery / masteryCount) : completionPercent * 0.6;
        const mastery = Math.round(avgMastery * 0.6 + completionPercent * 0.4);

        return {
            unitId: u.unite_id,
            unitNum,
            title: u.baslik || u.unite_id,
            totalChapters,
            completedChapters,
            completionPercent,
            mastery: Math.min(100, mastery)
        };
    });
}

function generateTips(analysis) {
    const tips = [];
    const streak = store.stats.streak;

    // Seri kırıldıysa
    if (streak === 0) {
        const t = pick(STUDY_TIPS.streak_broken);
        tips.push({ icon: '&#128293;', title: 'Seriyi Baslat!', text: t });
    }

    // En düşük mastery'li ünite
    const weakest = [...analysis].sort((a, b) => a.mastery - b.mastery).find(u => u.mastery < 60);
    if (weakest) {
        const t = pick(STUDY_TIPS.low_mastery);
        tips.push({ icon: '&#128308;', title: `${weakest.title} — Guclendirmelisin`, text: t, link: `#/sinif/${store.user.grade}/unite/${weakest.unitNum}` });
    }

    // Orta seviye ünite
    const mid = analysis.find(u => u.mastery >= 40 && u.mastery < 75);
    if (mid) {
        const t = pick(STUDY_TIPS.medium_mastery);
        tips.push({ icon: '&#128992;', title: `${mid.title} — Iyi Gidiyorsun`, text: t, link: `#/sinif/${store.user.grade}/unite/${mid.unitNum}` });
    }

    // Yüksek mastery
    const strong = analysis.find(u => u.mastery >= 75);
    if (strong) {
        const t = pick(STUDY_TIPS.high_mastery);
        tips.push({ icon: '&#128994;', title: `${strong.title} — Harika!`, text: t });
    }

    // Hiç başlanmamış ünite
    const fresh = analysis.find(u => u.completedChapters === 0);
    if (fresh) {
        const t = pick(STUDY_TIPS.new_unit);
        tips.push({ icon: '&#127775;', title: `Yeni: ${fresh.title}`, text: t, link: `#/sinif/${store.user.grade}/unite/${fresh.unitNum}` });
    }

    return tips.length > 0 ? tips : [{ icon: '&#127881;', title: 'Tebrikler!', text: 'Tum unitelerde iyi gidiyorsun. Devam et!' }];
}

function generateWeeklyPlan(analysis, essentials) {
    const days = ['Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const sorted = [...analysis].sort((a, b) => a.mastery - b.mastery);

    return days.map((dayName, i) => {
        let task;
        if (i === 5) {
            task = 'Tekrar gunu — haftanin notlarini gozden gecir';
        } else if (i === 6) {
            task = 'Serbest gun — hedeflerini degerlendir';
        } else {
            const unit = sorted[i % sorted.length];
            if (unit) {
                task = unit.mastery < 40
                    ? `${unit.title} — Temel kavramlari calis`
                    : unit.mastery < 70
                        ? `${unit.title} — Quiz coz ve tekrar et`
                        : `${unit.title} — Derinlestirme ve pratik`;
            } else {
                task = 'Ogrenme yolundaki bir sonraki konuya gec';
            }
        }
        return { dayName, task };
    });
}

function buildStatusCards(analysis) {
    const totalUnits = analysis.length;
    const mastered = analysis.filter(u => u.mastery >= 75).length;
    const inProgress = analysis.filter(u => u.mastery >= 25 && u.mastery < 75).length;
    const needsWork = analysis.filter(u => u.mastery < 25).length;
    const avgMastery = totalUnits > 0 ? Math.round(analysis.reduce((s, u) => s + u.mastery, 0) / totalUnits) : 0;

    return `
        <div class="card text-center" style="padding:1.25rem;">
            <div style="font-size:2rem; font-weight:700; color:var(--primary);">%${avgMastery}</div>
            <div class="text-muted" style="font-size:0.85rem;">Genel Hakimiyet</div>
        </div>
        <div class="card text-center" style="padding:1.25rem;">
            <div style="font-size:2rem; font-weight:700; color:var(--success);">${mastered}</div>
            <div class="text-muted" style="font-size:0.85rem;">Tamamlanan</div>
        </div>
        <div class="card text-center" style="padding:1.25rem;">
            <div style="font-size:2rem; font-weight:700; color:var(--warning);">${inProgress}</div>
            <div class="text-muted" style="font-size:0.85rem;">Devam Eden</div>
        </div>
        <div class="card text-center" style="padding:1.25rem;">
            <div style="font-size:2rem; font-weight:700; color:var(--error, #e74c3c);">${needsWork}</div>
            <div class="text-muted" style="font-size:0.85rem;">Guclendir</div>
        </div>`;
}

function getMasteryColor(m) {
    if (m >= 75) return 'var(--success)';
    if (m >= 40) return 'var(--warning)';
    return 'var(--error, #e74c3c)';
}

function getMasteryBg(m) {
    if (m >= 75) return 'rgba(46,204,113,0.12)';
    if (m >= 40) return 'rgba(241,196,15,0.12)';
    return 'rgba(231,76,60,0.12)';
}

function getMasteryIcon(m) {
    if (m >= 75) return '&#9989;';
    if (m >= 40) return '&#128993;';
    return '&#128308;';
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
