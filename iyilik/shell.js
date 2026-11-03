export function closeShellMenu(){
 const side=document.getElementById('sidebar');if(!side)return;
 side.classList.remove('open');side.inert=true;
 document.getElementById('overlay').classList.remove('show');
 document.getElementById('menu-button').setAttribute('aria-expanded','false');
 document.body.classList.remove('menu-open');
 document.querySelector('.shell').inert=false;
 document.querySelector('.site-header').inert=false;
}
export function renderShell({books,e,icon,onSearch}){
 const links=[['home','Ana sayfa'],['konular','Keşfet'],['boyama','Boyama atölyesi'],['agac','Keşif defterim']];
 document.getElementById('app').innerHTML=`
 <header class="site-header"><div class="header-inner">
 <a class="brand" href="#home" aria-label="İyiliklerle Büyüyorum ana sayfa"><img src="assets/icon.svg" alt=""><span>İyiliklerle<br>Büyüyorum<small>KEŞİF DÜNYASI</small></span></a>
 <nav class="primary-nav" aria-label="Ana menü">${links.map(([id,t])=>`<a href="#${id}" data-nav="${id}">${t}</a>`).join('')}</nav>
 <div class="header-actions"><button class="header-icon" id="search-toggle" aria-label="Konularda ara" aria-expanded="false" aria-controls="header-search">${icon('search')}</button><a class="parent-link" href="#buyukler">${icon('people')}<span>Büyükler için</span></a><button class="header-icon menu-toggle" id="menu-button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="sidebar">${icon('menu')}</button></div></div>
 <div class="header-search" id="header-search" hidden><form id="global-search" role="search"><label for="global-query">Bugün neyi merak ediyorsun?</label><div><input id="global-query" type="search" placeholder="Abdest, paylaşmak, sofra…" aria-label="Bütün konularda ara"><button class="button small" type="submit">Konuyu bul ${icon('arrow')}</button></div></form></div>
 <div class="header-reading-line" aria-hidden="true"><span id="side-progress"></span></div></header>
 <div class="overlay" id="overlay"></div><aside class="mobile-drawer" id="sidebar" role="dialog" aria-modal="true" inert aria-label="Gezinme menüsü"><button id="close-drawer" aria-label="Menüyü kapat">×</button><div class="drawer-title">Keşfe devam et.</div><nav>${links.map(([id,t])=>`<a href="#${id}" data-nav="${id}">${t}${icon('arrow')}</a>`).join('')}</nav><small>ÜÇ KİTAP, BİR YOLCULUK</small>${books.map(b=>`<a class="drawer-book" href="#kitap/${b.id}"><span>0${b.id}</span>${e(b.short)}</a>`).join('')}<a class="drawer-parent" href="#buyukler">Birlikte öğrenme rehberi</a></aside>
 <div class="shell"><main id="main" tabindex="-1"></main><footer class="site-footer"><div class="footer-top"><a class="brand" href="#home"><img src="assets/icon.svg" alt=""><span>İyiliklerle<br>Büyüyorum<small>HER SAYFA, YENİ BİR KEŞİF.</small></span></a><p>Kitapla başlayan merak,<br>hayatın içinde büyür.</p><div><a href="#buyukler">Büyükler rehberi</a><a href="#kaynaklar">Kaynakça</a><a href="#karekod">Kitap karekodları</a><a href="#gizlilik">Gizlilik</a></div></div><div class="footer-bottom"><span>İyiliklerle Büyüyorum · Rauf Enç</span><span id="side-count"></span><span>İlerlemen bu cihazda saklanır.</span></div></footer></div>`;
 const search=document.getElementById('header-search'),toggle=document.getElementById('search-toggle');
 const closeSearch=()=>{search.hidden=true;toggle.setAttribute('aria-expanded','false')};
 toggle.onclick=()=>{search.hidden=!search.hidden;toggle.setAttribute('aria-expanded',String(!search.hidden));if(!search.hidden)document.getElementById('global-query').focus()};
 document.getElementById('global-search').onsubmit=ev=>{ev.preventDefault();const text=document.getElementById('global-query').value;closeSearch();onSearch(text)};
 document.getElementById('menu-button').onclick=()=>{const side=document.getElementById('sidebar');const open=!side.classList.contains('open');closeShellMenu();if(open){side.classList.add('open');side.inert=false;document.getElementById('overlay').classList.add('show');document.getElementById('menu-button').setAttribute('aria-expanded','true');document.body.classList.add('menu-open');document.querySelector('.shell').inert=true;document.querySelector('.site-header').inert=true;document.getElementById('close-drawer').focus()}};
 document.querySelectorAll('#sidebar a').forEach(a=>a.addEventListener('click',closeShellMenu));
 document.getElementById('close-drawer').onclick=()=>{closeShellMenu();document.getElementById('menu-button').focus()};
 document.getElementById('overlay').onclick=closeShellMenu;
 document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){if(!search.hidden){closeSearch();toggle.focus()}if(document.getElementById('sidebar').classList.contains('open')){closeShellMenu();document.getElementById('menu-button').focus()}}});
 document.getElementById('sidebar').addEventListener('keydown',ev=>{if(ev.key!=='Tab')return;const controls=[...document.getElementById('sidebar').querySelectorAll('a,button')],first=controls[0],last=controls.at(-1);if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus()}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus()}});
 document.querySelector('.skip').onclick=ev=>{ev.preventDefault();document.getElementById('main').focus()};
}
