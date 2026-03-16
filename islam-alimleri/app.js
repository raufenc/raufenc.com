/* === İslâm Âlimleri ve Evliyâlar — Ana Uygulama === */

let scholars = [];
let fuse = null;
let filteredScholars = [];
let displayedCount = 0;
const PAGE_SIZE = 36;
let map = null;
let markerCluster = null;
let miniMap = null;
let currentPage = 'home';
const detailCache = {};

// === Veri Yükleme ===
async function loadData() {
    const resp = await fetch('data/index.json');
    scholars = await resp.json();

    // Fuse.js arama indeksi
    fuse = new Fuse(scholars, {
        keys: ['isim', 'ozet', 'alan', 'yer'],
        threshold: 0.35,
        distance: 200,
        minMatchCharLength: 2,
    });

    initFilters();
    initAlphaIndex();
    applyFilters();
}

// === Filtreler ===
function initFilters() {
    const centuries = [...new Set(scholars.map(s => s.yuzyil_hicri).filter(Boolean))].sort((a,b) => a-b);
    const fields = [...new Set(scholars.flatMap(s => s.alan))].sort();
    const regions = [...new Set(scholars.map(s => s.yer).filter(Boolean))].sort();
    fillSelect('filterCentury', centuries, v => `${v}. yüzyıl`);
    fillSelect('filterField', fields);
    fillSelect('filterRegion', regions);

    document.getElementById('filterCentury').addEventListener('change', applyFilters);
    document.getElementById('filterField').addEventListener('change', applyFilters);
    document.getElementById('filterRegion').addEventListener('change', applyFilters);

    let debounceTimer;
    document.getElementById('searchInput').addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyFilters, 200);
    });
}

function fillSelect(id, values, formatter) {
    const sel = document.getElementById(id);
    values.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = formatter ? formatter(v) : v;
        sel.appendChild(opt);
    });
}

function applyFilters() {
    const query = document.getElementById('searchInput').value.trim();
    const century = document.getElementById('filterCentury').value;
    const field = document.getElementById('filterField').value;
    const region = document.getElementById('filterRegion').value;

    let results = scholars;

    // Metin arama
    if (query.length >= 2) {
        results = fuse.search(query).map(r => r.item);
    }

    // Filtreler
    if (century) results = results.filter(s => s.yuzyil_hicri == century);
    if (field) results = results.filter(s => s.alan.includes(field));
    if (region) results = results.filter(s => s.yer === region);

    filteredScholars = results;
    displayedCount = 0;

    document.getElementById('searchCount').textContent =
        `${filteredScholars.length} sonuç`;

    renderCards();
}

// === Alfabetik İndeks ===
function initAlphaIndex() {
    const container = document.getElementById('alphaIndex');
    const letters = new Set(scholars.map(s => s.isim.charAt(0).toUpperCase()));
    const turkishAlphabet = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');

    turkishAlphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'alpha-btn' + (letters.has(letter) ? '' : ' disabled');
        btn.textContent = letter;
        btn.onclick = () => {
            if (!letters.has(letter)) return;
            document.getElementById('searchInput').value = letter;
            filteredScholars = scholars.filter(s =>
                s.isim.toUpperCase().startsWith(letter)
            );
            displayedCount = 0;
            document.getElementById('searchCount').textContent =
                `${filteredScholars.length} sonuç`;
            renderCards();

            document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        container.appendChild(btn);
    });
}

// === Kart Renderlama ===
function renderCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';
    displayedCount = 0;
    loadMoreCards();
}

function loadMoreCards() {
    const grid = document.getElementById('cardsGrid');
    const end = Math.min(displayedCount + PAGE_SIZE, filteredScholars.length);

    for (let i = displayedCount; i < end; i++) {
        grid.appendChild(createCard(filteredScholars[i]));
    }
    displayedCount = end;

    document.getElementById('loadMore').style.display =
        displayedCount >= filteredScholars.length ? 'none' : 'block';
}

function createCard(scholar) {
    const card = document.createElement('div');
    card.className = 'scholar-card';
    card.onclick = () => showDetail(scholar.id);

    let tagsHtml = '';

    if (scholar.vefat_hicri) {
        tagsHtml += `<span class="tag tag-date">v. h.${scholar.vefat_hicri} / m.${scholar.vefat_miladi}</span>`;
    }

    scholar.alan.forEach(a => {
        const cls = getFieldClass(a);
        tagsHtml += `<span class="tag tag-field ${cls}">${a}</span>`;
    });

    if (scholar.yer) {
        tagsHtml += `<span class="tag tag-region">${scholar.yer}</span>`;
    }

    card.innerHTML = `
        <div class="card-name">${scholar.isim}</div>
        <div class="card-tags">${tagsHtml}</div>
        <div class="card-summary">${scholar.ozet}</div>
    `;
    return card;
}

function getFieldClass(field) {
    const map = {
        'Hadis': 'tag-field-hadis',
        'Fıkıh': 'tag-field-fikih',
        'Tasavvuf': 'tag-field-tasavvuf',
        'Tefsir': 'tag-field-tefsir',
        'Dil': 'tag-field-dil',
        'Tarih': 'tag-field-tarih',
        'Sahabe': 'tag-field-sahabe',
        'Tâbiîn': 'tag-field-tabiin',
    };
    return map[field] || '';
}

// === Detay Sayfası ===
async function showDetail(id) {
    const scholar = scholars.find(s => s.id === id);
    if (!scholar) return;

    const container = document.getElementById('detailContainer');

    // Yükleniyor göster
    container.innerHTML = `
        <div class="detail-main">
            <h2 class="detail-title">${scholar.isim}</h2>
            <div class="detail-text"><p>Yükleniyor...</p></div>
        </div>
        <div class="detail-sidebar">
            <div class="info-box">
                <h3>Bilgiler</h3>
                ${scholar.vefat_hicri ? `
                    <div class="info-row">
                        <span class="info-label">Vefât</span>
                        <span class="info-value">h. ${scholar.vefat_hicri} / m. ${scholar.vefat_miladi}</span>
                    </div>
                ` : ''}
                ${scholar.dogum_hicri ? `
                    <div class="info-row">
                        <span class="info-label">Doğum</span>
                        <span class="info-value">h. ${scholar.dogum_hicri} / m. ${scholar.dogum_miladi}</span>
                    </div>
                ` : ''}
                ${scholar.yuzyil_hicri ? `
                    <div class="info-row">
                        <span class="info-label">Yüzyıl</span>
                        <span class="info-value">${scholar.yuzyil_hicri}. yüzyıl (hicrî)</span>
                    </div>
                ` : ''}
                <div class="info-row">
                    <span class="info-label">Alan</span>
                    <span class="info-value">${scholar.alan.join(', ')}</span>
                </div>
                ${scholar.yer ? `
                    <div class="info-row">
                        <span class="info-label">Bölge</span>
                        <span class="info-value">${scholar.sehir ? scholar.sehir + ' — ' : ''}${scholar.yer}</span>
                    </div>
                ` : ''}
            </div>
            ${scholar.lat ? `
                <div class="info-box">
                    <h3>Konum</h3>
                    <div id="detailMiniMap"></div>
                </div>
            ` : ''}
        </div>
    `;

    showPage('detail');

    // Mini harita
    if (scholar.lat) {
        setTimeout(() => {
            if (miniMap) miniMap.remove();
            miniMap = L.map('detailMiniMap', { zoomControl: false }).setView([scholar.lat, scholar.lng], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap'
            }).addTo(miniMap);
            L.marker([scholar.lat, scholar.lng]).addTo(miniMap)
                .bindPopup(scholar.isim).openPopup();
        }, 100);
    }

    window.scrollTo(0, 0);

    // Tam metni lazy yükle
    let fullText;
    if (detailCache[id]) {
        fullText = detailCache[id];
    } else {
        try {
            const resp = await fetch(`data/details/${id}.json`);
            const detail = await resp.json();
            fullText = detail.tam_metin;
            detailCache[id] = fullText;
        } catch (e) {
            fullText = scholar.ozet;
        }
    }

    // Metin paragraflarına böl
    const paragraphs = fullText
        .split(/(?<=[.!?])\s{2,}/)
        .map(p => `<p>${p.trim()}</p>`)
        .join('');

    const textEl = container.querySelector('.detail-text');
    if (textEl) {
        textEl.innerHTML = paragraphs || `<p>${fullText}</p>`;
    }
}

// === Harita Sayfası ===
function initMap() {
    if (map) return;

    map = L.map('mapContainer').setView([33, 45], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
    }).addTo(map);

    markerCluster = L.markerClusterGroup({
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
    });
    map.addLayer(markerCluster);

    updateMapMarkers();

    const slider = document.getElementById('mapCenturySlider');
    const label = document.getElementById('mapCenturyLabel');
    slider.addEventListener('input', () => {
        const val = parseInt(slider.value);
        label.textContent = val >= 15 ? 'Tümü' : `1 — ${val}. yüzyıl`;
        updateMapMarkers(val >= 15 ? null : val);
    });
}

function updateMapMarkers(maxCentury) {
    markerCluster.clearLayers();

    const filtered = maxCentury
        ? scholars.filter(s => s.lat && s.yuzyil_hicri && s.yuzyil_hicri <= maxCentury)
        : scholars.filter(s => s.lat);

    filtered.forEach(s => {
        const marker = L.marker([s.lat, s.lng]);
        marker.bindPopup(`
            <div class="popup-name">${s.isim}</div>
            <div class="popup-date">${s.vefat_hicri ? `v. h.${s.vefat_hicri} / m.${s.vefat_miladi}` : ''}</div>
            <div class="popup-link" onclick="showDetail(${s.id})">Detay &rarr;</div>
        `);
        markerCluster.addLayer(marker);
    });
}

// === Zaman Çizelgesi ===
function initTimeline() {
    const container = document.getElementById('timelineContainer');
    if (container.children.length > 0) return;

    const byCentury = {};
    scholars.forEach(s => {
        if (!s.yuzyil_hicri) return;
        if (!byCentury[s.yuzyil_hicri]) byCentury[s.yuzyil_hicri] = [];
        byCentury[s.yuzyil_hicri].push(s);
    });

    const centuries = Object.keys(byCentury).sort((a,b) => a - b);

    centuries.forEach(c => {
        const section = document.createElement('div');
        section.className = 'timeline-century';

        const scholarCards = byCentury[c]
            .sort((a,b) => (a.vefat_hicri || 0) - (b.vefat_hicri || 0))
            .map(s => `
                <div class="timeline-card" onclick="showDetail(${s.id})">
                    <div class="tl-name">${s.isim}</div>
                    <div class="tl-date">${s.vefat_hicri ? `v. h.${s.vefat_hicri} / m.${s.vefat_miladi}` : ''}</div>
                    <div class="tl-field">${s.alan.join(', ')}</div>
                </div>
            `).join('');

        section.innerHTML = `
            <div class="century-marker">${c}.</div>
            <div class="century-line"></div>
            <h3 class="century-title">${c}. Yüzyıl (Hicrî)</h3>
            <div class="century-scholars">${scholarCards}</div>
        `;

        container.appendChild(section);
    });
}

// === Sayfa Yönetimi ===
function showPage(page) {
    currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.page === page);
    });

    if (page === 'map') {
        setTimeout(() => {
            initMap();
            map.invalidateSize();
        }, 100);
    }
    if (page === 'timeline') {
        initTimeline();
    }
}

// === Başlat ===
loadData();
