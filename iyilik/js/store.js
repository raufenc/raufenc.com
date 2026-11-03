// İlerleme (localStorage, eski anahtar korunur) ve resimler (IndexedDB). Veri yalnız bu cihazda kalır.
const KEY = 'iyilik-dunya-v1';
const isMap = v => v && typeof v === 'object' && !Array.isArray(v);

function load() {
  const s = { completed: {}, tasks: {}, visits: {}, last: null, book: 0, sound: true };
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (isMap(v)) {
      Object.assign(s, v); // bilinmeyen alanlar da korunur
      for (const k of ['completed', 'tasks', 'visits']) s[k] = isMap(v[k]) ? v[k] : {};
      s.last = typeof v.last === 'string' ? v.last : null;
      s.book = [1, 2, 3].includes(v.book) ? v.book : 0;
      s.sound = v.sound !== false;
    }
  } catch { /* bozuk kayıt: boş başla (bozuk kaydı üzerine yazmadan önce yedekle) */
    try { const raw = localStorage.getItem(KEY); if (raw) localStorage.setItem(KEY + '-bozuk', raw); } catch {}
  }
  s.v = 2;
  return s;
}

export const state = load();
let warned = false;
export function save(onFail) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
  catch { if (!warned && onFail) { warned = true; onFail(); } return false; }
}

// ---- IndexedDB: boyanan resimler ----
let dbp;
function db() {
  if (!dbp) dbp = new Promise((res, rej) => {
    if (!('indexedDB' in window)) return rej(new Error('idb yok'));
    const r = indexedDB.open('iyilik-v2', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('paint');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbp;
}
const tx = async (mode, fn) => {
  const d = await db();
  return new Promise((res, rej) => {
    const t = d.transaction('paint', mode); const st = t.objectStore('paint');
    const out = fn(st);
    t.oncomplete = () => res(out && 'result' in out ? out.result : undefined);
    t.onerror = () => rej(t.error); t.onabort = () => rej(t.error);
  });
};
export const putPaint = (id, rec) => tx('readwrite', s => s.put(rec, id)).catch(() => false);
export const getPaint = id => tx('readonly', s => s.get(id)).catch(() => undefined);
export const delPaint = id => tx('readwrite', s => s.delete(id)).catch(() => false);
export const clearPaints = () => tx('readwrite', s => s.clear()).catch(() => false);
export async function listPaints() {
  try {
    const d = await db();
    return await new Promise(res => {
      const out = []; const r = d.transaction('paint').objectStore('paint').openCursor();
      r.onsuccess = () => { const c = r.result; if (c) { out.push({ id: c.key, t: c.value.t, thumb: c.value.thumb }); c.continue(); } else res(out); };
      r.onerror = () => res(out);
    });
  } catch { return []; }
}
