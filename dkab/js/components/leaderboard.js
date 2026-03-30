// ===== DKAB Akademi - Sınıf Sıralama Tablosu =====

import { store } from '../store.js?v=6';
import { getDB, DB_PATHS } from '../firebase-config.js?v=6';

export async function renderLeaderboard(el, app) {
    const code = store.getClassroomCode();
    if (!code) {
        el.innerHTML = `<div class="content-area text-center mt-xl">
            <p style="font-size:3rem;">🏆</p>
            <h3>Sınıfa Katılmadın</h3>
            <p class="text-muted mt-md">Sıralamayı görmek için bir sınıf koduna katıl.</p>
            <button class="btn btn-primary mt-lg" onclick="document.querySelector('.sidebar-join-btn')?.click()">
                Sınıfa Katıl
            </button>
        </div>`;
        return;
    }

    el.innerHTML = `<div class="content-area">
        <div class="flex items-center gap-md mb-xl anim-fade-in-up">
            <button class="btn-icon" onclick="history.back()" style="color:var(--text-secondary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <h2 class="font-display">🏆 Sınıf Sıralaması</h2>
            <span class="badge-chip" style="background:var(--primary-light);color:var(--primary);font-size:0.75rem;padding:0.2rem 0.6rem;border-radius:20px;">${code}</span>
        </div>
        <div id="lb-container">
            <div class="text-center mt-xl"><div class="spinner" style="margin:2rem auto;"></div><p class="text-muted">Yükleniyor...</p></div>
        </div>
    </div>`;

    try {
        // Kendi verimizi güncelle
        await pushSelfToLeaderboard(code);

        // Firebase'den sıralamayı çek
        const db = await getDB();
        const ref = db.ref(DB_PATHS.leaderboard(code));

        ref.on('value', snap => {
            const data = snap.val() || {};
            renderRankings(el.querySelector('#lb-container'), data, store.getUserId());
        });

        // Cleanup: sayfa değişince listener'ı kapat
        app._leaderboardRef = ref;

    } catch (err) {
        el.querySelector('#lb-container').innerHTML = `
            <div class="card text-center" style="padding:2rem;">
                <p>⚠️ Bağlantı hatası. İnternet bağlantını kontrol et.</p>
                <p class="text-muted" style="font-size:0.8rem;">${err.message}</p>
            </div>`;
    }
}

async function pushSelfToLeaderboard(code) {
    const user = store.user;
    const stats = store.stats;
    if (!user) return;

    const db = await getDB();
    const userId = store.getUserId();
    await db.ref(DB_PATHS.member(code, userId)).set({
        name: user.name,
        grade: user.grade,
        xp: stats.totalXp,
        level: stats.level,
        streak: stats.streak,
        completedChapters: stats.completedChapters,
        accuracy: stats.totalAnswers > 0
            ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100)
            : 0,
        updatedAt: Date.now()
    });
}

function renderRankings(container, data, myUserId) {
    const entries = Object.entries(data)
        .map(([id, v]) => ({ id, ...v }))
        .sort((a, b) => (b.xp || 0) - (a.xp || 0));

    if (entries.length === 0) {
        container.innerHTML = `<div class="card text-center" style="padding:2rem;">
            <p class="text-muted">Henüz kimse sıralamasını paylaşmadı.</p>
        </div>`;
        return;
    }

    const medals = ['🥇', '🥈', '🥉'];

    container.innerHTML = `
        <div class="leaderboard-list stagger">
            ${entries.map((e, i) => {
                const isMe = e.id === myUserId;
                return `
                <div class="lb-item card anim-fade-in-up ${isMe ? 'lb-me' : ''}" style="${isMe ? 'border: 2px solid var(--primary);' : ''}">
                    <div class="lb-rank">
                        ${i < 3 ? medals[i] : `<span style="font-size:1rem;font-weight:700;color:var(--text-secondary);">#${i + 1}</span>`}
                    </div>
                    <div class="lb-avatar" style="width:40px;height:40px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;flex-shrink:0;">
                        ${(e.name || '?')[0].toUpperCase()}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:600;">${e.name || 'Anonim'} ${isMe ? '<span style="font-size:0.75rem;color:var(--primary);">(Sen)</span>' : ''}</div>
                        <div class="text-muted" style="font-size:0.8rem;">${e.grade}. Sınıf · Sv.${e.level || 1}</div>
                    </div>
                    <div style="text-align:right;flex-shrink:0;">
                        <div style="font-weight:700;color:var(--primary);">⚡ ${e.xp || 0}</div>
                        <div class="text-muted" style="font-size:0.75rem;">🔥${e.streak || 0} · 🎯${e.accuracy || 0}%</div>
                    </div>
                </div>`;
            }).join('')}
        </div>

        <div class="card mt-lg anim-fade-in-up" style="padding:1rem 1.5rem;">
            <div class="flex justify-between items-center">
                <span class="text-muted" style="font-size:0.85rem;">${entries.length} öğrenci · Son güncelleme: ${new Date().toLocaleTimeString('tr-TR')}</span>
                <button class="btn btn-sm" onclick="location.reload()" style="font-size:0.8rem;">🔄 Yenile</button>
            </div>
        </div>
    `;
}
