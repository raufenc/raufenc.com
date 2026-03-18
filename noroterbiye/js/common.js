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

  // PDF indirme — print-friendly HTML oluşturup PDF'e çevir
  _pdfLoading: false,
  downloadPDF(contentOrId, filename) {
    if (this._pdfLoading) return;
    const fn = filename || document.title.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s-]/g, '') + '.pdf';

    // contentOrId: string (element ID) veya function (HTML döndüren callback)
    let html;
    if (typeof contentOrId === 'function') {
      html = contentOrId();
    } else {
      // Basit fallback: elementin textContent'ini düz metin olarak al
      const el = document.getElementById(contentOrId);
      if (!el) return;
      html = el.innerText;
    }

    // Print-ready wrapper
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'font-family:system-ui,-apple-system,sans-serif;color:#1a1a2e;background:#fff;padding:32px;line-height:1.6';
    wrapper.innerHTML = `
      <div style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #e0e0e0">
        <div style="font-size:1.5rem;font-weight:800;margin-bottom:4px">${document.title.replace(' — NöroTerbiye','')}</div>
        <div style="font-size:0.8rem;color:#888">NöroTerbiye · ${new Date().toLocaleDateString('tr-TR')}</div>
      </div>
      ${typeof contentOrId === 'function' ? html : `<pre style="white-space:pre-wrap;font-family:inherit;font-size:0.9rem">${html}</pre>`}
      <div style="margin-top:32px;padding-top:12px;border-top:1px solid #e0e0e0;text-align:center;font-size:0.7rem;color:#aaa">
        raufenc.com/noroterbiye · Bu belge teşhis koymaz, farkındalık oluşturur.
      </div>
    `;
    document.body.appendChild(wrapper);

    const generate = () => {
      this.toast('PDF hazırlanıyor...');
      html2pdf().set({
        margin: [10, 10, 10, 10], filename: fn,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }).from(wrapper).save().then(() => {
        wrapper.remove();
        this.toast('PDF indirildi!');
      }).catch(() => {
        wrapper.remove();
        window.print();
      });
    };

    if (typeof html2pdf === 'undefined') {
      this._pdfLoading = true;
      this.toast('PDF kütüphanesi yükleniyor...');
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
      s.onload = () => { this._pdfLoading = false; generate(); };
      s.onerror = () => { this._pdfLoading = false; wrapper.remove(); this.toast('PDF yüklenemedi'); window.print(); };
      document.head.appendChild(s);
    } else {
      generate();
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
