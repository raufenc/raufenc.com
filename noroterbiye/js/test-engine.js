/* NöroTerbiye — Test Engine
 * Kullanım: sayfaya test sorularını ve config'i tanımla,
 * TestEngine.init(config) ile başlat.
 *
 * config = {
 *   containerId: 'test-area',
 *   questions: [...],      // { soru, secenekler: [{text, puan}], aciklama? }
 *   title: 'Test Adı',
 *   resultRanges: [        // Puan aralıklarına göre sonuç
 *     { min: 0, max: 25, label: '...', text: '...', emoji: '...' },
 *     ...
 *   ],
 *   onComplete: function(result) {} // opsiyonel callback
 * }
 */

const TestEngine = {
  state: { current: 0, answers: [], total: 0, totalScore: 0 },
  config: null,

  init(config) {
    this.config = config;
    this.state = { current: 0, answers: [], total: config.questions.length, totalScore: 0 };
    this.render();
  },

  render() {
    const { current, total } = this.state;
    const container = document.getElementById(this.config.containerId);

    if (current >= total) {
      this.showResult(container);
      return;
    }

    const q = this.config.questions[current];
    const pct = (current / total) * 100;

    container.innerHTML = `
      <div class="nt-quiz-progress">
        <div class="nt-quiz-progress-bar" style="width:${pct}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:20px">
        <span class="nt-label">Soru ${current + 1} / ${total}</span>
        ${current > 0 ? '<button class="nt-btn nt-btn-ghost nt-btn-sm" onclick="TestEngine.prev()">← Geri</button>' : ''}
      </div>
      <div class="nt-quiz-question">${q.soru}</div>
      <div id="options">
        ${q.secenekler.map((s, i) => `
          <button class="nt-quiz-option" onclick="TestEngine.answer(${i})">
            ${s.text}
          </button>
        `).join('')}
      </div>
    `;
  },

  answer(idx) {
    const q = this.config.questions[this.state.current];
    const secenek = q.secenekler[idx];
    this.state.answers[this.state.current] = { idx, puan: secenek.puan || 0 };
    this.state.totalScore = this.state.answers.reduce((sum, a) => sum + (a ? a.puan : 0), 0);

    // Kısa geri bildirim
    const options = document.querySelectorAll('.nt-quiz-option');
    options[idx].classList.add('selected');
    options.forEach(o => o.style.pointerEvents = 'none');

    if (q.aciklama) {
      const exp = document.createElement('div');
      exp.className = 'nt-quiz-explanation';
      exp.textContent = q.aciklama;
      document.getElementById('options').appendChild(exp);
    }

    setTimeout(() => {
      this.state.current++;
      this.render();
    }, q.aciklama ? 1500 : 600);
  },

  prev() {
    if (this.state.current > 0) {
      this.state.current--;
      this.render();
    }
  },

  showResult(container) {
    const { totalScore, total, answers } = this.state;
    const maxScore = this.config.questions.reduce((sum, q) =>
      sum + Math.max(...q.secenekler.map(s => s.puan || 0)), 0);
    const rawPct = Math.round((totalScore / maxScore) * 100);
    // Düşük puan = iyi olduğu için yüzdeyi tersle (kullanıcı %100 = en iyi görsün)
    const pct = 100 - rawPct;

    // Sonuç aralığını bul
    let result = this.config.resultRanges[this.config.resultRanges.length - 1];
    for (const r of this.config.resultRanges) {
      if (pct >= r.min && pct <= r.max) { result = r; break; }
    }

    // Sonucu kaydet (son sonuç + geçmiş)
    const key = this.config.slug || 'test';
    const entry = { pct, label: result.label, date: new Date().toISOString() };
    NT.save(`test_${key}`, entry);
    const history = NT.load(`test_${key}_history`, []);
    history.push(entry);
    if (history.length > 20) history.shift();
    NT.save(`test_${key}_history`, history);

    container.innerHTML = `
      <div class="nt-result">
        <div style="font-size:3rem;margin-bottom:12px">${result.emoji || '📊'}</div>
        <div class="nt-result-score">${pct}%</div>
        <div class="nt-result-label">${result.label}</div>
        <div class="nt-result-text">${result.text}</div>
        <p style="font-size:0.78rem;color:var(--muted);margin-bottom:24px">Bu test teşhis koymaz; farkındalık oluşturur.</p>
        <div class="nt-result-actions">
          <button class="nt-btn nt-btn-primary" onclick="NT.share('${this.config.title} Sonucum', 'Sonuç: ${result.label} (%${pct})', window.location.href)">
            Sonucumu Paylaş
          </button>
          <button class="nt-btn nt-btn-secondary" onclick="TestEngine.downloadResultCard()">
            📸 Sonuç Kartı İndir
          </button>
          <button class="nt-btn nt-btn-secondary" onclick="TestEngine.init(TestEngine.config)">
            Tekrar Dene
          </button>
          <a href="/noroterbiye/testler/" class="nt-btn nt-btn-ghost">
            Diğer Testler
          </a>
        </div>
        <div style="margin-top:32px">
          <a href="/noroterbiye/araclar/" class="nt-btn nt-btn-secondary nt-btn-sm">Planını Oluştur →</a>
        </div>
      </div>
    `;

    if (this.config.onComplete) this.config.onComplete({ pct, label: result.label, answers });
  },

  downloadResultCard() {
    const data = NT.load(`test_${this.config.slug || 'test'}`);
    if (!data) { NT.toast('Sonuç bulunamadı'); return; }
    const title = this.config.title || 'NöroTerbiye Test';

    NT.downloadImage(() => {
      const c = document.createElement('canvas');
      c.width = 600; c.height = 400;
      const ctx = c.getContext('2d');

      // roundRect polyfill (eski tarayıcılar için)
      function roundedRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      }

      // Arka plan
      const grad = ctx.createLinearGradient(0, 0, 600, 400);
      grad.addColorStop(0, '#0a0a1a');
      grad.addColorStop(1, '#1a1a3e');
      ctx.fillStyle = grad;
      roundedRect(0, 0, 600, 400, 16);
      ctx.fill();

      // Üst dekoratif çizgi
      ctx.fillStyle = '#6c5ce7';
      ctx.fillRect(0, 0, 600, 4);

      // Başlık
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, 300, 50);

      // Skor
      const pct = data.pct || 0;
      const color = pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444';
      ctx.fillStyle = color;
      ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
      ctx.fillText(pct + '%', 300, 160);

      // Etiket
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.fillText(data.label || '', 300, 210);

      // Tarih
      ctx.fillStyle = '#888888';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      const dateStr = data.date ? new Date(data.date).toLocaleDateString('tr-TR') : '';
      ctx.fillText(dateStr, 300, 250);

      // Alt bar (arka plan)
      ctx.fillStyle = '#1e1e3a';
      roundedRect(50, 290, 500, 8, 4);
      ctx.fill();
      // Alt bar (dolgu)
      if (pct > 0) {
        ctx.fillStyle = color;
        roundedRect(50, 290, Math.max(pct * 5, 8), 8, 4);
        ctx.fill();
      }

      // Footer
      ctx.fillStyle = '#555555';
      ctx.font = '12px system-ui, -apple-system, sans-serif';
      ctx.fillText('NöroTerbiye · raufenc.com/noroterbiye', 300, 350);
      ctx.fillText('Bu test teşhis koymaz; farkındalık oluşturur.', 300, 370);

      return c;
    }, title + '-Sonuç');
  }
};

/* Kavram Quiz Engine — soru bankasından rastgele quiz */
const KavramQuiz = {
  state: { current: 0, correct: 0, questions: [], total: 0 },

  init(sorular, count = 10) {
    // Rastgele seç
    const shuffled = [...sorular].sort(() => Math.random() - 0.5);
    this.state.questions = shuffled.slice(0, count);
    this.state.total = this.state.questions.length;
    this.state.current = 0;
    this.state.correct = 0;
    this.render();
  },

  render() {
    const { current, total } = this.state;
    const container = document.getElementById('quiz-area');

    if (current >= total) {
      this.showResult(container);
      return;
    }

    const q = this.state.questions[current];
    const pct = (current / total) * 100;
    const secenekler = Object.entries(q.secenekler).filter(([k,v]) => v);

    container.innerHTML = `
      <div class="nt-quiz-progress">
        <div class="nt-quiz-progress-bar" style="width:${pct}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:16px">
        <span class="nt-label">Soru ${current + 1} / ${total}</span>
        <span class="nt-tag nt-tag-${NT.temaRenk(q.tema)}">${q.tema}</span>
      </div>
      <div class="nt-quiz-question">${q.soru}</div>
      <div id="quiz-options">
        ${secenekler.map(([key, val]) => `
          <button class="nt-quiz-option" data-key="${key}" onclick="KavramQuiz.answer('${key}')">
            <span style="font-weight:600;margin-right:8px;color:var(--muted2)">${key}.</span> ${val}
          </button>
        `).join('')}
      </div>
    `;
  },

  answer(key) {
    const q = this.state.questions[this.state.current];
    const isCorrect = key === q.dogru;
    if (isCorrect) this.state.correct++;

    const options = document.querySelectorAll('.nt-quiz-option');
    options.forEach(o => {
      o.style.pointerEvents = 'none';
      if (o.dataset.key === q.dogru) o.classList.add('correct');
      else if (o.dataset.key === key && !isCorrect) o.classList.add('wrong');
    });

    if (q.aciklama) {
      const exp = document.createElement('div');
      exp.className = 'nt-quiz-explanation';
      exp.textContent = q.aciklama;
      document.getElementById('quiz-options').appendChild(exp);
    }

    setTimeout(() => {
      this.state.current++;
      this.render();
    }, 1800);
  },

  showResult(container) {
    const { correct, total } = this.state;
    const result = NT.calcScore(correct, total);

    container.innerHTML = `
      <div class="nt-result">
        <div class="nt-result-score">${correct}/${total}</div>
        <div class="nt-result-label">${result.label}</div>
        <div class="nt-result-text">${result.text}</div>
        <div class="nt-meter" style="max-width:300px;margin:0 auto 24px">
          <div class="nt-meter-fill" style="width:${result.pct}%;background:var(--nt-${result.pct >= 60 ? 'green' : result.pct >= 40 ? 'amber' : 'red'})"></div>
        </div>
        <div class="nt-result-actions">
          <button class="nt-btn nt-btn-primary" onclick="KavramQuiz.init(SORU_BANKASI_DATA)">Tekrar Dene</button>
          <a href="/noroterbiye/sozluk/" class="nt-btn nt-btn-secondary">Sözlüğe Git</a>
          <a href="/noroterbiye/testler/" class="nt-btn nt-btn-ghost">Diğer Testler</a>
        </div>
      </div>
    `;
  }
};
