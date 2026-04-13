/* ================================================================
   ISLAM TARIHI ATLASI — Dynasty Explorer
   Collapsible tree view of dynasties and rulers
   ================================================================ */

'use strict';

const DynastyExplorer = {
    data: null,
    allDynasties: [],

    /* ---- Initialize ---- */
    async init() {
        const contentEl = document.getElementById('dynasty-content');
        if (!contentEl) return;

        contentEl.innerHTML = '<div class="loading-spinner"></div>';

        // Try loading dynasties.json, fallback to building from manifests
        this.data = await loadJSON('data/dynasties.json');

        if (this.data) {
            this.allDynasties = Array.isArray(this.data) ? this.data : (this.data.dynasties || []);
        }

        if (this.allDynasties.length === 0) {
            await this.buildFromManifests();
        }

        this.render();
    },

    /* ---- Build dynasties from manifests ---- */
    async buildFromManifests() {
        this.allDynasties = [];

        // Primarily from 'devletler' database
        const manifest = await loadManifest('devletler');
        if (manifest && manifest.entries) {
            for (const entry of manifest.entries) {
                if (entry.type === 'state' || entry.type === 'dynasty') {
                    this.allDynasties.push({
                        name: entry.title,
                        slug: entry.slug,
                        db: 'devletler',
                        dates: formatDate(entry.dates || entry.date_range),
                        summary: entry.summary || '',
                        rulers: entry.rulers || [],
                        type: entry.type
                    });
                }
            }
        }

        // Also check osmanli-tarihi for state entries
        const otManifest = await loadManifest('osmanli-tarihi');
        if (otManifest && otManifest.entries) {
            for (const entry of otManifest.entries) {
                if (entry.type === 'state' || entry.type === 'dynasty') {
                    this.allDynasties.push({
                        name: entry.title,
                        slug: entry.slug,
                        db: 'osmanli-tarihi',
                        dates: formatDate(entry.dates || entry.date_range),
                        summary: entry.summary || '',
                        rulers: entry.rulers || [],
                        type: entry.type
                    });
                }
            }
        }

        // Sort alphabetically
        this.allDynasties.sort((a, b) => turkishCompare(a.name, b.name));
    },

    /* ---- Render dynasty tree ---- */
    render() {
        const contentEl = document.getElementById('dynasty-content');
        if (!contentEl) return;

        if (this.allDynasties.length === 0) {
            contentEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">\u2660</div>
                    <div class="empty-state-title">Hanedan verisi bulunamadi</div>
                    <p class="empty-state-desc">Hanedan verileri henuz yuklenmemis olabilir.</p>
                </div>
            `;
            return;
        }

        contentEl.innerHTML = `
            <div style="margin-bottom:var(--space-lg);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-md)">
                <div class="text-muted" style="font-size:0.9rem">${this.allDynasties.length} devlet/hanedan</div>
                <div class="index-sort">
                    <button class="sort-btn active" data-dsort="alpha" id="dsort-alpha">A-Z</button>
                    <button class="sort-btn" data-dsort="date" id="dsort-date">Tarih</button>
                </div>
            </div>
            <div class="dynasty-tree stagger-children" id="dynasty-tree">
                ${this.allDynasties.map(d => this.renderDynastyNode(d)).join('')}
            </div>
        `;

        // Sort buttons
        document.getElementById('dsort-alpha')?.addEventListener('click', () => {
            this.allDynasties.sort((a, b) => turkishCompare(a.name, b.name));
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('dsort-alpha').classList.add('active');
            this.refreshTree();
        });

        document.getElementById('dsort-date')?.addEventListener('click', () => {
            this.allDynasties.sort((a, b) => {
                const ya = this.extractYear(a) || 9999;
                const yb = this.extractYear(b) || 9999;
                return ya - yb;
            });
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('dsort-date').classList.add('active');
            this.refreshTree();
        });
    },

    /* ---- Render a single dynasty node ---- */
    renderDynastyNode(dynasty) {
        const hasRulers = dynasty.rulers && dynasty.rulers.length > 0;
        const rulerCount = hasRulers ? dynasty.rulers.length : 0;
        const dbInfo = APP.databases[dynasty.db] || {};

        if (hasRulers) {
            return `
                <details class="dynasty-node">
                    <summary>
                        <span class="dynasty-expand-icon" aria-hidden="true">
                            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
                        </span>
                        <span class="dynasty-name">${escapeHtml(dynasty.name)}</span>
                        <span class="dynasty-dates">${escapeHtml(dynasty.dates || '')}</span>
                        ${rulerCount > 0 ? `<span class="dynasty-ruler-count">${rulerCount} hukumdar</span>` : ''}
                    </summary>
                    <div class="dynasty-rulers">
                        ${dynasty.summary ? `<p style="font-size:0.88rem;color:var(--text-400);margin-bottom:var(--space-md);padding-top:var(--space-sm)">${escapeHtml(truncate(dynasty.summary, 200))}</p>` : ''}
                        ${dynasty.rulers.map((ruler, i) => `
                            <div class="dynasty-ruler">
                                <span class="dynasty-ruler-bar" style="background:${dbInfo.color || 'var(--gold-600)'}"></span>
                                <span class="dynasty-ruler-name">
                                    ${ruler.slug && dynasty.db
                                        ? `<a href="/tarih/${dynasty.db}/${ruler.slug}" data-link>${escapeHtml(ruler.name || ruler.title || '')}</a>`
                                        : escapeHtml(ruler.name || ruler.title || `Hukumdar ${i + 1}`)}
                                </span>
                                <span class="dynasty-ruler-dates">${escapeHtml(ruler.dates || ruler.reign || '')}</span>
                            </div>
                        `).join('')}
                        <div style="margin-top:var(--space-md)">
                            <a href="/tarih/${dynasty.db}/${dynasty.slug}" class="btn-secondary" data-link style="font-size:0.85rem;padding:6px 16px">Detayli bilgi &rarr;</a>
                        </div>
                    </div>
                </details>
            `;
        }

        // No rulers - simple link card
        return `
            <div class="dynasty-node">
                <a href="/tarih/${dynasty.db}/${dynasty.slug}" class="dynasty-header" data-link style="text-decoration:none">
                    <span class="dynasty-expand-icon" aria-hidden="true" style="opacity:0.3">
                        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
                    </span>
                    <span class="dynasty-name">${escapeHtml(dynasty.name)}</span>
                    <span class="dynasty-dates">${escapeHtml(dynasty.dates || '')}</span>
                </a>
            </div>
        `;
    },

    /* ---- Refresh tree (after sort) ---- */
    refreshTree() {
        const tree = document.getElementById('dynasty-tree');
        if (!tree) return;
        tree.innerHTML = this.allDynasties.map(d => this.renderDynastyNode(d)).join('');
    },

    /* ---- Extract year from dynasty ---- */
    extractYear(dynasty) {
        const dateStr = dynasty.dates || '';
        const match = dateStr.match(/(\d{3,4})/);
        return match ? parseInt(match[1], 10) : null;
    }
};
