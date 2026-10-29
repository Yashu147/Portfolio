"""Cut the before-crops referenced by audit/audit.html (data-id + data-c)
out of the full live-page screenshot, so the PDF embeds small images."""
import re, pathlib
from PIL import Image
root = pathlib.Path(__file__).resolve().parent.parent
src = Image.open(root / 'assets/before-mobile-full.png').convert('RGB')
out = root / 'exports/before'; out.mkdir(parents=True, exist_ok=True)
html = (root / 'audit/audit.html').read_text()
for cid, c in re.findall(r'data-id="([^"]+)" data-c="([^"]+)"', html):
    x, y, w, h = map(int, c.split(','))
    src.crop((x, y, x + w, y + h)).save(out / f'{cid}.png', optimize=True)
    print(cid, w, h)
