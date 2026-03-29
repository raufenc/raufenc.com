#!/usr/bin/env python3
"""
Üretilen görselleri doğru sınıf klasörlerine taşır.
Kullanım: python3 sort_images.py /path/to/indirilen/klasor
"""
import json, shutil, os, sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROMPTS_FILE = os.path.join(SCRIPT_DIR, "regeneration_prompts.json")
IMAGES_ROOT = os.path.join(SCRIPT_DIR, "..", "assets", "images")

def main():
    if len(sys.argv) < 2:
        print("Kullanım: python3 sort_images.py /path/to/indirilen/klasor")
        sys.exit(1)

    source_dir = sys.argv[1]
    if not os.path.isdir(source_dir):
        print(f"Klasör bulunamadı: {source_dir}")
        sys.exit(1)

    with open(PROMPTS_FILE, "r") as f:
        data = json.load(f)

    # Build filename -> sinif map
    file_map = {}
    for sinif_key, items in data.items():
        sinif_num = sinif_key.split("_")[1]  # "sinif_4" -> "4"
        sinif_folder = sinif_num.zfill(2)     # "4" -> "04"
        for item in items:
            fname = item["dosya"]  # e.g. "G_U1_B0_01.jpeg"
            file_map[fname] = sinif_folder

    # Scan source directory
    found = 0
    missing = 0
    for fname in sorted(os.listdir(source_dir)):
        if not fname.lower().endswith((".jpeg", ".jpg", ".png", ".webp")):
            continue

        # Try exact match first
        target_sinif = file_map.get(fname)

        # Try with different extensions
        if not target_sinif:
            base = os.path.splitext(fname)[0]
            for ext in [".jpeg", ".jpg", ".png", ".webp"]:
                target_sinif = file_map.get(base + ext)
                if target_sinif:
                    break

        if not target_sinif:
            print(f"  ? Eşleşmeyen dosya: {fname}")
            missing += 1
            continue

        dest_dir = os.path.join(IMAGES_ROOT, target_sinif)
        os.makedirs(dest_dir, exist_ok=True)

        src = os.path.join(source_dir, fname)
        dst = os.path.join(dest_dir, fname)
        shutil.copy2(src, dst)
        found += 1
        print(f"  ✓ {fname} → assets/images/{target_sinif}/")

    print(f"\nSonuç: {found} dosya taşındı, {missing} eşleşmedi")
    print(f"Toplam beklenen: {len(file_map)}")

if __name__ == "__main__":
    main()
