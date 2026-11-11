"""Place the voice-over on the animation and build the music bed to fit. Config: audio.json (see audio.example.json).

The animation is the master clock. Each voice line is pinned to a scene (+ offset in seconds). If a line would start
less than `gap` seconds after the previous line ends, the scene BEFORE it is held longer (never the other way round),
so every line gets a breath and still starts on its own text. Two lines inside the same scene must already fit
(`same_scene_gap`); the script stops with a message if they do not, instead of silently stretching the film.

Writes:
  out/vo_track.wav          the voice-over on the film's timeline (mono 48 kHz)
  out/music.wav             the music bed, re-cut so its drop lands on `music.drop_scene` and its own ending lands
                            just before the film ends (stereo 48 kHz)
  src/timing.json           final scene durations; the Film reads this, so picture and sound never drift apart
  VOICEOVER_PLACEMENT.md    a readable table of where each line sits and the silence before it
Run:  python3 scripts/build_audio.py audio.json
"""
import json, sys, subprocess, wave
import numpy as np
SR = 48000
cfg = json.load(open(sys.argv[1]))

def load(path, ch=1):
    d = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', str(ch), '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(d, '<i2').astype(np.float32) / 32768
    return x.reshape(-1, ch) if ch > 1 else x

def tempo(y, t):
    if abs(t - 1) < 1e-3: return y
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-af', f'atempo={t}', '-f', 's16le', '-'],
                       input=(np.clip(y, -1, 1) * 32767).astype('<i2').tobytes(), capture_output=True).stdout
    return np.frombuffer(p, '<i2').astype(np.float32) / 32768

def fade(y, ms=12):
    n = int(SR * ms / 1000); y = y.copy(); y[:n] *= np.linspace(0, 1, n); y[-n:] *= np.linspace(1, 0, n); return y

def trim_silence(x, lead=0.04, tail=0.12, db=-40):
    h = 480; e = np.array([np.sqrt((x[i:i + h] ** 2).mean()) for i in range(0, len(x) - h, h)])
    on = np.where(20 * np.log10(e + 1e-9) > db)[0]
    if not len(on): return x
    return fade(x[max(0, int(on[0] * h - lead * SR)): int((on[-1] + 1) * h + tail * SR)])

# 1) the clips
lines = []
for ln in cfg['lines']:
    y = load(ln['file'])
    if 'cut' in ln: y = y[int(ln['cut'][0] * SR): int(ln['cut'][1] * SR)]
    y = tempo(trim_silence(y), ln.get('tempo', 1.0))
    lines.append((ln['label'], y, ln['scene'], ln['offset']))

# 2) hold scenes until every line fits
SC = [[n, d] for n, d in cfg['scenes']]
idx = {n: i for i, (n, _) in enumerate(SC)}
GAP, SGAP = cfg.get('gap', 0.6), cfg.get('same_scene_gap', 0.3)
def starts():
    st, a = {}, 0
    for n, d in SC: st[n] = a; a += d
    return st, a
for _ in range(80):
    st, total = starts(); prev, prevsc, changed = -9, None, False
    for label, y, sc, off in lines:
        at = st[sc] + off; need = prev + (SGAP if sc == prevsc else GAP)
        if at < need - 0.01:
            if sc == prevsc: sys.exit(f'"{label}" overlaps the line before it inside scene {sc}: move its offset to >= {need - st[sc]:.2f}')
            SC[idx[sc] - 1][1] = round(SC[idx[sc] - 1][1] + need - at + 0.01, 2); changed = True; break
        prev, prevsc = at + len(y) / SR, sc
    if not changed: break
st, total = starts()

# 3) the voice track
out = np.zeros(int(SR * (total + 2)), np.float32); prev = -1; rows = []
for label, y, sc, off in lines:
    p = st[sc] + off; gap = p - prev; prev = p + len(y) / SR
    out[int(p * SR): int(p * SR) + len(y)] += y
    rows.append(f'{int(p // 60)}:{p % 60:05.2f}-{int(prev // 60)}:{prev % 60:05.2f}  (silence before: {gap if gap < 50 else 0:4.2f} s)  {label}')
def save(path, x, ch):
    with wave.open(path, 'wb') as o:
        o.setnchannels(ch); o.setsampwidth(2); o.setframerate(SR); o.writeframes((np.clip(x, -1, 1) * 32767).astype('<i2').tobytes())
save('out/vo_track.wav', out[: int(SR * total)], 1)
json.dump({'fps': cfg.get('fps', 30), 'scenes': SC}, open('src/timing.json', 'w'), indent=1)
open('VOICEOVER_PLACEMENT.md', 'w').write('# Voice-over placement\n\n```\n' + '\n'.join(rows) + '\n```\n')
print('DURATIONS', SC); print('total', round(total, 2)); print('\n'.join(rows))

# 4) the music: quiet intro stretched so the drop hits drop_scene; the loop section repeated; the track's OWN
#    ending placed to finish just before the film ends (a natural ending, never a fade-out on a loop).
m = cfg.get('music')
if m:
    x = load(m['file'], 2)
    seg = lambda a, b=None: x[int(a * SR): int(b * SR) if b else len(x)]
    def join(parts, xf=0.06):
        o = parts[0]
        for p_ in parts[1:]:
            n = int(xf * SR); w = np.sin(np.linspace(0, np.pi / 2, n))[:, None]
            o = np.concatenate([o[:-n], o[-n:] * np.cos(np.linspace(0, np.pi / 2, n))[:, None] + p_[:n] * w, p_[n:]])
        return o
    D, L0, L1, B2 = m['drop'], m['loop'][0], m['loop'][1], m['bar2']
    tail = len(x) / SR - D  # seconds from the drop to the track's end
    hit = st[m['drop_scene']] + m.get('drop_offset', 0)
    best = None
    for nl in range(0, 6):
        for n2 in range(0, 8):
            end = hit + tail + (L1 - L0) * nl + B2 * n2
            if end <= total - 0.2 and (best is None or end > best[0]): best = (end, nl, n2)
    if best is None: sys.exit('music: the film is shorter than drop + tail; pick a later drop_scene or a shorter track')
    _, nl, n2 = best
    pre = seg(0, m['intro_end'])  # quiet intro, to be stretched by repeating its last bars
    need = hit - D  # extra seconds before the drop
    intro = [pre]
    if need > 0:
        bars = seg(m['intro_end'] - m['intro_bars'], m['intro_end'])
        while sum(len(p) for p in intro) / SR < m['intro_end'] + need: intro.append(bars)
    lead = join(intro)[: int((D + need) * SR)] if need > 0 else seg(0, D)[int(-need * SR):]
    body = [seg(D, L1)] + [seg(L0, L1)] * nl + [seg(L0, L0 + B2 + 0.06)] * n2 + [seg(L1)]
    mus = join([lead] + body, 0.06)
    n = int(total * SR); mus = np.concatenate([mus, np.zeros((max(0, n - len(mus)), 2), np.float32)])[:n]
    save('out/music.wav', mus, 2)
    print(f'music: drop at {hit:.2f}s, loops {nl}, 2-bar repeats {n2}, natural ending at ~{best[0]:.1f}s of {total:.1f}s')
