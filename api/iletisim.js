/* ============================================================
   /api/iletisim  —  Ana sayfa iletişim formu (Resend, Edge)
   ------------------------------------------------------------
   Ortam değişkenleri (Vercel):
     RESEND_API_KEY     → zorunlu. Yoksa 503 { error:'not_configured' } döner,
                          istemci e-posta uygulamasına (mailto) düşer.
     ILETISIM_ALICI     → mesajların gideceği adres (varsayılan: site sahibinin adresi)
     ILETISIM_GONDEREN  → Resend'de doğrulanmış gönderen, ör. "raufenc.com <form@raufenc.com>"
                          (varsayılan onboarding@resend.dev yalnız hesap sahibine gönderebilir)
   Koruma: köken denetimi + bal küpü (website) + çok hızlı gönderim tuzağı +
   IP başına en iyi-çaba hız sınırı (sıcak örnek içinde, kalıcı değil).
   İstek gövdesi JSON (fetch) ya da form-urlencoded (JS kapalıyken) olabilir;
   form gönderiminde yanıt /?iletisim=<durum>#iletisim adresine 303 yönlendirmedir.
   ============================================================ */
export const config = { runtime: 'edge' };

const ALLOWED = ['https://raufenc.com', 'https://www.raufenc.com'];
const KONULAR = {
  '': 'Genel',
  genel: 'Genel mesaj',
  isbirligi: 'İş birliği teklifi',
  'geri-bildirim': 'Geri bildirim',
  hata: 'Hata bildirimi',
};
const EPOSTA = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[a-z]{2,24}$/i;

function originOk(req) {
  const o = req.headers.get('origin') || req.headers.get('referer') || '';
  if (!o) return false;
  if (ALLOWED.some(a => o.indexOf(a) === 0)) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(o)) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app/.test(o)) return true;
  return false;
}

const HITS = new Map();
function rateLimited(req) {
  const ip = (req.headers.get('x-forwarded-for') || 'anon').split(',')[0].trim();
  const now = Date.now();
  const win = 10 * 60 * 1000, max = 5;
  const arr = (HITS.get(ip) || []).filter(t => now - t < win);
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) HITS.clear();
  return arr.length > max;
}

function tekSatir(s, n) {
  return String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);
}
function metin(s, n) {
  return String(s == null ? '' : s).replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, n);
}

function yanit(durum, veri, formMu) {
  if (formMu) {
    const sonuc = veri.ok ? 'tamam' : (veri.error === 'not_configured' ? 'eposta' : 'hata');
    return new Response(null, { status: 303, headers: { Location: `/?iletisim=${sonuc}#iletisim`, 'Cache-Control': 'no-store' } });
  }
  return new Response(JSON.stringify(veri), {
    status: durum,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

async function govdeOku(req, formMu) {
  if (formMu) {
    const f = await req.formData();
    return Object.fromEntries([...f.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : '']));
  }
  const ham = await req.text();
  if (ham.length > 12000) throw new Error('too_large');
  return JSON.parse(ham);
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  const tur = req.headers.get('content-type') || '';
  const formMu = /application\/x-www-form-urlencoded|multipart\/form-data/.test(tur);
  if (req.method !== 'POST') return yanit(405, { error: 'method_not_allowed' }, false);
  if (!originOk(req)) return yanit(403, { error: 'forbidden' }, formMu);

  let b;
  try { b = await govdeOku(req, formMu); } catch (_) { return yanit(400, { error: 'bad_request' }, formMu); }
  if (!b || typeof b !== 'object') return yanit(400, { error: 'bad_request' }, formMu);

  // Bal küpü ya da insan eliyle mümkün olmayan hız: sessizce "tamam" de, gönderme.
  if (tekSatir(b.website, 200)) return yanit(200, { ok: true }, formMu);
  // t: formun açılışından gönderime geçen ms (yalnız JS ile gönderimde gelir).
  if (typeof b.t === 'number' && b.t >= 0 && b.t < 1500) return yanit(200, { ok: true }, formMu);

  if (rateLimited(req)) return yanit(429, { error: 'rate_limited' }, formMu);

  const ad = tekSatir(b.name, 100);
  const eposta = tekSatir(b.email, 200).toLowerCase();
  const konuKodu = tekSatir(b.subject, 40);
  const mesaj = metin(b.message, 5000);
  if (ad.length < 2) return yanit(400, { error: 'invalid', alan: 'name' }, formMu);
  if (!EPOSTA.test(eposta)) return yanit(400, { error: 'invalid', alan: 'email' }, formMu);
  if (!(konuKodu in KONULAR)) return yanit(400, { error: 'invalid', alan: 'subject' }, formMu);
  if (mesaj.length < 10) return yanit(400, { error: 'invalid', alan: 'message' }, formMu);

  const KEY = process.env.RESEND_API_KEY || '';
  if (!KEY) return yanit(503, { error: 'not_configured' }, formMu);

  const alici = process.env.ILETISIM_ALICI || ['raufenc', 'gmail.com'].join('@');
  const gonderen = process.env.ILETISIM_GONDEREN || 'raufenc.com <onboarding@resend.dev>';
  const konu = `[raufenc.com] ${KONULAR[konuKodu]} — ${ad}`;
  const govde = [
    `Ad: ${ad}`,
    `E-posta: ${eposta}`,
    `Konu: ${KONULAR[konuKodu]}`,
    '',
    mesaj,
    '',
    '—',
    'raufenc.com iletişim formundan gönderildi. Yanıtla dediğinizde gönderene gider.',
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: gonderen, to: [alici], reply_to: eposta, subject: konu, text: govde }),
    });
    if (!r.ok) return yanit(502, { error: 'send_failed', status: r.status }, formMu);
    return yanit(200, { ok: true }, formMu);
  } catch (_) {
    return yanit(502, { error: 'send_failed' }, formMu);
  }
}
