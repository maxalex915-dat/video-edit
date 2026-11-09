"""Synthesise the film's sound effects (deterministic, no downloads).
Writes 48 kHz stereo WAVs to public/sfx/. Run: python3 scripts/make_sfx.py"""
import numpy as np, wave, os
SR = 48000
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
rng = np.random.default_rng(7)

def save(name, l, r=None):
    r = l if r is None else r
    m = max(np.abs(l).max(), np.abs(r).max(), 1e-9)
    st = np.stack([l, r], 1) / m * 0.89
    with wave.open(os.path.join(OUT, name + '.wav'), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype('<i2').tobytes())

def t(d): return np.arange(int(SR * d)) / SR

def bandsweep(x, f0, f1, q=1.2, hop=256):
    """time-varying band-pass via overlap-add FFT frames"""
    n = 1024; win = np.hanning(n); out = np.zeros(len(x) + n)
    frames = range(0, len(x), hop)
    for k, i in enumerate(frames):
        seg = np.zeros(n); s = x[i:i + n]; seg[:len(s)] = s
        fc = f0 * (f1 / f0) ** (i / max(1, len(x)))
        F = np.fft.rfft(seg * win); fr = np.fft.rfftfreq(n, 1 / SR)
        bw = fc / q
        F *= np.exp(-0.5 * ((fr - fc) / bw) ** 2)
        out[i:i + n] += np.fft.irfft(F) * win
    return out[:len(x)] / (n / hop / 1.5)

def env(n, a, d, shape=3.0):
    e = np.ones(n); A = int(a * SR); e[:A] = np.linspace(0, 1, A) ** 2
    rest = n - A; e[A:] = np.exp(-np.linspace(0, shape, rest)) if d else 1
    return e

def reverb(x, amt=0.25, ln=0.6):
    ir = rng.standard_normal(int(SR * ln)) * np.exp(-np.linspace(0, 7, int(SR * ln)))
    ir[0] = 1 / amt
    y = np.convolve(x, ir)[:len(x) + int(SR * ln) // 2]
    return y

# swoosh: noise through a rising band, swelling then fading, panning L to R
def swoosh(name, d=0.42, f0=500, f1=4200, pan=True):
    n = int(SR * d); x = rng.standard_normal(n)
    y = bandsweep(x, f0, f1, q=1.6)
    e = np.sin(np.linspace(0, np.pi, n)) ** 2.2
    y *= e
    p = np.linspace(0.25, 0.75, n) if pan else np.full(n, 0.5)
    save(name, y * np.cos(p * np.pi / 2), y * np.sin(p * np.pi / 2))
swoosh('swoosh', 0.42)
swoosh('swoosh_soft', 0.55, 300, 2200)
swoosh('whoosh_long', 0.9, 180, 3000)

# click: crisp UI click, tiny body
def click():
    tt = t(0.06); x = rng.standard_normal(len(tt)) * np.exp(-tt * 900)
    body = np.sin(2 * np.pi * 2400 * tt) * np.exp(-tt * 160) * 0.5 + np.sin(2 * np.pi * 900 * tt) * np.exp(-tt * 90) * 0.35
    y = bandsweep(x, 3500, 3500, q=0.8) * 1.6 + body
    save('click', y)
click()

# key: deep mechanical keyboard "thock" (Dat, 9 Nov): low thump with a pitch drop, a soft switch click on top,
# a small case knock and the bottom-out tap. Own generator so the other sounds stay identical.
def thock(k):
    kr = np.random.default_rng(100 + k)
    tt = t(0.14); n = len(tt)
    f0 = 165 + k * 12
    ph = 2 * np.pi * np.cumsum(f0 * (0.72 + 0.28 * np.exp(-tt * 60))) / SR
    body = np.sin(ph) * np.exp(-tt * 42)
    knock = np.sin(2 * np.pi * (560 + k * 40) * tt) * np.exp(-tt * 130) * 0.28
    click = bandsweep(kr.standard_normal(n) * np.exp(-tt * 1300), 2600 + k * 180, 2600 + k * 180, q=0.9) * 0.9
    tap = np.zeros(n); d = int(0.011 * SR)
    tap[d:] = bandsweep(kr.standard_normal(n - d) * np.exp(-tt[:n - d] * 700), 1100, 1100, q=0.8) * 0.5
    y = np.tanh((body + knock + click + tap) * 1.4)
    y *= np.minimum(1, np.linspace(0, 40, n))  # no click at the very start
    save(f'key{k}', y)
for k in range(4):
    thock(k)

# pop: soft bubble for cards and chips landing
def pop(name, f0=880, f1=420, d=0.12):
    tt = t(d); fr = f1 + (f0 - f1) * np.exp(-tt * 40)
    ph = 2 * np.pi * np.cumsum(fr) / SR
    y = np.sin(ph) * env(len(tt), 0.003, True, 6)
    save(name, y)
pop('pop'); pop('pop_hi', 1300, 700, 0.1); pop('tick', 2600, 1800, 0.035)

# chime: two soft bells for a notification
def chime():
    tt = t(1.2); y = np.zeros(len(tt))
    for f, dl, a in [(1318.5, 0, 1), (1975.5, 0.11, 0.8)]:
        s = int(dl * SR); tl = tt[:len(tt) - s]
        bell = (np.sin(2 * np.pi * f * tl) + 0.3 * np.sin(2 * np.pi * f * 2.01 * tl)) * np.exp(-tl * 5) * a
        y[s:] += bell
    y = reverb(y, 0.35, 0.8)
    save('chime', y, np.roll(y, 240))
chime()

# success: rising two-note ding
def success():
    tt = t(0.7); y = np.zeros(len(tt))
    for f, dl in [(1046.5, 0), (1568, 0.08)]:
        s = int(dl * SR); tl = tt[:len(tt) - s]
        y[s:] += np.sin(2 * np.pi * f * tl) * np.exp(-tl * 7)
    y = reverb(y, 0.4, 0.5)
    save('success', y)
success()

# riser: 1.8 s build into the drop
def riser():
    d = 1.8; tt = t(d); n = len(tt)
    x = bandsweep(rng.standard_normal(n), 300, 6000, q=1.4) * np.linspace(0, 1, n) ** 2.5
    f = 120 * (8 ** (tt / d)); tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.linspace(0, 1, n) ** 3 * 0.25
    y = x + tone; y[-int(0.02 * SR):] *= np.linspace(1, 0, int(0.02 * SR))
    save('riser', y)
riser()

# impact: deep hit for the reveal
def impact():
    tt = t(1.6)
    f = 40 + 90 * np.exp(-tt * 18)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 3.2)
    hit = bandsweep(rng.standard_normal(len(tt)), 2500, 600, q=0.7) * np.exp(-tt * 14) * 0.6
    y = reverb(sub + hit, 0.5, 1.0)
    save('impact', y, np.roll(y, 300))
impact()

# shimmer: airy sparkle for the AI moment and the bento finale
def shimmer():
    tt = t(1.4); y = np.zeros(len(tt))
    for i, f in enumerate([2093, 2637, 3136, 3951, 4186]):
        s = int(i * 0.06 * SR); tl = tt[:len(tt) - s]
        y[s:] += np.sin(2 * np.pi * f * tl) * np.exp(-tl * 4) * 0.4
    y = reverb(y, 0.3, 0.9)
    save('shimmer', y, np.roll(y, 400))
shimmer()

# cash: a short register-like double tick for the $1,200 moment
def cash():
    tt = t(0.5); y = np.zeros(len(tt))
    for dl, f in [(0, 3200), (0.07, 4200)]:
        s = int(dl * SR); tl = tt[:len(tt) - s]
        y[s:] += np.sin(2 * np.pi * f * tl) * np.exp(-tl * 30) + bandsweep(rng.standard_normal(len(tl)), 6000, 6000, q=1) * np.exp(-tl * 60) * 0.5
    y = reverb(y, 0.3, 0.4)
    save('cash', y)
cash()
print('ok', sorted(os.listdir(OUT)))

# muffled pop (Dat, 9 Nov): soft, low and dull, like a tap through felt; three variants
def mpop(k):
    kr = np.random.default_rng(300 + k)
    tt = t(0.16); n = len(tt)
    f0 = 150 + k * 18
    ph = 2 * np.pi * np.cumsum(f0 * (0.6 + 0.4 * np.exp(-tt * 70))) / SR
    body = np.sin(ph) * np.exp(-tt * 38)
    air = bandsweep(kr.standard_normal(n) * np.exp(-tt * 260), 520, 520, q=0.7) * 0.35
    y = np.tanh((body + air) * 1.2) * np.minimum(1, np.linspace(0, 60, n))
    y = np.convolve(y, np.ones(24) / 24, mode='same')  # dull the top end
    save(f'mpop{k}', y)
for k in range(3):
    mpop(k)

# muffled swoosh for slides, morphs and camera moves: air through a low band, no hiss on top
def mswoosh(k, d=0.42):
    kr = np.random.default_rng(400 + k)
    n = int(SR * d); x = kr.standard_normal(n)
    y = bandsweep(x, 180 + k * 40, 700 + k * 80, q=1.4)
    y *= np.sin(np.linspace(0, np.pi, n)) ** 2.4
    y = np.convolve(y, np.ones(32) / 32, mode='same')
    p = np.linspace(0.35, 0.65, n)
    save(f'mswoosh{k}', y * np.cos(p * np.pi / 2), y * np.sin(p * np.pi / 2))
for k in range(2):
    mswoosh(k)
