# Scene library

The scenes of the approved film, in order, as reusable patterns. Each has: purpose, ground, length, what happens
frame by frame, and what the client corrected. Swap the content for the new product; keep the mechanics.
Patterns marked [kit] exist as code in `kit/src/scenes/`; the others are described precisely enough to build.

Approved running order (1:43): Statement 2.9 s > Tool sprawl 5.4 > Fragmented 4.3 > Manual work 5.3 >
Problems to "Simpler" 14.3 > Introducing 3.6 > Dashboard 5.25 > Trend 5.0 > AI report to action plan 9.3 >
Feature intro 3.7 > Scores 4.2 > Issues 6.3 > Expert review 5.1 > Saving 4.1 > "But wait" 2.6 > Montage 12.5 >
Bento and logo 8.5. Problem ~33%, reveal ~4%, features ~50%, close ~13%.

## Contents
- A. Problem act: 1 Statement, 2 Tool sprawl, 3 Fragmented, 4 Manual work, 5 Problems to "Simpler"
- B. Reveal: 6 Introducing
- C. Features in use: 7 Dashboard, 8 Trend, 9 AI report to action plan, 10 Feature intro, 11 Scores, 12 Issue detail, 13 Review deck, 14 Saving
- D. Close: 15 "But wait", 16 Montage wheel, 17 Bento and logo outro
- E. Patterns that work in any scene

---

## A. Problem act

### 1. Statement [kit: Statement.tsx]
Fluid ground, ~2.9 s. One huge white word (the statistic, 230 px, e.g. "Millions") blurs in at f12, then shrinks to
55% and rises while the rest of the sentence ("of marketing teams", 92 px, weight 500, stagger 7) blurs in under it
at f31. Slow push (6%). Voice starts at 0.4 s.

### 2. Tool sprawl [kit: Chaos.tsx]
Mist, ~5.4 s. "rely on" (84 px) then, on the voice, "15 different platforms" with the number in the gradient.
Around the line, 12 to 15 frosted glass chips (logo dot + name, 25 px) pop in one by one in a scattered order
(3 frames apart, pop spring), placed on an ellipse at different scales (0.8 to 1.04) with the smaller ones slightly
blurred (depth), each bobbing gently. A few file names ("report_FINAL_v7.xlsx") drift blurred in the background.
One pop per chip. Client correction: chips must be frosted glass, not solid white.

### 3. Fragmented
Mist, ~4.3 s. A soft vertical pillar of light in the brand gradient (green at the foot to transparent at the top)
rises from the bottom; on "fragmented" it splits into three wavy ribbons. Headline: "What should be simple" then
"has become fragmented and manual".

### 4. Manual work (spreadsheets to slides)
Mist, ~5.3 s. Seven glass "spreadsheet" windows (green-tinted, with grids of numbers) around a warm-tinted
"PowerPoint report" window. A dashed selection box appears on one sheet, the copied block flies in an arc (with a
little Z lift) into a slot of the report's chart, the bar grows when it lands; repeat from SEVEN DIFFERENT sheets,
9 frames apart, so it feels chaotic and endless (client asked for "more copy paste and manual work from other
sheets", one copy-paste was too calm). Camera pushes in, then pulls back to reveal the whole mess; headline
"Every week. By hand." with a "Week 44" pill that keeps flipping (45, 46, 47) every 18 frames.

### 5. Problems to "Simpler" [kit: Problems.tsx]  (a frame-by-frame copy of the reference; keep it exact)
Mist, ~14 s, three parts.
1. **The list**: a thin arrow draws in from the left edge (from frame 4, so the screen is never empty); each
   problem (100 px) blurs in at the arrow's tip ON its spoken word; earlier items shrink to 56 px, rise and fade
   to 16% above it. The whole list drifts up slowly.
2. **The field** (cut): rising glow ground; rows of faint glass pill outlines (95 px tall, widths 95/243/482, 38 px
   gaps, 126 px row pitch, a clearing around the centre) pop in from the bottom row up, then dissolve from the top
   down. A brand-gradient dot (106 px) starts low (y 765), rises slowly to ~350 with a small sway right (+33 px)
   and back left (-38 px), fades to 60% at the top, then drops to the centre.
3. **Simpler**: a small glass square grows around the dot (h45), widens into the card (714 x 477 at h61) as the dot
   fades; "Simpler" (104 px) appears in the gradient, turns to ink; the card widens to 1090 x 590, an outer glass
   frame (1490 x 870) and faint inner panels (sidebar, top bar, tiles) appear; "Simpler" is replaced (no gap) by
   "Everything in one place" (88 px, left-aligned at its final position, words 6 frames apart).
"Simpler" lands exactly when the voice says it (cut + 61 frames).
Client history: a "confused" wandering dot, then a black hole sucking in the pills, were both rejected; the exact
reference copy was accepted. The pills must never change shape. The payoff word must stay up >= 1 s.

## B. Reveal

### 6. Introducing
Mist (low lift), ~3.6 s, on the music's drop. "Introducing" (110 px, gradient) blurs in at f2 and out at f28; at f34
the logo mark spins in (pop spring, from -40 deg) beside the product name (116 px, ink), and a band of brand colour
sweeps once through the name's letters (f44 to f74). Nothing else: no subtitle (the client removed one).

## C. Features in use

### 7. Dashboard overview (the "home" tab)
Mist (full lift), ~5.25 s. Headline "All platforms. One dashboard." (gradient on the second half). The real home
screen (1600 x 900 at 0.9 scale) rises from below, tilted (rx 26 > 18, ry -16 > -6, rz 3 > 1). Its cards: one hero
chart in the gradient (big number counting up, line drawing on with a spike), smaller metric cards (number + change
pill + bars/donut/progress bars), a row of platform tiles each with its logo, number, change pill and a small trend
line drawn in the platform colour. From f40 the whole layout lifts in Z; then the cards float up one after another
as a "weak magnet" passes over them (kit `magnet.tsx`, no visible cursor; the client removed the cursor). Two
dark callout pills ("7 platforms, one view", "Updated every day") pop in beside it.
Client corrections: shrink cards so nothing is cut at the bottom; replace a weak card with a stronger one (PR >
Site health); platform tiles need charts; the hover lift must be slow and graceful.

### 8. Trend (one chart, close up)
Mist, ~5 s. A momentum chart tilted in 3D; the camera rides along the line to a spike, then pulls back to reveal the
same spike on every channel; a hover highlights it. Headline "Spot trends and make connections."

### 9. AI report to action plan (one continuous scene, ~9.3 s, fluid ground)
1. "Weekly AI reports" headline. The report card lands left (tilted, rotateY 10): brand mark, title, date pill, a
   one-line insight in brand ink, a drawn line chart, three KPI chips (green up, red down).
2. Four recommendation cards lift out of the report one by one (from small and behind, 14 frames apart) into a stack
   on the right: category in gradient caps, priority pill (High/Medium), a metric pill ("2.4x reach"), a one-line
   action, a one-line reason, an owner avatar, a gradient bar on the left edge.
3. Headline changes to "Turn insights into an action plan". The report swings away left; three glass columns rise:
   To do, In progress, Done (with counts that update). The four cards fly into To do (6 frames apart), owners'
   avatars pop on.
4. Three teammates' cursors (different colours, name tags) each drag one card: card lifts (scale 1.04, rotate -2,
   bigger shadow), travels with the cursor, drops with a ripple and a pop; one card goes on to Done and its avatar
   becomes a check. All drags finish before the scene's last 14 frames.
Client corrections: one recommendation was "too simple" (show several, better designed); the action plan should form
from them; collaboration needs several named cursors; every cursor must do something; use the client's own name
plus international names for the others.

### 10. Feature intro ("We built our own X")
Fluid ground, ~3.7 s. Headline + sub-line in white. A browser window (tilted rx 30 > 20) crawls the site: page tiles
pop in on a grid with status dots (green/amber/red), a cyan scan band sweeps down, a "1,240 pages crawled" counter
runs.

### 11. Scores (dials)
Mist, ~4.2 s. Two big dials (460 px; 270-degree glass track with ticks, gradient arc sweeping to the score, number
counting up in the gradient, label under it), each turned slightly toward the centre. After the sweep, four
"part" chips per dial pop out on its outer side (name, value counting up, a mini gradient bar), joined to the dial
by thin lines that draw on; a "+6 since the last audit" pill under each dial; a footnote pill ("1,240 pages checked
against 114 rules, every two weeks"). Client: two bare dials looked "too simple".

### 12. Issues, then the click into one issue
Mist, ~6.3 s. Headline "Every issue, sorted and explained." Left: three severity cards (Errors/Warnings/Notices)
slide in and count up. Right: a category list with stacked red/amber bars filling. Then the tilt eases to flat, the
cursor glides to one row, the row highlights, click, and the row grows into a large detail card (rest blurs back):
severity pill, "found on 58 pages", title, "Create task" button, WHERE (page > broken link > 404 rows sliding in),
WHY IT MATTERS (two plain sentences), HOW TO FIX (three numbered steps in gradient circles). Hold ~1 s, not more
(the client trimmed a longer hold).

### 13. Expert review deck
Fluid ground, ~5.1 s. Left: headline and three category pills (SEO / GEO / Content), the active one white. Right:
three finding cards stacked in depth; the front card lifts up and over to the back (an arc with a little X rotation)
to reveal the next, twice; the cursor then clicks "Create task" on the front card and it turns into a gradient
"Task created" pill.

### 14. Saving
Mist, ~4.1 s. "Save $2,000+ a year" (120 px, amount in gradient) and a sub-line. A renewal notice card rises,
tilted: the price is struck through with a red line, then a gradient "Cancelled" stamp pops on at an angle.
(Flag the amount as a claim to verify.)

## D. Close

### 15. "But wait, there's more" [kit: ButWait.tsx]
Fluid ground, ~2.6 s. "But wait," (150 px, white) blurs in, then shrinks and rises as "there's more." (190 px) lands
larger with a pop spring exactly on the spoken words. A slow push.

### 16. Montage wheel [kit: Montage.tsx]
Mist, ~12.5 s, one voice line listing 8 features then "and a lot more". Right: the list sits on a big circle (radius
1700, centre far right), items are spokes: the current one is in the middle in the gradient, stepped 70 px to the
left; neighbours turn away along the circle, shrinking, fading and blurring. Left: the real feature UI for the
current item tilts in from below (spring) and the previous one falls back in depth with blur. On "and a lot more" all
the feature visuals fan out in a grid at 42% scale. Items move exactly on their spoken words (measure them).
Client history: the curve direction took three tries; the accepted version is a true circle whose items read as
spokes, curving away from the visuals.

### 17. Bento and logo outro [kit: LogoOutro.tsx for the logo part]
Own ground (white), ~8.5 s. A bento grid of 12 feature cards (see the `archetype-bento` skill for a bento's design
rules) lands card by card in a random order with the centre card last (4 frames apart), while the camera pulls back
from 1.7x to 1x with thin white "wind" streaks rushing outward and a soft blur in the corners. Short hold. The hero
card (in the brand gradient) expands to fill the frame; inside it the logo mark is so large that one stroke fills the
screen; it pulls back to its real size (30 frames, fast start) in the logo's own colours; the wordmark slides in out
of a blur; the music's own ending lands here, with the tagline voice line just before.
Client corrections: the hold before the expansion was too long; the logo was cut at the bottom; the shrinking logo
showed one flat colour (fixed by drawing the logo's own coloured pieces).

## E. Patterns that work in any scene

- **Count-ups**: numbers count with the snappy curve over 30 to 40 frames, commas kept, tabular figures.
- **Draw-ons**: lines draw left to right over 40 to 50 frames; area fills fade in under them; a dot rides the line end.
- **Callout pills**: dark ink pills with white 26 px text pop in beside a feature to name its benefit.
- **Row opens into detail**: highlight row (brand tint 10%) > click > the row's rectangle animates into the detail
  card's rectangle while the background blurs 8 px and fades to 50%.
- **Deck**: front card lifts in an arc over the others to the back, revealing the next.
- **Kanban drag**: card lift (scale 1.04, rotate -2, deeper shadow, Z +60) > travel 16 frames > drop with ripple + pop.
- **Stamp**: pop spring at an angle (-8 deg) with a gradient fill.
