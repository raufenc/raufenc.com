/* pages.js - Tum sayfa renderer'lari */
(function(){
function getFamilyClass(f) { return window.H.getFamilyClass(f); }
function slugify(s) { return window.H.slugify(s); }
function findConcept(id) { return window.H.findConcept(id); }
function getRefsForConcept(c) { return window.H.getRefsForConcept(c); }
function groupBy(arr, key) { return window.H.groupBy(arr, key); }
function getConceptsByFamily(f) { return window.H.getConceptsByFamily(f); }
function getAllFamilies() { return window.H.getAllFamilies(); }

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function conceptCard(c) {
  const fc = getFamilyClass(c.family);
  const refs = DATA.references.filter(r => r.pc === c.code);
  const refCount = refs.length;
  // Description: use desc, or fallback to first ref text, or sub-type hint
  let preview = c.desc || '';
  if (!preview && refs.length > 0) {
    preview = refs[0].text || '';
  }
  if (preview.length > 130) preview = preview.slice(0, 128) + '…';

  const refBadge = refCount > 0
    ? `<span class="cc-refs">${refCount} referans</span>`
    : '';
  return `<div class="card concept-card ${fc}" onclick="location.hash='#/kavram/${c.id}'">
    <div class="card-header">
      <span class="cc-code">${c.code||c.id}</span>
      <span class="cc-term">${c.term}</span>
    </div>
    ${preview ? `<div class="card-desc">${preview}</div>` : ''}
    <div class="card-footer">
      <span class="cc-family">${shortFamily(c.family)}</span>
      ${refBadge}
      <span class="cc-page">s.${c.p1||'—'}</span>
    </div>
  </div>`;
}

function shortFamily(f) {
  if (!f) return '';
  if (f.includes('Erdem')) return 'Değerler';
  if (f.includes('Kavramsal')) return 'Kavramsal';
  if (f.includes('Eğilim')) return 'Eğilimler';
  if (f.includes('Sosyal-Duygusal')) return 'SDB';
  if (f.includes('Okuryazarlık')) return 'Okuryazarlık';
  if (f.includes('Profil')) return 'Profil';
  if (f.includes('Model')) return 'Model';
  if (f.includes('Farklılaştırma')) return 'Farklılaştırma';
  if (f.includes('Öğrenme')) return 'Öğrenme';
  // Alan becerileri - shorten
  return f.replace(' Alan Becerileri','').replace(' Becerileri','').replace(' ve Öğretimi','').slice(0,25);
}

const VALUE_ICONS = {
  'Adalet':'⚖️','Aile Bütünlüğü':'👨‍👩‍👧‍👦','Çalışkanlık':'💪','Dostluk':'🤝','Duyarlılık':'💚',
  'Dürüstlük':'✊','Estetik':'🎨','Mahremiyet':'🔒','Merhamet':'🕊️','Mütevazılık':'🙏',
  'Özgürlük':'🕊️','Sabır':'⏳','Sağlıklı Yaşam':'🏃','Saygı':'🎩','Sevgi':'❤️',
  'Sorumluluk':'📋','Tasarruf':'💰','Temizlik':'✨','Vatanseverlik':'🇹🇷','Yardımseverlik':'🤲'
};

const PROFILE_ICONS = {
  'Ahlaklı':'⚖️','Bilge':'📖','Cesaretli':'🦁','Estetik':'🎨','İradeli':'💪',
  'Merhametli':'🕊️','Sağlıklı':'🏃','Sorgulayıcı':'🔍','Üretken':'⚡','Vatansever':'🇹🇷'
};

const GAME_ICONS = ['🔗','❓','⚡','🌳','📄','📝','📝','📊','⚡','🃏'];

// ==================== HOME ====================
function home(app) {
  app.innerHTML = `
    <div class="hero">
      <h1>Türkiye Yüzyılı Maarif Modeli</h1>
      <p>Eğitim modelinin tüm kavramlarını keşfedin, oyunlarla öğrenin, kendinizi test edin.</p>
      <div class="hero-actions">
        <a href="#/kavramlar" class="btn btn-primary">📚 Kavramları Keşfet</a>
        <a href="#/oyunlar" class="btn btn-secondary">🎮 Oyunlar</a>
        <a href="#/degerler" class="btn btn-secondary">⭐ Değerler</a>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat-card"><div class="stat-num">269</div><div class="stat-label">Kavram</div></div>
      <div class="stat-card"><div class="stat-num">20</div><div class="stat-label">Değer</div></div>
      <div class="stat-card"><div class="stat-num">10</div><div class="stat-label">Oyun</div></div>
      <div class="stat-card"><div class="stat-num">9</div><div class="stat-label">Okuryazarlık</div></div>
      <div class="stat-card"><div class="stat-num">1802</div><div class="stat-label">Referans</div></div>
    </div>
    <a href="#/rehber" class="card" style="display:block;margin-bottom:1.5rem;overflow:hidden;text-decoration:none;color:inherit;border:2px solid var(--primary);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg)">
      <div style="background:linear-gradient(135deg,#1e40af 0%,#3b82f6 50%,#0891b2 100%);color:#fff;padding:1.5rem;display:flex;align-items:center;gap:1.25rem">
        <span style="font-size:2.5rem">📖</span>
        <div>
          <div style="font-size:1.25rem;font-weight:700">Program Rehberim</div>
          <div style="font-size:.9rem;opacity:.9;margin-top:.25rem">Ogretmen El Kitabi — Haftalik plan, ders akisi, materyaller</div>
        </div>
        <span style="margin-left:auto;font-size:1.5rem;opacity:.7">&rarr;</span>
      </div>
      <div style="padding:.75rem 1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;font-size:.85rem;color:var(--text-secondary)">
        <span>📅 Haftalik Plan</span>
        <span>📋 Ders Akisi</span>
        <span>📦 202 Materyal</span>
        <span>🛠️ Teknikler</span>
        <span>📊 Olcme Araclari</span>
      </div>
    </a>
    <h2 class="section-title"><span class="st-icon">🚀</span> Hızlı Erişim</h2>
    <div class="quick-grid">
      <a href="#/kavramlar" class="quick-card"><span class="qc-icon">📚</span><span class="qc-title">Kavram Kütüphanesi</span><span class="qc-count">269 kavram</span></a>
      <a href="#/beceriler" class="quick-card"><span class="qc-icon">🧠</span><span class="qc-title">Beceri Gezgini</span><span class="qc-count">Kavramsal + Alan</span></a>
      <a href="#/degerler" class="quick-card"><span class="qc-icon">⭐</span><span class="qc-title">Değerler Merkezi</span><span class="qc-count">20 değer</span></a>
      <a href="#/ogrenci-profili" class="quick-card"><span class="qc-icon">👤</span><span class="qc-title">Öğrenci Profili</span><span class="qc-count">10 özellik</span></a>
      <a href="#/okuryazarlik" class="quick-card"><span class="qc-icon">📖</span><span class="qc-title">Okuryazarlık</span><span class="qc-count">9 tür</span></a>
      <a href="#/oyunlar" class="quick-card"><span class="qc-icon">🎮</span><span class="qc-title">Oyun Merkezi</span><span class="qc-count">10 oyun</span></a>
      <a href="#/harita" class="quick-card"><span class="qc-icon">🗺️</span><span class="qc-title">Öğrenme Haritası</span><span class="qc-count">47 bölüm</span></a>
      <a href="#/arama" class="quick-card"><span class="qc-icon">🔍</span><span class="qc-title">Akıllı Arama</span><span class="qc-count">Tümünü ara</span></a>
    </div>
    ${renderLastVisited()}
    <div class="img-section mt-3"><img src="img/p004_genel_bakis.png" alt="Maarif Modeli Genel Bakış" loading="lazy"></div>
  `;
}

function renderLastVisited() {
  const s = Store.get();
  if (s.visited.length === 0) return '';
  const recent = s.visited.slice(-5).reverse()
    .map(id => DATA.concepts.find(c => c.id === id))
    .filter(Boolean);
  if (recent.length === 0) return '';
  return `<h2 class="section-title mt-3"><span class="st-icon">🕐</span> Son Ziyaret Ettikleriniz</h2>
    <div class="related-grid">${recent.map(c =>
      `<a href="#/kavram/${c.id}" class="related-chip">${c.term}</a>`
    ).join('')}</div>`;
}

// ==================== KAVRAMLAR ====================
function kavramlar(app) {
  const families = getAllFamilies();
  let activeFamily = null;

  function render() {
    const filtered = activeFamily
      ? DATA.concepts.filter(c => c.family === activeFamily)
      : DATA.concepts;

    app.innerHTML = `
      <h1 class="section-title"><span class="st-icon">📚</span> Kavram Kütüphanesi</h1>
      <p class="section-sub">${DATA.concepts.length} kavram, tüm aile ve alt aileler</p>
      <div class="search-box"><input type="text" id="kavramSearch" placeholder="Kavram ara... (terim, kod veya açıklama)"></div>
      <div class="tabs" id="familyTabs">
        <button class="tab ${!activeFamily?'active':''}" data-fam="">Tümü (${DATA.concepts.length})</button>
        ${families.map(([f,cnt]) =>
          `<button class="tab ${activeFamily===f?'active':''}" data-fam="${f}">${shortFamily(f)} (${cnt})</button>`
        ).join('')}
      </div>
      <div class="card-grid" id="conceptGrid">
        ${filtered.map(conceptCard).join('')}
      </div>
    `;

    // Tab clicks
    app.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        activeFamily = t.dataset.fam || null;
        render();
      });
    });

    // Search
    const input = document.getElementById('kavramSearch');
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = input.value.trim();
        const grid = document.getElementById('conceptGrid');
        if (!q) {
          grid.innerHTML = filtered.map(conceptCard).join('');
          return;
        }
        const results = Search.quickFilter(q, filtered, ['term','code','desc','family']);
        grid.innerHTML = results.length
          ? results.map(conceptCard).join('')
          : '<div class="empty-state"><span class="es-icon">🔍</span><p class="es-text">Sonuç bulunamadı</p></div>';
      }, 200);
    });
    input.focus();
  }
  render();
}

// ==================== KAVRAM DETAY ====================
function kavramDetay(app, id) {
  const c = findConcept(decodeURIComponent(id));
  if (!c) { app.innerHTML = '<div class="empty-state"><span class="es-icon">❌</span><p>Kavram bulunamadı. <a href="#/kavramlar">Geri dön</a></p></div>'; return; }

  Store.visitConcept(c.id);
  const refs = getRefsForConcept(c);
  const siblings = DATA.concepts.filter(s => s.family === c.family && s.id !== c.id).slice(0,12);
  const fc = getFamilyClass(c.family);

  const sbRefs   = refs.filter(r => r.type === 'süreç_bileşeni');
  const eylemRefs= refs.filter(r => r.type === 'eylem');
  const gRefs    = refs.filter(r => r.type === 'gösterge');
  const otherRefs= refs.filter(r => !['süreç_bileşeni','eylem','gösterge'].includes(r.type));

  // Build description: use desc, or synthesize from refs
  const descHTML = c.desc
    ? `<div class="detail-desc">${c.desc}</div>`
    : (sbRefs.length > 0
        ? `<div class="detail-desc">Bu kavram; <strong>${sbRefs.slice(0,3).map(r=>r.text.replace(/\.$/, '').slice(0,60)).join(', ')}</strong> süreçlerini kapsar.</div>`
        : '');

  // Collect child concepts (sub-items defined as concepts)
  const childConcepts = DATA.concepts.filter(ch => ch.parent === c.term || ch.parent === c.code);

  app.innerHTML = `
    <div class="breadcrumb">
      <a href="#/">Ana Sayfa</a><span class="bc-sep">›</span>
      <a href="#/kavramlar">Kavramlar</a><span class="bc-sep">›</span>
      <span>${c.term}</span>
    </div>

    <div class="detail-header ${fc}">
      <div class="detail-badges">
        <span class="detail-badge cc-family">${shortFamily(c.family)}</span>
        ${c.sub ? `<span class="detail-badge badge-sub">${c.sub}</span>` : ''}
        ${c.code ? `<span class="detail-badge badge-code">${c.code}</span>` : ''}
        <span class="detail-badge badge-page">📄 s.${c.p1}${c.p2 && c.p2!==c.p1 ? '–'+c.p2 : ''}</span>
      </div>
      <h1 class="detail-title">${c.term}</h1>
      ${c.parent ? (function(){ const pc = DATA.concepts.find(x=>x.term===c.parent||x.code===c.parent||x.id===c.parent); return `<div class="detail-parent">⬆️ ${pc ? `<a href="#/kavram/${pc.id}">${c.parent}</a>` : `<span>${c.parent}</span>`} kapsamında</div>`; })() : ''}
      ${descHTML}
    </div>

    ${sbRefs.length > 0 ? `
    <div class="detail-section edu-section edu-sb">
      <div class="edu-header"><span class="edu-icon">🔢</span><div><h3>Süreç Adımları</h3><p class="edu-sub">Bu kavram şu aşamalardan oluşur:</p></div></div>
      <ol class="edu-list">
        ${sbRefs.map((r,i) => `<li><span class="step-num">${i+1}</span><span>${r.text}</span></li>`).join('')}
      </ol>
    </div>` : ''}

    ${gRefs.length > 0 ? `
    <div class="detail-section edu-section edu-gosterge">
      <div class="edu-header"><span class="edu-icon">👁️</span><div><h3>Gözlemlenebilir Davranışlar</h3><p class="edu-sub">Bu kavrama sahip bireyden şunlar beklenir:</p></div></div>
      <ul class="edu-list">
        ${gRefs.map(r => `<li><span class="check-icon">✓</span><span>${r.text}</span></li>`).join('')}
      </ul>
    </div>` : ''}

    ${eylemRefs.length > 0 ? `
    <div class="detail-section edu-section edu-eylem">
      <div class="edu-header"><span class="edu-icon">⚡</span><div><h3>Somut Eylemler</h3><p class="edu-sub">Öğrenci bu değeri/beceriyi yaşatmak için şunları yapar:</p></div></div>
      <ul class="edu-list">
        ${eylemRefs.map(r => `<li><span class="arrow-icon">→</span><span>${r.text}</span></li>`).join('')}
      </ul>
    </div>` : ''}

    ${otherRefs.length > 0 ? `
    <div class="detail-section">
      <h3>📋 Diğer Referanslar</h3>
      <ul class="ref-list">
        ${otherRefs.map(r => `<li class="ref-item">
          <span class="ref-code">${r.code}</span>
          <span>${r.text}</span>
        </li>`).join('')}
      </ul>
    </div>` : ''}

    ${childConcepts.length > 0 ? `
    <div class="detail-section">
      <h3>📌 Alt Kavramlar</h3>
      <div class="related-grid">
        ${childConcepts.map(ch => `<a href="#/kavram/${ch.id}" class="related-chip">${ch.term}</a>`).join('')}
      </div>
    </div>` : ''}

    ${buildMiniQuiz(c)}

    ${siblings.length > 0 ? `
    <div class="detail-section">
      <h3>🔗 Aynı Aileden Diğer Kavramlar</h3>
      <div class="related-grid">
        ${siblings.map(s => `<a href="#/kavram/${s.id}" class="related-chip">${s.term}</a>`).join('')}
      </div>
    </div>` : ''}

    ${c.p1 && DATA.assets && DATA.assets[c.p1] ? `
    <div class="detail-section">
      <h3>📷 Kaynak Görsel</h3>
      <a href="#/kaynak/${c.p1}"><img src="img/${DATA.assets[c.p1].file}" alt="${DATA.assets[c.p1].alt}" style="max-width:100%;border-radius:var(--radius);cursor:pointer"></a>
    </div>` : ''}
  `;
}

function typeLabel(t) {
  if (t === 'süreç_bileşeni') return 'Süreç Bileşeni';
  if (t === 'gösterge') return 'Gösterge';
  if (t === 'eylem') return 'Eylem';
  if (t === 'resmi_kayit') return 'Resmi Kayıt';
  return t || 'Diğer';
}
function typeClass(t) {
  if (t === 'süreç_bileşeni') return 'ref-type-sb';
  if (t === 'gösterge') return 'ref-type-g';
  if (t === 'eylem') return 'ref-type-e';
  return '';
}

function buildMiniQuiz(concept) {
  const family = DATA.concepts.filter(c => c.family === concept.family && c.desc && c.id !== concept.id);
  if (family.length < 3 || !concept.desc) return '';

  // Pick 3 wrong answers
  const shuffled = family.sort(() => Math.random()-.5).slice(0,3);
  const options = [concept, ...shuffled].sort(() => Math.random()-.5);

  return `<div class="detail-section" id="miniQuiz">
    <h3>🎯 Mini Quiz</h3>
    <p class="game-question">Bu tanım hangi kavrama aittir?<br><em>"${concept.desc.slice(0,150)}${concept.desc.length>150?'...':''}"</em></p>
    <div class="options-grid">
      ${options.map(o => `<button class="option-btn" data-correct="${o.id===concept.id}" onclick="handleMiniQuiz(this,'${concept.id}')">${o.term}</button>`).join('')}
    </div>
  </div>`;
}

window.handleMiniQuiz = function(btn, correctId) {
  const quiz = document.getElementById('miniQuiz');
  if (!quiz) return;
  quiz.querySelectorAll('.option-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.correct === 'true') b.classList.add('correct');
  });
  if (btn.dataset.correct !== 'true') {
    btn.classList.add('wrong');
    Store.updateMastery(correctId, false);
  } else {
    Store.updateMastery(correctId, true);
    Store.addXP(5);
  }
};

// ==================== BECERILER ====================
function beceriler(app) {
  Store.visitPage('beceriler');
  const kavramsal = DATA.concepts.filter(c => c.family === 'Kavramsal Beceriler');
  const alanFamilies = getAllFamilies().filter(([f]) => f.includes('Alan Becerileri'));

  app.innerHTML = `
    <h1 class="section-title"><span class="st-icon">🧠</span> Beceri Gezgini</h1>
    <p class="section-sub">Kavramsal beceriler ve 10 alan becerisi</p>
    <div class="img-section"><img src="img/p016_kavramsal_beceriler.png" alt="Kavramsal Beceriler" loading="lazy"></div>
    <div class="detail-section mt-2">
      <h3>📐 Kavramsal Beceriler</h3>
      ${buildSkillTree(kavramsal)}
    </div>
    <h2 class="section-title mt-3"><span class="st-icon">📚</span> Alan Becerileri</h2>
    ${alanFamilies.map(([fam, cnt]) => {
      const skills = getConceptsByFamily(fam);
      return `<div class="detail-section">
        <h3>${fam} (${cnt})</h3>
        ${buildSkillTree(skills)}
      </div>`;
    }).join('')}
  `;

  // Tree toggle
  app.querySelectorAll('.tree-toggle').forEach(t => {
    t.addEventListener('click', () => {
      t.classList.toggle('open');
      const children = t.nextElementSibling;
      if (children) children.classList.toggle('open');
    });
  });
}

function buildSkillTree(concepts) {
  // Group by sub
  const bySub = groupBy(concepts.filter(c => c.sub !== 'Kategori'), 'sub');
  const categories = concepts.filter(c => c.sub === 'Kategori');

  let html = '<ul class="tree">';
  categories.forEach(cat => {
    const children = bySub[cat.term] || concepts.filter(c => c.parent === cat.term);
    const refs = getRefsForConcept(cat);
    html += `<li>
      <div class="tree-toggle">${cat.code ? `<span class="cc-code">${cat.code}</span>` : ''} ${cat.term}${cat.desc ? ` <small style="color:var(--text-light)">— ${cat.desc.slice(0,60)}</small>` : ''}</div>
      <div class="tree-children">
        ${children.map(ch => {
          const chRefs = getRefsForConcept(ch);
          return `<div class="tree-leaf" onclick="location.hash='#/kavram/${ch.id}'">${ch.code ? `<span class="cc-code">${ch.code}</span> ` : ''}${ch.term}${chRefs.length ? ` <small>(${chRefs.length} ref)</small>` : ''}</div>`;
        }).join('')}
      </div>
    </li>`;
  });

  // Uncategorized
  const uncategorized = concepts.filter(c => c.sub !== 'Kategori' && !categories.some(cat => c.parent === cat.term));
  if (uncategorized.length > 0 && categories.length === 0) {
    uncategorized.forEach(c => {
      html += `<li><div class="tree-leaf" onclick="location.hash='#/kavram/${c.id}'">${c.code ? `<span class="cc-code">${c.code}</span> ` : ''}${c.term}</div></li>`;
    });
  }
  html += '</ul>';
  return html;
}

// ==================== DEGERLER ====================
function degerler(app) {
  const values = DATA.concepts.filter(c => c.family === 'Erdem-Değer-Eylem' && c.sub === 'Değer');
  const groups = groupBy(values, 'parent');

  let selectedValue = null;

  function render() {
    app.innerHTML = `
      <h1 class="section-title"><span class="st-icon">⭐</span> Erdem-Değer-Eylem Merkezi</h1>
      <p class="section-sub">20 değer, eylemler ve yöntemlerle birlikte</p>
      <div class="img-section"><img src="img/p037_erdem_deger_eylem.png" alt="Erdem-Değer-Eylem" loading="lazy"></div>
      <div class="tabs mt-2">
        <button class="tab ${!selectedValue?'active':''}" onclick="this.dispatchEvent(new CustomEvent('filterGroup',{bubbles:true,detail:null}))">Tümü (${values.length})</button>
        ${Object.keys(groups).map(g =>
          `<button class="tab" onclick="this.dispatchEvent(new CustomEvent('filterGroup',{bubbles:true,detail:'${g}'}))">${g} (${groups[g].length})</button>`
        ).join('')}
      </div>
      <div class="value-grid" id="valueGrid">
        ${values.map(v => `
          <div class="value-card" onclick="location.hash='#/kavram/${v.id}'">
            <div class="vc-icon">${VALUE_ICONS[v.term]||'⭐'}</div>
            <div class="vc-name">${v.term}</div>
            <div class="vc-group">${v.parent||''}</div>
            <div style="font-size:.75rem;color:var(--text-secondary);margin-top:.35rem">${(v.desc||'').slice(0,60)}...</div>
          </div>
        `).join('')}
      </div>
      <div class="mt-3 text-center">
        <a href="#/quiz/Erdem-Değer-Eylem" class="btn btn-primary">🎯 Değerler Quizi</a>
        <a href="#/oyun/GAME06" class="btn btn-outline" style="margin-left:.5rem">📝 Mini Vaka Oyunu</a>
      </div>
    `;
  }
  render();
}

// ==================== OGRENCI PROFILI ====================
function ogrenciProfili(app) {
  const traits = DATA.concepts.filter(c => c.family === 'Öğrenci Profili' && c.sub === 'Profil Özelliği');
  let activeTrait = null;

  function render() {
    const subTraits = activeTrait
      ? DATA.concepts.filter(c => c.family === 'Öğrenci Profili' && c.sub !== 'Profil Özelliği' && (c.sub||'').toLowerCase().includes(activeTrait.term.toLowerCase().replace(/\u0307/g,'')))
      : [];

    app.innerHTML = `
      <h1 class="section-title"><span class="st-icon">👤</span> Öğrenci Profili: Yetkin ve Erdemli İnsan</h1>
      <p class="section-sub">10 profil özelliği ve alt nitelikleri</p>
      <div class="img-section"><img src="img/p008_ogrenci_profili.png" alt="Öğrenci Profili" loading="lazy"></div>
      <div class="profile-wheel mt-2">
        ${traits.map(t => `
          <div class="pw-item ${activeTrait&&activeTrait.id===t.id?'active':''}" onclick="this.dispatchEvent(new CustomEvent('selectTrait',{bubbles:true,detail:'${t.id}'}))">
            <div class="pw-circle">${PROFILE_ICONS[t.term]||'👤'}</div>
            <div class="pw-label">${t.term}</div>
          </div>
        `).join('')}
      </div>
      ${activeTrait ? `
        <div class="detail-section mt-2">
          <h3>${PROFILE_ICONS[activeTrait.term]||'👤'} ${activeTrait.term}</h3>
          ${activeTrait.desc ? `<p class="card-desc">${activeTrait.desc}</p>` : ''}
          ${subTraits.length > 0 ? `
            <div class="card-grid mt-2">
              ${subTraits.map(s => `
                <div class="card">
                  <div class="card-header">${s.term}</div>
                  <div class="card-desc">${s.desc||''}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      ` : '<p class="text-center mt-2" style="color:var(--text-secondary)">Bir profil özelliği seçin</p>'}
      <div class="mt-3 text-center">
        <a href="#/quiz/Öğrenci Profili" class="btn btn-primary">🎯 Profil Quizi</a>
      </div>
    `;

    // Trait selection
    app.addEventListener('selectTrait', (e) => {
      activeTrait = traits.find(t => t.id === e.detail) || null;
      render();
    });
  }
  render();
}

// ==================== OKURYAZARLIK ====================
function okuryazarlik(app) {
  const literacies = DATA.concepts.filter(c => c.family === 'Okuryazarlık Becerileri' && c.sub === 'Okuryazarlık');

  app.innerHTML = `
    <h1 class="section-title"><span class="st-icon">📖</span> Okuryazarlık Merkezi</h1>
    <p class="section-sub">9 okuryazarlık türü</p>
    <div class="img-section"><img src="img/p039_sistem_okuryazarligi.png" alt="Sistem Okuryazarlığı" loading="lazy"></div>
    <div class="card-grid mt-2">
      ${literacies.map(l => {
        const refs = getRefsForConcept(l);
        return `<div class="card concept-card fam-okur" onclick="location.hash='#/kavram/${l.id}'">
          <div class="card-header"><span class="cc-code">${l.code}</span> ${l.term}</div>
          <div class="card-desc">${(l.desc||'').slice(0,120)}...</div>
          <div class="card-footer"><span>${refs.length} referans</span><span>s.${l.p1}</span></div>
        </div>`;
      }).join('')}
    </div>
    <div class="mt-3 text-center">
      <a href="#/quiz/Okuryazarlık Becerileri" class="btn btn-primary">🎯 Okuryazarlık Quizi</a>
    </div>
  `;
}

// ==================== HARITA ====================
function harita(app) {
  app.innerHTML = `
    <h1 class="section-title"><span class="st-icon">🗺️</span> Öğrenme Haritası</h1>
    <p class="section-sub">Kitabın bölüm yapısı (${DATA.sections.length} bölüm)</p>
    <div class="detail-section">
      <ul class="tree" id="sectionTree">
        ${DATA.sections.map(s => {
          const level = (s.code.match(/\./g)||[]).length;
          const isEK = s.code.startsWith('EK');
          const concepts = DATA.concepts.filter(c => c.p1 >= s.p1 && c.p1 <= s.p2);
          return `<li style="margin-left:${level * 1.2}rem">
            <div class="tree-toggle ${concepts.length>0?'':''}">
              <span class="cc-code">${s.code}</span>
              ${s.title}
              <small style="color:var(--text-light);margin-left:auto">s.${s.p1}–${s.p2}</small>
            </div>
            ${concepts.length > 0 ? `<div class="tree-children">
              ${concepts.slice(0,15).map(c =>
                `<div class="tree-leaf" onclick="location.hash='#/kavram/${c.id}'"><span class="cc-code">${c.code||c.id}</span> ${c.term}</div>`
              ).join('')}
              ${concepts.length > 15 ? `<div class="tree-leaf" style="color:var(--text-light)">... ve ${concepts.length-15} kavram daha</div>` : ''}
            </div>` : ''}
          </li>`;
        }).join('')}
      </ul>
    </div>
  `;

  app.querySelectorAll('.tree-toggle').forEach(t => {
    t.addEventListener('click', () => {
      t.classList.toggle('open');
      const ch = t.nextElementSibling;
      if (ch) ch.classList.toggle('open');
    });
  });
}

// ==================== ARAMA ====================
function arama(app, query) {
  app.innerHTML = `
    <h1 class="section-title"><span class="st-icon">🔍</span> Akıllı Arama</h1>
    <div class="search-box"><input type="text" id="searchInput" placeholder="Kavram, kod veya açıklama ara..." value="${query?decodeURIComponent(query):''}"></div>
    <div id="searchResults"></div>
  `;

  const input = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('searchResults');
  let timer;

  function doSearch(q) {
    if (!q || q.length < 2) {
      resultsDiv.innerHTML = '<div class="empty-state"><span class="es-icon">🔍</span><p class="es-text">En az 2 karakter yazın</p></div>';
      return;
    }
    const results = Search.search(q);
    let html = '';
    if (results.concepts.length > 0) {
      html += `<div class="search-group"><h3>📚 Kavramlar (${results.concepts.length})</h3><div class="card-grid">${results.concepts.map(conceptCard).join('')}</div></div>`;
    }
    if (results.references.length > 0) {
      html += `<div class="search-group"><h3>📋 Referanslar (${results.references.length})</h3><ul class="ref-list">${results.references.map(r =>
        `<li class="ref-item"><span class="ref-code">${r.code}</span><span class="ref-type ${typeClass(r.type)}">${typeLabel(r.type)}</span><span>${r.text.slice(0,200)}</span></li>`
      ).join('')}</ul></div>`;
    }
    if (!html) html = '<div class="empty-state"><span class="es-icon">😕</span><p class="es-text">Sonuç bulunamadı</p></div>';
    resultsDiv.innerHTML = html;
  }

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => doSearch(input.value.trim()), 300);
  });
  input.focus();
  if (query) doSearch(decodeURIComponent(query));
}

// ==================== OYUNLAR ====================
function oyunlar(app) {
  const store = Store.get();
  app.innerHTML = `
    <h1 class="section-title"><span class="st-icon">🎮</span> Oyun Merkezi</h1>
    <p class="section-sub">10 farklı oyunla öğrenmeyi pekiştirin</p>
    <div class="game-grid">
      ${DATA.games.map((g, i) => {
        const score = store.gameScores[g.id];
        return `<div class="game-card" onclick="location.hash='#/oyun/${g.id}'">
          <div class="gc-icon">${GAME_ICONS[i]||'🎮'}</div>
          <div class="gc-name">${g.name}</div>
          <div class="gc-mech">${g.mech}</div>
          <div class="gc-best">${g.best}</div>
          ${score ? `<div class="gc-score">🏆 ${score}</div>` : ''}
        </div>`;
      }).join('')}
    </div>
  `;
}

// ==================== QUIZ ====================
function quiz(app, familyParam) {
  const family = decodeURIComponent(familyParam || '');
  const concepts = family
    ? DATA.concepts.filter(c => c.family === family && c.desc)
    : DATA.concepts.filter(c => c.desc);

  if (concepts.length < 4) {
    app.innerHTML = '<div class="empty-state"><span class="es-icon">❌</span><p>Bu aile için yeterli soru yok. <a href="#/kavramlar">Geri dön</a></p></div>';
    return;
  }

  const questions = [];
  const pool = [...concepts].sort(() => Math.random()-.5);
  const qCount = Math.min(10, pool.length);

  for (let i = 0; i < qCount; i++) {
    const correct = pool[i];
    const wrongs = concepts.filter(c => c.id !== correct.id).sort(() => Math.random()-.5).slice(0,3);
    const options = [correct, ...wrongs].sort(() => Math.random()-.5);
    questions.push({ concept: correct, options });
  }

  let current = 0, score = 0, answered = false;

  function renderQ() {
    if (current >= questions.length) {
      // Result
      Store.addQuiz({ family, score, total: questions.length });
      const pct = Math.round(score/questions.length*100);
      const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 60 ? '⭐⭐' : pct >= 30 ? '⭐' : '';
      app.innerHTML = `
        <div class="result-screen">
          <div class="result-stars">${stars||'😕'}</div>
          <div class="result-score">${score}/${questions.length}</div>
          <div class="result-label">${family ? shortFamily(family)+' Quizi' : 'Genel Quiz'} — %${pct}</div>
          <div class="progress-bar mt-2"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="result-actions">
            <a href="#/quiz/${encodeURIComponent(family)}" class="btn btn-primary" onclick="event.preventDefault();location.reload()">🔄 Tekrar</a>
            <a href="#/oyunlar" class="btn btn-outline">🎮 Oyunlar</a>
            <a href="#/kavramlar" class="btn btn-outline">📚 Kavramlar</a>
          </div>
        </div>`;
      return;
    }

    const q = questions[current];
    answered = false;
    app.innerHTML = `
      <div class="breadcrumb">
        <a href="#/">Ana Sayfa</a><span class="bc-sep">›</span>
        <span>${family ? shortFamily(family)+' Quizi' : 'Quiz'}</span>
      </div>
      <div class="game-hud">
        <div class="hud-item"><div class="hud-val">${current+1}/${questions.length}</div><div class="hud-label">Soru</div></div>
        <div class="hud-item"><div class="hud-val">${score}</div><div class="hud-label">Doğru</div></div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${(current/questions.length)*100}%"></div></div>
      <div class="game-area">
        <p class="game-question">Bu tanım hangi kavrama aittir?</p>
        <p style="text-align:center;font-style:italic;color:var(--text-secondary);margin-bottom:1.5rem">"${q.concept.desc.slice(0,200)}"</p>
        <div class="options-grid" id="quizOptions">
          ${q.options.map(o => `<button class="option-btn" data-id="${o.id}">${o.term}</button>`).join('')}
        </div>
        <div id="quizFeedback" style="text-align:center;margin-top:1rem"></div>
      </div>
    `;

    app.querySelectorAll('#quizOptions .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = btn.dataset.id === q.concept.id;
        if (correct) { score++; btn.classList.add('correct'); }
        else { btn.classList.add('wrong'); }
        app.querySelectorAll('#quizOptions .option-btn').forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.id === q.concept.id) b.classList.add('correct');
        });
        Store.updateMastery(q.concept.id, correct);
        document.getElementById('quizFeedback').innerHTML = `
          <p>${correct ? '✅ Doğru!' : '❌ Yanlış!'} Cevap: <strong>${q.concept.term}</strong></p>
          <button class="btn btn-primary mt-1" onclick="window._nextQ()">Sonraki →</button>
        `;
      });
    });

    window._nextQ = () => { current++; renderQ(); };
  }

  renderQ();
}

// ==================== KARSILASTIR ====================
function karsilastir(app, id1, id2) {
  const c1 = findConcept(decodeURIComponent(id1||''));
  const c2 = findConcept(decodeURIComponent(id2||''));

  if (!c1 || !c2) {
    // Show comparison picker
    app.innerHTML = `
      <h1 class="section-title"><span class="st-icon">⚡</span> Kavram Karşılaştır</h1>
      <p class="section-sub">İki kavramı seçerek farkları görün</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div><label>1. Kavram</label><select id="cmp1" style="width:100%;padding:.5rem;margin-top:.25rem;border-radius:var(--radius-sm);border:2px solid var(--border)">
          ${DATA.concepts.filter(c=>c.desc).map(c => `<option value="${c.id}">${c.term} (${shortFamily(c.family)})</option>`).join('')}
        </select></div>
        <div><label>2. Kavram</label><select id="cmp2" style="width:100%;padding:.5rem;margin-top:.25rem;border-radius:var(--radius-sm);border:2px solid var(--border)">
          ${DATA.concepts.filter(c=>c.desc).map(c => `<option value="${c.id}">${c.term} (${shortFamily(c.family)})</option>`).join('')}
        </select></div>
      </div>
      <div class="text-center mt-2"><button class="btn btn-primary" onclick="location.hash='#/karsilastir/'+document.getElementById('cmp1').value+'/'+document.getElementById('cmp2').value">Karşılaştır</button></div>
    `;
    return;
  }

  const r1 = getRefsForConcept(c1), r2 = getRefsForConcept(c2);
  app.innerHTML = `
    <div class="breadcrumb"><a href="#/">Ana Sayfa</a><span class="bc-sep">›</span><span>Karşılaştır</span></div>
    <h1 class="section-title"><span class="st-icon">⚡</span> ${c1.term} vs ${c2.term}</h1>
    <table class="compare-table">
      <tr><th>Boyut</th><th>${c1.term}</th><th>${c2.term}</th></tr>
      <tr><td><strong>Kod</strong></td><td>${c1.code||'—'}</td><td>${c2.code||'—'}</td></tr>
      <tr><td><strong>Aile</strong></td><td>${shortFamily(c1.family)}</td><td>${shortFamily(c2.family)}</td></tr>
      <tr><td><strong>Alt Aile</strong></td><td>${c1.sub||'—'}</td><td>${c2.sub||'—'}</td></tr>
      <tr><td><strong>Tanım</strong></td><td>${c1.desc||'—'}</td><td>${c2.desc||'—'}</td></tr>
      <tr><td><strong>Sayfa</strong></td><td>${c1.p1||'—'}</td><td>${c2.p1||'—'}</td></tr>
      <tr><td><strong>Referans Sayısı</strong></td><td>${r1.length}</td><td>${r2.length}</td></tr>
    </table>
    <div class="mt-2 flex gap-1 justify-between">
      <a href="#/kavram/${c1.id}" class="btn btn-outline">${c1.term} Detay →</a>
      <a href="#/kavram/${c2.id}" class="btn btn-outline">${c2.term} Detay →</a>
    </div>
  `;
}

// ==================== KAYNAK ====================
function kaynak(app, pageNo) {
  const pg = parseInt(pageNo);
  const asset = DATA.assets ? DATA.assets[pg] : null;
  const section = DATA.sections.find(s => s.p1 <= pg && s.p2 >= pg);
  const concepts = DATA.concepts.filter(c => c.p1 === pg || (c.p1 <= pg && c.p2 >= pg));

  app.innerHTML = `
    <div class="breadcrumb"><a href="#/">Ana Sayfa</a><span class="bc-sep">›</span><a href="#/harita">Harita</a><span class="bc-sep">›</span><span>Sayfa ${pg}</span></div>
    <h1 class="section-title"><span class="st-icon">📄</span> Kaynak: Sayfa ${pg}</h1>
    ${section ? `<p class="section-sub">${section.code} — ${section.title}</p>` : ''}
    <div class="source-viewer">
      <div class="source-img">
        ${asset ? `<img src="img/${asset.file}" alt="${asset.alt}" onclick="this.style.transform=this.style.transform==='scale(2)'?'scale(1)':'scale(2)'">` : `<div class="empty-state"><span class="es-icon">📄</span><p>Bu sayfa için görsel yok</p></div>`}
      </div>
      <div class="source-info">
        ${asset ? `<h3>${asset.title}</h3>` : ''}
        ${concepts.length > 0 ? `
          <h4 class="mt-2">Bu Sayfadaki Kavramlar (${concepts.length})</h4>
          <div class="related-grid mt-1">${concepts.map(c => `<a href="#/kavram/${c.id}" class="related-chip">${c.term}</a>`).join('')}</div>
        ` : '<p style="color:var(--text-secondary)">Bu sayfada kayıtlı kavram yok</p>'}
      </div>
    </div>
  `;
}

// ==================== PROFIL ====================
function profil(app) {
  const s = Store.get();
  const xpForLevel = s.xp % 100;
  const totalConcepts = DATA.concepts.length;
  const visitedCount = s.visited.filter(v => DATA.concepts.some(c => c.id === v)).length;

  app.innerHTML = `
    <h1 class="section-title"><span class="st-icon">👤</span> Profilim</h1>
    <div class="detail-header" style="text-align:center">
      <div style="font-size:3rem">👤</div>
      <div class="xp-bar mt-1">
        <span class="xp-level">Seviye ${s.level}</span>
        <div class="xp-progress"><div class="progress-bar"><div class="progress-fill" style="width:${xpForLevel}%"></div></div></div>
        <span class="xp-text">${s.xp} XP</span>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat-card"><div class="stat-num">${visitedCount}</div><div class="stat-label">Kavram Ziyareti</div></div>
      <div class="stat-card"><div class="stat-num">${s.quizHistory.length}</div><div class="stat-label">Quiz</div></div>
      <div class="stat-card"><div class="stat-num">${Object.keys(s.gameScores).length}</div><div class="stat-label">Oyun</div></div>
      <div class="stat-card"><div class="stat-num">${s.streak.count}</div><div class="stat-label">Gün Serisi</div></div>
    </div>
    <div class="detail-section">
      <h3>🏅 Rozetler</h3>
      <div class="badge-grid">
        ${Store.BADGES.map(b => `
          <div class="badge ${s.badges.includes(b.id)?'earned':''}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-desc">${b.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ${s.quizHistory.length > 0 ? `
    <div class="detail-section">
      <h3>📊 Quiz Geçmişi</h3>
      ${s.quizHistory.slice(-5).reverse().map(q => `
        <div style="display:flex;justify-content:space-between;padding:.4rem 0;border-bottom:1px solid var(--border);font-size:.85rem">
          <span>${shortFamily(q.family)||'Genel'}</span>
          <span>${q.score}/${q.total} (${Math.round(q.score/q.total*100)}%)</span>
        </div>
      `).join('')}
    </div>` : ''}
    <div class="detail-section">
      <h3>📈 Kavram İlerlemesi</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${(visitedCount/totalConcepts*100).toFixed(1)}%"></div></div>
      <p style="font-size:.85rem;color:var(--text-secondary);margin-top:.25rem">${visitedCount}/${totalConcepts} kavram keşfedildi</p>
    </div>
  `;
}

// ==================== NOT FOUND ====================
function notFound(app) {
  app.innerHTML = '<div class="empty-state"><span class="es-icon">🔍</span><p class="es-text">Sayfa bulunamadı. <a href="#/">Ana sayfaya dön</a></p></div>';
}

window.Pages = { home, kavramlar, kavramDetay, beceriler, degerler, ogrenciProfili, okuryazarlik, harita, arama, oyunlar, quiz, karsilastir, kaynak, profil, notFound };
})();
