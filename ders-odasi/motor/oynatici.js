/* Ders Odası — 16:9 ders oynatıcısı
   Ders dosyası (dersler/<id>/ders.js) DO.dersKaydet({...}) çağırır; oynatıcı
   bölümleri ve blokları sırayla 1600×900'lük sahneye çizer.
   Roller: bireysel (kendi başına) · ogrenci (canlı derste) · ogretmen (canlı dersi yönetir) */
(function () {
  'use strict';
  var DO = window.DO, el = DO.el;
  var GEN = 1600, YUK = 900;

  DO.Bloklar = DO.Bloklar || {};
  DO.dersKaydet = function (ders) { DO._ders = ders; };

  var O = DO.Oynatici = {
    ders: null, sira: [], durum: {}, i: -1, aktif: null, rol: 'bireysel',
    ayar: { anlatim: true, altyazi: true },
    olcek: 1
  };

  /* ---------------- Başlangıç ---------------- */
  O.baslat = function () {
    var ders = DO._ders;
    if (!ders) { document.body.innerHTML = '<p style="padding:40px;font:18px sans-serif">Ders dosyası yüklenemedi.</p>'; return; }
    O.ders = ders;
    O.kok = ders._kok || '';
    O.rol = DO.param('rol', 'bireysel');
    if (['bireysel', 'ogrenci', 'ogretmen'].indexOf(O.rol) < 0) O.rol = 'bireysel';
    O.oda = DO.param('oda');
    if (O.rol !== 'bireysel' && !O.oda) O.oda = DO.odaKodu();
    O.ayar = DO.depo.oku('do:ayar', O.ayar);
    if (O.rol === 'ogrenci') O.ayar.anlatim = DO.param('anlatim') === '1';  // canlı derste anlatımı öğretmen yapar

    // Düz sıra
    ders.bolumler.forEach(function (b, bi) {
      b.bloklar.forEach(function (blok) {
        blok._bolum = bi;
        O.sira.push(blok);
      });
    });
    O.maxToplam = O.sira.reduce(function (t, b) { return t + blokMax(b); }, 0);

    iskelet();
    olcekle();
    window.addEventListener('resize', olcekle);
    document.addEventListener('fullscreenchange', olcekle);
    girisPerdesi();
  };

  function blokMax(b) {
    var tanim = DO.Bloklar[b.tur];
    if (!tanim) return 0;
    return tanim.max ? tanim.max(b) : 0;
  }
  O.yol = function (dosya) {
    if (!dosya) return dosya;
    if (/^(https?:|data:|\/)/.test(dosya)) return dosya;
    return O.kok + dosya;
  };

  /* ---------------- İskelet ---------------- */
  function iskelet() {
    document.body.classList.add('do-govde', 'rol-' + O.rol);
    O.dom = {};
    var d = O.dom;
    d.sahne = el('div', { id: 'sahne', class: 'sahne' });
    d.icerik = el('div', { class: 'icerik' });
    d.sahne.appendChild(d.icerik);

    // Üst bilgi
    d.ilerleme = el('div', { class: 'hud-ilerleme' });
    O.ders.bolumler.forEach(function (b) {
      var adet = b.bloklar.length;
      var parca = el('div', { class: 'hud-parca', style: { flex: adet, '--renk': b.renk || '#4f7a3a' } }, el('i'));
      parca.title = b.ad;
      d.ilerleme.appendChild(parca);
    });
    d.bolumAd = el('span', { class: 'hud-bolum' });
    d.puan = el('span', { class: 'hud-puan', html: '<b>0</b>' });
    d.sayac = el('span', { class: 'hud-sayac' });
    d.ust = el('div', { class: 'hud-ust' }, [
      el('div', { class: 'hud-sol' }, [el('span', { class: 'hud-ders', text: O.ders.kisaAd || O.ders.ad }), d.bolumAd]),
      el('div', { class: 'hud-sag' }, [d.puan, d.sayac])
    ]);
    d.sahne.appendChild(d.ilerleme);
    d.sahne.appendChild(d.ust);

    // Alt denetimler
    d.geri = el('button', { class: 'dug-yuvarlak geri', title: 'Önceki (←)', 'aria-label': 'Önceki', html: ikon('sol'), onclick: function () { O.git(O.i - 1, true); } });
    d.ileri = el('button', { class: 'dug-yuvarlak ileri', title: 'Sonraki (→)', 'aria-label': 'Sonraki', html: ikon('sag'), onclick: function () { O.ileri(); } });
    d.anlatimDug = el('button', { class: 'dug-kucuk', title: 'Sesli anlatım', onclick: anlatimDegis });
    d.altyaziDug = el('button', { class: 'dug-kucuk', title: 'Altyazı', html: 'CC', onclick: altyaziDegis });
    d.efektDug = el('button', { class: 'dug-kucuk', title: 'Oyun sesleri', onclick: efektDegis });
    d.tamEkranDug = el('button', { class: 'dug-kucuk', title: 'Tam ekran', html: ikon('tam'), onclick: tamEkran });
    d.elDug = el('button', { class: 'dug-kucuk el-dug', title: 'Söz iste', html: '✋', onclick: elKaldir });
    d.alt = el('div', { class: 'hud-alt' }, [
      d.geri,
      el('div', { class: 'hud-orta' }, [d.anlatimDug, d.altyaziDug, d.efektDug, d.elDug, d.tamEkranDug]),
      d.ileri
    ]);
    d.sahne.appendChild(d.alt);
    d.altyazi = el('div', { class: 'altyazi' });
    d.sahne.appendChild(d.altyazi);
    d.bildirim = el('div', { class: 'bildirim' });
    d.sahne.appendChild(d.bildirim);
    d.isaret = el('div', { class: 'lazer' });
    d.sahne.appendChild(d.isaret);
    d.kilitSerit = el('div', { class: 'kilit-serit' });
    d.sahne.appendChild(d.kilitSerit);

    d.alan = el('div', { class: 'sahne-alan' }, d.sahne);
    d.yerlesim = el('div', { class: 'yerlesim' }, d.alan);
    if (O.rol === 'ogretmen') { d.panel = el('aside', { class: 'ogretmen-panel' }); d.yerlesim.appendChild(d.panel); }
    d.dondur = el('div', { class: 'dondur-uyari', html: '<div>📱↻</div><p>Dersi yatay ekranda izlemek için telefonunu yan çevir.</p>' });
    document.body.appendChild(d.yerlesim);
    document.body.appendChild(d.dondur);

    anlatimYaz(); altyaziYaz(); efektYaz();

    // Hareketsizlikte denetimleri gizle (slayt ve videoda)
    var gizleZaman;
    d.sahne.addEventListener('pointerdown', function () { d.sahne.classList.remove('sakin'); clearTimeout(gizleZaman); gizleZaman = setTimeout(function () { d.sahne.classList.add('sakin'); }, 4000); });
    d.sahne.addEventListener('pointermove', function (e) {
      d.sahne.classList.remove('sakin');
      clearTimeout(gizleZaman);
      gizleZaman = setTimeout(function () { d.sahne.classList.add('sakin'); }, 3200);
      if (O.lazerAcik && O.rol === 'ogretmen') lazerGonder(e);
    });
    document.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); O.ileri(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); O.git(O.i - 1, true); }
      if (e.key === 'f' || e.key === 'F') tamEkran();
    });
  }

  function olcekle() {
    var a = O.dom.alan.getBoundingClientRect();
    var s = Math.min(a.width / GEN, a.height / YUK);
    O.olcek = s;
    O.dom.sahne.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
  }
  /* Ekran koordinatını sahne koordinatına çevir (sürükle-bırak için) */
  O.sahneNokta = function (x, y) {
    var r = O.dom.sahne.getBoundingClientRect();
    return { x: (x - r.left) / O.olcek, y: (y - r.top) / O.olcek };
  };

  function ikon(ad) {
    var p = {
      sol: '<path d="M15 5l-7 7 7 7" />', sag: '<path d="M9 5l7 7-7 7" />',
      tam: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />',
      ses: '<path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" />',
      sessiz: '<path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M17 9l5 6M22 9l-5 6" />',
      nota: '<path d="M9 18V6l10-2v12" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" />'
    }[ad];
    return '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
  }
  O.ikon = ikon;

  function ayarSakla() { DO.depo.yaz('do:ayar', O.ayar); }
  function anlatimYaz() { O.dom.anlatimDug.innerHTML = ikon(O.ayar.anlatim ? 'ses' : 'sessiz'); O.dom.anlatimDug.classList.toggle('kapali', !O.ayar.anlatim); }
  function altyaziYaz() { O.dom.altyaziDug.classList.toggle('kapali', !O.ayar.altyazi); O.dom.sahne.classList.toggle('altyazisiz', !O.ayar.altyazi); }
  function efektYaz() { O.dom.efektDug.innerHTML = ikon('nota'); O.dom.efektDug.classList.toggle('kapali', !DO.sesAcik); }
  function anlatimDegis() {
    O.ayar.anlatim = !O.ayar.anlatim; ayarSakla(); anlatimYaz();
    if (O.aktif && O.aktif.anlatimDegisti) O.aktif.anlatimDegisti(O.ayar.anlatim);
  }
  function altyaziDegis() { O.ayar.altyazi = !O.ayar.altyazi; ayarSakla(); altyaziYaz(); }
  function efektDegis() { DO.sesAcik = !DO.sesAcik; DO.depo.yaz('do:efekt', DO.sesAcik); efektYaz(); }
  function tamEkran() {
    var h = document.documentElement;
    if (!document.fullscreenElement) { (h.requestFullscreen || h.webkitRequestFullscreen || function () {}).call(h); }
    else (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  }

  /* ---------------- Giriş perdesi ---------------- */
  function girisPerdesi() {
    var ders = O.ders;
    var kayitliAd = DO.depo.oku('do:ad', '');
    var kayitliId = DO.depo.oku('do:ogrenciId', null) || ('ogr-' + DO.uuid().slice(0, 8));
    DO.depo.yaz('do:ogrenciId', kayitliId);

    // Kayıt katmanını geçici bir kimlikle aç; LMS bir öğrenci verirse onu kullan
    var gecici = { id: kayitliId, ad: kayitliAd || 'Misafir' };
    Kayit().baslat({ ders: { id: ders.id, ad: ders.ad }, ogrenci: gecici, rol: O.rol, oda: O.oda });
    var lms = Kayit().lmsOgrenci();
    if (lms) { gecici.ad = lms.ad; gecici.id = lms.id; }
    O.ogrenci = gecici;

    var adGirdi = el('input', { class: 'ad-girdi', type: 'text', maxlength: 30, placeholder: 'Adını yaz', value: lms ? lms.ad : kayitliAd });
    if (lms) adGirdi.disabled = true;
    var devam = Kayit().devamVerisi();
    var rolMetin = { bireysel: 'Kendi başına ders', ogrenci: 'Canlı ders · öğrenci', ogretmen: 'Canlı ders · öğretmen' }[O.rol];
    var hedefler = Kayit().hedefAdlari().filter(function (h) { return h !== 'yerel'; });

    var perde = el('div', { class: 'giris-perde' });
    var kart = el('div', { class: 'giris-kart' }, [
      el('img', { class: 'giris-gorsel', src: O.yol(ders.kapakGorseli), alt: '' }),
      el('div', { class: 'giris-govde' }, [
        el('span', { class: 'giris-etiket', text: (ders.seri || 'Ders') + ' · ' + rolMetin }),
        el('h1', { text: ders.ad }),
        el('p', { class: 'giris-alt', text: ders.ozet || '' }),
        el('label', { class: 'giris-label', text: O.rol === 'ogretmen' ? 'Hocamızın adı' : 'Adın' }),
        adGirdi,
        O.rol === 'ogrenci' ? el('p', { class: 'giris-oda', html: 'Oda kodu: <b>' + DO.kacis(O.oda) + '</b>' }) : null,
        hedefler.length ? el('p', { class: 'giris-lms', text: 'Bağlı kayıt sistemi: ' + hedefler.join(', ') }) : null,
        el('div', { class: 'giris-dugmeler' }, [
          devam && devam.b > 0 ? el('button', { class: 'dug ana', text: 'Kaldığım yerden devam et', onclick: function () { basla(devam); } }) : null,
          el('button', { class: 'dug ' + (devam && devam.b > 0 ? 'ikincil' : 'ana'), text: devam && devam.b > 0 ? 'Baştan başla' : 'Derse başla', onclick: function () { basla(null); } })
        ])
      ])
    ]);
    perde.appendChild(kart);
    O.dom.sahne.appendChild(perde);
    setTimeout(function () { if (!adGirdi.disabled) adGirdi.focus(); }, 300);
    adGirdi.addEventListener('keydown', function (e) { if (e.key === 'Enter') basla(devam && devam.b > 0 ? devam : null); });

    function basla(devamVerisi) {
      var ad = adGirdi.value.trim();
      if (!ad) { adGirdi.classList.add('salla'); setTimeout(function () { adGirdi.classList.remove('salla'); }, 500); adGirdi.focus(); return; }
      if (!lms) {
        DO.depo.yaz('do:ad', ad); O.ogrenci.ad = ad;
        // Aynı cihazı paylaşan öğrenciler ayrı kişi sayılsın: cihaz kimliği + ad
        O.ogrenci.id = kayitliId + ':' + ad.toLocaleLowerCase('tr').replace(/[^a-z0-9çğıöşü]+/g, '-');
      }
      Kayit().ogrenci = O.ogrenci;
      DO.efekt.gecis();
      perde.classList.add('kapan');
      setTimeout(function () { perde.remove(); }, 450);
      Kayit().kaydet(devamVerisi ? 'devamEtti' : 'basladi', { id: '', ad: ders.ad, tur: 'lesson' }, null,
        { hedefler: Kayit().hedefAdlari().join(',') });
      if (devamVerisi && devamVerisi.d) O.durum = devamVerisi.d;
      puanYaz();
      if (O.rol !== 'bireysel') canliBaslat();
      O.git(devamVerisi ? Math.min(devamVerisi.b, O.sira.length - 1) : 0);
    }
  }
  function Kayit() { return DO.Kayit; }

  /* ---------------- Gezinme ---------------- */
  O.ileri = function () {
    if (O.i >= O.sira.length - 1) return;
    if (!gecebilir()) {
      bildir('Önce bu etkinliği tamamlayalım 🙂', 'uyari');
      O.dom.icerik.classList.add('titret'); setTimeout(function () { O.dom.icerik.classList.remove('titret'); }, 450);
      return;
    }
    O.git(O.i + 1, true);
  };
  function gecebilir() {
    if (O.rol === 'ogretmen') return true;
    var b = O.sira[O.i];
    if (!b) return true;
    var tanim = DO.Bloklar[b.tur];
    var zorunlu = b.zorunlu != null ? b.zorunlu : !!(tanim && tanim.zorunlu);
    return !zorunlu || (O.durum[b.id] && O.durum[b.id].tamam);
  }
  O.git = function (yeni, kullanici) {
    if (yeni < 0 || yeni >= O.sira.length) return;
    if (O.rol === 'ogrenci' && O.kilit && kullanici) { bildir('Şu an Hocamız dersi yönetiyor.', 'bilgi'); return; }
    if (O.rol === 'ogrenci' && kullanici && yeni > O.i && !gecebilir()) { O.ileri(); return; }
    var eski = O.i;
    if (O.aktif && O.aktif.temizle) { try { O.aktif.temizle(); } catch (e) { console.error(e); } }
    (O.temizlikler || []).forEach(function (f) { try { f(); } catch (e) { /* yok */ } });
    O.temizlikler = [];
    O.i = yeni;
    var blok = O.sira[yeni];
    var bolum = O.ders.bolumler[blok._bolum];
    O.dom.icerik.innerHTML = '';
    O.dom.icerik.className = 'icerik giris-' + (yeni >= eski ? 'ileri' : 'geri');
    O.dom.sahne.dataset.tur = blok.tur;
    O.dom.sahne.style.setProperty('--bolum-renk', bolum.renk || '#4f7a3a');
    O.dom.bolumAd.textContent = bolum.ad;
    O.dom.sayac.textContent = (yeni + 1) + ' / ' + O.sira.length;
    O.dom.altyazi.textContent = '';
    O.dom.altyazi.classList.remove('gorunur');
    ilerlemeYaz();
    var tanim = DO.Bloklar[blok.tur];
    if (!tanim) { O.dom.icerik.appendChild(el('div', { class: 'eksik', text: 'Bilinmeyen blok türü: ' + blok.tur })); return; }
    O.blokBaslangic = Date.now();
    var ctx = baglam(blok);
    try { O.aktif = tanim.ciz(ctx) || {}; } catch (e) { console.error(e); O.aktif = {}; }
    dugmeleriYaz();
    Kayit().kaydet('deneyimledi', { id: blok.id, ad: blok.baslik || blok.tur, tur: tanim.xapiTur || 'interaction', blok: blok.id }, null, { blokTuru: blok.tur, sira: yeni });
    Kayit().devamYaz({ b: yeni, d: O.durum });
    if (DO.Canli.acik) {
      DO.Canli.benimBlok = yeni;
      if (O.rol === 'ogretmen') DO.Canli.gonder('git', { blok: yeni, kilit: O.kilit });
      else DO.Canli.gonder('konum', { blok: yeni });
    }
    if (O.rol === 'ogretmen') panelYaz();
    // Son blok ders sonudur
    if (yeni === O.sira.length - 1) dersBitti();
  };

  function ilerlemeYaz() {
    var parcalar = O.dom.ilerleme.children, sayac = 0;
    O.ders.bolumler.forEach(function (b, bi) {
      var ic = parcalar[bi].firstChild;
      var bas = sayac, adet = b.bloklar.length;
      var oran = O.i < bas ? 0 : O.i >= bas + adet ? 1 : (O.i - bas + 1) / adet;
      ic.style.width = (oran * 100) + '%';
      parcalar[bi].classList.toggle('aktif', O.i >= bas && O.i < bas + adet);
      sayac += adet;
    });
  }
  function dugmeleriYaz() {
    var d = O.dom;
    d.geri.disabled = O.i <= 0 || (O.rol === 'ogrenci' && O.kilit);
    d.ileri.disabled = O.i >= O.sira.length - 1 || (O.rol === 'ogrenci' && O.kilit);
    d.ileri.classList.toggle('bekliyor', !gecebilir());
    d.ileri.classList.toggle('hazir', gecebilir() && O.i < O.sira.length - 1 && O.sira[O.i] && !!DO.Bloklar[O.sira[O.i].tur].zorunlu);
    d.elDug.style.display = O.rol === 'ogrenci' ? '' : 'none';
  }
  O.dugmeleriYaz = dugmeleriYaz;

  /* ---------------- Puan ---------------- */
  function toplamPuan() {
    var t = 0;
    for (var k in O.durum) t += O.durum[k].puan || 0;
    return t;
  }
  O.toplamPuan = toplamPuan;
  function puanYaz() {
    var p = toplamPuan();
    O.dom.puan.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" fill="#e9b949" stroke="#b9852b" stroke-width="1.2"/></svg><b>' + p + '</b>';
    O.dom.puan.classList.remove('zipla'); void O.dom.puan.offsetWidth; O.dom.puan.classList.add('zipla');
  }

  /* ---------------- Blok bağlamı ---------------- */
  function baglam(blok) {
    var ctx = {
      blok: blok, ders: O.ders, rol: O.rol, kap: O.dom.icerik, sahne: O.dom.sahne,
      yol: O.yol, oynatici: O, canli: DO.Canli,
      onceki: O.durum[blok.id] || null,
      ayar: O.ayar,
      basla: Date.now()
    };
    var cevapZaman = Date.now();
    ctx.kaydet = function (fiil, oge, sonuc, ek) {
      return Kayit().kaydet(fiil, {
        id: blok.id + (oge && oge.id ? '/' + oge.id : ''), ad: (oge && oge.ad) || blok.baslik || blok.tur,
        tur: (oge && oge.tur) || 'interaction', blok: blok.id, etkilesim: oge && oge.etkilesim, dogruYanit: oge && oge.dogruYanit
      }, sonuc, ek);
    };
    /* Bir soruya verilen cevap: kaydedilir, canlı derste öğretmene gider */
    ctx.cevap = function (c) {
      var simdi = Date.now();
      var sure = c.sureMs != null ? c.sureMs : simdi - cevapZaman;
      cevapZaman = simdi;
      var ifade = ctx.kaydet('cevapladi', { id: c.oge, ad: c.ad, tur: 'cmi.interaction', etkilesim: c.etkilesim || 'choice', dogruYanit: c.dogruYanit },
        { basari: c.dogru, yanit: c.yanit, sureMs: sure, puan: c.puan, max: c.max }, { deneme: c.deneme || 1 });
      if (DO.Canli.acik) {
        DO.Canli.gonder('cevap', { blok: blok.id, blokSira: O.i, oge: c.oge, ad: c.ad, yanit: c.yanit, dogru: c.dogru, puan: c.puan || 0 });
        if (O.rol === 'ogrenci') DO.Canli.gonder('ifade', ifade);
      }
      return ifade;
    };
    ctx.etkiles = function (oge, ad, ek) {
      var ifade = ctx.kaydet('etkilesti', { id: oge, ad: ad }, null, ek);
      if (DO.Canli.acik && O.rol === 'ogrenci') DO.Canli.gonder('ifade', ifade);
      return ifade;
    };
    /* Blok bitti: puanı yaz, ileri düğmesini aç */
    ctx.tamamla = function (s) {
      s = s || {};
      var max = s.max != null ? s.max : blokMax(blok);
      var puan = Math.max(0, Math.min(max, s.puan || 0));
      var eski = O.durum[blok.id];
      var ilk = !eski || !eski.tamam;
      // Tekrar oynanırsa en iyi puan kalır
      if (!eski || !eski.tamam || puan > (eski.puan || 0)) O.durum[blok.id] = { tamam: true, puan: puan, max: max, deneme: ((eski && eski.deneme) || 0) + 1 };
      else eski.deneme = (eski.deneme || 1) + 1;
      var ifade = ctx.kaydet('tamamladi', { id: '', ad: blok.baslik || blok.tur, tur: 'assessment' },
        { tamam: true, puan: puan, max: max || undefined, basari: max ? puan / max >= 0.6 : undefined, sureMs: Date.now() - ctx.basla });
      var top = toplamPuan();
      var ilerle = Kayit().kaydet('ilerledi', { id: '', ad: O.ders.ad, tur: 'lesson' }, { puan: top, max: O.maxToplam },
        { ilerleme: Math.round((O.i + 1) / O.sira.length * 100) / 100 });
      Kayit().durum({ puan: top, max: O.maxToplam, tamam: false, ilerleme: (O.i + 1) / O.sira.length, esik: O.ders.basariEsigi });
      Kayit().devamYaz({ b: O.i, d: O.durum });
      if (DO.Canli.acik) {
        DO.Canli.gonder('puan', { puan: top, max: O.maxToplam });
        if (O.rol === 'ogrenci') { DO.Canli.gonder('ifade', ifade); DO.Canli.gonder('ifade', ilerle); }
      }
      puanYaz();
      dugmeleriYaz();
      if (ilk && max) bildir('+' + puan + ' puan', 'puan');
    };
    ctx.bildir = bildir;
    ctx.altyazi = function (metin) {
      O.dom.altyazi.textContent = metin || '';
      O.dom.altyazi.classList.toggle('gorunur', !!metin);
    };
    ctx.zaman = function (fn, ms) { var t = setTimeout(fn, ms); O.temizlikler.push(function () { clearTimeout(t); }); return t; };
    ctx.aralik = function (fn, ms) { var t = setInterval(fn, ms); O.temizlikler.push(function () { clearInterval(t); }); return t; };
    ctx.dinle = function (tur, fn) { DO.Canli.olay.on(tur, fn); O.temizlikler.push(function () { DO.Canli.olay.off(tur, fn); }); };
    ctx.ileri = function () { O.ileri(); };
    /* Sesli anlatım: blok açılınca (ayar açıksa) çalar */
    ctx.anlatim = function (dosya, metin) {
      if (!dosya) return null;
      var ses = new Audio(O.yol(dosya));
      ses.preload = 'auto';
      var cal = function () {
        var p = ses.play(); if (p && p.catch) p.catch(function () { /* izin yok */ });
      };
      if (O.ayar.anlatim) ctx.zaman(cal, 450);
      O.temizlikler.push(function () { ses.pause(); ses.src = ''; });
      ses.addEventListener('ended', function () { ctx.kaydet('deneyimledi', { id: 'anlatim', ad: 'Sesli anlatım dinlendi' }); });
      return { ses: ses, cal: cal, durdur: function () { ses.pause(); } };
    };
    return ctx;
  }

  /* ---------------- Bildirim ---------------- */
  var bildirimZaman;
  function bildir(metin, tur) {
    var b = O.dom.bildirim;
    b.textContent = metin;
    b.className = 'bildirim gorunur ' + (tur || '');
    clearTimeout(bildirimZaman);
    bildirimZaman = setTimeout(function () { b.className = 'bildirim'; }, 2200);
  }
  O.bildir = bildir;

  function dersBitti() {
    var top = toplamPuan();
    Kayit().kaydet('tamamladi', { id: '', ad: O.ders.ad, tur: 'lesson' },
      { tamam: true, puan: top, max: O.maxToplam, basari: O.maxToplam ? top / O.maxToplam >= (O.ders.basariEsigi || 0.6) : true, sureMs: Date.now() - Kayit().baslangic });
    Kayit().durum({ puan: top, max: O.maxToplam, tamam: true, ilerleme: 1, esik: O.ders.basariEsigi });
  }

  /* =====================================================================
     CANLI DERS
     ===================================================================== */
  function canliBaslat() {
    var C = DO.Canli;
    // Sekme kimliği: aynı tarayıcıda açılan öğretmen ve öğrenci sekmeleri birbirini görebilsin
    var sekme = null;
    try { sekme = sessionStorage.getItem('do:sekme'); if (!sekme) { sekme = DO.uuid().slice(0, 6); sessionStorage.setItem('do:sekme', sekme); } } catch (e) { sekme = DO.uuid().slice(0, 6); }
    C.baslat({ oda: O.oda, id: O.ogrenci.id + '#' + sekme, ad: O.ogrenci.ad, rol: O.rol, blok: 0 });
    if (O.rol === 'ogrenci') {
      O.kilit = false;
      C.olay.on('git', function (m) {
        O.kilit = !!m.veri.kilit;
        kilitSerit();
        if (O.kilit && m.veri.blok !== O.i) O.git(m.veri.blok);
        dugmeleriYaz();
      });
      C.olay.on('kilit', function (m) {
        O.kilit = !!m.veri.acik; kilitSerit(); dugmeleriYaz();
        if (O.kilit && m.veri.blok != null && m.veri.blok !== O.i) O.git(m.veri.blok);
      });
      C.olay.on('tanit', function (m) {
        if (m.gonderen.rol === 'ogretmen') { O.kilit = true; kilitSerit(); if (m.veri.blok !== O.i) O.git(m.veri.blok); dugmeleriYaz(); }
      });
      C.olay.on('isaret', function (m) { lazerGoster(m.veri); });
      C.olay.on('mesaj', function (m) { bildir('Hocamız: ' + m.veri.metin, 'bilgi'); });
      C.olay.on('baglanti', kilitSerit);
      C.olay.on('katilim', kilitSerit);
    } else {
      O.kilit = true;
      ['katilim', 'cevap', 'puan', 'el', 'konum', 'tanit', 'merhaba', 'baglanti'].forEach(function (t) { C.olay.on(t, panelYaz); });
      C.olay.on('ifade', function (m) { if (m.veri && m.veri.id) Kayit().disaridanSakla(m.veri); });
      C.olay.on('el', function (m) { if (m.veri.kalkik) { bildir('✋ ' + m.gonderen.ad + ' söz istiyor', 'bilgi'); DO.efekt.tik(); } });
      C.olay.on('cevap', function (m) {
        var c = m.veri;
        (O.canliCevaplar = O.canliCevaplar || []).push({ id: m.gonderen.id, ad: m.gonderen.ad, blok: c.blok, oge: c.oge, soru: c.ad, yanit: c.yanit, dogru: c.dogru, t: Date.now() });
        panelYaz();
      });
    }
    kilitSerit();
  }
  function kilitSerit() {
    var s = O.dom.kilitSerit;
    if (O.rol === 'ogrenci') {
      var ogretmen = DO.Canli.ogretmenVar();
      var hata = DO.Canli.baglanti.firebase === 'hata';
      s.textContent = hata ? '✗ Bağlantı kurulamadı — internetini kontrol et (oda ' + O.oda + ')'
        : !ogretmen ? 'Hocamız bekleniyor… (oda ' + O.oda + ')' : O.kilit ? '🔒 Hocamızı takip ediyorsun' : '🔓 Serbest çalışma';
      s.className = 'kilit-serit gorunur' + (O.kilit ? ' kilitli' : '');
    } else s.className = 'kilit-serit';
  }
  function elKaldir() {
    O.elKalkik = !O.elKalkik;
    O.dom.elDug.classList.toggle('aktif', O.elKalkik);
    DO.Canli.gonder('el', { kalkik: O.elKalkik });
    Kayit().kaydet('elKaldirdi', { id: O.sira[O.i].id + '/el', ad: O.elKalkik ? 'Söz istedi' : 'Elini indirdi' });
    bildir(O.elKalkik ? 'Hocamıza söz isteğin iletildi ✋' : 'Elini indirdin', 'bilgi');
  }

  /* Lazer işaretçi */
  var lazerSon = 0;
  function lazerGonder(e) {
    var simdi = Date.now(); if (simdi - lazerSon < 40) return; lazerSon = simdi;
    var n = O.sahneNokta(e.clientX, e.clientY);
    var v = { x: n.x / GEN, y: n.y / YUK };
    DO.Canli.gonder('isaret', v);
    lazerGoster(v);
  }
  var lazerZaman;
  function lazerGoster(v) {
    var l = O.dom.isaret;
    l.style.left = (v.x * GEN) + 'px'; l.style.top = (v.y * YUK) + 'px';
    l.classList.add('gorunur');
    clearTimeout(lazerZaman); lazerZaman = setTimeout(function () { l.classList.remove('gorunur'); }, 1200);
  }

  /* Öğretmen paneli */
  function panelYaz() {
    var p = O.dom.panel; if (!p) return;
    var C = DO.Canli, blok = O.sira[O.i] || {};
    var ogrenciler = C.ogrenciler();
    var davet = location.origin + location.pathname + '?d=' + encodeURIComponent(O.ders.id) + '&rol=ogrenci&oda=' + encodeURIComponent(O.oda);
    p.innerHTML = '';
    p.appendChild(el('div', { class: 'panel-baslik' }, [
      el('span', { text: 'Oda' }), el('b', { class: 'oda-kodu', text: O.oda })
    ]));
    var b = C.baglanti || {};
    var bagMetin = b.firebase === 'hazir' ? '● Canlı bağlantı açık — farklı cihazlar katılabilir'
      : b.firebase === 'baglaniyor' ? '○ Canlı bağlantı kuruluyor…'
      : b.firebase === 'hata' ? '✗ Firebase bağlantısı kurulamadı — yalnızca bu tarayıcıdaki sekmeler'
      : b.websocket === 'hazir' ? '● Oda sunucusuna bağlı'
      : b.platform ? '● Platform köprüsü üzerinden'
      : '○ Yalnızca bu tarayıcıdaki sekmeler (Firebase ayarı yok)';
    p.appendChild(el('p', { class: 'panel-baglanti' + (C.uzaktanBagli() ? ' acik' : ''), text: bagMetin }));
    var davetGirdi = el('input', { class: 'davet', readonly: true, value: davet, onclick: function () { this.select(); } });
    p.appendChild(el('div', { class: 'panel-davet' }, [
      davetGirdi,
      el('button', { class: 'dug kucuk', text: 'Kopyala', onclick: function () { davetGirdi.select(); try { navigator.clipboard.writeText(davet); } catch (e) { document.execCommand('copy'); } bildir('Davet bağlantısı kopyalandı', 'bilgi'); } })
    ]));
    p.appendChild(el('div', { class: 'panel-satir' }, [
      el('label', { class: 'anahtar' }, [
        el('input', { type: 'checkbox', checked: O.kilit, onchange: function () { O.kilit = this.checked; C.gonder('kilit', { acik: O.kilit, blok: O.i }); } }),
        el('span', { text: 'Öğrenciler beni takip etsin' })
      ]),
      el('label', { class: 'anahtar' }, [
        el('input', { type: 'checkbox', checked: !!O.lazerAcik, onchange: function () { O.lazerAcik = this.checked; } }),
        el('span', { text: 'Lazer işaretçi' })
      ])
    ]));

    p.appendChild(el('h3', { text: 'Öğrenciler (' + ogrenciler.length + ')' }));
    if (!ogrenciler.length) p.appendChild(el('p', { class: 'panel-bos', html: 'Henüz kimse katılmadı. Davet bağlantısını öğrenciye gönderin.<br><small>Deneme için bağlantıyı bu tarayıcıda yeni bir sekmede açabilirsiniz.</small>' }));
    var cevaplar = (O.canliCevaplar || []).filter(function (c) { return c.blok === blok.id; });
    ogrenciler.forEach(function (o) {
      var buBlok = cevaplar.filter(function (c) { return c.id === o.id; });
      var dogru = buBlok.filter(function (c) { return c.dogru === true; }).length;
      var yanlis = buBlok.filter(function (c) { return c.dogru === false; }).length;
      var ayni = o.blok === O.i;
      p.appendChild(el('div', { class: 'ogr-kart' + (o.el ? ' el' : '') }, [
        el('div', { class: 'ogr-ust' }, [
          el('b', { text: (o.el ? '✋ ' : '') + o.ad }),
          el('span', { class: 'ogr-puan', text: '★ ' + (o.puan || 0) })
        ]),
        el('div', { class: 'ogr-alt' }, [
          el('span', { class: 'ogr-konum' + (ayni ? ' ayni' : ''), text: ayni ? 'Bu ekranda' : 'Ekran ' + ((o.blok || 0) + 1) }),
          buBlok.length ? el('span', { class: 'ogr-cevap', html: '<i class="d">✓ ' + dogru + '</i> <i class="y">✗ ' + yanlis + '</i>' }) : null
        ])
      ]));
    });

    if (cevaplar.length) {
      p.appendChild(el('h3', { text: 'Bu ekrandaki cevaplar' }));
      var akis = el('div', { class: 'cevap-akis' });
      cevaplar.slice(-12).reverse().forEach(function (c) {
        akis.appendChild(el('div', { class: 'cevap-satir ' + (c.dogru === true ? 'd' : c.dogru === false ? 'y' : 'n') }, [
          el('b', { text: c.ad }), el('span', { text: (c.soru ? c.soru + ' → ' : '') + c.yanit })
        ]));
      });
      p.appendChild(akis);
    }
    if (blok.not) {
      p.appendChild(el('h3', { text: 'Öğretmen notu' }));
      p.appendChild(el('div', { class: 'ogretmen-not', html: DO.kacis(blok.not).replace(/\n/g, '<br>') }));
    }
    if (O.aktif && O.aktif.ogretmenAraci) p.appendChild(O.aktif.ogretmenAraci());
    var hizli = el('div', { class: 'panel-mesaj' });
    var mg = el('input', { type: 'text', placeholder: 'Öğrencilere kısa mesaj…', maxlength: 80 });
    hizli.appendChild(mg);
    hizli.appendChild(el('button', { class: 'dug kucuk', text: 'Gönder', onclick: function () { if (mg.value.trim()) { C.gonder('mesaj', { metin: mg.value.trim() }); bildir('Mesaj gönderildi', 'bilgi'); mg.value = ''; } } }));
    p.appendChild(hizli);
    p.appendChild(el('a', { class: 'dug kucuk ikincil tam', href: 'rapor.html?ders=' + encodeURIComponent(O.ders.id) + '&oda=' + encodeURIComponent(O.oda), target: '_blank', text: 'Ders raporunu aç ↗' }));
  }
  O.panelYaz = panelYaz;
})();
