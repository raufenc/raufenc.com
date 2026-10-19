// ============================================================
//  Kocaeli MEM AR-GE Portalı — yapılandırma
//
//  CANLI MOD için (Firebase):
//   1. console.firebase.google.com → yeni proje (ör. "kocaeli-arge")
//   2. Web uygulaması ekle → config'i FIREBASE_CONFIG'e yapıştır
//   3. Authentication → Google yöntemini etkinleştir; yetkili alan adlarına raufenc.com ekle
//   4. Firestore → veritabanı oluştur (europe-west) → firestore.rules dosyasını yapıştır
//   5. Storage → başlat → storage.rules dosyasını yapıştır
//   6. Cloud Messaging → Web Push sertifikası (VAPID) → VAPID_KEY'e yapıştır
//   7. ADMIN_EMAILS listesine yönetici Google hesaplarını yaz (Firestore'da admins/{email} de oluşturulur)
//  Config girilmezse uygulama DEMO modunda çalışır (tarayıcı belleği + örnek içerik).
// ============================================================
export const APP_VERSION = '1.2.0';
export const APP_NAME = 'Kocaeli MEM AR-GE Portalı';
export const BASE_PATH = '/kocaeli-arge/';

export const FIREBASE_CONFIG = {
  apiKey: 'FIREBASE_API_KEY',
  authDomain: 'PROJE-ID.firebaseapp.com',
  projectId: 'PROJE-ID',
  storageBucket: 'PROJE-ID.firebasestorage.app',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:0000000000000000',
};
export const VAPID_KEY = '';
export const ADMIN_EMAILS = ['halatmedya@gmail.com'];
export const DEMO_PIN = '4141'; // Demo modunda yönetici paneli PIN'i

export const YT_CHANNELS = [
  { id: 'UCL15RFYGVnpVVoSeTeZXWTA', ad: 'Kocaeli MEM TV',               kisa: 'Kocaeli MEM', renk: '#E72737' },
  { id: 'UC5pivY9xQEn-vWwCW4Okhzw', ad: 'T.C. Millî Eğitim Bakanlığı',  kisa: 'MEB',         renk: '#0F2A4A' },
  { id: 'UCCTccDv6cXvwl1-SzfF83Vg', ad: 'EBA',                          kisa: 'EBA',         renk: '#1B7F5A' },
];

export const FEED_SOURCES = [
  { key: 'kocaeli', ad: 'Kocaeli İl MEM' },
  { key: 'arge',    ad: 'Kocaeli AR-GE' },
  { key: 'meb',     ad: 'MEB' },
];

export const NOTIFICATION_TOPICS = [
  { key: 'duyuru',   ad: 'Duyurular' },
  { key: 'haber',    ad: 'Haberler' },
  { key: 'etkinlik', ad: 'Etkinlikler' },
  { key: 'canli',    ad: 'Canlı yayınlar' },
];

export const API = {
  feed: '/api/arge-feed',
  asistan: '/api/arge-asistan',
  bildirim: '/api/arge-bildirim',
};
