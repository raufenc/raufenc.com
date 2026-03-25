initPage('kesfet');

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const b = BM[id];

if (!b) {
  document.getElementById('content').innerHTML = '<div class="empty" style="padding-top:80px"><h2>Alim bulunamadı</h2><p><a href="alimler.html" style="color:var(--gold)">← Kataloğa dön</a></p></div>';
} else {
  // Track visit + recent
  Store.addVisited(b.id);
  Store.addRecent(b.id);

  const renk = alanRenk(b.alanBirincil);
  const initials = b.isim.split(' ').map(w => w[0]).slice(0,2).join('');
  const coord = KOORDINATLAR[b.id];
  const stars = '\u2605'.repeat(b.zorluk || 1) + '\u2606'.repeat(3 - (b.zorluk || 1));
  const isFav = Store.isFavorite(b.id);

  // Tags
  const tags = b.alanlar.map(a => {
    const c = alanRenk(a);
    return `<span class="tag" style="--tag-bg:${c}15;--tag-color:${c};--tag-border:${c}30">${a}</span>`;
  }).join('');

  // Find learning path this scholar is in
  let pathInfo = '';
  if (typeof OGRENME_YOLLARI !== 'undefined') {
    for (const yol of OGRENME_YOLLARI) {
      const stepIdx = yol.adimlar.findIndex(a => a.bilginId === b.id);
      if (stepIdx !== -1) {
        pathInfo = `
          <div class="path-info-box">
            <span class="path-info-icon">${yol.icon}</span>
            <div class="path-info-text">
              <strong>${yol.baslik}</strong> yolunun ${stepIdx+1}. adımında<br>
              <a href="ogrenme.html?yol=${yol.id}">Yola git \u2192</a>
            </div>
          </div>
        `;
        break;
      }
    }
  }

  // Relationships
  let relHTML = '';
  const etkiledi = b.etkiledi || [];
  const etkilenen = b.etkilenen || [];
  const etkilediText = b.etkilediText || [];
  const etkilenenText = b.etkilenenText || [];

  if (etkiledi.length || etkilenen.length || etkilediText.length || etkilenenText.length) {
    relHTML = `
      <div class="sidebar-card">
        <h3>\uD83D\uDD17 İlişkiler</h3>
        ${etkiledi.length || etkilediText.length ? `
          <h4 style="font-size:10px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;letter-spacing:.08em">\u2192 Etkiledikleri</h4>
          <div style="margin-bottom:10px">
            ${etkiledi.map(e => `<a href="alim.html?id=${e.id}" class="modal-rel-item" style="text-decoration:none">${e.isim}</a>`).join(' ')}
            ${etkilediText.map(t => `<span class="modal-rel-item modal-rel-ext">${t}</span>`).join(' ')}
          </div>
        ` : ''}
        ${etkilenen.length || etkilenenText.length ? `
          <h4 style="font-size:10px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;letter-spacing:.08em">\u2190 Etkilendikleri</h4>
          <div>
            ${etkilenen.map(e => `<a href="alim.html?id=${e.id}" class="modal-rel-item" style="text-decoration:none">${e.isim}</a>`).join(' ')}
            ${etkilenenText.map(t => `<span class="modal-rel-item modal-rel-ext">${t}</span>`).join(' ')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Works (collapsible if many)
  const eserlerHTML = b.eserler?.length ? `
    <div class="modal-section">
      <div class="modal-section-title">\uD83D\uDCD6 Eserleri <span style="background:var(--gold-soft);color:var(--gold);padding:1px 8px;border-radius:6px;font-size:10px;margin-left:4px">${b.eserler.length}</span></div>
      <ul class="modal-list" id="eserler-list">
        ${b.eserler.map((e, i) => `<li ${i>=5?'class="hidden-item" style="display:none"':''}><span class="li-icon">\u2022</span> ${e}</li>`).join('')}
      </ul>
      ${b.eserler.length > 5 ? `<button class="btn-secondary" style="padding:4px 12px;font-size:10px;margin-top:6px" onclick="toggleList('eserler-list',this)">+${b.eserler.length-5} daha göster</button>` : ''}
    </div>
  ` : '';

  // Contributions (collapsible)
  const katkilarHTML = b.katkilar?.length ? `
    <div class="modal-section">
      <div class="modal-section-title">\uD83D\uDCA1 Katkıları <span style="background:var(--gold-soft);color:var(--gold);padding:1px 8px;border-radius:6px;font-size:10px;margin-left:4px">${b.katkilar.length}</span></div>
      <ul class="modal-list" id="katkilar-list">
        ${b.katkilar.map((k, i) => `<li ${i>=5?'class="hidden-item" style="display:none"':''}><span class="li-icon">\u25C6</span> ${k}</li>`).join('')}
      </ul>
      ${b.katkilar.length > 5 ? `<button class="btn-secondary" style="padding:4px 12px;font-size:10px;margin-top:6px" onclick="toggleList('katkilar-list',this)">+${b.katkilar.length-5} daha göster</button>` : ''}
    </div>
  ` : '';

  // Sources/references
  const kaynakHTML = b.kaynaklar?.length ? `
    <div class="modal-section">
      <div class="modal-section-title">\uD83D\uDCDA Kaynaklar</div>
      <ul class="modal-list">
        ${b.kaynaklar.map(k => `<li><span class="li-icon">\u2192</span> <a href="${k.url}" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:none">${k.baslik}</a></li>`).join('')}
      </ul>
    </div>
  ` : '';

  // Mini map
  const mapHTML = coord ? `
    <div class="sidebar-card">
      <h3>\uD83D\uDCCD Konum</h3>
      <div id="mini-map" class="mini-map"></div>
      <p style="font-size:11px;color:var(--muted2);margin-top:6px">${b.yer}</p>
    </div>
  ` : '';

  // Similar scholars (same primary field, different id)
  const similar = BILGINLER.filter(s => s.id !== b.id && s.alanBirincil === b.alanBirincil).slice(0, 5);
  const similarHTML = similar.length > 0 ? `
    <div class="sidebar-card">
      <h3>\uD83D\uDC65 Benzer Alimler</h3>
      <div class="similar-strip">
        ${similar.map(s => {
          const r = alanRenk(s.alanBirincil);
          const ini = s.isim.split(' ').map(w=>w[0]).slice(0,2).join('');
          return `<a href="alim.html?id=${s.id}" class="similar-card">
            <div class="similar-avatar" style="background:${r}22;color:${r}">${ini}</div>
            <div class="similar-name">${s.isim}</div>
            <div class="similar-field">${s.donem}</div>
          </a>`;
        }).join('')}
      </div>
    </div>
  ` : '';

  // Timeline bar
  const timelineBar = (b.dogum || b.vefat) ? `
    <div class="alim-timeline-bar">
      <span class="timeline-year">${b.dogum || '?'}</span>
      <div class="timeline-line"></div>
      <span class="timeline-year">${b.vefat || '?'}</span>
    </div>
  ` : '';

  document.getElementById('content').innerHTML = `
    <div class="alim-hero-gradient" style="--hero-color:${renk}18"></div>
    <div class="alim-hero">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <a href="alimler.html" style="color:var(--muted2);text-decoration:none;font-size:12px">\u2190 Kataloğa dön</a>
        <div style="display:flex;gap:6px">
          <button class="card-fav-btn ${isFav?'active':''}" style="position:static;opacity:1;font-size:22px" onclick="toggleFavUI(${b.id},this)">
            ${isFav ? '\u2764\uFE0F' : '\uD83E\uDD0D'}
          </button>
          <div style="position:relative">
            <button class="share-btn" onclick="shareScholar(BM[${b.id}])">📤 Paylaş</button>
          </div>
        </div>
      </div>
      <div class="alim-avatar" style="background:linear-gradient(135deg,${renk}22,transparent);color:${renk};border:1px solid ${renk}33">${initials}</div>
      <div class="alim-name">${b.isim}</div>
      <div class="alim-meta">
        \uD83D\uDCC5 ${b.dogum||'?'}\u2013${b.vefat||'?'} \u00B7 \uD83D\uDCCD ${b.yer} \u00B7 ${b.donem} \u00B7
        ${b.mezhep ? '\uD83D\uDD4C '+b.mezhep+' \u00B7 ' : ''}
        <span style="color:var(--gold)">${stars}</span>
      </div>
      ${timelineBar}
      <div class="alim-tags">${tags}</div>
    </div>

    ${pathInfo}

    <div class="alim-content">
      <div class="alim-main">
        <div class="fact-pill">\u2728 ${b.hook}</div>
        <div class="modal-bio">${b.ozet}</div>
        ${eserlerHTML}
        ${katkilarHTML}
        ${kaynakHTML}

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:20px">
          <a href="sinav.html" class="btn-primary" style="text-decoration:none">\u26A1 Kendini Test Et</a>
          <a href="alimler.html" class="btn-secondary" style="text-decoration:none">\uD83D\uDD2D Tüm Alimler</a>
        </div>
      </div>

      <div class="alim-sidebar">
        ${mapHTML}
        ${relHTML}
        ${similarHTML}

        <div class="sidebar-card">
          <h3>\uD83D\uDCCA Bilgi</h3>
          <div style="font-size:12px;color:var(--muted2);line-height:2">
            <div>\uD83D\uDCC5 <strong>Doğum:</strong> ${b.dogum || 'Bilinmiyor'}</div>
            <div>\u26B0\uFE0F <strong>Vefat:</strong> ${b.vefat || 'Bilinmiyor'}</div>
            <div>\uD83D\uDCCD <strong>Yer:</strong> ${b.yer}</div>
            <div>\uD83D\uDD70\uFE0F <strong>Dönem:</strong> ${b.donem}</div>
            ${b.mezhep ? `<div>\uD83D\uDD4C <strong>Mezhep:</strong> ${b.mezhep}</div>` : ''}
            <div>\uD83D\uDCDA <strong>Eser sayısı:</strong> ${b.eserler?.length || 0}</div>
            <div>\uD83D\uDCA1 <strong>Katkı sayısı:</strong> ${b.katkilar?.length || 0}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Mini map
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

  document.title = `${b.isim} \u2014 İslam Bilim Yıldızları`;
}

// Toggle list expand/collapse
function toggleList(listId, btn) {
  const list = document.getElementById(listId);
  const items = list.querySelectorAll('.hidden-item');
  const showing = items[0]?.style.display !== 'none';
  items.forEach(i => i.style.display = showing ? 'none' : '');
  btn.textContent = showing ? `+${items.length} daha göster` : 'Daha az göster';
}
