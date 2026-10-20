// Kocaeli MEM AR-GE Portalı — haber / duyuru / video toplayıcı (Edge)
// Kaynaklar: Kocaeli İl MEM RSS, Kocaeli AR-GE RSS, MEB ana sayfa haber kuşağı,
// YouTube kanal/oynatma listesi RSS'leri. Sunucu tarafında 10 dk önbellek.
export const config = { runtime: 'edge' };

const UA = 'Mozilla/5.0 (compatible; KocaeliArgePortal/1.2)';
const TTL_MS = 10 * 60 * 1000;
const CACHE = new Map();

// rss_duyurular.xml her iki sitede de haber + duyuru karışık, 40 kayıtlık tam akıştır;
// <category>1</category> haber, <category>2</category> duyuru demektir.
const SOURCES = {
  'kocaeli': { kind: 'rss', url: 'https://kocaeli.meb.gov.tr/meb_iys_dosyalar/xml/rss_duyurular.xml',     kaynak: 'Kocaeli İl MEM' },
  'arge':    { kind: 'rss', url: 'https://kocaeliarge.meb.gov.tr/meb_iys_dosyalar/xml/rss_duyurular.xml', kaynak: 'Kocaeli AR-GE' },
  'meb':     { kind: 'meb', url: 'https://www.meb.gov.tr/',                                                 kaynak: 'MEB', tur: 'haber' },
};

const DETAIL_HOSTS = ['kocaeli.meb.gov.tr', 'kocaelimeb.gov.tr', 'www.kocaelimeb.gov.tr', 'kocaeliarge.meb.gov.tr', 'www.meb.gov.tr', 'meb.gov.tr'];
const YT_ID = /^[A-Za-z0-9_-]{10,40}$/;

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': status === 200 ? 'public, s-maxage=600, stale-while-revalidate=3600' : 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extra,
    },
  });
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&');
}
function stripTags(s) { return decodeEntities(String(s || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim(); }
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return m ? m[1].trim() : '';
}
function attr(block, name, attrName) {
  const m = block.match(new RegExp(`<${name}\\b[^>]*\\b${attrName}=["']([^"']+)["']`, 'i'));
  return m ? m[1] : '';
}
function hashId(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}
function absolutize(url, base) { try { return new URL(url, base).href; } catch (_) { return ''; } }

async function fetchText(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xml,text/xml,*/*' }, redirect: 'follow' });
  if (!r.ok) throw new Error(`upstream_${r.status}`);
  return r.text();
}

function parseRss(xml, meta) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = re.exec(xml)) && items.length < 40) {
    const b = m[1];
    const link = stripTags(tag(b, 'link')) || stripTags(tag(b, 'guid'));
    const desc = decodeEntities(tag(b, 'description'));
    const img = attr(desc, 'img', 'src');
    const title = stripTags(tag(b, 'title')).replace(/\.$/, '');
    if (!title || !link) continue;
    const cat = stripTags(tag(b, 'category'));
    const image = img && !/mansetresim|logo_/i.test(img) ? absolutize(img, link) : '';
    items.push({
      id: 'k' + hashId(link),
      title,
      link,
      image,
      summary: stripTags(desc).slice(0, 280),
      date: new Date(stripTags(tag(b, 'pubDate')) || Date.now()).toISOString(),
      kaynak: meta.kaynak,
      tur: meta.tur || (cat === '2' ? 'duyuru' : 'haber'),
    });
  }
  return items;
}

function parseMebHome(html, meta) {
  const items = [];
  const seen = new Set();
  const re = /<div class="swiper-slide news-slide">([\s\S]*?)<\/div>\s*<\/div>/gi;
  let m;
  while ((m = re.exec(html)) && items.length < 30) {
    const b = m[1];
    const href = attr(b, 'a', 'href');
    if (!href || !/\/haber\/\d+/.test(href) || seen.has(href)) continue;
    seen.add(href);
    const link = absolutize(href, meta.url);
    const title = stripTags(tag(b.match(/<a class="news-title"[\s\S]*?<\/a>/i)?.[0] || '', 'span')) || stripTags(attr(b, 'img', 'alt'));
    const sub = stripTags(tag(b.match(/<a class="news-sub-title"[\s\S]*?<\/a>/i)?.[0] || '', 'p')).replace(/\s*\[\.\.\.\]\s*$/, '…');
    const img = attr(b, 'img', 'src');
    if (!title) continue;
    items.push({
      id: 'm' + hashId(link),
      title: titleCase(title),
      link,
      image: img ? absolutize(img, meta.url) : '',
      summary: sub,
      date: '',
      kaynak: meta.kaynak,
      tur: meta.tur,
    });
  }
  return items;
}

// Türkçe harf duyarlı küçük/büyük harf (ICU verisi olmayan çalışma ortamları için güvenli)
const trLower = (s) => String(s).replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
const trUpper = (s) => String(s).replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase();
// MEB başlıkları tamamen büyük harf geliyor; okunabilirlik için Türkçe cümle düzenine çevir.
function titleCase(s) {
  if (s !== trUpper(s)) return s;
  const lower = trLower(s);
  return lower.replace(/(^|[^\p{L}'’])(\p{L})/gu, (m, p, c) => p + trUpper(c))
    .replace(/ Ve /g, ' ve ').replace(/ İle /g, ' ile ').replace(/ De /g, ' de ').replace(/ Da /g, ' da ');
}

function parseYoutube(xml) {
  const items = [];
  const re = /<entry>([\s\S]*?)<\/entry>/gi;
  let m;
  while ((m = re.exec(xml)) && items.length < 30) {
    const b = m[1];
    const vid = stripTags(tag(b, 'yt:videoId'));
    if (!vid) continue;
    items.push({
      id: 'v' + vid,
      videoId: vid,
      title: stripTags(tag(b, 'title')),
      channelId: stripTags(tag(b, 'yt:channelId')),
      channel: stripTags(tag(tag(b, 'author'), 'name')),
      date: stripTags(tag(b, 'published')),
      thumb: attr(b, 'media:thumbnail', 'url') || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
      summary: stripTags(tag(b, 'media:description')).slice(0, 220),
      views: Number(attr(b, 'media:statistics', 'views') || 0),
      link: `https://www.youtube.com/watch?v=${vid}`,
    });
  }
  return items;
}

function sanitizeArticle(html, base) {
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(iframe|object|embed|form|input|button|svg|video|audio)[\s\S]*?(<\/\1>|\/?>)/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/<a\b([^>]*)>/gi, (m, a) => {
      const href = (a.match(/href=["']([^"']+)["']/i) || [])[1] || '';
      const abs = absolutize(href, base);
      return abs && /^https?:/.test(abs) ? `<a href="${abs}" target="_blank" rel="noopener noreferrer">` : '<a>';
    })
    .replace(/<img\b([^>]*)>/gi, (m, a) => {
      const src = (a.match(/src=["']([^"']+)["']/i) || [])[1] || '';
      const abs = absolutize(src, base);
      return abs && /^https:/.test(abs) ? `<img src="${abs}" alt="" loading="lazy">` : '';
    })
    .replace(/<\/?(div|section|span|font|center)\b[^>]*>/gi, (m) => m.startsWith('</') ? '</p>' : '<p>')
    .replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '')
    .replace(/(<p>\s*){2,}/gi, '<p>').replace(/(<\/p>\s*){2,}/gi, '</p>');
  return s.trim().slice(0, 60000);
}

async function getDetail(url) {
  let u;
  try { u = new URL(url); } catch (_) { throw new Error('bad_url'); }
  if (u.protocol !== 'https:' || !DETAIL_HOSTS.includes(u.hostname)) throw new Error('host_not_allowed');
  const html = await fetchText(u.href);
  const block = html.match(/<div class="content article-detay">([\s\S]*?)<div class="social-links">/i)?.[1]
             || html.match(/<div class="content article-detay">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i)?.[1] || '';
  const date = stripTags((block.match(/bi-clock[^>]*><\/i>\s*(?:<span>)?\s*([^<]+)/i) || [])[1] || '').replace(/^güncelleme\s*:?\s*/i, '');
  const sourceViews = Number(stripTags((block.match(/bi-eye[^>]*><\/i>\s*<span>\s*(\d+)/i) || [])[1] || 0));
  const image = attr(block, 'img', 'src');
  const title = stripTags(tag(html.match(/<h2 class="main-title">[\s\S]*?<\/h2>/i)?.[0] || '', 'span')) || stripTags(tag(html, 'title'));
  const sub = stripTags((html.match(/<p class="sub-title">([\s\S]*?)<\/p>/i) || [])[1] || '');
  const body = sanitizeArticle(block.replace(/<div class="content-image">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, ''), u.href);
  return { title: titleCase(title), sub, date, sourceViews, image: image ? absolutize(image, u.href) : '', html: body, link: u.href };
}

// Kanal canlı yayında mı? /live sayfası canlı videoya yönlenir; değilse kanal sayfasına döner.
async function liveStatus(channelId) {
  const html = await fetchText(`https://www.youtube.com/channel/${channelId}/live`);
  // Canlı yayın varsa /live adresi izleme sayfasına döner (videoPrimaryInfoRenderer); yoksa kanal sayfası gelir.
  const isWatch = /"videoPrimaryInfoRenderer"|"currentVideoEndpoint"/.test(html);
  let vid = (html.match(/"currentVideoEndpoint":\{[^}]*?"watchEndpoint":\{"videoId":"([A-Za-z0-9_-]{11})"/) || [])[1]
    || (((html.match(/<link rel="canonical" href="([^"]+)"/i) || [])[1] || '').match(/[?&]v=([A-Za-z0-9_-]{11})/) || [])[1] || '';
  if (!vid && isWatch) { // en sık geçen videoId izlenen videodur
    const freq = {}; for (const m of html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)) freq[m[1]] = (freq[m[1]] || 0) + 1;
    vid = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  }
  const isLive = isWatch && !!vid && /"isLive":true|"isLiveNow":true/.test(html);
  const upcoming = isWatch && !!vid && !isLive && /"isUpcoming":true/.test(html);
  const rawTitle = (html.match(/"videoPrimaryInfoRenderer":\{"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/) || [])[1] || (html.match(/<meta name="title" content="([^"]*)"/i) || [])[1] || '';
  let title = ''; try { title = JSON.parse('"' + rawTitle + '"'); } catch (_) { title = rawTitle; }
  return { channelId, live: isLive, upcoming, videoId: isLive || upcoming ? vid : '', title: isLive || upcoming ? decodeEntities(title) : '' };
}

async function cached(key, fn, ttl = TTL_MS) {
  const hit = CACHE.get(key);
  if (hit && Date.now() - hit.t < ttl) return hit.v;
  const v = await fn();
  CACHE.set(key, { t: Date.now(), v });
  if (CACHE.size > 200) CACHE.clear();
  return v;
}

async function loadSource(name) {
  const meta = SOURCES[name];
  return cached('src:' + name, async () => {
    const text = await fetchText(meta.url);
    return meta.kind === 'meb' ? parseMebHome(text, meta) : parseRss(text, meta);
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (req.method !== 'GET') return json({ error: 'method_not_allowed' }, 405);
  const { searchParams } = new URL(req.url);
  const src = searchParams.get('src') || 'all';

  try {
    if (src === 'detail') {
      // Adres base64url ile gelir (u=); kodlanmış "/" içeren ham URL'ler site middleware'ince engellenir.
      let target = searchParams.get('url') || '';
      const u = searchParams.get('u') || '';
      if (u) { try { target = new TextDecoder().decode(Uint8Array.from(atob(u.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))); } catch (_) { return json({ error: 'bad_url' }, 400); } }
      const data = await cached('detail:' + target, () => getDetail(target));
      return json({ ok: true, ...data });
    }
    if (src === 'live') {
      const ids = (searchParams.get('channel') || '').split(',').filter(id => YT_ID.test(id)).slice(0, 5);
      if (!ids.length) return json({ error: 'bad_id' }, 400);
      const results = await Promise.all(ids.map(id => cached('live:' + id, () => liveStatus(id), 2 * 60 * 1000).catch(() => ({ channelId: id, live: false, error: true }))));
      return json({ ok: true, items: results, fetchedAt: new Date().toISOString() }, 200, { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' });
    }
    if (src === 'yt') {
      const channel = searchParams.get('channel') || '';
      const playlist = searchParams.get('playlist') || '';
      const id = playlist || channel;
      if (!YT_ID.test(id)) return json({ error: 'bad_id' }, 400);
      const url = playlist
        ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist}`
        : `https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`;
      const items = await cached('yt:' + id, async () => parseYoutube(await fetchText(url)));
      return json({ ok: true, items, fetchedAt: new Date().toISOString() });
    }
    const names = src === 'all' ? Object.keys(SOURCES) : src.split(',').filter(n => SOURCES[n]);
    if (!names.length) return json({ error: 'unknown_source' }, 400);
    const results = await Promise.allSettled(names.map(loadSource));
    const items = [];
    const errors = [];
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') items.push(...r.value);
      else errors.push({ source: names[i], error: String(r.reason?.message || r.reason) });
    });
    const seen = new Set();
    const unique = items.filter(i => { const k = i.link.replace(/^https?:\/\/(www\.)?/, ''); if (seen.has(k)) return false; seen.add(k); return true; });
    unique.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    items.length = 0; items.push(...unique);
    return json({ ok: true, items, errors, fetchedAt: new Date().toISOString() });
  } catch (e) {
    return json({ error: String(e?.message || 'fetch_failed') }, 502);
  }
}
