// Başsız Chrome (CDP) ile 390 px telefonda resimli oyunları baştan sona oynar: dokunma ve sürükleme, bir de bilerek yanlış.
// node oyna.mjs [BASE] [konu,konu|hepsi] [--foto]
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:8084';
const sel = process.argv[3] || 'hepsi';
const FOTO = process.argv.includes('--foto');
const OUT = '/tmp/iyilik-v5/oyna'; fs.mkdirSync(OUT, { recursive: true });
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9345;
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const ch = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, '--user-data-dir=/tmp/iyilik-v5/chrome', '--autoplay-policy=no-user-gesture-required', '--mute-audio', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40; i++) { try { const t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = t.find(x => x.type === 'page'); if (p) { ws = new WebSocket(p.webSocketDebuggerUrl); break; } } catch {} await sleep(250); }
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const errors = [];
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map(a => a.value || a.description).join(' ')); };
const cdp = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => (await cdp('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await cdp('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
await cdp('Page.enable');
await cdp('Emulation.setUserAgentOverride', { userAgent: UA });

const center = async q => ev(`(()=>{const e=document.querySelector(${JSON.stringify(q)}); if(!e) return null; e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); return [r.left+r.width/2, r.top+r.height/2];})()`);
const touch = (type, x, y) => cdp('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
async function tap(q) { const c = await center(q); if (!c) throw Error('yok: ' + q); await touch('touchStart', ...c); await sleep(40); await touch('touchEnd', ...c); await sleep(160); }
async function drag(q1, q2) {
  const a = await center(q1); const b = await ev(`(()=>{const r=document.querySelector(${JSON.stringify(q2)}).getBoundingClientRect(); return [r.left+r.width/2, r.top+r.height/2];})()`);
  if (!a || !b) throw Error('sürükleme hedefi yok');
  await touch('touchStart', ...a);
  for (let k = 1; k <= 12; k++) { await touch('touchMove', a[0] + (b[0] - a[0]) * k / 12, a[1] + (b[1] - a[1]) * k / 12); await sleep(16); }
  await touch('touchEnd', ...b); await sleep(450);
}
let shot = 0;
const foto = async name => { if (!FOTO) return; const r = await cdp('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(`${OUT}/${String(++shot).padStart(2, '0')}-${name}.png`, Buffer.from(r.result.data, 'base64')); };
const waitFor = async (expr, ms = 8000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(expr)) return true; await sleep(120); } return false; };

const lessons = (await Promise.all([1, 2, 3].map(async b => (await fetch(`${BASE}/iyilik/data/book${b}.json`, { headers: { 'user-agent': UA } })).json()))).flat();
const todo = sel === 'hepsi' ? lessons : lessons.filter(l => sel.split(',').includes(l.id));
await cdp('Page.navigate', { url: `${BASE}/iyilik/#home` }); await sleep(1500);
const res = [];
for (const l of todo) {
  const g = l.game2, mode = g.mode;
  await ev(`location.hash='#konu/${l.id}/oyun'`);
  await waitFor(`!!document.querySelector('#game.g2')`);
  await sleep(500);
  await foto(`${l.id}-${mode}-bas`);
  let wrong = 0, useDrag = true;
  try {
    if (mode === 'pairs') {
      // ilkini sürükleyerek, ötekileri dokunarak; arada bir yanlış
      const n = g.pairs.length;
      const wa = `.pc[data-side="a"][data-p="0"]`, wb = `.pc[data-side="b"][data-p="1"]`;
      await tap(wa); await tap(wb); wrong++;
      if (!(await ev(`!!document.querySelector('.pc.try')`))) throw Error('yanlışta sallanma yok');
      for (let i = 0; i < n; i++) {
        if (i === 0) await drag(`.pc[data-side="a"][data-p="0"]`, `.pc[data-side="b"][data-p="0"]`);
        else { await tap(`.pc[data-side="b"][data-p="${i}"]`); await tap(`.pc[data-side="a"][data-p="${i}"]`); }
        if (i === 1) await foto(`${l.id}-orta`);
      }
    } else if (mode === 'pick' || mode === 'listen') {
      for (let k = 0; k < g.pairs.length; k++) {
        await waitFor(`!document.querySelector('#game').dataset.busy && !!document.querySelector('.pc.o')`);
        const cur = await ev(`+document.querySelector('[data-unit^="ga"]').dataset.unit.slice(2)`);
        if (k === 0) { const w = await ev(`(()=>{const x=[...document.querySelectorAll('.pc.o')].find(e=>+e.dataset.p!==${'${cur}'.replace('${cur}', 'CUR')}); return x? x.dataset.p : null})()`.replace('CUR', cur)); if (w !== null) { await tap(`.pc.o[data-p="${w}"]`); wrong++; } await foto(`${l.id}-orta`); }
        if (k === 1 && mode === 'pick') await drag(`.pc.o[data-p="${cur}"]`, '.qwrap');
        else await tap(`.pc.o[data-p="${cur}"]`);
        await sleep(300);
      }
    } else if (mode === 'memory') {
      const n = g.pairs.length;
      // önce bilerek iki farklı kart
      await tap(`.mc[data-p="0"]`); await tap(`.mc[data-p="1"]`); wrong++; await sleep(1500);
      await foto(`${l.id}-orta`);
      for (let i = 0; i < n; i++) {
        await waitFor(`document.querySelectorAll('.mc.up:not(.done)').length===0`, 3000);
        await tap(`.mc[data-p="${i}"]:not(.up)`); await tap(`.mc[data-p="${i}"]:not(.up)`); await sleep(500);
      }
    } else {
      const n = g.items.length;
      await tap(`.pc.o[data-p="${n - 1}"]`); wrong++;
      for (let i = 0; i < n; i++) {
        if (i === 0) await drag(`.pc.o[data-p="0"]`, '.slot.next');
        else await tap(`.pc.o[data-p="${i}"]`);
        if (i === 1) await foto(`${l.id}-orta`);
      }
    }
    const ok = await waitFor(`!!document.querySelector('#game .cele') && !document.querySelector('#nx').hidden`, 9000);
    await sleep(400);
    await foto(`${l.id}-son`);
    const over = await ev(`document.documentElement.scrollWidth > 391`);
    const broken = await ev(`[...document.querySelectorAll('#game img')].filter(i=>i.complete && i.naturalWidth===0).map(i=>i.src)`);
    res.push({ id: l.id, mode, ok, wrong, over, broken });
    console.log(ok && !over && !broken.length ? 'TAMAM' : 'SORUN', l.id, mode, over ? 'TAŞMA' : '', broken.join(' '));
  } catch (e) { res.push({ id: l.id, mode, ok: false, err: String(e) }); console.log('HATA', l.id, mode, String(e)); await foto(`${l.id}-hata`); }
}
const bad = res.filter(r => !r.ok || r.over || r.err || r.broken?.length);
console.log(`${res.length} oyun oynandı, ${res.length - bad.length} sorunsuz; JS hataları: ${errors.length}`); errors.slice(0, 8).forEach(e => console.log('  ', e));
fs.writeFileSync(`${OUT}/sonuc.json`, JSON.stringify({ res, errors }, null, 1));
ws.close(); ch.kill(); process.exit(bad.length || errors.length ? 1 : 0);
