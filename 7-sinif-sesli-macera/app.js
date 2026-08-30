(function () {
  "use strict";

  var STORAGE_KEY = "tr.eba.ar7.unit2.sepet.v1";
  var PASS_SCORE = 70;

  var clips = {
    "026": { speaker: "Fatih", ar: "ماذا تُريدينَ يا أُمّي؟", tr: "Ne istiyorsun anne?" },
    "027": { speaker: "Anne", ar: "أَنا بِحاجَة إِلى بَعْض الأَشْياء مِن البَقّالَة.", tr: "Bakkaldan bazı şeylere ihtiyacım var." },
    "028": { speaker: "Anne", ar: "أَطْلُبُ مِنْكَ كيلو سُكَّر، وَعُلْبَة مِلْح، وَعُلْبَتَيْنِ مِن الشّاي.", tr: "Senden bir kilo şeker, bir kutu tuz ve iki kutu çay istiyorum." },
    "029": { speaker: "Fatih", ar: "هَلْ تُريدينَ شَيْئًا آخَر؟", tr: "Başka bir şey istiyor musun?" },
    "030": { speaker: "Anne", ar: "أُريدُ خُبْزًا طازَجًا أَيْضًا.", tr: "Taze ekmek de istiyorum." },
    "031": { speaker: "Fatih", ar: "حَسَنًا، سَأَذْهَبُ الآن.", tr: "Peki, şimdi gideceğim." },
    "032": { speaker: "Fatih", ar: "أَنا أَذْهَبُ إِلى السّوق لِلتَّسَوُّق.", tr: "Alışveriş için pazara gidiyorum." },
    "033": { speaker: "Fatih", ar: "أَذْهَبُ إِلى السّوق وَأَشْتَري الفَواكِه وَالخَضْراوات.", tr: "Pazara gidiyor, meyve ve sebze alıyorum." },
    "034": { speaker: "Manav", ar: "أَهْلًا وَسَهْلًا، أَيّ خِدْمَة؟ ماذا تُريدينَ؟", tr: "Hoş geldiniz, nasıl yardımcı olabilirim? Ne istiyorsunuz?" },
    "035": { speaker: "Meryem", ar: "أَهْلًا بِكَ، أَنا بِحاجَة إِلى خَضْراوات طازَجَة.", tr: "Merhaba, taze sebzelere ihtiyacım var." },
    "036": { speaker: "Manav", ar: "عِنْدي طَماطِم، خِيار، جَزَر، باذِنْجان، بَطاطا، بَصَل، فُلْفُل، وَفاصولْيا.", tr: "Domates, salatalık, havuç, patlıcan, patates, soğan, biber ve fasulyem var." },
    "037": { speaker: "Meryem", ar: "جَميل جِدًّا! وَهَلْ عِنْدَكَ فَواكِه أَيْضًا؟", tr: "Çok güzel! Meyvelerin de var mı?" },
    "038": { speaker: "Manav", ar: "نَعَمْ، عِنْدي تُفّاح، بُرْتُقال، مَوْز، عِنَب، كَرَز، ومِشْمِش.", tr: "Evet; elma, portakal, muz, üzüm, kiraz ve kayısım var." },
    "039": { speaker: "Fatih", ar: "أَهْلًا بِكَ، أُريدُ أَنْ أَشْتَري بَعْض الخُضَر، بِكَم الفاصولْيا؟", tr: "Merhaba, biraz sebze almak istiyorum. Fasulye ne kadar?" },
    "040": { speaker: "Manav", ar: "بِتِسْع ليرات، هِي طازَجَة جِدًّا.", tr: "Dokuz lira, çok taze." },
    "041": { speaker: "Fatih", ar: "لَكِنَّها غالِيَة، وَأَغْلى مِن البَطاطا، أُريدُ كيلوغْرامًا واحِدًا فَقَط.", tr: "Ama pahalı ve patatesten daha pahalı. Yalnızca bir kilogram istiyorum." },
    "042": { speaker: "Manav", ar: "العِنَب رَخيص اليَوْم، وَهُو أَرْخَص مِن التُّفّاح، هَلْ تُريدُ مِنْه؟", tr: "Üzüm bugün ucuz ve elmadan daha ucuz. İster misin?" },
    "043": { speaker: "Fatih", ar: "لا، شُكْرًا جَزيلًا. هَذا كاف.", tr: "Hayır, çok teşekkürler. Bu yeterli." },
    "044": { speaker: "Fatih", ar: "بِكَم البَطاطا؟", tr: "Patates ne kadar?" },
    "045": { speaker: "Manav", ar: "البَطاطا بِخَمْس ليرات.", tr: "Patates beş lira." },
    "046": { speaker: "Manav", ar: "أَيّ عُلْبَة تُريدُ مِن المِشْمِش؟", tr: "Kayısılardan hangi kutuyu istiyorsun?" },
    "047": { speaker: "Fatih", ar: "أُريدُ هَذِه العُلْبَة.", tr: "Bu kutuyu istiyorum." },
    "048": { speaker: "Manav", ar: "كَمْ كيلوغْرامًا تُريدُ مِن التُّفّاح؟", tr: "Kaç kilogram elma istiyorsun?" },
    "049": { speaker: "Fatih", ar: "أُريدُ ثَلاثَة كيلوغْرامات مِن التُّفّاح.", tr: "Üç kilogram elma istiyorum." },
    "050": { speaker: "Meryem", ar: "هَلْ تُريدُ شَيْئًا آخَر؟", tr: "Başka bir şey istiyor musun?" },
    "051": { speaker: "Fatih", ar: "لا، لا أُريدُ شَيْئًا آخَر، شُكْرًا.", tr: "Hayır, başka bir şey istemiyorum. Teşekkürler." },
    "052": { speaker: "Meryem", ar: "أَشْتَري الخُبْز وَالسُّكَّر وَالمِلْح مِن البَقّالَة.", tr: "Bakkaldan ekmek, şeker ve tuz alıyorum." }
  };

  var scenes = [
    {
      id: "list",
      title: "Evde Liste",
      short: "Liste",
      subtitle: "Annenin istediği ürünleri dikkatle dinle.",
      image: "images/B02_K004.jpg",
      alt: "Fatih ve annesi evde alışveriş listesi hazırlıyor",
      clips: ["026", "027", "028", "029", "030", "031", "032", "033"]
    },
    {
      id: "market",
      title: "Manav Tezgâhı",
      short: "Tezgâh",
      subtitle: "Manavın saydığı ürünleri doğru kasalara ayır.",
      image: "images/B02_K016.jpg",
      alt: "Meryem, Fatih ve manav renkli sebze meyve tezgâhında",
      clips: ["034", "035", "036", "037", "038"]
    },
    {
      id: "scale",
      title: "Terazi ve Fiyat",
      short: "Fiyat",
      subtitle: "Fiyatları, miktarları ve karşılaştırmayı seslerden çıkar.",
      image: "images/B02_K023.jpg",
      alt: "Fatih manav tezgâhındaki terazinin önünde alışveriş yapıyor",
      clips: ["039", "040", "041", "044", "045", "048", "049", "042"]
    },
    {
      id: "polite",
      title: "Kibar Cevap",
      short: "Diyalog",
      subtitle: "Konuşmayı doğal ve nazik cevaplarla tamamla.",
      image: "images/B02_K026.jpg",
      alt: "Fatih ve Meryem manavla konuşuyor",
      clips: ["043", "050", "051"]
    },
    {
      id: "receipt",
      title: "Paketleme ve Fiş",
      short: "Final",
      subtitle: "Kutuyu seç, ilk listeyle son fişi karşılaştır ve eksiği bul.",
      image: "images/B02_K037.jpg",
      alt: "Alışveriş ürünleri paketlenirken Fatih ve Meryem fişi kontrol ediyor",
      clips: ["046", "047", "052"]
    }
  ];

  var produce = [
    { id: "tomato", ar: "طَماطِم", tr: "Domates", bin: "veg" },
    { id: "cucumber", ar: "خِيار", tr: "Salatalık", bin: "veg" },
    { id: "carrot", ar: "جَزَر", tr: "Havuç", bin: "veg" },
    { id: "eggplant", ar: "باذِنْجان", tr: "Patlıcan", bin: "veg" },
    { id: "potato", ar: "بَطاطا", tr: "Patates", bin: "veg" },
    { id: "onion", ar: "بَصَل", tr: "Soğan", bin: "veg" },
    { id: "pepper", ar: "فُلْفُل", tr: "Biber", bin: "veg" },
    { id: "beans", ar: "فاصولْيا", tr: "Fasulye", bin: "veg" },
    { id: "apple", ar: "تُفّاح", tr: "Elma", bin: "fruit" },
    { id: "orange", ar: "بُرْتُقال", tr: "Portakal", bin: "fruit" },
    { id: "banana", ar: "مَوْز", tr: "Muz", bin: "fruit" },
    { id: "grape", ar: "عِنَب", tr: "Üzüm", bin: "fruit" },
    { id: "cherry", ar: "كَرَز", tr: "Kiraz", bin: "fruit" },
    { id: "apricot", ar: "مِشْمِش", tr: "Kayısı", bin: "fruit" }
  ];

  var state = {
    v: 1,
    scene: 0,
    heard: [],
    done: {},
    scores: {},
    attempts: {},
    drafts: {}
  };

  var answers = {};
  var selectedSortItem = "";
  var speed = 1;
  var playQueue = [];
  var currentClipId = "";
  var transcriptsVisible = false;
  var explicitFinish = false;
  var trackingReady = false;
  var initialStatus = "";
  var reviewMode = false;

  var dom = {
    introScreen: document.getElementById("introScreen"),
    missionScreen: document.getElementById("missionScreen"),
    resultScreen: document.getElementById("resultScreen"),
    progressNav: document.getElementById("progressNav"),
    startButton: document.getElementById("startButton"),
    resumeButton: document.getElementById("resumeButton"),
    sceneImage: document.getElementById("sceneImage"),
    sceneIndex: document.getElementById("sceneIndex"),
    sceneTitle: document.getElementById("sceneTitle"),
    sceneSubtitle: document.getElementById("sceneSubtitle"),
    clipList: document.getElementById("clipList"),
    transcriptToggle: document.getElementById("transcriptToggle"),
    playAllButton: document.getElementById("playAllButton"),
    stopAudioButton: document.getElementById("stopAudioButton"),
    audio: document.getElementById("audioPlayer"),
    nowPlaying: document.getElementById("nowPlaying"),
    nowPlayingText: document.getElementById("nowPlayingText"),
    taskPanel: document.getElementById("taskPanel"),
    taskLock: document.getElementById("taskLock"),
    taskContent: document.getElementById("taskContent"),
    taskFeedback: document.getElementById("taskFeedback"),
    modeBadge: document.getElementById("modeBadge"),
    soundSpeedButton: document.getElementById("soundSpeedButton"),
    saveExitButton: document.getElementById("saveExitButton"),
    saveStateLabel: document.getElementById("saveStateLabel"),
    finalScore: document.getElementById("finalScore"),
    heardCount: document.getElementById("heardCount"),
    passStatus: document.getElementById("passStatus"),
    retryNote: document.getElementById("retryNote"),
    finishButton: document.getElementById("finishButton"),
    reviewButton: document.getElementById("reviewButton"),
    liveRegion: document.getElementById("liveRegion")
  };

  if (new URLSearchParams(window.location.search).get("reset") === "1") {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (error) { /* no-op */ }
  }

  var scorm = window.Scorm12.create({ storageKey: STORAGE_KEY });
  trackingReady = scorm.initialize();
  if (trackingReady) {
    initialStatus = scorm.getValue("cmi.core.lesson_status");
    var entryMode = scorm.getValue("cmi.core.entry");
    if (!scorm.isLms() || entryMode === "resume") {
      restoreState();
    } else if (isTerminalStatus(initialStatus)) {
      reviewMode = true;
    }
  }
  initializeLesson();

  function initializeLesson() {
    if (!trackingReady) {
      dom.modeBadge.textContent = "LMS bağlantı hatası";
      dom.modeBadge.classList.add("is-error");
      dom.modeBadge.title = "EBA kayıt bağlantısı kurulamadı; ilerleme kaydedilmeyecek.";
      dom.saveExitButton.disabled = true;
      updateSaveLabel("Kayıt bağlantısı kurulamadı");
    }
    var status = initialStatus || scorm.getValue("cmi.core.lesson_status");
    if (trackingReady && !reviewMode && (!status || status === "not attempted")) {
      scorm.setLessonStatus("incomplete");
      scorm.setScore(0, 0, 100);
      scorm.setLocation("intro");
      saveState("intro", false);
    }

    if (!trackingReady) {
      /* Error badge and footer were set above. */
    } else if (reviewMode) {
      dom.modeBadge.textContent = "EBA · inceleme";
      dom.modeBadge.title = "Önceki EBA puanı korunur; bu açılış yeni deneme değildir.";
      dom.finishButton.textContent = "İncelemeyi bitir";
    } else if (scorm.isLms()) {
      dom.modeBadge.textContent = "EBA · SCORM";
      dom.modeBadge.title = "İlerleme öğrenme yönetim sistemine kaydedilir.";
    } else {
      var isLocalPreview = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
      dom.modeBadge.textContent = isLocalPreview ? "Yerel önizleme" : "Web sürümü";
      dom.modeBadge.title = "İlerleme bu cihazın tarayıcısında saklanır.";
    }

    var hasProgress = state.heard.length > 0 || completedCount() > 0;
    dom.resumeButton.hidden = !hasProgress;
    if (hasProgress) dom.startButton.firstChild.nodeValue = "İlk sahneyi aç ";
    renderProgress();
    bindEvents();
    if (trackingReady) updateSaveLabel("İlerleme hazır");
  }

  function bindEvents() {
    dom.startButton.addEventListener("click", function () { showScene(0); });
    dom.resumeButton.addEventListener("click", function () {
      if (allComplete()) showResult();
      else showScene(clampScene(state.scene));
    });

    dom.progressNav.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-scene]");
      if (!button || button.disabled) return;
      showScene(Number(button.dataset.scene));
    });

    dom.clipList.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-clip]");
      if (!button) return;
      playQueue = [];
      playClip(button.dataset.clip, true);
    });

    dom.playAllButton.addEventListener("click", playScene);
    dom.stopAudioButton.addEventListener("click", stopAudio);
    dom.transcriptToggle.addEventListener("click", toggleTranscripts);
    dom.soundSpeedButton.addEventListener("click", toggleSpeed);
    dom.saveExitButton.addEventListener("click", function () {
      var saved = saveState(currentLocation(), true);
      announce(reviewMode
        ? "İnceleme modundasın; önceki EBA puanın korunuyor."
        : saved ? "İlerlemen kaydedildi." : "İlerleme kaydı doğrulanamadı.");
    });

    dom.taskContent.addEventListener("click", handleTaskClick);
    dom.taskContent.addEventListener("keydown", handleRadioKeydown);
    dom.finishButton.addEventListener("click", finishLesson);
    dom.reviewButton.addEventListener("click", function () { showScene(0); });

    dom.audio.addEventListener("play", function () {
      document.body.classList.add("is-playing");
      setNowPlaying(currentClipId);
      refreshClipStates();
    });
    dom.audio.addEventListener("pause", function () {
      document.body.classList.remove("is-playing");
      refreshClipStates();
    });
    dom.audio.addEventListener("ended", handleClipEnded);
    dom.audio.addEventListener("error", function () {
      document.body.classList.remove("is-playing");
      dom.nowPlayingText.textContent = "Ses yüklenemedi; yeniden deneyin";
      playQueue = [];
    });

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden" && scorm.isActive()) {
        saveState(currentLocation(), true);
      }
    });

    window.addEventListener("pagehide", function (event) {
      if (!scorm.isActive()) return;
      saveState(currentLocation(), event.persisted);
      if (!event.persisted) scorm.finish({ suspend: reviewMode ? false : !allComplete() });
    });
  }

  function restoreState() {
    var raw = scorm.getValue("cmi.suspend_data");
    if (!raw) {
      restoreLocationFallback();
      return;
    }
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.v !== 1) {
        restoreLocationFallback();
        return;
      }
      state.scene = clampScene(parsed.scene);
      state.heard = Array.isArray(parsed.heard)
        ? parsed.heard.filter(function (id) { return Object.prototype.hasOwnProperty.call(clips, id); })
        : [];
      state.heard = unique(state.heard);
      state.done = sanitizeDone(parsed.done);
      state.scores = sanitizeNumberMap(parsed.scores, 0, 20);
      state.attempts = sanitizeNumberMap(parsed.attempts, 0, 99);
      state.drafts = sanitizeDrafts(parsed.drafts);
    } catch (error) {
      state = { v: 1, scene: 0, heard: [], done: {}, scores: {}, attempts: {}, drafts: {} };
      restoreLocationFallback();
    }
  }

  function restoreLocationFallback() {
    var location = scorm.getValue("cmi.core.lesson_location");
    var match = /^scene-([1-5])$/.exec(location || "");
    if (match) state.scene = Number(match[1]) - 1;
  }

  function saveState(location, commitNow) {
    if (!trackingReady || !scorm.isActive()) {
      updateSaveLabel("İlerleme kaydedilemedi");
      return false;
    }
    if (reviewMode) {
      updateSaveLabel("İnceleme modu · önceki puan korunuyor");
      return true;
    }
    var compact = {
      v: 1,
      scene: clampScene(state.scene),
      heard: unique(state.heard),
      done: state.done,
      scores: state.scores,
      attempts: state.attempts,
      drafts: state.drafts
    };
    var suspendOk = scorm.setSuspendData(compact);
    var locationOk = scorm.setLocation(location || currentLocation());
    var scoreOk = scorm.setScore(totalScore(), 0, 100);
    var statusOk = syncOutcome();
    var commitOk = commitNow === false ? true : scorm.commit();
    var saved = suspendOk && locationOk && scoreOk && statusOk && commitOk;
    updateSaveLabel(saved ? "Kaydedildi · " + timeText() : "Kayıt doğrulanamadı");
    return saved;
  }

  function syncOutcome() {
    if (!allComplete()) return scorm.setLessonStatus("incomplete");
    return scorm.setLessonStatus(totalScore() >= PASS_SCORE ? "passed" : "failed");
  }

  function showScene(index) {
    index = clampScene(index);
    if (!canOpenScene(index)) return;
    stopAudio();
    state.scene = index;
    answers = cloneDraft(state.drafts[index]);
    state.drafts[index] = answers;
    selectedSortItem = "";
    transcriptsVisible = false;
    dom.introScreen.hidden = true;
    dom.resultScreen.hidden = true;
    dom.missionScreen.hidden = false;
    renderScene();
    saveState("scene-" + (index + 1), true);
    window.scrollTo({ top: 0, behavior: motionBehavior() });
    document.getElementById("sceneTitle").focus({ preventScroll: true });
  }

  function renderScene() {
    var scene = scenes[state.scene];
    dom.sceneImage.src = scene.image;
    dom.sceneImage.alt = scene.alt;
    dom.sceneIndex.textContent = "Görev " + (state.scene + 1) + " / " + scenes.length;
    dom.sceneTitle.textContent = scene.title;
    dom.sceneTitle.setAttribute("tabindex", "-1");
    dom.sceneSubtitle.textContent = scene.subtitle;
    renderClips(scene);
    renderTask();
    updateTaskLock();
    renderProgress();
  }

  function renderClips(scene) {
    dom.clipList.innerHTML = scene.clips.map(function (id) {
      var clip = clips[id];
      return "<button class=\"clip-button" + (hasHeard(id) ? " is-heard" : "") +
        "\" type=\"button\" data-clip=\"" + id + "\" aria-labelledby=\"clip-speaker-" + id + " clip-status-" + id + "\">" +
        "<span class=\"clip-play\" aria-hidden=\"true\">" + (hasHeard(id) ? "✓" : "▶") + "</span>" +
        "<span class=\"clip-text\"><span class=\"clip-speaker\" id=\"clip-speaker-" + id + "\">" + escapeHtml(clip.speaker) + "</span>" +
        "<span class=\"clip-arabic\" id=\"clip-arabic-" + id + "\" lang=\"ar\" dir=\"rtl\" aria-hidden=\"true\">" + escapeHtml(clip.ar) + "</span></span>" +
        "<span class=\"clip-number\" aria-hidden=\"true\">" + id + "</span>" +
        "<span class=\"sr-only\" id=\"clip-status-" + id + "\">Kayıt " + id + (hasHeard(id) ? ", dinlendi" : ", dinlenmedi") + "</span></button>";
    }).join("");
    dom.clipList.classList.toggle("transcripts-hidden", !transcriptsVisible);
    dom.transcriptToggle.setAttribute("aria-expanded", transcriptsVisible ? "true" : "false");
    dom.transcriptToggle.textContent = transcriptsVisible ? "Arapça metinleri gizle" : "Arapça metinleri göster";
    dom.nowPlayingText.textContent = "Bir ses kartına dokun";
  }

  function playScene() {
    var ids = scenes[state.scene].clips.slice();
    if (!ids.length) return;
    stopAudio();
    playQueue = ids.slice(1);
    playClip(ids[0], true);
  }

  function playClip(id, keepQueue) {
    if (!clips[id]) return;
    if (!keepQueue) playQueue = [];
    currentClipId = id;
    dom.audio.src = "audio/" + id + ".mp3";
    dom.audio.playbackRate = speed;
    var promise = dom.audio.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(function () {
        document.body.classList.remove("is-playing");
        dom.nowPlayingText.textContent = "Sesi başlatmak için yeniden dokunun";
      });
    }
  }

  function handleClipEnded() {
    if (currentClipId && !hasHeard(currentClipId)) {
      state.heard.push(currentClipId);
      state.heard = unique(state.heard);
      saveState("scene-" + (state.scene + 1), true);
    }
    refreshClipStates();
    updateTaskLock();
    if (playQueue.length) {
      var next = playQueue.shift();
      playClip(next, true);
      return;
    }
    currentClipId = "";
    document.body.classList.remove("is-playing");
    dom.nowPlayingText.textContent = isSceneHeard(state.scene)
      ? "Sahne tamamlandı · görevi çözebilirsin"
      : "Dinlemeye devam et";
  }

  function stopAudio() {
    playQueue = [];
    if (!dom.audio.paused) dom.audio.pause();
    try { dom.audio.currentTime = 0; } catch (error) { /* no-op */ }
    currentClipId = "";
    document.body.classList.remove("is-playing");
    refreshClipStates();
  }

  function setNowPlaying(id) {
    var clip = clips[id];
    if (!clip) return;
    dom.nowPlaying.querySelector(".now-playing-label").textContent = clip.speaker + " · " + id;
    dom.nowPlayingText.textContent = clip.tr;
  }

  function refreshClipStates() {
    var buttons = dom.clipList.querySelectorAll("button[data-clip]");
    Array.prototype.forEach.call(buttons, function (button) {
      var id = button.dataset.clip;
      var heard = hasHeard(id);
      button.classList.toggle("is-heard", heard);
      button.classList.toggle("is-active", id === currentClipId && !dom.audio.paused);
      var status = button.querySelector("#clip-status-" + id);
      if (status) status.textContent = "Kayıt " + id + (heard ? ", dinlendi" : ", dinlenmedi") +
        (id === currentClipId && !dom.audio.paused ? ", şu anda çalıyor" : "");
      button.setAttribute("aria-labelledby", "clip-speaker-" + id + " clip-status-" + id +
        (transcriptsVisible ? " clip-arabic-" + id : ""));
      var icon = button.querySelector(".clip-play");
      if (icon) icon.textContent = heard ? "✓" : "▶";
    });
  }

  function toggleTranscripts() {
    transcriptsVisible = !transcriptsVisible;
    dom.clipList.classList.toggle("transcripts-hidden", !transcriptsVisible);
    dom.transcriptToggle.setAttribute("aria-expanded", transcriptsVisible ? "true" : "false");
    dom.transcriptToggle.textContent = transcriptsVisible ? "Arapça metinleri gizle" : "Arapça metinleri göster";
    var transcriptNodes = dom.clipList.querySelectorAll(".clip-arabic");
    Array.prototype.forEach.call(transcriptNodes, function (node) {
      node.setAttribute("aria-hidden", transcriptsVisible ? "false" : "true");
    });
    refreshClipStates();
  }

  function toggleSpeed() {
    speed = speed === 1 ? 0.85 : 1;
    dom.audio.playbackRate = speed;
    dom.soundSpeedButton.querySelector("span").textContent = String(speed).replace("0.", ".") + "×";
    dom.soundSpeedButton.setAttribute("aria-label", "Dinleme hızı " + speed + " kat. Değiştirmek için basın.");
  }

  function updateTaskLock() {
    var open = isSceneHeard(state.scene) || Boolean(state.done[state.scene]);
    dom.taskPanel.classList.toggle("locked", !open);
    dom.taskPanel.setAttribute("aria-disabled", open ? "false" : "true");
    dom.taskContent.inert = !open;
    var controls = dom.taskContent.querySelectorAll("button, input, select, textarea");
    Array.prototype.forEach.call(controls, function (control) { control.disabled = !open; });
    dom.taskLock.classList.toggle("is-open", open);
    dom.taskLock.innerHTML = open
      ? "<span aria-hidden=\"true\">✓</span> Görev açık"
      : "<span aria-hidden=\"true\">◉</span> Sesleri dinle";
  }

  function renderTask() {
    dom.taskFeedback.className = "feedback";
    dom.taskFeedback.textContent = "";
    if (state.done[state.scene]) {
      dom.taskContent.innerHTML = "<p class=\"task-instruction\">Bu görevi tamamladın. Sesleri yeniden dinleyebilir veya sonraki sahneye geçebilirsin.</p>";
      appendSceneComplete();
      return;
    }

    if (state.scene === 0) renderListTask();
    if (state.scene === 1) renderSortTask();
    if (state.scene === 2) renderPriceTask();
    if (state.scene === 3) renderDialogueTask();
    if (state.scene === 4) renderReceiptTask();
    restoreDraftControls();
  }

  function renderListTask() {
    var options = [
      ["sugar", "سُكَّر", "Şeker"], ["salt", "مِلْح", "Tuz"],
      ["tea", "شاي", "Çay"], ["bread", "خُبْز", "Ekmek"],
      ["oil", "زَيْت", "Yağ"], ["cheese", "جُبْن", "Peynir"]
    ];
    dom.taskContent.innerHTML =
      "<p class=\"task-instruction\"><strong>028 ve 030</strong> numaralı seslere göre alışveriş listesine girecek dört ürünü seç.</p>" +
      "<div class=\"choice-grid\">" + options.map(function (item) {
        return "<button class=\"choice-card\" type=\"button\" data-choice=\"" + item[0] + "\" aria-pressed=\"false\">" +
          "<span class=\"choice-arabic\" lang=\"ar\" dir=\"rtl\">" + item[1] + "</span>" +
          "<span class=\"choice-tr\">" + item[2] + "</span></button>";
      }).join("") + "</div>" + checkButton("Listeyi kontrol et");
  }

  function renderSortTask() {
    dom.taskContent.innerHTML =
      "<p class=\"task-instruction\"><strong>036 ve 038</strong> numaralı seslerdeki 14 ürünü seçip doğru kasaya yerleştir.</p>" +
      "<div class=\"sort-toolbar\"><span aria-hidden=\"true\">☝</span><span>Bir ürüne, sonra Sebze veya Meyve kasasına dokun.</span></div>" +
      "<div class=\"item-grid\">" + produce.map(function (item) {
        return "<button class=\"item-token\" type=\"button\" data-item=\"" + item.id + "\" data-assigned=\"\" aria-pressed=\"false\">" +
          "<span class=\"item-arabic\" lang=\"ar\" dir=\"rtl\">" + item.ar + "</span>" +
          "<span class=\"item-tr\">" + item.tr + "</span><span class=\"item-state\">Yerleştirilmedi</span></button>";
      }).join("") + "</div>" +
      "<div class=\"sort-bins\">" +
        "<button class=\"sort-bin\" type=\"button\" data-bin=\"veg\"><strong>🥕 Sebze kasası</strong><span id=\"vegCount\">0 ürün</span></button>" +
        "<button class=\"sort-bin\" type=\"button\" data-bin=\"fruit\"><strong>🍎 Meyve kasası</strong><span id=\"fruitCount\">0 ürün</span></button>" +
      "</div>" + checkButton("Kasaları kontrol et");
  }

  function renderPriceTask() {
    var questions = [
      { id: "beanPrice", label: "Fasulyenin fiyatı kaç lira?", options: [["7", "٧", "7"], ["9", "٩", "9"], ["5", "٥", "5"]] },
      { id: "potatoPrice", label: "Patatesin fiyatı kaç lira?", options: [["9", "٩", "9"], ["6", "٦", "6"], ["5", "٥", "5"]] },
      { id: "beanKg", label: "Fatih kaç kilo fasulye istiyor?", options: [["1", "١", "1 kg"], ["2", "٢", "2 kg"], ["3", "٣", "3 kg"]] },
      { id: "appleKg", label: "Fatih kaç kilo elma istiyor?", options: [["1", "١", "1 kg"], ["2", "٢", "2 kg"], ["3", "٣", "3 kg"]] },
      { id: "cheaper", label: "Hangisi elmadan daha ucuz?", options: [["grape", "العِنَب", "Üzüm"], ["beans", "الفاصولْيا", "Fasulye"], ["potato", "البَطاطا", "Patates"]] }
    ];
    dom.taskContent.innerHTML =
      "<p class=\"task-instruction\">Terazi etiketlerini doldur. Her satırda bir cevap seç.</p>" +
      "<div class=\"control-stack\">" + questions.map(function (question) {
        return "<section class=\"control-card\" aria-labelledby=\"q-" + question.id + "\"><h3 id=\"q-" + question.id + "\">" + question.label + "</h3>" +
          "<div class=\"radio-grid\" role=\"radiogroup\" aria-labelledby=\"q-" + question.id + "\">" + question.options.map(function (option, optionIndex) {
            return "<button class=\"radio-card\" type=\"button\" role=\"radio\" data-control=\"" + question.id + "\" data-value=\"" + option[0] + "\" aria-checked=\"false\" tabindex=\"" + (optionIndex === 0 ? "0" : "-1") + "\">" +
              "<span class=\"radio-arabic\" lang=\"ar\" dir=\"rtl\">" + option[1] + "</span><span class=\"radio-tr\">" + option[2] + "</span></button>";
          }).join("") + "</div></section>";
      }).join("") + "</div>" + checkButton("Teraziyi kontrol et");
  }

  function renderDialogueTask() {
    dom.taskContent.innerHTML =
      "<p class=\"task-instruction\">Soruların ardından Fatih’in söylediği doğal cevabı seç.</p>" +
      dialogueBranch("offer", "العِنَب رَخيص… هَلْ تُريدُ مِنْه؟", [
        ["043", "لا، شُكْرًا جَزيلًا. هَذا كاف."],
        ["wrong-a", "نَعَمْ، أُريدُ خَمْسَةَ كيلوغْرامات."],
        ["wrong-b", "بِكَم البَطاطا؟"]
      ]) +
      dialogueBranch("anything", "هَلْ تُريدُ شَيْئًا آخَر؟", [
        ["wrong-c", "نَعَمْ، أُريدُ كُلَّ شَيْء."],
        ["051", "لا، لا أُريدُ شَيْئًا آخَر، شُكْرًا."],
        ["wrong-d", "الفاصولْيا غالِيَة جِدًّا."]
      ]) + checkButton("Diyaloğu kontrol et");
  }

  function renderReceiptTask() {
    var boxLabels = [
      ["near", "هَذِهِ", "Seçenek A", "١"], ["far", "تِلْكَ", "Seçenek B", "٢"], ["plural", "هَؤُلاء", "Seçenek C", "٣"]
    ];
    var missing = [
      ["tea", "الشّاي", "Çay"], ["oil", "الزَّيْت", "Yağ"], ["cheese", "الجُبْن", "Peynir"]
    ];
    dom.taskContent.innerHTML =
      "<p class=\"task-instruction\"><strong>047:</strong> Fatih’in kullandığı işaret sözcüğüne uygun kutuyu seç.</p>" +
      "<div class=\"box-grid\">" + boxLabels.map(function (box) {
        return "<button class=\"box-card\" type=\"button\" data-box=\"" + box[0] + "\" aria-pressed=\"false\"><span class=\"box-illustration\" aria-hidden=\"true\">" +
          box[3] + "</span><span class=\"choice-arabic\" lang=\"ar\" dir=\"rtl\">" + box[1] + "</span><span class=\"choice-tr\">" + box[2] + "</span></button>";
      }).join("") + "</div>" +
      "<div class=\"receipt\"><h3>Şenlik alışveriş fişi</h3>" +
        "<div class=\"receipt-row\"><span>028 · İlk liste</span><strong>Şeker · Tuz · Çay</strong></div>" +
        "<div class=\"receipt-row\"><span>030 · Eklenen</span><strong>Ekmek</strong></div>" +
        "<div class=\"receipt-row\"><span>052 · Son fiş</span><strong>Ekmek · Şeker · Tuz</strong></div></div>" +
      "<p class=\"task-instruction\" style=\"margin-top:15px\">İlk liste ile son fiş karşılaştırılınca hangi ürün eksik kalıyor?</p>" +
      "<div class=\"choice-grid\">" + missing.map(function (item) {
        return "<button class=\"choice-card\" type=\"button\" data-missing=\"" + item[0] + "\" aria-pressed=\"false\"><span class=\"choice-arabic\" lang=\"ar\" dir=\"rtl\">" + item[1] + "</span><span class=\"choice-tr\">" + item[2] + "</span></button>";
      }).join("") + "</div>" + checkButton("Fişi mühürle");
  }

  function dialogueBranch(id, prompt, options) {
    return "<section class=\"dialogue-branch\"><p class=\"dialogue-prompt\" id=\"dialogue-prompt-" + id + "\" lang=\"ar\" dir=\"rtl\">" + prompt + "</p>" +
      "<div class=\"dialogue-options\" role=\"radiogroup\" aria-labelledby=\"dialogue-prompt-" + id + "\">" + options.map(function (option, optionIndex) {
        return "<button class=\"dialogue-option\" type=\"button\" role=\"radio\" data-dialogue=\"" + id + "\" data-value=\"" + option[0] + "\" aria-checked=\"false\" tabindex=\"" + (optionIndex === 0 ? "0" : "-1") + "\" lang=\"ar\" dir=\"rtl\">" + option[1] + "</button>";
      }).join("") + "</div></section>";
  }

  function checkButton(label) {
    return "<div class=\"task-actions\"><button class=\"check-button\" type=\"button\" data-check=\"true\">" + label + "</button></div>";
  }

  function handleTaskClick(event) {
    if (!(isSceneHeard(state.scene) || state.done[state.scene])) return;
    var choice = event.target.closest("button[data-choice]");
    var item = event.target.closest("button[data-item]");
    var bin = event.target.closest("button[data-bin]");
    var radio = event.target.closest("button[data-control]");
    var dialogue = event.target.closest("button[data-dialogue]");
    var box = event.target.closest("button[data-box]");
    var missing = event.target.closest("button[data-missing]");
    var check = event.target.closest("button[data-check]");
    var next = event.target.closest("button[data-next]");

    if (choice) toggleMultiChoice(choice);
    if (item) selectSortItem(item);
    if (bin) assignSortItem(bin.dataset.bin);
    if (radio) selectSingle(radio, "data-control", "control:" + radio.dataset.control);
    if (dialogue) selectSingle(dialogue, "data-dialogue", "dialogue:" + dialogue.dataset.dialogue);
    if (box) selectSingle(box, "data-box", "box");
    if (missing) selectSingle(missing, "data-missing", "missing");
    if (check) checkTask();
    if (next) {
      if (state.scene === scenes.length - 1) showResult();
      else showScene(state.scene + 1);
    }
  }

  function handleRadioKeydown(event) {
    var radio = event.target.closest("[role=\"radio\"]");
    if (!radio || ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].indexOf(event.key) < 0) return;
    var group = radio.closest("[role=\"radiogroup\"]");
    if (!group) return;
    var radios = Array.prototype.slice.call(group.querySelectorAll("[role=\"radio\"]:not(:disabled)"));
    if (!radios.length) return;
    var index = radios.indexOf(radio);
    if (event.key === "Home") index = 0;
    else if (event.key === "End") index = radios.length - 1;
    else if (event.key === "ArrowRight" || event.key === "ArrowDown") index = (index + 1) % radios.length;
    else index = (index - 1 + radios.length) % radios.length;
    event.preventDefault();
    radios[index].click();
    radios[index].focus();
  }

  function toggleMultiChoice(button) {
    var key = button.dataset.choice;
    answers.list = answers.list || [];
    var at = answers.list.indexOf(key);
    if (at >= 0) answers.list.splice(at, 1);
    else answers.list.push(key);
    var selected = answers.list.indexOf(key) >= 0;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
    saveDraft();
  }

  function selectSingle(button, groupAttribute, answerKey) {
    var selector = answerKey === "box" || answerKey === "missing"
      ? "button[" + groupAttribute + "]"
      : "button[" + groupAttribute + "=\"" + button.getAttribute(groupAttribute) + "\"]";
    var group = dom.taskContent.querySelectorAll(selector);
    Array.prototype.forEach.call(group, function (candidate) {
      var selected = candidate === button;
      candidate.classList.toggle("is-selected", selected);
      if (candidate.getAttribute("role") === "radio") {
        candidate.setAttribute("aria-checked", selected ? "true" : "false");
        candidate.setAttribute("tabindex", selected ? "0" : "-1");
      } else {
        candidate.setAttribute("aria-pressed", selected ? "true" : "false");
      }
    });
    answers[answerKey] = button.dataset.value || button.dataset.box || button.dataset.missing;
    saveDraft();
  }

  function selectSortItem(button) {
    selectedSortItem = button.dataset.item;
    var items = dom.taskContent.querySelectorAll("button[data-item]");
    Array.prototype.forEach.call(items, function (candidate) {
      var selected = candidate === button;
      candidate.classList.toggle("is-selected", selected);
      candidate.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function assignSortItem(bin) {
    if (!selectedSortItem) {
      setFeedback("Önce yerleştirmek istediğin ürünü seç.", false);
      return;
    }
    answers.sort = answers.sort || {};
    answers.sort[selectedSortItem] = bin;
    var button = dom.taskContent.querySelector("button[data-item=\"" + selectedSortItem + "\"]");
    if (button) {
      button.dataset.assigned = bin;
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
      updateItemState(button, bin);
    }
    selectedSortItem = "";
    updateSortCounts();
    saveDraft();
    setFeedback(bin === "veg" ? "Sebze kasasına yerleştirildi." : "Meyve kasasına yerleştirildi.", true, true);
  }

  function updateSortCounts() {
    var assignments = answers.sort || {};
    var values = Object.keys(assignments).map(function (key) { return assignments[key]; });
    var veg = values.filter(function (value) { return value === "veg"; }).length;
    var fruit = values.filter(function (value) { return value === "fruit"; }).length;
    var vegCount = document.getElementById("vegCount");
    var fruitCount = document.getElementById("fruitCount");
    if (vegCount) vegCount.textContent = veg + " ürün";
    if (fruitCount) fruitCount.textContent = fruit + " ürün";
  }

  function saveDraft() {
    state.drafts[state.scene] = cloneDraft(answers);
  }

  function restoreDraftControls() {
    if (state.scene === 0 && Array.isArray(answers.list)) {
      answers.list.forEach(function (value) {
        setSelected(dom.taskContent.querySelector("button[data-choice=\"" + value + "\"]"), true);
      });
    }

    if (state.scene === 1 && answers.sort) {
      Object.keys(answers.sort).forEach(function (itemId) {
        var assigned = answers.sort[itemId];
        var button = dom.taskContent.querySelector("button[data-item=\"" + itemId + "\"]");
        if (!button) return;
        button.dataset.assigned = assigned;
        updateItemState(button, assigned);
      });
      updateSortCounts();
    }

    Object.keys(answers).forEach(function (key) {
      var button = null;
      if (key.indexOf("control:") === 0) {
        var control = key.slice(8);
        button = dom.taskContent.querySelector("button[data-control=\"" + control + "\"][data-value=\"" + answers[key] + "\"]");
      } else if (key.indexOf("dialogue:") === 0) {
        var dialogue = key.slice(9);
        button = dom.taskContent.querySelector("button[data-dialogue=\"" + dialogue + "\"][data-value=\"" + answers[key] + "\"]");
      } else if (key === "box") {
        button = dom.taskContent.querySelector("button[data-box=\"" + answers[key] + "\"]");
      } else if (key === "missing") {
        button = dom.taskContent.querySelector("button[data-missing=\"" + answers[key] + "\"]");
      }
      setSelected(button, true);
    });
  }

  function setSelected(button, selected) {
    if (!button) return;
    button.classList.toggle("is-selected", selected);
    if (button.getAttribute("role") === "radio") {
      button.setAttribute("aria-checked", selected ? "true" : "false");
      button.setAttribute("tabindex", selected ? "0" : "-1");
    } else {
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    }
  }

  function updateItemState(button, assigned) {
    var stateNode = button && button.querySelector(".item-state");
    if (!stateNode) return;
    stateNode.textContent = assigned === "veg" ? "Sebze kasasında" : assigned === "fruit" ? "Meyve kasasında" : "Yerleştirilmedi";
  }

  function checkTask() {
    if (state.done[state.scene]) return;
    state.attempts[state.scene] = Number(state.attempts[state.scene] || 0) + 1;
    var valid = validateTask(state.scene);
    if (!valid.ok) {
      saveState("scene-" + (state.scene + 1), true);
      setFeedback(valid.message, false);
      return;
    }

    var score = Math.max(10, 23 - (3 * state.attempts[state.scene]));
    state.done[state.scene] = true;
    state.scores[state.scene] = score;
    delete state.drafts[state.scene];
    var saved = saveState("scene-" + (state.scene + 1), true);
    setFeedback(saved
      ? "Harika! Kanıtı doğru kullandın ve bu sahneden " + score + " puan aldın."
      : "Görevi tamamladın ve " + score + " puan aldın; ancak EBA kaydı doğrulanamadı. Üstteki kaydet düğmesiyle yeniden dene.", saved);
    appendSceneComplete();
    renderProgress();
  }

  function validateTask(index) {
    if (index === 0) {
      var expected = ["bread", "salt", "sugar", "tea"];
      var actual = (answers.list || []).slice().sort();
      return {
        ok: arraysEqual(actual, expected),
        message: actual.length !== 4
          ? "Listede tam dört ürün olmalı. 028 ve 030 numaralı sesleri yeniden dinle."
          : "Bir ürün listeye ait değil veya biri eksik. 028 ve 030’daki adları karşılaştır."
      };
    }
    if (index === 1) {
      var assigned = answers.sort || {};
      var complete = produce.every(function (item) { return Boolean(assigned[item.id]); });
      var correct = complete && produce.every(function (item) { return assigned[item.id] === item.bin; });
      return {
        ok: correct,
        message: complete
          ? "Bazı ürünler yanlış kasada. 036 sebzeleri, 038 meyveleri sayıyor."
          : "14 ürünün tamamını iki kasaya yerleştir."
      };
    }
    if (index === 2) {
      var priceCorrect = answers["control:beanPrice"] === "9" &&
        answers["control:potatoPrice"] === "5" &&
        answers["control:beanKg"] === "1" &&
        answers["control:appleKg"] === "3" &&
        answers["control:cheaper"] === "grape";
      return { ok: priceCorrect, message: "Etiketlerden en az biri uyuşmuyor. 040, 041, 045, 049 ve 042’yi yeniden dinle." };
    }
    if (index === 3) {
      var dialogueCorrect = answers["dialogue:offer"] === "043" && answers["dialogue:anything"] === "051";
      return { ok: dialogueCorrect, message: "Cevaplardan biri konuşmanın akışına uymuyor. 043 ve 051’i yeniden dinle." };
    }
    var receiptCorrect = answers.box === "near" && answers.missing === "tea";
    return { ok: receiptCorrect, message: "Kutuyu veya eksik ürünü yeniden düşün. 047’de “bu kutu”; 028 ile 052 arasında bir ürün kayboluyor." };
  }

  function appendSceneComplete() {
    if (dom.taskContent.querySelector(".scene-complete")) return;
    var score = Number(state.scores[state.scene] || 0);
    var wrapper = document.createElement("div");
    wrapper.className = "scene-complete";
    wrapper.innerHTML = "<div><strong>Sahne tamamlandı</strong><span>" + score + " / 20 puan · görev tamamlandı</span></div>" +
      "<button class=\"secondary-button compact\" type=\"button\" data-next=\"true\">" +
      (state.scene === scenes.length - 1 ? "Sonucu gör" : "Sonraki sahne") + " <span aria-hidden=\"true\">→</span></button>";
    dom.taskContent.appendChild(wrapper);
  }

  function setFeedback(message, success, quiet) {
    dom.taskFeedback.className = "feedback " + (success ? "is-success" : "is-error");
    dom.taskFeedback.textContent = message;
  }

  function showResult() {
    stopAudio();
    if (!allComplete()) return;
    var score = totalScore();
    scorm.setScore(score, 0, 100);
    scorm.setLessonStatus(score >= PASS_SCORE ? "passed" : "failed");
    saveState("result", true);
    dom.introScreen.hidden = true;
    dom.missionScreen.hidden = true;
    dom.resultScreen.hidden = false;
    dom.finalScore.textContent = score;
    dom.heardCount.textContent = state.heard.length + " / 27";
    dom.passStatus.textContent = score >= PASS_SCORE ? "Başarılı" : "Tekrar gerekli";
    dom.retryNote.hidden = score >= PASS_SCORE;
    renderProgress();
    window.scrollTo({ top: 0, behavior: motionBehavior() });
    document.getElementById("resultTitle").setAttribute("tabindex", "-1");
    document.getElementById("resultTitle").focus({ preventScroll: true });
  }

  function finishLesson() {
    if (explicitFinish) return;
    if (!trackingReady) {
      updateSaveLabel("EBA kayıt bağlantısı yok; sonuç iletilemedi");
      announce("Kayıt bağlantısı kurulamadığı için puan EBA'ya iletilemedi.");
      return;
    }
    if (reviewMode) {
      var reviewFinished = scorm.finish({ suspend: false });
      if (reviewFinished) {
        explicitFinish = true;
        dom.finishButton.disabled = true;
        dom.finishButton.textContent = "İnceleme tamamlandı ✓";
        updateSaveLabel("Önceki EBA puanı korundu");
        announce("İnceleme tamamlandı; önceki EBA puanın değişmedi.");
      } else {
        updateSaveLabel("İnceleme bitirme yanıtı alınamadı");
        announce("EBA inceleme oturumunu kapatmadı; yeniden deneyebilirsin.");
      }
      return;
    }
    var score = totalScore();
    scorm.setScore(score, 0, 100);
    scorm.setLessonStatus(score >= PASS_SCORE ? "passed" : "failed");
    if (!saveState("result", true)) {
      updateSaveLabel("Puan kaydı doğrulanamadı · yeniden dene");
      announce("Puan kaydı doğrulanamadı. Düğmeye yeniden basabilirsin.");
      return;
    }
    var finished = scorm.finish({ suspend: false });
    if (finished) {
      explicitFinish = true;
      dom.finishButton.disabled = true;
      dom.finishButton.textContent = "Puan kaydedildi ✓";
      updateSaveLabel("Tamamlandı · puan kaydedildi");
      announce("Puanın kaydedildi. İçeriği kapatabilirsin.");
      return;
    }
    if (scorm.isActive()) {
      dom.finishButton.textContent = "Kaydı yeniden dene";
      updateSaveLabel("LMS bitirme yanıtı alınamadı");
      announce("EBA bitirme yanıtı alınamadı. Düğmeyle yeniden deneyebilirsin.");
    } else {
      dom.finishButton.disabled = true;
      updateSaveLabel("Bitirme iletimi doğrulanamadı · içeriği yeniden aç");
      announce("Bitirme iletimi doğrulanamadı. İçeriği yeniden açıp durumunu kontrol et.");
    }
  }

  function renderProgress() {
    var highest = highestAvailableScene();
    dom.progressNav.innerHTML = scenes.map(function (scene, index) {
      var complete = Boolean(state.done[index]);
      var current = !dom.introScreen.hidden ? false : state.scene === index && dom.resultScreen.hidden;
      var available = complete || index <= highest;
      var classes = "progress-step" + (complete ? " is-complete" : "") +
        (current ? " is-current" : "") + (available ? " is-available" : "");
      return "<button class=\"" + classes + "\" type=\"button\" data-scene=\"" + index + "\"" +
        (available ? "" : " disabled") + " aria-current=\"" + (current ? "step" : "false") + "\">" +
        "<span class=\"progress-dot\">" + (complete ? "✓" : (index + 1)) + "</span>" +
        "<span class=\"progress-label\">" + scene.short + "</span></button>";
    }).join("");
  }

  function currentLocation() {
    if (!dom.resultScreen.hidden) return "result";
    if (!dom.missionScreen.hidden) return "scene-" + (state.scene + 1);
    return "intro";
  }

  function canOpenScene(index) {
    return index >= 0 && index <= highestAvailableScene();
  }

  function highestAvailableScene() {
    var highest = 0;
    for (var index = 0; index < scenes.length - 1; index += 1) {
      if (state.done[index]) highest = index + 1;
      else break;
    }
    if (state.scene > highest && state.scene < scenes.length) highest = state.scene;
    return highest;
  }

  function isSceneHeard(index) {
    return scenes[index].clips.every(hasHeard);
  }

  function hasHeard(id) {
    return state.heard.indexOf(id) >= 0;
  }

  function completedCount() {
    return scenes.filter(function (_, index) { return Boolean(state.done[index]); }).length;
  }

  function allComplete() {
    return completedCount() === scenes.length;
  }

  function totalScore() {
    return scenes.reduce(function (sum, _, index) {
      return sum + Number(state.scores[index] || 0);
    }, 0);
  }

  function clampScene(value) {
    var number = Number(value);
    if (!isFinite(number)) return 0;
    return Math.max(0, Math.min(scenes.length - 1, Math.floor(number)));
  }

  function unique(list) {
    return list.filter(function (value, index, array) { return array.indexOf(value) === index; });
  }

  function arraysEqual(first, second) {
    return first.length === second.length && first.every(function (value, index) { return value === second[index]; });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[character];
    });
  }

  function timeText() {
    return new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit" }).format(new Date());
  }

  function updateSaveLabel(text) {
    dom.saveStateLabel.textContent = text;
  }

  function announce(text) {
    dom.liveRegion.textContent = "";
    window.setTimeout(function () { dom.liveRegion.textContent = text; }, 20);
  }

  function cloneDraft(value) {
    if (!value || typeof value !== "object") return {};
    try { return JSON.parse(JSON.stringify(value)); } catch (error) { return {}; }
  }

  function motionBehavior() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }

  function isTerminalStatus(value) {
    return value === "passed" || value === "completed" || value === "failed";
  }

  function sanitizeDone(value) {
    var clean = {};
    if (!value || typeof value !== "object") return clean;
    scenes.forEach(function (_, index) {
      if (value[index] === true) clean[index] = true;
    });
    return clean;
  }

  function sanitizeNumberMap(value, minimum, maximum) {
    var clean = {};
    if (!value || typeof value !== "object") return clean;
    scenes.forEach(function (_, index) {
      var number = Number(value[index]);
      if (!isFinite(number)) return;
      clean[index] = Math.max(minimum, Math.min(maximum, Math.floor(number)));
    });
    return clean;
  }

  function sanitizeDrafts(value) {
    var clean = {};
    if (!value || typeof value !== "object") return clean;

    var listValues = ["sugar", "salt", "tea", "bread", "oil", "cheese"];
    var scene0 = value[0];
    if (scene0 && Array.isArray(scene0.list)) {
      clean[0] = { list: unique(scene0.list.filter(function (item) { return listValues.indexOf(item) >= 0; })) };
    }

    var scene1 = value[1];
    if (scene1 && scene1.sort && typeof scene1.sort === "object") {
      clean[1] = { sort: {} };
      produce.forEach(function (item) {
        var assigned = scene1.sort[item.id];
        if (assigned === "veg" || assigned === "fruit") clean[1].sort[item.id] = assigned;
      });
    }

    var scene2 = value[2];
    if (scene2 && typeof scene2 === "object") {
      clean[2] = {};
      copyAllowed(scene2, clean[2], "control:beanPrice", ["7", "9", "5"]);
      copyAllowed(scene2, clean[2], "control:potatoPrice", ["9", "6", "5"]);
      copyAllowed(scene2, clean[2], "control:beanKg", ["1", "2", "3"]);
      copyAllowed(scene2, clean[2], "control:appleKg", ["1", "2", "3"]);
      copyAllowed(scene2, clean[2], "control:cheaper", ["grape", "beans", "potato"]);
    }

    var scene3 = value[3];
    if (scene3 && typeof scene3 === "object") {
      clean[3] = {};
      copyAllowed(scene3, clean[3], "dialogue:offer", ["043", "wrong-a", "wrong-b"]);
      copyAllowed(scene3, clean[3], "dialogue:anything", ["051", "wrong-c", "wrong-d"]);
    }

    var scene4 = value[4];
    if (scene4 && typeof scene4 === "object") {
      clean[4] = {};
      copyAllowed(scene4, clean[4], "box", ["near", "far", "plural"]);
      copyAllowed(scene4, clean[4], "missing", ["tea", "oil", "cheese"]);
    }
    return clean;
  }

  function copyAllowed(source, target, key, allowed) {
    if (allowed.indexOf(source[key]) >= 0) target[key] = source[key];
  }
}());
