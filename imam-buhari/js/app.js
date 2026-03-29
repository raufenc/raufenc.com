/* ═══════════════════════════════════════════════
   İmam-ı Buharî — Hadîs İlminin Güneşi
   Interactive Map Biography
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── State ── */
  let DATA = null;
  let map = null;
  let markers = {};          // id → L.circleMarker
  let pulseMarkers = {};     // id → L.divIcon for pulsing
  let routeLayers = [];
  let activePeriod = 'all';
  let visibleCount = 0;

  /* Journey animation state */
  let journeyState = {
    playing: false,
    paused: false,
    currentStep: 0,
    timer: null,
    movingMarker: null,
    drawnRoutes: [],
    infoEl: null
  };

  /* ── Period color map ── */
  const PERIOD_COLORS = {};

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const resp = await fetch('data/locations.json');
      DATA = await resp.json();
      DATA.periods.forEach(p => { PERIOD_COLORS[p.id] = p.color; });
      initMap();
      renderMarkers();
      renderRoutes();
      populateFilters();
      setupSearch();
      renderTimeline();
      renderWorks();
      renderSources();
      renderLegend();
      setupDetailPanel();
      setupJourneyControls();
      initHeroCounters();
      initScrollSpy();
      updateCount();
    } catch (e) {
      console.error('Veri yüklenemedi:', e);
    }
  });

  /* ═══════════ MAP ═══════════ */
  function initMap() {
    map = L.map('map', {
      center: [34, 52],
      zoom: 4,
      minZoom: 3,
      maxZoom: 12,
      zoomControl: false
    });
    L.control.zoom({ position: 'topleft' }).addTo(map);
    // Create a pane for pulse markers below the default marker pane
    map.createPane('pulsePane');
    map.getPane('pulsePane').style.zIndex = 350;
    map.getPane('pulsePane').style.pointerEvents = 'none';
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);
  }

  function renderMarkers() {
    const sortedLocs = [...DATA.locations].sort((a, b) => a.order - b.order);
    sortedLocs.forEach(loc => {
      const primaryPeriod = loc.periods[0];
      const color = PERIOD_COLORS[primaryPeriod] || '#c8a46e';
      const radius = loc.significance === 'major' ? 9 : loc.significance === 'standard' ? 7 : 5;
      const opacity = loc.significance === 'major' ? 0.95 : loc.significance === 'standard' ? 0.8 : 0.6;

      const marker = L.circleMarker([loc.lat, loc.lon], {
        radius: radius,
        fillColor: color,
        fillOpacity: opacity,
        color: color,
        weight: loc.precision === 'kesin' ? 2 : 1,
        opacity: 0.9,
        dashArray: loc.precision === 'yaklasik' ? '4,3' : null
      }).addTo(map);

      marker.bindPopup(createPopup(loc), { maxWidth: 280, className: 'custom-popup' });
      marker.on('click', () => marker.openPopup());
      marker.locationData = loc;
      markers[loc.id] = marker;

      // Pulsing markers for birth & death
      if (loc.id === 'buhara' || loc.id === 'hartenk') {
        const pulseColor = loc.id === 'buhara' ? '#22c55e' : '#ef4444';
        const pulseIcon = L.divIcon({
          className: '',
          html: `<div class="pulse-ring" style="background:${pulseColor}; box-shadow:0 0 0 0 ${pulseColor}"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        pulseMarkers[loc.id] = L.marker([loc.lat, loc.lon], { icon: pulseIcon, interactive: false, pane: 'pulsePane' }).addTo(map);
      }
    });
  }

  function createPopup(loc) {
    const primaryPeriod = DATA.periods.find(p => p.id === loc.periods[0]);
    const color = PERIOD_COLORS[loc.periods[0]];
    let eventsHtml = '';
    if (loc.events && loc.events.length > 0) {
      const ev = loc.events[0];
      eventsHtml = `<div class="popup-events"><strong>${ev.ah_year} H:</strong> ${ev.title}</div>`;
    }
    return `
      <div class="popup-title">${loc.name}</div>
      <div class="popup-modern">${loc.modern_name}</div>
      <span class="popup-period" style="background:${color}20;color:${color}">${primaryPeriod.label}</span>
      ${eventsHtml}
      <div class="popup-btn" onclick="window.__openDetail('${loc.id}')">Detay</div>
    `;
  }

  function renderRoutes() {
    DATA.routes.forEach(route => {
      const color = PERIOD_COLORS[route.period] || '#c8a46e';
      const line = L.polyline(route.waypoints, {
        color: color,
        weight: 2,
        opacity: 0.4,
        dashArray: '6, 4',
        className: 'route-line'
      }).addTo(map);
      line.routeData = route;
      routeLayers.push(line);
    });
  }

  /* ═══════════ FILTERS ═══════════ */
  function populateFilters() {
    const sel = document.getElementById('period-filter');
    DATA.periods.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.label;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', () => {
      activePeriod = sel.value;
      applyFilter();
    });
  }

  function applyFilter() {
    visibleCount = 0;
    Object.values(markers).forEach(m => {
      const loc = m.locationData;
      const show = activePeriod === 'all' || loc.periods.includes(activePeriod);
      if (show) {
        m.addTo(map);
        visibleCount++;
      } else {
        map.removeLayer(m);
      }
      // Pulse markers
      if (pulseMarkers[loc.id]) {
        if (show) pulseMarkers[loc.id].addTo(map);
        else map.removeLayer(pulseMarkers[loc.id]);
      }
    });
    routeLayers.forEach(rl => {
      const show = activePeriod === 'all' || rl.routeData.period === activePeriod;
      if (show) rl.addTo(map);
      else map.removeLayer(rl);
    });
    updateCount();
  }

  function updateCount() {
    if (activePeriod === 'all') visibleCount = DATA.locations.length;
    document.getElementById('filter-count').textContent = `${visibleCount} / ${DATA.locations.length} lokasyon`;
  }

  /* ═══════════ SEARCH ═══════════ */
  function setupSearch() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.classList.remove('show'); return; }

      const matches = DATA.locations.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.modern_name.toLowerCase().includes(q)
      );

      if (matches.length === 0) { results.classList.remove('show'); return; }

      results.innerHTML = matches.map(l => {
        const period = DATA.periods.find(p => p.id === l.periods[0]);
        return `<div class="sr-item" data-id="${l.id}">
          <span class="sr-name">${l.name}</span>
          <span class="sr-info">${period ? period.label : ''}</span>
        </div>`;
      }).join('');
      results.classList.add('show');

      results.querySelectorAll('.sr-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.dataset.id;
          const loc = DATA.locations.find(l => l.id === id);
          if (loc && markers[id]) {
            map.flyTo([loc.lat, loc.lon], 7, { duration: 1 });
            markers[id].openPopup();
          }
          results.classList.remove('show');
          input.value = '';
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) results.classList.remove('show');
    });
  }

  /* ═══════════ DETAIL PANEL ═══════════ */
  function setupDetailPanel() {
    const panel = document.getElementById('detail-panel');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('detail-close');

    window.__openDetail = function (id) {
      const loc = DATA.locations.find(l => l.id === id);
      if (!loc) return;
      map.closePopup();

      const periods = loc.periods.map(pid => {
        const p = DATA.periods.find(pp => pp.id === pid);
        return `<span class="dp-badge" style="background:${PERIOD_COLORS[pid]}20;color:${PERIOD_COLORS[pid]}">${p.label}</span>`;
      }).join('');

      let eventsHtml = '';
      if (loc.events && loc.events.length) {
        eventsHtml = `<div class="dp-section"><h4>Olaylar</h4><ul>${
          loc.events.map(ev => `<li><span class="dp-event-year">${ev.ah_year} H / ${ev.ce_year} M</span> <strong>${ev.title}</strong><br>${ev.description}</li>`).join('')
        }</ul></div>`;
      }

      document.getElementById('detail-content').innerHTML = `
        <h2>${loc.name}</h2>
        <div class="dp-modern">${loc.modern_name}</div>
        <div class="dp-badges">${periods}</div>
        ${eventsHtml}
        <div class="dp-section">
          <h4>Hakkında</h4>
          <p>${loc.detail_text}</p>
        </div>
        <button class="dp-fly-btn" onclick="window.__flyTo('${id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Haritada Göster
        </button>
      `;

      panel.classList.add('open');
      overlay.classList.add('open');
    };

    window.__flyTo = function (id) {
      const loc = DATA.locations.find(l => l.id === id);
      if (loc) {
        map.flyTo([loc.lat, loc.lon], 8, { duration: 1 });
        closeDetail();
        setTimeout(() => { if (markers[id]) markers[id].openPopup(); }, 1100);
      }
    };

    function closeDetail() {
      panel.classList.remove('open');
      overlay.classList.remove('open');
    }

    closeBtn.addEventListener('click', closeDetail);
    overlay.addEventListener('click', closeDetail);
  }

  /* ═══════════ JOURNEY ANIMATION ═══════════ */
  function setupJourneyControls() {
    const playBtn = document.getElementById('journey-play');
    const pauseBtn = document.getElementById('journey-pause');
    const resetBtn = document.getElementById('journey-reset');
    const speedSel = document.getElementById('journey-speed');

    playBtn.addEventListener('click', startJourney);
    pauseBtn.addEventListener('click', pauseJourney);
    resetBtn.addEventListener('click', resetJourney);

    function startJourney() {
      if (journeyState.paused) {
        journeyState.paused = false;
        journeyState.playing = true;
        pauseBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
        animateNextStep();
        return;
      }

      // Fresh start
      resetJourneyVisuals();
      journeyState.playing = true;
      journeyState.paused = false;
      journeyState.currentStep = 0;

      playBtn.classList.add('hidden');
      pauseBtn.classList.remove('hidden');
      resetBtn.classList.remove('hidden');
      speedSel.classList.remove('hidden');
      document.getElementById('journey-info').classList.remove('hidden');

      // Hide static routes
      routeLayers.forEach(rl => map.removeLayer(rl));

      // Start
      animateNextStep();
    }

    function pauseJourney() {
      journeyState.paused = true;
      journeyState.playing = false;
      clearTimeout(journeyState.timer);
      pauseBtn.classList.add('hidden');
      playBtn.classList.remove('hidden');
    }

    function resetJourney() {
      journeyState.playing = false;
      journeyState.paused = false;
      clearTimeout(journeyState.timer);
      resetJourneyVisuals();

      // Show static routes again
      routeLayers.forEach(rl => {
        if (activePeriod === 'all' || rl.routeData.period === activePeriod) {
          rl.addTo(map);
        }
      });

      playBtn.classList.remove('hidden');
      pauseBtn.classList.add('hidden');
      resetBtn.classList.add('hidden');
      speedSel.classList.add('hidden');
      document.getElementById('journey-info').classList.add('hidden');
    }

    function resetJourneyVisuals() {
      journeyState.drawnRoutes.forEach(l => map.removeLayer(l));
      journeyState.drawnRoutes = [];
      if (journeyState.movingMarker) {
        map.removeLayer(journeyState.movingMarker);
        journeyState.movingMarker = null;
      }
    }
  }

  function animateNextStep() {
    if (!journeyState.playing || journeyState.paused) return;
    if (journeyState.currentStep >= DATA.routes.length) {
      // Journey complete
      document.getElementById('ji-year').textContent = '256 H / 870 M';
      document.getElementById('ji-label').textContent = 'Yolculuk Tamamlandı';
      journeyState.playing = false;
      document.getElementById('journey-pause').classList.add('hidden');
      document.getElementById('journey-play').classList.add('hidden');
      return;
    }

    const route = DATA.routes[journeyState.currentStep];
    const color = PERIOD_COLORS[route.period] || '#c8a46e';
    const speed = parseInt(document.getElementById('journey-speed').value) || 2;
    const stepDuration = 1500 / speed;

    // Update info
    document.getElementById('ji-year').textContent = `${route.ah_year} H`;
    document.getElementById('ji-label').textContent = route.label;

    // Animate polyline
    const waypoints = route.waypoints;
    let currentWP = 0;
    const partialLine = L.polyline([], {
      color: color,
      weight: 3,
      opacity: 0.8
    }).addTo(map);
    journeyState.drawnRoutes.push(partialLine);

    // Moving marker
    if (journeyState.movingMarker) map.removeLayer(journeyState.movingMarker);
    journeyState.movingMarker = L.circleMarker(waypoints[0], {
      radius: 6,
      fillColor: '#c8a46e',
      fillOpacity: 1,
      color: '#fff',
      weight: 2
    }).addTo(map);

    // Fly to midpoint
    const midIdx = Math.floor(waypoints.length / 2);
    map.flyTo(waypoints[midIdx], 5, { duration: 0.8 });

    function drawSegment() {
      if (!journeyState.playing || journeyState.paused) return;
      if (currentWP >= waypoints.length) {
        journeyState.currentStep++;
        journeyState.timer = setTimeout(animateNextStep, stepDuration);
        return;
      }
      partialLine.addLatLng(waypoints[currentWP]);
      journeyState.movingMarker.setLatLng(waypoints[currentWP]);
      currentWP++;
      journeyState.timer = setTimeout(drawSegment, stepDuration / waypoints.length);
    }

    drawSegment();
  }

  /* ═══════════ TIMELINE ═══════════ */
  function renderTimeline() {
    const wrap = document.getElementById('timeline-wrap');
    const pinSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

    DATA.timeline_events.forEach((ev, i) => {
      const period = DATA.periods.find(p => p.id === ev.period);
      const color = PERIOD_COLORS[ev.period];
      const loc = DATA.locations.find(l => l.id === ev.location);

      const item = document.createElement('div');
      item.className = 'tl-item';
      item.dataset.locationId = ev.location;
      item.style.borderLeftColor = color;
      item.innerHTML = `
        <div class="tl-date">${ev.ah_year} H / ${ev.ce_year} M</div>
        <div class="tl-title">${ev.title}</div>
        <span class="tl-period-badge" style="background:${color}20;color:${color}">${period.label}</span>
        <div class="tl-loc">${pinSvg} ${loc ? loc.name : ''}</div>
        <div class="tl-desc">${ev.description}</div>
      `;

      // Click → fly to location
      item.addEventListener('click', () => {
        const locData = DATA.locations.find(l => l.id === ev.location);
        if (locData && markers[ev.location]) {
          document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            map.flyTo([locData.lat, locData.lon], 7, { duration: 1 });
            setTimeout(() => markers[ev.location].openPopup(), 1100);
          }, 500);
        }
        // Highlight
        wrap.querySelectorAll('.tl-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });

      wrap.appendChild(item);
    });
  }

  /* ═══════════ WORKS ═══════════ */
  function renderWorks() {
    const grid = document.getElementById('works-grid');
    const icons = {
      'book-gold': '\uD83D\uDCD6',
      'scroll': '\uD83D\uDCDC',
      'feather': '\u270D\uFE0F',
      'shield': '\uD83D\uDEE1\uFE0F'
    };

    DATA.works.forEach(w => {
      const card = document.createElement('div');
      card.className = 'work-card';
      card.innerHTML = `
        <div class="work-icon">${icons[w.icon] || '\uD83D\uDCD6'}</div>
        <div class="work-title">${w.title}</div>
        <div class="work-desc">${w.description}</div>
      `;
      grid.appendChild(card);
    });
  }

  /* ═══════════ SOURCES ═══════════ */
  function renderSources() {
    const grid = document.getElementById('sources-grid');
    DATA.sources.forEach(s => {
      const card = document.createElement('div');
      card.className = 'source-card';
      card.innerHTML = `
        <div class="source-title">${s.title}</div>
        <div class="source-author">${s.author}</div>
        <div class="source-type">${s.type}</div>
      `;
      grid.appendChild(card);
    });
  }

  /* ═══════════ LEGEND ═══════════ */
  function renderLegend() {
    const items = document.getElementById('legend-items');
    DATA.periods.forEach(p => {
      const row = document.createElement('div');
      row.className = 'legend-row';
      row.innerHTML = `<span class="legend-dot" style="background:${p.color}"></span><span>${p.label}</span>`;
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        document.getElementById('period-filter').value = p.id;
        activePeriod = p.id;
        applyFilter();
      });
      items.appendChild(row);
    });
  }

  /* ═══════════ HERO COUNTERS ═══════════ */
  function initHeroCounters() {
    const statsEl = document.getElementById('hero-stats');
    let animated = false;

    function checkAndAnimate() {
      if (animated) return;
      const rect = statsEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        animated = true;
        animateCounters();
        window.removeEventListener('scroll', checkAndAnimate);
      }
    }

    window.addEventListener('scroll', checkAndAnimate, { passive: true });
    // Also check immediately in case stats are already visible
    setTimeout(checkAndAnimate, 500);
  }

  function animateCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = formatNumber(Math.round(current)) + suffix;
      }, stepTime);
    });
  }

  function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  /* ═══════════ SCROLL SPY ═══════════ */
  function initScrollSpy() {
    const navLinks = document.querySelectorAll('.section-nav a');
    const sections = ['map-section', 'timeline', 'works', 'sources'];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-100px 0px -60% 0px' });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

})();
