#!/usr/bin/env bash
# Usage: scripts/verify_output.sh output.mp4
# Checks length, resolution, audio identity and visual match against the approved v6 reference.
source "$(dirname "$0")/common.sh"
OUT="${1:?usage: verify_output.sh output.mp4}"
FAIL=0

D=$(dur "$OUT")
echo "Output: $(res "$OUT")  $(fps "$OUT") fps  ${D} s"
python3 -c "import sys; sys.exit(0 if abs($D-59.08)<=0.1 else 1)" && echo "length OK (59.08 s expected, must stay under 60)" || { echo "FAIL: length"; FAIL=1; }

# audio must be bit-identical to the approved audio (stream copy)
A1=$(ffmpeg -v error -i "$OUT" -map 0:a:0 -c copy -f md5 - 2>/dev/null)
A2=$(ffmpeg -v error -i "$AUDIO" -map 0:a:0 -c copy -f md5 - 2>/dev/null)
if [ "$A1" = "$A2" ]; then echo "audio OK (identical to audio/audio_v6.m4a)"; else echo "FAIL: audio differs from audio/audio_v6.m4a"; FAIL=1; fi

# visual match: 12 checkpoints vs the approved 360p v6. Each checkpoint takes the best PSNR over +-2 frames
# (some shots change completely from frame to frame, so one frame of timing jitter must not fail the check).
BAD=0
for t in 0.5 4 9 15 21 27 33 39 45 51 55.5 58.5; do
  best="0"
  for d in -0.08 -0.04 0 0.04 0.08; do
    tt=$(python3 -c "print(max(0.0, round($t+($d),2)))")
    p=$(frame_psnr "$OUT" "$tt" "$REF_V6" "$tt")
    best=$(python3 -c "
a,b='$best','$p'
f=lambda v: 999.0 if v=='inf' else float(v)
print(a if f(a)>=f(b) else b)")
  done
  ok=$(python3 -c "v='$best'; print(1 if v=='inf' or float(v)>=26 else 0)")
  printf "t=%5.1fs  best PSNR vs approved v6 = %s dB  %s\n" "$t" "$best" "$([ "$ok" = 1 ] && echo ok || echo MISMATCH)"
  [ "$ok" = 1 ] || BAD=$((BAD+1))
done
if [ "$BAD" -le 1 ]; then echo "visual match OK ($BAD of 12 checkpoints off; 1 is tolerated)"; else echo "FAIL: $BAD of 12 checkpoints differ from the approved cut"; FAIL=1; fi

SIZE=$(python3 -c "import os; print(round(os.path.getsize('$OUT')/1e6,1))")
echo "size: ${SIZE} MB"
[ "$FAIL" -eq 0 ] && echo "ALL CHECKS PASSED" || { echo "CHECKS FAILED"; exit 1; }
