let currentPlayer;

const icons = {
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  prev: '<path d="m14 6-6 6 6 6"/>',
  next: '<path d="m10 6 6 6-6 6"/>',
  laser: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  pen: '<path d="m4 20 5-1L20 8l-4-4L5 15l-1 5ZM13 7l4 4"/>',
  erase: '<path d="m3 14 9-10 8 8-8 9H9l-6-7ZM7 10l8 8M12 21h9"/>',
  undo: '<path d="M8 5 3 10l5 5M3 10h11a6 6 0 0 1 0 12" transform="translate(0 -2)"/>',
  black: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 4v16"/>',
  full: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  notes: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8m-8 4h5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  replay: '<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3v.1"/>',
  play: '<path d="m8 4 12 8-12 8Z"/>',
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function iconButton(name, title, handler, visibleLabel = '') {
  const button = el('button', 'sp-button');
  button.type = 'button';
  button.title = title;
  button.setAttribute('aria-label', title);
  button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.help}</svg>`;
  if (visibleLabel) button.append(el('span', 'sp-button-label', visibleLabel));
  button.addEventListener('click', handler);
  return button;
}

function sourceURL(value, frame = false) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value, location.href);
    const sameOrigin = url.origin === location.origin;
    if (frame && sameOrigin && ['/sunumlar', '/sunumlar/', '/sunumlar/index.html'].includes(url.pathname)) return null;
    if (url.protocol === 'https:' || (sameOrigin && /^https?:$/.test(url.protocol))) return url;
    if (!frame && url.protocol === 'blob:') return url;
  } catch { /* Invalid media addresses show a readable error. */ }
  return null;
}

function trustedFrame(url) {
  const microsoft = url.protocol === 'https:' && (
    url.hostname === 'view.officeapps.live.com' ||
    url.hostname.endsWith('.officeapps.live.com') ||
    url.hostname === 'onedrive.live.com' ||
    url.hostname.endsWith('.sharepoint.com')
  );
  const google = url.protocol === 'https:' && url.hostname === 'docs.google.com';
  // HTML upload is disabled: these are deliberately deployed, trusted site modules.
  const local = url.origin === location.origin &&
    url.pathname.startsWith('/sunumlar/') &&
    !['/sunumlar/', '/sunumlar/index.html'].includes(url.pathname);
  return microsoft || google || local;
}

function ensureStyles() {
  const href = new URL('./player.css', import.meta.url).href;
  if (![...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href === href)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.append(link);
  }
}

/**
 * Open one project. Media is mounted only for the current slide.
 * Structured slides render text nodes; supplied HTML is never injected.
 */
export async function openPlayer(project, { onClose } = {}) {
  if (!project || !Array.isArray(project.slides) || !project.slides.length) {
    throw new Error('Bu projede sunulacak slayt bulunmuyor.');
  }
  currentPlayer?.close();
  ensureStyles();

  const slides = project.slides;
  const oldFocus = document.activeElement;
  const oldOverflow = document.body.style.overflow;
  const root = el('section', 'sp-player');
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', `${project.title || 'Sunum'} — sunum oynatıcı`);
  root.tabIndex = -1;
  const aborter = new AbortController();
  const signal = aborter.signal;
  let index = 0;
  let reveal = 0;
  let closed = false;
  let mode = '';
  let black = false;
  let panel = '';
  let hideTimeout;
  let toastTimeout;
  let video;
  let cleanupSlide = () => {};
  let started = Date.now();
  let strokes = [];
  let stroke;
  let swipe;
  let activePointer;
  let keyboardFocus = false;
  let videoStart = 0;
  let videoEnd = Infinity;
  let playCurrentVideo = () => {};
  let pauseCurrentVideo = () => {};
  let retryBlockedVideo = () => false;

  const header = el('header', 'sp-header');
  const projectInfo = el('div', 'sp-project-info');
  projectInfo.append(el('span', 'sp-eyebrow', 'SUNUM SAHNESİ'));
  const projectTitle = el('div', 'sp-project-title', project.title || 'İsimsiz sunum');
  projectInfo.append(projectTitle);
  const time = el('span', 'sp-clock', '00:00');
  time.title = 'Sunum süresi';
  const closeButton = iconButton('close', 'Sunumu kapat (Esc)', close, 'Kapat');
  header.append(projectInfo, time, closeButton);

  const workspace = el('div', 'sp-workspace');
  const stage = el('div', 'sp-stage');
  const media = el('div', 'sp-media');
  const annotation = el('canvas', 'sp-annotation');
  annotation.setAttribute('aria-label', 'Sunum üzerinde işaretleme alanı');
  const dot = el('div', 'sp-laser-dot');
  dot.hidden = true;
  const blackout = el('div', 'sp-blackout');
  blackout.hidden = true;
  blackout.setAttribute('aria-label', 'Ekran karartıldı');
  const stageHint = el('div', 'sp-stage-hint');
  stageHint.hidden = true;
  stage.append(media, annotation, dot, blackout, stageHint);
  const sidePanel = el('aside', 'sp-side-panel');
  sidePanel.hidden = true;
  workspace.append(stage, sidePanel);

  const footer = el('footer', 'sp-footer');
  const navigation = el('div', 'sp-navigation');
  const prevButton = iconButton('prev', 'Önceki adım (←)', previous);
  const count = el('button', 'sp-counter');
  count.type = 'button';
  count.title = 'Slaytları göster (G)';
  count.setAttribute('aria-label', 'Slaytları göster');
  count.addEventListener('click', () => togglePanel('gallery'));
  const nextButton = iconButton('next', 'Sonraki adım (→ / PageDown / Boşluk / Enter)', next);
  navigation.append(prevButton, count, nextButton);
  const tools = el('div', 'sp-tools');
  const laserButton = iconButton('laser', 'Lazer işaretçi (L)', () => setMode(mode === 'laser' ? '' : 'laser'), 'Lazer');
  const penButton = iconButton('pen', 'Kalem (P)', () => setMode(mode === 'pen' ? '' : 'pen'), 'Kalem');
  const eraseButton = iconButton('erase', 'Çizimleri temizle (E)', clearStrokes);
  const undoButton = iconButton('undo', 'Son çizimi geri al (Ctrl/⌘ Z)', undoStroke);
  const videoButton = iconButton('play', 'Videoyu oynat / duraklat (K)', toggleVideo);
  videoButton.hidden = true;
  const replayButton = iconButton('replay', 'Slaydı / videoyu yeniden başlat (R)', replay);
  const blackButton = iconButton('black', 'Ekranı karart (B)', toggleBlack);
  const notesButton = iconButton('notes', 'Konuşmacı notları (N)', () => togglePanel('notes'));
  const galleryButton = iconButton('grid', 'Slayt listesi (G)', () => togglePanel('gallery'));
  const fullButton = iconButton('full', 'Tam ekran (F)', toggleFullscreen);
  const helpButton = iconButton('help', 'Klavye kısayolları (?)', () => togglePanel('help'));
  tools.append(laserButton, penButton, undoButton, eraseButton, videoButton, replayButton, blackButton, notesButton, galleryButton, fullButton, helpButton);
  footer.append(navigation, tools);
  const progress = el('div', 'sp-progress');
  const progressFill = el('div', 'sp-progress-fill');
  progress.append(progressFill);
  const toast = el('div', 'sp-toast');
  toast.hidden = true;
  toast.setAttribute('role', 'status');
  const announcement = el('span', 'sp-sr-only');
  announcement.setAttribute('aria-live', 'polite');
  root.append(header, workspace, footer, progress, toast, announcement);
  document.body.append(root);
  document.body.style.overflow = 'hidden';
  root.focus();

  function listen(target, name, callback, options = {}) {
    target.addEventListener(name, callback, { ...options, signal });
  }

  function tell(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toast.hidden = true; }, 3500);
  }

  function wake() {
    root.classList.remove('sp-controls-hidden');
    clearTimeout(hideTimeout);
    if (!panel && mode !== 'pen') {
      hideTimeout = setTimeout(() => {
        if (!keyboardFocus || ![header, footer].some(area => area.contains(document.activeElement))) {
          root.classList.add('sp-controls-hidden');
        }
      }, 3200);
    }
  }

  function fragmentTotal(slide = slides[index]) {
    if (slide.type !== 'html' || slide.src) return 0;
    const bullets = Array.isArray(slide.bullets) ? slide.bullets : [];
    return bullets.length;
  }

  function updateCounter() {
    count.textContent = `${index + 1} / ${slides.length}`;
    const total = fragmentTotal();
    count.title = total ? `Slayt ${index + 1} · ${reveal}/${total} adım · Listeyi aç (G)` : 'Slayt listesini aç (G)';
    prevButton.disabled = index === 0 && reveal === 0;
    nextButton.disabled = index === slides.length - 1 && reveal >= total;
    progressFill.style.width = `${((index + 1) / slides.length) * 100}%`;
    announcement.textContent = `Slayt ${index + 1} / ${slides.length}: ${slides[index].title || ''}${total ? `, adım ${reveal}/${total}` : ''}`;
  }

  function applyFragments() {
    media.querySelectorAll('[data-fragment]').forEach((item, i) => {
      item.classList.toggle('sp-fragment-visible', i < reveal);
      item.setAttribute('aria-hidden', String(i >= reveal));
    });
    updateCounter();
  }

  function next() {
    if (black) toggleBlack();
    if (retryBlockedVideo()) { wake(); return; }
    const total = fragmentTotal();
    if (reveal < total) { reveal += 1; applyFragments(); }
    else if (index < slides.length - 1) showSlide(index + 1);
    else tell('Sunumun sonundasınız.');
    wake();
  }

  function previous() {
    if (black) toggleBlack();
    if (reveal > 0) { reveal -= 1; applyFragments(); }
    else if (index > 0) showSlide(index - 1, true);
    wake();
  }

  function showSlide(nextIndex, allFragments = false) {
    cleanupSlide();
    cleanupSlide = () => {};
    video = null;
    playCurrentVideo = () => {};
    pauseCurrentVideo = () => {};
    retryBlockedVideo = () => false;
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    reveal = allFragments ? fragmentTotal(slides[index]) : 0;
    strokes = [];
    stroke = undefined;
    activePointer = undefined;
    drawStrokes();
    media.replaceChildren();
    stageHint.hidden = true;
    videoButton.hidden = true;
    const slide = slides[index];
    if (slide.type === 'html' && !slide.src) {
      const theme = ['light', 'warm'].includes(slide.theme) ? slide.theme : 'dark';
      const content = el('article', `sp-text-slide sp-theme-${theme}`);
      content.append(el('div', 'sp-slide-kicker', project.title || 'SUNUM'));
      content.append(el('h2', '', slide.heading || slide.title || ''));
      if (slide.body) content.append(el('p', 'sp-slide-body', String(slide.body)));
      if (Array.isArray(slide.bullets) && slide.bullets.length) {
        const list = el('ul', 'sp-slide-bullets');
        slide.bullets.forEach((text, i) => {
          const item = el('li', '', String(text));
          item.dataset.fragment = String(i);
          list.append(item);
        });
        content.append(list);
      }
      content.append(el('div', 'sp-slide-folio', String(index + 1).padStart(2, '0')));
      media.append(content);
      applyFragments();
    } else {
      const isFrame = slide.type === 'embed' || slide.type === 'html';
      const url = sourceURL(slide.src, isFrame);
      if (!url) {
        showError('Bu slaydın medya adresi açılamıyor.', isFrame ? 'Gömülü sunum için güvenli bir HTTPS adresi kullanın.' : 'Dosyanın erişilebilir olduğunu kontrol edin.');
      } else if (slide.type === 'image') {
        const image = el('img', 'sp-image');
        image.alt = slide.title || `Slayt ${index + 1}`;
        image.draggable = false;
        image.decoding = 'async';
        const imageError = () => showError('Slayt görseli yüklenemedi.', 'Bağlantıyı ve dosya erişimini kontrol edin.');
        image.addEventListener('error', imageError, { once: true });
        image.src = url.href;
        media.append(image);
        cleanupSlide = () => {
          image.removeEventListener('error', imageError);
          image.removeAttribute('src');
        };
      } else if (slide.type === 'video') {
        video = el('video', 'sp-video');
        const mountedVideo = video;
        video.controls = true;
        video.playsInline = true;
        video.autoplay = slide.autoplay === true;
        video.muted = slide.muted === true;
        video.defaultMuted = slide.muted === true;
        video.preload = slide.autoplay === true ? 'auto' : 'metadata';
        const posterURL = sourceURL(slide.poster);
        if (posterURL) video.poster = posterURL.href;
        video.setAttribute('aria-label', slide.title || 'Sunum videosu');
        let disposed = false;
        let hls;
        let sourceFailed = false;
        let wantsPlayback = slide.autoplay === true;
        let playPending = false;
        let playbackStarted = false;
        let autoplayBlocked = false;
        let blockedAttempts = 0;
        let playAttempt = 0;
        const suppliedStart = Number(slide.start);
        let start = Number.isFinite(suppliedStart) ? Math.max(0, suppliedStart) : 0;
        const suppliedEnd = Number(slide.end);
        let end = Number.isFinite(suppliedEnd) && suppliedEnd > start ? suppliedEnd : Infinity;
        videoStart = start;
        videoEnd = end;
        let finished = false;
        const isCurrentVideo = () => !disposed && !sourceFailed && video === mountedVideo;
        const requestPlayback = () => {
          if (!isCurrentVideo() || !wantsPlayback || finished || autoplayBlocked || playPending || !mountedVideo.paused) return;
          const attempt = ++playAttempt;
          playPending = true;
          // For native MP4/HLS this call runs in the remote's keydown gesture,
          // before waiting for metadata, so sound can be allowed by Safari.
          let promise;
          try { promise = mountedVideo.play(); }
          catch (error) { promise = Promise.reject(error); }
          Promise.resolve(promise).then(() => {
            if (!isCurrentVideo() || !wantsPlayback) mountedVideo.pause();
          }).catch((error) => {
            if (!isCurrentVideo() || !wantsPlayback || attempt !== playAttempt) return;
            if (error?.name === 'NotAllowedError') {
              autoplayBlocked = true;
              blockedAttempts += 1;
              tell(blockedAttempts === 1
                ? 'Videoyu başlatmak için kumandanın ileri düğmesine bir kez daha basın.'
                : 'Tarayıcı sesli oynatmayı yine engelledi. Bu site için otomatik oynatma izni gerekebilir; kumandanın ileri düğmesiyle yeniden deneyebilirsiniz.');
            }
            // Loading/attachment can interrupt play(). A later readiness event
            // retries only while this slide is still active and wants playback.
          }).finally(() => {
            if (attempt === playAttempt) playPending = false;
          });
        };
        playCurrentVideo = ({ restart = false } = {}) => {
          if (!isCurrentVideo()) return;
          wantsPlayback = true;
          autoplayBlocked = false;
          if (restart || mountedVideo.ended || mountedVideo.currentTime >= videoEnd) mountedVideo.currentTime = videoStart;
          finished = false;
          requestPlayback();
        };
        pauseCurrentVideo = () => {
          wantsPlayback = false;
          mountedVideo.autoplay = false;
          mountedVideo.pause();
        };
        retryBlockedVideo = () => {
          if (!isCurrentVideo() || !autoplayBlocked) return false;
          playCurrentVideo();
          return true;
        };
        const chapterReady = () => {
          if (Number.isFinite(mountedVideo.duration)) end = Math.min(end, mountedVideo.duration);
          if (start >= end) {
            tell('Bölüm başlangıcı video süresini aşıyor; video baştan açıldı.');
            start = 0;
            mountedVideo.currentTime = 0;
          } else if (start > 0) mountedVideo.currentTime = start;
          videoStart = start;
          videoEnd = end;
          requestPlayback();
        };
        const enforceChapter = () => {
          if (mountedVideo.currentTime >= end && !finished) {
            finished = true;
            wantsPlayback = false;
            mountedVideo.autoplay = false;
            mountedVideo.pause();
            tell('Video bölümü tamamlandı. Sonraki slayda geçebilirsiniz.');
          } else if (mountedVideo.currentTime < end - 0.1) finished = false;
        };
        const clampSeek = () => {
          if (mountedVideo.currentTime < start) mountedVideo.currentTime = start;
          else if (mountedVideo.currentTime > end) mountedVideo.currentTime = end;
        };
        const chapterPlay = () => {
          if (!isCurrentVideo()) { mountedVideo.pause(); return; }
          if (mountedVideo.paused) return;
          wantsPlayback = true;
          autoplayBlocked = false;
          if (mountedVideo.currentTime >= end || mountedVideo.currentTime < start) {
            finished = false;
            mountedVideo.currentTime = start;
          }
        };
        const videoPlaying = () => {
          if (!isCurrentVideo() || !wantsPlayback) { mountedVideo.pause(); return; }
          playbackStarted = true;
        };
        const videoPaused = () => {
          if (playbackStarted && mountedVideo.paused) {
            wantsPlayback = false;
            mountedVideo.autoplay = false;
          }
        };
        const videoEnded = () => {
          finished = true;
          wantsPlayback = false;
          mountedVideo.autoplay = false;
        };
        const failVideo = (message) => {
          if (disposed || sourceFailed) return;
          sourceFailed = true;
          wantsPlayback = false;
          mountedVideo.autoplay = false;
          mountedVideo.removeEventListener('error', videoError);
          mountedVideo.pause();
          hls?.destroy();
          hls = undefined;
          if (video === mountedVideo) video = null;
          videoButton.hidden = true;
          showError('Video oynatılamıyor.', message);
        };
        const videoError = () => failVideo('Dosyaya erişimi ve tarayıcının video biçimini desteklediğini kontrol edin.');
        video.addEventListener('loadedmetadata', chapterReady, { once: true });
        video.addEventListener('timeupdate', enforceChapter);
        video.addEventListener('seeking', clampSeek);
        video.addEventListener('play', chapterPlay);
        video.addEventListener('playing', videoPlaying);
        video.addEventListener('pause', videoPaused);
        video.addEventListener('ended', videoEnded);
        video.addEventListener('canplay', requestPlayback);
        video.addEventListener('error', videoError, { once: true });
        media.append(video);
        videoButton.hidden = false;
        cleanupSlide = () => {
          disposed = true;
          wantsPlayback = false;
          mountedVideo.autoplay = false;
          mountedVideo.removeEventListener('loadedmetadata', chapterReady);
          mountedVideo.removeEventListener('timeupdate', enforceChapter);
          mountedVideo.removeEventListener('seeking', clampSeek);
          mountedVideo.removeEventListener('play', chapterPlay);
          mountedVideo.removeEventListener('playing', videoPlaying);
          mountedVideo.removeEventListener('pause', videoPaused);
          mountedVideo.removeEventListener('ended', videoEnded);
          mountedVideo.removeEventListener('canplay', requestPlayback);
          mountedVideo.removeEventListener('error', videoError);
          hls?.destroy();
          hls = undefined;
          mountedVideo.pause();
          mountedVideo.removeAttribute('src');
          mountedVideo.load();
        };
        const isHls = /\.m3u8$/i.test(url.pathname);
        const nativeHls = mountedVideo.canPlayType('application/vnd.apple.mpegurl') ||
          mountedVideo.canPlayType('application/x-mpegURL');
        if (!isHls || nativeHls) {
          mountedVideo.src = url.href;
          requestPlayback();
        } else {
          // Load the local HLS runtime only when this active video needs it.
          import('./vendor/hls.js').then(({ default: Hls }) => {
            if (disposed || sourceFailed) return;
            if (!Hls.isSupported()) {
              failVideo('Bu tarayıcı akış videosunu desteklemiyor. Güncel Safari, Chrome, Firefox veya Edge kullanın.');
              return;
            }
            hls = new Hls({
              enableWorker: false,
              maxBufferLength: 30,
              maxMaxBufferLength: 60,
              backBufferLength: 30,
              startPosition: start,
            });
            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (data.fatal) failVideo('Video akışı yüklenemedi. Bağlantınızı kontrol edip yeniden başlat düğmesiyle tekrar deneyin.');
            });
            hls.on(Hls.Events.MEDIA_ATTACHED, requestPlayback);
            hls.on(Hls.Events.MANIFEST_PARSED, requestPlayback);
            hls.loadSource(url.href);
            hls.attachMedia(mountedVideo);
            requestPlayback();
          }).catch(() => {
            failVideo('Video oynatıcı bileşeni yüklenemedi. Bağlantınızı kontrol edip yeniden deneyin.');
          });
        }
      } else if (isFrame) {
        const frame = el('iframe', 'sp-frame');
        frame.title = slide.title || project.title || 'Gömülü sunum';
        frame.setAttribute('sandbox', `allow-scripts allow-presentation${trustedFrame(url) ? ' allow-same-origin' : ''}`);
        frame.setAttribute('allow', "autoplay; picture-in-picture; fullscreen 'none'");
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.src = url.href;
        media.append(frame);
        cleanupSlide = () => { frame.src = 'about:blank'; };
        stageHint.textContent = mode
          ? 'İşaretleme açık · İç sunumla etkileşmek için lazeri / kalemi kapatın.'
          : 'Tam ekran için dış araç çubuğunu kullanın. İç sunum odağındayken bu çerçevenin klavye kısayolları çalışmayabilir.';
        stageHint.hidden = false;
      } else {
        showError('Bu slayt türü desteklenmiyor.', 'Görsel, video, güvenli gömülü sunum veya metin slaydı kullanın.');
      }
    }
    updateCounter();
    if (panel) renderPanel();
    wake();
  }

  function showError(title, message) {
    const error = el('div', 'sp-media-error');
    error.append(el('span', 'sp-eyebrow', 'MEDYA AÇILAMADI'), el('h2', '', title), el('p', '', message));
    media.replaceChildren(error);
  }

  function setMode(value) {
    mode = value;
    root.dataset.pointer = mode;
    laserButton.setAttribute('aria-pressed', String(mode === 'laser'));
    penButton.setAttribute('aria-pressed', String(mode === 'pen'));
    dot.hidden = true;
    if (!stageHint.hidden) {
      stageHint.textContent = mode
        ? 'İşaretleme açık · İç sunumla etkileşmek için lazeri / kalemi kapatın.'
        : 'Tam ekran için dış araç çubuğunu kullanın. İç sunum odağındayken bu çerçevenin klavye kısayolları çalışmayabilir.';
    }
    if (mode) tell(mode === 'laser' ? 'Lazer açık · L ile kapatın.' : 'Kalem açık · E: temizle · Ctrl/⌘ Z: geri al');
    wake();
  }

  function clearStrokes() {
    strokes = [];
    stroke = undefined;
    drawStrokes();
    wake();
  }

  function undoStroke() {
    strokes.pop();
    drawStrokes();
    wake();
  }

  function drawStrokes() {
    const ctx = annotation.getContext('2d');
    if (!ctx) return;
    const rect = annotation.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (annotation.width !== width || annotation.height !== height) {
      annotation.width = width;
      annotation.height = height;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#ffc46b';
    ctx.lineWidth = 3 * ratio;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const points of strokes) {
      ctx.beginPath();
      points.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x * width, point.y * height);
        else ctx.lineTo(point.x * width, point.y * height);
      });
      if (points.length === 1) {
        ctx.lineTo(points[0].x * width + 0.1, points[0].y * height);
      }
      ctx.stroke();
    }
  }

  function pointFrom(event) {
    const rect = annotation.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  }

  function toggleBlack() {
    black = !black;
    blackout.hidden = !black;
    blackButton.setAttribute('aria-pressed', String(black));
    if (black) { pauseCurrentVideo(); tell('Ekran karartıldı · B ile geri dönün.'); }
    wake();
  }

  function toggleVideo() {
    if (!video) return;
    if (video.paused) playCurrentVideo();
    else pauseCurrentVideo();
    wake();
  }

  function replay() {
    if (video) {
      playCurrentVideo({ restart: true });
    } else showSlide(index);
    wake();
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === root) await document.exitFullscreen();
      else if (root.requestFullscreen) await root.requestFullscreen();
      else tell('Bu tarayıcı tam ekranı desteklemiyor. Sunum pencereye sığdırıldı.');
    } catch { tell('Tam ekran açılamadı. Tarayıcınızın tam ekran düğmesini kullanabilirsiniz.'); }
    wake();
  }

  function togglePanel(name) {
    panel = panel === name ? '' : name;
    renderPanel();
    wake();
  }

  function renderPanel() {
    sidePanel.replaceChildren();
    sidePanel.hidden = !panel;
    root.classList.toggle('sp-has-panel', Boolean(panel));
    notesButton.setAttribute('aria-pressed', String(panel === 'notes'));
    galleryButton.setAttribute('aria-pressed', String(panel === 'gallery'));
    helpButton.setAttribute('aria-pressed', String(panel === 'help'));
    if (!panel) return;
    const panelHeader = el('div', 'sp-panel-header');
    panelHeader.append(
      el('h2', '', { notes: 'Konuşmacı notları', gallery: 'Slaytlar', help: 'Sunum kısayolları' }[panel]),
      iconButton('close', 'Paneli kapat', () => togglePanel(panel))
    );
    sidePanel.append(panelHeader);
    if (panel === 'notes') {
      sidePanel.append(
        el('p', 'sp-panel-meta', `SLAYT ${index + 1} / ${slides.length}`),
        el('h3', '', slides[index].title || 'İsimsiz slayt'),
        el('p', 'sp-notes-text', String(slides[index].notes || 'Bu slayda henüz konuşmacı notu eklenmedi.')),
        el('p', 'sp-panel-warning', 'Notlar bu ekranda görünür. Ekran paylaşırken dinleyiciler de görebilir.')
      );
      const reset = el('button', 'sp-text-button', 'Sunum sayacını sıfırla');
      reset.type = 'button';
      reset.addEventListener('click', () => { started = Date.now(); updateTime(); });
      sidePanel.append(reset);
    } else if (panel === 'gallery') {
      const list = el('div', 'sp-slide-list');
      slides.forEach((slide, i) => {
        const button = el('button', `sp-slide-card${i === index ? ' sp-current' : ''}`);
        button.type = 'button';
        if (i === index) button.setAttribute('aria-current', 'true');
        button.append(
          el('span', 'sp-slide-card-number', String(i + 1).padStart(2, '0')),
          el('span', 'sp-slide-card-title', slide.title || `Slayt ${i + 1}`),
          el('span', 'sp-slide-card-type', { image: 'Görsel', video: 'Video', embed: 'Gömülü', html: 'Sunum' }[slide.type] || 'Slayt')
        );
        button.addEventListener('click', () => { showSlide(i); togglePanel('gallery'); root.focus(); });
        list.append(button);
      });
      sidePanel.append(list);
    } else {
      const shortcuts = [
        ['→ / Boşluk / Enter / PageDown', 'Sonraki adım'], ['← / PageUp', 'Önceki adım'],
        ['Home / End', 'İlk / son slayt'], ['L', 'Lazer işaretçi'], ['P', 'Kalem'],
        ['E', 'Çizimleri temizle'], ['Ctrl/⌘ Z', 'Son çizimi geri al'], ['K', 'Videoyu oynat / duraklat'],
        ['R', 'Slaydı / videoyu yeniden başlat'], ['B', 'Ekranı karart'], ['F', 'Tam ekran'],
        ['N', 'Konuşmacı notları'], ['G', 'Slayt listesi'], ['?', 'Bu yardım paneli'], ['Esc', 'Paneli / sunumu kapat'],
      ];
      const list = el('dl', 'sp-shortcuts');
      shortcuts.forEach(([key, label]) => list.append(el('dt', '', key), el('dd', '', label)));
      sidePanel.append(list, el('p', 'sp-panel-warning', 'Gömülü PowerPoint ve web sunumları kendi animasyon ve kontrollerini kullanır. Lazer ve araç çubuğunun görünür kalması için tam ekranı dış araç çubuğundan açın; iç sunumun tam ekran düğmesi devre dışıdır. Lazer veya kalem açıkken içeriğin üzerindeki tıklamalar işaretleme içindir. İçerikle etkileşmek için işaretlemeyi kapatın.'));
    }
  }

  function updateTime() {
    const seconds = Math.floor((Date.now() - started) / 1000);
    const minutes = Math.floor(seconds / 60);
    time.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function close() {
    if (closed) return;
    closed = true;
    cleanupSlide();
    aborter.abort();
    resizeObserver.disconnect();
    clearInterval(timer);
    clearTimeout(hideTimeout);
    clearTimeout(toastTimeout);
    if (document.fullscreenElement === root) document.exitFullscreen().catch(() => {});
    root.remove();
    document.body.style.overflow = oldOverflow;
    oldFocus?.focus?.();
    if (currentPlayer?.element === root) currentPlayer = undefined;
    onClose?.();
  }

  listen(root, 'pointermove', wake);
  listen(root, 'pointerdown', () => { keyboardFocus = false; wake(); });
  listen(header, 'focusin', wake);
  listen(footer, 'focusin', wake);
  listen(document, 'fullscreenchange', () => {
    fullButton.setAttribute('aria-pressed', String(document.fullscreenElement === root));
    drawStrokes();
    wake();
  });
  listen(annotation, 'pointermove', event => {
    if (mode === 'laser') {
      const rect = stage.getBoundingClientRect();
      dot.style.left = `${event.clientX - rect.left}px`;
      dot.style.top = `${event.clientY - rect.top}px`;
      dot.hidden = false;
    } else if (mode === 'pen' && stroke && event.pointerId === activePointer) {
      stroke.push(pointFrom(event));
      drawStrokes();
    }
  });
  listen(annotation, 'pointerleave', () => { dot.hidden = true; });
  listen(annotation, 'pointerdown', event => {
    if (mode !== 'pen') return;
    event.preventDefault();
    activePointer = event.pointerId;
    annotation.setPointerCapture(event.pointerId);
    stroke = [pointFrom(event)];
    strokes.push(stroke);
    drawStrokes();
  });
  const finishStroke = () => { stroke = undefined; activePointer = undefined; };
  listen(annotation, 'pointerup', finishStroke);
  listen(annotation, 'pointercancel', finishStroke);
  listen(stage, 'pointerdown', event => {
    if (mode || event.pointerType !== 'touch' || event.target.closest('video, iframe, button, a, input')) return;
    swipe = { x: event.clientX, y: event.clientY };
  });
  listen(stage, 'pointerup', event => {
    if (!swipe || mode) { swipe = undefined; return; }
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    swipe = undefined;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? next() : previous();
  });
  listen(stage, 'pointercancel', () => { swipe = undefined; });
  listen(document, 'keydown', event => {
    if (closed) return;
    if (event.key === 'Tab') {
      keyboardFocus = true;
      wake();
      const targets = [...root.querySelectorAll('button:not([disabled]), a[href], input, video[controls], iframe, [tabindex="0"]')]
        .filter(node => !node.hidden && node.getClientRects().length > 0);
      const first = targets[0];
      const last = targets.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === root)) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === root)) {
        event.preventDefault(); first?.focus();
      }
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      if (panel) { panel = ''; renderPanel(); wake(); root.focus(); }
      else if (mode) setMode('');
      else close();
      return;
    }
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && key === 'z') { event.preventDefault(); undoStroke(); return; }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    // Remote navigation wins even if a video or a pointer-clicked button has focus.
    // Tab users retain normal Enter/Space activation for toolbar buttons.
    if ([' ', 'enter'].includes(key) && keyboardFocus && event.target.closest('button')) return;
    const actions = {
      arrowright: next, pagedown: next, ' ': next, enter: next,
      arrowleft: previous, pageup: previous,
      home: () => showSlide(0), end: () => showSlide(slides.length - 1, true),
      l: () => setMode(mode === 'laser' ? '' : 'laser'),
      p: () => setMode(mode === 'pen' ? '' : 'pen'),
      e: clearStrokes, r: replay, b: toggleBlack, f: toggleFullscreen,
      n: () => togglePanel('notes'), g: () => togglePanel('gallery'),
      '?': () => togglePanel('help'), k: toggleVideo,
    };
    if (actions[key]) {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) {
        if (['arrowright', 'pagedown', ' ', 'enter', 'arrowleft', 'pageup', 'home', 'end'].includes(key)) {
          keyboardFocus = false;
          root.focus();
        }
        actions[key]();
      }
    }
  }, { capture: true });

  const resizeObserver = new ResizeObserver(drawStrokes);
  resizeObserver.observe(stage);
  const timer = setInterval(updateTime, 1000);
  showSlide(0);
  currentPlayer = { close, next, previous, goTo: showSlide, element: root };
  return currentPlayer;
}
