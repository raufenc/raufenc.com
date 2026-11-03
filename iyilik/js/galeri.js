// "Resimlerim": çocuğun boyadığı sayfaları cihazdaki kayıttan tam resme çevirir; büyükler için paylaşma.
// Resimler hiçbir sunucuya gönderilmez; paylaşma yalnızca cihazın kendi paylaşım penceresini açar (ya da dosyayı indirir).
const KUNYE = 'İyiliklerle Büyüyorum · raufenc.com/iyilik';
const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
export const idOf = (b, p) => `b${b}-${String(p).padStart(2, '0')}`;
export const parseId = id => { const m = /^b(\d)-(\d+)$/.exec(id); return m ? { b: +m[1], p: +m[2] } : null; };

/** Boyanmış resim + çizgiler (+ isteğe bağlı künye şeridi) -> PNG Blob */
export async function composeArt(id, rec, { kunye = false } = {}) {
  const lines = await loadImg(`sayfa/${id}-c.webp`);
  const paint = await loadImg(URL.createObjectURL(rec.blob));
  URL.revokeObjectURL(paint.src);
  const W = lines.naturalWidth, H = lines.naturalHeight, S = kunye ? 66 : 0;
  const c = document.createElement('canvas'); c.width = W; c.height = H + S;
  const x = c.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(paint, 0, 0, W, H); x.drawImage(lines, 0, 0);
  if (kunye) {
    try { await document.fonts.load('800 24px Nunito', KUNYE); } catch {}
    x.fillStyle = '#fbf6e6'; x.fillRect(0, H, W, S);
    x.fillStyle = '#e6dfcc'; x.fillRect(0, H, W, 2);
    x.fillStyle = '#234c3c'; x.font = '800 24px Nunito, system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(KUNYE, W / 2, H + S / 2 + 1);
  }
  return new Promise(r => c.toBlob(r, 'image/png'));
}

/** Web Share API ile PNG dosyası; destek yoksa (ya da dosya paylaşımı yoksa) indirir. -> 'paylasildi' | 'indirildi' | 'vazgecildi' */
export async function shareOrDownload(blob, name) {
  const file = new File([blob], name, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'İyiliklerle Büyüyorum' }); return 'paylasildi'; }
    catch (e) { if (e?.name === 'AbortError') return 'vazgecildi'; /* başka hata: indirmeye düş */ }
  }
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 15000);
  return 'indirildi';
}
