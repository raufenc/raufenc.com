// Yakalama araç takımı: siteyi yerelde açar, engelli CDN'leri yerel kopyalara,
// harita karolarını yerel karo sunucusuna yönlendirir ve ekran görüntüsü alır.
//
// Kullanım (projects/<slug>/capture.mjs içinden):
//   import { withStudio } from '../../lib/capture.mjs';
//   await withStudio(async ({ desktop, mobile, shot, settle, origin }) => { ... });
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { ProxyAgent, fetch as ufetch } from 'undici';
import { startServer, STUDIO_ROOT } from './server.mjs';

const NM = path.join(STUDIO_ROOT, 'node_modules');
export const TILE_PORT = 8091;

// Engelli CDN → yerel npm kopyası
const LOCAL_LIBS = [
  [/^https:\/\/unpkg\.com\/leaflet@[\d.]+\/dist\/(.+)$/, (m) => path.join(NM, 'leaflet/dist', m[1])],
  [/^https:\/\/unpkg\.com\/leaflet\.markercluster@[\d.]+\/dist\/(.+)$/, (m) => path.join(NM, 'leaflet.markercluster/dist', m[1])],
  [/^https:\/\/unpkg\.com\/d3@7[^/]*\/dist\/(.+)$/, (m) => path.join(NM, 'd3/dist', m[1])],
  [/^https:\/\/unpkg\.com\/fuse\.js@[\d.]+\/dist\/(.+)$/, (m) => path.join(NM, 'fuse.js/dist', m[1])],
  [/^https:\/\/www\.gstatic\.com\/firebasejs\/[\d.]+\/(firebase-[\w-]+\.js)$/, (m) => path.join(NM, 'firebase', m[1])],
  [/^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/pdfmake\/[\d.]+\/(.+)$/, (m) => path.join(NM, 'pdfmake/build', m[1].replace('vfs_fonts.min.js', 'vfs_fonts.js'))],
  [/^https:\/\/cdn\.tailwindcss\.com.*$/, () => path.join(NM, '@tailwindcss/browser/dist/index.global.js')],
];

// Harita karoları → yerel karo sunucusu (stil, z/x/y sırası)
function tileFor(url) {
  let m;
  if ((m = url.match(/basemaps\.cartocdn\.com\/([\w_]+)\/(\d+)\/(\d+)\/(\d+)/))) {
    const s = m[1].includes('dark') ? 'dark' : m[1].includes('only_labels') ? 'labels' : 'light';
    return `${s}/${m[2]}/${m[3]}/${m[4]}`;
  }
  if ((m = url.match(/tile\.openstreetmap\.org\/(\d+)\/(\d+)\/(\d+)/))) return `osm/${m[1]}/${m[2]}/${m[3]}`;
  if ((m = url.match(/opentopomap\.org\/(\d+)\/(\d+)\/(\d+)/))) return `topo/${m[1]}/${m[2]}/${m[3]}`;
  if ((m = url.match(/arcgisonline\.com\/ArcGIS\/rest\/services\/World_Imagery\/MapServer\/tile\/(\d+)\/(\d+)\/(\d+)/))) return `imagery/${m[1]}/${m[3]}/${m[2]}`;
  if ((m = url.match(/arcgisonline\.com\/ArcGIS\/rest\/services\/[\w_]+\/MapServer\/tile\/(\d+)\/(\d+)\/(\d+)/))) return `physical/${m[1]}/${m[3]}/${m[2]}`;
  return null;
}

// Harici erişim (Google Fonts, raw.githubusercontent) Node tarafında vekil üzerinden
const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy;
const CA = fs.existsSync('/root/.ccr/ca-bundle.crt') ? fs.readFileSync('/root/.ccr/ca-bundle.crt') : undefined;
const DISPATCHER = PROXY ? new ProxyAgent({ uri: PROXY, requestTls: CA ? { ca: CA } : undefined }) : undefined;
const NET_CACHE = path.join(STUDIO_ROOT, '.cache', 'net');
async function proxiedFulfill(route, url) {
  const key = url.replace(/[^\w.-]+/g, '_').slice(-180);
  const fp = path.join(NET_CACHE, key);
  if (fs.existsSync(fp) && fs.existsSync(fp + '.type')) {
    return route.fulfill({ status: 200, contentType: fs.readFileSync(fp + '.type', 'utf8'), body: fs.readFileSync(fp), headers: { 'access-control-allow-origin': '*' } });
  }
  const r = await ufetch(url, { dispatcher: DISPATCHER, headers: { 'user-agent': route.request().headers()['user-agent'] || 'Mozilla/5.0' } });
  const body = Buffer.from(await r.arrayBuffer());
  const ct = r.headers.get('content-type') || 'application/octet-stream';
  if (r.ok) { fs.mkdirSync(NET_CACHE, { recursive: true }); fs.writeFileSync(fp, body); fs.writeFileSync(fp + '.type', ct); }
  return route.fulfill({ status: r.status, contentType: ct, body, headers: { 'access-control-allow-origin': '*' } });
}

const BLOCK = /(googletagmanager|google-analytics|analytics\.google|doubleclick|facebook\.net|hotjar|clarity\.ms)/;

function portOpen(port) {
  return new Promise((res) => {
    const s = net.connect(port, '127.0.0.1');
    s.on('connect', () => { s.destroy(); res(true); });
    s.on('error', () => res(false));
  });
}

export async function ensureTileServer() {
  if (await portOpen(TILE_PORT)) return;
  const p = spawn('python3', [path.join(STUDIO_ROOT, 'lib/tiles.py'), String(TILE_PORT)], { detached: true, stdio: 'ignore' });
  p.unref();
  for (let i = 0; i < 40; i++) {
    if (await portOpen(TILE_PORT)) return;
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('karo sunucusu başlamadı');
}

async function localFulfill(route, url) {
  try {
    const resp = await route.fetch({ url, maxRedirects: 5 });
    return await route.fulfill({ response: resp, headers: { ...resp.headers(), 'access-control-allow-origin': '*' } });
  } catch { return route.abort().catch(() => {}); }
}

async function installRoutes(context, origin) {
  await context.route(/^https?:\/\/(?!127\.0\.0\.1).*/, async (route) => {
    const url = route.request().url();
    if (BLOCK.test(url)) return route.abort();
    for (const [re, fn] of LOCAL_LIBS) {
      const m = url.match(re);
      if (m) {
        const fp = fn(m);
        if (fs.existsSync(fp)) {
          const ct = fp.endsWith('.css') ? 'text/css' : fp.endsWith('.png') ? 'image/png' : 'text/javascript';
          return route.fulfill({ status: 200, contentType: ct, body: fs.readFileSync(fp), headers: { 'access-control-allow-origin': '*' } });
        }
      }
    }
    const t = tileFor(url);
    if (t) return localFulfill(route, `http://127.0.0.1:${TILE_PORT}/${t}.png`);
    // raufenc.com mutlak bağlantıları yerel sunucuya
    let m = url.match(/^https?:\/\/(?:www\.)?raufenc\.com(\/.*)?$/);
    if (m) return localFulfill(route, origin + (m[1] || '/'));
    // jsDelivr GitHub → raw.githubusercontent (muallimo görselleri)
    m = url.match(/^https:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@/]+)@([^/]+)\/(.+)$/);
    if (m) {
      try { return await proxiedFulfill(route, `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3]}/${m[4]}`); } catch { return route.abort(); }
    }
    if (/^https:\/\/(fonts\.(googleapis|gstatic)\.com|raw\.githubusercontent\.com)\//.test(url)) {
      try { return await proxiedFulfill(route, url); } catch { return route.abort(); }
    }
    // Diğer harici istekler (firebase bağlantıları vb.) erişilemez → hızlıca kes
    return route.abort();
  });
}

export const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  mobile: {
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  },
  tablet: { viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

export async function openStudio({ headless = true } = {}) {
  await ensureTileServer();
  const site = await startServer({ port: 0 });
  const browser = await chromium.launch({
    headless,
    args: ['--font-render-hinting=none', '--disable-lcd-text', '--force-color-profile=srgb', '--hide-scrollbars'],
  });
  const contexts = [];
  async function context(kind = 'desktop', extra = {}) {
    const ctx = await browser.newContext({
      ...DEVICES[kind], ignoreHTTPSErrors: true, colorScheme: 'dark', locale: 'tr-TR',
      timezoneId: 'Europe/Istanbul', serviceWorkers: 'block', ...extra,
    });
    await installRoutes(ctx, site.origin);
    contexts.push(ctx);
    return ctx;
  }
  async function page(kind = 'desktop', urlPath = '/', extra = {}) {
    const ctx = await context(kind, extra);
    const p = await ctx.newPage();
    p.on('pageerror', (e) => process.env.CAPTURE_DEBUG && console.warn('[pageerror]', e.message));
    if (urlPath) await p.goto(site.origin + urlPath, { waitUntil: 'domcontentloaded' });
    await settle(p);
    return p;
  }
  return {
    origin: site.origin, browser, context, page,
    desktop: (u, x) => page('desktop', u, x),
    mobile: (u, x) => page('mobile', u, x),
    tablet: (u, x) => page('tablet', u, x),
    close: async () => { for (const c of contexts) await c.close().catch(() => {}); await browser.close(); await site.close(); },
  };
}

// Sayfanın oturmasını bekle: ağ boşta, fontlar yüklü, görseller çözülmüş.
export async function settle(page, ms = 700) {
  await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.evaluate(async () => {
    try { await document.fonts.ready; } catch {}
    const imgs = [...document.images].filter((i) => !i.complete);
    await Promise.race([
      Promise.all(imgs.map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
      new Promise((r) => setTimeout(r, 4000)),
    ]);
  }).catch(() => {});
  await page.waitForTimeout(ms);
}

// Ekran görüntüsü: varsayılan JPEG q90. fullPage, clip, selector seçenekleri.
export async function shot(page, outPath, opts = {}) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const type = outPath.endsWith('.png') ? 'png' : 'jpeg';
  const o = { path: outPath, type, animations: opts.animations || 'allow', caret: 'hide' };
  if (type === 'jpeg') o.quality = opts.quality || 90;
  if (opts.fullPage) o.fullPage = true;
  if (opts.clip) o.clip = opts.clip;
  if (opts.selector) {
    await page.locator(opts.selector).first().screenshot(o);
  } else {
    await page.screenshot(o);
  }
  return outPath;
}

// Öğe konumlarını kaydet: shots/marks.json → { "<çekim>": { "<ad>": {x,y,w,h} } } (0..1, çekime göre)
// Çekimden ÖNCE ya da hemen SONRA (sayfa değişmeden) çağırın. fullPage çekimler için { fullPage: true }.
export async function mark(page, marksFile, shotName, selectors, opts = {}) {
  const res = await page.evaluate(({ selectors, fullPage }) => {
    const vw = fullPage ? document.documentElement.scrollWidth : innerWidth;
    const vh = fullPage ? Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) : innerHeight;
    const ox = fullPage ? scrollX : 0, oy = fullPage ? scrollY : 0;
    const out = {};
    for (const [name, sel] of Object.entries(selectors)) {
      const e = typeof sel === 'string' ? document.querySelector(sel) : null;
      if (!e) { out[name] = null; continue; }
      const r = e.getBoundingClientRect();
      out[name] = { x: (r.left + ox + r.width / 2) / vw, y: (r.top + oy + r.height / 2) / vh, w: r.width / vw, h: r.height / vh };
    }
    return out;
  }, { selectors, fullPage: !!opts.fullPage });
  let all = {};
  try { all = JSON.parse(fs.readFileSync(marksFile, 'utf8')); } catch {}
  all[shotName] = Object.assign(all[shotName] || {}, res);
  fs.writeFileSync(marksFile, JSON.stringify(all, null, 2));
  for (const [k, v] of Object.entries(res)) if (!v) console.warn(`[mark] bulunamadı: ${shotName} → ${k} (${selectors[k]})`);
  return res;
}

// Uzun sayfa çekimi: en fazla maxScreens ekran yüksekliği (bellek ve kaydırma için)
export async function tallShot(page, outPath, { maxScreens = 3, quality = 88 } = {}) {
  const { vw, vh, full } = await page.evaluate(() => ({ vw: innerWidth, vh: innerHeight, full: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) }));
  const h = Math.min(full, vh * maxScreens);
  return shot(page, outPath, { fullPage: true, clip: { x: 0, y: 0, width: vw, height: h }, quality });
}

// Proje klasörü için yardımcı: withStudio(import.meta.url, async (s) => {...})
export async function withStudio(metaUrl, fn) {
  const dir = path.dirname(fileURLToPath(metaUrl));
  const shotsDir = path.join(dir, 'shots');
  fs.mkdirSync(shotsDir, { recursive: true });
  const s = await openStudio();
  const out = (name) => path.join(shotsDir, name);
  try {
    const marksFile = path.join(shotsDir, 'marks.json');
    await fn({
      ...s, settle, out, dir,
      shot: (p, name, o) => shot(p, out(name), o),
      tallShot: (p, name, o) => tallShot(p, out(name), o),
      mark: (p, name, selectors, o) => mark(p, marksFile, name, selectors, o),
      hide: (p, sels = ['#rauf-nav']) => p.addStyleTag({ content: sels.join(',') + '{display:none!important}' }),
    });
  } finally {
    await s.close();
  }
}
