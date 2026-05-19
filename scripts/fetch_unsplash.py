#!/usr/bin/env -S uv run --quiet --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=10.0", "requests>=2.31"]
# ///
"""
Download Unsplash images referenced in SunsetGallerySection + LifeVisionSection
and save them locally as WebP in public/beyond/gallery/ and public/beyond/vision/.

Run:  uv run scripts/fetch_unsplash.py
"""
from __future__ import annotations
import io
import sys
from pathlib import Path
import requests
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_GALLERY = ROOT / "public" / "beyond" / "gallery"
OUT_VISION = ROOT / "public" / "beyond" / "vision"

# (url, output filename without extension, target_max_edge)
GALLERY = [
    ("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&fit=crop&auto=format&q=82", "mountain-golden-hour", 1600),
    ("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&fit=crop&auto=format&q=82", "ocean-beach-sunset", 1600),
    ("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&fit=crop&auto=format&q=82", "forest-sunlight", 1200),
    ("https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1600&fit=crop&auto=format&q=82", "hilltop-silhouette", 1600),
    ("https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&fit=crop&auto=format&q=82", "coastal-rocks", 1200),
    ("https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&fit=crop&auto=format&q=82", "valley-overlook", 1600),
    ("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&fit=crop&auto=format&q=82", "misty-valley-dawn", 1600),
]

VISION = [
    ("https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&fit=crop&auto=format&q=82", "travel-world", 1200),
    ("https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&fit=crop&auto=format&q=82", "chase-sunset", 1200),
    ("https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&fit=crop&auto=format&q=82", "mountain-ocean", 1200),
    ("https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200&fit=crop&auto=format&q=82", "build-anywhere", 1200),
    ("https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&fit=crop&auto=format&q=82", "island-living", 1200),
]

UA = {"User-Agent": "Mozilla/5.0 (arz.dev image fetcher)"}

def fetch_and_save(url: str, out_path: Path, max_edge: int) -> int:
    if out_path.exists():
        return out_path.stat().st_size
    r = requests.get(url, headers=UA, timeout=30)
    r.raise_for_status()
    im = Image.open(io.BytesIO(r.content))
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    w, h = im.size
    m = max(w, h)
    if m > max_edge:
        scale = max_edge / m
        im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(out_path, "WEBP", quality=82, method=6)
    return out_path.stat().st_size

def main() -> int:
    total = 0
    for url, slug, max_edge in GALLERY:
        out = OUT_GALLERY / f"{slug}.webp"
        size = fetch_and_save(url, out, max_edge)
        total += size
        print(f"  {out.relative_to(ROOT)}  {size/1024:.0f} KB")
    for url, slug, max_edge in VISION:
        out = OUT_VISION / f"{slug}.webp"
        size = fetch_and_save(url, out, max_edge)
        total += size
        print(f"  {out.relative_to(ROOT)}  {size/1024:.0f} KB")
    print(f"\nTotal added: {total/1024/1024:.2f} MB")
    return 0

if __name__ == "__main__":
    sys.exit(main())
