#!/usr/bin/env bash
# Balon Pop — SCORM 1.2 paketleme scripti
# Kullanım: bash pack.sh  (veya chmod +x pack.sh && ./pack.sh)
# Çıktı: ../balon-scorm-v1.zip  (EBA'ya yüklemek için hazır)

set -euo pipefail
cd "$(dirname "$0")"

OUT="../balon-scorm-v1.zip"

# Varsa eski zip'i sil
[ -f "$OUT" ] && rm "$OUT"

# Zip oluştur — .DS_Store, pack.sh kendisi hariç
zip -r "$OUT" . \
  -x "*.DS_Store" \
  -x "pack.sh" \
  -x ".git/*" \
  -x "*.swp"

echo ""
echo "✅ SCORM paketi hazır: $OUT"
echo "   Boyut: $(du -h "$OUT" | cut -f1)"
echo "   İçerik:"
unzip -l "$OUT" | tail -n +2
echo ""
echo "👉 Doğrulama: https://cloud.scorm.com (ücretsiz hesap)"
echo "👉 EBA: öğretmen panelinden SCORM içerik olarak yükle"
