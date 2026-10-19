// Uygulama kabuğu: açılış hologramı → giriş → sekmeli arayüz; yönlendirme, tema, sürüm kontrolü, bildirim rozeti
import { APP_VERSION, APP_NAME, BASE_PATH, FIREBASE_CONFIG } from './config.js';
import { icons, h, raw, el, esc, toast, actionToast, sheet } from './ui.js';
import { init, store, auth, bildirim, isLive } from './backend.js';
import { route, match, go, back } from './router.js';
import { playIntro } from './intro.js';
import * as H from './views/home.js';
import * as TV from './views/tv.js';
import * as A from './views/arge.js';
import * as M from './views/misc.js';
import * as K from './views/akis.js';

route('/', H.home); route('/haberler', H.haberler); route('/haberler/:id', H.haberDetay); route('/duyurular', H.duyurular); route('/duyurular/:id', H.duyuruDetay);
route('/bildirimler', H.bildirimler); route('/favoriler', H.favoriler); route('/akis', K.akis); route('/akis/:id', K.paylasimDetay); route('/ara', M.ara);
route('/tv', TV.tv); route('/tv/:id', TV.video);
route('/arge', A.arge); route('/arge/:id', A.projeDetay); route('/etwinning', A.etwinning); route('/tubitak', A.tubitak); route('/akademiler', A.akademiler); route('/kutuphane', A.kutuphane); route('/dokumanlar', A.dokumanlar);
route('/takvim', M.takvim); route('/ilceler', M.ilceler); route('/ilceler/:id', M.ilceDetay); route('/anketler', M.anketler); route('/anketler/:id', M.anketDetay); route('/asistan', M.asistan); route('/iletisim', M.iletisim); route('/hesap', M.hesap); route('/hakkinda', M.hakkinda); route('/menu', M.menu);

const TABS = [['#/', 'Ana Sayfa', 'home'], ['#/akis', 'Akış', 'feed'], ['#/tv', 'MEM TV', 'play'], ['#/takvim', 'Takvim', 'calendar'], ['#/menu', 'Menü', 'grid']];
const $ = (s) => document.querySelector(s);
let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; });

function applyTheme(t) {
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('arge.theme', t); } catch (_) {}
  bildirim.setTheme(t);
  $('meta[name=theme-color]')?.setAttribute('content', document.documentElement.dataset.theme === 'dark' ? '#0B1120' : '#E72737');
}
document.addEventListener('arge:theme', (e) => applyTheme(e.detail));
function applyFont(f) { if (f && f !== 'normal') document.documentElement.dataset.font = f; else delete document.documentElement.dataset.font; try { localStorage.setItem('arge.font', f); } catch (_) {} bildirim.setFont(f); }
document.addEventListener('arge:font', (e) => applyFont(e.detail));

function renderShell() {
  $('#device').innerHTML = `<div class="screen">
    <header class="topbar"><button class="icon-btn" id="tb-back" aria-label="Geri" hidden>${icons.back}</button>
      <div class="brand" id="tb-brand"><span class="logo">AR-GE</span><div><div class="t1">Kocaeli MEM</div><div class="t2">AR-GE Portalı</div></div></div>
      <div class="title" id="tb-title" hidden></div>
      <a class="icon-btn" href="#/ara" aria-label="Ara">${icons.search}</a>
      <a class="icon-btn" href="#/bildirimler" aria-label="Bildirimler" id="tb-bell">${icons.bell}<span class="dot" hidden></span></a>
      <a class="icon-btn" href="#/hesap" aria-label="Hesabım" id="tb-user">${icons.user}</a></header>
    <main id="view" tabindex="-1"></main>
    <nav class="tabbar" aria-label="Ana sekmeler">${TABS.map(([href, t, i]) => `<a href="${href}" data-tab="${href}">${icons[i]}<span>${t}</span></a>`).join('')}</nav></div>`;
  $('#tb-back').addEventListener('click', back);
}

function updateBadge() { const n = bildirim.unread(); const d = $('#tb-bell .dot'); if (!d) return; d.hidden = !n; d.textContent = n > 9 ? '9+' : n; }
function updateUserIcon() { const u = store.user; const b = $('#tb-user'); if (!b) return; b.innerHTML = u?.foto ? `<span class="avatar" style="width:30px;height:30px"><img src="${esc(u.foto)}" alt="" referrerpolicy="no-referrer"></span>` : icons.user; }

let current = null;
async function render() {
  const m = match(location.hash);
  if (!m) { go('#/'); return; }
  const root = $('#view'); if (!root) return;
  const isHome = m.path === '/';
  $('#tb-back').hidden = isHome; $('#tb-brand').hidden = !isHome; $('#tb-title').hidden = isHome;
  document.querySelectorAll('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === '#/' + m.path.split('/')[1] || (isHome && a.dataset.tab === '#/')));
  document.querySelectorAll('.sheet-bg, .toast').forEach(x => x.remove());
  root.innerHTML = ''; root.scrollTop = 0; window.scrollTo(0, 0); $('#device .screen')?.scrollTo?.(0, 0);
  const ctx = { root, params: m.params, query: m.query, title: (t) => { $('#tb-title').textContent = t; document.title = `${t} · ${APP_NAME}`; } };
  if (isHome) document.title = APP_NAME;
  current = m;
  try { await m.view(ctx); } catch (e) { console.error(e); root.innerHTML = `<div class="empty">${icons.alert}<div>Sayfa yüklenirken hata oluştu.</div><p style="font-size:12px">${esc(e.message)}</p></div>`; }
  if (isHome && installPrompt && !sessionStorage.getItem('arge.installHidden')) {
    const card = el(`<div class="card pad" style="margin-bottom:16px;display:flex;gap:12px;align-items:center"><span class="logo" style="width:40px;height:40px;border-radius:12px;background:var(--meb);color:#fff;display:grid;place-items:center;font-weight:800;font-size:11px">AR-GE</span><div style="flex:1"><b style="font-size:14px">Ana ekrana ekle</b><div style="font-size:12.5px;color:var(--text-2)">Uygulama gibi hızlı erişim</div></div><button class="btn sm primary" id="inst">Ekle</button><button class="icon-btn" id="instx" aria-label="Kapat">${icons.close}</button></div>`);
    root.prepend(card);
    card.querySelector('#inst').onclick = async () => { installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; card.remove(); };
    card.querySelector('#instx').onclick = () => { sessionStorage.setItem('arge.installHidden', '1'); card.remove(); };
  }
  updateBadge();
}

function versionCheck() {
  const s = store.content.surum; if (!s) return;
  const cmp = (a, b) => { const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number); for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0); } return 0; };
  document.querySelector('.update-bar')?.remove();
  if (s.latestVersion && cmp(APP_VERSION, s.latestVersion) < 0) {
    const zorunlu = s.zorunlu || (s.minVersion && cmp(APP_VERSION, s.minVersion) < 0);
    const bar = el(`<div class="update-bar">${icons.download}<span>${esc(s.mesaj || (zorunlu ? 'Bu sürüm desteklenmiyor; güncelleme gerekli.' : 'Yeni sürüm hazır: ' + s.latestVersion))}</span><button id="upd">Güncelle</button></div>`);
    document.body.prepend(bar);
    bar.querySelector('#upd').onclick = async () => { if (s.magazaLink) return window.open(s.magazaLink, '_blank', 'noopener'); const regs = await navigator.serviceWorker?.getRegistrations?.() || []; for (const r of regs) await r.update(); location.reload(); };
    if (zorunlu) { $('#device').style.pointerEvents = 'none'; $('#device').style.filter = 'blur(2px)'; }
  }
}

// ── Giriş ekranı ──
function showLogin() {
  document.getElementById('login')?.remove();
  const l = el(`<div id="login"><div class="wrap"><div class="hero"><div class="logo">AR-GE</div><h1>Kocaeli MEM AR-GE Portalı</h1><p>Haber, duyuru, video, proje ve dijital içerikler tek merkezde.</p></div>
    ${isLive ? '' : '<div class="notice demo">Tanıtım sürümü: Firebase bağlanmadığı için demo hesapla giriş yapılır; veriler bu cihazda saklanır.</div>'}
    <button class="login-btn soon" id="l-edevlet"><span class="lg edevlet">e-D</span><span>e-Devlet ile giriş<small>Kamu kimlik doğrulama</small></span><span class="chip amber soon-tag">Protokol sonrası</span></button>
    <button class="login-btn soon" id="l-mebbis"><span class="lg mebbis">MEB</span><span>MEBBİS ile giriş<small>Öğretmen kurumsal hesabı</small></span><span class="chip amber soon-tag">Protokol sonrası</span></button>
    <button class="login-btn" id="l-google"><span class="lg google"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9z"/><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10c.8-2.3 3-4 5.6-4z"/></svg></span><span>Google ile giriş<small>Kurumsal veya kişisel Google hesabı</small></span></button>
    <button class="login-btn" id="l-demo"><span class="lg demo">D</span><span>Demo öğretmen olarak giriş<small>Tanıtım için örnek hesap</small></span></button>
    <button class="btn ghost block" id="l-guest" style="margin-top:4px">Giriş yapmadan göz at</button>
    <div class="foot">Giriş yaparak <a href="#/hakkinda" style="text-decoration:underline">kullanım koşullarını</a> kabul etmiş olursunuz. Kişisel verileriniz KVKK kapsamında korunur.</div></div></div>`);
  document.body.appendChild(l);
  const soon = (ad, metin) => () => sheet(`<h2>${ad}</h2><p style="font-size:14px;line-height:1.55">${metin}</p><p style="font-size:13px;color:var(--text-2)">Bu sürümde Google hesabı veya demo hesabı ile giriş yapabilirsiniz.</p><button class="btn navy block" data-close>Anladım</button>`);
  l.querySelector('#l-edevlet').onclick = soon('e-Devlet ile giriş', 'e-Devlet kimlik doğrulama servisi yalnızca kamu kurumlarına Türksat ile imzalanan protokolle açılır. Kocaeli İl Millî Eğitim Müdürlüğü adına protokol tamamlandığında bu düğme aktif olacaktır.');
  l.querySelector('#l-mebbis').onclick = soon('MEBBİS ile giriş', 'MEBBİS kimlik doğrulaması MEB Bilgi İşlem Genel Müdürlüğü onayı gerektirir. Kurum protokolü tamamlandığında öğretmenler MEBBİS kullanıcı adı ve şifresiyle giriş yapabilecektir.');
  l.querySelector('#l-google').onclick = async () => {
    if (!isLive) return sheet(`<h2>Google ile giriş</h2><p style="font-size:14px;line-height:1.55">Google girişi için Firebase projesi bağlanmalıdır (bkz. KURULUM.md). Tanıtım için demo hesabı kullanabilirsiniz.</p><button class="btn primary block" id="dd">Demo hesapla devam et</button>`).el.querySelector('#dd').addEventListener('click', () => { document.querySelector('.sheet-bg')?.remove(); l.querySelector('#l-demo').click(); });
    try { await auth.signInGoogle(); } catch (e) { toast('Giriş başarısız: ' + (e.code || e.message)); }
  };
  l.querySelector('#l-demo').onclick = () => {
    const s = sheet(`<h2>Demo hesabı</h2><form id="df"><label class="field"><span>Ad Soyad</span><input name="ad" value="Ayşe Yılmaz" maxlength="60" required></label><button class="btn primary block" type="submit">Giriş yap</button></form>`);
    s.el.querySelector('#df').addEventListener('submit', async (e) => { e.preventDefault(); await auth.signInDemo(new FormData(e.target).get('ad').trim() || 'Demo Öğretmen'); s.close(); });
  };
  l.querySelector('#l-guest').onclick = () => { sessionStorage.setItem('arge.guest', '1'); l.remove(); toast('Misafir olarak devam ediyorsunuz'); };
}
document.addEventListener('arge:login', showLogin);

async function boot() {
  try { applyTheme(localStorage.getItem('arge.theme') || 'auto'); applyFont(localStorage.getItem('arge.font') || 'normal'); } catch (_) {}
  renderShell();
  const ready = init();
  await playIntro(document.getElementById('intro'));
  await ready;
  store.onContent(() => { versionCheck(); updateBadge(); if (current) { /* içerik değişti; görünür sayfayı tazele */ render(); } });
  store.onAuth((u) => { updateUserIcon(); if (u) document.getElementById('login')?.remove(); else if (!sessionStorage.getItem('arge.guest')) showLogin(); if (current) render(); });
  if (!store.user && !sessionStorage.getItem('arge.guest')) showLogin();
  updateUserIcon(); versionCheck();
  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = '#/';
  render();
  if ('serviceWorker' in navigator) {
    const cfg = isLive ? '?cfg=' + encodeURIComponent(JSON.stringify(FIREBASE_CONFIG)) : '';
    navigator.serviceWorker.register(BASE_PATH + 'sw.js' + cfg, { scope: BASE_PATH }).then((reg) => {
      // Yeni sürüm yüklendiğinde kullanıcıya haber ver
      reg.addEventListener('updatefound', () => { const w = reg.installing; w?.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) actionToast('Yeni sürüm hazır', 'Yenile', () => location.reload()); }); });
    }).catch(() => {});
  }
  window.addEventListener('online', () => toast('Bağlantı yeniden kuruldu'));
  window.addEventListener('offline', () => toast('Çevrim dışısınız; kayıtlı içerik gösteriliyor', 3000));
}
boot();
