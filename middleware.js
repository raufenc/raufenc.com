// Vercel Edge Middleware - sensitive path, scanner and API method checks.
export const config = {
  matcher: '/:path*',
};

const API_METHODS = {
  '/api/sunumlar': ['GET', 'HEAD', 'POST', 'OPTIONS'],
  '/api/gemini': ['POST', 'OPTIONS'],
  '/api/ilmihal-search': ['POST', 'OPTIONS'],
  '/api/mizac-sohbet': ['POST', 'OPTIONS'],
  '/api/kelime-ac': ['POST', 'OPTIONS'],
  '/api/arge-feed': ['GET', 'OPTIONS'],
  '/api/arge-asistan': ['POST', 'OPTIONS'],
  '/api/arge-bildirim': ['POST', 'OPTIONS'],
  '/api/iletisim': ['POST', 'OPTIONS'],
  '/api/surum': ['GET', 'HEAD'],
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

function isSensitivePath(pathname, method) {
  const path = safeDecode(pathname);

  if (path === '/.well-known/security.txt') return false;
  // Public Siyer export: allow only this exact archive; backups stay blocked.
  if (path === '/ders-odasi/siyer/indir/siyer-ders-paketi.zip' && (method === 'GET' || method === 'HEAD')) return false;
  if (/(^|\/)\.(?!well-known\/)/.test(path)) return true;
  if (/\.(?:bak|backup|old|orig|sql|sqlite3?|env|log|map|zip|tar|tgz|gz|rar|7z)$/i.test(path)) return true;
  if (/(^|\/)(?:scripts|tests|\.claude)(?:\/|$)/i.test(path)) return true;
  // Sunucu tarafı kaynak ve yapılandırma dosyaları statik dosya olarak sunulmaz.
  if (/^\/(?:middleware\.js|vercel\.json|package\.json|lib\/(?:sunumlar-server\.mjs|guvenlik\.js))$/i.test(path)) return true;
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

// vercel.json'daki trailingSlash:true, /api/x isteğini /api/x/ adresine yönlendirir;
// izin tablosu iki yazımda da aynı uca baksın.
function apiYolu(pathname) {
  return pathname.length > 5 ? pathname.replace(/\/+$/, '') : pathname;
}

function apiPolicy(pathname) {
  if (!pathname.startsWith('/api/')) return null;
  return API_METHODS[apiYolu(pathname)] || [];
}

function fetchMetadataBlocked(req, pathname) {
  if (req.method !== 'POST' && req.method !== 'OPTIONS') return false;
  const site = req.headers.get('sec-fetch-site');
  return Boolean(site && !['same-origin', 'same-site', 'none'].includes(site));
}

// Ziyaretçi adresi büyük harfle ya da Türkçe karakterle yazsa da sayfaya ulaşsın:
// /Noroterbiye, /NÖROTERBİYE, /nöroterbiye → /noroterbiye/
// Yalnız uzantısız (sayfa) adreslerde çalışır; sitedeki bütün sayfa klasörleri
// küçük harfli ASCII'dir. Uzantılı dosyalara (FKH_10_kitap/1.jpg gibi) dokunmaz.
const TR_HARF = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' };

function sadeSayfaYolu(pathname) {
  const path = safeDecode(pathname);
  // Flutter uygulamasının uzantısız büyük harfli dosyası var (assets/NOTICES)
  if (path.startsWith('/kuran-ogretmenim/app/')) return null;
  const son = path.replace(/\/+$/, '').slice(path.replace(/\/+$/, '').lastIndexOf('/') + 1);
  if (son.includes('.') || !/[A-Z\u00c0-\u024f]/.test(path)) return null;
  const sade = path
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, c => TR_HARF[c])
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (sade === path) return null;
  return sade.endsWith('/') ? sade : sade + '/';
}

export default async function middleware(req) {
  const { pathname } = new URL(req.url);
  const apiMethods = apiPolicy(pathname);
  const isApi = pathname.startsWith('/api/');

  if (isSuspiciousPath(pathname, req.url) || isScannerPath(pathname) || isSensitivePath(pathname, req.method)) {
    return notFound();
  }

  if (isApi) {
    if (!apiMethods.length) return notFound();
    if (!apiMethods.includes(req.method)) return methodNotAllowed(true);
    if (fetchMetadataBlocked(req, pathname)) return jsonError('forbidden', 403);
  } else if (!PUBLIC_METHODS.includes(req.method)) {
    return methodNotAllowed(false);
  } else if (req.method !== 'OPTIONS') {
    const sade = sadeSayfaYolu(pathname);
    if (sade) {
      const hedef = new URL(req.url);
      hedef.pathname = sade;
      return Response.redirect(hedef, 308);
    }
  }
}
