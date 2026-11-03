const SCHEMA = 'iyilik-progress-1';
const MAX_BACKUP_BYTES = 1000000;
const objectMap = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const timestamp = value => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const discovered = value => value === true || (timestamp(value) && value > 0);
const pad = value => String(value).padStart(2, '0');

function cleanState(value, known, strict = false) {
  if (!objectMap(value)) throw new Error('state');
  const clean = { completed: {}, tasks: {}, last: null, visits: {} };
  for (const key of ['completed', 'tasks', 'visits']) {
    const map = value[key];
    if (map === undefined) continue;
    if (!objectMap(map)) {
      if (strict) throw new Error(key);
      continue;
    }
    for (const [id, entry] of Object.entries(map)) {
      if (!known.has(id)) continue;
      if (key === 'completed') {
        if (typeof entry !== 'boolean' && !timestamp(entry)) {
          if (strict) throw new Error(key);
          continue;
        }
        if (discovered(entry)) clean.completed[id] = entry;
      } else if (key === 'tasks') {
        if (typeof entry !== 'boolean') {
          if (strict) throw new Error(key);
          continue;
        }
        clean.tasks[id] = entry;
      } else {
        if (!timestamp(entry)) {
          if (strict) throw new Error(key);
          continue;
        }
        clean.visits[id] = entry;
      }
    }
  }
  if (value.last !== undefined && value.last !== null && typeof value.last !== 'string' && strict) {
    throw new Error('last');
  }
  if (known.has(value.last)) clean.last = value.last;
  return clean;
}

function parseBackup(text, known) {
  const data = JSON.parse(text);
  if (!objectMap(data) || data.schema !== SCHEMA || !objectMap(data.state)) throw new Error('schema');
  // Validate the entire incoming record before changing the live state.
  return cleanState(data.state, known, true);
}

function mergeState(current, incoming, known) {
  const next = cleanState(current, known);
  for (const [id, value] of Object.entries(incoming.completed)) {
    const previous = next.completed[id];
    next.completed[id] = typeof previous === 'number' && typeof value === 'number'
      ? Math.max(previous, value)
      : typeof previous === 'number' ? previous : value;
  }
  Object.assign(next.tasks, incoming.tasks);
  for (const [id, value] of Object.entries(incoming.visits)) {
    next.visits[id] = Math.max(next.visits[id] || 0, value);
  }
  if (incoming.last) next.last = incoming.last;
  return next;
}

function downloadProgress(state) {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ schema: SCHEMA, state }, null, 2)], {
    type: 'application/json'
  }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'iyilik-ilerlemem.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function renderPassport(c) {
  const { books, lessons, state, e, icon } = c;
  const known = new Set(lessons.map(lesson => lesson.id));
  const snapshot = cleanState(state, known);
  const total = lessons.length;
  const complete = lessons.filter(lesson => discovered(snapshot.completed[lesson.id]));
  const last = c.getLesson(snapshot.last);
  const lastBook = last && books.find(book => book.id === last.book);

  c.setMain(`<div class="passport-page">
    <header class="passport-header">
      <div class="passport-heading">
        <p class="passport-kicker">İYİLİKLERLE BÜYÜYORUM · KİŞİSEL KEŞİF DEFTERİ</p>
        <h1 class="passport-title">Her keşif,<br><em>yeni bir sayfa.</em></h1>
        <p class="passport-intro">Öğrendiklerini burada biriktir. Bir damgaya dokun, merak ettiğin konuya dön. Bu yolculukta kendi hızınla ilerleyebilirsin.</p>
      </div>
      <div class="passport-seal" aria-label="${complete.length} konunun soruları tamamlandı; toplam ${total} konu">
        <span class="passport-seal-top">KEŞİF DEFTERİM</span>
        <strong class="passport-seal-count">${pad(complete.length)}<span> / ${total}</span></strong>
        <span class="passport-seal-bottom">KONU KEŞFEDİLDİ</span>
        <span class="passport-seal-mark" aria-hidden="true">${icon('leaf')}</span>
      </div>
    </header>

    <a class="passport-bookmark" href="${last ? `#ders/${e(last.id)}` : '#konular'}">
      <span class="passport-bookmark-icon" aria-hidden="true">${icon(last ? 'book' : 'arrow')}</span>
      <span class="passport-bookmark-copy">
        <span class="passport-kicker">${last ? 'KALDIĞIN YERDEN DEVAM' : 'DEFTERİNİ İLK KEŞFİNLE AÇ'}</span>
        <strong>${last ? e(last.title) : 'Bugün neyi merak ediyorsun?'}</strong>
        <span>${last ? `${e(lastBook?.short || '')} · Kitapta s. ${e(last.pages.join('–'))}` : 'Üç kitaptaki konulara göz at, ilgini çekeni seç.'}</span>
      </span>
      <span class="passport-bookmark-arrow" aria-hidden="true">${icon('arrow')}</span>
    </a>

    <div class="passport-guide">
      <p>Bir konunun üç sorusunu açıklamalarıyla tamamladığında damgası belirginleşir. Damgalar yalnızca keşfettiğin konuları hatırlatır; iyilik ve ibadet puanı değildir.</p>
      <div class="passport-legend" aria-label="Damga açıklamaları">
        <span><span class="passport-legend-mark passport-legend-mark--done" aria-hidden="true">${icon('check')}</span>Keşfedildi</span>
        <span><span class="passport-legend-mark" aria-hidden="true"></span>Keşfedilmeyi bekliyor</span>
      </div>
    </div>

    <div class="passport-books">
      ${books.map(book => {
        const chapters = lessons.filter(lesson => lesson.book === book.id).sort((a, b) => a.n - b.n);
        const completed = chapters.filter(lesson => discovered(snapshot.completed[lesson.id])).length;
        return `<section class="passport-book passport-book--${book.id}" aria-labelledby="passport-book-title-${book.id}">
          <div class="passport-book-intro">
            <a class="passport-cover" href="#kitap/${book.id}" aria-label="${e(book.title)} kitabındaki konuları aç">
              <img src="assets/book${book.id}.webp" alt="${e(book.title)} kitap kapağı" loading="lazy" width="180" height="240">
            </a>
            <div class="passport-book-meta">
              <p class="passport-kicker">${pad(book.id)}. KİTAP</p>
              <h2 class="passport-book-title" id="passport-book-title-${book.id}">${e(book.short)}</h2>
              <p class="passport-book-subtitle">${e(book.title)}</p>
              <div class="passport-book-count"><strong>${completed}</strong><span>/ ${chapters.length} konu keşfedildi</span></div>
              <div class="passport-progress" role="progressbar" aria-label="${e(book.short)} keşfedilen konular" aria-valuemin="0" aria-valuemax="${chapters.length}" aria-valuenow="${completed}">
                <span style="width:${chapters.length ? completed / chapters.length * 100 : 0}%"></span>
              </div>
              <a class="passport-book-link" href="#kitap/${book.id}">Kitabın konularına git ${icon('arrow')}</a>
            </div>
          </div>
          <div class="passport-sheet">
            <div class="passport-sheet-heading"><span>KEŞİF DAMGALARI</span><span>${pad(book.id)} / ${pad(books.length)}</span></div>
            <ol class="passport-stamps">
              ${chapters.map(lesson => {
                const done = discovered(snapshot.completed[lesson.id]);
                return `<li class="passport-stamp-item">
                  <a class="passport-stamp${done ? ' passport-stamp--done' : ''}${last?.id === lesson.id ? ' passport-stamp--last' : ''}" href="#ders/${e(lesson.id)}" aria-label="${lesson.n}. konu: ${e(lesson.title)}. ${done ? 'Keşfedildi' : 'Keşfedilmeyi bekliyor'}${last?.id === lesson.id ? '. Son açtığın konu' : ''}">
                    <span class="passport-stamp-ring" aria-hidden="true"><span>${pad(lesson.n)}</span>${done ? `<span class="passport-stamp-check">${icon('check')}</span>` : ''}</span>
                    <span class="passport-stamp-title">${e(lesson.title)}</span>
                    <span class="passport-stamp-page">s. ${e(lesson.pages.join('–'))}</span>
                  </a>
                </li>`;
              }).join('')}
            </ol>
            <p class="passport-sheet-note">${completed === chapters.length && chapters.length ? 'Bu kitabın bütün konularını keşfettin. Yeniden okumak için bir damga seç.' : 'Merak ettiğin konudan başlayabilirsin; sırayla ilerlemek zorunda değilsin.'}</p>
          </div>
        </section>`;
      }).join('')}
    </div>

    <section class="passport-backup" aria-labelledby="passport-backup-title">
      <div class="passport-backup-copy">
        <p class="passport-kicker">DEFTERİN SENİNLE GELSİN</p>
        <h2 class="passport-backup-title" id="passport-backup-title">Keşiflerini yanında taşı.</h2>
        <p>Defterin bu tarayıcıda saklanır. Başka bir cihazda devam etmek için yedeğini indir, yeni cihazında aç. Açtığın yedek mevcut keşiflerinle birleştirilir.</p>
        <p class="passport-backup-note">Boyamalar bu dosyaya dahil değildir. Onları boyama atölyesindeki PNG indir düğmesiyle ayrıca saklayabilirsin.</p>
      </div>
      <div class="passport-backup-actions">
        <button class="passport-button" type="button" id="passport-export">${icon('download')} Defterimi yedekle</button>
        <button class="passport-button passport-button--light" type="button" id="passport-import">${icon('book')} Yedeğimi aç</button>
        <input class="passport-file" type="file" accept=".json,application/json" id="passport-file" hidden>
        <span class="passport-backup-caption">İlerleme kaydı · JSON dosyası</span>
      </div>
    </section>
    <p class="passport-colophon">İYİLİKLERLE BÜYÜYORUM <span aria-hidden="true">·</span> KEŞFET, HATIRLA, YENİDEN DENE</p>
  </div>`);

  const root = document.querySelector('.passport-page');
  const fileInput = root.querySelector('#passport-file');
  const importButton = root.querySelector('#passport-import');
  root.querySelector('#passport-export').onclick = () => {
    try {
      downloadProgress(cleanState(c.state, known));
      c.toast('Keşif defterinin yedeği indirildi.');
    } catch {
      c.toast('Yedek indirilemedi. Lütfen yeniden dene.');
    }
  };
  importButton.onclick = () => fileInput.click();
  fileInput.onchange = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    importButton.disabled = true;
    importButton.setAttribute('aria-busy', 'true');
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new Error('size');
      const incoming = parseBackup(await file.text(), known);
      // Merge against the latest live state, even if it changed while reading.
      Object.assign(c.state, mergeState(c.state, incoming, known));
      c.save();
      c.updateProgress();
      if (root.isConnected) renderPassport(c);
      c.toast('İlerleme kaydın açıldı. Keşiflerin birleştirildi.');
    } catch {
      c.toast('Bu dosya geçerli bir ilerleme yedeği değil. Mevcut defterin korundu.');
    } finally {
      fileInput.value = '';
      importButton.disabled = false;
      importButton.removeAttribute('aria-busy');
    }
  };
}
