// Vercel Edge Middleware — hassas dosya engeli + panel.html JWT dogrulamasi
export const config = {
  matcher: '/:path*',
};

const PANEL_PATH = '/birlikteiyilik-v2/yonetim/panel.html';

function notFound() {
  return new Response('Not found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}

function isSensitivePath(pathname) {
  let path = pathname;
  try { path = decodeURIComponent(pathname); } catch (_) {}

  if (path === '/.well-known/security.txt') return false;
  if (/(^|\/)\.(?!well-known\/)/.test(path)) return true;
  if (/\.(?:bak|backup|old|orig|sql|env|log|map|zip|tar|tgz|gz|rar|7z)$/i.test(path)) return true;
  if (/(^|\/)(?:scripts|tests|\.claude)(?:\/|$)/i.test(path)) return true;
  if (/(^|\/)(?:DENETIM_RAPORU_|.*PROMPT.*\.md$|README(?:\s+\d+)?\.md$)/i.test(path)) return true;
  return false;
}

async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const msg = `${header}.${body}`;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const pad = s => {
      const r = s.length % 4;
      return s.replace(/-/g, '+').replace(/_/g, '/') + (r === 2 ? '==' : (r === 3 ? '=' : ''));
    };
    const sigBytes = Uint8Array.from(atob(pad(sig)), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(msg));
    if (!valid) return null;
    const payload = JSON.parse(atob(pad(body)));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch (e) { return null; }
}

export default async function middleware(req) {
  const { pathname } = new URL(req.url);

  if (isSensitivePath(pathname)) {
    return notFound();
  }

  if (pathname !== PANEL_PATH) {
    return;
  }

  const JWT_SECRET = process.env.BIA_JWT_SECRET || process.env.BIA_ADMIN_PASSWORD || '';

  // Güvenlik: secret yoksa giriş sayfasına yönlendir
  if (!JWT_SECRET) {
    const loginUrl = new URL('/birlikteiyilik-v2/yonetim/', req.url);
    return Response.redirect(loginUrl, 302);
  }

  // Cookie'den JWT token'ı al
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.split(';').find(c => c.trim().startsWith('bia_auth='));
  const token = match ? match.trim().split('=').slice(1).join('=') : '';

  // JWT imzasını ve süresini doğrula
  const payload = token ? await verifyJWT(token, JWT_SECRET) : null;

  if (!payload) {
    const loginUrl = new URL('/birlikteiyilik-v2/yonetim/', req.url);
    return Response.redirect(loginUrl, 302);
  }
}
