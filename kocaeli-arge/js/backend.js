// Veri ve kimlik katmanı. Firebase yapılandırılmışsa CANLI mod (Firestore + Auth + FCM),
// aksi hâlde DEMO mod (örnek içerik + tarayıcı belleği). Görünümler bu arayüzü kullanır.
import { FIREBASE_CONFIG, VAPID_KEY, ADMIN_EMAILS, BASE_PATH, NOTIFICATION_TOPICS } from './config.js';
import { uid as newId } from './ui.js';

export const isLive = FIREBASE_CONFIG.apiKey !== 'FIREBASE_API_KEY' && !!FIREBASE_CONFIG.projectId && FIREBASE_CONFIG.projectId !== 'PROJE-ID';
const LS = (k, v) => {
  try {
    if (v === undefined) { const s = localStorage.getItem('arge.' + k); return s ? JSON.parse(s) : null; }
    localStorage.setItem('arge.' + k, JSON.stringify(v));
  } catch (_) { return null; }
};
const listeners = { content: new Set(), auth: new Set(), social: new Map() };
const emit = (set, ...a) => set.forEach(fn => { try { fn(...a); } catch (e) { console.error(e); } });

let seed = null;
let overrides = {};
let user = null;
let me = { begeniler: [], favoriler: [], okunan: [], anket: {}, bildirim: Object.fromEntries(NOTIFICATION_TOPICS.map(t => [t.key, true])), tema: 'auto' };
let fb = null; // { app, auth, db, messaging, fns }

export const store = {
  get content() { return mergeContent(); },
  get user() { return user; },
  get me() { return me; },
  get isAdmin() { return !!user && (user.rol === 'admin' || ADMIN_EMAILS.includes(user.eposta || '')); },
  onContent(fn) { listeners.content.add(fn); return () => listeners.content.delete(fn); },
  onAuth(fn) { listeners.auth.add(fn); return () => listeners.auth.delete(fn); },
};

function mergeContent() {
  const c = { ...(seed || {}) };
  for (const [k, v] of Object.entries(overrides || {})) if (v !== undefined && v !== null) c[k] = v;
  return c;
}

export async function init() {
  seed = await fetch(BASE_PATH + 'data/seed.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => ({}));
  const savedMe = LS('me'); if (savedMe) me = { ...me, ...savedMe };
  if (isLive) await initLive(); else initDemo();
}

// ───────────────────────── DEMO MOD ─────────────────────────
function initDemo() {
  overrides = LS('content') || {};
  user = LS('user');
  emit(listeners.auth, user);
  emit(listeners.content, mergeContent());
  window.addEventListener('storage', (e) => {
    if (e.key === 'arge.content') { overrides = LS('content') || {}; emit(listeners.content, mergeContent()); }
  });
}
function demoSocial() { return LS('social') || {}; }
function saveMe() { LS('me', me); if (isLive && user) fb.fns.setDoc(fb.fns.doc(fb.db, 'kullanicilar', user.uid), { begeniler: me.begeniler, favoriler: me.favoriler, bildirim: me.bildirim, tema: me.tema }, { merge: true }).catch(() => {}); }

// ───────────────────────── CANLI MOD ─────────────────────────
async function initLive() {
  const [appM, authM, fsM] = await Promise.all([
    import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'),
  ]);
  const app = appM.initializeApp(FIREBASE_CONFIG);
  const auth = authM.getAuth(app);
  const db = fsM.getFirestore(app);
  fb = { app, auth, db, authM, fns: fsM };
  try { await authM.setPersistence(auth, authM.browserLocalPersistence); } catch (_) {}
  // İçerik: icerik/{koleksiyon} belgeleri; items alanı dizi ise koleksiyon, değilse nesne.
  fsM.onSnapshot(fsM.collection(db, 'icerik'), (snap) => {
    const o = {};
    snap.forEach(d => { const data = d.data(); o[d.id] = Array.isArray(data.items) ? data.items : data; });
    overrides = o;
    emit(listeners.content, mergeContent());
  }, (e) => console.warn('[icerik]', e.message));
  authM.onAuthStateChanged(auth, async (u) => {
    if (!u) { user = null; emit(listeners.auth, null); return; }
    const ref = fsM.doc(db, 'kullanicilar', u.uid);
    let data = {};
    try { data = (await fsM.getDoc(ref)).data() || {}; } catch (_) {}
    user = { uid: u.uid, ad: data.ad || u.displayName || 'Öğretmen', eposta: u.email || '', foto: u.photoURL || '', brans: data.brans || '', okul: data.okul || '', ilce: data.ilce || '', rol: data.rol || (ADMIN_EMAILS.includes(u.email) ? 'admin' : 'ogretmen'), tur: 'google' };
    me = { ...me, begeniler: data.begeniler || me.begeniler, favoriler: data.favoriler || me.favoriler, bildirim: data.bildirim || me.bildirim, tema: data.tema || me.tema };
    LS('me', me);
    fsM.setDoc(ref, { ad: user.ad, eposta: user.eposta, foto: user.foto, sonGiris: fsM.serverTimestamp() }, { merge: true }).catch(() => {});
    emit(listeners.auth, user);
  });
}

// ───────────────────────── KİMLİK ─────────────────────────
export const auth = {
  async signInGoogle() {
    if (!isLive) throw new Error('demo');
    const provider = new fb.authM.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try { await fb.authM.signInWithPopup(fb.auth, provider); }
    catch (e) {
      if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/cancelled-popup-request'].includes(e.code)) await fb.authM.signInWithRedirect(fb.auth, provider);
      else throw e;
    }
  },
  async signInDemo(ad = 'Demo Öğretmen') {
    user = { uid: 'demo-' + (LS('demoUid') || newId()), ad, eposta: '', foto: '', brans: 'Sınıf Öğretmenliği', okul: '', ilce: 'İzmit', rol: 'ogretmen', tur: 'demo' };
    LS('demoUid', user.uid.slice(5)); LS('user', user);
    emit(listeners.auth, user);
  },
  async signOut() {
    if (isLive && fb?.auth?.currentUser) await fb.authM.signOut(fb.auth);
    user = null; LS('user', null);
    emit(listeners.auth, null);
  },
  async updateProfile(patch) {
    if (!user) return;
    user = { ...user, ...patch };
    if (isLive) await fb.fns.setDoc(fb.fns.doc(fb.db, 'kullanicilar', user.uid), patch, { merge: true });
    else LS('user', user);
    emit(listeners.auth, user);
  },
};

// ───────────────────────── İÇERİK YAZMA (yönetici) ─────────────────────────
export const admin = {
  async save(collection, value) {
    if (isLive) {
      const data = Array.isArray(value) ? { items: value, guncelleme: fb.fns.serverTimestamp() } : { ...value, guncelleme: fb.fns.serverTimestamp() };
      await fb.fns.setDoc(fb.fns.doc(fb.db, 'icerik', collection), data);
    } else {
      overrides = { ...overrides, [collection]: value };
      LS('content', overrides);
      emit(listeners.content, mergeContent());
    }
  },
  async reset() {
    if (isLive) return;
    overrides = {}; LS('content', null); LS('social', null); LS('anket', null);
    emit(listeners.content, mergeContent());
  },
  async uploadFile(file, folder = 'dosyalar') {
    if (!isLive) {
      return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res({ url: r.result, ad: file.name, boyut: file.size, demo: true }); r.onerror = rej; r.readAsDataURL(file); });
    }
    const st = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js');
    const storage = st.getStorage(fb.app);
    const safe = file.name.replace(/[^\w.\-çğıöşüÇĞİÖŞÜ]+/g, '_');
    const ref = st.ref(storage, `${folder}/${Date.now()}_${safe}`);
    await st.uploadBytes(ref, file, { contentType: file.type });
    return { url: await st.getDownloadURL(ref), ad: file.name, boyut: file.size };
  },
};

// ───────────────────────── SOSYAL ─────────────────────────
const sessionViewed = new Set();
export const social = {
  async get(id) {
    const liked = me.begeniler.includes(id), fav = me.favoriler.includes(id);
    if (isLive) {
      try { const d = (await fb.fns.getDoc(fb.fns.doc(fb.db, 'sosyal', id))).data() || {}; return { begeni: d.begeni || 0, goruntulenme: d.goruntulenme || 0, yorum: d.yorum || 0, liked, fav }; }
      catch (_) { return { begeni: 0, goruntulenme: 0, yorum: 0, liked, fav }; }
    }
    const s = demoSocial()[id] || {};
    return { begeni: s.begeni || 0, goruntulenme: s.goruntulenme || 0, yorum: (s.yorumlar || []).length, liked, fav };
  },
  subscribe(id, fn) {
    if (!isLive) { fn(); const h = (e) => { if (e.key === 'arge.social') fn(); }; window.addEventListener('storage', h); return () => window.removeEventListener('storage', h); }
    return fb.fns.onSnapshot(fb.fns.doc(fb.db, 'sosyal', id), () => fn(), () => {});
  },
  async view(id) {
    if (sessionViewed.has(id)) return; sessionViewed.add(id);
    if (isLive) { await fb.fns.setDoc(fb.fns.doc(fb.db, 'sosyal', id), { goruntulenme: fb.fns.increment(1) }, { merge: true }).catch(() => {}); return; }
    const all = demoSocial(); const s = all[id] = all[id] || {}; s.goruntulenme = (s.goruntulenme || 0) + (s.goruntulenme ? 1 : 1 + Math.floor(Math.random() * 40) + 12); LS('social', all);
  },
  async like(id) {
    const on = !me.begeniler.includes(id);
    me.begeniler = on ? [...me.begeniler, id] : me.begeniler.filter(x => x !== id); saveMe();
    if (isLive) await fb.fns.setDoc(fb.fns.doc(fb.db, 'sosyal', id), { begeni: fb.fns.increment(on ? 1 : -1) }, { merge: true }).catch(() => {});
    else { const all = demoSocial(); const s = all[id] = all[id] || {}; s.begeni = Math.max(0, (s.begeni || 0) + (on ? 1 : -1)); LS('social', all); }
    return on;
  },
  async fav(id) {
    const on = !me.favoriler.includes(id);
    me.favoriler = on ? [...me.favoriler, id] : me.favoriler.filter(x => x !== id); saveMe();
    return on;
  },
  async comments(id) {
    if (isLive) {
      const q = fb.fns.query(fb.fns.collection(fb.db, 'sosyal', id, 'yorumlar'), fb.fns.orderBy('tarih', 'desc'), fb.fns.limit(50));
      const snap = await fb.fns.getDocs(q).catch(() => null);
      return snap ? snap.docs.map(d => ({ id: d.id, ...d.data(), tarih: d.data().tarih?.toDate?.() || new Date() })) : [];
    }
    return ((demoSocial()[id] || {}).yorumlar || []).slice().reverse();
  },
  async addComment(id, metin) {
    if (!user) throw new Error('login');
    const y = { uid: user.uid, ad: user.ad, foto: user.foto || '', metin: String(metin).trim().slice(0, 600), tarih: new Date() };
    if (!y.metin) return;
    if (isLive) {
      await fb.fns.addDoc(fb.fns.collection(fb.db, 'sosyal', id, 'yorumlar'), { ...y, tarih: fb.fns.serverTimestamp() });
      await fb.fns.setDoc(fb.fns.doc(fb.db, 'sosyal', id), { yorum: fb.fns.increment(1) }, { merge: true });
    } else { const all = demoSocial(); const s = all[id] = all[id] || {}; (s.yorumlar = s.yorumlar || []).push({ ...y, id: newId() }); LS('social', all); }
  },
  async deleteComment(id, yid) {
    if (isLive) { await fb.fns.deleteDoc(fb.fns.doc(fb.db, 'sosyal', id, 'yorumlar', yid)); await fb.fns.setDoc(fb.fns.doc(fb.db, 'sosyal', id), { yorum: fb.fns.increment(-1) }, { merge: true }); }
    else { const all = demoSocial(); const s = all[id]; if (s) { s.yorumlar = (s.yorumlar || []).filter(y => y.id !== yid); LS('social', all); } }
  },
};

// ───────────────────────── ANKET ─────────────────────────
export const anket = {
  cevapladi(id) { return !!me.anket[id]; },
  async submit(a, cevaplar) {
    if (!user) throw new Error('login');
    me.anket[a.id] = { tarih: new Date().toISOString() }; saveMe();
    const inc = {};
    for (const [sid, val] of Object.entries(cevaplar)) {
      const vals = Array.isArray(val) ? val : [val];
      for (const v of vals) { if (v === '' || v == null) continue; inc[sid] = inc[sid] || {}; inc[sid][String(v).slice(0, 80)] = (inc[sid][String(v).slice(0, 80)] || 0) + 1; }
    }
    if (isLive) {
      const F = fb.fns;
      await F.setDoc(F.doc(fb.db, 'anketCevaplari', `${a.id}_${user.uid}`), { anketId: a.id, uid: user.uid, cevaplar, tarih: F.serverTimestamp() });
      const sayim = {};
      for (const [sid, m] of Object.entries(inc)) { sayim[sid] = {}; for (const [k, n] of Object.entries(m)) sayim[sid][k] = F.increment(n); }
      await F.setDoc(F.doc(fb.db, 'anketSonuc', a.id), { sayim, katilim: F.increment(1) }, { merge: true });
    } else {
      const all = LS('anket') || {}; const s = all[a.id] = all[a.id] || { sayim: {}, katilim: 0 };
      for (const [sid, m] of Object.entries(inc)) { s.sayim[sid] = s.sayim[sid] || {}; for (const [k, n] of Object.entries(m)) s.sayim[sid][k] = (s.sayim[sid][k] || 0) + n; }
      s.katilim++; LS('anket', all);
    }
  },
  async sonuc(a) {
    let s = null;
    if (isLive) { try { s = (await fb.fns.getDoc(fb.fns.doc(fb.db, 'anketSonuc', a.id))).data(); } catch (_) {} }
    else s = (LS('anket') || {})[a.id];
    const base = a.ornekSonuc ? { sayim: a.ornekSonuc, katilim: a.katilim || 0 } : { sayim: {}, katilim: 0 };
    if (!s) return base;
    const out = { sayim: {}, katilim: (base.katilim || 0) + (s.katilim || 0) };
    for (const sid of new Set([...Object.keys(base.sayim), ...Object.keys(s.sayim || {})])) {
      out.sayim[sid] = { ...(base.sayim[sid] || {}) };
      for (const [k, n] of Object.entries(s.sayim?.[sid] || {})) out.sayim[sid][k] = (out.sayim[sid][k] || 0) + n;
    }
    return out;
  },
};

// ───────────────────────── BİLDİRİM ─────────────────────────
export const bildirim = {
  list() {
    const items = (mergeContent().bildirimler || []).slice().sort((a, b) => String(b.tarih).localeCompare(String(a.tarih)));
    return items.map(n => ({ ...n, okundu: me.okunan.includes(n.id) }));
  },
  unread() { return bildirim.list().filter(n => !n.okundu && me.bildirim[n.konu] !== false).length; },
  read(id) { if (!me.okunan.includes(id)) { me.okunan = [...me.okunan, id].slice(-300); saveMe(); } },
  readAll() { me.okunan = bildirim.list().map(n => n.id); saveMe(); },
  setPref(key, on) { me.bildirim = { ...me.bildirim, [key]: on }; saveMe(); push.syncTopics().catch(() => {}); },
  setTheme(t) { me.tema = t; saveMe(); },
  async send(n) { // yönetici: uygulama içi bildirim kaydı
    const list = mergeContent().bildirimler || [];
    await admin.save('bildirimler', [{ id: newId(), tarih: new Date().toISOString(), ...n }, ...list].slice(0, 200));
  },
};

export const push = {
  supported: () => isLive && 'Notification' in window && 'serviceWorker' in navigator && !!VAPID_KEY,
  async enable() {
    if (!push.supported()) throw new Error('unsupported');
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') throw new Error('denied');
    const msgM = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js');
    const messaging = msgM.getMessaging(fb.app);
    const reg = await navigator.serviceWorker.ready;
    const token = await msgM.getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: reg });
    LS('pushToken', token);
    await push.syncTopics();
    msgM.onMessage(messaging, (p) => { const n = p.notification || {}; import('./ui.js').then(u => u.toast(`${n.title || 'Bildirim'}: ${n.body || ''}`, 5000)); });
    return token;
  },
  async syncTopics() {
    const token = LS('pushToken'); if (!token || !isLive) return;
    const topics = Object.entries(me.bildirim).filter(([, v]) => v).map(([k]) => k);
    await fb.fns.setDoc(fb.fns.doc(fb.db, 'pushTokens', token), { token, uid: user?.uid || null, topics, tarih: fb.fns.serverTimestamp() });
  },
  enabled: () => !!LS('pushToken'),
};
