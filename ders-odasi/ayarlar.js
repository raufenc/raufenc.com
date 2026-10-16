/* Ders Odası — site ayarları
   Farklı cihazlar arasında canlı ders için Firebase Realtime Database ayarını buraya yapıştırın
   (Firebase konsolu → Proje ayarları → Web uygulaması → firebaseConfig). Bu bilgiler gizli değildir;
   erişimi firebase-kurallari.json'daki kurallar ve anonim giriş korur.
   Boş bırakılırsa canlı ders yalnızca aynı tarayıcıdaki sekmeler arasında çalışır. */
window.DO_AYAR = window.DO_AYAR || {
  firebase: null
  /* Örnek:
  firebase: {
    apiKey: 'AIza…',
    authDomain: 'proje-adi.firebaseapp.com',
    databaseURL: 'https://proje-adi-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'proje-adi',
    appId: '1:…:web:…'
  }
  */
};
