"""Contact sheet of rendered stills, each labelled with its time.
   python3 scripts/sheet.py out/sheet.jpg 30 100 450 ...   (reads out/f/<frame>.jpg, 30 fps)"""
import sys
from PIL import Image, ImageDraw
out, fr = sys.argv[1], sys.argv[2:]
cols, W = 3, 600
ims = [Image.open(f'out/f/{x}.jpg') for x in fr]
H = int(W * ims[0].height / ims[0].width)
S = Image.new('RGB', (W * cols, H * ((len(ims) + cols - 1) // cols)), 'white')
for i, (im, x) in enumerate(zip(ims, fr)):
    S.paste(im.resize((W, H)), ((i % cols) * W, (i // cols) * H))
    ImageDraw.Draw(S).text(((i % cols) * W + 6, (i // cols) * H + 4), f'{int(x)/30:.1f}s', fill='red')
S.save(out, quality=85)
