// ============================================================
//  Firebase Servisi — 5. Sınıf LMS
//  Kurulum: https://console.firebase.google.com/
//  Yeni proje oluştur → Web uygulaması ekle → config'i buraya yapıştır
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

// Firestore Güvenlik Kuralları (Firebase konsoluna yapıştırın):
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{uid} {
//       allow read, write: if request.auth != null && request.auth.uid == uid;
//     }
//   }
// }

const FirebaseService = (() => {
  let _auth = null;
  let _db = null;
  let _syncTimer = null;
  let _ready = false;

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

      // Dil Türkçe
      _auth.languageCode = 'tr';

      _auth.onAuthStateChanged(user => {
        if (user) {
          _onSignIn(user);
        } else {
          _onSignOut();
        }
      });
    } catch (err) {
      console.error('[Firebase] Başlatma hatası:', err);
    }
  }

  function isReady() { return _ready; }

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
    await _auth.signOut();
    Store.logout();
  }

  function getCurrentUser() {
    return _auth?.currentUser || null;
  }

  // ——— Firestore Sync ———

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

  // Debounced sync — her Store yazmadan 2 sn sonra
  function scheduleSync() {
    const user = getCurrentUser();
    if (!user) return;
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(() => pushData(user.uid), 2000);
  }

  function _onSignIn(user) {
    pullData(user.uid).then(() => {
      if (typeof window._onFirebaseSignIn === 'function') window._onFirebaseSignIn(user);
    });
  }

  function _onSignOut() {
    if (typeof window._onFirebaseSignOut === 'function') window._onFirebaseSignOut();
  }

  return { init, isReady, isConfigured: _isConfigured, signInEmail, signUpEmail, signOut, getCurrentUser, pushData, pullData, scheduleSync };
})();

window.FirebaseService = FirebaseService;
