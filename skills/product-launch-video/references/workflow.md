# Workflow

## Contents
1. Brief
2. Project setup
3. Building scenes
4. Copying a reference
5. Review stills and contact sheets
6. Rendering and delivery
7. Revision rounds
8. Environment notes

## 1. Brief

Gather (from files, the website, the product itself, or the client) and confirm in one short message:
- Product name, one-line promise, audience, where the video will be shown (site hero, LinkedIn, event screen).
- The problem in the audience's words; 4 to 6 features worth showing, each with the UI screen that proves it.
- Proof points (numbers, savings, customers) and whether each is verified.
- Brand: gradient colours in order, ink colour, fonts (files), logo mark as SVG (vector pieces) and wordmark.
- Reference video(s) and which parts to copy exactly vs only feel.
- Length (default 90 to 110 s), aspect (16:9 default; plan 1:1 / 9:16 cut-downs later), voice tool and voice.
- Music: licensed track, or reference music for internal review only.
Default anything not given and say what you defaulted to. Ask only what blocks you.

## 2. Project setup

```bash
cp -r <skill>/kit my-launch-video && cd my-launch-video
npm install                       # remotion 4.x, react 19
python3 scripts/make_sfx.py       # only if public/sfx is missing
# fonts: put the brand's otf/woff2 in public/fonts and list them in src/fonts.ts
# brand: edit src/brand.ts (gradient, ink, mist, fonts)
# logo: python3 scripts/logo_pieces.py public/logo_mark.svg > src/scenes/logoMark.ts
npx remotion studio src/index.ts  # optional live preview
```

Structure: `src/brand.ts` (tokens) > `src/look.tsx` (grounds, text, glass, sounds) > `src/film.tsx` (camera,
shared ground, scene sequencing) > `src/scenes.tsx` (running order) > `src/scenes/*.tsx` (one file per scene).
Scenes get `{dur}` and must read frames with `useF()`.

## 3. Building scenes

- Start from the scene library pattern closest to the beat; keep its mechanics and change content.
- Rebuild product UI as React components with real-looking data, at real proportions (e.g. a 1600 x 900 app frame
  scaled to 0.9), then tilt it. Never animate a flat screenshot.
- Time everything in scene frames (30 fps). Write timings as named constants so retiming is one edit.
- Keep each scene's important action inside its duration minus the last 14 frames (the exit transition).
- After each scene: `node scripts/stills.mjs <5-8 frames across it>` and `python3 scripts/sheet.py out/s.jpg <frames>`,
  look, fix. Check one full-size still (`SCALE=1`) for text clipping and overlaps.

## 4. Copying a reference

When the client says "follow the reference exactly" (or a scene "doesn't match the reference"):
1. Find the cut times: `python3 scripts/compare_ref.py cuts reference.mp4 <from> <to>` (reference may be 25 fps).
2. Extract the reference at full frame rate and study it in sheets of 12 to 36 frames: positions (as fractions of
   the frame), sizes, when each element appears, opacity changes, colour roles, background behaviour, text size and
   alignment, the gaps between beats.
3. Write the measurements down as keyframe arrays (time after the cut, x, y, size) and drive the scene from them.
4. Render our frames at the same moments and compare side by side:
   `python3 scripts/compare_ref.py plan ...`, `node scripts/stills.mjs $(...)`, `python3 scripts/compare_ref.py pairs ...`.
   List every difference (ground, element faintness, transparency of glass, text size, gaps, timing) and fix them all.
5. Only the colours change (mapped by role). Do not add ideas on top of a scene the client wants copied.

## 5. Review stills and contact sheets

- Stills are cheap (a few seconds each); renders are not (15 to 20 minutes). Iterate on stills.
- For motion questions (speed, smoothness), sample 6 to 10 frames evenly through the move, or render a short clip of
  the scene only (`npx remotion render Film out/clip.mp4 --frames=<a>-<b>`).
- For colour or gradient questions, sample the exact moment the client named, plus a few frames either side.
- Always map the client's timestamp to a scene and scene frame first: sum the scene durations from `src/timing.json`.

## 6. Rendering and delivery

```bash
python3 scripts/build_audio.py audio.json   # places the voice, writes src/timing.json, builds the music
bash scripts/render.sh v7                    # out/v7_final.mp4 + out/v7_audio-review.mp3
```
- H.264 CRF 15, AAC 256 kbps, faststart; a 100 s film is ~60 to 70 MB. Use Git LFS for the mp4 in a repository.
- Stop older renders still running before starting a new one (they slow the new one and are already outdated); tell
  the client in one line if they notice.
- Delivery message: version and length; what changed, by timestamp, in plain words; anything you could not do fully
  and why; open items (claims, licences, recordings). No process narration.

## 7. Revision rounds

- Batch the client's notes; confirm each one maps to a scene; fix all; check stills of each; re-render once.
- If a note conflicts with an earlier one, follow the latest and mention it.
- If you cannot fully deliver a note (e.g. trimming a pause would clip a word), do the safe part and offer the next
  option in one line.
- New voice lines: give the script with expression tags, wait for the clips, then place them and retime text.
- Keep the voice-over placement file (`VOICEOVER_PLACEMENT.md`) as the shared source of truth for timing.

## 8. Environment notes

- Remotion renders need Chromium (`@remotion/renderer` downloads its own, or use a preinstalled one).
- `faster-whisper` for word timings: pass numpy audio (some PyAV builds reject file paths).
- Demucs for removing vocals from a reference track.
- Long renders run in the background; never poll with sleeps.
