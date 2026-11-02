#!/usr/bin/env bash
# Usage: scripts/render.sh path/to/master.mp4 [output.mp4]
# Applies the fixed cut list to the master and muxes the finished audio (stream copy, no re-mix).
# Output stays under 95 MB (GitHub's 100 MB per-file limit) by raising CRF in steps if needed.
source "$(dirname "$0")/common.sh"
MASTER="${1:?usage: render.sh master.mp4 [output.mp4]}"
OUT="${2:-$KIT_ROOT/output/Archetype_Group_Shaping_Tomorrow_v6_1080p.mp4}"
MAXMB="${MAXMB:-95}"
mkdir -p "$(dirname "$OUT")"

if [ "${FORCE:-0}" != "1" ]; then
  "$KIT_ROOT/scripts/check_source.sh" "$MASTER"
fi

# Low-memory graph: one input per segment (-ss/-t before each -i). Same cuts and crossfades as cut_filter.txt.
TMPF="$(mktemp)"
SC=0
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$MASTER")
if [ "${SCALE_TO_1080:-0}" = "1" ] && [ "$H" -gt 1080 ]; then SC=1; fi
mapfile -t INARGS < <(python3 "$KIT_ROOT/scripts/make_filter.py" "$MASTER" "$TMPF" "$SC")
MAPV="[vout]"; [ "$SC" = 1 ] && MAPV="[vfinal]"
AIDX=${#INARGS[@]}; AIDX=$((AIDX/6))   # audio file is the input after the 11 segment inputs

for CRF in ${CRF_LIST:-17 19 21 23 25}; do
  echo "Encoding at CRF $CRF ..."
  ffmpeg -v error -y "${INARGS[@]}" -i "$AUDIO" -filter_complex_script "$TMPF" \
    -map "$MAPV" -map "${AIDX}:a" -c:v libx264 -crf "$CRF" -preset "${PRESET:-slow}" -pix_fmt yuv420p \
    -c:a copy -movflags +faststart -shortest "$OUT"
  MB=$(python3 -c "import os; print(round(os.path.getsize('$OUT')/1e6,1))")
  echo "  -> $MB MB"
  if python3 -c "import sys; sys.exit(0 if $MB <= $MAXMB else 1)"; then break; fi
done
echo "Wrote $OUT"
"$KIT_ROOT/scripts/verify_output.sh" "$OUT"
