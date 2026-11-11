# Style guide

The visual language, with numbers. All values are for 1920 x 1080 at 30 fps. Code for each item is in `kit/src/`.

## Contents
1. Mood in one paragraph
2. Colour
3. Grounds (backgrounds)
4. Type
5. Text animation
6. Cards and glass
7. Depth, tilt and camera
8. Motion curves and timing
9. Cursors and interaction
10. Transitions between scenes
11. Texture
12. Things that look cheap (avoid)

## 1. Mood

Bright, airy and calm, with energy coming from motion, not from colour or noise. Think of a keynote product film
crossed with the Peko launch video by Burnwe: lots of light space, a brand gradient that behaves like a slow liquid,
UI that floats as frosted glass, and a camera that keeps gliding. Nothing flashes, nothing shakes, nothing is dark.

## 2. Colour

- The brand gradient is 2 to 4 colours in a fixed order (e.g. green > cyan > light blue). Define it once in
  `src/brand.ts`. Use it for: full-colour grounds, the bloom at the bottom of light grounds, one highlighted word in a
  headline, dial arcs, chart lines, small badges, the logo.
- Plus white, a near-black ink tinted toward the brand (e.g. `#10242a`), one muted text grey and a mist off-white.
- **Never add a colour to "help" the palette.** In the source project a deep teal shadow blob was added to the fluid
  gradient for depth; the client called it too dark and asked to use only brand colours plus a bit of white.
- Shadows and hairlines are tinted from the brand too (`shadeA()`, `inkA()` in `brand.ts`), never a stock grey or
  another brand's teal.
- Third-party colours appear only on small logos (platform chips). Status colours (red error, amber warning, green
  done) appear only inside UI and in small doses.
- If the reference video is in another brand's colours, map its roles, not its hues: their primary becomes your core
  brand colour, their highlight becomes white or your light end, their warm glow becomes your warm end.

## 3. Grounds

Two grounds alternate through the film, and one is always under every scene (drawn once by the Film, shared, so a
camera move never reveals an edge):

**Mist** (UI, lists, explanations): off-white `#f3f6f6` with the brand gradient rising softly from the bottom
(heavily blurred, 90 px, masked to fade upward). A `lift` of 0 to 1 sets how high the colour rises; raise it through a
scene for a sense of build. A dot grid texture sits on top (section 11).

**Fluid field** (statements, big moments, the "turn"): the core brand colour as a base, with 5 or 6 huge blurred
blobs (the other brand colours and white) that drift, stretch (non-uniform scale up to 1.5:0.5) and rotate. Blobs are
1000 to 1800 px, blurred 80 px, travel several hundred pixels over a few seconds and turn 12 to 30 degrees a second.
**The motion must be clearly visible**: the client asked twice for "more noticeable viscous fluid movement". If you
can't see it move in two stills 1 s apart, it is too slow. White text only on this ground.

A third, special ground is the **rising glow** of the "simpler" scene: mist with a soft colour mound swelling up from
the bottom middle, the sides filling later (copied from the reference; see the scene library).

Scene grounds bloom into each other: the new ground opens as a growing radial mask from the side the camera is moving
toward, over 28 frames.

## 4. Type

- Display: a tight grotesk (Inter Display Semibold 600) for headlines; text face (Inter) for UI.
- Headline sizes: hero word 190 to 230 px, statement 84 to 120 px, scene headline 60 to 68 px, list items 64 px,
  sub-lines 34 to 46 px. Letter spacing -0.035em on display sizes, line height 1.12.
- One word or phrase per headline may be in the brand gradient (text clipped to the gradient); usually the payoff
  ("One dashboard.", "sorted and explained."). Keep gradient phrases to 1 to 3 words: each word carries its own
  full gradient, so a long phrase shows several short sweeps.
- Ink on mist, white on fluid. Muted grey only for sub-lines.
- Plain words. No jargon, no product codes, no exclamation marks, no em dashes.

## 5. Text animation (`Words` in `look.tsx`)

- Word by word: each word slides in from the left (0.6 x font size) out of a 14 px blur, opacity 0 > 1, over 18
  frames with the snappy curve; words start 3 frames apart (5 to 12 for slow, weighty lines).
- One soft pop per word (quiet; volume 0.13).
- Exit: the whole line blurs (14 px), lifts 20 px and fades over 9 frames, accelerating away.
- A line is on screen long enough to be read twice: at least 1 s after its last word lands. "Simpler" shown for a
  split second was flagged as unreadable.
- Text starts on the voice: the first word appears on the frame the voice says it (measure with `vo_words.py`).
- A new scene's first text must be readable by the time its pop plays: scenes arrive readable by frame 2 or 3
  (the Film's arrival curve handles this; do not start text later than frame 2 in a scene without reason).

## 6. Cards and glass

- **UI panels** (the real product): white at 92 to 98% on mist, 22 to 30 px corners, a white halo (`glow()`): a
  6 px white ring at 35%, a 70 px white bloom, and a soft brand-tinted drop shadow below.
- **Frosted glass** (chips, the "simpler" card, overlays): see-through white gradient (62% > 26%), backdrop blur 18 px
  with saturation 1.4, a 1.5 px white edge, a bright top inner highlight and a soft inner glow at the bottom
  (`glass()`). The ground's colour must show through. Floating platform chips are glass, not solid white (client
  request).
- UI text inside cards: 14 to 27 px, real-looking data (names, dates, numbers with commas), no lorem ipsum.
- Charts are drawn on (line draws left to right, area fill fades in under it), numbers count up with the snappy
  curve, bars grow from the bottom one after another.

## 7. Depth, tilt and camera

- UI layouts are shown tilted: rotateX 12 to 26 deg, rotateY -16 to 14 deg, a little rotateZ (1 to 3), perspective
  2200 px. The tilt eases toward flatter over the scene (e.g. 22 > 14 deg).
- Before a cursor clicks something inside a tilted layout, ease the layout to flat (0 deg over ~20 frames) so the
  click visibly lands on the target, or put the cursor inside the tilted layer.
- Cards lift out of the page toward the camera (translateZ 60 to 170 px) with deeper shadows as they rise.
- Every scene drifts: a slow push of 5 to 8% scale over its length (`Drift`). The camera never stops.

## 8. Motion curves and timing

Use only the named curves in `motion.ts`:

| Curve | Use |
|---|---|
| `snappy` bezier(0.16,1,0.3,1) | entrances: words, cards landing, numbers counting |
| `inOut` bezier(0.83,0,0.17,1) | morphs and camera moves with momentum |
| `expoIn` bezier(0.7,0,0.84,0) | exits that accelerate away |
| `soft` sine in-out | cursors, hover lifts, anything that must feel unhurried |
| `glide` | slow constant drifts |

Springs: `soft` for panels arriving, `pop` (small overshoot) for chips, badges and stamps.

Typical durations: word 18 f, card arrival 20 to 30 f, camera transition 28 f total, cursor move 24 to 30 f
between targets (shorter reads as frantic), hover lift settles over ~24 f, a held "read" moment 30 to 45 f.

Pacing: something is always moving, but only one thing is the focus at a time. Dead time (nothing new for more than
~1 s with no voice) gets cut; the client flagged three such pauses by timestamp.

## 9. Cursors and interaction (`cursor.tsx`)

- The arrow cursor is dark with a white edge; it moves on the `soft` sine curve with a slight arc, rests briefly on
  what it points at, presses (scales to 0.85) on a click, and a ripple ring spreads from the click.
- Clicks change something on the same frame: a button turns into "Task created", a row opens into a detail card,
  a card lifts and travels.
- Collaboration: several cursors in different colours with name tags (white text on a coloured pill, white border).
  Every one of them must do something (drag a card, click); a cursor that only wanders was flagged as pointless.
- Hover without a cursor: on a dashboard overview the client preferred no cursor at all, with cards floating up one
  after another as if a weak magnet passed under them (`magnet.tsx`).

## 10. Transitions between scenes (`film.tsx`)

- Old foreground leaves and new arrives in one camera move: pushIn (old scales up and blurs, new grows from 55%),
  pullOut, left/right (1100 px), up/down (800 px), with blur up to 26 px. 14 frames each side of the cut.
- The old text is gone before the new text is readable; never two headlines on screen.
- Vary the move from scene to scene; follow the content (a list going down > move up; a reveal > push in; the outro
  > pull out).
- A muffled swoosh on every cut, peaking at the cut.

## 11. Texture

- Dot grid: dots on a 40 px grid, radius 0.9 to 2.2 px breathing in a slow wave, drifting diagonally; 16% opacity in
  a dark brand tint on mist, 22% white on the fluid field.
- Film grain: monochrome fractal noise, overlay blend, 3.5% on mist, 12% on the fluid field, re-seeded every frame.

## 12. Things that look cheap (avoid)

- Hard cuts, flashes, whip pans, shakes, bounces on text.
- Stock icons and emoji, clip-art people, 3D characters.
- A static screenshot "zoom". Use rebuilt live UI.
- Gradients with a foreign colour, dark vignettes, neon glows.
- A cursor zipping (fast in-out curve), cards snapping up on hover.
- Text appearing before its scene is readable, or words appearing seconds before the voice says them.
- Text cut by a card border, numbers clipped, layouts that overlap at the edges (audit every card at full size).
