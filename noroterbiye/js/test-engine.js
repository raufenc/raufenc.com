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
      const W = 800, H = 500;
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const ctx = c.getContext('2d');
      const pct = data.pct || 0;
      const color = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444';
      const colorSoft = pct >= 70 ? 'rgba(16,185,129,0.15)' : pct >= 40 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';

      // ── Arka plan: koyu gradient ──
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#080818');
      bg.addColorStop(0.5, '#0e0e28');
      bg.addColorStop(1, '#0a0a20');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Ambient glow (skor renginde) ──
      const glow = ctx.createRadialGradient(W/2, 200, 0, W/2, 200, 250);
      glow.addColorStop(0, colorSoft);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // ── İndigo ambient (sol üst) ──
      const glow2 = ctx.createRadialGradient(100, 50, 0, 100, 50, 300);
      glow2.addColorStop(0, 'rgba(99,102,241,0.08)');
      glow2.addColorStop(1, 'transparent');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, W, H);

      // ── Üst gradient çizgi ──
      const topLine = ctx.createLinearGradient(0, 0, W, 0);
      topLine.addColorStop(0, '#6366f1');
      topLine.addColorStop(0.5, '#06b6d4');
      topLine.addColorStop(1, '#6366f1');
      ctx.fillStyle = topLine;
      ctx.fillRect(0, 0, W, 3);

      // ── Beyin emoji (büyük, soluk) ──
      ctx.globalAlpha = 0.06;
      ctx.font = '180px serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText('🧠', W/2, 280);
      ctx.globalAlpha = 1;

      // ── Marka: NöroTerbiye ──
      ctx.fillStyle = '#555580';
      ctx.font = '600 11px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText('N Ö R O T E R B İ Y E', W/2, 36);

      // ── Test başlığı ──
      ctx.fillStyle = '#c8c8e0';
      ctx.font = '600 18px system-ui, -apple-system, sans-serif';
      ctx.fillText(title, W/2, 70);

      // ── Ayırıcı çizgi ──
      ctx.strokeStyle = 'rgba(99,102,241,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W/2 - 100, 85);
      ctx.lineTo(W/2 + 100, 85);
      ctx.stroke();

      // ── SKOR (büyük, gradient) ──
      ctx.font = '800 96px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = color;
      ctx.fillText('%' + pct, W/2, 200);

      // ── Skor halkası (arc) ──
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(W/2, 170, 130, 0, Math.PI * 2);
      ctx.stroke();
      // Dolgu arc
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(W/2, 170, 130, -Math.PI/2, -Math.PI/2 + (pct/100) * Math.PI * 2);
      ctx.stroke();

      // ── Label ──
      ctx.fillStyle = '#e8e8f0';
      ctx.font = '700 26px system-ui, -apple-system, sans-serif';
      ctx.fillText(data.label || '', W/2, 260);

      // ── Tarih ──
      ctx.fillStyle = '#666690';
      ctx.font = '13px system-ui, -apple-system, sans-serif';
      const dateStr = data.date ? new Date(data.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      ctx.fillText(dateStr, W/2, 295);

      // ── Progress bar ──
      const barX = 100, barY = 330, barW = W - 200, barH = 10, barR = 5;
      // Arka plan
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, barR);
      ctx.fill();
      // Dolgu
      if (pct > 0) {
        const barGrad = ctx.createLinearGradient(barX, 0, barX + barW * (pct/100), 0);
        barGrad.addColorStop(0, '#6366f1');
        barGrad.addColorStop(1, color);
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(barX, barY, Math.max(barW * (pct/100), barH), barH, barR);
        ctx.fill();
      }

      // ── Alt bölüm: ince çizgi ──
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 380);
      ctx.lineTo(W - 60, 380);
      ctx.stroke();

      // ── Footer ──
      ctx.fillStyle = '#444468';
      ctx.font = '12px system-ui, -apple-system, sans-serif';
      ctx.fillText('raufenc.com/noroterbiye', W/2, 420);
      ctx.fillStyle = '#333350';
      ctx.font = '10px system-ui, -apple-system, sans-serif';
      ctx.fillText('Bu test teşhis koymaz; farkındalık oluşturur.', W/2, 445);

      // ── Sol alt: kitap adı ──
      ctx.textAlign = 'left';
      ctx.fillStyle = '#333350';
      ctx.font = '10px system-ui, -apple-system, sans-serif';
      ctx.fillText('NöroTerbiye — İçindeki Düşmanı Dosta Çevirmek', 30, H - 15);

      // ── Sağ alt: Rauf Enç ──
      ctx.textAlign = 'right';
      ctx.fillText('Rauf Enç · KTB Yayınları', W - 30, H - 15);

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
