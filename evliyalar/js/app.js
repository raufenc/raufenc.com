/* ========================================
   ÖZBEKISTAN EVLİYALARI - MAIN APP
   ======================================== */

let DATA = null;
let currentLang = 'tr';
let map = null;
let cityMarkers = {};

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initMap();
  initTimeline();
  initSilsile();
  initSearch();
  initLangToggle();
  initModal();
  initMobileMenu();
  initAbout();
  initScrollAnimations();
});

// ========== DATA LOADING ==========
async function loadData() {
  try {
    const resp = await fetch('data/scholars.json');
    DATA = await resp.json();
  } catch (e) {
    console.error('Failed to load data:', e);
  }
}

// ========== LANGUAGE ==========
function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  btn.addEventListener('click', () => {
    currentLang = currentLang === 'tr' ? 'uz' : 'tr';
    btn.querySelector('.lang-current').textContent = currentLang.toUpperCase();
    applyLang();
  });
}

function applyLang() {
  // Update all data-tr / data-uz elements
  document.querySelectorAll('[data-tr]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) el.innerHTML = text;
  });

  // Update placeholders
  document.querySelectorAll('[data-tr-placeholder]').forEach(el => {
    const ph = el.getAttribute(`data-${currentLang}-placeholder`);
    if (ph) el.placeholder = ph;
  });

  // Refresh dynamic content
  refreshCityPanel();
  initTimeline();
  initSilsile();
  initAbout();

  // Update map markers
  Object.keys(cityMarkers).forEach(key => {
    const city = DATA.cities[key];
    const label = cityMarkers[key].getElement().querySelector('.marker-label');
    if (label) label.textContent = currentLang === 'tr' ? city.name_tr : city.name_uz;
  });

  // Update modal if open
  const modal = document.getElementById('scholar-modal');
  if (!modal.classList.contains('hidden') && modal.dataset.scholarId) {
    const scholar = DATA.scholars.find(s => s.id === modal.dataset.scholarId);
    if (scholar) showScholar(scholar);
  }
}

function t(scholar, field) {
  return scholar[`${field}_${currentLang}`] || scholar[`${field}_tr`] || '';
}

function formatText(text) {
  if (!text) return '';
  // Split by double newlines or single newlines for paragraphs
  const paragraphs = text.split(/\n{2,}|\n/).filter(p => p.trim().length > 0);
  return paragraphs.map(p => {
    // Escape HTML
    const safe = p.trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<p>${safe}</p>`;
  }).join('');
}

function cityName(scholar) {
  return currentLang === 'tr' ? scholar.city_tr : scholar.city_uz;
}

// ========== MAP ==========
function initMap() {
  if (!DATA) return;

  map = L.map('map', {
    center: [40.5, 66],
    zoom: 6,
    minZoom: 5,
    maxZoom: 10,
    zoomControl: true,
    scrollWheelZoom: true,
  });

  // Tile layer - clean style
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Add city markers
  Object.entries(DATA.cities).forEach(([key, city]) => {
    const icon = L.divIcon({
      className: 'city-marker',
      html: `
        <div class="marker-inner">
          <span class="marker-label">${city.name_tr}</span>
          ${city.count}
        </div>
      `,
      iconSize: [52, 52],
      iconAnchor: [26, 26],
    });

    const marker = L.marker([city.lat, city.lng], { icon }).addTo(map);
    marker.on('click', () => openCityPanel(key));
    cityMarkers[key] = marker;
  });

  // Draw silk road line (decorative)
  const silkRoad = [
    [41.0, 58.0], [41.5, 60.6], [39.8, 64.4],
    [39.7, 66.9], [41.3, 69.3], [42.0, 71.0]
  ];
  L.polyline(silkRoad, {
    color: '#c8963e',
    weight: 2,
    opacity: 0.4,
    dashArray: '8, 8',
  }).addTo(map);
}

let currentCityKey = null;
let currentFilter = 'all';

function openCityPanel(cityKey) {
  currentCityKey = cityKey;
  currentFilter = 'all';
  const panel = document.getElementById('city-panel');
  panel.classList.remove('hidden');
  refreshCityPanel();

  // Reset filter chips
  panel.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  panel.querySelector('.chip[data-filter="all"]').classList.add('active');

  // Pan map
  const city = DATA.cities[cityKey];
  map.flyTo([city.lat, city.lng], 8, { duration: 1 });
}

function refreshCityPanel() {
  if (!currentCityKey) return;
  const city = DATA.cities[currentCityKey];
  const scholars = DATA.scholars.filter(s => s.city === currentCityKey);
  const filtered = currentFilter === 'all'
    ? scholars
    : scholars.filter(s => s.categories.includes(currentFilter));

  document.getElementById('panel-city-name').textContent =
    currentLang === 'tr' ? city.name_tr : city.name_uz;

  const countLabel = currentLang === 'tr'
    ? `${filtered.length} âlim ve evliya`
    : `${filtered.length} olim va avliyo`;
  document.getElementById('panel-city-count').textContent = countLabel;

  const container = document.getElementById('panel-scholars');
  container.innerHTML = filtered.map(s => {
    const name = currentLang === 'tr' ? s.name_tr : s.name_uz;
    const initial = name.charAt(0);
    const death = s.death_miladi ? `v. ${s.death_miladi}` : '';
    const cats = s.categories.map(c => `<span class="cat-tag">${c}</span>`).join('');
    return `
      <div class="scholar-card" data-id="${s.id}">
        <div class="card-icon">${initial}</div>
        <div class="card-info">
          <div class="card-name">${name}</div>
          <div class="card-meta">${death}</div>
          <div class="card-cats">${cats}</div>
        </div>
      </div>
    `;
  }).join('');

  // Click handlers
  container.querySelectorAll('.scholar-card').forEach(card => {
    card.addEventListener('click', () => {
      const scholar = DATA.scholars.find(s => s.id === card.dataset.id);
      if (scholar) showScholar(scholar);
    });
  });
}

// Panel close & filter chips
document.addEventListener('click', (e) => {
  if (e.target.id === 'panel-close') {
    document.getElementById('city-panel').classList.add('hidden');
    currentCityKey = null;
    if (map) map.flyTo([40.5, 66], 6, { duration: 1 });
  }

  if (e.target.classList.contains('chip')) {
    e.target.closest('.filter-chips').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    refreshCityPanel();
  }
});

// ========== TIMELINE ==========
function initTimeline() {
  if (!DATA) return;
  const container = document.getElementById('timeline');

  // Group by century
  const centuries = {};
  DATA.scholars.forEach(s => {
    if (!s.death_miladi) return;
    const year = parseInt(s.death_miladi.split('/')[0]);
    if (isNaN(year)) return;
    const century = Math.ceil(year / 100);
    if (!centuries[century]) centuries[century] = [];
    centuries[century].push(s);
  });

  const sortedCenturies = Object.keys(centuries).sort((a, b) => a - b);

  container.innerHTML = sortedCenturies.map(c => {
    const scholars = centuries[c].sort((a, b) => {
      const ya = parseInt(a.death_miladi) || 0;
      const yb = parseInt(b.death_miladi) || 0;
      return ya - yb;
    });

    const centuryLabel = currentLang === 'tr' ? `${c}. yy` : `${c}-asr`;

    return `
      <div class="century-group" data-century="${c}">
        <div class="century-label">${centuryLabel}</div>
        <div class="century-dot"></div>
        <div class="century-scholars">
          ${scholars.map(s => {
            const name = currentLang === 'tr' ? s.name_tr : s.name_uz;
            const shortName = name.length > 22 ? name.substring(0, 20) + '...' : name;
            return `
              <div class="tl-scholar" data-id="${s.id}" title="${name}">
                <div class="tl-name">${shortName}</div>
                <div class="tl-date">${s.death_miladi}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Click handlers
  container.querySelectorAll('.tl-scholar').forEach(el => {
    el.addEventListener('click', () => {
      const scholar = DATA.scholars.find(s => s.id === el.dataset.id);
      if (scholar) showScholar(scholar);
    });
  });

  // Era filters
  document.querySelectorAll('.era-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.era-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const era = btn.dataset.era;
      container.querySelectorAll('.century-group').forEach(g => {
        const c = parseInt(g.dataset.century);
        if (era === 'all') { g.style.display = ''; return; }
        if (era === 'early' && c >= 7 && c <= 10) { g.style.display = ''; return; }
        if (era === 'mid' && c >= 11 && c <= 14) { g.style.display = ''; return; }
        if (era === 'late' && c >= 15 && c <= 18) { g.style.display = ''; return; }
        g.style.display = 'none';
      });
    });
  });
}

// ========== SILSILE ==========
function initSilsile() {
  if (!DATA) return;
  const container = document.getElementById('silsile');

  // Naqshbandi silsila chain
  const silsila = [
    { name_tr: "Abdülhâlık Goncdüvânî", name_uz: "Abdulxoliq G'onduvoniy", death: "v. 1179/1220", golden: false },
    { name_tr: "Ârif-i Rivegerî", name_uz: "Orif-i Rivegeriy", death: "v. 1315", golden: false },
    { name_tr: "Mahmûd-i İncirfagnevî", name_uz: "Mahmud-i Inchirfag'naviy", death: "v. 1315", golden: false },
    { name_tr: "Ali Râmitenî", name_uz: "Ali Romiytaniy", death: "v. 1328", golden: false },
    { name_tr: "Muhammed Bâbâ Semmâsî", name_uz: "Muhammad Bobo Sammasiy", death: "v. 1354", golden: false },
    { name_tr: "Seyyid Emîr Külâl", name_uz: "Sayyid Amir Kulol", death: "v. 1370", golden: false },
    { name_tr: "Behâeddîn Buhârî\n(Şâh-ı Nakşibend)", name_uz: "Bahouddin Buxoriy\n(Shoh-i Naqshband)", death: "v. 1389", golden: true },
    { name_tr: "Alâeddîn-i Attâr", name_uz: "Alouddin Attor", death: "v. 1400", golden: false },
    { name_tr: "Ya'kûb-i Çerhî", name_uz: "Ya'qub-i Charhiy", death: "v. 1447", golden: false },
    { name_tr: "Ubeydullah-ı Ahrâr", name_uz: "Ubaydulloh Ahror", death: "v. 1490", golden: false },
    { name_tr: "Kâdı Muhammed Zâhid", name_uz: "Qozi Muhammad Zohid", death: "v. 1530", golden: false },
    { name_tr: "Hâce Muhammed İmkenegî", name_uz: "Xoja Muhammad Imkanagiy", death: "v. 1599", golden: false },
  ];

  container.innerHTML = silsila.map((node, i) => {
    const name = currentLang === 'tr' ? node.name_tr : node.name_uz;
    const cls = node.golden ? 'silsile-node golden' : 'silsile-node';
    const connector = i < silsila.length - 1 ? '<div class="silsile-connector"></div>' : '';

    // Find matching scholar
    const matchName = node.name_tr.split('\n')[0];
    const scholar = DATA.scholars.find(s => s.name_tr.includes(matchName.substring(0, 15)));
    const dataId = scholar ? `data-id="${scholar.id}"` : '';

    return `
      <div class="${cls}" ${dataId}>
        <div class="sn-name">${name.replace('\n', '<br>')}</div>
        <div class="sn-date">${node.death}</div>
      </div>
      ${connector}
    `;
  }).join('');

  // Click handlers
  container.querySelectorAll('.silsile-node[data-id]').forEach(el => {
    el.addEventListener('click', () => {
      const scholar = DATA.scholars.find(s => s.id === el.dataset.id);
      if (scholar) showScholar(scholar);
    });
  });
}

// ========== SEARCH ==========
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('active'); return; }

    const matches = DATA.scholars.filter(s => {
      const name = (s.name_tr + ' ' + s.name_uz).toLowerCase();
      return name.includes(q);
    }).slice(0, 8);

    if (matches.length === 0) {
      results.classList.remove('active');
      return;
    }

    results.innerHTML = matches.map(s => {
      const name = currentLang === 'tr' ? s.name_tr : s.name_uz;
      const city = currentLang === 'tr' ? s.city_tr : s.city_uz;
      return `
        <div class="search-result-item" data-id="${s.id}">
          <div>${name}</div>
          <div class="result-city">${city} ${s.death_miladi ? '&bull; v. ' + s.death_miladi : ''}</div>
        </div>
      `;
    }).join('');

    results.classList.add('active');

    results.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const scholar = DATA.scholars.find(s => s.id === item.dataset.id);
        if (scholar) showScholar(scholar);
        results.classList.remove('active');
        input.value = '';
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      results.classList.remove('active');
    }
  });
}

// ========== MODAL ==========
function initModal() {
  const modal = document.getElementById('scholar-modal');

  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

  // Tab switching
  modal.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      modal.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      modal.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`modal-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function showScholar(scholar) {
  const modal = document.getElementById('scholar-modal');
  modal.dataset.scholarId = scholar.id;

  const name = t(scholar, 'name');
  const city = cityName(scholar);

  document.getElementById('modal-city').textContent = city;
  document.getElementById('modal-name').textContent = name;

  const deathText = scholar.death_hijri && scholar.death_miladi
    ? `${currentLang === 'tr' ? 'Vefat' : 'Vafot'}: H. ${scholar.death_hijri} / M. ${scholar.death_miladi}`
    : '';
  document.getElementById('modal-death').textContent = deathText;

  const catsHTML = scholar.categories.map(c =>
    `<span class="cat-badge">${c}</span>`
  ).join('');
  document.getElementById('modal-cats').innerHTML = catsHTML;

  // Bio
  const bio = t(scholar, 'bio');
  const bioEl = document.getElementById('modal-bio');
  if (bio && bio.length > 10) {
    bioEl.innerHTML = formatText(bio);
    bioEl.classList.remove('no-content');
  } else {
    bioEl.innerHTML = `<div class="no-content">${currentLang === 'tr' ? 'Biyografi bilgisi henüz eklenmedi.' : 'Biografiya ma\'lumoti hali qo\'shilmagan.'}</div>`;
  }

  // Miracles
  const miracles = t(scholar, 'miracles');
  const mirEl = document.getElementById('modal-miracles');
  if (miracles && miracles.length > 10) {
    mirEl.innerHTML = formatText(miracles);
    mirEl.classList.remove('no-content');
  } else {
    const label = currentLang === 'tr' ? 'Kerâmet bilgisi bulunmamaktadır.' : 'Karomat ma\'lumoti mavjud emas.';
    mirEl.innerHTML = `<div class="no-content">${label}</div>`;
  }

  // Reset to bio tab
  modal.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  modal.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  modal.querySelector('.tab[data-tab="bio"]').classList.add('active');
  document.getElementById('modal-bio').classList.add('active');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('scholar-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('open');
  });

  // Close on nav link click
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelector('nav').classList.remove('open');
    });
  });
}

// ========== ABOUT ==========
function initAbout() {
  if (!DATA) return;
  const text = currentLang === 'tr'
    ? DATA.sections.onsoz.tr
    : DATA.sections.onsoz.uz;

  const aboutEl = document.getElementById('about-text');
  // Clean text
  const cleaned = text
    .replace(/^(ÖNSÖZ|SO'ZBOSHI|ZBOSHI)\s*/i, '')
    .trim();
  aboutEl.innerHTML = formatText(cleaned);
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-header, .about-content, .info-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Header background on scroll
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26,74,94,0.98)';
    } else {
      header.style.background = 'rgba(26,74,94,0.95)';
    }
  });
}
