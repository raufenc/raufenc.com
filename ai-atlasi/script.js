/* ================================================================
   Rauf Enç — Yapay Zekâ Araç Atlası
   script.js — Rendering, filtreleme, animasyonlar
   ================================================================ */

(function () {
  'use strict';

  const D = window.RAUF_AI_ATLAS;
  if (!D) return;

  /* ── Kategori ikonları ── */
  const CAT_ICONS = {
    'Genel AI & Araştırma': { icon: '🧠', color: 'var(--cat-color-1)' },
    'Görsel Tasarım':       { icon: '🎨', color: 'var(--cat-color-2)' },
    'Video & Avatar':       { icon: '🎬', color: 'var(--cat-color-3)' },
    'Ses & Müzik':          { icon: '🎵', color: 'var(--cat-color-4)' },
    'Sunum & İçerik':       { icon: '📊', color: 'var(--cat-color-5)' },
    'Kodlama & Uygulama':   { icon: '💻', color: 'var(--cat-color-6)' },
    'Otomasyon':            { icon: '⚡', color: 'var(--cat-color-7)' },
    'Yayınlama & Hosting':  { icon: '🚀', color: 'var(--cat-color-8)' },
  };

  /* ── State ── */
  const state = {
    category: 'Tümü',
    query: '',
    freeOnly: false,
    sort: 'value-desc',
  };

  /* ── Helpers ── */
  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function el(id) { return document.getElementById(id); }

  /* ── Hero stats ── */
  function renderHeroStats() {
    const tools = D.tools;
    const freeCnt = tools.filter(t => t.free_plan).length;
    const cats = new Set(tools.map(t => t.category)).size;
    const avgScore = Math.round(tools.reduce((s, t) => s + t.value_score, 0) / tools.length);
    const paidTools = tools.filter(t => t.starter_price > 0);
    const avgPrice = paidTools.reduce((s, t) => s + t.starter_price, 0) / paidTools.length;

    const stats = [
      { val: tools.length, label: 'araç' },
      { val: cats, label: 'kategori' },
      { val: freeCnt, label: 'ücretsiz planlı' },
      { val: '$' + avgPrice.toFixed(0) + '/ay', label: 'ort. başlangıç' },
      { val: avgScore + '/100', label: 'ort. değer puanı' },
    ];

    el('heroStats').innerHTML = stats.map(s => `
      <div class="hero-stat">
        <span class="hero-stat-val">${esc(String(s.val))}</span>
        <span class="hero-stat-label">${esc(s.label)}</span>
      </div>
    `).join('');
  }

  /* ── Kategori grid ── */
  function renderCatGrid() {
    const catCounts = {};
    D.tools.forEach(t => { catCounts[t.category] = (catCounts[t.category] || 0) + 1; });

    const cats = Object.keys(catCounts);
    el('catGrid').innerHTML = cats.map(cat => {
      const meta = CAT_ICONS[cat] || { icon: '🔧', color: 'var(--accent)' };
      const isActive = state.category === cat;
      return `
        <div class="cat-card${isActive ? ' active' : ''}"
             style="--cat-clr:${meta.color}"
             data-cat="${esc(cat)}">
          <span class="cat-icon">${meta.icon}</span>
          <div class="cat-name">${esc(cat)}</div>
          <div class="cat-count">${catCounts[cat]} araç</div>
        </div>
      `;
    }).join('');

    el('catGrid').querySelectorAll('.cat-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.cat;
        state.category = state.category === cat ? 'Tümü' : cat;
        renderCatGrid();
        renderCatChips();
        renderTools();
        document.getElementById('katalog').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ── Kategori chipsleri ── */
  function renderCatChips() {
    const cats = ['Tümü', ...new Set(D.tools.map(t => t.category))];
    el('catChips').innerHTML = cats.map(cat => `
      <button class="chip${state.category === cat ? ' active' : ''}" data-cat="${esc(cat)}">${esc(cat)}</button>
    `).join('');

    el('catChips').querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.dataset.cat;
        renderCatChips();
        renderCatGrid();
        renderTools();
      });
    });
  }

  /* ── Filtreleme & sıralama ── */
  function filterTools() {
    const q = state.query.trim().toLowerCase();
    return D.tools.filter(t => {
      const inCat = state.category === 'Tümü' || t.category === state.category;
      const inFree = !state.freeOnly || !!t.free_plan;
      if (!inCat || !inFree) return false;
      if (!q) return true;
      const hay = [
        t.name, t.vendor, t.category,
        ...(t.tags || []), t.summary, t.best_use,
        ...(t.advantages || []), ...(t.disadvantages || [])
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  function sortTools(list) {
    const arr = [...list];
    switch (state.sort) {
      case 'fp-desc':    arr.sort((a, b) => (b.fp_index - a.fp_index) || (b.value_score - a.value_score)); break;
      case 'price-asc':  arr.sort((a, b) => (a.starter_price || 9999) - (b.starter_price || 9999)); break;
      case 'price-desc': arr.sort((a, b) => b.starter_price - a.starter_price); break;
      case 'name-asc':   arr.sort((a, b) => a.name.localeCompare(b.name, 'tr')); break;
      default:           arr.sort((a, b) => (b.value_score - a.value_score) || (b.fp_index - a.fp_index));
    }
    return arr;
  }

  /* ── Puan ring SVG ── */
  function scoreRing(score) {
    const r = 18;
    const circ = 2 * Math.PI * r;
    const dash = circ * (score / 100);
    return `
      <div class="tool-score-ring">
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle class="score-ring-bg" cx="24" cy="24" r="${r}"/>
          <circle class="score-ring-fill"
            cx="24" cy="24" r="${r}"
            stroke-dasharray="${dash.toFixed(1)} ${circ.toFixed(1)}"
            stroke-dashoffset="0"/>
        </svg>
        <div class="score-ring-text">${score}</div>
      </div>
    `;
  }

  /* ── Puan çubukları ── */
  function scoreBars(tool) {
    const metrics = [
      { label: 'Kalite', val: tool.quality },
      { label: 'Kolaylık', val: tool.ease },
      { label: 'Erişim', val: tool.access },
      { label: 'Atölye', val: tool.workshop_fit },
    ];
    return `
      <div class="score-bars">
        ${metrics.map(m => `
          <div class="score-bar-row">
            <span class="score-bar-label">${esc(m.label)}</span>
            <div class="score-bar-track">
              <div class="score-bar-fill" style="width:${m.val * 10}%"></div>
            </div>
            <span class="score-bar-val">${m.val}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ── Araç kartı ── */
  function toolCard(tool, idx) {
    const delay = Math.min(idx * 40, 400);
    return `
      <article class="tool-card" style="animation-delay:${delay}ms">
        <div class="tool-card-top">
          <div class="tool-identity">
            <div class="tool-vendor">${esc(tool.vendor)}</div>
            <div class="tool-name">${esc(tool.name)}</div>
          </div>
          ${scoreRing(tool.value_score)}
        </div>

        <div class="tool-badges">
          <span class="badge badge-cat">${esc(tool.category)}</span>
          ${tool.free_plan ? '<span class="badge badge-free">Ücretsiz plan ✓</span>' : ''}
          <span class="badge badge-level">${esc(tool.level)}</span>
          <span class="badge badge-price">${esc(tool.starter_price_display)}</span>
        </div>

        <div class="tool-card-body">
          <div class="tool-summary">${esc(tool.summary)}</div>

          <div class="tool-best-use">
            <strong>En iyi kullanım</strong>
            ${esc(tool.best_use)}
          </div>

          ${scoreBars(tool)}

          <details class="tool-details">
            <summary>Artılar & Eksiler</summary>
            <div class="pros-cons">
              <div class="pros">
                <div class="pros-cons-label">Artıları</div>
                <ul>${tool.advantages.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
              </div>
              <div class="cons">
                <div class="pros-cons-label">Eksileri</div>
                <ul>${tool.disadvantages.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
              </div>
            </div>
          </details>

          <div class="tool-best-use">
            <strong>Fiyat notu</strong>
            ${esc(tool.price_note)}
          </div>
        </div>

        <div class="tool-card-footer">
          <a href="${esc(tool.signup_url)}" target="_blank" rel="noopener noreferrer"
             class="link-btn link-btn-primary">Kayıt Ol</a>
          <a href="${esc(tool.pricing_url)}" target="_blank" rel="noopener noreferrer"
             class="link-btn link-btn-ghost">Fiyat</a>
          <a href="${esc(tool.docs_url)}" target="_blank" rel="noopener noreferrer"
             class="link-btn link-btn-ghost">Doküman</a>
          <a href="${esc(tool.official_url)}" target="_blank" rel="noopener noreferrer"
             class="link-btn link-btn-ghost">Site</a>
        </div>
      </article>
    `;
  }

  /* ── Araçları render et ── */
  function renderTools() {
    const filtered = sortTools(filterTools());
    const grid = el('toolGrid');
    const info = el('resultsInfo');

    info.textContent = `${filtered.length} araç gösteriliyor`;

    if (!filtered.length) {
      grid.innerHTML = '<div class="empty-state">Bu filtreye uyan araç bulunamadı. Aramayı temizle veya kategoriyi sıfırla.</div>';
      return;
    }

    grid.innerHTML = filtered.map((t, i) => toolCard(t, i)).join('');
  }

  /* ── Başlangıç setleri ── */
  function renderStacks() {
    if (!D.featuredStacks) return;
    el('stacksGrid').innerHTML = D.featuredStacks.map(s => `
      <article class="stack-card">
        <div class="stack-goal">${esc(s.title)}</div>
        <div class="stack-title">${esc(s.stack.join(' + '))}</div>
        <div class="stack-desc">${esc(s.description)}</div>
        <div class="stack-tools">
          ${s.stack.map(name => `<span class="stack-tool-chip">${esc(name)}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }

  /* ── Atölye zaman çizelgesi ── */
  function renderTimeline() {
    if (!D.workshopTracks) return;
    el('timeline').innerHTML = D.workshopTracks.map((item, i) => `
      <div class="timeline-item reveal">
        <div class="timeline-dot">${i + 1}</div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-module">${esc(item.module)}</div>
            <div class="timeline-duration">${esc(item.duration)}</div>
          </div>
          <div class="timeline-goal">${esc(item.goal)}</div>
          <div class="timeline-meta-grid">
            <div class="timeline-meta">
              <div class="timeline-meta-label">Araçlar</div>
              <div class="timeline-meta-val">${esc(item.tools)}</div>
            </div>
            <div class="timeline-meta">
              <div class="timeline-meta-label">Beklenen Çıktı</div>
              <div class="timeline-meta-val">${esc(item.output)}</div>
            </div>
            <div class="timeline-meta">
              <div class="timeline-meta-label">Eğitmen Notu</div>
              <div class="timeline-meta-val">${esc(item.trainer_note)}</div>
            </div>
            <div class="timeline-meta">
              <div class="timeline-meta-label">Dikkat Edilecek</div>
              <div class="timeline-meta-val">${esc(item.risk)}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ── Kaynaklar ── */
  function renderResources() {
    if (!D.learningResources) return;
    el('resourceGrid').innerHTML = D.learningResources.map(r => `
      <article class="resource-card reveal">
        <span class="resource-type">${esc(r.type)}</span>
        <div class="resource-name">${esc(r.name)}</div>
        <div class="resource-why">${esc(r.why)}</div>
        <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" class="resource-link">
          Kaynağı aç →
        </a>
      </article>
    `).join('');
  }

  /* ── Deploy ── */
  function renderDeploy() {
    if (!D.deploymentResources) return;
    el('deployGrid').innerHTML = D.deploymentResources.map(d => `
      <article class="deploy-card reveal">
        <div class="deploy-name">${esc(d.name)}</div>
        <div class="deploy-why">${esc(d.why)}</div>
        <div class="deploy-pricing">${esc(d.pricing)}</div>
        <div class="deploy-actions">
          <a href="${esc(d.url)}" target="_blank" rel="noopener noreferrer"
             class="btn btn-ghost btn-sm">Bilgi Al</a>
          <a href="${esc(d.signup_url)}" target="_blank" rel="noopener noreferrer"
             class="btn btn-accent btn-sm">Kayıt Ol</a>
        </div>
      </article>
    `).join('');

    const note = document.querySelector('.deploy-note');
    if (note) {
      note.innerHTML = '<strong>Bu paket build gerektirmez.</strong> Klasörü direkt yükle veya GitHub\'a push et → Vercel otomatik deploy eder.';
    }
  }

  /* ── Event listeners ── */
  function bindEvents() {
    el('searchInput').addEventListener('input', e => {
      state.query = e.target.value;
      renderTools();
    });

    el('sortSelect').addEventListener('change', e => {
      state.sort = e.target.value;
      renderTools();
    });

    el('freeToggle').addEventListener('change', e => {
      state.freeOnly = e.target.checked;
      renderTools();
    });
  }

  /* ── Scroll reveal (IntersectionObserver) ── */
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  /* ── Araç kartlarına da reveal ── */
  function observeCards() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.tool-card').forEach(c => obs.observe(c));
  }

  /* ── Aktif nav linki ── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    if (!navLinks.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => obs.observe(s));
  }

  /* ── BAŞLAT ── */
  function init() {
    renderHeroStats();
    renderCatGrid();
    renderCatChips();
    renderTools();
    renderStacks();
    renderTimeline();
    renderResources();
    renderDeploy();
    bindEvents();

    // Kısa gecikme sonra reveal (DOM yerleştikten sonra)
    setTimeout(() => {
      initReveal();
      initActiveNav();
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
