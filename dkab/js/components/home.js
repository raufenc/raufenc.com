// ===== DKAB Akademi - Ana Sayfa (Dashboard) =====

import { store, BADGES, XP_PER_LEVEL } from '../store.js?v=10';
import { getGradeInfo } from '../data-loader.js?v=10';
import { getDailyMessage, getStreakMessage, getComebackMessage } from '../messages.js?v=10';

// Gunluk icerik: deterministik (yilin gunune gore)
let _gunlukIcerik = null;
async function getGunlukIcerik() {
    if (_gunlukIcerik) return _gunlukIcerik;
    try {
        const res = await fetch('data/shared/gunluk_icerik.json');
        const data = await res.json();
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        _gunlukIcerik = data.icerikler[dayOfYear % data.icerikler.length];
    } catch {
        _gunlukIcerik = null;
    }
    return _gunlukIcerik;
}

// Hicri takvim: mevcut aya yakin ozel gun varsa banner dondurur
let _takvimBanner = undefined;
async function getTakvimBanner(grade) {
    if (_takvimBanner !== undefined) return _takvimBanner;
    try {
        const res = await fetch('data/shared/takvim.json');
        const data = await res.json();
        const currentMonth = new Date().getMonth() + 1; // 1-12
        // Find a Hicri month that approximates current Gregorian month (±1)
        const match = data.aylar.find(a =>
            Math.abs(a.approximate_gregorian_month - currentMonth) <= 1
        );
        if (match) {
            const relevant = match.one_cikar.find(o =>
                !o.siniflar || o.siniflar.includes(grade)
            );
            if (relevant) {
                _takvimBanner = { ay: match, konu: relevant };
            } else {
                _takvimBanner = null;
            }
        } else {
            _takvimBanner = null;
        }
    } catch {
        _takvimBanner = null;
    }
    return _takvimBanner;
}

export async function renderHome(el, app) {
    const user = store.user;
    const stats = store.stats;
    const grade = user.grade;
    const gradeInfo = getGradeInfo(grade);
    const gradeProgress = store.getGradeProgress(grade);
    const xpCurrent = store.getXpForCurrentLevel();
    const xpPercent = Math.round((xpCurrent / XP_PER_LEVEL) * 100);

    // Get earned badges
    const earnedBadges = stats.badges.map(id => BADGES[id]).filter(Boolean);

    // Quiz accuracy
    const accuracy = stats.totalAnswers > 0
        ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100)
        : 0;

    // Load daily content + Islamic calendar banner in parallel
    const [gunluk, takvimBanner] = await Promise.all([
        getGunlukIcerik(),
        getTakvimBanner(grade)
    ]);

    el.innerHTML = `
        <div class="content-area">
            <!-- Welcome Banner -->
            <div class="welcome-banner anim-fade-in-up" style="background: ${gradeInfo?.gradient || 'var(--gradient-hero)'};">
                <div class="welcome-text">
                    <h1 class="font-display" style="color: white; font-size: 1.8rem;">
                        Selam, ${user.name}! &#128075;
                    </h1>
                    <p style="color: rgba(255,255,255,0.85); margin-top: 0.5rem;">
                        ${getMotivation(stats)}
                    </p>
                </div>
                <div class="welcome-stats">
                    <div class="welcome-stat">
                        <span class="welcome-stat-icon">&#128293;</span>
                        <span class="welcome-stat-value">${stats.streak}</span>
                        <span class="welcome-stat-label">gun seri</span>
                    </div>
                    <div class="welcome-stat">
                        <span class="welcome-stat-icon">&#9889;</span>
                        <span class="welcome-stat-value">${stats.totalXp}</span>
                        <span class="welcome-stat-label">toplam XP</span>
                    </div>
                    <div class="welcome-stat">
                        <span class="welcome-stat-icon">&#127942;</span>
                        <span class="welcome-stat-value">${stats.level}</span>
                        <span class="welcome-stat-label">seviye</span>
                    </div>
                </div>
            </div>

            <!-- Gunluk Icerik -->
            ${gunluk ? `
            <div class="gunluk-kart card anim-fade-in-up mt-lg" style="background: linear-gradient(135deg, #f8f0e3, #fff8ee); border-left: 4px solid #c8a96e;">
                <div class="gunluk-kart-ust">
                    <span class="gunluk-etiket ${gunluk.kategori === 'ayet' ? 'ayet' : gunluk.kategori === 'hadis' ? 'hadis' : 'dua'}">
                        ${gunluk.kategori === 'ayet' ? '&#128214; Ayet-i Kerime' : gunluk.kategori === 'hadis' ? '&#128218; Hadis-i Şerif' : '&#128591; Dua'}
                    </span>
                    <span class="text-muted" style="font-size:0.8rem;">Gunun Ogutü</span>
                </div>
                <p class="gunluk-metin font-display" style="font-size:1.05rem; line-height:1.7; color:#3d2b1f; margin: 0.75rem 0;">
                    "${gunluk.metin}"
                </p>
                ${gunluk.tercume ? `<p class="text-muted" style="font-size:0.85rem; font-style:italic; margin-bottom:0.5rem;">${gunluk.tercume}</p>` : ''}
                <p class="text-muted" style="font-size:0.8rem; margin:0;">— ${gunluk.kaynak}</p>
            </div>
            ` : ''}

            <!-- Hicri Takvim Banneri -->
            ${takvimBanner ? `
            <a href="#/sinif/${grade}" class="takvim-banner card anim-fade-in-up mt-lg" style="display:flex; align-items:center; gap:1rem; padding: 1rem 1.25rem; background: linear-gradient(135deg, ${takvimBanner.ay.renk}22, ${takvimBanner.ay.renk}11); border-left: 4px solid ${takvimBanner.ay.renk}; text-decoration:none; color:inherit;">
                <span style="font-size:2rem;">${takvimBanner.ay.ikon}</span>
                <div style="flex:1; min-width:0;">
                    <div style="font-size:0.75rem; font-weight:600; color:${takvimBanner.ay.renk}; text-transform:uppercase; letter-spacing:0.05em;">${takvimBanner.ay.ad} Ayi</div>
                    <div style="font-weight:600; margin-top:0.15rem;">${takvimBanner.konu.konu}</div>
                    <div class="text-muted" style="font-size:0.8rem; margin-top:0.15rem;">${takvimBanner.konu.aciklama}</div>
                </div>
                <span style="color:${takvimBanner.ay.renk};">&#8594;</span>
            </a>
            ` : ''}

            <!-- OYNA Karti -->
            <a href="#/sinif/${grade}" class="oyna-kart anim-fade-in-up mt-xl" style="
                display:flex; align-items:center; gap:1.25rem; padding:1.5rem 1.75rem;
                background: linear-gradient(135deg, #6C63FF 0%, #ff6584 100%);
                border-radius:20px; text-decoration:none; color:white;
                box-shadow: 0 8px 32px rgba(108,99,255,0.35);
                transition: transform 0.15s, box-shadow 0.15s;
                cursor:pointer;"
                onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 12px 40px rgba(108,99,255,0.45)';"
                onmouseout="this.style.transform='';this.style.boxShadow='0 8px 32px rgba(108,99,255,0.35)';"
                ontouchstart="this.style.transform='scale(0.97)';"
                ontouchend="this.style.transform='';">
                <div style="font-size:3.5rem; line-height:1; flex-shrink:0; filter:drop-shadow(0 2px 6px rgba(0,0,0,0.2));">&#127918;</div>
                <div style="flex:1; min-width:0;">
                    <div style="font-size:1.4rem; font-weight:800; letter-spacing:-0.02em;">Hemen Oyna! &#9889;</div>
                    <div style="opacity:0.88; font-size:0.9rem; margin-top:0.25rem;">
                        ${gradeProgress.percent > 0
                            ? `${gradeProgress.percent}% tamamladin — devam et!`
                            : 'Derslerinde oyunlar, quizler, egzersizler seni bekliyor!'}
                    </div>
                </div>
                <div style="font-size:2rem; flex-shrink:0; opacity:0.9;">&#8594;</div>
            </a>

            <!-- Quick Actions -->
            <div class="quick-actions mt-xl stagger">
                <a href="#/yolum" class="quick-action-card anim-fade-in-up card card-interactive">
                    <div class="quick-action-icon" style="background: linear-gradient(135deg, #6C63FF, #48C6EF);">&#128269;</div>
                    <div class="quick-action-info">
                        <h3>Ogrenme Yolum</h3>
                        <p class="text-muted">Sana ozel ders onerileri</p>
                    </div>
                    <span class="quick-action-arrow">&#8594;</span>
                </a>

                <a href="#/sinif/${grade}" class="quick-action-card anim-fade-in-up card card-interactive">
                    <div class="quick-action-icon" style="background: ${gradeInfo?.gradient};">&#128218;</div>
                    <div class="quick-action-info">
                        <h3>Derslerime Git</h3>
                        <p class="text-muted">${grade}. Sinif - ${gradeProgress.total > 0 ? `${gradeProgress.percent}% tamamlandi` : 'Baslamaya hazir'}</p>
                    </div>
                    <span class="quick-action-arrow">&#8594;</span>
                </a>

                <a href="#/hedefler" class="quick-action-card anim-fade-in-up card card-interactive">
                    <div class="quick-action-icon" style="background: linear-gradient(135deg, #feca57, #ff9f43);">&#127919;</div>
                    <div class="quick-action-info">
                        <h3>Hedeflerim</h3>
                        <p class="text-muted">${store.state.goals.active.length > 0 ? `${store.state.goals.active.length} aktif hedef` : 'Hedef koy, basla!'}</p>
                    </div>
                    <span class="quick-action-arrow">&#8594;</span>
                </a>

                <a href="#/aliskanliklar" class="quick-action-card anim-fade-in-up card card-interactive">
                    <div class="quick-action-icon" style="background: linear-gradient(135deg, #1dd1a1, #10ac84);">&#128197;</div>
                    <div class="quick-action-info">
                        <h3>Aliskanlik Takibi</h3>
                        <p class="text-muted">${store.getTotalDaysActive()} gun aktif</p>
                    </div>
                    <span class="quick-action-arrow">&#8594;</span>
                </a>
            </div>

            <!-- Stats Grid -->
            <div class="home-stats-grid mt-xl">
                <div class="home-stat-card card anim-fade-in-up">
                    <div class="home-stat-header">
                        <span>Seviye Ilerlemesi</span>
                        <span class="level-badge">${stats.level}</span>
                    </div>
                    <div class="progress-bar accent mt-sm" style="height: 10px;">
                        <div class="fill" style="width: ${xpPercent}%;"></div>
                    </div>
                    <div class="home-stat-footer text-muted mt-sm">
                        ${xpCurrent} / ${XP_PER_LEVEL} XP
                    </div>
                </div>

                <div class="home-stat-card card anim-fade-in-up">
                    <div class="home-stat-header">
                        <span>Quiz Basarisi</span>
                        <span class="badge ${accuracy >= 70 ? 'badge-success' : accuracy >= 40 ? 'badge-warning' : 'badge-info'}">${accuracy}%</span>
                    </div>
                    <div class="home-stat-detail text-muted mt-sm">
                        ${stats.correctAnswers} / ${stats.totalAnswers} dogru cevap
                    </div>
                    <div class="home-stat-detail text-muted">
                        ${stats.totalQuizzes} quiz tamamlandi
                    </div>
                </div>
            </div>

            <!-- Badges -->
            ${earnedBadges.length > 0 ? `
            <div class="home-badges mt-xl anim-fade-in-up">
                <div class="flex justify-between items-center mb-md">
                    <h3>Rozetlerim</h3>
                    <span class="text-muted">${earnedBadges.length} / ${Object.keys(BADGES).length}</span>
                </div>
                <div class="badges-grid">
                    ${earnedBadges.map(b => `
                        <div class="badge-item" title="${b.desc}">
                            <span class="badge-icon">${b.icon}</span>
                            <span class="badge-name">${b.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : `
            <div class="home-badges-empty mt-xl card anim-fade-in-up text-center" style="padding: 2rem;">
                <span style="font-size: 3rem;">&#127942;</span>
                <h3 class="mt-md">Henuz rozet kazanmadin</h3>
                <p class="text-muted mt-sm">Derslerini tamamlayarak rozetler kazanabilirsin!</p>
            </div>
            `}
        </div>`;
}

function getMotivation(stats) {
    // Inaktiflik kontrolu
    if (stats.lastActiveDate) {
        const last = new Date(stats.lastActiveDate + 'T00:00:00');
        const daysSince = Math.floor((new Date() - last) / (1000 * 60 * 60 * 24));
        const comebackMsg = getComebackMessage(daysSince);
        if (comebackMsg) return comebackMsg;
    }

    // Seri mesaji
    if (stats.streak > 0) return getStreakMessage(stats.streak);

    // Genel motivasyon
    return getDailyMessage();
}
