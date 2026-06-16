/* ===================================================================
   YOL HARİTAN — Uygulama motoru (v2 · premium · sıfır-hata)
   RIASEC + Beş Faktör puanlama · 16 arketip · meslek uyumu
   Tamamen istemci tarafı. Hiçbir veri sunucuya gönderilmez.
   =================================================================== */
(function () {
  "use strict";
  const D = window.YH;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const RIASEC = D.RIASEC;
  const BFD = ["O", "C", "E", "A", "ES"];
  const HEX = ["R", "I", "A", "S", "E", "C"];
  const ADJ = { R:["C","I"], I:["R","A"], A:["I","S"], S:["A","E"], E:["S","C"], C:["E","R"] };
  const OPP = ["RS", "IE", "AC", "SR", "EI", "CA"];
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const colorVar = k => "var(--c-" + k + ")";
  const FUN = { R:"Maker Kafası", I:"Mucit Kafası", A:"Sanatçı Ruhu", S:"İyi Kalp", E:"Lider Ruhu", C:"Planlama Dehası" };
  const RM = (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || false;
  const FINE = (window.matchMedia && window.matchMedia("(pointer: fine)").matches) || false;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const SAVE_VER = 2;

  const state = { queue: [], i: 0, answers: {}, valuesIncluded: false, jobZone: 5, scores: null, locking: false, advTimer: null };

  /* ---------- yardımcı ---------- */
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2300); }
  function show(id) {
    $$(".screen").forEach(s => s.classList.remove("is-active"));
    const el = $("#" + id); el.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: RM ? "auto" : "auto" });
    const h = el.querySelector("h1, h2"); if (h) { h.setAttribute("tabindex", "-1"); setTimeout(() => h.focus({ preventScroll: true }), 30); }
  }
  function itemsOfTurn(t) { return D.items.filter(it => it.turn === t); }
  const mandatory = () => D.items.filter(it => it.turn <= 4);

  /* ---------- başlangıç ---------- */
  function init() {
    buildStars(); buildTypesStrip();
    $("#introDisclaimer").innerHTML = D.texts.intro;
    $("#pill-count").textContent = "🧩 " + mandatory().length + " soru";
    $("#startBtn").addEventListener("click", startQuiz);
    document.addEventListener("keydown", onKey);
    // Klavye kısayolu rozetleri: ince işaretleyicide hemen, yoksa ilk klavye kullanımında görünür
    if (FINE) document.body.classList.add("has-kbd");
    else { const fk = e => { if (e.key === "Tab" || /^[0-9]$/.test(e.key) || e.key.slice(0, 5) === "Arrow") { document.body.classList.add("has-kbd"); document.removeEventListener("keydown", fk, true); } }; document.addEventListener("keydown", fk, true); }

    const shared = readShared();
    if (shared) { state.scores = shared; renderResult(shared, true); show("screen-result"); return; }
    maybeOfferResume();
  }
  function buildStars() {
    const w = $("#stars"); if (!w) return; let h = "";
    for (let i = 0; i < 46; i++) { const x = i * 53 % 100, y = i * 29 % 100, s = 1 + i % 3, d = 2 + i % 5;
      h += '<i style="left:' + x + '%;top:' + y + '%;width:' + s + 'px;height:' + s + 'px;--tw:' + d + 's;animation-delay:' + (i % 7) * 0.4 + 's"></i>'; }
    w.innerHTML = h;
  }
  function buildTypesStrip() {
    const w = $("#typesStrip"); if (!w) return;
    w.innerHTML = RIASEC.map(k => { const t = D.types[k];
      return '<div class="type-dot" title="' + esc(t.name) + '" style="background:color-mix(in srgb,' + colorVar(k) + ' 24%, var(--bg-2));border:1px solid ' + colorVar(k) + '">' + t.emoji + '</div>'; }).join("");
  }

  /* ---------- kaldığın yerden devam ---------- */
  function loadSave() { try { return JSON.parse(localStorage.getItem("yh_save") || "null"); } catch (e) { return null; } }
  function maybeOfferResume() {
    const sv = loadSave();
    if (!sv || sv.ver !== SAVE_VER || !sv.answers) return;
    const total = (sv.valuesIncluded ? D.items.length : mandatory().length);
    const done = Object.keys(sv.answers).length;
    if (done < 3 || done >= total) { if (done >= total) try { localStorage.removeItem("yh_save"); } catch (e) {} return; }
    const pct = Math.round(done / total * 100);
    const box = document.createElement("div");
    box.className = "resume-card";
    box.innerHTML = '<div class="resume-ico">⏳</div><div><strong>Yarım kalan testin var</strong><span>Yaklaşık %' + pct + ' tamamladın — kaldığın yerden devam edelim mi?</span></div>' +
      '<div class="resume-actions"><button class="btn btn--ghost btn--sm" id="resumeNo">Baştan başla</button><button class="btn btn--gold btn--sm" id="resumeYes">Devam et</button></div>';
    const hero = $(".hero"); hero.parentNode.insertBefore(box, hero.nextSibling);
    $("#resumeYes").addEventListener("click", () => resumeFrom(sv));
    $("#resumeNo").addEventListener("click", () => { try { localStorage.removeItem("yh_save"); } catch (e) {} box.remove(); });
  }
  function resumeFrom(sv) {
    state.answers = sv.answers || {};
    state.valuesIncluded = !!sv.valuesIncluded;
    state.queue = mandatory().concat(state.valuesIncluded ? itemsOfTurn(5) : []);
    let idx = state.queue.findIndex(q => state.answers[q.id] == null);
    if (idx < 0) { return finish(); }
    state.i = idx;
    show("screen-quiz");
    renderItem();
  }

  /* ---------- quiz akışı ---------- */
  function startQuiz() {
    state.answers = {}; state.valuesIncluded = false; state.i = 0; state.locking = false;
    state.queue = mandatory();
    show("screen-quiz");
    showTurnIntro(state.queue[0].turn);
  }
  function turnDur(len) { return Math.max(1, Math.round(len * 7 / 60)); }
  function showTurnIntro(turnId) {
    const t = D.turns.find(x => x.id === turnId);
    const len = state.queue.filter(q => q.turn === turnId).length;
    $("#qContainer").innerHTML =
      '<div class="turn-intro q">' +
        '<div class="turn-emoji">' + t.emoji + '</div>' +
        '<div class="turn-num">Bölüm ' + turnId + (turnId <= 4 ? " / 4" : "") + '</div>' +
        '<h2 tabindex="-1">' + esc(t.name) + '</h2>' +
        '<p class="muted">' + esc(t.teaser) + '</p>' +
        '<p class="pill" style="margin:14px auto 22px;display:inline-flex">⏱️ ~' + turnDur(len) + ' dk · ' + len + ' soru</p><br>' +
        '<button class="btn btn--gold" id="turnGo">Başla ▶</button>' +
      '</div>';
    renderProgress(turnId, 0);
    $("#turnGo").addEventListener("click", () => { renderItem(); $(".q__text") && $(".q__text").focus({ preventScroll: true }); });
    setTimeout(() => $("#turnGo").focus({ preventScroll: true }), 30);
  }
  function turnBounds(pos) {
    const turn = state.queue[pos].turn;
    const inTurn = state.queue.filter(q => q.turn === turn);
    return { turn: turn, idx: inTurn.findIndex(q => q.id === state.queue[pos].id), len: inTurn.length };
  }
  function answeredInMandatory() { return mandatory().filter(q => state.answers[q.id] != null).length; }
  function renderProgress(curTurn, fillFrac) {
    const showVals = state.valuesIncluded;
    const segIds = showVals ? [1,2,3,4,5] : [1,2,3,4];
    const segs = segIds.map(tid => {
      let fill = 0, cls = "seg";
      if (tid < curTurn) fill = 100; else if (tid === curTurn) fill = Math.round(fillFrac * 100);
      if (tid === 5) cls += " seg--bonus";
      return '<span class="' + cls + '"><span class="seg__f" style="width:' + fill + '%"></span></span>';
    }).join("");
    const t = D.turns.find(x => x.id === curTurn);
    const sw = $("#segs"); if (sw) sw.innerHTML = segs;
    $("#sectLabel").textContent = t.emoji + " " + t.name;
  }
  function renderItem() {
    state.locking = false;
    const q = state.queue[state.i];
    const b = turnBounds(state.i);
    renderProgress(b.turn, b.idx / b.len);
    const totalAns = answeredInMandatory(), totalQ = mandatory().length;
    $("#qCounter").textContent = (q.turn <= 4 ? Math.min(totalAns + 1, totalQ) + " / " + totalQ : (b.idx + 1) + " / " + b.len);
    const remaining = b.len - b.idx;
    const micro = remaining <= 2 ? '<span class="micro">Son ' + remaining + ' soru! 💪</span>' : "";

    let body = "", accent = "var(--violet)", kicker = "";
    if (q.layer === "riasec") { accent = colorVar(q.type); kicker = '<span class="tag tag-' + q.type + '">' + esc(D.types[q.type].name) + '</span>'; }
    else if (q.layer === "bigfive") kicker = '<span class="tag tag-bf">✨ Karakter</span>';
    else if (q.layer === "values") kicker = '<span class="tag tag-bf">🧭 Değer</span>';
    else kicker = '<span class="tag tag-bf">🎬 Senaryo</span>';

    if (q.format === "scenario") body = scenarioHTML(q);
    else if (q.format === "swipe") body = scaleHTML(q, "react");
    else body = scaleHTML(q, "list");

    const hintTip = (FINE && state.i === 0 && !sessionStorage.getItem("yh_kbhint"))
      ? '<div class="kb-hint">⌨️ İpucu: rakam tuşlarıyla da seçebilir, ← ile geri gidebilirsin.</div>' : "";
    if (FINE && state.i === 0) try { sessionStorage.setItem("yh_kbhint", "1"); } catch (e) {}

    $("#qContainer").innerHTML =
      '<div class="q" style="--accent:' + accent + '">' +
        '<div class="q__kicker">' + kicker + micro + '</div>' +
        '<h2 class="q__text" tabindex="-1">' + esc(q.text) + '</h2>' +
        '<div class="q__hint">' + esc(q.hint || hintFor(q)) + '</div>' +
        body + hintTip +
        '<div class="q-nav">' +
          (state.i > 0 ? '<button class="btn btn--ghost btn--sm" id="prevBtn">‹ Geri</button>' : '<span></span>') +
          '<span class="spacer"></span>' +
          (RM ? '<button class="btn btn--gold btn--sm" id="nextBtn"' + (state.answers[q.id] != null ? '' : ' disabled') + '>Devam ›</button>' : '') +
        '</div>' +
      '</div>';
    wire(q);
    // Soru metni odaklanan h2 ile, ilerleme #qCounter (aria-live) ile duyurulur — burada tekrar etme
    const _h = $(".q__text"); if (_h) setTimeout(() => { try { _h.focus({ preventScroll: true }); } catch (e) {} }, 30);
  }
  function hintFor(q) {
    if (q.layer === "riasec") return "Bu işi yapmak hoşuna gider mi? İçinden geldiği gibi seç.";
    if (q.layer === "values") return "Bir işte bu senin için ne kadar önemli?";
    return "Sana ne kadar uyuyor? Doğru/yanlış yok.";
  }
  function scaleHTML(q, layout) {
    const opts = D.scales[q.scale]; const cur = state.answers[q.id];
    const cls = layout === "react" ? "scale scale--react" : "scale";
    return '<div class="' + cls + '" role="radiogroup" aria-label="' + esc(q.text) + '">' + opts.map(o =>
      '<button class="scale__opt' + (cur === o.v ? ' is-on' : '') + '" data-v="' + o.v + '" role="radio" aria-checked="' + (cur === o.v) + '">' +
        '<span class="emoji" aria-hidden="true">' + o.e + '</span>' + (layout === "react" ? '' : '<span class="dot" aria-hidden="true"></span>') +
        '<span class="lbl">' + esc(o.l) + '</span><span class="kbd" aria-hidden="true">' + o.v + '</span></button>').join("") + '</div>';
  }
  function scenarioHTML(q) {
    const cur = state.answers[q.id];
    return '<div class="choice" role="radiogroup" aria-label="' + esc(q.text) + '">' + q.options.map((o, idx) =>
      '<button class="choice__opt' + (cur === idx ? ' is-on' : '') + '" data-idx="' + idx + '" role="radio" aria-checked="' + (cur === idx) + '">' +
        '<span class="emoji" aria-hidden="true">' + o.emoji + '</span><span class="t">' + esc(o.t) + '</span>' + (o.d ? '<span class="d">' + esc(o.d) + '</span>' : '') +
        '<span class="kbd" aria-hidden="true">' + (idx + 1) + '</span>' +
      '</button>').join("") + '</div>';
  }
  function wire(q) {
    if (q.format === "scenario") {
      $$(".choice__opt").forEach(b => b.addEventListener("click", () => pick(q, parseInt(b.dataset.idx, 10), b, ".choice__opt")));
    } else {
      $$(".scale__opt").forEach(b => b.addEventListener("click", () => pick(q, parseInt(b.dataset.v, 10), b, ".scale__opt")));
    }
    $("#prevBtn") && $("#prevBtn").addEventListener("click", prev);
    $("#nextBtn") && $("#nextBtn").addEventListener("click", () => { if (state.answers[q.id] != null) next(); });
  }
  function pick(q, val, btn, sel) {
    if (state.locking) return;
    state.answers[q.id] = val;
    $$(sel).forEach(x => { x.classList.remove("is-on"); x.setAttribute("aria-checked", "false"); });
    if (btn) { btn.classList.add("is-on"); btn.setAttribute("aria-checked", "true"); }
    persist();
    if (RM) { const nb = $("#nextBtn"); if (nb) nb.removeAttribute("disabled"); } // hareketi azalt: otomatik geçiş yok
    else advance();
  }
  function advance() {
    // Yalnız hareket-açık modda otomatik geçiş; kullanıcı 340ms içinde başka seçeneğe basarsa timer iptal edilir.
    // (Hareketi azaltma tercihinde otomatik geçiş kapalıdır; kullanıcı "Devam" ile ilerler — bkz. pick/renderItem.)
    clearTimeout(state.advTimer);
    state.advTimer = setTimeout(() => {
      state.locking = true;
      const qEl = $(".q");
      if (!qEl) { next(); return; }
      qEl.classList.add("is-leaving");
      state.advTimer = setTimeout(next, 180);
    }, 340);
  }
  function next() {
    clearTimeout(state.advTimer);
    const prevTurn = state.queue[state.i].turn; state.i++;
    if (state.i >= state.queue.length) return endOfQueue();
    const newTurn = state.queue[state.i].turn;
    if (newTurn !== prevTurn) showInterstitial(prevTurn, newTurn); else renderItem();
  }
  function prev() {
    if (state.i <= 0) return;
    clearTimeout(state.advTimer); state.locking = false;
    const curTurn = state.queue[state.i].turn;
    state.i--;
    const newTurn = state.queue[state.i].turn;
    if (newTurn !== curTurn) showInterstitial(newTurn, curTurn, true);
    else renderItem();
  }
  function showInterstitial(doneTurn, nextTurn, isBack) {
    const dn = D.turns.find(x => x.id === doneTurn), nx = D.turns.find(x => x.id === nextTurn);
    state.locking = false;
    $("#qContainer").innerHTML =
      '<div class="turn-intro q"><div class="turn-emoji ' + (isBack ? "" : "pop") + '">' + (isBack ? "↩️" : "🎉") + '</div>' +
        '<h2 tabindex="-1">' + (isBack ? esc(nx.name) + " bölümüne döndün" : esc(dn.name) + " tamam!") + '</h2>' +
        '<p class="muted">' + (isBack ? "Önceki cevaplarını değiştirebilirsin." : (nx ? "Sırada: " + nx.emoji + " " + esc(nx.name) : "")) + '</p>' +
        (!isBack && nx ? '<p class="muted" style="margin-top:6px">' + esc(nx.teaser) + '</p>' : "") +
        '<br><button class="btn btn--gold" id="contBtn">' + (isBack ? "Bu bölüme dön ▶" : "Devam ▶") + '</button></div>';
    renderProgress(nextTurn, 0);
    $("#contBtn").addEventListener("click", () => renderItem());
    setTimeout(() => $("#contBtn").focus({ preventScroll: true }), 30);
  }
  function endOfQueue() { if (!state.valuesIncluded) return showValuesOffer(); finish(); }
  function showValuesOffer() {
    show("screen-quiz");
    state.locking = false; clearTimeout(state.advTimer);
    $("#qContainer").innerHTML =
      '<div class="turn-intro q"><div class="turn-emoji">🧭</div><h2 tabindex="-1">Son bir bölüm ister misin?</h2>' +
        '<p class="muted">Seni asıl yönlendiren <strong>değerleri</strong> ekleyelim mi? Sonucunu zenginleştirir (12 soru · ~1,5 dk). İstemezsen sonucu hemen görebilirsin.</p>' +
        '<div class="q-nav" style="justify-content:center;gap:12px;margin-top:22px;flex-wrap:wrap">' +
          '<button class="btn btn--ghost" id="skipVals">Sonucu gör →</button>' +
          '<button class="btn btn--gold" id="doVals">Bonus bölüm (12 soru)</button></div></div>';
    renderProgress(4, 1);
    $("#doVals").addEventListener("click", () => { state.valuesIncluded = true; state.queue = state.queue.concat(itemsOfTurn(5)); persist(); renderItem(); });
    $("#skipVals").addEventListener("click", finish);
    setTimeout(() => $("#skipVals").focus({ preventScroll: true }), 30);
  }
  function onKey(e) {
    if (!$("#screen-quiz").classList.contains("is-active")) return;
    if (document.activeElement && /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
    const q = state.queue[state.i]; if (!q) return;
    if (state.locking) return;
    if (!$(".scale__opt") && !$(".choice__opt")) return; // ara/teklif ekranında tuş yok
    if (q.format === "scenario") {
      if (e.key >= "1" && e.key <= String(q.options.length)) { e.preventDefault(); clickByData(".choice__opt", "idx", +e.key - 1); }
    } else if (e.key >= "1" && e.key <= "5") { e.preventDefault(); clickByData(".scale__opt", "v", +e.key); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    else if (RM && e.key === "ArrowRight" && state.answers[q.id] != null) { e.preventDefault(); next(); } // hareket-azalt: manuel ileri
  }
  function clickByData(sel, attr, val) { const b = $$(sel).find(x => +x.dataset[attr] === val); if (b) b.click(); }
  function persist() {
    try { localStorage.setItem("yh_save", JSON.stringify({ ver: SAVE_VER, answers: state.answers, valuesIncluded: state.valuesIncluded, t: Date.now() })); } catch (e) {}
  }

  /* ---------- hesaplama ---------- */
  function finish() {
    show("screen-calc");
    const steps = [["🧩", "Cevapların okunuyor"], ["🧭", "İlgi haritan çiziliyor"], ["🪞", "Karakter aynan parlatılıyor"], ["🎓", "Meslekler eşleştiriliyor"]];
    const wrap = $("#calcSteps");
    if (wrap) wrap.innerHTML = steps.map((s, i) => '<div class="calc-step" data-i="' + i + '"><span class="cs-ico">' + s[0] + '</span><span class="cs-tx">' + s[1] + '</span><span class="cs-chk">✓</span></div>').join("");
    const live = $("#calcLive");
    const total = RM ? 500 : 1400; const each = total / steps.length;
    steps.forEach((s, i) => setTimeout(() => { const el = wrap && wrap.querySelector('.calc-step[data-i="' + i + '"]'); if (el) el.classList.add("done"); if (live) live.textContent = s[1] + " — tamam"; }, each * (i + 1)));
    setTimeout(() => {
      if (live) live.textContent = "Yol haritan hazır, sonuçların gösteriliyor.";
      const sc = computeScores(); state.scores = sc;
      try { localStorage.removeItem("yh_save"); } catch (e) {}
      renderResult(sc, false); show("screen-result");
    }, total + 250);
  }
  function computeScores() {
    const a = state.answers;
    // RIASEC taban: yalnız likert/swipe (senaryolar ayrı, hafif nudge)
    const rRaw = { R:0, I:0, A:0, S:0, E:0, C:0 }, rN = { R:0, I:0, A:0, S:0, E:0, C:0 };
    D.items.forEach(q => { if (q.layer === "riasec") { rRaw[q.type] += (a[q.id] != null ? a[q.id] : 3); rN[q.type]++; } });
    const rPct = {};
    RIASEC.forEach(t => { const n = rN[t] || 6; rPct[t] = clamp(Math.round((rRaw[t] - n) / (n * 4) * 100), 0, 100); });
    const nudge = { R:0, I:0, A:0, S:0, E:0, C:0 };
    D.items.forEach(q => { if (q.format === "scenario" && a[q.id] != null) { const o = q.options[a[q.id]]; if (o && o.scores) for (const k in o.scores) if (nudge[k] != null) nudge[k] += o.scores[k]; } });
    RIASEC.forEach(t => rPct[t] = clamp(rPct[t] + Math.round(nudge[t]), 0, 100)); // ≤ +6 puan: ince ayar, baskınlığı belirlemez

    // Big Five (hepsi likert; ters kodlama)
    const dims = { O:[], C:[], E:[], A:[], N:[] };
    D.items.forEach(q => { if (q.layer !== "bigfive") return; let v = (a[q.id] != null ? a[q.id] : 3); if (q.reverse) v = 6 - v; dims[q.dim].push(v); });
    const bfRaw = {};
    for (const d in dims) { const arr = dims[d], n = arr.length || 1, sum = arr.reduce((x, y) => x + y, 0); bfRaw[d] = clamp(Math.round((sum - n) / (n * 4) * 100), 0, 100); }
    const bf = { O: bfRaw.O, C: bfRaw.C, E: bfRaw.E, A: bfRaw.A, ES: 100 - bfRaw.N };

    let values = null;
    if (state.valuesIncluded) {
      const out = {}; ["AC","IN","RE","RL","SU","WC"].forEach(v => { const x = (a["V_"+v+"1"] || 3), y = (a["V_"+v+"2"] || 3); out[v] = Math.round(((x + y) / 2 - 1) / 4 * 100); });
      values = { out: out, top: Object.keys(out).sort((p, q) => out[q] - out[p]).slice(0, 2) };
    }
    return deriveAll(rPct, bf, values);
  }
  function deriveAll(rPct, bf, values) {
    const order = RIASEC.slice().sort((p, q) => rPct[q] - rPct[p] || HEX.indexOf(p) - HEX.indexOf(q));
    const top = order.slice(0, 3), primary = order[0], secondary = order[1];
    const code = top.join(""); const diffVal = rPct[order[0]] - rPct[order[5]];
    const differentiation = diffVal >= 40 ? "yüksek" : diffVal >= 20 ? "orta" : "düşük";
    const consistency = ADJ[primary].indexOf(secondary) >= 0 ? "yüksek" : (OPP.indexOf(primary + secondary) >= 0 ? "düşük" : "orta");
    const vals = BFD.map(d => bf[d]); const mean = vals.reduce((x, y) => x + y, 0) / vals.length;
    const sd = Math.sqrt(vals.reduce((s, v) => s + (v - mean) * (v - mean), 0) / vals.length) || 1;
    const z = {}; BFD.forEach(d => z[d] = (bf[d] - mean) / sd);
    const salient = BFD.map(d => ({ dim: d, z: z[d] })).filter(o => Math.abs(o.z) >= 0.5).sort((p, q) => Math.abs(q.z) - Math.abs(p.z));
    const contrib = { R:0, I:0, A:0, S:0, E:0, C:0 };
    for (const b in D.bridge) { const sv = bf[b] != null ? bf[b] : 0; for (const t in D.bridge[b]) contrib[t] += (sv / 100) * D.bridge[b][t] * 100; }
    const bridgeFinal = {}; RIASEC.forEach(t => bridgeFinal[t] = clamp(Math.round(0.7 * rPct[t] + 0.3 * contrib[t]), 0, 100));
    const archetype = matchArchetype({ primary, secondary, diffVal, salient });
    return { rPct, bf, values, order, top, primary, secondary, code, diffVal, differentiation, consistency, z, salient, bridgeFinal, archetype, funBadge: FUN[primary], strengths: signatureStrengths(primary, secondary, salient) };
  }
  function matchArchetype(o) {
    if (o.diffVal < 20) return byId(13);
    const sp = D.specialPairs[o.primary + o.secondary]; if (sp) return byId(sp);
    const map = D.archetypeMap[o.primary] || {};
    for (let i = 0; i < o.salient.length; i++) {
      const s = o.salient[i]; let key = s.dim;
      if (s.dim === "E" && s.z < 0 && map["E-"]) key = "E-"; else if (s.z < 0) continue;
      if (map[key]) return byId(map[key]);
    }
    return byId(map["_"] || 1);
  }
  function byId(id) { return D.archetypes.find(a => a.id === id) || D.archetypes[0]; }
  function signatureStrengths(primary, secondary, salient) {
    const out = []; const add = s => { if (s && out.indexOf(s) < 0) out.push(s); };
    D.types[primary].strengths.forEach(add);
    D.types[secondary].strengths.slice(0, 2).forEach(add);
    salient.filter(s => s.z > 0).forEach(s => { const bf = bfByDisplay(s.dim); if (bf && bf.strengths) bf.strengths.forEach(add); });
    return out.slice(0, 5);
  }
  function bfByDisplay(d) { for (const k in D.bigfive) { const x = D.bigfive[k]; if ((x.fromN ? "ES" : x.key) === d) return x; } return null; }

  /* ---------- meslek uyumu ---------- */
  function careerVec(kod) { const v = { R:1, I:1, A:1, S:1, E:1, C:1 }; const w = [5, 4, 3]; for (let i = 0; i < kod.length && i < 3; i++) v[kod[i]] = w[i]; return v; }
  function pearson(a, b) {
    const n = RIASEC.length; let sa = 0, sb = 0; RIASEC.forEach(k => { sa += a[k]; sb += b[k]; });
    const ma = sa / n, mb = sb / n; let num = 0, da = 0, db = 0;
    RIASEC.forEach(k => { const x = a[k] - ma, y = b[k] - mb; num += x * y; da += x * x; db += y * y; });
    const den = Math.sqrt(da * db); return den ? num / den : 0;
  }
  let _mc = { sc: null, zone: null, list: null };
  function matchCareers(sc, zone) {
    if (_mc.sc === sc && _mc.zone === zone && _mc.list) return _mc.list; // aynı render içinde tekrar-hesabı önle
    const list = D.careers.map(c => {
      let r = pearson(sc.bridgeFinal, careerVec(c.kod));
      // ikincil/üçüncül baskın tip kodla eşleşiyorsa küçük tie-break bonusu
      if (c.kod.indexOf(sc.secondary) >= 0) r += 0.012;
      if (c.kod.indexOf(sc.top[2]) >= 0) r += 0.006;
      if (sc.values && sc.values.top.indexOf("IN") >= 0 && c.kod[0] === "E") r *= 1.05;
      if (sc.values && sc.values.top.indexOf("RL") >= 0 && c.kod[0] === "S") r *= 1.05;
      return Object.assign({}, c, { r: r });
    }).filter(c => c.jobZone <= zone).sort((a, b) => b.r - a.r).slice(0, 8)
      .map(c => Object.assign(c, { label: c.r >= 0.73 ? "mükemmel uyum" : c.r >= 0.61 ? "güçlü uyum" : c.r >= 0.40 ? "olası uyum" : "keşfet" }));
    _mc = { sc: sc, zone: zone, list: list };
    return list;
  }

  /* ---------- sonuç render ---------- */
  function renderResult(sc, shared) {
    state.scores = sc; state.jobZone = state.jobZone || 5;
    const arche = sc.archetype, accent = arche.hex;
    document.body.style.setProperty("--accent", accent);
    document.body.classList.add("viewing-result");

    const sharedBanner = shared
      ? '<div class="shared-banner">👀 Bu bir arkadaşının sonucu. <button class="btn btn--gold btn--sm" id="ownTestBtn">Kendi yol haritanı çıkar →</button></div>' : "";

    const html =
      sharedBanner +
      '<div class="result-band">🗺️ ' + D.texts.resultTop + '</div>' +
      '<div class="result-hero" style="--accent:' + accent + '">' +
        '<div class="hero-glow" aria-hidden="true"></div>' +
        '<div class="arche-emoji">' + arche.emoji + '</div>' +
        '<div class="eyebrow">Senin yol haritan · ' + esc(sc.funBadge) + '</div>' +
        '<h1 class="arche-name" id="resultTitle" tabindex="-1">' + esc(arche.ad) + '</h1>' +
        '<div class="arche-code">' + sc.code + ' — ' + sc.top.map(k => esc(D.types[k].name)).join(" · ") + '</div>' +
        '<p class="arche-tag">' + esc(arche.def) + '</p>' +
        (shared ? "" : whyResult(sc)) +
      '</div>' +
      '<div class="toc" id="toc">' +
        tocChip("#sec-ilgi", "🧭 İlgi") + tocChip("#sec-karakter", "🪞 Karakter") + tocChip("#sec-meslek", "🎓 Meslekler") + tocChip("#sec-sohbet", "💬 Sohbet") +
      '</div>' +
      '<div class="section"><div class="card" style="--accent:' + accent + '"><h2 style="font-size:1.1rem;margin-bottom:10px">👋 Sen kısaca</h2>' + senKisaca(sc) + '</div></div>' +
      '<div class="section" id="sec-ilgi"><h2>🧭 İlgi Haritan</h2><div class="sub">Hangi tür işlere yatkınsın? — Holland mesleki ilgi modeli (RIASEC) · 0–100</div>' +
        '<div class="badges"><span class="mini-badge">Profil netliği: <b>' + sc.differentiation + '</b></span><span class="mini-badge">Tutarlılık: <b>' + sc.consistency + '</b></span></div>' +
        '<div class="card radar-card" style="--accent:' + accent + '"><div>' + buildRadar(sc.rPct, accent) + '</div><div class="bars">' + sc.order.map(k => barRow(D.types[k].emoji + " " + esc(D.types[k].name) + (D.types[k].en ? ' <span class="en">(' + D.types[k].en + ')</span>' : ''), sc.rPct[k], colorVar(k))).join("") + '</div></div></div>' +
      '<div class="section" id="sec-karakter"><h2>🪞 Karakter Aynan</h2><div class="sub">Beş Faktör (Big Five) kişilik profilin</div><div class="card">' + BFD.map(d => traitRow(d, sc.bf[d])).join("") + '</div></div>' +
      '<div class="section"><h2>⭐ İmza Güçlerin</h2><div class="sub">Profilinin öne çıkardığı güçlü yönler</div><div class="chips">' + sc.strengths.map(s => '<span class="chip">✦ ' + esc(s) + '</span>').join("") + '</div></div>' +
      '<div class="section" id="sec-meslek"><h2>🎓 Keşfedebileceğin Yollar</h2><div class="sub">Profiline en uygun Türkiye’deki bölüm ve meslekler</div>' +
        '<div class="zone-pick" id="zonePick" role="group" aria-label="Eğitim düzeyi filtresi"><span class="zlabel">Ne kadar okumak istersin?</span>' + zoneBtn(5, "Fark etmez") + zoneBtn(4, "Lisans") + zoneBtn(3, "Kısa/Uygulamalı") + zoneBtn(2, "Teknik / Ön lisans") + '</div>' +
        '<div class="careers" id="careersList"></div>' + (D.codeMessages[sc.code] ? '<p class="code-msg">💡 ' + esc(D.codeMessages[sc.code]) + '</p>' : "") + '</div>' +
      (sc.values && sc.values.top.filter(v => D.valueDims[v]).length ? (function () { const vt = sc.values.top.filter(v => D.valueDims[v]); return '<div class="section"><h2>🧭 Seni Yönlendiren Değerler</h2><div class="sub">Bir meslek seçerken bunlara dikkat et</div><div class="chips">' + vt.map(v => '<span class="chip chip--gold">' + D.valueDims[v].emoji + ' ' + esc(D.valueDims[v].name) + '</span>').join("") + '</div><p class="muted" style="font-size:.86rem;margin-top:10px">Senin için öne çıkan: <b>' + vt.map(v => esc(D.valueDims[v].name)).join(" + ") + '</b>. İş ararken “' + esc(D.valueDims[vt[0]].desc) + '” sunan ortamları öncele.</p></div>'; })() : "") +
      '<div class="section"><h2>🌱 Henüz Keşfetmediklerin</h2><div class="sub">Zayıflık değil — istersen deneyebileceğin yeni kapılar</div><div class="card">' + growthHTML(sc) + '</div></div>' +
      '<div class="section"><h2>🚀 Sonraki Adımların</h2><div class="card"><div class="steps">' + D.steps.map(s => '<div class="step"><span class="si">' + s.icon + '</span><span><span class="st">' + esc(s.t) + '</span><br><span class="sd">' + esc(s.d) + '</span></span></div>').join("") + '</div></div></div>' +
      '<div class="section" id="sec-sohbet"><h2>💬 Sohbet Başlat</h2><div class="sub">Bu sonucu tek başına düşün ya da birlikte konuş</div>' +
        '<div class="card dialogue-card"><div class="tabs" id="chatTabs" role="tablist" aria-label="Sohbet sekmeleri">' +
          '<button class="tab is-on" role="tab" id="tab-self" aria-controls="tabBody" aria-selected="true" tabindex="0" data-tab="self">🧠 Kendine Sor</button>' +
          '<button class="tab" role="tab" id="tab-family" aria-controls="tabBody" aria-selected="false" tabindex="-1" data-tab="family">👨‍👩‍👧 Ailenle</button>' +
          '<button class="tab" role="tab" id="tab-counselor" aria-controls="tabBody" aria-selected="false" tabindex="-1" data-tab="counselor">🎓 Rehberinle</button></div>' +
        '<div id="tabBody" role="tabpanel" aria-labelledby="tab-self" tabindex="0"></div></div></div>' +
      '<div class="section"><div class="share-row"><button class="btn btn--primary" id="shareBtn">🔗 Sonucu Paylaş</button><button class="btn btn--gold" id="summaryBtn">📋 Konuşma Özeti</button><button class="btn btn--ghost" id="cardBtn">🖼️ Kart Görseli</button><button class="btn btn--ghost" id="printBtn">🖨️ Yazdır</button><button class="btn btn--ghost" id="restartBtn">↻ Tekrar Çöz</button></div>' +
        '<textarea class="summary-box" id="summaryBox" readonly aria-label="Konuşma özeti — kopyalayıp ailen veya rehberinle paylaşabilirsin"></textarea>' +
        '<p class="summary-hint" id="summaryHint" hidden>👆 Bu özeti kopyalayıp ailen ya da rehber öğretmeninle paylaşabilirsin.</p></div>' +
      '<p class="result-foot">' + D.texts.privacy + '<br><br><span class="muted" style="font-size:.76rem">' + D.texts.reliability + '</span></p>';

    $("#resultContainer").innerHTML = html;
    renderCareers(); renderTab("self");
    revealResult();

    $("#ownTestBtn") && $("#ownTestBtn").addEventListener("click", () => { restart(); });
    $$("#toc .toc-chip").forEach(c => c.addEventListener("click", e => { e.preventDefault(); const t = $(c.getAttribute("href")); if (t) t.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" }); }));
    $$("#zonePick .zbtn").forEach(b => b.addEventListener("click", () => { state.jobZone = +b.dataset.z; $$("#zonePick .zbtn").forEach(x => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on); }); renderCareers(); }));
    wireTabs();
    $("#shareBtn").addEventListener("click", () => shareResult(sc));
    $("#summaryBtn").addEventListener("click", () => {
      const txt = buildSummary(sc); const box = $("#summaryBox");
      box.value = txt; box.classList.add("show"); $("#summaryHint").hidden = false;
      box.scrollIntoView({ block: "nearest" }); box.focus(); box.select();
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject())
        .then(() => toast("📋 Özet panoya kopyalandı!")).catch(() => toast("Aşağıdaki metni seçip kopyalayabilirsin"));
    });
    $("#cardBtn").addEventListener("click", () => shareCard(sc));
    $("#printBtn").addEventListener("click", () => window.print());
    $("#restartBtn").addEventListener("click", restart);
  }
  function tocChip(href, label) { return '<a class="toc-chip" href="' + href + '">' + label + '</a>'; }

  function revealResult() {
    const cont = $("#resultContainer");
    if (RM) { $$(".bfill", cont).forEach(el => el.style.width = el.dataset.w + "%"); $$(".count", cont).forEach(el => el.textContent = el.dataset.to); $$(".radar-poly", cont).forEach(el => el.classList.add("in")); return; }
    cont.classList.add("revealing");
    $$(".section, .result-band, .toc", cont).forEach((s, i) => { s.style.setProperty("--rd", (0.05 + i * 0.07).toFixed(2) + "s"); s.classList.add("rise"); });
    // bar + sayaç + radar animasyonu
    setTimeout(() => {
      $$(".bfill", cont).forEach(el => el.style.width = el.dataset.w + "%");
      $$(".radar-poly", cont).forEach(el => el.classList.add("in"));
      $$(".count", cont).forEach(el => countUp(el, +el.dataset.to, 900));
    }, 300);
  }
  function countUp(el, to, dur) {
    const t0 = performance.now();
    (function f(now) { const p = Math.min(1, (now - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  function whyResult(sc) {
    if (!state.answers || !Object.keys(state.answers).length) return "";
    const prim = sc.primary;
    const liked = D.items.filter(q => q.layer === "riasec" && q.type === prim && (state.answers[q.id] || 0) >= 4)
      .sort((a, b) => (state.answers[b.id] || 0) - (state.answers[a.id] || 0)).slice(0, 2);
    if (!liked.length) return "";
    const rows = liked.map(q => '<li>“' + esc(q.text.replace(/\.$/, "")) + '” → <b>' + esc(D.scales.riasec[(state.answers[q.id] || 3) - 1].l) + '</b></li>').join("");
    return '<details class="why-result"><summary>Neden bu sonuç?</summary><p>Bunu sen seçmedin — cevapların söyledi. En çok şu işaretlemen etkiledi:</p><ul>' + rows + '</ul></details>';
  }
  function senKisaca(sc) {
    const p = D.types[sc.primary], s = D.types[sc.secondary];
    const sal = sc.salient.find(x => x.z > 0); const bf = sal ? bfByDisplay(sal.dim) : null;
    let out = '<p style="color:var(--ink-soft);font-size:1.04rem"><b>' + esc(p.name) + '</b> ve <b>' + esc(s.name) + '</b> yanların öne çıkıyor — ' + esc(p.taglineYou || p.tagline.toLowerCase()) + ' ';
    if (bf) out += 'Karakterinde en belirgin yanın ise <b>' + esc(bf.name.split(" & ")[0].toLowerCase()) + '</b>: ' + esc(bf.fb.high.toLowerCase().replace(/\.$/, "")) + '. ';
    out += 'Bu güçlü yanların sayesinde birçok alanda parlayabilirsin.</p>';
    if (D.codeMessages[sc.code]) out += '<p class="muted" style="margin-top:10px;font-size:.9rem">💡 ' + esc(D.codeMessages[sc.code]) + '</p>';
    return out;
  }
  function barRow(label, v, color) {
    return '<div class="rbar"><div class="rbar-h"><span class="blabel">' + label + '</span><span class="bval"><span class="count" data-to="' + v + '">0</span></span></div>' +
      '<span class="btrack"><span class="bfill" data-w="' + v + '" style="width:0;background:' + color + '"></span></span></div>';
  }
  function traitRow(d, v) {
    const t = bfByDisplay(d); const lvl = v >= 65 ? "high" : v <= 40 ? "low" : "mid";
    return '<div class="trait"><div class="thead"><span class="tname">' + t.emoji + ' ' + esc(t.name) + (t.orig ? ' <span class="en">(' + t.orig + ')</span>' : '') + '</span><span class="tscore"><span class="count" data-to="' + v + '">0</span>/100</span></div>' +
      '<div class="poles"><span>' + esc(t.poles[0]) + '</span><span>' + esc(t.poles[1]) + '</span></div>' +
      '<span class="btrack"><span class="bfill" data-w="' + v + '" style="width:0;background:linear-gradient(90deg,var(--violet),var(--gold))"></span></span>' +
      '<div class="tdesc">' + esc(t.fb[lvl]) + '</div></div>';
  }
  function growthHTML(sc) {
    return sc.order.slice(-2).reverse().map(k => { const t = D.types[k];
      return '<div class="step"><span class="si">' + t.emoji + '</span><span><span class="st">' + esc(t.name) + ' yanı</span><br><span class="sd">Bu alan şu an daha az öne çıktı — bu “yapamam” demek değil, belki henüz denemedin. Küçük bir adımla (' + esc(t.strengths[0] || "yeni bir deneyim") + ' gerektiren bir uğraş) keşfedebilirsin.</span></span></div>'; }).join("");
  }
  function zoneBtn(z, label) { const on = z === (state.jobZone || 5); return '<button class="zbtn' + (on ? ' is-on' : '') + '" data-z="' + z + '" aria-pressed="' + on + '">' + label + '</button>'; }
  function matchCls(r) { return r >= 0.73 ? "m3" : r >= 0.61 ? "m2" : r >= 0.40 ? "m1" : "m0"; }
  function careerWhy(c) { return c.why || (D.types[c.kod[0]] ? D.types[c.kod[0]].name + " yanına güçlü biçimde hitap eder." : ""); }
  function renderCareers() {
    const list = matchCareers(state.scores, state.jobZone || 5); const el = $("#careersList"); if (!el) return;
    if (!list.length) { el.innerHTML = '<p class="muted">Bu eğitim düzeyinde eşleşme bulunamadı, “Fark etmez”i dene.</p>'; return; }
    el.innerHTML = list.map(c => { const lt = c.kod[0]; const hasDetail = c.next || c.watchout; const why = careerWhy(c);
      return '<div class="career' + (hasDetail ? ' has-detail' : '') + '" style="--accent:' + colorVar(lt) + '">' +
        '<div class="cmatch ' + matchCls(c.r) + '">' + c.label + '</div>' +
        '<div class="cname">' + esc(c.ad) + (c.trend ? ' <span class="trend">⚡ yükselen</span>' : '') + '</div>' +
        '<div class="cfields">' + esc((c.ornek || []).join(" · ")) + '</div>' +
        (why ? '<div class="cwhy">💡 ' + esc(why) + '</div>' : '') +
        '<span class="yks">YKS: ' + esc(c.puanTuru) + '</span>' +
        (hasDetail ? '<button class="cdetail-toggle" type="button" aria-expanded="false">▾ Sonraki adım &amp; dikkat</button><div class="cdetail">' +
          (c.next ? '<p>🧭 <b>İlk adım:</b> ' + esc(c.next) + '</p>' : '') +
          (c.watchout ? '<p>⚠️ <b>Dikkat:</b> ' + esc(c.watchout) + '</p>' : '') + '</div>' : '') +
      '</div>'; }).join("");
    $$("#careersList .cdetail-toggle").forEach(b => b.addEventListener("click", () => { const open = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", open); }));
  }
  function wireTabs() {
    const tabs = $$("#chatTabs .tab");
    tabs.forEach((b, i) => {
      b.addEventListener("click", () => activateTab(b));
      b.addEventListener("keydown", e => {
        let n = -1;
        if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
        if (n >= 0) { e.preventDefault(); tabs[n].focus(); activateTab(tabs[n]); }
      });
    });
  }
  function activateTab(b) { $$("#chatTabs .tab").forEach(x => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-selected", on); x.setAttribute("tabindex", on ? "0" : "-1"); }); const tb = $("#tabBody"); if (tb) tb.setAttribute("aria-labelledby", b.id); renderTab(b.dataset.tab); }
  function renderTab(tab) {
    const sc = state.scores, body = $("#tabBody"); if (!body) return;
    const fill = s => fillVars(sc, s);
    let html = "";
    if (tab === "family") {
      html += '<div class="guide"><div class="guide-col"><b>✅ Yap</b><ul>' + D.dialogue.familyGuide.do.map(x => '<li>' + esc(x) + '</li>').join("") + '</ul></div>' +
        '<div class="guide-col"><b>❌ Yapma</b><ul>' + D.dialogue.familyGuide.dont.map(x => '<li>' + esc(x) + '</li>').join("") + '</ul></div></div>';
      html += '<div class="qa-list">' + D.dialogue.family.map(q => '<div class="qa"><p>' + esc(fill(q)) + '</p></div>').join("") + '</div>';
    } else {
      const arr = tab === "self" ? D.dialogue.self : D.dialogue.counselor;
      html = '<div class="qa-list">' + arr.map(q => '<div class="qa"><p>' + esc(fill(q)) + '</p></div>').join("");
      if (tab === "self" && D.archetypeChat[sc.archetype.id]) html += '<div class="qa qa--star"><p>' + esc(D.archetypeChat[sc.archetype.id]) + '</p></div>';
      html += '</div>';
    }
    body.innerHTML = html;
  }
  function firstCareer(sc, idx) { const c = matchCareers(sc, state.jobZone || 5)[idx]; return c ? (c.ornek && c.ornek[0] ? c.ornek[0] : c.ad) : "bir meslek"; }
  function varMap(sc) { return { arketip: sc.archetype.ad, baskin: D.types[sc.primary].name, ikincil: D.types[sc.secondary].name, dusuk: D.types[sc.order[5]].name, guc1: sc.strengths[0] || "güçlü yanın", meslek1: firstCareer(sc, 0), meslek2: firstCareer(sc, 1) }; }
  function fillVars(sc, s) { const V = varMap(sc); return s.replace(/\{(\w+)\}/g, (m, k) => V[k] || m); }
  function buildSummary(sc) {
    const a = sc.archetype;
    const top3 = sc.top.map(k => D.types[k].name + " (" + D.types[k].en + ")").join(", ");
    const careers = matchCareers(sc, state.jobZone || 5).slice(0, 4).map(c => c.ad).join(", ");
    const bf = BFD.map(d => bfByDisplay(d).name.split(" & ")[0] + " " + sc.bf[d]).join(" · ");
    const qs = D.dialogue.self.slice(0, 3).map(q => "• " + fillVars(sc, q)).join("\n");
    return "YOL HARİTAN — Profil Özeti\n──────────────────\n" +
      "Arketip: " + a.emoji + " " + a.ad + "\n" +
      "İlgi kodu: " + sc.code + " — " + top3 + "\n" +
      "Güçlü yönler: " + sc.strengths.join(", ") + "\n" +
      "Karakter (0–100): " + bf + "\n" +
      "Sana yakın alanlar: " + careers + "\n\n" +
      "Birlikte konuşmak için:\n" + qs + "\n\n" +
      "Not: Bu bir keşif aracıdır, değişmez bir karar değil.\nraufenc.com/yol-haritan";
  }

  /* ---------- radar (erişilebilir + animasyonlu + accent) ---------- */
  function buildRadar(r, accent) {
    const n = 6, cx = 130, cy = 130, R = 92;
    const pt = (i, rad) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]; };
    let grid = ""; [0.25, 0.5, 0.75, 1].forEach(f => grid += '<polygon points="' + RIASEC.map((_, i) => pt(i, R * f).join(",")).join(" ") + '" fill="none" stroke="rgba(255,255,255,.10)"/>');
    let axes = "", labels = "";
    RIASEC.forEach((k, i) => { const [x, y] = pt(i, R); axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="rgba(255,255,255,.08)"/>';
      const [lx, ly] = pt(i, R + 18); labels += '<text x="' + lx + '" y="' + (ly + 5) + '" text-anchor="middle" font-size="16" fill="' + colorVar(k) + '">' + D.types[k].emoji + '</text>'; });
    const dpts = RIASEC.map((k, i) => pt(i, R * (r[k] / 100)).join(",")).join(" ");
    const dots = RIASEC.map((k, i) => { const [x, y] = pt(i, R * (r[k] / 100)); return '<circle cx="' + x + '" cy="' + y + '" r="3.4" fill="' + colorVar(k) + '" class="radar-dot"/>'; }).join("");
    // Sayısal profil ekran okuyucuya yalnız tabloyla bir kez verilir; SVG tamamen dekoratif (aria-hidden).
    const table = '<table class="sr-only"><caption>İlgi profili (RIASEC, 0–100)</caption><thead><tr><th>Alan</th><th>Puan</th></tr></thead><tbody>' +
      RIASEC.map(k => '<tr><td>' + esc(D.types[k].name) + '</td><td>' + r[k] + '</td></tr>').join("") + '</tbody></table>';
    return '<svg class="radar-svg" viewBox="0 0 260 260" aria-hidden="true" focusable="false">' +
      grid + axes + '<polygon class="radar-poly" points="' + dpts + '" fill="color-mix(in srgb, var(--accent) 26%, transparent)" stroke="var(--accent)" stroke-width="2"/>' + dots + labels + '</svg>' + table;
  }

  /* ---------- paylaşım ---------- */
  function shareResult(sc) {
    const payload = { v: 1, r: RIASEC.map(k => sc.rPct[k]), b: BFD.map(d => sc.bf[d]), val: sc.values ? sc.values.out : null };
    const enc = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(payload)))));
    const url = location.origin + location.pathname + "#r=" + enc;
    const txt = "Yol Haritan'da profilim: " + sc.archetype.emoji + " " + sc.archetype.ad + "! Sen de keşfet:";
    if (navigator.share) navigator.share({ title: "Yol Haritan", text: txt, url: url }).catch(() => {});
    else (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => toast("🔗 Bağlantı kopyalandı!")).catch(() => prompt("Bağlantını kopyala:", url));
  }
  function readShared() {
    const m = location.hash.match(/r=([^&]+)/); if (!m) return null;
    try {
      const o = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(m[1])))));
      if (!o || !Array.isArray(o.r) || o.r.length !== 6 || !Array.isArray(o.b) || o.b.length !== 5) return null;
      if (o.r.some(n => typeof n !== "number" || isNaN(n)) || o.b.some(n => typeof n !== "number" || isNaN(n))) return null;
      const rPct = {}, bf = {}; RIASEC.forEach((k, i) => rPct[k] = clamp(Math.round(o.r[i]), 0, 100)); BFD.forEach((d, i) => bf[d] = clamp(Math.round(o.b[i]), 0, 100));
      const vobj = o.val || o.v; let values = null;
      if (vobj && typeof vobj === "object" && !Array.isArray(vobj)) {
        const ALLOWED = ["AC", "IN", "RE", "RL", "SU", "WC"], clean = {};
        ALLOWED.forEach(k => { if (typeof vobj[k] === "number" && !isNaN(vobj[k])) clean[k] = clamp(Math.round(vobj[k]), 0, 100); });
        if (Object.keys(clean).length) values = { out: clean, top: Object.keys(clean).sort((p, q) => clean[q] - clean[p]).slice(0, 2) };
      }
      return deriveAll(rPct, bf, values);
    } catch (e) { return null; }
  }
  function restart() {
    if (location.hash) history.replaceState(null, "", location.pathname);
    try { localStorage.removeItem("yh_save"); } catch (e) {}
    document.body.classList.remove("viewing-result"); document.body.style.removeProperty("--accent");
    const rc = $(".resume-card"); if (rc) rc.remove();
    state.i = 0; state.answers = {}; state.valuesIncluded = false; state.scores = null; state.jobZone = 5; state.locking = false;
    show("screen-intro");
  }

  /* ---------- paylaşılabilir kart görseli (Canvas → PNG, cihazda) ---------- */
  function shareCard(sc) {
    try {
      const W = 1080, H = 1080, c = document.createElement("canvas"); c.width = W; c.height = H;
      const x = c.getContext("2d"); const acc = sc.archetype.hex;
      const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0b1a2e"); g.addColorStop(1, mix(acc, "#07101f", .55));
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      const rg = x.createRadialGradient(W * .3, H * .28, 50, W * .3, H * .28, 700); rg.addColorStop(0, hexA(acc, .35)); rg.addColorStop(1, hexA(acc, 0));
      x.fillStyle = rg; x.fillRect(0, 0, W, H);
      x.textAlign = "center"; x.fillStyle = "#cdd9e6"; x.font = "600 38px 'Plus Jakarta Sans', sans-serif"; x.fillText("YOL HARİTAN", W / 2, 130);
      x.font = "800 240px serif"; x.fillText(sc.archetype.emoji, W / 2, 470);
      x.fillStyle = "#fff"; x.font = "800 92px 'Sora','Plus Jakarta Sans',sans-serif"; x.fillText(sc.archetype.ad, W / 2, 620);
      x.fillStyle = acc; x.font = "800 64px 'Sora',sans-serif"; x.fillText(sc.code + " · " + sc.top.map(k => D.types[k].name).join(" · "), W / 2, 715);
      // mini radar
      drawMiniRadar(x, W / 2, 850, 130, sc.rPct, acc);
      x.fillStyle = "#8ba2b6"; x.font = "500 34px 'Plus Jakarta Sans',sans-serif"; x.fillText("raufenc.com/yol-haritan", W / 2, 1030);
      c.toBlob(blob => {
        const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "yol-haritan-" + sc.code + ".png"; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000); toast("🖼️ Kart görselin indirildi!");
      }, "image/png");
    } catch (e) { toast("Kart oluşturulamadı, “Sonucu Paylaş”ı dene"); }
  }
  function drawMiniRadar(x, cx, cy, R, r, acc) {
    const pts = RIASEC.map((k, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; const rad = R * (r[k] / 100); return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]; });
    x.strokeStyle = "rgba(255,255,255,.14)"; x.lineWidth = 1.5;
    [0.5, 1].forEach(f => { x.beginPath(); RIASEC.forEach((k, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; const px = cx + Math.cos(a) * R * f, py = cy + Math.sin(a) * R * f; i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath(); x.stroke(); });
    x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath();
    x.fillStyle = hexA(acc, .35); x.fill(); x.strokeStyle = acc; x.lineWidth = 3; x.stroke();
  }
  function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; }
  function mix(h1, h2, t) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const r = Math.round((a >> 16 & 255) * (1 - t) + (b >> 16 & 255) * t), g = Math.round((a >> 8 & 255) * (1 - t) + (b >> 8 & 255) * t), bl = Math.round((a & 255) * (1 - t) + (b & 255) * t); return "rgb(" + r + "," + g + "," + bl + ")"; }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
