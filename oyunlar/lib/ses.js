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

  /* kısa (~120ms) beyaz gürültü patlaması + hızlı üstel fade-out — kart kayma hissi */
  function kartHisirti(){
    if(!acikMi()) return;
    var c = baglamAl();
    if(!c) return;
    devamEttir(c);
    try{
      var sure = 0.12;
      var sayi = Math.round(c.sampleRate * sure);
      var buffer = c.createBuffer(1, sayi, c.sampleRate);
      var veri = buffer.getChannelData(0);
      for(var i=0;i<sayi;i++){ veri[i] = (Math.random()*2-1); }
      var kaynak = c.createBufferSource();
      kaynak.buffer = buffer;
      var kazanc = c.createGain();
      var simdi = c.currentTime;
      kazanc.gain.setValueAtTime(0.22, simdi);
      kazanc.gain.exponentialRampToValueAtTime(0.001, simdi + sure);
      var filtre = c.createBiquadFilter();
      filtre.type = 'highpass';
      filtre.frequency.value = 1200;
      kaynak.connect(filtre); filtre.connect(kazanc); kazanc.connect(c.destination);
      kaynak.start(simdi);
      kaynak.stop(simdi + sure);
    }catch(e){}
  }

  /* kısa (~150ms) düşük frekanslı (80-120Hz) osilatör + hızlı decay — mahkeme tokmağı */
  function tokmak(){
    if(!acikMi()) return;
    var c = baglamAl();
    if(!c) return;
    devamEttir(c);
    try{
      var simdi = c.currentTime;
      var sure = 0.15;
      var osc = c.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(120, simdi);
      osc.frequency.exponentialRampToValueAtTime(80, simdi + sure);
      var kazanc = c.createGain();
      kazanc.gain.setValueAtTime(0.5, simdi);
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

  window.HOSes = {
    kartHisirti: kartHisirti,
    tokmak: tokmak,
    tikVinilti: tikVinilti,
    acikMi: acikMi,
    acKapa: acKapa
  };
})();
