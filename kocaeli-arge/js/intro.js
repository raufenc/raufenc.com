// Açılış: İzmit Saat Kulesi hologramı (Three.js, WebGL yoksa SVG çizimi)
const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const DURATION = 4200;

function loadThree() {
  if (window.THREE) return Promise.resolve(window.THREE);
  return new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = THREE_URL;
    const t = setTimeout(() => rej(new Error('three_timeout')), 3500); // CDN gecikirse SVG çizime düş
    s.onload = () => { clearTimeout(t); res(window.THREE); }; s.onerror = () => { clearTimeout(t); rej(new Error('three_failed')); };
    document.head.appendChild(s);
  });
}
function webglOk() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (_) { return false; } }

// Kule: kaide + üç kademeli gövde + şerefe + saat katı + piramit çatı + alem
function buildTower(THREE) {
  const g = new THREE.Group();
  const cyan = 0x3ae8ff, blue = 0x7fb3ff;
  const solid = new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false });
  const line = new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.85 });
  const lineSoft = new THREE.LineBasicMaterial({ color: blue, transparent: true, opacity: 0.35 });
  const add = (geo, y, mat = line) => { const m = new THREE.Mesh(geo, solid); m.position.y = y; g.add(m); const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 12), mat); e.position.y = y; g.add(e); return m; };
  add(new THREE.BoxGeometry(3.2, 0.25, 3.2), 0.12, lineSoft);          // plato
  add(new THREE.BoxGeometry(2.4, 0.5, 2.4), 0.5);                       // kaide
  add(new THREE.CylinderGeometry(0.55, 0.6, 0.35, 16), 0.9, lineSoft);  // çeşme haznesi (kaidede)
  add(new THREE.BoxGeometry(1.7, 2.6, 1.7), 2.05);                      // 1. kat
  add(new THREE.BoxGeometry(1.95, 0.18, 1.95), 3.45, lineSoft);         // silme
  add(new THREE.BoxGeometry(1.45, 2.3, 1.45), 4.7);                     // 2. kat
  add(new THREE.BoxGeometry(1.75, 0.18, 1.75), 5.95, lineSoft);         // silme
  add(new THREE.BoxGeometry(1.25, 1.9, 1.25), 7.0);                     // 3. kat
  add(new THREE.BoxGeometry(1.9, 0.16, 1.9), 8.05, lineSoft);           // şerefe
  add(new THREE.BoxGeometry(1.15, 1.6, 1.15), 8.95);                    // saat katı
  // saat kadranları (4 cephe)
  const face = new THREE.CircleGeometry(0.36, 32);
  [[0, 0, 0.58, 0], [0, 0, -0.58, Math.PI], [0.58, 0, 0, Math.PI / 2], [-0.58, 0, 0, -Math.PI / 2]].forEach(([x, , z, ry]) => {
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, 0.36, 0, Math.PI * 2, true).getPoints(40)), line);
    ring.position.set(x, 9.1, z); ring.rotation.y = ry; g.add(ring);
    const hands = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.26, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.18, 0.08, 0)]), line);
    hands.position.set(x, 9.1, z); hands.rotation.y = ry; g.add(hands);
    const f = new THREE.Mesh(face, new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    f.position.set(x, 9.1, z); f.rotation.y = ry; g.add(f);
  });
  // kemerli pencereler (her katta 4 cephe)
  [[2.05, 0.87, 0.5], [4.7, 0.75, 0.45], [7.0, 0.65, 0.4]].forEach(([y, half, w]) => {
    [[0, half, 0], [0, -half, Math.PI], [half, 0, Math.PI / 2], [-half, 0, -Math.PI / 2]].forEach(([x, z, ry]) => {
      const p = new THREE.Path(); p.moveTo(-w / 2, -0.55); p.lineTo(-w / 2, 0.2); p.absarc(0, 0.2, w / 2, Math.PI, 0, true); p.lineTo(w / 2, -0.55); p.lineTo(-w / 2, -0.55);
      const win = new THREE.Line(new THREE.BufferGeometry().setFromPoints(p.getPoints(16)), lineSoft);
      win.position.set(x, y, z); win.rotation.y = ry; g.add(win);
    });
  });
  const roof = new THREE.ConeGeometry(0.95, 1.5, 4); const r = add(roof, 10.5); r.rotation.y = Math.PI / 4; g.children[g.children.length - 1].rotation.y = Math.PI / 4;
  add(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6), 11.55); add(new THREE.SphereGeometry(0.12, 10, 8), 12.0);
  const hilal = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, 0.16, 0, Math.PI * 2, true).getPoints(24)), line); hilal.position.y = 12.3; g.add(hilal);
  g.position.y = -6.2;
  return g;
}

function run3d(THREE, root) {
  const canvas = document.createElement('canvas'); root.prepend(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 1.2, 17);
  const tower = buildTower(THREE); scene.add(tower);
  // projektör tabanı ve parçacıklar
  const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, 2.6, 0, Math.PI * 2, true).getPoints(64)), new THREE.LineBasicMaterial({ color: 0x3ae8ff, transparent: true, opacity: 0.5 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = -6.2; scene.add(ring);
  const ring2 = ring.clone(); ring2.scale.setScalar(0.72); scene.add(ring2);
  const N = 320, pos = new Float32Array(N * 3), spd = new Float32Array(N);
  for (let i = 0; i < N; i++) { const a = Math.random() * Math.PI * 2, r = 0.4 + Math.random() * 2.4; pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = -6 + Math.random() * 13; pos[i * 3 + 2] = Math.sin(a) * r; spd[i] = 0.4 + Math.random() * 1.2; }
  const pts = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), new THREE.PointsMaterial({ color: 0x9be9ff, size: 0.06, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(pts);
  const resize = () => { const w = root.clientWidth, h = root.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); camera.position.z = w < 420 ? 19.5 : 17; };
  resize(); window.addEventListener('resize', resize);
  let raf, t0 = performance.now(), alive = true;
  const tick = (now) => {
    if (!alive) return;
    const t = (now - t0) / 1000;
    tower.rotation.y = t * 0.45; ring.rotation.z = t * 0.2; ring2.rotation.z = -t * 0.3;
    tower.position.y = -6.2 + Math.sin(t * 1.3) * 0.08;
    const build = Math.min(1, t / 1.6); tower.scale.set(1, build, 1); // yukarı doğru "projeksiyon"
    const flicker = 0.85 + Math.random() * 0.15 * (Math.random() > 0.93 ? 0.3 : 1);
    tower.traverse(o => { if (o.material && o.material.opacity !== undefined && o.material.userData.base === undefined) o.material.userData.base = o.material.opacity; if (o.material?.userData?.base !== undefined) o.material.opacity = o.material.userData.base * flicker; });
    const p = pts.geometry.attributes.position.array;
    for (let i = 0; i < N; i++) { p[i * 3 + 1] += spd[i] * 0.016; if (p[i * 3 + 1] > 7.5) p[i * 3 + 1] = -6; }
    pts.geometry.attributes.position.needsUpdate = true;
    camera.position.x = Math.sin(t * 0.3) * 1.2; camera.lookAt(0, 0.6, 0);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { alive = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); renderer.dispose(); };
}

function runSvg(root) {
  const svg = document.createElement('div'); svg.className = 'holo-svg';
  svg.innerHTML = `<svg viewBox="0 0 200 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="filter:drop-shadow(0 0 12px rgba(58,232,255,.6))"><g fill="rgba(58,232,255,.06)" stroke="#3ae8ff" stroke-width="1.4"><rect x="40" y="280" width="120" height="14"/><rect x="60" y="250" width="80" height="30"/><rect x="66" y="150" width="68" height="100"/><rect x="60" y="146" width="80" height="6"/><rect x="70" y="80" width="60" height="66"/><rect x="62" y="76" width="76" height="6"/><rect x="74" y="40" width="52" height="36"/><circle cx="100" cy="58" r="11"/><path d="M100 58v-8M100 58l6 3"/><path d="M74 40 100 10l26 30z"/><path d="M100 10V2"/><circle cx="100" cy="0" r="2"/><path d="M90 230v-30a10 10 0 0 1 20 0v30M92 130v-22a8 8 0 0 1 16 0v22" fill="none" opacity=".6"/></g><ellipse cx="100" cy="300" rx="70" ry="10" fill="none" stroke="#3ae8ff" opacity=".5"/></svg>`;
  root.prepend(svg);
  return () => {};
}

export function playIntro(root) {
  if (!root) return Promise.resolve();
  if (sessionStorage.getItem('arge.introSeen')) { root.remove(); return Promise.resolve(); }
  return new Promise(async (resolve) => {
    let stop = () => {};
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    try { if (!reduced && webglOk()) stop = run3d(await loadThree(), root); else stop = runSvg(root); } catch (_) { stop = runSvg(root); }
    let done = false;
    const finish = () => { if (done) return; done = true; sessionStorage.setItem('arge.introSeen', '1'); root.classList.add('out'); setTimeout(() => { stop(); root.remove(); resolve(); }, 520); };
    root.querySelector('.skip')?.addEventListener('click', finish);
    root.addEventListener('click', (e) => { if (e.target.closest('.skip')) return; finish(); });
    setTimeout(finish, reduced ? 1200 : DURATION);
  });
}
