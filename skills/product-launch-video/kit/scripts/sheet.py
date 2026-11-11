"""Contact sheet of rendered stills, each labelled with its time AND its scene + scene frame (from src/timing.json),
so a client note like "at 0:52" maps straight to a scene.
   python3 scripts/sheet.py out/sheet.jpg 30 100 450 ...   (reads out/f/<frame>.jpg, 30 fps)"""
import sys, json
from PIL import Image, ImageDraw
out, fr = sys.argv[1], sys.argv[2:]
try:
    sc = json.load(open('src/timing.json'))['scenes']
except Exception:
    sc = []
def where(g):
    a = 0
    for n, d in sc:
        L = round(d * 30)
        if g < a + L: return f'{n} f{g - a}'
        a += L
    return ''
cols, W = 3, 600
ims = [Image.open(f'out/f/{x}.jpg') for x in fr]
H = int(W * ims[0].height / ims[0].width)
S = Image.new('RGB', (W * cols, H * ((len(ims) + cols - 1) // cols)), 'white')
for i, (im, x) in enumerate(zip(ims, fr)):
    S.paste(im.resize((W, H)), ((i % cols) * W, (i // cols) * H))
    g = int(x)
    ImageDraw.Draw(S).text(((i % cols) * W + 6, (i // cols) * H + 4), f'{g // 30 // 60}:{g / 30 % 60:04.1f}  {where(g)}', fill='red')
S.save(out, quality=85)
