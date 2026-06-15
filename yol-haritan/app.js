/* ===================================================================
   YOL HARİTAN — Uygulama motoru
   5 tur · 4 format · RIASEC + Big Five puanlama · 16 arketip · meslek uyumu
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
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const colorVar = k => "var(--c-" + k + ")";
  const FUN = { R:"Maker Kafası", I:"Mucit Kafası", A:"Sanatçı Ruhu", S:"İyi Kalp", E:"Lider Ruhu", C:"Planlama Dehası" };

  const state = { queue: [], i: 0, answers: {}, valuesIncluded: false, jobZone: 5, scores: null };

  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200); }
  function show(id) { $$(".screen").forEach(s => s.classList.remove("is-active")); $("#" + id).classList.add("is-active"); window.scrollTo(0, 0); }
  function itemsOfTurn(t) { return D.items.filter(it => it.turn === t); }

  function init() {
    buildStars(); buildTypesStrip();
    $("#introDisclaimer").innerHTML = D.texts.intro;
    $("#pill-count").textContent = "🧩 " + D.items.filter(it => it.turn <= 4).length + " soru";
    $("#startBtn").addEventListener("click", startQuiz);
    document.addEventListener("keydown", onKey);
    const shared = readShared();
    if (shared) { state.scores = shared; renderResult(shared, true); show("screen-result"); }
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
      return '<div class="type-dot" title="' + t.name + '" style="background:color-mix(in srgb,' + colorVar(k) + ' 24%, var(--bg-2));border:1px solid ' + colorVar(k) + '">' + t.emoji + '</div>'; }).join("");
  }

  function startQuiz() {
    state.answers = {}; state.valuesIncluded = false; state.i = 0;
    state.queue = D.items.filter(it => it.turn <= 4);
    show("screen-quiz");
    showTurnIntro(state.queue[0].turn);
  }
  function showTurnIntro(turnId) {
    const t = D.turns.find(x => x.id === turnId);
    const len = state.queue.filter(q => q.turn === turnId).length;
    $("#qContainer").innerHTML =
      '<div class="turn-intro q">' +
        '<div class="turn-emoji">' + t.emoji + '</div>' +
        '<div class="turn-num">Bölüm ' + turnId + (turnId <= 4 ? " / 4" : "") + '</div>' +
        '<h2>' + t.name + '</h2>' +
        '<p class="muted">' + t.teaser + '</p>' +
        '<p class="pill" style="margin:14px auto 22px;display:inline-flex">⏱️ ~90 saniye · ' + len + ' soru</p><br>' +
        '<button class="btn btn--gold" id="turnGo">Başla ▶</button>' +
      '</div>';
    renderProgress(turnId, 0);
    $("#turnGo").addEventListener("click", () => renderItem());
  }
  function turnBounds(pos) {
    const turn = state.queue[pos].turn;
    const inTurn = state.queue.filter(q => q.turn === turn);
    return { turn: turn, idx: inTurn.findIndex(q => q.id === state.queue[pos].id), len: inTurn.length };
  }
  function renderProgress(curTurn, fillFrac) {
    const segs = [1,2,3,4,5].map(tid => {
      let fill = 0, cls = "seg";
      if (tid < curTurn) fill = 100; else if (tid === curTurn) fill = Math.round(fillFrac * 100);
      if (tid === 5 && !state.valuesIncluded) cls += " seg--opt";
      return '<span class="' + cls + '"><span class="seg__f" style="width:' + fill + '%"></span></span>';
    }).join("");
    const t = D.turns.find(x => x.id === curTurn);
    const sw = $("#segs"); if (sw) sw.innerHTML = segs;
    $("#sectLabel").textContent = t.emoji + " " + t.name;
  }
  function renderItem() {
    const q = state.queue[state.i];
    const b = turnBounds(state.i);
    renderProgress(b.turn, b.idx / b.len);
    $("#qCounter").textContent = (b.idx + 1) + " / " + b.len;
    const remaining = b.len - b.idx;
    const micro = remaining <= 2 ? '<span class="micro">Son ' + remaining + ' soru! 💪</span>' : "";

    let body = "", accent = "var(--violet)", kicker = "";
    if (q.layer === "riasec") { accent = colorVar(q.type); kicker = '<span class="tag tag-' + q.type + '">' + D.types[q.type].name + '</span>'; }
    else if (q.layer === "bigfive") kicker = '<span>Karakter</span>';
    else if (q.layer === "values") kicker = '<span>Değer</span>';
    else kicker = '<span>Senaryo</span>';

    if (q.format === "likert") body = scaleHTML(q, "list");
    else if (q.format === "swipe") body = scaleHTML(q, "react");
    else if (q.format === "slider") body = sliderHTML(q);
    else if (q.format === "scenario") body = scenarioHTML(q);

    const showNext = q.format === "slider";
    $("#qContainer").innerHTML =
      '<div class="q" style="--accent:' + accent + '">' +
        '<div class="q__kicker">' + kicker + micro + '</div>' +
        '<div class="q__text">' + q.text + '</div>' +
        '<div class="q__hint">' + (q.hint || hintFor(q)) + '</div>' +
        body +
        '<div class="q-nav">' +
          (state.i > 0 ? '<button class="btn btn--ghost btn--sm" id="prevBtn">‹ Geri</button>' : '<span></span>') +
          '<span class="spacer"></span>' +
          (showNext ? '<button class="btn btn--primary btn--sm" id="nextBtn">İleri ›</button>' : '') +
        '</div>' +
      '</div>';
    wire(q);
    $("#quizLive").textContent = q.text;
  }
  function hintFor(q) {
    if (q.layer === "riasec") return "Bu işi yapmak hoşuna gider mi? İçinden geldiği gibi seç.";
    if (q.layer === "values") return "Bir işte bu senin için ne kadar önemli?";
    return "Sana ne kadar uyuyor? Doğru/yanlış yok.";
  }
  function scaleHTML(q, layout) {
    const opts = D.scales[q.scale]; const cur = state.answers[q.id];
    const cls = layout === "react" ? "scale scale--react" : "scale";
    return '<div class="' + cls + '" role="group">' + opts.map(o =>
      '<button class="scale__opt' + (cur === o.v ? ' is-on' : '') + '" data-v="' + o.v + '">' +
        '<span class="emoji">' + o.e + '</span>' + (layout === "react" ? '' : '<span class="dot"></span>') +
        '<span class="lbl">' + o.l + '</span></button>').join("") + '</div>';
  }
  function sliderHTML(q) {
    const cur = state.answers[q.id] != null ? state.answers[q.id] : 50;
    return '<div class="slider-wrap"><div class="slider-row"><span>' + (q.minLabel || "Hiç") + '</span><span>' + (q.maxLabel || "Çok") + '</span></div>' +
      '<input type="range" class="slider" id="sld" min="0" max="100" step="1" value="' + cur + '" style="--pct:' + cur + '%">' +
      '<div class="slider-val" id="sldVal">' + cur + '</div></div>';
  }
  function scenarioHTML(q) {
    const cur = state.answers[q.id];
    return '<div class="choice">' + q.options.map((o, idx) =>
      '<button class="choice__opt' + (cur === idx ? ' is-on' : '') + '" data-idx="' + idx + '">' +
        '<span class="emoji">' + o.emoji + '</span><span class="t">' + o.t + '</span>' + (o.d ? '<span class="d">' + o.d + '</span>' : '') +
      '</button>').join("") + '</div>';
  }
  function wire(q) {
    if (q.format === "likert" || q.format === "swipe") {
      $$(".scale__opt").forEach(b => b.addEventListener("click", () => {
        state.answers[q.id] = parseInt(b.dataset.v, 10);
        $$(".scale__opt").forEach(x => x.classList.remove("is-on")); b.classList.add("is-on"); persist(); advance();
      }));
    } else if (q.format === "scenario") {
      $$(".choice__opt").forEach(b => b.addEventListener("click", () => {
        state.answers[q.id] = parseInt(b.dataset.idx, 10);
        $$(".choice__opt").forEach(x => x.classList.remove("is-on")); b.classList.add("is-on"); persist(); advance();
      }));
    } else if (q.format === "slider") {
      const sld = $("#sld");
      if (state.answers[q.id] == null) state.answers[q.id] = 50;
      sld.addEventListener("input", () => { state.answers[q.id] = parseInt(sld.value, 10); sld.style.setProperty("--pct", sld.value + "%"); $("#sldVal").textContent = sld.value; });
      $("#nextBtn") && $("#nextBtn").addEventListener("click", next);
    }
    $("#prevBtn") && $("#prevBtn").addEventListener("click", prev);
  }
  function advance() { const qEl = $(".q"); setTimeout(() => { if (qEl) qEl.classList.add("is-leaving"); setTimeout(next, 170); }, 220); }
  function next() {
    const prevTurn = state.queue[state.i].turn; state.i++;
    if (state.i >= state.queue.length) return endOfQueue();
    const newTurn = state.queue[state.i].turn;
    if (newTurn !== prevTurn) showInterstitial(prevTurn, newTurn); else renderItem();
  }
  function prev() { if (state.i > 0) { state.i--; renderItem(); } }
  function showInterstitial(doneTurn, nextTurn) {
    const dn = D.turns.find(x => x.id === doneTurn), nx = D.turns.find(x => x.id === nextTurn);
    $("#qContainer").innerHTML =
      '<div class="turn-intro q"><div class="turn-emoji pop">🎉</div><h2>' + dn.name + ' tamam!</h2>' +
        '<p class="muted">' + (nx ? "Sırada: " + nx.emoji + " " + nx.name : "") + '</p>' +
        '<p class="muted" style="margin-top:6px">' + (nx ? nx.teaser : "") + '</p>' +
        '<br><button class="btn btn--gold" id="contBtn">Devam ▶</button></div>';
    renderProgress(nextTurn, 0);
    $("#contBtn").addEventListener("click", () => renderItem());
  }
  function endOfQueue() { if (!state.valuesIncluded) return showValuesOffer(); finish(); }
  function showValuesOffer() {
    show("screen-quiz");
    $("#qContainer").innerHTML =
      '<div class="turn-intro q"><div class="turn-emoji">🧭</div><h2>Son bir bölüm ister misin?</h2>' +
        '<p class="muted">Seni asıl yönlendiren <strong>değerleri</strong> ekleyelim mi? Sonucunu zenginleştirir (12 soru · ~90 sn). İstemezsen sonucu hemen görebilirsin.</p>' +
        '<div class="q-nav" style="justify-content:center;gap:12px;margin-top:22px">' +
          '<button class="btn btn--ghost" id="skipVals">Sonucu gör →</button>' +
          '<button class="btn btn--gold" id="doVals">Devam et (12 soru)</button></div></div>';
    renderProgress(5, 0);
    $("#doVals").addEventListener("click", () => { state.valuesIncluded = true; state.queue = state.queue.concat(itemsOfTurn(5)); renderItem(); });
    $("#skipVals").addEventListener("click", finish);
  }
  function onKey(e) {
    if (!$("#screen-quiz").classList.contains("is-active")) return;
    const q = state.queue[state.i]; if (!q) return;
    if ((q.format === "likert" || q.format === "swipe") && e.key >= "1" && e.key <= "5") { state.answers[q.id] = +e.key; persist(); advance(); }
    else if (q.format === "scenario" && e.key >= "1" && e.key <= String(q.options.length)) { state.answers[q.id] = +e.key - 1; persist(); advance(); }
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === "Enter" && q.format === "slider") next();
  }
  function persist() { try { localStorage.setItem("yh_answers", JSON.stringify(state.answers)); } catch (e) {} }

  function finish() {
    show("screen-calc");
    const msgs = ["Cevapların analiz ediliyor", "İlgi haritan çiziliyor", "Karakter aynan parlatılıyor", "Meslekler eşleştiriliyor"];
    let m = 0; const iv = setInterval(() => { m++; $("#calcMsg").textContent = msgs[m % msgs.length]; }, 600);
    setTimeout(() => {
      clearInterval(iv);
      const sc = computeScores(); state.scores = sc;
      renderResult(sc, false); show("screen-result");
      try { localStorage.setItem("yh_result", JSON.stringify({ r: sc.rPct, b: sc.bf, v: sc.values })); } catch (e) {}
    }, 2000);
  }
  function computeScores() {
    const a = state.answers;
    const rRaw = { R:0, I:0, A:0, S:0, E:0, C:0 };
    D.items.forEach(q => {
      if (q.layer === "riasec") rRaw[q.type] += (a[q.id] != null ? a[q.id] : 3);
      else if (q.format === "scenario" && a[q.id] != null) {
        const o = q.options[a[q.id]]; if (o && o.scores) for (const k in o.scores) if (rRaw[k] != null) rRaw[k] += o.scores[k];
      }
    });
    const rPct = {}; RIASEC.forEach(t => rPct[t] = clamp(Math.round((rRaw[t] - 6) / 24 * 100), 0, 100));
    const dims = { O:[], C:[], E:[], A:[], N:[] };
    D.items.forEach(q => {
      if (q.layer !== "bigfive") return;
      let v = a[q.id];
      if (q.format === "slider") v = 1 + (v != null ? v : 50) / 25; else v = (v != null ? v : 3);
      if (q.reverse) v = 6 - v; dims[q.dim].push(v);
    });
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
    const consistency = ADJ[primary].indexOf(secondary) >= 0 ? "yüksek" : (["RS","IE","AC","SR","EI","CA"].indexOf(primary + secondary) >= 0 ? "düşük" : "orta");
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

  function careerVec(kod) { const v = { R:1, I:1, A:1, S:1, E:1, C:1 }; const w = [5, 4, 3]; for (let i = 0; i < kod.length && i < 3; i++) v[kod[i]] = w[i]; return v; }
  function pearson(a, b) {
    const n = RIASEC.length; let sa = 0, sb = 0; RIASEC.forEach(k => { sa += a[k]; sb += b[k]; });
    const ma = sa / n, mb = sb / n; let num = 0, da = 0, db = 0;
    RIASEC.forEach(k => { const x = a[k] - ma, y = b[k] - mb; num += x * y; da += x * x; db += y * y; });
    const den = Math.sqrt(da * db); return den ? num / den : 0;
  }
  function matchCareers(sc, zone) {
    return D.careers.map(c => {
      let r = pearson(sc.bridgeFinal, careerVec(c.kod));
      if (sc.values && sc.values.top.indexOf("IN") >= 0 && c.kod[0] === "E") r *= 1.05;
      if (sc.values && sc.values.top.indexOf("RL") >= 0 && c.kod[0] === "S") r *= 1.05;
      return Object.assign({}, c, { r: r });
    }).filter(c => c.jobZone <= zone).sort((a, b) => b.r - a.r).slice(0, 8)
      .map(c => Object.assign(c, { label: c.r >= 0.73 ? "mükemmel uyum" : c.r >= 0.61 ? "güçlü uyum" : c.r >= 0.40 ? "olası uyum" : "keşfet" }));
  }

  function renderResult(sc, shared) {
    state.scores = sc; state.jobZone = state.jobZone || 5;
    const arche = sc.archetype, accent = arche.hex;
    const html =
      '<div class="result-band">🗺️ ' + D.texts.resultTop + '</div>' +
      '<div class="result-hero" style="--accent:' + accent + '">' +
        '<div class="arche-emoji">' + arche.emoji + '</div>' +
        '<div class="eyebrow">Senin yol haritan · ' + sc.funBadge + '</div>' +
        '<h1 class="arche-name" id="resultTitle">' + arche.ad + '</h1>' +
        '<div class="arche-code">' + sc.code + ' — ' + sc.top.map(k => D.types[k].name).join(" · ") + '</div>' +
        '<p class="arche-tag">' + arche.def + '</p></div>' +
      '<div class="section"><div class="card" style="--accent:' + accent + '"><h2 style="font-size:1.1rem;margin-bottom:10px">👋 Sen kısaca</h2>' + senKisaca(sc) + '</div></div>' +
      '<div class="section"><h2>🧭 İlgi Haritan</h2><div class="sub">Hangi tür işlere yatkınsın? — Holland mesleki ilgi modeli (RIASEC) · 0–100</div>' +
        '<div class="badges"><span class="mini-badge">Profil netliği: <b>' + sc.differentiation + '</b></span><span class="mini-badge">Tutarlılık: <b>' + sc.consistency + '</b></span></div>' +
        '<div class="card radar-card"><div>' + buildRadar(sc.rPct) + '</div><div class="bars">' + sc.order.map(k => barRow(D.types[k].emoji + " " + D.types[k].name + (D.types[k].en ? ' <span class="en">(' + D.types[k].en + ')</span>' : ''), sc.rPct[k], colorVar(k))).join("") + '</div></div></div>' +
      '<div class="section"><h2>🪞 Karakter Aynan</h2><div class="sub">Beş Faktör (Big Five) kişilik profilin</div><div class="card">' + BFD.map(d => traitRow(d, sc.bf[d])).join("") + '</div></div>' +
      '<div class="section"><h2>⭐ İmza Güçlerin</h2><div class="sub">Profilinin öne çıkardığı güçlü yönler</div><div class="chips">' + sc.strengths.map(s => '<span class="chip">✦ ' + s + '</span>').join("") + '</div></div>' +
      '<div class="section"><h2>🎓 Keşfedebileceğin Yollar</h2><div class="sub">Profiline en uygun Türkiye’deki bölüm ve meslekler</div>' +
        '<div class="zone-pick" id="zonePick"><span class="zlabel">Ne kadar okumak istersin?</span>' + zoneBtn(5, "Fark etmez") + zoneBtn(4, "Lisans") + zoneBtn(3, "Kısa/Uygulamalı") + zoneBtn(2, "Teknik / Ön lisans") + '</div>' +
        '<div class="careers" id="careersList"></div>' + (D.codeMessages[sc.code] ? '<p class="code-msg">💡 ' + D.codeMessages[sc.code] + '</p>' : "") + '</div>' +
      (sc.values ? '<div class="section"><h2>🧭 Seni Yönlendiren Değerler</h2><div class="sub">Bir meslek seçerken bunlara dikkat et</div><div class="chips">' + sc.values.top.map(v => '<span class="chip" style="background:color-mix(in srgb,var(--gold) 18%,transparent)">' + D.valueDims[v].emoji + ' ' + D.valueDims[v].name + '</span>').join("") + '</div><p class="muted" style="font-size:.86rem;margin-top:8px">Senin için öne çıkan: <b>' + sc.values.top.map(v => D.valueDims[v].name).join(" + ") + '</b>. İş ararken “' + D.valueDims[sc.values.top[0]].desc + '” sunan ortamları öncele.</p></div>' : "") +
      '<div class="section"><h2>🌱 Henüz Keşfetmediklerin</h2><div class="sub">Zayıflık değil — istersen deneyebileceğin yeni kapılar</div><div class="card">' + growthHTML(sc) + '</div></div>' +
      '<div class="section"><h2>🚀 Sonraki Adımların</h2><div class="card"><div class="steps">' + D.steps.map(s => '<div class="step"><span class="si">' + s.icon + '</span><span><span class="st">' + s.t + '</span><br><span class="sd">' + s.d + '</span></span></div>').join("") + '</div></div></div>' +
      '<div class="section"><h2>💬 Sohbet Başlat</h2><div class="sub">Bu sonucu tek başına düşün ya da birlikte konuş</div>' +
        '<div class="card dialogue-card"><div class="tabs" id="chatTabs">' +
          '<button class="tab is-on" data-tab="self">🧠 Kendine Sor</button><button class="tab" data-tab="family">👨‍👩‍👧 Ailenle</button><button class="tab" data-tab="counselor">🎓 Rehberinle</button></div>' +
        '<div id="tabBody"></div></div></div>' +
      '<div class="section"><div class="share-row"><button class="btn btn--primary" id="shareBtn">🔗 Sonucu Paylaş</button><button class="btn btn--gold" id="summaryBtn">📋 Konuşma Özeti</button><button class="btn btn--ghost" id="printBtn">🖨️ Kaydet / Yazdır</button><button class="btn btn--ghost" id="restartBtn">↻ Tekrar Çöz</button></div>' +
        '<textarea class="summary-box" id="summaryBox" readonly aria-label="Konuşma özeti — kopyalayıp ailen veya rehberinle paylaşabilirsin"></textarea>' +
        '<p class="summary-hint" id="summaryHint" hidden>👆 Bu özeti kopyalayıp ailen ya da rehber öğretmeninle paylaşabilirsin.</p></div>' +
      '<p class="result-foot">' + D.texts.privacy + '<br><br><span class="muted" style="font-size:.76rem">' + D.texts.reliability + '</span></p>';
    $("#resultContainer").innerHTML = html;
    renderCareers(); renderTab("self");
    requestAnimationFrame(() => setTimeout(() => $$(".bars .bfill,.trait .bfill").forEach(el => el.style.width = el.dataset.w + "%"), 120));
    $$("#zonePick .zbtn").forEach(b => b.addEventListener("click", () => { state.jobZone = +b.dataset.z; $$("#zonePick .zbtn").forEach(x => x.classList.toggle("is-on", x === b)); renderCareers(); }));
    $$("#chatTabs .tab").forEach(b => b.addEventListener("click", () => { $$("#chatTabs .tab").forEach(x => x.classList.remove("is-on")); b.classList.add("is-on"); renderTab(b.dataset.tab); }));
    $("#shareBtn").addEventListener("click", () => shareResult(sc));
    $("#summaryBtn").addEventListener("click", () => {
      const txt = buildSummary(sc); const box = $("#summaryBox");
      box.value = txt; box.classList.add("show"); $("#summaryHint").hidden = false;
      box.scrollIntoView({ block: "nearest" }); box.focus(); box.select();
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject())
        .then(() => toast("📋 Özet panoya kopyalandı!"))
        .catch(() => toast("Aşağıdaki metni seçip kopyalayabilirsin"));
    });
    $("#printBtn").addEventListener("click", () => window.print());
    $("#restartBtn").addEventListener("click", restart);
  }
  function senKisaca(sc) {
    const p = D.types[sc.primary], s = D.types[sc.secondary];
    const sal = sc.salient.find(x => x.z > 0); const bf = sal ? bfByDisplay(sal.dim) : null;
    let out = '<p style="color:var(--ink-soft);font-size:1.02rem"><b>' + p.name + '</b> ve <b>' + s.name + '</b> yanların öne çıkıyor — ' + p.tagline.toLowerCase() + ' ';
    if (bf) out += 'Karakterinde en belirgin yanın ise <b>' + bf.name.split(" & ")[0].toLowerCase() + '</b>: ' + bf.fb.high.toLowerCase().replace(/\.$/, "") + '. ';
    out += 'Bu güçlü yanların sayesinde birçok alanda parlayabilirsin.</p>';
    if (D.codeMessages[sc.code]) out += '<p class="muted" style="margin-top:10px;font-size:.9rem">💡 ' + D.codeMessages[sc.code] + '</p>';
    return out;
  }
  function barRow(label, v, color) {
    return '<div class="rbar"><div class="rbar-h"><span class="blabel">' + label + '</span><span class="bval">' + v + '</span></div>' +
      '<span class="btrack"><span class="bfill" data-w="' + v + '" style="width:0;background:' + color + '"></span></span></div>';
  }
  function traitRow(d, v) {
    const t = bfByDisplay(d); const lvl = v >= 65 ? "high" : v <= 40 ? "low" : "mid";
    return '<div class="trait"><div class="thead"><span class="tname">' + t.emoji + ' ' + t.name + (t.orig ? ' <span class="en">(' + t.orig + ')</span>' : '') + '</span><span class="tscore">' + v + '/100</span></div>' +
      '<div class="poles"><span>' + t.poles[0] + '</span><span>' + t.poles[1] + '</span></div>' +
      '<span class="btrack"><span class="bfill" data-w="' + v + '" style="width:0;background:linear-gradient(90deg,var(--violet),var(--gold))"></span></span>' +
      '<div class="tdesc">' + t.fb[lvl] + '</div></div>';
  }
  function growthHTML(sc) {
    return sc.order.slice(-2).reverse().map(k => { const t = D.types[k];
      return '<div class="step"><span class="si">' + t.emoji + '</span><span><span class="st">' + t.name + ' yanı</span><br><span class="sd">Bu alan şu an daha az öne çıktı — bu “yapamam” demek değil, belki henüz denemedin. Küçük bir adımla (' + (t.strengths[0] || "yeni bir deneyim") + ' gerektiren bir uğraş) keşfedebilirsin.</span></span></div>'; }).join("");
  }
  function zoneBtn(z, label) { return '<button class="zbtn' + (z === (state.jobZone || 5) ? ' is-on' : '') + '" data-z="' + z + '">' + label + '</button>'; }
  function matchCls(r) { return r >= 0.73 ? "m3" : r >= 0.61 ? "m2" : r >= 0.40 ? "m1" : "m0"; }
  function renderCareers() {
    const list = matchCareers(state.scores, state.jobZone || 5); const el = $("#careersList"); if (!el) return;
    if (!list.length) { el.innerHTML = '<p class="muted">Bu eğitim düzeyinde eşleşme bulunamadı, “Fark etmez”i dene.</p>'; return; }
    el.innerHTML = list.map(c => { const lt = c.kod[0]; const hasDetail = c.next || c.watchout;
      return '<div class="career' + (hasDetail ? ' has-detail' : '') + '" style="--accent:' + colorVar(lt) + '">' +
        '<div class="cmatch ' + matchCls(c.r) + '">' + c.label + '</div>' +
        '<div class="cname">' + c.ad + (c.trend ? ' <span class="trend">⚡ yükselen</span>' : '') + '</div>' +
        '<div class="cfields">' + (c.ornek || []).join(" · ") + '</div>' +
        (c.why ? '<div class="cwhy">💡 ' + c.why + '</div>' : '') +
        '<span class="yks">YKS: ' + c.puanTuru + '</span>' +
        (hasDetail ? '<button class="cdetail-toggle" type="button">▾ Sonraki adım &amp; dikkat</button><div class="cdetail">' +
          (c.next ? '<p>🧭 <b>İlk adım:</b> ' + c.next + '</p>' : '') +
          (c.watchout ? '<p>⚠️ <b>Dikkat:</b> ' + c.watchout + '</p>' : '') + '</div>' : '') +
      '</div>'; }).join("");
    $$("#careersList .cdetail-toggle").forEach(b => b.addEventListener("click", () => b.parentElement.classList.toggle("is-open")));
  }
  function renderTab(tab) {
    const sc = state.scores, body = $("#tabBody"); if (!body) return;
    const fill = s => fillVars(sc, s);
    let html = "";
    if (tab === "family") {
      html += '<div class="guide"><div class="guide-col"><b>✅ Yap</b><ul>' + D.dialogue.familyGuide.do.map(x => '<li>' + x + '</li>').join("") + '</ul></div>' +
        '<div class="guide-col"><b>❌ Yapma</b><ul>' + D.dialogue.familyGuide.dont.map(x => '<li>' + x + '</li>').join("") + '</ul></div></div>';
      html += '<div class="qa-list">' + D.dialogue.family.map(q => '<div class="qa"><p>' + fill(q) + '</p></div>').join("") + '</div>';
    } else {
      const arr = tab === "self" ? D.dialogue.self : D.dialogue.counselor;
      html = '<div class="qa-list">' + arr.map(q => '<div class="qa"><p>' + fill(q) + '</p></div>').join("");
      if (tab === "self" && D.archetypeChat[sc.archetype.id]) html += '<div class="qa qa--star"><p>' + D.archetypeChat[sc.archetype.id] + '</p></div>';
      html += '</div>';
    }
    body.innerHTML = html;
  }
  function firstCareer(sc, idx) { const c = matchCareers(sc, 5)[idx]; return c ? (c.ornek && c.ornek[0] ? c.ornek[0] : c.ad) : "bir meslek"; }
  function varMap(sc) { return { arketip: sc.archetype.ad, baskin: D.types[sc.primary].name, ikincil: D.types[sc.secondary].name, dusuk: D.types[sc.order[5]].name, guc1: sc.strengths[0] || "güçlü yanın", meslek1: firstCareer(sc, 0), meslek2: firstCareer(sc, 1) }; }
  function fillVars(sc, s) { const V = varMap(sc); return s.replace(/\{(\w+)\}/g, (m, k) => V[k] || m); }
  function buildSummary(sc) {
    const a = sc.archetype;
    const top3 = sc.top.map(k => D.types[k].name + " (" + D.types[k].en + ")").join(", ");
    const careers = matchCareers(sc, state.jobZone || 5).slice(0, 4).map(c => c.ad).join(", ");
    const bf = BFD.map(d => bfByDisplay(d).name.split(" & ")[0] + " " + sc.bf[d]).join(" · ");
    const qs = D.dialogue.self.slice(0, 3).map(q => "• " + fillVars(sc, q)).join("\n");
    return "YOL HARİTAN — Profil Özeti\n" +
      "──────────────────\n" +
      "Arketip: " + a.emoji + " " + a.ad + "\n" +
      "İlgi kodu: " + sc.code + " — " + top3 + "\n" +
      "Güçlü yönler: " + sc.strengths.join(", ") + "\n" +
      "Karakter (0–100): " + bf + "\n" +
      "Sana yakın alanlar: " + careers + "\n\n" +
      "Birlikte konuşmak için:\n" + qs + "\n\n" +
      "Not: Bu bir keşif aracıdır, kesin bir karar değil.\n" +
      "raufenc.com/yol-haritan";
  }

  function buildRadar(r) {
    const n = 6, cx = 130, cy = 130, R = 92;
    const pt = (i, rad) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]; };
    let grid = ""; [0.25, 0.5, 0.75, 1].forEach(f => grid += '<polygon points="' + RIASEC.map((_, i) => pt(i, R * f).join(",")).join(" ") + '" fill="none" stroke="rgba(255,255,255,.12)"/>');
    let axes = "", labels = "";
    RIASEC.forEach((k, i) => { const [x, y] = pt(i, R); axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="rgba(255,255,255,.10)"/>';
      const [lx, ly] = pt(i, R + 18); labels += '<text x="' + lx + '" y="' + (ly + 5) + '" text-anchor="middle" font-size="16" fill="' + colorVar(k) + '">' + D.types[k].emoji + '</text>'; });
    const dpts = RIASEC.map((k, i) => pt(i, R * (r[k] / 100)).join(",")).join(" ");
    const dots = RIASEC.map((k, i) => { const [x, y] = pt(i, R * (r[k] / 100)); return '<circle cx="' + x + '" cy="' + y + '" r="3.4" fill="' + colorVar(k) + '"/>'; }).join("");
    return '<svg class="radar-svg" viewBox="0 0 260 260" role="img" aria-label="RIASEC profili">' + grid + axes + '<polygon points="' + dpts + '" fill="rgba(124,92,255,.30)" stroke="var(--violet)" stroke-width="2"/>' + dots + labels + '</svg>';
  }
  function shareResult(sc) {
    const payload = { r: RIASEC.map(k => sc.rPct[k]), b: BFD.map(d => sc.bf[d]), v: sc.values ? sc.values.out : null };
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
      const rPct = {}, bf = {}; RIASEC.forEach((k, i) => rPct[k] = o.r[i]); BFD.forEach((d, i) => bf[d] = o.b[i]);
      let values = null; if (o.v) values = { out: o.v, top: Object.keys(o.v).sort((p, q) => o.v[q] - o.v[p]).slice(0, 2) };
      return deriveAll(rPct, bf, values);
    } catch (e) { return null; }
  }
  function restart() {
    if (location.hash) history.replaceState(null, "", location.pathname);
    try { localStorage.removeItem("yh_answers"); } catch (e) {}
    state.i = 0; state.answers = {}; state.valuesIncluded = false; state.scores = null; state.jobZone = 5; show("screen-intro");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
