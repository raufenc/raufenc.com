/**
 * DKAB Görsel İnceleme Sistemi
 * Firebase RTDB + localStorage fallback
 */

const GRADES = ['04','05','06','07','08','09','10','11','12'];
const GRADE_LABELS = { '04':'4. Sınıf','05':'5. Sınıf','06':'6. Sınıf','07':'7. Sınıf','08':'8. Sınıf','09':'9. Sınıf','10':'10. Sınıf','11':'11. Sınıf','12':'12. Sınıf' };

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAhbpVIeFlzc8VM-KcJL-BUiklH7u2st9Q",
    authDomain: "dkab-review-f8552.firebaseapp.com",
    databaseURL: "https://dkab-review-f8552-default-rtdb.firebaseio.com",
    projectId: "dkab-review-f8552",
    storageBucket: "dkab-review-f8552.firebasestorage.app",
    messagingSenderId: "664426174738",
    appId: "1:664426174738:web:d0cdd4fcd0f097aa22fbcb"
};

const DATA_VERSION = 'v2'; // bump to clear stale localStorage

let db = null; // Firebase ref
let allImages = [];
let filteredImages = [];
let reviews = {};
let unitMeta = {};
let currentFilter = { grade: 'all', status: 'all' };
let currentModalIndex = -1;
let useFirebase = false;
let actionBusy = false; // debounce for keyboard rapid-fire

// ===== INIT =====
export async function init() {
    // Clear stale localStorage data from previous buggy sessions
    if (localStorage.getItem('dkab_data_version') !== DATA_VERSION) {
        localStorage.removeItem('dkab_reviews');
        localStorage.setItem('dkab_data_version', DATA_VERSION);
    }

    // Auto-connect to Firebase with hard-coded config
    try {
        await initFirebase(FIREBASE_CONFIG);
    } catch (e) {
        console.warn('Firebase bağlantı hatası, localStorage kullanılacak:', e);
        useFirebase = false;
    }

    if (!useFirebase) {
        const localReviews = localStorage.getItem('dkab_reviews');
        if (localReviews) reviews = JSON.parse(localReviews);
    }

    await Promise.all([loadAllImages(), loadUnitMeta()]);

    // Enrich images with unit/chapter info
    allImages.forEach(img => {
        const meta = unitMeta[img.sinif];
        if (meta && img.bolum_id) {
            const ch = meta.chapters[img.bolum_id];
            if (ch) {
                img._unite_baslik = ch.unite_baslik || '';
                img._bolum_baslik = ch.baslik || '';
                img._bolum_odak = ch.odak || '';
            }
        }
    });

    if (allImages.length === 0) {
        document.getElementById('main-app').innerHTML = '<div class="empty-state"><div class="icon">📂</div><h3>Görsel verisi bulunamadı</h3><p>data/ klasöründe gorsel_uretim_listesi.json dosyaları mevcut değil.</p></div>';
        return;
    }

    renderApp();
    bindEvents();
    applyFilter();
}

// ===== FIREBASE =====
async function initFirebase(config) {
    if (!window.firebase) throw new Error('Firebase SDK yüklenmedi');
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    db = firebase.database();
    useFirebase = true;

    const snap = await db.ref('reviews').once('value');
    if (snap.val()) reviews = snap.val();
}

export function showSetup() {
    document.getElementById('setup-screen').style.display = 'block';
    document.getElementById('main-app').style.display = 'none';
}

export function connectFirebase() {
    const textarea = document.getElementById('firebase-config');
    const errorEl = document.getElementById('setup-error');
    try {
        const config = JSON.parse(textarea.value.trim());
        if (!config.apiKey || !config.databaseURL) {
            errorEl.textContent = 'apiKey ve databaseURL zorunludur.';
            return;
        }
        localStorage.setItem('dkab_review_firebase_config', JSON.stringify(config));
        location.reload();
    } catch (e) {
        errorEl.textContent = 'Geçersiz JSON formatı: ' + e.message;
    }
}

export function useLocalMode() {
    localStorage.removeItem('dkab_review_firebase_config');
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
}

// ===== DATA LOADING =====
async function loadAllImages() {
    const promises = GRADES.map(async (g) => {
        try {
            const resp = await fetch(`data/${g}/07_gorsel_plani/gorsel_uretim_listesi.json`);
            if (!resp.ok) return [];
            const list = await resp.json();
            return list.map(item => ({ ...item, sinif: g }));
        } catch { return []; }
    });
    const results = await Promise.all(promises);
    allImages = results.flat();
}

async function loadUnitMeta() {
    const promises = GRADES.map(async (g) => {
        try {
            const [uniteResp, bolumResp] = await Promise.all([
                fetch(`data/${g}/02_yapi/unite_listesi.json`),
                fetch(`data/${g}/02_yapi/bolum_listesi.json`)
            ]);
            if (!uniteResp.ok || !bolumResp.ok) return;

            const uniteList = await uniteResp.json();
            const bolumList = await bolumResp.json();

            const units = {};
            uniteList.forEach(u => { units[u.unite_id] = u.baslik; });

            const chapters = {};
            bolumList.forEach(b => {
                chapters[b.bolum_id] = {
                    baslik: b.baslik,
                    odak: b.odak || '',
                    unite_baslik: units[b.unite_id] || ''
                };
            });

            unitMeta[g] = { units, chapters };
        } catch { /* skip */ }
    });
    await Promise.all(promises);
}

// ===== REVIEW OPERATIONS =====
function getReview(gorselId) {
    return reviews[gorselId] || null;
}

function getStatus(gorselId) {
    const r = getReview(gorselId);
    return r ? r.durum : 'beklemede';
}

async function setReview(gorselId, durum, not) {
    const reviewer = document.getElementById('reviewer-name')?.value || 'Anonim';
    const entry = {
        durum,
        not: not || '',
        reviewer,
        tarih: new Date().toISOString()
    };
    reviews[gorselId] = entry;

    if (useFirebase && db) {
        await db.ref('reviews/' + gorselId).set(entry);
    } else {
        localStorage.setItem('dkab_reviews', JSON.stringify(reviews));
    }

    updateStats();
    updateCardStatus(gorselId, durum);
}

// ===== RENDERING =====
function renderApp() {
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';

    const savedName = localStorage.getItem('dkab_reviewer_name') || '';
    const nameInput = document.getElementById('reviewer-name');
    if (nameInput) nameInput.value = savedName;

    updateStats();
}

function applyFilter() {
    const { grade, status } = currentFilter;
    filteredImages = allImages.filter(img => {
        if (grade !== 'all' && img.sinif !== grade) return false;
        if (status !== 'all' && getStatus(img.gorsel_id) !== status) return false;
        return true;
    });
    renderGrid();
    updateStats();
}

function renderGrid() {
    const grid = document.getElementById('image-grid');
    if (filteredImages.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">🔍</div><h3>Sonuç bulunamadı</h3><p>Filtreleri değiştirmeyi deneyin.</p></div>';
        return;
    }

    grid.innerHTML = filteredImages.map((img, idx) => {
        const status = getStatus(img.gorsel_id);
        const badgeIcon = status === 'uygun' ? '✓' : status === 'uygun_degil' ? '✗' : '?';
        const uniteBaslik = img._unite_baslik || '';
        const bolumBaslik = img._bolum_baslik || '';

        return `
        <div class="image-card status-${status}" data-idx="${idx}" data-id="${img.gorsel_id}">
            <div class="card-image-wrapper">
                <img src="${img.dosya_yolu}" alt="${img.gorsel_id}" loading="lazy"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="placeholder" style="display:none">🖼</div>
                <span class="card-badge ${status}">${badgeIcon}</span>
            </div>
            <div class="card-info">
                <div class="card-id">${GRADE_LABELS[img.sinif]} · ${img.gorsel_id}</div>
                ${uniteBaslik ? `<div class="card-unite">${uniteBaslik}</div>` : ''}
                ${bolumBaslik ? `<div class="card-bolum">${bolumBaslik}</div>` : ''}
                <div class="card-desc">${img.sahne_aciklamasi_tr || ''}</div>
                <span class="card-type">${img.tur || 'sahne'}</span>
            </div>
            <div class="card-actions">
                <button class="btn-approve" onclick="event.stopPropagation(); window.reviewApp.quickAction('${img.gorsel_id}','uygun')">✓ Uygun</button>
                <button class="btn-reject" onclick="event.stopPropagation(); window.reviewApp.quickAction('${img.gorsel_id}','uygun_degil')">✗ Red</button>
            </div>
        </div>`;
    }).join('');
}

function updateCardStatus(gorselId, status) {
    const card = document.querySelector(`[data-id="${gorselId}"]`);
    if (!card) return;
    card.className = `image-card status-${status}`;
    const badge = card.querySelector('.card-badge');
    if (badge) {
        badge.className = `card-badge ${status}`;
        badge.textContent = status === 'uygun' ? '✓' : status === 'uygun_degil' ? '✗' : '?';
    }
}

function updateStats() {
    let beklemede = 0, uygun = 0, uygun_degil = 0;
    allImages.forEach(img => {
        const s = getStatus(img.gorsel_id);
        if (s === 'uygun') uygun++;
        else if (s === 'uygun_degil') uygun_degil++;
        else beklemede++;
    });

    const total = allImages.length;
    const incelenen = uygun + uygun_degil;

    const el = (id) => document.getElementById(id);
    const setText = (id, text) => { const e = el(id); if (e) e.textContent = text; };

    setText('stat-beklemede', beklemede);
    setText('stat-uygun', uygun);
    setText('stat-uygun-degil', uygun_degil);
    setText('stat-toplam', total);
    setText('stat-incelenen', incelenen);

    const bar = el('progress-fill');
    if (bar) bar.style.width = total ? (incelenen / total * 100) + '%' : '0%';

    setText('count-all', total);
    setText('count-beklemede', beklemede);
    setText('count-uygun', uygun);
    setText('count-uygun-degil', uygun_degil);
}

// ===== MODAL =====
function openModal(idx) {
    currentModalIndex = idx;
    const img = filteredImages[idx];
    if (!img) return;

    const review = getReview(img.gorsel_id);
    const modal = document.getElementById('modal-overlay');

    document.getElementById('modal-image').src = img.dosya_yolu;
    document.getElementById('modal-image').onerror = function() {
        this.style.display = 'none';
        document.getElementById('modal-placeholder').style.display = 'flex';
    };
    document.getElementById('modal-image').onload = function() {
        this.style.display = 'block';
        document.getElementById('modal-placeholder').style.display = 'none';
    };

    document.getElementById('modal-id').textContent = img.gorsel_id;
    document.getElementById('modal-sinif').textContent = GRADE_LABELS[img.sinif];
    document.getElementById('modal-tur').textContent = img.tur || 'sahne';
    document.getElementById('modal-bolum').textContent = img.bolum_id || '-';

    // Unit & chapter info
    const uniteEl = document.getElementById('modal-unite');
    const bolumEl = document.getElementById('modal-bolum-baslik');
    const odakEl = document.getElementById('modal-odak');

    if (uniteEl) uniteEl.textContent = img._unite_baslik || '-';
    if (bolumEl) bolumEl.textContent = img._bolum_baslik || '-';
    if (odakEl) odakEl.textContent = img._bolum_odak || '-';

    document.getElementById('modal-desc').textContent = img.sahne_aciklamasi_tr || '-';
    document.getElementById('modal-prompt').textContent = img.prompt_en || '-';
    document.getElementById('modal-note').value = review?.not || '';

    document.getElementById('modal-counter').textContent = `${idx + 1} / ${filteredImages.length}`;
    document.getElementById('modal-prev').disabled = idx === 0;
    document.getElementById('modal-next').disabled = idx === filteredImages.length - 1;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
    currentModalIndex = -1;
}

function navigateModal(dir) {
    const newIdx = currentModalIndex + dir;
    if (newIdx >= 0 && newIdx < filteredImages.length) {
        openModal(newIdx);
    }
}

async function modalAction(durum) {
    if (currentModalIndex < 0 || actionBusy) return;
    actionBusy = true;

    const img = filteredImages[currentModalIndex];
    const not = document.getElementById('modal-note').value;
    await setReview(img.gorsel_id, durum, not);
    showToast(durum === 'uygun' ? '✓ Uygun olarak işaretlendi' : '✗ Uygun değil olarak işaretlendi');

    // Auto-advance to next
    if (currentModalIndex < filteredImages.length - 1) {
        navigateModal(1);
    } else {
        closeModal();
    }

    // Release after short delay to prevent key-repeat rapid-fire
    setTimeout(() => { actionBusy = false; }, 300);
}

// ===== QUICK ACTIONS =====
async function quickAction(gorselId, durum) {
    await setReview(gorselId, durum, '');
    showToast(durum === 'uygun' ? '✓ Uygun' : '✗ Red');
}

// ===== RESET =====
function resetAll() {
    if (!confirm('Tüm inceleme verileri sıfırlansın mı? Bu işlem geri alınamaz.')) return;
    reviews = {};
    if (useFirebase && db) {
        db.ref('reviews').remove();
    } else {
        localStorage.removeItem('dkab_reviews');
    }
    applyFilter();
    showToast('Tüm incelemeler sıfırlandı');
}

// ===== EXPORT =====
function exportJSON() {
    const reviewer = document.getElementById('reviewer-name')?.value || 'Anonim';
    let uygunCount = 0, uygunDegilList = [];

    allImages.forEach(img => {
        const s = getStatus(img.gorsel_id);
        if (s === 'uygun') {
            uygunCount++;
        } else if (s === 'uygun_degil') {
            const r = getReview(img.gorsel_id);
            uygunDegilList.push({
                gorsel_id: img.gorsel_id,
                sinif: parseInt(img.sinif),
                bolum_id: img.bolum_id,
                unite_baslik: img._unite_baslik || '',
                bolum_baslik: img._bolum_baslik || '',
                dosya_yolu: img.dosya_yolu,
                tur: img.tur,
                prompt_en: img.prompt_en,
                sahne_aciklamasi_tr: img.sahne_aciklamasi_tr,
                not: r?.not || '',
                onerilen_duzeltme: ''
            });
        }
    });

    const exportData = {
        tarih: new Date().toISOString().split('T')[0],
        reviewer,
        ozet: {
            toplam: allImages.length,
            uygun: uygunCount,
            uygun_degil: uygunDegilList.length,
            beklemede: allImages.length - uygunCount - uygunDegilList.length
        },
        uygun_degil_listesi: uygunDegilList
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dkab_gorsel_inceleme_${exportData.tarih}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(`Export tamamlandı: ${uygunDegilList.length} sorunlu görsel`);
}

function copyExport() {
    const reviewer = document.getElementById('reviewer-name')?.value || 'Anonim';
    let uygunDegilList = [];

    allImages.forEach(img => {
        if (getStatus(img.gorsel_id) === 'uygun_degil') {
            const r = getReview(img.gorsel_id);
            uygunDegilList.push({
                gorsel_id: img.gorsel_id,
                sinif: parseInt(img.sinif),
                not: r?.not || ''
            });
        }
    });

    const text = JSON.stringify(uygunDegilList, null, 2);
    navigator.clipboard.writeText(text).then(() => {
        showToast('Panoya kopyalandı');
    });
}

// ===== TOAST =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== EVENTS =====
function bindEvents() {
    // Grade filter
    document.getElementById('grade-filter')?.addEventListener('change', (e) => {
        currentFilter.grade = e.target.value;
        applyFilter();
    });

    // Status filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter.status = pill.dataset.status;
            applyFilter();
        });
    });

    // Grid card clicks -> open modal
    document.getElementById('image-grid')?.addEventListener('click', (e) => {
        const card = e.target.closest('.image-card');
        if (!card || e.target.closest('.card-actions')) return;
        const idx = parseInt(card.dataset.idx);
        openModal(idx);
    });

    // Modal controls
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
    document.getElementById('modal-prev')?.addEventListener('click', () => navigateModal(-1));
    document.getElementById('modal-next')?.addEventListener('click', () => navigateModal(1));
    document.getElementById('modal-approve')?.addEventListener('click', () => modalAction('uygun'));
    document.getElementById('modal-reject')?.addEventListener('click', () => modalAction('uygun_degil'));

    // Export & Reset
    document.getElementById('btn-export')?.addEventListener('click', exportJSON);
    document.getElementById('btn-copy')?.addEventListener('click', copyExport);
    document.getElementById('btn-reset')?.addEventListener('click', resetAll);

    // Firebase setup
    document.getElementById('btn-firebase')?.addEventListener('click', connectFirebase);
    document.getElementById('btn-local')?.addEventListener('click', useLocalMode);
    document.getElementById('btn-settings')?.addEventListener('click', showSetup);

    // Reviewer name persistence
    document.getElementById('reviewer-name')?.addEventListener('change', (e) => {
        localStorage.setItem('dkab_reviewer_name', e.target.value);
    });

    // Keyboard shortcuts (with debounce via actionBusy flag)
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.repeat) return; // BLOCK key-repeat to prevent rapid-fire

        if (currentModalIndex >= 0) {
            switch (e.key) {
                case 'Escape': closeModal(); break;
                case 'ArrowLeft': navigateModal(-1); break;
                case 'ArrowRight': navigateModal(1); break;
                case 'a': case 'A': modalAction('uygun'); break;
                case 'r': case 'R': modalAction('uygun_degil'); break;
                case 'n': case 'N':
                    e.preventDefault();
                    document.getElementById('modal-note')?.focus();
                    break;
            }
        }
    });
}

// ===== PUBLIC API =====
window.reviewApp = { quickAction, exportJSON, copyExport, resetAll };
