/* ============================================================
   Baglanti Page — Network Graph + Timeline
   ============================================================ */

initPage('baglanti');

// Mark connection viewed for achievement
Store._set('iby-conn-viewed', true);
checkAchievements();

let currentMode = 'ag';
let agInit = false, zcInit = false;

function setMode(mode) {
  currentMode = mode;
  document.getElementById('sec-ag').style.display = mode === 'ag' ? '' : 'none';
  document.getElementById('sec-zaman').style.display = mode === 'zaman' ? '' : 'none';
  document.getElementById('btn-ag').classList.toggle('active', mode === 'ag');
  document.getElementById('btn-zaman').classList.toggle('active', mode === 'zaman');
  if (mode === 'ag' && !agInit) initAg();
  if (mode === 'zaman' && !zcInit) initZaman();
}

// ========== NETWORK GRAPH ==========
function initAg() {
  agInit = true;
  const canvas = document.getElementById('ag-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  // Build node/edge data from scholars that appear in ILISKILER
  const nodeIds = new Set();
  ILISKILER.forEach(r => { nodeIds.add(r.k); nodeIds.add(r.h); });

  const nodes = [...nodeIds].map(id => {
    const b = BM[id];
    if (!b) return null;
    return {
      id,
      x: canvas.width / 2 + (Math.random() - 0.5) * 400,
      y: canvas.height / 2 + (Math.random() - 0.5) * 300,
      vx: 0, vy: 0,
      isim: b.isim,
      alan: b.alanBirincil,
      alanlar: b.alanlar || [],
      renk: alanRenk(b.alanBirincil)
    };
  }).filter(Boolean);

  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.id] = n);

  const edges = ILISKILER.map(r => ({
    source: nodeMap[r.h],
    target: nodeMap[r.k]
  })).filter(e => e.source && e.target);

  // Populate alan filter
  const alanSet = new Set();
  nodes.forEach(n => { if (n.alanlar) n.alanlar.forEach(a => alanSet.add(a)); });
  const select = document.getElementById('ag-alan-filter');
  [...alanSet].sort().forEach(a => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    select.appendChild(opt);
  });

  // Legend
  const legendAlans = [...new Set(nodes.map(n => n.alan))].sort();
  document.getElementById('ag-legend').innerHTML = legendAlans.map(a =>
    '<div class="ag-legend-item"><div class="ag-legend-dot" style="background:' + alanRenk(a) + '"></div>' + a + '</div>'
  ).join('');

  // Force simulation state
  let hoverNode = null;
  let dragNode = null;
  const tooltip = document.getElementById('ag-tooltip');

  function simulate() {
    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        let dx = nodes[j].x - nodes[i].x;
        let dy = nodes[j].y - nodes[i].y;
        let d = Math.sqrt(dx * dx + dy * dy) || 1;
        let f = 800 / (d * d);
        nodes[i].vx -= dx / d * f;
        nodes[i].vy -= dy / d * f;
        nodes[j].vx += dx / d * f;
        nodes[j].vy += dy / d * f;
      }
    }
    // Attraction along edges
    edges.forEach(e => {
      let dx = e.target.x - e.source.x;
      let dy = e.target.y - e.source.y;
      let d = Math.sqrt(dx * dx + dy * dy) || 1;
      let f = (d - 120) * 0.01;
      e.source.vx += dx / d * f;
      e.source.vy += dy / d * f;
      e.target.vx -= dx / d * f;
      e.target.vy -= dy / d * f;
    });
    // Centering + damping
    nodes.forEach(n => {
      if (n === dragNode) return;
      n.vx += (canvas.width / 2 - n.x) * 0.001;
      n.vy += (canvas.height / 2 - n.y) * 0.001;
      n.vx *= 0.9;
      n.vy *= 0.9;
      n.x += n.vx;
      n.y += n.vy;
      n.x = Math.max(30, Math.min(canvas.width - 30, n.x));
      n.y = Math.max(30, Math.min(canvas.height - 30, n.y));
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const filterVal = select.value;

    // Draw edges
    edges.forEach(e => {
      const dim = filterVal && e.source.alan !== filterVal && e.target.alan !== filterVal;
      ctx.beginPath();
      ctx.moveTo(e.source.x, e.source.y);
      ctx.lineTo(e.target.x, e.target.y);
      ctx.strokeStyle = dim ? 'rgba(255,255,255,0.03)' : 'rgba(200,164,110,0.15)';
      ctx.lineWidth = dim ? 0.5 : 1;
      ctx.stroke();

      // Arrow at midpoint
      if (!dim) {
        const angle = Math.atan2(e.target.y - e.source.y, e.target.x - e.source.x);
        const mx = (e.source.x + e.target.x) / 2;
        const my = (e.source.y + e.target.y) / 2;
        ctx.beginPath();
        ctx.moveTo(mx + 6 * Math.cos(angle), my + 6 * Math.sin(angle));
        ctx.lineTo(mx - 6 * Math.cos(angle - 0.5), my - 6 * Math.sin(angle - 0.5));
        ctx.lineTo(mx - 6 * Math.cos(angle + 0.5), my - 6 * Math.sin(angle + 0.5));
        ctx.fillStyle = 'rgba(200,164,110,0.25)';
        ctx.fill();
      }
    });

    // Highlight connected edges when hovering
    if (hoverNode) {
      edges.forEach(e => {
        if (e.source !== hoverNode && e.target !== hoverNode) return;
        ctx.beginPath();
        ctx.moveTo(e.source.x, e.source.y);
        ctx.lineTo(e.target.x, e.target.y);
        ctx.strokeStyle = 'rgba(200,164,110,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Draw nodes
    nodes.forEach(n => {
      const dim = filterVal && n.alan !== filterVal;
      const isHover = n === hoverNode;
      const r = isHover ? 10 : 7;

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = dim ? 'rgba(100,100,100,0.2)' : n.renk;
      ctx.fill();

      if (isHover) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label
      if (!dim) {
        ctx.font = '9px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(n.isim.split(' ').pop(), n.x, n.y + r + 12);
      }
    });

    simulate();
    requestAnimationFrame(draw);
  }

  // Find node under cursor
  function nodeAt(mx, my) {
    for (const n of nodes) {
      const dx = n.x - mx, dy = n.y - my;
      if (dx * dx + dy * dy < 144) return n; // 12px radius
    }
    return null;
  }

  // Mouse interactions
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (dragNode) {
      dragNode.x = mx;
      dragNode.y = my;
      dragNode.vx = 0;
      dragNode.vy = 0;
      return;
    }

    hoverNode = nodeAt(mx, my);

    if (hoverNode) {
      canvas.style.cursor = 'pointer';
      const conns = edges.filter(e => e.source === hoverNode || e.target === hoverNode);
      tooltip.style.display = 'block';
      tooltip.style.left = e.clientX + 12 + 'px';
      tooltip.style.top = e.clientY - 10 + 'px';
      tooltip.innerHTML =
        '<div style="font-weight:800;margin-bottom:4px">' + hoverNode.isim + '</div>' +
        '<div style="color:var(--muted2);font-size:11px">' + hoverNode.alanlar.slice(0, 3).join(', ') + '</div>' +
        '<div style="color:var(--gold);font-size:10px;margin-top:4px">' + conns.length + ' baglanti</div>';
    } else {
      canvas.style.cursor = 'crosshair';
      tooltip.style.display = 'none';
    }
  });

  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const n = nodeAt(mx, my);
    if (n) {
      dragNode = n;
      canvas.style.cursor = 'grabbing';
    }
  });

  canvas.addEventListener('mouseup', () => {
    if (dragNode) {
      dragNode = null;
      canvas.style.cursor = hoverNode ? 'pointer' : 'crosshair';
    }
  });

  canvas.addEventListener('click', () => {
    if (hoverNode && !dragNode) {
      window.location.href = 'alim.html?id=' + hoverNode.id;
    }
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
    hoverNode = null;
    dragNode = null;
  });

  draw();
}

// ========== TIMELINE ==========
function initZaman() {
  zcInit = true;
  const track = document.getElementById('zc-track');
  const filterSelect = document.getElementById('zc-alan-filter');

  // Populate filter
  const alanSet = new Set();
  BILGINLER.forEach(b => { if (b.alanlar) b.alanlar.forEach(a => alanSet.add(a)); });
  [...alanSet].sort().forEach(a => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    filterSelect.appendChild(opt);
  });

  function renderTimeline() {
    const filterVal = filterSelect.value;
    const filtered = filterVal
      ? BILGINLER.filter(b => b.alanlar && b.alanlar.includes(filterVal))
      : BILGINLER;

    const withYear = filtered.filter(b => b.dogum || b.vefat);
    const minYear = 600, maxYear = 1900;
    const trackWidth = 2600;

    let html = '<div class="zc-line"></div>';

    // Century markers
    for (let c = 7; c <= 19; c++) {
      const year = c * 100;
      const x = 20 + ((year - minYear) / (maxYear - minYear)) * (trackWidth - 40);
      html += '<div class="zc-century" style="left:' + x + 'px">' + c + '. yy</div>';
    }

    // Scholar dots — use deterministic Y spread to avoid overlaps
    const columns = {};
    withYear.forEach(b => {
      const year = b.dogum || (b.vefat ? b.vefat - 40 : null);
      if (!year || year < minYear || year > maxYear) return;

      const x = 20 + ((year - minYear) / (maxYear - minYear)) * (trackWidth - 40);
      const renk = alanRenk(b.alanBirincil);

      // Bucket into ~30px columns to avoid overlap
      const col = Math.round(x / 30);
      if (!columns[col]) columns[col] = 0;
      const idx = columns[col]++;

      // Alternate above/below the line, stacking outward
      const above = idx % 2 === 0;
      const tier = Math.floor(idx / 2);
      let y;
      if (above) {
        y = 155 - 30 - tier * 28;
        if (y < 10) y = 10;
      } else {
        y = 205 + tier * 28;
        if (y > 370) y = 370;
      }

      html += '<a href="alim.html?id=' + b.id + '" class="zc-dot" style="left:' + (x - 6) + 'px;top:' + y + 'px;background:' + renk + ';border-color:' + renk + ';--dot-color:' + renk + ';text-decoration:none" title="' + b.isim + ' (' + (b.dogum || '?') + '\u2013' + (b.vefat || '?') + ')"></a>';
      html += '<div class="zc-label" style="left:' + (x - 35) + 'px;top:' + (y + (above ? -18 : 18)) + 'px">' + b.isim.split(' ').pop() + '</div>';
    });

    track.innerHTML = html;
  }

  filterSelect.addEventListener('change', renderTimeline);
  renderTimeline();
}

// Initialize network graph by default
initAg();
