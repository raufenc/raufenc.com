// Sahne kurulumu — her sahne için yerleşim, dekor ve nesne pozisyonları
(function (global) {
  'use strict';

  // Bir nesne yerleşimi: {kelimeId, model, gridX, gridZ, scale}
  // gridX/gridZ = dünya konumu (CUBE birimi cinsinden)
  // Renderer bunu izometrik ekrana dönüştürür

  function spreadGrid(idler, perRow) {
    // Yapay zekanın istenmediği basit ızgara: nesneleri perRow başına sıralar
    const out = [];
    perRow = perRow || 4;
    for (let i = 0; i < idler.length; i++) {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      out.push({ kelimeId: idler[i], gridX: col * 4 - perRow * 2, gridZ: row * 4 });
    }
    return out;
  }

  // === Manav sahnesi ===
  function manavSahne(kelimeIdler) {
    const yerlesim = [];
    // Üst sıra: 5 meyve
    const ust = kelimeIdler.slice(0, 5);
    const alt = kelimeIdler.slice(5);
    ust.forEach((id, i) => {
      yerlesim.push({ kelimeId: id, gridX: i * 4 - 8, gridZ: -3, scale: 1 });
    });
    alt.forEach((id, i) => {
      yerlesim.push({ kelimeId: id, gridX: i * 4 - (alt.length - 1) * 2, gridZ: 4, scale: 1 });
    });
    return {
      yerlesim,
      arkaplan: {
        renk1: '#bce8ff',
        renk2: '#e8f4ff',
        yer1: '#d2bfa3',
        yer2: '#bea688',
        dekor: 'manav'
      }
    };
  }

  // === Araçlar sahnesi ===
  function araclarSahne(kelimeIdler) {
    const yerlesim = [];
    const ust = kelimeIdler.slice(0, 3);
    const alt = kelimeIdler.slice(3);
    ust.forEach((id, i) => {
      yerlesim.push({ kelimeId: id, gridX: i * 8 - 8, gridZ: -4, scale: 1 });
    });
    alt.forEach((id, i) => {
      yerlesim.push({ kelimeId: id, gridX: i * 8 - 8, gridZ: 4, scale: 1 });
    });
    return {
      yerlesim,
      arkaplan: {
        renk1: '#7ec0ff',
        renk2: '#dbeeff',
        yer1: '#888',
        yer2: '#a8a8a8',
        dekor: 'sehir'
      }
    };
  }

  // === Hayvanlar sahnesi ===
  function hayvanlarSahne(kelimeIdler) {
    const yerlesim = [];
    const ust = kelimeIdler.slice(0, 4);
    const alt = kelimeIdler.slice(4);
    ust.forEach((id, i) => {
      yerlesim.push({ kelimeId: id, gridX: i * 5 - 7.5, gridZ: -3, scale: 1 });
    });
    alt.forEach((id, i) => {
      yerlesim.push({ kelimeId: id, gridX: i * 5 - (alt.length - 1) * 2.5, gridZ: 4, scale: 1 });
    });
    return {
      yerlesim,
      arkaplan: {
        renk1: '#bce8ff',
        renk2: '#dff6e0',
        yer1: '#7ec96a',
        yer2: '#5fb050',
        dekor: 'cayir'
      }
    };
  }

  function olustur(sahneId, kelimeIdler) {
    if (sahneId === 'manav') return manavSahne(kelimeIdler);
    if (sahneId === 'araclar') return araclarSahne(kelimeIdler);
    if (sahneId === 'hayvanlar') return hayvanlarSahne(kelimeIdler);
    return { yerlesim: spreadGrid(kelimeIdler, 4), arkaplan: {} };
  }

  global.Scenes = { olustur };
})(window);
