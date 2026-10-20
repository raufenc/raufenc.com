import { openPlayer } from "./player.js";
const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
const API = "/api/sunumlar/";
const legacy = [
  { id: "yapay-zeka-dil-ogretimi", title: "Yabanc\u0131 Dil \xD6\u011Fretiminde Yapay Zek\xE2", description: "Yapay zek\xE2y\u0131 anlamak, \xE7\u0131kt\u0131y\u0131 s\u0131namak ve \xF6\u011Frenciyi \xFCreten \xF6zne olarak tutmak i\xE7in etkile\u015Fimli seminer.", cover: "/sunumlar/yapay-zeka-dil-ogretimi/slides/s01.jpg", label: "SUNUM + AT\xD6LYE", meta: "40 slayt \xB7 60 dakika", url: "/sunumlar/yapay-zeka-dil-ogretimi/", src: "/sunumlar/yapay-zeka-dil-ogretimi/sunum.html" },
  { id: "bilim", title: "Bilim Nedir, Ne De\u011Fildir?", description: "Bilimin t\xFCrleri, y\xF6ntemleri ve s\u0131n\u0131rlar\u0131 \xFCzerine felsefi bir yolculuk.", cover: "/sunumlar/bilim/images/slide-01.jpg", label: "WEB SUNUMU", meta: "64 slayt \xB7 6 b\xF6l\xFCm", url: "/sunumlar/bilim/", src: "/sunumlar/bilim/index.html" },
  { id: "safsatalar", title: "Safsata Dedektifi", description: "Mant\u0131k hatalar\u0131n\u0131 \xF6\u011Frenin, ger\xE7ek diyaloglarda fark edin. Etkile\u015Fimli sunum ve uygulamalar.", cover: "/sunumlar/safsatalar/images/image-3-1.jpeg", label: "SUNUM + OYUN", meta: "13 safsata \xB7 5 senaryo", url: "/sunumlar/safsatalar/", src: "/sunumlar/safsatalar/index.html" }
].map((p) => ({ ...p, legacy: true, kind: "web", slides: [{ id: p.id, type: "embed", title: p.title, src: p.src, notes: "Bu sunumun kendi gezinme d\xFC\u011Fmeleri ve klavye k\u0131sayollar\u0131 vard\u0131r. Lazer veya kalem a\xE7\u0131kken i\xE7erikle etkile\u015Fmek i\xE7in \xF6nce arac\u0131 kapat\u0131n." }] }));
const demo = { id: "sahne-denemesi", title: "Sahne denemesi", description: "Sunum ara\xE7lar\u0131n\u0131 tan\u0131y\u0131n.", slides: [
  { id: "d1", type: "html", title: "Sahne sizin.", heading: "Sahne sizin.", body: "Bir fikir, bir hik\xE2ye, bir sonraki ad\u0131m.", bullets: ["Ok tu\u015Fu veya bo\u015Fluk ile bir sonraki ad\u0131m\u0131 g\xF6sterin.", "L tu\u015Fuyla lazer i\u015Faret\xE7iyi a\xE7\u0131n.", "F tu\u015Fuyla tam ekrana ge\xE7in."], notes: "Bu bir ara\xE7 tan\u0131t\u0131m\u0131d\u0131r. Maddeler birer birer g\xF6r\xFCn\xFCr. Sa\u011F okla deneyin." },
  { id: "d2", type: "html", title: "Anlat\u0131rken i\u015Faretleyin.", heading: "Dikkati istedi\u011Finiz yere ta\u015F\u0131y\u0131n.", body: "\u0130\u015Faretlemek, \xE7izmek ve duraklamak da anlat\u0131m\u0131n bir par\xE7as\u0131.", bullets: ["P: kalem \xB7 E: \xE7izimleri temizle", "B: ekran\u0131 karart \xB7 N: konu\u015Fmac\u0131 notlar\u0131", "R: slayd\u0131 yeniden ba\u015Flat"], notes: "Bu slaytta kalemi a\xE7\u0131p bir i\u015Faret \xE7izin. Karartmay\u0131 ve not panelini deneyin." },
  { id: "d3", type: "html", title: "Her proje kendi alan\u0131nda.", heading: "Haz\u0131r oldu\u011Funuzda ba\u015Flay\u0131n.", body: "G\xF6rselleri, videolar\u0131 veya mevcut web sunumunuzu ekleyin.", bullets: [], notes: "\xC7\u0131k\u0131\u015F i\xE7in Escape veya \xFCstteki kapatma d\xFC\u011Fmesini kullan\u0131n." }
] };
let status = { storageReady: false, authenticated: false, authReady: false }, projects = [...legacy], cursor = null, filter = "all", draft = null, dirty = false, uploading = false, uploadAbort = null, editorFiles = /* @__PURE__ */ new Map(), previewUrls = /* @__PURE__ */ new Set();
const txt = (tag, text, cls) => {
  const el = document.createElement(tag);
  el.textContent = text;
  if (cls) el.className = cls;
  return el;
};
function toast(text) {
  $("#toast").textContent = text;
  $("#toast").hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $("#toast").hidden = true, 4500);
}
async function api(action, body, query = {}) {
  const u = new URL(API, location.origin);
  u.searchParams.set("action", action);
  Object.entries(query).forEach(([k, v]) => v != null && u.searchParams.set(k, v));
  const r = await fetch(u, { method: body === void 0 ? "GET" : "POST", credentials: "same-origin", headers: body === void 0 ? {} : { "Content-Type": "application/json" }, body: body === void 0 ? void 0 : JSON.stringify(body) });
  let data;
  try {
    data = await r.json();
  } catch {
    throw Error("Sunucuya ula\u015F\u0131lamad\u0131. Ba\u011Flant\u0131n\u0131z\u0131 kontrol edin.");
  }
  if (!r.ok) throw Error(data.error || "\u0130\u015Flem tamamlanamad\u0131.");
  return data;
}
async function loadStatus() {
  try {
    status = await api("status");
    $("#storage-status").textContent = status.storageReady ? "Medya deposu ba\u011Fl\u0131" : "Medya deposu bekleniyor";
    $("#login-button").textContent = status.authenticated ? "Y\xF6netici \xB7 \xC7\u0131k\u0131\u015F yap" : "Y\xF6netici giri\u015Fi";
    $("#service-message").hidden = status.storageReady;
    if (!status.storageReady) $("#service-message").textContent = "Mevcut sunumlar haz\u0131r. Yeni dosyalar\u0131 kal\u0131c\u0131 olarak yay\u0131mlamak i\xE7in medya deposunun ba\u011Flanmas\u0131 gerekiyor. Bu s\u0131rada proje haz\u0131rlayabilir ve bu oturumda \xF6nizleyebilirsiniz.";
    if (status.storageReady) await loadProjects();
  } catch (e) {
    $("#storage-status").textContent = "\xC7evrimd\u0131\u015F\u0131 / sunucuya eri\u015Filemiyor";
    $("#service-message").hidden = false;
    $("#service-message").textContent = "Sunucuya ba\u011Flan\u0131lamad\u0131. Mevcut sunumlara eri\u015Febilir, yeni bir projeyi bu oturumda haz\u0131rlay\u0131p \xF6nizleyebilirsiniz.";
  }
  render();
}
async function loadProjects(more = false) {
  try {
    const d = await api("list", void 0, { cursor: more ? cursor : null });
    projects = more ? [...projects, ...d.projects.filter((p) => !projects.some((q) => q.id === p.id))] : [...legacy, ...d.projects];
    cursor = d.cursor;
    $("#load-more").hidden = !cursor;
    render();
  } catch (e) {
    toast(e.message);
  }
}
function render() {
  const q = $("#search").value.toLocaleLowerCase("tr").trim();
  const shown = projects.filter((p) => (filter === "all" || (p.kind || "media") === filter) && (!q || `${p.title} ${p.description}`.toLocaleLowerCase("tr").includes(q)));
  $("#project-count").textContent = projects.length;
  $("#projects").replaceChildren();
  $("#empty").hidden = shown.length > 0;
  for (const p of shown) {
    const card = txt("article", "", "project-card"), art = txt("div", "", "card-art");
    if (p.cover) {
      const im = document.createElement("img");
      im.src = p.cover;
      im.alt = "";
      im.loading = "lazy";
      im.onerror = () => im.remove();
      art.append(im);
    } else art.append(txt("span", p.title.slice(0, 2).toLocaleUpperCase("tr"), "placeholder"));
    art.append(txt("span", p.label || "SUNUM PROJES\u0130", "card-tag"));
    const play = txt("button", "\u25B7", "card-play");
    play.setAttribute("aria-label", `${p.title} sunumunu ba\u015Flat`);
    play.onclick = () => launch(p);
    art.append(play);
    const body = txt("div", "", "card-body");
    body.append(txt("h3", p.title), txt("p", p.description || "Sunum projesi"));
    const footer = txt("div", "", "card-footer");
    footer.append(txt("span", p.meta || `${p.slideCount || p.slides?.length || 0} slayt`));
    const actions = txt("div", "", "card-actions");
    const share = txt("button", "\u2197", "text-button");
    share.setAttribute("aria-label", `${p.title} ba\u011Flant\u0131s\u0131n\u0131 kopyala`);
    share.onclick = () => copyLink(p.id);
    actions.append(share);
    if (p.legacy) {
      const link = txt("a", "Projeyi a\xE7 \u2192", "source-link");
      link.href = p.url;
      actions.append(link);
    } else if (status.authenticated) {
      const edit = txt("button", "D\xFCzenle", "text-button");
      edit.onclick = () => editProject(p.id);
      actions.append(edit);
      const archive = txt("button", "Ar\u015Fivle", "text-button");
      archive.onclick = async () => {
        if (!await askConfirm("Bu sunum listeden kaldırılsın mı? Dosyaları korunur.", "Arşivle")) return;
        try {
          await api("archive", { id: p.id });
          await loadProjects();
          toast("Sunum ar\u015Fivlendi.");
        } catch (e) {
          toast(e.message);
        }
      };
      actions.append(archive);
    } else {
      const start = txt("button", "Sun \u2192", "text-button");
      start.onclick = () => launch(p);
      actions.append(start);
    }
    footer.append(actions);
    body.append(footer);
    card.append(art, body);
    $("#projects").append(card);
  }
}
async function fullProject(p) {
  return p.slides ? p : (await api("get", void 0, { id: p.id })).project;
}
async function launch(p) {
  try {
    const full = await fullProject(p);
    history.replaceState(null, "", `?proje=${encodeURIComponent(full.id)}`);
    await openPlayer(full, { onClose: () => history.replaceState(null, "", location.pathname) });
  } catch (e) {
    toast(e.message);
  }
}
async function copyLink(id) {
  const u = new URL(location.pathname, location.origin);
  u.searchParams.set("proje", id);
  try {
    await navigator.clipboard.writeText(u.href);
    toast("Sunum ba\u011Flant\u0131s\u0131 kopyaland\u0131.");
  } catch {
    toast("Adres: " + u.href);
  }
}
function releasePreviews() {
  for (const url of previewUrls) URL.revokeObjectURL(url);
  previewUrls.clear();
  editorFiles.clear();
}
function newDraft() {
  return { id: crypto.randomUUID(), title: "", description: "", slides: [], updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function openEditor(project) {
  releasePreviews();
  draft = project ? structuredClone(project) : newDraft();
  dirty = false;
  $("#project-title").value = draft.title;
  $("#project-description").value = draft.description || "";
  $("#editor-title").textContent = project ? "Sunumu d\xFCzenle" : "Yeni sunum";
  $("#save-state").textContent = project ? "Son kaydedilen s\xFCr\xFCm" : "Hen\xFCz kaydedilmedi";
  updateEditorNotice();
  renderSlides();
  $("#editor").showModal();
}
function updateEditorNotice() {
  const el = $("#editor-notice");
  el.textContent = !status.storageReady ? "Medya deposu hen\xFCz ba\u011Fl\u0131 de\u011Fil. Dosyalar bu oturumda \xF6nizlenir; sayfa kapat\u0131l\u0131rsa yerel dosyalar yeniden se\xE7ilmelidir." : !status.authenticated ? "Dosyalar\u0131 kal\u0131c\u0131 y\xFCklemek ve projeyi yay\u0131mlamak i\xE7in y\xF6netici giri\u015Fi yap\u0131n." : "Kaydet ve yay\u0131mla ile proje ba\u011Flant\u0131s\u0131 eri\u015Filebilir olur. Y\xFCklenen dosyalar ba\u011Flant\u0131y\u0131 bilen herkes taraf\u0131ndan g\xF6r\xFCnt\xFClenebilir.";
  if (!status.authenticated) {
    const login = txt("button", "Y\xF6netici giri\u015Fi", "text-button");
    login.onclick = () => {
      $("#login-error").textContent = "";
      $("#login-dialog").showModal();
    };
    el.append(" ", login);
  }
  $("#save-project").disabled = !status.storageReady || uploading;
}
async function editProject(id) {
  try {
    openEditor((await api("get", void 0, { id })).project);
  } catch (e) {
    toast(e.message);
  }
}
function syncDraft() {
  draft.title = $("#project-title").value.trim();
  draft.description = $("#project-description").value.trim();
  return draft;
}
function changed() {
  dirty = true;
  $("#save-state").textContent = "Kaydedilmemi\u015F de\u011Fi\u015Fiklikler";
}
function field(label, value, oninput, opts = {}) {
  const l = txt("label", label), el = document.createElement(opts.multiline ? "textarea" : "input");
  if (!opts.multiline) el.type = opts.type || "text";
  if (opts.type === "number") {
    el.min = "0";
    el.step = "0.1";
  }
  el.value = value ?? "";
  if (opts.maxLength) el.maxLength = opts.maxLength;
  el.oninput = () => {
    oninput(el.value);
    changed();
  };
  l.append(el);
  return l;
}
function renderSlides() {
  $("#slide-list").replaceChildren();
  $("#no-slides").hidden = !!draft.slides.length;
  draft.slides.forEach((s, i) => {
    const li = txt("li", "", "slide-row");
    li.append(txt("span", String(i + 1).padStart(2, "0"), "slide-number"));
    const thumb = s.type === "image" ? document.createElement("img") : txt("div", { video: "\u25B7", html: "T", embed: "\u2197" }[s.type] || "\u25A4");
    thumb.className = "slide-thumb";
    if (s.type === "image") {
      thumb.src = s.src;
      thumb.alt = "";
      thumb.loading = "lazy";
    }
    li.append(thumb);
    const fields = txt("div", "", "slide-fields");
    const title = field("Slayt ba\u015Fl\u0131\u011F\u0131", s.title, (v) => s.title = v, { maxLength: 200 });
    title.classList.add("wide");
    fields.append(title);
    if (s.type === "html" && !s.src) {
      const head = field("Ekrandaki ba\u015Fl\u0131k", s.heading, (v) => s.heading = v, { maxLength: 500 });
      head.classList.add("wide");
      const body = field("A\xE7\u0131klama", s.body, (v) => s.body = v, { multiline: true, maxLength: 5e3 });
      body.classList.add("wide");
      const bullets = field("Ad\u0131m ad\u0131m a\xE7\u0131lan maddeler (her sat\u0131ra bir madde)", (s.bullets || []).join("\n"), (v) => s.bullets = v.split("\n").filter(Boolean), { multiline: true, maxLength: 1e4 });
      bullets.classList.add("wide");
      fields.append(head, body, bullets);
    }
    if (s.type === "video") {
      fields.append(field("Ba\u015Flang\u0131\xE7 (saniye)", s.start || 0, (v) => s.start = Number(v), { type: "number" }), field("Biti\u015F (bo\u015Fsa sonuna kadar)", s.end ?? "", (v) => s.end = v === "" ? void 0 : Number(v), { type: "number" }));
    }
    const notes = field("Konu\u015Fmac\u0131 notu", s.notes || "", (v) => s.notes = v, { multiline: true, maxLength: 1e4 });
    notes.classList.add("wide");
    fields.append(notes);
    li.append(fields);
    const acts = txt("div", "", "slide-actions");
    for (const [label, icon, fn, disabled] of [["Yukar\u0131 ta\u015F\u0131", "\u2191", () => move(i, -1), i === 0], ["A\u015Fa\u011F\u0131 ta\u015F\u0131", "\u2193", () => move(i, 1), i === draft.slides.length - 1], ["Slayd\u0131 \xE7o\u011Falt", "\u29C9", () => {
      draft.slides.splice(i + 1, 0, { ...structuredClone(s), id: crypto.randomUUID() });
      if (editorFiles.has(s.id)) editorFiles.set(draft.slides[i + 1].id, editorFiles.get(s.id));
      changed();
      renderSlides();
    }, false], ["Slayd\u0131 kald\u0131r", "\xD7", () => {
      draft.slides.splice(i, 1);
      editorFiles.delete(s.id);
      changed();
      renderSlides();
    }, false]]) {
      const b = txt("button", icon);
      b.title = label;
      b.setAttribute("aria-label", label);
      b.disabled = disabled;
      b.onclick = fn;
      acts.append(b);
    }
    li.append(acts);
    $("#slide-list").append(li);
  });
  $("#source-info").replaceChildren();
  if (draft.sourceUrl) {
    const a = txt("a", "Kaynak dosyas\u0131 \u2197");
    a.href = draft.sourceUrl;
    a.target = "_blank";
    a.rel = "noopener";
    $("#source-info").append(a);
  }
  if (editorFiles.has("source")) $("#source-info").append(txt("span", " Kaynak dosyas\u0131: " + editorFiles.get("source").name + " \xB7 hen\xFCz y\xFCklenmedi"));
  if (uploading) lockEditor(true);
}
function move(i, d) {
  [draft.slides[i], draft.slides[i + d]] = [draft.slides[i + d], draft.slides[i]];
  changed();
  renderSlides();
}
function getType(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return null;
}
async function addFiles(files) {
  for (const f of files) {
    const type = getType(f);
    if (!type) {
      toast(`${f.name}: bu bi\xE7im slayt olarak desteklenmiyor.`);
      continue;
    }
    if (status.maxFileBytes && f.size > status.maxFileBytes) {
      toast(`${f.name}: tek dosya s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor.`);
      continue;
    }
    const id = crypto.randomUUID(), url = URL.createObjectURL(f);
    previewUrls.add(url);
    editorFiles.set(id, f);
    draft.slides.push({ id, type, src: url, title: f.name.replace(/\.[^.]+$/, ""), notes: "" });
  }
  changed();
  renderSlides();
}
function safeUrl(value, type) {
  let s = value.trim();
  if (s.startsWith("<iframe")) {
    const doc = new DOMParser().parseFromString(s, "text/html");
    s = doc.querySelector("iframe")?.getAttribute("src") || "";
  }
  const u = new URL(s, location.origin);
  if (u.username || u.password || !["https:"].includes(u.protocol) && !(u.origin === location.origin && u.pathname.startsWith("/sunumlar/"))) throw Error("HTTPS ba\u011Flant\u0131s\u0131 veya bu sitedeki bir sunum adresi kullan\u0131n.");
  if (["embed", "html"].includes(type)) {
    const trusted = u.origin === location.origin && u.pathname.startsWith("/sunumlar/");
    const ms = /^(?:view\.officeapps\.live\.com|onedrive\.live\.com|1drv\.ms|(?:[a-z0-9-]+\.)+officeapps\.live\.com|(?:[a-z0-9-]+\.)+sharepoint\.com|docs\.google\.com)$/.test(u.hostname);
    if (!trusted && !ms) throw Error("Bu i\xE7erik i\xE7in sitedeki bir HTML sunumu veya Microsoft / Google Slides g\xF6mme ba\u011Flant\u0131s\u0131 kullan\u0131n.");
  }
  return u.origin === location.origin ? u.pathname + u.search + u.hash : u.href;
}
function validateDraft(p) {
  if (!p.title) throw Error("Sunuma bir ad verin.");
  if (!p.slides.length) throw Error("En az bir slayt ekleyin.");
  for (const s of p.slides) {
    if (s.type === "video" && s.end !== void 0 && Number(s.end) <= Number(s.start || 0)) throw Error("Video biti\u015Fi ba\u015Flang\u0131\xE7tan sonra olmal\u0131.");
    if (s.src && !s.src.startsWith("blob:")) safeUrl(s.src, s.type);
  }
  return p;
}
async function save() {
  try {
    validateDraft(syncDraft());
    if (!status.authenticated) {
      $("#login-dialog").showModal();
      return;
    }
    if (!status.storageReady) throw Error("\xD6nce medya deposu ba\u011Flanmal\u0131.");
    uploading = true;
    lockEditor(true);
    updateEditorNotice();
    $("#save-state").textContent = "Kaydediliyor\u2026";
    if (editorFiles.size) await uploadFiles();
    const result = await api("save", { project: draft });
    draft = result.project || draft;
    dirty = false;
    $("#save-state").textContent = "Yay\u0131mland\u0131 \xB7 de\u011Fi\u015Fiklikler kaydedildi";
    toast("Sunum yay\u0131mland\u0131. Ba\u011Flant\u0131s\u0131 proje kart\u0131nda.");
    await loadProjects();
  } catch (e) {
    $("#save-state").textContent = "Kaydedilemedi";
    toast(e.name === "AbortError" ? "Y\xFCkleme iptal edildi. Dosyalar bu oturumda duruyor." : e.message);
  } finally {
    uploading = false;
    lockEditor(false);
    $("#upload-status").hidden = true;
    updateEditorNotice();
  }
}
function lockEditor(locked) {
  $$("#editor .editor-body input, #editor .editor-body textarea, #editor .editor-body button, #preview-project, #export-json").forEach((el) => {
    if (el.id !== "cancel-upload") el.disabled = locked;
  });
}
async function uploadFiles() {
  const { upload } = await import("./vendor/blob-client.js");
  uploadAbort = new AbortController();
  $("#upload-status").hidden = false;
  let done = 0;
  const uploaded = /* @__PURE__ */ new Map();
  const total = new Set(editorFiles.values()).size;
  for (const [id, file] of [...editorFiles]) {
    if (uploadAbort.signal.aborted) throw new DOMException("\u0130ptal", "AbortError");
    const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "-").slice(-140);
    const path = `sunumlar/media/${draft.id}/${crypto.randomUUID()}-${safe}`;
    let blob = uploaded.get(file);
    if (!blob) {
      blob = await upload(path, file, { access: "public", handleUploadUrl: API + "?action=upload", multipart: true, clientPayload: JSON.stringify({ projectId: draft.id }), abortSignal: uploadAbort.signal, onUploadProgress: ({ percentage }) => {
        $("#upload-progress").value = percentage;
        $("#upload-label").textContent = `${done + 1} / ${total} \xB7 ${file.name} \xB7 %${Math.round(percentage)}`;
      } });
      uploaded.set(file, blob);
      done++;
    }
    if (id === "source") draft.sourceUrl = blob.url;
    else {
      const slide = draft.slides.find((s) => s.id === id);
      if (slide) slide.src = blob.url;
    }
    editorFiles.delete(id);
  }
  renderSlides();
}
function downloadJson() {
  try {
    validateDraft(syncDraft());
    if (editorFiles.size || draft.slides.some((s) => s.src?.startsWith("blob:"))) throw Error("Dosyalar\u0131 i\xE7eren ta\u015F\u0131nabilir proje i\xE7in \xF6nce y\xFCkleyip kaydedin. Yerel dosya ba\u011Flant\u0131lar\u0131 ba\u015Fka oturumda \xE7al\u0131\u015Fmaz.");
    const a = document.createElement("a"), url = URL.createObjectURL(new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" }));
    a.href = url;
    a.download = (draft.title.replace(/[^\p{L}\p{N} -]/gu, "") || "sunum") + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  } catch (e) {
    toast(e.message);
  }
}
async function importJson(file) {
  try {
    if (file.size > 2 * 1024 * 1024) throw Error("Proje tan\u0131m\u0131 en fazla 2 MB olabilir; medya dosyalar\u0131n\u0131 ayr\u0131 ekleyin.");
    const p = JSON.parse(await file.text());
    if (typeof p.title !== "string" || !Array.isArray(p.slides) || p.slides.length > 5e3) throw Error("Ge\xE7erli bir proje dosyas\u0131 se\xE7in.");
    for (const s of p.slides) {
      if (!["image", "video", "html", "embed"].includes(s.type)) throw Error("Desteklenmeyen slayt t\xFCr\xFC.");
      if (s.src) s.src = safeUrl(s.src, s.type);
      if (s.bullets && (!Array.isArray(s.bullets) || !s.bullets.every((v) => typeof v === "string"))) throw Error("Maddeler metin olmal\u0131d\u0131r.");
      s.id = crypto.randomUUID();
    }
    p.id = crypto.randomUUID();
    if (p.sourceUrl) p.sourceUrl = safeUrl(p.sourceUrl, "source");
    if (p.cover) p.cover = safeUrl(p.cover, "image");
    releasePreviews();
    draft = p;
    $("#project-title").value = p.title;
    $("#project-description").value = p.description || "";
    changed();
    renderSlides();
  } catch (e) {
    toast("\u0130\xE7e aktar\u0131lamad\u0131: " + e.message);
  }
}
$("#search").oninput = render;
$$("[data-filter]").forEach((b) => b.onclick = () => {
  filter = b.dataset.filter;
  $$("[data-filter]").forEach((t) => {
    t.classList.toggle("active", t === b);
    t.setAttribute("aria-pressed", String(t === b));
  });
  render();
});
$("#new-project").onclick = () => openEditor();
$("#try-player").onclick = () => openPlayer(demo);
$("#guide-button").onclick = () => $("#guide").showModal();
$$("[data-close]").forEach((b) => b.onclick = () => b.closest("dialog").close());
$("#close-editor").onclick = async () => {
  if (uploading) {
    toast("Y\xFCklemeyi iptal edin veya tamamlanmas\u0131n\u0131 bekleyin.");
    return;
  }
  if (dirty && !await askConfirm("Kaydedilmemiş değişiklikler var. Düzenleyici kapatılsın mı?", "Kaydetmeden kapat")) return;
  $("#editor").close();
  releasePreviews();
  dirty = false;
};
$("#editor").addEventListener("cancel", (e) => {
  e.preventDefault();
  $("#close-editor").click();
});
$("#project-title").oninput = changed;
$("#project-description").oninput = changed;
$("#add-files").onclick = () => $("#file-input").click();
$("#file-input").onchange = (e) => {
  addFiles([...e.target.files]);
  e.target.value = "";
};
$("#add-text").onclick = () => {
  draft.slides.push({ id: crypto.randomUUID(), type: "html", title: "Yeni slayt", heading: "Ba\u015Fl\u0131\u011F\u0131n\u0131z", body: "", bullets: [], notes: "" });
  changed();
  renderSlides();
};
$("#add-url").onclick = () => {
  $("#url-form").reset();
  $("#url-error").textContent = "";
  $("#url-dialog").showModal();
};
$("#url-form").onsubmit = (e) => {
  e.preventDefault();
  try {
    const type = $("#url-type").value, src = safeUrl($("#url-value").value, type);
    draft.slides.push({ id: crypto.randomUUID(), type, src, title: $("#url-title").value.trim() || "Ba\u011Flant\u0131dan slayt", notes: "" });
    changed();
    renderSlides();
    $("#url-dialog").close();
  } catch (err) {
    $("#url-error").textContent = err.message;
  }
};
$("#import-json").onclick = () => $("#json-input").click();
$("#json-input").onchange = (e) => {
  if (e.target.files[0]) importJson(e.target.files[0]);
  e.target.value = "";
};
$("#attach-source").onclick = () => $("#source-input").click();
$("#source-input").onchange = (e) => {
  if (e.target.files[0]) {
    editorFiles.set("source", e.target.files[0]);
    changed();
    renderSlides();
    toast("Kaynak dosya eklendi. Sunmak i\xE7in g\xF6rsel/video slayt veya web ba\u011Flant\u0131s\u0131 da ekleyin.");
  }
  e.target.value = "";
};
$("#save-project").onclick = save;
$("#export-json").onclick = downloadJson;
$("#cancel-upload").onclick = () => uploadAbort?.abort();
$("#preview-project").onclick = async () => {
  try {
    const p = validateDraft(syncDraft());
    $("#editor").close();
    await openPlayer(p, { onClose: () => $("#editor").showModal() });
  } catch (e) {
    toast(e.message);
  }
};
$("#login-button").onclick = async () => {
  if (status.authenticated) {
    try {
      await api("logout", {});
      status.authenticated = false;
      await loadStatus();
      toast("\xC7\u0131k\u0131\u015F yap\u0131ld\u0131.");
    } catch (e) {
      toast(e.message);
    }
  } else {
    $("#login-error").textContent = status.authReady ? "" : "Sunucuda y\xF6netici \u015Fifresi yap\u0131land\u0131r\u0131lmam\u0131\u015F olabilir.";
    $("#login-dialog").showModal();
  }
};
$("#login-form").onsubmit = async (e) => {
  e.preventDefault();
  const b = e.submitter;
  b.disabled = true;
  try {
    await api("login", { password: $("#password").value });
    $("#password").value = "";
    $("#login-dialog").close();
    await loadStatus();
    if (draft) updateEditorNotice();
    toast("Y\xF6netici giri\u015Fi yap\u0131ld\u0131.");
  } catch (err) {
    $("#login-error").textContent = err.message;
  } finally {
    b.disabled = false;
  }
};
$("#load-more").onclick = () => loadProjects(true);
window.addEventListener("beforeunload", (e) => {
  if (dirty || uploading) {
    e.preventDefault();
    e.returnValue = "";
  }
});
render();
await loadStatus();
const selected = new URLSearchParams(location.search).get("proje");
if (selected) {
  const p = projects.find((p2) => p2.id === selected);
  if (p) await launch(p);
  else if (/^[0-9a-f-]{36}$/i.test(selected)) {
    try {
      await launch((await api("get", void 0, { id: selected })).project);
    } catch (e) {
      toast(e.message);
    }
  }
}

function askConfirm(message, label) {
  return new Promise(resolve => {
    const dialog = document.createElement('dialog');
    dialog.className = 'small-dialog';
    dialog.setAttribute('aria-label', 'Değişiklikleri onayla');
    dialog.append(txt('p', message));
    const actions = txt('div', '', 'hero-actions');
    const cancel = txt('button', 'Vazgeç', 'secondary');
    const yes = txt('button', label, 'primary');
    const finish = result => { dialog.close(); dialog.remove(); resolve(result); };
    cancel.onclick = () => finish(false);
    yes.onclick = () => finish(true);
    dialog.addEventListener('cancel', event => { event.preventDefault(); finish(false); });
    actions.append(cancel, yes); dialog.append(actions);
    document.body.append(dialog); dialog.showModal(); cancel.focus();
  });
}
