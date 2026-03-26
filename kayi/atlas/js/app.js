/* ============================================================
   Kayı Tarih Atlası — Ana Uygulama
   ============================================================ */

(function() {
  'use strict';

  // ── State ──
  let map, markerCluster;
  let markers = {};
  let routeLayers = [];
  let boundaryLayers = [];
  let activeFilters = { period: 'all', categories: new Set(Object.keys(CATEGORIES)) };
  let currentYear = 1421;
  let isPlaying = false;
  let playInterval = null;

  // ── Map Init ──
  function initMap() {
    map = L.map('map', {
      center: [40.0, 30.0],
      zoom: 6,
      minZoom: 3,
      maxZoom: 15,
      zoomControl: false
    });

    // Zoom control right side
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Tile layers
    const osmLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19
    });

    const terrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; Stamen/Stadia',
      maxZoom: 18
    });

    // Default to terrain for historical feel, fallback to OSM
    terrain.addTo(map);
    terrain.on('tileerror', function() {
      map.removeLayer(terrain);
      osmLight.addTo(map);
    });

    // Marker cluster
    markerCluster = L.markerClusterGroup({
      maxClusterRadius: 40,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount();
        let size = count < 10 ? 'small' : count < 30 ? 'medium' : 'large';
        let dim = size === 'small' ? 30 : size === 'medium' ? 36 : 42;
        return L.divIcon({
          html: '<div>' + count + '</div>',
          className: 'marker-cluster marker-cluster-' + size,
          iconSize: [dim, dim]
        });
      }
    });
    map.addLayer(markerCluster);
  }

  // ── Markers ──
  function createMarker(loc) {
    const cat = CATEGORIES[loc.category];
    const color = cat ? cat.color : '#888';
    const size = loc.category === 'battle' ? 14 : 12;
    const cls = loc.category === 'battle' ? 'custom-marker battle-marker' : 'custom-marker';

    const icon = L.divIcon({
      className: '',
      html: `<div class="${cls}" style="width:${size}px;height:${size}px;background:${color}"></div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });

    const marker = L.marker([loc.lat, loc.lng], { icon });

    // Popup
    const name = loc.name[currentLang] || loc.name.tr;
    const modern = loc.modernName ? (loc.modernName[currentLang] || loc.modernName.tr) : '';
    marker.bindPopup(`
      <div class="popup-title">${name}</div>
      ${modern ? '<div class="popup-subtitle">' + modern + '</div>' : ''}
      <div class="popup-link" onclick="window._openDetail(${loc.id})">Detay &rarr;</div>
    `, { maxWidth: 220 });

    marker.locationId = loc.id;
    markers[loc.id] = marker;
    return marker;
  }

  function addAllMarkers() {
    markerCluster.clearLayers();
    const filtered = filterLocations();
    filtered.forEach(loc => {
      const m = createMarker(loc);
      markerCluster.addLayer(m);
    });
  }

  function filterLocations() {
    return LOCATIONS.filter(loc => {
      // Category filter
      if (!activeFilters.categories.has(loc.category)) return false;
      // Period filter
      if (activeFilters.period !== 'all' && loc.period !== activeFilters.period) return false;
      // Year filter
      if (loc.year && loc.year > currentYear) return false;
      return true;
    });
  }

  // ── Routes ──
  function addRoutes() {
    clearRoutes();
    if (!document.getElementById('layer-routes').checked) return;

    ROUTES.forEach(route => {
      const polyline = L.polyline(route.points, {
        color: route.color,
        weight: route.weight,
        dashArray: route.dashArray,
        opacity: 0.7
      });
      if (route.animated) {
        polyline.getElement && polyline.on('add', function() {
          const el = this.getElement();
          if (el) el.classList.add('animated-route');
        });
      }
      polyline.bindTooltip(route.name[currentLang] || route.name.tr, {
        sticky: true, className: 'route-tooltip'
      });
      polyline.addTo(map);
      routeLayers.push(polyline);
    });
  }

  function clearRoutes() {
    routeLayers.forEach(l => map.removeLayer(l));
    routeLayers = [];
  }

  // ── Boundaries ──
  function addBoundaries() {
    clearBoundaries();
    if (!document.getElementById('layer-boundaries').checked) return;

    // Ottoman boundaries
    BOUNDARIES.ottoman.forEach(b => {
      if (b.year && b.year > currentYear) return;
      // Show the latest boundary that fits
      const poly = L.polygon(b.coords, {
        color: b.color,
        fillColor: b.color,
        fillOpacity: b.opacity,
        weight: 1,
        dashArray: '4,4'
      });
      poly.bindTooltip(b.name[currentLang] || b.name.tr);
      poly.addTo(map);
      boundaryLayers.push(poly);
    });

    // Beyliks
    BOUNDARIES.beyliks.forEach(b => {
      if (currentYear < b.active.start || currentYear > b.active.end) return;
      const poly = L.polygon(b.coords, {
        color: b.color,
        fillColor: b.color,
        fillOpacity: b.opacity,
        weight: 1,
        dashArray: '6,3'
      });
      poly.bindTooltip(b.name[currentLang] || b.name.tr);
      poly.addTo(map);
      boundaryLayers.push(poly);
    });

    // Byzantine
    BOUNDARIES.byzantine.forEach(b => {
      if (b.year > currentYear) return;
      const poly = L.polygon(b.coords, {
        color: b.color,
        fillColor: b.color,
        fillOpacity: b.opacity,
        weight: 1,
        dashArray: '2,4'
      });
      poly.bindTooltip(b.name[currentLang] || b.name.tr);
      poly.addTo(map);
      boundaryLayers.push(poly);
    });
  }

  function clearBoundaries() {
    boundaryLayers.forEach(l => map.removeLayer(l));
    boundaryLayers = [];
  }

  // ── Sidebar: Periods ──
  function buildPeriodFilter() {
    const container = document.getElementById('period-filter');
    // "All" option
    let html = `<div class="period-item active" data-period="all">
      <div class="period-dot" style="background:#888"></div>
      <span data-i18n="filter.all">${t('filter.all')}</span>
    </div>`;

    PERIODS.forEach(p => {
      html += `<div class="period-item" data-period="${p.id}">
        <div class="period-dot" style="background:${p.color}"></div>
        <span>${p[currentLang] || p.tr}</span>
        <span class="period-range">${p.start}–${p.end}</span>
      </div>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.period-item').forEach(el => {
      el.addEventListener('click', () => {
        container.querySelectorAll('.period-item').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        activeFilters.period = el.dataset.period;
        refresh();
      });
    });
  }

  // ── Sidebar: Categories ──
  function buildCategoryFilter() {
    const container = document.getElementById('category-filter');
    let html = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      html += `<div class="cat-chip active" data-cat="${key}" style="color:${cat.color}">
        <span class="chip-dot" style="background:${cat.color}"></span>
        ${cat[currentLang] || cat.tr}
      </div>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.cat-chip').forEach(el => {
      el.addEventListener('click', () => {
        const cat = el.dataset.cat;
        el.classList.toggle('active');
        if (el.classList.contains('active')) {
          activeFilters.categories.add(cat);
        } else {
          activeFilters.categories.delete(cat);
        }
        refresh();
      });
    });
  }

  // ── Sidebar: Sultan Cards ──
  function buildSultanCards() {
    const container = document.getElementById('sultan-cards');
    let html = '';
    SULTANS.forEach(s => {
      html += `<div class="sultan-card" style="border-color:${s.color}" data-sultan="${s.id}">
        <h4>${s.name[currentLang] || s.name.tr}</h4>
        <div class="reign">${s.reign[currentLang] || s.reign.tr}</div>
      </div>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.sultan-card').forEach(el => {
      el.addEventListener('click', () => {
        const sultan = SULTANS.find(s => s.id === el.dataset.sultan);
        if (sultan) openSultanDetail(sultan);
      });
    });
  }

  // ── Legend ──
  function buildLegend() {
    const legend = document.getElementById('map-legend');
    let html = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      html += `<div class="legend-item">
        <span class="legend-dot" style="background:${cat.color}"></span>
        ${cat[currentLang] || cat.tr}
      </div>`;
    });
    legend.innerHTML = html;
  }

  // ── Timeline ──
  function initTimeline() {
    const slider = document.getElementById('timeline-slider');
    const label = document.getElementById('slider-year-label');

    slider.addEventListener('input', () => {
      currentYear = parseInt(slider.value);
      label.textContent = currentYear;
      updateYearLabelPosition();
      refresh();
    });

    // Period band
    buildPeriodBand();

    // Play/pause
    document.getElementById('btn-play').addEventListener('click', togglePlay);
    document.getElementById('btn-reset').addEventListener('click', resetTimeline);
  }

  function buildPeriodBand() {
    const band = document.getElementById('period-band');
    const totalRange = 1421 - 1258;
    let html = '';
    PERIODS.forEach(p => {
      const start = Math.max(p.start, 1258);
      const end = Math.min(p.end, 1421);
      const width = ((end - start) / totalRange * 100);
      html += `<div class="period-band-segment" style="width:${width}%;background:${p.color}" data-label="${p[currentLang] || p.tr}"></div>`;
    });
    band.innerHTML = html;
  }

  function updateYearLabelPosition() {
    const slider = document.getElementById('timeline-slider');
    const label = document.getElementById('slider-year-label');
    const pct = (slider.value - slider.min) / (slider.max - slider.min);
    const offset = pct * slider.offsetWidth;
    label.style.left = offset + 'px';
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('btn-play');
    if (isPlaying) {
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
      const slider = document.getElementById('timeline-slider');
      if (parseInt(slider.value) >= 1421) slider.value = 1258;
      playInterval = setInterval(() => {
        let val = parseInt(slider.value) + 1;
        if (val > 1421) { val = 1421; togglePlay(); }
        slider.value = val;
        currentYear = val;
        document.getElementById('slider-year-label').textContent = val;
        updateYearLabelPosition();
        refresh();
      }, 100);
    } else {
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      clearInterval(playInterval);
    }
  }

  function resetTimeline() {
    if (isPlaying) togglePlay();
    const slider = document.getElementById('timeline-slider');
    slider.value = 1421;
    currentYear = 1421;
    document.getElementById('slider-year-label').textContent = '1421';
    updateYearLabelPosition();
    refresh();
  }

  // ── Detail Panel ──
  window._openDetail = function(id) {
    const loc = LOCATIONS.find(l => l.id === id);
    if (!loc) return;

    const panel = document.getElementById('detail-panel');
    const content = document.getElementById('panel-content');
    const cat = CATEGORIES[loc.category];

    // Find related events
    const relatedEvents = EVENTS.filter(e => e.locations && e.locations.includes(id));

    let html = `
      <div class="panel-header">
        <span class="cat-badge" style="background:${cat.color}">${cat[currentLang] || cat.tr}</span>
        <h2>${loc.name[currentLang] || loc.name.tr}</h2>
        ${loc.historicalNames.length ? '<div class="historical-names">' + loc.historicalNames.join(' / ') + '</div>' : ''}
      </div>

      <div class="panel-meta">
        <div class="panel-meta-row">
          <span class="label">${t('panel.modern')}</span>
          <span>${loc.modernName[currentLang] || loc.modernName.tr}</span>
        </div>
        <div class="panel-meta-row">
          <span class="label">${t('panel.country')}</span>
          <span>${loc.country[currentLang] || loc.country.tr}</span>
        </div>
        <div class="panel-meta-row">
          <span class="label">${t('panel.period')}</span>
          <span>${getPeriodName(loc.period)}</span>
        </div>
        ${loc.year ? `<div class="panel-meta-row">
          <span class="label">${t('panel.year')}</span>
          <span>${loc.year}</span>
        </div>` : ''}
        <div class="panel-meta-row">
          <span class="label">${t('panel.coordinates')}</span>
          <span>${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}</span>
        </div>
      </div>

      <div class="panel-significance">
        ${loc.significance[currentLang] || loc.significance.tr}
      </div>
    `;

    if (relatedEvents.length) {
      html += `<div class="panel-events">
        <h4>${t('panel.events')}</h4>
        ${relatedEvents.map(e => `
          <div class="event-card">
            <div class="event-year">${e.year}</div>
            <h5>${e.title[currentLang] || e.title.tr}</h5>
            <p>${e.desc[currentLang] || e.desc.tr}</p>
          </div>
        `).join('')}
      </div>`;
    }

    content.innerHTML = html;
    panel.classList.remove('hidden');

    // Center map on location
    map.flyTo([loc.lat, loc.lng], 10, { duration: 0.8 });
  };

  function openSultanDetail(sultan) {
    const panel = document.getElementById('detail-panel');
    const content = document.getElementById('panel-content');

    // Find events for this period
    const periodEvents = EVENTS.filter(e => e.period === sultan.id);

    let html = `
      <div class="panel-header">
        <span class="cat-badge" style="background:${sultan.color}">${t('sultans.title')}</span>
        <h2>${sultan.name[currentLang] || sultan.name.tr}</h2>
        <div class="historical-names">${sultan.title[currentLang] || sultan.title.tr}</div>
      </div>

      <div class="panel-meta">
        <div class="panel-meta-row">
          <span class="label">${t('sultans.reign')}</span>
          <span>${sultan.reign[currentLang] || sultan.reign.tr}</span>
        </div>
        <div class="panel-meta-row">
          <span class="label">${t('sultans.capital')}</span>
          <span>${sultan.capital[currentLang] || sultan.capital.tr}</span>
        </div>
      </div>

      <div class="panel-significance">
        ${sultan.desc[currentLang] || sultan.desc.tr}
      </div>
    `;

    if (periodEvents.length) {
      html += `<div class="panel-events">
        <h4>${t('panel.events')}</h4>
        ${periodEvents.map(e => `
          <div class="event-card">
            <div class="event-year">${e.year}</div>
            <h5>${e.title[currentLang] || e.title.tr}</h5>
            <p>${e.desc[currentLang] || e.desc.tr}</p>
          </div>
        `).join('')}
      </div>`;
    }

    content.innerHTML = html;
    panel.classList.remove('hidden');
  }

  function getPeriodName(periodId) {
    const p = PERIODS.find(p => p.id === periodId);
    return p ? (p[currentLang] || p.tr) : periodId;
  }

  // ── Search ──
  function initSearch() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      if (q.length < 2) { results.classList.add('hidden'); return; }

      const matches = LOCATIONS.filter(loc => {
        const name = (loc.name.tr + ' ' + loc.name.en + ' ' + loc.historicalNames.join(' ')).toLowerCase();
        return name.includes(q);
      }).slice(0, 10);

      if (!matches.length) {
        results.innerHTML = `<div class="search-result-item" style="color:var(--muted)">${t('no.results')}</div>`;
      } else {
        results.innerHTML = matches.map(loc => {
          const cat = CATEGORIES[loc.category];
          return `<div class="search-result-item" data-id="${loc.id}">
            <span class="result-cat" style="background:${cat.color}"></span>
            ${loc.name[currentLang] || loc.name.tr}
            ${loc.year ? '<span class="result-year">' + loc.year + '</span>' : ''}
          </div>`;
        }).join('');
      }
      results.classList.remove('hidden');

      results.querySelectorAll('.search-result-item[data-id]').forEach(el => {
        el.addEventListener('click', () => {
          window._openDetail(parseInt(el.dataset.id));
          results.classList.add('hidden');
          input.value = '';
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) results.classList.add('hidden');
    });
  }

  // ── Theme ──
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    document.getElementById('theme-toggle').addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ── Lang ──
  function initLang() {
    document.getElementById('lang-toggle').addEventListener('click', () => {
      toggleLang();
      rebuildUI();
    });
  }

  // ── Layer toggles ──
  function initLayerToggles() {
    ['layer-cities', 'layer-battles', 'layer-routes', 'layer-boundaries'].forEach(id => {
      document.getElementById(id).addEventListener('change', refresh);
    });
  }

  // ── Mobile sidebar ──
  function initMobileSidebar() {
    const toggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    // Close on map click
    map.on('click', () => sidebar.classList.remove('open'));
  }

  // ── Panel close ──
  function initPanelClose() {
    document.getElementById('panel-close').addEventListener('click', () => {
      document.getElementById('detail-panel').classList.add('hidden');
    });
  }

  // ── Refresh all map layers ──
  function refresh() {
    const showCities = document.getElementById('layer-cities').checked;
    const showBattles = document.getElementById('layer-battles').checked;

    // Temporarily adjust categories based on layer toggles
    if (!showCities) {
      ['migration', 'core', 'bursa_region', 'rumeli', 'beylik', 'istanbul'].forEach(c => {
        activeFilters.categories.delete(c);
      });
    }
    if (!showBattles) {
      activeFilters.categories.delete('battle');
    }

    addAllMarkers();
    addRoutes();
    addBoundaries();

    // Restore categories from chips
    document.querySelectorAll('.cat-chip.active').forEach(el => {
      activeFilters.categories.add(el.dataset.cat);
    });
  }

  // ── Rebuild UI on lang change ──
  function rebuildUI() {
    buildPeriodFilter();
    buildCategoryFilter();
    buildSultanCards();
    buildLegend();
    buildPeriodBand();
    addAllMarkers();
    addRoutes();
    addBoundaries();
    // Update i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
  }

  // ── Init ──
  function init() {
    initMap();
    buildPeriodFilter();
    buildCategoryFilter();
    buildSultanCards();
    buildLegend();
    initTimeline();
    initSearch();
    initTheme();
    initLang();
    initLayerToggles();
    initMobileSidebar();
    initPanelClose();

    addAllMarkers();
    addRoutes();
    addBoundaries();

    // Initial year label position
    requestAnimationFrame(updateYearLabelPosition);
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
