// İyiliklerle Büyüyorum v2 — çocuk dostu, sesli, çevrimdışı çalışan site.
import { state, save, getPaint, listPaints, clearPaints } from './store.js';
import { icon } from './icons.js';
import * as au from './audio.js';
import { openStudio } from './paint.js';

const { esc, S, SS, splitSentences } = au;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const main = $('#main');
const BOOKS = [null,
  { id: 1, title: 'Rabbimi ve İbadetlerimi Seviyorum' },
  { id: 2, title: 'Güzel Ahlaklı Oluyorum' },
  { id: 3, title: 'Günlük Hayatımda Dinimi Yaşıyorum' }];
const pad = n => String(n).padStart(2, '0');
const pid = (b, p) => `b${b}-${pad(p)}`;
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3200); };
const persist = () => save(() => toast('İlerleme bu tarayıcıda saklanamıyor. Siteyi kullanmaya devam edebilirsin.'));
let interacted = false;
addEventListener('pointerdown', () => interacted = true, { capture: true, once: true });
addEventListener('keydown', () => interacted = true, { capture: true, once: true });
const guide = key => { if (state.sound && interacted) au.sayUI(key); };

// ---- veri ----
const bookCache = {}, lessons = [], byId = {};
async function loadBook(n) {
  if (!bookCache[n]) bookCache[n] = fetch(`data/book${n}.json`).then(r => { if (!r.ok) throw Error(r.status); return r.json(); }).then(list => {
    list.forEach(l => { byId[l.id] = l; lessons.push(l); }); lessons.sort((a, b) => a.book - b.book || a.n - b.n); return list;
  });
  return bookCache[n];
}
const loadAll = () => Promise.all([1, 2, 3].map(loadBook));
let srcCache;
const loadSources = () => srcCache ||= Promise.all([1, 2, 3].map(n => fetch(`data/book${n}-sources.json`).then(r => r.json()))).then(a => Object.fromEntries(a.flat().map(s => [s.id, s])));
const topicOfPage = (b, p) => lessons.find(l => l.book === b && l.pages.includes(p));
const art = l => pid(l.book, l.pages[1]);

// ---- yönlendirme ----
let cleanups = [], studio = null, token = 0;
const onLeave = fn => cleanups.push(fn);
function setMain(html) { main.innerHTML = html; main.scrollTop = 0; scrollTo(0, 0); }
const LEGACY = { ders: 'konu', agac: 'defter', buyukler: 'buyuk', kaynaklar: 'buyuk', karekod: 'buyuk', gizlilik: 'buyuk', home: 'home' };

async function route() {
  const my = ++token;
  cleanups.splice(0).forEach(f => { try { f(); } catch {} });
  main.onclick = null;
  studio?.destroy(); studio = null; au.stop();
  document.body.classList.remove('studio-on');
  let [name = 'home', a, b] = location.hash.slice(1).split('/').map(decodeURIComponent);
  if (name === 'boyama' && a) { // eski bağlantı: konu kimliğiyle boyama
    await loadAll(); const l = byId[a]; if (l) { location.replace(`#boya/${l.book}/${l.pages[1]}`); return; }
  }
  name = LEGACY[name] || name || 'home';
  $$('.nav a').forEach(x => x.removeAttribute('aria-current'));
  const sect = { home: 'home', kitap: 'home', sayfa: 'home', konular: 'konular', konu: 'konular', boya: 'boya', defter: 'defter', buyuk: 'buyuk' }[name];
  $(`.nav a[data-nav=${sect}]`)?.setAttribute('aria-current', 'page');
  try {
    const R = { home, kitap, sayfa, konular, konu, boya, defter, buyuk }[name] || home;
    await R(a, b, () => my === token);
  } catch (e) {
    console.error(e);
    if (my === token) setMain(`<div class="empty"><h2>Bir şey ters gitti</h2><p>İnternet bağlantını kontrol edip sayfayı yenile.</p><p><a class="btn" href="#home">Ana sayfa</a></p></div>`);
  }
  if (my === token && name !== 'boya') { main.focus({ preventScroll: true }); }
}
addEventListener('hashchange', route);
document.addEventListener('click', ev => {
  const say = ev.target.closest('[data-say]'); if (say) { au.sayUI(say.dataset.say); }
});

// ---- ana sayfa ----
async function home() {
  state.book = state.book || 0;
  let resume = '';
  if (state.last) { await loadAll(); const l = byId[state.last]; if (l) resume = `<a class="resume" href="#konu/${l.id}">${icon('play')}<span><small>Kaldığın yer</small>${esc(l.title)}</span></a>`; }
  setMain(`<section class="hero"><h1>İyiliklerle Büyüyorum</h1><p class="wrap-lead">Kitabını seç, sayfa numaranı yaz. Dinle, oyna, boya!</p>
    <button class="listen" data-say="hos">${icon('speaker')} Dinle</button></section>${resume}
    <div class="books">${[1, 2, 3].map(n => `<a class="bookcard" data-book="${n}" href="#kitap/${n}"><img src="assets/book${n}.webp" alt="" width="96" height="130" ${n > 1 ? 'loading="lazy"' : ''}><div><small>${n}. KİTAP</small><h2>${esc(BOOKS[n].title)}</h2><span class="go">Başla ›</span></div></a>`).join('')}</div>
    <p class="note">Hesap yok, reklam yok. Resimlerin ve ilerlemen yalnız bu cihazda saklanır.</p>`);
  guide('hos');
}

// ---- kitap: sayfa numarası tuş takımı ----
async function kitap(n) {
  n = +n; if (![1, 2, 3].includes(n)) return home();
  state.book = n; persist();
  let v = '';
  setMain(`<div data-book="${n}"><div class="bookhead"><img src="assets/book${n}.webp" alt="" width="76" height="103"><div><small>${n}. KİTAP</small><h1 style="font-size:24px">${esc(BOOKS[n].title)}</h1></div></div>
  <section class="ask" aria-labelledby="ask-h"><h2 id="ask-h">Kaçıncı sayfadasın?</h2>
    <div class="display ph" id="disp" role="status" aria-live="polite" aria-label="Yazdığın sayı">?</div>
    <div class="pad" role="group" aria-label="Sayı tuşları">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => `<button data-k="${d}">${d}</button>`).join('')}<button class="bs" data-k="bs" aria-label="Sil">${icon('backspace')}</button><button data-k="0">0</button><button class="go" data-k="go" aria-label="Tamam, sayfayı aç">${icon('check')}</button></div>
    <div class="msg" id="msg" role="alert"></div><button class="listen" data-say="tuslar">${icon('speaker')} Dinle</button></section>
  <div class="links"><a href="#konular/${n}">${icon('book')} Bu kitabın bütün konuları</a><a href="#boya/${n}">${icon('paint')} Boyama sayfaları</a></div></div>`);
  const disp = $('#disp'), msg = $('#msg');
  const show = () => { disp.textContent = v || '?'; disp.classList.toggle('ph', !v); msg.textContent = ''; };
  const press = k => {
    if (k === 'bs') { v = v.slice(0, -1); show(); return; }
    if (k === 'go') {
      const p = +v;
      if (!v || p < 1 || p > 48) { msg.textContent = 'Kitapta böyle bir sayfa yok. 1 ile 48 arasında bir sayı yaz.'; au.sayUI('sayfa-yok'); return; }
      location.hash = `#sayfa/${n}/${p}`; return;
    }
    if (v.length >= 2) return;
    if (v === '0') v = '';
    v += k; show(); au.sayUI('r' + k);
  };
  $('.pad').addEventListener('click', e => { const b = e.target.closest('button'); if (b) press(b.dataset.k); });
  const key = e => { if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('bs'); else if (e.key === 'Enter' && !e.target.closest('button,a')) press('go'); };
  addEventListener('keydown', key); onLeave(() => removeEventListener('keydown', key));
  if (state.sound && interacted) au.sayUIKeys([`kitap${n}`, 'tuslar']);
}

// ---- sayfa: konu + boyama ----
async function sayfa(b, p) {
  b = +b; p = +p; if (![1, 2, 3].includes(b) || !(p >= 1 && p <= 48)) return kitap(b);
  await loadBook(b);
  state.book = b; persist();
  const L = topicOfPage(b, p);
  setMain(`<div class="pageview" data-book="${b}"><small style="color:var(--accent);font-weight:900">${b}. KİTAP</small><h1>Sayfa ${p}</h1>
    <p class="wrap-lead" id="ptitle">${L ? `<span data-unit="title" data-q><span class="s" data-i="0">${esc(L.title)}</span></span>` : 'Bu sayfayı boyayabilirsin.'}</p>
    <img class="thumb" src="sayfa/${pid(b, p)}-t.webp" width="260" height="374" alt="Kitabındaki ${p}. sayfa">
    <div class="actions"><a class="btn" href="#boya/${b}/${p}">${icon('paint')} Bu sayfayı boya</a>${L ? `<a class="btn ghost" href="#konu/${L.id}">${icon('listen')} Konuyu dinle ve oyna</a>` : ''}</div>
    <div class="pager"><a class="ibtn" href="#sayfa/${b}/${Math.max(1, p - 1)}" aria-label="Önceki sayfa">${icon('back')}</a><a class="btn ghost small" href="#kitap/${b}">Başka sayfa</a><a class="ibtn" href="#sayfa/${b}/${Math.min(48, p + 1)}" aria-label="Sonraki sayfa">${icon('next')}</a></div></div>`);
  if (state.sound && interacted) {
    const A = L ? await au.lessonAudio(L.id) : null;
    await au.sayUI(`sayfa${p}`, ...(L ? [au.unitItem(A, L.id, 'title', $('[data-unit=title]'))] : [await tinyItem('sayfa-konusuz')]));
  }
}
const tinyItem = async k => ({ src: `ses/ui/${k}.mp3`, cues: null, root: null });

// ---- konular ----
async function konular(n) {
  n = +n || 0; await loadAll();
  let q = '';
  setMain(`<h1>Konular</h1><p class="wrap-lead">Bir konu seç. Resme dokununca açılır.</p>
    <div class="chips" role="group" aria-label="Kitap seç">${[0, 1, 2, 3].map(k => `<a class="chip" href="#konular/${k || ''}" ${k === n ? 'aria-current="true"' : ''}>${k ? k + '. kitap' : 'Hepsi'}</a>`).join('')}</div>
    <input class="search" type="search" id="q" placeholder="Konu ara…" aria-label="Konularda ara" autocomplete="off"><div class="grid" id="tg"></div>`);
  const draw = () => {
    const f = s => s.toLocaleLowerCase('tr').normalize('NFC');
    const list = lessons.filter(l => (!n || l.book === n) && (!q || f(l.title + ' ' + l.intro).includes(f(q))));
    $('#tg').innerHTML = list.map(l => `<a class="tcard" data-book="${l.book}" href="#konu/${l.id}"><div class="pic"><img loading="lazy" src="sayfa/${art(l)}-t.webp" alt="" width="260" height="374"></div><span class="badge pg">${l.book}. kitap · s.${l.pages.join('–')}</span>${state.completed[l.id] ? `<span class="badge" aria-label="Tamamlandı">★</span>` : ''}<b>${esc(l.title)}</b><small>Dinle · Oyna · Boya</small></a>`).join('') || '<div class="empty">Bu aramayla konu bulamadık.</div>';
  };
  $('#q').oninput = e => { q = e.target.value.trim(); draw(); };
  draw(); guide('konular');
}

// ---- ders ----
const STEPS = [['dinle', 'listen', 'Dinle'], ['hikaye', 'story', 'Hikâye'], ['oyun', 'game', 'Oyun'], ['soru', 'question', 'Soru'], ['gorev', 'heart', 'Görev']];
async function konu(id, step = 'dinle', alive) {
  await loadAll();
  const l = byId[id]; if (!l) return home();
  if (!STEPS.some(s => s[0] === step)) step = 'dinle';
  state.last = id; state.visits[id] = Date.now(); persist();
  const A = await au.lessonAudio(id);
  if (!alive()) return;
  const sIdx = STEPS.findIndex(s => s[0] === step);
  const bar = `<nav class="steps" aria-label="Adımlar">${STEPS.map(([k, ic, t]) => `<a class="step" href="#konu/${id}/${k}" ${k === step ? 'aria-current="step"' : ''}>${icon(ic)}${t}${k === 'gorev' && state.completed[id] ? '<span class="ok" aria-label="Tamamlandı">✓</span>' : ''}</a>`).join('')}</nav>`;
  const head = `<div data-book="${l.book}"><a class="mini" href="#konular/${l.book}" style="margin:0 0 10px">${icon('back')} Konular</a>
    <div class="lhead"><small>${l.book}. KİTAP · SAYFA ${l.pages.join('–')}</small><h1 data-unit="title" ${step === 'dinle' ? 'data-q' : ''}>${S(A, 'title', 0, l.title)}</h1></div>${bar}`;
  const spk = (u, t = 'Dinle') => `<button class="mini" data-play="${u}">${icon('speaker')} ${t}</button>`;
  let body = '';
  if (step === 'dinle') {
    body = `<div class="card"><p class="txt" data-unit="intro" data-q>${SS(A, 'intro', 0, l.intro)}</p>${spk('intro')}</div>
      ${l.learn.map((c, i) => `<article class="card" data-unit="learn${i}" data-q><h3><span class="num">${i + 1}</span>${S(A, `learn${i}`, 0, c.title)}</h3><p class="txt">${SS(A, `learn${i}`, 1, c.text)}</p>${spk(`learn${i}`, 'Bu kartı dinle')}</article>`).join('')}
      <h2 style="margin:20px 0 10px">Merak ediyorum</h2>
      ${l.deeper.map((c, i) => `<article class="card" data-unit="deeper${i}" data-q><h3>${S(A, `deeper${i}`, 0, c.q)}</h3><p class="txt">${SS(A, `deeper${i}`, 1, c.a)}</p>${spk(`deeper${i}`)}</article>`).join('')}`;
  } else if (step === 'hikaye') {
    const st = l.story, nS = splitSentences(st.scene).length;
    body = `<div class="card" data-unit="story" data-q><p class="txt">${SS(A, 'story', 0, st.scene, nS)}</p><h2 style="margin-top:12px">${SS(A, 'story', nS, st.question).replace(/^$/, esc(st.question))}</h2>${spk('story', 'Hikâyeyi dinle')}</div>
      <div id="opts">${st.options.map((o, i) => `<div class="optrow"><button class="choice" data-opt="${i}" data-unit="sopt${i}" data-q><span class="s" data-i="0">${esc(o.text)}</span></button><button class="ibtn sp" data-play="sopt${i}" aria-label="Seçeneği dinle">${icon('speaker')}</button></div>`).join('')}</div><div id="fb"></div>`;
  } else if (step === 'oyun') {
    body = `<div class="card" data-unit="game" data-q><p class="txt">${SS(A, 'game', 0, l.game.instruction)}</p>${spk('game')}</div><div id="game"></div>`;
  } else if (step === 'soru') {
    body = `<div class="dots" id="qd">${l.quiz.map(() => '<i></i>').join('')}</div><div id="quiz"></div>`;
  } else {
    const done = !!state.completed[id], page = l.pages[1];
    body = `<div class="task"><h3>Bugünkü görevin</h3><p class="txt" data-unit="task" data-q>${SS(A, 'task', 0, l.task)}</p>${spk('task')}
      <label class="check"><input type="checkbox" id="taskck" ${state.tasks[id] ? 'checked' : ''}> Görevi yaptım</label></div>
      <a class="btn" style="width:100%;margin-bottom:12px" href="#boya/${l.book}/${page}">${icon('paint')} Kitabımın ${page}. sayfasını boya</a>
      <div id="finish">${done ? `<div class="cele"><div class="stamp">★</div><h2>Bu konunun damgası sende!</h2></div>` : `<button class="btn" id="fin" style="width:100%">${icon('star')} Konuyu bitirdim, damgamı al</button>`}</div>
      <div class="sec">${nextPrev(l)}</div><p class="note"><a href="#buyuk/${id}" style="text-decoration:underline">${icon('lock', '')} Büyükler için bu konunun rehberi</a></p>`;
  }
  const hasPlay = ['dinle', 'hikaye', 'gorev'].includes(step);
  setMain(head + body + `</div>` + (hasPlay ? `<div style="height:84px" aria-hidden="true"></div><div class="dock" data-book="${l.book}"><button class="bigplay" id="bp" data-book="${l.book}">${icon('play')}<span>Bana oku</span></button></div>` : ''));
  // sesli okuma
  const root = u => $(`[data-unit="${u}"]`, main);
  const item = u => au.unitItem(A, id, u, root(u));
  main.onclick = ev => { const b = ev.target.closest('[data-play]'); if (b && root(b.dataset.play)) au.play([item(b.dataset.play)]); };
  const bp = $('#bp');
  if (bp) {
    const label = s => { bp.innerHTML = `${icon(s === 'playing' ? 'pause' : 'play')}<span>${s === 'playing' ? 'Duraklat' : s === 'paused' ? 'Devam et' : 'Bana oku'}</span>`; bp.setAttribute('aria-label', s === 'playing' ? 'Okumayı duraklat' : s === 'paused' ? 'Okumaya devam et' : 'Bana oku'); };
    onLeave(au.onState(s => label(s === 'loading' ? 'playing' : s)));
    bp.onclick = () => {
      const s = au.getState();
      if (s === 'playing' || s === 'paused') return au.toggle();
      au.play($$('[data-q]', main).map(e => item(e.dataset.unit)));
    };
  }
  if (step === 'hikaye') storyStep(l, A, item, root);
  if (step === 'oyun') gameStep(l, A, item);
  if (step === 'soru') quizStep(l, A, item, root);
  if (step === 'gorev') {
    $('#taskck').onchange = e => { state.tasks[id] = e.target.checked; persist(); };
    const fin = $('#fin');
    if (fin) fin.onclick = () => {
      state.completed[id] = Date.now(); persist();
      $('#finish').innerHTML = `<div class="cele"><div class="stamp">★</div><h2>Yeni bir damga kazandın!</h2><p class="txt">Keşif defterine eklendi.</p><a class="btn" href="#defter">${icon('star')} Defterime bak</a></div>`;
      au.sayUI('damga'); $('#finish').scrollIntoView({ block: 'center' });
    };
  }
  if (state.sound && interacted && step === 'dinle') au.sayUI('konu');
  else if (state.sound && interacted && step === 'oyun') au.sayUI(l.game.type === 'match' ? 'esles' : 'sirala');
}
function nextPrev(l) {
  const same = lessons.filter(x => x.book === l.book), i = same.findIndex(x => x.id === l.id);
  const p = same[i - 1], n = same[i + 1];
  return `${p ? `<a class="btn ghost small" href="#konu/${p.id}">${icon('back')} Önceki</a>` : '<span></span>'}${n ? `<a class="btn ghost small" href="#konu/${n.id}">Sonraki ${icon('next')}</a>` : '<a class="btn ghost small" href="#konular/' + l.book + '">Bütün konular</a>'}`;
}

function storyStep(l, A, item, root) {
  const fb = $('#fb');
  $('#opts').addEventListener('click', ev => {
    const c = ev.target.closest('.choice'); if (!c) return;
    const i = +c.dataset.opt, o = l.story.options[i];
    $$('.choice').forEach(x => x.classList.remove('try'));
    if (o.correct) { $$('.choice').forEach(x => x.classList.remove('good')); c.classList.add('good'); } else c.classList.add('try');
    fb.innerHTML = `<div class="fb ${o.correct ? '' : 'try'}" data-unit="sfb${i}">${SS(A, `sfb${i}`, 0, o.feedback)}</div>`;
    au.play([item(`sfb${i}`)]);
  });
}

function gameStep(l, A, item) {
  const g = l.game, box = $('#game');
  const cele = () => { box.insertAdjacentHTML('beforeend', `<div class="cele" style="margin-top:14px"><div class="big">🌟</div><h2>Aferin!</h2></div>`); au.sayUI('dogru'); };
  if (g.type === 'match') {
    const as = shuffle(g.pairs.map((p, i) => [i, p.a])), bs = shuffle(g.pairs.map((p, i) => [i, p.b]));
    box.innerHTML = `<div class="match"><div class="col" id="ca">${as.map(([i, t]) => `<button class="mi" data-side="a" data-p="${i}" data-unit="ga${i}"><span class="s" data-i="0">${esc(t)}</span></button>`).join('')}</div><div class="col" id="cb">${bs.map(([i, t]) => `<button class="mi" data-side="b" data-p="${i}" data-unit="gb${i}"><span class="s" data-i="0">${esc(t)}</span></button>`).join('')}</div></div>`;
    let sel = null, left = g.pairs.length;
    box.onclick = ev => {
      const b = ev.target.closest('.mi'); if (!b || b.classList.contains('done')) return;
      au.play([item(b.dataset.unit)]);
      if (!sel || sel.dataset.side === b.dataset.side) { sel?.classList.remove('sel'); sel = b; b.classList.add('sel'); return; }
      if (sel.dataset.p === b.dataset.p) {
        sel.classList.remove('sel'); sel.classList.add('done'); b.classList.add('done'); sel = null;
        if (--left === 0) setTimeout(cele, 900);
      } else {
        const o = sel; o.classList.remove('sel'); [o, b].forEach(x => { x.classList.add('try'); setTimeout(() => x.classList.remove('try'), 450); }); sel = null;
        setTimeout(() => au.sayUI('tekrar'), 700);
      }
    };
  } else {
    const items = shuffle(g.items.map((t, i) => [i, t])); let nxt = 0;
    box.innerHTML = `<div class="order">${items.map(([i, t]) => `<button class="mi" data-p="${i}" data-unit="go${i}"><span class="n">${''}</span><span class="s" data-i="0">${esc(t)}</span></button>`).join('')}</div>`;
    box.onclick = ev => {
      const b = ev.target.closest('.mi'); if (!b || b.classList.contains('done')) return;
      if (+b.dataset.p === nxt) {
        b.classList.add('done'); $('.n', b).textContent = ++nxt; au.play([item(b.dataset.unit)]);
        if (nxt === g.items.length) setTimeout(cele, 1200);
      } else { b.classList.add('try'); setTimeout(() => b.classList.remove('try'), 450); au.sayUI('tekrar'); }
    };
  }
}

function quizStep(l, A, item, root) {
  let i = 0; const dots = $$('#qd i');
  const draw = () => {
    if (i >= l.quiz.length) {
      $('#quiz').innerHTML = `<div class="cele"><div class="big">🌟</div><h2>Hepsini tamamladın!</h2><p class="txt">Şimdi görev adımına geçebilirsin.</p><a class="btn" href="#konu/${l.id}/gorev">${icon('next')} Göreve geç</a></div>`;
      dots.forEach(d => { d.className = 'd'; }); au.sayUI('bitti'); return;
    }
    dots.forEach((d, k) => d.className = k < i ? 'd' : k === i ? 'c' : '');
    const q = l.quiz[i], u = `q${i}`, nq = A?.[u]?.s ? A[u].s.filter(c => c.k !== 'o').length : splitSentences(q.question).length;
    $('#quiz').innerHTML = `<div class="card" data-unit="${u}"><h2 class="txt" style="font-size:23px">${SS(A, u, 0, q.question)}</h2>${q.options.map((o, j) => `<button class="choice" data-j="${j}" data-i="${nq + j}" style="margin:8px 0">${esc(o)}</button>`).join('')}<button class="mini" id="qplay">${icon('speaker')} Soruyu dinle</button></div><div id="qfb"></div>`;
    const r = () => root(u);
    $('#qplay').onclick = () => au.play([item(u)]);
    if (state.sound && interacted) au.play([item(u)]);
    let ok = false;
    $('#quiz .card').addEventListener('click', ev => {
      const c = ev.target.closest('.choice'); if (!c || ok) return;
      if (+c.dataset.j === q.answer) {
        ok = true; c.classList.add('good'); $$('.choice').forEach(x => { if (x !== c) x.disabled = true; });
        $('#qfb').innerHTML = `<div class="fb" data-unit="qx${i}">${SS(A, `qx${i}`, 0, q.explanation)}</div><button class="btn" id="qnext" style="width:100%">${i + 1 < l.quiz.length ? 'Sonraki soru' : 'Bitir'} ${icon('next')}</button>`;
        au.play([item(`qx${i}`)]);
        $('#qnext').onclick = () => { i++; draw(); };
      } else { c.classList.add('try'); setTimeout(() => c.classList.remove('try'), 450); au.sayUI('tekrar'); }
    });
  };
  draw();
}

// ---- boyama ----
async function boya(b, p) {
  if (b && p) return studioView(+b, +p);
  b = +b || state.book || 1;
  const painted = new Set((await listPaints()).map(x => x.id));
  setMain(`<h1>Boyama atölyesi</h1><p class="wrap-lead">Kitabındaki resimleri boya. Sayfayı seç.</p>
    <div class="chips">${[1, 2, 3].map(k => `<a class="chip" href="#boya/${k}" ${k === b ? 'aria-current="true"' : ''}>${k}. kitap</a>`).join('')}</div>
    <div class="grid" id="bg" style="grid-template-columns:repeat(3,1fr)">${Array.from({ length: 48 }, (_, k) => k + 1).map(p => `<a class="tcard" data-book="${b}" href="#boya/${b}/${p}" aria-label="Sayfa ${p}${painted.has(pid(b, p)) ? ', boyandı' : ''}"><img loading="lazy" src="sayfa/${pid(b, p)}-t.webp" alt="" width="260" height="374"><span class="badge pg">${p}</span>${painted.has(pid(b, p)) ? '<span class="badge" aria-hidden="true">🎨</span>' : ''}</a>`).join('')}</div>`);
  guide('boyalar');
}
async function studioView(b, p) {
  if (![1, 2, 3].includes(b) || !(p >= 1 && p <= 48)) return boya(b);
  state.book = b; persist();
  document.body.classList.add('studio-on');
  const mine = token;
  const s = await openStudio(main, { b, p, toast, say: k => au.sayUI(k) });
  if (mine !== token) { s.destroy(); return; }
  studio = s;
  if (state.sound && interacted) au.sayUI('boya');
}

// ---- keşif defteri ----
async function defter() {
  await loadAll();
  const paints = await listPaints(), urls = [];
  const done = lessons.filter(l => state.completed[l.id]).length;
  setMain(`<h1>Keşif defterim</h1><p class="wrap-lead">Her konuyu bitirince bir damga kazanırsın.</p>
    <div class="card"><b style="font-size:22px">${done} / 60 damga</b><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="60" aria-valuenow="${done}"><i style="width:${done / 60 * 100}%"></i></div><button class="listen" data-say="defter" style="margin-top:8px">${icon('speaker')} Dinle</button></div>
    ${[1, 2, 3].map(n => `<section data-book="${n}"><h2 style="margin:18px 0 10px">${n}. kitap</h2><div class="stamps">${lessons.filter(l => l.book === n).map(l => `<a class="st ${state.completed[l.id] ? 'on' : ''}" href="#konu/${l.id}" aria-label="${esc(l.title)}${state.completed[l.id] ? ', damga kazanıldı' : ''}">${l.n}</a>`).join('')}</div></section>`).join('')}
    <h2 style="margin:24px 0 10px">Boyadıklarım</h2>${paints.length ? `<div class="gal">${paints.sort((x, y) => y.t - x.t).map(x => { const u = URL.createObjectURL(x.thumb); urls.push(u); const [, bk, pg] = x.id.match(/b(\d)-(\d+)/); return `<a href="#boya/${bk}/${+pg}" aria-label="${bk}. kitap, sayfa ${+pg}"><img src="${u}" alt=""></a>`; }).join('')}</div>` : '<div class="empty">Henüz boyadığın bir resim yok. Boyama atölyesinde başlayabilirsin.</div>'}`);
  onLeave(() => urls.forEach(URL.revokeObjectURL));
  guide('defter');
}

// ---- büyükler ----
const GATE = 'iyilik-kapi';
// Kapı: yazıyla verilen çarpma (okul öncesi çocuk çözemez); sesli ipucu çözümü söylemez.
const SAYI = { 6: 'altı', 7: 'yedi', 8: 'sekiz', 9: 'dokuz' };
async function buyuk(id, _b, alive) {
  if (!sessionStorage.getItem(GATE)) return gate();
  await loadAll();
  if (id && byId[id]) return guideView(byId[id]);
  const src = await loadSources();
  const urls = [1, 2, 3].map(n => `https://raufenc.com/iyilik/${n}/`);
  setMain(`<h1>Büyükler için</h1><p class="wrap-lead">Çocuğunuzla birlikte kullanım rehberi, kaynaklar ve gizlilik.</p>
  <div class="pcard"><h2>Nasıl kullanılır?</h2><ul><li>Çocuk, kitabındaki sayfa numarasını yazar; o sayfanın konusunu dinler, oyun ve sorularla pekiştirir, resmi boyar.</li><li>Okumayı bilmeyen çocuk için her metin sesli okunur; okunan cümle ve kelime renkle gösterilir.</li><li>Her konunun “Büyükler için” rehberi, ne konuşulacağını, soracağınız iki soruyu ve evde yapılacak küçük bir iyiliği verir.</li></ul></div>
  <div class="pcard"><h2>Konu rehberleri</h2>${[1, 2, 3].map(n => `<h3 style="margin-top:12px">${n}. kitap · ${esc(BOOKS[n].title)}</h3><div class="plist">${lessons.filter(l => l.book === n).map(l => `<a href="#buyuk/${l.id}"><b>${l.n}.</b> ${esc(l.title)}<small>s. ${l.pages.join('–')}</small></a>`).join('')}</div>`).join('')}</div>
  <div class="pcard"><h2>Kitaptaki karekodlar</h2><p>Her cildin ön iç kapağındaki karekod, o kitabı bu sitede doğrudan açar. Adresler basılıdır ve değişmez.</p><div class="qrs">${[1, 2, 3].map(n => `<div><img src="assets/qr-book${n}.png" alt="${n}. cilt karekodu" width="130" height="130"><b>${n}. cilt</b><br>${urls[n - 1].replace('https://', '')}</div>`).join('')}</div></div>
  <div class="pcard"><h2>Çevrimdışı kullanım</h2><p>Site bir kez açıldıktan sonra gördüğünüz sayfalar internetsiz de çalışır. Bir cildin tamamını (resimler ve sesler) şimdiden cihaza indirebilirsiniz.</p><div class="row">${[1, 2, 3].map(n => `<button class="btn small ghost" data-warm="${n}">${n}. cildi indir</button>`).join('')}</div><p id="warmmsg" role="status" style="margin-top:8px"></p></div>
  <div class="pcard"><h2>Kaynakça</h2><p>Dinî açıklamalar çocuklara uygun özgün anlatımlardır; doğrudan âyet veya hadîs-i şerîf alıntısı olarak sunulmaz. İbadet uygulamalarındaki Hanefî çerçeve, diğer mezheplerin uygulamalarını geçersiz saymaz. Kaynakların listelenmesi kurumsal onay anlamına gelmez.</p>
   ${[1, 2, 3].map(n => `<details style="margin-top:8px"><summary style="min-height:48px;display:flex;align-items:center;font-weight:900;cursor:pointer">${n}. kitap kaynakları</summary>${[...new Set(lessons.filter(l => l.book === n).flatMap(l => l.sourceIds))].map(k => src[k]).filter(Boolean).map(s => `<div class="src"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><small>${esc(s.scope || '')}</small></div>`).join('')}</details>`).join('')}</div>
  <div class="pcard"><h2>Gizlilik</h2><p>Bu sitede üyelik, hesap, reklam, takip veya analiz yoktur. Çocuğunuzun ilerlemesi ve boyadığı resimler yalnızca bu cihazın tarayıcısında saklanır; hiçbir yere gönderilmez. Tarayıcı verilerini silerseniz bu kayıtlar da silinir.</p><button class="btn small danger" id="reset" style="margin-top:10px">Bu cihazdaki ilerlemeyi ve resimleri sil</button></div>`);
  $$('[data-warm]').forEach(b => b.onclick = () => warm(+b.dataset.warm, $('#warmmsg')));
  $('#reset').onclick = async () => {
    if (!confirm('Bu cihazdaki bütün damgalar ve boyanmış resimler silinecek. Emin misiniz?')) return;
    Object.assign(state, { completed: {}, tasks: {}, visits: {}, last: null }); persist(); await clearPaints(); toast('Silindi.');
  };
}
function gate() {
  const a = 6 + (Math.random() * 4 | 0), b = 6 + (Math.random() * 4 | 0), num = a * b;
  setMain(`<div class="gate"><div style="font-size:44px;color:var(--green)">${icon('lock')}</div><h1 style="font-size:28px">Büyükler bölümü</h1><p>Bu bölüm anne babalar içindir. Devam etmek için işlemin sonucunu rakamla yazın:</p>
    <p style="font-size:24px;font-weight:900;margin:6px 0 2px">${SAYI[a]} kere ${SAYI[b]}</p>
    <label for="wordin" class="sr-only">İşlemin sonucu</label><input id="wordin" inputmode="numeric" autocomplete="off" maxlength="2" style="margin-top:8px"><button class="btn small" id="wordgo" style="margin-top:10px">Gir</button><p class="msg" id="gmsg" role="alert"></p>
    <button class="listen" data-say="buyuk" style="margin-top:6px">${icon('speaker')} Dinle</button></div>`);
  const ok = () => { sessionStorage.setItem(GATE, '1'); route(); };
  const go = () => { if ($('#wordin').value.trim() === String(num)) ok(); else $('#gmsg').textContent = 'Sonuç doğru değil, tekrar deneyin.'; };
  $('#wordgo').onclick = go; $('#wordin').onkeydown = e => { if (e.key === 'Enter') go(); };
  guide('buyuk');
}
async function guideView(l) {
  const src = await loadSources(), f = l.family;
  const same = lessons.filter(x => x.book === l.book), i = same.findIndex(x => x.id === l.id), pv = same[i - 1], nx = same[i + 1];
  setMain(`<a class="mini" href="#buyuk" style="margin:0 0 10px">${icon('back')} Büyükler için</a><div data-book="${l.book}"><h1 style="font-size:28px">${esc(l.title)}</h1><p class="wrap-lead">${l.book}. kitap · sayfa ${l.pages.join('–')}</p></div>
  <div class="pcard" style="margin-top:14px"><h2>Bu sayfada ne konuşulur?</h2><p>${esc(f.guide)}</p></div>
  <div class="pcard"><h2>Çocuğa sorabilirsiniz</h2><ul>${f.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul></div>
  <div class="pcard"><h2>Evde küçük bir iyilik</h2><p>${esc(f.activity)}</p></div>
  <div class="pcard"><h2>Kitaptaki görev</h2><p>${esc(l.task)}</p></div>
  <div class="pcard"><h2>Dayanak kaynaklar</h2>${l.sourceIds.map(k => src[k]).filter(Boolean).map(s => `<div class="src"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><small>${esc(s.scope || '')}</small></div>`).join('')}</div>
  <div class="sec">${pv ? `<a class="btn ghost small" href="#buyuk/${pv.id}">${icon('back')} Önceki</a>` : '<span></span>'}<a class="btn small" href="#konu/${l.id}">Çocuk sayfasını aç</a>${nx ? `<a class="btn ghost small" href="#buyuk/${nx.id}">Sonraki ${icon('next')}</a>` : '<span></span>'}</div>`);
}
async function warm(n, out) {
  const urls = [];
  for (let p = 1; p <= 48; p++) ['c', 'b', 't'].forEach(k => urls.push(`sayfa/${pid(n, p)}-${k}.webp`));
  await loadBook(n);
  for (const l of lessons.filter(x => x.book === n)) {
    const A = await au.lessonAudio(l.id); urls.push(`ses/${l.id}.json`);
    if (A) Object.values(A).forEach(u => urls.push(`ses/${l.id}/${u.f}`));
  }
  let done = 0, fail = 0; const q = [...urls];
  const worker = async () => { while (q.length) { const u = q.shift(); try { const r = await fetch(u); if (!r.ok) fail++; await r.arrayBuffer(); } catch { fail++; } out.textContent = `${n}. cilt indiriliyor… ${++done} / ${urls.length}`; } };
  await Promise.all(Array.from({ length: 5 }, worker));
  out.textContent = fail ? `${n}. cilt indirildi, ${fail} dosya alınamadı. İnternet bağlantısını kontrol edip tekrar deneyin.` : `${n}. cilt cihaza indirildi.`;
}

// ---- kabuk ----
$('.skip').addEventListener('click', e => { e.preventDefault(); main.focus(); });
const snd = $('#snd');
function paintSnd() { snd.innerHTML = icon(state.sound ? 'speaker' : 'mute'); snd.setAttribute('aria-pressed', state.sound); snd.setAttribute('aria-label', state.sound ? 'Sesli ipuçları açık. Kapatmak için dokun.' : 'Sesli ipuçları kapalı. Açmak için dokun.'); }
snd.onclick = () => { state.sound = !state.sound; persist(); paintSnd(); if (!state.sound) au.stop(); toast(state.sound ? 'Sesli ipuçları açık' : 'Sesli ipuçları kapalı'); };
paintSnd();
$$('.nav a').forEach(a => { const i = a.querySelector('i'); if (i) i.outerHTML = icon(a.dataset.icon); });
document.addEventListener('keydown', e => { if (e.key === ' ' && e.target === document.body && au.getState() !== 'idle') { e.preventDefault(); au.toggle(); } });
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {}));
route();
