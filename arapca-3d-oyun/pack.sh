#!/usr/bin/env bash
# Arapça 3D Dünya — SCORM 1.2 paketleme scripti
# Kullanım: bash pack.sh  (veya chmod +x pack.sh && ./pack.sh)
# Çıktı: ../arapca-3d-scorm-v1.zip  (EBA veya LMS'e yüklemek için hazır)

set -euo pipefail
cd "$(dirname "$0")"

OUT="../arapca-3d-scorm-v1.zip"

[ -f "$OUT" ] && rm "$OUT"

zip -r "$OUT" . \
  -x "*.DS_Store" \
  -x "pack.sh" \
  -x ".git/*" \
  -x "*.swp" \
  -x "vendor/*"

echo ""
echo "✅ SCORM paketi hazır: $OUT"
echo "   Boyut: $(du -h "$OUT" | cut -f1)"
echo "   İçerik:"
unzip -l "$OUT" | tail -n +2
echo ""
echo "👉 Doğrulama: https://cloud.scorm.com (ücretsiz hesap)"
echo "👉 EBA: öğretmen panelinden SCORM içerik olarak yükle"
