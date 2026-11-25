/* Şair Ne Demek İstedi? · Fâilâtün — uygulama */
(() => {
"use strict";
const D = window.BBA, B = D.beyitler, V = D.vezinler, K = D.klipler;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const iki = n => String(n).padStart(2, "0");
const misraHTML = m => String(m).split(" ").map(k => `<span class="kl">${esc(k)}</span>`).join(" ");
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
  "failatun": "Divan şiirinin en çok kullanılan kalıbı. Uzun heceyle başlar; dengeli, vakur bir yürüyüşü vardır. Hocamız “en meşhur vezin” diye bunu sayar, misalini de Kanûnî Sultan Süleyman Han’ın (Muhibbî) sıhhat beytiyle verir.",
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
/* izafet ve tireli birleşmeler ulama sayılmaz: ulama yalnız ‿ ile gösterilen bağlanmadır */
B.forEach(b => b.t.forEach(ln => ln.syl.forEach(s => { if (s.u && !s.t.includes("‿")) delete s.u; })));
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
  return `<span class="hece${s.w && !ilk ? " kb" : ""}" data-i="${i}" style="--i:${i}"><span class="is">${isaret(s.v)}</span><span class="yz">${esc(s.t)}</span>${nt ? `<span class="nt ${sinif}">${nt}</span>` : ""}</span>`;
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
function klipHTML(key, o = {}) {
  const c = K[key]; if (!c) return "";
  const soz = c.soz ? `<span class="klip-soz"><i class="tirnak" aria-hidden="true">“</i>${esc(c.soz)}</span>` : `<span class="klip-soz yalin">${esc(c.baslik)}</span>`;
  return `<button class="klip${o.yatay ? " klip-yatay" : ""}" data-klip="${key}"><span class="klip-yuz">${soz}<span class="klip-oyna"><i>${OYNA}</i><span>Hocamızdan dinleyin${sure(c.s, c.e) ? " · " + sure(c.s, c.e) : ""}</span></span></span><span class="klip-govde">${c.soz ? `<h3>${esc(c.baslik)}</h3>` : ""}<p>${esc(c.ozet)}</p></span></button>`;
}

/* ——— kartlar ——— */
function beyitKart(b) {
  const v = VZ[b.vz];
  return `<a class="bk" href="#/beyit/${b.n}"><span class="bk-resim"><img src="img/${iki(b.n)}k.webp" alt="" loading="lazy" width="640" height="342"><span class="bk-no">${iki(b.n)}</span>${b.kayit ? `<span class="bk-ses">${OYNA} Hocamızdan</span>` : ""}</span>
    <span class="bk-govde"><p class="bk-beyit"><span>${misraHTML(b.m[0])}</span><span>${misraHTML(b.m[1])}</span></p><span class="bk-alt"><span>${esc(b.sair)}</span><span class="vz">${v ? v.ad : "Hece vezni · 5 + 5"}</span></span></span></a>`;
}
const kalipHTML = (feet, acik) => feet.map(f => `<span class="kalip-f${acik ? " acik" : ""}">${f.split(" ").map(x => `<i class="${x === "—" ? "u" : "k"}"></i>`).join("")}</span>`).join("");
function vezinKart(v, acik) {
  const m = v.beyitler.find(b => b.kayit) || v.beyitler[0];
  return `<div class="vezin${acik ? " acik" : ""}"><h3><a href="#/vezin/${v.id}">${v.ad}</a></h3><button class="cal-dugme kucuk" data-kalip="${v.id}" aria-label="${v.ad} ritmini dinle">${OYNA}</button>
    <span class="kal">${kalipHTML(v.feet, acik)}</span>${m ? `<span class="vz-misal">${esc(m.m[0])}<small>${esc(m.sair)} · ${m.n}. beyit</small></span>` : ""}<span class="bilgi"><span>${v.bahir} bahri</span><span>${v.b.join(" + ")} = ${v.top} birim</span><span>${v.hece} hece</span><span>${v.beyitler.length} beyit</span></span></div>`;
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
      const lows = s.map(u => u[1]), n = lows.findIndex(c => VV.includes(c)); let cls = "X"; if (n >= 0) { const coda = lows.slice(n + 1).join(""), lv = VL.includes(lows[n]); cls = !coda ? (lv ? "L" : "S") : lv ? (coda === "n" ? "N" : "O") : coda.length >= 2 ? "K" : "C"; }
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
      else if (c === "K") { if (p === "—") { tr(0, 1, "—", null); if (j + 1 < m && pat[j + 1] === "·") tr(1.2, 2, "—·", "med"); } else tr(9, 1, "·", "kusur"); }
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
    const words = kelimeler(String(line).slice(0, 90)); if (!words.length) return null;
    const napo = Math.min(3, words.reduce((a, w) => a + w.o.filter(c => APO.includes(c)).length, 0)); const lk = [];
    for (let wi = 1; wi < words.length; wi++) { const a = words[wi - 1].o.filter(c => !APO.includes(c)).map(low), b0 = words[wi].o[0]; if (a.length && !VV.includes(a[a.length - 1]) && !APO.includes(b0) && VV.includes(low(b0)) && words[wi].sep !== ",") lk.push(wi); }
    const L = Math.min(lk.length, 7); let best = null;
    for (let am = 0; am < (1 << napo); am++) { const apos = Array.from({ length: 8 }, (_, i) => !!(am >> i & 1));
      for (let lm = 0; lm < (1 << L); lm++) { const links = {}; let yok = 0; lk.forEach((wi, i) => { links[wi] = i >= L ? true : !!(lm >> i & 1); if (!links[wi]) yok++; });
        const sy = kur(words, links, apos);
        turevler(feet0).forEach((feet, vi) => { const r = dp(sy, feet); if (r[0] >= 1e8) return; const c = r[0] + 0.25 * yok + 0.4 * vi; if (!best || c < best.c) best = { c, sy, feet, sol: r[1] }; });
      } }
    if (!best) return null;
    const syl = []; let pos = 0, node = best.sol; const fb = []; let acc = 0; best.feet.forEach(f => { acc += f.split(" ").length; fb.push(acc); });
    best.sy.forEach(s => { const f = fb.findIndex(x => pos < x); const o = { t: s.t, v: node.val, f }; if (s.w) o.w = 1; if (node.note) o.n = node.note; if (s.u && s.t.includes("‿")) o.u = 1; syl.push(o); pos += node.span; node = node.next; });
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
const HUCRE = ["— · — —", "· — — —", "· · — —", "— — ·"];
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
    else if (tip === "kulak") liste = kok.dataset.tur === "tefile" ? karistir(HUCRE).slice(0, adet) : karistir(V).slice(0, adet);
    else if (tip === "birim") liste = kok.dataset.tur === "hece" ? karistir(havuz("sade")).slice(0, adet) : karistir(Object.keys(TEF)).slice(0, adet);
    else if (tip === "kelime") liste = karistir(B.filter(b => b.vz !== "hece")).slice(0, adet);
    else if (tip === "vurus") liste = kok.dataset.tur === "tefile" ? karistir(["— · — —", "· — — —", "· · — —", "— — ·", "· — · —"]).slice(0, adet).map(f => ({ feet: [f, f], ad: `${TEF[f]} · ${TEF[f]}` }))
      : kok.dataset.tur === "misra" ? karistir(havuz("sade")).slice(0, adet)
        : [VZ.failatun, ...karistir(V.filter(v => v.id !== "failatun"))].slice(0, adet).map(v => ({ feet: v.feet, ad: v.ad }));
    else if (tip === "kalip") liste = karistir(havuz("hepsi")).slice(0, adet);
    else if (tip === "aksak") liste = karistir(havuz("sade").filter(x => x.ln.syl.length > 6)).slice(0, adet);
    soru();
  }
  function ileri(ilkDeneme) { if (ilkDeneme) dogru++; Kayit.d.puan.t++; if (ilkDeneme) Kayit.d.puan.d++; Kayit.yaz(); sira++; if (sira >= adet) bitir(); else soru(); }
  function soru() { ({ isaretle, kulak, birim, kelime, vurus, kalip, aksak })[tip](liste[sira]); }
  function vurus(x) {
    const misra = !!x.ln; let ilk = null;
    kok.innerHTML = ust(misra ? "Mısrayı elinizle vurun" : "Ritmi elinizle vurun") + `<p>${misra ? `${x.b.n}. beyit · ${esc(x.b.sair)}. ` : `<b class="t-ad">${x.ad}</b>. `}Önce dinleyin; sonra her heceye bir vuruş.</p><div data-valan></div>
      <div class="t-alt"><button class="dugme dugme-altin gizli" data-ileri>Devam <span class="ok">→</span></button><button class="dugme dugme-cizgi dugme-kucuk" data-gec>Bunu geç</button></div>`;
    const o = { bitti: tam => { if (ilk === null) ilk = tam; if (!tam) return; const d = $("[data-ileri]", kok); d.classList.remove("gizli"); $("[data-gec]", kok).classList.add("gizli"); d.onclick = () => ileri(ilk); } };
    if (misra) vurusSatir($("[data-valan]", kok), x.ln, o); else vurusKalip($("[data-valan]", kok), x.feet, o);
    $("[data-gec]", kok).addEventListener("click", () => ileri(false));
  }
  function kalip(x) {
    const v = VZ[x.b.vz], sik = karistir([v, ...karistir(V.filter(y => y.id !== v.id && y.feet[0] !== v.feet[0])).slice(0, 2), ...karistir(V.filter(y => y.id !== v.id && y.feet[0] === v.feet[0])).slice(0, 1)]).slice(0, 4);
    secenekli("Bu mısra hangi kalıpta?", `<div class="adsiz">${taktiHTML(x.ln, { kucuk: true })}</div><p class="t-kunye">${x.b.n}. beyit · ${esc(x.b.sair)} · ${x.i + 1}. mısra</p><p>İlk kümeye bakın: uzunla mı başlıyor, kısayla mı? Sonra ikinci kümeyle sağlamasını yapın.</p>`,
      sik.map(y => `<span>${y.ad}</span>`), sik.indexOf(v), `Doğru: ${v.ad}. İlk tef’ile ${TEF[x.ln.feet[0]] || ""}; mısra ${x.ln.feet.map(birimF).join(" + ")} = ${x.ln.feet.map(birimF).reduce((a, b) => a + b, 0)} birim.`);
  }
  function aksak(x) {
    const ln = x.ln, n = ln.syl.length, aday = ln.syl.map((s, i) => i).filter(i => i > 0 && i < n - 1 && ln.syl[i].v !== "—·"), hedef = aday[Math.floor(Math.random() * aday.length)];
    const asil = diziSatir(ln), bozuk = asil.map((d, i) => i === hedef ? Object.assign({}, d, { b: d.b === 1 ? 2 : 1 }) : d); let cozuldu = false, deneme = 0;
    kok.innerHTML = ust("Aksayan heceyi bulun") + `<p>Çizgi ve noktalar mısranın doğru tartısını gösteriyor. Çalınan ritimde bir hece ölçüsünden çıktı: ya uzun iken kısa vuruldu ya kısa iken uzun. Dinleyin, o heceye dokunun.</p>
      <div class="calar"><button class="cal-dugme" data-acal aria-label="Ritmi dinle">${OYNA}</button><span data-aet>Ritmi dinleyin</span></div>
      <div class="t-misra">${ln.syl.map((s, i) => `<button class="t-hece${s.w && i ? " kb" : ""}" data-i="${i}" data-s="${s.v === "·" ? "k" : "u"}"><span class="is"><i></i><i></i></span><span>${esc(s.t)}</span><small></small></button>`).join("")}</div>
      <p class="t-kunye">${x.b.n}. beyit · ${esc(x.b.sair)} · ${x.i + 1}. mısra</p><p class="t-sonuc" aria-live="polite"></p>
      <div class="t-alt"><button class="dugme dugme-altin gizli" data-ileri>Devam <span class="ok">→</span></button><button class="dugme dugme-cizgi dugme-kucuk" data-goster>Cevabı göster</button></div>`;
    const hs = $$(".t-hece", kok), son = $(".t-sonuc", kok), cal = $("[data-acal]", kok);
    cal.addEventListener("click", () => {
      if (cal.dataset.durum === "caliyor") { Ses.dur(); return; }
      cal.innerHTML = DUR; cal.dataset.durum = "caliyor";
      Ses.cal(cozuldu ? asil : bozuk, { adim: i => { hs.forEach(h => h.classList.remove("calan")); hs[i].classList.add("calan"); }, bitti: () => { cal.innerHTML = OYNA; cal.dataset.durum = ""; hs.forEach(h => h.classList.remove("calan")); } });
    });
    const coz = ilk => {
      cozuldu = true; Ses.dur(); hs.forEach(h => { h.disabled = true; h.classList.remove("y"); }); hs[hedef].classList.add("d");
      const s = ln.syl[hedef], kisa = s.v === "·"; son.className = "t-sonuc iyi";
      son.textContent = `${ilk ? "Kulağınız yerinde. " : ""}“${s.t}” hecesi ${kisa ? "kısa iken uzun" : "uzun iken kısa"} vuruldu; mısra bir birim ${kisa ? "fazla" : "eksik"} geldi. Şimdi doğrusunu dinleyin.`;
      $("[data-aet]", kok).textContent = "Doğrusunu dinleyin"; $("[data-goster]", kok).classList.add("gizli");
      const d = $("[data-ileri]", kok); d.classList.remove("gizli"); d.onclick = () => ileri(ilk);
    };
    hs.forEach((h, i) => h.addEventListener("click", () => { if (cozuldu) return; deneme++; if (i === hedef) coz(deneme === 1); else { h.classList.add("y"); h.disabled = true; son.className = "t-sonuc kotu"; son.textContent = "Orası ölçüsünde. Bir daha dinleyin; ritmin tökezlediği yeri arayın."; } }));
    $("[data-goster]", kok).addEventListener("click", () => coz(false));
  }
  const neden = h => { if (h.n && NOT[h.n]) return NOT[h.n]; const t = h.t.replace(/[^\p{L}]/gu, "").toLocaleLowerCase("tr"), c = t[t.length - 1]; return "âîû".includes(c) ? "uzun sesli" : "aeıioöuü".includes(c) ? "açık hece" : "kapalı hece"; };
  function isaretle(x) {
    let deneme = 0; const uclu = ["med", "hepsi"].includes(kok.dataset.filtre), SOZ = { "": "tartılmadı", k: "kısa", u: "uzun", m: "medli" }, sira = uclu ? ["k", "u", "m"] : ["k", "u"];
    const bek = h => h.v === "·" ? "k" : h.v === "—·" && uclu ? "m" : "u";
    kok.innerHTML = ust("Heceleri tartın") + `<p>Her heceye dokunun: bir dokunuş kısa (nokta), iki dokunuş uzun (çizgi)${uclu ? ", üç dokunuş medli (çizgi ve nokta)" : ""}. Ulama yapılan yerler ‿ ile bağlanmıştır.</p>
      <div class="t-misra">${x.ln.syl.map((h, i) => `<button class="t-hece${h.w && i ? " kb" : ""}" data-i="${i}" data-s="" aria-label="${esc(h.t)}: tartılmadı"><span class="is"><i></i><i></i></span><span>${esc(h.t)}</span><small></small></button>`).join("")}</div>
      <p class="t-kunye">${x.b.n}. beyit · ${esc(x.b.sair)} · ${x.i + 1}. mısra</p><p class="t-sonuc" aria-live="polite"></p>
      <div class="t-alt"><button class="dugme dugme-altin" data-tart>Tartıya koy</button><button class="dugme dugme-cizgi dugme-kucuk" data-goster>Cevabı göster</button><button class="dugme dugme-altin gizli" data-ileri>Devam <span class="ok">→</span></button></div>`;
    const hs = $$(".t-hece", kok), son = $(".t-sonuc", kok);
    hs.forEach(h => h.addEventListener("click", () => { if (kok.dataset.kilit) return; h.dataset.s = sira[(sira.indexOf(h.dataset.s) + 1) % sira.length]; h.classList.remove("d", "y"); $("small", h).textContent = ""; h.setAttribute("aria-label", `${h.children[1].textContent}: ${SOZ[h.dataset.s]}`); }));
    const bitti = ilk => { kok.dataset.kilit = "1"; hs.forEach((h, i) => { const s = x.ln.syl[i]; h.dataset.s = s.v === "·" ? "k" : s.v === "—·" ? "m" : "u"; h.classList.remove("y"); h.classList.add("d"); $("small", h).textContent = s.n ? NOT[s.n] : ""; }); $("[data-tart]", kok).classList.add("gizli"); $("[data-goster]", kok).classList.add("gizli"); const d = $("[data-ileri]", kok); d.classList.remove("gizli"); d.onclick = () => { delete kok.dataset.kilit; ileri(ilk); }; son.className = "t-sonuc iyi"; son.textContent = (ilk ? "Tam isabet. " : "") + `Kalıp: ${x.ln.feet.map(f => TEF[f]).join(" · ")}`; };
    $("[data-tart]", kok).addEventListener("click", () => {
      deneme++; let yanlis = 0, bos = 0;
      hs.forEach((h, i) => { const s = x.ln.syl[i]; h.classList.remove("d", "y"); $("small", h).textContent = ""; if (h.dataset.s === "") bos++; else if (h.dataset.s === bek(s)) h.classList.add("d"); else { h.classList.add("y"); yanlis++; if (deneme >= 2) $("small", h).textContent = neden(s); } });
      if (bos) { son.className = "t-sonuc kotu"; son.textContent = `${bos} hece tartılmadı. Hepsine dokunun.`; hs.forEach(h => h.classList.remove("d", "y")); deneme--; return; }
      if (!yanlis) return bitti(deneme === 1);
      const sonHece = hs[hs.length - 1].classList.contains("y"); son.className = "t-sonuc kotu";
      son.textContent = yanlis === 1 && sonHece ? "Yalnız son hece kaldı: mısranın son hecesi her zaman uzun sayılır." : deneme >= 2 ? `${yanlis} hece yerine oturmadı. Altlarına sebebini yazdık: açık hece kısa, kapalı ve uzun sesli hece uzundur; imâle kısayı uzatır, med bir uzunla bir kısa tutar.` : `${yanlis} hece yerine oturmadı. İşaretli heceler nasıl bitiyor, seslisi uzun mu? Bir daha bakın.`;
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
    if (kok.dataset.tur === "tefile") {
      const f = v, sik = karistir(HUCRE), yer = f.split(" ").indexOf("·");
      return secenekli("Hangi hücreyi duydunuz?", `<p>Aynı hücre iki defa çalınır. Kısa hecenin yerini dinleyin: başta mı, ortada mı, sonda mı?</p><div class="calar"><button class="cal-dugme" data-kalip="x" data-feet="${f}|${f}" aria-label="Ritmi dinle">${OYNA}</button><span>Ritmi dinleyin</span></div>`,
        sik.map(y => `<span>${TEF[y]}</span><span class="kalip-f">${y.split(" ").map(c => `<i class="${c === "—" ? "u" : "k"}"></i>`).join("")}</span>`), sik.indexOf(f), `Doğru: ${TEF[f]}, ağızla “${agizF(f)}”. ${f.split(" ").filter(c => c === "·").length > 1 ? "İki kısa heceyle başlar." : `Kısa hece ${["başta", "ikinci sırada", "üçüncü sırada", "sonda"][yer]}.`}`);
    }
    const sik = karistir([v, ...karistir(V.filter(x => x.id !== v.id && x.feet.join() !== v.feet.join())).slice(0, 3)]);
    secenekli("Bu ritim hangi kalıp?", `<p>Ritmi dinleyin; ilk kümede uzunları ve kısaları sayın, sonra kalıbını seçin.</p><div class="calar"><button class="cal-dugme" data-kalip="${v.id}" aria-label="Ritmi dinle">${OYNA}</button><span>Ritmi dinleyin</span></div>`,
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

/* ——— vuruş: ritmi elle vurarak tartma ———
   Her heceye bir vuruş. İki vuruş arasındaki süre, önceki hecenin ağırlığıdır:
   kısa 1, uzun 2, medli 3 birim. Son hecenin süresi ölçülemez; serbesttir. */
const TEFH = { "— · — —": ["Fâ", "‘i", "lâ", "tün"], "— · —": ["Fâ", "‘i", "lün"], "· — — —": ["Me", "fâ", "‘î", "lün"], "— — ·": ["Mef", "‘û", "lü"], "· — — ·": ["Me", "fâ", "‘î", "lü"], "· — —": ["Fe", "‘û", "lün"], "— · — ·": ["Fâ", "‘i", "lâ", "tü"], "· · — —": ["Fe", "‘i", "lâ", "tün"], "· · —": ["Fe", "‘i", "lün"], "· — · —": ["Me", "fâ", "‘i", "lün"], "— —": ["Fa‘", "lün"] };
const hecelerF = feet => feet.flatMap(f => TEFH[f] || f.split(" ").map(x => x === "—" ? "dan" : "di"));
const Tik = (() => {
  let c = null;
  return guc => { try { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; c = c || new AC(); if (c.state === "suspended") c.resume(); const t = c.currentTime, o = c.createOscillator(), g = c.createGain(); o.type = "triangle"; o.frequency.setValueAtTime(560, t); o.frequency.exponentialRampToValueAtTime(320, t + 0.07); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.42 * (guc || 1), t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11); o.connect(g).connect(c.destination); o.start(t); o.stop(t + 0.13); } catch (e) { } };
})();
function vurusOlc(zaman, bek) {
  const ar = zaman.slice(1).map((t, i) => t - zaman[i]), eb = bek.slice(0, -1);
  const sinif = x => x < 1.5 ? 1 : x < 2.55 ? 2 : 3;
  const dene = u => { const r = ar.map(x => x / u), ok = r.map((x, i) => sinif(x) === eb[i] || Math.abs(x - eb[i]) < 0.4); return { u, r, ok, say: ok.filter(Boolean).length, hata: r.reduce((a, x, i) => a + (x - eb[i]) ** 2, 0) }; };
  const aday = [ar.reduce((a, b) => a + b, 0) / eb.reduce((a, b) => a + b, 0), ...ar.map((x, i) => x / eb[i])];
  return aday.map(dene).sort((a, b) => b.say - a.say || a.hata - b.hata)[0];
}
const virgul = (x, n = 1) => x.toFixed(n).replace(".", ",");
function vurusKur(el, o) {
  const dz = o.dizi, n = dz.length, bek = dz.map(x => x.b); let vur = [], bitti = false, deneme = 0;
  const gr = []; dz.forEach((x, i) => (gr[x.ayak] = gr[x.ayak] || []).push(i));
  const ilkSoz = `${n} hece, ${n} vuruş. Kısa heceden sonra bir, uzun heceden sonra iki birim bekleyin.`;
  el.innerHTML = `<div class="vurus"><div class="v-heceler">${gr.map(g => `<span class="v-ayak">${g.map(i => `<span class="v-h" data-i="${i}"><span class="is">${isaret(bek[i] === 3 ? "—·" : bek[i] === 2 ? "—" : "·")}</span><span class="yz">${esc(o.yazilar[i])}</span></span>`).join("")}</span>`).join("")}</div>
    <div class="v-olcu"><span>Kalıbın ölçüsü</span><div class="v-cubuk">${bek.map(b => `<i class="${b === 1 ? "k" : b === 3 ? "m" : ""}" style="--b:${b}"></i>`).join("")}</div></div>
    <div class="v-olcu"><span>Sizin vuruşunuz</span><div class="v-cubuk v-sizin"><i class="v-bos" style="--b:1"></i></div></div>
    <div class="v-eylem"><button class="v-pad" data-vpad type="button" aria-label="Vur"><b>Vur</b><small>buraya dokunun</small></button>
      <div class="v-yan"><div class="calar"><button class="cal-dugme kucuk" data-vdinle type="button" aria-label="Ritmi dinle">${OYNA}</button><span>Önce dinleyin</span></div>
        <p class="v-sonuc" aria-live="polite">${ilkSoz} <span class="v-klavye">Klavyede boşluk tuşu da olur.</span></p>
        <button class="dugme dugme-cizgi dugme-kucuk gizli" data-vbastan type="button">Bir daha vurun</button></div></div></div>`;
  const pad = $("[data-vpad]", el), son = $(".v-sonuc", el), sizin = $(".v-sizin", el), hs = $$(".v-h", el), bastan = $("[data-vbastan]", el), dinle = $("[data-vdinle]", el);
  const sifir = () => { vur = []; bitti = false; hs.forEach(h => h.classList.remove("vuruldu", "d", "y", "calan")); sizin.innerHTML = `<i class="v-bos" style="--b:1"></i>`; son.className = "v-sonuc"; bastan.classList.add("gizli"); pad.classList.remove("bitti"); };
  const bitir = () => {
    bitti = true; deneme++; const s = vurusOlc(vur, bek);
    sizin.innerHTML = s.r.map((x, i) => `<i class="${s.ok[i] ? "d" : "y"}" style="--b:${Math.min(4, Math.max(0.45, x)).toFixed(2)}"></i>`).join("") + `<i class="son" style="--b:${bek[n - 1]}"></i>`;
    hs.forEach((h, i) => { h.classList.remove("vuruldu"); h.classList.add(i === n - 1 || s.ok[i] ? "d" : "y"); });
    const kisa = s.r.filter((x, i) => bek[i] === 1), uzun = s.r.filter((x, i) => bek[i] === 2), ort = a => a.reduce((x, y) => x + y, 0) / a.length;
    const oran = kisa.length && uzun.length ? ort(uzun) / ort(kisa) : 0, sure = (vur[n - 1] - vur[0]) / 1000;
    const yanlis = s.ok.map((d, i) => d ? null : i).filter(i => i !== null), tam = !yanlis.length;
    if (tam) { son.className = "v-sonuc iyi"; son.textContent = `Ölçüsünde. ${oran ? `Uzun heceleriniz kısaların ${virgul(oran)} katı sürdü; ölçü 2 kattır. ` : ""}Mısrayı ${virgul(sure)} saniyede vurdunuz.`; }
    else { const soz = yanlis.slice(0, 3).map(i => `“${o.yazilar[i]}” ${s.r[i] < bek[i] ? "kısa" : "uzun"} kaldı`).join(", "); son.className = "v-sonuc kotu"; son.textContent = `${n} heceden ${yanlis.length} tanesi ölçüsüne oturmadı: ${soz}${yanlis.length > 3 ? " ve başkaları" : ""}. Alttaki çubuğu üsttekiyle karşılaştırın, bir daha vurun.`; }
    bastan.classList.remove("gizli"); pad.classList.add("bitti");
    if (o.bitti) o.bitti(tam, deneme);
  };
  const vurus = () => {
    const t = performance.now(); Ses.dur();
    if (bitti || (vur.length && t - vur[vur.length - 1] > 3200)) sifir();
    vur.push(t); Tik(bek[vur.length - 1] >= 2 ? 1 : 0.8);
    const h = hs[vur.length - 1]; if (h) h.classList.add("vuruldu");
    pad.classList.remove("nabiz"); void pad.offsetWidth; pad.classList.add("nabiz");
    if (vur.length === 1) { son.className = "v-sonuc"; son.textContent = "Devam edin; her heceye bir vuruş."; }
    if (vur.length === n) bitir();
  };
  pad.addEventListener("pointerdown", e => { e.preventDefault(); pad.focus({ preventScroll: true }); vurus(); });
  pad.addEventListener("keydown", e => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); vurus(); } });
  pad.addEventListener("contextmenu", e => e.preventDefault());
  bastan.addEventListener("click", () => { sifir(); son.textContent = ilkSoz; pad.focus({ preventScroll: true }); });
  dinle.addEventListener("click", () => {
    if (dinle.dataset.durum === "caliyor") { Ses.dur(); return; }
    sifir(); dinle.innerHTML = DUR; dinle.dataset.durum = "caliyor";
    Ses.cal(dz, { adim: i => { hs.forEach(h => h.classList.remove("calan")); if (hs[i]) hs[i].classList.add("calan"); }, bitti: () => { dinle.innerHTML = OYNA; dinle.dataset.durum = ""; hs.forEach(h => h.classList.remove("calan")); } });
  });
}
const vurusSatir = (el, ln, o = {}) => vurusKur(el, Object.assign({ dizi: diziSatir(ln), yazilar: ln.syl.map(s => s.t) }, o));
const vurusKalip = (el, feet, o = {}) => vurusKur(el, Object.assign({ dizi: diziKalip(feet), yazilar: hecelerF(feet) }, o));

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
    el.innerHTML = `<p class="kutu-bas">Aynı iş, iki ölçü</p><div class="saytart"><div><h4>Hece vezni sayar</h4><p class="mini">${esc(y.sair)} · 42. beyit</p><div class="sayilar">${yl.syl.map((s, i) => `${i === 5 ? '<span class="durak"></span>' : ""}<span class="sh"><b>${i < 5 ? i + 1 : i - 4}</b><span>${esc(s.t)}</span></span>`).join("")}</div><p class="sonuc">5 + 5 = <em>10 hece</em></p></div>
      <div><h4>Aruz tartar</h4><p class="mini">${esc(m.sair)} · 6. beyit</p><div class="sayilar">${ml.syl.map(s => `<span class="sh ${s.v === "·" ? "k" : "u"}"><b>${birimS(s)}</b><span>${esc(s.t)}</span></span>`).join("")}</div><p class="sonuc">${ml.syl.length} hece, <em>${top} birim</em></p></div></div>`;
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
      ["4 · Kalıbını bul", `Kümelerin adını koyun: ${ln.feet.map(f => TEF[f]).join(" · ")}. Toplam ${ln.feet.map(birimF).join(" + ")} = ${ln.syl.reduce((a, s) => a + birimS(s), 0)} birim. “de” hecesi imâleyle uzar; mısranın son hecesi “bi” ise her zaman uzun sayılır.`]];
    el.innerHTML = `<p class="kutu-bas">6. beyit · ${esc(b.sair)} · adım adım</p><div class="adimci">${A.map((a, i) => `<button data-a="${i + 1}" aria-pressed="${i === 0}">${a[0]}</button>`).join("")}</div><div class="adim-govde ad-1">${taktiHTML(ln, { kucuk: true })}</div><p class="adim-aciklama">${A[0][1]}</p>${calarHTML({ kucuk: true })}`;
    const g = $(".adim-govde", el); $$(".adimci button", el).forEach(bt => bt.addEventListener("click", () => { $$(".adimci button", el).forEach(x => x.setAttribute("aria-pressed", String(x === bt))); g.className = "adim-govde ad-" + bt.dataset.a; $(".adim-aciklama", el).textContent = A[bt.dataset.a - 1][1]; }));
    calarKur(el, () => [ln]);
  },
  bulucu(el) {
    const gr = {}; V.forEach(v => (gr[v.feet[0]] = gr[v.feet[0]] || []).push(v)); const yuk = f => gr[f].reduce((a, v) => a + v.beyitler.length, 0), ks = Object.keys(gr).sort((a, b) => yuk(b) - yuk(a));
    const NOTLAR = { "— · — —": "Dikkat: fe‘ilâtün kalıbı da çoğu zaman fâ‘ilâtün ile başlar. İkinci kümeye bakın; iki kısa heceyle başlıyorsa kalıp fe‘ilâtündür.", "· · — —": "İki kısa heceyle başlayan tek kalıp budur; ilk tef’ilesi fâ‘ilâtün olarak da gelebilir.", "— — ·": "Ayrım ikinci kümededir: kısayla mı başlıyor, uzunla mı; sonu nasıl bitiyor?" };
    el.innerHTML = `<p class="kutu-bas">Mısra nasıl başlıyor?</p><div class="adimci">${ks.map((f, i) => `<button data-b="${i}" aria-pressed="${i === 0}"><span class="kalip-f acik">${f.split(" ").map(x => `<i class="${x === "—" ? "u" : "k"}"></i>`).join("")}</span>${TEF[f]}</button>`).join("")}</div><div class="bulucu-govde"></div>`;
    const g = $(".bulucu-govde", el), ciz = i => { const f = ks[i], l = gr[f]; g.innerHTML = `<p class="adim-aciklama">${l.length === 1 ? "Bu başlangıç kitapta tek bir kalıba çıkar." : `Bu başlangıç ${l.length} kalıba çıkar.`} ${NOTLAR[f] || ""}</p><div class="bulucu-liste">${l.map(v => `<div class="bulucu-satir"><button class="cal-dugme kucuk" data-kalip="${v.id}" aria-label="${v.ad} ritmini dinle">${OYNA}</button><span><a href="#/vezin/${v.id}"><b>${v.ad}</b></a><span class="kal">${kalipHTML(v.feet, true)}</span>${l.length > 1 ? `<small>ikinci küme: ${TEF[v.feet[1]]} · ${agizF(v.feet[1])}</small>` : ""}</span><span class="sayi">${v.beyitler.length} beyit</span></div>`).join("")}</div>`; };
    $$(".adimci button", el).forEach(bt => bt.addEventListener("click", () => { Ses.dur(); $$(".adimci button", el).forEach(x => x.setAttribute("aria-pressed", String(x === bt))); ciz(+bt.dataset.b); })); ciz(0);
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
const DRESIM = { "saymak-ve-tartmak": 6, "hecenin-agirligi": 13, "tefile": 9, "kalip": 12, "ulama": 1, "imale-ve-zihaf": 51, "med": 14, "takti": 22, "daire": 25, "ahenk": 26 };
const OYNA_K = OYNA.replace("<svg", '<svg width="14" height="14" fill="currentColor"');
const siradakiDers = () => DERSLER.find(d => !Kayit.d.ders[d.id]) || DERSLER[0];
const SOZLUK = [
  ["Aruz", "Hecelerin sayısına değil, uzunluk ve kısalığına dayanan şiir ölçüsü. Arap şiirinde ortaya çıkmış, Fars ve Türk şiirine geçmiştir.", "saymak-ve-tartmak"],
  ["Vezin", "Şiirin ölçüsü. Kelime “tartı” demektir; Hocamızın sözüyle hece vezni sayar, aruz vezni tartar.", "saymak-ve-tartmak"],
  ["Hece vezni", "Mısralardaki hece sayısının eşitliğine dayanan ölçü. Kitaptaki 42. beyit bu vezinledir.", "saymak-ve-tartmak"],
  ["Mısra, beyit", "Mısra şiirin bir satırıdır; aynı vezindeki iki mısra bir beyit eder.", null],
  ["Açık hece", "Sesli harfle biten hece. Seslisi kısaysa kısa (1 birim), uzunsa uzun (2 birim) sayılır.", "hecenin-agirligi"],
  ["Kapalı hece", "Sessiz harfle biten hece. Uzun sayılır (2 birim).", "hecenin-agirligi"],
  ["Birim", "Bu sitede hecenin ağırlığını saymak için kullanılan ölçü: kısa hece 1, uzun hece 2, medli hece 3 birim. Eski kitapların terimi değildir; hesabı kolaylaştırmak içindir.", "saymak-ve-tartmak"],
  ["Tef’ile", "Uzun ve kısa hecelerin belli bir sırayla kümelenmesinden meydana gelen ritim hücresi: fâ‘ilâtün, mefâ‘îlün gibi. Adını söylemek ritmini söylemektir.", "tefile"],
  ["Kalıp", "Tef’ilelerin art arda dizilmesiyle kurulan mısra ölçüsü. Kitaptaki aruzlu beyitler sekiz kalıpla yazılmıştır.", "kalip"],
  ["Bahir", "Aynı tef’ileden kurulan kalıpların ailesi: remel, hezec, muzâri, müctes gibi.", "daire"],
  ["Taktî", "Mısrayı hecelerine ve tef’ilelerine ayırarak veznini bulma işi. Kelime “kesmek, parçalamak” demektir.", "takti"],
  ["Ulama (vasl)", "Sessizle biten kelimenin, sesliyle başlayan kelimeye bağlanarak okunması: acz olan, ac-zo-lan. Taktîde ‿ ile gösterilir.", "ulama"],
  ["İmâle", "Kısa (açık) bir hecenin vezin gereği uzun okunması. Hesapta +1 birim.", "imale-ve-zihaf"],
  ["Zihaf", "Yaygın kullanışta, uzun sesli bir hecenin vezin gereği kısa okunması; kusur sayılır. Eski kitaplarda tef’iledeki değişiklik için de kullanılır.", "imale-ve-zihaf"],
  ["İzafet kesresi", "Terkiplerde iki kelimeyi bağlayan -i / -ı sesi: kûy-ı mahbûb. Vezne göre kısa ya da uzun okunur.", "imale-ve-zihaf"],
  ["Med", "Uzun sesliden sonra sessiz gelen ya da iki sessizle biten hecenin, bir uzun ve bir kısa hece yerini tutması (3 birim).", "med"],
  ["Dâire", "Tef’ilelerin bir halka üzerinde gösterilmesi. Halkayı okumaya başladığınız yer değişince başka bir bahir çıkar.", "daire"],
  ["Darb, nağme", "Bu sitede ritmi duyuran iki ses. Darb vuruşla, nağme aynı hesabı basit bir ezgiyle verir. İkisi de okuyuş kaydı değildir; beytin asıl sesi Hocamızın okuyuşudur.", null]
];
const Sayfa = {
  giris() {
    const b6 = beyit(6), ln = b6.t[0], kayitli = B.filter(b => b.kayit).length, bitti = DERSLER.filter(d => Kayit.d.ders[d.id]).length, sd = siradakiDers(), tk = K.tartar;
    ana.innerHTML = `
    <section class="giris"><div class="giris-resim" style="background-image:url(img/06.webp)"></div><div class="kap">
      <div class="giris-metin"><p class="ust-yazi">Şair Ne Demek İstedi? kitabının aruz mektebi</p>
        <h1>Hece vezni sayar,<br><em>aruz vezni tartar.</em></h1>
        <p class="giris-imza">Hayati İnanç Hocamız</p>
        <p class="giris-lead">Aruzu Hocamızın ağzından, kitaptaki beyitlerle öğrenin. Önce dinleyin, sonra ritmini duyun, sonra kendi elinizle vurun.</p>
        <div class="giris-dugmeler"><button class="dugme dugme-altin dugme-buyuk" data-klip="tartar">${OYNA_K} Bu sözü Hocamızdan dinleyin${tk ? " · " + sure(tk.s, tk.e) : ""}</button><button class="metin-bag dugme-yalin" data-in="ilk">İlk mısrayla başlayın ↓</button></div>
      </div>
      <div class="canli" id="ilk">
        <div class="canli-ust"><p class="ust-yazi">İlk mısra · üç adım</p><p>6. beyit · ${esc(b6.sair)}</p></div>
        <p class="canli-misra">${misraHTML(b6.m[0])}</p>
        <div class="uc-adim" role="group" aria-label="Adımlar"><button data-adim="1" aria-pressed="true"><b>1</b>Dinleyin</button><button data-adim="2" aria-pressed="false"><b>2</b><span class="uz">Ritmini duyun</span><span class="ks">Duyun</span></button><button data-adim="3" aria-pressed="false"><b>3</b><span class="uz">Siz vurun</span><span class="ks">Vurun</span></button></div>
        <div class="adim-alan" id="adim-alan"></div>
      </div>
    </div></section>
    ${new URLSearchParams(location.search).has("kitap") ? `<section class="bolum kitaptan"><div class="kap kitaptan-ic">
      <div><p class="ust-yazi">Kitaptan geldiyseniz</p><h2>Hoş geldiniz.</h2>
        <p>Kitaptaki vezin işaretlerinin anahtarı: <b>çizgi</b> uzun hece, <b>nokta</b> kısa hece, <b>eğik çizgi</b> kalıbın parçalarını (tef’ileleri) ayırır. Bir beytin numarasını yazın; vezni, taktîi ve Hocamızın okuyuşuyla açılsın.</p>
        <p class="kitaptan-kardes">Tablolar ve bütün okuyuşlar için arka kapaktaki karekod: <a href="/52beyit/">raufenc.com/52beyit</a></p></div>
      <form class="bul" id="bul-kitap"><label for="bul-kitap-no">Beyit numarası</label><span class="bul-kutu"><input id="bul-kitap-no" type="number" min="1" max="52" inputmode="numeric" placeholder="1–52"><button>Beyti aç</button></span></form>
    </div></section>` : ""}
    <section class="bolum"><div class="kap">
      ${bolumBas("Yol", "Önce zevki, <em>sonra hesabı.</em>", "Hocamızın tavsiyesi bu sitenin usulüdür: şiirin tekniğinden önce lezzeti.")}
      <div class="adimlar dort">
        <a class="adim" href="#/beyitler"><span class="no">1</span><h3>Dinle</h3><p>${kayitli} beytin okuyuşu ve izahı Hocamızın sesinden; lügati ve bugünkü söyleyişi yanında.</p><span class="metin-bag">52 beyit <span class="ok">→</span></span></a>
        <a class="adim" href="#/beyit/6"><span class="no">2</span><h3>Tart</h3><p>Her beytin hece hece taktîi: uzun 2, kısa 1 birim. Ritmini darb ya da nağme olarak dinleyin.</p><span class="metin-bag">Bir beyit açın <span class="ok">→</span></span></a>
        <a class="adim" href="#/temrin"><span class="no">3</span><h3>Vur</h3><p>Ritmi elinizle vurun; vuruşunuz kalıbın ölçüsüyle yan yana çizilsin. Kulak böyle yerleşir.</p><span class="metin-bag">Temrine geçin <span class="ok">→</span></span></a>
        <a class="adim" href="#/ders/${sd.id}"><span class="no">4</span><h3>Öğren</h3><p>On kısa dersle aruz: hece, tef’ile, kalıp, ulama, imâle, med ve taktî.</p><span class="metin-bag">${bitti ? `${bitti} / 10 ders tamam` : "1. dersten başlayın"} <span class="ok">→</span></span></a>
      </div></div></section>
    <section class="bolum koyu"><div class="kap">
      ${bolumBas("Hocamızın ağzından", "“Zor mu? Değil. <em>Kulak meselesi.</em>”", "Hocamız sohbetlerinde vezni tef’ile ezberleterek değil, ritmini ağızla vurarak anlatır. Derslerin hepsi bu kayıtlar üzerine kuruldu.")}
      <div class="klipler">${["kulak", "kundak", "vezinahlaki"].map(k => klipHTML(k)).join("")}</div>
      <div style="margin-top:38px"><a class="dugme dugme-cizgi" href="#/dersler">Bütün dersler <span class="ok">→</span></a></div></div></section>
    <section class="bolum"><div class="kap">
      ${bolumBas("Kalıplar", "Sekiz ritim, <em>sekiz yürüyüş.</em>", "Kitaptaki beyitler sekiz aruz kalıbıyla yazılmıştır. Her birini dinleyin; uzun 2, kısa 1 birim.", `<a class="metin-bag" href="#/vezinler">Bütün vezinler <span class="ok">→</span></a>`)}
      <div class="vezinler acik">${V.slice(0, 4).map(v => vezinKart(v, true)).join("")}</div></div></section>
    <section class="bolum cizgili"><div class="kap">
      ${bolumBas("Kitaptan", "Her beyit <em>bir âlem.</em>", "", `<form class="bul" id="bul"><label for="bul-no">Kitap elinizde mi? Beyit numarası:</label><span class="bul-kutu"><input id="bul-no" type="number" min="1" max="52" inputmode="numeric" placeholder="1–52"><button>Beyti aç</button></span></form>`)}
      <div class="beyitler">${[1, 6, 9, 12, 22, 26].map(n => beyitKart(beyit(n))).join("")}</div>
      <div style="margin-top:34px"><a class="dugme dugme-cizgi" href="#/beyitler">52 beytin hepsi <span class="ok">→</span></a></div></div></section>
    <section class="bolum cizgili"><div class="kap kitap"><img src="/52beyit/kapak.webp?v=20261125" width="600" height="854" alt="Şair Ne Demek İstedi? kitabının kapağı" loading="lazy">
      <div><p class="ust-yazi">Kitap</p><h2>Şair Ne Demek İstedi?</h2><p class="kitap-alt">Resimlerle 52 Beyit</p><p>Hayati İnanç Hocamızın okuyuş ve izahlarından hareketle hazırlanan elli iki beyit, elli iki tablo. Fâilâtün, o kitabın aruz mektebidir: beyitleri dinler, veznini burada tartar, aruzu aynı beyitlerle öğrenirsiniz. Kitabın içindeki karekod buraya, arka kapaktaki karekod tabloların ve okuyuşların sitesine açılır.</p>
      <div class="giris-dugmeler"><a class="dugme dugme-asil" href="/52beyit/">Tablolar ve okuyuşlar: 52beyit <span class="ok">→</span></a><a class="dugme dugme-cizgi" href="#/hakkinda">Kaynaklar ve usul</a></div></div></div></section>`;
    const alan = $("#adim-alan"), top = ln.syl.reduce((a, s) => a + birimS(s), 0);
    const ac = k => {
      Ses.dur(); $$(".uc-adim button").forEach(x => x.setAttribute("aria-pressed", String(+x.dataset.adim === k)));
      if (k === 1) alan.innerHTML = `<p class="adim-soz">Önce beyti Hocamızın okuyuşundan dinleyin. Henüz hiçbir şeyi saymayın; yalnız yürüyüşüne kulak verin.</p><div class="giris-dugmeler"><button class="dugme dugme-asil" data-kayit="6">${OYNA_K} Hocamızdan dinleyin${b6.kayit ? " · " + sure(b6.kayit.s, b6.kayit.e) : ""}</button><button class="dugme dugme-cizgi" data-adim-git="2">Dinledim, devam <span class="ok">→</span></button></div>`;
      else if (k === 2) { alan.innerHTML = `<p class="adim-soz">Şimdi aynı mısranın yalnız ritmini dinleyin. Çizgi uzun hece, nokta kısa hece. Dört hecelik aynı küme tekrar ediyor: uzun, kısa, uzun, uzun. Adı <em>fâ‘ilâtün</em>.</p>${taktiHTML(ln)}${calarHTML()}<div class="canli-hesap"><span><b>${ln.syl.length}</b> hece</span><span><b>${ln.feet.map(birimF).join(" + ")} = ${top}</b> birim</span><button class="dugme dugme-cizgi dugme-kucuk" data-adim-git="3">Şimdi siz vurun <span class="ok">→</span></button></div>`; calarKur(alan, () => [ln]); }
      else { alan.innerHTML = `<p class="adim-soz">Sıra sizde. Her heceye bir vuruş: kısa heceden sonra hemen, uzun heceden sonra iki kat bekleyerek. Alttaki çubuk, vuruşunuzu kalıbın ölçüsüyle karşılaştırır.</p><div data-valan></div><div class="canli-hesap"><a class="metin-bag" href="#/ders/${sd.id}">${bitti ? "Derslere devam edin" : "1. derse geçin"} <span class="ok">→</span></a><a class="metin-bag" href="#/beyit/6">Beytin sayfası <span class="ok">→</span></a></div>`; vurusSatir($("[data-valan]", alan), ln); }
    };
    $("#ilk").addEventListener("click", e => { const g = e.target.closest("[data-adim],[data-adim-git]"); if (g) ac(+(g.dataset.adim || g.dataset.adimGit)); });
    ac(b6.kayit ? 1 : 2);
    $("[data-in]", ana).addEventListener("click", () => $("#ilk").scrollIntoView({ behavior: azHareket ? "auto" : "smooth", block: "start" }));
    $("#bul").addEventListener("submit", e => { e.preventDefault(); const n = +$("#bul-no").value; if (n >= 1 && n <= 52) location.hash = "#/beyit/" + n; });
    const bk = $("#bul-kitap"); if (bk) bk.addEventListener("submit", e => { e.preventDefault(); const n = +$("#bul-kitap-no").value; if (n >= 1 && n <= 52) location.hash = "#/beyit/" + n; });
  },
  beyitler() {
    const kayitli = B.filter(b => b.kayit).length;
    ana.innerHTML = `<div class="kap"><div class="sayfa-bas"><p class="ust-yazi">Kitap sırasıyla</p><h1>52 beyit, <em>52 âlem</em></h1><p>Elinizdeki kitabın beyitleri. ${kayitli} beytin okuyuşu Hocamızın sesinden; hepsinin taktîi, lügati ve bugünkü söyleyişi hazır.</p></div>
      <div class="suzgec"><input type="search" id="ara" placeholder="Beyit numarası, şair ya da kelime…" autocomplete="off" aria-label="Beyit ara"><button class="cip" id="sesli" aria-pressed="false">Hocamızın sesinden</button><select id="vsec" aria-label="Vezin"><option value="">Bütün vezinler</option>${V.map(v => `<option value="${v.id}">${v.ad}</option>`).join("")}<option value="hece">Hece vezni</option></select><span class="sayac" id="sayac" aria-live="polite"></span></div>
      <div class="beyitler" id="liste"></div><p class="bos gizli" id="bos">Bu aramada beyit bulunamadı.</p></div><div style="height:60px"></div>`;
    const ara = $("#ara"), ses = $("#sesli"), vs = $("#vsec");
    const ciz = () => { const q = sade(ara.value.trim()), s = ses.getAttribute("aria-pressed") === "true", v = vs.value; const r = B.filter(b => (!s || b.kayit) && (!v || b.vz === v) && (!q || (/^\d+$/.test(q) ? b.n === +q : sade([b.sair, ...b.m].join(" ")).includes(q)))); $("#liste").innerHTML = r.map(beyitKart).join(""); $("#bos").classList.toggle("gizli", r.length > 0); $("#sayac").textContent = `${r.length} beyit`; };
    ara.addEventListener("input", ciz); vs.addEventListener("change", ciz); ses.addEventListener("click", () => { ses.setAttribute("aria-pressed", String(ses.getAttribute("aria-pressed") !== "true")); ciz(); }); ciz();
  },
  beyit(n) {
    const b = beyit(n); if (!b) return Sayfa.beyitler(); const v = VZ[b.vz], i = B.indexOf(b), once = B[i - 1], sonra = B[i + 1], aruz = !!v, sd = siradakiDers();
    const say = k => b.t.reduce((a, ln) => a + ln.syl.filter(k).length, 0); const birim = b.t.map(ln => ln.syl.reduce((a, s) => a + birimS(s), 0));
    ana.innerHTML = `<div class="bs-resim" style="background-image:url(img/${iki(b.n)}.webp)"></div>
    <div class="kap bs-ust"><div class="bs-kart">
      <div class="bs-yol"><a href="#/beyitler">← Bütün beyitler</a><span class="bs-no">${b.n}. beyit</span></div>
      <h1 class="bs-beyit"><span>${misraHTML(b.m[0])}</span><span>${misraHTML(b.m[1])}</span></h1>
      <div class="bs-kunye"><b>${esc(b.sair)}</b>${aruz ? `<a href="#/vezin/${v.id}">${v.ad}</a><span>${v.bahir} bahri</span>` : `<span>Hece vezni · 5 + 5</span>`}</div>
      <div class="bs-eylem">${b.kayit ? `<button class="dugme dugme-altin dugme-buyuk" data-kayit="${b.n}">${OYNA_K} Hocamızdan dinleyin${sure(b.kayit.s, b.kayit.e) ? " · " + sure(b.kayit.s, b.kayit.e) : ""}</button>` : ""}<a class="dugme dugme-cizgi" href="/52beyit/#beyit-${b.n}">Tablosuyla 52beyit’te açın</a>${b.yazi ? `<a class="dugme dugme-cizgi" href="${esc(b.yazi)}" target="_blank" rel="noopener">Hocamızın yazısı ↗</a>` : ""}</div>
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
      <div class="sol">
        <section class="panel"><p class="ust-yazi">Bugünkü söyleyişle</p><p class="nesir">${esc(b.nesir)}</p><p class="kaynak" style="margin:16px 0 0">Beytin izahı ve tablosu <em>Şair Ne Demek İstedi?</em> kitabında, ${b.n}. beyittedir.</p></section>
        ${aruz ? `<section class="panel" id="vuruspanel"><p class="ust-yazi">Sıra sizde</p><h2>Mısrayı elinizle vurun</h2><p class="aciklama">Dinlediğiniz ritmi şimdi siz verin: her heceye bir vuruş. Vuruşunuz kalıbın ölçüsüyle yan yana çizilir.</p><div class="secim" role="group" aria-label="Mısra"><button data-vm="0" aria-pressed="true">1. mısra</button><button data-vm="1" aria-pressed="false">2. mısra</button></div><div data-valan></div></section>` : ""}
      </div>
      <aside class="yan">
        <section class="panel"><p class="ust-yazi">Lügat</p><dl class="lugat">${b.lugat.map(([k, m]) => `<div><dt>${esc(k)}</dt><dd>${esc(m)}</dd></div>`).join("")}</dl></section>
        ${aruz ? `<section class="panel"><p class="ust-yazi">Bu beytin vezni</p><h3>${v.ad}</h3><p style="font-size:16px;color:var(--soluk)">${v.tanim}</p><p style="margin:0"><a class="metin-bag" href="#/vezin/${v.id}">Aynı vezindeki ${v.beyitler.length} beyit <span class="ok">→</span></a></p></section>` : ""}
        <a class="sonraki" href="#/ders/${sd.id}"><small>Aruzu baştan öğrenmek isterseniz</small><b>${DERSLER.indexOf(sd) + 1}. ders: ${sd.baslik}</b><span>Derse geçin <span class="ok">→</span></span></a>
      </aside></div>
      <nav class="gecis" aria-label="Önceki ve sonraki beyit">${once ? `<a href="#/beyit/${once.n}"><small>← ${once.n}. beyit · ${esc(once.sair)}</small><b>${esc(once.m[0])}</b></a>` : "<span></span>"}${sonra ? `<a href="#/beyit/${sonra.n}"><small>${sonra.n}. beyit · ${esc(sonra.sair)} →</small><b>${esc(sonra.m[0])}</b></a>` : "<span></span>"}</nav>
    </div><div style="height:50px"></div>`;
    if (aruz) {
      calarKur($("#taktipanel"), () => b.t);
      const va = $("#vuruspanel [data-valan]"), sec = m => { $$("#vuruspanel [data-vm]").forEach(x => x.setAttribute("aria-pressed", String(+x.dataset.vm === m))); vurusSatir(va, b.t[m]); };
      $$("#vuruspanel [data-vm]").forEach(x => x.addEventListener("click", () => sec(+x.dataset.vm))); sec(0);
    }
  },
  dersler() {
    const bitti = DERSLER.filter(d => Kayit.d.ders[d.id]).length, sd = siradakiDers();
    ana.innerHTML = `<div class="kap"><div class="sayfa-bas"><p class="ust-yazi">Fâilâtün · aruz dersleri</p><h1>On derste <em>aruz</em></h1><p>Her ders kısa bir izah, Hocamızın ağzından bir kayıt, kitaptan bir misal ve bir temrinden ibarettir. Hesabı basittir: kısa hece 1, uzun hece 2.</p>
      <div class="ders-yol"><a class="dugme dugme-asil" href="#/ders/${sd.id}">${bitti ? `${DERSLER.indexOf(sd) + 1}. dersten devam edin` : "1. dersten başlayın"} <span class="ok">→</span></a>${bitti ? `<div class="ilerleme" aria-hidden="true"><i style="width:${bitti * 10}%"></i></div><span>${bitti} / 10 ders tamam</span>` : ""}<a class="metin-bag" href="#/sozluk">Terimler sözlüğü</a></div></div>
      ${klipHTML("zevk", { yatay: true })}
      <div class="dersler" style="margin-top:26px">${DERSLER.map((d, i) => `<a class="dk${Kayit.d.ders[d.id] ? " bitti" : ""}" href="#/ders/${d.id}"><span class="no">${i + 1}</span><span><h3>${d.baslik}</h3><p>${d.ozet}</p></span><span class="durum" aria-label="${Kayit.d.ders[d.id] ? "tamamlandı" : ""}">✓</span></a>`).join("")}</div></div><div style="height:70px"></div>`;
  },
  ders(id) {
    const i = DERSLER.findIndex(d => d.id === id); if (i < 0) return Sayfa.dersler(); const d = DERSLER[i], once = DERSLER[i - 1], sonra = DERSLER[i + 1];
    ana.innerHTML = `<div class="ders-resim" style="background-image:url(img/${iki(DRESIM[d.id] || 6)}.webp)"></div><article class="ders"><header class="ders-bas"><a class="metin-bag" href="#/dersler" style="border:0;color:var(--soluk)">← Dersler</a><div class="no" style="margin-top:18px">${i + 1}. ders</div><h1>${d.baslik}</h1><p>${d.ozet}</p></header>${d.govde()}
      <div class="ders-son">${once ? `<a class="dugme dugme-cizgi" href="#/ders/${once.id}">← ${once.baslik}</a>` : "<span></span>"}${sonra ? `<a class="dugme dugme-asil" href="#/ders/${sonra.id}">${i + 2}. ders: ${sonra.baslik} <span class="ok">→</span></a>` : `<a class="dugme dugme-asil" href="#/beyitler">Beyitlere dön <span class="ok">→</span></a>`}</div></article>`;
    kurIcerik(ana, d.id);
  },
  vezinler() {
    ana.innerHTML = `<div class="kap"><div class="sayfa-bas"><p class="ust-yazi">Kalıplar</p><h1>Sekiz ritim, <em>sekiz yürüyüş</em></h1><p>Kitaptaki 51 aruzlu beyit bu sekiz kalıpla, bir beyit de hece vezniyle yazılmıştır. Her kalıbın hesabı yanında: tef’ilelerin ağırlığı ve toplam birim.</p></div>
      <div class="vezinler acik">${V.map(v => vezinKart(v, true)).join("")}</div>
      <div style="margin-top:40px">${klipHTML("ondakika", { yatay: true })}</div></div><div style="height:60px"></div>`;
  },
  vezin(id) {
    const v = VZ[id]; if (!v) return Sayfa.vezinler(); const rs = v.beyitler[0];
    ana.innerHTML = `<section class="vezin-bas">${rs ? `<div class="vb-resim" style="background-image:url(img/${iki(rs.n)}.webp)"></div>` : ""}<div class="kap"><a class="metin-bag" href="#/vezinler" style="border:0;color:#b9c2d6">← Bütün vezinler</a><p class="ust-yazi" style="margin-top:22px;color:var(--altin-2)">${v.bahir} bahri</p><h1>${v.ad}</h1><p class="ar" lang="ar">${v.ar}</p>
      <div class="buyuk-kalip" id="bk">${v.feet.map((f, i) => `<div class="bf"><div class="sr">${f.split(" ").map(x => `<i class="${x === "—" ? "u" : "k"}"></i>`).join("")}</div><b>${v.tef[i]}</b><small>${agizF(f)} · ${v.b[i]}</small></div>`).join("")}</div>
      <div class="calar" style="margin:20px 0 26px"><button class="cal-dugme" data-kalip="${v.id}" data-hedef="#bk" data-tekrar="2" aria-label="Ritmi dinle" style="background:linear-gradient(180deg,#e2bd72,#c6963f);color:#2a1c06">${OYNA}</button><span>Ritmi iki mısra dinleyin</span><span class="secim" role="group"><button data-mod="darb" aria-pressed="${Kayit.d.ayar.mod === "darb"}">Darb</button><button data-mod="nagme" aria-pressed="${Kayit.d.ayar.mod === "nagme"}">Nağme</button></span></div>
      <p>${v.tanim}</p>
      <div class="hesap" style="max-width:640px"><div><b>${v.b.join("+")}</b><span>toplama</span></div><div><b>${v.top}</b><span>birim</span></div><div><b>${v.hece}</b><span>hece</span></div><div><b>${v.beyitler.length}</b><span>beyit</span></div></div></div></section>
      <section class="bolum bolum-dar"><div class="kap"><div class="panel vurus-panel"><p class="ust-yazi">Sıra sizde</p><h2>Bu ritmi elinizle vurun</h2><p class="aciklama">Tef’ilelerin adını içinizden heceleyerek vurun: her heceye bir vuruş, uzun heceden sonra iki kat bekleyiş.</p><div data-valan></div></div></div></section>
      ${v.klip.length ? `<section class="bolum cizgili"><div class="kap">${bolumBas("Hocamızın ağzından", "Bu vezni <em>Hocamızdan dinleyin</em>", "")}<div class="klipler${v.klip.length % 3 === 1 ? " ikili" : ""}">${v.klip.map(k => klipHTML(k)).join("")}</div></div></section>` : ""}
      <section class="bolum cizgili"><div class="kap">${bolumBas("Kitaptan", `Bu vezinde <em>${v.beyitler.length} beyit</em>`, "")}<div class="beyitler">${v.beyitler.map(beyitKart).join("")}</div></div></section>`;
    vurusKalip($("[data-valan]", ana), v.feet);
  },
  temrin(ilkTip) {
    const TIP = [["vurus", "Ritmi vur", ' data-tur="kalip"'], ["isaretle", "Heceleri tart", ' data-filtre="hepsi"'], ["kalip", "Kalıbı bul", ""], ["kulak", "Kulak", ""], ["aksak", "Aksayan hece", ""], ["birim", "Tef’ile hesabı", ' data-tur="tefile"'], ["kelime", "Kayıp kelime", ""]];
    const ilk = Math.max(0, TIP.findIndex(t => t[0] === ilkTip));
    ana.innerHTML = `<div class="kap kap-orta"><div class="sayfa-bas"><p class="ust-yazi">Temrin</p><h1>Tekrarla <em>yerleşir</em></h1><p>Yedi kısa temrin, hepsi kitaptaki beyitlerle. Yanlış yapınca bir daha deneyin; maksat kulağın ve elin alışmasıdır.</p></div>
      <div class="sekmeler" role="group" aria-label="Temrin türü">${TIP.map((t, i) => `<button data-t="${i}" aria-pressed="${i === ilk}">${t[1]}</button>`).join("")}</div><div id="talan"></div></div><div style="height:60px"></div>`;
    const ac = i => { const t = TIP[i]; $("#talan").innerHTML = `<div class="temrin" data-temrin="${t[0]}" data-adet="5"${t[2]}></div>`; temrinKur($("#talan .temrin")); };
    $$(".sekmeler button").forEach(b => b.addEventListener("click", () => { Ses.dur(); $$(".sekmeler button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); ac(+b.dataset.t); })); ac(ilk);
  },
  tart() {
    const ilk = girisMisra || "Korkma sönmez bu şafaklarda yüzen al sancak"; girisMisra = "";
    ana.innerHTML = `<div class="kap" style="max-width:900px"><div class="sayfa-bas"><p class="ust-yazi">Mısra tartısı</p><h1>Kendi mısranızı <em>tartın</em></h1><p>Bir ya da iki mısra yazın; kitaptaki sekiz kalıpla karşılaştıralım. Uzun seslileri şapkayla (â, î, û) yazarsanız tartı daha doğru çalışır.</p></div>
      <div class="tart-alan"><textarea id="tmisra" rows="2" maxlength="190" spellcheck="false" aria-label="Mısra">${esc(ilk)}</textarea><div class="giris-dugmeler" style="margin-top:14px"><button class="dugme dugme-asil" id="tartdugme">Tartıya koy</button><span class="tart-not">Bu bir ön incelemedir; şiirin bütünü hakkında hüküm vermez.</span></div></div>
      <div class="tart-sonuc" id="tsonuc" aria-live="polite"></div></div><div style="height:60px"></div>`;
    const yap = () => {
      const ms = $("#tmisra").value.split("\n").map(x => x.trim()).filter(Boolean).slice(0, 2); if (!ms.length) { $("#tsonuc").innerHTML = ""; return; }
      const r = V.map(v => { const ss = ms.map(m => Tart.coz(m, v.feet)); return ss.every(Boolean) ? { v, ss, c: ss.reduce((a, s) => a + s.c, 0) } : null; }).filter(Boolean).sort((a, b) => a.c - b.c);
      const say = (x, n) => x.ss.reduce((a, s) => a + s.syl.filter(h => h.n === n).length, 0);
      const guven = x => x.ss.every(s => !s.syl.some(h => h.n === "kusur") && s.syl.filter(h => h.n === "imale").length <= 4 && s.syl.filter(h => h.n === "zihaf").length <= 1);
      const iyi = r.filter(guven), zor = r.filter(x => !guven(x)), hep = [...iyi, ...zor];
      const kart = (x, sinif, ust) => `<div class="tart-kart${sinif}" data-tk="${hep.indexOf(x)}"><h3><a href="#/vezin/${x.v.id}" style="text-decoration:none">${x.v.ad}</a><small>${ust}${say(x, "imale")} imâle${say(x, "zihaf") ? " · zihaf var" : ""}${say(x, "kusur") ? " · zorlama var" : ""}</small></h3>${x.ss.map(s => taktiHTML(s, { kucuk: true })).join("")}${calarHTML({ kucuk: true })}</div>`;
      let h = "";
      if (iyi.length) { h = kart(iyi[0], " en-iyi", "en yakın kalıp · "); if (iyi.length > 1) h += `<details class="baska"><summary>Başka okuyuşlar (${Math.min(2, iyi.length - 1)})</summary>${iyi.slice(1, 3).map(x => kart(x, "", "")).join("")}</details>`; }
      else h = `<p class="bos">Bu mısra kitaptaki sekiz kalıptan hiçbirine zorlamasız oturmadı. Hece sayısına ve uzun seslilere bir daha bakın; başka bir kalıpla ya da hece vezniyle yazılmış olabilir.</p>` + (zor.length ? `<details class="baska"><summary>Zorlamayla en yakın kalıbı göster</summary>${kart(zor[0], "", "zorlamayla · ")}</details>` : "");
      $("#tsonuc").innerHTML = h;
      $$("[data-tk]").forEach(el => calarKur(el, () => hep[+el.dataset.tk].ss));
    };
    $("#tartdugme").addEventListener("click", yap); $("#tmisra").addEventListener("input", () => { $("#tsonuc").innerHTML = ""; }); yap();
  },
  sozluk() {
    ana.innerHTML = `<article class="ders"><header class="ders-bas"><a class="metin-bag" href="#/dersler" style="border:0;color:var(--soluk)">← Dersler</a><p class="ust-yazi" style="margin-top:18px">Terimler</p><h1>Aruz sözlüğü</h1><p>Derslerde geçen terimlerin kısa karşılıkları. Her biri, anlatıldığı derse bağlıdır.</p></header>
      <dl class="sozluk">${SOZLUK.map(([t, a, d]) => { const dr = d && DERSLER.find(x => x.id === d); return `<div><dt>${t}</dt><dd>${a}${dr ? ` <a class="metin-bag" href="#/ders/${d}">${DERSLER.indexOf(dr) + 1}. ders <span class="ok">→</span></a>` : ""}</dd></div>`; }).join("")}</dl>
      <div class="ders-son"><a class="dugme dugme-cizgi" href="#/dersler">← Dersler</a><a class="dugme dugme-asil" href="#/temrin">Temrine geçin <span class="ok">→</span></a></div></article>`;
  },
  hakkinda() {
    ana.innerHTML = `<article class="ders"><header class="ders-bas"><p class="ust-yazi">Kaynaklar ve usul</p><h1>Bu sayfa nasıl hazırlandı?</h1><p>Fâilâtün: Şair Ne Demek İstedi? kitabındaki beyitlerle aruz.</p></header>
      <h2>Beyitler</h2><p>Elli iki beytin metni, şairi ve vezni <em>Şair Ne Demek İstedi?</em> kitabından alınmıştır; kitaptaki sıra ve beyit numaraları korunmuştur. Resimler kitabın resimleridir. Beyitlerin şerhi kitabın kendisindedir.</p>
      <h2>Kayıtlar</h2><p>“Hocamızdan dinleyin” düğmeleri, Hayati İnanç Hocamızın o beyti okuyup izah ettiği sohbetin ilgili bölümünü açar. Aruz derslerindeki kayıtlar, Hocamızın vezinden bizzat bahsettiği bölümlerdir. Kayıtlar yayınlandıkları kanallarda durur; burada yalnız ilgili aralık gösterilir. Aralıklar yaklaşıktır; birkaç saniye erken ya da geç başlayabilir.</p>
      <h2>Taktî</h2><p>Her mısra hece hece tartılmış, kalıba oturtulmuş ve tek tek gözden geçirilmiştir. Ulama, imâle, zihaf ve med yerleri işaretlidir. Kitabın verdiği vezin esas alınmıştır. Lügat ve bugünkü söyleyişle verilen karşılıklar, kitaptaki şerhe bağlı kalınarak bu sayfa için hazırlanmıştır.</p>
      <h2>Ritim sesi</h2><p>“Ritmi dinle” düğmesi bir okuyuş kaydı değildir; kalıbın hesabını duyurmak için üretilen bir sestir. Kısa hece bir birim, uzun hece iki birim sürer. “Darb” vuruşla, “nağme” aynı hesabı basit bir ezgiyle verir. Beytin asıl sesi Hocamızın okuyuşudur.</p>
      <h2>Vuruş</h2><p>“Elinizle vurun” aracı mikrofon kullanmaz; yalnız dokunuşlarınızın arasındaki süreyi ölçer. İki vuruş arasındaki süre önceki hecenin ağırlığı sayılır ve kendi hızınıza göre değerlendirilir: uzun heceniz kısa hecenizin iki katı sürdüyse ölçüdesiniz. Son hecenin süresi ölçülmez. Hiçbir şey kaydedilmez.</p>
      <h2>Mısra tartısı</h2><p>Serbest tartı bir ön incelemedir: tek mısraya bakar, tarihî söyleyişi bilemez ve şiirin bütünü hakkında hüküm vermez. Ancak çok zorlamayla oturan mısraları “oturdu” diye göstermez.</p>
      <h2>Tashih</h2><p>Bir yanlış görürseniz haber verin: <a class="metin-bag" href="https://bir-beyit-bir-alem-tashih.someonebkr.chatgpt.site/#kapak=on" target="_blank" rel="noopener">tashih bırak ↗</a></p>
      <div class="ders-son"><a class="dugme dugme-cizgi" href="#/">← Giriş</a><a class="dugme dugme-asil" href="/52beyit/">Tablolar ve okuyuşlar: 52beyit <span class="ok">→</span></a></div></article>`;
  }
};

/* ——— yol ——— */
const ESKI = { kesfet: "#/", oyna: "#/temrin", ritimler: "#/vezinler", meclis: "#/beyitler", dersler: "#/dersler", laboratuvar: "#/tart", arsiv: "#/beyitler", ogretmen: "#/dersler", beyitler: "#/beyitler" };
const azHareket = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gozcu = !azHareket && "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("gor"); gozcu.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" }) : null;
function belirKur() { if (!gozcu) return; const esik = window.innerHeight * 0.94; $$(".bolum-bas,.adim,.klip,.vezin,.bk,.dk,.panel,.kitap>*,.kutu,.temrin,.formul,.kaide li,.sozluk>div", ana).forEach(el => { if (el.getBoundingClientRect().top > esik) { el.classList.add("bekle"); gozcu.observe(el); } }); }
let sonYol = "", ilkCizim = true;
function yol() {
  Ses.dur(); if (pencere.open) pencere.close();
  let h = location.hash || "#/";
  if (h === "#ana") { history.replaceState(null, "", location.pathname + location.search + (sonYol || "#/")); ana.focus(); return; }
  const eski = h.match(/^#beyit-(\d+)$/); if (eski) { location.replace("#/beyit/" + eski[1]); return; }
  if (!h.startsWith("#/")) { location.replace(ESKI[h.slice(1)] || "#/"); return; }
  const [, s, p] = h.split("/"), ad = Sayfa[s] ? s : "giris", arg = p ? decodeURIComponent(p) : undefined;
  const ciz = () => {
    Sayfa[ad](arg);
    const grup = { giris: "", beyit: "beyitler", ders: "dersler", vezin: "vezinler", sozluk: "dersler" }[ad] ?? ad;
    $$(".gezin a").forEach(a => a.getAttribute("href") === "#/" + grup ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    const T = { giris: "Fâilâtün · Hayati İnanç Hocamızın beyitleriyle aruz", beyitler: "52 beyit", dersler: "Aruz dersleri", vezinler: "Vezinler", temrin: "Temrin", tart: "Mısra tartısı", hakkinda: "Kaynaklar ve usul", sozluk: "Aruz sözlüğü" };
    let t = T[ad]; if (ad === "beyit" && beyit(p)) t = `${p}. beyit · ${beyit(p).sair}`; if (ad === "ders") { const d = DERSLER.find(x => x.id === p); if (d) t = d.baslik; } if (ad === "vezin" && VZ[p]) t = VZ[p].ad;
    document.title = (t && ad !== "giris" ? t + " · " : "") + (ad === "giris" ? T.giris : "Fâilâtün");
    window.scrollTo(0, 0); belirKur();
    if (!ilkCizim) ana.focus({ preventScroll: true });
    ilkCizim = false; sonYol = h;
  };
  if (!ilkCizim && !azHareket && document.startViewTransition) { const g = document.startViewTransition(ciz); [g.ready, g.finished, g.updateCallbackDone].forEach(x => x && x.catch(() => { })); } else ciz();
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
