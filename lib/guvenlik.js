// Ortak güvenlik yardımcıları — yalnız Web API'leri (URL, crypto.subtle, TextEncoder);
// hem Edge hem Node çalışma zamanında çalışır.

const YEREL = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d{1,5})?$/;

// İsteğin kaynağı: Origin (boş ya da "null" değilse), yoksa Referer.
export function istekKokeni(req) {
  const o = (req.headers.get('origin') || '').trim();
  if (o && o !== 'null') return o;
  return (req.headers.get('referer') || '').trim();
}

// İsteğin kendi host'u (önizleme yayınları için aynı köken denetimi).
export function istekHostu(req) {
  return (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').split(',')[0].trim().toLowerCase();
}

// Origin ya da Referer değerini köken olarak ayrıştırıp izin listesinde TAM eşleşme arar.
// Önek/içerir eşleşmesi yoktur.
export function kokenIzinli(deger, izinli = [], { yerel = true, sunucu = '' } = {}) {
  if (!deger || typeof deger !== 'string') return false;
  let u;
  try { u = new URL(deger); } catch (_) { return false; }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return false;
  if (u.username || u.password) return false;
  const koken = u.origin;
  if (izinli.includes(koken)) return true;
  if (yerel && YEREL.test(koken)) return true;
  if (sunucu && u.host.toLowerCase() === String(sunucu).toLowerCase()) {
    // Aynı host: canlıda yalnız https; yerelde http de olur.
    if (u.protocol === 'https:' || YEREL.test(koken)) return true;
  }
  return false;
}

// CORS başlığına yazılacak köken: yalnız izinliyse kendisi, değilse boş.
export function corsKokeni(origin, izinliMi) {
  const ok = typeof izinliMi === 'function' ? izinliMi(origin) : Boolean(izinliMi);
  return origin && ok ? origin : '';
}

// Sabit zamanlı karşılaştırma: rastgele anahtarla iki girdinin HMAC-SHA256'sı XOR'lanır.
// Uzunluk farkı erken dönüşe yol açmaz.
let _anahtar = null;
function anahtar() {
  if (!_anahtar) {
    _anahtar = crypto.subtle.importKey('raw', crypto.getRandomValues(new Uint8Array(32)),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  }
  return _anahtar;
}
export async function esit(a, b) {
  const k = await anahtar();
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([
    crypto.subtle.sign('HMAC', k, enc.encode(String(a ?? ''))),
    crypto.subtle.sign('HMAC', k, enc.encode(String(b ?? ''))),
  ]);
  const p = new Uint8Array(x), q = new Uint8Array(y);
  let r = 0;
  for (let i = 0; i < p.length; i++) r |= p[i] ^ q[i];
  return r === 0;
}

// Gövdeyi en çok `max` bayt okur; aşarsa Error('too_large') atar (Content-Length'e güvenmez).
export async function govdeOku(req, max) {
  const beyan = Number(req.headers.get('content-length') || '0');
  if (beyan > max) throw new Error('too_large');
  if (!req.body) return '';
  const okuyucu = req.body.getReader();
  const parcalar = [];
  let toplam = 0;
  for (;;) {
    const { done, value } = await okuyucu.read();
    if (done) break;
    toplam += value.byteLength;
    if (toplam > max) { try { await okuyucu.cancel(); } catch (_) {} throw new Error('too_large'); }
    parcalar.push(value);
  }
  const hepsi = new Uint8Array(toplam);
  let o = 0;
  for (const p of parcalar) { hepsi.set(p, o); o += p.byteLength; }
  return new TextDecoder().decode(hepsi);
}
