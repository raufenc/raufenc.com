"""Generate only authored public educational narration; no credentials are sent to TTS."""
import asyncio, hashlib, json, pathlib, sys, subprocess
import edge_tts
ROOT=pathlib.Path(__file__).resolve().parents[2]
CONTENT=ROOT/'ders-odasi/siyer/content-v2.json'
ASSETS=ROOT/'ders-odasi/siyer/assets'
ASSETS.mkdir(parents=True,exist_ok=True)
VOICE='tr-TR-AhmetNeural'
SEM=asyncio.Semaphore(2)
async def make(path,text):
    text=text.replace('sallallahü aleyhi ve sellem','sallallahu aleyhi ve sellem')
    signature=hashlib.sha256((VOICE+'|-8%|'+text).encode()).hexdigest()
    side=path.with_suffix('.sha256')
    if path.exists() and path.stat().st_size>1000 and side.exists() and side.read_text()==signature:
        return
    path.parent.mkdir(parents=True,exist_ok=True)
    async with SEM:
        for attempt in range(3):
            try:
                await asyncio.wait_for(edge_tts.Communicate(text,VOICE,rate='-8%').save(str(path)),timeout=90)
                if path.stat().st_size<1000: raise RuntimeError('Empty audio')
                side.write_text(signature)
                print('OK',str(path.relative_to(ROOT)),flush=True)
                return
            except Exception as e:
                if path.exists(): path.unlink()
                if attempt==2: raise
                await asyncio.sleep(2+attempt*3)
async def main():
    if not CONTENT.exists():
        await make(ASSETS/'narration-check.mp3','Siyer Yolculuğuna hoş geldiniz. Mekke, Yesrib ve Tâif şehirlerini haritada birlikte tanıyalım. Peygamber Efendimiz (sallallahü aleyhi ve sellem) hayatını öğrenirken olayların yerini, zamanını ve sebeplerini düşünelim.')
        print('Narration service check passed.')
        return
    data=json.loads(CONTENT.read_text())
    lessons=data['lessons'] if isinstance(data,dict) else data
    tasks=[]
    for lesson in lessons:
        for i,frame in enumerate(lesson['frames'],1):
            path=ROOT/f"ders-odasi/dersler/siyer-{lesson['id']:02d}/ses/s{i:02d}.mp3"
            tasks.append(make(path,frame['title']+'. '+frame['narration']))
    await asyncio.gather(*tasks)
    clips=[]
    for lesson in lessons:
        for i,frame in enumerate(lesson['frames'],1):
            path=ROOT/f"ders-odasi/dersler/siyer-{lesson['id']:02d}/ses/s{i:02d}.mp3"
            info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(path)],text=True))
            duration=float(info['format']['duration'])
            if duration<3 or not any(x.get('codec_type')=='audio' for x in info['streams']): raise RuntimeError('Invalid narration: '+str(path))
            clips.append({'lessonId':lesson['id'],'frame':i,'path':str(path.relative_to(ROOT)),'duration':round(duration,3),'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
    (ASSETS/'audio-manifest.json').write_text(json.dumps({'version':2,'voice':VOICE,'generatedVoice':True,'clipCount':len(clips),'totalSeconds':round(sum(x['duration'] for x in clips),3),'clips':clips},ensure_ascii=False,indent=2)+'\n')
    print('PASS',len(clips),'authored and decoded Turkish narration files.')
if __name__=='__main__':
    asyncio.run(main())
