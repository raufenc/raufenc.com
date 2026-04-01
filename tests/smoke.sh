#!/bin/bash
# Deploy sonrasi smoke test
# Kullanim: bash tests/smoke.sh

DOMAIN="https://raufenc.com"
HATALAR=0

echo "=== raufenc.com Smoke Test ==="
echo ""

# 1. Sayfa durumu kontrolleri
echo "--- HTTP Durum Kontrolleri ---"
urls=(
  "/"
  "/kalbinin-haritasi/"
  "/noroterbiye/"
  "/osmanlica/"
  "/muallimo/"
  "/ai-atlasi/"
  "/sevgili-peygamberim/"
  "/evliyalar/"
  "/ingilizce-kelime/"
  "/arapca-kelime/"
  "/sitemap.xml"
  "/robots.txt"
  "/.well-known/security.txt"
)
for path in "${urls[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "${DOMAIN}${path}")
  if [ "$status" = "200" ]; then
    echo "  OK  $path ($status)"
  else
    echo "  HATA $path ($status)"
    HATALAR=$((HATALAR + 1))
  fi
done
echo ""

# 2. Icerik kontrolleri
echo "--- Icerik Kontrolleri ---"

# Kalbinin Haritasi bos mu?
body=$(curl -s "${DOMAIN}/kalbinin-haritasi/")
if echo "$body" | grep -q "Ahlak Pusulasi"; then
  echo "  OK  Kalbinin Haritasi: statik icerik var"
else
  echo "  HATA Kalbinin Haritasi: statik icerik yok!"
  HATALAR=$((HATALAR + 1))
fi

# Ana sayfa proje verisi
body=$(curl -s "${DOMAIN}/")
if echo "$body" | grep -q "projeler.js"; then
  echo "  OK  Ana sayfa: projeler.js referansi var"
else
  echo "  HATA Ana sayfa: projeler.js referansi yok!"
  HATALAR=$((HATALAR + 1))
fi

# Error logger
if echo "$body" | grep -q "error-logger.js"; then
  echo "  OK  Ana sayfa: error-logger.js yukleniyor"
else
  echo "  HATA Ana sayfa: error-logger.js yok!"
  HATALAR=$((HATALAR + 1))
fi

# OG meta kontrol
if echo "$body" | grep -q 'og:title'; then
  echo "  OK  Ana sayfa: OG meta tag'leri var"
else
  echo "  HATA Ana sayfa: OG meta tag'leri eksik!"
  HATALAR=$((HATALAR + 1))
fi
echo ""

# 3. Guvenlik basliklari
echo "--- Guvenlik Basliklari ---"
headers=$(curl -s -I "${DOMAIN}/")
for h in "x-content-type-options" "x-frame-options" "referrer-policy" "strict-transport-security" "permissions-policy"; do
  if echo "$headers" | grep -qi "$h"; then
    echo "  OK  $h"
  else
    echo "  EKSIK $h"
    HATALAR=$((HATALAR + 1))
  fi
done
echo ""

# 4. Redirect kontrolleri
echo "--- Redirect Kontrolleri ---"
redirect_status=$(curl -s -o /dev/null -w "%{http_code}" -L "${DOMAIN}/osmanlica-lugat")
if [ "$redirect_status" = "200" ]; then
  echo "  OK  /osmanlica-lugat redirect calisiyor"
else
  echo "  HATA /osmanlica-lugat redirect ($redirect_status)"
  HATALAR=$((HATALAR + 1))
fi
echo ""

# Sonuc
echo "==========================="
if [ "$HATALAR" -eq 0 ]; then
  echo "SONUC: Tum testler gecti!"
else
  echo "SONUC: $HATALAR hata bulundu!"
fi
echo "==========================="
exit $HATALAR
