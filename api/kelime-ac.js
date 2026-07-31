/* ============================================================
   /api/kelime-ac  —  Kelime Aileleri kilit açma uç noktası
   ------------------------------------------------------------
   Kilitli 33 kartın verisi YALNIZCA burada durur; istemciye
   ancak kutu sahipliği kanıtlandıktan sonra gönderilir.

   Kanıt: kartın ARKA yüzündeki sohbet sorusu. 144 sorunun
   ilk dört kelimesi bile tekildir ve hiçbiri internette yoktur.
   Ücretsiz 3 kartın soruları anahtar listesinde YER ALMAZ
   (onlar sitede zaten görünüyor).

   Modlar:
     { seri, cevap }            → tek cevabı doğrular
     { seri, cevaplar:[a,b] }   → iki FARKLI kart doğrulanırsa
                                  kilitli kartların tamamını döner
   ============================================================ */
import { SORULAR, KILITLI } from './_kelime-veri.js';

export const config = { runtime: 'edge' };

const ALLOWED = ['https://raufenc.com', 'https://www.raufenc.com'];
function originOk(req) {
  const host = req.headers.get('origin') || req.headers.get('referer') || '';
  if (!host) return false;
  if (ALLOWED.some(a => host.indexOf(a) === 0)) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(host)) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app/.test(host)) return true;
  return false;
}

/* En iyi-çaba hız sınırı — kaba kuvvetle soru denemesini pahalılaştırır */
const HITS = new Map();
function rateLimited(req) {
  const ip = (req.headers.get('x-forwarded-for') || 'anon').split(',')[0].trim();
  const now = Date.now(), win = 60000, max = 20;
  const arr = (HITS.get(ip) || []).filter(t => now - t < win);
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) HITS.clear();
  return arr.length > max;
}

/* ── Metin normalleştirme ──────────────────────────────────────
   Hem şapkalı harfleri hem Türkçe özel harfleri ASCII'ye katlar.
   Böylece "Gâh ögesi" ile "Gah ogesi" aynı kabul edilir — Türkçe
   klavyesi olmayan ya da şapkaları atlayan kullanıcı da geçebilir. */
const KATLA = {
  'â':'a','ā':'a','ä':'a','à':'a','á':'a',
  'î':'i','ī':'i','ï':'i','ì':'i','í':'i','ı':'i',
  'û':'u','ū':'u','ü':'u','ù':'u','ú':'u',
  'ê':'e','ë':'e','è':'e','é':'e',
  'ô':'o','ö':'o','ò':'o','ó':'o',
  'ç':'c','ğ':'g','ş':'s'
};
function normalle(s) {
  return String(s == null ? '' : s)
    .slice(0, 300)
    .replace(/İ/g, 'i').replace(/I/g, 'i')
    .toLowerCase()
    .replace(/[âāäàáîīïìíıûūüùúêëèéôöòóçğş]/g, c => KATLA[c] || c)
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function esles(seri, cevap) {
  const liste = SORULAR[seri];
  if (!liste) return { ok: false, sebep: 'seri' };

  const c = normalle(cevap);
  const kelime = c ? c.split(' ') : [];
  if (kelime.length < 3 || c.length < 12)
    return { ok: false, sebep: 'kisa' };

  // Cevap, sorunun başlangıcı mı? (kullanıcıdan ilk birkaç kelime isteniyor)
  const bulunan = liste.filter(q => normalle(q.s).startsWith(c));
  if (bulunan.length === 1) return { ok: true, kart: bulunan[0].t };
  if (bulunan.length > 1)  return { ok: false, sebep: 'coklu' };

  // Tamamını yazmış olabilir ya da baştan birkaç kelime atlamış olabilir
  const iceren = liste.filter(q => normalle(q.s).indexOf(c) >= 0);
  if (iceren.length === 1) return { ok: true, kart: iceren[0].t };
  if (iceren.length > 1)   return { ok: false, sebep: 'coklu' };

  return { ok: false, sebep: 'yok' };
}

const json = (obj, kod) => new Response(JSON.stringify(obj), {
  status: kod || 200,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
});

export default async function handler(req) {
  if (req.method !== 'POST') return json({ ok: false, hata: 'yontem' }, 405);
  if (!originOk(req))        return json({ ok: false, hata: 'kaynak' }, 403);
  if (rateLimited(req))      return json({ ok: false, hata: 'yavasla' }, 429);

  let g;
  try { g = await req.json(); } catch { return json({ ok: false, hata: 'govde' }, 400); }

  const seri = String(g && g.seri || '').slice(0, 8);
  if (!SORULAR[seri]) return json({ ok: false, hata: 'seri' }, 400);

  /* Tek cevap doğrulama — anında geri bildirim için */
  if (typeof g.cevap === 'string') {
    const s = esles(seri, g.cevap);
    return json(s.ok ? { ok: true, kart: s.kart } : { ok: false, sebep: s.sebep });
  }

  /* İki cevap → kilidi aç */
  if (Array.isArray(g.cevaplar) && g.cevaplar.length === 2) {
    const a = esles(seri, g.cevaplar[0]);
    const b = esles(seri, g.cevaplar[1]);
    if (!a.ok || !b.ok)        return json({ ok: false, sebep: 'dogrulanmadi' });
    if (a.kart === b.kart)     return json({ ok: false, sebep: 'ayni' });
    return json({ ok: true, kartlar: KILITLI[seri] });
  }

  return json({ ok: false, hata: 'istek' }, 400);
}
