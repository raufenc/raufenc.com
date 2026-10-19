"""Âdâb destelerine sesli anlatım ekler.

adab-ses.json: {ders_id: {slayt_id: söylenecek metin}} — Higgsfield (ElevenLabs, "Rauf Enç (stüdyo)")
ile bu sırayla seslendirilir; çıkan dosyalar KAYNAK klasöründe 0.mp3, 1.mp3 … diye durur.
Betik dosyaları 64 kbps mono'ya çevirip <ders>/ses/<slayt>.mp3 olarak koyar ve slayda `ses` ekler.

    python3 scripts/ders-odasi/adab-ses.py KAYNAK_KLASOR
"""
import json, os, re, subprocess, sys

BURA = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.join(BURA, '..', '..', 'ders-odasi', 'dersler')


def main():
    kaynak = sys.argv[1]
    metinler = json.load(open(os.path.join(BURA, 'adab-ses.json'), encoding='utf-8'))
    sira = 0
    for ders_id, slaytlar in metinler.items():
        yol = os.path.join(KOK, ders_id, 'ders.js')
        s = open(yol, encoding='utf-8').read()
        bas, j = s[:s.index('{')], json.loads(s[s.index('{'):s.rindex('}') + 1])
        bloklar = {b['id']: b for bol in j['bolumler'] for b in bol['bloklar']}
        os.makedirs(os.path.join(KOK, ders_id, 'ses'), exist_ok=True)
        for sid in slaytlar:
            hedef = 'ses/%s.mp3' % sid
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(kaynak, '%d.mp3' % sira),
                            '-ac', '1', '-b:a', '64k', os.path.join(KOK, ders_id, hedef)], check=True)
            b = bloklar[sid]
            assert b['tur'] == 'slayt', (ders_id, sid)
            # ses alanı gorsel'in hemen ardına gelsin
            yeni = {}
            for k, v in b.items():
                yeni[k] = v
                if k == 'gorsel':
                    yeni['ses'] = hedef
            b.clear(); b.update(yeni)
            sira += 1
        with open(yol, 'w', encoding='utf-8') as f:
            f.write(bas + json.dumps(j, ensure_ascii=False, indent=1) + '\n);\n')
        print(ders_id, len(slaytlar))


if __name__ == '__main__':
    main()
