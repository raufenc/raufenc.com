// Etkinlik takvimi, ilçe AR-GE birimleri, anketler, yapay zekâ asistanı, iletişim, hesap, menü
import { icons, h, raw, el, esc, fmtDate, fmtAy, fmtRel, fmtSayi, ymd, GUNLER_K, toast, empty, md, sheet, share } from '../ui.js';
import { store, auth, anket as anketApi, bildirim, push, isLive } from '../backend.js';
import { listRow } from '../components.js';
import { feeds } from '../feeds.js';
import { downloadIcs } from './home.js';
import { API, APP_VERSION, NOTIFICATION_TOPICS, YT_CHANNELS } from '../config.js';
import { go } from '../router.js';

export async function takvim(ctx) {
  ctx.title('Etkinlik Takvimi');
  const evs = (store.content.etkinlikler || []).slice().sort((a, b) => a.tarih.localeCompare(b.tarih));
  let mode = ctx.query.m || 'ay';
  let sel = ctx.query.g ? new Date(ctx.query.g) : new Date();
  let cur = new Date(sel.getFullYear(), sel.getMonth(), 1);
  ctx.root.innerHTML = `<div class="seg">${[['gun', 'Günlük'], ['hafta', 'Haftalık'], ['ay', 'Aylık']].map(([k, v]) => `<button data-m="${k}" class="${k === mode ? 'on' : ''}">${v}</button>`).join('')}</div><div id="cal"></div><div id="list" style="margin-top:12px"></div>`;
  const cal = ctx.root.querySelector('#cal'), list = ctx.root.querySelector('#list');
  const inDay = (e, d) => e.tarih.slice(0, 10) === ymd(d);
  const evCard = (e) => h`<div class="event"><div class="when"><b>${new Date(e.tarih).getDate()}</b><span>${fmtDate(e.tarih).split(' ')[1].slice(0, 3)}</span><small>${e.tarih.slice(11, 16)}</small></div><div><h3>${e.baslik}</h3><p>${e.yer} · ${e.tur} · ${e.ilce}</p><p>${e.aciklama || ''}</p><div class="btn-row" style="margin-top:8px"><button class="btn sm" data-ics="${e.id}">${raw(icons.calendar)} Takvime ekle</button><button class="btn sm ghost" data-sh="${e.id}">${raw(icons.share)}</button></div></div></div>`;
  const bind = () => { list.querySelectorAll('[data-ics]').forEach(b => b.addEventListener('click', () => downloadIcs(evs.find(e => e.id === b.dataset.ics)))); list.querySelectorAll('[data-sh]').forEach(b => b.addEventListener('click', () => { const e = evs.find(x => x.id === b.dataset.sh); share({ title: e.baslik, text: `${e.baslik} – ${fmtDate(e.tarih, { saat: true })} – ${e.yer}` }); })); };
  const render = () => {
    if (mode === 'ay') {
      const first = new Date(cur), start = (first.getDay() + 6) % 7, days = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();
      const cells = [];
      for (let i = 0; i < start; i++) cells.push('<div class="day off"></div>');
      for (let d = 1; d <= days; d++) { const dt = new Date(cur.getFullYear(), cur.getMonth(), d); const n = evs.filter(e => inDay(e, dt)).length; cells.push(`<button class="day ${ymd(dt) === ymd(new Date()) ? 'today' : ''} ${ymd(dt) === ymd(sel) ? 'sel' : ''}" data-d="${ymd(dt)}">${d}<span class="d">${'<i></i>'.repeat(Math.min(n, 3))}</span></button>`); }
      cal.innerHTML = `<div class="card pad"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><button class="icon-btn" id="prev">${icons.back}</button><b>${fmtAy(cur)}</b><button class="icon-btn" id="next" style="transform:scaleX(-1)">${icons.back}</button></div><div class="cal-grid">${GUNLER_K.map(g => `<div class="dow">${g}</div>`).join('')}${cells.join('')}</div></div>`;
      cal.querySelector('#prev').onclick = () => { cur = new Date(cur.getFullYear(), cur.getMonth() - 1, 1); render(); };
      cal.querySelector('#next').onclick = () => { cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1); render(); };
      cal.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { sel = new Date(b.dataset.d); render(); });
      const dayEv = evs.filter(e => inDay(e, sel));
      const monthEv = evs.filter(e => e.tarih.slice(0, 7) === ymd(cur).slice(0, 7));
      list.innerHTML = `<h2 style="font-size:15px;margin:0 0 8px">${fmtDate(sel, { gun: true })}</h2><div class="card">${dayEv.map(evCard).join('') || empty('Bu gün etkinlik yok', 'calendar')}</div><h2 style="font-size:15px;margin:16px 0 8px">${fmtAy(cur)} · tüm etkinlikler</h2><div class="card">${monthEv.map(evCard).join('') || empty('Bu ay etkinlik yok', 'calendar')}</div>`;
    } else if (mode === 'hafta') {
      const monday = new Date(sel); monday.setDate(sel.getDate() - ((sel.getDay() + 6) % 7));
      const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return d; });
      cal.innerHTML = `<div class="card pad"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><button class="icon-btn" id="prev">${icons.back}</button><b>${fmtDate(days[0])} – ${fmtDate(days[6])}</b><button class="icon-btn" id="next" style="transform:scaleX(-1)">${icons.back}</button></div><div class="cal-grid">${days.map(d => `<button class="day ${ymd(d) === ymd(new Date()) ? 'today' : ''} ${ymd(d) === ymd(sel) ? 'sel' : ''}" data-d="${ymd(d)}">${d.getDate()}<span class="d">${'<i></i>'.repeat(Math.min(evs.filter(e => inDay(e, d)).length, 3))}</span></button>`).join('')}</div></div>`;
      cal.querySelector('#prev').onclick = () => { sel = new Date(sel); sel.setDate(sel.getDate() - 7); render(); };
      cal.querySelector('#next').onclick = () => { sel = new Date(sel); sel.setDate(sel.getDate() + 7); render(); };
      cal.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { sel = new Date(b.dataset.d); render(); });
      const wk = evs.filter(e => days.some(d => inDay(e, d)));
      list.innerHTML = `<div class="card">${wk.map(evCard).join('') || empty('Bu hafta etkinlik yok', 'calendar')}</div>`;
    } else {
      cal.innerHTML = `<div class="card pad" style="display:flex;justify-content:space-between;align-items:center"><button class="icon-btn" id="prev">${icons.back}</button><b>${fmtDate(sel, { gun: true })}</b><button class="icon-btn" id="next" style="transform:scaleX(-1)">${icons.back}</button></div>`;
      cal.querySelector('#prev').onclick = () => { sel = new Date(sel); sel.setDate(sel.getDate() - 1); render(); };
      cal.querySelector('#next').onclick = () => { sel = new Date(sel); sel.setDate(sel.getDate() + 1); render(); };
      const dayEv = evs.filter(e => inDay(e, sel));
      const next = evs.filter(e => e.tarih > ymd(sel) + 'T23:59').slice(0, 5);
      list.innerHTML = `<div class="card">${dayEv.map(evCard).join('') || empty('Bu gün etkinlik yok', 'calendar')}</div><h2 style="font-size:15px;margin:16px 0 8px">Sonraki etkinlikler</h2><div class="card">${next.map(evCard).join('') || empty('Yaklaşan etkinlik yok', 'calendar')}</div>`;
    }
    bind();
  };
  ctx.root.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; ctx.root.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b)); render(); }));
  render();
}

export async function ilceler(ctx) {
  ctx.title('İlçe AR-GE Birimleri');
  const list = store.content.ilceler || [];
  ctx.root.innerHTML = `<p class="lead">Kocaeli'nin 12 ilçesindeki AR-GE birimleri, iletişim bilgileri ve faaliyetleri.</p><div class="card">${list.map(i => listRow({ icon: 'building', title: i.ad, sub: i.telefon || i.eposta, href: `#/ilceler/${i.id}` })).join('')}</div>`;
}
export async function ilceDetay(ctx) {
  const i = (store.content.ilceler || []).find(x => x.id === ctx.params.id);
  if (!i) { ctx.root.innerHTML = empty('İlçe bulunamadı'); return; }
  ctx.title(i.ad + ' AR-GE');
  ctx.root.innerHTML = `<div class="card pad"><h1 style="font-size:20px;margin:0 0 4px">${esc(i.ad)} İlçe Millî Eğitim Müdürlüğü</h1><div style="color:var(--text-2);font-size:13.5px;margin-bottom:12px">${esc(i.sorumlu)}</div>
    <div class="card" style="box-shadow:none">${i.telefon ? listRow({ icon: 'phone', title: i.telefon, sub: 'Santral', href: 'tel:' + i.telefon.replace(/\s/g, '') }) : ''}${listRow({ icon: 'mail', title: i.eposta, sub: 'Kurumsal e-posta', href: 'mailto:' + i.eposta })}${listRow({ icon: 'globe', title: i.web.replace('https://', ''), sub: 'İlçe web sitesi', href: i.web })}</div>
    <h2 style="font-size:15px;margin:16px 0 8px">İlçe faaliyetleri</h2><ul style="margin:0;padding-left:18px;font-size:13.5px">${(i.faaliyetler || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <h2 style="font-size:15px;margin:16px 0 8px">İlçe haberleri</h2><div class="btn-row"><a class="btn sm" href="#/haberler?k=Kocaeli%20İl%20MEM">${icons.news} İl haberlerinde ${esc(i.ad)}</a><a class="btn sm ghost" href="${esc(i.web)}" target="_blank" rel="noopener">${icons.external} İlçe sitesi</a></div></div>`;
  ctx.root.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
}

export async function anketler(ctx) {
  ctx.title('Anket Sistemi');
  const list = store.content.anketler || [];
  ctx.root.innerHTML = `<div class="card-list">${list.map(a => h`<a class="card pad tap" href="#/anketler/${a.id}"><div class="pill-row" style="margin-bottom:6px"><span class="chip ${a.aktif ? 'teal' : ''}">${a.aktif ? 'Açık' : 'Kapandı'}</span>${anketApi.cevapladi(a.id) ? raw('<span class="chip navy">Katıldınız</span>') : ''}</div><h3 style="margin:0 0 4px;font-size:15px">${a.baslik}</h3><p style="margin:0;font-size:13px;color:var(--text-2)">${a.aciklama}</p><div style="font-size:12px;color:var(--muted);margin-top:6px">${a.sorular.length} soru · Son: ${fmtDate(a.bitis)}</div></a>`).join('') || empty('Anket yok', 'chart')}</div>`;
}
export async function anketDetay(ctx) {
  const a = (store.content.anketler || []).find(x => x.id === ctx.params.id);
  if (!a) { ctx.root.innerHTML = empty('Anket bulunamadı'); return; }
  ctx.title('Anket');
  const done = anketApi.cevapladi(a.id) || !a.aktif || ctx.query.s === '1';
  if (done) {
    const r = await anketApi.sonuc(a);
    ctx.root.innerHTML = `<div class="card pad"><h1 style="font-size:18px;margin:0 0 4px">${esc(a.baslik)}</h1><div class="stat-grid" style="margin:10px 0 14px"><div class="stat"><b>${fmtSayi(r.katilim)}</b><span>Katılımcı</span></div><div class="stat"><b>${a.sorular.length}</b><span>Soru</span></div><div class="stat"><b>${a.aktif ? 'Açık' : 'Kapalı'}</b><span>Durum</span></div></div>
      ${a.sorular.map(s => { const m = r.sayim[s.id] || {}; const tot = Object.values(m).reduce((x, y) => x + y, 0) || 1; const keys = s.tip === 'olcek' ? ['1', '2', '3', '4', '5'] : (s.secenekler || Object.keys(m)); return `<h3 style="font-size:14px;margin:14px 0 8px">${esc(s.metin)}</h3>${s.tip === 'acik' ? `<p style="font-size:13px;color:var(--text-2)">${Object.keys(m).length} açık uçlu cevap</p>` : `<div class="bar-list">${keys.map(k => `<div class="bar"><div class="lbl"><span>${esc(s.tip === 'olcek' ? ['', 'Hiç', 'Az', 'Orta', 'Çok', 'Tamamen'][k] : k)}</span><span>%${Math.round((m[k] || 0) / tot * 100)} · ${m[k] || 0}</span></div><div class="trk"><i style="width:${(m[k] || 0) / tot * 100}%"></i></div></div>`).join('')}</div>`}`; }).join('')}
      ${!anketApi.cevapladi(a.id) && a.aktif ? `<a class="btn primary block" style="margin-top:16px" href="#/anketler/${a.id}">Ankete katıl</a>` : ''}</div>`;
    return;
  }
  ctx.root.innerHTML = `<div class="card pad"><h1 style="font-size:18px;margin:0 0 4px">${esc(a.baslik)}</h1><p class="lead" style="margin:0 0 14px">${esc(a.aciklama)}</p><form id="af">${a.sorular.map((s, i) => `<div style="margin-bottom:16px"><div style="font-weight:700;font-size:14px;margin-bottom:8px">${i + 1}. ${esc(s.metin)}</div>${s.tip === 'olcek' ? `<div class="pill-row">${[1, 2, 3, 4, 5].map(v => `<label class="chip" style="padding:8px 14px;cursor:pointer"><input type="radio" name="${s.id}" value="${v}" required style="margin:0 4px 0 0">${v}</label>`).join('')}</div><div style="font-size:11px;color:var(--muted);margin-top:4px">1: Hiç · 5: Tamamen</div>` : s.tip === 'acik' ? `<textarea name="${s.id}" maxlength="500"></textarea>` : (s.secenekler || []).map(o => `<label class="switch" style="padding:8px 0"><span>${esc(o)}</span><input type="${s.tip === 'coklu' ? 'checkbox' : 'radio'}" name="${s.id}" value="${esc(o)}" ${s.tip === 'tek' ? 'required' : ''} style="appearance:auto;width:18px;height:18px"></label>`).join('')}</div>`).join('')}
    <button class="btn primary block" type="submit">${icons.check} Gönder</button><a class="btn ghost block" style="margin-top:8px" href="#/anketler/${a.id}?s=1">Sonuçları gör</a></form></div>`;
  ctx.root.querySelector('#af').addEventListener('submit', async (e) => {
    e.preventDefault(); if (!store.user) return toast('Ankete katılmak için giriş yapın');
    const fd = new FormData(e.target); const cevaplar = {};
    a.sorular.forEach(s => { const v = fd.getAll(s.id); cevaplar[s.id] = s.tip === 'coklu' ? v : (v[0] || ''); });
    try { await anketApi.submit(a, cevaplar); toast('Cevabınız kaydedildi, teşekkürler'); anketDetay(ctx); } catch (_) { toast('Cevap kaydedilemedi'); }
  });
}

const MODES = [['arge', 'AR-GE Asistanı', 'flask'], ['proje', 'Proje önerileri', 'sparkles'], ['yazi', 'Yazı hazırlama', 'edit'], ['etkinlik', 'Etkinlik planlama', 'calendar']];
const chatLog = [];
export async function asistan(ctx) {
  ctx.title('Yapay Zekâ Asistanı');
  let mode = ctx.query.m || 'arge';
  ctx.root.innerHTML = `<div class="notice">Asistan genel bilgi verir; tarih, mevzuat ve kontenjan bilgilerini resmî duyurularla teyit ediniz. Kişisel veri paylaşmayınız; mesajlar yapay zekâ servisine iletilir.</div>
    <div class="modes">${MODES.map(([k, v, i]) => `<button data-m="${k}" class="${k === mode ? 'on' : ''}">${icons[i]}${v}</button>`).join('')}</div>
    <div class="chat" id="chat"></div>
    <form class="chat-input" id="cf"><input type="text" placeholder="Sorunuzu yazın…" maxlength="2000" autocomplete="off"><button type="submit" aria-label="Gönder">${icons.send}</button></form>`;
  const chat = ctx.root.querySelector('#chat'), form = ctx.root.querySelector('#cf'), input = form.querySelector('input');
  const add = (role, text) => { const m = el(`<div class="msg ${role}">${role === 'bot' ? md(text) : esc(text)}</div>`); chat.appendChild(m); m.scrollIntoView({ behavior: 'smooth', block: 'end' }); return m; };
  if (!chatLog.length) add('bot', `Merhaba${store.user ? ' ' + store.user.ad.split(' ')[0] : ''}! Ben Kocaeli MEM AR-GE Asistanı. Proje fikri, yazı taslağı, etkinlik planı veya AR-GE süreçleri hakkında yardımcı olabilirim.\n\nÖrnek: **"5. sınıflar için TÜBİTAK 4006 bilim fuarı proje fikirleri"**`);
  chatLog.forEach(m => add(m.role === 'user' ? 'user' : 'bot', m.content));
  ctx.root.querySelectorAll('.modes button').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; ctx.root.querySelectorAll('.modes button').forEach(x => x.classList.toggle('on', x === b)); input.placeholder = { arge: 'AR-GE süreçleri hakkında sorun…', proje: 'Branş, sınıf ve hedef yazın…', yazi: 'Hangi yazıyı hazırlayalım?', etkinlik: 'Etkinliğin amacı ve kitlesi…' }[mode]; input.focus(); }));
  async function send(text) {
    add('user', text); chatLog.push({ role: 'user', content: text });
    const t = add('bot', ''); t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    try {
      const r = await fetch(API.asistan, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, messages: chatLog.slice(-12), profil: store.user ? { brans: store.user.brans, ilce: store.user.ilce } : null }) });
      const d = await r.json();
      const reply = d.reply || 'Yanıt alınamadı.';
      t.innerHTML = md(reply); chatLog.push({ role: 'assistant', content: reply });
    } catch (_) { t.innerHTML = md('Asistana şu anda ulaşılamıyor. Sunucu uç noktası (/api/arge-asistan) yayınlanınca yanıt verir.'); }
    t.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value.trim(); if (!v) return; input.value = ''; send(v); });
  if (ctx.query.q && !chatLog.some(m => m.content === ctx.query.q)) send(ctx.query.q);
}

export async function iletisim(ctx) {
  ctx.title('Kurumsal İletişim');
  const i = store.content.iletisim || {};
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(i.adres || 'Kocaeli İl Milli Eğitim Müdürlüğü')}`;
  ctx.root.innerHTML = `<div class="card pad" style="background:var(--navy);color:#fff;border:0"><div style="font-size:12px;opacity:.8">T.C. Kocaeli Valiliği</div><h1 style="font-size:19px;margin:2px 0 6px">${esc(i.kurum)}</h1><div style="font-size:13px;opacity:.9">${esc(i.adres)}</div><div style="font-size:12px;opacity:.75;margin-top:4px">${esc(i.ekBina || '')}</div></div>
    <div class="card" style="margin-top:12px">${listRow({ icon: 'phone', title: i.telefon, sub: 'Santral', href: 'tel:' + (i.telefon || '').replace(/\s/g, '') })}${i.telefon2 ? listRow({ icon: 'phone', title: i.telefon2, sub: 'Santral 2', href: 'tel:' + i.telefon2.replace(/\s/g, '') }) : ''}${listRow({ icon: 'mail', title: i.eposta, sub: 'E-posta', href: 'mailto:' + i.eposta })}${listRow({ icon: 'map', title: 'Haritada göster', sub: 'Yol tarifi al', href: maps })}${listRow({ icon: 'globe', title: 'kocaeli.meb.gov.tr', sub: 'İl MEM web sitesi', href: i.web })}${listRow({ icon: 'flask', title: 'kocaeliarge.meb.gov.tr', sub: 'AR-GE Birimi web sitesi', href: i.argeWeb })}${listRow({ icon: 'youtube', title: 'Kocaeli MEM TV', sub: 'YouTube kanalı', href: i.sosyal?.youtube })}</div>
    <div class="card pad" style="margin-top:12px;padding:0;overflow:hidden"><iframe title="Harita" src="https://www.google.com/maps?q=${encodeURIComponent(i.adres || '')}&output=embed&hl=tr" style="width:100%;height:220px;border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
  ctx.root.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
}

export async function hesap(ctx) {
  ctx.title('Hesabım');
  const u = store.user, me = store.me, c = store.content;
  if (!u) { ctx.root.innerHTML = `<div class="card pad" style="text-align:center">${icons.user}<p>Profil, favoriler ve bildirim tercihleri için giriş yapın.</p><button class="btn primary" id="login">Giriş yap</button></div>`; ctx.root.querySelector('#login').onclick = () => document.dispatchEvent(new CustomEvent('arge:login')); return; }
  const theme = document.documentElement.dataset.theme || 'auto';
  ctx.root.innerHTML = `<div class="card pad" style="display:flex;gap:14px;align-items:center">${u.foto ? `<span class="avatar" style="width:56px;height:56px"><img src="${esc(u.foto)}" alt="" referrerpolicy="no-referrer"></span>` : `<span class="avatar" style="width:56px;height:56px;font-size:20px">${esc(u.ad.split(' ').map(p => p[0]).slice(0, 2).join(''))}</span>`}<div style="flex:1"><div style="font-weight:800;font-size:17px">${esc(u.ad)}</div><div style="font-size:12.5px;color:var(--text-2)">${esc(u.eposta || (u.tur === 'demo' ? 'Demo hesabı' : ''))}</div><div class="pill-row" style="margin-top:6px"><span class="chip ${u.tur === 'demo' ? 'teal' : 'navy'}">${u.tur === 'demo' ? 'Demo' : 'Google'}</span>${store.isAdmin ? '<span class="chip meb">Yönetici</span>' : ''}</div></div></div>
    <section class="section" style="margin-top:14px"><div class="section-head"><h2>Profil bilgileri</h2></div><form class="card pad" id="pf">
      <label class="field"><span>Ad Soyad</span><input name="ad" value="${esc(u.ad)}" maxlength="80" required></label>
      <label class="field"><span>Branş</span><input name="brans" value="${esc(u.brans || '')}" maxlength="60" placeholder="ör. Fen Bilimleri"></label>
      <label class="field"><span>Okul</span><input name="okul" value="${esc(u.okul || '')}" maxlength="120"></label>
      <label class="field"><span>İlçe</span><select name="ilce"><option value="">Seçiniz</option>${(c.ilceler || []).map(i => `<option ${u.ilce === i.ad ? 'selected' : ''}>${esc(i.ad)}</option>`).join('')}</select></label>
      <button class="btn navy block" type="submit">${icons.check} Kaydet</button></form></section>
    <section class="section"><div class="section-head"><h2>Favoriler</h2><a href="#/favoriler">Aç</a></div><div class="card">${listRow({ icon: 'star', title: `${me.favoriler.length} favori`, sub: 'Haber, duyuru ve videolar', href: '#/favoriler' })}</div></section>
    <section class="section"><div class="section-head"><h2>Bildirim tercihleri</h2></div><div class="card">${NOTIFICATION_TOPICS.map(t => `<label class="switch"><span>${t.ad}</span><input type="checkbox" data-topic="${t.key}" ${me.bildirim[t.key] !== false ? 'checked' : ''}></label>`).join('')}
      <div class="switch"><span>Push bildirimleri<small style="display:block;color:var(--muted);font-weight:500">${push.supported() ? (push.enabled() ? 'Bu cihaz için açık' : 'Cihaz izni gerekir') : (isLive ? 'Bu tarayıcıda desteklenmiyor' : 'Demo modunda uygulama içi bildirimler çalışır')}</small></span><button class="btn sm ${push.enabled() ? '' : 'primary'}" id="push" ${push.supported() && !push.enabled() ? '' : 'disabled'}>${push.enabled() ? 'Açık' : 'Etkinleştir'}</button></div></div></section>
    <section class="section"><div class="section-head"><h2>Yazı boyutu</h2></div><div class="seg" id="font">${[['kucuk', 'Küçük'], ['normal', 'Normal'], ['buyuk', 'Büyük']].map(([k, v]) => `<button data-f="${k}" class="${(document.documentElement.dataset.font || 'normal') === k ? 'on' : ''}">${v}</button>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Tema</h2></div><div class="seg" id="theme">${[['auto', 'Sistem'], ['light', 'Açık'], ['dark', 'Koyu']].map(([k, v]) => `<button data-t="${k}" class="${k === theme ? 'on' : ''}">${v}</button>`).join('')}</div></section>
    <section class="section"><div class="card">${store.isAdmin ? listRow({ icon: 'settings', title: 'Yönetici paneli', sub: 'Haber, duyuru, video, bildirim, sürüm', href: '/kocaeli-arge/yonetim/' }) : ''}${listRow({ icon: 'info', title: 'Uygulama hakkında', sub: 'Sürüm ' + APP_VERSION + (isLive ? ' · Canlı' : ' · Demo modu'), href: '#/hakkinda' })}<button class="row tap" style="width:100%;text-align:left" id="out"><span class="ic" style="color:var(--meb)">${icons.logout}</span><span class="tx"><b>Çıkış yap</b></span></button></div></section>`;
  ctx.root.querySelector('#pf').addEventListener('submit', async (e) => { e.preventDefault(); await auth.updateProfile(Object.fromEntries(new FormData(e.target).entries())); toast('Profil kaydedildi'); });
  ctx.root.querySelectorAll('[data-topic]').forEach(i => i.addEventListener('change', () => { bildirim.setPref(i.dataset.topic, i.checked); toast(i.checked ? 'Bildirim açıldı' : 'Bildirim kapatıldı'); }));
  ctx.root.querySelector('#push').addEventListener('click', async (e) => { try { await push.enable(); toast('Push bildirimleri etkin'); hesap(ctx); } catch (err) { toast(err.message === 'denied' ? 'Bildirim izni verilmedi' : 'Bu cihazda etkinleştirilemedi'); } });
  ctx.root.querySelectorAll('#font button').forEach(b => b.addEventListener('click', () => { document.dispatchEvent(new CustomEvent('arge:font', { detail: b.dataset.f })); ctx.root.querySelectorAll('#font button').forEach(x => x.classList.toggle('on', x === b)); }));
  ctx.root.querySelectorAll('#theme button').forEach(b => b.addEventListener('click', () => { document.dispatchEvent(new CustomEvent('arge:theme', { detail: b.dataset.t })); ctx.root.querySelectorAll('#theme button').forEach(x => x.classList.toggle('on', x === b)); }));
  ctx.root.querySelector('#out').addEventListener('click', async () => { await auth.signOut(); toast('Çıkış yapıldı'); go('#/'); });
}

export async function ara(ctx) {
  ctx.title('Ara');
  let q = ctx.query.q || '';
  ctx.root.innerHTML = `<div class="search">${icons.search}<input type="search" placeholder="Haber, duyuru, proje, doküman, ilçe…" value="${esc(q)}" autofocus></div><div id="res"></div>`;
  const inp = ctx.root.querySelector('input'), res = ctx.root.querySelector('#res');
  let news = [], vids = [];
  feeds.all().then(d => { news = d.items || []; run(); }).catch(() => {});
  Promise.all(YT_CHANNELS.map(k => feeds.channel(k.id).then(d => d.items || []).catch(() => []))).then(v => { vids = v.flat(); run(); });
  const norm = (t) => String(t || '').toLocaleLowerCase('tr-TR');
  function run() {
    q = inp.value.trim(); history.replaceState(null, '', '#/ara?q=' + encodeURIComponent(q));
    if (q.length < 2) { res.innerHTML = `<div class="empty">${icons.search}<div>En az iki harf yazın.</div></div>`; return; }
    const c = store.content, n = norm(q), hit = (...f) => f.some(x => norm(x).includes(n));
    const groups = [
      ['Duyurular', (c.duyurular || []).filter(d => hit(d.baslik, d.ozet, d.icerik)).map(d => listRow({ icon: 'megaphone', title: d.baslik, sub: fmtDate(d.tarih), href: '#/duyurular/' + d.id }))],
      ['Haberler', news.filter(x => hit(x.title, x.summary)).slice(0, 15).map(x => listRow({ icon: 'news', title: x.title, sub: x.kaynak, href: '#/haberler/' + encodeURIComponent(x.id) }))],
      ['Videolar', vids.filter(v => hit(v.title, v.summary)).slice(0, 10).map(v => listRow({ icon: 'play', title: v.title, sub: v.channel, href: '#/tv/' + v.videoId }))],
      ['Projeler', (c.projeler || []).filter(p => hit(p.ad, p.ozet, p.alan)).map(p => listRow({ icon: 'flask', title: p.ad, sub: p.alan, href: '#/arge/' + p.id }))],
      ['Etkinlikler', (c.etkinlikler || []).filter(e => hit(e.baslik, e.yer, e.aciklama)).map(e => listRow({ icon: 'calendar', title: e.baslik, sub: fmtDate(e.tarih, { saat: true }), href: '#/takvim?g=' + e.tarih.slice(0, 10) }))],
      ['Kütüphane ve dokümanlar', [...(c.kutuphane || []).filter(k => hit(k.baslik, k.aciklama)).map(k => listRow({ icon: 'book', title: k.baslik, sub: k.aciklama, href: k.link || '#/kutuphane' })), ...((c.dokumanlar?.formlar || []).filter(f => hit(f.baslik, f.aciklama)).map(f => listRow({ icon: 'file', title: f.baslik, sub: f.aciklama, href: '#/dokumanlar' })))]],
      ['İlçeler', (c.ilceler || []).filter(i => hit(i.ad, (i.faaliyetler || []).join(' '))).map(i => listRow({ icon: 'building', title: i.ad, sub: i.telefon, href: '#/ilceler/' + i.id }))],
      ['Anketler', (c.anketler || []).filter(a => hit(a.baslik, a.aciklama)).map(a => listRow({ icon: 'chart', title: a.baslik, sub: a.aciklama, href: '#/anketler/' + a.id }))],
      ['TÜBİTAK / eTwinning', [...((c.tubitak?.programlar || []).filter(p => hit(p.kod, p.ad, p.ozet)).map(p => listRow({ icon: 'atom', title: 'TÜBİTAK ' + p.kod + ' · ' + p.ad, sub: p.ozet, href: '#/tubitak' }))), ...((c.etwinning?.cagrilar || []).filter(e => hit(e.baslik, e.ozet)).map(e => listRow({ icon: 'globe', title: e.baslik, sub: e.ozet, href: '#/etwinning' })))]],
    ].filter(([, rows]) => rows.length);
    res.innerHTML = groups.map(([t, rows]) => `<section class="section"><div class="section-head"><h2>${t} <span class="chip">${rows.length}</span></h2></div><div class="card">${rows.join('')}</div></section>`).join('') || `<div class="empty">${icons.search}<div>"${esc(q)}" için sonuç bulunamadı.</div></div>`;
    res.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
  }
  let t; inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 200); });
  run(); inp.focus();
}

export async function hakkinda(ctx) {
  ctx.title('Hakkında');
  ctx.root.innerHTML = `<div class="card pad"><h1 style="font-size:18px;margin:0 0 8px">Kocaeli MEM AR-GE Portalı</h1><p style="font-size:14px;line-height:1.6">Haber, duyuru, video, proje, yapay zekâ desteği ve dijital içerikleri tek merkezden sunan kapsamlı bir eğitim platformu.</p>
    <dl class="kv"><dt>Sürüm</dt><dd>${APP_VERSION}</dd><dt>Çalışma modu</dt><dd>${isLive ? 'Canlı (Firebase)' : 'Demo (örnek içerik)'}</dd><dt>Haber kaynakları</dt><dd>Kocaeli İl MEM, Kocaeli AR-GE, MEB</dd><dt>Video</dt><dd>Kocaeli MEM TV, MEB, EBA (YouTube)</dd></dl>
    <hr class="sep">${document.documentElement.dataset.app === 'android' ? '' : `<a class="btn navy block" href="/kocaeli-arge/KocaeliArge.apk" download>${icons.download} Android uygulamasını (APK) indir</a>`}
    <hr class="sep"><p style="font-size:12.5px;color:var(--text-2)">Bu uygulama Kocaeli İl Millî Eğitim Müdürlüğü AR-GE Birimi için hazırlanmış bir tanıtım sürümüdür. Haber ve videolar ilgili kurumların herkese açık kaynaklarından alınır; telif hakları sahiplerine aittir.</p></div>`;
}

export async function menu(ctx) {
  ctx.title('Tüm Modüller');
  const items = [
    ['Akış', 'feed', '#/akis', 'Paylaşımlar, haber ve videolar tek akışta', 'rose'], ['Ara', 'search', '#/ara', 'Tüm içerikte arama', 'slate'],
    ['Haberler', 'news', '#/haberler', 'Kocaeli MEM, AR-GE ve MEB haberleri', 'red'], ['Duyurular', 'megaphone', '#/duyurular', 'Resmî ve acil duyurular, son tarihler', 'navy'], ['Bildirimler', 'bell', '#/bildirimler', 'Bildirim merkezi', 'gold'],
    ['Kocaeli MEM TV', 'play', '#/tv', 'YouTube, canlı yayın, oynatma listeleri', 'red'], ['AR-GE Çalışmaları', 'flask', '#/arge', 'Projeler, başvuru, sonuç raporları', 'teal'], ['eTwinning Merkezi', 'globe', '#/etwinning', 'Çağrılar, örnekler, kılavuzlar', 'sky'],
    ['TÜBİTAK Merkezi', 'atom', '#/tubitak', '4004 · 4005 · 4006 · 2204', 'violet'], ['Öğretmen Akademileri', 'graduation', '#/akademiler', 'Takvim, videolar, başvuru', 'navy'], ['Dijital Kütüphane', 'book', '#/kutuphane', 'PDF, kılavuz, MEB yayınları, e-kitap', 'gold'],
    ['Etkinlik Takvimi', 'calendar', '#/takvim', 'Günlük, haftalık, aylık', 'teal'], ['İlçe AR-GE Birimleri', 'building', '#/ilceler', '12 ilçe, iletişim ve faaliyetler', 'sky'], ['Anket Sistemi', 'chart', '#/anketler', 'Online anket ve sonuçlar', 'violet'],
    ['Yapay Zekâ Asistanı', 'sparkles', '#/asistan', 'Proje, yazı ve etkinlik desteği', 'rose'], ['Doküman Merkezi', 'file', '#/dokumanlar', 'Formlar ve dilekçe örnekleri', 'slate'], ['Kurumsal İletişim', 'phone', '#/iletisim', 'Telefon, e-posta, harita', 'navy'],
    ['Hesabım', 'user', '#/hesap', 'Profil, favoriler, bildirim, tema', 'slate'],
  ];
  ctx.root.innerHTML = `<div class="card">${items.map(([t, i, href, s, c]) => listRow({ icon: i, title: t, sub: s, href, c })).join('')}${store.isAdmin ? listRow({ icon: 'settings', title: 'Yönetici Paneli', sub: 'İçerik ve bildirim yönetimi', href: '/kocaeli-arge/yonetim/', c: 'red' }) : ''}</div>`;
}
