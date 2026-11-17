// Kocaeli MEM AR-GE Portalı — Yapay Zekâ Asistanı (Edge)
// Anthropic varsa onu, yoksa OpenAI'yi kullanır. Kişisel veri gönderilmez; istemci bunu kullanıcıya bildirir.
export const config = { runtime: 'edge' };

import { kokenIzinli, istekKokeni, istekHostu, corsKokeni, govdeOku } from '../lib/guvenlik.js';

// İzinli kökenler: ARGE_ALLOWED_ORIGINS (virgülle) + uygulamanın kendi alan adı + yerel geliştirme
const ENV_ORIGINS = (process.env.ARGE_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const ALLOWED_ORIGINS = [...ENV_ORIGINS, 'http://localhost:3000', 'http://127.0.0.1:3000'];
// Tek çağıran tarayıcıdaki fetch POST'u (kocaeli-arge/js/views/misc.js) — Origin gönderir.
// Origin yoksa Referer'a bakılır; ikisi de yoksa reddedilir.
function originAllowed(req) {
  return kokenIzinli(istekKokeni(req), ALLOWED_ORIGINS, { sunucu: istekHostu(req) });
}
const HITS = new Map();
// Maliyet sınırları: istemci son 12 iletiyi gönderir (kullanıcı ≤2000 karakter)
const MAX_BODY_BYTES = 64000;
const MAX_MESSAGES = 12;
const MAX_USER_CHARS = 2000;
const MAX_ASSISTANT_CHARS = 3000;

const MODES = {
  arge:     'Görevin: Kocaeli İl Millî Eğitim Müdürlüğü AR-GE Birimi adına öğretmenlere AR-GE süreçlerinde yol göstermek. Proje döngüsü, başvuru şartları, raporlama ve iyi uygulama örnekleri hakkında net, uygulanabilir cevaplar ver.',
  proje:    'Görevin: öğretmenin okul türü, branşı ve hedefine uygun özgün proje önerileri üretmek. Her öneri için başlık, amaç, hedef kitle, yöntem, süre, beklenen çıktı ve uygun program (TÜBİTAK 4004/4005/4006/2204, eTwinning, il projesi) ver. Üç öneri sun.',
  yazi:     'Görevin: resmî yazı, duyuru, proje özeti, gerekçe, etkinlik haberi veya dilekçe taslağı hazırlamak. Kurumsal, vakur ve açık bir Türkçe kullan. Eksik bilgileri köşeli parantezle [ ... ] işaretle.',
  etkinlik: 'Görevin: etkinlik planı hazırlamak. Amaç, hedef kitle, tarih-saat önerisi, mekân, program akışı (dakika dakika), görev dağılımı, malzeme listesi, risk ve önlemler, değerlendirme ölçütleri başlıklarıyla ver.',
};

const SYSTEM_BASE = `Sen "Kocaeli MEM AR-GE Asistanı"sın. Kocaeli İl Millî Eğitim Müdürlüğü AR-GE Birimi'nin mobil portalında öğretmenlere yardım edersin.
Kurallar:
- Türkçe yaz; kısa paragraflar ve maddeler kullan. Başlıkları koyu yaz.
- Kesin olmadığın tarih, mevzuat veya kontenjan bilgilerini "kurumun resmî duyurusuyla teyit ediniz" notuyla ver; uydurma.
- Kişisel veri (TC kimlik, telefon, adres) isteme ve kaydetme.
- Öğrencileri ilgilendiren konularda MEB mevzuatına ve etik ilkelere uygunluğu hatırlat.
- Kocaeli'nin 12 ilçesi: Başiskele, Çayırova, Darıca, Derince, Dilovası, Gebze, Gölcük, İzmit, Kandıra, Karamürsel, Kartepe, Körfez.
- Kaynaklar: TÜBİTAK Bilim ve Toplum programları (4004 Doğa Eğitimi ve Bilim Okulları, 4005 Yenilikçi Eğitim Uygulamaları, 4006 Bilim Fuarları), 2204-A lise ve 2204-B ortaokul araştırma projeleri yarışmaları, eTwinning, MEB Akademi, Öğretmen Akademileri.`;

// CORS: yalnız izinli kökene yansıt; değilse Allow-Origin başlığı hiç konmaz
function cors(origin, izinli) {
  const h = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
  const k = corsKokeni(origin, izinli);
  if (k) h['Access-Control-Allow-Origin'] = k;
  return h;
}
function json(data, status, origin, izinli) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors(origin, izinli) },
  });
}
function rateLimited(ip) {
  const now = Date.now();
  const hits = (HITS.get(ip) || []).filter(t => now - t < 60_000);
  hits.push(now);
  HITS.set(ip, hits);
  if (HITS.size > 5000) HITS.clear();
  return hits.length > 20;
}
function cleanMessages(list) {
  if (!Array.isArray(list)) return [];
  return list.slice(-MAX_MESSAGES).map(m => {
    const role = m && m.role === 'assistant' ? 'assistant' : 'user';
    return { role, content: String((m && m.content) || '').slice(0, role === 'assistant' ? MAX_ASSISTANT_CHARS : MAX_USER_CHARS) };
  }).filter(m => m.content.trim());
}

async function callAnthropic(key, model, system, messages) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model, max_tokens: 1200, temperature: 0.6, system, messages }),
  });
  if (!r.ok) throw new Error('anthropic_' + r.status);
  const d = await r.json();
  return (d.content || []).map(c => c.text || '').join('').trim();
}
async function callOpenAI(key, model, system, messages) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({ model, max_tokens: 1200, temperature: 0.6, messages: [{ role: 'system', content: system }, ...messages] }),
  });
  if (!r.ok) throw new Error('openai_' + r.status);
  const d = await r.json();
  return (d.choices?.[0]?.message?.content || '').trim();
}

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const izinli = originAllowed(req);
  if (req.method === 'OPTIONS') return new Response(null, { status: izinli ? 204 : 403, headers: cors(origin, izinli) });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, origin, izinli);
  if (!izinli) return json({ error: 'forbidden' }, 403, origin, izinli);

  const ip = (req.headers.get('x-forwarded-for') || 'anon').split(',')[0].trim();
  if (rateLimited(ip)) return json({ error: 'rate_limited', reply: 'Çok sık istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.' }, 429, origin, izinli);

  let body;
  try {
    body = JSON.parse(await govdeOku(req, MAX_BODY_BYTES));
  } catch (e) {
    if (e && e.message === 'too_large') return json({ error: 'too_large' }, 413, origin, izinli);
    return json({ error: 'bad_json' }, 400, origin, izinli);
  }
  if (!body || typeof body !== 'object') return json({ error: 'bad_json' }, 400, origin, izinli);

  const mode = MODES[body.mode] ? body.mode : 'arge';
  const messages = cleanMessages(body.messages);
  if (!messages.length) return json({ error: 'empty' }, 400, origin, izinli);
  const profil = body.profil && typeof body.profil === 'object'
    ? `\nKullanıcı profili (yalnız bağlam için): branş: ${String(body.profil.brans || '').slice(0, 60)}, okul türü: ${String(body.profil.okulTuru || '').slice(0, 60)}, ilçe: ${String(body.profil.ilce || '').slice(0, 40)}.`
    : '';
  const system = `${SYSTEM_BASE}\n\n${MODES[mode]}${profil}`;

  const anthropicKey = process.env.ANTHROPIC_API_KEY || '';
  const openaiKey = process.env.OPENAI_API_KEY || '';
  const model = process.env.ARGE_MODEL || '';
  if (!anthropicKey && !openaiKey) {
    return json({ error: 'no_provider', reply: 'Yapay zekâ servisi henüz yapılandırılmadı.' }, 503, origin, izinli);
  }
  const errors = [];
  if (anthropicKey) {
    const models = [...new Set([model && !model.startsWith('gpt') ? model : '', 'claude-haiku-5-5', 'claude-haiku-4-5'].filter(Boolean))];
    for (const m of models) {
      try { return json({ reply: await callAnthropic(anthropicKey, m, system, messages), provider: 'anthropic', model: m }, 200, origin, izinli); }
      catch (e) { errors.push(`${m}: ${e.message}`); if (!/_(400|404)$/.test(e.message)) break; } // model bulunamadı ise sıradakini dene
    }
  }
  if (openaiKey) {
    try { return json({ reply: await callOpenAI(openaiKey, model.startsWith('gpt') ? model : 'gpt-4o-mini', system, messages), provider: 'openai' }, 200, origin, izinli); }
    catch (e) { errors.push('openai: ' + e.message); }
  }
  // İç ayrıntı istemciye gitmez; günlüğe yazılır
  console.error('arge-asistan sağlayıcı hataları:', errors.join(' | '));
  return json({ error: 'upstream_failed', reply: 'Asistan şu anda yanıt veremiyor. Lütfen biraz sonra tekrar deneyin.' }, 502, origin, izinli);
}
