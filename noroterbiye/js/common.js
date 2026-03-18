/* NöroTerbiye — Ortak JS modülü */

const NT = {
  // Sayfa navigasyon linkleri
  navLinks: [
    { href: '/noroterbiye/', label: 'Ana Sayfa' },
    { href: '/noroterbiye/sozluk/', label: 'Sözlük' },
    { href: '/noroterbiye/kisa-bilgiler/', label: 'Kısa Bilgiler' },
    { href: '/noroterbiye/testler/', label: 'Testler' },
    { href: '/noroterbiye/oyunlar/', label: 'Oyunlar' },
    { href: '/noroterbiye/ilham-verenler/', label: 'İlham Verenler' },
    { href: '/noroterbiye/araclar/', label: 'Araçlar' },
    { href: '/noroterbiye/kitap-haritasi/', label: 'Kitap Haritası' },
    { href: '/noroterbiye/kitap/', label: 'Kitap' },
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

  // localStorage yardımcıları
  save(key, data) {
    try { localStorage.setItem('nt_' + key, JSON.stringify(data)); } catch(e) {}
  },

  load(key, fallback = null) {
    try {
      const d = localStorage.getItem('nt_' + key);
      return d ? JSON.parse(d) : fallback;
    } catch(e) { return fallback; }
  },

  // PDF indirme — kayıtlı veriyi PDF olarak indir
  downloadPDF(elementId, filename) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const fn = filename || document.title.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s-]/g, '') + '.pdf';

    // html2pdf.js CDN'den yükle (ilk kullanımda)
    if (typeof html2pdf === 'undefined') {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
      s.onload = () => this._generatePDF(el, fn);
      document.head.appendChild(s);
    } else {
      this._generatePDF(el, fn);
    }
  },

  _generatePDF(el, filename) {
    this.toast('PDF hazırlanıyor...');
    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Geçici olarak light renkleri uygula (PDF için)
    el.style.cssText = 'background:#fff;color:#1a1a2e;padding:24px;border-radius:0';
    el.querySelectorAll('*').forEach(c => {
      const cs = getComputedStyle(c);
      if (cs.color === 'rgba(0, 0, 0, 0)' || cs.opacity === '0') return;
    });

    html2pdf().set(opt).from(el).save().then(() => {
      el.style.cssText = '';
      this.toast('PDF indirildi!');
    }).catch(() => {
      el.style.cssText = '';
      // Fallback: tarayıcı print diyaloğu
      window.print();
    });
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
