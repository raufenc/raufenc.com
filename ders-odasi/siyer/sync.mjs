/** Rebuild the 60 native courses from the authored source; --check is a drift/schema check. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {compileLesson} from './compile-lesson.mjs';
import {renderFrame} from './render-frames.mjs';
const here=path.dirname(fileURLToPath(import.meta.url)), root=path.resolve(here,'../../..');
const data=JSON.parse(fs.readFileSync(path.join(here,'content-v2.json'),'utf8'));
const check=process.argv.includes('--check'), errors=[];
function write(rel,text){const f=path.join(root,rel);if(check){if(!fs.existsSync(f)||fs.readFileSync(f,'utf8')!==text)errors.push('Generated file differs: '+rel);}else{fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,text);}}
if(data.lessons.length!==60)throw Error('Expected 60 lessons');
const ids=new Set();let frames=0,blocks=0,words=0;
for(const l of data.lessons){
 if(ids.has(l.id)||l.id<1||l.id>60)throw Error('Invalid lesson id');ids.add(l.id);
 if(l.frames.length!==4||l.quiz.length!==3||!l.sources.length)throw Error('Incomplete lesson '+l.id);
 for(const f of l.frames){const wc=f.narration.trim().split(/\s+/).length;words+=wc;if(wc<45||wc>65)throw Error('Narration length '+l.id+': '+wc);if(f.labels.length<3||f.labels.length>5)throw Error('Frame labels');}
 for(const q of [...l.quiz,l.decision])if(!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length)throw Error('Answer index');
 const out=compileLesson(l,renderFrame),dir='ders-odasi/dersler/siyer-'+String(l.id).padStart(2,'0');
 write(dir+'/ders.js',out.script);
 out.illustrations.forEach((a,i)=>{if(!a.svg.includes('role="img"')||!a.svg.includes('<title'))throw Error('SVG accessibility');write(dir+'/slayt/'+String(i+1).padStart(2,'0')+'.svg',a.svg);});
 frames+=out.illustrations.length;blocks+=out.native.bolumler.reduce((n,b)=>n+b.bloklar.length,0);
}
write('ders-odasi/siyer/content-v2.js','window.SIYER_CONTENT_V2='+JSON.stringify(data)+';\n');
if(errors.length)throw Error(errors.join('\n'));
console.log(JSON.stringify({status:'PASS',lessons:ids.size,frames,blocks,narrationWords:words,mode:check?'check':'write'}));
