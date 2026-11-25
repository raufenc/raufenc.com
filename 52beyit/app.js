(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const ARUZ = "https://raufenc.com/aruz/";
  let POEMS = [];
  let current = null;          // açık beyit numarası
  let seq = false;             // sırayla dinleme
  let ytReady = null, player = null;
  const state = { q: "", audio: false, poet: null };

  /* ---------- yardımcılar ---------- */
  const norm = (s) => (s || "").toLocaleLowerCase("tr")
    .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[‘’'`ʿ\-]/g, "");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tm = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const byNo = (n) => POEMS.find((p) => p.number === n);
  const hasRec = (p) => !!(p && p.recording && p.recording.video_id);
  const img = (n, small) => `tablo/${String(n).padStart(2, "0")}${small ? "-k" : ""}.webp`;
  function toast(msg) { const t = $("toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2400); }

  function meterChips(meter, small) {
    if (!meter || /Hece/i.test(meter)) return small ? "" : "";
    let i = 0;
    return meter.split("/").map((foot) =>
      foot.trim().split(/\s+/).map((c) => {
        if (c === "—") return `<span class="m l" style="--i:${i++}"></span>`;
        if (c === "·") return `<span class="m s" style="--i:${i++}"></span>`;
        return "";
      }).join("")
    ).join('<span class="sep"></span>');
  }

  /* ---------- galeri ---------- */
  function filtered() {
    const q = norm(state.q);
    return POEMS.filter((p) => {
      if (state.audio && !hasRec(p)) return false;
      if (state.poet && p.poet !== state.poet) return false;
      if (!q) return true;
      if (/^\d+$/.test(q)) return p.number === +q;
      return norm(p.lines.join(" ") + " " + p.poet).includes(q);
    });
  }
  function renderGallery() {
    const list = filtered();
    const g = $("gallery");
    const plain = !state.q && !state.audio && !state.poet;
    g.innerHTML = list.map((p, k) => {
      const wide = plain && k % 7 === 0;
      return `<li class="tile reveal${wide ? " wide" : ""}">
        <button type="button" data-n="${p.number}" aria-label="${p.number}. beyit, ${esc(p.poet)}: ${esc(p.lines[0])}">
          <img src="${img(p.number, true)}" alt="" loading="lazy" decoding="async">
          <span class="shade"></span>
          <span class="no">${p.number}</span>
          ${hasRec(p) ? '<span class="aud" title="Dinlenebilir"><i></i></span>' : ""}
          <span class="meta"><span class="mis">${esc(p.lines[0])}</span><span class="poet">${esc(p.poet)}</span></span>
        </button></li>`;
    }).join("");
    $("empty").hidden = list.length > 0;
    $("count").textContent = list.length === POEMS.length ? `${POEMS.length} beyit` : `${list.length} / ${POEMS.length} beyit`;
    $("poet-filter").hidden = !state.poet;
    if (state.poet) $("poet-filter-name").textContent = state.poet;
    observe();
  }
  let io;
  function observe() {
    if (!("IntersectionObserver" in window)) { document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in")); return; }
    io = io || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal:not(.in)").forEach((e) => io.observe(e));
  }

  /* ---------- şairler ---------- */
  function renderPoets() {
    const m = new Map();
    POEMS.forEach((p) => m.set(p.poet, (m.get(p.poet) || 0) + 1));
    const arr = [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "tr"));
    $("poets").innerHTML = arr.map(([n, c]) => `<li><button type="button" data-poet="${esc(n)}"><span class="pn">${esc(n)}</span><span class="pc">${c} beyit</span></button></li>`).join("");
    $("stat-poets").textContent = m.size;
  }

  /* ---------- beyit odası ---------- */
  function openRoom(n, opts = {}) {
    const p = byNo(n); if (!p) return;
    current = n;
    const room = $("room");
    const im = $("room-img");
    im.srcset = `${img(n, true)} 900w, ${img(n)} 2000w`; im.sizes = "(max-width: 980px) 100vw, 62vw"; im.src = img(n); im.alt = `${n}. beytin tablosu`;
    $("room-no").textContent = `${n}. beyit`;
    $("room-title").textContent = `${n}. beyit, ${p.poet}`;
    $("room-couplet").innerHTML = p.lines.map((l) => `<span>${esc(l)}</span>`).join("");
    $("room-poet").textContent = p.poet;
    $("room-chips").innerHTML = meterChips(p.meter, true);
    $("room-meter").textContent = /Hece/i.test(p.meter || "") ? "Hece ölçüsü · 5 + 5" : (p.meter_name || "");
    $("room-aruz").href = `${ARUZ}?beyit=${n}&kaynak=52beyit`;
    $("room-aruz").textContent = /Hece/i.test(p.meter || "") ? "Hece ölçüsünü Fâilâtün’de keşfedin ↗" : "Bu beytin ritmini Fâilâtün’de dinleyin ↗";
    $("room-page").textContent = "";
    renderListen(p, opts.autoplay);
    const prev = n > 1 ? n - 1 : 52, next = n < 52 ? n + 1 : 1;
    $("prev-no").textContent = prev; $("next-no").textContent = next;
    $("seq-badge").hidden = !seq;
    if (room.hidden) { room.hidden = false; document.body.classList.add("lock"); setTimeout(() => $("room-close").focus(), 50); }
    $("room").querySelector(".room-body").scrollTop = 0;
    const h = `#beyit-${n}`;
    if (location.hash !== h) history.replaceState(null, "", h);
  }
  function closeRoom() {
    stopPlayer(); seq = false;
    $("room").hidden = true; document.body.classList.remove("lock");
    history.replaceState(null, "", location.pathname + location.search);
    const t = document.querySelector(`.tile button[data-n="${current}"]`);
    current = null; if (t) t.focus({ preventScroll: false });
  }
  function step(d) {
    if (!current) return;
    if (seq) { const n = nextRecorded(current, d); if (n) openRoom(n, { autoplay: true }); return; }
    let n = current + d; if (n < 1) n = 52; if (n > 52) n = 1; stopPlayer(); openRoom(n);
  }
  function nextRecorded(from, d = 1) {
    for (let k = 1; k <= 52; k++) { let n = ((from - 1 + d * k) % 52 + 52) % 52 + 1; if (hasRec(byNo(n))) return n; }
    return null;
  }

  /* ---------- dinleme ---------- */
  function renderListen(p, autoplay) {
    stopPlayer();
    const box = $("room-listen");
    if (!hasRec(p)) {
      box.innerHTML = `<div class="lis-none">Bu beytin Hocamızın sesinden okuyuşunu arıyoruz. Bulunduğunda bu sayfada yerini alacak; kitaptaki karekod aynı kalır.</div>`;
      return;
    }
    const r = p.recording;
    box.innerHTML = `<div class="lis-card">
        <div class="lis-frame" id="lis-frame"><button type="button" id="lis-go" aria-label="Okuyuşu başlat">
          <img src="https://i.ytimg.com/vi/${r.video_id}/hqdefault.jpg" alt="" loading="lazy"><span class="big-play"><i></i></span></button></div>
        <div class="lis-info"><b>${esc(r.title || "Hocamızın okuyuşu")}</b><span>${esc(r.channel || "")}${r.start_seconds != null ? ` · ${tm(r.start_seconds)}${r.end_seconds ? "–" + tm(r.end_seconds) : ""}` : ""}</span></div>
      </div>${r.note ? `<p class="lis-note">${esc(r.note)}</p>` : ""}`;
    $("lis-go").addEventListener("click", () => play(p));
    if (autoplay) play(p);
  }
  function loadYT() {
    if (ytReady) return ytReady;
    ytReady = new Promise((res) => {
      if (window.YT && window.YT.Player) return res();
      window.onYouTubeIframeAPIReady = () => res();
      const s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(s);
    });
    return ytReady;
  }
  async function play(p) {
    const r = p.recording; const frame = $("lis-frame"); if (!frame) return;
    frame.innerHTML = '<div id="yt"></div>';
    try {
      await loadYT();
      if (current !== p.number) return;
      player = new YT.Player("yt", {
        host: "https://www.youtube-nocookie.com", videoId: r.video_id,
        playerVars: { start: r.start_seconds || 0, end: r.end_seconds || undefined, autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1 },
        events: { onStateChange: (e) => { if (e.data === 0 && seq) { const n = nextRecorded(p.number, 1); if (n) setTimeout(() => openRoom(n, { autoplay: true }), 900); } } }
      });
    } catch (_) {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${r.video_id}?start=${r.start_seconds || 0}${r.end_seconds ? "&end=" + r.end_seconds : ""}&autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen title="Okuyuş"></iframe>`;
    }
  }
  function stopPlayer() { try { if (player && player.destroy) player.destroy(); } catch (_) {} player = null; }
  function startSequence() {
    seq = true;
    const start = current && hasRec(byNo(current)) ? current : nextRecorded(0, 1);
    if (start) openRoom(start, { autoplay: true });
  }

  /* ---------- bağlama ---------- */
  function bind() {
    $("gallery").addEventListener("click", (e) => { const b = e.target.closest("button[data-n]"); if (b) { seq = false; openRoom(+b.dataset.n); } });
    $("poets").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-poet]"); if (!b) return;
      state.poet = b.dataset.poet; state.q = ""; $("q").value = ""; renderGallery();
      document.getElementById("beyitler").scrollIntoView({ behavior: "smooth" });
    });
    $("poet-clear").addEventListener("click", () => { state.poet = null; renderGallery(); });
    $("q").addEventListener("input", (e) => { state.q = e.target.value; renderGallery(); });
    $("only-audio").addEventListener("click", (e) => { state.audio = !state.audio; e.currentTarget.setAttribute("aria-pressed", state.audio); renderGallery(); });
    $("room-close").addEventListener("click", closeRoom);
    $("room-prev").addEventListener("click", () => step(-1));
    $("room-next").addEventListener("click", () => step(1));
    $("room-share").addEventListener("click", async () => {
      const url = `${location.origin}${location.pathname}#beyit-${current}`;
      const p = byNo(current);
      try { if (navigator.share) { await navigator.share({ title: `Şair Ne Demek İstedi? · ${current}. beyit`, text: p.lines.join(" / "), url }); return; } } catch (_) { return; }
      try { await navigator.clipboard.writeText(url); toast("Bağlantı kopyalandı"); } catch (_) { toast(url); }
    });
    ["hero-play", "listen-play"].forEach((id) => $(id).addEventListener("click", startSequence));
    document.addEventListener("keydown", (e) => {
      if ($("room").hidden) return;
      if (e.key === "Escape") closeRoom();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
    let x0 = null;
    $("room").addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    $("room").addEventListener("touchend", (e) => {
      if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 70 && !e.target.closest(".lis-frame")) step(dx < 0 ? 1 : -1);
    }, { passive: true });
    $("jump").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = parseInt($("jump-no").value, 10);
      const n = v;
      if (!(n >= 1 && n <= 52)) { toast("1 ile 52 arasında bir sayı yazın"); return; }
      seq = false; openRoom(n);
    });
    window.addEventListener("hashchange", fromHash);
    const nav = $("nav");
    const onScroll = () => nav.classList.toggle("solid", window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }
  function fromHash() {
    const m = location.hash.match(/^#beyit[-=](\d{1,2})$/);
    if (m && byNo(+m[1])) { if (current !== +m[1]) openRoom(+m[1]); }
    else if (!$("room").hidden && !location.hash.startsWith("#beyit")) closeRoom();
  }

  function daily() {
    const d = new Date(); const start = new Date(d.getFullYear(), 0, 0);
    const n = (Math.floor((d - start) / 864e5) % 52) + 1; const p = byNo(n);
    $("daily-lines").innerHTML = p.lines.map(esc).join("<br>");
    $("daily-poet").textContent = `${p.poet} · ${n}. beyit`;
    $("daily").addEventListener("click", (e) => { e.preventDefault(); seq = false; openRoom(n); });
  }

  async function init() {
    $("meter-demo").innerHTML = meterChips("— · — — / — · — — / — · — — / — · —");
    bind();
    try {
      const r = await fetch("beyitler.json", { cache: "no-cache" });
      const d = await r.json(); POEMS = d.poems.slice().sort((a, b) => a.number - b.number);
    } catch (e) { $("gallery").innerHTML = '<li class="empty">Beyitler şu anda yüklenemedi. Sayfayı yenileyin.</li>'; return; }
    $("stat-rec").textContent = POEMS.filter(hasRec).length;
    renderGallery(); renderPoets(); daily(); fromHash();
  }
  init();
})();
