/* ============================================================
   TTS — Web Speech API wrapper for Persian
   Completely free, runs in browser, no API needed
   ============================================================ */
const FarsTTS = (() => {
  let synth = null;
  let persianVoice = null;
  let ready = false;

  function init() {
    if (!('speechSynthesis' in window)) return;
    synth = window.speechSynthesis;
    findVoice();
    /* Voices may load async */
    synth.onvoiceschanged = findVoice;
  }

  function findVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    /* Try Persian first, then Arabic as fallback */
    persianVoice = voices.find(v => v.lang.startsWith('fa')) ||
                   voices.find(v => v.lang === 'fa-IR') ||
                   voices.find(v => v.lang.startsWith('ar')) ||
                   null;
    ready = true;
  }

  function speak(text, opts = {}) {
    if (!synth) return;
    const settings = FarsStorage.getSettings();
    if (!settings.ttsEnabled && !opts.force) return;

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'fa-IR';
    if (persianVoice) utter.voice = persianVoice;
    utter.rate = opts.rate || settings.ttsRate;
    utter.pitch = opts.pitch || 1;
    utter.volume = opts.volume || 1;

    if (opts.onEnd) utter.onend = opts.onEnd;
    if (opts.onStart) utter.onstart = opts.onStart;

    synth.speak(utter);
    return utter;
  }

  function speakSlow(text, opts = {}) {
    return speak(text, { ...opts, rate: 0.6 });
  }

  function stop() {
    if (synth) synth.cancel();
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  function getVoiceName() {
    return persianVoice ? persianVoice.name : 'Varsayilan';
  }

  /* Init on load */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { speak, speakSlow, stop, isAvailable, getVoiceName, init };
})();
