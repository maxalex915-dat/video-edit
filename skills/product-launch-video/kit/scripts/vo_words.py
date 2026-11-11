"""Word-level timings of a voice-over track (or one clip), to place text on the words.
   python3 scripts/vo_words.py out/vo_track.wav [start_s end_s]
Notes: faster-whisper (small.en) via numpy input (some PyAV builds reject file paths).
The FIRST word after a silence is often reported early; for line starts trust the energy onset
(printed below the words) instead."""
import sys, subprocess
import numpy as np
from faster_whisper import WhisperModel
path = sys.argv[1]; a0 = float(sys.argv[2]) if len(sys.argv) > 2 else 0; a1 = float(sys.argv[3]) if len(sys.argv) > 3 else None
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout
a = np.frombuffer(raw, np.float32)
seg = a[int(a0 * 16000): int(a1 * 16000) if a1 else None]
m = WhisperModel('small.en', device='cpu', compute_type='int8')
segs, _ = m.transcribe(seg, word_timestamps=True)
print(' '.join(f'{w.start + a0:.2f}:{w.word.strip()}' for s in segs for w in s.words))
# energy onsets after at least 0.4 s of silence = where each line really starts
e = np.array([np.sqrt(np.mean(seg[i:i + 160] ** 2)) for i in range(0, len(seg) - 160, 160)])
on, sil, starts = e > 0.02, 0, []
for i, v in enumerate(on):
    if v and sil >= 40: starts.append(round(a0 + i / 100, 2))
    sil = 0 if v else sil + 1
print('line onsets:', starts)
