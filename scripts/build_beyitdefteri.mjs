import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
import {BASE,escape,renderShell,pathFor} from '../beyitdefteri/assets/render.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(await readFile(join(root,'beyitdefteri/data/defter.json'),'utf8'));
const ids=new Set();
for(const p of data.poems){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id)||ids.has(p.id))throw Error(`Geçersiz veya tekrar eden kimlik: ${p.id}`);
  ids.add(p.id);
  if(!data.collections.some(c=>c.id===p.collectionId))throw Error(`Koleksiyon bulunamadı: ${p.id}`);
  if(p.couplets.length!==p.coupletCount||p.couplets.some(c=>c.verses.length!==2))throw Error(`Beyit yapısı hatalı: ${p.id}`);
  if(!p.title||p.couplets.some(c=>c.verses.some(v=>!v.text)))throw Error(`Eksik metin: ${p.id}`);
  for(const v of p.couplets.flatMap(c=>c.verses))if(v.scan && v.scan.feet.length!==4)throw Error(`Eksik tef‘ile: ${p.id}`);
}
function html(p,isIndex=false){
  const title=isIndex?'Beyit Defteri · Rauf Enç':`${p.title} · Rauf Enç | Beyit Defteri`;
  const description=isIndex?`Rauf Enç’in şiir defteri. ${data.poems.length} şiir ve sürüm; Mektûbât’tan gazeller, bugünün dertleri ve gönle vuran beyitler.`:p.couplets[0].verses.map(v=>v.text).join(' ');
  const url=`https://raufenc.com${isIndex?BASE:pathFor(p)}`;
  const schema=isIndex?{'@context':'https://schema.org','@type':'CollectionPage',name:'Beyit Defteri',url,author:{'@type':'Person',name:'Rauf Enç'},inLanguage:'tr'}:{'@context':'https://schema.org','@type':'CreativeWork',genre:p.meterType==='hece'?'Şiir':'Gazel',name:p.title,url,author:{'@type':'Person',name:'Rauf Enç'},inLanguage:'tr',text:p.couplets.map(c=>c.verses.map(v=>v.text).join('\n')).join('\n\n')};
  return `<!doctype html><html lang="tr" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="author" content="Rauf Enç"><meta name="theme-color" content="#30252b"><link rel="canonical" href="${url}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="${isIndex?'website':'article'}"><meta property="og:locale" content="tr_TR"><meta name="twitter:card" content="summary"><link rel="icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${BASE}assets/style.css?v=20260910"><script>try{document.documentElement.dataset.theme=localStorage.getItem('beyit-theme')||'light';var s=Number(localStorage.getItem('beyit-size'));if(s>=18&&s<=30)document.documentElement.style.setProperty('--verse-size',s/16+'rem')}catch(e){}</script><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script><script type="module" src="${BASE}assets/app.mjs?v=20260910"></script></head><body>${renderShell(data,p)}<noscript><style>.mobile-index{display:none!important}@media(max-width:700px){body{overflow:auto}.workspace{height:auto}.library{display:block;position:static;max-height:350px;overflow:auto}.reader{height:auto}.library-controls{display:none}}</style></noscript></body></html>`;
}
await writeFile(join(root,'beyitdefteri/index.html'),html(data.poems[0],true));
for(const p of data.poems){const folder=join(root,'beyitdefteri/siir',p.id);await mkdir(folder,{recursive:true});await writeFile(join(folder,'index.html'),html(p));}
const urls=[BASE,...data.poems.map(pathFor)];
await writeFile(join(root,'beyitdefteri/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>https://raufenc.com${u}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`${data.poems.length} şiir/sürüm, ${data.collections.length} koleksiyon, ${data.poems.reduce((n,p)=>n+p.coupletCount,0)} beyit: ${urls.length} sayfa hazır.`);
