/* Shared SCORM 1.2 runtime. Fresh activity on each launch; individual first
   responses determine the grade. Two-player games remain ungraded practice. */
(function () {
  'use strict';
  const questions = window.ACTIVITIES[0].questions;
  let api = null, initialized = false, finished = false, readOnly = false;
  let started = Date.now(), attempt = 0, interactionCount = 0;
  let answers = Array(questions.length).fill(null);
  const errors = [], sessionId = Date.now().toString(36);
  function discover(start) {
    for (let win = start, depth = 0; win && depth < 50; depth++) {
      try {
        if (win.API && typeof win.API.LMSInitialize === 'function') return win.API;
        if (!win.parent || win.parent === win) break;
        win = win.parent;
      } catch (_) { break; }
    }
    return null;
  }
  function report(method, key, code, optional) {
    errors.push({ method, key, code: String(code), optional });
    if (errors.length > 30) errors.shift();
    if (!optional) window.dispatchEvent(new CustomEvent('learning-save-error'));
  }
  function call(method, args, optional = false) {
    if (!api || typeof api[method] !== 'function') return null;
    try {
      const result = api[method].apply(api, args);
      const code = typeof api.LMSGetLastError === 'function' ? String(api.LMSGetLastError()) : '0';
      if (code !== '0' || (method !== 'LMSGetValue' && String(result) !== 'true')) {
        report(method, method === 'LMSSetValue' || method === 'LMSGetValue' ? args[0] : '', code, optional);
        return null;
      }
      return result;
    } catch (_) { report(method, '', 'exception', optional); return null; }
  }
  const active = () => initialized && !finished && !readOnly;
  const set = (key, value, optional = false) => active() && call('LMSSetValue', [key, String(value)], optional) !== null;
  const get = (key, optional = false) => call('LMSGetValue', [key], optional);
  function duration(ms) {
    const c = Math.min(3599999999, Math.max(0, Math.floor(ms / 10)));
    return String(Math.floor(c / 360000)).padStart(4, '0') + ':' +
      String(Math.floor(c / 6000) % 60).padStart(2, '0') + ':' +
      String(Math.floor(c / 100) % 60).padStart(2, '0') + '.' + String(c % 100).padStart(2, '0');
  }
  function commit() {
    if (!active()) return;
    set('cmi.core.session_time', duration(Date.now() - started));
    call('LMSCommit', ['']);
  }
  function publish() {
    if (!active()) return;
    const count = answers.filter(a => a !== null).length;
    set('cmi.core.score.min', 0);
    set('cmi.core.score.max', 100);
    set('cmi.core.score.raw', Math.round(answers.filter(a => a && a.correct).length / questions.length * 100));
    // No invented pass threshold: completing all five questions is completion.
    set('cmi.core.lesson_status', count === questions.length ? 'completed' : 'incomplete');
    set('cmi.core.lesson_location', 'answered-' + count + '-of-' + questions.length);
    commit();
  }
  function beginAttempt() {
    answers = Array(questions.length).fill(null);
    attempt++;
    set('cmi.suspend_data', '');
    set('cmi.core.exit', '');
    publish();
  }
  function init() {
    if (initialized || finished) return;
    api = discover(window);
    if (!api) { try { if (window.opener) api = discover(window.opener); } catch (_) {} }
    if (!api) return;
    initialized = String(call('LMSInitialize', [''])) === 'true';
    if (!initialized) return;
    readOnly = ['browse', 'review'].includes(get('cmi.core.lesson_mode', true));
    interactionCount = parseInt(get('cmi.interactions._count', true), 10) || 0;
    beginAttempt();
  }
  function record(index, response, latency) {
    const q = questions[index];
    if (!q || !Number.isInteger(response) || response < 0 || response >= q.options.length || answers[index] !== null) return;
    answers[index] = { response, correct: response === q.correct };
    if (active()) {
      const prefix = 'cmi.interactions.' + interactionCount;
      // Interaction data is optional in SCORM 1.2. Core score still works when
      // an LMS implements only the mandatory data model.
      if (set(prefix + '.id', 's013-' + sessionId + '-' + attempt + '-q' + (index + 1), true)) {
        interactionCount++;
        set(prefix + '.type', 'choice', true);
        set(prefix + '.correct_responses.0.pattern', String.fromCharCode(97 + q.correct), true);
        set(prefix + '.student_response', String.fromCharCode(97 + response), true);
        set(prefix + '.result', answers[index].correct ? 'correct' : 'wrong', true);
        set(prefix + '.weighting', 1, true);
        set(prefix + '.latency', duration(Number(latency) || 0), true);
      }
    }
    publish();
  }
  function finish() {
    if (!initialized || finished) return;
    set('cmi.core.exit', '');
    commit();
    finished = true;
    call('LMSFinish', ['']);
  }
  window.EbaScorm = {
    init, beginAttempt, record, commit, finish, complete: publish,
    connected: () => initialized && !finished,
    diagnostics: () => ({ connected: initialized && !finished, readOnly, errors: errors.slice() })
  };
  init();
  window.addEventListener('pagehide', finish);
  window.addEventListener('beforeunload', finish);
  window.addEventListener('pageshow', event => { if (event.persisted) window.location.reload(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) commit(); });
  const heartbeat = window.setInterval(commit, 15000);
  window.addEventListener('pagehide', () => window.clearInterval(heartbeat));
})();
