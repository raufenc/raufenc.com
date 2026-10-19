// Arayüz yardımcıları: ikonlar, biçimlendirme, toast, alt pencere, paylaşım
const P = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;
export const icons = {
  home: P('<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>'),
  news: P('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h6M7 12h10M7 16h10"/>'),
  play: P('<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z" fill="currentColor"/>'),
  calendar: P('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  menu: P('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  grid: P('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
  bell: P('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  megaphone: P('<path d="M3 10v4l11 4V6z"/><path d="M14 9a3 3 0 0 1 0 6M7 14v5h3"/>'),
  flask: P('<path d="M9 3h6M10 3v6L4 20h16l-6-11V3"/><path d="M7 15h10"/>'),
  atom: P('<circle cx="12" cy="12" r="1.5" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>'),
  globe: P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
  book: P('<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>'),
  sparkles: P('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/><circle cx="12" cy="12" r="3"/>'),
  file: P('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>'),
  phone: P('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  mail: P('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  map: P('<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>'),
  user: P('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  users: P('<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="9" r="3"/><path d="M15 15a6 6 0 0 1 7 5"/>'),
  heart: P('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'),
  heartFill: P('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="currentColor"/>'),
  comment: P('<path d="M4 5h16v11H9l-5 4z"/>'),
  share: P('<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6"/>'),
  star: P('<path d="m12 3 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.3 6.3 20.4l1.2-6.3L2.8 9.7l6.4-.8z"/>'),
  starFill: P('<path d="m12 3 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.3 6.3 20.4l1.2-6.3L2.8 9.7l6.4-.8z" fill="currentColor"/>'),
  eye: P('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  search: P('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  back: P('<path d="m15 5-7 7 7 7"/>'),
  chevron: P('<path d="m9 5 7 7-7 7"/>'),
  chevronDown: P('<path d="m5 9 7 7 7-7"/>'),
  close: P('<path d="M6 6l12 12M18 6 6 18"/>'),
  send: P('<path d="M3 11.5 21 3l-7 18-2.5-7.5z"/>'),
  check: P('<path d="m5 12 5 5 9-10"/>'),
  clock: P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  download: P('<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/>'),
  external: P('<path d="M14 4h6v6M20 4l-9 9M19 14v6H5V6h6"/>'),
  settings: P('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  moon: P('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'),
  logout: P('<path d="M10 17l5-5-5-5M15 12H3M13 3h6v18h-6"/>'),
  graduation: P('<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>'),
  building: P('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>'),
  chart: P('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'),
  info: P('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
  alert: P('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>'),
  trash: P('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
  plus: P('<path d="M12 5v14M5 12h14"/>'),
  edit: P('<path d="M4 20h4l10-10-4-4L4 16z"/><path d="m12 8 4 4"/>'),
  tv: P('<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  copy: P('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),
  live: P('<circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M7.5 7.5a6.5 6.5 0 0 0 0 9M16.5 7.5a6.5 6.5 0 0 1 0 9M4.5 4.5a10.5 10.5 0 0 0 0 15M19.5 4.5a10.5 10.5 0 0 1 0 15"/>'),
  youtube: P('<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8z"/><path d="m10 9 5 3-5 3z" fill="currentColor"/>'),
};

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const h = (strings, ...vals) => strings.reduce((a, s, i) => a + s + (i < vals.length ? (vals[i] instanceof Raw ? vals[i].s : esc(vals[i])) : ''), '');
class Raw { constructor(s) { this.s = s; } }
export const raw = (s) => new Raw(s);
export const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const AYLAR_K = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
const GUNLER = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
export const GUNLER_K = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
export const toDate = (v) => { if (!v) return null; if (v instanceof Date) return v; if (v?.toDate) return v.toDate(); const d = new Date(v); return isNaN(d) ? null : d; };
export function fmtDate(v, opts = {}) {
  const d = toDate(v); if (!d) return '';
  let s = `${d.getDate()} ${AYLAR[d.getMonth()]} ${d.getFullYear()}`;
  if (opts.gun) s = `${GUNLER[d.getDay()]}, ${s}`;
  if (opts.saat) s += ` ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return s;
}
export const fmtAyKisa = (d) => AYLAR_K[d.getMonth()];
export const fmtAy = (d) => `${AYLAR[d.getMonth()]} ${d.getFullYear()}`;
export function fmtRel(v) {
  const d = toDate(v); if (!d) return '';
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} sa önce`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} gün önce`;
  return fmtDate(d);
}
export function kalanGun(v) { const d = toDate(v); if (!d) return null; return Math.ceil((d.setHours(23, 59, 59, 999) - Date.now()) / 86400000); }
export const fmtSayi = (n) => new Intl.NumberFormat('tr-TR').format(Number(n || 0));
export const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

let toastTimer;
export function toast(msg, ms = 2400) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = el(h`<div class="toast" role="status">${msg}</div>`);
  document.body.appendChild(t);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.remove(), ms);
}

export function sheet(innerHtml, { onClose } = {}) {
  const bg = el(`<div class="sheet-bg" role="dialog" aria-modal="true"><div class="sheet"><div class="grip"></div>${innerHtml}</div></div>`);
  const close = () => { bg.remove(); document.removeEventListener('keydown', esc1); onClose?.(); };
  const esc1 = (e) => { if (e.key === 'Escape') close(); };
  bg.addEventListener('click', (e) => { if (e.target === bg) close(); });
  bg.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
  document.addEventListener('keydown', esc1);
  document.body.appendChild(bg);
  return { el: bg, close };
}

export async function share({ title, text, url }) {
  try {
    if (navigator.share) { await navigator.share({ title, text, url }); return true; }
  } catch (e) { if (e?.name === 'AbortError') return false; }
  try { await navigator.clipboard.writeText(url || text || title); toast('Bağlantı panoya kopyalandı'); return true; }
  catch (_) { toast('Paylaşım desteklenmiyor'); return false; }
}

// Basit Markdown → HTML (asistan cevapları için): **kalın**, listeler, başlıklar
export function md(src) {
  const lines = esc(src).split('\n');
  let out = '', inList = false;
  for (let l of lines) {
    l = l.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>');
    const li = l.match(/^\s*(?:[-•*]|\d+[.)])\s+(.*)/);
    if (li) { if (!inList) { out += '<ul>'; inList = true; } out += `<li>${li[1]}</li>`; continue; }
    if (inList) { out += '</ul>'; inList = false; }
    const hd = l.match(/^#{1,4}\s+(.*)/);
    if (hd) { out += `<strong>${hd[1]}</strong><br>`; continue; }
    out += l ? l + '<br>' : '';
  }
  if (inList) out += '</ul>';
  return out.replace(/(<br>){3,}/g, '<br><br>');
}

export function skeletons(n = 3, cls = 'news') {
  return Array.from({ length: n }, () => `<div class="card ${cls}"><div class="img skeleton"></div><div><div class="skeleton" style="height:14px;margin:6px 0"></div><div class="skeleton" style="height:14px;width:70%;margin:6px 0"></div><div class="skeleton" style="height:10px;width:40%"></div></div></div>`).join('');
}
export const empty = (msg, icon = 'info') => `<div class="empty">${icons[icon]}<div>${esc(msg)}</div></div>`;
export const avatar = (u) => u?.foto ? `<span class="avatar"><img src="${esc(u.foto)}" alt="" referrerpolicy="no-referrer"></span>` : `<span class="avatar">${esc((u?.ad || 'K').trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toLocaleUpperCase('tr-TR'))}</span>`;
