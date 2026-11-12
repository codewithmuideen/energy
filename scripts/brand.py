"""Generate favicons and the social share image from the ApexCore mark.

Geometry mirrors src/components/Logo.jsx (64x64 viewBox).
Usage (from repo root):  python scripts/brand.py
Requires Pillow. Reads public/images/farm-sky-1600.webp for the OG background.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
NAVY = (10, 31, 51)
GREEN_TOP, GREEN_BOT = (60, 194, 116), (18, 112, 64)
SUN_A, SUN_B = (255, 210, 122), (245, 158, 11)


def vgrad(size, top, bot):
    w, h = size
    g = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / max(h - 1, 1)
        g.putpixel((0, y), tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3)))
    return g.resize((w, h))


def mark(px, pad=0.0):
    """Render the mark at px*px, transparent background. pad = fraction of padding."""
    S = 16  # supersample
    W = px * S
    inner = W * (1 - 2 * pad)
    off = W * pad
    k = inner / 64.0
    P = lambda x, y: (off + x * k, off + y * k)

    # "A" panel shape
    a_mask = Image.new("L", (W, W), 0)
    d = ImageDraw.Draw(a_mask)
    d.polygon([P(27, 6), P(52, 58), P(2, 58)], fill=255)
    # cut-outs
    cx, cy = P(48, 15)
    r = 12.5 * k
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=0)
    d.polygon([P(27, 45), P(33.6, 58), P(20.4, 58)], fill=0)
    d.rectangle([P(0, 22), P(64, 24.6)], fill=0)
    d.rectangle([P(0, 34), P(64, 36.6)], fill=0)
    d.rectangle([P(25.8, 0), P(28.2, 46)], fill=0)

    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    img.paste(vgrad((W, W), GREEN_TOP, GREEN_BOT), (0, 0), a_mask)

    # sun
    s_mask = Image.new("L", (W, W), 0)
    rs = 9 * k
    ImageDraw.Draw(s_mask).ellipse([cx - rs, cy - rs, cx + rs, cy + rs], fill=255)
    img.paste(vgrad((W, W), SUN_A, SUN_B), (0, 0), s_mask)
    return img.resize((px, px), Image.LANCZOS)


def tile(px, bg=NAVY, radius=0.22, pad=0.16):
    S = 4
    W = px * S
    base = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    m = Image.new("L", (W, W), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, W - 1, W - 1], radius=int(W * radius), fill=255)
    base.paste(Image.new("RGBA", (W, W), bg + (255,)), (0, 0), m)
    base = base.resize((px, px), Image.LANCZOS)
    mk = mark(px, pad=pad)
    base.alpha_composite(mk)
    return base


def font(size, bold=True):
    for name in (["montserrat-extrabold.ttf", "Montserrat-ExtraBold.ttf", "arialbd.ttf", "segoeuib.ttf"] if bold else ["arial.ttf", "segoeui.ttf"]):
        for base in (Path("C:/Windows/Fonts"), ROOT):
            p = base / name
            if p.exists():
                return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


def main():
    # Favicons: small sizes use the navy tile for contrast in browser tabs
    for s in (16, 32, 48):
        tile(s, pad=0.1).save(PUB / f"favicon-{s}x{s}.png")
    tile(180, radius=0).convert("RGB").save(PUB / "apple-touch-icon.png")
    for s in (192, 512):
        tile(s).save(PUB / f"android-chrome-{s}x{s}.png")
    tile(48, pad=0.1).save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # OG image 1200x630
    W, H = 1200, 630
    bg = Image.open(PUB / "images" / "farm-sky-1600.webp").convert("RGB")
    bg = bg.resize((W, int(bg.height * W / bg.width)), Image.LANCZOS).crop((0, 0, W, H)) if bg.height * W / bg.width >= H else bg.resize((W, H))
    og = bg.convert("RGBA")
    shade = Image.new("RGBA", (W, H))
    for x in range(W):
        a = int(245 - 150 * (x / W))
        ImageDraw.Draw(shade).line([(x, 0), (x, H)], fill=NAVY + (a,))
    og.alpha_composite(shade)
    og.alpha_composite(mark(150), (80, 150))
    d = ImageDraw.Draw(og)
    d.text((250, 160), "Apex", font=font(84), fill=(255, 255, 255))
    aw = d.textlength("Apex", font=font(84))
    d.text((250 + aw, 160), "Core", font=font(84), fill=(60, 194, 116))
    d.text((254, 258), "E N E R G Y   ·   S O L A R", font=font(22), fill=(200, 210, 220))
    d.text((80, 380), "Solar & battery energy solutions", font=font(46), fill=(255, 255, 255))
    d.text((80, 440), "for homes, businesses and communities in Nigeria.", font=font(30, bold=False), fill=(210, 220, 228))
    d.rectangle([80, 520, 200, 526], fill=(31, 157, 85))
    og.convert("RGB").save(PUB / "og-image.jpg", quality=86)
    print("brand assets written")


if __name__ == "__main__":
    main()
