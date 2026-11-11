"""Side-by-side frames: the reference video against our render, matched in time.
Use it whenever the brief is "copy this part of the reference". It is the only reliable way to see
differences in timing, size, colour and motion; a description of the reference is not enough.

  1. Find the reference cut you are copying (scene change detection prints candidates):
       python3 scripts/compare_ref.py cuts reference.mp4 15.0 21.0
  2. Write our frames for the same moments (ref_cut = reference time of the cut, our_cut = our frame of the cut):
       python3 scripts/compare_ref.py plan reference.mp4 16.46 782 4.0 0.12   > frames.txt
       node scripts/stills.mjs $(cat frames.txt)
  3. Build the pairs sheet (reference left, ours right):
       python3 scripts/compare_ref.py pairs reference.mp4 16.46 782 4.0 0.12 out/pairs.jpg
"""
import sys, subprocess, os, glob
import numpy as np
from PIL import Image, ImageDraw

def frames(ref, t0, dur, outdir, w=480):
    os.makedirs(outdir, exist_ok=True)
    for f in glob.glob(f'{outdir}/*.jpg'): os.remove(f)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t0), '-t', str(dur), '-i', ref, '-vf', f'fps=30,scale={w}:-1', f'{outdir}/%04d.jpg'], check=True)
    return sorted(glob.glob(f'{outdir}/*.jpg'))

cmd = sys.argv[1]
if cmd == 'cuts':
    ref, a, b = sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
    fs = frames(ref, a, b - a, 'out/refcuts', 320); p = None
    for i, f in enumerate(fs):
        x = np.asarray(Image.open(f).convert('L'), float)
        if p is not None and abs(x - p).mean() > 2: print(f'cut near {a + i / 30:.2f}s  (change {abs(x - p).mean():.1f})')
        p = x
elif cmd in ('plan', 'pairs'):
    ref, rcut, ocut, dur, step = sys.argv[2], float(sys.argv[3]), int(sys.argv[4]), float(sys.argv[5]), float(sys.argv[6])
    ts = [round(-0.2 + k * step, 3) for k in range(int((dur + 0.2) / step) + 1)]
    ours = [ocut + round(t * 30) for t in ts]
    if cmd == 'plan': print(' '.join(map(str, ours))); sys.exit()
    out = sys.argv[7]; W, H = 480, 270
    rows = []
    for t, o in zip(ts, ours):
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(rcut + t), '-i', ref, '-frames:v', '1', '-vf', f'scale={W}:{H}', '/tmp/_r.jpg'], check=True)
        rows.append((t, Image.open('/tmp/_r.jpg').copy(), Image.open(f'out/f/{o}.jpg').resize((W, H))))
    S = Image.new('RGB', (W * 4, H * ((len(rows) + 1) // 2)), 'white'); d = ImageDraw.Draw(S)
    for k, (t, r, o) in enumerate(rows):
        x, y = (k % 2) * 2 * W, (k // 2) * H
        S.paste(r, (x, y)); S.paste(o, (x + W, y))
        d.text((x + 6, y + 4), f'REF +{t:.2f}s', fill='red'); d.text((x + W + 6, y + 4), f'OURS +{t:.2f}s', fill='red')
    S.save(out, quality=85); print(out)
