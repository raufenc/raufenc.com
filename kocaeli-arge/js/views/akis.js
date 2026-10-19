// Akış: haber, duyuru, video ve öğretmen paylaşımlarının beğeni/yorum/paylaş/izlenme sayılı sosyal akışı
import { icons, h, raw, el, esc, fmtRel, fmtSayi, toast, sheet, share, skeletons, empty, avatar } from '../ui.js';
import { store, social, posts, sikayet, admin, isLive } from '../backend.js';
import { feeds } from '../feeds.js';
import { commentsSection, ytEmbed } from '../components.js';
import { YT_CHANNELS } from '../config.js';
import { go } from '../router.js';

const viewedCards = new Set();

function feedItem(x) {
  // ortak biçim: { id, tur, baslik, metin, resim, videoId, yazar, avatarHtml, tarih, rota, link, etiket }
  if (x.tur === 'paylasim') return { id: x.id, tur: 'paylasim', baslik: x.baslik, metin: x.metin, resim: x.foto, yazar: x.ad, sub: x.rol === 'kurum' ? 'Kocaeli MEM AR-GE' : (x.ilce ? x.ilce + ' · Öğretmen' : 'Öğretmen'), avatarHtml: avatar({ ad: x.ad, foto: x.avatar }), tarih: x.tarih, rota: `#/akis/${x.id}`, link: x.link, durum: x.durum, uid: x.uid, etiket: x.rol === 'kurum' ? 'Kurum' : 'Paylaşım', cls: x.rol === 'kurum' ? 'meb' : 'teal' };
  if (x.videoId) return { id: 'v' + x.videoId, tur: 'video', baslik: x.title, metin: x.summary, resim: x.thumb, videoId: x.videoId, yazar: x.channel, sub: 'YouTube', avatarHtml: `<span class="avatar" style="background:#E72737">${icons.youtube}</span>`, tarih: x.date, rota: `#/tv/${x.videoId}`, etiket: 'Video', cls: 'meb' };
  if (x.tur === 'duyuru' && !x.link) return { id: x.id, tur: 'duyuru', baslik: x.baslik, metin: x.ozet, yazar: 'Kocaeli MEM AR-GE', sub: 'Resmî duyuru', avatarHtml: `<span class="avatar" style="background:var(--navy)">${icons.megaphone}</span>`, tarih: x.tarih, rota: `#/duyurular/${x.id}`, etiket: x.acil ? 'Acil' : 'Duyuru', cls: x.acil ? 'meb' : 'navy' };
  return { id: x.id, tur: 'haber', baslik: x.title, metin: x.summary, resim: x.image, yazar: x.kaynak, sub: x.tur === 'duyuru' ? 'Duyuru' : 'Haber', avatarHtml: `<span class="avatar" style="background:${x.kaynak === 'MEB' ? 'var(--navy)' : 'var(--meb)'}">${icons.news}</span>`, tarih: x.date, rota: `#/haberler/${encodeURIComponent(x.id)}`, link: x.link, etiket: x.kaynak, cls: x.kaynak === 'MEB' ? 'navy' : 'meb' };
}

export function feedCard(it) {
  const card = el(h`<article class="card feed-card" data-id="${it.id}">
    <header class="feed-head">${raw(it.avatarHtml)}<div class="tx"><b>${it.yazar}</b><span>${it.sub} · ${fmtRel(it.tarih)}</span></div><span class="chip ${it.cls}">${it.etiket}</span>${it.durum === 'bekliyor' ? raw('<span class="chip amber">Onay bekliyor</span>') : ''}</header>
    ${it.resim ? raw(`<a class="feed-media" href="${esc(it.rota)}"><img src="${esc(it.resim)}" alt="" loading="lazy" referrerpolicy="no-referrer">${it.videoId ? `<span class="play"><i>${icons.play}</i></span>` : ''}</a>`) : ''}
    <div class="feed-body"><a href="${it.rota}">${it.baslik ? raw(`<h3>${esc(it.baslik)}</h3>`) : ''}${it.metin ? raw(`<p>${esc(it.metin).slice(0, 420)}${it.metin.length > 420 ? '…' : ''}</p>`) : ''}</a>${it.link && it.tur === 'paylasim' ? raw(`<a class="feed-link" href="${esc(it.link)}" target="_blank" rel="noopener">${icons.external} ${esc(it.link.replace(/^https?:\/\//, '').slice(0, 60))}</a>`) : ''}</div>
    <footer class="social">
      <button class="like" aria-label="Beğen">${raw(icons.heart)}<span>0</span></button>
      <button class="cmt" aria-label="Yorumlar">${raw(icons.comment)}<span>0</span></button>
      <button class="shr" aria-label="Paylaş">${raw(icons.share)}<span>Paylaş</span></button>
      <button class="fav" aria-label="Favori">${raw(icons.star)}</button>
      ${it.tur === 'paylasim' ? raw(`<button class="rep icon-btn" aria-label="Şikâyet et" title="Şikâyet et">${icons.flag}</button>`) : ''}
      <span class="views">${raw(icons.eye)}<b>0</b></span></footer></article>`);
  const like = card.querySelector('.like'), cmt = card.querySelector('.cmt'), fav = card.querySelector('.fav'), views = card.querySelector('.views b');
  const refresh = async () => { const s = await social.get(it.id); like.classList.toggle('on', s.liked); like.innerHTML = (s.liked ? icons.heartFill : icons.heart) + `<span>${fmtSayi(s.begeni)}</span>`; cmt.querySelector('span').textContent = fmtSayi(s.yorum); fav.classList.toggle('on', s.fav); fav.innerHTML = s.fav ? icons.starFill : icons.star; views.textContent = fmtSayi(s.goruntulenme); };
  like.onclick = async () => { if (!store.user) return toast('Beğenmek için giriş yapın'); await social.like(it.id); refresh(); };
  fav.onclick = async () => { const on = await social.fav(it.id); toast(on ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı'); refresh(); };
  card.querySelector('.shr').onclick = () => share({ title: it.baslik || it.metin?.slice(0, 80), text: it.metin?.slice(0, 200), url: it.link || (location.origin + '/kocaeli-arge/' + it.rota) });
  cmt.onclick = () => { const s = sheet(`<h2>${esc(it.baslik || 'Yorumlar')}</h2>`); s.el.querySelector('.sheet').appendChild(commentsSection(it.id)); s.el.addEventListener('click', () => setTimeout(refresh, 400)); };
  card.querySelector('.rep')?.addEventListener('click', () => reportSheet('paylasim', it.id, it.baslik || it.metin));
  refresh();
  card.refresh = refresh;
  // Görünür olunca "izlendi" say (Instagram benzeri izlenme)
  if ('IntersectionObserver' in window) { const io = new IntersectionObserver((en) => { en.forEach(e => { if (e.isIntersecting && !viewedCards.has(it.id)) { viewedCards.add(it.id); social.view(it.id).then(refresh); io.disconnect(); } }); }, { threshold: 0.6 }); io.observe(card); }
  return card;
}

export function reportSheet(tur, hedefId, ozet) {
  if (!store.user) return toast('Şikâyet için giriş yapın');
  const s = sheet(`<h2>Şikâyet bildir</h2><p style="font-size:13px;color:var(--text-2)">Uygunsuz, yanıltıcı veya kurum kurallarına aykırı içerikleri bildirin. AR-GE Birimi inceler.</p><form id="rf"><label class="field"><span>Sebep</span><select name="sebep"><option>Uygunsuz içerik</option><option>Yanlış bilgi</option><option>Hakaret / taciz</option><option>Telif ihlali</option><option>Diğer</option></select></label><label class="field"><span>Açıklama (isteğe bağlı)</span><textarea name="metin" maxlength="500"></textarea></label><div class="btn-row"><button class="btn primary" type="submit">${icons.flag} Gönder</button><button class="btn ghost" type="button" data-close>Vazgeç</button></div></form>`);
  s.el.querySelector('#rf').onsubmit = async (e) => { e.preventDefault(); const fd = new FormData(e.target); try { await sikayet.send({ tur, hedefId, ozet, metin: `${fd.get('sebep')}: ${fd.get('metin') || ''}` }); s.close(); toast('Şikâyetiniz alındı, teşekkürler'); } catch (_) { toast('Gönderilemedi'); } };
}

async function downscale(file, max = 1080) {
  const url = URL.createObjectURL(file);
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  const k = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
  return new Promise(res => c.toBlob(b => res(b), 'image/jpeg', 0.82));
}

export function newPostSheet(onDone) {
  if (!store.user) { document.dispatchEvent(new CustomEvent('arge:login')); return; }
  const s = sheet(`<h2>Paylaşım yap</h2><form id="pf"><div style="display:flex;gap:10px;align-items:center;margin-bottom:10px">${avatar(store.user)}<div><b style="font-size:14px">${esc(store.user.ad)}</b><div style="font-size:12px;color:var(--text-2)">${store.isAdmin ? 'Kurum hesabı · doğrudan yayınlanır' : 'AR-GE Birimi onayından sonra yayınlanır'}</div></div></div>
    <label class="field"><span>Başlık (isteğe bağlı)</span><input name="baslik" maxlength="120" placeholder="ör. Bilim fuarımızdan kareler"></label>
    <label class="field"><span>Metin</span><textarea name="metin" maxlength="1500" placeholder="Okulunuzdaki iyi uygulamayı, etkinliği veya projeyi anlatın…" required></textarea></label>
    <label class="field"><span>Bağlantı (isteğe bağlı)</span><input name="link" placeholder="https://"></label>
    <div class="btn-row" style="margin-bottom:10px"><label class="btn sm">${icons.camera} Fotoğraf ekle<input type="file" accept="image/*" name="foto" hidden></label><span id="fn" style="font-size:12px;color:var(--text-2);align-self:center"></span></div>
    <img id="prev" alt="" style="display:none;border-radius:10px;max-height:200px;margin-bottom:10px">
    <button class="btn primary block" type="submit">${icons.send} Paylaş</button>
    <p style="font-size:11.5px;color:var(--muted);margin:10px 0 0">Öğrenci görseli paylaşırken veli izni ve KVKK kurallarına uyunuz. Paylaşımlar kurum tarafından denetlenir.</p></form>`);
  let blob = null;
  s.el.querySelector('[name=foto]').addEventListener('change', async (e) => { const f = e.target.files[0]; if (!f) return; blob = await downscale(f); const p = s.el.querySelector('#prev'); p.src = URL.createObjectURL(blob); p.style.display = 'block'; s.el.querySelector('#fn').textContent = `${Math.round(blob.size / 1024)} KB`; });
  s.el.querySelector('#pf').onsubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target); const btn = e.target.querySelector('[type=submit]'); btn.disabled = true;
    try {
      let foto = '';
      if (blob) { if (isLive) { foto = (await admin.uploadFile(new File([blob], 'paylasim.jpg', { type: 'image/jpeg' }), 'paylasimlar')).url; } else { foto = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); }); } }
      const p = await posts.create({ metin: fd.get('metin'), baslik: fd.get('baslik'), link: fd.get('link'), foto });
      s.close(); toast(p.durum === 'onayli' ? 'Paylaşımınız yayınlandı' : 'Paylaşımınız onaya gönderildi'); onDone?.(p);
    } catch (err) { btn.disabled = false; toast(err.message === 'login' ? 'Giriş yapın' : err.message === 'empty' ? 'Metin veya fotoğraf ekleyin' : 'Paylaşılamadı: ' + err.message); }
  };
}

export async function akis(ctx) {
  ctx.title('Akış');
  let filtre = ctx.query.f || 'hepsi';
  ctx.root.innerHTML = `<div class="stories">
      <button class="story new" id="newpost"><span class="ring"><i>${icons.plus}</i></span><span>Paylaş</span></button>
      ${YT_CHANNELS.map(k => `<a class="story" href="#/tv?k=${k.id}"><span class="ring" style="--c:${k.renk}"><i>${icons.play}</i></span><span>${esc(k.kisa)}</span></a>`).join('')}
      <a class="story" href="#/duyurular"><span class="ring" style="--c:var(--navy)"><i>${icons.megaphone}</i></span><span>Duyuru</span></a>
      <a class="story" href="#/ilceler"><span class="ring" style="--c:var(--teal)"><i>${icons.building}</i></span><span>İlçeler</span></a></div>
    <div class="chips">${[['hepsi', 'Tümü'], ['paylasim', 'Paylaşımlar'], ['haber', 'Haberler'], ['video', 'Videolar'], ['duyuru', 'Duyurular'], ['benim', 'Benim']].map(([k, v]) => `<button class="chip ${k === filtre ? 'on' : ''}" data-f="${k}">${v}</button>`).join('')}</div>
    <div id="live-slot"></div><div class="card-list" id="feed">${skeletons(3, 'video')}</div>`;
  ctx.root.querySelector('#newpost').onclick = () => newPostSheet(() => load());
  const feedEl = ctx.root.querySelector('#feed');
  let items = [];
  async function load() {
    const c = store.content;
    const [pl, mine, news, ...vids] = await Promise.all([
      posts.list().catch(() => []), store.user ? posts.list({ mine: true }).catch(() => []) : [],
      feeds.all().then(d => d.items || []).catch(() => []),
      ...YT_CHANNELS.map(k => feeds.channel(k.id).then(d => (d.items || []).slice(0, k.id === YT_CHANNELS[0].id ? 8 : 3)).catch(() => [])),
    ]);
    const seenP = new Set();
    const allPosts = [...mine, ...pl].filter(p => { if (seenP.has(p.id)) return false; seenP.add(p.id); return true; }).map(p => ({ ...p, tur: 'paylasim' }));
    const duy = (c.duyurular || []).slice().sort((a, b) => b.tarih.localeCompare(a.tarih)).slice(0, 6).map(d => ({ ...d, tur: 'duyuru' }));
    const manual = (c.haberler || []).map(x => ({ id: x.id, title: x.baslik, summary: x.ozet, date: x.tarih, kaynak: x.kategori || 'Kurumsal', image: x.resim || '', tur: 'haber' }));
    items = [...allPosts, ...duy, ...manual, ...news.slice(0, 20), ...vids.flat()].map(feedItem).filter(Boolean);
    items.sort((a, b) => String(b.tarih || '').localeCompare(String(a.tarih || '')));
    render();
  }
  function render() {
    const f = items.filter(i => filtre === 'hepsi' ? true : filtre === 'benim' ? (i.tur === 'paylasim' && i.uid === store.user?.uid) : i.tur === filtre);
    feedEl.innerHTML = '';
    if (!f.length) { feedEl.innerHTML = empty(filtre === 'benim' ? 'Henüz paylaşımınız yok. "Paylaş" ile ilk gönderinizi oluşturun.' : 'Akışta içerik yok', 'feed'); return; }
    f.slice(0, 60).forEach(i => feedEl.appendChild(feedCard(i)));
  }
  ctx.root.querySelectorAll('.chips .chip').forEach(b => b.onclick = () => { filtre = b.dataset.f; ctx.root.querySelectorAll('.chips .chip').forEach(x => x.classList.toggle('on', x === b)); render(); });
  load();
  // Canlı yayın şeridi
  feeds.live(YT_CHANNELS.map(k => k.id)).then(d => { const l = (d.items || []).find(x => x.live); if (!l) return; const ch = YT_CHANNELS.find(k => k.id === l.channelId); ctx.root.querySelector('#live-slot').innerHTML = `<a class="card live-card tap" href="#/tv/${esc(l.videoId)}"><span class="live-badge"><i></i>CANLI</span><b>${esc(ch?.ad || '')}</b><span>${esc(l.title || 'Canlı yayın sürüyor')}</span>${icons.chevron}</a>`; }).catch(() => {});
}

export async function paylasimDetay(ctx) {
  ctx.title('Paylaşım');
  const all = await posts.list({ mine: !!store.user }).catch(() => []);
  let p = all.find(x => x.id === ctx.params.id) || (await posts.list()).find(x => x.id === ctx.params.id);
  if (!p) { ctx.root.innerHTML = empty('Paylaşım bulunamadı'); return; }
  const it = feedItem({ ...p, tur: 'paylasim' });
  const card = feedCard(it);
  card.querySelector('.feed-body p')?.replaceWith(el(`<p style="white-space:pre-wrap">${esc(p.metin)}</p>`));
  ctx.root.innerHTML = ''; ctx.root.appendChild(card);
  if (store.user && (store.user.uid === p.uid || store.isAdmin)) {
    const bar = el(`<div class="btn-row" style="margin-top:10px"><button class="btn sm" id="del">${icons.trash} Sil</button>${store.isAdmin && p.durum !== 'onayli' ? `<button class="btn sm primary" id="ok">${icons.check} Onayla</button>` : ''}</div>`);
    ctx.root.appendChild(bar);
    bar.querySelector('#del').onclick = async () => { if (confirm('Paylaşım silinsin mi?')) { await posts.remove(p.id); toast('Silindi'); go('#/akis'); } };
    bar.querySelector('#ok')?.addEventListener('click', async () => { await posts.setDurum(p.id, 'onayli'); toast('Onaylandı'); paylasimDetay(ctx); });
  }
  ctx.root.appendChild(commentsSection(p.id));
}
