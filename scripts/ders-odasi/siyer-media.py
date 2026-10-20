"""Generate public educational narration, verify MP3 decoding, and cache complete clips."""
import asyncio, hashlib, json, pathlib, subprocess, tempfile
import edge_tts
from gtts import gTTS
ROOT=pathlib.Path(__file__).resolve().parents[2]
AREA=ROOT/'ders-odasi/siyer'
ASSETS=AREA/'assets'
ASSETS.mkdir(parents=True,exist_ok=True)
VOICE_FILE=ASSETS/'narration-provider.json'
def clean(text):
    return text.replace('sallallahü aleyhi ve sellem','sallallahu aleyhi ve sellem')
def probe(path):
    info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(path)],text=True))
    duration=float(info['format']['duration'])
    if duration<3 or not any(x.get('codec_type')=='audio' for x in info['streams']):
        raise RuntimeError('Invalid narration '+str(path))
    return duration
async def synth(path,text,provider):
    if provider['engine']=='edge-tts':
        await asyncio.wait_for(edge_tts.Communicate(text,provider['voice'],rate='+0%').save(str(path)),timeout=100)
    else:
        await asyncio.wait_for(asyncio.to_thread(lambda:gTTS(text,lang='tr',tld='com',slow=False,lang_check=False,timeout=(10,60)).save(str(path))),timeout=120)
    if path.stat().st_size<1000: raise RuntimeError('Empty speech')
    probe(path)
async def choose(full_text):
    if VOICE_FILE.exists():
        provider=json.loads(VOICE_FILE.read_text())
        print('Using cached provider',provider['voice'],flush=True)
        return provider
    candidates=[{'engine':'edge-tts','voice':'tr-TR-AhmetNeural','rate':'+0%'},{'engine':'edge-tts','voice':'tr-TR-EmelNeural','rate':'+0%'},{'engine':'gTTS','voice':'tr','rate':'normal'}]
    with tempfile.TemporaryDirectory(prefix='siyer-voice-') as td:
        path=pathlib.Path(td)/'probe.mp3'
        for candidate in candidates:
            for attempt in range(2):
                try:
                    await synth(path,full_text,candidate)
                    VOICE_FILE.write_text(json.dumps(candidate,ensure_ascii=False,indent=2)+'\n')
                    print('Full Turkish frame preflight passed:',candidate['voice'],flush=True)
                    return candidate
                except Exception as error:
                    print('Voice preflight retry:',candidate['voice'],type(error).__name__,flush=True)
                    await asyncio.sleep(3+attempt*3)
    raise RuntimeError('No Turkish speech provider returned valid audio')
async def make(path,text,provider):
    text=clean(text)
    signature=hashlib.sha256((json.dumps(provider,sort_keys=True)+'|'+text).encode()).hexdigest()
    side=path.with_suffix('.sha256')
    if path.exists() and path.stat().st_size>1000 and side.exists() and side.read_text()==signature:
        return
    path.parent.mkdir(parents=True,exist_ok=True)
    temp=path.with_suffix('.partial.mp3')
    for attempt in range(5):
        try:
            await synth(temp,text,provider)
            temp.replace(path)
            side.write_text(signature)
            print('OK',str(path.relative_to(ROOT)),flush=True)
            await asyncio.sleep(1 if provider['engine']=='gTTS' else .4)
            return
        except Exception as error:
            temp.unlink(missing_ok=True)
            print('Retry',str(path.relative_to(ROOT)),attempt+1,type(error).__name__,flush=True)
            if attempt==4: raise
            await asyncio.sleep([5,15,30,45][attempt])
async def main():
    data=json.loads((AREA/'content-v2.json').read_text())
    lessons=data['lessons']
    frame=lessons[0]['frames'][0]
    provider=await choose(clean(frame['title']+'. '+frame['narration']))
    clips=[]
    for lesson in lessons:
        for i,frame in enumerate(lesson['frames'],1):
            path=ROOT/f"ders-odasi/dersler/siyer-{lesson['id']:02d}/ses/s{i:02d}.mp3"
            await make(path,frame['title']+'. '+frame['narration'],provider)
            duration=probe(path)
            clips.append({'lessonId':lesson['id'],'frame':i,'path':str(path.relative_to(ROOT)),'duration':round(duration,3),'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
    (ASSETS/'audio-manifest.json').write_text(json.dumps({'version':2,'provider':provider,'generatedVoice':True,'clipCount':len(clips),'totalSeconds':round(sum(x['duration'] for x in clips),3),'clips':clips},ensure_ascii=False,indent=2)+'\n')
    print('PASS',len(clips),'authored and decoded Turkish narration files.')
if __name__=='__main__':
    asyncio.run(main())
