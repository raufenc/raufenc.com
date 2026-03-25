// Initialize page
initPage('kesfet');

// State
let filterAlan = '';
let filterDonem = '';
let filterBolge = '';
let favFilterActive = false;
let compareMode = false;
let compareList = [];

// Build filter buttons
function buildFilters() {
  // Alan filter - top 15 most common fields
  const alanCount = {};
  BILGINLER.forEach(b => b.alanlar.forEach(a => { alanCount[a] = (alanCount[a]||0) + 1; }));
  const topAlanlar = Object.entries(alanCount).sort((a,b) => b[1]-a[1]).slice(0, 15).map(e => e[0]);

  const alanRow = document.getElementById('filter-alan-row');
  alanRow.innerHTML = '<span class="filter-label">Alan:</span>' +
    topAlanlar.map(a => `<button class="filter-btn" data-type="alan" data-val="${a}">${a}</button>`).join('');

  // Donem filter
  const donemler = [...new Set(BILGINLER.map(b => b.donem))].sort();
  const donemRow = document.getElementById('filter-donem-row');
  donemRow.innerHTML = '<span class="filter-label">Dönem:</span>' +
    donemler.map(d => `<button class="filter-btn" data-type="donem" data-val="${d}">${d}</button>`).join('');

  // Bolge filter
  const bolgeRow = document.getElementById('filter-bolge-row');
  const bolgeKeys = Object.keys(BOLGELER).sort((a,b) => BOLGELER[b].length - BOLGELER[a].length);
  bolgeRow.innerHTML = '<span class="filter-label">Bölge:</span>' +
    bolgeKeys.map(b => `<button class="filter-btn" data-type="bolge" data-val="${b}">${BOLGE_EMOJI[b]||''} ${b} (${BOLGELER[b].length})</button>`).join('');
}

// Filter button click handler
document.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn[data-type]');
  if (!btn) return;
  const type = btn.dataset.type;
  const val = btn.dataset.val;

  if (type === 'alan') filterAlan = filterAlan === val ? '' : val;
  if (type === 'donem') filterDonem = filterDonem === val ? '' : val;
  if (type === 'bolge') filterBolge = filterBolge === val ? '' : val;

  // Update active states
  document.querySelectorAll(`.filter-btn[data-type="${type}"]`).forEach(b => {
    b.classList.toggle('active', b.dataset.val === (type==='alan'?filterAlan:type==='donem'?filterDonem:filterBolge));
  });

  render();
});

// Search + autocomplete
const searchInput = document.getElementById('search');
const acDropdown = document.getElementById('ac-dropdown');

searchInput.addEventListener('input', () => {
  render();
  showAutocomplete();
});

searchInput.addEventListener('focus', showAutocomplete);
document.addEventListener('click', e => {
  if (!e.target.closest('.autocomplete-wrap')) acDropdown.classList.remove('open');
});

function showAutocomplete() {
  const q = searchInput.value.toLowerCase().trim();
  if (q.length < 2) { acDropdown.classList.remove('open'); return; }

  const matches = BILGINLER.filter(b => {
    const h = [b.isim, b.yer, b.donem, ...b.alanlar].join(' ').toLowerCase();
    return h.includes(q);
  }).slice(0, 5);

  if (matches.length === 0) { acDropdown.classList.remove('open'); return; }

  acDropdown.innerHTML = matches.map(b => {
    const renk = alanRenk(b.alanBirincil);
    const init = b.isim.split(' ').map(w => w[0]).slice(0, 2).join('');
    return `<a href="alim.html?id=${b.id}" class="ac-item">
      <div class="ac-avatar" style="background:${renk}22;color:${renk}">${init}</div>
      <div class="ac-info">
        <div class="ac-name">${b.isim}</div>
        <div class="ac-meta">${b.alanBirincil} · ${b.donem}</div>
      </div>
    </a>`;
  }).join('');
  acDropdown.classList.add('open');
}

// Favorites filter
function toggleFavFilter() {
  favFilterActive = !favFilterActive;
  document.getElementById('fav-filter').classList.toggle('active', favFilterActive);
  render();
}

// Compare mode
function toggleCompareMode() {
  compareMode = !compareMode;
  document.getElementById('compare-toggle').classList.toggle('active', compareMode);
  if (!compareMode) clearCompare();
  render();
}

function toggleCompareItem(id) {
  const idx = compareList.indexOf(id);
  if (idx === -1 && compareList.length < 3) compareList.push(id);
  else if (idx !== -1) compareList.splice(idx, 1);
  updateCompareBar();
  render();
}

function updateCompareBar() {
  const bar = document.getElementById('compare-bar');
  bar.style.display = compareList.length > 0 ? 'flex' : 'none';
  document.getElementById('compare-count').textContent = compareList.length;
}

function clearCompare() {
  compareList = [];
  updateCompareBar();
  render();
}

function showCompare() {
  if (compareList.length < 2) { showToast('En az 2 alim seçin'); return; }
  const scholars = compareList.map(id => BM[id]).filter(Boolean);

  const fields = ['Dönem', 'Yer', 'Birincil Alan', 'Eser Sayısı', 'Katkı Sayısı', 'Zorluk'];
  const getVal = (b, f) => {
    switch(f) {
      case 'Dönem': return b.donem;
      case 'Yer': return b.yer;
      case 'Birincil Alan': return b.alanBirincil;
      case 'Eser Sayısı': return b.eserler?.length || 0;
      case 'Katkı Sayısı': return b.katkilar?.length || 0;
      case 'Zorluk': return '★'.repeat(b.zorluk||1) + '☆'.repeat(3-(b.zorluk||1));
    }
  };

  document.getElementById('compare-body').innerHTML = `
    <table class="compare-table">
      <thead><tr>
        <th></th>
        ${scholars.map(b => `<th style="text-align:center">
          <div style="font-size:14px;font-weight:800">${b.isim}</div>
          <div style="font-size:10px;color:var(--muted2)">${b.dogum||'?'}–${b.vefat||'?'}</div>
        </th>`).join('')}
      </tr></thead>
      <tbody>
        ${fields.map(f => `<tr>
          <td>${f}</td>
          ${scholars.map(b => `<td>${getVal(b, f)}</td>`).join('')}
        </tr>`).join('')}
      </tbody>
    </table>
  `;
  document.getElementById('compare-modal').classList.add('open');
}

// Render cards
function render() {
  const q = searchInput.value.toLowerCase().trim();
  const favs = Store.getFavorites();

  let filtered = BILGINLER.filter(b => {
    if (favFilterActive && !favs.includes(b.id)) return false;
    if (filterAlan && !b.alanlar.includes(filterAlan)) return false;
    if (filterDonem && b.donem !== filterDonem) return false;
    if (filterBolge && !BOLGELER[filterBolge]?.includes(b.id)) return false;
    if (q) {
      const haystack = [b.isim, b.ozet, b.hook, b.yer, b.donem, ...b.alanlar, ...(b.eserler||[]), ...(b.katkilar||[])].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  document.getElementById('results-count').textContent = `${filtered.length} bilgin bulundu`;

  const grid = document.getElementById('cards-grid');
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty">Sonuç bulunamadı. Filtreleri temizleyin.</div>';
    return;
  }

  grid.innerHTML = filtered.map((b, i) => {
    const renk = alanRenk(b.alanBirincil);
    const initials = b.isim.split(' ').map(w => w[0]).slice(0, 2).join('');
    const tags = b.alanlar.slice(0, 3).map(a => {
      const c = alanRenk(a);
      return `<span class="tag" style="--tag-bg:${c}15;--tag-color:${c};--tag-border:${c}30">${a}</span>`;
    }).join('');
    const delay = Math.min(i * 0.03, 0.6);
    const isFav = favs.includes(b.id);
    const stars = '★'.repeat(b.zorluk||1) + '☆'.repeat(3-(b.zorluk||1));
    const isCompared = compareList.includes(b.id);

    return `
      <div class="bilgin-card" style="--card-color:${renk};--card-glow:${renk}18;animation-delay:${delay}s${isCompared?';border-color:var(--gold);box-shadow:0 0 20px var(--gold-glow)':''}" onclick="${compareMode ? `toggleCompareItem(${b.id})` : `window.location.href='alim.html?id=${b.id}'`}">
        <div class="card-difficulty">${stars}</div>
        <button class="card-fav-btn ${isFav?'active':''}" onclick="event.stopPropagation();toggleFavUI(${b.id},this);render()">
          ${isFav ? '❤️' : '🤍'}
        </button>
        <div class="card-top">
          <div class="card-avatar" style="background:linear-gradient(135deg,${renk}22,transparent);color:${renk};border:1px solid ${renk}33">${initials}</div>
          <div class="card-info">
            <div class="card-name">${b.isim}</div>
            <div class="card-meta">📅 ${b.dogum||'?'}–${b.vefat||'?'} · 📍 ${b.yer}</div>
          </div>
        </div>
        <div class="card-tags">${tags}</div>
        <div class="card-hook">${b.hook}</div>
        ${compareMode ? `<div style="margin-top:8px;font-size:10px;color:${isCompared?'var(--gold)':'var(--muted)'};font-weight:700">${isCompared?'✓ Seçildi':'Seçmek için tıkla'}</div>` : ''}
      </div>
    `;
  }).join('');
}

// Init
buildFilters();
render();
