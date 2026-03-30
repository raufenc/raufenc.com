export const config = { runtime: 'edge' };

const REPO = 'raufenc/raufenc.com';
const NEWS_FILE = 'birlikteiyilik-site/content/news.json';
const GH_API = 'https://api.github.com';

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

  if (req.method === 'GET') {
    const { searchParams } = new URL(req.url);
    if (searchParams.get('password') !== ADMIN_PW)
      return json({ error: 'Yanlış şifre' }, 401);
    try {
      const data = await gh(`/repos/${REPO}/contents/${NEWS_FILE}`);
      const news = JSON.parse(atob(data.content.replace(/\n/g, '')));
      return json({ news, sha: data.sha });
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  }

  if (req.method === 'POST') {
    const body = await req.json();
    if (body.password !== ADMIN_PW) return json({ error: 'Yanlış şifre' }, 401);
    try {
      const news = (body.news || []).sort((a, b) =>
        (b.date || '').localeCompare(a.date || '')
      );
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(news, null, 2))));
      const result = await gh(`/repos/${REPO}/contents/${NEWS_FILE}`, 'PUT', {
        message: body.message || 'BIA: Haber güncellendi',
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
