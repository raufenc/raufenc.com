const data = window.IHO_UNIT2_DATA;
const Engine = window.IHOGameEngines;

const gameMenu = document.getElementById("gameMenu");
const gameArea = document.getElementById("gameArea");
const gameTitle = document.getElementById("gameTitle");
const gameInstruction = document.getElementById("gameInstruction");
const gameKicker = document.getElementById("gameKicker");
const activeType = document.getElementById("activeType");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

const gameTypeNames = {
  flashcards: "Kelime",
  matching: "Eşleştirme",
  category_sort: "Sınıflandırma",
  shopping_list: "Liste",
  price_quiz: "Fiyat",
  comparative_quiz: "Karşılaştırma",
  fill_blank: "Kalıp",
  sentence_order: "Cümle",
  dialogue_order: "Diyalog",
  word_search: "Kelime Avı",
  memory: "Hafıza",
  odd_one_out: "Ayırt Etme",
  multiple_choice: "Test",
  roleplay: "Rol",
  listening_select: "Dinleme"
};

const imageByType = {
  flashcards: "01-kelime.webp",
  matching: "06-hafiza.webp",
  category_sort: "11-sinif.webp",
  shopping_list: "24-pazar.webp",
  price_quiz: "30-cark.webp",
  comparative_quiz: "17-dogruyanlis.webp",
  fill_blank: "18-eksik.webp",
  sentence_order: "12-cumle.webp",
  dialogue_order: "05-dialog.webp",
  word_search: "10-karisik.webp",
  memory: "06-hafiza.webp",
  odd_one_out: "13-vur.webp",
  multiple_choice: "16-yaris.webp",
  roleplay: "19-kimben.webp",
  listening_select: "28-nisanci.webp"
};

let activeGameId = "";
let seedSalt = 1;

if (document.getElementById("gameCount")) document.getElementById("gameCount").textContent = String(data.games.length);
if (document.getElementById("wordCount")) document.getElementById("wordCount").textContent = String(data.vocabulary.length);
if (document.getElementById("dialogueCount")) document.getElementById("dialogueCount").textContent = String(data.dialogues.length);

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value;
    else if (key === "disabled") node.disabled = Boolean(value);
    else node.setAttribute(key, value);
  });
  const list = Array.isArray(children) ? children : [children];
  list.filter(child => child !== null && child !== undefined).forEach(child => {
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  });
  return node;
}

function ar(text, small = false) {
  return el("div", { class: small ? "ar small-ar" : "ar", text: text || "" });
}

function setScore(correct, total, label) {
  if (!total) {
    scoreText.textContent = label || "Hazır";
    return;
  }
  scoreText.textContent = `${correct}/${total}`;
}

function makeTracker(total, label) {
  const state = { correct: 0, total, done: new Set() };
  setScore(0, total, label);
  return {
    mark(key, ok) {
      if (state.done.has(key)) return;
      state.done.add(key);
      if (ok) state.correct += 1;
      setScore(state.correct, state.total);
    },
    set(correct) {
      state.correct = correct;
      setScore(state.correct, state.total);
    }
  };
}

function markNode(node, ok) {
  node.classList.remove("correct", "wrong");
  node.classList.add(ok ? "correct" : "wrong");
}

function feedback(text, ok) {
  return el("div", { class: ok ? "feedback ok" : "feedback no", text });
}

function renderMenu() {
  if (!gameMenu) return;
  gameMenu.innerHTML = "";
  data.games.forEach((game, index) => {
    const button = el("button", { class: "game-card", type: "button", "data-game": game.id }, [
      el("img", { src: `img/hub/${imageByType[game.type] || "01-kelime.webp"}`, alt: "", loading: "lazy" }),
      el("span", {}, [
        el("strong", { text: `${index + 1}. ${game.title_tr}` }),
        el("span", { class: "ar-title", text: game.title_ar }),
        el("small", { text: gameTypeNames[game.type] || game.type })
      ])
    ]);
    button.addEventListener("click", () => loadGame(game.id, true));
    gameMenu.appendChild(button);
  });
}

function activateMenu(gameId) {
  if (!gameMenu) return;
  document.querySelectorAll(".game-card").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.game === gameId);
  });
}

function loadGame(gameId, pushHash = false) {
  const meta = data.games.find(game => game.id === gameId) || data.games[0];
  activeGameId = meta.id;
  if (pushHash && !window.IHO_GAME_ID) history.replaceState(null, "", `#${meta.id}`);
  activateMenu(meta.id);
  if (activeType) activeType.textContent = gameTypeNames[meta.type] || meta.type;
  gameKicker.textContent = `${gameTypeNames[meta.type] || "Oyun"} - Ünite 2`;
  gameTitle.textContent = meta.title_tr;
  gameInstruction.textContent = meta.instructions_tr || "";
  gameArea.innerHTML = "";

  const game = Engine.createGame(meta, data, { seed: `${meta.id}-${seedSalt}` });
  const renderer = renderers[game.type] || renderRaw;
  renderer(game);
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    seedSalt += 1;
    loadGame(activeGameId || data.games[0].id);
  });
}

function renderFlashcards(game) {
  let index = 0;
  let flipped = false;
  const card = el("button", { class: "flash-card", type: "button" });
  const counter = el("div", { class: "item-card muted" });
  const next = el("button", { class: "primary-btn", type: "button", text: "Sonraki" });
  const prev = el("button", { class: "ghost-btn", type: "button", text: "Önceki" });
  const flip = el("button", { class: "ghost-btn", type: "button", text: "Çevir" });
  const side = el("div", { class: "flash-side" }, [
    counter,
    el("div", { class: "nav-row" }, [prev, flip, next])
  ]);
  const wrap = el("div", { class: "flash-wrap" }, [card, side]);
  gameArea.appendChild(wrap);

  function paint() {
    const item = game.cards[index];
    counter.textContent = `${index + 1}/${game.cards.length}`;
    card.innerHTML = "";
    if (flipped) {
      card.append(
        el("div", {}, [
          el("div", { class: "flash-emoji", text: item.emoji || "•" }),
          el("div", { class: "flash-tr", text: item.back }),
          el("div", { class: "flash-example", text: item.example || "" })
        ])
      );
    } else {
      card.append(
        el("div", {}, [
          el("div", { class: "flash-emoji", text: item.emoji || "•" }),
          ar(item.front),
          el("p", { class: "muted", text: "Kartı çevir" })
        ])
      );
    }
    setScore(index + 1, game.cards.length);
  }
  card.addEventListener("click", () => { flipped = !flipped; paint(); });
  flip.addEventListener("click", () => { flipped = !flipped; paint(); });
  next.addEventListener("click", () => { index = (index + 1) % game.cards.length; flipped = false; paint(); });
  prev.addEventListener("click", () => { index = (index - 1 + game.cards.length) % game.cards.length; flipped = false; paint(); });
  paint();
}

function renderMatching(game) {
  const tracker = makeTracker(game.pairs.length);
  const selected = { left: null, right: null };
  const board = el("div", { class: "matching-board" });
  const left = el("div", { class: "match-col" });
  const right = el("div", { class: "match-col" });
  const note = el("div", { class: "feedback" });

  function clearSelection() {
    [selected.left, selected.right].forEach(node => node && node.classList.remove("wrong"));
    selected.left = null;
    selected.right = null;
  }

  function check() {
    if (!selected.left || !selected.right) return;
    const ok = selected.left.dataset.id === selected.right.dataset.id;
    if (ok) {
      markNode(selected.left, true);
      markNode(selected.right, true);
      selected.left.disabled = true;
      selected.right.disabled = true;
      tracker.mark(selected.left.dataset.id, true);
      note.className = "feedback ok";
      note.textContent = "Doğru eşleşti.";
      selected.left = null;
      selected.right = null;
    } else {
      markNode(selected.left, false);
      markNode(selected.right, false);
      setTimeout(clearSelection, 550);
    }
  }

  game.left.forEach(item => {
    const button = el("button", { class: "choice", type: "button", "data-id": item.id }, [
      ar(`${item.emoji || ""} ${item.text}`, true)
    ]);
    button.addEventListener("click", () => { selected.left = button; check(); });
    left.appendChild(button);
  });
  game.right.forEach(item => {
    const button = el("button", { class: "choice", type: "button", "data-id": item.id, text: item.text });
    button.addEventListener("click", () => { selected.right = button; check(); });
    right.appendChild(button);
  });
  board.append(left, right);
  gameArea.append(board, note);
}

function renderCategorySort(game) {
  const tracker = makeTracker(game.items.length);
  const list = el("div", { class: "grid" });
  game.items.forEach(item => {
    const row = el("div", { class: "category-row" });
    const info = el("div", {}, [ar(`${item.emoji || ""} ${item.text}`), el("div", { class: "muted", text: item.tr })]);
    const actions = el("div", { class: "category-actions" });
    game.categories.forEach(category => {
      const button = el("button", { class: "ghost-btn", type: "button", text: category.title_tr });
      button.addEventListener("click", () => {
        const ok = item.category === category.id;
        markNode(row, ok);
        tracker.mark(item.id, ok);
        actions.querySelectorAll("button").forEach(btn => { btn.disabled = true; });
      });
      actions.appendChild(button);
    });
    row.append(info, actions);
    list.appendChild(row);
  });
  gameArea.appendChild(list);
}

function renderShoppingList(game) {
  const found = new Set();
  const tracker = makeTracker(game.targets.length);
  const targetList = el("div", { class: "target-list" });
  const targetNodes = new Map();
  game.targets.forEach(target => {
    const chip = el("div", { class: "target-chip", "data-id": target.id }, [
      ar(`${target.emoji || ""} ${target.text}`, true),
      el("div", { class: "muted", text: target.tr })
    ]);
    targetNodes.set(target.id, chip);
    targetList.appendChild(chip);
  });

  const shelf = el("div", { class: "shelf-grid" });
  game.shelf.forEach(item => {
    const button = el("button", { class: "shelf-item", type: "button" }, [
      el("span", { class: "emoji", text: item.emoji || "•" }),
      ar(item.text, true),
      el("span", { class: "muted", text: item.tr })
    ]);
    button.addEventListener("click", () => {
      const ok = game.targetIds.includes(item.id);
      markNode(button, ok);
      if (ok && !found.has(item.id)) {
        found.add(item.id);
        targetNodes.get(item.id)?.classList.add("done");
        button.disabled = true;
        tracker.set(found.size);
      }
    });
    shelf.appendChild(button);
  });
  gameArea.append(
    el("div", { class: "grid" }, [
      el("div", { class: "item-card" }, [el("h3", { text: "Liste" }), targetList]),
      el("div", { class: "item-card" }, [el("h3", { text: "Raf" }), shelf])
    ])
  );
}

function renderQuestionList(game) {
  const questions = game.questions || game.items || [];
  const tracker = makeTracker(questions.length);
  const list = el("div", { class: "question-list" });
  questions.forEach((question, index) => list.appendChild(questionCard(question, index, tracker)));
  gameArea.appendChild(list);
}

function questionCard(question, index, tracker) {
  const card = el("div", { class: "question-card" });
  const top = el("div", { class: "question-top" }, [
    el("div", {}, [
      ar(question.q_ar || question.sentence_ar || question.prompt_ar || "", true),
      el("div", { class: "muted", text: question.q_tr || question.tr || question.audio_key || "" })
    ]),
    el("div", { class: "question-number", text: String(index + 1) })
  ]);
  const choices = el("div", { class: "choices" });
  const buttons = [];
  (question.options || []).forEach(option => {
    const value = typeof option === "object" ? option.value : option;
    const label = typeof option === "object" ? option.label : option;
    const button = el("button", { class: "choice", type: "button" });
    button.appendChild(/[\u0600-\u06ff]/.test(String(label)) ? ar(String(label), true) : el("span", { text: String(label) }));
    button.addEventListener("click", () => {
      const ok = Engine.isCorrect(question.answer, value);
      markNode(button, ok);
      buttons.forEach(btn => {
        btn.disabled = true;
        if (Engine.isCorrect(question.answer, btn.dataset.value)) markNode(btn, true);
      });
      tracker.mark(question.id || `${index}-${question.answer}`, ok);
      card.appendChild(feedback(ok ? "Doğru." : "Doğru cevap işaretlendi.", ok));
    });
    button.dataset.value = String(value);
    buttons.push(button);
    choices.appendChild(button);
  });
  card.append(top, choices);
  return card;
}

function renderFillBlank(game) {
  renderQuestionList({ items: game.items });
}

function renderSentenceOrder(game) {
  const tracker = makeTracker(game.items.length);
  const list = el("div", { class: "question-list" });
  game.items.forEach((item, index) => {
    const card = el("div", { class: "question-card" });
    const chosen = [];
    const output = el("div", { class: "sentence-output ar small-ar" });
    const bank = el("div", { class: "token-bank" });
    item.shuffled.forEach(token => {
      const button = el("button", { class: "token ar small-ar", type: "button", text: token });
      button.addEventListener("click", () => {
        chosen.push(token);
        output.textContent = chosen.join(" ");
        button.disabled = true;
      });
      bank.appendChild(button);
    });
    const check = el("button", { class: "primary-btn", type: "button", text: "Kontrol" });
    const reset = el("button", { class: "ghost-btn", type: "button", text: "Sıfırla" });
    check.addEventListener("click", () => {
      const ok = Engine.isCorrect(item.answer_ar, chosen.join(" "));
      markNode(card, ok);
      tracker.mark(item.id, ok);
      check.disabled = true;
      bank.querySelectorAll("button").forEach(btn => { btn.disabled = true; });
      card.appendChild(feedback(ok ? "Cümle doğru kuruldu." : item.answer_ar, ok));
    });
    reset.addEventListener("click", () => {
      chosen.length = 0;
      output.textContent = "";
      bank.querySelectorAll("button").forEach(btn => { btn.disabled = false; btn.classList.remove("correct", "wrong"); });
    });
    card.append(
      el("div", { class: "question-number", text: String(index + 1) }),
      el("p", { class: "muted", text: item.tr }),
      output,
      bank,
      el("div", { class: "nav-row" }, [check, reset])
    );
    list.appendChild(card);
  });
  gameArea.appendChild(list);
}

function renderDialogueOrder(game) {
  const tracker = makeTracker(1);
  const chosen = [];
  const chosenLines = el("div", { class: "chosen-lines" });
  const stack = el("div", { class: "line-stack" });
  const check = el("button", { class: "primary-btn", type: "button", text: "Sırayı kontrol et" });
  const reset = el("button", { class: "ghost-btn", type: "button", text: "Sıfırla" });

  game.lines.forEach(line => {
    const button = el("button", { class: "line-button", type: "button" }, [
      el("span", { class: "speaker", text: line.speaker }),
      ar(line.ar, true),
      el("span", { class: "muted", text: line.tr })
    ]);
    button.addEventListener("click", () => {
      chosen.push(line.line_no);
      button.disabled = true;
      chosenLines.appendChild(el("div", { class: "item-card" }, [
        el("span", { class: "question-number", text: String(chosen.length) }),
        ar(line.ar, true)
      ]));
    });
    stack.appendChild(button);
  });
  check.addEventListener("click", () => {
    const ok = Engine.isCorrect(game.answer, chosen);
    tracker.mark("dialogue", ok);
    check.disabled = true;
    markNode(chosenLines, ok);
    gameArea.appendChild(feedback(ok ? "Diyalog sırası doğru." : "Doğru sıra: " + game.answer.join(", "), ok));
  });
  reset.addEventListener("click", () => loadGame(activeGameId));
  gameArea.append(
    el("div", { class: "grid two" }, [
      el("div", { class: "item-card" }, [el("h3", { text: game.dialogue?.title_tr || "Diyalog" }), stack]),
      el("div", { class: "item-card" }, [el("h3", { text: "Seçilen sıra" }), chosenLines, el("div", { class: "nav-row" }, [check, reset])])
    ])
  );
}

function renderWordSearch(game) {
  const tracker = makeTracker(game.words.length);
  const table = el("table", { class: "word-grid" });
  const cellMap = new Map();
  game.grid.forEach((row, r) => {
    const tr = el("tr");
    row.forEach((letter, c) => {
      const cell = el("td", { text: letter });
      cellMap.set(`${r},${c}`, cell);
      tr.appendChild(cell);
    });
    table.appendChild(tr);
  });
  const chips = el("div", { class: "word-list" });
  game.placements.forEach(place => {
    const chip = el("button", { class: "word-chip", type: "button", text: place.word });
    chip.addEventListener("click", () => {
      for (let i = 0; i < place.word.length; i += 1) {
        cellMap.get(`${place.r + place.dr * i},${place.c + place.dc * i}`)?.classList.add("found");
      }
      markNode(chip, true);
      chip.disabled = true;
      tracker.mark(place.word, true);
    });
    chips.appendChild(chip);
  });
  gameArea.append(el("div", { class: "wordsearch-layout" }, [table, el("div", { class: "item-card" }, [el("h3", { text: "Kelimeler" }), chips])]));
}

function renderMemory(game) {
  const tracker = makeTracker(game.cards.length / 2);
  const grid = el("div", { class: "memory-grid" });
  let opened = [];
  let locked = false;
  let matches = 0;
  game.cards.forEach(card => {
    const button = el("button", { class: "memory-card", type: "button", text: "؟" });
    button.addEventListener("click", () => {
      if (locked || button.classList.contains("correct") || opened.some(item => item.button === button)) return;
      button.classList.add("open");
      button.textContent = card.text;
      if (card.kind === "ar") button.classList.add("ar", "small-ar");
      opened.push({ button, card });
      if (opened.length === 2) {
        locked = true;
        const ok = opened[0].card.pair === opened[1].card.pair;
        if (ok) {
          opened.forEach(item => markNode(item.button, true));
          matches += 1;
          tracker.set(matches);
          opened = [];
          locked = false;
        } else {
          opened.forEach(item => markNode(item.button, false));
          setTimeout(() => {
            opened.forEach(item => {
              item.button.classList.remove("open", "wrong", "ar", "small-ar");
              item.button.textContent = "؟";
            });
            opened = [];
            locked = false;
          }, 700);
        }
      }
    });
    grid.appendChild(button);
  });
  gameArea.appendChild(grid);
}

function renderOdd(game) {
  const mapped = game.items.map(item => ({
    ...item,
    q_ar: "اختر الكلمة الغريبة",
    q_tr: item.reason_tr,
    options: item.choices,
    answer: item.odd
  }));
  renderQuestionList({ items: mapped });
}

function renderRoleplay(game) {
  setScore(0, 0, "Senaryo");
  const prompt = game.prompt;
  gameArea.append(
    el("div", { class: "role-grid" }, [
      el("div", { class: "role-card" }, [
        el("h3", { text: "Roller" }),
        ar(prompt.roles.join(" / "), true),
        el("p", { class: "muted", text: prompt.prompt_tr })
      ]),
      el("div", { class: "role-card" }, [
        el("h3", { text: "Ürünler" }),
        ar(`${prompt.product_a?.ar || ""} - ${prompt.product_a?.price || ""} ليرات`, true),
        ar(`${prompt.product_b?.ar || ""} - ${prompt.product_b?.price || ""} ليرات`, true)
      ])
    ]),
    el("div", { class: "item-card" }, [
      el("h3", { text: "Kalıplar" }),
      el("div", { class: "pattern-list" }, prompt.must_use_ar.map(text => el("span", { text })))
    ])
  );
}

function renderRaw(game) {
  setScore(0, 0, "Veri");
  gameArea.appendChild(el("pre", { text: JSON.stringify(game, null, 2) }));
}

const renderers = {
  flashcards: renderFlashcards,
  matching: renderMatching,
  category_sort: renderCategorySort,
  shopping_list: renderShoppingList,
  price_quiz: renderQuestionList,
  comparative_quiz: renderQuestionList,
  fill_blank: renderFillBlank,
  sentence_order: renderSentenceOrder,
  dialogue_order: renderDialogueOrder,
  word_search: renderWordSearch,
  memory: renderMemory,
  odd_one_out: renderOdd,
  multiple_choice: renderQuestionList,
  roleplay: renderRoleplay,
  listening_select: renderQuestionList
};

renderMenu();
const hashGame = location.hash.replace("#", "");
loadGame(window.IHO_GAME_ID || hashGame || data.games[0].id);
