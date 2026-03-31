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
const IMAGES_PATH = 'birlikteiyilik-site/static/images/';

export default async function handler(req) {
  const ADMIN_PW = process.env.BIA_ADMIN_PASSWORD;
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
    const type = searchParams.get('type') || 'news';
    const file = FILES[type];
    if (!file) return json({ error: 'Geçersiz tip' }, 400);

    const hasPw = searchParams.get('password') === ADMIN_PW;
    const isPublic = searchParams.has('public');

    if (!hasPw && !isPublic) return json({ error: 'Yanlış şifre' }, 401);

    try {
      const data = await gh(`/repos/${REPO}/contents/${file}`);
      const content = decode(data.content);
      // Public mode: data only, no sha. Admin mode: data + sha
      if (isPublic) {
        const publicCors = { ...cors, 'Cache-Control': 'public, max-age=60, s-maxage=60' };
        return new Response(JSON.stringify({ data: content }), { status: 200, headers: publicCors });
      }
      return json({ data: content, sha: data.sha });
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  }

  if (req.method === 'POST') {
    const body = await req.json();
    if (body.password !== ADMIN_PW) return json({ error: 'Yanlış şifre' }, 401);

    // Image upload handler
    if (body.type === 'upload') {
      const { filename, content: imgBase64 } = body;
      if (!filename || !imgBase64) return json({ error: 'filename ve content gerekli' }, 400);
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = IMAGES_PATH + safeName;
      // Check if file already exists (to get sha for update)
      let existingSha = '';
      try {
        const existing = await gh(`/repos/${REPO}/contents/${filePath}`);
        if (existing.sha) existingSha = existing.sha;
      } catch(_) {}
      const result = await gh(`/repos/${REPO}/contents/${filePath}`, 'PUT', {
        message: `BIA: görsel yüklendi — ${safeName}`,
        content: imgBase64,
        ...(existingSha ? { sha: existingSha } : {}),
      });
      const rawUrl = `https://raw.githubusercontent.com/${REPO}/main/${filePath}`;
      return json({ ok: true, url: rawUrl, path: filePath });
    }

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
