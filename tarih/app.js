/* ================================================================
   ISLAM TARIHI ATLASI — Core SPA Engine
   Router, data loading, page rendering, utilities
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   Global State
   ---------------------------------------------------------------- */
const APP = {
    basePath: '/tarih/',
    catalog: null,
    manifests: {},
    currentPage: null,
    currentRoute: null,
    cache: new Map(),
    cacheLimit: 100,
    searchIndex: null,
    isTransitioning: false,

    /* Database metadata */
    databases: {
        'peygamberler': {
            name: 'Peygamberler Tarihi',
            shortName: 'Peygamberler',
            desc: "Hazret-i Adem'den Hazret-i Muhammed'e peygamberler tarihi",
            volumes: 6,
            color: '#6ee7b7',
            icon: '\u2728',
            badgeClass: 'db-badge-peygamberler'
        },
        'bilim-adamlari': {
            name: 'Musluman Bilim Adamlari',
            shortName: 'Bilim Adamlari',
            desc: 'Astronomi, tip, matematik ve daha fazlasinda oncu bilim insanlari',
            volumes: 2,
            color: '#93c5fd',
            icon: '\u2606',
            badgeClass: 'db-badge-bilim-adamlari'
        },
        'ansiklopedi': {
            name: 'Islam Tarihi Ansiklopedisi',
            shortName: 'Ansiklopedi',
            desc: 'Kapsamli Islam tarihi ansiklopedisi',
            volumes: 10,
            color: '#fbbf24',
            icon: '\u25C7',
            badgeClass: 'db-badge-ansiklopedi'
        },
        'kultur': {
            name: 'Osmanli Kultur Medeniyeti',
            shortName: 'Kultur',
            desc: 'Osmanli kultur ve medeniyet kavramlari',
            volumes: 2,
            color: '#fdba74',
            icon: '\u2740',
            badgeClass: 'db-badge-kultur'
        },
        'devletler': {
            name: 'Turk Islam Devletleri',
            shortName: 'Devletler',
            desc: "Abbasilerden Osmanlilara Islam devletleri",
            volumes: 2,
            color: '#c084fc',
            icon: '\u2660',
            badgeClass: 'db-badge-devletler'
        },
        'osmanli-tarihi': {
            name: 'Osmanli Tarihi Ansiklopedisi',
            shortName: 'Osmanli Tarihi',
            desc: 'Osmanli tarihi kisi ve olaylari',
            volumes: 6,
            color: '#fca5a5',
            icon: '\u2736',
            badgeClass: 'db-badge-osmanli-tarihi'
        }
    },

    /* Type metadata */
    types: {
        'person':  { label: 'Kisi',    badgeClass: 'type-badge-scholar',  color: '#93c5fd' },
        'prophet': { label: 'Peygamber', badgeClass: 'type-badge-prophet', color: '#6ee7b7' },
        'state':   { label: 'Devlet',  badgeClass: 'type-badge-state',    color: '#c084fc' },
        'place':   { label: 'Yer',     badgeClass: 'type-badge-place',    color: '#fca5a5' },
        'concept': { label: 'Kavram',  badgeClass: 'type-badge-concept',  color: '#fdba74' },
        'event':   { label: 'Olay',    badgeClass: 'type-badge-event',    color: '#fbbf24' },
        'dynasty': { label: 'Hanedan', badgeClass: 'type-badge-state',    color: '#c084fc' },
        'work':    { label: 'Eser',    badgeClass: 'type-badge-concept',  color: '#fdba74' },
    }
};


/* ----------------------------------------------------------------
   Router
   ---------------------------------------------------------------- */
function getRouteFromPath() {
    const path = window.location.pathname;
    let route = path.replace(APP.basePath, '').replace(/^\/+|\/+$/g, '');
    /* Treat index.html as home (local dev server serves literal files) */
    if (route === 'index.html' || route.startsWith('index.html?')) route = '';
    return route;
}

function navigate(path, replace = false) {
    if (APP.isTransitioning) return;
    const fullPath = path.startsWith('/') ? path : APP.basePath + path;
    if (replace) {
        history.replaceState(null, '', fullPath);
    } else {
        history.pushState(null, '', fullPath);
    }
    handleRoute();
}

async function handleRoute() {
    const route = getRouteFromPath();
    if (route === APP.currentRoute && APP.currentPage) return;
    APP.currentRoute = route;

    const segments = route.split('/').filter(Boolean);
    const page = segments[0] || '';
    const slug = segments[1] || '';

    updateActiveNav(page);

    await transitionPage(async () => {
        switch (page) {
            case '':
            case 'anasayfa':
            case 'index.html':
                await renderHome();
                break;
            case 'arama':
                await renderSearch(slug || getSearchParam());
                break;
            case 'harita':
                await renderMap();
                break;
            case 'kronoloji':
                await renderTimeline();
                break;
            case 'hanedanlar':
                await renderDynasties();
                break;
            case 'hakkinda':
                renderAbout();
                break;
            case 'peygamberler':
            case 'bilim-adamlari':
            case 'ansiklopedi':
            case 'kultur':
            case 'devletler':
            case 'osmanli-tarihi':
                if (slug) {
                    await renderEntry(page, slug);
                } else {
                    await renderDbIndex(page);
                }
                break;
            default:
                render404();
                break;
        }
    });

    APP.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function getSearchParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
}


/* ----------------------------------------------------------------
   Page Transitions
   ---------------------------------------------------------------- */
async function transitionPage(renderFn) {
    if (APP.isTransitioning) return;
    const app = document.getElementById('app');
    APP.isTransitioning = true;
    try {
        // Fade out
        app.classList.remove('page-transition-active');
        app.classList.add('page-transition-exit');

        await sleep(150);

        // Render new content
        await renderFn();

        // Fade in
        app.classList.remove('page-transition-exit');
        app.classList.add('page-transition-enter');

        // Force reflow
        void app.offsetHeight;

        app.classList.remove('page-transition-enter');
        app.classList.add('page-transition-active');
    } finally {
        APP.isTransitioning = false;
    }
}


/* ----------------------------------------------------------------
   Data Loading
   ---------------------------------------------------------------- */
async function loadJSON(path) {
    const url = path.startsWith('http') ? path : APP.basePath + path;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
        return await res.json();
    } catch (err) {
        console.error('Veri yuklenemedi:', url, err);
        return null;
    }
}

async function loadCatalog() {
    if (APP.catalog) return APP.catalog;
    APP.catalog = await loadJSON('data/catalog.json');
    return APP.catalog;
}

async function loadManifest(db) {
    if (APP.manifests[db]) return APP.manifests[db];
    const raw = await loadJSON(`data/${db}/manifest.json`);
    if (!raw) return null;
    /* Normalize: pipeline outputs a plain array, but app expects {entries:[]} */
    const manifest = Array.isArray(raw) ? { entries: raw } : raw;
    APP.manifests[db] = manifest;
    return manifest;
}

async function loadEntry(db, slug) {
    const cacheKey = `${db}/${slug}`;
    if (APP.cache.has(cacheKey)) return APP.cache.get(cacheKey);
    const entry = await loadJSON(`data/${db}/${slug}.json`);
    if (entry) {
        if (APP.cache.size >= APP.cacheLimit) {
            const firstKey = APP.cache.keys().next().value;
            APP.cache.delete(firstKey);
        }
        APP.cache.set(cacheKey, entry);
    }
    return entry;
}


/* ----------------------------------------------------------------
   Render: Home Page
   ---------------------------------------------------------------- */
async function renderHome() {
    const catalog = await loadCatalog();
    const app = document.getElementById('app');

    const dbEntries = {
        'peygamberler': 79,
        'bilim-adamlari': 127,
        'ansiklopedi': 1717,
        'kultur': 178,
        'devletler': 95,
        'osmanli-tarihi': 569
    };

    // If catalog is loaded, use actual counts
    if (catalog && catalog.databases) {
        for (const [key, db] of Object.entries(catalog.databases)) {
            if (db.count) dbEntries[key] = db.count;
        }
    }

    const totalEntries = Object.values(dbEntries).reduce((a, b) => a + b, 0);

    app.innerHTML = `
        <!-- HERO -->
        <section class="hero-section pattern-bg">
            <div class="hero-content">
                <div class="hero-ornament" aria-hidden="true">\u2726 \u2726 \u2726</div>
                <h1 class="hero-title">Islam Tarihi Atlasi</h1>
                <p class="hero-subtitle">
                    6 ansiklopedi, ${totalEntries.toLocaleString('tr-TR')}+ madde, 30+ cilt &mdash; Islam tarihinin kapsamli dijital atlasi, tek bir sitede.
                </p>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <span class="hero-stat-number" data-count="${totalEntries}">0</span>
                        <span class="hero-stat-label">Madde</span>
                    </div>
                    <div class="hero-stat">
                        <span class="hero-stat-number" data-count="28">0</span>
                        <span class="hero-stat-label">Cilt</span>
                    </div>
                    <div class="hero-stat">
                        <span class="hero-stat-number" data-count="9000">0</span>
                        <span class="hero-stat-label">Sayfa</span>
                    </div>
                    <div class="hero-stat">
                        <span class="hero-stat-number" data-count="6">0</span>
                        <span class="hero-stat-label">Ansiklopedi</span>
                    </div>
                </div>
                <div class="hero-cta">
                    <a href="/tarih/ansiklopedi" class="btn-primary" data-link><span>Kesfetmeye Basla</span> <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
            <div class="scroll-indicator" role="presentation">
                <span>Asagi kaydir</span>
                <div class="scroll-arrow"></div>
            </div>
        </section>

        <!-- DATABASE CARDS -->
        <section class="content-section section-decorated">
            <div class="section-header">
                <h2>Ansiklopediler</h2>
                <p>6 farkli kaynaktan derlenip dijitallestirilen kapsamli Islam tarihi kutuphanesi</p>
            </div>
            <div class="arabesque-divider"></div>
            <div class="section-grid stagger-children">
                ${renderDbCards(dbEntries)}
            </div>
        </section>

        <!-- QUICK STATS -->
        <section class="content-section">
            <div class="gold-separator gold-separator-wide"></div>
            <div class="stats-row" id="home-stats">
                <div class="stat-item">
                    <div class="stat-number" data-count="${totalEntries}">0</div>
                    <div class="stat-label">Toplam Madde</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" data-count="6">0</div>
                    <div class="stat-label">Ansiklopedi</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" data-count="28">0</div>
                    <div class="stat-label">Cilt</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" data-count="9000">0</div>
                    <div class="stat-label">Sayfa</div>
                </div>
            </div>
        </section>

        <!-- CTA: MAP -->
        <section class="cta-section pattern-bg">
            <h2>Haritada Kesfet</h2>
            <p class="text-muted mt-sm mb-lg" style="max-width:500px;margin-left:auto;margin-right:auto;">
                Islam dunyasinin cografyasini interaktif haritada inceleyin.
            </p>
            <a href="/tarih/harita" class="btn-secondary" data-link>Haritayi Ac &rarr;</a>
        </section>
    `;

    initCounterAnimations();
}

function renderDbCards(dbEntries) {
    return Object.entries(APP.databases).map(([key, db]) => {
        const count = dbEntries[key] || 0;
        return `
            <a href="/tarih/${key}" class="db-card" data-db="${key}" data-link>
                <div class="db-card-icon" style="color:${db.color}">${db.icon}</div>
                <div class="db-card-title">${escapeHtml(db.name)}</div>
                <div class="db-card-desc">${escapeHtml(db.desc)}</div>
                <div class="db-card-meta">
                    <span><strong>${count}</strong> madde</span>
                    <span><strong>${db.volumes}</strong> cilt</span>
                </div>
                <div class="db-card-link">Kesfet <span aria-hidden="true">&rarr;</span></div>
            </a>
        `;
    }).join('');
}


/* ----------------------------------------------------------------
   Render: Database Index
   ---------------------------------------------------------------- */
async function renderDbIndex(db) {
    const app = document.getElementById('app');
    const dbInfo = APP.databases[db];
    if (!dbInfo) { render404(); return; }

    app.innerHTML = `<div class="page-loading"><div class="loading-spinner"></div><div class="page-loading-text">Yukleniyor...</div></div>`;

    const manifest = await loadManifest(db);
    if (!manifest) {
        app.innerHTML = `<div class="empty-state"><div class="empty-state-icon">\u26A0</div><div class="empty-state-title">Veri yuklenemedi</div><p class="empty-state-desc">Lutfen daha sonra tekrar deneyin.</p></div>`;
        return;
    }

    const entries = manifest.entries || [];
    const types = [...new Set(entries.map(e => e.type).filter(Boolean))];

    // Collect first letters for alpha bar
    const turkishAlpha = 'A B C \u00C7 D E F G \u011E H I \u0130 J K L M N O \u00D6 P R S \u015E T U \u00DC V Y Z'.split(' ');
    const availableLetters = new Set(entries.map(e => {
        const first = (e.title || '').charAt(0).toUpperCase();
        return turkishNormChar(first);
    }));

    app.innerHTML = `
        <div class="db-index-page">
            <div class="db-index-header">
                <h1 class="db-index-title" style="color:${dbInfo.color}">${escapeHtml(dbInfo.name)}</h1>
                <p class="db-index-desc">${escapeHtml(dbInfo.desc)}</p>
                <div class="db-index-stats">
                    <span><strong>${entries.length}</strong> madde</span>
                    <span><strong>${dbInfo.volumes}</strong> cilt</span>
                </div>
            </div>

            <!-- Alpha bar -->
            <div class="alpha-bar" id="alpha-bar">
                <button class="alpha-btn active" data-letter="all">Tumu</button>
                ${turkishAlpha.map(l => `<button class="alpha-btn ${availableLetters.has(l) ? '' : 'disabled'}" data-letter="${l}">${l}</button>`).join('')}
            </div>

            <!-- Controls -->
            <div class="index-controls">
                <div class="search-filters" id="type-filters">
                    ${types.map(t => {
                        const typeInfo = APP.types[t] || APP.types['person'];
                        return `<button class="filter-chip" data-type="${t}"><span class="${typeInfo.badgeClass}" style="width:6px;height:6px;border-radius:50%;display:inline-block;"></span> ${typeInfo.label}</button>`;
                    }).join('')}
                </div>
                <div class="index-sort">
                    <button class="sort-btn active" data-sort="alpha">A-Z</button>
                    <button class="sort-btn" data-sort="date">Tarih</button>
                </div>
            </div>

            <!-- Entry grid -->
            <div class="entry-grid" id="entry-grid"></div>

            <!-- Load more -->
            <div id="load-more-sentinel" style="height:1px;"></div>
        </div>
    `;

    // State
    let currentLetter = 'all';
    let currentType = null;
    let currentSort = 'alpha';
    let displayCount = 50;

    function getFiltered() {
        let filtered = [...entries];
        if (currentLetter !== 'all') {
            filtered = filtered.filter(e => {
                const first = turkishNormChar((e.title || '').charAt(0).toUpperCase());
                return first === currentLetter;
            });
        }
        if (currentType) {
            filtered = filtered.filter(e => e.type === currentType);
        }
        if (currentSort === 'alpha') {
            filtered.sort((a, b) => turkishCompare(a.title, b.title));
        } else {
            filtered.sort((a, b) => {
                const da = getYear(a.dates) || 0;
                const db2 = getYear(b.dates) || 0;
                return da - db2;
            });
        }
        return filtered;
    }

    function renderList() {
        const filtered = getFiltered();
        const grid = document.getElementById('entry-grid');
        if (!grid) return;
        const toShow = filtered.slice(0, displayCount);
        grid.innerHTML = toShow.map(e => renderEntryCard(e, db)).join('');
        if (filtered.length === 0) {
            grid.innerHTML = `<div class="empty-state"><div class="empty-state-icon">\u2690</div><div class="empty-state-title">Sonuc bulunamadi</div></div>`;
        }
    }

    renderList();

    // Alpha bar click
    document.getElementById('alpha-bar')?.addEventListener('click', e => {
        const btn = e.target.closest('.alpha-btn');
        if (!btn || btn.classList.contains('disabled')) return;
        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLetter = btn.dataset.letter;
        displayCount = 50;
        renderList();
    });

    // Type filters
    document.getElementById('type-filters')?.addEventListener('click', e => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        if (chip.classList.contains('active')) {
            chip.classList.remove('active');
            currentType = null;
        } else {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentType = chip.dataset.type;
        }
        displayCount = 50;
        renderList();
    });

    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            renderList();
        });
    });

    // Infinite scroll
    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel) {
        const observer = new IntersectionObserver((entries_io) => {
            if (entries_io[0].isIntersecting) {
                const filtered = getFiltered();
                if (displayCount < filtered.length) {
                    displayCount += 50;
                    renderList();
                }
            }
        }, { rootMargin: '200px' });
        observer.observe(sentinel);
    }
}


/* ----------------------------------------------------------------
   Render: Entry Page
   ---------------------------------------------------------------- */
async function renderEntry(db, slug) {
    const app = document.getElementById('app');
    const dbInfo = APP.databases[db];
    if (!dbInfo) { render404(); return; }

    app.innerHTML = `<div class="page-loading"><div class="loading-spinner"></div><div class="page-loading-text">Yukleniyor...</div></div>`;

    const entry = await loadEntry(db, slug);
    if (!entry) {
        app.innerHTML = `<div class="empty-state"><div class="empty-state-icon">\u26A0</div><div class="empty-state-title">Madde bulunamadi</div><p class="empty-state-desc">"${escapeHtml(slug)}" bulunamadi.</p><a href="/tarih/${db}" class="btn-secondary mt-lg" data-link>&larr; ${escapeHtml(dbInfo.name)}</a></div>`;
        return;
    }

    const title = entry.title || entry.name || slug;
    const type = entry.type || '';
    const typeInfo = APP.types[type] || {};
    const dates = formatDate(entry.dates || entry.date_range);
    const volume = entry.volume || entry.cilt || '';
    const pages = entry.pages || entry.sayfa || '';

    // Build body (gövde alan adı veritabanına göre değişir: full_text / body_text / article_text / content_text)
    let bodyHtml = '';
    const sections = Array.isArray(entry.sections) ? entry.sections : null;
    const sectionsHaveText = sections && sections.some(s => s && (s.text || s.content));
    const fullText = entry.body || entry.content || entry.full_text || entry.article_text || entry.body_text || entry.content_text || entry.text || '';
    if (sectionsHaveText) {
        bodyHtml = sections.map(s => {
            const h = s.title || s.heading || '';
            const t = s.text || s.content || '';
            return `${h ? `<h2>${escapeHtml(h)}</h2>` : ''}${formatArticleBody(t)}`;
        }).join('');
    } else if (fullText) {
        bodyHtml = formatArticleBody(fullText);
    }

    // Extra fields for specific databases
    let extraHtml = '';

    // bilim-adamlari: disciplines, works, relations
    if (db === 'bilim-adamlari') {
        if (entry.disciplines && entry.disciplines.length) {
            extraHtml += `<div class="article-section open">
                <button class="article-section-toggle">Uzmanlik Alanlari <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
                <div class="article-section-content"><div class="article-section-inner">
                    <div style="display:flex;gap:6px;flex-wrap:wrap">${entry.disciplines.map(d => `<span class="type-badge type-badge-concept">${escapeHtml(d)}</span>`).join('')}</div>
                </div></div></div>`;
        }
        if (entry.works && entry.works.length) {
            extraHtml += `<div class="article-section">
                <button class="article-section-toggle">Eserleri (${entry.works.length}) <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
                <div class="article-section-content"><div class="article-section-inner">
                    <ul style="list-style:disc;padding-left:1.5rem;">${entry.works.map(w => `<li style="margin-bottom:4px;color:var(--text-300)">${escapeHtml(typeof w === 'string' ? w : w.title || w.name || '')}</li>`).join('')}</ul>
                </div></div></div>`;
        }
    }

    // devletler: ruler tables
    if (entry.rulers && entry.rulers.length) {
        extraHtml += `<div class="article-section open">
            <button class="article-section-toggle">Hukumdarlar (${entry.rulers.length}) <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
            <div class="article-section-content"><div class="article-section-inner">
                <table class="data-table"><thead><tr><th>#</th><th>Hukumdar</th><th>Donem</th></tr></thead><tbody>
                    ${entry.rulers.map((r, i) => `<tr><td>${i + 1}</td><td>${escapeHtml(r.name || r.title || '')}</td><td>${escapeHtml(r.dates || r.reign || '')}</td></tr>`).join('')}
                </tbody></table>
            </div></div></div>`;
    }

    // osmanli-tarihi: entry_fields
    if (entry.entry_fields && Object.keys(entry.entry_fields).length) {
        const fields = Object.entries(entry.entry_fields).filter(([k, v]) => v && k !== 'title');
        if (fields.length) {
            extraHtml += `<div class="article-section open">
                <button class="article-section-toggle">Bilgiler <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
                <div class="article-section-content"><div class="article-section-inner">
                    <table class="data-table"><tbody>
                        ${fields.map(([k, v]) => `<tr><th style="width:30%">${escapeHtml(k)}</th><td>${escapeHtml(String(v))}</td></tr>`).join('')}
                    </tbody></table>
                </div></div></div>`;
        }
    }

    // Bibliography
    if (entry.sources || entry.bibliography || entry.kaynaklar) {
        const sources = entry.sources || entry.bibliography || entry.kaynaklar;
        const srcList = Array.isArray(sources) ? sources : [sources];
        extraHtml += `<div class="article-section">
            <button class="article-section-toggle">Kaynaklar <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg></button>
            <div class="article-section-content"><div class="article-section-inner">
                <ul style="list-style:disc;padding-left:1.5rem;font-size:0.9rem;color:var(--text-400)">
                    ${srcList.map(s => `<li style="margin-bottom:4px">${escapeHtml(typeof s === 'string' ? s : s.title || JSON.stringify(s))}</li>`).join('')}
                </ul>
            </div></div></div>`;
    }

    // Build sidebar nav from h2 headings
    const headings = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bodyHtml;
    tempDiv.querySelectorAll('h2').forEach((h, i) => {
        const id = `section-${i}`;
        h.id = id;
        headings.push({ id, text: h.textContent });
    });
    bodyHtml = tempDiv.innerHTML;

    const sidebarHtml = headings.length > 2 ? `
        <aside class="article-sidebar">
            <nav class="sidebar-nav">
                <div class="sidebar-nav-title">Bu maddede</div>
                <ul>
                    ${headings.map(h => `<li><a href="#${h.id}" data-scroll="${h.id}">${escapeHtml(h.text)}</a></li>`).join('')}
                </ul>
            </nav>
        </aside>
    ` : '';

    app.innerHTML = `
        <div class="article-page" ${headings.length > 2 ? '' : 'style="grid-template-columns:1fr"'}>
            <div class="article-content">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                    <a href="/tarih/" data-link>Ana Sayfa</a>
                    <span class="breadcrumb-sep">&rsaquo;</span>
                    <a href="/tarih/${db}" data-link>${escapeHtml(dbInfo.name)}</a>
                    <span class="breadcrumb-sep">&rsaquo;</span>
                    <span class="breadcrumb-current">${escapeHtml(title)}</span>
                </nav>

                <header class="article-header">
                    <h1 class="article-title">${escapeHtml(title)}</h1>
                    <div class="article-meta">
                        ${dbBadge(db)}
                        ${type ? typeBadge(type) : ''}
                        ${dates ? `<span class="article-meta-item">${dates}</span>` : ''}
                        ${volume ? `<span class="article-meta-item">Cilt ${escapeHtml(String(volume))}</span>` : ''}
                        ${pages ? `<span class="article-meta-item">s. ${escapeHtml(String(pages))}</span>` : ''}
                    </div>
                </header>

                <div class="article-body">
                    ${bodyHtml}
                </div>

                ${extraHtml}

                <div class="related-section" id="related-entries"></div>
            </div>
            ${sidebarHtml}
        </div>
    `;

    // Init collapsible sections
    initCollapsibleSections();

    // Init sidebar scroll links
    document.querySelectorAll('[data-scroll]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.scroll);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Load related entries (async)
    loadRelatedEntries(db, slug, entry);
}

async function loadRelatedEntries(db, slug, entry) {
    const container = document.getElementById('related-entries');
    if (!container) return;

    // Try crossrefs or use manifest to find related
    const manifest = await loadManifest(db);
    if (!manifest || !manifest.entries) return;

    let related = [];
    if (entry.related && entry.related.length) {
        related = manifest.entries.filter(e => entry.related.includes(e.slug));
    } else if (entry.crossrefs && entry.crossrefs.length) {
        related = manifest.entries.filter(e => entry.crossrefs.includes(e.slug));
    }

    // Fallback: same type entries
    if (related.length === 0 && entry.type) {
        related = manifest.entries
            .filter(e => e.type === entry.type && e.slug !== slug)
            .slice(0, 6);
    }

    if (related.length === 0) return;

    container.innerHTML = `
        <h3>Ilgili Maddeler</h3>
        <div class="entry-grid" style="margin-top:var(--space-md)">
            ${related.slice(0, 6).map(e => renderEntryCard(e, db)).join('')}
        </div>
    `;
}


/* ----------------------------------------------------------------
   Render: Search
   ---------------------------------------------------------------- */
async function renderSearch(query = '') {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="search-page">
            <h1 style="text-align:center;margin-bottom:var(--space-xl)">Arama</h1>
            <div class="search-input-wrap">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="search" class="search-input" id="search-input"
                    placeholder="Madde adi, kisi, devlet, kavram ara..."
                    value="${escapeHtml(query)}" autocomplete="off" autofocus>
            </div>
            <div class="search-filters" id="search-filters">
                ${Object.entries(APP.databases).map(([key, db]) => `<button class="filter-chip" data-db="${key}"><span style="width:6px;height:6px;border-radius:50%;background:${db.color};display:inline-block;"></span> ${db.shortName}</button>`).join('')}
            </div>
            <div id="search-status" class="search-result-count"></div>
            <div id="search-results" class="search-results"></div>
        </div>
    `;

    const input = document.getElementById('search-input');
    const resultsEl = document.getElementById('search-results');
    const statusEl = document.getElementById('search-status');
    let activeFilters = new Set();
    let debounceTimer = null;

    async function doSearch() {
        const q = input.value.trim();
        if (q.length < 2) {
            resultsEl.innerHTML = '';
            statusEl.textContent = '';
            return;
        }

        // Ensure SearchEngine is loaded
        if (typeof SearchEngine !== 'undefined' && !SearchEngine.loaded) {
            statusEl.textContent = 'Arama dizini yukleniyor...';
            await SearchEngine.load();
        }

        if (typeof SearchEngine !== 'undefined' && SearchEngine.loaded) {
            const filters = activeFilters.size > 0 ? { databases: [...activeFilters] } : {};
            const results = SearchEngine.search(q, filters);
            statusEl.textContent = `${results.length} sonuc bulundu`;
            resultsEl.innerHTML = results.length > 0
                ? results.map(r => renderSearchResult(r, q)).join('')
                : `<div class="empty-state"><div class="empty-state-icon">&#x1F50D;</div><div class="empty-state-title">Sonuc bulunamadi</div><p class="empty-state-desc">"${escapeHtml(q)}" ile eslesen madde bulunamadi. Farkli bir arama terimi deneyin.</p></div>`;
        } else {
            // Fallback: search through catalog
            await fallbackSearch(q, activeFilters, resultsEl, statusEl);
        }
    }

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(doSearch, 150);
    });

    // Filter chips
    document.getElementById('search-filters')?.addEventListener('click', e => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        const db = chip.dataset.db;
        if (chip.classList.contains('active')) {
            chip.classList.remove('active');
            activeFilters.delete(db);
        } else {
            chip.classList.add('active');
            activeFilters.add(db);
        }
        doSearch();
    });

    if (query) doSearch();
}

async function fallbackSearch(query, activeFilters, resultsEl, statusEl) {
    const catalog = await loadCatalog();
    if (!catalog) return;

    const q = query.toLowerCase();
    let results = [];

    const dbs = activeFilters.size > 0 ? [...activeFilters] : Object.keys(APP.databases);
    for (const db of dbs) {
        const manifest = await loadManifest(db);
        if (!manifest || !manifest.entries) continue;
        for (const entry of manifest.entries) {
            const title = (entry.title || '').toLowerCase();
            const summary = (entry.summary || '').toLowerCase();
            if (title.includes(q) || summary.includes(q)) {
                results.push({ ...entry, db });
            }
        }
    }

    // Sort: exact title match first, then starts-with, then includes
    results.sort((a, b) => {
        const at = (a.title || '').toLowerCase();
        const bt = (b.title || '').toLowerCase();
        if (at === q && bt !== q) return -1;
        if (bt === q && at !== q) return 1;
        if (at.startsWith(q) && !bt.startsWith(q)) return -1;
        if (bt.startsWith(q) && !at.startsWith(q)) return 1;
        return 0;
    });

    results = results.slice(0, 50);
    statusEl.textContent = `${results.length} sonuc bulundu`;
    resultsEl.innerHTML = results.length > 0
        ? results.map(r => renderSearchResult(r, query)).join('')
        : `<div class="empty-state"><div class="empty-state-icon">&#x1F50D;</div><div class="empty-state-title">Sonuc bulunamadi</div></div>`;
}

function renderSearchResult(entry, query) {
    const db = entry.db || '';
    const dbInfo = APP.databases[db] || {};
    const type = entry.type || '';
    const title = highlightText(entry.title || '', query);
    const summary = entry.summary ? highlightText(truncate(entry.summary, 150), query) : '';
    const dates = formatDate(entry.dates || entry.date_range);

    return `
        <a href="/tarih/${db}/${entry.slug}" class="entry-card" data-link>
            <div class="entry-card-header">
                <div class="entry-card-title">${title}</div>
                ${dates ? `<div class="entry-card-date">${dates}</div>` : ''}
            </div>
            <div class="entry-card-badges">
                ${dbBadge(db)}
                ${type ? typeBadge(type) : ''}
            </div>
            ${summary ? `<div class="entry-card-summary">${summary}</div>` : ''}
        </a>
    `;
}


/* ----------------------------------------------------------------
   Render: Map (delegates to MapEngine)
   ---------------------------------------------------------------- */
async function renderMap() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="map-page">
            <aside class="map-sidebar" id="map-sidebar">
                <h3 style="margin-bottom:var(--space-md);color:var(--gold-300)">Harita Filtreleri</h3>
                <div id="map-filters"></div>
            </aside>
            <div class="map-container">
                <div id="map"></div>
            </div>
        </div>
    `;

    if (typeof MapEngine !== 'undefined') {
        await MapEngine.init();
    } else {
        document.getElementById('map').innerHTML = '<div class="page-loading"><div class="loading-spinner"></div><div class="page-loading-text">Harita yukleniyor...</div></div>';
    }
}


/* ----------------------------------------------------------------
   Render: Timeline (delegates to TimelineEngine)
   ---------------------------------------------------------------- */
async function renderTimeline() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="timeline-page">
            <div class="section-header">
                <h1>Kronoloji</h1>
                <p>Islam tarihinin onemli olaylari ve kisileri, kronolojik sirada</p>
            </div>
            <div class="timeline-controls" id="timeline-controls"></div>
            <div id="timeline-content"></div>
        </div>
    `;

    if (typeof TimelineEngine !== 'undefined') {
        await TimelineEngine.init();
    }
}


/* ----------------------------------------------------------------
   Render: Dynasties (delegates to DynastyExplorer)
   ---------------------------------------------------------------- */
async function renderDynasties() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="dynasty-page">
            <div class="section-header">
                <h1>Hanedanlar</h1>
                <p>Islam tarihindeki devletler ve hanedanlar</p>
            </div>
            <div id="dynasty-content"></div>
        </div>
    `;

    if (typeof DynastyExplorer !== 'undefined') {
        await DynastyExplorer.init();
    }
}


/* ----------------------------------------------------------------
   Render: About
   ---------------------------------------------------------------- */
function renderAbout() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="about-page">
            <h1>Hakkinda</h1>
            <div class="gold-separator"></div>
            <p>Islam Tarihi Atlasi, 6 farkli basilmis ansiklopedinin dijitallestirilerek tek bir platformda erisime sunulmasindan olusmustur.</p>

            <h2>Kaynaklar</h2>
            <ul class="about-sources">
                <li><strong>Peygamberler Tarihi</strong> &mdash; 6 cilt</li>
                <li><strong>Musluman Bilim Adamlari</strong> &mdash; 2 cilt</li>
                <li><strong>Islam Tarihi Ansiklopedisi</strong> &mdash; 10 cilt</li>
                <li><strong>Osmanli Kultur Medeniyeti</strong> &mdash; 2 cilt</li>
                <li><strong>Turk Islam Devletleri</strong> &mdash; 2 cilt</li>
                <li><strong>Osmanli Tarihi Ansiklopedisi</strong> &mdash; 6 cilt</li>
            </ul>

            <h2>Proje Hakkinda</h2>
            <p>Bu site, basilmis kaynaklarin dijital ortama aktarilmasiyla olusturulmustur. Maddeler, orijinal metinlere sadik kalinarak hazirlanmistir.</p>
            <p>Harita, kronoloji ve hanedan gorunumleri, verilerdeki cografi ve tarihsel bilgiler kullanilarak otomatik olarak olusturulmaktadir.</p>

            <h2>Teknik Bilgiler</h2>
            <p>Site tamamen istemci tarafinda calisan bir SPA (Single Page Application) olarak gelistirilmistir. Herhangi bir sunucu tarafi islem gerektirmez. Veriler JSON formatinda saklanmakta ve ihtiyac duyuldugunda yuklenmektedir.</p>

            <div class="gold-separator" style="margin-top:var(--space-3xl)"></div>
            <p class="text-center text-muted"><a href="https://raufenc.com" target="_blank" rel="noopener">raufenc.com</a></p>
        </div>
    `;
}


/* ----------------------------------------------------------------
   Render: 404
   ---------------------------------------------------------------- */
function render404() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="empty-state" style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <div class="empty-state-icon" style="font-size:4rem;opacity:0.2">404</div>
            <div class="empty-state-title">Sayfa Bulunamadi</div>
            <p class="empty-state-desc">Aradiginiz sayfa mevcut degil.</p>
            <a href="/tarih/" class="btn-secondary mt-lg" data-link>&larr; Ana Sayfa</a>
        </div>
    `;
}


/* ----------------------------------------------------------------
   Shared Components
   ---------------------------------------------------------------- */
function renderEntryCard(entry, db) {
    const type = entry.type || '';
    const dates = formatDate(entry.dates || entry.date_range);
    const summary = entry.summary ? truncate(entry.summary, 120) : '';

    return `
        <a href="/tarih/${db}/${entry.slug}" class="entry-card" data-link>
            <div class="entry-card-header">
                <div class="entry-card-title">${escapeHtml(entry.title || '')}</div>
                ${dates ? `<div class="entry-card-date">${dates}</div>` : ''}
            </div>
            <div class="entry-card-badges">
                ${type ? typeBadge(type) : ''}
            </div>
            ${summary ? `<div class="entry-card-summary">${escapeHtml(summary)}</div>` : ''}
        </a>
    `;
}


/* ----------------------------------------------------------------
   Utility Functions
   ---------------------------------------------------------------- */
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}

function formatDate(dates) {
    if (!dates) return '';
    if (typeof dates === 'string') return dates;
    if (typeof dates === 'object') {
        const h = dates.hijri || dates.hicri || '';
        const m = dates.miladi || dates.gregorian || dates.ce || '';
        const start = dates.start || dates.birth || dates.dogum || '';
        const end = dates.end || dates.death || dates.olum || '';
        if (start || end) {
            return `${start || '?'}${end ? ' \u2013 ' + end : ''}`;
        }
        if (h && m) return `H. ${h} / M. ${m}`;
        if (h) return `H. ${h}`;
        if (m) return m;
    }
    return String(dates);
}

function getYear(dates) {
    if (!dates) return null;
    if (typeof dates === 'number') return dates;
    const str = formatDate(dates);
    const match = str.match(/(\d{3,4})/);
    return match ? parseInt(match[1], 10) : null;
}

function typeBadge(type) {
    const info = APP.types[type] || { label: type, badgeClass: 'type-badge-default' };
    return `<span class="type-badge ${info.badgeClass}">${escapeHtml(info.label)}</span>`;
}

function dbBadge(db) {
    const info = APP.databases[db];
    if (!info) return '';
    return `<span class="db-badge ${info.badgeClass}">${escapeHtml(info.shortName)}</span>`;
}

function highlightText(text, query) {
    if (!query || !text) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${q})`, 'gi');
    return escaped.replace(regex, '<mark>$1</mark>');
}

function truncate(str, max) {
    if (!str) return '';
    if (str.length <= max) return str;
    return str.substring(0, max).replace(/\s+\S*$/, '') + '\u2026';
}

function formatArticleBody(text) {
    if (!text) return '';
    // Split by double newlines for paragraphs
    return text
        .split(/\n{2,}/)
        .map(p => p.trim())
        .filter(p => p)
        .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
        .join('');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Turkish string utilities */
const turkishCharMap = {
    '\u00C7': 'C', '\u00E7': 'c', '\u011E': 'G', '\u011F': 'g',
    '\u0130': 'I', '\u0131': 'i', '\u00D6': 'O', '\u00F6': 'o',
    '\u015E': 'S', '\u015F': 's', '\u00DC': 'U', '\u00FC': 'u'
};

function turkishNormChar(ch) {
    // Normalize for alphabetical grouping: C-with-cedilla becomes C-with-cedilla group
    // This keeps the Turkish letters distinct
    return ch;
}

function turkishCompare(a, b) {
    const locale = 'tr';
    return (a || '').localeCompare(b || '', locale);
}


/* ----------------------------------------------------------------
   Navigation Helpers
   ---------------------------------------------------------------- */
function updateActiveNav(page) {
    // Desktop nav
    document.querySelectorAll('.nav-links a[data-route]').forEach(a => {
        const route = a.dataset.route;
        a.classList.toggle('active', route === page || (route === '' && (page === '' || page === 'anasayfa')));
    });
    // Mobile nav
    document.querySelectorAll('.mobile-menu-links a[data-route]').forEach(a => {
        const route = a.dataset.route;
        a.classList.toggle('active', route === page || (route === '' && (page === '' || page === 'anasayfa')));
    });
}

function initNav() {
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Dropdown
    const dropdown = document.querySelector('.nav-dropdown');
    const trigger = document.querySelector('.nav-dropdown-trigger');
    if (dropdown && trigger) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
            trigger.setAttribute('aria-expanded', dropdown.classList.contains('open'));
        });
        document.addEventListener('click', () => {
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        });
    }
}

function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = menu?.querySelector('.mobile-menu-overlay');

    if (!btn || !menu) return;

    function toggleMenu() {
        const isOpen = menu.classList.contains('open');
        menu.classList.toggle('open');
        btn.classList.toggle('active');
        btn.setAttribute('aria-expanded', !isOpen);
        menu.setAttribute('aria-hidden', isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    btn.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', toggleMenu);

    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (menu.classList.contains('open')) toggleMenu();
        });
    });
}

function initCollapsibleSections() {
    document.querySelectorAll('.article-section-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.closest('.article-section');
            if (section) section.classList.toggle('open');
        });
    });
}


/* ----------------------------------------------------------------
   Counter Animations
   ---------------------------------------------------------------- */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1500;
    const start = performance.now();
    const suffix = target >= 1000 ? '+' : '';

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString('tr-TR') + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}


/* ----------------------------------------------------------------
   Global Event Delegation: SPA Link Interception
   ---------------------------------------------------------------- */
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // External links
    if (href.startsWith('http') || href.startsWith('//') || link.hasAttribute('target')) return;
    // Hash links
    if (href.startsWith('#')) return;
    // Non-tarih links
    if (!href.startsWith('/tarih')) return;

    e.preventDefault();
    if (href !== window.location.pathname) {
        navigate(href.replace(APP.basePath, ''));
    }
});

window.addEventListener('popstate', () => {
    APP.currentRoute = null; // force re-render
    handleRoute();
});


/* ----------------------------------------------------------------
   Initialization
   ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
    APP.catalog = await loadJSON('data/catalog.json');
    initNav();
    initMobileMenu();
    handleRoute();
});
