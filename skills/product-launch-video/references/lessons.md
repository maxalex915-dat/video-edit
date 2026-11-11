# Lessons: every client correction and what it teaches

From 28 versions of the source film. Each entry: what the client said (paraphrased), the real cause, the fix, and
the general rule. Read this when a similar note comes in; most notes repeat across projects.

## Timing and pacing
- **"There's a 1 s pause on an empty screen" (x3).** Cause: a scene's first element started 1.5 s in, or a held
  detail stayed up too long, or trailing silence in a voice clip. Fix: start something at frame 2-4 (an arrow drawing
  in), trim the scene end, trim the clip tail. Rule: no dead time over ~1 s without voice; check every scene's start
  and end.
- **"Trim 1 s here" but the voice needs it.** Fix what is safe (cut silence, not words), say how much was cut and what
  the next option is. Rule: never clip a word to hit a requested number.
- **"The bento hold is too long; make it faster."** Rule: outros should feel decisive: land, short hold, go.
- **"Voice clips are too close together."** Rule: 0.6 s of silence before every line; hold the previous scene to
  make room (automated in build_audio.py).
- **"The 'Simpler' text appears for a split second."** Rule: a payoff word stays >= 1 s; the next line replaces it
  without a gap.

## Sync
- **"The sfx don't match the animation, especially the text reveal" / "the voice is a bit delayed".** Cause: scenes
  faded in slowly, so a scene's text became readable ~0.3 s AFTER its pops and voice. Fix: arrival curve that makes a
  scene readable by frame 2-3. Rule: measure (energy onsets, stills of first visible frames) before moving anything.
- **Cursors and their clicks off by 14 frames.** Cause: reading the raw composition frame inside a scene that
  starts early for the transition. Rule: every scene helper reads `useF()`.

## Colour
- **"The added colour is too dark; only use brand colours, a bit of white is fine."** Rule: no hue outside the brand
  gradient plus white in grounds.
- **"The loop is a solid blue, not the gradient" (x3).** Causes, in order: a gradient set in screen space while the
  logo shrank; then a gradient lerped to the logo's box (a slice of it is one colour mid-shrink); finally the real
  cause: the logo is 38 flat-coloured pieces, not one gradient. Fix: draw each piece in its own colour once the mark
  is smaller than the screen. Rule: inspect the logo file; reproduce its real colouring.
- **"Make the fluid movement more noticeable."** Rule: blobs must visibly travel and stretch within a second.

## Layout
- **"Part of a number is cut by the border; audit the bento."** Rule: full-size stills of every card; fix sizes,
  nowrap, flex shrink, min widths; remove rows that do not fit rather than squeezing.
- **"The logo is still cut a bit at the bottom."** Rule: check the final frame of the outro at full size.
- **"Shrink the cards so the bottom row isn't cut."** Rule: a UI frame must show complete cards, top to bottom.

## Motion
- **"The dot is too confused / too fast / not graceful", then "follow the reference exactly".** Two original ideas
  (wide wander, black hole) were rejected. Rule: when a reference exists for a beat, copy it precisely first; propose
  variations only if asked.
- **"Blocks should not change shape, only move aside."** Rule: keep element shapes stable; move, do not deform.
- **"The cursor is too fast; make it graceful; the hover lift is too fast."** Fix: sine speed curve, 24-30 frames per
  move, rests, a lift that eases over ~0.8 s. Then: "remove the cursor entirely; cards just float up". Rule:
  overviews feel calmer with no cursor.
- **"Make the montage list curve" (three tries on direction).** Rule: sketch the curve direction in words with the
  client ("items curve away from the visuals, like spokes of a wheel") before building.

## Content and design
- **"More chaotic, more copy-paste from other sheets."** Rule: show pain with repetition and variety, not one example.
- **"Too simple: just two dials" / "just one recommendation card".** Rule: every feature shot shows depth: parts of
  a score, several items, a state change.
- **"Add cursor interaction: click the issue, it expands into details."** Rule: show the product being used; the
  click-into-detail pattern sells "explained" features.
- **"Recommendations should form an action plan in columns like before."** Rule: connect features into a flow
  (insight > task > done) rather than separate shots.
- **"Several cursors with name tags; Lucas did nothing."** Rule: every actor must act.
- **"Use my name and other nationalities, not all local names."** Rule: ask whose names to use; mix as directed.
- **"Replace the PR card with the site health card."** Rule: the overview should foreshadow the features shown later.
- **"Platform cards need charts and stuff."** Rule: no card is just a number; give it a trend, a change, a mini chart.
- **"Make those cards frosted glass."** Rule: floating chips are glass.
- **"Remove that small line under the product name."** Rule: the reveal is the name alone.
- **"Add a 'But wait, there's more' scene"** before the montage. Rule: it is a strong bridge into the feature list.

## Process
- Commit and push after every change; deliver the rendered file every round.
- Give the voice script with ElevenLabs expression tags, only the lines that change, one per copy block.
- Short, plain-language replies; recommendation, not menus; flag unverified numbers every time.
