/**
 * ============================================================
 * MUALLİMO — KART İNCELEME SİSTEMİ
 * review-template tabanlı, Muallimo VERİ yapısına uyarlanmış
 * ============================================================
 */

import { VERI } from './muallimo-data.js';

// ============================================================
// CONFIG
// ============================================================
const CONFIG = {
    firebase: null,

    dataSource: async () => {
        const items = [];
        for (const [seriKey, seri] of Object.entries(VERI)) {
            for (const cilt of seri.ciltler) {
                cilt.kartlar.forEach((kartYolu, idx) => {
                    const dosyaAdi = kartYolu.split('/').pop().replace('.webp', '');
                    items.push({
                        id: dosyaAdi,
                        group: seriKey,
                        imageUrl: 'https://cdn.jsdelivr.net/gh/raufenc/muallimo-images@main/WEBP_Final/' + kartYolu,
                        title: `${cilt.ad} — ${idx + 1}`,
                        subtitle: `${seri.emoji} ${seri.baslik}`,
                        desc: '',
                        tag: cilt.ad,
                        meta: {
                            'Seri': seri.baslik,
                            'Cilt': `${cilt.no}. ${cilt.ad}`,
                            'No': `${idx + 1} / ${cilt.kart_sayisi}`
                        }
                    });
                });
            }
        }
        // Fen bilimleri de CDN'de WEBP_Final/ altinda — ek duzeltme gerekmiyor
        return items;
    },

    groups: {
        'all': 'Tümü',
        'okuryazarlik': '🧠 Okuryazarlık',
        'saglik': '🏥 Sağlık',
        'teknoloji': '💻 Teknoloji',
        'kultur': '📖 Kültür & Dil',
        'csuite': '👔 C-Suite',
        'fen-bilimleri': '🔬 Fen Bilimleri'
    },

    actions: [
        { key: 'uygun',      label: 'Uygun',  color: '#22c55e', icon: '✓' },
        { key: 'uygun_degil', label: 'Red',    color: '#ef4444', icon: '✗' },
    ],

    appTitle: 'Muallimo — Kart İnceleme',
    dataVersion: 'v1',
};
// ============================================================

const PENDING_KEY = 'beklemede';

let db = null;
let allItems = [];
let filteredItems = [];
let reviews = {};
let currentFilter = { group: 'all', status: 'all' };
let currentModalIndex = -1;
let useFirebase = false;
let actionBusy = false;
const keysHeld = new Set();

// ===== INIT =====
export async function init() {
    document.title = CONFIG.appTitle;
    document.querySelector('.app-title')?.replaceChildren(document.createTextNode(CONFIG.appTitle));

    if (localStorage.getItem('muallimo_review_version') !== CONFIG.dataVersion) {
        localStorage.removeItem('muallimo_review_data');
        localStorage.setItem('muallimo_review_version', CONFIG.dataVersion);
    }

    if (CONFIG.firebase) {
        try {
            await initFirebase(CONFIG.firebase);
            showFirebaseStatus(true);
        } catch (e) {
            console.error('Firebase hatası:', e);
            showFirebaseStatus(false, e.message);
        }
    } else {
        showFirebaseStatus(false, 'Yerel mod');
    }

    if (!useFirebase) {
        const saved = localStorage.getItem('muallimo_review_data');
        if (saved) reviews = JSON.parse(saved);
    }

    await loadItems();
    buildGroupFilter();
    renderApp();
    bindEvents();
    applyFilter();
}

// ===== FIREBASE =====
async function initFirebase(config) {
    if (!window.firebase) throw new Error('Firebase SDK yüklenmedi');
    if (!firebase.apps.length) firebase.initializeApp(config);
    db = firebase.database();
    useFirebase = true;
    const snap = await db.ref('reviews').once('value');
    if (snap.val()) reviews = snap.val();
}

function showFirebaseStatus(connected, msg) {
    const header = document.querySelector('.header-title');
    if (!header) return;
    let badge = document.getElementById('fb-status');
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'fb-status';
        badge.style.cssText = 'font-size:0.7rem;padding:2px 8px;border-radius:10px;margin-left:10px;font-weight:600;';
        header.appendChild(badge);
    }
    badge.textContent = connected ? 'Firebase' : 'Yerel';
    badge.style.background = connected ? '#dcfce7' : '#fef9c3';
    badge.style.color = connected ? '#166534' : '#854d0e';
    if (msg) badge.title = msg;
}

// ===== DATA =====
async function loadItems() {
    try {
        let data;
        if (typeof CONFIG.dataSource === 'function') {
            data = await CONFIG.dataSource();
        } else {
            const resp = await fetch(CONFIG.dataSource);
            data = await resp.json();
        }
        allItems = data;
    } catch (e) {
        console.error('Veri yüklenemedi:', e);
        allItems = [];
    }
}

function reviewKey(item) {
    return item.group + '_' + item.id;
}

function getReview(key) { return reviews[key] || null; }
function getStatus(key) { return reviews[key]?.durum || PENDING_KEY; }

async function setReview(key, durum, not) {
    const reviewer = document.getElementById('reviewer-name')?.value || 'Anonim';
    const entry = { durum, not: not || '', reviewer, tarih: new Date().toISOString() };
    reviews[key] = entry;
    if (useFirebase && db) {
        await db.ref('reviews/' + key).set(entry);
    } else {
        localStorage.setItem('muallimo_review_data', JSON.stringify(reviews));
    }
    updateStats();
    updateCardStatus(key, durum);
}

// ===== RENDERING =====
function renderApp() {
    document.getElementById('main-app').style.display = 'block';
    const savedName = localStorage.getItem('reviewer_name') || '';
    const nameInput = document.getElementById('reviewer-name');
    if (nameInput) nameInput.value = savedName;
    updateStats();
}

function buildGroupFilter() {
    const sel = document.getElementById('group-filter');
    if (!sel) return;
    sel.innerHTML = '';
    Object.entries(CONFIG.groups).forEach(([key, label]) => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = label;
        sel.appendChild(opt);
    });
}

function applyFilter() {
    const { group, status } = currentFilter;
    filteredItems = allItems.filter(item => {
        if (group !== 'all' && item.group !== group) return false;
        if (status !== 'all' && getStatus(reviewKey(item)) !== status) return false;
        return true;
    });
    renderGrid();
    updateStats();
}

function renderGrid() {
    const grid = document.getElementById('item-grid');
    if (!filteredItems.length) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">🔍</div><h3>Sonuç bulunamadı</h3></div>';
        return;
    }
    grid.innerHTML = filteredItems.map((item, idx) => {
        const key = reviewKey(item);
        const status = getStatus(key);
        const action = CONFIG.actions.find(a => a.key === status);
        const badge = action ? action.icon : '?';
        return `
        <div class="item-card status-${status}" data-idx="${idx}" data-id="${key}">
            <div class="card-image-wrapper">
                <img src="${item.imageUrl || ''}" alt="${item.id}" loading="lazy"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="placeholder" style="display:none">🖼</div>
                <span class="card-badge ${status}">${badge}</span>
            </div>
            <div class="card-info">
                <div class="card-title">${item.title || item.id}</div>
                ${item.subtitle ? `<div class="card-subtitle">${item.subtitle}</div>` : ''}
                ${item.tag ? `<span class="card-tag">${item.tag}</span>` : ''}
            </div>
            <div class="card-actions">
                ${CONFIG.actions.map(a =>
                    `<button class="btn-action btn-${a.key}"
                        onclick="event.stopPropagation();window.reviewApp.quickAction('${key}','${a.key}')">
                        ${a.icon} ${a.label}
                    </button>`
                ).join('')}
            </div>
        </div>`;
    }).join('');
}

function updateCardStatus(key, durum) {
    const card = document.querySelector(`[data-id="${key}"]`);
    if (!card) return;
    card.className = `item-card status-${durum}`;
    const badge = card.querySelector('.card-badge');
    const action = CONFIG.actions.find(a => a.key === durum);
    if (badge && action) {
        badge.className = `card-badge ${durum}`;
        badge.textContent = action.icon;
    }
}

function updateStats() {
    const counts = { [PENDING_KEY]: 0 };
    CONFIG.actions.forEach(a => { counts[a.key] = 0; });
    allItems.forEach(item => {
        const s = getStatus(reviewKey(item));
        counts[s] = (counts[s] || 0) + 1;
    });
    const total = allItems.length;
    const done = total - (counts[PENDING_KEY] || 0);

    const el = id => document.getElementById(id);
    const set = (id, v) => { const e = el(id); if (e) e.textContent = v; };

    set('stat-pending', counts[PENDING_KEY] || 0);
    set('stat-total', total);
    set('stat-done', done);
    set('count-all', total);
    set('count-pending', counts[PENDING_KEY] || 0);

    CONFIG.actions.forEach(a => {
        set(`stat-${a.key}`, counts[a.key] || 0);
        set(`count-${a.key}`, counts[a.key] || 0);
    });

    const bar = el('progress-fill');
    if (bar) bar.style.width = total ? (done / total * 100) + '%' : '0%';
}

// ===== MODAL =====
function openModal(idx) {
    currentModalIndex = idx;
    const item = filteredItems[idx];
    if (!item) return;

    const key = reviewKey(item);
    const review = getReview(key);

    document.getElementById('modal-image').src = item.imageUrl || '';
    document.getElementById('modal-image').onerror = function() {
        this.style.display = 'none';
        document.getElementById('modal-placeholder').style.display = 'flex';
    };
    document.getElementById('modal-image').onload = function() {
        this.style.display = 'block';
        document.getElementById('modal-placeholder').style.display = 'none';
    };

    document.getElementById('modal-title').textContent = item.title || item.id;
    document.getElementById('modal-id').textContent = item.id;
    document.getElementById('modal-group').textContent = CONFIG.groups[item.group] || item.group;
    document.getElementById('modal-tag').textContent = item.tag || '';
    document.getElementById('modal-desc').textContent = item.desc || '-';

    const metaContainer = document.getElementById('modal-meta-fields');
    if (metaContainer && item.meta) {
        metaContainer.innerHTML = Object.entries(item.meta).map(([k, v]) =>
            `<div class="modal-field"><div class="modal-field-label">${k}</div>
             <div class="modal-field-value">${v}</div></div>`
        ).join('');
    }

    document.getElementById('modal-note').value = review?.not || '';

    const actionsEl = document.getElementById('modal-actions');
    actionsEl.innerHTML = CONFIG.actions.map((a, i) =>
        `<button class="modal-btn-action modal-btn-${a.key}" data-action="${a.key}">
            ${a.icon} ${a.label}${i < 2 ? ` (${i === 0 ? 'A' : 'R'})` : ''}
        </button>`
    ).join('');
    actionsEl.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => modalAction(btn.dataset.action));
    });

    document.getElementById('modal-counter').textContent = `${idx + 1} / ${filteredItems.length}`;
    document.getElementById('modal-prev').disabled = idx === 0;
    document.getElementById('modal-next').disabled = idx === filteredItems.length - 1;

    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Swipe hint'i sifirla
    const content = document.querySelector('.modal-content');
    if (content) {
        content.style.transform = '';
        content.removeAttribute('data-swipe');
    }
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
    currentModalIndex = -1;
}

function navigateModal(dir) {
    const newIdx = currentModalIndex + dir;
    if (newIdx >= 0 && newIdx < filteredItems.length) openModal(newIdx);
}

async function modalAction(durum) {
    if (currentModalIndex < 0 || actionBusy) return;
    actionBusy = true;
    const item = filteredItems[currentModalIndex];
    const not = document.getElementById('modal-note').value;
    await setReview(reviewKey(item), durum, not);
    const action = CONFIG.actions.find(a => a.key === durum);
    showToast(action ? `${action.icon} ${action.label} olarak işaretlendi` : 'Kaydedildi');
    if (currentModalIndex < filteredItems.length - 1) {
        navigateModal(1);
    } else {
        closeModal();
    }
    setTimeout(() => { actionBusy = false; }, 400);
}

async function quickAction(key, durum) {
    await setReview(key, durum, '');
    const action = CONFIG.actions.find(a => a.key === durum);
    showToast(action ? action.icon + ' ' + action.label : 'Kaydedildi');
}

// ===== RESET =====
function resetAll() {
    if (!confirm('Tüm inceleme verileri sıfırlansın mı?')) return;
    reviews = {};
    if (useFirebase && db) db.ref('reviews').remove();
    else localStorage.removeItem('muallimo_review_data');
    applyFilter();
    showToast('Sıfırlandı');
}

// ===== EXPORT =====
function exportJSON() {
    const reviewer = document.getElementById('reviewer-name')?.value || 'Anonim';
    const byStatus = {};
    CONFIG.actions.forEach(a => { byStatus[a.key] = []; });
    let pendingCount = 0;

    allItems.forEach(item => {
        const key = reviewKey(item);
        const s = getStatus(key);
        const r = getReview(key);
        if (s === PENDING_KEY) { pendingCount++; return; }
        if (byStatus[s]) byStatus[s].push({ ...item, not: r?.not || '', reviewer: r?.reviewer, tarih: r?.tarih });
    });

    const data = {
        tarih: new Date().toISOString().split('T')[0],
        reviewer,
        ozet: { toplam: allItems.length, beklemede: pendingCount, ...Object.fromEntries(CONFIG.actions.map(a => [a.key, byStatus[a.key].length])) },
        detay: byStatus
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `muallimo_inceleme_${data.tarih}.json`; a.click();
    URL.revokeObjectURL(url);
    showToast('JSON indirildi');
}

function exportCSV() {
    const rows = [['ID', 'Seri', 'Başlık', 'Cilt', 'Durum', 'Not', 'İnceleyici', 'Tarih']];
    allItems.forEach(item => {
        const key = reviewKey(item);
        const s = getStatus(key);
        const r = getReview(key);
        const action = CONFIG.actions.find(a => a.key === s);
        rows.push([
            item.id, CONFIG.groups[item.group] || item.group, item.title || '', item.tag || '',
            action ? action.label : 'Beklemede',
            (r?.not || '').replace(/"/g, '""'),
            r?.reviewer || '', r?.tarih ? new Date(r.tarih).toLocaleDateString('tr-TR') : ''
        ]);
    });
    const csv = '\uFEFF' + rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `muallimo_inceleme_${new Date().toISOString().split('T')[0]}.csv`; a.click();
    URL.revokeObjectURL(url);
    showToast('CSV indirildi');
}

// ===== DASHBOARD =====
function openDashboard() {
    renderDashboardSummary();
    renderDashboardTable();
    document.getElementById('dashboard-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeDashboard() {
    document.getElementById('dashboard-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function renderDashboardSummary() {
    const counts = { [PENDING_KEY]: 0 };
    CONFIG.actions.forEach(a => { counts[a.key] = 0; });
    const perGroup = {};
    Object.keys(CONFIG.groups).filter(k => k !== 'all').forEach(g => {
        perGroup[g] = { toplam: 0, done: 0 };
        CONFIG.actions.forEach(a => { perGroup[g][a.key] = 0; });
        perGroup[g][PENDING_KEY] = 0;
    });

    allItems.forEach(item => {
        const s = getStatus(reviewKey(item));
        counts[s] = (counts[s] || 0) + 1;
        const pg = perGroup[item.group];
        if (pg) { pg.toplam++; pg[s] = (pg[s] || 0) + 1; if (s !== PENDING_KEY) pg.done++; }
    });

    const total = allItems.length;
    const done = total - (counts[PENDING_KEY] || 0);
    const pct = total ? Math.round(done / total * 100) : 0;

    let html = `<div class="dash-stats">
        <div class="dash-stat"><span class="dash-stat-num">${total}</span><span class="dash-stat-label">Toplam</span></div>
        ${CONFIG.actions.map(a => `
            <div class="dash-stat ${a.key}"><span class="dash-stat-num">${counts[a.key] || 0}</span>
            <span class="dash-stat-label">${a.label}</span></div>`).join('')}
        <div class="dash-stat"><span class="dash-stat-num">${counts[PENDING_KEY] || 0}</span><span class="dash-stat-label">Beklemede</span></div>
        <div class="dash-stat"><span class="dash-stat-num">%${pct}</span><span class="dash-stat-label">Tamamlanma</span></div>
    </div>
    <table class="dash-grade-table">
        <thead><tr><th>Seri</th><th>Toplam</th>
        ${CONFIG.actions.map(a => `<th>${a.label}</th>`).join('')}
        <th>Beklemede</th><th>İlerleme</th></tr></thead>
        <tbody>`;
    Object.entries(perGroup).forEach(([g, pg]) => {
        const gpct = pg.toplam ? Math.round(pg.done / pg.toplam * 100) : 0;
        html += `<tr><td><strong>${CONFIG.groups[g] || g}</strong></td><td>${pg.toplam}</td>
        ${CONFIG.actions.map(a => `<td style="color:${a.color}">${pg[a.key] || 0}</td>`).join('')}
        <td style="color:#6c757d">${pg[PENDING_KEY] || 0}</td>
        <td><div class="dash-progress"><div class="dash-progress-fill" style="width:${gpct}%"></div></div> <small>${gpct}%</small></td></tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('dashboard-summary').innerHTML = html;

    // Dashboard group filter'i doldur
    const dashGroupFilter = document.getElementById('dash-group-filter');
    if (dashGroupFilter && dashGroupFilter.options.length <= 1) {
        Object.entries(CONFIG.groups).forEach(([key, label]) => {
            if (key === 'all') return;
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = label;
            dashGroupFilter.appendChild(opt);
        });
    }
}

function renderDashboardTable() {
    const gradeFilter = document.getElementById('dash-group-filter')?.value || 'all';
    const statusFilter = document.getElementById('dash-status-filter')?.value || 'all';

    const filtered = allItems.filter(item => {
        if (gradeFilter !== 'all' && item.group !== gradeFilter) return false;
        if (statusFilter !== 'all' && getStatus(reviewKey(item)) !== statusFilter) return false;
        return true;
    });

    document.getElementById('dashboard-tbody').innerHTML = filtered.map((item, i) => {
        const key = reviewKey(item);
        const s = getStatus(key);
        const r = getReview(key);
        const action = CONFIG.actions.find(a => a.key === s);
        const statusLabel = action ? action.label : 'Beklemede';
        const statusColor = action ? action.color : '#6c757d';
        const tarih = r?.tarih ? new Date(r.tarih).toLocaleDateString('tr-TR') : '-';
        return `<tr>
            <td>${i + 1}</td>
            <td>${CONFIG.groups[item.group] || item.group}</td>
            <td>${item.id}</td>
            <td>${item.title || '-'}</td>
            <td>${item.tag || '-'}</td>
            <td style="color:${statusColor};font-weight:600">${statusLabel}</td>
            <td>${r?.not || '-'}</td>
            <td>${r?.reviewer || '-'}</td>
            <td>${tarih}</td>
        </tr>`;
    }).join('');
}

// ===== TOAST =====
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

// ===== EVENTS =====
function bindEvents() {
    document.getElementById('group-filter')?.addEventListener('change', e => {
        currentFilter.group = e.target.value; applyFilter();
    });
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter.status = pill.dataset.status;
            applyFilter();
        });
    });
    document.getElementById('item-grid')?.addEventListener('click', e => {
        const card = e.target.closest('.item-card');
        if (!card || e.target.closest('.card-actions')) return;
        openModal(parseInt(card.dataset.idx));
    });
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('modal-overlay')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
    document.getElementById('modal-prev')?.addEventListener('click', () => navigateModal(-1));
    document.getElementById('modal-next')?.addEventListener('click', () => navigateModal(1));

    document.getElementById('btn-dashboard')?.addEventListener('click', openDashboard);
    document.getElementById('dashboard-close')?.addEventListener('click', closeDashboard);
    document.getElementById('dashboard-overlay')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeDashboard(); });
    document.getElementById('dash-group-filter')?.addEventListener('change', renderDashboardTable);
    document.getElementById('dash-status-filter')?.addEventListener('change', renderDashboardTable);
    document.getElementById('dash-export-csv')?.addEventListener('click', exportCSV);

    document.getElementById('btn-export')?.addEventListener('click', exportJSON);
    document.getElementById('btn-reset')?.addEventListener('click', resetAll);
    document.getElementById('reviewer-name')?.addEventListener('change', e => {
        localStorage.setItem('reviewer_name', e.target.value);
    });

    bindSwipeGestures();

    document.addEventListener('keydown', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        const key = e.key.toLowerCase();
        if (keysHeld.has(key)) return;
        keysHeld.add(key);
        if (currentModalIndex >= 0) {
            if (key === 'escape') closeModal();
            else if (key === 'arrowleft') navigateModal(-1);
            else if (key === 'arrowright') navigateModal(1);
            else if (key === 'n') { e.preventDefault(); document.getElementById('modal-note')?.focus(); }
            else {
                const shortcuts = ['a', 'r', 's', 'd'];
                const idx = shortcuts.indexOf(key);
                if (idx >= 0 && CONFIG.actions[idx]) modalAction(CONFIG.actions[idx].key);
            }
        }
    });
    document.addEventListener('keyup', e => {
        keysHeld.delete(e.key.toLowerCase());
        actionBusy = false;
    });
}

// ===== SWIPE GESTURES =====
function bindSwipeGestures() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    let startX = 0, startY = 0, isDragging = false;
    const THRESHOLD = 80;  // px - aksiyonu tetiklemek icin minimum swipe mesafesi
    const MAX_ROTATE = 12; // derece - maksimum egim

    overlay.addEventListener('touchstart', e => {
        if (currentModalIndex < 0) return;
        // Textarea veya buton icerisinde swipe baslamamali
        if (e.target.closest('textarea, button, select')) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    }, { passive: true });

    overlay.addEventListener('touchmove', e => {
        if (!isDragging || currentModalIndex < 0) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;

        // Dikey scroll mi? Birakalim
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 10) {
            isDragging = false;
            return;
        }

        const content = document.querySelector('.modal-content');
        if (!content) return;

        const rotate = (dx / 300) * MAX_ROTATE;
        content.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
        content.style.transition = 'none';

        // Renk hint
        const ratio = Math.min(Math.abs(dx) / THRESHOLD, 1);
        if (dx > 10) {
            content.setAttribute('data-swipe', 'uygun');
            content.style.setProperty('--swipe-opacity', ratio);
        } else if (dx < -10) {
            content.setAttribute('data-swipe', 'red');
            content.style.setProperty('--swipe-opacity', ratio);
        } else {
            content.removeAttribute('data-swipe');
            content.style.setProperty('--swipe-opacity', '0');
        }
    }, { passive: true });

    overlay.addEventListener('touchend', e => {
        if (!isDragging || currentModalIndex < 0) return;
        isDragging = false;

        const dx = e.changedTouches[0].clientX - startX;
        const content = document.querySelector('.modal-content');
        if (!content) return;

        content.style.transition = 'transform 0.3s ease';

        if (dx > THRESHOLD) {
            // Saga swipe → Uygun
            content.style.transform = `translateX(120%) rotate(${MAX_ROTATE}deg)`;
            setTimeout(() => {
                modalAction(CONFIG.actions[0].key);
                content.style.transform = '';
                content.removeAttribute('data-swipe');
            }, 300);
        } else if (dx < -THRESHOLD) {
            // Sola swipe → Red
            content.style.transform = `translateX(-120%) rotate(${-MAX_ROTATE}deg)`;
            setTimeout(() => {
                modalAction(CONFIG.actions[1].key);
                content.style.transform = '';
                content.removeAttribute('data-swipe');
            }, 300);
        } else {
            // Yeterli mesafe yok — geri don
            content.style.transform = '';
            content.removeAttribute('data-swipe');
        }
    }, { passive: true });
}

window.reviewApp = { quickAction, exportJSON, exportCSV, resetAll, openDashboard };
