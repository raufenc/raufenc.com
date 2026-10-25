(function () {
  'use strict';
  const message = document.createElement('div');
  message.className = 'learning-notice';
  message.setAttribute('role', 'status');
  message.hidden = true;
  document.body.appendChild(message);
  let noticeTimer;
  function notify(text, persistent = false) {
    clearTimeout(noticeTimer);
    message.textContent = text;
    message.hidden = false;
    if (!persistent) noticeTimer = setTimeout(() => { message.hidden = true; }, 6000);
  }
  const saveError = () => notify('تَعَذَّرَ حِفْظُ النَّتيجَةِ في مِنَصَّةِ التَّعَلُّم. أَعِدْ فَتْحَ النَّشاطِ وَحاوِلْ مُجَدَّدًا.', true);
  window.addEventListener('learning-save-error', saveError);
  if (window.EbaScorm.diagnostics().errors.some(e => !e.optional)) saveError();
  const video = document.getElementById('vid');
  if (!video) return;
  video.setAttribute('aria-label', 'فيديو يَوْمِ مَرْيَمَ');
  const retry = document.createElement('button');
  retry.type = 'button'; retry.className = 'learning-retry'; retry.hidden = true;
  retry.textContent = 'تَعَذَّرَ تَشْغيلُ الفِيديو. حاوِلْ مَرَّةً أُخْرى ↻';
  video.parentElement.appendChild(retry);
  video.addEventListener('error', () => { retry.hidden = false; });
  video.addEventListener('loadeddata', () => { retry.hidden = true; });
  retry.addEventListener('click', () => { video.load(); video.play().catch(() => {}); });
  const controls = document.createElement('div');
  controls.className = 'learning-media';
  controls.setAttribute('aria-label', 'أَدَواتُ الفِيديو');
  controls.innerHTML = '<button type="button" data-media="play" aria-label="تَشْغيل">▶</button>' +
    '<button type="button" data-media="replay" aria-label="إِعادَةُ الاسْتِماع">↻</button>' +
    '<input type="range" min="0" max="100" step="0.1" value="0" aria-label="مَوْضِعُ الفِيديو">' +
    '<button type="button" data-media="speed" aria-label="سُرْعَةُ الاسْتِماع: عادي">١×</button>' +
    '<button type="button" data-media="mute" aria-label="كَتْمُ الصَّوْت" aria-pressed="false">🔊</button>';
  const frame = document.getElementById('vframe');
  if (frame) frame.appendChild(controls);
  else document.getElementById('stage').after(controls);
  const range = controls.querySelector('input');
  const play = controls.querySelector('[data-media="play"]');
  const sync = () => {
    play.textContent = video.paused ? '▶' : 'Ⅱ';
    play.setAttribute('aria-label', video.paused ? 'تَشْغيل' : 'إيقافٌ مُؤَقَّت');
    range.disabled = !Number.isFinite(video.duration) || video.duration <= 0;
    range.value = range.disabled ? 0 : video.currentTime / video.duration * 100;
    range.setAttribute('aria-valuetext', Math.floor(video.currentTime || 0) + ' / ' + Math.floor(Number.isFinite(video.duration) ? video.duration : 0));
  };
  ['play', 'pause', 'timeupdate', 'loadedmetadata', 'emptied'].forEach(name => video.addEventListener(name, sync));
  range.addEventListener('input', () => { if (Number.isFinite(video.duration)) video.currentTime = Number(range.value) / 100 * video.duration; });
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-media]');
    if (!button) return;
    const action = button.dataset.media;
    if (action === 'play' && !video.paused) video.pause();
    else if (action === 'play' || action === 'replay') {
      if (action === 'replay') video.currentTime = 0;
      video.play().catch(() => notify('اِضْغَطْ زِرَّ التَّشْغيل.'));
    } else if (action === 'speed') {
      video.playbackRate = video.playbackRate === 1 ? 0.75 : video.playbackRate === 0.75 ? 1.25 : 1;
      button.textContent = video.playbackRate === 1 ? '١×' : video.playbackRate === 0.75 ? '٠٫٧٥×' : '١٫٢٥×';
      button.setAttribute('aria-label', 'سُرْعَةُ الاسْتِماع: ' + button.textContent);
    } else if (action === 'mute') {
      video.muted = !video.muted;
      button.textContent = video.muted ? '🔇' : '🔊';
      button.setAttribute('aria-pressed', String(video.muted));
      button.setAttribute('aria-label', video.muted ? 'تَشْغيلُ الصَّوْت' : 'كَتْمُ الصَّوْت');
    }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
  const fullscreen = document.createElement('button');
  fullscreen.type = 'button';
  fullscreen.className = 'learning-fullscreen';
  fullscreen.setAttribute('aria-label', 'مِلْءُ الشّاشَة');
  fullscreen.textContent = '⛶';
  fullscreen.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => notify('مِلْءُ الشّاشَةِ غَيْرُ مُتاحٍ في هٰذا المُتَصَفِّح.'));
    else if (video.webkitEnterFullscreen && video.readyState > 0) video.webkitEnterFullscreen();
    else notify('مِلْءُ الشّاشَةِ غَيْرُ مُتاحٍ في هٰذا المُتَصَفِّح.');
  });
  document.body.appendChild(fullscreen);
  sync();
})();
