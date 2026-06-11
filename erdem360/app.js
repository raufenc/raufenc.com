const modules = [
  {
    week: 1,
    virtue: "Niyet",
    title: "Bunu neden yapıyorum?",
    question: "Bir davranışı değerli yapan sadece sonuç mudur, niyet de önemli midir?",
    outcome: "Öğrenci iyi davranışın gösteriş, baskı ve içtenlik farkını örneklerle açıklar.",
    classroom: "Niyet pusulası: Aynı davranışın üç farklı niyetle nasıl değiştiği tartışılır.",
    portfolio: "Bu hafta iyi bir davranışı hangi niyetle yaptığımı yazıyorum.",
    family: "Evde bir iyiliği gizli yapıp gün sonunda hissettiğini konuş.",
    media: "Kısa animasyon: Görünen iyilik, görünmeyen niyet.",
    assessment: "Gerekçe kurma, örnek verme, gösteriş baskısını ayırt etme."
  },
  {
    week: 2,
    virtue: "Doğruluk",
    title: "Zor olsa da doğruyu söylemek",
    question: "Doğruyu söylemek bana kısa vadede zarar verecekse ne yaparım?",
    outcome: "Öğrenci doğru söz, eksik bilgi ve yalan arasındaki farkı ayırt eder.",
    classroom: "Son dakika yalanı: Grup kararı ve sonuç haritası.",
    portfolio: "Doğruyu söylemenin zor olduğu bir anı güvenli dille analiz et.",
    family: "Ailede bir yanlış anlaşılmayı suçlamadan düzeltme pratiği yap.",
    media: "Çizgi bölüm: Kayıp forma meselesi.",
    assessment: "Doğruyu nezaketle söyleme, telafi önerme, sorumluluk alma."
  },
  {
    week: 3,
    virtue: "Emanet",
    title: "Bana bırakılan şeyi korumak",
    question: "Bana güvenildiğinde kimse görmese de nasıl davranırım?",
    outcome: "Öğrenci eşya, bilgi, mahremiyet ve görev emanetini örneklerle sınıflandırır.",
    classroom: "Emanet rotası: Okul, ev ve dijital dünya karar istasyonları.",
    portfolio: "Bu hafta bana emanet edilen bir şeyi nasıl korudum?",
    family: "Evde küçük bir emanet seç, hafta sonunda nasıl korunduğunu konuş.",
    media: "Mikro video: Tablet bildirimleri ve mahremiyet.",
    assessment: "Mahremiyeti koruma, izin isteme, zarar varsa telafi."
  },
  {
    week: 4,
    virtue: "Sözünde Durma",
    title: "Söz güven ister",
    question: "Tutamayacağım sözü vermemek de ahlaki bir davranış mıdır?",
    outcome: "Öğrenci söz verme, haber verme ve özür-telafi zincirini kurar.",
    classroom: "Söz köprüsü: Söz, engel, haber verme, telafi kartları.",
    portfolio: "Bu hafta verdiğim bir sözü ve sürecini değerlendiriyorum.",
    family: "Aile takviminde küçük bir görevi söz verip takip et.",
    media: "Animasyon: Beş dakikaya geliyorum.",
    assessment: "Gerçekçi söz verme, gecikmeyi haber verme, telafi planı."
  },
  {
    week: 5,
    virtue: "Merhamet",
    title: "Gücü yetene karşı incelik",
    question: "Birine yardım ederken onu utandırmadan nasıl davranırım?",
    outcome: "Öğrenci merhameti acıma, küçümseme ve gösterişten ayırır.",
    classroom: "Sessiz destek: Yardım biçimini seçme atölyesi.",
    portfolio: "Birine fark ettirmeden kolaylık sağladığım bir an.",
    family: "Evde bir kişinin yükünü sormadan hafiflet.",
    media: "Kısa video: Kantin sırası.",
    assessment: "İncitmeden destek olma, güç dengesini fark etme."
  },
  {
    week: 6,
    virtue: "Dil Adabı",
    title: "Söz kalbe değer",
    question: "Şaka ile kırıcı söz arasındaki sınırı nasıl anlarım?",
    outcome: "Öğrenci sözün niyet, etki ve sorumluluk boyutunu değerlendirir.",
    classroom: "Kırılan kalp: Cümleyi onarma oyunu.",
    portfolio: "Bugün bir cümleyi daha güzel nasıl kurabilirdim?",
    family: "Evde teşekkür, rica ve özür cümlelerini bilinçli kullan.",
    media: "Çizgi bölüm: Grup sohbetindeki şaka.",
    assessment: "Kırıcı dili fark etme, onarıcı cümle kurma."
  },
  {
    week: 7,
    virtue: "Sabır",
    title: "Bekle, düşün, seç",
    question: "Sabır pasif kalmak mıdır, yoksa doğru zamanı seçmek midir?",
    outcome: "Öğrenci dürtü, öfke ve acele karar anlarında bekleme stratejisi uygular.",
    classroom: "Dürtü freni: 10 saniye kuralı ve karar kartları.",
    portfolio: "Beklediğim için daha iyi sonuçlanan bir anı yazıyorum.",
    family: "Evde sıra bekleme veya erteleme üzerine küçük deney yap.",
    media: "Oyun: Dürtü freni refleks turu.",
    assessment: "Duyguyu adlandırma, bekleme stratejisi, sonuç analizi."
  },
  {
    week: 8,
    virtue: "Şükür",
    title: "Nimeti fark etmek",
    question: "Alıştığım güzellikleri fark etmek davranışımı değiştirir mi?",
    outcome: "Öğrenci nimeti fark etme, teşekkür etme ve israf etmeme bağını kurar.",
    classroom: "Teşekkür listesi ve israfı azaltma tasarımı.",
    portfolio: "Bugün fark ettiğim üç nimet ve davranışa etkisi.",
    family: "Aile sofrasında bir teşekkür turu yap.",
    media: "Mikro video: Unutulan nimetler.",
    assessment: "Farkındalık, teşekkür dili, davranışa dönüştürme."
  },
  {
    week: 9,
    virtue: "Adalet",
    title: "Hakkı gözetmek",
    question: "Sevdiğim kişi haksızsa nasıl adil kalırım?",
    outcome: "Öğrenci tarafgirlik, hak, sorumluluk ve şahitlik durumlarını tartar.",
    classroom: "Karar terazisi: Hak, emek, ihtiyaç ve kural kartları.",
    portfolio: "Adil davranmakta zorlandığım bir örnek.",
    family: "Evde ortak iş bölümünü adalet açısından konuş.",
    media: "Oyun: Karar terazisi.",
    assessment: "Tarafgirliği fark etme, hakkı gözetme, gerekçeli karar."
  },
  {
    week: 10,
    virtue: "Kul Hakkı",
    title: "Dijital dünyada hak",
    question: "Ekranda yaptığım şeyin gerçek hayatta karşılığı var mı?",
    outcome: "Öğrenci dijital kopyalama, izinsiz paylaşım ve mahremiyet ihlalini kul hakkı bağlamında ele alır.",
    classroom: "Dijital iz: Fotoğraf, şifre, ödev ve kaynak senaryoları.",
    portfolio: "Dijital ortamda dikkat edeceğim üç hak.",
    family: "Aile dijital paylaşım sözleşmesini birlikte gözden geçir.",
    media: "Animasyon: Grup fotoğrafı gönderildi.",
    assessment: "İzin, kaynak gösterme, kişisel veri saygısı."
  },
  {
    week: 11,
    virtue: "Yardımlaşma",
    title: "Gösterişsiz iyilik",
    question: "Yardım etmek için alkış beklersem ne değişir?",
    outcome: "Öğrenci yardımı ihtiyaç, mahremiyet ve sürdürülebilirlik açısından planlar.",
    classroom: "Sessiz iyilik projesi tasarımı.",
    portfolio: "Bir iyiliğin görünür olmasına gerek var mıydı?",
    family: "Evde veya mahallede küçük bir destek planı yap.",
    media: "Belgesel kısa: Görünmeyen emek.",
    assessment: "İhtiyaç analizi, incitmeden yardım, süreklilik."
  },
  {
    week: 12,
    virtue: "Öz Denetim",
    title: "İrade ve hedef",
    question: "Kendimi yönetmek özgürlüğümü azaltır mı artırır mı?",
    outcome: "Öğrenci hedef, alışkanlık, dikkat ve öz değerlendirme ilişkisini kurar.",
    classroom: "Erdem portfolyosu sergisi ve gelecek sözleşmesi.",
    portfolio: "12 haftada bende değişen bir davranış.",
    family: "Aileyle birlikte küçük bir alışkanlık hedefi seç.",
    media: "Final video: Küçük kararlar büyük karakter.",
    assessment: "Öz değerlendirme, gerçekçi hedef, sürdürülebilir alışkanlık."
  }
];

const components = [
  ["Müfredat motoru", "Haftalık erdem, kazanım, etkinlik, medya ve ölçme eşleşmesini tutar."],
  ["Ders stüdyosu", "Öğretmene 40 dakikalık sınıf akışı, soru seti ve portfolyo görevi verir."],
  ["İçerik fabrikası", "Video, çizgi film, oyun, kitapçık ve aile kartı üretimini kuyruklar."],
  ["Öğrenci alanı", "Mikro ders, karar simülasyonu, oyun ve portfolyo ekranlarını sunar."],
  ["Veli hattı", "Haftalık kart, ev görevi ve kısa bilgilendirme mesajlarını yönetir."],
  ["Ölçme sistemi", "Dindarlık puanı değil, gözlenebilir davranış kanıtı ve gelişim notu üretir."]
];

const entities = [
  ["School", "Kurum, kampüs, eğitim yılı ve pilot izinleri."],
  ["Classroom", "Sınıf, öğretmen, öğrenci grubu ve haftalık takvim."],
  ["Module", "Erdem, kazanım, ders akışı, aile kartı, medya paketi."],
  ["Activity", "Oyun, senaryo, portfolyo, sınıf içi tartışma."],
  ["Evidence", "Öğrenci cevabı, öğretmen gözlemi, aile dönüşü."],
  ["Report", "Sınıf özeti, risk sinyali, içerik tamamlama, öğretmen notu."]
];

const assetTypes = ["Tümü", "Video", "Çizgi Film", "Oyun", "Kitapçık", "Aile Kartı", "Öğretmen"];

const assets = [
  { id: "v03", type: "Video", week: 3, title: "Emanet ve Mahremiyet", owner: "Video ekibi", defaultStatus: "Üretimde", brief: "3 dakikalık mikro ders. Tablet bildirimi, özel alan ve izin isteme örneğiyle kapanır.", deliverable: "1080p video, altyazı, öğretmen duraklatma soruları" },
  { id: "c03", type: "Çizgi Film", week: 3, title: "Tabletteki Bildirim", owner: "Animasyon", defaultStatus: "Taslak", brief: "Ortaokul dilinde 5 dakikalık bölüm. Merak, mahremiyet ve emaneti koruma kararı.", deliverable: "Senaryo, storyboard, seslendirme metni" },
  { id: "g03", type: "Oyun", week: 3, title: "Emanet Rotası", owner: "Oyun tasarım", defaultStatus: "Taslak", brief: "Okul, ev ve dijital dünyada 12 karar kartı. Öğrenci gerekçe seçmeden ilerleyemez.", deliverable: "Web mini oyun, karar kartları, öğretmen ekranı" },
  { id: "k03", type: "Kitapçık", week: 3, title: "Emanet Çalışma Sayfası", owner: "Editör", defaultStatus: "Hazır", brief: "Bir sayfa kavram, bir sayfa senaryo, bir sayfa portfolyo. Baskıya uygun.", deliverable: "PDF, DOCX, siyah beyaz baskı sürümü" },
  { id: "a03", type: "Aile Kartı", week: 3, title: "Evde Emanet Sohbeti", owner: "Veli iletişim", defaultStatus: "Hazır", brief: "Veliye kısa açıklama, sohbet sorusu, mini görev ve yargılamadan takip notu.", deliverable: "Mobil kart, PDF, WhatsApp metni" },
  { id: "t03", type: "Öğretmen", week: 3, title: "Ders Uygulama Kılavuzu", owner: "Pedagoji", defaultStatus: "Hazır", brief: "40 dakikalık akış, yanlış anlaşılma riskleri, hassas cevap yönetimi.", deliverable: "Öğretmen notu, rubrik, sınıf tartışma soruları" },
  { id: "v10", type: "Video", week: 10, title: "Dijital Kul Hakkı", owner: "Video ekibi", defaultStatus: "Taslak", brief: "İzinsiz fotoğraf paylaşımı, kaynak göstermeme ve şifre paylaşımı üstünden anlatım.", deliverable: "Mikro video, iki duraklatma sorusu" },
  { id: "g09", type: "Oyun", week: 9, title: "Karar Terazisi", owner: "Oyun tasarım", defaultStatus: "Üretimde", brief: "Hak, kural, emek ve ihtiyaç kartlarıyla gerekçeli adalet oyunu.", deliverable: "Mini oyun, sınıf turnuvası modu" },
  { id: "c06", type: "Çizgi Film", week: 6, title: "Şaka mı, Kırıcı mı?", owner: "Animasyon", defaultStatus: "Taslak", brief: "Grup sohbetinde kırıcı şaka ve onarıcı özür dili.", deliverable: "Storyboard, karakter listesi" },
  { id: "a12", type: "Aile Kartı", week: 12, title: "Erdem Portfolyosu Ev Sohbeti", owner: "Veli iletişim", defaultStatus: "Taslak", brief: "12 haftalık gelişimi konuşmak için baskısız aile kapanış kartı.", deliverable: "Mobil kart, çıktı PDF" }
];

const lessonRun = [
  ["Açılış", "3 dakika", "Günlük bir okul olayıyla erdem sorusu açılır. Öğrenci suçlanmaz, karar ortamı konuşulur."],
  ["Kaynak ve kavram", "7 dakika", "Erdem, yaş grubuna uygun örneklerle açıklanır. Dini dil davranışa bağlanır, ezbere sıkıştırılmaz."],
  ["Senaryo", "10 dakika", "Öğrenciler üç karar arasında gerekçe kurar. Öğretmen sonuçtan çok gerekçeyi dinler."],
  ["Uygulama", "12 dakika", "Grup oyunu veya atölye etkinliği yapılır. Her grup bir davranış kanıtı üretir."],
  ["Portfolyo", "5 dakika", "Öğrenci kısa yansıtma yazar. Mahrem cevaplar sınıfa açık okunmaz."],
  ["Aile köprüsü", "3 dakika", "Haftanın aile kartı tanıtılır. Evde baskısız sohbet hedeflenir."]
];

const scenario = {
  text: "Arkadaşın tabletini sana emanet etti. Bildirim ekranında özel bir mesaj belirdi. Arkadaşın henüz dönmedi.",
  choices: [
    ["peek", "Mesaja bakarım", "Merak ettim, zaten önümde duruyor.", "Bu seçim mahremiyeti zedeler. Emanet, başkasının özel alanını da korumaktır.", "warn"],
    ["protect", "Tableti ters çeviririm", "Bildirimleri kapatır, cihazı güvenli yerde tutarım.", "Doğru karar. Hem emaneti hem mahremiyeti korudun.", "good"],
    ["adult", "Öğretmene teslim ederim", "Uzun süre bende kalacaksa güvenli yetişkine bırakırım.", "Bu da güçlü bir karar. Risk büyüyorsa sorumluluğu paylaşmak gerekir.", "good"]
  ]
};

const students = [
  ["Ayşe K.", "İyi ilerliyor", "Portfolyo yazdı, aile kartı döndü", "Gerekçe cümlelerini derinleştir"],
  ["Mehmet A.", "Takip gerekli", "Oyunda hızlı seçiyor, gerekçe zayıf", "Senaryo sonrası bire bir soru sor"],
  ["Zeynep T.", "Güçlü", "Mahremiyet örneğini iyi açıkladı", "Akran grup liderliği ver"],
  ["Yusuf E.", "Eksik kayıt", "Aile kartı dönmedi", "Veliye yumuşak hatırlatma gönder"]
];

const rubric = [
  ["Fark etme", "Öğrenci ahlaki karar anını ve ilgili hakkı fark eder."],
  ["Gerekçe", "Seçimini sadece sonuçla değil değer, hak ve sorumlulukla açıklar."],
  ["Eylem", "Sınıf veya ev görevinde küçük ama somut davranış üretir."],
  ["Telafi", "Hata varsa savunmaya geçmeden onarma adımı önerir."],
  ["Süreklilik", "Haftalık portfolyoda gelişen bir alışkanlığı takip eder."]
];

const measurement = [
  ["Tamamlama", "Mikro ders, oyun, portfolyo ve aile kartı tamamlama oranı."],
  ["Gerekçe kalitesi", "Öğrencinin kararını hak, sorumluluk ve merhamet diliyle açıklaması."],
  ["Öğretmen gözlemi", "Sınıfta görünür davranış kanıtı ve risk notu."],
  ["Aile dönüşü", "Ev görevinin yapılıp yapılmadığı ve kısa veli notu."],
  ["İçerik sağlığı", "Hangi video, oyun veya kartta zorlanma yaşandığı."]
];

const privacy = [
  ["İnanç puanı yok", "Öğrencinin iman, dindarlık veya manevi değerini puanlamaz."],
  ["Mahrem cevap kapalı", "Kişisel portfolyo cevabı sınıf raporunda açık metin olarak görünmez."],
  ["Veli baskısı yok", "Aile kartları sorgulama değil sohbet ve gözlem için tasarlanır."],
  ["Reklam ve izleyici yok", "Çocuk verisi reklam, takip pikseli veya üçüncü taraf profillemeye açılmaz."],
  ["Yetki sınırı", "Öğretmen, veli ve yönetim rolleri ayrı veri görür."]
];

const architecture = [
  ["Frontend", "Next.js veya statik PWA kabuğu; öğrenci, öğretmen, veli ve yönetim alanları."],
  ["Veritabanı", "Postgres: kurum, sınıf, kullanıcı, modül, aktivite, kanıt ve rapor tabloları."],
  ["Kimlik", "Kurum daveti, veli onayı, yaş grubuna uygun güvenli oturum."],
  ["CMS", "Editör taslak-onay-yayın akışı; video, oyun, PDF ve kart paketleri."],
  ["Raporlama", "Sınıf özeti, içerik sağlığı, öğretmen notu ve haftalık gelişim grafiği."],
  ["Standartlar", "xAPI olay dili, SCORM paket ihracı ve erişilebilirlik kontrolleri."]
];

const sprint = [
  ["Sprint 1", "Kullanıcı, kurum, sınıf ve rol bazlı oturum sistemi."],
  ["Sprint 2", "Müfredat CMS'i, modül editörü ve içerik onay akışı."],
  ["Sprint 3", "Öğrenci öğrenme alanı, portfolyo ve mini oyun motoru."],
  ["Sprint 4", "Veli kartı gönderimi, öğretmen gözlem paneli ve raporlar."],
  ["Sprint 5", "Video/çizgi film paketleri, erişilebilirlik ve pilot sınıf testi."],
  ["Sprint 6", "KVKK/COPPA metinleri, veri saklama politikası, production izleme."]
];

const defaultState = {
  route: "command",
  selectedWeek: 3,
  selectedAsset: "v03",
  assetFilter: "Tümü",
  reflection: "",
  scenarioChoice: "",
  sentFamilyCards: [],
  assetStatuses: {}
};

const state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("erdem360-command-state"));
    return { ...defaultState, ...saved, assetStatuses: { ...defaultState.assetStatuses, ...(saved?.assetStatuses || {}) } };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem("erdem360-command-state", JSON.stringify(state));
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return [...document.querySelectorAll(selector)];
}

function moduleByWeek(week = state.selectedWeek) {
  return modules.find(module => module.week === Number(week)) || modules[0];
}

function assetStatus(asset) {
  return state.assetStatuses[asset.id] || asset.defaultStatus;
}

function statusClass(status) {
  if (status === "Hazır") return "status-ready";
  if (status === "Üretimde") return "status-working";
  return "status-draft";
}

function readiness() {
  const readyAssets = assets.filter(asset => assetStatus(asset) === "Hazır").length / assets.length;
  const family = state.sentFamilyCards.length / modules.length;
  const reflection = state.reflection.trim() ? 1 : 0;
  const scenarioDone = state.scenarioChoice ? 1 : 0;
  return Math.round(((readyAssets * 55) + (family * 15) + (reflection * 15) + (scenarioDone * 15)));
}

function setRoute(route) {
  state.route = route;
  saveState();
  const titles = {
    command: "Komuta",
    curriculum: "Müfredat",
    studio: "Ders Stüdyosu",
    production: "İçerik Fabrikası",
    classroom: "Sınıf",
    family: "Aile",
    media: "Oyun ve Video",
    analytics: "Ölçme",
    launch: "Canlılaştırma"
  };
  qs("#pageTitle").textContent = titles[route] || "Komuta";
  qsa(".view").forEach(view => view.classList.toggle("active", view.id === route));
  qsa(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.route === route));
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  render();
}

function renderCommand() {
  qs("#readinessMetric").textContent = `${readiness()}%`;
  const ready = assets.filter(asset => assetStatus(asset) === "Hazır").length;
  qs("#queueMetric").textContent = `${ready}/${assets.length}`;
  qs("#componentList").innerHTML = components.map(([title, body]) => `
    <article class="component-item"><strong>${title}</strong><span>${body}</span></article>
  `).join("");
  qs("#entityList").innerHTML = entities.map(([title, body]) => `
    <article class="entity-item"><strong>${title}</strong><span>${body}</span></article>
  `).join("");
}

function renderCurriculum() {
  qs("#weekTabs").innerHTML = modules.map(module => `
    <button class="week-tab ${module.week === state.selectedWeek ? "active" : ""}" data-week="${module.week}" type="button">Hafta ${module.week}</button>
  `).join("");

  const selected = moduleByWeek();
  qs("#moduleDetail").innerHTML = `
    <span class="eyebrow">Hafta ${selected.week}</span>
    <h3>${selected.virtue}: ${selected.title}</h3>
    <p>${selected.question}</p>
    <div class="tag-row">
      <span class="tag">Ders</span>
      <span class="tag">Oyun</span>
      <span class="tag">Video</span>
      <span class="tag">Aile kartı</span>
      <span class="tag">Portfolyo</span>
    </div>
    <div class="detail-grid">
      <article class="detail-box"><strong>Kazanım</strong><span>${selected.outcome}</span></article>
      <article class="detail-box"><strong>Sınıf etkinliği</strong><span>${selected.classroom}</span></article>
      <article class="detail-box"><strong>Portfolyo</strong><span>${selected.portfolio}</span></article>
      <article class="detail-box"><strong>Aile görevi</strong><span>${selected.family}</span></article>
      <article class="detail-box"><strong>Medya</strong><span>${selected.media}</span></article>
      <article class="detail-box"><strong>Ölçme</strong><span>${selected.assessment}</span></article>
    </div>
  `;

  qs("#curriculumTable").innerHTML = modules.map(module => `
    <div class="table-row">
      <span><strong>${module.week}. hafta</strong></span>
      <span><strong>${module.virtue}</strong><br>${module.title}</span>
      <span>${module.classroom}</span>
    </div>
  `).join("");
}

function renderStudio() {
  const selected = moduleByWeek();
  qs("#studioModuleTitle").textContent = `${selected.virtue}: ${selected.title}`;
  qs("#lessonRun").innerHTML = lessonRun.map(([title, time, body]) => `
    <article class="run-item"><strong>${title} - ${time}</strong><span>${body}</span></article>
  `).join("");
  qs("#reflection").value = state.reflection || selected.portfolio;
  qs("#reflectionStatus").textContent = state.reflection.trim() ? "Portfolyo demo kaydı tutuldu." : "";

  qs("#scenarioText").textContent = scenario.text;
  qs("#scenarioChoices").innerHTML = scenario.choices.map(([id, title, body]) => `
    <button class="choice-card ${state.scenarioChoice === id ? "selected" : ""}" data-scenario="${id}" type="button">
      <strong>${title}</strong>
      <span>${body}</span>
    </button>
  `).join("");
  const chosen = scenario.choices.find(([id]) => id === state.scenarioChoice);
  const feedback = qs("#scenarioFeedback");
  if (chosen) {
    feedback.textContent = chosen[3];
    feedback.className = `feedback-box ${chosen[4]}`;
  } else {
    feedback.textContent = "";
    feedback.className = "feedback-box";
  }
}

function renderProduction() {
  qs("#assetFilters").innerHTML = assetTypes.map(type => `
    <button class="filter-btn ${type === state.assetFilter ? "active" : ""}" data-filter="${type}" type="button">${type}</button>
  `).join("");

  const shown = assets.filter(asset => state.assetFilter === "Tümü" || asset.type === state.assetFilter);
  if (!shown.some(asset => asset.id === state.selectedAsset) && shown[0]) {
    state.selectedAsset = shown[0].id;
  }

  qs("#assetBoard").innerHTML = shown.map(asset => {
    const status = assetStatus(asset);
    return `
      <button class="asset-card ${asset.id === state.selectedAsset ? "selected" : ""}" data-asset="${asset.id}" type="button">
        <strong>${asset.title}</strong>
        <span>${asset.type} - Hafta ${asset.week} - ${asset.owner}</span>
        <span class="asset-meta">
          <span class="badge ${statusClass(status)}">${status}</span>
          <span class="badge">${asset.deliverable.split(",")[0]}</span>
        </span>
      </button>
    `;
  }).join("");

  const asset = assets.find(item => item.id === state.selectedAsset) || assets[0];
  qs("#assetTitle").textContent = asset.title;
  qs("#assetBrief").innerHTML = `
    <p><strong>Tip:</strong> ${asset.type}</p>
    <p><strong>Hafta:</strong> ${asset.week} - ${moduleByWeek(asset.week).virtue}</p>
    <p><strong>Sorumlu:</strong> ${asset.owner}</p>
    <p><strong>Brief:</strong> ${asset.brief}</p>
    <p><strong>Teslim:</strong> ${asset.deliverable}</p>
    <p><strong>Durum:</strong> ${assetStatus(asset)}</p>
  `;
}

function renderClassroom() {
  const risk = students.filter(row => row[1] !== "Güçlü" && row[1] !== "İyi ilerliyor").length;
  qs("#riskMetric").textContent = risk;
  qs("#portfolioMetric").textContent = state.reflection.trim() ? "68%" : "61%";
  qs("#studentRows").innerHTML = students.map(row => `
    <tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>
  `).join("");
  qs("#rubricList").innerHTML = rubric.map(([title, body]) => `
    <article class="rubric-item"><strong>${title}</strong><span>${body}</span></article>
  `).join("");
}

function renderFamily() {
  const selected = moduleByWeek();
  const isSent = state.sentFamilyCards.includes(selected.week);
  qs("#familyCardTitle").textContent = `${selected.virtue}: ${selected.title}`;
  qs("#familyCardBody").innerHTML = `
    <p><strong>Sohbet sorusu:</strong> ${selected.question}</p>
    <p><strong>Mini görev:</strong> ${selected.family}</p>
    <p><strong>Veli dili:</strong> Çocuğu sorgulamak yerine davranış kanıtını fark edin, iyi örneği açıkça takdir edin.</p>
    <p><strong>Durum:</strong> ${isSent ? "Veliye gönderildi" : "Gönderim bekliyor"}</p>
  `;
  qs("#sendFamilyCard").textContent = isSent ? "Gönderildi" : "Veliye gönderildi işaretle";
  qs("#sendFamilyCard").disabled = isSent;
  qs("#familyArchive").innerHTML = modules.map(module => {
    const sent = state.sentFamilyCards.includes(module.week);
    return `
      <article class="archive-item">
        <strong>${module.week}. hafta - ${module.virtue}</strong>
        <span>${module.family}</span>
        <span class="badge ${sent ? "status-ready" : "status-draft"}">${sent ? "Gönderildi" : "Bekliyor"}</span>
      </article>
    `;
  }).join("");
}

function renderMedia() {
  const picks = [
    modules[2],
    modules[5],
    modules[6],
    modules[8],
    modules[9],
    modules[11]
  ];
  qs("#mediaLibrary").innerHTML = picks.map(module => `
    <article class="media-card">
      <header>
        <div>
          <span class="eyebrow">Hafta ${module.week}</span>
          <strong>${module.virtue}</strong>
        </div>
        <span class="badge">${module.media.includes("Oyun") ? "Oyun" : "Video"}</span>
      </header>
      <p>${module.media}</p>
      <ul>
        <li>Sınıfta duraklatma soruları</li>
        <li>Ev izleme kartı</li>
        <li>Öğretmen için yanlış anlama notları</li>
      </ul>
    </article>
  `).join("");
}

function renderAnalytics() {
  qs("#measurementList").innerHTML = measurement.map(([title, body]) => `
    <article class="component-item"><strong>${title}</strong><span>${body}</span></article>
  `).join("");
  qs("#privacyList").innerHTML = privacy.map(([title, body]) => `
    <article class="component-item"><strong>${title}</strong><span>${body}</span></article>
  `).join("");
  const selected = moduleByWeek();
  const events = [
    ["learner viewed module", `Hafta ${selected.week} - ${selected.virtue}`],
    ["learner answered scenario", state.scenarioChoice || "bekliyor"],
    ["learner saved portfolio", state.reflection.trim() ? "kaydedildi" : "bekliyor"],
    ["parent card sent", state.sentFamilyCards.includes(selected.week) ? "gönderildi" : "bekliyor"],
    ["asset marked ready", `${assets.filter(asset => assetStatus(asset) === "Hazır").length} içerik hazır`]
  ];
  qs("#eventLog").innerHTML = events.map(([verb, object]) => `
    <article class="event-item"><strong>${verb}</strong><span>${object}</span></article>
  `).join("");
}

function renderLaunch() {
  qs("#architectureList").innerHTML = architecture.map(([title, body]) => `
    <article class="component-item"><strong>${title}</strong><span>${body}</span></article>
  `).join("");
  qs("#sprintList").innerHTML = sprint.map(([title, body]) => `
    <article class="sprint-item"><strong>${title}</strong><span>${body}</span></article>
  `).join("");
}

function render() {
  renderCommand();
  renderCurriculum();
  renderStudio();
  renderProduction();
  renderClassroom();
  renderFamily();
  renderMedia();
  renderAnalytics();
  renderLaunch();
  qsa(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.route === state.route));
  qsa(".view").forEach(view => view.classList.toggle("active", view.id === state.route));
}

function downloadSprintBrief() {
  const lines = [
    "Erdem360 Sprint Özeti",
    "",
    `Hazırlık: ${readiness()}%`,
    `Seçili modül: Hafta ${state.selectedWeek} - ${moduleByWeek().virtue}`,
    `Hazır içerik: ${assets.filter(asset => assetStatus(asset) === "Hazır").length}/${assets.length}`,
    "",
    "İlk V1 işleri:",
    ...sprint.map(([title, body]) => `- ${title}: ${body}`)
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "erdem360-sprint-ozeti.txt";
  anchor.click();
  URL.revokeObjectURL(url);
}

document.addEventListener("click", event => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    event.preventDefault();
    setRoute(routeButton.dataset.route);
    return;
  }

  const weekButton = event.target.closest("[data-week]");
  if (weekButton) {
    state.selectedWeek = Number(weekButton.dataset.week);
    saveState();
    render();
    return;
  }

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    state.assetFilter = filterButton.dataset.filter;
    saveState();
    render();
    return;
  }

  const assetButton = event.target.closest("[data-asset]");
  if (assetButton) {
    state.selectedAsset = assetButton.dataset.asset;
    saveState();
    render();
    return;
  }

  const statusButton = event.target.closest("[data-status]");
  if (statusButton) {
    state.assetStatuses[state.selectedAsset] = statusButton.dataset.status;
    saveState();
    render();
    return;
  }

  const scenarioButton = event.target.closest("[data-scenario]");
  if (scenarioButton) {
    state.scenarioChoice = scenarioButton.dataset.scenario;
    saveState();
    render();
  }
});

qs("#saveReflection").addEventListener("click", () => {
  state.reflection = qs("#reflection").value.trim();
  saveState();
  render();
});

qs("#clearReflection").addEventListener("click", () => {
  state.reflection = "";
  saveState();
  render();
});

qs("#sendFamilyCard").addEventListener("click", () => {
  if (!state.sentFamilyCards.includes(state.selectedWeek)) {
    state.sentFamilyCards.push(state.selectedWeek);
  }
  saveState();
  render();
});

qs("#downloadBrief").addEventListener("click", downloadSprintBrief);

qs("#resetDemo").addEventListener("click", () => {
  localStorage.removeItem("erdem360-command-state");
  Object.assign(state, { ...defaultState, assetStatuses: {}, sentFamilyCards: [] });
  render();
  setRoute("launch");
});

render();
setRoute(state.route);
