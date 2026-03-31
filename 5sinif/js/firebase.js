// ============================================================
//  Firebase Servisi — 5. Sınıf LMS  (360° Veli Takip + Gerçek Zamanlı)
//
//  Kurulum:
//   1. https://console.firebase.google.com/ → Yeni proje oluştur
//   2. Web uygulaması ekle → aşağıdaki config'i doldur
//   3. Authentication → E-posta/Şifre yöntemini etkinleştir
//   4. Firestore → Veritabanı oluştur (üretim modu)
//   5. Firestore → Kurallar sekmesine aşağıdaki güvenlik kurallarını yapıştır
//
//  Firestore Güvenlik Kuralları:
// ─────────────────────────────
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//
//     // Öğrenci kendi verisini okuyup yazabilir
//     match /users/{uid} {
//       allow read, write: if request.auth != null && request.auth.uid == uid;
//     }
//
//     // Veli kodu ile bağlantı: öğrenci veliCode oluşturursa
//     // veli o kodu bilerek /veli/{veliCode} altındaki öğrenci uid'sini okuyabilir
//     match /veliLinks/{veliCode} {
//       allow read: if request.auth != null;
//       allow write: if request.auth != null
//                    && request.resource.data.ogrenciUid == request.auth.uid;
//     }
//
//     // Veli, bağlı olduğu öğrencinin sadece belirli alanlarını okuyabilir
//     match /users/{uid} {
//       allow read: if request.auth != null
//                   && exists(/databases/$(database)/documents/veliLinks/$(request.auth.token.email))
//                   && get(/databases/$(database)/documents/veliLinks/$(request.auth.token.email)).data.ogrenciUid == uid;
//     }
//   }
// }
// ─────────────────────────────
// ============================================================

// TODO: Firebase konsolundan aldığınız gerçek değerleri buraya yazın
const FIREBASE_CONFIG = {
  apiKey:            "FIREBASE_API_KEY",
  authDomain:        "FIREBASE_PROJECT_ID.firebaseapp.com",
  projectId:         "FIREBASE_PROJECT_ID",
  storageBucket:     "FIREBASE_PROJECT_ID.appspot.com",
  messagingSenderId: "FIREBASE_SENDER_ID",
  appId:             "FIREBASE_APP_ID"
};

const FirebaseService = (() => {
  let _auth      = null;
  let _db        = null;
  let _syncTimer = null;
  let _ready     = false;
  let _veliListener  = null; // gerçek zamanlı veli dinleyicisi
  let _veliUnsubscribe = null;

  function _isConfigured() {
    return FIREBASE_CONFIG.apiKey !== 'FIREBASE_API_KEY';
  }

  function init() {
    if (_ready) return;
    if (!_isConfigured()) {
      console.info('[Firebase] Config girilmemiş — çevrimdışı mod aktif.');
      return;
    }
    if (typeof firebase === 'undefined') {
      console.warn('[Firebase] SDK yüklenemedi.');
      return;
    }
    try {
      if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      _auth = firebase.auth();
      _db   = firebase.firestore();
      _ready = true;
      _auth.languageCode = 'tr';

      _auth.onAuthStateChanged(user => {
        if (user) _onSignIn(user);
        else       _onSignOut();
      });
    } catch (err) {
      console.error('[Firebase] Başlatma hatası:', err);
    }
  }

  function isReady()      { return _ready; }
  function isConfigured() { return _isConfigured(); }

  // ——— Auth ———

  async function signInEmail(email, password) {
    if (!_ready) throw new Error('Firebase hazır değil');
    return _auth.signInWithEmailAndPassword(email, password);
  }

  async function signUpEmail(email, password, displayName) {
    if (!_ready) throw new Error('Firebase hazır değil');
    const cred = await _auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName });
    return cred;
  }

  async function signOut() {
    if (!_ready) return;
    stopVeliListener();
    await _auth.signOut();
    Store.logout();
  }

  function getCurrentUser() { return _auth?.currentUser || null; }

  // ——— Firestore: Öğrenci Verisi ———

  async function pushData(uid) {
    if (!_ready || !uid) return;
    try {
      const data = Store._load();
      await _db.collection('users').doc(uid).set(
        { ...data, _lastSync: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
    } catch (err) {
      console.error('[Firebase] Push hatası:', err);
    }
  }

  async function pullData(uid) {
    if (!_ready || !uid) return false;
    try {
      const doc = await _db.collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data();
        delete data._lastSync;
        Store._save(data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('[Firebase] Pull hatası:', err);
      return false;
    }
  }

  // Debounced sync — her Store yazmadan 2 sn sonra Firestore'a iter
  function scheduleSync() {
    const user = getCurrentUser();
    if (!user) return;
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(() => pushData(user.uid), 2000);
  }

  // ——— Firestore: Veli Gerçek Zamanlı Dinleyici ———

  /**
   * Veli için öğrencinin Firestore belgesini gerçek zamanlı dinler.
   * Veli paneli açıkken herhangi bir değişiklik (yeni cevap, ders tamamlama)
   * anında velinin ekranına yansır.
   *
   * @param {string} ogrenciUid  - Takip edilecek öğrencinin Firebase uid'si
   * @param {function} callback  - Yeni veri geldiğinde çağrılır: callback(data)
   */
  function startVeliListener(ogrenciUid, callback) {
    if (!_ready || !ogrenciUid) return;
    stopVeliListener();
    _veliUnsubscribe = _db.collection('users').doc(ogrenciUid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          delete data._lastSync;
          if (typeof callback === 'function') callback(data);
        }
      }, err => {
        console.error('[Firebase] Veli dinleyici hatası:', err);
      });
    console.info('[Firebase] Veli dinleyici başlatıldı:', ogrenciUid);
  }

  function stopVeliListener() {
    if (_veliUnsubscribe) {
      _veliUnsubscribe();
      _veliUnsubscribe = null;
    }
  }

  /**
   * Veli kodu oluşturur. Öğrenci bu kodu velisiyle paylaşır.
   * Veli bu kodu kullanarak öğrencinin ilerlemesini okuyabilir.
   * Kod: öğrenci email karmasından üretilir (deterministik, 8 hane).
   */
  async function generateVeliCode(uid, email) {
    if (!_ready) return null;
    try {
      const code = btoa(email).replace(/[^A-Z0-9]/gi, '').slice(0, 8).toUpperCase();
      await _db.collection('veliLinks').doc(code).set({
        ogrenciUid: uid,
        ogrenciEmail: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Store.set('veliCode', code);
      return code;
    } catch (err) {
      console.error('[Firebase] Veli kodu oluşturma hatası:', err);
      return null;
    }
  }

  /**
   * Veli kodu ile öğrencinin uid'sini çözer.
   * Sonra startVeliListener() ile dinlemeye başlanabilir.
   */
  async function resolveVeliCode(code) {
    if (!_ready) return null;
    try {
      const doc = await _db.collection('veliLinks').doc(code.toUpperCase()).get();
      if (doc.exists) return doc.data().ogrenciUid;
      return null;
    } catch (err) {
      console.error('[Firebase] Veli kodu çözme hatası:', err);
      return null;
    }
  }

  // ——— Internal ———

  function _onSignIn(user) {
    pullData(user.uid).then(() => {
      if (typeof window._onFirebaseSignIn === 'function') window._onFirebaseSignIn(user);
    });
  }

  function _onSignOut() {
    stopVeliListener();
    if (typeof window._onFirebaseSignOut === 'function') window._onFirebaseSignOut();
  }

  return {
    init, isReady, isConfigured,
    signInEmail, signUpEmail, signOut, getCurrentUser,
    pushData, pullData, scheduleSync,
    startVeliListener, stopVeliListener,
    generateVeliCode, resolveVeliCode,
  };
})();

window.FirebaseService = FirebaseService;
