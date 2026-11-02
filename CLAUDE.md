# Task: re-render the approved Archetype Group intro cut from the 1080p master

You are working in a repo that contains this kit plus the original 1080p corporate video
("we are Archetype Group, we are Shaping Tomorrow", about 158 s, usually named
`Archetype Group_INTRODUCING VIDEO.mp4`).

## Goal

Produce a 1080p version of the approved 59.08 s cut ("v6"). It must look and sound exactly like the approved
version. The edit is already decided. Do not make creative changes.

## What v6 is

- 11 segments cut from the master, joined with 0.2 s crossfades, 25 fps, 59.08 s total (must stay under 60 s).
  Exact cut points: `edit_list.json`. Narration and on-screen text per segment are listed there.
- Audio is finished and fixed: isolated voice (narration only, original music removed) plus the track
  "Over The Mountains" (Infraction), edited to fit and mixed at about -16.8 LUFS. It lives in `audio/audio_v6.m4a`
  and is muxed with `-c:a copy`.
- `reference/v6_360p.mp4` is the approved result at 360p. `reference/v6_contact_sheet.jpg` shows it as timestamped
  frames. `reference/source_360p.mp4` is the 360p copy of the master that the cut was made from.

## Do this

1. Make sure ffmpeg, ffprobe, python3 and numpy exist. If ffmpeg is missing:
   `sudo apt-get update && sudo apt-get install -y ffmpeg` (or `pip install imageio-ffmpeg` and use that binary).
   `pip install numpy` if needed.
2. Find the master: the large .mp4 in the repo that is NOT under `reference/`, `output/` or `audio/`.
   If it is only a tiny text file (a Git LFS pointer, about 130 bytes), run `git lfs install && git lfs pull`.
   If the file is split or missing, stop and tell the user.
3. `scripts/check_source.sh "<master>"`. It must print PASS.
4. `scripts/render.sh "<master>"`. It re-runs the check, renders to `output/`, then runs `scripts/verify_output.sh`.
   It must end with `ALL CHECKS PASSED`.
5. Look at 4 frames of the result yourself (for example at 0.5, 20, 45, 58 s) and compare with
   `reference/v6_contact_sheet.jpg`. Same shots, same text, same order.
6. Commit `output/*.mp4` to a new branch named `v6-1080p` and push it, then tell the user the file name, size
   and the branch. If the push is refused, say so and keep the file in `output/`.

## Do not

- Do not re-cut, re-transcribe, re-mix, re-normalize or replace the audio. Keep `-c:a copy`.
- Do not change segment times, crossfade length, frame rate or the song.
- Do not use the single-input graph `cut_filter.txt` on a 1080p master. It runs out of memory.
  It is kept only as the human-readable version of the cut. `render.sh` uses one input per segment, same cuts.
- Do not delete or overwrite the master. Do not commit the master or any intermediate file.
- Do not touch anything outside this repo.

## If the master does not match

`check_source.sh` fails when the master is a different edit, a different length or shifted in time.

- Run `python3 -I scripts/find_offset.py "<master>"`.
- If it reports a constant offset with correlation above 0.9, render with
  `SOURCE_OFFSET=<value> FORCE=1 scripts/render.sh "<master>"`, then review frames by eye (step 5).
- If correlation is low, or the master is a different length (for example the "_no text" variant or a recut),
  stop. Report the numbers to the user and ask which file is the right master. Do not guess.

## Knobs

- `SCALE_TO_1080=1` scales a 4K master down to 1920x1080.
- `MAXMB` (default 95) is the size cap, set below GitHub's 100 MB per-file limit. `render.sh` raises CRF
  from 17 up to 25 until the file fits.
- `CRF_LIST="17"` forces one CRF. `PRESET=veryfast` speeds up a test run.
- Expect 2 to 4 minutes per encode for a 1080p master on a small machine.

## Known small difference from the original run

The original v6 was rendered from one filter graph. This kit uses one input per segment for memory reasons. On a
test of the same cut, 1476 of 1477 frames were bit-identical and one frame inside a crossfade differed slightly
(PSNR 29 dB, not visible). Do not try to "fix" this.

## Facts worth keeping in mind

- Narration says "thousands of collaborators". On-screen text in the source says "a thousand of collaborators".
  That is how the source is. Report it, do not change it.
- The song is by Infraction, supplied by Dat. Its license terms and credit requirement have not been verified.
  Mention this when delivering.
