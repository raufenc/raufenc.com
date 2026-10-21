import { openPlayer } from "./player.js";
import { v2Projects } from "./v2-projects.js";
const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
const API = "/api/sunumlar/";
const legacy = [
  { id: "yapay-zeka-dil-ogretimi", title: "Yabancı Dil Öğretiminde Yapay Zekâ", description: "Yapay zekâyı anlamak, çıktıyı sınamak ve öğrenciyi üreten özne olarak tutmak için etkileşimli seminer.", cover: "/sunumlar/yapay-zeka-dil-ogretimi/slides/s01.jpg", label: "SUNUM + ATÖLYE", meta: "40 slayt · 60 dakika", url: "/sunumlar/yapay-zeka-dil-ogretimi/", src: "/sunumlar/yapay-zeka-dil-ogretimi/sunum.html" },
  { id: "bilim", title: "Bilim Nedir, Ne Değildir?", description: "Bilimin türleri, yöntemleri ve sınırları üzerine felsefi bir yolculuk.", cover: "/sunumlar/bilim/images/slide-01.jpg", label: "WEB SUNUMU", meta: "64 slayt · 6 bölüm", url: "/sunumlar/bilim/", src: "/sunumlar/bilim/index.html" },
  { id: "safsatalar", title: "Safsata Dedektifi", description: "Mantık hatalarını öğrenin, gerçek diyaloglarda fark edin. Etkileşimli sunum ve uygulamalar.", cover: "/sunumlar/safsatalar/images/image-3-1.jpeg", label: "SUNUM + OYUN", meta: "13 safsata · 5 senaryo", url: "/sunumlar/safsatalar/", src: "/sunumlar/safsatalar/index.html" }
].map((p) => ({ ...p, legacy: true, kind: "web", slides: [{ id: p.id, type: "embed", title: p.title, src: p.src, notes: "Bu sunumun kendi gezinme düğmeleri ve klavye kısayolları vardır. Lazer veya kalem açıkken içerikle etkileşmek için önce aracı kapatın." }] }));
legacy.unshift({
  id: "para-dedigin-sey", title: "Para Dediğin Şey",
  description: "Paranın doğası, değeri ve hayatımızdaki yeri üzerine videolu sunum.",
  cover: "/sunumlar/para-dedigin-sey/media/slide-01.jpg",
  label: "VİDEOLU SUNUM", meta: "55 slayt · 19 video",
  url: "/sunumlar/para-dedigin-sey/",
  manifestURL: "/sunumlar/para-dedigin-sey/project.json",
  legacy: true, kind: "media"
});
legacy.unshift(...v2Projects);
legacy.unshift({
  "id": "bu-salonda-28-girisim-var",
  "title": "Bu Salonda 28 Girişim Var",
  "description": "Dert, deney ve değer üzerinden girişimcilik; 28 fikir kartı, iki kısa film ve adım adım ilerleyen etkileşimli sunum.",
  "cover": "/sunumlar/bu-salonda-28-girisim-var/kapak.jpg",
  "label": "ETKİLEŞİMLİ SUNUM",
  "meta": "14 sahne · 28 fikir · 2 film",
  "url": "/sunumlar/bu-salonda-28-girisim-var/",
  "kind": "web",
  "legacy": true,
  "manifestURL": "/sunumlar/bu-salonda-28-girisim-var/project.json"
});
const demo = { id: "sahne-denemesi", title: "Sahne denemesi", description: "Sunum araçlarını tanıyın.", slides: [
  { id: "d1", type: "html", title: "Sahne sizin.", heading: "Sahne sizin.", body: "Bir fikir, bir hikâye, bir sonraki adım.", bullets: ["Ok tuşu veya boşluk ile bir sonraki adımı gösterin.", "L tuşuyla lazer işaretçiyi açın.", "F tuşuyla tam ekrana geçin."], notes: "Bu bir araç tanıtımıdır. Maddeler birer birer görünür. Sağ okla deneyin." },
  { id: "d2", type: "html", title: "Anlatırken işaretleyin.", heading: "Dikkati istediğiniz yere taşıyın.", body: "İşaretlemek, çizmek ve duraklamak da anlatımın bir parçası.", bullets: ["P: kalem · E: çizimleri temizle", "B: ekranı karart · N: konuşmacı notları", "R: slaydı yeniden başlat"], notes: "Bu slaytta kalemi açıp bir işaret çizin. Karartmayı ve not panelini deneyin." },
  { id: "d3", type: "html", title: "Her proje kendi alanında.", heading: "Hazır olduğunuzda başlayın.", body: "Görselleri, videoları veya mevcut web sunumunuzu ekleyin.", bullets: [], notes: "Çıkış için Escape veya üstteki kapatma düğmesini kullanın." }
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
    throw Error("Sunucuya ulaşılamadı. Bağlantınızı kontrol edin.");
  }
  if (!r.ok) throw Error(data.error || "İşlem tamamlanamadı.");
  return data;
}
async function loadStatus() {
  try {
    status = await api("status");
    $("#storage-status").textContent = status.storageReady ? "Medya deposu bağlı" : "Medya deposu bekleniyor";
    $("#login-button").textContent = status.authenticated ? "Yönetici · Çıkış yap" : "Yönetici girişi";
    $("#service-message").hidden = status.storageReady;
    if (!status.storageReady) $("#service-message").textContent = "Mevcut sunumlar hazır. Yeni dosyaları kalıcı olarak yayımlamak için medya deposunun bağlanması gerekiyor. Bu sırada proje hazırlayabilir ve bu oturumda önizleyebilirsiniz.";
    if (status.storageReady) await loadProjects();
  } catch (e) {
    $("#storage-status").textContent = "Çevrimdışı / sunucuya erişilemiyor";
    $("#service-message").hidden = false;
    $("#service-message").textContent = "Sunucuya bağlanılamadı. Mevcut sunumlara erişebilir, yeni bir projeyi bu oturumda hazırlayıp önizleyebilirsiniz.";
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
    art.append(txt("span", p.label || "SUNUM PROJESİ", "card-tag"));
    const play = txt("button", "▷", "card-play");
    play.setAttribute("aria-label", `${p.title} sunumunu başlat`);
    play.onclick = () => launch(p);
    art.append(play);
    const body = txt("div", "", "card-body");
    body.append(txt("h3", p.title), txt("p", p.description || "Sunum projesi"));
    const footer = txt("div", "", "card-footer");
    footer.append(txt("span", p.meta || `${p.slideCount || p.slides?.length || 0} slayt`));
    const actions = txt("div", "", "card-actions");
    const share = txt("button", "↗", "text-button");
    share.setAttribute("aria-label", `${p.title} bağlantısını kopyala`);
    share.onclick = () => copyLink(p.id);
    actions.append(share);
    if (p.legacy) {
      const link = txt("a", "Projeyi aç →", "source-link");
      link.href = p.url;
      actions.append(link);
    } else if (status.authenticated) {
      const edit = txt("button", "Düzenle", "text-button");
      edit.onclick = () => editProject(p.id);
      actions.append(edit);
      const archive = txt("button", "Arşivle", "text-button");
      archive.onclick = async () => {
        if (!await askConfirm("Bu sunum listeden kaldırılsın mı? Dosyaları korunur.", "Arşivle")) return;
        try {
          await api("archive", { id: p.id });
          await loadProjects();
          toast("Sunum arşivlendi.");
        } catch (e) {
          toast(e.message);
        }
      };
      actions.append(archive);
    } else {
      const start = txt("button", "Sun →", "text-button");
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
  if (p.manifestURL) {
    const response = await fetch(p.manifestURL);
    if (!response.ok) throw Error("Sunum dosyası açılamadı.");
    return response.json();
  }
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
    toast("Sunum bağlantısı kopyalandı.");
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
  $("#editor-title").textContent = project ? "Sunumu düzenle" : "Yeni sunum";
  $("#save-state").textContent = project ? "Son kaydedilen sürüm" : "Henüz kaydedilmedi";
  updateEditorNotice();
  renderSlides();
  $("#editor").showModal();
}
function updateEditorNotice() {
  const el = $("#editor-notice");
  el.textContent = !status.storageReady ? "Medya deposu henüz bağlı değil. Dosyalar bu oturumda önizlenir; sayfa kapatılırsa yerel dosyalar yeniden seçilmelidir." : !status.authenticated ? "Dosyaları kalıcı yüklemek ve projeyi yayımlamak için yönetici girişi yapın." : "Kaydet ve yayımla ile proje bağlantısı erişilebilir olur. Yüklenen dosyalar bağlantıyı bilen herkes tarafından görüntülenebilir.";
  if (!status.authenticated) {
    const login = txt("button", "Yönetici girişi", "text-button");
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
  $("#save-state").textContent = "Kaydedilmemiş değişiklikler";
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
    const thumb = s.type === "image" ? document.createElement("img") : txt("div", { video: "▷", html: "T", embed: "↗" }[s.type] || "▤");
    thumb.className = "slide-thumb";
    if (s.type === "image") {
      thumb.src = s.src;
      thumb.alt = "";
      thumb.loading = "lazy";
    }
    li.append(thumb);
    const fields = txt("div", "", "slide-fields");
    const title = field("Slayt başlığı", s.title, (v) => s.title = v, { maxLength: 200 });
    title.classList.add("wide");
    fields.append(title);
    if (s.type === "html" && !s.src) {
      const head = field("Ekrandaki başlık", s.heading, (v) => s.heading = v, { maxLength: 500 });
      head.classList.add("wide");
      const body = field("Açıklama", s.body, (v) => s.body = v, { multiline: true, maxLength: 5e3 });
      body.classList.add("wide");
      const bullets = field("Adım adım açılan maddeler (her satıra bir madde)", (s.bullets || []).join("\n"), (v) => s.bullets = v.split("\n").filter(Boolean), { multiline: true, maxLength: 1e4 });
      bullets.classList.add("wide");
      fields.append(head, body, bullets);
    }
    if (s.type === "video") {
      fields.append(field("Başlangıç (saniye)", s.start || 0, (v) => s.start = Number(v), { type: "number" }), field("Bitiş (boşsa sonuna kadar)", s.end ?? "", (v) => s.end = v === "" ? void 0 : Number(v), { type: "number" }));
    }
    const notes = field("Konuşmacı notu", s.notes || "", (v) => s.notes = v, { multiline: true, maxLength: 1e4 });
    notes.classList.add("wide");
    fields.append(notes);
    li.append(fields);
    const acts = txt("div", "", "slide-actions");
    for (const [label, icon, fn, disabled] of [["Yukarı taşı", "↑", () => move(i, -1), i === 0], ["Aşağı taşı", "↓", () => move(i, 1), i === draft.slides.length - 1], ["Slaydı çoğalt", "⧉", () => {
      draft.slides.splice(i + 1, 0, { ...structuredClone(s), id: crypto.randomUUID() });
      if (editorFiles.has(s.id)) editorFiles.set(draft.slides[i + 1].id, editorFiles.get(s.id));
      changed();
      renderSlides();
    }, false], ["Slaydı kaldır", "×", () => {
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
    const a = txt("a", "Kaynak dosyası ↗");
    a.href = draft.sourceUrl;
    a.target = "_blank";
    a.rel = "noopener";
    $("#source-info").append(a);
  }
  if (editorFiles.has("source")) $("#source-info").append(txt("span", " Kaynak dosyası: " + editorFiles.get("source").name + " · henüz yüklenmedi"));
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
      toast(`${f.name}: bu biçim slayt olarak desteklenmiyor.`);
      continue;
    }
    if (status.maxFileBytes && f.size > status.maxFileBytes) {
      toast(`${f.name}: tek dosya sınırını aşıyor.`);
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
  if (u.username || u.password || !["https:"].includes(u.protocol) && !(u.origin === location.origin && u.pathname.startsWith("/sunumlar/"))) throw Error("HTTPS bağlantısı veya bu sitedeki bir sunum adresi kullanın.");
  if (["embed", "html"].includes(type)) {
    const trusted = u.origin === location.origin && u.pathname.startsWith("/sunumlar/");
    const ms = /^(?:view\.officeapps\.live\.com|onedrive\.live\.com|1drv\.ms|(?:[a-z0-9-]+\.)+officeapps\.live\.com|(?:[a-z0-9-]+\.)+sharepoint\.com|docs\.google\.com)$/.test(u.hostname);
    if (!trusted && !ms) throw Error("Bu içerik için sitedeki bir HTML sunumu veya Microsoft / Google Slides gömme bağlantısı kullanın.");
  }
  return u.origin === location.origin ? u.pathname + u.search + u.hash : u.href;
}
function validateDraft(p) {
  if (!p.title) throw Error("Sunuma bir ad verin.");
  if (!p.slides.length) throw Error("En az bir slayt ekleyin.");
  for (const s of p.slides) {
    if (s.type === "video" && s.end !== void 0 && Number(s.end) <= Number(s.start || 0)) throw Error("Video bitişi başlangıçtan sonra olmalı.");
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
    if (!status.storageReady) throw Error("Önce medya deposu bağlanmalı.");
    uploading = true;
    lockEditor(true);
    updateEditorNotice();
    $("#save-state").textContent = "Kaydediliyor…";
    if (editorFiles.size) await uploadFiles();
    const result = await api("save", { project: draft });
    draft = result.project || draft;
    dirty = false;
    $("#save-state").textContent = "Yayımlandı · değişiklikler kaydedildi";
    toast("Sunum yayımlandı. Bağlantısı proje kartında.");
    await loadProjects();
  } catch (e) {
    $("#save-state").textContent = "Kaydedilemedi";
    toast(e.name === "AbortError" ? "Yükleme iptal edildi. Dosyalar bu oturumda duruyor." : e.message);
  } finally {
    uploading = false;
    lockEditor(false);
    $("#upload-status").hidden = true;
    updateEditorNotice();
  }
}
const lockedControls = /* @__PURE__ */ new Map();
function lockEditor(locked) {
  $$("#editor .editor-body input, #editor .editor-body textarea, #editor .editor-body button, #preview-project, #export-json").forEach((el) => {
    if (el.id === "cancel-upload") return;
    if (locked) {
      if (!lockedControls.has(el)) lockedControls.set(el, el.disabled);
      el.disabled = true;
    } else if (lockedControls.has(el)) {
      el.disabled = lockedControls.get(el);
    }
  });
  if (!locked) lockedControls.clear();
}
async function uploadFiles() {
  const { upload } = await import("./vendor/blob-client.js");
  uploadAbort = new AbortController();
  $("#upload-status").hidden = false;
  let done = 0;
  const uploaded = /* @__PURE__ */ new Map();
  const total = new Set(editorFiles.values()).size;
  for (const [id, file] of [...editorFiles]) {
    if (uploadAbort.signal.aborted) throw new DOMException("İptal", "AbortError");
    const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "-").slice(-140);
    const path = `sunumlar/media/${draft.id}/${crypto.randomUUID()}-${safe}`;
    let blob = uploaded.get(file);
    if (!blob) {
      blob = await upload(path, file, { access: "public", handleUploadUrl: API + "?action=upload", multipart: true, clientPayload: JSON.stringify({ projectId: draft.id }), abortSignal: uploadAbort.signal, onUploadProgress: ({ percentage }) => {
        $("#upload-progress").value = percentage;
        $("#upload-label").textContent = `${done + 1} / ${total} · ${file.name} · %${Math.round(percentage)}`;
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
    if (editorFiles.size || draft.slides.some((s) => s.src?.startsWith("blob:"))) throw Error("Dosyaları içeren taşınabilir proje için önce yükleyip kaydedin. Yerel dosya bağlantıları başka oturumda çalışmaz.");
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
    if (file.size > 2 * 1024 * 1024) throw Error("Proje tanımı en fazla 2 MB olabilir; medya dosyalarını ayrı ekleyin.");
    const p = JSON.parse(await file.text());
    if (typeof p.title !== "string" || !Array.isArray(p.slides) || p.slides.length > 5e3) throw Error("Geçerli bir proje dosyası seçin.");
    for (const s of p.slides) {
      if (!["image", "video", "html", "embed"].includes(s.type)) throw Error("Desteklenmeyen slayt türü.");
      if (s.src) s.src = safeUrl(s.src, s.type);
      if (s.bullets && (!Array.isArray(s.bullets) || !s.bullets.every((v) => typeof v === "string"))) throw Error("Maddeler metin olmalıdır.");
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
    toast("İçe aktarılamadı: " + e.message);
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
    toast("Yüklemeyi iptal edin veya tamamlanmasını bekleyin.");
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
  draft.slides.push({ id: crypto.randomUUID(), type: "html", title: "Yeni slayt", heading: "Başlığınız", body: "", bullets: [], notes: "" });
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
    draft.slides.push({ id: crypto.randomUUID(), type, src, title: $("#url-title").value.trim() || "Bağlantıdan slayt", notes: "" });
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
    toast("Kaynak dosya eklendi. Sunmak için görsel/video slayt veya web bağlantısı da ekleyin.");
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
      toast("Çıkış yapıldı.");
    } catch (e) {
      toast(e.message);
    }
  } else {
    $("#login-error").textContent = status.authReady ? "" : "Sunucuda yönetici şifresi yapılandırılmamış olabilir.";
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
    toast("Yönetici girişi yapıldı.");
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
  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    dialog.className = "small-dialog";
    dialog.setAttribute("aria-label", "Değişiklikleri onayla");
    dialog.append(txt("p", message));
    const actions = txt("div", "", "hero-actions");
    const cancel = txt("button", "Vazgeç", "secondary");
    const yes = txt("button", label, "primary");
    const finish = (result) => {
      dialog.close();
      dialog.remove();
      resolve(result);
    };
    cancel.onclick = () => finish(false);
    yes.onclick = () => finish(true);
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      finish(false);
    });
    actions.append(cancel, yes);
    dialog.append(actions);
    document.body.append(dialog);
    dialog.showModal();
    cancel.focus();
  });
}
