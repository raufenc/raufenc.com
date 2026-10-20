import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Readable } from 'node:stream';
import { handleUpload as sdkHandleUpload } from '@vercel/blob/client';
import {
  assertSameOrigin, BLOB_MAX_FILE_BYTES, createPresentationHandler,
  MAX_SLIDES, SESSION_SECONDS, signSession, validateProject,
  validateUploadPath, validateUrl, verifySession,
} from '../lib/sunumlar-server.mjs';

const ID = 'b098bdf0-6f72-4d19-bcce-8198a737888e';
const SECOND_ID = 'b098bdf0-6f72-4d19-bcce-8198a737888f';
const TIME = Date.parse('2026-10-20T08:00:00.000Z');
const PASSWORD = 'test-password-only-not-a-live-secret';
const SECRET = 'test-signing-secret-only';
const TOKEN = 'vercel_blob_rw_example_not-a-real-token';
const project = () => ({
  id: ID, title: 'Bir sunum', description: 'Deneme',
  slides: [
    { id: 'slide-one', type: 'html', title: 'Giriş', heading: 'Merhaba', body: 'Slayt metni', bullets: ['Bir', 'İki'], steps: 2 },
    { id: 'slide-two', type: 'image', src: '/sunumlar/demo/first.svg' },
    { id: 'slide-three', type: 'video', src: 'https://example.com/clip.mp4', start: 2, end: 12, notes: 'Konuşmacı notu' },
  ],
});

function inMemoryStorage() {
  const records = new Map();
  const calls = [];
  return {
    records, calls,
    async get(pathname) {
      calls.push({ operation: 'get', pathname });
      const value = records.get(pathname);
      return value === undefined ? null : { stream: Readable.from([value]) };
    },
    async put(pathname, value, options) {
      calls.push({ operation: 'put', pathname, options });
      assert.equal(records.has(pathname), false, 'Every save must have a new immutable pathname');
      assert.equal(options.allowOverwrite, false);
      records.set(pathname, value);
      return { pathname, url: `https://example.public.blob.vercel-storage.com/${pathname}` };
    },
    async list(options) {
      calls.push({ operation: 'list', options });
      const keys = [...records.keys()].filter(key => key.startsWith(options.prefix)).sort();
      let values = keys;
      if (options.mode === 'folded') {
        values = [...new Set(keys.map(key => options.prefix + key.slice(options.prefix.length).split('/')[0] + '/'))];
      }
      const offset = Number(options.cursor || '0');
      const page = values.slice(offset, offset + options.limit);
      const hasMore = offset + options.limit < values.length;
      return {
        blobs: options.mode === 'folded' ? [] : page.map(pathname => ({ pathname })),
        folders: options.mode === 'folded' ? page : undefined,
        hasMore, cursor: hasMore ? String(offset + options.limit) : undefined,
      };
    },
  };
}

function setup(overrides = {}) {
  const blob = overrides.blob || inMemoryStorage();
  const handler = createPresentationHandler({
    blob, now: () => TIME,
    handleUpload: overrides.handleUpload || (async options => {
      const constraints = await options.onBeforeGenerateToken(options.body.payload.pathname, options.body.payload.clientPayload);
      return { type: options.body.type, clientToken: 'test-client-token', constraints };
    }),
    env: overrides.env || {
      BLOB_READ_WRITE_TOKEN: TOKEN, SUNUMLAR_ADMIN_PASSWORD: PASSWORD, SUNUMLAR_SESSION_SECRET: SECRET,
    },
  });
  async function request(action, { method = 'GET', body, authenticated = false, headers = {} } = {}) {
    const req = {
      method, url: `/api/sunumlar/?action=${action}`, body,
      headers: {
        host: 'raufenc.com',
        ...(method === 'POST' ? { origin: 'https://raufenc.com' } : {}),
        ...(authenticated ? { cookie: `sunumlar_session=${signSession(SECRET, TIME)}` } : {}),
        ...headers,
      },
    };
    const result = { headers: {} };
    const res = {
      setHeader(key, value) { result.headers[key.toLowerCase()] = value; },
      end(text) { result.status = this.statusCode; result.body = JSON.parse(text); },
    };
    await handler(req, res);
    return result;
  }
  return { request, blob, handler };
}

test('sessions reject modified, expired, wrong-scope and wrong-key credentials', () => {
  const token = signSession(SECRET, TIME);
  assert.equal(verifySession(token, SECRET, TIME), true);
  assert.equal(verifySession(token + 'x', SECRET, TIME), false);
  assert.equal(verifySession(token, 'other-secret', TIME), false);
  assert.equal(verifySession(token, SECRET, TIME + SESSION_SECONDS * 1000), false);
  assert.equal(verifySession('bad-token', SECRET, TIME), false);
  assert.equal(verifySession(token, '', TIME), false);
});

test('CSRF checks require the exact HTTPS origin; localhost preview is allowed', () => {
  assert.doesNotThrow(() => assertSameOrigin({ headers: { host: 'raufenc.com', origin: 'https://raufenc.com' } }));
  assert.doesNotThrow(() => assertSameOrigin({ headers: { host: 'localhost:3100', origin: 'http://localhost:3100' } }));
  for (const origin of ['', 'null', 'https://evil.example', 'http://raufenc.com', 'https://raufenc.com.evil.example', 'https://raufenc.com/']) {
    assert.throws(() => assertSameOrigin({ headers: { host: 'raufenc.com', origin } }));
  }
});

test('URLs block script schemes, credentials, protocol-relative URLs and untrusted iframes', () => {
  assert.equal(validateUrl('https://docs.google.com/presentation/d/example/embed', { embed: true }), 'https://docs.google.com/presentation/d/example/embed');
  assert.equal(validateUrl('https://tenant.sharepoint.com/deck', { embed: true }), 'https://tenant.sharepoint.com/deck');
  assert.equal(validateUrl('/sunumlar/demo/slide.svg'), '/sunumlar/demo/slide.svg');
  for (const url of ['javascript:alert(1)', 'data:text/html,hello', '//evil.example', 'http://example.com', 'https://user:pass@example.com/x', '/sunumlar/../../api/test', '/sunumlar/%2f../api/test']) {
    assert.throws(() => validateUrl(url));
  }
  assert.throws(() => validateUrl('https://evil.example/page', { embed: true }));
  assert.throws(() => validateUrl('https://docs.google.com.evil.example/page', { embed: true }));
});

test('project validation keeps safe structured content and rejects duplicate/oversized slides', () => {
  const input = project();
  input.slides[0].html = '<script>alert(1)</script>';
  input.admin = true;
  const validated = validateProject(input);
  assert.equal(validated.slides[0].heading, 'Merhaba');
  assert.equal(validated.slides[0].html, undefined);
  assert.equal(validated.admin, undefined);
  const duplicate = project(); duplicate.slides[1].id = duplicate.slides[0].id;
  assert.throws(() => validateProject(duplicate));
  const video = project(); video.slides[2].end = 1;
  assert.throws(() => validateProject(video));
  const oversize = project(); oversize.slides = Array.from({ length: MAX_SLIDES + 1 }, () => input.slides[0]);
  assert.throws(() => validateProject(oversize));
  const large = project(); large.description = 'x'.repeat(2_000_001);
  assert.throws(() => validateProject(large), error => error.status === 413);
});

test('upload tokens are confined to the declared project and non-executable filenames', () => {
  const payload = JSON.stringify({ projectId: ID });
  assert.equal(validateUploadPath(`sunumlar/media/${ID}/lecture-01.mp4`, payload), ID);
  for (const path of [
    `sunumlar/media/${ID}/../file.mp4`,
    `sunumlar/media/${ID}/slide.html`,
    `sunumlar/projects/${ID}/file.mp4`,
    `sunumlar/media/${ID}/file.js`,
    `sunumlar/media/${ID}/.hidden.mp4`,
  ]) assert.throws(() => validateUploadPath(path, payload));
  assert.throws(() => validateUploadPath(`sunumlar/media/${ID}/file.mp4`, JSON.stringify({ projectId: SECOND_ID })));
});

test('unconfigured status works, while list/save fail closed without storage', async () => {
  const { request } = setup({ env: {} });
  const status = await request('status');
  assert.equal(status.status, 200);
  assert.deepEqual(status.body, {
    storageReady: false, authReady: false, authenticated: false,
    maxFileBytes: BLOB_MAX_FILE_BYTES, maxSlides: MAX_SLIDES,
  });
  assert.equal((await request('list')).status, 503);
  assert.equal((await request('login', { method: 'POST', body: { password: PASSWORD } })).status, 503);
});

test('login cookie is scoped, HttpOnly, Secure, SameSite and not exposed as a JSON token', async () => {
  const { request } = setup();
  const result = await request('login', { method: 'POST', body: { password: PASSWORD } });
  assert.equal(result.status, 200);
  assert.match(result.headers['set-cookie'], /Path=\/api\/sunumlar; HttpOnly; Secure; SameSite=Strict/);
  assert.deepEqual(result.body, { ok: true, authenticated: true });
  const cookie = result.headers['set-cookie'].split(';')[0];
  assert.equal((await request('status', { headers: { cookie } })).body.authenticated, true);
  const logout = await request('logout', { method: 'POST', body: {} });
  assert.match(logout.headers['set-cookie'], /Max-Age=0$/);
});

test('login rejects cross-origin requests and throttles repeated wrong passwords', async () => {
  const { request } = setup();
  assert.equal((await request('login', { method: 'POST', body: { password: PASSWORD }, headers: { origin: 'https://evil.example' } })).status, 403);
  for (let index = 0; index < 8; index += 1) {
    assert.equal((await request('login', { method: 'POST', body: { password: 'wrong' } })).status, 401);
  }
  const blocked = await request('login', { method: 'POST', body: { password: 'wrong' } });
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers['retry-after'], '600');
});

test('unauthorized or cross-origin writes never reach storage', async () => {
  const { request, blob } = setup();
  assert.equal((await request('save', { method: 'POST', body: { project: project() } })).status, 401);
  assert.equal((await request('save', { method: 'POST', authenticated: true, body: { project: project() }, headers: { origin: 'https://evil.example' } })).status, 403);
  assert.equal(blob.records.size, 0);
});

test('save/get/edit/archive use immutable revisions and never delete media', async () => {
  const { request, blob } = setup();
  const saved = await request('save', { method: 'POST', authenticated: true, body: { project: project() } });
  assert.equal(saved.status, 200);
  assert.equal(saved.body.project.archived, false);
  const fetched = await request(`get&id=${ID}`);
  assert.equal(fetched.body.project.title, 'Bir sunum');
  const updated = { ...saved.body.project, title: 'Yeni başlık' };
  assert.equal((await request('save', { method: 'POST', authenticated: true, body: { project: updated } })).status, 200);
  assert.equal((await request(`get&id=${ID}`)).body.project.title, 'Yeni başlık');
  assert.equal((await request('list')).body.projects[0].title, 'Yeni başlık');
  assert.equal((await request('archive', { method: 'POST', authenticated: true, body: { id: ID } })).status, 200);
  assert.equal((await request(`get&id=${ID}`)).status, 404);
  assert.deepEqual((await request('list')).body.projects, []);
  assert.equal(blob.records.size, 3);
});

test('metadata updates reject an explicitly stale version and unknown ids return 404', async () => {
  const { request } = setup();
  await request('save', { method: 'POST', authenticated: true, body: { project: project() } });
  const outdated = { ...project(), updatedAt: '2000-01-01T00:00:00.000Z' };
  assert.equal((await request('save', { method: 'POST', authenticated: true, body: { project: outdated } })).status, 409);
  assert.equal((await request(`get&id=${SECOND_ID}`)).status, 404);
});

test('project listing uses provider cursors without truncating collections at one page', async () => {
  const { request } = setup();
  for (let index = 1; index <= 27; index += 1) {
    const input = { ...project(), id: `b098bdf0-6f72-4d19-bcce-${String(index).padStart(12, '0')}` };
    assert.equal((await request('save', { method: 'POST', authenticated: true, body: { project: input } })).status, 200);
  }
  const page1 = await request('list');
  assert.equal(page1.body.projects.length, 25);
  assert.equal(page1.body.cursor, '25');
  const page2 = await request(`list&cursor=${page1.body.cursor}`);
  assert.equal(page2.body.projects.length, 2);
  assert.equal(page2.body.cursor, null);
});

test('upload generation requires auth and returns bounded token constraints', async () => {
  const { request } = setup();
  const body = {
    type: 'blob.generate-client-token',
    payload: { pathname: `sunumlar/media/${ID}/large-video.mp4`, clientPayload: JSON.stringify({ projectId: ID }), multipart: true },
  };
  assert.equal((await request('upload', { method: 'POST', body })).status, 401);
  const result = await request('upload', { method: 'POST', body, authenticated: true });
  assert.equal(result.status, 200);
  assert.equal(result.body.constraints.maximumSizeInBytes, BLOB_MAX_FILE_BYTES);
  assert.equal(result.body.constraints.allowOverwrite, false);
  assert.equal(result.body.constraints.addRandomSuffix, true);
});

test('real SDK rejects forged upload callbacks even without browser-origin requirements', async () => {
  const { request } = setup({ handleUpload: sdkHandleUpload });
  const result = await request('upload', {
    method: 'POST', headers: { origin: '' },
    body: { type: 'blob.upload-completed', payload: { blob: { pathname: 'forged' } } },
  });
  assert.equal(result.status, 502);
  assert.equal(result.body.ok, undefined);
});

test('storage provider failures cannot become a success or leak provider secrets', async () => {
  const blob = inMemoryStorage();
  blob.put = async () => { throw new Error('SECRET provider-token-in-error'); };
  const { request } = setup({ blob });
  const failed = await request('save', { method: 'POST', authenticated: true, body: { project: project() } });
  assert.equal(failed.status, 502);
  assert.equal(failed.body.ok, undefined);
  assert.doesNotMatch(JSON.stringify(failed.body), /SECRET|provider-token/);
});
