// Vercel Edge Middleware - sensitive path, scanner and panel.html JWT checks.
export const config = {
  matcher: '/:path*',
};

const PANEL_PATH = '/birlikteiyilik-v2/yonetim/panel.html';
const API_METHODS = {
  '/api/gemini': ['POST', 'OPTIONS'],
  '/api/ilmihal-search': ['POST', 'OPTIONS'],
  '/api/mizac-sohbet': ['POST', 'OPTIONS'],
  '/api/bia-news': ['GET', 'POST', 'OPTIONS'],
  '/api/kelime-ac': ['POST', 'OPTIONS'],
};
const PUBLIC_METHODS = ['GET', 'HEAD', 'OPTIONS'];
const SCANNER_PATHS = [
  /^\/wp-admin(?:\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/xmlrpc\.php$/i,
  /^\/phpmyadmin(?:\/|$)/i,
  /^\/pma(?:\/|$)/i,
  /^\/adminer(?:\/|$)/i,
  /^\/server-status$/i,
  /^\/cgi-bin(?:\/|$)/i,
  /^\/vendor\/phpunit(?:\/|$)/i,
  /^\/(?:composer\.(?:json|lock)|package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb)$/i,
];

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

function jsonError(error, status) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}

function methodNotAllowed(isApi) {
  if (isApi) return jsonError('method_not_allowed', 405);
  return new Response('Method not allowed', {
    status: 405,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'Allow': 'GET, HEAD, OPTIONS',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}

function safeDecode(value) {
  try { return decodeURIComponent(value); } catch (_) { return value; }
}

function isSensitivePath(pathname) {
  const path = safeDecode(pathname);

  if (path === '/.well-known/security.txt') return false;
  if (/(^|\/)\.(?!well-known\/)/.test(path)) return true;
  if (/\.(?:bak|backup|old|orig|sql|env|log|map|zip|tar|tgz|gz|rar|7z)$/i.test(path)) return true;
  if (/(^|\/)(?:scripts|tests|\.claude)(?:\/|$)/i.test(path)) return true;
  if (/(^|\/)(?:DENETIM_RAPORU_|.*PROMPT.*\.md$|README(?:\s+\d+)?\.md$)/i.test(path)) return true;
  return false;
}

function isSuspiciousPath(pathname, rawUrl) {
  const raw = String(rawUrl || pathname || '').toLowerCase();
  const decoded = safeDecode(pathname);
  const decodedTwice = safeDecode(decoded);

  if (/(?:%00|%2e|%2f|%5c|%3c|%3e|%252e|%252f|%255c)/i.test(raw)) return true;
  if (/[<>\0\\]/.test(decoded) || /[<>\0\\]/.test(decodedTwice)) return true;
  if (decoded.includes('..') || decodedTwice.includes('..')) return true;
  return false;
}

function isScannerPath(pathname) {
  const path = safeDecode(pathname);
  if (SCANNER_PATHS.some(pattern => pattern.test(path))) return true;
  if (/\.(?:php[0-9]?|phtml|phar|asp|aspx|jsp|cgi|pl)(?:$|\/)/i.test(path)) return true;
  return false;
}

function apiPolicy(pathname) {
  if (!pathname.startsWith('/api/')) return null;
  return API_METHODS[pathname] || [];
}

function fetchMetadataBlocked(req, pathname) {
  if (pathname === '/api/bia-news') return false;
  if (req.method !== 'POST' && req.method !== 'OPTIONS') return false;
  const site = req.headers.get('sec-fetch-site');
  return Boolean(site && !['same-origin', 'same-site', 'none'].includes(site));
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
  const apiMethods = apiPolicy(pathname);
  const isApi = pathname.startsWith('/api/');

  if (isSuspiciousPath(pathname, req.url) || isScannerPath(pathname) || isSensitivePath(pathname)) {
    return notFound();
  }

  if (isApi) {
    if (!apiMethods.length) return notFound();
    if (!apiMethods.includes(req.method)) return methodNotAllowed(true);
    if (fetchMetadataBlocked(req, pathname)) return jsonError('forbidden', 403);
  } else if (!PUBLIC_METHODS.includes(req.method)) {
    return methodNotAllowed(false);
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
