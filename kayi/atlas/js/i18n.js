/* ============================================================
   Kayı Tarih Atlası — İki Dilli Arayüz (TR/EN)
   ============================================================ */

let currentLang = 'tr';

const UI_STRINGS = {
  // Header
  "site.title":       { tr: "Kayı Tarih Atlası",                en: "Kayı Historical Atlas" },
  "site.subtitle":    { tr: "Osmanlı Kuruluş Dönemi (1258–1421)", en: "Ottoman Founding Period (1258–1421)" },

  // Sidebar
  "filter.period":    { tr: "Dönem",           en: "Period" },
  "filter.category":  { tr: "Kategori",        en: "Category" },
  "filter.layers":    { tr: "Katmanlar",        en: "Layers" },
  "filter.all":       { tr: "Tümü",             en: "All" },

  // Layers
  "layer.cities":     { tr: "Şehirler",         en: "Cities" },
  "layer.battles":    { tr: "Savaşlar",          en: "Battles" },
  "layer.routes":     { tr: "Güzergâhlar",       en: "Routes" },
  "layer.boundaries": { tr: "Sınırlar",          en: "Boundaries" },

  // Panel
  "panel.historical": { tr: "Tarihî İsimler",   en: "Historical Names" },
  "panel.modern":     { tr: "Modern İsim",       en: "Modern Name" },
  "panel.country":    { tr: "Ülke",              en: "Country" },
  "panel.period":     { tr: "Dönem",             en: "Period" },
  "panel.year":       { tr: "Yıl",               en: "Year" },
  "panel.significance":{ tr: "Tarihî Önemi",     en: "Historical Significance" },
  "panel.coordinates":{ tr: "Koordinatlar",      en: "Coordinates" },
  "panel.events":     { tr: "İlgili Olaylar",    en: "Related Events" },
  "panel.close":      { tr: "Kapat",             en: "Close" },

  // Timeline
  "timeline.play":    { tr: "Oynat",             en: "Play" },
  "timeline.pause":   { tr: "Durdur",            en: "Pause" },
  "timeline.reset":   { tr: "Sıfırla",           en: "Reset" },

  // Events panel
  "events.title":     { tr: "Olaylar",            en: "Events" },
  "events.battles":   { tr: "Savaşlar",           en: "Battles" },
  "events.conquests": { tr: "Fetihler",           en: "Conquests" },
  "events.political": { tr: "Siyasî Olaylar",    en: "Political Events" },

  // Sultans
  "sultans.title":    { tr: "Padişahlar",         en: "Sultans" },
  "sultans.reign":    { tr: "Saltanat",            en: "Reign" },
  "sultans.capital":  { tr: "Başkent",             en: "Capital" },

  // Stats
  "stats.locations":  { tr: "Konum",              en: "Locations" },
  "stats.battles":    { tr: "Muharebe",            en: "Battles" },
  "stats.years":      { tr: "Yıl",                en: "Years" },

  // Misc
  "lang.switch":      { tr: "English",            en: "Türkçe" },
  "theme.toggle":     { tr: "Tema Değiştir",      en: "Toggle Theme" },
  "back":             { tr: "← Ana Sayfa",        en: "← Home" },
  "search.placeholder":{ tr: "Konum ara...",       en: "Search location..." },
  "no.results":       { tr: "Sonuç bulunamadı",   en: "No results found" },
  "loading":          { tr: "Yükleniyor...",       en: "Loading..." }
};

function t(key) {
  const entry = UI_STRINGS[key];
  if (!entry) return key;
  return entry[currentLang] || entry['tr'] || key;
}

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('atlas-lang', lang);

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  // Update all [data-i18n-placeholder] elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Dispatch custom event for app.js to react
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function toggleLang() {
  setLang(currentLang === 'tr' ? 'en' : 'tr');
}

// Initialize from localStorage
(function() {
  const saved = localStorage.getItem('atlas-lang');
  if (saved && (saved === 'tr' || saved === 'en')) {
    currentLang = saved;
  }
})();
