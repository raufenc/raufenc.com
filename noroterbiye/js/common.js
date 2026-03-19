/* NöroTerbiye — Ortak JS modülü */

const NT = {
  // Sayfa navigasyon linkleri
  navLinks: [
    { href: '/noroterbiye/', label: 'Ana Sayfa' },
    { href: '/noroterbiye/sozluk/', label: 'Sözlük' },
    { href: '/noroterbiye/kisa-bilgiler/', label: 'Kısa Bilgiler' },
    { href: '/noroterbiye/testler/', label: 'Testler' },
    { href: '/noroterbiye/oyunlar/', label: 'Oyunlar' },
    { href: '/noroterbiye/araclar/', label: 'Araçlar' },
    { href: '/noroterbiye/profilim/', label: 'Profilim' },
    { href: '/noroterbiye/kitap-haritasi/', label: 'Kitap Haritası' },
    { href: '/noroterbiye/kitap/', label: 'Kitap' },
    { href: '/noroterbiye/kaynakca/', label: 'Kaynakça' },
    { href: '/noroterbiye/satin-al/', label: 'Satın Al', highlight: true },
  ],

  // Sayfa içi navigasyon oluştur
  renderNav(container) {
    const path = window.location.pathname.replace(/index\.html$/, '');
    const nav = document.createElement('nav');
    nav.className = 'nt-nav nt-wrap';
    nav.innerHTML = this.navLinks.map(l => {
      const cls = [path === l.href ? 'active' : '', l.highlight ? 'nt-nav-highlight' : ''].filter(Boolean).join(' ');
      return `<a href="${l.href}" class="${cls}">${l.label}</a>`;
    }).join('');
    if (container) container.prepend(nav);
    else document.body.insertBefore(nav, document.body.firstChild);
  },

  // Footer oluştur
  renderFooter() {
    const f = document.createElement('footer');
    f.className = 'nt-footer';
    f.innerHTML = `
      <p>NöroTerbiye — İçindeki düşmanı dosta çevirmek</p>
      <p style="margin-top:6px"><a href="/noroterbiye/kitap/">Kitap</a> · <a href="/">raufenc.com</a></p>
      <p style="margin-top:8px;font-size:0.7rem">Bu site teşhis koymaz; farkındalık oluşturur.</p>
    `;
    document.body.appendChild(f);
  },

  // Günün kavramı (sözlükten rastgele ama güne göre sabit)
  getGununKavrami(data) {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return data[seed % data.length];
  },

  // Kategori renk eşlemesi
  kategoriRenk(kat) {
    const map = {
      'Çekirdek': 'primary',
      'Biyoloji': 'green',
      'Metafor': 'purple',
      'Modern Tuzak': 'red',
      'Terbiye': 'cyan',
      'Psikoloji': 'amber',
      'Genel': 'primary',
    };
    return map[kat] || 'primary';
  },

  temaRenk(tema) {
    const map = {
      'Biyoloji': 'green',
      'Modern Tuzak': 'red',
      'Nefs Türleri': 'purple',
      'Terbiye': 'cyan',
      'Çevre': 'amber',
      'Genel': 'primary',
    };
    return map[tema] || 'primary';
  },

  // Basit arama filtresi
  filterBySearch(items, query, fields) {
    if (!query) return items;
    const q = query.toLowerCase().replace(/[ıİ]/g, 'i').replace(/[öÖ]/g, 'o')
      .replace(/[üÜ]/g, 'u').replace(/[şŞ]/g, 's').replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g');
    return items.filter(item =>
      fields.some(f => {
        const val = item[f] || '';
        const normalized = val.toLowerCase().replace(/[ıİ]/g, 'i').replace(/[öÖ]/g, 'o')
          .replace(/[üÜ]/g, 'u').replace(/[şŞ]/g, 's').replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g');
        return normalized.includes(q);
      })
    );
  },

  // Paylaşım fonksiyonu
  share(title, text, url) {
    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url || window.location.href).then(() => {
        this.toast('Link kopyalandı!');
      });
    }
  },

  // Toast mesajı
  toast(msg, duration = 2500) {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      padding:10px 24px;background:var(--surface);border:1px solid var(--border);
      border-radius:var(--radius-full);font-size:0.85rem;color:var(--text);
      box-shadow:var(--shadow-md);z-index:600;opacity:0;transition:opacity 0.2s`;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 200);
    }, duration);
  },

  // localStorage yardımcıları (hata yönetimli)
  save(key, data) {
    try {
      localStorage.setItem('nt_' + key, JSON.stringify(data));
      return true;
    } catch(e) {
      // Quota aşımı veya diğer hatalar
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        this.toast('Depolama alanı dolu! Eski verileri silmeyi dene.');
      } else {
        this.toast('Kayıt sırasında hata oluştu.');
      }
      console.error('NT.save error:', e);
      return false;
    }
  },

  load(key, fallback = null) {
    try {
      const d = localStorage.getItem('nt_' + key);
      return d ? JSON.parse(d) : fallback;
    } catch(e) {
      console.error('NT.load error:', e);
      return fallback;
    }
  },

  // ── Kayıt İndirme Sistemi ──
  // html2pdf.js kaldırıldı — %100 yerli, sıfır bağımlılık

  // Self-contained HTML dosyası olarak indir (her yerde açılır, PDF'e basılabilir)
  downloadPDF(contentOrId, filename) {
    const fn = (filename || document.title.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s-]/g, '')).replace(/\.pdf$/i, '') + '.html';
    const title = document.title.replace(' — NöroTerbiye', '');
    const date = new Date().toLocaleDateString('tr-TR');

    let html;
    if (typeof contentOrId === 'function') {
      html = contentOrId();
    } else {
      const el = document.getElementById(contentOrId);
      if (!el) { this.toast('İçerik bulunamadı'); return; }
      html = el.innerHTML;
    }

    const fullHTML = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — NöroTerbiye</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#1a1a2e;background:#fff;padding:40px 32px;line-height:1.7;max-width:800px;margin:0 auto}
h1{font-size:1.4rem;font-weight:800;margin-bottom:4px}
h3{font-size:1rem;font-weight:700;margin:20px 0 8px}
table{width:100%;border-collapse:collapse;margin:16px 0}
th,td{border:1px solid #d1d5db;padding:8px 10px;font-size:0.85rem;text-align:center}
th{background:#f3f4f6;font-weight:700;font-size:0.78rem;color:#374151}
.header{text-align:center;margin-bottom:28px;padding-bottom:16px;border-bottom:2px solid #e5e7eb}
.date{font-size:0.8rem;color:#9ca3af;margin-top:4px}
.footer{margin-top:36px;padding-top:14px;border-top:1px solid #e5e7eb;text-align:center;font-size:0.72rem;color:#9ca3af}
.print-btn{display:block;margin:24px auto 0;padding:10px 32px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit}
.print-btn:hover{background:#4f46e5}
p{margin:6px 0;font-size:0.9rem}
@media print{.print-btn{display:none!important}.footer{position:fixed;bottom:20px;left:0;right:0}}
</style>
</head>
<body>
<div class="header">
<h1>${title}</h1>
<div class="date">NöroTerbiye · ${date}</div>
</div>
${html}
<div class="footer">raufenc.com/noroterbiye · Bu belge teşhis koymaz, farkındalık oluşturur.</div>
<button class="print-btn" onclick="window.print()">🖨️ Yazdır / PDF Kaydet</button>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fn;
    a.click();
    URL.revokeObjectURL(a.href);
    this.toast('Rapor indirildi!');
  },

  // Yazdır butonu — @media print stilleriyle doğrudan tarayıcı print dialog'u
  printReport() {
    window.print();
  },

  // Canvas tabanlı görsel kaydetme (test sonuç kartları vs.)
  downloadImage(canvasCallback, filename) {
    try {
      const canvas = canvasCallback();
      if (!canvas) { this.toast('Görsel oluşturulamadı'); return; }
      const link = document.createElement('a');
      link.download = (filename || 'NöroTerbiye-Sonuç') + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      this.toast('Görsel indirildi!');
    } catch(e) {
      console.error('downloadImage error:', e);
      this.toast('Görsel indirilemedi');
    }
  },

  // Sonuç hesaplama (test puanları için)
  calcScore(answers, total) {
    const pct = Math.round((answers / total) * 100);
    let label, text;
    if (pct >= 80) { label = 'Harika!'; text = 'Kavramları çok iyi biliyorsun.'; }
    else if (pct >= 60) { label = 'İyi!'; text = 'Temel kavramları biliyorsun, derinleşmeye devam.'; }
    else if (pct >= 40) { label = 'Orta'; text = 'Bazı alanlarda güçlenmen gerekiyor.'; }
    else { label = 'Başlangıç'; text = 'Kavramları keşfetmeye başla, sözlüğe göz at.'; }
    return { pct, label, text };
  }
};

// PWA: Service Worker + Manifest
(function() {
  if (!document.querySelector('link[rel="manifest"]')) {
    const m = document.createElement('link');
    m.rel = 'manifest';
    m.href = '/noroterbiye/manifest.json';
    document.head.appendChild(m);
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/noroterbiye/sw.js').catch(() => {});
  }
  // Streak takibi
  const today = new Date().toISOString().slice(0, 10);
  const streak = NT.load('streak', { dates: [], current: 0, max: 0 });
  if (!streak.dates.includes(today)) {
    streak.dates.push(today);
    streak.dates = streak.dates.slice(-90); // son 90 gün tut
    // Ardışık gün hesapla
    let curr = 1;
    for (let i = streak.dates.length - 1; i > 0; i--) {
      const d1 = new Date(streak.dates[i]);
      const d2 = new Date(streak.dates[i - 1]);
      if ((d1 - d2) === 86400000) curr++;
      else break;
    }
    streak.current = curr;
    if (curr > streak.max) streak.max = curr;
    NT.save('streak', streak);
  }
})();
