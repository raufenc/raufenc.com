// Arapça TTS — Web Speech API üzerinden
// Tarayıcıda ar-SA ya da ar-* sesi varsa onu kullanır.
(function (global) {
  'use strict';

  let voices = [];
  let arVoice = null;
  let ready = false;

  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    voices = window.speechSynthesis.getVoices() || [];
    arVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ar')) || null;
    ready = true;
  }

  function init() {
    if (!('speechSynthesis' in window)) return;
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function speak(text, opts) {
    if (!('speechSynthesis' in window)) return false;
    opts = opts || {};
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || 'ar-SA';
      u.rate = opts.rate || 0.85;
      u.pitch = opts.pitch || 1;
      u.volume = opts.volume == null ? 1 : opts.volume;
      if (arVoice && (!opts.lang || opts.lang.startsWith('ar'))) {
        u.voice = arVoice;
      }
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  function speakArabic(text) {
    return speak(text, { lang: 'ar-SA', rate: 0.8 });
  }

  function speakTurkish(text) {
    return speak(text, { lang: 'tr-TR', rate: 1 });
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  function hasArabicVoice() {
    return arVoice !== null;
  }

  global.TTS = { init, speak, speakArabic, speakTurkish, isAvailable, hasArabicVoice };
})(window);
