#!/usr/bin/env node
// Storyboard → kareler → ffmpeg (+ ses izi) → /videolar/<slug>/
//
//   node render.mjs <slug...>                 # yatay + dikey tam video, kart önizleme, afişler
//   node render.mjs <slug> --stills           # yalnızca kontrol kareleri + temas sayfası (hızlı)
//   node render.mjs <slug> --fmt v --times 3.2,7.5
//   node render.mjs --all [--jobs 2] [--skip-existing]
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from 'playwright';
import { startServer, SITE_ROOT, STUDIO_ROOT } from './lib/server.mjs';
import { derive, manifest } from './derive.mjs';

const args = process.argv.slice(2);
const flag = (n) => args.includes('--' + n);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const optKeys = new Set(['fmt', 'times', 'jobs', 'crf', 'fps', 'out']);
const slugs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) { if (optKeys.has(args[i].slice(2))) i++; continue; }
  slugs.push(args[i]);
}
const PROJECTS = path.join(STUDIO_ROOT, 'projects');
if (flag('all')) {
  for (const d of fs.readdirSync(PROJECTS).sort()) if (fs.existsSync(path.join(PROJECTS, d, 'storyboard.json'))) slugs.push(d);
}
if (!slugs.length) { console.error('kullanım: node render.mjs <slug...> [--stills] [--fmt h,v] [--all]'); process.exit(1); }

const FMTS = (opt('fmt', 'h,v')).split(',');
const FPS = parseInt(opt('fps', '30'), 10);
const CRF = opt('crf', '25');
const OUT = path.resolve(opt('out', path.join(SITE_ROOT, 'videolar')));
const JOBS = parseInt(opt('jobs', '1'), 10);
const DIMS = { h: [1920, 1080], v: [1080, 1920] };
const NAMES = { h: 'yatay', v: 'dikey' };

function sh(cmd, a) {
  const r = spawnSync(cmd, a, { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0) throw new Error(`${cmd} başarısız: ${r.stderr.toString().slice(-2000)}`);
  return r.stdout.toString();
}

async function openEngine(browser, origin, slug, fmt) {
  const [w, h] = DIMS[fmt];
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', (m) => { if ((m.type() === 'error' || m.type() === 'warning') && !/404 \(Not Found\)/.test(m.text())) logs.push(m.text()); });
  page.on('pageerror', (e) => logs.push(String(e)));
  const sb = `/_video-studio/projects/${slug}/storyboard.json`;
  await page.goto(`${origin}/_video-studio/engine/index.html?sb=${encodeURIComponent(sb)}&fmt=${fmt}`, { waitUntil: 'load' });
  const ok = await page.evaluate(() => window.STUDIO.ready);
  const info = await page.evaluate(() => ({ duration: STUDIO.duration, cues: STUDIO.cues, scenes: STUDIO.scenes, vo: STUDIO.vo, title: STUDIO.storyboard && STUDIO.storyboard.title, error: STUDIO.error, warnings: STUDIO.warnings }));
  if (!ok || info.error) throw new Error(`motor hatası (${slug}/${fmt}): ${info.error || logs.join('\n')}`);
  if (info.warnings && info.warnings.length) console.warn(`[${slug}/${fmt}] uyarı:`, info.warnings.join(' | '));
  return { ctx, page, info, logs };
}

function keyTimes(scenes) {
  const ts = [];
  for (const s of scenes) {
    if (s.type === 'hook') ts.push(s.start + s.dur * 0.62);
    else if (s.type === 'cta') ts.push(s.start + s.dur * 0.8);
    else if (s.type === 'stats') ts.push(s.start + s.dur * 0.7);
    else { ts.push(s.start + 0.5); ts.push(s.start + s.dur * 0.72); }
  }
  return ts.map((t) => +t.toFixed(2));
}

async function stills(browser, origin, slug) {
  const dir = path.join(PROJECTS, slug, 'stills');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const report = {};
  for (const fmt of FMTS) {
    const { ctx, page, info, logs } = await openEngine(browser, origin, slug, fmt);
    const times = opt('times') ? opt('times').split(',').map(Number) : keyTimes(info.scenes);
    const files = [];
    for (const t of times) {
      await page.evaluate((tt) => STUDIO.seek(tt), t);
      const f = path.join(dir, `${fmt}-${t.toFixed(2).padStart(5, '0')}.jpg`);
      await page.screenshot({ path: f, type: 'jpeg', quality: 88 });
      files.push(f);
    }
    await ctx.close();
    // temas sayfası
    const sheet = path.join(dir, `_sayfa-${fmt}.jpg`);
    const cols = fmt === 'h' ? 3 : 5;
    const tw = fmt === 'h' ? 640 : 360;
    sh('python3', ['-c', `
import sys
from PIL import Image, ImageDraw
fs=sys.argv[3:]; cols=int(sys.argv[1]); tw=int(sys.argv[2])
ims=[Image.open(f) for f in fs]; w,h=ims[0].size; th=int(h*tw/w)
rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(cols*tw+(cols+1)*8, rows*(th+30)+8),(30,30,36)); d=ImageDraw.Draw(S)
for i,im in enumerate(ims):
  x=8+(i%cols)*(tw+8); y=8+(i//cols)*(th+30)
  S.paste(im.resize((tw,th)),(x,y+22)); d.text((x,y+4),fs[i].split('/')[-1],fill=(220,220,230))
S.save('${sheet}',quality=85)
`, String(cols), String(tw), ...files]);
    report[fmt] = { duration: info.duration, scenes: info.scenes, stills: files.map((f) => path.relative(STUDIO_ROOT, f)), sheet: path.relative(STUDIO_ROOT, sheet), consoleErrors: logs.slice(0, 10) };
  }
  fs.writeFileSync(path.join(dir, 'rapor.json'), JSON.stringify(report, null, 2));
  console.log(`[${slug}] kontrol kareleri: ${Object.values(report).map((r) => r.sheet).join(', ')}`);
  return report;
}

async function video(browser, origin, slug) {
  const outDir = path.join(OUT, slug);
  fs.mkdirSync(outDir, { recursive: true });
  const tmp = path.join(STUDIO_ROOT, '.cache', 'render', slug);
  fs.mkdirSync(tmp, { recursive: true });
  for (const fmt of FMTS) {
    const t0 = Date.now();
    const { ctx, page, info } = await openEngine(browser, origin, slug, fmt);
    const [w, h] = DIMS[fmt];
    const nFrames = Math.round(info.duration * FPS);
    // ses
    const cuesF = path.join(tmp, `cues-${fmt}.json`), wav = path.join(tmp, `ses-${fmt}.wav`), voF = path.join(tmp, 'vo.json');
    fs.writeFileSync(cuesF, JSON.stringify(info.cues));
    fs.writeFileSync(voF, JSON.stringify(info.vo || []));
    fs.writeFileSync(path.join(tmp, 'sahneler.json'), JSON.stringify({ duration: info.duration, scenes: info.scenes }));
    sh('python3', [path.join(STUDIO_ROOT, 'lib/audio.py'), cuesF, String(info.duration), wav, voF]);
    // altyazı (WebVTT): seslendirme cümleleri
    const vtt = path.join(outDir, 'altyazi.vtt');
    if (info.vo && info.vo.length) {
      const ts = (x) => { const m = Math.floor(x / 60), s = x - m * 60; return `00:${String(m).padStart(2, '0')}:${s.toFixed(3).padStart(6, '0')}`; };
      fs.writeFileSync(vtt, 'WEBVTT\n\n' + info.vo.map((v, i) => `${i + 1}\n${ts(v.t)} --> ${ts(v.t + v.dur + 0.15)}\n${v.text}\n`).join('\n'));
    } else if (fs.existsSync(vtt)) fs.rmSync(vtt);
    const mp4 = path.join(outDir, `${NAMES[fmt]}.mp4`);
    const mp4tmp = path.join(tmp, `${NAMES[fmt]}.yaziliyor.mp4`); // bitince yerine taşınır (yarım dosya commit'lenmesin)
    const ff = spawn('ffmpeg', [
      '-y', '-loglevel', 'error',
      '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-i', wav,
      '-map', '0:v', '-map', '1:a',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF, '-tune', 'animation',
      '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1',
      '-g', String(FPS * 2), '-bf', '2', '-x264-params', 'aq-mode=3',
      '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
      '-c:a', 'aac', '-b:a', '128k', '-ar', '48000',
      '-movflags', '+faststart', '-shortest',
      '-metadata', `title=${(info.title || slug)}`, '-metadata', 'artist=Rauf Enç — raufenc.com',
      mp4tmp,
    ], { stdio: ['pipe', 'ignore', 'pipe'] });
    let ffErr = '';
    ff.stderr.on('data', (d) => (ffErr += d));
    const done = new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg: ' + ffErr)))));
    for (let i = 0; i < nFrames; i++) {
      const t = i / FPS;
      await page.evaluate((tt) => STUDIO.seek(tt), t);
      const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      if (i % 120 === 0) process.stdout.write(`[${slug}/${fmt}] ${i}/${nFrames}\r`);
    }
    ff.stdin.end();
    await done;
    fs.copyFileSync(mp4tmp, mp4 + '.tmp'); fs.renameSync(mp4 + '.tmp', mp4); fs.rmSync(mp4tmp);
    // afiş: tanıtım sahnesinin sonu (başlık + cihaz)
    const intro = info.scenes.find((s) => s.type === 'intro');
    const pt = intro ? intro.start + intro.dur * 0.78 : info.duration * 0.25;
    await page.evaluate((tt) => STUDIO.seek(tt), pt);
    await page.screenshot({ path: path.join(outDir, `${NAMES[fmt]}.jpg`), type: 'jpeg', quality: 86 });
    await ctx.close();
    console.log(`[${slug}/${fmt}] ${nFrames} kare, ${((Date.now() - t0) / 1000).toFixed(0)} sn → ${path.relative(SITE_ROOT, mp4)} (${(fs.statSync(mp4).size / 1e6).toFixed(2)} MB)`);
  }
}

const site = await startServer({ port: 0 });
const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--force-color-profile=srgb', '--hide-scrollbars'] });
let failed = 0;
const queue = [...slugs];
async function worker() {
  while (queue.length) {
    const slug = queue.shift();
    try {
      if (!fs.existsSync(path.join(PROJECTS, slug, 'storyboard.json'))) throw new Error('storyboard.json yok');
      if (flag('stills')) await stills(browser, site.origin, slug);
      else {
        if (flag('skip-existing') && FMTS.every((f) => fs.existsSync(path.join(OUT, slug, `${NAMES[f]}.mp4`)))) { console.log(`[${slug}] atlandı`); continue; }
        await video(browser, site.origin, slug);
        if (OUT === path.join(SITE_ROOT, 'videolar')) { derive(slug); manifest(); }
      }
    } catch (e) { failed++; console.error(`[${slug}] HATA: ${e.message}`); }
  }
}
await Promise.all(Array.from({ length: JOBS }, worker));
await browser.close();
await site.close();
process.exit(failed ? 1 : 0);
