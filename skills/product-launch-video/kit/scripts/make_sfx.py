"""Synthesise the two sounds this style uses (deterministic, no downloads):
mpop0-2 (a soft, low, dull tap, like a tap through felt) and mswoosh0-1 (air through a low band, no hiss).
Writes 48 kHz stereo WAVs to public/sfx/. Run from the project root: python3 scripts/make_sfx.py"""
import numpy as np, wave, os
SR = 48000
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
os.makedirs(OUT, exist_ok=True)
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

# muffled pop : soft, low and dull, like a tap through felt; three variants
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
