// Ana sayfa, haberler, duyurular, bildirimler, favoriler, arama
import { icons, h, raw, el, esc, fmtDate, fmtRel, kalanGun, ymd, toast, skeletons, empty, share } from '../ui.js';
import { store, bildirim, social } from '../backend.js';
import { feeds } from '../feeds.js';
import { newsCard, videoCard, socialBar, commentsSection } from '../components.js';
import { YT_CHANNELS, FEED_SOURCES } from '../config.js';

// Web Speech API ile sesli okuma (tr-TR)
let speaking = null;
export function ttsButton(getText) {
  if (!('speechSynthesis' in window)) return '';
  const b = el(`<button class="btn sm ghost tts">${icons.volume} Sesli oku</button>`);
  b.onclick = () => {
    if (speaking) { speechSynthesis.cancel(); speaking = null; b.innerHTML = icons.volume + ' Sesli oku'; return; }
    const u = new SpeechSynthesisUtterance(getText().slice(0, 4000)); u.lang = 'tr-TR'; u.rate = 0.95;
    const v = speechSynthesis.getVoices().find(v => /^tr/i.test(v.lang)); if (v) u.voice = v;
    u.onend = u.onerror = () => { speaking = null; b.innerHTML = icons.volume + ' Sesli oku'; };
    speechSynthesis.cancel(); speechSynthesis.speak(u); speaking = u; b.innerHTML = icons.stop + ' Durdur';
  };
  window.addEventListener('hashchange', () => { if (speaking) { speechSynthesis.cancel(); speaking = null; } }, { once: true });
  return b;
}
import { go } from '../router.js';

function manualNews(c) { return (c.haberler || []).map(x => ({ id: x.id, title: x.baslik, summary: x.ozet, icerik: x.icerik, date: x.tarih, kaynak: x.kategori || 'Kurumsal', tur: 'haber', image: x.resim || '', manual: true })); }
async function allNews(c) {
  let remote = [];
  try { remote = (await feeds.all()).items || []; } catch (_) {}
  return [...manualNews(c), ...remote].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
}

export async function home(ctx) {
  const c = store.content;
  const gunun = (c.duyurular || []).find(d => d.id === c.gununDuyurusu) || (c.duyurular || [])[0];
  const u = store.user;
  const now = new Date(), hr = now.getHours();
  const selam = hr < 6 ? 'Hayırlı geceler' : hr < 12 ? 'Hayırlı sabahlar' : hr < 18 ? 'Hayırlı günler' : 'Hayırlı akşamlar';
  const bugun = (c.etkinlikler || []).filter(e => e.tarih.slice(0, 10) === ymd(now)).length;
  const yakin = (c.duyurular || []).filter(d => d.sonTarih && kalanGun(d.sonTarih) >= 0 && kalanGun(d.sonTarih) <= 14).length;
  const okunmamis = bildirim.unread();
  const adSoyad = u?.ad || 'Değerli Öğretmenimiz';
  ctx.root.innerHTML = `
    <div class="greet"><div><div class="hi">${selam},</div><div class="name">${esc(adSoyad.split(' ').slice(0, 2).join(' '))}</div></div>
      <div class="date"><b>${now.getDate()}</b>${fmtDate(now).split(' ').slice(1).join(' ')}<br>${['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][now.getDay()]}</div></div>
    <div class="today">
      <a href="#/takvim" style="background:var(--g-teal)">${icons.calendar}<b>${bugun}</b><span>Bugünkü etkinlik</span></a>
      <a href="#/duyurular" style="background:var(--g-gold)">${icons.clock}<b>${yakin}</b><span>Yaklaşan son tarih</span></a>
      <a href="#/bildirimler" style="background:var(--g-navy)">${icons.bell}<b>${okunmamis}</b><span>Yeni bildirim</span></a>
    </div>
    <div id="live-slot"></div>
    <section class="section"><div class="section-head"><h2>Manşet</h2><a href="#/haberler">Tüm haberler ${icons.chevron}</a></div><div id="manset"><div class="manset skeleton" style="box-shadow:none"></div></div></section>
    <section class="section"><div class="section-head"><h2>Hızlı erişim</h2></div>
      <div class="quick">${(c.hizliErisim || []).map(q => h`<a href="${q.rota}" data-c="${q.renk || 'slate'}"><span class="ic">${raw(icons[q.ikon] || icons.grid)}</span>${q.ad}</a>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Öne çıkanlar</h2></div>
      <div class="banner-wrap" id="banners">${(c.bannerlar || []).map(b => h`<a class="banner" href="${b.rota}" style="background:${b.renk}"><span class="chip light">Duyuru</span><h3>${b.baslik}</h3><p>${b.alt}</p></a>`).join('')}</div>
      <div class="dots">${(c.bannerlar || []).map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div></section>
    ${gunun ? h`<section class="section"><div class="section-head"><h2>Günün duyurusu</h2><a href="#/duyurular">Tümü ${raw(icons.chevron)}</a></div>
      <a class="card ann tap ${gunun.onemli ? 'onemli' : ''} ${gunun.acil ? 'acil' : ''}" href="#/duyurular/${gunun.id}"><div class="tags">${gunun.resmi ? raw('<span class="chip navy">Resmî</span>') : ''}${gunun.onemli ? raw('<span class="chip meb">Önemli</span>') : ''}${gunun.acil ? raw('<span class="chip meb">Acil</span>') : ''}</div><h3>${gunun.baslik}</h3><p>${gunun.ozet}</p>${gunun.sonTarih ? raw(deadlineHtml(gunun.sonTarih)) : ''}</a></section>` : ''}
    <section class="section"><div class="section-head"><h2>Son haberler</h2><a href="#/haberler">Tümü ${icons.chevron}</a></div><div class="card-list" id="home-news">${skeletons(3)}</div></section>
    <section class="section"><div class="section-head"><h2>Kocaeli MEM TV</h2><a href="#/tv">Tümü ${icons.chevron}</a></div><div class="card-list" id="home-video"><div class="card video"><div class="thumb skeleton"></div></div></div></section>
    <section class="section"><div class="section-head"><h2>Yaklaşan etkinlikler</h2><a href="#/takvim">Takvim ${icons.chevron}</a></div><div class="card">${upcoming(c).map(e => h`<a class="event tap" href="#/takvim?g=${e.tarih.slice(0, 10)}"><div class="when"><b>${new Date(e.tarih).getDate()}</b><span>${fmtDate(e.tarih).split(' ')[1].slice(0, 3)}</span><small>${e.tarih.slice(11, 16)}</small></div><div><h3>${e.baslik}</h3><p>${e.yer} · ${e.tur}</p></div></a>`).join('') || empty('Yaklaşan etkinlik yok', 'calendar')}</div></section>`;
  const bw = ctx.root.querySelector('#banners'), dots = ctx.root.querySelectorAll('.dots i');
  bw?.addEventListener('scroll', () => { const i = Math.round(bw.scrollLeft / (bw.firstElementChild?.offsetWidth + 12 || 1)); dots.forEach((d, k) => d.classList.toggle('on', k === i)); }, { passive: true });
  let auto = setInterval(() => { if (!document.contains(bw)) return clearInterval(auto); const w = (bw.firstElementChild?.offsetWidth || 0) + 12; const next = (Math.round(bw.scrollLeft / w) + 1) % (c.bannerlar?.length || 1); bw.scrollTo({ left: next * w, behavior: 'smooth' }); }, 5000);
  allNews(c).then(items => {
    const m = ctx.root.querySelector('#manset'); const hero = items.find(i => i.image) || items[0];
    if (m) m.innerHTML = hero ? h`<a class="manset tap" href="#/haberler/${encodeURIComponent(hero.id)}">${hero.image ? raw(`<img src="${esc(hero.image)}" alt="" referrerpolicy="no-referrer">`) : ''}<div class="tx"><span class="chip light">${hero.kaynak}${hero.date ? ' · ' + fmtRel(hero.date) : ''}</span><h3>${hero.title}</h3><p>${hero.summary || ''}</p></div></a>` : '';
    const n = ctx.root.querySelector('#home-news'); if (n) n.innerHTML = items.length ? items.filter(i => i !== hero).slice(0, 5).map(i => newsCard(i)).join('') : empty('Haber yüklenemedi');
  });
  feeds.live(YT_CHANNELS.map(k => k.id)).then(d => { const l = (d.items || []).find(x => x.live); const slot = ctx.root.querySelector('#live-slot'); if (!l || !slot) return; const ch = YT_CHANNELS.find(k => k.id === l.channelId); slot.innerHTML = `<a class="card live-card tap" href="#/tv/${esc(l.videoId)}" style="margin-bottom:22px"><span class="live-badge"><i></i>CANLI</span><b>${esc(ch?.ad || '')}</b><span>${esc(l.title || 'Canlı yayın sürüyor')}</span>${icons.chevron}</a>`; }).catch(() => {});
  feeds.channel(YT_CHANNELS[0].id).then(d => { const n = ctx.root.querySelector('#home-video'); if (n) n.innerHTML = (d.items || []).slice(0, 2).map(videoCard).join(''); }).catch(() => { const n = ctx.root.querySelector('#home-video'); if (n) n.innerHTML = empty('Video yüklenemedi', 'play'); });
}
function upcoming(c) { const now = Date.now(); return (c.etkinlikler || []).filter(e => new Date(e.bitis || e.tarih).getTime() >= now - 3600e3).sort((a, b) => a.tarih.localeCompare(b.tarih)).slice(0, 3); }
export function deadlineHtml(sonTarih) {
  const k = kalanGun(sonTarih);
  if (k === null) return '';
  const cls = k < 0 ? 'gecmis' : k <= 7 ? 'yakin' : '';
  const txt = k < 0 ? 'Süresi doldu' : k === 0 ? 'Son gün bugün' : `Son ${k} gün`;
  return `<div class="deadline ${cls}">${icons.clock}<span>${txt} · ${fmtDate(sonTarih)}</span></div>`;
}

export async function haberler(ctx) {
  ctx.title('Haberler');
  const c = store.content;
  const cats = ['Tümü', 'Favoriler', ...FEED_SOURCES.map(s => s.ad), 'Kurumsal'];
  let cat = ctx.query.k || 'Tümü', q = '';
  ctx.root.innerHTML = `<div class="search">${icons.search}<input type="search" placeholder="Haber ara…" aria-label="Haber ara"></div>
    <div class="chips">${cats.map(k => `<button class="chip ${k === cat ? 'on' : ''}" data-k="${esc(k)}">${esc(k)}</button>`).join('')}</div>
    <div class="notice" id="feed-note" hidden></div><div class="card-list" id="list">${skeletons(5)}</div>`;
  let items = [];
  const render = () => {
    const n = ctx.root.querySelector('#list'); if (!n) return;
    const ql = q.toLocaleLowerCase('tr-TR');
    const f = items.filter(i => (cat === 'Tümü' || (cat === 'Favoriler' ? store.me.favoriler.includes(i.id) : i.kaynak === cat)) && (!ql || (i.title + ' ' + (i.summary || '')).toLocaleLowerCase('tr-TR').includes(ql)));
    n.innerHTML = f.length ? f.slice(0, 60).map(i => newsCard(i)).join('') : empty(cat === 'Favoriler' ? 'Henüz favori haber yok' : 'Sonuç bulunamadı', 'news');
  };
  ctx.root.querySelector('input').addEventListener('input', (e) => { q = e.target.value; render(); });
  ctx.root.querySelectorAll('.chips .chip').forEach(b => b.addEventListener('click', () => { cat = b.dataset.k; ctx.root.querySelectorAll('.chips .chip').forEach(x => x.classList.toggle('on', x === b)); render(); }));
  try { const d = await feeds.all(); items = [...manualNews(c), ...(d.items || [])].sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))); const note = ctx.root.querySelector('#feed-note'); if (d.stale) { note.hidden = false; note.textContent = 'Çevrim dışı: en son kaydedilen haberler gösteriliyor.'; } else if (d.errors?.length) { note.hidden = false; note.textContent = 'Bazı kaynaklara ulaşılamadı: ' + d.errors.map(e => e.source).join(', '); } }
  catch (_) { items = manualNews(c); const note = ctx.root.querySelector('#feed-note'); note.hidden = false; note.className = 'notice warn'; note.textContent = 'Haber kaynağına ulaşılamadı. Sunucu uç noktası (/api/arge-feed) yayınlandığında canlı haberler gelir.'; }
  render();
}

export async function haberDetay(ctx) {
  ctx.title('Haber');
  const id = ctx.params.id;
  const c = store.content;
  ctx.root.innerHTML = `<div class="card article"><div class="skeleton" style="height:200px;border-radius:0"></div><div class="body"><div class="skeleton" style="height:22px;margin:8px 0"></div><div class="skeleton" style="height:14px;margin:6px 0"></div></div></div>`;
  let item = manualNews(c).find(x => x.id === id);
  if (!item) { try { item = ((await feeds.all()).items || []).find(x => x.id === id); } catch (_) {} }
  if (!item) { ctx.root.innerHTML = empty('Haber bulunamadı'); return; }
  let detail = null;
  if (!item.manual && item.link) { try { detail = await feeds.detail(item.link); } catch (_) {} }
  const title = detail?.title || item.title, image = detail?.image || item.image, date = detail?.date || (item.date ? fmtDate(item.date, { saat: true }) : '');
  const body = item.manual ? esc(item.icerik || item.summary).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') : (detail?.html || esc(item.summary));
  const card = el(`<div class="card article">${image ? `<img class="hero" src="${esc(image)}" alt="" referrerpolicy="no-referrer">` : ''}<div class="body"><h1>${esc(title)}</h1>
    <div class="meta"><span class="chip ${item.kaynak === 'MEB' ? 'navy' : 'meb'}">${esc(item.kaynak)}</span>${date ? `<span>${esc(date)}</span>` : ''}${detail?.sourceViews ? `<span>${icons.eye} ${detail.sourceViews} okunma (kaynak)</span>` : ''}</div>
    ${detail?.sub ? `<p class="lead">${esc(detail.sub)}</p>` : ''}<div class="content"><p>${body}</p></div>
    ${item.link ? `<p><a class="btn sm ghost" href="${esc(item.link)}" target="_blank" rel="noopener">${icons.external} Kaynakta aç</a></p>` : ''}</div></div>`);
  const url = item.link || location.href;
  const tts = ttsButton(() => title + '. ' + card.querySelector('.content').textContent); if (tts) card.querySelector('.body').appendChild(tts);
  card.appendChild(socialBar(item.id, { title, url }));
  card.appendChild(commentsSection(item.id));
  ctx.root.innerHTML = ''; ctx.root.appendChild(card);
}

export async function duyurular(ctx) {
  ctx.title('Duyurular');
  const c = store.content;
  let filtre = 'hepsi';
  const render = () => {
    let list = (c.duyurular || []).slice().sort((a, b) => b.tarih.localeCompare(a.tarih));
    if (filtre === 'onemli') list = list.filter(d => d.onemli);
    if (filtre === 'acil') list = list.filter(d => d.acil);
    if (filtre === 'sontarih') list = list.filter(d => d.sonTarih && kalanGun(d.sonTarih) >= 0).sort((a, b) => a.sonTarih.localeCompare(b.sonTarih));
    ctx.root.querySelector('#list').innerHTML = list.map(d => h`<a class="card ann tap ${d.onemli ? 'onemli' : ''} ${d.acil ? 'acil' : ''}" href="#/duyurular/${d.id}">
      <div class="tags">${d.resmi ? raw('<span class="chip navy">Resmî</span>') : ''}${d.acil ? raw('<span class="chip meb">Acil</span>') : ''}${d.onemli ? raw('<span class="chip meb">Önemli</span>') : ''}${raw((d.etiketler || []).map(t => `<span class="chip">${esc(t)}</span>`).join(''))}</div>
      <h3>${d.baslik}</h3><p>${d.ozet}</p><div style="font-size:12px;color:var(--muted);margin-top:8px">${fmtDate(d.tarih)}</div>${d.sonTarih ? raw(deadlineHtml(d.sonTarih)) : ''}</a>`).join('') || empty('Duyuru yok', 'megaphone');
  };
  ctx.root.innerHTML = `<div class="chips">${[['hepsi', 'Tümü'], ['onemli', 'Önemli'], ['acil', 'Acil'], ['sontarih', 'Son tarihler']].map(([k, v]) => `<button class="chip ${k === filtre ? 'on' : ''}" data-f="${k}">${v}</button>`).join('')}</div><div class="card-list" id="list"></div>`;
  ctx.root.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => { filtre = b.dataset.f; ctx.root.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b)); render(); }));
  render();
}

export async function duyuruDetay(ctx) {
  ctx.title('Duyuru');
  const d = (store.content.duyurular || []).find(x => x.id === ctx.params.id);
  if (!d) { ctx.root.innerHTML = empty('Duyuru bulunamadı'); return; }
  const card = el(`<div class="card article ann ${d.onemli ? 'onemli' : ''} ${d.acil ? 'acil' : ''}" style="padding:0"><div class="body"><div class="tags" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">${d.resmi ? '<span class="chip navy">Resmî duyuru</span>' : ''}${d.acil ? '<span class="chip meb">Acil</span>' : ''}${d.onemli ? '<span class="chip meb">Önemli</span>' : ''}</div>
    <h1>${esc(d.baslik)}</h1><div class="meta"><span>${fmtDate(d.tarih, { gun: true })}</span></div><div class="content"><p>${esc(d.icerik || d.ozet).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p></div>${d.sonTarih ? deadlineHtml(d.sonTarih) : ''}
    ${d.sonTarih ? `<div class="btn-row" style="margin-top:12px"><button class="btn sm" id="remind">${icons.bell} Son tarihi hatırlat</button><a class="btn sm" id="ics" href="#">${icons.calendar} Takvime ekle</a></div>` : ''}${d.link ? `<p><a class="btn sm ghost" href="${esc(d.link)}" target="_blank" rel="noopener">${icons.external} Bağlantı</a></p>` : ''}</div></div>`);
  const tts = ttsButton(() => d.baslik + '. ' + (d.icerik || d.ozet)); if (tts) card.querySelector('.body').appendChild(tts);
  card.appendChild(socialBar(d.id, { title: d.baslik }));
  card.appendChild(commentsSection(d.id));
  ctx.root.innerHTML = ''; ctx.root.appendChild(card);
  card.querySelector('#remind')?.addEventListener('click', async () => {
    const r = store.me; const k = 'hatirlat:' + d.id;
    if (!r.okunan.includes(k)) { r.okunan.push(k); }
    await bildirim.send({ baslik: 'Hatırlatma: ' + d.baslik, metin: 'Son tarih: ' + fmtDate(d.sonTarih), konu: 'duyuru', rota: '#/duyurular/' + d.id, kisisel: store.user?.uid || null });
    toast('Hatırlatma bildirimlerinize eklendi');
  });
  card.querySelector('#ics')?.addEventListener('click', (e) => { e.preventDefault(); downloadIcs({ baslik: d.baslik, tarih: d.sonTarih + 'T09:00', bitis: d.sonTarih + 'T17:00', yer: 'Kocaeli MEM AR-GE', aciklama: d.ozet }); });
}

export function downloadIcs(e) {
  const f = (s) => s.replace(/[-:]/g, '').replace(/\.\d+/, '');
  const dt = (v) => f(new Date(v).toISOString()).slice(0, 15) + 'Z';
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kocaeli MEM AR-GE//TR', 'BEGIN:VEVENT', `UID:${Date.now()}@kocaeli-arge`, `DTSTAMP:${dt(new Date())}`, `DTSTART:${dt(e.tarih)}`, `DTEND:${dt(e.bitis || e.tarih)}`, `SUMMARY:${e.baslik}`, `LOCATION:${e.yer || ''}`, `DESCRIPTION:${(e.aciklama || '').replace(/\n/g, '\\n')}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics); a.download = 'etkinlik.ics'; a.click();
  const g = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.baslik)}&dates=${dt(e.tarih)}/${dt(e.bitis || e.tarih)}&location=${encodeURIComponent(e.yer || '')}&details=${encodeURIComponent(e.aciklama || '')}`;
  toast('Takvim dosyası indirildi'); setTimeout(() => { if (confirm('Google Takvim\'e de eklemek ister misiniz?')) window.open(g, '_blank', 'noopener'); }, 400);
}

export async function bildirimler(ctx) {
  ctx.title('Bildirimler');
  const list = bildirim.list().filter(n => !n.kisisel || n.kisisel === store.user?.uid);
  ctx.root.innerHTML = `<div class="section-head"><h2>Son bildirimler</h2><button id="all">Tümünü okundu say</button></div><div class="card">${list.map(n => h`<a class="row tap" href="${n.rota || '#/'}" data-id="${n.id}" style="${n.okundu ? 'opacity:.65' : ''}"><span class="ic" style="${n.okundu ? '' : 'background:var(--meb-soft);color:var(--meb)'}">${raw(icons[n.konu === 'etkinlik' ? 'calendar' : n.konu === 'haber' ? 'news' : n.konu === 'canli' ? 'live' : 'megaphone'])}</span><span class="tx"><b>${n.baslik}</b><span>${n.metin}</span><span style="font-size:11px">${fmtRel(n.tarih)}</span></span></a>`).join('') || empty('Bildirim yok', 'bell')}</div>`;
  ctx.root.querySelectorAll('[data-id]').forEach(a => a.addEventListener('click', () => bildirim.read(a.dataset.id)));
  ctx.root.querySelector('#all').addEventListener('click', () => { bildirim.readAll(); bildirimler(ctx); });
}

export async function favoriler(ctx) {
  ctx.title('Favoriler');
  const c = store.content; const favs = store.me.favoriler;
  ctx.root.innerHTML = `<div class="card-list" id="list">${skeletons(2)}</div>`;
  let news = []; try { news = ((await feeds.all()).items || []); } catch (_) {}
  const items = [...manualNews(c), ...news].filter(i => favs.includes(i.id));
  const duy = (c.duyurular || []).filter(d => favs.includes(d.id));
  const vids = favs.filter(f => f.startsWith('v')).map(f => f.slice(1));
  const n = ctx.root.querySelector('#list');
  n.innerHTML = (duy.map(d => h`<a class="card ann tap" href="#/duyurular/${d.id}"><h3>${d.baslik}</h3><p>${d.ozet}</p></a>`).join('') + items.map(i => newsCard(i)).join('') + vids.map(v => `<a class="card video tap" href="#/tv/${esc(v)}"><div class="thumb"><img src="https://i.ytimg.com/vi/${esc(v)}/hqdefault.jpg" alt=""><div class="play"><i>${icons.play}</i></div></div></a>`).join('')) || empty('Henüz favori eklemediniz. Haber, duyuru ve videoları yıldızlayarak burada toplayın.', 'star');
}
