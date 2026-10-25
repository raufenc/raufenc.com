// Each arc represents one actual second; the last arc may be fractional.
export function secondSegments(duration) {
  return Array.from({length:Math.ceil(duration/1000)},(_,i)=>{
    const start=i*1000,end=Math.min(duration,start+1000),gap=Math.min(.024,(end-start)/duration);
    const a=start/duration*Math.PI*2+gap,b=end/duration*Math.PI*2-gap;
    const point=t=>[160+148*Math.sin(t),160-148*Math.cos(t)].map(n=>n.toFixed(3)).join(' ');
    return {start,end,path:`M ${point(a)} A 148 148 0 ${b-a>Math.PI?1:0} 1 ${point(b)}`};
  });
}
export function secondFraction(segment,elapsed) {
  return Math.max(0,Math.min(1,(segment.end-elapsed)/(segment.end-segment.start)));
}
export function timeDigits(remaining) {
  const tenths=Math.max(0,Math.ceil(remaining/100));
  return {whole:String(Math.floor(tenths/10)).padStart(2,'0'),decimal:'.'+tenths%10};
}
