#!/usr/bin/env python3
"""Ders Odası — bir dersi LMS'e yüklenecek SCORM paketine (zip) çevirir.

  python3 scripts/ders-odasi/scorm-paketle.py fikih-2              # SCORM 1.2
  python3 scripts/ders-odasi/scorm-paketle.py fikih-2 --surum 2004  # SCORM 2004 4. sürüm
  python3 scripts/ders-odasi/scorm-paketle.py --hepsi               # katalogdaki bütün dersler

Çıktı: ders-odasi/paketler/<id>-scorm12.zip (veya -scorm2004.zip)
Paket içinde oynatıcı (motor/), dersin kendisi (dersler/<id>/) ve index.html bulunur.
LMS dersi açtığında oynatıcı SCORM arayüzünü kendisi bulur: öğrenci adı LMS'ten gelir,
puan, geçti/kaldı, kaldığı yer (suspend_data) ve her cevap (cmi.interactions) LMS'e yazılır.
"""
import argparse, json, os, re, sys, zipfile
from xml.sax.saxutils import escape

BURADA = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.normpath(os.path.join(BURADA, '..', '..', 'ders-odasi'))
ATLA = {'.DS_Store'}


def ders_bilgisi(ders_id):
    yol = os.path.join(KOK, 'dersler', ders_id, 'ders.js')
    if not os.path.exists(yol):
        sys.exit(f'Ders bulunamadı: {yol}')
    metin = open(yol, encoding='utf-8').read()
    ad = re.search(r"\bad:\s*'([^']+)'|\"ad\":\s*\"([^\"]+)\"", metin)
    esik = re.search(r"basariEsigi\"?:\s*([0-9.]+)", metin)
    return {'ad': (ad.group(1) or ad.group(2)) if ad else ders_id, 'esik': float(esik.group(1)) if esik else 0.6}


def dosyalar(ders_id, tam_video):
    liste = []
    ders_kok = os.path.join(KOK, 'dersler', ders_id)
    ders_js = open(os.path.join(ders_kok, 'ders.js'), encoding='utf-8').read()
    for alt in ('motor', os.path.join('dersler', ders_id)):
        for kok, _, adlar in os.walk(os.path.join(KOK, alt)):
            for ad in sorted(adlar):
                if ad in ATLA or ad.endswith('.iskelet.js'):
                    continue
                yol = os.path.join(kok, ad)
                if kok.startswith(ders_kok) and ad != 'ders.js':
                    # Yalnızca dersin kullandığı medya pakete girer
                    goreli = os.path.relpath(yol, ders_kok).replace(os.sep, '/')
                    if goreli not in ders_js and not (tam_video and ad == 'tam.mp4'):
                        continue
                liste.append(os.path.relpath(yol, KOK).replace(os.sep, '/'))
    return liste


def manifest(ders_id, bilgi, surum, liste):
    kimlik = 'DERS_ODASI_' + re.sub(r'[^A-Za-z0-9]', '_', ders_id).upper()
    baslik = escape(bilgi['ad'])
    dosya_xml = '\n'.join(f'      <file href="{escape(f)}"/>' for f in ['index.html', 'ayarlar.js'] + liste)
    if surum == '1.2':
        return f'''<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="{kimlik}" version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG_1">
    <organization identifier="ORG_1">
      <title>{baslik}</title>
      <item identifier="ITEM_1" identifierref="RES_1">
        <title>{baslik}</title>
        <adlcp:masteryscore>{round(bilgi['esik'] * 100)}</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
{dosya_xml}
    </resource>
  </resources>
</manifest>
'''
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="{kimlik}" version="1"
          xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3"
          xmlns:adlseq="http://www.adlnet.org/xsd/adlseq_v1p3"
          xmlns:adlnav="http://www.adlnet.org/xsd/adlnav_v1p3"
          xmlns:imsss="http://www.imsglobal.org/xsd/imsss"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd
                              http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd
                              http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd
                              http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd
                              http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 4th Edition</schemaversion>
  </metadata>
  <organizations default="ORG_1">
    <organization identifier="ORG_1">
      <title>{baslik}</title>
      <item identifier="ITEM_1" identifierref="RES_1">
        <title>{baslik}</title>
        <imsss:sequencing>
          <imsss:objectives>
            <imsss:primaryObjective objectiveID="PRIMARYOBJ" satisfiedByMeasure="true">
              <imsss:minNormalizedMeasure>{bilgi['esik']}</imsss:minNormalizedMeasure>
            </imsss:primaryObjective>
          </imsss:objectives>
        </imsss:sequencing>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES_1" type="webcontent" adlcp:scormType="sco" href="index.html">
{dosya_xml}
    </resource>
  </resources>
</manifest>
'''


def paketle(ders_id, surum, tam_video):
    bilgi = ders_bilgisi(ders_id)
    liste = dosyalar(ders_id, tam_video)
    giris = open(os.path.join(KOK, 'ders.html'), encoding='utf-8').read()
    # Paket tek ders açar; ders kimliği sayfaya gömülür
    giris = giris.replace('<html lang="tr">', f'<html lang="tr" data-ders="{ders_id}">', 1)
    os.makedirs(os.path.join(KOK, 'paketler'), exist_ok=True)
    cikti = os.path.join(KOK, 'paketler', f'{ders_id}-scorm{surum.replace(".", "")}.zip')
    with zipfile.ZipFile(cikti, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('imsmanifest.xml', manifest(ders_id, bilgi, surum, liste))
        z.writestr('index.html', giris)
        z.write(os.path.join(KOK, 'ayarlar.js'), 'ayarlar.js')
        for f in liste:
            yol = os.path.join(KOK, f)
            sik = zipfile.ZIP_STORED if f.endswith(('.mp4', '.webm', '.mp3', '.webp', '.png', '.jpg')) else zipfile.ZIP_DEFLATED
            z.write(yol, f, compress_type=sik)
    print(f'{cikti}  ({os.path.getsize(cikti) / 1e6:.1f} MB, {len(liste) + 2} dosya)')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('ders', nargs='?')
    ap.add_argument('--surum', choices=['1.2', '2004'], default='1.2')
    ap.add_argument('--hepsi', action='store_true')
    ap.add_argument('--tam-video', action='store_true', help='tam ders videosunu da pakete koy')
    a = ap.parse_args()
    if a.hepsi:
        metin = open(os.path.join(KOK, 'dersler', 'katalog.js'), encoding='utf-8').read()
        katalog = json.loads(re.search(r'DO\.katalogKaydet\((\[.*\])\);', metin, re.S).group(1))
        for d in katalog:
            paketle(d['id'], a.surum, a.tam_video)
    elif a.ders:
        paketle(a.ders, a.surum, a.tam_video)
    else:
        ap.print_help()


if __name__ == '__main__':
    main()
