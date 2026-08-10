/* icons.js — Satır içi SVG ikon seti.
   <use href="#id"> kullanılmıyor: sayfada <base> + hash yönlendirme birlikte olduğunda
   parça (fragment) referansları bazı tarayıcılarda çözülemiyor. Her ikon tam SVG olarak basılır. */
(function(){
  var P = {
    book:      '<path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5h-5A1.5 1.5 0 0 1 3 16z"/><path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H15a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5h5A1.5 1.5 0 0 0 21 16z"/>',
    bookOpen:  '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H17a3 3 0 0 1 3 3v11.5a1.5 1.5 0 0 1-1.5 1.5H7a3 3 0 0 1-3-3z"/><path d="M20 17H7a3 3 0 0 0-3 3"/><path d="M8 8h8M8 11.5h5"/>',
    brain:     '<path d="M9.5 4A2.5 2.5 0 0 0 7 6.5 2.5 2.5 0 0 0 5 9a2.5 2.5 0 0 0 .6 1.6A2.6 2.6 0 0 0 5 12.4 2.5 2.5 0 0 0 7 15a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 12 20V5.5A1.5 1.5 0 0 0 10.5 4z"/><path d="M14.5 4A2.5 2.5 0 0 1 17 6.5 2.5 2.5 0 0 1 19 9a2.5 2.5 0 0 1-.6 1.6A2.6 2.6 0 0 1 19 12.4 2.5 2.5 0 0 1 17 15a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 12 20"/>',
    star:      '<path d="m12 3.6 2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 17l-5.25 2.76 1-5.86L3.5 9.76l5.9-.86z"/>',
    user:      '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    gamepad:   '<path d="M7.5 8h9a5 5 0 0 1 4.9 4.05l.5 3A3.2 3.2 0 0 1 18.75 19c-.9 0-1.74-.44-2.25-1.2L15.5 16.5h-7L7.5 17.8A2.7 2.7 0 0 1 5.25 19a3.2 3.2 0 0 1-3.15-3.95l.5-3A5 5 0 0 1 7.5 8z"/><path d="M7 11.5v2.5M5.75 12.75h2.5"/><circle cx="16" cy="12" r=".6" class="dot"/><circle cx="18" cy="14" r=".6" class="dot"/>',
    map:       '<path d="M9 4 3.6 6.2A1 1 0 0 0 3 7.1v11.4a1 1 0 0 0 1.4.93L9 17.5l6 2.5 5.4-2.2a1 1 0 0 0 .6-.93V5.47a1 1 0 0 0-1.4-.92L15 6.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    search:    '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    rocket:    '<path d="M12.5 3.5c3.2 1 5.6 3.9 6 7.4l.2 2-4.2 4.2-4.4-4.4L14.3 8.5"/><path d="M9.9 12.7 6.6 9.4l2-2 3.3.5"/><path d="M11.3 14.1l.5 3.3-2 2-3.3-3.3"/><path d="M6.5 17.5c-1 1-1.3 3-1.3 3s2-.3 3-1.3"/>',
    clock:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
    calendar:  '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3"/>',
    list:      '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.75" cy="6.5" r="1.1" class="dot"/><circle cx="4.75" cy="12" r="1.1" class="dot"/><circle cx="4.75" cy="17.5" r="1.1" class="dot"/>',
    package:   '<path d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2z"/><path d="M4 7.2 12 11.5l8-4.3M12 11.5V21"/>',
    tool:      '<path d="M14.2 6.3a4 4 0 0 1 5.3 5.3l-1.9-1.9-1.7.5-.5-1.7z"/><path d="m15 11.4-8 8a2.3 2.3 0 0 1-3.3-3.3l8-8"/>',
    chart:     '<path d="M4 20h16"/><path d="M7 20v-6M12 20V6M17 20v-9"/>',
    target:    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9" class="dot"/>',
    layers:    '<path d="m12 3 8.5 4.5L12 12 3.5 7.5z"/><path d="m4.5 12 7.5 4 7.5-4M4.5 16.5 12 20.5l7.5-4"/>',
    check:     '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.2 2.4 2.4 4.6-4.9"/>',
    alert:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.8v4.8M12 16.2h.01"/>',
    file:      '<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z"/><path d="M13.5 3v4a1.5 1.5 0 0 0 1.5 1.5h4"/><path d="M8.5 13h7M8.5 16.5h4.5"/>',
    compare:   '<path d="M12 4v16"/><path d="M7.5 8H4l3.5 6L11 8z"/><path d="M16.5 8H13l3.5 6L20 8z"/>',
    arrowRight:'<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
    sun:       '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
    moon:      '<path d="M20.5 13.3A8.6 8.6 0 0 1 10.7 3.5a8.6 8.6 0 1 0 9.8 9.8z"/>',
    menu:      '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };

  /** İkonu satır içi SVG dizesi olarak döndürür. */
  window.ICO = function(name, size){
    var d = P[name];
    if (!d) return '';
    var s = size || 24;
    return '<svg class="ico" viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true" focusable="false">' + d + '</svg>';
  };
  window.ICO.has = function(name){ return !!P[name]; };
})();
