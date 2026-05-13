// 3D nesne modelleri — procedural Three.js mesh'leri (loader gerektirmez)
// Her fonksiyon: kelimeId verir, kullanılmaya hazır THREE.Group döner.
// userData.kelimeId raycaster için. Hepsi gölge atar/alır.

import * as THREE from 'three';

const M = {};

function mat(opts) {
  return new THREE.MeshStandardMaterial(Object.assign({
    roughness: 0.7, metalness: 0.05
  }, opts));
}

function addToGroup(grp, mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  grp.add(mesh);
  return mesh;
}

function makeGroup(kelimeId) {
  const g = new THREE.Group();
  g.userData.kelimeId = kelimeId;
  return g;
}

// === MEYVELER ===
M.elma = function () {
  const g = makeGroup('elma');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 18), mat({ color: 0xd63b3b }));
  body.position.y = 0.55;
  body.scale.y = 0.95;
  addToGroup(g, body);
  // Çukur (üst)
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.18, 8), mat({ color: 0x5b3a18 }));
  stem.position.y = 1.15;
  addToGroup(g, stem);
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), mat({ color: 0x3a9b46 }));
  leaf.position.set(0.13, 1.22, 0);
  leaf.scale.set(1.2, 0.4, 0.7);
  addToGroup(g, leaf);
  return g;
};

M.portakal = function () {
  const g = makeGroup('portakal');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.55, 22, 16), mat({ color: 0xef8a18, roughness: 0.85 }));
  body.position.y = 0.55;
  addToGroup(g, body);
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), mat({ color: 0x3a9b46 }));
  leaf.position.set(0, 1.18, 0);
  leaf.scale.set(1.4, 0.4, 0.8);
  addToGroup(g, leaf);
  return g;
};

M.muz = function () {
  const g = makeGroup('muz');
  // Eğri muz — Bezier yolu
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.6, 0.3, 0),
    new THREE.Vector3(-0.3, 0.7, 0.1),
    new THREE.Vector3(0.3, 0.9, 0.05),
    new THREE.Vector3(0.7, 0.6, 0)
  ]);
  const geom = new THREE.TubeGeometry(curve, 32, 0.15, 12, false);
  const body = new THREE.Mesh(geom, mat({ color: 0xf5c61a }));
  addToGroup(g, body);
  // Uç (kahve)
  const tipA = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mat({ color: 0x7a4d12 }));
  tipA.position.set(-0.6, 0.3, 0);
  addToGroup(g, tipA);
  const tipB = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), mat({ color: 0x7a4d12 }));
  tipB.position.set(0.7, 0.6, 0);
  addToGroup(g, tipB);
  return g;
};

M.uzum = function () {
  const g = makeGroup('uzum');
  // Salkım — küçük kürelerin piramidal dizilimi
  const layers = [
    { y: 0.2, r: 0.4, n: 0 },
    { y: 0.45, r: 0.45, n: 5 },
    { y: 0.7, r: 0.4, n: 6 },
    { y: 0.95, r: 0.3, n: 5 },
    { y: 1.15, r: 0.18, n: 3 }
  ];
  for (const L of layers) {
    if (L.n === 0) {
      const c = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), mat({ color: 0x7b3fa0 }));
      c.position.y = L.y;
      addToGroup(g, c);
    } else {
      for (let i = 0; i < L.n; i++) {
        const a = (i / L.n) * Math.PI * 2;
        const c = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), mat({ color: 0x7b3fa0 }));
        c.position.set(Math.cos(a) * L.r, L.y, Math.sin(a) * L.r);
        addToGroup(g, c);
      }
    }
  }
  // Yaprak
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), mat({ color: 0x3a9b46 }));
  leaf.position.set(0.12, 1.3, 0.05);
  leaf.scale.set(1.4, 0.4, 1);
  addToGroup(g, leaf);
  // Sap
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2), mat({ color: 0x5b3a18 }));
  stem.position.y = 1.3;
  addToGroup(g, stem);
  return g;
};

M.cilek = function () {
  const g = makeGroup('cilek');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.45, 22, 18), mat({ color: 0xe23a5e }));
  body.position.y = 0.45;
  body.scale.set(1, 1.1, 1);
  addToGroup(g, body);
  // Aşağıya doğru sivri
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.4, 16), mat({ color: 0xe23a5e }));
  tip.position.y = 0.18;
  tip.rotation.x = Math.PI;
  addToGroup(g, tip);
  // Yapraklar
  for (let i = 0; i < 5; i++) {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 6), mat({ color: 0x3a9b46 }));
    const a = (i / 5) * Math.PI * 2;
    leaf.position.set(Math.cos(a) * 0.18, 0.92, Math.sin(a) * 0.18);
    leaf.rotation.z = -Math.cos(a) * 0.6;
    leaf.rotation.x = Math.sin(a) * 0.6;
    addToGroup(g, leaf);
  }
  return g;
};

M.karpuz = function () {
  const g = makeGroup('karpuz');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.95, 28, 18), mat({ color: 0x2e7d32 }));
  body.position.y = 0.85;
  body.scale.set(1.1, 1, 1.1);
  addToGroup(g, body);
  // Açık şeritler
  for (let i = 0; i < 6; i++) {
    const stripe = new THREE.Mesh(new THREE.SphereGeometry(0.96, 28, 4, (i / 6) * Math.PI * 2, 0.08, 0, Math.PI), mat({ color: 0x5cab5f }));
    stripe.position.y = 0.85;
    stripe.scale.set(1.1, 1, 1.1);
    addToGroup(g, stripe);
  }
  return g;
};

M.domates = function () {
  const g = makeGroup('domates');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.4, 22, 16), mat({ color: 0xd83a3a }));
  body.position.y = 0.4;
  body.scale.y = 0.85;
  addToGroup(g, body);
  // Yapraklar
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 6), mat({ color: 0x3a9b46 }));
    leaf.position.set(Math.cos(a) * 0.1, 0.74, Math.sin(a) * 0.1);
    leaf.rotation.z = -Math.cos(a) * 1.1;
    leaf.rotation.x = Math.sin(a) * 1.1;
    addToGroup(g, leaf);
  }
  return g;
};

M.salatalik = function () {
  const g = makeGroup('salatalik');
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.8, 6, 12), mat({ color: 0x5a9a3b, roughness: 0.85 }));
  body.position.y = 0.18;
  body.rotation.z = Math.PI / 2;
  addToGroup(g, body);
  return g;
};

M.havuc = function () {
  const g = makeGroup('havuc');
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1, 14), mat({ color: 0xef7a1a }));
  body.position.y = 0.5;
  addToGroup(g, body);
  // Yapraklar
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.45, 6), mat({ color: 0x3a9b46 }));
    leaf.position.set(Math.cos(a) * 0.04, 1.2, Math.sin(a) * 0.04);
    leaf.rotation.z = -Math.cos(a) * 0.5;
    leaf.rotation.x = Math.sin(a) * 0.5;
    addToGroup(g, leaf);
  }
  return g;
};

M.patates = function () {
  const g = makeGroup('patates');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.4, 18, 14), mat({ color: 0xb88a52, roughness: 0.9 }));
  body.position.y = 0.32;
  body.scale.set(1.3, 0.75, 1);
  addToGroup(g, body);
  // Lekecikler
  for (let i = 0; i < 4; i++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), mat({ color: 0x6b4b22 }));
    dot.position.set((Math.random() - 0.5) * 0.7, 0.5, (Math.random() - 0.5) * 0.7);
    addToGroup(g, dot);
  }
  return g;
};

// === ARAÇLAR ===
M.araba = function () {
  const g = makeGroup('araba');
  // Gövde
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 1.1), mat({ color: 0x1d72d8 }));
  body.position.y = 0.5;
  addToGroup(g, body);
  // Kabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.55, 1), mat({ color: 0x0d4a96 }));
  cabin.position.set(-0.1, 1.05, 0);
  addToGroup(g, cabin);
  // Camlar
  const winF = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.85), mat({ color: 0x9fd8ff, transparent: true, opacity: 0.6 }));
  winF.position.set(0.6, 1.05, 0);
  addToGroup(g, winF);
  const winB = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.85), mat({ color: 0x9fd8ff, transparent: true, opacity: 0.6 }));
  winB.position.set(-0.8, 1.05, 0);
  addToGroup(g, winB);
  // Tekerler
  const wheelGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 18);
  const wMat = mat({ color: 0x1c1c1c, roughness: 0.9 });
  const positions = [[-0.9, 0.3, 0.55], [0.9, 0.3, 0.55], [-0.9, 0.3, -0.55], [0.9, 0.3, -0.55]];
  for (const p of positions) {
    const w = new THREE.Mesh(wheelGeom, wMat);
    w.position.set(...p);
    w.rotation.x = Math.PI / 2;
    addToGroup(g, w);
  }
  // Farlar
  const headlight = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), mat({ color: 0xfff39c, emissive: 0xfff39c, emissiveIntensity: 0.5 }));
  headlight.position.set(1.2, 0.55, 0.35);
  addToGroup(g, headlight);
  const headlight2 = headlight.clone();
  headlight2.position.set(1.2, 0.55, -0.35);
  addToGroup(g, headlight2);
  return g;
};

M.ucak = function () {
  const g = makeGroup('ucak');
  // Gövde
  const fus = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 2.2, 8, 16), mat({ color: 0xeaeaea }));
  fus.position.y = 0.5;
  fus.rotation.z = Math.PI / 2;
  addToGroup(g, fus);
  // Kanat
  const wing = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 3.5), mat({ color: 0xcfd1d6 }));
  wing.position.y = 0.5;
  addToGroup(g, wing);
  // Kuyruk dikey
  const tailV = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.7, 0.08), mat({ color: 0xd83a3a }));
  tailV.position.set(-1.3, 0.95, 0);
  addToGroup(g, tailV);
  // Kuyruk yatay
  const tailH = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 1.2), mat({ color: 0xd83a3a }));
  tailH.position.set(-1.3, 0.75, 0);
  addToGroup(g, tailH);
  // Cam
  const cock = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 10), mat({ color: 0x9fd8ff, transparent: true, opacity: 0.7 }));
  cock.position.set(1.0, 0.65, 0);
  cock.scale.set(1.2, 0.6, 0.8);
  addToGroup(g, cock);
  return g;
};

M.gemi = function () {
  const g = makeGroup('gemi');
  // Gövde trapezoid
  const hullShape = new THREE.Shape();
  hullShape.moveTo(-1.5, 0);
  hullShape.lineTo(1.7, 0);
  hullShape.lineTo(1.3, 0.5);
  hullShape.lineTo(-1.2, 0.5);
  hullShape.lineTo(-1.5, 0);
  const hullGeom = new THREE.ExtrudeGeometry(hullShape, { depth: 1.2, bevelEnabled: false });
  hullGeom.translate(0, 0, -0.6);
  const hull = new THREE.Mesh(hullGeom, mat({ color: 0x9c4318 }));
  hull.position.y = 0.4;
  addToGroup(g, hull);
  // Kabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.9), mat({ color: 0xf1efe6 }));
  cabin.position.set(-0.3, 1.2, 0);
  addToGroup(g, cabin);
  // Camlar
  for (let i = -1; i <= 1; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.25, 0.02), mat({ color: 0x9fd8ff, transparent: true, opacity: 0.7 }));
    w.position.set(-0.3 + i * 0.25, 1.25, 0.46);
    addToGroup(g, w);
  }
  // Direk
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.3), mat({ color: 0x5b3a18 }));
  mast.position.set(0.2, 2.1, 0);
  addToGroup(g, mast);
  // Bayrak
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.3), mat({ color: 0xd83a3a, side: THREE.DoubleSide }));
  flag.position.set(0.42, 2.5, 0);
  addToGroup(g, flag);
  return g;
};

M.bisiklet = function () {
  const g = makeGroup('bisiklet');
  // Tekerler (torus)
  const tireGeom = new THREE.TorusGeometry(0.45, 0.07, 12, 28);
  const tireMat = mat({ color: 0x1c1c1c });
  const w1 = new THREE.Mesh(tireGeom, tireMat);
  w1.position.set(-0.7, 0.45, 0);
  w1.rotation.y = Math.PI / 2;
  addToGroup(g, w1);
  const w2 = new THREE.Mesh(tireGeom, tireMat);
  w2.position.set(0.7, 0.45, 0);
  w2.rotation.y = Math.PI / 2;
  addToGroup(g, w2);
  // Jant
  const rimMat = mat({ color: 0xc0c0c0, metalness: 0.7 });
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2;
    const spoke1 = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.85), rimMat);
    spoke1.position.set(-0.7, 0.45, 0);
    spoke1.rotation.z = a;
    spoke1.rotation.y = Math.PI / 2;
    addToGroup(g, spoke1);
    const spoke2 = spoke1.clone();
    spoke2.position.set(0.7, 0.45, 0);
    addToGroup(g, spoke2);
  }
  // İskelet
  const frameMat = mat({ color: 0x36b3a0 });
  const bar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1), frameMat);
  bar1.position.set(0, 0.7, 0);
  bar1.rotation.z = Math.PI / 2;
  addToGroup(g, bar1);
  const bar2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8), frameMat);
  bar2.position.set(-0.4, 0.55, 0);
  bar2.rotation.z = 0.4;
  addToGroup(g, bar2);
  const bar3 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7), frameMat);
  bar3.position.set(0.4, 0.6, 0);
  bar3.rotation.z = -0.4;
  addToGroup(g, bar3);
  // Sele
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.12), mat({ color: 0x222 }));
  seat.position.set(-0.3, 1, 0);
  addToGroup(g, seat);
  // Gidon
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5), frameMat);
  handle.position.set(0.55, 1, 0);
  handle.rotation.x = Math.PI / 2;
  addToGroup(g, handle);
  return g;
};

M.otobus = function () {
  const g = makeGroup('otobus');
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.5, 1.3), mat({ color: 0xf1b228 }));
  body.position.y = 0.95;
  addToGroup(g, body);
  // Tavan
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.1, 1.3), mat({ color: 0xbb8512 }));
  roof.position.y = 1.75;
  addToGroup(g, roof);
  // Camlar — yan dizi
  for (let i = -1.4; i <= 1.4; i += 0.7) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.02), mat({ color: 0x9fd8ff, transparent: true, opacity: 0.6 }));
    w.position.set(i, 1.15, 0.66);
    addToGroup(g, w);
    const w2 = w.clone();
    w2.position.z = -0.66;
    addToGroup(g, w2);
  }
  // Ön cam
  const wf = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, 1.1), mat({ color: 0x9fd8ff, transparent: true, opacity: 0.6 }));
  wf.position.set(1.81, 1.2, 0);
  addToGroup(g, wf);
  // Tekerler
  const wheelGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 18);
  const wMat = mat({ color: 0x1c1c1c });
  for (const p of [[-1.3, 0.35, 0.65], [1.3, 0.35, 0.65], [-1.3, 0.35, -0.65], [1.3, 0.35, -0.65]]) {
    const w = new THREE.Mesh(wheelGeom, wMat);
    w.position.set(...p);
    w.rotation.x = Math.PI / 2;
    addToGroup(g, w);
  }
  return g;
};

M.tren = function () {
  const g = makeGroup('tren');
  // Lokomotif gövdesi
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.2, 1.2), mat({ color: 0x2b6cb0 }));
  body.position.y = 0.85;
  addToGroup(g, body);
  // Kabin (geri)
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 1.2), mat({ color: 0x205a96 }));
  cabin.position.set(-1.05, 1.7, 0);
  addToGroup(g, cabin);
  // Baca
  const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.55), mat({ color: 0x1c1c1c }));
  ch.position.set(0.9, 1.75, 0);
  addToGroup(g, ch);
  // Camlar
  const ws = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, 1), mat({ color: 0x9fd8ff, transparent: true, opacity: 0.7 }));
  ws.position.set(-0.6, 1.75, 0);
  addToGroup(g, ws);
  // Tekerler — büyük 3 çift
  const wheelGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.25, 18);
  const wMat = mat({ color: 0x1c1c1c });
  for (const x of [-0.9, 0.0, 0.9]) {
    for (const z of [0.62, -0.62]) {
      const w = new THREE.Mesh(wheelGeom, wMat);
      w.position.set(x, 0.32, z);
      w.rotation.x = Math.PI / 2;
      addToGroup(g, w);
    }
  }
  // Ön ışık
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), mat({ color: 0xfff39c, emissive: 0xfff39c, emissiveIntensity: 0.5 }));
  lamp.position.set(1.3, 1.1, 0);
  addToGroup(g, lamp);
  return g;
};

// === HAYVANLAR ===
M.kedi = function () {
  const g = makeGroup('kedi');
  // Gövde
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.6, 6, 10), mat({ color: 0xc4965b }));
  body.position.set(-0.1, 0.45, 0);
  body.rotation.z = Math.PI / 2;
  addToGroup(g, body);
  // Kafa
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), mat({ color: 0xc4965b }));
  head.position.set(0.55, 0.65, 0);
  addToGroup(g, head);
  // Kulaklar
  for (const z of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 8), mat({ color: 0xc4965b }));
    ear.position.set(0.55, 0.93, 0.15 * z);
    ear.rotation.z = -0.2;
    addToGroup(g, ear);
  }
  // Gözler
  for (const z of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), mat({ color: 0x1c1c1c }));
    eye.position.set(0.78, 0.7, 0.13 * z);
    addToGroup(g, eye);
  }
  // Burun
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), mat({ color: 0xf0a8a8 }));
  nose.position.set(0.85, 0.62, 0);
  addToGroup(g, nose);
  // Kuyruk (eğri)
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.7, 0.45, 0),
    new THREE.Vector3(-1.0, 0.75, 0),
    new THREE.Vector3(-1.1, 1.05, 0)
  ]);
  const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 16, 0.08, 8, false), mat({ color: 0xc4965b }));
  addToGroup(g, tail);
  // Pati
  for (const [x, z] of [[-0.45, 0.2], [-0.45, -0.2], [0.15, 0.2], [0.15, -0.2]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.3), mat({ color: 0xb88554 }));
    leg.position.set(x, 0.15, z);
    addToGroup(g, leg);
  }
  return g;
};

M.kopek = function () {
  const g = makeGroup('kopek');
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.7, 6, 10), mat({ color: 0x8a5a2b }));
  body.position.set(-0.05, 0.5, 0);
  body.rotation.z = Math.PI / 2;
  addToGroup(g, body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 12), mat({ color: 0x8a5a2b }));
  head.position.set(0.65, 0.75, 0);
  addToGroup(g, head);
  // Burun (uzun)
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.22), mat({ color: 0x8a5a2b }));
  snout.position.set(0.95, 0.65, 0);
  addToGroup(g, snout);
  const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), mat({ color: 0x1c1c1c }));
  noseTip.position.set(1.12, 0.68, 0);
  addToGroup(g, noseTip);
  // Kulaklar sarkan
  for (const z of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.05), mat({ color: 0x5c3a18 }));
    ear.position.set(0.5, 0.85, 0.32 * z);
    ear.rotation.z = 0.3;
    addToGroup(g, ear);
  }
  // Gözler
  for (const z of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), mat({ color: 0x1c1c1c }));
    eye.position.set(0.85, 0.85, 0.15 * z);
    addToGroup(g, eye);
  }
  // Kuyruk
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.5), mat({ color: 0x8a5a2b }));
  tail.position.set(-0.75, 0.7, 0);
  tail.rotation.z = -0.5;
  addToGroup(g, tail);
  // Bacaklar
  for (const [x, z] of [[-0.45, 0.25], [-0.45, -0.25], [0.2, 0.25], [0.2, -0.25]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4), mat({ color: 0x8a5a2b }));
    leg.position.set(x, 0.2, z);
    addToGroup(g, leg);
  }
  return g;
};

M.kus = function () {
  const g = makeGroup('kus');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), mat({ color: 0x3a9be0 }));
  body.position.y = 0.4;
  body.scale.set(1, 0.85, 1.1);
  addToGroup(g, body);
  // Kafa
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), mat({ color: 0x3a9be0 }));
  head.position.set(0.25, 0.6, 0);
  addToGroup(g, head);
  // Gaga
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.15, 8), mat({ color: 0xf0a020 }));
  beak.position.set(0.4, 0.58, 0);
  beak.rotation.z = -Math.PI / 2;
  addToGroup(g, beak);
  // Göz
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), mat({ color: 0x1c1c1c }));
  eye.position.set(0.32, 0.65, 0.13);
  addToGroup(g, eye);
  const eye2 = eye.clone();
  eye2.position.z = -0.13;
  addToGroup(g, eye2);
  // Kanat
  for (const z of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), mat({ color: 0x2173b2 }));
    wing.position.set(0, 0.45, 0.25 * z);
    wing.scale.set(0.5, 0.4, 1);
    addToGroup(g, wing);
  }
  // Kuyruk
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.3, 8), mat({ color: 0x2173b2 }));
  tail.position.set(-0.35, 0.4, 0);
  tail.rotation.z = Math.PI / 2;
  addToGroup(g, tail);
  // Bacaklar
  for (const z of [-0.1, 0.1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.25), mat({ color: 0xf0a020 }));
    leg.position.set(0, 0.15, z);
    addToGroup(g, leg);
  }
  return g;
};

M.aslan = function () {
  const g = makeGroup('aslan');
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.9, 8, 12), mat({ color: 0xdd9a3a }));
  body.position.set(-0.1, 0.6, 0);
  body.rotation.z = Math.PI / 2;
  addToGroup(g, body);
  // Yele (büyük küre)
  const mane = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), mat({ color: 0xa05f1c, roughness: 0.9 }));
  mane.position.set(0.6, 0.85, 0);
  addToGroup(g, mane);
  // Yüz
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 10), mat({ color: 0xdd9a3a }));
  face.position.set(0.85, 0.85, 0);
  addToGroup(g, face);
  // Burun
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), mat({ color: 0x1c1c1c }));
  nose.position.set(1.1, 0.82, 0);
  addToGroup(g, nose);
  // Gözler
  for (const z of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), mat({ color: 0x1c1c1c }));
    eye.position.set(1.0, 0.95, 0.15 * z);
    addToGroup(g, eye);
  }
  // Kuyruk
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.05, 0.7), mat({ color: 0xdd9a3a }));
  tail.position.set(-0.85, 0.85, 0);
  tail.rotation.z = -0.4;
  addToGroup(g, tail);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), mat({ color: 0xa05f1c }));
  tip.position.set(-1.15, 1.15, 0);
  addToGroup(g, tip);
  // Bacaklar
  for (const [x, z] of [[-0.55, 0.28], [-0.55, -0.28], [0.25, 0.28], [0.25, -0.28]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5), mat({ color: 0xdd9a3a }));
    leg.position.set(x, 0.25, z);
    addToGroup(g, leg);
  }
  return g;
};

M.balik = function () {
  const g = makeGroup('balik');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.4, 18, 12), mat({ color: 0xff8a3a, roughness: 0.6 }));
  body.position.y = 0.45;
  body.scale.set(1.4, 1, 0.7);
  addToGroup(g, body);
  // Kuyruk
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.5, 6), mat({ color: 0xcc5a18 }));
  tail.position.set(-0.65, 0.45, 0);
  tail.rotation.z = Math.PI / 2;
  tail.scale.set(1, 1, 0.5);
  addToGroup(g, tail);
  // Yüzgeç üst
  const finT = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.25, 6), mat({ color: 0xcc5a18 }));
  finT.position.set(0, 0.78, 0);
  addToGroup(g, finT);
  // Göz
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), mat({ color: 0xffffff }));
  eye.position.set(0.4, 0.5, 0.27);
  addToGroup(g, eye);
  const pup = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), mat({ color: 0x1c1c1c }));
  pup.position.set(0.43, 0.5, 0.31);
  addToGroup(g, pup);
  return g;
};

M.inek = function () {
  const g = makeGroup('inek');
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.0, 8, 12), mat({ color: 0xf3f3f3 }));
  body.position.set(-0.05, 0.85, 0);
  body.rotation.z = Math.PI / 2;
  addToGroup(g, body);
  // Siyah lekeler
  const spotMat = mat({ color: 0x1c1c1c });
  for (let i = 0; i < 4; i++) {
    const spot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), spotMat);
    spot.position.set(-0.4 + i * 0.3, 0.95, (i % 2 ? 0.5 : -0.5));
    spot.scale.set(1, 0.4, 1);
    addToGroup(g, spot);
  }
  // Kafa
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 14, 10), mat({ color: 0xf3f3f3 }));
  head.position.set(0.75, 1, 0);
  addToGroup(g, head);
  // Boynuzlar
  for (const z of [-1, 1]) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.25, 8), mat({ color: 0xe8d8a0 }));
    horn.position.set(0.6, 1.4, 0.2 * z);
    addToGroup(g, horn);
  }
  // Burun (pembe)
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), mat({ color: 0xf0a8a8 }));
  muzzle.position.set(1.05, 0.9, 0);
  muzzle.scale.set(1, 0.6, 0.8);
  addToGroup(g, muzzle);
  // Bacaklar
  for (const [x, z] of [[-0.55, 0.35], [-0.55, -0.35], [0.3, 0.35], [0.3, -0.35]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.7), mat({ color: 0xf3f3f3 }));
    leg.position.set(x, 0.35, z);
    addToGroup(g, leg);
  }
  // Kuyruk
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.6), mat({ color: 0xf3f3f3 }));
  tail.position.set(-0.95, 1.0, 0);
  tail.rotation.z = -0.4;
  addToGroup(g, tail);
  return g;
};

M.tavsan = function () {
  const g = makeGroup('tavsan');
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 12), mat({ color: 0xfafafa }));
  body.position.y = 0.45;
  body.scale.set(1, 1.05, 1);
  addToGroup(g, body);
  // Kafa
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), mat({ color: 0xfafafa }));
  head.position.set(0, 0.85, 0);
  addToGroup(g, head);
  // Uzun kulaklar
  for (const z of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.4, 4, 8), mat({ color: 0xfafafa }));
    ear.position.set(-0.05, 1.3, 0.13 * z);
    ear.rotation.z = 0.05 * z;
    addToGroup(g, ear);
    const inner = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.3, 4, 8), mat({ color: 0xf0a8a8 }));
    inner.position.set(-0.04, 1.3, 0.14 * z);
    addToGroup(g, inner);
  }
  // Gözler
  for (const z of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), mat({ color: 0x1c1c1c }));
    eye.position.set(0.18, 0.88, 0.12 * z);
    addToGroup(g, eye);
  }
  // Burun
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), mat({ color: 0xf0a8a8 }));
  nose.position.set(0.27, 0.8, 0);
  addToGroup(g, nose);
  // Kuyruk topu
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), mat({ color: 0xfafafa }));
  tail.position.set(-0.4, 0.55, 0);
  addToGroup(g, tail);
  // Bacaklar
  for (const [x, z] of [[-0.2, 0.2], [-0.2, -0.2], [0.2, 0.18], [0.2, -0.18]]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.1, 4, 8), mat({ color: 0xfafafa }));
    leg.position.set(x, 0.18, z);
    addToGroup(g, leg);
  }
  return g;
};

// === DEKOR ===
// Ağaç
M.agac = function () {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.5, 10), mat({ color: 0x6b3f1f, roughness: 0.9 }));
  trunk.position.y = 0.75;
  trunk.castShadow = true; trunk.receiveShadow = true;
  g.add(trunk);
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.95, 16, 12), mat({ color: 0x3a9b46 }));
  top.position.y = 2;
  top.castShadow = true; top.receiveShadow = true;
  g.add(top);
  const top2 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 10), mat({ color: 0x4cb058 }));
  top2.position.set(0.5, 1.8, 0.3);
  top2.castShadow = true; top2.receiveShadow = true;
  g.add(top2);
  return g;
};

// Bulut
M.bulut = function () {
  const g = new THREE.Group();
  const mtl = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.95 });
  for (let i = 0; i < 5; i++) {
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.7 + Math.random() * 0.4, 12, 8), mtl);
    c.position.set(i * 0.7 - 1.4, Math.random() * 0.3, Math.random() * 0.4);
    g.add(c);
  }
  return g;
};

// Manav tezgahı (uzun ahşap masa)
M.tezgah = function () {
  const g = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(8, 0.15, 1.6), mat({ color: 0xa06330 }));
  top.position.y = 0.9;
  top.castShadow = true; top.receiveShadow = true;
  g.add(top);
  // Bacaklar
  for (const x of [-3.7, 3.7]) {
    for (const z of [-0.7, 0.7]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.9, 0.15), mat({ color: 0x6b3f1f }));
      leg.position.set(x, 0.45, z);
      leg.castShadow = true; leg.receiveShadow = true;
      g.add(leg);
    }
  }
  // Çatı/sayebari
  const roof = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.08, 2), mat({ color: 0xc23a3a }));
  roof.position.y = 2.6;
  roof.castShadow = true; roof.receiveShadow = true;
  g.add(roof);
  // Çatı direkleri
  for (const x of [-3.9, 3.9]) {
    for (const z of [-0.9, 0.9]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.7), mat({ color: 0x6b3f1f }));
      post.position.set(x, 1.75, z);
      post.castShadow = true; post.receiveShadow = true;
      g.add(post);
    }
  }
  // Çizgili tente görünümü için ön sarkma
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.3, 0.05), mat({ color: 0xfff3d0 }));
  stripe.position.set(0, 2.45, 1);
  g.add(stripe);
  return g;
};

// Çit (hayvan sahnesi)
M.cit = function (uzunluk) {
  uzunluk = uzunluk || 4;
  const g = new THREE.Group();
  const woodMat = mat({ color: 0xc89868 });
  for (let i = 0; i < uzunluk; i++) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1, 0.12), woodMat);
    post.position.set(i, 0.5, 0);
    post.castShadow = true; post.receiveShadow = true;
    g.add(post);
  }
  // Yatay
  const bar1 = new THREE.Mesh(new THREE.BoxGeometry(uzunluk, 0.1, 0.06), woodMat);
  bar1.position.set(uzunluk / 2 - 0.5, 0.75, 0);
  bar1.castShadow = true; bar1.receiveShadow = true;
  g.add(bar1);
  const bar2 = new THREE.Mesh(new THREE.BoxGeometry(uzunluk, 0.1, 0.06), woodMat);
  bar2.position.set(uzunluk / 2 - 0.5, 0.4, 0);
  bar2.castShadow = true; bar2.receiveShadow = true;
  g.add(bar2);
  return g;
};

export { M as Models3D };
