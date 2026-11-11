"""Extract a logo SVG's pieces (path data + fill) for the outro: python3 scripts/logo_pieces.py logo.svg > src/scenes/logoMark.ts
Works for flat SVGs (path elements with a fill attribute, no transforms). If the logo uses a gradient instead of
flat pieces, keep its <linearGradient> and apply it in the mark's own viewBox space instead (same idea: the
colours must follow the mark, not the screen)."""
import re, sys, json
s = open(sys.argv[1]).read()
vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
paths, fills = [], []
for p in re.findall(r'<path[^>]*>', s):
    d = re.search(r'\sd="([^"]+)"', p); fl = re.search(r'fill="([^"]+)"', p)
    if d: paths.append(d.group(1)); fills.append(fl.group(1) if fl else '#000')
print('export const MARK = ' + json.dumps({'w': vb[2], 'h': vb[3], 'paths': paths, 'fills': fills}) + ';')
