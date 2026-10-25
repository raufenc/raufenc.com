import { createDeck, tempos, judge, reward } from './rounds.mjs?v=2';
import { secondSegments, secondFraction, timeDigits } from './timer.mjs?v=2';
const $ = id => document.getElementById(id);
const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Private browsers can still play. */ } };
let mode = 'classic', tempo = 'flow', soundOn = read('bb-sound') === 'true';
let state = 'home', deck = [], index = 0, presses = 0, score = 0, lives = 3, streak = 0, bestStreak = 0;
let history = [], remaining = 0, duration = 0, deadline = 0, frame = 0, audio = null, pausedFrom = 'playing', pressTimeout = 0;
let segments = [], segmentNodes = [], previousWhole = '', tickAlternate = false, feedbackAt = 0;
const modeName = () => mode === 'classic' ? 'Zihin parkuru' : 'Siyer rotası';
const bestKey = () => `bb-best-v1-${mode}-${tempo}`;
function updateBest() {
  const best = Number(read(bestKey()) || 0);
  $('home-best').textContent = best ? `REKOR ${best.toLocaleString('tr-TR')}` : '';
  $('home-caption').textContent = `25 TUR · ${mode === 'siyer' ? 'SİYER · ' : ''}${tempos[tempo].name.toLocaleUpperCase('tr-TR')}`;
}
function sound(frequency = 240, length = .06, type = 'sine', volume = .06) {
  if (!soundOn) return;
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const oscillator = audio.createOscillator(), gain = audio.createGain(), now = audio.currentTime;
    oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, now); oscillator.frequency.exponentialRampToValueAtTime(frequency * .65, now + length);
    gain.gain.setValueAtTime(volume, now); gain.gain.exponentialRampToValueAtTime(.001, now + length);
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(now); oscillator.stop(now + length);
  } catch { /* Sound is optional. */ }
}
function soundState() { $('sound-toggle').setAttribute('aria-pressed', String(soundOn)); $('sound-toggle').setAttribute('aria-label', soundOn ? 'Sesi kapat' : 'Sesi aç'); $('sound-toggle').title = soundOn ? 'Sesi kapat' : 'Sesi aç'; }
$('sound-toggle').addEventListener('click', () => { soundOn = !soundOn; save('bb-sound', soundOn); soundState(); sound(440); });
soundState();
function screen(name) {
  ['home', 'game', 'results'].forEach(id => $(id).hidden = id !== name);
  $('settings-button').hidden = name === 'game'; $('pause-button').hidden = name !== 'game'; window.scrollTo(0, 0);
}
function pop(button) { clearTimeout(pressTimeout); button.classList.add('pressed'); pressTimeout = setTimeout(() => button.classList.remove('pressed'), 110); }
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  mode = button.dataset.mode;
  document.querySelectorAll('[data-mode]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); }); updateBest();
}));
document.querySelectorAll('[data-tempo]').forEach(button => button.addEventListener('click', () => {
  tempo = button.dataset.tempo; updateBest();
  document.querySelectorAll('[data-tempo]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
}));
const svg = content => `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${content}</svg>`;
const cat = `<svg class="animal" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 30 10 9l18 12h8L54 9l-3 21c8 25-46 25-38 0Z" fill="#b5dccb"/><path d="m15 18 3 11 5-5m26-6-3 11-5-5" fill="#739789"/><ellipse cx="23" cy="35" rx="2" ry="4" fill="#20362d"/><ellipse cx="41" cy="35" rx="2" ry="4" fill="#20362d"/><path d="m29 41 3 3 3-3M16 41 4 38m12 7L4 47m44-6 12-3m-12 7 12 2" stroke="#20362d" stroke-width="2" stroke-linecap="round"/></svg>`;
const fox = `<svg class="animal" viewBox="0 0 64 64" aria-hidden="true"><path d="M11 8 27 24h10L53 8l-3 31-18 16-18-16Z" fill="#e3a876"/><path d="m16 35 16 17 16-17-12 3h-8Z" fill="#f0ddc4"/><path d="m27 45 5 5 5-5Z" fill="#3d3029"/><circle cx="23" cy="33" r="2" fill="#3d3029"/><circle cx="41" cy="33" r="2" fill="#3d3029"/></svg>`;
function renderVisual(round) {
  const el = $('round-visual'); el.removeAttribute('aria-label'); el.removeAttribute('role'); el.innerHTML = '';
  let label = '';
  switch (round.visual) {
    case 'math': el.textContent = round.value; break;
    case 'memory': el.innerHTML = `<span class="memory-number">${round.value}</span>`; break;
    case 'animals': el.innerHTML = round.value.map(x => x === 'cat' ? cat : fox).join(''); label = round.value.map(x => x === 'cat' ? 'kedi' : 'tilki').join(', '); break;
    case 'color': el.innerHTML = `<span style="color:${round.color}">${round.value}</span>`; label = `${round.value} kelimesi, ${round.color === '#74bfff' ? 'mavi' : 'turuncu'} renkte`; break;
    case 'moon': el.innerHTML = svg('<path d="M44 6a25 25 0 1 0 14 39A25 25 0 0 1 44 6Z" fill="#d9e5b7"/>'); label = 'Hilal'; break;
    case 'dots': el.innerHTML = round.value.map(x => `<span class="visual-dot ${x ? 'filled' : ''}"></span>`).join(''); label = round.value.map(x => x ? 'dolu nokta' : 'boş çember').join(', '); break;
    case 'sentence': el.innerHTML = `<span class="sentence">${round.value}</span>`; break;
    case 'star': el.innerHTML = svg('<path d="m32 4 8.6 18 19.8 2.8-14.3 14 3.4 19.7L32 49.2 14.5 58.5l3.4-19.7-14.3-14L23.4 22Z" fill="#e4c17a"/>'); label = 'Beş sivri uçlu yıldız'; break;
    case 'clock': {
      const angle = round.value * Math.PI / 6, x = 32 + Math.sin(angle) * 13, y = 32 - Math.cos(angle) * 13;
      el.innerHTML = `<svg class="clock" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29" stroke="#b5dccb" stroke-width="2" fill="#202d32"/>${Array.from({length:12}, (_,i) => `<path d="M32 6v3" stroke="#9eb3ac" stroke-width="2" transform="rotate(${i * 30} 32 32)"/>`).join('')}<path d="M32 32V13M32 32L${x} ${y}" stroke="#f1f1e9" stroke-width="2.5" stroke-linecap="round"/><circle cx="32" cy="32" r="2.5" fill="#ff7059"/></svg>`; label = `Saat ${round.value}:00`; break;
    }
  }
  if (label) { el.setAttribute('role', 'img'); el.setAttribute('aria-label', label); }
}
function updateHUD() {
  $('round-number').innerHTML = `${String(index + 1).padStart(2, '0')} <span>/ 25</span>`;
  $('score').textContent = String(score).padStart(4, '0');
  $('lives').innerHTML = Array.from({length:3}, (_, i) => `<span class="${i >= lives ? 'lost-life' : ''}">●</span>`).join('');
  $('lives').setAttribute('aria-label', `${lives} hata hakkı kaldı`);
}
function start() {
  cancelAnimationFrame(frame); deck = createDeck(mode); index = 0; presses = 0; score = 0; lives = 3; streak = 0; bestStreak = 0; history = [];
  screen('game'); sound(320); nextRound();
}
function nextRound() {
  const round = deck[index]; presses = 0; state = 'playing';
  $('play-stage').className = 'dial play-dial';
  $('play-stage').classList.toggle('has-visual', Boolean(round.visual));
  $('play-stage').classList.toggle('long-prompt', round.text.length > 45);
  $('instruction').textContent = round.text; renderVisual(round);
  $('round-feedback').innerHTML = ''; $('round-feedback').className = 'round-feedback'; $('next-button').hidden = true;
  $('press-button').disabled = false; $('press-button').classList.remove('pressed'); $('press-count').textContent = '0 dokunuş';
  updateHUD(); duration = round.seconds * tempos[tempo].factor * 1000; remaining = duration; deadline = performance.now() + duration;
  segments = secondSegments(duration);
  $('seconds-ring').innerHTML = segments.map(s => `<path class="second-segment" d="${s.path}" pathLength="1" style="stroke-dasharray:1 1"/>`).join('');
  segmentNodes = document.querySelectorAll('#seconds-ring .second-segment'); previousWhole = '';
  $('time-accessible').textContent = `Bu tur için ${Number((duration/1000).toFixed(2)).toLocaleString('tr-TR')} saniye.`;
  paintTime(); frame = requestAnimationFrame(tick); $('press-button').focus({ preventScroll: true });
}
function paintTime() {
  const digits = timeDigits(remaining), elapsed = duration - remaining;
  if (digits.whole !== previousWhole) {
    if (previousWhole && remaining > 0 && remaining <= 3000) sound(900, .035, 'sine', .025);
    previousWhole = digits.whole; tickAlternate = !tickAlternate;
    $('time-whole').textContent = digits.whole;
    $('time-whole').className = `time-whole ${tickAlternate ? 'tick-a' : 'tick-b'}`;
  }
  $('time-decimal').textContent = digits.decimal;
  segmentNodes.forEach((node, i) => {
    const fraction = secondFraction(segments[i], elapsed);
    node.style.strokeDashoffset = -(1 - fraction); node.style.opacity = fraction === 0 ? '0' : '1';
  });
  $('timer-head').setAttribute('transform', `rotate(${elapsed/duration*360} 160 160)`);
  $('play-stage').classList.toggle('urgent', remaining <= 2000 && state === 'playing');
}
function tick(now) { if (state !== 'playing') return; remaining = Math.max(0, deadline - now); paintTime(); if (remaining <= 0) finishRound(); else frame = requestAnimationFrame(tick); }
function press() {
  if (state !== 'playing') return;
  if (performance.now() >= deadline) { remaining = 0; paintTime(); finishRound(); return; }
  presses++; $('press-count').textContent = `${presses} dokunuş`; pop($('press-button')); sound(170 + presses * 24, .055, 'sine', .07);
  if (presses > deck[index].expected) finishRound();
}
function finishRound() {
  if (state !== 'playing') return;
  cancelAnimationFrame(frame); state = 'feedback'; feedbackAt = performance.now(); const round = deck[index], correct = judge(round, presses);
  if (correct) { streak++; bestStreak = Math.max(bestStreak, streak); score += reward(streak); sound(620, .2); } else { lives--; streak = 0; sound(100, .22, 'triangle'); }
  history.push({ ...round, presses, correct });
  $('press-button').disabled = true; $('play-stage').classList.remove('urgent'); $('play-stage').classList.add(correct ? 'success' : 'failed');
  $('time-whole').className = 'time-whole'; $('time-whole').textContent = correct ? '✓' : '×';
  $('instruction').textContent = correct ? 'Tamam.' : 'Olmadı.'; $('round-feedback').classList.toggle('wrong', !correct);
  $('round-feedback').innerHTML = correct ? '' : `<p>Gereken ${round.expected} · Sen ${presses}</p>`;
  $('next-button').hidden = false;
  const label = lives === 0 || index === deck.length - 1 ? 'SONUÇ' : 'DEVAM';
  $('next-button').innerHTML = `<span>${label} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></span>`;
  segmentNodes.forEach(node => { node.style.strokeDashoffset = 0; node.style.opacity = 1; });
  updateHUD();
  // Focus stays off Continue; rapid additional taps cannot skip the feedback.
}
function advance() { if (state !== 'feedback' || performance.now() - feedbackAt < 400) return; if (lives === 0 || index === deck.length - 1) results(); else { index++; nextRound(); } }
function pause() {
  if (state !== 'playing' && state !== 'feedback') return;
  pausedFrom = state; if (state === 'playing') { remaining = Math.max(0, deadline - performance.now()); cancelAnimationFrame(frame); }
  state = 'paused'; $('pause-dialog').showModal();
}
function resume() { if (state !== 'paused') return; $('pause-dialog').close(); state = pausedFrom; if (state === 'playing') { deadline = performance.now() + remaining; frame = requestAnimationFrame(tick); $('press-button').focus({preventScroll:true}); } else $('next-button').focus(); }
function home() { cancelAnimationFrame(frame); state = 'home'; document.querySelectorAll('dialog[open]').forEach(d => d.close()); screen('home'); updateBest(); $('start-button').focus({preventScroll:true}); }
function results() {
  state = 'results'; cancelAnimationFrame(frame); const complete = index === deck.length - 1 && lives > 0;
  const correct = history.filter(r => r.correct).length, best = Number(read(bestKey()) || 0);
  if (score > best) save(bestKey(), score);
  $('result-title').textContent = complete ? '25 TUR TAMAMLANDI' : 'BİR DAHA?';
  $('result-score').textContent = score.toLocaleString('tr-TR'); $('result-correct').textContent = `${correct}/${history.length}`; $('result-streak').textContent = bestStreak;
  $('record-message').textContent = score > best ? '✦ YENİ REKOR' : best ? `REKOR ${best.toLocaleString('tr-TR')}` : '';
  $('review-list').innerHTML = history.map((r, i) => `<div class="review-item"><span>${String(i + 1).padStart(2,'0')}</span><div><b>${r.text}</b><p>${r.why} Senin dokunuşun: ${r.presses}.</p></div><span class="mark ${r.correct ? '' : 'wrong'}">${r.correct ? '✓' : '×'}</span></div>`).join('');
  $('share-status').textContent = ''; screen('results'); $('retry-button').focus({preventScroll:true});
}
$('start-button').addEventListener('click', start); $('retry-button').addEventListener('click', start); $('home-button').addEventListener('click', () => { home(); showDialog('settings-dialog'); });
$('press-button').addEventListener('click', press); $('next-button').addEventListener('click', advance); $('pause-button').addEventListener('click', pause); $('resume-button').addEventListener('click', resume); $('quit-button').addEventListener('click', home);
$('pause-dialog').addEventListener('cancel', e => { e.preventDefault(); resume(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
window.addEventListener('blur', () => { if (state === 'playing') pause(); });
document.addEventListener('keydown', e => {
  if (document.querySelector('dialog[open]')) return;
  if (e.code === 'Escape') { pause(); return; }
  if (e.code !== 'Space' && e.code !== 'Enter') return;
  if (state === 'playing' && (e.target === document.body || e.target === $('press-button'))) { e.preventDefault(); if (!e.repeat) press(); }
});
document.addEventListener('keyup', e => { if ((e.code === 'Space' || e.code === 'Enter') && e.target === $('press-button')) e.preventDefault(); });
function showDialog(id) { if (state === 'playing' || state === 'feedback') pause(); $(id).showModal(); }
$('help-button').addEventListener('click', () => showDialog('help-dialog')); $('settings-button').addEventListener('click', () => { if (state === 'results') home(); showDialog('settings-dialog'); }); $('review-button').addEventListener('click', () => showDialog('review-dialog')); $('about-button').addEventListener('click', () => showDialog('about-dialog'));
document.querySelectorAll('.dialog-close,.dialog-close-action').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog:not(#pause-dialog)').forEach(dialog => dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } }));
$('share-button').addEventListener('click', async () => {
  const text = `BAS / BEKLE’de ${modeName()} · ${tempos[tempo].name}: ${score} puan, ${history.filter(r => r.correct).length}/${history.length} doğru tur.`;
  const url = new URL('./', location.href).href;
  try { if (navigator.share) { await navigator.share({title:'BAS / BEKLE', text, url}); $('share-status').textContent = 'Paylaşıldı.'; } else { await navigator.clipboard.writeText(`${text}\n${url}`); $('share-status').textContent = 'Bağlantı kopyalandı.'; } } catch(e) { if (e.name !== 'AbortError') $('share-status').textContent = 'Paylaşım açılamadı.'; }
});
updateBest();
