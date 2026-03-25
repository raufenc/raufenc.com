/* ============================================================
   Tarih Disiplinleri Atlası — Ana Uygulama
   ============================================================ */

(function () {
  'use strict';

  const D = ATLAS_DATA;
  let map, markers = [], markerLayer;
  let activeFilters = { periodId: null, disciplineId: null, civilizationId: null };
  let isPlaying = false, playInterval = null;
  let currentStory = null, storyStep = 0;

  /* ════════════════════════════════════════
     UTILS
     ════════════════════════════════════════ */
  function formatYear(y) {
    if (y < 0) return 'MÖ ' + Math.abs(y);
    return 'MS ' + y;
  }
  function getDiscipline(id) { return D.disciplines.find(d => d.id === id); }
  function el(id) { return document.getElementById(id); }
  function qs(sel, parent) { return (parent || document).querySelector(sel); }
  function qsa(sel, parent) { return (parent || document).querySelectorAll(sel); }

  /* ════════════════════════════════════════
     THEME
     ════════════════════════════════════════ */
  let darkTile, lightTile, currentTile;

  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.documentElement.classList.replace('dark', 'light');

    el('theme-toggle').addEventListener('click', () => {
      const html = document.documentElement;
      const isLight = html.classList.contains('light');
      html.classList.remove('dark', 'light');
      html.classList.add(isLight ? 'dark' : 'light');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      updateMapTile();
    });
  }

  function updateMapTile() {
    if (!map) return;
    const isLight = document.documentElement.classList.contains('light');
    if (currentTile) map.removeLayer(currentTile);
    currentTile = isLight ? lightTile : darkTile;
    currentTile.addTo(map);
  }

  /* ════════════════════════════════════════
     MAP (Leaflet)
     ════════════════════════════════════════ */
  function initMap() {
    map = L.map('map', {
      center: [30, 40],
      zoom: 4,
      minZoom: 2, maxZoom: 12,
      zoomControl: true,
      attributionControl: false
    });

    darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    });
    lightTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    });

    const isLight = document.documentElement.classList.contains('light');
    currentTile = isLight ? lightTile : darkTile;
    currentTile.addTo(map);

    markerLayer = L.markerClusterGroup({
      maxClusterRadius: 40,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: '<div class="cluster-icon">' + count + '</div>',
          className: 'custom-cluster',
          iconSize: [36, 36]
        });
      }
    });
    map.addLayer(markerLayer);

    addClusterStyles();
    renderNodes();
    renderLegend();
  }

  function addClusterStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .custom-cluster { background: transparent !important; }
      .cluster-icon {
        width: 36px; height: 36px; border-radius: 50%;
        background: var(--atlas-gold-glow);
        border: 2px solid var(--atlas-gold);
        color: var(--text); font-size: 13px; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        font-family: var(--font-sans);
      }
    `;
    document.head.appendChild(style);
  }

  function createNodeIcon(node) {
    const disc = getDiscipline(node.discipline);
    const color = disc ? disc.color : '#888';
    const size = node.type === 'Kurum' ? 10 : 14;
    const border = node.type === 'Kurum' ? 'diamond' : 'circle';

    if (node.type === 'Kurum') {
      return L.divIcon({
        html: `<div style="width:${size}px;height:${size}px;background:${color};transform:rotate(45deg);border:2px solid rgba(255,255,255,0.3);box-shadow:0 0 8px ${color}60;"></div>`,
        className: 'node-marker',
        iconSize: [size + 4, size + 4],
        iconAnchor: [(size + 4) / 2, (size + 4) / 2]
      });
    }
    return L.divIcon({
      html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.3);box-shadow:0 0 12px ${color}80;"></div>`,
      className: 'node-marker',
      iconSize: [size + 4, size + 4],
      iconAnchor: [(size + 4) / 2, (size + 4) / 2]
    });
  }

  function renderNodes() {
    markerLayer.clearLayers();
    markers = [];

    const sliderVal = parseInt(el('timeline-slider').value);
    const showCities = el('layer-cities').checked;
    const showInst = el('layer-institutions').checked;

    D.nodes.forEach(node => {
      // Layer filter
      if (node.type === 'Şehir' && !showCities) return;
      if (node.type === 'Kurum' && !showInst) return;

      // Time filter
      if (sliderVal > -9999 && (node.startYear > sliderVal || node.endYear < sliderVal)) return;

      // Discipline filter
      if (activeFilters.disciplineId && node.discipline !== activeFilters.disciplineId) return;

      // Civilization filter
      if (activeFilters.civilizationId && node.civilization !== activeFilters.civilizationId) return;

      const disc = getDiscipline(node.discipline);
      const marker = L.marker([node.lat, node.lon], { icon: createNodeIcon(node) });

      const popupHtml = `
        <h4>${node.title}</h4>
        <span class="popup-discipline" style="background:${disc.color}20;color:${disc.color}">${disc.name}</span>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${node.startYear < 0 ? formatYear(node.startYear) : node.startYear} – ${node.endYear}</div>
        <div class="popup-role">${node.role}</div>
        <div class="popup-detail-btn" data-node-id="${node.id}">Detay</div>
      `;
      marker.bindPopup(popupHtml, { maxWidth: 280 });
      marker.nodeData = node;
      markers.push(marker);
      markerLayer.addLayer(marker);
    });
  }

  function renderLegend() {
    const legend = el('map-legend');
    legend.innerHTML = D.disciplines.map(d =>
      `<div class="legend-item"><span class="legend-dot" style="background:${d.color}"></span>${d.name}</div>`
    ).join('');
  }

  /* ════════════════════════════════════════
     SIDEBAR FILTERS
     ════════════════════════════════════════ */
  function initFilters() {
    // Period list
    const periodList = el('period-list');
    periodList.innerHTML = D.periods.map(p => `
      <div class="filter-item" data-id="${p.id}">
        <span class="dot" style="background:${getDiscipline(getTopDiscipline(p.disciplines)).color}"></span>
        <span>${p.name}</span>
        <span class="range">${p.range}</span>
      </div>
    `).join('');
    periodList.addEventListener('click', e => {
      const item = e.target.closest('.filter-item');
      if (!item) return;
      const id = item.dataset.id;
      if (activeFilters.periodId === id) {
        activeFilters.periodId = null;
        item.classList.remove('active');
      } else {
        qsa('.filter-item', periodList).forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        activeFilters.periodId = id;
        const p = D.periods.find(x => x.id === id);
        if (p) {
          el('timeline-slider').value = Math.round((p.startYear + p.endYear) / 2);
          updateSliderLabel();
        }
      }
      applyFilters();
    });

    // Discipline chips
    const discFilter = el('discipline-filter');
    discFilter.innerHTML = D.disciplines.map(d =>
      `<button class="chip" data-id="${d.id}" style="--chip-color:${d.color}">${d.icon} ${d.name.split('/')[0].split(' ')[0]}</button>`
    ).join('');
    discFilter.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const id = chip.dataset.id;
      if (activeFilters.disciplineId === id) {
        activeFilters.disciplineId = null;
        chip.classList.remove('active');
        chip.style.color = '';
        chip.style.borderColor = '';
      } else {
        qsa('.chip', discFilter).forEach(c => { c.classList.remove('active'); c.style.color = ''; c.style.borderColor = ''; });
        chip.classList.add('active');
        const disc = getDiscipline(id);
        chip.style.color = disc.color;
        chip.style.borderColor = disc.color;
        activeFilters.disciplineId = id;
      }
      applyFilters();
    });

    // Civilization list
    const civList = el('civilization-list');
    civList.innerHTML = D.civilizations.map(c => `
      <div class="filter-item" data-id="${c.id}">
        <span class="dot" style="background:${getDiscipline(getTopDiscipline(c.disciplines)).color}"></span>
        <span>${c.name}</span>
        <span class="range">${c.range}</span>
      </div>
    `).join('');
    civList.addEventListener('click', e => {
      const item = e.target.closest('.filter-item');
      if (!item) return;
      const id = item.dataset.id;
      if (activeFilters.civilizationId === id) {
        activeFilters.civilizationId = null;
        item.classList.remove('active');
      } else {
        qsa('.filter-item', civList).forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        activeFilters.civilizationId = id;
        showCivilizationDetail(id);
      }
      applyFilters();
    });

    // Layer toggles
    el('layer-cities').addEventListener('change', applyFilters);
    el('layer-institutions').addEventListener('change', applyFilters);
  }

  function getTopDiscipline(disciplines) {
    let max = 0, top = 'kultur';
    for (const [k, v] of Object.entries(disciplines)) {
      if (v > max) { max = v; top = k; }
    }
    return top;
  }

  function applyFilters() {
    renderNodes();
    updateStreamgraphHighlight();
    updatePeriodBadge();
  }

  function updatePeriodBadge() {
    const badge = el('active-period-badge');
    const year = parseInt(el('timeline-slider').value);
    // Find matching period
    const p = D.periods.find(p => year >= p.startYear && year <= p.endYear);
    if (p) {
      badge.textContent = `${p.name} — ${p.zeitgeist}`;
    } else if (year <= -9999) {
      badge.textContent = 'Tüm dönemler';
    } else {
      badge.textContent = formatYear(year);
    }
  }

  /* ════════════════════════════════════════
     TIMELINE SLIDER
     ════════════════════════════════════════ */
  function initTimeline() {
    const slider = el('timeline-slider');
    slider.addEventListener('input', () => {
      updateSliderLabel();
      renderNodes();
      updatePeriodBadge();
      updateStreamgraphCursor();
    });

    el('btn-play').addEventListener('click', togglePlay);
    el('btn-reset').addEventListener('click', () => {
      stopPlay();
      slider.value = -10000;
      updateSliderLabel();
      renderNodes();
      updatePeriodBadge();
      updateStreamgraphCursor();
    });

    updateSliderLabel();
    updatePeriodBadge();
  }

  function updateSliderLabel() {
    const val = parseInt(el('timeline-slider').value);
    const label = el('slider-year-label');
    label.textContent = val <= -9999 ? 'Tüm Dönemler' : formatYear(val);
    // Position label
    const slider = el('timeline-slider');
    const pct = (val - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min));
    label.style.left = (pct * 100) + '%';
  }

  function togglePlay() {
    if (isPlaying) { stopPlay(); return; }
    isPlaying = true;
    el('btn-play').classList.add('playing');
    el('btn-play').innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';

    const slider = el('timeline-slider');
    let val = parseInt(slider.value);
    if (val >= 2026) val = -10000;

    playInterval = setInterval(() => {
      val += 50;
      if (val > 2026) { stopPlay(); return; }
      slider.value = val;
      updateSliderLabel();
      renderNodes();
      updatePeriodBadge();
      updateStreamgraphCursor();
    }, 40);
  }

  function stopPlay() {
    isPlaying = false;
    clearInterval(playInterval);
    el('btn-play').classList.remove('playing');
    el('btn-play').innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  }

  /* ════════════════════════════════════════
     STREAMGRAPH (D3)
     ════════════════════════════════════════ */
  let sgXScale, sgYScale;

  function initStreamgraph() {
    const container = el('streamgraph-container');
    const svg = d3.select('#streamgraph');
    const rect = container.getBoundingClientRect();
    const width = rect.width - 32;
    const height = rect.height - 8;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Prepare data: each period as a data point
    const keys = D.disciplines.map(d => d.id);
    const data = D.periods.map(p => {
      const midYear = (p.startYear + p.endYear) / 2;
      const obj = { year: midYear, ...p.disciplines };
      return obj;
    });

    // Scales
    sgXScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, width]);

    const stack = d3.stack()
      .keys(keys)
      .offset(d3.stackOffsetWiggle)
      .order(d3.stackOrderInsideOut);

    const series = stack(data);

    sgYScale = d3.scaleLinear()
      .domain([
        d3.min(series, s => d3.min(s, d => d[0])),
        d3.max(series, s => d3.max(s, d => d[1]))
      ])
      .range([height, 0]);

    const area = d3.area()
      .x(d => sgXScale(d.data.year))
      .y0(d => sgYScale(d[0]))
      .y1(d => sgYScale(d[1]))
      .curve(d3.curveBasis);

    // Draw areas
    svg.selectAll('.stream-area')
      .data(series)
      .join('path')
      .attr('class', 'stream-area')
      .attr('d', area)
      .attr('fill', (d, i) => D.disciplines[i].color)
      .on('click', (event, d) => {
        const disc = D.disciplines.find(x => x.id === d.key);
        if (disc) {
          activeFilters.disciplineId = disc.id;
          applyFilters();
          // Update chip visual
          qsa('.chip', el('discipline-filter')).forEach(c => {
            if (c.dataset.id === disc.id) {
              c.classList.add('active');
              c.style.color = disc.color;
              c.style.borderColor = disc.color;
            } else {
              c.classList.remove('active');
              c.style.color = '';
              c.style.borderColor = '';
            }
          });
        }
      })
      .append('title')
      .text(d => {
        const disc = D.disciplines.find(x => x.id === d.key);
        return disc ? disc.name : '';
      });

    // Add period labels at bottom
    const labelG = svg.append('g').attr('class', 'period-labels');
    D.periods.forEach(p => {
      const midX = sgXScale((p.startYear + p.endYear) / 2);
      if (midX > 0 && midX < width) {
        labelG.append('text')
          .attr('x', midX)
          .attr('y', height - 2)
          .attr('text-anchor', 'middle')
          .attr('class', 'stream-label')
          .text(p.name.length > 12 ? p.name.substring(0, 10) + '…' : p.name);
      }
    });

    // Cursor line
    svg.append('line')
      .attr('id', 'sg-cursor')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', 0).attr('y2', height)
      .attr('stroke', 'var(--atlas-gold)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0);
  }

  function updateStreamgraphCursor() {
    if (!sgXScale) return;
    const val = parseInt(el('timeline-slider').value);
    const cursor = d3.select('#sg-cursor');
    if (val <= -9999) {
      cursor.attr('opacity', 0);
    } else {
      const x = sgXScale(val);
      cursor.attr('x1', x).attr('x2', x).attr('opacity', 0.8);
    }
  }

  function updateStreamgraphHighlight() {
    const areas = d3.selectAll('.stream-area');
    if (activeFilters.disciplineId) {
      areas.attr('opacity', (d) => d.key === activeFilters.disciplineId ? 0.9 : 0.15);
    } else {
      areas.attr('opacity', 0.7);
    }
  }

  /* ════════════════════════════════════════
     RIGHT PANEL — Detail Views
     ════════════════════════════════════════ */
  function showPanel(html) {
    const panel = el('panel-right');
    el('panel-content').innerHTML = html;
    panel.classList.remove('hidden');
  }
  function hidePanel() {
    el('panel-right').classList.add('hidden');
  }

  function showNodeDetail(nodeId) {
    const node = D.nodes.find(n => n.id === nodeId);
    if (!node) return;
    const disc = getDiscipline(node.discipline);

    let html = `
      <h2>${node.title}</h2>
      <div class="panel-subtitle">${node.type} • ${node.startYear < 0 ? formatYear(node.startYear) : node.startYear} – ${node.endYear}</div>

      <div class="panel-section">
        <h4>Baskın Disiplin</h4>
        <span class="tag" style="background:${disc.color}20;color:${disc.color}">${disc.name}</span>
      </div>

      <div class="panel-section">
        <h4>Rol</h4>
        <p>${node.role}</p>
      </div>

      <div class="panel-section">
        <h4>Kurumsal / Temsili Bağ</h4>
        <p>${node.bond}</p>
      </div>
    `;

    // Find related civilization
    const civ = D.civilizations.find(c => c.id === node.civilization);
    if (civ) {
      html += `
        <div class="panel-section">
          <h4>Bağlı Medeniyet</h4>
          <div class="inst-card" style="cursor:pointer" data-civ-id="${civ.id}">
            <h5>${civ.name}</h5>
            <p>${civ.zeitgeist}</p>
          </div>
        </div>
      `;
    }

    // Related institutions at same location
    const related = D.nodes.filter(n => n.id !== nodeId &&
      Math.abs(n.lat - node.lat) < 0.1 && Math.abs(n.lon - node.lon) < 0.1);
    if (related.length) {
      html += `<div class="panel-section"><h4>Aynı Konumdaki Düğümler</h4>`;
      related.forEach(r => {
        const rd = getDiscipline(r.discipline);
        html += `<div class="inst-card" style="cursor:pointer" data-node-id="${r.id}">
          <h5>${r.title}</h5>
          <p>${r.type} • ${rd.name}</p>
        </div>`;
      });
      html += `</div>`;
    }

    showPanel(html);
  }

  function showCivilizationDetail(civId) {
    const civ = D.civilizations.find(c => c.id === civId);
    if (!civ) return;

    const topDisc = getDiscipline(getTopDiscipline(civ.disciplines));

    let html = `
      <h2>${civ.name}</h2>
      <div class="panel-subtitle">${civ.range}</div>

      <div class="panel-section">
        <h4>Zamanın Ruhu</h4>
        <p>${civ.zeitgeist}</p>
      </div>

      <div class="panel-section">
        <h4>Disiplin Dağılımı</h4>
        <div class="radar-container"><svg id="panel-radar"></svg></div>
      </div>

      <div class="panel-section">
        <h4>Baskın Disiplin</h4>
        <span class="tag" style="background:${topDisc.color}20;color:${topDisc.color}">${topDisc.name}</span>
      </div>

      <div class="panel-section">
        <h4>Kurucu Kurumlar</h4>
        <p>${civ.institutions}</p>
      </div>

      <div class="panel-section">
        <h4>İslami Kavram</h4>
        <p style="font-family:var(--font-serif);font-style:italic;">${civ.islamicConcept}</p>
      </div>
    `;

    // Related case study
    const cs = D.cases.find(c => c.id.includes(civId) || civId.includes(c.id.split('-')[0]));
    if (cs) {
      html += `
        <div class="panel-section">
          <h4>Vaka Analizi</h4>
          <div class="wisdom-card">${cs.lesson}</div>
        </div>
      `;
    }

    // Related nodes
    const relNodes = D.nodes.filter(n => n.civilization === civId);
    if (relNodes.length) {
      html += `<div class="panel-section"><h4>Coğrafi Düğümler</h4>`;
      relNodes.forEach(n => {
        const nd = getDiscipline(n.discipline);
        html += `<div class="inst-card" style="cursor:pointer" data-node-id="${n.id}">
          <h5>${n.title}</h5>
          <p>${n.type} • ${nd.name}</p>
        </div>`;
      });
      html += `</div>`;
    }

    showPanel(html);
    // Render radar after panel is visible
    setTimeout(() => drawRadar('panel-radar', civ.disciplines), 50);
  }

  function showPeriodDetail(periodId) {
    const p = D.periods.find(x => x.id === periodId);
    if (!p) return;

    const topDisc = getDiscipline(getTopDiscipline(p.disciplines));

    let html = `
      <h2>${p.name}</h2>
      <div class="panel-subtitle">${p.range}</div>

      <div class="panel-section">
        <h4>Zamanın Ruhu (Zeitgeist)</h4>
        <p>${p.zeitgeist}</p>
      </div>

      <div class="panel-section">
        <h4>Disiplin Dağılımı</h4>
        <div class="radar-container"><svg id="panel-radar"></svg></div>
      </div>

      <div class="panel-section">
        <h4>Baskın Disiplin</h4>
        <span class="tag" style="background:${topDisc.color}20;color:${topDisc.color}">${p.dominant}</span>
      </div>

      <div class="panel-section">
        <h4>Dönüşüm Motoru</h4>
        <p>${p.engine}</p>
      </div>
    `;

    // Find transition wisdom
    const tr = D.transitions.find(t => t.from === periodId || t.to === periodId);
    if (tr) {
      html += `
        <div class="panel-section">
          <h4>Geçiş Hikmeti</h4>
          <div class="wisdom-card">${tr.wisdom}</div>
          <p style="margin-top:8px;font-size:12px;color:var(--text-secondary)"><strong>Kırılma:</strong> ${tr.rupture}</p>
        </div>
      `;
    }

    showPanel(html);
    setTimeout(() => drawRadar('panel-radar', p.disciplines), 50);
  }

  /* ════════════════════════════════════════
     RADAR CHART (D3)
     ════════════════════════════════════════ */
  function drawRadar(svgId, disciplines, size) {
    const svgEl = document.getElementById(svgId);
    if (!svgEl) return;

    const w = size || svgEl.parentElement.clientWidth || 260;
    const h = w;
    const cx = w / 2, cy = h / 2, r = w * 0.38;

    const svg = d3.select('#' + svgId)
      .attr('viewBox', `0 0 ${w} ${h}`);
    svg.selectAll('*').remove();

    const keys = D.disciplines.map(d => d.id);
    const n = keys.length;
    const angleStep = (2 * Math.PI) / n;

    // Grid
    const gridG = svg.append('g');
    [0.2, 0.4, 0.6, 0.8, 1].forEach(level => {
      const pts = keys.map((_, i) => {
        const a = i * angleStep - Math.PI / 2;
        return [cx + r * level * Math.cos(a), cy + r * level * Math.sin(a)];
      });
      gridG.append('polygon')
        .attr('points', pts.map(p => p.join(',')).join(' '))
        .attr('fill', 'none')
        .attr('stroke', 'var(--border)')
        .attr('stroke-width', 0.5);
    });

    // Axes
    keys.forEach((_, i) => {
      const a = i * angleStep - Math.PI / 2;
      gridG.append('line')
        .attr('x1', cx).attr('y1', cy)
        .attr('x2', cx + r * Math.cos(a))
        .attr('y2', cy + r * Math.sin(a))
        .attr('stroke', 'var(--border)')
        .attr('stroke-width', 0.5);
    });

    // Labels
    const labelG = svg.append('g');
    keys.forEach((key, i) => {
      const disc = getDiscipline(key);
      const a = i * angleStep - Math.PI / 2;
      const lx = cx + (r + 18) * Math.cos(a);
      const ly = cy + (r + 18) * Math.sin(a);
      labelG.append('text')
        .attr('x', lx).attr('y', ly)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', 9)
        .attr('font-weight', 500)
        .attr('fill', disc.color)
        .text(disc.name.split('/')[0].split(' ')[0]);
    });

    // Grid percentage labels
    [0.2, 0.4, 0.6, 0.8, 1].forEach(level => {
      const a = -Math.PI / 2;
      gridG.append('text')
        .attr('x', cx + r * level * Math.cos(a) + 4)
        .attr('y', cy + r * level * Math.sin(a) + 2)
        .attr('font-size', 7).attr('fill', 'var(--muted)')
        .text(Math.round(level * 45) + '%');
    });

    // Data shape — fixed scale 0-45 for fair comparison
    const maxVal = 45;
    const pts = keys.map((key, i) => {
      const val = Math.min((disciplines[key] || 0) / maxVal, 1);
      const a = i * angleStep - Math.PI / 2;
      return [cx + r * val * Math.cos(a), cy + r * val * Math.sin(a)];
    });

    svg.append('polygon')
      .attr('points', pts.map(p => p.join(',')).join(' '))
      .attr('fill', 'var(--atlas-gold-soft)')
      .attr('stroke', 'var(--atlas-gold)')
      .attr('stroke-width', 2);

    // Dots
    pts.forEach((pt, i) => {
      const disc = getDiscipline(keys[i]);
      svg.append('circle')
        .attr('cx', pt[0]).attr('cy', pt[1]).attr('r', 4)
        .attr('fill', disc.color)
        .attr('stroke', 'var(--surface)').attr('stroke-width', 1.5);
    });

    // Value labels — only show >= 8% to avoid clutter
    pts.forEach((pt, i) => {
      const val = disciplines[keys[i]] || 0;
      if (val >= 8) {
        const a = i * angleStep - Math.PI / 2;
        const offsetX = Math.cos(a) * 12;
        const offsetY = Math.sin(a) * 12;
        svg.append('text')
          .attr('x', pt[0] + offsetX).attr('y', pt[1] + offsetY - 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', 9).attr('font-weight', 600)
          .attr('fill', 'var(--text)')
          .text(val + '%');
      }
    });
  }

  /* ════════════════════════════════════════
     COMPARE MODAL
     ════════════════════════════════════════ */
  function initCompare() {
    const allItems = [
      ...D.periods.map(p => ({ id: 'p_' + p.id, name: p.name + ' (' + p.range + ')', disciplines: p.disciplines, zeitgeist: p.zeitgeist, type: 'period' })),
      ...D.civilizations.map(c => ({ id: 'c_' + c.id, name: c.name + ' (' + c.range + ')', disciplines: c.disciplines, zeitgeist: c.zeitgeist, type: 'civilization' }))
    ];

    const leftSel = el('compare-left');
    const rightSel = el('compare-right');

    const optHtml = '<option value="">Seçiniz...</option>' +
      '<optgroup label="Dönemler">' +
      D.periods.map(p => `<option value="p_${p.id}">${p.name}</option>`).join('') +
      '</optgroup><optgroup label="Medeniyetler">' +
      D.civilizations.map(c => `<option value="c_${c.id}">${c.name}</option>`).join('') +
      '</optgroup>';

    leftSel.innerHTML = optHtml;
    rightSel.innerHTML = optHtml;

    // Set defaults
    leftSel.value = 'p_islam-altin-cagi';
    rightSel.value = 'c_abbasiler';

    function updateCompare() {
      ['left', 'right'].forEach(side => {
        const val = el('compare-' + side).value;
        const item = allItems.find(x => x.id === val);
        const radarEl = el('radar-' + side);
        const infoEl = el('compare-info-' + side);
        radarEl.innerHTML = '<svg id="compare-radar-' + side + '"></svg>';

        if (item) {
          setTimeout(() => drawRadar('compare-radar-' + side, item.disciplines, 240), 50);
          infoEl.innerHTML = `<p style="font-style:italic;font-family:var(--font-serif);">${item.zeitgeist}</p>`;
        } else {
          infoEl.innerHTML = '';
        }
      });
    }

    leftSel.addEventListener('change', updateCompare);
    rightSel.addEventListener('change', updateCompare);

    el('btn-compare').addEventListener('click', () => {
      el('compare-modal').classList.remove('hidden');
      updateCompare();
    });
    el('compare-close').addEventListener('click', () => {
      el('compare-modal').classList.add('hidden');
    });
    el('compare-modal').addEventListener('click', e => {
      if (e.target === el('compare-modal')) el('compare-modal').classList.add('hidden');
    });
  }

  /* ════════════════════════════════════════
     STORIES (Guided Tour)
     ════════════════════════════════════════ */
  let storyMarker = null;
  let storyPath = null;
  let storyVisitedCoords = [];

  function initStories() {
    el('btn-stories').addEventListener('click', openStoryPicker);
    el('story-close').addEventListener('click', closeStory);
    el('story-prev').addEventListener('click', () => navigateStory(-1));
    el('story-next').addEventListener('click', () => navigateStory(1));

    // Build picker
    const list = el('story-picker-list');
    list.innerHTML = D.stories.map(s => `
      <div class="story-pick-card" data-story-id="${s.id}">
        <h4>${s.title}</h4>
        <p>${s.subtitle}</p>
      </div>
    `).join('');
    list.addEventListener('click', e => {
      const card = e.target.closest('.story-pick-card');
      if (!card) return;
      startStory(card.dataset.storyId);
    });

    // Inject spotlight marker CSS
    const style = document.createElement('style');
    style.textContent = `
      .story-spotlight {
        width: 40px !important; height: 40px !important;
        margin-left: -20px !important; margin-top: -20px !important;
      }
      .story-spotlight-inner {
        width: 40px; height: 40px; border-radius: 50%;
        background: radial-gradient(circle, rgba(200,164,110,0.9) 0%, rgba(200,164,110,0.3) 50%, transparent 70%);
        animation: storyPulse 2s ease-in-out infinite;
        position: relative;
      }
      .story-spotlight-inner::after {
        content: ''; position: absolute; inset: 8px;
        border-radius: 50%; background: var(--atlas-gold);
        box-shadow: 0 0 20px var(--atlas-gold), 0 0 40px rgba(200,164,110,0.5);
      }
      .story-spotlight-label {
        position: absolute; top: -28px; left: 50%; transform: translateX(-50%);
        white-space: nowrap; font-size: 13px; font-weight: 700;
        color: var(--atlas-gold); text-shadow: 0 0 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6);
        font-family: var(--font-serif);
      }
      @keyframes storyPulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.4); opacity: 1; }
      }
      .story-mode #sidebar-left { display: none !important; }
      .story-mode #map-legend { display: none !important; }
      .story-mode #panel-right { display: none !important; }
      .story-mode #timeline-container { height: 0 !important; min-height: 0 !important; overflow: hidden; border: none; }
      .story-mode #atlas-header { display: none !important; }
      .story-mode #atlas-main { height: 100vh; }
      .story-mode #mobile-menu-toggle { display: none !important; }
      .story-path { stroke: var(--atlas-gold); stroke-width: 2; stroke-dasharray: 8 4; fill: none; opacity: 0.6; }
    `;
    document.head.appendChild(style);
  }

  function openStoryPicker() {
    const overlay = el('story-overlay');
    overlay.classList.remove('hidden');
    el('story-picker').classList.remove('hidden');
    el('story-body').style.display = 'none';
    el('story-header').querySelector('h2').textContent = '';
    el('story-counter').textContent = '';
  }

  function closeStory() {
    el('story-overlay').classList.add('hidden');
    document.body.classList.remove('story-mode');
    currentStory = null;
    // Remove spotlight marker and path
    if (storyMarker) { map.removeLayer(storyMarker); storyMarker = null; }
    if (storyPath) { map.removeLayer(storyPath); storyPath = null; }
    storyVisitedCoords = [];
    map.invalidateSize();
    renderNodes();
  }

  function startStory(storyId) {
    currentStory = D.stories.find(s => s.id === storyId);
    if (!currentStory) return;
    storyStep = 0;
    storyVisitedCoords = [];
    el('story-picker').classList.add('hidden');
    el('story-body').style.display = '';
    // Enter story mode — hide sidebar, legend, timeline
    document.body.classList.add('story-mode');
    setTimeout(() => map.invalidateSize(), 100);
    renderStoryStep();
  }

  function navigateStory(dir) {
    if (!currentStory) return;
    storyStep += dir;
    if (storyStep < 0) storyStep = 0;
    if (storyStep >= currentStory.steps.length) storyStep = currentStory.steps.length - 1;
    renderStoryStep();
  }

  function renderStoryStep() {
    if (!currentStory) return;
    const step = currentStory.steps[storyStep];
    const node = D.nodes.find(n => n.id === step.nodeId);

    el('story-title').textContent = currentStory.title;
    el('story-counter').textContent = `${storyStep + 1} / ${currentStory.steps.length}`;

    // Rich story text
    const disc = node ? getDiscipline(node.discipline) : null;
    const discBadge = disc ? `<span style="display:inline-block;padding:2px 8px;border-radius:100px;background:${disc.color}20;color:${disc.color};font-size:11px;font-weight:500;margin-left:8px;">${disc.name}</span>` : '';
    el('story-text').innerHTML = `
      <div style="font-size:20px;font-weight:700;font-family:var(--font-serif);margin-bottom:4px;">
        ${node ? node.title : ''} ${discBadge}
      </div>
      <div style="font-size:12px;color:var(--atlas-gold);margin-bottom:8px;">${step.year < 0 ? formatYear(step.year) : step.year}</div>
      <div style="font-size:14px;line-height:1.7;">${step.text}</div>
    `;

    // Fly to node with spotlight
    if (node) {
      // Remove old spotlight
      if (storyMarker) map.removeLayer(storyMarker);

      // Create spotlight marker
      const spotlightIcon = L.divIcon({
        className: 'story-spotlight',
        html: `<div class="story-spotlight-inner"></div><div class="story-spotlight-label">${node.title}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      storyMarker = L.marker([node.lat, node.lon], { icon: spotlightIcon, zIndexOffset: 1000 });
      storyMarker.addTo(map);

      // Add to visited coords and draw path
      storyVisitedCoords.push([node.lat, node.lon]);
      if (storyPath) map.removeLayer(storyPath);
      if (storyVisitedCoords.length > 1) {
        storyPath = L.polyline(storyVisitedCoords, {
          color: '#c8a46e', weight: 2, dashArray: '8 4', opacity: 0.6
        }).addTo(map);
      }

      // Fly to with good zoom
      map.flyTo([node.lat, node.lon], 7, { duration: 1.8 });
    }

    // Progress dots
    const dotsHtml = currentStory.steps.map((_, i) =>
      `<span style="display:inline-block;width:${i === storyStep ? 10 : 6}px;height:${i === storyStep ? 10 : 6}px;border-radius:50%;background:${i <= storyStep ? 'var(--atlas-gold)' : 'var(--border)'};margin:0 3px;transition:all 0.3s;"></span>`
    ).join('');

    // Button states
    el('story-prev').style.visibility = storyStep === 0 ? 'hidden' : 'visible';
    const isLast = storyStep === currentStory.steps.length - 1;
    el('story-next').innerHTML = isLast
      ? 'Bitir'
      : 'Sonraki <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

    // Insert progress dots between nav buttons
    let dotsEl = document.getElementById('story-dots');
    if (!dotsEl) {
      dotsEl = document.createElement('div');
      dotsEl.id = 'story-dots';
      dotsEl.style.cssText = 'display:flex;align-items:center;justify-content:center;';
      el('story-nav').insertBefore(dotsEl, el('story-next'));
    }
    dotsEl.innerHTML = dotsHtml;

    if (isLast) {
      el('story-next').onclick = closeStory;
    } else {
      el('story-next').onclick = () => navigateStory(1);
    }
  }

  /* ════════════════════════════════════════
     MOBILE
     ════════════════════════════════════════ */
  function initMobile() {
    const toggle = el('mobile-menu-toggle');
    const sidebar = el('sidebar-left');
    if (toggle) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
    // Close sidebar on map click (mobile)
    if (map) {
      map.on('click', () => {
        sidebar.classList.remove('open');
      });
    }
  }

  /* ════════════════════════════════════════
     EVENT DELEGATION
     ════════════════════════════════════════ */
  function initEventDelegation() {
    // Popup detail button
    document.addEventListener('click', e => {
      const detailBtn = e.target.closest('.popup-detail-btn');
      if (detailBtn) {
        showNodeDetail(detailBtn.dataset.nodeId);
        return;
      }
      const nodeCard = e.target.closest('[data-node-id]');
      if (nodeCard && nodeCard.closest('#panel-content')) {
        showNodeDetail(nodeCard.dataset.nodeId);
        const node = D.nodes.find(n => n.id === nodeCard.dataset.nodeId);
        if (node) map.flyTo([node.lat, node.lon], node.zoom || 6, { duration: 1 });
        return;
      }
      const civCard = e.target.closest('[data-civ-id]');
      if (civCard) {
        showCivilizationDetail(civCard.dataset.civId);
        return;
      }
    });

    // Panel close
    el('panel-close').addEventListener('click', hidePanel);
  }

  /* ════════════════════════════════════════
     INIT
     ════════════════════════════════════════ */
  function init() {
    initTheme();
    initMap();
    initFilters();
    initTimeline();
    initStreamgraph();
    initCompare();
    initStories();
    initMobile();
    initEventDelegation();

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        map.invalidateSize();
        initStreamgraph();
      }, 250);
    });
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
