#!/usr/bin/env bash
# Full render: sound effects track, mix (voice over music with ducking, loudness -14 LUFS), picture, mux.
#   bash scripts/render.sh v12        -> out/v12_final.mp4 (and an mp3 of the mix for audio-only review)
set -euo pipefail
TAG=${1:-draft}
T=$(python3 -c "import json;print(round(sum(d for _,d in json.load(open('src/timing.json'))['scenes']),3))")
npx remotion render Film out/${TAG}_sfx.wav --codec wav --log=error
MUSIC_IN=(); MUSIC_FILTER=""; N=2
if [ -f out/music.wav ]; then
  MUSIC_IN=(-i out/music.wav)
  MUSIC_FILTER="[2]aresample=48000,atrim=0:$T,volume=0.9[m];[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];"
  N=3
fi
ffmpeg -v error -y -i out/vo_track.wav -i out/${TAG}_sfx.wav "${MUSIC_IN[@]}" -filter_complex \
 "[0]aresample=48000,aformat=channel_layouts=stereo,apad,atrim=0:$T,asplit=2[vo][sc];[1]aresample=48000,apad,atrim=0:$T[sf];${MUSIC_FILTER}[vo]$( [ $N = 3 ] && echo '[md]')[sf]amix=inputs=$N:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[o]" \
 -map "[o]" -ar 48000 out/${TAG}_mix.wav
ffmpeg -v error -y -i out/${TAG}_mix.wav -c:a libmp3lame -b:a 256k out/${TAG}_audio-review.mp3
npx remotion render Film out/${TAG}_video.mp4 --codec h264 --crf 15 --muted --log=error
ffmpeg -v error -y -i out/${TAG}_video.mp4 -i out/${TAG}_mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart out/${TAG}_final.mp4
echo "out/${TAG}_final.mp4"
