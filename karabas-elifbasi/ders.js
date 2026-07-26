"use strict";

const easternDigits = "٠١٢٣٤٥٦٧٨٩";
const totalLessons = 40;
const storagePrefix = "karabas-dersi-";
const textSizeKey = "karabas-harf-boyu";

const curatedExamples = {
  "01": ["مَطْبُوع نُسْخَه", "حُرُوفِ مَد", "تَنْوِين وَ نُون", "وَقْف وَ سَكْتَه"],
  "02": ["أَعُوذُ", "قُولُوا", "فِيهِ", "ءَاتَيْنَاكَ"],
  "03": ["طه", "أَبَدًا", "تَوَّابًا", "الر", "حم", "قَالَ"],
  "04": ["إِذَا جَاءَ", "أُولَئِكَ", "جِيءَ", "سُوءَ"],
  "05": ["يَا أَيُّهَا", "إِنِّي أَخَافُ", "عِنْدَهُ إِلَّا بِإِذْنِهِ", "وَمَا يُكَذِّبُ بِهِ إِلَّا"],
  "06": ["كَلِمَهٔ مُثَقَّلَه", "كَلِمَهٔ مُخَفَّفَه", "حَرْفِ مُثَقَّل", "حَرْفِ مُخَفَّف"],
  "07": ["وَلَا ٱلضَّآلِّينَ", "ٱلْحَآقَّةُ", "تَأْمُرُوٓنِّي", "ءَآلْـَٰٔنَ"],
  "08": ["يَعْلَمُونْ", "يَوْمِ ٱلدِّينْ", "نَسْتَعِينْ"],
  "09": ["طُول", "تَوَسُّط", "قَصْر", "رَوْم وَ اِشْمَام"],
  "10": ["اَلرَّوْمُ طَلَبُ الْحَرَكَةِ بِصَوْتٍ خَفِيٍّ", "اَلْإِشْمَامُ انْضِمَامُ الشَّفَتَيْنِ بَعْدَ السُّكُونِ"],
  "11": ["وَٱلصَّيْفِ", "عَلَيْهِ", "مِنْ خَوْفٍ"],
  "12": ["حم عسق", "كهيعص", "عَيْنْ", "خَوْفْ"],
  "13": ["ـً", "ـٍ", "ـٌ", "نْ"],
  "14": ["غَنِيٌّ كَرِيمٌ", "فَتْحٌ قَرِيبٌ", "عَنْ صَلَاتِهِمْ"],
  "15": ["صِفْ ذَا ثَنَا جُودَ شَخْصٌ قَدْ سَمَا كَرَمًا", "ضَعْ ظَالِمًا زِدْ تُقًى دُمْ طَالِبًا فَتَرَى"],
  "16": ["غَفُورٌ حَلِيمٌ", "مَنْ آمَنَ", "مِنْ خَوْفٍ"],
  "17": ["سَمِيعٌ بَصِيرٌ", "مِنْ بَعْدِ", "لَيُنْبَذَنَّ"],
  "18": ["خَيْرًا يَرَهُ", "فَضْلًا مِّنَ ٱللَّهِ", "وَمَنْ يَعْمَلْ"],
  "19": ["بُنْيَانٌ", "قِنْوَانٌ", "صِنْوَانٌ", "غَفُورٌ رَحِيمٌ", "هُدًى لِلْمُتَّقِينَ", "مِنْ رَبِّهِمْ"],
  "20": ["فَمَا رَبِحَت تِّجَارَتُهُمْ", "ٱضْرِب بِّعَصَاكَ", "ءَاوَوا وَّنَصَرُوا"],
  "21": ["لَئِنْ بَسَطْتَ", "وَقَالَتْ طَائِفَةٌ", "إِذْ ظَلَمُوا", "يَلْهَثْ ذَلِكَ", "ٱرْكَبْ مَعَنَا"],
  "22": ["قُل رَّبِّ", "بَل رَّفَعَهُ ٱللَّهُ", "أَلَمْ نَخْلُقكُّم"],
  "23": ["وَٱلشَّمْسِ", "وَٱلتِّينِ", "وَٱلنَّاسِ"],
  "24": ["وَٱلْعَصْرِ", "وَٱلْفَجْرِ", "وَٱلْقَمَرِ"],
  "25": ["يَدْخُلُونَ", "أَحَدْ", "بِٱلْحَقِّ", "قُطْبُ جَدٍّ"],
  "26": ["رَبَّنَا", "رُسُلٌ", "رِزْقًا", "فِرْعَوْنَ"],
  "27": ["هُوَ ٱللَّهُ", "نَصْرُ ٱللَّهِ", "بِٱللَّهِ", "لِلَّهِ", "قَالَ ٱللَّهُ", "فِي ٱللَّهِ"],
  "28": ["إِنَّهُ", "بِهِ", "وَلَهُ", "عَلَيْهِ", "إِلَيْهِ", "فِيهِ مُهَانًا"],
  "29": ["عِوَجًا ۜ قَيِّمًا", "مِنْ مَرْقَدِنَا ۜ هَذَا", "وَقِيلَ مَنْ ۜ رَاقٍ", "كَلَّا بَلْ ۜ رَانَ"],
  "30": ["اَلسَّكْتَةُ", "قَطْعُ الصَّوْتِ", "دُونَ النَّفَسِ"],
  "31": ["لَمْ يَتَسَنَّهْ", "وَاقْتَدِهْ", "كِتَابِيَهْ", "حِسَابِيَهْ", "مَالِيَهْ", "سُلْطَانِيَهْ", "مَا هِيَهْ"],
  "32": ["ءَا۬عْجَمِيٌّ", "مَجْر۪ىٰهَا"],
  "33": ["أَنَا", "لَكِنَّا", "ٱلظُّنُونَا", "ٱلرَّسُولَا", "ٱلسَّبِيلَا", "سَلَاسِلَا", "قَوَارِيرَا الْأُولَىٰ"],
  "34": ["ٱلْحَمْدُ لِلَّهِ", "رَبِّ ٱلْعَـٰلَمِينَ", "مَـٰلِكِ يَوْمِ ٱلدِّينِ", "إِيَّاكَ نَعْبُدُ", "إِيَّاكَ نَسْتَعِينُ", "وَلَا ٱلضَّآلِّينَ"],
  "35": ["اَصْل مَطْبُوع نُسْخَه", "قَرَه‌باش تَجْوِيدِ", "مُقَابَلَه", "مَنْبَع قَيْدِى"],
  "36": ["يَازْمَه نُسْخَه", "اَسَر قَيْدِى", "مُؤَلِّف قَيْدِى", "نُسْخَه تَارِيخِى"],
  "37": ["اِلْمِى مَقَالَه", "نُسْخَه تَحْقِيقِى", "مَتْن مُقَابَلَه‌سِى", "مَنْبَعْچَه"],
  "38": ["ا ب ت ث", "ج ح خ", "د ذ ر ز", "س ش ص ض", "ط ظ ع غ", "ف ق ك ل", "م ن و ه ي"],
  "39": ["بَ بِ بُ", "بًا بٍ بٌ", "اَبْ اِبْ اُبْ", "رَبِّ", "قَالَ قِيلَ يَقُولُ"],
  "40": ["وَقْف", "اِبْتِدَا", "۞ ۩", "سُورَةُ الْفَاتِحَةِ"]
};

const sourceDescriptions = {
  "01": "بُ دَرْس، قَرَه‌باش تَجْوِيدِنِڭ اَصْل مَطْبُوع نُسْخَه‌سِنِ تَانِتِر. مَنْبَع قَيْدِنِ آچَارَك نُسْخَه‌يِ صَحِيفَه صَحِيفَه اِينْجَه‌لَيِنِز.",
  "35": "قَرَه‌باش تَجْوِيدِنِڭ مَطْبُوع نُسْخَه‌سِ. دَرْس مَتْنْلَرِنِ اَصْل صَحِيفَه اِلَه مُقَابَلَه اَيْلَمَك اِيچُون آچِڭِز.",
  "36": "قَرَه‌باش تَجْوِيدِنَه دَائِر يَازْمَه اَسَر قَيْدِى. نُسْخَه، مُؤَلِّف وَ كُتُبْخَانَه بِلْگِسِنِ اِينْجَه‌لَمَك اِيچُون آچِڭِز.",
  "37": "قَرَه‌باش تَجْوِيدِ حَقِّينْدَه اِلْمِى تَحْقِيق. مَتْن تَارِيخِى وَ نُسْخَه‌لَر آرا‌سِنْدَه‌كِ مُنَاسَبَت اِيچُون آچِڭِز."
};

const elements = {
  loading: document.querySelector("#loading"),
  welcome: document.querySelector("#welcome"),
  lesson: document.querySelector("#lesson"),
  error: document.querySelector("#error"),
  lessonList: document.querySelector("#lessonList"),
  lessonNumber: document.querySelector("#lessonNumber"),
  pageNumber: document.querySelector("#pageNumber"),
  lessonTitle: document.querySelector("#lessonTitle"),
  sourceText: document.querySelector("#sourceText"),
  sourceLink: document.querySelector("#sourceLink"),
  examples: document.querySelector("#examples"),
  previousLesson: document.querySelector("#previousLesson"),
  nextLesson: document.querySelector("#nextLesson"),
  completeLesson: document.querySelector("#completeLesson"),
  firstLesson: document.querySelector("#firstLesson"),
  catalog: document.querySelector("#catalog"),
  catalogButton: document.querySelector("#catalogButton"),
  catalogClose: document.querySelector("#catalogClose"),
  overlay: document.querySelector("#overlay"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  largerText: document.querySelector("#largerText"),
  smallerText: document.querySelector("#smallerText")
};

let lessons = [];
let activeId = "";
let readingSize = Number(localStorage.getItem(textSizeKey) || 1.65);

function toEastern(value, minimumLength = 0) {
  return String(value)
    .padStart(minimumLength, "0")
    .replace(/\d/g, digit => easternDigits[Number(digit)]);
}

function lessonId(index) {
  return String(index + 1).padStart(2, "0");
}

function lessonUrl(id) {
  return `?d=${id}`;
}

function pageReference(entry, compact = false) {
  const oldPage = entry["صحيفه_قديم"] || "";
  const newVolume = entry["جلد_جديد"] || entry["جلد"] || "";
  const newPage = entry["صحيفه_جديد"] || entry["صحيفه"] || "";
  if (oldPage) {
    return compact
      ? `${oldPage} • ${newVolume}/${newPage}`
      : `سَكْسَنْلِك نُسْخَه ${oldPage} • ${newVolume}. جِلْد ${newPage}`;
  }
  return compact
    ? `${newVolume}/${newPage}`
    : `${newVolume}. جِلْد ${newPage}`;
}

function completedKey(id) {
  return `${storagePrefix}${id}-tamam`;
}

function tasksKey(id) {
  return `${storagePrefix}${id}-vazifeler`;
}

function isComplete(id) {
  return localStorage.getItem(completedKey(id)) === "1";
}

function normalizeSource(text) {
  return String(text || "").replace(/\\n/g, "\n").trim();
}

function isExternalSource(text) {
  return /^https?:\/\//i.test(String(text || "").trim());
}

function splitParagraphs(text, title) {
  const normalized = normalizeSource(text);
  if (!normalized) return [];

  let lines = normalized.split(/\n+/).map(line => line.trim()).filter(Boolean);
  if (lines.length === 1 && lines[0].length > 280) {
    lines = lines[0]
      .replace(/([.؟])\s+/g, "$1\n")
      .split(/\n+/)
      .map(line => line.trim())
      .filter(Boolean);
  }

  if (lines[0] === title) lines.shift();
  return lines;
}

function renderSource(entry, id) {
  elements.sourceText.replaceChildren();
  const raw = normalizeSource(entry["متن"]);
  const external = isExternalSource(raw);
  const paragraphs = external
    ? [sourceDescriptions[id] || "مَنْبَع قَيْدِنِ آچِڭِز."]
    : splitParagraphs(raw, entry["عنوان"]);

  paragraphs.forEach(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    elements.sourceText.append(paragraph);
  });

  if (external) {
    elements.sourceLink.href = raw;
    elements.sourceLink.hidden = false;
  } else {
    elements.sourceLink.hidden = true;
    elements.sourceLink.removeAttribute("href");
  }
}

function renderExamples(id) {
  elements.examples.replaceChildren();
  const examples = curatedExamples[id] || [];
  examples.forEach(exampleText => {
    const example = document.createElement("div");
    example.className = "example";
    example.textContent = exampleText;
    elements.examples.append(example);
  });
}

function readTasks(id) {
  try {
    return JSON.parse(localStorage.getItem(tasksKey(id)) || "{}");
  } catch {
    return {};
  }
}

function renderTasks(id) {
  const state = readTasks(id);
  document.querySelectorAll("[data-task]").forEach(input => {
    input.checked = Boolean(state[input.dataset.task]);
    input.onchange = () => {
      const nextState = readTasks(id);
      nextState[input.dataset.task] = input.checked;
      localStorage.setItem(tasksKey(id), JSON.stringify(nextState));
    };
  });
}

function setCompleteButton(id) {
  const complete = isComplete(id);
  elements.completeLesson.classList.toggle("is-complete", complete);
  elements.completeLesson.textContent = complete
    ? "بُ دَرْس تَمَامْلَنْدِ"
    : "بُ دَرْسِ تَمَامْلَادِم";
}

function completedCount() {
  return lessons.reduce((count, _lesson, index) => count + Number(isComplete(lessonId(index))), 0);
}

function updateProgress() {
  const count = completedCount();
  elements.progressText.textContent = `${toEastern(count)} / ${toEastern(totalLessons)}`;
  elements.progressBar.style.width = `${(count / totalLessons) * 100}%`;
}

function renderCatalog() {
  elements.lessonList.replaceChildren();
  lessons.forEach((entry, index) => {
    const id = lessonId(index);
    const anchor = document.createElement("a");
    anchor.href = lessonUrl(id);
    if (id === activeId) anchor.setAttribute("aria-current", "page");

    const number = document.createElement("span");
    number.className = "list-number";
    number.textContent = toEastern(index + 1, 2);

    const title = document.createElement("span");
    title.textContent = entry["عنوان"];

    const page = document.createElement("span");
    page.className = isComplete(id) ? "done-mark" : "list-page";
    page.textContent = isComplete(id) ? "✓" : pageReference(entry, true);

    anchor.append(number, title, page);
    anchor.addEventListener("click", closeCatalog);
    elements.lessonList.append(anchor);
  });
  updateProgress();
}

function setNavLink(link, index) {
  const valid = index >= 0 && index < lessons.length;
  link.classList.toggle("is-disabled", !valid);
  if (valid) {
    link.href = lessonUrl(lessonId(index));
    link.removeAttribute("aria-disabled");
  } else {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
  }
}

function showOnly(target) {
  [elements.loading, elements.welcome, elements.lesson, elements.error].forEach(section => {
    section.hidden = section !== target;
  });
}

function renderLesson(index) {
  const entry = lessons[index];
  activeId = lessonId(index);

  elements.lessonNumber.textContent = `دَرْس ${toEastern(index + 1, 2)}`;
  elements.pageNumber.textContent = pageReference(entry);
  elements.lessonTitle.textContent = entry["عنوان"];
  renderSource(entry, activeId);
  renderExamples(activeId);
  renderTasks(activeId);
  setCompleteButton(activeId);
  setNavLink(elements.previousLesson, index - 1);
  setNavLink(elements.nextLesson, index + 1);
  renderCatalog();
  showOnly(elements.lesson);
}

function applyReadingSize() {
  readingSize = Math.min(2.15, Math.max(1.25, readingSize));
  document.documentElement.style.setProperty("--reading-size", `${readingSize}rem`);
  localStorage.setItem(textSizeKey, String(readingSize));
}

function openCatalog() {
  elements.catalog.classList.add("is-open");
  elements.overlay.hidden = false;
  elements.catalogButton.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeCatalog() {
  elements.catalog.classList.remove("is-open");
  elements.overlay.hidden = true;
  elements.catalogButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

async function initialize() {
  applyReadingSize();

  try {
    const response = await fetch("./dersler.json", { cache: "no-store" });
    if (!response.ok) throw new Error("manifest");
    const manifest = await response.json();
    lessons = Array.isArray(manifest["دروس"]) ? manifest["دروس"] : [];
    if (lessons.length !== totalLessons) throw new Error("lesson-count");

    const parameter = new URLSearchParams(window.location.search).get("d");
    activeId = parameter || "";
    renderCatalog();

    if (!parameter) {
      showOnly(elements.welcome);
      return;
    }

    const normalizedId = /^\d{1,2}$/.test(parameter)
      ? String(Number(parameter)).padStart(2, "0")
      : "";
    const index = Number(normalizedId) - 1;

    if (!normalizedId || index < 0 || index >= lessons.length) {
      showOnly(elements.error);
      return;
    }

    renderLesson(index);
  } catch {
    elements.error.querySelector("h1").textContent = "دَرْسْلَر آچِيلَامَادِى";
    elements.error.querySelector("p").textContent = "صَحِيفَه‌يِ سَرْوَر اُوزَرِنْدَنْ آچِڭِز.";
    showOnly(elements.error);
  }
}

elements.catalogButton.addEventListener("click", () => {
  if (elements.catalog.classList.contains("is-open")) closeCatalog();
  else openCatalog();
});
elements.catalogClose.addEventListener("click", closeCatalog);
elements.overlay.addEventListener("click", closeCatalog);
elements.firstLesson.addEventListener("click", () => {
  window.location.href = lessonUrl("01");
});
elements.largerText.addEventListener("click", () => {
  readingSize += .15;
  applyReadingSize();
});
elements.smallerText.addEventListener("click", () => {
  readingSize -= .15;
  applyReadingSize();
});
elements.completeLesson.addEventListener("click", () => {
  if (!activeId) return;
  const nextValue = isComplete(activeId) ? "0" : "1";
  localStorage.setItem(completedKey(activeId), nextValue);
  setCompleteButton(activeId);
  renderCatalog();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCatalog();
});

initialize();
