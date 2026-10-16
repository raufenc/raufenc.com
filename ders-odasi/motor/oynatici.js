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
    /* Canlı ders oda durumu (sahibi öğretmen; 'oda' mesajıyla herkese gider)
       kilit    : öğrenciler öğretmenin ekranını takip eder
       yonetici : ortak ekrana kim dokunabilir — 'ogretmen' | 'herkes' | <katılımcı kimliği>
       ses      : anlatım ve video sesi nerede çalar — 'ogretmen' | 'ogrenci'
       modlar   : blok kimliği → 'ortak' | 'bireysel' (öğretmenin seçtiği)
       Varsayılan: herkes dokunur, etkinlikler tek ortak ekranda — öğrenci ne yaparsa Hocamızın
       ekranında da aynısı görünür. "Herkes kendi" etkinliklerde Hocamızın ekranı seçtiği
       öğrencinin ekranını yansıtır (yansıtma). */
    O.odaDurum = { kilit: true, yonetici: 'herkes', ses: 'ogretmen', modlar: {} };
    O.gunluk = [];
    O.yansi = {};        // öğretmen: blok → öğrenci → o öğrencinin kendi ekranındaki hamleler
    O.yerelGunluk = {};  // öğrenci: blok → kendi ekranındaki hamleler ("herkes kendi" modunda)
    O.ogrDurum = {};     // öğretmen: öğrenci → blok → {tamam, puan, max}
    O.izlenenSecim = null;
    // Hocamız sayfayı yenilerse odanın ayarları (kim dokunur, etkinlik modları) korunur
    if (O.rol === 'ogretmen') {
      try { var kayitli = JSON.parse(sessionStorage.getItem('do:oda:' + O.oda) || 'null'); if (kayitli) Object.assign(O.odaDurum, kayitli); } catch (e) { /* yok */ }
    }

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
    O.gunluk = [];
    O.aktifEylem = null;
    var ctx = baglam(blok);
    try { O.aktif = tanim.ciz(ctx) || {}; } catch (e) { console.error(e); O.aktif = {}; }
    dugmeleriYaz();
    Kayit().kaydet('deneyimledi', { id: blok.id, ad: blok.baslik || blok.tur, tur: tanim.xapiTur || 'interaction', blok: blok.id }, null, { blokTuru: blok.tur, sira: yeni });
    Kayit().devamYaz({ b: yeni, d: O.durum });
    if (DO.Canli.acik) {
      DO.Canli.benimBlok = yeni;
      if (O.rol === 'ogretmen') { DO.Canli.gonder('git', { blok: yeni, kilit: O.kilit, oda: O.odaDurum }); yansiKur(); kilitSerit(); puanYaz(); }
      else {
        DO.Canli.gonder('konum', { blok: yeni });
        // Kendi ekranımız yeniden kuruldu: Hocamızdaki yansıma da baştan başlasın
        O.yerelGunluk[blok.id] = [];
        if (O.blokModu(blok) !== 'ortak') DO.Canli.gonder('yansi', { blok: blok.id, ad: '__bas' });
        // Ortak ekranın o anki hâlini öğretmenden iste (geç katılma, kopup dönme)
        if (DO.Canli.ogretmenVar()) DO.Canli.gonder('durumIste', { blok: blok.id });
      }
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
    // Canlı derste Hocamızın ekranında izlenen öğrencinin puanı görünür (iki ekran aynı olsun)
    if (O.rol === 'ogretmen' && canliMi()) {
      var iz = O.izlenenId && O.izlenenId(), kat = iz && DO.Canli.katilimcilar[iz];
      if (kat && kat.puan != null) p = kat.puan;
    }
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
        DO.Canli.gonder('bitti', { blok: blok.id, puan: puan, max: max });
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

    /* ---- Canlı eşleme ----
       Bloktaki her anlamlı hareket bir "eylem"dir: ctx.eylemTanimla('ad', fn) ile tanımlanır,
       ctx.eylem('ad', veri) ile yapılır. fn(veri, k) her cihazda aynı şekilde çalışır;
       k.yerel   : bu cihazdaki kişi yaptı (cevap/puan yalnızca o zaman kaydedilir)
       k.tekrar  : geç katılan için geçmiş yeniden oynatılıyor (ses/kayıt yok)
       k.kim     : yapan kişi {id, ad, rol} */
    var eylemler = {};
    ctx.canliMi = canliMi;
    ctx.ortak = function () { return canliMi() && O.blokModu(blok) === 'ortak'; };
    // Hocamız bir öğrencinin ekranını yansıtıyor (kendi kendine hamle üretmez, sayaç bitirmez)
    ctx.izliyor = function () { return O.rol === 'ogretmen' && canliMi() && O.blokModu(blok) !== 'ortak' && !!O.izlenenId(); };
    ctx.takipte = function () { return O.rol === 'ogrenci' && canliMi() && O.kilit; };
    ctx.sesBende = sesBende;
    // Kendiliğinden ilerleme: canlı derste ekranları yalnızca öğretmen ilerletir
    ctx.otoIleri = function () { if (O.rol === 'ogrenci' && canliMi()) return; O.ileri(); };
    ctx.eylemTanimla = function (ad, fn) { eylemler[ad] = fn; };
    ctx.eylem = function (ad, veri, sec) {
      sec = sec || {};
      veri = veri || {};
      var ben = DO.Canli.ben || { id: O.ogrenci.id, ad: O.ogrenci.ad, rol: O.rol };
      if (!canliMi()) return uygula(ad, veri, { yerel: true, kim: ben });
      if (sec.ogretmen) {                       // yalnızca öğretmenin yapabileceği yönetim hareketleri
        if (O.rol !== 'ogretmen') return false;
        return yay(ad, veri, ben);
      }
      if (O.blokModu(blok) !== 'ortak') {
        if (O.rol === 'ogretmen') {
          if (O.izlenenId()) { bildir('Şu an ' + izlenenAd() + ' adlı öğrencinin ekranını görüyorsunuz.', 'bilgi'); return false; }
          return uygula(ad, veri, { yerel: true, kim: ben });
        }
        // Öğrenci kendi ekranında oynar; hamlesi Hocamızın ekranına da yansır
        (O.yerelGunluk[blok.id] = O.yerelGunluk[blok.id] || []).push({ ad: ad, veri: veri });
        DO.Canli.gonder('yansi', { blok: blok.id, ad: ad, veri: veri });
        return uygula(ad, veri, { yerel: true, kim: ben });
      }
      if (!O.yetkili(ben)) { bildir(yetkiMetni(), 'bilgi'); return false; }
      // Birden çok kişi aynı anda dokunabiliyorsa sıra öğretmende tutulur (herkeste aynı sıra)
      if (O.rol !== 'ogretmen' && O.odaDurum.yonetici === 'herkes' && DO.Canli.ogretmenVar()) {
        DO.Canli.gonder('eylemIste', { blok: blok.id, ad: ad, veri: veri });
        return true;
      }
      return yay(ad, veri, ben);
    };
    function yay(ad, veri, kim) {
      DO.Canli.gonder('eylem', { blok: blok.id, ad: ad, veri: veri, kim: kim });
      return uygula(ad, veri, { yerel: kim.id === (DO.Canli.ben && DO.Canli.ben.id), kim: kim });
    }
    function uygula(ad, veri, k) {
      var fn = eylemler[ad];
      if (!fn) return false;
      if (O.rol === 'ogretmen' && canliMi() && !k.tekrar && !k.yansi && O.blokModu(blok) === 'ortak') O.gunluk.push({ ad: ad, veri: veri, kim: k.kim });
      try { fn(veri, k); } catch (e) { console.error('eylem', ad, e); }
      return true;
    }
    O.aktifEylem = {
      blokId: blok.id,
      uygula: uygula,
      yay: yay,
      yeniden: function (gunluk) {
        var eski = DO.sesAcik; DO.sesAcik = false;
        (gunluk || []).forEach(function (g) { uygula(g.ad, g.veri, { yerel: false, tekrar: true, kim: g.kim }); });
        DO.sesAcik = eski;
      }
    };
    /* Karıştırma: canlı derste herkes aynı sırayı görür (Hocamız "ilk soru" deyince aynı soru).
       anahtar her karıştırma için sabit olmalı (ör. 'soru3'); tur, "tekrar oyna" ile artar. */
    var tur = 0;
    ctx.karistir = function (dizi, anahtar) {
      if (!canliMi()) return DO.karistir(dizi);
      return DO.tohumluKaristir(dizi, O.oda + '|' + blok.id + '|' + (anahtar || '') + '|' + tur);
    };
    ctx.yeniTur = function () { tur++; };
    /* Sesli anlatım: blok açılınca (ayar açıksa) çalar */
    ctx.anlatim = function (dosya, metin) {
      if (!dosya) return null;
      var ses = new Audio(O.yol(dosya));
      ses.preload = 'auto';
      var cal = function () {
        var p = ses.play(); if (p && p.catch) p.catch(function () { /* izin yok */ });
      };
      if (O.ayar.anlatim && sesBende()) ctx.zaman(cal, 450);
      O.temizlikler.push(function () { ses.pause(); ses.src = ''; });
      ses.addEventListener('ended', function () { ctx.kaydet('deneyimledi', { id: 'anlatim', ad: 'Sesli anlatım dinlendi' }); });
      return { ses: ses, cal: cal, durdur: function () { ses.pause(); } };
    };
    return ctx;
  }

  /* ---------------- Canlı ders yardımcıları ---------------- */
  function canliMi() { return DO.Canli.acik && (O.rol === 'ogretmen' || DO.Canli.ogretmenVar()); }
  O.canliMi = canliMi;
  /* Anlatım ve video sesi bu cihazda mı çalsın? Görüşmede çift ses ve yankı olmasın diye tek yerde çalar. */
  function sesBende() {
    if (!canliMi()) return true;
    return O.odaDurum.ses === (O.rol === 'ogretmen' ? 'ogretmen' : 'ogrenci');
  }
  O.sesBende = sesBende;
  O.yetkili = function (kim) {
    if (!kim) return false;
    if (kim.rol === 'ogretmen') return true;
    var y = O.odaDurum.yonetici;
    return y === 'herkes' || y === kim.id;
  };
  O.blokModu = function (blok) {
    var t = DO.Bloklar[blok.tur] || {};
    if (t.canli === 'bireysel-sabit') return 'bireysel';
    return O.odaDurum.modlar[blok.id] || blok.canli || t.canli || 'ortak';
  };
  /* Yansıtma: Hocamızın ekranında kimin ekranı görünür? (seçilen, yoksa ilk öğrenci) */
  O.izlenenId = function () {
    if (O.rol !== 'ogretmen' || !DO.Canli.acik) return null;
    var ogr = DO.Canli.ogrenciler();
    if (O.izlenenSecim && ogr.some(function (o) { return o.id === O.izlenenSecim; })) return O.izlenenSecim;
    var burada = ogr.filter(function (o) { return o.blok === O.i; });
    return (burada[0] || ogr[0] || {}).id || null;
  };
  function izlenenAd() { var k = DO.Canli.katilimcilar[O.izlenenId()]; return k ? k.ad : 'öğrenci'; }
  /* Yansıtılan ekranı baştan kur ve izlenen öğrencinin hamlelerini uygula */
  function yansiKur() {
    var blok = O.sira[O.i], iz = O.izlenenId();
    O.sonIzlenen = iz;
    if (!blok || !iz || O.blokModu(blok) === 'ortak' || !O.aktifEylem) return;
    var g = (O.yansi[blok.id] || {})[iz] || [];
    if (g.length) O.aktifEylem.yeniden(g);
    DO.Canli.gonder('yansiIste', { blok: blok.id }, iz);
  }
  function yetkiMetni() {
    var y = O.odaDurum.yonetici;
    if (y === 'ogretmen') return 'Şu an ekranı Hocamız yönetiyor. Söz istemek için ✋';
    var k = DO.Canli.katilimcilar[y];
    return (k ? k.ad : 'Bir arkadaşın') + ' şu an söz sahibi.';
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
    C.odaDurumu = function () { if (O.rol !== 'ogretmen') return null; O.odaDurum.kilit = O.kilit; return O.odaDurum; };

    /* Ortak ekran eylemleri (iki rol için de) */
    C.olay.on('eylem', function (m) {
      var v = m.veri, ae = O.aktifEylem, blok = O.sira[O.i];
      if (!ae || !blok || v.blok !== ae.blokId) return;
      var kim = v.kim || m.gonderen;
      // Gönderen öğretmen değilse yalnızca kendi adına ve yetkisi varsa
      if (m.gonderen.rol !== 'ogretmen') {
        if (!kim || kim.id !== m.gonderen.id || O.blokModu(blok) !== 'ortak' || !O.yetkili(kim)) return;
      }
      ae.uygula(v.ad, v.veri, { yerel: !!(C.ben && kim && kim.id === C.ben.id), kim: kim });
    });

    if (O.rol === 'ogrenci') {
      O.kilit = false;
      function odaUygula(d, blokSira) {
        if (!d) return;
        var blok = O.sira[O.i];
        var eskiMod = blok ? O.blokModu(blok) : null, eskiSes = sesBende();
        O.odaDurum = d;
        O.kilit = !!d.kilit;
        if (C.ben && d.yonetici === C.ben.id && O.elKalkik) { O.elKalkik = false; O.dom.elDug.classList.remove('aktif'); C.gonder('el', { kalkik: false }); bildir('✋ Söz sende — ekrana dokunabilirsin', 'puan'); }
        if (O.kilit && blokSira != null && blokSira !== O.i) { O.git(blokSira); }
        else if (blok && O.blokModu(blok) !== eskiMod) { O.git(O.i); }       // mod değişti: ekran baştan
        else if (eskiSes !== sesBende() && O.aktif) {
          if (O.aktif.anlatimDegisti) O.aktif.anlatimDegisti(sesBende() && O.ayar.anlatim);
          if (O.aktif.sesDegisti) O.aktif.sesDegisti(sesBende());
        }
        kilitSerit(); dugmeleriYaz();
      }
      C.olay.on('git', function (m) {
        if (m.veri.oda) { var d = m.veri.oda; d.kilit = !!m.veri.kilit; O.odaDurum = d; }
        O.kilit = !!m.veri.kilit;
        kilitSerit();
        if (O.kilit && m.veri.blok !== O.i) O.git(m.veri.blok);
        dugmeleriYaz();
      });
      C.olay.on('oda', function (m) { odaUygula(m.veri.durum, m.veri.blok); });
      C.olay.on('kilit', function (m) {
        O.kilit = !!m.veri.acik; O.odaDurum.kilit = O.kilit; kilitSerit(); dugmeleriYaz();
        if (O.kilit && m.veri.blok != null && m.veri.blok !== O.i) O.git(m.veri.blok);
      });
      C.olay.on('tanit', function (m) {
        if (m.gonderen.rol !== 'ogretmen') return;
        if (m.veri.oda) O.odaDurum = m.veri.oda;
        O.kilit = O.odaDurum.kilit !== false;
        kilitSerit();
        if (O.kilit && m.veri.blok !== O.i) O.git(m.veri.blok);
        else C.gonder('durumIste', { blok: O.sira[O.i].id });
        dugmeleriYaz();
      });
      // Ekranın o anki hâli (geç katılma / kopup dönme)
      C.olay.on('blokDurum', function (m) {
        var v = m.veri, blok = O.sira[O.i];
        if (m.gonderen.rol !== 'ogretmen' || !blok || v.blok !== blok.id) return;
        if (v.mod && O.blokModu(blok) !== v.mod) { O.odaDurum.modlar[blok.id] = v.mod; O.git(O.i); return; }
        if (O.blokModu(blok) === 'ortak' && O.aktifEylem && v.gunluk && v.gunluk.length) O.aktifEylem.yeniden(v.gunluk);
      });
      C.olay.on('yansiIste', function (m) {
        if (m.gonderen.rol !== 'ogretmen') return;
        var blok = O.sira[O.i];
        if (!blok || blok.id !== m.veri.blok) return;
        C.gonder('yansiGunluk', { blok: blok.id, gunluk: O.yerelGunluk[blok.id] || [] }, m.gonderen.id);
      });
      C.olay.on('isaret', function (m) { lazerGoster(m.veri); });
      C.olay.on('mesaj', function (m) { bildir('Hocamız: ' + m.veri.metin, 'bilgi'); });
      C.olay.on('baglanti', kilitSerit);
      C.olay.on('katilim', kilitSerit);
    } else {
      O.kilit = true;
      ['katilim', 'cevap', 'puan', 'el', 'konum', 'tanit', 'merhaba', 'baglanti', 'bitti'].forEach(function (t) { C.olay.on(t, panelYaz); });
      C.olay.on('ifade', function (m) { if (m.veri && m.veri.id) Kayit().disaridanSakla(m.veri); });
      C.olay.on('el', function (m) { if (m.veri.kalkik) { bildir('✋ ' + m.gonderen.ad + ' söz istiyor', 'bilgi'); DO.efekt.tik(); } });
      C.olay.on('cevap', function (m) {
        var c = m.veri;
        (O.canliCevaplar = O.canliCevaplar || []).push({ id: m.gonderen.id, ad: m.gonderen.ad, blok: c.blok, oge: c.oge, soru: c.ad, yanit: c.yanit, dogru: c.dogru, t: Date.now() });
        panelYaz();
      });
      C.olay.on('bitti', function (m) {
        (O.bitirenler = O.bitirenler || {})[m.veri.blok + '|' + m.gonderen.id] = true;
        if (m.gonderen.rol === 'ogretmen') return;
        var d = (O.ogrDurum[m.gonderen.id] = O.ogrDurum[m.gonderen.id] || {}), e = d[m.veri.blok];
        if (!e || m.veri.puan >= (e.puan || 0)) d[m.veri.blok] = { tamam: true, puan: m.veri.puan || 0, max: m.veri.max || 0 };
        if (O.aktif && O.aktif.ogrenciBitirdi) O.aktif.ogrenciBitirdi(m.gonderen.id);
      });
      C.olay.on('puan', function () { puanYaz(); });
      // Öğrencinin kendi ekranındaki hamle: izlenen öğrenciyse Hocamızın ekranında da oynar
      C.olay.on('yansi', function (m) {
        var v = m.veri, id = m.gonderen.id, blok = O.sira[O.i];
        var b = (O.yansi[v.blok] = O.yansi[v.blok] || {});
        var buEkran = blok && blok.id === v.blok && O.blokModu(blok) !== 'ortak' && O.izlenenId() === id;
        if (v.ad === '__bas') { b[id] = []; if (buEkran && O.aktifEylem && O.aktifEylem.blokId === v.blok) O.git(O.i); return; }
        (b[id] = b[id] || []).push({ ad: v.ad, veri: v.veri });
        if (buEkran && O.aktifEylem && O.aktifEylem.blokId === v.blok) O.aktifEylem.uygula(v.ad, v.veri, { yerel: false, yansi: true, kim: { id: id, ad: m.gonderen.ad, rol: 'ogrenci' } });
      });
      // Geç gelen Hocamız (ya da sayfayı yenileyen): öğrencinin tam hamle listesi
      C.olay.on('yansiGunluk', function (m) {
        var v = m.veri, id = m.gonderen.id, b = (O.yansi[v.blok] = O.yansi[v.blok] || {});
        var eski = (b[id] || []).length;
        if (!v.gunluk || v.gunluk.length <= eski) return;
        b[id] = v.gunluk.slice();
        var blok = O.sira[O.i];
        if (blok && blok.id === v.blok && O.blokModu(blok) !== 'ortak' && O.izlenenId() === id) O.git(O.i);
      });
      // İzlenen öğrenci değişti (ilk öğrenci geldi, ayrıldı): yansıtılan ekranı yenile
      C.olay.on('katilim', function () {
        var blok = O.sira[O.i];
        if (blok && O.blokModu(blok) !== 'ortak' && O.izlenenId() !== O.sonIzlenen) O.git(O.i);
        puanYaz(); kilitSerit();
      });
      // Öğrenci ortak ekranda hareket istiyor (herkes dokunabilirken sıra burada tutulur)
      C.olay.on('eylemIste', function (m) {
        var v = m.veri, ae = O.aktifEylem, blok = O.sira[O.i];
        if (!ae || !blok || v.blok !== ae.blokId || O.blokModu(blok) !== 'ortak' || !O.yetkili(m.gonderen)) return;
        ae.yay(v.ad, v.veri, { id: m.gonderen.id, ad: m.gonderen.ad, rol: m.gonderen.rol });
      });
      C.olay.on('durumIste', function (m) {
        var blok = O.sira[O.i];
        if (!blok || m.veri.blok !== blok.id) return;
        C.gonder('blokDurum', { blok: blok.id, mod: O.blokModu(blok), gunluk: O.gunluk }, m.gonderen.id);
      });
      C.olay.on('merhaba', function () { odaGonder(); });
    }
    kilitSerit();
  }
  /* Öğretmen: oda durumunu herkese duyur */
  function odaGonder() {
    O.odaDurum.kilit = O.kilit;
    try { sessionStorage.setItem('do:oda:' + O.oda, JSON.stringify(O.odaDurum)); } catch (e) { /* yok */ }
    DO.Canli.gonder('oda', { durum: O.odaDurum, blok: O.i });
  }
  O.odaDegistir = function (degisiklik) {
    var blok = O.sira[O.i], eskiMod = blok ? O.blokModu(blok) : null, eskiSes = sesBende();
    Object.keys(degisiklik).forEach(function (k) { O.odaDurum[k] = degisiklik[k]; });
    odaGonder();
    if (blok && O.blokModu(blok) !== eskiMod) O.git(O.i);
    else if (eskiSes !== sesBende() && O.aktif) {
      if (O.aktif.anlatimDegisti) O.aktif.anlatimDegisti(sesBende() && O.ayar.anlatim);
      if (O.aktif.sesDegisti) O.aktif.sesDegisti(sesBende());
    }
    panelYaz();
  };
  function kilitSerit() {
    var s = O.dom.kilitSerit;
    if (O.rol === 'ogrenci') {
      var ogretmen = DO.Canli.ogretmenVar();
      var hata = DO.Canli.baglanti.firebase === 'hata';
      s.textContent = hata ? '✗ Bağlantı kurulamadı — internetini kontrol et (oda ' + O.oda + ')'
        : !ogretmen ? 'Hocamız bekleniyor… (oda ' + O.oda + ')'
        : (DO.Canli.ben && O.odaDurum.yonetici === DO.Canli.ben.id) ? '✋ Söz sende — ekrana sen dokunabilirsin'
        : O.odaDurum.yonetici === 'herkes' ? '👥 Herkes ekrana dokunabilir'
        : O.kilit ? '🔒 Hocamızı takip ediyorsun' : '🔓 Serbest çalışma';
      s.className = 'kilit-serit gorunur' + (O.kilit ? ' kilitli' : '');
    } else if (O.rol === 'ogretmen') {
      var blok = O.sira[O.i], iz = O.izlenenId && O.izlenenId();
      if (blok && iz && O.blokModu(blok) !== 'ortak') {
        s.innerHTML = '';
        s.appendChild(el('span', { text: '👁 ' + izlenenAd() + ' adlı öğrencinin ekranı' }));
        DO.Canli.ogrenciler().forEach(function (o) {
          if (o.id === iz) return;
          s.appendChild(el('button', { class: 'izle-dug', text: o.ad, onclick: function () { O.izlenenSecim = o.id; O.git(O.i); } }));
        });
        s.className = 'kilit-serit gorunur izleme';
      } else s.className = 'kilit-serit';
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
        el('input', { type: 'checkbox', checked: O.kilit, onchange: function () { O.kilit = this.checked; O.odaDegistir({ kilit: O.kilit }); } }),
        el('span', { text: 'Öğrenciler beni takip etsin' })
      ]),
      el('label', { class: 'anahtar' }, [
        el('input', { type: 'checkbox', checked: !!O.lazerAcik, onchange: function () { O.lazerAcik = this.checked; } }),
        el('span', { text: 'Lazer işaretçi' })
      ])
    ]));
    function secim(baslik, secenekler, deger, degistir) {
      return el('div', { class: 'panel-secim' }, [
        el('span', { class: 'secim-baslik', text: baslik }),
        el('div', { class: 'secim' }, secenekler.map(function (o) {
          return el('button', { class: o.d === deger ? 'secili' : '', text: o.ad, title: o.ipucu || '', onclick: function () { if (o.d !== deger) degistir(o.d); } });
        }))
      ]);
    }
    var yon = [{ d: 'ogretmen', ad: 'Yalnız ben' }, { d: 'herkes', ad: 'Herkes' }];
    ogrenciler.forEach(function (o) { yon.push({ d: o.id, ad: (o.el ? '✋ ' : '') + o.ad }); });
    if (O.odaDurum.yonetici !== 'ogretmen' && O.odaDurum.yonetici !== 'herkes' && !ogrenciler.some(function (o) { return o.id === O.odaDurum.yonetici; })) O.odaDurum.yonetici = 'ogretmen';
    p.appendChild(secim('Ortak ekrana kim dokunsun', yon, O.odaDurum.yonetici, function (d) {
      if (d !== 'ogretmen' && d !== 'herkes' && C.katilimcilar[d]) C.katilimcilar[d].el = false;
      O.odaDegistir({ yonetici: d });
    }));
    p.appendChild(secim('Anlatım ve video sesi', [
      { d: 'ogretmen', ad: 'Bende', ipucu: 'Ses sizin cihazınızda çalar, görüşmeden öğrencilere gider' },
      { d: 'ogrenci', ad: 'Öğrencilerde', ipucu: 'Ses her öğrencinin cihazında çalar; sizinki sessiz kalır' }
    ], O.odaDurum.ses, function (d) { O.odaDegistir({ ses: d }); }));
    var tanimB = DO.Bloklar[blok.tur] || {};
    if (tanimB.ortakDestek) {
      p.appendChild(secim('Bu etkinlik', [
        { d: 'ortak', ad: 'Birlikte, tek ekran', ipucu: 'Tek oyun tahtası; kim dokunursa herkesin ekranında aynısı olur' },
        { d: 'bireysel', ad: 'Herkes kendi oynasın', ipucu: 'Her öğrenci kendi ekranında oynar; sizin ekranınızda seçtiğiniz öğrencinin ekranı görünür' }
      ], O.blokModu(blok), function (d) { var m = {}; Object.keys(O.odaDurum.modlar).forEach(function (k) { m[k] = O.odaDurum.modlar[k]; }); m[blok.id] = d; O.odaDegistir({ modlar: m }); }));
    }

    if (O.blokModu(blok) !== 'ortak' && ogrenciler.length) {
      p.appendChild(secim('Ekranımda kimin ekranı görünsün', ogrenciler.map(function (o) { return { d: o.id, ad: o.ad }; }), O.izlenenId(), function (d) { O.izlenenSecim = d; O.git(O.i); }));
    }
    p.appendChild(el('h3', { text: 'Öğrenciler (' + ogrenciler.length + ')' }));
    if (!ogrenciler.length) p.appendChild(el('p', { class: 'panel-bos', html: 'Henüz kimse katılmadı. Davet bağlantısını öğrenciye gönderin.<br><small>Deneme için bağlantıyı bu tarayıcıda yeni bir sekmede açabilirsiniz.</small>' }));
    var cevaplar = (O.canliCevaplar || []).filter(function (c) { return c.blok === blok.id; });
    ogrenciler.forEach(function (o) {
      var buBlok = cevaplar.filter(function (c) { return c.id === o.id; });
      var dogru = buBlok.filter(function (c) { return c.dogru === true; }).length;
      var yanlis = buBlok.filter(function (c) { return c.dogru === false; }).length;
      var ayni = o.blok === O.i;
      var bitirdi = O.bitirenler && O.bitirenler[blok.id + '|' + o.id];
      var sozde = O.odaDurum.yonetici === o.id;
      p.appendChild(el('div', { class: 'ogr-kart' + (o.el ? ' el' : '') + (sozde ? ' sozde' : '') }, [
        el('div', { class: 'ogr-ust' }, [
          el('b', { text: (o.el ? '✋ ' : '') + o.ad }),
          el('span', { class: 'ogr-puan', text: '★ ' + (o.puan || 0) })
        ]),
        el('div', { class: 'ogr-alt' }, [
          el('span', { class: 'ogr-konum' + (ayni ? ' ayni' : ''), text: ayni ? 'Bu ekranda' : 'Ekran ' + ((o.blok || 0) + 1) }),
          buBlok.length ? el('span', { class: 'ogr-cevap', html: '<i class="d">✓ ' + dogru + '</i> <i class="y">✗ ' + yanlis + '</i>' }) : null,
          bitirdi ? el('span', { class: 'ogr-bitti', text: '✓ bitirdi' }) : null,
          el('button', { class: 'soz-dug', text: sozde ? 'Sözü al' : 'Söz ver', onclick: function () {
            if (!sozde) o.el = false;
            O.odaDegistir({ yonetici: sozde ? 'ogretmen' : o.id });
          } })
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
    var mg = el('input', { type: 'text', placeholder: 'Öğrencilere kısa mesaj…', maxlength: 80, value: O.panelMesaj || '', oninput: function () { O.panelMesaj = this.value; } });
    hizli.appendChild(mg);
    hizli.appendChild(el('button', { class: 'dug kucuk', text: 'Gönder', onclick: function () { if (mg.value.trim()) { C.gonder('mesaj', { metin: mg.value.trim() }); bildir('Mesaj gönderildi', 'bilgi'); mg.value = ''; O.panelMesaj = ''; } } }));
    p.appendChild(hizli);
    p.appendChild(el('a', { class: 'dug kucuk ikincil tam', href: 'rapor.html?ders=' + encodeURIComponent(O.ders.id) + '&oda=' + encodeURIComponent(O.oda), target: '_blank', text: 'Ders raporunu aç ↗' }));
  }
  O.panelYaz = panelYaz;
})();
