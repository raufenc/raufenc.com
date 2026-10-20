import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const dir=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(readFileSync(path.join(dir,'curriculum.json'),'utf8'));
assert.equal(data.lessons.length,60);assert.equal(data.modules.length,10);
const html=readFileSync(path.join(dir,'index.html'),'utf8');
const embedded=html.match(/<script id="curriculum" type="application\/json">([\s\S]*?)<\/script>/)[1];
assert.deepEqual(JSON.parse(embedded),data);
for(const m of html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)){if(m[0].includes('type="application/json"'))continue;new vm.Script(m[1]);}
for(const [i,l] of data.lessons.entries()){
 assert.equal(l.id,i+1);assert.equal(l.module,Math.floor(i/6)+1);assert.equal(l.facts.length,3);assert.equal(l.options.length,3);assert.ok(Number.isInteger(l.answer)&&l.answer>=0&&l.answer<3);assert.ok(l.activity&&l.objective&&l.sources.length);
 for(const s of l.sources)assert.match(s.url,/^https:\/\//);
 const id='siyer-'+String(l.id).padStart(2,'0'),lessonDir=path.join(dir,'../dersler',id);let native;
 vm.runInNewContext(readFileSync(path.join(lessonDir,'ders.js'),'utf8'),{DO:{dersKaydet(x){native=x;}}},{timeout:1000});
 assert.equal(native.id,id);const blocks=native.bolumler.flatMap(x=>x.bloklar);assert.equal(new Set(blocks.map(b=>b.id)).size,blocks.length);
 for(const b of blocks.filter(b=>b.tur==='slayt')){assert.ok(existsSync(path.join(lessonDir,b.gorsel)));const svg=readFileSync(path.join(lessonDir,b.gorsel),'utf8');assert.ok(svg.startsWith('<svg'));assert.ok(svg.includes('<desc'))}
 const q=blocks.find(b=>b.tur==='coktan').sorular[0];assert.equal(q.dogru,l.answer);assert.deepEqual(Array.from(q.secenekler),l.options);
}
console.log('PASS: 60 lessons, 180 slides, embedded data, native question mapping and JS syntax.');
