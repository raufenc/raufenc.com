(function(){
  'use strict';
  var errors = [];
  window.addEventListener('error', function(e) {
    var info = {type:'error', msg:e.message, file:e.filename, line:e.lineno, col:e.colno, time:new Date().toISOString()};
    errors.push(info);
    if (errors.length <= 20) console.error('[Site Hata]', info.msg, info.file + ':' + info.line);
  });
  window.addEventListener('unhandledrejection', function(e) {
    var reason = e.reason ? (e.reason.message || String(e.reason)) : 'Bilinmeyen';
    var info = {type:'promise', msg:reason, time:new Date().toISOString()};
    errors.push(info);
    if (errors.length <= 20) console.error('[Promise Hata]', reason);
  });
  window.__siteErrors = errors;
})();
