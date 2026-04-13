/* ================================================================
   ISLAM TARIHI ATLASI — Timeline Engine
   Century/decade/year drill-down with scroll animations
   ================================================================ */

'use strict';

const TimelineEngine = {
    data: null,
    allItems: [],
    currentView: 'century',
    currentCentury: null,
    activeFilters: { databases: new Set(), types: new Set() },

    /* ---- Initialize ---- */
    async init() {
        const contentEl = document.getElementById('timeline-content');
        const controlsEl = document.getElementById('timeline-controls');
        if (!contentEl) return;

        contentEl.innerHTML = '<div class="loading-spinner"></div>';

        // Try loading timeline.json, fallback to building from manifests
        this.data = await loadJSON('data/timeline.json');
        if (!this.data) {
            await this.buildFromManifests();
        } else {
            this.allItems = this.data.items || this.data.events || this.data || [];
        }

        // Build controls
        if (controlsEl) {
            this.renderControls(controlsEl);
        }

        // Render default view
        this.renderCenturyView();
    },

    /* ---- Build timeline from manifests ---- */
    async buildFromManifests() {
        this.allItems = [];
        const dbs = Object.keys(APP.databases);

        for (const db of dbs) {
            try {
                const manifest = await loadManifest(db);
                if (!manifest || !manifest.entries) continue;

                for (const entry of manifest.entries) {
                    const year = this.extractYear(entry);
                    if (year) {
                        this.allItems.push({
                            title: entry.title || '',
                            slug: entry.slug,
                            db: db,
                            type: entry.type || '',
                            year: year,
                            dates: entry.dates || null,
                            summary: entry.summary || ''
                        });
                    }
                }
            } catch (e) {
                console.warn(`Manifest yuklenemedi: ${db}`, e);
            }
        }

        // Sort by year
        this.allItems.sort((a, b) => a.year - b.year);
    },

    /* ---- Extract year from entry ---- */
    extractYear(entry) {
        if (entry.year) return parseInt(entry.year, 10);

        const dates = entry.dates || entry.date_range;
        if (!dates) return null;

        if (typeof dates === 'number') return dates;
        if (typeof dates === 'string') {
            const match = dates.match(/(\d{3,4})/);
            return match ? parseInt(match[1], 10) : null;
        }
        if (typeof dates === 'object') {
            const start = dates.start || dates.birth || dates.dogum || '';
            const miladi = dates.miladi || dates.gregorian || dates.ce || '';
            const val = start || miladi;
            if (typeof val === 'number') return val;
            if (typeof val === 'string') {
                const match = val.match(/(\d{3,4})/);
                return match ? parseInt(match[1], 10) : null;
            }
        }
        return null;
    },

    /* ---- Render controls ---- */
    renderControls(el) {
        el.innerHTML = `
            <div class="timeline-zoom-controls">
                <button class="timeline-zoom-btn active" data-view="century">Yuzyillar</button>
                <button class="timeline-zoom-btn" data-view="list">Liste</button>
            </div>
            <div class="search-filters">
                ${Object.entries(APP.databases).map(([key, db]) => `
                    <button class="filter-chip active" data-tl-db="${key}">
                        <span style="width:6px;height:6px;border-radius:50%;background:${db.color};display:inline-block;"></span>
                        ${db.shortName}
                    </button>
                `).join('')}
            </div>
        `;

        // View toggle
        el.querySelectorAll('.timeline-zoom-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                el.querySelectorAll('.timeline-zoom-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentView = btn.dataset.view;
                if (this.currentView === 'century') {
                    this.currentCentury = null;
                    this.renderCenturyView();
                } else {
                    this.renderListView();
                }
            });
        });

        // Filter chips
        el.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
                this.updateFilters();
                if (this.currentView === 'century' && !this.currentCentury) {
                    this.renderCenturyView();
                } else if (this.currentCentury) {
                    this.renderCenturyDetail(this.currentCentury);
                } else {
                    this.renderListView();
                }
            });
        });
    },

    /* ---- Update active filters ---- */
    updateFilters() {
        this.activeFilters.databases.clear();
        document.querySelectorAll('.filter-chip.active[data-tl-db]').forEach(el => {
            this.activeFilters.databases.add(el.dataset.tlDb);
        });
    },

    /* ---- Get filtered items ---- */
    getFiltered() {
        let items = [...this.allItems];
        if (this.activeFilters.databases.size > 0) {
            items = items.filter(item => this.activeFilters.databases.has(item.db));
        }
        return items;
    },

    /* ---- Century View ---- */
    renderCenturyView() {
        const contentEl = document.getElementById('timeline-content');
        if (!contentEl) return;

        const items = this.getFiltered();

        // Group by century
        const centuries = new Map();
        for (const item of items) {
            const century = Math.floor(item.year / 100) + 1;
            if (!centuries.has(century)) {
                centuries.set(century, { count: 0, minYear: item.year, maxYear: item.year });
            }
            const c = centuries.get(century);
            c.count++;
            c.minYear = Math.min(c.minYear, item.year);
            c.maxYear = Math.max(c.maxYear, item.year);
        }

        const sorted = [...centuries.entries()].sort((a, b) => a[0] - b[0]);

        if (sorted.length === 0) {
            contentEl.innerHTML = `<div class="empty-state"><div class="empty-state-icon">\u23F3</div><div class="empty-state-title">Tarihsel veri bulunamadi</div></div>`;
            return;
        }

        contentEl.innerHTML = `
            <div class="century-grid stagger-children">
                ${sorted.map(([century, data]) => {
                    const startYear = (century - 1) * 100;
                    const endYear = century * 100;
                    return `
                        <div class="century-card" data-century="${century}" tabindex="0" role="button" aria-label="${century}. yuzyil detaylari">
                            <div class="century-card-number">${century}.</div>
                            <div class="century-card-range">${startYear} \u2013 ${endYear}</div>
                            <div class="century-card-count">${data.count} madde</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        // Click to drill down
        contentEl.querySelectorAll('.century-card').forEach(card => {
            card.addEventListener('click', () => {
                const century = parseInt(card.dataset.century, 10);
                this.currentCentury = century;
                this.renderCenturyDetail(century);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    },

    /* ---- Century Detail (timeline items) ---- */
    renderCenturyDetail(century) {
        const contentEl = document.getElementById('timeline-content');
        if (!contentEl) return;

        const startYear = (century - 1) * 100;
        const endYear = century * 100;
        const items = this.getFiltered().filter(item => item.year >= startYear && item.year < endYear);
        items.sort((a, b) => a.year - b.year);

        contentEl.innerHTML = `
            <div style="margin-bottom:var(--space-xl)">
                <button class="btn-secondary" id="back-to-centuries" style="margin-bottom:var(--space-lg)">&larr; Tum Yuzyillar</button>
                <div class="timeline-century">
                    <div class="timeline-century-number">${century}.</div>
                    <div class="timeline-century-label">Yuzyil (${startYear} \u2013 ${endYear})</div>
                </div>
            </div>
            <div class="timeline-container">
                ${items.length > 0 ? items.map((item, i) => this.renderTimelineItem(item, i)).join('') : '<div class="empty-state"><div class="empty-state-title">Bu yuzyildan madde bulunamadi</div></div>'}
            </div>
        `;

        // Back button
        document.getElementById('back-to-centuries')?.addEventListener('click', () => {
            this.currentCentury = null;
            this.renderCenturyView();
        });

        // Scroll animations
        this.initScrollAnimations();
    },

    /* ---- List View (all items as timeline) ---- */
    renderListView() {
        const contentEl = document.getElementById('timeline-content');
        if (!contentEl) return;

        const items = this.getFiltered().slice(0, 200); // Limit for performance

        contentEl.innerHTML = `
            <div class="timeline-container">
                ${items.map((item, i) => this.renderTimelineItem(item, i)).join('')}
            </div>
            ${this.getFiltered().length > 200 ? '<div class="text-center text-muted mt-lg">Ilk 200 olay goruntuleniyor</div>' : ''}
        `;

        this.initScrollAnimations();
    },

    /* ---- Render a single timeline item ---- */
    renderTimelineItem(item, index) {
        const dbInfo = APP.databases[item.db] || {};
        const typeInfo = APP.types[item.type] || {};
        const dateStr = item.year || formatDate(item.dates);

        return `
            <div class="timeline-item" data-index="${index}">
                <div class="timeline-dot" style="background:${dbInfo.color || 'var(--gold-500)'}"></div>
                <div class="timeline-item-content">
                    <div class="timeline-date">${dateStr}</div>
                    <div class="timeline-item-title">
                        <a href="/tarih/${item.db}/${item.slug}" data-link>${escapeHtml(item.title)}</a>
                    </div>
                    ${item.summary ? `<div class="timeline-item-summary">${escapeHtml(truncate(item.summary, 120))}</div>` : ''}
                    <div class="entry-card-badges" style="margin-top:6px">
                        ${item.db ? dbBadge(item.db) : ''}
                        ${item.type ? typeBadge(item.type) : ''}
                    </div>
                </div>
            </div>
        `;
    },

    /* ---- Scroll animation observer ---- */
    initScrollAnimations() {
        const items = document.querySelectorAll('.timeline-item');
        if (!items.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        items.forEach(item => observer.observe(item));
    }
};
