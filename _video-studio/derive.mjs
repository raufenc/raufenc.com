#!/usr/bin/env node
// Ana videolardan türetilen hafif varlıklar + videolar/index.json bildirgesi.
//   kart.mp4 / kart.jpg              640×360, sessiz, tanıtım+özellikler bölümü (kart önizlemesi)
//   kart-dikey.mp4 / kart-dikey.jpg  360×640, sessiz (raf önizlemesi)
//
//   node derive.mjs <slug...> | --all        (yalnız bildirge: --manifest)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '..');
const OUT = path.join(SITE, 'videolar');

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0) throw new Error(`${cmd}: ${r.stderr.toString().slice(-1500)}`);
  return r.stdout.toString();
}
const probeDur = (f) => parseFloat(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]));

function sceneWindow(slug, dur) {
  // tanıtım başı → son özellik sonu (render'ın gerçek sahne süreleriyle; yoksa storyboard)
  try {
    const sj = JSON.parse(fs.readFileSync(path.join(HERE, '.cache', 'render', slug, 'sahneler.json'), 'utf8'));
    const intro = sj.scenes.find((s) => s.type === 'intro');
    const feats = sj.scenes.filter((s) => s.type === 'feature');
    if (intro && feats.length) { const lf = feats[feats.length - 1]; return [intro.start + 0.3, Math.min(dur, lf.start + lf.dur - 0.4)]; }
  } catch {}
  try {
    const sb = JSON.parse(fs.readFileSync(path.join(HERE, 'projects', slug, 'storyboard.json'), 'utf8'));
    const T = Object.assign({ hook: 2.7, intro: 3.1, feature: 2.9 }, sb.timing || {});
    const hook = (sb.hook && sb.hook.dur) || T.hook;
    const intro = (sb.intro && sb.intro.dur) || T.intro;
    const feats = (sb.features || []).reduce((s, f) => s + (f.dur || T.feature), 0);
    return [hook + 0.3, Math.min(dur, hook + intro + feats - 0.4)];
  } catch {
    return [2.9, Math.min(dur, 14)];
  }
}

export function derive(slug) {
  const dir = path.join(OUT, slug);
  const yatay = path.join(dir, 'yatay.mp4'), dikey = path.join(dir, 'dikey.mp4');
  const enc = ['-an', '-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-profile:v', 'main', '-movflags', '+faststart'];
  if (fs.existsSync(yatay)) {
    const [a, b] = sceneWindow(slug, probeDur(yatay));
    run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', a.toFixed(2), '-to', b.toFixed(2), '-i', yatay, '-vf', 'scale=640:360:flags=lanczos,fps=24', ...enc, '-crf', '27', path.join(dir, 'kart.mp4')]);
    if (fs.existsSync(path.join(dir, 'yatay.jpg'))) run('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, 'yatay.jpg'), '-vf', 'scale=640:360:flags=lanczos', '-q:v', '4', path.join(dir, 'kart.jpg')]);
  }
  if (fs.existsSync(dikey)) {
    const [a, b] = sceneWindow(slug, probeDur(dikey));
    run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', a.toFixed(2), '-to', b.toFixed(2), '-i', dikey, '-vf', 'scale=360:640:flags=lanczos,fps=24', ...enc, '-crf', '28', path.join(dir, 'kart-dikey.mp4')]);
    if (fs.existsSync(path.join(dir, 'dikey.jpg'))) run('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, 'dikey.jpg'), '-vf', 'scale=360:640:flags=lanczos', '-q:v', '4', path.join(dir, 'kart-dikey.jpg')]);
  }
}

export function manifest() {
  const list = [];
  let meta = {};
  try { for (const x of JSON.parse(fs.readFileSync(path.join(HERE, 'projeler.json'), 'utf8'))) meta[x.slug] = x; } catch {}
  for (const slug of fs.existsSync(OUT) ? fs.readdirSync(OUT).sort() : []) {
    const dir = path.join(OUT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const y = path.join(dir, 'yatay.mp4'), d = path.join(dir, 'dikey.mp4');
    const gerekli = ['yatay.mp4', 'dikey.mp4', 'yatay.jpg', 'dikey.jpg', 'kart.mp4', 'kart.jpg', 'kart-dikey.mp4', 'kart-dikey.jpg'];
    if (gerekli.some((f) => !fs.existsSync(path.join(dir, f)))) continue;
    let sure;
    try { sure = probeDur(y); probeDur(d); } catch { console.warn(`[${slug}] video okunamadı (yazılıyor olabilir), bildirgeye alınmadı`); continue; }
    let sb = {};
    try { sb = JSON.parse(fs.readFileSync(path.join(HERE, 'projects', slug, 'storyboard.json'), 'utf8')); } catch {}
    const m = meta[slug] || {};
    list.push({
      slug,
      title: m.title || sb.title || slug,
      href: m.href || '',
      kategori: m.kategori || '',
      sure: Math.round(sure * 10) / 10,
      boyut: { yatay: fs.statSync(y).size, dikey: fs.statSync(d).size },
      altyazi: fs.existsSync(path.join(dir, 'altyazi.vtt')),
      guncelleme: new Date(fs.statSync(y).mtimeMs).toISOString().slice(0, 10),
    });
  }
  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify({ surum: 1, videolar: list }, null, 1) + '\n');
  return list;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2);
  let slugs = args.filter((a) => !a.startsWith('--'));
  if (args.includes('--all')) slugs = fs.readdirSync(OUT).filter((s) => fs.existsSync(path.join(OUT, s, 'yatay.mp4')));
  if (!args.includes('--manifest')) for (const s of slugs) { derive(s); console.log(`[${s}] türetildi`); }
  console.log(`bildirge: ${manifest().length} video`);
}
