// ===== DKAB Akademi - Ana Uygulama + Router =====

import { store } from './store.js?v=4';
import { getGradeInfo, loadGradeEssentials, loadChapterContent, loadGlossary, loadData } from './data-loader.js?v=4';
import { renderHeader } from './components/header.js?v=4';
import { renderSidebar } from './components/sidebar.js?v=4';
import { renderHome } from './components/home.js?v=4';
import { renderClassSelector } from './components/class-selector.js?v=4';
import { renderUnitList } from './components/unit-list.js?v=4';
import { renderChapterView } from './components/chapter-view.js?v=4';
import { renderGlossary } from './components/glossary.js?v=4';
import { renderProgressDashboard } from './components/progress-dashboard.js?v=4';
import { showConfetti, showXpPopup } from './components/effects.js?v=4';

class App {
    constructor() {
        this.currentRoute = null;
        this.mainEl = document.getElementById('main-content');
        this.headerEl = document.getElementById('app-header');
        this.sidebarEl = document.getElementById('app-sidebar');
        this.overlayEl = document.getElementById('sidebar-overlay');

        this._bindEvents();
        this._initTheme();

        // Update streak on load
        if (store.user) {
            store.updateStreak();
        }

        // Initial render
        renderHeader(this.headerEl, this);
        renderSidebar(this.sidebarEl, this);
        this._onHashChange();
    }

    _bindEvents() {
        window.addEventListener('hashchange', () => this._onHashChange());
        this.overlayEl?.addEventListener('click', () => this.closeSidebar());

        // Listen to store changes
        store.onChange(() => {
            renderHeader(this.headerEl, this);
            renderSidebar(this.sidebarEl, this);
        });
    }

    _initTheme() {
        const grade = store.user?.grade;
        if (grade && grade <= 8) {
            document.body.classList.add('child-mode');
        } else {
            document.body.classList.remove('child-mode');
        }
    }

    _onHashChange() {
        const hash = window.location.hash || '#/';
        const route = this._parseRoute(hash);
        this.currentRoute = route;

        // Close sidebar on mobile
        this.closeSidebar();

        // Update theme based on grade
        if (route.grade) {
            const info = getGradeInfo(route.grade);
            if (info?.mode === 'child') {
                document.body.classList.add('child-mode');
            } else {
                document.body.classList.remove('child-mode');
            }
        }

        this._renderRoute(route);
    }

    _parseRoute(hash) {
        const parts = hash.replace('#/', '').split('/').filter(Boolean);

        if (parts.length === 0) {
            return store.user ? { page: 'home' } : { page: 'class-selector' };
        }

        if (parts[0] === 'sinif' && parts[1]) {
            const grade = parseInt(parts[1]);
            if (parts[2] === 'unite' && parts[3]) {
                const unitId = `U${parts[3]}`;
                if (parts[4] === 'bolum' && parts[5]) {
                    // bolum_id comes directly from URL (e.g. U1_B1, U1_GIRIS, U1_DEG, U1_PERF)
                    const chapterId = parts[5];
                    return { page: 'chapter', grade, unitId, chapterId };
                }
                return { page: 'unit', grade, unitId };
            }
            if (parts[2] === 'sozluk') {
                return { page: 'glossary', grade };
            }
            return { page: 'grade-home', grade };
        }

        if (parts[0] === 'sinif-sec') return { page: 'class-selector' };
        if (parts[0] === 'ilerleme') return { page: 'progress' };
        if (parts[0] === 'profil') return { page: 'profile' };

        return { page: 'home' };
    }

    async _renderRoute(route) {
        // Scroll to top on page navigation
        window.scrollTo(0, 0);

        // Page transition
        this.mainEl.classList.remove('page-enter');

        // Small delay for animation
        await new Promise(r => setTimeout(r, 50));

        switch (route.page) {
            case 'class-selector':
                renderClassSelector(this.mainEl, this);
                break;

            case 'home':
                if (!store.user) {
                    window.location.hash = '#/sinif-sec';
                    return;
                }
                renderHome(this.mainEl, this);
                break;

            case 'grade-home':
                await this._renderGradeHome(route.grade);
                break;

            case 'unit':
                await this._renderUnit(route.grade, route.unitId);
                break;

            case 'chapter':
                await this._renderChapter(route.grade, route.unitId, route.chapterId);
                break;

            case 'glossary':
                await this._renderGlossary(route.grade);
                break;

            case 'progress':
                renderProgressDashboard(this.mainEl, this);
                break;

            default:
                this.mainEl.innerHTML = `
                    <div class="content-area text-center mt-xl">
                        <h2>Sayfa bulunamadi</h2>
                        <p class="text-muted mt-md">Aradaginiz sayfa mevcut degil.</p>
                        <a href="#/" class="btn btn-primary mt-lg">Ana Sayfaya Don</a>
                    </div>`;
        }

        this.mainEl.classList.add('page-enter');
    }

    async _renderGradeHome(grade) {
        this.mainEl.innerHTML = '<div class="content-area text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div><p class="text-muted">Dersler yukleniyor...</p></div>';

        const data = await loadGradeEssentials(grade);
        if (!data.units) {
            this.mainEl.innerHTML = `
                <div class="content-area text-center mt-xl">
                    <h2>&#128218; Icerik Hazirlaniyor</h2>
                    <p class="text-muted mt-md">${grade}. sinif icerigi henuz yuklenmedi.</p>
                    <a href="#/" class="btn btn-primary mt-lg">Ana Sayfaya Don</a>
                </div>`;
            return;
        }

        // Don't change user's registered grade when just browsing

        renderUnitList(this.mainEl, grade, data, this);
    }

    async _renderUnit(grade, unitId) {
        this.mainEl.innerHTML = '<div class="content-area text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div></div>';

        const data = await loadGradeEssentials(grade);
        if (!data.bookMap) {
            this.mainEl.innerHTML = '<div class="content-area text-center mt-xl"><p class="text-muted">Veri yuklenemedi.</p></div>';
            return;
        }

        renderUnitList(this.mainEl, grade, data, this, unitId);
    }

    async _renderChapter(grade, unitId, chapterId) {
        this.mainEl.innerHTML = '<div class="content-area text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div><p class="text-muted">Ders yukleniyor...</p></div>';

        const [essentials, content] = await Promise.all([
            loadGradeEssentials(grade),
            loadChapterContent(grade, unitId, chapterId)
        ]);

        // Find chapter info
        const chapter = essentials.chapters?.find(c => c.bolum_id === chapterId);
        const unit = essentials.units?.find(u => u.unite_id === unitId);

        if (!chapter) {
            this.mainEl.innerHTML = '<div class="content-area text-center mt-xl"><p class="text-muted">Bolum bulunamadi.</p></div>';
            return;
        }

        renderChapterView(this.mainEl, {
            grade, unitId, chapterId,
            chapter, unit,
            ...content
        }, this);
    }

    async _renderGlossary(grade) {
        this.mainEl.innerHTML = '<div class="content-area text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div></div>';
        const glossary = await loadGlossary(grade);

        if (!glossary) {
            this.mainEl.innerHTML = '<div class="content-area text-center mt-xl"><p class="text-muted">Sozluk yuklenemedi.</p></div>';
            return;
        }

        renderGlossary(this.mainEl, grade, glossary, this);
    }

    // Navigation helpers
    navigate(hash) {
        window.location.hash = hash;
    }

    goBack() {
        window.history.back();
    }

    toggleSidebar() {
        this.sidebarEl?.classList.toggle('open');
        this.overlayEl?.classList.toggle('visible');
    }

    closeSidebar() {
        this.sidebarEl?.classList.remove('open');
        this.overlayEl?.classList.remove('visible');
    }

    // Gamification actions
    celebrateCompletion(xp) {
        showConfetti();
        if (xp > 0) {
            showXpPopup(xp);
        }
    }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
