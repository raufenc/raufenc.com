// ===== DKAB Akademi - Firebase Konfigürasyonu =====
// Proje: dkab-review (raufenc@gmail.com)
// RTDB: https://dkab-review-f8552-default-rtdb.firebaseio.com

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAhbpVIeFlzc8VM-KcJL-BUiklH7u2st9Q",
    authDomain: "dkab-review-f8552.firebaseapp.com",
    databaseURL: "https://dkab-review-f8552-default-rtdb.firebaseio.com",
    projectId: "dkab-review-f8552",
    storageBucket: "dkab-review-f8552.firebasestorage.app",
    messagingSenderId: "664426174738",
    appId: "1:664426174738:web:d0cdd4fcd0f097aa22fbcb"
};

// Firebase CDN SDK (compat modunda — npm gerektirmez)
let _db = null;

export async function getDB() {
    if (_db) return _db;

    // SDK yüklü değilse dinamik olarak yükle
    if (!window.firebase) {
        await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
        await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js');
    }

    if (!window.firebase.apps.length) {
        window.firebase.initializeApp(FIREBASE_CONFIG);
    }

    _db = window.firebase.database();
    return _db;
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

// Sınıf kodu üret (6 büyük harf)
export function generateClassCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// RTDB path helpers
export const DB_PATHS = {
    classroom: (code) => `classrooms/${code}`,
    leaderboard: (code) => `classrooms/${code}/leaderboard`,
    member: (code, userId) => `classrooms/${code}/leaderboard/${userId}`,
    wall: (code) => `classrooms/${code}/wall`,
    challenges: (code) => `classrooms/${code}/challenges`,
    meta: (code) => `classrooms/${code}/meta`,
};
