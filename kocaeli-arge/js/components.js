// Ortak bileşenler: haber kartı, video kartı, sosyal çubuk, yorumlar
import { icons, h, raw, el, esc, fmtRel, fmtDate, fmtSayi, share, toast, avatar } from './ui.js';
import { social, store } from './backend.js';
import { go } from './router.js';

export function newsCard(item, { big = false } = {}) {
  const href = item.link ? `#/haberler/${encodeURIComponent(item.id)}` : `#/haberler/${encodeURIComponent(item.id)}`;
  const img = item.image || item.resim;
  const chipCls = item.kaynak === 'MEB' ? 'navy' : item.kaynak === 'Kocaeli AR-GE' ? 'teal' : 'meb';
  return h`<a class="card news tap ${big ? 'big' : ''}" href="${href}">
    ${raw(img ? `<img class="img" src="${esc(img)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : `<div class="img ph">${icons.news}</div>`)}
    <div class="body"><h3>${item.title || item.baslik}</h3>
    <div class="meta"><span class="chip ${chipCls}">${item.kaynak || item.kategori || 'Kurumsal'}</span>${item.tur === 'duyuru' ? raw('<span class="chip amber">Duyuru</span>') : ''}<span>${item.date || item.tarih ? fmtRel(item.date || item.tarih) : ''}</span></div></div></a>`;
}

export function videoCard(v) {
  return h`<a class="card video tap" href="#/tv/${v.videoId}">
    <div class="thumb"><img src="${v.thumb}" alt="" loading="lazy"><div class="play"><i>${raw(icons.play)}</i></div></div>
    <div class="body"><h3>${v.title}</h3><div class="meta" style="font-size:12px;color:var(--muted)">${v.channel} · ${fmtRel(v.date)}${v.views ? ' · ' + fmtSayi(v.views) + ' görüntülenme' : ''}</div></div></a>`;
}

// Beğeni / yorum / paylaş / favori / görüntülenme çubuğu
export function socialBar(id, { title, url, onComments } = {}) {
  const node = el(`<div class="social">
    <button class="like" aria-label="Beğen">${icons.heart}<span>0</span></button>
    <button class="cmt" aria-label="Yorumlar">${icons.comment}<span>0</span></button>
    <button class="shr" aria-label="Paylaş">${icons.share}<span>Paylaş</span></button>
    <button class="fav" aria-label="Favorilere ekle">${icons.star}</button>
    <span class="views">${icons.eye}<b>0</b></span></div>`);
  const like = node.querySelector('.like'), cmt = node.querySelector('.cmt'), fav = node.querySelector('.fav'), views = node.querySelector('.views b');
  async function refresh() {
    const s = await social.get(id);
    like.classList.toggle('on', s.liked); like.innerHTML = (s.liked ? icons.heartFill : icons.heart) + `<span>${fmtSayi(s.begeni)}</span>`;
    cmt.querySelector('span').textContent = fmtSayi(s.yorum);
    fav.classList.toggle('on', s.fav); fav.innerHTML = s.fav ? icons.starFill : icons.star;
    views.textContent = fmtSayi(s.goruntulenme);
  }
  like.addEventListener('click', async () => { if (!store.user) return toast('Beğenmek için giriş yapın'); await social.like(id); refresh(); });
  fav.addEventListener('click', async () => { const on = await social.fav(id); toast(on ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı'); refresh(); });
  node.querySelector('.shr').addEventListener('click', () => share({ title, text: title, url: url || location.href }));
  cmt.addEventListener('click', () => onComments ? onComments() : document.querySelector('.comments')?.scrollIntoView({ behavior: 'smooth' }));
  social.view(id).then(refresh);
  const unsub = social.subscribe(id, refresh);
  node.refresh = refresh; node.destroy = unsub;
  return node;
}

export function commentsSection(id) {
  const node = el(`<div class="comments"><h3 style="font-size:15px;margin:0 0 8px">Yorumlar</h3><div class="list"></div>
    <form class="comment-form"><input type="text" maxlength="600" placeholder="${store.user ? 'Yorum yazın…' : 'Yorum yapmak için giriş yapın'}" ${store.user ? '' : 'disabled'}><button class="btn primary sm" type="submit" ${store.user ? '' : 'disabled'}>${icons.send}</button></form></div>`);
  const list = node.querySelector('.list');
  async function load() {
    const items = await social.comments(id);
    list.innerHTML = items.length ? items.map(y => h`<div class="comment">${raw(avatar(y))}<div class="tx"><b>${y.ad}</b><small>${fmtRel(y.tarih)}</small><p>${y.metin}</p></div>${(store.user && (store.user.uid === y.uid || store.isAdmin)) ? raw(`<button class="icon-btn" data-del="${esc(y.id)}" aria-label="Sil">${icons.trash}</button>`) : (store.user ? raw(`<button class="icon-btn" data-rep="${esc(y.id)}" data-txt="${esc(y.metin.slice(0, 80))}" aria-label="Şikâyet et" style="color:var(--muted)">${icons.flag}</button>`) : '')}</div>`).join('')
      : '<p style="color:var(--muted);font-size:13px;margin:0">Henüz yorum yok. İlk yorumu siz yazın.</p>';
    list.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', async () => { await social.deleteComment(id, b.dataset.del); load(); document.querySelector('.social')?.refresh?.(); }));
    list.querySelectorAll('[data-rep]').forEach(b => b.addEventListener('click', () => import('./views/akis.js').then(m => m.reportSheet('yorum', `${id}/${b.dataset.rep}`, b.dataset.txt))));
  }
  node.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inp = node.querySelector('input'); if (!inp.value.trim()) return;
    try { await social.addComment(id, inp.value); inp.value = ''; toast('Yorumunuz eklendi'); load(); document.querySelector('.social')?.refresh?.(); }
    catch (err) { toast(err.message === 'login' ? 'Giriş yapmanız gerekir' : 'Yorum eklenemedi'); }
  });
  load();
  return node;
}

export function ytEmbed(videoId, { autoplay = 1 } = {}) {
  return `<div class="player"><iframe src="https://www.youtube-nocookie.com/embed/${esc(videoId)}?autoplay=${autoplay}&playsinline=1&rel=0&modestbranding=1&hl=tr" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
}
export function ytLive(channelId) {
  return `<div class="player"><iframe src="https://www.youtube-nocookie.com/embed/live_stream?channel=${esc(channelId)}&autoplay=0&playsinline=1&hl=tr" title="Canlı yayın" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
}
export const listRow = ({ icon = 'file', title, sub, href, right = '' }) => h`<a class="row tap" href="${href || '#'}"><span class="ic">${raw(icons[icon] || icons.file)}</span><span class="tx"><b>${title}</b>${sub ? raw(`<span>${esc(sub)}</span>`) : ''}</span>${raw(right)}<span class="arrow">${raw(icons.chevron)}</span></a>`;
