// ===== DKAB Akademi - 360° Degerlendirme (On-Test / Son-Test) =====

import { store } from '../store.js?v=13';
import { loadData, getGradeInfo } from '../data-loader.js?v=13';
import { getMessage } from '../messages.js?v=13';

/**
 * On-Test / Son-Test degerlendirme bileseni
 * Kirkpatrick Seviye 2: Ogrenme olcumu
 * unite_degerlendirme.json verisini kullanir
 */
export async function renderAssessment(el, app, grade, unitId) {
    const gradeInfo = getGradeInfo(grade);

    el.innerHTML = `
        <div class="content-area">
            <div class="page-header anim-fade-in-up">
                <button class="btn btn-ghost" onclick="window.history.back()">&#8592; Geri</button>
                <h1 class="font-display mt-md">&#128203; Unite Degerlendirmesi</h1>
            </div>
            <div class="assessment-content mt-lg">
                <div class="spinner" style="margin:2rem auto;"></div>
            </div>
        </div>`;

    // unite_degerlendirme.json yukle
    const evalData = await loadData(grade, 'questions');
    const assessmentData = await fetchAssessmentData(grade);

    const container = el.querySelector('.assessment-content');

    if (!assessmentData) {
        container.innerHTML = `
            <div class="card text-center" style="padding:2rem;">
                <p class="text-muted">Bu unite icin degerlendirme verisi bulunamadi.</p>
                <a href="#/sinif/${grade}" class="btn btn-primary mt-lg">Derslere Don</a>
            </div>`;
        return;
    }

    // Mevcut sonuclari kontrol et
    const existing = store.getPrePostResult(grade, unitId);

    if (existing && existing.on_test && existing.son_test) {
        // Her iki test de yapilmis - karsilastirma goster
        renderComparison(container, existing, grade, unitId, gradeInfo);
    } else if (existing && existing.on_test) {
        // Sadece on-test yapilmis - son-test onerisi
        renderTestPrompt(container, 'son_test', assessmentData, grade, unitId, gradeInfo, existing.on_test);
    } else {
        // Hic test yapilmamis - on-test onerisi
        renderTestPrompt(container, 'on_test', assessmentData, grade, unitId, gradeInfo, null);
    }
}

async function fetchAssessmentData(grade) {
    try {
        const paddedGrade = String(grade).padStart(2, '0');
        const res = await fetch(`./data/${paddedGrade}/05_olcme_degerlendirme/unite_degerlendirme.json`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

function renderTestPrompt(container, testType, assessmentData, grade, unitId, gradeInfo, preTestResult) {
    const isPreTest = testType === 'on_test';
    const title = isPreTest ? 'On-Test (Baslangicc Seviyesi)' : 'Son-Test (Bitis Seviyesi)';
    const description = isPreTest
        ? 'Bu test, uniteye baslamadan onceki bilgi seviyeni olcmek icindir. Rahatca cevapla, bilmedigin sorular olabilir!'
        : 'Uniteyi tamamladin! Simdi ne kadar ogrendiigini gorelim.';

    // Unite icin soruları bul
    const unitQuestions = findUnitQuestions(assessmentData, unitId, testType);

    if (!unitQuestions || unitQuestions.length === 0) {
        container.innerHTML = `
            <div class="card text-center" style="padding:2rem;">
                <p class="text-muted">Bu unite icin ${isPreTest ? 'on-test' : 'son-test'} sorulari bulunamadi.</p>
                <a href="#/sinif/${grade}" class="btn btn-primary mt-lg">Derslere Don</a>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div class="card anim-fade-in-up" style="padding:2rem; text-align:center;">
            <span style="font-size:3rem;">${isPreTest ? '&#128203;' : '&#127891;'}</span>
            <h2 class="mt-md">${title}</h2>
            <p class="text-muted mt-sm">${description}</p>
            <p class="mt-md"><strong>${unitQuestions.length} soru</strong></p>
            ${preTestResult ? `
                <div class="card mt-lg" style="padding:1rem; background:var(--bg-secondary);">
                    <p class="text-muted">On-test sonucun: <strong>%${preTestResult.percent}</strong></p>
                </div>
            ` : ''}
            <button class="btn btn-primary btn-lg mt-xl" id="start-test">Teste Basla</button>
        </div>`;

    container.querySelector('#start-test').addEventListener('click', () => {
        runTest(container, unitQuestions, testType, grade, unitId, gradeInfo);
    });
}

function findUnitQuestions(assessmentData, unitId, testType) {
    if (!assessmentData) return [];

    // unite_degerlendirme.json formatina gore sorulari bul
    if (Array.isArray(assessmentData)) {
        const unitAssessment = assessmentData.find(a => a.unite_id === unitId);
        if (unitAssessment) {
            return unitAssessment[testType] || unitAssessment.sorular || [];
        }
        // Fallback: tum sorulardan unite'ye ait olanlari sec
        return assessmentData.filter(q => q.unite_id === unitId).slice(0, 10);
    }

    if (assessmentData[unitId]) {
        return assessmentData[unitId][testType] || assessmentData[unitId].sorular || [];
    }

    return [];
}

function runTest(container, questions, testType, grade, unitId, gradeInfo) {
    let currentQ = 0;
    const answers = [];

    function renderQuestion() {
        const q = questions[currentQ];
        const secenekler = q.secenekler || q.options || [];
        const total = questions.length;

        container.innerHTML = `
            <div class="test-question anim-fade-in-up">
                <div class="test-progress" style="margin-bottom:1.5rem;">
                    <div class="flex justify-between items-center mb-sm">
                        <span class="text-muted">Soru ${currentQ + 1} / ${total}</span>
                        <span class="badge badge-info">${testType === 'on_test' ? 'On-Test' : 'Son-Test'}</span>
                    </div>
                    <div class="progress-bar" style="height:6px;">
                        <div class="fill" style="width:${((currentQ) / total) * 100}%; transition:width 0.3s;"></div>
                    </div>
                </div>

                <div class="card" style="padding:1.5rem;">
                    <h3 style="line-height:1.6;">${q.soru || q.question || q.soru_metni || ''}</h3>

                    <div class="test-options mt-lg" style="display:flex; flex-direction:column; gap:0.75rem;">
                        ${secenekler.map((s, i) => {
                            const label = typeof s === 'string' ? s : (s.metin || s.text || s);
                            const value = typeof s === 'string' ? String.fromCharCode(65 + i) : (s.harf || String.fromCharCode(65 + i));
                            return `
                                <button class="btn btn-outline test-option" data-value="${value}" style="text-align:left; padding:0.75rem 1rem; justify-content:flex-start;">
                                    <span style="font-weight:700; margin-right:0.75rem; color:var(--primary);">${value})</span>
                                    ${label}
                                </button>`;
                        }).join('')}
                    </div>
                </div>
            </div>`;

        container.querySelectorAll('.test-option').forEach(btn => {
            btn.addEventListener('click', () => {
                answers.push(btn.dataset.value);
                currentQ++;
                if (currentQ < questions.length) {
                    renderQuestion();
                } else {
                    finishTest();
                }
            });
        });
    }

    function finishTest() {
        // Puanla
        let correct = 0;
        questions.forEach((q, i) => {
            const dogru = q.dogru_cevap || q.correct || q.dogru;
            if (answers[i] === dogru) correct++;
        });

        const total = questions.length;
        const percent = Math.round((correct / total) * 100);

        // Kaydet
        store.savePrePostResult(grade, unitId, testType, correct, total);

        // Mevcut diger test sonucunu kontrol et
        const existing = store.getPrePostResult(grade, unitId);

        container.innerHTML = `
            <div class="card anim-fade-in-up text-center" style="padding:2rem;">
                <span style="font-size:4rem;">${percent >= 70 ? '&#127881;' : percent >= 40 ? '&#128170;' : '&#128218;'}</span>
                <h2 class="mt-md">${testType === 'on_test' ? 'On-Test' : 'Son-Test'} Tamamlandi!</h2>
                <div class="mt-lg" style="font-size:2.5rem; font-weight:700; color:${percent >= 70 ? 'var(--success)' : percent >= 40 ? 'var(--warning)' : 'var(--primary)'};">
                    %${percent}
                </div>
                <p class="text-muted mt-sm">${correct} / ${total} dogru</p>

                ${testType === 'on_test' ? `
                    <p class="mt-lg">${getMessage('daily')}</p>
                    <a href="#/sinif/${grade}" class="btn btn-primary mt-lg">Derslere Git ve Ogren!</a>
                ` : ''}

                ${testType === 'son_test' && existing?.on_test ? `
                    <div class="comparison-card card mt-xl" style="padding:1.5rem; background:var(--bg-secondary);">
                        <h3>&#128200; Gelisim Karsilastirmasi</h3>
                        <div style="display:flex; justify-content:center; align-items:center; gap:2rem; margin-top:1rem;">
                            <div style="text-align:center;">
                                <div class="text-muted">On-Test</div>
                                <div style="font-size:2rem; font-weight:700;">%${existing.on_test.percent}</div>
                            </div>
                            <div style="font-size:2rem; color:${percent > existing.on_test.percent ? 'var(--success)' : 'var(--warning)'};">
                                &#8594;
                            </div>
                            <div style="text-align:center;">
                                <div class="text-muted">Son-Test</div>
                                <div style="font-size:2rem; font-weight:700; color:var(--success);">%${percent}</div>
                            </div>
                        </div>
                        <p class="mt-md" style="color:var(--success); font-weight:600;">
                            ${percent > existing.on_test.percent
                                ? `+${percent - existing.on_test.percent} puan gelisim! Tebrikler!`
                                : percent === existing.on_test.percent
                                    ? 'Ayni seviyedesin. Tekrar calismaya devam!'
                                    : 'Biraz daha calisma gerekebilir. Pes etme!'}
                        </p>
                    </div>
                    <a href="#/sinif/${grade}" class="btn btn-primary mt-xl">Ana Sayfaya Don</a>
                ` : ''}

                ${testType === 'son_test' && !existing?.on_test ? `
                    <a href="#/sinif/${grade}" class="btn btn-primary mt-lg">Ana Sayfaya Don</a>
                ` : ''}
            </div>`;
    }

    renderQuestion();
}

function renderComparison(container, results, grade, unitId, gradeInfo) {
    const pre = results.on_test;
    const post = results.son_test;
    const improvement = post.percent - pre.percent;

    container.innerHTML = `
        <div class="card anim-fade-in-up" style="padding:2rem; text-align:center;">
            <span style="font-size:3rem;">&#128200;</span>
            <h2 class="mt-md">Unite Gelisim Raporu</h2>

            <div style="display:flex; justify-content:center; align-items:center; gap:3rem; margin-top:2rem;">
                <div style="text-align:center;">
                    <div class="text-muted" style="font-size:0.85rem;">On-Test</div>
                    <div style="font-size:3rem; font-weight:700; color:var(--text-muted);">%${pre.percent}</div>
                    <div class="text-muted" style="font-size:0.8rem;">${pre.score}/${pre.total} dogru</div>
                </div>
                <div style="font-size:3rem; color:${improvement > 0 ? 'var(--success)' : 'var(--warning)'};">
                    &#8594;
                </div>
                <div style="text-align:center;">
                    <div class="text-muted" style="font-size:0.85rem;">Son-Test</div>
                    <div style="font-size:3rem; font-weight:700; color:var(--success);">%${post.percent}</div>
                    <div class="text-muted" style="font-size:0.8rem;">${post.score}/${post.total} dogru</div>
                </div>
            </div>

            <div class="improvement-badge mt-xl" style="
                display:inline-block; padding:0.75rem 1.5rem; border-radius:20px;
                background:${improvement > 0 ? 'var(--success-light, #d4edda)' : 'var(--warning-light, #fff3cd)'};
                color:${improvement > 0 ? 'var(--success)' : 'var(--warning)'};
                font-weight:700; font-size:1.2rem;">
                ${improvement > 0 ? `+${improvement} puan gelisim!` : improvement === 0 ? 'Ayni seviye' : `${improvement} puan`}
            </div>

            <div class="mt-xl" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
                <button class="btn btn-outline" id="retake-test">Testi Tekrarla</button>
                <a href="#/sinif/${grade}" class="btn btn-primary">Derslere Don</a>
            </div>
        </div>`;

    container.querySelector('#retake-test')?.addEventListener('click', async () => {
        const assessmentData = await fetchAssessmentData(grade);
        if (assessmentData) {
            const questions = findUnitQuestions(assessmentData, unitId, 'son_test');
            if (questions.length > 0) {
                runTest(container, questions, 'son_test', grade, unitId, gradeInfo);
            }
        }
    });
}
