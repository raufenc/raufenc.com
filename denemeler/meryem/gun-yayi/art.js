/* Çizimler: gökyüzü renkleri, zaman simgeleri, aile ve bina resimleri. Hepsi kodla (SVG) — yüzsüz figürler. */
(function(){
'use strict';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const toHex=c=>'#'+c.map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,'0')).join('');
const mix=(a,b,k)=>{const A=hex(a),B=hex(b);return toHex(A.map((v,i)=>v+(B[i]-v)*k));};

/* t: 0 şafak öncesi → .5 öğle → 1 gece (RTL: sağdan sola akar) */
const STOPS=[
 [0.00,'#0b1033','#1b1f5e','#3a2a6e'],
 [0.07,'#1d2a6b','#7a4a9e','#f08a6c'],
 [0.16,'#5a9fe6','#ffc58a','#ffe6b8'],
 [0.34,'#3f98ee','#7ec8f5','#dcf2ff'],
 [0.50,'#2a86e8','#6cc3f7','#d2effe'],
 [0.66,'#3a8be0','#8fc9ee','#ffeccb'],
 [0.80,'#3b5fb0','#e8896b','#ffc27a'],
 [0.89,'#1f2a6d','#7b4a8e','#e0785e'],
 [1.00,'#070b27','#121a4a','#2a2a63']
];
function skyAt(t){
  t=clamp(t);
  let i=0; while(i<STOPS.length-2&&t>STOPS[i+1][0]) i++;
  const a=STOPS[i],b=STOPS[i+1],k=clamp((t-a[0])/(b[0]-a[0]));
  const night=clamp((0.13-t)/0.09)+clamp((t-0.85)/0.08);
  return {top:mix(a[1],b[1],k),mid:mix(a[2],b[2],k),bot:mix(a[3],b[3],k),night:clamp(night)};
}
const sOf=t=>clamp((t-0.04)/0.92);

let uid=0;
function timeIcon(t){
  const c=skyAt(t),s=sOf(t),id='ti'+(++uid),n=c.night;
  const x=50+33*Math.cos(Math.PI*s),y=74-52*Math.sin(Math.PI*s);
  let stars='';
  if(n>.05){[[18,22],[40,12],[72,20],[84,40],[26,46],[60,30]].forEach(p=>stars+=`<circle cx="${p[0]}" cy="${p[1]}" r="1.6" fill="#fff" opacity="${.9*n}"/>`);}
  const orb = n>.5
    ? `<mask id="${id}m"><rect width="100" height="100" fill="#fff"/><circle cx="${x+7}" cy="${y-4}" r="13" fill="#000"/></mask><circle cx="${x}" cy="${y}" r="15" fill="#fff6cf" mask="url(#${id}m)"/>`
    : `<circle cx="${x}" cy="${y}" r="26" fill="url(#${id}g)" opacity=".85"/><circle cx="${x}" cy="${y}" r="13" fill="#ffd54a"/><circle cx="${x-3}" cy="${y-3}" r="5" fill="#fff3b0" opacity=".8"/>`;
  return `<svg viewBox="0 0 100 100" class="ico ico-time"><defs>
    <clipPath id="${id}c"><circle cx="50" cy="50" r="48"/></clipPath>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.top}"/><stop offset=".55" stop-color="${c.mid}"/><stop offset="1" stop-color="${c.bot}"/></linearGradient>
    <radialGradient id="${id}g"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/></radialGradient></defs>
    <g clip-path="url(#${id}c)"><rect width="100" height="100" fill="url(#${id}s)"/>${stars}${orb}
    <path d="M0 80 L12 70 L18 70 L22 62 L26 70 L40 70 L40 56 L44 50 L48 56 L48 70 L62 70 L66 64 L72 70 L88 70 L100 78 V100 H0Z" fill="${mix(c.bot,'#10163a',.62)}"/></g>
    <circle cx="50" cy="50" r="48" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2.5"/></svg>`;
}

const FAM={
 mother:`<svg viewBox="0 0 100 130" class="ico"><defs><linearGradient id="mo1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7668f"/><stop offset="1" stop-color="#a23a67"/></linearGradient></defs>
  <ellipse cx="50" cy="124" rx="34" ry="5" fill="#000" opacity=".12"/>
  <path d="M50 6c-19 0-30 13-30 31 0 11 3 19 3 28l-9 11c-5 7-7 17-7 49h86c0-32-2-42-7-49l-9-11c0-9 3-17 3-28C80 19 69 6 50 6z" fill="url(#mo1)"/>
  <ellipse cx="50" cy="40" rx="15" ry="18" fill="#f3cba6"/>
  <path d="M35 36c3-12 27-14 30 0-6-5-24-5-30 0z" fill="#d7668f" opacity=".0"/>
  <path d="M36 92l14 10 14-10" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
  <path d="M28 84c-6 12-8 24-8 40M72 84c6 12 8 24 8 40" stroke="#8d2c55" stroke-opacity=".35" stroke-width="2" fill="none"/></svg>`,
 father:`<svg viewBox="0 0 100 130" class="ico"><defs><linearGradient id="fa1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f86d6"/><stop offset="1" stop-color="#2b5aa8"/></linearGradient></defs>
  <ellipse cx="50" cy="124" rx="34" ry="5" fill="#000" opacity=".12"/>
  <path d="M18 128c0-30 4-44 18-50l14 8 14-8c14 6 18 20 18 50z" fill="url(#fa1)"/>
  <rect x="42" y="62" width="16" height="16" rx="6" fill="#e9b88f"/>
  <ellipse cx="50" cy="38" rx="17" ry="20" fill="#f0c19a"/>
  <path d="M33 34c0-16 10-24 17-24s17 8 17 24c-4-8-10-11-17-11s-13 3-17 11z" fill="#3b2a24"/>
  <path d="M42 84l8 12 8-12" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/></svg>`,
 sister:`<svg viewBox="0 0 100 130" class="ico"><defs><linearGradient id="si1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2a65a"/><stop offset="1" stop-color="#d9772b"/></linearGradient></defs>
  <ellipse cx="50" cy="124" rx="28" ry="5" fill="#000" opacity=".12"/>
  <g transform="translate(50 126) scale(.86) translate(-50 -126)">
  <path d="M50 20c-17 0-27 11-27 27 0 10 3 17 3 25l-7 9c-4 6-6 14-6 44h74c0-30-2-38-6-44l-7-9c0-8 3-15 3-25 0-16-10-27-27-27z" fill="url(#si1)"/>
  <ellipse cx="50" cy="52" rx="14" ry="16" fill="#f5cfae"/>
  <circle cx="50" cy="84" r="3" fill="#fff" opacity=".5"/><circle cx="50" cy="98" r="3" fill="#fff" opacity=".5"/></g></svg>`
};

const BLD={
 school:`<svg viewBox="0 0 240 230" class="ico bld-ico"><defs>
   <linearGradient id="sc1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbeed3"/><stop offset="1" stop-color="#ecd0a0"/></linearGradient>
   <linearGradient id="sc2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9674d"/><stop offset="1" stop-color="#b24a37"/></linearGradient></defs>
  <ellipse cx="120" cy="222" rx="112" ry="8" fill="#000" opacity=".16"/>
  <rect x="14" y="92" width="212" height="128" rx="6" fill="url(#sc1)"/>
  <rect x="14" y="92" width="212" height="10" fill="#c8a56b" opacity=".5"/>
  <polygon points="6,96 120,40 234,96" fill="url(#sc2)"/>
  <polygon points="92,96 120,66 148,96" fill="#fbeed3"/>
  <circle cx="120" cy="82" r="11" fill="#fff" stroke="#8a6d3b" stroke-width="3"/><path d="M120 76v6l4 3" stroke="#8a6d3b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <g class="win"><rect x="28" y="116" width="34" height="38" rx="4"/><rect x="72" y="116" width="34" height="38" rx="4"/><rect x="134" y="116" width="34" height="38" rx="4"/><rect x="178" y="116" width="34" height="38" rx="4"/>
  <rect x="28" y="166" width="34" height="38" rx="4"/><rect x="178" y="166" width="34" height="38" rx="4"/></g>
  <path d="M100 220v-42a20 20 0 0 1 40 0v42z" fill="#8a5a35"/><path d="M120 158v62" stroke="#6b4426" stroke-width="2"/><circle cx="112" cy="198" r="2.5" fill="#f1c24a"/><circle cx="128" cy="198" r="2.5" fill="#f1c24a"/>
  <rect x="222" y="30" width="4" height="100" fill="#8a8f9d"/><path d="M226 32l30 10-30 10z" fill="#e5176b" transform="translate(-30 0)"/>
  <ellipse cx="14" cy="204" rx="16" ry="22" fill="#5aa05a"/><ellipse cx="226" cy="206" rx="14" ry="19" fill="#4a9050"/></svg>`,
 market:`<svg viewBox="0 0 240 230" class="ico bld-ico"><defs>
   <linearGradient id="mk1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e3c0"/><stop offset="1" stop-color="#dfbf8a"/></linearGradient></defs>
  <ellipse cx="120" cy="222" rx="112" ry="8" fill="#000" opacity=".16"/>
  <rect x="18" y="70" width="204" height="150" rx="6" fill="url(#mk1)"/>
  <rect x="18" y="70" width="204" height="14" fill="#a97b45" opacity=".4"/>
  <rect x="30" y="94" width="180" height="46" rx="6" fill="#7a4c28"/><rect x="36" y="100" width="168" height="34" rx="4" fill="#fff" opacity=".12"/>
  <circle cx="60" cy="118" r="9" fill="#e5483b"/><circle cx="82" cy="118" r="9" fill="#f08a1c"/><circle cx="104" cy="118" r="9" fill="#7cc04d"/><circle cx="126" cy="118" r="9" fill="#e5483b"/><circle cx="148" cy="118" r="9" fill="#f6c32c"/><circle cx="170" cy="118" r="9" fill="#9c4fb0"/><circle cx="192" cy="118" r="9" fill="#f08a1c"/>
  <g>${Array.from({length:8},(_,i)=>`<path d="M${14+i*26.5} 40h26.5v34a13.25 13.25 0 0 1-26.5 0z" fill="${i%2?'#fff4e2':'#e0453a'}"/>`).join('')}</g>
  <rect x="10" y="30" width="220" height="14" rx="4" fill="#b8352c"/>
  <rect x="30" y="150" width="70" height="70" rx="4" fill="#c99a5a"/><rect x="36" y="156" width="58" height="26" rx="3" fill="#8c5d2c" opacity=".5"/>
  <circle cx="52" cy="170" r="8" fill="#e5483b"/><circle cx="72" cy="170" r="8" fill="#ffb12b"/><circle cx="88" cy="168" r="6" fill="#7cc04d"/>
  <rect x="124" y="150" width="86" height="70" rx="4" fill="#d8ad6c"/>
  <path d="M138 214v-30h58v30z" fill="#a8763c"/><circle cx="152" cy="178" r="9" fill="#6aae45"/><circle cx="172" cy="176" r="10" fill="#7cc04d"/><circle cx="190" cy="179" r="8" fill="#58a03d"/>
  <g class="win"><circle cx="40" cy="62" r="6"/><circle cx="200" cy="62" r="6"/></g></svg>`,
 mosque:`<svg viewBox="0 0 240 230" class="ico bld-ico"><defs>
   <linearGradient id="ms1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e6cf"/><stop offset="1" stop-color="#d9bf93"/></linearGradient>
   <radialGradient id="ms2" cx=".4" cy=".3"><stop offset="0" stop-color="#8fb6d0"/><stop offset="1" stop-color="#4d7896"/></radialGradient></defs>
  <ellipse cx="120" cy="222" rx="112" ry="8" fill="#000" opacity=".16"/>
  <rect x="186" y="46" width="22" height="174" fill="url(#ms1)"/><rect x="182" y="82" width="30" height="8" rx="3" fill="#bfa070"/>
  <polygon points="184,46 197,6 210,46" fill="#5d86a3"/><circle cx="197" cy="4" r="3" fill="#f3c53f"/>
  <rect x="190" y="102" width="14" height="22" rx="7" fill="#7b5b3a" opacity=".55"/>
  <rect x="32" y="120" width="160" height="100" rx="4" fill="url(#ms1)"/>
  <path d="M50 120a42 42 0 0 1 84 0z" fill="url(#ms2)" transform="translate(-4 0)"/>
  <path d="M60 120a62 62 0 0 1 124 0z" fill="url(#ms2)" transform="translate(-4 0)"/>
  <path d="M98 40v-14" stroke="#f3c53f" stroke-width="3"/><path d="M98 30a6 6 0 1 0 5 -7 4.5 4.5 0 1 1 -5 7z" fill="#f3c53f" transform="translate(-2 -6)"/>
  <path d="M96 58a1 1 0 0 0 0 0" /><rect x="48" y="140" width="28" height="30" rx="14" fill="#7b5b3a" opacity=".55"/><rect x="146" y="140" width="28" height="30" rx="14" fill="#7b5b3a" opacity=".55"/>
  <g class="win"><rect x="52" y="144" width="20" height="24" rx="10"/><rect x="150" y="144" width="20" height="24" rx="10"/></g>
  <path d="M96 220v-34a16 16 0 0 1 32 0v34z" fill="#8a5a35"/><path d="M112 186v34" stroke="#6b4426" stroke-width="2"/>
  <ellipse cx="20" cy="206" rx="14" ry="26" fill="#3f8a50"/></svg>`
};

window.ART={skyAt,sOf,mix,clamp,timeIcon,FAM,BLD,iconFor:(k,o)=>k==='time'?timeIcon(o.t):(FAM[k]||BLD[k]||'')};
})();
