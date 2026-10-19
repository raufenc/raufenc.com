/* ============================================================
   /api/surum  —  Yayındaki sürümün tarihi (ana sayfadaki "Son güncelleme")
   ------------------------------------------------------------
   Vercel her yayına VERCEL_GIT_COMMIT_SHA verir; o commit'in tarihi GitHub
   API'sinden okunur. Yanıt CDN'de önbelleğe alınır (vercel.json), böylece
   GitHub'a bölge başına saatte en fazla bir istek gider.
   İsteğe bağlı: GITHUB_TOKEN (yalnız okuma) tanımlanırsa hız sınırı yükselir.
   Tarih alınamazsa { tarih: null } döner; sayfa satırı gizli bırakır.
   ============================================================ */
export const config = { runtime: 'edge' };

const DEPO = 'raufenc/raufenc.com';

function json(veri) {
  return new Response(JSON.stringify(veri), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || '';
  const ref = /^[0-9a-f]{7,40}$/.test(sha) ? sha : 'main';
  const basliklar = { 'User-Agent': 'raufenc.com', Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) basliklar.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const r = await fetch(`https://api.github.com/repos/${DEPO}/commits/${ref}`, { headers: basliklar });
    if (!r.ok) return json({ tarih: null });
    const j = await r.json();
    const tarih = j && j.commit && j.commit.committer && j.commit.committer.date;
    return json({ tarih: tarih || null, sha: ref.slice(0, 7) });
  } catch (_) {
    return json({ tarih: null });
  }
}
