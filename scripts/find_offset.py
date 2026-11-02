#!/usr/bin/env python3
"""Usage: python3 scripts/find_offset.py path/to/master.mp4

Only needed when check_source.sh fails. Cross-correlates the master's audio with the 360p
reference to find a constant time offset (seconds) and a speed ratio hint. Needs numpy and ffmpeg.
If the offset is a constant N seconds (master_time = reference_time + N), run
SOURCE_OFFSET=N FORCE=1 scripts/render.sh <master>. render.sh adds N to every cut time.
If correlation is low (< 0.3) the master has different audio or a different edit: stop and report.
"""
import subprocess, sys, os
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(HERE, "..", "reference", "source_360p.mp4")
SR = 8000


def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vn", "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    return x - x.mean()


def env(x, win=80):
    # smoothed energy envelope (10 ms frames) is robust to codec and mastering differences
    n = len(x) // win
    e = np.sqrt((x[: n * win].reshape(n, win) ** 2).mean(1))
    return (e - e.mean()) / (e.std() + 1e-9)


a, b = load(REF), load(sys.argv[1])
ea, eb = env(a), env(b)
n = 1 << int(np.ceil(np.log2(len(ea) + len(eb))))
c = np.fft.irfft(np.fft.rfft(eb, n) * np.conj(np.fft.rfft(ea, n)), n)
lags = np.concatenate([np.arange(0, len(eb)), np.arange(-len(ea) + 1, 0)])
c = np.concatenate([c[: len(eb)], c[n - len(ea) + 1:]])
i = int(np.argmax(c))
lag = lags[i] * 0.01
corr = c[i] / min(len(ea), len(eb))
print(f"offset (master - reference): {lag:+.2f} s   correlation: {corr:.2f}")
print(f"reference length {len(a)/SR:.2f} s, master length {len(b)/SR:.2f} s")
if corr < 0.3:
    print("Low correlation: different audio or a different edit. Do not render.")
elif abs(lag) < 0.05 and abs(len(a) - len(b)) / SR < 0.3:
    print("No offset: the master should already match. Re-check check_source.sh output.")
else:
    print(f"Re-run with: SOURCE_OFFSET={lag:.2f} FORCE=1 scripts/render.sh <master>")
    print("Then check the output by eye: first frame must be the opening card, last frame the closing logo.")
