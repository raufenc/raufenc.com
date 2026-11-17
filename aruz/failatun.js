/* Bir Beyit, Bir Âlem · Fâilâtün — uygulama */
(() => {
"use strict";
const D = window.BBA, B = D.beyitler, V = D.vezinler, K = D.klipler;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const iki = n => String(n).padStart(2, "0");
const sure = (a, b) => { const s = Math.max(0, Math.round((b || 0) - (a || 0))); return s ? `${Math.floor(s / 60)}:${iki(s % 60)}` : ""; };
const karistir = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sade = s => String(s).toLocaleLowerCase("tr").replaceAll("ı", "i").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’'‘\-]/g, "");
const OYNA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const DUR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 6h10v12H7z"/></svg>';

/* ——— tef'ile ve vezin hesabı ——— */
const TEF = { "— · — —": "Fâ‘ilâtün", "— · —": "Fâ‘ilün", "· — — —": "Mefâ‘îlün", "— — ·": "Mef‘ûlü", "· — — ·": "Mefâ‘îlü", "· — —": "Fe‘ûlün", "— · — ·": "Fâ‘ilâtü", "· · — —": "Fe‘ilâtün", "· · —": "Fe‘ilün", "· — · —": "Mefâ‘ilün", "— —": "Fa‘lün" };
const birimF = f => f.split(" ").reduce((a, x) => a + (x === "—" ? 2 : 1), 0);
const agizF = f => f.split(" ").map(x => x === "—" ? "dan" : "di").join(" ");
const VTANIM = {
  "failatun": "Divan şiirinin en çok kullanılan kalıbı. Uzun heceyle başlar; dengeli, vakur bir yürüyüşü vardır. Hocamız “en meşhur vezin” diye bunu sayar, misalini de Muhibbî’nin sıhhat beytiyle verir.",
  "mefailun": "Aynı hücre dört defa tekrar eder: bir kısa, üç uzun. Geniş nefesli, akıcı bir kalıptır. Nâbî’nin “Sakın terk-i edebden” na‘tı bu vezindedir.",
  "mefulu-mefailu": "İki uzunla başlar, ortada salınır, yumuşak iner. Yahya Kemal’in “Akıncılar” ve “Sessiz Gemi” şiirleri de bu vezindedir.",
  "mefulu-failatu": "Dört ayrı hücreden kurulur; her tef’ilede yürüyüş değişir. Hikmetli, düşündüren beyitlerde çok sevilmiştir.",
  "feilatun": "İki kısa heceyle başlar; kıvrak ve coşkuludur. İstiklâl Marşı da bu vezindedir. İlk tef’ile fâ‘ilâtün, son tef’ile fa‘lün olabilir.",
  "mefailun-feilatun": "Kısa–uzun sıçramalarıyla konuşur gibi yürür; sonu çoğu zaman iki uzunla (fa‘lün) kapanır.",
  "mefulu-mefailun": "Kısa bir kalıp: on hece. Şeyh Gâlib’in Hüsn ü Aşk mesnevîsi bu vezindedir.",
  "mefulu-failatun": "Mısra tam ortadan ikiye bölünür; iki yarım birbirinin eşidir. Hocamızın deyişiyle nadir kullanılan bir vezindir."
};
const VKLIP = { "failatun": ["kanuni", "kulak", "randiran", "davulcu"], "mefailun": ["nabi"], "mefulu-mefailu": ["akincilar", "sessizgemi", "elmas", "ki"], "feilatun": ["istiklal", "istiklal2", "sabit"], "mefulu-failatun": ["nadir", "natvurgu"] };
V.forEach(v => { v.b = v.feet.map(birimF); v.top = v.b.reduce((a, b) => a + b, 0); v.hece = v.feet.join(" ").split(" ").length; v.ad = v.tef.join(" "); v.kisa = v.tef.map(t => t.toLocaleLowerCase("tr")).join(" "); v.beyitler = B.filter(b => b.vz === v.id); v.tanim = VTANIM[v.id]; v.klip = VKLIP[v.id] || []; });
const VZ = Object.fromEntries(V.map(v => [v.id, v]));
const beyit = n => B.find(b => b.n === +n);
const birimS = s => s.v === "—·" ? 3 : s.v === "—" ? 2 : 1;
const satirlar = () => B.filter(b => b.vz !== "hece").flatMap(b => b.t.map((ln, i) => ({ b, i, ln })));
const NOT = { imale: "imâle", zihaf: "zihaf", med: "med", asli: "aslı uzun", son: "son hece", kusur: "zorlama" };

/* ——— kayıt (cihazda) ——— */
const Kayit = (() => {
  const AD = "bba-failatun-v1"; let d = { ders: {}, ayar: { mod: "darb", birim: 0.2 }, puan: { d: 0, t: 0 } };
  try { Object.assign(d, JSON.parse(localStorage.getItem(AD) || "{}")); d.ayar = Object.assign({ mod: "darb", birim: 0.2 }, d.ayar); } catch (e) { }
  const yaz = () => { try { localStorage.setItem(AD, JSON.stringify(d)); } catch (e) { } };
  return { d, yaz };
})();

/* ——— ses: darb ve nağme ——— */
const Ses = (() => {
  let ctx = null, zaman = [], bitince = null;
  const GAM = [220, 261.63, 293.66, 329.63, 392, 440];
  function vur(t, uzun, guc = 1) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    if (uzun) { o.type = "sine"; o.frequency.setValueAtTime(165, t); o.frequency.exponentialRampToValueAtTime(78, t + 0.2); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.95 * guc, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42); }
    else { o.type = "triangle"; o.frequency.setValueAtTime(620, t); o.frequency.exponentialRampToValueAtTime(410, t + 0.07); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5 * guc, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12); }
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.5);
  }
  function nagme(t, s, f) {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.34, t + 0.035); g.gain.setValueAtTime(0.3, t + Math.max(0.05, s - 0.07)); g.gain.exponentialRampToValueAtTime(0.0001, t + s);
    g.connect(ctx.destination);
    [["sine", 1, 1], ["triangle", 2, 0.22], ["sine", 3, 0.07]].forEach(([tip, kat, guc]) => { const o = ctx.createOscillator(), og = ctx.createGain(); o.type = tip; o.frequency.value = f * kat; og.gain.value = guc; o.connect(og).connect(g); o.start(t); o.stop(t + s + 0.05); });
  }
  function dur() { zaman.forEach(clearTimeout); zaman = []; if (ctx) { try { ctx.close(); } catch (e) { } ctx = null; } const b = bitince; bitince = null; if (b) b(); }
  /* dizi: [{b:1|2|3, ayak, sira, ayakBoy, sonAyak, ara}] */
  function cal(dizi, { adim, bitti } = {}) {
    dur();
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    ctx = new AC(); if (ctx.state === "suspended") ctx.resume();
    const birim = Kayit.d.ayar.birim, mod = Kayit.d.ayar.mod; let t = ctx.currentTime + 0.1; bitince = bitti;
    dizi.forEach((x, i) => {
      const s = x.b * birim;
      if (mod === "nagme") {
        const yol = x.sonAyak ? [3, 2, 1, 0].slice(-x.ayakBoy) : [3, 2, 3, 4];
        nagme(t, s * 0.96, GAM[yol[Math.min(x.sira, yol.length - 1)]]);
      } else { vur(t, x.b >= 2, x.sira === 0 ? 1 : 0.8); if (x.b === 3) vur(t + 2 * birim, false, 0.5); }
      const gec = (t - ctx.currentTime) * 1000;
      zaman.push(setTimeout(() => adim && adim(i), gec));
      t += s + (x.ara || 0) * birim;
    });
    zaman.push(setTimeout(() => { const b = bitince; bitince = null; zaman = []; if (ctx) { try { ctx.close(); } catch (e) { } ctx = null; } if (b) b(); }, (t - ctx.currentTime) * 1000 + 250));
  }
  return { cal, dur, get caliyor() { return !!ctx; } };
})();
function diziSatir(ln, ara = 0) {
  const boy = {}; ln.syl.forEach(s => boy[s.f] = (boy[s.f] || 0) + 1); const son = ln.feet.length - 1; const sira = {};
  return ln.syl.map((s, i) => { sira[s.f] = (sira[s.f] ?? -1) + 1; return { b: birimS(s), ayak: s.f, sira: sira[s.f], ayakBoy: boy[s.f], sonAyak: s.f === son, ara: i === ln.syl.length - 1 ? ara : 0 }; });
}
function diziKalip(feet, tekrar = 1) {
  const out = []; for (let r = 0; r < tekrar; r++) feet.forEach((f, fi) => { const p = f.split(" "); p.forEach((x, i) => out.push({ b: x === "—" ? 2 : 1, ayak: fi, sira: i, ayakBoy: p.length, sonAyak: fi === feet.length - 1, ara: (fi === feet.length - 1 && i === p.length - 1) ? 2 : 0 })); });
  return out;
}

/* ——— taktî görünümü ——— */
const isaret = v => v === "—·" ? '<i class="u"></i><i class="k"></i>' : v === "—" ? '<i class="u"></i>' : v === "·" ? '<i class="k"></i>' : "";
function heceEl(s, i, ilk) {
  const nt = s.n ? NOT[s.n] : (s.u ? "ulama" : ""); const sinif = s.n ? "nt-" + s.n : "nt-ulama";
  return `<span class="hece${s.w && !ilk ? " kb" : ""}" data-i="${i}"><span class="is">${isaret(s.v)}</span><span class="yz">${esc(s.t)}</span>${nt ? `<span class="nt ${sinif}">${nt}</span>` : ""}</span>`;
}
function taktiHTML(ln, o = {}) {
  if (!ln.feet) return `<div class="takti${o.kucuk ? " kucuk" : ""}"><div class="misra-t"><div class="tef"><div class="tef-heceler">${ln.syl.map((s, i) => heceEl(s, i, i === 0)).join("")}</div><div class="tef-ad">hece vezni<i>${ln.syl.length} hece</i></div></div></div></div>`;
  const gr = []; ln.syl.forEach((s, i) => (gr[s.f] = gr[s.f] || []).push([s, i]));
  return `<div class="takti${o.kucuk ? " kucuk" : ""}" data-takti><div class="misra-t">` + gr.map((g, fi) => `<div class="tef" data-f="${fi}"><div class="tef-heceler">${g.map(([s, i], k) => heceEl(s, i, k === 0)).join("")}</div><div class="tef-ad">${TEF[ln.feet[fi]] || ""}<i>${birimF(ln.feet[fi])}</i></div></div>`).join("") + `</div>` +
    `<div class="cetvel" aria-hidden="true">` + gr.map(g => `<span class="cf">${g.map(([s, i]) => `<i class="${s.v === "—·" ? "m" : s.v === "·" ? "k" : ""}" data-i="${i}" style="--b:${birimS(s)}"></i>`).join("")}</span>`).join("") + `</div></div>`;
}
const LEJANT = `<div class="takti-lejant"><span><span class="is"><i class="u"></i></span> uzun · 2 birim</span><span><span class="is"><i class="k"></i></span> kısa · 1 birim</span><span>‿ ulama</span><span>imâle: kısa hece uzun okunur</span><span>med: bir uzun + bir kısa</span></div>`;
function calarHTML(o = {}) {
  const a = Kayit.d.ayar;
  return `<div class="calar" data-calar><button class="cal-dugme${o.kucuk ? " kucuk" : ""}" data-cal aria-label="Ritmi dinle">${OYNA}</button><span>${o.etiket || "Ritmi dinle"}</span>
    <span class="secim" role="group" aria-label="Ses"><button data-mod="darb" aria-pressed="${a.mod === "darb"}">Darb</button><button data-mod="nagme" aria-pressed="${a.mod === "nagme"}">Nağme</button></span>
    <label class="tempo"><span>Ağır</span><input type="range" min="0.13" max="0.34" step="0.01" value="${(0.47 - a.birim).toFixed(2)}" data-tempo aria-label="Hız"><span>Yürük</span></label></div>`;
}
/* kapsayıcı içindeki [data-takti] satırlarını sırayla çalar */
function calarKur(kap, satirlarFn) {
  const dugme = $("[data-cal]", kap); if (!dugme) return;
  const temizle = () => { $$(".calan", kap).forEach(e => e.classList.remove("calan")); dugme.innerHTML = OYNA; dugme.dataset.durum = ""; };
  dugme.addEventListener("click", () => {
    if (dugme.dataset.durum === "caliyor") { Ses.dur(); return; }
    const lns = satirlarFn(); const takt = $$("[data-takti]", kap); let dizi = [], harita = [];
    lns.forEach((ln, li) => { diziSatir(ln, li < lns.length - 1 ? 3 : 0).forEach((x, i) => { dizi.push(x); harita.push([li, i, x.ayak]); }); });
    dugme.innerHTML = DUR; dugme.dataset.durum = "caliyor";
    Ses.cal(dizi, {
      adim: k => { $$(".calan", kap).forEach(e => e.classList.remove("calan")); const [li, i, f] = harita[k]; const t = takt[li]; if (!t) return; $$(`[data-i="${i}"]`, t).forEach(e => e.classList.add("calan")); const tf = $(`.tef[data-f="${f}"]`, t); if (tf) tf.classList.add("calan"); },
      bitti: temizle
    });
  });
}
document.addEventListener("click", e => {
  const m = e.target.closest("[data-mod]"); if (m) { Kayit.d.ayar.mod = m.dataset.mod; Kayit.yaz(); $$("[data-mod]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mod === m.dataset.mod))); }
});
document.addEventListener("input", e => {
  if (e.target.matches("[data-tempo]")) { Kayit.d.ayar.birim = +(0.47 - +e.target.value).toFixed(2); Kayit.yaz(); $$("[data-tempo]").forEach(x => { if (x !== e.target) x.value = e.target.value; }); }
});

/* ——— video ——— */
const pencere = $("#video");
function videoAc({ v, s, e, baslik, alt, yt }) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(v || "")) return; Ses.dur();
  const u = new URL(`https://www.youtube-nocookie.com/embed/${v}`); u.searchParams.set("start", String(Math.max(0, Math.floor(s || 0)))); if (e) u.searchParams.set("end", String(Math.ceil(e)));
  u.searchParams.set("autoplay", "1"); u.searchParams.set("rel", "0"); u.searchParams.set("playsinline", "1");
  $("#video-baslik").textContent = baslik || "Hocamızdan dinle";
  $("#video-kare").innerHTML = `<iframe src="${u.href}" title="${esc(baslik || "")}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  $("#video-not").textContent = alt || ""; $("#video-yt").href = yt || `https://www.youtube.com/watch?v=${v}&t=${Math.floor(s || 0)}s`;
  pencere.showModal();
}
$("#video-kapat").addEventListener("click", () => pencere.close());
pencere.addEventListener("close", () => { $("#video-kare").innerHTML = ""; });
pencere.addEventListener("click", e => { if (e.target === pencere) pencere.close(); });
document.addEventListener("click", e => {
  const k = e.target.closest("[data-klip]"); if (k) { const c = K[k.dataset.klip]; if (c) videoAc({ v: c.v, s: c.s, e: c.e, baslik: c.baslik, alt: `${c.kanal} · ${c.kaynak}` }); return; }
  const r = e.target.closest("[data-kayit]"); if (r) { const b = beyit(r.dataset.kayit); if (b && b.kayit) videoAc({ v: b.kayit.v, s: b.kayit.s, e: b.kayit.e, baslik: `${b.n}. beyit · ${b.sair}`, alt: b.kayit.not || `${b.kayit.kanal || ""} · ${b.kayit.baslik || ""}` }); }
});
const kucukResim = v => `https://i.ytimg.com/vi/${v}/hqdefault.jpg`;
function klipHTML(key, o = {}) {
  const c = K[key]; if (!c) return "";
  const kare = `<span class="klip-kare"><img src="${kucukResim(c.v)}" alt="" loading="lazy"><span class="klip-oyna"><i>${OYNA}</i>${sure(c.s, c.e)}</span></span>`;
  if (o.yatay) return `<button class="klip klip-yatay" data-klip="${key}">${kare}<span><span class="ust-yazi" style="display:block">Hocamızın ağzından</span><h3>${esc(c.baslik)}</h3>${c.soz ? `<p class="soz">“${esc(c.soz)}”</p>` : ""}<p>${esc(c.ozet)}</p></span></button>`;
  return `<button class="klip" data-klip="${key}">${kare}<h3>${esc(c.baslik)}</h3>${c.soz ? `<p class="soz">“${esc(c.soz)}”</p>` : ""}<p>${esc(c.ozet)}</p></button>`;
}

/* ——— kartlar ——— */
function beyitKart(b) {
  const v = VZ[b.vz];
  return `<a class="bk" href="#/beyit/${b.n}"><span class="bk-resim"><img src="img/${iki(b.n)}k.webp" alt="" loading="lazy" width="640" height="342"><span class="bk-no">${iki(b.n)}</span>${b.kayit ? `<span class="bk-ses">${OYNA} Hocamızdan</span>` : ""}</span>
    <span class="bk-govde"><p class="bk-beyit"><span>${esc(b.m[0])}</span><span>${esc(b.m[1])}</span></p><span class="bk-alt"><span>${esc(b.sair)}</span><span class="vz">${v ? v.tef[0] + "…" : "Hece vezni"}</span></span></span></a>`;
}
const kalipHTML = (feet, acik) => feet.map(f => `<span class="kalip-f${acik ? " acik" : ""}">${f.split(" ").map(x => `<i class="${x === "—" ? "u" : "k"}"></i>`).join("")}</span>`).join("");
function vezinKart(v, acik) {
  return `<a class="vezin${acik ? " acik" : ""}" href="#/vezin/${v.id}"><h3>${v.ad}</h3><button class="cal-dugme kucuk" data-kalip="${v.id}" aria-label="${v.ad} ritmini dinle">${OYNA}</button>
    <span class="kal">${kalipHTML(v.feet, acik)}</span><span class="bilgi"><span>${v.bahir} bahri</span><span>${v.b.join(" + ")} = ${v.top} birim</span><span>${v.hece} hece</span><span>${v.beyitler.length} beyit</span></span></a>`;
}
document.addEventListener("click", e => {
  const k = e.target.closest("[data-kalip]"); if (!k) return; e.preventDefault(); e.stopPropagation();
  if (k.dataset.durum === "caliyor") { Ses.dur(); return; }
  const feet = k.dataset.feet ? k.dataset.feet.split("|") : VZ[k.dataset.kalip].feet; const kap = k.dataset.hedef ? $(k.dataset.hedef) : null;
  k.innerHTML = DUR; k.dataset.durum = "caliyor";
  const dz = diziKalip(feet, +k.dataset.tekrar || 1); let say = feet.join(" ").split(" ").length;
  Ses.cal(dz, { adim: i => { if (!kap) return; $$(".calan", kap).forEach(x => x.classList.remove("calan")); const x = dz[i]; const bf = $$(".bf", kap)[x.ayak]; if (bf) { bf.classList.add("calan"); const n = $$(".sr i", bf)[x.sira]; if (n) n.classList.add("calan"); } }, bitti: () => { k.innerHTML = OYNA; k.dataset.durum = ""; if (kap) $$(".calan", kap).forEach(x => x.classList.remove("calan")); } });
});

/* ——— mısra tartısı (serbest inceleme) ——— */
const Tart = (() => {
  const VS = "aeıioöuü", VL = "âîû", VV = VS + VL, APO = "’‘'ʼ`";
  const low = c => ({ "I": "ı", "İ": "i", "Â": "â", "Î": "î", "Û": "û" }[c] || c.toLocaleLowerCase("tr"));
  function kelimeler(line) { const w = []; let cur = [], sep = " "; for (const ch of line) { if (/\p{L}/u.test(ch) || APO.includes(ch)) cur.push(ch); else { if (cur.length) { w.push({ o: cur, sep }); cur = []; sep = " "; } if (ch === "-") sep = "-"; else if (",;.:!?".includes(ch)) sep = ","; } } if (cur.length) w.push({ o: cur, sep }); return w; }
  function hecele(us) { const vi = []; us.forEach((u, i) => { if (VV.includes(u[1])) vi.push(i); }); if (!vi.length) return [us]; const sy = []; let st = 0; for (let k = 0; k < vi.length - 1; k++) { const a = vi[k], b = vi[k + 1], cut = (b - a - 1 === 0) ? b : b - 1; sy.push(us.slice(st, cut)); st = cut; } sy.push(us.slice(st)); return sy; }
  function kur(words, links, apos) {
    let ai = 0; words.forEach((w, wi) => { const us = []; let pend = ""; for (const ch of w.o) { if (APO.includes(ch)) { const keep = apos[ai++]; if (keep) { us.push([pend + ch, "ʿ", wi]); pend = ""; } else pend += ch; } else { us.push([pend + ch, low(ch), wi]); pend = ""; } } if (pend && us.length) us[us.length - 1][0] += pend; w.u = us; });
    const gr = []; let cur = [...words[0].u]; for (let wi = 1; wi < words.length; wi++) { if (links[wi]) cur = cur.concat(words[wi].u); else { gr.push(cur); cur = [...words[wi].u]; } } gr.push(cur);
    const out = []; for (const g of gr) for (const s of hecele(g)) {
      if (!s.length) continue; let txt = "", prev = null, link = false; for (const u of s) { if (prev !== null && u[2] !== prev) { link = true; if (words[u[2]].sep !== "-") txt += "‿"; } txt += u[0]; prev = u[2]; }
      const lows = s.map(u => u[1]), n = lows.findIndex(c => VV.includes(c)); let cls = "X"; if (n >= 0) { const coda = lows.slice(n + 1).join(""), lv = VL.includes(lows[n]); cls = !coda ? (lv ? "L" : "S") : lv ? (coda === "n" ? "N" : "O") : coda.length >= 2 ? "O" : "C"; }
      out.push({ t: txt, cls, w: s[0] === words[s[0][2]].u[0], u: link });
    } return out;
  }
  function dp(sy, feet) {
    const pat = feet.join(" ").split(" "), n = sy.length, m = pat.length, memo = new Map();
    function go(i, j) {
      if (i === n) return j === m ? [0, null] : [1e9, null]; if (j >= m) return [1e9, null];
      const key = i * 100 + j; if (memo.has(key)) return memo.get(key);
      let best = [1e9, null]; const c = sy[i].cls, p = pat[j], last = i === n - 1;
      const tr = (cost, span, val, note) => { const r = go(i + 1, j + span); if (r[0] + cost < best[0]) best = [r[0] + cost, { val, note, span, next: r[1] }]; };
      if (last) { if (j === m - 1) tr(0, 1, p, (c === "S" && p === "—") ? "son" : null); }
      else if (c === "S") { p === "·" ? tr(0, 1, "·", null) : tr(2, 1, "—", "imale"); }
      else if (c === "L") { p === "—" ? tr(0, 1, "—", null) : tr(3, 1, "·", "zihaf"); }
      else if (c === "C") { p === "—" ? tr(0, 1, "—", null) : tr(8, 1, "·", "kusur"); }
      else if (c === "O" || c === "N") { if (p === "—") { tr(c === "N" ? 0 : .6, 1, "—", null); if (j + 1 < m && pat[j + 1] === "·") tr(c === "O" ? 0 : 1.5, 2, "—·", "med"); } else tr(9, 1, "·", "kusur"); }
      memo.set(key, best); return best;
    }
    return go(0, 0);
  }
  function turevler(feet) {
    const vs = [feet], ek = v => { if (!vs.some(x => x.join("|") === v.join("|"))) vs.push(v); }, son = feet[feet.length - 1];
    if (son === "· · —") ek([...feet.slice(0, -1), "— —"]);
    if (son === "— —" && feet[0] !== "— — ·") ek([...feet.slice(0, -1), "· · —"]);
    [...vs].forEach(v => { if (v[0] === "· · — —") ek(["— · — —", ...v.slice(1)]); });
    return vs;
  }
  function coz(line, feet0) {
    const words = kelimeler(line); if (!words.length) return null;
    const napo = Math.min(4, words.reduce((a, w) => a + w.o.filter(c => APO.includes(c)).length, 0)); const lk = [];
    for (let wi = 1; wi < words.length; wi++) { const a = words[wi - 1].o.filter(c => !APO.includes(c)).map(low), b0 = words[wi].o[0]; if (a.length && !VV.includes(a[a.length - 1]) && !APO.includes(b0) && VV.includes(low(b0)) && words[wi].sep !== ",") lk.push(wi); }
    const L = Math.min(lk.length, 9); let best = null;
    for (let am = 0; am < (1 << napo); am++) { const apos = Array.from({ length: 8 }, (_, i) => !!(am >> i & 1));
      for (let lm = 0; lm < (1 << L); lm++) { const links = {}; let yok = 0; lk.forEach((wi, i) => { links[wi] = i >= L ? true : !!(lm >> i & 1); if (!links[wi]) yok++; });
        const sy = kur(words, links, apos);
        turevler(feet0).forEach((feet, vi) => { const r = dp(sy, feet); if (r[0] >= 1e8) return; const c = r[0] + 0.25 * yok + 0.4 * vi; if (!best || c < best.c) best = { c, sy, feet, sol: r[1] }; });
      } }
    if (!best) return null;
    const syl = []; let pos = 0, node = best.sol; const fb = []; let acc = 0; best.feet.forEach(f => { acc += f.split(" ").length; fb.push(acc); });
    best.sy.forEach(s => { const f = fb.findIndex(x => pos < x); const o = { t: s.t, v: node.val, f }; if (s.w) o.w = 1; if (node.note) o.n = node.note; if (s.u) o.u = 1; syl.push(o); pos += node.span; node = node.next; });
    return { feet: best.feet, syl, c: best.c };
  }
  function tabii(metin) { const words = kelimeler(metin); if (!words.length) return []; const links = {}; for (let wi = 1; wi < words.length; wi++) { const a = words[wi - 1].o.map(low), b0 = low(words[wi].o[0]); links[wi] = !VV.includes(a[a.length - 1]) && VV.includes(b0); } return kur(words, links, Array(8).fill(true)); }
  return { coz, tabii };
})();

/* ——— temrinler ——— */
function havuz(filtre) {
  const hep = satirlar(); const f = {
    sade: x => x.ln.syl.every(s => !s.n || s.n === "son") && !x.ln.syl.some(s => s.v === "—·"),
    ulama: x => x.ln.syl.some(s => s.u) && x.ln.syl.filter(s => s.n && s.n !== "son").length <= 1,
    imale: x => { const k = x.ln.syl.filter(s => s.n === "imale").length; return k >= 1 && k <= 2 && !x.ln.syl.some(s => s.n === "zihaf" || s.n === "kusur"); },
    med: x => x.ln.syl.some(s => s.n === "med"),
    hepsi: x => !x.b.supheli
  }[filtre || "hepsi"];
  return hep.filter(f);
}
function temrinKur(kok) {
  const tip = kok.dataset.temrin, adet = +kok.dataset.adet || 3; let sira = 0, dogru = 0;
  const bitir = () => {
    if (kok.dataset.ders) { Kayit.d.ders[kok.dataset.ders] = true; Kayit.yaz(); }
    kok.innerHTML = `<p class="kutu-bas">Temrin tamam</p><h3>${dogru} / ${adet} ilk denemede doğru.</h3><p>${dogru === adet ? "Kulağınız ve hesabınız yerinde. Bir sonraki derse geçebilirsiniz." : "Takıldığınız mısraları beyit sayfalarında dinleyerek bir daha tartın; kulak tekrarla yerleşir."}</p><div class="t-alt"><button class="dugme dugme-altin" data-yeniden>Yeni temrin</button></div>`;
    $("[data-yeniden]", kok).addEventListener("click", () => { sira = 0; dogru = 0; kur(); });
    document.dispatchEvent(new CustomEvent("temrin-bitti"));
  };
  const ust = baslik => `<p class="kutu-bas">Temrin · ${sira + 1} / ${adet}</p><h3>${baslik}</h3>`;
  let liste = [];
  function kur() {
    if (tip === "isaretle") liste = karistir(havuz(kok.dataset.filtre)).slice(0, adet);
    else if (tip === "kulak") liste = karistir(V).slice(0, adet);
    else if (tip === "birim") liste = kok.dataset.tur === "hece" ? karistir(havuz("sade")).slice(0, adet) : karistir(Object.keys(TEF)).slice(0, adet);
    else if (tip === "kelime") liste = karistir(B.filter(b => b.vz !== "hece")).slice(0, adet);
    soru();
  }
  function ileri(ilkDeneme) { if (ilkDeneme) dogru++; Kayit.d.puan.t++; if (ilkDeneme) Kayit.d.puan.d++; Kayit.yaz(); sira++; if (sira >= adet) bitir(); else soru(); }
  function soru() { ({ isaretle, kulak, birim, kelime })[tip](liste[sira]); }
  function isaretle(x) {
    let deneme = 0;
    kok.innerHTML = ust("Heceleri tartın") + `<p>Her heceye dokunun: bir dokunuş kısa (nokta), iki dokunuş uzun (çizgi). Ulama yapılan yerler ‿ ile bağlanmıştır.</p>
      <div class="t-misra">${x.ln.syl.map((s, i) => `<button class="t-hece${s.w && i ? " kb" : ""}" data-i="${i}" data-s=""><span class="is"><i></i></span><span>${esc(s.t)}</span><small></small></button>`).join("")}</div>
      <p class="t-kunye">${x.b.n}. beyit · ${esc(x.b.sair)} · ${x.i + 1}. mısra</p><p class="t-sonuc" aria-live="polite"></p>
      <div class="t-alt"><button class="dugme dugme-altin" data-tart>Tartıya koy</button><button class="dugme dugme-cizgi dugme-kucuk" data-goster>Cevabı göster</button><button class="dugme dugme-cizgi dugme-kucuk gizli" data-ileri>Devam <span class="ok">→</span></button></div>`;
    const hs = $$(".t-hece", kok), son = $(".t-sonuc", kok);
    hs.forEach(h => h.addEventListener("click", () => { if (kok.dataset.kilit) return; h.dataset.s = h.dataset.s === "" ? "k" : h.dataset.s === "k" ? "u" : "k"; h.classList.remove("d", "y"); }));
    const bitti = ilk => { kok.dataset.kilit = "1"; hs.forEach((h, i) => { const s = x.ln.syl[i]; h.dataset.s = s.v === "·" ? "k" : "u"; h.classList.remove("y"); h.classList.add("d"); $("small", h).textContent = s.n && s.n !== "son" ? NOT[s.n] : ""; }); $("[data-tart]", kok).classList.add("gizli"); $("[data-goster]", kok).classList.add("gizli"); const d = $("[data-ileri]", kok); d.classList.remove("gizli"); d.onclick = () => { delete kok.dataset.kilit; ileri(ilk); }; const v = VZ[x.b.vz]; son.className = "t-sonuc iyi"; son.textContent = (ilk ? "Tam isabet. " : "") + `Kalıp: ${x.ln.feet.map(f => TEF[f]).join(" · ")}`; };
    $("[data-tart]", kok).addEventListener("click", () => {
      deneme++; let yanlis = 0, bos = 0;
      hs.forEach((h, i) => { const s = x.ln.syl[i], bek = s.v === "·" ? "k" : "u"; h.classList.remove("d", "y"); if (h.dataset.s === "") bos++; else if (h.dataset.s === bek) h.classList.add("d"); else { h.classList.add("y"); yanlis++; } });
      if (bos) { son.className = "t-sonuc kotu"; son.textContent = `${bos} hece tartılmadı. Hepsine dokunun.`; deneme--; return; }
      if (!yanlis) bitti(deneme === 1);
      else { son.className = "t-sonuc kotu"; son.textContent = `${yanlis} hece yerine oturmadı. Kırmızı heceler kapalı mı açık mı, seslisi uzun mu? Bir daha bakın.`; }
    });
    $("[data-goster]", kok).addEventListener("click", () => bitti(false));
  }
  function secenekli(baslik, govde, siklar, dogruIdx, aciklama) {
    let deneme = 0;
    kok.innerHTML = ust(baslik) + govde + `<div class="siklar${siklar.length === 4 && siklar.every(s => s.length < 26) ? " iki-s" : ""}">${siklar.map((s, i) => `<button class="sik" data-i="${i}">${s}</button>`).join("")}</div><p class="t-sonuc" aria-live="polite"></p><div class="t-alt"><button class="dugme dugme-cizgi dugme-kucuk gizli" data-ileri>Devam <span class="ok">→</span></button></div>`;
    const son = $(".t-sonuc", kok);
    $$(".sik", kok).forEach(b => b.addEventListener("click", () => {
      deneme++;
      if (+b.dataset.i === dogruIdx) { Ses.dur(); b.classList.add("d"); $$(".sik", kok).forEach(x => x.disabled = true); son.className = "t-sonuc iyi"; son.textContent = aciklama; const d = $("[data-ileri]", kok); d.classList.remove("gizli"); d.onclick = () => ileri(deneme === 1); }
      else { b.classList.add("y"); b.disabled = true; son.className = "t-sonuc kotu"; son.textContent = "Olmadı; bir daha dinleyip deneyin."; }
    }));
  }
  function kulak(v) {
    const sik = karistir([v, ...karistir(V.filter(x => x.id !== v.id && x.feet.join() !== v.feet.join())).slice(0, 3)]);
    secenekli("Bu ritim hangi kalıp?", `<p>Ritmi dinleyin; uzunları ve kısaları sayın, sonra kalıbını seçin.</p><div class="calar"><button class="cal-dugme" data-kalip="${v.id}" aria-label="Ritmi dinle">${OYNA}</button><span>Ritmi dinle</span></div>`,
      sik.map(x => `<span>${x.ad}</span>`), sik.indexOf(v), `Doğru: ${v.ad}. ${v.b.join(" + ")} = ${v.top} birim.`);
  }
  function birim(x) {
    if (kok.dataset.tur === "hece") {
      const top = x.ln.syl.reduce((a, s) => a + birimS(s), 0), n = x.ln.syl.length; const sik = karistir([top, top - 2, top + 2, n]).filter((v, i, a) => a.indexOf(v) === i);
      secenekli("Bu mısra kaç birim?", `<p class="t-soru">${esc(x.b.m[x.i])}</p><p class="t-kunye">${x.b.n}. beyit · ${esc(x.b.sair)} · ${n} hece: ${x.ln.syl.filter(s => s.v !== "·").length} uzun, ${x.ln.syl.filter(s => s.v === "·").length} kısa</p><p>Kısa hece 1, uzun hece 2 birim. Toplayın.</p>`,
        sik.map(v => `<span>${v} birim</span>`), sik.indexOf(top), `${x.ln.syl.filter(s => s.v !== "·").length} × 2 + ${x.ln.syl.filter(s => s.v === "·").length} × 1 = ${top} birim. Hece sayısı ${n}, ağırlığı ${top}.`);
    } else {
      const f = x, top = birimF(f); const sik = karistir([top, top - 1, top + 1, top + 2].filter(v => v > 2));
      secenekli(`${TEF[f]} kaç birim?`, `<div class="calar"><button class="cal-dugme" data-kalip="x" data-feet="${f}" aria-label="Dinle">${OYNA}</button><span>${agizF(f)}</span></div>`,
        sik.map(v => `<span>${v} birim</span>`), sik.indexOf(top), `${f.split(" ").map(c => c === "—" ? 2 : 1).join(" + ")} = ${top} birim.`);
    }
  }
  function kelime(b) {
    const li = Math.random() < .5 ? 0 : 1, ks = b.m[li].split(" "); const aday = ks.map((k, i) => [k, i]).filter(([k, i]) => i > 0 && k.replace(/[^\p{L}]/gu, "").length >= 4); if (!aday.length) return ileri(false);
    const [kel, ki] = aday[Math.floor(Math.random() * aday.length)]; const diger = karistir(B.filter(x => x.n !== b.n).flatMap(x => x.m.join(" ").split(" ")).filter(k => k.replace(/[^\p{L}]/gu, "").length >= 4 && sade(k) !== sade(kel))).filter((k, i, a) => a.findIndex(z => sade(z) === sade(k)) === i).slice(0, 3);
    const sik = karistir([kel, ...diger]); const yaz = l => l === li ? ks.map((k, i) => i === ki ? `<span class="bosluk">?</span>` : esc(k)).join(" ") : esc(b.m[l]);
    secenekli("Mısranın eksik kelimesi hangisi?", `<p class="t-soru">${yaz(0)}<br>${yaz(1)}</p><p class="t-kunye">${b.n}. beyit · ${esc(b.sair)}</p>`, sik.map(s => `<span>${esc(s.replace(/[,.;:!?]/g, ""))}</span>`), sik.indexOf(kel), `Evet: “${kel.replace(/[,.;:!?]/g, "")}”. ${b.nesir}`);
  }
  kur();
}

/* ——— derslere yardımcılar ——— */
const SAY = (() => {
  const hep = satirlar(); const say = n => hep.reduce((a, x) => a + x.ln.syl.filter(s => s.n === n).length, 0); const ul = hep.reduce((a, x) => a + x.ln.syl.filter(s => s.u).length, 0);
  const y22 = V.filter(v => v.top === 22);
  return {
    ulama: `Kitaptaki ${hep.length} aruzlu mısrada toplam ${ul} ulama vardır; yani hemen her mısrada bir kelime komşusuna bağlanır.`,
    imale: `Kitaptaki ${hep.length} mısrada ${say("imale")} imâle vardır. Aşağıda birkaçı:`,
    zihaf: `Kitaptaki ${hep.length} mısrada yalnız ${say("zihaf")} zihaf bulunur.`,
    med: `Kitapta ${say("med")} yerde med vardır.`,
    yirmiiki: `Tabloda güzel bir hesap gizli: ${y22.length} ayrı kalıbın mısrayı tam ${22} birimdir (${y22.map(v => v.tef[0] + "…").join(", ")}). Boyları aynı, yürüyüşleri başka. Demek ki ritmi belirleyen toplam ağırlık değil, ağırlıkların sırasıdır.`
  };
})();
function misaller(tur, adet) {
  const hep = []; satirlar().forEach(x => x.ln.syl.forEach((s, i) => { if (tur === "ulama" ? (s.u && !s.n) : s.n === tur) hep.push({ x, s, i }); }));
  const gor = new Set(), sec = []; for (const m of karistir(hep).sort((a, b) => (b.x.b.kayit ? 1 : 0) - (a.x.b.kayit ? 1 : 0))) { if (gor.has(m.x.b.n)) continue; gor.add(m.x.b.n); sec.push(m); if (sec.length >= adet) break; }
  return `<div class="misal-liste">${sec.map(m => `<a class="misal" href="#/beyit/${m.x.b.n}"><span class="hc">${esc(m.s.t)}</span><span class="ms">${esc(m.x.b.m[m.x.i])}<small>${m.x.b.n}. beyit · ${esc(m.x.b.sair)}${m.x.b.kayit ? " · Hocamızın sesinden" : ""}</small></span><span class="gt">Aç →</span></a>`).join("")}</div>`;
}
const F = {
  klip: k => klipHTML(k, { yatay: true }),
  takti: (n, l) => { const b = beyit(n); return `<div class="kutu" data-ornek="${n}-${l}"><p class="kutu-bas">${n}. beyit · ${esc(b.sair)}${b.kayit ? ` · <button class="metin-bag" style="background:none;border:0;border-bottom:1px solid;padding:0 0 2px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:inherit" data-kayit="${n}">Hocamızdan dinle</button>` : ""}</p>${taktiHTML(b.t[l], { kucuk: true })}${calarHTML({ kucuk: true })}<p style="margin:14px 0 0"><a class="metin-bag" href="#/beyit/${n}">Beytin sayfası <span class="ok">→</span></a></p></div>`; },
  w: ad => `<div class="kutu" data-w="${ad}"></div>`,
  temrin: (tip, o = {}) => `<div class="temrin" data-temrin="${tip}" data-adet="${o.adet || 3}"${o.filtre ? ` data-filtre="${o.filtre}"` : ""}${o.tur ? ` data-tur="${o.tur}"` : ""} data-ders-temrin></div>`,
  misaller, say: SAY
};
const DERSLER = window.BBA_DERSLER(F);

/* ——— ders araçları ——— */
const W = {
  saytart(el) {
    const y = beyit(42), m = beyit(6); const yl = y.t[0], ml = m.t[0]; const top = ml.syl.reduce((a, s) => a + birimS(s), 0);
    el.innerHTML = `<p class="kutu-bas">Aynı iş, iki ölçü</p><div class="saytart"><div><h4>Hece vezni sayar</h4><p class="mini">Yunus Emre · 42. beyit</p><div class="sayilar">${yl.syl.map((s, i) => `${i === 5 ? '<span class="durak"></span>' : ""}<span class="sh"><b>${i < 5 ? i + 1 : i - 4}</b><span>${esc(s.t)}</span></span>`).join("")}</div><p class="sonuc">5 + 5 = <em>10 hece</em></p></div>
      <div><h4>Aruz tartar</h4><p class="mini">Muhibbî · 6. beyit</p><div class="sayilar">${ml.syl.map(s => `<span class="sh ${s.v === "·" ? "k" : "u"}"><b>${birimS(s)}</b><span>${esc(s.t)}</span></span>`).join("")}</div><p class="sonuc">${ml.syl.length} hece, <em>${top} birim</em></p></div></div>`;
  },
  hecetart(el) {
    el.innerHTML = `<p class="kutu-bas">Hece tartısı</p><div class="tarti-giris"><input type="text" value="mu‘teber" maxlength="40" aria-label="Kelime" autocomplete="off" spellcheck="false"></div><div class="tarti-cikti"></div><div class="oneri">${["devlet", "cihânda", "nefes", "sıhhat", "şebnem", "hurşîd", "kitap", "gönül"].map(k => `<button>${k}</button>`).join("")}</div>`;
    const gir = $("input", el), cik = $(".tarti-cikti", el);
    const ciz = () => { const sy = Tart.tabii(gir.value); if (!sy.length) { cik.innerHTML = ""; return; } let top = 0; cik.innerHTML = `<div class="takti"><div class="misra-t"><div class="tef"><div class="tef-heceler">${sy.map((s, i) => { const u = s.cls !== "S"; top += u ? 2 : 1; return `<span class="hece${s.w && i ? " kb" : ""}"><span class="is">${u ? '<i class="u"></i>' : '<i class="k"></i>'}</span><span class="yz">${esc(s.t)}</span><span class="nt ${u ? "nt-imale" : "nt-zihaf"}">${s.cls === "S" ? "açık · 1" : s.cls === "L" ? "uzun sesli · 2" : s.cls === "O" ? "çok uzun · 2" : "kapalı · 2"}</span></span>`; }).join("")}</div><div class="tef-ad">toplam<i>${top} birim</i></div></div></div></div>`; };
    gir.addEventListener("input", ciz); $$(".oneri button", el).forEach(b => b.addEventListener("click", () => { gir.value = b.textContent; ciz(); })); ciz();
  },
  hucreler(el) {
    const kul = {}; B.forEach(b => b.t.forEach(ln => (ln.feet || []).forEach(f => kul[f] = (kul[f] || 0) + 1)));
    const sirali = Object.keys(TEF).sort((a, b) => (kul[b] || 0) - (kul[a] || 0));
    el.innerHTML = `<p class="kutu-bas">Kitaptaki tef’ileler</p><div class="kaydir"><table class="tablo"><thead><tr><th></th><th>Tef’ile</th><th>Kalıp</th><th>Ağızla</th><th>Hesap</th><th>Birim</th></tr></thead><tbody>${sirali.map(f => `<tr><td><button class="cal-dugme kucuk" data-kalip="x" data-feet="${f}" aria-label="${TEF[f]} dinle">${OYNA}</button></td><td class="ad">${TEF[f]}</td><td><span class="kalip-f acik">${f.split(" ").map(x => `<i class="${x === "—" ? "u" : "k"}"></i>`).join("")}</span></td><td class="agiz">${agizF(f)}</td><td class="agiz">${f.split(" ").map(x => x === "—" ? 2 : 1).join(" + ")}</td><td class="sayi">${birimF(f)}</td></tr>`).join("")}</tbody></table></div>`;
  },
  kaliplar(el) {
    el.innerHTML = `<p class="kutu-bas">Sekiz kalıp, bir bakışta</p><div class="kaydir"><table class="tablo"><thead><tr><th></th><th>Kalıp</th><th>Toplama</th><th>Birim</th><th>Hece</th><th>Beyit</th></tr></thead><tbody>${V.map(v => `<tr><td><button class="cal-dugme kucuk" data-kalip="${v.id}" aria-label="Dinle">${OYNA}</button></td><td><a href="#/vezin/${v.id}" style="text-decoration:none"><b style="font-family:var(--baslik);font-size:20px">${v.ad}</b></a><br><span style="display:inline-flex;gap:6px;margin-top:6px">${kalipHTML(v.feet, true)}</span></td><td class="agiz">${v.b.join(" + ")}</td><td class="sayi">${v.top}</td><td class="agiz">${v.hece}</td><td class="agiz">${v.beyitler.length}</td></tr>`).join("")}</tbody></table></div>`;
  },
  adimlar(el) {
    const b = beyit(6), ln = b.t[0]; const A = [
      ["1 · Hecele", "Mısrayı doğal okuyuşla hecelere ayırın. “Halk içinde” ulamayla Hal-ki-çin-de olur."],
      ["2 · Tart", "Her heceye ağırlığını verin: açık ve kısa sesli hece nokta, kapalı ya da uzun sesli hece çizgi."],
      ["3 · Kümele", "Uzun ve kısaları baştan itibaren kümeleyin. Dörtlü kümeler kendini gösterir: — · — —."],
      ["4 · Karşılaştır", `Kümelerin adını koyun: ${ln.feet.map(f => TEF[f]).join(" · ")}. Toplam ${ln.feet.map(birimF).join(" + ")} = ${ln.syl.reduce((a, s) => a + birimS(s), 0)} birim. “de” hecesi imâleyle uzar; mısranın son hecesi “bi” ise her zaman uzun sayılır.`]];
    el.innerHTML = `<p class="kutu-bas">Muhibbî · 6. beyit · adım adım</p><div class="adimci">${A.map((a, i) => `<button data-a="${i + 1}" aria-pressed="${i === 0}">${a[0]}</button>`).join("")}</div><div class="adim-govde ad-1">${taktiHTML(ln, { kucuk: true })}</div><p class="adim-aciklama">${A[0][1]}</p>${calarHTML({ kucuk: true })}`;
    const g = $(".adim-govde", el); $$(".adimci button", el).forEach(bt => bt.addEventListener("click", () => { $$(".adimci button", el).forEach(x => x.setAttribute("aria-pressed", String(x === bt))); g.className = "adim-govde ad-" + bt.dataset.a; $(".adim-aciklama", el).textContent = A[bt.dataset.a - 1][1]; }));
    calarKur(el, () => [ln]);
  },
  daire(el) {
    const AD = [["Mefâ‘îlün", "Hezec", "· — — —", "Kısa heceyle başlar. Kitaptaki " + VZ.mefailun.beyitler.length + " beyit bu hücrenin dört defa tekrarıyla yazılmıştır."], ["Mef‘ûlâtü", "bu dâirede bahir kurmaz", "— — — ·", "Üç uzun, bir kısa. Bu başlangıç, bu dâirede müstakil bir bahir sayılmaz; başka kalıpların içinde hücre olarak görülür."], ["Müstef‘ilün", "Recez", "— — · —", "İki uzunla başlar, kısa hece üçüncü sıraya düşer. Recez bahrinin hücresidir."], ["Fâ‘ilâtün", "Remel", "— · — —", "Kısa hece ikinci sıradadır. Kitaptaki " + VZ.failatun.beyitler.length + " beyit bu hücreyle kurulan en meşhur kalıptadır."]];
    let k = 0; const N = 8, R = 118, cx = 160, cy = 160; const deger = i => i % 4 === 0 ? "·" : "—";
    const ciz = () => {
      let s = `<svg viewBox="0 0 320 320" role="img" aria-label="Aruz dâiresi"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(42,32,24,.18)" stroke-width="1.5"/>`;
      const a0 = ((k - 0.5) / N) * 2 * Math.PI - Math.PI / 2, a1 = ((k + 3.5) / N) * 2 * Math.PI - Math.PI / 2; const p = (a, r) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]; const [x0, y0] = p(a0, R), [x1, y1] = p(a1, R);
      s += `<path d="M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}" fill="none" stroke="#a87628" stroke-width="30" stroke-linecap="round" opacity=".28"/>`;
      for (let i = 0; i < N; i++) { const a = (i / N) * 2 * Math.PI - Math.PI / 2, [x, y] = p(a, R), ic = (i - k + N) % N < 4, u = deger(i) === "—"; s += u ? `<rect x="${x - 15}" y="${y - 4}" width="30" height="8" rx="4" fill="${ic ? "#1e2e50" : "#9b8a76"}" transform="rotate(${a * 180 / Math.PI + 90} ${x} ${y})"/>` : `<circle cx="${x}" cy="${y}" r="7" fill="${ic ? "#b4472e" : "#9b8a76"}"/>`; }
      const [bx, by] = p((k / N) * 2 * Math.PI - Math.PI / 2, R + 30); s += `<text x="${bx}" y="${by + 5}" text-anchor="middle" font-family="Manrope,sans-serif" font-size="11" font-weight="800" fill="#a87628">BAŞLA</text>`;
      s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="30" font-weight="600" fill="#2a2018">${AD[k][0]}</text><text x="${cx}" y="${cy + 22}" text-anchor="middle" font-family="Manrope,sans-serif" font-size="11" font-weight="800" letter-spacing="2" fill="#6f5d4a">${AD[k][2]}</text></svg>`;
      $(".daire", el).innerHTML = s; $(".bahir", el).textContent = AD[k][1]; $("h4", el).textContent = AD[k][0]; $(".daire-bilgi p", el).textContent = AD[k][3]; const cb = $("[data-kalip]", el); cb.dataset.feet = [AD[k][2], AD[k][2]].join("|");
    };
    el.innerHTML = `<p class="kutu-bas">Bir halka, dört başlangıç</p><div class="daire-kap"><div class="daire"></div><div class="daire-bilgi"><div class="bahir"></div><h4></h4><p></p><div class="daire-dugmeler"><button class="dugme dugme-asil" data-cevir>Başlangıcı kaydır <span class="ok">→</span></button><button class="cal-dugme kucuk" data-kalip="x" data-feet="" aria-label="Dinle">${OYNA}</button></div></div></div>`;
    $("[data-cevir]", el).addEventListener("click", () => { k = (k + 3) % 4; Ses.dur(); ciz(); }); ciz();
  }
};
function kurIcerik(kok, dersId) {
  $$("[data-w]", kok).forEach(el => W[el.dataset.w] && W[el.dataset.w](el));
  $$("[data-ornek]", kok).forEach(el => { const [n, l] = el.dataset.ornek.split("-"); calarKur(el, () => [beyit(n).t[+l]]); });
  $$("[data-temrin]", kok).forEach(el => { if (dersId && el.hasAttribute("data-ders-temrin")) el.dataset.ders = dersId; temrinKur(el); });
}

/* ——— sayfalar ——— */
const ana = $("#ana"); let girisMisra = "";
const bolumBas = (ust, h, p, ek = "") => `<div class="bolum-bas"><div><p class="ust-yazi">${ust}</p><h2>${h}</h2></div>${p ? `<p>${p}</p>` : ""}${ek}</div>`;
const Sayfa = {
  giris() {
    const m = beyit(6), kayitli = B.filter(b => b.kayit).length, bitti = DERSLER.filter(d => Kayit.d.ders[d.id]).length;
    ana.innerHTML = `
    <section class="giris"><div class="giris-resim" style="background-image:url(img/06.webp)"></div><div class="kap">
      <div class="giris-metin"><p class="ust-yazi">Fâilâtün · Bir Beyit, Bir Âlem’in aruz rehberi</p>
        <h1>Hece vezni sayar,<br><em>aruz vezni tartar.</em></h1>
        <div class="giris-imza">Hayâtî İnanç Hocamız <button class="metin-bag" style="background:none;border:0;border-bottom:1px solid var(--cizgi-koyu);padding:0 0 3px" data-klip="tartar">kendi sesinden dinle ▸</button></div>
        <p class="giris-lead">Kitaptaki 52 beyti Hocamızdan dinleyin. Sonra aynı beyitlerle aruzun hesabını, ritmini ve ahengini adım adım öğrenin.</p>
        <div class="giris-dugmeler"><a class="dugme dugme-asil" href="#/beyitler">Beyitleri dinle <span class="ok">→</span></a><a class="dugme dugme-altin" href="#/dersler">Aruza başla</a></div>
        <form class="bul" id="bul"><label for="bul-no">Elinizdeki kitaptan beyit numarası:</label><input id="bul-no" type="number" min="1" max="52" inputmode="numeric" placeholder="1–52"><button>Aç</button></form>
      </div>
      <div class="canli" id="canli"><div class="canli-ust"><p class="ust-yazi" style="margin:0">Bir mısra nasıl tartılır?</p><p>Muhibbî · 6. beyit · Hocamızın “en meşhur vezin” misali</p></div>
        ${taktiHTML(m.t[0])}${calarHTML()}
        <div class="canli-hesap"><span><b>${m.t[0].syl.length}</b> hece</span><span><b>7 + 7 + 7 + 5 = 26</b> birim</span><span><b>${m.t[0].syl.filter(s => s.n === "imale").length}</b> imâle</span><span><b>${m.t[0].syl.filter(s => s.u).length}</b> ulama</span><a class="metin-bag" href="#/beyit/6">Beytin tamamı <span class="ok">→</span></a></div></div>
    </div></section>
    <section class="bolum"><div class="kap">
      <div class="sayilar-bant"><div><b>52</b><span>beyit</span></div><div><b>${kayitli}</b><span>Hocamızın sesinden kayıt</span></div><div><b>8</b><span>aruz kalıbı</span></div><div><b>10</b><span>ders</span></div></div>
      <div style="height:54px"></div>
      ${bolumBas("Üç adım", "Önce zevki, <em>sonra hesabı.</em>", "Hocamızın tavsiyesi bu sitenin usulüdür: şiirin tekniğinden önce lezzeti.")}
      <div class="adimlar">
        <a class="adim" href="#/beyitler"><span class="no">1</span><h3>Dinle</h3><p>Kitaptaki beyti bulun; okuyuşunu ve izahını Hocamızdan dinleyin. Lügati ve bugünkü söyleyişi yanında.</p><span class="metin-bag">52 beyit <span class="ok">→</span></span></a>
        <a class="adim" href="#/beyit/6"><span class="no">2</span><h3>Tart</h3><p>Her beytin hece hece taktîini görün; ritmini darb ya da nağme olarak dinleyin, hesabını okuyun.</p><span class="metin-bag">Bir beyit aç <span class="ok">→</span></span></a>
        <a class="adim" href="#/dersler"><span class="no">3</span><h3>Öğren</h3><p>On kısa dersle aruzu baştan öğrenin: hece, tef’ile, kalıp, ulama, imâle, med ve dâire.</p><span class="metin-bag">${bitti ? `${bitti} / 10 ders tamam` : "Derslere başla"} <span class="ok">→</span></span></a>
      </div></div></section>
    <section class="bolum koyu"><div class="kap">
      ${bolumBas("Hocamızın ağzından", "“Zor mu? Değil. <em>Kulak meselesi.</em>”", "Hocamız sohbetlerinde vezni tef’ile ezberleterek değil, ritmini ağızla vurarak anlatır. Derslerin hepsi bu kayıtlar üzerine kuruldu.")}
      <div class="klipler">${["kulak", "ondakika", "vezinahlaki"].map(k => klipHTML(k)).join("")}</div>
      <div style="margin-top:38px"><a class="dugme dugme-cizgi" href="#/dersler">Bütün dersler <span class="ok">→</span></a></div></div></section>
    <section class="bolum"><div class="kap">
      ${bolumBas("Kalıplar", "Sekiz ritim, <em>sekiz yürüyüş.</em>", "Kitaptaki beyitler sekiz aruz kalıbıyla yazılmıştır. Her birini dinleyin; uzun 2, kısa 1 birim.", `<a class="metin-bag" href="#/vezinler">Bütün vezinler <span class="ok">→</span></a>`)}
      <div class="vezinler acik">${V.slice(0, 4).map(v => vezinKart(v, true)).join("")}</div></div></section>
    <section class="bolum cizgili"><div class="kap">
      ${bolumBas("Kitaptan", "Her beyit <em>bir âlem.</em>", "", `<a class="metin-bag" href="#/beyitler">52 beytin hepsi <span class="ok">→</span></a>`)}
      <div class="beyitler">${[1, 6, 9, 12, 22, 26].map(n => beyitKart(beyit(n))).join("")}</div></div></section>
    <section class="bolum cizgili"><div class="kap kitap"><img src="/bir-beyit-bir-alem/kapak.webp" width="600" height="839" alt="Bir Beyit, Bir Âlem kitabının kapağı" loading="lazy">
      <div><p class="ust-yazi">Kitap</p><h2>Bir Beyit, Bir Âlem</h2><p>Hayâtî İnanç Hocamızın okuyuş ve izahlarından hareketle hazırlanan elli iki beyit, elli iki resim. Fâilâtün, o kitabın aruz mektebidir: beyitleri dinler, veznini burada tartar, aruzu aynı beyitlerle öğrenirsiniz.</p>
      <div class="giris-dugmeler"><a class="dugme dugme-asil" href="/bir-beyit-bir-alem/">Kitabın dinleme rehberi <span class="ok">→</span></a><a class="dugme dugme-cizgi" href="#/hakkinda">Kaynaklar ve usul</a></div></div></div></section>`;
    calarKur($("#canli"), () => [m.t[0]]);
    $("#bul").addEventListener("submit", e => { e.preventDefault(); const n = +$("#bul-no").value; if (n >= 1 && n <= 52) location.hash = "#/beyit/" + n; });
  },
  beyitler() {
    ana.innerHTML = `<div class="kap"><div class="sayfa-bas"><p class="ust-yazi">Kitap sırasıyla</p><h1>52 beyit, <em>52 âlem</em></h1><p>Elinizdeki kitabın beyitleri. Birini seçin: önce Hocamızdan dinleyin, sonra veznini tartın.</p></div>
      <div class="suzgec"><input type="search" id="ara" placeholder="Beyit numarası, şair ya da kelime…" autocomplete="off" aria-label="Beyit ara"><button class="cip" id="sesli" aria-pressed="false">Hocamızın sesinden</button><select id="vsec" aria-label="Vezin"><option value="">Bütün vezinler</option>${V.map(v => `<option value="${v.id}">${v.ad}</option>`).join("")}<option value="hece">Hece vezni</option></select><span class="sayac" id="sayac" aria-live="polite"></span></div>
      <div class="beyitler" id="liste"></div><p class="bos gizli" id="bos">Bu aramada beyit bulunamadı.</p></div><div style="height:60px"></div>`;
    const ara = $("#ara"), ses = $("#sesli"), vs = $("#vsec");
    const ciz = () => { const q = sade(ara.value.trim()), s = ses.getAttribute("aria-pressed") === "true", v = vs.value; const r = B.filter(b => (!s || b.kayit) && (!v || b.vz === v) && (!q || (/^\d+$/.test(q) ? b.n === +q : sade([b.sair, ...b.m].join(" ")).includes(q)))); $("#liste").innerHTML = r.map(beyitKart).join(""); $("#bos").classList.toggle("gizli", r.length > 0); $("#sayac").textContent = `${r.length} beyit`; };
    ara.addEventListener("input", ciz); vs.addEventListener("change", ciz); ses.addEventListener("click", () => { ses.setAttribute("aria-pressed", String(ses.getAttribute("aria-pressed") !== "true")); ciz(); }); ciz();
  },
  beyit(n) {
    const b = beyit(n); if (!b) return Sayfa.beyitler(); const v = VZ[b.vz], i = B.indexOf(b), once = B[i - 1], sonra = B[i + 1]; const aruz = !!v;
    const say = k => b.t.reduce((a, ln) => a + ln.syl.filter(k).length, 0); const birim = b.t.map(ln => ln.syl.reduce((a, s) => a + birimS(s), 0));
    ana.innerHTML = `<div class="bs-resim" style="background-image:url(img/${iki(b.n)}.webp)"></div>
    <div class="kap bs-ust"><div class="bs-kart">
      <div class="bs-yol"><a href="#/beyitler">← Bütün beyitler</a><span class="bs-no">${b.n}. beyit · kitapta ${2 * b.n}–${2 * b.n + 1}. sayfalar</span></div>
      <h1 class="bs-beyit"><span>${esc(b.m[0])}</span><span>${esc(b.m[1])}</span></h1>
      <div class="bs-kunye"><b>${esc(b.sair)}</b>${aruz ? `<a href="#/vezin/${v.id}">${v.ad}</a><span>${v.bahir} bahri</span>` : `<span>Hece vezni · 5 + 5</span>`}</div>
      <div class="bs-eylem">${b.kayit ? `<button class="dugme dugme-altin" data-kayit="${b.n}">${OYNA.replace("<svg", '<svg width="14" height="14" fill="currentColor"')} Hocamızdan dinle${sure(b.kayit.s, b.kayit.e) ? " · " + sure(b.kayit.s, b.kayit.e) : ""}</button>` : ""}<a class="dugme dugme-cizgi" href="/bir-beyit-bir-alem/#beyit-${b.n}">Kitabın dinleme rehberinde aç</a>${b.yazi ? `<a class="dugme dugme-cizgi" href="${esc(b.yazi)}" target="_blank" rel="noopener">Hocamızın yazısı ↗</a>` : ""}</div>
      ${b.kayit ? (b.kayit.not ? `<p class="bs-not">${esc(b.kayit.not)}</p>` : "") : `<p class="bs-not">Bu beytin okuma kaydı henüz eşleştirilmedi; taktîi ve lügati aşağıdadır.</p>`}
    </div></div>
    <div class="kap bs-takti">
        <section class="panel" id="taktipanel"><p class="ust-yazi">Taktî</p><h2>${aruz ? "Hece hece vezin" : "Hece vezni"}</h2><p class="aciklama">${aruz ? "Çizgi uzun (2 birim), nokta kısa (1 birim). Ritmi dinlerken heceleri takip edin." : "Bu beyit aruzla değil, hece vezniyle yazılmıştır: her mısrada beş hece, bir durak, beş hece. Aruz tartar; hece vezni sayar."}</p>
          ${b.t.map((ln, li) => `<p class="misra-etiket">${li + 1}. mısra</p>${taktiHTML(ln)}`).join("")}
          ${aruz ? calarHTML() + LEJANT : ""}
          ${aruz ? `<div class="hesap"><div><b>${b.t[0].syl.length}${b.t[1].syl.length !== b.t[0].syl.length ? "/" + b.t[1].syl.length : ""}</b><span>hece</span></div><div><b>${birim[0]}</b><span>birim</span></div><div><b>${say(s => s.n === "imale")}</b><span>imâle</span></div><div><b>${say(s => s.u)}</b><span>ulama</span></div></div>` : ""}
          ${b.incelik ? `<p class="incelik"><b>İncelik</b>${esc(b.incelik)}</p>` : ""}
          ${b.supheli ? `<p class="incelik"><b>Not</b>${esc(b.supheli)}</p>` : ""}
        </section>
    </div>
    <div class="kap" style="margin-top:22px"><div class="iki">
      <div style="display:grid;gap:22px">
        <section class="panel"><p class="ust-yazi">Bugünkü söyleyişle</p><p class="nesir">${esc(b.nesir)}</p><p class="kaynak" style="margin:16px 0 0">Beytin şerhi ve resmi, <em>Bir Beyit, Bir Âlem</em> kitabının ${2 * b.n}–${2 * b.n + 1}. sayfalarındadır.</p></section>
      </div>
      <aside class="yan">
        <section class="panel"><p class="ust-yazi">Lügat</p><dl class="lugat">${b.lugat.map(([k, m]) => `<div><dt>${esc(k)}</dt><dd>${esc(m)}</dd></div>`).join("")}</dl></section>
        ${aruz ? `<section class="panel"><p class="ust-yazi">Bu beytin vezni</p><h3>${v.ad}</h3><p style="font-size:16px;color:var(--soluk)">${v.tanim}</p><p style="margin:0"><a class="metin-bag" href="#/vezin/${v.id}">Aynı vezindeki ${v.beyitler.length} beyit <span class="ok">→</span></a></p></section>` : ""}
      </aside></div>
      <nav class="gecis" aria-label="Önceki ve sonraki beyit">${once ? `<a href="#/beyit/${once.n}"><small>← ${once.n}. beyit · ${esc(once.sair)}</small><b>${esc(once.m[0])}</b></a>` : "<span></span>"}${sonra ? `<a href="#/beyit/${sonra.n}"><small>${sonra.n}. beyit · ${esc(sonra.sair)} →</small><b>${esc(sonra.m[0])}</b></a>` : "<span></span>"}</nav>
    </div><div style="height:50px"></div>`;
    if (aruz) calarKur($("#taktipanel"), () => b.t);
  },
  dersler() {
    const bitti = DERSLER.filter(d => Kayit.d.ders[d.id]).length;
    ana.innerHTML = `<div class="kap"><div class="sayfa-bas"><p class="ust-yazi">Fâilâtün · aruz dersleri</p><h1>On derste <em>aruz</em></h1><p>Her ders kısa bir izah, Hocamızın ağzından bir kayıt, kitaptan bir misal ve bir temrinden ibarettir. Hesabı basittir: kısa hece 1, uzun hece 2.</p>
      <div style="display:flex;gap:16px;align-items:center;margin-top:24px;font-family:var(--arayuz);font-size:13px;font-weight:700;color:var(--soluk)"><div class="ilerleme" style="flex:1"><i style="width:${bitti * 10}%"></i></div><span>${bitti} / 10 ders tamam</span></div></div>
      ${klipHTML("zevk", { yatay: true })}
      <div class="dersler" style="margin-top:26px">${DERSLER.map((d, i) => `<a class="dk${Kayit.d.ders[d.id] ? " bitti" : ""}" href="#/ders/${d.id}"><span class="no">${i + 1}</span><span><h3>${d.baslik}</h3><p>${d.ozet}</p></span><span class="durum" aria-label="${Kayit.d.ders[d.id] ? "tamamlandı" : ""}">✓</span></a>`).join("")}</div></div><div style="height:70px"></div>`;
  },
  ders(id) {
    const i = DERSLER.findIndex(d => d.id === id); if (i < 0) return Sayfa.dersler(); const d = DERSLER[i], once = DERSLER[i - 1], sonra = DERSLER[i + 1];
    ana.innerHTML = `<article class="ders"><header class="ders-bas"><a class="metin-bag" href="#/dersler" style="border:0;color:var(--soluk)">← Dersler</a><div class="no" style="margin-top:18px">${i + 1}. ders</div><h1>${d.baslik}</h1><p>${d.ozet}</p></header>${d.govde()}
      <div class="ders-son">${once ? `<a class="dugme dugme-cizgi" href="#/ders/${once.id}">← ${once.baslik}</a>` : "<span></span>"}${sonra ? `<a class="dugme dugme-asil" href="#/ders/${sonra.id}">${i + 2}. ders: ${sonra.baslik} <span class="ok">→</span></a>` : `<a class="dugme dugme-asil" href="#/beyitler">Beyitlere dön <span class="ok">→</span></a>`}</div></article>`;
    kurIcerik(ana, d.id);
  },
  vezinler() {
    ana.innerHTML = `<div class="kap"><div class="sayfa-bas"><p class="ust-yazi">Kalıplar</p><h1>Sekiz ritim, <em>sekiz yürüyüş</em></h1><p>Kitaptaki 51 aruzlu beyit bu sekiz kalıpla, bir beyit de hece vezniyle yazılmıştır. Her kalıbın hesabı yanında: tef’ilelerin ağırlığı ve toplam birim.</p></div>
      <div class="vezinler acik">${V.map(v => vezinKart(v, true)).join("")}</div>
      <div style="margin-top:40px">${klipHTML("ondakika", { yatay: true })}</div></div><div style="height:60px"></div>`;
  },
  vezin(id) {
    const v = VZ[id]; if (!v) return Sayfa.vezinler();
    ana.innerHTML = `<section class="vezin-bas"><div class="kap"><a class="metin-bag" href="#/vezinler" style="border:0;color:#b9c2d6">← Bütün vezinler</a><p class="ust-yazi" style="margin-top:22px;color:var(--altin-2)">${v.bahir} bahri</p><h1>${v.ad}</h1><p class="ar" lang="ar">${v.ar}</p>
      <div class="buyuk-kalip" id="bk">${v.feet.map((f, i) => `<div class="bf"><div class="sr">${f.split(" ").map(x => `<i class="${x === "—" ? "u" : "k"}"></i>`).join("")}</div><b>${v.tef[i]}</b><small>${agizF(f)} · ${v.b[i]}</small></div>`).join("")}</div>
      <div class="calar" style="margin:20px 0 26px"><button class="cal-dugme" data-kalip="${v.id}" data-hedef="#bk" data-tekrar="2" aria-label="Ritmi dinle" style="background:linear-gradient(180deg,#e2bd72,#c6963f);color:#2a1c06">${OYNA}</button><span>Ritmi iki mısra dinle</span><span class="secim" role="group"><button data-mod="darb" aria-pressed="${Kayit.d.ayar.mod === "darb"}">Darb</button><button data-mod="nagme" aria-pressed="${Kayit.d.ayar.mod === "nagme"}">Nağme</button></span></div>
      <p>${v.tanim}</p>
      <div class="hesap" style="max-width:640px"><div><b>${v.b.join("+")}</b><span>toplama</span></div><div><b>${v.top}</b><span>birim</span></div><div><b>${v.hece}</b><span>hece</span></div><div><b>${v.beyitler.length}</b><span>beyit</span></div></div></div></section>
      ${v.klip.length ? `<section class="bolum"><div class="kap">${bolumBas("Hocamızın ağzından", "Bu vezni <em>Hocamızdan dinleyin</em>", "")}<div class="klipler">${v.klip.map(k => klipHTML(k)).join("")}</div></div></section>` : ""}
      <section class="bolum cizgili"><div class="kap">${bolumBas("Kitaptan", `Bu vezinde <em>${v.beyitler.length} beyit</em>`, "")}<div class="beyitler">${v.beyitler.map(beyitKart).join("")}</div></div></section>`;
  },
  temrin() {
    const TIP = [["isaretle", "Taktî temrini", "hepsi"], ["kulak", "Kulak temrini", ""], ["kelime", "Kayıp kelime", ""], ["birim", "Tef’ile hesabı", ""]];
    ana.innerHTML = `<div class="kap"><div class="sayfa-bas"><p class="ust-yazi">Temrin</p><h1>Tekrarla <em>yerleşir</em></h1><p>Dört kısa temrin, hepsi kitaptaki beyitlerle. Yanlış yapınca bir daha deneyin; maksat puan değil, kulağın alışmasıdır.</p></div>
      <div class="sekmeler">${TIP.map((t, i) => `<button data-t="${i}" aria-pressed="${i === 0}">${t[1]}</button>`).join("")}<span class="puan" style="color:var(--soluk);align-self:center">İlk denemede doğru: <b style="color:var(--altin)" id="puan">${Kayit.d.puan.d} / ${Kayit.d.puan.t}</b></span></div><div id="talan"></div></div><div style="height:60px"></div>`;
    const ac = i => { const t = TIP[i]; $("#talan").innerHTML = `<div class="temrin" data-temrin="${t[0]}" data-adet="5"${t[2] ? ` data-filtre="${t[2]}"` : ""}${t[0] === "birim" ? ' data-tur="tefile"' : ""}></div>`; temrinKur($("#talan .temrin")); };
    $$(".sekmeler button").forEach(b => b.addEventListener("click", () => { Ses.dur(); $$(".sekmeler button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); ac(+b.dataset.t); })); ac(0);
  },
  tart() {
    const ilk = girisMisra || "Korkma sönmez bu şafaklarda yüzen al sancak"; girisMisra = "";
    ana.innerHTML = `<div class="kap" style="max-width:900px"><div class="sayfa-bas"><p class="ust-yazi">Mısra tartısı</p><h1>Kendi mısranızı <em>tartın</em></h1><p>Bir ya da iki mısra yazın; kitaptaki sekiz kalıpla karşılaştıralım. Uzun seslileri şapkayla (â, î, û) yazarsanız tartı daha doğru çalışır.</p></div>
      <div class="tart-alan"><textarea id="tmisra" rows="2" spellcheck="false" aria-label="Mısra">${esc(ilk)}</textarea><div class="giris-dugmeler" style="margin-top:14px"><button class="dugme dugme-asil" id="tartdugme">Tartıya koy</button><span style="font-family:var(--arayuz);font-size:13px;color:var(--soluk);font-weight:600">Bu bir ön incelemedir; şiirin bütünü hakkında hüküm vermez.</span></div></div>
      <div class="tart-sonuc" id="tsonuc"></div></div><div style="height:60px"></div>`;
    const yap = () => {
      const ms = $("#tmisra").value.split("\n").map(x => x.trim()).filter(Boolean).slice(0, 2); if (!ms.length) return;
      const r = V.map(v => { const ss = ms.map(m => Tart.coz(m, v.feet)); return ss.every(Boolean) ? { v, ss, c: ss.reduce((a, s) => a + s.c, 0) } : null; }).filter(Boolean).sort((a, b) => a.c - b.c);
      const say = (x, n) => x.ss.reduce((a, s) => a + s.syl.filter(h => h.n === n).length, 0);
      $("#tsonuc").innerHTML = r.length ? r.slice(0, 3).map((x, i) => `<div class="tart-kart${i === 0 ? " en-iyi" : ""}" data-tk="${i}"><h3><a href="#/vezin/${x.v.id}" style="text-decoration:none">${x.v.ad}</a><small>${i === 0 ? "en yakın kalıp · " : ""}${say(x, "imale")} imâle${say(x, "zihaf") ? " · zihaf var" : ""}${say(x, "kusur") ? " · zorlama var" : ""}</small></h3>${x.ss.map(s => taktiHTML(s, { kucuk: true })).join("")}${calarHTML({ kucuk: true })}</div>`).join("") : `<p class="bos">Bu mısra kitaptaki sekiz kalıptan hiçbirine oturmadı. Hece sayısına ve uzun seslilere bir daha bakın; başka bir kalıpla ya da hece vezniyle yazılmış olabilir.</p>`;
      $$("[data-tk]").forEach(el => calarKur(el, () => r[+el.dataset.tk].ss));
    };
    $("#tartdugme").addEventListener("click", yap); yap();
  },
  hakkinda() {
    ana.innerHTML = `<article class="ders"><header class="ders-bas"><p class="ust-yazi">Kaynaklar ve usul</p><h1>Bu sayfa nasıl hazırlandı?</h1><p>Fâilâtün: Bir Beyit, Bir Âlem kitabındaki beyitlerle aruz.</p></header>
      <h2>Beyitler</h2><p>Elli iki beytin metni, şairi ve vezni <em>Bir Beyit, Bir Âlem</em> kitabından alınmıştır; kitaptaki sıra ve sayfa numaraları korunmuştur. Resimler kitabın resimleridir. Beyitlerin şerhi kitabın kendisindedir.</p>
      <h2>Kayıtlar</h2><p>“Hocamızdan dinle” düğmeleri, Hayâtî İnanç Hocamızın o beyti okuyup izah ettiği sohbetin ilgili bölümünü açar. Aruz derslerindeki kayıtlar, Hocamızın vezinden bizzat bahsettiği bölümlerdir. Kayıtlar yayınlandıkları kanallarda durur; burada yalnız ilgili aralık gösterilir. Aralıklar yaklaşıktır; birkaç saniye erken ya da geç başlayabilir.</p>
      <h2>Taktî</h2><p>Her mısra hece hece tartılmış, kalıba oturtulmuş ve tek tek gözden geçirilmiştir. Ulama, imâle, zihaf ve med yerleri işaretlidir. Kitabın verdiği vezin esas alınmıştır. Lügat ve bugünkü söyleyişle verilen karşılıklar, kitaptaki şerhe bağlı kalınarak bu sayfa için hazırlanmıştır.</p>
      <h2>Ritim sesi</h2><p>“Ritmi dinle” düğmesi bir okuyuş kaydı değildir; kalıbın hesabını duyurmak için üretilen bir sestir. Kısa hece bir birim, uzun hece iki birim sürer. “Darb” vuruşla, “nağme” aynı hesabı basit bir ezgiyle verir. Beytin asıl sesi Hocamızın okuyuşudur.</p>
      <h2>Mısra tartısı</h2><p>Serbest tartı bir ön incelemedir: tek mısraya bakar, tarihî söyleyişi bilemez ve şiirin bütünü hakkında hüküm vermez.</p>
      <h2>Tashih</h2><p>Bir yanlış görürseniz haber verin: <a class="metin-bag" href="https://bir-beyit-bir-alem-tashih.someonebkr.chatgpt.site/#kapak=on" target="_blank" rel="noopener">tashih bırak ↗</a></p>
      <div class="ders-son"><a class="dugme dugme-cizgi" href="#/">← Giriş</a><a class="dugme dugme-asil" href="/bir-beyit-bir-alem/">Kitabın dinleme rehberi <span class="ok">→</span></a></div></article>`;
  }
};

/* ——— yol ——— */
const ESKI = { kesfet: "#/", oyna: "#/temrin", ritimler: "#/vezinler", meclis: "#/beyitler", dersler: "#/dersler", laboratuvar: "#/tart", arsiv: "#/beyitler", ogretmen: "#/dersler", beyitler: "#/beyitler" };
function yol() {
  Ses.dur(); if (pencere.open) pencere.close();
  let h = location.hash || "#/";
  const eski = h.match(/^#beyit-(\d+)$/); if (eski) { location.replace("#/beyit/" + eski[1]); return; }
  if (!h.startsWith("#/")) { location.replace(ESKI[h.slice(1)] || "#/"); return; }
  const [, s, p] = h.split("/");
  const ad = s || "giris"; (Sayfa[ad] || Sayfa.giris)(p ? decodeURIComponent(p) : undefined);
  const grup = { giris: "", beyit: "beyitler", ders: "dersler", vezin: "vezinler" }[ad] ?? ad;
  $$(".gezin a").forEach(a => a.getAttribute("href") === "#/" + grup ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  const T = { giris: "Fâilâtün · Hayâtî İnanç Hocamızın beyitleriyle aruz", beyitler: "52 beyit", dersler: "Aruz dersleri", vezinler: "Vezinler", temrin: "Temrin", tart: "Mısra tartısı", hakkinda: "Kaynaklar ve usul" };
  let t = T[ad]; if (ad === "beyit" && beyit(p)) t = `${p}. beyit · ${beyit(p).sair}`; if (ad === "ders") { const d = DERSLER.find(x => x.id === p); if (d) t = d.baslik; } if (ad === "vezin" && VZ[p]) t = VZ[p].ad;
  document.title = (t && ad !== "giris" ? t + " · " : "") + (ad === "giris" ? T.giris : "Fâilâtün");
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", yol);
/* dışarıdan gelen bağlantılar: ?beyit=9 · ?misra=…(&misra2=…) · ?kalip=… (ya da ?ritim=…) */
(() => {
  const q = new URLSearchParams(location.search), n = q.get("beyit"), m = q.get("misra"), m2 = q.get("misra2"), k = q.get("kalip") || q.get("ritim"); let hedef = null;
  const harf = s => sade(s).replace(/[^a-z]/g, "");
  if (n && beyit(n)) hedef = "#/beyit/" + +n;
  else if (m) { const b = B.find(b => b.m.some(l => harf(l) === harf(m))); if (b) hedef = "#/beyit/" + b.n; else { girisMisra = [m, m2].filter(Boolean).join("\n"); hedef = "#/tart"; } }
  else if (k) { const v = V.find(v => v.id === k || harf(v.ad) === harf(k)); hedef = v ? "#/vezin/" + v.id : "#/vezinler"; }
  if (hedef) history.replaceState(null, "", location.pathname + hedef);
})();
yol();
})();
