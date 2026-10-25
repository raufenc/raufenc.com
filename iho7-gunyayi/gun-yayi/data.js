/* Soru ve cevaplar ortak ../content.js dosyasından gelir. */

/* Görsel katman — yalnız sahne/etkileşim üstverisi (Arapça metin YOK; metin hep yukarıdan gelir).
   story : sorunun gün içindeki yeri (0 şafak öncesi … 0.5 öğle … 1 gece)
   type  : dial  = güneşi gün yayında sürükle   town = binalardan birine dokun   cards = kart seç
   opts  : şık sırasıyla — t: gün yayındaki konum, icon: kart/bina simgesi */
window.SCENE={
  s013:{
    posters:["../posters/p1.jpg","../posters/p2.jpg","../posters/p3.jpg","../posters/p4.jpg","../posters/p5.jpg"],
    q:[
      {story:.10,type:'dial',opts:[{t:.13,icon:'time'},{t:.96,icon:'time'},{t:.50,icon:'time'}]},
      {story:.07,type:'dial',opts:[{t:.065,icon:'time'},{t:.50,icon:'time'},{t:.94,icon:'time'}]},
      {story:.27,type:'town',opts:[{icon:'school'},{icon:'market'},{icon:'mosque'}]},
      {story:.52,type:'dial',opts:[{t:.50,icon:'time'},{t:.80,icon:'time'},{t:.22,icon:'time'}]},
      {story:.68,type:'cards',opts:[{icon:'mother'},{icon:'father'},{icon:'sister'}]}
    ]
  }
};
