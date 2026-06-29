export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = [
  'https://raufenc.com',
  'https://www.raufenc.com',
];
const HITS = new Map();

function requestOrigin(req) {
  return req.headers.get('origin') || req.headers.get('referer') || '';
}

function originOk(req) {
  const host = requestOrigin(req);
  if (!host) return false;
  if (ALLOWED_ORIGINS.some(origin => host.startsWith(origin))) return true;
  if (/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/.test(host)) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app/.test(host)) return true;
  return false;
}

function corsHeaders(req) {
  const origin = req.headers.get('origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) || /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(origin);
  return allowed ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : {};
}

function json(data, status, req) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      ...corsHeaders(req),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function rateLimited(req) {
  const ip = (req.headers.get('x-forwarded-for') || 'anon').split(',')[0].trim();
  const now = Date.now();
  const windowMs = 60000;
  const maxHits = 8;
  const hits = (HITS.get(ip) || []).filter(t => now - t < windowMs);
  hits.push(now);
  HITS.set(ip, hits);
  if (HITS.size > 5000) HITS.clear();
  return hits.length > maxHits;
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    if (!originOk(req)) return json({ error: 'forbidden' }, 403, req);
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders(req),
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '600',
      },
    });
  }

  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, req);
  if (!originOk(req)) return json({ error: 'forbidden' }, 403, req);
  if (rateLimited(req)) return json({ error: 'rate_limited' }, 429, req);

  const contentLength = Number(req.headers.get('content-length') || '0');
  if (contentLength > 14000) return json({ error: 'payload_too_large' }, 413, req);

  let body;
  try {
    body = await req.json();
  } catch (_) {
    return json({ error: 'invalid_json' }, 400, req);
  }

  const prompt = String(body.prompt || '').trim();
  const system = String(body.system || '').trim();
  if (prompt.length < 10 || prompt.length > 6000 || system.length > 6000) {
    return json({ error: 'invalid_input' }, 400, req);
  }
  if (!process.env.OPENAI_API_KEY) {
    return json({ error: 'service_unavailable' }, 503, req);
  }

  const messages = [];
  if (system) messages.push({ role: 'system', content: system });
  messages.push({ role: 'user', content: prompt });

  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 1200,
      stream: true,
      messages
    })
  });

  if (!upstream.ok || !upstream.body) {
    return json({ error: 'upstream_error' }, 502, req);
  }

  return new Response(upstream.body, {
    headers: {
      ...corsHeaders(req),
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    }
  });
}
