// ===== DKAB Akademi - Bolum Gorunumu =====

import { store } from '../store.js?v=7';
import { getGradeInfo } from '../data-loader.js?v=7';
import { showConfetti, showXpPopup, playSound } from './effects.js?v=7';

// Helper: navigate back to chapter view
function backToChapter(data) {
    window.location.hash = '#/sinif/' + data.grade + '/unite/' + data.unitId.replace('U','') + '/bolum/' + data.chapterId;
}

export function renderChapterView(el, data, app) {
    const { grade, unitId, chapterId, chapter, unit, games, questions, conceptCard, prayers, coverage, visuals } = data;
    const gradeInfo = getGradeInfo(grade);

    // Determine available tabs
    const tabs = [];
    if (conceptCard) tabs.push({ id: 'lesson', label: 'Ders', icon: '&#128218;' });
    if (games.length > 0) tabs.push({ id: 'games', label: 'Oyunlar', icon: '&#127922;' });
    if (questions.length > 0) tabs.push({ id: 'quiz', label: 'Quiz', icon: '&#127919;' });
    if (prayers && prayers.length > 0) {
        tabs.push({ id: 'dua', label: 'Dua / Sure', icon: '&#128588;' });
    }

    if (tabs.length === 0) {
        tabs.push({ id: 'lesson', label: 'Ders', icon: '&#128218;' });
    }

    el.innerHTML = `
        <div class="content-area">
            <!-- Chapter Header -->
            <div class="chapter-header anim-fade-in-up">
                <div class="chapter-header-top">
                    <button class="btn-icon" onclick="window.location.hash='#/'" style="color:var(--text-secondary);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <div class="chapter-header-info">
                        <span class="text-muted" style="font-size:0.8rem;">${unit?.baslik || ''}</span>
                        <h2 class="font-display" style="font-size:1.4rem;">${chapter.baslik}</h2>
                    </div>
                </div>

                <!-- TTS + Tab bar -->
                <div class="flex items-center justify-between mt-md" style="gap: 0.5rem; flex-wrap: wrap;">
                    <div class="tab-bar" style="flex: 1; min-width: 0;">
                        ${tabs.map((t, i) => `
                            <button class="tab-btn ${i === 0 ? 'active' : ''}" data-tab="${t.id}">
                                <span>${t.icon}</span>
                                <span>${t.label}</span>
                            </button>
                        `).join('')}
                    </div>
                    ${window.speechSynthesis ? `
                    <button id="btn-tts" class="btn btn-sm" style="flex-shrink:0; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-secondary); font-size:0.8rem; padding: 0.4rem 0.75rem; border-radius: 20px;">
                        &#128362; Sesli Oku
                    </button>
                    ` : ''}
                </div>
            </div>

            <!-- Tab Content -->
            <div class="tab-content mt-lg" id="tab-content">
                ${renderTabContent(tabs[0]?.id, data)}
            </div>
        </div>`;

    // Bind tab switching
    el.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            el.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tabContent = el.querySelector('#tab-content');
            tabContent.innerHTML = renderTabContent(btn.dataset.tab, data);
            tabContent.classList.add('anim-fade-in');

            // Bind quiz if needed
            if (btn.dataset.tab === 'quiz') {
                initQuiz(el, data, app);
            }
            if (btn.dataset.tab === 'games') {
                initGames(el, data, app);
            }
            if (btn.dataset.tab === 'dua') {
                initAudioPlayers(el);
            }
        });
    });

    // Init first tab if quiz/games/dua
    if (tabs[0]?.id === 'quiz') {
        initQuiz(el, data, app);
    }
    if (tabs[0]?.id === 'games') {
        initGames(el, data, app);
    }
    if (tabs[0]?.id === 'dua') {
        initAudioPlayers(el);
    }

    // TTS button
    initTTS(el, data);
}

function initTTS(el, data) {
    const btn = el.querySelector('#btn-tts');
    if (!btn || !window.speechSynthesis) return;

    const ozet = data.conceptCard?.ozet || '';
    if (!ozet) { btn.style.display = 'none'; return; }

    let utterance = null;
    let speaking = false;

    btn.addEventListener('click', () => {
        if (speaking) {
            window.speechSynthesis.cancel();
            speaking = false;
            btn.innerHTML = '&#128362; Sesli Oku';
            btn.classList.remove('active');
            return;
        }

        utterance = new SpeechSynthesisUtterance(ozet);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.9;

        // Prefer a Turkish voice if available
        const voices = window.speechSynthesis.getVoices();
        const trVoice = voices.find(v => v.lang.startsWith('tr'));
        if (trVoice) utterance.voice = trVoice;

        utterance.onend = () => {
            speaking = false;
            btn.innerHTML = '&#128362; Sesli Oku';
            btn.classList.remove('active');
        };
        utterance.onerror = () => {
            speaking = false;
            btn.innerHTML = '&#128362; Sesli Oku';
            btn.classList.remove('active');
        };

        window.speechSynthesis.speak(utterance);
        speaking = true;
        btn.innerHTML = '&#9646;&#9646; Durdur';
        btn.classList.add('active');
    });
}

function renderTabContent(tabId, data) {
    switch (tabId) {
        case 'lesson': return renderLesson(data);
        case 'games': return renderGames(data);
        case 'quiz': return renderQuiz(data);
        case 'dua': return renderDua(data);
        default: return '<p class="text-muted">Icerik bulunamadi.</p>';
    }
}

// ===== LESSON TAB =====
function renderLesson(data) {
    const { conceptCard, coverage, visuals } = data;
    if (!conceptCard) {
        return `<div class="card text-center" style="padding: 2rem;">
            <p class="text-muted">Bu bolum icin icerik henuz hazir degil.</p>
        </div>`;
    }

    const terms = conceptCard.ilgili_terimler || [];
    const chapterVisuals = visuals || [];

    // Find hero visual (first sahne type, or first available)
    const heroVisual = chapterVisuals.find(v => v.tur === 'sahne') || chapterVisuals[0];

    return `
        <div class="lesson-content anim-fade-in-up">
            <!-- Hero Visual -->
            ${heroVisual?.dosya_yolu ? `
            <div class="chapter-hero-img anim-fade-in" style="margin-bottom: 1.5rem; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <img src="${heroVisual.dosya_yolu}" alt="${heroVisual.sahne_aciklamasi_tr || ''}"
                     style="width: 100%; height: auto; display: block; max-height: 360px; object-fit: cover;"
                     loading="lazy">
                ${heroVisual.sahne_aciklamasi_tr ? `<p style="padding: 0.75rem 1rem; font-size: 0.85rem; color: var(--text-secondary); background: var(--bg-main); margin: 0;">${heroVisual.sahne_aciklamasi_tr}</p>` : ''}
            </div>
            ` : ''}

            <!-- Summary Card -->
            <div class="card" style="padding: 1.5rem;">
                <h3 style="margin-bottom: 0.75rem;">&#128218; Konu Ozeti</h3>
                <p style="line-height: 1.8; color: var(--text-secondary);">${conceptCard.ozet || ""}</p>
            </div>

            <!-- Key Terms -->
            ${terms.length > 0 ? `
            <div class="card mt-lg" style="padding: 1.5rem;">
                <h3 style="margin-bottom: 0.75rem;">&#128273; Anahtar Kavramlar</h3>
                <div class="terms-cloud">
                    ${terms.map(t => `<span class="term-chip">${t}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Additional Visuals Gallery -->
            ${chapterVisuals.length > 1 ? `
            <div class="card mt-lg" style="padding: 1.5rem;">
                <h3 style="margin-bottom: 0.75rem;">&#127912; Gorseller</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    ${chapterVisuals.filter(v => v !== heroVisual).map(v => v.dosya_yolu ? `
                    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); cursor: pointer;" onclick="this.querySelector('img').style.maxHeight = this.querySelector('img').style.maxHeight === 'none' ? '180px' : 'none'">
                        <img src="${v.dosya_yolu}" alt="${v.sahne_aciklamasi_tr || ''}"
                             style="width: 100%; max-height: 180px; object-fit: cover; display: block; transition: max-height 0.3s;"
                             loading="lazy">
                        ${v.sahne_aciklamasi_tr ? `<p style="padding: 0.5rem; font-size: 0.75rem; color: var(--text-secondary); margin: 0;">${v.sahne_aciklamasi_tr}</p>` : ''}
                    </div>
                    ` : '').join('')}
                </div>
            </div>
            ` : ''}

            <!-- Learning Outcomes -->
            ${coverage?.kazanimlar ? `
            <div class="card mt-lg" style="padding: 1.5rem;">
                <h3 style="margin-bottom: 0.75rem;">&#127919; Kazanimlar</h3>
                <ul class="outcomes-list">
                    ${coverage.kazanimlar.map(k => `<li>${k}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>`;
}

// ===== GAMES TAB =====
function renderGames(data) {
    const { games } = data;
    if (!games || games.length === 0) {
        return '<div class="card text-center" style="padding: 2rem;"><p class="text-muted">Bu bolum icin oyun bulunamadi.</p></div>';
    }

    return `
        <div class="games-grid stagger">
            ${games.map((game, i) => `
                <div class="game-card card card-interactive anim-fade-in-up" data-game-index="${i}">
                    <div class="game-card-icon">${getEngineIcon(game.motor_id)}</div>
                    <div class="game-card-info">
                        <h4>${game.baslik}</h4>
                        <p class="text-muted" style="font-size:0.8rem;">${game.motor_adi}</p>
                    </div>
                    <button class="btn btn-primary btn-sm game-play-btn" data-game-index="${i}">Oyna</button>
                </div>
            `).join('')}
        </div>`;
}

function initGames(el, data, app) {
    el.querySelectorAll('.game-play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.gameIndex);
            const game = data.games[idx];
            if (game) {
                launchGame(el.querySelector('#tab-content'), game, data, app);
            }
        });
    });
}

function launchGame(container, game, data, app) {
    const motorId = game.motor_id;

    // Route to appropriate engine
    switch (motorId) {
        case 'E02': // Terim Kartlari (Flashcard)
            renderFlashcardGame(container, game, data, app);
            break;
        case 'E03': // Eslestirme
            renderMatchingGame(container, game, data, app);
            break;
        case 'E06': // Dogru-Yanlis
            renderTrueFalseGame(container, game, data, app);
            break;
        case 'E19': // Coktan Secmeli
            renderMiniQuiz(container, game, data, app);
            break;
        case 'E07': // Bosluk Doldurma
            renderFillBlankGame(container, game, data, app);
            break;
        case 'E01': // Hizli On Tarama
            renderMiniQuiz(container, game, data, app);
            break;
        case 'E09': // Sesli Takip - use flashcard style
        case 'E10': // Anlam Esleme - use flashcard style
        case 'E23': // Spiral Tekrar
            renderFlashcardGame(container, game, data, app);
            break;
        case 'E11': // Adim Siralama
            renderOrderingGame(container, game, data, app);
            break;
        case 'E21': // Oz Degerlendirme
            renderChecklistGame(container, game, data, app);
            break;
        case 'E13': // Sebep-Sonuc Zinciri
            renderCauseEffectGame(container, game, data, app);
            break;
        case 'E14': // Zaman Cizgisi
            renderTimelineGame(container, game, data, app);
            break;
        case 'E15': // Karakter-Rol Eslestirme
            renderCharacterRoleGame(container, game, data, app);
            break;
        case 'E16': // Mesaj Avi
            renderMessageHuntGame(container, game, data, app);
            break;
        case 'E17': // Karsilastirma Matrisi
            renderComparisonGame(container, game, data, app);
            break;
        case 'E18': // Siniflandirma Sepeti
            renderClassificationGame(container, game, data, app);
            break;
        case 'E20': // Acik Uclu Dusunce Kutusu
            renderOpenEndedGame(container, game, data, app);
            break;
        case 'E22': // Performans Gorevi
            renderPerformanceTask(container, game, data, app);
            break;
        default:
            renderGenericGame(container, game, data, app);
    }
}

// ===== FLASHCARD ENGINE (E02, E23) =====
function renderFlashcardGame(container, game, data, app) {
    store.trackEngine(game.motor_id);
    // Handle multiple data formats: kartlar (objects), ciftler, or terimler (could be strings or objects)
    let items = game.veri?.kartlar || game.veri?.ciftler || game.veri?.satirlar || [];
    // If terimler exists and kartlar doesn't, try to use it
    if (items.length === 0 && game.veri?.terimler) {
        const t = game.veri.terimler;
        if (typeof t[0] === 'string' && game.veri?.tanimlar) {
            // Parallel arrays: terimler[] + tanimlar[]
            items = t.map((terim, i) => ({ terim, tanim: game.veri.tanimlar[i] || '' }));
        } else if (typeof t[0] === 'object') {
            items = t;
        } else {
            items = t.map(terim => ({ terim, tanim: '' }));
        }
    }
    if (items.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p class="text-muted">Kart verisi bulunamadi.</p></div>';
        return;
    }

    let currentIndex = 0;
    let flipped = false;

    function render() {
        const item = items[currentIndex];
        const front = item.terim || item.on || item.baslik || item.arapca || item.soru || 'Terim';
        const back = item.tanim || item.arka || item.aciklama || item.okunusu || item.anlam || item.cevap || 'Tanim';

        container.innerHTML = `
            <div class="flashcard-container anim-scale-in">
                <div class="flashcard-progress text-muted mb-md">
                    ${currentIndex + 1} / ${items.length}
                </div>
                <div class="flashcard ${flipped ? 'flipped' : ''}" id="flashcard">
                    <div class="flashcard-front">
                        <span class="flashcard-text font-display">${front}</span>
                        <p class="text-muted mt-md" style="font-size:0.85rem;">Cevirmek icin tikla</p>
                    </div>
                    <div class="flashcard-back">
                        <span class="flashcard-text">${back}</span>
                    </div>
                </div>
                <div class="flashcard-actions mt-lg">
                    <button class="btn btn-secondary btn-sm" id="fc-prev" ${currentIndex === 0 ? 'disabled' : ''}>&#8592; Onceki</button>
                    <button class="btn btn-primary btn-sm" id="fc-next">${currentIndex === items.length - 1 ? 'Bitir' : 'Sonraki &#8594;'}</button>
                </div>
            </div>`;

        container.querySelector('#flashcard').addEventListener('click', () => {
            flipped = !flipped;
            container.querySelector('#flashcard').classList.toggle('flipped');
        });

        container.querySelector('#fc-prev')?.addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; flipped = false; render(); }
        });

        container.querySelector('#fc-next')?.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                flipped = false;
                render();
            } else {
                // Complete
                const xp = 15;
                const result = store.completeChapter(data.grade, data.unitId, data.chapterId, xp, 2);
                if (result.xpGained > 0) showXpPopup(result.xpGained);
                playSound('complete');
                container.innerHTML = `
                    <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                        <span style="font-size:3rem;">&#128218;</span>
                        <h2 class="mt-md">Kartlar Tamamlandi!</h2>
                        <p class="text-muted mt-sm">${items.length} kart incelendi</p>
                        ${result.xpGained > 0 ? `<p class="xp-display mt-lg" style="font-size:1.3rem;">+${result.xpGained} XP</p>` : ''}
                        <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/sinif/${data.grade}/unite/${data.unitId.replace('U','')}/bolum/${data.chapterId}'">Devam Et</button>
                    </div>`;
            }
        });
    }

    render();
}

// ===== MATCHING ENGINE (E03) =====
function renderMatchingGame(container, game, data, app) {
    store.trackEngine('E03');
    // Support multiple formats: ciftler, eslesmeler, eslestirmeler, terimler+tanimlar
    const rawPairs = game.veri?.ciftler || game.veri?.eslesmeler || game.veri?.eslestirmeler || game.veri?.eslesme || [];
    const pairs = rawPairs.length > 0
        ? rawPairs.map(c => ({
            term: c.terim || c.on || c.baslik || '',
            def: c.tanim || c.arka || c.aciklama || ''
        }))
        : (game.veri?.terimler?.map((t, i) => ({
            term: typeof t === 'string' ? t : (t.terim || t.baslik || ''),
            def: game.veri?.tanimlar?.[i] || (typeof t === 'object' ? (t.tanim || t.aciklama || '') : '')
        })) || []);

    if (pairs.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p class="text-muted">Eslestirme verisi bulunamadi.</p></div>';
        return;
    }

    const shuffledDefs = [...pairs].sort(() => Math.random() - 0.5);
    let selectedTerm = null;
    let matched = new Set();

    function render() {
        container.innerHTML = `
            <div class="matching-container anim-fade-in-up">
                <h3 class="mb-md">&#128279; Eslesenleri Bul</h3>
                <p class="text-muted mb-lg">Sol taraftan bir terim, sag taraftan tanimini sec.</p>
                <div class="matching-grid">
                    <div class="matching-col">
                        ${pairs.map((p, i) => `
                            <button class="matching-item term-item ${matched.has(i) ? 'matched' : ''} ${selectedTerm === i ? 'selected' : ''}"
                                    data-index="${i}" ${matched.has(i) ? 'disabled' : ''}>
                                ${p.term}
                            </button>
                        `).join('')}
                    </div>
                    <div class="matching-col">
                        ${shuffledDefs.map((p, i) => `
                            <button class="matching-item def-item ${matched.has(pairs.indexOf(p)) ? 'matched' : ''}"
                                    data-orig-index="${pairs.indexOf(p)}" ${matched.has(pairs.indexOf(p)) ? 'disabled' : ''}>
                                ${p.def}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="matching-score mt-md text-muted">
                    ${matched.size} / ${pairs.length} eslesti
                </div>
            </div>`;

        // Bind term clicks
        container.querySelectorAll('.term-item').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.term-item').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedTerm = parseInt(btn.dataset.index);
            });
        });

        // Bind def clicks
        container.querySelectorAll('.def-item').forEach(btn => {
            btn.addEventListener('click', () => {
                if (selectedTerm === null) return;
                const origIndex = parseInt(btn.dataset.origIndex);
                if (origIndex === selectedTerm) {
                    matched.add(selectedTerm);
                    playSound('correct');
                    selectedTerm = null;
                    if (matched.size === pairs.length) {
                        const xp = 20;
                        store.completeChapter(data.grade, data.unitId, data.chapterId, xp, 3);
                        showConfetti();
                        showXpPopup(xp);
                        playSound('complete');
                    }
                    render();
                } else {
                    btn.classList.add('answer-wrong');
                    playSound('wrong');
                    setTimeout(() => btn.classList.remove('answer-wrong'), 600);
                }
            });
        });
    }

    render();
}

// ===== TRUE/FALSE ENGINE (E06) =====
function renderTrueFalseGame(container, game, data, app) {
    store.trackEngine('E06');
    const items = game.veri?.sorular || game.veri?.ifadeler || game.veri?.soru_seti || [];
    if (items.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p class="text-muted">Soru verisi bulunamadi.</p></div>';
        return;
    }

    let current = 0;
    let correct = 0;

    function render() {
        if (current >= items.length) {
            const stars = correct === items.length ? 3 : correct >= items.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars === 3) showConfetti();
            showXpPopup(xp);
            playSound('complete');

            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding: 2rem;">
                    <span style="font-size: 3rem;">${stars === 3 ? '&#127942;' : stars === 2 ? '&#11088;' : '&#128170;'}</span>
                    <h2 class="mt-md">${stars === 3 ? 'Mukemmel!' : stars === 2 ? 'Cok iyi!' : 'Iyi baslangiC!'}</h2>
                    <p class="text-muted mt-sm">${correct} / ${items.length} dogru</p>
                    <div class="stars mt-md" style="font-size:2rem; justify-content:center;">
                        ${'&#11088;'.repeat(stars)}${'&#9734;'.repeat(3 - stars)}
                    </div>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
            return;
        }

        const item = items[current];
        const statement = item.ifade || item.soru || item.metin || '';
        const answer = item.dogru_mu !== undefined ? item.dogru_mu : (item.dogru_cevap !== undefined ? item.dogru_cevap : item.cevap);
        const isTrue = answer === true || answer === 'Dogru' || answer === 'dogru' || answer === 'D';

        container.innerHTML = `
            <div class="tf-container anim-fade-in-up">
                <div class="tf-progress text-muted mb-md">${current + 1} / ${items.length}</div>
                <div class="progress-bar mb-lg" style="height:4px;">
                    <div class="fill" style="width:${(current / items.length) * 100}%"></div>
                </div>
                <div class="card" style="padding: 2rem; text-align:center; min-height: 120px; display:flex; align-items:center; justify-content:center;">
                    <p style="font-size: 1.1rem; line-height: 1.6;">${statement}</p>
                </div>
                <div class="tf-buttons mt-xl" style="display:flex; gap:1rem;">
                    <button class="btn btn-lg" id="btn-true" style="flex:1; background:#e8f8ee; color:#1a7a3a; border: 2px solid #4ECB71; font-weight:700;">
                        &#10004; Dogru
                    </button>
                    <button class="btn btn-lg" id="btn-false" style="flex:1; background:#fde8e8; color:#c0392b; border: 2px solid #E74C3C; font-weight:700;">
                        &#10008; Yanlis
                    </button>
                </div>
            </div>`;

        const checkAnswer = (userAnswer) => {
            if (userAnswer === isTrue) {
                correct++;
                playSound('correct');
            } else {
                playSound('wrong');
            }
            current++;
            setTimeout(() => render(), 400);
        };

        container.querySelector('#btn-true').addEventListener('click', () => checkAnswer(true));
        container.querySelector('#btn-false').addEventListener('click', () => checkAnswer(false));
    }

    render();
}

// ===== MINI QUIZ (E01, E19) =====
function renderMiniQuiz(container, game, data, app) {
    store.trackEngine(game.motor_id || 'E19');
    let items = game.veri?.sorular || game.veri?.soru_seti || [];
    // Handle flat single-question format (grade 10/11): {soru, secenekler, dogru_cevap}
    if (items.length === 0 && game.veri?.soru && game.veri?.secenekler) {
        items = [{ soru: game.veri.soru, secenekler: game.veri.secenekler, dogru_cevap: game.veri.dogru_cevap, aciklama: game.veri.aciklama }];
    }
    if (items.length === 0) {
        container.innerHTML = '<div class="card text-center" style="padding:2rem;"><p class="text-muted">Quiz verisi bulunamadi.</p></div>';
        return;
    }

    let current = 0;
    let correct = 0;

    function render() {
        if (current >= items.length) {
            const stars = correct === items.length ? 3 : correct >= items.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars === 3) showConfetti();
            showXpPopup(xp);
            playSound('complete');

            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding: 2rem;">
                    <span style="font-size: 3rem;">${stars === 3 ? '&#127942;' : '&#11088;'}</span>
                    <h2 class="mt-md">${correct} / ${items.length} Dogru</h2>
                    <div class="stars mt-md" style="font-size:2rem; justify-content:center;">${'&#11088;'.repeat(stars)}${'&#9734;'.repeat(3 - stars)}</div>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
            return;
        }

        const q = items[current];
        const question = q.soru || q.soru_metni || q.metin || '';
        const options = q.secenekler || [];
        const correctAnswer = q.dogru_cevap || q.dogru || '';

        container.innerHTML = `
            <div class="mini-quiz anim-fade-in-up">
                <div class="progress-bar mb-md" style="height:4px;">
                    <div class="fill" style="width:${(current / items.length) * 100}%"></div>
                </div>
                <p class="text-muted mb-md">${current + 1} / ${items.length}</p>
                <div class="card" style="padding:1.5rem;">
                    <p style="font-size:1.05rem; line-height:1.6;">${question}</p>
                </div>
                <div class="quiz-options mt-lg">
                    ${options.map((opt, i) => `
                        <button class="quiz-option" data-index="${i}" data-value="${typeof opt === 'string' ? opt.charAt(0) : i}">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>`;

        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.value;
                const isCorrect = val === correctAnswer || btn.textContent.trim().startsWith(correctAnswer);
                if (isCorrect) {
                    btn.classList.add('answer-correct');
                    correct++;
                    playSound('correct');
                } else {
                    btn.classList.add('answer-wrong');
                    playSound('wrong');
                    // Show correct
                    container.querySelectorAll('.quiz-option').forEach(b => {
                        if (b.textContent.trim().startsWith(correctAnswer)) {
                            b.classList.add('answer-correct');
                        }
                    });
                }
                // Disable all
                container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
                current++;
                setTimeout(() => render(), 1000);
            });
        });
    }

    render();
}

// ===== ORDERING ENGINE (E11) =====
function renderOrderingGame(container, game, data, app) {
    store.trackEngine('E11');
    const steps = game.veri?.adimlar || [];
    if (steps.length === 0) {
        renderGenericGame(container, game, data, app);
        return;
    }

    // Shuffle for the game
    const shuffled = [...steps].sort(() => Math.random() - 0.5);
    let userOrder = [...shuffled];

    function render() {
        container.innerHTML = `
            <div class="ordering-container anim-fade-in-up">
                <h3 class="mb-md">&#128290; Dogru Sirayla Dizle</h3>
                <p class="text-muted mb-lg">${game.hedef || 'Adimlari dogru siraya koy.'}</p>
                <div class="ordering-list">
                    ${userOrder.map((step, i) => {
                        const label = typeof step === 'string' ? step : (step.baslik || step.metin || step.adim || JSON.stringify(step));
                        return `
                        <div class="ordering-item card" draggable="false" data-index="${i}">
                            <span class="ordering-num">${i + 1}</span>
                            <span class="ordering-text">${label}</span>
                            <div class="ordering-btns">
                                <button class="btn btn-sm btn-secondary order-up" data-index="${i}" ${i === 0 ? 'disabled' : ''}>&#9650;</button>
                                <button class="btn btn-sm btn-secondary order-down" data-index="${i}" ${i === userOrder.length - 1 ? 'disabled' : ''}>&#9660;</button>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
                <button class="btn btn-primary btn-lg w-full mt-xl" id="check-order">Kontrol Et</button>
            </div>`;

        container.querySelectorAll('.order-up').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (idx > 0) {
                    [userOrder[idx], userOrder[idx - 1]] = [userOrder[idx - 1], userOrder[idx]];
                    render();
                }
            });
        });

        container.querySelectorAll('.order-down').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (idx < userOrder.length - 1) {
                    [userOrder[idx], userOrder[idx + 1]] = [userOrder[idx + 1], userOrder[idx]];
                    render();
                }
            });
        });

        container.querySelector('#check-order')?.addEventListener('click', () => {
            let correct = 0;
            userOrder.forEach((item, i) => {
                if (JSON.stringify(item) === JSON.stringify(steps[i])) correct++;
            });
            const stars = correct === steps.length ? 3 : correct >= steps.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars >= 2) showConfetti();
            showXpPopup(xp);
            playSound(stars === 3 ? 'complete' : 'correct');

            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">${stars === 3 ? '&#127942;' : '&#11088;'}</span>
                    <h2 class="mt-md">${correct} / ${steps.length} Dogru Siralama</h2>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
        });
    }

    render();
}

// ===== CHECKLIST ENGINE (E21) =====
function renderChecklistGame(container, game, data, app) {
    store.trackEngine('E21');
    const items = game.veri?.maddeler || [];
    if (items.length === 0) {
        renderGenericGame(container, game, data, app);
        return;
    }

    const checked = new Set();

    function render() {
        container.innerHTML = `
            <div class="checklist-container anim-fade-in-up">
                <h3 class="mb-md">&#9745; Oz Degerlendirme</h3>
                <p class="text-muted mb-lg">${game.hedef || 'Asagidaki maddeleri degerlendirin.'}</p>
                <div class="checklist-items">
                    ${items.map((item, i) => {
                        const label = typeof item === 'string' ? item : (item.madde || item.metin || JSON.stringify(item));
                        return `
                        <label class="checklist-item card ${checked.has(i) ? 'checked' : ''}">
                            <input type="checkbox" ${checked.has(i) ? 'checked' : ''} data-index="${i}">
                            <span class="checklist-check">${checked.has(i) ? '&#9745;' : '&#9744;'}</span>
                            <span class="checklist-text">${label}</span>
                        </label>`;
                    }).join('')}
                </div>
                <div class="checklist-progress mt-md text-muted">
                    ${checked.size} / ${items.length} tamamlandi
                </div>
                ${checked.size === items.length ? `
                    <button class="btn btn-primary btn-lg w-full mt-lg" id="finish-checklist">Tamamla</button>
                ` : ''}
            </div>`;

        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const idx = parseInt(cb.dataset.index);
                if (cb.checked) { checked.add(idx); playSound('correct'); }
                else checked.delete(idx);
                render();
            });
        });

        container.querySelector('#finish-checklist')?.addEventListener('click', () => {
            const xp = 10;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, 3);
            showConfetti();
            showXpPopup(xp);
            playSound('complete');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">&#127942;</span>
                    <h2 class="mt-md">Oz Degerlendirme Tamam!</h2>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
        });
    }

    render();
}

// ===== FILL BLANK ENGINE (E07) =====
function renderFillBlankGame(container, game, data, app) {
    const items = game.veri?.cumleler || game.veri?.sorular || [];
    if (items.length === 0) {
        renderGenericGame(container, game, data, app);
        return;
    }
    // Fallback to mini quiz format
    renderMiniQuiz(container, game, data, app);
}

// ===== CLASSIFICATION ENGINE (E18) =====
function renderClassificationGame(container, game, data, app) {
    store.trackEngine('E18');
    const categories = game.veri?.kategoriler || [];
    const items = game.veri?.ogeler || [];
    if (categories.length === 0 || items.length === 0) { renderGenericGame(container, game, data, app); return; }

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const placed = {}; // itemIndex -> category
    let currentItem = 0;

    function render() {
        if (currentItem >= shuffled.length) {
            let correct = 0;
            shuffled.forEach((item, i) => { if (placed[i] === item.kategori) correct++; });
            const stars = correct === shuffled.length ? 3 : correct >= shuffled.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars >= 2) showConfetti();
            showXpPopup(xp);
            playSound('complete');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">${stars === 3 ? '&#127942;' : '&#11088;'}</span>
                    <h2 class="mt-md">${correct} / ${shuffled.length} Dogru</h2>
                    <div class="stars mt-md" style="font-size:2rem; justify-content:center;">${'&#11088;'.repeat(stars)}${'&#9734;'.repeat(3 - stars)}</div>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
            return;
        }

        const item = shuffled[currentItem];
        container.innerHTML = `
            <div class="classification-container anim-fade-in-up">
                <h3 class="mb-md">&#128230; Siniflandirma</h3>
                <div class="progress-bar mb-md" style="height:4px;">
                    <div class="fill" style="width:${(currentItem / shuffled.length) * 100}%"></div>
                </div>
                <p class="text-muted mb-md">${currentItem + 1} / ${shuffled.length}</p>
                <div class="card" style="padding:1.5rem; text-align:center; min-height:80px; display:flex; align-items:center; justify-content:center; border:2px solid var(--primary); background:var(--bg-main);">
                    <p style="font-size:1.15rem; font-weight:600;">${item.metin || item.oge || item.baslik || ""}</p>
                </div>
                <p class="text-muted mt-lg mb-md text-center">Bu hangi kategoriye ait?</p>
                <div class="classification-bins" style="display:flex; gap:1rem; flex-wrap:wrap;">
                    ${categories.map(cat => `
                        <button class="btn btn-lg classify-btn" style="flex:1; min-width:140px; padding:1.2rem; border:2px solid var(--border); background:white; font-weight:600; transition:all 0.2s;" data-cat="${cat}">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            </div>`;

        container.querySelectorAll('.classify-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                placed[currentItem] = btn.dataset.cat;
                const isCorrect = btn.dataset.cat === item.kategori;
                if (isCorrect) {
                    btn.style.background = '#e8f8ee'; btn.style.borderColor = '#4ECB71'; btn.style.color = '#1a7a3a';
                    playSound('correct');
                } else {
                    btn.style.background = '#fde8e8'; btn.style.borderColor = '#E74C3C'; btn.style.color = '#c0392b';
                    playSound('wrong');
                    container.querySelectorAll('.classify-btn').forEach(b => {
                        if (b.dataset.cat === item.kategori) { b.style.background = '#e8f8ee'; b.style.borderColor = '#4ECB71'; }
                    });
                }
                container.querySelectorAll('.classify-btn').forEach(b => b.disabled = true);
                currentItem++;
                setTimeout(() => render(), 800);
            });
        });
    }
    render();
}

// ===== CAUSE-EFFECT ENGINE (E13) =====
function renderCauseEffectGame(container, game, data, app) {
    store.trackEngine('E13');
    const cards = game.veri?.kartlar || [];
    if (cards.length === 0) { renderGenericGame(container, game, data, app); return; }

    // User needs to put chain in order
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    let userOrder = [...shuffled];

    function render() {
        container.innerHTML = `
            <div class="cause-effect-container anim-fade-in-up">
                <h3 class="mb-md">&#128257; Sebep-Sonuc Zinciri</h3>
                <p class="text-muted mb-lg">${game.hedef || 'Kartlari sebep-sonuc sirasina gore dizin.'}</p>
                <div class="ordering-list">
                    ${userOrder.map((card, i) => `
                        <div class="ordering-item card" style="border-left: 4px solid ${i === 0 ? 'var(--primary)' : 'var(--secondary)'};" data-index="${i}">
                            <span class="ordering-num" style="background: ${i === 0 ? 'var(--primary)' : 'var(--secondary)'}; color:white;">${i + 1}</span>
                            <span class="ordering-text">${card.metin || card.baslik || card.olay || ''}</span>
                            <div class="ordering-btns">
                                <button class="btn btn-sm btn-secondary order-up" data-index="${i}" ${i === 0 ? 'disabled' : ''}>&#9650;</button>
                                <button class="btn btn-sm btn-secondary order-down" data-index="${i}" ${i === userOrder.length - 1 ? 'disabled' : ''}>&#9660;</button>
                            </div>
                        </div>
                        ${i < userOrder.length - 1 ? '<div style="text-align:center; color:var(--text-secondary); font-size:1.2rem;">&#8595;</div>' : ''}
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-lg w-full mt-xl" id="check-chain">Kontrol Et</button>
            </div>`;

        container.querySelectorAll('.order-up').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (idx > 0) { [userOrder[idx], userOrder[idx-1]] = [userOrder[idx-1], userOrder[idx]]; render(); }
            });
        });
        container.querySelectorAll('.order-down').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (idx < userOrder.length - 1) { [userOrder[idx], userOrder[idx+1]] = [userOrder[idx+1], userOrder[idx]]; render(); }
            });
        });

        container.querySelector('#check-chain')?.addEventListener('click', () => {
            let correct = 0;
            userOrder.forEach((c, i) => { if (JSON.stringify(c) === JSON.stringify(cards[i])) correct++; });
            const stars = correct === cards.length ? 3 : correct >= cards.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars >= 2) showConfetti();
            showXpPopup(xp);
            playSound(stars === 3 ? 'complete' : 'correct');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">${stars === 3 ? '&#127942;' : '&#11088;'}</span>
                    <h2 class="mt-md">${correct} / ${cards.length} Dogru Siralama</h2>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
        });
    }
    render();
}

// ===== TIMELINE ENGINE (E14) =====
function renderTimelineGame(container, game, data, app) {
    store.trackEngine('E14');
    const events = game.veri?.olaylar || [];
    if (events.length === 0) { renderGenericGame(container, game, data, app); return; }

    const shuffled = [...events].sort(() => Math.random() - 0.5);
    let userOrder = [...shuffled];

    function render() {
        container.innerHTML = `
            <div class="timeline-container anim-fade-in-up">
                <h3 class="mb-md">&#128197; Zaman Cizgisi</h3>
                <p class="text-muted mb-lg">${game.hedef || 'Olaylari kronolojik siraya dizin.'}</p>
                <div class="timeline-list">
                    ${userOrder.map((evt, i) => `
                        <div class="timeline-item card" data-index="${i}" style="position:relative; padding:1rem 1rem 1rem 4rem; border-left:3px solid var(--primary);">
                            <div style="position:absolute; left:-12px; top:50%; transform:translateY(-50%); width:22px; height:22px; border-radius:50%; background:var(--primary); color:white; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:700;">${i + 1}</div>
                            <div style="font-weight:600; color:var(--secondary); font-size:0.85rem; margin-bottom:0.25rem;">${evt.tarih || ''}</div>
                            <div style="font-weight:600;">${evt.baslik || evt.olay || ''}</div>
                            ${evt.aciklama ? `<div class="text-muted" style="font-size:0.85rem; margin-top:0.25rem;">${evt.aciklama}</div>` : ''}
                            <div class="ordering-btns" style="position:absolute; right:0.75rem; top:50%; transform:translateY(-50%);">
                                <button class="btn btn-sm btn-secondary order-up" data-index="${i}" ${i === 0 ? 'disabled' : ''}>&#9650;</button>
                                <button class="btn btn-sm btn-secondary order-down" data-index="${i}" ${i === userOrder.length - 1 ? 'disabled' : ''}>&#9660;</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-lg w-full mt-xl" id="check-timeline">Kontrol Et</button>
            </div>`;

        container.querySelectorAll('.order-up').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (idx > 0) { [userOrder[idx], userOrder[idx-1]] = [userOrder[idx-1], userOrder[idx]]; render(); }
            });
        });
        container.querySelectorAll('.order-down').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (idx < userOrder.length - 1) { [userOrder[idx], userOrder[idx+1]] = [userOrder[idx+1], userOrder[idx]]; render(); }
            });
        });

        container.querySelector('#check-timeline')?.addEventListener('click', () => {
            let correct = 0;
            userOrder.forEach((evt, i) => {
                if (JSON.stringify(evt) === JSON.stringify(events[i])) correct++;
            });
            const stars = correct === events.length ? 3 : correct >= events.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars >= 2) showConfetti();
            showXpPopup(xp);
            playSound(stars === 3 ? 'complete' : 'correct');

            // Show correct order
            container.innerHTML = `
                <div class="anim-fade-in-up">
                    <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem; margin-bottom:1.5rem;">
                        <span style="font-size:3rem;">${stars === 3 ? '&#127942;' : '&#11088;'}</span>
                        <h2 class="mt-md">${correct} / ${events.length} Dogru</h2>
                        <p class="xp-display mt-md" style="font-size:1.3rem;">+${xp} XP</p>
                    </div>
                    <div class="card" style="padding:1.5rem;">
                        <h4 class="mb-md">Dogru Siralama:</h4>
                        ${events.map((evt, i) => `
                            <div style="padding:0.5rem 0; border-bottom:1px solid var(--border); display:flex; gap:0.75rem; align-items:baseline;">
                                <span style="font-weight:700; color:var(--primary);">${i+1}.</span>
                                <span style="font-weight:600; color:var(--secondary); font-size:0.85rem; min-width:60px;">${evt.tarih || ''}</span>
                                <span>${evt.baslik}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'" style="width:100%;">Devam Et</button>
                </div>`;
        });
    }
    render();
}

// ===== CHARACTER-ROLE ENGINE (E15) =====
function renderCharacterRoleGame(container, game, data, app) {
    store.trackEngine('E15');
    const chars = game.veri?.karakterler || [];
    if (chars.length === 0) { renderGenericGame(container, game, data, app); return; }

    const shuffledRoles = [...chars].sort(() => Math.random() - 0.5);
    let selectedChar = null;
    let matched = new Set();

    function render() {
        if (matched.size === chars.length) {
            const xp = chars.length * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, 3);
            showConfetti(); showXpPopup(xp); playSound('complete');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">&#127942;</span>
                    <h2 class="mt-md">Tum Eslesmeler Tamam!</h2>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
            return;
        }

        container.innerHTML = `
            <div class="character-role-container anim-fade-in-up">
                <h3 class="mb-md">&#127917; Karakter-Rol Eslestirme</h3>
                <p class="text-muted mb-lg">${game.hedef || 'Sol taraftan karakteri sec, sag taraftan rolunu bul.'}</p>
                <div class="matching-grid">
                    <div class="matching-col">
                        <p class="text-muted mb-sm" style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px;">Karakter</p>
                        ${chars.map((c, i) => `
                            <button class="matching-item term-item ${matched.has(i) ? 'matched' : ''} ${selectedChar === i ? 'selected' : ''}"
                                    data-index="${i}" ${matched.has(i) ? 'disabled' : ''}>
                                <strong>${c.isim || c.karakter || c.ad || ''}</strong>
                                <span style="display:block; font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">${c.ozellik || ''}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div class="matching-col">
                        <p class="text-muted mb-sm" style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px;">Rol</p>
                        ${shuffledRoles.map((c, i) => `
                            <button class="matching-item def-item ${matched.has(chars.indexOf(c)) ? 'matched' : ''}"
                                    data-orig-index="${chars.indexOf(c)}" ${matched.has(chars.indexOf(c)) ? 'disabled' : ''}>
                                ${c.rol || c.gorev || ''}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="matching-score mt-md text-muted">${matched.size} / ${chars.length} eslesti</div>
            </div>`;

        container.querySelectorAll('.term-item').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.term-item').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedChar = parseInt(btn.dataset.index);
            });
        });

        container.querySelectorAll('.def-item').forEach(btn => {
            btn.addEventListener('click', () => {
                if (selectedChar === null) return;
                const origIndex = parseInt(btn.dataset.origIndex);
                if (origIndex === selectedChar) {
                    matched.add(selectedChar);
                    playSound('correct');
                    selectedChar = null;
                    render();
                } else {
                    btn.classList.add('answer-wrong');
                    playSound('wrong');
                    setTimeout(() => btn.classList.remove('answer-wrong'), 600);
                }
            });
        });
    }
    render();
}

// ===== MESSAGE HUNT ENGINE (E16) =====
function renderMessageHuntGame(container, game, data, app) {
    store.trackEngine('E16');
    const themes = game.veri?.temalar || [];
    const cards = game.veri?.kartlar || [];
    if (themes.length === 0 || cards.length === 0) { renderGenericGame(container, game, data, app); return; }

    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    let currentCard = 0;
    let correct = 0;

    function render() {
        if (currentCard >= shuffled.length) {
            const stars = correct === shuffled.length ? 3 : correct >= shuffled.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars >= 2) showConfetti();
            showXpPopup(xp); playSound('complete');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">${stars === 3 ? '&#127942;' : '&#11088;'}</span>
                    <h2 class="mt-md">${correct} / ${shuffled.length} Dogru</h2>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
            return;
        }

        const card = shuffled[currentCard];
        container.innerHTML = `
            <div class="message-hunt-container anim-fade-in-up">
                <h3 class="mb-md">&#128172; Mesaj Avi</h3>
                <div class="progress-bar mb-md" style="height:4px;">
                    <div class="fill" style="width:${(currentCard / shuffled.length) * 100}%"></div>
                </div>
                <p class="text-muted mb-md">${currentCard + 1} / ${shuffled.length}</p>
                <div class="card" style="padding:1.5rem; text-align:center; min-height:100px; display:flex; align-items:center; justify-content:center; border:2px solid var(--secondary); background:linear-gradient(135deg, #fffbf0, #fff8e1);">
                    <p style="font-size:1.1rem; line-height:1.7; font-style:italic;">"${card.metin}"</p>
                </div>
                <p class="text-muted mt-lg mb-md text-center">Bu mesajin temasi nedir?</p>
                <div class="quiz-options">
                    ${themes.map(theme => `
                        <button class="quiz-option" data-theme="${theme}">${theme}</button>
                    `).join('')}
                </div>
            </div>`;

        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const isCorrect = btn.dataset.theme === card.tema;
                if (isCorrect) { btn.classList.add('answer-correct'); correct++; playSound('correct'); }
                else {
                    btn.classList.add('answer-wrong'); playSound('wrong');
                    container.querySelectorAll('.quiz-option').forEach(b => {
                        if (b.dataset.theme === card.tema) b.classList.add('answer-correct');
                    });
                }
                container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
                currentCard++;
                setTimeout(() => render(), 800);
            });
        });
    }
    render();
}

// ===== COMPARISON MATRIX ENGINE (E17) =====
function renderComparisonGame(container, game, data, app) {
    store.trackEngine('E17');
    const veri = game.veri;
    if (!veri?.kavram_a || !veri?.kavram_b) { renderGenericGame(container, game, data, app); return; }

    const allStatements = [
        ...(veri.ortak || []).map(s => ({ text: s, zone: 'ortak' })),
        ...(veri.farkli_a || []).map(s => ({ text: s, zone: 'farkli_a' })),
        ...(veri.farkli_b || []).map(s => ({ text: s, zone: 'farkli_b' }))
    ].sort(() => Math.random() - 0.5);

    let currentIdx = 0;
    let correct = 0;

    function render() {
        if (currentIdx >= allStatements.length) {
            const stars = correct === allStatements.length ? 3 : correct >= allStatements.length * 0.7 ? 2 : 1;
            const xp = correct * 5;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            if (stars >= 2) showConfetti();
            showXpPopup(xp); playSound('complete');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">${stars === 3 ? '&#127942;' : '&#11088;'}</span>
                    <h2 class="mt-md">${correct} / ${allStatements.length} Dogru</h2>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
            return;
        }

        const item = allStatements[currentIdx];
        container.innerHTML = `
            <div class="comparison-container anim-fade-in-up">
                <h3 class="mb-md">&#128202; Karsilastirma</h3>
                <div class="progress-bar mb-md" style="height:4px;">
                    <div class="fill" style="width:${(currentIdx / allStatements.length) * 100}%"></div>
                </div>
                <p class="text-muted mb-md">${currentIdx + 1} / ${allStatements.length}</p>
                <div class="card" style="padding:1.5rem; text-align:center; min-height:80px; display:flex; align-items:center; justify-content:center;">
                    <p style="font-size:1.05rem; line-height:1.6;">${item.text}</p>
                </div>
                <p class="text-muted mt-lg mb-md text-center">Bu ifade kime / neye ait?</p>
                <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                    <button class="btn btn-lg compare-btn" style="flex:1; min-width:100px; padding:1rem; border:2px solid #4A90D9; background:#edf4fc; color:#2c5ea0; font-weight:600;" data-zone="farkli_a">
                        ${veri.kavram_a || 'A'}
                    </button>
                    <button class="btn btn-lg compare-btn" style="flex:1; min-width:100px; padding:1rem; border:2px solid var(--primary); background:#e8f5e9; color:var(--primary); font-weight:600;" data-zone="ortak">
                        Ortak
                    </button>
                    <button class="btn btn-lg compare-btn" style="flex:1; min-width:100px; padding:1rem; border:2px solid var(--secondary); background:#fff8e1; color:#8B6914; font-weight:600;" data-zone="farkli_b">
                        ${veri.kavram_b || 'B'}
                    </button>
                </div>
            </div>`;

        container.querySelectorAll('.compare-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const isCorrect = btn.dataset.zone === item.zone;
                if (isCorrect) { btn.style.boxShadow = '0 0 0 3px #4ECB71'; correct++; playSound('correct'); }
                else {
                    btn.style.boxShadow = '0 0 0 3px #E74C3C'; playSound('wrong');
                    container.querySelectorAll('.compare-btn').forEach(b => {
                        if (b.dataset.zone === item.zone) b.style.boxShadow = '0 0 0 3px #4ECB71';
                    });
                }
                container.querySelectorAll('.compare-btn').forEach(b => b.disabled = true);
                currentIdx++;
                setTimeout(() => render(), 800);
            });
        });
    }
    render();
}

// ===== OPEN-ENDED REFLECTION ENGINE (E20) =====
function renderOpenEndedGame(container, game, data, app) {
    store.trackEngine('E20');
    const veri = game.veri;
    if (!veri?.soru) { renderGenericGame(container, game, data, app); return; }

    const hints = veri.yonlendirici_sorular || [];
    const rubric = veri.rubrik || [];
    let phase = 'write'; // write -> review

    function renderWrite() {
        container.innerHTML = `
            <div class="open-ended-container anim-fade-in-up">
                <h3 class="mb-md">&#128173; Dusunce Kutusu</h3>
                <div class="card" style="padding:1.5rem; border-left:4px solid var(--secondary); background:linear-gradient(135deg, #fffbf0, #fff);">
                    <p style="font-size:1.1rem; line-height:1.7;">${veri.soru}</p>
                </div>
                ${hints.length > 0 ? `
                <div class="card mt-lg" style="padding:1rem; background:#f8f9fa;">
                    <p style="font-size:0.85rem; font-weight:600; margin-bottom:0.5rem; color:var(--text-secondary);">&#128161; Yonlendirici Sorular:</p>
                    <ul style="margin:0; padding-left:1.2rem;">
                        ${hints.map(h => `<li style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.4rem;">${h}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                <textarea id="reflection-text" class="mt-lg" placeholder="Dusuncelerini buraya yaz..." style="width:100%; min-height:180px; padding:1rem; border:2px solid var(--border); border-radius:12px; font-size:1rem; line-height:1.7; resize:vertical; font-family:inherit; box-sizing:border-box;"></textarea>
                <div class="flex justify-between items-center mt-md">
                    <span class="text-muted" style="font-size:0.8rem;" id="char-count">0 karakter</span>
                    <button class="btn btn-primary btn-lg" id="submit-reflection" disabled>Gonder</button>
                </div>
            </div>`;

        const textarea = container.querySelector('#reflection-text');
        const submitBtn = container.querySelector('#submit-reflection');
        const charCount = container.querySelector('#char-count');

        textarea.addEventListener('input', () => {
            const len = textarea.value.trim().length;
            charCount.textContent = `${len} karakter`;
            submitBtn.disabled = len < 20;
        });

        submitBtn.addEventListener('click', () => {
            phase = 'review';
            renderReview(textarea.value.trim());
        });
    }

    function renderReview(text) {
        container.innerHTML = `
            <div class="open-ended-review anim-fade-in-up">
                <h3 class="mb-md">&#9745; Oz Degerlendirme</h3>
                <div class="card" style="padding:1.5rem; background:#f8f9fa;">
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.5rem;">Yazdiklarin:</p>
                    <p style="line-height:1.7; font-style:italic;">"${text}"</p>
                </div>
                ${rubric.length > 0 ? `
                <div class="card mt-lg" style="padding:1.5rem;">
                    <p style="font-weight:600; margin-bottom:0.75rem;">Asagidakileri degerlendirin:</p>
                    ${rubric.map((r, i) => `
                        <label class="checklist-item card" style="margin-bottom:0.5rem; padding:0.75rem; cursor:pointer;">
                            <input type="checkbox" class="rubric-check" data-index="${i}">
                            <span class="checklist-check">&#9744;</span>
                            <span class="checklist-text">${r}</span>
                        </label>
                    `).join('')}
                </div>
                ` : ''}
                <button class="btn btn-primary btn-lg w-full mt-xl" id="finish-reflection">Tamamla</button>
            </div>`;

        container.querySelectorAll('.rubric-check').forEach(cb => {
            cb.addEventListener('change', () => {
                const label = cb.closest('.checklist-item');
                if (cb.checked) {
                    label.classList.add('checked');
                    label.querySelector('.checklist-check').innerHTML = '&#9745;';
                    playSound('correct');
                } else {
                    label.classList.remove('checked');
                    label.querySelector('.checklist-check').innerHTML = '&#9744;';
                }
            });
        });

        container.querySelector('#finish-reflection')?.addEventListener('click', () => {
            const checked = container.querySelectorAll('.rubric-check:checked').length;
            const total = rubric.length || 1;
            const stars = checked === total ? 3 : checked >= total * 0.5 ? 2 : 1;
            const xp = 15 + (checked * 5);
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
            showConfetti(); showXpPopup(xp); playSound('complete');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">&#127942;</span>
                    <h2 class="mt-md">Harika Dusunceler!</h2>
                    <p class="text-muted mt-sm">Yazma ve dusunme becerilerini gelistirdin.</p>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
        });
    }

    renderWrite();
}

// ===== PERFORMANCE TASK ENGINE (E22) =====
function renderPerformanceTask(container, game, data, app) {
    store.trackEngine('E22');
    const veri = game.veri;
    if (!veri?.gorev_basligi) { renderGenericGame(container, game, data, app); return; }

    const steps = veri.adimlar || [];
    const rubric = veri.rubrik || [];
    const completedSteps = new Set();

    function render() {
        container.innerHTML = `
            <div class="performance-task anim-fade-in-up">
                <h3 class="mb-sm">&#127941; Performans Gorevi</h3>
                <div class="card" style="padding:1.5rem; border-left:4px solid var(--secondary); background:linear-gradient(135deg, #fffbf0, #fff);">
                    <h4 style="color:var(--secondary);">${veri.gorev_basligi}</h4>
                    ${veri.teslim_formati ? `<p class="text-muted mt-sm" style="font-size:0.85rem;">&#128206; Teslim: ${veri.teslim_formati}</p>` : ''}
                </div>

                ${steps.length > 0 ? `
                <div class="card mt-lg" style="padding:1.5rem;">
                    <h4 class="mb-md">Adimlar</h4>
                    <div class="performance-steps">
                        ${steps.map((step, i) => `
                            <label class="checklist-item card ${completedSteps.has(i) ? 'checked' : ''}" style="margin-bottom:0.5rem; padding:0.75rem; cursor:pointer;">
                                <input type="checkbox" class="step-check" data-index="${i}" ${completedSteps.has(i) ? 'checked' : ''}>
                                <span class="checklist-check">${completedSteps.has(i) ? '&#9745;' : '&#9744;'}</span>
                                <span class="checklist-text">${step}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="progress-bar mt-md" style="height:6px;">
                        <div class="fill" style="width:${steps.length > 0 ? (completedSteps.size / steps.length) * 100 : 0}%; background:var(--secondary);"></div>
                    </div>
                    <p class="text-muted mt-sm" style="font-size:0.85rem;">${completedSteps.size} / ${steps.length} adim tamamlandi</p>
                </div>
                ` : ''}

                ${rubric.length > 0 ? `
                <div class="card mt-lg" style="padding:1.5rem;">
                    <h4 class="mb-md">&#128203; Degerlendirme Olcutleri</h4>
                    ${rubric.map(r => `
                        <div style="padding:0.5rem 0; border-bottom:1px solid var(--border);">
                            <p style="font-weight:600;">${r.olcut || r.kriter || ''}</p>
                            <p class="text-muted" style="font-size:0.85rem;">${r.aciklama || r.puan || ''}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${completedSteps.size === steps.length && steps.length > 0 ? `
                    <button class="btn btn-primary btn-lg w-full mt-xl" id="finish-task">Gorevi Tamamla</button>
                ` : `
                    <p class="text-muted text-center mt-lg" style="font-size:0.85rem;">Tum adimlari tamamlayin.</p>
                `}
            </div>`;

        container.querySelectorAll('.step-check').forEach(cb => {
            cb.addEventListener('change', () => {
                const idx = parseInt(cb.dataset.index);
                if (cb.checked) { completedSteps.add(idx); playSound('correct'); }
                else completedSteps.delete(idx);
                render();
            });
        });

        container.querySelector('#finish-task')?.addEventListener('click', () => {
            const xp = 25;
            store.completeChapter(data.grade, data.unitId, data.chapterId, xp, 3);
            showConfetti(); showXpPopup(xp); playSound('complete');
            container.innerHTML = `
                <div class="quiz-result card anim-bounce-in text-center" style="padding:2rem;">
                    <span style="font-size:3rem;">&#127942;</span>
                    <h2 class="mt-md">Performans Gorevi Tamam!</h2>
                    <p class="text-muted mt-sm">Harika bir is cikardin!</p>
                    <p class="xp-display mt-lg" style="font-size:1.3rem;">+${xp} XP</p>
                    <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Devam Et</button>
                </div>`;
        });
    }
    render();
}

// ===== GENERIC GAME (fallback) =====
function renderGenericGame(container, game, data, app) {
    container.innerHTML = `
        <div class="card anim-fade-in-up text-center" style="padding: 2rem;">
            <span style="font-size: 3rem;">${getEngineIcon(game.motor_id)}</span>
            <h3 class="mt-md">${game.baslik}</h3>
            <p class="text-muted mt-sm">${game.hedef || ''}</p>
            <p class="text-muted mt-sm" style="font-size:0.8rem;">Motor: ${game.motor_adi} (${game.motor_id})</p>
            <p class="mt-lg text-muted">Bu oyun motoru yakinda aktif olacak!</p>
            <button class="btn btn-primary mt-lg" onclick="window.location.hash='#/'">Geri Don</button>
        </div>`;
}

// ===== QUIZ TAB (main question bank) =====
function renderQuiz(data) {
    const { questions } = data;
    return `
        <div class="quiz-container">
            <div class="card text-center" style="padding: 2rem;">
                <span style="font-size: 3rem;">&#127919;</span>
                <h3 class="mt-md">Bolum Quizi</h3>
                <p class="text-muted mt-sm">${questions.length} soru seni bekliyor</p>
                <button class="btn btn-primary btn-lg mt-lg" id="start-quiz">Quize Basla</button>
            </div>
        </div>`;
}

function initQuiz(el, data, app) {
    const startBtn = el.querySelector('#start-quiz');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
        const container = el.querySelector('#tab-content');
        const questions = [...data.questions].sort(() => Math.random() - 0.5);
        let current = 0;
        let correct = 0;

        function renderQ() {
            if (current >= questions.length) {
                const stars = correct === questions.length ? 3 : correct >= questions.length * 0.7 ? 2 : 1;
                const xp = correct * 10;
                store.completeChapter(data.grade, data.unitId, data.chapterId, xp, stars);
                store.recordQuizResult(correct, questions.length);
                if (stars === 3) showConfetti();
                showXpPopup(xp);
                playSound('complete');

                container.innerHTML = `
                    <div class="quiz-result card anim-bounce-in text-center" style="padding: 2rem;">
                        <span style="font-size: 4rem;">${stars === 3 ? '&#127942;' : stars === 2 ? '&#11088;' : '&#128170;'}</span>
                        <h2 class="mt-md font-display">${stars === 3 ? 'Mukemmel Basari!' : stars === 2 ? 'Harika!' : 'Iyi Deneme!'}</h2>
                        <p class="mt-sm text-muted">${correct} / ${questions.length} dogru cevap</p>
                        <div class="stars mt-md" style="font-size:2.5rem; justify-content:center; display:flex; gap:4px;">
                            ${'&#11088;'.repeat(stars)}${'&#9734;'.repeat(3 - stars)}
                        </div>
                        <p class="xp-display mt-xl" style="font-size:1.5rem;">+${xp} XP</p>
                        <div class="flex gap-md justify-center mt-xl">
                            <button class="btn btn-secondary" onclick="window.location.hash='#/'">Geri Don</button>
                            <button class="btn btn-primary" id="retry-quiz">Tekrar Dene</button>
                        </div>
                    </div>`;

                container.querySelector('#retry-quiz')?.addEventListener('click', () => {
                    current = 0; correct = 0;
                    questions.sort(() => Math.random() - 0.5);
                    renderQ();
                });
                return;
            }

            const q = questions[current];
            container.innerHTML = `
                <div class="quiz-question anim-fade-in-up">
                    <div class="progress-bar mb-md" style="height: 6px;">
                        <div class="fill accent" style="width: ${(current / questions.length) * 100}%;"></div>
                    </div>
                    <div class="flex justify-between items-center mb-lg">
                        <span class="text-muted">${current + 1} / ${questions.length}</span>
                        <span class="badge ${q.zorluk === 'kolay' ? 'badge-success' : q.zorluk === 'zor' ? 'badge-warning' : 'badge-info'}">${q.zorluk}</span>
                    </div>
                    <div class="card" style="padding: 1.5rem;">
                        <p style="font-size: 1.1rem; line-height: 1.7;">${q.soru_metni}</p>
                    </div>
                    <div class="quiz-options mt-lg stagger">
                        ${q.secenekler.map((opt, i) => `
                            <button class="quiz-option anim-fade-in-up" data-letter="${opt.charAt(0)}">${opt}</button>
                        `).join('')}
                    </div>
                </div>`;

            container.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    const letter = btn.dataset.letter;
                    const isCorrect = letter === q.dogru_cevap;

                    if (isCorrect) {
                        btn.classList.add('answer-correct');
                        correct++;
                        playSound('correct');
                    } else {
                        btn.classList.add('answer-wrong');
                        playSound('wrong');
                        // Highlight correct
                        container.querySelectorAll('.quiz-option').forEach(b => {
                            if (b.dataset.letter === q.dogru_cevap) b.classList.add('answer-correct');
                        });
                    }

                    // Show explanation
                    container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

                    if (q.aciklama) {
                        const exp = document.createElement('div');
                        exp.className = 'quiz-explanation card mt-md anim-fade-in-up';
                        exp.style.padding = '1rem';
                        exp.style.background = isCorrect ? '#e8f8ee' : '#fef3e2';
                        exp.innerHTML = `<p style="font-size:0.9rem;"><strong>${isCorrect ? '&#10004; Dogru!' : '&#10008; Yanlis.'}</strong> ${q.aciklama}</p>`;
                        container.querySelector('.quiz-question').appendChild(exp);
                    }

                    current++;
                    setTimeout(() => renderQ(), isCorrect ? 1000 : 2000);
                });
            });
        }

        renderQ();
    });
}

// ===== DUA/SURE TAB =====

// Audio file mapping for prayers
const PRAYER_AUDIO_MAP = {
    // Sureler
    'fatiha': 'sureler/fatiha.mp3',
    'ihlas': 'sureler/ihlas.mp3',
    'ihlâs': 'sureler/ihlas.mp3',
    'kevser': 'sureler/kevser.mp3',
    'kureyş': 'sureler/kureys.mp3',
    'kureys': 'sureler/kureys.mp3',
    'felak': 'sureler/felak.mp3',
    'felâk': 'sureler/felak.mp3',
    'fil': 'sureler/fil.mp3',
    'nas': 'sureler/nas.mp3',
    'nâs': 'sureler/nas.mp3',
    'kafirun': 'sureler/kafirun.mp3',
    'kâfirûn': 'sureler/kafirun.mp3',
    'maun': 'sureler/maun.mp3',
    'mâûn': 'sureler/maun.mp3',
    'asr': 'sureler/asr.mp3',
    // Ayetler
    'ayetü\'l-kürsi': 'ayetler/bakara_255.mp3',
    'ayetül-kürsi': 'ayetler/bakara_255.mp3',
    'enam 162': 'ayetler/enam_162.mp3',
    'en\'am 162': 'ayetler/enam_162.mp3',
    'bakara 128': 'ayetler/bakara_128.mp3',
    'bakara 201': 'ayetler/bakara_201.mp3',
    'bakara 208': 'ayetler/bakara_208.mp3',
    'bakara 153': 'ayetler/bakara_153-157.mp3',
    'ibrahim 40': 'ayetler/ibrahim_40-41.mp3',
    'ahzab 45': 'ayetler/ahzab_45-46.mp3',
    'ahzâb 45': 'ayetler/ahzab_45-46.mp3',
    'nahl 43': 'ayetler/nahl_43-44.mp3',
    'nahl 90': 'ayetler/nahl_90.mp3',
    'isra 36': 'ayetler/isra_36.mp3',
    'isrâ 36': 'ayetler/isra_36.mp3',
    'mülk 23': 'ayetler/mulk_23.mp3',
    'hasr 22': 'ayetler/hasr_22-24.mp3',
    'haşr 22': 'ayetler/hasr_22-24.mp3',
    'nisa 58': 'ayetler/nisa_58.mp3',
    'nisâ 58': 'ayetler/nisa_58.mp3',
    'nisa 69': 'ayetler/nisa_69.mp3',
    'nisâ 69': 'ayetler/nisa_69.mp3',
    'rum 41': 'ayetler/rum_41.mp3',
    'rûm 41': 'ayetler/rum_41.mp3',
    'hucurat 13': 'ayetler/hucurat_13.mp3',
    'hucurât 13': 'ayetler/hucurat_13.mp3',
    'hucurat 10': 'ayetler/hucurat_10.mp3',
    'hucurât 10': 'ayetler/hucurat_10.mp3',
    'kehf 107': 'ayetler/kehf_107-110.mp3',
    'enam 59': 'ayetler/enam_59.mp3',
    'en\'am 59': 'ayetler/enam_59.mp3',
    'lokman 27': 'ayetler/lokman_27.mp3',
    'lokmân 27': 'ayetler/lokman_27.mp3',
    'fatir 27': 'ayetler/fatir_27-28.mp3',
    'fâtır 27': 'ayetler/fatir_27-28.mp3',
    'enam 151': 'ayetler/enam_151-152.mp3',
    'en\'am 151': 'ayetler/enam_151-152.mp3',
};

function normalizeTR(str) {
    return str.toLowerCase()
        .replace(/['']/g, "'")
        .replace(/İ/gi, 'i').replace(/ı/g, 'i')
        .replace(/[âàáä]/g, 'a').replace(/[ûùúü]/g, 'u').replace(/[ôòóö]/g, 'o')
        .replace(/[êèéë]/g, 'e').replace(/[îìíï]/g, 'i')
        .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
        .replace(/\u0307/g, '');
}

function getAudioForPrayer(baslik) {
    const normalized = normalizeTR(baslik);
    // Sort keys by length descending (most specific first) to avoid false matches
    const sorted = Object.entries(PRAYER_AUDIO_MAP).sort((a, b) => b[0].length - a[0].length);
    for (const [key, val] of sorted) {
        const keyWords = normalizeTR(key).split(/[\s-]+/);
        if (keyWords.every(w => normalized.includes(w))) return val;
    }
    return null;
}

// Active audio tracker
let _activeAudio = null;

function initAudioPlayers(container) {
    // Toggle play button - show/hide player
    container.querySelectorAll('.btn-audio').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = btn.dataset.idx;
            const playerContainer = container.querySelector(`#audio-player-${idx}`);
            if (!playerContainer) return;

            if (playerContainer.style.display === 'none') {
                playerContainer.style.display = 'block';
                // Auto-play
                const audio = container.querySelector(`#audio-el-${idx}`);
                if (audio) {
                    if (_activeAudio && _activeAudio !== audio) {
                        _activeAudio.pause();
                        _activeAudio.currentTime = 0;
                    }
                    audio.play();
                    _activeAudio = audio;
                    updatePlayBtn(container, idx, true);
                }
            } else {
                playerContainer.style.display = 'none';
                const audio = container.querySelector(`#audio-el-${idx}`);
                if (audio) { audio.pause(); audio.currentTime = 0; }
            }
        });
    });

    // Play/pause controls
    container.querySelectorAll('.btn-audio-ctrl').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = btn.dataset.idx;
            const audio = container.querySelector(`#audio-el-${idx}`);
            if (!audio) return;

            if (audio.paused) {
                if (_activeAudio && _activeAudio !== audio) {
                    _activeAudio.pause();
                }
                audio.play();
                _activeAudio = audio;
                updatePlayBtn(container, idx, true);
            } else {
                audio.pause();
                updatePlayBtn(container, idx, false);
            }
        });
    });

    // Speed controls
    container.querySelectorAll('[data-action="speed"]').forEach(btn => {
        const speeds = [1, 0.75, 0.5];
        let speedIdx = 0;
        btn.addEventListener('click', () => {
            speedIdx = (speedIdx + 1) % speeds.length;
            const idx = btn.dataset.idx;
            const audio = container.querySelector(`#audio-el-${idx}`);
            if (audio) audio.playbackRate = speeds[speedIdx];
            btn.textContent = speeds[speedIdx] + 'x';
        });
    });

    // Seek bars
    container.querySelectorAll('.audio-seek').forEach(seek => {
        seek.addEventListener('input', () => {
            const idx = seek.dataset.idx;
            const audio = container.querySelector(`#audio-el-${idx}`);
            if (audio && audio.duration) {
                audio.currentTime = (seek.value / 100) * audio.duration;
            }
        });
    });

    // Audio events - update UI
    container.querySelectorAll('audio').forEach(audio => {
        const idx = audio.id.replace('audio-el-', '');

        audio.addEventListener('timeupdate', () => {
            const seek = container.querySelector(`.audio-seek[data-idx="${idx}"]`);
            const currentEl = container.querySelector(`.audio-current[data-idx="${idx}"]`);
            if (seek && audio.duration) {
                seek.value = (audio.currentTime / audio.duration) * 100;
            }
            if (currentEl) {
                currentEl.textContent = formatTime(audio.currentTime);
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            const durEl = container.querySelector(`.audio-duration[data-idx="${idx}"]`);
            if (durEl) durEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('ended', () => {
            updatePlayBtn(container, idx, false);
            const seek = container.querySelector(`.audio-seek[data-idx="${idx}"]`);
            if (seek) seek.value = 0;
        });
    });
}

function updatePlayBtn(container, idx, isPlaying) {
    const btn = container.querySelector(`.btn-audio-ctrl[data-idx="${idx}"]`);
    if (!btn) return;
    btn.innerHTML = isPlaying
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
}

function formatTime(secs) {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function renderDua(data) {
    const { prayers } = data;
    if (!prayers || prayers.length === 0) {
        return '<div class="card text-center" style="padding: 2rem;"><p class="text-muted">Bu bolum icin dua/sure bulunamadi.</p></div>';
    }

    return `
        <div class="dua-list stagger">
            ${prayers.map((p, idx) => {
                const audioFile = getAudioForPrayer(p.baslik);
                return `
                <div class="dua-card anim-fade-in-up">
                    <div class="dua-card-header" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
                        <h3 class="font-display" style="color: var(--secondary); font-size: 1.3rem; margin:0;">${p.baslik}</h3>
                        ${audioFile ? `
                            <button class="btn-audio" data-audio="assets/audio/${audioFile}" data-idx="${idx}"
                                    style="background:var(--primary); color:white; border:none; border-radius:50%; width:40px; height:40px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition: all 0.2s;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            </button>
                        ` : ''}
                    </div>
                    ${audioFile ? `
                        <div class="audio-player-container" id="audio-player-${idx}" style="display:none; margin-bottom:1rem;">
                            <audio id="audio-el-${idx}" preload="none">
                                <source src="assets/audio/${audioFile}" type="audio/mpeg">
                            </audio>
                            <div style="display:flex; align-items:center; gap:0.5rem; padding:0.5rem; background:var(--bg-main); border-radius:12px;">
                                <button class="btn-audio-ctrl" data-idx="${idx}" data-action="play"
                                        style="background:var(--primary); color:white; border:none; border-radius:50%; width:36px; height:36px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="play-icon"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                </button>
                                <div style="flex:1; display:flex; flex-direction:column; gap:2px;">
                                    <input type="range" class="audio-seek" data-idx="${idx}" min="0" max="100" value="0"
                                           style="width:100%; height:4px; accent-color:var(--primary); cursor:pointer;">
                                    <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-secondary);">
                                        <span class="audio-current" data-idx="${idx}">0:00</span>
                                        <span class="audio-duration" data-idx="${idx}">0:00</span>
                                    </div>
                                </div>
                                <button data-idx="${idx}" data-action="speed"
                                        style="background:var(--bg-card); border:1px solid var(--border); border-radius:8px; padding:2px 6px; font-size:0.7rem; cursor:pointer; color:var(--text-primary);">
                                    1x
                                </button>
                            </div>
                        </div>
                    ` : ''}
                    <div class="arabic-text">${p.arapca}</div>
                    <div class="transliteration">${p.okunusu}</div>
                    <div class="meaning">${p.anlami}</div>
                </div>`;
            }).join('')}
        </div>`;
}

function getEngineIcon(motorId) {
    const icons = {
        'E01': '&#128269;', 'E02': '&#128195;', 'E03': '&#128279;', 'E04': '&#128248;',
        'E05': '&#128204;', 'E06': '&#9989;', 'E07': '&#9999;', 'E08': '&#128290;',
        'E09': '&#128266;', 'E10': '&#128161;', 'E11': '&#128736;', 'E12': '&#128270;',
        'E13': '&#128257;', 'E14': '&#128197;', 'E15': '&#127917;', 'E16': '&#128172;',
        'E17': '&#128202;', 'E18': '&#128230;', 'E19': '&#127919;', 'E20': '&#128173;',
        'E21': '&#9745;', 'E22': '&#127941;', 'E23': '&#128260;', 'E24': '&#128200;'
    };
    return icons[motorId] || '&#127922;';
}
