// İyiliklerle Büyüyorum v4 — kısa çocuk metni, Emmett sesi, boyama tebriki, sıcak ve sakin arayüz. Çevrimdışı çalışır.
import { state, save, getPaint, listPaints, clearPaints } from './store.js';
import { icon } from './icons.js';
import * as au from './audio.js';
import { openStudio } from './paint.js';
import { composeArt, shareOrDownload, idOf, parseId } from './galeri.js';
import { sfx } from './sfx.js';
import { TEBRIK } from './cele.js';

const { esc, S, SS, splitSentences } = au;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const main = $('#main');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const BOOKS = [null,
  { id: 1, title: 'Rabbimi ve İbadetlerimi Seviyorum' },
  { id: 2, title: 'Güzel Ahlaklı Oluyorum' },
  { id: 3, title: 'Günlük Hayatımda Dinimi Yaşıyorum' }];
const pad = n => String(n).padStart(2, '0');
const pid = (b, p) => `b${b}-${pad(p)}`;
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3400); };
const persist = () => save(() => toast('İlerleme bu tarayıcıda saklanamıyor. Siteyi kullanmaya devam edebilirsin.'));
let interacted = false;
addEventListener('pointerdown', () => interacted = true, { capture: true, once: true });
addEventListener('keydown', () => interacted = true, { capture: true, once: true });
const guide = key => { if (state.sound && interacted) au.sayUI(key); };
state.boyandi = state.boyandi && typeof state.boyandi === 'object' ? state.boyandi : {};

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
/** Çocuğa gösterilen ve okunan kısa metin (kid); yoksa asıl metin. Asıl metin Büyükler bölümünde durur. */
function K(l) {
  const k = l.kid || {};
  return {
    title: k.title || l.title, intro: k.intro || l.intro, task: k.task || l.task,
    story: { scene: k.story?.scene || l.story.scene, question: k.story?.question || l.story.question,
      options: l.story.options.map((o, i) => ({ ...o, text: k.story?.options?.[i]?.text || o.text, feedback: k.story?.options?.[i]?.feedback || o.feedback })) },
    game: { ...l.game, instruction: k.game?.instruction || l.game.instruction },
  };
}

// ---- yönlendirme ----
let cleanups = [], studio = null, token = 0, turn = '';
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
  const sect = { home: 'home', kitap: 'home', sayfa: 'home', canlan: 'home', konular: 'konular', konu: 'konular', boya: 'boya', resimler: 'boya', resim: 'boya', defter: 'defter', buyuk: 'buyuk' }[name];
  $(`.nav a[data-nav=${sect}]`)?.setAttribute('aria-current', 'page');
  try {
    const R = { home, kitap, sayfa, canlan, resimler, resim, konular, konu, boya, defter, buyuk }[name] || home;
    await R(a, b, () => my === token);
  } catch (e) {
    console.error(e);
    if (my === token) setMain(`<div class="empty"><h2>Bir şey ters gitti</h2><p>İnternet bağlantını kontrol edip sayfayı yenile.</p><p><a class="btn" href="#home">Ana sayfa</a></p></div>`);
  }
  if (my === token && name !== 'boya') { main.focus({ preventScroll: true }); }
}
// Sayfalar arası yumuşak geçiş (destekleyen tarayıcılarda), kapak → kitap geçişinde kapak büyüyerek açılır.
addEventListener('hashchange', () => {
  if (document.startViewTransition && !reduce && !document.body.classList.contains('studio-on')) document.startViewTransition(() => route());
  else route();
});
document.addEventListener('click', ev => {
  const say = ev.target.closest('[data-say]'); if (say) { au.sayUI(say.dataset.say); }
  if (!ev.target.closest('.studio,.pad') && ev.target.closest('a,button')) sfx.tap();
});

// ---- ana sayfa ----
const HILLS = `<div class="hills" aria-hidden="true"><svg viewBox="0 0 400 90" preserveAspectRatio="none"><path d="M0 58 C70 26 140 30 210 52 S330 74 400 40 V90 H0Z" fill="#d9e7c6"/><path d="M0 72 C90 48 170 62 250 70 S360 60 400 64 V90 H0Z" fill="#c4dbab"/><path d="M0 86 C120 74 260 80 400 84 V90 H0Z" fill="#fbf6ec"/></svg></div>`;
async function home() {
  let resume = '';
  if (state.last) { await loadAll(); const l = byId[state.last]; if (l) resume = `<a class="resume" data-book="${l.book}" href="#konu/${l.id}"><img src="sayfa/${art(l)}-t.webp" alt="" width="52" height="52"><span><small>Kaldığın yer</small>${esc(K(l).title)}</span><span class="go">${icon('play')}</span></a>`; }
  setMain(`<section class="hero"><div class="sunburst" aria-hidden="true"></div>
    <h1 style="position:relative">İyiliklerle<br>Büyüyorum</h1>
    <p class="lead" style="position:relative">Kitabını seç, sayfanı bul. Dinle, oyna, boya.</p>
    <p style="position:relative;margin-top:14px"><button class="listen" data-say="hos">${icon('speaker')} Dinle</button></p>
    <div class="fan" id="fan">${[1, 3, 2].map(n => `<a class="cover c${n}" href="#kitap/${n}" aria-label="${n}. kitap: ${esc(BOOKS[n].title)}" style="view-transition-name:cover${n}"><img src="assets/book${n}.webp" alt="" width="590" height="848" ${n === 2 ? 'fetchpriority="high"' : ''}></a>`).join('')}</div>
    ${HILLS}</section>
    ${resume}
    <div class="sec-h"><h2>Kitaplarım</h2></div>
    <div class="books">${[1, 2, 3].map(n => `<a class="bookrow" data-book="${n}" href="#kitap/${n}"><img src="assets/book${n}.webp" alt="" width="78" height="112" loading="lazy"><div><span class="eyebrow">${n}. kitap</span><h3>${esc(BOOKS[n].title)}</h3></div><span class="go">${icon('next')}</span></a>`).join('')}</div>
    <p class="note">Hesap yok, reklam yok. Resimlerin ve ilerlemen yalnız bu cihazda saklanır.</p>`);
  // kapaklarda çok hafif derinlik (kaydırınca ve fareyle)
  if (!reduce) {
    const fan = $('#fan'), cs = $$('.cover', fan);
    let raf = 0;
    const move = (dx, dy) => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => cs.forEach((c, i) => { const d = [1.4, 0.7, 1][i]; c.style.translate = `${dx * d}px ${dy * d}px`; })); };
    const onScroll = () => move(0, Math.min(40, scrollY * 0.18));
    const onPtr = e => { if (e.pointerType === 'mouse') move((e.clientX / innerWidth - .5) * 14, (e.clientY / innerHeight - .5) * 8); };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('pointermove', onPtr, { passive: true });
    onLeave(() => { removeEventListener('scroll', onScroll); removeEventListener('pointermove', onPtr); });
  }
  guide('hos');
}

// ---- kitap: sayfa numarası tuş takımı (yazdıkça sayfa önizlemesi) ----
async function kitap(n) {
  n = +n; if (![1, 2, 3].includes(n)) return home();
  state.book = n; persist();
  let v = '';
  setMain(`<div data-book="${n}"><div class="kband"><div class="blur" style="background-image:url(assets/book${n}.webp)"></div>
    <div class="in"><div class="cv" style="view-transition-name:cover${n}"><img src="assets/book${n}.webp" alt="" width="84" height="121"></div><div><span class="eyebrow">${n}. kitap</span><h1>${esc(BOOKS[n].title)}</h1></div></div></div>
  <section class="ask" aria-labelledby="ask-h"><h2 id="ask-h">Kaçıncı sayfadasın?</h2>
    <div class="disp"><div class="num ph" id="disp" role="status" aria-live="polite" aria-label="Yazdığın sayı">?</div><div class="peek" id="peek" aria-hidden="true"></div></div>
    <div class="pad" role="group" aria-label="Sayı tuşları">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => `<button data-k="${d}">${d}</button>`).join('')}<button class="bs" data-k="bs" aria-label="Sil">${icon('backspace')}</button><button data-k="0">0</button><button class="go" data-k="go" aria-label="Tamam, sayfayı aç">${icon('check')}</button></div>
    <div class="msg" id="msg" role="alert"></div><button class="listen" data-say="tuslar">${icon('speaker')} Dinle</button></section>
  <div class="links"><a href="#konular/${n}">${icon('book')} Bu kitabın konuları</a><a href="#boya/${n}">${icon('paint')} Boyama sayfaları</a></div></div>`);
  const disp = $('#disp'), msg = $('#msg'), peek = $('#peek');
  const show = () => {
    disp.textContent = v || '?'; disp.classList.toggle('ph', !v); msg.textContent = '';
    const p = +v, ok = v && p >= 1 && p <= 48;
    if (ok) peek.style.backgroundImage = `url(sayfa/${pid(n, p)}-t.webp)`;
    peek.classList.toggle('on', !!ok);
  };
  const press = k => {
    sfx.key();
    if (k === 'bs') { v = v.slice(0, -1); show(); return; }
    if (k === 'go') {
      const p = +v;
      if (!v || p < 1 || p > 48) { msg.textContent = 'Kitapta böyle bir sayfa yok. 1 ile 48 arasında bir sayı yaz.'; au.sayUI('sayfa-yok'); sfx.soft(); return; }
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

// ---- sayfa: kitabın sayfası, boya ve konu ----
async function sayfa(b, p) {
  b = +b; p = +p; if (![1, 2, 3].includes(b) || !(p >= 1 && p <= 48)) return kitap(b);
  await loadBook(b);
  state.book = b; persist();
  const L = topicOfPage(b, p), dir = turn; turn = '';
  setMain(`<div class="pageview" data-book="${b}">
    <div class="sheet ${dir}" id="sheet"><img src="sayfa/${pid(b, p)}-t.webp" width="260" height="374" alt="Kitabındaki ${p}. sayfa" draggable="false"></div>
    <div><span class="eyebrow">${b}. kitap · sayfa ${p}</span>
    <h1 id="ptitle">${L ? `<span data-unit="title" data-q><span class="s" data-i="0">${esc(K(L).title)}</span></span>` : `Sayfa ${p}`}</h1></div>
    <div class="actions"><a class="btn" href="#boya/${b}/${p}">${icon('paint')} Bu sayfayı boya</a>${L ? `<a class="btn ghost" href="#konu/${L.id}">${icon('listen')} Dinle ve oyna</a>` : ''}</div>
    <div class="pager"><a class="ibtn" data-turn="turn-r" href="#sayfa/${b}/${Math.max(1, p - 1)}" aria-label="Önceki sayfa">${icon('back')}</a><a class="btn ghost small" href="#kitap/${b}">Başka sayfa</a><a class="ibtn" data-turn="turn-l" href="#sayfa/${b}/${Math.min(48, p + 1)}" aria-label="Sonraki sayfa">${icon('next')}</a></div></div>`);
  main.onclick = e => { const t = e.target.closest('[data-turn]'); if (t) turn = t.dataset.turn; };
  // kaydırarak sayfa çevirme
  const sh = $('#sheet'); let x0 = null;
  sh.addEventListener('pointerdown', e => { x0 = e.clientX; });
  sh.addEventListener('pointerup', e => {
    if (x0 == null) return; const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) < 50) return;
    const np = dx < 0 ? Math.min(48, p + 1) : Math.max(1, p - 1); if (np === p) return;
    turn = dx < 0 ? 'turn-l' : 'turn-r'; location.hash = `#sayfa/${b}/${np}`;
  });
  if (state.sound && interacted) {
    const A = L ? await au.lessonAudio(L.id) : null;
    await au.sayUI(`sayfa${p}`, ...(L ? [au.unitItem(A, L.id, 'title', $('[data-unit=title]'))] : [{ src: 'ses/ui/sayfa-konusuz.mp3', cues: null, root: null }]));
  }
}

// ---- konular ----
async function konular(n) {
  n = +n || 0; await loadAll();
  let q = '';
  setMain(`<h1>Konular</h1><p class="lead" style="margin:4px 0 14px">Bir konu seç. Resme dokununca açılır.</p>
    <div class="chips" role="group" aria-label="Kitap seç">${[0, 1, 2, 3].map(k => `<a class="chip" href="#konular/${k || ''}" ${k === n ? 'aria-current="true"' : ''}>${k ? k + '. kitap' : 'Hepsi'}</a>`).join('')}</div>
    <input class="search" type="search" id="q" placeholder="Konu ara…" aria-label="Konularda ara" autocomplete="off"><div class="grid" id="tg"></div>`);
  const draw = () => {
    const f = s => s.toLocaleLowerCase('tr').normalize('NFC');
    const list = lessons.filter(l => (!n || l.book === n) && (!q || f(l.title + ' ' + K(l).intro + ' ' + l.intro).includes(f(q))));
    $('#tg').innerHTML = list.map(l => `<a class="tcard" data-book="${l.book}" href="#konu/${l.id}"><div class="pic"><img loading="lazy" src="sayfa/${art(l)}-t.webp" alt="" width="260" height="374"></div><span class="badge pg">${l.book}. kitap · s.${l.pages.join('–')}</span>${state.completed[l.id] ? `<span class="badge" aria-label="Tamamlandı">★</span>` : ''}<b>${esc(K(l).title)}</b><small>Dinle · Oyna · Boya</small></a>`).join('') || '<div class="empty">Bu aramayla konu bulamadık.</div>';
  };
  $('#q').oninput = e => { q = e.target.value.trim(); draw(); };
  draw(); guide('konular');
}

// ---- konu: dört kısa adım ----
const STEPS = [['dinle', 'listen', 'Dinle'], ['hikaye', 'story', 'Hikâye'], ['oyun', 'game', 'Oyun'], ['gorev', 'heart', 'Görev']];
const NEXT = { dinle: ['hikaye', 'Hikâyeye geç'], hikaye: ['oyun', 'Oyuna geç'], oyun: ['gorev', 'Göreve geç'] };
async function konu(id, step = 'dinle', alive) {
  await loadAll();
  const l = byId[id]; if (!l) return home();
  if (step === 'soru') step = 'oyun'; // eski adres
  if (!STEPS.some(s => s[0] === step)) step = 'dinle';
  state.last = id; state.visits[id] = Date.now(); persist();
  const A = await au.lessonAudio(id), k = K(l);
  if (!alive()) return;
  const bar = `<nav class="steps" aria-label="Adımlar">${STEPS.map(([s, ic, t]) => `<a class="step" href="#konu/${id}/${s}" ${s === step ? 'aria-current="step"' : ''}>${icon(ic)}${t}${s === 'gorev' && state.completed[id] ? '<span class="ok" aria-label="Tamamlandı">★</span>' : ''}</a>`).join('')}</nav>`;
  const title = `<span data-unit="title" ${step === 'dinle' ? 'data-q' : ''}>${S(A, 'title', 0, k.title)}</span>`;
  const head = step === 'dinle'
    ? `<div class="lhero"><div class="art"><img src="sayfa/${art(l)}-t.webp" alt="" width="260" height="374"></div><div class="cap"><span class="eyebrow">${l.book}. kitap · sayfa ${l.pages.join('–')}</span><h1>${title}</h1></div></div>`
    : `<div style="margin:0 0 12px"><span class="eyebrow">${l.book}. kitap · sayfa ${l.pages.join('–')}</span><h1 style="font-size:clamp(24px,6.4vw,34px)">${title}</h1></div>`;
  const spk = (u, t = 'Dinle') => `<button class="mini" data-play="${u}">${icon('speaker')} ${t}</button>`;
  const nextBtn = NEXT[step] ? `<a class="btn wide nextstep" href="#konu/${id}/${NEXT[step][0]}">${NEXT[step][1]} ${icon('next')}</a>` : '';
  let body = '';
  if (step === 'dinle') {
    body = `<div class="card"><p class="txt" data-unit="intro" data-q>${SS(A, 'intro', 0, k.intro)}</p></div>${nextBtn}`;
  } else if (step === 'hikaye') {
    const st = k.story, nS = A?.story?.s ? A.story.s.length - splitSentences(st.question).length : splitSentences(st.scene).length;
    body = `<div class="card" data-unit="story" data-q><p class="txt">${SS(A, 'story', 0, st.scene, nS)}</p><h2 style="margin-top:12px;font-size:24px">${SS(A, 'story', nS, st.question)}</h2></div>
      <div id="opts">${st.options.map((o, i) => `<div class="optrow"><button class="choice" data-opt="${i}" data-unit="sopt${i}"><span class="s" data-i="0">${esc(o.text)}</span></button><button class="ibtn sp" data-play="sopt${i}" aria-label="Seçeneği dinle">${icon('speaker')}</button></div>`).join('')}</div><div id="fb"></div><div id="nx" hidden>${nextBtn}</div>`;
  } else if (step === 'oyun') {
    body = `<div class="card" data-unit="game"><p class="txt">${SS(A, 'game', 0, k.game.instruction)}</p>${spk('game')}</div><div id="game"></div><div id="nx" hidden style="margin-top:14px">${nextBtn}</div>`;
  } else {
    const done = !!state.completed[id], page = l.pages[1];
    body = `<div class="task"><h3>Bugünkü görevin</h3><p class="txt" data-unit="task" data-q>${SS(A, 'task', 0, k.task)}</p>
      <label class="check"><input type="checkbox" id="taskck" ${state.tasks[id] ? 'checked' : ''}> Görevi yaptım</label></div>
      <a class="btn ghost wide" style="margin-bottom:12px" href="#boya/${l.book}/${page}">${icon('paint')} Kitabımın ${page}. sayfasını boya</a>
      <div id="finish">${done ? `<div class="cele"><div class="seal">${icon('star')}</div><h2>Bu konunun damgası sende!</h2></div>` : `<button class="btn wide" id="fin">${icon('star')} Konuyu bitirdim, damgamı al</button>`}</div>
      <div class="sec">${nextPrev(l)}</div><p class="note"><a href="#buyuk/${id}" style="text-decoration:underline">Büyükler için: bu konunun tamamı ve rehberi</a></p>`;
  }
  const hasPlay = ['dinle', 'hikaye', 'gorev'].includes(step);
  setMain(`<div class="kidcol kid" data-book="${l.book}"><a class="back" href="#konular/${l.book}">${icon('back')} Konular</a>${head}${bar}${body}</div>` + (hasPlay ? `<div style="height:90px" aria-hidden="true"></div><div class="dock" data-book="${l.book}"><button class="bigplay" id="bp"><span class="pi">${icon('play')}</span><span>Bana oku</span></button></div>` : ''));
  const root = u => $(`[data-unit="${u}"]`, main);
  const item = u => au.unitItem(A, id, u, root(u));
  main.onclick = ev => { const b = ev.target.closest('[data-play]'); if (b && root(b.dataset.play)) au.play([item(b.dataset.play)]); };
  const bp = $('#bp');
  if (bp) {
    const label = s => { const on = s === 'playing'; bp.classList.toggle('playing', on); bp.innerHTML = `<span class="pi">${icon(on ? 'pause' : 'play')}</span><span>${on ? 'Duraklat' : s === 'paused' ? 'Devam et' : 'Bana oku'}</span>`; bp.setAttribute('aria-label', on ? 'Okumayı duraklat' : s === 'paused' ? 'Okumaya devam et' : 'Bana oku'); };
    onLeave(au.onState(s => label(s === 'loading' ? 'playing' : s)));
    bp.onclick = () => {
      const s = au.getState();
      if (s === 'playing' || s === 'paused') return au.toggle();
      au.play($$('[data-q]', main).map(e => item(e.dataset.unit)));
    };
  }
  if (step === 'hikaye') storyStep(k, A, item);
  if (step === 'oyun') gameStep(k.game, item);
  if (step === 'gorev') {
    $('#taskck').onchange = e => { state.tasks[id] = e.target.checked; persist(); if (e.target.checked) sfx.good(); };
    const fin = $('#fin');
    if (fin) fin.onclick = () => {
      state.completed[id] = Date.now(); persist(); sfx.chime();
      $('#finish').innerHTML = `<div class="cele"><div class="seal">${icon('star')}</div><h2>Yeni bir damga kazandın!</h2><p class="txt" style="font-size:19px">Keşif defterine eklendi.</p><a class="btn" style="margin-top:12px" href="#defter">${icon('star')} Defterime bak</a></div>`;
      au.sayUI('damga'); $('#finish').scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
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
const revealNext = () => { const n = $('#nx'); if (n && n.hidden) { n.hidden = false; n.style.animation = 'rise .4s'; } };

function storyStep(k, A, item) {
  const fb = $('#fb');
  $('#opts').addEventListener('click', ev => {
    const c = ev.target.closest('.choice'); if (!c) return;
    const i = +c.dataset.opt, o = k.story.options[i];
    $$('.choice').forEach(x => x.classList.remove('try'));
    if (o.correct) { c.classList.add('good'); sfx.good(); revealNext(); } else { c.classList.add('try'); sfx.soft(); }
    fb.innerHTML = `<div class="fb ${o.correct ? '' : 'try'}" data-unit="sfb${i}">${SS(A, `sfb${i}`, 0, o.feedback)}</div>`;
    au.play([item(`sfb${i}`)]);
  });
}

function gameStep(g, item) {
  const box = $('#game');
  const cele = () => { box.insertAdjacentHTML('beforeend', `<div class="cele" style="margin-top:14px"><div class="seal">${icon('star')}</div><h2>Aferin!</h2></div>`); au.sayUI('dogru'); sfx.chime(); revealNext(); };
  if (g.type === 'match') {
    const as = shuffle(g.pairs.map((p, i) => [i, p.a])), bs = shuffle(g.pairs.map((p, i) => [i, p.b]));
    box.innerHTML = `<div class="match"><div class="col">${as.map(([i, t]) => `<button class="mi" data-side="a" data-p="${i}" data-unit="ga${i}"><span class="s" data-i="0">${esc(t)}</span></button>`).join('')}</div><div class="col">${bs.map(([i, t]) => `<button class="mi" data-side="b" data-p="${i}" data-unit="gb${i}"><span class="s" data-i="0">${esc(t)}</span></button>`).join('')}</div></div>`;
    let sel = null, left = g.pairs.length;
    box.onclick = ev => {
      const b = ev.target.closest('.mi'); if (!b || b.classList.contains('done')) return;
      au.play([item(b.dataset.unit)]); sfx.tap();
      if (!sel || sel.dataset.side === b.dataset.side) { sel?.classList.remove('sel'); sel = b; b.classList.add('sel'); return; }
      if (sel.dataset.p === b.dataset.p) {
        sel.classList.remove('sel'); sel.classList.add('done'); b.classList.add('done'); sel = null; sfx.good();
        if (--left === 0) setTimeout(cele, 900);
      } else {
        const o = sel; o.classList.remove('sel'); [o, b].forEach(x => { x.classList.add('try'); setTimeout(() => x.classList.remove('try'), 450); }); sel = null;
        setTimeout(() => au.sayUI('tekrar'), 700);
      }
    };
  } else {
    const items = shuffle(g.items.map((t, i) => [i, t])); let nxt = 0;
    box.innerHTML = `<div class="order">${items.map(([i, t]) => `<button class="mi" data-p="${i}" data-unit="go${i}"><span class="n"></span><span class="s" data-i="0">${esc(t)}</span></button>`).join('')}</div>`;
    box.onclick = ev => {
      const b = ev.target.closest('.mi'); if (!b || b.classList.contains('done')) return;
      if (+b.dataset.p === nxt) {
        b.classList.add('done'); $('.n', b).textContent = ++nxt; au.play([item(b.dataset.unit)]); sfx.good();
        if (nxt === g.items.length) setTimeout(cele, 1200);
      } else { b.classList.add('try'); setTimeout(() => b.classList.remove('try'), 450); au.sayUI('tekrar'); sfx.soft(); }
    };
  }
}

// ---- boyama ----
async function boya(b, p) {
  if (b && p) return studioView(+b, +p);
  b = +b || state.book || 1;
  const painted = new Set((await listPaints()).map(x => x.id));
  setMain(`<div data-book="${b}"><h1>Boyama</h1><p class="lead" style="margin:4px 0 14px">Kitabındaki resimleri boya. Bir sayfa seç.</p>
    <div class="chips">${[1, 2, 3].map(k => `<a class="chip" href="#boya/${k}" ${k === b ? 'aria-current="true"' : ''}>${k}. kitap</a>`).join('')}<a class="chip" href="#resimler">${icon('star')} Resimlerim${painted.size ? ` · ${painted.size}` : ''}</a></div>
    <div class="pgrid">${Array.from({ length: 48 }, (_, k) => k + 1).map(p => `<a href="#boya/${b}/${p}" aria-label="Sayfa ${p}${painted.has(pid(b, p)) ? ', boyandı' : ''}"><img loading="lazy" src="sayfa/${pid(b, p)}-t.webp" alt="" width="260" height="374"><span class="badge pg">${p}</span>${state.boyandi[pid(b, p)] ? '<span class="badge" aria-hidden="true">★</span>' : ''}</a>`).join('')}</div></div>`);
  guide('boyalar');
}
// Canlanan sayfalar kaldırıldı (3 Kas 2026): eski #canlan/B/S bağlantıları sayfanın kendisine gider.
function canlan(b, p) { return sayfa(b, p); }
async function studioView(b, p) {
  if (![1, 2, 3].includes(b) || !(p >= 1 && p <= 48)) return boya(b);
  state.book = b; persist();
  document.body.classList.add('studio-on');
  const mine = token, id = pid(b, p);
  const onDone = () => { // çocuğun emeği: sıradaki tebrik cümlesi (tekrar etmeden döner), damga ve duvar
    const keys = Object.keys(TEBRIK), i = (state.tebrikI | 0) % keys.length, k = keys[i];
    state.tebrikI = i + 1; state.boyandi[id] = Date.now(); persist();
    if (state.sound) au.sayUI(k);
    return { text: TEBRIK[k] };
  };
  const s = await openStudio(main, { b, p, toast, say: k => state.sound && au.sayUI(k), onDone });
  if (mine !== token) { s.destroy(); return; }
  studio = s;
  if (state.sound && interacted) au.sayUI('boya');
}

// ---- resim duvarı ----
async function resimler(a, nid) {
  const paints = (await listPaints()).sort((x, y) => y.t - x.t), urls = [];
  const rot = i => [-2.2, 1.6, -1, 2.4, -1.8, 1.2][i % 6];
  setMain(`<h1>Resimlerim</h1><p class="lead" style="margin:4px 0 6px">${paints.length ? 'Burası senin resim duvarın. Dokun, büyüt, boyamaya devam et.' : 'Burası senin resim duvarın.'}</p>
    ${paints.length ? `<div class="wall">${paints.map((x, i) => { const u = URL.createObjectURL(x.thumb); urls.push(u); const q = parseId(x.id); return q ? `<a class="frame ${a === 'yeni' && x.id === nid ? 'new' : ''}" style="--rot:${rot(i)}deg" href="#resim/${q.b}/${q.p}" aria-label="${q.b}. kitap, sayfa ${q.p}${state.boyandi[x.id] ? ', bitti' : ''}"><img src="${u}" alt=""><span class="lbl">${q.b}. kitap · s. ${q.p}</span>${state.boyandi[x.id] ? `<span class="star">${icon('star')}</span>` : ''}</a>` : ''; }).join('')}</div>`
      : `<div class="empty">Henüz boyadığın bir resim yok. Bir sayfa seç, bir yerine dokun; resmin kendiliğinden buraya gelir.<p style="margin-top:14px"><a class="btn" href="#boya">${icon('paint')} Boyamaya başla</a></p></div>`}`);
  onLeave(() => urls.forEach(URL.revokeObjectURL));
  if (a === 'yeni') $('.frame.new')?.scrollIntoView({ block: 'center' });
  else guide('resimler');
}
async function resim(b, p) {
  b = +b; p = +p; if (![1, 2, 3].includes(b) || !(p >= 1 && p <= 48)) return resimler();
  const rec = await getPaint(idOf(b, p));
  if (!rec?.blob) { setMain(`<div class="empty"><h2>Bu resim bulunamadı</h2><p><a class="btn" href="#resimler">Resimlerim</a></p></div>`); return; }
  const blob = await composeArt(idOf(b, p), rec), url = URL.createObjectURL(blob);
  onLeave(() => URL.revokeObjectURL(url));
  const L = topicOfPage(b, p) || (await loadBook(b), topicOfPage(b, p));
  setMain(`<div data-book="${b}" style="text-align:center"><a class="back" href="#resimler" style="float:left">${icon('back')} Resimlerim</a><div style="clear:both"></div>
    <span class="eyebrow" style="display:block">${b}. kitap · sayfa ${p}</span>${L ? `<h1 style="font-size:26px">${esc(K(L).title)}</h1>` : ''}
    <img class="bigart" src="${url}" alt="Boyadığın ${b}. kitap ${p}. sayfa resmi">
    <p style="margin-top:12px"><a class="btn" href="#boya/${b}/${p}">${icon('paint')} Boyamaya devam et</a></p></div>`);
}

// ---- keşif defteri ----
async function defter() {
  await loadAll();
  const paints = await listPaints();
  const done = lessons.filter(l => state.completed[l.id]).length, nb = Object.keys(state.boyandi).length;
  setMain(`<h1>Keşif defterim</h1><p class="lead" style="margin:4px 0 14px">Her konuyu bitirince bir damga kazanırsın.</p>
    <div class="card prog"><div class="ring" style="--p:${done / 60 * 100}"><b>${done}</b></div><div><b style="font-size:20px">${done} / 60 damga</b><p style="color:var(--muted);font-size:16px;margin:2px 0 6px">${nb ? `Bitirdiğin resim: ${nb}` : 'Bitirdiğin resimler de burada sayılır.'}</p><button class="listen" data-say="defter">${icon('speaker')} Dinle</button></div></div>
    ${[1, 2, 3].map(n => `<section data-book="${n}"><div class="sec-h"><h2>${n}. kitap</h2><a href="#konular/${n}">Konular ›</a></div><div class="stamps">${lessons.filter(l => l.book === n).map(l => `<a class="st ${state.completed[l.id] ? 'on' : ''}" href="#konu/${l.id}" aria-label="${esc(K(l).title)}${state.completed[l.id] ? ', damga kazanıldı' : ''}">${state.completed[l.id] ? icon('star') : l.n}</a>`).join('')}</div></section>`).join('')}
    <div class="sec-h"><h2>Resimlerim</h2></div>${paints.length ? `<a class="btn ghost wide" href="#resimler">${icon('paint')} Duvarımda ${paints.length} resim var</a>` : '<div class="empty">Henüz boyadığın bir resim yok.</div>'}`);
  guide('defter');
}

// ---- büyükler ----
const GATE = 'iyilik-kapi';
// Kapı: yazıyla verilen çarpma (okul öncesi çocuk çözemez); sesli ipucu çözümü söylemez.
const SAYI = { 6: 'altı', 7: 'yedi', 8: 'sekiz', 9: 'dokuz' };
async function buyuk(id, _b) {
  if (!sessionStorage.getItem(GATE)) return gate();
  await loadAll();
  if (id === 'resimler') return buyukResimler(_b);
  if (id && byId[id]) return guideView(byId[id]);
  const src = await loadSources();
  const urls = [1, 2, 3].map(n => `https://raufenc.com/iyilik/${n}/`);
  setMain(`<h1>Büyükler için</h1><p class="lead" style="margin:4px 0 14px">Çocuğunuzla birlikte kullanım rehberi, konuların tamamı, kaynaklar ve gizlilik.</p>
  <div class="pcard"><h2>Nasıl kullanılır?</h2><ul><li>Çocuk, kitabındaki sayfa numarasını yazar; o sayfanın konusunu dinler, kısa bir hikâyede seçim yapar, oyun oynar ve resmi boyar.</li><li>Çocuğa okunan metinler bilerek kısadır. Konunun tamamı (öğrenme kartları, merak edilen sorular, sorular ve açıklamaları) her konunun rehberinde, sizin okuyup anlatmanız için durur.</li><li>Okunan cümle ve kelime renkle gösterilir. Boyamayı bitirince “Bitti” düğmesiyle çocuğun resmi kutlanır ve resim duvarına asılır.</li></ul></div>
  <div class="pcard"><h2>Ayarlar</h2><label class="switch">Sesli ipuçları ve okuma <input type="checkbox" id="opt-sound" ${state.sound ? 'checked' : ''}></label><label class="switch">Hafif dokunma sesleri <input type="checkbox" id="opt-sfx" ${state.sfx !== false ? 'checked' : ''}></label></div>
  <div class="pcard"><h2>Konu rehberleri ve konuların tamamı</h2>${[1, 2, 3].map(n => `<h3>${n}. kitap · ${esc(BOOKS[n].title)}</h3><div class="plist">${lessons.filter(l => l.book === n).map(l => `<a href="#buyuk/${l.id}"><b>${l.n}.</b> ${esc(l.title)}<small>s. ${l.pages.join('–')}</small></a>`).join('')}</div>`).join('')}</div>
  <div class="pcard"><h2>Kitaptaki karekodlar</h2><p>Her cildin ön iç kapağındaki karekod, o kitabı bu sitede doğrudan açar. Adresler basılıdır ve değişmez.</p><div class="qrs">${[1, 2, 3].map(n => `<div><img src="assets/qr-book${n}.png" alt="${n}. cilt karekodu" width="130" height="130"><b>${n}. cilt</b><br>${urls[n - 1].replace('https://', '')}</div>`).join('')}</div></div>
  <div class="pcard"><h2>Çocuğunuzun resimleri</h2><p>Boyadığı sayfaları görebilir, istediğinizi paylaşabilirsiniz. Resimler hiçbir sunucuya gitmez; paylaşırken cihazınızın kendi paylaşım penceresi açılır.</p><a class="btn small" href="#buyuk/resimler" style="margin-top:8px">Resimleri gör ve paylaş</a></div>
  <div class="pcard"><h2>Çevrimdışı kullanım</h2><p>Site bir kez açıldıktan sonra gördüğünüz sayfalar internetsiz de çalışır. Bir cildin tamamını (resimler ve sesler) şimdiden cihaza indirebilirsiniz.</p><div class="row" style="margin-top:8px">${[1, 2, 3].map(n => `<button class="btn small ghost" data-warm="${n}">${n}. cildi indir</button>`).join('')}</div><p id="warmmsg" role="status" style="margin-top:8px"></p></div>
  <div class="pcard"><h2>Kaynakça</h2><p>Dinî açıklamalar çocuklara uygun özgün anlatımlardır; doğrudan âyet-i kerîme veya hadîs-i şerîf alıntısı olarak sunulmaz. İbadet uygulamalarındaki Hanefî çerçeve, diğer mezheplerin uygulamalarını geçersiz saymaz. Kaynakların listelenmesi kurumsal onay anlamına gelmez.</p>
   ${[1, 2, 3].map(n => `<details><summary>${n}. kitap kaynakları</summary>${[...new Set(lessons.filter(l => l.book === n).flatMap(l => l.sourceIds))].map(k => src[k]).filter(Boolean).map(s => `<div class="src"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><small>${esc(s.scope || '')}</small></div>`).join('')}</details>`).join('')}</div>
  <div class="pcard"><h2>Gizlilik</h2><p>Bu sitede üyelik, hesap veya reklam yoktur. Siteyi kaç kişinin açtığını görmek için çerez kullanmayan, kişisel veri toplamayan anonim bir sayım yapılır. Çocuğunuzun ilerlemesi ve boyadığı resimler yalnız bu cihazda kalır; hiçbir sunucuya gönderilmez. Tarayıcı verilerini silerseniz bu kayıtlar da silinir.</p><button class="btn small danger" id="reset" style="margin-top:10px">Bu cihazdaki ilerlemeyi ve resimleri sil</button></div>`);
  $('#opt-sound').onchange = e => { state.sound = e.target.checked; persist(); paintSnd(); if (!state.sound) au.stop(); };
  $('#opt-sfx').onchange = e => { state.sfx = e.target.checked; persist(); sfx.tap(); };
  $$('[data-warm]').forEach(b => b.onclick = () => warm(+b.dataset.warm, $('#warmmsg')));
  $('#reset').onclick = async () => {
    if (!confirm('Bu cihazdaki bütün damgalar ve boyanmış resimler silinecek. Emin misiniz?')) return;
    Object.assign(state, { completed: {}, tasks: {}, visits: {}, boyandi: {}, last: null }); persist(); await clearPaints(); toast('Silindi.');
  };
}
function gate() {
  const a = 6 + (Math.random() * 4 | 0), b = 6 + (Math.random() * 4 | 0), num = a * b;
  setMain(`<div class="gate"><div style="color:var(--green);display:grid;place-items:center">${icon('lock')}</div><h1 style="font-size:28px;margin-top:6px">Büyükler bölümü</h1><p style="margin-top:8px">Bu bölüm anne babalar içindir. Devam etmek için işlemin sonucunu rakamla yazın:</p>
    <p style="font-size:24px;font-weight:900;margin:10px 0 2px">${SAYI[a]} kere ${SAYI[b]}</p>
    <label for="wordin" class="sr-only">İşlemin sonucu</label><input id="wordin" inputmode="numeric" autocomplete="off" maxlength="2" style="margin-top:8px"><button class="btn small wide" id="wordgo" style="margin-top:10px">Gir</button><p class="msg" id="gmsg" role="alert"></p>
    <button class="listen" data-say="buyuk" style="margin-top:6px">${icon('speaker')} Dinle</button></div>`);
  const ok = () => { sessionStorage.setItem(GATE, '1'); route(); };
  const go = () => { if ($('#wordin').value.trim() === String(num)) ok(); else $('#gmsg').textContent = 'Sonuç doğru değil, tekrar deneyin.'; };
  $('#wordgo').onclick = go; $('#wordin').onkeydown = e => { if (e.key === 'Enter') go(); };
  guide('buyuk');
}
async function buyukResimler(sel) {
  const paints = (await listPaints()).sort((x, y) => y.t - x.t), urls = [];
  const back = `<a class="back" href="#buyuk">${icon('back')} Büyükler için</a>`;
  if (sel && parseId(sel)) { // seçilen resim: künyeli önizleme + paylaş
    const q = parseId(sel), rec = await getPaint(sel);
    if (rec?.blob) {
      const blob = await composeArt(sel, rec, { kunye: true }), url = URL.createObjectURL(blob); onLeave(() => URL.revokeObjectURL(url));
      setMain(`${back}<h1 style="font-size:26px">Resmi paylaş</h1><p class="lead">${q.b}. kitap, sayfa ${q.p}. Resmin altında küçük bir künye şeridi yer alır.</p>
        <img class="bigart" src="${url}" alt="Paylaşılacak resim, altında künye şeridiyle"><p class="msg" id="shmsg" role="status"></p>
        <div class="row" style="justify-content:center"><button class="btn" id="shbtn">${icon('save')} Paylaş</button><a class="btn ghost" href="#buyuk/resimler">Başka resim</a></div>`);
      $('#shbtn').onclick = async () => {
        const r = await shareOrDownload(blob, `iyilik-kitap${q.b}-sayfa${q.p}-resim.png`);
        $('#shmsg').textContent = r === 'indirildi' ? 'Bu cihazda paylaşma desteklenmiyor; resim indirildi.' : r === 'paylasildi' ? 'Paylaşım penceresi açıldı.' : '';
      };
      return;
    }
  }
  setMain(`${back}<h1 style="font-size:26px">Çocuğunuzun resimleri</h1><p class="lead">Paylaşmak istediğiniz resme dokunun.</p>
    ${paints.length ? `<div class="pgrid" style="margin-top:12px">${paints.map(x => { const u = URL.createObjectURL(x.thumb); urls.push(u); const q = parseId(x.id); return q ? `<a href="#buyuk/resimler/${x.id}" aria-label="${q.b}. kitap, sayfa ${q.p}"><img src="${u}" alt=""><span class="badge pg">${q.p}</span></a>` : ''; }).join('')}</div>` : '<div class="empty">Henüz boyanmış bir resim yok.</div>'}`);
  onLeave(() => urls.forEach(URL.revokeObjectURL));
}
// Konunun tamamı (yalnız yazı): çocuğa okunmayan uzun metinler burada; anne baba okuyup anlatır.
async function guideView(l) {
  const src = await loadSources(), f = l.family, st = l.story;
  const same = lessons.filter(x => x.book === l.book), i = same.findIndex(x => x.id === l.id), pv = same[i - 1], nx = same[i + 1];
  setMain(`<a class="back" href="#buyuk">${icon('back')} Büyükler için</a><div data-book="${l.book}"><span class="eyebrow">${l.book}. kitap · sayfa ${l.pages.join('–')}</span><h1 style="font-size:28px">${esc(l.title)}</h1></div>
  <div class="pcard" style="margin-top:14px"><h2>Bu sayfada ne konuşulur?</h2><p>${esc(f.guide)}</p></div>
  <div class="pcard"><h2>Konunun tamamı</h2><p>${esc(l.intro)}</p>${l.learn.map(c => `<h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>`).join('')}</div>
  <div class="pcard"><h2>Merak edilenler</h2>${l.deeper.map(c => `<h3>${esc(c.q)}</h3><p>${esc(c.a)}</p>`).join('')}</div>
  <div class="pcard"><h2>Hikâyenin tamamı</h2><p>${esc(st.scene)}</p><p><b>${esc(st.question)}</b></p><ul>${st.options.map(o => `<li>${o.correct ? '<span class="ok">✓</span> ' : ''}${esc(o.text)}<br><small style="color:var(--muted)">${esc(o.feedback)}</small></li>`).join('')}</ul></div>
  <div class="pcard"><h2>Birlikte konuşabileceğiniz sorular</h2>${l.quiz.map((q, k) => `<details ${k ? '' : 'open'}><summary>${esc(q.question)}</summary><ol type="a">${q.options.map((o, j) => `<li>${j === q.answer ? `<span class="ok">✓ ${esc(o)}</span>` : esc(o)}</li>`).join('')}</ol><p style="margin-bottom:8px">${esc(q.explanation)}</p></details>`).join('')}</div>
  <div class="pcard"><h2>Çocuğa sorabilirsiniz</h2><ul>${f.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul></div>
  <div class="pcard"><h2>Evde küçük bir iyilik</h2><p>${esc(f.activity)}</p></div>
  <div class="pcard"><h2>Kitaptaki görev</h2><p>${esc(l.task)}</p></div>
  <div class="pcard"><h2>Dayanak kaynaklar</h2>${l.sourceIds.map(k => src[k]).filter(Boolean).map(s => `<div class="src"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><small>${esc(s.scope || '')}</small></div>`).join('')}</div>
  <div class="sec">${pv ? `<a class="btn ghost small" href="#buyuk/${pv.id}">${icon('back')} Önceki</a>` : '<span></span>'}<a class="btn small" href="#konu/${l.id}">Çocuk sayfası</a>${nx ? `<a class="btn ghost small" href="#buyuk/${nx.id}">Sonraki ${icon('next')}</a>` : '<span></span>'}</div>`);
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
