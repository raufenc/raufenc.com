/* Ortak: nav, reveal, kopyala, toast, SW */
(function(){
  const here=location.pathname.split("/").pop()||"index.html";
  const links=[
    ["index.html","Yolculuk"],
    ["laboratuvar.html","Laboratuvar"],
    ["atolye.html","Atölye"],
    ["tersine.html","Tersine Mühendislik"],
    ["test.html","Ölçü Testi"],
  ];
  const nav=document.createElement("nav");
  nav.className="site";
  nav.innerHTML=`<div class="wrap">
    <a class="logo" href="index.html">raufenc<span>.com</span></a>
    <button id="menuBtn" aria-label="Menü">☰</button>
    <ul id="navList">
      ${links.map(l=>`<li><a href="${l[0]}" class="${here===l[0]?"act":""}">${l[1]}</a></li>`).join("")}
      <li><a class="cta" href="sunum.html">▶ Sunum</a></li>
    </ul>
  </div>`;
  document.body.prepend(nav);
  nav.querySelector("#menuBtn").onclick=()=>nav.querySelector("#navList").classList.toggle("open");
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.querySelector("#navList").classList.remove("open")));

  const t=document.createElement("div");t.id="toast";document.body.appendChild(t);
  window.toast=(msg)=>{t.textContent=msg;t.classList.add("on");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("on"),2200)};
  window.copyText=async(txt,msg)=>{try{await navigator.clipboard.writeText(txt);toast(msg||"Panoya kopyalandı ✓")}catch(e){
    const ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();toast(msg||"Panoya kopyalandı ✓")}};

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.12});
  window.addEventListener("DOMContentLoaded",()=>document.querySelectorAll(".reveal").forEach(el=>io.observe(el)));
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  if("serviceWorker" in navigator && location.protocol.startsWith("http")){
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  }
})();
