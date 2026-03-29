// ===== DKAB Akademi - Sidebar Bileseni =====

import { store } from '../store.js?v=4';
import { getAllGrades, getGradeInfo } from '../data-loader.js?v=4';

export function renderSidebar(el, app) {
    const user = store.user;
    if (!user) {
        el.innerHTML = '';
        return;
    }

    const currentGrade = user.grade;
    const grades = getAllGrades();
    const gradeProgress = store.getGradeProgress(currentGrade);

    el.innerHTML = `
        <div class="sidebar-section">
            <div class="sidebar-user">
                <div class="sidebar-avatar">
                    <span>${user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div class="sidebar-user-info">
                    <div class="sidebar-user-name">${user.name}</div>
                    <div class="sidebar-user-grade text-muted">${currentGrade}. Sinif</div>
                </div>
            </div>
        </div>

        <div class="sidebar-section">
            <div class="sidebar-nav">
                <a href="#/" class="sidebar-link ${app.currentRoute?.page === 'home' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#127968;</span>
                    Ana Sayfa
                </a>
                <a href="#/sinif/${currentGrade}" class="sidebar-link ${app.currentRoute?.page === 'grade-home' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128218;</span>
                    Derslerim
                    ${gradeProgress.total > 0 ? `<span class="badge badge-success" style="margin-left:auto;">${gradeProgress.percent}%</span>` : ''}
                </a>
                <a href="#/sinif/${currentGrade}/sozluk" class="sidebar-link ${app.currentRoute?.page === 'glossary' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128214;</span>
                    Sozluk
                </a>
                <a href="#/ilerleme" class="sidebar-link ${app.currentRoute?.page === 'progress' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128200;</span>
                    Ilerleme
                </a>
            </div>
        </div>

        <div class="sidebar-section">
            <div class="sidebar-section-title">Sinif Degistir</div>
            <div class="sidebar-grades">
                ${grades.map(g => `
                    <a href="#/sinif/${g.grade}"
                       class="sidebar-grade-btn ${g.grade === currentGrade ? 'current' : ''}"
                       style="background: ${g.gradient}">
                        ${g.grade}
                    </a>
                `).join('')}
            </div>
        </div>

        <div class="sidebar-section sidebar-footer">
            <button class="sidebar-link text-muted" id="btn-reset" style="border:none; background:none; width:100%; cursor:pointer;">
                <span class="sidebar-link-icon">&#9881;</span>
                Sifirla
            </button>
        </div>`;

    // Bind reset
    el.querySelector('#btn-reset')?.addEventListener('click', () => {
        if (confirm('Tum ilerlemeniz silinecek. Emin misiniz?')) {
            store.resetAll();
            window.location.hash = '#/sinif-sec';
        }
    });
}
