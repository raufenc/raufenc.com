// ===== DKAB Akademi - 360° Hedefler ve Oz Dusunme =====

import { store } from '../store.js?v=14';

const REFLECTION_PROMPTS = [
    'Bu hafta ogrendigin en onemli kavram neydi?',
    'Ogrendiklerinden hayatina ne katabilirsin?',
    'En cok hangi konuda zorlandin? Neden?',
    'Bu haftaki derslerden en cok nesi hosuna gitti?',
    'Ogrendiklerini baskasina anlatsan nasil anlatirdin?',
    'Hangi konuyu daha derinlemesine ogrenmek istersin?',
    'Bu hafta yaptigin en iyi sey neydi?',
    'Ogrendiklerini gunluk hayatinda nasil uyguladin?'
];

export function renderGoals(el, app) {
    const user = store.user;
    if (!user) {
        window.location.hash = '#/sinif-sec';
        return;
    }

    const goals = store.state.goals;
    const activeGoals = goals.active || [];
    const completedGoals = (goals.completed || []).slice(-10).reverse();
    const reflections = (goals.reflections || []).slice(-5).reverse();

    // Haftanin dusunme sorusu
    const weekOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    const weekPrompt = REFLECTION_PROMPTS[weekOfYear % REFLECTION_PROMPTS.length];

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <h1 class="font-display">&#127919; Hedeflerim</h1>
                <p class="text-muted">Hedef koy, calis, dusun, gelis!</p>
            </div>

            <!-- Yeni Hedef Ekleme -->
            <div class="card anim-fade-in-up mt-lg" style="padding:1.5rem;">
                <h3>Yeni Hedef Ekle</h3>
                <div class="mt-md" style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                    <input type="text" id="goal-text" placeholder="Ornegin: Bu hafta 3 bolum tamamlayacagim"
                        style="flex:1; min-width:200px; padding:0.75rem; border:1px solid var(--border); border-radius:8px; font-size:0.95rem;">
                    <button class="btn btn-primary" id="add-goal">Ekle</button>
                </div>
            </div>

            <!-- Aktif Hedefler -->
            <div class="mt-xl anim-fade-in-up">
                <h3>&#9989; Aktif Hedefler</h3>
                ${activeGoals.length === 0 ? `
                    <div class="card mt-md text-center" style="padding:2rem;">
                        <p class="text-muted">Henuz hedef koymadin. Yukardaki alandan bir hedef ekle!</p>
                    </div>
                ` : `
                    <div class="goals-list mt-md" style="display:flex; flex-direction:column; gap:0.75rem;">
                        ${activeGoals.map(g => `
                            <div class="card card-interactive" style="padding:1rem; display:flex; align-items:center; gap:1rem;">
                                <button class="goal-complete-btn" data-id="${g.id}" style="
                                    width:28px; height:28px; border-radius:50%; border:2px solid var(--primary);
                                    background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                </button>
                                <div style="flex:1;">
                                    <div style="font-weight:500;">${escapeHtml(g.text)}</div>
                                    <div class="text-muted" style="font-size:0.8rem;">${formatDate(g.createdAt)}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>

            <!-- Haftalik Dusunme -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem; background: linear-gradient(135deg, rgba(108,99,255,0.05), rgba(72,198,239,0.05));">
                <h3>&#128173; Haftalik Dusunme</h3>
                <p class="mt-sm" style="font-style:italic; color:var(--primary);">"${weekPrompt}"</p>
                <textarea id="reflection-text" placeholder="Dusuncelerini yaz..."
                    style="width:100%; min-height:80px; padding:0.75rem; border:1px solid var(--border); border-radius:8px; font-size:0.95rem; margin-top:1rem; resize:vertical;"></textarea>
                <button class="btn btn-outline mt-sm" id="save-reflection">Kaydet</button>
            </div>

            <!-- Tamamlanan Hedefler -->
            ${completedGoals.length > 0 ? `
                <div class="mt-xl anim-fade-in-up">
                    <h3>&#127942; Tamamlanan Hedefler</h3>
                    <div class="mt-md" style="display:flex; flex-direction:column; gap:0.5rem;">
                        ${completedGoals.map(g => `
                            <div style="padding:0.75rem 1rem; border-radius:8px; background:var(--bg-secondary); display:flex; align-items:center; gap:0.75rem;">
                                <span style="color:var(--success); font-size:1.2rem;">&#10003;</span>
                                <div style="flex:1;">
                                    <div style="text-decoration:line-through; color:var(--text-muted);">${escapeHtml(g.text)}</div>
                                </div>
                                <span class="text-muted" style="font-size:0.75rem;">${formatDate(g.completedAt)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Gecmis Dusunmeler -->
            ${reflections.length > 0 ? `
                <div class="mt-xl anim-fade-in-up">
                    <h3>&#128221; Gecmis Dusunmelerim</h3>
                    <div class="mt-md" style="display:flex; flex-direction:column; gap:0.75rem;">
                        ${reflections.map(r => `
                            <div class="card" style="padding:1rem;">
                                <p style="font-style:italic;">"${escapeHtml(r.text)}"</p>
                                <p class="text-muted" style="font-size:0.75rem; margin-top:0.5rem;">${formatDate(r.date)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>`;

    // Olay dinleyicileri
    el.querySelector('#add-goal')?.addEventListener('click', () => {
        const input = el.querySelector('#goal-text');
        const text = input.value.trim();
        if (text) {
            store.addGoal(text);
            input.value = '';
            renderGoals(el, app);
        }
    });

    el.querySelector('#goal-text')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') el.querySelector('#add-goal').click();
    });

    el.querySelector('#save-reflection')?.addEventListener('click', () => {
        const textarea = el.querySelector('#reflection-text');
        const text = textarea.value.trim();
        if (text) {
            store.addReflection(text);
            textarea.value = '';
            renderGoals(el, app);
        }
    });

    el.querySelectorAll('.goal-complete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            store.completeGoal(btn.dataset.id);
            store.addXp(25); // Hedef tamamlama bonusu
            renderGoals(el, app);
        });
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
}
