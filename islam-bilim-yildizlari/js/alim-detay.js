initPage('kesfet');

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const b = BM[id];

if (!b) {
  document.getElementById('content').innerHTML = '<div class="empty" style="padding-top:80px"><h2>Alim bulunamadı</h2><p><a href="alimler.html" style="color:var(--gold)">← Kataloğa dön</a></p></div>';
} else {
  // Track visit
  Store.addVisited(b.id);

  const renk = alanRenk(b.alanBirincil);
  const initials = b.isim.split(' ').map(w => w[0]).slice(0,2).join('');
  const coord = KOORDINATLAR[b.id];

  // Difficulty stars
  const stars = '★'.repeat(b.zorluk || 1) + '☆'.repeat(3 - (b.zorluk || 1));

  // Tags
  const tags = b.alanlar.map(a => {
    const c = alanRenk(a);
    return `<span class="tag" style="--tag-bg:${c}15;--tag-color:${c};--tag-border:${c}30">${a}</span>`;
  }).join('');

  // Relationships
  let relHTML = '';
  const etkiledi = b.etkiledi || [];
  const etkilenen = b.etkilenen || [];
  const etkilediText = b.etkilediText || [];
  const etkilenenText = b.etkilenenText || [];

  if (etkiledi.length || etkilenen.length || etkilediText.length || etkilenenText.length) {
    relHTML = `
      <div class="sidebar-card">
        <h3>🔗 İlişkiler</h3>
        ${etkiledi.length || etkilediText.length ? `
          <h4 style="font-size:10px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;letter-spacing:.08em">→ Etkiledikleri</h4>
          <div style="margin-bottom:10px">
            ${etkiledi.map(e => `<a href="alim.html?id=${e.id}" class="modal-rel-item" style="text-decoration:none">${e.isim}</a>`).join(' ')}
            ${etkilediText.map(t => `<span class="modal-rel-item modal-rel-ext">${t}</span>`).join(' ')}
          </div>
        ` : ''}
        ${etkilenen.length || etkilenenText.length ? `
          <h4 style="font-size:10px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;letter-spacing:.08em">← Etkilendikleri</h4>
          <div>
            ${etkilenen.map(e => `<a href="alim.html?id=${e.id}" class="modal-rel-item" style="text-decoration:none">${e.isim}</a>`).join(' ')}
            ${etkilenenText.map(t => `<span class="modal-rel-item modal-rel-ext">${t}</span>`).join(' ')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Works
  const eserlerHTML = b.eserler?.length ? `
    <div class="modal-section">
      <div class="modal-section-title">📖 Eserleri</div>
      <ul class="modal-list">
        ${b.eserler.map(e => `<li><span class="li-icon">•</span> ${e}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  // Contributions
  const katkilarHTML = b.katkilar?.length ? `
    <div class="modal-section">
      <div class="modal-section-title">💡 Katkıları</div>
      <ul class="modal-list">
        ${b.katkilar.map(k => `<li><span class="li-icon">◆</span> ${k}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  // Mini map placeholder
  const mapHTML = coord ? `
    <div class="sidebar-card">
      <h3>📍 Konum</h3>
      <div id="mini-map" class="mini-map"></div>
      <p style="font-size:11px;color:var(--muted2);margin-top:6px">${b.yer}</p>
    </div>
  ` : '';

  document.getElementById('content').innerHTML = `
    <div class="alim-hero">
      <a href="alimler.html" style="color:var(--muted2);text-decoration:none;font-size:12px;display:inline-block;margin-bottom:16px">← Kataloğa dön</a>
      <div class="alim-avatar" style="background:linear-gradient(135deg,${renk}22,transparent);color:${renk};border:1px solid ${renk}33">${initials}</div>
      <div class="alim-name">${b.isim}</div>
      <div class="alim-meta">
        📅 ${b.dogum||'?'}–${b.vefat||'?'} · 📍 ${b.yer} · ${b.donem} ·
        ${b.mezhep ? '🕌 '+b.mezhep+' · ' : ''}
        <span style="color:var(--gold)">${stars}</span>
      </div>
      <div class="alim-tags">${tags}</div>
    </div>

    <div class="alim-content">
      <div class="alim-main">
        <div class="fact-pill">✨ ${b.hook}</div>
        <div class="modal-bio">${b.ozet}</div>
        ${eserlerHTML}
        ${katkilarHTML}

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:20px">
          <a href="sinav.html" class="btn-primary" style="text-decoration:none">⚡ Kendini Test Et</a>
          <a href="alimler.html" class="btn-secondary" style="text-decoration:none">🔭 Tüm Alimler</a>
        </div>
      </div>

      <div class="alim-sidebar">
        ${mapHTML}
        ${relHTML}

        <div class="sidebar-card">
          <h3>📊 Bilgi</h3>
          <div style="font-size:12px;color:var(--muted2);line-height:2">
            <div>📅 <strong>Doğum:</strong> ${b.dogum || 'Bilinmiyor'}</div>
            <div>⚰️ <strong>Vefat:</strong> ${b.vefat || 'Bilinmiyor'}</div>
            <div>📍 <strong>Yer:</strong> ${b.yer}</div>
            <div>🕰️ <strong>Dönem:</strong> ${b.donem}</div>
            ${b.mezhep ? `<div>🕌 <strong>Mezhep:</strong> ${b.mezhep}</div>` : ''}
            <div>📚 <strong>Eser sayısı:</strong> ${b.eserler?.length || 0}</div>
            <div>💡 <strong>Katkı sayısı:</strong> ${b.katkilar?.length || 0}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize mini map if coordinates exist
  if (coord) {
    const isDark = !document.documentElement.classList.contains('light');
    const tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    const map = L.map('mini-map', { zoomControl: false, scrollWheelZoom: false, dragging: false }).setView(coord, 6);
    L.tileLayer(tileUrl, { attribution: '', maxZoom: 18, subdomains: 'abcd' }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: `<div style="width:14px;height:14px;border-radius:50%;background:${renk};border:2px solid rgba(255,255,255,.4);box-shadow:0 0 10px ${renk}80"></div>`,
      iconSize: [14, 14], iconAnchor: [7, 7]
    });
    L.marker(coord, { icon }).addTo(map);
  }

  // Update page title
  document.title = `${b.isim} — İslam Bilim Yıldızları`;
}
