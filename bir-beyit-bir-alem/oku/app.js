(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const ui = {
    reader: $("reader"), stage: $("stage"), surface: $("surface"),
    image: $("page-image"), label: $("current-label"), poet: $("current-poet"),
    jump: $("jump"), progress: $("progress"), previous: $("previous"), next: $("next"),
    zoomIn: $("zoom-in"), zoomOut: $("zoom-out"), fit: $("fit"),
    fullscreen: $("fullscreen"), loading: $("loading"), error: $("error"),
    errorText: $("error-text"), retry: $("retry"), announcement: $("announcement"),
    tip: $("reading-tip"), tashih: $("tashih-link"),
  };
  const state = {
    book: null, index: 0, zoom: 1, request: 0, loadedIndex: null,
    cache: new Map(), touch: null, drag: null, resizing: 0,
  };
  const zoomLevels = [1, 1.5, 2, 3, 4];
  const coverNames = {front: "Ön kapak", "inside-back": "Arka kapak içi", back: "Arka kapak"};
  const spread = () => state.book?.spreads[state.index];
  const labelFor = (page) => page.kind === "body" ? `${page.number}. beyit` : (coverNames[page.kind] || page.label);
  const bound = (value, low, high) => Math.max(low, Math.min(high, value));

  function routeFor(page) {
    if (page.kind === "body") return `#beyit=${page.number}`;
    return `#kapak=${{front: "on", "inside-back": "arka-ic", back: "arka"}[page.kind] || "on"}`;
  }

  function indexFromRoute() {
    const params = new URLSearchParams(location.hash.slice(1));
    const number = Number(params.get("beyit"));
    if (Number.isInteger(number) && number > 0) {
      const found = state.book.spreads.findIndex((page) => page.kind === "body" && page.number === number);
      if (found !== -1) return found;
    }
    const kind = {on: "front", "arka-ic": "inside-back", arka: "back"}[params.get("kapak")];
    const found = state.book.spreads.findIndex((page) => page.kind === kind);
    return found === -1 ? 0 : found;
  }

  function imagePromise(page) {
    const key = page.image;
    if (!state.cache.has(key)) {
      const pending = new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Sayfa görseli yüklenemedi."));
        image.src = key;
      }).catch((error) => {
        state.cache.delete(key);
        throw error;
      });
      state.cache.set(key, pending);
    }
    return state.cache.get(key);
  }

  function warmNeighbours() {
    const retained = new Set();
    for (const offset of [-1, 0, 1]) {
      const page = state.book.spreads[state.index + offset];
      if (!page) continue;
      retained.add(page.image);
      if (offset !== 0) imagePromise(page).catch(() => {});
    }
    for (const key of state.cache.keys()) {
      if (!retained.has(key)) state.cache.delete(key);
    }
  }

  function arrangeImage(preserveCentre = false) {
    const page = spread();
    if (!page || ui.image.hidden) return;
    const viewportWidth = ui.stage.clientWidth;
    const viewportHeight = ui.stage.clientHeight;
    const margin = viewportWidth <= 640 ? 20 : 32;
    const oldWidth = ui.surface.scrollWidth;
    const oldHeight = ui.surface.scrollHeight;
    const centreX = oldWidth ? (ui.stage.scrollLeft + viewportWidth / 2) / oldWidth : .5;
    const centreY = oldHeight ? (ui.stage.scrollTop + viewportHeight / 2) / oldHeight : .5;
    const fitted = Math.min((viewportWidth - margin) / page.width, (viewportHeight - margin) / page.height);
    const width = Math.max(1, Math.round(page.width * fitted * state.zoom));
    const height = Math.max(1, Math.round(page.height * fitted * state.zoom));
    ui.image.style.width = `${width}px`;
    ui.image.style.height = `${height}px`;
    ui.surface.style.width = `${Math.max(viewportWidth, width + margin)}px`;
    ui.surface.style.height = `${Math.max(viewportHeight, height + margin)}px`;
    ui.stage.classList.toggle("zoomed", state.zoom > 1);
    ui.fit.title = `Sayfayı ekrana sığdır — yakınlaştırma %${Math.round(state.zoom * 100)}`;
    ui.zoomOut.disabled = state.zoom <= 1;
    ui.zoomIn.disabled = state.zoom >= zoomLevels.at(-1);
    ui.stage.scrollLeft = preserveCentre ? centreX * ui.surface.scrollWidth - viewportWidth / 2 : 0;
    ui.stage.scrollTop = preserveCentre ? centreY * ui.surface.scrollHeight - viewportHeight / 2 : 0;
    ui.tip.textContent = state.zoom > 1
      ? "Ayrıntıları görmek için sayfayı kaydırın. Bütün açılıma dönmek için Sığdır’a dokunun."
      : "Oklarla veya yana kaydırarak sayfa çevirin. Ayrıntılar için yakınlaştırın.";
  }

  function setZoom(value) {
    if (state.loadedIndex !== state.index) return;
    state.zoom = bound(value, 1, zoomLevels.at(-1));
    arrangeImage(state.zoom > 1);
  }

  function stepZoom(direction) {
    const target = direction > 0
      ? zoomLevels.find((value) => value > state.zoom)
      : [...zoomLevels].reverse().find((value) => value < state.zoom);
    setZoom(target ?? state.zoom);
  }

  function updateControls() {
    const page = spread();
    ui.label.textContent = labelFor(page);
    ui.poet.textContent = page.kind === "body" ? (page.poet || "") : "";
    ui.jump.value = String(state.index);
    ui.progress.value = String(state.index);
    ui.progress.setAttribute("aria-valuetext", labelFor(page));
    ui.previous.disabled = state.index === 0;
    ui.next.disabled = state.index === state.book.spreads.length - 1;
    ui.tashih.href = `https://bir-beyit-bir-alem-tashih.someonebkr.chatgpt.site/${routeFor(page)}`;
    ui.tashih.setAttribute("aria-label", `${labelFor(page)} için tashih bırak — yeni sekmede açılır`);
    document.title = `${labelFor(page)} · Bir Beyit, Bir Âlem`;
  }

  async function showPage(index, {writeRoute = true, animate = true} = {}) {
    if (!state.book) return;
    const previousIndex = state.index;
    state.index = bound(index, 0, state.book.spreads.length - 1);
    state.zoom = 1;
    state.loadedIndex = null;
    const page = spread();
    const request = ++state.request;
    updateControls();
    if (writeRoute) history.replaceState(null, "", `${location.pathname}${location.search}${routeFor(page)}`);
    ui.error.hidden = true;
    ui.loading.hidden = false;
    ui.loading.textContent = `${labelFor(page)} açılıyor…`;
    ui.stage.setAttribute("aria-busy", "true");
    ui.zoomIn.disabled = true;
    ui.zoomOut.disabled = true;
    try {
      const loadedImage = await imagePromise(page);
      if (request !== state.request) return;
      ui.image.classList.remove("turn-forward", "turn-backward");
      ui.image.src = loadedImage.src;
      ui.image.alt = page.kind === "body"
        ? `${labelFor(page)}. ${page.poet || ""}. ${(page.lines || []).join(" / ")}`
        : `${labelFor(page)} — Bir Beyit, Bir Âlem`;
      ui.image.width = page.width;
      ui.image.height = page.height;
      ui.image.hidden = false;
      state.loadedIndex = state.index;
      arrangeImage();
      if (animate && previousIndex !== state.index) {
        void ui.image.offsetWidth;
        ui.image.classList.add(state.index > previousIndex ? "turn-forward" : "turn-backward");
      }
      ui.loading.hidden = true;
      ui.stage.setAttribute("aria-busy", "false");
      ui.announcement.textContent = `${labelFor(page)}${page.poet ? `, ${page.poet}` : ""}.`;
      warmNeighbours();
    } catch {
      if (request !== state.request) return;
      ui.image.hidden = true;
      ui.loading.hidden = true;
      ui.stage.setAttribute("aria-busy", "false");
      ui.errorText.textContent = "Bu sayfa yüklenemedi. Bağlantınızı kontrol edip yeniden deneyebilirsiniz.";
      ui.error.hidden = false;
    }
  }

  function turn(direction) {
    if (!state.book) return;
    const target = state.index + direction;
    if (target >= 0 && target < state.book.spreads.length) showPage(target);
  }

  async function loadBook() {
    ui.error.hidden = true;
    ui.loading.hidden = false;
    ui.loading.textContent = "Kitabınız açılıyor…";
    try {
      const response = await fetch("kitap.json", {cache: "no-cache"});
      if (!response.ok) throw new Error("Kitap bulunamadı.");
      const book = await response.json();
      if (!Array.isArray(book.spreads) || !book.spreads.length ||
          book.spreads.some((page) => !page.image || !(page.width > 0) || !(page.height > 0))) {
        throw new Error("Kitap bilgisi eksik.");
      }
      state.book = book;
      ui.jump.replaceChildren(...book.spreads.map((page, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = `${labelFor(page)}${page.kind === "body" && page.poet ? ` · ${page.poet}` : ""}`;
        return option;
      }));
      ui.progress.max = String(book.spreads.length - 1);
      ui.jump.disabled = false;
      ui.progress.disabled = false;
      await showPage(indexFromRoute(), {writeRoute: false, animate: false});
    } catch {
      ui.loading.hidden = true;
      ui.stage.setAttribute("aria-busy", "false");
      ui.errorText.textContent = "Kitap şu anda açılamadı. Bağlantınızı kontrol edip yeniden deneyebilirsiniz.";
      ui.error.hidden = false;
    }
  }

  ui.previous.addEventListener("click", () => turn(-1));
  ui.next.addEventListener("click", () => turn(1));
  ui.jump.addEventListener("change", () => showPage(Number(ui.jump.value)));
  ui.progress.addEventListener("input", () => {
    ui.progress.setAttribute("aria-valuetext", labelFor(state.book.spreads[Number(ui.progress.value)]));
  });
  ui.progress.addEventListener("change", () => showPage(Number(ui.progress.value)));
  ui.zoomIn.addEventListener("click", () => stepZoom(1));
  ui.zoomOut.addEventListener("click", () => stepZoom(-1));
  ui.fit.addEventListener("click", () => setZoom(1));
  ui.retry.addEventListener("click", () => state.book ? showPage(state.index) : loadBook());
  ui.image.addEventListener("dblclick", () => setZoom(state.zoom > 1 ? 1 : 2));
  window.addEventListener("hashchange", () => {
    if (state.book) showPage(indexFromRoute(), {writeRoute: false});
  });

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey ||
        /^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === "ArrowRight" && state.zoom === 1) { event.preventDefault(); turn(1); }
    if (event.key === "ArrowLeft" && state.zoom === 1) { event.preventDefault(); turn(-1); }
    if (event.key === "Home") { event.preventDefault(); showPage(0); }
    if (event.key === "End" && state.book) { event.preventDefault(); showPage(state.book.spreads.length - 1); }
    if (event.key === "+" || event.key === "=") { event.preventDefault(); stepZoom(1); }
    if (event.key === "-") { event.preventDefault(); stepZoom(-1); }
    if (event.key === "0") { event.preventDefault(); setZoom(1); }
  });

  ui.stage.addEventListener("touchstart", (event) => {
    if (state.zoom !== 1 || event.touches.length !== 1) { state.touch = null; return; }
    const touch = event.touches[0];
    state.touch = {x: touch.clientX, y: touch.clientY, time: Date.now()};
  }, {passive: true});
  ui.stage.addEventListener("touchmove", (event) => {
    if (event.touches.length !== 1) state.touch = null;
  }, {passive: true});
  ui.stage.addEventListener("touchcancel", () => { state.touch = null; }, {passive: true});
  ui.stage.addEventListener("touchend", (event) => {
    if (!state.touch || state.zoom !== 1 || !event.changedTouches.length) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - state.touch.x;
    const dy = touch.clientY - state.touch.y;
    const elapsed = Date.now() - state.touch.time;
    state.touch = null;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.7 && elapsed < 800) turn(dx < 0 ? 1 : -1);
  }, {passive: true});

  ui.stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || state.zoom <= 1) return;
    state.drag = {x: event.clientX, y: event.clientY, left: ui.stage.scrollLeft, top: ui.stage.scrollTop};
    ui.stage.setPointerCapture(event.pointerId);
    ui.stage.classList.add("panning");
  });
  ui.stage.addEventListener("pointermove", (event) => {
    if (!state.drag) return;
    ui.stage.scrollLeft = state.drag.left - (event.clientX - state.drag.x);
    ui.stage.scrollTop = state.drag.top - (event.clientY - state.drag.y);
  });
  const stopDrag = () => { state.drag = null; ui.stage.classList.remove("panning"); };
  ui.stage.addEventListener("pointerup", stopDrag);
  ui.stage.addEventListener("pointercancel", stopDrag);
  ui.stage.addEventListener("lostpointercapture", stopDrag);

  if (document.fullscreenEnabled && ui.reader.requestFullscreen) {
    ui.fullscreen.hidden = false;
    ui.fullscreen.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await ui.reader.requestFullscreen();
      } catch {
        ui.announcement.textContent = "Bu tarayıcıda tam ekran açılamadı.";
      }
    });
    document.addEventListener("fullscreenchange", () => {
      const active = Boolean(document.fullscreenElement);
      ui.fullscreen.setAttribute("aria-label", active ? "Tam ekrandan çık" : "Tam ekran");
      ui.fullscreen.title = active ? "Tam ekrandan çık" : "Tam ekran";
      ui.fullscreen.setAttribute("aria-pressed", String(active));
      arrangeImage(true);
    });
  }

  new ResizeObserver(() => {
    cancelAnimationFrame(state.resizing);
    state.resizing = requestAnimationFrame(() => arrangeImage(state.zoom > 1));
  }).observe(ui.stage);
  loadBook();
})();
