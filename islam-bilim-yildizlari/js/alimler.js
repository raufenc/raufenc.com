// Initialize page
initPage('kesfet');

// State
let filterAlan = '';
let filterDonem = '';
let filterBolge = '';

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
  donemRow.innerHTML = '<span class="filter-label">Donem:</span>' +
    donemler.map(d => `<button class="filter-btn" data-type="donem" data-val="${d}">${d}</button>`).join('');

  // Bolge filter
  const bolgeRow = document.getElementById('filter-bolge-row');
  const bolgeKeys = Object.keys(BOLGELER).sort((a,b) => BOLGELER[b].length - BOLGELER[a].length);
  bolgeRow.innerHTML = '<span class="filter-label">Bolge:</span>' +
    bolgeKeys.map(b => `<button class="filter-btn" data-type="bolge" data-val="${b}">${BOLGE_EMOJI[b]||''} ${b} (${BOLGELER[b].length})</button>`).join('');
}

// Filter button click handler
document.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
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

// Search
document.getElementById('search').addEventListener('input', render);

// Render cards
function render() {
  const q = document.getElementById('search').value.toLowerCase().trim();

  let filtered = BILGINLER.filter(b => {
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
    grid.innerHTML = '<div class="empty">Sonuc bulunamadi. Filtreleri temizleyin.</div>';
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
    return `
      <a href="alim.html?id=${b.id}" class="bilgin-card" style="--card-color:${renk};--card-glow:${renk}18;animation-delay:${delay}s;text-decoration:none;color:inherit">
        <div class="card-top">
          <div class="card-avatar" style="background:linear-gradient(135deg,${renk}22,transparent);color:${renk};border-color:${renk}33">${initials}</div>
          <div class="card-info">
            <div class="card-name">${b.isim}</div>
            <div class="card-meta">📅 ${b.dogum||'?'}–${b.vefat||'?'} · 📍 ${b.yer}</div>
          </div>
        </div>
        <div class="card-tags">${tags}</div>
        <div class="card-hook">${b.hook}</div>
      </a>
    `;
  }).join('');
}

// Init
buildFilters();
render();
