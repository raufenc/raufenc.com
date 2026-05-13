// Voksel modeller — her nesne {x,y,z,c} dizisi
// x = sağa, y = yukarı, z = içeri (ekrandan içeri).
// Model orta noktası ~ (0, 0, 0) civarında olacak şekilde tasarlandı.
(function (global) {
  'use strict';

  // Renk paleti
  const C = {
    elma_kirmizi: '#e23636',
    elma_kirmizi_koyu: '#b51e1e',
    yaprak_yesil: '#3aa346',
    sap_kahve: '#6b3f1f',
    portakal: '#f29220',
    portakal_koyu: '#cf6f06',
    muz_sari: '#f5c61a',
    muz_kahve: '#7a4d12',
    uzum_mor: '#7b3fa0',
    uzum_koyu: '#5b2380',
    cilek_kirmizi: '#e23a5e',
    cilek_yesil: '#56a14a',
    karpuz_yesil: '#2e7d32',
    karpuz_yesil_acik: '#5cab5f',
    karpuz_kirmizi: '#e64545',
    karpuz_siyah: '#222',
    domates: '#d83a3a',
    salatalik: '#5a9a3b',
    salatalik_koyu: '#3a6b22',
    havuc: '#ef7a1a',
    havuc_yapraK: '#3aa346',
    patates: '#b88a52',

    araba_govde: '#1d72d8',
    araba_govde_koyu: '#0d4a96',
    cam: '#9fd8ff',
    teker: '#1c1c1c',
    far: '#fff39c',

    ucak_govde: '#e8e8ec',
    ucak_govde_koyu: '#b6b6c0',
    ucak_kanat: '#cfd1d6',
    ucak_kuyruk: '#d83a3a',

    gemi_govde: '#9c4318',
    gemi_govde_koyu: '#6b2a0e',
    gemi_kabin: '#f1efe6',
    gemi_kabin_koyu: '#c7c1ad',
    bayrak: '#d83a3a',

    bisiklet_iskelet: '#36b3a0',
    bisiklet_lastik: '#222',
    bisiklet_jant: '#cccccc',

    otobus: '#f1b228',
    otobus_koyu: '#bb8512',

    tren: '#2b6cb0',
    tren_baca: '#1c1c1c',

    kedi: '#c4965b',
    kedi_koyu: '#7a5a30',
    kedi_pembe: '#f0a8a8',
    kopek: '#8a5a2b',
    kopek_koyu: '#5c3a18',
    kopek_burun: '#1c1c1c',
    kus: '#3a9be0',
    kus_kanat: '#2173b2',
    gaga: '#f0a020',
    aslan: '#dd9a3a',
    aslan_yele: '#a05f1c',
    aslan_burun: '#1c1c1c',
    balik: '#ff8a3a',
    balik_koyu: '#cc5a18',
    inek_beyaz: '#f3f3f3',
    inek_siyah: '#1c1c1c',
    inek_pembe: '#f0a8a8',
    tavsan_beyaz: '#fafafa',
    tavsan_pembe: '#f0a8a8',
    tavsan_goz: '#222'
  };

  // Yardımcı: belirli bir kutu doldur
  function fillBox(arr, x0, x1, y0, y1, z0, z1, color) {
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) {
        for (let z = z0; z <= z1; z++) {
          arr.push({ x, y, z, c: color });
        }
      }
    }
  }

  // === MEYVELER ===
  function elma() {
    const v = [];
    // Gövde — sferimsi yığın (3x4x3)
    fillBox(v, -1, 1, 0, 2, -1, 1, C.elma_kirmizi);
    // Köşeleri ezme
    v.push({ x: -1, y: 0, z: -1, c: C.elma_kirmizi_koyu });
    v.push({ x:  1, y: 0, z: -1, c: C.elma_kirmizi_koyu });
    v.push({ x: -1, y: 0, z:  1, c: C.elma_kirmizi_koyu });
    v.push({ x:  1, y: 0, z:  1, c: C.elma_kirmizi_koyu });
    // Sap
    v.push({ x: 0, y: 3, z: 0, c: C.sap_kahve });
    // Yaprak
    v.push({ x: 1, y: 3, z: 0, c: C.yaprak_yesil });
    return v;
  }

  function portakal() {
    const v = [];
    fillBox(v, -1, 1, 0, 2, -1, 1, C.portakal);
    v.push({ x: -1, y: 0, z: -1, c: C.portakal_koyu });
    v.push({ x:  1, y: 0, z: -1, c: C.portakal_koyu });
    v.push({ x: -1, y: 0, z:  1, c: C.portakal_koyu });
    v.push({ x:  1, y: 0, z:  1, c: C.portakal_koyu });
    v.push({ x: 0, y: 3, z: 0, c: C.yaprak_yesil });
    return v;
  }

  function muz() {
    const v = [];
    // Eğri muz — diagonal kademe
    v.push({ x: -2, y: 0, z: 0, c: C.muz_sari });
    v.push({ x: -1, y: 0, z: 0, c: C.muz_sari });
    v.push({ x: -1, y: 1, z: 0, c: C.muz_sari });
    v.push({ x:  0, y: 1, z: 0, c: C.muz_sari });
    v.push({ x:  0, y: 2, z: 0, c: C.muz_sari });
    v.push({ x:  1, y: 2, z: 0, c: C.muz_sari });
    v.push({ x:  1, y: 1, z: 0, c: C.muz_sari });
    v.push({ x:  2, y: 1, z: 0, c: C.muz_sari });
    // Uç (kahve)
    v.push({ x: -2, y: 0, z: 0, c: C.muz_kahve }); // üzerine yaz
    return v;
  }

  function uzum() {
    const v = [];
    // Salkım — küçük küreler
    const pts = [
      [-1, 2, 0], [1, 2, 0], [0, 2, -1], [0, 2, 1],
      [-1, 1, 0], [1, 1, 0], [0, 1, -1], [0, 1, 1], [0, 1, 0],
      [-1, 0, 0], [1, 0, 0], [0, 0, 0],
      [0, -1, 0]
    ];
    for (const p of pts) v.push({ x: p[0], y: p[1], z: p[2], c: C.uzum_mor });
    // Yaprak
    v.push({ x: 0, y: 3, z: 0, c: C.yaprak_yesil });
    v.push({ x: 1, y: 3, z: 0, c: C.yaprak_yesil });
    return v;
  }

  function cilek() {
    const v = [];
    fillBox(v, -1, 1, 0, 1, -1, 1, C.cilek_kirmizi);
    // Sivri uç
    v.push({ x: 0, y: -1, z: 0, c: C.cilek_kirmizi });
    // Yapraklar
    v.push({ x: 0, y: 2, z: 0, c: C.cilek_yesil });
    v.push({ x: -1, y: 2, z: 0, c: C.cilek_yesil });
    v.push({ x: 1, y: 2, z: 0, c: C.cilek_yesil });
    v.push({ x: 0, y: 2, z: -1, c: C.cilek_yesil });
    v.push({ x: 0, y: 2, z: 1, c: C.cilek_yesil });
    return v;
  }

  function karpuz() {
    const v = [];
    fillBox(v, -2, 2, 0, 2, -2, 2, C.karpuz_yesil);
    // Açık şeritler
    for (let y = 0; y <= 2; y++) {
      v.push({ x: -2, y, z: 0, c: C.karpuz_yesil_acik });
      v.push({ x:  2, y, z: 0, c: C.karpuz_yesil_acik });
      v.push({ x:  0, y, z: -2, c: C.karpuz_yesil_acik });
      v.push({ x:  0, y, z:  2, c: C.karpuz_yesil_acik });
    }
    return v;
  }

  // === SEBZELER ===
  function domates() {
    const v = [];
    fillBox(v, -1, 1, 0, 1, -1, 1, C.domates);
    v.push({ x: 0, y: 2, z: 0, c: C.yaprak_yesil });
    v.push({ x: 1, y: 2, z: 0, c: C.yaprak_yesil });
    v.push({ x: -1, y: 2, z: 0, c: C.yaprak_yesil });
    return v;
  }

  function salatalik() {
    const v = [];
    // Uzun yatay
    for (let x = -2; x <= 2; x++) {
      v.push({ x, y: 0, z: 0, c: C.salatalik });
      v.push({ x, y: 1, z: 0, c: C.salatalik_koyu });
    }
    return v;
  }

  function havuc() {
    const v = [];
    // Konik turuncu (ters üçgen)
    v.push({ x: 0, y: -2, z: 0, c: C.havuc });
    fillBox(v, -1, 1, -1, -1, 0, 0, C.havuc);
    fillBox(v, -1, 1, 0, 0, -1, 1, C.havuc);
    // Yapraklar
    v.push({ x: 0, y: 1, z: 0, c: C.havuc_yapraK });
    v.push({ x: 0, y: 2, z: 0, c: C.havuc_yapraK });
    v.push({ x: -1, y: 1, z: 0, c: C.havuc_yapraK });
    v.push({ x: 1, y: 1, z: 0, c: C.havuc_yapraK });
    return v;
  }

  function patates() {
    const v = [];
    fillBox(v, -1, 1, 0, 1, -1, 1, C.patates);
    return v;
  }

  // === ARAÇLAR ===
  function araba() {
    const v = [];
    // Alt gövde
    fillBox(v, -3, 3, 0, 1, -1, 1, C.araba_govde);
    // Üst kabin
    fillBox(v, -2, 2, 2, 3, -1, 1, C.araba_govde_koyu);
    // Camlar
    fillBox(v, -2, 2, 2, 2, -1, -1, C.cam);
    fillBox(v, -2, 2, 2, 2, 1, 1, C.cam);
    v.push({ x: -2, y: 3, z: 0, c: C.cam });
    v.push({ x: 2, y: 3, z: 0, c: C.cam });
    // Tekerler
    v.push({ x: -2, y: -1, z: -1, c: C.teker });
    v.push({ x:  2, y: -1, z: -1, c: C.teker });
    v.push({ x: -2, y: -1, z:  1, c: C.teker });
    v.push({ x:  2, y: -1, z:  1, c: C.teker });
    // Farlar
    v.push({ x: 3, y: 1, z: -1, c: C.far });
    v.push({ x: 3, y: 1, z:  1, c: C.far });
    return v;
  }

  function ucak() {
    const v = [];
    // Gövde (uzun silindirimsi)
    fillBox(v, -4, 4, 0, 1, 0, 0, C.ucak_govde);
    // Burun
    v.push({ x: 5, y: 0, z: 0, c: C.ucak_govde });
    v.push({ x: 5, y: 1, z: 0, c: C.ucak_govde });
    // Kuyruk
    v.push({ x: -4, y: 2, z: 0, c: C.ucak_kuyruk });
    v.push({ x: -4, y: 3, z: 0, c: C.ucak_kuyruk });
    v.push({ x: -3, y: 2, z: 0, c: C.ucak_kuyruk });
    // Kanatlar
    for (let z = -3; z <= 3; z++) {
      if (z !== 0) v.push({ x: 0, y: 0, z, c: C.ucak_kanat });
    }
    v.push({ x: 1, y: 0, z: -2, c: C.ucak_kanat });
    v.push({ x: 1, y: 0, z:  2, c: C.ucak_kanat });
    // Camlar
    v.push({ x: 3, y: 1, z: 0, c: C.cam });
    v.push({ x: 4, y: 1, z: 0, c: C.cam });
    return v;
  }

  function gemi() {
    const v = [];
    // Gövde — V şekilli
    fillBox(v, -3, 3, 0, 0, -1, 1, C.gemi_govde);
    fillBox(v, -3, 3, 1, 1, -2, 2, C.gemi_govde);
    fillBox(v, -2, 2, -1, -1, 0, 0, C.gemi_govde_koyu);
    // Kabin
    fillBox(v, -1, 1, 2, 3, -1, 1, C.gemi_kabin);
    // Camlar
    fillBox(v, -1, 1, 2, 2, -1, -1, C.cam);
    // Direk + bayrak
    v.push({ x: 0, y: 4, z: 0, c: C.sap_kahve });
    v.push({ x: 0, y: 5, z: 0, c: C.sap_kahve });
    v.push({ x: 1, y: 5, z: 0, c: C.bayrak });
    return v;
  }

  function bisiklet() {
    const v = [];
    // İki tekerlek (önden)
    const wheel = (cx, cy) => {
      v.push({ x: cx, y: cy + 1, z: 0, c: C.bisiklet_jant });
      v.push({ x: cx, y: cy - 1, z: 0, c: C.bisiklet_jant });
      v.push({ x: cx - 1, y: cy, z: 0, c: C.bisiklet_jant });
      v.push({ x: cx + 1, y: cy, z: 0, c: C.bisiklet_jant });
      v.push({ x: cx, y: cy, z: 0, c: C.bisiklet_iskelet });
    };
    wheel(-2, 0);
    wheel(2, 0);
    // İskelet
    v.push({ x: -1, y: 1, z: 0, c: C.bisiklet_iskelet });
    v.push({ x: 0, y: 1, z: 0, c: C.bisiklet_iskelet });
    v.push({ x: 1, y: 1, z: 0, c: C.bisiklet_iskelet });
    v.push({ x: 0, y: 2, z: 0, c: C.bisiklet_iskelet });
    v.push({ x: 2, y: 2, z: 0, c: C.bisiklet_iskelet });
    return v;
  }

  function otobus() {
    const v = [];
    // Uzun gövde
    fillBox(v, -4, 4, 0, 2, -1, 1, C.otobus);
    // Tavan
    fillBox(v, -4, 4, 3, 3, -1, 1, C.otobus_koyu);
    // Camlar — sıra halinde
    for (let x = -3; x <= 3; x += 2) {
      v.push({ x, y: 2, z: -1, c: C.cam });
      v.push({ x, y: 2, z:  1, c: C.cam });
    }
    // Tekerler
    v.push({ x: -3, y: -1, z: -1, c: C.teker });
    v.push({ x:  3, y: -1, z: -1, c: C.teker });
    v.push({ x: -3, y: -1, z:  1, c: C.teker });
    v.push({ x:  3, y: -1, z:  1, c: C.teker });
    return v;
  }

  function tren() {
    const v = [];
    // Lokomotif
    fillBox(v, -2, 3, 0, 2, -1, 1, C.tren);
    fillBox(v, -2, -1, 3, 3, -1, 1, C.tren);
    // Baca
    v.push({ x: 2, y: 3, z: 0, c: C.tren_baca });
    v.push({ x: 2, y: 4, z: 0, c: C.tren_baca });
    // Camlar
    v.push({ x: -1, y: 2, z: -1, c: C.cam });
    v.push({ x: -1, y: 2, z:  1, c: C.cam });
    v.push({ x: 0, y: 2, z: -1, c: C.cam });
    v.push({ x: 0, y: 2, z:  1, c: C.cam });
    // Tekerler
    v.push({ x: -2, y: -1, z: -1, c: C.teker });
    v.push({ x:  0, y: -1, z: -1, c: C.teker });
    v.push({ x:  2, y: -1, z: -1, c: C.teker });
    v.push({ x: -2, y: -1, z:  1, c: C.teker });
    v.push({ x:  0, y: -1, z:  1, c: C.teker });
    v.push({ x:  2, y: -1, z:  1, c: C.teker });
    return v;
  }

  // === HAYVANLAR ===
  function kedi() {
    const v = [];
    // Gövde
    fillBox(v, -2, 1, 0, 1, -1, 1, C.kedi);
    // Kafa
    fillBox(v, 1, 2, 2, 3, -1, 1, C.kedi);
    // Kulaklar
    v.push({ x: 1, y: 4, z: -1, c: C.kedi });
    v.push({ x: 1, y: 4, z:  1, c: C.kedi });
    // Yüz
    v.push({ x: 3, y: 3, z: 0, c: C.kedi_pembe });
    // Kuyruk
    v.push({ x: -3, y: 1, z: 0, c: C.kedi });
    v.push({ x: -3, y: 2, z: 0, c: C.kedi });
    v.push({ x: -2, y: 2, z: 0, c: C.kedi });
    // Pati
    v.push({ x: -2, y: -1, z: -1, c: C.kedi_koyu });
    v.push({ x:  1, y: -1, z: -1, c: C.kedi_koyu });
    v.push({ x: -2, y: -1, z:  1, c: C.kedi_koyu });
    v.push({ x:  1, y: -1, z:  1, c: C.kedi_koyu });
    return v;
  }

  function kopek() {
    const v = [];
    fillBox(v, -2, 1, 0, 1, -1, 1, C.kopek);
    fillBox(v, 1, 2, 2, 2, -1, 1, C.kopek);
    fillBox(v, 2, 3, 1, 2, -1, 1, C.kopek);
    v.push({ x: 1, y: 3, z: -1, c: C.kopek_koyu });
    v.push({ x: 1, y: 3, z:  1, c: C.kopek_koyu });
    v.push({ x: 3, y: 1, z: 0, c: C.kopek_burun });
    // Kuyruk
    v.push({ x: -3, y: 2, z: 0, c: C.kopek });
    v.push({ x: -3, y: 1, z: 0, c: C.kopek });
    // Pati
    v.push({ x: -2, y: -1, z: -1, c: C.kopek_koyu });
    v.push({ x:  1, y: -1, z: -1, c: C.kopek_koyu });
    v.push({ x: -2, y: -1, z:  1, c: C.kopek_koyu });
    v.push({ x:  1, y: -1, z:  1, c: C.kopek_koyu });
    return v;
  }

  function kus() {
    const v = [];
    fillBox(v, -1, 1, 0, 1, -1, 1, C.kus);
    // Baş
    fillBox(v, 1, 2, 2, 2, 0, 0, C.kus);
    // Gaga
    v.push({ x: 3, y: 2, z: 0, c: C.gaga });
    // Kanat
    v.push({ x: 0, y: 1, z: -2, c: C.kus_kanat });
    v.push({ x: 0, y: 1, z:  2, c: C.kus_kanat });
    // Kuyruk
    v.push({ x: -2, y: 0, z: 0, c: C.kus_kanat });
    // Bacak
    v.push({ x: 0, y: -1, z: -1, c: C.gaga });
    v.push({ x: 0, y: -1, z:  1, c: C.gaga });
    return v;
  }

  function aslan() {
    const v = [];
    fillBox(v, -2, 1, 0, 1, -1, 1, C.aslan);
    // Yele
    fillBox(v, 1, 2, 1, 3, -1, 1, C.aslan_yele);
    // Yüz
    fillBox(v, 2, 3, 2, 2, 0, 0, C.aslan);
    v.push({ x: 4, y: 2, z: 0, c: C.aslan_burun });
    // Kuyruk
    v.push({ x: -3, y: 1, z: 0, c: C.aslan });
    v.push({ x: -3, y: 2, z: 0, c: C.aslan_yele });
    // Pati
    v.push({ x: -2, y: -1, z: -1, c: C.aslan });
    v.push({ x:  1, y: -1, z: -1, c: C.aslan });
    v.push({ x: -2, y: -1, z:  1, c: C.aslan });
    v.push({ x:  1, y: -1, z:  1, c: C.aslan });
    return v;
  }

  function balik() {
    const v = [];
    fillBox(v, -1, 2, 0, 1, 0, 0, C.balik);
    v.push({ x: 2, y: 0, z: 0, c: C.balik_koyu });
    v.push({ x: 2, y: 1, z: 0, c: C.balik_koyu });
    // Kuyruk
    v.push({ x: -2, y: 0, z: 0, c: C.balik_koyu });
    v.push({ x: -2, y: 1, z: 0, c: C.balik_koyu });
    v.push({ x: -2, y: 2, z: 0, c: C.balik });
    v.push({ x: -2, y: -1, z: 0, c: C.balik });
    // Yüzgeç
    v.push({ x: 0, y: 2, z: 0, c: C.balik_koyu });
    // Göz
    v.push({ x: 2, y: 1, z: 1, c: '#222' });
    return v;
  }

  function inek() {
    const v = [];
    fillBox(v, -2, 1, 1, 2, -1, 1, C.inek_beyaz);
    // Kafa
    fillBox(v, 1, 2, 2, 3, -1, 1, C.inek_beyaz);
    // Lekeler
    v.push({ x: -1, y: 2, z: -1, c: C.inek_siyah });
    v.push({ x:  0, y: 2, z:  1, c: C.inek_siyah });
    v.push({ x: -2, y: 1, z:  1, c: C.inek_siyah });
    // Burun
    v.push({ x: 3, y: 2, z: 0, c: C.inek_pembe });
    // Boynuz
    v.push({ x: 1, y: 4, z: -1, c: C.inek_beyaz });
    v.push({ x: 1, y: 4, z:  1, c: C.inek_beyaz });
    // Bacak
    v.push({ x: -2, y: 0, z: -1, c: C.inek_beyaz });
    v.push({ x:  1, y: 0, z: -1, c: C.inek_beyaz });
    v.push({ x: -2, y: 0, z:  1, c: C.inek_beyaz });
    v.push({ x:  1, y: 0, z:  1, c: C.inek_beyaz });
    return v;
  }

  function tavsan() {
    const v = [];
    fillBox(v, -1, 1, 0, 1, -1, 1, C.tavsan_beyaz);
    // Baş
    fillBox(v, 1, 2, 2, 3, -1, 1, C.tavsan_beyaz);
    // Uzun kulaklar
    v.push({ x: 1, y: 4, z: -1, c: C.tavsan_beyaz });
    v.push({ x: 1, y: 5, z: -1, c: C.tavsan_beyaz });
    v.push({ x: 1, y: 4, z:  1, c: C.tavsan_beyaz });
    v.push({ x: 1, y: 5, z:  1, c: C.tavsan_beyaz });
    // İçi pembe (üstüne yazılıyor)
    // Burun
    v.push({ x: 3, y: 2, z: 0, c: C.tavsan_pembe });
    // Göz
    v.push({ x: 2, y: 3, z: 1, c: C.tavsan_goz });
    // Patiler
    v.push({ x: -1, y: -1, z: -1, c: C.tavsan_beyaz });
    v.push({ x:  1, y: -1, z: -1, c: C.tavsan_beyaz });
    v.push({ x: -1, y: -1, z:  1, c: C.tavsan_beyaz });
    v.push({ x:  1, y: -1, z:  1, c: C.tavsan_beyaz });
    return v;
  }

  // === DEKOR ===
  // Tezgah / sergi standı
  function manavTezgahi() {
    const v = [];
    fillBox(v, -3, 3, 0, 1, -2, 2, '#a06330');
    fillBox(v, -3, 3, 2, 2, -2, 2, '#c98a4a');
    // Üst destek
    v.push({ x: -3, y: 3, z: -2, c: '#7a4818' });
    v.push({ x:  3, y: 3, z: -2, c: '#7a4818' });
    v.push({ x: -3, y: 3, z:  2, c: '#7a4818' });
    v.push({ x:  3, y: 3, z:  2, c: '#7a4818' });
    return v;
  }

  // Sepet (tek küme)
  function sepet() {
    const v = [];
    fillBox(v, -1, 1, 0, 0, -1, 1, '#8a5a2b');
    fillBox(v, -1, 1, 1, 1, -1, -1, '#a86d33');
    fillBox(v, -1, 1, 1, 1, 1, 1, '#a86d33');
    fillBox(v, -1, -1, 1, 1, -1, 1, '#a86d33');
    fillBox(v, 1, 1, 1, 1, -1, 1, '#a86d33');
    return v;
  }

  // Bulut
  function bulut() {
    const v = [];
    fillBox(v, -1, 1, 0, 1, -1, 1, '#fafafa');
    v.push({ x: -2, y: 0, z: 0, c: '#fafafa' });
    v.push({ x:  2, y: 0, z: 0, c: '#fafafa' });
    v.push({ x: 0, y: 1, z: -2, c: '#fafafa' });
    v.push({ x: 0, y: 1, z:  2, c: '#fafafa' });
    return v;
  }

  // Ağaç
  function agac() {
    const v = [];
    // Gövde
    v.push({ x: 0, y: 0, z: 0, c: C.sap_kahve });
    v.push({ x: 0, y: 1, z: 0, c: C.sap_kahve });
    v.push({ x: 0, y: 2, z: 0, c: C.sap_kahve });
    // Yapraklar
    fillBox(v, -1, 1, 3, 4, -1, 1, C.yaprak_yesil);
    v.push({ x: 0, y: 5, z: 0, c: C.yaprak_yesil });
    return v;
  }

  global.Models = {
    elma, portakal, muz, uzum, cilek, karpuz,
    domates, salatalik, havuc, patates,
    araba, ucak, gemi, bisiklet, otobus, tren,
    kedi, kopek, kus, aslan, balik, inek, tavsan,
    manavTezgahi, sepet, bulut, agac
  };
})(window);
