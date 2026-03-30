// ===== DKAB Akademi - Gelismis Ilerleme Panosu =====

import { store, BADGES, XP_PER_LEVEL } from '../store.js?v=12';
import { getAllGrades, getGradeInfo, loadGradeEssentials } from '../data-loader.js?v=12';
import { getUnitMasteryScore } from '../adaptive.js?v=12';

export async function renderProgressDashboard(el, app) {
    const user = store.user;
    const stats = store.stats;
    const xpCurrent = store.getXpForCurrentLevel();
    const accuracy = stats.totalAnswers > 0 ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 0;

    if (!user) {
        el.innerHTML = '<div class="content-area text-center mt-xl"><p class="text-muted">Lutfen once giris yapin.</p></div>';
        return;
    }

    // Show loading state
    el.innerHTML = '<div class="content-area text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div><p class="text-muted">Istatistikler yukleniyor...</p></div>';

    // Load grade data for radar chart
    const grade = user.grade;
    const essentials = await loadGradeEssentials(grade);

    // All badges
    const allBadges = Object.values(BADGES);
    const earnedBadges = allBadges.filter(b => stats.badges.includes(b.id));
    const lockedBadges = allBadges.filter(b => !stats.badges.includes(b.id));

    // Build activity data (last 365 days)
    const activityData = buildActivityData();

    // Radar chart data
    const radarData = buildRadarData(grade, essentials);

    // Total time in minutes
    const totalMinutes = getTotalMinutes();

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
                    <div class="progress-stat-label">Seri</div>
                </div>
                <div class="progress-stat-card card anim-fade-in-up">
                    <div class="progress-stat-icon">&#128336;</div>
                    <div class="progress-stat-value">${formatMinutes(totalMinutes)}</div>
                    <div class="progress-stat-label">Toplam Sure</div>
                </div>
            </div>

            <!-- Level Progress -->
            <div class="card mt-xl anim-fade-in-up" style="padding: 1.5rem;">
                <div class="flex justify-between items-center">
                    <h3>Seviye ${stats.level} &#8594; ${stats.level + 1}</h3>
                    <div class="level-badge">${stats.level}</div>
                </div>
                <div class="progress-bar accent mt-md" style="height: 12px;">
                    <div class="fill" style="width: ${Math.round((xpCurrent / XP_PER_LEVEL) * 100)}%;"></div>
                </div>
                <p class="text-muted mt-sm">${xpCurrent} / ${XP_PER_LEVEL} XP — Sonraki seviyeye <strong>${XP_PER_LEVEL - xpCurrent} XP</strong> kaldi</p>
            </div>

            <!-- Activity Calendar -->
            <div class="card mt-xl anim-fade-in-up" style="padding: 1.5rem;">
                <div class="flex justify-between items-center mb-md">
                    <h3>&#128197; Aktivite Takvimi</h3>
                    <span class="text-muted">${store.getTotalDaysActive()} aktif gun</span>
                </div>
                <div id="activity-calendar" style="overflow-x: auto;">
                    ${renderActivityCalendar(activityData)}
                </div>
                <div class="flex gap-sm mt-sm" style="font-size:0.75rem; align-items:center; flex-wrap:wrap;">
                    <span class="text-muted">Az</span>
                    <span style="width:12px;height:12px;border-radius:3px;background:var(--border);display:inline-block;"></span>
                    <span style="width:12px;height:12px;border-radius:3px;background:#c6e48b;display:inline-block;"></span>
                    <span style="width:12px;height:12px;border-radius:3px;background:#7bc96f;display:inline-block;"></span>
                    <span style="width:12px;height:12px;border-radius:3px;background:#239a3b;display:inline-block;"></span>
                    <span style="width:12px;height:12px;border-radius:3px;background:#196127;display:inline-block;"></span>
                    <span class="text-muted">Cok</span>
                </div>
            </div>

            <!-- Radar Chart: Unit Mastery -->
            ${radarData.length >= 3 ? `
            <div class="card mt-xl anim-fade-in-up" style="padding: 1.5rem;">
                <div class="flex justify-between items-center mb-lg">
                    <h3>&#128251; Unite Ustaligi (${grade}. Sinif)</h3>
                    <span class="text-muted" style="font-size:0.8rem;">Radar Grafik</span>
                </div>
                <div style="display:flex; justify-content:center;">
                    ${renderRadarChart(radarData)}
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:1rem; justify-content:center;">
                    ${radarData.map((d, i) => `
                        <span style="font-size:0.75rem; color:var(--text-secondary); display:flex; align-items:center; gap:4px;">
                            <span style="width:8px;height:8px;border-radius:50%;background:${getRadarColor(i)};display:inline-block;"></span>
                            ${d.label}: %${d.value}
                        </span>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Quiz Stats -->
            <div class="card mt-xl anim-fade-in-up" style="padding: 1.5rem;">
                <h3 class="mb-md">&#127919; Quiz Performansi</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="text-align:center; padding: 1rem; background: var(--bg-main); border-radius: 12px;">
                        <div style="font-size:2rem; font-weight:800; color: ${accuracy >= 70 ? '#10ac84' : accuracy >= 40 ? '#feca57' : '#ff6b6b'};">${accuracy}%</div>
                        <div class="text-muted" style="font-size:0.8rem;">Basari Orani</div>
                    </div>
                    <div style="text-align:center; padding: 1rem; background: var(--bg-main); border-radius: 12px;">
                        <div style="font-size:2rem; font-weight:800; color: var(--primary);">${stats.totalQuizzes}</div>
                        <div class="text-muted" style="font-size:0.8rem;">Tamamlanan Quiz</div>
                    </div>
                </div>
                <div class="mt-md" style="font-size:0.85rem; color:var(--text-secondary);">
                    ${stats.correctAnswers} dogru / ${stats.totalAnswers} toplam soru
                </div>
                ${stats.totalAnswers > 0 ? `
                <div class="progress-bar mt-sm" style="height:8px;">
                    <div class="fill" style="width:${accuracy}%; background: ${accuracy >= 70 ? '#10ac84' : accuracy >= 40 ? '#feca57' : '#ff6b6b'};"></div>
                </div>
                ` : ''}
            </div>

            <!-- Grade Progress -->
            <div class="mt-xl anim-fade-in-up">
                <h3 class="mb-md">Sinif Bazli Ilerleme</h3>
                <div class="grade-progress-list">
                    ${getAllGrades().map(g => {
                        const p = store.getGradeProgress(g.grade);
                        return `
                        <a href="#/sinif/${g.grade}" class="grade-progress-item card card-interactive">
                            <div class="grade-progress-badge" style="background: ${g.gradient};">${g.grade}</div>
                            <div class="grade-progress-info">
                                <div class="grade-progress-name">${g.name}</div>
                                <div class="progress-bar mt-xs" style="height: 5px;">
                                    <div class="fill" style="width: ${p.percent}%; background: ${g.color};"></div>
                                </div>
                            </div>
                            <div class="grade-progress-percent text-muted">${p.percent}%</div>
                        </a>`;
                    }).join('')}
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
                <div class="badges-grid">
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

            <!-- Detailed Stats -->
            <div class="card mt-xl anim-fade-in-up" style="padding: 1.5rem; margin-bottom: 2rem;">
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
                        <span class="stats-detail-value">${stats.longestStreak || 0} gun</span>
                    </div>
                    <div class="stats-detail-row">
                        <span>Toplam Sure</span>
                        <span class="stats-detail-value">${formatMinutes(totalMinutes)}</span>
                    </div>
                    <div class="stats-detail-row">
                        <span>Uyelik Tarihi</span>
                        <span class="stats-detail-value">${user.createdAt || '—'}</span>
                    </div>
                </div>
            </div>
        </div>`;
}

// ===== ACTIVITY CALENDAR =====
function buildActivityData() {
    const dailyLog = store.state?.habits?.dailyLog || {};
    const result = {};
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const entry = dailyLog[key];
        result[key] = entry ? (entry.xpEarned || (entry.active ? 1 : 0)) : 0;
    }
    return result;
}

function renderActivityCalendar(data) {
    const entries = Object.entries(data); // [date, xp]
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find max xp for color scaling
    const maxXp = Math.max(...Object.values(data), 1);

    // Build 52 weeks × 7 days grid
    // Start from 364 days ago, pad to Monday
    const start = new Date(today);
    start.setDate(start.getDate() - 363);
    // Pad to start of week (Mon=1)
    const dayOfWeek = (start.getDay() + 6) % 7; // 0=Mon
    start.setDate(start.getDate() - dayOfWeek);

    const weeks = [];
    let week = [];
    const cursor = new Date(start);

    while (cursor <= today || week.length > 0) {
        const key = cursor.toISOString().slice(0, 10);
        const xp = data[key] || 0;
        const isFuture = cursor > today;
        const isInRange = cursor >= new Date(today.getTime() - 363 * 86400000);

        week.push({ key, xp, isFuture, isInRange });
        cursor.setDate(cursor.getDate() + 1);

        if (week.length === 7) {
            weeks.push(week);
            week = [];
            if (cursor > today && !week.length) break;
        }
    }

    const dayLabels = ['P', 'S', 'Ç', 'P', 'C', 'C', 'P'];
    const monthLabels = buildMonthLabels(weeks);

    let svg = `<svg viewBox="0 0 ${weeks.length * 14 + 20} 110" style="width:100%; min-width:${weeks.length * 14 + 20}px; height:110px;">`;

    // Day labels (left)
    [1, 3, 5].forEach(d => {
        svg += `<text x="0" y="${d * 14 + 24}" style="font-size:8px; fill:var(--text-muted, #aaa);" dominant-baseline="middle">${dayLabels[d]}</text>`;
    });

    // Month labels (top)
    monthLabels.forEach(({ label, weekIdx }) => {
        svg += `<text x="${weekIdx * 14 + 22}" y="8" style="font-size:8px; fill:var(--text-muted, #aaa);">${label}</text>`;
    });

    // Cells
    weeks.forEach((week, wi) => {
        week.forEach((cell, di) => {
            const x = wi * 14 + 22;
            const y = di * 14 + 14;
            const color = cell.isFuture || !cell.isInRange
                ? 'transparent'
                : getActivityColor(cell.xp, maxXp);
            const title = cell.isInRange && !cell.isFuture ? `${cell.key}: ${cell.xp} XP` : '';
            svg += `<rect x="${x}" y="${y}" width="11" height="11" rx="2" fill="${color}" style="stroke:var(--border,#e0e0e0);stroke-width:0.5;">
                ${title ? `<title>${title}</title>` : ''}
            </rect>`;
        });
    });

    svg += '</svg>';
    return svg;
}

function getActivityColor(xp, maxXp) {
    if (!xp) return 'var(--border, #ebedf0)';
    const ratio = xp / maxXp;
    if (ratio < 0.25) return '#c6e48b';
    if (ratio < 0.5) return '#7bc96f';
    if (ratio < 0.75) return '#239a3b';
    return '#196127';
}

function buildMonthLabels(weeks) {
    const labels = [];
    const TR_MONTHS = ['Oca', 'Sub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Agu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
        const firstDay = week.find(d => d.isInRange && !d.isFuture);
        if (!firstDay) return;
        const month = new Date(firstDay.key).getMonth();
        if (month !== lastMonth) {
            labels.push({ label: TR_MONTHS[month], weekIdx: wi });
            lastMonth = month;
        }
    });
    return labels;
}

// ===== RADAR CHART =====
function buildRadarData(grade, essentials) {
    if (!essentials?.units) return [];
    return essentials.units.slice(0, 12).map(unit => {
        const chapters = essentials.chapters?.filter(c => c.unite_id === unit.unite_id) || [];
        const mastery = getUnitMasteryScore(unit.unite_id, chapters);
        // Also factor in completion
        const progress = store.getProgress(grade, unit.unite_id);
        const completionPct = chapters.length > 0
            ? Math.round((Object.values(progress?.chapters || {}).filter(Boolean).length / chapters.length) * 100)
            : 0;
        const combined = Math.round((mastery * 0.6) + (completionPct * 0.4));
        return {
            label: unit.baslik?.length > 12 ? unit.baslik.slice(0, 12) + '…' : (unit.baslik || unit.unite_id),
            value: combined
        };
    });
}

function getRadarColor(i) {
    const colors = ['#6C63FF', '#48C6EF', '#10ac84', '#feca57', '#ff9f43', '#ff6b6b', '#a29bfe', '#fd79a8'];
    return colors[i % colors.length];
}

function renderRadarChart(data) {
    if (data.length < 3) return '';
    const n = data.length;
    const cx = 140, cy = 130, r = 100;
    const levels = 4;

    function polar(angle, radius) {
        return [
            cx + radius * Math.sin(angle),
            cy - radius * Math.cos(angle)
        ];
    }

    let svg = `<svg viewBox="0 0 280 270" style="width:min(280px,100%); height:auto;">`;

    // Grid circles and axis lines
    for (let l = 1; l <= levels; l++) {
        const lr = (r * l) / levels;
        const points = Array.from({ length: n }, (_, i) => polar((2 * Math.PI * i) / n, lr).join(',')).join(' ');
        svg += `<polygon points="${points}" fill="none" stroke="var(--border,#e0e0e0)" stroke-width="1"/>`;
        svg += `<text x="${cx}" y="${cy - lr - 3}" style="font-size:7px; fill:var(--text-muted,#aaa);" text-anchor="middle">${Math.round(100 * l / levels)}%</text>`;
    }

    // Axis lines
    for (let i = 0; i < n; i++) {
        const [x, y] = polar((2 * Math.PI * i) / n, r);
        svg += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--border,#e0e0e0)" stroke-width="1"/>`;
    }

    // Data polygon
    const dataPoints = data.map((d, i) => polar((2 * Math.PI * i) / n, (r * d.value) / 100));
    const polyPoints = dataPoints.map(p => p.join(',')).join(' ');
    svg += `<polygon points="${polyPoints}" fill="rgba(108,99,255,0.2)" stroke="#6C63FF" stroke-width="2"/>`;

    // Data dots + labels
    data.forEach((d, i) => {
        const [x, y] = dataPoints[i];
        svg += `<circle cx="${x}" cy="${y}" r="4" fill="#6C63FF"/>`;

        // Label position with offset
        const angle = (2 * Math.PI * i) / n;
        const lx = cx + (r + 20) * Math.sin(angle);
        const ly = cy - (r + 20) * Math.cos(angle);
        const anchor = Math.abs(Math.sin(angle)) < 0.3 ? 'middle' : (Math.sin(angle) > 0 ? 'start' : 'end');
        svg += `<text x="${lx}" y="${ly}" style="font-size:8px; fill:var(--text-secondary,#555);" text-anchor="${anchor}" dominant-baseline="middle">${d.label}</text>`;
    });

    svg += '</svg>';
    return svg;
}

// ===== HELPERS =====
function getTotalMinutes() {
    const log = store.state?.stats?.sessionLog || [];
    return log.reduce((sum, s) => sum + (s.minutes || 0), 0);
}

function formatMinutes(mins) {
    if (!mins) return '—';
    if (mins < 60) return `${mins}d`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}s ${m}d` : `${h}s`;
}
