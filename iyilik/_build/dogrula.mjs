// Yerel doğrulama: node iyilik/_build/dogrula.mjs [http://localhost:8765]
// - Bütün JSON dosyaları geçerli mi, JS sözdizimi, beklenen her dosya diskte var mı, sunucu 200 dönüyor mu.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.argv[2] || 'http://localhost:8765';
const urls = new Set(['/iyilik/', '/iyilik/1/', '/iyilik/2/', '/iyilik/3/', '/iyilik/index.html']);
let bad = 0;
const fail = m => { bad++; console.log('HATA', m); };

// 1. JSON geçerliliği
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(ROOT);
for (const f of files) {
  const rel = path.relative(ROOT, f);
  if (rel.startsWith('_build')) continue;
  if (f.endsWith('.json') || f.endsWith('.webmanifest')) { try { JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { fail(`JSON bozuk: ${rel}`); } }
  if (f.endsWith('.js')) { try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }); } catch { fail(`JS sözdizimi: ${rel}`); } }
  if (!rel.startsWith('_build')) urls.add('/iyilik/' + rel.split(path.sep).join('/'));
}
const count = { json: 0, js: 0, mp3: 0, webp: 0 };
for (const f of files) { const e = path.extname(f).slice(1); if (e in count) count[e]++; }

// 2. içerik bütünlüğü
const lessons = [1, 2, 3].flatMap(b => JSON.parse(fs.readFileSync(path.join(ROOT, `data/book${b}.json`), 'utf8')));
if (lessons.length !== 60) fail(`60 konu bekleniyordu: ${lessons.length}`);
for (const b of [1, 2, 3]) for (let p = 1; p <= 48; p++) for (const k of ['c', 'b', 't']) { const f = `sayfa/b${b}-${String(p).padStart(2, '0')}-${k}.webp`; if (!fs.existsSync(path.join(ROOT, f))) fail('eksik ' + f); }
let units = 0, cues = 0;
for (const l of lessons) {
  const jf = path.join(ROOT, `ses/${l.id}.json`);
  if (!fs.existsSync(jf)) { fail('ses dizini eksik ' + l.id); continue; }
  const idx = JSON.parse(fs.readFileSync(jf, 'utf8'));
  // v4: çocuğa yalnız kısa metin (kid) okunur; uzun metin Büyükler bölümünde yazı olarak durur
  if (!l.kid) fail(`${l.id}: kid (kısa çocuk metni) yok`);
  const need = ['title', 'intro', 'story', 'game', 'task', ...l.story.options.flatMap((_, i) => [`sopt${i}`, `sfb${i}`]),
    ...(l.game.pairs || []).flatMap((_, i) => [`ga${i}`, `gb${i}`]), ...(l.game.items || []).map((_, i) => `go${i}`)];
  for (const u of need) {
    if (!idx[u]) { fail(`${l.id}: birim yok ${u}`); continue; }
    units++; cues += idx[u].s.length;
    if (!fs.existsSync(path.join(ROOT, `ses/${l.id}/${idx[u].f}`))) fail(`${l.id}/${idx[u].f} dosyası yok`);
    urls.add(`/iyilik/ses/${l.id}/${idx[u].f}`);
    let t = -1; for (const c of idx[u].s) { if (!(c.a >= t && c.b > c.a)) fail(`${l.id}/${u} zaman sırası bozuk`); t = c.b; }
  }
}
// v5: resimli oyun (game2) — tür, öğe sayısı eski oyunla aynı, her ikon diskte
const MODES = ['pairs', 'pick', 'listen', 'memory', 'order'];
let icons = new Set();
for (const l of lessons) {
  const g = l.game2;
  if (!g) { fail(`${l.id}: game2 yok`); continue; }
  if (!MODES.includes(g.mode)) fail(`${l.id}: game2 türü ${g.mode}`);
  if (g.mode === 'order' ? g.items?.length !== l.game.items?.length : g.pairs?.length !== l.game.pairs?.length) fail(`${l.id}: game2 öğe sayısı eski oyunla farklı`);
  for (const c of [...(g.items || []), ...(g.pairs || []).flatMap(p => [p.a, p.b].filter(Boolean))]) {
    icons.add(c.i);
    if (c.l && c.l.split(/\s+/).length > 2) fail(`${l.id}: etiket uzun "${c.l}"`);
  }
}
for (const i of icons) { if (!fs.existsSync(path.join(ROOT, `ikon/${i}.webp`))) fail('ikon yok ' + i); }
console.log(`resimli oyun: ${lessons.filter(l => l.game2).length} oyun, ${icons.size} ikon`);
const ui = JSON.parse(fs.readFileSync(path.join(ROOT, 'ses/ui.json'), 'utf8'));
for (const [k, v] of Object.entries(ui)) if (!fs.existsSync(path.join(ROOT, 'ses', v.f))) fail('ui ses yok ' + k);
console.log(`diskte: ${count.json} json, ${count.js} js, ${count.webp} webp, ${count.mp3} mp3; ${units} ses birimi, ${cues} cümle, ${Object.keys(ui).length} arayüz sesi`);

// 3. HTTP 200
const list = [...urls];
let ok = 0;
async function get(u) { for (let i = 0; i < 3; i++) { try { const r = await fetch(BASE + encodeURI(u)); await r.arrayBuffer(); return r.status; } catch (e) { await new Promise(r => setTimeout(r, 150)); } } return 'bağlantı kurulamadı'; }
async function worker() { while (list.length) { const u = list.shift(); const s = await get(u); if (s === 200) ok++; else fail(`${s} ${u}`); } }
await Promise.all(Array.from({ length: 4 }, worker));
console.log(`HTTP 200: ${ok} dosya`);
console.log(bad ? `${bad} sorun var` : 'HER ŞEY TAMAM');
process.exit(bad ? 1 : 0);
