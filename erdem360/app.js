const modules = [
  { id: 1, virtue: "Niyet", title: "Bunu neden yapıyorum?", product: "Niyet pusulası" },
  { id: 2, virtue: "Doğruluk", title: "Zor olsa da doğruyu söylemek", product: "Son dakika yalanı" },
  { id: 3, virtue: "Emanet", title: "Bana bırakılan şeyi korumak", product: "Emanet rotası" },
  { id: 4, virtue: "Sözünde durma", title: "Söz güven ister", product: "Söz köprüsü" },
  { id: 5, virtue: "Merhamet", title: "Gücü yetene karşı incelik", product: "Sessiz arkadaş" },
  { id: 6, virtue: "Dil adabı", title: "Söz kalbe değer", product: "Kırılan kalp" },
  { id: 7, virtue: "Sabır", title: "Bekle, düşün, seç", product: "Dürtü freni" },
  { id: 8, virtue: "Şükür", title: "Nimeti fark etmek", product: "Teşekkür listesi" },
  { id: 9, virtue: "Adalet", title: "Hakkı gözetmek", product: "Karar terazisi" },
  { id: 10, virtue: "Kul hakkı", title: "Dijital dünyada hak", product: "Dijital iz" },
  { id: 11, virtue: "Yardımlaşma", title: "Gösterişsiz iyilik", product: "Sessiz iyilik" },
  { id: 12, virtue: "Öz denetim", title: "İrade ve hedef", product: "Erdem portfolyosu" }
];

const lessonSteps = [
  {
    title: "Erdem",
    html: "<h3>Emanet nedir?</h3><p>Emanet sadece bize bırakılan eşya değildir. Söz, bilgi, sır, görev ve arkadaşımızın güveni de emanettir.</p><ul><li>Emanet korunur.</li><li>İzin olmadan açılmaz.</li><li>Zarar verilirse telafi edilir.</li></ul>"
  },
  {
    title: "Değer",
    html: "<h3>Güven nasıl kurulur?</h3><p>Güven küçük davranışlarla büyür: sözünde durmak, izinsiz bakmamak, görevi vaktinde yapmak, hata olunca açıkça telafi etmek.</p>"
  },
  {
    title: "Kaynak",
    html: "<h3>Güvenilir insan</h3><p>İslam ahlakında emanet, kişinin görünmeyen yerdeki duruşunu da güzelleştirir. Öğrenci bunu okulda, evde ve dijital dünyada dener.</p>"
  },
  {
    title: "Eylem",
    html: "<h3>Haftalık görev</h3><p>Bu hafta sana bırakılan küçük bir emaneti seç. Ne olduğunu, nasıl koruduğunu ve zorlandığın anı portfolyona yaz.</p>"
  },
  {
    title: "Kapanış",
    html: "<h3>Bir cümlelik söz</h3><p>Bugünkü sözüm: Bana güvenildiğinde, o güveni kimse görmese de koruyacağım.</p>"
  }
];

const scenarioChoices = [
  {
    id: "peek",
    title: "Merak edip mesajlara bakarım",
    body: "Zaten tablet önümde. Bir şey olmaz diye düşünürüm.",
    tone: "warn",
    feedback: "Bu seçim merakı öne alır ama mahremiyeti ve emaneti zedeler. Emanet, başkasının özel alanını da korumaktır."
  },
  {
    id: "protect",
    title: "Tableti ters çevirip bildirimleri kapatırım",
    body: "Arkadaşım gelene kadar cihazı güvenli bir yerde tutarım.",
    tone: "good",
    feedback: "Güzel karar. Emaneti korudun, mahremiyete saygı gösterdin ve güveni büyüten davranışı seçtin."
  },
  {
    id: "ask",
    title: "Öğretmene teslim ederim",
    body: "Uzun süre bende kalacaksa güvenli bir yetişkine teslim ederim.",
    tone: "good",
    feedback: "Bu da doğru bir yol. Emaneti yalnız taşımak riskliyse güvenli bir yetişkinden destek almak sorumluluktur."
  }
];

const gameCards = [
  { text: "Arkadaşın kitabını ödünç aldın, kapağı yıprandı.", answer: "repair", ok: "Zarar varsa telafi ve açık söz gerekir." },
  { text: "Sınıf grubuna izinsiz fotoğraf atılacak.", answer: "protect", ok: "Mahremiyeti ve kul hakkını korumak gerekir." },
  { text: "Bir görevi yapamayacağını son anda fark ettin.", answer: "ask", ok: "Vaktinde haber vermek ve destek istemek güveni korur." },
  { text: "Sana verilen şifreyi arkadaşın istedi.", answer: "protect", ok: "Şifre de emanettir; paylaşılmaz." }
];

const defaultState = {
  role: "student",
  route: "dashboard",
  lessonStep: 0,
  completedLessonSteps: [],
  scenario: null,
  gameIndex: 0,
  gameCorrect: 0,
  gameAnswered: 0,
  reflection: "",
  familyDone: false
};

const state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("erdem360-state"));
    return { ...defaultState, ...saved };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem("erdem360-state", JSON.stringify(state));
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return [...document.querySelectorAll(selector)];
}

function setRoute(route) {
  state.route = route;
  saveState();
  qsa(".view").forEach(view => view.classList.toggle("active", view.id === route));
  qsa(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.route === route));
  const titleMap = {
    dashboard: "Pano",
    learn: "Öğrenme Yolu",
    scenario: "Karar Senaryosu",
    game: "Mini Oyun",
    portfolio: "Portfolyo",
    family: "Aile Kartı",
    teacher: "Öğretmen",
    admin: "Yönetim"
  };
  qs("#pageTitle").textContent = titleMap[route] || "Pano";
  qs("#main").focus({ preventScroll: true });
  render();
}

function setRole(role) {
  state.role = role;
  saveState();
  qsa(".role-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.role === role));
  const roleRoutes = { student: "dashboard", teacher: "teacher", parent: "family", admin: "admin" };
  setRoute(roleRoutes[role] || "dashboard");
}

function completionPercent() {
  const lesson = state.completedLessonSteps.length / lessonSteps.length;
  const scenario = state.scenario ? 1 : 0;
  const game = gameCards.length ? Math.min(state.gameAnswered / gameCards.length, 1) : 0;
  const portfolio = state.reflection.trim() ? 1 : 0;
  const family = state.familyDone ? 1 : 0;
  return Math.round(((lesson + scenario + game + portfolio + family) / 5) * 100);
}

function renderModules() {
  const list = qs("#moduleList");
  list.innerHTML = modules.map((mod) => {
    const done = mod.id <= 3 && completionPercent() > 30;
    return `
      <article class="module-item">
        <span class="module-num">${mod.id}</span>
        <span><strong>${mod.virtue}</strong><span>${mod.title} · ${mod.product}</span></span>
        <i class="status-dot ${done ? "done" : ""}" aria-label="${done ? "tamamlandı" : "bekliyor"}"></i>
      </article>
    `;
  }).join("");
}

function renderMetrics() {
  qs("#metricCompletion").textContent = `${completionPercent()}%`;
  qs("#metricPortfolio").textContent = state.reflection.trim() ? "1" : "0";
  qs("#metricFamily").textContent = state.familyDone ? "Tamam" : "Bekliyor";
  qs("#metricScenario").textContent = state.scenario ? (state.scenario === "peek" ? "Gelişiyor" : "Yetkin") : "-";
}

function renderLesson() {
  const step = Math.max(0, Math.min(state.lessonStep, lessonSteps.length - 1));
  state.lessonStep = step;
  qs("#lessonStepLabel").textContent = `${step + 1} / ${lessonSteps.length}`;
  qs("#lessonContent").innerHTML = lessonSteps[step].html;
  qs("#prevLesson").disabled = step === 0;
  qs("#nextLesson").textContent = step === lessonSteps.length - 1 ? "Tamamla" : "Anladım";
  qs("#stepper").innerHTML = lessonSteps.map((_, index) => {
    const done = state.completedLessonSteps.includes(index);
    const active = index === step;
    return `<span class="step-pill ${done ? "done" : ""} ${active ? "active" : ""}"></span>`;
  }).join("");
}

function renderScenario() {
  qs("#scenarioChoices").innerHTML = scenarioChoices.map(choice => `
    <button class="choice-card ${state.scenario === choice.id ? "selected" : ""}" data-choice="${choice.id}" type="button">
      <strong>${choice.title}</strong>
      <span>${choice.body}</span>
    </button>
  `).join("");
  const fb = qs("#scenarioFeedback");
  const selected = scenarioChoices.find(choice => choice.id === state.scenario);
  if (selected) {
    fb.className = `feedback-box show ${selected.tone}`;
    fb.textContent = selected.feedback;
  } else {
    fb.className = "feedback-box";
    fb.textContent = "";
  }
}

function renderGame() {
  const index = state.gameIndex % gameCards.length;
  qs("#gameCard").textContent = gameCards[index].text;
  qs("#gameScore").textContent = `${state.gameCorrect} / ${state.gameAnswered}`;
  const fb = qs("#gameFeedback");
  fb.className = "feedback-box";
  fb.textContent = "";
}

function answerGame(zone) {
  const card = gameCards[state.gameIndex % gameCards.length];
  state.gameAnswered += 1;
  const ok = zone === card.answer;
  if (ok) state.gameCorrect += 1;
  const fb = qs("#gameFeedback");
  fb.className = `feedback-box show ${ok ? "good" : "warn"}`;
  fb.textContent = ok ? card.ok : `Bir daha düşün: ${card.ok}`;
  state.gameIndex = (state.gameIndex + 1) % gameCards.length;
  saveState();
  setTimeout(render, 850);
}

function renderPortfolio() {
  qs("#reflection").value = state.reflection;
  const box = qs("#portfolioSaved");
  box.className = state.reflection.trim() ? "feedback-box show good" : "feedback-box";
  box.textContent = state.reflection.trim() ? "Portfolyo cevabın kaydedildi." : "";
}

function renderTeacher() {
  qs("#teacherLesson").textContent = `${state.completedLessonSteps.length}/${lessonSteps.length}`;
  qs("#teacherScenario").textContent = state.scenario ? "Tamamlandı" : "Bekliyor";
  qs("#teacherFamily").textContent = state.familyDone ? "Tamamlandı" : "Bekliyor";
  const evidence = [
    state.completedLessonSteps.length === lessonSteps.length ? "Mikro ders tamam" : "Mikro ders sürüyor",
    state.scenario ? "Karar senaryosu var" : "Senaryo bekliyor",
    state.reflection.trim() ? "Portfolyo yazıldı" : "Portfolyo bekliyor",
    state.familyDone ? "Aile görevi tamam" : "Aile görevi bekliyor"
  ];
  qs("#teacherRows").innerHTML = `
    <tr>
      <td>Demo Öğrenci</td>
      <td>${completionPercent()}% ilerleme</td>
      <td>${evidence.join("<br>")}</td>
      <td>Dindarlık puanı yok; gerekçe, emek ve telafi dili izleniyor.</td>
    </tr>
    <tr>
      <td>6/A sınıf ortalaması</td>
      <td>Örnek veri</td>
      <td>Canlı sınıf bağlanınca toplulaştırılır.</td>
      <td>Mahrem cevaplar kurum raporuna açılmaz.</td>
    </tr>
  `;
}

function render() {
  renderModules();
  renderMetrics();
  renderLesson();
  renderScenario();
  renderGame();
  renderPortfolio();
  renderTeacher();
  qsa(".role-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.role === state.role));
  qsa(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.route === state.route));
  qsa(".view").forEach(view => view.classList.toggle("active", view.id === state.route));
}

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    event.preventDefault();
    setRoute(routeButton.dataset.route);
  }

  const roleButton = event.target.closest("[data-role]");
  if (roleButton) {
    setRole(roleButton.dataset.role);
  }

  const scenarioButton = event.target.closest("[data-choice]");
  if (scenarioButton) {
    state.scenario = scenarioButton.dataset.choice;
    saveState();
    render();
  }

  const decisionButton = event.target.closest("[data-zone]");
  if (decisionButton) {
    answerGame(decisionButton.dataset.zone);
  }
});

qs("#prevLesson").addEventListener("click", () => {
  state.lessonStep = Math.max(0, state.lessonStep - 1);
  saveState();
  render();
});

qs("#nextLesson").addEventListener("click", () => {
  if (!state.completedLessonSteps.includes(state.lessonStep)) {
    state.completedLessonSteps.push(state.lessonStep);
  }
  if (state.lessonStep < lessonSteps.length - 1) {
    state.lessonStep += 1;
  }
  saveState();
  render();
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

qs("#familyDone").addEventListener("click", () => {
  state.familyDone = true;
  saveState();
  renderMetrics();
  qs("#familyDone").textContent = "Aile görevi kaydedildi";
});

qs("#resetDemo").addEventListener("click", () => {
  localStorage.removeItem("erdem360-state");
  Object.assign(state, { ...defaultState });
  render();
  setRoute("teacher");
});

render();
