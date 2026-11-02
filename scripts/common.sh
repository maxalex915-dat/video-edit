#!/usr/bin/env bash
# Shared helpers. Source this file; do not run it.
set -euo pipefail

KIT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REF_SOURCE="$KIT_ROOT/reference/source_360p.mp4"
REF_V6="$KIT_ROOT/reference/v6_360p.mp4"
AUDIO="$KIT_ROOT/audio/audio_v6.m4a"
FILTER="$KIT_ROOT/cut_filter.txt"

need() { command -v "$1" >/dev/null 2>&1 || { echo "ERROR: $1 not found. Install ffmpeg first (Linux: sudo apt-get update && sudo apt-get install -y ffmpeg)." >&2; exit 2; }; }
need ffmpeg; need ffprobe

dur()  { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
fps()  { ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$1"; }
res()  { ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$1"; }

# average PSNR (dB) between frame at time $2 of video $1 and frame at time $4 of video $3, both scaled to 640x360
frame_psnr() {
  local a="$1" ta="$2" b="$3" tb="$4" tmp
  tmp="$(mktemp -d)"
  ffmpeg -v error -y -ss "$ta" -i "$a" -frames:v 1 -vf "scale=640:360:flags=lanczos" "$tmp/a.png"
  ffmpeg -v error -y -ss "$tb" -i "$b" -frames:v 1 -vf "scale=640:360:flags=lanczos" "$tmp/b.png"
  ffmpeg -hide_banner -i "$tmp/a.png" -i "$tmp/b.png" -lavfi psnr -f null - 2>&1 | grep -o "average:[0-9.a-z]*" | head -1 | cut -d: -f2
  rm -rf "$tmp"
}
