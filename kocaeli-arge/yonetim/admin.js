// Yönetici paneli: haber, duyuru, video, dosya, bildirim, sürüm, proje, etkinlik, anket, ilçe, banner ve JSON düzenleme
import { init, store, auth, admin, bildirim, posts, sikayet, stats, isLive } from '../js/backend.js';
import { icons, h, raw, el, esc, fmtDate, fmtRel, toast, sheet, uid } from '../js/ui.js';
import { DEMO_PIN, NOTIFICATION_TOPICS, API, APP_VERSION } from '../js/config.js';

const F = (name, label, type = 'text', extra = {}) => ({ name, label, type, ...extra });
const SCHEMAS = {
  haberler:   { ad: 'Haberler', icon: 'news', fields: [F('baslik', 'Başlık'), F('kategori', 'Kategori', 'select', { opts: ['Kurumsal', 'AR-GE', 'Kocaeli İl MEM', 'MEB'] }), F('tarih', 'Tarih', 'date'), F('resim', 'Görsel URL', 'url', { upload: 'haberler' }), F('ozet', 'Özet', 'textarea', { wide: 1 }), F('icerik', 'İçerik', 'textarea', { wide: 1, rows: 8 })], cols: ['baslik', 'kategori', 'tarih'], sort: 'tarih' },
  duyurular:  { ad: 'Duyurular', icon: 'megaphone', fields: [F('baslik', 'Başlık'), F('tarih', 'Tarih', 'date'), F('sonTarih', 'Son tarih', 'date'), F('etiketler', 'Etiketler (virgülle)', 'list'), F('resmi', 'Resmî', 'check'), F('onemli', 'Önemli', 'check'), F('acil', 'Acil', 'check'), F('link', 'Bağlantı', 'url'), F('ozet', 'Özet', 'textarea', { wide: 1 }), F('icerik', 'İçerik', 'textarea', { wide: 1, rows: 8 })], cols: ['baslik', 'tarih', 'sonTarih', 'onemli'], sort: 'tarih' },
  videolar:   { ad: 'Videolar (seçki)', icon: 'play', fields: [F('baslik', 'Başlık'), F('videoId', 'YouTube video kimliği (watch?v=…)'), F('kanal', 'Kanal adı'), F('tarih', 'Tarih', 'date'), F('aciklama', 'Açıklama', 'textarea', { wide: 1 })], cols: ['baslik', 'videoId', 'tarih'], sort: 'tarih', note: 'Video kimliği: youtube.com/watch?v=<b>XXXXXXXXXXX</b> bölümündeki 11 karakter.' },
  oynatmaListeleri: { ad: 'Oynatma listeleri', icon: 'tv', fields: [F('ad', 'Liste adı'), F('id', 'YouTube playlist kimliği (list=PL…)'), F('kanal', 'Kanal kimliği (boş: tüm kanallarda)'), F('aciklama', 'Açıklama')], cols: ['ad', 'id', 'kanal'] },
  kutuphane:  { ad: 'Dijital Kütüphane', icon: 'book', fields: [F('baslik', 'Başlık'), F('tur', 'Tür', 'select', { opts: ['pdf', 'kilavuz', 'meb', 'sunum', 'ekitap'] }), F('link', 'Dosya / bağlantı', 'url', { upload: 'kutuphane' }), F('aciklama', 'Açıklama', 'textarea', { wide: 1 })], cols: ['baslik', 'tur'] },
  projeler:   { ad: 'AR-GE Projeleri', icon: 'flask', fields: [F('ad', 'Proje adı'), F('durum', 'Durum', 'select', { opts: ['devam', 'tamamlanan'] }), F('alan', 'Alan'), F('ilce', 'Kapsam / ilçe'), F('baslangic', 'Başlangıç (YYYY-AA)'), F('bitis', 'Bitiş (YYYY-AA)'), F('ilerleme', 'İlerleme %', 'number'), F('rapor', 'Sonuç raporu URL', 'url', { upload: 'raporlar' }), F('ortaklar', 'Ortaklar (virgülle)', 'list'), F('ozet', 'Özet', 'textarea', { wide: 1 }), F('sonuc', 'Sonuç', 'textarea', { wide: 1 })], cols: ['ad', 'durum', 'alan', 'ilerleme'] },
  etkinlikler:{ ad: 'Etkinlikler', icon: 'calendar', fields: [F('baslik', 'Başlık'), F('tur', 'Tür'), F('tarih', 'Başlangıç', 'datetime-local'), F('bitis', 'Bitiş', 'datetime-local'), F('yer', 'Yer'), F('ilce', 'İlçe'), F('aciklama', 'Açıklama', 'textarea', { wide: 1 })], cols: ['baslik', 'tarih', 'yer'], sort: 'tarih' },
  ilceler:    { ad: 'İlçe AR-GE', icon: 'building', fields: [F('ad', 'İlçe'), F('telefon', 'Telefon'), F('eposta', 'E-posta'), F('web', 'Web', 'url'), F('sorumlu', 'Sorumlu'), F('faaliyetler', 'Faaliyetler (virgülle)', 'list')], cols: ['ad', 'telefon', 'eposta'] },
  bannerlar:  { ad: 'Ana sayfa bannerları', icon: 'grid', fields: [F('baslik', 'Başlık'), F('alt', 'Alt metin'), F('rota', 'Hedef (#/duyurular gibi)'), F('renk', 'Arka plan (CSS)')], cols: ['baslik', 'rota'] },
  basvurular: { ad: 'Proje başvuruları', icon: 'file', fields: [F('ad', 'Proje'), F('alan', 'Alan'), F('okul', 'Okul'), F('ilce', 'İlçe'), F('kisi', 'Başvuran'), F('eposta', 'E-posta'), F('durum', 'Durum', 'select', { opts: ['inceleniyor', 'onaylandi', 'reddedildi'] }), F('ozet', 'Özet', 'textarea', { wide: 1 })], cols: ['ad', 'okul', 'kisi', 'durum'], readonlyAdd: true },
};
const JSON_DOCS = { anketler: 'Anketler', etwinning: 'eTwinning', tubitak: 'TÜBİTAK', akademiler: 'Akademiler', dokumanlar: 'Dokümanlar', iletisim: 'İletişim', hizliErisim: 'Hızlı erişim' };
const NAV = [['pano', 'Pano', 'chart'], ['istatistik', 'İstatistikler', 'eye'], ['paylasimlar', 'Paylaşım onayı', 'feed'], ['sikayetler', 'Şikâyetler', 'flag'], ...Object.entries(SCHEMAS).map(([k, s]) => [k, s.ad, s.icon]), ['bildirim', 'Bildirim gönder', 'bell'], ['surum', 'Sürüm yönetimi', 'settings'], ['json', 'Gelişmiş (JSON)', 'edit']];
const $ = (s) => document.querySelector(s);
let section = location.hash.replace('#', '') || 'pano';

async function boot() {
  await init();
  const gate = $('#gate');
  const open = () => { gate.hidden = true; $('#panel').hidden = false; renderPanel(); };
  if (isLive) {
    store.onAuth((u) => { if (u && store.isAdmin) open(); else if (u) gate.innerHTML = `<div class="empty">${icons.alert}<div><b>${esc(u.eposta)}</b> yönetici olarak tanımlı değil.</div></div><button class="btn block" id="out">Çıkış</button>`, $('#out').onclick = () => auth.signOut(); else gate.innerHTML = `<h2 style="margin:0 0 8px">Yönetici girişi</h2><p style="font-size:13.5px;color:var(--text-2)">Yetkili Google hesabınızla giriş yapın.</p><button class="btn primary block" id="g">Google ile giriş</button>`, $('#g').onclick = () => auth.signInGoogle().catch(e => toast(e.message)); });
    if (store.user && store.isAdmin) open();
  } else {
    if (sessionStorage.getItem('arge.adminPin') === DEMO_PIN) return open();
    gate.innerHTML = `<h2 style="margin:0 0 4px">Yönetici girişi</h2><div class="notice demo">Demo modu: PIN <b>${DEMO_PIN}</b> (config.js içinde DEMO_PIN). Canlı modda Google hesabı ile girilir.</div><form id="pf"><label class="field"><span>PIN</span><input type="password" name="pin" inputmode="numeric" required></label><button class="btn primary block" type="submit">Giriş</button></form>`;
    $('#pf').onsubmit = (e) => { e.preventDefault(); if (new FormData(e.target).get('pin') === DEMO_PIN) { sessionStorage.setItem('arge.adminPin', DEMO_PIN); if (!store.user) auth.signInDemo('Yönetici'); open(); } else toast('PIN hatalı'); };
  }
}

function renderPanel() {
  $('#panel').innerHTML = `<aside class="side"><div style="padding:6px 12px 14px;font-weight:800">AR-GE Yönetim<div style="font-size:11px;color:var(--muted);font-weight:500">${isLive ? 'Canlı · Firestore' : 'Demo · yerel'} · v${APP_VERSION}</div></div>${NAV.map(([k, t, i]) => `<a href="#${k}" class="${k === section ? 'on' : ''}">${icons[i] || icons.file}${t}</a>`).join('')}<a href="/kocaeli-arge/" style="margin-top:12px">${icons.external}Uygulamayı aç</a></aside><div class="main" id="main"></div>`;
  renderSection();
}
window.addEventListener('hashchange', () => { section = location.hash.replace('#', '') || 'pano'; renderPanel(); });

function renderSection() {
  const m = $('#main'); const c = store.content;
  if (section === 'pano') {
    const cnt = (k) => (c[k] || []).length;
    m.innerHTML = `<h1 class="page-title">Pano</h1><div class="stat-grid" style="grid-template-columns:repeat(4,1fr)">${[['haberler', 'Haber'], ['duyurular', 'Duyuru'], ['projeler', 'Proje'], ['etkinlikler', 'Etkinlik'], ['videolar', 'Video seçkisi'], ['kutuphane', 'Kütüphane'], ['basvurular', 'Başvuru'], ['bildirimler', 'Bildirim']].map(([k, t]) => `<a class="stat" href="#${k}"><b>${cnt(k)}</b><span>${t}</span></a>`).join('')}</div>
      <div class="card pad" style="margin-top:16px"><h2 style="font-size:15px;margin:0 0 8px">Son başvurular</h2><table class="tbl"><tr><th>Proje</th><th>Okul</th><th>Başvuran</th><th>Durum</th></tr>${(c.basvurular || []).slice(0, 8).map(b => h`<tr><td>${b.ad}</td><td>${b.okul}</td><td>${b.kisi}</td><td><span class="chip ${b.durum === 'onaylandi' ? 'teal' : b.durum === 'reddedildi' ? 'meb' : 'amber'}">${b.durum}</span></td></tr>`).join('') || '<tr><td colspan="4" style="color:var(--muted)">Başvuru yok</td></tr>'}</table></div>
      ${isLive ? `<div class="notice" style="margin-top:16px">Canlı mod. Firestore'daki boş koleksiyonları örnek içerikle doldurmak için: <button class="btn sm" id="seed">Örnek içeriği Firestore'a aktar</button></div>` : `<div class="notice" style="margin-top:16px">Demo modunda değişiklikler bu tarayıcıda saklanır. <button class="btn sm" id="reset">Örnek içeriğe dön</button></div>`}`;
    m.querySelector('#reset')?.addEventListener('click', async () => { if (confirm('Tüm yerel değişiklikler silinsin mi?')) { await admin.reset(); toast('Örnek içerik geri yüklendi'); renderSection(); } });
    m.querySelector('#seed')?.addEventListener('click', async () => { if (!confirm('Boş koleksiyonlar örnek içerikle doldurulsun mu? (Dolu olanlar korunur)')) return; try { const n = await admin.seedToFirestore(); toast(`${n} koleksiyon aktarıldı`); } catch (e) { toast('Aktarılamadı: ' + e.message); } });
    return;
  }
  if (section === 'istatistik') return renderStats();
  if (section === 'paylasimlar') return renderPosts();
  if (section === 'sikayetler') return renderReports();
  if (SCHEMAS[section]) return renderCrud(section);
  if (section === 'bildirim') return renderBildirim();
  if (section === 'surum') return renderSurum();
  if (section === 'json') return renderJson();
  m.innerHTML = '<div class="empty">Bölüm bulunamadı</div>';
}

function renderCrud(key) {
  const s = SCHEMAS[key]; const m = $('#main');
  let items = (store.content[key] || []).slice();
  if (s.sort) items.sort((a, b) => String(b[s.sort] || '').localeCompare(String(a[s.sort] || '')));
  m.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><h1 class="page-title">${s.ad}</h1>${s.readonlyAdd ? '' : `<button class="btn primary sm" id="add">${icons.plus} Yeni</button>`}</div>${s.note ? `<div class="notice">${s.note}</div>` : ''}
    <div class="card"><table class="tbl"><tr>${s.cols.map(cn => `<th>${esc(s.fields.find(f => f.name === cn)?.label || cn)}</th>`).join('')}<th></th></tr>${items.map(it => `<tr>${s.cols.map(cn => `<td>${fmtCell(it[cn])}</td>`).join('')}<td style="white-space:nowrap;text-align:right"><button class="icon-btn" data-edit="${esc(it.id)}" aria-label="Düzenle">${icons.edit}</button><button class="icon-btn" data-del="${esc(it.id)}" aria-label="Sil" style="color:var(--meb)">${icons.trash}</button></td></tr>`).join('') || `<tr><td colspan="${s.cols.length + 1}" style="color:var(--muted)">Kayıt yok</td></tr>`}</table></div>`;
  m.querySelector('#add')?.addEventListener('click', () => editForm(key, null));
  m.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => editForm(key, items.find(x => x.id === b.dataset.edit)));
  m.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { if (!confirm('Kayıt silinsin mi?')) return; await admin.save(key, (store.content[key] || []).filter(x => x.id !== b.dataset.del)); toast('Silindi'); renderCrud(key); });
}
const fmtCell = (v) => v === true ? '✔' : v === false || v == null ? '' : Array.isArray(v) ? esc(v.join(', ')) : esc(String(v)).slice(0, 60);

function editForm(key, item) {
  const s = SCHEMAS[key]; const it = item || {};
  const inp = (f) => {
    const v = it[f.name] ?? '';
    if (f.type === 'textarea') return `<textarea name="${f.name}" rows="${f.rows || 4}">${esc(v)}</textarea>`;
    if (f.type === 'select') return `<select name="${f.name}">${f.opts.map(o => `<option ${o === v ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    if (f.type === 'check') return `<input type="checkbox" name="${f.name}" ${v ? 'checked' : ''} style="appearance:auto;width:20px;height:20px">`;
    if (f.type === 'list') return `<input name="${f.name}" value="${esc(Array.isArray(v) ? v.join(', ') : v)}">`;
    const up = f.upload ? `<button type="button" class="btn sm" data-up="${f.name}" data-folder="${f.upload}" style="margin-top:6px">${icons.download} Dosya yükle</button>` : '';
    return `<input type="${f.type === 'url' ? 'text' : f.type}" name="${f.name}" value="${esc(v)}">${up}`;
  };
  const sh = sheet(`<h2>${item ? 'Düzenle' : 'Yeni kayıt'} · ${s.ad}</h2><form id="ef" class="grid2">${s.fields.map(f => `<label class="field ${f.wide ? 'wide' : ''}"><span>${f.label}</span>${inp(f)}</label>`).join('')}<div class="wide btn-row"><button class="btn primary" type="submit">${icons.check} Kaydet</button><button class="btn ghost" type="button" data-close>Vazgeç</button></div></form>`);
  sh.el.querySelector('.sheet').style.maxWidth = '720px';
  sh.el.querySelectorAll('[data-up]').forEach(b => b.onclick = () => { const i = document.createElement('input'); i.type = 'file'; i.onchange = async () => { const f = i.files[0]; if (!f) return; if (f.size > 8e6) return toast('Dosya 8 MB üstü'); toast('Yükleniyor…'); try { const r = await admin.uploadFile(f, b.dataset.folder); sh.el.querySelector(`[name=${b.dataset.up}]`).value = r.url; toast(r.demo ? 'Demo: dosya tarayıcıda tutuluyor' : 'Yüklendi'); } catch (e) { toast('Yükleme başarısız: ' + e.message); } }; i.click(); });
  sh.el.querySelector('#ef').onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target); const out = { ...it, id: it.id || uid() };
    s.fields.forEach(f => { if (f.type === 'check') out[f.name] = fd.get(f.name) === 'on'; else if (f.type === 'list') out[f.name] = String(fd.get(f.name) || '').split(',').map(x => x.trim()).filter(Boolean); else if (f.type === 'number') out[f.name] = Number(fd.get(f.name) || 0); else out[f.name] = String(fd.get(f.name) || '').trim(); });
    const list = (store.content[key] || []).slice(); const i = list.findIndex(x => x.id === out.id);
    if (i >= 0) list[i] = out; else list.unshift(out);
    await admin.save(key, list); sh.close(); toast('Kaydedildi'); renderCrud(key);
  };
}

async function renderStats() {
  const m = $('#main'); m.innerHTML = '<h1 class="page-title">İstatistikler</h1><div class="empty">Hesaplanıyor…</div>';
  const st = await stats.top(10); const c = store.content;
  const anketKatilim = (c.anketler || []).reduce((a, x) => a + (x.katilim || 0), 0);
  const label = (id) => id.startsWith('v') ? 'Video · ' + id.slice(1) : ((c.duyurular || []).find(d => d.id === id)?.baslik || (c.haberler || []).find(h => h.id === id)?.baslik || (c.paylasimlar || []).find(x => x.id === id)?.baslik || (id.startsWith('p') ? 'Paylaşım · ' + id.slice(1, 9) : id.startsWith('k') || id.startsWith('m') ? 'Haber (kaynak) · ' + id : id));
  const rows = (list, key) => list.length ? list.map(r => h`<tr><td>${label(r.id)}</td><td style="text-align:right"><b>${r[key] || 0}</b></td></tr>`).join('') : '<tr><td colspan="2" style="color:var(--muted)">Henüz veri yok</td></tr>';
  m.innerHTML = `<h1 class="page-title">İstatistikler</h1>
    <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)"><div class="stat"><b>${st.total.goruntulenme}</b><span>Toplam görüntülenme</span></div><div class="stat"><b>${st.total.begeni}</b><span>Toplam beğeni</span></div><div class="stat"><b>${st.total.yorum}</b><span>Toplam yorum</span></div><div class="stat"><b>${anketKatilim}</b><span>Anket katılımı</span></div></div>
    <div class="grid2" style="margin-top:16px"><div class="card pad"><h2 style="font-size:15px;margin:0 0 8px">En çok görüntülenen</h2><table class="tbl">${rows(st.byViews, 'goruntulenme')}</table></div><div class="card pad"><h2 style="font-size:15px;margin:0 0 8px">En çok beğenilen</h2><table class="tbl">${rows(st.byLikes, 'begeni')}</table></div></div>
    <div class="notice" style="margin-top:16px">${isLive ? 'Veriler Firestore "sosyal" koleksiyonundan; Firebase Analytics ile kullanıcı sayıları konsolda izlenir.' : 'Demo modunda yalnız bu tarayıcıdaki etkileşimler sayılır.'}</div>`;
}

async function renderPosts() {
  const m = $('#main'); m.innerHTML = '<h1 class="page-title">Paylaşım onayı</h1><div class="empty">Yükleniyor…</div>';
  const list = await posts.list({ all: true });
  const pend = list.filter(p => p.durum === 'bekliyor'), rest = list.filter(p => p.durum !== 'bekliyor');
  const row = (p) => h`<div class="row" style="align-items:flex-start">${p.foto ? raw(`<img src="${esc(p.foto)}" alt="" style="width:72px;height:72px;object-fit:cover;border-radius:10px">`) : raw('<span class="ic">' + icons.feed + '</span>')}<span class="tx"><b>${p.baslik || p.metin.slice(0, 60)}</b><span>${p.ad}${p.ilce ? ' · ' + p.ilce : ''} · ${fmtRel(p.tarih)}</span><span style="white-space:pre-wrap">${p.metin.slice(0, 300)}</span>${p.link ? raw(`<a href="${esc(p.link)}" target="_blank" rel="noopener" style="color:var(--navy-2);font-size:12px">${esc(p.link)}</a>`) : ''}</span><span class="btn-row" style="flex:none;flex-direction:column">${p.durum !== 'onayli' ? raw(`<button class="btn sm primary" data-ok="${esc(p.id)}">${icons.check} Onayla</button>`) : raw('<span class="chip teal">Yayında</span>')}${p.durum !== 'red' ? raw(`<button class="btn sm" data-red="${esc(p.id)}">Reddet</button>`) : ''}<button class="btn sm ghost" data-del="${p.id}" style="color:var(--meb)">${raw(icons.trash)}</button></span></div>`;
  m.innerHTML = `<h1 class="page-title">Paylaşım onayı</h1><h2 style="font-size:15px">Onay bekleyen (${pend.length})</h2><div class="card">${pend.map(row).join('') || '<div class="empty">Bekleyen paylaşım yok</div>'}</div><h2 style="font-size:15px;margin-top:20px">Diğer (${rest.length})</h2><div class="card">${rest.map(row).join('') || '<div class="empty">Kayıt yok</div>'}</div>`;
  m.querySelectorAll('[data-ok]').forEach(b => b.onclick = async () => { await posts.setDurum(b.dataset.ok, 'onayli'); toast('Onaylandı'); renderPosts(); });
  m.querySelectorAll('[data-red]').forEach(b => b.onclick = async () => { await posts.setDurum(b.dataset.red, 'red'); toast('Reddedildi'); renderPosts(); });
  m.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { if (confirm('Silinsin mi?')) { await posts.remove(b.dataset.del); renderPosts(); } });
}

async function renderReports() {
  const m = $('#main'); m.innerHTML = '<h1 class="page-title">Şikâyetler</h1><div class="empty">Yükleniyor…</div>';
  const list = await sikayet.list();
  m.innerHTML = `<h1 class="page-title">Şikâyetler</h1><div class="card"><table class="tbl"><tr><th>Tür</th><th>İçerik</th><th>Sebep</th><th>Bildiren</th><th>Durum</th><th></th></tr>${list.map(s => h`<tr><td>${s.tur}</td><td>${s.ozet}<br><small style="color:var(--muted)">${s.hedefId}</small></td><td>${s.metin}</td><td>${s.ad}<br><small style="color:var(--muted)">${fmtRel(s.tarih)}</small></td><td><span class="chip ${s.durum === 'acik' ? 'amber' : ''}">${s.durum === 'acik' ? 'Açık' : 'Kapandı'}</span></td><td>${s.durum === 'acik' ? raw(`<button class="btn sm" data-close="${esc(s.id)}">Kapat</button>`) : ''}</td></tr>`).join('') || '<tr><td colspan="6" style="color:var(--muted)">Şikâyet yok</td></tr>'}</table></div><div class="notice" style="margin-top:12px">Şikâyet edilen paylaşımı "Paylaşım onayı" bölümünden, yorumu ilgili içerik sayfasından silebilirsiniz.</div>`;
  m.querySelectorAll('[data-close]').forEach(b => b.onclick = async () => { await sikayet.close(b.dataset.close); renderReports(); });
}

function renderBildirim() {
  const m = $('#main');
  const list = bildirim.list();
  m.innerHTML = `<h1 class="page-title">Bildirim gönder</h1><div class="grid2"><form class="card pad" id="nf"><label class="field"><span>Başlık</span><input name="baslik" required maxlength="120"></label><label class="field"><span>Metin</span><textarea name="metin" required maxlength="400"></textarea></label><label class="field"><span>Konu</span><select name="konu">${NOTIFICATION_TOPICS.map(t => `<option value="${t.key}">${t.ad}</option>`).join('')}<option value="genel">Genel</option></select></label><label class="field"><span>Hedef rota (#/duyurular/… )</span><input name="rota" value="#/"></label>
      <label class="switch" style="padding:10px 0"><span>Push bildirimi de gönder (FCM)</span><input type="checkbox" name="push" ${isLive ? 'checked' : 'disabled'}></label>${isLive ? `<label class="field"><span>Sunucu yönetici anahtarı (ARGE_ADMIN_TOKEN)</span><input type="password" name="token" value="${esc(sessionStorage.getItem('arge.adminToken') || '')}"></label>` : '<div class="notice demo">Demo modunda yalnız uygulama içi bildirim oluşturulur; push için Firebase + Vercel ortam değişkenleri gerekir.</div>'}
      <button class="btn primary block" type="submit">${icons.send} Gönder</button></form>
    <div class="card"><div class="row" style="font-weight:700">Gönderilen bildirimler</div>${list.slice(0, 30).map(n => h`<div class="row"><span class="ic">${raw(icons.bell)}</span><span class="tx"><b>${n.baslik}</b><span>${n.metin}</span><span style="font-size:11px">${n.konu} · ${fmtRel(n.tarih)}</span></span><button class="icon-btn" data-del="${n.id}" style="color:var(--meb)">${raw(icons.trash)}</button></div>`).join('') || '<div class="empty">Bildirim yok</div>'}</div></div>`;
  m.querySelector('#nf').onsubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    const n = { baslik: fd.get('baslik').trim(), metin: fd.get('metin').trim(), konu: fd.get('konu'), rota: fd.get('rota') || '#/' };
    await bildirim.send(n);
    if (fd.get('push') === 'on' && isLive) {
      const token = fd.get('token'); sessionStorage.setItem('arge.adminToken', token);
      try { const r = await fetch(API.bildirim, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ title: n.baslik, body: n.metin, topic: n.konu, url: 'https://raufenc.com/kocaeli-arge/' + n.rota }) }); const d = await r.json(); toast(d.ok ? `Push: ${d.sent} gönderildi, ${d.failed} başarısız` : 'Push hatası: ' + (d.error || r.status), 5000); }
      catch (err) { toast('Push gönderilemedi: ' + err.message); }
    } else toast('Uygulama içi bildirim yayınlandı');
    renderBildirim();
  };
  m.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { await admin.save('bildirimler', (store.content.bildirimler || []).filter(x => x.id !== b.dataset.del)); renderBildirim(); });
}

function renderSurum() {
  const m = $('#main'); const s = store.content.surum || {};
  m.innerHTML = `<h1 class="page-title">Sürüm yönetimi</h1><div class="notice">Uygulama sürümü: <b>${APP_VERSION}</b> (config.js). "Son sürüm" bundan büyükse kullanıcıya güncelleme çubuğu gösterilir; "en düşük sürüm" bundan büyükse güncelleme zorunlu olur.</div>
    <form class="card pad" id="sf" style="max-width:520px"><label class="field"><span>Son sürüm</span><input name="latestVersion" value="${esc(s.latestVersion || APP_VERSION)}"></label><label class="field"><span>En düşük desteklenen sürüm</span><input name="minVersion" value="${esc(s.minVersion || '1.0.0')}"></label><label class="field"><span>Mesaj</span><input name="mesaj" value="${esc(s.mesaj || '')}"></label><label class="field"><span>Mağaza / indirme bağlantısı</span><input name="magazaLink" value="${esc(s.magazaLink || '')}"></label><label class="switch" style="padding:10px 0"><span>Zorunlu güncelleme</span><input type="checkbox" name="zorunlu" ${s.zorunlu ? 'checked' : ''}></label><button class="btn primary block" type="submit">Kaydet</button></form>`;
  m.querySelector('#sf').onsubmit = async (e) => { e.preventDefault(); const fd = new FormData(e.target); await admin.save('surum', { latestVersion: fd.get('latestVersion'), minVersion: fd.get('minVersion'), mesaj: fd.get('mesaj'), magazaLink: fd.get('magazaLink'), zorunlu: fd.get('zorunlu') === 'on' }); toast('Sürüm bilgisi kaydedildi'); };
}

function renderJson() {
  const m = $('#main'); let key = Object.keys(JSON_DOCS)[0];
  m.innerHTML = `<h1 class="page-title">Gelişmiş düzenleme (JSON)</h1><div class="chips">${Object.entries(JSON_DOCS).map(([k, v]) => `<button class="chip ${k === key ? 'on' : ''}" data-k="${k}">${v}</button>`).join('')}</div><textarea id="jt" style="min-height:420px;font-family:ui-monospace,monospace;font-size:12.5px"></textarea><div class="btn-row" style="margin-top:10px"><button class="btn primary" id="save">${icons.check} Kaydet</button></div>`;
  const ta = m.querySelector('#jt'); const load = () => { ta.value = JSON.stringify(store.content[key] ?? {}, null, 2); };
  m.querySelectorAll('.chip').forEach(b => b.onclick = () => { key = b.dataset.k; m.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b)); load(); });
  m.querySelector('#save').onclick = async () => { try { await admin.save(key, JSON.parse(ta.value)); toast('Kaydedildi'); } catch (e) { toast('JSON hatalı: ' + e.message, 4000); } };
  load();
}
boot();
