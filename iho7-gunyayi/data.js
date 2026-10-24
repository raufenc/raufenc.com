/* İçerik — orijinal etkinlik verisiyle birebir (metin, hareke, şık sırası, doğru cevap değişmedi). */
window.ACTIVITIES=[{"id":"s013","unit":1,"title":"يَوْم مَرْيَم","subtitle":"اِسْتَمِعْ إِلى مَرْيَم، ثُمَّ أَجِبْ عَن السُّؤال","questions":[{"watch":"s013_1w.mp4","prompt":"مَتى تَسْتَيْقِظُ مَرْيَم؟","options":["في الصَّباح مُبَكِّرًا","في اللَّيْل","في الظُّهْر"],"correct":0,"answer":"s013_1w.mp4"},{"watch":"s013_2w.mp4","prompt":"أَيّ صَلاة تُصَلّي في الصَّباح؟","options":["الفَجْر","الظُّهْر","العِشاء"],"correct":0,"answer":"s013_2w.mp4"},{"watch":"s013_3w.mp4","prompt":"إِلى أَيْن تَذْهَبُ مَرْيَم؟","options":["إِلى المَدْرَسَة","إِلى السّوق","إِلى المَسْجِد"],"correct":0,"answer":"s013_3w.mp4"},{"watch":"s013_4w.mp4","prompt":"مَتى تَرْجِعُ إِلى البَيْت؟","options":["ظُهْرًا","مَساءً","صَباحًا"],"correct":0,"answer":"s013_4w.mp4"},{"watch":"s013_5w.mp4","prompt":"مَن تُساعِدُ مَرْيَم في البَيْت؟","options":["أُمَّها","أَباها","أُخْتَها"],"correct":0,"answer":"s013_5w.mp4"}]}];

/* Görsel katman — yalnız sahne/etkileşim üstverisi (Arapça metin YOK; metin hep yukarıdan gelir).
   story : sorunun gün içindeki yeri (0 şafak öncesi … 0.5 öğle … 1 gece)
   type  : dial  = güneşi gün yayında sürükle   town = binalardan birine dokun   cards = kart seç
   opts  : şık sırasıyla — t: gün yayındaki konum, icon: kart/bina simgesi */
window.SCENE={
  s013:{
    posters:["posters/p1.jpg","posters/p2.jpg","posters/p3.jpg","posters/p4.jpg","posters/p5.jpg"],
    q:[
      {story:.10,type:'dial',opts:[{t:.13,icon:'time'},{t:.96,icon:'time'},{t:.50,icon:'time'}]},
      {story:.07,type:'dial',opts:[{t:.065,icon:'time'},{t:.50,icon:'time'},{t:.94,icon:'time'}]},
      {story:.27,type:'town',opts:[{icon:'school'},{icon:'market'},{icon:'mosque'}]},
      {story:.52,type:'dial',opts:[{t:.50,icon:'time'},{t:.80,icon:'time'},{t:.22,icon:'time'}]},
      {story:.68,type:'cards',opts:[{icon:'mother'},{icon:'father'},{icon:'sister'}]}
    ]
  }
};
