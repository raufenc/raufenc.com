/* ============================================================
   /api/mizac-sohbet  —  Dokuz Tip Mizaç Testi sohbet uç noktası
   ------------------------------------------------------------
   Sağlayıcı önceliği:
     1) ANTHROPIC_API_KEY  → Claude  (varsa tercih edilir)
     2) OPENAI_API_KEY     → gpt-4o-mini  (sitede zaten kurulu)
     3) hiçbiri yoksa      → { fallback:true }  (istemci yerleşik
        rehbere düşer; sohbet yine de çalışır)
   Model değiştirmek için Vercel env: MIZAC_MODEL
   ============================================================ */
export const config = { runtime: 'edge' };

function sysPrompt(d) {
  const skor = d.scores ? `Cevap dağılımı (ilk üç): ${d.scores}.` : '';
  return `Sen "Mizaç Rehberi"sin: Dokuz Tip Mizaç Modeli (DTMM / Enneagram) konusunda bilgili, sıcak ve bilge bir rehbersin. Türkçe konuşuyorsun.

Kullanıcının test sonucu:
- Mizaç tipi: ${d.tip} · ${d.tipAdi} (${d.unvan})
- Merkez: ${d.merkez || '-'}, baskın kanat: ${d.kanat || '-'}
- Özet: ${d.ozet || '-'}
${skor}

İLKELER:
- Bu bir mizaç çerçevesidir; KESİN BİR TEŞHİS DEĞİLDİR. Kullanıcıya kendini tanıması için bir ayna tutuyorsun.
- Seküler, bilimsel ve saygılı bir dil kullan. Falcılık, kehanet, astroloji, mistik/okült çağrışım YOK. Kimseyi etiketleme ya da kutu içine hapsetme.
- Sıcak, anlayışlı, kişisel konuş; ikinci tekil şahıs ("sen") kullan.
- KISA ve öz ol: genelde 2–5 cümle. Gerektiğinde kısa madde listesi kullanabilirsin.
- Kullanıcının tipine (güçlü yönler, gölge tutku, stres/gelişim yönü, kanat, merkez) bağlı kal; uydurma.
- Tıbbi/psikolojik teşhis verme; ağır bir durum sezersen nazikçe bir uzmana danışmayı öner.
- Amacın kullanıcıyı yargılamadan düşündürmek, fark ettirmek ve gelişimine küçük somut bir adım önermek.`;
}

async function callAnthropic(key, model, system, messages) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model || 'claude-haiku-4-5',
      max_tokens: 700,
      temperature: 0.75,
      system,
      messages
    })
  });
  if (!r.ok) throw new Error('anthropic ' + r.status);
  const j = await r.json();
  const txt = (j.content || []).map(b => b.text || '').join('').trim();
  if (!txt) throw new Error('empty');
  return txt;
}

async function callOpenAI(key, model, system, messages) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + key },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      max_tokens: 700,
      temperature: 0.75,
      messages: [{ role: 'system', content: system }].concat(messages)
    })
  });
  if (!r.ok) throw new Error('openai ' + r.status);
  const j = await r.json();
  const txt = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
  if (!txt) throw new Error('empty');
  return txt.trim();
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
}

export default async function handler(req) {
  if (req.method !== 'POST') return json({ fallback: true, error: 'method' }, 405);

  let d;
  try { d = await req.json(); } catch (e) { return json({ fallback: true }, 400); }

  // Geçmişi temizle: yalnızca user/assistant, metin içerikli
  const hist = Array.isArray(d.history) ? d.history : [];
  let messages = hist
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-10);

  // Son mesaj kullanıcıdan değilse ekle
  if (d.message && (!messages.length || messages[messages.length - 1].role !== 'user' ||
      messages[messages.length - 1].content !== d.message)) {
    messages.push({ role: 'user', content: String(d.message).slice(0, 2000) });
  }
  // Anthropic ilk mesajın 'user' olmasını ister
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length) return json({ fallback: true });

  const system = sysPrompt(d);
  const model = process.env.MIZAC_MODEL;

  try {
    if (process.env.ANTHROPIC_API_KEY) {
      const reply = await callAnthropic(process.env.ANTHROPIC_API_KEY, model || 'claude-haiku-4-5', system, messages);
      return json({ reply });
    }
    if (process.env.OPENAI_API_KEY) {
      const reply = await callOpenAI(process.env.OPENAI_API_KEY, model || 'gpt-4o-mini', system, messages);
      return json({ reply });
    }
    return json({ fallback: true, reason: 'no-key' });
  } catch (err) {
    // Hata → istemci yerleşik rehbere düşsün
    return json({ fallback: true, reason: String(err && err.message || err) });
  }
}
