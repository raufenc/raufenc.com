// ===== DKAB Akademi - 360° Sidebar Bileseni =====

import { store } from '../store.js?v=12';
import { getAllGrades } from '../data-loader.js?v=12';

export function renderSidebar(el, app) {
    const user = store.user;
    if (!user) {
        el.innerHTML = '';
        return;
    }

    const currentGrade = user.grade;
    const grades = getAllGrades();
    const gradeProgress = store.getGradeProgress(currentGrade);
    const hasClassroom = !!store.getClassroomCode();
    const route = app.currentRoute;

    el.innerHTML = `
        <div class="sidebar-section">
            <div class="sidebar-user">
                <div class="sidebar-avatar">
                    <span>${user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div class="sidebar-user-info">
                    <div class="sidebar-user-name">${esc(user.name)}</div>
                    <div class="sidebar-user-grade text-muted">${currentGrade}. Sinif &middot; Sv.${store.stats.level}</div>
                </div>
            </div>
        </div>

        <!-- OGRENME -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Ogrenme</div>
            <div class="sidebar-nav">
                <a href="#/" class="sidebar-link ${route?.page === 'home' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#127968;</span>
                    Ana Sayfa
                </a>
                <a href="#/yolum" class="sidebar-link ${route?.page === 'learning-path' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128269;</span>
                    Ogrenme Yolum
                    <span class="badge badge-info" style="margin-left:auto; font-size:0.65rem;">360°</span>
                </a>
                <a href="#/sinif/${currentGrade}" class="sidebar-link ${route?.page === 'grade-home' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128218;</span>
                    Derslerim
                    ${gradeProgress.total > 0 ? `<span class="badge badge-success" style="margin-left:auto;">${gradeProgress.percent}%</span>` : ''}
                </a>
                <a href="#/sinif/${currentGrade}/sozluk" class="sidebar-link ${route?.page === 'glossary' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128214;</span>
                    Sozluk
                </a>
            </div>
        </div>

        <!-- TOPLULUK (sadece sinif kodu varsa) -->
        ${hasClassroom ? `
        <div class="sidebar-section">
            <div class="sidebar-section-title">Topluluk</div>
            <div class="sidebar-nav">
                <a href="#/sinif-siralamasi" class="sidebar-link ${route?.page === 'leaderboard' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#127942;</span>
                    Sinif Siralamasi
                </a>
                <a href="#/pano" class="sidebar-link ${route?.page === 'knowledge-wall' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128172;</span>
                    Bilgi Panosu
                </a>
                <a href="#/meydan-okuma" class="sidebar-link ${route?.page === 'challenges' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#9876;</span>
                    Meydan Okuma
                </a>
            </div>
        </div>
        ` : ''}

        <!-- GELISIM -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Gelisim</div>
            <div class="sidebar-nav">
                <a href="#/rehber" class="sidebar-link ${route?.page === 'study-guide' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128218;</span>
                    Rehberli Calisma
                    <span class="badge badge-info" style="margin-left:auto; font-size:0.65rem;">Yeni</span>
                </a>
                <a href="#/ilerleme" class="sidebar-link ${route?.page === 'progress' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128200;</span>
                    Ilerleme
                </a>
                <a href="#/hedefler" class="sidebar-link ${route?.page === 'goals' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#127919;</span>
                    Hedeflerim
                </a>
                <a href="#/aliskanliklar" class="sidebar-link ${route?.page === 'habits' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128197;</span>
                    Aliskanlik Takibi
                </a>
                <a href="#/davranis" class="sidebar-link ${route?.page === 'behavior-tracker' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#127793;</span>
                    Davranis Takibi
                    <span class="badge badge-info" style="margin-left:auto; font-size:0.65rem;">L3</span>
                </a>
                <a href="#/yillik-rapor" class="sidebar-link ${route?.page === 'annual-report' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#128202;</span>
                    Yillik Rapor
                    <span class="badge badge-info" style="margin-left:auto; font-size:0.65rem;">L4</span>
                </a>
            </div>
        </div>

        <!-- KULTUR -->
        <div class="sidebar-section">
            <div class="sidebar-section-title">Kultur</div>
            <div class="sidebar-nav">
                <a href="#/hicri-takvim" class="sidebar-link ${route?.page === 'hicri-takvim' ? 'active' : ''}">
                    <span class="sidebar-link-icon">&#127769;</span>
                    Hicri Takvim
                </a>
            </div>
        </div>

        <!-- SINIF DEGISTIR -->
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

        <!-- ALT KISIM -->
        <div class="sidebar-section sidebar-footer">
            ${!hasClassroom ? `
                <button class="sidebar-link text-muted" id="btn-join-class" style="border:none; background:none; width:100%; cursor:pointer;">
                    <span class="sidebar-link-icon">&#128101;</span>
                    Sinifa Katil
                </button>
            ` : `
                <button class="sidebar-link text-muted" id="btn-leave-class" style="border:none; background:none; width:100%; cursor:pointer;">
                    <span class="sidebar-link-icon">&#128101;</span>
                    Siniftan Ayril (${store.getClassroomCode()})
                </button>
            `}
            <button class="sidebar-link text-muted" id="btn-dark-mode" style="border:none; background:none; width:100%; cursor:pointer;">
                <span class="sidebar-link-icon">${document.body.classList.contains('dark-mode') ? '&#9728;' : '&#127769;'}</span>
                ${document.body.classList.contains('dark-mode') ? 'Aydinlik Mod' : 'Karanlik Mod'}
            </button>
            <button class="sidebar-link text-muted" id="btn-reset" style="border:none; background:none; width:100%; cursor:pointer;">
                <span class="sidebar-link-icon">&#9881;</span>
                Sifirla
            </button>
        </div>`;

    // Olay dinleyicileri
    function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    el.querySelector('#btn-dark-mode')?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dkab_dark_mode', document.body.classList.contains('dark-mode') ? '1' : '0');
        renderSidebar(el, app);
    });

    el.querySelector('#btn-reset')?.addEventListener('click', () => {
        if (confirm('Tum ilerlemeniz silinecek. Emin misiniz?')) {
            store.resetAll();
            window.location.hash = '#/sinif-sec';
        }
    });

    el.querySelector('#btn-join-class')?.addEventListener('click', () => {
        const code = prompt('Ogretmeninizden aldiginiz 6 haneli sinif kodunu girin:');
        if (code && code.trim().length >= 4) {
            store.joinClassroom(code.trim().toUpperCase());
            renderSidebar(el, app);
        }
    });

    el.querySelector('#btn-leave-class')?.addEventListener('click', () => {
        if (confirm('Siniftan ayrilmak istediginize emin misiniz?')) {
            store.leaveClassroom();
            renderSidebar(el, app);
        }
    });
}
