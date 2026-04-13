/* ================================================================
   ISLAM TARIHI ATLASI — Client-side Search Engine
   Loads search-index.json, provides fast full-text search
   with Turkish character normalization
   ================================================================ */

'use strict';

const SearchEngine = {
    index: null,
    entries: null,
    loaded: false,
    loading: false,

    /* ---- Load search index ---- */
    async load() {
        if (this.loaded || this.loading) return;
        this.loading = true;

        try {
            // Try loading the pre-built search index
            const data = await loadJSON('data/search-index.json');
            if (data && data.entries) {
                this.entries = data.entries;
                this.buildIndex();
                this.loaded = true;
            } else {
                // Fallback: build index from manifests
                await this.buildFromManifests();
            }
        } catch (err) {
            console.warn('Search index yuklenemedi, manifest verileri kullaniliyor:', err);
            await this.buildFromManifests();
        }

        this.loading = false;
    },

    /* ---- Build index from manifests (fallback) ---- */
    async buildFromManifests() {
        const allEntries = [];
        const dbs = Object.keys(APP.databases);

        for (const db of dbs) {
            try {
                const manifest = await loadManifest(db);
                if (manifest && manifest.entries) {
                    for (const entry of manifest.entries) {
                        allEntries.push({
                            slug: entry.slug,
                            title: entry.title || '',
                            summary: entry.summary || '',
                            type: entry.type || '',
                            db: db,
                            dates: entry.dates || null,
                        });
                    }
                }
            } catch (e) {
                console.warn(`Manifest yuklenemedi: ${db}`, e);
            }
        }

        this.entries = allEntries;
        this.buildIndex();
        this.loaded = true;
    },

    /* ---- Build inverted index for fast lookup ---- */
    buildIndex() {
        this.index = new Map();

        for (let i = 0; i < this.entries.length; i++) {
            const entry = this.entries[i];
            const text = `${entry.title} ${entry.summary}`.toLowerCase();
            const tokens = this.tokenize(text);
            const seen = new Set();

            for (const token of tokens) {
                if (token.length < 2) continue;
                if (seen.has(token)) continue;
                seen.add(token);

                // Add token to index
                if (!this.index.has(token)) {
                    this.index.set(token, []);
                }
                this.index.get(token).push(i);

                // Also add normalized version
                const norm = this.normalize(token);
                if (norm !== token) {
                    if (!this.index.has(norm)) {
                        this.index.set(norm, []);
                    }
                    this.index.get(norm).push(i);
                }
            }
        }
    },

    /* ---- Tokenize text ---- */
    tokenize(text) {
        return text
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, ' ')
            .split(/\s+/)
            .filter(t => t.length >= 2);
    },

    /* ---- Normalize Turkish characters ---- */
    normalize(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .replace(/\u00e7/g, 'c')
            .replace(/\u011f/g, 'g')
            .replace(/\u0131/g, 'i')
            .replace(/\u00f6/g, 'o')
            .replace(/\u015f/g, 's')
            .replace(/\u00fc/g, 'u')
            .replace(/\u00e2/g, 'a')
            .replace(/\u00ee/g, 'i')
            .replace(/\u00fb/g, 'u');
    },

    /* ---- Search entries ---- */
    search(query, filters = {}) {
        if (!this.loaded || !this.entries) return [];

        const queryTokens = this.tokenize(query.toLowerCase());
        if (queryTokens.length === 0) return [];

        // Find matching entry indices for each token
        const tokenMatches = queryTokens.map(token => {
            const matches = new Set();

            // Exact token lookup
            const exact = this.index.get(token);
            if (exact) exact.forEach(i => matches.add(i));

            // Normalized lookup
            const norm = this.normalize(token);
            const normMatches = this.index.get(norm);
            if (normMatches) normMatches.forEach(i => matches.add(i));

            // Prefix search for short queries
            if (token.length >= 3) {
                for (const [key, indices] of this.index) {
                    if (key.startsWith(token) || key.startsWith(norm)) {
                        indices.forEach(i => matches.add(i));
                    }
                }
            }

            return matches;
        });

        // Intersect results (AND logic for multi-word queries)
        let resultIndices;
        if (tokenMatches.length === 1) {
            resultIndices = tokenMatches[0];
        } else {
            resultIndices = tokenMatches[0];
            for (let i = 1; i < tokenMatches.length; i++) {
                const next = tokenMatches[i];
                const intersection = new Set();
                for (const idx of resultIndices) {
                    if (next.has(idx)) intersection.add(idx);
                }
                resultIndices = intersection;
            }
        }

        // Convert to entry objects and apply filters
        let results = [...resultIndices].map(i => this.entries[i]).filter(Boolean);

        // Apply database filter
        if (filters.databases && filters.databases.length > 0) {
            const dbSet = new Set(filters.databases);
            results = results.filter(e => dbSet.has(e.db));
        }

        // Apply type filter
        if (filters.types && filters.types.length > 0) {
            const typeSet = new Set(filters.types);
            results = results.filter(e => typeSet.has(e.type));
        }

        // Score and sort
        results = results.map(entry => {
            let score = 0;
            const titleLower = (entry.title || '').toLowerCase();
            const queryLower = query.toLowerCase();

            // Exact title match
            if (titleLower === queryLower) score += 100;
            // Title starts with query
            else if (titleLower.startsWith(queryLower)) score += 50;
            // Title contains query
            else if (titleLower.includes(queryLower)) score += 25;

            // Normalized match
            const titleNorm = this.normalize(titleLower);
            const queryNorm = this.normalize(queryLower);
            if (titleNorm === queryNorm) score += 80;
            else if (titleNorm.startsWith(queryNorm)) score += 40;
            else if (titleNorm.includes(queryNorm)) score += 20;

            // Word match bonus
            for (const token of queryTokens) {
                if (titleLower.includes(token)) score += 10;
                if ((entry.summary || '').toLowerCase().includes(token)) score += 3;
            }

            return { ...entry, score };
        });

        results.sort((a, b) => b.score - a.score);

        return results.slice(0, 50);
    }
};
