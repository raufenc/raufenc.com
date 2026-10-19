// Kocaeli MEM AR-GE Portalı — Push bildirim gönderici (FCM HTTP v1, Edge)
// Gerekli ortam değişkenleri (Vercel):
//   ARGE_ADMIN_TOKEN           → yönetici panelinin bu uca gönderdiği gizli anahtar
//   ARGE_FCM_SERVICE_ACCOUNT   → Firebase servis hesabı JSON'u (düz veya base64)
// Abone cihaz token'ları Firestore "pushTokens" koleksiyonundan okunur ({ token, topics: [] }).
export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = ['https://raufenc.com', 'https://www.raufenc.com', 'http://localhost:3000', 'http://127.0.0.1:3000'];
const HITS = new Map();

function cors(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin);
  return { 'Access-Control-Allow-Origin': ok ? origin : ALLOWED_ORIGINS[0], 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Vary': 'Origin' };
}
function json(data, status, origin) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors(origin) } });
}
function b64url(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input);
  let s = ''; bytes.forEach(b => { s += String.fromCharCode(b); });
  return btoa(s).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '');
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}
function parseServiceAccount(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (_) {}
  try { return JSON.parse(atob(raw)); } catch (_) { return null; }
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function accessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/datastore',
    aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  }));
  const key = await crypto.subtle.importKey('pkcs8', pemToArrayBuffer(sa.private_key), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${header}.${claims}`));
  const jwt = `${header}.${claims}.${b64url(sig)}`;
  const r = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  if (!r.ok) throw new Error('token_' + r.status);
  return (await r.json()).access_token;
}

async function listTokens(sa, at, topic) {
  const base = `https://firestore.googleapis.com/v1/projects/${sa.project_id}/databases/(default)/documents`;
  const query = { structuredQuery: { from: [{ collectionId: 'pushTokens' }], limit: 5000 } };
  if (topic && topic !== 'genel') {
    query.structuredQuery.where = { fieldFilter: { field: { fieldPath: 'topics' }, op: 'ARRAY_CONTAINS', value: { stringValue: topic } } };
  }
  const r = await fetch(`${base}:runQuery`, { method: 'POST', headers: { 'Authorization': `Bearer ${at}`, 'Content-Type': 'application/json' }, body: JSON.stringify(query) });
  if (!r.ok) throw new Error('firestore_' + r.status);
  const rows = await r.json();
  return rows.filter(x => x.document).map(x => ({ name: x.document.name, token: x.document.fields?.token?.stringValue || x.document.name.split('/').pop() }));
}

async function sendOne(sa, at, t, msg) {
  const r = await fetch(`https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${at}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: {
      token: t.token,
      notification: { title: msg.title, body: msg.body },
      data: { url: msg.url || '/kocaeli-arge/', konu: msg.topic || 'genel' },
      webpush: {
        headers: { Urgency: 'high', TTL: '86400' },
        notification: { title: msg.title, body: msg.body, icon: '/kocaeli-arge/assets/icon-192.png', badge: '/kocaeli-arge/assets/badge-72.png', lang: 'tr' },
        fcm_options: { link: msg.url || 'https://raufenc.com/kocaeli-arge/' },
      },
    } }),
  });
  if (r.ok) return 'sent';
  const err = await r.json().catch(() => ({}));
  const code = err?.error?.details?.find(d => d.errorCode)?.errorCode || err?.error?.status || String(r.status);
  if (code === 'UNREGISTERED' || code === 'INVALID_ARGUMENT' || r.status === 404) {
    await fetch(`https://firestore.googleapis.com/v1/${t.name}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${at}` } }).catch(() => {});
    return 'removed';
  }
  return 'failed';
}

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, origin);

  const ip = (req.headers.get('x-forwarded-for') || 'anon').split(',')[0].trim();
  const now = Date.now();
  const hits = (HITS.get(ip) || []).filter(t => now - t < 60_000); hits.push(now); HITS.set(ip, hits);
  if (hits.length > 10) return json({ error: 'rate_limited' }, 429, origin);

  const ADMIN = process.env.ARGE_ADMIN_TOKEN || '';
  const auth = req.headers.get('authorization') || '';
  if (!ADMIN || !auth.startsWith('Bearer ') || !timingSafeEqual(auth.slice(7), ADMIN)) return json({ error: 'unauthorized' }, 401, origin);

  const sa = parseServiceAccount(process.env.ARGE_FCM_SERVICE_ACCOUNT || '');
  if (!sa?.private_key || !sa?.project_id) return json({ error: 'fcm_not_configured', message: 'ARGE_FCM_SERVICE_ACCOUNT tanımlı değil.' }, 503, origin);

  let body;
  try { body = JSON.parse((await req.text()).slice(0, 4000)); } catch (_) { return json({ error: 'bad_json' }, 400, origin); }
  const msg = {
    title: String(body.title || '').trim().slice(0, 120),
    body: String(body.body || '').trim().slice(0, 400),
    topic: String(body.topic || 'genel').replace(/[^a-z]/g, '').slice(0, 20) || 'genel',
    url: /^https:\/\/(www\.)?raufenc\.com\//.test(String(body.url || '')) ? body.url : 'https://raufenc.com/kocaeli-arge/',
  };
  if (!msg.title || !msg.body) return json({ error: 'missing_fields' }, 400, origin);

  try {
    const at = await accessToken(sa);
    const tokens = await listTokens(sa, at, msg.topic);
    const stats = { sent: 0, failed: 0, removed: 0, total: tokens.length };
    const CONC = 20;
    for (let i = 0; i < tokens.length; i += CONC) {
      const res = await Promise.all(tokens.slice(i, i + CONC).map(t => sendOne(sa, at, t, msg).catch(() => 'failed')));
      res.forEach(r => { stats[r]++; });
    }
    return json({ ok: true, ...stats }, 200, origin);
  } catch (e) {
    return json({ error: String(e?.message || 'send_failed') }, 502, origin);
  }
}
