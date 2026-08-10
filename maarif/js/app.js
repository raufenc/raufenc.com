/* app.js - Router + sayfa yonetimi + ana shell */
(function(){
  const APP = document.getElementById('app');

  // Helpers
  function getFamilyClass(family) {
    if (!family) return 'fam-model';
    const f = family.toLowerCase();
    if (f.includes('erdem') || f.includes('değer')) return 'fam-deger';
    if (f.includes('kavramsal')) return 'fam-beceri';
    if (f.includes('eğilim')) return 'fam-egilim';
    if (f.includes('alan') || f.includes('türkçe') || f.includes('matematik') || f.includes('fen') || f.includes('sosyal bilim') || f.includes('sanat') || f.includes('beden') || f.includes('bilişim') || f.includes('tasarım') || f.includes('din') || f.includes('yabancı')) return 'fam-alan';
    if (f.includes('sosyal-duygusal') || f.includes('sdb')) return 'fam-sdb';
    if (f.includes('okuryazarlık')) return 'fam-okur';
    if (f.includes('profil')) return 'fam-profil';
    if (f.includes('model') || f.includes('bileşen')) return 'fam-model';
    if (f.includes('farklılaştırma')) return 'fam-farkli';
    if (f.includes('öğrenme')) return 'fam-ogrenme';
    return 'fam-model';
  }

  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ]+/gi, '-').replace(/-+/g,'-').replace(/^-|-$/g,'');
  }

  function findConcept(id) {
    return DATA.concepts.find(c => c.id === id || c.code === id || slugify(c.term) === id);
  }

  function getRefsForConcept(concept) {
    if (!concept) return [];
    return DATA.references.filter(r => r.pc === concept.code || r.code.startsWith(concept.code + '.'));
  }

  function groupBy(arr, key) {
    const map = {};
    arr.forEach(item => {
      const k = item[key] || 'Diğer';
      if (!map[k]) map[k] = [];
      map[k].push(item);
    });
    return map;
  }

  function getConceptsByFamily(family) {
    return DATA.concepts.filter(c => c.family === family);
  }

  function getAllFamilies() {
    const fams = {};
    DATA.concepts.forEach(c => { fams[c.family] = (fams[c.family]||0)+1; });
    return Object.entries(fams).sort((a,b) => b[1]-a[1]);
  }

  // Make helpers global for pages/games
  window.H = { getFamilyClass, slugify, findConcept, getRefsForConcept, groupBy, getConceptsByFamily, getAllFamilies };

  // Router
  function getRoute() {
    const hash = location.hash.replace('#','') || '/';
    const parts = hash.split('/').filter(Boolean);
    return { path: hash, parts };
  }

  function navigate(hash) {
    location.hash = hash;
  }

  function render() {
    const { path, parts } = getRoute();
    const route = '/' + (parts[0] || '');
    APP.innerHTML = '';
    APP.className = 'fade-in';
    window.scrollTo(0, 0);

    // Update active nav
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + path || a.getAttribute('href') === '#' + route);
    });

    // Close mobile nav
    document.getElementById('navLinks').classList.remove('open');
    const tgl = document.getElementById('navToggle');
    tgl.setAttribute('aria-expanded', 'false');
    tgl.setAttribute('aria-label', 'Menüyü aç');

    Store.setLastRoute(path);

    try {
      switch(route) {
        case '/': Pages.home(APP); injectRehberCard(APP); break;
        case '/kavramlar': Pages.kavramlar(APP); break;
        case '/kavram': Pages.kavramDetay(APP, parts[1]); break;
        case '/beceriler': Pages.beceriler(APP); break;
        case '/degerler': Pages.degerler(APP); break;
        case '/ogrenci-profili': Pages.ogrenciProfili(APP); break;
        case '/okuryazarlik': Pages.okuryazarlik(APP); break;
        case '/harita': Pages.harita(APP); break;
        case '/arama': Pages.arama(APP, parts[1]); break;
        case '/oyunlar': Pages.oyunlar(APP); break;
        case '/oyun': Games.start(APP, parts[1]); break;
        case '/quiz': Pages.quiz(APP, parts[1]); break;
        case '/karsilastir': Pages.karsilastir(APP, parts[1], parts[2]); break;
        case '/kaynak': Pages.kaynak(APP, parts[1]); break;
        case '/profil': Pages.profil(APP); break;
        case '/rehber': Rehber.render(APP, parts); break;
        default: Pages.notFound(APP);
      }
    } catch(e) {
      console.error('Route error:', e);
      APP.innerHTML = `<div class="empty-state"><span class="es-icon">${ICO('alert')}</span><p class="es-text">Bir hata oluştu. <a href="#/">Ana sayfaya dön</a></p></div>`;
    }
  }

  // Init
  window.addEventListener('hashchange', render);
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  });

  /* Tema — site genelindeki 'rauf-theme' anahtarını paylaşır.
     İlk uygulama <head> içindeki önyükleme betiğinde yapılır (yanıp sönmeyi önlemek için). */
  const themeBtn = document.getElementById('themeToggle');
  function paintThemeBtn() {
    const dark = document.documentElement.classList.contains('dark');
    themeBtn.innerHTML = ICO(dark ? 'sun' : 'moon');
    themeBtn.setAttribute('aria-label', dark ? 'Gündüz moduna geç' : 'Gece moduna geç');
    themeBtn.setAttribute('data-label', dark ? 'Gündüz modu' : 'Gece modu');
  }
  themeBtn.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('rauf-theme', dark ? 'dark' : 'light'); } catch(e) {}
    paintThemeBtn();
  });
  paintThemeBtn();

  // Build search index lazily
  setTimeout(() => Search.buildIndex(), 100);

  // First render
  if (!location.hash) location.hash = '#/';
  render();

  function injectRehberCard(app) {
    const statsRow = app.querySelector('.stats-row');
    if (!statsRow) return;
    const card = document.createElement('a');
    card.href = '#/rehber';
    card.className = 'rehber-promo';
    card.innerHTML = `
      <div class="rehber-promo-top">
        <span class="rehber-promo-icon">${ICO('bookOpen')}</span>
        <div style="flex:1;min-width:0">
          <div class="rehber-promo-title">Program Rehberim</div>
          <div class="rehber-promo-sub">Öğretmen el kitabı — haftalık plan, ders akışı, materyaller ve ölçme araçları</div>
        </div>
        <span class="rehber-promo-arrow">${ICO('arrowRight')}</span>
      </div>
      <div class="rehber-promo-bottom">
        <span>${ICO('calendar')} Haftalık Plan</span>
        <span>${ICO('list')} Ders Akışı</span>
        <span>${ICO('package')} Materyaller</span>
        <span>${ICO('tool')} Teknikler</span>
        <span>${ICO('chart')} Ölçme</span>
      </div>`;
    statsRow.after(card);
  }

  window.navigate = navigate;
})();
