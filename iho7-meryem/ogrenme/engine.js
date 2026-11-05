(function(root){
 'use strict';
 const fresh=()=>({lessons:Array.from({length:5},()=>({first:null,attempts:0,hints:0,understood:false,buildAttempts:0,built:false,speech:null,done:false})),reviews:[],ticks:0,final:[],practiceFinal:false});
 function markError(s,i){if(!s.reviews.some(r=>r.lesson===i))s.reviews.push({lesson:i,scheduledAt:s.ticks,dueAt:s.ticks+3,attempts:0,first:null,done:false});}
 function answer(s,i,correct){const x=s.lessons[i];if(x.understood)return false;x.attempts++;if(x.first===null)x.first=correct;if(correct)x.understood=true;else markError(s,i);return true;}
 function due(s,force=false){return s.reviews.find(r=>!r.done&&(force||r.dueAt<=s.ticks));}
 function finalAnswer(s,i,choice,correct){if(s.final[i])return false;s.final[i]={choice,correct:choice===correct};return true;}
 function score(s){return s.final.filter(x=>x&&x.correct).length*20;}
 function shuffle(items,random=Math.random){const a=items.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function matches(order,words){return order.length===words.length&&order.every((v,i)=>v===i);}
 root.MeryemEngine={fresh,markError,answer,due,finalAnswer,score,shuffle,matches};
 if(typeof module==='object')module.exports=root.MeryemEngine;
})(typeof window==='undefined'?globalThis:window);
