// ===== DKAB Akademi - Sinif Secim Ekrani =====

import { store } from '../store.js?v=6';
import { getAllGrades } from '../data-loader.js?v=6';

const AVATARS = [
    { id: 'star', icon: '&#11088;', name: 'Yildiz' },
    { id: 'moon', icon: '&#127769;', name: 'Ay' },
    { id: 'book', icon: '&#128218;', name: 'Kitap' },
    { id: 'rocket', icon: '&#128640;', name: 'Roket' },
    { id: 'flower', icon: '&#127804;', name: 'Cicek' },
    { id: 'sun', icon: '&#127774;', name: 'Gunes' },
    { id: 'heart', icon: '&#128155;', name: 'Kalp' },
    { id: 'gem', icon: '&#128142;', name: 'Elmas' }
];

export function renderClassSelector(el, app) {
    const grades = getAllGrades();
    const existingUser = store.user;

    el.innerHTML = `
        <div class="content-area">
            <div class="selector-container anim-fade-in-up">
                <!-- Step 1: Name & Avatar -->
                <div id="step-profile" class="selector-step">
                    <div class="selector-header">
                        <h1 class="font-display" style="font-size: 2rem; color: var(--primary);">
                            &#128075; Hos Geldin!
                        </h1>
                        <p class="text-muted mt-sm">Seni taniyal&#305;m</p>
                    </div>

                    <div class="form-group mt-xl">
                        <label class="form-label">Adin ne?</label>
                        <input type="text" id="input-name" class="form-input" placeholder="Adini yaz..."
                               value="${existingUser?.name || ''}" maxlength="20" autocomplete="off">
                    </div>

                    <div class="form-group mt-lg">
                        <label class="form-label">Bir avatar sec</label>
                        <div class="avatar-grid">
                            ${AVATARS.map(a => `
                                <button class="avatar-option ${existingUser?.avatar === a.id ? 'selected' : ''}"
                                        data-avatar="${a.id}" title="${a.name}">
                                    ${a.icon}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <button class="btn btn-primary btn-lg w-full mt-xl" id="btn-next-step">
                        Devam Et &#8594;
                    </button>
                </div>

                <!-- Step 2: Grade Selection -->
                <div id="step-grade" class="selector-step hidden">
                    <div class="selector-header">
                        <h1 class="font-display" style="font-size: 2rem; color: var(--primary);">
                            &#128218; Sinifini Sec
                        </h1>
                        <p class="text-muted mt-sm">Hangi sinifin derslerine calisacaksin?</p>
                    </div>

                    <div class="grade-select-grid mt-xl stagger">
                        ${grades.map(g => `
                            <button class="grade-select-card anim-scale-in" data-grade="${g.grade}"
                                    style="background: ${g.gradient};">
                                <span class="grade-select-num">${g.grade}</span>
                                <span class="grade-select-label">Sinif</span>
                            </button>
                        `).join('')}
                    </div>

                    <button class="btn btn-secondary btn-sm mt-lg" id="btn-back-step">
                        &#8592; Geri
                    </button>
                </div>
            </div>
        </div>`;

    // Bind events
    const nameInput = el.querySelector('#input-name');
    const avatarBtns = el.querySelectorAll('.avatar-option');
    const nextBtn = el.querySelector('#btn-next-step');
    const backBtn = el.querySelector('#btn-back-step');
    const gradeBtns = el.querySelectorAll('.grade-select-card');
    const stepProfile = el.querySelector('#step-profile');
    const stepGrade = el.querySelector('#step-grade');

    let selectedAvatar = existingUser?.avatar || null;

    // Avatar selection
    avatarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedAvatar = btn.dataset.avatar;
        });
    });

    // Auto-select first avatar if none
    if (!selectedAvatar) {
        avatarBtns[0]?.click();
    }

    // Next step
    nextBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) {
            nameInput.style.borderColor = 'var(--error)';
            nameInput.focus();
            return;
        }
        stepProfile.classList.add('hidden');
        stepGrade.classList.remove('hidden');
        stepGrade.classList.add('anim-fade-in-up');
    });

    // Enter key on name input
    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') nextBtn.click();
        nameInput.style.borderColor = '';
    });

    // Back
    backBtn.addEventListener('click', () => {
        stepGrade.classList.add('hidden');
        stepProfile.classList.remove('hidden');
    });

    // Grade selection
    gradeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const grade = parseInt(btn.dataset.grade);
            const name = nameInput.value.trim();
            store.createUser(name, grade, selectedAvatar);
            store.updateStreak();
            app.navigate(`#/sinif/${grade}`);
        });
    });

    // Focus name input
    setTimeout(() => nameInput.focus(), 100);
}
