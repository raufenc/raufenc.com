// ===== DKAB Akademi - Faz 4: Davranis Takibi (Kirkpatrick L3) =====
// Ogrencinin ogrendiklerini gunluk hayata yansitma olcumu

import { store } from '../store.js?v=9';

// DKAB mufredatina uygun davranis kategorileri
const BEHAVIOR_CATEGORIES = [
    {
        id: 'ibadet',
        baslik: 'Ibadet ve Kulluk',
        ikon: '&#128591;',
        renk: '#1a5276',
        davranislar: [
            { id: 'namaz', metin: 'Namaz kildim', puan: 10 },
            { id: 'dua', metin: 'Dua ettim', puan: 5 },
            { id: 'kuran', metin: 'Kur\'an-i Kerim okudum', puan: 10 },
            { id: 'zikir', metin: 'Zikir ve tesbih cektim', puan: 5 }
        ]
    },
    {
        id: 'ahlak',
        baslik: 'Guzel Ahlak',
        ikon: '&#128153;',
        renk: '#196f3d',
        davranislar: [
            { id: 'selam', metin: 'Selamlasmaya dikkat ettim', puan: 5 },
            { id: 'yardim', metin: 'Birine yardim ettim', puan: 10 },
            { id: 'sabir', metin: 'Sabirli davrandim', puan: 8 },
            { id: 'sukur', metin: 'Nimetlere sukrettim', puan: 5 },
            { id: 'dogru', metin: 'Dogruyu soyledim (zor olsa da)', puan: 10 }
        ]
    },
    {
        id: 'sosyal',
        baslik: 'Sosyal Sorumluluk',
        ikon: '&#129309;',
        renk: '#6c3483',
        davranislar: [
            { id: 'paylasma', metin: 'Birisiyle bir seyimi paylaştim', puan: 8 },
            { id: 'cevre', metin: 'Cevreme duyarli davrandim', puan: 8 },
            { id: 'saygi', metin: 'Buyuklere saygi gosterdim', puan: 5 },
            { id: 'hak', metin: 'Basklarinin haklarina dikkat ettim', puan: 8 }
        ]
    },
    {
        id: 'ogrenme',
        baslik: 'Ogrenme ve Gelisim',
        ikon: '&#128218;',
        renk: '#b7950b',
        davranislar: [
            { id: 'ders', metin: 'DKAB konusu calistim', puan: 10 },
            { id: 'kitap', metin: 'Kitap okudum', puan: 8 },
            { id: 'soru', metin: 'Merak ettigim bir seyi arastirdim', puan: 8 },
            { id: 'ogret', metin: 'Ogrendigimi birine anlattim', puan: 10 }
        ]
    }
];

export function renderBehaviorTracker(el, app) {
    const user = store.user;
    if (!user) { window.location.hash = '#/sinif-sec'; return; }

    const today = new Date().toISOString().split('T')[0];
    const behaviorLog = store.state.behaviorLog || [];
    const todaysLog = behaviorLog.find(l => l.date?.startsWith(today));
    const todaysBehaviors = todaysLog?.behaviors || [];

    // Son 7 gunun istatistikleri
    const weekStats = getWeekStats(behaviorLog);
    const totalToday = todaysBehaviors.reduce((sum, b) => sum + (b.puan || 0), 0);
    const categoryStats = getCategoryStats(behaviorLog, 30);

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <h1 class="font-display">&#127793; Davranis Takibi</h1>
                <p class="text-muted">Ogrendiklerini hayata gecir. Her gun biraz daha iyi ol!</p>
            </div>

            <!-- Bugunun Puani -->
            <div class="card anim-fade-in-up mt-lg" style="padding:2rem; text-align:center; background:linear-gradient(135deg, rgba(27,107,74,0.05), rgba(108,99,255,0.05));">
                <div style="font-size:3rem; font-weight:700; color:var(--primary);">${totalToday}</div>
                <div class="text-muted">Bugunun Davranis Puani</div>
                <div class="mt-sm" style="font-size:0.85rem; color:var(--text-secondary);">
                    ${totalToday === 0 ? 'Henuz bir davranis kaydetmedin' :
                      totalToday < 20 ? 'Guzel baslangicc!' :
                      totalToday < 40 ? 'Cok iyi gidiyorsun!' : 'Muhtesem bir gun!'}
                </div>
            </div>

            <!-- Haftalik Ozet -->
            <div class="card anim-fade-in-up mt-lg" style="padding:1.5rem;">
                <h3>&#128200; Son 7 Gun</h3>
                <div class="week-bars mt-md" style="display:flex; align-items:flex-end; justify-content:center; gap:0.75rem; height:120px;">
                    ${weekStats.map(d => {
                        const h = d.puan > 0 ? Math.max(20, Math.min(100, d.puan * 2)) : 4;
                        const isToday = d.tarih === today;
                        return `
                            <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                <span style="font-size:0.7rem; font-weight:600; color:${isToday ? 'var(--primary)' : 'var(--text-muted)'};">${d.puan}</span>
                                <div style="width:32px; height:${h}px; border-radius:6px 6px 0 0; background:${isToday ? 'var(--primary)' : d.puan > 0 ? 'rgba(108,99,255,0.3)' : 'var(--bg-secondary)'}; transition:height 0.3s;"></div>
                                <span style="font-size:0.65rem; color:var(--text-muted);">${d.gunAdi}</span>
                            </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- Bugun Ne Yaptin? -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#9989; Bugun Ne Yaptin?</h3>
                <p class="text-muted" style="font-size:0.85rem;">Ogrendiklerini hayata gecirdigin davranislari isaretle.</p>

                ${BEHAVIOR_CATEGORIES.map(cat => `
                    <div class="mt-lg">
                        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem;">
                            <span style="font-size:1.2rem;">${cat.ikon}</span>
                            <h4 style="margin:0; color:${cat.renk};">${cat.baslik}</h4>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:0.5rem;">
                            ${cat.davranislar.map(d => {
                                const checked = todaysBehaviors.some(b => b.id === d.id);
                                return `
                                    <label class="behavior-item" data-id="${d.id}" data-puan="${d.puan}" data-cat="${cat.id}" style="
                                        display:flex; align-items:center; gap:0.75rem; padding:0.7rem 1rem;
                                        border-radius:10px; cursor:pointer; transition:all 0.2s;
                                        background:${checked ? cat.renk + '11' : 'var(--bg-secondary)'};
                                        border:1px solid ${checked ? cat.renk + '44' : 'transparent'};
                                    ">
                                        <input type="checkbox" class="behavior-check" ${checked ? 'checked' : ''} style="width:18px; height:18px; accent-color:${cat.renk};">
                                        <span style="flex:1; font-size:0.9rem;">${d.metin}</span>
                                        <span style="font-size:0.75rem; padding:0.2rem 0.5rem; border-radius:12px; background:${cat.renk}22; color:${cat.renk}; font-weight:600;">+${d.puan}</span>
                                    </label>`;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Kategori Bazli 30 Gunluk -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#127919; Son 30 Gun Kategori Dagilimi</h3>
                <div class="mt-md" style="display:flex; flex-direction:column; gap:0.75rem;">
                    ${BEHAVIOR_CATEGORIES.map(cat => {
                        const stat = categoryStats[cat.id] || 0;
                        const max = Math.max(...Object.values(categoryStats), 1);
                        const pct = Math.round((stat / max) * 100);
                        return `
                            <div style="display:flex; align-items:center; gap:0.75rem;">
                                <span style="font-size:1.2rem; min-width:28px;">${cat.ikon}</span>
                                <span style="min-width:120px; font-size:0.85rem; font-weight:500;">${cat.baslik}</span>
                                <div class="progress-bar" style="flex:1; height:8px;">
                                    <div class="fill" style="width:${pct}%; background:${cat.renk};"></div>
                                </div>
                                <span style="min-width:30px; font-size:0.8rem; text-align:right; color:var(--text-muted);">${stat}</span>
                            </div>`;
                    }).join('')}
                </div>
            </div>
        </div>`;

    // Checkbox eventleri
    el.querySelectorAll('.behavior-check').forEach(cb => {
        cb.addEventListener('change', () => {
            saveTodaysBehaviors(el);
            // Sayfayi yeniden render et
            renderBehaviorTracker(el, app);
        });
    });
}

function saveTodaysBehaviors(el) {
    const checked = [];
    el.querySelectorAll('.behavior-item').forEach(item => {
        const cb = item.querySelector('.behavior-check');
        if (cb.checked) {
            checked.push({
                id: item.dataset.id,
                puan: parseInt(item.dataset.puan),
                cat: item.dataset.cat
            });
        }
    });

    // Bugunun davranis kaydini guncelle (uzerine yaz)
    store.updateTodayBehavior(checked);
}

function getWeekStats(log) {
    const days = [];
    const gunAdlari = ['Paz', 'Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt'];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const entry = log.find(l => l.date?.startsWith(dateStr));
        const puan = entry?.behaviors?.reduce((s, b) => s + (b.puan || 0), 0) || 0;
        days.push({ tarih: dateStr, gunAdi: gunAdlari[d.getDay()], puan });
    }
    return days;
}

function getCategoryStats(log, days) {
    const stats = {};
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    log.forEach(entry => {
        if (new Date(entry.date) < cutoff) return;
        (entry.behaviors || []).forEach(b => {
            if (b.cat) {
                stats[b.cat] = (stats[b.cat] || 0) + (b.puan ?? 0);
            }
        });
    });
    return stats;
}
