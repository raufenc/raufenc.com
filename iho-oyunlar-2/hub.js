const data = window.IHO_UNIT2_DATA;
const hubMenu = document.getElementById("hubMenu");

const gameTypeNames = {
  flashcards: "Kelime kartı",
  matching: "Eşleştirme",
  category_sort: "Sınıflandırma",
  shopping_list: "Alışveriş listesi",
  price_quiz: "Fiyat oyunu",
  comparative_quiz: "Karşılaştırma",
  fill_blank: "Boşluk doldurma",
  sentence_order: "Cümle kurma",
  dialogue_order: "Diyalog sıralama",
  word_search: "Kelime avı",
  memory: "Hafıza",
  odd_one_out: "Farklı olan",
  multiple_choice: "Ünite testi",
  roleplay: "Rol oyunu",
  listening_select: "Dinle-seç"
};

const imageByType = {
  flashcards: "01-kelime.webp",
  matching: "06-hafiza.webp",
  category_sort: "11-sinif.webp",
  shopping_list: "24-pazar.webp",
  price_quiz: "30-cark.webp",
  comparative_quiz: "17-dogruyanlis.webp",
  fill_blank: "18-eksik.webp",
  sentence_order: "12-cumle.webp",
  dialogue_order: "05-dialog.webp",
  word_search: "10-karisik.webp",
  memory: "06-hafiza.webp",
  odd_one_out: "13-vur.webp",
  multiple_choice: "16-yaris.webp",
  roleplay: "19-kimben.webp",
  listening_select: "28-nisanci.webp"
};

const pageByGame = {
  g001_flashcards_core: "games/g001-kelime-kartlari.html",
  g002_match_grocery: "games/g002-bakkal-eslestir.html",
  g003_sort_fruit_vegetable: "games/g003-meyve-sebze.html",
  g004_shopping_list_basic: "games/g004-alisveris-listesi.html",
  g005_price_quiz: "games/g005-fiyat-sorulari.html",
  g006_comparison_price: "games/g006-karsilastirma.html",
  g007_fill_blanks_core: "games/g007-bosluk-doldur.html",
  g008_sentence_order: "games/g008-cumle-kur.html",
  g009_dialogue_order_souq: "games/g009-pazar-diyalog.html",
  g010_dialogue_order_baqala: "games/g010-bakkal-diyalog.html",
  g011_word_search: "games/g011-kelime-avi.html",
  g012_memory_vocab: "games/g012-hafiza.html",
  g013_odd_one_out: "games/g013-farkli-olan.html",
  g014_multiple_choice: "games/g014-unite-testi.html",
  g015_roleplay_market: "games/g015-rol-oyna.html",
  g016_listening_select_placeholder: "games/g016-dinle-sec.html"
};

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  });
  (Array.isArray(children) ? children : [children]).forEach(child => {
    if (child) node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  });
  return node;
}

data.games.forEach((game, index) => {
  const card = el("a", { class: "hub-card", href: pageByGame[game.id] }, [
    el("img", { src: `img/hub/${imageByType[game.type] || "01-kelime.webp"}`, alt: "", loading: "lazy" }),
    el("span", { class: "hub-number", text: String(index + 1).padStart(2, "0") }),
    el("strong", { text: game.title_tr }),
    el("span", { class: "hub-ar", text: game.title_ar }),
    el("small", { text: gameTypeNames[game.type] || game.type })
  ]);
  hubMenu.appendChild(card);
});
