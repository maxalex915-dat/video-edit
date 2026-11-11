---
name: product-launch-video
description: Motion design system and production workflow for 60 to 120 second SaaS / product launch videos in a modern "Apple keynote meets Peko" style - light mist grounds, a fluid brand-colour gradient, frosted glass UI cards in 3D, word-by-word blur text, one continuous camera, muffled pops and swooshes, an AI voice-over placed on the animation, and a logo-zoom outro. Built in Remotion (React) with a ready code kit, sound effects and audio scripts. Use this skill whenever someone wants a launch video, product video, explainer, promo, feature reel, sizzle video, app announcement or animated product demo, wants to animate a dashboard or app UI, wants to copy the motion style of a reference video, or asks for a voice-over script and storyboard for a product - even if they never say "motion design" or "Remotion".
---

# Product launch video

You are making a short launch video for a software product: problem, reveal, features in use, proof, close. The look
is calm, premium and bright: light grounds, the brand's gradient moving like a thick liquid, glass cards floating in
3D, text that blurs in word by word, and a camera that never stops. Every sound lands on a visible event, and every
voice line lands on its text.

This skill was distilled from a long real project, 28 versions of a 100 s launch video for a marketing dashboard,
reviewed frame by frame by a demanding client. The rules below are what survived that review. When a rule says
"the client rejected X", treat it as a real data point about taste, not a guess.

## What to read, when

| When you are... | Read |
|---|---|
| starting a project (always) | this file, then `references/workflow.md` |
| writing the script or voice-over, or doing music | `references/script-voiceover-music.md` |
| designing any scene | `references/style-guide.md` and `references/scene-library.md` |
| placing sounds | `references/sound-design.md` |
| about to show anything to the client | `references/review-checklist.md` |
| copying a reference video | `references/workflow.md` (section "Copying a reference") |
| unsure why a rule exists | `references/lessons.md` (every client correction, with the fix) |
| writing code | `kit/README.md` (the code kit: copy it, then edit `src/brand.ts` and `src/scenes.tsx`) |

## The non-negotiables

1. **Animation is the master clock.** Build and time the picture first. Voice lines are then placed onto it, each on
   its own scene with a breath (0.6 s of silence) before it. If a line does not fit, hold the scene before it longer;
   never squeeze the voice and never cut a line to fit the picture. `kit/scripts/build_audio.py` does this and writes
   the final scene lengths to `src/timing.json`, which the film reads, so picture and sound cannot drift apart.
2. **Brand colours only (plus white).** Every coloured area is made of the brand gradient's colours and white. No
   dark "depth" colour, no extra accent, no grey-blue. The only exceptions are third-party logos at small size and
   status colours (red, amber, green) inside UI.
3. **One continuous camera.** No hard cuts between scenes: the old scene leaves and the new one arrives in the same
   camera move (push in, pull out, left, right, up, down; 14 frames each side), over one shared ground that blooms
   from scene to scene. The camera also drifts slowly inside every scene.
4. **Real UI, really used.** Show the actual product UI (rebuilt as live components, not screenshots), with real-looking
   data, tilted in 3D and then used: cards rise, a cursor clicks, a row opens into its detail, cards get dragged.
   A feature is shown by something happening, never by a static picture.
5. **Text blurs in word by word** (slide from the left out of a 14 px blur, 18 frames, 3 frames apart), is short
   (a headline of 2 to 6 words), sits on the voice, and blurs away upward. Never more than one line of text competing
   with the voice.
6. **Every sound has a visible cause on the same frame**, and every visible event of importance has a sound. Soft and
   low (muffled pops, airy swooshes); never clicks, beeps or bright UI sounds.
7. **Check by looking.** After every change render stills of the changed frames and look at them before saying
   anything is done. Before every delivery go through `references/review-checklist.md`.
8. **Claims are flagged.** Any statistic or saving in the script ("millions of teams", "save $2,000 a year") and
   every number on screen is demo data until the client confirms it. Say so on every delivery. The music from a
   reference video is for internal review only until licensed.

## Workflow in one screen

1. **Brief** (`references/workflow.md` > Brief): product, audience, the 3 to 5 features worth showing, proof points,
   brand colours and fonts, logo SVG, reference video if any, target length, where it will be shown, voice tool.
   Ask only what you cannot find; propose defaults for the rest.
2. **Script** (`references/script-voiceover-music.md`): problem (25%) > turn ("But what if...") > reveal
   ("Introducing...") on the music's drop > features in use (45%) > proof/saving > "But wait, there's more" montage >
   name + tagline + logo. Give the client the lines ready to paste into the voice tool, with expression tags.
3. **Storyboard**: one contact sheet of key frames from a first build, not drawings. Get the order and look approved
   before polishing.
4. **Build**: copy `kit/`, set `src/brand.ts`, list scenes in `src/scenes.tsx`, write each scene from the library
   patterns. Render stills constantly (`node scripts/stills.mjs <frames>`, `python3 scripts/sheet.py`).
5. **Voice + music**: put clips in `public/vo/`, describe them in `audio.json`, run `python3 scripts/build_audio.py
   audio.json`, measure words with `python3 scripts/vo_words.py out/vo_track.wav`, move on-screen text onto its
   spoken words.
6. **Render**: `bash scripts/render.sh v1` (sfx track, ducked mix at -14 LUFS, picture at CRF 15, mux). Also hand over
   the mp3 of the mix for an audio-only review when only sound changed.
7. **Review loop**: deliver, take notes, fix, re-render. Each round: say exactly what changed, by timestamp, in plain
   words, and list what still needs the client (claims, licences, recordings).

## How to work with the client (these are preferences of real clients, keep them)

- Non-technical: plain words, no code walk-throughs, no jargon. Short replies: the result and what they need to
  decide. Do not narrate process between steps.
- Give a recommendation, not a menu. If they ask for something that will look worse, say so once with the reason,
  then do what they decide.
- When they say "copy the reference exactly", do exactly that: measure the reference frame by frame
  (`kit/scripts/compare_ref.py`) and match timing, size, colour and motion. Two "creative improvements" on top of a
  reference were rejected in the source project before the exact copy was accepted.
- When they report a problem ("the loop is still the wrong colour"), find the real cause before fixing. Saying it is
  fixed when it is not costs more trust than anything else. Verify with stills of the exact moment.
- Timestamps they give refer to the latest version they watched. Map them to scenes before editing.
- Keep a running list of open questions (claims to verify, licences, voice lines to re-record) and repeat it briefly
  at each delivery.
- Commit and push every change (and the rendered video, via Git LFS) when working in a repository.
