// ===== DKAB Akademi - Unite Listesi (Duolingo tarzi yol haritasi) =====

import { store } from '../store.js?v=9';
import { getGradeInfo } from '../data-loader.js?v=9';

export function renderUnitList(el, grade, data, app, focusUnitId) {
    const { units, chapters, bookMap } = data;
    const gradeInfo = getGradeInfo(grade);

    // Group chapters by unit
    const unitChapters = {};
    if (chapters) {
        chapters.forEach(ch => {
            if (!unitChapters[ch.unite_id]) unitChapters[ch.unite_id] = [];
            unitChapters[ch.unite_id].push(ch);
        });
    }

    el.innerHTML = `
        <div class="content-area">
            <!-- Grade Header -->
            <div class="grade-header anim-fade-in-up" style="background: ${gradeInfo?.gradient || 'var(--gradient-hero)'};">
                <button class="btn-icon" onclick="history.back()" style="color:white; background:rgba(255,255,255,0.15);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div>
                    <h1 style="color:white; font-size:1.6rem;" class="font-display">${grade}. Sinif</h1>
                    <p style="color:rgba(255,255,255,0.8); font-size:0.85rem;">Din Kulturu ve Ahlak Bilgisi</p>
                </div>
                <div class="grade-header-stats" style="margin-left:auto;">
                    ${renderGradeStats(grade)}
                </div>
            </div>

            <!-- Unit Path (Duolingo style) -->
            <div class="unit-path mt-xl">
                ${units ? units.map((unit, idx) => {
                    const uChapters = unitChapters[unit.unite_id] || [];
                    const progress = store.getUnitProgress(grade, unit.unite_id);
                    const isExpanded = focusUnitId === unit.unite_id || (!focusUnitId && idx === 0);

                    return renderUnitNode(grade, unit, uChapters, progress, idx, isExpanded);
                }).join('') : '<p class="text-center text-muted">Icerik yuklenemedi.</p>'}
            </div>
        </div>`;

    // Bind unit expand/collapse
    el.querySelectorAll('.unit-node-header').forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = !body.classList.contains('hidden');
            // Close all
            el.querySelectorAll('.unit-node-body').forEach(b => b.classList.add('hidden'));
            el.querySelectorAll('.unit-node-header').forEach(h => h.classList.remove('expanded'));
            // Toggle this one
            if (!isOpen) {
                body.classList.remove('hidden');
                body.classList.add('anim-fade-in-up');
                header.classList.add('expanded');
            }
        });
    });
}

function renderGradeStats(grade) {
    const progress = store.getGradeProgress(grade);
    if (progress.total === 0) return '';

    return `
        <div style="text-align:right; color:white;">
            <div style="font-weight:700; font-size:1.2rem;">${progress.percent}%</div>
            <div style="font-size:0.75rem; opacity:0.8;">${progress.completed}/${progress.total}</div>
        </div>`;
}

function renderUnitNode(grade, unit, chapters, progress, idx, isExpanded) {
    const unitColors = [
        { bg: '#e8f5e9', border: '#4CAF50', icon: '&#127807;' },
        { bg: '#e3f2fd', border: '#2196F3', icon: '&#127775;' },
        { bg: '#fff3e0', border: '#FF9800', icon: '&#128293;' },
        { bg: '#fce4ec', border: '#E91E63', icon: '&#127801;' },
        { bg: '#f3e5f5', border: '#9C27B0', icon: '&#128142;' }
    ];

    const color = unitColors[idx % unitColors.length];
    const isComplete = progress.percent === 100;

    return `
        <div class="unit-node anim-fade-in-up" style="animation-delay: ${idx * 0.1}s;">
            <!-- Unit Header (clickable) -->
            <div class="unit-node-header ${isExpanded ? 'expanded' : ''}"
                 style="--unit-color: ${color.border};">
                <div class="unit-node-badge" style="background: ${color.bg}; border-color: ${color.border};">
                    ${isComplete ? '&#10004;' : color.icon}
                </div>
                <div class="unit-node-info">
                    <div class="unit-node-number text-muted">${unit.no}. Unite</div>
                    <h3 class="unit-node-title">${unit.baslik}</h3>
                    <div class="progress-bar mt-sm" style="height: 5px;">
                        <div class="fill" style="width: ${progress.percent}%; background: ${color.border};"></div>
                    </div>
                </div>
                <div class="unit-node-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
            </div>

            <!-- Chapters (expandable) -->
            <div class="unit-node-body ${isExpanded ? '' : 'hidden'}">
                <div class="chapter-list stagger">
                    ${chapters.map((ch, ci) => {
                        const prevDone = ci === 0 ? true : !!store.getProgress(grade, unit.unite_id, chapters[ci - 1].bolum_id)?.completed;
                        return renderChapterItem(grade, unit.unite_id, ch, ci, color, prevDone);
                    }).join('')}
                </div>
                ${unit.dua_sure ? `
                    <div class="unit-dua-hint text-muted mt-md" style="font-size:0.8rem; padding-left: 3rem;">
                        &#128588; Bu unitenin duasi: ${unit.dua_sure}
                    </div>
                ` : ''}
            </div>
        </div>`;
}

function renderChapterItem(grade, unitId, chapter, index, color, prevCompleted) {
    const progress = store.getProgress(grade, unitId, chapter.bolum_id);
    const isCompleted = progress?.completed;
    const stars = progress?.stars || 0;

    const typeIcons = {
        giris: '&#128161;',
        kavram: '&#128218;',
        dua: '&#128588;',
        sure: '&#128216;',
        degerlendirme: '&#127919;',
        performans: '&#127941;'
    };

    const icon = typeIcons[chapter.tur] || '&#128218;';

    // Kilit sistemi: ilk bolum acik, sonrakiler oncekinin tamamlanmasina bagli
    const isLocked = index > 0 && !prevCompleted;

    if (isLocked) {
        return `
            <div class="chapter-item anim-fade-in-up locked" style="opacity:0.5; pointer-events:none; filter:grayscale(0.5);">
                <div class="chapter-item-icon" style="background:#eee; color:#bbb;">
                    &#128274;
                </div>
                <div class="chapter-item-info">
                    <div class="chapter-item-title" style="color:var(--text-muted);">${chapter.baslik}</div>
                    <div class="chapter-item-meta text-muted">
                        <span class="badge badge-secondary" style="font-size:0.7rem;">&#128274; Kilitli</span>
                    </div>
                </div>
            </div>`;
    }

    return `
        <a href="#/sinif/${grade}/unite/${unitId.replace('U', '')}/bolum/${chapter.bolum_id}"
           class="chapter-item anim-fade-in-up ${isCompleted ? 'completed' : ''}"
           ${!isCompleted && index > 0 && prevCompleted ? 'data-just-unlocked="true"' : ''}>
            <div class="chapter-item-icon" style="background: ${isCompleted ? color.bg : '#f5f5f5'}; color: ${isCompleted ? color.border : '#999'};">
                ${isCompleted ? '&#10004;' : icon}
            </div>
            <div class="chapter-item-info">
                <div class="chapter-item-title">${chapter.baslik}</div>
                <div class="chapter-item-meta text-muted">
                    <span class="badge ${getBadgeClass(chapter.tur)}" style="font-size:0.7rem;">${getTypeLabel(chapter.tur)}</span>
                    ${isCompleted && stars > 0 ? `
                        <span class="stars" style="font-size:0.7rem;">
                            ${'&#11088;'.repeat(stars)}${'&#9734;'.repeat(3 - stars)}
                        </span>
                    ` : ''}
                </div>
            </div>
            ${isCompleted ? `<span class="chapter-item-xp text-muted">+${progress.xp} XP</span>` : ''}
        </a>`;
}

function getTypeLabel(tur) {
    const labels = {
        giris: 'Giris',
        kavram: 'Kavram',
        dua: 'Dua',
        sure: 'Sure',
        degerlendirme: 'Degerlendirme',
        performans: 'Performans'
    };
    return labels[tur] || tur;
}

function getBadgeClass(tur) {
    const classes = {
        giris: 'badge-info',
        kavram: 'badge-success',
        dua: 'badge-gold',
        sure: 'badge-gold',
        degerlendirme: 'badge-accent',
        performans: 'badge-warning'
    };
    return classes[tur] || 'badge-info';
}
