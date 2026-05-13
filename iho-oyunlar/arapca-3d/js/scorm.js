// SCORM 1.2 ince sarmalayıcı — LMS yoksa sessizce no-op olur
(function (global) {
  'use strict';

  let api = null;

  function findApi(win) {
    let i = 0;
    while (win && win.API == null && win.parent && win.parent !== win && i < 8) {
      i++;
      win = win.parent;
    }
    return win ? win.API : null;
  }

  function init() {
    try {
      api = findApi(window);
      if (!api && window.opener && !window.opener.closed) {
        api = findApi(window.opener);
      }
      if (api && typeof api.LMSInitialize === 'function') {
        api.LMSInitialize('');
        return true;
      }
    } catch (e) {}
    return false;
  }

  function set(key, val) {
    try {
      if (api) api.LMSSetValue(key, String(val));
    } catch (e) {}
  }

  function commit() {
    try { if (api) api.LMSCommit(''); } catch (e) {}
  }

  function finish() {
    try {
      if (api) {
        api.LMSCommit('');
        api.LMSFinish('');
      }
    } catch (e) {}
  }

  function setScore(raw, max, min) {
    set('cmi.core.score.raw', raw);
    set('cmi.core.score.max', max == null ? 100 : max);
    set('cmi.core.score.min', min == null ? 0 : min);
    commit();
  }

  function setStatus(status) {
    // passed / completed / failed / incomplete / browsed / not attempted
    set('cmi.core.lesson_status', status);
    commit();
  }

  global.SCORM = { init, set, commit, finish, setScore, setStatus };

  // Sayfa kapanırken otomatik kapat
  window.addEventListener('beforeunload', finish);
})(window);
