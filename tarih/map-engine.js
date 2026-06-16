/* ================================================================
   ISLAM TARIHI ATLASI — Leaflet Map Engine
   Dark-themed interactive map with clustered markers
   ================================================================ */

'use strict';

const MapEngine = {
    map: null,
    markers: null,
    allMarkers: [],
    places: null,
    activeFilters: { databases: new Set(), types: new Set() },
    initialized: false,

    /* ---- Initialize map ---- */
    async init() {
        if (this.initialized && this.map) {
            // If already initialized, just invalidate size
            setTimeout(() => this.map.invalidateSize(), 100);
            return;
        }

        const mapEl = document.getElementById('map');
        if (!mapEl) return;

        // Show loading
        mapEl.innerHTML = '<div class="page-loading" style="height:100%"><div class="loading-spinner"></div><div class="page-loading-text">Harita yukleniyor...</div></div>';

        // Load places data
        this.places = await loadJSON('data/places.json');

        // Clear loading
        mapEl.innerHTML = '';

        // Initialize Leaflet
        this.map = L.map('map', {
            center: [33, 45],
            zoom: 4,
            minZoom: 2,
            maxZoom: 18,
            zoomControl: true,
            attributionControl: true
        });

        // Dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 18
        }).addTo(this.map);

        // Create marker cluster group
        this.markers = L.markerClusterGroup({
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: (cluster) => {
                const count = cluster.getChildCount();
                let size = 'small';
                if (count > 50) size = 'large';
                else if (count > 10) size = 'medium';
                return L.divIcon({
                    html: `<div><span>${count}</span></div>`,
                    className: `marker-cluster marker-cluster-${size}`,
                    iconSize: L.point(40, 40)
                });
            }
        });

        // Add markers
        if (this.places && Array.isArray(this.places)) {
            this.addMarkers(this.places);
        } else if (this.places && this.places.places) {
            this.addMarkers(this.places.places);
        } else {
            // If no places.json, try building from manifests
            await this.buildPlacesFromManifests();
        }

        this.map.addLayer(this.markers);

        // Fit bounds if we have markers
        if (this.allMarkers.length > 0) {
            const group = L.featureGroup(this.allMarkers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }

        // Build filter sidebar
        this.buildFilters();

        this.initialized = true;

        // Fix map size after container is visible
        setTimeout(() => this.map.invalidateSize(), 200);
    },

    /* ---- Add markers from places data ---- */
    addMarkers(places) {
        for (const place of places) {
            if (!place.lat || !place.lng) continue;

            const lat = parseFloat(place.lat);
            const lng = parseFloat(place.lng);
            if (isNaN(lat) || isNaN(lng)) continue;

            const color = this.getMarkerColor(place);
            const entryCount = (place.entries || []).length || 1;
            const radius = Math.max(6, Math.min(14, 6 + Math.log2(entryCount) * 2));

            const marker = L.circleMarker([lat, lng], {
                radius: radius,
                fillColor: color,
                color: color,
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.5,
            });

            marker.placeData = place;
            marker.bindPopup(() => this.createPopup(place), {
                maxWidth: 300,
                minWidth: 200,
                className: 'dark-popup'
            });

            this.allMarkers.push(marker);
            this.markers.addLayer(marker);
        }
    },

    /* ---- Build places from manifests (fallback) ---- */
    async buildPlacesFromManifests() {
        const places = [];
        const dbs = Object.keys(APP.databases);

        for (const db of dbs) {
            const manifest = await loadManifest(db);
            if (!manifest || !manifest.entries) continue;

            for (const entry of manifest.entries) {
                if (entry.lat && entry.lng) {
                    places.push({
                        name: entry.title,
                        lat: entry.lat,
                        lng: entry.lng,
                        type: entry.type || 'place',
                        db: db,
                        entries: [{ slug: entry.slug, title: entry.title, db: db }]
                    });
                } else if (entry.location && entry.location.lat) {
                    places.push({
                        name: entry.title,
                        lat: entry.location.lat,
                        lng: entry.location.lng || entry.location.lon,
                        type: entry.type || 'place',
                        db: db,
                        entries: [{ slug: entry.slug, title: entry.title, db: db }]
                    });
                }
            }
        }

        if (places.length > 0) {
            this.addMarkers(places);
        }
    },

    /* ---- Get marker color based on type/db ---- */
    getMarkerColor(place) {
        if (place.type) {
            const typeInfo = APP.types[place.type];
            if (typeInfo) return typeInfo.color;
        }
        if (place.db) {
            const dbInfo = APP.databases[place.db];
            if (dbInfo) return dbInfo.color;
        }
        return '#d4a853'; // default gold
    },

    /* ---- Create popup content ---- */
    createPopup(place) {
        const entries = place.entries || [];
        let entriesHtml = '';

        if (entries.length > 0) {
            entriesHtml = `
                <div class="map-popup-entries">
                    ${entries.slice(0, 15).map(e => {
                        const id = typeof e === 'string' ? e : (e.id || '');
                        const db = (typeof e === 'object' && e.db) || place.db || Object.keys(APP.databases).find(k => id === k || id.startsWith(k + '-')) || '';
                        const slug = (typeof e === 'object' && e.slug) || (db && id.startsWith(db + '-') ? id.slice(db.length + 1) : id);
                        if (!db || !slug) return '';
                        const label = (typeof e === 'object' && (e.title || e.name)) || slug.replace(/-/g, ' ').replace(/(^|\s)\p{L}/gu, c => c.toLocaleUpperCase('tr'));
                        return `<a href="/tarih/${db}/${slug}" class="map-popup-entry" data-link>${escapeHtml(label)}</a>`;
                    }).join('')}
                    ${entries.length > 15 ? `<div style="padding:4px 0;color:var(--text-500);font-size:0.8rem">...ve ${entries.length - 15} madde daha</div>` : ''}
                </div>
            `;
        }

        return `
            <div class="map-popup-title">${escapeHtml(place.name || '')}</div>
            ${place.description ? `<div style="font-size:0.85rem;color:var(--text-400);margin-bottom:8px">${escapeHtml(truncate(place.description, 100))}</div>` : ''}
            ${entries.length > 0 ? `<div style="font-size:0.8rem;color:var(--text-500);margin-bottom:6px">${entries.length} madde</div>` : ''}
            ${entriesHtml}
        `;
    },

    /* ---- Build filter sidebar ---- */
    buildFilters() {
        const filtersEl = document.getElementById('map-filters');
        if (!filtersEl) return;

        // Collect unique databases and types from markers
        const dbs = new Set();
        const types = new Set();
        for (const marker of this.allMarkers) {
            const p = marker.placeData;
            if (p.db) dbs.add(p.db);
            if (p.type) types.add(p.type);
            if (p.entries) {
                for (const e of p.entries) {
                    if (e.db) dbs.add(e.db);
                }
            }
        }

        filtersEl.innerHTML = `
            <div class="map-filter-group">
                <div class="map-filter-title">Ansiklopediler</div>
                ${[...dbs].map(db => {
                    const info = APP.databases[db];
                    if (!info) return '';
                    return `<button class="map-filter-chip active" data-filter-db="${db}">
                        <span style="width:6px;height:6px;border-radius:50%;background:${info.color};display:inline-block;"></span>
                        ${info.shortName}
                    </button>`;
                }).join('')}
            </div>
            ${types.size > 0 ? `
                <div class="map-filter-group">
                    <div class="map-filter-title">Tur</div>
                    ${[...types].map(type => {
                        const info = APP.types[type] || { label: type, color: '#d4a853' };
                        return `<button class="map-filter-chip active" data-filter-type="${type}">
                            <span style="width:6px;height:6px;border-radius:50%;background:${info.color};display:inline-block;"></span>
                            ${info.label}
                        </button>`;
                    }).join('')}
                </div>
            ` : ''}
            <div style="margin-top:var(--space-lg);font-size:0.8rem;color:var(--text-500);">
                ${this.allMarkers.length} konum goruntuleniyor
            </div>
        `;

        // Filter click handlers
        filtersEl.addEventListener('click', (e) => {
            const chip = e.target.closest('.map-filter-chip');
            if (!chip) return;
            chip.classList.toggle('active');
            this.applyFilters();
        });
    },

    /* ---- Apply filters ---- */
    applyFilters() {
        const activeDbs = new Set();
        const activeTypes = new Set();

        document.querySelectorAll('.map-filter-chip.active[data-filter-db]').forEach(el => {
            activeDbs.add(el.dataset.filterDb);
        });
        document.querySelectorAll('.map-filter-chip.active[data-filter-type]').forEach(el => {
            activeTypes.add(el.dataset.filterType);
        });

        this.markers.clearLayers();
        let visibleCount = 0;

        for (const marker of this.allMarkers) {
            const p = marker.placeData;
            let show = true;

            // DB filter
            if (activeDbs.size > 0) {
                const markerDbs = new Set();
                if (p.db) markerDbs.add(p.db);
                if (p.entries) p.entries.forEach(e => { if (e.db) markerDbs.add(e.db); });
                if (markerDbs.size > 0 && ![...markerDbs].some(d => activeDbs.has(d))) {
                    show = false;
                }
            }

            // Type filter
            if (show && activeTypes.size > 0 && p.type) {
                if (!activeTypes.has(p.type)) show = false;
            }

            if (show) {
                this.markers.addLayer(marker);
                visibleCount++;
            }
        }

        // Update count
        const countEl = document.querySelector('#map-filters > div:last-child');
        if (countEl) {
            countEl.textContent = `${visibleCount} konum goruntuleniyor`;
        }
    },

    /* ---- Destroy map (cleanup) ---- */
    destroy() {
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        this.markers = null;
        this.allMarkers = [];
        this.initialized = false;
    }
};
