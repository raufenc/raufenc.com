// Haber/duyuru/video akışları: sunucu uç noktasından çeker, bellek + yerel önbellek tutar (çevrim dışı yedek).
import { API } from './config.js';
const mem = new Map();
const b64url = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const LSK = 'arge.feed.';
function lsGet(k) { try { const s = localStorage.getItem(LSK + k); return s ? JSON.parse(s) : null; } catch (_) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(LSK + k, JSON.stringify({ t: Date.now(), v })); } catch (_) {} }

async function cachedFetch(key, url, ttl = 5 * 60 * 1000) {
  const m = mem.get(key);
  if (m && Date.now() - m.t < ttl) return m.v;
  try {
    const r = await fetch(url);
    const d = await r.json();
    if (!r.ok || d.error) throw new Error(d.error || r.status);
    mem.set(key, { t: Date.now(), v: d }); lsSet(key, d);
    return d;
  } catch (e) {
    const old = lsGet(key);
    if (old) { mem.set(key, { t: 0, v: old.v }); return { ...old.v, stale: true }; }
    throw e;
  }
}
export const feeds = {
  all: () => cachedFetch('all', `${API.feed}?src=all`),
  detail: (url) => cachedFetch('d:' + url, `${API.feed}?src=detail&u=${b64url(url)}`, 60 * 60 * 1000),
  channel: (id) => cachedFetch('yt:' + id, `${API.feed}?src=yt&channel=${encodeURIComponent(id)}`),
  playlist: (id) => cachedFetch('pl:' + id, `${API.feed}?src=yt&playlist=${encodeURIComponent(id)}`),
  live: (ids) => cachedFetch('live:' + ids.join(','), `${API.feed}?src=live&channel=${encodeURIComponent(ids.join(','))}`, 2 * 60 * 1000),
};
