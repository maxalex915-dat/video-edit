# Script, voice-over and music

## Contents
1. Story structure
2. Writing the lines
3. Voice-over production (ElevenLabs)
4. Placing the voice on the animation
5. Music
6. Mixing and loudness

## 1. Story structure

A 90 to 110 second launch film in five movements. Percentages are of total length.

| Movement | Share | What the viewer should feel | Lines (examples from the approved film) |
|---|---|---|---|
| Problem | ~30% | "That's me." Scale, then sprawl, then manual pain, then cost | "Millions of marketing teams around the world rely on an average of 15 different platforms just to run their marketing operations." / "What should be simple has become fragmented and manual." / "Sign in, export, make the reports all by hand, every single week." / "Not to mention, different providers, different logins. Some even cost hundreds of dollars in subscription fees." |
| Turn | ~5% | relief | "But what if running your marketing could be so much simpler, with everything you need in one place?" |
| Reveal | ~3% | the name, on the music's drop | "Introducing the Marketing Dashboard." |
| Features in use | ~45% | "it does that?" 4 to 6 features, each one line, each shown being used | "All platforms in one dashboard, updated automatically. No more copy and paste." / "Spot a spike on one channel and see how it connects to the others." / "Every week, AI reads the numbers and tells us what to do next." / "Turning insights into an action plan for the team." ... |
| Proof + more + close | ~17% | trust, abundance, memory | "We now save over $2,000 a year on our SEMrush subscription." / "But wait, there's more." / a fast list of 8 features "...and a lot more." / "The Marketing Dashboard. Less time collecting, more time marketing." |

Rules of thumb:
- No headline statistic in the brief? Open on the pain as a short, concrete sentence instead ("Hours lost to the rota
  every week"), or a question. Never invent a number to fill the opener.
- One idea per line, one line per scene. A line is 2 to 5 seconds spoken.
- Put a saving or proof point near the end of the features: it is the business reason.
- "But wait, there's more" plus a fast montage gives the breadth without slowing the film.
- End with the product name and a two-part tagline that contrasts (collecting vs marketing).
- Verify every statistic. Mark unverified claims in every delivery until the client confirms them.

## 2. Writing the lines

- Spoken, not written: contractions, short words, no lists inside a sentence except in the montage.
- No jargon, no buzzwords ("leverage", "unlock", "seamless", "game-changer"), no exclamation marks.
- If a client brand voice exists, follow it for on-screen text and the voice script alike.
- The on-screen text is not the voice line. It is the 2 to 6 word core of it ("Every week. By hand.").
- Match plural/singular naturally ("subscription fees", not "fee").

## 3. Voice-over production (ElevenLabs)

- One voice for the whole film (the approved film used "Jessica"). Keep the same voice, model and settings for every
  re-record, or the new line will sound like a different person.
- Use the **Eleven v3** model for expression tags; on older models the tags are read out loud. Tags go in square
  brackets before the words they colour. Examples that worked:
  ```
  [slightly frustrated] Not to mention, different providers, different logins. [sighs] Some even cost hundreds of dollars in subscription fees.
  ```
  ```
  [playful] But wait... [excited] there's more.
  ```
  Tell the client to generate 2 or 3 takes per line (v3 varies a lot) and to drop `[sighs]` if it sounds overdone.
- Record each line as its own clip; give the client ONLY the lines that change when revising, ready to copy, one per
  code block.
- Never ask the client to paste an API key into the chat. If you need to generate voice yourself, they add the key as
  an environment variable or secret in their setup and a new session picks it up.
- Processing: trim leading/trailing silence (keep 40 ms before, 120 ms after), speed up 4% (new clips) to 8% (an older,
  slower take) with `atempo` so the pace is lively, tighten internal pauses to ~0.15 s for list-like lines, cut a long
  silence before a sigh but keep the sigh. Do not cut into the last word: check the clip's tail energy (sibilants
  like the "s" of "fees" are quiet but audible).

## 4. Placing the voice on the animation

The animation leads; the voice follows (`kit/scripts/build_audio.py`):
- Each line is pinned to a scene with an offset (usually 0.07 to 0.4 s; later offsets for a second line in the same
  scene).
- At least 0.6 s of silence before each line (0.3 s between two lines in the same scene). If a line would start too
  early, the PREVIOUS scene is held longer. The final scene lengths go to `src/timing.json`.
- Then measure the words (`python3 kit/scripts/vo_words.py out/vo_track.wav`) and move on-screen text and key
  actions onto the spoken words: list items appear on their word; "Simpler" lands on "simpler"; montage items move on
  their names. Whisper's first word after a silence is often early; for line starts trust the energy onsets printed
  by the same script.
- To remove a pause the client dislikes, shorten what causes it: trailing silence in the clip, the hold of the scene
  before, or the offset of the next line. Never go below the breath gaps above, and never clip a word.
- If the client says "the voice is late", measure before moving anything: in the source project every line was
  within 0.1 s of its scene, and the real fault was the scene's text becoming readable ~0.3 s after its pops and
  voice (fixed in the transition's arrival curve).

## 5. Music

- One track with a clear quiet intro, a drop, a loopable main section and a natural ending. If taken from a reference
  video, remove its voice with Demucs (`demucs --two-stems=vocals`), and mark it "internal review only" until licensed.
- The drop lands on "Introducing" (the reveal). The quiet intro is stretched by repeating its last bars until the drop
  falls on that scene.
- The track's own ending lands on the logo, ~0.2 s before the film ends. Extend the middle with whole loops (e.g. 16.2 s)
  and two-bar repeats (e.g. 3.75 s), joined with 60 ms equal-power crossfades on bar lines; never fade out a loop.
- Measure the track once: BPM, first downbeat, drop time, loop points, two-bar length. Put them in `audio.json`.

## 6. Mixing and loudness

- Voice on top. Music ducked under the voice with a sidechain compressor (threshold 0.03, ratio 6, attack 20 ms,
  release 350 ms), music at 0.9 before ducking.
- Sound effects at their placed volumes (pops 0.1 to 0.26, swooshes 0.05 to 0.16, cut swooshes 0.14).
- Loudness-normalise the mix to -14 LUFS integrated, -1.5 dBTP, LRA 11 (web/social standard).
- Deliver an mp3 of the mix for audio-only review whenever only sound changed (it is faster than a full render).
