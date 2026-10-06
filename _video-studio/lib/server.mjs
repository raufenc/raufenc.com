// Yerel statik sunucu: raufenc.com kökünü Vercel'e yakın davranışla sunar.
// - dizin → index.html, sonda eğik çizgi yönlendirmesi
// - vercel.json rewrites (iyilikakademi, tarih SPA)
// - Range desteği (video oynatma testleri için)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const SITE_ROOT = path.resolve(HERE, '..', '..');
export const STUDIO_ROOT = path.resolve(HERE, '..');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.wav': 'audio/wav',
  '.ogg': 'audio/ogg', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json', '.vtt': 'text/vtt',
};

function loadRewrites() {
  try {
    const v = JSON.parse(fs.readFileSync(path.join(SITE_ROOT, 'vercel.json'), 'utf8'));
    return (v.rewrites || []).map((r) => {
      // ":path((?!x).*)" biçimini düzenli ifadeye çevir
      const src = '^' + r.source.replace(/:(\w+)\(([^)]*(?:\([^)]*\)[^)]*)*)\)/g, '($2)').replace(/:(\w+)\*/g, '(.*)') + '$';
      return { re: new RegExp(src), dest: r.destination };
    });
  } catch { return []; }
}

export function startServer({ port = 0, root = SITE_ROOT } = {}) {
  const rewrites = loadRewrites();
  const server = http.createServer((req, res) => {
    let urlPath;
    try { urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
    if (urlPath.startsWith('/api/')) { res.writeHead(404, { 'content-type': 'application/json' }).end('{"error":"offline"}'); return; }
    if (urlPath.startsWith('/_vercel/')) { res.writeHead(204).end(); return; }
    for (const r of rewrites) { if (r.re.test(urlPath)) { urlPath = r.dest; break; } }
    let file = path.join(root, urlPath);
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    let st;
    try { st = fs.statSync(file); } catch { st = null; }
    if (st && st.isDirectory()) {
      if (!urlPath.endsWith('/')) { res.writeHead(308, { location: urlPath + '/' + (new URL(req.url, 'http://x').search) }).end(); return; }
      file = path.join(file, 'index.html');
      try { st = fs.statSync(file); } catch { st = null; }
    }
    if (!st && !path.extname(file)) {
      // cleanUrls benzeri: /sayfa → /sayfa.html
      try { st = fs.statSync(file + '.html'); file += '.html'; } catch { st = null; }
    }
    if (!st) {
      const nf = path.join(root, '404.html');
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      fs.createReadStream(nf).on('error', () => res.end()).pipe(res);
      return;
    }
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const headers = { 'content-type': type, 'accept-ranges': 'bytes', 'cache-control': 'no-cache' };
    const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
    if (range) {
      const start = range[1] ? parseInt(range[1], 10) : 0;
      const end = range[2] ? Math.min(parseInt(range[2], 10), st.size - 1) : st.size - 1;
      res.writeHead(206, { ...headers, 'content-range': `bytes ${start}-${end}/${st.size}`, 'content-length': end - start + 1 });
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { ...headers, 'content-length': st.size });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => {
    const p = server.address().port;
    resolve({ server, port: p, origin: `http://127.0.0.1:${p}`, close: () => new Promise((r) => server.close(r)) });
  }));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const port = parseInt(process.argv[2] || '8090', 10);
  startServer({ port }).then((s) => console.log(`site: ${s.origin}`));
}
