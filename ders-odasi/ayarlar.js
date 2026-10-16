/* Ders Odası — site ayarları
   Farklı cihazlar arasında canlı ders için Firebase Realtime Database ayarını buraya yapıştırın
   (Firebase konsolu → Proje ayarları → Web uygulaması → firebaseConfig). Bu bilgiler gizli değildir;
   erişimi firebase-kurallari.json'daki kurallar ve anonim giriş korur.
   Boş bırakılırsa canlı ders yalnızca aynı tarayıcıdaki sekmeler arasında çalışır. */
window.DO_AYAR = window.DO_AYAR || {
  // Firebase projesi: ders-odasi-raufenc (Realtime Database, europe-west1; anonim giriş)
  firebase: {
    apiKey: 'AIzaSyCr9eR9eEbLdc-KpTGdObr4wIE86K1eFM0',
    authDomain: 'ders-odasi-raufenc.firebaseapp.com',
    databaseURL: 'https://ders-odasi-raufenc-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'ders-odasi-raufenc',
    appId: '1:709827961383:web:13363254b232e87e1b6402'
  }
  /* Başka bir projeye geçmek için aynı alanları değiştirin. Örnek:
  firebase: {
    apiKey: 'AIza…',
    authDomain: 'proje-adi.firebaseapp.com',
    databaseURL: 'https://proje-adi-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'proje-adi',
    appId: '1:…:web:…'
  }
  */
};
