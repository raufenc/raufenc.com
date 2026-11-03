// Çocuk boyamayı bitirince: KENDİ resmi kutlanır. Resim hafifçe parlar, ışıltılar uçuşur, sıcak bir tebrik sesi.
// Ekranı kaplamaz, beklemez; hareket azaltma ayarında yalnız sakin parıltı + kart.
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const TEBRIK = {
  t1: 'Mâşallah, ne güzel boyamışsın!',
  t2: 'Eline sağlık! Renkleri çok güzel seçmişsin.',
  t3: 'Bârekallah! Bu güzel resim senin emeğin.',
  t4: 'Ne kadar özenle boyamışsın. Resmin duvarına asıldı.',
  t5: 'Mâşallah! Sabırla, güzelce boyamışsın.',
  t6: 'Çok güzel olmuş! Bu resmi bir büyüğüne de göster.',
  t7: 'Eline, emeğine sağlık! Resmin Resimlerim duvarında.',
  t8: 'Ne güzel renkler! Her resmin seninle birlikte güzelleşiyor.',
};

/** paper: boyanan kâğıt öğesi, stage: sahne; colors: çocuğun kullandığı renkler */
export function celebrate({ stage, paper, colors = [], text }) {
  paper.classList.remove('glow'); void paper.offsetWidth; paper.classList.add('glow');
  const sh = document.createElement('i'); sh.className = 'shine'; paper.append(sh);
  setTimeout(() => sh.remove(), 1800);
  if (reduce()) return () => {};
  const cv = document.createElement('canvas'); cv.className = 'sparks'; stage.append(cv);
  const r = stage.getBoundingClientRect(), pr = paper.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
  cv.width = r.width * dpr; cv.height = r.height * dpr; cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
  const x = cv.getContext('2d'); x.scale(dpr, dpr);
  const pal = ['#ffd54a', '#fff3c4', '#ffffff', '#f0bd45', ...colors.slice(0, 5)];
  const cx = pr.left - r.left + pr.width / 2, cy = pr.top - r.top + pr.height * 0.45;
  const P = Array.from({ length: 46 }, (_, i) => {
    const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 5.5;
    return { x: cx + (Math.random() - .5) * pr.width * .5, y: cy + (Math.random() - .5) * pr.height * .4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3, s: 4 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - .5) * .3, c: pal[i % pal.length], star: i % 3 !== 0, life: 1 };
  });
  let raf = 0, t0 = performance.now();
  const star = (s) => { x.beginPath(); for (let k = 0; k < 8; k++) { const rr = k % 2 ? s * .42 : s; const a = k * Math.PI / 4; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } x.closePath(); x.fill(); };
  const frame = now => {
    const t = (now - t0) / 1000; x.clearRect(0, 0, r.width, r.height);
    for (const p of P) {
      p.vy += 0.16; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life = Math.max(0, 1 - t / 2.1);
      x.save(); x.globalAlpha = p.life; x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c;
      if (p.star) star(p.s * (0.7 + 0.3 * Math.sin(t * 9 + p.r))); else { x.beginPath(); x.arc(0, 0, p.s * .45, 0, 7); x.fill(); }
      x.restore();
    }
    if (t < 2.2) raf = requestAnimationFrame(frame); else cv.remove();
  };
  raf = requestAnimationFrame(frame);
  return () => { cancelAnimationFrame(raf); cv.remove(); };
}
