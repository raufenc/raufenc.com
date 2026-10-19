// AR-GE çalışmaları, eTwinning, TÜBİTAK, Öğretmen Akademileri, Dijital Kütüphane, Doküman Merkezi
import { icons, h, raw, el, esc, fmtDate, kalanGun, toast, empty, sheet, share } from '../ui.js';
import { store, admin } from '../backend.js';
import { listRow } from '../components.js';
import { deadlineHtml, downloadIcs } from './home.js';

export async function arge(ctx) {
  ctx.title('AR-GE Çalışmaları');
  const c = store.content; let tab = ctx.query.t || 'devam';
  const b = c.projeBasvuru || {};
  ctx.root.innerHTML = `<div class="seg">${[['devam', 'Devam eden'], ['tamamlanan', 'Tamamlanan'], ['basvuru', 'Başvuru'], ['rapor', 'Sonuç raporları']].map(([k, v]) => `<button data-t="${k}" class="${k === tab ? 'on' : ''}">${v}</button>`).join('')}</div><div id="body"></div>`;
  const body = ctx.root.querySelector('#body');
  const render = () => {
    const list = (c.projeler || []).filter(p => p.durum === (tab === 'rapor' ? 'tamamlanan' : tab));
    if (tab === 'basvuru') {
      body.innerHTML = `<div class="card pad"><h2 style="font-size:16px;margin:0 0 6px">İl düzeyi AR-GE proje başvurusu</h2><p style="font-size:13.5px;color:var(--text-2);margin:0 0 8px">${esc(b.aciklama || '')}</p>${b.sonTarih ? deadlineHtml(b.sonTarih) : ''}
        ${b.acik ? `<form id="bf" style="margin-top:14px">
          <label class="field"><span>Proje adı</span><input name="ad" required maxlength="120"></label>
          <label class="field"><span>Alan</span><select name="alan">${(b.alanlar || []).map(a => `<option>${esc(a)}</option>`).join('')}</select></label>
          <label class="field"><span>Okul / kurum</span><input name="okul" required maxlength="120" value="${esc(store.user?.okul || '')}"></label>
          <label class="field"><span>İlçe</span><select name="ilce">${(c.ilceler || []).map(i => `<option ${store.user?.ilce === i.ad ? 'selected' : ''}>${esc(i.ad)}</option>`).join('')}</select></label>
          <label class="field"><span>Proje özeti (amaç, hedef kitle, yöntem)</span><textarea name="ozet" required maxlength="2000"></textarea></label>
          <label class="field"><span>Başvuru sahibi</span><input name="kisi" required maxlength="80" value="${esc(store.user?.ad || '')}"></label>
          <label class="field"><span>İletişim e-postası</span><input name="eposta" type="email" required maxlength="120" value="${esc(store.user?.eposta || '')}"></label>
          <button class="btn primary block" type="submit">${icons.send} Başvuruyu gönder</button>
          <p style="font-size:11.5px;color:var(--muted);margin:10px 0 0">Başvurunuz AR-GE Birimine iletilir; ilçe AR-GE sorumlusu sizinle iletişime geçer.</p></form>` : '<div class="notice warn">Başvurular şu anda kapalı.</div>'}</div>
        <h2 style="font-size:15px;margin:16px 0 8px">Başvurularım</h2><div class="card" id="mine"></div>`;
      const mine = (c.basvurular || []).filter(x => x.uid === store.user?.uid);
      body.querySelector('#mine').innerHTML = mine.map(x => h`<div class="row"><span class="ic">${raw(icons.flask)}</span><span class="tx"><b>${x.ad}</b><span>${x.alan} · ${fmtDate(x.tarih)}</span></span><span class="chip ${x.durum === 'onaylandi' ? 'teal' : x.durum === 'reddedildi' ? 'meb' : 'amber'}">${x.durum === 'onaylandi' ? 'Onaylandı' : x.durum === 'reddedildi' ? 'Değerlendirildi' : 'İnceleniyor'}</span></div>`).join('') || empty('Henüz başvurunuz yok', 'flask');
      body.querySelector('#bf')?.addEventListener('submit', async (e) => {
        e.preventDefault(); if (!store.user) return toast('Başvuru için giriş yapın');
        const f = Object.fromEntries(new FormData(e.target).entries());
        await admin.append('basvurular', { id: 'bv' + Date.now(), uid: store.user.uid, tarih: new Date().toISOString(), durum: 'inceleniyor', ...f });
        toast('Başvurunuz alındı'); c.basvurular = store.content.basvurular; render();
      });
      return;
    }
    body.innerHTML = `<div class="card-list">${list.map(p => h`<a class="card pad tap" href="#/arge/${p.id}"><div class="pill-row" style="margin-bottom:6px"><span class="chip ${p.durum === 'devam' ? 'navy' : 'teal'}">${p.durum === 'devam' ? 'Devam ediyor' : 'Tamamlandı'}</span><span class="chip">${p.alan}</span></div>
      <h3 style="margin:0 0 4px;font-size:15px">${p.ad}</h3><p style="margin:0;font-size:13px;color:var(--text-2)">${tab === 'rapor' ? (p.sonuc || p.ozet) : p.ozet}</p>
      ${tab === 'rapor' ? raw(`<div class="btn-row" style="margin-top:10px">${p.rapor ? `<a class="btn sm" href="${esc(p.rapor)}" target="_blank" rel="noopener">${icons.download} Raporu aç</a>` : '<span class="chip amber">Rapor hazırlanıyor</span>'}</div>`) : raw(`<div class="progress"><i style="width:${p.ilerleme || 0}%"></i></div><div style="font-size:11.5px;color:var(--muted);margin-top:4px">${p.baslangic} → ${p.bitis} · %${p.ilerleme || 0}</div>`)}</a>`).join('') || empty('Kayıt yok', 'flask')}</div>`;
  };
  ctx.root.querySelectorAll('.seg button').forEach(bt => bt.addEventListener('click', () => { tab = bt.dataset.t; ctx.root.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === bt)); render(); }));
  render();
}

export async function projeDetay(ctx) {
  ctx.title('Proje');
  const p = (store.content.projeler || []).find(x => x.id === ctx.params.id);
  if (!p) { ctx.root.innerHTML = empty('Proje bulunamadı'); return; }
  ctx.root.innerHTML = `<div class="card pad"><div class="pill-row" style="margin-bottom:8px"><span class="chip ${p.durum === 'devam' ? 'navy' : 'teal'}">${p.durum === 'devam' ? 'Devam ediyor' : 'Tamamlandı'}</span><span class="chip">${esc(p.alan)}</span></div>
    <h1 style="font-size:20px;margin:0 0 8px">${esc(p.ad)}</h1><p style="font-size:14.5px;line-height:1.55">${esc(p.ozet)}</p>
    <div class="progress"><i style="width:${p.ilerleme || 0}%"></i></div><div style="font-size:12px;color:var(--muted);margin:4px 0 14px">İlerleme %${p.ilerleme || 0}</div>
    <dl class="kv"><dt>Başlangıç</dt><dd>${esc(p.baslangic)}</dd><dt>Bitiş</dt><dd>${esc(p.bitis)}</dd><dt>Kapsam</dt><dd>${esc(p.ilce)}</dd><dt>Ortaklar</dt><dd>${(p.ortaklar || []).map(esc).join(', ')}</dd>${p.sonuc ? `<dt>Sonuç</dt><dd>${esc(p.sonuc)}</dd>` : ''}</dl>
    <div class="btn-row" style="margin-top:14px">${p.rapor ? `<a class="btn sm" href="${esc(p.rapor)}" target="_blank" rel="noopener">${icons.download} Sonuç raporu</a>` : ''}<button class="btn sm ghost" id="sh">${icons.share} Paylaş</button></div></div>`;
  ctx.root.querySelector('#sh').addEventListener('click', () => share({ title: p.ad, text: p.ozet, url: location.href }));
}

export async function etwinning(ctx) {
  ctx.title('eTwinning Merkezi');
  const e = store.content.etwinning || {};
  ctx.root.innerHTML = `<div class="stat-grid" style="margin-bottom:16px">${(e.basarili || []).map(s => h`<div class="stat"><b>${s.sayi}</b><span>${s.baslik}</span></div>`).join('')}<div class="stat"><b>${(e.cagrilar || []).length}</b><span>Güncel çağrı</span></div></div>
    <section class="section"><div class="section-head"><h2>Güncel çağrılar</h2></div><div class="card-list">${(e.cagrilar || []).map(x => h`<div class="card pad"><div class="pill-row" style="margin-bottom:6px"><span class="chip teal">${x.seviye}</span></div><h3 style="margin:0 0 4px;font-size:15px">${x.baslik}</h3><p style="margin:0;font-size:13px;color:var(--text-2)">${x.ozet}</p>${raw(deadlineHtml(x.sonTarih))}<div class="btn-row" style="margin-top:10px"><a class="btn sm" href="${x.link}" target="_blank" rel="noopener">${raw(icons.external)} Çağrıya git</a></div></div>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Faaliyet ve başarılı proje örnekleri</h2></div><div class="card">${(e.ornekler || []).map(x => h`<div class="row"><span class="ic" style="background:rgba(27,127,90,.12);color:var(--teal)">${raw(icons.globe)}</span><span class="tx"><b>${x.baslik}</b><span>${x.okul} · ${x.yil}</span><span>${x.ozet}</span></span></div>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Başvuru kılavuzları</h2></div><div class="card">${(e.kilavuzlar || []).map(x => listRow({ icon: 'book', title: x.baslik, sub: x.ozet, href: x.link })).join('')}</div></section>
    <a class="btn navy block" href="https://school-education.ec.europa.eu/" target="_blank" rel="noopener">${icons.external} European School Education Platform</a>`;
  ctx.root.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
}

export async function tubitak(ctx) {
  ctx.title('TÜBİTAK Merkezi');
  const t = store.content.tubitak || {};
  ctx.root.innerHTML = `<div class="notice">TÜBİTAK program takvimleri TÜBİTAK'ın resmî duyurularıyla kesinleşir; aşağıdaki tarihler AR-GE Birimince güncellenir.</div>
    <section class="section"><div class="section-head"><h2>Programlar</h2></div><div class="card-list">${(t.programlar || []).map(p => h`<div class="card pad"><div class="pill-row" style="margin-bottom:6px"><span class="chip meb">TÜBİTAK ${p.kod}</span></div><h3 style="margin:0 0 4px;font-size:15px">${p.ad}</h3><p style="margin:0 0 6px;font-size:13px;color:var(--text-2)">${p.ozet}</p><div style="font-size:12px;color:var(--muted)">Hedef: ${p.hedef}</div><div class="btn-row" style="margin-top:10px"><a class="btn sm" href="${p.link}" target="_blank" rel="noopener">${raw(icons.external)} Başvuru portalı</a><a class="btn sm ghost" href="#/asistan?m=proje&q=${encodeURIComponent('TÜBİTAK ' + p.kod + ' için proje fikri öner')}">${raw(icons.sparkles)} Fikir iste</a></div></div>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Başvuru takvimi</h2></div><div class="card">${(t.takvim || []).map(x => h`<div class="row"><span class="ic">${raw(icons.calendar)}</span><span class="tx"><b>${x.program} · ${x.asama}</b><span>${x.tarih}${x.not ? ' · ' + x.not : ''}</span></span></div>`).join('')}</div></section>`;
}

export async function akademiler(ctx) {
  ctx.title('Öğretmen Akademileri');
  const a = store.content.akademiler || {};
  ctx.root.innerHTML = `<section class="section"><div class="section-head"><h2>Takvim ve başvuru</h2></div><div class="card">${(a.takvim || []).map(x => h`<div class="event"><div class="when"><b>${new Date(x.tarih).getDate()}</b><span>${fmtDate(x.tarih).split(' ')[1].slice(0, 3)}</span><small>${x.saat}</small></div><div><h3>${x.ad}</h3><p>${x.yer} · Kontenjan ${x.kontenjan}</p><div class="btn-row" style="margin-top:8px"><a class="btn sm" href="${x.basvuru}" target="_blank" rel="noopener">Başvur</a><button class="btn sm ghost" data-ics="${x.id}">${raw(icons.calendar)} Takvime ekle</button></div></div></div>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Katılım duyuruları</h2></div><div class="card pad"><ul style="margin:0;padding-left:18px;font-size:13.5px">${(a.duyurular || []).map(d => `<li>${esc(d)}</li>`).join('')}</ul></div></section>
    <section class="section"><div class="section-head"><h2>Eğitim videoları</h2><a href="#/tv?k=UCL15RFYGVnpVVoSeTeZXWTA">Kocaeli MEM TV</a></div><div class="card">${listRow({ icon: 'play', title: 'Kocaeli MEM TV – Akademi kayıtları', sub: 'Atölye ve seminer kayıtları', href: '#/tv' })}${listRow({ icon: 'graduation', title: 'MEB Akademi', sub: 'Mesleki gelişim eğitimleri', href: 'https://akademi.meb.gov.tr/' })}</div></section>`;
  ctx.root.querySelectorAll('[data-ics]').forEach(b => b.addEventListener('click', () => { const x = a.takvim.find(t => t.id === b.dataset.ics); downloadIcs({ baslik: x.ad, tarih: `${x.tarih}T${x.saat}`, bitis: `${x.tarih}T${String(Number(x.saat.slice(0, 2)) + 3).padStart(2, '0')}${x.saat.slice(2)}`, yer: x.yer, aciklama: 'Kocaeli Öğretmen Akademileri' }); }));
}

const TUR = { pdf: ['PDF dokümanlar', 'file'], kilavuz: ['Kılavuzlar', 'book'], meb: ['MEB yayınları', 'graduation'], sunum: ['Sunumlar', 'chart'], ekitap: ['E-kitaplar', 'book'] };
export async function kutuphane(ctx) {
  ctx.title('Dijital Kütüphane');
  const items = store.content.kutuphane || [];
  let q = '', tur = 'hepsi';
  ctx.root.innerHTML = `<div class="search">${icons.search}<input type="search" placeholder="Kaynak ara…"></div><div class="chips"><button class="chip on" data-t="hepsi">Tümü</button>${Object.entries(TUR).map(([k, v]) => `<button class="chip" data-t="${k}">${v[0]}</button>`).join('')}</div><div id="list"></div>`;
  const render = () => {
    const f = items.filter(i => (tur === 'hepsi' || i.tur === tur) && (!q || (i.baslik + ' ' + i.aciklama).toLocaleLowerCase('tr-TR').includes(q.toLocaleLowerCase('tr-TR'))));
    const groups = {}; f.forEach(i => (groups[i.tur] = groups[i.tur] || []).push(i));
    ctx.root.querySelector('#list').innerHTML = Object.entries(groups).map(([k, arr]) => `<section class="section"><div class="section-head"><h2>${TUR[k]?.[0] || k}</h2></div><div class="card">${arr.map(i => i.link ? listRow({ icon: TUR[k]?.[1] || 'file', title: i.baslik, sub: i.aciklama, href: i.link }) : h`<div class="row"><span class="ic">${raw(icons[TUR[k]?.[1] || 'file'])}</span><span class="tx"><b>${i.baslik}</b><span>${i.aciklama}</span></span><span class="chip amber">Yükleniyor</span></div>`).join('')}</div></section>`).join('') || empty('Kaynak bulunamadı', 'book');
    ctx.root.querySelectorAll('#list a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
  };
  ctx.root.querySelector('input').addEventListener('input', e => { q = e.target.value; render(); });
  ctx.root.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => { tur = b.dataset.t; ctx.root.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b)); render(); }));
  render();
}

export async function dokumanlar(ctx) {
  ctx.title('Doküman Merkezi');
  const d = store.content.dokumanlar || {};
  ctx.root.innerHTML = `<section class="section"><div class="section-head"><h2>Formlar ve belgeler</h2></div><div class="card">${(d.formlar || []).map(f => f.link ? listRow({ icon: 'file', title: f.baslik, sub: f.aciklama, href: f.link, right: `<span class="chip">${f.tur === 'word' ? 'Word' : 'PDF'}</span>` }) : h`<div class="row"><span class="ic">${raw(icons.file)}</span><span class="tx"><b>${f.baslik}</b><span>${f.aciklama}</span></span><span class="chip">${f.tur === 'word' ? 'Word' : 'PDF'}</span></div>`).join('')}</div></section>
    <section class="section"><div class="section-head"><h2>Dilekçe örnekleri</h2></div><p class="lead">Şablonu seçin, boşlukları doldurun; metin panoya kopyalanır veya paylaşılır.</p><div class="card">${(d.dilekceler || []).map(x => `<button class="row tap" style="width:100%;text-align:left" data-dl="${esc(x.id)}"><span class="ic">${icons.edit}</span><span class="tx"><b>${esc(x.baslik)}</b><span>Doldur ve kopyala</span></span><span class="arrow">${icons.chevron}</span></button>`).join('')}</div></section>`;
  ctx.root.querySelectorAll('[data-dl]').forEach(b => b.addEventListener('click', () => {
    const x = d.dilekceler.find(t => t.id === b.dataset.dl);
    const fields = [...new Set([...x.sablon.matchAll(/{{(\w+)}}/g)].map(m => m[1]))].filter(f => f !== 'TARIH_BUGUN');
    const LBL = { KURUM: 'Kurum (ör. İzmit İlçe Millî Eğitim)', OKUL: 'Okul', BRANS: 'Branş', TARIH: 'Etkinlik tarihi', ETKINLIK: 'Etkinlik / proje adı', AD: 'Ad Soyad' };
    const DEF = { AD: store.user?.ad || '', BRANS: store.user?.brans || '', OKUL: store.user?.okul || '', KURUM: (store.user?.ilce ? store.user.ilce.toLocaleUpperCase('tr-TR') + ' İLÇE MİLLÎ EĞİTİM' : '') };
    const s = sheet(`<h2>${esc(x.baslik)}</h2><form id="dlf">${fields.map(f => `<label class="field"><span>${LBL[f] || f}</span><input name="${f}" value="${esc(DEF[f] || '')}"></label>`).join('')}<textarea id="out" readonly style="min-height:160px;font-size:13px"></textarea><div class="btn-row" style="margin-top:10px"><button type="button" class="btn primary" id="cp">${icons.copy} Kopyala</button><button type="button" class="btn" id="sh">${icons.share} Paylaş</button><button type="button" class="btn ghost" data-close>Kapat</button></div></form>`);
    const out = s.el.querySelector('#out'), form = s.el.querySelector('#dlf');
    const build = () => { const v = Object.fromEntries(new FormData(form).entries()); v.TARIH_BUGUN = fmtDate(new Date()); out.value = x.sablon.replace(/{{(\w+)}}/g, (m, k) => v[k] || `[${k}]`); };
    form.addEventListener('input', build); build();
    s.el.querySelector('#cp').addEventListener('click', async () => { try { await navigator.clipboard.writeText(out.value); toast('Dilekçe panoya kopyalandı'); } catch (_) { out.select(); toast('Metni seçip kopyalayın'); } });
    s.el.querySelector('#sh').addEventListener('click', () => share({ title: x.baslik, text: out.value }));
  }));
}
