// ===== DKAB Akademi - Header Bileseni =====

import { store, XP_PER_LEVEL } from '../store.js?v=6';

export function renderHeader(el, app) {
    const user = store.user;
    const stats = store.stats;

    if (!user) {
        el.innerHTML = `
            <div class="header-left">
                <a href="#/" class="header-logo">
                    <span class="logo-icon">&#128218;</span>
                    <span class="logo-text font-display">DKAB Akademi</span>
                </a>
            </div>
            <div class="header-right">
                <a href="#/sinif-sec" class="btn btn-primary btn-sm">Basla</a>
            </div>`;
        return;
    }

    const xpCurrent = store.getXpForCurrentLevel();
    const xpPercent = Math.round((xpCurrent / XP_PER_LEVEL) * 100);

    el.innerHTML = `
        <div class="header-left">
            <button class="btn-icon header-menu-btn" id="menu-toggle" aria-label="Menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <a href="#/" class="header-logo">
                <span class="logo-icon">&#128218;</span>
                <span class="logo-text font-display">DKAB Akademi</span>
            </a>
        </div>

        <div class="header-center">
            <div class="header-stats">
                <div class="streak-display" title="Gunluk seri">
                    <span>&#128293;</span>
                    <span>${stats.streak}</span>
                </div>
                <div class="xp-display" title="Toplam XP: ${stats.totalXp}">
                    <span class="xp-icon">&#9889;</span>
                    <span>${stats.totalXp}</span>
                </div>
                <div class="level-badge" title="Seviye ${stats.level}">
                    ${stats.level}
                </div>
            </div>
        </div>

        <div class="header-right">
            <div class="header-xp-bar" title="Seviye ${stats.level} - ${xpCurrent}/${XP_PER_LEVEL} XP">
                <div class="progress-bar" style="width:80px; height:6px;">
                    <div class="fill accent" style="width:${xpPercent}%"></div>
                </div>
            </div>
            <div class="header-avatar" title="${user.name}">
                <span>${user.name.charAt(0).toUpperCase()}</span>
            </div>
        </div>`;

    // Bind menu toggle
    el.querySelector('#menu-toggle')?.addEventListener('click', () => app.toggleSidebar());
}
