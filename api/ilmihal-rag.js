export const config = { runtime: 'edge' };

// Rate limiting: IP bazlı günlük 100 soru
const dailyLimits = new Map();

function checkRateLimit(ip) {
  const today = new Date().toISOString().slice(0, 10);
  const key = `${ip}:${today}`;

  // Eski günlerin kayıtlarını temizle
  for (const k of dailyLimits.keys()) {
    if (!k.endsWith(today)) dailyLimits.delete(k);
  }

  const count = dailyLimits.get(key) || 0;
  if (count >= 100) return false;
  dailyLimits.set(key, count + 1);
  return true;
}

const SYSTEM_PROMPT = `Sen Se'âdet-i Ebediyye kitabının AI asistanısın. Sana verilen kitap metinlerine dayanarak kullanıcının sorusunu cevapla.

KURALLAR:
- YALNIZCA verilen kitap metinlerine dayanarak cevap ver. Kitapta olmayan bilgi ASLA ekleme.
- Cevabını açık, anlaşılır Türkçe ile yaz.
- Kitabın Osmanlıca ifadelerini olduğu gibi koru (nemâz, oruc, gusl, vb.).
- Cevabın sonunda kaynak göster: (Kısım X, Madde Y)
- Kısa ve öz cevap ver (en fazla 3-4 paragraf).
- Eğer verilen metinlerde sorunun cevabı yoksa "Bu sorunun cevabı verilen metinlerde bulunamadı." de.
- Din büyüklerinin isimlerinden sonra uygun saygı ifadelerini kullan (sallallahü aleyhi ve sellem, radıyallahü anh, rahmetullahi aleyh gibi).`;

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = ['https://ilmihal.org', 'https://www.ilmihal.org', 'http://localhost:8086', 'http://localhost:8084', 'http://localhost'];
  const corsOrigin = allowedOrigins.find(o => origin.startsWith(o)) ? origin : allowedOrigins[0];

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  // Rate limit
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Günlük soru limiti (100) aşıldı. Yarın tekrar deneyin.' }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const { question, contexts } = await req.json();

    if (!question || question.length < 3 || question.length > 500) {
      return new Response(JSON.stringify({ error: 'Geçersiz soru' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!contexts || !Array.isArray(contexts) || contexts.length === 0 || contexts.length > 5) {
      return new Response(JSON.stringify({ error: 'Geçersiz context' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Context'leri hazırla (her biri max 8000 karakter)
    const contextText = contexts.map(c => {
      const text = (c.text || '').slice(0, 8000);
      return `--- Kısım ${c.kisim}, Madde ${c.madde_no} (s. ${c.sayfa || '?'}) - ${c.baslik || ''} ---\n${text}`;
    }).join('\n\n');

    const userMessage = `KİTAP METİNLERİ:\n${contextText}\n\nSORU: ${question}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        max_tokens: 800,
        stream: true,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: 'API hatası', detail: err }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Streaming SSE proxy
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ t: content })}\n\n`));
                }
              } catch {}
            }
          }
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
