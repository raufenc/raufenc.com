// ===== DKAB Akademi - Faz 4: Hicri Takvim Detay Sayfasi =====
// Ozel gunler, kandiller, ay bilgileri, sinifla iliskilendirme

import { store } from '../store.js?v=7';

// Hicri aylar ve ozel gunler (kapsamli veri)
const HICRI_AYLAR = [
    {
        ad: 'Muharrem', sira: 1, renk: '#1a5276', ikon: '&#127769;',
        bilgi: 'Islam takviminin ilk ayidir. Hz. Huseyinin sehit edildigi Kerbela vakasi bu ayda gerceklesti.',
        ozelGunler: [
            { gun: 1, ad: 'Hicri Yilbasi', aciklama: 'Islam takviminin baslangiic gunu. Hz. Muhammed\'in Mekke\'den Medine\'ye hicretini aniyoruz.', tip: 'bayram' },
            { gun: 10, ad: 'Asure Gunu', aciklama: 'Hz. Nuh\'un tufandan kurtuldugu, Hz. Musa\'nin denizi gectigi rivayet edilen mukaddes gun.', tip: 'ozel' }
        ],
        dkabBaglanti: 'Hicret, Islam tarihinin donnum noktasidir.'
    },
    {
        ad: 'Safer', sira: 2, renk: '#6c3483', ikon: '&#127775;',
        bilgi: 'Cahiliye doneminde ugursuz sayilan ama Islam\'da boyle bir inanc olmayan aydir.',
        ozelGunler: [],
        dkabBaglanti: 'Islam\'da ugursuzluk inanci yoktur.'
    },
    {
        ad: 'Rebiulevvel', sira: 3, renk: '#1e8449', ikon: '&#127800;',
        bilgi: 'Peygamber Efendimiz sallallahu aleyhi ve sellemin dogdugu ve vefat ettigi aydir.',
        ozelGunler: [
            { gun: 12, ad: 'Mevlid Kandili', aciklama: 'Peygamber Efendimiz sallallahu aleyhi ve sellemin dogumunu anma gecesi.', tip: 'kandil' }
        ],
        dkabBaglanti: 'Peygamberimizin hayati ve ornekligi.'
    },
    {
        ad: 'Rebiulahir', sira: 4, renk: '#2874a6', ikon: '&#127807;',
        bilgi: 'Bahar aylinin ikincisi anlmamina gelen bu ay, huzur ve sukunet ayidir.',
        ozelGunler: [],
        dkabBaglanti: 'Tabiatın canlanisi ve Yaratici\'ya sukur.'
    },
    {
        ad: 'Cemaziyelevvel', sira: 5, renk: '#a04000', ikon: '&#127774;',
        bilgi: 'Yogun sicaklarin basladigi donem anlamina gelir.',
        ozelGunler: [],
        dkabBaglanti: 'Sabir ve metanet.'
    },
    {
        ad: 'Cemaziyelahir', sira: 6, renk: '#7d6608', ikon: '&#127773;',
        bilgi: 'Siceagin sona erdigi donem.',
        ozelGunler: [],
        dkabBaglanti: 'Doganin degisimi ve tefekkur.'
    },
    {
        ad: 'Recep', sira: 7, renk: '#1a5276', ikon: '&#11088;',
        bilgi: 'Uc Aylar\'in ilkidir. Haram aylardan biridir. Regaib ve Mirac geceleri bu aydadir.',
        ozelGunler: [
            { gun: -1, ad: 'Regaib Kandili', aciklama: 'Recep ayinin ilk Cuma gecesi. "Regaib" bol hediye, ihsan demektir.', tip: 'kandil' },
            { gun: 27, ad: 'Mirac Kandili', aciklama: 'Peygamber Efendimiz sallallahu aleyhi ve sellemin goklere yukseldigi, bes vakit namazin farz kılindigi gece.', tip: 'kandil' }
        ],
        dkabBaglanti: 'Mirac olayii ve namazin onemi. Uc Aylarin baslangici.'
    },
    {
        ad: 'Saban', sira: 8, renk: '#196f3d', ikon: '&#127773;',
        bilgi: 'Uc Aylar\'in ikincisidir. Berat Kandili bu aydadir. Ramazan\'a hazirlik ayidir.',
        ozelGunler: [
            { gun: 15, ad: 'Berat Kandili', aciklama: 'Kur\'an-i Kerim\'in dunya semasina indirildigi, kulllarin bagislandigi gece.', tip: 'kandil' }
        ],
        dkabBaglanti: 'Berat gecesi ve Ramazan\'a hazirlik.'
    },
    {
        ad: 'Ramazan', sira: 9, renk: '#b7950b', ikon: '&#127769;',
        bilgi: 'Oruc ayi. Kur\'an-i Kerim bu ayda indirilmistir. Kadir Gecesi bu aydadir.',
        ozelGunler: [
            { gun: 27, ad: 'Kadir Gecesi', aciklama: 'Kur\'an-i Kerim\'in indirilmeye baslandigi, "bin aydan hayirli" olan muba rek gece.', tip: 'kandil' }
        ],
        dkabBaglanti: 'Oruc ibadeti, Kur\'an-i Kerim\'in onemi, Ramazan adabi.'
    },
    {
        ad: 'Sevval', sira: 10, renk: '#a93226', ikon: '&#127881;',
        bilgi: 'Ramazan Bayrami bu ayin basinda kutlanir.',
        ozelGunler: [
            { gun: 1, ad: 'Ramazan Bayrami', aciklama: 'Uc gun suren Ramazan (Fitr) Bayrami. Paylasma ve kardeslik bayrami.', tip: 'bayram' }
        ],
        dkabBaglanti: 'Bayram adabi, paylasma, zekat ve fitre.'
    },
    {
        ad: 'Zilkade', sira: 11, renk: '#5b2c6f', ikon: '&#128336;',
        bilgi: 'Haram aylardan biridir. Hac hazirlik donemidir.',
        ozelGunler: [],
        dkabBaglanti: 'Hac ibadeti ve hazirlik.'
    },
    {
        ad: 'Zilhicce', sira: 12, renk: '#7b241c', ikon: '&#128171;',
        bilgi: 'Hac ayi. Kurban Bayrami bu aydadir. Haram aylardan biridir.',
        ozelGunler: [
            { gun: 9, ad: 'Arefe Gunu', aciklama: 'Hac ibadetiinin en onemli ruknu olan Arafat vakfesinin yapildigi gun.', tip: 'ozel' },
            { gun: 10, ad: 'Kurban Bayrami', aciklama: 'Dort gun suren Kurban Bayrami. Hz. Ibrahim\'in teslimiyetini animsatan bayram.', tip: 'bayram' }
        ],
        dkabBaglanti: 'Hac ibadeti, kurban, teslimiyet ve fedakarlik.'
    }
];

// Yaklaşık Hicri-Miladi dönüşüm (basit)
function getApproxHicriMonth() {
    // Hicri takvim her yil ~11 gun kayar
    // 2024 Ramazan = 11 Mart ~ 9 Nisan
    // Bu yaklaşık bir hesaptır
    const now = new Date();
    const refDate = new Date(2024, 2, 11); // 2024 Ramazan 1
    const refHicriMonth = 9; // Ramazan
    const daysSinceRef = Math.floor((now - refDate) / 86400000);
    const hicriDaysSince = daysSinceRef * (354.37 / 365.25);
    const monthsSince = hicriDaysSince / 29.53;
    let currentMonth = Math.floor((refHicriMonth - 1 + monthsSince) % 12);
    if (currentMonth < 0) currentMonth += 12;
    return currentMonth; // 0-indexed
}

export function renderHicriTakvim(el, app) {
    const user = store.user;
    if (!user) { window.location.hash = '#/sinif-sec'; return; }

    const currentHicriIdx = getApproxHicriMonth();
    const currentAy = HICRI_AYLAR[currentHicriIdx];

    // Tum kandiller ve ozel gunler
    const tumOzelGunler = HICRI_AYLAR.flatMap(ay =>
        ay.ozelGunler.map(g => ({ ...g, ay: ay.ad, ayRenk: ay.renk }))
    );

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <h1 class="font-display">&#128197; Hicri Takvim</h1>
                <p class="text-muted">Islam takvimi, ozel gunler ve kandiller</p>
            </div>

            <!-- Su anki Hicri Ay -->
            <div class="card anim-fade-in-up mt-lg" style="padding:2rem; background:linear-gradient(135deg, ${currentAy.renk}11, ${currentAy.renk}22); border-left:5px solid ${currentAy.renk};">
                <div style="display:flex; align-items:center; gap:1rem;">
                    <span style="font-size:3rem;">${currentAy.ikon}</span>
                    <div>
                        <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.1em; color:${currentAy.renk}; font-weight:600;">Su An</div>
                        <h2 style="margin:0; color:${currentAy.renk};">${currentAy.ad}</h2>
                        <p class="text-muted" style="margin-top:4px;">${currentAy.bilgi}</p>
                    </div>
                </div>
                ${currentAy.ozelGunler.length > 0 ? `
                    <div class="mt-md" style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                        ${currentAy.ozelGunler.map(g => `
                            <span style="padding:0.35rem 0.75rem; border-radius:20px; font-size:0.8rem; font-weight:500; background:${g.tip === 'kandil' ? '#ffeaa7' : g.tip === 'bayram' ? '#81ecec' : '#dfe6e9'}; color:#2d3436;">
                                ${g.tip === 'kandil' ? '&#128367;' : g.tip === 'bayram' ? '&#127881;' : '&#11088;'} ${g.ad}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                <p class="mt-md" style="font-size:0.85rem; color:var(--text-secondary);"><strong>DKAB Baglanti:</strong> ${currentAy.dkabBaglanti}</p>
            </div>

            <!-- Kandiller ve Ozel Gunler Ozeti -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#128367; Kandiller ve Ozel Gunler</h3>
                <div class="special-days mt-md" style="display:flex; flex-direction:column; gap:0.75rem;">
                    ${tumOzelGunler.map(g => `
                        <div style="display:flex; align-items:center; gap:1rem; padding:0.75rem 1rem; border-radius:10px; background:var(--bg-secondary);">
                            <span style="font-size:1.5rem;">${g.tip === 'kandil' ? '&#128367;' : g.tip === 'bayram' ? '&#127881;' : '&#11088;'}</span>
                            <div style="flex:1;">
                                <div style="font-weight:600;">${g.ad}</div>
                                <div class="text-muted" style="font-size:0.8rem;">${g.ay} &middot; ${g.aciklama.substring(0, 80)}...</div>
                            </div>
                            <span style="padding:0.2rem 0.5rem; border-radius:12px; font-size:0.7rem; font-weight:500; background:${g.ayRenk}22; color:${g.ayRenk};">${g.ay}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 12 Ay Grid -->
            <div class="card anim-fade-in-up mt-xl" style="padding:1.5rem;">
                <h3>&#128197; 12 Hicri Ay</h3>
                <div class="hicri-grid mt-md" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:1rem;">
                    ${HICRI_AYLAR.map((ay, i) => `
                        <div class="card ${i === currentHicriIdx ? 'hicri-current' : ''}" style="padding:1rem; ${i === currentHicriIdx ? 'border:2px solid ' + ay.renk + '; box-shadow:0 0 12px ' + ay.renk + '22;' : ''}">
                            <div style="display:flex; align-items:center; gap:0.75rem;">
                                <span style="font-size:1.5rem;">${ay.ikon}</span>
                                <div>
                                    <div style="font-weight:600; color:${ay.renk};">${ay.sira}. ${ay.ad}</div>
                                    <div class="text-muted" style="font-size:0.75rem;">${ay.ozelGunler.length > 0 ? ay.ozelGunler.map(g => g.ad).join(', ') : 'Ozel gun yok'}</div>
                                </div>
                            </div>
                            <p class="text-muted" style="font-size:0.8rem; margin-top:0.5rem;">${ay.bilgi.substring(0, 100)}${ay.bilgi.length > 100 ? '...' : ''}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Uc Aylar Baneri -->
            <div class="card anim-fade-in-up mt-xl" style="padding:2rem; background:linear-gradient(135deg, #1a5276, #196f3d, #b7950b); color:white; text-align:center;">
                <h3 style="color:white;">&#127769; Uc Aylar</h3>
                <p style="opacity:0.9; margin-top:0.5rem;">Recep, Saban ve Ramazan — manevi arinma ve ibadet yogunlugu donemi</p>
                <div class="mt-lg" style="display:flex; justify-content:center; gap:2rem; flex-wrap:wrap;">
                    <div>
                        <div style="font-size:2rem;">&#11088;</div>
                        <div style="font-weight:600;">Recep</div>
                        <div style="font-size:0.8rem; opacity:0.8;">Regaib + Mirac</div>
                    </div>
                    <div>
                        <div style="font-size:2rem;">&#127773;</div>
                        <div style="font-weight:600;">Saban</div>
                        <div style="font-size:0.8rem; opacity:0.8;">Berat Kandili</div>
                    </div>
                    <div>
                        <div style="font-size:2rem;">&#127769;</div>
                        <div style="font-weight:600;">Ramazan</div>
                        <div style="font-size:0.8rem; opacity:0.8;">Kadir Gecesi</div>
                    </div>
                </div>
            </div>
        </div>`;
}
