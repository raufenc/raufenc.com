// ====== MİNİ OYUNLAR ======

const MiniGames = {
  // ====== HIZLI CEVAP — 60 saniyede kac soru ======
  renderHizliCevap(container) {
    const allQuestions = [];
    DERSLER.forEach(d => d.uniteler.forEach(u => {
      (u.checkpoints || []).forEach(c => allQuestions.push({ ...c, ders: d.name, icon: d.icon }));
    }));
    if (allQuestions.length < 5) { container.innerHTML = '<p>Yeterli soru yok. Önce birkaç ders tamamla.</p>'; return; }

    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    let idx = 0, score = 0, timeLeft = 60, timer = null, gameOver = false;

    function render() {
      if (gameOver || idx >= shuffled.length) { endGame(); return; }
      const q = shuffled[idx];
      container.innerHTML = `
        <div class="game-hud">
          <span class="game-timer">⏱️ ${timeLeft}s</span>
          <span class="game-score">✅ ${score} doğru</span>
        </div>
        <div class="game-question">
          <p class="game-q-text">${q.soru}</p>
          <div class="game-options">
            ${q.secenekler.map((s, i) => `<button class="game-opt" onclick="MiniGames._hizliAnswer(${i})">${s}</button>`).join('')}
          </div>
        </div>`;
    }

    function endGame() {
      gameOver = true;
      if (timer) clearInterval(timer);
      const xpEarned = Math.min(50, score * 5);
      if (xpEarned > 0) Store.addXP(xpEarned);
      if (window.AudioFX) AudioFX.play('complete');
      container.innerHTML = `
        <div class="game-result">
          <h2>⏱️ Süre Doldu!</h2>
          <div class="game-result-stats">
            <div class="game-rs"><span class="game-rs-val">${score}</span><span>Doğru</span></div>
            <div class="game-rs"><span class="game-rs-val">${idx}</span><span>Toplam</span></div>
            <div class="game-rs"><span class="game-rs-val">+${xpEarned}</span><span>XP</span></div>
          </div>
          <button class="btn btn-primary" onclick="navigate('#/oyunlar')">Tekrar Oyna</button>
        </div>`;
    }

    this._hizliAnswer = function(i) {
      if (gameOver) return;
      const q = shuffled[idx];
      if (i === q.dogru) {
        score++;
        if (window.AudioFX) AudioFX.play('correct');
      } else {
        if (window.AudioFX) AudioFX.play('wrong');
      }
      idx++;
      render();
    };

    timer = setInterval(() => {
      timeLeft--;
      const el = container.querySelector('.game-timer');
      if (el) el.textContent = `⏱️ ${timeLeft}s`;
      if (timeLeft <= 0) endGame();
    }, 1000);

    render();
  },

  // ====== HAFIZA KARTLARI — eslestirme ======
  renderHafizaKartlari(container) {
    const pairs = [];
    DERSLER.forEach(d => d.uniteler.forEach(u => {
      (u.checkpoints || []).forEach(c => {
        if (c.secenekler && c.dogru !== undefined) {
          pairs.push({ q: c.soru.length > 40 ? c.soru.slice(0,37)+'...' : c.soru, a: c.secenekler[c.dogru] });
        }
      });
    }));
    if (pairs.length < 6) { container.innerHTML = '<p>Yeterli veri yok.</p>'; return; }

    const selected = pairs.sort(() => Math.random() - 0.5).slice(0, 6);
    const cards = [];
    selected.forEach((p, i) => {
      cards.push({ id: i, type: 'q', text: p.q, pairId: i });
      cards.push({ id: i, type: 'a', text: p.a, pairId: i });
    });
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    let flipped = [], matched = new Set(), moves = 0, locked = false;

    function render() {
      container.innerHTML = `
        <div class="game-hud"><span>Hamle: ${moves}</span><span>Eşleşen: ${matched.size}/${selected.length}</span></div>
        <div class="memory-grid">
          ${shuffledCards.map((c, i) => {
            const isFlipped = flipped.includes(i) || matched.has(c.pairId);
            return `<button class="memory-card ${isFlipped ? 'memory-flipped' : ''} ${matched.has(c.pairId) ? 'memory-matched' : ''}"
              onclick="MiniGames._memoryClick(${i})" ${isFlipped ? 'disabled' : ''}>
              <span class="memory-front">${isFlipped ? c.text : '?'}</span>
            </button>`;
          }).join('')}
        </div>`;
    }

    this._memoryClick = function(i) {
      if (locked || flipped.includes(i) || matched.has(shuffledCards[i].pairId)) return;
      flipped.push(i);
      if (window.AudioFX) AudioFX.play('click');
      render();

      if (flipped.length === 2) {
        locked = true;
        moves++;
        const c1 = shuffledCards[flipped[0]], c2 = shuffledCards[flipped[1]];
        if (c1.pairId === c2.pairId && c1.type !== c2.type) {
          matched.add(c1.pairId);
          if (window.AudioFX) AudioFX.play('correct');
          flipped = [];
          locked = false;
          render();
          if (matched.size === selected.length) {
            const xpEarned = Math.min(50, Math.max(10, 50 - moves));
            Store.addXP(xpEarned);
            if (window.AudioFX) AudioFX.play('celebrate');
            setTimeout(() => {
              container.innerHTML = `<div class="game-result"><h2>Tebrikler! 🎉</h2>
                <p>${moves} hamlede tamamladın!</p><p>+${xpEarned} XP</p>
                <button class="btn btn-primary" onclick="navigate('#/oyunlar')">Tekrar Oyna</button></div>`;
            }, 500);
          }
        } else {
          if (window.AudioFX) AudioFX.play('wrong');
          setTimeout(() => { flipped = []; locked = false; render(); }, 1000);
        }
      }
    };

    render();
  },

  // ====== KELİME AVI — grid'de kelime bul ======
  renderKelimeAvi(container) {
    const words = [];
    DERSLER.forEach(d => d.uniteler.forEach(u => {
      const w = u.name.split(' ').filter(x => x.length >= 4 && x.length <= 8);
      w.forEach(word => words.push(word.toUpperCase()));
    }));
    if (words.length < 3) { container.innerHTML = '<p>Yeterli kelime yok.</p>'; return; }

    const selected = [...new Set(words)].sort(() => Math.random() - 0.5).slice(0, 5);
    const size = 10;
    const grid = Array.from({length: size}, () => Array(size).fill(''));
    const LETTERS = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const found = new Set();

    // Kelimeleri yerlestir (yatay)
    selected.forEach(word => {
      for (let attempts = 0; attempts < 50; attempts++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * (size - word.length + 1));
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          if (grid[row][col + i] && grid[row][col + i] !== word[i]) { fits = false; break; }
        }
        if (fits) {
          for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
          break;
        }
      }
    });

    // Bos hucreleri rastgele harf ile doldur
    for (let r = 0; r < size; r++)
      for (let c = 0; c < size; c++)
        if (!grid[r][c]) grid[r][c] = LETTERS[Math.floor(Math.random() * LETTERS.length)];

    let selectedCells = [];

    function render() {
      container.innerHTML = `
        <div class="game-hud"><span>Bulunan: ${found.size}/${selected.length}</span></div>
        <div class="word-list">${selected.map(w => `<span class="word-tag ${found.has(w) ? 'word-found' : ''}">${w}</span>`).join('')}</div>
        <div class="word-grid">
          ${grid.map((row, r) => row.map((cell, c) =>
            `<button class="wg-cell ${selectedCells.some(s => s.r===r && s.c===c) ? 'wg-selected' : ''}"
              onclick="MiniGames._wordClick(${r},${c})">${cell}</button>`
          ).join('')).join('')}
        </div>`;
    }

    this._wordClick = function(r, c) {
      const existing = selectedCells.findIndex(s => s.r === r && s.c === c);
      if (existing >= 0) { selectedCells.splice(existing, 1); render(); return; }
      selectedCells.push({r, c});
      // Check if selection forms a word
      const text = selectedCells.map(s => grid[s.r][s.c]).join('');
      const match = selected.find(w => w === text && !found.has(w));
      if (match) {
        found.add(match);
        if (window.AudioFX) AudioFX.play('correct');
        selectedCells = [];
        if (found.size === selected.length) {
          Store.addXP(30);
          if (window.AudioFX) AudioFX.play('celebrate');
          setTimeout(() => {
            container.innerHTML = `<div class="game-result"><h2>Hepsini Buldun! 🎉</h2><p>+30 XP</p>
              <button class="btn btn-primary" onclick="navigate('#/oyunlar')">Tekrar Oyna</button></div>`;
          }, 500);
          return;
        }
      } else if (selectedCells.length > 8) {
        selectedCells = [];
      }
      render();
    };

    render();
  }
};

window.MiniGames = MiniGames;
