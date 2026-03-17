/* ============================================================
   Kelime Kartları — Paylaşımlı Uygulama Mantığı

   Her projede yüklemeden önce isteğe bağlı config:
     window.KELIME_SEARCH_ANLAM = true;   // anlam alanında da ara
   ============================================================ */

(function () {
  'use strict';

  const SEARCH_ANLAM = window.KELIME_SEARCH_ANLAM === true;

  // -- State --
  let allItems = [];
  let currentList = [];
  let lbIndex = -1;
  let feedItems = [];
  let currentAudio = null;
  let currentKategori = null;
  let feedObserver = null;

  // -- Init --
  document.addEventListener('DOMContentLoaded', () => {
    KATEGORILER.forEach(kat => {
      kat.items.forEach(item => {
        allItems.push({ ...item, kategori: kat.baslik, emoji: kat.emoji });
      });
    });

    document.getElementById('total').textContent = allItems.length;
    document.getElementById('kat-count').textContent = KATEGORILER.length;

    document.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => setTab(btn.dataset.tab));
    });

    document.getElementById('search').addEventListener('input', e => {
      renderArama(e.target.value.trim());
    });

    document.getElementById('lightbox').addEventListener('click', e => {
      if (e.target === e.currentTarget) closeLB();
    });

    document.addEventListener('keydown', e => {
      if (document.getElementById('lightbox').classList.contains('open')) {
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowLeft') navLB(-1);
        if (e.key === 'ArrowRight') navLB(1);
      }
      if (document.getElementById('kesfet-feed').classList.contains('open')) {
        if (e.key === 'Escape') closeFeed();
      }
    });

    renderKategoriler();
  });

  // -- Tabs --
  function setTab(tab) {
    document.querySelectorAll('.tab').forEach(t =>
      t.classList.toggle('active', t.dataset.tab === tab)
    );
    document.getElementById('panel-kategoriler').style.display = tab === 'kategoriler' ? '' : 'none';
    document.getElementById('panel-kesfet').style.display    = tab === 'kesfet'      ? '' : 'none';
    document.getElementById('panel-arama').style.display     = tab === 'arama'       ? '' : 'none';

    if (tab === 'kategoriler') renderKategoriler();
    if (tab === 'arama')       renderArama('');
  }

  // -- Kategoriler --
  function renderKategoriler() {
    const view = document.getElementById('kat-view');

    if (currentKategori !== null) {
      const kat = KATEGORILER[currentKategori];
      currentList = kat.items.map(item => ({ ...item, kategori: kat.baslik, emoji: kat.emoji }));
      view.innerHTML = '';

      const backBtn = document.createElement('button');
      backBtn.className = 'kat-back';
      backBtn.innerHTML = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg> Tüm Kategoriler';
      backBtn.onclick = () => { currentKategori = null; renderKategoriler(); };
      view.appendChild(backBtn);

      const header = document.createElement('div');
      header.className = 'kat-header';
      header.innerHTML = `
        <span class="kat-header-emoji">${kat.emoji}</span>
        <span class="kat-header-title">${kat.baslik}</span>
        <span class="kat-header-count">${kat.items.length} kelime</span>`;
      view.appendChild(header);

      const grid = document.createElement('div');
      grid.id = 'kat-items-grid';
      grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; padding-bottom:24px;';
      view.appendChild(grid);

      renderGrid('kat-items-grid', currentList);
      return;
    }

    currentList = allItems;
    view.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'kat-grid';

    KATEGORILER.forEach((kat, idx) => {
      const card = document.createElement('div');
      card.className = 'kat-card';
      card.style.animationDelay = `${idx * 40}ms`;
      card.onclick = () => {
        openFeed(kat.items.map(item => ({ ...item, kategori: kat.baslik, emoji: kat.emoji })));
      };
      card.innerHTML = `
        <div class="kat-emoji">${kat.emoji}</div>
        <div class="kat-title">${kat.baslik}</div>
        <div class="kat-count">${kat.items.length} kelime</div>`;
      grid.appendChild(card);
    });

    view.appendChild(grid);
  }

  // -- Arama --
  function renderArama(q) {
    const lower = q.toLowerCase();
    const filtered = q
      ? allItems.filter(s =>
          s.kelime.toLowerCase().includes(lower) ||
          (SEARCH_ANLAM && s.anlam && s.anlam.toLowerCase().includes(lower)))
      : [...allItems];

    currentList = filtered;
    document.getElementById('search-count').textContent = q ? filtered.length : '';
    document.getElementById('results-text').textContent =
      q ? `${filtered.length} / ${allItems.length} sonuç` : `${allItems.length} kelime`;

    renderGrid('grid', filtered);
  }

  function karistir() {
    const arr = [...allItems];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    currentList = arr;
    renderGrid('grid', arr);
    document.getElementById('search').value = '';
    document.getElementById('search-count').textContent = '';
    document.getElementById('results-text').textContent = `${allItems.length} kelime (karışık)`;
  }
  window.karistir = karistir;

  // -- Keşfet Feed --
  function openFeed(customItems) {
    if (customItems) {
      feedItems = [...customItems];
    } else {
      feedItems = [...allItems];
      shuffle(feedItems);
    }

    const container = document.getElementById('feed-slides');
    container.innerHTML = '';

    const batchSize = 20;
    for (let i = 0; i < Math.min(batchSize, feedItems.length); i++) {
      container.appendChild(createSlide(feedItems[i], i));
    }

    const feed = document.getElementById('kesfet-feed');
    feed.classList.add('open');
    feed.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    updateFeedCounter(0);

    setTimeout(() => playFeedAudio(0), 300);
    setupFeedObserver();

    let loaded = batchSize;
    feed.onscroll = () => {
      const idx = Math.round(feed.scrollTop / feed.clientHeight);
      updateFeedCounter(idx);

      const hint = document.getElementById('feed-hint');
      if (idx > 0 && hint) hint.style.display = 'none';

      if (idx >= loaded - 5 && loaded < feedItems.length) {
        const end = Math.min(loaded + batchSize, feedItems.length);
        for (let i = loaded; i < end; i++) {
          const slide = createSlide(feedItems[i], i);
          container.appendChild(slide);
          if (feedObserver) feedObserver.observe(slide);
        }
        loaded = end;
      }
    };
  }
  window.openFeed = openFeed;

  function setupFeedObserver() {
    if (feedObserver) feedObserver.disconnect();
    feedObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          playFeedAudio(parseInt(entry.target.dataset.index));
        }
      });
    }, { root: document.getElementById('kesfet-feed'), threshold: 0.6 });

    document.querySelectorAll('.feed-slide').forEach(s => feedObserver.observe(s));
  }

  function playFeedAudio(idx) {
    if (idx < 0 || idx >= feedItems.length) return;
    const item = feedItems[idx];
    if (!item.ses) return;

    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    const btn = document.getElementById('feed-sound-btn');
    btn.classList.add('playing');
    currentAudio = new Audio('sounds/' + item.ses);
    currentAudio.play().catch(() => {});
    currentAudio.onended = () => { btn.classList.remove('playing'); currentAudio = null; };
  }

  function replayFeedAudio() {
    const feed = document.getElementById('kesfet-feed');
    playFeedAudio(Math.round(feed.scrollTop / feed.clientHeight));
  }
  window.replayFeedAudio = replayFeedAudio;

  function createSlide(item, index) {
    const div = document.createElement('div');
    div.className = 'feed-slide';
    div.dataset.index = index;
    div.innerHTML = `
      <img src="images/${item.gorsel}" alt="${item.kelime}" loading="${index < 3 ? 'eager' : 'lazy'}" />
      <div class="feed-overlay"></div>
      <div class="feed-info">
        <div class="feed-word">${item.kelime}</div>
        ${item.anlam ? '<div class="feed-meaning">' + item.anlam + '</div>' : ''}
        <span class="feed-tag">${item.kategori || ''}</span>
      </div>`;
    return div;
  }

  function updateFeedCounter(idx) {
    document.getElementById('feed-counter').textContent = `${idx + 1} / ${feedItems.length}`;
  }

  function closeFeed() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    if (feedObserver) { feedObserver.disconnect(); feedObserver = null; }
    const feed = document.getElementById('kesfet-feed');
    feed.classList.remove('open');
    feed.onscroll = null;
    document.body.style.overflow = '';
    document.getElementById('feed-hint').style.display = '';
    document.getElementById('feed-sound-btn').classList.remove('playing');
  }
  window.closeFeed = closeFeed;

  // -- Grid Render --
  function renderGrid(containerId, items) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = '<div class="empty"><div class="empty-icon">&#128270;</div><div class="empty-text">Sonuç bulunamadı</div></div>';
      return;
    }

    items.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'card';
      el.style.animationDelay = `${Math.min(i, 20) * 30}ms`;
      el.onclick = () => openLB(i);
      const soundBtn = item.ses
        ? `<button class="card-sound" onclick="event.stopPropagation(); playCardSound(this, '${item.ses}')"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z"/></svg></button>`
        : '';
      el.innerHTML = `
        <div class="card-img-wrap">
          <img class="card-img" src="images/${item.gorsel}" alt="${item.kelime}" loading="lazy"
               onerror="this.style.background='var(--surface2)'" />
          ${soundBtn}
        </div>
        <div class="card-body">
          <div class="card-word">${item.kelime}</div>
          ${item.anlam ? '<div class="card-meaning">' + item.anlam + '</div>' : ''}
        </div>`;
      grid.appendChild(el);
    });
  }

  // -- Lightbox --
  function openLB(index) {
    lbIndex = index;
    const item = currentList[index];
    if (!item) return;

    document.getElementById('lb-img').src = `images/${item.gorsel}`;
    document.getElementById('lb-img').alt = item.kelime;
    document.getElementById('lb-word').textContent = item.kelime;
    const meaningEl = document.getElementById('lb-meaning');
    if (meaningEl) meaningEl.textContent = item.anlam || '';
    document.getElementById('lb-tag').textContent = item.kategori || '';
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  }
  window.closeLB = closeLB;

  function navLB(dir) {
    let next = lbIndex + dir;
    if (next < 0) next = currentList.length - 1;
    if (next >= currentList.length) next = 0;
    openLB(next);
  }
  window.navLB = navLB;

  function playCardSound(btn, ses) {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    document.querySelectorAll('.card-sound.playing').forEach(b => b.classList.remove('playing'));
    btn.classList.add('playing');
    currentAudio = new Audio('sounds/' + ses);
    currentAudio.play().catch(() => {});
    currentAudio.onended = () => { btn.classList.remove('playing'); currentAudio = null; };
  }
  window.playCardSound = playCardSound;

  function playLBSound() {
    const item = currentList[lbIndex];
    if (!item || !item.ses) return;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    currentAudio = new Audio('sounds/' + item.ses);
    currentAudio.play().catch(() => {});
    currentAudio.onended = () => { currentAudio = null; };
  }
  window.playLBSound = playLBSound;

  // -- Yardımcı --
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
})();
