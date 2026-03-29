// ===== DKAB Akademi - Ana Sayfa (Dashboard) =====

import { store, BADGES, XP_PER_LEVEL } from '../store.js?v=4';
import { getGradeInfo } from '../data-loader.js?v=4';

export function renderHome(el, app) {
    const user = store.user;
    const stats = store.stats;
    const grade = user.grade;
    const gradeInfo = getGradeInfo(grade);
    const gradeProgress = store.getGradeProgress(grade);
    const xpCurrent = store.getXpForCurrentLevel();
    const xpPercent = Math.round((xpCurrent / XP_PER_LEVEL) * 100);

    // Get earned badges
    const earnedBadges = stats.badges.map(id => BADGES[id]).filter(Boolean);
    const recentBadges = earnedBadges.slice(-3);

    // Quiz accuracy
    const accuracy = stats.totalAnswers > 0
        ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100)
        : 0;

    el.innerHTML = `
        <div class="content-area">
            <!-- Welcome Banner -->
            <div class="welcome-banner anim-fade-in-up" style="background: ${gradeInfo?.gradient || 'var(--gradient-hero)'};">
                <div class="welcome-text">
                    <h1 class="font-display" style="color: white; font-size: 1.8rem;">
                        Selam, ${user.name}! &#128075;
                    </h1>
                    <p style="color: rgba(255,255,255,0.85); margin-top: 0.5rem;">
                        ${getMotivation(stats)}
                    </p>
                </div>
                <div class="welcome-stats">
                    <div class="welcome-stat">
                        <span class="welcome-stat-icon">&#128293;</span>
                        <span class="welcome-stat-value">${stats.streak}</span>
                        <span class="welcome-stat-label">gun seri</span>
                    </div>
                    <div class="welcome-stat">
                        <span class="welcome-stat-icon">&#9889;</span>
                        <span class="welcome-stat-value">${stats.totalXp}</span>
                        <span class="welcome-stat-label">toplam XP</span>
                    </div>
                    <div class="welcome-stat">
                        <span class="welcome-stat-icon">&#127942;</span>
                        <span class="welcome-stat-value">${stats.level}</span>
                        <span class="welcome-stat-label">seviye</span>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions mt-xl stagger">
                <a href="#/sinif/${grade}" class="quick-action-card anim-fade-in-up card card-interactive">
                    <div class="quick-action-icon" style="background: ${gradeInfo?.gradient};">&#128218;</div>
                    <div class="quick-action-info">
                        <h3>Derslerime Git</h3>
                        <p class="text-muted">${grade}. Sinif - ${gradeProgress.total > 0 ? `${gradeProgress.percent}% tamamlandi` : 'Baslamaya hazir'}</p>
                    </div>
                    <span class="quick-action-arrow">&#8594;</span>
                </a>

                <a href="#/sinif/${grade}/sozluk" class="quick-action-card anim-fade-in-up card card-interactive">
                    <div class="quick-action-icon" style="background: linear-gradient(135deg, #feca57, #ff9f43);">&#128214;</div>
                    <div class="quick-action-info">
                        <h3>Sozluk</h3>
                        <p class="text-muted">Terimleri ogren ve tekrarla</p>
                    </div>
                    <span class="quick-action-arrow">&#8594;</span>
                </a>

                <a href="#/ilerleme" class="quick-action-card anim-fade-in-up card card-interactive">
                    <div class="quick-action-icon" style="background: linear-gradient(135deg, #6C63FF, #48C6EF);">&#128200;</div>
                    <div class="quick-action-info">
                        <h3>Ilerleme</h3>
                        <p class="text-muted">${stats.completedChapters} bolum tamamlandi</p>
                    </div>
                    <span class="quick-action-arrow">&#8594;</span>
                </a>
            </div>

            <!-- Stats Grid -->
            <div class="home-stats-grid mt-xl">
                <div class="home-stat-card card anim-fade-in-up">
                    <div class="home-stat-header">
                        <span>Seviye Ilerlemesi</span>
                        <span class="level-badge">${stats.level}</span>
                    </div>
                    <div class="progress-bar accent mt-sm" style="height: 10px;">
                        <div class="fill" style="width: ${xpPercent}%;"></div>
                    </div>
                    <div class="home-stat-footer text-muted mt-sm">
                        ${xpCurrent} / ${XP_PER_LEVEL} XP
                    </div>
                </div>

                <div class="home-stat-card card anim-fade-in-up">
                    <div class="home-stat-header">
                        <span>Quiz Basarisi</span>
                        <span class="badge ${accuracy >= 70 ? 'badge-success' : accuracy >= 40 ? 'badge-warning' : 'badge-info'}">${accuracy}%</span>
                    </div>
                    <div class="home-stat-detail text-muted mt-sm">
                        ${stats.correctAnswers} / ${stats.totalAnswers} dogru cevap
                    </div>
                    <div class="home-stat-detail text-muted">
                        ${stats.totalQuizzes} quiz tamamlandi
                    </div>
                </div>
            </div>

            <!-- Badges -->
            ${earnedBadges.length > 0 ? `
            <div class="home-badges mt-xl anim-fade-in-up">
                <div class="flex justify-between items-center mb-md">
                    <h3>Rozetlerim</h3>
                    <span class="text-muted">${earnedBadges.length} / ${Object.keys(BADGES).length}</span>
                </div>
                <div class="badges-grid">
                    ${earnedBadges.map(b => `
                        <div class="badge-item" title="${b.desc}">
                            <span class="badge-icon">${b.icon}</span>
                            <span class="badge-name">${b.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : `
            <div class="home-badges-empty mt-xl card anim-fade-in-up text-center" style="padding: 2rem;">
                <span style="font-size: 3rem;">&#127942;</span>
                <h3 class="mt-md">Henuz rozet kazanmadin</h3>
                <p class="text-muted mt-sm">Derslerini tamamlayarak rozetler kazanabilirsin!</p>
            </div>
            `}
        </div>`;
}

function getMotivation(stats) {
    if (stats.streak >= 7) return 'Harika bir seri! Devam et, cok iyi gidiyorsun!';
    if (stats.streak >= 3) return `${stats.streak} gunluk serin var. Birakma!`;
    if (stats.completedChapters > 10) return 'Cok yol kat ettin, tebrikler!';
    if (stats.completedChapters > 0) return 'Guzel ilerliyorsun, bugun de bir ders yapalim mi?';
    return 'Bugune bir ders ile basla, harika seyler seni bekliyor!';
}
