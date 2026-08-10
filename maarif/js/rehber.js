/* rehber.js - Program Rehberim: Öğretmen El Kitabı */
(function(){
'use strict';

/* ============================================================
   COURSE METADATA
   ============================================================ */
const COURSES = {
  fkh: { code:'FKH', file:'FKH_10_database.json', name:'Fıkıh', icon:'📖', sinif:10, color:'#7c3aed' },
  hds: { code:'HDS', file:'HDS_10_database.json', name:'Hadis', icon:'📜', sinif:10, color:'#0891b2' },
  syr: { code:'SYR', file:'SYR_10_database.json', name:'Siyer', icon:'🕌', sinif:10, color:'#059669' },
  tdb: { code:'TDB', file:'TDB_9_database.json',  name:'Temel Dinî Bilgiler', icon:'🕋', sinif:9, color:'#dc2626' }
};

/* ============================================================
   ÖLÇME ARAÇLARI SÖZLÜĞÜ
   Anahtarlar bilinçli olarak ASCII: olcmeCard() gelen adı önce
   sadeleştirip (ö→o, ş→s, ı→i ...) burada arıyor. Anahtarları
   değiştirmeyin; yalnızca görünen alanlar (ad/aciklama/nasil/sure) Türkçedir.
   ============================================================ */
const OLCME_ARACLARI = {
  'acik uclu sorular':        { icon:'✏️', ad:'Açık Uçlu Sorular', aciklama:'Öğrencinin serbest yanıtladığı, düşünme ve ifade becerisini ölçen sorular.', nasil:'Soru kâğıdı dağıtılır, öğrenciler bireysel yanıt yazar (5-10 dk).', sure:'5-10 dk' },
  'bosluk doldurma sorulari': { icon:'📝', ad:'Boşluk Doldurma Soruları', aciklama:'Kavram bilgisini kısa ve net ölçen, cümledeki eksik kısmı tamamlatan sorular.', nasil:'Hazırlanan cümlelerdeki boş kısımlar öğrenciye doldurtulur.', sure:'5 dk' },
  'cikis karti':              { icon:'🎫', ad:'Çıkış Kartı', aciklama:'Ders sonunda öğrencinin öğrendiklerini özetlediği kısa kart.', nasil:'Ders bitmeden 3 dk önce dağıtılır: "Bugün ne öğrendim? Neyi merak ediyorum?"', sure:'3 dk' },
  'ogrenme gunlugu':          { icon:'📓', ad:'Öğrenme Günlüğü', aciklama:'Öğrencinin öğrenme sürecini düşünümsel biçimde kaydettiği defter.', nasil:'Haftada bir kez günlük yazdırılır; öğretmen yorumla geri bildirim verir.', sure:'10 dk' },
  'anlam cozumleme tablosu':  { icon:'📊', ad:'Anlam Çözümleme Tablosu', aciklama:'Kavramların özelliklerini evet/hayır biçiminde karşılaştıran tablo.', nasil:'Kavramlar satıra, özellikler sütuna yazılır; öğrenci işaretler.', sure:'10-15 dk' },
  'oz degerlendirme formu':   { icon:'📋', ad:'Öz Değerlendirme Formu', aciklama:'Öğrencinin kendi öğrenme düzeyi hakkındaki farkındalığını ölçer.', nasil:'Likert ölçekli form dağıtılır ve öğrenci kendini değerlendirir.', sure:'5 dk' },
  'cumle tamamlama sorulari': { icon:'💬', ad:'Cümle Tamamlama Soruları', aciklama:'Verilen cümlelerin sonunun tamamlanmasıyla kavrayışı ölçme.', nasil:'Yarım bırakılan cümleler öğrenciye yazılı tamamlatılır.', sure:'5-8 dk' },
  'frayer diyagrami':         { icon:'🔲', ad:'Frayer Diyagramı', aciklama:'Kavramları tanım, özellik, örnek ve örnek-olmayan ile yapılandırma aracı.', nasil:'4 bölmeli şema dağıtılır; öğrenci her bölmeyi doldurur.', sure:'10-15 dk' },
  'kavram haritasi':          { icon:'🗺️', ad:'Kavram Haritası', aciklama:'Kavramlar arası ilişkileri görselleştiren diyagram.', nasil:'Merkeze ana kavram, dallara alt kavramlar yazdırılır; oklarla ilişkilendirilir.', sure:'15-20 dk' },
  'bilgi haritasi':           { icon:'🧭', ad:'Bilgi Haritası', aciklama:'Kavramları hiyerarşik olarak sınıflandıran şematik gösterim.', nasil:'Ana başlık ve alt başlıklar dallandırılır; öğrenci doldurur.', sure:'10 dk' },
  'eslestirme sorulari':      { icon:'🔗', ad:'Eşleştirme Soruları', aciklama:'Kavram-tanım, terim-açıklama gibi iki kümeyi eşleştirme.', nasil:'İki sütun verilir; öğrenci çizgiyle eşleştirir.', sure:'5 dk' },
  'yapilandirilmis grid':     { icon:'📐', ad:'Yapılandırılmış Grid', aciklama:'Numaralı kutucuklardaki bilgileri kategorilere göre seçme.', nasil:'9-16 kutucuklu grid dağıtılır, öğrenci soruya göre seçim yapar.', sure:'10 dk' },
  'performans gorevi':        { icon:'🏆', ad:'Performans Görevi', aciklama:'Ünite sonunda ürün ortaya koyan kapsamlı değerlendirme.', nasil:'Konu verilir, ölçütler açıklanır; 1-2 haftada teslim edilir.', sure:'1-2 hafta' },
  'tanilayici dallanmis agac':{ icon:'🌳', ad:'Tanılayıcı Dallanmış Ağaç', aciklama:'Evet/hayır sorularıyla bilgi düzeyini belirleyen akış şeması.', nasil:'Yazılı veya dijital akış şeması öğrenciye sunulur.', sure:'10 dk' },
  'kontrol noktasi':          { icon:'✅', ad:'Kontrol Noktası', aciklama:'Konu içi kısa değerlendirme; anlama düzeyini yoklama.', nasil:'2-3 soru ile anında yoklama yapılır.', sure:'3-5 dk' },
  'T tablosu':                { icon:'📏', ad:'T Tablosu', aciklama:'İki kavram/durum arasındaki benzerlik ve farklılıkları gösteren tablo.', nasil:'T şeklinde iki sütunlu tablo çizdirilip karşılaştırma yaptırılır.', sure:'10 dk' },
  'gozlem formu':             { icon:'👁️', ad:'Gözlem Formu', aciklama:'Öğretmenin öğrenci performansını süreçte gözlemleme aracı.', nasil:'Davranış göstergeleri listelenir, öğretmen işaretler.', sure:'Sürekli' },
  'rubrik':                   { icon:'📊', ad:'Rubrik (Dereceli Puanlama)', aciklama:'Performansın düzeylerini gösteren analitik değerlendirme aracı.', nasil:'Ölçütler ve düzey tanımları hazırlanır; öğrenciye önceden paylaşılır.', sure:'Değişken' }
};

/* ============================================================
   SEMESTER / WEEK CALCULATION
   ============================================================ */
const SEMESTER_START = new Date(2025, 8, 8); // 8 Eylul 2025
const HOLIDAYS = [
  { start: new Date(2025, 10, 10), end: new Date(2025, 10, 14) }, // 10-14 Kasim
  { start: new Date(2026, 0, 19),  end: new Date(2026, 0, 30) },  // 19-30 Ocak
  { start: new Date(2026, 2, 16),  end: new Date(2026, 2, 20) }   // 16-20 Mart
];

function isHolidayWeek(weekStart) {
  for (const h of HOLIDAYS) {
    if (weekStart >= h.start && weekStart <= h.end) return true;
    const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 4);
    if (weekEnd >= h.start && weekEnd <= h.end) return true;
    if (weekStart <= h.start && weekEnd >= h.end) return true;
  }
  return false;
}

function getCurrentWeek() {
  const today = new Date();
  let week = 0;
  let d = new Date(SEMESTER_START);
  while (d <= today) {
    if (!isHolidayWeek(d)) week++;
    d.setDate(d.getDate() + 7);
  }
  return Math.max(1, week);
}

function getWeekDateRange(teachingWeek) {
  let week = 0;
  let d = new Date(SEMESTER_START);
  while (week < teachingWeek) {
    if (!isHolidayWeek(d)) week++;
    if (week < teachingWeek) d.setDate(d.getDate() + 7);
  }
  const end = new Date(d); end.setDate(end.getDate() + 4);
  const fmt = dt => dt.getDate() + ' ' + ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'][dt.getMonth()];
  return fmt(d) + ' - ' + fmt(end);
}

/* ============================================================
   DATA LOADING
   ============================================================ */
const Rehber = {
  data: {},
  yetkinlikler: {},
  loaded: false,
  _loading: false,

  async loadData() {
    if (this.loaded || this._loading) return;
    this._loading = true;
    try {
      const fetches = Object.entries(COURSES).map(async ([key, c]) => {
        const res = await fetch('data/' + c.file);
        this.data[key] = await res.json();
      });
      fetches.push(
        fetch('data/yetkinlikler.json').then(r => r.json()).then(d => { this.yetkinlikler = d.yetkinlikler || d; })
      );
      await Promise.all(fetches);
      this.loaded = true;
    } catch(e) {
      console.error('Rehber veri yukleme hatasi:', e);
    }
    this._loading = false;
  },

  /* ============================================================
     MAIN RENDER
     ============================================================ */
  async render(APP, parts) {
    if (!this.loaded) {
      APP.innerHTML = '<div class="loading"><p>Veriler yukleniyor...</p></div>';
      await this.loadData();
    }
    const sub = parts[1] || '';
    if (!sub || sub === 'rehber') return this.renderHome(APP);
    if (sub === 'ortak-metin') return this.renderPdf(APP, null, 'ortak_metin', 1);

    const dersKey = sub.toLowerCase();
    if (!COURSES[dersKey]) return this.render404(APP);

    const subPage = parts[2] || '';
    const param1 = parts[3] || '';
    const param2 = parts[4] || '';

    switch(subPage) {
      case '':           return this.renderDashboard(APP, dersKey);
      case 'haftalik':   return param1 ? this.renderWeekDetail(APP, dersKey, parseInt(param1)) : this.renderWeeklyPlan(APP, dersKey);
      case 'unite':
        if (parts[4] === 'cikti' && parts[5]) {
          // #/rehber/fkh/unite/1/cikti/FKH.10.1.1
          return this.renderLessonFlow(APP, dersKey, parseInt(param1), parts[5]);
        }
        return this.renderUniteDetail(APP, dersKey, parseInt(param1));
      case 'materyaller': return this.renderMateryaller(APP, dersKey);
      case 'kavramlar':   return this.renderKavramlar(APP, dersKey);
      case 'teknikler':   return this.renderTeknikler(APP, dersKey);
      case 'kitap':       return this.renderPdf(APP, dersKey, 'kitap', parseInt(param1) || 1);
      case 'program':     return this.renderPdf(APP, dersKey, 'program', parseInt(param1) || 1);
      default:            return this.render404(APP);
    }
  },

  /* ============================================================
     HELPERS
     ============================================================ */
  back(href, label) {
    return `<a href="${href}" class="back-btn">\u2190 ${label || 'Geri'}</a>`;
  },

  courseTitle(dersKey) {
    const c = COURSES[dersKey];
    return c ? `${c.icon} ${c.name} (${c.sinif}. sınıf)` : '';
  },

  getCourseData(dersKey) {
    return this.data[dersKey];
  },

  getUnits(dersKey) {
    const d = this.getCourseData(dersKey);
    return d ? d.program.uniteler : [];
  },

  getWeeklyPlan(dersKey) {
    const d = this.getCourseData(dersKey);
    return d && d.eslestirme ? d.eslestirme.haftalik_plan : [];
  },

  getMaterials(dersKey) {
    const d = this.getCourseData(dersKey);
    return d ? (d.kitap?.materyaller || []) : [];
  },

  getTeknikKutuphanesi(dersKey) {
    const d = this.getCourseData(dersKey);
    return d && d.eslestirme ? (d.eslestirme.teknikler_kutuphanesi || []) : [];
  },

  // Teknik bul — isme gore, tum derslerde ara
  findTeknik(ad) {
    const adLow = ad.toLowerCase();
    for (const [key, d] of Object.entries(this.data)) {
      const lib = d.eslestirme?.teknikler_kutuphanesi || [];
      const found = lib.find(t => t.ad.toLowerCase() === adLow || t.ad.toLowerCase().includes(adLow) || adLow.includes(t.ad.toLowerCase()));
      if (found) return { teknik: found, dersKey: key };
    }
    return null;
  },

  // Teknik modalini goster
  showTeknikModal(ad, context) {
    const result = this.findTeknik(ad);
    if (!result) return;
    const t = result.teknik;
    const dersKey = result.dersKey;

    // Konuya ozel ornek olustur
    let ornekHtml = '';
    if (context) {
      ornekHtml = `<div style="background:var(--accent-light);border-radius:var(--radius-sm);padding:.75rem;margin-top:.75rem">
        <div style="font-weight:600;font-size:.85rem;margin-bottom:.4rem">💡 Bu Dersteki Uygulaması</div>
        ${context.nerede ? `<div style="font-size:.82rem;margin-bottom:.3rem"><strong>Ne zaman:</strong> ${context.nerede}</div>` : ''}
        ${context.konu ? `<div style="font-size:.82rem"><strong>Konu:</strong> ${context.konu}</div>` : ''}
      </div>`;
    }

    // Kullanildigi ciktilar
    let kullanimHtml = '';
    if (t.kullanildigi_ciktilar && t.kullanildigi_ciktilar.length) {
      kullanimHtml = `<div style="margin-top:.75rem">
        <div style="font-weight:600;font-size:.85rem;margin-bottom:.4rem">📍 Kullanıldığı Çıktılar</div>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem">${t.kullanildigi_ciktilar.map(k => {
          const parts = k.split('.');
          const uniteNo = parts.length >= 3 ? parts[2] : '1';
          return `<a href="#/rehber/${dersKey}/unite/${uniteNo}/cikti/${k}" onclick="Rehber._closeTeknikModal()" style="font-size:.72rem;padding:.2rem .5rem;background:var(--primary-light);color:#fff;border-radius:3px;text-decoration:none">${k}</a>`;
        }).join('')}</div>
      </div>`;
    }

    // Nasil uygulanir adimlari
    let adimlarHtml = '';
    if (t.nasil_uygulanir) {
      const lines = t.nasil_uygulanir.split(/\d+[\.\)]\s*/).filter(Boolean);
      adimlarHtml = `<div style="margin-top:.75rem">
        <div style="font-weight:600;font-size:.85rem;margin-bottom:.4rem">📋 Nasil Uygulanir?</div>
        <ol style="margin:0;padding-left:1.25rem;font-size:.85rem;line-height:1.7">
          ${lines.map(l => `<li style="margin-bottom:.3rem">${l.trim()}</li>`).join('')}
        </ol>
      </div>`;
    }

    const modal = document.createElement('div');
    modal.id = 'rehber-teknik-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:999;display:flex;align-items:flex-end;justify-content:center';
    modal.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(2px)" onclick="Rehber._closeTeknikModal()"></div>
      <div style="position:relative;background:var(--surface);border-radius:var(--radius-lg) var(--radius-lg) 0 0;max-height:85vh;overflow-y:auto;width:100%;max-width:600px;box-shadow:0 -4px 30px rgba(0,0,0,.2);animation:fadeIn .25s">
        <div style="position:sticky;top:0;background:var(--surface);border-bottom:1px solid var(--border);padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;z-index:1">
          <div style="font-size:1.1rem;font-weight:700">🛠️ ${t.ad}</div>
          <button onclick="Rehber._closeTeknikModal()" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text-secondary)">&times;</button>
        </div>
        <div style="padding:1.25rem">
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.75rem">
            ${t.sure_tahmini ? `<span style="font-size:.78rem;padding:.2rem .5rem;background:var(--surface-alt);border-radius:3px">⏱ ${t.sure_tahmini}</span>` : ''}
            ${t.gerekli_materyal ? `<span style="font-size:.78rem;padding:.2rem .5rem;background:var(--surface-alt);border-radius:3px">📦 ${t.gerekli_materyal}</span>` : ''}
          </div>
          <div style="font-size:.9rem;line-height:1.6;margin-bottom:.75rem">${t.aciklama || ''}</div>
          ${adimlarHtml}
          ${t.uygun_oldugu_durumlar ? `<div style="margin-top:.75rem">
            <div style="font-weight:600;font-size:.85rem;margin-bottom:.4rem">🎯 Uygun Durumlar</div>
            <div style="font-size:.85rem;color:var(--text-secondary)">${t.uygun_oldugu_durumlar}</div>
          </div>` : ''}
          ${ornekHtml}
          ${kullanimHtml}
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  },

  _closeTeknikModal() {
    const m = document.getElementById('rehber-teknik-modal');
    if (m) m.remove();
    document.body.style.overflow = '';
  },

  getCiktiKitap(dersKey) {
    const d = this.getCourseData(dersKey);
    return d && d.eslestirme ? d.eslestirme.cikti_kitap : [];
  },

  findUygulama(dersKey, ciktiKod) {
    const units = this.getUnits(dersKey);
    for (const u of units) {
      if (!u.ogrenme_ogretme_yasantilari) continue;
      const uygs = u.ogrenme_ogretme_yasantilari.uygulamalar || [];
      const found = uygs.find(a => a.cikti_kodu === ciktiKod);
      if (found) return { uygulama: found, unite: u };
    }
    return null;
  },

  findCikti(dersKey, ciktiKod) {
    const units = this.getUnits(dersKey);
    for (const u of units) {
      const ocs = u.ogrenme_ciktilari || [];
      const found = ocs.find(c => c.kod === ciktiKod);
      if (found) return { cikti: found, unite: u };
    }
    return null;
  },

  yetkinlikBadge(kod) {
    // First try maarif concept system
    const concept = window.H.findConcept(kod);
    if (concept) {
      const cls = window.H.getFamilyClass(concept.family);
      return `<a href="#/kavram/${concept.id}" class="badge ${cls}" style="display:inline-flex;flex-direction:row;width:auto;opacity:1;padding:.2rem .5rem;border-radius:99px;font-size:.75rem;font-weight:600;gap:.3rem;text-decoration:none;background:var(--surface-alt);border:1px solid var(--border);cursor:pointer">${concept.code} ${concept.term}</a>`;
    }
    // Fallback to yetkinlikler dictionary
    const y = this.yetkinlikler[kod];
    if (y) {
      return `<span class="badge fam-model" style="display:inline-flex;flex-direction:row;width:auto;opacity:1;padding:.2rem .5rem;border-radius:99px;font-size:.75rem;font-weight:600;gap:.3rem;background:var(--surface-alt);border:1px solid var(--border)" title="${y.aciklama||''}">${y.kod} ${y.ad}</span>`;
    }
    return `<span style="display:inline-block;padding:.2rem .5rem;border-radius:99px;font-size:.75rem;background:var(--surface-alt);border:1px solid var(--border)">${kod}</span>`;
  },

  olcmeCard(name) {
    const key = name.toLowerCase().replace(/ö/g,'o').replace(/ü/g,'u').replace(/ç/g,'c').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ı/g,'i').replace(/İ/g,'i');
    const tool = OLCME_ARACLARI[key] || null;
    if (tool) {
      return `<div class="card" style="padding:.75rem;display:flex;align-items:flex-start;gap:.5rem">
        <span style="font-size:1.2rem;flex-shrink:0">${tool.icon}</span>
        <div><strong style="font-size:.85rem">${name}</strong>
        <div style="font-size:.78rem;color:var(--text-secondary);margin-top:.15rem">${tool.aciklama}</div>
        <div style="font-size:.75rem;color:var(--text-light);margin-top:.2rem">Süre: ${tool.sure}</div></div></div>`;
    }
    return `<div class="card" style="padding:.75rem;font-size:.85rem">${name}</div>`;
  },

  matTypeLabel(tur) {
    const labels = {
      etkinlik:'Etkinlik', tablo:'Tablo', okuma_metni:'Okuma Metni', gorsel:'Görsel',
      degerlendirme_sorusu:'Değerlendirme Sorusu', bilgilendirme:'Bilgilendirme',
      harita:'Harita', infografik:'İnfografik', video:'Video', kaynak_metin:'Kaynak Metin'
    };
    return labels[tur] || String(tur || '').replace(/_/g,' ');
  },

  matTypeIcon(tur) {
    const icons = { etkinlik:'🎯', tablo:'📊', okuma_metni:'📖', gorsel:'🖼️', degerlendirme_sorusu:'✅', bilgilendirme:'ℹ️', harita:'🗺️', infografik:'📈', video:'🎬', kaynak_metin:'📄' };
    return icons[tur] || '📎';
  },

  /* ============================================================
     HOME - COURSE SELECTION
     ============================================================ */
  renderHome(APP) {
    let cards = '';
    for (const [key, c] of Object.entries(COURSES)) {
      const d = this.data[key];
      const units = d ? d.program.uniteler : [];
      const totalHours = d ? d.meta.toplam_ders_saati : '—';
      cards += `<a href="#/rehber/${key}" class="rehber-ders-card" style="text-decoration:none;color:inherit">
        <div class="ders-header" style="background:linear-gradient(145deg,${c.color},color-mix(in srgb,${c.color} 62%,#000))">
          <span>${c.icon}</span> ${c.name}
        </div>
        <div class="ders-body">
          <div class="card-desc">${c.sinif}. sınıf &bull; ${units.length} ünite &bull; ${totalHours} ders saati</div>
        </div>
        <div class="ders-footer"><span>Anadolu İmam Hatip Lisesi</span><span style="color:var(--primary);font-weight:700">Aç &rarr;</span></div>
      </a>`;
    }

    APP.innerHTML = `
      <div class="rehber-hero">
        <h2>Program Rehberim</h2>
        <p>Öğretmen el kitabı — haftalık planlar, ders akışları, materyaller ve ölçme araçları tek yerde.</p>
      </div>
      <h2 class="section-title"><span class="st-icon">${ICO('book')}</span> Ders Seçin</h2>
      <p class="section-sub">Dört meslek dersi; her biri öğretim programı ve ders kitabıyla eşleştirilmiş.</p>
      <div class="rehber-grid">${cards}</div>`;
  },

  /* ============================================================
     COURSE DASHBOARD
     ============================================================ */
  renderDashboard(APP, dersKey) {
    const c = COURSES[dersKey];
    const d = this.getCourseData(dersKey);
    if (!d) return this.render404(APP);

    const units = this.getUnits(dersKey);
    const weeks = this.getWeeklyPlan(dersKey);
    const curWeek = getCurrentWeek();
    const thisWeek = weeks.find(w => w.hafta === curWeek) || weeks[0];

    // This week card
    let thisWeekHtml = '';
    if (thisWeek) {
      const ciktiTitles = (thisWeek.cikti_kodlari || []).map(kod => {
        const f = this.findCikti(dersKey, kod);
        return f ? f.cikti.baslik : kod;
      }).join('<br>');
      thisWeekHtml = `
        <div class="card" style="border-left:4px solid ${c.color};margin-bottom:1.5rem">
          <div class="card-header"><span style="font-size:1.2rem">📅</span> Bu Hafta (${curWeek}. Hafta)</div>
          <div style="font-size:1.05rem;font-weight:600;margin:.5rem 0">${thisWeek.unite_adi}</div>
          <div class="card-desc">${thisWeek.konu_ozeti}</div>
          <div style="margin-top:.5rem;font-size:.82rem;color:var(--text-secondary)">${ciktiTitles}</div>
          <div style="margin-top:.75rem">
            <a href="#/rehber/${dersKey}/haftalik/${curWeek}" class="btn btn-sm btn-primary">Hafta Detayı &rarr;</a>
          </div>
        </div>`;
    }

    // Quick access
    const quickLinks = [
      { href:`#/rehber/${dersKey}/haftalik`, icon:'calendar', title:'Haftalık Plan' },
      { href:`#/rehber/${dersKey}/kavramlar`, icon:'list', title:'Kavramlar' },
      { href:`#/rehber/${dersKey}/teknikler`, icon:'tool', title:'Teknikler' },
      { href:`#/rehber/${dersKey}/materyaller`, icon:'package', title:'Materyaller' },
      { href:`#/rehber/${dersKey}/kitap/1`, icon:'bookOpen', title:'Kitap (PDF)' },
      { href:`#/rehber/${dersKey}/program/1`, icon:'file', title:'Program (PDF)' }
    ];
    const quickHtml = quickLinks.map(l =>
      `<a href="${l.href}"><span>${ICO(l.icon,20)}</span><span>${l.title}</span></a>`
    ).join('');

    // Unit list
    const totalHours = units.reduce((s,u) => s + (u.ders_saati||0), 0);
    let unitsHtml = units.map((u,i) => {
      const pct = totalHours ? Math.round((u.ders_saati / totalHours) * 100) : 0;
      const ciktiCount = (u.ogrenme_ciktilari || []).length;
      return `<a href="#/rehber/${dersKey}/unite/${u.unite_no}" class="card" style="text-decoration:none;color:inherit;cursor:pointer">
        <div class="card-header">${u.unite_no}. Ünite: ${u.unite_adi}</div>
        <div class="card-desc">${u.ders_saati} saat &bull; ${ciktiCount} öğrenme çıktısı &bull; %${u.yuzde_orani || pct}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${u.yuzde_orani || pct}%"></div></div>
      </a>`;
    }).join('');

    APP.innerHTML = `
      ${this.back('#/rehber', 'Ders Seçimi')}
      <div class="detail-header" style="border-left:4px solid ${c.color}">
        <div class="detail-title">${c.icon} ${c.name}</div>
        <div class="detail-meta">
          <span>${c.sinif}. sınıf</span>
          <span>${d.meta.toplam_ders_saati} saat</span>
          <span>${units.length} ünite</span>
          <span>${d.meta.okul_turu || 'Anadolu İmam Hatip Lisesi'}</span>
        </div>
      </div>
      ${thisWeekHtml}
      <h2 class="section-title"><span class="st-icon">${ICO('rocket')}</span> Hızlı Erişim</h2>
      <div class="rehber-quick">${quickHtml}</div>
      <h2 class="section-title" style="margin-top:1.5rem"><span class="st-icon">${ICO('book')}</span> Üniteler</h2>
      <div class="card-grid">${unitsHtml}</div>`;
  },

  /* ============================================================
     WEEKLY PLAN (ALL WEEKS)
     ============================================================ */
  renderWeeklyPlan(APP, dersKey) {
    const weeks = this.getWeeklyPlan(dersKey);
    if (!weeks.length) {
      APP.innerHTML = `${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
        <div class="empty-state"><span class="es-icon">${ICO('calendar')}</span><p class="es-text">Haftalık plan bulunamadı.</p></div>`;
      return;
    }
    const curWeek = getCurrentWeek();
    let rows = weeks.map(w => {
      const isCurrent = w.hafta === curWeek;
      const bg = isCurrent ? 'background:var(--c-beceri-bg);border-left:4px solid var(--primary)' : '';
      return `<a href="#/rehber/${dersKey}/haftalik/${w.hafta}" class="card" style="text-decoration:none;color:inherit;cursor:pointer;${bg}">
        <div class="card-header">
          ${isCurrent ? '<span style="color:var(--primary);font-weight:800">&#9654;</span>' : ''}
          ${w.hafta}. Hafta &mdash; ${w.unite_adi}
        </div>
        <div class="card-desc">${w.konu_ozeti}</div>
        <div class="card-footer">
          <span>${w.ders_saati} saat</span>
          <span>s.${w.kitap_sayfalari || '—'}</span>
        </div>
      </a>`;
    }).join('');

    APP.innerHTML = `
      ${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
      <h2 class="section-title"><span class="st-icon">${ICO('calendar')}</span> Haftalık Plan</h2>
      <p class="section-sub">Toplam ${weeks.length} öğretim haftası</p>
      <div style="display:flex;flex-direction:column;gap:.75rem">${rows}</div>`;
  },

  /* ============================================================
     WEEK DETAIL
     ============================================================ */
  renderWeekDetail(APP, dersKey, weekNum) {
    const weeks = this.getWeeklyPlan(dersKey);
    const w = weeks.find(wk => wk.hafta === weekNum);
    if (!w) {
      APP.innerHTML = `${this.back('#/rehber/'+dersKey+'/haftalik','Haftalık Plan')}
        <div class="empty-state"><span class="es-icon">${ICO('calendar')}</span><p class="es-text">${weekNum}. hafta bulunamadı.</p></div>`;
      return;
    }

    const prev = weeks.find(wk => wk.hafta === weekNum - 1);
    const next = weeks.find(wk => wk.hafta === weekNum + 1);
    const dateRange = getWeekDateRange(weekNum);

    // Cikti titles
    const ciktiCards = (w.cikti_kodlari || []).map(kod => {
      const f = this.findCikti(dersKey, kod);
      const title = f ? f.cikti.baslik : kod;
      return `<a href="#/rehber/${dersKey}/unite/${w.unite_no}/cikti/${kod}" class="card" style="text-decoration:none;color:inherit;cursor:pointer;padding:.75rem;border-left:3px solid var(--accent)">
        <div style="font-family:var(--mono);font-size:.75rem;color:var(--text-secondary)">${kod}</div>
        <div style="font-weight:600;font-size:.9rem">${title}</div>
        <div style="font-size:.78rem;color:var(--primary);margin-top:.25rem">Ders akışını gör &rarr;</div>
      </a>`;
    }).join('');

    // Techniques
    const techHtml = (w.onerilen_teknikler || []).map(t => {
      const escaped = t.replace(/'/g, "\\'");
      return `<button class="btn btn-sm btn-outline" style="cursor:pointer" onclick="event.preventDefault();Rehber.showTeknikModal('${escaped}',{konu:'${w.konu_ozeti.replace(/'/g, "\\'").substring(0,80)}'})">🛠️ ${t}</button>`;
    }).join(' ');

    // Materials checklist from hazirlik_notu
    const hazirlik = w.hazirlik_notu || '';

    APP.innerHTML = `
      ${this.back('#/rehber/'+dersKey+'/haftalik','Haftalık Plan')}
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        ${prev ? `<a href="#/rehber/${dersKey}/haftalik/${prev.hafta}" class="btn btn-sm btn-outline">&larr; ${prev.hafta}. Hafta</a>` : '<span></span>'}
        <span style="font-size:.85rem;color:var(--text-secondary)">${dateRange}</span>
        ${next ? `<a href="#/rehber/${dersKey}/haftalik/${next.hafta}" class="btn btn-sm btn-outline">${next.hafta}. Hafta &rarr;</a>` : '<span></span>'}
      </div>

      <div class="detail-header">
        <div style="font-size:.85rem;color:var(--text-secondary)">${weekNum}. Öğretim Haftası</div>
        <div class="detail-title">${w.unite_adi}</div>
        <div style="font-size:1.05rem;margin-top:.5rem;line-height:1.6">${w.konu_ozeti}</div>
      </div>

      <div class="card" style="margin-bottom:1rem">
        <div class="card-header"><span>📖</span> Öğrenme Çıktıları</div>
        <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem">${ciktiCards}</div>
      </div>

      ${techHtml ? `<div class="card" style="margin-bottom:1rem">
        <div class="card-header"><span>🛠️</span> Onerilen Teknikler</div>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem">${techHtml}</div>
      </div>` : ''}

      <div class="card" style="margin-bottom:1rem">
        <div class="card-header"><span>📖</span> Kitap Sayfalari</div>
        <div style="margin-top:.5rem">
          <a href="#/rehber/${dersKey}/kitap/${parseInt(w.kitap_sayfalari)||1}" class="btn btn-sm btn-primary">Sayfa ${w.kitap_sayfalari} &rarr;</a>
        </div>
      </div>

      ${hazirlik ? `<div class="card" style="border-left:4px solid var(--warning)">
        <div class="card-header"><span>📋</span> Hazirlik Notu</div>
        <div class="card-desc">${hazirlik}</div>
      </div>` : ''}`;
  },

  /* ============================================================
     UNITE DETAIL
     ============================================================ */
  renderUniteDetail(APP, dersKey, uniteNo) {
    const units = this.getUnits(dersKey);
    const u = units.find(x => x.unite_no === uniteNo);
    if (!u) {
      APP.innerHTML = `${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
        <div class="empty-state"><span class="es-icon">${ICO('book')}</span><p class="es-text">Ünite bulunamadı.</p></div>`;
      return;
    }

    const ciktiList = (u.ogrenme_ciktilari || []).map(oc =>
      `<a href="#/rehber/${dersKey}/unite/${uniteNo}/cikti/${oc.kod}" class="card" style="text-decoration:none;color:inherit;cursor:pointer;padding:.75rem;border-left:3px solid var(--primary)">
        <div style="font-family:var(--mono);font-size:.75rem;color:var(--text-secondary)">${oc.kod}</div>
        <div style="font-weight:600;font-size:.9rem;margin-top:.2rem">${oc.baslik}</div>
        <div style="font-size:.78rem;color:var(--primary);margin-top:.25rem">Ders akışı &rarr;</div>
      </a>`
    ).join('');

    // Kavramlar
    const kavramlar = (u.anahtar_kavramlar || []).map(k =>
      `<span class="related-chip">${k}</span>`
    ).join('');

    // Beceriler
    const beceriler = [...(u.alan_becerileri||[]), ...(u.kavramsal_beceriler||[]), ...(u.egilimler||[])].map(b =>
      this.yetkinlikBadge(b.kod)
    ).join(' ');

    APP.innerHTML = `
      ${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
      <div class="detail-header">
        <div style="font-size:.85rem;color:var(--text-secondary)">${uniteNo}. Ünite</div>
        <div class="detail-title">${u.unite_adi}</div>
        <div class="detail-desc">${u.unite_aciklamasi || ''}</div>
        <div class="detail-meta" style="margin-top:.75rem">
          <span>${u.ders_saati} ders saati</span>
          <span>%${u.yuzde_orani || '—'}</span>
          <span>${(u.ogrenme_ciktilari||[]).length} öğrenme çıktısı</span>
        </div>
      </div>

      <h3 class="section-title"><span class="st-icon">${ICO('target')}</span> Öğrenme Çıktıları</h3>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.5rem">${ciktiList}</div>

      ${kavramlar ? `<div class="detail-section"><h3>📝 Anahtar Kavramlar</h3><div class="related-grid">${kavramlar}</div></div>` : ''}

      ${beceriler ? `<div class="detail-section"><h3>🧠 İlişkili Beceriler ve Eğilimler</h3><div style="display:flex;flex-wrap:wrap;gap:.4rem">${beceriler}</div></div>` : ''}`;
  },

  /* ============================================================
     LESSON FLOW (MOST IMPORTANT PAGE)
     ============================================================ */
  renderLessonFlow(APP, dersKey, uniteNo, ciktiKod) {
    const result = this.findUygulama(dersKey, ciktiKod);
    const ciktiResult = this.findCikti(dersKey, ciktiKod);
    if (!result || !ciktiResult) {
      APP.innerHTML = `${this.back('#/rehber/'+dersKey+'/unite/'+uniteNo, 'Ünite')}
        <div class="empty-state"><span class="es-icon">${ICO('list')}</span><p class="es-text">Çıktı bulunamadı: ${ciktiKod}</p></div>`;
      return;
    }

    const { uygulama: uyg, unite: u } = result;
    const { cikti } = ciktiResult;
    const ck = this.getCiktiKitap(dersKey);
    const kitapInfo = ck.find(e => e.cikti_kodu === ciktiKod);
    const bookPages = kitapInfo ? kitapInfo.kitap_sayfa_araligi : '';
    const relatedMats = kitapInfo ? (kitapInfo.iliskili_materyaller || []) : [];
    const allMats = this.getMaterials(dersKey);

    // Surec bilesenleri
    const surecHtml = (cikti.surec_bilesenleri || []).map((sb, i) =>
      `<li><span class="step-num">${sb.harf}</span><span>${sb.metin}</span></li>`
    ).join('');

    // Techniques with nerede
    const techCards = (uyg.kullanilan_teknikler || []).map(t => {
      const escaped = t.ad.replace(/'/g, "\\'");
      const neredeEsc = (t.nerede || '').replace(/'/g, "\\'");
      const found = this.findTeknik(t.ad);
      const teknikData = found?.teknik;
      return `<div class="card" style="padding:.75rem;border-left:3px solid var(--accent);cursor:pointer" onclick="Rehber.showTeknikModal('${escaped}',{nerede:'${neredeEsc}',konu:'${(cikti.baslik||'').replace(/'/g, "\\'").substring(0,80)}'})">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="font-weight:600;font-size:.9rem">🛠️ ${t.ad}</div>
          ${teknikData?.sure_tahmini ? `<span style="font-size:.75rem;color:var(--text-secondary)">⏱ ${teknikData.sure_tahmini}</span>` : ''}
        </div>
        ${t.nerede ? `<div style="font-size:.82rem;color:var(--warning);margin-top:.25rem">📍 Nerede: ${t.nerede}</div>` : ''}
        ${teknikData?.aciklama ? `<div style="font-size:.8rem;color:var(--text-secondary);margin-top:.3rem;line-height:1.4">${teknikData.aciklama.substring(0,120)}${teknikData.aciklama.length > 120 ? '...' : ''}</div>` : ''}
        <div style="font-size:.75rem;color:var(--primary);margin-top:.3rem">Detayli bilgi icin tiklayin →</div>
      </div>`;
    }).join('');

    // Iliskilendirilen kodlar
    const iliskiBadges = (uyg.iliskilendirilen_kodlar || []).map(kod => this.yetkinlikBadge(kod)).join(' ');

    // Olcme araclari
    const olcmeHtml = (uyg.olcme_onerileri || []).map(name => this.olcmeCard(name)).join('');

    // Performans gorevi
    const perfGorevi = u.ogrenme_kanitlari && u.ogrenme_kanitlari.performans_gorevi;
    let perfHtml = '';
    if (perfGorevi) {
      perfHtml = `<div class="card" style="padding:.75rem;border-left:3px solid var(--success)">
        <div style="font-weight:600;font-size:.9rem">🏆 Performans Görevi</div>
        <div style="font-size:.85rem;margin-top:.3rem">${perfGorevi.aciklama}</div>
        ${perfGorevi.degerlendirme_olcutleri ? `<div style="margin-top:.3rem;font-size:.78rem;color:var(--text-secondary)">Ölçütler: ${perfGorevi.degerlendirme_olcutleri.join(', ')}</div>` : ''}
      </div>`;
    }

    // Material mini-cards
    const matCards = relatedMats.map(matId => {
      const mat = allMats.find(m => m.id === matId);
      if (!mat) return '';
      return `<a href="#/rehber/${dersKey}/kitap/${mat.sayfa}" class="card" style="text-decoration:none;color:inherit;cursor:pointer;padding:.6rem;display:flex;align-items:center;gap:.5rem">
        <span style="font-size:1.2rem">${this.matTypeIcon(mat.tur)}</span>
        <div>
          <div style="font-size:.82rem;font-weight:600">${mat.baslik}</div>
          <div style="font-size:.72rem;color:var(--text-secondary)">s.${mat.sayfa} &bull; ${this.matTypeLabel(mat.tur)}</div>
        </div>
      </a>`;
    }).join('');

    // Farklilarstirma
    const fark = u.farklilarstirma || {};
    const zengin = (fark.zenginlestirme || []).map(z => `<li style="font-size:.85rem;margin-bottom:.4rem;line-height:1.5">${z}</li>`).join('');
    const destek = (fark.destekleme || []).map(d => `<li style="font-size:.85rem;margin-bottom:.4rem;line-height:1.5">${d}</li>`).join('');

    // Temel kabuller, kopru kurma, on degerlendirme
    const yasantilar = u.ogrenme_ogretme_yasantilari || {};

    APP.innerHTML = `
      ${this.back('#/rehber/'+dersKey+'/unite/'+uniteNo, u.unite_adi)}

      <div class="detail-header">
        <div class="detail-badges" style="display:flex;gap:.4rem;flex-wrap:wrap;align-items:center;margin-bottom:.5rem">
          <span class="detail-badge" style="background:var(--c-beceri-bg);color:var(--c-beceri)">${u.unite_no}. Ünite</span>
          <span class="detail-badge badge-code" style="background:var(--surface-alt)">${ciktiKod}</span>
        </div>
        <div class="detail-title" style="font-size:1.3rem">${cikti.baslik}</div>
        ${bookPages ? `<div style="margin-top:.5rem"><a href="#/rehber/${dersKey}/kitap/${parseInt(bookPages)}" class="btn btn-sm btn-outline">📖 Kitap s.${bookPages}</a></div>` : ''}
      </div>

      <!-- 1. DERS ONCESI -->
      ${this._accordion('ders-oncesi', '📋 DERS ÖNCESİ', true, `
        ${yasantilar.temel_kabuller ? `<div style="margin-bottom:.75rem"><strong style="font-size:.85rem">Temel Kabuller:</strong><div style="font-size:.85rem;line-height:1.6;margin-top:.3rem;color:var(--text-secondary)">${yasantilar.temel_kabuller}</div></div>` : ''}
        ${(yasantilar.on_degerlendirme||[]).length ? `<div style="margin-bottom:.75rem"><strong style="font-size:.85rem">Ön Değerlendirme Soruları:</strong><ul style="margin-top:.3rem;padding-left:1.2rem">${yasantilar.on_degerlendirme.map(q=>`<li style="font-size:.85rem;margin-bottom:.3rem;line-height:1.5">${q}</li>`).join('')}</ul></div>` : ''}
        ${w_hazirlikNotu(dersKey, ciktiKod, this)}
        ${bookPages ? `<div style="margin-top:.5rem"><a href="#/rehber/${dersKey}/kitap/${parseInt(bookPages)}" class="btn btn-sm btn-primary">📖 Kitap s.${bookPages} ac</a></div>` : ''}
      `)}

      <!-- 2. GIRIS / ISINMA -->
      ${this._accordion('giris', '🔔 GİRİŞ / ISINMA', false, `
        ${yasantilar.kopru_kurma ? `<div style="margin-bottom:.75rem"><strong style="font-size:.85rem">Kopru Kurma:</strong><div style="font-size:.85rem;line-height:1.6;margin-top:.3rem">${yasantilar.kopru_kurma}</div></div>` : ''}
      `)}

      <!-- 3. OGRETIM -->
      ${this._accordion('ogretim', '📖 ÖĞRETİM', true, `
        ${surecHtml ? `<div style="margin-bottom:1rem"><strong style="font-size:.85rem">Süreç Bileşenleri:</strong><ul class="edu-list" style="margin-top:.5rem">${surecHtml}</ul></div>` : ''}
        <div style="margin-bottom:1rem"><strong style="font-size:.85rem">Uygulama Metni:</strong><div style="font-size:.85rem;line-height:1.7;margin-top:.3rem;background:var(--surface-alt);padding:.75rem;border-radius:var(--radius-sm)">${uyg.uygulama_metni}</div></div>
        ${techCards ? `<div style="margin-bottom:1rem"><strong style="font-size:.85rem">Kullanilan Teknikler:</strong><div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem">${techCards}</div></div>` : ''}
        ${matCards ? `<div><strong style="font-size:.85rem">Ilgili Materyaller:</strong><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.5rem;margin-top:.5rem">${matCards}</div></div>` : ''}
      `)}

      <!-- 4. UYGULAMA -->
      ${this._accordion('uygulama', '🎯 UYGULAMA', false, `
        ${iliskiBadges ? `<div style="margin-bottom:.75rem"><strong style="font-size:.85rem">Iliskilendirilen Yetkinlikler:</strong><div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem">${iliskiBadges}</div></div>` : ''}
      `)}

      <!-- 5. OLCME -->
      ${this._accordion('olcme', '📊 ÖLÇME', false, `
        ${olcmeHtml ? `<div style="margin-bottom:.75rem"><strong style="font-size:.85rem">Ölçme Araçları:</strong><div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem">${olcmeHtml}</div></div>` : ''}
        ${perfHtml}
      `)}

      <!-- 6. KAPANIS -->
      ${this._accordion('kapanis', '🚀 KAPANIŞ', false, `
        ${zengin ? `<div style="margin-bottom:.75rem"><strong style="font-size:.85rem">Zenginlestirme:</strong><ul style="padding-left:1.2rem;margin-top:.3rem">${zengin}</ul></div>` : ''}
        ${destek ? `<div><strong style="font-size:.85rem">Destekleme:</strong><ul style="padding-left:1.2rem;margin-top:.3rem">${destek}</ul></div>` : ''}
      `)}
    `;

    // Bind accordion toggles
    APP.querySelectorAll('[data-accordion-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-accordion-toggle');
        const body = APP.querySelector(`[data-accordion-body="${target}"]`);
        const arrow = btn.querySelector('.acc-arrow');
        if (body.style.display === 'none') {
          body.style.display = 'block';
          if (arrow) arrow.textContent = '▼';
        } else {
          body.style.display = 'none';
          if (arrow) arrow.textContent = '▸';
        }
      });
    });
  },

  _accordion(id, title, expanded, content) {
    return `<div class="detail-section" style="margin-bottom:.75rem">
      <div data-accordion-toggle="${id}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;user-select:none">
        <h3 style="margin:0;font-size:1rem;font-weight:700">${title}</h3>
        <span class="acc-arrow" style="font-size:.8rem;color:var(--text-secondary)">${expanded ? '▼' : '▸'}</span>
      </div>
      <div data-accordion-body="${id}" style="display:${expanded ? 'block' : 'none'};margin-top:.75rem">${content}</div>
    </div>`;
  },

  /* ============================================================
     MATERYALLER
     ============================================================ */
  renderMateryaller(APP, dersKey) {
    const mats = this.getMaterials(dersKey);
    if (!mats.length) {
      APP.innerHTML = `${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
        <div class="empty-state"><span class="es-icon">${ICO('package')}</span><p class="es-text">Materyal bulunamadı.</p></div>`;
      return;
    }

    // Collect types
    const types = [...new Set(mats.map(m => m.tur))];
    const allFilter = 'tumu';

    let filterHtml = `<div class="tabs" id="matFilterTabs">
      <button class="tab active" data-filter="${allFilter}">Tümü (${mats.length})</button>
      ${types.map(t => {
        const count = mats.filter(m => m.tur === t).length;
        return `<button class="tab" data-filter="${t}">${this.matTypeIcon(t)} ${this.matTypeLabel(t)} (${count})</button>`;
      }).join('')}
    </div>`;

    const matCards = mats.map(m =>
      `<a href="#/rehber/${dersKey}/kitap/${m.sayfa}" class="card mat-card" data-type="${m.tur}" style="text-decoration:none;color:inherit;cursor:pointer;padding:.75rem;display:flex;align-items:flex-start;gap:.6rem">
        <span style="font-size:1.5rem;flex-shrink:0">${this.matTypeIcon(m.tur)}</span>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:.9rem">${m.baslik}</div>
          <div style="display:flex;gap:.5rem;margin-top:.3rem;flex-wrap:wrap">
            <span style="font-size:.72rem;padding:.15rem .4rem;background:var(--surface-alt);border-radius:3px">${this.matTypeLabel(m.tur)}</span>
            <span style="font-size:.72rem;color:var(--text-secondary)">s.${m.sayfa}</span>
          </div>
          ${m.aciklama ? `<div style="font-size:.8rem;color:var(--text-secondary);margin-top:.25rem;line-height:1.4">${m.aciklama}</div>` : ''}
        </div>
      </a>`
    ).join('');

    APP.innerHTML = `
      ${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
      <h2 class="section-title"><span class="st-icon">${ICO('package')}</span> Materyaller</h2>
      <p class="section-sub">Toplam ${mats.length} materyal. Tıklayın, ilgili kitap sayfası açılsın.</p>
      ${filterHtml}
      <div class="card-grid" id="matGrid">${matCards}</div>`;

    // Filter logic
    APP.querySelectorAll('#matFilterTabs .tab').forEach(btn => {
      btn.addEventListener('click', () => {
        APP.querySelectorAll('#matFilterTabs .tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.getAttribute('data-filter');
        APP.querySelectorAll('.mat-card').forEach(card => {
          card.style.display = (f === allFilter || card.getAttribute('data-type') === f) ? '' : 'none';
        });
      });
    });
  },

  /* ============================================================
     KAVRAMLAR
     ============================================================ */
  renderKavramlar(APP, dersKey) {
    const units = this.getUnits(dersKey);
    let allKavramlar = [];
    units.forEach(u => {
      (u.anahtar_kavramlar || []).forEach(k => {
        allKavramlar.push({ kavram: k, unite_no: u.unite_no, unite_adi: u.unite_adi });
      });
    });

    if (!allKavramlar.length) {
      APP.innerHTML = `${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
        <div class="empty-state"><span class="es-icon">${ICO('list')}</span><p class="es-text">Kavram bulunamadı.</p></div>`;
      return;
    }

    const searchHtml = `<div class="search-box"><input type="text" id="kavramSearch" placeholder="Kavram ara..."></div>`;

    const uniteTabs = `<div class="tabs" id="kavramTabs">
      <button class="tab active" data-unite="0">Tümü (${allKavramlar.length})</button>
      ${units.map(u => {
        const count = (u.anahtar_kavramlar||[]).length;
        return `<button class="tab" data-unite="${u.unite_no}">${u.unite_no}. Unite (${count})</button>`;
      }).join('')}
    </div>`;

    const kavramCards = allKavramlar.map(k => {
      // Check if concept exists in Maarif
      const concept = window.H.findConcept(k.kavram);
      const link = concept ? `href="#/kavram/${concept.id}"` : '';
      return `<div class="card kavram-card" data-unite="${k.unite_no}" data-kavram="${k.kavram.toLowerCase()}" style="padding:.75rem;cursor:${concept?'pointer':'default'}">
        <div style="font-weight:600;font-size:.95rem" ${link ? `onclick="location.hash='#/kavram/${concept.id}'"` : ''}>${k.kavram}</div>
        <div style="font-size:.78rem;color:var(--text-secondary);margin-top:.2rem">${k.unite_no}. Ünite: ${k.unite_adi}</div>
        ${concept ? '<div style="font-size:.72rem;color:var(--primary);margin-top:.15rem">Maarif kavramina git &rarr;</div>' : ''}
      </div>`;
    }).join('');

    APP.innerHTML = `
      ${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
      <h2 class="section-title"><span class="st-icon">${ICO('list')}</span> Kavram Sözlüğü</h2>
      ${searchHtml}${uniteTabs}
      <div class="card-grid" id="kavramGrid">${kavramCards}</div>`;

    // Search + filter
    const filterKavramlar = () => {
      const query = (APP.querySelector('#kavramSearch').value || '').toLowerCase();
      const uniteFilter = parseInt(APP.querySelector('#kavramTabs .tab.active')?.getAttribute('data-unite')) || 0;
      APP.querySelectorAll('.kavram-card').forEach(card => {
        const matchSearch = !query || card.getAttribute('data-kavram').includes(query);
        const matchUnite = !uniteFilter || parseInt(card.getAttribute('data-unite')) === uniteFilter;
        card.style.display = (matchSearch && matchUnite) ? '' : 'none';
      });
    };

    APP.querySelector('#kavramSearch').addEventListener('input', filterKavramlar);
    APP.querySelectorAll('#kavramTabs .tab').forEach(btn => {
      btn.addEventListener('click', () => {
        APP.querySelectorAll('#kavramTabs .tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterKavramlar();
      });
    });
  },

  /* ============================================================
     TEKNIKLER
     ============================================================ */
  renderTeknikler(APP, dersKey) {
    const units = this.getUnits(dersKey);
    const techMap = {};

    units.forEach(u => {
      if (!u.ogrenme_ogretme_yasantilari) return;
      (u.ogrenme_ogretme_yasantilari.uygulamalar || []).forEach(uyg => {
        (uyg.kullanilan_teknikler || []).forEach(t => {
          const key = t.ad.toLowerCase();
          if (!techMap[key]) {
            techMap[key] = { ad: t.ad, kullanim: [] };
          }
          techMap[key].kullanim.push({
            cikti_kodu: uyg.cikti_kodu,
            nerede: t.nerede,
            unite_no: u.unite_no,
            unite_adi: u.unite_adi
          });
        });
      });
    });

    const techs = Object.values(techMap).sort((a,b) => b.kullanim.length - a.kullanim.length);

    if (!techs.length) {
      APP.innerHTML = `${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
        <div class="empty-state"><span class="es-icon">${ICO('tool')}</span><p class="es-text">Teknik bulunamadı.</p></div>`;
      return;
    }

    let currentOpen = null;

    // Teknik kutuphanesinden detaylari al
    const teknikLib = this.getTeknikKutuphanesi(dersKey);

    const techCards = techs.map((t, i) => {
      const libEntry = teknikLib.find(tk => tk.ad.toLowerCase() === t.ad.toLowerCase());
      const usages = t.kullanim.map(k =>
        `<div style="display:flex;align-items:flex-start;gap:.5rem;font-size:.82rem;padding:.4rem 0;border-bottom:1px solid var(--border)">
          <a href="#/rehber/${dersKey}/unite/${k.unite_no}/cikti/${k.cikti_kodu}" style="font-family:var(--mono);font-size:.72rem;color:var(--primary);white-space:nowrap">${k.cikti_kodu}</a>
          <span style="color:var(--text-secondary)">${k.nerede ? '📍 ' + k.nerede : k.unite_adi}</span>
        </div>`
      ).join('');
      // Nasil uygulanir adimlari
      let adimlarHtml = '';
      if (libEntry?.nasil_uygulanir) {
        const lines = libEntry.nasil_uygulanir.split(/\d+[\.\)]\s*/).filter(Boolean);
        adimlarHtml = `<div style="margin-top:.5rem"><strong style="font-size:.82rem">📋 Nasil Uygulanir:</strong>
          <ol style="margin:.3rem 0 0;padding-left:1.1rem;font-size:.82rem;line-height:1.6">${lines.map(l => `<li>${l.trim()}</li>`).join('')}</ol></div>`;
      }
      return `<div class="card" style="padding:.75rem">
        <div data-tech-toggle="${i}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between">
          <div><span style="font-size:1.1rem;margin-right:.4rem">🛠️</span><strong>${t.ad}</strong>
            <span style="font-size:.75rem;background:var(--surface-alt);padding:.15rem .4rem;border-radius:99px;margin-left:.4rem">${t.kullanim.length}x</span>
            ${libEntry?.sure_tahmini ? `<span style="font-size:.72rem;color:var(--text-secondary);margin-left:.3rem">⏱ ${libEntry.sure_tahmini}</span>` : ''}
          </div>
          <span class="tech-arrow" style="font-size:.8rem;color:var(--text-secondary)">▸</span>
        </div>
        ${libEntry?.aciklama ? `<div style="font-size:.82rem;color:var(--text-secondary);margin-top:.4rem;line-height:1.5">${libEntry.aciklama}</div>` : ''}
        <div data-tech-body="${i}" style="display:none;margin-top:.75rem">
          ${adimlarHtml}
          ${libEntry?.uygun_oldugu_durumlar ? `<div style="margin-top:.5rem;font-size:.82rem"><strong>🎯 Uygun Durumlar:</strong> ${libEntry.uygun_oldugu_durumlar}</div>` : ''}
          ${libEntry?.gerekli_materyal ? `<div style="margin-top:.3rem;font-size:.82rem"><strong>📦 Materyal:</strong> ${libEntry.gerekli_materyal}</div>` : ''}
          <div style="margin-top:.5rem"><strong style="font-size:.82rem">📍 Kullanıldığı Yerler:</strong></div>
          ${usages}
        </div>
      </div>`;
    }).join('');

    APP.innerHTML = `
      ${this.back('#/rehber/'+dersKey, this.courseTitle(dersKey))}
      <h2 class="section-title"><span class="st-icon">${ICO('tool')}</span> Teknikler Kütüphanesi</h2>
      <p class="section-sub">${techs.length} farklı teknik, toplam ${techs.reduce((s,t)=>s+t.kullanim.length,0)} kullanım</p>
      <div style="display:flex;flex-direction:column;gap:.5rem">${techCards}</div>`;

    APP.querySelectorAll('[data-tech-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-tech-toggle');
        const body = APP.querySelector(`[data-tech-body="${idx}"]`);
        const arrow = btn.querySelector('.tech-arrow');
        if (body.style.display === 'none') {
          body.style.display = 'block';
          if (arrow) arrow.textContent = '▼';
        } else {
          body.style.display = 'none';
          if (arrow) arrow.textContent = '▸';
        }
      });
    });
  },

  /* ============================================================
     SAYFA GORUNTULEME — JPEG sayfa resimleri (PDF.js yok!)
     Her sayfa ~70KB, aninda yuklenir
     ============================================================ */

  // Sayfa sayilari (onceden biliniyor)
  _pageCounts: {
    FKH_10_kitap: 185, FKH_10_program: 30,
    HDS_10_kitap: 160, HDS_10_program: 30,
    SYR_10_kitap: 176, SYR_10_program: 35,
    TDB_9_kitap: 172, TDB_9_program: 31,
    ortak_metin: 158
  },

  renderPdf(APP, dersKey, type, pageNum) {
    const backHref = dersKey ? `#/rehber/${dersKey}` : '#/rehber';
    const backLabel = dersKey ? this.courseTitle(dersKey) : 'Rehber';
    const title = type === 'ortak_metin' ? 'Ortak Metin' : type === 'kitap' ? 'Ders Kitabı' : 'Öğretim Programı';

    // Dizin adi
    let folderName = '';
    let pdfPath = '';
    if (type === 'ortak_metin') {
      folderName = 'ortak_metin';
      pdfPath = 'pdfs/ortak_metin.pdf';
    } else if (dersKey) {
      const c = COURSES[dersKey];
      const subtype = type === 'kitap' ? 'kitap' : 'program';
      folderName = `${c.code}_${c.sinif}_${subtype}`;
      pdfPath = `pdfs/${folderName}.pdf`;
    }

    const totalPages = this._pageCounts[folderName] || 100;
    let currentPage = Math.min(Math.max(1, parseInt(pageNum) || 1), totalPages);

    const updatePage = (num) => {
      currentPage = Math.min(Math.max(1, num), totalPages);
      const img = document.getElementById('pageImg');
      const info = document.getElementById('pageInfo');
      const input = document.getElementById('pageInput');
      if (img) {
        img.style.opacity = '0.4';
        img.src = `pages/${folderName}/${currentPage}.jpg`;
        img.onload = () => { img.style.opacity = '1'; };
        img.onerror = () => { img.alt = 'Sayfa yuklenemedi'; img.style.opacity = '1'; };
      }
      if (info) info.textContent = `${currentPage} / ${totalPages}`;
      if (input) input.value = currentPage;
      document.getElementById('pgPrev').disabled = currentPage <= 1;
      document.getElementById('pgNext').disabled = currentPage >= totalPages;
      const hashBase = type === 'ortak_metin' ? '#/rehber/ortak-metin' : `#/rehber/${dersKey}/${type}`;
      history.replaceState(null, '', hashBase + '/' + currentPage);
    };

    APP.innerHTML = `
      ${this.back(backHref, backLabel)}
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-bottom:.75rem">
        <h2 style="font-size:1.1rem;font-weight:700">${title}</h2>
        <a href="${pdfPath}" download class="btn btn-sm btn-outline">⬇️ PDF Indir</a>
      </div>
      <div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.75rem;flex-wrap:wrap">
        <button class="btn btn-sm btn-outline" id="pgPrev">◀</button>
        <span id="pageInfo" style="font-size:.85rem;min-width:80px;text-align:center">${currentPage} / ${totalPages}</span>
        <button class="btn btn-sm btn-outline" id="pgNext">▶</button>
        <span style="flex:1"></span>
        <input type="number" id="pageInput" value="${currentPage}" min="1" max="${totalPages}" style="width:55px;padding:.3rem;border:1px solid var(--border);border-radius:var(--radius-sm);text-align:center;font-size:.85rem">
        <button class="btn btn-sm btn-primary" id="pgGo">Git</button>
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;text-align:center;min-height:200px">
        <img id="pageImg" src="pages/${folderName}/${currentPage}.jpg" alt="Sayfa ${currentPage}"
          style="max-width:100%;height:auto;transition:opacity .2s"
          loading="eager">
      </div>`;

    // Navigasyon
    document.getElementById('pgPrev')?.addEventListener('click', () => updatePage(currentPage - 1));
    document.getElementById('pgNext')?.addEventListener('click', () => updatePage(currentPage + 1));
    document.getElementById('pgGo')?.addEventListener('click', () => {
      updatePage(parseInt(document.getElementById('pageInput')?.value) || 1);
    });
    document.getElementById('pageInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('pgGo')?.click();
    });

    // Klavye navigasyonu
    const keyHandler = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') updatePage(currentPage - 1);
      if (e.key === 'ArrowRight') updatePage(currentPage + 1);
    };
    document.addEventListener('keydown', keyHandler);
    const cleanup = setInterval(() => {
      if (!document.getElementById('pageImg')) {
        document.removeEventListener('keydown', keyHandler);
        clearInterval(cleanup);
      }
    }, 1000);

    // Swipe desteği (mobil)
    let touchStartX = 0;
    const imgEl = document.getElementById('pageImg');
    if (imgEl) {
      imgEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
      imgEl.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) updatePage(currentPage - 1); // saga kaydirma = onceki
          else updatePage(currentPage + 1); // sola kaydirma = sonraki
        }
      }, { passive: true });
    }
  },

  /* ============================================================
     404
     ============================================================ */
  render404(APP) {
    APP.innerHTML = `
      ${this.back('#/rehber','Rehber')}
      <div class="empty-state">
        <span class="es-icon">${ICO('search')}</span>
        <p class="es-text">Sayfa bulunamadı. <a href="#/rehber">Rehber ana sayfasina don</a></p>
      </div>`;
  }
};

/* Hazirlik notu helper: finds from weekly plan */
function w_hazirlikNotu(dersKey, ciktiKod, self) {
  const weeks = self.getWeeklyPlan(dersKey);
  const matching = weeks.filter(w => (w.cikti_kodlari || []).includes(ciktiKod));
  if (!matching.length) return '';
  const notes = matching.filter(w => w.hazirlik_notu).map(w =>
    `<li style="font-size:.85rem;margin-bottom:.3rem"><strong>${w.hafta}. Hafta:</strong> ${w.hazirlik_notu}</li>`
  );
  if (!notes.length) return '';
  return `<div style="margin-bottom:.75rem"><strong style="font-size:.85rem">Hazirlik Notlari:</strong><ul style="margin-top:.3rem;padding-left:1.2rem">${notes.join('')}</ul></div>`;
}

// Expose globally
window.Rehber = Rehber;
})();
