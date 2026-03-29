// ===== DKAB Akademi - Ilerleme Panosu =====

import { store, BADGES, XP_PER_LEVEL } from '../store.js?v=4';
import { getAllGrades, getGradeInfo } from '../data-loader.js?v=4';

export function renderProgressDashboard(el, app) {
    const user = store.user;
    const stats = store.stats;
    const xpCurrent = store.getXpForCurrentLevel();
    const accuracy = stats.totalAnswers > 0 ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 0;

    if (!user) {
        el.innerHTML = '<div class="content-area text-center mt-xl"><p class="text-muted">Lutfen once giris yapin.</p></div>';
        return;
    }

    // Collect all grade progresses
    const grades = getAllGrades();
    const gradeProgresses = grades.map(g => ({
        ...g,
        progress: store.getGradeProgress(g.grade)
    }));

    // All badges
    const allBadges = Object.values(BADGES);
    const earnedBadges = allBadges.filter(b => stats.badges.includes(b.id));
    const lockedBadges = allBadges.filter(b => !stats.badges.includes(b.id));

    el.innerHTML = `
        <div class="content-area">
            <div class="flex items-center gap-md mb-xl anim-fade-in-up">
                <button class="btn-icon" onclick="history.back()" style="color:var(--text-secondary);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <h2 class="font-display">&#128200; Ilerleme Panosu</h2>
            </div>

            <!-- Overview Stats -->
            <div class="progress-overview stagger">
                <div class="progress-stat-card card anim-fade-in-up">
                    <div class="progress-stat-icon">&#9889;</div>
                    <div class="progress-stat-value">${stats.totalXp}</div>
                    <div class="progress-stat-label">Toplam XP</div>
                </div>
                <div class="progress-stat-card card anim-fade-in-up">
                    <div class="progress-stat-icon">&#127942;</div>
                    <div class="progress-stat-value">${stats.level}</div>
                    <div class="progress-stat-label">Seviye</div>
                </div>
                <div class="progress-stat-card card anim-fade-in-up">
                    <div class="progress-stat-icon">&#128293;</div>
                    <div class="progress-stat-value">${stats.streak}</div>
                    <div class="progress-stat-label">Gunluk Seri</div>
                </div>
                <div class="progress-stat-card card anim-fade-in-up">
                    <div class="progress-stat-icon">&#127919;</div>
                    <div class="progress-stat-value">${accuracy}%</div>
                    <div class="progress-stat-label">Basari Orani</div>
                </div>
            </div>

            <!-- Level Progress -->
            <div class="card mt-xl anim-fade-in-up" style="padding: 1.5rem;">
                <div class="flex justify-between items-center">
                    <h3>Seviye Ilerlemesi</h3>
                    <div class="level-badge">${stats.level}</div>
                </div>
                <div class="progress-bar accent mt-md" style="height: 12px;">
                    <div class="fill" style="width: ${Math.round((xpCurrent / XP_PER_LEVEL) * 100)}%;"></div>
                </div>
                <p class="text-muted mt-sm">${xpCurrent} / ${XP_PER_LEVEL} XP - Sonraki seviyeye ${XP_PER_LEVEL - xpCurrent} XP kaldi</p>
            </div>

            <!-- Grade Progress -->
            <div class="mt-xl anim-fade-in-up">
                <h3 class="mb-md">Sinif Bazli Ilerleme</h3>
                <div class="grade-progress-list">
                    ${gradeProgresses.map(g => `
                        <a href="#/sinif/${g.grade}" class="grade-progress-item card card-interactive">
                            <div class="grade-progress-badge" style="background: ${g.gradient};">${g.grade}</div>
                            <div class="grade-progress-info">
                                <div class="grade-progress-name">${g.name}</div>
                                <div class="progress-bar mt-xs" style="height: 5px;">
                                    <div class="fill" style="width: ${g.progress.percent}%; background: ${g.color};"></div>
                                </div>
                            </div>
                            <div class="grade-progress-percent text-muted">${g.progress.percent}%</div>
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Badges -->
            <div class="mt-xl anim-fade-in-up">
                <div class="flex justify-between items-center mb-md">
                    <h3>&#127942; Rozetler</h3>
                    <span class="text-muted">${earnedBadges.length} / ${allBadges.length}</span>
                </div>

                ${earnedBadges.length > 0 ? `
                <div class="badges-grid mb-lg">
                    ${earnedBadges.map(b => `
                        <div class="badge-item earned" title="${b.desc}">
                            <span class="badge-icon">${b.icon}</span>
                            <span class="badge-name">${b.name}</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${lockedBadges.length > 0 ? `
                <div class="badges-grid locked">
                    ${lockedBadges.map(b => `
                        <div class="badge-item locked" title="${b.desc}">
                            <span class="badge-icon" style="filter: grayscale(1); opacity: 0.4;">${b.icon}</span>
                            <span class="badge-name text-muted">${b.name}</span>
                            <span class="badge-desc text-muted" style="font-size:0.65rem;">${b.desc}</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>

            <!-- Stats Detail -->
            <div class="card mt-xl anim-fade-in-up" style="padding: 1.5rem;">
                <h3 class="mb-md">Detayli Istatistikler</h3>
                <div class="stats-detail-list">
                    <div class="stats-detail-row">
                        <span>Tamamlanan Bolum</span>
                        <span class="stats-detail-value">${stats.completedChapters}</span>
                    </div>
                    <div class="stats-detail-row">
                        <span>Toplam Quiz</span>
                        <span class="stats-detail-value">${stats.totalQuizzes}</span>
                    </div>
                    <div class="stats-detail-row">
                        <span>Dogru Cevap</span>
                        <span class="stats-detail-value">${stats.correctAnswers} / ${stats.totalAnswers}</span>
                    </div>
                    <div class="stats-detail-row">
                        <span>En Uzun Seri</span>
                        <span class="stats-detail-value">${stats.longestStreak} gun</span>
                    </div>
                    <div class="stats-detail-row">
                        <span>Uyelik Tarihi</span>
                        <span class="stats-detail-value">${user.createdAt}</span>
                    </div>
                </div>
            </div>
        </div>`;
}
