export const config = { runtime: 'edge' };

const REPO = 'raufenc/raufenc.com';
const GH_API = 'https://api.github.com';
const BASE = 'birlikteiyilik-site/content/';

const FILES = {
  news:     BASE + 'news.json',
  events:   BASE + 'events.json',
  site:     BASE + 'site.json',
  faq:      BASE + 'faq.json',
  homepage: BASE + 'homepage.json',
  programs: BASE + 'programs.json',
};

export default async function handler(req) {
  const ADMIN_PW = process.env.BIA_ADMIN_PASSWORD || 'birlikte2026';
  const TOKEN = process.env.BIA_GITHUB_TOKEN || '';

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  };

  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

  const gh = (path, method = 'GET', data = null) =>
    fetch(`${GH_API}${path}`, {
      method,
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'BIA-Admin/1.0',
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    }).then(r => r.json());

  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: cors });

  const decode = (b64) => JSON.parse(decodeURIComponent(escape(atob(b64.replace(/\n/g, '')))));
  const encode = (obj) => btoa(unescape(encodeURIComponent(JSON.stringify(obj, null, 2))));

  if (req.method === 'GET') {
    const { searchParams } = new URL(req.url);
    if (searchParams.get('password') !== ADMIN_PW)
      return json({ error: 'Yanlış şifre' }, 401);
    const type = searchParams.get('type') || 'news';
    const file = FILES[type];
    if (!file) return json({ error: 'Geçersiz tip' }, 400);
    try {
      const data = await gh(`/repos/${REPO}/contents/${file}`);
      const content = decode(data.content);
      return json({ data: content, sha: data.sha });
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  }

  if (req.method === 'POST') {
    const body = await req.json();
    if (body.password !== ADMIN_PW) return json({ error: 'Yanlış şifre' }, 401);
    const type = body.type || 'news';
    const file = FILES[type];
    if (!file) return json({ error: 'Geçersiz tip' }, 400);
    try {
      let payload = body.data;
      // Sort arrays by date for news/events
      if ((type === 'news' || type === 'events') && Array.isArray(payload)) {
        payload = payload.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      }
      const content = encode(payload);
      const result = await gh(`/repos/${REPO}/contents/${file}`, 'PUT', {
        message: body.message || `BIA: ${type} güncellendi`,
        content,
        sha: body.sha || '',
      });
      return json({ ok: true, sha: result.content.sha });
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  }

  return new Response('Method not allowed', { status: 405 });
}
