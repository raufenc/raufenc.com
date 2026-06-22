#!/usr/bin/env bash
# Hastaneye Yolculuk — SCORM 1.2 paketleme scripti
# Kullanım: bash pack.sh   → EBA / LMS'e yüklenmeye hazır zip üretir
# Çıktı: ../hastaneye-yolculuk-scorm-v1.zip

set -euo pipefail
cd "$(dirname "$0")"

OUT="../hastaneye-yolculuk-scorm-v1.zip"
[ -f "$OUT" ] && rm "$OUT"

# imsmanifest.xml en üstte (kök), tüm varlıklar göreli yolla dâhil
zip -r "$OUT" . \
  -x "*.DS_Store" \
  -x "pack.sh" \
  -x ".git/*" \
  -x "*.swp"

echo ""
echo "✅ SCORM paketi hazır: $OUT"
echo "   Boyut: $(du -h "$OUT" | cut -f1)"
echo "   Launch: index.html (SCORM 1.2 · scormtype=sco)"
echo ""
echo "👉 Doğrulama: https://cloud.scorm.com (ücretsiz hesap, sürükle-bırak)"
echo "👉 EBA: öğretmen panelinden 'SCORM içerik' olarak yükle"
