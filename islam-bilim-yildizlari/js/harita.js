initPage('harita');

const isDark = !document.documentElement.classList.contains('light');
const tileUrl = isDark
  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

const map = L.map('map-container', { zoomControl: true, scrollWheelZoom: true }).setView([33, 40], 4);
L.tileLayer(tileUrl, { attribution: '© OpenStreetMap, © CARTO', maxZoom: 18, subdomains: 'abcd' }).addTo(map);

// Region stats
const bk = Object.keys(BOLGELER).sort((a,b) => BOLGELER[b].length - BOLGELER[a].length);
document.getElementById('map-stats').innerHTML = bk.slice(0, 6).map(b =>
  `<div class="map-stat">${BOLGE_EMOJI[b]||'🌍'} <strong>${BOLGELER[b].length}</strong> ${b}</div>`
).join('');

// MarkerCluster
const cluster = L.markerClusterGroup({
  maxClusterRadius: 45,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 8,
  iconCreateFunction: function(c) {
    const cnt = c.getChildCount();
    let sz = 'small', dim = 36;
    if (cnt >= 10) { sz = 'medium'; dim = 44; }
    if (cnt >= 20) { sz = 'large'; dim = 52; }
    return L.divIcon({
      html: '<div><span>' + cnt + '</span></div>',
      className: 'marker-cluster marker-cluster-' + sz,
      iconSize: L.point(dim, dim)
    });
  }
});

BILGINLER.forEach(b => {
  const c = KOORDINATLAR[b.id];
  if (!c) return;
  const renk = alanRenk(b.alanBirincil);
  const icon = L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${renk};border:2px solid rgba(255,255,255,.4);box-shadow:0 0 10px ${renk}80;cursor:pointer"></div>`,
    iconSize: [14, 14], iconAnchor: [7, 7]
  });
  const marker = L.marker(c, { icon });
  const tags = b.alanlar.slice(0, 2).map(a =>
    `<span style="display:inline-block;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:700;background:${alanRenk(a)}20;color:${alanRenk(a)};border:1px solid ${alanRenk(a)}30">${a}</span>`
  ).join(' ');
  marker.bindPopup(`
    <div class="map-popup-name">${b.isim}</div>
    <div class="map-popup-meta">📅 ${b.dogum||'?'}–${b.vefat||'?'} · ${b.donem}</div>
    <div class="map-popup-tags">${tags}</div>
    <a class="map-popup-link" href="alim.html?id=${b.id}">Detay →</a>
  `, { maxWidth: 250 });
  cluster.addLayer(marker);
});

map.addLayer(cluster);
