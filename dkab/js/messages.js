// ===== DKAB Akademi - 360° Gelisim Zihniyeti Mesaj Bankasi =====

/**
 * Kategorize edilmis motivasyon mesajlari
 * "Hata yapmak ogrenmenin parcasidir" gibi gelisim odakli dil kullanilir
 */

const MESSAGES = {
    // Yanlis cevap sonrasi tesvik
    wrongAnswer: [
        'Her yanlis cevap, dogru cevaba bir adim daha yaklastirir.',
        'Hata yapmak ogrenmenin en degerli parcasidir. Tekrar dene!',
        'Henuz bilmiyorsun, ama ogreneceksin. Bu kesin!',
        'En buyuk alimler bile yanilarak ogrenirler. Devam et!',
        'Bu soru zormus. Ama sen daha da zorlarina hazirssin!',
        'Dogru cevabi simdi ogrendin. Bir dahaki sefere bileceksin.',
        'Yanilmak zayiflik degil, ogrenme firsatidir.',
        'Sabir, ilmin anahtaridir. Bir daha deneyelim.',
        'Basarinin sirri, her dususte kalkmaktir.',
        'Bu sefer olmadi ama bir sonrakinde olacak!'
    ],

    // Dogru cevap kutlamasi
    correctAnswer: [
        'Harika! Bilgini gosterdin!',
        'Dogru cevap! Tebrikler!',
        'Mukemmel! Devam et!',
        'Aferin! Bu konuya hakimsin!',
        'Bilgi ile aydinlanirssin. Harika gidiyorsun!',
        'Cok guzel! Her dogru cevap seni ilerletiyor.'
    ],

    // Seri motivasyonu
    streak: {
        start: 'Bugun de bir ders yaparak serini baslat!',
        day3: 'Ucs gundur duraksiz devam ediyorsun! Maasallah!',
        day7: 'Bir haftalik seri! Azmin takdire sayan!',
        day14: 'Iki hafta ust uste! Ogrenme artik bir aliskanligin oldu!',
        day30: 'Otuz gunluk seri! Gercek bir ogrenme savaacisi!',
        broken: 'Serin bitti ama sorun degil. Bugun yeni bir baslangicc yap!'
    },

    // Bolum tamamlama kutlamasi
    chapterComplete: [
        'Bolumu basariyla tamamladin! Her adim seni ileriye goturur.',
        'Bir bolum daha tamamlandi! Ogrenme yolculugun devam ediyor.',
        'Harika is cikardin! Bilgine bilgi katiyor, devam et!',
        'Tebrikler! Bu bilgilerle hayatina deger katiorsun.',
        'Bir bolum daha gectin! Ilim yolunda emin adimlarla ilerliyorsun.'
    ],

    // Unite tamamlama
    unitComplete: [
        'Butun bir uniteyi tamamladin! Bu buyuk bir basari!',
        'Unite bitti! Bilgi dagarcgin genislemeye devam ediyor.',
        'Maasallah! Bu uniteyi basariyla bitirdin. Hazir misin yenisine?'
    ],

    // Zorluk ani destegi (takildiginda)
    struggle: [
        'Zor gorunuyor ama her zor konu, sabir ve tekrarla kolaylasir.',
        'Yavas yavas ilerlemek, yerinde saymaktan iyidir. Devam et!',
        'Bu konu herkes icin zor. Pes etme, sen basarabilirsin!',
        'Hatirla: "Sabir acinin ilaci, ilim cehaletin." Devam et!',
        'Biraz mola ver, sonra taze bir zihinle don. Bu da bir yontem!'
    ],

    // Gunluk motivasyon (ana sayfa)
    daily: [
        'Bugun yeni bir sey ogrenmek icin harika bir gun!',
        'Her gun bir adim. Kucuk adimlar buyuk yolculuklara donusur.',
        'Ilim ogrenmek her Muslumana farzdir. Haydi baslayalim!',
        'Bugun zihnine ne ekeceksin? Ogrenmeye hazir misin?',
        'Bilgi isiktir. Bugun biraz daha aydinlan!',
        'Ogrenmenin yasi yoktur. Bugun de devam!',
        'Merak, ogrenmenin en guzel yakitidir. Neye meraklisin?'
    ],

    // Uzun sure inaktif (3+ gun)
    comeback: [
        'Seni ozledik! Haydi bir ders ile doneliim!',
        'Biraz ara vermissin. Sorun degil, bugun yeniden baslayabiliriz!',
        'Geri dondugun icin harika! Ogrenme seni bekliyor.',
        'Ara verdikten sonra donmek cesaret ister. Tebrikler!'
    ],

    // Rozet kazanma
    badgeEarned: [
        'Yeni bir rozet kazandin! Basarilarin gozle gorulur hale geliyor!',
        'Tebrikler! Bu rozet senin emeginle geldi!',
        'Bir rozet daha! Koleksiyonun buyuyor!'
    ]
};

/**
 * Belirli bir kategoriden rastgele mesaj dondurur
 */
export function getMessage(category) {
    const msgs = MESSAGES[category];
    if (!msgs) return '';
    if (Array.isArray(msgs)) {
        return msgs[Math.floor(Math.random() * msgs.length)];
    }
    return msgs;
}

/**
 * Seri durumuna gore motivasyon mesaji dondurur
 */
export function getStreakMessage(streakDays) {
    if (streakDays >= 30) return MESSAGES.streak.day30;
    if (streakDays >= 14) return MESSAGES.streak.day14;
    if (streakDays >= 7) return MESSAGES.streak.day7;
    if (streakDays >= 3) return MESSAGES.streak.day3;
    if (streakDays === 0) return MESSAGES.streak.broken;
    return MESSAGES.streak.start;
}

/**
 * Gunluk motivasyon mesaji (deterministik - gune gore)
 */
export function getDailyMessage() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return MESSAGES.daily[dayOfYear % MESSAGES.daily.length];
}

/**
 * Inaktiflik durumuna gore geri donus mesaji
 */
export function getComebackMessage(daysSinceLastActive) {
    if (daysSinceLastActive >= 3) {
        return MESSAGES.comeback[Math.floor(Math.random() * MESSAGES.comeback.length)];
    }
    return null;
}

export { MESSAGES };
