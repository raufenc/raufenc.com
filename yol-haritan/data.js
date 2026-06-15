/* ===================================================================
   YOL HARİTAN — Veri modeli (içerik)
   Omurga: RIASEC (Holland) mesleki ilgi + Beş Faktör (Mini-IPIP) karakter
   Dünya çapı araştırma brifine dayalı. Tamamen istemci tarafı.
   =================================================================== */
window.YH = (function () {
  "use strict";

  const scales = {
    riasec: [
      { v: 1, e: "😣", l: "Hiç sevmem" },
      { v: 2, e: "🙁", l: "Sevmem" },
      { v: 3, e: "😐", l: "Kararsızım" },
      { v: 4, e: "🙂", l: "Severim" },
      { v: 5, e: "😍", l: "Çok severim" }
    ],
    bigfive: [
      { v: 1, e: "🚫", l: "Hiç uymuyor" },
      { v: 2, e: "🙁", l: "Pek uymuyor" },
      { v: 3, e: "😐", l: "Kısmen" },
      { v: 4, e: "🙂", l: "Uyuyor" },
      { v: 5, e: "💯", l: "Tamamen uyuyor" }
    ],
    values: [
      { v: 1, e: "·", l: "Hiç önemli değil" },
      { v: 2, e: "·", l: "Az önemli" },
      { v: 3, e: "•", l: "Orta" },
      { v: 4, e: "★", l: "Önemli" },
      { v: 5, e: "🌟", l: "Çok önemli" }
    ]
  };

  const types = {
    R: { key:"R", name:"Yapıcı", classic:"Gerçekçi", en:"Realistic", emoji:"🛠️", hex:"#E8743B",
         tagline:"Eliyle iş yapan, üreten, çözen.",
         onet:"Somut, pratik, elle yapılan işlerden; araç, makine, doğa ve sahadan keyif alır.",
         strengths:["Pratik zekâ","El becerisi","Dayanıklılık","Çözüm üretme"] },
    I: { key:"I", name:"Araştırmacı", classic:"Araştırıcı", en:"Investigative", emoji:"🔬", hex:"#1B6CA8",
         tagline:"Soru soran, çözümleyen, anlamak isteyen.",
         onet:"Gözlem, araştırma, analiz ve fikirlerle uğraşmaktan; 'neden-nasıl' sorularından keyif alır.",
         strengths:["Analitik düşünme","Merak","Mantık","Araştırma"] },
    A: { key:"A", name:"Sanatçı", classic:"Sanatçı", en:"Artistic", emoji:"🎨", hex:"#8E44AD",
         tagline:"Hayal kuran, tasarlayan, ifade eden.",
         onet:"Özgün ifade, yaratıcılık, tasarım ve estetikten; kalıpların dışına çıkmaktan keyif alır.",
         strengths:["Yaratıcılık","Estetik duygu","Özgünlük","Hayal gücü"] },
    S: { key:"S", name:"Yardımsever", classic:"Sosyal", en:"Social", emoji:"🤝", hex:"#27AE60",
         tagline:"İnsana dokunan, öğreten, destek olan.",
         onet:"İnsanlara yardım etme, öğretme, iyileştirme ve birlikte çalışmaktan keyif alır.",
         strengths:["Empati","İletişim","Öğretme","İş birliği"] },
    E: { key:"E", name:"Girişimci", classic:"İkna Edici", en:"Enterprising", emoji:"🚀", hex:"#E74C3C",
         tagline:"Liderlik eden, ikna eden, başlatan.",
         onet:"Liderlik, ikna, girişim ve hedefe yönlendirmekten; inisiyatif almaktan keyif alır.",
         strengths:["Liderlik","İkna","Girişimcilik","Kararlılık"] },
    C: { key:"C", name:"Düzenleyici", classic:"Geleneksel", en:"Conventional", emoji:"🗂️", hex:"#34495E",
         tagline:"Planlayan, düzenleyen, güvenilir kılan.",
         onet:"Düzen, kesinlik, sistem, veri ve kurallarla çalışmaktan; işleri tıkır tıkır yürütmekten keyif alır.",
         strengths:["Düzen","Dikkat","Güvenilirlik","Sistematiklik"] }
  };

  /* Big Five — N depolanır, "Duygusal Denge" (=100-N) gösterilir */
  const bigfive = {
    O:  { key:"O",  name:"Açıklık & Merak", orig:"Openness", emoji:"🎨", poles:["Pratik-Somut","Meraklı-Yaratıcı"], strengths:["Yaratıcılık","Merak"],
          fb:{ high:"Yeni fikirlere ve farklı bakışlara açıksın; hayal gücün ve merakın seni sürekli keşfe iter.",
               mid:"Hem yeniliğe açıksın hem de denenmiş yöntemlere değer veriyorsun — dengeli bir yanın var.",
               low:"Somut, kanıtlanmış ve pratik olanı seversin; hayal peşinde koşmaktansa işe yarayanı tercih edersin." } },
    C:  { key:"C",  name:"Sorumluluk & Düzen", orig:"Conscientiousness", emoji:"🎯", poles:["Esnek-Spontane","Planlı-Düzenli"], strengths:["Disiplin","Güvenilirlik"],
          fb:{ high:"Planlı, düzenli ve hedefe kilitlisin; bir işe söz verdiğinde sonuna kadar götürürsün.",
               mid:"Gerektiğinde planlı, gerektiğinde esnek olabiliyorsun; duruma göre ayar yapabilen bir yanın var.",
               low:"Spontane ve esneksin; katı planlardansa akışına bırakmayı, anı yaşamayı seversin." } },
    E:  { key:"E",  name:"Dışadönüklük & Enerji", orig:"Extraversion", emoji:"⚡", poles:["Sakin-Odaklı","Enerjik-Sosyal"], strengths:["İletişim","Enerji"],
          fb:{ high:"Sosyal ve enerjiksin; kalabalıklar, yeni insanlar ve hareket seni canlandırır.",
               mid:"Hem sosyalleşmekten keyif alıyor hem de kendi alanına çekilmeye ihtiyaç duyuyorsun.",
               low:"Sakin ve odaklısın; az kişiyle derin bağlar ve kendi alanın sana iyi gelir." } },
    A:  { key:"A",  name:"Uyumluluk & Sıcaklık", orig:"Agreeableness", emoji:"💛", poles:["Bağımsız-Eleştirel","Şefkatli-Uyumlu"], strengths:["Empati","Takım ruhu"],
          fb:{ high:"Şefkatli ve uyumlusun; başkalarının duygularını önemser, iş birliğini rekabete tercih edersin.",
               mid:"Hem yardımsever hem de gerektiğinde kendi çizgini koruyabilen, dengeli bir yanın var.",
               low:"Bağımsız ve eleştirelsin; kendi fikrini savunur, kararlarını mantığına göre verirsin." } },
    N:  { key:"ES", name:"Duygusal Denge & Sükûnet", orig:"Emotional Stability", emoji:"🧘", fromN:true, poles:["Hassas-Tepkisel","Sakin-Dengeli"], strengths:["Soğukkanlılık","Dayanıklılık"],
          fb:{ high:"Baskı altında sakin kalabiliyorsun; aksiliklere karşı dayanıklısın, kolay paniğe kapılmazsın.",
               mid:"Çoğu zaman dengeli olsan da bazı durumlarda gerginlik hissedebiliyorsun — bu çok insani.",
               low:"Duyguların yoğun ve derin; bu hassasiyet seni daha duyarlı, empatik ve fark eden biri yapabilir." } }
  };

  const turns = [
    { id:1, name:"Atölye & Laboratuvar", emoji:"🛠️", teaser:"Ellerin ve aklın neyi seviyor, görelim." },
    { id:2, name:"Stüdyo & Topluluk",    emoji:"🎨", teaser:"Yaratıcı ve insancıl yanını yokluyoruz." },
    { id:3, name:"Sahne & Düzen Masası",  emoji:"🚀", teaser:"Liderlik mi, düzen mi? Bakalım." },
    { id:4, name:"İçindeki Sen",          emoji:"✨", teaser:"Şimdi sıra karakterinde." },
    { id:5, name:"Yön (opsiyonel)",       emoji:"🧭", teaser:"Seni asıl yönlendiren değerler." }
  ];

  const items = [
    /* TUR 1: R + I */
    { id:"R1", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"R", text:"Bozulan bir bisikleti, telefonu ya da cihazı söküp tamir etmek." },
    { id:"I1", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"I", text:"Bir bilim deneyi tasarlayıp sonucunu gözlemlemek." },
    { id:"R2", turn:1, format:"swipe",  scale:"riasec", layer:"riasec", type:"R", text:"Ahşaptan ya da malzemeden bir raf, kutu veya maket inşa etmek." },
    { id:"I2", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"I", text:"Zor bir matematik ya da mantık bilmecesini çözmek." },
    { id:"R3", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"R", text:"Bir bahçede ya da doğada bitki yetiştirip toprakla uğraşmak." },
    { id:"I3", turn:1, format:"swipe",  scale:"riasec", layer:"riasec", type:"I", text:"Bir olayın ya da bir şeyin gerçek nedenini araştırmak." },
    { id:"R4", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"R", text:"Bir hayvana bakmak, beslemek, sağlığıyla ilgilenmek." },
    { id:"I4", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"I", text:"Yıldızları, gezegenleri ya da doğa olaylarını incelemek." },
    { id:"SJT1", turn:1, format:"scenario", layer:"mixed",
      text:"Bir hafta sonu boş kaldın. Hangisi sana en cazip geliyor?", hint:"Sana en yakın olanı seç.",
      options:[
        { emoji:"🔧", t:"Bir şey tamir/inşa etmek", scores:{R:2} },
        { emoji:"📺", t:"Bir belgesel izleyip araştırmak", scores:{I:2} },
        { emoji:"🎨", t:"Yeni bir şey tasarlamak / içerik üretmek", scores:{A:2} },
        { emoji:"🎉", t:"Arkadaşlarla bir etkinlik düzenlemek", scores:{E:1, S:1} }
      ] },
    { id:"R5", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"R", text:"Açık havada haritayla rota bulup bir parkuru tamamlamak." },
    { id:"I5", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"I", text:"Bir konuda veri toplayıp grafiğe döküp yorumlamak." },
    { id:"R6", turn:1, format:"swipe",  scale:"riasec", layer:"riasec", type:"R", text:"Bir motorun ya da makinenin nasıl çalıştığını sökerek görmek." },
    { id:"I6", turn:1, format:"likert", scale:"riasec", layer:"riasec", type:"I", text:"Bir şeyin “neden böyle olduğunu” derinlemesine kurcalamak." },

    /* TUR 2: A + S */
    { id:"A1", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"A", text:"Bir şiir, hikâye, şarkı sözü ya da senaryo yazmak." },
    { id:"S1", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"S", text:"Anlamadığı bir konuyu bir arkadaşına sabırla anlatmak." },
    { id:"A2", turn:2, format:"swipe",  scale:"riasec", layer:"riasec", type:"A", text:"Bir resim, çizim ya da dijital tasarım yapmak." },
    { id:"S2", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"S", text:"Üzgün birini dinleyip ona moral ve destek vermek." },
    { id:"A3", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"A", text:"Bir müzik aleti çalmak ya da kendi parçanı bestelemek." },
    { id:"S3", turn:2, format:"swipe",  scale:"riasec", layer:"riasec", type:"S", text:"Bir yardım kampanyası ya da grup etkinliği düzenlemek." },
    { id:"A4", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"A", text:"Bir kısa film/video çekip kurgulamak ya da sahnede rol almak." },
    { id:"S4", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"S", text:"Küçük çocuklara bir oyun ya da beceri öğretmek." },
    { id:"SJT2", turn:2, format:"scenario", layer:"mixed",
      text:"Grup projesinde son gün her şey karıştı. İlk içinden gelen ne olur?", hint:"Spontane tepkini seç — doğrusu yok.",
      options:[
        { emoji:"📋", t:"Herkesi toplar, görev dağıtırım", scores:{E:2} },
        { emoji:"🤫", t:"Sessizce eksik kısmı kendim bitiririm", scores:{C:2} },
        { emoji:"💡", t:"Yepyeni bir sunum fikri bulurum", scores:{A:2} },
        { emoji:"🫂", t:"Önce herkesin moralini düzeltirim", scores:{S:2} }
      ] },
    { id:"A5", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"A", text:"Bir odanın, posterin ya da web sayfasının görünümünü tasarlamak." },
    { id:"S5", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"S", text:"Yaşlı ya da ihtiyacı olan birine bakım ve eşlik etmek." },
    { id:"A6", turn:2, format:"swipe",  scale:"riasec", layer:"riasec", type:"A", text:"Daha önce kimsenin denemediği özgün bir fikir ortaya koymak." },
    { id:"S6", turn:2, format:"likert", scale:"riasec", layer:"riasec", type:"S", text:"İki kişi arasındaki bir anlaşmazlığı konuşarak çözmek." },

    /* TUR 3: E + C */
    { id:"E1", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"E", text:"Bir takıma liderlik edip onları bir hedefe yönlendirmek." },
    { id:"C1", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"C", text:"Bir bütçeyi ya da harcama listesini düzenli ve eksiksiz tutmak." },
    { id:"E2", turn:3, format:"swipe",  scale:"riasec", layer:"riasec", type:"E", text:"Bir fikri ya da ürünü başkalarına anlatıp ikna etmek." },
    { id:"C2", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"C", text:"Verileri bir tabloya tertemiz ve sıralı biçimde girmek." },
    { id:"E3", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"E", text:"Kendi küçük işini, kulübünü ya da projeni kurmak." },
    { id:"C3", turn:3, format:"swipe",  scale:"riasec", layer:"riasec", type:"C", text:"Bir koleksiyonu ya da dosyayı sistemli şekilde arşivlemek." },
    { id:"E4", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"E", text:"Bir tartışmada kendi görüşünü güçlü biçimde savunmak." },
    { id:"C4", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"C", text:"Bir işi adım adım, kurallarına tam uyarak tamamlamak." },
    { id:"SJT3", turn:3, format:"scenario", layer:"mixed",
      text:"Bir okul kulübü kurulacak. En çok hangi rolü kapardın?",
      options:[
        { emoji:"🎤", t:"Başkan — yön veririm", scores:{E:2} },
        { emoji:"🧮", t:"Sayman — düzeni kurarım", scores:{C:2} },
        { emoji:"🔬", t:"Araştırmacı — bilgiyi toplarım", scores:{I:2} },
        { emoji:"🎨", t:"Tasarımcı — görselini yaparım", scores:{A:2} }
      ] },
    { id:"E5", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"E", text:"Bir etkinlik için sponsor, bütçe ya da kaynak bulmak." },
    { id:"C5", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"C", text:"Hesapları kontrol edip içindeki hataları yakalamak." },
    { id:"E6", turn:3, format:"swipe",  scale:"riasec", layer:"riasec", type:"E", text:"Bir hedefe ulaşmak için insanları organize edip motive etmek." },
    { id:"C6", turn:3, format:"likert", scale:"riasec", layer:"riasec", type:"C", text:"Bir programı ya da takvimi titizlikle planlayıp takip etmek." },

    /* TUR 4: Big Five (18) */
    { id:"E_1", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"E", text:"Kalabalık bir ortamda yeni insanlarla kolayca konuşmaya başlarım." },
    { id:"C_1", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"C", text:"İşlerimi son dakikaya bırakmadan planlı şekilde bitiririm." },
    { id:"O_1", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"O", text:"Daha önce hiç denemediğim yeni şeyleri merak eder, kurcalarım." },
    { id:"A_1", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"A", text:"Bir arkadaşım üzgün olduğunda onun hissettiğini ben de hissederim." },
    { id:"N_1", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"N", text:"Küçük bir aksilikte bile moralim hızla bozulur." },
    { id:"E_3", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"E", reverse:true, text:"Topluluk içinde genelde geri planda, sessiz kalmayı tercih ederim." },
    { id:"C_2", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"C", text:"Çantam, masam ve eşyalarım düzenli durur; her şeyin yeri bellidir." },
    { id:"O_2", turn:4, format:"slider", scale:"bigfive", layer:"bigfive", dim:"O", text:"Hayal gücün ne kadar geniş?", minLabel:"Çok pratiğim", maxLabel:"Sürekli hayal kurarım" },
    { id:"A_3", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"A", reverse:true, text:"Açıkçası başkalarının sorunları pek ilgimi çekmez." },
    { id:"N_3", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"N", reverse:true, text:"Çoğu zaman sakin ve rahatımdır." },
    { id:"E_2", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"E", text:"Bir grupta çoğu zaman ortamın enerjisini yükselten kişi benimdir." },
    { id:"C_3", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"C", reverse:true, text:"Eşyalarımı sık sık dağıtır, yerine koymayı unuturum." },
    { id:"O_3", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"O", text:"Kafamda sürekli yeni fikirler ve hayaller tasarlarım." },
    { id:"A_2", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"A", text:"Başkalarının dertlerini dinlemek ve yardım etmek bana iyi gelir." },
    { id:"N_2", turn:4, format:"slider", scale:"bigfive", layer:"bigfive", dim:"N", text:"Stres seni ne kadar etkiler?", minLabel:"Pek etkilemez", maxLabel:"Çok etkiler" },
    { id:"E_4", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"E", reverse:true, text:"Kalabalık etkinlikler beni yorar, az kişiyle olmayı severim." },
    { id:"C_4", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"C", reverse:true, text:"Görevleri erteler, son ana kadar başlamam." },
    { id:"N_4", turn:4, format:"likert", scale:"bigfive", layer:"bigfive", dim:"N", reverse:true, text:"Zor durumlarda soğukkanlılığımı korurum." },

    /* TUR 5: Değerler (opsiyonel) */
    { id:"V_AC1", turn:5, format:"likert", scale:"values", layer:"values", vkey:"AC", text:"Bir işi bitirince “bunu ben başardım” diyebilmek." },
    { id:"V_AC2", turn:5, format:"likert", scale:"values", layer:"values", vkey:"AC", text:"Sürekli yeni şeyler öğrenip kendimi geliştirebilmek." },
    { id:"V_IN1", turn:5, format:"likert", scale:"values", layer:"values", vkey:"IN", text:"Kendi kararlarımı verebilmek, bana sürekli ne yapacağımın söylenmemesi." },
    { id:"V_IN2", turn:5, format:"likert", scale:"values", layer:"values", vkey:"IN", text:"Kimse tepemde durmadan, kendi yöntemimle çalışabilmek." },
    { id:"V_RE1", turn:5, format:"likert", scale:"values", layer:"values", vkey:"RE", text:"Emeğimin fark edilmesi ve takdir görmesi." },
    { id:"V_RE2", turn:5, format:"likert", scale:"values", layer:"values", vkey:"RE", text:"İleride bir ekibe liderlik etmek ya da saygın bir konuma gelmek." },
    { id:"V_RL1", turn:5, format:"likert", scale:"values", layer:"values", vkey:"RL", text:"İnsanlara faydalı olan, birilerine dokunan bir iş yapmak." },
    { id:"V_RL2", turn:5, format:"likert", scale:"values", layer:"values", vkey:"RL", text:"Rekabet değil, dayanışma içinde çalışmak." },
    { id:"V_SU1", turn:5, format:"likert", scale:"values", layer:"values", vkey:"SU", text:"Hata yaptığımda arkamda duran bir yönetici/öğretmen olması." },
    { id:"V_SU2", turn:5, format:"likert", scale:"values", layer:"values", vkey:"SU", text:"Kuralları adil ve net olan bir yerde çalışmak." },
    { id:"V_WC1", turn:5, format:"likert", scale:"values", layer:"values", vkey:"WC", text:"İşimin güvenli ve düzenli olması, geleceğimi planlayabilmem." },
    { id:"V_WC2", turn:5, format:"likert", scale:"values", layer:"values", vkey:"WC", text:"İş ile özel hayatım arasında denge kurabilmem." }
  ];

  const valueDims = {
    AC:{ name:"Başarı", emoji:"🏆", desc:"bir şeyi başarıp geliştirmek" },
    IN:{ name:"Özgürlük", emoji:"🕊️", desc:"kendi kararını verip bağımsız çalışmak" },
    RE:{ name:"Tanınma", emoji:"⭐", desc:"emeğinin takdir görmesi, saygın konum" },
    RL:{ name:"İnsana Dokunma", emoji:"💞", desc:"faydalı olmak, dayanışma" },
    SU:{ name:"Destek", emoji:"🛟", desc:"adil, güven veren bir ortam" },
    WC:{ name:"Denge & Güvence", emoji:"⚖️", desc:"güvenli, dengeli bir düzen" }
  };

  const bridge = { O:{ A:0.48, I:0.28 }, E:{ E:0.41, S:0.31 }, A:{ S:0.19 }, C:{ C:0.20 } };

  const archetypes = [
    { id:1,  ad:"Cesur Maker",        emoji:"🛠️", hex:"#E8743B", primary:"R", def:"Elini taşın altına koyup gerçekten bir şey yapmak, tamir etmek, inşa etmek seni mutlu ediyor. Denemekten korkmuyorsun." },
    { id:2,  ad:"Sahadaki Usta",      emoji:"🧰", hex:"#C75B2E", primary:"R", def:"Bir işi titizlikle, sağlam ve eksiksiz bitirirsin. Sana güvenilir, çünkü dediğini yaparsın." },
    { id:3,  ad:"Sessiz Mucit",       emoji:"🔬", hex:"#2E86AB", primary:"I", def:"Bir problemi sessizce parçalara ayırıp çözmeye bayılıyorsun. Derinliğin, çoğu kişinin kaçırdığını yakalatıyor." },
    { id:4,  ad:"Meraklı Kâşif",      emoji:"🛰️", hex:"#1B6CA8", primary:"I", def:"Her şeyin “neden”ini merak ediyorsun. Yeni bilgi seni heyecanlandırıyor, durmak bilmiyorsun." },
    { id:5,  ad:"Yaratıcı Kâşif",     emoji:"🎨", hex:"#8E44AD", primary:"A", def:"Hayal gücün hiç durmuyor; yeni fikirler ve farklı bakışlar senin doğal süper gücün." },
    { id:6,  ad:"Hikâye Anlatıcısı",  emoji:"🎭", hex:"#9B59B6", primary:"A", def:"Düşünceni bir hikâyeye, sahneye, içeriğe dönüştürüp insanlara ulaştırmak sana enerji veriyor." },
    { id:7,  ad:"Şefkatli Rehber",    emoji:"🤝", hex:"#27AE60", primary:"S", def:"Başkalarının nasıl hissettiğini hemen anlıyorsun; yardım etmek sana iyi geliyor. Yanında insanlar güvende hissediyor." },
    { id:8,  ad:"İlham Veren Öğretmen",emoji:"📣", hex:"#16A085", primary:"S", def:"Bir şeyi anlatıp birinin gözünde ışık yakmak senin işin. İnsanları bir araya getirmeyi seviyorsun." },
    { id:9,  ad:"Doğal Lider",        emoji:"🚀", hex:"#E74C3C", primary:"E", def:"İnsanları bir hedefe taşımak sana enerji veriyor. Ortam karıştığında herkes farkında olmadan sana dönüyor." },
    { id:10, ad:"Vizyoner Girişimci", emoji:"💡", hex:"#D35400", primary:"E", def:"Aklında hep yeni bir fikir, kurulacak bir iş var. Fırsatları başkalarından önce görüyorsun." },
    { id:11, ad:"Düzen Ustası",       emoji:"🗂️", hex:"#34495E", primary:"C", def:"Karmaşayı düzene çevirmek, plan yapmak, işleri tıkır tıkır yürütmek senin işin. Sana hedef ver, haritayı sen çizersin." },
    { id:12, ad:"Güven Veren Analist", emoji:"📊", hex:"#2C3E50", primary:"C", def:"Sakin kafanla rakamları, detayları kontrol edersin. Kimsenin gözden kaçırdığı hatayı sen bulursun." },
    { id:13, ad:"Çok Yönlü Köprü",    emoji:"🧭", hex:"#7F8C8D", special:"lowdiff", def:"Birçok alana eşit ilgin var — bu bir kararsızlık değil, zenginlik. Farklı dünyaları birbirine bağlayabilirsin." },
    { id:14, ad:"Bilim-Mucit",        emoji:"⚙️", hex:"#117A8B", special:"IR", def:"Hem kafan hem ellerin çalışıyor: bir şeyi hem anlıyor hem yapıyorsun. Mucit kafası tam sende." },
    { id:15, ad:"Sanat-Elçi",         emoji:"🌈", hex:"#AF7AC5", special:"AS", def:"Yaratıcılığını insanlara dokunmak için kullanıyorsun. Hem üretiyor hem iyileştiriyorsun." },
    { id:16, ad:"Strateji Ustası",    emoji:"♟️", hex:"#A04000", special:"EC", def:"Hem büyük resmi görüyor hem planı kuruyorsun. Bir hedefi adım adım gerçeğe çevirirsin." }
  ];
  const archetypeMap = {
    R:{ O:1, ES:1, C:2, _:1 }, I:{ C:3, "E-":3, O:4, _:4 }, A:{ O:5, E:6, _:5 },
    S:{ A:7, E:8, _:7 }, E:{ E:9, O:10, _:9 }, C:{ C:11, ES:12, _:11 }
  };
  const specialPairs = { IR:14, RI:14, AS:15, SA:15, EC:16, CE:16 };
  const archetypeChat = {
    1:"Elinle bir şey yaparken zamanın nasıl aktığını fark ettin mi? En son ne yaptın?",
    2:"Çevrendekiler hangi konuda 'bunu ona bırakalım, o titiz' diyor?",
    3:"Tek başına saatlerce uğraşmaktan keyif aldığın bir konu/problem var mı?",
    4:"Son zamanlarda seni en çok meraklandıran soru neydi?",
    5:"Aklındaki bir fikri hayata geçirsen, ilk neyi yaratmak isterdin?",
    6:"Bir konuyu anlatırken insanların gözünün parladığını ne zaman gördün?",
    7:"Birine yardım edip içini ısıtan son anını hatırlıyor musun?",
    8:"Bir şeyi öğretip 'anladım!' tepkisini aldığında ne hissettin?",
    9:"Bir grupta işler tıkandığında genelde ne yapıyorsun?",
    10:"Aklında kurmak istediğin bir iş/proje fikri var mı? Anlat.",
    11:"Dağınık bir şeyi düzene soktuğunda nasıl hissediyorsun?",
    12:"Kimsenin fark etmediği bir hatayı/detayı yakaladığın oldu mu?",
    13:"Birçok şeye ilgin var; hangileri arasında karar vermekte zorlanıyorsun?",
    14:"Bir şeyi hem anlamak hem de yapmak — ikisinden hangisi öne çıkıyor sende?",
    15:"Yaratıcılığını birine iyilik için kullandığın bir an oldu mu?",
    16:"Bir hedefi adım adım plana dökmek mi, büyük resmi görmek mi sana daha kolay?"
  };

  const careers = [
    { ad:"Makine Mühendisliği", kod:"RIC", puanTuru:"SAY", jobZone:4, trend:false, ornek:["Makine mühendisi","Tasarım mühendisi"] },
    { ad:"İnşaat Mühendisliği", kod:"RIE", puanTuru:"SAY", jobZone:4, trend:false, ornek:["İnşaat mühendisi","Şantiye şefi"] },
    { ad:"Elektrik-Elektronik Mühendisliği", kod:"RIC", puanTuru:"SAY", jobZone:4, trend:true, ornek:["Elektronik mühendisi","Gömülü sistem geliştirici"] },
    { ad:"Mekatronik Mühendisliği", kod:"RIE", puanTuru:"SAY", jobZone:4, trend:true, ornek:["Mekatronik mühendisi","Robotik uzmanı"] },
    { ad:"Ziraat / Gıda Mühendisliği", kod:"RIS", puanTuru:"SAY", jobZone:4, trend:false, ornek:["Ziraat mühendisi","Gıda uzmanı"] },
    { ad:"Veterinerlik", kod:"RIS", puanTuru:"SAY", jobZone:5, trend:false, ornek:["Veteriner hekim"] },
    { ad:"Pilotaj / Sivil Havacılık", kod:"RIE", puanTuru:"SAY", jobZone:4, trend:false, ornek:["Pilot","Hava trafik kontrolörü"] },
    { ad:"Spor Bilimleri / Antrenörlük", kod:"RSE", puanTuru:"TYT/Yetenek", jobZone:3, trend:false, ornek:["Antrenör","Beden eğitimi öğretmeni"] },
    { ad:"Elektrik/Makine Teknikerliği (Ön Lisans)", kod:"RCI", puanTuru:"TYT", jobZone:2, trend:false, ornek:["Tekniker","Bakım teknisyeni"] },
    { ad:"Tıp", kod:"ISR", puanTuru:"SAY", jobZone:5, trend:false, ornek:["Hekim","Cerrah"] },
    { ad:"Diş Hekimliği", kod:"IRS", puanTuru:"SAY", jobZone:5, trend:false, ornek:["Diş hekimi"] },
    { ad:"Eczacılık", kod:"ICS", puanTuru:"SAY", jobZone:5, trend:false, ornek:["Eczacı"] },
    { ad:"Bilgisayar / Yazılım Mühendisliği", kod:"IRC", puanTuru:"SAY", jobZone:4, trend:true, ornek:["Yazılım geliştirici","Yapay zekâ mühendisi"] },
    { ad:"Yapay Zekâ / Veri Mühendisliği", kod:"ICR", puanTuru:"SAY", jobZone:4, trend:true, ornek:["Veri bilimci","YZ mühendisi"] },
    { ad:"Moleküler Biyoloji ve Genetik", kod:"IRA", puanTuru:"SAY", jobZone:5, trend:true, ornek:["Genetik araştırmacı","Biyomedikal uzmanı"] },
    { ad:"Fizik / Kimya / Matematik", kod:"IRA", puanTuru:"SAY", jobZone:5, trend:false, ornek:["Bilim insanı","Öğretim üyesi"] },
    { ad:"İstatistik / Veri Bilimi", kod:"ICE", puanTuru:"SAY", jobZone:4, trend:true, ornek:["Veri analisti","Aktüer"] },
    { ad:"Mimarlık", kod:"AIR", puanTuru:"SAY", jobZone:5, trend:false, ornek:["Mimar","Restorasyon uzmanı"] },
    { ad:"Endüstriyel / İç Mimarlık & Tasarım", kod:"ARE", puanTuru:"SAY", jobZone:4, trend:false, ornek:["İç mimar","Ürün tasarımcısı"] },
    { ad:"Görsel İletişim / Grafik Tasarım", kod:"AEI", puanTuru:"Yetenek/TYT", jobZone:3, trend:true, ornek:["Grafiker","UI/UX tasarımcı"] },
    { ad:"Sinema-TV / Radyo-TV", kod:"AES", puanTuru:"SÖZ/TYT", jobZone:3, trend:true, ornek:["Yönetmen","Kurgucu","İçerik üreticisi"] },
    { ad:"Gazetecilik / İletişim", kod:"ASE", puanTuru:"SÖZ/EA", jobZone:3, trend:false, ornek:["Gazeteci","Editör"] },
    { ad:"Mütercim-Tercümanlık", kod:"AIS", puanTuru:"DİL", jobZone:4, trend:false, ornek:["Çevirmen","Konferans tercümanı"] },
    { ad:"Müzik / Konservatuvar", kod:"AES", puanTuru:"Yetenek", jobZone:4, trend:false, ornek:["Müzisyen","Besteci"] },
    { ad:"Psikoloji", kod:"SIA", puanTuru:"EA", jobZone:5, trend:true, ornek:["Psikolog","Klinik psikolog"] },
    { ad:"Rehberlik ve Psikolojik Danışmanlık (PDR)", kod:"SEC", puanTuru:"EA", jobZone:4, trend:false, ornek:["Rehber öğretmen","Psik. danışman"] },
    { ad:"Öğretmenlik (branşa göre)", kod:"SAE", puanTuru:"EA/SÖZ/SAY", jobZone:4, trend:false, ornek:["Öğretmen"] },
    { ad:"Hemşirelik / Fizyoterapi / Ebelik", kod:"SIR", puanTuru:"SAY", jobZone:4, trend:false, ornek:["Hemşire","Fizyoterapist"] },
    { ad:"Sosyal Hizmet / Çocuk Gelişimi", kod:"SEC", puanTuru:"EA/SÖZ", jobZone:3, trend:false, ornek:["Sosyal hizmet uzmanı"] },
    { ad:"Sosyoloji", kod:"SIE", puanTuru:"EA/SÖZ", jobZone:4, trend:false, ornek:["Sosyolog","Araştırmacı"] },
    { ad:"İşletme / Uluslararası Ticaret", kod:"ECS", puanTuru:"EA", jobZone:4, trend:false, ornek:["Yönetici","Girişimci"] },
    { ad:"Hukuk", kod:"ESC", puanTuru:"EA", jobZone:5, trend:false, ornek:["Avukat","Hâkim","Savcı"] },
    { ad:"Siyaset Bilimi ve Uluslararası İlişkiler", kod:"ESA", puanTuru:"EA/SÖZ", jobZone:4, trend:false, ornek:["Diplomat","Uzman"] },
    { ad:"İktisat / Ekonomi", kod:"ECI", puanTuru:"EA", jobZone:4, trend:false, ornek:["İktisatçı","Analist"] },
    { ad:"Halkla İlişkiler / Reklamcılık", kod:"EAS", puanTuru:"SÖZ/EA", jobZone:3, trend:true, ornek:["Dijital pazarlamacı","PR uzmanı"] },
    { ad:"Turizm / Gastronomi İşletmeciliği", kod:"ESR", puanTuru:"TYT/EA", jobZone:3, trend:false, ornek:["İşletmeci","Şef"] },
    { ad:"Muhasebe ve Finans / Maliye", kod:"CEI", puanTuru:"EA", jobZone:4, trend:false, ornek:["Mali müşavir","Müfettiş"] },
    { ad:"Bankacılık ve Sigortacılık", kod:"CES", puanTuru:"EA/TYT", jobZone:3, trend:false, ornek:["Banka uzmanı"] },
    { ad:"Yönetim Bilişim Sistemleri (YBS)", kod:"CIE", puanTuru:"EA", jobZone:4, trend:true, ornek:["Bilgi yönetimi uzmanı","İş analisti"] },
    { ad:"Aktüerya", kod:"CIE", puanTuru:"SAY", jobZone:5, trend:true, ornek:["Aktüer","Risk analisti"] },
    { ad:"Lojistik / Tedarik Zinciri", kod:"CER", puanTuru:"EA/TYT", jobZone:3, trend:false, ornek:["Lojistik uzmanı"] }
  ];

  const codeMessages = {
    IRC:"AYT Matematik+Fen'e yüklen; yapay zekâ ve siber güvenlik en hızlı büyüyen alanlar.",
    IRA:"Hem araştıran hem üreten bir profil; mühendislik ve temel bilimler sana kapı açar.",
    ASE:"Hem yaratıcı hem insan odaklısın; dijital içerik ve iletişim yükselen alanlar.",
    AES:"İfade gücün yüksek; medya, tasarım ve sahne dünyası seni çağırıyor.",
    SEC:"İnsan odaklı + düzenli bir profil; PDR, öğretmenlik, İK ve işletme sana göre.",
    SAE:"İnsanlara dokunan, anlatan bir yanın var; eğitim ve iletişim alanları parlıyor.",
    ECS:"Liderlik ve düzen sende birlikte; işletme, hukuk ve yönetim güçlü seçenekler.",
    ESC:"Hem ikna hem strateji; hukuk, işletme ve kamu yönetimi senin sahan.",
    RIC:"Hem elin hem kafan çalışıyor; mühendislik dalları biçilmiş kaftan.",
    CIE:"Sistem ve veriyle aran iyi; finans, YBS ve aktüerya güçlü yollar."
  };

  const dialogue = {
    self: [
      "Sonuç seni {arketip} olarak tanımladı. Neresinde 'tam ben' dedin, neresinde 'pek değil'? Bir örnek ver.",
      "Para ve başkalarının ne diyeceği hiç önemli olmasaydı, bir gününü nasıl geçirirdin? Bu, {baskin} yanınla nasıl örtüşüyor?",
      "Geleceğindeki kendine, hayalindeki işin ilk günü için kısa bir mektup yaz: nerede çalışıyorsun, yanında kim var, ne hissediyorsun?",
      "Testte {dusuk} yanın daha az çıktı — bu 'yapamam' demek değil, belki henüz denemedin. Hangi {dusuk} işini bir kez denemek isterdin?",
      "Bu hafta {meslek1} hakkında öğrenebileceğin bir kişi ya da kaynak kim olabilir?"
    ],
    familyGuide: {
      do: ["Önce dinle, sözünü kesme.", "Kendi gençlik hayalini de paylaş.", "Rahat bir anda sor (yemekte, arabada)."],
      dont: ["Hemen meslek önerme / reçete yazma.", "“Ondan para kazanılmaz” diye yargılama.", "Karar için acele ettirme."]
    },
    family: [
      "Anne/baba, beni en çok hangi anımda 'işte bu o' diye hatırlıyorsun? Sonuç {guc1} diyor — sen bunu bende nerede gördün?",
      "Senin benim yaşımdayken hayalin neydi, ne oldu? Hangi kararı bugün farklı verirdin?",
      "Bir haftalığına istediğin biriyle hayat değiştirebilsen kimi seçerdin, onun hayatının neyi çekici geliyor?",
      "Dünyada çözülmesini en çok istediğin sorun ne? {ikincil} yanım bunda bana nasıl yardımcı olabilir sence?"
    ],
    counselor: [
      "Sonucum {meslek1} ve {meslek2} öneriyor. Bunu gerçekte yapan biriyle nasıl konuşabilirim ya da bir günlüğüne nasıl gözlemleyebilirim?",
      "{baskin} bir profil için lisede hangi dersleri, kulüpleri, projeleri denemem işime yarar? Nereden başlamamı önerirsin?",
      "Bu meslekleri sevdiğim kadar, günlük olarak zor/sıkıcı bulabileceğim yanları neler? Bunu nasıl test edebilirim?"
    ]
  };

  const steps = [
    { icon:"🔎", t:"Bir mesleği yakından tanı", d:"Listeden bir meslek seç; o işi yapan biriyle konuş ya da “bir günü nasıl geçer” videosu izle." },
    { icon:"🧪", t:"Küçük bir deneme yap", d:"İlgili bir kulüp, atölye, online kurs ya da gönüllü işle o alanı gerçek hayatta dene." },
    { icon:"🎓", t:"Bölüm–YKS bağını kur", d:"İlgilendiğin bölümün hangi puan türünü (SAY/EA/SÖZ/DİL) istediğini öğren; planını ona göre yap." },
    { icon:"🗣️", t:"Bir rehberle konuş", d:"Okul rehber öğretmeninle (ya da RAM) bu sonucu paylaş; fikrini değiştirmekte özgürsün." }
  ];

  const texts = {
    intro:"Bu test bir kişilik etiketi değil, kendini tanıman için eğlenceli bir <strong>keşif aracı</strong>. Doğru ya da yanlış cevap yok — sadece neyi sevip sevmediğini işaretle. Sonuçlar geleceğini belirlemez; sana yeni fikirler ve denenecek alanlar sunar. İlgilerin zamanla değişir, bu çok normal. 🤍",
    resultTop:"<strong>Senin yol haritan.</strong> Bu sonuçlar bugünkü ilgilerinin bir fotoğrafı — kesin bir kader değil. Şu alanlara ilgi duyuyor <em>olabilirsin</em>. En iyisi: birkaçını gerçek hayatta dene, öğretmenine/ailene danış. Fikrini değiştirmekte özgürsün.",
    privacy:"🔒 <strong>Gizliliğin önemli.</strong> Cevapların ve sonucun yalnızca bu cihazda, senin ekranında kalır — hiçbir sunucuya gönderilmez, kaydedilmez. İstersen ekran görüntüsü/PDF alıp ailen veya rehber öğretmeninle konuşabilirsin.",
    reliability:"Bu kısa bir testtir; uzun, klinik testler kadar kesin değildir ve bir uzman değerlendirmesinin yerini tutmaz. Onu bir başlangıç noktası, bir sohbet açıcı olarak gör. Okul/bölüm gibi önemli kararlarda rehber öğretmenine ya da RAM'a da danış."
  };

  return {
    version:"1.0", scales, types, bigfive, turns, items, valueDims, bridge,
    archetypes, archetypeMap, specialPairs, archetypeChat, careers, codeMessages,
    dialogue, steps, texts, RIASEC:["R","I","A","S","E","C"]
  };
})();
