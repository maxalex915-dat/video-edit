# Marketing Dashboard launch film (Remotion)

90 s, 1920x1080, 30 fps, built in code. No screenshots, no stock, no network at render time.

- Render: `npm run render` (or `npx remotion render Launch out/marketing-dashboard-launch.mp4 --codec h264 --crf 18`)
- Preview: `npx remotion studio`
- Scene timing (in music bars): `src/timeline.ts`. One file per scene in `src/scenes/`.
- Colours and type: `src/theme/`. Backgrounds: `src/components/kit/Gradients.tsx`.
- Copy: in each scene file (`Headline a=... b=...`).
- Music: `public/music.m4a` (cut from the supplied track to 90 s on bar lines). Sound effects: `public/sfx/`, made by `python3 scripts/make_sfx.py`.
- Review stills: `node scripts/stills.mjs <frame> <frame> ...` writes to `out/f/`.
- Storyboard: `storyboard/storyboard-v7.png`; research: `RESEARCH.md`; demo data: `DATA_NOTES.md`.

License: Remotion needs a paid Company License for organisations of more than 3 people.
