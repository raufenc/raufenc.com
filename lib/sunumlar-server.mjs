import { createHash, createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

export const MAX_METADATA_BYTES = 2_000_000;
export const MAX_SLIDES = 5000;
export const BLOB_MAX_FILE_BYTES = 5_000_000_000_000;
export const SESSION_SECONDS = 8 * 60 * 60;
const COOKIE_NAME = 'sunumlar_session';
const PROJECT_PREFIX = 'sunumlar/projects/';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UPLOAD_EXTENSIONS = /\.(png|jpe?g|webp|gif|avif|bmp|tiff?|mp4|m4v|mov|webm|pdf|pptx?)$/i;
const EMBED_HOSTS = new Set([
  'docs.google.com', 'slides.google.com', 'drive.google.com',
  'onedrive.live.com', '1drv.ms', 'view.officeapps.live.com',
  'office.live.com', 'powerpoint.office.com',
]);
const ALLOWED_CONTENT_TYPES = [
  'image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif',
  'image/bmp', 'image/tiff', 'video/mp4', 'video/webm', 'video/quicktime',
  'video/x-m4v', 'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint', 'application/octet-stream',
];

export class PresentationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function fail(message, status = 400) {
  throw new PresentationError(message, status);
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function boundedText(value, name, maximum, { required = false } = {}) {
  if (value === undefined && !required) return '';
  if (typeof value !== 'string' || value.length > maximum || (required && !value.trim())) {
    fail(`${name} geçersiz veya çok uzun.`);
  }
  return value.trim();
}

export function validateId(value) {
  if (typeof value !== 'string' || !UUID.test(value)) fail('Geçersiz sunum kimliği.');
  return value.toLowerCase();
}

export function validateUrl(value, { embed = false } = {}) {
  if (typeof value !== 'string' || !value || value.length > 4096 || /[\u0000-\u0020\\]/.test(value)) {
    fail('Geçersiz dosya bağlantısı.');
  }
  // Local, reviewed presentation assets are usable in previews and production.
  if (value.startsWith('/sunumlar/')) {
    const parsed = new URL(value, 'https://raufenc.com');
    if (!parsed.pathname.startsWith('/sunumlar/') || /%2f|%5c/i.test(parsed.pathname)) {
      fail('Geçersiz yerel dosya bağlantısı.');
    }
    return value;
  }
  let parsed;
  try { parsed = new URL(value); } catch { fail('Geçersiz dosya bağlantısı.'); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port) {
    fail('Dosya bağlantısı HTTPS kullanmalı.');
  }
  if (embed && !EMBED_HOSTS.has(parsed.hostname)
      && !parsed.hostname.endsWith('.sharepoint.com')
      && !(['raufenc.com', 'www.raufenc.com'].includes(parsed.hostname)
        && parsed.pathname.startsWith('/sunumlar/'))) {
    fail('Gömülü sunum için Microsoft, Google veya /sunumlar/ bağlantısı kullanın.');
  }
  return parsed.href;
}

export function validateProject(value) {
  if (!isRecord(value)) fail('Sunum verisi gerekli.');
  if (Buffer.byteLength(JSON.stringify(value), 'utf8') > MAX_METADATA_BYTES) {
    fail('Sunum açıklama ve slayt bilgileri 2 MB sınırını aşıyor.', 413);
  }
  const project = {
    id: validateId(value.id),
    title: boundedText(value.title, 'Sunum adı', 200, { required: true }),
    description: boundedText(value.description, 'Açıklama', 5000),
    slides: [],
  };
  if (!Array.isArray(value.slides) || value.slides.length < 1 || value.slides.length > MAX_SLIDES) {
    fail(`Sunum 1 ile ${MAX_SLIDES} arasında slayt içermeli.`);
  }
  const ids = new Set();
  project.slides = value.slides.map((input, index) => {
    if (!isRecord(input)) fail(`${index + 1}. slayt geçersiz.`);
    const id = boundedText(input.id, 'Slayt kimliği', 100, { required: true });
    if (!/^[a-zA-Z0-9_-]+$/.test(id) || ids.has(id)) fail('Slayt kimlikleri geçerli ve benzersiz olmalı.');
    ids.add(id);
    if (!['image', 'video', 'embed', 'html'].includes(input.type)) fail('Geçersiz slayt türü.');
    const slide = {
      id,
      type: input.type,
      title: boundedText(input.title, 'Slayt adı', 300),
      notes: boundedText(input.notes, 'Konuşmacı notu', 20_000),
    };
    if (input.src) slide.src = validateUrl(input.src, { embed: ['html', 'embed'].includes(input.type) });
    if (input.type !== 'html' && !slide.src) fail('Slayt dosyası veya bağlantısı eksik.');
    if (input.type === 'html') {
      slide.heading = boundedText(input.heading, 'Slayt başlığı', 500);
      slide.body = boundedText(input.body, 'Slayt metni', 20_000);
      if (input.bullets !== undefined) {
        if (!Array.isArray(input.bullets) || input.bullets.length > 1000) fail('Madde listesi geçersiz.');
        slide.bullets = input.bullets.map(item => boundedText(item, 'Madde', 2000));
      }
    }
    if (input.steps !== undefined) {
      if (!Number.isInteger(input.steps) || input.steps < 0 || input.steps > 1000) fail('Animasyon adımı geçersiz.');
      slide.steps = input.steps;
    }
    for (const property of ['start', 'end']) {
      if (input[property] !== undefined) {
        if (!Number.isFinite(input[property]) || input[property] < 0 || input[property] > 1e8) {
          fail('Video başlangıç veya bitiş zamanı geçersiz.');
        }
        slide[property] = input[property];
      }
    }
    if (slide.end !== undefined && slide.end <= (slide.start || 0)) fail('Video bitişi başlangıçtan sonra olmalı.');
    if (input.fit !== undefined) {
      if (!['contain', 'cover'].includes(input.fit)) fail('Görsel yerleşimi geçersiz.');
      slide.fit = input.fit;
    }
    for (const property of ['autoplay', 'muted', 'loop']) {
      if (input[property] !== undefined) {
        if (typeof input[property] !== 'boolean') fail('Video seçeneği geçersiz.');
        slide[property] = input[property];
      }
    }
    return slide;
  });
  for (const property of ['sourceUrl', 'cover']) {
    if (value[property]) project[property] = validateUrl(value[property]);
  }
  return project;
}

export function validateUploadPath(pathname, clientPayload) {
  if (typeof pathname !== 'string' || pathname.length > 260) fail('Geçersiz yükleme yolu.');
  const parts = pathname.split('/');
  if (parts.length !== 4 || parts[0] !== 'sunumlar' || parts[1] !== 'media') fail('Geçersiz yükleme yolu.');
  const id = validateId(parts[2]);
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,179}$/.test(parts[3]) || !UPLOAD_EXTENSIONS.test(parts[3])) {
    fail('Desteklenmeyen dosya adı veya türü.');
  }
  let payload;
  try { payload = JSON.parse(clientPayload || '{}'); } catch { fail('Geçersiz yükleme bilgisi.'); }
  if (payload.projectId !== id) fail('Dosya ve sunum kimliği eşleşmiyor.');
  return id;
}

function fixedTimeEqual(a, b) {
  return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
}

export function signSession(secret, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({
    scope: 'sunumlar-admin',
    expires: Math.floor(now / 1000) + SESSION_SECONDS,
    nonce: randomBytes(16).toString('hex'),
  })).toString('base64url');
  return `${payload}.${createHmac('sha256', secret).update(`sunumlar:v1:${payload}`).digest('base64url')}`;
}

export function verifySession(token, secret, now = Date.now()) {
  if (!token || !secret || typeof token !== 'string' || token.length > 1000) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const signature = createHmac('sha256', secret).update(`sunumlar:v1:${parts[0]}`).digest('base64url');
    if (!fixedTimeEqual(parts[1], signature)) return false;
    const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    const current = Math.floor(now / 1000);
    return payload.scope === 'sunumlar-admin' && Number.isInteger(payload.expires)
      && payload.expires > current && payload.expires <= current + SESSION_SECONDS;
  } catch { return false; }
}

function header(request, name) {
  const value = request.headers?.get ? request.headers.get(name) : request.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value || '';
}

export function assertSameOrigin(request) {
  const host = header(request, 'host');
  const origin = header(request, 'origin');
  if (!host || !origin) fail('Bu işlem aynı site üzerinden yapılmalı.', 403);
  let parsed;
  try { parsed = new URL(origin); } catch { fail('Geçersiz istek kaynağı.', 403); }
  const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
  if (parsed.host !== host || (parsed.protocol !== 'https:' && !(local && parsed.protocol === 'http:'))
      || parsed.origin !== origin || parsed.username || parsed.password) {
    fail('Bu işlem aynı site üzerinden yapılmalı.', 403);
  }
}

function sessionCookie(request) {
  const entry = header(request, 'cookie').split(';').map(value => value.trim())
    .find(value => value.startsWith(`${COOKIE_NAME}=`));
  return entry ? entry.slice(COOKIE_NAME.length + 1) : '';
}

function setSessionCookie(response, token, maxAge = SESSION_SECONDS) {
  response.setHeader('Set-Cookie',
    `${COOKIE_NAME}=${token}; Path=/api/sunumlar; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);
}

function json(response, value, status = 200) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(value));
}

async function readBody(request) {
  if (Number(header(request, 'content-length')) > MAX_METADATA_BYTES) fail('İstek 2 MB sınırını aşıyor.', 413);
  let input = request.body;
  if (input === undefined) {
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
      size += Buffer.byteLength(chunk);
      if (size > MAX_METADATA_BYTES) fail('İstek 2 MB sınırını aşıyor.', 413);
      chunks.push(Buffer.from(chunk));
    }
    input = Buffer.concat(chunks).toString('utf8');
  }
  if (Buffer.isBuffer(input)) input = input.toString('utf8');
  if (typeof input === 'string') {
    if (Buffer.byteLength(input) > MAX_METADATA_BYTES) fail('İstek 2 MB sınırını aşıyor.', 413);
    try { input = JSON.parse(input); } catch { fail('Geçersiz JSON.'); }
  }
  if (!isRecord(input)) fail('Geçersiz istek.');
  if (Buffer.byteLength(JSON.stringify(input)) > MAX_METADATA_BYTES) fail('İstek 2 MB sınırını aşıyor.', 413);
  return input;
}

async function streamText(stream) {
  const chunks = [];
  let size = 0;
  for await (const chunk of stream) {
    size += Buffer.byteLength(chunk);
    if (size > MAX_METADATA_BYTES) fail('Kayıt boyutu sınırı aşıldı.', 502);
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

function summary(project) {
  return {
    id: project.id, title: project.title, description: project.description,
    updatedAt: project.updatedAt, cover: project.cover || project.slides.find(s => s.type === 'image')?.src || '',
    kind: project.slides.every(s => ['embed', 'html'].includes(s.type)) ? 'web' : 'media',
    slideCount: project.slides.length,
  };
}

// Dependencies are injected so authentication, storage failures and pagination can
// be exercised without using a production account or uploading test files.
export function createPresentationHandler({ blob, handleUpload, env = process.env, now = Date.now }) {
  const loginHits = new Map();
  let lastWriteTime = 0;
  function requireStorage() {
    if (!env.BLOB_READ_WRITE_TOKEN) fail('Sunum depolaması henüz bağlanmadı.', 503);
  }
  function authSettings() {
    const password = env.SUNUMLAR_ADMIN_PASSWORD || env.BIA_ADMIN_PASSWORD || '';
    return { password, secret: env.SUNUMLAR_SESSION_SECRET || env.BIA_JWT_SECRET || password };
  }
  function authorized(request) {
    const { password, secret } = authSettings();
    return Boolean(password && verifySession(sessionCookie(request), secret, now()));
  }
  function requireAuth(request) {
    if (!authSettings().password) fail('Yönetici girişi henüz yapılandırılmadı.', 503);
    if (!authorized(request)) fail('Yönetici girişi gerekli.', 401);
  }
  function maxFileBytes() {
    const configured = Number(env.SUNUMLAR_MAX_FILE_BYTES);
    return Number.isSafeInteger(configured) && configured > 0
      ? Math.min(configured, BLOB_MAX_FILE_BYTES) : BLOB_MAX_FILE_BYTES;
  }
  async function readProject(id) {
    const prefix = `${PROJECT_PREFIX}${validateId(id)}/`;
    const revisions = await blob.list({
      prefix, limit: 1, token: env.BLOB_READ_WRITE_TOKEN,
    });
    const newest = revisions.blobs[0];
    if (!newest) fail('Sunum bulunamadı.', 404);
    if (!newest.pathname.startsWith(prefix) || !/\/\d{13}-[0-9a-f]{16}\.json$/.test(newest.pathname)) {
      fail('Sunum kayıt yolu geçersiz.', 502);
    }
    const result = await blob.get(newest.pathname, {
      access: 'public', token: env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result) fail('Sunum bulunamadı.', 404);
    let project;
    try {
      project = JSON.parse(await streamText(result.stream));
    } catch (error) {
      if (error instanceof PresentationError) throw error;
      fail('Sunum kaydı okunamadı.', 502);
    }
    if (!isRecord(project) || project.id !== id || !Array.isArray(project.slides)) {
      fail('Sunum kaydı geçersiz.', 502);
    }
    return project;
  }
  async function writeProject(project) {
    // Public Blob overwrites can remain cached for 60 seconds. Immutable revisions
    // avoid stale edits and archived projects reappearing after a successful save.
    // Reversed timestamps put the latest revision first in Blob's lexical listing.
    lastWriteTime = Math.max(now(), lastWriteTime + 1);
    project.updatedAt = new Date(lastWriteTime).toISOString();
    const revision = `${String(9_999_999_999_999 - lastWriteTime).padStart(13, '0')}-${randomBytes(8).toString('hex')}`;
    await blob.put(`${PROJECT_PREFIX}${project.id}/${revision}.json`, JSON.stringify(project), {
      access: 'public', token: env.BLOB_READ_WRITE_TOKEN,
      contentType: 'application/json', addRandomSuffix: false, allowOverwrite: false,
    });
  }
  return async function handler(request, response) {
    try {
      const url = new URL(request.url, 'https://raufenc.com');
      const action = url.searchParams.get('action') || 'list';
      if (request.method === 'GET') {
        if (action === 'status') {
          return json(response, {
            storageReady: Boolean(env.BLOB_READ_WRITE_TOKEN),
            authReady: Boolean(authSettings().password),
            authenticated: authorized(request), maxFileBytes: maxFileBytes(), maxSlides: MAX_SLIDES,
          });
        }
        requireStorage();
        if (action === 'get') {
          const project = await readProject(validateId(url.searchParams.get('id')));
          if (project.archived) fail('Sunum arşive kaldırıldı.', 404);
          return json(response, { project });
        }
        if (action === 'list') {
          const cursor = url.searchParams.get('cursor') || undefined;
          if (cursor && cursor.length > 2048) fail('Geçersiz sayfa bilgisi.');
          const result = await blob.list({
            token: env.BLOB_READ_WRITE_TOKEN, prefix: PROJECT_PREFIX, mode: 'folded', limit: 25, cursor,
          });
          const projects = [];
          // A bounded batch keeps the endpoint below response and memory limits.
          const folders = result.folders || [];
          for (let index = 0; index < folders.length; index += 5) {
            const batch = await Promise.all(folders.slice(index, index + 5).map(async pathname => {
              const id = pathname.slice(PROJECT_PREFIX.length).replace(/\/$/, '');
              if (!UUID.test(id) || pathname !== `${PROJECT_PREFIX}${id}/`) return null;
              return readProject(id);
            }));
            for (const project of batch) if (project && !project.archived) projects.push(summary(project));
          }
          projects.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
          if (result.hasMore && (!result.cursor || result.cursor === cursor)) {
            fail('Sunum listesinin devamı okunamadı.', 502);
          }
          return json(response, { projects, cursor: result.hasMore ? result.cursor : null });
        }
        fail('Geçersiz işlem.');
      }
      if (request.method !== 'POST') {
        response.setHeader('Allow', 'GET, POST');
        fail('Bu yöntem desteklenmiyor.', 405);
      }
      const body = await readBody(request);
      // Blob completion callbacks have a signed SDK payload rather than a browser
      // session. Token issuance still authenticates inside onBeforeGenerateToken.
      if (action === 'upload' && body.type === 'blob.upload-completed') {
        requireStorage();
        return json(response, await handleUpload({
          request, body, token: env.BLOB_READ_WRITE_TOKEN,
          onBeforeGenerateToken: async () => { fail('Geçersiz yükleme işlemi.', 403); },
          onUploadCompleted: async () => {},
        }));
      }
      assertSameOrigin(request);
      if (action === 'login') {
        const { password, secret } = authSettings();
        if (!password) fail('Yönetici girişi henüz yapılandırılmadı.', 503);
        const ip = header(request, 'x-forwarded-for').split(',')[0].trim() || request.socket?.remoteAddress || 'unknown';
        const current = now();
        const hits = (loginHits.get(ip) || []).filter(time => current - time < 10 * 60 * 1000);
        if (hits.length >= 8) {
          response.setHeader('Retry-After', '600');
          fail('Çok fazla giriş denemesi. Biraz sonra tekrar deneyin.', 429);
        }
        // This is a per-function-instance throttle, not a global rate-limit store.
        if (loginHits.size > 5000) {
          for (const [key, values] of loginHits) {
            if (current - values.at(-1) >= 10 * 60 * 1000) loginHits.delete(key);
          }
          if (loginHits.size > 5000) fail('Giriş servisi yoğun. Biraz sonra tekrar deneyin.', 429);
        }
        loginHits.set(ip, [...hits, current]);
        if (typeof body.password !== 'string' || body.password.length > 1024 || !fixedTimeEqual(body.password, password)) {
          fail('Şifre doğru değil.', 401);
        }
        loginHits.delete(ip);
        setSessionCookie(response, signSession(secret, now()));
        return json(response, { ok: true, authenticated: true });
      }
      if (action === 'logout') {
        setSessionCookie(response, '', 0);
        return json(response, { ok: true, authenticated: false });
      }
      requireAuth(request);
      requireStorage();
      if (action === 'upload') {
        if (body.type !== 'blob.generate-client-token') fail('Geçersiz yükleme işlemi.');
        const result = await handleUpload({
          request, body, token: env.BLOB_READ_WRITE_TOKEN,
          onBeforeGenerateToken: async (pathname, clientPayload) => {
            assertSameOrigin(request);
            requireAuth(request);
            const projectId = validateUploadPath(pathname, clientPayload);
            return {
              allowedContentTypes: ALLOWED_CONTENT_TYPES,
              maximumSizeInBytes: maxFileBytes(),
              addRandomSuffix: true, allowOverwrite: false,
              validUntil: now() + 24 * 60 * 60 * 1000,
              tokenPayload: JSON.stringify({ projectId }),
            };
          },
          onUploadCompleted: async () => {},
        });
        return json(response, result);
      }
      if (action === 'save') {
        const project = validateProject(body.project);
        let previous;
        try { previous = await readProject(project.id); } catch (error) {
          if (!(error instanceof PresentationError && error.status === 404)) throw error;
        }
        if (previous && body.project.updatedAt && body.project.updatedAt !== previous.updatedAt) {
          fail('Sunum başka bir pencerede değişti. Sayfayı yenileyip tekrar deneyin.', 409);
        }
        const timestamp = new Date(now()).toISOString();
        const saved = {
          ...project, version: 1, createdAt: previous?.createdAt || timestamp,
          updatedAt: timestamp, archived: false,
        };
        await writeProject(saved);
        return json(response, { ok: true, project: saved });
      }
      if (action === 'archive') {
        const project = await readProject(validateId(body.id));
        await writeProject({ ...project, archived: true, updatedAt: new Date(now()).toISOString() });
        return json(response, { ok: true });
      }
      fail('Geçersiz işlem.');
    } catch (error) {
      if (error instanceof PresentationError) return json(response, { error: error.message }, error.status);
      // Do not return provider URLs, tokens or account diagnostics to visitors.
      return json(response, { error: 'Sunum servisine erişilemedi. Lütfen tekrar deneyin.' }, 502);
    }
  };
}
