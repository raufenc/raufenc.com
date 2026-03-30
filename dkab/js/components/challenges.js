// ===== DKAB Akademi - Meydan Okuma =====

import { store } from '../store.js?v=11';
import { getDB, DB_PATHS } from '../firebase-config.js?v=11';

const CHALLENGE_TOPICS = [
    'Allah\'ın (c.c.) isimlerinden birini anlat',
    'Peygamberimizin (s.a.v.) hayatından bir olay paylaş',
    'Namaz vakitlerini sırala',
    'Bir ayet-i kerime yaz ve anlamını açıkla',
    'İslam\'ın 5 şartını sayar mısın?',
    'Ramazan ayının özelliklerini anlat',
    'Zekat neden önemli?',
    'Hac ibadeti hakkında 3 şey söyle',
    'Bir hadis-i şerif paylaş ve açıkla',
    'Sabır neden önemli bir erdemdir?',
    'Komşu hakkının önemi nedir?',
    'Anne-babaya saygı konusunda ne düşünüyorsun?',
    'Çevre temizliği İslam\'da neden önemlidir?',
    'Dürüstlük ve doğruluk hakkında bir şey anlat',
    'Yardımlaşma ve dayanışma ile ilgili bir örnek ver',
];

export async function renderChallenges(el, app) {
    const code = store.getClassroomCode();
    if (!code) {
        el.innerHTML = `<div class="content-area text-center mt-xl">
            <p style="font-size:3rem;">⚔️</p>
            <h3>Sınıfa Katılmadın</h3>
            <p class="text-muted mt-md">Meydan okumalar için bir sınıf koduna katıl.</p>
        </div>`;
        return;
    }

    el.innerHTML = `
        <div class="content-area">
            <div class="flex items-center gap-md mb-lg anim-fade-in-up">
                <button class="btn-icon" onclick="history.back()" style="color:var(--text-secondary);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <h2 class="font-display">⚔️ Meydan Okuma</h2>
            </div>

            <!-- Meydan okuma gönder -->
            <div class="card anim-fade-in-up" style="padding:1.25rem;background:linear-gradient(135deg,#667eea22,#764ba222);">
                <h3 style="margin-bottom:0.75rem;">🎯 Sınıfa Meydan Oku</h3>
                <p class="text-muted" style="font-size:0.85rem;margin-bottom:0.75rem;">Bir konu seç veya kendi soruну yaz:</p>

                <select id="challenge-topic" style="width:100%;padding:0.6rem;border:1px solid var(--border);border-radius:10px;background:var(--bg-card);color:var(--text-primary);font-family:inherit;margin-bottom:0.75rem;">
                    <option value="">— Konu seç —</option>
                    ${CHALLENGE_TOPICS.map(t => `<option value="${t}">${t}</option>`).join('')}
                    <option value="custom">✏️ Kendi sorumu yazayım...</option>
                </select>

                <textarea id="challenge-custom" placeholder="Kendi meydan okuma soruну yaz..."
                    style="width:100%;display:none;border:1px solid var(--border);border-radius:10px;padding:0.75rem;font-family:inherit;font-size:0.9rem;resize:vertical;min-height:70px;background:var(--bg-main);color:var(--text-primary);margin-bottom:0.75rem;"
                    maxlength="200"></textarea>

                <button id="challenge-send-btn" class="btn btn-primary" style="width:100%;">⚔️ Meydan Oku!</button>
            </div>

            <!-- Aktif meydan okumalar -->
            <div class="mt-xl">
                <h3 class="mb-md">📬 Aktif Meydan Okumalar</h3>
                <div id="challenges-list">
                    <div class="text-center"><div class="spinner" style="margin:1.5rem auto;"></div></div>
                </div>
            </div>
        </div>`;

    // Konu seç → custom textarea aç/kapat
    const topicSelect = el.querySelector('#challenge-topic');
    const customTextarea = el.querySelector('#challenge-custom');
    topicSelect.addEventListener('change', () => {
        customTextarea.style.display = topicSelect.value === 'custom' ? 'block' : 'none';
    });

    // Meydan okuma gönder
    el.querySelector('#challenge-send-btn').addEventListener('click', async () => {
        const topic = topicSelect.value === 'custom'
            ? customTextarea.value.trim()
            : topicSelect.value;

        if (!topic) { alert('Bir konu seçmeli ya da yazmalısın.'); return; }

        try {
            const db = await getDB();
            const user = store.user;
            await db.ref(DB_PATHS.challenges(code)).push({
                title: topic,
                from: user?.name || 'Anonim',
                fromGrade: user?.grade || 5,
                fromId: store.getUserId(),
                ts: Date.now(),
                acceptedBy: {},
                status: 'active'
            });
            topicSelect.value = '';
            customTextarea.value = '';
            customTextarea.style.display = 'none';
        } catch (err) {
            alert('Gönderilemedi: ' + err.message);
        }
    });

    // Firebase listener
    try {
        const db = await getDB();
        const ref = db.ref(DB_PATHS.challenges(code)).orderByChild('ts').limitToLast(20);

        ref.on('value', snap => {
            const data = snap.val() || {};
            renderChallengeList(el.querySelector('#challenges-list'), data, store.getUserId(), code, db);
        });

        app._challengesRef = ref;
    } catch (err) {
        el.querySelector('#challenges-list').innerHTML = `
            <div class="card text-center" style="padding:2rem;"><p>⚠️ Bağlantı hatası.</p></div>`;
    }
}

function renderChallengeList(container, data, myUserId, code, db) {
    const items = Object.entries(data)
        .map(([id, v]) => ({ id, ...v }))
        .sort((a, b) => (b.ts || 0) - (a.ts || 0));

    if (items.length === 0) {
        container.innerHTML = `<div class="card text-center" style="padding:2rem;">
            <p style="font-size:2rem;">⚔️</p>
            <p class="text-muted">Henüz meydan okuma yok. İlk meydan okumayı sen başlat!</p>
        </div>`;
        return;
    }

    container.innerHTML = `<div class="challenges-list stagger">
        ${items.map(item => {
            const acceptedCount = Object.keys(item.acceptedBy || {}).length;
            const iAccepted = (item.acceptedBy || {})[myUserId];
            const isOwn = item.fromId === myUserId;
            const timeAgo = formatTimeAgo(item.ts);

            return `
            <div class="challenge-card card anim-fade-in-up" style="padding:1.25rem;">
                <div class="flex justify-between items-start mb-sm">
                    <div>
                        <span style="font-size:0.75rem;color:var(--primary);font-weight:600;">⚔️ MEYDAN OKUMA</span>
                        <span class="text-muted" style="font-size:0.75rem;margin-left:0.5rem;">${timeAgo}</span>
                    </div>
                    ${isOwn ? `<span style="font-size:0.7rem;background:#e8f4f0;color:var(--primary);padding:0.15rem 0.5rem;border-radius:10px;">Senin</span>` : ''}
                </div>
                <p style="font-weight:600;font-size:1rem;margin:0.4rem 0;">${escapeHtml(item.title)}</p>
                <p class="text-muted" style="font-size:0.8rem;">— ${item.from} (${item.fromGrade}. Sınıf)</p>

                <div class="flex items-center gap-sm mt-md">
                    ${!isOwn ? `
                    <button class="accept-btn btn ${iAccepted ? 'btn-primary' : ''}" data-id="${item.id}"
                        style="${iAccepted ? '' : 'background:var(--bg-main);border:1px solid var(--border);'}font-size:0.85rem;padding:0.4rem 1rem;">
                        ${iAccepted ? '✅ Kabul Ettim' : '⚔️ Kabul Et'}
                    </button>
                    ` : ''}
                    <span class="text-muted" style="font-size:0.8rem;">${acceptedCount} kişi kabul etti</span>
                </div>
            </div>`;
        }).join('')}
    </div>`;

    // Kabul et butonları
    container.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const challengeId = btn.dataset.id;
            const ref = db.ref(`${DB_PATHS.challenges(code)}/${challengeId}/acceptedBy/${myUserId}`);
            const snap = await ref.once('value');
            if (snap.val()) {
                await ref.remove(); // toggle: geri al
            } else {
                await ref.set(Date.now());
                // XP ödülü (sadece ilk kez — localStorage ile kontrol)
                const xpKey = `challenge_xp_${challengeId}`;
                if (!localStorage.getItem(xpKey)) {
                    store.addXP(10);
                    localStorage.setItem(xpKey, '1');
                }
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
        .replace(/>/g, '&gt;');
}
