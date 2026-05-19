#!/usr/bin/env -S uv run --quiet --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=10.0"]
# ///
"""
One-shot image optimizer for ARZ.dev.

For every PNG/JPG under public/ above SIZE_THRESHOLD bytes:
  - resize so longest edge <= MAX_EDGE
  - write a .webp variant next to the original at QUALITY
  - originals are left in place as backup

Run:  uv run scripts/optimize_images.py
"""
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SIZE_THRESHOLD = 200 * 1024  # only touch files > 200 KB
MAX_EDGE = 2000              # cap longest edge so 8k screenshots get sane
QUALITY = 82                 # WebP quality
SKIP_SUFFIXES = {".webp", ".svg", ".gif"}

def should_skip(p: Path) -> bool:
    return (
        p.suffix.lower() in SKIP_SUFFIXES
        or p.is_symlink()
        or not p.is_file()
        or p.stat().st_size < SIZE_THRESHOLD
    )

def convert(src: Path) -> tuple[int, int] | None:
    dst = src.with_suffix(".webp")
    if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
        return None  # already up-to-date
    with Image.open(src) as im:
        im = im.convert("RGB") if im.mode in ("P", "RGBA", "LA") and src.suffix.lower() == ".jpg" else im
        # If transparency, keep RGBA for WebP
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA")
        # Resize down if huge
        w, h = im.size
        m = max(w, h)
        if m > MAX_EDGE:
            scale = MAX_EDGE / m
            im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
        im.save(dst, "WEBP", quality=QUALITY, method=6)
    return src.stat().st_size, dst.stat().st_size

def main() -> int:
    if not PUBLIC.is_dir():
        print(f"public dir not found: {PUBLIC}", file=sys.stderr)
        return 1
    total_before = 0
    total_after = 0
    skipped = 0
    converted = 0
    for p in sorted(PUBLIC.rglob("*")):
        if should_skip(p):
            continue
        if p.suffix.lower() not in (".png", ".jpg", ".jpeg"):
            continue
        result = convert(p)
        if result is None:
            skipped += 1
            continue
        before, after = result
        total_before += before
        total_after += after
        converted += 1
        rel = p.relative_to(ROOT)
        pct = 100 * (1 - after / before) if before else 0
        print(f"  {rel}  {before/1024:.0f} KB -> {after/1024:.0f} KB  (-{pct:.0f}%)")
    print()
    print(f"Converted: {converted}  Skipped: {skipped}")
    if converted:
        print(f"Total: {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB"
              f"  (saved {(total_before-total_after)/1024/1024:.1f} MB)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
