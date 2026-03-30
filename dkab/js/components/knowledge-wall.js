// ===== DKAB Akademi - Bilgi Panosu (Knowledge Wall) =====

import { store } from '../store.js?v=12';
import { getDB, DB_PATHS } from '../firebase-config.js?v=12';

const MAX_POST_LENGTH = 280;

export async function renderKnowledgeWall(el, app) {
    const code = store.getClassroomCode();
    if (!code) {
        el.innerHTML = `<div class="content-area text-center mt-xl">
            <p style="font-size:3rem;">📋</p>
            <h3>Sınıfa Katılmadın</h3>
            <p class="text-muted mt-md">Bilgi panosunu görmek için bir sınıf koduna katıl.</p>
        </div>`;
        return;
    }

    el.innerHTML = `
        <div class="content-area">
            <div class="flex items-center gap-md mb-lg anim-fade-in-up">
                <button class="btn-icon" onclick="history.back()" style="color:var(--text-secondary);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <h2 class="font-display">📋 Bilgi Panosu</h2>
                <span style="font-size:0.75rem;background:var(--primary-light);color:var(--primary);padding:0.2rem 0.6rem;border-radius:20px;">${code}</span>
            </div>

            <!-- Paylaşım formu -->
            <div class="card anim-fade-in-up" style="padding:1.25rem;" id="wall-form-card">
                <textarea id="wall-input" placeholder="Bugün öğrendiğin ilginç bir şeyi paylaş..."
                    style="width:100%;border:1px solid var(--border);border-radius:12px;padding:0.75rem;font-family:inherit;font-size:0.9rem;resize:vertical;min-height:80px;background:var(--bg-main);color:var(--text-primary);"
                    maxlength="${MAX_POST_LENGTH}"></textarea>
                <div class="flex justify-between items-center mt-sm">
                    <span id="wall-char-count" class="text-muted" style="font-size:0.8rem;">0 / ${MAX_POST_LENGTH}</span>
                    <button id="wall-submit-btn" class="btn btn-primary btn-sm">📤 Paylaş</button>
                </div>
            </div>

            <!-- Paylaşımlar -->
            <div id="wall-posts" class="mt-lg">
                <div class="text-center"><div class="spinner" style="margin:2rem auto;"></div><p class="text-muted">Yükleniyor...</p></div>
            </div>
        </div>`;

    // Karakter sayacı
    const textarea = el.querySelector('#wall-input');
    const charCount = el.querySelector('#wall-char-count');
    textarea.addEventListener('input', () => {
        charCount.textContent = `${textarea.value.length} / ${MAX_POST_LENGTH}`;
    });

    // Paylaş butonu
    el.querySelector('#wall-submit-btn').addEventListener('click', async () => {
        const text = textarea.value.trim();
        if (!text) return;

        try {
            const db = await getDB();
            const user = store.user;
            await db.ref(DB_PATHS.wall(code)).push({
                text,
                author: user?.name || 'Anonim',
                grade: user?.grade || 5,
                userId: store.getUserId(),
                ts: Date.now(),
                likes: 0
            });
            textarea.value = '';
            charCount.textContent = `0 / ${MAX_POST_LENGTH}`;
        } catch (err) {
            alert('Paylaşılamadı: ' + err.message);
        }
    });

    // Firebase listener
    try {
        const db = await getDB();
        const ref = db.ref(DB_PATHS.wall(code)).orderByChild('ts').limitToLast(50);

        ref.on('value', snap => {
            const data = snap.val() || {};
            renderPosts(el.querySelector('#wall-posts'), data, store.getUserId(), code, db);
        });

        app._wallRef = ref;
    } catch (err) {
        el.querySelector('#wall-posts').innerHTML = `
            <div class="card text-center" style="padding:2rem;">
                <p>⚠️ Bağlantı hatası. İnternet bağlantını kontrol et.</p>
            </div>`;
    }
}

function renderPosts(container, data, myUserId, code, db) {
    const posts = Object.entries(data)
        .map(([id, v]) => ({ id, ...v }))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));

    if (posts.length === 0) {
        container.innerHTML = `<div class="card text-center" style="padding:2rem;">
            <p style="font-size:2rem;">💬</p>
            <p class="text-muted">Henüz paylaşım yok. İlk paylaşımı sen yap!</p>
        </div>`;
        return;
    }

    container.innerHTML = `<div class="wall-posts stagger">
        ${posts.map(post => {
            const isMe = post.userId === myUserId;
            const timeAgo = formatTimeAgo(post.ts);
            return `
            <div class="wall-post card anim-fade-in-up" data-id="${post.id}">
                <div class="flex items-center gap-sm mb-sm">
                    <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:0.85rem;flex-shrink:0;">
                        ${(post.author || '?')[0].toUpperCase()}
                    </div>
                    <div>
                        <span style="font-weight:600;font-size:0.9rem;">${post.author || 'Anonim'}</span>
                        <span class="text-muted" style="font-size:0.75rem;margin-left:0.4rem;">${post.grade}. Sınıf</span>
                    </div>
                    <span class="text-muted" style="font-size:0.75rem;margin-left:auto;">${timeAgo}</span>
                </div>
                <p style="line-height:1.6;color:var(--text-primary);margin:0;">${escapeHtml(post.text)}</p>
                <div class="flex items-center gap-sm mt-sm">
                    <button class="like-btn" data-id="${post.id}" style="background:none;border:1px solid var(--border);border-radius:20px;padding:0.2rem 0.6rem;cursor:pointer;font-size:0.8rem;color:var(--text-secondary);">
                        👍 ${post.likes || 0}
                    </button>
                    ${isMe ? `<button class="delete-btn" data-id="${post.id}" style="background:none;border:none;color:var(--text-muted,#aaa);cursor:pointer;font-size:0.75rem;margin-left:auto;">🗑️</button>` : ''}
                </div>
            </div>`;
        }).join('')}
    </div>`;

    // Like butonları
    container.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const postId = btn.dataset.id;
            const ref = db.ref(`${DB_PATHS.wall(code)}/${postId}/likes`);
            await ref.transaction(current => (current || 0) + 1);
        });
    });

    // Silme butonları (sadece kendi paylaşımı)
    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const postId = btn.dataset.id;
            if (confirm('Bu paylaşımı silmek istediğine emin misin?')) {
                await db.ref(`${DB_PATHS.wall(code)}/${postId}`).remove();
            }
        });
    });
}

function formatTimeAgo(ts) {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'az önce';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}dk önce`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}sa önce`;
    return `${Math.floor(diff / 86400000)}g önce`;
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br>');
}
