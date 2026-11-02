#!/usr/bin/env bash
# Usage: scripts/check_source.sh path/to/master.mp4
# Confirms the master is the same edit as the 360p reference (same length, same frames at 8 checkpoints).
# Exit 0 = safe to render. Exit 1 = mismatch, do NOT render; see README "If the master does not match".
source "$(dirname "$0")/common.sh"
MASTER="${1:?usage: check_source.sh master.mp4}"

echo "Master:    $(res "$MASTER")  $(fps "$MASTER") fps  $(dur "$MASTER") s"
echo "Reference: $(res "$REF_SOURCE")  $(fps "$REF_SOURCE") fps  $(dur "$REF_SOURCE") s"

D=$(dur "$MASTER")
python3 - "$D" <<'EOF' || { echo "FAIL: duration differs from 158.34 s by more than 0.25 s"; exit 1; }
import sys
d=float(sys.argv[1]); sys.exit(0 if abs(d-158.34)<=0.25 else 1)
EOF
echo "duration OK"

FAILS=0; TOTAL=0
for t in 5.0 24.0 45.0 70.0 100.0 125.0 146.0 157.0; do
  p=$(frame_psnr "$MASTER" "$t" "$REF_SOURCE" "$t")
  TOTAL=$((TOTAL+1))
  ok=$(python3 -c "import sys; v='$p'; print(1 if v=='inf' or float(v)>=22 else 0)")
  printf "t=%6.1fs  PSNR vs reference = %s dB  %s\n" "$t" "$p" "$([ "$ok" = 1 ] && echo ok || echo MISMATCH)"
  [ "$ok" = 1 ] || FAILS=$((FAILS+1))
done
if [ "$FAILS" -gt 1 ]; then
  echo "FAIL: $FAILS of $TOTAL checkpoints do not match. This master is a different edit (or offset)."
  exit 1
fi
echo "PASS: master matches the reference edit."
