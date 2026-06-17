/* iho-oyunlar icons.js
   Tüm oyunlarda kelime kartlarındaki emojileri kaliteli resim ile değiştirir.
   Otomatik çalışır: <script src="shared/icons.js"> include et, gerisi self-running.
*/
(function(){
  // emoji → dosya adı (img/kelime/XX-name.webp)
  const MAP = {
    "🍞":"01-ekmek","🧀":"02-peynir","🍚":"03-pilav","🍗":"04-tavuk",
    "🫒":"05-zeytin","🥩":"06-et","🍯":"07-bal","🐟":"08-balik",
    "🥚":"09-yumurta","🧆":"10-kofte","🍲":"11-corba","🧈":"12-tereyag",
    "🍵":"13-cay","💧":"14-su","🥛":"15-sut","🧃":"16-meyvesuyu",
    "☕":"17-kahve","☕️":"17-kahve","🍴":"18-catal","🥤":"19-bardak",
    "🍽":"20-tabak","🍽️":"20-tabak","🍳":"21-omlet","🔪":"22-bicak",
    "🥄":"23-kasik","🍎":"24-elma","🍌":"25-muz","🌅":"26-sabah",
    "☀":"27-gunes","☀️":"27-gunes","🌤":"28-ogle","🌤️":"28-ogle",
    "🌆":"29-aksam","🌙":"30-gece","🌄":"31-fecr","🕌":"32-cami",
    "🏠":"33-ev","🏫":"34-okul","👔":"35-kiyafet","😴":"36-uyku",
    "🚶":"37-yurumek","🤝":"38-yardim"
  };

  // Görseller /7sinif/oyunlar/img/kelime/ altında tek kaynak olarak duruyor.
  // Bu klasörün kendi img/ kopyası yok; absolute path ile referansla.
  const BASE = "/7sinif/oyunlar/img/kelime/";

  // Escape for regex, build alternation from longest first (variation selectors first).
  const keys = Object.keys(MAP).sort((a,b) => b.length - a.length);
  const RE = new RegExp(keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|"), "g");

  function imgTag(emoji){
    const name = MAP[emoji];
    return `<img src="${BASE}${name}.webp" class="kelime-ikon" alt="" loading="lazy" decoding="async">`;
  }

  // Inject CSS once
  const css = document.createElement("style");
  css.textContent = `img.kelime-ikon{width:1em;height:1em;vertical-align:-0.2em;display:inline-block;object-fit:contain;line-height:1}
  .kelime-ikon-block{width:auto;height:auto;max-width:100%;max-height:100%;display:block;margin:0 auto}`;
  document.head.appendChild(css);

  // Skip these tags entirely (avoid breaking input, style, script, etc.)
  const SKIP = new Set(["SCRIPT","STYLE","TEXTAREA","INPUT","IMG","SVG","CANVAS","NOSCRIPT","CODE","PRE"]);

  function processTextNode(node){
    const text = node.nodeValue;
    if (!text) return;
    RE.lastIndex = 0;
    if (!RE.test(text)) return;
    RE.lastIndex = 0;
    const html = text.replace(RE, imgTag);
    const span = document.createElement("span");
    span.innerHTML = html;
    // Replace text node with new fragment
    const parent = node.parentNode;
    while (span.firstChild) parent.insertBefore(span.firstChild, node);
    parent.removeChild(node);
  }

  function processNode(node){
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE){
      processTextNode(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (SKIP.has(node.tagName)) return;
    // Process children (snapshot since we mutate)
    const kids = Array.from(node.childNodes);
    for (const k of kids) processNode(k);
  }

  function run(){
    processNode(document.body);
    // Watch for dynamically inserted DOM (game render fns add cards)
    const mo = new MutationObserver(muts => {
      for (const m of muts){
        for (const n of m.addedNodes) processNode(n);
        // also handle changed character data
        if (m.type === "characterData") processTextNode(m.target);
      }
    });
    mo.observe(document.body, {childList: true, subtree: true, characterData: true});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
