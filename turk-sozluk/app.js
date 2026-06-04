const state = {
  data: null,
  records: [],
  favorites: new Set(),
  query: "",
  mode: "both",
  letter: "all",
  onlyFavorites: false,
  sort: "source",
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  clearButton: document.querySelector("#clearButton"),
  letterGrid: document.querySelector("#letterGrid"),
  letterChart: document.querySelector("#letterChart"),
  resultsList: document.querySelector("#resultsList"),
  emptyState: document.querySelector("#emptyState"),
  totalCount: document.querySelector("#totalCount"),
  visibleCount: document.querySelector("#visibleCount"),
  letterCount: document.querySelector("#letterCount"),
  statusLine: document.querySelector("#statusLine"),
  resultsTitle: document.querySelector("#resultsTitle"),
  favoriteBadge: document.querySelector("#favoriteBadge"),
  favoritesToggle: document.querySelector("#favoritesToggle"),
  resetFilters: document.querySelector("#resetFilters"),
  sortSelect: document.querySelector("#sortSelect"),
  copyVisibleButton: document.querySelector("#copyVisibleButton"),
  randomButton: document.querySelector("#randomButton"),
  sourceLink: document.querySelector("#sourceLink"),
  sourceName: document.querySelector("#sourceName"),
  fetchDate: document.querySelector("#fetchDate"),
  toast: document.querySelector("#toast"),
};

const icons = {
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9Z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8h10v12H8z"/><path d="M6 16H4V4h12v2"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/><path d="M5 5v14h14"/></svg>',
};

const collator = new Intl.Collator("tr", { sensitivity: "base" });

function normalize(value) {
  return String(value)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[’']/g, "")
    .trim();
}

function getFavorites() {
  try {
    return new Set(JSON.parse(localStorage.getItem("turkSozlukFavorites") || "[]"));
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  localStorage.setItem("turkSozlukFavorites", JSON.stringify([...state.favorites]));
}

function splitMeanings(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getLetterCounts(records) {
  return records.reduce((acc, record) => {
    acc.set(record.letter, (acc.get(record.letter) || 0) + 1);
    return acc;
  }, new Map());
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getFilteredRecords() {
  const query = normalize(state.query);
  let rows = state.records.filter((record) => {
    const source = normalize(record.source);
    const target = normalize(record.target);
    const matchesQuery =
      !query ||
      (state.mode === "source" && source.includes(query)) ||
      (state.mode === "target" && target.includes(query)) ||
      (state.mode === "both" && (source.includes(query) || target.includes(query)));
    const matchesLetter = state.letter === "all" || record.letter === state.letter;
    const matchesFavorite = !state.onlyFavorites || state.favorites.has(record.id);
    return matchesQuery && matchesLetter && matchesFavorite;
  });

  rows = [...rows].sort((a, b) => {
    if (state.sort === "target") return collator.compare(a.target, b.target);
    if (state.sort === "letter") {
      const byLetter = collator.compare(a.letter, b.letter);
      return byLetter || collator.compare(a.source, b.source);
    }
    return collator.compare(a.source, b.source);
  });

  return rows;
}

function renderLetters() {
  const counts = getLetterCounts(state.records);
  const letters = state.data.meta.letters.map((item) => item.letter);
  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = `letter-button${state.letter === "all" ? " active" : ""}`;
  allButton.dataset.letter = "all";
  allButton.innerHTML = `T<span>${state.records.length}</span>`;
  allButton.title = "Tüm kayıtlar";
  els.letterGrid.append(allButton);

  for (const letter of letters) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `letter-button${state.letter === letter ? " active" : ""}`;
    button.dataset.letter = letter;
    button.innerHTML = `${escapeText(letter)}<span>${counts.get(letter) || 0}</span>`;
    button.title = `${letter} harfi`;
    els.letterGrid.append(button);
  }
}

function renderChart() {
  const counts = getLetterCounts(state.records);
  const max = Math.max(...counts.values());
  const topLetters = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  els.letterChart.innerHTML = topLetters
    .map(([letter, count]) => {
      const width = Math.max(5, Math.round((count / max) * 100));
      return `
        <div class="chart-row">
          <span>${escapeText(letter)}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${width}%"></span></span>
          <span>${count}</span>
        </div>
      `;
    })
    .join("");
}

function renderResults(rows) {
  els.resultsList.innerHTML = "";
  els.emptyState.hidden = rows.length > 0;

  const fragment = document.createDocumentFragment();
  for (const record of rows) {
    const card = document.createElement("article");
    card.className = "result-card";
    card.dataset.id = record.id;

    const meanings = splitMeanings(record.target);
    const meaningHtml = meanings.length
      ? meanings.map((item) => `<span class="meaning">${escapeText(item)}</span>`).join("")
      : `<span class="meaning">${escapeText(record.target)}</span>`;

    const isFavorite = state.favorites.has(record.id);
    card.innerHTML = `
      <div class="word-cell">
        <div class="word">${escapeText(record.source)}</div>
        <span class="letter-tag">${escapeText(record.letter)}</span>
      </div>
      <div class="target-cell">${meaningHtml}</div>
      <div class="card-actions">
        <button type="button" class="${isFavorite ? "is-favorite" : ""}" data-action="favorite" title="Favori" aria-label="Favori">${icons.star}</button>
        <button type="button" data-action="copy" title="Kopyala" aria-label="Kopyala">${icons.copy}</button>
        <a href="${escapeText(record.sourceUrl)}" target="_blank" rel="noreferrer" title="Kaynakta aç" aria-label="Kaynakta aç">${icons.external}</a>
      </div>
    `;
    fragment.append(card);
  }

  els.resultsList.append(fragment);
}

function renderSummary(rows) {
  els.totalCount.textContent = state.records.length.toLocaleString("tr-TR");
  els.visibleCount.textContent = rows.length.toLocaleString("tr-TR");
  els.letterCount.textContent = state.data.meta.letters.length.toLocaleString("tr-TR");
  els.favoriteBadge.textContent = state.favorites.size.toLocaleString("tr-TR");
  els.favoritesToggle.setAttribute("aria-pressed", String(state.onlyFavorites));
  els.clearButton.classList.toggle("visible", state.query.length > 0);

  const queryPart = state.query ? `"${state.query}"` : "Tüm kayıtlar";
  const letterPart = state.letter === "all" ? "" : `, ${state.letter} harfi`;
  const favoritePart = state.onlyFavorites ? ", favoriler" : "";
  els.resultsTitle.textContent = state.letter === "all" ? "Kayıtlar" : `${state.letter} Harfi`;
  els.statusLine.textContent = `${queryPart}${letterPart}${favoritePart}: ${rows.length.toLocaleString("tr-TR")} sonuç`;
}

function render() {
  const rows = getFilteredRecords();
  els.letterGrid.innerHTML = "";
  renderLetters();
  renderResults(rows);
  renderSummary(rows);
  return rows;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.remove("visible");
  }, 1800);
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    showToast(message);
  }
}

function resetFilters() {
  state.query = "";
  state.letter = "all";
  state.onlyFavorites = false;
  state.mode = "both";
  state.sort = "source";
  els.searchInput.value = "";
  els.sortSelect.value = "source";
  document.querySelectorAll(".segment").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === "both");
  });
  render();
}

function attachEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  els.clearButton.addEventListener("click", () => {
    state.query = "";
    els.searchInput.value = "";
    els.searchInput.focus();
    render();
  });

  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      render();
    });
  });

  els.letterGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".letter-button");
    if (!button) return;
    state.letter = button.dataset.letter;
    render();
  });

  els.resultsList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const card = event.target.closest(".result-card");
    const record = state.records.find((item) => item.id === card.dataset.id);
    if (!record) return;

    if (actionButton.dataset.action === "favorite") {
      if (state.favorites.has(record.id)) {
        state.favorites.delete(record.id);
      } else {
        state.favorites.add(record.id);
      }
      saveFavorites();
      render();
      return;
    }

    if (actionButton.dataset.action === "copy") {
      copyText(`${record.source}: ${record.target}`, "Kayıt kopyalandı.");
    }
  });

  els.favoritesToggle.addEventListener("click", () => {
    state.onlyFavorites = !state.onlyFavorites;
    render();
  });

  els.resetFilters.addEventListener("click", resetFilters);

  els.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  els.copyVisibleButton.addEventListener("click", () => {
    const rows = getFilteredRecords();
    const text = rows.map((record) => `${record.source}\t${record.target}`).join("\n");
    copyText(text, `${rows.length.toLocaleString("tr-TR")} kayıt kopyalandı.`);
  });

  els.randomButton.addEventListener("click", () => {
    const rows = getFilteredRecords();
    if (!rows.length) return showToast("Seçimde kayıt yok.");
    const record = rows[Math.floor(Math.random() * rows.length)];
    state.query = record.source;
    state.letter = record.letter;
    els.searchInput.value = record.source;
    render();
    document.querySelector(`[data-id="${CSS.escape(record.id)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

async function init() {
  state.favorites = getFavorites();
  attachEvents();

  try {
    const response = await fetch("data/sozluk.json");
    if (!response.ok) throw new Error(`Veri alınamadı: ${response.status}`);
    state.data = await response.json();
    state.records = state.data.records;
    els.sourceName.textContent = state.data.meta.sourceName;
    els.sourceLink.href = state.data.meta.sourceUrl;
    els.fetchDate.textContent = formatDate(state.data.meta.fetchedAt)
      ? `Derleme: ${formatDate(state.data.meta.fetchedAt)}`
      : "";
    renderChart();
    render();
  } catch (error) {
    els.statusLine.textContent = error.message;
    els.emptyState.hidden = false;
    els.emptyState.querySelector("strong").textContent = "Veri yüklenemedi.";
    els.emptyState.querySelector("span").textContent = "Yerel sunucuyu çalıştırıp tekrar dene.";
  }
}

init();
