// ===== DKAB Akademi - 360° Aliskanlik Takibi =====

import { store } from '../store.js?v=9';

const MILESTONES = [
    { days: 10, icon: '&#127793;', name: 'Filiz', desc: '10 gun aktif!' },
    { days: 25, icon: '&#127795;', name: 'Fidan', desc: '25 gun aktif!' },
    { days: 50, icon: '&#127796;', name: 'Agac', desc: '50 gun aktif!' },
    { days: 100, icon: '&#127807;', name: 'Orman', desc: '100 gun aktif!' },
    { days: 200, icon: '&#127774;', name: 'Gunes', desc: '200 gun aktif!' },
    { days: 365, icon: '&#11088;', name: 'Yildiz', desc: '365 gun aktif!' }
];

export function renderHabits(el, app) {
    const user = store.user;
    if (!user) {
        window.location.hash = '#/sinif-sec';
        return;
    }

    const dailyLog = store.getDailyLog();
    const totalDays = store.getTotalDaysActive();
    const stats = store.stats;

    // Son 365 gunluk aktivite takvimi olustur
    const today = new Date();
    const calendarData = generateCalendarData(dailyLog, today);

    // Haftalik karsilastirma
    const thisWeekDays = countDaysInRange(dailyLog, 7);
    const lastWeekDays = countDaysInRange(dailyLog, 14) - thisWeekDays;

    // Siradaki kilometre tasi
    const nextMilestone = MILESTONES.find(m => m.days > totalDays);

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <h1 class="font-display">&#128197; Aliskanlik Takibi</h1>
                <p class="text-muted">Her gun bir adim. Kucuk adimlar buyuk yolculuklara donusur.</p>
            </div>

            <!-- Ozet Kartlari -->
            <div class="habits-summary mt-lg anim-fade-in-up" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
                <div class="card text-center" style="padding:1.25rem;">
                    <div style="font-size:2rem; font-weight:700; color:var(--primary);">${totalDays}</div>
                    <div class="text-muted" style="font-size:0.85rem;">Toplam Aktif Gun</div>
                </div>
                <div class="card text-center" style="padding:1.25rem;">
                    <div style="font-size:2rem; font-weight:700; color:var(--success);">${stats.streak}</div>
                    <div class="text-muted" style="font-size:0.85rem;">Mevcut Seri</div>
                </div>
                <div class="card text-center" style="padding:1.25rem;">
                    <div style="font-size:2rem; font-weight:700; color:var(--warning);">${stats.longestStreak}</div>
                    <div class="text-muted" style="font-size:0.85rem;">En Uzun Seri</div>
                </div>
                <div class="card text-center" style="padding:1.25rem;">
                    <div style="font-size:2rem; font-weight:700;">${thisWeekDays}/7</div>
                    <div class="text-muted" style="font-size:0.85rem;">Bu Hafta</div>
                </div>
            </div>

            <!-- Haftalik Karsilastirma -->
            <div class="card anim-fade-in-up mt-lg" style="padding:1.5rem;">
                <h3>&#128200; Haftalik Karsilastirma</h3>
                <div class="mt-md" style="display:flex; align-items:center; gap:2rem; justify-content:center;">
                    <div style="text-align:center;">
                        <div class="text-muted">Gecen Hafta</div>
                        <div style="font-size:1.5rem; font-weight:600;">${lastWeekDays} gun</div>
                    </div>
                    <div style="font-size:1.5rem; color:${thisWeekDays > lastWeekDays ? 'var(--success)' : thisWeekDays === lastWeekDays ? 'var(--text-muted)' : 'var(--warning)'};">
                        ${thisWeekDays > lastWeekDays ? '&#8593;' : thisWeekDays === lastWeekDays ? '&#8596;' : '&#8595;'}
                    </div>
                    <div style="text-align:center;">
                        <div class="text-muted">Bu Hafta</div>
                        <div style="font-size:1.5rem; font-weight:600; color:var(--primary);">${thisWeekDays} gun</div>
                    </div>
                </div>
            </div>

            <!-- Aktivite Takvimi -->
            <div class="card anim-fade-in-up mt-lg" style="padding:1.5rem; overflow-x:auto;">
                <h3>&#128197; Aktivite Takvimi</h3>
                <p class="text-muted" style="font-size:0.8rem;">Son 365 gun</p>
                <div class="activity-calendar mt-md" style="display:inline-grid; grid-template-rows:repeat(7, 1fr); grid-auto-flow:column; gap:3px;">
                    ${calendarData.map(day => `
                        <div class="cal-day" title="${day.date}: ${day.active ? 'Aktif' : 'Bos'}" style="
                            width:14px; height:14px; border-radius:3px;
                            background:${day.active ? getActivityColor(day.sessions) : 'var(--bg-secondary)'};
                        "></div>
                    `).join('')}
                </div>
                <div class="mt-sm" style="display:flex; align-items:center; gap:0.5rem; font-size:0.75rem; color:var(--text-muted);">
                    <span>Az</span>
                    <div style="width:14px; height:14px; border-radius:3px; background:var(--bg-secondary);"></div>
                    <div style="width:14px; height:14px; border-radius:3px; background:rgba(108,99,255,0.3);"></div>
                    <div style="width:14px; height:14px; border-radius:3px; background:rgba(108,99,255,0.6);"></div>
                    <div style="width:14px; height:14px; border-radius:3px; background:var(--primary);"></div>
                    <span>Cok</span>
                </div>
            </div>

            <!-- Kilometre Taslari -->
            <div class="card anim-fade-in-up mt-lg" style="padding:1.5rem;">
                <h3>&#127942; Kilometre Taslari</h3>
                <div class="milestones mt-md" style="display:flex; flex-wrap:wrap; gap:1rem;">
                    ${MILESTONES.map(m => {
                        const reached = totalDays >= m.days;
                        return `
                            <div style="
                                text-align:center; padding:1rem; border-radius:12px; min-width:80px;
                                background:${reached ? 'var(--bg-secondary)' : 'transparent'};
                                opacity:${reached ? 1 : 0.4};
                                border:${!reached && m === nextMilestone ? '2px dashed var(--primary)' : 'none'};
                            ">
                                <div style="font-size:2rem;">${m.icon}</div>
                                <div style="font-weight:600; font-size:0.85rem; margin-top:4px;">${m.name}</div>
                                <div class="text-muted" style="font-size:0.75rem;">${m.days} gun</div>
                                ${reached ? '<div style="color:var(--success); font-size:0.75rem;">&#10003;</div>' : ''}
                            </div>`;
                    }).join('')}
                </div>
                ${nextMilestone ? `
                    <div class="mt-md text-center">
                        <div class="progress-bar" style="height:8px; max-width:300px; margin:0 auto;">
                            <div class="fill" style="width:${Math.round((totalDays / nextMilestone.days) * 100)}%;"></div>
                        </div>
                        <p class="text-muted mt-sm" style="font-size:0.85rem;">
                            Siradaki: ${nextMilestone.name} (${nextMilestone.days - totalDays} gun kaldi)
                        </p>
                    </div>
                ` : `
                    <p class="text-center mt-md" style="color:var(--success); font-weight:600;">Tum kilometre taslarini tamamladin!</p>
                `}
            </div>
        </div>`;
}

function generateCalendarData(dailyLog, today) {
    const data = [];
    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const log = dailyLog[dateStr];
        data.push({
            date: dateStr,
            active: !!log,
            sessions: log?.sessions || 0,
            minutes: log?.minutesSpent || 0
        });
    }
    return data;
}

function countDaysInRange(dailyLog, daysBack) {
    const today = new Date();
    let count = 0;
    for (let i = 0; i < Math.min(daysBack, 7); i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        if (dailyLog[dateStr]) count++;
    }
    return count;
}

function getActivityColor(sessions) {
    if (sessions >= 3) return 'var(--primary)';
    if (sessions >= 2) return 'rgba(108,99,255,0.6)';
    return 'rgba(108,99,255,0.3)';
}
