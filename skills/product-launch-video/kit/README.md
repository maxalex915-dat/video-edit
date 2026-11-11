# Code kit

A working Remotion (React) project with the style's building blocks. Copy the folder, `npm install`, then edit
`src/brand.ts` and `src/scenes.tsx`. The demo film renders as is (six example scenes) so you can see the look before
changing anything.

| File | What it gives you |
|---|---|
| `src/brand.ts` | the only per-brand file: gradient colours, ink, mist, fonts |
| `src/motion.ts` | named curves (snappy, inOut, expoIn, soft, glide), springs, `prog`, `lerp`, `spr` |
| `src/frame.ts` | `useF()` (scene frame, transition-aware) and the shared-ground switch |
| `src/look.tsx` | `FluidField`, `Mist`, `Dots`, grain, `Words` (word-by-word blur text with pops), `glow()`, `glass()`, `Drift`, `Tilt`, `Pop`, `Swish`, `Sfx` |
| `src/film.tsx` | the camera: shared blooming ground, push/pull/slide transitions, scene sequencing from `src/timing.json`, cut swooshes |
| `src/scenes.tsx` | the running order (name, component, ground, camera move in) |
| `src/cursor.tsx` | arrow `Cursor`, coloured `Teammate` with name tag, `Ripple`, `cursorPos` (sine glide with arc) |
| `src/magnet.tsx` | `HoverCtx` + `MagnetCard`: cards floating up as an invisible path passes |
| `src/dial.tsx` | big score dial (270-degree gradient arc, count-up) |
| `src/scenes/Statement.tsx` | opener: huge word shrinking into a sentence on the fluid field |
| `src/scenes/Chaos.tsx` | tool sprawl: frosted chips popping around a line |
| `src/scenes/Problems.tsx` | problem list > field and dot > "Simpler" > "Everything in one place" (reference copy) |
| `src/scenes/ButWait.tsx` | "But wait, there's more." |
| `src/scenes/Montage.tsx` | feature list on a wheel with the real visuals on the left |
| `src/scenes/LogoOutro.tsx` + `logoMark.ts` | gradient card > giant logo mark > real size in its own colours > wordmark |
| `public/sfx/` | `mpop0-2.wav`, `mswoosh0-1.wav` (the only sounds the style uses) |
| `public/fonts/` | Inter and Inter Display (OFL); replace with the brand's fonts |
| `scripts/make_sfx.py` | regenerates the sounds (deterministic, numpy) |
| `scripts/build_audio.py` + `audio.example.json` | voice placement on the animation, breath gaps, scene holds, music re-cut to the film, writes `src/timing.json` |
| `scripts/vo_words.py` | word timings + line onsets of the voice track (faster-whisper) |
| `scripts/render.sh` | sfx track, ducked mix at -14 LUFS, picture CRF 15, mux, mp3 for audio review |
| `scripts/stills.mjs`, `scripts/sheet.py` | review stills and labelled contact sheets |
| `scripts/compare_ref.py` | reference vs ours side by side at matched times; scene-cut finder |
| `scripts/logo_pieces.py` | logo SVG > vector pieces with their own fills, for the outro |

Requirements: Node 18+, Python 3 with numpy and Pillow, ffmpeg; optional faster-whisper (word timings) and demucs
(removing vocals from a reference track).

Quick commands:
```bash
node scripts/stills.mjs 40 160 420 && python3 scripts/sheet.py out/check.jpg 40 160 420
python3 scripts/build_audio.py audio.json
bash scripts/render.sh v1
```
