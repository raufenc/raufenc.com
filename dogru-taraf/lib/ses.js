// ============================================================
// HOSes — Hayal Ortaokulu ortak Web Audio ses katmanı
// Dosya YOK, tamamen sentez. Üç oyun da bunu paylaşır.
// Varsayılan KAPALI (localStorage'da tercih yoksa false say).
// ============================================================
(function(){
  'use strict';

  var SES_ANAHTARI = 'ses_acik_v1';
  var ctx = null;

  function baglamAl(){
    if(ctx) return ctx;
    try{
      var AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return null;
      ctx = new AC();
    }catch(e){ ctx = null; }
    return ctx;
  }

  function acikMi(){
    try{
      return localStorage.getItem(SES_ANAHTARI) === '1';
    }catch(e){ return false; }
  }

  function acKapa(){
    var yeni = !acikMi();
    try{ localStorage.setItem(SES_ANAHTARI, yeni ? '1' : '0'); }catch(e){}
    if(yeni) baglamAl(); /* ilk açılışta AudioContext'i kullanıcı etkileşimiyle canlandır */
    return yeni;
  }

  function devamEttir(c){
    if(c && c.state === 'suspended'){
      try{ c.resume(); }catch(e){}
    }
  }

  /* kısa (~90ms) yumuşak gürültü + inen bant geçiren süpürme — hafif kart kayma hissi
     (önceki sürüm sert/tiz bir cızırtıydı, her kartta duyulduğu için rahatsız ediciydi) */
  function kartHisirti(){
    if(!acikMi()) return;
    var c = baglamAl();
    if(!c) return;
    devamEttir(c);
    try{
      var sure = 0.09;
      var sayi = Math.round(c.sampleRate * sure);
      var buffer = c.createBuffer(1, sayi, c.sampleRate);
      var veri = buffer.getChannelData(0);
      for(var i=0;i<sayi;i++){ veri[i] = (Math.random()*2-1); }
      var kaynak = c.createBufferSource();
      kaynak.buffer = buffer;
      var kazanc = c.createGain();
      var simdi = c.currentTime;
      kazanc.gain.setValueAtTime(0.001, simdi);
      kazanc.gain.linearRampToValueAtTime(0.06, simdi + 0.015);
      kazanc.gain.exponentialRampToValueAtTime(0.001, simdi + sure);
      var filtre = c.createBiquadFilter();
      filtre.type = 'bandpass';
      filtre.Q.value = 0.6;
      filtre.frequency.setValueAtTime(2400, simdi);
      filtre.frequency.exponentialRampToValueAtTime(650, simdi + sure);
      kaynak.connect(filtre); filtre.connect(kazanc); kazanc.connect(c.destination);
      kaynak.start(simdi);
      kaynak.stop(simdi + sure);
    }catch(e){}
  }

  /* kısa (~150ms) düşük frekanslı (70-110Hz) yumuşak osilatör + hızlı decay — tur kapanış vuruşu
     (square yerine triangle: aynı "vuruş" hissi, daha az sert/uğultulu) */
  function tokmak(){
    if(!acikMi()) return;
    var c = baglamAl();
    if(!c) return;
    devamEttir(c);
    try{
      var simdi = c.currentTime;
      var sure = 0.15;
      var osc = c.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, simdi);
      osc.frequency.exponentialRampToValueAtTime(70, simdi + sure);
      var kazanc = c.createGain();
      kazanc.gain.setValueAtTime(0.4, simdi);
      kazanc.gain.exponentialRampToValueAtTime(0.001, simdi + sure);
      osc.connect(kazanc); kazanc.connect(c.destination);
      osc.start(simdi);
      osc.stop(simdi + sure);
    }catch(e){}
  }

  /* kısa (~80ms) yüksek frekanslı (1200-1800Hz) tık + hafif pitch kayması — saat/zaman geçişi */
  function tikVinilti(){
    if(!acikMi()) return;
    var c = baglamAl();
    if(!c) return;
    devamEttir(c);
    try{
      var simdi = c.currentTime;
      var sure = 0.08;
      var osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, simdi);
      osc.frequency.exponentialRampToValueAtTime(1200, simdi + sure);
      var kazanc = c.createGain();
      kazanc.gain.setValueAtTime(0.28, simdi);
      kazanc.gain.exponentialRampToValueAtTime(0.001, simdi + sure);
      osc.connect(kazanc); kazanc.connect(c.destination);
      osc.start(simdi);
      osc.stop(simdi + sure);
    }catch(e){}
  }

  /* kısa (~270ms) yükselen üç nota (C5→E5→G5, sine osilatör, yumuşak ataklı) — doğru cevap hissi */
  function dogruCini(){
    if(!acikMi()) return;
    var c = baglamAl();
    if(!c) return;
    devamEttir(c);
    try{
      var simdi = c.currentTime;
      var notalar = [523.25, 659.25, 783.99]; /* C5, E5, G5 */
      var notaAraligi = 0.09;
      for(var i=0;i<notalar.length;i++){
        var baslangic = simdi + i * notaAraligi;
        var osc = c.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notalar[i], baslangic);
        var kazanc = c.createGain();
        kazanc.gain.setValueAtTime(0.001, baslangic);
        kazanc.gain.linearRampToValueAtTime(0.26, baslangic + 0.012);
        kazanc.gain.exponentialRampToValueAtTime(0.001, baslangic + notaAraligi + 0.05);
        osc.connect(kazanc); kazanc.connect(c.destination);
        osc.start(baslangic);
        osc.stop(baslangic + notaAraligi + 0.06);
      }
    }catch(e){}
  }

  /* kısa (~250ms) alçalan iki nota (G4→Eb4, üçgen dalga + lowpass) — yanlış cevap hissi
     (önceki sürüm sert bir sawtooth vızıltısıydı; şimdi dogruCini ile aynı yumuşak
     üretim kalitesinde ama inen/minör bir ezgi — "kötü" değil, sadece "değil bu" hissi) */
  function yanlisVinlama(){
    if(!acikMi()) return;
    var c = baglamAl();
    if(!c) return;
    devamEttir(c);
    try{
      var simdi = c.currentTime;
      var notalar = [392.00, 311.13]; /* G4, Eb4 — inen küçük üçlü */
      var notaAraligi = 0.12;
      var notaSure = 0.14;
      for(var i=0;i<notalar.length;i++){
        var baslangic = simdi + i * notaAraligi;
        var osc = c.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(notalar[i], baslangic);
        var filtre = c.createBiquadFilter();
        filtre.type = 'lowpass';
        filtre.frequency.value = 1200;
        var kazanc = c.createGain();
        kazanc.gain.setValueAtTime(0.001, baslangic);
        kazanc.gain.linearRampToValueAtTime(0.2, baslangic + 0.01);
        kazanc.gain.exponentialRampToValueAtTime(0.001, baslangic + notaSure);
        osc.connect(filtre); filtre.connect(kazanc); kazanc.connect(c.destination);
        osc.start(baslangic);
        osc.stop(baslangic + notaSure + 0.02);
      }
    }catch(e){}
  }

  window.HOSes = {
    kartHisirti: kartHisirti,
    tokmak: tokmak,
    tikVinilti: tikVinilti,
    dogruCini: dogruCini,
    yanlisVinlama: yanlisVinlama,
    acikMi: acikMi,
    acKapa: acKapa
  };
})();
