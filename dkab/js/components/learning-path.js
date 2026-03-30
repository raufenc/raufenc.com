// ===== DKAB Akademi - 360° Akilli Ogrenme Yolu =====

import { store } from '../store.js?v=11';
import { loadGradeEssentials, loadData, getGradeInfo } from '../data-loader.js?v=11';
import { getUnitMasteryScore } from '../adaptive.js?v=11';
import { getDailyMessage } from '../messages.js?v=11';

/**
 * Akilli ogrenme yolu bileseni
 * - Tamamlanmamis bolumleri onceliklendirir
 * - Dusuk puanli uniteleri yukari cikarir
 * - 7+ gun once tamamlananlari tekrar icin onerir
 * - Zorluk tercihine gore adapte olur
 */
export async function renderLearningPath(el, app) {
    const user = store.user;
    if (!user) {
        window.location.hash = '#/sinif-sec';
        return;
    }

    const grade = user.grade;
    const gradeInfo = getGradeInfo(grade);

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <h1 class="font-display">&#128269; Ogrenme Yolum</h1>
                <p class="text-muted">${getDailyMessage()}</p>
            </div>
            <div class="learning-path-content mt-lg">
                <div class="spinner" style="margin:2rem auto;"></div>
                <p class="text-muted text-center">Ogrenme yolun hazirlaniyor...</p>
            </div>
        </div>`;

    // Verileri yukle
    const essentials = await loadGradeEssentials(grade);
    if (!essentials.units || !essentials.chapters) {
        el.querySelector('.learning-path-content').innerHTML = `
            <div class="card text-center" style="padding:2rem;">
                <p class="text-muted">Henuz veri yuklenmedi.</p>
            </div>`;
        return;
    }

    const recommendations = generateRecommendations(grade, essentials);
    renderRecommendations(el.querySelector('.learning-path-content'), recommendations, grade, gradeInfo, essentials);
}

function generateRecommendations(grade, essentials) {
    const { units, chapters } = essentials;
    const today = new Date();
    const recommendations = [];

    // 1. Tamamlanmamis bolumler
    chapters.forEach(ch => {
        const progress = store.getProgress(grade, ch.unite_id, ch.bolum_id);
        if (!progress?.completed) {
            const mastery = store.getTopicMastery(ch.unite_id, ch.bolum_id);
            recommendations.push({
                type: 'incomplete',
                priority: mastery.attempts > 0 ? 2 : 1, // Hic denenmemis -> en yuksek oncelik
                unitId: ch.unite_id,
                chapterId: ch.bolum_id,
                title: ch.baslik || ch.bolum_adi,
                unitTitle: units.find(u => u.unite_id === ch.unite_id)?.baslik || '',
                mastery: mastery.score,
                reason: mastery.attempts > 0 ? 'Devam et' : 'Yeni ders'
            });
        }
    });

    // 2. Tekrar gereken bolumler (7+ gun once tamamlanmis)
    chapters.forEach(ch => {
        const progress = store.getProgress(grade, ch.unite_id, ch.bolum_id);
        if (progress?.completed && progress.completedAt) {
            const completedDate = new Date(progress.completedAt);
            const daysSince = Math.floor((today - completedDate) / (1000 * 60 * 60 * 24));
            if (daysSince >= 7) {
                const mastery = store.getTopicMastery(ch.unite_id, ch.bolum_id);
                recommendations.push({
                    type: 'review',
                    priority: mastery.score < 60 ? 3 : 5,
                    unitId: ch.unite_id,
                    chapterId: ch.bolum_id,
                    title: ch.baslik || ch.bolum_adi,
                    unitTitle: units.find(u => u.unite_id === ch.unite_id)?.baslik || '',
                    mastery: mastery.score,
                    daysSince,
                    reason: mastery.score < 60 ? 'Guclendirme gerekli' : 'Tekrar zamani'
                });
            }
        }
    });

    // 3. Dusuk puanli uniteler (ek vurgu)
    units.forEach(u => {
        const unitChapters = chapters.filter(c => c.unite_id === u.unite_id);
        const masteryScore = getUnitMasteryScore(u.unite_id, unitChapters);
        const unitProgress = store.getUnitProgress(grade, u.unite_id);

        if (masteryScore > 0 && masteryScore < 50 && unitProgress.percent < 100) {
            // Bu unitedeki en zayif bolumu bul
            let weakest = null;
            let weakestScore = 100;
            unitChapters.forEach(ch => {
                const m = store.getTopicMastery(u.unite_id, ch.bolum_id);
                if (m.attempts > 0 && m.score < weakestScore) {
                    weakestScore = m.score;
                    weakest = ch;
                }
            });

            if (weakest && !recommendations.find(r => r.chapterId === weakest.bolum_id && r.type === 'weak')) {
                recommendations.push({
                    type: 'weak',
                    priority: 2,
                    unitId: u.unite_id,
                    chapterId: weakest.bolum_id,
                    title: weakest.baslik || weakest.bolum_adi,
                    unitTitle: u.baslik || '',
                    mastery: weakestScore,
                    reason: 'Zayif alan'
                });
            }
        }
    });

    // Oncelik sirasi: 1 (en yuksek) -> 5 (en dusuk)
    recommendations.sort((a, b) => a.priority - b.priority);

    return recommendations.slice(0, 10); // Maks 10 oneri
}

function renderRecommendations(container, recommendations, grade, gradeInfo, essentials) {
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="card text-center anim-fade-in-up" style="padding:3rem;">
                <span style="font-size:4rem;">&#127881;</span>
                <h2 class="mt-lg">Tebrikler!</h2>
                <p class="text-muted mt-md">Tum derslerin tamamlanmis gorunuyor. Harika is cikardin!</p>
                <a href="#/sinif/${grade}" class="btn btn-primary mt-lg">Derslere Git</a>
            </div>`;
        return;
    }

    // Zorluk secici
    const difficulty = store.getDifficulty();

    container.innerHTML = `
        <div class="difficulty-selector card anim-fade-in-up" style="padding:1rem; margin-bottom:1.5rem;">
            <div class="flex items-center justify-between">
                <span style="font-weight:600;">Zorluk Seviyesi</span>
                <div class="difficulty-btns">
                    <button class="btn btn-sm ${difficulty === 'easy' ? 'btn-primary' : 'btn-outline'}" data-diff="easy">Kolay</button>
                    <button class="btn btn-sm ${difficulty === 'normal' ? 'btn-primary' : 'btn-outline'}" data-diff="normal">Normal</button>
                    <button class="btn btn-sm ${difficulty === 'challenge' ? 'btn-primary' : 'btn-outline'}" data-diff="challenge">Zorlayici</button>
                </div>
            </div>
        </div>

        <div class="recommendations-list stagger">
            ${recommendations.map((rec, i) => `
                <a href="#/sinif/${grade}/unite/${rec.unitId.replace('U', '')}/bolum/${rec.chapterId}"
                   class="recommendation-card card card-interactive anim-fade-in-up"
                   style="display:flex; align-items:center; gap:1rem; padding:1rem; margin-bottom:0.75rem; text-decoration:none;">
                    <div class="rec-icon" style="
                        width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;
                        background: ${rec.type === 'incomplete' ? (gradeInfo?.gradient || 'var(--primary)') : rec.type === 'review' ? 'linear-gradient(135deg, #feca57, #ff9f43)' : 'linear-gradient(135deg, #ff6348, #eb4d4b)'};">
                        ${rec.type === 'incomplete' ? '&#128218;' : rec.type === 'review' ? '&#128260;' : '&#9888;'}
                    </div>
                    <div class="rec-info" style="flex:1; min-width:0;">
                        <div style="font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${rec.title}</div>
                        <div class="text-muted" style="font-size:0.85rem;">${rec.unitTitle}</div>
                    </div>
                    <div class="rec-meta" style="text-align:right; flex-shrink:0;">
                        <span class="badge ${rec.type === 'weak' ? 'badge-warning' : rec.type === 'review' ? 'badge-info' : 'badge-success'}" style="font-size:0.75rem;">
                            ${rec.reason}
                        </span>
                        ${rec.mastery > 0 ? `<div class="text-muted" style="font-size:0.75rem; margin-top:4px;">Ustalik: %${rec.mastery}</div>` : ''}
                    </div>
                    <span style="color:var(--text-muted);">&#8594;</span>
                </a>
            `).join('')}
        </div>

        <div class="path-summary card anim-fade-in-up mt-lg" style="padding:1.5rem;">
            <h3>&#128200; Genel Durum</h3>
            <div class="path-stats mt-md" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:1rem;">
                ${essentials.units.map(u => {
                    const unitChapters = essentials.chapters.filter(c => c.unite_id === u.unite_id);
                    const mastery = getUnitMasteryScore(u.unite_id, unitChapters);
                    const progress = store.getUnitProgress(grade, u.unite_id);
                    return `
                        <div style="text-align:center;">
                            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:4px;">${(u.baslik || '').substring(0, 20)}${(u.baslik || '').length > 20 ? '...' : ''}</div>
                            <div class="progress-bar" style="height:6px; margin-bottom:4px;">
                                <div class="fill" style="width:${progress.percent}%; background:${mastery >= 70 ? 'var(--success)' : mastery >= 40 ? 'var(--warning)' : 'var(--primary)'};"></div>
                            </div>
                            <div style="font-size:0.75rem; color:var(--text-muted);">%${progress.percent} tamamlandi</div>
                        </div>`;
                }).join('')}
            </div>
        </div>`;

    // Zorluk buton olaylari
    container.querySelectorAll('.difficulty-btns .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            store.setDifficulty(btn.dataset.diff);
            container.querySelectorAll('.difficulty-btns .btn').forEach(b => {
                b.classList.toggle('btn-primary', b.dataset.diff === btn.dataset.diff);
                b.classList.toggle('btn-outline', b.dataset.diff !== btn.dataset.diff);
            });
        });
    });
}
