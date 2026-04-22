#!/usr/bin/env python3
"""
Hikmetler — PNG → WebP üçlü (thumb/medium/full).
Text netliği korunsun diye full quality=95 kullanılır.
Idempotent: .build-hash.json ile değişmeyen dosyaları atlar.
"""
import hashlib
import json
import re
import sys
import time
from pathlib import Path
from PIL import Image

SOURCE_ROOT = Path("/Users/raufenc/Library/Mobile Documents/com~apple~CloudDocs/Muhtelif/Claude/hikmetler")
OUTPUT_DIR = Path(__file__).resolve().parent.parent
ASSETS_DIR = OUTPUT_DIR / "assets"
HASH_FILE = OUTPUT_DIR / ".build-hash.json"

SIZES = [
    ("thumb",  480,  82),
    ("medium", 960,  88),
    ("full",  1672,  95),
]

def parse_card_filename(name: str):
    m = re.match(r"^(\d+)\.(\d+)\s+(.+?)\.(png|PNG)$", name)
    if not m:
        return None, None
    return int(m.group(1)), int(m.group(2))

def parse_category_folder(name: str):
    m = re.match(r"^(\d+)\s+(.+?)\s*$", name)
    if not m:
        return None
    return int(m.group(1))

def file_hash(path: Path) -> str:
    h = hashlib.md5()
    h.update(str(path.stat().st_mtime_ns).encode())
    h.update(str(path.stat().st_size).encode())
    return h.hexdigest()

def convert_one(src: Path, cat_id: int, n: int, hashes: dict, force: bool = False) -> int:
    """Returns bytes written."""
    hash_key = f"{cat_id}/{n}"
    current = file_hash(src)
    if not force and hashes.get(hash_key) == current:
        return 0

    out_dir = ASSETS_DIR / str(cat_id)
    out_dir.mkdir(parents=True, exist_ok=True)

    with Image.open(src) as img:
        img = img.convert("RGB")
        orig_w, orig_h = img.size
        total_bytes = 0

        for label, target_w, quality in SIZES:
            if target_w >= orig_w:
                resized = img
            else:
                target_h = int(orig_h * target_w / orig_w)
                resized = img.resize((target_w, target_h), Image.LANCZOS)

            out_path = out_dir / f"{n}-{label}.webp"
            resized.save(out_path, format="WEBP", quality=quality, method=6)
            total_bytes += out_path.stat().st_size

    hashes[hash_key] = current
    return total_bytes

def main():
    force = "--force" in sys.argv
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    # Hash cache yükle
    hashes = {}
    if HASH_FILE.exists() and not force:
        try:
            hashes = json.loads(HASH_FILE.read_text())
        except Exception:
            hashes = {}

    # Kategori klasörlerini topla
    tasks = []
    for entry in sorted(SOURCE_ROOT.iterdir()):
        if not entry.is_dir():
            continue
        cat_id = parse_category_folder(entry.name)
        if cat_id is None:
            continue
        pngs = sorted([p for p in entry.iterdir() if p.suffix.lower() == ".png"])
        for png in pngs:
            parsed_cat, n = parse_card_filename(png.name)
            if parsed_cat == cat_id:
                tasks.append((png, cat_id, n))

    total = len(tasks)
    print(f"Toplam {total} kart işlenecek.")
    print(f"Hedefler: thumb=480w/q82, medium=960w/q88, full=1672w/q95")
    print()

    start = time.time()
    processed = 0
    skipped = 0
    total_bytes = 0

    for i, (src, cat_id, n) in enumerate(tasks, 1):
        elapsed = time.time() - start
        eta = (elapsed / max(i - 1, 1)) * (total - i + 1) if i > 1 else 0

        written = convert_one(src, cat_id, n, hashes, force=force)
        if written == 0:
            skipped += 1
            status = "⏭ "
        else:
            processed += 1
            total_bytes += written
            status = "✓ "

        print(f"[{i:3d}/{total}] {status} {cat_id:02d}.{n:02d}  "
              f"{src.name[:55]:55s}  elapsed={elapsed:6.1f}s eta={eta:6.1f}s")

        # Her 20 kartta hash'i diske yaz (crash koruma)
        if i % 20 == 0:
            HASH_FILE.write_text(json.dumps(hashes, indent=0))

    HASH_FILE.write_text(json.dumps(hashes, indent=0))

    elapsed = time.time() - start
    mb = total_bytes / 1024 / 1024
    print()
    print(f"✓ Tamamlandı.")
    print(f"  Yeni/güncel: {processed}, atlandı: {skipped}")
    print(f"  Yazılan: {mb:.1f} MB ({total_bytes} bytes)")
    print(f"  Süre: {elapsed:.1f}s ({elapsed/60:.1f} dk)")

if __name__ == "__main__":
    main()
