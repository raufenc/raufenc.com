// ===== DKAB Akademi - Faz 4: Yillik Ilerleme Raporu (Kirkpatrick L4) =====
// Kapsamli yillik buyume ve etki analizi

import { store, BADGES, XP_PER_LEVEL } from '../store.js?v=10';
import { loadGradeEssentials } from '../data-loader.js?v=10';

export async function renderAnnualReport(el, app) {
    const user = store.user;
    if (!user) { window.location.hash = '#/sinif-sec'; return; }

    el.innerHTML = '<div class="content-area text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div><p class="text-muted">Yillik rapor hazirlaniyor...</p></div>';

    const grade = user.grade;
    const essentials = await loadGradeEssentials(grade);
    const stats = store.stats;
    const progress = store.state.progress;
    const behaviorLog = store.state.behaviorLog || [];
    const goals = store.state.goals;
    const habits = store.state.habits.dailyLog;
    const assessments = store.state.assessments;

    // Hesaplamalar
    const gradeProgress = store.getGradeProgress(grade);
    const totalDaysActive = Object.keys(habits).length;
    const accuracy = stats.totalAnswers > 0 ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 0;
    const earnedBadges = stats.badges.length;
    const totalBadges = Object.keys(BADGES).length;
    const goalsCompleted = (goals.completed || []).length;
    const goalsTotal = goalsCompleted + (goals.active || []).length;
    const reflectionCount = (goals.reflections || []).length;
    const createdAt = user.createdAt || new Date().toISOString().split('T')[0];
    const daysSinceStart = Math.max(1, Math.floor((Date.now() - new Date(createdAt + 'T00:00:00')) / 86400000));

    // Davranis puani
    const last30Behaviors = behaviorLog.filter(l => {
        const d = new Date(l.date);
        const ago = (Date.now() - d) / 86400000;
        return ago <= 30;
    });
    const behaviorScore = last30Behaviors.reduce((s, l) => s + (l.behaviors || []).reduce((s2, b) => s2 + (b.puan || 0), 0), 0);

    // Sinif kart notu (A-F)
    const overallScore = calculateOverallScore(gradeProgress, accuracy, stats.streak, behaviorScore, totalDaysActive, daysSinceStart);
    const grade_letter = getGradeLetter(overallScore);

    // Aylik trend (son 6 ay)
    const monthlyTrend = getMonthlyTrend(habits);

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <h1 class="font-display">&#128202; Yillik Rapor</h1>
                <p class="text-muted">${user.name} — ${grade}. Sinif — ${new Date().getFullYear()}</p>
            </div>

            <!-- Genel Skor Karti -->
            <div class="card anim-fade-in-up mt-lg" style="padding:2.5rem; text-align:center; background:linear-gradient(135deg, ${grade_letter.bg1}, ${grade_letter.bg2});">
                <div style="font-size:5rem; font-weight:800; color:${grade_letter.renk}; text-shadow:0 2px 8px rgba(0,0,0,0.1);">${grade_letter.harf}</div>
                <div style="font-size:1.1rem; font-weight:600; color:${grade_letter.renk}; margin-top:4px;">${grade_letter.baslik}</div>
                <p class="text-muted mt-sm">${grade_letter.aciklama}</p>
                <div class="mt-md" style="font-size:0.85rem; color:var(--text-secondary);">
                    Genel Puan: <strong>${overallScore}/100</strong> &middot;
                    Baslangicindan bu yana <strong>${daysSinceStart}</strong> gun
                </div>
            </div>

            <!-- 6 Temel Metrik -->
            <div class="report-metrics mt-xl anim-fade-in-up" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
                ${buildMetricCard('&#128218;', 'Ders Ilerlemesi', `%${gradeProgress.percent}`, `${gradeProgress.completed}/${gradeProgress.total} bolum`, 'var(--primary)')}
                ${buildMetricCard('&#127919;', 'Quiz Basarisi', `%${accuracy}`, `${stats.totalQuizzes} quiz`, 'var(--success)')}
                ${buildMetricCard('&#128293;', 'En Uzun Seri', `${stats.longestStreak} gun`, `Mevcut: ${stats.streak}`, 'var(--warning)')}
                ${buildMetricCard('&#11088;', 'XP & Seviye', `Sv.${stats.level}`, `${stats.totalXp} XP`, '#6c3483')}
                ${buildMetricCard('&#127942;', 'Rozetler', `${earnedBadges}/${totalBadges}`, `%${Math.round(earnedBadges/totalBadges*100)} tamamlandi`, '#a04000')}
                ${buildMetricCard('&#127793;', 'Davranis', `${behaviorScore}p`, `Son 30 gun`, '#196f3d')}
            </div>

            <!-- Aylik Trend -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#128200; Aylik Aktivite Trendi</h3>
                <div class="mt-md" style="display:flex; align-items:flex-end; justify-content:center; gap:1.5rem; height:140px;">
                    ${monthlyTrend.map(m => {
                        const h = m.days > 0 ? Math.max(20, Math.min(120, m.days * 5)) : 6;
                        return `
                            <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                <span style="font-size:0.75rem; font-weight:600; color:var(--primary);">${m.days}g</span>
                                <div style="width:40px; height:${h}px; border-radius:8px 8px 0 0; background:linear-gradient(to top, var(--primary), rgba(108,99,255,0.5)); transition:height 0.3s;"></div>
                                <span style="font-size:0.7rem; color:var(--text-muted);">${m.label}</span>
                            </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- Kirkpatrick Dortlu Degerlendirme -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#128269; Dortlu Degerlendirme (Kirkpatrick)</h3>
                <div class="mt-md" style="display:flex; flex-direction:column; gap:1rem;">
                    ${buildKirkpatrickRow('L1 — Tepki', 'Derslere karsi tutum', getL1Score(assessments), '#3498db')}
                    ${buildKirkpatrickRow('L2 — Ogrenme', 'Bilgi ve beceri kazanimi', getL2Score(gradeProgress, accuracy), '#2ecc71')}
                    ${buildKirkpatrickRow('L3 — Davranis', 'Gunluk hayata yansima', getL3Score(behaviorScore, daysSinceStart), '#f39c12')}
                    ${buildKirkpatrickRow('L4 — Sonuc', 'Genel buyume ve etki', overallScore, '#9b59b6')}
                </div>
            </div>

            <!-- Kazanimlar -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#127881; Kazanimlar</h3>
                <div class="mt-md" style="display:flex; flex-wrap:wrap; gap:0.75rem;">
                    ${stats.badges.map(bId => {
                        const b = BADGES[bId];
                        return b ? `
                            <div style="display:flex; align-items:center; gap:0.5rem; padding:0.5rem 0.75rem; border-radius:10px; background:var(--bg-secondary);">
                                <span style="font-size:1.3rem;">${b.icon}</span>
                                <span style="font-size:0.85rem; font-weight:500;">${b.name}</span>
                            </div>` : '';
                    }).join('') || '<p class="text-muted">Henuz rozet kazanilmadi.</p>'}
                </div>
            </div>

            <!-- Hedefler Ozeti -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#127919; Hedef Ozeti</h3>
                <div class="mt-md" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; text-align:center;">
                    <div>
                        <div style="font-size:2rem; font-weight:700; color:var(--success);">${goalsCompleted}</div>
                        <div class="text-muted" style="font-size:0.85rem;">Tamamlanan</div>
                    </div>
                    <div>
                        <div style="font-size:2rem; font-weight:700; color:var(--warning);">${(goals.active || []).length}</div>
                        <div class="text-muted" style="font-size:0.85rem;">Devam Eden</div>
                    </div>
                    <div>
                        <div style="font-size:2rem; font-weight:700; color:var(--primary);">${reflectionCount}</div>
                        <div class="text-muted" style="font-size:0.85rem;">Dusunme Kaydi</div>
                    </div>
                </div>
                ${goalsTotal > 0 ? `
                    <div class="progress-bar mt-md" style="height:8px;">
                        <div class="fill" style="width:${Math.round((goalsCompleted / goalsTotal) * 100)}%;"></div>
                    </div>
                    <p class="text-muted text-center mt-xs" style="font-size:0.8rem;">%${Math.round((goalsCompleted / goalsTotal) * 100)} hedef tamamlama orani</p>
                ` : ''}
            </div>

            <!-- Oneriler -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem; border-left:4px solid var(--primary);">
                <h3>&#128161; Onerillerim</h3>
                <ul class="mt-md" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.75rem;">
                    ${generateRecommendations(gradeProgress, accuracy, stats, behaviorScore, totalDaysActive).map(r => `
                        <li style="display:flex; gap:0.75rem; align-items:flex-start;">
                            <span style="font-size:1.1rem;">${r.icon}</span>
                            <span style="font-size:0.9rem;">${r.text}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>`;
}

function buildMetricCard(icon, label, value, sub, color) {
    return `
        <div class="card text-center" style="padding:1.25rem;">
            <div style="font-size:1.5rem;">${icon}</div>
            <div style="font-size:1.5rem; font-weight:700; color:${color}; margin-top:4px;">${value}</div>
            <div style="font-size:0.85rem; font-weight:500;">${label}</div>
            <div class="text-muted" style="font-size:0.75rem;">${sub}</div>
        </div>`;
}

function buildKirkpatrickRow(level, desc, score, color) {
    return `
        <div style="display:flex; align-items:center; gap:1rem; padding:0.75rem 1rem; border-radius:10px; background:${color}08;">
            <div style="min-width:140px;">
                <div style="font-weight:600; font-size:0.9rem; color:${color};">${level}</div>
                <div class="text-muted" style="font-size:0.75rem;">${desc}</div>
            </div>
            <div class="progress-bar" style="flex:1; height:10px;">
                <div class="fill" style="width:${Math.min(100, score)}%; background:${color};"></div>
            </div>
            <span style="min-width:40px; text-align:right; font-weight:700; color:${color};">${score}</span>
        </div>`;
}

function calculateOverallScore(gradeProgress, accuracy, streak, behaviorScore, totalDays, daysSince) {
    const progressScore = gradeProgress.percent * 0.3;
    const quizScore = accuracy * 0.2;
    const consistencyScore = Math.min(100, (totalDays / Math.max(1, daysSince)) * 100) * 0.2;
    const streakScore = Math.min(100, streak * 3.3) * 0.15;
    const behaviorNorm = Math.min(100, behaviorScore / 3) * 0.15;
    return Math.round(progressScore + quizScore + consistencyScore + streakScore + behaviorNorm);
}

function getGradeLetter(score) {
    if (score >= 90) return { harf: 'A+', baslik: 'Muhtesem!', aciklama: 'Her alanda ustun performans gosteriyorsun.', renk: '#27ae60', bg1: 'rgba(39,174,96,0.08)', bg2: 'rgba(46,204,113,0.05)' };
    if (score >= 80) return { harf: 'A', baslik: 'Harika!', aciklama: 'Cok basarili bir yil gecirdin.', renk: '#2ecc71', bg1: 'rgba(46,204,113,0.08)', bg2: 'rgba(39,174,96,0.05)' };
    if (score >= 70) return { harf: 'B', baslik: 'Iyi!', aciklama: 'Guzel bir ilerleme kaydettin.', renk: '#3498db', bg1: 'rgba(52,152,219,0.08)', bg2: 'rgba(41,128,185,0.05)' };
    if (score >= 55) return { harf: 'C', baslik: 'Gelisiyor', aciklama: 'Daha fazla calisarak bir ust seviyeye cikabilirsin.', renk: '#f39c12', bg1: 'rgba(243,156,18,0.08)', bg2: 'rgba(241,196,15,0.05)' };
    if (score >= 40) return { harf: 'D', baslik: 'Baslangiic', aciklama: 'Daha duzenli calismalisin. Hedef koy ve takip et.', renk: '#e67e22', bg1: 'rgba(230,126,34,0.08)', bg2: 'rgba(211,84,0,0.05)' };
    return { harf: 'E', baslik: 'Gayret Gerek', aciklama: 'Rehberli calisma modunu kullanarak basla!', renk: '#e74c3c', bg1: 'rgba(231,76,60,0.08)', bg2: 'rgba(192,57,43,0.05)' };
}

function getL1Score(assessments) {
    const reactions = assessments.reactions || [];
    if (reactions.length === 0) return 50;
    const avg = reactions.reduce((s, r) => s + (r.rating || 3), 0) / reactions.length;
    return Math.round(avg * 20);
}

function getL2Score(gradeProgress, accuracy) {
    return Math.round(gradeProgress.percent * 0.6 + accuracy * 0.4);
}

function getL3Score(behaviorScore, daysSince) {
    return Math.min(100, Math.round(behaviorScore / Math.max(1, daysSince / 10)));
}

function getMonthlyTrend(habits) {
    const months = [];
    const ayAdlari = ['Oca', 'Sub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Agu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = d.getMonth();
        const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
        const days = Object.keys(habits).filter(k => k.startsWith(prefix)).length;
        months.push({ label: ayAdlari[month], days });
    }
    return months;
}

function generateRecommendations(gradeProgress, accuracy, stats, behaviorScore, totalDays) {
    const recs = [];

    if (gradeProgress.percent < 50) {
        recs.push({ icon: '&#128218;', text: 'Ders ilerlemeniz %50\'nin altinda. Her gun en az 1 bolum tamamlamayi hedefle.' });
    }
    if (accuracy < 60 && stats.totalQuizzes > 0) {
        recs.push({ icon: '&#127919;', text: 'Quiz basari oranini artirmak icin yanlis yaptigin sorulari tekrar et.' });
    }
    if (stats.streak < 3) {
        recs.push({ icon: '&#128293;', text: 'Seriyi surdur! Her gun 5 dakika bile olsa uygulamaya gir.' });
    }
    if (behaviorScore < 50) {
        recs.push({ icon: '&#127793;', text: 'Davranis takibini duzenli kullan. Ogrendiklerini hayata gecirmek en onemli adim.' });
    }
    if (totalDays < 10) {
        recs.push({ icon: '&#128197;', text: 'Daha sik calis. Duzenlilik basarinin anahtaridir.' });
    }

    if (recs.length === 0) {
        recs.push({ icon: '&#127881;', text: 'Harika gidiyorsun! Bu tempoyu koru ve arkadaslarina ornek ol.' });
    }
    return recs;
}
