// Kocaeli MEM TV: YouTube kanalları (Kocaeli MEM, MEB, EBA), canlı yayın, son videolar, oynatma listeleri, seçki
import { icons, h, raw, el, esc, fmtRel, fmtSayi, skeletons, empty, toast } from '../ui.js';
import { store } from '../backend.js';
import { feeds } from '../feeds.js';
import { videoCard, socialBar, commentsSection, ytEmbed, ytLive } from '../components.js';
import { YT_CHANNELS } from '../config.js';

export async function tv(ctx) {
  ctx.title('Kocaeli MEM TV');
  const c = store.content;
  let ch = YT_CHANNELS.find(x => x.id === ctx.query.k) || YT_CHANNELS[0];
  let mode = ctx.query.m || 'son';
  const listeler = (c.oynatmaListeleri || []).filter(p => !p.kanal || p.kanal === ch.id);
  ctx.root.innerHTML = `
    <div class="channels">${YT_CHANNELS.map(k => `<button data-k="${k.id}" class="${k.id === ch.id ? 'on' : ''}"><i style="background:${k.renk}"></i>${esc(k.ad)}</button>`).join('')}</div>
    <div class="seg">${[['son', 'Son videolar'], ['canli', 'Canlı yayın'], ['liste', 'Oynatma listeleri'], ['secki', 'AR-GE Seçkisi']].map(([k, v]) => `<button data-m="${k}" class="${k === mode ? 'on' : ''}">${v}</button>`).join('')}</div>
    <div id="tv-body"></div>`;
  const body = ctx.root.querySelector('#tv-body');
  async function render() {
    if (mode === 'canli') {
      body.innerHTML = `<div class="card pad"><div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span class="live-badge"><i></i>CANLI</span><b>${esc(ch.ad)}</b></div>${ytLive(ch.id)}<p style="font-size:12.5px;color:var(--text-2);margin:0">Kanal şu anda yayında değilse oynatıcı bekleme ekranı gösterir. Canlı yayın başladığında bildirim tercihlerinizde "Canlı yayınlar" açıksa haber verilir.</p>
        <a class="btn sm block" style="margin-top:10px" href="https://www.youtube.com/channel/${ch.id}/live" target="_blank" rel="noopener">${icons.youtube} YouTube'da aç</a></div>`;
      return;
    }
    if (mode === 'liste') {
      body.innerHTML = listeler.length ? `<div class="card">${listeler.map(p => h`<a class="row tap" href="#/tv?k=${ch.id}&m=liste&p=${p.id}"><span class="ic">${raw(icons.play)}</span><span class="tx"><b>${p.ad}</b><span>${p.aciklama || 'Oynatma listesi'}</span></span><span class="arrow">${raw(icons.chevron)}</span></a>`).join('')}</div><div id="pl"></div>`
        : `<div class="notice">Bu kanal için henüz oynatma listesi tanımlanmadı. Yönetici paneli → Videolar bölümünden YouTube oynatma listesi kimliği eklenir.</div><a class="btn sm block" href="https://www.youtube.com/channel/${ch.id}/playlists" target="_blank" rel="noopener">${icons.youtube} Kanalın listelerini YouTube'da gör</a>`;
      const pid = ctx.query.p; if (pid) { const n = body.querySelector('#pl'); n.innerHTML = skeletons(2, 'video'); try { const d = await feeds.playlist(pid); n.innerHTML = `<h2 style="font-size:15px;margin:14px 0 8px">${esc(listeler.find(x => x.id === pid)?.ad || 'Liste')}</h2><div class="card-list">${(d.items || []).map(videoCard).join('') || empty('Liste boş')}</div>`; } catch (_) { n.innerHTML = empty('Liste yüklenemedi'); } }
      return;
    }
    if (mode === 'secki') {
      const vids = (c.videolar || []);
      body.innerHTML = vids.length ? `<div class="card-list">${vids.map(v => videoCard({ videoId: v.videoId, title: v.baslik, thumb: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`, channel: v.kanal || 'Kocaeli MEM AR-GE', date: v.tarih })).join('')}</div>` : `<div class="notice">AR-GE Birimi tarafından seçilen videolar burada listelenir. Yönetici panelinden video eklenir.</div>`;
      return;
    }
    body.innerHTML = `<div class="card-list">${skeletons(3, 'video')}</div>`;
    try { const d = await feeds.channel(ch.id); body.innerHTML = `<div class="card-list">${(d.items || []).map(videoCard).join('') || empty('Video bulunamadı', 'play')}</div>${d.stale ? '<p class="notice">Çevrim dışı: kayıtlı liste gösteriliyor.</p>' : ''}`; }
    catch (_) { body.innerHTML = `<div class="notice warn">Video listesi alınamadı. Sunucu uç noktası yayında olduğunda kanal videoları otomatik gelir.</div><a class="btn sm block" href="https://www.youtube.com/channel/${ch.id}" target="_blank" rel="noopener">${icons.youtube} Kanalı YouTube'da aç</a>`; }
  }
  ctx.root.querySelectorAll('.channels button').forEach(b => b.addEventListener('click', () => { ch = YT_CHANNELS.find(x => x.id === b.dataset.k); ctx.root.querySelectorAll('.channels button').forEach(x => x.classList.toggle('on', x === b)); history.replaceState(null, '', `#/tv?k=${ch.id}&m=${mode}`); render(); }));
  ctx.root.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; ctx.root.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b)); history.replaceState(null, '', `#/tv?k=${ch.id}&m=${mode}`); render(); }));
  render();
}

export async function video(ctx) {
  ctx.title('Video');
  const vid = ctx.params.id;
  const id = 'v' + vid;
  let meta = null;
  for (const ch of YT_CHANNELS) { try { const d = await feeds.channel(ch.id); meta = (d.items || []).find(x => x.videoId === vid); if (meta) break; } catch (_) {} }
  if (!meta) { const s = (store.content.videolar || []).find(v => v.videoId === vid); if (s) meta = { videoId: vid, title: s.baslik, channel: s.kanal || 'Kocaeli MEM AR-GE', date: s.tarih, summary: s.aciklama || '', views: 0 }; }
  const title = meta?.title || 'Video';
  const card = el(`<div class="card" style="padding:0">${ytEmbed(vid)}<div style="padding:0 14px 10px"><h1 style="font-size:17px;margin:0 0 6px;line-height:1.3">${esc(title)}</h1>
    <div style="font-size:12.5px;color:var(--text-2)">${esc(meta?.channel || '')}${meta?.date ? ' · ' + fmtRel(meta.date) : ''}${meta?.views ? ' · YouTube: ' + fmtSayi(meta.views) + ' görüntülenme' : ''}</div>
    ${meta?.summary ? `<p style="font-size:13.5px;color:var(--text-2);margin:8px 0 0">${esc(meta.summary)}</p>` : ''}
    <div class="btn-row" style="margin-top:10px"><button class="btn sm" id="fs">${icons.external} Tam ekran</button><a class="btn sm ghost" href="https://www.youtube.com/watch?v=${esc(vid)}" target="_blank" rel="noopener">${icons.youtube} YouTube'da aç</a></div></div></div>`);
  card.appendChild(socialBar(id, { title, url: `https://www.youtube.com/watch?v=${vid}` }));
  card.appendChild(commentsSection(id));
  ctx.root.innerHTML = ''; ctx.root.appendChild(card);
  card.querySelector('#fs').addEventListener('click', () => { const f = card.querySelector('iframe'); (f.requestFullscreen || f.webkitRequestFullscreen)?.call(f) || toast('Oynatıcıdaki tam ekran düğmesini kullanın'); });
}
