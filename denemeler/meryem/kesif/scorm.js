/* Exploration adapter. Activity state lives only in the open page. */
(function () {
  'use strict';
  const runtime = window.EbaScorm;
  window.LearningBridge = {
    connected: runtime.connected, save: runtime.commit,
    record: (index, response, correct, latency) => runtime.record(index, response, latency),
    reset: runtime.beginAttempt, finish: runtime.finish
  };
})();
