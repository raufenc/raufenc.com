/* Oyun açılış yönergesi — tamamen görsel (Arapça + emoji), Latin/Türkçe YOK.
   Her oyun sayfasına <script src="/7sinif/oyunlar/intro.js" defer></script> ile eklenir.
   Oyunun türünü/adını okuyup büyük görsel bir "nasıl oynanır" kartı gösterir. */
(function(){
  'use strict';
  if (window.__introShown) return;
  window.__introShown = true;

  // Oyun türünü URL / başlık / window değişkeninden tahmin et → görsel tarif seç
  function detectType(){
    var h = (location.hash || '').toLowerCase();
    var p = (location.pathname || '').toLowerCase();
    var id = (window.IHO_GAME_ID || '') + '';
    var hay = (p + ' ' + h + ' ' + id).toLowerCase();
    var map = [
      ['na1|na2|na3|na4|mawaqit|namaz|clock|daire|circle', 'place'],
      ['eslestir|match\\.|mufradat|kelime-kart|flashcard|g001|g002', 'match'],
      ['hafiza|memory|g012', 'memory'],
      ['siniflandir|meyve|sebze|vasita|category|g003|sort', 'sort'],
      ['cumle|sentence|order|g008', 'order'],
      ['bosluk|fillblank|naks|naqis|g007', 'fill'],
      ['fiyat|price|sayi|g005', 'quiz'],
      ['diyalog|dialog|hiwar|g009|g010', 'dialogue'],
      ['avi|search|maqlub|typing|g011', 'search'],
      ['balon|balloon|nisanci|defa', 'pop'],
      ['cark|wheel|hazz', 'wheel'],
      ['adres|pazar|suuq|alisveris|shopping|list|g004', 'shop']
    ];
    for (var i=0;i<map.length;i++){ if(new RegExp(map[i][0]).test(hay)) return map[i][1]; }
    return 'quiz';
  }

  // Tür → görsel tarif (sadece emoji + ok + kısa Arapça)
  var DEMOS = {
    match:    ['👆', 'كَلِمَة', '➡️', '🖼️'],
    memory:   ['🃏', '👆', '🃏', '🟰'],
    sort:     ['كَلِمَة', '➡️', '📂'],
    order:    ['👆', '👆', '👆', '➡️', '📜'],
    fill:     ['◻️', '➡️', '✅'],
    quiz:     ['❓', '➡️', '👆', '✅'],
    dialogue: ['💬', '👆', '➡️', '✅'],
    search:   ['🔤', '👆', '➡️', '✅'],
    pop:      ['🖼️', '➡️', '💥', 'كَلِمَة'],
    wheel:    ['🎡', '➡️', '👆', '✅'],
    place:    ['🖼️', '➡️', '👆', '✅'],
    shop:     ['🖼️', '➡️', '🔎', 'كَلِمَة']
  };

  // Sadece GÖRÜNÜR ve dolu elemanı, öncelik sırasıyla bul (gizli sonuç ekranlarını atla)
  function visible(e){ return e && e.offsetParent !== null && e.getClientRects().length>0; }
  function pick(){
    var sels = ['#gameTitle','.u3-title','.start-subtitle','.start-title','.menu-title','h1','h2'];
    for (var i=0;i<sels.length;i++){
      var nodes = document.querySelectorAll(sels[i]);
      for (var j=0;j<nodes.length;j++){
        var e = nodes[j];
        if (visible(e) && e.textContent && e.textContent.trim().length>1) return e.textContent;
      }
    }
    // görünür yoksa #gameTitle'a düş
    var g = document.querySelector('#gameTitle, h1');
    return g ? g.textContent : '';
  }
  function bigEmoji(){
    // önce oyun başlığında, sonra sayfada belirgin bir emoji ara
    var srcs = [pick(), (document.querySelector('.start-icon, .ii-src, #gameKicker')||{}).textContent || ''];
    for (var i=0;i<srcs.length;i++){
      var m = (srcs[i]||'').match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
      if (m) return m[0];
    }
    return '🎮';
  }
  function arabicName(){
    var t = pick();
    t = t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F300}-\u{1F9FF}]/gu,'')
         .replace(/[A-Za-z0-9çÇğĞıİöÖşŞüÜ.\-—|()/#؟]+/g,'').replace(/\s+/g,' ').trim();
    return t || 'لُعْبَة';
  }

  function build(){
    var type = detectType();
    var demo = DEMOS[type] || DEMOS.quiz;
    var ov = document.createElement('div');
    ov.id = 'iho-intro';
    var demoHTML = demo.map(function(x){
      var isAr = /[؀-ۿ]/.test(x);
      return '<span class="ii-step '+(isAr?'ii-ar':'')+'">'+x+'</span>';
    }).join('');
    ov.innerHTML =
      '<div class="ii-box">'+
        '<div class="ii-emoji">'+bigEmoji()+'</div>'+
        '<div class="ii-name">'+arabicName()+'</div>'+
        '<div class="ii-demo">'+demoHTML+'</div>'+
        '<div class="ii-goal">👆 ✅ &nbsp; ⭐⭐⭐</div>'+
        '<button class="ii-start" type="button">▶ اِبْدَأ</button>'+
      '</div>';
    document.body.appendChild(ov);
    var css = document.createElement('style');
    css.textContent =
      '#iho-intro{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;'+
      'background:rgba(8,5,20,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:iiFade .25s ease}'+
      '@keyframes iiFade{from{opacity:0}to{opacity:1}}'+
      '@keyframes iiPop{from{opacity:0;transform:translateY(24px) scale(.94)}to{opacity:1;transform:none}}'+
      '#iho-intro .ii-box{background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(255,255,255,.03));'+
      'border:1px solid rgba(255,255,255,.18);border-radius:28px;padding:38px 30px 30px;max-width:440px;width:88%;'+
      'text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.5);animation:iiPop .35s cubic-bezier(.16,1,.3,1)}'+
      '#iho-intro .ii-emoji{font-size:88px;line-height:1;margin-bottom:10px;filter:drop-shadow(0 8px 20px rgba(0,0,0,.4))}'+
      "#iho-intro .ii-name{font-family:'Arakom',Arial,sans-serif;font-size:34px;font-weight:bold;color:#fff;direction:rtl;margin-bottom:22px;line-height:1.3}"+
      '#iho-intro .ii-demo{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;'+
      'background:rgba(0,0,0,.25);border-radius:18px;padding:16px 14px;margin-bottom:14px}'+
      '#iho-intro .ii-step{font-size:32px;line-height:1}'+
      "#iho-intro .ii-step.ii-ar{font-family:'Arakom',Arial,sans-serif;font-size:22px;color:#FFD54F;direction:rtl;font-weight:bold}"+
      '#iho-intro .ii-goal{font-size:26px;letter-spacing:4px;margin-bottom:24px;opacity:.92}'+
      '#iho-intro .ii-start{background:linear-gradient(135deg,#f7971e,#ffd200);color:#1a1035;border:none;'+
      "font-family:'Arakom',Arial,sans-serif;font-size:26px;font-weight:bold;padding:16px 46px;border-radius:100px;"+
      'cursor:pointer;box-shadow:0 10px 30px rgba(247,151,30,.4);transition:transform .2s}'+
      '#iho-intro .ii-start:hover{transform:scale(1.06)}'+
      '#iho-intro .ii-start:active{transform:scale(.97)}';
    document.head.appendChild(css);

    function close(){ ov.style.animation='iiFade .2s ease reverse'; setTimeout(function(){ ov.remove(); }, 180); }
    ov.querySelector('.ii-start').addEventListener('click', function(e){ e.stopPropagation(); close(); });
    // overlay'a (kutu dışı) tıkla → kapat
    ov.addEventListener('click', function(e){ if(e.target===ov) close(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(build, 500); });
  else setTimeout(build, 500);
})();
