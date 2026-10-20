#!/usr/bin/env bash
# Kocaeli AR-GE Android kabuğu — Gradle'sız derleme (JDK 17+, Android SDK build-tools 34 ve platform 34 gerekir)
# Kullanım: ANDROID_HOME=/yol/sdk KEYSTORE=/yol/kocaeli-arge-release.keystore KS_PASS='...' bash build.sh
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; BT="$ANDROID_HOME/build-tools/34.0.0"; AJ="$ANDROID_HOME/platforms/android-34/android.jar"; O="$HERE/out"
rm -rf "$O"; mkdir -p "$O/compiled" "$O/gen" "$O/classes" "$O/dex"; cd "$HERE"
"$BT/aapt2" compile --dir res -o "$O/compiled/res.zip"
"$BT/aapt2" link -o "$O/app-unsigned.apk" -I "$AJ" --manifest AndroidManifest.xml --java "$O/gen" --min-sdk-version 24 --target-sdk-version 34 --auto-add-overlay "$O/compiled/res.zip"
javac --release 11 -encoding UTF-8 -classpath "$AJ" -d "$O/classes" "$O"/gen/com/raufenc/kocaeliarge/R.java src/com/raufenc/kocaeliarge/*.java
"$BT/d8" --release --min-api 24 --lib "$AJ" --output "$O/dex" $(find "$O/classes" -name "*.class")
(cd "$O/dex" && zip -q "$O/app-unsigned.apk" classes.dex)
"$BT/zipalign" -f -p 4 "$O/app-unsigned.apk" "$O/app-aligned.apk"
"$BT/apksigner" sign --ks "$KEYSTORE" --ks-key-alias kocaeliarge --ks-pass "pass:$KS_PASS" --key-pass "pass:$KS_PASS" --out "$O/KocaeliArge.apk" "$O/app-aligned.apk"
"$BT/apksigner" verify "$O/KocaeliArge.apk" && echo "Hazır: $O/KocaeliArge.apk"
