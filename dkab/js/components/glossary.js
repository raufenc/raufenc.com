// ===== DKAB Akademi - Sozluk =====

import { getGradeInfo } from '../data-loader.js?v=10';
import { store } from '../store.js?v=10';

export function renderGlossary(el, grade, glossary, app) {
    // Rozet kontrolu: 50+ terim goruntuleme
    if (glossary.length >= 50) {
        store.awardBadge('vocab_50');
    }
    const gradeInfo = getGradeInfo(grade);
    let filteredTerms = [...glossary];
    let searchQuery = '';
    let activeUnit = 'ALL';

    // Get unique units
    const units = ['ALL', ...new Set(glossary.map(t => t.unite_id).filter(Boolean))];

    function render() {
        let terms = filteredTerms;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            terms = terms.filter(t => t.terim.toLowerCase().includes(q) || t.tanim.toLowerCase().includes(q));
        }
        if (activeUnit !== 'ALL') {
            terms = terms.filter(t => t.unite_id === activeUnit);
        }

        // Sort alphabetically
        terms.sort((a, b) => a.terim.localeCompare(b.terim, 'tr'));

        el.innerHTML = `
            <div class="content-area">
                <div class="glossary-header anim-fade-in-up">
                    <div class="flex items-center gap-md">
                        <button class="btn-icon" onclick="history.back()" style="color:var(--text-secondary);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        <div>
                            <h2 class="font-display">&#128214; Sozluk</h2>
                            <p class="text-muted" style="font-size:0.85rem;">${grade}. Sinif - ${glossary.length} terim</p>
                        </div>
                    </div>

                    <div class="glossary-search mt-lg">
                        <input type="text" class="form-input" placeholder="Terim ara..." id="glossary-search"
                               value="${searchQuery}" autocomplete="off">
                    </div>

                    <div class="glossary-filters mt-md flex gap-sm flex-wrap">
                        ${units.map(u => `
                            <button class="badge ${u === activeUnit ? 'badge-success' : ''}" data-unit="${u}" style="cursor:pointer;">
                                ${u === 'ALL' ? 'Tumunu Goster' : u === 'GENEL' ? 'Genel' : u.replace('U','') + '. Unite'}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="glossary-list mt-lg stagger">
                    ${terms.length > 0 ? terms.map(t => `
                        <div class="glossary-item card anim-fade-in-up">
                            <div class="glossary-term font-display">${t.terim}</div>
                            <div class="glossary-def text-muted">${t.tanim}</div>
                            ${t.sayfa ? `<span class="badge badge-info" style="font-size:0.7rem;">s. ${t.sayfa}</span>` : ''}
                        </div>
                    `).join('') : `
                        <div class="text-center text-muted mt-xl">
                            <span style="font-size:2rem;">&#128269;</span>
                            <p class="mt-md">Sonuc bulunamadi.</p>
                        </div>
                    `}
                </div>
            </div>`;

        // Bind search
        el.querySelector('#glossary-search')?.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            render();
        });

        // Bind unit filters
        el.querySelectorAll('[data-unit]').forEach(btn => {
            btn.addEventListener('click', () => {
                activeUnit = btn.dataset.unit;
                render();
            });
        });
    }

    render();
}
