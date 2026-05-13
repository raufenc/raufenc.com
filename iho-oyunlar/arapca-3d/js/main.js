// Ana 3D oyun — gerçek perspektif kameralı, gölgeli, ferah dünya.
// HEDEF NESNEYE İPUCU YOK — yalnızca İpucu butonuna basınca vurgu.

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { Models3D } from './models3d.js';

// === Global state ===
const State = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  clock: null,
  raycaster: new THREE.Raycaster(),
  pointer: new THREE.Vector2(),

  worldRoot: null,        // sahne içindeki dinamik dünya (model+nesneler) burada
  nesneler: [],           // [{kelime, group, basY, animPhase, flash:{tip,t0}}]
  hedefKelime: null,
  bulutlar: [],

  modu: 'oyun',           // 'oyun' | 'sinav' | 'alisveris'
  aktifSahne: null,
  skor: 0,

  // Alışveriş modu state'i
  liste: [],              // [{kid, gerekli, mevcut, fiyat}]
  toplamGerekli: 0,
  toplamMevcut: 0,
  paraOdenen: 0,
  dogru: 0,
  yanlis: 0,
  kalanSorular: [],
  toplamSoru: 0,

  ipucuKalan: 0,          // hedef belirgin halka — saniye cinsinden kalan süre
  hedefRing: null         // ipucu halkası mesh'i
};

// Arapça-Hindî rakamlara çevir: 0123 → ٠١٢٣
function arabicNum(n) {
  const m = '٠١٢٣٤٥٦٧٨٩';
  return String(n).split('').map(c => (c >= '0' && c <= '9') ? m[c.charCodeAt(0) - 48] : c).join('');
}

// === Init ===
function init() {
  const canvas = document.getElementById('oyun-canvas');
  State.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  State.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  State.renderer.shadowMap.enabled = true;
  State.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  State.renderer.outputColorSpace = THREE.SRGBColorSpace;

  State.scene = new THREE.Scene();
  State.scene.background = new THREE.Color(0xbfe4ff);
  State.scene.fog = new THREE.Fog(0xbfe4ff, 30, 90);

  State.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  State.camera.position.set(0, 6, 14);
  State.camera.lookAt(0, 1, 0);

  State.controls = new OrbitControls(State.camera, canvas);
  State.controls.enablePan = false;
  State.controls.minDistance = 7;
  State.controls.maxDistance = 22;
  State.controls.minPolarAngle = Math.PI * 0.18;
  State.controls.maxPolarAngle = Math.PI * 0.48;
  State.controls.target.set(0, 1, 0);
  State.controls.enableDamping = true;
  State.controls.dampingFactor = 0.08;

  // Işıklandırma
  const hemi = new THREE.HemisphereLight(0xfff5d6, 0x4a7a3a, 0.55);
  State.scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(8, 14, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 40;
  sun.shadow.camera.left = -18;
  sun.shadow.camera.right = 18;
  sun.shadow.camera.top = 18;
  sun.shadow.camera.bottom = -18;
  sun.shadow.bias = -0.0008;
  State.scene.add(sun);
  // Hafif önden dolgu ışığı
  const fill = new THREE.DirectionalLight(0xdce8ff, 0.25);
  fill.position.set(-6, 6, -4);
  State.scene.add(fill);

  // Hedef vurgu halkası (sadece ipucuda görünür)
  const ringGeom = new THREE.RingGeometry(0.9, 1.15, 32);
  ringGeom.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd76b, transparent: true, opacity: 0, side: THREE.DoubleSide });
  State.hedefRing = new THREE.Mesh(ringGeom, ringMat);
  State.scene.add(State.hedefRing);

  State.clock = new THREE.Clock();
  window.addEventListener('resize', onResize);
  canvas.addEventListener('pointerdown', onPointerDown, { passive: true });

  onResize();
  animate();
}

function onResize() {
  const canvas = State.renderer.domElement;
  const w = canvas.clientWidth || window.innerWidth;
  const h = canvas.clientHeight || window.innerHeight;
  State.renderer.setSize(w, h, false);
  State.camera.aspect = w / h;
  State.camera.updateProjectionMatrix();
}

function clearWorld() {
  if (State.worldRoot) {
    State.scene.remove(State.worldRoot);
    State.worldRoot.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
        else o.material.dispose();
      }
    });
  }
  State.worldRoot = new THREE.Group();
  State.scene.add(State.worldRoot);
  State.nesneler = [];
  State.bulutlar = [];
  if (State.hedefRing) State.hedefRing.material.opacity = 0;
  State.ipucuKalan = 0;
}

// === Sahne kurulumu ===
function kurManav() {
  // Pazar yeri — taş zemin, tezgah ve göksel manzara
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xd4c098, roughness: 0.95 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  State.worldRoot.add(ground);
  // Karoları stilize et — şeritli
  for (let i = -10; i <= 10; i += 2) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.05, 80),
      new THREE.MeshBasicMaterial({ color: 0xb09572 })
    );
    line.rotation.x = -Math.PI / 2;
    line.position.set(i, 0.01, 0);
    State.worldRoot.add(line);
  }

  // Tezgah
  const tez = Models3D.tezgah();
  tez.position.set(0, 0, -1.2);
  State.worldRoot.add(tez);

  // Sandıklar — tezgah üzerine 5 ahşap sandık
  const sandikRenkleri = [0x8a5a2b, 0x965a2b, 0x7c4a18, 0x965e2c, 0x824a18];
  for (let i = 0; i < 5; i++) {
    const sn = Models3D.sandik(sandikRenkleri[i]);
    sn.position.set(-3.2 + i * 1.6, 0.97, -1.2);
    sn.scale.setScalar(0.95);
    State.worldRoot.add(sn);
  }

  // Ağaçlar
  for (const [x, z] of [[-10, -8], [10, -8], [-12, 6], [12, 6]]) {
    const ag = Models3D.agac();
    ag.position.set(x, 0, z);
    ag.rotation.y = Math.random() * Math.PI;
    State.worldRoot.add(ag);
  }

  return ground;
}

function kurAraclar() {
  // Asfalt zemin
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.MeshStandardMaterial({ color: 0x4a4f57, roughness: 0.95 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  State.worldRoot.add(ground);

  // Şerit çizgileri (orta yol)
  for (let i = -12; i <= 12; i += 2) {
    const stripe = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 0.18),
      new THREE.MeshBasicMaterial({ color: 0xf5d000 })
    );
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(i, 0.01, 0);
    State.worldRoot.add(stripe);
  }
  // Çevre çim alanları
  for (const x of [-25, 25]) {
    const grass = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 80),
      new THREE.MeshStandardMaterial({ color: 0x6dad4f, roughness: 0.9 })
    );
    grass.rotation.x = -Math.PI / 2;
    grass.position.set(x, 0.005, 0);
    grass.receiveShadow = true;
    State.worldRoot.add(grass);
  }

  return ground;
}

function kurHayvanlar() {
  // Çayır
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x6dad4f, roughness: 0.95 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  State.worldRoot.add(ground);

  // Çitler çevre boyunca
  const c1 = Models3D.cit(20);
  c1.position.set(-10, 0, -10);
  State.worldRoot.add(c1);
  const c2 = Models3D.cit(20);
  c2.position.set(-10, 0, 10);
  State.worldRoot.add(c2);

  // Ağaçlar
  for (const [x, z] of [[-14, -6], [14, -6], [-15, 5], [15, 5], [-9, -14], [9, -14]]) {
    const ag = Models3D.agac();
    ag.position.set(x, 0, z);
    ag.rotation.y = Math.random() * Math.PI;
    State.worldRoot.add(ag);
  }

  return ground;
}

// Nesneleri serpiştir
function yerlestir(sahneId, kelimeIdler) {
  let pozisyonlar = [];
  let nesneScale = 1;
  if (sahneId === 'manav') {
    // Meyveler/sebzeler sandıklara oturur — küçük ölçek
    nesneScale = 0.55;
    const n = kelimeIdler.length;
    const ust = Math.ceil(n / 2);
    const alt = n - ust;
    pozisyonlar = [];
    // Y = sandık tabanı (0.97 tezgah + 0.03 sandık tabanı) ≈ 1.0
    for (let i = 0; i < ust; i++) pozisyonlar.push([-3.2 + i * (6.4 / Math.max(ust - 1, 1)), 1.0, -1.55]);
    for (let i = 0; i < alt; i++) pozisyonlar.push([-3.2 + i * (6.4 / Math.max(alt - 1, 1)), 1.0, -0.85]);
  } else if (sahneId === 'araclar') {
    // İki sıra, asfalt üstüne, geniş aralık
    const n = kelimeIdler.length;
    pozisyonlar = [];
    const ust = Math.ceil(n / 2);
    const alt = n - ust;
    for (let i = 0; i < ust; i++) {
      pozisyonlar.push([-7 + i * (14 / Math.max(ust - 1, 1)), 0, -5]);
    }
    for (let i = 0; i < alt; i++) {
      pozisyonlar.push([-7 + i * (14 / Math.max(alt - 1, 1)), 0, 5]);
    }
  } else if (sahneId === 'hayvanlar') {
    // Çayırda 3 satır halinde dağınık
    const n = kelimeIdler.length;
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const sx = 14 / Math.max(cols - 1, 1);
    const sz = 8 / Math.max(rows - 1, 1);
    pozisyonlar = [];
    for (let i = 0; i < n; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      pozisyonlar.push([-7 + c * sx + (r % 2) * 0.8, 0, -4 + r * sz]);
    }
  }

  for (let i = 0; i < kelimeIdler.length; i++) {
    const kid = kelimeIdler[i];
    const kelime = window.Data.KELIMELER[kid];
    if (!kelime) continue;
    const mFn = Models3D[kelime.model];
    if (!mFn) continue;
    const grp = mFn();
    const [x, y, z] = pozisyonlar[i] || [0, 0, 0];
    grp.position.set(x, y, z);
    if (nesneScale !== 1) grp.scale.setScalar(nesneScale);
    // Her nesne kendi orijinal renkleri kalsın — flash için runtime'da değişir
    State.worldRoot.add(grp);
    State.nesneler.push({
      kelime,
      group: grp,
      basY: y,
      basRotY: grp.rotation.y,
      flash: null,
      originalMaterials: stashMaterials(grp)
    });
  }
}

function stashMaterials(grp) {
  const out = [];
  grp.traverse(o => {
    if (o.isMesh && o.material) {
      out.push({ mesh: o, color: o.material.color.clone(), emissive: o.material.emissive ? o.material.emissive.clone() : null, ei: o.material.emissiveIntensity || 0 });
    }
  });
  return out;
}

function restoreMaterials(rec) {
  for (const m of rec.originalMaterials) {
    m.mesh.material.color.copy(m.color);
    if (m.emissive) m.mesh.material.emissive.copy(m.emissive);
    m.mesh.material.emissiveIntensity = m.ei;
  }
}

// Sahneyi aç
function sahneAc(sahneId, opts) {
  opts = opts || {};
  clearWorld();
  State.aktifSahne = sahneId;
  const sahne = window.Data.SAHNELER[sahneId];
  if (!sahne) return;

  if (sahneId === 'manav') kurManav();
  else if (sahneId === 'araclar') kurAraclar();
  else if (sahneId === 'hayvanlar') kurHayvanlar();

  // Bulutlar
  for (let i = 0; i < 5; i++) {
    const b = Models3D.bulut();
    b.position.set(-20 + i * 9 + Math.random() * 3, 12 + Math.random() * 3, -25 + Math.random() * 6);
    b.scale.setScalar(1.2 + Math.random() * 0.8);
    State.worldRoot.add(b);
    State.bulutlar.push(b);
  }

  yerlestir(sahneId, sahne.kelimeler);

  // Kamerayı sahneye uygun yerleştir
  if (sahneId === 'manav') {
    State.camera.position.set(0, 4, 6);
    State.controls.target.set(0, 1.2, -1);
  } else if (sahneId === 'araclar') {
    State.camera.position.set(0, 7, 14);
    State.controls.target.set(0, 0.7, 0);
  } else {
    State.camera.position.set(0, 5, 10);
    State.controls.target.set(0, 0.6, 0);
  }
  State.controls.update();

  if (!opts.skipNewTarget) {
    rasgeleHedef();
  }
}

function rasgeleHedef() {
  if (!State.nesneler.length) return;
  const i = Math.floor(Math.random() * State.nesneler.length);
  State.hedefKelime = State.nesneler[i].kelime;
  ipucuGoster();
}

function ipucuGoster() {
  if (!State.hedefKelime) return;
  const k = State.hedefKelime;
  const ipucuEl = document.getElementById('ipucu-arapca');
  if (ipucuEl) ipucuEl.textContent = k.ar;
  setTimeout(() => window.TTS && window.TTS.speakArabic(k.ar), 250);
}

// === Etkileşim ===
function onPointerDown(ev) {
  if (!State.worldRoot) return;
  const rect = State.renderer.domElement.getBoundingClientRect();
  State.pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
  State.pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
  State.raycaster.setFromCamera(State.pointer, State.camera);
  const hits = State.raycaster.intersectObjects(
    State.nesneler.map(n => n.group),
    true
  );
  if (!hits.length) return;
  // Hangi üst gruba ait?
  let node = hits[0].object;
  while (node && !node.userData.kelimeId) node = node.parent;
  if (!node || !node.userData.kelimeId) return;
  const rec = State.nesneler.find(n => n.group === node);
  if (!rec) return;
  tiklandi(rec);
}

function tiklandi(rec) {
  window.SFX && window.SFX.tiklama();
  const t = performance.now();
  if (State.modu === 'alisveris') {
    alisverisTikla(rec);
    return;
  }
  if (State.hedefKelime && rec.kelime.id === State.hedefKelime.id) {
    rec.flash = { tip: 'dogru', t0: t };
    flashMaterial(rec, 0x4cd66d, 0.6);
    dogruTahmin(rec);
  } else {
    rec.flash = { tip: 'yanlis', t0: t };
    flashMaterial(rec, 0xff4444, 0.6);
    yanlisTahmin(rec);
  }
}

// === Alışveriş modu mantığı ===
function alisverisBaslat() {
  State.modu = 'alisveris';
  State.skor = 0;
  State.dogru = 0;
  State.yanlis = 0;
  State.toplamMevcut = 0;
  State.paraOdenen = 0;

  // Rastgele 4 ürün, her biri 1-3 adet
  const tum = window.Data.SAHNELER.manav.kelimeler.slice();
  for (let i = tum.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tum[i], tum[j]] = [tum[j], tum[i]];
  }
  const secilen = tum.slice(0, 4);
  State.liste = secilen.map(kid => ({
    kid,
    gerekli: 1 + Math.floor(Math.random() * 3),
    mevcut: 0,
    fiyat: window.Data.KELIMELER[kid].fiyat
  }));
  State.toplamGerekli = State.liste.reduce((s, x) => s + x.gerekli, 0);
  document.getElementById('alisveris-paneli').style.display = 'flex';
  document.getElementById('ipucu-karti').style.display = 'none';
  alisverisListeyiCiz();
  alisverisToplamGuncelle();
  // Hedefi temizle (alışverişte hedef yok)
  State.hedefKelime = null;
}

function alisverisListeyiCiz() {
  const ul = document.getElementById('alisveris-liste');
  ul.innerHTML = '';
  for (const item of State.liste) {
    const k = window.Data.KELIMELER[item.kid];
    const tamam = item.mevcut >= item.gerekli;
    const li = document.createElement('li');
    li.className = 'alisveris-satir' + (tamam ? ' tamam' : '');
    // Tamamen Arapça: emoji + Arapça kelime + Arapça-Hindî rakamlarla fiyat ve miktar
    li.innerHTML =
      '<span class="av-emoji">' + (k.emoji || '·') + '</span>' +
      '<div class="av-ad">' +
        '<div class="av-ar">' + k.ar + '</div>' +
        '<div class="av-fiyat">' + arabicNum(item.fiyat) + ' ﷼</div>' +
      '</div>' +
      '<div class="av-mik">' + arabicNum(item.mevcut) + ' / ' + arabicNum(item.gerekli) + '</div>';
    ul.appendChild(li);
  }
}

function alisverisToplamGuncelle() {
  const tut = document.getElementById('av-toplam');
  if (tut) tut.textContent = arabicNum(State.paraOdenen) + ' ﷼';
  const sayac = document.getElementById('av-sayac');
  if (sayac) sayac.textContent = arabicNum(State.toplamMevcut) + ' / ' + arabicNum(State.toplamGerekli);
}

function alisverisTikla(rec) {
  const item = State.liste.find(x => x.kid === rec.kelime.id);
  if (!item) {
    rec.flash = { tip: 'yanlis', t0: performance.now() };
    flashMaterial(rec, 0xff8a3a, 0.5);
    yuzenYazi(rec.group.position.clone().add(new THREE.Vector3(0, 1.8, 0)),
      'لَيْسَ فِي القَائِمَة', '#cc6a1a');
    window.SFX && window.SFX.yanlis();
    return;
  }
  if (item.mevcut >= item.gerekli) {
    rec.flash = { tip: 'yanlis', t0: performance.now() };
    flashMaterial(rec, 0xff8a3a, 0.4);
    yuzenYazi(rec.group.position.clone().add(new THREE.Vector3(0, 1.8, 0)),
      'يَكْفِي', '#cc6a1a');
    return;
  }
  // Sepete ekle
  item.mevcut++;
  State.toplamMevcut++;
  State.paraOdenen += item.fiyat;
  rec.flash = { tip: 'dogru', t0: performance.now() };
  flashMaterial(rec, 0x4cd66d, 0.6);
  window.SFX && window.SFX.dogru();
  // Arapça'sını söyle
  window.TTS && window.TTS.speakArabic(window.Data.KELIMELER[item.kid].ar);
  yuzenYazi(rec.group.position.clone().add(new THREE.Vector3(0, 1.8, 0)),
    '+' + arabicNum(1) + ' · ' + arabicNum(item.fiyat) + ' ﷼', '#1aaa3a');
  alisverisListeyiCiz();
  alisverisToplamGuncelle();

  // Tüm liste tamam mı?
  const tumTamam = State.liste.every(x => x.mevcut >= x.gerekli);
  if (tumTamam) {
    setTimeout(() => alisverisBitti(), 800);
  }
}

function alisverisBitti() {
  window.SFX && window.SFX.basari();
  const yuzde = 100;
  if (window.SCORM) {
    window.SCORM.setScore(yuzde, 100, 0);
    window.SCORM.setStatus('completed');
  }
  document.getElementById('sonuc-yuzde').textContent = arabicNum(State.paraOdenen);
  document.getElementById('sonuc-yuzde-isaret').textContent = ' ﷼';
  document.getElementById('sonuc-dogru').textContent = arabicNum(State.toplamMevcut);
  document.getElementById('sonuc-toplam').textContent = arabicNum(State.toplamGerekli);
  document.getElementById('sonuc-mesaj').textContent =
    'أَكْمَلْتَ التَّسَوُّق! دَفَعْتَ ' + arabicNum(State.paraOdenen) + ' ﷼. أَحْسَنْتَ! 🛒✨';
  document.getElementById('sonuc-basarili-buton').textContent = 'تَسَوُّق جَدِيد';
  document.getElementById('sonuc-basarili-buton').onclick = () => {
    document.getElementById('sonuc-modal').style.display = 'none';
    UI.alisverisBaslat();
  };
  document.getElementById('sonuc-modal').style.display = 'flex';
}

function flashMaterial(rec, color, intensity) {
  const c = new THREE.Color(color);
  for (const m of rec.originalMaterials) {
    if (m.mesh.material.emissive) {
      m.mesh.material.emissive.copy(c);
      m.mesh.material.emissiveIntensity = intensity;
    }
  }
}

function dogruTahmin(rec) {
  window.SFX && window.SFX.dogru();
  State.skor += 10;
  State.dogru++;
  updateHUD();
  if (window.SCORM) window.SCORM.setScore(Math.min(100, State.skor), 100, 0);
  // Yüzen "✓ tr" yazısı
  yuzenYazi(rec.group.position.clone().add(new THREE.Vector3(0, 1.8, 0)), '✓ ' + rec.kelime.ar, '#1aaa3a');
  if (State.modu === 'sinav') {
    setTimeout(() => sonrakiSoru(), 1100);
  } else {
    setTimeout(() => rasgeleHedef(), 900);
  }
}

function yanlisTahmin(rec) {
  window.SFX && window.SFX.yanlis();
  State.yanlis++;
  updateHUD();
  yuzenYazi(rec.group.position.clone().add(new THREE.Vector3(0, 1.8, 0)), 'حَاوِلْ ثَانِيَة', '#cc2a2a');
  if (State.modu === 'sinav') {
    setTimeout(() => sonrakiSoru(), 900);
  }
}

// Yüzen ekran üstü yazısı: 3D dünya konumunu 2D'ye projeksiyonla göster
function yuzenYazi(worldPos, text, color) {
  const el = document.createElement('div');
  el.className = 'yuzen-yazi';
  el.textContent = text;
  el.style.color = color;
  document.body.appendChild(el);

  const start = performance.now();
  const dur = 1200;
  function tick() {
    const t = performance.now() - start;
    if (t > dur) { el.remove(); return; }
    const p = t / dur;
    const v = worldPos.clone().project(State.camera);
    const rect = State.renderer.domElement.getBoundingClientRect();
    const x = (v.x * 0.5 + 0.5) * rect.width + rect.left;
    const y = (1 - (v.y * 0.5 + 0.5)) * rect.height + rect.top - p * 60;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.opacity = String(1 - p);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// === Sınav modu ===
function sinavBaslat() {
  State.modu = 'sinav';
  State.skor = 0;
  State.dogru = 0;
  State.yanlis = 0;

  const havuz = [];
  for (const sid of Object.keys(window.Data.SAHNELER)) {
    for (const kid of window.Data.SAHNELER[sid].kelimeler) {
      havuz.push({ kid, sid });
    }
  }
  karistir(havuz);
  State.kalanSorular = havuz.slice(0, 10);
  State.toplamSoru = State.kalanSorular.length;
  sonrakiSoru();
}

function sonrakiSoru() {
  if (!State.kalanSorular.length) {
    sinavBitir();
    return;
  }
  const next = State.kalanSorular.shift();
  const kelime = window.Data.KELIMELER[next.kid];
  sahneAc(next.sid, { skipNewTarget: true });
  State.hedefKelime = kelime;
  ipucuGoster();
  updateHUD();
}

function sinavBitir() {
  State.modu = 'oyun';
  const yuzde = Math.round((State.dogru / State.toplamSoru) * 100);
  window.SFX && window.SFX.basari();
  if (window.SCORM) {
    window.SCORM.setScore(yuzde, 100, 0);
    window.SCORM.setStatus(yuzde >= 60 ? 'passed' : 'failed');
  }
  document.getElementById('sonuc-yuzde').textContent = arabicNum(yuzde);
  document.getElementById('sonuc-yuzde-isaret').textContent = '٪';
  document.getElementById('sonuc-dogru').textContent = arabicNum(State.dogru);
  document.getElementById('sonuc-toplam').textContent = arabicNum(State.toplamSoru);
  document.getElementById('sonuc-mesaj').textContent =
    yuzde >= 90 ? 'رَائِع! أَحْسَنْتَ ✨' :
    yuzde >= 70 ? 'جَيِّد جِدًّا!' :
    yuzde >= 50 ? 'بِدَايَة جَيِّدَة' :
    'لا تَقْلَق، حَاوِلْ مَرَّةً أُخْرَى';
  document.getElementById('sonuc-basarili-buton').textContent = 'مَرَّةً أُخْرَى';
  document.getElementById('sonuc-basarili-buton').onclick = () => {
    document.getElementById('sonuc-modal').style.display = 'none';
    UI.sinavBaslat();
  };
  document.getElementById('sonuc-modal').style.display = 'flex';
}

function karistir(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// === Animasyon döngüsü ===
function animate() {
  requestAnimationFrame(animate);
  const dt = State.clock.getDelta();
  const t = State.clock.elapsedTime;

  // Bulutlar hafifçe sürüklensin
  for (const b of State.bulutlar) {
    b.position.x += dt * 0.3;
    if (b.position.x > 25) b.position.x = -25;
  }

  // Flash animasyonları sönsün
  for (const rec of State.nesneler) {
    if (rec.flash) {
      const age = (performance.now() - rec.flash.t0) / 800;
      if (age >= 1) {
        restoreMaterials(rec);
        rec.flash = null;
      } else {
        for (const m of rec.originalMaterials) {
          if (m.mesh.material.emissive) {
            m.mesh.material.emissiveIntensity = 0.6 * (1 - age);
          }
        }
      }
    }
    // Çok HAFİF ambient salınım — sahnede canlılık (her nesne için aynı amplitude, hedef değil)
    if (State.aktifSahne === 'hayvanlar') {
      // Hayvanlar nefes alıyor gibi
      const breath = Math.sin(t * 1.8 + rec.basRotY * 7) * 0.015;
      rec.group.position.y = rec.basY + breath;
    }
  }

  // İpucu halkası
  if (State.ipucuKalan > 0 && State.hedefKelime) {
    State.ipucuKalan -= dt;
    const hedef = State.nesneler.find(n => n.kelime.id === State.hedefKelime.id);
    if (hedef) {
      State.hedefRing.position.set(hedef.group.position.x, 0.05, hedef.group.position.z);
      const op = Math.min(0.8, State.ipucuKalan * 0.8);
      State.hedefRing.material.opacity = op + Math.sin(t * 6) * 0.1;
      State.hedefRing.scale.setScalar(1 + Math.sin(t * 3) * 0.1);
    }
    if (State.ipucuKalan <= 0) State.hedefRing.material.opacity = 0;
  } else {
    State.hedefRing.material.opacity = 0;
  }

  State.controls.update();
  State.renderer.render(State.scene, State.camera);
}

function updateHUD() {
  const s = document.getElementById('skor');
  const d = document.getElementById('dogru');
  const y = document.getElementById('yanlis');
  const sayac = document.getElementById('soru-sayac');
  if (s) s.textContent = arabicNum(State.skor);
  if (d) d.textContent = arabicNum(State.dogru);
  if (y) y.textContent = arabicNum(State.yanlis);
  if (sayac) {
    if (State.modu === 'sinav') {
      const kalan = State.kalanSorular.length;
      const cevaplanan = State.toplamSoru - kalan;
      sayac.textContent = arabicNum(cevaplanan + 1) + ' / ' + arabicNum(State.toplamSoru);
      sayac.style.display = '';
    } else {
      sayac.style.display = 'none';
    }
  }
}

// === UI köprüsü (HTML onclick'leri buradan çağırır) ===
const UI = {
  baslat(sahneId) {
    State.modu = 'oyun';
    State.skor = 0;
    State.dogru = 0;
    State.yanlis = 0;
    document.getElementById('menu-ekrani').style.display = 'none';
    document.getElementById('oyun-ekrani').style.display = 'block';
    document.getElementById('alisveris-paneli').style.display = 'none';
    document.getElementById('ipucu-karti').style.display = '';
    onResize();
    const sahne = window.Data.SAHNELER[sahneId];
    document.getElementById('sahne-baslik').textContent = sahne.ar;
    document.getElementById('soru-sayac').style.display = 'none';
    sahneAc(sahneId);
    updateHUD();
  },
  sinavBaslat() {
    document.getElementById('menu-ekrani').style.display = 'none';
    document.getElementById('oyun-ekrani').style.display = 'block';
    document.getElementById('alisveris-paneli').style.display = 'none';
    document.getElementById('ipucu-karti').style.display = '';
    onResize();
    document.getElementById('sahne-baslik').textContent = 'الاِخْتِبَار';
    sinavBaslat();
  },
  alisverisBaslat() {
    document.getElementById('menu-ekrani').style.display = 'none';
    document.getElementById('oyun-ekrani').style.display = 'block';
    onResize();
    document.getElementById('sahne-baslik').textContent = 'تَسَوُّق البَقَّال';
    document.getElementById('soru-sayac').style.display = 'none';
    sahneAc('manav', { skipNewTarget: true });
    alisverisBaslat();
  },
  menuyeDon() {
    document.getElementById('oyun-ekrani').style.display = 'none';
    document.getElementById('sonuc-modal').style.display = 'none';
    document.getElementById('alisveris-paneli').style.display = 'none';
    document.getElementById('ipucu-karti').style.display = '';
    document.getElementById('menu-ekrani').style.display = '';
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  },
  sesle() {
    if (State.hedefKelime) window.TTS && window.TTS.speakArabic(State.hedefKelime.ar);
  },
  ipucu() {
    State.ipucuKalan = 2.5;
  },
  kapatSonuc() {
    document.getElementById('sonuc-modal').style.display = 'none';
  }
};
window.UI = UI;

// === Başlat ===
window.addEventListener('load', function () {
  window.TTS && window.TTS.init();
  window.SCORM && window.SCORM.init();
  init();
});

// İlk dokunuşta AudioContext aç (autoplay politikası)
document.addEventListener('pointerdown', function once() {
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) { const c = new C(); c.resume && c.resume(); }
  } catch (e) {}
  document.removeEventListener('pointerdown', once);
}, { once: true });
