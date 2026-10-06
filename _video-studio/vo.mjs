#!/usr/bin/env node
// Seslendirme (Higgsfield TTS) yardımcıları. Cümle başına bir ses dosyası; sahne süreleri
// motor tarafından bu sürelere göre ayarlanır (engine.js → vo.json).
//
// projects/<slug>/vo.json:
//   { "voice": "Rauf Enç (stüdyo)", "voice_id": "...", "model": "elevenlabs_v4", "lines": [
//       { "scene": "hook", "text": "…" },
//       { "scene": "feature", "i": 0, "text": "…", "job": "<id>", "url": "https://…mp3", "file": "vo/02.mp3", "dur": 2.31 } ] }
//
//   node vo.mjs bekleyen [slug...]            → üretilmemiş cümleler (generate_audio_batch için JSON)
//   node vo.mjs isle sonuc.json               → [{slug,n,job,url}] sonuçlarını vo.json'lara yaz
//   node vo.mjs indir [slug...]               → url'leri indir, baş/son sessizliği kırp, süreyi yaz
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.join(HERE, 'projects');
const [cmd, ...rest] = process.argv.slice(2);

const slugsOr = (list) => (list.length ? list : fs.readdirSync(PROJ).filter((s) => fs.existsSync(path.join(PROJ, s, 'vo.json'))));
const load = (s) => JSON.parse(fs.readFileSync(path.join(PROJ, s, 'vo.json'), 'utf8'));
const save = (s, j) => fs.writeFileSync(path.join(PROJ, s, 'vo.json'), JSON.stringify(j, null, 2) + '\n');
function run(c, a) {
  const r = spawnSync(c, a, { stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0) throw new Error(`${c}: ${r.stderr.toString().slice(-800)}`);
  return r.stdout.toString();
}

if (cmd === 'bekleyen') {
  const out = [];
  for (const s of slugsOr(rest)) {
    const j = load(s);
    j.lines.forEach((l, n) => { if (!l.url && l.text) out.push({ slug: s, n, voice_id: j.voice_id, text: l.text }); });
  }
  console.log(JSON.stringify(out, null, 1));
} else if (cmd === 'isle') {
  const res = JSON.parse(fs.readFileSync(rest[0], 'utf8'));
  const by = {};
  for (const r of res) (by[r.slug] = by[r.slug] || []).push(r);
  for (const [s, list] of Object.entries(by)) {
    const j = load(s);
    for (const r of list) Object.assign(j.lines[r.n], { job: r.job, url: r.url, file: undefined, dur: undefined });
    save(s, j);
  }
  console.log(`işlendi: ${res.length} cümle, ${Object.keys(by).length} proje`);
} else if (cmd === 'indir') {
  const proxy = process.env.HTTPS_PROXY || '';
  for (const s of slugsOr(rest)) {
    const j = load(s);
    const dir = path.join(PROJ, s, 'vo');
    fs.mkdirSync(dir, { recursive: true });
    let changed = 0;
    for (const [n, l] of j.lines.entries()) {
      if (!l.url || (l.file && l.dur && fs.existsSync(path.join(PROJ, s, l.file)))) continue;
      const raw = path.join(dir, `.ham-${String(n).padStart(2, '0')}.mp3`);
      const fin = path.join(dir, `${String(n).padStart(2, '0')}.mp3`);
      run('curl', ['-sSfL', '--retry', '3', '-o', raw, l.url]);
      // baş/son sessizliği kırp (sahne zamanlaması sıkı olsun), 48 kHz mono 160k
      run('ffmpeg', ['-y', '-v', 'error', '-i', raw, '-af',
        'silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.06,areverse',
        '-ac', '1', '-ar', '48000', '-b:a', '160k', fin]);
      fs.rmSync(raw);
      l.file = `vo/${path.basename(fin)}`;
      l.dur = +parseFloat(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fin])).toFixed(3);
      changed++;
    }
    save(s, j);
    console.log(`[${s}] ${changed} cümle indirildi · toplam ${j.lines.reduce((a, l) => a + (l.dur || 0), 0).toFixed(1)} sn`);
  }
  void proxy;
} else {
  console.log('kullanım: node vo.mjs bekleyen|isle|indir …');
}
